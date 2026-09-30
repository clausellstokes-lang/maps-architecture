# Rewrite V02 — the coherence, cohesion, wiring and elegance pass over volume 2 (buildings)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-V02; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/rewrite-V02`)
- P1 inputs gathered (canon unit V02: 10 conflicts, 4 wiring gaps, E-24 and E-27, ID-WX and ID-DUPDEF, 14 inbound hand-offs, 47 UNDEFINED + 21 UNTESTED edges, 28 combinations, 40 open findings, the f items): done
- P2 volume rewritten part by part (`work/rewrite-V02/parts/00–29`): done
- P3 assembled to `docs/validation/coherence/new/volumes/V02-buildings.md`: done
- P4 sweeps (retired terms, citation form, ids, own-section references, narration and deferral words): done
- P5 mapping table, this report, results JSON, LANDED: done

**Output:** `docs/validation/coherence/new/volumes/V02-buildings.md` — same title line, the one marker line under it,
the same section structure (§0 – §13 and *Integration notes*); the reconciliation and finalization logs removed
(narration, V02-NARR-9).

## 1 Sizes

| section | words before | words after |
|---|---|---|
| title, marker, citations | 1439 | 137 |
| §0 | 1756 | 1651 |
| §1 | 7218 | 6911 |
| §2 | 8591 | 7753 |
| §3 | 33356 | 32918 |
| §4 | 4841 | 4933 |
| §5 | 3387 | 3397 |
| §6 | 1753 | 1727 |
| §7 | 5955 | 8915 |
| §8 | 2818 | 2391 |
| §9 | 8537 | 7720 |
| §10 | 9988 | 621 |
| §11 | 412 | 109 |
| §12 | 2252 | 802 |
| §13 | 3633 | 2057 |
| Integration notes | 430 | 102 |
| Reconciliation rounds 1–5, Finalization | 7264 | 0 |
| **total** | 103630 | 82144 |

**103 630 → 82 144 words (−20.7 %; 622 KB → 479 KB).** Removed ≈ 24 450 words, added ≈ 2 960 (the new edge section
§7.8 with T-V2-54 – T-V2-58, the style cells, the folded hand-offs). Shares of the removed words by source:
**restatement ≈ 47 %** (§10's forty-two request texts → one pointer table to file f's items, now base text; §1.1's building
counts and §12.5's times in §6; V11's heights values in T-V2-7; the NG parity sentence; the kernel constants' values;
the restatements the canon's REFERENCE list names); **narration ≈ 49 %** (the reconciliation and finalization logs, the
per-revision §12 and §13 logs, §11's per-round paragraphs, the "second revision / reconciliation round n / V2C- / SCC- /
S23…" labels in §3–§9, the stacked marker lines, the integration-note wrappers); **duplicated mechanisms ≈ 0.5 %**
(E-27: one `valleyReach`); **verbose prose ≈ 3.5 %** (§8's effort history and milestone rows merged, §9's amended rows
restated as their current choice).

**Below the 25–40 % band, and why (not a defect).** §3 (33 k words, −1.3 %) is the build-depth design itself — M0–M14,
ST0–ST8, `massOval`, the mutator's W1–W10, the 3.10 default rows with every cell at four anchors, the owner's rules at
the building — and holds almost no restatement or narration; it is irreducible without thinning content. §7 grew by the
edge catalogue's required content (+2 960 words). Excluding §7.8's new content the pass removed 23.5 % of the volume;
no unit shrank by more than half except §10, §11 and the logs, which are pointers and narration by rule (verifier
audit: §10's content lives in file f's items 216–231, 261, 303–305, 318, 328, 332–333, 341, 346, 351, 370–371,
376–377, 385, 402, 406, 419, 426–427, 449, 499, 505, 522, 524–525, 568).

## 2 Conflicts resolved (10, as the canon rules)

| conflict | ruling applied | where |
|---|---|---|
| MC-01 | `lot` retired outside quotations; the field is `BuildingInput.plot` | whole volume (no `lot` remains) |
| MC-11 | `DriftBounds` declared in the base §2.6 (item 385); V02 cites it | V02 §1b, §2.1 |
| V01-ICONF-4, V02-XCONF-1 | the soffit bound over a crossed way is item 244's clearance rule (the way's held `clearanceCm` first, else V11's `raisedWays.structure.clearanceCm`), cited as V01 cites it | V02 §3.17 (b); J-V2.89; §7.8 |
| V02-ICONF-1 | `composition.classFamily`'s home is V02 §3.10.5, the one source of the village classes' composition keys; V07 cites it | V02 §2.3, §3.10.5; J-V2.56, J-V2.96; X13 |
| V02-ICONF-2 | the effort stated once: the volume 22.5–32.5 pw; M6 18.25–27.5; M3a-V2 2–2.75; spikes 2.25; the milestone table its breakdown | V02 §8.3, §8.5 |
| V02-ICONF-3 | R5's last rung is a bend: that building's warp step held at the last lawful fraction, named in the dry run | V02 §8.4 R5 |
| V02-ICONF-4 | round 1's 0.25–0.5 pw inside M6 (in M6a's row, 8.25–11.75) | V02 §8.3 |
| V09-XAGREE-3 | V02 §1b's bend ids are the one set; V09 §4.9 holds one row per id; the ids now named at every bend of §4.2, §4.3, §4.6 (`bend.tiers.form`, `.top`, `bend.tier.height`, `bend.deck.floors`, `bend.room.host` written at their cases) | V02 §1b, §4, T-V2-19, T-V2-48; X21 |
| CANON-C03 | §11's question marked answered (J122; J121) | V02 §11 |

One further internal disagreement surfaced by E-27 and fixed: the integer valley reach read the shed's half span while
the roof plane reads its whole run; both modes now read `Y.runCm` (V02 §3.7), tested by T-V2-54.

## 3 Elegance rulings applied

**E-27 — one `valleyReach(X, Y, mode)`** at V02 §3.7, read by `facadeBays` (`'int'`) and the roofscape (`'float'`,
V02 §5.2 step 2). Equivalence list: ✔ the integer form's byte-identity (`'int'` mode, integer centimetres by §6.5's
arithmetic, floored; T-V2-13, T-V2-54); ✔ the float form's view-only status (`'float'`, float64, view data, never read
by the bays; J-V2.25).

**E-24 — one mark on a replaced decision row.** V02 §9: J-V2.73 and J-V2.76 carry "Superseded by J-V2.79" with their
original choice; every in-row "*Amended by …*" of this volume's own rows is written as the row's current choice.
Equivalence list: ✔ no row dropped (J-V2.1 – J-V2.108 all present, in id order); ✔ the governing row keeps the reason
(J-V2.79 keeps the reasons and the two variations).

No other unification was made. **Kept apart** (as the canon rules): E-39 (V02's building lifecycle states stay apart from
the access, way and wall closure sets); E-02 (the deck-plot suppression on a delete event is the base's item 260).

## 4 Renumberings and ids

No id was renumbered. ID-WX: the hand-off rows stay `X1`–`X33` (volume-local; other units write `V02 X n`); the
integration notes' ids are kept in this record only (their content folded, §13's *Integration notes* names each home).
ID-DUPDEF: no duplicate. New ids: T-V2-54 (one valley reach), T-V2-55 (the input edges), T-V2-56 (every rung, preset
and toggle), T-V2-57 (the lifecycle at every edit), T-V2-58 (the combinations). §9 re-ordered by id (V02-TERM-2).
Census over the new file: J-V2.1 – J-V2.108, T-V2-1 – T-V2-58, X1 – X33 each defined once, every cited one defined;
every `V02 §x.y` resolves to a heading of the file.

## 5 Wiring gaps closed

| gap | closure |
|---|---|
| W-DOS-10b | V02 §1b's dossier table names each row's derivation row (DR24 the kind; DR15 `materialFamily` and a stepped culture; DR10 a split class; DR17 a crypt record; DR6, DR7 households and bands; DR9 ladder members) |
| W-IF-06 | `terrace.wallBandCm`'s consumer named: the wing datum's wall-side sample (V02 §1b, §3.10.9; T-V2-51) |
| W-HOOK-02 | V02's end of the hook: V02 §1b's rows for `ComposedBuildingGenerator.outline()` and `.compose()` name §2.6's `BuildingGenerator.outline` / `.compose` they implement; the base's §2.6 names V02 as the building volume (the model part) |
| V02-WGAP-1 | the style values are §8.2 style-sheet cells named in V02 §5.3 — `roofscape.ridgeWeight` ½, `roofscape.hipWeight` ⅓, `fm.hatchPitchPx` 0.9, `stairFlight.treadWeight` ⅓, `stairFlight.treadInsetShare` 0.1, `stairFlight.minTreadPx` 2 — and the §8.10 row cells `stepStones.sizeM` [0.5, 0.8], `stepStones.pitchM` 1 |

## 6 Hand-offs

Inbound, closed in V02 (14): V06 X3 (V02 §3.14.5 (e)), V06 X24 (§3.16 (3)), V08 X6 (X17), V09 XV-V9-6 (§3.14.5, §4.5,
§4.6 (7), X21), V09 XV-V9-8 (§8.3's M6c row: AP10 priced in V09's staged lines), V10 CVR-V10-8 (§4.6 (7)), V11 X-V11-5
(X17), X-V11-7 (§3.16 (3), X16), X-V11-9 (X27), V12 X-V12-2 (§7.5), X-V12-11 (T-V2-50's NoOpPin), X-V12-12 (§8.5),
X-V12-15 (§3.10.10), X-V12-18 (X33). Outbound: §13's list keeps X1–X33, the landed ones as one closed line each (X3, X5,
X13, X27, X28, X30 – X33), with no "until … lands" or "where adopted" wording (V02-DEFER-3).

## 7 Edges and combinations

All 68 catalogue edges (47 UNDEFINED, 21 UNTESTED) and 28 combinations routed to V02 are defined in V02 §7.8 — each
with its outcome, its §5 rung and its test (T-V2-55 – T-V2-58, or the existing bar named), plus the owner's two further
meetings (a dossier removing what an edit shaped; an epoch undone after a save). No edge's outcome is a crash, a hang,
lost data, a silent wrong result or a whole-map retry.

## 8 Open findings routed here (40) — all closed

VOL-V01-V02-RESTATEMENTS-007 – -011 and V02-RESTATE-1 – -5: the values cited at their homes (§2.2 / §3.2; §1.1, §12.5;
V11 §3.6.4; V01 §7). V02-ICONF-1 – -4, V02-XCONF-1: §2 above. V02-ELEG-1: E-27. V02-WGAP-1: §5 above. V02-MISSING-1:
§11 answered. V02-TERM-1: citation form `Vnn §x.y` throughout. V02-TERM-2: §9 in id order. V02-TERM-3: T-V2-36 worded
"the ground wings over the crypt's ring". V02-DEFER-1 – -2: J122's order in V02 §8.1, §8.3 and J-V2.32; J-V2.71's
"later owner rule" clause dropped. V02-DEFER-3: X27 and X28 closed at their landed homes. V02-NARR-1: one marker line.
V02-NARR-2, -4, -5, -6, -7, -9: the logs removed; §10 a pointer table; §12 one current list with one census line; §13 the
hand-off list only. V02-NARR-3: the decisions as their current choices; J-V2.73 and J-V2.76 kept with the E-24 mark (E-24's
"no row dropped" governs over the finding's "drop"); J-V2.58 rewritten as its design choice (where item 110's building
parts live), not dropped. V02-NARR-8: the integration notes applied in place (§4, §3.15.3, §3.17, X20, X28), their
wrapper removed. V02-BREF-1: the receipts cited at `docs/validation/coherence/receipts/V02/` (re-executed 2026-09-29);
the scratchpad and backup paths removed. V02-AMBIG-1: F-COMPOSE's rung (2) takes the own-wing porch case, rung (4) its
identity composition intact (V02 §3.13). IN-V02-1 – -5: folded (§6 above).

## 9 Cross-part notes

* **rendering (§8.2, §8.10):** list V02 §5.3's style cells in the role-value table's home with their shipped values
  (`roofscape.ridgeWeight` ½, `roofscape.hipWeight` ⅓, `fm.hatchPitchPx` 0.9, `stairFlight.treadWeight` ⅓,
  `stairFlight.treadInsetShare` 0.1, `stairFlight.minTreadPx` 2) and §8.10's `stepStones.sizeM` [0.5, 0.8],
  `stepStones.pitchM` 1 (V02-WGAP-1).
* **scope (§14, §16):** `facadeBays`, `stairTreads` and `cryptSeedWings` land at M3a-V2 in `@plat/plots` (the base's
  §14 line already says so); V02's M6 is 18.25–27.5 pw, M3a-V2 2–2.75, spikes 2.25, the volume 22.5–32.5 (item 568's
  inputs); T-V2-52 runs from M2b (item 522).
* **V09:** §4.9's catalogue rows for the bend ids V02 now writes at their cases — `bend.tiers.form`, `bend.tiers.top`,
  `bend.tier.height`, `bend.deck.floors`, `bend.room.host` — beside the others of V02 §1b (V09-XAGREE-3); AP10 is
  priced in V09's staged lines with V02's M6c (XV-V9-8).
* **V10:** the clerk words the same five ids through V09's rows (X22); the registry paths `deck/landmarks/<head|mid>`
  and `massing/stack` are stated in V02 §4.6 (7) (CVR-V10-8).
* **V03:** X18 carries the storey-less stack's basement root at `basementDoor(b)`; X30 is closed at V03 §3.3, §3.6,
  §3.7.4, §5.1 — the V03 editor confirms the section numbers.
* **V12:** T-V2-55 – T-V2-58 are new bars (no register line needed: hard bars, not calibratable); the stage-3 panel is a
  `PanelSpec` under BCR-V12-1's `'FM'` reference (X-V12-2).
* **V06:** V02 §3.14.5 (e) states the epoch trim of `Basement.crypt.ring` and the lift's re-basing in the op (V06 X3);
  deck buildings at an epoch clamp by W5 (V06 X24).

## 10 CONFIRMED versus PLAUSIBLE

CONFIRMED (executed): the section word counts; the id census (J, T, X) and the own-section reference check over the
new file; the sweeps for retired terms (`lot`, `first paint`), the old citation forms (`V2 §`, `V1-n`) and narration
labels (`V2C-`, `SCC-`, `S23…`, "second revision", "reconciliation round", "item 110 fold") — none left; the milestone
arithmetic (M6a 8.25–11.75 + M6b 5.5–8.25 + M6c 4.5–7.5 = 18.25–27.5). PLAUSIBLE: that no fact was lost in §3's parts
written in the first sitting (checked by the mapping table per inventory id and spot checks of the canon's REFERENCE
list, not a second full reader); the section numbers named for V03's X30 closure.

## 11 The mapping table (every inventory id → where it now lives)

| inventory id | kind | now |
|---|---|---|
| V02-0001 | summary | V02 §0 |
| V02-0002 | summary | V02 §0 |
| V02-0003 | summary | V02 §0 |
| V02-0004 | summary | V02 §0 |
| V02-0005 | scope | V02 §1a |
| V02-0006 | scope | V02 §1a |
| V02-0007 | scope | V02 §1a |
| V02-0008 | wiring | V02 §1b |
| V02-0009 | wiring | V02 §1b |
| V02-0010 | wiring | V02 §1b |
| V02-0011 | wiring | V02 §1b |
| V02-0012 | wiring | V02 §1b |
| V02-0013 | wiring | V02 §1b |
| V02-0014 | wiring | V02 §1b |
| V02-0015 | wiring | V02 §1b |
| V02-0016 | wiring | V02 §1b |
| V02-0017 | wiring | V02 §1b |
| V02-0018 | wiring | V02 §1b |
| V02-0019 | wiring | V02 §1b |
| V02-0020 | wiring | V02 §1b |
| V02-0021 | wiring | V02 §1b |
| V02-0022 | wiring | V02 §1b |
| V02-0023 | wiring | V02 §1b |
| V02-0024 | wiring | V02 §1b |
| V02-0025 | wiring | V02 §1b |
| V02-0026 | wiring | V02 §1b |
| V02-0027 | wiring | V02 §1b |
| V02-0028 | wiring | V02 §1b |
| V02-0029 | wiring | V02 §1b |
| V02-0030 | wiring | V02 §1b |
| V02-0031 | wiring | V02 §1b |
| V02-0032 | wiring | V02 §1b |
| V02-0033 | wiring | V02 §1b |
| V02-0034 | wiring | V02 §1b |
| V02-0035 | wiring | V02 §1b |
| V02-0036 | wiring | V02 §1b |
| V02-0037 | wiring | V02 §1b |
| V02-0038 | wiring | V02 §1b |
| V02-0039 | wiring | V02 §1b |
| V02-0040 | wiring | V02 §1b |
| V02-0041 | wiring | V02 §1b |
| V02-0042 | wiring | V02 §1b |
| V02-0043 | wiring | V02 §1b |
| V02-0044 | wiring | V02 §1b |
| V02-0045 | wiring | V02 §1b |
| V02-0046 | wiring | V02 §1b |
| V02-0047 | wiring | V02 §1b |
| V02-0048 | wiring | V02 §1b |
| V02-0049 | wiring | V02 §1b |
| V02-0050 | wiring | V02 §1b |
| V02-0051 | wiring | V02 §1b |
| V02-0052 | wiring | V02 §1b |
| V02-0053 | wiring | V02 §1b |
| V02-0054 | wiring | V02 §1b |
| V02-0055 | wiring | V02 §1b |
| V02-0056 | wiring | V02 §1b |
| V02-0057 | wiring | V02 §1b |
| V02-0058 | wiring | V02 §1b |
| V02-0059 | wiring | V02 §1b |
| V02-0060 | wiring | V02 §1b |
| V02-0061 | wiring | V02 §1b |
| V02-0062 | wiring | V02 §1b |
| V02-0063 | wiring | V02 §1b |
| V02-0064 | wiring | V02 §1b |
| V02-0065 | wiring | V02 §1b |
| V02-0066 | wiring | V02 §1b |
| V02-0067 | wiring | V02 §1b |
| V02-0068 | wiring | V02 §1b |
| V02-0069 | wiring | V02 §1b |
| V02-0070 | wiring | V02 §1b |
| V02-0071 | wiring | V02 §1b |
| V02-0072 | wiring | V02 §1b |
| V02-0073 | wiring | V02 §1b |
| V02-0074 | wiring | V02 §1b |
| V02-0075 | wiring | V02 §1b |
| V02-0076 | wiring | V02 §1b |
| V02-0077 | dossier | V02 §1b |
| V02-0078 | dossier | V02 §1b |
| V02-0079 | dossier | V02 §1b |
| V02-0080 | dossier | V02 §1b |
| V02-0081 | hook | V02 §1c |
| V02-0082 | hook | V02 §1c |
| V02-0083 | hook | V02 §1c |
| V02-0084 | hook | V02 §1c |
| V02-0085 | hook | V02 §1c |
| V02-0086 | hook | V02 §1c |
| V02-0087 | scope-out | V02 §1d |
| V02-0088 | scope-out | V02 §1d |
| V02-0089 | scope-out | V02 §1d |
| V02-0090 | rule | reference to model §2.1 (cited at V02 §2) |
| V02-0091 | type | reference to model §2.6 (cited at V02 §2.1) |
| V02-0092 | type | reference to model §2.6 (cited at V02 §2.1) |
| V02-0093 | record | reference to model §2.6 (cited at V02 §2.1) |
| V02-0094 | record | reference to model §2.6 (cited at V02 §2.1) |
| V02-0095 | record | reference to model §2.6 (cited at V02 §2.1) |
| V02-0096 | rule | reference to V03 §2.5 (cited at V02 §2.1) |
| V02-0097 | record | reference to model §2.6 (cited at V02 §2.1) |
| V02-0098 | rule | V02 §2.1 |
| V02-0099 | rule | reference to model §2.6 (cited at V02 §2.1) |
| V02-0100 | record | reference to model §2.6 (cited at V02 §2.2) |
| V02-0101 | type | reference to model §2.6 (cited at V02 §2.2) |
| V02-0102 | record | reference to model §2.6 (cited at V02 §2.2) |
| V02-0103 | rule | V02 §2.2 |
| V02-0104 | rule | V02 §2.3 |
| V02-0105 | record | V02 §2.3 |
| V02-0106 | record | reference to model §2.6 (cited at V02 §2.3) |
| V02-0107 | record | V02 §2.3 |
| V02-0108 | record | V02 §2.3 |
| V02-0109 | interface | V02 §2.4 |
| V02-0110 | rule | V02 §2.4 |
| V02-0111 | lifecycle | V02 §2.5 |
| V02-0112 | lifecycle | V02 §2.5 |
| V02-0113 | lifecycle | V02 §2.5 |
| V02-0114 | lifecycle | V02 §2.5 |
| V02-0115 | lifecycle | V02 §2.5 |
| V02-0116 | lifecycle | V02 §2.5 |
| V02-0117 | rule | V02 §2.5 |
| V02-0118 | identity | V02 §2.5 |
| V02-0119 | rule | V02 §2.6 |
| V02-0120 | record | reference to model §2.6 (cited at V02 §2.6) |
| V02-0121 | record | reference to model §2.6 (cited at V02 §2.6) |
| V02-0122 | record | V02 §2.6 |
| V02-0123 | interface | V02 §2.6 |
| V02-0124 | type | V02 §2.6 |
| V02-0125 | record | reference to model §2.6 (cited at V02 §2.6) |
| V02-0126 | interface | V02 §2.6 |
| V02-0127 | interface | V02 §2.6 |
| V02-0128 | interface | V02 §2.6 |
| V02-0129 | lifecycle | V02 §2.6 |
| V02-0130 | lifecycle | V02 §2.6 |
| V02-0131 | table | V02 §2.6 |
| V02-0132 | table | V02 §3.1 |
| V02-0133 | rule | V02 §3.1 |
| V02-0134 | rule | V02 §3.2 |
| V02-0135 | rule | V02 §3.2 |
| V02-0136 | rule | V02 §3.2 |
| V02-0137 | rule | V02 §3.2 |
| V02-0138 | table | V02 §3.3 |
| V02-0139 | decision | V02 §3.3 |
| V02-0140 | rule | V02 §3.4 |
| V02-0141 | mechanism | V02 §3.5 |
| V02-0142 | mechanism | V02 §3.5 |
| V02-0143 | mechanism | V02 §3.5 |
| V02-0144 | mechanism | V02 §3.5 |
| V02-0145 | mechanism | V02 §3.5 |
| V02-0146 | mechanism | V02 §3.5 |
| V02-0147 | mechanism | V02 §3.5 |
| V02-0148 | mechanism | V02 §3.5 |
| V02-0149 | mechanism | V02 §3.5 |
| V02-0150 | mechanism | V02 §3.5 |
| V02-0151 | mechanism | V02 §3.5 |
| V02-0152 | mechanism | V02 §3.5 |
| V02-0153 | mechanism | V02 §3.5 |
| V02-0154 | mechanism | V02 §3.5 |
| V02-0155 | mechanism | V02 §3.5 |
| V02-0156 | mechanism | V02 §3.5 |
| V02-0157 | mechanism | V02 §3.5 |
| V02-0158 | mechanism | V02 §3.5 |
| V02-0159 | mechanism | V02 §3.5 |
| V02-0160 | mechanism | V02 §3.5 |
| V02-0161 | mechanism | V02 §3.5 |
| V02-0162 | mechanism | V02 §3.5 |
| V02-0163 | mechanism | V02 §3.5 |
| V02-0164 | fallback | V02 §3.5 |
| V02-0165 | mechanism | V02 §3.5 |
| V02-0166 | mechanism | V02 §3.5 |
| V02-0167 | mechanism | V02 §3.5 |
| V02-0168 | mechanism | V02 §3.5 |
| V02-0169 | fallback | reference to determinism §5.2 (cited at V02 §3.5) |
| V02-0170 | mechanism | V02 §3.6 |
| V02-0171 | mechanism | reference to model §2.6 (cited at V02 §3.7) |
| V02-0172 | rule | V02 §3.7 |
| V02-0173 | mechanism | V02 §3.7 |
| V02-0174 | rule | V02 §3.7 |
| V02-0175 | mechanism | V02 §3.7 |
| V02-0176 | mechanism | V02 §3.7 |
| V02-0177 | rule | V02 §3.8 |
| V02-0178 | mechanism | V02 §3.8 |
| V02-0179 | mechanism | V02 §3.8 |
| V02-0180 | rule | V02 §3.8 |
| V02-0181 | mechanism | V02 §3.9 |
| V02-0182 | mechanism | V02 §3.9 |
| V02-0183 | table | V02 §3.9 |
| V02-0184 | table | V02 §3.9 |
| V02-0185 | mechanism | V02 §3.9 |
| V02-0186 | mechanism | V02 §3.9 |
| V02-0187 | mechanism | V02 §3.9 |
| V02-0188 | rule | V02 §3.9 |
| V02-0189 | rule | V02 §3.10 |
| V02-0190 | rule | V02 §3.10.1 |
| V02-0191 | table | V02 §3.10.2 |
| V02-0192 | table | V02 §3.10.3 |
| V02-0193 | table | V02 §3.10.3 |
| V02-0194 | table | V02 §3.10.3 |
| V02-0195 | table | V02 §3.10.4 |
| V02-0196 | table | V02 §3.10.4 |
| V02-0197 | table | reference to V07 §2.4 (cited at V02 §3.10.5) |
| V02-0198 | table | V02 §3.10.6 |
| V02-0199 | rule | reference to V11 §2.8 (cited at V02 §3.10.6) |
| V02-0200 | rule | V02 §3.10.7 |
| V02-0201 | rule | reference to determinism §7.6 (cited at V02 §3.10.8) |
| V02-0202 | constant | V02 §3.10.9 |
| V02-0203 | table | V02 §3.10.9 |
| V02-0204 | table | V02 §3.10.9 |
| V02-0205 | table | V02 §3.10.9 |
| V02-0206 | constant | V02 §3.10.9 |
| V02-0207 | rule | reference to V12 §3.11 (cited at V02 §3.10.10) |
| V02-0208 | table | V02 §3.10.10 |
| V02-0209 | table | V02 §3.10.10 |
| V02-0210 | rule | V02 §3.11 |
| V02-0211 | rule | reference to model §2.8 (cited at V02 §3.11) |
| V02-0212 | rule | V02 §3.11 |
| V02-0213 | rule | reference to determinism §6.1 (cited at V02 §3.12) |
| V02-0214 | rule | V02 §3.12 |
| V02-0215 | rule | reference to determinism §6.5 (cited at V02 §3.12) |
| V02-0216 | fallback | reference to determinism §5.2 (cited at V02 §3.13) |
| V02-0217 | rule | V02 §3.14 |
| V02-0218 | rule | V02 §3.14.1 |
| V02-0219 | rule | V02 §3.14.2 |
| V02-0220 | rule | V02 §3.14.3 |
| V02-0221 | rule | V02 §3.14.4 |
| V02-0222 | rule | V02 §3.14.5 |
| V02-0223 | interface | V02 §3.14.5 |
| V02-0224 | rule | V02 §3.14.5 |
| V02-0225 | rule | V02 §3.14.6 |
| V02-0226 | rule | V02 §3.15 |
| V02-0227 | step | V02 §3.15.1 |
| V02-0228 | mechanism | V02 §3.15.1 |
| V02-0229 | mechanism | V02 §3.15.1 |
| V02-0230 | mechanism | V02 §3.15.1 |
| V02-0231 | mechanism | V02 §3.15.1 |
| V02-0232 | mechanism | V02 §3.15.1 |
| V02-0233 | mechanism | V02 §3.15.1 |
| V02-0234 | mechanism | V02 §3.15.1 |
| V02-0235 | mechanism | V02 §3.15.1 |
| V02-0236 | mechanism | V02 §3.15.1 |
| V02-0237 | mechanism | reference to model §2.6 (cited at V02 §3.15.2) |
| V02-0238 | rule | V02 §3.15.3 |
| V02-0239 | rule | V02 §3.15.3 |
| V02-0240 | table | V02 §3.15.4 |
| V02-0241 | rule | V02 §3.15.4 |
| V02-0242 | rule | V02 §3.15.5 |
| V02-0243 | rule | reference to V04 §IN (cited at V02 §3.15.6) |
| V02-0244 | rule | V02 §3.16 |
| V02-0245 | rule | V02 §3.16 |
| V02-0246 | rule | V02 §3.16 |
| V02-0247 | table | V02 §3.16 |
| V02-0248 | rule | V02 §3.17 |
| V02-0249 | rule | V02 §3.17 |
| V02-0250 | rule | reference to V12 §3.14.1 (cited at V02 §3.17) |
| V02-0251 | interface | reference to determinism §7.1 (cited at V02 §4.1) |
| V02-0252 | rule | V02 §4.1 |
| V02-0253 | rule | V02 §4.2 |
| V02-0254 | rule | V02 §4.2 |
| V02-0255 | rule | V02 §4.2 |
| V02-0256 | rule | V02 §4.2 |
| V02-0257 | rule | V02 §4.3 |
| V02-0258 | lifecycle | reference to determinism §7.4 (cited at V02 §4.4) |
| V02-0259 | rule | reference to determinism §7.3 (cited at V02 §4.4) |
| V02-0260 | interface | reference to V09 §11.1 (cited at V02 §4.5) |
| V02-0261 | interface | reference to V10 §3.9 (cited at V02 §4.5) |
| V02-0262 | interface | reference to determinism §7.1 (cited at V02 §4.6) |
| V02-0263 | rule | V02 §4.6 |
| V02-0264 | rule | V02 §4.6 |
| V02-0265 | rule | V02 §4.6 |
| V02-0266 | rule | V02 §4.6 |
| V02-0267 | rule | V02 §4.6 |
| V02-0268 | rule | V02 §4.6 |
| V02-0269 | interface | reference to V09 §4.20.6 (cited at V02 §4.6) |
| V02-0270 | table | reference to rendering §8.5 (cited at V02 §5.1) |
| V02-0271 | mechanism | reference to rendering §8.6 (cited at V02 §5.2) |
| V02-0272 | mechanism | V02 §5.2 |
| V02-0273 | mechanism | V02 §5.2 |
| V02-0274 | rule | V02 §5.2 |
| V02-0275 | rule | reference to rendering §8.2 (cited at V02 §5.3) |
| V02-0276 | rule | reference to rendering §8.10 (cited at V02 §5.3) |
| V02-0277 | rule | V02 §5.4 |
| V02-0278 | table | reference to rendering §11.1 (cited at V02 §5.5) |
| V02-0279 | rule | V02 §5.6 |
| V02-0280 | table | reference to rendering §11.1 (cited at V02 §5.6) |
| V02-0281 | budget | reference to scope §1.1 (cited at V02 §6) |
| V02-0282 | budget | V02 §6.1 |
| V02-0283 | budget | V02 §6.2 |
| V02-0284 | budget | V02 §6.3 |
| V02-0285 | budget | V02 §6.4 |
| V02-0286 | budget | V02 §6.5 |
| V02-0287 | rule | reference to scope §13 (cited at V02 §7) |
| V02-0288 | test | V02 §7.1 |
| V02-0289 | test | V02 §7.2 |
| V02-0290 | test | V02 §7.2 |
| V02-0291 | test | V02 §7.2 |
| V02-0292 | test | V02 §7.2 |
| V02-0293 | test | V02 §7.2 |
| V02-0294 | test | V02 §7.2 |
| V02-0295 | test | V02 §7.2 |
| V02-0296 | test | V02 §7.2 |
| V02-0297 | test | V02 §7.2 |
| V02-0298 | test | V02 §7.2 |
| V02-0299 | test | V02 §7.3 |
| V02-0300 | test | V02 §7.4 |
| V02-0301 | test | V02 §7.4 |
| V02-0302 | test | reference to scope §13.6 (cited at V02 §7.5) |
| V02-0303 | test | V02 §7.6 |
| V02-0304 | test | V02 §7.7 |
| V02-0305 | test | V02 §7.7 |
| V02-0306 | test | V02 §7.7 |
| V02-0307 | test | V02 §7.7 |
| V02-0308 | test | V02 §7.7 |
| V02-0309 | test | V02 §7.7 |
| V02-0310 | test | V02 §7.7 |
| V02-0311 | test | V02 §7.7 |
| V02-0312 | plan | V02 §8.1 |
| V02-0313 | plan | V02 §8.2 |
| V02-0314 | plan | V02 §8.3 |
| V02-0315 | plan | V02 §8.3 |
| V02-0316 | plan | V02 §8.3 |
| V02-0317 | plan | V02 §8.4 |
| V02-0318 | plan | V02 §8.5 |
| V02-0319 | plan | V02 §8.5 |
| V02-0320 | decision | V02 §9 J-V2.1 |
| V02-0321 | decision | V02 §9 J-V2.2 |
| V02-0322 | decision | V02 §9 J-V2.3 |
| V02-0323 | decision | V02 §9 J-V2.4 |
| V02-0324 | decision | V02 §9 J-V2.5 |
| V02-0325 | decision | V02 §9 J-V2.6 |
| V02-0326 | decision | V02 §9 J-V2.7 |
| V02-0327 | decision | V02 §9 J-V2.8 |
| V02-0328 | decision | V02 §9 J-V2.9 |
| V02-0329 | decision | V02 §9 J-V2.10 |
| V02-0330 | decision | V02 §9 J-V2.11 |
| V02-0331 | decision | V02 §9 J-V2.12 |
| V02-0332 | decision | V02 §9 J-V2.13 |
| V02-0333 | decision | V02 §9 J-V2.14 |
| V02-0334 | decision | V02 §9 J-V2.15 |
| V02-0335 | decision | V02 §9 J-V2.16 |
| V02-0336 | decision | V02 §9 J-V2.17 |
| V02-0337 | decision | V02 §9 J-V2.18 |
| V02-0338 | decision | V02 §9 J-V2.19 |
| V02-0339 | decision | V02 §9 J-V2.20 |
| V02-0340 | decision | V02 §9 J-V2.21 |
| V02-0341 | decision | V02 §9 J-V2.22 |
| V02-0342 | decision | V02 §9 J-V2.23 |
| V02-0343 | decision | V02 §9 J-V2.24 |
| V02-0344 | decision | V02 §9 J-V2.25 |
| V02-0345 | decision | V02 §9 J-V2.26 |
| V02-0346 | decision | V02 §9 J-V2.27 |
| V02-0347 | decision | V02 §9 J-V2.28 |
| V02-0348 | decision | V02 §9 J-V2.29 |
| V02-0349 | decision | V02 §9 J-V2.30 |
| V02-0350 | decision | V02 §9 J-V2.31 |
| V02-0351 | decision | V02 §9 J-V2.32 |
| V02-0352 | decision | V02 §9 J-V2.33 |
| V02-0353 | decision | V02 §9 J-V2.34 |
| V02-0354 | decision | V02 §9 J-V2.35 |
| V02-0355 | decision | V02 §9 J-V2.36 |
| V02-0356 | decision | V02 §9 J-V2.37 |
| V02-0357 | decision | V02 §9 J-V2.38 |
| V02-0358 | decision | V02 §9 J-V2.39 |
| V02-0359 | decision | V02 §9 J-V2.40 |
| V02-0360 | decision | V02 §9 J-V2.41 |
| V02-0361 | decision | V02 §9 J-V2.42 |
| V02-0362 | decision | V02 §9 J-V2.43 |
| V02-0363 | decision | V02 §9 J-V2.44 |
| V02-0364 | decision | V02 §9 J-V2.45 |
| V02-0365 | decision | V02 §9 J-V2.46 |
| V02-0366 | decision | V02 §9 J-V2.47 |
| V02-0367 | decision | V02 §9 J-V2.48 |
| V02-0368 | decision | V02 §9 J-V2.49 |
| V02-0369 | decision | V02 §9 J-V2.50 |
| V02-0370 | decision | V02 §9 J-V2.51 |
| V02-0371 | decision | V02 §9 J-V2.52 |
| V02-0372 | decision | V02 §9 J-V2.53 |
| V02-0373 | decision | V02 §9 J-V2.54 |
| V02-0374 | decision | V02 §9 J-V2.55 |
| V02-0375 | decision | V02 §9 J-V2.56 |
| V02-0376 | decision | V02 §9 J-V2.57 |
| V02-0377 | decision | V02 §9 J-V2.58 |
| V02-0378 | decision | V02 §9 J-V2.59 |
| V02-0379 | decision | V02 §9 J-V2.60 |
| V02-0380 | decision | V02 §9 J-V2.61 |
| V02-0381 | decision | V02 §9 J-V2.62 |
| V02-0382 | decision | V02 §9 J-V2.63 |
| V02-0383 | decision | V02 §9 J-V2.64 |
| V02-0384 | decision | V02 §9 J-V2.65 |
| V02-0385 | decision | V02 §9 J-V2.66 |
| V02-0386 | decision | V02 §9 J-V2.67 |
| V02-0387 | decision | V02 §9 J-V2.68 |
| V02-0388 | decision | V02 §9 J-V2.69 |
| V02-0389 | decision | V02 §9 J-V2.70 |
| V02-0390 | decision | V02 §9 J-V2.71 |
| V02-0391 | decision | V02 §9 J-V2.72 |
| V02-0392 | decision | V02 §9 J-V2.73 |
| V02-0393 | decision | V02 §9 J-V2.74 |
| V02-0394 | decision | V02 §9 J-V2.75 |
| V02-0395 | decision | V02 §9 J-V2.76 |
| V02-0396 | decision | V02 §9 J-V2.77 |
| V02-0397 | decision | V02 §9 J-V2.78 |
| V02-0398 | decision | V02 §9 J-V2.79 |
| V02-0399 | decision | V02 §9 J-V2.80 |
| V02-0400 | decision | V02 §9 J-V2.81 |
| V02-0401 | decision | V02 §9 J-V2.82 |
| V02-0402 | decision | V02 §9 J-V2.83 |
| V02-0403 | decision | V02 §9 J-V2.84 |
| V02-0404 | decision | V02 §9 J-V2.85 |
| V02-0405 | decision | V02 §9 J-V2.86 |
| V02-0406 | decision | V02 §9 J-V2.87 |
| V02-0407 | decision | V02 §9 J-V2.88 |
| V02-0408 | decision | V02 §9 J-V2.89 |
| V02-0409 | decision | V02 §9 J-V2.90 |
| V02-0410 | decision | V02 §9 J-V2.91 |
| V02-0411 | decision | V02 §9 J-V2.92 |
| V02-0412 | decision | V02 §9 J-V2.93 |
| V02-0413 | decision | V02 §9 J-V2.94 |
| V02-0414 | decision | V02 §9 J-V2.95 |
| V02-0415 | decision | V02 §9 J-V2.96 |
| V02-0416 | decision | V02 §9 J-V2.97 |
| V02-0417 | decision | V02 §9 J-V2.98 |
| V02-0418 | decision | V02 §9 J-V2.99 |
| V02-0419 | decision | V02 §9 J-V2.100 |
| V02-0420 | decision | V02 §9 J-V2.101 |
| V02-0421 | decision | V02 §9 J-V2.102 |
| V02-0422 | decision | V02 §9 J-V2.103 |
| V02-0423 | decision | V02 §9 J-V2.104 |
| V02-0424 | decision | V02 §9 J-V2.105 |
| V02-0425 | decision | V02 §9 J-V2.106 |
| V02-0426 | decision | V02 §9 J-V2.107 |
| V02-0427 | decision | V02 §9 J-V2.108 |
| V02-0428 | rule | V02 §10 row BCR-V2-01 → file f item 216 (base text) |
| V02-0429 | bcr | V02 §10 row BCR-V2-01 → file f item 216 (base text) |
| V02-0430 | bcr | V02 §10 row BCR-V2-02 → file f item 217 (base text) |
| V02-0431 | bcr | V02 §10 row BCR-V2-03 → file f item 218 (base text) |
| V02-0432 | bcr | V02 §10 row BCR-V2-04 → file f item 219 (base text) |
| V02-0433 | bcr | V02 §10 row BCR-V2-05 → file f item 220 (base text) |
| V02-0434 | bcr | V02 §10 row BCR-V2-06 → file f item 221 (base text) |
| V02-0435 | bcr | V02 §10 row BCR-V2-07 → file f item 222 (base text) |
| V02-0436 | bcr | V02 §10 row BCR-V2-08 → file f item 385 (base text) |
| V02-0437 | bcr | V02 §10 row BCR-V2-09 → file f item 426 (base text) |
| V02-0438 | bcr | V02 §10 row BCR-V2-10 → file f item 341 (base text) |
| V02-0439 | bcr | V02 §10 row BCR-V2-11 → file f item 346 (base text) |
| V02-0440 | bcr | V02 §10 row BCR-V2-12 → file f item 351 (base text) |
| V02-0441 | bcr | V02 §10 row BCR-V2-13 → file f item 261 (base text) |
| V02-0442 | bcr | V02 §10 row BCR-V2-14 → file f item 376, 377 (base text) |
| V02-0443 | bcr | V02 §10 row BCR-V2-15 → file f item 406 (base text) |
| V02-0444 | bcr | V02 §10 row BCR-V2-16 → file f item 328 (base text) |
| V02-0445 | bcr | V02 §10 row BCR-V2-17 → file f item 332 (base text) |
| V02-0446 | bcr | V02 §10 row BCR-V2-18 → file f item 505 (base text) |
| V02-0447 | bcr | V02 §10 row BCR-V2-19 → file f item 522 (base text) |
| V02-0448 | bcr | V02 §10 row BCR-V2-20 → file f item 524, 568 (base text) |
| V02-0449 | bcr | V02 §10 row BCR-V2-21 → file f item 449 (base text) |
| V02-0450 | bcr | V02 §10 row BCR-V2-22 → file f item 223 (base text) |
| V02-0451 | bcr | V02 §10 row BCR-V2-23 → file f item 224 (base text) |
| V02-0452 | bcr | V02 §10 row BCR-V2-24 → file f item 303 (base text) |
| V02-0453 | bcr | V02 §10 row BCR-V2-25 → file f item 499 (base text) |
| V02-0454 | bcr | V02 §10 row BCR-V2-26 → file f item 427 (base text) |
| V02-0455 | bcr | V02 §10 row BCR-V2-27 → file f item 225 (base text) |
| V02-0456 | bcr | V02 §10 row BCR-V2-28 → file f item 226 (base text) |
| V02-0457 | bcr | V02 §10 row BCR-V2-28 → file f item 226 (its extension (a)–(c)) (base text) |
| V02-0458 | bcr | V02 §10 row BCR-V2-29 → file f item 304 (base text) |
| V02-0459 | bcr | V02 §10 row BCR-V2-30 → file f item 402 (base text) |
| V02-0460 | bcr | V02 §10 row BCR-V2-31 → file f item 227 (base text) |
| V02-0461 | bcr | V02 §10 row BCR-V2-32 → file f item 370 (base text) |
| V02-0462 | bcr | V02 §10 row BCR-V2-33 → file f item 371 (base text) |
| V02-0463 | bcr | V02 §10 row BCR-V2-33 → file f item 371 (its extension (a)–(d)) (base text) |
| V02-0464 | bcr | V02 §10 row BCR-V2-34 → file f item 305 (base text) |
| V02-0465 | bcr | V02 §10 row BCR-V2-35 → file f item 333 (base text) |
| V02-0466 | bcr | V02 §10 row BCR-V2-36 → file f item 419 (base text) |
| V02-0467 | bcr | V02 §10 row BCR-V2-37 → file f item 525, 568 (base text) |
| V02-0468 | bcr | V02 §10 row BCR-V2-38 → file f item 228 (base text) |
| V02-0469 | bcr | V02 §10 row BCR-V2-39 → file f item 229 (base text) |
| V02-0470 | bcr | V02 §10 row BCR-V2-40 → file f item 318 (base text) |
| V02-0471 | bcr | V02 §10 row BCR-V2-41 → file f item 230 (base text) |
| V02-0472 | bcr | V02 §10 row BCR-V2-42 → file f item 231 (base text) |
| V02-0473 | decision | V02 §11 Q-V2-1 (answered: not now, J122; J121) |
| V02-0474 | evidence | V02 §12 (its facts in the one current list); the per-revision log to the validation records (HISTORY OUT) |
| V02-0475 | evidence | V02 §12 (its facts in the one current list); the per-revision log to the validation records (HISTORY OUT) |
| V02-0476 | evidence | V02 §12 (its facts in the one current list); the per-revision log to the validation records (HISTORY OUT) |
| V02-0477 | evidence | V02 §12 (its facts in the one current list); the per-revision log to the validation records (HISTORY OUT) |
| V02-0478 | evidence | V02 §12 (its facts in the one current list); the per-revision log to the validation records (HISTORY OUT) |
| V02-0479 | evidence | V02 §12 (its facts in the one current list); the per-revision log to the validation records (HISTORY OUT) |
| V02-0480 | plan | V02 §13 (the Fix list closed; the per-round narration to the validation records) |
| V02-0481 | handoff | V02 §13 X1 |
| V02-0482 | handoff | V02 §13 X2 |
| V02-0483 | handoff | V02 §13 X3 |
| V02-0484 | handoff | V02 §13 X4 |
| V02-0485 | handoff | V02 §13 X5 |
| V02-0486 | handoff | V02 §13 X6 |
| V02-0487 | handoff | V02 §13 X7 |
| V02-0488 | handoff | V02 §13 X8 |
| V02-0489 | handoff | V02 §13 X9 |
| V02-0490 | handoff | V02 §13 X10 |
| V02-0491 | handoff | V02 §13 X11 |
| V02-0492 | handoff | V02 §13 X12 |
| V02-0493 | handoff | V02 §13 X13 |
| V02-0494 | handoff | V02 §13 X14 |
| V02-0495 | handoff | V02 §13 X15 |
| V02-0496 | handoff | V02 §13 X16 |
| V02-0497 | handoff | V02 §13 X17 |
| V02-0498 | handoff | V02 §13 X18 |
| V02-0499 | handoff | V02 §13 X19 |
| V02-0500 | handoff | V02 §13 X20 |
| V02-0501 | handoff | V02 §13 X21 |
| V02-0502 | handoff | V02 §13 X22 |
| V02-0503 | handoff | V02 §13 X23 |
| V02-0504 | handoff | V02 §13 X24 |
| V02-0505 | handoff | V02 §13 X25 |
| V02-0506 | handoff | V02 §13 X26 |
| V02-0507 | handoff | V02 §13 X27 |
| V02-0508 | handoff | V02 §13 X28 |
| V02-0509 | handoff | V02 §13 X29 |
| V02-0510 | handoff | V02 §13 X30 |
| V02-0511 | handoff | V02 §13 X31 |
| V02-0512 | handoff | V02 §13 X32 |
| V02-0513 | handoff | V02 §13 X33 |
| V02-0514 | rule | V02 §3.15.3, §3.17 (a), §4.2 step 2, §4.3, §4.6 (6); item 371 |
| V02-0515 | interface | V02 §4.6 (7) (the registry paths) |
| V02-0516 | rule | V02 §4.6 opening rule (J-VI.4, J-VI.5) |
| V02-0517 | record | narration to the validation records; its rules live in V02 §3–§9 (J-V2.88 – J-V2.107) |
| V02-0518 | record | V02 §9 J-V2.108; V02 §3.14.5 (c)–(d), §3.15.3; T-V2-36 |
| V02-0519 | term | V02 §2.1 |
| V02-0520 | term | V02 §2.2 |
| V02-0521 | term | V02 §2.1 |
| V02-0522 | term | V02 §2.1 |
| V02-0523 | term | V02 §2.1 |
| V02-0524 | term | V02 §2.1 |
| V02-0525 | term | V02 §3.3 |
| V02-0526 | term | V02 §3.2 |
| V02-0527 | term | V02 §3.15 |
| V02-0528 | term | V02 §3.7 |
| V02-0529 | term | V02 §5.2 |
| V02-0530 | term | V02 §2.6 |
| V02-0531 | term | V02 §2.6 |
| V02-0532 | term | V02 §2.6 |
| V02-0533 | term | V02 §1b |
| V02-0534 | term | V02 §2.6 |
| V02-0535 | term | V02 §3.14.5 |
| V02-0536 | term | V02 §3.16 |
| V02-0537 | term | V02 §1b |
| V02-0538 | term | V02 §4.4 |
| V02-0539 | term | V02 §3.13 |
| V02-0540 | term | V02 §7 |
| V02-0541 | term | V02 §3.11 |
