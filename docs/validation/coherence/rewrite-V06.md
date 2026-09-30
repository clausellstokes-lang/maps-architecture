# Rewrite — design volume V06 (evolution)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-V06; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/rewrite-V06`, started 2026-09-30, cloud)
- P1 inputs gathered (canon unit V06: 455 STATE, 14 REFERENCE, 21 BCR pointers, 8 index rows, 9 conflicts, 46 f items, g 111 and 113, owner items 114 and 115 (coordinator, 2026-09-30; J127), 6 wiring gaps, E-01/E-02/E-24/E-39, ID-BCR/ID-WX/ID-DR, 19 hand-offs, 48 U + 64 T edges, 42 combinations, 51 open findings; inventory 502 items + 36 terms; routing in work/rewrite-V06/routing.md): done
- P2 head, §0, §1, §1b: done (parts/00-head-s0-s1.md, 01-s1b.md; W82–W90 new)
- P3 §2: done (parts/02-s2.md; §2.14 new)
- P4 §3: done (parts/03–11: new §3.7.7 (item 114), §3.8.5 (item 115), §3.11.7 and §3.12.1 (item 111), §3.20 (item 113), §3.21 (edges))
- P5 §4–§6: done (parts/12-s4-s5.md, 13-s6.md; new §6.7)
- P6 §7–§8: done (parts/14-s7.md, 15-s8.md; T-V6-70 – T-V6-74, E9)
- P7 §9–§13 and the Integration notes: done (parts/16-s9.md, 17-s10-s13.md; J-V6.127 – J-V6.134)
- P8 assemble, verify ids, references, terms, sizes: done
- P9 report (mapping table, elegance, conflicts, renumberings, cross-part notes), result file, LANDED: done

Source: `docs/volumes/V06-evolution.md` (4 632 lines). Output: `docs/validation/coherence/new/volumes/V06-evolution.md`
(4 114 lines; the same title line and section structure, one marker line, new §2.14, §3.7.7, §3.8.5, §3.11.7, §3.12.1,
§3.20, §3.21 and §6.7). Working parts: `docs/validation/coherence/work/rewrite-V06/parts/` (00 … 17, concatenated in
order); routing state `work/rewrite-V06/routing.md`; the mapping script `work/rewrite-V06/mapping.py` (it writes
`mapping.md` and `edges-map.md`, reproduced in §11 and §7 below).

## 1 Sizes and the shrink goal

| measure | before | after |
|---|---|---|
| words (`str.split`, the canon's measure) | 106 357 | 96 516 (−9.3 %; the canon's band 63 814 – 79 768) |
| bytes | 665 661 (650.1 KB) | ≈ 593 300 (579.4 KB) |
| sections | §0–§13, Integration notes, fourteen reconciliation and finalization records | §0–§13 with new §2.14, §3.7.7, §3.8.5, §3.11.7, §3.12.1, §3.20, §3.21, §6.7; an Integration-notes map |

| section | words before | words after |
|---|---|---|
| title, banners, *How to read* | 2 279 | 206 |
| §0 | 1 344 | 1 730 |
| §1 | 2 922 | 2 512 |
| §1b | 6 359 | 7 043 |
| §2 | 10 278 | 11 328 |
| §3 | 33 914 | 41 409 |
| §4 | 3 618 | 4 094 |
| §5 | 1 825 | 2 114 |
| §6 | 3 141 | 2 582 |
| §7 | 7 446 | 8 967 |
| §8 | 3 099 | 3 608 |
| §9 | 8 629 | 9 295 |
| §10 | 5 588 | 645 |
| §11 | 288 | 107 |
| §12 | 2 208 | 458 |
| §13 | 5 139 | 76 |
| Integration notes | 429 | 178 |
| reconciliation and finalization records | 7 851 | 0 |

**Sources of the words removed** (≈ 26 100 removed; estimates by section diff and by the blocks replaced):

| source | ≈ words | where |
|---|---|---|
| NARRATION | 18 400 (70 %) | the stacked banners, status and reading record of the head (V06-NARR-1, 2 070); the fourteen reconciliation and finalization records (NARR-4, 7 850); §13's round notes and the 49-row hand-off table with its per-issue change tables (NARR-4, WGAP-2, 5 060); §12's per-round reading lists, md5s, landing times and scratch receipts (NARR-4, BREF-2, 1 750); §11's pricing history (NARR-3, 180); the integration-note header (250); "**revised**", "as round N amends it", critique and seam ids and supersession chains in the body and §9 (NARR-2, NARR-5, ≈ 1 250) |
| RESTATEMENT | 6 400 (25 %) | §10's twenty-eight base-change texts quoting the base → a pointer table to file f items (ID-BCR, 4 940); V05 §6's resize row quoted and re-derived in §6.2 → cited by row name (V06-RESTATE-1); §2.7's and §2.8's restated base records (`Enceinte.pathway`, `Way.formerClass`, `SpanRef`, `suppress`) → citations; §1.3's out-of-scope paragraphs → index rows; §3.19's V11 value copies → citations (X-V11-11) |
| DUPLICATED MECHANISMS | 300 (1 %) | the stretch-state profile's mechanics in §2.12's two rows → §2.2 rule 5 (E-01) |
| VERBOSE PROSE | 1 000 (4 %) | the long decision rows (J-V6.17, .18, .107, .118, .125), §0, §1b's rows |

**Added** (ruled content, ≈ 16 300): the owner items at build depth — item 113's replay (V06 §3.20, §2.14, §6.7, W83 – W88,
T-V6-71, H-HISTORY, H-REFOUND, J-V6.127, .130, .133, .134; ≈ 4 900), item 111's springs and drought (V06 §3.11.7,
§3.12.1, the `spring.*` rows, W82, T-V6-72, H-OASIS, J-V6.128; ≈ 1 500), item 114's condition by need and means (V06
§3.7.7, `wearWall`, `repairWall`'s material, W89, T-V6-73, H-WALLS, J-V6.131; ≈ 1 400), item 115's ceiling across a rung
change (V06 §3.8.5, W90, T-V6-74, H-RUNG, J-V6.132; ≈ 700); the edge suite (V06 §3.21's 35 mechanism rows and 17
combination rows, T-V6-70 (a) – (n), EI-V06-EDGE-1 in §3.3.2 and EDGE-2 in §4.1; ≈ 3 900); the new clauses of nineteen
existing tests (≈ 1 000); the conflict and hand-off closures written at their homes (J-V6.129, V09's `info.remove.holds`,
V10's CVR rows, the standalone-neighbourhood rule, the Integration-notes folds; ≈ 1 700); §10's pointer table, §11's
decision, §12's two paragraphs, §13's closure and the Integration-notes map (≈ 1 200).

**What holds the size above the band.** The carried text shrank by ≈ 24.5 % (106 357 → ≈ 80 200 words before the
additions), inside the band; the whole shrinks by 9.3 % because the pass adds ≈ 16 300 words of ruled content that the
canon routes here and that no shrink may drop: four owner items at build depth (111, 113, 114, 115 — each with its
mechanism, lifecycle rows, report fields, failure rungs, tests, fixtures and decisions), principle (11)'s 112 mechanism
edges and 42 combinations defined with outcome, rung and test, and the hand-off closures. The irreducible body is the
engine's per-phase rules (§3: twenty phases, each with its candidates, caps, streams, order and failure handling), §1b's
90-row wiring table (principle (7) names each producer and consumer), §2.12's lifecycle rows and §9's 134 reasoned
decisions. The unit's verifier may still audit the verbose-prose share; nothing was thinned to meet the goal.

## 2 File f and g items (cited as base text, never restated)

File f items concerning V06, each cited at its base home: 202, 206, 209, 226, 244, 245, 246, 252, 254, 260, 263, 264,
265, 266, 268, 270, 274, 275, 290, 291, 293, 317, 318, 319, 321, 322, 335, 336, 339, 342, 343, 347, 370, 388, 409, 429,
443, 458, 478, 479, 550, 568, 573, 574, 575, 581 (46 of 46 cited in the text); also cited: 207, 383 (DR28, DR29), 447.
V06 §10 is the pointer table BCR-V6-1 – 28 → file f item → base home (ID-BCR). Of these, 568 (§16's totals computed
once: V06 §8 gives its own estimate) and 581 (the `VG` preset reads V06's table at its parity values: V06 §2.2) were the
two the carried text did not yet cite; both are cited now.

**g item 111** (V06's part, written at build depth; closes V06-MISSING-2): a spring is §2.3's `WaterBody.spring` and its
`flow` is written over epochs by this volume only — drought (the `dry` hazard, V06 §3.11.7; the calamity table's
`drought` row, V06 §2.4, J-V6.128), loss (a spring whose source moves off its water by a course change, or a dossier's
removed `oasis_water`, DR40), recovery (`spring.recoverPerYear`), and what follows (gardens and the grove fallow, the
aqueduct runs dry, the pull and the prosperity water term fall with `flow` through the base's own weighting, so the
quarters around decline by the ordinary departure matching) (V06 §3.12.1); W82; T-V6-72; H-OASIS; the `spring.*` rows of
V06 §2.2.

**g item 113** (V06's part, written at build depth; closes V06-MISSING-3 and V06-XCONF-1): V06 §3.20 — the replay plan
(the peak by DR36, symbolic when inferred; the start; coarse epochs by `history.epochYears`, coarsened to the budget
deterministically), the event-to-epoch mapping on V11's `HistoryEventRow`s (effects `hazard`, `population`, `slice`,
`uses`, `destroy`, `none`), the runner at generation (the creation prefix folded by the ordinary runner under
`'history'`; the dossier's present records at the last epoch's `dossier` step), the budget and lazy detail (V06 §6.7),
destruction, refounding and burial as epochs (V04's `BuriedFormer.lay` inside the batch; DR38, DR39; J-V6.130), the
`HistoryRecord` (DR37) and afterwards (J-V6.134); §2.14's records; W83 – W88; T-V6-71; H-HISTORY, H-REFOUND; E9 in §8.
J-V6.4 is marked "superseded by J-V6.127" and §1.3's bullet is replaced by the start-small-beside-the-replay rule.

**Owner item 114** (the coordinator's routing of 2026-09-30, J127; recorded as an f/g item of this unit): V06 §3.7.7 —
NEED from the epochs' threat and MEANS from the wealth level in force, each a class sustained over a window with apart
thresholds (no flicker), the local weight λ on decay chances only, decay (`wearWall` → `worn`, then `breached`; neglect,
poverty, both), repair (patched without means, robust with means oldest patch first within the `fabric` cap, worn runs
restored by means on a ring in use), neutral values as the no-op pin; §2.8's `wearWall` and `repairWall.material`;
§2.10's `walls.worn/patched/rebuilt` and chronicle kinds; §2.12's condition row; §4.2's hand forms; §5.1's rendering row;
the `enceinte` why provider (§4.5); V11 cells `walls.condition.*` and rows `walls.patchMaterials`; W89; T-V6-73; H-WALLS;
J-V6.131 (J-V6.110 and J-V6.112 marked "amended by J-V6.131").

**Owner item 115** (the same routing): V06 §3.8.5 — the ceiling read at the epoch's rung (the fold's) for every design an
epoch derives; a village grown into a town lifts it for buildings new or rebuilt from the first TOWN epoch; a town handed
down keeps its grander buildings as they stand and never reshapes them down; a stored `MutationPlan` beyond the ceiling
re-planned by V06 §3.10.3; dossier-named and hand-made designs exempt; no draw and no op of its own, byte-identical at TOWN
and above; W90; T-V6-74; H-RUNG; J-V6.132.

**Owner item 116**: no V06 part (the zoom-out limit is the renderer's, V07's and V09's).

## 3 Conflicts resolved (9)

| conflict | resolution in the text |
|---|---|
| V06-ICONF-1 | V06 §2.8: a no-stretch `repairWall` with no `neglect` to lift is a no-op with its line "this wall is in use" (item 101 R2; no refusal); T-V6-11; §3.21 (a)'s conversion-kinds row. |
| V06-ICONF-2 | J-V6.92 reworded: the water-system record makes the need count as met, raises the aqueduct cap and total by `capPerSizeMember` per SIZE member, binds the terminal, and never scales the chance (V11 SS-13; J-V8.67); agrees with V06 §3.19 (3), §3.19.6 and §1b's trace. |
| V06-ICONF-3 | `advance.stoppedAt?` is in `EpochInputs.advance` (file f item 343; V06 §2.3, §2.12, T-V6-23); the base's missing field is a cross-part note (§9 below). |
| V06-ICONF-4 | V06 §4.1 and §5.1 use V09's label "Open a copy from here" (a `forkAt`; J-VI.12); IN-V06-6 folded and dropped. |
| V06-XCONF-1 | J-V6.4 marked "superseded by J-V6.127"; §1.3's bullet retired; item 113 written (V06 §3.20). |
| V06-XCONF-2 | DR28 (= V06's DR-V6.1 = V08's DR-V8.6) and DR29 (= DR-V8.1) wherever V06 names them; the dossier trace names DR30 – DR35 and DR36 – DR40 by number (ID-DR; closes V06-BREF-1). |
| V06-AGREE-1 | V06 §3.19.3 and §4.1 cite V09's `info.remove.holds` key with its `{kind}` slot; the deck-plot wording is V09's variant (cross-part note); V06 states no dry-run line of its own. |
| CANON-C02 | A standalone neighbourhood document has no clock: `advance` and a skeleton's `history` bend to "a neighbourhood alone has no history yet — open it in its town to advance time" (V06 §1.3, §4.1, J-V6.102; V09's message row and V10's bend row as cross-part notes, V06-WGAP-1a/1b); T-V6-23 tests the bend; no deferral wording. |
| CANON-C03 | V06 §11 is a decisions table: Q1 — (a) right after M4 (J122); §8 states M6-E's slot in the combined order. |

Disagreements of agreement.md for V06: none listed (the canon's unit has 0).

## 4 Elegance rulings applied, with their equivalence lists

**E-01 (UNIFY — the stretch-state profile, home §2.2 rule 5).** V06 §2.12 states once that `Enceinte.condition` and
`RetainingWall.state` follow §2.2 rule 5; each row keeps only its value set, knot role, writers and readers.
- [x] canonical form, write, read, regenerate, cut or join, undo, migrate — at §2.2 rule 5 (cited, not restated; V06 §2.12's lead sentence).
- [x] RetainingWall keeps `standing|decayed|ruined`, `retaining_state_knot`; writers: the pool's retaining member (breach → `decayed`, dismantle → `ruined`), `repairRetaining`, V05's landfall (`decayed`), V07's house-platform walls through the pool; the restoration rule writes `standing`; readers V06 §3.19.4, V04's footings, the renderer, item 447's export, the clerk — V06 §2.12's retaining row.
- [x] Enceinte keeps `standing|breached|dismantled` (with item 114's `worn` and `patched`), `wall_state_knot`; writers `breach`, `dismantle`, V05's landfall (`breached`), `repairWall` (and item 114's `wearWall`); the record's lifecycle rules (abandoned on neglect; decayed while any run is not standing; lifted by the no-stretch `repairWall`); §8.2's decayed row; §11.1's per-run LineStrings — V06 §2.12's condition row, §2.8, §5.1.

**E-02 (KEEP APART — removals that hold).** V06 §2.13 and §3.19.3 keep `LifecycleEvent.detail.suppress` for raised ways,
harbour-mouth chains, quay walls, retaining walls and deck plots, and name V05's live island form (`SkyIsland.removed`,
`.removedAccesses`) under the one lift rule of file f item 260 (§2.8): the undo, or the user's own re-add serving the key;
a cap increase opens only new keys. Kept apart because an island's removal holds a count-law slot and an archived arena
for undo (J-V5.62). Closes V06-ELEG-1.

**E-24 (UNIFY — one mark on an amended decision).** J-V6.4 "superseded by J-V6.127"; J-V6.5 "amended by J-V6.61";
J-V6.110 and J-V6.112 "amended by J-V6.131"; J-V6.111 "amended by J-V6.126". Decisions amended inside their own row by a
review round (J-V6.1, .17, .18, .25, .29, .31, .38, .79, .107, .118, .125) are written in their final form with no mark
(the round is narration, not a decision).
- [x] no row dropped — J-V6.1 – J-V6.126 all kept; J-V6.127 – J-V6.134 added.
- [x] the governing row keeps the reason — each marked row and each governing row keeps its "because".

**E-39 (KEEP APART — closure and decline states).** V06 cites each ladder at its home and merges none: V04's access states
with item 113 (e)'s `lost` (V06 §3.18, §3.20.5 (4)); the way decline ladder (`downgradeWay`, `retireWay`, `effaceWay`, the
hollow way); the wall stretch condition (E-01's profile with item 114's values); the building lifecycle (§2.8).
- [x] per link, per way, per stretch and per record scopes kept apart, with their values, transitions and writers.

## 5 Id rulings, renumberings and renames

| from | to | ruling |
|---|---|---|
| DR-V6.1 (= DR-V8.6), DR-V8.1 – DR-V8.5, DR-V8.7, DR-V8.8, "the coherence pass's row for item …" | DR28, DR29 – DR33, DR34, DR35; the history rows DR36 – DR39 and the oasis DR40 | ID-DR, J-VI.13, file f item 383 (V06-XCONF-2, V06-BREF-1) |
| BCR-V6-1 – BCR-V6-28 in the body | their file f items (V06 §10's pointer table keeps the former ids so older citations resolve) | ID-BCR |
| `V6 §n`, `V4 §`, `V5 §`, `V9 §`, `V2 §`, `V1-x.y` | `V06 §n`, `V04 §`, `V05 §`, `V09 §`, `V02 §`, `V01 §x.y` | G-cite (V06-TERM-1) |
| "retired way" | "hollow way" (the ops keep their names) | G-hollow (V06-TERM-2) |
| "the decline pool", "the decline lottery", "the lottery", "strike lottery" | "strike pool", defined once in V06 §3.5.2 | G-strike (V06-TERM-2) |
| "lone neighbourhood document", "hood document" | "standalone neighbourhood document" | G-standalone |
| "Change from here" | "Open a copy from here" | G-forkat, J-VI.12 |
| IN-V06-1 – IN-V06-7 | folded at their homes; the Integration notes keep a map | ID-WX |
| X1 – X49 (the hand-off table) | closed at their destinations (§6 below); none kept in the volume | ID-WX, V06-WGAP-2 |
| — | new: J-V6.127 – J-V6.134; T-V6-70 – T-V6-74; W82 – W90; fixtures H-OASIS, H-WALLS, H-HISTORY, H-REFOUND, H-RUNG; milestone E9; ops `wearWall`, `repairWall.material`; hazard `dry` and calamity row `drought`; chronicle kinds `wallWorn`, `wallPatched`, `wallRebuilt`, `voidLost`, `spring`, `drought`, `replay`, `destroyed`, `refounded`, `buried`; report sections `water`, `replay`, `walls.worn/patched/rebuilt`, `under.voidsLost`; records `ReplayPlan`, `ReplayEpoch`, `ReplayEventRef`, `HistoryEventRow`, `EpochInputs.replay` | items 111, 113, 114, 115; the canon's findings and edges |

Unchanged: every J-V6, T-V6 and W id of the source keeps its number; §3's subsection numbers are kept (the new ones are
appended), so every old `V06 §x` citation resolves.

## 6 Wiring gaps, hand-offs and open findings closed

**Wiring gaps (6).** W-DOS-02 — the prosperity word over time: W27, V06 §3.3 (5) and §1b's trace read V08 §3.5's diff
row `wealth` (`label` → `attr`, response `epoch`) through `tables/dossier/wealth` (DR6; receipt F9) into
`EpochInputs.wealthLevel` (file f item 343); V08's row is V08's end. W-DOS-09 — closed by item 113's §7.7 rows: V06 §3.20
and §1b's trace read DR36 – DR39 (and the oasis DR40). W-DOS-10d — §1b's trace names DR33, DR34 and DR35 by number.
V06-WGAP-1a/1b — V06 §1.3, §4.1 and J-V6.102 state the bend line; V09's message row and V10's bend row are cross-part
notes (§9). V06-WGAP-2 — the X1 – X49 table leaves the volume; each row is closed at its destination below.

**Hand-offs routed here (19), each closed in the text:**

| hand-off | closed at |
|---|---|
| V02:X8 | V06 §3.4 (2): casters rasterised per wing (each wing's prism and rise, V02 §3.14.1); W10's reader cell names the mutator path |
| V07:FL-3 | V06 §3.19.1 (5) (the ledger's suppressions and carried ways cross the hand-offs unchanged; at a village rung the `raisedWays` step runs lapse and repair only) and §3.19.2 (the stretch decline) |
| V08:X3 | V06 §3.18.2 (3): `CalamityRef.deaths` adds the span's calamity deaths to V04's burial need by `burialShare`, never the cap (file f item 573) |
| V08:X11 | confirmed: W19 and V06 §3.15.1's chronicle `raisedWay` entries, drawn as V09 §4.10's `epoch` rows |
| V08:X21 | confirmed: V06 §2.10's `EpochReport.raised.suppressedFired: { removal; week }[]`, V06 §3.19.3 (2), T-V6-58, J-V6.120 |
| V08:X24 | confirmed: V06 §3.9.11's REPLACEMENT row by V08 §3.5.1 (c)'s three cases, J-V6.125, T-V6-45 |
| V09:XV-V9-23 | confirmed: V06 §3.19.3 (7) and §2.12's suppression row name each serving re-add as Build it again emits it (J-V6.116) |
| V09:XV-V9-28 | confirmed: as V08:X21 (J-V6.120) |
| V10:CVR-V10-5 | V06 §4.5: V10 reads the chronicle through `report(h)`, a frame through `locate(w)` and the frame builder in the generation worker, `FieldDrivers.since` from the shade masks' history, `detail.why` on the use phase's moves |
| V10:CVR-V10-11 | V06 §4.5: the raised way's creation `detail.why` with its reason values; the ledger's single-subject read (file f item 290); the lifecycle's `move` rows for a raised way built at an epoch, a slumped retaining wall, a struck deck |
| V11:X-V11-11 | V06 §3.19 and §2.2 read V11 §3.18's structures block and §3.24.2's `raisedWays` rows with no copy; V06 §3.9.9 reads "V11 writes no `useRules` by default; a class row may"; `aqueduct.dossierFactor` read nowhere (J-V6.92) |
| V11:X-V11-15 | confirmed: V06 §3.16 names each participant's stage (`U-FADE`, `VS1`, `VS2`; J-V6.79) |
| V11:X-V11-16 | V06 §3.5.2's landfall re-lay reads volume 1's `way.surface` rows (V11 row 90); V06 §2.2: under `VG` the epoch tables resolve at their parity values (file f item 581) |
| V12:X-V12-4 | V06 §8 *The panel and the fixtures lent*: the V6-E7 sitting is V12 §3.9.1's `PanelSpec`, AB `history` on H-100, confirmed |
| V12:X-V12-10 | V06 §3.19.3 (1): a removal keys to its reason key, never its course (J-V6.83, J-V6.84); T-V6-58 |
| V12:X-V12-11 | T-V6-65 reads "off" as V11 §3.24.0's switch table ("every `deck.offer` 0, `terrace.enabled` false") on V12 §3.7.8's engine |
| V12:X-V12-15 | V06 §8's bar registrations and J-V6.117: each `bar.T-V6-<n>` registered as a `BenchBarDef` by the seat landing its exit |
| V12:X-V12-17 | V06 §8: this volume's lines carry no corpus stage; only a V06 column no line names and that lands after M-CAL takes V12 §3.11's default entry, due `M-CAL/evolution`; `--milestone V6-E<n>` on every line |
| V12:X-V12-19 | confirmed: V06 §8 lines `retaining.settings.stateSnapCm` at E2 on `bar.T-V6-62` and dates every line by its exit step (J-V6.126, with E9's `V6-E9`) |

**The volume's own hand-offs X1 – X49**, removed from the volume (ID-WX) and closed at their destinations. Rows the
source already marked met, answered, landed, applied or closed: X1, X10, X18, X20, X29, X32, X33, X35, X37 – X42, X44 –
X49. The others, each carried to its destination as a cross-part note (§9) for the seam checkers to verify there:

| destination | rows | what the destination states |
|---|---|---|
| V01 | X11, X16, X28 | `hood.fabric` at `afterGrowth` 40 with the district supply term; the opened close-ups re-derived over `scope.raised`; the terrace district kind as an elevated road's endpoint; `raised.stripMarginM`; `EpochScope.recut` as S9b's input, fabric and pins only under a raised strip |
| V02, V03 | X3, X24 | V03's crypt rank re-run inside the op that changes the principal; a trim shortens `Basement.crypt.ring` only; deck-plot buildings through S11's capped mutator (nothing new) |
| V04 | X2, X14, X25 | `AccessPass.run` over `EpochScope`; void vacating returns households as displaced (cause `void`); the arch-vault reconcile over `scope.raised`; U-NET's invert drops over `scope.levelled`; `Foundations.apply` exported with `under.extend` its epoch caller; the maintenance mode at a village rung; item 113's `BuriedFormer.lay` and `lost` (new) |
| V05 | X15, X26 | `sky.clearance` at `afterGrowth` 50; the landfall's ruined raised parts in the epoch's lifecycle; the landfall writes `Way.formerClass` |
| V07 | X4, X22, X27, X36, X43 | the product registration absorbed into file f item 317; suppressions and carried ways across the hand-offs; `ProductEpochRows` from `epoch.rows`; the hollow-way reopening before a placement on a hollow toft; `village.plan`'s `VS1` and `village.density`'s `VS2`; item 114's palisade patch rows (new) |
| V08 | X5, X23 | the port's carriage into `EpochInputs` (calamities with deaths, chains, receipts, churches, cemeteries, the water-system record, landmarks on high ground); item 113's `Recipe.history`; item 114's readiness and wealth (new) |
| V09 | X6, X21, X30 | the per-device history settings; the time card (shapes, threat, era, end state, count badge, bend lines, "Open a copy from here"); the rebase grey range; the link view; the delete dry run by `info.remove.holds`; the raised-way badge; the hand forms of V06 §4.2 (item 114's material and wear); the standalone-neighbourhood bend row |
| V10 | X7, X17, X30 | the four `WhyProvider`s; the `advance` shapes table; the raised-way provider's epoch reads; the standalone-neighbourhood bend row; item 113's and item 114's story lines |
| V11 | X8 | the always-crypt column and the church family tag; the religion shares; the calamity words stay in V06's table; item 113's `history.*` cells and `HistoryEventRow`s, item 114's `walls.condition.*` and `walls.patchMaterials`, item 111's spring rows' cells (new) |
| V12 | X9, X19, X31 | T-V6-38 and T-V6-40's epoch forms; T-V6-34 and T-V6-36 on the void metrics; the walled-share growth parity; the raised-way guards; T-V6-65's declared shift; `retaining.*` and `aqueduct.disuseAfterYears` as V11's cells; T-V6-70 – T-V6-74 and the item 113 – 115 pins (new) |
| base (file f) | X12, X13, X34 | DR28 and DR30 – DR35 numbered (file f item 383); file f items 260, 290, 244, 291, 209 (`repairRaised`); 574, 268, 209 |

**Open findings routed here (51), each closed:**

| finding | closed by |
|---|---|
| VOL-V05-V06-RESTATEMENTS-013, V06-RESTATE-1 | V06 §6.2 cites V05 §6's rows by name with their bounds as inputs; the verbatim quotation and its round history dropped; J-V6.118 in final form |
| V06-ICONF-1 – 4, V06-XCONF-1 – 2, V06-AGREE-1 | §3 above |
| V06-ELEG-1 | E-02 (§4 above) |
| V06-EDGE-1 | V06 §3.3.2 *Degenerate requests*: a span not finite or not above 0 a no-op with its line; a positive span under half a week read as one week (so `f_i` is always defined); a cadence rounded half-up and floored at 1 week, with its line; points sorted by week, a repeated week keeping the last, a point at or before `W0` dropped, each reported; `perYear` below −1 read as −1; a non-finite population read as the ladder union's top before the clamp; a negative target or point clamped; a trajectory clamped at every epoch still appends its epochs; §3.21 (a); T-V6-23, T-V6-70 |
| V06-EDGE-2 | V06 §4.1: after a reload the group's undo rebuilds from the nearest keyframe at or before the group (else the base) and replays the events between, then truncates in an unshared document; in a shared or host-attached document it appends an `undo` event and keeps the group; §2.12's advance row; §3.21 (a); T-V6-23 |
| V06-WGAP-1, V06-WGAP-2 | the wiring gaps above |
| V06-MISSING-1 | V06 §11 (Q1 decided, J122) and §8's M6-E slot in the combined order |
| V06-MISSING-2, V06-MISSING-3 | g items 111 and 113 (§2 above) |
| V06-TERM-1, V06-TERM-2 | §5 above (G-cite, G-hollow, G-strike) |
| V06-DEFER-1 | CANON-C02 (the decided rule, no promise) |
| V06-NARR-1 – 5 | one marker line; banners, ledgers, PROGRESS and the reading record deleted; §9 in final form; §11 the current price only; §12 two paragraphs; §13 none open; critique and seam ids stripped from normative text |
| V06-BREF-1, V06-BREF-1.r32 – r35 | §1b's trace names DR30 – DR35 (the rows for items 105 (i), 108, 109 (b), 109 (k), 110 (b)) |
| V06-BREF-2, V06-BREF-2.r19 – r31 | every scratch-file citation removed (a scan of the new text finds no `scratchpad` or `/tmp` path) |
| V06:IN-V06-1 – 7 | folded at their homes (the Integration-notes map; mapping rows V06-0500, V06-0501) |

## 7 Edges (principle (11))

The canon's 48 UNDEFINED and 64 UNTESTED mechanism edges and 42 combinations owned here are each defined in V06 §3.21
— (a) 35 mechanism rows, (b) 17 combination rows — with outcome, failure rung and test; T-V6-70 (a) – (n) is the edge
suite, and the new clauses of T-V6-2, 3, 11, 12, 15, 21, 22, 23, 26, 27, 33, 38, 52, 53, 57, 58, 60, 61 and 65 test the
rest. Degenerate geometry (E4) follows §5.1's general rule, stated once at the head of V06 §3.21. No edge's outcome is a
crash, a hang, lost data, a silent wrong result or a whole-map retry. The map (catalogue id → V06 §3.21 row → test) is at
the end of this report (§12), written by `work/rewrite-V06/mapping.py` and checked to leave no id unmapped.

## 8 Judgment calls (vetoable)

1. **Item 114's drivers are read from the log**, not stored: NEED from the epochs' slices, MEANS from the wealth level in
   force, so a replay reproduces them and no new persisted field is needed; the local weight λ = clamp(1 + w × (P_town −
   P_run), 0.5, 1.5) scales decay chances only, never a class; neutral values reproduce the rules before item 114 byte for
   byte (J-V6.131).
2. **Item 115's stored plans** beyond the ceiling are re-planned by V06 §3.10.3's rule (done steps standing, due weeks
   kept), not cancelled — the base's plan guard already re-plans a plan the present design no longer fits (J-V6.132).
3. **Item 113 runs through the one engine** (J-V6.133); no spontaneous hazard runs in a replay (it invents no event);
   the dossier's present records apply at the last replay epoch only; a symbolic peak with no dated evidence stands at
   `replay.symbolicPeakAgeShare` (0.5) of the settlement's age; only the replay buries (J-V6.130); a changed history after
   creation changes no geometry (J-V6.134); a `forkAt` inside the creation prefix bends to its end.
4. **Item 111's spring**: a lost spring never recovers by rule (only a hand `setAttr` or a dossier's new `oasis_water`);
   a drought on a map with no ground spring changes nothing and is reported; a sky island's water is untouched (V05's
   part); the thresholds `gardenMinFlow` 0.5, `groveMinFlow` 0.25 and `aqueductMinFlow` 0.5 are our own, calibratable.
5. **§4.5 (iv) and the mask** (J-V6.129): "recomputed whole" is read as the next epoch's field phase recomputing it —
   the mask's one writer — the mask counting as zero building shade until then; a cross-part note asks pipeline §4.5 to
   say so.
6. **EDGE-2** chooses rebuild-and-replay after a reload and an appended `undo` event in a shared document (the base's
   shared-document undo), over refusing the undo.
7. **Declarations kept until the base names them**: `EvolveOp` (V06 §2.8), `Use.strain` (V06 §2.9) and `Household.transit`
   are applied base facts (file f items 209, 429, 335) that the rewritten base parts do not yet declare; V06 keeps each
   declaration, marked with its f item, and the cross-part notes ask the base editors to state them, after which V06's copy
   becomes a citation.
8. **The shrink** stays above the band (§1): the owner items and the edge suite are ruled content.

## 9 CROSS-PART NOTES

- **pipeline §4.11**: (a) the `ConversionOp` union gains `EvolveOp` — `absorbWall`, `downgradeWay`, `upgradeWay`, `burn`, `repairWall { enceinte, stretch?, material? }`, `wearWall` (item 114), `retypeLand`, `repairRaised`, `repairRetaining` (file f item 209; V06 §2.8); (b) `EpochInputs` gains `wealthLevel?` and `advance? { group, index, of, trajectory?, stoppedAt? }` (file f item 343; V06-ICONF-3) and `replay?` (item 113; V06 §2.14); (c) *Decline and regrowth* states regrowth-first's two history exceptions, the overflow backlog stage and the decrowding stage (file f item 336); (d) step (c) reads "which dwellings empty is decided by the departure matching (V06 §3.5.1); the strike pool strikes fabric only" (file f item 479; G-strike); (e) *The clock*: a signed week's season uses a floored `week mod 52` (the replayed past lies at negative weeks, V06 §3.20.3); (f) `HistoryHint.peak`, which (1) cites, is declared in the model.
- **pipeline §4.5**: (iv) reads "a mask whose sampler digest differs counts as zero building shade until the next epoch's field phase recomputes it whole" (J-V6.129); the building mask's sentence names V06 §3.4 as the mask's writer (file f item 275); the water pull and the prosperity water term weight a spring by `flow` (V06 §3.12.1 is `flow`'s only writer).
- **pipeline §4.2 S10b, §10.2** (item 115): the ceiling by rung is read at an epoch's rung by V06 §3.8.5; nothing else changes on the epoch path.
- **model §2.7**: (a) `Use.strain? { kind: 'demand'|'supply'; sinceWeek }` (file f item 429) and `Household.transit?` (file f item 335) declared; (b) `Enceinte.condition`'s `WallCondition` gains `worn` and `patched`, each run carrying its material (robust or a V11 `walls.patchMaterials` row id) and its last-change epoch (item 114 (b)); the condition paragraph's writers add `wearWall` and `repairWall`'s patch form, the lifecycle rules unchanged; (c) `HistoryHint.peak`; (d) `WaterBody.spring.flow`'s writer is V06 §3.12.1 (drought, loss, recovery) and a dossier's `oasis_water` removal (DR40).
- **model §2.8**: the dry-run quote "The city will not rebuild this aqueduct …" cites V09's `info.remove.holds` (V06-AGREE-1); the `repairWall` row states the no-stretch nothing-to-lift no-op (V06-ICONF-1); the naming feature `formerWall` (file f item 409) is declared at §10.4 with V11 row 68's `naming.formerWall`.
- **model §7.1 / determinism §7.4** (item 114): `repairWall`'s material and `wearWall`'s lifecycle row and undo; §7.7 gains the generation-time condition row from readiness and wealth (item 114 (d)).
- **determinism**: §7.4's advance-group undo after a reload and in a shared document as V06 §4.1 states (EI-V06-EDGE-2); the creation prefix's `epoch` events flagged `creation`, never an undo target (V06 §3.20.3).
- **rendering §8.2**: the wall state rows for `worn` (district band and finer) and `patched` (its patch material's line style and colour, pattern never colour alone, item 112) and the legend (item 114 (e)); `live.history` unchanged; **§11.1**: exports carry each wall run's condition and material, the `HistoryRecord` in the history block, and `plat:flow` on a spring (V06 §5.3).
- **scope §16 and INDEX §3/§4**: M6-E priced at 29.5 – 41.75 person-weeks (E9, the replay, after E8 and after V04's `BuriedFormer.lay` and V11's `history.*` cells); §13's take-over row reads T-V6-1 – T-V6-74 (T-V6-70 the edge suite; T-V6-71 – 74 items 113, 111, 114, 115).
- **V04**: `BuriedFormer.lay(doc, epoch, former)` is called by V06's replay in the batch of the coarse epoch whose ruin age first passes `history.burialYears`; V06 clears the former records (`cleared`, cause `rule:burial`) and writes `HistoryRecord.buried`; `under.access` tests the buried system in the same epoch; item 113 (e)'s `lost` joins the access states (E-39); the X2, X14, X25 rows (§6).
- **V05**: item 111's `dry` reads the ground arena only; the X15 and X26 rows (§6).
- **V07**: the palisade's patch rows in `walls.patchMaterials` (item 114); a village epoch under a replay (the deserted place, target 0, between a destruction and a later resettlement, V06 §3.20.5 (2)); the X4, X22, X27, X36, X43 rows.
- **V08**: `Recipe.history` carries the age and founding, the events with years ago and severity, `tierHistory`, `populationHistory`, `calamityHistory`, the lifecycle's terminal death and resettlement and `peakTier`; the dossier's defence readiness folded into the slice's threat; V08 §3.5's `wealth` diff row (W-DOS-02); what "specified" reads for item 115 (c); the X5 and X23 rows.
- **V09**: the message row for "a neighbourhood alone has no history yet — open it in its town to advance time" (V06-WGAP-1a); `info.remove.holds`'s deck-plot variant (V06-AGREE-1); the wall tool's repair material and the "wear" hand form (item 114 (f)); the history-first generation's progress and its cancel offer "Generate without its history" (V06 §3.20.4); the X6, X21, X30 rows.
- **V10**: the bend row for the standalone-neighbourhood line (V06-WGAP-1b); the symbolic-peak line "the old walls show this was once a city; its exact size is not recorded" and the replay story lines (V06 §3.20.6); the wall run's story (item 114 (f)); the X7, X17, X30 rows.
- **V11**: item 113's cells `history.epochYears`, `history.symbolicQuantile`, `history.burialYears` (with the site's factors), `history.reuseCost` and the `HistoryEventRow` table (V06 §2.14); item 114's `walls.condition.needReturnYears`, `.meansLow`, `.meansHigh`, `.meansWindowYears`, `.localWeight`, `.wearChancePerYear`, `.poorWearChancePerYear`, `.poorBreachChancePerYear`, `.bothLowFactor`, `.rebuildRunsPerYear` and the `walls.patchMaterials` rows by wall kind and culture with weights; item 115's ceiling table; the X8 row.
- **V12**: register T-V6-71 – T-V6-74's bars and the no-op pins (`history.replay` false; item 114's neutral values; item 115 at TOWN and above), `bar.T-V6-72` (V06 §8); the X9, X19, X31 rows.

## 10 Checks run (provisional where noted)

- `docs/validation/bench/doc_checks.py --doc docs/validation/coherence/new/volumes/V06-evolution.md`: C1 0, C2 0, C3 286
  hits (278 unreviewed), C4 0, S1 0, S2 534 (bare base pointers the volume's own headings cannot resolve). Its warning,
  recorded as given: "reference corpus INCOMPLETE (missing: captures, research/patreon, research/devlogs,
  research/ftg-docs, research/external) - clean-room results are NOT authoritative; re-run on the machine that holds the
  corpus before any freeze". The source volume on the same run: C3 411 (403 unreviewed), S2 569. PROVISIONAL.
- References: all 891 `V06 §x` citations resolve to a heading or numbered paragraph of the new text; every T-V6 (74),
  J-V6 (134) and W (90) id is defined once and every reference to one resolves; every fixture named is defined.
- Terms: no `V6 §`, `V4 §`-style pointer, `BCR-V6-` outside §10, "retired way", "decline lottery", "lone neighbourhood",
  "DR-V6.1", "Change from here", "scoped re-roll", critique or seam id, `scratchpad` path or deferral wording remains
  ("lot" survives only inside the user's quoted "grow a lot").
- File f coverage: 46 of 46 items concerning V06 cited in the text.
- Mapping: 538 of 538 inventory ids (502 items, 36 terms) mapped; every section cited by the mapping exists.

## 11 MAPPING TABLE — every inventory id of the volume → where it now lives

Written by `work/rewrite-V06/mapping.py` from `docs/validation/coherence/inventory-vol-V05-V06.json` and the canon's
roles; a section cited here is the new text's section of the same number (the numbering is kept). 538 rows: 502
items and 36 terms; none unmapped.

| inventory id | old section | canon role | now lives |
|---|---|---|---|
| V06-0001 | 0 | home | V06 §0 |
| V06-0002 | 0 | home | V06 §0 |
| V06-0003 | 0 | home | V06 §0 |
| V06-0004 | 0 | home | V06 §0 |
| V06-0005 | 0 | home | V06 §0 |
| V06-0006 | 0 | home | V06 §0 |
| V06-0007 | 0 | home | V06 §0 |
| V06-0008 | 0 | home | V06 §0 |
| V06-0009 | 0 | home | V06 §0 |
| V06-0010 | 1.1 | home | V06 §1.1 |
| V06-0011 | 1.2 | home | V06 §1.2 |
| V06-0012 | 1.3 | index-row | V06 §1.3 (index row; home V05 §3.15) |
| V06-0013 | 1.3 | index-row | V06 §1.3 (index row; home V04 §3.10) |
| V06-0014 | 1.3 | index-row | V06 §1.3 (index row; home V03 §3.7.4, V02's crypt ladder) |
| V06-0015 | 1.3 | index-row | V06 §1.3 (index row; the base side of items 105–108 at its homes, V11's rows) |
| V06-0016 | 1.3 | index-row | V06 §1.3 (index row; home V08 §3.6) |
| V06-0017 | 1.3 | index-row | V06 §1.3 (index row; item 110's base half, file f items 244, 290) |
| V06-0018 | 1.3 | home | V06 §1.3 |
| V06-0019 | 1b | home | V06 §1b W1 |
| V06-0020 | 1b | home | V06 §1b W2 |
| V06-0021 | 1b | home | V06 §1b W3 |
| V06-0022 | 1b | home | V06 §1b W4 |
| V06-0023 | 1b | home | V06 §1b W5 |
| V06-0024 | 1b | home | V06 §1b W6 |
| V06-0025 | 1b | home | V06 §1b W7 |
| V06-0026 | 1b | home | V06 §1b W9 |
| V06-0027 | 1b | home | V06 §1b W10 |
| V06-0028 | 1b | home | V06 §1b W11 |
| V06-0029 | 1b | home | V06 §1b W12 |
| V06-0030 | 1b | home | V06 §1b W14 |
| V06-0031 | 1b | home | V06 §1b W17 |
| V06-0032 | 1b | home | V06 §1b W19 |
| V06-0033 | 1b | home | V06 §1b W20 |
| V06-0034 | 1b | home | V06 §1b W23 |
| V06-0035 | 1b | home | V06 §1b W27 |
| V06-0036 | 1b | home | V06 §1b W31 |
| V06-0037 | 1b | home | V06 §1b W32 |
| V06-0038 | 1b | home | V06 §1b W34 |
| V06-0039 | 1b | home | V06 §1b W36 |
| V06-0040 | 1b | home | V06 §1b W38 |
| V06-0041 | 1b | home | V06 §1b W40 |
| V06-0042 | 1b | home | V06 §1b W42 |
| V06-0043 | 1b | home | V06 §1b W44 |
| V06-0044 | 1b | home | V06 §1b W45 |
| V06-0045 | 1b | home | V06 §1b W46 |
| V06-0046 | 1b | home | V06 §1b W48 |
| V06-0047 | 1b | home | V06 §1b W49 |
| V06-0048 | 1b | home | V06 §1b W51 |
| V06-0049 | 1b | home | V06 §1b W52 |
| V06-0050 | 1b | home | V06 §1b W55 |
| V06-0051 | 1b | home | V06 §1b W57 |
| V06-0052 | 1b | home | V06 §1b W58 |
| V06-0053 | 1b | home | V06 §1b W60 |
| V06-0054 | 1b | home | V06 §1b W61 |
| V06-0055 | 1b | home | V06 §1b W62 |
| V06-0056 | 1b | home | V06 §1b W64 |
| V06-0057 | 1b | home | V06 §1b W65 |
| V06-0058 | 1b | home | V06 §1b W68 |
| V06-0059 | 1b | home | V06 §1b W70 |
| V06-0060 | 1b | home | V06 §1b W72 |
| V06-0061 | 1b | home | V06 §1b W74 |
| V06-0062 | 1b | home | V06 §1b W76 |
| V06-0063 | 1b | home | V06 §1b W77 |
| V06-0064 | 1b | home | V06 §1b W79 |
| V06-0065 | 1b | index-row | V06 §1b W80 (bars list with T-V6-62 and T-V6-72) |
| V06-0066 | 1b | home | V06 §1b W81 |
| V06-0067 | 1b | home | V06 §1b (dossier trace) |
| V06-0068 | 1b | home | V06 §1b (dossier trace) |
| V06-0069 | 1b | home | V06 §1b (dossier trace) |
| V06-0070 | 1b | home | V06 §1b dossier trace (calamities: DR28, V06-XCONF-2) |
| V06-0071 | 1b | home | V06 §1b (dossier trace) |
| V06-0072 | 1b | home | V06 §1b (dossier trace) |
| V06-0073 | 1b | home | V06 §1b (dossier trace) |
| V06-0074 | 1b | home | V06 §1b dossier trace (the realm latitude: DR29, V06-XCONF-2) |
| V06-0075 | 2 | home | V06 §2 |
| V06-0076 | 2.1 | home | V06 §2.1 |
| V06-0077 | 2.1 | home | V06 §2.1 |
| V06-0078 | 2.1 | home | V06 §2.1 |
| V06-0079 | 2.1 | home | V06 §2.1 |
| V06-0080 | 2.1 | home | V06 §2.1 |
| V06-0081 | 2.1 | home | V06 §2.1 |
| V06-0082 | 2.1 | home | V06 §2.1 |
| V06-0083 | 2.1 | home | V06 §2.1 |
| V06-0084 | 2.1 | home | V06 §2.1 |
| V06-0085 | 2.1 | home | V06 §2.1 |
| V06-0086 | 2.1 | home | V06 §2.1 |
| V06-0087 | 2.1 | home | V06 §2.1 |
| V06-0088 | 2.2 | home | V06 §2.2 |
| V06-0089 | 2.2 | home | V06 §2.2 |
| V06-0090 | 2.2 | home | V06 §2.2 |
| V06-0091 | 2.2 | home | V06 §2.2 |
| V06-0092 | 2.2 | home | V06 §2.2 |
| V06-0093 | 2.2 | home | V06 §2.2 |
| V06-0094 | 2.2 | home | V06 §2.2 |
| V06-0095 | 2.2 | home | V06 §2.2 |
| V06-0096 | 2.2 | home | V06 §2.2 |
| V06-0097 | 2.2 | home | V06 §2.2 |
| V06-0098 | 2.2 | home | V06 §2.2 |
| V06-0099 | 2.2 | reference | V06 §2.2 (cites V11 §3.18's cells; no copy) |
| V06-0100 | 2.2 | reference | V06 §2.2 (V09's per-device settings; J-V6.80) |
| V06-0101 | 2.3 | home | V06 §2.3 |
| V06-0102 | 2.3 | home | V06 §2.3 (`AdvanceRequest`; `advance.stoppedAt?` in the provenance, file f item 343, V06-ICONF-3) |
| V06-0103 | 2.3 | home | V06 §2.3 |
| V06-0104 | 2.3 | home | V06 §2.3 |
| V06-0105 | 2.4 | home | V06 §2.4 |
| V06-0106 | 2.4 | home | V06 §2.4 (the calamity table, DR28; the `drought` row added, J-V6.128) |
| V06-0107 | 2.4 | home | V06 §2.4 |
| V06-0108 | 2.5 | home | V06 §2.5 |
| V06-0109 | 2.6 | home | V06 §2.6 |
| V06-0110 | 2.7 | reference | V06 §2.7 cites §2.7 (file f item 254) |
| V06-0111 | 2.8 | reference | V06 §2.8 (`EvolveOp` declaration kept: the base union lacks it — cross-part note to pipeline §4.11; file f item 209) |
| V06-0112 | 2.8 | reference | V06 §2.8 (`repairWall`; the no-stretch, nothing-to-lift case a no-op with its line, V06-ICONF-1; item 114's material) |
| V06-0113 | 2.8 | reference | V06 §2.8 (`retypeLand`; file f item 209) |
| V06-0114 | 2.8 | reference | V06 §2.8 cites §2.4's `Way.formerClass` (file f item 209) |
| V06-0115 | 2.9 | reference | V06 §2.9 (`Use.strain` kept: model §2.7 lacks it — cross-part note; file f item 429) |
| V06-0116 | 2.10 | home | V06 §2.10 |
| V06-0117 | 2.10 | home | V06 §2.10 |
| V06-0118 | 2.10 | home | V06 §2.10 |
| V06-0119 | 2.11 | home | V06 §2.11 |
| V06-0120 | 2.12 | home | V06 §2.12 |
| V06-0121 | 2.12 | home | V06 §2.12 |
| V06-0122 | 2.12 | home | V06 §2.12 |
| V06-0123 | 2.12 | home | V06 §2.12 |
| V06-0124 | 2.12 | home | V06 §2.12 |
| V06-0125 | 2.12 | home | V06 §2.12 |
| V06-0126 | 2.12 | home | V06 §2.12 |
| V06-0127 | 2.12 | home | V06 §2.12 |
| V06-0128 | 2.12 | home | V06 §2.12 |
| V06-0129 | 2.12 | reference | V06 §2.12 (crypt row cites V03 §3.7.4 and V02's crypt ladder) |
| V06-0130 | 2.12 | home | V06 §2.12 |
| V06-0131 | 2.12 | home | V06 §2.12 |
| V06-0132 | 2.12 | home | V06 §2.12 |
| V06-0133 | 2.12 | home | V06 §2.12 |
| V06-0134 | 2.12 | home | V06 §2.12 |
| V06-0135 | 2.13 | home | V06 §2.13 |
| V06-0136 | 2.13 | home | V06 §2.13 |
| V06-0137 | 2.13 | home | V06 §2.13 |
| V06-0138 | 2.13 | home | V06 §2.13 |
| V06-0139 | 3.1 | home | V06 §3.1 |
| V06-0140 | 3.1 | home | V06 §3.1 |
| V06-0141 | 3.1 | home | V06 §3.1 |
| V06-0142 | 3.1 | home | V06 §3.1 |
| V06-0143 | 3.1 | home | V06 §3.1 |
| V06-0144 | 3.1 | home | V06 §3.1 |
| V06-0145 | 3.1 | home | V06 §3.1 |
| V06-0146 | 3.2 | home | V06 §3.2 |
| V06-0147 | 3.2 | home | V06 §3.2 |
| V06-0148 | 3.2 | home | V06 §3.2 |
| V06-0149 | 3.2 | home | V06 §3.2 |
| V06-0150 | 3.2 | reference | V06 §3.2 (cites V04 §3.5.4 (d)) |
| V06-0151 | 3.2 | home | V06 §3.2 |
| V06-0152 | 3.2 | home | V06 §3.2 |
| V06-0153 | 3.2 | home | V06 §3.2 |
| V06-0154 | 3.3 | home | V06 §3.3 |
| V06-0155 | 3.3 | home | V06 §3.3 |
| V06-0156 | 3.3 | home | V06 §3.3 |
| V06-0157 | 3.3 | home | V06 §3.3 |
| V06-0158 | 3.3 | home | V06 §3.3 |
| V06-0159 | 3.3 | home | V06 §3.3 |
| V06-0160 | 3.4 | home | V06 §3.4 |
| V06-0161 | 3.4 | home | V06 §3.4 |
| V06-0162 | 3.4 | home | V06 §3.4 |
| V06-0163 | 3.4 | home | V06 §3.4 |
| V06-0164 | 3.4 | home | V06 §3.4 |
| V06-0165 | 3.4 | home | V06 §3.4 |
| V06-0166 | 3.4 | home | V06 §3.4 |
| V06-0167 | 3.4 | home | V06 §3.4 |
| V06-0168 | 3.5.1 | home | V06 §3.5.1 |
| V06-0169 | 3.5.1 | home | V06 §3.5.1 |
| V06-0170 | 3.5.2 | home | V06 §3.5.2 |
| V06-0171 | 3.5.2 | home | V06 §3.5.2 |
| V06-0172 | 3.5.2 | home | V06 §3.5.2 |
| V06-0173 | 3.5.2 | home | V06 §3.5.2 |
| V06-0174 | 3.5.2 | home | V06 §3.5.2 |
| V06-0175 | 3.5.2 | home | V06 §3.5.2 |
| V06-0176 | 3.5.2 | home | V06 §3.5.2 |
| V06-0177 | 3.5.2 | home | V06 §3.5.2 |
| V06-0178 | 3.5.2 | home | V06 §3.5.2 |
| V06-0179 | 3.5.2 | home | V06 §3.5.2 |
| V06-0180 | 3.5.3 | home | V06 §3.5.3 |
| V06-0181 | 3.5.3 | home | V06 §3.5.3 |
| V06-0182 | 3.6 | home | V06 §3.6 |
| V06-0183 | 3.6 | home | V06 §3.6 |
| V06-0184 | 3.6 | home | V06 §3.6 |
| V06-0185 | 3.7.1 | home | V06 §3.7.1 |
| V06-0186 | 3.7.1 | home | V06 §3.7.1 |
| V06-0187 | 3.7.2 | home | V06 §3.7.2 |
| V06-0188 | 3.7.2 | home | V06 §3.7.2 |
| V06-0189 | 3.7.2 | home | V06 §3.7.2 |
| V06-0190 | 3.7.3 | home | V06 §3.7.3 |
| V06-0191 | 3.7.4 | home | V06 §3.7.4 |
| V06-0192 | 3.7.4 | home | V06 §3.7.4 |
| V06-0193 | 3.7.5 | home | V06 §3.7.5 |
| V06-0194 | 3.7.5 | home | V06 §3.7.5 |
| V06-0195 | 3.7.6 | home | V06 §3.7.6 |
| V06-0196 | 3.7.6 | home | V06 §3.7.6 |
| V06-0197 | 3.7.6 | home | V06 §3.7.6 |
| V06-0198 | 3.7.6 | home | V06 §3.7.6 |
| V06-0199 | 3.7.6 | home | V06 §3.7.6 |
| V06-0200 | 3.7.6 | home | V06 §3.7.6 |
| V06-0201 | 3.8.1 | home | V06 §3.8.1 |
| V06-0202 | 3.8.2 | home | V06 §3.8.2 |
| V06-0203 | 3.8.2 | home | V06 §3.8.2 |
| V06-0204 | 3.8.2 | home | V06 §3.8.2 |
| V06-0205 | 3.8.3 | home | V06 §3.8.3 |
| V06-0206 | 3.8.4 | home | V06 §3.8.4 |
| V06-0207 | 3.9 | home | V06 §3.9 |
| V06-0208 | 3.9.1 | home | V06 §3.9.1 |
| V06-0209 | 3.9.1 | home | V06 §3.9.1 |
| V06-0210 | 3.9.2 | home | V06 §3.9.2 |
| V06-0211 | 3.9.3 | home | V06 §3.9.3 |
| V06-0212 | 3.9.4 | home | V06 §3.9.4 |
| V06-0213 | 3.9.5 | home | V06 §3.9.5 |
| V06-0214 | 3.9.5 | home | V06 §3.9.5 |
| V06-0215 | 3.9.5 | home | V06 §3.9.5 |
| V06-0216 | 3.9.6 | home | V06 §3.9.6 |
| V06-0217 | 3.9.6 | home | V06 §3.9.6 |
| V06-0218 | 3.9.6 | home | V06 §3.9.6 |
| V06-0219 | 3.9.7 | home | V06 §3.9.7 |
| V06-0220 | 3.9.8 | home | V06 §3.9.8 |
| V06-0221 | 3.9.9 | home | V06 §3.9.9 |
| V06-0222 | 3.9.10 | home | V06 §3.9.10 |
| V06-0223 | 3.9.10 | home | V06 §3.9.10 |
| V06-0224 | 3.9.10 | home | V06 §3.9.10 |
| V06-0225 | 3.9.11 | home | V06 §3.9.11 |
| V06-0226 | 3.9.11 | home | V06 §3.9.11 |
| V06-0227 | 3.10.1 | home | V06 §3.10.1 |
| V06-0228 | 3.10.2 | home | V06 §3.10.2 |
| V06-0229 | 3.10.3 | home | V06 §3.10.3 |
| V06-0230 | 3.11.1 | home | V06 §3.11.1 |
| V06-0231 | 3.11.2 | home | V06 §3.11.2 |
| V06-0232 | 3.11.2 | home | V06 §3.11.2 |
| V06-0233 | 3.11.3 | home | V06 §3.11.3 |
| V06-0234 | 3.11.4 | home | V06 §3.11.4 |
| V06-0235 | 3.11.5 | home | V06 §3.11.5 |
| V06-0236 | 3.11.6 | home | V06 §3.11.6 |
| V06-0237 | 3.12 | home | V06 §3.12 |
| V06-0238 | 3.12 | home | V06 §3.12 |
| V06-0239 | 3.13 | home | V06 §3.13 |
| V06-0240 | 3.13 | home | V06 §3.13 |
| V06-0241 | 3.13 | home | V06 §3.13 |
| V06-0242 | 3.14 | home | V06 §3.14 |
| V06-0243 | 3.15.1 | home | V06 §3.15.1 |
| V06-0244 | 3.15.2 | home | V06 §3.15.2 |
| V06-0245 | 3.15.2 | home | V06 §3.15.2 |
| V06-0246 | 3.15.4 | home | V06 §3.15.4 |
| V06-0247 | 3.15.5 | home | V06 §3.15.5 |
| V06-0248 | 3.16 | home | V06 §3.16 |
| V06-0249 | 3.16 | home | V06 §3.16 |
| V06-0250 | 3.16 | home | V06 §3.16 |
| V06-0251 | 3.17 | home | V06 §3.17 |
| V06-0252 | 3.17 | home | V06 §3.17 |
| V06-0253 | 3.18 | index-row | V06 §3.18 (index paragraph; V04 owns the systems) |
| V06-0254 | 3.18.1 | home | V06 §3.18.1 |
| V06-0255 | 3.18.1 | home | V06 §3.18.1 |
| V06-0256 | 3.18.1 | home | V06 §3.18.1 |
| V06-0257 | 3.18.1 | home | V06 §3.18.1 |
| V06-0258 | 3.18.1 | home | V06 §3.18.1 |
| V06-0259 | 3.18.1 | home | V06 §3.18.1 |
| V06-0260 | 3.18.1 | home | V06 §3.18.1 |
| V06-0261 | 3.18.2 | home | V06 §3.18.2 |
| V06-0262 | 3.18.2 | home | V06 §3.18.2 |
| V06-0263 | 3.18.2 | home | V06 §3.18.2 |
| V06-0264 | 3.18.2 | home | V06 §3.18.2 |
| V06-0265 | 3.18.3 | home | V06 §3.18.3 |
| V06-0266 | 3.18.3 | home | V06 §3.18.3 |
| V06-0267 | 3.19 | home | V06 §3.19 |
| V06-0268 | 3.19 | home | V06 §3.19 |
| V06-0269 | 3.19 | home | V06 §3.19 |
| V06-0270 | 3.19 | home | V06 §3.19 |
| V06-0271 | 3.19 | home | V06 §3.19 |
| V06-0272 | 3.19 | home | V06 §3.19 |
| V06-0273 | 3.19 | home | V06 §3.19 |
| V06-0274 | 3.19 | home | V06 §3.19 |
| V06-0275 | 3.19 | home | V06 §3.19 |
| V06-0276 | 3.19 | home | V06 §3.19 |
| V06-0277 | 3.19 | home | V06 §3.19 |
| V06-0278 | 3.19 | home | V06 §3.19 |
| V06-0279 | 3.19 | reference | V06 §3.19 (cites V11 §3.24.2; no copy — V11:X-V11-11) |
| V06-0280 | 3.19.1 | home | V06 §3.19.1 |
| V06-0281 | 3.19.1 | home | V06 §3.19.1 |
| V06-0282 | 3.19.2 | home | V06 §3.19.2 |
| V06-0283 | 3.19.2 | home | V06 §3.19.2 |
| V06-0284 | 3.19.2 | home | V06 §3.19.2 |
| V06-0285 | 3.19.3 | home | V06 §3.19.3 |
| V06-0286 | 3.19.3 | home | V06 §3.19.3 |
| V06-0287 | 3.19.3 | home | V06 §3.19.3 |
| V06-0288 | 3.19.3 | home | V06 §3.19.3 |
| V06-0289 | 3.19.4 | home | V06 §3.19.4 |
| V06-0290 | 3.19.4 | home | V06 §3.19.4 |
| V06-0291 | 3.19.4 | home | V06 §3.19.4 |
| V06-0292 | 3.19.5 | home | V06 §3.19.5 |
| V06-0293 | 3.19.5 | home | V06 §3.19.5 |
| V06-0294 | 3.19.6 | home | V06 §3.19.6 |
| V06-0295 | 4.1 | home | V06 §4.1 |
| V06-0296 | 4.1 | home | V06 §4.1 and §1.3 (a standalone neighbourhood document has no clock — CANON-C02; J-V6.102) |
| V06-0297 | 4.1 | home | V06 §4.1 |
| V06-0298 | 4.1 | home | V06 §4.1 |
| V06-0299 | 4.2 | home | V06 §4.2 |
| V06-0300 | 4.2 | home | V06 §4.2 |
| V06-0301 | 4.2 | home | V06 §4.2 |
| V06-0302 | 4.2 | home | V06 §4.2 |
| V06-0303 | 4.3 | home | V06 §4.3 |
| V06-0304 | 4.4 | home | V06 §4.4 |
| V06-0305 | 4.4 | home | V06 §4.4 |
| V06-0306 | 4.5 | home | V06 §4.5 |
| V06-0307 | 4.5 | reference | V06 §4.5 (V10's raised-way provider; the ledger's single-subject read, file f item 290; V10:CVR-V10-11) |
| V06-0308 | 5.1 | home | V06 §5.1 |
| V06-0309 | 5.1 | home | V06 §5.1 |
| V06-0310 | 5.1 | home | V06 §5.1 (timeline bar; "Open a copy from here", V06-ICONF-4) |
| V06-0311 | 5.2 | home | V06 §5.2 |
| V06-0312 | 5.3 | home | V06 §5.3 |
| V06-0313 | 6 | home | V06 §6 |
| V06-0314 | 6 | home | V06 §6 |
| V06-0315 | 6.2 | home | V06 §6.2 |
| V06-0316 | 6.2 | home | V06 §6.2 |
| V06-0317 | 6.2 | home | V06 §6.2 |
| V06-0318 | 6.3 | home | V06 §6.3 |
| V06-0319 | 6.5 | home | V06 §6.5 |
| V06-0320 | 7 | home | V06 §7 |
| V06-0321 | 7 | home | V06 §7 T-V6-1 |
| V06-0322 | 7 | home | V06 §7 T-V6-5 |
| V06-0323 | 7 | home | V06 §7 T-V6-9 |
| V06-0324 | 7 | home | V06 §7 T-V6-12 |
| V06-0325 | 7 | home | V06 §7 T-V6-13 |
| V06-0326 | 7 | home | V06 §7 T-V6-16 |
| V06-0327 | 7 | home | V06 §7 T-V6-19 |
| V06-0328 | 7 | home | V06 §7 T-V6-22 |
| V06-0329 | 7 | home | V06 §7 T-V6-25 |
| V06-0330 | 7 | home | V06 §7 T-V6-27 |
| V06-0331 | 7 | home | V06 §7 T-V6-33 |
| V06-0332 | 7 | home | V06 §7 T-V6-38 |
| V06-0333 | 7 | home | V06 §7 T-V6-41 |
| V06-0334 | 7 | home | V06 §7 T-V6-46 |
| V06-0335 | 7 | home | V06 §7 T-V6-51 |
| V06-0336 | 7 | home | V06 §7 T-V6-52 |
| V06-0337 | 7 | home | V06 §7 T-V6-57 |
| V06-0338 | 7 | home | V06 §7 T-V6-59 |
| V06-0339 | 7 | home | V06 §7 T-V6-62 |
| V06-0340 | 7 | home | V06 §7 T-V6-64 |
| V06-0341 | 7 | home | V06 §7 T-V6-67 |
| V06-0342 | 7 | home | V06 §7 |
| V06-0343 | 8 | home | V06 §8 |
| V06-0344 | 8 | home | V06 §8 |
| V06-0345 | 8 | reference | V06 §8 *Exits and the calibration register* (cites V12 §3.11) |
| V06-0346 | 8 | reference | V06 §8 (bar registrations; J-V6.117) |
| V06-0347 | 8 | home | V06 §8 |
| V06-0348 | 8 | home | V06 §8 |
| V06-0349 | 9 | home | V06 §9 J-V6.1 |
| V06-0350 | 9 | home | V06 §9 J-V6.2 |
| V06-0351 | 9 | home | V06 §9 J-V6.3 |
| V06-0352 | 9 | home | V06 §9 J-V6.4 (marked "superseded by J-V6.127"; V06-XCONF-1; item 113 at V06 §3.20) |
| V06-0353 | 9 | home | V06 §9 J-V6.5 (marked "amended by J-V6.61", E-24) |
| V06-0354 | 9 | home | V06 §9 J-V6.6 |
| V06-0355 | 9 | home | V06 §9 J-V6.7 |
| V06-0356 | 9 | home | V06 §9 J-V6.8 |
| V06-0357 | 9 | home | V06 §9 J-V6.9 |
| V06-0358 | 9 | home | V06 §9 J-V6.10 |
| V06-0359 | 9 | home | V06 §9 J-V6.11 |
| V06-0360 | 9 | home | V06 §9 J-V6.12 |
| V06-0361 | 9 | home | V06 §9 J-V6.13 |
| V06-0362 | 9 | home | V06 §9 J-V6.14 |
| V06-0363 | 9 | home | V06 §9 J-V6.15 |
| V06-0364 | 9 | home | V06 §9 J-V6.16 |
| V06-0365 | 9 | home | V06 §9 J-V6.17 |
| V06-0366 | 9 | home | V06 §9 J-V6.18 |
| V06-0367 | 9 | home | V06 §9 J-V6.19 |
| V06-0368 | 9 | home | V06 §9 J-V6.20 |
| V06-0369 | 9 | home | V06 §9 J-V6.21 |
| V06-0370 | 9 | home | V06 §9 J-V6.22 |
| V06-0371 | 9 | home | V06 §9 J-V6.23 |
| V06-0372 | 9 | home | V06 §9 J-V6.24 |
| V06-0373 | 9 | home | V06 §9 J-V6.25 |
| V06-0374 | 9 | home | V06 §9 J-V6.26 |
| V06-0375 | 9 | home | V06 §9 J-V6.27 |
| V06-0376 | 9 | home | V06 §9 J-V6.28 |
| V06-0377 | 9 | home | V06 §9 J-V6.29 |
| V06-0378 | 9 | home | V06 §9 J-V6.30 |
| V06-0379 | 9 | home | V06 §9 J-V6.31 |
| V06-0380 | 9 | home | V06 §9 J-V6.32 |
| V06-0381 | 9 | home | V06 §9 J-V6.33 |
| V06-0382 | 9 | home | V06 §9 J-V6.34 |
| V06-0383 | 9 | home | V06 §9 J-V6.35 |
| V06-0384 | 9 | home | V06 §9 J-V6.36 |
| V06-0385 | 9 | home | V06 §9 J-V6.37 |
| V06-0386 | 9 | home | V06 §9 J-V6.38 |
| V06-0387 | 9 | home | V06 §9 J-V6.39 |
| V06-0388 | 9 | home | V06 §9 J-V6.40 |
| V06-0389 | 9 | home | V06 §9 J-V6.41 |
| V06-0390 | 9 | home | V06 §9 J-V6.42 |
| V06-0391 | 9 | home | V06 §9 J-V6.43 |
| V06-0392 | 9 | home | V06 §9 J-V6.44 |
| V06-0393 | 9 | home | V06 §9 J-V6.45 |
| V06-0394 | 9 | home | V06 §9 J-V6.46 |
| V06-0395 | 9 | home | V06 §9 J-V6.47 |
| V06-0396 | 9 | home | V06 §9 J-V6.48 |
| V06-0397 | 9 | home | V06 §9 J-V6.49 |
| V06-0398 | 9 | home | V06 §9 J-V6.50 |
| V06-0399 | 9 | home | V06 §9 J-V6.51 |
| V06-0400 | 9 | home | V06 §9 J-V6.52 |
| V06-0401 | 9 | home | V06 §9 J-V6.53 |
| V06-0402 | 9 | home | V06 §9 J-V6.54 |
| V06-0403 | 9 | home | V06 §9 J-V6.55 |
| V06-0404 | 9 | home | V06 §9 J-V6.56 |
| V06-0405 | 9 | home | V06 §9 J-V6.57 |
| V06-0406 | 9 | home | V06 §9 J-V6.58 |
| V06-0407 | 9 | home | V06 §9 J-V6.59 |
| V06-0408 | 9 | home | V06 §9 J-V6.60 |
| V06-0409 | 9 | home | V06 §9 J-V6.61 |
| V06-0410 | 9 | home | V06 §9 J-V6.62 |
| V06-0411 | 9 | home | V06 §9 J-V6.63 |
| V06-0412 | 9 | home | V06 §9 J-V6.64 |
| V06-0413 | 9 | home | V06 §9 J-V6.65 |
| V06-0414 | 9 | home | V06 §9 J-V6.66 |
| V06-0415 | 9 | home | V06 §9 J-V6.67 |
| V06-0416 | 9 | home | V06 §9 J-V6.68 |
| V06-0417 | 9 | home | V06 §9 J-V6.69 |
| V06-0418 | 9 | home | V06 §9 J-V6.70 |
| V06-0419 | 9 | home | V06 §9 J-V6.71 |
| V06-0420 | 9 | home | V06 §9 J-V6.72 |
| V06-0421 | 9 | home | V06 §9 J-V6.73 |
| V06-0422 | 9 | home | V06 §9 J-V6.74 |
| V06-0423 | 9 | home | V06 §9 J-V6.75 |
| V06-0424 | 9 | home | V06 §9 J-V6.76 |
| V06-0425 | 9 | home | V06 §9 J-V6.77 |
| V06-0426 | 9 | home | V06 §9 J-V6.78 |
| V06-0427 | 9 | home | V06 §9 J-V6.79 (final form; round narration dropped) |
| V06-0428 | 9 | home | V06 §9 J-V6.80 |
| V06-0429 | 9 | home | V06 §9 J-V6.81 |
| V06-0430 | 9 | home | V06 §9 J-V6.82 |
| V06-0431 | 9 | home | V06 §9 J-V6.83 |
| V06-0432 | 9 | home | V06 §9 J-V6.84 |
| V06-0433 | 9 | home | V06 §9 J-V6.85 |
| V06-0434 | 9 | home | V06 §9 J-V6.86 |
| V06-0435 | 9 | home | V06 §9 J-V6.87 |
| V06-0436 | 9 | home | V06 §9 J-V6.88 |
| V06-0437 | 9 | home | V06 §9 J-V6.89 |
| V06-0438 | 9 | home | V06 §9 J-V6.90 |
| V06-0439 | 9 | home | V06 §9 J-V6.91 |
| V06-0440 | 9 | home | V06 §9 J-V6.92 (reworded to the ruled form, V06-ICONF-2) |
| V06-0441 | 9 | home | V06 §9 J-V6.93 |
| V06-0442 | 9 | home | V06 §9 J-V6.94 |
| V06-0443 | 9 | home | V06 §9 J-V6.95 |
| V06-0444 | 9 | home | V06 §9 J-V6.96 |
| V06-0445 | 9 | home | V06 §9 J-V6.97 |
| V06-0446 | 9 | home | V06 §9 J-V6.98 ("standalone neighbourhood document", G-standalone) |
| V06-0447 | 9 | home | V06 §9 J-V6.99 |
| V06-0448 | 9 | home | V06 §9 J-V6.100 |
| V06-0449 | 9 | home | V06 §9 J-V6.101 |
| V06-0450 | 9 | home | V06 §9 J-V6.102 (the decided rule: no clock; no deferral — CANON-C02, V06-DEFER-1) |
| V06-0451 | 9 | home | V06 §9 J-V6.103 |
| V06-0452 | 9 | home | V06 §9 J-V6.104 |
| V06-0453 | 9 | home | V06 §9 J-V6.105 |
| V06-0454 | 9 | home | V06 §9 J-V6.106 |
| V06-0455 | 9 | home | V06 §9 J-V6.107 |
| V06-0456 | 9 | home | V06 §9 J-V6.108 |
| V06-0457 | 9 | home | V06 §9 J-V6.109 |
| V06-0458 | 9 | home | V06 §9 J-V6.110 (marked "amended by J-V6.131", E-24) |
| V06-0459 | 9 | home | V06 §9 J-V6.111 (marked "amended by J-V6.126", E-24) |
| V06-0460 | 9 | home | V06 §9 J-V6.112 (marked "amended by J-V6.131", E-24) |
| V06-0461 | 9 | home | V06 §9 J-V6.113 |
| V06-0462 | 9 | home | V06 §9 J-V6.114 |
| V06-0463 | 9 | home | V06 §9 J-V6.115 |
| V06-0464 | 9 | home | V06 §9 J-V6.116 |
| V06-0465 | 9 | home | V06 §9 J-V6.117 |
| V06-0466 | 9 | home | V06 §9 J-V6.118 (final bounds 25 / 115 / 215 s; round history dropped; V06 §6.2 cites V05 §6 by row name — V06-RESTATE-1) |
| V06-0467 | 9 | home | V06 §9 J-V6.119 |
| V06-0468 | 9 | home | V06 §9 J-V6.120 |
| V06-0469 | 9 | home | V06 §9 J-V6.121 |
| V06-0470 | 9 | home | V06 §9 J-V6.122 |
| V06-0471 | 9 | home | V06 §9 J-V6.123 |
| V06-0472 | 9 | home | V06 §9 J-V6.124 |
| V06-0473 | 9 | home | V06 §9 J-V6.125 (final form) |
| V06-0474 | 9 | home | V06 §9 J-V6.126 (E9's due `V6-E9` added) |
| V06-0475 | 10 | bcr-pointer | V06 §10 pointer row BCR-V6-1 → file f item 317 → §4.11; §14 |
| V06-0476 | 10 | bcr-pointer | V06 §10 pointer row BCR-V6-2 → file f item 321 → §4.11 *Works* |
| V06-0477 | 10 | bcr-pointer | V06 §10 pointer row BCR-V6-3 → file f item 254 → §2.7 |
| V06-0478 | 10 | bcr-pointer | V06 §10 pointer row BCR-V6-5 → file f item 209 → §4.11; §2.4 |
| V06-0479 | 10 | bcr-pointer | V06 §10 pointer row BCR-V6-6 → file f item 206 → §2.3 |
| V06-0480 | 10 | bcr-pointer | V06 §10 pointer row BCR-V6-7 → file f item 264 → §2.8; §7.1 |
| V06-0481 | 10 | bcr-pointer | V06 §10 pointer row BCR-V6-8 → file f item 342 → §6.1 |
| V06-0482 | 10 | bcr-pointer | V06 §10 pointer row BCR-V6-9 → file f item 343 → §4.11; §6.1 |
| V06-0483 | 10 | bcr-pointer | V06 §10 pointer row BCR-V6-10 → file f item 443 → §10.3 |
| V06-0484 | 10 | bcr-pointer | V06 §10 pointer row BCR-V6-11 → file f item 458 → §11.2; §7.8 |
| V06-0485 | 10 | bcr-pointer | V06 §10 pointer row BCR-V6-12 → file f item 388 and 383 → §7.7 |
| V06-0486 | 10 | bcr-pointer | V06 §10 pointer row BCR-V6-13 → file f item 275 → §2.9; §4.5 (iv) |
| V06-0487 | 10 | bcr-pointer | V06 §10 pointer row BCR-V6-15 → file f item 409 → §8.2; §11.1; §10.4 |
| V06-0488 | 10 | bcr-pointer | V06 §10 pointer row BCR-V6-17 → file f item 335 → §2.7; §4.11; §5.3 |
| V06-0489 | 10 | bcr-pointer | V06 §10 pointer row BCR-V6-19 → file f item 293 → §4.4 |
| V06-0490 | 10 | bcr-pointer | V06 §10 pointer row BCR-V6-21 → file f item 266 → §4.11; §2.8 |
| V06-0491 | 10 | bcr-pointer | V06 §10 pointer row BCR-V6-23 → file f item 479 → §4.11 (c) |
| V06-0492 | 10 | bcr-pointer | V06 §10 pointer row BCR-V6-25 → file f item 290 and 244 → §4.3; §4.5; §4.11 |
| V06-0493 | 10 | bcr-pointer | V06 §10 pointer row BCR-V6-26 → file f item 291 → §4.11 |
| V06-0494 | 10 | bcr-pointer | V06 §10 pointer row BCR-V6-27 → file f item 573 → §4.11 |
| V06-0495 | 10 | bcr-pointer | V06 §10 pointer row BCR-V6-28 → file f item 574 → §4.11 (6); II.7.3 (c); §4.5 S7b (6) |
| V06-0496 | 11 | answer-J121-J122 | V06 §11 (decided: (a) right after M4, J122; price 29.5–41.75 pw) |
| V06-0497 | 12 | history-out | validation records (history out); V06 §12 keeps one CONFIRMED paragraph and one PLAUSIBLE list |
| V06-0498 | 13 | handoff | V06 §13 (none open; every finding fixed in the text) |
| V06-0499 | 13 | handoff | V06 §13 (closed at destinations; this report §6 lists X1–X49 by destination; cross-part notes §9) |
| V06-0500 | IN | home | folded: V06 §2.5, §3.10.1 (H34); V06 §3.4 (2), §3.13, §3.19 (7) (J-VI.5); V06 §3.2, §3.19 (5) (H20); V06 *Integration notes* map |
| V06-0501 | IN | home | folded: V06 §3.19.4 (5) (H19); T-V6-65 (H21); V06 §4.1, §5.1 (J-VI.12); V06 §2.13, §1b DR28 (J-VI.2, J-VI.14, J-VI.13); V06 *Integration notes* map |
| V06-0502 | RC | home | validation records (history out; every change already in the body) |
| V06-G01 | term | glossary | V06 §3.1 — term `epoch` |
| V06-G02 | term | glossary | V06 §2.1 — term `phase / step / participant` |
| V06-G03 | term | glossary | V06 §3.1 (3) — term `product / fold / hand-off band` |
| V06-G04 | term | glossary | V06 §2.3 — term `trajectory / advance` |
| V06-G05 | term | glossary | V06 §3.3 — term `cadence / span` |
| V06-G06 | term | glossary | V06 §2.11 — term `effective week` |
| V06-G07 | term | glossary | base §4.11 — term `Works` |
| V06-G08 | term | glossary | V06 §3.5.1 — term `departure matching` |
| V06-G09 | term | glossary | V06 §3.5.2 — term `strike pool` (defined once; "decline pool", "decline lottery", "the lottery" retired, G-strike) |
| V06-G10 | term | glossary | base §4.11 — term `exposure field E(x)` |
| V06-G11 | term | glossary | V06 §3.8.2 — term `regrowth tiers (0)-(6), (5′), (5″)` |
| V06-G12 | term | glossary | V06 §3.6 — term `residual / backlog / quantum` |
| V06-G13 | term | glossary | V06 §3.6 (2) — term `overflow ladder` |
| V06-G14 | term | glossary | V06 §3.6 (3) — term `regime` |
| V06-G15 | term | glossary | V06 §3.7 — term `circuit / pathway / fate` |
| V06-G16 | term | glossary | file f item 575 — term `condition run` |
| V06-G17 | term | glossary | V06 §3.9.2 — term `strain` |
| V06-G18 | term | glossary | V06 §3.9.1 — term `record-owned counts` |
| V06-G19 | term | glossary | V06 §3.9.10 (3) — term `split pair` |
| V06-G20 | term | glossary | V06 §2.5, §3.10 — term `MutationPlan` |
| V06-G21 | term | glossary | V06 §2.6, §3.4 — term `building shade mask` |
| V06-G22 | term | glossary | V06 §3.4 (4); BCR-V5-15 (i) — term `one reach law` |
| V06-G23 | term | glossary | V06 §2.4 — term `calamity table` |
| V06-G24 | term | glossary | V06 §2.13, §3.19 — term `raised way / reason key` |
| V06-G25 | term | glossary | V06 §2.13 — term `ledger` |
| V06-G26 | term | glossary | V06 §3.19.3, §3.19.1 — term `suppression / served / released` |
| V06-G27 | term | glossary | V06 §3.19.2 — term `disuse / runs dry` |
| V06-G28 | term | glossary | V06 §3.19.5 — term `deck condition` |
| V06-G29 | term | glossary | V06 §3.5.2 — term `landfall candidate` |
| V06-G30 | term | glossary | V06 §2.11, §3.15.2 — term `history index / store / frame / image / keyframe` |
| V06-G31 | term | glossary | V06 §3.15.3 — term `then-and-now` |
| V06-G32 | term | glossary | V06 §4.4 — term `fork / re-run` |
| V06-G33 | term | glossary | V06 §2.10 — term `chronicle / why rows` |
| V06-G34 | term | glossary | V06 §2.1, §3.8.1 — term `household ledger / displaced pool / transit` |
| V06-G35 | term | glossary | V06 §2.1 — term `EpochScope` |
| V06-G36 | term | glossary | V06 §3.5.2 — term `hollow way (retired way)` ("retired way" retired, G-hollow) |

## 12 EDGES MAP — every catalogue edge and combination → its V06 §3.21 row and test

154 rows: 48 UNDEFINED and 64 UNTESTED mechanism edges (EI-V06-EDGE-1 and -2 among them) and 42 combinations; none
unmapped.

| catalogue id | kind | V06 section | now defined at | test |
|---|---|---|---|---|
| M-V06-524-E5-data | UNDEFINED | §2.1 | V06 §3.21 (a) "the engine's interfaces (V06 §2.1)" | T-V6-70 (a); T-V6-52 |
| M-V06-689-E5-data | UNDEFINED | §2.3 | V06 §3.21 (a) "the trajectory and `advance` (V06 §2.3, §3.3.2)" | T-V6-23 |
| M-V06-724-E5-data | UNTESTED | §2.4 | V06 §3.21 (a) "hazard and calamity rows (V06 §2.4)" | T-V6-27; T-V6-70 (b) |
| M-V06-761-E5-data | UNDEFINED | §2.5 | V06 §3.21 (a) "`MutationPlan` (V06 §2.5, §3.10)" | T-V6-15 |
| M-V06-774-E5-data | UNDEFINED | §2.6 | V06 §3.21 (a) "the building shade mask (V06 §2.6, §3.4)" | T-V6-12 |
| M-V06-795-E5-data | UNDEFINED | §2.8 | V06 §3.21 (a) "the conversion kinds (V06 §2.8)" | T-V6-70 (c); T-V6-11 |
| M-V06-821-E5-data | UNDEFINED | §2.10 | V06 §3.21 (a) "the report and the chronicle (V06 §2.10)" | T-V6-26; T-V6-70 (d) |
| M-V06-935-E5-data | UNDEFINED | §2.13 | V06 §3.21 (a) "item 110's records (V06 §2.13)" | T-V6-58; T-V6-60 |
| M-V06-973-E4-degenerate | UNDEFINED | §3.1 | V06 §3.21 (a) "the runner and the phase order (V06 §3.1–§3.2)" | T-V6-70 (e); T-V6-3 |
| M-V06-1024-E4-degenerate | UNDEFINED | §3.2 | V06 §3.21 (a) "the runner and the phase order (V06 §3.1–§3.2)" | T-V6-70 (e); T-V6-3 |
| M-V06-1104-E1-none | UNTESTED | §3.3 | V06 §3.21 (a) "epoch inputs (V06 §3.3)" | T-V6-23; T-V6-51 |
| M-V06-1104-E2-one | UNTESTED | §3.3 | V06 §3.21 (a) "epoch inputs (V06 §3.3)" | T-V6-23; T-V6-51 |
| M-V06-1104-E4-degenerate | UNDEFINED | §3.3 | V06 §3.21 (a) "epoch inputs (V06 §3.3)" | T-V6-23; T-V6-51 |
| M-V06-1104-E5-data | UNTESTED | §3.3 | V06 §3.21 (a) "epoch inputs (V06 §3.3)" | T-V6-23; T-V6-51 |
| M-V06-1104-E6-rungs | UNTESTED | §3.3 | V06 §3.21 (a) "epoch inputs (V06 §3.3)" | T-V6-23; T-V6-51 |
| M-V06-1104-E8-lifecycle | UNTESTED | §3.3 | V06 §3.21 (a) "epoch inputs (V06 §3.3)" | T-V6-23; T-V6-51 |
| M-V06-1154-E4-degenerate | UNDEFINED | §3.4 | V06 §3.21 (a) "the building shade mask (V06 §2.6, §3.4)" | T-V6-12 |
| M-V06-1154-E6-rungs | UNDEFINED | §3.4 | V06 §3.21 (a) "the building shade mask (V06 §2.6, §3.4)" | T-V6-12 |
| M-V06-1227-E1-none | UNTESTED | §3.5 | V06 §3.21 (a) "decline (V06 §3.5)" | T-V6-5; T-V6-6; T-V6-70 (f) |
| M-V06-1227-E2-one | UNTESTED | §3.5 | V06 §3.21 (a) "decline (V06 §3.5)" | T-V6-5; T-V6-6; T-V6-70 (f) |
| M-V06-1227-E3-cap | UNTESTED | §3.5 | V06 §3.21 (a) "decline (V06 §3.5)" | T-V6-5; T-V6-6; T-V6-70 (f) |
| M-V06-1227-E4-degenerate | UNDEFINED | §3.5 | V06 §3.21 (a) "decline (V06 §3.5)" | T-V6-5; T-V6-6; T-V6-70 (f) |
| M-V06-1227-E5-data | UNTESTED | §3.5 | V06 §3.21 (a) "decline (V06 §3.5)" | T-V6-5; T-V6-6; T-V6-70 (f) |
| M-V06-1227-E6-rungs | UNTESTED | §3.5 | V06 §3.21 (a) "decline (V06 §3.5)" | T-V6-5; T-V6-6; T-V6-70 (f) |
| M-V06-1227-E8-lifecycle | UNTESTED | §3.5 | V06 §3.21 (a) "decline (V06 §3.5)" | T-V6-5; T-V6-6; T-V6-70 (f) |
| M-V06-1368-E1-none | UNTESTED | §3.6 | V06 §3.21 (a) "growth (V06 §3.6)" | T-V6-8; T-V6-31; T-V6-32; T-V6-70 (g) |
| M-V06-1368-E2-one | UNTESTED | §3.6 | V06 §3.21 (a) "growth (V06 §3.6)" | T-V6-8; T-V6-31; T-V6-32; T-V6-70 (g) |
| M-V06-1368-E3-cap | UNTESTED | §3.6 | V06 §3.21 (a) "growth (V06 §3.6)" | T-V6-8; T-V6-31; T-V6-32; T-V6-70 (g) |
| M-V06-1368-E4-degenerate | UNDEFINED | §3.6 | V06 §3.21 (a) "growth (V06 §3.6)" | T-V6-8; T-V6-31; T-V6-32; T-V6-70 (g) |
| M-V06-1368-E5-data | UNTESTED | §3.6 | V06 §3.21 (a) "growth (V06 §3.6)" | T-V6-8; T-V6-31; T-V6-32; T-V6-70 (g) |
| M-V06-1368-E6-rungs | UNDEFINED | §3.6 | V06 §3.21 (a) "growth (V06 §3.6)" | T-V6-8; T-V6-31; T-V6-32; T-V6-70 (g) |
| M-V06-1368-E7-toggles | UNTESTED | §3.6 | V06 §3.21 (a) "growth (V06 §3.6)" | T-V6-8; T-V6-31; T-V6-32; T-V6-70 (g) |
| M-V06-1368-E8-lifecycle | UNTESTED | §3.6 | V06 §3.21 (a) "growth (V06 §3.6)" | T-V6-8; T-V6-31; T-V6-32; T-V6-70 (g) |
| M-V06-1427-E1-none | UNTESTED | §3.7 | V06 §3.21 (a) "fortification (V06 §3.7)" | T-V6-9; T-V6-10; T-V6-11; T-V6-73 |
| M-V06-1427-E2-one | UNTESTED | §3.7 | V06 §3.21 (a) "fortification (V06 §3.7)" | T-V6-9; T-V6-10; T-V6-11; T-V6-73 |
| M-V06-1427-E3-cap | UNTESTED | §3.7 | V06 §3.21 (a) "fortification (V06 §3.7)" | T-V6-9; T-V6-10; T-V6-11; T-V6-73 |
| M-V06-1427-E4-degenerate | UNDEFINED | §3.7 | V06 §3.21 (a) "fortification (V06 §3.7)" | T-V6-9; T-V6-10; T-V6-11; T-V6-73 |
| M-V06-1427-E5-data | UNTESTED | §3.7 | V06 §3.21 (a) "fortification (V06 §3.7)" | T-V6-9; T-V6-10; T-V6-11; T-V6-73 |
| M-V06-1427-E6-rungs | UNDEFINED | §3.7 | V06 §3.21 (a) "fortification (V06 §3.7)" | T-V6-9; T-V6-10; T-V6-11; T-V6-73 |
| M-V06-1427-E8-lifecycle | UNTESTED | §3.7 | V06 §3.21 (a) "fortification (V06 §3.7)" | T-V6-9; T-V6-10; T-V6-11; T-V6-73 |
| M-V06-1599-E1-none | UNTESTED | §3.8 | V06 §3.21 (a) "regrowth (V06 §3.8)" | T-V6-7; T-V6-51 |
| M-V06-1599-E2-one | UNTESTED | §3.8 | V06 §3.21 (a) "regrowth (V06 §3.8)" | T-V6-7; T-V6-51 |
| M-V06-1599-E3-cap | UNTESTED | §3.8 | V06 §3.21 (a) "regrowth (V06 §3.8)" | T-V6-7; T-V6-51 |
| M-V06-1599-E4-degenerate | UNDEFINED | §3.8 | V06 §3.21 (a) "regrowth (V06 §3.8)" | T-V6-7; T-V6-51 |
| M-V06-1599-E5-data | UNTESTED | §3.8 | V06 §3.21 (a) "regrowth (V06 §3.8)" | T-V6-7; T-V6-51 |
| M-V06-1599-E6-rungs | UNTESTED | §3.8 | V06 §3.21 (a) "regrowth (V06 §3.8)" | T-V6-7; T-V6-51 |
| M-V06-1599-E8-lifecycle | UNTESTED | §3.8 | V06 §3.21 (a) "regrowth (V06 §3.8)" | T-V6-7; T-V6-51 |
| M-V06-1678-E4-degenerate | UNDEFINED | §3.9 | V06 §3.21 (a) "uses (V06 §3.9)" | T-V6-13 |
| M-V06-1934-E1-none | UNTESTED | §3.10 | V06 §3.21 (a) "`MutationPlan` (V06 §2.5, §3.10)" | T-V6-15 |
| M-V06-1934-E2-one | UNTESTED | §3.10 | V06 §3.21 (a) "`MutationPlan` (V06 §2.5, §3.10)" | T-V6-15 |
| M-V06-1934-E3-cap | UNTESTED | §3.10 | V06 §3.21 (a) "`MutationPlan` (V06 §2.5, §3.10)" | T-V6-15 |
| M-V06-1934-E5-data | UNTESTED | §3.10 | V06 §3.21 (a) "`MutationPlan` (V06 §2.5, §3.10)" | T-V6-15 |
| M-V06-1934-E8-lifecycle | UNTESTED | §3.10 | V06 §3.21 (a) "`MutationPlan` (V06 §2.5, §3.10)" | T-V6-15 |
| M-V06-1975-E1-none | UNTESTED | §3.11 | V06 §3.21 (a) "hazards (V06 §3.11)" | T-V6-16; T-V6-17; T-V6-70 (h) |
| M-V06-1975-E2-one | UNTESTED | §3.11 | V06 §3.21 (a) "hazards (V06 §3.11)" | T-V6-16; T-V6-17; T-V6-70 (h) |
| M-V06-1975-E3-cap | UNTESTED | §3.11 | V06 §3.21 (a) "hazards (V06 §3.11)" | T-V6-16; T-V6-17; T-V6-70 (h) |
| M-V06-1975-E4-degenerate | UNDEFINED | §3.11 | V06 §3.21 (a) "hazards (V06 §3.11)" | T-V6-16; T-V6-17; T-V6-70 (h) |
| M-V06-1975-E5-data | UNTESTED | §3.11 | V06 §3.21 (a) "hazards (V06 §3.11)" | T-V6-16; T-V6-17; T-V6-70 (h) |
| M-V06-1975-E6-rungs | UNDEFINED | §3.11 | V06 §3.21 (a) "hazards (V06 §3.11)" | T-V6-16; T-V6-17; T-V6-70 (h) |
| M-V06-1975-E8-lifecycle | UNDEFINED | §3.11 | V06 §3.21 (a) "hazards (V06 §3.11)" | T-V6-16; T-V6-17; T-V6-70 (h) |
| M-V06-2063-E1-none | UNDEFINED | §3.12 | V06 §3.21 (a) "terrain and water (V06 §3.12)" | T-V6-18; T-V6-72; T-V6-70 (i) |
| M-V06-2063-E2-one | UNDEFINED | §3.12 | V06 §3.21 (a) "terrain and water (V06 §3.12)" | T-V6-18; T-V6-72; T-V6-70 (i) |
| M-V06-2063-E3-cap | UNTESTED | §3.12 | V06 §3.21 (a) "terrain and water (V06 §3.12)" | T-V6-18; T-V6-72; T-V6-70 (i) |
| M-V06-2063-E4-degenerate | UNDEFINED | §3.12 | V06 §3.21 (a) "terrain and water (V06 §3.12)" | T-V6-18; T-V6-72; T-V6-70 (i) |
| M-V06-2063-E5-data | UNTESTED | §3.12 | V06 §3.21 (a) "terrain and water (V06 §3.12)" | T-V6-18; T-V6-72; T-V6-70 (i) |
| M-V06-2063-E7-toggles | UNTESTED | §3.12 | V06 §3.21 (a) "terrain and water (V06 §3.12)" | T-V6-18; T-V6-72; T-V6-70 (i) |
| M-V06-2063-E8-lifecycle | UNDEFINED | §3.12 | V06 §3.21 (a) "terrain and water (V06 §3.12)" | T-V6-18; T-V6-72; T-V6-70 (i) |
| M-V06-2097-E1-none | UNTESTED | §3.13 | V06 §3.21 (a) "Works (V06 §3.13)" | T-V6-19; T-V6-70 (j) |
| M-V06-2097-E2-one | UNTESTED | §3.13 | V06 §3.21 (a) "Works (V06 §3.13)" | T-V6-19; T-V6-70 (j) |
| M-V06-2097-E4-degenerate | UNDEFINED | §3.13 | V06 §3.21 (a) "Works (V06 §3.13)" | T-V6-19; T-V6-70 (j) |
| M-V06-2097-E5-data | UNDEFINED | §3.13 | V06 §3.21 (a) "Works (V06 §3.13)" | T-V6-19; T-V6-70 (j) |
| M-V06-2097-E8-lifecycle | UNDEFINED | §3.13 | V06 §3.21 (a) "Works (V06 §3.13)" | T-V6-19; T-V6-70 (j) |
| M-V06-2138-E5-data | UNTESTED | §3.14 | V06 §3.21 (a) "people (V06 §3.14)" | T-V6-20 |
| M-V06-2138-E8-lifecycle | UNTESTED | §3.14 | V06 §3.21 (a) "people (V06 §3.14)" | T-V6-20 |
| M-V06-2163-E1-none | UNTESTED | §3.15 | V06 §3.21 (a) "the history record and frames (V06 §3.15)" | T-V6-21; T-V6-70 (k) |
| M-V06-2163-E2-one | UNTESTED | §3.15 | V06 §3.21 (a) "the history record and frames (V06 §3.15)" | T-V6-21; T-V6-70 (k) |
| M-V06-2163-E4-degenerate | UNDEFINED | §3.15 | V06 §3.21 (a) "the history record and frames (V06 §3.15)" | T-V6-21; T-V6-70 (k) |
| M-V06-2163-E5-data | UNTESTED | §3.15 | V06 §3.21 (a) "the history record and frames (V06 §3.15)" | T-V6-21; T-V6-70 (k) |
| M-V06-2163-E8-lifecycle | UNTESTED | §3.15 | V06 §3.21 (a) "the history record and frames (V06 §3.15)" | T-V6-21; T-V6-70 (k) |
| M-V06-2243-E4-degenerate | UNDEFINED | §3.16 | V06 §3.21 (a) "determinism (V06 §3.16)" | T-V6-2 |
| M-V06-2293-E1-none | UNTESTED | §3.17 | V06 §3.21 (a) "failure handling (V06 §3.17)" | T-V6-2; T-V6-29 |
| M-V06-2293-E2-one | UNTESTED | §3.17 | V06 §3.21 (a) "failure handling (V06 §3.17)" | T-V6-2; T-V6-29 |
| M-V06-2293-E4-degenerate | UNDEFINED | §3.17 | V06 §3.21 (a) "failure handling (V06 §3.17)" | T-V6-2; T-V6-29 |
| M-V06-2293-E5-data | UNTESTED | §3.17 | V06 §3.21 (a) "failure handling (V06 §3.17)" | T-V6-2; T-V6-29 |
| M-V06-2293-E8-lifecycle | UNDEFINED | §3.17 | V06 §3.21 (a) "failure handling (V06 §3.17)" | T-V6-2; T-V6-29 |
| M-V06-2323-E4-degenerate | UNDEFINED | §3.18 | V06 §3.21 (a) "the underground over epochs (V06 §3.18)" | T-V6-34; T-V6-67 |
| M-V06-2540-E4-degenerate | UNDEFINED | §3.19 | V06 §3.21 (a) "raised ways over epochs (V06 §3.19)" | T-V6-57; T-V6-70 (l) |
| M-V06-2905-E1-none | UNTESTED | §4.1 | V06 §3.21 (a) "advancing time (V06 §4.1)" | T-V6-23 |
| M-V06-2905-E2-one | UNTESTED | §4.1 | V06 §3.21 (a) "advancing time (V06 §4.1)" | T-V6-23 |
| M-V06-2905-E4-degenerate | UNDEFINED | §4.1 | V06 §3.21 (a) "advancing time (V06 §4.1)" | T-V6-23 |
| M-V06-2905-E5-data | UNTESTED | §4.1 | V06 §3.21 (a) "advancing time (V06 §4.1)" | T-V6-23 |
| M-V06-2905-E8-lifecycle | UNTESTED | §4.1 | V06 §3.21 (a) "advancing time (V06 §4.1)" | T-V6-23 |
| M-V06-2939-E1-none | UNTESTED | §4.2 | V06 §3.21 (a) "the hand forms (V06 §4.2)" | T-V6-70 (m) |
| M-V06-2939-E2-one | UNTESTED | §4.2 | V06 §3.21 (a) "the hand forms (V06 §4.2)" | T-V6-70 (m) |
| M-V06-2939-E4-degenerate | UNDEFINED | §4.2 | V06 §3.21 (a) "the hand forms (V06 §4.2)" | T-V6-70 (m) |
| M-V06-2939-E5-data | UNTESTED | §4.2 | V06 §3.21 (a) "the hand forms (V06 §4.2)" | T-V6-70 (m) |
| M-V06-2939-E6-rungs | UNDEFINED | §4.2 | V06 §3.21 (a) "the hand forms (V06 §4.2)" | T-V6-70 (m) |
| M-V06-2939-E8-lifecycle | UNTESTED | §4.2 | V06 §3.21 (a) "the hand forms (V06 §4.2)" | T-V6-70 (m) |
| M-V06-2988-E1-none | UNDEFINED | §4.3 | V06 §3.21 (a) "locality (V06 §4.3)" | T-V6-3; T-V6-4 |
| M-V06-2988-E2-one | UNDEFINED | §4.3 | V06 §3.21 (a) "locality (V06 §4.3)" | T-V6-3; T-V6-4 |
| M-V06-3004-E8-lifecycle | UNDEFINED | §4.4 | V06 §3.21 (a) "forks and re-runs (V06 §4.4)" | T-V6-22 |
| M-V06-3029-E6-rungs | UNDEFINED | §4.5 | V06 §3.21 (a) "the clerk's view (V06 §4.5)" | T-V6-53 |
| M-V06-3064-E1-none | UNTESTED | §5.1 | V06 §3.21 (a) "rendering, labels, exports (V06 §5)" | T-V6-21; T-V6-26 |
| M-V06-3064-E2-one | UNTESTED | §5.1 | V06 §3.21 (a) "rendering, labels, exports (V06 §5)" | T-V6-21; T-V6-26 |
| M-V06-3064-E4-degenerate | UNDEFINED | §5.1 | V06 §3.21 (a) "rendering, labels, exports (V06 §5)" | T-V6-21; T-V6-26 |
| M-V06-3064-E5-data | UNTESTED | §5.1 | V06 §3.21 (a) "rendering, labels, exports (V06 §5)" | T-V6-21; T-V6-26 |
| M-V06-3064-E7-toggles | UNTESTED | §5.1 | V06 §3.21 (a) "rendering, labels, exports (V06 §5)" | T-V6-21; T-V6-26 |
| M-V06-3064-E8-lifecycle | UNDEFINED | §5.1 | V06 §3.21 (a) "rendering, labels, exports (V06 §5)" | T-V6-21; T-V6-26 |
| M-V06-3103-E4-degenerate | UNDEFINED | §5.2 | V06 §3.21 (a) "rendering, labels, exports (V06 §5)" | T-V6-21; T-V6-26 |
| M-V06-3126-E4-degenerate | UNDEFINED | §5.3 | V06 §3.21 (a) "rendering, labels, exports (V06 §5)" | T-V6-21; T-V6-26 |
| EI-V06-EDGE-1 | UNDEFINED | §2.3, §3.3.2 | V06 §3.21 (a) "the trajectory and `advance` (V06 §2.3, §3.3.2)" | T-V6-23 |
| EI-V06-EDGE-2 | UNDEFINED | §4.1, §2.12 | V06 §3.21 (a) "an advance group after a save, and in a shared document" | T-V6-23 |
| C-cliff-history | COMBINATION |  | V06 §3.21 (b) "cliff, steep ground × the history and its Works" | T-V6-47; T-V6-62; T-V6-70 (n) |
| C-cliff-works | COMBINATION |  | V06 §3.21 (b) "cliff, steep ground × the history and its Works" | T-V6-47; T-V6-62; T-V6-70 (n) |
| C-steep-epoch | COMBINATION |  | V06 §3.21 (b) "cliff, steep ground × the history and its Works" | T-V6-47; T-V6-62; T-V6-70 (n) |
| C-steep-history | COMBINATION |  | V06 §3.21 (b) "cliff, steep ground × the history and its Works" | T-V6-47; T-V6-62; T-V6-70 (n) |
| C-steep-works | COMBINATION |  | V06 §3.21 (b) "cliff, steep ground × the history and its Works" | T-V6-47; T-V6-62; T-V6-70 (n) |
| C-river-history | COMBINATION |  | V06 §3.21 (b) "river, coast, harbour × the history" | T-V6-18; T-V6-46; T-V6-48 |
| C-coast-history | COMBINATION |  | V06 §3.21 (b) "river, coast, harbour × the history" | T-V6-18; T-V6-46; T-V6-48 |
| C-harbour-history | COMBINATION |  | V06 §3.21 (b) "river, coast, harbour × the history" | T-V6-18; T-V6-46; T-V6-48 |
| C-moat-history | COMBINATION |  | V06 §3.21 (b) "moat × the history and its Works" | T-V6-70 (n) |
| C-moat-works | COMBINATION |  | V06 §3.21 (b) "moat × the history and its Works" | T-V6-70 (n) |
| C-deckplot-history | COMBINATION |  | V06 §3.21 (b) "deck plot × the history" | T-V6-63 |
| C-square-history | COMBINATION |  | V06 §3.21 (b) "square × the history and its Works" | T-V6-70 (n) |
| C-square-works | COMBINATION |  | V06 §3.21 (b) "square × the history and its Works" | T-V6-70 (n) |
| C-oasis-history | COMBINATION |  | V06 §3.21 (b) "oasis × the history and its Works" | T-V6-72 |
| C-oasis-works | COMBINATION |  | V06 §3.21 (b) "oasis × the history and its Works" | T-V6-72 |
| C-frame-history | COMBINATION |  | V06 §3.21 (b) "frame × the history and its Works" | T-V6-70 (n) |
| C-frame-works | COMBINATION |  | V06 §3.21 (b) "frame × the history and its Works" | T-V6-70 (n) |
| C-hood-history | COMBINATION |  | V06 §3.21 (b) "neighbourhood fabric, terraced wards × the history" | T-V6-64; T-V6-62 |
| C-terraced-ward-history | COMBINATION |  | V06 §3.21 (b) "neighbourhood fabric, terraced wards × the history" | T-V6-64; T-V6-62 |
| C-composed-history | COMBINATION |  | V06 §3.21 (b) "composed buildings, stacked tiers, crypts, plans × the history" | T-V6-15; T-V6-55; T-V6-62 |
| C-tiers-history | COMBINATION |  | V06 §3.21 (b) "composed buildings, stacked tiers, crypts, plans × the history" | T-V6-15; T-V6-55; T-V6-62 |
| C-crypt-history | COMBINATION |  | V06 §3.21 (b) "composed buildings, stacked tiers, crypts, plans × the history" | T-V6-15; T-V6-55; T-V6-62 |
| C-plan-history | COMBINATION |  | V06 §3.21 (b) "composed buildings, stacked tiers, crypts, plans × the history" | T-V6-15; T-V6-55; T-V6-62 |
| C-sewer-history | COMBINATION |  | V06 §3.21 (b) "sewer, cavern, ruin, catacomb, undercity, void, access, vault × the history" | T-V6-33–T-V6-40; T-V6-64; T-V6-71 |
| C-cavern-history | COMBINATION |  | V06 §3.21 (b) "sewer, cavern, ruin, catacomb, undercity, void, access, vault × the history" | T-V6-33–T-V6-40; T-V6-64; T-V6-71 |
| C-ruin-history | COMBINATION |  | V06 §3.21 (b) "sewer, cavern, ruin, catacomb, undercity, void, access, vault × the history" | T-V6-33–T-V6-40; T-V6-64; T-V6-71 |
| C-catacomb-history | COMBINATION |  | V06 §3.21 (b) "sewer, cavern, ruin, catacomb, undercity, void, access, vault × the history" | T-V6-33–T-V6-40; T-V6-64; T-V6-71 |
| C-undercity-history | COMBINATION |  | V06 §3.21 (b) "sewer, cavern, ruin, catacomb, undercity, void, access, vault × the history" | T-V6-33–T-V6-40; T-V6-64; T-V6-71 |
| C-void-history | COMBINATION |  | V06 §3.21 (b) "sewer, cavern, ruin, catacomb, undercity, void, access, vault × the history" | T-V6-33–T-V6-40; T-V6-64; T-V6-71 |
| C-access-history | COMBINATION |  | V06 §3.21 (b) "sewer, cavern, ruin, catacomb, undercity, void, access, vault × the history" | T-V6-33–T-V6-40; T-V6-64; T-V6-71 |
| C-access-works | COMBINATION |  | V06 §3.21 (b) "access × Works" | T-V6-21 |
| C-vault-history | COMBINATION |  | V06 §3.21 (b) "sewer, cavern, ruin, catacomb, undercity, void, access, vault × the history" | T-V6-33–T-V6-40; T-V6-64; T-V6-71 |
| C-island-history | COMBINATION |  | V06 §3.21 (b) "islands, island shade, sky accesses, landfall × the history" | T-V6-30; T-V6-64; T-V6-66 |
| C-shade-history | COMBINATION |  | V06 §3.21 (b) "islands, island shade, sky accesses, landfall × the history" | T-V6-30; T-V6-64; T-V6-66 |
| C-skyaccess-history | COMBINATION |  | V06 §3.21 (b) "islands, island shade, sky accesses, landfall × the history" | T-V6-30; T-V6-64; T-V6-66 |
| C-landfall-history | COMBINATION |  | V06 §3.21 (b) "islands, island shade, sky accesses, landfall × the history" | T-V6-30; T-V6-64; T-V6-66 |
| C-epoch-light | COMBINATION |  | V06 §3.21 (b) "lights × epochs, the history and Works" | T-V6-21 |
| C-history-lock | COMBINATION |  | V06 §3.21 (b) "the history × locks" | T-V6-4; T-V6-22 |
| C-history-saveload | COMBINATION |  | V06 §3.21 (b) "the history × save and load" | T-V6-23; T-V6-21 |
| C-history-light | COMBINATION |  | V06 §3.21 (b) "lights × epochs, the history and Works" | T-V6-21 |
| C-history-export | COMBINATION |  | V06 §3.21 (b) "the history × export" | T-V6-21 |
| C-works-light | COMBINATION |  | V06 §3.21 (b) "lights × epochs, the history and Works" | T-V6-21 |
