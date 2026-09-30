# Rewrite — design volume V01 (neighbourhoods)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-V01; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/rewrite-V01`, 2026-09-29 → 2026-09-30; resumed under the CONTINUE RULE at §7)
- P1 inputs gathered (canon unit V01, conflicts, f items concerning V01, g routing — no g item 111–113 part routed to V01, hand-offs, edges, inventory): done
- P2 new text §0–§1b: done
- P3 new text §2: done
- P4 new text §3.1–§3.9: done
- P5 new text §3.10–§3.17: done
- P6 new text §3.18 edges: done
- P7 new text §4–§6: done
- P8 new text §7–§8: done
- P9 new text §9–§13 and integration notes: done
- P10 assemble, verify ids and references, sizes: done
- P11 report, result file, LANDED: done

**Source:** `docs/volumes/V01-neighbourhoods.md` (4 454 lines, 93 140 words, md5 85b488b31b264b447837e4ff228d618c).
**Output:** `docs/validation/coherence/new/volumes/V01-neighbourhoods.md` (3 423 lines, 74 571 words, md5 9247b6e1…). Working parts:
`docs/validation/coherence/work/rewrite-V01/parts/` (00-head … 15-tail).

## 1 Sizes and the shrink

| | words |
|---|---|
| before | 93 140 |
| after | 74 571 |
| net change | −18 569 (−19.9 %) |
| new design added (principle (11)'s §3.18 edge catalogue ≈ 3 070; T-V1-55 – T-V1-58 and the W-TEST-01 / edge clauses in §7 ≈ 1 100; wiring and hand-off closures ≈ 350) | ≈ +4 520 |
| gross removed | ≈ 23 085 |

Share of the gross removed, by source: **narration** ≈ 13 050 (56 %: eight stacked banners and two revision notes, the
nine PROGRESS/REVISION/RECONCILIATION ledgers and counterpart logs, §12's per-round reading lists, §13's tallies, the
39 cross-volume notes, `V1C-`/seam/`RV-` provenance and "revised/amended at round n" clauses); **restatement** ≈ 9 450
(41 %: the 46 BCR blocks' quoted base text replaced by §10's pointer table to the applied f items, ≈ 8 840; base and
other-volume facts in the body replaced by references — V11's terrace and crossing values, `character.anchorSigma`'s
value, the clearance classes, II.3's pin decay, §13's family sizes — ≈ 610); **duplicated mechanisms** ≈ 120 (E-24's one
supersession mark, E-29's door helper cited); **verbose prose** ≈ 465 (§7–§9 tightened).

The volume shrinks by less than the 25–40 % band. Irreducible content holds it: §3 (≈ 34 000 words) is the stage's own
mechanisms at build depth — every step, formula, table, fallback rung and constant is V01's (its REFERENCE rows were
already pointers); §9 keeps 101 reasoned decisions whole (≈ 7 700); §7 keeps 58 bars (≈ 6 900); and principle (11)
added ≈ 4 500 words of required new design. Without that addition the shrink is ≈ 24.7 %. No part shrank by more than
half except §10 (−91 %, BCR bodies → pointer rows, every request applied in the base as its f item), §12 (−89 %), §13
(−85 %) and the ledgers (−97 %) — all narration or applied-request text; no rule, value, bar or decision left.

## 2 Elegance rulings applied

**E-24 (UNIFY: one mark for a superseded or amended decision).** Applied in §9: J-V1.7 *Amended by J-V1.40*; J-V1.36
*Superseded in part by J-V1.77*; J-V1.41 *Superseded by J-V1.98*. Equivalence list: ☑ no row dropped (J-V1.1 – J-V1.101
all present); ☑ the governing row keeps the reason (J-V1.98 now carries J-V1.41's reason — item 23, like-with-like for
the D-5 panel; J-V1.77 carries the layer reasons and J-V1.36's own reasons stay on its row; J-V1.40 carries the S10a
order's reasons).

**E-29 (UNIFY: `basementDoor(b)` and `stackAccessDoor(b, a)` over one door helper at V03 §3.7.1).** V01 cites the helper
(V01 §1.2's V03 row, §3.8.2 step 5, J-V1.75, W6) and keeps reading both functions. Equivalence list: ☑ basementDoor's three
ordered rules, its crypt-vault clause from M6-U, null unless access is external — V03's, cited, unchanged; ☑
stackAccessDoor's approach-strip clearance, non-stair wing preference and reported fallback — V03's, cited; ☑ both pure,
draw-free, of eager records, in `@plat/plots` at M3a, read by V01's entrance reserve (V01 §3.8.2 step 5, §3.8.3's digest,
T-V1-26). No other unification was made.

## 3 Conflicts resolved (12)

| conflict | ruling applied | where |
|---|---|---|
| MC-11 | `TypedBoundary`, `FabricStrategyId` (and `BlockKind`, `SquareType`, `SeamRun`) declared in §2.5; V01 cites | V01 §2.1 |
| V01-ICONF-1 | `n = tpl.segMin + ⌊(tpl.segSpan + 1) × u⌋`, `δ` with `2 × tpl.courseDelta`; no literal repeats a cell | V01 §3.4.3 |
| V01-ICONF-2 | `skyDistrictCount`'s formula only in §3.16 (m², × 10 000); §3.10.3 and §3.14 cite it | V01 §3.16 |
| V01-ICONF-3 | E-24 marks on J-V1.41 and J-V1.36 | V01 §9 |
| V01-ICONF-4 / V02-XCONF-1 | the soffit bound is item 244's clearance rule (held `clearanceCm` first, else V11's per class) | V01 §3.17.3 (3); V02 §3.17 (b) cites identically (V02's editor) |
| V01-ICONF-5 | stale stack-door and "whichever lands first" clauses gone with §12/§13 narration | V01 §12, §13 |
| V01-XCONF-1 | the closed cross-volume notes leave §10 | V01 §10 |
| V01-XCONF-2 | one VTT rule at §11.1 (items 447, 448); V01 §5.3 and T-V1-33 cite it | V01 §5.3, §7 |
| V10-XAGREE-2 | the why providers name their pushes by V11's families (`sun`, `nuisance`) | V01 §4.5; T-V1-37 |
| CANON-C03 | §11 a decisions table (Q-V1-1: yes, J122) | V01 §11 |
| CANON-C04 | the INDEX §7 items routed here (S23R6-07, SLR6-04) fixed | V01 §0; V01 §10 |

## 4 Renumberings

* **ID-BCR:** V01's BCR-1 … BCR-46 → BCR-V1-1 … BCR-V1-46 (number kept), each now a §10 row pointing to its applied file f item; in the body every former BCR citation is the f item (`item n`).
* **ID-DR:** DR-V1.1 → DR26 (item 383, J-VI.13), cited by V01 §1b and BCR-V1-29.
* **ID-WX / G-cite:** every volume-internal citation `V1-x.y` → `V01 §x.y` (1 070 in the new text, all resolving to a heading); other volumes' rows cited qualified (`V02 X24`, `J-VI.17 H8`).
* **New ids:** T-V1-55 (lifecycle round trip), T-V1-56 (edge sweep: degenerate geometry, per-mechanism edges, toggles and presets), T-V1-57 (rungs THORP → METROPOLIS cap), T-V1-58 (oasis and map-frame combinations); clauses T-V1-11 (d) (F-DISPATCH) and T-V1-20 (d) (F-UNIT) for W-TEST-01. T ids 1–58 and J ids 1–101 unique; no id outside V01's prefixes minted.
* **Retired terms replaced:** G-lot (0 left), G-refview (T-V1-26 "reference viewport"), G-firstmap, G-stairway ("stair-stepped way"; the row keeps `stepped`), G-standalone ("standalone neighbourhood document"), G-unitinput (`SkyUnitInput`), G-DR, G-geojson (`retaining`, `raisedSupport`).

## 5 Open findings routed here (52) — each closed

| finding | disposition | where |
|---|---|---|
| VOL-V01-V02-RESTATEMENTS-001, V01-RESTATE-1 | FIXED: the V03 and V02 rows cite V03 §3.7.1–§3.7.2 and V02 §2.3 only | V01 §1.2 |
| -002, V01-RESTATE-4 | FIXED: `character.anchorSigma` cited (§4.5) without its value | V01 §3.14; T-V1-48 |
| -003, -004, V01-RESTATE-2, -3 | FIXED: V11's `ways.crossing` and terrace keys cited without values; the narration gone | V01 §3.6 (3), §3.14; J-V1.72 |
| -005, V01-RESTATE-5 | FIXED: V11's `raisedWays.structure` cited without values | V01 §3.17.3 |
| -006, V01-DUP-3 | FIXED: the barrier typing stated once at II.1 (item 541); V01 §3.6 (7), §3.11 (4), §10 cite it | V01 §3.6, §3.11, §10 |
| V01-DUP-1 | FIXED: the underground rows sentence stated at V01 §3.8.2; §1.3 and §2.2 cite | V01 §3.8.2 |
| V01-DUP-2 | FIXED: `street_strip` cites V01 §3.4.3's course law | V01 §3.10.2 |
| V01-DUP-4 | FIXED: `fabric.select`'s key rule in V01 §3.12; §2.8 and §3.3.4 cite | V01 §3.12 |
| V01-DUP-5 | FIXED: `terraceState` defined in V01 §2.3; §3.17.1 (1) cites | V01 §2.3 |
| V01-ICONF-1 … -5, V01-XCONF-1, -2 | FIXED as ruled (§3 above) | — |
| V01-WGAP-1 | FIXED: the skeleton export row carries a quarter's `terrace` and `setAttr` of `terrace` | V01 §5.3; T-V1-33 |
| V01-MISSING-1, V01-DEFER-3 | FIXED: Q-V1-1 answered yes (J122); risk 6 cites it | V01 §11, §8.4 |
| V01-TERM-1, -2, -3 | FIXED: `V01 §x.y` form; "stair-stepped way" vs the `stepped` row; "standalone neighbourhood document" | throughout |
| V01-DEFER-1 | FIXED: `Sample` declared beside `Seam` by item 540 (M1), cited without condition | V01 §1.2; BCR-V1-28 |
| V01-DEFER-2 | FIXED: the terminal rule stated as decided (J-VI.9) | V01 §3.17.8 |
| V01-DEFER-4 | FIXED: V04 §4.3's switch row covers any change, inside (0, 1] the ground-edit row; V01 cites | V01 §3.15; J-V1.101 |
| V01-NARR-1 … -6 | FIXED: one marker line; ledgers, revision notes, round narration, BCR process clauses, the 39 notes and the per-round evidence removed; IN-V01-4/-5/-6/-9 folded | throughout |
| V01-BREF-1 | FIXED: the clerk content cited as V01 §4.5 | V01 §1b, §4 |
| V01-HANDOFF-1 | FIXED: DR26 | V01 §1b; BCR-V1-29 |
| V01-HANDOFF-2 | FIXED: §16 computes the totals once (item 568); V01 states its own line and cites | V01 §8.2; J-V1.26 |
| S23R6-07 | FIXED: §0 names the annex temple's way into its crypt (V03 §3.7.4) | V01 §0 |
| SLR6-04 | FIXED: notes (36) and (39) leave (closed: item 313 names all four parts; V04 §4.3 ruled by DEFER-4) | V01 §10 |
| IN-V01-1 … IN-V01-9 | FIXED: folded at their homes; the Integration notes table keeps each with its location | V01 Integration notes |

## 6 Hand-offs closed here (15)

| hand-off | closed at |
|---|---|
| V02:X14 | V01 §7's parity-sheet sentence and §5.1.1–§5.1.2 |
| V02:X24 | V01 §5.1.2 (stair flights by `stairTreads`) and §5.1.3 (stack order, tier shadows) |
| V02:X31 | V01 §5.1.2 reads `stairTreads`; V01 §3.17.3 (2), §3.17.4 as written |
| V06:X11 | V01 §3.3.6 (`hood.fabric` at `afterGrowth` order 40; the supply term at every epoch allocation) |
| V06:X16 | V01 §3.3.6 (3) (opened close-ups a part in `scope.raised` crosses), V01 §3.17.1, `raised.stripMarginM` (V01 §3.14) |
| V06:X28 | V01 §3.3.6 (2)–(3) (`EpochScope.recut`; fabric and hood pins only under a new strip; J-V1.79) |
| V06:X40 | met (V06 §3.2's `sky.islands` row runs V01 §3.10.3 (6) (a)); confirmed |
| V06:X45 | met (V06 §3.4 (9)); V01 §3.7.3 cites it |
| V10:CVR-V10-6 | V01 §4.5 names pushes by V11's families (V10-XAGREE-2) |
| V10:CVR-V10-13 | V01 §3.17.1: the second fixture's ravine quarter declares `fabric: 'stepped'` and `terrace: 'on'` by name |
| V11:X-V11-8 | V01 §2.3 `WayNamingContext.raised`; V01 §2.3's `walls` reads V11's share (percent = 100 × share) |
| V11:X-V11-15 | closed-stated; V01's row-set cells as V11 states them (no V01 text change) |
| V11:X-V11-16 | V01 §3.15's resolution and `hood.constants` as the one `settings` row (V01 §2.2, §3.14) — as V11 adopts it |
| V12:X-V12-16 | V01 §8.1's register clause (every exit; default line) |
| V12:X-V12-17 | V01 §8.1: history rows by V12 §3.11's *A value moved by its owning seat before its due*; J-V1.97 |

## 7 Wiring gaps, edges and g items

* **W-DOS-10a:** V01 §1b's dossier trace rows cite DR30 and DR32 by number (item 383). **W-IF-03:** V01 §4.5 names its three providers (terrace, ward-edge wall, under-deck strip) as the one provider per kind V10 §3.9 lists. **W-TEST-01:** V01 §3.13's "tested by" column; T-V1-11 (d), T-V1-20 (d); BCR-V1-18 → item 327 carries the column. **V01-WGAP-1:** §5.3's skeleton row.
* **Edges (133 UNDEFINED, 99 UNTESTED, 15 combinations):** V01 §3.18 — (a) degenerate geometry, (b) every rung, (c) every toggle and preset, (d) the lifecycle, (e) 40 mechanism rows each with outcome, rung and test, (f) the 15 owned combinations (C-cliff-hood … C-terraced-ward-saveload) each with outcome and test; tests T-V1-55 – T-V1-58 added.
* **g items 111–113:** the canon routes no part to V01 (items 111's oasis combinations are defined in V01 §3.18 (f) and T-V1-58 as V01's edge work, citing item 111).
* **File f items concerning V01 (68):** cited as base text by item number throughout; none restated.

## 8 CROSS-PART NOTES

1. **Base, pipeline (§4.9, item 313):** the court-greening row reads its per-band probabilities from V01 §3.5.7 (the base row says "the band's probability" and cites V01 §3.5.7); V01 keeps the values as their one home — the base must not restate them.
2. **Base, pipeline (II.3):** the pin decay (a picked kind's weight ÷ 10 per block) is II.3's; V01 §3.8.2 now cites it with `pin.decayScope`'s scope only.
3. **Canon, BCR list:** BCR-V1-29 lands with items 383 (the DR26 number) and 384 (the row); BCR-V1-6 is co-applied after item 208 and BCR-V1-41 with item 212 on the same records (file f's order notes) — V01 §10 cites 383, 384.
4. **V02 (V02-XCONF-1):** V02 §3.17 (b) cites item 244's clearance rule exactly as V01 §3.17.3 (3) does (held `clearanceCm` first, else V11's per class).
5. **V03 (E-29):** V01 cites V03 §3.7.1's door helper beside `basementDoor(b)` and `stackAccessDoor(b, a)`; the helper's statement is V03's.
6. **V04 (V01-DEFER-4):** V04 §4.3's switch row reads "any change of the resolved `fabric.extensionWeight`; inside (0, 1] the re-cut plots take the ground-edit row" — V01 §3.15 and J-V1.101 cite that reading.
7. **V09 and rendering (V01-XCONF-2):** §11.1 holds the one VTT rule (items 447, 448: retaining walls by `vtt.retainingMinCm`, broken over stairs and ramps; raised supports as cliffs); V09's BCR-V9-31 (c) text cites §11.1.
8. **V10 (V10-XAGREE-2, W-IF-03):** V10 §2.13 drops its family translation note; V10 §3.9's owed table lists V01 §4.5's terrace, ward-edge wall and under-deck strip providers as V01's.
9. **Scope / INDEX:** V01 §8's slot and price agree with §16's M5 row (27.25–36.25 pw; after M4 beside the village, M6-E and P0/P1/P3) and INDEX §4; INDEX §6 marks Q-V1-1 "yes (J122)" as V01 §11 does.
10. **Determinism (§7.5):** T-V1-55 exercises §7.5's table-row migration (a `fabric` row id no table holds reads `bent-cut`, reported) — the migration row is §7.5's.
11. **Assemble seat:** the volume's one marker line (line 3) replaces the eight stacked banners; the Integration notes section is kept as a table of where each note now lives.

## 9 MAPPING TABLE — every inventory id of V01 → where it now lives

`V01 §x` = kept at that section of the new volume with the same meaning (reworded where narration or restatement was cut);
REFERENCE = replaced by a pointer to its home; HISTORY OUT = to the validation records.

| id | kind | old § | statement (abridged) | now |
|---|---|---|---|---|
| V01-0001 | summary | 0 | Plain words: clicking a district opens a close-up neighbourhood drawn in the hatched famil… | V01 §0 |
| V01-0002 | summary | 0 | Plain words: each district chooses its fabric at generation from what it will hold and whe… | V01 §0 |
| V01-0003 | summary | 0 | Plain words: a lone (standalone) neighbourhood from the start screen: shape (or drawn), si… | V01 §0 |
| V01-0004 | summary | 0 | Plain words (file g): shade lowers grand-square/rings odds and sends great houses to sunni… | V01 §0 |
| V01-0005 | summary | 0 | Plain words (item 110): terraced quarters (streets along slope a double row apart, stairs … | V01 §0 |
| V01-0006 | summary | 0 | Plain words (look): hatched family can draw the whole town: city zoom simple masses on war… | V01 §0 |
| V01-0007 | scope | 1.1 | Builds the fabric machine: FabricStrategy registrations for four NG templates (area = base… | V01 §1.1 |
| V01-0008 | scope | 1.1 | Builds S7c fabric selection: eager town-wide rule giving each district its fabric from con… | V01 §1.1 |
| V01-0009 | scope | 1.1 | Builds S9b block dispatch: eager step typing every built block ordinary/manor/square/green… | V01 §1.1 |
| V01-0010 | scope | 1.1 | Builds context features (stage-2 feature S2 coverage matrix): waterfront, wall-side, slopi… | V01 §1.1 |
| V01-0011 | scope | 1.1 | Builds local identities: HoodPlace (squares, greens, yards, courts), the way-naming contex… | V01 §1.1 |
| V01-0012 | scope | 1.1 | Builds the close-up: refine derivation (neighbourhood-tier pins, hood title), trigger, cac… | V01 §1.1 |
| V01-0013 | scope | 1.1 | Builds the unit run: generation path for a close-up with no base under it (standalone neig… | V01 §1.1 |
| V01-0014 | scope | 1.1 | Builds seams on top of II.1: template portals, ring-radial stagger, dispatch seam guard, S… | V01 §1.1 |
| V01-0015 | scope | 1.1 | S7c runs inside S7b (1) between the greedy pass and its reconcile; the reconcile moves hou… | V01 §1.1 |
| V01-0016 | scope | 1.1 | File g neighbourhood parts: item 102 shade (context, weights, manor siting, pins); item 10… | V01 §1.1 |
| V01-0017 | scope | 1.1 | Builds the NG preset (zeroing parity preset selecting NG's own rules; BCR-46; item 23) and… | V01 §1.1 |
| V01-0018 | scope | 1.1 | Item 110 neighbourhood parts: terrace state and stepped row's contour series with ravine t… | V01 §1.1 |
| V01-0019 | hook | 1.2 | Consumes II.1 Seam, SeamEdge, Portal, SeamAmendment, SeamContract, NeighbourhoodRequest/Re… | V01 §1.2 |
| V01-0020 | hook | 1.2 | Consumes II.2 template rows, RingFabric ring courses (item 58 (a)), template road widths; … | V01 §1.2 |
| V01-0021 | hook | 1.2 | Consumes II.3 dispatch idea, pin gate with weight decay (item 58 (c)), local identities, c… | V01 §1.2 |
| V01-0022 | hook | 1.2 | Consumes II.4 persistence (LC-18, J-P23), workflow, elaboration by click (item 28).… | V01 §1.2 |
| V01-0023 | hook | 1.2 | Consumes II.5 stage-2 readiness and M5 exit (V1-7 tests extend them); II.6 sky call, SkySt… | V01 §1.2 |
| V01-0024 | hook | 1.2 | Consumes Way (surface), District (fabric, fabricParams, identity), Block, Plot, Allocation… | V01 §1.2 |
| V01-0025 | hook | 1.2 | Consumes elaboration record's closeup rung, elaboration cache, closeups digest block.… | V01 §1.2 |
| V01-0026 | hook | 1.2 | Consumes stage graph, laziness contract, pool and hinterland unit, elaboration by click; S… | V01 §1.2 |
| V01-0027 | hook | 1.2 | Consumes S1 (2) closed-outline routine and outline templates, S1 (5) crossing sites/spans … | V01 §1.2 |
| V01-0028 | hook | 1.2 | Consumes grower, typing, fields, FieldBands, S7b, item 72 character, identities, band rang… | V01 §1.2 |
| V01-0029 | hook | 1.2 | Consumes the bent cut (steps 1-11), holed laws, slit, portal gap, ladder, strategy slot; e… | V01 §1.2 |
| V01-0030 | hook | 1.2 | Consumes S9, S10a, S10 (0)-(10), S10b, S11; S10a reads Block.content; S10 (7) joins a mano… | V01 §1.2 |
| V01-0031 | hook | 1.2 | Consumes greenery rule table and S12b: court-greening row (BCR-10); green blocks are S12b'… | V01 §1.2 |
| V01-0032 | hook | 1.2 | Consumes streams, concerns, lineage, anchor rule, successions: three new concerns; success… | V01 §1.2 |
| V01-0033 | hook | 1.2 | Consumes events, the twelve tools, dry run, locality, lifecycle table, editable tables, pa… | V01 §1.2 |
| V01-0034 | hook | 1.2 | Consumes display list, hatched family, programs, states, crowns, neighbourhood band (hatch… | V01 §1.2 |
| V01-0035 | hook | 1.2 | Consumes neighbourhood-band open bound, scoped regeneration law, elaboration cache (budget… | V01 §1.2 |
| V01-0036 | hook | 1.2 | Consumes shade(x) (field pass 1 terrain and walls; pass 2 V05 islandShadeStrip) and sunlit… | V01 §1.2 |
| V01-0037 | hook | 1.2 | Consumes SitingProfile (emits, sensitive, coverage), RelationFamilyRow, CoverageSpec.unit:… | V01 §1.2 |
| V01-0038 | hook | 1.2 | Consumes active chains, S7b (1) district supply term, allocation-level links (χ̃ (5) c, Di… | V01 §1.2 |
| V01-0039 | hook | 1.2 | Consumes AccessPoint (kinds of f item 554; V04 source, role, cause.system), UndergroundSys… | V01 §1.2 |
| V01-0040 | hook | 1.2 | Consumes V05 SkyHandover (land, rim strip, claims, landings, field, district kind, fabric … | V01 §1.2 |
| V01-0041 | hook | 1.2 | Consumes V06 §2.1 EpochParticipant (hood.fabric at afterGrowth); V10 §2.13 WhyProvider/Why… | V01 §1.2 |
| V01-0042 | hook | 1.2 | Consumes item 110 base side (RetainingWall with S10-S11 levelling and district-edge source… | V01 §1.2 |
| V01-0043 | hook | 1.2 | Consumes V02 wings' canonical order by key, PorchKindRow (widthM, depthM, outside; composi… | V01 §1.2 |
| V01-0044 | hook | 1.2 | Consumes file f items 245 (RetainingWall source values), 447 (item-110 GeoJSON names), 539… | V01 §1.2 |
| V01-0045 | scope-out | 1.3 | Stage-3 compositions and plans (wings, rooms, plan rungs beyond stored wings) are volumes … | V01 §1.3 |
| V01-0046 | scope-out | 1.3 | Sky-island existence, count, supply, size, altitude, placement, terrain echo, shadows and … | V01 §1.3 |
| V01-0047 | scope-out | 1.3 | Underground content (sewer-front and undercity rows, systems, access chances, catacomb gro… | V01 §1.3 |
| V01-0048 | scope-out | 1.3 | Siting rulebook rows are V11; the placement solver is the base (§4.7 S10a-S10b as g items … | V01 §1.3 |
| V01-0049 | scope-out | 1.3 | Epochs re-running S7c/S9b and dispatch under decline are V06 (this volume registers hood.f… | V01 §1.3 |
| V01-0050 | wiring | 1b | Provisional character χ̃(D) plugs into §4.5 (2)'s character function.… | V01 §1b |
| V01-0051 | wiring | 1b | S7c fabric selection plugs into §4.5 S7b (1) between greedy pass and reconcile, and §4.5 t… | V01 §1b |
| V01-0052 | wiring | 1b | templateLandM2(D,row) plugs into §4.5 S7b (1) (BCR-4 (b)).… | V01 §1b |
| V01-0053 | wiring | 1b | DistrictContext plugs into §14 FabricStrategy signature (BCR-1); shade.islandShare and und… | V01 §1b |
| V01-0054 | wiring | 1b | TypedBoundary view plugs into §2.5 District.boundary (BCR-5).… | V01 §1b |
| V01-0055 | wiring | 1b | DistrictSignature is a derived view with no base hook.… | V01 §1b |
| V01-0056 | wiring | 1b | Template face plugs into §4.6 'The strategy slot' (BCR-7).… | V01 §1b |
| V01-0057 | wiring | 1b | Seed primitives (spine, ring, plaza, fan) plug into §3.4 kernel ops (insertChain, splitThr… | V01 §1b |
| V01-0058 | wiring | 1b | TemplateRow table hood.templates plugs into §7.6 editable tables.… | V01 §1b |
| V01-0059 | wiring | 1b | S9b block dispatch plugs into §4.7 S10a between steps (i) and (ii) (BCR-3, BCR-9) and §2.5… | V01 §1b |
| V01-0060 | wiring | 1b | squares.quota plugs into §4.7 S9 and §4.5 S7b (3) (BCR-32).… | V01 §1b |
| V01-0061 | wiring | 1b | Block.content plugs into §4.7 S10a (BCR-9) and §8.5 (1) figure-ground (BCR-15).… | V01 §1b |
| V01-0062 | wiring | 1b | Dispatch land in the programme plugs into §4.2 S2 and §4.5 S7b (1) (BCR-8).… | V01 §1b |
| V01-0063 | wiring | 1b | Court greening row plugs into §4.9 table (BCR-10).… | V01 §1b |
| V01-0064 | wiring | 1b | Context features plug into §4.6 S8, §4.7 S10 (6), §8.2 programs.… | V01 §1b |
| V01-0065 | wiring | 1b | Way-surface rule plugs into §2.4 Way.surface (BCR-6) and §7.3 item 1's seam exception (BCR… | V01 §1b |
| V01-0066 | wiring | 1b | Way-naming context plugs into §10.4 naming engine (BCR-16).… | V01 §1b |
| V01-0067 | wiring | 1b | District naming features plug into §10.4 (BCR-16).… | V01 §1b |
| V01-0068 | wiring | 1b | HoodPlace plugs into §2.7 records and §9.1 label kinds (BCR-6, BCR-17).… | V01 §1b |
| V01-0069 | wiring | 1b | Ground AccessPoint symbols plug into §8.1 marks and §9.2 admission table; a building-hoste… | V01 §1b |
| V01-0070 | wiring | 1b | HoodPin (derived) plugs into §8.1 marks and §8.10 instance overrides (BCR-34).… | V01 §1b |
| V01-0071 | wiring | 1b | CloseupParams, CloseupRecord plug into §7.1 closeup event (BCR-12) and §2.9/§6.2 closeups … | V01 §1b |
| V01-0072 | wiring | 1b | Block.overrides plugs into §2.7 uniform overrides field and §8.10 (BCR-34).… | V01 §1b |
| V01-0073 | wiring | 1b | Close-up elaboration record plugs into §2.8, §4.1, §8.5 change markers.… | V01 §1b |
| V01-0074 | wiring | 1b | Outline close-up plugs into §4.1 elaboration by click and §9.5 framing rule.… | V01 §1b |
| V01-0075 | wiring | 1b | Catacomb source protection plugs into §7.2 fixed inputs.… | V01 §1b |
| V01-0076 | wiring | 1b | blockLifted notice plugs into the event's fate report (§7.1).… | V01 §1b |
| V01-0077 | wiring | 1b | catchmentOf, districtsAbove, fabricSignature plug into §4.7 S10b coverage term (g 103 (f))… | V01 §1b |
| V01-0078 | wiring | 1b | skyDistrictCount plugs into II.6 (<= 3 districts per island).… | V01 §1b |
| V01-0079 | wiring | 1b | Hood title plugs into §9.5 title rule.… | V01 §1b |
| V01-0080 | wiring | 1b | Unit run plugs into §4.1 units (BCR-3) and II.1 (5) (BCR-2 (a),(e)).… | V01 §1b |
| V01-0081 | wiring | 1b | plantRimWalk(doc,island) is called by the unit run after its districts' S12b and by V05's … | V01 §1b |
| V01-0082 | wiring | 1b | Entrance reserve plugs into §2.6 Entrance and Basements, V02 §3.7, V03 §3.7.1, 3.7.2 (1).… | V01 §1b |
| V01-0083 | wiring | 1b | Island crossing-site spans plug into §4.2 S1 (5) as BCR-45 extends it to the sky unit run,… | V01 §1b |
| V01-0084 | wiring | 1b | Ground landing's destination lane plugs into §4.6 (BCR-V5-20).… | V01 §1b |
| V01-0085 | wiring | 1b | HoodRecipe plugs into §2.9 Recipe (BCR-12).… | V01 §1b |
| V01-0086 | wiring | 1b | Hood's void part plugs into §4.5 S7b (6) (d) (V04 BCR-19).… | V01 §1b |
| V01-0087 | wiring | 1b | HoodKindRow table hood.kinds plugs into §7.6.… | V01 §1b |
| V01-0088 | wiring | 1b | Outline rows star, ring_star, spindle_street, plaza_rect, plaza_star plug into §4.2 S1 (2)… | V01 §1b |
| V01-0089 | wiring | 1b | hood.constants (one settings row in V11 settings form, each key a column with its ColumnSp… | V01 §1b |
| V01-0090 | wiring | 1b | NG preset entries on hood.constants (stage-2 switch fabric.extensionWeight, eight ng.* swi… | V01 §1b |
| V01-0091 | wiring | 1b | Stage-2 switch's edit (editTable/editPreset changing resolved fabric.extensionWeight) plug… | V01 §1b |
| V01-0092 | wiring | 1b | Calibration register entries of this volume's cells plug into V12 §2.6 CalibrationEntry an… | V01 §1b |
| V01-0093 | wiring | 1b | SeamReport fields plug into II.1.… | V01 §1b |
| V01-0094 | wiring | 1b | Hatched family rows plug into §8.2 (BCR-14).… | V01 §1b |
| V01-0095 | wiring | 1b | F-TEMPLATE, F-DISPATCH, F-UNIT plug into §5.2 (BCR-18).… | V01 §1b |
| V01-0096 | wiring | 1b | Concerns fabric.select, hood.dispatch, hood.template plug into §6.1 (BCR-11).… | V01 §1b |
| V01-0097 | wiring | 1b | hood.fabric epoch participant plugs into V06 §2.1 EpochParticipant registered in §4.12 Str… | V01 §1b |
| V01-0098 | wiring | 1b | WhyProviders for fabric, content, square type, places, hood pins plug into V10 §2.13 (BCR-… | V01 §1b |
| V01-0099 | wiring | 1b | T1 product, T6 furniture stamp, T8 fabric, T12 pinGate parameters plug into §7.1 toolkit (… | V01 §1b |
| V01-0100 | wiring | 1b | Stage-2 budgets plug into §12.4-§12.6 (BCR-19).… | V01 §1b |
| V01-0101 | wiring | 1b | terraceState(D) = DistrictContext.terrace plugs into §4.2 S0, S1, §4.7 S10 (BCR-42), §2.5 … | V01 §1b |
| V01-0102 | wiring | 1b | District.terrace plugs into §2.5 (BCR-41).… | V01 §1b |
| V01-0103 | wiring | 1b | Contour series and thalweg path plug into §4.6 strategy slot (BCR-7) and §4.2 S1.… | V01 §1b |
| V01-0104 | wiring | 1b | TemplateFabric.levelledUnits, terracedEdges plug into §14 FabricStrategy (BCR-V7-34).… | V01 §1b |
| V01-0105 | wiring | 1b | stepProfile(wall) (derived) plugs into §2.7 (BCR-43).… | V01 §1b |
| V01-0106 | wiring | 1b | Held walls plug into §7.2 fixed inputs.… | V01 §1b |
| V01-0107 | wiring | 1b | Under-deck strip plugs into §4.5 S7b (1) and §4.6 holed laws.… | V01 §1b |
| V01-0108 | wiring | 1b | Arena parts per reader is a rule table (no base hook).… | V01 §1b |
| V01-0109 | wiring | 1b | Deck-plot ownership plugs into §4.7 deck row (g 110 (d)).… | V01 §1b |
| V01-0110 | wiring | 1b | way.stair, ramp hairlines, retaining, raised programs plug into §8.2 (BCR-14).… | V01 §1b |
| V01-0111 | wiring | 1b | Per-facet hatch and stack order with tier shadows plug into §8.2 (BCR-14), §8.6 (BCR-V2-15… | V01 §1b |
| V01-0112 | wiring | 1b | Precinct rings plug into §4.6.… | V01 §1b |
| V01-0113 | wiring | 1b | HoodRecipe.edges.slope plugs into §2.9 Recipe (BCR-12).… | V01 §1b |
| V01-0114 | wiring | 1b | Item-110 export rows plug into §11.1 (BCR-40).… | V01 §1b |
| V01-0115 | wiring | 1b | Three why providers (terrace, ward-edge wall, under-deck strip) plug into V10 §2.13.… | V01 §1b |
| V01-0116 | wiring | 1b | Terminal-as-centrepiece rule plugs into §4.7 S11.… | V01 §1b |
| V01-0117 | dossier | 1b | χ̃ lot mix and S9b forecourt/landmark siting read institutions[] (kind, count, districtSca… | V01 §1b |
| V01-0118 | dossier | 1b | χ̃ political alignment and economic role read powers[] (standing, governing, controlled), … | V01 §1b |
| V01-0119 | dossier | 1b | S7c kind factors and provisional identity read quarters[], district-scale records, ladder … | V01 §1b |
| V01-0120 | dossier | 1b | Dispatch fixed inputs and panel members read ladder COUNT/QUARTER/GUILD/SIZE records with … | V01 §1b |
| V01-0121 | dossier | 1b | χ̃ (5) c and DistrictContext.chains read activeChains[] (processors, outputs, upstreamChai… | V01 §1b |
| V01-0122 | dossier | 1b | Every band read (S7c, S9b, surfaces, hood pins) reads wealth.label via DR6 into intent.wea… | V01 §1b |
| V01-0123 | dossier | 1b | Shade terms read site latitude (cell.latDeg, site.culture) via DR-V8.1 through item 102's … | V01 §1b |
| V01-0124 | dossier | 1b | Waterfront and wall-side context read site.terrain, site.access, water deposits, walls.rec… | V01 §1b |
| V01-0125 | dossier | 1b | Openings, dug accesses, ruin entrances read resources (ancient_ruins, mining deposits), ma… | V01 §1b |
| V01-0126 | dossier | 1b | Catacomb entrances and protection read church records and ranges, Cemetery network (METROP… | V01 §1b |
| V01-0127 | dossier | 1b | Place names and claimed quarter names read quarters[].name, landmarks, dossier names via D… | V01 §1b |
| V01-0128 | dossier | 1b | A place's knowledge reads facets and covert impairments via DR20 (extended by BCR-29); a c… | V01 §1b |
| V01-0129 | dossier | 1b | Layout and block content: no dossier field names a fabric or block content; new DR-V1.1 (B… | V01 §1b |
| V01-0130 | dossier | 1b | Terraced ward reads site.terrain only via DR1 (S0 relief class to V11 terracedEdges to ter… | V01 §1b |
| V01-0131 | rule | 2 | Records live in @plat/model and @plat/tables, stage-2 code in @plat/hood; units follow §2.… | V01 §2: pointer to model §2.1 (REFERENCE; the fact at its home) |
| V01-0132 | type | 2.1 | FabricStrategyId = row key of hood.templates: bent-cut (NG's area; the base's own), street… | V01 §2.1 |
| V01-0133 | type | 2.1 | OutlineTemplateId = star, star_round, street_strip, plaza_frame, disc, d_shape, lozenge, c… | V01 §2.1: pointer to pipeline §4.2 (REFERENCE; the fact at its home) |
| V01-0134 | type | 2.1 | BlockKind = ordinary, manor, square, green, yard (the dispatch's output).… | V01 §2.1 |
| V01-0135 | type | 2.1 | SquareType = forecourt, crossroads, bridgehead, trading, well, plain; trading = a small op… | V01 §2.1 |
| V01-0136 | type | 2.1 | HoodSite = court, plotYard, yardBlock, square, green, cemetery, fieldEdge, outsideYard (ho… | V01 §2.1 |
| V01-0137 | rule | 2.2 | Every hood.* table and squares.quota carries §7.6 per-preset cells (default, MFCG and FTG … | V01 §2.2 |
| V01-0138 | rule | 2.2 | A row or column marked extension has switch cells (chances, gates, weights, gains, quotas,… | V01 §2.2 |
| V01-0139 | record | 2.2 | TemplateRow (hood.templates): id, label (card names Organic, Main street, Square, Rings, Q… | V01 §2.2 |
| V01-0140 | interface | 2.2 | templateLandM2(D,row): built land m² the row's seeds take from D, a pure function of the r… | V01 §2.2 |
| V01-0141 | type | 2.2 | SeedSpec union: spine {from Anchor, to Anchor or parallel water/wall/contour with offset o… | V01 §2.2 |
| V01-0142 | type | 2.2 | Anchor = portal:best, portal:gate, portal:bridge, pair:1, pair:2 (crossroads' two crossing… | V01 §2.2 |
| V01-0143 | type | 2.2 | TemplateRequirement: minFaceAreaM2Law ring/plaza/spine/none; portals? (usable on template … | V01 §2.2 |
| V01-0144 | type | 2.2 | CharacterTerm {of mix/sectors/trade/mainRoad/identity/shade/chain, key?, gain}: factor (1 … | V01 §2.2 |
| V01-0145 | record | 2.2 | squares.quota is a BASE table (BCR-32), the one square quota: SquareQuotaRow {band, haPer1… | V01 §2.2: pointer to §4.7 S9 (item 301) (REFERENCE; the fact at its home) |
| V01-0146 | record | 2.2 | DispatchRow (hood.dispatch, one row per band of §4.5's band set; missing band interpolates… | V01 §2.2 |
| V01-0147 | record | 2.2 | SquareRow (hood.squares, one per SquareType): m2PerInhabitant (S4 (d)'s fallback rescales … | V01 §2.2 |
| V01-0148 | record | 2.2 | HoodPinRow (hood.pins, arena-keyed; underground rows V04's which ships none, so an undergr… | V01 §2.2 |
| V01-0149 | record | 2.2 | hood.placeKnowledge rows {kind, subtype?, knownTo public/local/secret}; hood.defaultCuts p… | V01 §2.2 |
| V01-0150 | record | 2.2 | hood.constants: ONE row key 'settings' in V11's settings form; each V1-3.14 key a column (… | V01 §2.2 |
| V01-0151 | record | 2.2 | way.surface table: SurfaceRow {wayClass, era?, band, surface}.… | V01 §2.2 |
| V01-0152 | record | 2.2 | District.terrace?: on/off, a declared terracing (T8 chip, skeleton quarter terrace BCR-44,… | V01 §2.2: pointer to model §2.5 (REFERENCE; the fact at its home) |
| V01-0153 | record | 2.2 | Block fields added: content BlockKind (S9b; 'ordinary' in every pre-M5 document by §7.5 mi… | V01 §2.2: pointer to model §2.5 (REFERENCE; the fact at its home) |
| V01-0154 | record | 2.2 | HoodPlace (new §2.7 record): id, kind square/green/yard/court/opening, subtype? (opening o… | V01 §2.2: pointer to model §2.7 (REFERENCE; the fact at its home) |
| V01-0155 | rule | 2.2 | Reservation.kind plaza gains producing stage S8 for a template plaza: a carved plaza is a … | V01 §2.2: pointer to model §2.5 (REFERENCE; the fact at its home) |
| V01-0156 | record | 2.3 | SeamRun {seam, edge, type, hard, lengthCm, portals, walled? full/parapet (wall run's Chain… | V01 §2.3 |
| V01-0157 | record | 2.3 | DistrictContext (the one context every stage-2 rule reads; assembled by @plat/hood from co… | V01 §2.3 |
| V01-0158 | record | 2.3 | DistrictContext.portals: {id, class, at, bearingCdeg, kind way/gate/bridge/landing, onTemp… | V01 §2.3 |
| V01-0159 | record | 2.3 | DistrictContext.water {lengthM, share, bodies sea/river/lake/canal/harbour, quayWay}; wall… | V01 §2.3 |
| V01-0160 | record | 2.3 | DistrictContext.shade {meanShare: area-weighted mean of item 102 shade(x) from terrain and… | V01 §2.3 |
| V01-0161 | record | 2.3 | DistrictContext.landmarks [{reservation, cls, sigma (§4.5 (1)), centroid, guild?}]; record… | V01 §2.3 |
| V01-0162 | record | 2.3 | TerraceState = terraceState(D), pure, draw-free, in @plat/model, lands at M3a: asks (D.ter… | V01 §2.3 |
| V01-0163 | record | 2.3 | DistrictSignature (derived, each component in [0,1], standardised over B-CITY by T-V1-5): … | V01 §2.3 |
| V01-0164 | record | 2.3 | FabricSignature (town side of V12's paired measures over a region; V12 §3.4 definitions ci… | V01 §2.3: pointer to V12 §3.4 (REFERENCE; the fact at its home) |
| V01-0165 | interface | 2.3 | @plat/hood services, pure and draw-free: catchmentOf(plot, unit CoverageSpec.unit or neigh… | V01 §2.3 |
| V01-0166 | record | 2.3 | HoodPin (derived by refine close-up, never stored; overrides are Block.overrides): host (b… | V01 §2.3 |
| V01-0167 | record | 2.3 | WayNamingContext (derived at S13a): cls, lengthM, shape straight/bent/curved/ring/stepped,… | V01 §2.3 |
| V01-0168 | interface | 2.3 | stepProfile(wall) -> [{atCm, stepCm}]: a RetainingWall's step along its chain, derived on … | V01 §2.3 |
| V01-0169 | rule | 2.3 | Arena parts per reader (g 110 (b); J-V1.66): raised decks sit in ground arena part >= 1; e… | V01 §2.3 |
| V01-0170 | table | 2.3 | Arena-parts table rows: χ̃ frontage/mainRoad/trade, alongWay, chain term: part 0 yes, rais… | V01 §2.3 |
| V01-0171 | rule | 2.3 | Raised decks carry no deck plots (V02 J-V2.71): item 110 (d)'s plots stand on part-0 decks… | V01 §2.3: pointer to V02 V02 §3.16 (REFERENCE; the fact at its home) |
| V01-0172 | record | 2.4 | NeighbourhoodRequest (II.1 revised): district, key PlatKey, layer ground/sky/underground, … | V01 §2.4: pointer to pipeline II.1 (REFERENCE; the fact at its home) |
| V01-0173 | rule | 2.4 | Mode is derived, never passed (J-V1.3): unit when laid empty; refine when strategy equals … | V01 §2.4 |
| V01-0174 | record | 2.4 | NeighbourhoodResult: mode, blocks, ways, plots, buildings, greens, pins (model S11), hoodP… | V01 §2.4: pointer to pipeline II.1 (REFERENCE; the fact at its home) |
| V01-0175 | record | 2.4 | SeamReport gains landingsReached? (landing attach vertices joined by a walk to the distric… | V01 §2.4: pointer to pipeline II.1 (REFERENCE; the fact at its home) |
| V01-0176 | rule | 2.4 | NeighbourhoodStrategy.generate(req) implemented once in @plat/hood dispatching on derived … | V01 §2.4 |
| V01-0177 | record | 2.5 | CloseupParams {pinGate [0,2] default 1, outside clamped with one-line bend, multiplies eve… | V01 §2.5 |
| V01-0178 | rule | 2.5 | Succession (§6.3): a district succeeded by the anchor rule carries its CloseupRecord to it… | V01 §2.5 |
| V01-0179 | record | 2.6 | HoodRecipe (Recipe.hood, present exactly when Recipe.product='hood'): outline {template} o… | V01 §2.6: pointer to model §2.9 (REFERENCE; the fact at its home) |
| V01-0180 | rule | 2.6 | A hood document's layers are fixed by V1-3.10.1 (7) through its S0 inputs: islands off, se… | V01 §2.6 |
| V01-0181 | lifecycle | 2.7 | District.fabric, fabricParams: create S7c inside S7b (1), setAttr (declared, held §7.2), s… | V01 §2.7 |
| V01-0182 | lifecycle | 2.7 | Block.content, squareType, ringCentre: create S9b; read S10a (iii), S10, S10b, S11, S12b, … | V01 §2.7 |
| V01-0183 | lifecycle | 2.7 | Block.voidCorner: create S9b for a void square; read S10 claims-first step; persist leaf d… | V01 §2.7 |
| V01-0184 | lifecycle | 2.7 | HoodPlace (square, green, yard, court): create S13a creation pass, T11 name tool on unname… | V01 §2.7 |
| V01-0185 | lifecycle | 2.7 | HoodPlace (opening): create opening pass from public-opening or catacomb-entrance AccessPo… | V01 §2.7 |
| V01-0186 | lifecycle | 2.7 | HoodPlace.name, .knownTo: create S13a naming pass, setAttr; read knowledge filter (§9.2), … | V01 §2.7 |
| V01-0187 | lifecycle | 2.7 | CloseupRecord: create first closeup event on the district; read refine derivation, §7.4 in… | V01 §2.7 |
| V01-0188 | lifecycle | 2.7 | Way.surface (base field, derived by V1-3.7.3 unless edited): create S10a end; read S14 roa… | V01 §2.7 |
| V01-0189 | lifecycle | 2.7 | Recipe.hood: create T1 intend product hood, skeleton file, API; read unit run S0-S2; persi… | V01 §2.7 |
| V01-0190 | lifecycle | 2.7 | District.terrace (BCR-41): create setAttr (T8 chip), skeleton quarter terrace (BCR-44); re… | V01 §2.7 |
| V01-0191 | lifecycle | 2.7 | RetainingWall as V01 reads it (source generated: base S10-S11 levelling incl. ward edge BC… | V01 §2.7: pointer to determinism §7.3 (REFERENCE; the fact at its home) |
| V01-0192 | lifecycle | 2.7 | Rim-walk pair (one esplanade + one street_trees Greenery on a sky island's rim strip; base… | V01 §2.7 |
| V01-0193 | lifecycle | 2.7 | Unit's Allocation (standalone): create S7b in the unit run less the void part (to undergro… | V01 §2.7 |
| V01-0194 | lifecycle | 2.7 | hood.constants (one settings row, NG entries among cells), squares.quota: create authors (… | V01 §2.7 |
| V01-0195 | rule | 2.7 | Derived and never stored: χ̃, templateLandM2, DistrictContext, terraceState, stepProfile, … | V01 §2.7 |
| V01-0196 | identity | 2.8 | Template seed ways and plazas: derivation unit = template face's L1 cell, stage S8.seed (o… | V01 §2.8 |
| V01-0197 | identity | 2.8 | Blocks keep §6.3's rule (cell for S8 blocks); dispatch writes attributes only. HoodPlace (… | V01 §2.8 |
| V01-0198 | identity | 2.8 | Hood pins have no address; draws keyed by block (or hinterland face) with stage component … | V01 §2.8 |
| V01-0199 | identity | 2.8 | Unit-run entities: standalone neighbourhood is a town root in its own document, §6.1 fixed… | V01 §2.8 |
| V01-0200 | step | 3.1 | Stage graph delta (BCR-3): S7b (1) greedy -> [S7c eager town-wide per district in lineage … | V01 §3.1 |
| V01-0201 | rule | 3.1 | S7c and S9b are stage hooks registered by @plat/hood in §4.12 StrategyRegistry at base hoo… | V01 §3.1: pointer to pipeline §4.12 (REFERENCE; the fact at its home) |
| V01-0202 | interface | 3.1 | S7c declared reads: S7b (1) greedy Allocation rows (in-transaction); districts (kind, inte… | V01 §3.1 |
| V01-0203 | interface | 3.1 | S9b declared reads: blocks (areas, frontages, interiors, ringCentre); L2 junction index; w… | V01 §3.1 |
| V01-0204 | rule | 3.1 | With @plat/hood absent (M1-M4b) neither hook exists: every district bent-cut and every blo… | V01 §3.1 |
| V01-0205 | rule | 3.2 | χ̃(D) is §4.5 (2)'s function evaluated with allocation rows as instances (J-V1.1): S7c rea… | V01 §3.2 |
| V01-0206 | rule | 3.2 | χ̃ (3) trade position: frontage = length of every way chain on the boundary or inside the … | V01 §3.2 |
| V01-0207 | rule | 3.2 | χ̃ (5) relations: mainRoad = share of that frontage on through and primary ways; anchors f… | V01 §3.2 |
| V01-0208 | rule | 3.2 | χ̃ is draw-free, never stored, recomputed on demand from eager records, equal on every hos… | V01 §3.2 |
| V01-0209 | test | 3.2 | T-V1-2: on B-CITY (a) χ̃ lot-mix shares within 0.08 (half L1 distance) of placed vector fo… | V01 §3.2 |
| V01-0210 | step | 3.3.1 | S7c per district in lineage order on the generation worker as S7b (1)'s allocation hook: (… | V01 §3.3.1 |
| V01-0211 | rule | 3.3.2 | Pre-claim template face at S7c = D's largest L1 face that is not a wall strip, an S3 reser… | V01 §3.3.2 |
| V01-0212 | table | 3.3.2 | Eligibility: ring law inscribedRadiusM >= 2.5 x eLo + w_tpl [elig.ringELo] (w_tpl at band … | V01 §3.3.2 |
| V01-0213 | rule | 3.3.2 | A district with no template face (every L1 face a wall strip, reservation or intramural ga… | V01 §3.3.2 |
| V01-0214 | rule | 3.3.3 | Weight w_r = select.base x κ(D) x Π(1 + gain x value) x (1 + plannedGain x intent.planned)… | V01 §3.3.3 |
| V01-0215 | rule | 3.3.3 | stepped row weight further x min(2, slope.meanPct / 8) x (1 + terrace.askGain x asks), ask… | V01 §3.3.3 |
| V01-0216 | rule | 3.3.3 | S7c never names or assigns a quarter: a quarter name arises only through item 72's identit… | V01 §3.3.3 |
| V01-0217 | table | 3.3.3 | Default hood.templates select rows (ours, own, calibratable; J-V1.4) base / kind factors /… | V01 §3.3.3 |
| V01-0218 | test | 3.3.3 | Confirmation (M5, B-CITY): share of non-bent-cut districts 15-35 % at CITY default preset;… | V01 §3.3.3 |
| V01-0219 | rule | 3.3.4 | One uniform on fabric.select keyed by the district's own lineage key with reroll forced to… | V01 §3.3.4 |
| V01-0220 | rule | 3.3.5 | Standalone auto: NG 1.2.2 random-template odds bent-cut 0.7, street 0.3, square 0.1, ring … | V01 §3.3.5 |
| V01-0221 | rule | 3.3.6 | hood.fabric EpochParticipant {id hood.fabric, step afterGrowth, order 40, stage S9b, run} … | V01 §3.3.6 |
| V01-0222 | rule | 3.3.7 | templateLandM2(D,r) = sum over r's seeds on S7c's context (land.* cells): plaza (carved or… | V01 §3.3.7 |
| V01-0223 | rule | 3.3.7 | Reconcile: S7b (1)'s bounded reconcile (<= 3 rounds) with each district's capacity per ban… | V01 §3.3.7: pointer to pipeline §4.5 (REFERENCE; the fact at its home) |
| V01-0224 | rule | 3.3.7 | S8 honours the reservation: plaza A capped at plaza land reserved; ring series ends when l… | V01 §3.3.7 |
| V01-0225 | rule | 3.3.7 | The draw is made once on the greedy χ̃ (J-V1.38). T-V1-12 reports households unplaced per … | V01 §3.3.7 |
| V01-0226 | table | 3.3.8 | Kinds and rows offered (T-V1-6 counts): market square, crossroads, street (its market is i… | V01 §3.3.8 |
| V01-0227 | rule | 3.4 | A template is seed geometry plus the bent cut on everything else (NG structure, CA-2): S8 … | V01 §3.4 |
| V01-0228 | rule | 3.4.1 | Template face = D's largest L1 face by area that is not a wall strip, reservation, intramu… | V01 §3.4.1 |
| V01-0229 | rule | 3.4.2 | (a) Portal usable when its vertex lies on a chain bounding the template face and class lan… | V01 §3.4.2 |
| V01-0230 | rule | 3.4.2 | (a) Anchors: portal:best = pair maximising (rank_a + rank_b) x min(1, abs(ab) / (0.7 x fac… | V01 §3.4.2 |
| V01-0231 | rule | 3.4.2 | (b) Template street width w_tpl, one per district, drawn once on hood.template (creation i… | V01 §3.4.2 |
| V01-0232 | rule | 3.4.2 | (c) Seeds inserted in the district's S8 transaction (callback, L1) in row order, each by i… | V01 §3.4.2 |
| V01-0233 | rule | 3.4.2 | (d) Validation per seed on the overlay before commit: every segment >= minEdge; every inte… | V01 §3.4.2 |
| V01-0234 | rule | 3.4.2 | (e) After the seeds §4.6 runs on every face exactly as on a bent-cut district (stop test t… | V01 §3.4.2 |
| V01-0235 | mechanism | 3.4.3 | Main and cross spines: chord A to B, one control point at midpoint displaced perpendicular… | V01 §3.4.3 |
| V01-0236 | mechanism | 3.4.3 | Parallel spines: longest contiguous boundary run of that seam type (water or wall) on the … | V01 §3.4.3 |
| V01-0237 | mechanism | 3.4.3 | Contour series (stepped row, series true; J-V1.60): level lines of the unlevelled terrain … | V01 §3.4.3 |
| V01-0238 | mechanism | 3.4.3 | Ravine two flanks (J-V1.64): when the level line at z_pole has >= 2 components each >= 2 x… | V01 §3.4.3 |
| V01-0239 | mechanism | 3.4.4 | Ring primitive: II.2 states the courses (hexagons one phase, radial bell ringJitter x spac… | V01 §3.4.4: pointer to pipeline II.2 (REFERENCE; the fact at its home) |
| V01-0240 | mechanism | 3.4.4 | Ring radii: s1 = eLo + u(R - eLo) (u on cut.arc, index 0); r1 = s1/2; one growth factor pe… | V01 §3.4.4 |
| V01-0241 | mechanism | 3.4.4 | Landmark precinct rings (J-V1.70): a precinct ring round each qualifying reservation in σ … | V01 §3.4.4 |
| V01-0242 | mechanism | 3.4.4 | Ring width w_tpl, class secondary, each ring a closed chain, one Way per ring. Faces and o… | V01 §3.4.4 |
| V01-0243 | mechanism | 3.4.4 | Ring centre rule: when §4.6 step 1 stops the centre face as one block, S8 marks it ringCen… | V01 §3.4.4 |
| V01-0244 | mechanism | 3.4.5 | Plaza size A = clamp(SquareRow[type].m2PerInhabitant x inhabitants, minM2, maxShareOfFace … | V01 §3.4.5 |
| V01-0245 | mechanism | 3.4.5 | Carved plaza: shape coin (rectangle or round at even odds on hood.template; ref:NG 1.2.2 s… | V01 §3.4.5 |
| V01-0246 | mechanism | 3.4.5 | Green-mode plaza (park row): as carved but ring owned by Reservation kind park (S8), S9 ty… | V01 §3.4.5 |
| V01-0247 | mechanism | 3.4.5 | Void plaza (fabricParams.squareVoid = 1; COV-VG-VN-179, IMPR S4): nothing carved in S8; S9… | V01 §3.4.5 |
| V01-0248 | mechanism | 3.4.6 | Fan primitive: from a plaza or ring to between portals[0] and portals[1] usable portals no… | V01 §3.4.6 |
| V01-0249 | table | 3.4.7 | Template rows (card; seeds; fabricParams; fallback): bent-cut (Organic; NG area; -; -; -);… | V01 §3.4.7 |
| V01-0250 | decision | 3.4.7 | Four NG rows emulate NG 1.2.2 (area = base bent cut; street, square, ring restated in metr… | V01 §3.4.7 |
| V01-0251 | rule | 3.4.8 | Standalone unit run has no portal: portal:best resolves to axis, except a street hood whos… | V01 §3.4.8 |
| V01-0252 | step | 3.5.1 | S9b per district in lineage order on the generation worker as S10a's block hook, after S10… | V01 §3.5.1 |
| V01-0253 | rule | 3.5.1 | S9b candidate blocks: D's L2 built blocks whose interior is not wall_strip, reserved, gree… | V01 §3.5.1 |
| V01-0254 | rule | 3.5.1 | Band S9b reads per block = the band §4.7 S10 (2) reads: pass-1 field band at generation; i… | V01 §3.5.1 |
| V01-0255 | rule | 3.5.2 | Quotas: inhabitants N = Σ allocation household rows x roster mean household size at each b… | V01 §3.5.2 |
| V01-0256 | rule | 3.5.2 | Greens Q_gr = max(0, G_D - Σ D's S7b green claims), G_D = §4.9's public green for D (parks… | V01 §3.5.2 |
| V01-0257 | rule | 3.5.2 | Manors M = min(round(manorBlockShare(band) x N_ord), H_top); N_ord candidate blocks in man… | V01 §3.5.2 |
| V01-0258 | rule | 3.5.3 | Square type split q_t ∝ base_t x factor: forecourt 0.2 x (1 + 2 mix.religion) only where a… | V01 §3.5.3 |
| V01-0259 | rule | 3.5.3 | Square sites: block area <= min(2 x smallBlockM2, 5 000 m²) [sq.maxM2], smallBlockM2 = eLo… | V01 §3.5.3 |
| V01-0260 | rule | 3.5.3 | Square filling per type in order forecourt, bridgehead, trading, crossroads, well: candida… | V01 §3.5.3 |
| V01-0261 | rule | 3.5.4 | Greens: candidates of area <= 1.5 x D's median block area [green.maxMedian], no frontage o… | V01 §3.5.4 |
| V01-0262 | rule | 3.5.5 | Manor fit band: block area in [1.0, 3.0] x [manor.fitLow, manor.fitHigh] the plot-area bud… | V01 §3.5.5 |
| V01-0263 | rule | 3.5.5 | Manor sun = 1 - manor.sunWeight x shade(centroid) [manor.sunWeight 0.5, ours, extension]; … | V01 §3.5.5 |
| V01-0264 | rule | 3.5.5 | Manor siting = Π(1 - push) over blocks S10a (i) filled, push = weight of derived family ro… | V01 §3.5.5 |
| V01-0265 | rule | 3.5.6 | Phase 2 small blocks: every untyped candidate with area <= smallBlockM2 draws content from… | V01 §3.5.6 |
| V01-0266 | rule | 3.5.6 | A ringCentre block draws among feasible {square (plain or siting type), green, manor} at e… | V01 §3.5.6 |
| V01-0267 | rule | 3.5.7 | Court greening (§4.9 row): S12b plants a block's court residue as a green with trees with … | V01 §3.5.7: pointer to pipeline §4.9 (REFERENCE; the fact at its home) |
| V01-0268 | rule | 3.5.8 | Seam guard (S3): a block whose frontage on soft seams (way and field runs shared with anot… | V01 §3.5.8 |
| V01-0269 | rule | 3.5.9 | Land in the programme: S2's land estimate multiplies each band's plot land by (1 + λ_b), λ… | V01 §3.5.9: pointer to pipeline §4.2 (REFERENCE; the fact at its home) |
| V01-0270 | test | 3.5.9 | T-V1-12: on B-CITY 0 households unplaced because of a dispatched block or template (F-SITI… | V01 §3.5.9 |
| V01-0271 | table | 3.5.10 | Downstream per content: ordinary base everywhere, court greened by V1-3.5.7; manor: S10a o… | V01 §3.5.10 |
| V01-0272 | table | 3.5.10 | SquareRow.centrepiece defaults: forecourt cross 0.7 / statue 0.3; crossroads market cross … | V01 §3.5.10 |
| V01-0273 | fallback | 3.5.10 | F-DISPATCH revert rung: after S10a (ii) re-homes households outside D's band range (§4.5 (… | V01 §3.5.10 |
| V01-0274 | rule | 3.5.11 | Epochs: the hood.fabric participant runs S9b's rule on blocks an epoch creates outside a g… | V01 §3.5.11: pointer to V06 §3.2 (REFERENCE; the fact at its home) |
| V01-0275 | rule | 3.5.12 | Fixed inputs: S9b never types a fixed input's block square, green, manor or yard, and a re… | V01 §3.5.12 |
| V01-0276 | rule | 3.5.12 | Ladder records (g 108): QUARTER record whose district is D makes D's identity the dossier'… | V01 §3.5.12 |
| V01-0277 | rule | 3.6 | Context features, every district whatever its fabric (S2 (a) coverage matrix reads them): … | V01 §3.6 |
| V01-0278 | rule | 3.6 | (2) Wall-side (walled wall run >= 60 m: full or parapet stretch): intervallum where the er… | V01 §3.6 |
| V01-0279 | rule | 3.6 | (3) Slope: a lane, alley, cul_de_sac or path whose slopeP95 (§2.4, written by S9 from the … | V01 §3.6 |
| V01-0280 | rule | 3.6 | (4) Bridge approach: §4.6 step 7 portal gap keeps lanes off a bridge end; bridgehead squar… | V01 §3.6 |
| V01-0281 | rule | 3.6 | (7) Barrier edges (g 106 (a)(f)): a boundary run on a barrier-closure arc typed by its bar… | V01 §3.6: pointer to pipeline II.1 (REFERENCE; the fact at its home) |
| V01-0282 | rule | 3.6 | (8) Terraced wards (g 110 (a)): a district whose terrace.asks holds is terraced; the base'… | V01 §3.6 |
| V01-0283 | step | 3.7.1 | S13a local-place step (@plat/hood registration, two passes around the way names): (a) crea… | V01 §3.7.1 |
| V01-0284 | rule | 3.7.1 | HoodPlace knowledge defaults from hood.placeKnowledge: square and green public, court and … | V01 §3.7.1 |
| V01-0285 | rule | 3.7.1 | Opening pass (J-V1.76), run by the underground tail after systems and AccessPoints are lai… | V01 §3.7.1 |
| V01-0286 | rule | 3.7.1 | Catacomb entrance only on cemetery ground (g 109 (k)(2) revised ~20:05): churchyard part o… | V01 §3.7.1 |
| V01-0287 | rule | 3.7.1 | A place made by hand: T11 name tool on an unnamed court residue, yard or square creates it… | V01 §3.7.1 |
| V01-0288 | rule | 3.7.2 | Way-naming context (BCR-16) per way at S13a: shape ring (ring course), stepped (V1-3.6 (3)… | V01 §3.7.2 |
| V01-0289 | rule | 3.7.2 | V11's grammar rows guard on these features with weights, no strict priority; two lanes of … | V01 §3.7.2 |
| V01-0290 | rule | 3.7.3 | Way surfaces (BCR-6): at S10a's end after field pass 2 every way without an edited surface… | V01 §3.7.3 |
| V01-0291 | rule | 3.7.4 | District naming features (BCR-16): §10.4's district naming (V11 naming.district) reads fab… | V01 §3.7.4 |
| V01-0292 | rule | 3.8.1 | Close-up trigger (§4.1 policy): under elaborate 'click', a click on a district at city or … | V01 §3.8.1: pointer to pipeline §4.1 (REFERENCE; the fact at its home) |
| V01-0293 | step | 3.8.2 | Hood pins per block in lineage order (outline close-up: each hinterland face in face order… | V01 §3.8.2 |
| V01-0294 | step | 3.8.2 | (2) Prior picks: before a block's first site every model pin in the block (S11 decoration … | V01 §3.8.2 |
| V01-0295 | step | 3.8.2 | (4) Kind: weighted pick over rows with nonzero p_r, weight r.weight x decay_r, decay_r sta… | V01 §3.8.2: pointer to pipeline II.3 (REFERENCE; the fact at its home) |
| V01-0296 | step | 3.8.2 | (5) Placement: size lerp(sizeM, u); pin at site point when its disc (size/2 + clearanceM) … | V01 §3.8.2 |
| V01-0297 | mechanism | 3.8.2 | Entrance reserve (J-V1.75, J-V1.96): outside each building's main entrance and each side, … | V01 §3.8.2 |
| V01-0298 | test | 3.8.2 | T-V1-26 measures close-up purity in any order of click, wings rung and plan; fallback: res… | V01 §3.8.2 |
| V01-0299 | table | 3.8.2 | Default hood.pins rows (ours, calibratable, extension; gates at square/yardBlock/green sit… | V01 §3.8.2 |
| V01-0300 | test | 3.8.2 | T-V1-31: pins per 100 buildings per kind and template within 3 x NG's for the default pres… | V01 §3.8.2 |
| V01-0301 | mechanism | 3.8.3 | Close-up cache: derived content (HoodPins only; names, squares, greens, places are eager m… | V01 §3.8.3 |
| V01-0302 | rule | 3.8.4 | Staleness: a batch changing any input sets the district's closeup record stale (§2.8) with… | V01 §3.8.4 |
| V01-0303 | rule | 3.8.5 | Overrides: an instance event on a hood pin writes §2.7's override row on its block; op, or… | V01 §3.8.5: pointer to rendering §8.10 (REFERENCE; the fact at its home) |
| V01-0304 | rule | 3.8.6 | Persistence: the first hood-pin edit inside a close-up (instance event on a hood pin or pa… | V01 §3.8.6: pointer to pipeline II.4 (REFERENCE; the fact at its home) |
| V01-0305 | rule | 3.8.7 | Frame and surroundings: opening frames the view by §9.5's framing rule restricted to D's f… | V01 §3.8.7: pointer to rendering §9.5 (REFERENCE; the fact at its home) |
| V01-0306 | rule | 3.8.8 | An underground district opens as a refine close-up drawing no hood pins (V04 ships no unde… | V01 §3.8.8 |
| V01-0307 | rule | 3.8.8 | Ground access symbols (J-V1.74): every ground AccessPoint whose ground.host is a ground fa… | V01 §3.8.8 |
| V01-0308 | rule | 3.8.8 | An access hosted by a building or basement, or whose ground.at is inside a footprint (cata… | V01 §3.8.8 |
| V01-0309 | interface | 3.8.8 | AccessSymbolKind = Exclude<AccessPoint.kind, door> or catacomb; accessSymbolKind(a) (@plat… | V01 §3.8.8 |
| V01-0310 | mechanism | 3.8.9 | Outline close-up (J-V1.45): a view action, no event, no model change: user draws a rectang… | V01 §3.8.9 |
| V01-0311 | rule | 3.9 | Replace close-up is a model edit (II.4): one undo group of setAttr(D.fabric, r) (and setAt… | V01 §3.9 |
| V01-0312 | rule | 3.9 | Replace fixed inputs (§7.2): locked, pinned, assigned, dossier-backed entities in D (a sky… | V01 §3.9 |
| V01-0313 | rule | 3.9 | Replace dry run (§7.1) runs the whole re-derivation on the overlay and returns: ghost of n… | V01 §3.9 |
| V01-0314 | rule | 3.9 | A targeted edit of a catacomb's source (retyping the churchyard plot, demolishing the owni… | V01 §3.9 |
| V01-0315 | rule | 3.10 | Unit run: a request whose boundary has no committed fabric runs the pipeline as a unit on … | V01 §3.10: pointer to pipeline II.1 (REFERENCE; the fact at its home) |
| V01-0316 | step | 3.10.1 | Standalone S0 resolves the recipe on blueprint.features (appended after S0's existing draw… | V01 §3.10.1 |
| V01-0317 | step | 3.10.1 | Standalone S0 size: size chip sets buildings to about 85, 700 or 1 050 (NG C8 bands); else… | V01 §3.10.1 |
| V01-0318 | step | 3.10.1 | Standalone S1: frame = outline box + 30 % a side [hood.frameMargin]; flat terrain at datum… | V01 §3.10.1 |
| V01-0319 | step | 3.10.1 | Standalone S2: virtual host town = S2's roster for a town of contextRung's target populati… | V01 §3.10.1 |
| V01-0320 | step | 3.10.1 | Standalone S3-lite: outline from §4.2 S1 (2) closed-outline routine scaled (drawn polygon … | V01 §3.10.1 |
| V01-0321 | step | 3.10.1 | Standalone S6: one district = outline face; kind from S0; field pass 1 with characterOffse… | V01 §3.10.1 |
| V01-0322 | step | 3.10.1 | Standalone step 6: S7 only with a wall edge; S7b one-district allocation persisted as the … | V01 §3.10.1 |
| V01-0323 | rule | 3.10.1 | Standalone layers and history (J-V1.36; J-V1.77): Recipe.product hood fixes layers through… | V01 §3.10.1 |
| V01-0324 | mechanism | 3.10.2 | Standalone outline rows (BCR-13; ref:NG 1.2.2 hood outline code; code-neighbourhood.md §2.… | V01 §3.10.2 |
| V01-0325 | mechanism | 3.10.2 | street_strip: main-street course first at bearing ± 45° (+ at 0.3) plus a centred bell up … | V01 §3.10.2 |
| V01-0326 | step | 3.10.3 | Sky island unit run (J-V1.49) inputs skyHandover(doc, island) (V05 §2.3: land face, rim st… | V01 §3.10.3 |
| V01-0327 | step | 3.10.3 | Sky unit run (3) field = SkyHandover.field (raster, mean, density, greenery), never recomp… | V01 §3.10.3 |
| V01-0328 | step | 3.10.3 | Island crossing sites (J-V1.91): a site qualifies when both deck_end vertices lie on the b… | V01 §3.10.3: pointer to pipeline §4.2 (REFERENCE; the fact at its home) |
| V01-0329 | step | 3.10.3 | After S8 and before S9 one L1 batch removes the span of every site with an unreached deck … | V01 §3.10.3 |
| V01-0330 | rule | 3.10.3 | Cross-arena pulls: the island's S10b reads a class on another arena by BCR-V5-16's route d… | V01 §3.10.3 |
| V01-0331 | mechanism | 3.10.3 | Rim walk (J-V1.81, J-V1.90): plantRimWalk(doc, island) (@plat/hood) is pure over the commi… | V01 §3.10.3 |
| V01-0332 | step | 3.10.3 | Sky unit run (5): the town's S12c and S13a include the island's districts (names unique to… | V01 §3.10.3 |
| V01-0333 | rule | 3.10.3 | (6)(a) After generation (J-V1.90): no scoped mode (every run partitions the whole island);… | V01 §3.10.3 |
| V01-0334 | rule | 3.10.3 | (6)(b) Carry-over: a run over an island with content re-derives it as a replace close-up d… | V01 §3.10.3 |
| V01-0335 | rule | 3.10.3 | (6)(c) Faces added or moved at the rim are no unit run: each face a growing resize adds, o… | V01 §3.10.3 |
| V01-0336 | rule | 3.10.3 | Re-searched institution claim (V05 §4.2; J-V5.77): where the island's institution claim no… | V01 §3.10.3 |
| V01-0337 | rule | 3.10.3 | At generation the ground is byte-identical to a run without the island (§3.4 isolation); e… | V01 §3.10.3 |
| V01-0338 | rule | 3.10.4 | Arbitrary outline inside a town: seeing any area at neighbourhood band is the outline clos… | V01 §3.10.4 |
| V01-0339 | rule | 3.11 | Seams (1) shared geometry stays the base's (II.1 (1)): no seed or cut of D writes a chain … | V01 §3.11: pointer to pipeline II.1 (REFERENCE; the fact at its home) |
| V01-0340 | rule | 3.11 | Seams (4) barrier runs typed by barrier kind (shore water; cliff, gorge cliff; marsh marsh… | V01 §3.11: pointer to pipeline II.1 (REFERENCE; the fact at its home) |
| V01-0341 | rule | 3.11 | SeamReport (6), written by every close-up, replace re-derivation and unit run: portalsTota… | V01 §3.11: pointer to pipeline II.1 (REFERENCE; the fact at its home) |
| V01-0342 | rule | 3.11 | Seams (7) Retaining walls (J-V1.63): every RetainingWall lies inside the faces of the dist… | V01 §3.11 |
| V01-0343 | rule | 3.11 | Seams (8) Raised ways never bound a district (item 110 (b)): TypedBoundary's runs are part… | V01 §3.11 |
| V01-0344 | rule | 3.12 | Concerns (BCR-11; appended with next u16 ids, non-rerollable): fabric.select (S7c; distric… | V01 §3.12: pointer to determinism §6.1 (REFERENCE; the fact at its home) |
| V01-0345 | rule | 3.12 | Draw-free: contour series, thalweg path, precinct rings, terraceState, parts table, strips… | V01 §3.12 |
| V01-0346 | rule | 3.12 | Stage component S8.seed (BCR-31) for template seed ways and plazas so no seed lineage key … | V01 §3.12 |
| V01-0347 | fallback | 3.13 | F-TEMPLATE (S8 seed primitive, replace dry run, sky unit run): detection: seed validation … | V01 §3.13: pointer to determinism §5.2 (REFERENCE; the fact at its home) |
| V01-0348 | fallback | 3.13 | F-DISPATCH (S9b; S10a (ii)): detection quota with no eligible site, manor with no compound… | V01 §3.13: pointer to determinism §5.2 (REFERENCE; the fact at its home) |
| V01-0349 | rule | 3.13 | No rung restarts anything above its district or unit (§5): a template failure never re-rol… | V01 §3.13: pointer to determinism §5 (REFERENCE; the fact at its home) |
| V01-0350 | rule | 3.14 | Every numeric constant of V1-3 is a cell of a table (item 23; DEFINITION §5 'Rules are dat… | V01 §3.14 |
| V01-0351 | constant | 3.14 | Constants homed outside hood.constants: S7c row weights and gains (hood.templates select.*… | V01 §3.14 |
| V01-0352 | constant | 3.14 | Constants V01 reads from V11 (read, never restated): the stepped-way threshold = a way cla… | V01 §3.14: pointer to V11's terrace row and ways.crossing (REFERENCE; the fact at its home) |
| V01-0353 | constant | 3.14 | hood.constants column semantics (J-V1.99): one row key settings in V11 settings form; each… | V01 §3.14 |
| V01-0354 | constant | 3.14 | hood.constants switch columns: fabric.extensionWeight default 1, number weight, [0,1], not… | V01 §3.14 |
| V01-0355 | constant | 3.14 | hood.constants geometry columns (marker —, NG —, calibratable yes unless stated): elig.rin… | V01 §3.14 |
| V01-0356 | constant | 3.14 | hood.constants geometry columns (cont.): sq.forecourtM 60 m [20,120], sq.bridgeM 40 m [10,… | V01 §3.14 |
| V01-0357 | constant | 3.14 | hood.constants drawing/budget/size columns (not calibratable): access.<accessSymbolKind>M … | V01 §3.14 |
| V01-0358 | decision | 3.15 | NG preset (J-V1.41, J-V1.98; BCR-46; item 23): emulation first, stage 2 carries an NG pari… | V01 §3.15 |
| V01-0359 | rule | 3.15 | NG resolution: a cell resolves under NG to its presets.NG entry, else as under MFCG (prese… | V01 §3.15: pointer to determinism §7.6 (REFERENCE; the fact at its home) |
| V01-0360 | rule | 3.15 | Stage-2 switch fabric.extensionWeight (weight: 1 default, 0 in MFCG and FTG by §7.6 zeroin… | V01 §3.15 |
| V01-0361 | rule | 3.15 | Switch's edit (J-V1.101): an editTable or editPreset changing the resolved fabric.extensio… | V01 §3.15 |
| V01-0362 | rule | 3.15 | NG scope: read by B-REF's NG rows (T-V1-31, arm preset 'NG') and the M5 panel's NG pairs (… | V01 §3.15 |
| V01-0363 | table | 3.15 | NG rules table: stage 2 runs (fabric.extensionWeight 1); fabric: four NG rows at select.ng… | V01 §3.15 |
| V01-0364 | interface | 3.16 | Services (pure, draw-free, memoised per commit, each <= 1 ms per call at CITY): catchmentO… | V01 §3.16 |
| V01-0365 | interface | 3.16 | districtsAbove(part, element): area overlap of an underground element's projected footprin… | V01 §3.16 |
| V01-0366 | interface | 3.16 | fabricSignature(region) (J-V1.78): town side of V12's paired measures (blockAreaM2 V12 blo… | V01 §3.16 |
| V01-0367 | interface | 3.16 | One writer other volumes call: plantRimWalk(doc, island) writes the island's esplanade and… | V01 §3.16 |
| V01-0368 | rule | 3.17 | Item 110 is base design built at M3a (RetainingWall with S10-S11 levelling, raised ways on… | V01 §3.17: pointer to §2.7, §4.3, §4.7 (items 245, 290, 302) (REFERENCE; the fact at its home) |
| V01-0369 | rule | 3.17.1 | Terraced ward (J-V1.60-J-V1.62): (1) state terraceState(D) (declared, else relief rows' te… | V01 §3.17.1 |
| V01-0370 | rule | 3.17.1 | (4) The ward-edge wall is the base's district-edge source (BCR-42; J-V1.61, one producer f… | V01 §3.17.1: pointer to §4.7 (item 302) (REFERENCE; the fact at its home) |
| V01-0371 | rule | 3.17.2 | Held walls: (1) a declared RetainingWall (source declared, f item 245: T3 wall retaining k… | V01 §3.17.2 |
| V01-0372 | rule | 3.17.3 | Raised ways in the close-up (J-V1.65): (1) a raised part (viaduct, elevated road, aqueduct… | V01 §3.17.3 |
| V01-0373 | rule | 3.17.3 | (3) A part-0 way V01 lays crosses a strip only through an open span (span's use, eager bas… | V01 §3.17.3 |
| V01-0374 | rule | 3.17.4 | Raised-way land: generated raised parts committed before S7b (1) (viaduct inside S4's rout… | V01 §3.17.4 |
| V01-0375 | rule | 3.17.5 | Removing or adding a raised way (J-V1.67): both are the base's edit (item 110 (b): removal… | V01 §3.17.5 |
| V01-0376 | rule | 3.17.6 | Deck plots (J-V1.68): (1) a deck's plots and placed landmarks (item 110 (d): frontage plot… | V01 §3.17.6 |
| V01-0377 | rule | 3.17.7 | Unit runs, islands, epochs: (1) no generated raised way in a unit run (no route solver or … | V01 §3.17.7 |
| V01-0378 | rule | 3.17.8 | Aqueduct terminal: one rule reads either form of the public outlet (item 110 (b); V11 aque… | V01 §3.17.8 |
| V01-0379 | rule | 4 | Stage 2 adds no event kind: every stage-2 state is edited by §7.1's existing events with d… | V01 §4: pointer to determinism §7.1 (REFERENCE; the fact at its home) |
| V01-0380 | edit | 4.1 | Fabric (layout card): one undo group setAttr(D.fabric, r) then regenerate({ids:[D]}, 'keep… | V01 §4.1 |
| V01-0381 | edit | 4.1 | Block content (houses, manor, square, green, yard): setAttr(B.content, c) (and squareType)… | V01 §4.1 |
| V01-0382 | edit | 4.1 | Square function setAttr(B.squareType, t), T9: B's S11 centrepiece re-drawn, place renamed … | V01 §4.1 |
| V01-0383 | edit | 4.1 | Hood pin: instance {entity B, ordinal hood:<n>, op move/remove/restyle (InstanceStyle.pinK… | V01 §4.1 |
| V01-0384 | edit | 4.1 | Stage-2 switch (hood.constants fabric.extensionWeight): editTable on hood.constants or edi… | V01 §4.1 |
| V01-0385 | edit | 4.1 | Ward terracing: one undo group setAttr(D.terrace, on/off/absent) then regenerate({ids:[D]}… | V01 §4.1 |
| V01-0386 | rule | 4.1 | Everything else inside a close-up is a base entity edited as one (II.4), no closeup event:… | V01 §4.1 |
| V01-0387 | interface | 4.2 | Tool parameters: T1 intend gains product town/hood; hood card asks shape (outline thumbnai… | V01 §4.2: pointer to determinism §7.1 (REFERENCE; the fact at its home) |
| V01-0388 | rule | 4.3 | Locality (oracle): opening/closing/re-opening no event, digest unchanged, chunks and displ… | V01 §4.3: pointer to determinism §7.3 (REFERENCE; the fact at its home) |
| V01-0389 | lifecycle | 4.4 | Undo/lifecycle rows for §7.4: setAttr(D.fabric/fabricParams.k): log + district leaf; S7c k… | V01 §4.4: pointer to determinism §7.4 (REFERENCE; the fact at its home) |
| V01-0390 | lifecycle | 4.4 | Undo/lifecycle rows (cont.): setAttr/delete on a HoodPlace and T11-created place: log + pl… | V01 §4.4: pointer to determinism §7.4 (REFERENCE; the fact at its home) |
| V01-0391 | interface | 4.5 | WhyProviders registered by @plat/hood (V10 §2.13, BCR-V10-3), each a pure function of comm… | V01 §4.5: pointer to V10 §2.13 (REFERENCE; the fact at its home) |
| V01-0392 | interface | 4.5 | Close-up panel reader query query({kind:'hood', id:D}) returns name, identity (with QUARTE… | V01 §4.5 |
| V01-0393 | rule | 4.6 | Hosts: a host sends these events through the bridge like any (§11.3); a dossier naming cla… | V01 §4.6: pointer to rendering §11.3 (REFERENCE; the fact at its home) |
| V01-0394 | rule | 5.1 | hatched family (BCR-14): roles and values are §8.2's hatched column; lighting §8.4 (h) (pr… | V01 §5.1: pointer to rendering §8.2 (REFERENCE; the fact at its home) |
| V01-0395 | table | 5.1.1 | hatched per band: city: block ground paper, footprint masses in lit roof tone (building) w… | V01 §5.1.1 |
| V01-0396 | rule | 5.1.1 | Item 110 marks: retaining walls from the district band (retaining); raised parts at every … | V01 §5.1.1 |
| V01-0397 | mechanism | 5.1.2 | Roof law: each roof face or facet takes the lit roof colour or dark = lit x lerp(ambience,… | V01 §5.1.2 |
| V01-0398 | mechanism | 5.1.2 | Hatch (item 58 (e); J-V1.47, J-V1.69, J-V1.73): per roof facet of roofConstruction: under … | V01 §5.1.2 |
| V01-0399 | mechanism | 5.1.2 | Hatch (cont.): below 1.5 px on-screen pitch [hatch.minPx] every second line by index parit… | V01 §5.1.2 |
| V01-0400 | mechanism | 5.1.2 | Stair flights (V02 stairFlight; X24): flight facet as V02 paints it, treads hatched across… | V01 §5.1.2: pointer to V02 V02 §2.6 (REFERENCE; the fact at its home) |
| V01-0401 | mechanism | 5.1.2 | Crowns (J-V1.27): lobed crown k = 5 + floor(4u) lobes, each a circular arc centred on a ji… | V01 §5.1.2 |
| V01-0402 | mechanism | 5.1.2 | Road surfaces (by Way.surface; square faces by residue surface): cobble = road fill + stip… | V01 §5.1.2 |
| V01-0403 | mechanism | 5.1.2 | Stepped ticks across a stepped way every 1.2 m of ground length at the thin stroke from th… | V01 §5.1.2 |
| V01-0404 | mechanism | 5.1.2 | Pin symbols (model and hood pins, by model size): well round (render key parity) or square… | V01 §5.1.2 |
| V01-0405 | mechanism | 5.1.2 | Ground access symbols (by accessSymbolKind, sized access.<kind>M; only ground-face accesse… | V01 §5.1.2 |
| V01-0406 | table | 5.1.3 | hatched layer order at neighbourhood and building bands (StyleSheet.order per band §8.2; c… | V01 §5.1.3 |
| V01-0407 | rule | 5.1.3 | Stacks in slot 12 (item 110 (c)(f); V02 X24): a building's wings drawn in stack order by B… | V01 §5.1.3 |
| V01-0408 | rule | 5.1.4 | hatched night is §8.4 (h)'s (ambience wash, glow per lit building at the vector rung; plac… | V01 §5.1.4: pointer to rendering §8.4 (REFERENCE; the fact at its home) |
| V01-0409 | mechanism | 5.1.5 | closeup.vignette (style value): none (default); fade: every mark outside the opened distri… | V01 §5.1.5 |
| V01-0410 | rule | 5.1.6 | ink's neighbourhood band (M2b) takes stage-2 marks the same way: hood pins and pin symbols… | V01 §5.1.6: pointer to rendering §8.2 (REFERENCE; the fact at its home) |
| V01-0411 | test | 5.1.7 | hatched palette is §8.2's (owner-opened targets item 69; chroma scale re-found on the meas… | V01 §5.1.7: pointer to rendering §8.2 (REFERENCE; the fact at its home) |
| V01-0412 | rule | 5.2.1 | Hood title: when a district is opened the view draws its name and under it its identity ro… | V01 §5.2.1: pointer to rendering §9.5 (REFERENCE; the fact at its home) |
| V01-0413 | rule | 5.2.2 | Place labels: each HoodPlace has one LabelEntity kind place (BCR-17): area label on host f… | V01 §5.2.2: pointer to rendering §9 (REFERENCE; the fact at its home) |
| V01-0414 | rule | 5.2.3 | Street names and addresses are the base's: path labels at district and neighbourhood bands… | V01 §5.2.3: pointer to rendering §9.3 (REFERENCE; the fact at its home) |
| V01-0415 | table | 5.3 | Exports stage-2 content: SVG district or outline scope at neighbourhood band with the clos… | V01 §5.3: pointer to rendering §11.1 (REFERENCE; the fact at its home) |
| V01-0416 | table | 5.3 | Exports (cont.): GeoJSON blocks with content and squareType; squares, greens, yards as pol… | V01 §5.3: pointer to rendering §11.1 (REFERENCE; the fact at its home) |
| V01-0417 | budget | 6 | Budgets (§12.1 hardware, p95, PLAUSIBLE until measured; B = buildings in scope): S7c + lan… | V01 §6 |
| V01-0418 | budget | 6 | Budgets (cont.): V1-3.16 services <= 1 ms per call at CITY memoised per commit, catchmentO… | V01 §6 |
| V01-0419 | budget | 6 | Open a district (refine close-up model + display list, §12.5 neighbourhood-band line made … | V01 §6 |
| V01-0420 | budget | 6 | Budgets (cont.): per building (S5 (b)) generation <= 75 µs (standalone model) and renderin… | V01 §6 |
| V01-0421 | budget | 6 | Sky island districts: generation unit run ≈ 8-12 ms per island at CITY, ≈ 12-18 ms at METR… | V01 §6 |
| V01-0422 | rule | 7 | Test families as §13 names them (B-CITY 1 000 seeds per rung nightly, 200 in B-CITY-lite; … | V01 §7: pointer to scope §13 (REFERENCE; the fact at its home) |
| V01-0423 | test | 7 | T-V1-1 (B-CITY, C, S1): II.5's M1 readiness bars hold with @plat/hood registered: every Se… | V01 §7 row T-V1-1 |
| V01-0424 | test | 7 | T-V1-3 (B-EDIT, C, S6): New random on a district never changes its fabric; changing one di… | V01 §7 row T-V1-3 |
| V01-0425 | test | 7 | T-V1-4 (B-CITY, goldens, CI, C): default non-bent-cut share 15-35 % at CITY; MFCG and FTG:… | V01 §7 row T-V1-4 |
| V01-0426 | test | 7 | T-V1-5 (B-CITY, C, S4): S4 (b) nearest-centroid classifier over DistrictSignature standard… | V01 §7 row T-V1-5 |
| V01-0427 | test | 7 | T-V1-7 (B-CITY, B-FUZZ, C, S4): every laid ring whole (no ring meets the face inset), 48 v… | V01 §7 row T-V1-7 |
| V01-0428 | test | 7 | T-V1-8 (B-CITY, C, S4): street main spine joins both anchors, >= 70 % of its frontage is p… | V01 §7 row T-V1-8 |
| V01-0429 | test | 7 | T-V1-9 (B-FUZZ, C, S4): 10^4 random template faces per template (convex, concave, C-, L-sh… | V01 §7 row T-V1-9 |
| V01-0430 | test | 7 | T-V1-10 (B-CITY, C, S4): S4 (d) square area per 1 000 inhabitants in 0.03-0.15 ha, median … | V01 §7 row T-V1-10 |
| V01-0431 | test | 7 | T-V1-11 (B-CITY, C): sub-block green quota met within ± 10 % in >= 95 % of districts that … | V01 §7 row T-V1-11 |
| V01-0432 | test | 7 | T-V1-12 (B-CITY, stress fixture, C): 0 households unplaced because of a dispatched block o… | V01 §7 row T-V1-12 |
| V01-0433 | test | 7 | T-V1-13 (B-CITY, O, S3): across soft seams Δ median frontage <= 25 %, Δ median plot area <… | V01 §7 row T-V1-13 |
| V01-0434 | test | 7 | T-V1-15 (B-EDIT, nightly five-engine, C, S5 (f), S6 (d)): opening, closing, reopening ever… | V01 §7 row T-V1-15 |
| V01-0435 | test | 7 | T-V1-16 (B-ZOOM, C, S5): S5 (f) footprint hash at neighbourhood band equals the city band'… | V01 §7 row T-V1-16 |
| V01-0436 | test | 7 | T-V1-18 (B-EDIT, C): a replace close-up keeps 100 % of locked, pinned, assigned, dossier-b… | V01 §7 row T-V1-18 |
| V01-0437 | test | 7 | T-V1-20 (B-CITY hood variant, goldens, C/P, S6): standalone generate product hood -> finis… | V01 §7 row T-V1-20 |
| V01-0438 | test | 7 | T-V1-21 (fixture, C): sky units on V05's island fixture: ground byte-identical with and wi… | V01 §7 row T-V1-21 |
| V01-0439 | test | 7 | T-V1-21 (cont., after generation): island raised at an epoch and one declared after genera… | V01 §7 row T-V1-21 |
| V01-0440 | test | 7 | T-V1-22 (B-CITY, C, S2): S2 (a) context coverage matrix has no empty cell (every waterfron… | V01 §7 row T-V1-22 |
| V01-0441 | test | 7 | T-V1-24 (B-CITY, B-ZOOM, C, S2): 0 duplicate names per district per kind; name-feature con… | V01 §7 row T-V1-24 |
| V01-0442 | test | 7 | T-V1-26 (B-ZOOM census, P, S5): hatched census at the neighbourhood reference view 15-20 h… | V01 §7 row T-V1-26 |
| V01-0443 | test | 7 | T-V1-27 (B-ZOOM, C, S5): S5 (e) shadow length ∝ stored height under the fixed sun, r >= 0.… | V01 §7 row T-V1-27 |
| V01-0444 | test | 7 | T-V1-29 (bench, P, S5): open model + display list <= 6 ms + 0.06 ms x B non-ring and <= 10… | V01 §7 row T-V1-29 |
| V01-0445 | test | 7 | T-V1-31 (B-REF, P, S4): against NG (§13.5 NG rows from baselines.json) under the NG preset… | V01 §7 row T-V1-31 |
| V01-0446 | test | 7 | T-V1-32 (D-5, O, S2 (d)): the D-5 panel against NG (§13.6 (2)) under NG (panel NG groups p… | V01 §7 row T-V1-32 |
| V01-0447 | test | 7 | T-V1-33 (export suite, C): district or outline SVG at neighbourhood band holds hood pins, … | V01 §7 row T-V1-33 |
| V01-0448 | test | 7 | T-V1-34 (B-EDIT, C): every V1-4.1 edit in 10^4 random sequences apply, undo, redo, replay,… | V01 §7 row T-V1-34 |
| V01-0449 | test | 7 | T-V1-36 (nightly, C): every stream key distinct in a B-CITY city with stage 2 on and in th… | V01 §7 row T-V1-36 |
| V01-0450 | test | 7 | T-V1-39 (hook fixture M4's, C): hood.fabric runs S7c and S9b only on new districts, new fa… | V01 §7 row T-V1-39 |
| V01-0451 | test | 7 | T-V1-42 (B-CITY, fixtures, C): a class with a coverage row reaches the same served-distric… | V01 §7 row T-V1-42 |
| V01-0452 | test | 7 | T-V1-45 (fixtures, C): on item 106's river-loop and cliff fixtures 0 wallside templates on… | V01 §7 row T-V1-45 |
| V01-0453 | test | 7 | T-V1-47 (V04 fixtures, B-EDIT, C): every catacomb entrance a place in the close-up of its … | V01 §7 row T-V1-47 |
| V01-0454 | test | 7 | T-V1-50 (B-CITY, fixture, C, S2): (a) hilly/mountainous seeds with terracedEdges on: conse… | V01 §7 row T-V1-50 |
| V01-0455 | test | 7 | T-V1-51 (B-CITY CITY/METROPOLIS, fixture, C): (a) 0 junctions between a raised part and a … | V01 §7 row T-V1-51 |
| V01-0456 | test | 7 | T-V1-53 (fixture, B-CITY harbour seeds, C): 0 deck plots typed by S9b; 0 hood pins on deck… | V01 §7 row T-V1-53 |
| V01-0457 | rule | 7 | Parity metrics against NG (run under NG): T-V1-26, T-V1-29, T-V1-31, T-V1-32; everything e… | V01 §7 |
| V01-0458 | plan | 8.1 | Stage 2 stays M5 (after M4 and M4b). M1: schema only (Block.content always ordinary, Block… | V01 §8.1 |
| V01-0459 | plan | 8.1 | M5 way-name shift declared: at M5 S9b's squares and S13a's places appear so ways ending at… | V01 §8.1 |
| V01-0460 | plan | 8.1 | Register at every exit (J-V1.97; V12 §3.11, X-V12-16): each milestone exits with 'plat cal… | V01 §8.1 |
| V01-0461 | plan | 8.1 | Constants marked calibrate/measured at M5 are tuned by V01's bars inside the landing work … | V01 §8.1 |
| V01-0462 | plan | 8.2 | M5 work items (pw, PLAUSIBLE): S-V1-a spike 0.75-1 (ring and holed-band cutting on 1 000 r… | V01 §8.2 |
| V01-0463 | plan | 8.2 | M5 work items (cont.): W8 unit runs 2-3 (standalone doc, one-district programme, star row,… | V01 §8.2 |
| V01-0464 | plan | 8.2 | Base M5 line is 14-18 pw; V01's is 27.25-36.25 pw (+13.25-18.25: seven context templates, … | V01 §8.2 |
| V01-0465 | plan | 8.3 | @plat/hood contents: TemplateFabric (one FabricStrategy reading hood.templates; base BentC… | V01 §8.3 |
| V01-0466 | plan | 8.4 | Risks in order: (1) ring and holed-band robustness (S-V1-a; F-TEMPLATE completes regardles… | V01 §8.4 |
| V01-0467 | decision | 9 | J-V1.1: provisional character χ̃ by §4.5 (2)'s own function over S7b allocation rows (size… | V01 §9 row J-V1.1 |
| V01-0468 | decision | 9 | J-V1.2: select each district's fabric at generation (S7c), on in default and off in parity… | V01 §9 row J-V1.2 |
| V01-0469 | decision | 9 | J-V1.3: derive the request's mode (refine/replace/unit) over passing it; drop reason from … | V01 §9 row J-V1.3 |
| V01-0470 | decision | 9 | J-V1.4: S7c default weights give 15-35 % templated CITY districts, organic the rest, over … | V01 §9 row J-V1.4 |
| V01-0471 | decision | 9 | J-V1.5: align a carved plaza with the template face's OBB major axis over NG's random rota… | V01 §9 row J-V1.5 |
| V01-0472 | decision | 9 | J-V1.6: carved is the square row's default, correcting J-S42 (void) whose premise rests on… | V01 §9 row J-V1.6 |
| V01-0473 | decision | 9 | J-V1.7: run the block dispatch for every fabric at generation (S9b), bent cut included, ov… | V01 §9 row J-V1.7 |
| V01-0474 | decision | 9 | J-V1.8: typed squares by a per-1 000-inhabitants quota sited at main junctions and before … | V01 §9 row J-V1.8 |
| V01-0475 | decision | 9 | J-V1.9: fixed default cuts for a standalone neighbourhood's FieldBands over land-share cut… | V01 §9 row J-V1.9 |
| V01-0476 | decision | 9 | J-V1.10: the largest L1 face as the template face over the whole district (districts' face… | V01 §9 row J-V1.10 |
| V01-0477 | decision | 9 | J-V1.11: whole rings only over NG's clipped rings (NG-GQ-5 truncation).… | V01 §9 row J-V1.11 |
| V01-0478 | decision | 9 | J-V1.12: kept II.3's hood pins as derived presentation over model entities (hundreds per d… | V01 §9 row J-V1.12 |
| V01-0479 | decision | 9 | J-V1.13: model record HoodPlace with local knowledge by default for courts and yards over … | V01 §9 row J-V1.13 |
| V01-0480 | decision | 9 | J-V1.14: condition way names on a derived naming context at S13a from M1 over re-naming wh… | V01 §9 row J-V1.14 |
| V01-0481 | decision | 9 | J-V1.15: derive way surfaces at S10a's end from fronting blocks' pass-2 band over at way c… | V01 §9 row J-V1.15 |
| V01-0482 | decision | 9 | J-V1.16: adopted RV-pc-1's unit run; standalone gets a virtual host town's programme carve… | V01 §9 row J-V1.16 |
| V01-0483 | decision | 9 | J-V1.17: partition a multi-district island by the bent cut at district scale over S6's gro… | V01 §9 row J-V1.17 |
| V01-0484 | decision | 9 | J-V1.18: key fabric.select on the district's own lineage key with reroll forced to 0 (revi… | V01 §9 row J-V1.18 |
| V01-0485 | decision | 9 | J-V1.19: every end S8 makes on a shared spine is baseLane (generation or any re-derivation… | V01 §9 row J-V1.19 |
| V01-0486 | decision | 9 | J-V1.20: standalone town root creation index 1 over sharing index 0 (no shared stream with… | V01 §9 row J-V1.20 |
| V01-0487 | decision | 9 | J-V1.21: one new parameter on four existing tools (T1 product, T6 furniture, T8 fabric, T1… | V01 §9 row J-V1.21 |
| V01-0488 | decision | 9 | J-V1.22: manor blocks by a band share capped by the district's top-band households over NG… | V01 §9 row J-V1.22 |
| V01-0489 | decision | 9 | J-V1.23: court-greening probabilities per band over NG's complete-frontage-ring rule, as I… | V01 §9 row J-V1.23 |
| V01-0490 | decision | 9 | J-V1.24: re-derive the district from S10a when a block's content is edited over the block … | V01 §9 row J-V1.24 |
| V01-0491 | decision | 9 | J-V1.25: bank path for docks, riverbank and comfortable-or-richer waterfronts without noxi… | V01 §9 row J-V1.25 |
| V01-0492 | decision | 9 | J-V1.26: re-priced M5 at 25.5-33.75 pw (27.25-36.25 with W18) from 14-18 over absorbing th… | V01 §9 row J-V1.26 |
| V01-0493 | decision | 9 | J-V1.27: our own lobed crown (arcs on a jittered polygon, lit cap) over NG's midpoint-bulg… | V01 §9 row J-V1.27 |
| V01-0494 | decision | 9 | J-V1.28: a per-band order list for hatched at neighbourhood and building bands over the sh… | V01 §9 row J-V1.28 |
| V01-0495 | decision | 9 | J-V1.29: hood title as view furniture (model only in district export and standalone) over … | V01 §9 row J-V1.29 |
| V01-0496 | decision | 9 | J-V1.30: kept II.4's closeup event before the first close-up edit with one parameter (pinG… | V01 §9 row J-V1.30 |
| V01-0497 | decision | 9 | J-V1.31: no new event kind over setFabric or a block-kind event (setAttr + regenerate carr… | V01 §9 row J-V1.31 |
| V01-0498 | decision | 9 | J-V1.32: per-district template street width w_tpl in the secondary band over §4.6 step 9's… | V01 §9 row J-V1.32 |
| V01-0499 | decision | 9 | J-V1.33: naming context at M1 and surface rule at M2b over M5 (names in every golden from … | V01 §9 row J-V1.33 |
| V01-0500 | decision | 9 | J-V1.34: a template district's regeneration costs its fabric's factor over §12.6's scoped … | V01 §9 row J-V1.34 |
| V01-0501 | decision | 9 | J-V1.35: district and neighbourhood catchment units are one unit, the district a close-up … | V01 §9 row J-V1.35 |
| V01-0502 | decision | 9 | J-V1.36: fix a lone neighbourhood document's layers (islands off, sewers off, undercity ne… | V01 §9 row J-V1.36 |
| V01-0503 | decision | 9 | J-V1.37: one ring growth factor per district (NG's geometric law) over II.2's fresh factor… | V01 §9 row J-V1.37 |
| V01-0504 | decision | 9 | J-V1.38: S7c as S7b's hook between greedy pass and reconcile, draw once on greedy χ̃, reco… | V01 §9 row J-V1.38 |
| V01-0505 | decision | 9 | J-V1.39: the one square quota in base table squares.quota read by S7b (3) and S9b over hoo… | V01 §9 row J-V1.39 |
| V01-0506 | decision | 9 | J-V1.40: S9b as S10a's hook after step (i) and before (ii) over before S10a (dispatch sees… | V01 §9 row J-V1.40 |
| V01-0507 | decision | 9 | J-V1.41: NG preset reproducing Neighbourhood's dispatch, manors, pins, plaza sizes (item 2… | V01 §9 row J-V1.41 |
| V01-0508 | decision | 9 | J-V1.42: a lone neighbourhood's outline by its fabric over the kind's weights (NG B1); con… | V01 §9 row J-V1.42 |
| V01-0509 | decision | 9 | J-V1.43: divide court and plot-yard pin gates by 5 (pin.courtFactor 0.2), keep square, yar… | V01 §9 row J-V1.43 |
| V01-0510 | decision | 9 | J-V1.44: rename S9b's market square trading (no stalls, no rank, never a market reservatio… | V01 §9 row J-V1.44 |
| V01-0511 | decision | 9 | J-V1.45: outline close-up as a view action opening districts and hinterland faces, chunked… | V01 §9 row J-V1.45 |
| V01-0512 | decision | 9 | J-V1.46: catacomb source cemetery, owning church plot and entrance plot are fixed inputs o… | V01 §9 row J-V1.46 |
| V01-0513 | decision | 9 | J-V1.47: world hatch pitch (hatch.pitchM calibrated to census mean 17-19) with a zoom-stab… | V01 §9 row J-V1.47 |
| V01-0514 | decision | 9 | J-V1.48: split the open-time law into model-and-display-list (non-ring and ring) and first… | V01 §9 row J-V1.48 |
| V01-0515 | decision | 9 | J-V1.49: consume V05's SkyHandover (no S1, rim untouched, landings gate-ranked, hand-over … | V01 §9 row J-V1.49 |
| V01-0516 | decision | 9 | J-V1.50: bends not refusals for every stage-2 dry run, refusing only a dossier fact or a l… | V01 §9 row J-V1.50 |
| V01-0517 | decision | 9 | J-V1.51: price W17 beside W12-W16 so M5 is 25.5-33.75 pw rather than 24.5-32.25.… | V01 §9 row J-V1.51 |
| V01-0518 | decision | 9 | J-V1.52: why providers recompute from committed state, flagging drifted, over persisting S… | V01 §9 row J-V1.52 |
| V01-0519 | decision | 9 | J-V1.53: through ring radials as a vetoable fabric parameter (ringRadials 1), default stag… | V01 §9 row J-V1.53 |
| V01-0520 | decision | 9 | J-V1.54: new hard seam type marsh for deep-marsh closure arcs over typing them field (soft… | V01 §9 row J-V1.54 |
| V01-0521 | decision | 9 | J-V1.55: key hood-pin draws with the STAGE_VIEW stage component over a creation-index offs… | V01 §9 row J-V1.55 |
| V01-0522 | decision | 9 | J-V1.56: distinct stage component S8.seed for template seeds over the first creation indic… | V01 §9 row J-V1.56 |
| V01-0523 | decision | 9 | J-V1.57: DistrictKind values only for a lone neighbourhood's kinds, great houses and slum … | V01 §9 row J-V1.57 |
| V01-0524 | decision | 9 | J-V1.58: shade in S7c by terrain-and-wall share only (islands placed after S7b); in S9b an… | V01 §9 row J-V1.58 |
| V01-0525 | decision | 9 | J-V1.59: a stretched incompatible chain raises the street row and a chain's street takes i… | V01 §9 row J-V1.59 |
| V01-0526 | decision | 9 | J-V1.60: a contour series (streets on level lines one terrace apart, 2 x dBar + w_tpl, lev… | V01 §9 row J-V1.60 |
| V01-0527 | decision | 9 | J-V1.61: one producer for every generated wall line, the base's S10-S11 levelling with its… | V01 §9 row J-V1.61 |
| V01-0528 | decision | 9 | J-V1.62: District.terrace as a district field over a fabricParams key (survives layout cha… | V01 §9 row J-V1.62 |
| V01-0529 | decision | 9 | J-V1.63: place every wall inside its producer's faces with a derived step profile over a s… | V01 §9 row J-V1.63 |
| V01-0530 | decision | 9 | J-V1.64: a thalweg path and a series per flank over one-flank terracing; flank-encoded cre… | V01 §9 row J-V1.64 |
| V01-0531 | decision | 9 | J-V1.65: the under-deck strip as one hole crossed only through open spans over each pier a… | V01 §9 row J-V1.65 |
| V01-0532 | decision | 9 | J-V1.66: part-0 readings for every trade, frontage and portal rule over reading every part… | V01 §9 row J-V1.66 |
| V01-0533 | decision | 9 | J-V1.67: the changed-way set as the scope of a raised way's removal or addition (detour di… | V01 §9 row J-V1.67 |
| V01-0534 | decision | 9 | J-V1.68: landward root's district owns a deck's plots over a deck pseudo-district; for a b… | V01 §9 row J-V1.68 |
| V01-0535 | decision | 9 | J-V1.69: one hatch rule per roof kind (flat parallel to major axis no ridge tapers; pyrami… | V01 §9 row J-V1.69 |
| V01-0536 | decision | 9 | J-V1.70: precinct rings following the precinct's outline, up to two per district, over one… | V01 §9 row J-V1.70 |
| V01-0537 | decision | 9 | J-V1.71: tilt a lone neighbourhood's ground on request (T1 hillside edge; Terraces card de… | V01 §9 row J-V1.71 |
| V01-0538 | decision | 9 | J-V1.72: read the stepped threshold from ways.crossing rampMaxGrade (lane, alley, cul-de-s… | V01 §9 row J-V1.72 |
| V01-0539 | decision | 9 | J-V1.73: hatch per roof facet of the sheet's roof construction (fakeGablePerWing faces unt… | V01 §9 row J-V1.73 |
| V01-0540 | decision | 9 | J-V1.74: surface symbol only for an access on a ground face with ground.at outside every f… | V01 §9 row J-V1.74 |
| V01-0541 | decision | 9 | J-V1.75: an entrance reserve from eager Entrance records sized by V02's porch rows (and at… | V01 §9 row J-V1.75 |
| V01-0542 | decision | 9 | J-V1.76: select opening places by V04's record fields (source opening + role access, or a … | V01 §9 row J-V1.76 |
| V01-0543 | decision | 9 | J-V1.77: fix a lone neighbourhood's layers through V04/V05 inputs (islands off, Features.s… | V01 §9 row J-V1.77 |
| V01-0544 | decision | 9 | J-V1.78: fabricSignature returns V12's town-side paired measures over a region over a mapp… | V01 §9 row J-V1.78 |
| V01-0545 | decision | 9 | J-V1.79: an epoch's clearing under a new raised strip is V06's; hood.fabric only re-reads … | V01 §9 row J-V1.79 |
| V01-0546 | decision | 9 | J-V1.80: sky unit run landings reported in a new SeamReport field landingsReached with por… | V01 §9 row J-V1.80 |
| V01-0547 | decision | 9 | J-V1.81: rim walk as one esplanade on the rim strip face and one street_trees row along it… | V01 §9 row J-V1.81 |
| V01-0548 | decision | 9 | J-V1.82: no undercity-parent rule of V01's own; II.7.5 (2)'s computed through districtsAbo… | V01 §9 row J-V1.82 |
| V01-0549 | decision | 9 | J-V1.83: the outline close-up raises the wings rung of every building inside, centre-out, … | V01 §9 row J-V1.83 |
| V01-0550 | decision | 9 | J-V1.84: lay a ground landing's destination lane before the template seeds, rank its attac… | V01 §9 row J-V1.84 |
| V01-0551 | decision | 9 | J-V1.85: type an enceinte closure arc as a walled wall run; J-VI.3's other kinds to water,… | V01 §9 row J-V1.85 |
| V01-0552 | decision | 9 | J-V1.86: a sky-* district's S7c kind factor from its ground counterpart (sky-island: highe… | V01 §9 row J-V1.86 |
| V01-0553 | decision | 9 | J-V1.87: every shade reader on a sky arena reads V05's shadeSky, none the ground pass-1 ma… | V01 §9 row J-V1.87 |
| V01-0554 | decision | 9 | J-V1.88: sky district count as a pure service skyDistrictCount(plotLandM2, districtHa) rea… | V01 §9 row J-V1.88 |
| V01-0555 | decision | 9 | J-V1.89: the raised way's add path runs as the epoch commit's operator after V06's clearin… | V01 §9 row J-V1.89 |
| V01-0556 | decision | 9 | J-V1.90: unit runner after generation only where the whole island is laid anew (raiseIslan… | V01 §9 row J-V1.90 |
| V01-0557 | decision | 9 | J-V1.91: lay each qualifying island crossing site's span first with deck ends as bridge po… | V01 §9 row J-V1.91 |
| V01-0558 | decision | 9 | J-V1.92: a lone neighbourhood's S7b (6)-(7) run after its one-district allocation and take… | V01 §9 row J-V1.92 |
| V01-0559 | decision | 9 | J-V1.93: surface access symbol in §8.2's states form for its stored or derived state (seal… | V01 §9 row J-V1.93 |
| V01-0560 | decision | 9 | J-V1.94: an echo or none island's relief class reads plain for terraceState, drawn class o… | V01 §9 row J-V1.94 |
| V01-0561 | decision | 9 | J-V1.95: a sky island's one part reads as part 0 in the parts table and wherever V01 says … | V01 §9 row J-V1.95 |
| V01-0562 | decision | 9 | J-V1.96: place a stack-hosted access's reserve rectangle at V03's stackAccessDoor(b, a) ov… | V01 §9 row J-V1.96 |
| V01-0563 | decision | 9 | J-V1.97: every calibratable own column takes V12 §3.11's default line (corpus at M-CAL), M… | V01 §9 row J-V1.97 |
| V01-0564 | decision | 9 | J-V1.98: NG as §7.6's zeroing parity preset (BCR-46) with entries on hood.constants alone … | V01 §9 row J-V1.98 |
| V01-0565 | decision | 9 | J-V1.99: hood.constants as one settings row in V11's settings form, each key a column with… | V01 §9 row J-V1.99 |
| V01-0566 | decision | 9 | J-V1.100: key ground access symbols by derived symbol kind accessSymbolKind(a) and hold ac… | V01 §9 row J-V1.100 |
| V01-0567 | decision | 9 | J-V1.101: the stage-2 switch's edit is the first-reader re-derivation from S2 with carry-o… | V01 §9 row J-V1.101 |
| V01-0568 | bcr | 10 | BCR-1 (f item 505): §14's @plat/hood line replaced (TemplateFabric over hood.templates, se… | V01 §10 row BCR-V1-1 → item 505 (ID-BCR; request text applied in the base) |
| V01-0569 | bcr | 10 | BCR-2 (f item 539): (a) replace NeighbourhoodRequest/Result with V1-2.4's (mode derived, n… | V01 §10 row BCR-V1-2 → item 539 (ID-BCR; request text applied in the base) |
| V01-0570 | bcr | 10 | BCR-3 (f item 280): stage graph inserts S7c as S7b's hook and S9b as S10a's hook after ste… | V01 §10 row BCR-V1-3 → item 280 (ID-BCR; request text applied in the base) |
| V01-0571 | bcr | 10 | BCR-4 (f item 294): (a) District.fabric set by S7c from context and provisional character,… | V01 §10 row BCR-V1-4 → item 294 (ID-BCR; request text applied in the base) |
| V01-0572 | bcr | 10 | BCR-5 (f item 210): Block gains content, squareType?, ringCentre?, voidCorner? and §2.7's … | V01 §10 row BCR-V1-5 → item 210 (ID-BCR; request text applied in the base) |
| V01-0573 | bcr | 10 | BCR-6 (f items 207, 208): Way.surface comment (derived at S10a's end unless edited); slope… | V01 §10 row BCR-V1-6 → item 207 (ID-BCR; request text applied in the base) |
| V01-0574 | bcr | 10 | BCR-7 (f item 298): strategy slot: S8 calls FabricStrategy.partition(district, seam, ctx) … | V01 §10 row BCR-V1-7 → item 298 (ID-BCR; request text applied in the base) |
| V01-0575 | bcr | 10 | BCR-8 (f item 284): A_k = Σ n(c,b,k) x plotArea(c,b) x (1 + λ_b) / plotShare(regime_k), λ_… | V01 §10 row BCR-V1-8 → item 284 (ID-BCR; request text applied in the base) |
| V01-0576 | bcr | 10 | BCR-9 (f item 300): S10a calls S10a.afterDrivers hooks after step (i) (S9b); (iii) square/… | V01 §10 row BCR-V1-9 → item 300 (ID-BCR; request text applied in the base) |
| V01-0577 | bcr | 10 | BCR-10 (f item 313): §4.9 rows court greening (extension; band probability x (0.5 + greene… | V01 §10 row BCR-V1-10 → item 313 (ID-BCR; request text applied in the base) |
| V01-0578 | bcr | 10 | BCR-11 (f item 340): §6.1 registry appends fabric.select, hood.dispatch, hood.template (ne… | V01 §10 row BCR-V1-11 → item 340 (ID-BCR; request text applied in the base) |
| V01-0579 | bcr | 10 | BCR-12 (f items 272, 570): Recipe gains product? (town/hood) and hood? HoodRecipe; closeup… | V01 §10 row BCR-V1-12 → item 272 (ID-BCR; request text applied in the base) |
| V01-0580 | bcr | 10 | BCR-13 (f item 285): outline template rows gain star, star_round, street_strip, plaza_fram… | V01 §10 row BCR-V1-13 → item 285 (ID-BCR; request text applied in the base) |
| V01-0581 | bcr | 10 | BCR-14 (f items 405, 406): hatched neighbourhood cell rewritten (per-facet hatch at world … | V01 §10 row BCR-V1-14 → item 405 (ID-BCR; request text applied in the base) |
| V01-0582 | bcr | 10 | BCR-15 (f item 417): §8.5 (1): a square-content block is such a square, its face drawn in … | V01 §10 row BCR-V1-15 → item 417 (ID-BCR; request text applied in the base) |
| V01-0583 | bcr | 10 | BCR-16 (f item 444): §10.4 gains 'Local names (volume 1)': S13a conditions every way's nam… | V01 §10 row BCR-V1-16 → item 444 (ID-BCR; request text applied in the base) |
| V01-0584 | bcr | 10 | BCR-17 (f item 422): §9.1 every HoodPlace (square, green, yard, court, opening) takes Labe… | V01 §10 row BCR-V1-17 → item 422 (ID-BCR; request text applied in the base) |
| V01-0585 | bcr | 10 | BCR-18 (f item 327): add rows F-TEMPLATE, F-DISPATCH, F-UNIT of V1-3.13 marked † [volume 1… | V01 §10 row BCR-V1-18 → item 327 (ID-BCR; request text applied in the base) |
| V01-0586 | bcr | 10 | BCR-19 (f items 474, 568): §12.4 rows S7c <= 1.8 ms and its reconcile <= 1 ms, S9b <= 5 ms… | V01 §10 row BCR-V1-19 → item 474, 568 (ID-BCR; request text applied in the base) |
| V01-0587 | bcr | 10 | BCR-20 (f item 542): (a) square row default carved (NG's own square, J-V1.6 correcting J-S… | V01 §10 row BCR-V1-20 → item 542 (ID-BCR; request text applied in the base) |
| V01-0588 | bcr | 10 | BCR-21 (f item 498): D-5 square default form is the carved plaza (J-V1.6); area pairs take… | V01 §10 row BCR-V1-21 → item 498 (ID-BCR; request text applied in the base) |
| V01-0589 | bcr | 10 | BCR-22 (f item 544): (a) S9b types every block of every fabric at generation as ordinary, … | V01 §10 row BCR-V1-22 → item 544 (ID-BCR; request text applied in the base) |
| V01-0590 | bcr | 10 | BCR-23 (f item 545): (a) open any district or outline; layout card is T8's fabric, content… | V01 §10 row BCR-V1-23 → item 545 (ID-BCR; request text applied in the base) |
| V01-0591 | bcr | 10 | BCR-24 (f item 523): S4 (c) reads '>= 90 % of squares at a junction with a tier-1 arm or t… | V01 §10 row BCR-V1-24 → item 523 (ID-BCR; request text applied in the base) |
| V01-0592 | bcr | 10 | BCR-25 (f item 373): closeup row's undo restores the former CloseupRecord, first closeup u… | V01 §10 row BCR-V1-25 → item 373 (ID-BCR; request text applied in the base) |
| V01-0593 | bcr | 10 | BCR-26 (f item 323): (a) stage 2's base changes are volume 1's BCRs; (b) interface StageHo… | V01 §10 row BCR-V1-26 → item 323 (ID-BCR; request text applied in the base) |
| V01-0594 | bcr | 10 | BCR-27 (f item 200): STAGE 2 row's depth cell: 'build depth: PART II with volume 1 (docs/v… | V01 §10 row BCR-V1-27 → item 200 (ID-BCR; request text applied in the base) |
| V01-0595 | bcr | 10 | BCR-28 (f item 540): add type Sample = {at PointCm (boundary sample on the run; interior o… | V01 §10 row BCR-V1-28 → item 540 (ID-BCR; request text applied in the base) |
| V01-0596 | bcr | 10 | BCR-29 (f items 383, 384): derivation-table row DR-V1.1: a district's fabric and blocks' c… | V01 §10 row BCR-V1-29 → item 384 (ID-BCR; request text applied in the base) |
| V01-0597 | bcr | 10 | BCR-30 (f item 541): Seam edge type union gains marsh; J-P37 typing: shore/bank -> water, … | V01 §10 row BCR-V1-30 → item 541 (ID-BCR; request text applied in the base) |
| V01-0598 | bcr | 10 | BCR-31 (f item 345): lineage-key rule: template seed ways and plazas take registered stage… | V01 §10 row BCR-V1-31 → item 345 (ID-BCR; request text applied in the base) |
| V01-0599 | bcr | 10 | BCR-32 (f item 301): §4.7 S9: squares from S7b claims larger than a block and S9b's dispat… | V01 §10 row BCR-V1-32 → item 301 (ID-BCR; request text applied in the base) |
| V01-0600 | bcr | 10 | BCR-33 (f item 369): §7.3 item 1: a district-scoped re-derivation's scope includes its bou… | V01 §10 row BCR-V1-33 → item 369 (ID-BCR; request text applied in the base) |
| V01-0601 | bcr | 10 | BCR-34 (f item 421): InstanceStyle gains pinKind? (read only for a hood pin); a hood pin's… | V01 §10 row BCR-V1-34 → item 421 (ID-BCR; request text applied in the base) |
| V01-0602 | bcr | 10 | BCR-35 (f item 349): quarter event gains fabric? (FabricStrategyId or auto) before expansi… | V01 §10 row BCR-V1-35 → item 349 (ID-BCR; request text applied in the base) |
| V01-0603 | bcr | 10 | BCR-36 (f item 560, merged with V04 BCR-36): catacomb entrance stair on the source's groun… | V01 §10 row BCR-V1-36 → item 560 (ID-BCR; request text applied in the base) |
| V01-0604 | bcr | 10 | BCR-37 (f item 554, merged with V04 BCR-29): AccessPoint.kind gains sinkhole, collapsed_sh… | V01 §10 row BCR-V1-37 → item 554 (ID-BCR; request text applied in the base) |
| V01-0605 | bcr | 10 | BCR-38 (f item 543): ring spacing: each further spacing = previous x g, one growth factor … | V01 §10 row BCR-V1-38 → item 543 (ID-BCR; request text applied in the base) |
| V01-0606 | bcr | 10 | BCR-39 (f item 290): generated raised ways' slot: viaduct committed inside S4's route solv… | V01 §10 row BCR-V1-39 → item 290 (ID-BCR; request text applied in the base) |
| V01-0607 | bcr | 10 | BCR-40 (f item 448): .dd2vtt line_of_sight adds retaining walls whose derived step >= vtt.… | V01 §10 row BCR-V1-40 → item 448 (ID-BCR; request text applied in the base) |
| V01-0608 | bcr | 10 | BCR-41 (f items 211, 212): District gains terrace?: on/off after parent? (item 110 (a) dec… | V01 §10 row BCR-V1-41 → item 211 (ID-BCR; request text applied in the base) |
| V01-0609 | bcr | 10 | BCR-42 (f items 245, 302): district-edge source in S10 before D's plots: for each D whose … | V01 §10 row BCR-V1-42 → item 302 (ID-BCR; request text applied in the base) |
| V01-0610 | bcr | 10 | BCR-43 (f item 245): RetainingWall persists chain, material, source, buttresses; the profi… | V01 §10 row BCR-V1-43 → item 245 (ID-BCR; request text applied in the base) |
| V01-0611 | bcr | 10 | BCR-44 (f item 350): quarter event gains terrace? on/off beside fabric; sugar expansion ga… | V01 §10 row BCR-V1-44 → item 350 (ID-BCR; request text applied in the base) |
| V01-0612 | bcr | 10 | BCR-45 (f item 580): S1 (5): on a sky island's arena (no S4, S5, S7) V01's unit run lays t… | V01 §10 row BCR-V1-45 → item 580 (ID-BCR; request text applied in the base) |
| V01-0613 | bcr | 10 | BCR-46 (f item 584, applied after items 376-377 and 581): read by both presets and by NG t… | V01 §10 row BCR-V1-46 → item 584 (ID-BCR; request text applied in the base) |
| V01-0614 | handoff | 10 notes | Cross-volume notes (1)-(2) to V05: §3.1 SKY runs 'after S7b, S7c included' (applied, SLR1-… | removed from V01 §10: hand-offs closed at their destinations (V01-XCONF-1, V01-NARR-5, SLR6-04); report §6 |
| V01-0615 | handoff | 10 notes | Notes (3)-(6): V04 undercity writes District.parent via districtsAbove(part, core), runs V… | removed from V01 §10: hand-offs closed at their destinations (V01-XCONF-1, V01-NARR-5, SLR6-04); report §6 |
| V01-0616 | handoff | 10 notes | Item 110 notes (7)-(15): V02 X24 answered (stack order, tier shadows, stairTreads); V06 C6… | removed from V01 §10: hand-offs closed at their destinations (V01-XCONF-1, V01-NARR-5, SLR6-04); report §6 |
| V01-0617 | handoff | 10 notes | Round-1 notes (16)-(23): V04 §3.1 hood line (standalone runs the tail with S0's inputs: be… | removed from V01 §10: hand-offs closed at their destinations (V01-XCONF-1, V01-NARR-5, SLR6-04); report §6 |
| V01-0618 | handoff | 10 notes | Round-3/4 notes (24)-(30): V05 §2.3 and §4.2 cite V1-3.10.3 (6),(6)(c); §3.12 crossing sit… | removed from V01 §10: hand-offs closed at their destinations (V01-XCONF-1, V01-NARR-5, SLR6-04); report §6 |
| V01-0619 | handoff | 10 notes | Notes (31)-(35): V11 table registry has no rows for way.surface and squares.quota and f it… | removed from V01 §10: hand-offs closed at their destinations (V01-XCONF-1, V01-NARR-5, SLR6-04); report §6 |
| V01-0620 | handoff | 10 notes | Round-5 notes (36)-(39): BASE-F item 313 should name all four of BCR-10's parts (now close… | removed from V01 §10: hand-offs closed at their destinations (V01-XCONF-1, V01-NARR-5, SLR6-04); report §6 |
| V01-0621 | decision | 11 | Q-V1-1 (should the default map change at M5 to show its neighbourhoods): recommendation ye… | V01 §11 (answered yes, J122) |
| V01-0622 | evidence | 12 | CONFIRMED/PLAUSIBLE: CONFIRMED by reading (base PART II, §1, summary, §4.1, §4.5-§4.7, §8.… | V01 §12 (one CONFIRMED/PLAUSIBLE paragraph; per-round reading lists to the validation records — HISTORY OUT) |
| V01-0623 | evidence | 13 | Fix list: nothing deliberately left for later; every critique finding (63 plus 26 item-110… | V01 §13 (empty; tallies to the validation records — HISTORY OUT) |
| V01-0624 | decision | integration | IN-V01-1/IN-V01-8 (J-VI.1, J-VI.23 clean room): §2's block-content type named BlockKind (f… | folded into the body at its home; V01 Integration notes table row |
| V01-0625 | decision | integration | IN-V01-4 (J-VI.2): DistrictContext.raised[].reason is the reason word derived from the rai… | folded into the body at its home; V01 Integration notes table row |
| V01-0626 | decision | integration | IN-V01-5 (J-VI.9): V1-3.17.8's recommendation adopted: the aqueduct's terminal outlet is a… | folded into the body at its home; V01 Integration notes table row |
| V01-0627 | term | 3.2 | χ̃ (provisional character): item 72's character vector computed from DistrictContext befor… | V01 §3.2 |
| V01-0628 | term | 2.3 | DistrictContext: the read-only per-district context S7c and S9b read (shade, terrace, chai… | V01 §2.3 |
| V01-0629 | term | 2.1 | fabric (District.fabric, fabricParams): the layout kind S7c chooses per district, one of N… | V01 §2.1 |
| V01-0630 | term | 2.2 | TemplateRow (table hood.templates): the editable row per template (requires.* eligibility,… | V01 §2.2 |
| V01-0631 | term | 3.4.1 | template face: the face of a district a template layout is laid in, cut by seed primitives… | V01 §3.4.1 |
| V01-0632 | term | 3.4 | seed primitive: spine, ring, plaza or fan, the four building blocks of the template machin… | V01 §3.4 |
| V01-0633 | term | 3.3.7 | templateLandM2(D, row): the land a template claims in S7b (1) (BCR-4 (b)).… | V01 §3.3.7 |
| V01-0634 | term | 2.2 | HoodPlace: a named local place (square, green, yard, court) of a neighbourhood (BCR-5).… | V01 §2.2 |
| V01-0635 | term | 3.8 | hood pin (HoodPin, HoodPinRow): a derived point feature S9b places in a block (well, shrin… | V01 §3.8 |
| V01-0636 | term | 2.5 | close-up (CloseupParams, CloseupRecord): the persisted elaboration of one district or outl… | V01 §2.5 |
| V01-0637 | term | 3.8.9 | outline close-up: a close-up on a drawn outline with no district under it (V1-3.8.9).… | V01 §3.8.9 |
| V01-0638 | term | 3.10 | unit run: the generation path for a close-up with no base under it (standalone neighbourho… | V01 §3.10 |
| V01-0639 | term | 3.10.1 | standalone neighbourhood document (Recipe.product = 'hood'): a document holding one neighb… | V01 §3.10.1 |
| V01-0640 | term | 2.7 | pseudo-district: the one-district allocation the unit run makes for a standalone document … | V01 §2.7 |
| V01-0641 | term | 3.10 | plantRimWalk: the island rim-walk planter the unit run calls (also resize and rim reshape)… | V01 §3.10 |
| V01-0642 | term | 3.15 | NG preset: the zeroing parity preset selecting Neighbourhood Generator's own rules, its en… | V01 §3.15 |
| V01-0643 | term | 3.14 | hood.constants: the one settings row every numeric rule of V01 reads (item 23).… | V01 §3.14 |
| V01-0644 | term | 2.3 | terraceState(D) = DistrictContext.terrace: declared, relief row or S1 site primitive (item… | V01 §2.3 |
| V01-0645 | term | 3.17.1 | contour series: the stepped row's terrace contour lines (with a ravine's two flanks) item … | V01 §3.17.1 |
| V01-0646 | term | 3.17.3 | under-deck strip: the strip under a raised way's deck S7b (1) and §4.6's holed laws treat … | V01 §3.17.3 |
| V01-0647 | term | 5.1 | hatched: V01's style family (the NG look) for close-ups; draws a stack in stack order and … | V01 §5.1 |
| V01-0648 | term | 1b | fabricSignature(outline): the fabric signature of an outline (read by V04's ruins, II.7.5 … | V01 §1b |
| V01-0649 | term | 2.4 | SeamReport: the seams between a template face and the base's fill (portals, ring-radial st… | V01 §2.4 |
| V01-0650 | term | 3.8.2 | entrance reserve: the rectangle S9b keeps free in front of a main entrance (and an externa… | V01 §3.8.2 |
