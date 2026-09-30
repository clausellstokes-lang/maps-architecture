# Rewrite — design volume V03 (interiors)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-V03; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/rewrite-V03`, 2026-09-29 → 2026-09-30)
- P1 inputs gathered (canon unit V03, 6 conflicts, 3 elegance, 2 id rulings, 2 wiring gaps, 48 f items, 13 hand-offs, edges 29 U + 26 T + 6 combos, inventory 513 ids; no g 111+ part routed): done
- P2 read the volume whole (3 855 lines): done
- P3 new text §0–§1b: done (parts 00–02; the first session)
- P4 new text §2: done (parts 03–05)
- P5 new text §3: done (parts 06–11, 14)
- P6 new text §4–§6: done (parts 12–13)
- P7 new text §7–§8: done (parts 15–16)
- P8 new text §9–§13 and integration notes: done (parts 17–20)
- P9 assemble, verify ids, references, terms, sizes: done
- P10 report (mapping table, elegance, conflicts, renumberings, cross-part notes), result file, LANDED: done

Source: docs/volumes/V03-interiors.md (3 855 lines, 82 788 words). Output:
docs/validation/coherence/new/volumes/V03-interiors.md (md5 in the result file). Working parts:
docs/validation/coherence/work/rewrite-V03/parts/ (00–20, assembled in section order). The lane was cut once (the
cloud move, 2026-09-30 00:54) after parts 00–04 and continued from its parts under the CONTINUE RULE.

## Outcome

The volume keeps its title line, its one marker line and its section structure (§0 – §13, the integration-notes
section). Every one of the 513 inventory ids is mapped below (none missing). The six conflicts routed here are resolved
as ruled; the three elegance rulings (E-24, E-28, E-29) are applied with their equivalence lists kept; the two id
rulings, both wiring gaps, the thirteen hand-offs, the 36 open findings, the owner question (J122), the 29 UNDEFINED and
26 UNTESTED edges and the six combinations are closed at their homes. The §10 requests are one-line pointers to their
applied file f items; the reconciliation-round and finalization sections, the stacked banners, the PROGRESS ledgers and
the provenance tags are gone (the validation records keep them). New design, each vetoable: J-V3.130 – J-V3.134, the bar
T-V3-36, the warning code `W_STOREY_RUN`, the helper `doorRunPoint`, the `PlanReport.notes` member and the catalogue key
family `info.plan.*`. CONFIRMED by script on the files: the sizes; test and decision ids unique and every cited id
defined; every `V03 §x.y` reference resolving to a section of the new text; the retired terms and the narration tags at
zero; every backticked identifier and unit-bearing number of the old body (§0–§9) present in the new unless listed as
moved or removed below (the removed ones: V12's `cal.<table>.*.<column>` form, V11's `custom.sceneProfileId`, V02's
`layTiers` and `massStepped` — each its own volume's fact, cited; the extended `RoomProgramRow` fields — declared at
§10.2 by file f item 428; the base's 4 KB, 5 / 20 ms and 5–9 px — cited at §12.8, §12.7, §9.4; the critique's 6.6 pw —
narration). PLAUSIBLE: the per-source split of the removed words (estimated).

## Sizes (principle (9))

| measure | before | after | change |
|---|---|---|---|
| words (whitespace split, the canon's measure) | 82 788 | 66 724 | −16 064 (−19.4 %) |
| bytes / KiB | 505 716 / 493.9 | 393 352 / 384.1 | −112 364 |

The canon's band for this volume is 49 673 – 62 091 words (25 – 40 %). The volume lands about 4 600 words above the
band's top, held by irreducible, mandated content: about 4 650 words of new design the canon routed here — V03 §3.9's
edge and combination table (≈ 900), T-V3-36 (≈ 800), V03 §4.1's one edit table replacing three partial ones (≈ +450
net), the `plan` and `crypt` section providers folded from IN-V03-1 (≈ 300), the crypt edits' dry runs and the
wet-ground rule (≈ 450), `doorRunPoint` (≈ 150), the degenerate storey runs (≈ 170), the edge paragraphs of §3.4, §3.4a,
§3.8, §4.5, §5.1–§5.4 (≈ 700), J-V3.130 – J-V3.134 (≈ 520) — and about 660 words of the citation form G-cite requires
(every self-reference now `V03 §x.y`: 81 → 745 occurrences). Without them the shrink is about 26 %. The remainder is
rule text, typed records, default rows, test bars and reasoned decisions, none of which may be thinned.

**Words removed, by source** (≈ 21 400 removed, ≈ 5 300 added; PLAUSIBLE split): **narration** ≈ 12 600 — the head's
eight banners and ledgers (1 845), the nine reconciliation-round sections and the finalization (4 745), §12's round
records (≈ 2 300), §13's per-round hand-off lists (≈ 2 330), §9's round labels and amendment layers (≈ 400), provenance
tags in the body (≈ 800), the integration-notes preamble (≈ 180); **restatement** ≈ 7 700 — §10's quoted base texts
(≈ 5 550, now pointers to file f), §2.1's field meanings declared at §2.6 (≈ 830), §2.5's read column (the readers are
§1b's, ≈ 450), the crypt column's semantics and the walk-out rule (§2.6 *Basements*), the stops (§8.8), §6's budget
figures (§12.7, §12.8), the room-label range (§9.4), `basementDoor`'s declaration (§2.6), volume 2's build note (V02
§8.1); **duplicated mechanisms** ≈ 700 — E-29's door-run core, DUP-3's storey-less rule (one home, V03 §3.1 step 2),
DUP-5's vault and capped bays (one definition, V03 §3.7.4), DUP-6's three edit tables (one, V03 §4.1), DUP-7's hand-off
lists (one table, V03 §13); **verbose prose** ≈ 400.

Per section (words, before → after): head 1 880 → 35; §0 1 194 → 1 208; §1 2 203 → 2 078; §1b 3 297 → 3 033; §2.1
1 381 → 554; §2.2 590 → 600; §2.3 354 → 355; §2.4 9 261 → 9 361; §2.5 2 637 → 1 972; §3.1 484 → 511; §3.2 2 727 →
2 673; §3.3 2 644 → 2 694; §3.4 194 → 300; §3.4a 386 → 443; §3.5 1 701 → 1 693; §3.6 2 621 → 2 562; §3.7 5 277 → 5 606;
§3.8 352 → 443; §3.9 1 039 → 1 875; §3.10 264 → 264; §3.11 372 → 374; §3.12 745 → 721; §4.1 226 → 667; §4.2 1 601 →
1 704; §4.3 448 → 419; §4.4 57 → 58; §4.5 820 → 929; §4.6 443 → 742; §5.1 1 175 → 1 257; §5.2 84 → 121; §5.3 868 →
978; §5.4 147 → 201; §6 883 → 877; §7 5 108 → 5 744; §8 2 045 → 2 117; §9 9 219 → 8 830; §10 6 321 → 770; §11 270 →
124; §12 3 015 → 709; §13 3 062 → 731; integration notes 253 → 70; the reconciliation rounds and finalization 4 745 → 0.

## Conflicts resolved (6)

| id | ruling | applied at |
|---|---|---|
| MC-01 | `BuildingInput.lot` → `BuildingInput.plot`; prose 'lot' → 'plot' | V03 §3.1 names §2.6 step 1's `BuildingInput` with its `plot` (V03 had no 'lot' in prose) |
| V04-XCONF-2 | PageUp/PageDown precedence stated once in §14 | V03 §4.5 cites §14's line (with a plan's switcher shown they step the storey); T-V3-36 (j) |
| V04-XCONF-3 | T-V4-50 gains elaboration-independence | T-V3-23 (g) names T-V4-50's clause; the volume 4 hand-off closed there (V03 §13) |
| V09-XAGREE-2 | V03 states the crypt-edit dry runs | V03 §3.7.4 *The crypt edits' dry runs*; V03 §4.2; J-V3.130 (J-V3.47 marked amended); T-V3-36 (d) |
| V10-XAGREE-4 | the wet-ground rule in V03 §3.7.4 | V03 §3.7.4 *Wet ground* (always → the raised-choir crypt; any other church → no crypt, ledger slabs; J-V3.44); T-V3-23 (c); G-floorvault at 0 |
| CANON-C03 | §11 a table of decisions | V03 §11 (Q1 answered J122); V03 §8's decided order (§16's M6-P row) |

## Elegance rulings applied (equivalence lists)

* **E-24** — one mark on an amended or superseded decision row. Applied: J-V3.47 *Amended by J-V3.130*; J-V3.98
  *Superseded by J-V3.132*; J-V3.110 a withdrawn row (a process record, NARR-8), its id kept so file f's citation of it
  resolves. ☑ no row dropped (J-V3.110 kept as a withdrawn row); ☑ the governing row keeps the reason (J-V3.130 and
  J-V3.132 state theirs; J-V3.47 and J-V3.98 keep their original reasons).
* **E-28** — `PlanReport.notes` carries `shrineOneRoom`, `solidMonument`, `stackCarried`; `warnings.code` holds W_ codes
  only. Applied: V03 §2.3 (the type), V03 §3.1 step 2, V03 §3.3 S6 and H4, V03 §3.9's rows, V03 §4.6's `plan` section
  keys. ☑ the same producer (A1 and each step's failure handling) and readers (the panel, the clerk, the why, JSON
  `report`, the bars — V03 §1b's `PlanReport` row); ☑ the three conditions reported as notes (each still in `owed`, the
  panel's lines and the why).
* **E-29** — one door-run helper, `doorRunPoint(run, target, clear)`, stated once in V03 §3.7.1; both functions call it
  and keep their own rules. ☑ `basementDoor(b)`'s three ordered rules (wall walk-out, tomb door, fall walk-out), its
  crypt-vault clause from M6-U (its `clear` on a church with `ground(b)`), `null` unless the access is `external` — V03
  §3.7.1; ☑ `stackAccessDoor(b, a)`'s approach-strip clearance (its `clear`), the non-stair wing preference and its
  reported fallback — V03 §3.7.2 (1); ☑ both pure, draw-free, of eager records, in `@plat/plots` at M3a, read by volume 1's
  entrance reserve — V03 §3.7.1, §3.7.2 (1), §1b's interfaces and derived rows, V03 §8's PE row.

No unification the canon did not rule was made.

## Id rulings and renumberings

* **ID-BCR** — volume 4's bare `BCR-29`, `BCR-30` cited here → `BCR-V4-29`, `BCR-V4-30`; volume 1's `BCR-43` →
  `BCR-V1-43`. No bare `BCR-n` remains.
* **ID-DUPDEF** — no id defined twice: 36 test ids (T-V3-1 – T-V3-36) and 134 decision ids (J-V3.1 – J-V3.134), each once;
  §10's amendment notes folded into one row per request.
* **New ids** (no existing id renumbered): T-V3-36 (the edges and combinations bar, clauses (a)–(k)); J-V3.130 – J-V3.134;
  the warning code `W_STOREY_RUN`; the helper `doorRunPoint`; the catalogue key family `info.plan.<cause>`.
* **ID-WX** — no volume-local row id of another volume cited bare (V02 X11, V02 X17, V06 X3, V06 X18, V09 XV-V9-5 and
  XV-V9-15, V10 CVR-V10-2 and CVR-V10-9, V11 X-V11-16, V12 X-V12-4 – X-V12-18 carry their volume); the IN-V03 ids are gone
  from the text.

## Terms replaced (glossary)

G-firstmap (0 hits after); G-cite (147 hits of `Vn §`, `Vn-x.y` and bare self-references → `Vnn §x.y`; 0 left);
G-floorvault (3 → 0: V03 §3.7.4's wet-ground rule). Every other retired term of the canon's list: 0 hits.

## File f items (cited as base text) and file g

Each of the 48 f items concerning V03 is cited at its base home and not restated: 226, 230, 231, 232, 233, 234, 235,
236, 237, 238, 239, 240, 241, 242, 262, 263, 270, 273, 309, 324, 329, 334, 347 (with 346), 352, 353, 354, 370, 374, 420,
428, 436, 450, 451, 457, 482, 483, 505, 524, 567, 568, 578, 585 by item number (V03 §10's table, V03 §1, §2.1, §3.7, §8,
§9); 218 (BCR-V2-03), 219 (BCR-V2-04), 225 (BCR-V2-27), 228 (BCR-V2-38) and 432 (BCR-V11-1) by their request ids; 229
and 351 added to V03 §1's hooks. File g: no part of items 111–113 names V03 (the canon's g routing); items 102, 104, 105,
108, 109 and 110 are cited as landed (V03 §1). Items 114 and 115 (the economy ceiling, the islands gate) were not yet
filed in docs/AMENDMENTS-2026-09-28g.md when this lane landed; neither concerns the plan rung.

## Wiring gaps closed

* **W-HOOK-02** (the V03 side) — `BuildingGenerator.plan` and the plan records are this volume's: V03 §1 *Scope* ("§2.6,
  which names this volume its builder"), V03 §1b's interfaces row.
* **V03-WGAP-1** — the `crypt` section provider over `Basement.crypt` with its `info.crypt.*` keys: V03 §1b's interfaces
  row, V03 §4.6 *The two section providers*, T-V3-12's section clause; IN-V03-1 folded.

## Hand-offs closed (13)

V02 X11 (V03 §13's volume 2 row; V03 §2.2, §3.6 W4, §3.7.6, §2.4's `gatehall`); V06 X3 (V03 §3.7.4 (3): the rank inside
each epoch op that changes the principal crypt or its building's designation, the trim on `Basement.crypt.ring` only);
V06 X18 (V03 §2.5's outside-digest row, T-V3-30; nothing further owed); V09 XV-V9-5 (V03 §3.7.4's dry runs); V09
XV-V9-15 (V03 §4.2's crypt ladder on a building without a basement; V03 §4.1's row); V10 CVR-V10-2 and CVR-V10-9 (V03
§4.6); V11 X-V11-16 (d) (V03 §13's volume 11 row: row 38's readers, `stages` `[]` standing); V12 X-V12-4 (V3-P6's
`PanelSpec`, V03 §8's P6 row), X-V12-15 (T-V3-35's `BenchBarDef`, V03 §2.4), X-V12-16 (the register at PE's, P1's, P2's
and P6's exits, V03 §8), X-V12-17 (`--milestone` on every `--defaults` call, V03 §2.4 and §8), X-V12-18 (the hand tuning
at V3-P6 and a later step's added rows, V03 §2.4 and §8). The volume's own hand-off rows V03-0486 – V03-0491 are V03 §13's
table, each closed at its destination.

## Edges and combinations closed (principle (11))

Every UNDEFINED edge now has its outcome, its rung and its test; every UNTESTED one its test; the six combinations their
outcome — all listed in V03 §3.9's *Edges and combinations* table, the edge text at its mechanism:

| catalogue id | where defined | test |
|---|---|---|
| M-V03-445-E5 (§2.1 data) | V03 §3.9's records row | T-V3-34, T-V3-36 (f) |
| M-V03-535-E5 (§2.2, untested) | V03 §2.2's re-match column; the records row | T-V3-36 (f), T28-7 |
| M-V03-1032-E1/E2/E5 (§3.1, untested) | V03 §3.1 step 2; the derivation row | T28-1, T-V3-36 (a) |
| M-V03-1372-E1/E2/E4 (§3.4) | V03 §3.4 *Edges* | T-V3-36 (b) |
| M-V03-1384-E1/E4/E8 (§3.4a) | V03 §3.4a *Edges* and closing line | T-V3-29 |
| M-V03-1497-E4/E6 (§3.6) | V03 §3.9's openings row; *Every rung* | T-V3-5, T-V3-6, T-V3-36 (c) |
| M-V03-1636-E6 (§3.7) | *Every rung*; the heads-and-crypt row | T-V3-22, T-V3-23, T-V3-36 (c), (d) |
| M-V03-1921-E1/E2/E4/E5/E6 (§3.8) | V03 §3.8 *Edges*; *Every rung* | T-V3-8, T-V3-36 (e) |
| M-V03-1945-E4 (§3.9) | the seed-ring and `slice` rows; E-GEN-1 | T-V3-36 (b) |
| M-V03-1988-E1/E2 (§3.10) | the determinism row (draws keyed by creation index) | T-V3-20 |
| M-V03-2008-E4 (§3.11) | the re-cuts row | T-V3-9, T-V3-36 (b) |
| M-V03-2030-E1/E2/E4/E5/E8 (§3.12) | V03 §3.12 (1), (6), (9); the below-ground row | T-V3-24, T-V3-32 |
| M-V03-2075-E8 (§4.1, untested) | V03 §4.1's closing line | T-V3-11, T-V3-36 (h) |
| M-V03-2091-E4 (§4.2) | V03 §4.2's opening (degenerate results bent) | T-V3-36 (h) |
| M-V03-2183-E4 (§4.3) | V03 §4.3 *Carries* | T28-7 |
| M-V03-2223-E1/E2/E4/E5/E6/E8 (§4.5) | V03 §4.5's states, frame stop, switcher and bands | T-V3-36 (j) |
| M-V03-2268-E1/E2/E5/E8 (§4.6) | V03 §4.6 *Queries* | T-V3-12 |
| M-V03-2295-E1/E2/E4/E5/E6 (§5.1) | V03 §5.1 *Edges* | T-V3-14, T-V3-36 (k) |
| M-V03-2360-E1 (§5.2) | V03 §5.2 | T-V3-36 (k) |
| M-V03-2369-E1/E2/E4/E5/E6/E7 (§5.3) | V03 §5.3 *Edges* | T-V3-13, T-V3-36 (k) |
| M-V03-2417-E2 (§5.4) | V03 §5.4 (a wholly concealed storey; J-V3.134) | T-V3-36 (g) |
| EI-V03-EDGE-1 | V03 §3.3 *Degenerate runs* (J-V3.133) | T-V3-36 (a) |
| C-cliff-plan, C-steep-plan, C-coast-plan, C-moat-plan, C-oasis-plan, C-frame-plan | V03 §3.9's combination rows; the rule-3 guard in V03 §3.7.1 (J-V3.131) | T-V3-18, T-V3-30, T-V3-31, T-V3-36 (i) |

## Open findings closed (36)

| finding | closed at |
|---|---|
| VOL-V03-V04-RESTATEMENTS-001 | V03 §1 and §5.1 cite §9.4's room-label range; no value restated |
| VOL-V03-V04-RESTATEMENTS-002 | V03 §1 and §6 cite §12.7's plan row and §12.8's cache line |
| VOL-V03-V04-RESTATEMENTS-003, V03-RESTATE-1 | the module's home is V03 §2.4's `moduleCm`; the base's restatements noted to the model and rendering editors (cross-part notes 6, 7) |
| VOL-V03-V04-RESTATEMENTS-004 | the `trapdoor` fallback stated at §2.6 step 3; V03 §3.7.1 and §3.9 cite it |
| V03-DUP-1 | V03 §1b *Derived pieces* the one list; §2.1 cites it |
| V03-DUP-2 | V03 §1b the one reader list; §2.5 and §3.7.4 cite it |
| V03-DUP-3 | V03 §3.1 step 2 the storey-less rule's home; §3.3 S6, §3.4a, §3.9 cite it |
| V03-DUP-4 | V03 §3.6 the `Entrance.storey` rule's home (the base's §2.6 rule 4 cites it); §2.1 and §2.5 cite it |
| V03-DUP-5 | V03 §3.7.4 defines the vault, the capped bays and stair-entered once |
| V03-DUP-6 | V03 §4.1 the one edit table; §1b, §2.5, §4.3 cite it |
| V03-DUP-7 | V03 §13 the one hand-off table |
| V03-ELEG-1 | E-28 |
| V03-ELEG-2 | E-29 |
| V03-EDGE-1 | V03 §3.3 *Degenerate runs*; `W_STOREY_RUN`; J-V3.133; T-V3-36 (a) |
| V03-WGAP-1 | V03 §1b, §4.6, T-V3-12 |
| V03-MISSING-1 | V03 §11 (J122) and V03 §8's decided order |
| V03-DEFER-1, V03-DEFER-4 | V03 §2.4's `'*'` rows final (volume 11's specialisation values); J-V3.93 |
| V03-DEFER-2 | V03 §3.12 (9) reads volume 4's `gradeFaces`; J-V3.132 (J-V3.98 superseded) |
| V03-DEFER-3 | V03 §8 *The decided order* = §16's M6-P row |
| V03-NARR-1, -2, -11 | one marker line; ledgers and round records removed |
| V03-NARR-3, -4, -6 | provenance tags removed from rows, derivations and bars |
| V03-NARR-5, -7 | the 'unbuilt' remark and the critique's pw sentence removed |
| V03-NARR-8 | J-V3.110 a withdrawn row |
| V03-NARR-9 | J-V3.111 – J-V3.129 as final decisions |
| V03-NARR-10 | V03 §10's pointer table |
| V03-BREF-1 | the scratchpad receipts gone |
| IN-V03-1, IN-V03-2, IN-V03-3 | folded at V03 §4.6 and §2.3, V03 §4.2, V03 §1 |

## Cross-part notes

1. **V10** — rename `deckRefusal` → `deckNoCellar` in V10 §1b's provider row and CVR-V10-9; the `plan` section's keys are
   `info.plan.<cause>` for `landingDoor`, `terraceDoor`, `terraceExit`, `seatingExit`, `walkOut`, `tombDoor`, `gradeFace`,
   `deckNoCellar`, `stoop`, `exposure`, `stackCarried`, `solidMonument` and `shrineOneRoom` (V03 §4.6), their `en` texts
   written once in V10 as the `info.crypt.*` family's are; V10 §3.9a's crypt rows agree with V03 §3.7.4's wet-ground rule.
2. **V09** — V09 §2.9/§4.9's catalogue gains the `info.plan.*` family; §4.17.5 (e) and `bend.crypt.largest` word the cap
   ("stops at {share} of the cathedral's") and cite V03 §3.7.4; `bend.crypt.cathedral` keeps the principal at its
   smallest lawful size (J-V3.130); the crypt line drops "floor vaults (wet ground)" (V10-XAGREE-4); XV-V9-5 and XV-V9-15
   are closed at V03 §3.7.4 and §4.2.
3. **V04** — T-V4-50's elaboration-independence clause (V04-XCONF-3); V04 §5.1 cites §14's PageUp/PageDown precedence
   (V04-XCONF-2); V03 §3.12 (9) and §1b cite `gradeFaces(chamberId)` at "V04 §3.5.4" (the sub-clause letter is volume 4's
   to fix); a walled-up arch vault (`W_ARCH_VAULT_NO_DOOR`) gives a building no grade face (V03 §3.12 (9)).
4. **scope (§14)** — the keymap states the storey keys' precedence over the depth-band keys (V04-XCONF-2), which V03 §4.5
   and V04 §5.1 cite; §14's `@plat/plots` line may list `doorRunPoint` beside `basementDoor` and `stackAccessDoor`.
5. **scope (§16, INDEX)** — V03 §8's decided order agrees with §16's M6-P row ("P0, P1 and P3 after M4 on the base's
   buildings; P2 once volume 4's access records exist; the rest after M6"); INDEX §6 marks V03 Q1 answered (J122); P3's
   basement, crypt and ways-down parts land with P2 (V03 §8's P3 row).
6. **model (§2.6)** — step 3's summary of `basementDoor(b)` may add rule 3's walkable guard ("among the door sides whose
   outside lies on walkable ground within the datum tolerance below the basement's floor", V03 §3.7.1; J-V3.131); step 4's
   "default 50 cm" wing-local module restates V03 §2.4's `PlanGeometryRow.moduleCm`, its home per
   VOL-V03-V04-RESTATEMENTS-003 — cite it; `BuildingInput.plot` is read by V03 §3.1 (MC-01).
7. **rendering (§12.7)** — the plan row's fallback "(50 → 100 cm)" cites V03 §2.4's `moduleCm` for the 50.
8. **V05** — V05 §1b's `levelledGroundCm` reader list names V03's W2 outside sample (V03 §3.6).
9. **V11** — the least cell of a class's `cryptM2` row is read by the crypt dry runs (J-V3.130); row 38's readers stand as
   V11 §3.1 states them.
10. **V12** — T-V3-36 is a structural bar (no register line); X-V12-4, -15, -16, -17 and -18 are closed at V03 §2.4, §7 and
    §8.
11. **V06, V01, V02, V07** — each hand-off row of V03 §13 is closed at the section named there; nothing further owed.

## Mapping table (513 of 513 inventory ids)

`kept` = the statement stands at the named section of the new text (citations normalised, tags removed); `reference` = replaced by a pointer to its home; `pointer` = a V03 §10 row naming the applied file f item; `moved` / `folded` = its one home is the named section.

| inventory id | old § | kind | canon role | now at | how |
|---|---|---|---|---|---|
| V03-0001 | 0 | summary | home | V03 §0 | kept |
| V03-0002 | 0 | summary | home | V03 §0 | kept |
| V03-0003 | 0 | summary | home | V03 §0 | kept |
| V03-0004 | 0 | summary | home | V03 §0 | kept |
| V03-0005 | 0 | summary | home | V03 §0 | kept |
| V03-0006 | 1 | scope | home | V03 §1 | kept |
| V03-0007 | 1 | rule | reference | V03 §1 *Scope* | reference: the records and rung steps cited at §2.6 |
| V03-0008 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0009 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0010 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0011 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0012 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0013 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0014 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0015 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0016 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0017 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0018 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0019 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0020 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0021 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0022 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0023 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0024 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0025 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0026 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0027 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0028 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0029 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0030 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0031 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0032 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0033 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0034 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0035 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0036 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0037 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0038 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0039 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0040 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0041 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0042 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0043 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0044 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0045 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0046 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0047 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0048 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0049 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0050 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0051 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0052 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0053 | 1 | hook | home | V03 §1 | kept |
| V03-0054 | 1 | hook | index-row | V03 §1 base-hooks table | kept |
| V03-0055 | 1 | scope | index-row | V03 §1 base-hooks table | kept |
| V03-0056 | 1b | rule | home | V03 §1b | kept |
| V03-0057 | 1b | table | home | V03 §1b | kept |
| V03-0058 | 1b | table | home | V03 §1b | kept |
| V03-0059 | 1b | table | home | V03 §1b | kept |
| V03-0060 | 1b | table | home | V03 §1b | kept |
| V03-0061 | 1b | table | home | V03 §1b | kept |
| V03-0062 | 1b | table | home | V03 §1b | kept |
| V03-0063 | 1b | table | reference | V03 §1b tables row | reference to §4.12; the row's values stay at V03 §2.4 (the base lacks them) |
| V03-0064 | 1b | table | home | V03 §1b | kept |
| V03-0065 | 1b | table | home | V03 §1b | kept |
| V03-0066 | 1b | record | home | V03 §1b | kept |
| V03-0067 | 1b | record | home | V03 §1b | kept |
| V03-0068 | 1b | record | home | V03 §1b | kept |
| V03-0069 | 1b | record | home | V03 §1b | kept |
| V03-0070 | 1b | record | home | V03 §1b | kept |
| V03-0071 | 1b | record | home | V03 §1b | kept |
| V03-0072 | 1b | record | reference | V03 §1b records row | reference: produced by V04's entrance derivation (V04 §1b) |
| V03-0073 | 1b | record | home | V03 §1b | kept |
| V03-0074 | 1b | record | home | V03 §1b | kept |
| V03-0075 | 1b | record | reference | V03 §1b records row | reference: the rule at V03 §3.6 (§2.6 rule 4 cites it) |
| V03-0076 | 1b | record | home | V03 §1b | kept |
| V03-0077 | 1b | record | home | V03 §1b | kept |
| V03-0078 | 1b | record | reference | V03 §1b records row; V03 §2.5 | reference: lifecycle row in V03 §2.5 |
| V03-0079 | 1b | interface | home | V03 §1b | kept |
| V03-0080 | 1b | mechanism | home | V03 §1b | kept |
| V03-0081 | 1b | mechanism | home | V03 §1b | kept |
| V03-0082 | 1b | mechanism | home | V03 §1b | kept |
| V03-0083 | 1b | interface | home | V03 §1b | kept |
| V03-0084 | 1b | interface | home | V03 §1b | kept |
| V03-0085 | 1b | mechanism | reference | V03 §1b derived row | reference: V04's `gradeFaces(chamberId)` (V04 §3.5.4) |
| V03-0086 | 1b | interface | reference | V03 §1b derived row | reference: V02's deck gate (BCR-V2-34) |
| V03-0087 | 1b | mechanism | home | V03 §1b | kept |
| V03-0088 | 1b | mechanism | home | V03 §1b | kept |
| V03-0089 | 1b | mechanism | home | V03 §1b | kept |
| V03-0090 | 1b | step | home | V03 §1b | kept |
| V03-0091 | 1b | step | home | V03 §1b | kept |
| V03-0092 | 1b | interface | reference | V03 §1b interfaces row | reference: §2.6 names the builder; package §14 (file f item 505) |
| V03-0093 | 1b | interface | reference | V03 §1b interfaces row | reference: V02 §3.8 |
| V03-0094 | 1b | interface | home | V03 §1b | kept |
| V03-0095 | 1b | interface | home | V03 §1b | kept |
| V03-0096 | 1b | edit | home | V03 §4.1 edit table | moved: one edit table (DUP-6) |
| V03-0097 | 1b | rule | home | V03 §1b | kept |
| V03-0098 | 1b | record | home | V03 §1b | kept |
| V03-0099 | 1b | rule | reference | V03 §1b *The dossier, end to end* | reference: §7.7 rows |
| V03-0100 | 1b | rule | reference | V03 §1b *The dossier, end to end* | reference: V11 §3.13 |
| V03-0101 | 1b | rule | reference | V03 §1b *The dossier, end to end* | reference: V08 §2.6a, V11 column |
| V03-0102 | 1b | rule | reference | V03 §1b *The dossier, end to end* | reference: §2.8 factTier |
| V03-0103 | 2.1 | record | home | V03 §2.1 | kept |
| V03-0104 | 2.1 | record | home | V03 §2.1 | kept |
| V03-0105 | 2.1 | field | home | V03 §2.1 | kept |
| V03-0106 | 2.1 | field | home | V03 §2.1 | kept |
| V03-0107 | 2.1 | field | home | V03 §2.1 | kept |
| V03-0108 | 2.1 | field | home | V03 §2.1 | kept |
| V03-0109 | 2.1 | field | home | V03 §2.1 | kept |
| V03-0110 | 2.1 | record | home | V03 §2.1 | kept |
| V03-0111 | 2.1 | field | home | V03 §2.1 | kept |
| V03-0112 | 2.1 | field | home | V03 §2.1 | kept |
| V03-0113 | 2.1 | field | reference | V03 §2.1 (one line) | reference: the rule at V03 §3.6 (DUP-4) |
| V03-0114 | 2.1 | field | reference | V03 §2.1 (one line) | reference: declared at §2.6 (file f item 238); ring, rank, entry V03 §3.7.4 |
| V03-0115 | 2.1 | rule | home | V03 §1b *Derived pieces* | moved: the one list of derived pieces (DUP-1) |
| V03-0116 | 2.2 | rule | home | V03 §2.2 | kept |
| V03-0117 | 2.2 | rule | home | V03 §2.2 | kept |
| V03-0118 | 2.2 | table | home | V03 §2.2 | kept |
| V03-0119 | 2.2 | rule | home | V03 §2.2 | kept |
| V03-0120 | 2.3 | record | home | V03 §2.3 | kept |
| V03-0121 | 2.3 | rule | home | V03 §2.3 | kept |
| V03-0122 | 2.4 | rule | home | V03 §2.4 | kept |
| V03-0123 | 2.4 | rule | home | V03 §2.4 | kept |
| V03-0124 | 2.4 | record | home | V03 §2.4 | kept |
| V03-0125 | 2.4 | record | home | V03 §2.4 | kept |
| V03-0126 | 2.4 | record | home | V03 §2.4 | kept |
| V03-0127 | 2.4 | constant | home | V03 §2.4 | kept |
| V03-0128 | 2.4 | rule | home | V03 §2.4 | kept |
| V03-0129 | 2.4 | table | home | V03 §2.4 | kept |
| V03-0130 | 2.4 | table | home | V03 §2.4 | kept |
| V03-0131 | 2.4 | rule | home | V03 §2.4 | kept |
| V03-0132 | 2.4 | table | home | V03 §2.4 | kept |
| V03-0133 | 2.4 | rule | home | V03 §2.4 | kept |
| V03-0134 | 2.4 | table | home | V03 §2.4 | kept |
| V03-0135 | 2.4 | table | home | V03 §2.4 | kept |
| V03-0136 | 2.4 | table | home | V03 §2.4 | kept |
| V03-0137 | 2.4 | table | home | V03 §2.4 | kept |
| V03-0138 | 2.4 | rule | home | V03 §2.4 | kept |
| V03-0139 | 2.4 | rule | home | V03 §2.4 | kept |
| V03-0140 | 2.4 | table | home | V03 §2.4 | kept |
| V03-0141 | 2.4 | rule | home | V03 §2.4 | kept |
| V03-0142 | 2.4 | table | home | V03 §2.4 | kept |
| V03-0143 | 2.4 | table | home | V03 §2.4 | kept |
| V03-0144 | 2.4 | table | home | V03 §2.4 | kept |
| V03-0145 | 2.4 | table | home | V03 §2.4 | kept |
| V03-0146 | 2.4 | constant | reference | V03 §2.4 | reference to §4.12 |
| V03-0147 | 2.4 | rule | home | V03 §2.4 | kept |
| V03-0148 | 2.4 | table | home | V03 §2.4 | kept |
| V03-0149 | 2.5 | lifecycle | home | V03 §2.5 | kept |
| V03-0150 | 2.5 | lifecycle | home | V03 §2.5 | kept |
| V03-0151 | 2.5 | lifecycle | home | V03 §2.5 | kept |
| V03-0152 | 2.5 | lifecycle | home | V03 §2.5 | kept |
| V03-0153 | 2.5 | lifecycle | home | V03 §2.5 | kept |
| V03-0154 | 2.5 | lifecycle | home | V03 §2.5 | kept |
| V03-0155 | 2.5 | lifecycle | home | V03 §2.5 | kept |
| V03-0156 | 2.5 | lifecycle | home | V03 §4.1 edit table | moved: edit rows (DUP-6) |
| V03-0157 | 2.5 | lifecycle | home | V03 §2.5 | kept |
| V03-0158 | 2.5 | lifecycle | home | V03 §2.5 | kept |
| V03-0159 | 2.5 | lifecycle | reference | V03 §2.5 row | kept; rule at V03 §3.6 |
| V03-0160 | 2.5 | lifecycle | home | V03 §2.5 derived-pieces table | restructured: one table for derived pieces |
| V03-0161 | 2.5 | lifecycle | home | V03 §2.5 | kept |
| V03-0162 | 3.1 | step | reference | V03 §3.1 | kept (the sub-step order is V03's; §2.6's steps cited) |
| V03-0163 | 3.1 | rule | home | V03 §3.1 | kept |
| V03-0164 | 3.1 | rule | home | V03 §3.1 | kept |
| V03-0165 | 3.2 | mechanism | home | V03 §3.2 | kept |
| V03-0166 | 3.2 | mechanism | home | V03 §3.2 | kept |
| V03-0167 | 3.2 | rule | home | V03 §3.2 | kept |
| V03-0168 | 3.2 | rule | home | V03 §3.2 | kept |
| V03-0169 | 3.2 | mechanism | home | V03 §3.2 | kept |
| V03-0170 | 3.2 | rule | home | V03 §3.2 | kept |
| V03-0171 | 3.2 | rule | home | V03 §3.2 | kept |
| V03-0172 | 3.2 | rule | home | V03 §3.2 | kept |
| V03-0173 | 3.2 | rule | home | V03 §3.2 | kept |
| V03-0174 | 3.2 | rule | home | V03 §3.2 | kept |
| V03-0175 | 3.2 | rule | home | V03 §3.2 | kept |
| V03-0176 | 3.2 | rule | home | V03 §3.2 | kept |
| V03-0177 | 3.2 | rule | home | V03 §3.2 | kept |
| V03-0178 | 3.2 | rule | home | V03 §3.2 | kept |
| V03-0179 | 3.2 | rule | home | V03 §3.2 | kept |
| V03-0180 | 3.2 | rule | home | V03 §3.2 | kept |
| V03-0181 | 3.2 | rule | home | V03 §3.2 | kept |
| V03-0182 | 3.2 | rule | home | V03 §3.2 | kept |
| V03-0183 | 3.2 | rule | home | V03 §3.2 | kept |
| V03-0184 | 3.2 | rule | home | V03 §3.2 | kept |
| V03-0185 | 3.2 | rule | home | V03 §3.2 | kept |
| V03-0186 | 3.3 | rule | home | V03 §3.3 | kept |
| V03-0187 | 3.3 | mechanism | home | V03 §3.3 | kept |
| V03-0188 | 3.3 | mechanism | home | V03 §3.3 | kept |
| V03-0189 | 3.3 | rule | home | V03 §3.3 | kept |
| V03-0190 | 3.3 | rule | home | V03 §3.3 | kept |
| V03-0191 | 3.3 | rule | home | V03 §3.3 | kept |
| V03-0192 | 3.3 | fallback | home | V03 §3.3 | kept |
| V03-0193 | 3.3 | rule | home | V03 §3.3 | kept |
| V03-0194 | 3.3 | rule | home | V03 §3.3 | kept |
| V03-0195 | 3.3 | rule | home | V03 §3.3 | kept |
| V03-0196 | 3.3 | rule | home | V03 §3.3 | kept |
| V03-0197 | 3.3 | rule | home | V03 §3.3 | kept |
| V03-0198 | 3.3 | rule | home | V03 §3.3 | kept |
| V03-0199 | 3.3 | rule | home | V03 §3.3 | kept |
| V03-0200 | 3.3 | rule | home | V03 §3.3 | kept |
| V03-0201 | 3.3 | rule | home | V03 §3.3 | kept |
| V03-0202 | 3.4 | rule | home | V03 §3.4 | kept |
| V03-0203 | 3.4a | mechanism | home | V03 §3.4a | kept |
| V03-0204 | 3.5 | mechanism | home | V03 §3.5 | kept |
| V03-0205 | 3.5 | rule | home | V03 §3.5 | kept |
| V03-0206 | 3.5 | mechanism | home | V03 §3.5 | kept |
| V03-0207 | 3.5 | mechanism | home | V03 §3.5 | kept |
| V03-0208 | 3.5 | rule | home | V03 §3.5 | kept |
| V03-0209 | 3.5 | table | home | V03 §3.5 | kept |
| V03-0210 | 3.5 | mechanism | home | V03 §3.5 | kept |
| V03-0211 | 3.5 | rule | home | V03 §3.5 | kept |
| V03-0212 | 3.6 | rule | home | V03 §3.6 | kept |
| V03-0213 | 3.6 | mechanism | home | V03 §3.6 | kept |
| V03-0214 | 3.6 | rule | home | V03 §3.6 | kept |
| V03-0215 | 3.6 | rule | home | V03 §3.6 | kept |
| V03-0216 | 3.6 | rule | home | V03 §3.6 | kept |
| V03-0217 | 3.6 | rule | home | V03 §3.6 | kept |
| V03-0218 | 3.6 | rule | home | V03 §3.6 | kept |
| V03-0219 | 3.6 | rule | home | V03 §3.6 | kept |
| V03-0220 | 3.6 | rule | home | V03 §3.6 | kept |
| V03-0221 | 3.6 | rule | home | V03 §3.6 | kept |
| V03-0222 | 3.6 | mechanism | home | V03 §3.6 | kept |
| V03-0223 | 3.6 | rule | reference | V03 §3.6 *Entrance storeys* | kept as the home: the base §2.6 rule 4 cites it (the base lacks the rule text) |
| V03-0224 | 3.6 | rule | home | V03 §3.6 | kept |
| V03-0225 | 3.6 | rule | reference | V03 §3.6 W2 | reference: V02 §8.1 (the decided Q1 order) |
| V03-0226 | 3.6 | rule | home | V03 §3.6 | kept |
| V03-0227 | 3.6 | rule | home | V03 §3.6 | kept |
| V03-0228 | 3.7.1 | rule | home | V03 §3.7.1 | kept |
| V03-0229 | 3.7.1 | rule | home | V03 §3.7.1 | kept |
| V03-0230 | 3.7.1 | rule | reference | V03 §3.7.1 | reference: §2.6 *Basements* |
| V03-0231 | 3.7.1 | interface | home | V03 §3.7.1 | kept |
| V03-0232 | 3.7.1 | rule | home | V03 §3.7.1 | kept |
| V03-0233 | 3.7.1 | rule | home | V03 §3.7.1 | kept |
| V03-0234 | 3.7.2 | rule | home | V03 §3.7.2 | kept |
| V03-0235 | 3.7.2 | rule | home | V03 §3.7.2 | kept |
| V03-0236 | 3.7.2 | rule | home | V03 §3.7.2 | kept |
| V03-0237 | 3.7.2 | interface | home | V03 §3.7.2 | kept |
| V03-0238 | 3.7.2 | rule | home | V03 §3.7.2 | kept |
| V03-0239 | 3.7.2 | rule | home | V03 §3.7.2 | kept |
| V03-0240 | 3.7.2 | rule | home | V03 §3.7.2 | kept |
| V03-0241 | 3.7.2 | rule | home | V03 §3.7.2 | kept |
| V03-0242 | 3.7.3 | rule | home | V03 §3.7.3 | kept |
| V03-0243 | 3.7.4 | rule | reference | V03 §3.7.4 | reference: §2.6 *Basements* (column meaning, ladder); crypt-only, whole inset, wet ground kept here |
| V03-0244 | 3.7.4 | rule | home | V03 §3.7.4 | kept |
| V03-0245 | 3.7.4 | rule | home | V03 §3.7.4 | kept |
| V03-0246 | 3.7.4 | rule | home | V03 §3.7.4 | kept |
| V03-0247 | 3.7.4 | rule | home | V03 §3.7.4 | kept |
| V03-0248 | 3.7.5 | rule | home | V03 §3.7.5 | kept |
| V03-0249 | 3.7.6 | rule | home | V03 §3.7.6 | kept |
| V03-0250 | 3.7.6 | rule | home | V03 §3.7.6 | kept |
| V03-0251 | 3.7.6 | rule | home | V03 §3.7.6 | kept |
| V03-0252 | 3.7.7 | rule | home | V03 §3.7.7 | kept |
| V03-0253 | 3.8 | rule | home | V03 §3.8 | kept |
| V03-0254 | 3.8 | rule | home | V03 §3.8 | kept |
| V03-0255 | 3.9 | table | home | V03 §3.9 | kept |
| V03-0256 | 3.9 | fallback | home | V03 §3.9 | kept |
| V03-0257 | 3.10 | table | home | V03 §3.10 | kept |
| V03-0258 | 3.10 | rule | home | V03 §3.10 | kept |
| V03-0259 | 3.11 | rule | home | V03 §3.11 | kept |
| V03-0260 | 3.12 | rule | home | V03 §3.12 | kept |
| V03-0261 | 3.12 | rule | home | V03 §3.12 | kept |
| V03-0262 | 3.12 | rule | reference | V03 §3.12 (10) | reference: V04 §3.5.0a |
| V03-0263 | 4.1 | rule | home | V03 §4.1 | kept |
| V03-0264 | 4.2 | rule | home | V03 §4.2 | kept |
| V03-0265 | 4.2 | edit | home | V03 §4.2 | kept |
| V03-0266 | 4.2 | edit | home | V03 §4.2 | kept |
| V03-0267 | 4.2 | edit | home | V03 §4.2 | kept |
| V03-0268 | 4.2 | edit | home | V03 §4.2 | kept |
| V03-0269 | 4.2 | edit | home | V03 §4.2 | kept |
| V03-0270 | 4.2 | edit | home | V03 §4.2 | kept |
| V03-0271 | 4.2 | edit | home | V03 §4.2 | kept |
| V03-0272 | 4.2 | edit | home | V03 §4.2 | kept |
| V03-0273 | 4.2 | edit | reference | V03 §4.2 | kept; the dry run cites V02 §4.2 |
| V03-0274 | 4.2 | rule | home | V03 §4.2 | kept |
| V03-0275 | 4.3 | rule | home | V03 §4.3 | kept |
| V03-0276 | 4.3 | rule | home | V03 §4.3 | kept |
| V03-0277 | 4.3 | rule | home | V03 §4.3 | kept |
| V03-0278 | 4.3 | rule | home | V03 §4.3 | kept |
| V03-0279 | 4.3 | rule | home | V03 §4.1 edit table; V03 §4.3 | moved: undo into the one edit table (DUP-6) |
| V03-0280 | 4.4 | rule | home | V03 §4.4 | kept |
| V03-0281 | 4.5 | rule | home | V03 §4.5 | kept |
| V03-0282 | 4.5 | rule | home | V03 §4.5 | kept |
| V03-0283 | 4.5 | rule | home | V03 §4.5 | kept |
| V03-0284 | 4.5 | rule | home | V03 §4.5 | kept |
| V03-0285 | 4.5 | rule | home | V03 §4.5 | kept |
| V03-0286 | 4.6 | interface | home | V03 §4.6 | kept |
| V03-0287 | 4.6 | interface | home | V03 §4.6 | kept |
| V03-0288 | 5.1 | render | reference | V03 §5.1 *Stops* | reference: §8.8 |
| V03-0289 | 5.1 | render | home | V03 §5.1 | kept |
| V03-0290 | 5.1 | render | home | V03 §5.1 | kept |
| V03-0291 | 5.1 | render | home | V03 §5.1 | kept |
| V03-0292 | 5.1 | render | home | V03 §5.1 | kept |
| V03-0293 | 5.2 | export | home | V03 §5.2 | kept |
| V03-0294 | 5.3 | export | reference | V03 §5.3 | kept as home (base §11.1 cites V03 §5.3) |
| V03-0295 | 5.3 | export | reference | V03 §5.3 | kept as home (base §11.1 cites V03 §5.3) |
| V03-0296 | 5.3 | export | reference | V03 §5.3 | kept as home (base §11.1 cites V03 §5.3) |
| V03-0297 | 5.3 | export | reference | V03 §5.3 | kept as home (base §11.1 cites V03 §5.3) |
| V03-0298 | 5.3 | export | reference | V03 §5.3 | kept as home (base §11.1 cites V03 §5.3) |
| V03-0299 | 5.4 | rule | home | V03 §5.4 | kept |
| V03-0300 | 6 | budget | home | V03 §6 | kept |
| V03-0301 | 6 | fallback | home | V03 §6 | kept |
| V03-0302 | 7 | test | home | V03 §7 | kept |
| V03-0303 | 7 | test | home | V03 §7 | kept |
| V03-0304 | 7 | test | home | V03 §7 | kept |
| V03-0305 | 7 | test | home | V03 §7 | kept |
| V03-0306 | 7 | test | home | V03 §7 | kept |
| V03-0307 | 7 | test | home | V03 §7 | kept |
| V03-0308 | 7 | test | home | V03 §7 | kept |
| V03-0309 | 7 | test | home | V03 §7 | kept |
| V03-0310 | 7 | test | home | V03 §7 | kept |
| V03-0311 | 7 | test | home | V03 §7 | kept |
| V03-0312 | 7 | test | home | V03 §7 | kept |
| V03-0313 | 7 | test | home | V03 §7 | kept |
| V03-0314 | 8 | decision | home | V03 §8 | kept |
| V03-0315 | 8 | table | home | V03 §8 | kept |
| V03-0316 | 8 | table | home | V03 §8 | kept |
| V03-0317 | 8 | table | home | V03 §8 | kept |
| V03-0318 | 8 | decision | home | V03 §8 | kept |
| V03-0319 | 8 | rule | home | V03 §8 | kept |
| V03-0320 | 8 | decision | reference | V03 §8 *Where in §16's order* | reference: §16's M6-P row |
| V03-0321 | 9 | decision | home | V03 §9 J-V3.1 | kept |
| V03-0322 | 9 | decision | home | V03 §9 J-V3.2 | kept |
| V03-0323 | 9 | decision | home | V03 §9 J-V3.3 | kept |
| V03-0324 | 9 | decision | home | V03 §9 J-V3.4 | kept |
| V03-0325 | 9 | decision | home | V03 §9 J-V3.5 | kept |
| V03-0326 | 9 | decision | home | V03 §9 J-V3.6 | kept |
| V03-0327 | 9 | decision | home | V03 §9 J-V3.7 | kept |
| V03-0328 | 9 | decision | home | V03 §9 J-V3.8 | kept |
| V03-0329 | 9 | decision | home | V03 §9 J-V3.9 | kept |
| V03-0330 | 9 | decision | home | V03 §9 J-V3.10 | kept |
| V03-0331 | 9 | decision | home | V03 §9 J-V3.11 | kept |
| V03-0332 | 9 | decision | home | V03 §9 J-V3.12 | kept |
| V03-0333 | 9 | decision | home | V03 §9 J-V3.13 | kept |
| V03-0334 | 9 | decision | home | V03 §9 J-V3.14 | kept |
| V03-0335 | 9 | decision | home | V03 §9 J-V3.15 | kept |
| V03-0336 | 9 | decision | home | V03 §9 J-V3.16 | kept |
| V03-0337 | 9 | decision | home | V03 §9 J-V3.17 | kept |
| V03-0338 | 9 | decision | home | V03 §9 J-V3.18 | kept |
| V03-0339 | 9 | decision | home | V03 §9 J-V3.19 | kept |
| V03-0340 | 9 | decision | home | V03 §9 J-V3.20 | kept |
| V03-0341 | 9 | decision | home | V03 §9 J-V3.21 | kept |
| V03-0342 | 9 | decision | home | V03 §9 J-V3.22 | kept |
| V03-0343 | 9 | decision | home | V03 §9 J-V3.23 | kept |
| V03-0344 | 9 | decision | home | V03 §9 J-V3.24 | kept |
| V03-0345 | 9 | decision | home | V03 §9 J-V3.25 | kept |
| V03-0346 | 9 | decision | home | V03 §9 J-V3.26 | kept |
| V03-0347 | 9 | decision | home | V03 §9 J-V3.27 | kept |
| V03-0348 | 9 | decision | home | V03 §9 J-V3.28 | kept |
| V03-0349 | 9 | decision | home | V03 §9 J-V3.29 | kept |
| V03-0350 | 9 | decision | home | V03 §9 J-V3.30 | kept |
| V03-0351 | 9 | decision | home | V03 §9 J-V3.31 | kept |
| V03-0352 | 9 | decision | home | V03 §9 J-V3.32 | kept |
| V03-0353 | 9 | decision | home | V03 §9 J-V3.33 | kept |
| V03-0354 | 9 | decision | home | V03 §9 J-V3.34 | kept |
| V03-0355 | 9 | decision | home | V03 §9 J-V3.35 | kept |
| V03-0356 | 9 | decision | home | V03 §9 J-V3.36 | kept |
| V03-0357 | 9 | decision | home | V03 §9 J-V3.37 | kept |
| V03-0358 | 9 | decision | home | V03 §9 J-V3.38 | kept |
| V03-0359 | 9 | decision | home | V03 §9 J-V3.39 | kept |
| V03-0360 | 9 | decision | home | V03 §9 J-V3.40 | kept |
| V03-0361 | 9 | decision | home | V03 §9 J-V3.41 | kept |
| V03-0362 | 9 | decision | home | V03 §9 J-V3.42 | kept |
| V03-0363 | 9 | decision | home | V03 §9 J-V3.43 | kept |
| V03-0364 | 9 | decision | home | V03 §9 J-V3.44 | kept |
| V03-0365 | 9 | decision | home | V03 §9 J-V3.45 | kept |
| V03-0366 | 9 | decision | home | V03 §9 J-V3.46 | kept |
| V03-0367 | 9 | decision | home | V03 §9 J-V3.47 | kept; marked amended by J-V3.130 (E-24) |
| V03-0368 | 9 | decision | home | V03 §9 J-V3.48 | kept |
| V03-0369 | 9 | decision | home | V03 §9 J-V3.49 | kept |
| V03-0370 | 9 | decision | home | V03 §9 J-V3.50 | kept |
| V03-0371 | 9 | decision | home | V03 §9 J-V3.51 | kept |
| V03-0372 | 9 | decision | home | V03 §9 J-V3.52 | kept |
| V03-0373 | 9 | decision | home | V03 §9 J-V3.53 | kept |
| V03-0374 | 9 | decision | home | V03 §9 J-V3.54 | kept |
| V03-0375 | 9 | decision | home | V03 §9 J-V3.55 | kept |
| V03-0376 | 9 | decision | home | V03 §9 J-V3.56 | kept |
| V03-0377 | 9 | decision | home | V03 §9 J-V3.57 | kept |
| V03-0378 | 9 | decision | home | V03 §9 J-V3.58 | kept |
| V03-0379 | 9 | decision | home | V03 §9 J-V3.59 | kept |
| V03-0380 | 9 | decision | home | V03 §9 J-V3.60 | kept |
| V03-0381 | 9 | decision | home | V03 §9 J-V3.61 | kept |
| V03-0382 | 9 | decision | home | V03 §9 J-V3.62 | kept |
| V03-0383 | 9 | decision | home | V03 §9 J-V3.63 | kept |
| V03-0384 | 9 | decision | home | V03 §9 J-V3.64 | kept |
| V03-0385 | 9 | decision | home | V03 §9 J-V3.65 | kept |
| V03-0386 | 9 | decision | home | V03 §9 J-V3.66 | kept |
| V03-0387 | 9 | decision | home | V03 §9 J-V3.67 | kept |
| V03-0388 | 9 | decision | home | V03 §9 J-V3.68 | kept |
| V03-0389 | 9 | decision | home | V03 §9 J-V3.69 | kept |
| V03-0390 | 9 | decision | home | V03 §9 J-V3.70 | kept |
| V03-0391 | 9 | decision | home | V03 §9 J-V3.71 | kept |
| V03-0392 | 9 | decision | home | V03 §9 J-V3.72 | kept |
| V03-0393 | 9 | decision | home | V03 §9 J-V3.73 | kept |
| V03-0394 | 9 | decision | home | V03 §9 J-V3.74 | kept |
| V03-0395 | 9 | decision | home | V03 §9 J-V3.75 | kept |
| V03-0396 | 9 | decision | home | V03 §9 J-V3.76 | kept |
| V03-0397 | 9 | decision | home | V03 §9 J-V3.77 | kept |
| V03-0398 | 9 | decision | home | V03 §9 J-V3.78 | kept |
| V03-0399 | 9 | decision | home | V03 §9 J-V3.79 | kept |
| V03-0400 | 9 | decision | home | V03 §9 J-V3.80 | kept |
| V03-0401 | 9 | decision | home | V03 §9 J-V3.81 | kept |
| V03-0402 | 9 | decision | home | V03 §9 J-V3.82 | kept |
| V03-0403 | 9 | decision | home | V03 §9 J-V3.83 | kept |
| V03-0404 | 9 | decision | home | V03 §9 J-V3.84 | kept |
| V03-0405 | 9 | decision | home | V03 §9 J-V3.85 | kept |
| V03-0406 | 9 | decision | home | V03 §9 J-V3.86 | kept |
| V03-0407 | 9 | decision | home | V03 §9 J-V3.87 | kept |
| V03-0408 | 9 | decision | home | V03 §9 J-V3.88 | kept |
| V03-0409 | 9 | decision | home | V03 §9 J-V3.89 | kept |
| V03-0410 | 9 | decision | home | V03 §9 J-V3.90 | kept |
| V03-0411 | 9 | decision | home | V03 §9 J-V3.91 | kept |
| V03-0412 | 9 | decision | home | V03 §9 J-V3.92 | kept |
| V03-0413 | 9 | decision | home | V03 §9 J-V3.93 | kept; deferral wording ruled final (DEFER-4) |
| V03-0414 | 9 | decision | home | V03 §9 J-V3.94 | kept |
| V03-0415 | 9 | decision | home | V03 §9 J-V3.95 | kept |
| V03-0416 | 9 | decision | home | V03 §9 J-V3.96 | kept |
| V03-0417 | 9 | decision | home | V03 §9 J-V3.97 | kept |
| V03-0418 | 9 | decision | home | V03 §9 J-V3.98 | kept; marked superseded by J-V3.132 (E-24) |
| V03-0419 | 9 | decision | home | V03 §9 J-V3.99 | kept |
| V03-0420 | 9 | decision | home | V03 §9 J-V3.100 | kept |
| V03-0421 | 9 | decision | home | V03 §9 J-V3.101 | kept |
| V03-0422 | 9 | decision | home | V03 §9 J-V3.102 | kept |
| V03-0423 | 9 | decision | home | V03 §9 J-V3.103 | kept |
| V03-0424 | 9 | decision | home | V03 §9 J-V3.104 | kept |
| V03-0425 | 9 | decision | home | V03 §9 J-V3.105 | kept |
| V03-0426 | 9 | decision | home | V03 §9 J-V3.106 | kept |
| V03-0427 | 9 | decision | home | V03 §9 J-V3.107 | kept |
| V03-0428 | 9 | decision | home | V03 §9 J-V3.108 | kept |
| V03-0429 | 9 | decision | home | V03 §9 J-V3.109 | kept |
| V03-0430 | 9 | decision | home | V03 §9 J-V3.110 | withdrawn row (process record; NARR-8) |
| V03-0431 | 9 | decision | home | V03 §9 J-V3.111 | kept; round labels and amendment layers folded into the final decision (NARR-9) |
| V03-0432 | 9 | decision | home | V03 §9 J-V3.112 | kept; round labels and amendment layers folded into the final decision (NARR-9) |
| V03-0433 | 9 | decision | home | V03 §9 J-V3.113 | kept; round labels and amendment layers folded into the final decision (NARR-9) |
| V03-0434 | 9 | decision | home | V03 §9 J-V3.114 | kept; round labels and amendment layers folded into the final decision (NARR-9) |
| V03-0435 | 9 | decision | home | V03 §9 J-V3.115 | kept; round labels and amendment layers folded into the final decision (NARR-9) |
| V03-0436 | 9 | decision | home | V03 §9 J-V3.116 | kept; round labels and amendment layers folded into the final decision (NARR-9) |
| V03-0437 | 9 | decision | home | V03 §9 J-V3.117 | kept; round labels and amendment layers folded into the final decision (NARR-9) |
| V03-0438 | 9 | decision | home | V03 §9 J-V3.118 | kept; round labels and amendment layers folded into the final decision (NARR-9) |
| V03-0439 | 9 | decision | home | V03 §9 J-V3.119 | kept; round labels and amendment layers folded into the final decision (NARR-9) |
| V03-0440 | 9 | decision | home | V03 §9 J-V3.120 | kept; round labels and amendment layers folded into the final decision (NARR-9) |
| V03-0441 | 9 | decision | home | V03 §9 J-V3.121 | kept; round labels and amendment layers folded into the final decision (NARR-9) |
| V03-0442 | 9 | decision | home | V03 §9 J-V3.122 | kept; round labels and amendment layers folded into the final decision (NARR-9) |
| V03-0443 | 9 | decision | home | V03 §9 J-V3.123 | kept; round labels and amendment layers folded into the final decision (NARR-9) |
| V03-0444 | 9 | decision | home | V03 §9 J-V3.124 | kept; round labels and amendment layers folded into the final decision (NARR-9) |
| V03-0445 | 9 | decision | home | V03 §9 J-V3.125 | kept; round labels and amendment layers folded into the final decision (NARR-9) |
| V03-0446 | 9 | decision | home | V03 §9 J-V3.126 | kept; round labels and amendment layers folded into the final decision (NARR-9) |
| V03-0447 | 9 | decision | home | V03 §9 J-V3.127 | kept; round labels and amendment layers folded into the final decision (NARR-9) |
| V03-0448 | 9 | decision | home | V03 §9 J-V3.128 | kept; round labels and amendment layers folded into the final decision (NARR-9) |
| V03-0449 | 9 | decision | home | V03 §9 J-V3.129 | kept; round labels and amendment layers folded into the final decision (NARR-9) |
| V03-0450 | 10 | rule | home | V03 §10 | kept |
| V03-0451 | 10 | bcr | bcr-pointer | V03 §10 table | pointer: file f item 428 |
| V03-0452 | 10 | bcr | bcr-pointer | V03 §10 table | pointer: file f item 232 |
| V03-0453 | 10 | bcr | bcr-pointer | V03 §10 table | pointer: file f item 352 |
| V03-0454 | 10 | bcr | bcr-pointer | V03 §10 table | pointer: file f item 374 |
| V03-0455 | 10 | bcr | bcr-pointer | V03 §10 table | pointer: file f item 457 |
| V03-0456 | 10 | bcr | bcr-pointer | V03 §10 table | pointer: file f item 420 |
| V03-0457 | 10 | bcr | bcr-pointer | V03 §10 table | pointer: file f item 450 |
| V03-0458 | 10 | bcr | bcr-pointer | V03 §10 table | pointer: file f item 273 |
| V03-0459 | 10 | bcr | bcr-pointer | V03 §10 table | pointer: file f item 482 |
| V03-0460 | 10 | bcr | bcr-pointer | V03 §10 table | pointer: file f item 329 |
| V03-0461 | 10 | bcr | bcr-pointer | V03 §10 table | pointer: file f item 334 |
| V03-0462 | 10 | bcr | bcr-pointer | V03 §10 table | pointer: file f item 233 |
| V03-0463 | 10 | bcr | bcr-pointer | V03 §10 table | pointer: file f item 234 |
| V03-0464 | 10 | bcr | bcr-pointer | V03 §10 table | pointer: file f item 483 |
| V03-0465 | 10 | bcr | bcr-pointer | V03 §10 table | pointer: file f item 235 |
| V03-0466 | 10 | bcr | bcr-pointer | V03 §10 table | pointer: file f item 353 |
| V03-0467 | 10 | bcr | bcr-pointer | V03 §10 table | pointer: file f item 236 |
| V03-0468 | 10 | bcr | bcr-pointer | V03 §10 table | pointer: file f item 451 |
| V03-0469 | 10 | bcr | bcr-pointer | V03 §10 table | pointer: file f item 237 |
| V03-0470 | 10 | bcr | bcr-pointer | V03 §10 table | pointer: file f item 238 |
| V03-0471 | 10 | bcr | bcr-pointer | V03 §10 table | pointer: file f item 239 |
| V03-0472 | 10 | bcr | bcr-pointer | V03 §10 table | pointer: file f item 262 |
| V03-0473 | 10 | bcr | bcr-pointer | V03 §10 table | pointer: file f item 324 |
| V03-0474 | 10 | bcr | bcr-pointer | V03 §10 table | pointer: file f item 354 |
| V03-0475 | 10 | bcr | bcr-pointer | V03 §10 table | pointer: file f item 240 |
| V03-0476 | 10 | bcr | bcr-pointer | V03 §10 table | pointer: file f item 241 |
| V03-0477 | 10 | bcr | bcr-pointer | V03 §10 table | pointer: file f item 242 |
| V03-0478 | 10 | bcr | bcr-pointer | V03 §10 table | pointer: file f item 263 |
| V03-0479 | 10 | bcr | bcr-pointer | V03 §10 table | pointer: file f item 346, 347 |
| V03-0480 | 10 | bcr | bcr-pointer | V03 §10 table | pointer: file f item 567 |
| V03-0481 | 10 | bcr | bcr-pointer | V03 §10 table | pointer: file f item 505 |
| V03-0482 | 10 | bcr | bcr-pointer | V03 §10 table | pointer: file f item 578 |
| V03-0483 | 10 | bcr | bcr-pointer | V03 §10 table | pointer: file f item 585 |
| V03-0484 | 11 | owner-question | answer-J121-J122 | V03 §11 | answered: yes (J122) |
| V03-0485 | 12 | rule | home | V03 §12 | compacted: status kept, round records to the validation files |
| V03-0486 | 13 | handoff | handoff | V03 §13 hand-off table | closed at destination |
| V03-0487 | 13 | handoff | handoff | V03 §13 hand-off table | closed at destination |
| V03-0488 | 13 | handoff | handoff | V03 §13 hand-off table | closed at destination |
| V03-0489 | 13 | handoff | handoff | V03 §13 hand-off table | closed at destination |
| V03-0490 | 13 | handoff | handoff | V03 §13 hand-off table | closed at destination |
| V03-0491 | 13 | handoff | handoff | V03 §13 hand-off table | closed at destination |
| V03-0492 | IN | interface | home | V03 §4.6 section providers; V03 §2.3 notes | folded (IN-V03-1; V03-WGAP-1) |
| V03-0493 | IN | rule | home | V03 §4.2 | folded (IN-V03-2) |
| V03-0494 | 3.3 | term | glossary | V03 §3.3 | kept (term at its home) |
| V03-0495 | 3.3 | term | glossary | V03 §3.3 | kept (term at its home) |
| V03-0496 | 3.7.4 | term | glossary | V03 §3.7.4 | kept (term at its home) |
| V03-0497 | 3.7.1 | term | glossary | V03 §3.7.4 *The vault* | moved: defined once (DUP-5) |
| V03-0498 | 3.7.4 | term | glossary | V03 §3.7.4 | kept (term at its home) |
| V03-0499 | 3.7.4 | term | glossary | V03 §3.7.4 | kept (term at its home) |
| V03-0500 | 3.7.4 | term | glossary | V03 §3.7.4 | kept (term at its home) |
| V03-0501 | 3.7.1 | term | glossary | V03 §3.7.1 (`doorRunPoint`, door sides) | kept; unified geometric core (E-29) |
| V03-0502 | 3.7.2 | term | glossary | V03 §3.7.2 (1) | kept; admissibility through `doorRunPoint` (E-29) |
| V03-0503 | 3.3 | term | glossary | V03 §2.3 `PlanReport.notes`; V03 §3.1 step 2 | renamed form: a note, not a warning code (E-28) |
| V03-0504 | 3.4a | term | glossary | V03 §3.4a | kept (term at its home) |
| V03-0505 | 3.3 | term | glossary | V03 §3.3 | kept (term at its home) |
| V03-0506 | 3.6 | term | glossary | V03 §3.6 | kept (term at its home) |
| V03-0507 | 3.6 | term | glossary | V03 §3.6 | kept (term at its home) |
| V03-0508 | 3.7.1 | term | glossary | V03 §3.7.1 | kept (term at its home) |
| V03-0509 | 3.7.2 | term | glossary | V03 §3.7.2 | kept (term at its home) |
| V03-0510 | 2.4 | term | glossary | V03 §2.4 | kept (term at its home) |
| V03-0511 | 3.2 | term | glossary | V03 §3.2 | kept (term at its home) |
| V03-0512 | 3.5 | term | glossary | V03 §3.5 | kept (term at its home) |
| V03-0513 | 3.12 | term | glossary | V03 §3.12 (9) | definition now V04's `gradeFaces` (DEFER-2; J-V3.132) |
