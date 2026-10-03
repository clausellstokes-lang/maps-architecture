# Rewrite — design volume V05 (the sky layer)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-V05; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/rewrite-V05`; restarted 2026-10-02 in the cloud checkout — the disk held only this file's skeleton)
- P1 inputs gathered (canon unit V05, conflicts, f items, g 111, wiring, elegance, id rulings, hand-offs, disagreements, edges, combos, inventory; the base parts' application of every BCR-V5 checked): done
- P2 head, §0: done (part 00-head)
- P3 §1, §1b: done (parts 01-scope, 02-wiring)
- P4 §2: done (part 03-data)
- P5 §3.1–§3.14: done (parts 04-gen-a, 05-gen-b)
- P6 §3.15–§3.22, §3.23 edges: done (parts 06-gen-c, 07-gen-d, 08-edges)
- P7 §4–§6: done (parts 09-edit, 10-render)
- P8 §7 tests: done (part 11-tests)
- P9 §8–§13, integration notes: done (parts 12-plan, 13-close)
- P10 assemble, verify ids, references, terms, sizes: done
- P11 report, result file, LANDED: done

Source: `docs/volumes/V05-sky.md` (3 808 lines, 81 161 words). Output: `docs/validation/coherence/new/volumes/V05-sky.md`
(2 946 lines, 64 227 words). Working parts: `docs/validation/coherence/work/rewrite-V05/parts/` (00-head … 13-close,
assembled in that order).

## 1. Sizes and the shrink goal (principle (9))

| measure | words |
|---|---|
| before (the canon's count) | 81 161 |
| after | 64 227 |
| change | −16 934 (−20.9 %) |
| removed | ≈ 22 600 |
| added (mandated) | ≈ 5 700 |
| after, without the mandated additions | ≈ 58 500 (−27.9 %, inside the band) |

**Removed, by source.** *Narration* ≈ 11 800: the PROGRESS ledger and eight stacked banners (≈ 1 250), §12's lane
history (≈ 2 260 of 2 792), §13's history of cross-lane halves (≈ 2 500 of 2 721), the seven reconciliation-round records
(4 475), the Integration notes' prose (≈ 170), critique and seam ids, dated notes and "revised with" provenance in the
body and §9 (≈ 1 150). *Restatement* ≈ 9 600: §10's request bodies replaced by a pointer table (7 543 → 745), §1.2's
value-bearing "what it gives" column (≈ 900), §1b's field rows whose producers and readers now live once at §2.6
(V05-DUP-3; 3 377 → 1 936, §2.6 growing by 109), §3.12's unit-run list and seven-item reconciliation now V01 §3.10.3's
(≈ 460), §3.19 (1)'s sampler (now §4.5's), §3.22 (5)'s generator clauses (now §4.3's), II.5/II.6 values (§3.3's `A`
and `E` formulas, `chance`, `redrawPerYear`), §4.3's lifecycle prose (now §7.4's). *Duplicated mechanisms* ≈ 300: E-01's
stretch-state profile cited instead of restated at §2.6 and §3.16; E-24's one mark per amended decision. *Verbose
prose* ≈ 900: §1.1 as one table (933 → 340), §0 tightened (1 667 → 1 508), small cuts elsewhere.

**Added, by mandate.** §3.23 (every edge and combination, principle (11)): 3 215. §4.2's bend table with every line's
message key (V05-WGAP-2): ≈ 600. §7's new and extended bars (T-V5-33, T-V5-34; clauses for V05-EDGE-1 – -4, item 111,
the bends, the edges): ≈ 1 190. §9's J-V5.82 – J-V5.85 (the edges' reasoned choices): ≈ 400. Item 111's part (V05 §3.8
(4), §3.11): ≈ 230. The `island` section's rows for V10 (CVR-V10-14) and the remaining wiring: ≈ 250.

**What holds the unit below the band:** the mandated additions above, and the content that is irreducible at build depth
— the record and rule tables (§2.1–§2.6, 9 000 words), the generation mechanisms (§3.1–§3.22), the 34 bars of §7 and the
85 reasoned decisions of §9, none of which may be thinned (the guard). Without the additions the unit lies at −27.9 %.

**Section sizes** (words after the title block; the scan's count):

| § | before | after |
|---|---|---|
| 0 | 1667 | 1508 |
| 1 | 188 | 0 |
| 1.1 | 933 | 340 |
| 1.2 | 1870 | 976 |
| 1.3 | 658 | 554 |
| 1b | 3377 | 1936 |
| 2 | 0 | 0 |
| 2.1 | 1345 | 1281 |
| 2.2 | 372 | 379 |
| 2.3 | 445 | 429 |
| 2.3a | 491 | 508 |
| 2.3b | 216 | 274 |
| 2.4 | 2757 | 2732 |
| 2.5 | 198 | 201 |
| 2.6 | 3126 | 3235 |
| 3 | 0 | 0 |
| 3.1 | 880 | 762 |
| 3.2 | 660 | 641 |
| 3.3 | 675 | 649 |
| 3.4 | 382 | 380 |
| 3.5 | 1512 | 1492 |
| 3.6 | 151 | 151 |
| 3.7 | 443 | 506 |
| 3.8 | 604 | 746 |
| 3.9 | 949 | 912 |
| 3.10 | 1366 | 1324 |
| 3.11 | 791 | 832 |
| 3.12 | 882 | 425 |
| 3.13 | 173 | 229 |
| 3.14 | 114 | 155 |
| 3.15 | 1652 | 1669 |
| 3.16 | 1349 | 1487 |
| 3.17 | 690 | 759 |
| 3.18 | 344 | 348 |
| 3.19 | 1738 | 1742 |
| 3.20 | 2489 | 2448 |
| 3.21 | 442 | 452 |
| 3.22 | 1608 | 1568 |
| 4 | 0 | 0 |
| 4.1 | 592 | 625 |
| 4.2 | 3142 | 3734 |
| 4.3 | 640 | 473 |
| 4.4 | 519 | 568 |
| 4.5 | 743 | 833 |
| 5 | 0 | 0 |
| 5.1 | 853 | 851 |
| 5.2 | 77 | 102 |
| 5.3 | 714 | 683 |
| 5.4 | 122 | 161 |
| 5.5 | 681 | 719 |
| 6 | 1605 | 1640 |
| 7 | 5500 | 6688 |
| 8 | 1708 | 1641 |
| 9 | 6842 | 6914 |
| 10 | 7543 | 745 |
| 11 | 99 | 38 |
| 12 | 2792 | 530 |
| 13 | 2721 | 225 |
| Integration notes  | 283 | 0 |
| Reconciliation round 1  | 750 | 0 |
| Reconciliation round 2  | 532 | 0 |
| Reconciliation round 3  | 699 | 0 |
| Reconciliation round 4  | 757 | 0 |
| Reconciliation round 3 — co | 361 | 0 |
| Reconciliation round 5  | 734 | 0 |
| Reconciliation round 6  | 642 | 0 |
| 3.23 | 0 | 3215 |
| Integration notes | 0 | 113 |
| total (after the title block) | 79188 | 64528 |

## 2. File f and g items

**File f, cited as base text (35 items concerning V05):** 203, 204, 213, 244, 245, 246, 251, 252, 253, 260, 274, 282,
286, 290, 295, 296, 299, 307, 308, 309, 313, 320, 331, 356, 375, 387, 408, 415, 416, 476, 546, 547, 568, 575, 580. Each
is cited at the V05 section that reads it (V05 §1.2's index; §10's pointer table for the 28 that apply this volume's
requests). Before §10's bodies were cut, every request was checked applied in the landed base parts (a distinctive
token of each request found at its section in `new/base/`: the sky records and `removedAccesses` in model §2.7–§2.9,
the landing data keys and S7b (5) in pipeline §4.1/§4.5, `IslandRule`'s rows and `node.bonus` in II.6, the sampler and
the island-free value in §4.5, the precinct hand-over in §4.2 S3, `levelledGroundCm` and the platform datum in §4.7,
the F-SKY rows in determinism §5.2, DR27, `placeSkyAccess`, `removeIsland` and the shade scope in §7.1–§7.7, the sky
slots, `sky.ground`, `surfaceLayerTopCm` and `+FloatingIsland` in rendering §8–§11, `@plat/sky` and M6-sky in scope §14
and §16). BCR-V5-23 and BCR-V5-28 were requests to V06 (file f's *Not items*), carried there (V06 X10; V06 W64, W66).
Item 568: V05 §8 states only its own price and cites §16's totals.

**File g:** items 102–110 are cited as base text where they reach islands. **Item 111** (new design, routed here): the
island's own water — V05 §3.8 (4) *The island's water is its own* (no oasis on an island; the water pull only on the
ground's growth field, prosperity field and wells; the climate cell multiplying only the ground's `w_sun`; an oasis on
the ground is `water` for V05 §3.7's raster), V05 §3.11 (no water term in the gradient; `w_sun` as filed), J-V5.85,
T-V5-9 (h) (byte-identity of the island under item 111's cells; no oasis on a sky arena). Items 112 and 113 name no V05
part.

## 3. Conflicts resolved (6)

* **MC-05** (FIX-BY-F, item 213): `ContextVector.arena 'sky'` — V05 §2.6's row and §3.11 read it as §2.5 declares it.
* **MC-07** (FIX-BY-F, item 251): the island's geometry is `rim: ChainRef` and `land: FaceRef` — V05 §2.1, no stored
  outline; §2.7 cites V05 §2.1.
* **CF-PIPE-06**: S12c covers the districts on a sky island's arena (pipeline §4.5's statement); V05 §3.1's S12c row and
  SKY-F's order (before S12c) state V05's side.
* **V05-ICONF-1**: `ShadeBasis.by` and `IslandShadeStrip.evaluated.by` gain `'update'`; Update shade now writes it with
  the document's current epoch and the full surface top (V05 §2.1, §2.3a, §3.9 (4), §3.19 (6), §4.2).
* **V05-XCONF-1**: DR27 everywhere; J-V5.40 marked amended (E-24); the "number left to the integrator" sentences gone.
* **CANON-C03**: V05 §11 is the decision (J122), no "until the owner answers".

## 4. Elegance rulings applied

* **E-01 (UNIFY, the stretch-state profile at §2.2 rule 5).** V05 is a writer of both profiles; it now cites the rule and
  states only its writes. ✓ canonical form — §2.2 rule 5 (not restated); ✓ write (near knot new, far knot held) — §2.2
  rule 5, V05 §3.16 (4) writes `breached` / `decayed` over the covered length; ✓ read by arc length — §2.2 rule 5; ✓
  regenerate (knot carry-over, `stateSnapCm`) — §2.2 rule 5; V05 §3.16 (4)'s retaining row keeps "keyed by the wall's
  lineage address … until an epoch's restoration"; ✓ cut or join — J-K23's rekey (base); ✓ undo — V05 §3.16 (8) and
  §2.6's row (the prior profile and `lifecycle`, absent again where the fall wrote the first); ✓ migrate — §2.2 rule 5;
  ✓ RetainingWall keeps its writers (V05's landfall `decayed`) and Enceinte its writers (V05's landfall `breached`),
  lifecycle rules (decayed while any run is not standing) and §8.2 drawing (gap glyph, towers by their runs) — V05
  §3.16 (4)'s wall row and *drawn by* column.
* **E-02 (KEEP APART, removals that hold).** V05 keeps its live `SkyIsland` record in state `removed` with
  `removedAccesses`; the separating nuance is stated at J-V5.62 (a removal holds a slot counted as filled and an archived
  arena with its households for undo, which a suppression key cannot hold); the one lift rule is item 260's, cited at
  V05 §3.2 (6), §3.15 (5), §2.6.
* **E-16 (UNIFY, `wash`/`edgeFade`; the role `glow`).** V05's body names none of the renamed post operations or the role
  `lights`; the only occurrence was BCR-V5-18's quoted base text, which §10's pointer replaces. ✓ program/post-op
  distinction — not used by V05; ✓ the spotlight vignette — not used; ✓ glyph tone vs glow — V05 §5.1 uses role `light`
  for the bridge of light's glyph ribbon (the glyph tone), unchanged.
* **E-24 (UNIFY, one mark per amended decision).** J-V5.40 (*Amended by J-VI.13*), J-V5.42 (*Amended by item 296*),
  J-V5.61 (*Amended by J-VI.4 (d), (e)*), each keeping its reason; ✓ no row dropped; ✓ the governing row keeps the reason.

No other unification was made. V05-DUP-3's fix (one home per stored field at §2.6) is a restatement cut under principle
(1), recorded here with its check: every producer and consumer §1b named for a stored field is in that field's §2.6
row (the `SkyIsland` record row, `key`/`nextSkyPart`, `rim`/`land`/L0, `terrain`/`river`, `terrainEcho`, the rim strip
and claims, the ground landing yards, `SkyAccess.*`, the allocation row, `field`, `altitudeCm`/`groundRefCm`, the strips,
`shadeBasis`, `shadeSky`, the crypt site, `name`, `underside`, the island `RetainingWall`s, `removed`/`removedAccesses`);
the derived node term and `demandTaken` moved the other way, into §1b, with their lifecycle cells.

## 5. Id rulings and renumberings

* **ID-DR:** DR-SKY → DR27 (V05 §1b, §3.2 (1), §4.4, §4.5, J-V5.40, §10, Integration notes).
* **ID-BCR:** V05 no longer cites a bare `BCR-n` of V01 or V04 (V01's BCR-39, BCR-43, BCR-45 and V04's BCR-45 are cited by
  the file f items that applied them: 290, 245, 580, 244).
* **ID-WX:** volume-local rows are cited with their volume (V06 X10, V06 W64/W66, V09 §4.9 rows, X-V12-4, CVR-V10-14).
* **New ids** (unique across the set, grepped): §3.23; T-V5-33, T-V5-34; J-V5.82 – J-V5.85; the bend keys
  `bend.island.count`, `.rung`, `.move`, `.altitude`, `.floor`, `.rimStop`, `.fallen`, `bend.access.kind`, `.deck`,
  `.rimFull`, `.last`, `bend.raised.hoist`, `bend.wall.rim` (V09's rows to write). No section renumbered.
* **Terms:** G-cite (every `V5 §`, `V1-…`, `V6 §` form → `Vnn §x.y`), G-unitinput (`SkyHandover`, `skyHandover` →
  `SkyUnitInput`, `skyUnitInput`), G-DR, G-refview (`reference viewport`), G-vectorrung (`the vector rung`), G-newrandom
  (`New random` for "scoped re-roll").

## 6. Wiring, hand-offs, disagreements

**Wiring gaps closed:** W-HOOK-02 (V05 §2.1–§2.2 name `@plat/model`'s declaration at §2.7, item 251, the base's end
already naming V05); V05-WGAP-2a/-2b (V05 §4.2's bend table names every line's key, V09's rows and V10's category
the other end); V05-WGAP-3 (`richest`, `cells`, `evaluated`, `removed.generated` each with its reader); V05-WGAP-1's V05
end (V05 §4.2 names V09 §4.20.8's hit stack; V09's end routed to V09).

**Hand-offs closed (17):** V06:X10 (V05 §3.15, §3.19 (7): `demandTaken`, cause `island`, the mask OR-ed into
`shadeSky`); V06:X15 (V05 §3.15 and §3.16 (4)'s raised row: `sky.clearance` at `afterGrowth` order 50; the landfall's
ruined raised parts in the epoch's lifecycle, so in `EpochScope.raised`); V06:X26 (V05 §3.16 (4)'s way row writes
`formerClass`); V06:X37 (V05 §3.16 (4)'s wall row: `breached` into `condition`, V06 §3.7.5's repair); V06:X40 (V05 §6's
resize row and V01 §6's sky row price a raise's unit run; V05 §3.15 (5)); V06:X41 (towers and gates by their runs, V05
§3.16 (4), J-V5.79, T-V5-14); V06:X46 (V05 §6's resize row prices the tops' placements); V08:X8 (item 260's slot rule for
islands, V05 §3.2 (6)); V09:XV-V9-8 (V05 §8's P4: AP7 priced in §16's staged-screens row); V09:XV-V9-16 ((a) "T9's
delete" → T10 `hold`'s delete, V09's delete row, everywhere; (b) the bends, V05 §4.2's table); V09:XV-V9-25 (V05 §3.22
(4): the radial move to 1 m inside the `setback` line, `bend.retaining.rim`); V10:CVR-V10-14 (V05 §4.5's `island`
section rows, "removed by you" and "raised clear of the aqueduct" among them); V12:X-V12-4 (V05 §7's parity paragraph:
the descriptive NG `PanelSpec`, provisional under J122); V12:X-V12-11 (V05 §7's intro: every no-op pin a `NoOpPin`, "off"
from V11 §3.24.0); V12:X-V12-15/-16 (V05 §8's register paragraph, no own line); V12:X-V12-17 (`--milestone V5-P1`/`V5-P2`,
the due `M-CAL/sky`).

**Disagreements:** `SkyIsland` with model (MC-07) and `ContextVector` with model (MC-05) — resolved as §3 states.

**Owner question:** V05 Q1 answered — J122: the underground first (V05 §11; §8 places M6-sky after M6-U).

**Cohesion:** §8 agrees with §16's row (M6-sky after M6-U, its P0 beside M5, 17.25–23.25 pw, outside the base total) and
INDEX §4's order; §11 carries the decision; §1b names every non-field piece's producer and consumer and §2.6 every
field's; one marker line, no ledger, no round records.

## 7. Edges and combinations

V05 §3.23 defines every edge the catalogue routes here — 60 UNDEFINED and 48 UNTESTED (rules (a)–(d) for the classes
E4, E6, E7, E8; the per-mechanism table (e) for E1, E2, E3, E5 and the E4 cases with an outcome of their own), the 31
UNDEFINED combinations V05 owns and the owner's named combination "a raised way under an island's shade" ((f): its
outcome, rung and test, T-V5-31 (a), (b), (g)), and the four observed edges at their homes ((g): EI-V05-EDGE-1 at §3.15
(1b), -2 at §3.16 (4), -3 at §2.3b/§4.2, -4 at §3.15 (7) with T-V5-31 (f)). Each row names its outcome, its rung on §5's
ladder (never a whole-map retry) and its test (T-V5-1 – T-V5-34, T-V1-33 for the close-up symbol). New outcomes the
edges required are reasoned in J-V5.82 – J-V5.85 and in the bend table (`bend.island.rung`, `.move`, `.fallen`,
`bend.access.rimFull`).

## 8. Open findings routed here (69) — every one FIXED

| finding | list | closure |
|---|---|---|
| VOL-V05-V06-RESTATEMENTS-001 | restatements | FIXED — V05 §1.2 names §1.1 without its values |
| VOL-V05-V06-RESTATEMENTS-002 | restatements | FIXED — V05 §3.2 (1) cites §1.1 |
| VOL-V05-V06-RESTATEMENTS-003 | restatements | FIXED — V05 §1.2's §4.3 row and §3.1 cite §4.3 (item 290 (1)); V01 BCR-39's slot not restated |
| VOL-V05-V06-RESTATEMENTS-004 | restatements | FIXED — V05 §2.4's `chance` and `redrawPerYear` comments and the dynamics row cite II.6 (4), no number |
| VOL-V05-V06-RESTATEMENTS-005 | restatements | FIXED — V05 §3.1 cites §4.1's writer order (item 282) |
| VOL-V05-V06-RESTATEMENTS-006 | restatements | FIXED — `node.bonus` 0.25 stays at V05 §2.4 (its home); II.6 (3)'s literal is a cross-part note to pipeline |
| VOL-V05-V06-RESTATEMENTS-007 | restatements | FIXED — V05 §3.19 (1) cites §4.5's sampler (item 296) |
| VOL-V05-V06-RESTATEMENTS-008 | restatements | FIXED — as 007 (J-V5.42, J-V5.44 marked) |
| VOL-V05-V06-RESTATEMENTS-009 | restatements | FIXED — as 007 (V05 §6 cites §4.5's fallback) |
| VOL-V05-V06-RESTATEMENTS-010 | restatements | FIXED — V05 §2.6's `formerClass` row keeps only V05's writer cell, citing V06 §2.12 |
| VOL-V05-V06-RESTATEMENTS-011 | restatements | FIXED — V05 §2.6's stretch-state row keeps only V05's writer cells, citing §2.2 rule 5 and items 575, 245 |
| VOL-V05-V06-RESTATEMENTS-012 | restatements | FIXED — V05 §10 is a pointer table (BCR → item → base section) |
| V05-RESTATE-1 | restatement_findings | FIXED — V05 §1.2 two-column index, no values |
| V05-RESTATE-2 | restatement_findings | FIXED — as RESTATEMENTS-003 |
| V05-RESTATE-3 | restatement_findings | FIXED — as RESTATEMENTS-006 |
| V05-RESTATE-4 | restatement_findings | FIXED — as RESTATEMENTS-007 |
| V05-RESTATE-5 | restatement_findings | FIXED — as RESTATEMENTS-002 and -005 |
| V05-RESTATE-6 | restatement_findings | FIXED — as RESTATEMENTS-012 |
| V05-RESTATE-7 | restatement_findings | FIXED — as RESTATEMENTS-010 and -011 |
| V05-DUP-1 | internal_duplications | FIXED — the shade-evaluation schedule stated once at V05 §3.19 (6); §2.1, §2.6, §3.1, §3.15, §4.2 cite it |
| V05-DUP-2 | internal_duplications | FIXED — one covered-kind table at V05 §3.16 (4) (kind → outcome → drawn by → lifted by); §1b, §5.1, §5.5 cite it |
| V05-DUP-3 | internal_duplications | FIXED — V05 §2.6 is the one home of every stored field (producer, readers, lifecycle, base hook); §1b wires the non-field pieces only |
| V05-ICONF-1 | internal_conflicts | FIXED — `by` gains `'update'` in `ShadeBasis` and `IslandShadeStrip.evaluated`; Update shade now writes it with the current epoch (V05 §2.1, §2.3a, §3.19 (6), §4.2) |
| V05-XCONF-1 | cross_part_conflicts | FIXED — DR27 everywhere (V05 §1b, §3.2, §4.4, J-V5.40 amended, §10, Integration notes) |
| V05-EDGE-1 | edges_observed | FIXED — V05 §3.15 (1b) *Against a lock*; J-V5.82; T-V5-14 |
| V05-EDGE-2 | edges_observed | FIXED — V05 §3.16 (4)'s last row; J-V5.83; T-V5-14 |
| V05-EDGE-3 | edges_observed | FIXED — V05 §2.3b and §4.2 (`bend.access.rimFull`): the rim bounds hand-placed accesses; V05 §6 prices the list per entry; J-V5.84; T-V5-8 |
| V05-EDGE-4 | edges_observed | FIXED — T-V5-31 (f) |
| V05-WGAP-1 | wiring_gaps | FIXED at V05's end (V05 §4.2 names V09 §4.20.8's hit stack); V09's end routed to V09 (wiring.md) |
| V05-WGAP-2 | wiring_gaps | FIXED at V05's end — V05 §4.2's bend table names every key; V09's rows and V10's category routed (V05-WGAP-2a, -2b) |
| V05-WGAP-3 | wiring_gaps | FIXED — `near: 'richest'` read by V05 §3.7 (3); `cells` by V05 §4.5, §5.1, §5.5; `evaluated` by V05 §4.5; `removed.generated` by V05 §4.5 and `removedSlots` |
| V05-MISSING-1 | missing_parts | FIXED — item 111's part at V05 §3.8 (4), §3.11; J-V5.85; T-V5-9 (h) |
| V05-MISSING-2 | missing_parts | FIXED — V05 §11 answered (J122); V05 §8 cites §16's order |
| V05-TERM-1 | terminology | FIXED — every pointer `Vnn §x.y`, the self-pointer `V05 §x.y` (G-cite) |
| V05-TERM-2 | terminology | FIXED — `SkyUnitInput` / `skyUnitInput` for the unit-run view; `handover` only for the reservation passing (G-unitinput) |
| V05-DEFER-1 | deferral_wording | FIXED — V05 §1b and §2.3b name the callers (an epoch's raised-way pass, T4's raised dry run); no generation stage after SKY by §4.3's slot |
| V05-DEFER-2 | deferral_wording | FIXED — V05 §3.1 cites §4.3's slot as ruled |
| V05-DEFER-3 | deferral_wording | FIXED — V05 §13's intro sentence deleted; the ⟨P0⟩ calibrations are V05 §8's P0 exits |
| V05-NARR-1 | narration | FIXED — one marker line; the PROGRESS ledger removed |
| V05-NARR-2 | narration | FIXED — V05 §3.8 (1)'s parenthesis removed |
| V05-NARR-3 | narration | FIXED — revision provenance stripped from §9's rows; E-24 marks on J-V5.40, J-V5.42, J-V5.61 |
| V05-NARR-4 | narration | FIXED — V05 §12: one CONFIRMED paragraph, one PLAUSIBLE list |
| V05-NARR-5 | narration | FIXED — notes folded; reconciliation tables removed; Integration notes one line each |
| V05-NARR-6 | narration | FIXED — critique and seam ids stripped from the normative text |
| V05-BREF-1.r01 | broken_references | FIXED — the note now cites V05 §3.2 (3)–(4) |
| V05-BREF-2.r02 | broken_references | FIXED — removed (V05-BREF-2) |
| V05-BREF-2.r03 | broken_references | FIXED — removed (V05-BREF-2) |
| V05-BREF-2.r04 | broken_references | FIXED — removed (V05-BREF-2) |
| V05-BREF-2.r05 | broken_references | FIXED — removed (V05-BREF-2) |
| V05-BREF-2.r06 | broken_references | FIXED — removed (V05-BREF-2) |
| V05-BREF-2.r07 | broken_references | FIXED — removed (V05-BREF-2) |
| V05-BREF-2.r08 | broken_references | FIXED — removed (V05-BREF-2) |
| V05-BREF-2.r09 | broken_references | FIXED — removed (V05-BREF-2) |
| V05-BREF-2.r10 | broken_references | FIXED — removed (V05-BREF-2) |
| V05-BREF-2.r11 | broken_references | FIXED — removed (V05-BREF-2) |
| V05-BREF-2.r12 | broken_references | FIXED — removed (V05-BREF-2) |
| V05-BREF-2.r13 | broken_references | FIXED — removed (V05-BREF-2) |
| V05-BREF-2.r14 | broken_references | FIXED — removed (V05-BREF-2) |
| V05-BREF-2.r15 | broken_references | FIXED — removed (V05-BREF-2) |
| V05-BREF-2.r16 | broken_references | FIXED — removed (V05-BREF-2) |
| V05-BREF-2.r17 | broken_references | FIXED — removed (V05-BREF-2) |
| V05-BREF-2.r18 | broken_references | FIXED — removed (V05-BREF-2) |
| V05-BREF-1 | broken_reference_findings | FIXED — as BREF-1.r01 |
| V05-BREF-2 | broken_reference_findings | FIXED — every scratch-file citation removed |
| V05:IN-V05-1 | integration-note | FIXED — folded at V05 §4.2's bend table |
| V05:IN-V05-2 | integration-note | FIXED — folded at V05 §2.1, §3.2 (6), J-V5.62 |
| V05:IN-V05-3 | integration-note | FIXED — folded at V05 §4.4 |
| V05:IN-V05-4 | integration-note | FIXED — folded at V05 §3.21 (1) |
| V05:IN-V05-5 | integration-note | FIXED — folded at V05 §13 |

## 9. Cross-part notes (what another unit must change; not edited here)

* **V09:** (a) §4.20.8's hit stack un-displaces a sky hit and every tool point under `offset` occlusion — the world point
  less `elevation × offsetPerMetre` — before the anchor conversion, citing V05 §4.2 (V05-WGAP-1). (b) §4.9 gains the
  message rows V05 §4.2's bend table names and V09 lacks — `bend.island.count` (with its count-raised variant),
  `bend.island.rung`, `bend.island.move`, `bend.island.altitude`, `bend.island.floor`, `bend.island.rimStop`,
  `bend.island.fallen`, `bend.access.kind`, `bend.access.deck`, `bend.access.rimFull`, `bend.access.last`,
  `bend.raised.hoist`, `bend.wall.rim` — each with V05's line and a `button.showWhy` (V05-WGAP-2a); the existing
  `bend.raised.island`, `bend.aqueduct.island`, `bend.raised.onIsland`, `bend.aqueduct.onIsland` and
  `bend.retaining.rim` rows stand as V05 §4.2 cites them. (c) XV-V9-16 (a), XV-V9-25 and XV-V9-8 may be marked met.
* **V10:** the bend category carries the same lines (V05-WGAP-2b); CVR-V10-14's V05 part is met by V05 §4.5's `island`
  section table; `FieldDrivers.sources` lists no island whose strip has `cells` 0.
* **pipeline:** II.6 (3) names `node.bonus` without its value — the value 0.25 lives in `islands.json` (V05 §2.4;
  V05-RESTATE-3); §4.3's *Ground only, never into the sky* drops "or a generation stage's after SKY", since §4.3's slot
  commits every generated raised part before S7b (1) (V05-DEFER-1's base counterpart).
* **scope:** §13's row "T10-1, T13-1, T15-1, T102-2 | the sky layer" reads T-V5-1 – T-V5-34; T104-2's island form is
  T-V5-24 (b)–(c) (T-V5-23 is T104-1's); §14's `@plat/sky` line names `skyUnitInput` for `skyHandover` (G-unitinput);
  the Judgment-calls index gains J-V5.82 – J-V5.85 if it indexes volume rows.
* **determinism:** if §7.1's dry-run outcome table (E-07) enumerates bend causes per volume, the sky's are V05 §4.2's
  bend table (cite it); §7.4's `convert` row covers a landfall's re-landing of another island's access (V05 §3.16 (4)).
* **rendering:** §11.1's GeoJSON sky content follows V05 §5.5 — a vertical access (hoist, stair) is a Point with
  `topElevationM` and `footElevationM`, never a two-point LineString on one plan point.
* **V06:** §6.2's century sums cite V05 §6's `fallIsland` row, which now adds 30 ms per access of another island it
  re-lands (at most three per fall); X15, X26 and X46 may be marked met (V05's side written).
* **V12:** §3.9.1's M6-sky `PanelSpec` stays "provisional — not rated" under J122 (M6-sky lands after M5's sitting), as
  V05 §7's parity paragraph states; X-V12-4, -11, -15, -16, -17 may be marked met for V05.
* **adjudicator:** the canon's `reference` role for V05-0136 (the landing classes' facts → V11) is ruled the other way
  here: V11 §3.5.13 compiles its rows "from V05 §2.4's facts" and cites V05 §2.4, so the facts stay at V05 §2.4; citing
  V11 would make each point at the other.

## 10. CONFIRMED versus PLAUSIBLE (this lane)

CONFIRMED (executed): the 30 BCR-V5 requests' tokens found in the landed base parts (`new/base/`) before §10's bodies
were cut; every `V05 §x.y` reference resolves to a section of the new text (script); every `Vnn §x.y` reference to
another volume resolves to a heading of that volume's current text (script; V01's rewrite keeps V01's numbering);
T-V5-1 – T-V5-34 and J-V5.1 – J-V5.85 each defined once and every cited id defined (script); the retired terms and
narration patterns (G-cite forms, `SkyHandover`, DR-SKY, seam and critique ids, scratch paths, "integrator" deferral)
absent from the normative text (script); 544 of 544 V05 inventory ids mapped (script, §11). PLAUSIBLE: the clean-room
scan (`docs/validation/bench/doc_checks.py`) cannot run against the reference corpus in this checkout (absent), so its
result is provisional; the new edge outcomes and bars (§3.23, T-V5-33, T-V5-34) are design until M6-sky executes them.

## 11. Mapping table — every inventory id of V05 (544 of 544)

| inventory id | kind | old § | canon role | where it now lives | statement (first words) |
|---|---|---|---|---|---|
| V05-0001 | summary | 0 | home | V05 §0 | Plain-words summary: islands only at CITY and METROPOLIS with the fantasy setting on (off by de… |
| V05-0002 | summary | 0 | home | V05 §0 | Plain words: an island carries either one to three rich neighbourhoods moved up from the town (… |
| V05-0003 | summary | 0 | home | V05 §0 | Plain words: an institution sent up hands its ground site over (largest church takes the cathed… |
| V05-0004 | summary | 0 | home | V05 §0 | Plain words: shapes round, D, lozenge, crescent, spindle; rocky rim; gentle echo hills; often a… |
| V05-0005 | summary | 0 | home | V05 §0 | Plain words: access by hoists (winch house, cage, landing yard) or over water an inclined rope … |
| V05-0006 | summary | 0 | home | V05 §0 | Plain words: island shade computed over a typical day using the real bulk (rim + tapering root)… |
| V05-0007 | summary | 0 | home | V05 §0 | Plain words: island shops follow ground siting rules with the hoist ride as the trip; each isla… |
| V05-0008 | summary | 0 | home | V05 §0 | Plain words: an island needs no wall (cliffs are its wall); an author's island wall walls only … |
| V05-0009 | summary | 0 | home | V05 §0 | Plain words: viaducts, raised roads and aqueducts pass beneath and never reach an island; landi… |
| V05-0010 | summary | 0 | home | V05 §0 | Plain words: a dossier magical node lowers upkeep so islands are a little likelier, bigger and … |
| V05-0011 | summary | 0 | home | V05 §0 | Plain words: decline shrinks and lowers islands; unpaid magic empties an island to lowest heigh… |
| V05-0012 | summary | 0 | home | V05 §0 | Plain words: every island edit undoable; changing an island never disturbs the city below excep… |
| V05-0013 | convention | 1 | home | head, *Citations* paragraph (the set's `Vnn §x.y` form, G-cite) | Pointer convention: 'V5 §n' names this volume; bare §n (and II.n, D-n, J-…) names the base; ano… |
| V05-0014 | term | 1 | glossary | head, *Citations* paragraph (two kinds of tier; J-V5.66) | Two kinds of tier (J-V5.66): underside tiers = the rock beneath an island (tier 0 rim slab, tie… |
| V05-0015 | term | 1 | glossary | head, *Citations* paragraph (raised-way piers) | Raised-way piers = item 110 (b)'s supports on ground part 0; a bare 'pier' is a harbour pier (§… |
| V05-0016 | scope | 1.1 | home | V05 §1.1 (one table, each subject → its section) | V05 builds 23 subjects to build depth: existence/count, supply law, purpose, sky allocation, sh… |
| V05-0017 | decision | 1.1 | home | base §4.5 *Fields* (item 296, from BCR-V5-15); V05 §3.19 (1) cites it; J-V5.42 amended | V05 fixes the model sun's sample set where item 102 leaves it open: nine suns at the equinox an… |
| V05-0018 | hooktable | 1.2 | home | V05 §1.2 (two columns: base section and use; values read at the base) | Base hooks consumed table: 45 rows (II.6, II.1 (5), §1.1, §2.1-§2.9, §3.4, §3.7, §4.1, §4.2, §4… |
| V05-0019 | restated-fact | 1.2 | reference | V05 §1.2: pointer to §1.1 (restatement cut) | RungProfile.layers.islands is 'none' at TOWN and the village rungs, 'possible' at CITY and METR… |
| V05-0020 | restated-fact | 1.2 | reference | V05 §1.2: the §4.3 row cites the slot (item 290 (1)); V01 BCR-39's restatement cut (V05-RESTATE-2, V05-DEFER-2) | V01 BCR-39 (critique V1C-69, alias I110R-1): recommended slot of item 110 (b)'s generation: via… |
| V05-0021 | scope | 1.3 | index-row | V05 §1.3 (kept; the base's Judgment-calls index row cites it) | Out of scope: laying the island's districts, blocks, plots and buildings is V01's unit run (V01… |
| V05-0022 | scope | 1.3 | index-row | V05 §1.3 (kept; the base's Judgment-calls index row cites it) | Out of scope: scheduling epochs is V06; V05 states the island laws an epoch applies (IslandEpoc… |
| V05-0023 | scope | 1.3 | index-row | V05 §1.3 (kept; the base's Judgment-calls index row cites it) | Out of scope: screens/panels/gestures V09; clerk prompts V10; word lists and grammar rows for i… |
| V05-0024 | rule | 1.3 | home | V05 §1.3 | Islands have no relation to the underground: nothing in V05 reads or writes an underground part… |
| V05-0025 | scope | 1.3 | index-row | V05 §1.3 (kept; the base's Judgment-calls index row cites it) | Out of scope: the daylight term itself (w_sun, sun samples, pass-1 terrain and wall shade, the … |
| V05-0026 | scope | 1.3 | index-row | V05 §1.3 (kept; the base's Judgment-calls index row cites it) | Out of scope: custom chains' discovery/activation/arrival V08's; a chain's street-scale closene… |
| V05-0027 | wiring | 1b | home | V05 §1b | skyGate (gate result, V5 §3.2): fed by recipe.layers.islands, RungProfile.layers.islands, DR-SK… |
| V05-0028 | wiring | 1b | home | V05 §1b | Slot draw (V5 §3.2): fed by island.place stream, IslandRule.chance, h_town(S_town), forced slot… |
| V05-0029 | wiring | 1b | home | V05 §1b | S_town: fed by field pass 1 (S6) over built district cells, at an epoch the re-evaluated field;… |
| V05-0030 | wiring | 1b | home | V05 §1b | Node term of h_town: fed by the dossier digest's site.deposits (magical_node available, or disc… |
| V05-0031 | wiring | 1b | home | V05 §1b | S_carried: fed by the fill's households' bands, the town's FieldBands.cuts, an institution row'… |
| V05-0032 | wiring | 1b | home | V05 §1b | IslandRule value rows townSupply, carriedSupply: defaults here, editTable, P0 calibration (V5 §… |
| V05-0033 | wiring | 1b | index-row | V05 §1b calibration register row; V05 §8 *The register at the exits* | Calibration register entries for islands.json calibratable columns and lights.json radiusMargin… |
| V05-0034 | wiring | 1b | home | V05 §1b | IslandInstitution rows: defaults here, editTable, roster demand (S2), Government.kind, DR9/DR24… |
| V05-0035 | wiring | 1b | home | V05 §1b | Sky Allocation: produced by S7b (5) under the supply law; consumed by the unit run's S10a/S10b … |
| V05-0036 | wiring | 1b | home | V05 §2.6, the `SkyIsland` record row (V05-DUP-3: one home per field; §1b wires the rest) | SkyIsland record: produced by SkyStrategy (V5 §3.6-§3.10), raiseIsland, edits (V5 §4); consumed… |
| V05-0037 | wiring | 1b | home | V05 §2.6, the `key`; `nextSkyPart` row (V05-DUP-3: one home per field; §1b wires the rest) | Document.nextSkyPart: produced by every island creation; consumed by PlatKey.part and the sky<n… |
| V05-0038 | wiring | 1b | home | V05 §2.6, the `rim`, `land` and arena L0 row (V05-DUP-3: one home per field; §1b wires the rest) | Island arena L0 (void face, land face, rim chain, water faces): produced by SKY's L0 batch; con… |
| V05-0039 | wiring | 1b | home | V05 §2.6, the `terrain`, `river` row (V05-DUP-3: one home per field; §1b wires the rest) | Island Terrain with the echo: produced by S1's machinery on the island key, the ground's relief… |
| V05-0040 | wiring | 1b | home | V05 §2.6, the `terrainEcho` row (V05-DUP-3: one home per field; §1b wires the rest) | terrainEcho.reliefClass: produced by SKY's draw on island.place index 'relief' for an 'own' rel… |
| V05-0041 | wiring | 1b | home | V05 §2.6, the `terrain`, `river` row (V05-DUP-3: one home per field; §1b wires the rest) | Conjured river WaterBody with fall: produced by S1's rivers by descent on the island key; consu… |
| V05-0042 | wiring | 1b | home | V05 §2.6, the rim strip and claims row (V05-DUP-3: one home per field; §1b wires the rest) | Rim strip: produced by SKY's island L1 batch, re-laid inside the new rim with the landing yards… |
| V05-0043 | wiring | 1b | home | V05 §2.6, the rim strip and claims row and the ground landing yards row (V05-DUP-3: one home per field; §1b wires the rest) | landing reservations: on each island produced by SKY's L1 batch (re-claimed at the re-seated to… |
| V05-0044 | wiring | 1b | home | V05 §2.6, the `accesses`; `SkyAccess.*` row (V05-DUP-3: one home per field; §1b wires the rest) | SkyAccess record: produced by SKY's access step, placeSkyAccess, the island's move; consumed by… |
| V05-0045 | wiring | 1b | home | V05 §2.6, the ground landing allocation row (V05-DUP-3: one home per field; §1b wires the rest) | Ground landing allocation row {cls:'sky_landing', at, access}: produced by SKY's access step un… |
| V05-0046 | wiring | 1b | home | V05 §1b | sky_landing / sky_landing_top class rows: facts here, rows by V11; consumed by S10b, S11, the r… |
| V05-0047 | wiring | 1b | home | V05 §2.6, the `field` row (V05-DUP-3: one home per field; §1b wires the rest) | SkyIsland.field and the island's prosperity gradient: produced by SKY from the carried bands' p… |
| V05-0048 | wiring | 1b | home | V05 §1b `SkyUnitInput` row; V05 §2.3 (renamed, G-unitinput) | SkyHandover (derived view, never stored): produced by skyHandover(doc, island) of @plat/sky fro… |
| V05-0049 | wiring | 1b | home | V05 §2.6, the `altitudeCm`, `groundRefCm` row (V05-DUP-3: one home per field; §1b wires the rest) | groundRefCm and the altitude fixed at SKY: produced from the ground terrain under the projected… |
| V05-0050 | wiring | 1b | home | V05 §2.6, the `IslandShadeStrip` rows (and V05 §1b `islandShadeStrip`) (V05-DUP-3: one home per field; §1b wires the rest) | IslandShadeStrip: produced by islandShadeStrip(island, samples) over the shadeBasis's smooth un… |
| V05-0051 | wiring | 1b | home | V05 §2.6, the `shadeBasis` row (V05-DUP-3: one home per field; §1b wires the rest) | SkyIsland.shadeBasis (optional): written by every shade evaluation (SKY's last step; S10a's sta… |
| V05-0052 | wiring | 1b | home | V05 §1b | The strip's basis hash: the hash of shadeBasis (§6.2); read by the shade view's pending outline… |
| V05-0053 | wiring | 1b | home | V05 §2.6, the strip onto an island / `shadeSky` row (V05-DUP-3: one home per field; §1b wires the rest) | shadeSky (sky receivers' shade): produced by a higher island's underside tiers under the same s… |
| V05-0054 | wiring | 1b | home | V05 §1b | skyRoute (route distance): produced from the island's and ground's class distance rasters, each… |
| V05-0055 | wiring | 1b | home | V05 §1b | Island coverage units: from item 103 (f)'s coverage rows, the island's district count k from di… |
| V05-0056 | wiring | 1b | home | V05 §1b | IslandRule.carry: defaults, editTable, item 107 (a)'s balance profiles, item 103 (a)'s EMITS/NE… |
| V05-0057 | wiring | 1b | home | V05 §1b | IslandInstitution.handover: defaults, editTable; consumed by S10b's placement into an S3 reserv… |
| V05-0058 | wiring | 1b | home | V05 §2.6, the crypt site row (V05-DUP-3: one home per field; §1b wires the rest) | Island cathedral's crypt site: from the claim's site search with the crypt-floor test (IslandRu… |
| V05-0059 | wiring | 1b | home | V05 §1b | IslandRule.districtHa, fabricPrior, sky-* district kinds: defaults, editTable; consumed by V01'… |
| V05-0060 | wiring | 1b | home | V05 §1b | Cross-arena links, splits, orders (V5 §3.20 (10)-(12)): from item 105's web, item 107's balance… |
| V05-0061 | wiring | 1b | home | V05 §1b | Rim as a barrier: from the rim chain, V11's sheer defensibility row, an author's T3 wall on the… |
| V05-0062 | wiring | 1b | home | V05 §1b | Access admissibility transform: from the 64 m class raster and admitted access runs; consumed b… |
| V05-0063 | wiring | 1b | home | V05 §1b | Ground landing destination: from SKY's ground L1 batch where no spine lies within reach; consum… |
| V05-0064 | wiring | 1b | index-row | V05 §1b `demandTaken` row (lifecycle cells folded in) | EpochOps.demandTaken and the displaced pool's cause 'island': produced by IslandEpochStep (refl… |
| V05-0065 | wiring | 1b | home | V05 §1b | Sky semantics' slots and the sky.ground role: from this volume's per-family facts and V11 palet… |
| V05-0066 | wiring | 1b | home | V05 §1b | Sky WhyProvider and daylight term per-island attribution: produced by @plat/sky; consumed by V1… |
| V05-0067 | wiring | 1b | home | V05 §1b | Custom chains across the island: from the dossier's active reviewed chains (V08 arrival, item 1… |
| V05-0068 | wiring | 1b | home | V05 §1b | Landing classes' siting facts: stated here, rows V11's; consumed by S10b's neighbours on both a… |
| V05-0069 | wiring | 1b | home | V05 §1b | Sky light rows rim, keel, skyAccess: from the light table and h_carried; consumed by LightSourc… |
| V05-0070 | wiring | 1b | home | V05 §2.6, the `name` row (V05-DUP-3: one home per field; §1b wires the rest) | Island name and QuarterNode root: from S13a's naming with the island's features; consumed by La… |
| V05-0071 | wiring | 1b | home | V05 §2.6, the `underside` row (V05-DUP-3: one home per field; §1b wires the rest) | UndersideProfile: from SKY using the rule's underside row and island.place, setAttr(underside.*… |
| V05-0072 | wiring | 1b | home | V05 §1b | Underside slab tiers and the sky surface layer: produced by S14 from the island record and unde… |
| V05-0073 | wiring | 1b | home | V05 §1b | IslandEpochStep: fed by the epoch's field, rung and demand and the dossier's institution record… |
| V05-0074 | wiring | 1b | home | V05 §1b landfall row; V05 §3.16 (4)'s covered-kind table (V05-DUP-2) | Landfall: produced by fallIsland: fallen_island decoration with typed members (DecorationMember… |
| V05-0075 | wiring | 1b | home | V05 §1b | Casters under an island (raised parts, retaining walls, massing tiers, levelled platforms): fro… |
| V05-0076 | wiring | 1b | home | V05 §1b | sky.clearance epoch participant and op reclearIsland: fed by every caster the epoch committed u… |
| V05-0077 | wiring | 1b | home | V05 §1b | skyAccessObstacles(doc): from committed SkyAccess records, islands' anchors and rim bases, Isla… |
| V05-0078 | wiring | 1b | home | V05 §1b | Accesses' admissible ground without decks and raised-way piers: from committed raised parts' pi… |
| V05-0079 | wiring | 1b | home | V05 §2.6, the island `RetainingWall`s row (V05-DUP-3: one home per field; §1b wires the rest) | Island RetainingWalls: produced by V01's unit run levelling island ground at S10/S11 by item 11… |
| V05-0080 | wiring | 1b | home | V05 §1b | The raised-way generator's reads of the sky (V5 §3.22 (5)): this volume's rule; read by item 11… |
| V05-0081 | wiring | 1b | home | V05 §1b | Strip receiver heights = the unlevelled ground raster: S1's Terrain raster with T2 terrain stro… |
| V05-0082 | wiring | 1b | index-row | V05 §1b `levelledGroundCm` on a sky key row (V05's readers); base §4.7 (item 309) owns the function | levelledGroundCm(doc, key, p): from item 110 (a)'s platform datums (S10, S11; the island unit r… |
| V05-0083 | wiring | 1b | home | V05 §2.6, the `removed` and `removedAccesses` rows (and V05 §1b `removedSlots`) (V05-DUP-3: one home per field; §1b wires the rest) | Removed slots and removed access ordinals (convert removeIsland; SkyIsland.removed, .removedAcc… |
| V05-0084 | wiring | 1b | home | V05 §1b | DR-SKY: reads the dossier's population, wealth.label, site.magic, site.deposits, institutions (… |
| V05-0085 | wiring | 1b | home | V05 §1b | Events placeSkyAccess, quarter with sky, key on point-form events (drawWall among them), setFie… |
| V05-0086 | wiring | 1b | home | V05 §1b | F-SKY rows and sky invariants: from every SKY step; consumed by §5.4's report and the dry run (… |
| V05-0087 | wiring | 1b | home | V05 §1b | Budgets (V5 §6): from M6-sky's measurements; consumed by §12's rows (BCR-V5-14).… |
| V05-0088 | record | 2.1 | home | V05 §2.1 | SkyIsland (replaces §2.7's SkyIsland, BCR-V5-1): id 'sky<part>/island:<token>'; slot 1/2/3; key… |
| V05-0089 | rule | 2.1 | home | V05 §2.1 | SkyIsland.slot: a fallen island frees its slot; a removed one holds it closed until removed.rel… |
| V05-0090 | rule | 2.1 | home | V05 §2.1 | groundRefCm = greatest, under the projected solid, of the ground terrain height plus the caster… |
| V05-0091 | derived | 2.1 | home | V05 §2.1 | elevationCm is derived at read: groundRefCm + altitudeCm — the island terrain's surface datum a… |
| V05-0092 | rule | 2.1 | home | V05 §2.1 | shadeBasis is written only by a shade evaluation, never by an island edit; absent on an island … |
| V05-0093 | rule | 2.1 | home | V05 §2.1 | SkyIsland.removed.releasedBy: the seq of the T5 sky declaration that re-filled its slot when no… |
| V05-0094 | record | 2.1 | home | V05 §2.1 | UndersideProfile {kind cone/bowl/root/flat (radius ratio ρ(z) at depth fraction z: cone 1−z, bo… |
| V05-0095 | record | 2.1 | home | V05 §2.1 | ShadeBasis {epoch; by generation/rederive/epoch; anchor; elevationCm; groundRefCm; surfaceTopCm… |
| V05-0096 | rule | 2.1 | home | V05 §2.1 | Local coordinates, one world anchor: an island arena is laid in a local frame centred on (0,0);… |
| V05-0097 | interface | 2.1 | home | V05 §2.1 | removedSlots(doc) (@plat/sky, draw-free): {island, slot, name?, seq, accesses number[]}[] — eve… |
| V05-0098 | record | 2.1 | home | V05 §2.1 | Document.nextSkyPart: number — the part the next island takes (1 at creation), never decreasing… |
| V05-0099 | record | 2.2 | home | V05 §2.2 | SkyAccess {id 'sky<part>/skyaccess:<token>' keyed in its island arena; island; kind hoist/ropew… |
| V05-0100 | rule | 2.2 | home | V05 §2.2 | No access is a way (J-V5.61): a SkyAccess is never a way, an arena edge between arenas or a por… |
| V05-0101 | derived | 2.2 | home | V05 §2.2 | Derived at read, never stored: access run (hoist, stair: vertical drop from rim base to foot's … |
| V05-0102 | constant | 2.2 | home | V05 §2.2 | Stair path: helix of radius access.stair.radiusM (6 m) about the vertical through the foot, fro… |
| V05-0103 | rule | 2.2 | home | V05 §2.2 | A secret access's ground landing carries its knownTo: its sky_landing use is fronted by item 63… |
| V05-0104 | interface | 2.3 | home | V05 §2.3 | SkyHandover (derived view, draw-free, never persisted): {island, key, land FaceRef L0, rimStrip… |
| V05-0105 | mechanism | 2.3 | home | V05 §2.3 | SKY builds per island the NeighbourhoodRequest of V01 §2.4: district = the island's sky pseudo-… |
| V05-0106 | rule | 2.3 | reference | V05 §2.3: pointer to V01 §3.10.3 (restatement cut) | The partition is V01's: island district count and cut are V01 §3.10.3 (2)'s (V05 neither counts… |
| V05-0107 | interface | 2.3a | home | V05 §2.3a | IslandShadeStrip = islandShadeStrip(doc, island, samples, onto) (pure, draw-free): {island (cas… |
| V05-0108 | rule | 2.3a | home | V05 §2.3a | Where strips live: strips onto the ground held with the prosperity field's rasters (§4.5) besid… |
| V05-0109 | rule | 2.3a | home | V05 §2.3a | A strip is a pure function of its caster's shadeBasis, the receiver (ground's committed terrain… |
| V05-0110 | interface | 2.3b | home | V05 §2.3b | skyAccessObstacles(doc): SkyAccessObstacle[] (pure, draw-free, from committed accesses; world c… |
| V05-0111 | rule | 2.3b | home | V05 §2.3b | Against access obstacles: a deck, its parapet and its raised-way piers stay outside every colum… |
| V05-0112 | record | 2.4 | home | V05 §2.4 | IslandRule (revised, BCR-V5-4; islands.json in @plat/tables; one row per rung CITY/METROPOLIS):… |
| V05-0113 | restated-fact | 2.4 | reference | V05 §2.4: pointer to II.6 (restatement cut) | IslandRule.chance = [0.6, 0.5, 0.35] (II.6 (4)) and redrawPerYear = 0.1 (II.6 (4)) stated with … |
| V05-0114 | record | 2.4 | home | V05 §2.4 | CarryRule (item 23: a default, never a law; every list editable): never {balance (item 107 (a) … |
| V05-0115 | record | 2.4 | home | V05 §2.4 | IslandInstitution {kind; tags (roster class tags in preference order); requirementBand; areaHa;… |
| V05-0116 | record | 2.4 | home | V05 §2.4 | SkyAccessRow {kind; magic none/low/high[]; weight; maxAltitudeM?; maxRunM? (horizontal top-to-f… |
| V05-0117 | rule | 2.4 | home | V05 §2.4 | Default rows are own values (provenance own, extension: no reference has islands, II.6 (8)), ea… |
| V05-0118 | constant | 2.4 | home | V05 §2.4 | townSupply ⟨P0⟩ (CITY=METROPOLIS): (0.45,0) (0.58,0.5) (0.70,1) on absolute field values; carri… |
| V05-0119 | constant | 2.4 | home | V05 §2.4 | areaHaMax/minAreaHa: CITY 10/1.5 ha, METROPOLIS 20/1.5 ha; altitudeM/clearanceM: CITY [60,160]/… |
| V05-0120 | constant | 2.4 | home | V05 §2.4 | underside defaults: kinds cone 0.30, bowl 0.25, root 0.40, flat 0.05; rim 10 m; depth 0.45 × eq… |
| V05-0121 | constant | 2.4 | home | V05 §2.4 | placement: prefs water 1.0, fields 0.8, outskirts 0.6, core 0 (II.6's default placement); gap 8… |
| V05-0122 | constant | 2.4 | home | V05 §2.4 | outline.templates: disc 0.25, d_shape 0.15, lozenge 0.20, crescent 0.10, spindle 0.30; detail r… |
| V05-0123 | constant | 2.4 | home | V05 §2.4 | terrain echo default; amplitude 0.25 of the ground's relief class, dome 6 m + 0.02 × radius, ti… |
| V05-0124 | constant | 2.4 | home | V05 §2.4 | landing: yard 12 × 14 m, rim strip 6 m, way reach 60 m; landingKernel weight 0.05, radius 150 m… |
| V05-0125 | constant | 2.4 | home | V05 §2.4 | field: ε share 0.05, greenery bonus +0.10; ε wavelength 120 m; rank 0.6 × elevation + 0.4 × vie… |
| V05-0126 | constant | 2.4 | home | V05 §2.4 | dynamics: hysteresis 0.05, dwell waning [5,15] y, settled [10,40] y, growth 0.05 of area per ye… |
| V05-0127 | constant | 2.4 | home | V05 §2.4 | surfaceTopPercentile 95; accessCount one per 5 ha at most 3; accessSiting feet ≥ 30 m apart, tu… |
| V05-0128 | constant | 2.4 | home | V05 §2.4 | fill: batch 1 % of band demand (≥ 1 household), cap 3 × H_d, coverage overshoot 1.05; instituti… |
| V05-0129 | constant | 2.4 | home | V05 §2.4 | districtHa CITY 3.5 ha, METROPOLIS 4.5 ha (about one Neighbourhood patch per island district; a… |
| V05-0130 | constant | 2.4 | home | V05 §2.4 | carry defaults: never balance heavy-processor, wholesale-storage; smell, smoke, water pollution… |
| V05-0131 | constant | 2.4 | home | V05 §2.4 | shade.basisVertexCap 256; naming low below 90 m, high from 150 m; export glTF rings 64 points, … |
| V05-0132 | table | 2.4 | home | V05 §2.4 | Institution rows: palace (tags palace; rich; 3.0 ha; 40 staff; weight 0.35; government crown or… |
| V05-0133 | rule | 2.4 | home | V05 §2.4 | Tower row: the owner's unique institution read for an arcane tower on its own ground (item 104 … |
| V05-0134 | rule | 2.4 | home | V05 §2.4 | A prison's band is its paymaster's (prosperous), not its inmates'. A handover tag is taken by t… |
| V05-0135 | table | 2.4 | home | V05 §2.4 | Access rows: hoist (magic none/low/high; weight 1.0; altitude ≤ 400 m; land below yes); ropeway… |
| V05-0136 | rule | 2.4 | reference | V05 §2.4 — kept as the home (V11 §3.5.13 compiles its rows from these facts and cites V05 §2.4); the reference role marked for the adjudicator | Landing classes (facts here; rows V11's, §10.2 schema): sky_landing on the ground — yard plot 1… |
| V05-0137 | rule | 2.4 | home | V05 §2.4 | District kinds: sky-island for a prosperity island's districts; sky-palace, sky-temple, sky-pri… |
| V05-0138 | rule | 2.4 | home | V05 §2.4 | Landing classes' siting facts (item 103 (a) profile columns): sky_landing sited by its access n… |
| V05-0139 | table | 2.5 | home | V05 §2.5 | Identity: SkyIsland lineage = the town; slot at generation; at an epoch town, slot and epoch co… |
| V05-0140 | lifecycle | 2.6 | home | V05 §2.6 | slot: create S7b (5) slot draw (a declaration takes the lowest free slot, or the lowest held sl… |
| V05-0141 | lifecycle | 2.6 | home | V05 §2.6 | key / nextSkyPart: create takes nextSkyPart and bumps; persist model digest and counter; regen … |
| V05-0142 | lifecycle | 2.6 | home | V05 §2.6 | anchor: create placement or declaration; read S14, slabs, exports, landings, reader; regen kept… |
| V05-0143 | lifecycle | 2.6 | home | V05 §2.6 | rim, land: create SKY L0 batch; read unit run, draw, resize; persist arena geometry; regen re-d… |
| V05-0144 | lifecycle | 2.6 | home | V05 §2.6 | areaHa: supply law or edit; read resize, fill, reader; law re-evaluates only at an epoch; undo … |
| V05-0145 | lifecycle | 2.6 | home | V05 §2.6 | altitudeCm, groundRefCm: create V5 §3.9 at SKY (caster ceiling incl. item 110), before field pa… |
| V05-0146 | lifecycle | 2.6 | home | V05 §2.6 | underside: create SKY from rule row and island.place; read slab tiers, offset view, glTF, clear… |
| V05-0147 | lifecycle | 2.6 | home | V05 §2.6 | terrain, river: create SKY (V5 §3.8); persist model digest (terrain raster in arena chunk); reg… |
| V05-0148 | lifecycle | 2.6 | home | V05 §2.6 | terrainEcho (river, relief, reliefClass): create SKY (§3.8 (3)-(4)), own relief class drawn on … |
| V05-0149 | lifecycle | 2.6 | home | V05 §2.6 | districts: create SKY-F from the unit run's NeighbourhoodResult.districts (V01 V1-2.4); rewritt… |
| V05-0150 | lifecycle | 2.6 | home | V05 §2.6 | reason, institution: S7b (5) or an assignment; Re-derive from S7b. placement: V5 §3.7; kept by … |
| V05-0151 | lifecycle | 2.6 | home | V05 §2.6 | field (mean, density, greenery) and gradient: create SKY (gradient from carried bands' shares, … |
| V05-0152 | lifecycle | 2.6 | home | V05 §2.6 | shadeBasis: create every shade evaluation (SKY's last step at generation and any re-derivation … |
| V05-0153 | lifecycle | 2.6 | home | V05 §2.6 | accesses: V5 §3.10 or placeSkyAccess; kept by New random (tops re-seated). name: S13a; §6.3 nam… |
| V05-0154 | lifecycle | 2.6 | home | V05 §2.6 | removed (seq, generated, releasedBy): create convert removeIsland (T9 delete, clerk); releasedB… |
| V05-0155 | lifecycle | 2.6 | home | V05 §2.6 | removedAccesses: create fold of a delete whose target is a generated SkyAccess (ordinal appende… |
| V05-0156 | lifecycle | 2.6 | home | V05 §2.6 | Island RetainingWalls: create V01 unit run levelling (S10, S11), T3 retaining and T2 terrace wi… |
| V05-0157 | lifecycle | 2.6 | home | V05 §2.6 | SkyAccess.*: V5 §3.10 or placeSkyAccess; regen tops re-seated on a re-derived rim, and on a res… |
| V05-0158 | lifecycle | 2.6 | home | V05 §2.6 | Rim strip (setback line and rim_strip face) and island claims (each landing Reservation kind la… |
| V05-0159 | lifecycle | 2.6 | home | V05 §2.6 | Decoration.name, .source: fallIsland; never regenerated. Decoration.members (DecorationMember[]… |
| V05-0160 | lifecycle | 2.6 | reference | V05 §2.6 `Way.formerClass` row — writer cell only; other cells V06 §2.12 (V05-RESTATE-7) | Way.formerClass (V06's field, V6 §2.8, BCR-V6-5; V05 a writer): fallIsland writes a covered way… |
| V05-0161 | lifecycle | 2.6 | reference | V05 §2.6 stretch-state profiles row — writer cell only; other cells §2.2 rule 5, items 575, 245 (E-01) | Enceinte.condition (file f item 575's step profile; V05 a writer): fallIsland writes breached o… |
| V05-0162 | lifecycle | 2.6 | home | V05 §2.6 | IslandShadeStrip onto the ground: create at S10a (generation and every re-derivation from S10a … |
| V05-0163 | lifecycle | 2.6 | home | V05 §2.6 | IslandShadeStrip onto an island and shadeSky: create SKY's last step after every island's own s… |
| V05-0164 | lifecycle | 2.6 | home | V05 §2.6 | New table cells (institution archetypes/tags/handover/tower row, casterAllowanceM, shade, routi… |
| V05-0165 | lifecycle | 2.6 | home | V05 §2.6 | Reservation.owner and .handedFrom of an S3 reservation an institution island leaves (BCR-V5-19)… |
| V05-0166 | lifecycle | 2.6 | home | V05 §2.6 | Island cathedral's crypt site: create SKY's claim site search (crypt-floor test); read the cath… |
| V05-0167 | lifecycle | 2.6 | home | V05 §1b `demandTaken` row (lifecycle cells folded in) | EpochOps.demandTaken and displaced pool cause island: create IslandEpochStep; read V06 siting t… |
| V05-0168 | lifecycle | 2.6 | home | V05 §1b node-term row (lifecycle cells folded in) | Node term (derived, never stored): S7b (5) and each epoch's evaluation from the digest's site.d… |
| V05-0169 | lifecycle | 2.6 | home | V05 §2.6 | IslandShadeStrip.bits and mask layout: with the strip; a sampler digest that differs from the s… |
| V05-0170 | step | 3.1 | home | V05 §3.1 | Stage S7b (5): gate, slots, reasons, fills, outline, placement per slot (V5 §3.2-§3.7); inside … |
| V05-0171 | step | 3.1 | home | V05 §3.1 | Stage SKY (SkyStrategy.place, per island in slot order): arena (§3.8), underside, ground refere… |
| V05-0172 | step | 3.1 | home | V05 §3.1 | S10a (base, item 102 (c)): the islands' strips onto the ground from each shadeBasis computed on… |
| V05-0173 | step | 3.1 | reference | V05 §3.1 table row citing V01 §3.10.3 and §4.1's units (item 282) | The unit run (V01 §3.10), one per island: after the ground's S10 (0) (V01 §3.10.3); concurrent … |
| V05-0174 | step | 3.1 | home | V05 §3.1 | SKY-F post step: clearance check (§3.9 (5)), landing check and repair (§3.12), sky lights (§3.1… |
| V05-0175 | rule | 3.1 | home | V05 §3.1 | Declared I/O (SL-01; J-V5.70): SKY's StageDecl (§4.12) reads S7b's outputs (with hooks united i… |
| V05-0176 | rule | 3.1 | reference | V05 §3.1: pointer to §4.1 (restatement cut) | The ground's L1 writers become S3, S4, S5, S6, S7, S7b, SKY and S8 in that order (BCR-V5-3).… |
| V05-0177 | rule | 3.1 | home | V05 §3.1 | Nothing of the sky runs on the one-click path: recipe.layers.islands off by default (D-3); with… |
| V05-0178 | rule | 3.1 | home | V05 §3.1 | Item 110's raised ways in the order (C5-47, C5-52; J-V5.63): relies on V01 BCR-39's recommended… |
| V05-0179 | rule | 3.2 | home | V05 §3.2 | Gate: islands exist only if recipe.layers.islands = 'on', RungProfile.layers.islands = 'possibl… |
| V05-0180 | rule | 3.2 | home | V05 §3.2 | Forced slots: every declared island of the creation prefix (T5 quarter with sky) and every assi… |
| V05-0181 | rule | 3.2 | home | V05 §3.2 | Count: recipe.params['islands.count'] auto (default) or 0-3 (adjust). Integer n: exactly n slot… |
| V05-0182 | rule | 3.2 | home | V05 §3.2 | Report lists count, forced slots and each slot's outcome (held: 'removed by you'); with the set… |
| V05-0183 | rule | 3.2 | home | V05 §3.2 | Removed slots (C5-51; J-V5.62): a slot held by a removed island record with releasedBy absent i… |
| V05-0184 | rule | 3.2 | home | V05 §3.2 | A count never releases a hold (ST-04): an integer islands.count counts held slots as filled and… |
| V05-0185 | rule | 3.3 | home | V05 §3.3 | S_town = mean prosperity P over built land: §4.5 32 m field cells whose centres lie in a distri… |
| V05-0186 | rule | 3.3 | home | V05 §3.3 | S_carried = mean over carried households of their band's value v(b): midpoint of the band's two… |
| V05-0187 | rule | 3.3 | home | V05 §3.3 | h_town and h_carried interpolate townSupply/carriedSupply linearly, 0 below the first row, 1 ab… |
| V05-0188 | rule | 3.3 | home | V05 §3.3 | Magical node (J-V5.41; BCR-V5-17): where site.deposits carries a magical_node available (or dis… |
| V05-0189 | rule | 3.3 | home | V05 §3.3 | The clerk's why names 'the node beneath the old ruins' from the generation report's ruin.node l… |
| V05-0190 | calibration | 3.3 | home | V05 §3.3 | Calibration ⟨P0⟩: on 200 CITY and 100 METROPOLIS seeds at targets, wealthLevel ∈ {0, 0.25, 0.5,… |
| V05-0191 | fallback | 3.3 | home | V05 §3.3 | Pre-decided fallback: if m_1 − m_0 < 0.10, S_town becomes 0.5 · field mean + 0.5 · w (w = wealt… |
| V05-0192 | rule | 3.4 | home | V05 §3.4 | Purpose per open slot in order: a forced slot takes its declaration's kind (institution kind → … |
| V05-0193 | rule | 3.4 | home | V05 §3.4 | Candidates: prosperity (weight 1.0) where roster households of bands with h_carried(v(b)) > 0 n… |
| V05-0194 | rule | 3.4 | home | V05 §3.4 | An eligible instance is one building or one compound (item 108 (a)): a singular record, a recor… |
| V05-0195 | rule | 3.4 | home | V05 §3.4 | The archetype is read at this draw only: a later revision of a custom kind re-resolves its prof… |
| V05-0196 | rule | 3.4 | home | V05 §3.4 | The reason draw: one weighted choice on island.place (town lineage, index reason:k); with no ca… |
| V05-0197 | rule | 3.5 | home | V05 §3.5 | Prosperity slot fill (1)-(2): eligible bands those with h_carried(v(b)) > 0, richest first; hou… |
| V05-0198 | rule | 3.5 | home | V05 §3.5 | Held shares never taken: households a dossier district-defining record's raised share holds on … |
| V05-0199 | rule | 3.5 | home | V05 §3.5 | Fill stops at the first of: carried plot land (Σ plotArea(c,b) × count, S2's plot areas at band… |
| V05-0200 | rule | 3.5 | home | V05 §3.5 | Carried workplaces via IslandRule.carry (J-V5.32, J-V5.39, J-V5.51): for each workplace or inst… |
| V05-0201 | rule | 3.5 | home | V05 §3.5 | (a) Never carried: IslandInstitution tags (their own slots); town-unique classes (§10.2's uniqu… |
| V05-0202 | rule | 3.5 | home | V05 §3.5 | (b) Carried by share: every class (a) does not exclude (carry.share.balance everyday services a… |
| V05-0203 | rule | 3.5 | home | V05 §3.5 | (d) Collective members (item 108 (b), (c)): a member #k of a COUNT, GUILD or QUARTER record car… |
| V05-0204 | rule | 3.5 | home | V05 §3.5 | Coverage (item 103 (f); J-V5.37): the island counts as k units for a row counted by district or… |
| V05-0205 | rule | 3.5 | home | V05 §3.5 | If A < minAreaHa the slot closes (reported) and its rows return to the demand; the island's dis… |
| V05-0206 | rule | 3.5 | home | V05 §3.5 | Institution slot: the row's instance with claim set once SKY makes it (V5 §3.10), plus staffHou… |
| V05-0207 | rule | 3.5 | home | V05 §3.5 | A greater goes up alone (item 108 (c); J-V5.57): a greater subsuming lessers (cathedral over pa… |
| V05-0208 | rule | 3.5 | home | V05 §3.5 | Ground reservation handover (J-V5.46; BCR-V5-19): where the instance holds an S3 reservation (t… |
| V05-0209 | rule | 3.5 | home | V05 §3.5 | An institution the creation prefix sends up (T5 sky declaration of its kind, T6 criteria.sky as… |
| V05-0210 | rule | 3.5 | home | V05 §3.5 | Burial and crypt (item 109 (k) (2)-(3), J111; J-V5.43): an island church's churchyard part (§4.… |
| V05-0211 | rule | 3.5 | home | V05 §3.5 | The rest: S7b (1) allocates the remainder to the ground's districts, so the population stays wh… |
| V05-0212 | rule | 3.6 | home | V05 §3.6 | Shape (1)-(2): template from a declaration's points form (lasso = outline itself; one point = d… |
| V05-0213 | rule | 3.6 | home | V05 §3.6 | Shape (3)-(4): §4.2 S1 (2)'s closed-outline routine on the template's base curve with the rule'… |
| V05-0214 | rule | 3.7 | home | V05 §3.7 | Placement class raster: 64 m raster over the ground frame; cells water (centre in an L0 water f… |
| V05-0215 | rule | 3.7 | home | V05 §3.7 | Placement candidates: centroids of a latticeM lattice whose translated outline lies inside the … |
| V05-0216 | rule | 3.7 | home | V05 §3.7 | Placement score over the outline's cells: (a) mean class weight (prefs with institution overWei… |
| V05-0217 | rule | 3.7 | home | V05 §3.7 | Placement draw: topK best (ties lattice y then x), one draw weighted by score − min score + 0.0… |
| V05-0218 | rule | 3.8 | home | V05 §3.8 | Frame: after the outline, a square centred on the local origin of side 2 × r_max × √1.5 + 2 × f… |
| V05-0219 | rule | 3.8 | home | V05 §3.8 | L0 batch: the arena's outer ring (margin role on the island Terrain), then the rim (the outline… |
| V05-0220 | rule | 3.8 | home | V05 §3.8 | Island terrain: the ground's terrain cell; hydro grid at half the ground's hydro cell (12.5 m C… |
| V05-0221 | rule | 3.8 | home | V05 §3.8 | Conjured river: where the ground has a river, A ≥ river.minAreaHa and a draw on island.place (i… |
| V05-0222 | rule | 3.8 | home | V05 §3.8 | The conjured river's crossing sites are §4.2 S1 (5)'s on the island, built by V01's unit run (V… |
| V05-0223 | rule | 3.9 | home | V05 §3.9 | Underside profile (SKY): kind drawn by rule weights on island.place (index underside.kind); rim… |
| V05-0224 | interface | 3.9 | home | V05 §3.9 | undersideTiers(island) (@plat/sky; pure view data computed by S14, never stored): for tier i = … |
| V05-0225 | rule | 3.9 | home | V05 §3.9 | Ground reference (SKY, before any plot is cut): groundRefCm = greatest over the ground's 32 m f… |
| V05-0226 | rule | 3.9 | home | V05 §3.9 | Altitude: altitudeCm = max(E, rim + depth + clearanceM) (so the apex clears the tallest thing b… |
| V05-0227 | rule | 3.9 | home | V05 §3.9 | Surface top: the surfaceTopPercentile (95th) percentile over the land face of height at each po… |
| V05-0228 | rule | 3.9 | home | V05 §3.9 | Clearance check (SKY-F after the pool's merge and unit runs): where a caster placed after SKY u… |
| V05-0229 | calibration | 3.9 | home | V05 §3.9 | Clearance measurement (P0): over 1 000 islands at CITY and METROPOLIS, share raised by SKY-F ≤ … |
| V05-0230 | rule | 3.10 | home | V05 §3.10 | Access count: prosperity island min(accessCount.max, 1 + ⌊areaHa ÷ perHa⌋) (3; 5 ha), first mai… |
| V05-0231 | rule | 3.10 | home | V05 §3.10 | Access directions: d_1 = bearing from the island's world centroid to the nearest ground distric… |
| V05-0232 | rule | 3.10 | home | V05 §3.10 | Access kind at each top among rows admitted by magic (guarded = hoist only): hoist or stair whe… |
| V05-0233 | rule | 3.10 | home | V05 §3.10 | A slanted access over a raised part (C5-48): a ropeway or lightBridge whose segment passes over… |
| V05-0234 | rule | 3.10 | home | V05 §3.10 | Access foot: hoist/stair foot = the top's world point; ropeway/lightBridge foot = the chosen la… |
| V05-0235 | term | 3.10 | glossary | V05 §3.10 (4) ("the nearest way", glossary home) | 'The nearest way' (here and V5 §3.12) = a walkable part-0 way (C5-48 (4)): a raised part's deck… |
| V05-0236 | rule | 3.10 | home | V05 §3.10 | Ground landing in a district: foot moved along the perpendicular to the nearest L1 way spine wi… |
| V05-0237 | rule | 3.10 | home | V05 §3.10 | SKY writes under allocations.landing the positioned row {cls 'sky_landing', band 'modest', coun… |
| V05-0238 | rule | 3.10 | home | V05 §3.10 | The top: one splitThrough at L0 on the rim places the ('sky_access', id) vertex, pinned; SKY's … |
| V05-0239 | rule | 3.10 | home | V05 §3.10 | Institution claim scores: palace greatest mean terrain height under the claim among sites on th… |
| V05-0240 | rule | 3.10 | home | V05 §3.10 | Crypt test (item 109 (k) (2), J111; J-V5.43, J-V5.66): the crypt lies under the building's lowe… |
| V05-0241 | rule | 3.10 | home | V05 §3.10 | Crypt re-test: every later re-claim (resize, rim reshape, New random, terrain edit on the islan… |
| V05-0242 | rule | 3.10 | reference | V05 §3.10: pointer to §4.5 (restatement cut) | Ground field at pass 2 (S10a) gains a positive kernel at each ground landing (landingKernel wei… |
| V05-0243 | rule | 3.10 | home | V05 §3.10 | F-SKY-ACCESS where a top has no admitted kind (V5 §3.17).… |
| V05-0244 | rule | 3.11 | home | V05 §3.11 | Institution island field is uniform: prosperity = v(requirementBand) of its row.… |
| V05-0245 | mechanism | 3.11 | home | V05 §3.11 | Prosperity island gradient (J-V5.18): on the island's 32 m lattice (cells in land less rim stri… |
| V05-0246 | rule | 3.11 | home | V05 §3.11 | Site rank r(x): elevation rank e (percentile of terrain height) and view rank v (percentile of … |
| V05-0247 | rule | 3.11 | home | V05 §3.11 | Q maps rank to value by carried bands' shares: bands b_1 (richest)..b_m with shares s_j of carr… |
| V05-0248 | rule | 3.11 | home | V05 §3.11 | ε = the base's low-frequency fBm (§4.5) on field.chance keyed by the island, wavelength 120 m, … |
| V05-0249 | rule | 3.11 | home | V05 §3.11 | shadeSky(x) = share of the nine model sun samples in which a higher island's solid blocks the s… |
| V05-0250 | rule | 3.11 | home | V05 §3.11 | brush(x) = the island's prosperity brush strokes (setField with key) as §7.2's stroke overrides… |
| V05-0251 | rule | 3.11 | home | V05 §3.11 | With ε, shade and brush at 0 each carried band holds exactly its carried share of lattice cells… |
| V05-0252 | rule | 3.11 | home | V05 §3.11 | Sky-arena context vector (BCR-V5-6): prosperity = P_I bilinear; density, greenery as field; dis… |
| V05-0253 | rule | 3.12 | home | V05 §3.12 | The fabric hint is a prior, never a strategy (J-V5.48): on every island district S7c multiplies… |
| V05-0254 | rule | 3.12 | reference | V05 §3.12: pointer to V01 §3.10.3 (restatement cut) | The unit run must: write only the island's arena; never cut or plot the rim strip, planting it … |
| V05-0255 | rule | 3.12 | home | V05 §3.12 | SKY-F checks: every landing yard holds a sky_landing_top plot; a way meets every island attach;… |
| V05-0256 | handoff | 3.12 | handoff | V05 §3.12 (closed: V01 §3.10.3 reads the seven inputs) | Reconciliation with V01 §3.10.3 (read 2026-09-28): seven unit-run inputs are V05's and govern w… |
| V05-0257 | table | 3.13 | home | V05 §3.13 | Sky light rows (own, extension; BCR-V5-8): rim — magical orbs along the rim strip's outer edge … |
| V05-0258 | rule | 3.13 | home | V05 §3.13 | Island ordinary fabric takes the ground light rows (arena ground); each ground landing's lanter… |
| V05-0259 | rule | 3.14 | home | V05 §3.14 | Names: S13a draws each island's name on its naming stream (§6.3), reading reason and institutio… |
| V05-0260 | interface | 3.15 | home | V05 §3.15 | IslandEpochStep.apply(doc, epoch) → ConversionOp[] (@plat/sky), called by V06 each epoch after … |
| V05-0261 | interface | 3.15 | home | V05 §3.15 | Second participant sky.clearance at step afterGrowth, order 50 (after V06's hood.fabric order 4… |
| V05-0262 | rule | 3.15 | home | V05 §3.15 | Households move through V06's typed channels (BCR-V5-23): every household the step releases (wa… |
| V05-0263 | rule | 3.15 | home | V05 §3.15 | Step 1 Evaluate: the rung row of the epoch's rung — the fold's ctx.rung (V6 §3.1 (3); §4.11 as … |
| V05-0264 | rule | 3.15 | home | V05 §3.15 | Step 1b The institution has left (J-V5.53; item 20 (h)): if reason institution and it is gone (… |
| V05-0265 | rule | 3.15 | home | V05 §3.15 | Step 2 Floating: if A_t = 0 waneIsland (floating → waning), dwellUntilWeek = week + a draw in d… |
| V05-0266 | rule | 3.15 | home | V05 §3.15 | Step 3 Waning: altitude falls linearly to V5 §3.9's floor (with E_min) by dwell's end, area tow… |
| V05-0267 | rule | 3.15 | home | V05 §3.15 | Step 4 Settled: if A_t > 0 (rung admits) refloatIsland (settled → floating), regrowth-first: va… |
| V05-0268 | rule | 3.15 | home | V05 §3.15 | Step 5 Empty slots: a slot with a live unfallen island is never redrawn; an empty slot re-opens… |
| V05-0269 | rule | 3.15 | home | V05 §3.15 | Step 6: a rung crossing downward makes every island's target 0: they wane, settle and fall over… |
| V05-0270 | rule | 3.15 | home | V05 §3.15 | Step 7 Clearance after growth (sky.clearance, afterGrowth, order 50; C5-47; J-V5.68): every liv… |
| V05-0271 | rule | 3.15 | home | V05 §3.15 | Locks at the clearance step: a locked island or a lock on its altitudeCm path holds elevationCm… |
| V05-0272 | rule | 3.15 | home | V05 §3.15 | Shade over time (item 102 (e)): each epoch's S6 first writes every live island's shadeBasis fro… |
| V05-0273 | rule | 3.16 | home | V05 §3.16 | fallIsland: one convert event as a declared sequence of batches (§4.11), whatever its author; (… |
| V05-0274 | rule | 3.16 | home | V05 §3.16 | Covered set (J-V5.11): every ground entity with ≥ landfall.coverShare of its face or band insid… |
| V05-0275 | rule | 3.16 | home | V05 §3.16 | Relocation first: every use in a covered building or reservation relocated by §4.11's rule for … |
| V05-0276 | rule | 3.16 | home | V05 §3.16 | The ground (4a): every covered building demolished (cause convert:fallIsland); every covered pl… |
| V05-0277 | rule | 3.16 | home | V05 §3.16 | The ground (4b) walls: every covered wall stretch and gate steps down §4.11's wall decline ladd… |
| V05-0278 | rule | 3.16 | home | V05 §3.16 | The ground (4c): a covered bridge, pier, mole or quay-platform deck becomes ruined (the deck fa… |
| V05-0279 | rule | 3.16 | home | V05 §3.16 | Item 110's parts (C5-53): every covered raised span and raised-way pier becomes ruined, and a s… |
| V05-0280 | rule | 3.16 | home | V05 §3.16 | Every covered retaining wall (generated or drawn) steps to decayed over its covered length (ite… |
| V05-0281 | rule | 3.16 | home | V05 §3.16 | Every deck plot on a covered bridge, pier, mole or quay deck falls with its deck by item 110 (d… |
| V05-0282 | rule | 3.16 | home | V05 §3.16 | Landfall record: one ground Decoration kind fallen_island whose members (DecorationMember[], BC… |
| V05-0283 | rule | 3.16 | home | V05 §3.16 | Salvage ledger credited stone = covered land area × stoneM3PerM2 m³, from the island (§2.7 Mate… |
| V05-0284 | rule | 3.16 | home | V05 §3.16 | The sky at a fall: every entity of the island's arena (its own retaining walls and bridges' dec… |
| V05-0285 | rule | 3.16 | home | V05 §3.16 | Undo of a fall restores all from the event's undo record (§7.4 convert row), each covered way's… |
| V05-0286 | table | 3.17 | home | V05 §3.17 | F-SKY-FILL (S7b (5); fill cannot reach minAreaHa or an institution row does not fit): next elig… |
| V05-0287 | table | 3.17 | reference | V05 §3.17: pointer to §5.2 (restatement cut) | F-OUTLINE (base; S7b (5); outline not simple): §5.2's rungs; §13.2's outline property test.… |
| V05-0288 | table | 3.17 | home | V05 §3.17 | F-SKY-PLACE (S7b (5); no candidate passes V5 §3.7 (2)): halve gapM → admit core at weight 0.3 →… |
| V05-0289 | table | 3.17 | home | V05 §3.17 | F-SKY-TERRAIN (SKY; river descent stalls or cannot reach the rim): double the tilt → carve a st… |
| V05-0290 | table | 3.17 | home | V05 §3.17 | F-SKY-ACCESS (SKY, SKY-F; no admitted kind at a top; no land foot — a foot or yard meeting a de… |
| V05-0291 | table | 3.17 | home | V05 §3.17 | F-SKY-UNIT (the unit run; households it cannot house): V01's F-UNIT ladder first; the rest re-p… |
| V05-0292 | table | 3.17 | home | V05 §3.17 | F-SKY-CLEAR (SKY-F; each epoch's sky.clearance; a ground edit beneath; a caster after SKY stand… |
| V05-0293 | table | 3.17 | home | V05 §3.17 | F-SKY-CRYPT (SKY claim, every re-claim, SKY-F re-test at levelled datum; no claim site of an al… |
| V05-0294 | table | 3.17 | home | V05 §3.17 | F-SKY-SHADE (field pass 2, an epoch, SKY's last step; a strip's window passes the receiver rast… |
| V05-0295 | table | 3.17 | home | V05 §3.17 | F-SKY-LANDFALL (fallIsland; covered content locked or pinned; a covered use has no alternative … |
| V05-0296 | table | 3.18 | home | V05 §3.18 | Determinism draws (no new concern; J-V5.12): island.place keyed by town lineage indices slot:k,… |
| V05-0297 | rule | 3.18 | home | V05 §3.18 | A removed slot draws nothing (slot:k, reason:k skipped; other slots' indices unchanged); sky.cl… |
| V05-0298 | rule | 3.19 | home | V05 §3.19 | Shade samples: the base sampler of item 102 (a): sun positions {azimuthCdeg, altitudeCdeg}, nin… |
| V05-0299 | rule | 3.19 | home | V05 §3.19 | The solid from the caster's shadeBasis, never the live island (J-V5.47): undersideTiers(basis, … |
| V05-0300 | rule | 3.19 | home | V05 §3.19 | Receivers: onto the ground the field raster's 32 m cells at each sampler point x with ground he… |
| V05-0301 | rule | 3.19 | home | V05 §3.19 | The test: x blocked at sample s when the ray from (x, g) toward the sun meets a tier; per tier … |
| V05-0302 | rule | 3.19 | home | V05 §3.19 | The window: only blockable cells tested per sample; corridor = the solid's bounding box swept a… |
| V05-0303 | rule | 3.19 | home | V05 §3.19 | When — shade evaluations: each first writes every live island's shadeBasis then computes strips… |
| V05-0304 | rule | 3.19 | home | V05 §3.19 | A ground terrain edit (T2 on the ground key, a §4.11 terrain conversion) moves the receiver not… |
| V05-0305 | rule | 3.19 | home | V05 §3.19 | The fold: for each ground cell each bit of the daylight mask (pass 1 terrain and wall shade, it… |
| V05-0306 | rule | 3.19 | home | V05 §3.19 | The basis compare: each strip records the §6.2 hash of the bases it read; the shade map view an… |
| V05-0307 | derivation | 3.19 | home | V05 §3.19 | What it amounts to (PLAUSIBLE until T-V5-19): at latitude 50° equinox the nine samples stand at… |
| V05-0308 | rule | 3.20 | home | V05 §3.20 | The one placement solver (§4.7 S10b) places everything on an island in the unit run with item 1… |
| V05-0309 | interface | 3.20 | home | V05 §3.20 | skyRoute(doc, from, to) → {lengthCm, access} (@plat/sky; implementer for S10b's reader, BCR-V5-… |
| V05-0310 | rule | 3.20 | home | V05 §3.20 | Route from a ground point to an island class: the same sum the other way; inside the pooled S10… |
| V05-0311 | rule | 3.20 | home | V05 §3.20 | Admitted accesses: state open (unserved reading included), never closed or ruined; a secret acc… |
| V05-0312 | rule | 3.20 | home | V05 §3.20 | Families reading the route distance: SUPPLY (street and road modes), CLIENTELE (dist.market, di… |
| V05-0313 | rule | 3.20 | home | V05 §3.20 | (4) An island never carries IslandRule.carry.never rows (V5 §3.5 (3) (a)); (5) landings placed … |
| V05-0314 | rule | 3.20 | home | V05 §3.20 | (8) 'Why is this here' (item 103 (e)): a use on an island names the rows that pulled it; a cros… |
| V05-0315 | rule | 3.20 | home | V05 §3.20 | (9) Supply chains across the island (item 104 (h); J-V5.39): an ACTIVE custom chain (every node… |
| V05-0316 | rule | 3.20 | home | V05 §3.20 | (9)(b) Links cross by the route: every island-ground link is a street supply edge measured by s… |
| V05-0317 | rule | 3.20 | home | V05 §3.20 | (9)(c) Order: upstream first (item 104 (h) (4)); at generation the island unit run reads a grou… |
| V05-0318 | rule | 3.20 | home | V05 §3.20 | (9)(d) Shape (item 104 (h) (3) as revised by item 107 (e)): a chain on two arenas sits close at… |
| V05-0319 | rule | 3.20 | home | V05 §3.20 | (9)(e) Endpoints, services, change, declarations: an import/export endpoint's store stands at t… |
| V05-0320 | rule | 3.20 | home | V05 §3.20 | (10) Supply web across arenas (item 105 (a)-(e); J-V5.50): (a) binding to the NEAREST provider … |
| V05-0321 | rule | 3.20 | home | V05 §3.20 | (11) Split works and shops (item 105 (h); J-V5.51): one item on two plots on two arenas, works … |
| V05-0322 | rule | 3.20 | home | V05 §3.20 | (12)(a) Order and relaxation per arena (item 105 (f); J-V5.52): each arena runs item 105 (f)'s … |
| V05-0323 | rule | 3.20 | home | V05 §3.20 | (12)(b) District term (item 105 (g); SLR2-03; J-V5.75): S7b (1)'s supply term reads a sky pseud… |
| V05-0324 | rule | 3.20 | home | V05 §3.20 | (12)(c) Near enough (item 107 (b)): a cross-arena link's satisfaction plateaus on the route len… |
| V05-0325 | rule | 3.21 | home | V05 §3.21 | Rim as a barrier (item 106; J-V5.49): (1) for item 106 (a)'s closure and every enclosed/sealed … |
| V05-0326 | rule | 3.21 | home | V05 §3.21 | (3) An author's wall on an island (T3 wall in an enclosure kind with key; drawWall with key) is… |
| V05-0327 | rule | 3.21 | home | V05 §3.21 | (4) The clerk explains an unwalled rim 'the drop is the wall here'; (5) no-op pin: with item 10… |
| V05-0328 | rule | 3.22 | home | V05 §3.22 | Item 110 scope: the base carries item 110 (a)-(d) via the coherence pass, V01 terraced wards an… |
| V05-0329 | rule | 3.22 | home | V05 §3.22 | (1) Casters under an island (C5-47): raised deck top with parapet or aqueduct channel wall over… |
| V05-0330 | rule | 3.22 | home | V05 §3.22 | (2) The island yields, never the city (J-V5.68): no raised part, retaining wall or building is … |
| V05-0331 | rule | 3.22 | home | V05 §3.22 | (3) Accesses and decks (C5-48, C5-49; J-V5.60, J-V5.61): (a) feet on part-0 land only (admissib… |
| V05-0332 | rule | 3.22 | home | V05 §3.22 | (3)(d) No raised way reaches an island: a raised part's ends are ramps or stairs to ground vert… |
| V05-0333 | rule | 3.22 | home | V05 §3.22 | (4) Island's own retaining walls (C5-50; BCR-V5-27; J-V5.69): V01's unit run levels island grou… |
| V05-0334 | rule | 3.22 | home | V05 §3.22 | (5) The raised-way generator's reads of the sky (C5-52; J-V5.63; BCR-V5-29 (b)-(d)): (a) an ele… |
| V05-0335 | rule | 3.22 | home | V05 §3.22 | (6) Stepped massing and deck plots on the island (C5-55): an island institution may take V02's … |
| V05-0336 | rule | 3.22 | home | V05 §3.22 | (7) Removals: a removed generated raised way, retaining wall or deck plot beneath an island hol… |
| V05-0337 | rule | 3.22 | home | V05 §3.22 | (9) No-op pin and declared shift (C5-56; J-V5.67): with item 110's terrace, raised-way and deck… |
| V05-0338 | table | 4.1 | home | V05 §4.1 | Tools on the sky (item 101's twelve, no thirteenth; each at most one new parameter, §7.1): T1 i… |
| V05-0339 | rule | 4.1 | home | V05 §4.1 | Every declared thing is held (§7.2): a declared island's outline and position, a declared altit… |
| V05-0340 | interface | 4.2 | home | V05 §4.2 | New/extended events (BCR-V5-10): placeSkyAccess {island, top PointCm local (snapped at dry run)… |
| V05-0341 | interface | 4.2 | home | V05 §4.2 | ConversionOp island kinds (§4.11) become: resizeIsland {island, areaHa, altitudeCm}; waneIsland… |
| V05-0342 | rule | 4.2 | home | V05 §4.2 | Pointing at an island: every sky hit test and tool point converts the pointer's world point to … |
| V05-0343 | rule | 4.2 | home | V05 §4.2 | Moving an island (setAttr(anchor), T9 drag): arena untouched; dry run re-reads groundRefCm and … |
| V05-0344 | rule | 4.2 | home | V05 §4.2 | Resizing (setAttr(areaHa) or resizeIsland): rim eroded/dilated by the kernel buffer (§3.7) to t… |
| V05-0345 | rule | 4.2 | home | V05 §4.2 | Resize: the rim's L1 pieces follow in the same commit (SLR3-02; J-V5.77): one island L1 batch r… |
| V05-0346 | rule | 4.2 | home | V05 §4.2 | Resize institution claim: kept where it still fits the land less re-laid strip and yards, else … |
| V05-0347 | rule | 4.2 | home | V05 §4.2 | Shrinking: every plot losing ≥ half its face to the eroded rim, re-laid strip or re-claimed yar… |
| V05-0348 | rule | 4.2 | home | V05 §4.2 | Growing: land between old and new strip lines (with whatever an old yard held its re-claim does… |
| V05-0349 | rule | 4.2 | home | V05 §4.2 | Altitude (setAttr(altitudeCm)): the record alone; a value below V5 §3.9's floor is bent to the … |
| V05-0350 | rule | 4.2 | home | V05 §4.2 | Reshaping the rim (moveVertex on a rim vertex, warp on the island key with fromLevel 0): §7.3's… |
| V05-0351 | rule | 4.2 | home | V05 §4.2 | New random on the island (regenerate island scope, newRandom): outline displacement, terrain (w… |
| V05-0352 | rule | 4.2 | home | V05 §4.2 | Declaring an island (T5 with sky) at its dry run: the gate and h_town > 0 must hold (else only … |
| V05-0353 | rule | 4.2 | home | V05 §4.2 | Placing an institution on an island (T6 assign with criteria.sky): the solver places it on the … |
| V05-0354 | rule | 4.2 | home | V05 §4.2 | placeSkyAccess dry run: checks the kind against magic and the row's limits (misfit bent to the … |
| V05-0355 | rule | 4.2 | home | V05 §4.2 | A deleted generated access stays deleted (C5-51): the fold appends its ordinal to removedAccess… |
| V05-0356 | rule | 4.2 | home | V05 §4.2 | setAttr(kind) on an access re-runs the check (magic, altitude and horizontal-run limits, guarde… |
| V05-0357 | rule | 4.2 | home | V05 §4.2 | The shade beneath follows (item 102 (e); J-V5.27): every event changing what a strip would read… |
| V05-0358 | rule | 4.2 | home | V05 §4.2 | Update shade now (regenerate scope {kind 'shade', island}; T10 and the fate's button): one shad… |
| V05-0359 | rule | 4.2 | home | V05 §4.2 | Deleting an island (V09 delete row, clerk; C5-51; J-V5.62): dry run turns it into convert remov… |
| V05-0360 | rule | 4.2 | home | V05 §4.2 | Bringing an island down (convert fallIsland, history tool; clerk 'bring it down'): dry run list… |
| V05-0361 | rule | 4.2 | home | V05 §4.2 | A raised or aqueduct stroke to an island (C5-49; J-V5.61): a T4 stroke ending on a rim with rai… |
| V05-0362 | table | 4.3 | home | V05 §4.3 | Locality: altitude, occlusion, underside, field and island brushes, name, terrain and water on … |
| V05-0363 | rule | 4.3 | home | V05 §4.3 | No island edit writes the ground's field or any shadeBasis (strips keep their basis), so locali… |
| V05-0364 | lifecycle | 4.3 | reference | V05 §4.3: pointer to §7.4 (restatement cut) | New edit kinds' lifecycle rows join §7.4 (BCR-V5-25): convert removeIsland (created by T9 delet… |
| V05-0365 | dossier | 4.4 | home | V05 §4.4 | DR-SKY (BCR-V5-12): subject floating islands (gate, count, reason, size, altitude, access kinds… |
| V05-0366 | rule | 4.4 | home | V05 §4.4 | DR-SKY's number: the integrator gives it the next free number when base change requests are app… |
| V05-0367 | rule | 4.4 | home | V05 §4.4 | Coherence: where site.magic resolves to none, turning the setting on is refused (F-EDIT dossier… |
| V05-0368 | rule | 4.4 | home | V05 §4.4 | The reverse: the dossier removes the institution an island carries → removed at once (item 20 (… |
| V05-0369 | interface | 4.5 | home | V05 §4.5 | Clerk registration: @plat/sky registers one WhyProvider (V10 §2.13) with kinds SkyIsland, SkyAc… |
| V05-0370 | rule | 4.5 | home | V05 §4.5 | Reader (§11.2 query) lists each island in the gazetteer (name, reason, state, area, altitude, s… |
| V05-0371 | rule | 4.5 | home | V05 §4.5 | Clerk proposals are these events as ghosts ('a floating palace over the river' = T5 with sky an… |
| V05-0372 | table | 5.1 | home | V05 §5.1 | Sky marks (S14; every coordinate anchor + local): sky.island.land (area, role sky.ground, all b… |
| V05-0373 | rule | 5.1 | home | V05 §5.1 | Sky states (§8.2 states, BCR-V5-13, BCR-V5-18): base island rows stand, the fallen row drawing … |
| V05-0374 | table | 5.1 | home | V05 §5.1 | Slots and sheets (BCR-V5-18): every shipped sheet (ink, lit, hatched, night, parity presets) re… |
| V05-0375 | rule | 5.2 | home | V05 §5.2 | Occlusion: ghost by default (§8.4), opaque and offset as the sky LayerSpec sets them or an isla… |
| V05-0376 | rule | 5.3 | home | V05 §5.3 | Slab list (BCR-V5-13 (a)) under every occlusion mode (opaque, ghost, offset) holds per island u… |
| V05-0377 | rule | 5.3 | home | V05 §5.3 | Sky surface layer: where an island's drawn land face touches a tile, the tile worker rasters th… |
| V05-0378 | rule | 5.3 | home | V05 §5.3 | The global light's window (§8.4 (c)) reads the surface layers' own top without the slabs, and e… |
| V05-0379 | rule | 5.3 | home | V05 §5.3 | Rung 3 (vector pass): the island's shadow = union over its underside tiers of each tier project… |
| V05-0380 | rule | 5.3 | home | V05 §5.3 | Cursor sun under an island: whenever the sky layer is visible and the document holds a non-fall… |
| V05-0381 | rule | 5.3 | home | V05 §5.3 | The picture and the model agree: under the path sun set to the equinox at a sample's hour and s… |
| V05-0382 | rule | 5.4 | home | V05 §5.4 | Labels: the island's quarter label at the city band along its long axis (§9.3 area rule), distr… |
| V05-0383 | table | 5.5 | home | V05 §5.5 | Exports (BCR-V5-13): .plat/JSON schema (island records local geometry + anchor; removed record … |
| V05-0384 | rule | 5.5 | home | V05 §5.5 | Knowledge: a secret access withheld from every key not admitting it (§9.2 filter, §11.1 Knowled… |
| V05-0385 | budget | 6 | home | V05 §6 | Budgets (all PLAUSIBLE until M6-sky; §12.1 reference machine; one-click path unchanged): S7b (5… |
| V05-0386 | budget | 6 | home | V05 §6 | Edit budgets: setAttr altitude/occlusion/underside/name ≤ 5 ms; a move ≤ 65/70 ms (5 ms + two p… |
| V05-0387 | fallback | 6 | home | V05 §6 | Budget fallbacks: strip rows at four points per cell (BCR-V5-15 (ii) fallback) scale by four (≤… |
| V05-0388 | test | 7 | home | V05 §7 | T-V5-1 the gate [C]: TOWN and villages never carry a sky allocation; a CITY with the setting of… |
| V05-0389 | test | 7 | home | V05 §7 | T-V5-2 the count [C]: 500 CITY seeds at wealthLevel 0.5 and 1: every count 0-3 within ±3 s.e. o… |
| V05-0390 | test | 7 | home | V05 §7 | T-V5-3 the supply [C, O]: V5 §3.3's calibration bars at P0; A monotone non-decreasing in h_town… |
| V05-0391 | test | 7 | home | V05 §7 | T-V5-4 the fill [C]: 500 CITY seeds: ground + sky households equal the roster total exactly; ca… |
| V05-0392 | test | 7 | home | V05 §7 | T-V5-5 placement [C, O]: 1 000 islands on B-CITY: none without assignment/declaration has > 10 … |
| V05-0393 | test | 7 | home | V05 §7 | T-V5-6 outline and arena [C]: 10 000 outlines per template simple (§13.2), area within 1 % of A… |
| V05-0394 | test | 7 | home | V05 §7 | T-V5-7 terrain and river [C]: 500 islands with a river: mean bearing within ±15° of the ground … |
| V05-0395 | test | 7 | home | V05 §7 | T-V5-8 access [C]: every rule-placed island ≥ 1 access (0 % unreachable); a declared island ≥ 1… |
| V05-0396 | test | 7 | home | V05 §7 | T-V5-9 the unit run's contract [C]: rim strip never cut or plotted; SeamReport.portalsTotal = 0… |
| V05-0397 | test | 7 | home | V05 §7 | T-V5-10 underside and altitude [C, O]: apex clears the tallest caster by ≥ clearanceM on 100 % … |
| V05-0398 | test | 7 | home | V05 §7 | T-V5-11 lights and names [C]: rim orbs at 40 m ± 1 m; keel intensity 4 000 × h_carried; settled… |
| V05-0399 | test | 7 | home | V05 §7 | T-V5-12 labels and occlusion [C]: under opaque 0 ground labels inside a visible island's land f… |
| V05-0400 | test | 7 | home | V05 §7 | T-V5-13 underside's shadow under fixed, path and cursor suns (J98) [C, O]: hand-built island (8… |
| V05-0401 | test | 7 | home | V05 §7 | T-V5-14 over time [C]: T8-6 stands; a settled island refloats before any is raised (hook fixtur… |
| V05-0402 | test | 7 | home | V05 §7 | T-V5-15 goldens and determinism [C]: two sky fixtures join §13.3's goldens (CITY prosperity isl… |
| V05-0403 | test | 7 | home | V05 §7 | T-V5-16 editing [C, O]: every V5 §4.2 event undoes exactly; §7.3's oracle byte for byte outside… |
| V05-0404 | test | 7 | home | V05 §7 | T-V5-17 exports [C]: GeoJSON sky coordinates equal anchor + local exactly and validate; each VT… |
| V05-0405 | test | 7 | home | V05 §7 | T-V5-19 the shade strip moves the field, gently (item 102 (g)) [C, O]: uniform district, 8 ha r… |
| V05-0406 | test | 7 | home | V05 §7 | T-V5-20 model and picture agree; underside shapes the strip (J98) [C]: for each sample the CPU … |
| V05-0407 | test | 7 | home | V05 §7 | T-V5-21 order, lag and the supply [C]: (a) S_town at S7b and at an epoch equal to 10⁻⁹ between … |
| V05-0408 | test | 7 | home | V05 §7 | T-V5-22 siting across the island (item 103) [C, O]: 300 CITY seeds in the siting statistics sui… |
| V05-0409 | test | 7 | home | V05 §7 | T-V5-23 custom institutions on islands (item 104) [C]: an exotic-tower custom institution is a … |
| V05-0410 | test | 7 | home | V05 §7 | T-V5-24 custom chains across the island (item 104 (h)) [C, O]: 200 CITY seeds with perishable, … |
| V05-0411 | test | 7 | home | V05 §7 | T-V5-25 the magical node [C]: 300 CITY seeds each without deposits and with an available node: … |
| V05-0412 | test | 7 | home | V05 §7 | T-V5-26 the island cathedral's crypt; no catacomb in the sky (item 109 (k), J111) [C]: 200 CITY… |
| V05-0413 | test | 7 | home | V05 §7 | T-V5-27 the rim as a barrier (item 106) [C]: generation lays 0 enceintes on a sky arena; a wall… |
| V05-0414 | test | 7 | home | V05 §7 | T-V5-28 ladders across arenas (item 108) [C]: no ladder pair counted twice; every COUNT, GUILD,… |
| V05-0415 | test | 7 | home | V05 §7 | T-V5-29 a removal holds (C5-51; J-V5.62) [C]: 200 CITY/METROPOLIS seeds with ≥ 2 islands: remov… |
| V05-0416 | test | 7 | home | V05 §7 | T-V5-30 what the raised-way generator reads of the sky (C5-52; J-V5.63) [C]: at generation with… |
| V05-0417 | test | 7 | home | V05 §7 | T-V5-31 item 110 under and on the island (C5-47, C5-55) [C, O]: (a) METROPOLIS golden pins a ra… |
| V05-0418 | test | 7 | home | V05 §7 | T-V5-32 stage order and SKY's data keys (SL-01; J-V5.70) [C]: with @plat/hood and @plat/sky reg… |
| V05-0419 | rule | 7 | home | V05 §7 | Parity: no reference has islands (II.6 (8)), so no parity number binds; at M6-sky five island c… |
| V05-0420 | plan | 8 | home | V05 §8 | Milestone M6-sky after M5 (needs V01's unit run) on M4's hooks (S7b (5), island conversion kind… |
| V05-0421 | plan | 8 | home | V05 §8 | Dependencies: P0 needs M4's hooks and V01's unit runner (M5); P1 needs item 102's daylight term… |
| V05-0422 | plan | 8 | home | V05 §8 | Risks in order: two-surface light pass frame cost (P3; half resolution then rung 3 for sky base… |
| V05-0423 | rule | 8 | reference | V05 §8: pointer to V12 §9 (restatement cut) | The register at the exits (SCC-R2C-15; X-V12-16; J-V5.80): every phase landing a registry table… |
| V05-0424 | decision | 9 | home | V05 §9 | J-V5.1: local frame + one integer translation (anchor) over world coordinates; no rotation (a t… |
| V05-0425 | decision | 9 | home | V05 §9 | J-V5.2: sky part numbers from a never-reused counter (nextSkyPart), slot a separate field, over… |
| V05-0426 | decision | 9 | home | V05 §9 | J-V5.3: both supplies on the field's absolute value with value-keyed rows over the base's town … |
| V05-0427 | decision | 9 | home | V05 §9 | J-V5.4: purpose by one weighted draw among prosperity and eligible institution rows, institutio… |
| V05-0428 | decision | 9 | home | V05 §9 | J-V5.5: outline and placement settled inside S7b (5) before S7b (1), over placing after S7b (an… |
| V05-0429 | decision | 9 | home | V05 §9 | J-V5.6: altitude floored at rim + root + 25 m clearance over clamping the root (J98).… |
| V05-0430 | decision | 9 | home | V05 §9 | J-V5.7: resize by kernel buffer erosion/dilation over re-drawing the outline from its stream.… |
| V05-0431 | decision | 9 | home | V05 §9 | J-V5.8: hoists default, rope lines over water, stairs and light bridges only with magic (realis… |
| V05-0432 | decision | 9 | home | V05 §9 | J-V5.9: island magical lights ungated by magic (the island is its own magic); the circumstance … |
| V05-0433 | decision | 9 | home | V05 §9 | J-V5.10: generation and epochs obey the supply law strictly; a declaration or lock may hold an … |
| V05-0434 | decision | 9 | home | V05 §9 | J-V5.11: landfall = conversion of everything covered (demolished, vacant under rubble, quarried… |
| V05-0435 | decision | 9 | home | V05 §9 | J-V5.12: every draw on existing concerns with named creation indices over a new concern; one ti… |
| V05-0436 | decision | 9 | home | V05 §9 | J-V5.13: an epoch redraws only empty slots; a supplied island stays.… |
| V05-0437 | decision | 9 | home | V05 §9 | J-V5.14: cursor sun floored at 1.5 × the display list's top whenever the sky layer is visible a… |
| V05-0438 | decision | 9 | home | V05 §9 | J-V5.15: underside as nested prism tiers following a profile function over one slab or a full m… |
| V05-0439 | decision | 9 | home | V05 §9 | J-V5.16: a second base and surface layer only on tiles an island covers, lit separately and com… |
| V05-0440 | decision | 9 | home | V05 §9 | J-V5.17: ground landing yards claimed at SKY before S8 touching a way spine.… |
| V05-0441 | decision | 9 | home | V05 §9 | J-V5.18: a rank gradient on a prosperity island (bands on their land shares, 0.6 elevation, 0.4… |
| V05-0442 | decision | 9 | home | V05 §9 | J-V5.19: refuse the setting where a bound dossier's site.magic is none; setting and circumstanc… |
| V05-0443 | decision | 9 | home | V05 §9 | J-V5.20: re-land accesses after a move by closing/opening the landing designation on two ground… |
| V05-0444 | decision | 9 | home | V05 §9 | J-V5.21: delete of an island relocates households without a ruin; fallIsland is the ruinous pat… |
| V05-0445 | decision | 9 | home | V05 §9 | J-V5.22: release a waning island's households in reverse ordinal order each epoch over all at t… |
| V05-0446 | decision | 9 | home | V05 §9 | J-V5.23: conjured river width by the ground's width law on a conjured share of the ground river… |
| V05-0447 | decision | 9 | home | V05 §9 | J-V5.24: prison row's requirement band is its paymaster's (prosperous).… |
| V05-0448 | decision | 9 | home | V05 §9 | J-V5.25: islands off under the MFCG and FTG presets (item 23).… |
| V05-0449 | decision | 9 | home | V05 §9 | J-V5.26: an unbuilt 6 m rim strip planted as a rim walk with trees over plots to the edge (revi… |
| V05-0450 | decision | 9 | home | V05 §9 | J-V5.27: an island edit leaves the field and strips at their basis until the next epoch or a Re… |
| V05-0451 | decision | 9 | home | V05 §9 | J-V5.28: take V01's partition and district count, dropping V05's own count and seeds; seven gov… |
| V05-0452 | decision | 9 | home | V05 §9 | J-V5.29: fix groundRef and altitude at SKY from placed casters, allocated tower rows and a cast… |
| V05-0453 | decision | 9 | home | V05 §9 | J-V5.30: the model's strip is a derived record over roughness-free tiers with no edit kind.… |
| V05-0454 | decision | 9 | home | V05 §9 | J-V5.31: a fourth institution row, the arcane tower (magic only, exotic-tower archetype), and a… |
| V05-0455 | decision | 9 | home | V05 §9 | J-V5.32: carry.never keeps top-step emitters, heavy processors, wholesale/storage, hard-need cl… |
| V05-0456 | decision | 9 | home | V05 §9 | J-V5.33: an island's own terrain casts nothing on itself; higher islands' shade and (at an epoc… |
| V05-0457 | decision | 9 | home | V05 §9 | J-V5.34: the island's placement score apart from item 103's families.… |
| V05-0458 | decision | 9 | home | V05 §9 | J-V5.35: the strip exported as a thematic layer only (GeoJSON, shade-view SVG, statistics).… |
| V05-0459 | decision | 9 | home | V05 §9 | J-V5.36: cross-arena pulls by the route through admitted accesses (island leg, 100 m transfer, … |
| V05-0460 | decision | 9 | home | V05 §9 | J-V5.37: coverage counts an island as k units (district rows), one (walking radius), ⌈H/N⌉ (hou… |
| V05-0461 | decision | 9 | home | V05 §9 | J-V5.38: islands' shade OR-ed into the daylight term sample by sample over adding shares.… |
| V05-0462 | decision | 9 | home | V05 §9 | J-V5.39: active custom chain's resource and processing nodes stay on the ground; only final sel… |
| V05-0463 | decision | 9 | home | V05 §9 | J-V5.40: name the new derivation row DR-SKY and leave its number to the integrator (V01, V06, V… |
| V05-0464 | decision | 9 | home | V05 §9 | J-V5.41: magical_node as a flat positionless addend to h_town acting only where the town alread… |
| V05-0465 | decision | 9 | home | V05 §9 | J-V5.42: state the sampler default (nine suns at midpoints of nine equal slices of the equinox … |
| V05-0466 | decision | 9 | home | V05 §9 | J-V5.43: an island cathedral's crypt is a vault in the rim slab (underside tier 0) over a groun… |
| V05-0467 | decision | 9 | home | V05 §9 | J-V5.44: reach cap 8 × caster height as the sampler's rule for every source (C5-31).… |
| V05-0468 | decision | 9 | home | V05 §9 | J-V5.45: island district size districtHa (3.5 CITY, 4.5 METROPOLIS) over the town's mean; plotS… |
| V05-0469 | decision | 9 | home | V05 §9 | J-V5.46: hand an S3 reservation an institution island leaves to the row's handover classes (lar… |
| V05-0470 | decision | 9 | home | V05 §9 | J-V5.47: persist per island the shadeBasis (≤ 2.5 KB) over recomputing from the live island or … |
| V05-0471 | decision | 9 | home | V05 §9 | J-V5.48: island district kinds sky-island, sky-palace, sky-temple, sky-prison, sky-tower owned … |
| V05-0472 | decision | 9 | home | V05 §9 | J-V5.49: rim as a sheer natural barrier; generation never walls an island; an author's island w… |
| V05-0473 | decision | 9 | home | V05 §9 | J-V5.50: bind across arenas by the route; count a cross-arena consumer at the access's foot (or… |
| V05-0474 | decision | 9 | home | V05 §9 | J-V5.51: a split class's shop may go up by the share while its works stays on the ground (branc… |
| V05-0475 | decision | 9 | home | V05 §9 | J-V5.52: item 105 (f)'s order and relaxation per arena, each reading only the other's proxies.… |
| V05-0476 | decision | 9 | home | V05 §9 | J-V5.53: re-reason an island whose institution the dossier removes at the next epoch (next inst… |
| V05-0477 | decision | 9 | home | V05 §9 | J-V5.54: admit an island site only where the rim reaches admissible ground within an admitted a… |
| V05-0478 | decision | 9 | home | V05 §9 | J-V5.55: prism form for every island tier at rung 3; drop only at the budget fallback with subd… |
| V05-0479 | decision | 9 | home | V05 §9 | J-V5.56: global light window from the surface layers' own top, each slab tested over its own re… |
| V05-0480 | decision | 9 | home | V05 §9 | J-V5.57: an island institution is one building or compound (singular or SIZE); a subsuming grea… |
| V05-0481 | decision | 9 | home | V05 §9 | J-V5.58: the cathedral row's second tag great_temple (item 23: no hard-coded universals).… |
| V05-0482 | decision | 9 | home | V05 §9 | J-V5.59: exact O(1) pre-test per corridor cell for the strip's window over two-pass extremes.… |
| V05-0483 | decision | 9 | home | V05 §9 | J-V5.60: feet and yards on part-0 land only, clear of raised-way piers, dilated deck plans and … |
| V05-0484 | decision | 9 | home | V05 §9 | J-V5.61: no raised way reaches an island and none stands on one (strokes bent, J-VI.4 (d), (e),… |
| V05-0485 | decision | 9 | home | V05 §9 | J-V5.62: a removed island is a live record in state removed holding its slot (counted filled fo… |
| V05-0486 | decision | 9 | home | V05 §9 | J-V5.63: the raised-way generator reads the sky only as listed (reservation endpoints, ground a… |
| V05-0487 | decision | 9 | home | V05 §9 | J-V5.64: a landfall ruins covered raised spans and piers, steps retaining walls to decayed (lin… |
| V05-0488 | decision | 9 | home | V05 §9 | J-V5.65: strip receiver heights = the unlevelled ground raster, levelling as platform datums; a… |
| V05-0489 | decision | 9 | home | V05 §9 | J-V5.66: 'underside tiers' vs 'massing tiers' wherever both could be meant; crypt under the low… |
| V05-0490 | decision | 9 | home | V05 §9 | J-V5.67: item 110's arrival recorded as one declared shift of both sky goldens with a no-op pin… |
| V05-0491 | decision | 9 | home | V05 §9 | J-V5.68: clearance re-checked after each epoch's growth by sky.clearance (afterGrowth, order 50… |
| V05-0492 | decision | 9 | home | V05 §9 | J-V5.69: island retaining walls as RetainingWall records on the island arena, never an enclosur… |
| V05-0493 | decision | 9 | home | V05 §9 | J-V5.70: SKY's ground writes take own data keys reservations.landing and allocations.landing, d… |
| V05-0494 | decision | 9 | home | V05 §9 | J-V5.71: ground strips computed once per evaluation at first read (S9b or pass 2) and held; at … |
| V05-0495 | decision | 9 | home | V05 §9 | J-V5.72: an optional shadeBasis (absent on an island raised after S6 or declared between evalua… |
| V05-0496 | decision | 9 | home | V05 §9 | J-V5.73: write a covered way's class to V06's Way.formerClass in the fallIsland batch, keeping … |
| V05-0497 | decision | 9 | home | V05 §9 | J-V5.74: an epoch's island laws read the fold's rung (ctx.rung) over the rung at the population… |
| V05-0498 | decision | 9 | home | V05 §9 | J-V5.75: S7b (1)'s district supply term reads a sky pseudo-district at its island's land centro… |
| V05-0499 | decision | 9 | home | V05 §9 | J-V5.76: landfall members typed as DecorationMember (Id or {raised, span} / {raised, support} o… |
| V05-0500 | decision | 9 | home | V05 §9 | J-V5.77: a resize and rim reshape re-lay the rim strip, re-claim yards, keep or re-search the c… |
| V05-0501 | decision | 9 | home | V05 §9 | J-V5.78: store an own island's drawn relief class on terrainEcho.reliefClass (one writer); echo… |
| V05-0502 | decision | 9 | home | V05 §9 | J-V5.79: a covered tower and gate (any Gate kind) follow their run's condition (breached length… |
| V05-0503 | decision | 9 | home | V05 §9 | J-V5.80: no register line of V05's own; every calibratable column P1 and P2 land takes V12 §3.1… |
| V05-0504 | decision | 9 | home | V05 §9 | J-V5.81: price a resize and rim reshape at every piece of work V5 §4.2 commits (each yard's top… |
| V05-0505 | bcr | 10 | bcr-pointer | V05 §10 pointer row (BCR-V5-1 → item 251) | BCR-V5-1: §2.7 SkyIsland replaced by V05 §2.1's SkyIsland, UndersideProfile, ShadeBasis (outlin… |
| V05-0506 | bcr | 10 | bcr-pointer | V05 §10 pointer row (BCR-V5-2 → item 203) | BCR-V5-2: §2.2 PlatKey comment 'sky parts ≥ 1 = one arena per sky island, allocated once from D… |
| V05-0507 | bcr | 10 | bcr-pointer | V05 §10 pointer row (BCR-V5-3 → item 282) | BCR-V5-3: §4.1 L1 writers S3, S4, S5, S6, S7, S7b, SKY, S8 (J-P46); transactions table row for … |
| V05-0508 | bcr | 10 | bcr-pointer | V05 §10 pointer row (BCR-V5-4 → item 546) | BCR-V5-4: II.6 rule (3) states both supplies on absolute values with townSupply/carriedSupply v… |
| V05-0509 | bcr | 10 | bcr-pointer | V05 §10 pointer row (BCR-V5-5 → item 295) | BCR-V5-5: §4.5 S7b (5) '× the dense core's plot share (0.62, §4.2 S2)' becomes '× plotShare, V0… |
| V05-0510 | bcr | 10 | bcr-pointer | V05 §10 pointer row (BCR-V5-6 → item 213) | BCR-V5-6: §2.5 ContextVector.arena gains 'sky'; Allocation rows gain at?: PointCm and access?: … |
| V05-0511 | bcr | 10 | bcr-pointer | V05 §10 pointer row (BCR-V5-7 → item 320) | BCR-V5-7: §4.11 fallIsland archives its arena and converts the ground it lands on (V05 §3.16) i… |
| V05-0512 | bcr | 10 | bcr-pointer | V05 §10 pointer row (BCR-V5-8 → item 307) | BCR-V5-8: §4.7 Light sources: LightRule.host adds rim, keel, skyAccess; LightRule optional cell… |
| V05-0513 | bcr | 10 | bcr-pointer | V05 §10 pointer row (BCR-V5-9 → item 252) | BCR-V5-9: §2.7 Decoration gains fallen_island kind and members?: DecorationMember[], source?: I… |
| V05-0514 | bcr | 10 | bcr-pointer | V05 §10 pointer row (BCR-V5-10 → item 356) | BCR-V5-10: §7.1 adds placeSkyAccess, quarter's sky parameter, the key parameter of point-form e… |
| V05-0515 | bcr | 10 | bcr-pointer | V05 §10 pointer row (BCR-V5-11 → item 331) | BCR-V5-11: §5.2 adds F-SKY-FILL, -PLACE, -TERRAIN, -ACCESS, -UNIT, -CLEAR, -CRYPT, -SHADE, -LAN… |
| V05-0516 | bcr | 10 | bcr-pointer | V05 §10 pointer row (BCR-V5-12 → item 387) | BCR-V5-12: §7.7 derivation table adds V05 §4.4's DR-SKY 'under the next free number (J-V5.40)' … |
| V05-0517 | bcr | 10 | bcr-pointer | V05 §10 pointer row (BCR-V5-13 → item 415) | BCR-V5-13: §8.4 (a) a sky island under every occlusion mode is its underside's tiers, each a sl… |
| V05-0518 | bcr | 10 | bcr-pointer | V05 §10 pointer row (BCR-V5-14 → item 476) | BCR-V5-14: §12.4 row 'the sky (owner-staged; V05) … (staged)'; §13.2 T15-1 fixture reworded ('b… |
| V05-0519 | bcr | 10 | bcr-pointer | V05 §10 pointer row (BCR-V5-15 → item 296) | BCR-V5-15: §4.5 Fields pass 2 adds the landing kernel and ORs every live island's strip into th… |
| V05-0520 | bcr | 10 | bcr-pointer | V05 §10 pointer row (BCR-V5-16 → item 308) | BCR-V5-16: §4.7 Supply distances by mode: between arenas every mode's distance is the route thr… |
| V05-0521 | bcr | 10 | bcr-pointer | V05 §10 pointer row (BCR-V5-17 → item 547) | BCR-V5-17: II.6 rule (3) adds 'A dossier whose site.deposits lists a magical_node available (or… |
| V05-0522 | bcr | 10 | bcr-pointer | V05 §10 pointer row (BCR-V5-18 → item 408) | BCR-V5-18: §8.2 Roles add sky.ground; Slot resolution adds the sky entries in every shipped she… |
| V05-0523 | bcr | 10 | bcr-pointer | V05 §10 pointer row (BCR-V5-19 → item 286) | BCR-V5-19: §4.2 S3 (2) the temple or cathedral precinct not reserved where the creation prefix … |
| V05-0524 | bcr | 10 | bcr-pointer | V05 §10 pointer row (BCR-V5-20 → item 299) | BCR-V5-20: §4.6 S8 '(a reservation inside a face is a hole; a landing reservation's attach vert… |
| V05-0525 | bcr | 10 | bcr-pointer | V05 §10 pointer row (BCR-V5-21 → item 274) | BCR-V5-21: §2.9 What the snapshot holds: the one sky input the load recomputation reads is each… |
| V05-0526 | bcr | 10 | bcr-pointer | V05 §10 pointer row (BCR-V5-22 → item 416) | BCR-V5-22: §8.4 (c) R = (Z − z) ÷ (m − σ_s) with Z the display list's surfaceLayerTopCm; each s… |
| V05-0527 | bcr | 10 | bcr-pointer | V05 §10 pointer row (BCR-V5-23 → V06) | BCR-V5-23 (cross-volume, for V06): V06 §2.1 EpochOps gains demandTaken?: {band, count}[] (sitin… |
| V05-0528 | bcr | 10 | bcr-pointer | V05 §10 pointer row (BCR-V5-24 → item 204) | BCR-V5-24: §2.2 rule 1 L0: on a sky island's arena the face between outer ring and rim is the v… |
| V05-0529 | bcr | 10 | bcr-pointer | V05 §10 pointer row (BCR-V5-25 → item 375) | BCR-V5-25: §7.4 lifecycle rows for placeSkyAccess, regenerate scope shade, convert removeIsland… |
| V05-0530 | bcr | 10 | bcr-pointer | V05 §10 pointer row (BCR-V5-26 → item 253) | BCR-V5-26: §2.7 LandUse gains source?: Id (a fallen_island decoration whose rubble this quarry … |
| V05-0531 | bcr | 10 | bcr-pointer | V05 §10 pointer row (BCR-V5-27 → item 245) | BCR-V5-27: item 110 (a)'s RetainingWall text 'a chain on the ground layer' → 'a chain on the ar… |
| V05-0532 | bcr | 10 | bcr-pointer | V05 §10 pointer row (BCR-V5-28 → V06) | BCR-V5-28 (cross-volume, for V06): V06 §3.2 participant table adds the row afterGrowth / 50 / s… |
| V05-0533 | bcr | 10 | bcr-pointer | V05 §10 pointer row (BCR-V5-29 → item 290) | BCR-V5-29: §4.3 raised-way text (item 110 (b)): (a) the slot: every generated raised part commi… |
| V05-0534 | bcr | 10 | bcr-pointer | V05 §10 pointer row (BCR-V5-30 → item 309) | BCR-V5-30: §4.7 levelling text (item 110 (a)): a levelled block, plot or ward is a platform dat… |
| V05-0535 | question | 11 | answer-J121-J122 | V05 §11 (answered — J122: the underground first) | Owner question 1: product order among the layers — the sky before or after the underground? Rec… |
| V05-0536 | status | 12 | history-out | out — validation records (S9; V05-NARR-4); V05 §12 keeps one CONFIRMED paragraph and one PLAUSIBLE list | CONFIRMED vs PLAUSIBLE: CONFIRMED by reading every base citation (II.6, II.1 (5), §1.1, §2.1-§2… |
| V05-0537 | handoff | 13 | handoff | V05 §13 (closed at destinations; V05-DEFER-3: the calibrations are P0's exits, V05 §8) | Fix list items 1-9 (deliberately left to others or to measurement 'per the owner's if we need t… |
| V05-0538 | handoff | 13 | handoff | V05 §13 (closed at destinations: V06 W64/W66, V09 §4.9/§4.20, V10 §2.13, V11, V01, V02 X20, V04) | Fix list items 10-17 (item 110's cross-lane halves): (10) V06 registers sky.clearance at afterG… |
| V05-0539 | handoff | 13 | handoff | V05 §13 (closed: landed at V01, V06, V12 §3.11, file f items 252, 260, 282, 309, 580) | Fix list items 18-34 (reconciliation rounds' cross-lane halves): (18) V01 keeps S7c's read-set … |
| V05-0540 | decision | IN | home | V05 §4.2 bend table (IN-V05-1 folded); Integration notes line | IN-V05-1 (J-VI.4; item 101 R2): every refusal except the dossier-owned one (J-V5.19) is a bend;… |
| V05-0541 | decision | IN | home | V05 §2.1, §3.2 (6), J-V5.62 (IN-V05-2 folded; E-02); Integration notes line | IN-V05-2 (J-VI.14): removedSlots and removedAccesses are V05's form of the one suppression mech… |
| V05-0542 | decision | IN | home | V05 §4.4 DR27 (IN-V05-3 folded); Integration notes line | IN-V05-3 (J-VI.13): DR-SKY is numbered DR27 by the coherence pass (file f).… |
| V05-0543 | decision | IN | home | V05 §3.21 (1) `sheer` (IN-V05-4) and V05 §13 (IN-V05-5) folded; Integration notes lines | IN-V05-4 (J-VI.3): the island rim's barrier kind sheer is one of the six closure-arc kinds ever… |
| V05-0544 | record | RC | home | out — narration (S9; V05-NARR-5); each round's change stands in the body section it names | Reconciliation rounds 1-6 notes (SL-01, SL-02, SL-26, SL-27, SL-33, SL-35, ST-04, ST-12, ST-14,… |

544 of 544 V05 inventory ids mapped.
