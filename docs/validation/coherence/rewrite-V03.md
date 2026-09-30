# Rewrite — design volume V03 (interiors)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-V03; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/rewrite-V03`, 2026-09-29 – 2026-09-30)
- P1 inputs gathered (canon unit V03: 6 conflicts, 3 elegance, 2 id rulings, 5 wiring gaps naming V03, 48 f items, 13 hand-offs, edges 29 U + 26 T + 6 combinations, inventory 513 ids; no g 111+ part routed): done
- P2 read the volume whole (3 855 lines): done
- P3 new text §0–§1b: done
- P4 new text §2: done
- P5 new text §3 with §3.13 (edges): done
- P6 new text §4–§6: done
- P7 new text §7–§8: done
- P8 new text §9–§13 and integration notes: done
- P9 assemble, verify ids, references, terms, sizes: done
- P10 report, result file, LANDED: done

Source: `docs/volumes/V03-interiors.md`. Output: `docs/validation/coherence/new/volumes/V03-interiors.md` (same title
line, same section structure §0–§13 with §3.13 added, the volume's marker line kept). Working parts:
`docs/validation/coherence/work/rewrite-V03/parts/` (18 files).

## Sizes

| | words | bytes |
|---|---|---|
| before | 82 788 | 505 716 |
| after | 64 726 | 389 341 |
| change | −18 062 (−21.8 %) | −23.0 % |

Per section (words before → after): header, banners and PROGRESS 1 784 → 33; §0–§1b 6 672 → 6 220; §2 13 709 → 12 521;
§3 18 582 → 20 989 (with the new §3.13, ≈ 2 050, and the crypt's dry runs and wet-ground rule, ≈ 700); §4–§6 6 736 →
7 199 (with the section providers and the one edit table); §7 5 054 → 5 595 (with T-V3-36 – T-V3-40 and three new
clauses); §8 2 015 → 1 996; §9 9 122 → 8 004; §10 6 187 → 678; §11 267 → 139; §12 2 976 → 633; §13 3 026 → 549;
integration notes 254 → 170; reconciliation and finalization records 4 722 → 0.

**Words removed by source** (≈ 22 800 removed, ≈ 4 700 added as routed new design): NARRATION ≈ 12 100 (53 %: the eight
stacked banners and the PROGRESS ledger, the reconciliation and finalization records, the per-round CONFIRMED receipts of
§12 and the per-round hand-off lists of §13, round labels and amendment layers in §9, provenance tags `V3C-…`, `S23…`,
`SCC-…`, `ST-…`, `critique/…` throughout, "V03 is unbuilt" remarks); RESTATEMENT ≈ 7 500 (33 %: the 33 BCR blocks
turned into §10's pointer table, 5 509; the lifecycle table's read column now citing §1b; restatements of base values
— the label range, the plan-rung budget and cache line, the walk-out condition, the stops — replaced by references; the
storey-less rule, the vault and capped-bays definitions and the `Entrance.storey` derivation kept at one home);
DUPLICATED MECHANISMS ≈ 800 (3 %: E-29's one door-run helper, DUP-6's one edit table carrying tool, events, semantics,
lifecycle row and undo, the derived pieces' one list and one lifecycle sub-table); VERBOSE PROSE ≈ 2 400 (11 %).

**Below the band (−21.8 % against 25–40 %).** The irreducible content: the design body §2–§9 is dense normative text
(rules, rows, cases, bars) with little narration left in it once the tags are gone, and the pass adds ≈ 4 700 words of
routed new design — §3.13's edge rules and combination table, the crypt-edit dry runs and wet-ground rule (V09-XAGREE-2,
V10-XAGREE-4), the two section providers (V03-WGAP-1), the one hand-off table, T-V3-36 – T-V3-40 and the new clauses of
T-V3-12 and T-V3-23, J-V3.130 and J-V3.131. Without those additions the cut is −27.5 %.

## Rulings applied

### Elegance rulings (with their equivalence lists)

* **E-24** — one mark on the decision row. Applied in §9: J-V3.42 *Amended by J-V3.121*; J-V3.47 *Amended by J-V3.130*;
  J-V3.98 *Superseded by J-V3.131*; J-V3.118 *Amended by J-V3.123*; J-V3.126 *Amended by J-V3.127*. Equivalence: [x] no
  row dropped (J-V3.110 is removed as a process record by NARR-8, not as a superseded decision); [x] the governing row keeps
  the reason (J-V3.121, .123, .127, .130, .131 each state their choice, alternatives and reasons in full; the amendment
  layers folded into J-V3.118, .123, .126 keep every reason they carried).
* **E-28** — `PlanReport.notes` carries `shrineOneRoom`, `solidMonument`, `stackCarried`; `warnings.code` W_ codes only
  (V03 §2.3). Equivalence: [x] same producer (A1 and V03 §3.9's failure handling; S6, H4) and readers (the panel, the
  clerk's `planReport`, the room why and the `plan` section, JSON `report`, the bars — V03 §1b's `PlanReport` row); [x] the
  three conditions reported as notes, not lost (V03 §3.3 S6, H4; §3.9's rows; §4.6's `plan` section keys one per note id,
  the ids volume 10's why causes read).
* **E-29** — one door-run helper `doorRunPoint(run, target, admissible)` stated once in V03 §3.7.1; `basementDoor(b)` and
  `stackAccessDoor(b, a)` call it. Equivalence: [x] `basementDoor`'s three ordered rules (wall walk-out, tomb door, fall
  walk-out) unchanged in V03 §3.7.1; [x] its crypt-vault clause from M6-U (the door point off the vault, the vault's
  definition cited from V03 §3.7.4) and its `null` unless `Basement.access` is `external`; [x] `stackAccessDoor`'s
  approach-strip clearance (the span one `moduleCm` clear of stair 0's approach strip, in its admissibility test), the
  non-stair wing preference and its reported fallback (`fallback`, `W_STACK_ACCESS` noted `door fallback`) in V03 §3.7.2
  (1); [x] both pure, draw-free, of eager records, in `@plat/plots` at M3a, read by V01's entrance reserve (V03 §1b
  *Interfaces*, *Derived pieces*); [x] the two-module span, the nearest-point slide and ties toward the run's first vertex
  now the helper's, each function passing its own target and test.

### Conflicts resolved (canon rulings)

| ruling | where applied |
|---|---|
| MC-01 (`lot` retired; `BuildingInput.plot`) | no occurrence in V03 (the volume reads no `BuildingInput.lot` and uses no prose "lot"); checked on the new text |
| V04-XCONF-2 (PageUp/PageDown precedence at §14) | V03 §4.5 cites §14's keymap precedence and V04 §5.1; the rule is not restated |
| V04-XCONF-3 (T-V4-50 elaboration independence) | T-V3-23 (g) cites T-V4-50's clause; the hand-off listed in §13's table as written by V04 |
| V09-XAGREE-2 (crypt-edit dry runs at V03 §3.7.4) | V03 §3.7.4 *The crypt-edit dry runs* (i)–(iii); §4.2's crypt paragraph; J-V3.130 (J-V3.47 amended); T-V3-23 (l) |
| V10-XAGREE-4 (wet ground) | V03 §3.7.4 *Wet ground*; §4.6's `crypt` section; J-V3.44 and J-V3.130; T-V3-23 (k); G-floorvault retired in the rule text |
| CANON-C03 (§11 a table of decisions) | V03 §11: Q1 answered yes (J122) |

### Id rulings and renumberings

* **ID-BCR** — V04's bare BCR-29, BCR-30, BCR-45, BCR-46 cited here now read BCR-V4-29, BCR-V4-30, BCR-V4-45,
  BCR-V4-46; V01's BCR-43 reads BCR-V1-43.
* **ID-DUPDEF** — no renumbering; BCR-V3-20's round notes fold into its one §10 row.
* **New ids** (no collision; the T-V3 and J-V3 families are this volume's): T-V3-36 – T-V3-40; J-V3.130, J-V3.131;
  warning code `W_STOREY_RUN`. **Removed:** J-V3.110 (NARR-8).
* Check on the new text: 40 test ids defined once, every T-V3 id used is defined; 130 decision ids defined once (J-V3.1 –
  J-V3.131 less J-V3.110), every J-V3 id used is defined; every `V03 §x.y` reference resolves to a heading of the new text.

### Open findings closed (36 routed to V03)

| finding | closure |
|---|---|
| VOL-V03-V04-RESTATEMENTS-001 | the label range cited from §9.4 (V03 §1, §5.1; T-V3-14 "§9.4's floor") |
| VOL-V03-V04-RESTATEMENTS-002 | §6 cites §12.7's plan-rung row and §12.8's cache line; no figures restated |
| VOL-V03-V04-RESTATEMENTS-003, V03-RESTATE-1 | the module's value stays in V03 §2.4's `PlanGeometryRow` (its home by the canon); §6 cites §12.7's fallback only |
| VOL-V03-V04-RESTATEMENTS-004 | the trapdoor fallback cited as §2.6 step 3's in V03 §3.7.1, §3.7.7, §3.9 |
| V03-DUP-1 | V03 §1b's *Derived pieces* the one list; V03 §2.1 cites it |
| V03-DUP-2 | V03 §1b the one home of readers; §2.5's read column removed and cites it |
| V03-DUP-3 | the storey-less plan stated once at V03 §3.1 step 2; §3.3 S6, §3.4a, §3.9 cite it |
| V03-DUP-4 | `Entrance.storey`'s rule at V03 §3.6 (the home §2.6 cites); the type comment is a reference (V03 §2.1) |
| V03-DUP-5 | the vault, capped bays and stair-entered defined once at V03 §3.7.4; §3.7.1, §2.1, §1b cite |
| V03-DUP-6 | one edit table at V03 §4.1 (tool, events, semantics, lifecycle row, undo); §1b, §2.5, §4.3 cite |
| V03-DUP-7 | one live hand-off table in V03 §13 |
| V03-ELEG-1 | E-28 applied (V03 §2.3) |
| V03-ELEG-2 | E-29 applied (V03 §3.7.1) |
| V03-EDGE-1 (EI-V03-EDGE-1) | V03 §3.3 *The storey run at its limits*; `W_STOREY_RUN`; T-V3-36 |
| V03-WGAP-1 | V03 §1b *Interfaces* and §4.6 *Section providers* with keys; T-V3-12 (c); IN-V03-1 folded |
| V03-MISSING-1 | V03 §11 Q1 answered yes (J122); V03 §8 in the decided order |
| V03-DEFER-1 | V03 §2.4: the `'*'` rows' specialisation key is final (V11 names them specialisation values) |
| V03-DEFER-2 | V03 §3.12 (9) cites V04's `Chamber.gradeFaces`; J-V3.131 (J-V3.98 superseded) |
| V03-DEFER-3 | V03 §8: the decided order only; §16 and INDEX cited |
| V03-DEFER-4 | J-V3.93 rewritten as final |
| V03-NARR-1 | one marker line |
| V03-NARR-2 | PROGRESS and round ledgers removed |
| V03-NARR-3, -4, -6 | provenance tags dropped from rows, steps and bars; "V03 is unbuilt" dropped from T-V3-34 |
| V03-NARR-5 | the golden sentence removed (V03 §3.3; J-V3.90) |
| V03-NARR-7 | the critique-exchange sentence removed (V03 §8) |
| V03-NARR-8 | J-V3.110 removed |
| V03-NARR-9 | J-V3.111 – J-V3.129 in their final form, round labels and layers dropped (E-24 marks kept) |
| V03-NARR-10 | §10 is a pointer table; round labels, receipts and label remarks gone |
| V03-NARR-11 | the round records gone; IN-V03-1..3 folded; one hand-off list |
| V03-BREF-1 | the scratchpad receipt references removed |
| V03:IN-V03-1 | folded: V03 §1b, §4.6 |
| V03:IN-V03-2 | folded: V03 §4.2 (deck bullet) |
| V03:IN-V03-3 | folded: V03 §1, §3.3 S6 (e) |

### Hand-offs closed (13 routed to V03)

| hand-off | closure |
|---|---|
| V02:X11 | V02 states its side; V03 reads wings by key (V03 §2.2), dormer rows (W4), the choir stairs over the lift (V03 §3.7.6), `gatehall` (V03 §2.4) |
| V06:X3 | V03 §3.7.4 (3): the rank re-runs inside each epoch op that moves the see; trim shortens `Basement.crypt.ring` only |
| V06:X18 | V03 §2.5's outside-digest row, §4.2 (a retaining wall), T-V3-30 |
| V09:XV-V9-5 | V03 §3.7.4 *The crypt-edit dry runs*; J-V3.130 |
| V09:XV-V9-15 | V03 §4.2 (the crypt ladder for a ring on a building without a basement; `drawChamber` emits it, V09 §4.17.5 (a)) |
| V10:CVR-V10-2 | V03 §4.6 `crypt` provider |
| V10:CVR-V10-9 | V03 §4.6 `plan` provider keys (`deckNoCellar` for V10's `deckRefusal`: cross-part note) |
| V11:X-V11-16 (d) | answered at V11 (row 38's readers); nothing owed here |
| V12:X-V12-4 | V03 §8 P6 row: the owner review is V12 §3.9.1's `PanelSpec` for V3-P6 |
| V12:X-V12-15 | T-V3-35's `BenchBarDef` (V03 §2.4's register lines, §7) |
| V12:X-V12-16 (both rows) | V03 §2.4's register lines and `--milestone` exits (V03 §8) |
| V12:X-V12-17 | V03 §2.4: `plat calibrate register --defaults --milestone <id>` with V12 §2.8's ids |
| V12:X-V12-18 | closed-stated at V12; no edit needed |

### Wiring gaps

* **V03-WGAP-1** — wired (above). **W-HOOK-02** — V03 §1 names §2.6's plan rung and its records as built here and §1b's
  *Interfaces* row names `BuildingGenerator.plan`'s implementer and callers (both ends). **W-IF-06** — V03 §3.7.1 states
  its wall band is its own `2 × cellar.insetCm`, not V02's `terrace.wallBandCm` (V02's end is V02's editor's).
  **V04-WGAP-4** — V03's end: §3.12 (9) cites `Chamber.gradeFaces` with no conditional (V04's end is V04's editor's).
  **W-HOOK-01** — scope's roadmap column names V03 for the plan rung; V03 §1 is its other end.

### Edges (principle (11))

All 29 UNDEFINED and 26 UNTESTED V03 edges and the six owned combinations (C-cliff-plan, C-steep-plan, C-coast-plan,
C-moat-plan, C-oasis-plan, C-frame-plan) are defined with their rung and test in V03 §3.13 (a)–(g) and V03 §3.3 (the
storey run), tested by T-V3-36 – T-V3-40 (and T-V3-23 (k)): E4 degenerate (every mechanism) → §3.13 (a), T-V3-37 (a);
E6 rungs (§3.6, §3.7, §3.8, §4.5, §5.1, §5.3) → §3.13 (b), T-V3-38 (a); E1/E2 none and one (§3.1, §3.4, §3.4a, §3.8,
§3.10, §3.12, §4.5, §4.6, §5.1, §5.2, §5.3, §5.4) → §3.13 (c), T-V3-37 (b); E5 data (§2.1, §2.2, §3.1, §3.8, §3.12,
§4.5, §4.6, §5.1, §5.3) → §3.13 (d), T-V3-39 (a); E8 lifecycle (§3.4a, §3.12, §4.1, §4.5, §4.6) → §3.13 (e), T-V3-39 (b);
E7 toggles (§5.3) → §3.13 (f), T-V3-38 (b); the combinations and the brief's named ones (a retaining wall on a cliff edge,
a deck plot on a bridge over a moat, a settlement over a sealed void, a dossier removing what an edit pinned, an epoch
undone after a save) → §3.13 (d), (e), (g), T-V3-39, T-V3-40. No outcome is a crash, hang, lost data, silent wrong
result or whole-map retry.

## CROSS-PART NOTES

1. **scope (§13.2, file f item 482):** the base's sentence "V03's T-V3-1 – T-V3-34 run on the same fixtures …" and §13's
   takeover rows should read T-V3-1 – T-V3-40 (T-V3-35 – T-V3-40 are this volume's; T-V3-23 (k) runs at the model level
   too).
2. **V04:** add `Chamber.gradeFaces` (V04 §2.2 / BCR-V4-46) with producer, lifecycle row and test (V04-WGAP-4); V03
   §3.12 (9) and J-V3.131 read it as "an `archVault` chamber's two arch mouths, the sides parallel to its raised way's
   axis". Add T-V4-50's elaboration-independence clause (V04-XCONF-3); V03's T-V3-23 (g) cites it.
3. **V09 (§4.17.5 (e) and its crypt line):** word the crypt bends as V03 §3.7.4 states them — `bend.crypt.largest` "stops at
   {share} of the cathedral's" (the rank cap `crypt.rankShare`, not "just short"), `bend.crypt.cathedral` keeping the
   principal crypt at its smallest lawful size, the crypt join's closing as a fate; drop "floor vaults (wet ground)" and cite
   V03 §3.7.4's wet-ground rule (V09-XAGREE-2, V10-XAGREE-4).
4. **V10 (§3.9 owed table, §3.9a):** the cause key is `deckNoCellar` (renamed from `deckRefusal`); the `plan` section's
   cause list is V03 §4.6's eleven (`landingDoor`, `terraceDoor`, `terraceExit`, `seatingExit`, `walkOut`, `tombDoor`,
   `gradeFace`, `deckNoCellar`, `stoop`, `exposure`, `stackCarried`) plus the three note ids; the crypt row's wet-ground
   wording as V03 §3.7.4 (V10-XAGREE-4).
5. **V05 (BCR-V5-30's reader list, §1b):** may name V03 §3.6's W2 outside-ground sample among `levelledGroundCm`'s readers.
6. **V02 (W-IF-06):** V02 §1b's `terrace.wallBandCm` row names its real consumer (V02 §3.10.9); V03 does not read it.
7. **scope (§14's keymap):** V03 §4.5 cites the storey keys' precedence there (V04-XCONF-2).
8. **Edge rulings a base editor may meet:** V03 §3.13 (g) defines, for the plan only, a W2 sample outside the arena frame
   read at the frame's nearest inside point and a cliff between a wall and its sample read on the wall's side; should the
   base's `levelledGroundCm` define either case itself, V03 cites it.
9. **The canon's reference list** maps V03-0223 (the entrance-storey rule) to model §2.6; the applied base text (file f
   item 241) says "the rule and the tolerance are volume V03 §3.6's", so V03 §3.6 stays the rule's home and §2.6 cites it.

## MAPPING TABLE (every inventory id of the volume → where it now lives)

| id | source § | kind | now |
|---|---|---|---|
| V03-0001 | 0 | summary | V03 §0 |
| V03-0002 | 0 | summary | V03 §0 |
| V03-0003 | 0 | summary | V03 §0 |
| V03-0004 | 0 | summary | V03 §0 |
| V03-0005 | 0 | summary | V03 §0 |
| V03-0006 | 1 | scope | V03 §1 |
| V03-0007 | 1 | rule | V03 §1 — a reference to model §2.6 |
| V03-0008 | 1 | hook | V03 §1 |
| V03-0009 | 1 | hook | V03 §1 |
| V03-0010 | 1 | hook | V03 §1 |
| V03-0011 | 1 | hook | V03 §1 |
| V03-0012 | 1 | hook | V03 §1 |
| V03-0013 | 1 | hook | V03 §1 |
| V03-0014 | 1 | hook | V03 §1 |
| V03-0015 | 1 | hook | V03 §1 |
| V03-0016 | 1 | hook | V03 §1 |
| V03-0017 | 1 | hook | V03 §1 |
| V03-0018 | 1 | hook | V03 §1 |
| V03-0019 | 1 | hook | V03 §1 |
| V03-0020 | 1 | hook | V03 §1 |
| V03-0021 | 1 | hook | V03 §1 |
| V03-0022 | 1 | hook | V03 §1 |
| V03-0023 | 1 | hook | V03 §1 |
| V03-0024 | 1 | hook | V03 §1 |
| V03-0025 | 1 | hook | V03 §1 |
| V03-0026 | 1 | hook | V03 §1 |
| V03-0027 | 1 | hook | V03 §1 |
| V03-0028 | 1 | hook | V03 §1 |
| V03-0029 | 1 | hook | V03 §1 |
| V03-0030 | 1 | hook | V03 §1 |
| V03-0031 | 1 | hook | V03 §1 |
| V03-0032 | 1 | hook | V03 §1 |
| V03-0033 | 1 | hook | V03 §1 |
| V03-0034 | 1 | hook | V03 §1 |
| V03-0035 | 1 | hook | V03 §1 |
| V03-0036 | 1 | hook | V03 §1 |
| V03-0037 | 1 | hook | V03 §1 |
| V03-0038 | 1 | hook | V03 §1 |
| V03-0039 | 1 | hook | V03 §1 |
| V03-0040 | 1 | hook | V03 §1 |
| V03-0041 | 1 | hook | V03 §1 |
| V03-0042 | 1 | hook | V03 §1 |
| V03-0043 | 1 | hook | V03 §1 |
| V03-0044 | 1 | hook | V03 §1 |
| V03-0045 | 1 | hook | V03 §1 |
| V03-0046 | 1 | hook | V03 §1 |
| V03-0047 | 1 | hook | V03 §1 |
| V03-0048 | 1 | hook | V03 §1 |
| V03-0049 | 1 | hook | V03 §1 |
| V03-0050 | 1 | hook | V03 §1 |
| V03-0051 | 1 | hook | V03 §1 |
| V03-0052 | 1 | hook | V03 §1 |
| V03-0053 | 1 | hook | V03 §1 |
| V03-0054 | 1 | hook | V03 §1 |
| V03-0055 | 1 | scope | V03 §1 |
| V03-0056 | 1b | rule | V03 §1b |
| V03-0057 | 1b | table | V03 §1b |
| V03-0058 | 1b | table | V03 §1b |
| V03-0059 | 1b | table | V03 §1b |
| V03-0060 | 1b | table | V03 §1b |
| V03-0061 | 1b | table | V03 §1b |
| V03-0062 | 1b | table | V03 §1b |
| V03-0063 | 1b | table | V03 §1b — a reference to pipeline §4.12 |
| V03-0064 | 1b | table | V03 §1b |
| V03-0065 | 1b | table | V03 §1b |
| V03-0066 | 1b | record | V03 §1b |
| V03-0067 | 1b | record | V03 §1b |
| V03-0068 | 1b | record | V03 §1b |
| V03-0069 | 1b | record | V03 §1b |
| V03-0070 | 1b | record | V03 §1b |
| V03-0071 | 1b | record | V03 §1b |
| V03-0072 | 1b | record | V03 §1b — a reference to V04 V04 §1b.1 |
| V03-0073 | 1b | record | V03 §1b |
| V03-0074 | 1b | record | V03 §1b |
| V03-0075 | 1b | record | V03 §1b — a reference to model §2.6 |
| V03-0076 | 1b | record | V03 §1b |
| V03-0077 | 1b | record | V03 §1b |
| V03-0078 | 1b | record | V03 §1b — a reference to model §2.6 |
| V03-0079 | 1b | interface | V03 §1b |
| V03-0080 | 1b | mechanism | V03 §1b |
| V03-0081 | 1b | mechanism | V03 §1b |
| V03-0082 | 1b | mechanism | V03 §1b |
| V03-0083 | 1b | interface | V03 §1b |
| V03-0084 | 1b | interface | V03 §1b |
| V03-0085 | 1b | mechanism | V03 §1b — a reference to V04 None |
| V03-0086 | 1b | interface | V03 §1b — a reference to V02 V02 §1b |
| V03-0087 | 1b | mechanism | V03 §1b |
| V03-0088 | 1b | mechanism | V03 §1b |
| V03-0089 | 1b | mechanism | V03 §1b |
| V03-0090 | 1b | step | V03 §1b |
| V03-0091 | 1b | step | V03 §1b |
| V03-0092 | 1b | interface | V03 §1b — a reference to model §2.6 |
| V03-0093 | 1b | interface | V03 §1b — a reference to V02 V02 §9 |
| V03-0094 | 1b | interface | V03 §1b |
| V03-0095 | 1b | interface | V03 §1b |
| V03-0096 | 1b | edit | V03 §1b |
| V03-0097 | 1b | rule | V03 §1b |
| V03-0098 | 1b | record | V03 §1b |
| V03-0099 | 1b | rule | V03 §1b — a reference to determinism §7.7 |
| V03-0100 | 1b | rule | V03 §1b — a reference to V11 V11 §3.13.4 |
| V03-0101 | 1b | rule | V03 §1b — a reference to V08 None |
| V03-0102 | 1b | rule | V03 §1b — a reference to model §2.8 |
| V03-0103 | 2.1 | record | V03 §2.1 |
| V03-0104 | 2.1 | record | V03 §2.1 |
| V03-0105 | 2.1 | field | V03 §2.1 |
| V03-0106 | 2.1 | field | V03 §2.1 |
| V03-0107 | 2.1 | field | V03 §2.1 |
| V03-0108 | 2.1 | field | V03 §2.1 |
| V03-0109 | 2.1 | field | V03 §2.1 |
| V03-0110 | 2.1 | record | V03 §2.1 |
| V03-0111 | 2.1 | field | V03 §2.1 |
| V03-0112 | 2.1 | field | V03 §2.1 |
| V03-0113 | 2.1 | field | V03 §2.1 — a reference to model §2.6 |
| V03-0114 | 2.1 | field | V03 §2.1 — a reference to model §2.6 |
| V03-0115 | 2.1 | rule | V03 §2.1 |
| V03-0116 | 2.2 | rule | V03 §2.2 |
| V03-0117 | 2.2 | rule | V03 §2.2 |
| V03-0118 | 2.2 | table | V03 §2.2 |
| V03-0119 | 2.2 | rule | V03 §2.2 |
| V03-0120 | 2.3 | record | V03 §2.3 |
| V03-0121 | 2.3 | rule | V03 §2.3 |
| V03-0122 | 2.4 | rule | V03 §2.4 |
| V03-0123 | 2.4 | rule | V03 §2.4 |
| V03-0124 | 2.4 | record | V03 §2.4 |
| V03-0125 | 2.4 | record | V03 §2.4 |
| V03-0126 | 2.4 | record | V03 §2.4 |
| V03-0127 | 2.4 | constant | V03 §2.4 |
| V03-0128 | 2.4 | rule | V03 §2.4 |
| V03-0129 | 2.4 | table | V03 §2.4 |
| V03-0130 | 2.4 | table | V03 §2.4 |
| V03-0131 | 2.4 | rule | V03 §2.4 |
| V03-0132 | 2.4 | table | V03 §2.4 |
| V03-0133 | 2.4 | rule | V03 §2.4 |
| V03-0134 | 2.4 | table | V03 §2.4 |
| V03-0135 | 2.4 | table | V03 §2.4 |
| V03-0136 | 2.4 | table | V03 §2.4 |
| V03-0137 | 2.4 | table | V03 §2.4 |
| V03-0138 | 2.4 | rule | V03 §2.4 |
| V03-0139 | 2.4 | rule | V03 §2.4 |
| V03-0140 | 2.4 | table | V03 §2.4 |
| V03-0141 | 2.4 | rule | V03 §2.4 |
| V03-0142 | 2.4 | table | V03 §2.4 |
| V03-0143 | 2.4 | table | V03 §2.4 |
| V03-0144 | 2.4 | table | V03 §2.4 |
| V03-0145 | 2.4 | table | V03 §2.4 |
| V03-0146 | 2.4 | constant | V03 §2.4 — a reference to pipeline §4.12 |
| V03-0147 | 2.4 | rule | V03 §2.4 |
| V03-0148 | 2.4 | table | V03 §2.4 |
| V03-0149 | 2.5 | lifecycle | V03 §2.5 |
| V03-0150 | 2.5 | lifecycle | V03 §2.5 |
| V03-0151 | 2.5 | lifecycle | V03 §2.5 |
| V03-0152 | 2.5 | lifecycle | V03 §2.5 |
| V03-0153 | 2.5 | lifecycle | V03 §2.5 |
| V03-0154 | 2.5 | lifecycle | V03 §2.5 |
| V03-0155 | 2.5 | lifecycle | V03 §2.5 |
| V03-0156 | 2.5 | lifecycle | V03 §2.5 |
| V03-0157 | 2.5 | lifecycle | V03 §2.5 |
| V03-0158 | 2.5 | lifecycle | V03 §2.5 |
| V03-0159 | 2.5 | lifecycle | V03 §2.5 — a reference to model §2.6 |
| V03-0160 | 2.5 | lifecycle | V03 §2.5 |
| V03-0161 | 2.5 | lifecycle | V03 §2.5 |
| V03-0162 | 3.1 | step | V03 §3.1 — a reference to model §2.6 |
| V03-0163 | 3.1 | rule | V03 §3.1 |
| V03-0164 | 3.1 | rule | V03 §3.1 |
| V03-0165 | 3.2 | mechanism | V03 §3.2 |
| V03-0166 | 3.2 | mechanism | V03 §3.2 |
| V03-0167 | 3.2 | rule | V03 §3.2 |
| V03-0168 | 3.2 | rule | V03 §3.2 |
| V03-0169 | 3.2 | mechanism | V03 §3.2 |
| V03-0170 | 3.2 | rule | V03 §3.2 |
| V03-0171 | 3.2 | rule | V03 §3.2 |
| V03-0172 | 3.2 | rule | V03 §3.2 |
| V03-0173 | 3.2 | rule | V03 §3.2 |
| V03-0174 | 3.2 | rule | V03 §3.2 |
| V03-0175 | 3.2 | rule | V03 §3.2 |
| V03-0176 | 3.2 | rule | V03 §3.2 |
| V03-0177 | 3.2 | rule | V03 §3.2 |
| V03-0178 | 3.2 | rule | V03 §3.2 |
| V03-0179 | 3.2 | rule | V03 §3.2 |
| V03-0180 | 3.2 | rule | V03 §3.2 |
| V03-0181 | 3.2 | rule | V03 §3.2 |
| V03-0182 | 3.2 | rule | V03 §3.2 |
| V03-0183 | 3.2 | rule | V03 §3.2 |
| V03-0184 | 3.2 | rule | V03 §3.2 |
| V03-0185 | 3.2 | rule | V03 §3.2 |
| V03-0186 | 3.3 | rule | V03 §3.3 |
| V03-0187 | 3.3 | mechanism | V03 §3.3 |
| V03-0188 | 3.3 | mechanism | V03 §3.3 |
| V03-0189 | 3.3 | rule | V03 §3.3 |
| V03-0190 | 3.3 | rule | V03 §3.3 |
| V03-0191 | 3.3 | rule | V03 §3.3 |
| V03-0192 | 3.3 | fallback | V03 §3.3 |
| V03-0193 | 3.3 | rule | V03 §3.3 |
| V03-0194 | 3.3 | rule | V03 §3.3 |
| V03-0195 | 3.3 | rule | V03 §3.3 |
| V03-0196 | 3.3 | rule | V03 §3.3 |
| V03-0197 | 3.3 | rule | V03 §3.3 |
| V03-0198 | 3.3 | rule | V03 §3.3 |
| V03-0199 | 3.3 | rule | V03 §3.3 |
| V03-0200 | 3.3 | rule | V03 §3.3 |
| V03-0201 | 3.3 | rule | V03 §3.3 |
| V03-0202 | 3.4 | rule | V03 §3.4 |
| V03-0203 | 3.4a | mechanism | V03 §3.4a |
| V03-0204 | 3.5 | mechanism | V03 §3.5 |
| V03-0205 | 3.5 | rule | V03 §3.5 |
| V03-0206 | 3.5 | mechanism | V03 §3.5 |
| V03-0207 | 3.5 | mechanism | V03 §3.5 |
| V03-0208 | 3.5 | rule | V03 §3.5 |
| V03-0209 | 3.5 | table | V03 §3.5 |
| V03-0210 | 3.5 | mechanism | V03 §3.5 |
| V03-0211 | 3.5 | rule | V03 §3.5 |
| V03-0212 | 3.6 | rule | V03 §3.6 |
| V03-0213 | 3.6 | mechanism | V03 §3.6 |
| V03-0214 | 3.6 | rule | V03 §3.6 |
| V03-0215 | 3.6 | rule | V03 §3.6 |
| V03-0216 | 3.6 | rule | V03 §3.6 |
| V03-0217 | 3.6 | rule | V03 §3.6 |
| V03-0218 | 3.6 | rule | V03 §3.6 |
| V03-0219 | 3.6 | rule | V03 §3.6 |
| V03-0220 | 3.6 | rule | V03 §3.6 |
| V03-0221 | 3.6 | rule | V03 §3.6 |
| V03-0222 | 3.6 | mechanism | V03 §3.6 |
| V03-0223 | 3.6 | rule | V03 §3.6 — a reference to model §2.6 |
| V03-0224 | 3.6 | rule | V03 §3.6 |
| V03-0225 | 3.6 | rule | V03 §3.6 W2 (the decided order, J122) |
| V03-0226 | 3.6 | rule | V03 §3.6 |
| V03-0227 | 3.6 | rule | V03 §3.6 |
| V03-0228 | 3.7.1 | rule | V03 §3.7.1 |
| V03-0229 | 3.7.1 | rule | V03 §3.7.1 |
| V03-0230 | 3.7.1 | rule | V03 §3.7.1 (the walk-out condition now cited from §2.6 *Basements*; the door by rule 1 kept) |
| V03-0231 | 3.7.1 | interface | V03 §3.7.1 |
| V03-0232 | 3.7.1 | rule | V03 §3.7.1 |
| V03-0233 | 3.7.1 | rule | V03 §3.7.1 |
| V03-0234 | 3.7.2 | rule | V03 §3.7.2 |
| V03-0235 | 3.7.2 | rule | V03 §3.7.2 |
| V03-0236 | 3.7.2 | rule | V03 §3.7.2 |
| V03-0237 | 3.7.2 | interface | V03 §3.7.2 |
| V03-0238 | 3.7.2 | rule | V03 §3.7.2 |
| V03-0239 | 3.7.2 | rule | V03 §3.7.2 |
| V03-0240 | 3.7.2 | rule | V03 §3.7.2 |
| V03-0241 | 3.7.2 | rule | V03 §3.7.2 |
| V03-0242 | 3.7.3 | rule | V03 §3.7.3 |
| V03-0243 | 3.7.4 | rule | V03 §3.7.4 — a reference to model §2.6 |
| V03-0244 | 3.7.4 | rule | V03 §3.7.4 |
| V03-0245 | 3.7.4 | rule | V03 §3.7.4 |
| V03-0246 | 3.7.4 | rule | V03 §3.7.4 |
| V03-0247 | 3.7.4 | rule | V03 §3.7.4 |
| V03-0248 | 3.7.5 | rule | V03 §3.7.5 |
| V03-0249 | 3.7.6 | rule | V03 §3.7.6 |
| V03-0250 | 3.7.6 | rule | V03 §3.7.6 |
| V03-0251 | 3.7.6 | rule | V03 §3.7.6 |
| V03-0252 | 3.7.7 | rule | V03 §3.7.7 |
| V03-0253 | 3.8 | rule | V03 §3.8 |
| V03-0254 | 3.8 | rule | V03 §3.8 |
| V03-0255 | 3.9 | table | V03 §3.9 |
| V03-0256 | 3.9 | fallback | V03 §3.9 |
| V03-0257 | 3.10 | table | V03 §3.10 |
| V03-0258 | 3.10 | rule | V03 §3.10 |
| V03-0259 | 3.11 | rule | V03 §3.11 |
| V03-0260 | 3.12 | rule | V03 §3.12 |
| V03-0261 | 3.12 | rule | V03 §3.12 |
| V03-0262 | 3.12 | rule | V03 §3.12 — a reference to V04 V04 §3.5.0a |
| V03-0263 | 4.1 | rule | V03 §4.1 |
| V03-0264 | 4.2 | rule | V03 §4.2 |
| V03-0265 | 4.2 | edit | V03 §4.2 |
| V03-0266 | 4.2 | edit | V03 §4.2 |
| V03-0267 | 4.2 | edit | V03 §4.2 |
| V03-0268 | 4.2 | edit | V03 §4.2 |
| V03-0269 | 4.2 | edit | V03 §4.2 |
| V03-0270 | 4.2 | edit | V03 §4.2 |
| V03-0271 | 4.2 | edit | V03 §4.2 |
| V03-0272 | 4.2 | edit | V03 §4.2 |
| V03-0273 | 4.2 | edit | V03 §4.2 — a reference to V02 V02 §3.17 |
| V03-0274 | 4.2 | rule | V03 §4.2 |
| V03-0275 | 4.3 | rule | V03 §4.3 |
| V03-0276 | 4.3 | rule | V03 §4.3 |
| V03-0277 | 4.3 | rule | V03 §4.3 |
| V03-0278 | 4.3 | rule | V03 §4.3 |
| V03-0279 | 4.3 | rule | V03 §4.3 |
| V03-0280 | 4.4 | rule | V03 §4.4 |
| V03-0281 | 4.5 | rule | V03 §4.5 |
| V03-0282 | 4.5 | rule | V03 §4.5 |
| V03-0283 | 4.5 | rule | V03 §4.5 |
| V03-0284 | 4.5 | rule | V03 §4.5 |
| V03-0285 | 4.5 | rule | V03 §4.5 |
| V03-0286 | 4.6 | interface | V03 §4.6 |
| V03-0287 | 4.6 | interface | V03 §4.6 |
| V03-0288 | 5.1 | render | V03 §5.1 *Stops* (the stops and threshold cited from §8.8, §8.5) |
| V03-0289 | 5.1 | render | V03 §5.1 |
| V03-0290 | 5.1 | render | V03 §5.1 |
| V03-0291 | 5.1 | render | V03 §5.1 |
| V03-0292 | 5.1 | render | V03 §5.1 |
| V03-0293 | 5.2 | export | V03 §5.2 |
| V03-0294 | 5.3 | export | V03 §5.3 — a reference to rendering §11.1 |
| V03-0295 | 5.3 | export | V03 §5.3 — a reference to rendering §11.1 |
| V03-0296 | 5.3 | export | V03 §5.3 — a reference to rendering §11.1 |
| V03-0297 | 5.3 | export | V03 §5.3 — a reference to rendering §11.1 |
| V03-0298 | 5.3 | export | V03 §5.3 — a reference to rendering §11.1 |
| V03-0299 | 5.4 | rule | V03 §5.4 |
| V03-0300 | 6 | budget | V03 §6 |
| V03-0301 | 6 | fallback | V03 §6 |
| V03-0302 | 7 | test | V03 §7 |
| V03-0303 | 7 | test | V03 §7 |
| V03-0304 | 7 | test | V03 §7 |
| V03-0305 | 7 | test | V03 §7 |
| V03-0306 | 7 | test | V03 §7 |
| V03-0307 | 7 | test | V03 §7 |
| V03-0308 | 7 | test | V03 §7 |
| V03-0309 | 7 | test | V03 §7 |
| V03-0310 | 7 | test | V03 §7 |
| V03-0311 | 7 | test | V03 §7 |
| V03-0312 | 7 | test | V03 §7 |
| V03-0313 | 7 | test | V03 §7 |
| V03-0314 | 8 | decision | V03 §8 |
| V03-0315 | 8 | table | V03 §8 |
| V03-0316 | 8 | table | V03 §8 |
| V03-0317 | 8 | table | V03 §8 |
| V03-0318 | 8 | decision | V03 §8 |
| V03-0319 | 8 | rule | V03 §8 |
| V03-0320 | 8 | decision | V03 §8 *Where in §16's order* (decided order; §16 cited) |
| V03-0321 | 9 | decision | V03 §9 J-V3.1 |
| V03-0322 | 9 | decision | V03 §9 J-V3.2 |
| V03-0323 | 9 | decision | V03 §9 J-V3.3 |
| V03-0324 | 9 | decision | V03 §9 J-V3.4 |
| V03-0325 | 9 | decision | V03 §9 J-V3.5 |
| V03-0326 | 9 | decision | V03 §9 J-V3.6 |
| V03-0327 | 9 | decision | V03 §9 J-V3.7 |
| V03-0328 | 9 | decision | V03 §9 J-V3.8 |
| V03-0329 | 9 | decision | V03 §9 J-V3.9 |
| V03-0330 | 9 | decision | V03 §9 J-V3.10 |
| V03-0331 | 9 | decision | V03 §9 J-V3.11 |
| V03-0332 | 9 | decision | V03 §9 J-V3.12 |
| V03-0333 | 9 | decision | V03 §9 J-V3.13 |
| V03-0334 | 9 | decision | V03 §9 J-V3.14 |
| V03-0335 | 9 | decision | V03 §9 J-V3.15 |
| V03-0336 | 9 | decision | V03 §9 J-V3.16 |
| V03-0337 | 9 | decision | V03 §9 J-V3.17 |
| V03-0338 | 9 | decision | V03 §9 J-V3.18 |
| V03-0339 | 9 | decision | V03 §9 J-V3.19 |
| V03-0340 | 9 | decision | V03 §9 J-V3.20 |
| V03-0341 | 9 | decision | V03 §9 J-V3.21 |
| V03-0342 | 9 | decision | V03 §9 J-V3.22 |
| V03-0343 | 9 | decision | V03 §9 J-V3.23 |
| V03-0344 | 9 | decision | V03 §9 J-V3.24 |
| V03-0345 | 9 | decision | V03 §9 J-V3.25 |
| V03-0346 | 9 | decision | V03 §9 J-V3.26 |
| V03-0347 | 9 | decision | V03 §9 J-V3.27 |
| V03-0348 | 9 | decision | V03 §9 J-V3.28 |
| V03-0349 | 9 | decision | V03 §9 J-V3.29 |
| V03-0350 | 9 | decision | V03 §9 J-V3.30 |
| V03-0351 | 9 | decision | V03 §9 J-V3.31 |
| V03-0352 | 9 | decision | V03 §9 J-V3.32 |
| V03-0353 | 9 | decision | V03 §9 J-V3.33 |
| V03-0354 | 9 | decision | V03 §9 J-V3.34 |
| V03-0355 | 9 | decision | V03 §9 J-V3.35 |
| V03-0356 | 9 | decision | V03 §9 J-V3.36 |
| V03-0357 | 9 | decision | V03 §9 J-V3.37 |
| V03-0358 | 9 | decision | V03 §9 J-V3.38 |
| V03-0359 | 9 | decision | V03 §9 J-V3.39 |
| V03-0360 | 9 | decision | V03 §9 J-V3.40 |
| V03-0361 | 9 | decision | V03 §9 J-V3.41 |
| V03-0362 | 9 | decision | V03 §9 J-V3.42 (marked amended, E-24) |
| V03-0363 | 9 | decision | V03 §9 J-V3.43 |
| V03-0364 | 9 | decision | V03 §9 J-V3.44 |
| V03-0365 | 9 | decision | V03 §9 J-V3.45 |
| V03-0366 | 9 | decision | V03 §9 J-V3.46 |
| V03-0367 | 9 | decision | V03 §9 J-V3.47 (marked amended, E-24) |
| V03-0368 | 9 | decision | V03 §9 J-V3.48 |
| V03-0369 | 9 | decision | V03 §9 J-V3.49 |
| V03-0370 | 9 | decision | V03 §9 J-V3.50 |
| V03-0371 | 9 | decision | V03 §9 J-V3.51 |
| V03-0372 | 9 | decision | V03 §9 J-V3.52 |
| V03-0373 | 9 | decision | V03 §9 J-V3.53 |
| V03-0374 | 9 | decision | V03 §9 J-V3.54 |
| V03-0375 | 9 | decision | V03 §9 J-V3.55 |
| V03-0376 | 9 | decision | V03 §9 J-V3.56 |
| V03-0377 | 9 | decision | V03 §9 J-V3.57 |
| V03-0378 | 9 | decision | V03 §9 J-V3.58 |
| V03-0379 | 9 | decision | V03 §9 J-V3.59 |
| V03-0380 | 9 | decision | V03 §9 J-V3.60 |
| V03-0381 | 9 | decision | V03 §9 J-V3.61 |
| V03-0382 | 9 | decision | V03 §9 J-V3.62 |
| V03-0383 | 9 | decision | V03 §9 J-V3.63 |
| V03-0384 | 9 | decision | V03 §9 J-V3.64 |
| V03-0385 | 9 | decision | V03 §9 J-V3.65 |
| V03-0386 | 9 | decision | V03 §9 J-V3.66 |
| V03-0387 | 9 | decision | V03 §9 J-V3.67 |
| V03-0388 | 9 | decision | V03 §9 J-V3.68 |
| V03-0389 | 9 | decision | V03 §9 J-V3.69 |
| V03-0390 | 9 | decision | V03 §9 J-V3.70 |
| V03-0391 | 9 | decision | V03 §9 J-V3.71 |
| V03-0392 | 9 | decision | V03 §9 J-V3.72 |
| V03-0393 | 9 | decision | V03 §9 J-V3.73 |
| V03-0394 | 9 | decision | V03 §9 J-V3.74 |
| V03-0395 | 9 | decision | V03 §9 J-V3.75 |
| V03-0396 | 9 | decision | V03 §9 J-V3.76 |
| V03-0397 | 9 | decision | V03 §9 J-V3.77 |
| V03-0398 | 9 | decision | V03 §9 J-V3.78 |
| V03-0399 | 9 | decision | V03 §9 J-V3.79 |
| V03-0400 | 9 | decision | V03 §9 J-V3.80 |
| V03-0401 | 9 | decision | V03 §9 J-V3.81 |
| V03-0402 | 9 | decision | V03 §9 J-V3.82 |
| V03-0403 | 9 | decision | V03 §9 J-V3.83 |
| V03-0404 | 9 | decision | V03 §9 J-V3.84 |
| V03-0405 | 9 | decision | V03 §9 J-V3.85 |
| V03-0406 | 9 | decision | V03 §9 J-V3.86 |
| V03-0407 | 9 | decision | V03 §9 J-V3.87 |
| V03-0408 | 9 | decision | V03 §9 J-V3.88 |
| V03-0409 | 9 | decision | V03 §9 J-V3.89 |
| V03-0410 | 9 | decision | V03 §9 J-V3.90 |
| V03-0411 | 9 | decision | V03 §9 J-V3.91 |
| V03-0412 | 9 | decision | V03 §9 J-V3.92 |
| V03-0413 | 9 | decision | V03 §9 J-V3.93 |
| V03-0414 | 9 | decision | V03 §9 J-V3.94 |
| V03-0415 | 9 | decision | V03 §9 J-V3.95 |
| V03-0416 | 9 | decision | V03 §9 J-V3.96 |
| V03-0417 | 9 | decision | V03 §9 J-V3.97 |
| V03-0418 | 9 | decision | V03 §9 J-V3.98 (marked superseded by J-V3.131, E-24) |
| V03-0419 | 9 | decision | V03 §9 J-V3.99 |
| V03-0420 | 9 | decision | V03 §9 J-V3.100 |
| V03-0421 | 9 | decision | V03 §9 J-V3.101 |
| V03-0422 | 9 | decision | V03 §9 J-V3.102 |
| V03-0423 | 9 | decision | V03 §9 J-V3.103 |
| V03-0424 | 9 | decision | V03 §9 J-V3.104 |
| V03-0425 | 9 | decision | V03 §9 J-V3.105 |
| V03-0426 | 9 | decision | V03 §9 J-V3.106 |
| V03-0427 | 9 | decision | V03 §9 J-V3.107 |
| V03-0428 | 9 | decision | V03 §9 J-V3.108 |
| V03-0429 | 9 | decision | V03 §9 J-V3.109 |
| V03-0430 | 9 | decision | removed: process record, not a design decision (NARR-8); the validation records keep it |
| V03-0431 | 9 | decision | V03 §9 J-V3.111 |
| V03-0432 | 9 | decision | V03 §9 J-V3.112 |
| V03-0433 | 9 | decision | V03 §9 J-V3.113 |
| V03-0434 | 9 | decision | V03 §9 J-V3.114 |
| V03-0435 | 9 | decision | V03 §9 J-V3.115 |
| V03-0436 | 9 | decision | V03 §9 J-V3.116 |
| V03-0437 | 9 | decision | V03 §9 J-V3.117 |
| V03-0438 | 9 | decision | V03 §9 J-V3.118 (marked amended, E-24) |
| V03-0439 | 9 | decision | V03 §9 J-V3.119 |
| V03-0440 | 9 | decision | V03 §9 J-V3.120 |
| V03-0441 | 9 | decision | V03 §9 J-V3.121 |
| V03-0442 | 9 | decision | V03 §9 J-V3.122 |
| V03-0443 | 9 | decision | V03 §9 J-V3.123 |
| V03-0444 | 9 | decision | V03 §9 J-V3.124 |
| V03-0445 | 9 | decision | V03 §9 J-V3.125 |
| V03-0446 | 9 | decision | V03 §9 J-V3.126 (marked amended, E-24) |
| V03-0447 | 9 | decision | V03 §9 J-V3.127 |
| V03-0448 | 9 | decision | V03 §9 J-V3.128 |
| V03-0449 | 9 | decision | V03 §9 J-V3.129 |
| V03-0450 | 10 | rule | V03 §10 intro (narration of rounds cut) |
| V03-0451 | 10 | bcr | V03 §10 table row BCR-V3-1 → file f item 428 (the base text is the home) |
| V03-0452 | 10 | bcr | V03 §10 table row BCR-V3-2 → file f item 232 (the base text is the home) |
| V03-0453 | 10 | bcr | V03 §10 table row BCR-V3-3 → file f item 352 (the base text is the home) |
| V03-0454 | 10 | bcr | V03 §10 table row BCR-V3-4 → file f item 374 (the base text is the home) |
| V03-0455 | 10 | bcr | V03 §10 table row BCR-V3-5 → file f item 457 (the base text is the home) |
| V03-0456 | 10 | bcr | V03 §10 table row BCR-V3-6 → file f item 420 (the base text is the home) |
| V03-0457 | 10 | bcr | V03 §10 table row BCR-V3-7 → file f item 450 (the base text is the home) |
| V03-0458 | 10 | bcr | V03 §10 table row BCR-V3-8 → file f item 273 (the base text is the home) |
| V03-0459 | 10 | bcr | V03 §10 table row BCR-V3-14 → file f item 483 (the base text is the home) |
| V03-0460 | 10 | bcr | V03 §10 table row BCR-V3-10 → file f item 329 (the base text is the home) |
| V03-0461 | 10 | bcr | V03 §10 table row BCR-V3-11 → file f item 334 (the base text is the home) |
| V03-0462 | 10 | bcr | V03 §10 table row BCR-V3-12 → file f item 233 (the base text is the home) |
| V03-0463 | 10 | bcr | V03 §10 table row BCR-V3-13 → file f item 234 (the base text is the home) |
| V03-0464 | 10 | bcr | V03 §10 table row BCR-V2-41 → file f item 230 (the base text is the home) |
| V03-0465 | 10 | bcr | V03 §10 table row BCR-V2-13 → file f item 261 (the base text is the home) |
| V03-0466 | 10 | bcr | V03 §10 table row BCR-V3-16 → file f item 353 (the base text is the home) |
| V03-0467 | 10 | bcr | V03 §10 table row BCR-V3-17 → file f item 236 (the base text is the home) |
| V03-0468 | 10 | bcr | V03 §10 table row BCR-V3-18 → file f item 451 (the base text is the home) |
| V03-0469 | 10 | bcr | V03 §10 table row BCR-V3-19 → file f item 237 (the base text is the home) |
| V03-0470 | 10 | bcr | V03 §10 table row BCR-V11-13 → file f item 436 (the base text is the home) |
| V03-0471 | 10 | bcr | V03 §10 table row BCR-V3-21 → file f item 239 (the base text is the home) |
| V03-0472 | 10 | bcr | V03 §10 table row BCR-V10-3 → file f item 270 (the base text is the home) |
| V03-0473 | 10 | bcr | V03 §10 table row BCR-V3-23 → file f item 324 (the base text is the home) |
| V03-0474 | 10 | bcr | V03 §10 table row BCR-V3-24 → file f item 354 (the base text is the home) |
| V03-0475 | 10 | bcr | V03 §10 table row BCR-V2-33 → file f item 371 (the base text is the home) |
| V03-0476 | 10 | bcr | V03 §10 table row BCR-V2-41 → file f item 230 (the base text is the home) |
| V03-0477 | 10 | bcr | V03 §10 table row BCR-V2-33 → file f item 371 (the base text is the home) |
| V03-0478 | 10 | bcr | V03 §10 table row BCR-V3-28 → file f item 263 (the base text is the home) |
| V03-0479 | 10 | bcr | V03 §10 table row BCR-V3-29 → file f item 347 (the base text is the home) |
| V03-0480 | 10 | bcr | V03 §10 table row BCR-V2-20 → file f item 568 (the base text is the home) |
| V03-0481 | 10 | bcr | V03 §10 table row BCR-V2-18 → file f item 505 (the base text is the home) |
| V03-0482 | 10 | bcr | V03 §10 table row BCR-V2-33 → file f item 371 (the base text is the home) |
| V03-0483 | 10 | bcr | V03 §10 table row BCR-V3-33 → file f item 585 (the base text is the home) |
| V03-0484 | 11 | owner-question | V03 §11 table: Q1 answered yes (J122) |
| V03-0485 | 12 | rule | V03 §12 (CONFIRMED / PLAUSIBLE condensed; per-round receipts to the validation records) |
| V03-0486 | 13 | handoff | V03 §13 hand-off table (rows V04; each closed or written at its destination) |
| V03-0487 | 13 | handoff | V03 §13 hand-off table (rows V11; each closed or written at its destination) |
| V03-0488 | 13 | handoff | V03 §13 hand-off table (rows V06; each closed or written at its destination) |
| V03-0489 | 13 | handoff | V03 §13 hand-off table (rows V01, V10, V09; each closed or written at its destination) |
| V03-0490 | 13 | handoff | V03 §13 hand-off table (rows V04, V02, V06, V01, V09, V10, V11, V12 (second round); each closed or written at its destination) |
| V03-0491 | 13 | handoff | V03 §13 hand-off table (rows V01, V02, V05, V06, V07, V09, V10, V11, V12 (reconciliation rounds); each closed or written at its destination) |
| V03-0492 | IN | interface | V03 §4.6 *Section providers*, §1b *Interfaces* (IN-V03-1 folded) |
| V03-0493 | IN | rule | V03 §4.2 (IN-V03-2 folded) |
| V03-0494 | 3.3 | term | V03 §3.3 |
| V03-0495 | 3.3 | term | V03 §3.3 |
| V03-0496 | 3.7.4 | term | V03 §3.7.4 |
| V03-0497 | 3.7.1 | term | V03 §3.7.1 |
| V03-0498 | 3.7.4 | term | V03 §3.7.4 |
| V03-0499 | 3.7.4 | term | V03 §3.7.4 |
| V03-0500 | 3.7.4 | term | V03 §3.7.4 |
| V03-0501 | 3.7.1 | term | V03 §3.7.1 |
| V03-0502 | 3.7.2 | term | V03 §3.7.2 |
| V03-0503 | 3.3 | term | V03 §3.3 |
| V03-0504 | 3.4a | term | V03 §3.4a |
| V03-0505 | 3.3 | term | V03 §3.3 |
| V03-0506 | 3.6 | term | V03 §3.6 |
| V03-0507 | 3.6 | term | V03 §3.6 |
| V03-0508 | 3.7.1 | term | V03 §3.7.1 |
| V03-0509 | 3.7.2 | term | V03 §3.7.2 |
| V03-0510 | 2.4 | term | V03 §2.4 |
| V03-0511 | 3.2 | term | V03 §3.2 |
| V03-0512 | 3.5 | term | V03 §3.5 |
| V03-0513 | 3.12 | term | V03 §3.12 |
