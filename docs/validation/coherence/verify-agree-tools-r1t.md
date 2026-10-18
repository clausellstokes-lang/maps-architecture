# Agreement check, round 1 — the tools (determinism, rendering, V09, V10) after assemble-r1

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-agree-tools-r1t; covered by the whole-design retrovalidation (J84).

> **PROGRESS** — [x] brief read whole · [x] resume check (fresh: no output, no LANDED line) · [x] round-0 findings VAT-01..25 re-checked against the live text (22 fixed, 2 partly fixed, 1 ruling requested) · [x] repair-touched tool subsections re-read (3f0e02b → live) · [x] hand-offs of this round at destination · [x] owner items 114–125 parts in scope checked (F-MISSING) · [x] issues written · [x] result saved · [x] LANDED

Live text read: base `137ecc0e…`, V09 `c2dc5b80…`, V10 `f8f591b3…`, V06 `771887ca…` — assemble-r1's outputs, V10 after its title-block widening. The pre-round text is git `3f0e02b`.

## Scope and method

**Members.** determinism (§5–§7), rendering (§8, §9, §11, §12), V09 and V10. V06 is included for round 0's VAT-17 only.

**Subjects.** Edit events, dry runs, undo, the embedding API, the editor screens, the clerk's calls and its why-answers.

**What was read.**
- §7.1 whole, as repaired. Its event union, the empty-edit and points-form bullets, the outcome table (E-07) with *The returned kinds*, the layer table and the binding (E-04).
- §7.4 *Targets* and its regenerate and people rows; §11.2 whole; §11.3's diff; §5.2's F-EDIT row; §13.2's T101 bars.
- V09 §2.9, §3.3, §3.5, §4.3, §4.5, §4.6, §4.9 (its lead and the rows the base keys), §4.21.1, §4.21.4, §5.3 and §5.6.
- V10 §2.4, §2.9, §2.12, §2.13, §3.5, §3.9b (7), §3.16 and §4.1–§4.6.

**Diffs.** Word diffs of every repaired V10 section in the tool area: §1.2, §1b.1, §2.6, §2.12, §3.4, §3.5, §3.13, §3.17, §3.22, §3.23, §5.1, §5.4 and §6.1. Word diffs of V09 §2.11, §3.8, §3.9, §4.14, §5.6 and §5.12, with the ID-TOOL tool words normalised.

**Scripted checks.**
- Every key of §7.1's outcome table against V09 §4.9's rows: 43 keys, all present. `refuse.clerk.opsDevice` sits in the `refuse.clerk.*` family row.
- §7.1's binding against V09 §4.3, pair by pair.

**Owner items.** The canon's dated rulings for items 114–125 and file g's items 120–125 were read. Each part they give a member was searched for in the live text.

**Peers.** The landed round-1 peers' results were read: verify-determinism, rendering, scope, vol-V09-V10 and agree-host. A defect a landed peer already raised is listed as confirmed and not raised again under a new id. A persisting round-0 id of this lane keeps its id.

**Not run.** `doc_checks.py`: this brief does not ask for it.

## Outcome

**Not clean: 29 issues — 0 blockers, 25 major, 4 minor.**
- By owner: V09 10, rendering 8, V10 7, determinism 4.
- By kind: F-MISSING 20, DISAGREE 5, HANDOFF-OPEN 2, MATRIX-GAP 2.

**Round 0.** Of round 0's 25 findings, 22 are fixed. Two are partly fixed and persist:
- VAT-06: V09's refusal card still names no `outcome`.
- VAT-08: V09 §4.3 still lacks the binding pairs §7.1 gained.

VAT-20 stays open as V10's ruling request.

**New findings (6).**
- **`advance` on a dossier-bound document.** §11.2 refuses it but gives the refusal no result form (VAT-R1-01). The clerk can propose an advance there with no words or alternative (VAT-R1-02).
- **The clerk reads fields `edit` does not return.** V10's declaration step reads a `bent` line, alternatives, counts and effects from `edit`'s `ApplyResult` (VAT-R1-03).
- **Three small value or citation disagreements** (VAT-R1-04 to VAT-R1-06).

**Owner items.** The repairs began before items 120–125 were filed. Item 120's parts for rendering and V09 are absent; V10's part is written. The parts of items 121–125 are absent in every member the rulings name, so this lane raises 20 F-MISSING. Their ids are the standard G1xx-<unit> forms, so they merge with the peers' same ids.

## Round-0 findings — verdicts

| id | owner (r0) | verdict | where (live) |
|---|---|---|---|
| VAT-01 | V09 | FIXED | V09 §4.3 T2 row, §4.5 T2 mapper, §4.21.1 (2), T-V9-71: `from: { points: [p], levelCm, spring: true }` |
| VAT-02 | V10 | FIXED | V10 §4.1 `lake` row: the flag in the points form |
| VAT-03 | rendering | FIXED (residual field corrections handed by V10's note (2) are VV910-02's and the host lane's, not raised again) | §11.2 `Query` members with fields, `ReaderAnswers`, `Bearing8` and the fourteen answer types; V10 §2.13 cites them |
| VAT-04 | V10 | FIXED | V10 §2.13's lead cites §2.8's `PlacementOrder` and §11.2's types; no re-declaration left |
| VAT-05 | V09 | FIXED | V09 §2.9: `MsgRef` cited as §11.2's (comment), no declaration |
| VAT-06 | rendering | PARTLY FIXED — §11.2 `ApplyResult.outcome`, `PreviewResult.outcome`, `ConflictAction.msg`, §11.3 `doc.rejected`, V10 §2.9 done; V09 §3.3 / §5.3 still name no source for the refusal card's line (re-raised, owner V09); §5.2's F-EDIT cell is VDC1-05's (determinism, not raised again) | §11.2, §11.3; V10 §2.9; V09 §3.3 *Refused and bent*, §5.3 |
| VAT-07 | determinism | FIXED | §7.1's layer table (no events column) and its sentence; T101-1/T101-2 read the binding (§13.2); V10 §4.1, T-V10-1 |
| VAT-08 | determinism | PARTLY FIXED — §7.1's binding homes every pair; V09 §4.3 has no row for most of them (re-raised, owner V09; the same gap is VAH-r1-03) | §7.1 binding T2, T3, T4, T6, T8, T9; V09 §4.3 |
| VAT-09 | determinism | FIXED | §7.1 *Points in, shape out*; V10 §4.1 and V09 §4.5 cite it |
| VAT-10 | determinism | FIXED | §7.1's three `invalid` rows and *The returned kinds*; V09 §4.9 `refuse.style.order`, `refuse.table.knowledge`; `refuse.clerk.opsDevice` |
| VAT-11 | determinism | FIXED | §7.1 `group`; §7.4 *Targets*; V10 §4.2 (1) |
| VAT-12 | V09 | FIXED | V09 §4.3 T10 row (no `forest`; New trees on T12); J-V9.101 |
| VAT-13 | V10 | FIXED | V10 §4.1 `tiers` row: `setMassing { building, op: { op: 'tiers', … } }` (V10's note (1): `MassingOp` is an object, correctly) |
| VAT-14 | V10 | FIXED | V10 §4.3, §2.6 |
| VAT-15 | V10 | FIXED | V10 §2.3 `ToolName = ToolId | …` |
| VAT-16 | V09 | FIXED | V09 §4.3 `advance` row, §4.9 `refuse.dossierClock`, §5.6 |
| VAT-17 | V06 | FIXED | V06 §4.2 'let a lane go' row on T9 `shape` |
| VAT-18 | V09 | FIXED | V09 §5.6, §4.9 `info.past.viewing` with `button.openCopy`, §3.16 row 81 |
| VAT-19 | V10 | FIXED | V10 §2.12 `HoldInput` comment, J-V10.84, §4.5, T-V10-25 |
| VAT-20 | V10 | NOT FIXED in its rung clause — RULING REQUEST by V10 (re-raised, same id) | V10 §3.16 `rule` row |
| VAT-21 | determinism | FIXED | §7.1 `drawWay.from`, *Points in, shape out* (road pair by pair) |
| VAT-22 | V09 | FIXED | V09 §4.5's mapper lead and rows (`points: []`, `boundary: []`, `add: []`; harbour `harbour_basin`) |
| VAT-23 | V10 | FIXED | V10 `ClerkDraft` |
| VAT-24 | V09 | FIXED | V09 §4.9 lead, `button.retry`, §4.11 **Ask again**; V10 §2.6, §3.11, §5.4 |
| VAT-25 | V09 | FIXED | V09 §4.3 T8 layout row with **Terraces**, §4.5 T8 mapper |

## Repair-touched subsections in scope — what was re-checked

**§7.1 (determinism; rewritten).** The new pieces were read whole, each against its readers:
- the `group` rule; the points-form bullet with the empty geometry fields;
- the E-07 rows for the islands rung, table edits, the style order, the knowledge admission, `clerk.ops`, `refuse.bug`, the host cap, the upgrade cap, `bend.frame.held` and `bend.warp.halved`;
- *The returned kinds*;
- the layer table without its events column, and the binding with the VAT-08 pairs and the T10 `people` scope;
- the `repairWall` material (item 114).

Findings:
- V09 §4.9 has a row for every key, and V10 §3.16's categories reach every key.
- V10 §4.1's encoders agree with the binding: VAT-07's reading, and VAT-13's typed `setMassing { building, op: { op: 'tiers', … } }`.
- V09's binding table does not follow the binding: VAT-08, and VAH-r1-03's `people` pair.
- `refuse.undo.*` disagrees with V09's buttons; this is VAH-r1-04.
- `reroute`: VDC1-14 and VDC1-15.
- The lead's completeness: VDC1-02 and VAH-r1-06.

**§7.4 (determinism).** *Targets* now cites §7.1's `group`, and the regenerate row gains the `people` scope. V09 §3.9 and §4.10 and V10 §4.3 agree on undo: the owner's `undo(h, of)` and the editor's latest-group rule (VAT-14).

**§11.2 (rendering; grown 4 056 → 6 257 words).**
- `Progress`, `ApplyResult.outcome`, `PreviewResult.outcome`, `.empty` and `ConflictAction.msg`; the reader members with fields and the answer types (file f item 468).
- V10 §2.13 now cites rather than declares them. V10's uses match: `read_map`'s `brief`, `entity`, `sites`, `measure`, `frame`, `rule` and `profile`; `MapBrief.salts`; `WhyAnswer`.
- `PreviewResult.empty` is read by V09 (`edge.nothingToApply.<form>`).
- Still open, raised by peers: `Progress` (VRC1T-06); `RuleAnswer.register` (VV910-02, VAH-31); the inline `BarrierKind` and `LadderStep` unions (VAH-31).
- New here: `advance`'s refusal has no result form (VAT-R1-01). `ApplyResult` carries no bend line (VAT-R1-03, owned by V10). The scratch's session name differs from V10's (VAT-R1-06).

**§11.3 and §11.4 (rendering).** The diff is `doc.rejected`'s `conflicts { outcome, actions }`, the viewer's `party.render` answered `role`, and the export bundle. The view-key bridge rule is VRC1T-02's. Item 125's §11.3/§11.4 part is absent (G125-rendering).

**§5.2 (determinism).** The F-EDIT cell still merges outcome and actions; this is VDC1-05.

**V10.**
- §2.6: the `find` action; the editor's undo condition.
- §2.12: `PlaceAnchor`; `HoldInput`; `read_map find`.
- §2.13: citations and the volume's own types.
- §3.4 and §3.5: the binding's rows; `outcome`; `RuleAnswer.register`.
- §3.9b (7): Find. Agrees with item 120 (a)–(k) but for the host-assistant clause, which is VV910-r1-04 and VAH-r1-01.
- §3.13 (find forms); §3.16 (lock, rule; VAT-20); §3.17 (FindAnswer projection; Ask again); §4.1–§4.6.
- Every changed tool-area sentence was compared with its base or V09 counterpart. The encoder rows for the oasis, the walls, `repair` and `wear`, the road, the quarter, the place and `tiers` agree with V09 §4.5's mappers and §7.1's types, under the set's shorthand `{ op: '<member>', … }` for an op member, which V02, V06 and V09 share. The material rule is the same: a patch only on a `breached` run, else robust with `info.wall.patchOnlyGap`.

**V09.**
- §2.9: `MsgRef` cited.
- §3.3: the mapper's empty fields; the refusal card's source (VAT-06).
- §3.8: `advance` in the journal; the Stop re-issue is VV910-r1-02.
- §3.9 and §5.6: `progress.undo` (VRC1T-06); the past view's way forward; the what-if copy.
- §4.3: VAT-08; the T8 Terraces chip; the T10 row without `forest`; `advance`.
- §4.5: the mappers.
- §4.9: every E-07 key; `refuse.dossierClock`, `info.past.viewing`, `button.retry`.
- §4.21.1 and §4.21.4.

## Hand-offs of this round, at their destination

| from → to | hand-off | at destination |
|---|---|---|
| determinism → V09 §4.3 | a row per binding pair VAT-08 added | **open** — VAT-08 (with VAH-r1-03) |
| determinism → V09 §4.9 | one row per new E-07 key | closed (43 of 43 keys have rows) |
| determinism → V09 §3.3 step 7, V10 §4.2 (1) | cite §7.1's `group` | V10 closed; V09 states nothing that contradicts the rule (closed in substance) |
| determinism → V10 §4.1, T-V10-1 | "its tool's rows of §7.1's binding"; the points-form bullet | closed |
| determinism → V10 §2.10; rendering §8.2, §9.2 | cite E-07's `invalid` rows | closed (§8.2 and §9.2 cite §7.1, which now holds the rows) |
| determinism → rendering §11.2 | retire `ConflictAction.kind` `reroute` or name its row | **open** — VDC1-15; V09 §2.9's `reroute` button is VDC1-14 |
| determinism → scope §13.2 | T101-1 and T101-2 read "the binding (§7.1)" | closed |
| rendering → determinism §5.2 | F-EDIT cell: outcome key and actions | **open** — VDC1-05 |
| rendering → V09 §3.3 step 6 | cite `ApplyResult.outcome` | **open** — VAT-06 |
| rendering → V10 §2.9, §2.13 | cite `outcome`; cite §11.2's declarations | closed |
| V10 → rendering §11.2 | note (2)'s three fields (`RuleAnswer.register`, `BarrierKind`, `LadderStep`) | **open** — VAH-31, VV910-02, VV1112-r1-06 |
| V10 → rendering §11.2 | the gazetteer's per-chip match listing (item 120) | **open** — G120-rendering |
| V10 → V09 | the Find panel, the `find` action among `ClerkHandle.run`'s kinds, §4.11's list, `clerk.alt.find.*` | **open** — G120-V09 |
| V09 → V10 §5.4 | every card's `retry` reads **Ask again** | closed |
| V09 (VAT-17) → V06 §4.2 | the lane row on T9 `shape` | closed |

## Owner items 114–125 — the parts in this lane's members

| item | part | determinism | rendering | V09 | V10 |
|---|---|---|---|---|---|
| 114 | walls decay and recover | §7.1 / §7.4 / §7.7 written | §8.2, §11 written | §4.21.4 written | §3.9b (3) written |
| 115 | grandeur ceiling | — | — | §4.21.5 written | §3.9b (4) written |
| 116 | zoom-out limit | — | §8.8, §9.5, §12.5 written | §4.21.6 written | — |
| 117, 118 | seasons, festivals | §7.7 DR42, DR43 written | written | §4.21.7, §4.21.8 written | §3.9b (5) written |
| 119 | comfort level | — | written; (a2) open — VRC1T-01 | progress view written; (a2) open — G119a2-V09 | — |
| 120 | Find | not named | **absent — G120-rendering** | **absent — G120-V09** | written (V10 §3.9b (7)) |
| 121 | resolution | not named | **absent — G121-rendering** | **absent — G121-V09** | not named |
| 122 | crisis looks | **absent — G122-determinism** | **absent — G122-rendering** | **absent — G122-V09** | **absent — G122-V10** |
| 122 (h)–(i) | forces and framing | not named | **absent — G122h-rendering** | **absent — G122h-V09** | not named |
| 123 | damaged plans | **absent — G123-determinism** | **absent — G123-rendering** | **absent — G123-V09** | **absent — G123-V10** |
| 124 | light weather | **absent — G124-determinism** | **absent — G124-rendering** | **absent — G124-V09** | not named |
| 125 | the dossier the only input | **absent — G125-determinism** | **absent — G125-rendering** | **absent — G125-V09** | not named |

Items 114–119's parts were checked only for presence and for agreement between the members. Their depth is the unit verifiers' job. The 119 (a2) gaps are the peers' VRC1T-01 and G119a2-V09 and are not raised again.

## Issues

### VAT-06 — major · HANDOFF-OPEN · owner V09

**Claim.** Partly fixed. Repair round 1 gave the API a carrier for a refusal's own catalogue line: §11.2's `ApplyResult` conflict member is `{ status: 'conflict'; outcome: MsgRef /* the row of §7.1's dry-run outcome table … */; actions: ConflictAction[] }`, `PreviewResult` gains `outcome?`, `ConflictAction.msg` words its own button, and §11.3's `doc.rejected` carries `{ outcome, actions }`. V10 §2.9 (`ClerkRefusal.msg`) and V10 §3.5 step 3 now read `outcome`. V09, the canvas, still names no source for the refusal card's line. V09 §3.3 *Refused and bent* reads '`conflict` draws the refusal card (V09 §5.3) at the draft's last point: the plain reason and the row's buttons'. Step 6 reads 'the refusal card when `status: 'conflict'`', and V09 §5.3 reads 'the catalogue's text'. None of them says the line is the `outcome`'s row. Rendering's repair handed this end to V09 (repair-r1-rendering.md §3: 'V09 §3.3 step 6 and V10 §2.9 cite `ApplyResult.outcome`'), and V09's repair did not apply it. So on the canvas, `refuse.locked`, `refuse.water` and `refuse.warp` still have no stated source that tells them apart, which was the round-0 defect. §5.2's F-EDIT cell, the determinism end of the same fix, is VDC1-05 (verify-determinism-r1t) and is not raised again here.

**Required change.** V09 §3.3 *Refused and bent*: '`conflict` draws the refusal card (V09 §5.3) at the draft's last point: the line of the conflict's `outcome` (§11.2's `PreviewResult.outcome`, `ApplyResult.outcome`: §7.1's outcome row's key with its arguments, rendered by its V09 §4.9 row) and that row's buttons — a `commit` from a `ConflictAction` carrying that action ("Unlock", "Put it at {site}" at its `target`, "Remove the assignment"), worded by the action's own `msg` (V09 §2.9) …'. Step 6's output cell: 'the refusal card, from `outcome`, when `status: 'conflict'`'. Step 8's `conflict` and V09 §5.3's *Refusal card*: 'the catalogue's text of the conflict's `outcome`'.

### VAT-08 — major · HANDOFF-OPEN · owner V09

**Claim.** Partly fixed. §7.1's binding now homes every pair VAT-08 named. T2 `ground` has `moveVertex` on a shore or coast. T3 `wall` has it on an enceinte's trace, a stretch's anchor vertex and a gate's crossing among them. T4 `road` has it on a way's, a raised way's or a tunnel's chain. T9 `shape` has it on an island's key. T6 `place` has `instance` on a hood pin (add, move, remove, restyle). T8 `fill` has `instance` on trees and §8.10's other decoration instances (add, move, remove, restyle). Determinism's repair handed V09 §4.3 'a row per binding pair VAT-08 added' (repair-r1-determinism.md, cross-unit notes). V09's repair did not write them. V09 §4.3 binds `moveVertex` only on a gate's crossing (T3), a retaining wall's chain (T3) and an access point (T9). It names way handles only in an 'also from' cell. It has no shore or coast, enceinte-trace, stretch-anchor, tunnel-chain or island-key `moveVertex` pair. Its T6 row is '`instance` add (a hood pin)' and its T8 row '`instance` groups of trees' (plant, thin, restyle). Yet V09 §3.5's handles emit `moveVertex` on road and wall chain points, a wall stretch's end, a `rampEnd` and a raised interior point, and V09 §4.6 moves 'a decoration, tree or hood pin by `instance { op: 'move' }`'. T-V9-12 checks both tables pair by pair against the union, so it finds these pairs with no row. That breaks principle (7): every edit kind has its tool and its screen. The same gap, together with this round's `regenerate` of scope `people`, is VAH-r1-03 (verify-agree-host-r1t). This id is kept because the finding persists from round 0.

**Required change.** V09 §4.3 adds the pairs with their screens. (1) T2 `ground`: '`moveVertex` on a shore or coast — a coast's chain points by V09 §3.5's open-chain rule (a lake keeps its level handle alone, J-V9.47)', with V09 §3.5 adding the coast chain to its handle list. (2) T3 `wall`'s row reads '`drawWall`, `placeGate`; `moveVertex` on an enceinte's trace — its chain points, a stretch's anchor vertex (the stretch end handle) and a gate's crossing (V09 §3.5)'. (3) T4 `road`'s rows add '`moveVertex` on a way's chain (its chain-point handles), a raised way's (`rampEnd` onto a ground vertex, interior points on its part) and, on Below, a tunnel's chain'. (4) T9 `shape`: '`moveVertex` on an island's key (on Sky, a vertex of the island's own arena)'. (5) T6 `place`'s hood-pin row: '`instance` on a hood pin — add (the furniture stamp), move (V09 §4.6's drag), remove (Delete), restyle (its panel)'. (6) T8 `fill`'s row: '`instance` on trees and §8.10's other decoration instances — add, remove and restyle by the **Trees** brush (plant, thin, restyle), move by V09 §4.6's drag'.

### VAT-20 — minor · DISAGREE · owner V10

**Claim.** Not fixed in its rung clause. V10's repair moved `refuse.warp` and `refuse.water` to the `lock` row and dropped 'a warp or new water reaching a held record' from the `rule` row. It also states a sky quarter below CITY as V05 §3.23's `bend.island.belowCity`. For the rung clause ('The `rule` row drops "the rung" … and `refuse.islandsRung`') V10 wrote '=== RULING REQUEST VAT-20 ===' in place of a fix (repair-r1-V10.md l.3041). Its reason: §7.1 now holds the islands row ('an `adjust` of the islands setting … below CITY … | refused, the rung | … | `refuse.islandsRung`', VAH-11), so the clause's premise no longer holds. assemble-r1 skipped the block, and the live `rule` row (V10 §3.16) keeps 'the rung of §7.1's islands row' and `refuse.islandsRung`.

**Required change.** Per VAT-20: V10 §3.16's `rule` row drops 'the rung of §7.1's islands row' and `refuse.islandsRung` — unless the adjudicator rules the clause INVALID as superseded by §7.1's islands row (VAH-11), in which case the row stands as it is (ruling requested by V10: see repair-r1-V10.md).

### VAT-R1-01 — major · MATRIX-GAP · owner rendering

**Claim.** `advance` on a dossier-bound document is refused, but no unit says what the call returns. §11.2 types `advance(h, req, opts?): Promise<ApplyResult>` with the comment 'refused on a dossier-bound document'. Its `ApplyResult` has only `ok`, `conflict` and `confirm` members, and no catalogue key is named for the refusal. V06 §2.3 calls it 'the dossier-clock case of the dossier-owned refusal', offering 'Make a what-if copy and advance it'. V09 §4.9 words it as `refuse.dossierClock`, codes '§11.2's `advance` refused on a dossier-bound document'. So a caller that does not pre-check — volume 10's harness running the clerk's `advance` (V09 §4.3's `advance` row: 'also from: the clerk's proposal'), or a script through §11.2 — gets an answer of undefined shape. The matrix lists `advance` (V06–V09, V06–V10, V09–V10) but not this refusal. That makes it an undefined edge of the embedding API (principle (11)).

**Required change.** §11.2's `advance` comment: 'on a dossier-bound document nothing runs and the call answers `{ status: 'conflict', outcome: { key: 'refuse.dossierClock' }, actions: [] }` — the host's clock owns its time (V06 §2.3; J-V6.2); the what-if copy is that catalogue row's button (V09 §4.9)'. The `advance` row of the call table adds 'or the dossier-clock conflict'.

### VAT-R1-02 — major · MATRIX-GAP · owner V10

**Claim.** The clerk can propose an `advance` that a dossier-bound document refuses, and V10 has no words or alternative for it. V10 §4.1's T1 `intend` edit-mode row encodes `advance` as 'V06 §4.1's request, run on the scratch', with V06 §4.1's three shapes as its variations (V10 §3.11). V09 §4.3 names 'the clerk's proposal' as a route to `advance`. But §11.2 refuses `advance` on a dossier-bound document (V06 §2.3; J-V6.2), and nothing in V10 states this. V10 §3.16's `dossier` row names `refuse.dossierOwned`, `refuse.dossierRemove` and `refuse.roster.dossier` as its engine cases, not `refuse.dossierClock`. That row's only alternative, `button.whatIf` app(`openCopy` at the head, detached), is an `app` button. V10 §3.5 step 3 maps no `app` button: it says no dry-run row carries one. The clerk does have `fork` (V10 §2.6). So the canvas offers the what-if copy while the clerk's card either fails unworded or proposes an advance that cannot run. That breaks T101-3's 'one vocabulary'.

**Required change.** V10 §4.1's T1 `intend` edit-mode row: 'on a dossier-bound document no `advance` is encoded: the item is refused in V10 §3.16's `dossier` category with V09 §4.9's `refuse.dossierClock` (§11.2; V06 §2.3), its alternative a `fork` `ClerkAction` at the head, detached (V06 §4.4; V10 §2.6), worded by `button.whatIf`'. V10 §3.16's `dossier` row adds `refuse.dossierClock` among its engine cases with that alternative. V10 §3.5 step 3 adds 'a row's `app` button `openCopy` (`refuse.dossierClock`'s) maps to that `fork` action, the one `app` button a clerk card meets'. V10 §3.23 adds the edge (an advance asked on a dossier-bound document), tested in T-V10-50.

### VAT-R1-03 — major · DISAGREE · owner V10

**Claim.** The clerk's declaration step reads, from `edit`'s answer, fields §11.2's `ApplyResult` does not carry. V10 §3.5 step 3 runs `edit(scratch, events, { filtered: true })`. It then reads 'an answer carrying a `bent` `MsgRef` … its alternatives `propose` actions — for a placement bend each of the preview's plots', and step 4 returns 'its bend line …, its counts, its fates counted by kind …, its effects'. These also fill `DraftItem.bent`, `.counts`, `.fates`. §11.2's `ApplyResult` `ok` member is `{ status: 'ok'; logHead; changed; created }`, with no `bent`, `alternatives`, `counts` or `effects`. Its `confirm` member has fates and per-fate counts but no plot, household or building counts and no `bent`. Only `PreviewResult` carries `bent`, `alternatives`, `counts` and `effects`. A bent declaration that commits `ok` on the scratch therefore reaches the model with no bend line and no counts, and the item cannot become `bent`. This contradicts V10's own rule that a bent item is shown as bent (prompt rule 10, V10 §3.16).

**Required change.** V10 §3.5 step 3 reads: '`preview(scratch, events, { filtered: true })` — its `bent`, `alternatives`, `counts`, `fates`, `renames`, `effects` and, on `conflict`, its `outcome` and `actions` are the item's (a `refused` `role` answer the `role` refusal) — then, unless the preview is a `conflict` or `refused`, `edit(scratch, events)` with the preview's fates and renames filled (§11.2's resubmission form, as V10 §4.2 (1) commits), whose `created` names what the item made (item 470)'. V10 §6.1's declaration row counts the dry run with the commit.

### VAT-R1-04 — minor · DISAGREE · owner V10

**Claim.** V10 §4.1's T6 `place` `where.locus` row still says 'T6 `place`'s row carries the one-line roster (V09's request on §7.1's toolkit table)'. After VAT-07's repair, §7.1's toolkit table is the layer table: it lists tools by layer and carries no events. The one-line `roster` lives on the binding's T6 `place` row ('`roster` of one line (a place by a locus …; item 570)'). The citation now points at a table that does not hold the fact.

**Required change.** V10 §4.1, `where.locus` row: 'T6 `place`'s row of §7.1's binding carries the one-line roster (file f item 570)'.

### VAT-R1-05 — minor · DISAGREE · owner V09

**Claim.** V09's decision J-V9.83 still reads 'chose a BCR adding a one-line `roster` to T6 `place`'s row of §7.1's toolkit table (file f item 570)'. After VAT-07, §7.1's toolkit table holds no events. The one-line roster is a row of §7.1's binding (T6 `place`: '`roster` of one line …; item 570'). The row therefore cites the wrong home.

**Required change.** V09 §9, J-V9.83: '… adding a one-line `roster` to T6 `place`'s row of §7.1's binding (file f item 570) …'.

### VAT-R1-06 — minor · DISAGREE · owner V10

**Claim.** The scratch document's session is named two ways. §11.2's `scratch(h)` comment says the API mints it: 'its session 'clerk:<n>', its role and knowledge key h's'. V10 §3.5's declarations step 1 says '`scratch(h)` (item 469), its session `clerk:<session>.<turn>`'. `scratch` takes only the handle, so the clerk cannot choose that value. The two units state different values for one minted identifier.

**Required change.** V10 §3.5, declarations step 1: 'The turn's first declaration makes the scratch: `scratch(h)` (item 469), its session the one `scratch` mints (`clerk:<n>`, §11.2)'.

### G120-rendering — major · F-MISSING · owner rendering

**Claim.** File g item 120 (Find; J133), routed by canon.md's dated ruling 'File g item 120 routed', names rendering's parts as §8.2, §9.5, §11.1, §11.2 and §12.5. None is written; this was expected, since rendering's repair began before the filing. §8–§12 hold no veil, halo, Find pin, count bubble or ghost pin, and no Find tool, export rule or overlay budget. §11.2's `gazetteer` query has `text` and `kinds` only, with no class counts and no match listing by class, area and layer. Yet V10's live `FindAnswer` and V10 §3.5 read 'each chip's matches by §11.2's gazetteer match listing', a dangling input until this part exists.

**Required change.** Write item 120's rendering part at build depth as new design. §8.2: the Find rows — the veil (the style's paper colour at α 0.55), every match above it at full strength with the halo-like glow (a soft outer glow in its chip's colour fading over ≈ 8 px of screen inside a 2 px outline), its label kept above the veil; an area chip lifting the whole area and glowing along its boundary; at the city zoom, where a plot is under ≈ 6 px, a pin with its chip's glyph, pins closer than ≈ 24 px merged into a count bubble that zooms in on click; matches on another layer as faint ghost pins; each chip's colour from the thematic palette with its own second cue (a glyph on its pins, a dash pattern on its halo's outline; colours repeating past eight chips, item 112). §9.5: Find among the tools and furniture. §11.1: picture exports draw Find as shown with the chips in the legend; battle-map exports leave it off unless asked. §11.2: the gazetteer's class counts and its match listing by class, area and layer, under knowledge admission (a thing the key withholds never suggested, counted, drawn or hinted at) — the listing V10's `FindAnswer` and V09's panel read. §12.5: the overlay's interaction budget — suggestions within ≈ 50 ms of a key, a chip's glow within ≈ 100 ms of the click, base tiles never re-rendered, the index rebuilt once per commit. Find never changes the model, the document, its hash or the log.

### G120-V09 — major · F-MISSING · owner V09

**Claim.** File g item 120 (Find; J133), routed by canon.md's dated ruling 'File g item 120 routed', names V09's part: the Find panel, type-ahead, chip grid, results list, the `live.find` overlay provider, Coverage folded into Show gaps (with §5.4's table and cue column amended), coverage across bands and layers, the phone bottom sheet, and its tests. It is absent, as expected: V09's repair began before the filing. V09 has no Find panel, no `live.find` and no Show gaps. §5.4 keeps Coverage and its `live.coverage` provider. V10's repair also handed V09 the `find` action's end: `ClerkHandle.run`'s comment still counts 'seven kinds', and §4.11's action list and the `clerk.alt.*` family lack `find` and `clerk.alt.find.*`. Meanwhile V10 §2.6, §3.9b (7) and §5.1 already drive 'the Find panel' and 'V09's `live.find` provider'.

**Required change.** Write item 120's V09 part at build depth as new design. The Find panel lists what the town holds at `effectiveKey()` by the gazetteer: institution kinds with counts, named institutions with the dossier's names first, districts, neighbourhoods and quarters, named places, and people through Where is. With the box empty it shows the kinds as a grid grouped by V11's groups. Type-ahead matches display labels, V11's synonyms, the dossier's names and place names by prefix and whole word, forgiving one-letter typos in words of five letters or more, grouped with counts, and offers an 'all smiths' chip for a word matching several kinds. The chip grid shows the union of its chips; each chip has its colour and second cue, and is added, removed or cleared. The results list gives name, kind and district, with **Go to**, **Next**, **Previous** and each chip's count. The `live.find` overlay provider draws on every band and layer, on Below and Sky with '2 more Below' and **Go there**, and at the interior band on the rooms an institution uses. The chips are re-evaluated at every commit, regenerate, undo, advance and season change. Coverage becomes Find's **Show gaps** switch: §5.4's Coverage row and its `live.coverage` provider are replaced, each item of their behaviour kept; Find draws over any Show view. On a phone the panel is a bottom sheet. The `find` action from the clerk: `ClerkHandle.run`'s comment counts it among the application's kinds (eight), §4.11's action list adds it, and the `clerk.alt.find.*` rows join the `clerk.alt.*` family. Add its catalogue rows and its tests (item 120 (k): the hash identical on and off, chips equal to the gazetteer at the key, the knowledge canary, the filter surviving every band, layer, commit, advance and undo, a pin or bubble for every match at the city band, a second cue per chip, the budgets at the metropolis cap).

### G121-rendering — major · F-MISSING · owner rendering

**Claim.** File g item 121 (the resolution adjuster; J134), routed by canon.md's ruling 'File g items 121, 122 and 123 routed', names rendering's parts as §8.8, §8.4 (g), §12.1, §12.5 and §12.8. They are absent. §8.8 keeps three hardware tiers and the tile-DPR steps 3 → 2 → 1.5 → 1. It has no Resolution setting, no steps below 1, no ultra tier, no 4K live-view ceiling and no live Auto loop.

**Required change.** Write item 121's rendering part at build depth as new design. §8.8: the Resolution ladder 3 · 2 · 1.5 · 1 · 0.75 · 0.5, the two steps below 1 new (tiles drawn below CSS density and scaled up). A manual level sets d = min(device pixel ratio, the level's height ÷ the screen's height in CSS px), rounded down to the ladder. The ultra tier has a 512 MB canvas ceiling and tile-DPR cap 3. The live view never draws more than the 4K pixel count (≈ 8.3 M device px); larger screens are scaled up, and exports are not bound by it. The live Auto loop: a frame-time p95 over the tier's frame budget through 2 s steps one rung down; a p95 under 60 % of the budget through 10 s, with the canvas need fitting, steps one rung up. A change is applied only when the view settles, at most once per 10 s, and a device-pixel-ratio change re-evaluates at once. A manual level the device cannot hold draws the nearest level that fits and says so. §8.4 (g): the order of what Auto gives up — lighting detail (full precision → the standard surface → the half-resolution global term), then sharpness (the tile DPR down to 1), then the light pass (the vector rung), then the steps below 1; labels, text, the chrome and every overlay always at the device pixel ratio. §12.1: calibration picks ultra only where the device reports its memory and the benchmark clears the tier's bar. §12.5: the frame budgets the loop holds and its settle rule. §12.8: memory per tier, ultra included. Exports are byte-identical whatever the display setting.

### G121-V09 — major · F-MISSING · owner V09

**Claim.** File g item 121 (the resolution adjuster; J134), routed by canon.md's ruling 'File g items 121, 122 and 123 routed', names V09's part: Settings › Display › Resolution, `AppPrefs.resolution`, the view-status chip and its why, item 121 (f)'s message, and its tests. It is absent: V09 §5.12 has no Display group, `AppPrefs` has no `resolution`, and no chip, message or bar exists.

**Required change.** Write item 121's V09 part at build depth as new design. Settings › Display › **Resolution** offers **Auto** (the default) · **4K** · **1440p** · **1080p (HD)** · **720p**. The choice is `AppPrefs.resolution`, device state never in the document, its hash or the log (V09 §2.11, §2.12 lifecycle row). Levels above the screen's own resolution are greyed ('your screen is 1440p'), and choosing a level turns Auto off. The view-status chip shows the level in force ('Auto · 1440p'), with a tooltip saying why Auto chose it. Item 121 (f)'s message: '4K needs more graphics memory than this device has; showing 1440p'. Add its V09 §4.9 rows and tests (item 121 (h): Auto the default on a fresh install, a manual level honoured or explained, labels and chrome at the device pixel ratio).

### G122-determinism — major · F-MISSING · owner determinism

**Claim.** File g item 122 (crisis looks; J135), routed by canon.md's ruling 'File g items 121, 122 and 123 routed', names determinism's part: §7.7's derivation row mapping every stressor type and condition archetype to its look kind or 'no look', and the knowledge admission of a condition. It is absent: §7.7 has no crisis-look row, and `ConditionOverlay` is read only as item 67's Works share.

**Required change.** §7.7 adds the crisis-look derivation row (a look only, never in the model or its hash). Every SettlementForge stressor type and condition archetype maps to its look kind or an explicit 'no look' — item 122 (b)'s closed table: siege, mass immigration, disease, famine, beast attack, raiders, disaster, occupation, rebellion, boom, bust, and the regional_* pressures 'no look' — read from the `ConditionOverlay`s standing in the view's week (item 117's year position). It also states a condition's knowledge admission (a condition the viewer's key withholds is not drawn, item 122 (e)).

### G122-rendering — major · F-MISSING · owner rendering

**Claim.** File g item 122 (crisis looks; J135), routed by canon.md's ruling 'File g items 121, 122 and 123 routed', names rendering's parts as §8.2, §11 and §12.5. They are absent: §8.2 draws a `ConditionOverlay` only as a settlement-wide wash with a legend row, and there are no crisis looks, placement, exports or budget.

**Required change.** Write item 122's rendering part at build depth as new design (a look only, never the model or its hash). §8.2: the look rows by tier and band, with item 112's second cues. At the city band: camps as clusters, the siege line, smoke and the ruined neighbourhoods' tone. At the district band: engines, tents and fences. At the neighbourhood band: marked doors, rubble and detail. Famine's fields bare (overriding item 117's crop stage). Placement is keyed by the seed, the condition's id and the place; several crises share the outskirts by priority (siege camp, quarantine camp, refugees) under a density cap, never on water, a gate's passage or a label's keep-out; the look is drawn only in its condition's weeks and only with **Show crises** on. §11: picture exports draw the looks; battle-map exports draw them in the image only, never as walls or obstacles. §12.5: drawn lazily per visible tile within the budget.

### G122-V09 — major · F-MISSING · owner V09

**Claim.** File g item 122 (crisis looks; J135), routed by canon.md's ruling 'File g items 121, 122 and 123 routed', names V09's part: Show crises, the preview, the why lines and Find's listing. It is absent: V09 has no crisis look anywhere.

**Required change.** Write item 122's V09 part at build depth as new design: the **Show crises** switch, on by default; the manual crisis preview for maps without a dossier (as item 118 (b)'s festival preview); the why lines naming the crisis and its weeks ('Refugee camp: the Northmarch migration, weeks 12–20'); Find's listing of the crisis looks (item 122 (f)); a condition the view's key withholds neither drawn nor named (View as). Add its V09 §4.9 rows, lifecycle rows and tests.

### G122-V10 — major · F-MISSING · owner V10

**Claim.** File g item 122 (crisis looks; J135), routed by canon.md's ruling 'File g items 121, 122 and 123 routed', names V10's part, the explanations: the clerk names the crisis and its weeks (item 122 (f)). It is absent: V10 has no crisis section, look read or prompt rule.

**Required change.** Write item 122's V10 part at build depth as new design. The clerk's and the why answer's lines name a crisis look and its weeks ('Refugee camp: the Northmarch migration, weeks 12–20'), from the `ConditionOverlay`s standing in the view's week, read like V10 §3.9b (5)'s look read (view state, never a model fact, never in the map block). A condition the session's key withholds is never named or hinted at. Add the prompt rule and its tests.

### G123-determinism — major · F-MISSING · owner determinism

**Claim.** File g item 123 (a ruined building's plans damaged, never redrawn; J136), routed by canon.md's ruling 'File g items 121, 122 and 123 routed', names determinism's part: §6.3's keyed thresholds per plan element by lineage and element id, with no new ids and damage monotone in the decay level. It is absent: §6.3 and §6.1 hold no damage threshold and no decay-level reading.

**Required change.** §6.3 adds item 123's keyed damage thresholds. Each plan element — wall run, floor area, door, window, stair, roof bay over a room, furniture piece — draws ONE threshold keyed by the building's lineage and the element's id, adding no new id (V03 §2.2's identity). The building's decay level (0–1, V06) shows every element whose threshold it has passed, so damage is monotone: a higher level's set ⊇ a lower's, and the same element breaks at the same level for a seed. Restoration lowers the level and the damage leaves in reverse order. A building never decayed draws no threshold-dependent difference (no-op pin).

### G123-rendering — major · F-MISSING · owner rendering

**Claim.** File g item 123 (a ruined building's plans damaged, never redrawn; J136), routed by canon.md's ruling 'File g items 121, 122 and 123 routed', names rendering's parts as §8.6 (the damaged plan's drawing) and §11.1 (battle maps: fallen wall runs leave line of sight; openings, rubble and holes in the image). They are absent: §8.6 draws a decayed or ruined plan uniformly, with no partial or progressive damage.

**Required change.** §8.6 draws the damage layer over the same plan at every state. Abandoned: dust, debris, broken furniture, doors off their hinges. Decayed: rotten floor patches and holes, partitions down, roof holes open to the sky, some rooms marked unsafe. Ruined: outer walls broken, upper storeys mostly floorless (fragments over the void), rubble heaps, the ground floor the only walkable storey, cellars and crypts by their own thresholds. A restored element is drawn in patch material (item 114). §11.1: battle-map exports follow the damage — a fallen wall run leaves line of sight, a doorless opening is a gap, and rubble heaps and floor holes are drawn in the image only, never invented as walls.

### G123-V09 — major · F-MISSING · owner V09

**Claim.** File g item 123 (a ruined building's plans damaged, never redrawn; J136), routed by canon.md's ruling 'File g items 121, 122 and 123 routed', names V09's part, the panel lines. It is absent: V09's plan panel and why card have no line for a damaged plan.

**Required change.** V09's plan panel and why card gain item 123 (e)'s damage lines ('roof fallen in over the hall; the upper floor is gone'), read from the damage layer at the building's decay level, as V09 §4.9 rows with their tests.

### G123-V10 — major · F-MISSING · owner V10

**Claim.** File g item 123 (a ruined building's plans damaged, never redrawn; J136), routed by canon.md's ruling 'File g items 121, 122 and 123 routed', names V10's part, the explanations (item 123 (e): the clerk says 'roof fallen in over the hall; the upper floor is gone'). It is absent: V10 §3.9a's `plan` section has no damage rows and nothing explains the decay level.

**Required change.** V10 §3.9a's `plan` section adds the damage rows — each broken element by room and storey, and the decay level with its source (existence state and years since abandoned, V06) — worded as item 123 (e) ('roof fallen in over the hall; the upper floor is gone'), under the session's key. Add its tests.

### G124-determinism — major · F-MISSING · owner determinism

**Claim.** File g item 124 (intermittent light weather; J137), routed by canon.md's ruling 'File g item 124 routed', names determinism's part: §6.1's view-only, session-seeded weather stream, replayable from seed and clock, never touching the model's streams. It is absent: §6.1 has no weather stream.

**Required change.** §6.1 adds the weather stream as a view-only stream: seeded per session, deterministic for a given seed and clock so tests replay it, outside the concern registry's model streams and never advancing one. It drives item 124 (b)'s spells (a few minutes clear, a 30–90 s shower fading over seconds, fog rolling in and lifting over minutes) within the climate row's weather columns.

### G124-rendering — major · F-MISSING · owner rendering

**Claim.** File g item 124 (intermittent light weather; J137), routed by canon.md's ruling 'File g item 124 routed', names rendering's parts as §8.2, §8.4, §8.8, §11 and §12.5. They are absent: §8.2's `weather` key (cover only) is the only weather, and there is no effects layer, light term, export rule or budget.

**Required change.** Write item 124's rendering part at build depth as new design (never the model, the document, its hash or any tile). §8.2: the effects' marks per style family — fine ink strokes for rain, dots for snow, stipple for mist in `ink` and `hatched`, soft translucent streaks in `lit`, faint ripples on water in rain — at low density and opacity. §8.4: the shower's dimming of the direct term and softened shadows; fog's scattering (shadows soft and faint, the map fading toward the fog's colour away from the view's centre, a soft halo on every `LightSource` at night) as per-frame light terms; on the vector rung, a wash and the halos only; no flash (every change of light takes seconds). §8.8: the effects layer above the tiles and below labels, the chrome and every overlay, never in the tile key. §11: exports never draw the effects, byte-identical on and off. §12.5: ≈ 1 ms per frame at the densest spell, the first thing item 121 (e)'s Auto gives up.

### G124-V09 — major · F-MISSING · owner V09

**Claim.** File g item 124 (intermittent light weather; J137), routed by canon.md's ruling 'File g item 124 routed', names V09's part: the advanced panel's switch, Start a shower now, and the defaults. It is absent from V09 §4.14 and §2.11.

**Required change.** V09 §4.14's advanced panel gains **Weather effects** on / off, device state in `AppPrefs` (V09 §2.11, §2.12 lifecycle row), with **Start a shower now** (a spell of the season's commonest kind). Default ON where the tier has headroom; OFF on the low tier, on phones and wherever the system asks to reduce motion. Add V09 §4.9 rows and tests (item 124 (i)'s defaults and the labels never covered).

### G122h-rendering — major · F-MISSING · owner rendering

**Claim.** File g item 122 (h)–(i) (crisis looks sized by the dossier's forces; framing and the limit; J138), routed by canon.md's last ruling 'File g item 122 (h)–(i) and item 125 routed', names rendering's part as §8.8: massed camp marks on the surrounding ring for a force too large for the frame and margin. It is absent.

**Required change.** §8.8 adds item 122 (i)'s ring: camps stay on the land the map holds (the frame and its margin). A force too large for that land fills it out to the margin, and the rest is drawn as massed camp marks on the surrounding ring at the city band — a look only, never the frame, the model or the hash.

### G122h-V09 — major · F-MISSING · owner V09

**Claim.** File g item 122 (h)–(i) (crisis looks sized by the dossier's forces; framing and the limit; J138), routed by canon.md's last ruling 'File g item 122 (h)–(i) and item 125 routed', names V09's part: Fit, the opening view, the limit, and the panel's numbers. It is absent: V09 §4.21.6's Fit the town and `info.zoom.limit` know only item 116's bounds.

**Required change.** Write item 122 (i)'s V09 part. While crisis looks stand, the opening view and **Fit the town** take in the town and its camps, and item 116's zoom-out limit widens to the bounds of town and camps together, both returning to item 116's when the crisis ends. A view the user has already moved is never yanked. The crisis panel gives the full number ('about 24 000 besiegers, three armies'). Add V09 §4.9 rows and tests (the opening view contains every camp; the limit restored when the crisis ends).

### G125-determinism — major · F-MISSING · owner determinism

**Claim.** File g item 125 (the dossier the only data input; J139), routed by canon.md's last ruling 'File g item 122 (h)–(i) and item 125 routed' (with its §4.11 completion), names determinism's part: §7.7's DR1, DR3, DR19, DR29 and DR42 re-sourced to the dossier or the generator's fallback. It is absent. DR1 still reads 'the realm cell's terrain, river and coast', DR3 'the realm partners', DR19 'the realm cell's resources', DR29 'the realm block's `cell.latDeg`', and DR42 '`HostContext.week` (the campaign's `calendar.elapsedWeeks`)'.

**Required change.** §7.7 re-sources the five rows; each field has its stated standalone fallback, never refusing, reported when absent. DR1, DR3 and DR19 drop the realm cell, partners and resources as inputs. DR29's latitude is the generator's default or the user's setting. DR42's week is the dossier's own latest stamped tick (its conditions' `triggeredAt`, its calamities' and history's ticks), else the user's season control (standalone midsummer); the climate is the dossier's terrain type with our biome rules (item 117 (d)). `HostContext.week` and `HostContext.realm` are no longer inputs (item 125 (a)–(b)).

### G125-rendering — major · F-MISSING · owner rendering

**Claim.** File g item 125 (the dossier the only data input; J139), routed by canon.md's last ruling 'File g item 122 (h)–(i) and item 125 routed' (with its §4.11 completion), names rendering's parts as §11.3 and §11.4: the dossier the only data input, the view commands kept as commands. It is absent: §11.4 still lists 'the optional fields of `HostContext` — the week, the realm block, …' among the host inputs.

**Required change.** §11.4 states the dossier as the port's only data input. `HostContext.week` and `HostContext.realm` are retired as inputs, and every fact they supplied comes from the dossier, else from the generator's fallback (§7.7). §11.3 keeps the embedding API's view commands (a week, a layer, a selection) as commands a host may send as a user would, which the map never needs (item 125 (c)).

### G125-V09 — major · F-MISSING · owner V09

**Claim.** File g item 125 (the dossier the only data input; J139), routed by canon.md's last ruling 'File g item 122 (h)–(i) and item 125 routed' (with its §4.11 completion), names V09's part: the season control as the week's fallback. It is absent. V09 still takes the week from the retired campaign input: §1b's dossier table row ('the campaign calendar's week and season') and §4.21.7's follow switch.

**Required change.** V09 §1b's row and §4.21.7: with **Follow SettlementForge** on, the week is the dossier's own latest stamped tick (its conditions' `triggeredAt`, its calamities' and history's ticks), else the season control's value (standalone midsummer, item 125 (b)), never the campaign calendar. Add its `view.season.noWeek` wording and tests.

## Confirmed here, already raised by a landed verifier (not raised again)

| defect seen in this lane | raised as | by |
|---|---|---|
| V09 §4.3 lacks the binding pairs, the T10 `people` scope (re-derive people) among them | VAH-r1-03 (overlapping this lane's persisting VAT-08) | verify-agree-host-r1t |
| V09 §4.9's `refuse.undo.dossier` and `refuse.undo.creation` rows lack E-07's `rejectSite` and `placeAt` | VAH-r1-04 | verify-agree-host-r1t |
| §5.2's F-EDIT cell still merges the outcome key and the actions (VAT-06's determinism end) | VDC1-05 | verify-determinism-r1t |
| §11.2's `ConflictAction.kind` keeps `reroute`, which no E-07 row returns; V09 §2.9's `reroute` button | VDC1-15; VDC1-14 | verify-determinism-r1t |
| E-07's "one home" lead against the refusals outside a dry run, `refuse.dossierClock` among them | VDC1-02; VAH-r1-06 | verify-determinism-r1t; verify-agree-host-r1t |
| `RuleAnswer.register`, `BarrierKind` and `LadderStep` handed by V10 to §11.2 and not applied | VV910-02; VAH-31; VV1112-r1-06 | verify-vol-V09-V10-r1t; verify-agree-host-r1t; verify-vol-V11-V12-r1t |
| V10 §3.9b (7) lets a host's own assistant set Find chips | VV910-r1-04; VAH-r1-01 | verify-vol-V09-V10-r1t; verify-agree-host-r1t |
| §11.3's bridge carries the per-viewer view keys | VRC1T-02 | verify-rendering-r1t |
| `progress.undo` and the verify wait have no `Progress` member | VRC1T-06 | verify-rendering-r1t |
| the journal's re-issue of a stopped `advance` | VV910-r1-02 | verify-vol-V09-V10-r1t |
| item 119 (a2)'s V09 and rendering parts | G119a2-V09; VRC1T-01 | verify-vol-V09-V10-r1t; verify-rendering-r1t |

## Checked and agreeing

- **The oasis flag.** One shape, the flag inside the points form: §7.1's `PointsForm.spring`, V09 §4.3, §4.5 and §4.21.1 (2), V10 §4.1, T-V9-71 and T-V10-45.
- **The empty geometry fields of a points form.** One rule in §7.1; V09 §4.5 and V10 §4.1 cite it.
- **The undo group.** §7.1's `group` is minted by the engine; V10 §4.2 (1) cites it, and V09 states no other value.
- **The binding as the one tool table.** T101-1 and T101-2 read it, and so do T-V10-1 and V10 §3.4/§4.1. The layer table carries no events.
- **The three `invalid` rows.** In §7.1, with V09 §4.9 rows and the citations in §8.2, §9.2 and V10 §2.10.
- **The re-roll concerns.** No `forest`. T10 homes `village.track` only. T12 homes compass, emblem, render.instances, style.jitter and style.crowns. These agree in §6.1, §7.1, V09 §4.3/§4.5, V10 §2.12 (`HoldInput`, `DressInput`), §4.5 and T-V10-25.
- **The reader's and the oracle's types.** One home, §11.2. V10 §2.13 cites them and keeps its own: `ExplainRequest`, `Explanation`, the providers, `raisedOutcome`, `LookAnswer`, `FindView`, `FindAnswer` and the row-id family table.
- **One declaration each.** `PlacementOrder` is §2.8's, `MsgRef` §11.2's, `ToolId` V09's (V10's `ToolName` extends it), and `ClerkDraft` is distinct from V09's `Draft`.
- **The editor's undo.** The same rule in §11.2 (`of` for the owner), V09 §4.10 and V10 §4.3 and §2.6.
- **The dossier clock on the canvas.** V09 §4.3, §4.9 and §5.6 against V06 §2.3; the past view's way forward against V06 §5.1.
- **The label "Try again".** New random's alone: **Retry** for an export, **Ask again** for a card, in V09 and V10.
- **Item 114's repair.** The material, and the rule for patch versus robust, agree in V06 §2.8, V09 §4.21.4 and V10 §4.1.
- **Item 120 in V10.** V10 §3.9b (7), §2.6, §2.12, §2.13, §3.13 and §5.1 agree with item 120 (a), (h) and (i), but for the host clause already raised. The base and V09 ends it reads are the F-MISSING parts above.
