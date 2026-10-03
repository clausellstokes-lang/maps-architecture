# Verify — the determinism part of the base after the coherence rewrite (round 0)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/verify-determinism-r0; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-determinism-r0`, cloud continuation 2026-10-03)
- P1 §5–§7 extracted from the live base and the archive; live = `new/base/determinism/01–03` (blank lines aside); mechanical checks (references, ids, retired terms, deferral, narration): done
- P2 the inventory check (628 ids) against the mapping table and the live text: done
- P3 canon routes (f and g items, conflicts, wiring, elegance with equivalence lists, id rulings, open findings, edges, combinations): done
- P4 section reads of every changed hunk; cross-part notes addressed to determinism; the assembler's unplaced list; the siblings' determinism-owned issues: done
- P5 issues, results file, LANDED: done

## Inputs

* The live base `docs/ARCHITECTURE.md` (sha256 `70ce49bfa1c64a8a…`, as assembled by `coherence/assemble-r0`): §5 l. 8234,
  §6 l. 8547, §7 l. 9336, §8 l. 11351. Its §5–§7 equal `docs/validation/coherence/new/base/determinism/01-s5-…`,
  `02-s6-…` and `03-s7-…` line for line, blank lines aside (0 differing lines).
* The archive `docs/archive/ARCHITECTURE-pre-coherence-2026-09-28.md` (`87588d349c3da255…`), §5–§7 at l. 6794–9514.
* `docs/validation/coherence/inventory-determinism.json` (628 ids), `canon.json` (the determinism unit's routes:
  28 conflicts, 97 f items, 10 g parts, 11 wiring gaps, 10 elegance rulings, 4 id rulings, 87 open findings, 33 undefined
  and 4 untested edges, 39 combinations), `edges.json`, `rewrite-determinism.md` (its mapping table, rulings, sizes and
  notes), the other sixteen rewrite reports (their cross-part notes), `assemble-r0.md` (refcheck and unplaced list),
  `docs/AMENDMENTS-2026-09-28f.md`, `docs/AMENDMENTS-2026-09-28g.md` (items 102–114) and the landed sibling verifiers'
  results (21 issues they own to determinism).
* Scratch: `scratchpad/coherence/vd0/` — the split sections, per-subsection word diffs (`diff/`), the deleted-span coverage
  check over the whole set (`lostcheck.py`, `lost.json`), the inventory token check (`invcheck.txt`), the f-item token check
  (`fcheck.txt`), the cross-part note checklist (`xnotes-checklist.md`), the findings (`findings.jsonl`).

## Method

1. **Mechanical.** The assembler's `refcheck.py`, re-run over the live files: 0 broken pointers in l. 8234–11350 (the
   41 broken across the set are other units'). The canon's 35 retired-term patterns over §5–§7: 1 hit (VD0-26; a second
   match, l. 8568, is the substring "lone neighbourhood document" inside the right term). Deferral sweep: 0 (every
   "later" is temporal; "not yet built" names a staged layer's state). Narration sweep: 0 round or amendment narration;
   18 coherence-canon ids left in normative text (VD0-05). Id rulings: ID-TOOL — one bare bar group (VD0-27); ID-ITEM,
   ID-LAYER — no violation found; ID-DR — DR1–DR40 each one row, the working names only in `_integrate.md`, and every
   volume citation of DR36–DR40 matches its row's meaning (V04, V06, V07, V08, V09, V10, V11 read).
2. **Every changed hunk read.** Per-subsection word diffs of archive and live (deleted words: §5.1 118, §5.2 1 492, §5.3
   958, §5.4 97, §6.1 1 528, §6.2 225, §6.3 38, §6.4 2, §6.5 41, §7.1 1 209, §7.2 91, §7.3 160, §7.4 1 157, §7.5 379,
   §7.6 420, §7.7 441, §7.8 23). Every deleted span was checked against the whole live set by 3-gram coverage and by its
   backticked and numeric tokens (386 spans; 320 below full coverage read by hand); each span that moved to a pointer was
   followed to the pointer's target and the target read. §5, §6.1, §6.2, §7.1, §7.2, §7.4, §7.5, §7.6 and §7.8 were read
   whole in the live text; §6.3–§6.5, §7.3 and §7.7 at every changed hunk (their unchanged text is the archive's).
3. **The inventory.** All 628 ids are in the rewrite's mapping table (0 unmapped). Each id's backticked names, codes, ids
   and values were looked up in its mapped subsection, the unit and the set: 6 ids carry a value absent from the unit, each
   present at its cited home (`crossing.searchBandM` 120 m in V11 §3.1; the hydrology grid's 15.9–17.2 ms in §12.4; the
   2 MB pack cap in §2.9; `jitter.maxM` 4.8 m in §4.7 and `cut.flattenM` 8 m in §4.6). The losses found are those the
   prose-level read caught (VD0-01, VD0-06, VD0-07, VD0-08, VD0-09).
4. **Canon routes.** Each conflict ruling (28), f item (97, by its section and tokens), g part (102–106, 108–111, 113,
   and 114 as filed after the sweep began), wiring gap (11), elegance ruling (10, each equivalence item against the
   archive), open finding (87) and edge (37 + 39 combinations) was checked in the live text; results below.
5. **Cross-part notes.** Every note addressed to determinism in the sixteen other rewrite reports and the assembler's
   unplaced list (38 notes; checklist in scratch) was checked against the live text.

## Size (principle (9))

The unit grew: 63 117 → 74 098 words (+17.4 %), against the band's 37 870–47 338. Not a defect: the rewrite report lists
the irreducible content (≈ 12 800 words of ruled additions — f items 327–404, the g items, E-04's binding, E-07's outcome
table, the edge and combination tables, DR26–DR40 — against ≈ 1 850 removed). No subsection shrank by more than half
(the largest cut, §6.1 by E-06, kept every concern, cap and keying — checked), so no unit-wide nuance audit was owed; the
restatement cuts were nonetheless followed to their targets, which is where the blockers below were found.

## Findings (31: 7 blockers, 14 majors, 10 minors — all owned by determinism)

Each finding's exact claim and required change is in `results/coherence_verify-determinism-r0.json`; the summary:

**Blockers**
* **VD0-01 NUANCE-LOST — F-CUT's kernel-call bar.** The archive's "on 10⁵ random concave and holed faces the ladder ends in
  ≤ 6 kernel calls" became "§4.6 step 8 (a)'s bars (the kernel-call bound; …)"; §4.6 and T39-1 state no kernel-call bound,
  so the number is stated nowhere. Restore it in §5.2's test cell.
* **VD0-06 NUANCE-LOST — the harbour-work topology.** §5.3's crossing row lost "a way of class `pier` or `quay` whose
  connected set … meets land in at most one L0 land face"; it now cites "§4.8's definition", and §4.8 lists kinds and
  points back to §5.3 — circular, the bound lost, a quay with water on both sides no longer covered.
* **VD0-07 NUANCE-LOST — the stamp-tile library's key.** §6.1's `render.stampTiles` row now says "as §8.10 states", and
  §8.10 says "§6.1's registry entry": the constant key's words (domain, class index, 400 cm, creation index 0–3 / 4)
  are stated nowhere.
* **VD0-08 NUANCE-LOST — the per-level plat digest.** §6.2 now cites "§3.3's per-level digests"; §3.3 only names them and
  §2.2 rule 3 points back to §6.2: what a level digest covers (vertices, roles, face owners, kinds of level ≤ n, never
  slots), L3 never moving L2, and the kerb's L2 digest restored exactly are lost.
* **VD0-09 NUANCE-LOST — two F-EDIT causes not given rows by E-07.** "An assignment cannot be honoured within its drift
  bounds" (replaced by a different case) and "a plan edit leaving a room unreachable" (dropped from the plan row) have no
  outcome in §7.1's table, against E-07's "each case's offered alternative stays its own row".
* **VD0-18 NUANCE-LOST — the flat-ground rule's extent** (= DET-FLAT-1): "clipped to the drawn run's extent" lost when
  V09's rule moved into §7.1.
* **VD0-19 CONFLICT — the dwelling closure's trigger** (= AL-02, V04 note 2, assemble unplaced 1 (d)): `unexcavated` only,
  not `or lost`.

**Majors**
* **VD0-02 WIRING** (= VS0-14; kernel note 18; scope note; assemble unplaced 1 (a)): `Invariant` used by `KernelTx.expect`
  and `StageDecl.invariants`, declared nowhere; §5.3 to declare it.
* **VD0-03 CONFLICT** (= AL-15; V04 note 1; assemble unplaced 1 (c)): §5.4's warnings comment names 7 of V04 §1b.1's 12
  codes.
* **VD0-04 WIRING — `ReportCode` incomplete.** `unreachable` (F-SKY-ACCESS), `raised_too_tall` (§2.7's support step, §4.13,
  V06, V11) and `aqueduct_terminal_pin` (V11) are codes ladders write that the closed union lacks; the raised-way generator
  has a ladder but no §5.2 class for `ladderUses.cause`.
* **VD0-10 WIRING — the landfall undo.** V05 §3.16 (8) says `fallIsland`'s undo restores covered ways, enceintes, retaining
  walls and re-landed accesses "from the event's undo record (§7.4's convert row)"; the row names only the arena and the
  ruin face (V05's note unclosed).
* **VD0-11 WIRING — §7.5's migration rows.** Model §2.4 cites §7.5 for a missing `slopeP95` written on load; §7.5 has no row
  for it, the dropped `flowToward`, `nextGroundPart`, the oasis's absent `spring` / `fedBy` or a block's `content` (the
  model's note unclosed).
* **VD0-12 CONFLICT — the site is creation's.** V08 §3.5 answers a later site change with "no map event: the site is
  creation's (§7.7 One path; DR1 …)"; §7.7 states no such rule and DR1's bar reads as standing.
* **VD0-15 CONFLICT — the history replay's record.** §7.7 puts it "in V06's history record, which the report's `epochs`
  list reads"; model §2.7 declares `HistoryRecord` as base model data in the digest; §6.2's root list omits it.
* **VD0-17 F-MISSING — g item 114** (= DET-G114, with every site and an exact change): §7.1's *Delete*, the T10 rows, the
  sky-island row, §7.4's delete / removeIsland / edge-boundary rows, §7.7's generated-content sentence and §5.3's sky row
  still state the withdrawn suppression; §7.6 and §7.8 carry no *Built by the town* switches.
* **VD0-20 WIRING** (= AF-16, AL-25; model and V11 notes): `TableId` declared nowhere; §7.6 to declare it.
* **VD0-23 EDGE-UNDEFINED** (= VAT-06, VAT-09): no outcome rows for an `adjust` of a rung-disabled parameter and for a
  table or sheet failing its loader check (§8.2 and §9.2 cite a §7.1 `invalid` that does not exist).
* **VD0-24 EDGE-UNDEFINED** (= VAT-14): `drawWater { kind: 'sea', line }` has no meaning in §7.1.
* **VD0-25 EDGE-UNDEFINED** (= EL-02): the epoch component and the town salt have no bound and no outcome at their cap.
* **VD0-28 WIRING — the deity's derivation row.** V08 §2.4 and §10's religion paragraph read `religion.deityKey` /
  `deityName` "by DR14", and DR14 lists neither (the pipeline's note unclosed): the temple's dedication does not trace to a
  row (item 20 (h)).
* **VD0-30 CONFLICT — `WorkUnit`.** §4.12 says §5.1's union gains `'moduleCells'` and V03 §3.4's work-limit row uses it;
  §5.1's declaration lacks it, so the schema refuses V03's row.

**Minors**
* **VD0-05 NEW-PROBLEM:** 18 coherence-canon ruling ids (W-SET-01, DWG-01, E-GEN-1, DIC-02, E-03, E-07, E-04, E-10, DWG-02,
  E-05, V12-XCONF-2, E-30, W-DOS-01a, ID-DR, W-DOS-02) cited in normative text.
* **VD0-13 WIRING:** `PortValues`' comment lacks `threats`; the never-read list lacks a notable's `importance` (V08's note).
* **VD0-14 BROKEN-REFERENCE:** F-SITING's detection still cites the ambiguous "§4.5 (5)" (DBR-01 half applied).
* **VD0-16 WIRING:** §5.2's detection cells do not name the kernel codes §3.1 routes to them, F-SKELETON omits the
  numeric-contract refusal and F-REDERIVE the unresolved stored reference §3.10 sends it (kernel notes 15, 17, 20).
* **VD0-21 BROKEN-REFERENCE** (= AL-31): "`ProductDecl`, §4.12" ×3 — the type is V07 §2.1's.
* **VD0-22 CONFLICT** (= VS0-15): `powerStructure.previousGovernments` read by a dating rung and listed nowhere as never read.
* **VD0-26 TERM:** "a standalone neighbourhood's outline" (G-standalone).
* **VD0-27 ID:** "§13.2's T65 fixtures" — a bare bar group (ID-TOOL).
* **VD0-29 WIRING:** `Recipe.presetId` is "read by the generation report's recipe line" (§2.9, J-P54), and §5.4 has none.
* **VD0-31 BROKEN-REFERENCE:** §7.7's `drift` comment says "typed in V02 §2.1"; §2.6 declares `DriftBounds` (MC-11).

## Canon routes — checked and clean

* **Conflicts (28).** DIC-01 (the `load` scope), DIC-02 (caps as indices; the J122 reading that the archived "attempt cap 3"
  rows meant the tier table's three attempts — cap 2 — preserves every number of draws and is recorded), DIC-03 (one code
  table; see VD0-04 for its gaps), DIC-04, DIC-05, DIC-06, DIC-07, DIC-08, DIC-09, DIC-10, DIC-11 (the forms catalogue
  ships at §16's milestone), DIC-12 (narration removed), DXC-01/KXC-01, DXC-02/KXC-04 (see VD0-16), DXC-03/KXC-05, DXC-04
  (the binding: all 79 `EditEvent` kinds have a home tool and a §7.4 row — checked by script), DXC-05, DXC-06/KXC-02, RXC-02,
  SCOPE-C01 (item 15's registered-product wording), SCOPE-C11, V04-ICONF-1, V09-ICONF-2, V12-XCONF-2: applied as ruled.
* **f items (97).** Each routed item's section carries its part (the 83 home items and the 14 touching ones); the token
  check found no f token missing from the set; item 336 is §4.11's text (cross-noted by the editor; raised as unapplied
  at §4.11 by verify-agree-time-r0, owner pipeline).
* **g items.** 102–106, 108–110 applied as f items; 111 (§7.1's spring flag, its §7.4 row and undo, DR40 citing DR1) and
  113 (DR36–DR39, §6.1's replay streams, the replay's record — see VD0-15) present at build depth; 112 names no §5–§7 home;
  114 is VD0-17.
* **Wiring gaps (11).** W-DOS-01a (the never-read list and the closed-digest rule), W-DOS-01b and W-DOS-02 (V08's), W-DOS-09
  (DR36–DR39), W-EDIT-01 (the binding), DWG-01 (§5.1 (8), the `bugs` list, §13.1's fault-injection fixture), DWG-02
  (`Diff`, `UpgradeDiff`), DWG-03 (the base settings row in V11 §3.1), DWG-04 (`attempts` defined with its readers), DWG-05
  (anchor rows for yard parts, `Frontage`, `Corridor`, the castle, decorations, institutions, base wings, sky accesses),
  W-SET-01: closed.
* **Elegance (10).** E-03 (one fixed-key draw statement), E-04 (the binding), E-05 (the registry moves to V11 §3.1), E-06
  (the concern table: every archived concern, cap, keying and retired id present — VD0-07 is the one keying cell lost),
  E-07 (the outcome table — VD0-09 the two cases lost; f item 582's three bends and V09's keys present), E-08 (`Rename`),
  E-09 (kept apart), E-10 (the world-point and schema-transform tables: the door light, Works rings and "none is invented"
  rows present), E-11 (restated rules: the dossier-owned refusal at §7.7 item 11 with every case and alternative, the
  no-undo-target rule at §7.4; §5.3's cut rows followed to their homes — §2.6, §4.11, II.7.3, II.7.5, §7.2, §4.7 state
  them, but VD0-06), E-30 (reference cells with compile check and inverse).
* **Open findings (87).** The 22 restatements and 20 internal duplications have one home each; the 12 DIC, 6 DXC, 6 DWG and
  10 DEL as above; DBR-02 closed by the binding; DBR-01 half closed (VD0-14); the 9 observed edges each have an outcome
  (bug abort, variations past `reroll.maxAdvance`, the user reroll cap, an empty warp, an uncovered `drawBoundary`, the empty
  edits, a missing or zero budget row, a dossier value superseding a user's, an undo record over the cap).
* **Edges and combinations.** E4 (§5.1 (9)), E6 (§5.1 (10), §5.3's vacuous rows), E5 (§5.4's empty lists), E2 and E3
  (§6.4's link cases, §6.5 (9)'s METROPOLIS fixture), E1 (§7.8's disabled reason), §7.2's tests, and the 39 combinations
  (§7.4's *Every kind at the edit boundary*, its B-EDIT fixture per kind and rung) are defined and tested; the named
  combinations "a dossier removing what an edit pinned" (§7.7 item 5's supersession) and "an epoch undone after a save"
  (§7.4's epoch row) hold. Gaps found: VD0-23, VD0-24, VD0-25.

## Cross-part notes addressed to determinism

| from | note | status |
|---|---|---|
| kernel 14, 19, 21, 23, 24 | F-NUM's code; E-GEN-1; the empty mandatory stroke; W-SET-01 names; the `plats` node | present |
| kernel 15, 17 | F-SKELETON's numeric contract; codes in the detection cells | VD0-16 |
| kernel 16 | `kernel.warnings` per §3.1 code; `downgrades` | present |
| kernel 18 | `Invariant` | VD0-02 |
| kernel 20 | F-REDERIVE and §3.10's stored-references failure | VD0-16 (§3.10 sends it to F-REDERIVE, whose detection omits it) |
| kernel 22 | §7.4 citing §3.3 for promoted / demoted / unflagged | stated in §7.4 *Application* with §2.2 rule 3 and `CommitRecord` — no defect |
| model | `TableId` | VD0-20 |
| model | `DriftBounds` "typed in §2.6" | VD0-31 |
| model | `HistoryRecord` | VD0-15 |
| model | T2's spring flag, one event, one undo | present |
| model | `Recipe.presetId` in §5.4 | VD0-29 (§2.9 and J-P54 name a §5.4 recipe line that does not exist) |
| model | §7.5's migration rows | VD0-11 |
| pipeline | class floors cited without values; `WorkUnit` gains `'moduleCells'` | floors present; `'moduleCells'`: VD0-30 |
| pipeline | T2 spring flag, `regenerate` scope `people`, DR14's `religion.deityName`, DR36 ff., replay as creation prefix | spring flag, DR36 ff. and the creation prefix present; `people` scope — see the note below; DR14: VD0-28 |
| rendering | F-LIGHT, `MsgRef`s, `prefix`, `island.place`, the sky-access anchor, `docId`, item 10's committed forms, the dwelling closure, `proposedBy`, DR29 | present (the closure's trigger: VD0-19) |
| scope | never-read `previousGovernments` | VD0-22 |
| scope | item 15's f 202 wording; the forms catalogue's milestone; DR24's custom inputs; T2's spring flag and the layer words | present (the layer words follow ID-LAYER) |
| scope | `Invariant` | VD0-02 |
| V02 | §7.4's setMassing row "may absorb"; F-MASSING / F-COMPOSE "may add" T-V2-54 | optional by its own wording — no defect |
| V04 1, 2 | warnings; `or lost` | VD0-03, VD0-19 |
| V05 | sky bend causes cite V05 §4.2; the landfall's re-landing in §7.4 | the table's last row cites V09 §4.9's `bend.*` rows (V05's are among them) — no defect; landfall: VD0-10 |
| V06 1, 4 | `EvolveOp`; "the city will not rebuild" | informational; the suppression words are withdrawn by item 114 (VD0-17) |
| V08 3 | never-read `importance`; DR1's creation bar; `PortValues` `threats`; `CarriedFact` union | VD0-13, VD0-12; the union is V08 §2.3's by citation — present |
| V09, V10, V07, V12 | binding as the encoders' source; outcome table read by V10; V07's citations; §7.6's pinning hash | present |
| V11 3, 14 | `TableId`; registry row 93 cited | VD0-20; §5.1 (6) and §6.3 cite V11 §3.1's base settings row — present |
| assembler 1 (a), (c), (d) | `Invariant`; warnings; the closure | VD0-02, VD0-03, VD0-19 |

**Note on the pipeline's `people` scope** (ruled here, nothing left open): the live `regenerate` already takes a person
scope ("`regenerate` (person scope)", §7.1's people row; T10 `hold`'s "regenerate on … person"), so "re-derive people" is a
`regenerate` over the persons' ids — no defect.

## Siblings' determinism-owned issues not repeated here

AH-03, AH-04, AH-05, AH-09, AH-15 (verify-agree-host-r0: `DossierChange` kinds, `ReceiptRow.response`, DR1's restated
bridge rule, the history and site as dossier-owned, DR9's provenance), VAT-03 (verify-agree-tools-r0: the decline kinds'
homes), EL-01 (verify-edges-life-r0: a dossier change meeting a lock) and VV12-11 (verify-vol-V01-V02-r0: the F-UNIT /
F-TEMPLATE restatements) stand as their lanes raised them; this lane did not re-derive their cross-volume evidence and
adds no second copy. The duplicates above (VD0-02, -03, -17, -18, -19, -20, -21, -22, -23, -24, -25) are confirmed in the
live text and name the first lane's id so the loop merges them.

## CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed in this lane):** live §5–§7 = the rewrite's files; refcheck 0 broken in the unit; the term, deferral,
narration and canon-id sweeps; the DR row census; the per-subsection diffs and every deleted span's coverage; the inventory
and f-item token checks; the binding and lifecycle completeness over all 79 event kinds; each finding's quoted lines.
**PLAUSIBLE:** the severity of VD0-05 and VD0-13 (no behaviour depends on them); the exact wording of the new rows proposed
in VD0-04, VD0-09, VD0-11, VD0-17 and VD0-25 (each restates the archived or owner-ruled behaviour, but the editor may phrase
it). Doc checks were not re-run: the reference corpus is absent in this checkout, so `doc_checks.py` would be provisional.
