# Rewrite V02 — the coherence, cohesion, wiring and elegance pass over volume 2 (buildings)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-V02; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/rewrite-V02`; started 2026-09-29, continued in the cloud checkout 2026-10-03)
- P1 inputs gathered (canon unit V02, 10 conflicts, 4 wiring gaps, E-24/E-27, ID-WX/ID-DUPDEF, 14 hand-offs, 47 + 21 edges, 28 combinations, f items): done
- P2 volume rewritten part by part (`work/rewrite-V02/parts/00-head` … `27-s11to13`, with `19b-s3-18` the new edges section): done
- P3 assembly to `new/volumes/V02-buildings.md`: done
- P4 sweeps (narration, terms, ids, references, f/g coverage, words, doc_checks): done
- P5 mapping table, this report, results JSON, LANDED: done

**Outputs.** `docs/validation/coherence/new/volumes/V02-buildings.md` (the complete new text; same title line, same section
structure §0–§13 and *Integration notes*, its one marker line kept); this report; `docs/validation/coherence/results/coherence_rewrite-V02.json`.
Work files: `docs/validation/coherence/work/rewrite-V02/` (the parts, the routing extracts `agreement-v02.md`,
`conflicts.md`, `edges-v02.md`, `elegance.md`, `f_routing.txt`, `wiring-all.md`); receipts `docs/validation/coherence/receipts/V02/`.

## 1. Sizes

Counted as the canon counts (whitespace-separated tokens): **103 630 → 84 389 words (−18.6 %)**; bytes 637 179 → 505 227
(622.2 → 493.4 KB).

| part of the volume | before | after | source of the change |
|---|---|---|---|
| title, banners, citation note | 1 439 | 137 | narration (nine banner lines, the revision and fold ledgers) |
| §0–§8 body (without the new §3.18 and §7.8) | 69 675 | ≈ 67 750 | narration ids in parentheses (≈ 990), restatement to references (§4.4's lifecycle table → §7.4's row, §6's counts and times → §1.1 / §12.5 / §12.7, V02-RESTATE-1 … -5, ≈ 650), verbose prose (≈ 290) |
| §3.18 edges and §7.8 their tests (new, principle (11)) | — | 4 737 | new design: the edge and combination catalogue routed here, with T-V2-54 and T-V2-55 |
| §9 decisions | 8 537 | 7 890 | narration labels and superseded text (E-24 marks), J-V2.58 out |
| §10 base change requests | 9 988 | 837 | restatement: 42 request blocks quoting base text → one pointer table (the text is the base's, file f) |
| §11 – §13, *Integration notes*, reconciliation and finalization ledgers | 13 991 | 3 037 | narration (round ledgers, receipts' md5s, disposition talk, per-round "no owner question" paragraphs) |

Share of the ≈ 24 000 words removed, by source: **narration ≈ 58 %**, **restatement ≈ 40 %**, **duplicated mechanisms
< 1 %** (E-27's one `valleyReach`), **verbose prose ≈ 2 %**. Nothing was removed from content: no rule, case, value, bar,
record field, lifecycle row, test, owner rule or reasoned decision.

**Below the band (25–40 %), and why.** Without the new principle-(11) design (4 737 words), the cut is 23.3 %. The rest is
irreducible content: §3.10's authored rows at V11's four anchors (≈ 9 800 words of values the massing reads), §3.5's
step-by-step construction (≈ 6 200), §1b's wiring table (≈ 4 700, principle (7)), §3.15's stepped construction
(≈ 4 100), the reasoned decisions of §9 (≈ 7 900) and the tests of §7 (≈ 6 800). No part shrank by more than half except
§10 (a pointer table by the canon's own ruling) and the tail of ledgers (narration by ruling).

## 2. What the canon routed here, and where it is closed

* **REFERENCE (45).** Each restated base or volume fact now cites its home. Nine of them (`[REF-HOME]` in the mapping
  table: V02-0260, -0261, -0269, -0270, -0271, -0275, -0276, -0278, -0280) are this volume's own statements whose "home"
  the canon matched only *near*: the base and V09/V10 hold a one-line summary that **cites V02** for them (§8.2's
  `roofConstruction` comment, §8.6's roofscape paragraph, §11.1's SVG and CityJSON rows, V09 §3.5 and T-V9-42, V10 §3.9's
  generic query). Making V02 point back would leave the facts with no home, so V02 states them once and the summaries
  point here — **marked for the adjudicator (REF-HOME)**: single source holds in this direction.
* **BCR pointers (42 requests; the canon's 45 lines with the two double mappings).** §10 is one pointer table, BCR-V2-01 …
  BCR-V2-42 → items 216 … 231 (BCR-V2-14 → items 376 and 377; BCR-V2-20 → 524 and 568; BCR-V2-37 → 525 and 568).
* **Terms.** G-lot: 0 hits (no `lot` outside quotations; `BuildingInput` read with its base fields). G-firstmap: 0. G-cite:
  every citation `Vnn §x.y`, the base bare `§x.y`; 40 continuation chains given their prefix ("V02 §4.2, V02 §4.3"), two
  `V2 §` forms fixed.
* **Conflicts (10)** — section 3 below.
* **File f items** cited as base text, never restated: 216–231, 234, 238, 242, 244, 246, 259, 260, 261, 270, 303, 304, 305,
  309, 318, 328, 332, 333, 341, 346, 351, 370, 371, 376, 377, 385, 402, 406, 419, 426, 427, 432, 435, 436, 447, 449, 483,
  499, 500, 505, 522, 524, 525, 567, 568, 578 (every item of the canon's list included). **File g:** no part of items 111–113
  is routed to V02; items 102–110 are cited as the owner's rules the volume already carries; item 111's oasis reaches V02
  only as water (§3.18 (f)).
* **Wiring gaps (4).** W-DOS-10b — §1b's dossier table names each row's derivation row (DR24, DR15, DR10, DR17, DR6, DR7,
  DR9, DR32). W-IF-06 — §1b's `terrace.wallBandCm` row names its consumer (the wing datum's wall-side sample in `deriveBase`
  and `rebaseStack`; V03's walk-out reads its own band). W-HOOK-02 — §1b names `BuildingGenerator.compose` (§2.6) as V02's
  end of the stage-3 hook. V02-WGAP-1 — §5.3's style-cell table: every literal value of the paint programs (`ridgeWeight`,
  `hipWeight`, `partWeight`, `stoneM` / `stonePitchM`, `fmHueW`, `fmHatchPx`, `treadWeight`, `treadStopShare`,
  `treadMinPx`) is a parameter of its program's entry in the sheet's `programs` (§8.2), its value there.
* **Wiring, beyond the routed gaps.** Every bend of §4 now has an id in §1b's one set (V09-XAGREE-3): the six unnamed
  bends of §4.2–§4.3 took ids (`bend.wing.clip`, `bend.wing.trim`, `bend.tower.move`, `bend.dormers.count`,
  `bend.porch.kind`, `bend.room.extent`) beside the five the earlier part had named (`bend.tiers.form`, `bend.tiers.top`,
  `bend.tier.height`, `bend.deck.floors`, `bend.room.host`); each is produced in §4 and consumed by V09 §4.9's rows, V10's
  clerk and the why provider (`massing/bend/<id>`).
* **Elegance (2)** — section 4. **Id rulings:** ID-WX (X rows stay volume-local, cited elsewhere "V02 Xn"; IN notes folded,
  their ids only in the validation records); ID-DUPDEF (one definition per id: J 107 rows, T-V2-1 – T-V2-55, X1 – X33, all
  unique).
* **Owner question.** Q-V2-1 answered "not now" (J122; J121: the map follows SettlementForge's decisions; the port reads no
  shape field) — §11.
* **Cohesion.** §8 agrees with §16 and INDEX §4's combined order (M6 after M5; the plan rung's P0, P1, P3 after M4 with
  `facadeBays` built first; M6-U beside); the context vector, evolution, dossier and editing rules are cited at their base
  homes; every test and decision id unique; every reference resolves (section 7).
* **Disagreements (7).** `BaseWing`, `BuildingInput`, `PathShapeRow` (MC-01: no `lot`; `PathShapeRow` the alias of
  `MassingFamilyRow` the model declares, cited); `DriftBounds` (MC-11: declared at §2.6, V02 cites); `J-V7.82`
  (V02-ICONF-1: the table's home is V02 §3.10.5, V07 cites it).
* **Fix list (34: V02-0480 – V02-0513).** §13 states nothing open; its per-round paragraphs are out (validation records);
  X1 – X33 are one hand-off table worded as current rules.
* **Hand-offs to close here (14)** — closed in the text: V06 X3 (V02 §3.14.5 (c), new sentence), V06 X24 (X23), V08 X6
  (§1b's culture row through DR15 and X17), XV-V9-6 (V02 §3.14.5 (d), §4.5, §4.6 (7)), XV-V9-8 (V02 §8.5: V09's AP10 built
  with M6c, priced in V09's §8), CVR-V10-8 (V02 §4.6 (7): `massing/stack`, `deck/landmarks/<head|mid>`), X-V11-5 (V02
  §3.15.4 and X17), X-V11-7 (V02 §3.16 (3)), X-V11-9 (X32), X-V12-2 (V02 §7.5: a `PanelSpec` on V12 §3.9's engine,
  `D5Pair` variants of item 500, `Baseline` rows under `'FM'`), X-V12-11 (T-V2-50 a NoOpPin on V12 §3.7.8; §1b), X-V12-12
  (V02 §8.5's M3a-V2 row with item 229), X-V12-15 (V02 §3.10.10's `BenchBarDef` table), X-V12-18 (V02 §3.10.10's lines,
  one entry with `stages` in order).
* **Edges (47 UNDEFINED, 21 UNTESTED) and 28 combinations** — the new §3.18: four class rules ((a) degenerate geometry,
  (b) rungs THORP – the METROPOLIS cap, (c) toggles and presets, (d) save, load, undo, redo, regenerate, migrate), a
  per-mechanism table over every mechanism of §2–§5 (the catalogue's M-V02-… entries, each row naming its outcome, its rung
  and its test) and a combinations table covering all 28 pairs (cliff, steep, river, coast, harbour, moat, bridge, raised
  way, square, oasis, the frame, a neighbourhood, a terraced ward, a lock, an undo × composed, tiers and crypt); tests
  **T-V2-54** (clauses (a)–(j)) and **T-V2-55** ((a)–(j)) in the new §7.8, their sub-fixtures in §7.1, their milestones in
  §8.3. New defined outcomes (design, not changes): an empty `entranceOn` lays `obb(H)`'s frame with a `null` hint; a
  composed wing on steep ground keeps its ring with the skirt, reported `skirtHigh` above `skirtMaxCm` (never split along the
  contour); an op naming a missing key applies to nothing in a live dry run; a no-op `setMassing` / `setComposition` logs
  no event.
* **Open findings routed here (40)** — section 5.

## 3. Conflicts resolved (10)

| id | ruling | applied at |
|---|---|---|
| MC-01 | `lot` retired outside quotations; `BuildingInput` read by its base fields | no `lot` in the text; §1b, §2, §3.2 use `plot` |
| MC-11 | every base record's type declared in the base | §1b's `DriftBounds` row "declared at §2.6"; §2.1 cites §2.6 for every record it once declared |
| V01-ICONF-4 / V02-XCONF-1 | the soffit bound over a crossed way is item 244's clearance rule (the way's held `clearanceCm`, else V11's `raisedWays.structure.clearanceCm` for the crossed class) | V02 §3.17 (b); J-V2.89 |
| V02-ICONF-1 | `composition.classFamily`'s home is V02 §3.10.5; V07 cites it | V02 §3.10.5; J-V2.56 (amended by J-V2.96), J-V2.96; X13 |
| V02-ICONF-2 | the effort stated once with the per-milestone rows as its breakdown | V02 §8.3 and §8.5's rows; §8.5's *Effort*: the volume 22.5–32.5 pw, M6 18.25–27.5, M3a-V2 2–2.75, spikes 2.25 |
| V02-ICONF-3 | R5's last rung a bend (the warp's step held at the last lawful fraction, named in the dry run) | V02 §8.4 R5 |
| V02-ICONF-4 | round 1's 0.25–0.5 pw inside M6; the hole sentence's cost inside M3a-V2's 2–2.75 | V02 §8.3's row "M6, across M6a–M6c"; §8.5's *Effort* |
| V09-XAGREE-3 | V02 §1b's bend ids are the one set; V09 §4.9 one row per id | V02 §1b (27 ids, every bend of §4 named under one); cross-part note to V09 below |
| CANON-C03 | every volume's §11 a table of decisions | V02 §11: Q-V2-1 answered (J122, J121) |

(MC-01 covers five of the seven agreement disagreements, MC-11 and V02-ICONF-1 one each; ten conflict ids in nine rows.)

## 4. Elegance rulings applied, with their equivalence lists

**E-24 — one mark for a superseded or amended decision** (home: each volume's §9). Applied in V02 §9: J-V2.73 and
J-V2.76 "Superseded by J-V2.79."; J-V2.32 "Amended by J122."; J-V2.46 "Amended by J-V2.108."; J-V2.56 "Amended by
J-V2.96."; the in-row amendment labels of J-V2.3, -13, -35, -52, -61, -68, -72, -75 folded into the row's current choice
(each row's own later text, not another row).
- [x] no row dropped — J-V2.73 and J-V2.76 stay as marked rows (the canon's NARR-3 asked to drop them; E-24's equivalence
  list keeps them, and E-24 governs; their content is in J-V2.79, which keeps the reason). J-V2.58 is not a superseded
  decision but a process record (NARR-3), removed; its number is noted unused in §12's census.
- [x] the governing row keeps the reason — J-V2.79, J-V2.108, J-V2.96 and J122's record carry the reasons.

**E-27 — one `valleyReach(X, Y)` with two modes** (home: V02 §3.7).
- [x] the integer form's byte-identity — `valleyReach(X, Y, 'int')` feeds `facadeBays` in integer centimetres (V02 §3.7,
  §2.4's declaration, §3.12's arithmetic; T-V2-13).
- [x] the float form's view-only status — `valleyReach(X, Y, 'float')` is read only by the roofscape (V02 §5.2 step 2,
  float64, view data, §3.12), which now cites §3.7 instead of restating the formula.

No other unification was made.

## 5. Open findings routed here (40) — every one fixed in the text

| finding | fixed at |
|---|---|
| VOL-V01-V02-RESTATEMENTS-007, V02-RESTATE-1 | §1c's lattice row cites `minEdge` and `attractCm` at §2.2 `LatticeSpec` / §3.2, no values |
| VOL-V01-V02-RESTATEMENTS-008, V02-RESTATE-2 | §3.5 M13 and §3.18 (a) cite `minEdge` without its value |
| VOL-V01-V02-RESTATEMENTS-009, V02-RESTATE-4 | §6's intro and rung table cite §1.1's counts and §12.5's first-map times; only V02's added costs stay |
| VOL-V01-V02-RESTATEMENTS-010, V02-RESTATE-5 | T-V2-7's cathedral clause reads the `cathedral` and `church` `HeightsRow`s (V11 §3.6.4) |
| VOL-V01-V02-RESTATEMENTS-011, V02-RESTATE-3 | §5.3 and X14 cite V01 §5.1's one sentence on the NG parity sheet |
| V02-ICONF-1 – -4, V02-XCONF-1 | section 3 |
| V02-ELEG-1 | E-27, section 4 |
| V02-WGAP-1 | §5.3's style-cell table |
| V02-MISSING-1 | §11 |
| V02-TERM-1 | G-cite throughout |
| V02-TERM-2 | §9 in id order (J-V2.77, J-V2.78 in place) |
| V02-TERM-3 | T-V2-36: "the ground wings over the crypt's ring" |
| V02-DEFER-1 | §8.1, §8.3: the decided order (J122; `facadeBays` built first after M4, priced in M6b) |
| V02-DEFER-2 | J-V2.71's "later owner rule" clause out; J-V2.32 rewritten to the decided order |
| V02-DEFER-3 | X27 reads V11's `arena` plot row as landed (X32); X28's bridge mid-span slot stated as item 246 carries it; X26 closed |
| V02-NARR-1 | one marker line under the title |
| V02-NARR-2, V02-NARR-9 | the revision, fold and reconciliation ledgers and the finalization section deleted |
| V02-NARR-3 | §9's labels and superseded texts out; E-24 marks; J-V2.58 out |
| V02-NARR-4 | §10 one pointer table; §11 one answered question |
| V02-NARR-5 | §12 one CONFIRMED / PLAUSIBLE list with one census line |
| V02-NARR-6 | §13 keeps the hand-off table only |
| V02-NARR-7 | every X row worded as the current rule, "Landed" history out; **the rows are kept**, not dropped, because other units cite them (V02 X1, X6, X10–X14, X16, X17, X19, X21–X24, X27, X29 are cited from the base and the volumes; dropping them breaks principle (4)'s resolving references) — marked for the adjudicator with that reason |
| V02-NARR-8 | the IN notes folded into the body; the review markers inside the volume retired (the one marker line stays) |
| V02-BREF-1 | §12 cites `docs/validation/coherence/receipts/V02/` (moved in on 2026-09-29, re-executed on 2026-10-03 with identical output); backup and doc_checks-delta citations out |
| V02-AMBIG-1 | §3.13: F-COMPOSE (2) carries the porch-meets-own-wing case; (4) keeps the identity composition intact |
| V02:IN-V02-1 – IN-V02-5 | X20 (J-VI.7); V02 §3.15.3 / item 371, §3.17 (a), §4.2 step 2 and §4.3 (IN-V02-2); §4.6 (7) (IN-V02-3); §4.1 and §3.15 (IN-V02-4, J-VI.4 / J-VI.5); X28 and §3.16 (1)–(2) (IN-V02-5) |

## 6. Renumberings and new ids

No renumbering. New: §3.18 (edges) and §7.8 (their tests); **T-V2-54**, **T-V2-55**; the bend ids `bend.wing.clip`,
`bend.wing.trim`, `bend.tower.move`, `bend.dormers.count`, `bend.porch.kind`, `bend.room.extent` (with the earlier part's
`bend.tiers.form`, `bend.tiers.top`, `bend.tier.height`, `bend.deck.floors`, `bend.room.host`); the report name
`skirtHigh`; `TiersOp` named as the `tiers` member of `MassingOp` (one type, same fields). Retired: the number J-V2.58 (a
process record). X1 – X33 keep their numbers (ID-WX).

## 7. Checks run (2026-10-03)

* Narration sweep (rounds, revisions, critique and seam ids, "Landed", "formerly"): 0 hits in the body; the words
  "critique" and "seam" remain only where §13 names the validation records and where a tower roof's seam lines are drawn.
* Ids: J-V2 107 rows defined, every cited J-V2.n defined; T-V2-1 – T-V2-55 defined once each (T-V2-31 and -32 as §7.4's
  paragraph heads); X1 – X33 defined, every cited Xn defined; BCR-V2 only in §10.
* References: every `V02 §…` resolves to a heading or numbered subsection of the new text (94 targets); every `Vnn §…`
  resolves in the target volume (the new text where landed — V01, V03, V04, V05, V07 — else the current volume); every
  bare `§…` resolves in the base (`docs/ARCHITECTURE.md` with the landed base parts). The base's and the volumes' inbound
  citations of V02 (sections §2.1 – §13, X1 – X33, T-V2-n, J-V2.n) all still resolve: the section structure is unchanged.
* `docs/validation/bench/doc_checks.py --doc …/new/volumes/V02-buildings.md`: C1 0, C2 0, S1 0 (as before the pass);
  C3 563 hits (705 before) — generic prose and number runs; C4 1 reviewed; S2 234 base pointers (277 before). **Provisional:**
  the reference corpus (captures/, research/patreon, research/devlogs, research/ftg-docs, research/external) is absent from
  this checkout, so the tool reports its clean-room result NOT authoritative; re-run on the machine that holds it.
* Receipts re-executed: `medians.py` (min 0.91, max 1.31, as V02 §3.10.3), `medians_new.py` (identical output),
  `stepped_receipt.py` (lines 1–35 identical).

## 8. CROSS-PART NOTES

* **V09 (V09-XAGREE-3; X21).** V02 §1b's bend row is the one set of V02's bend ids — `bend.tiers.stepped`, `.none`,
  `.axial`, `.internal`, `.count`, `.step`, `.form`, `.top`; `bend.tier.height`; `bend.stack.groundWing`, `.roof`,
  `.base`; `bend.deck.single`, `.floors`, `.basement` (V03's); `bend.building.remove`; `bend.row.plotLine`;
  `bend.wing.grow`, `.clip`, `.trim`; `bend.tower.move`; `bend.family.nearest`; `bend.dormers.count`; `bend.porch.kind`;
  `bend.room.passage`, `.host`, `.extent` — each produced in V02 §4.2, §4.3 or §4.6. V09 §4.9 holds one message row per
  id; its keys with no V02 producer retire to the V02 id that covers the case: `bend.tiers.flights` → `bend.tiers.axial`;
  `bend.stack.internalSolid` → `bend.tiers.none` / `bend.tiers.axial`; `bend.stack.removeStair` → `bend.tiers.internal`
  / `bend.tiers.none`; `bend.stack.addWing` → `bend.stack.groundWing`; `bend.stack.deck` → `bend.deck.single`;
  `bend.stack.notStepped` → `bend.tiers.stepped`; `bend.tier.height`, `bend.deck.floors`, `bend.tiers.count` and
  `bend.tiers.step` stay (V02 produces them). T-V9-59 and V09 §4.20.5 re-point. T6's `bend.deck.class` stays V09's.
  XV-V9-8: V09's AP10 is built with V02's M6c and priced in V09's §8 (V02 §8.5 states it).
* **V10 (X22).** The clerk words every V02 bend through V09's rows and says its line and alternatives; the why facts
  `massing/bend/<id>`, `massing/stack/*`, `massing/deck` (V02 §4.5, §4.6 (7)) and the registry paths `massing/stack`,
  `deck/landmarks/<head|mid>` (CVR-V10-8) are V02's; a clerk call naming a wing by a role the building lacks gets the
  not-found line naming the roles present (V02 §3.18 (e)).
* **V11.** X-V11-5 is closed at V02 §3.15.4 and X17 (`roster.specialisations`, S11's specialisation draw, item 259);
  X-V11-7 at V02 §3.16 (3); X-V11-9 at X32. X16 reads `deckOk` per use. X27's plot row is V11 §3.6.1's `arena` family.
* **V06.** X3 is folded at V02 §3.14.5 (c) (the rank re-run inside epoch ops, the trim on `Basement.crypt.ring` only,
  the lift unmoved); X24 is X23's deck clause.
* **V03.** V02 §3.18 (f) cites V03's `basementDoor(b)` for a crypt's walk-out on a slope and on a terraced ward; the
  decided order (V03 §11 Q1, J122) is V02 §8.1's: `facadeBays`, `endMarginM` and `bayM` built after M4, before P1,
  priced in V02's M6b; X18 and X30 are worded as current rules.
* **V01.** X14 cites V01 §5.1's one sentence on the NG parity sheet (V02 no longer restates it); X24, X31 as worded.
* **V12.** X-V12-2 is closed at V02 §7.5; T-V2-54 and T-V2-55 are hard conformance bars (no `BenchBarDef` registration,
  as T-V2-1 – T-V2-21); V02's eleven registrations are unchanged (V02 §3.10.10).
* **determinism (§7.4, §5.2).** §7.4's `setMassing / setComposition` row may absorb the two clauses V02 §4.4 adds to it
  (an edited dormer row is a fixed input to the plan rung; a secondary porch migrates by its entrance ordinal); until it
  does, V02 §4.4 is their one home. §5.2's F-MASSING and F-COMPOSE rows may add T-V2-54 to their test cells.
* **scope (§16, §13.2, INDEX §4).** V02's line: the volume 22.5–32.5 pw — M6 18.25–27.5, M3a-V2 2–2.75 (the hole sentence
  included), spikes 2.25; M6c also carries V09's AP10 outside V02's total. §13.2's pointer row covers T-V2-1 – T-V2-55.
  The order is J122's as INDEX §4 states it; V02 §8.1 agrees.
* **rendering (§8.2).** V02-WGAP-1's cells are named at V02 §5.3 as parameters of the paint programs' entries in each
  sheet's `programs` (`ridgeWeight`, `hipWeight`, `partWeight`, `stoneM`, `stonePitchM`, `fmHueW`, `fmHatchPx`,
  `treadWeight`, `treadStopShare`, `treadMinPx`) with their values, as the rendering report's note asked; §8.11's T-ER-02
  is cited for a facet or tread below one pixel.
* **model.** No change needed: §2.6 declares every record V02 reads and points to V02 §2.1 – §2.3 for meanings (MC-01,
  MC-11 agree).
* **INDEX.** No V02 change beyond §16's line; INDEX §6's row for Q-V2-1 ("not now: one-way truth, and SettlementForge has
  no shape data (J122)") agrees with V02 §11, which adds that the map follows SettlementForge's decision (J121).

## 9. Marked for the adjudicator

* **REF-HOME** (9 REFERENCE items: V02-0260, -0261, -0269, -0270, -0271, -0275, -0276, -0278, -0280). The canon routed them
  as restatements of a base or V09/V10 home, matched *near*. At those homes the base and the volumes hold one-line
  summaries that cite V02 §4.5, §4.6, §5.1 – §5.6 for the details, so V02 is the home; turning V02's text into a pointer
  would leave the facts stated nowhere. Kept in V02, each citing the summary's section.
* **V02-NARR-7** (X rows of landed items). Kept as rows worded as current rules, not dropped, because sixteen of them are
  cited from other units (principle (4): every cross-reference resolves).
* **V02-NARR-3 vs E-24** (J-V2.73, J-V2.76). Kept as one-mark rows ("Superseded by J-V2.79.") per E-24's equivalence list
  ("no row dropped"); their content is out.

## 10. CONFIRMED versus PLAUSIBLE (this rewrite)

**CONFIRMED** (executed): the narration, term, id and reference sweeps of section 7 over the assembled file; the receipts'
re-execution; the word and byte counts; every patch applied to its part matched its text exactly once (the patch script's
counts); the base texts cited for §4 (§7.1's event union and §7.4's row, determinism part 03), §5 (§8.2's `StyleSheet`,
§8.6's roofscape paragraph, §11.1's rows and *Layers* rule, rendering parts 01 and 03), §6 (§12.7's stage-3 hook), §3.18
(§3.4's `obb` / `lir` contract, §4.7's hard runs, §5.2's F-SITEPLAN, §2.6's skirt rule) and file f items 260, 483, 567
were read at source in the landed base parts and the amendments file.
**PLAUSIBLE**: that the other editors running beside this one land their halves of the cross-part notes as written (each
is routed by the canon); that the outcomes newly defined in §3.18 hold when T-V2-54 and T-V2-55 run; the doc_checks
result until it is re-run with the reference corpus present.

## 11. MAPPING TABLE — every inventory id of V02 (541) → where it now lives

| inventory id | where it now lives |
|---|---|
| V02-0001 | V02 §0 |
| V02-0002 | V02 §0 |
| V02-0003 | V02 §0 |
| V02-0004 | V02 §0 |
| V02-0005 | V02 §1a |
| V02-0006 | V02 §1a |
| V02-0007 | V02 §1a |
| V02-0008 | V02 §1b |
| V02-0009 | V02 §1b |
| V02-0010 | V02 §1b |
| V02-0011 | V02 §1b |
| V02-0012 | V02 §1b |
| V02-0013 | V02 §1b |
| V02-0014 | V02 §1b |
| V02-0015 | V02 §1b |
| V02-0016 | V02 §1b |
| V02-0017 | V02 §1b |
| V02-0018 | V02 §1b |
| V02-0019 | V02 §1b |
| V02-0020 | V02 §1b |
| V02-0021 | V02 §1b |
| V02-0022 | V02 §1b |
| V02-0023 | V02 §1b |
| V02-0024 | V02 §1b |
| V02-0025 | V02 §1b |
| V02-0026 | V02 §1b |
| V02-0027 | V02 §1b |
| V02-0028 | V02 §1b |
| V02-0029 | V02 §1b |
| V02-0030 | V02 §1b |
| V02-0031 | V02 §1b |
| V02-0032 | V02 §1b |
| V02-0033 | V02 §1b |
| V02-0034 | V02 §1b |
| V02-0035 | V02 §1b |
| V02-0036 | V02 §1b |
| V02-0037 | V02 §1b |
| V02-0038 | V02 §1b |
| V02-0039 | V02 §1b |
| V02-0040 | V02 §1b |
| V02-0041 | V02 §1b |
| V02-0042 | V02 §1b |
| V02-0043 | V02 §1b |
| V02-0044 | V02 §1b |
| V02-0045 | V02 §1b |
| V02-0046 | V02 §1b |
| V02-0047 | V02 §1b |
| V02-0048 | V02 §1b |
| V02-0049 | V02 §1b |
| V02-0050 | V02 §1b |
| V02-0051 | V02 §1b |
| V02-0052 | V02 §1b |
| V02-0053 | V02 §1b |
| V02-0054 | V02 §1b |
| V02-0055 | V02 §1b |
| V02-0056 | V02 §1b |
| V02-0057 | V02 §1b — consumer named (W-IF-06) |
| V02-0058 | V02 §1b |
| V02-0059 | V02 §1b |
| V02-0060 | V02 §1b |
| V02-0061 | V02 §1b |
| V02-0062 | V02 §1b |
| V02-0063 | V02 §1b |
| V02-0064 | V02 §1b |
| V02-0065 | V02 §1b |
| V02-0066 | V02 §1b |
| V02-0067 | V02 §1b |
| V02-0068 | V02 §1b |
| V02-0069 | V02 §1b |
| V02-0070 | V02 §1b |
| V02-0071 | V02 §1b |
| V02-0072 | V02 §1b |
| V02-0073 | V02 §1b |
| V02-0074 | V02 §1b |
| V02-0075 | V02 §1b |
| V02-0076 | V02 §1b |
| V02-0077 | V02 §1b |
| V02-0078 | V02 §1b |
| V02-0079 | V02 §1b |
| V02-0080 | V02 §1b |
| V02-0081 | V02 §1c |
| V02-0082 | V02 §1c |
| V02-0083 | V02 §1c — values cited, not restated (V02-RESTATE-1) |
| V02-0084 | V02 §1c |
| V02-0085 | V02 §1c |
| V02-0086 | V02 §1c |
| V02-0087 | V02 §1d |
| V02-0088 | V02 §1d |
| V02-0089 | V02 §1d |
| V02-0090 | pointer to §2.1 (V02 §2 intro) |
| V02-0091 | V02 §2.1 (type declared at §2.6, cited; the role meanings stay here, as §2.6 points to V02 §2.1) |
| V02-0092 | V02 §2.1 (type declared at §2.6, cited; meanings V02 §3.3) |
| V02-0093 | V02 §2.1 (fields declared at §2.6, cited; writers and readers here) |
| V02-0094 | V02 §2.1 (MassingRef declared at §2.6, cited; writers and readers here) |
| V02-0095 | V02 §2.1 (DriftBounds declared at §2.6, cited; MC-11) |
| V02-0096 | V02 §2.5 (BaseWing.partName row; migrate cell points to V03 §2.5) |
| V02-0097 | V02 §2.1 (declared at §2.6, cited) |
| V02-0098 | V02 §2.1 |
| V02-0099 | V02 §2.1 (wings by key: item 225 at §2.6, cited) |
| V02-0100 | V02 §2.2 (declared at §2.6, cited) |
| V02-0101 | V02 §2.2 (declared at §2.6, cited) |
| V02-0102 | V02 §2.2 (declared at §2.6, cited) |
| V02-0103 | V02 §2.2 |
| V02-0104 | V02 §2.3 |
| V02-0105 | V02 §2.3 |
| V02-0106 | V02 §2.3 (MassingFamilyRow; §2.6 aliases PathShapeRow to it and cites V02 §2.3) |
| V02-0107 | V02 §2.3 |
| V02-0108 | V02 §2.3 |
| V02-0109 | V02 §2.4 |
| V02-0110 | V02 §2.4 |
| V02-0111 | V02 §2.5 |
| V02-0112 | V02 §2.5 |
| V02-0113 | V02 §2.5 |
| V02-0114 | V02 §2.5 |
| V02-0115 | V02 §2.5 |
| V02-0116 | V02 §2.5 |
| V02-0117 | V02 §2.5 |
| V02-0118 | V02 §2.5 |
| V02-0119 | V02 §2.6 |
| V02-0120 | V02 §2.6 (BaseWing.on declared at §2.6, item 227, cited) |
| V02-0121 | V02 §2.6 (MassingRef.stack; §2.6 cites) |
| V02-0122 | V02 §2.6 |
| V02-0123 | V02 §2.6 |
| V02-0124 | V02 §2.6 |
| V02-0125 | V02 §2.6 (DeckContext declared at §2.6, cited) |
| V02-0126 | V02 §2.6 |
| V02-0127 | V02 §2.6 |
| V02-0128 | V02 §2.6 |
| V02-0129 | V02 §2.6 |
| V02-0130 | V02 §2.6 |
| V02-0131 | V02 §2.6 |
| V02-0132 | V02 §3.1 |
| V02-0133 | V02 §3.1 |
| V02-0134 | V02 §3.2 |
| V02-0135 | V02 §3.2 |
| V02-0136 | V02 §3.2 |
| V02-0137 | V02 §3.2 |
| V02-0138 | V02 §3.3 |
| V02-0139 | V02 §3.3 |
| V02-0140 | V02 §3.4 |
| V02-0141 | V02 §3.5 |
| V02-0142 | V02 §3.5 |
| V02-0143 | V02 §3.5 |
| V02-0144 | V02 §3.5 |
| V02-0145 | V02 §3.5 |
| V02-0146 | V02 §3.5 |
| V02-0147 | V02 §3.5 |
| V02-0148 | V02 §3.5 |
| V02-0149 | V02 §3.5 |
| V02-0150 | V02 §3.5 |
| V02-0151 | V02 §3.5 |
| V02-0152 | V02 §3.5 |
| V02-0153 | V02 §3.5 |
| V02-0154 | V02 §3.5 |
| V02-0155 | V02 §3.5 |
| V02-0156 | V02 §3.5 |
| V02-0157 | V02 §3.5 |
| V02-0158 | V02 §3.5 |
| V02-0159 | V02 §3.5 |
| V02-0160 | V02 §3.5 |
| V02-0161 | V02 §3.5 |
| V02-0162 | V02 §3.5 |
| V02-0163 | V02 §3.5 |
| V02-0164 | V02 §3.5 |
| V02-0165 | V02 §3.5 |
| V02-0166 | V02 §3.5 — minEdge cited (V02-RESTATE-2) |
| V02-0167 | V02 §3.5 |
| V02-0168 | V02 §3.5 |
| V02-0169 | V02 §3.5 M14 (the ladder's home; §5.2's F-MASSING row cites V02 §3.5) |
| V02-0170 | V02 §3.6 |
| V02-0171 | V02 §3.7 (facadeBays; §2.6 step 6 cites V02 §3.7) |
| V02-0172 | V02 §3.7 |
| V02-0173 | V02 §3.7 |
| V02-0174 | V02 §3.7 |
| V02-0175 | V02 §3.7 |
| V02-0176 | V02 §3.7 |
| V02-0177 | V02 §3.8 |
| V02-0178 | V02 §3.8 |
| V02-0179 | V02 §3.8 |
| V02-0180 | V02 §3.8 |
| V02-0181 | V02 §3.9 |
| V02-0182 | V02 §3.9 |
| V02-0183 | V02 §3.9 |
| V02-0184 | V02 §3.9 |
| V02-0185 | V02 §3.9 |
| V02-0186 | V02 §3.9 |
| V02-0187 | V02 §3.9 |
| V02-0188 | V02 §3.9 |
| V02-0189 | V02 §3.10 |
| V02-0190 | V02 §3.10.1 |
| V02-0191 | V02 §3.10.2 |
| V02-0192 | V02 §3.10.3 |
| V02-0193 | V02 §3.10.3 |
| V02-0194 | V02 §3.10.3 |
| V02-0195 | V02 §3.10.4 |
| V02-0196 | V02 §3.10.4 |
| V02-0197 | V02 §3.10.5 (the table's home, V07 citing it; V02-ICONF-1) |
| V02-0198 | V02 §3.10.6 |
| V02-0199 | V02 §3.10.6 (reading rule; values V11 §3.6.4 cited) |
| V02-0200 | V02 §3.10.7 |
| V02-0201 | V02 §3.10.8 (FM cells; §7.6's preset rule cited) |
| V02-0202 | V02 §3.10.9 |
| V02-0203 | V02 §3.10.9 |
| V02-0204 | V02 §3.10.9 |
| V02-0205 | V02 §3.10.9 |
| V02-0206 | V02 §3.10.9 |
| V02-0207 | V02 §3.10.10 (register lines; V12 §3.11 cited) |
| V02-0208 | V02 §3.10.10 |
| V02-0209 | V02 §3.10.10 |
| V02-0210 | V02 §3.11 |
| V02-0211 | V02 §3.11 (wingsInputs; §2.8 item 261 cited) |
| V02-0212 | V02 §3.11 |
| V02-0213 | V02 §3.12 (concerns; §6.1 item 341 cited) |
| V02-0214 | V02 §3.12 |
| V02-0215 | V02 §3.12 (arithmetic; §6.5 cited) |
| V02-0216 | V02 §3.13 (F-MASSING; §5.2 item 328 cited) |
| V02-0217 | V02 §3.14 |
| V02-0218 | V02 §3.14.1 |
| V02-0219 | V02 §3.14.2 |
| V02-0220 | V02 §3.14.3 |
| V02-0221 | V02 §3.14.4 |
| V02-0222 | V02 §3.14.5 |
| V02-0223 | V02 §3.14.5 |
| V02-0224 | V02 §3.14.5 |
| V02-0225 | V02 §3.14.6 |
| V02-0226 | V02 §3.15 |
| V02-0227 | V02 §3.15.1 |
| V02-0228 | V02 §3.15.1 |
| V02-0229 | V02 §3.15.1 |
| V02-0230 | V02 §3.15.1 |
| V02-0231 | V02 §3.15.1 |
| V02-0232 | V02 §3.15.1 |
| V02-0233 | V02 §3.15.1 |
| V02-0234 | V02 §3.15.1 |
| V02-0235 | V02 §3.15.1 |
| V02-0236 | V02 §3.15.1 |
| V02-0237 | V02 §3.15.2 (rebaseStack; §2.6 item 370 cited) |
| V02-0238 | V02 §3.15.3 |
| V02-0239 | V02 §3.15.3 |
| V02-0240 | V02 §3.15.4 |
| V02-0241 | V02 §3.15.4 |
| V02-0242 | V02 §3.15.5 |
| V02-0243 | V02 §3.15.6 (V04 X19 cited) |
| V02-0244 | V02 §3.16 |
| V02-0245 | V02 §3.16 |
| V02-0246 | V02 §3.16 |
| V02-0247 | V02 §3.16 |
| V02-0248 | V02 §3.17 |
| V02-0249 | V02 §3.17 — soffit per item 244 (V02-XCONF-1, V01-ICONF-4) |
| V02-0250 | V02 §3.17 (e) (the fixture's own bars V12's, X25) |
| V02-0251 | V02 §4.1 (event kinds cited to §7.1; the ops declared here — §7.1 cites V02 §4.1) |
| V02-0252 | V02 §4.1 |
| V02-0253 | V02 §4.2 |
| V02-0254 | V02 §4.2 |
| V02-0255 | V02 §4.2 |
| V02-0256 | V02 §4.2 |
| V02-0257 | V02 §4.3 |
| V02-0258 | pointer: §7.4's setMassing / setComposition row (V02 §4.4); two V02 clauses kept there |
| V02-0259 | V02 §4.4 Orphans (the home §7.4's row cites) |
| V02-0260 | V02 §4.5 (the handle contract's home; V09 §3.5 and T-V9-42 consume it) [REF-HOME] |
| V02-0261 | V02 §4.5 (provider rows; V10 §3.9's query cited) [REF-HOME] |
| V02-0262 | V02 §4.6 (TiersOp; MassingOp declared at V02 §4.1, which §7.1 cites) |
| V02-0263 | V02 §4.6 |
| V02-0264 | V02 §4.6 |
| V02-0265 | V02 §4.6 |
| V02-0266 | V02 §4.6 |
| V02-0267 | V02 §4.6 |
| V02-0268 | V02 §4.6 |
| V02-0269 | V02 §4.6 (7) (V09 §4.20.5, V10 cited) [REF-HOME] |
| V02-0270 | V02 §5.1 (§8.5's bands cited) [REF-HOME] |
| V02-0271 | V02 §5.2 (§8.6 cites V02 §5.2) [REF-HOME] |
| V02-0272 | V02 §5.2 — valley by valleyReach float (E-27) |
| V02-0273 | V02 §5.2 |
| V02-0274 | V02 §5.2 |
| V02-0275 | V02 §5.3 (§8.2's roofConstruction cited) [REF-HOME] |
| V02-0276 | V02 §5.3 (§8.10 rows; style cells table, V02-WGAP-1) [REF-HOME] |
| V02-0277 | V02 §5.4 |
| V02-0278 | V02 §5.5 (§11.1 cites V02 §5.5) [REF-HOME] |
| V02-0279 | V02 §5.6 |
| V02-0280 | V02 §5.6 (§11.1 cites) [REF-HOME] |
| V02-0281 | V02 §6 intro (counts and times cited to §1.1, §12.5; RESTATE-4) |
| V02-0282 | V02 §6.1 |
| V02-0283 | V02 §6.2 |
| V02-0284 | V02 §6.3 |
| V02-0285 | V02 §6.4 |
| V02-0286 | V02 §6.5 |
| V02-0287 | V02 §7 intro (§13 families cited) |
| V02-0288 | V02 §7.1 |
| V02-0289 | V02 §7.2 |
| V02-0290 | V02 §7.2 — cathedral clause cites V11 §3.6.4 (V02-RESTATE-5) |
| V02-0291 | V02 §7.2 |
| V02-0292 | V02 §7.2 |
| V02-0293 | V02 §7.2 |
| V02-0294 | V02 §7.2 |
| V02-0295 | V02 §7.2 |
| V02-0296 | V02 §7.2 — clause worded on the ground wings over the crypt's ring (V02-TERM-3) |
| V02-0297 | V02 §7.2 |
| V02-0298 | V02 §7.2 |
| V02-0299 | V02 §7.3 |
| V02-0300 | V02 §7.4 |
| V02-0301 | V02 §7.4 |
| V02-0302 | V02 §7.5 (§13.6 protocol cited; X-V12-2) |
| V02-0303 | V02 §7.6 |
| V02-0304 | V02 §7.7 |
| V02-0305 | V02 §7.7 |
| V02-0306 | V02 §7.7 |
| V02-0307 | V02 §7.7 |
| V02-0308 | V02 §7.7 |
| V02-0309 | V02 §7.7 |
| V02-0310 | V02 §7.7 |
| V02-0311 | V02 §7.7 |
| V02-0312 | V02 §8.1 — decided order J122 (V02-DEFER-1) |
| V02-0313 | V02 §8.2 |
| V02-0314 | V02 §8.3 — estimate per row; effort stated once in V02 §8.5 (V02-ICONF-2) |
| V02-0315 | V02 §8.3 — estimate per row; effort once (V02-ICONF-2/-4) |
| V02-0316 | V02 §8.3 — effort once (V02-ICONF-2/-4) |
| V02-0317 | V02 §8.4 — R5's last rung a bend (V02-ICONF-3) |
| V02-0318 | V02 §8.5 — effort once (V02-ICONF-2/-4) |
| V02-0319 | V02 §8.5 — effort once; R9 without narration |
| V02-0320 | V02 §9 row J-V2.1 |
| V02-0321 | V02 §9 row J-V2.2 |
| V02-0322 | V02 §9 row J-V2.3 |
| V02-0323 | V02 §9 row J-V2.4 |
| V02-0324 | V02 §9 row J-V2.5 |
| V02-0325 | V02 §9 row J-V2.6 |
| V02-0326 | V02 §9 row J-V2.7 |
| V02-0327 | V02 §9 row J-V2.8 |
| V02-0328 | V02 §9 row J-V2.9 |
| V02-0329 | V02 §9 row J-V2.10 |
| V02-0330 | V02 §9 row J-V2.11 |
| V02-0331 | V02 §9 row J-V2.12 |
| V02-0332 | V02 §9 row J-V2.13 |
| V02-0333 | V02 §9 row J-V2.14 |
| V02-0334 | V02 §9 row J-V2.15 |
| V02-0335 | V02 §9 row J-V2.16 |
| V02-0336 | V02 §9 row J-V2.17 |
| V02-0337 | V02 §9 row J-V2.18 |
| V02-0338 | V02 §9 row J-V2.19 |
| V02-0339 | V02 §9 row J-V2.20 |
| V02-0340 | V02 §9 row J-V2.21 |
| V02-0341 | V02 §9 row J-V2.22 |
| V02-0342 | V02 §9 row J-V2.23 |
| V02-0343 | V02 §9 row J-V2.24 |
| V02-0344 | V02 §9 row J-V2.25 |
| V02-0345 | V02 §9 row J-V2.26 |
| V02-0346 | V02 §9 row J-V2.27 |
| V02-0347 | V02 §9 row J-V2.28 |
| V02-0348 | V02 §9 row J-V2.29 |
| V02-0349 | V02 §9 row J-V2.30 |
| V02-0350 | V02 §9 row J-V2.31 |
| V02-0351 | V02 §9 row J-V2.32, rewritten to the decided order, marked "Amended by J122" (E-24; V02-DEFER-2) |
| V02-0352 | V02 §9 row J-V2.33 |
| V02-0353 | V02 §9 row J-V2.34 |
| V02-0354 | V02 §9 row J-V2.35 |
| V02-0355 | V02 §9 row J-V2.36 |
| V02-0356 | V02 §9 row J-V2.37 |
| V02-0357 | V02 §9 row J-V2.38 |
| V02-0358 | V02 §9 row J-V2.39 |
| V02-0359 | V02 §9 row J-V2.40 |
| V02-0360 | V02 §9 row J-V2.41 |
| V02-0361 | V02 §9 row J-V2.42 |
| V02-0362 | V02 §9 row J-V2.43 |
| V02-0363 | V02 §9 row J-V2.44 |
| V02-0364 | V02 §9 row J-V2.45 |
| V02-0365 | V02 §9 row J-V2.46, marked "Amended by J-V2.108" (E-24) |
| V02-0366 | V02 §9 row J-V2.47 |
| V02-0367 | V02 §9 row J-V2.48 |
| V02-0368 | V02 §9 row J-V2.49 |
| V02-0369 | V02 §9 row J-V2.50 |
| V02-0370 | V02 §9 row J-V2.51 |
| V02-0371 | V02 §9 row J-V2.52 |
| V02-0372 | V02 §9 row J-V2.53 |
| V02-0373 | V02 §9 row J-V2.54 |
| V02-0374 | V02 §9 row J-V2.55 |
| V02-0375 | V02 §9 row J-V2.56, current choice, marked "Amended by J-V2.96" (E-24) |
| V02-0376 | V02 §9 row J-V2.57 |
| V02-0377 | removed: process record (V02-NARR-3); kept in docs/volumes/critique/V02.md |
| V02-0378 | V02 §9 row J-V2.59 |
| V02-0379 | V02 §9 row J-V2.60 |
| V02-0380 | V02 §9 row J-V2.61 |
| V02-0381 | V02 §9 row J-V2.62 |
| V02-0382 | V02 §9 row J-V2.63 |
| V02-0383 | V02 §9 row J-V2.64 |
| V02-0384 | V02 §9 row J-V2.65 |
| V02-0385 | V02 §9 row J-V2.66 |
| V02-0386 | V02 §9 row J-V2.67 |
| V02-0387 | V02 §9 row J-V2.68 |
| V02-0388 | V02 §9 row J-V2.69 |
| V02-0389 | V02 §9 row J-V2.70 |
| V02-0390 | V02 §9 row J-V2.71 (deferral clause out, V02-DEFER-2) |
| V02-0391 | V02 §9 row J-V2.72 |
| V02-0392 | V02 §9 row J-V2.73, marked "Superseded by J-V2.79" (E-24); its content in J-V2.79 |
| V02-0393 | V02 §9 row J-V2.74 |
| V02-0394 | V02 §9 row J-V2.75 |
| V02-0395 | V02 §9 row J-V2.76, marked "Superseded by J-V2.79" (E-24); its content in J-V2.79 |
| V02-0396 | V02 §9 row J-V2.77 |
| V02-0397 | V02 §9 row J-V2.78 |
| V02-0398 | V02 §9 row J-V2.79 |
| V02-0399 | V02 §9 row J-V2.80 |
| V02-0400 | V02 §9 row J-V2.81 |
| V02-0401 | V02 §9 row J-V2.82 |
| V02-0402 | V02 §9 row J-V2.83 |
| V02-0403 | V02 §9 row J-V2.84 |
| V02-0404 | V02 §9 row J-V2.85 |
| V02-0405 | V02 §9 row J-V2.86 |
| V02-0406 | V02 §9 row J-V2.87 |
| V02-0407 | V02 §9 row J-V2.88 |
| V02-0408 | V02 §9 row J-V2.89 (soffit per item 244, V02-XCONF-1) |
| V02-0409 | V02 §9 row J-V2.90 |
| V02-0410 | V02 §9 row J-V2.91 |
| V02-0411 | V02 §9 row J-V2.92 |
| V02-0412 | V02 §9 row J-V2.93 |
| V02-0413 | V02 §9 row J-V2.94 |
| V02-0414 | V02 §9 row J-V2.95 |
| V02-0415 | V02 §9 row J-V2.96 (home V02 §3.10.5, V02-ICONF-1) |
| V02-0416 | V02 §9 row J-V2.97 |
| V02-0417 | V02 §9 row J-V2.98 |
| V02-0418 | V02 §9 row J-V2.99 |
| V02-0419 | V02 §9 row J-V2.100 |
| V02-0420 | V02 §9 row J-V2.101 |
| V02-0421 | V02 §9 row J-V2.102 |
| V02-0422 | V02 §9 row J-V2.103 |
| V02-0423 | V02 §9 row J-V2.104 |
| V02-0424 | V02 §9 row J-V2.105 |
| V02-0425 | V02 §9 row J-V2.106 |
| V02-0426 | V02 §9 row J-V2.107 |
| V02-0427 | V02 §9 row J-V2.108 |
| V02-0428 | V02 §10 intro (landing milestones are file f's tags) |
| V02-0429 | V02 §10 pointer row BCR-V2-01 → item 216 (its text the base section's) |
| V02-0430 | V02 §10 pointer row BCR-V2-02 → item 217 (its text the base section's) |
| V02-0431 | V02 §10 pointer row BCR-V2-03 → item 218 (its text the base section's) |
| V02-0432 | V02 §10 pointer row BCR-V2-04 → item 219 (its text the base section's) |
| V02-0433 | V02 §10 pointer row BCR-V2-05 → item 220 (its text the base section's) |
| V02-0434 | V02 §10 pointer row BCR-V2-06 → item 221 (its text the base section's) |
| V02-0435 | V02 §10 pointer row BCR-V2-07 → item 222 (its text the base section's) |
| V02-0436 | V02 §10 pointer row BCR-V2-08 → item 385 (its text the base section's) |
| V02-0437 | V02 §10 pointer row BCR-V2-09 → item 426 (its text the base section's) |
| V02-0438 | V02 §10 pointer row BCR-V2-10 → item 341 (its text the base section's) |
| V02-0439 | V02 §10 pointer row BCR-V2-11 → item 346 (its text the base section's) |
| V02-0440 | V02 §10 pointer row BCR-V2-12 → item 351 (its text the base section's) |
| V02-0441 | V02 §10 pointer row BCR-V2-13 → item 261 (its text the base section's) |
| V02-0442 | V02 §10 pointer row BCR-V2-14 → item 376 and 377 (its text the base section's) |
| V02-0443 | V02 §10 pointer row BCR-V2-15 → item 406 (its text the base section's) |
| V02-0444 | V02 §10 pointer row BCR-V2-16 → item 328 (its text the base section's) |
| V02-0445 | V02 §10 pointer row BCR-V2-17 → item 332 (its text the base section's) |
| V02-0446 | V02 §10 pointer row BCR-V2-18 → item 505 (its text the base section's) |
| V02-0447 | V02 §10 pointer row BCR-V2-19 → item 522 (its text the base section's) |
| V02-0448 | V02 §10 pointer row BCR-V2-20 → item 524 and 568 (its text the base section's) |
| V02-0449 | V02 §10 pointer row BCR-V2-21 → item 449 (its text the base section's) |
| V02-0450 | V02 §10 pointer row BCR-V2-22 → item 223 (its text the base section's) |
| V02-0451 | V02 §10 pointer row BCR-V2-23 → item 224 (its text the base section's) |
| V02-0452 | V02 §10 pointer row BCR-V2-24 → item 303 (its text the base section's) |
| V02-0453 | V02 §10 pointer row BCR-V2-25 → item 499 (its text the base section's) |
| V02-0454 | V02 §10 pointer row BCR-V2-26 → item 427 (its text the base section's) |
| V02-0455 | V02 §10 pointer row BCR-V2-27 → item 225 (its text the base section's) |
| V02-0456 | V02 §10 pointer row BCR-V2-28 → item 226 (its text the base section's) |
| V02-0457 | V02 §10 pointer row BCR-V2-28 → item 226 (its text the base section's) |
| V02-0458 | V02 §10 pointer row BCR-V2-29 → item 304 (its text the base section's) |
| V02-0459 | V02 §10 pointer row BCR-V2-30 → item 402 (its text the base section's) |
| V02-0460 | V02 §10 pointer row BCR-V2-31 → item 227 (its text the base section's) |
| V02-0461 | V02 §10 pointer row BCR-V2-32 → item 370 (its text the base section's) |
| V02-0462 | V02 §10 pointer row BCR-V2-33 → item 371 (its text the base section's) |
| V02-0463 | V02 §10 pointer row BCR-V2-33 → item 371 (its text the base section's) |
| V02-0464 | V02 §10 pointer row BCR-V2-34 → item 305 (its text the base section's) |
| V02-0465 | V02 §10 pointer row BCR-V2-35 → item 333 (its text the base section's) |
| V02-0466 | V02 §10 pointer row BCR-V2-36 → item 419 (its text the base section's) |
| V02-0467 | V02 §10 pointer row BCR-V2-37 → item 525 and 568 (its text the base section's) |
| V02-0468 | V02 §10 pointer row BCR-V2-38 → item 228 (its text the base section's) |
| V02-0469 | V02 §10 pointer row BCR-V2-39 → item 229 (its text the base section's) |
| V02-0470 | V02 §10 pointer row BCR-V2-40 → item 318 (its text the base section's) |
| V02-0471 | V02 §10 pointer row BCR-V2-41 → item 230 (its text the base section's) |
| V02-0472 | V02 §10 pointer row BCR-V2-42 → item 231 (its text the base section's) |
| V02-0473 | V02 §11 — answered not now, J122/J121 (V02-MISSING-1) |
| V02-0474 | removed: HISTORY OUT (validation records); live claims restated once in V02 §12 (V02-NARR-5) |
| V02-0475 | removed: HISTORY OUT (validation records); live claims restated once in V02 §12 (V02-NARR-5) |
| V02-0476 | removed: HISTORY OUT (validation records); live claims restated once in V02 §12 (V02-NARR-5) |
| V02-0477 | removed: HISTORY OUT (validation records); live claims restated once in V02 §12 (V02-NARR-5) |
| V02-0478 | removed: HISTORY OUT (validation records); live claims restated once in V02 §12 (V02-NARR-5) |
| V02-0479 | removed: HISTORY OUT (validation records); live claims restated once in V02 §12 (V02-NARR-5) |
| V02-0480 | V02 §13 first paragraph (round narration out to the validation records, V02-NARR-6) |
| V02-0481 | V02 §13 hand-off row X1 (current rule; history out, V02-NARR-7) |
| V02-0482 | V02 §13 hand-off row X2 (current rule; history out, V02-NARR-7) |
| V02-0483 | V02 §13 hand-off row X3 (current rule; history out, V02-NARR-7) |
| V02-0484 | V02 §13 hand-off row X4 (current rule; history out, V02-NARR-7) |
| V02-0485 | V02 §13 hand-off row X5 (current rule; history out, V02-NARR-7) |
| V02-0486 | V02 §13 hand-off row X6 (current rule; history out, V02-NARR-7) |
| V02-0487 | V02 §13 hand-off row X7 (current rule; history out, V02-NARR-7) |
| V02-0488 | V02 §13 hand-off row X8 (current rule; history out, V02-NARR-7) |
| V02-0489 | V02 §13 hand-off row X9 (current rule; history out, V02-NARR-7) |
| V02-0490 | V02 §13 hand-off row X10 (current rule; history out, V02-NARR-7) |
| V02-0491 | V02 §13 hand-off row X11 (current rule; history out, V02-NARR-7) |
| V02-0492 | V02 §13 hand-off row X12 (current rule; history out, V02-NARR-7) |
| V02-0493 | V02 §13 hand-off row X13 (current rule; history out, V02-NARR-7) |
| V02-0494 | V02 §13 hand-off row X14 (current rule; history out, V02-NARR-7) |
| V02-0495 | V02 §13 hand-off row X15 (current rule; history out, V02-NARR-7) |
| V02-0496 | V02 §13 hand-off row X16 (current rule; history out, V02-NARR-7) |
| V02-0497 | V02 §13 hand-off row X17 (current rule; history out, V02-NARR-7) |
| V02-0498 | V02 §13 hand-off row X18 (current rule; history out, V02-NARR-7) |
| V02-0499 | V02 §13 hand-off row X19 (current rule; history out, V02-NARR-7) |
| V02-0500 | V02 §13 hand-off row X20 (current rule; history out, V02-NARR-7) |
| V02-0501 | V02 §13 hand-off row X21 (current rule; history out, V02-NARR-7) |
| V02-0502 | V02 §13 hand-off row X22 (current rule; history out, V02-NARR-7) |
| V02-0503 | V02 §13 hand-off row X23 (current rule; history out, V02-NARR-7) |
| V02-0504 | V02 §13 hand-off row X24 (current rule; history out, V02-NARR-7) |
| V02-0505 | V02 §13 hand-off row X25 (current rule; history out, V02-NARR-7) |
| V02-0506 | V02 §13 hand-off row X26 (current rule; history out, V02-NARR-7) |
| V02-0507 | V02 §13 hand-off row X27 (current rule; history out, V02-NARR-7) |
| V02-0508 | V02 §13 hand-off row X28 (current rule; history out, V02-NARR-7) |
| V02-0509 | V02 §13 hand-off row X29 (current rule; history out, V02-NARR-7) |
| V02-0510 | V02 §13 hand-off row X30 (current rule; history out, V02-NARR-7) |
| V02-0511 | V02 §13 hand-off row X31 (current rule; history out, V02-NARR-7) |
| V02-0512 | V02 §13 hand-off row X32 (current rule; history out, V02-NARR-7) |
| V02-0513 | V02 §13 hand-off row X33 (current rule; history out, V02-NARR-7) |
| V02-0514 | folded: V02 §3.15.3, item 371 (a); V02 §3.17 (a) (b); V02 §4.2 step 2, §4.3 (c); pointer in Integration notes |
| V02-0515 | folded: V02 §4.6 (7); pointer in Integration notes |
| V02-0516 | folded: V02 §4.1 (J-VI.4), V02 §3.15 (J-VI.5); pointer in Integration notes |
| V02-0517 | removed: round ledger (V02-NARR-9); its rules live at V02 §2.5, §3.14.5, §9 (J-V2.88 – J-V2.108) |
| V02-0518 | removed: round ledger (V02-NARR-9); its rules live at V02 §2.5, §3.14.5, §9 (J-V2.88 – J-V2.108) |
| V02-0519 | V02 §2.1 |
| V02-0520 | V02 §2.2 |
| V02-0521 | V02 §2.1 |
| V02-0522 | V02 §2.1 |
| V02-0523 | V02 §2.1 |
| V02-0524 | V02 §2.1 |
| V02-0525 | V02 §3.3 |
| V02-0526 | V02 §3.2 |
| V02-0527 | V02 §3.15 |
| V02-0528 | V02 §3.7 |
| V02-0529 | V02 §5.2 |
| V02-0530 | V02 §2.6 |
| V02-0531 | V02 §2.6 |
| V02-0532 | V02 §2.6 |
| V02-0533 | V02 §1b |
| V02-0534 | V02 §2.6 |
| V02-0535 | V02 §3.14.5 |
| V02-0536 | V02 §3.16 |
| V02-0537 | V02 §1b |
| V02-0538 | V02 §4.4 |
| V02-0539 | V02 §3.13 |
| V02-0540 | V02 §7 intro |
| V02-0541 | V02 §3.11 |
