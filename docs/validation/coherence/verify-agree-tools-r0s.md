# Agreement check — the tools (determinism, rendering, V09, V10) after assemble-r0

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-agree-tools-r0s; covered by the whole-design retrovalidation (J84).

> **PROGRESS** — [x] resume check (no output, no LANDED line: fresh start) · [x] brief read whole · [x] inputs read (the canon's precedence, home rules S1–S9 and conflict rulings DXC-04, DIC-06, DIC-07, RXC-02, V09-*, V10-*, CANON-C02; elegance E-04, E-07, E-08, E-11, E-16–E-19, E-32, E-33; the dated rulings for g items 114–119; agreement.json: 6 member pairs, 761 rows, 645 subjects, 7 rows ruled `disagree`, 77 hand-offs touching a member; the 89 issues of the landed verifiers for determinism, rendering, V09 and V10) · [x] shared subjects checked by group · [x] hand-offs checked at destination · [x] matrix gaps hunted · [x] issues written · [x] result saved · [x] LANDED

## Scope and method

**Members.** determinism (§5, §6 and §7 of `docs/ARCHITECTURE.md`), rendering (§8, §9, §11 and §12), V09 (`docs/volumes/V09-application.md`) and V10 (`docs/volumes/V10-clerk.md`), as the live text stands after assemble-r0.

**The subjects of this lane.** Edit events, dry runs, undo, the embedding API, the editor screens, the clerk's calls and its why-answers.

**The matrix.** The canon's `agreement.json` gives six pairs among the members:

| pair | rows | ruled `disagree` |
|---|---|---|
| V09–V10 | 524 | 4 |
| V09–rendering | 75 | 0 |
| V10–rendering | 56 | 0 |
| determinism–rendering | 48 | 1 |
| V09–determinism | 28 | 1 |
| V10–determinism | 30 | 1 |

That is 645 distinct subjects. 77 hand-offs start or end at a member.

**The check.** Each subject group was read whole in every member that states it, then compared field by field. The comparison covered the name, type, value, enumeration, table and columns, event meaning, lifecycle rows, tool and API shape, test id and bar, and the build-plan dependency. These were the groups:

1. **The binding.** §7.1's binding and its layer table, against V09 §4.3 and §4.5, V09 §3.5's handle emits, V10 §4.1's encoders and §7.4's create column.
2. **The outcome table.** §7.1's dry-run outcome table, against V09 §4.9's rows (every §7.1 key has a V09 row), V10 §3.16's categories, §5.2's F-EDIT row and §11.2's result types.
3. **The event shapes.** §7.1's union, against V09's mappers and V10's encoders.
4. **The embedding API.** §11.2 against V09 §2.9–§2.10 and §3.3, and V10 §2.6, §2.12–§2.13 and §4.2.
5. **The host bridge.** §11.3's clerk messages and host projection, against V09 §2.10 and §4.11, and V10 §3.17.
6. **Undo.** §7.4 and §11.2, against V09 §3.9 and §4.10, and V10 §4.3.
7. **Admission.** §9.2's admission function (E-17) against its readers.
8. **The g items.** The parts of items 114–119 that these members share.

**Duplicates.** A census of every `type` and `interface` declared in V09 or V10 found four names declared again elsewhere: `MsgRef`, `PlacementOrder`, `Draft` and `Anchor`.

**Hand-offs.** Every hand-off touching a member was checked at its destination. The four rows V09 §10.2 added after the matrix (XV-V9-32 to XV-V9-35) were checked too.

`doc_checks.py` was not run: the brief of this lane does not ask for it.

## Outcome

**Not clean: 25 issues — 2 blockers, 17 major, 6 minor.**

- **By owner:** V09 8, V10 8, determinism 6, rendering 2, V06 1.
- **By kind:** DISAGREE 14, MATRIX-GAP 5, DUPLICATE-HOME 4, HANDOFF-OPEN 2.

**The blockers.** VAT-01 and VAT-02: the oasis flag (g item 111). V09's canvas and V10's clerk write `spring: true` at the top level of `drawWater`. §7.1 declares it only on the points form (`PointsForm.spring`). So a drawn oasis either fails §7.1's schema or is laid as a plain lake.

**The majors, in five groups:**

- **The API's types and results.**
  - VAT-03: §11.2's reader members are field-less stubs, and their types live in a staged volume. This is against file f item 468 as written.
  - VAT-04 and VAT-05: `PlacementOrder` and `MsgRef` each have two declarations.
  - VAT-06: no field carries a refusal's own catalogue line, so `refuse.locked`, `refuse.water` and `refuse.warp` cannot be told apart.
- **The binding.**
  - VAT-07: §7.1 keeps two tool-to-event tables that disagree.
  - VAT-08: `moveVertex` and `instance` pairs that V09's handles emit have no home tool.
- **Rules the base never states.**
  - VAT-09: the empty geometry fields of a points-form event.
  - VAT-10: the three causes that produce `invalid`.
  - VAT-11: how an undo group is minted.
- **Volume statements that contradict the base.**
  - VAT-12: V09 re-rolls `forest`, a concern §6.1 never registers.
  - VAT-13: V10's `setMassing` uses `id` where §7.1 has `building`.
  - VAT-14: V10 sends an editor to an undo that only the owner has.
  - VAT-15: V10 restates the twelve tool ids.
  - VAT-16: V09 has no words for the refused `advance` on a dossier-bound document.
  - VAT-25: V09 has no T8 Terraces chip, though §7.1's binding and V01 give it one.
- **Hand-offs left open.**
  - VAT-17: XV-V9-34, still unapplied in V06 §4.2.
  - VAT-18: V06:X6's way forward from the past view.

**The minors.** VAT-19 to VAT-24: four stale or misfiled statements, one type-name collision and one label collision.

## Issues

### VAT-01 — blocker · DISAGREE · owner V09

**Claim.** The oasis flag of a lake's point-and-level form sits in two different places. Base §7.1 (l.9366, l.9388) puts it in the points form: `PointsForm.spring?: true`, so a drawn oasis is `drawWater { …, from: { points: [p], levelCm, spring: true } }`, and `drawWater` has no top-level `spring`. V09 writes it at the event's top level in three places: §4.5's T2 mapper (l.1726: `drawWater { kind: 'lake', from: { points: [p], levelCm }, spring? }`), §4.21.1 (2) (l.3100–3101: `drawWater { kind: 'lake', from: { points: [p], levelCm }, spring: true }`) and T-V9-71 (l.3870), which commits that shape 'byte-equal to V10's encoding'. A schema built from §7.1 then refuses the canvas's oasis. A lax reader instead drops the flag and lays a plain lake. Either way the generator behaves differently from §7.1.

**Required change.** V09 §4.5's T2 mapper row (l.1726) and §4.21.1 (2) (l.3100–3101): write the oasis as `drawWater { kind: 'lake', add: [], from: { points: [p], levelCm, spring: true } }`, the flag inside the points form (§7.1's `PointsForm.spring`; item 111 (a)). T-V9-71 (l.3870) names that shape.

### VAT-02 — blocker · DISAGREE · owner V10

**Claim.** V10 §4.1's `lake` encoder (l.2571) writes `drawWater { kind: 'lake', add: [], from: { points: [p], levelCm: ground(p) + depthM × 100 } }` and says 'with `spring` the event carries `spring: true` … byte for byte V09 §4.21.1 (2)'s **Spring-fed (oasis)** mapper'. That is the top-level flag V09 writes. Base §7.1 declares the flag only on the points form (`PointsForm.spring`, l.9366; `drawWater.from`, l.9388). So the clerk's oasis either fails §7.1's schema or comes out as a plain lake (T-V10-45's drawn-oasis fixture).

**Required change.** V10 §4.1's `lake` row (l.2571): 'with `spring` the points form carries the flag — `from: { points: [p], levelCm: ground(p) + depthM × 100, spring: true }` (§7.1's `PointsForm.spring`; item 111 (a)), byte for byte V09 §4.21.1 (2)'s mapper as VAT-01 corrects it'.

### VAT-03 — major · DISAGREE · owner rendering

**Claim.** The reader's seven kinds are declared twice, with different shapes. Base §11.2's `Query` (l.14329–14330) declares `{ kind: 'sites' } | { kind: 'measure' } | { kind: 'frame' } | { kind: 'rule' } | { kind: 'profile' }` with no fields and no answer types: 'each member's fields and its answer type … exactly as V10 §2.13's `ClerkQuery` gives them'. V10 §2.13 (l.949–959) declares the same members with fields — `sites { cls; near?; radiusM?; district?; k? }`, `measure { from; to; by? }`, `frame { week; near?; radiusM?; page? }`, `rule { table; key }`, `profile { cls }` — plus the answer types MapBrief … FieldDrivers (l.962–1060). V10 then calls itself their home: 'These are base types … declared here once; §11.2 cites them (item 468)' (l.936). File f item 468 is BCR-V10-1 applied as written (archive V10 l.3052–3075). It puts into §11.2 itself both the seven members 'exactly as V10 §2.13's ClerkQuery gives them' and, after the union, 'the declarations of MapBrief …, EntityCard, SiteCandidate, MeasureAnswer, FrameAnswer, RuleAnswer, ProfileAnswer, WhyAnswer …, WhySection, WhyCause, WhyFamily, WhyPull, WhyLink and FieldDrivers exactly as V10 §2.13 gives them, with QueryResult for these kinds being that type'. The archive base had none of these members, and the rewrite added them field-less. As it stands, a typed `query({ kind: 'sites', cls })` is no §11.2 `Query`. The base's M3a oracle and reader (item 468: BASE, M3a) also hang on a staged volume's (M3c) declarations, against principle (1), S1 and S3. The matrix homed these subjects at V10 by 'most-stated' only.

**Required change.** §11.2: give the `sites`, `measure`, `frame`, `rule` and `profile` members V10 §2.13's fields, as the `entity` member already has them. After the `Query` union, declare `MapBrief`, `EntityCard`, `SiteCandidate`, `MeasureAnswer`, `FrameAnswer`, `RuleAnswer`, `ProfileAnswer`, `WhyAnswer`, `WhySection`, `WhyCause`, `WhyFamily`, `WhyPull`, `WhyLink` and `FieldDrivers` as V10 §2.13 gives them, with `QueryResult` for each of these kinds that type (file f item 468 as written). Drop the comment 'exactly as V10 §2.13's `ClerkQuery` gives them'.

### VAT-04 — major · DUPLICATE-HOME · owner V10

**Claim.** V10 §2.13 re-declares base records. `PlacementOrder` is declared at V10 l.1079 and also at base §2.8 l.2486. File f item 271 (BCR-V10-15 as written: 'with `PlacementOrder` declared after it exactly as V10 §2.13 gives it') put the declaration in the base. V10's copy also lacks the base comment on `k`: 'claims first, then item 105 (f)'s anchors first'. Separately, V10 §2.13's opening (l.936) claims the home of the item-468 types, 'declared here once; §11.2 cites them', which file f item 468 gives to §11.2 (VAT-03).

**Required change.** V10 §2.13: drop the `PlacementOrder` declaration (l.1078–1079) and cite §2.8's. With VAT-03 applied, replace the `ClerkQuery` union and the `MapBrief` … `FieldDrivers` declarations with a citation of §11.2. Keep this volume's own declarations: `LookAnswer`, the row-id family table, and those file f items 311, 270 and 290 home here (`ExplainRequest`, `Explanation`, `WhyProvider`, `WhySectionProvider`, `raisedOutcome`, `RaisedOutcome`). The opening sentence reads: 'The reader's and the oracle's types are §11.2's (file f item 468); this section declares the volume's own and those file f items 270, 290 and 311 place here'.

### VAT-05 — major · DUPLICATE-HOME · owner V09

**Claim.** `MsgRef` is declared twice. Base §11.2 (l.14299) declares `type MsgRef = { key: string; args?: Record<string, string | number | { id: Id }> }`, 'declared in @plat/model … (file f item 463)'. V09 §2.9 (l.704) declares `type MsgRef = { key: MsgKey; args?: … }` again. File f item 463 (BCR-V9-12 as written) declares it in `@plat/model`, the base. §5.2's F-EDIT row, §7.1's outcome table, `PreviewResult`, `ConflictAction` and V10's `DraftItem.bent` all use the one type. The matrix homed `MsgRef` at V09 by 'most-stated' only.

**Required change.** V09 §2.9: drop `type MsgRef = …` (l.704). Keep its two comment rules as a note on §11.2's type: 'MsgRef is §11.2's (@plat/model; file f item 463), its key a `MsgKey` of this catalogue; an `{ id }` argument is an address rendered under a key …; a line a panel builds from band-less data … under the view's effectiveKey()'.

### VAT-06 — major · DISAGREE · owner rendering

**Claim.** A refusal's own catalogue line has no carrier in the API, and three units read three different fields for it. §7.1 (l.9667) says 'Each outcome carries its catalogue key (V09 §4.9) as a `MsgRef`', and §5.2's F-EDIT row (l.8380) gives 'the action … as a `MsgRef`'. V09 §3.3 (step 6; *Refused and bent*, l.1030, l.1051–1058) draws the refusal card from the row of the engine's code (V09 §4.9's codes column: 'F-EDIT `dossier-owned`', '`E_LOCKED`; `ConflictAction` `unlock`', 'F-EDIT naming a staged layer', l.1881–1900). V09 §2.9 (l.738) reads a `ConflictAction`'s `msg` as its button's words. V10 §2.9 (l.698) takes `ClerkRefusal.msg` as 'the dry run's MsgRef, V09 §4.9's refuse.* row for the code', and V10 §4.2 (1) (l.2636) shows 'its actions … as refusals'. §11.2's results carry only `actions: ConflictAction[]` on conflict (`ApplyResult`, l.14303; `PreviewResult`, l.14309), whose kinds are moveTo · unlock · unassign · reroute · stale · invalid. With that alone, `refuse.locked`, `refuse.water` and `refuse.warp` all arrive as an `unlock` action and cannot be told apart. And `refuse.staged`, `refuse.dossierOwned`, `refuse.dossierRemove` (its `rejectSite`/`placeAt`), `refuse.undo.creation` and `refuse.roster.dossier` match no kind, so neither surface can word them.

**Required change.** §11.2: `ApplyResult`'s conflict member becomes `{ status: 'conflict'; outcome: MsgRef /* the row of §7.1's dry-run outcome table: its key (refuse.* …) with its arguments, rendered per caller (§9.2) */; actions: ConflictAction[] }`. `PreviewResult`'s `ok|conflict` member gains `outcome?: MsgRef /* on conflict: as ApplyResult's */`. §11.3's `doc.rejected { conflicts }` carries the same. `ConflictAction.msg` is stated to word its own button (V09 §2.9). §5.2's F-EDIT action cell then reads 'the outcome's key and the actions that table gives the cause, each a `MsgRef`'. V09 §3.3 step 6 and V10 §2.9's `ClerkRefusal.msg` cite `outcome`.

### VAT-07 — major · DUPLICATE-HOME · owner determinism

**Claim.** E-04 unified the event-to-tool mapping into one table, yet §7.1 still carries two that disagree. One is the toolkit's layer table with 'the events it emits' (l.9728–9741); the other is E-04's binding (l.9748–9762), and E-04's ruling named 'the partial twelve-tools table' among the pieces it replaces. The two differ throughout:
- the binding homes at T6 `drawChamber`, `placeAccess`, `addUndergroundAccess`, `unassign`, `rejectSite`, `openUse`/`closeUse`/`relocateUse`/`mutate` and `swapUse`, none of which the layer table's T6 row emits;
- T2's `convert` terrain ops and `setAttr` on `geology` are homed but not emitted;
- T3's `convert` wall ops and `setAttr` on a retaining wall or the castle are homed but not emitted;
- T10's `unlock`, `unpin` and `rerollLayer` are homed but not emitted;
- T11's `setAttr(knownTo)`, `setAttr(displayText)` and `rerollLayer(naming)` are homed but not emitted;
- T12's `placeLight`, a light's `setAttr`/`delete` and its `rerollLayer`s are homed but not emitted;
- the layer table's T9 row lists `drawFootprint`, which the binding homes at T6.
The tests disagree on which table counts. T101-1 (l.16029–16030) checks 'every tool maps to its declaration kinds in §7.1's table'. V10 §4.1 (l.2550, l.2613–2616) and T-V10-1 (l.2898) restrict each clerk tool to 'its row of §7.1's toolkit table', the layer table. §7.1 (l.9744–9745) says T-V10-1 checks the binding. V10's own T3 `repair`/`wear` encoders emit `convert`, which the layer table's T3 row does not list.

**Required change.** §7.1: the layer table keeps its layer and tool columns (and the sky sentence). Its 'the events it emits' column is replaced by one sentence: 'the events each tool homes are the binding's below; a mode may also emit a kind another tool homes (toolkit.json's `emits`, V09 §2.3), as T9's footprint drag emits `drawFootprint`' (E-04, one table). T101-1 and T101-2 (§13.2, l.16029–16031) read 'the binding (§7.1)'. V10 §4.1 (l.2550, l.2613–2616) and T-V10-1 (l.2898) then read 'its tool's rows of §7.1's binding' in place of 'its row of §7.1's toolkit table'.

### VAT-08 — major · MATRIX-GAP · owner determinism

**Claim.** The binding has no home tool for several (kind, target) pairs that V09 emits, so V09-ICONF-2's unit of the binding is incomplete. §7.1 homes `moveVertex` only on a gate's crossing and a retaining wall's chain (T3) and on an access point (T9). It homes `instance` only as 'adding a hood pin' (T6), 'groups of trees' (T8) and 'on furniture' (T9). The handles of V09 §3.5 (l.1137–1160) emit `moveVertex` on a road or wall chain point, a wall stretch's anchor vertex, and a raised way's `rampEnd` and interior point. V09 §4.6 (l.1745–1746) moves a decoration or a hood pin by `instance { op: 'move' }`. §7.1's own edit-target rows add `moveVertex` on shores and coasts (l.9627), on a tunnel (l.9638) and on an island's key (l.9639). None of these pairs has a home in §7.1 or a row in V09 §4.3. T-V9-12 (l.3811) walks the `HandleSet` emits against the binding, and T101-2 enumerates the table, so both find these pairs unbound (principle (7): every edit kind has its tool).

**Required change.** §7.1's binding adds:
- T2 `ground`: '`moveVertex` on a shore or coast';
- T3 `wall`: '`moveVertex` on an enceinte's trace, a stretch's anchor vertex among them';
- T4 `road`: '`moveVertex` on a way's, a raised way's (its ends onto ground vertices) or a tunnel's chain';
- T9 `shape`: '`moveVertex` on an island's key';
- T6 `place`: 'instance adding a hood pin' becomes '`instance` on a hood pin (add, move, remove, restyle)';
- T8 `fill`: 'instance groups of trees' becomes '`instance` on trees and §8.10's other decoration instances (add, move, remove, restyle)'.
V09 §4.3 adds each pair's row with V09 §3.5's handles and V09 §4.6's move as its gestures.

### VAT-09 — major · MATRIX-GAP · owner determinism

**Claim.** The client-side form of a points-form event is a subject shared by the canvas (V09), the clerk (V10) and the event schema (§7.1), and only V10 states it. V10 §4.1 (l.2552–2554) says 'a geometry field the dry run resolves is written empty in the points form — `points: []`, `boundary: []`, `add: []` as the base's own events have it'. No base text says so: §7.1 types `drawWay.points`, `drawWall.points`, `drawTunnel.points`, `drawWater.add`, `drawBoundary.polygon`, `drawChamber.polygon` and `quarter.boundary` as required fields and only says the dry run stores the derived shape in them. Only `placeAt`'s `plot: ''` is stated (item 367). V09's mappers write these events without the fields (VAT-22), while T101-3, T-V10-4 and T-V9-71 demand that the canvas and the clerk emit one byte sequence.

**Required change.** §7.1's *Points in, shape out* bullet adds: 'A client sends a points-form event with each geometry field the dry run resolves written empty — `points: []` (`drawWay`, `drawWall`, `drawTunnel`), `boundary: []` (`quarter`), `add: []` (`drawWater`), `polygon: []` (`drawBoundary`, `drawChamber`), and a `placeAt`'s `plot: ''` (item 367) — beside its `from`; the dry run fills them, so every surface writes one byte form (T101-3)'. V10 §4.1 (l.2552–2554) then cites it.

### VAT-10 — major · MATRIX-GAP · owner determinism

**Claim.** Three causes that produce `invalid` are stated outside E-07's one-home outcome table, each citing §7.1 for an outcome §7.1 does not hold:
- §8.2 (l.12018–12020): 'a `setStyle` event carrying a refused sheet fails its dry run with the conflict action `invalid` (§7.1)';
- §9.2 (l.13189): 'an `editTable` fails its dry run with `invalid` (§7.1)' when `knowledge.admit` would let more knowledge show less;
- V10 §2.10 (l.708–711): an `editTable` on `clerk.ops` from a document's override layer, a skeleton or a host is refused `invalid` with `refuse.clerk.opsDevice` (V09's row, l.2168).
§7.1's outcome table (l.9669–9703, 'the one home of every refusal, conflict and bend cause') has none of the three. VDC0-36 proposes retiring `ConflictAction` `invalid` if no row produces it, which would orphan all three.

**Required change.** §7.1's outcome table adds three rows:
- 'a `setStyle` whose sheet leaves an unresolved or ambiguous layer-order pair (§8.2; J-R39) | conflict `invalid` | the pairs, listed in the style dialog; nothing applied | V09 §4.9's row';
- 'an `editTable` on `knowledge.admit` by which a `public` row would admit finer than `city` or a higher tier finer than a lower one (§9.2) | conflict `invalid` | the offending rows | V09 §4.9's row';
- 'an `editTable` on `clerk.ops` from a document's override layer, a skeleton or a host (V10 §2.10) | refused `invalid` | — | `refuse.clerk.opsDevice`'.
The table states that these are the rows producing `ConflictAction` `invalid`. §8.2, §9.2 and V10 §2.10 cite the rows. V09 §4.9 gains the two catalogue rows (T-V9-15).

### VAT-11 — major · MATRIX-GAP · owner determinism

**Claim.** `EditBase.group` (§7.1 l.9354: `group?: number /* one undo step */`) has no rule for who mints it or how it stays unique. §7.4's *Targets* (l.10330) says only that 'a `group` counts as one step and `of` names its first event'. Two clients write groups into one user session: V09's canvas (§3.3 step 7's committed group, §3.6, §3.7, §3.9's Go back, §4.6's move, each 'one group') and V10's harness (§4.2 (1): 'one fresh `group` for the whole proposal'). If they choose the same number, two separate commits become one undo step. If they choose different numbers for one batch, an accepted proposal's undo splits. The matrix lists no subject for it.

**Required change.** §7.1's `group` comment: 'one undo step: every event of one `edit` (or `confirm`) call that carries `group` shares it; the engine writes it at commit as the `seq` of that call's first event, whatever number the client sent, so a group is unique in the log and `undo.of` names it'. §7.4's *Targets* cites it. V09 §3.3 step 7 and V10 §4.2 (1) cite §7.1 for the value.

### VAT-12 — major · DISAGREE · owner V09

**Claim.** V09 §4.3's T10 row (l.1651) binds `rerollLayer('forest')` and offers 'the woods' trees' among Try again's scope chips at a village rung. Base §6.1 registers no `forest` concern; the rerollable set (l.8693–8721) is naming, naming.emblem, style.jitter, style.crowns, style.compass, render.instances and village.track. `rerollLayer.concern` is `RerollableConcern`, generated from that registry (§7.1 l.9442), and §7.1's T10 row (l.9759) homes only `rerollLayer('village.track')`. So the application would send an event the schema refuses. VDC0-15 and VV78-13 fix V07's side only. V09's J-V9.101 (l.4251) also still argues from '§7.1's T10 row lists no layer re-roll', which the live binding contradicts.

**Required change.** V09 §4.3's T10 row (l.1651): drop `rerollLayer('forest')` and the woods' trees from Try again's village scope chips. A village's woods re-roll with T12's **New trees**, `rerollLayer('render.instances')` as §6.1 registers it and §7.1 binds it, the form VDC0-15 gives V07. J-V9.101 (l.4251) reads '…because §7.1's T10 row homes only the village track's re-roll'.

### VAT-13 — major · DISAGREE · owner V10

**Claim.** V10 §4.1's T9 `tiers` encoder (l.2597) writes `setMassing { id: target, op: 'tiers', count, insetCm, top, stairs, stairWidthCm }`. Base §7.1 (l.9432) declares the event as `{ t: 'setMassing'; building: Id; op: MassingOp }`: the target field is `building`, not `id`. V10's event therefore fails §7.1's schema. T-V10-4's golden would carry a shape the canvas, whose V09 §4.20.5 mapper writes `setMassing { op: 'tiers' … }` on the selected building, cannot match.

**Required change.** V10 §4.1's `tiers` row (l.2597): `setMassing { building: target, op: 'tiers', count, insetCm: insetM × 100, top, stairs, stairWidthCm: stairWidthM × 100 }`: §7.1's `building` field, the op V02 §4.6 (1)'s `MassingOp` `tiers` member.

### VAT-14 — major · DISAGREE · owner V10

**Claim.** V10 §4.3 (l.2656–2658) says that once later events follow an accepted proposal, 'the `owner` role's `undo(h, of)` runs the independence check …, and an `editor` is sent to the history panel, where the group is undone like any other'. No such editor path exists. §11.2 (l.14279) gives `undo(h, of?)` with '`of` only for the `owner` role', and V09 §4.10's history controls (l.2222) offer **Undo this** to the owner role only (`undo(h, of)`). An editor's card keeps **Undo** (V10 §2.6: 'the harness offers `undo` from acceptance on'; V09 §4.11) for a group it cannot undo.

**Required change.** V10 §4.3: replace 'and an `editor` is sent to the history panel, where the group is undone like any other (§7.4)' with: 'for an `editor` the card's **Undo** is drawn only while the group is the session's latest live group, `undo(h)` (§11.2 names an earlier event for the `owner` role only, and V09 §4.10's **Undo this** is the owner's)'. V10 §2.6's 'the harness offers `undo` from acceptance on' carries the same condition for an editor's session.

### VAT-15 — major · DUPLICATE-HOME · owner V10

**Claim.** The twelve tools' id enumeration is declared twice. V09 §2.3 (l.467) has `type ToolId = 'intend'|'ground'|'wall'|'road'|'quarter'|'place'|'roster'|'fill'|'shape'|'hold'|'name'|'dress'`. V10 §2.3 (l.423) restates the same twelve in `type ToolName = 'intend'|…|'dress' | 'read_map'|'why'|'check_draft'|'critique'`. V10's own `useTool` already describes its tool as 'one of the twelve canvas tools (V09 §2.3's ToolId)' (l.584).

**Required change.** V10 §2.3 (l.423–424): `type ToolName = ToolId /* V09 §2.3: the twelve tools of §7.1 */ | 'read_map'|'why'|'check_draft'|'critique';`.

### VAT-16 — major · MATRIX-GAP · owner V09

**Claim.** `advance` on a dossier-bound document is refused, and the refusal has no words or control in V09. §11.2 (l.14287: 'refused on a dossier-bound document') and V06 §2.3 (l.607–609; J-V6.2) state the refusal: 'the host's clock owns its time … The refusal offers its alternative: "Make a what-if copy and advance it" (`forkAt` at the head, detached, V06 §4.4)'. V09 hosts the time card's **Advance** (§4.3 l.1661, l.1665; §5.6). Yet V09 §4.9 has no row for this refusal or its what-if alternative (no 'what-if' anywhere in V09), and V09 states no rule for Advance in a dossier-bound document. T-V9-15 treats a refusal the engine can emit with no row as a CI failure. The matrix lists no subject for it.

**Required change.** V09 §4.9 adds the row `refuse.dossierClock` ('SettlementForge keeps this town's time; make a what-if copy to run it ahead.') with codes '§11.2's `advance` refusal on a dossier-bound document (V06 §2.3)' and buttons `button.whatIf` app(`openCopy` at the head: a detached `forkAt`, V06 §4.4; in host mode by `HostSlots.newDocuments`) · `button.showWhy` why. V09 §5.6 states that the time card's **Advance** shows that row on a dossier-bound document.

### VAT-17 — major · HANDOFF-OPEN · owner V06

**Claim.** Hand-off XV-V9-34 (V09 §10.2 l.4366: '`downgradeWay`, `upgradeWay` and `repairRaised` on T9, as §7.1's binding homes them → V06 §4.2') is not closed at its destination. V06 §4.2's row 'let a lane go, bring it back' (l.3256) still reads 'T4 `road`'s class chip on a way (`path` ↔ its former class) | `convert` `downgradeWay` / `upgradeWay`'. Base §7.1's binding homes both at T9 `shape` (l.9758), and V09 §4.3 (l.1624) does too (J-V9.104).

**Required change.** V06 §4.2 (l.3256): 'T9 `shape`'s class chip on a selected way (`path` ↔ its former class; §7.1's binding)'.

### VAT-18 — major · HANDOFF-OPEN · owner V09

**Claim.** V06's hand-off X6 to V09 (agreement.json V06:X6: 'the forward path from the past') is not closed at V09. V06 §5.1's timeline paragraph (l.3426–3429) says that while the thumb is off 'now' the map shows the band 'Year N — viewing the past' and 'every disabled tool offers the way forward: V09's "Open a copy from here" (a `forkAt` at the seq of the frame on screen …; item 101 R2)'. V09 §5.6 (l.3442–3443) disables the tools 'with V06's "viewing the past" band' but offers no way forward. V09 §4.9 has no row for the band or its button: `button.openCopy` appears only on `refuse.restore.dossier` (l.1905). So the past view's disabled tools are dead ends, against item 101 R2.

**Required change.** V09 §5.6 (after l.3443): 'and every disabled tool offers **Open a copy from here**: `forkAt` at the seq of the frame on screen (V06 §5.1; V09 §3.9; in host mode by `HostSlots.newDocuments`)'. V09 §4.9 adds the band's row `info.past.viewing` ('Year {year} — viewing the past', V06 §5.1's words) with `button.openCopy` app(`openCopy`, the frame's seq).

### VAT-25 — major · DISAGREE · owner V09

**Claim.** V09 has no screen for a district's terracing, which §7.1's binding gives to T8. §7.1's binding T8 row (l.9757) homes `setAttr(fabric)`, `setAttr(fabricParams.*)` and `setAttr(terrace)` with their `regenerate`, and its layer table (l.9737) names 'the Terraces chip, one undo group'. V01 §1b (l.274) names 'T8's Terraces chip (`setAttr`)' as the writer of `District.terrace`. V09 §4.3's T8 layout row (l.1642) lists only `setAttr(fabric)` + `regenerate` and `setAttr(fabricParams.*)`, and §4.5's T8 row (l.1732) has only the Layout card. V09 has no Terraces chip anywhere, so T-V9-12's pair-by-pair check finds (`setAttr`, `District.terrace`) with no screen.

**Required change.** V09 §4.3's T8 layout row (l.1642): '`setAttr(fabric)` + `regenerate`, `setAttr(fabricParams.*)`, `setAttr(terrace)` + `regenerate` | T8 `fill` (layout card on a district, with its **Terraces** chip, V01's `terrace`: on · off)'. V09 §4.5's T8 row (l.1732) adds the chip to its modes, its mapper reading 'terraces → `setAttr(district.terrace)` + `regenerate` (grouped, V01)'.

### VAT-19 — minor · DISAGREE · owner V10

**Claim.** V10 states that §7.1's T10 row lists no re-roll, but it does. `HoldInput`'s comment (l.901) says 'no layer re-roll: T10's row lists no rerollLayer', and J-V10.84 (l.3158) builds on the same premise. §7.1's binding (l.9759) and §7.4's `rerollLayer` row (l.10291) home `rerollLayer('village.track')` at T10. The village track's re-roll then reaches the clerk only through `hold`'s `events` escape hatch, which V10 §4.5 (l.2688) and T-V10-25 (l.2922) do not list among the scoped layer re-rolls (names, compass, emblem, trees).

**Required change.** V10 §2.12's `HoldInput` comment (l.901): 'the village track's re-roll, §7.1's T10 `rerollLayer('village.track')`, reaches the model through `events` (V10 §4.1's escape hatch); new names are name.newNames (T11), a display re-roll dress.restyle (T12)'. J-V10.84's premise reads 'T10's row homes only the village track's re-roll'. V10 §4.5 and T-V10-25 add the village track to the layer re-rolls.

### VAT-20 — minor · DISAGREE · owner V10

**Claim.** V10 §3.16's `rule` category (l.2213) misfiles four codes. It names 'the rung' and 'a warp or new water reaching a held record' as dry-run refusals that are neither dossier nor lock, and lists `refuse.warp`, `refuse.water` and `refuse.islandsRung` among the engine's codes. But §7.1's first outcome row (l.9671) refuses `refuse.warp` and `refuse.water` for a lock or pin, which is V10's `lock` category. And `refuse.islandsRung` is no dry-run outcome. V09 §4.9 (l.1901) words it for §7.8's disabled control. V05 §3.23 (l.1755) bends an API or clerk sky declaration below CITY to a ground quarter, refusing it only where the rung is a dossier fact, and §7.1 has no rung row.

**Required change.** V10 §3.16: the `lock` row's 'when' reads 'an F-EDIT naming a lock or pin — `refuse.locked`, `refuse.water`, `refuse.warp` (§7.1's first row)'. The `rule` row drops 'the rung', 'a warp or new water reaching a held record', `refuse.warp`, `refuse.water` and `refuse.islandsRung`. A sky declaration below CITY reaches the card as V05 §3.23's bend.

### VAT-21 — minor · DISAGREE · owner determinism

**Claim.** §7.1 types `drawWay.from` as 'two points: the route derived by S4's router' (l.9387), and its points-form bullet says 'a road joins two points' (l.9794). §4.3's *Two-point roads* (l.5211–5219) admits two or more points, each consecutive pair routed, and V10 §4.1's T4 encoder writes `from: { points: [from, ...via, to] }` (l.2580). Read by §7.1, a `via` point has no meaning.

**Required change.** §7.1 l.9387: `from?: PointsForm /* two or more points: each consecutive pair routed by S4's router at the dry run (§4.3); with raised, by the raised-way course solver */`. l.9794: 'a road joins its points, pair by pair, by S4's router with its class (§4.3)'.

### VAT-22 — minor · DISAGREE · owner V09

**Claim.** V09 §4.5's mapper column writes points-form events without the geometry fields V10 §4.1 writes empty, while both volumes claim to emit the same bytes. The rows: T2's lake, river and harbour, with no `add: []` (the harbour also lacks `kind`, which V10 gives as 'harbour_basin'); T3's `drawWall { points or from: { points }, kind, closed }`; T4's `drawWay { class, widthCm, from: { points: [a, b] } }`, with no `points: []`; T5's `quarter { kind, name?, band?, from }`, with no `boundary: []` (l.1726–1729). §4.21.1 (2) (l.3100) does the same. V10 §4.1 (l.2571–2581) and T-V9-71 (l.3870, 'byte-equal to V10's encoding') claim byte equality (T101-3).

**Required change.** V09 §4.5's mapper paragraph (l.1710–1713) adds 'points forms are written as §7.1 states, each resolved geometry field empty (VAT-09)'. The harbour mapper reads `drawWater { kind: 'harbour_basin', add: [], from: { points: [shore], levelCm, sizeM2 } }`.

### VAT-23 — minor · DISAGREE · owner V10

**Claim.** `interface Draft` names two different records: V09 §2.4's (l.494, the canvas's live gesture: tool, mode, points, strokes) and V10 §2.4's (l.491, the clerk's draft of items with its scratch and forkHead). The canon's defined terms list 'draft' twice, with homes V09 and V10 and two meanings (canon glossary rows of 'draft'). V09 §2.10 (l.795–796) names its types 'so that none collides with volume 10's', a rule this name breaks (principle (2)).

**Required change.** V10: rename the type `Draft` to `ClerkDraft` at its four references (l.242, l.452, l.491, l.1111). `DraftItem`, `CreatedRef` and the words 'the draft' stay as they are.

### VAT-24 — minor · DISAGREE · owner V09

**Claim.** The canon's glossary row G-newrandom (canon l.154) rules that 'Try again' is only New random's catalogue label, and V09 §4.9 (l.1853) repeats it ('the re-roll control's "Try again" is New random'). Yet V09 gives the same label to two other actions. The drawer's proposal card reads '**Try again** → `retry`' (l.2320), a new clerk turn that V10 §5.4 (l.2755) lists among the card's buttons. And `button.tryAgain` 'Try again' (l.2080) words `error.exportFailed`'s export retry (l.1925). The same label then names three different actions, on the canvas and on the card beside it.

**Required change.** V09 §4.11 (l.2320): the card's `retry` is worded **Ask again** (V10's `clerk.alt.stale.retry` words, now used for every card), and V10 §5.4's list (l.2755) follows. `button.tryAgain` (l.2080) becomes `button.retry` 'Retry' for `error.exportFailed` (l.1925; its text 'Try again?' becomes 'Retry?'). 'Try again' stays New random's label alone.

## Confirmed here, already raised by a landed verifier (not raised again)

| defect (agreement between members) | raised as |
|---|---|
| `setAttr` on `Enceinte.pathway` (T3) and on `WaterBody.spring.flow` (T2): V09 §4.3 and V06 §4.2 against §7.1's binding | VV910-07 |
| `wearWall` and `repairWall`'s material absent from §7.1's T3 row and the walls row (g item 114) | VDC0-04 |
| §10.3's `regenerate` of scope `people`, which `EditScope` lacks | VDC0-14 |
| the stale-base conflict and `ConflictAction` `invalid` with no §7.1 row (VAT-10 names the rows that produce `invalid`) | VDC0-36 |
| V07's `rerollLayer('forest')` (VAT-12 is V09's own row) | VDC0-15, VV78-13 |
| T-V9-12's 'a kind with two home tools' against the (kind, target) unit | VV910-14 |
| V09's gate refusal rows outside §7.1's table | VV910-15 |
| an empty edit's reason: no carrier in `PreviewResult` and no V09 row | VRC0S-29, VV910-12 |
| item 119's progress messages (`Progress` undeclared; `open`, `regenerate`, `adjust`, `export` without progress) | VV910-05 |
| §9.5's count badge without item 348's step | VV910-01 |
| V10's island bend keys | VV910-09 |
| the bare T1–T12 citations (ID-TOOL) | VDC0-26, VV910-20, VV910-21 |
| g item 116's zoom-out limit, which V09's view controls read but §8.8 lacks | VRC0S-02 |
| g items 117 and 118: §2.9's year position and festival display, which V09's controls and V10's `LookAnswer` read but §2.9 lacks | VM-R0S-04, VM-R0S-05 |

## Hand-offs checked at their destination

**V09 → its siblings.** These hold at their destinations: XV-V9-1/2, -3, -4, -5, -8, -9, -13, -14, -15, -16, -23, -25, -27, -28, -31, -32, -33 and -35. The rows to V08 (XV-V9-17, -20, -21, -24, -26, -29) hold too. The rows to V10 hold as V10 §10.2's received table lists them (XV-V9-7, -10–12, -18, -19, -22, -30). XV-V9-34 is open in V06 §4.2 (VAT-17).

**V10 → its siblings.** CVR-V10-1 to CVR-V10-20 all hold at their destinations. Among them:

- CVR-V10-6: V01 l.2692 names its pushes `sun` and `nuisance`.
- CVR-V10-16: `familyWeights`.
- CVR-V10-17: the `refuse.clerk.<category>` row.
- CVR-V10-18: the T11 and T9 rules.
- CVR-V10-20: the `MsgButton` buttons.

**V06 → V09 and V10.** V06's live text dropped its hand-off rows, so these were checked against the rows the matrix carries.

- X7, X17, X30 and X48 are received in V10.
- X21 and X30 are present in V09: `repairRaised` on T9, the advanced panel's `raisedWays`, `bend.hood.noClock` and `repairRetaining`.
- X39 and X44 are met.
- X6 holds except for the past view's way forward (VAT-18).

**V08 → V09.** The CLOSED rows were spot-checked in V09: X12 (the `host.*` rows), X16 (`historyLines`), X17 (`fileMenu: false`), X18 (`HistoryRow.lines`) and X20 (`list(key)`).

**V11 → V09 and V10.** X-V11-3 is received in V10. X-V11-13 holds (`minSpanM` is cited from V11 §3.24.4). X-V11-14 (d) holds (rows 86–89 are not calibratable). X-V11-17 (a) holds (the 45 `fam.<family key>` glyphs).

**V12 → V09 and V10.**

- X-V12-6: the cell inspector reads `dist/evidence.json`, and the historical packs are listed.
- X-V12-7: `RuleAnswer.register` and the stamped cell. The register's file is VV910-02's issue.
- X-V12-8: K2-4's wording.
- X-V12-10: the removal is keyed by reason.
- X-V12-18: no edit needed.

## Checked and agreeing

- **The binding (E-04).** These rows of V09 §4.3 match §7.1's binding pair for pair:
  - `adjust`; `setField(terrain)`, `warp`, `drawWater`, `moveCourseKnot` and `terrace` (T2); `drawWall`, `placeGate` and the castle and retaining-wall paths (T3);
  - `drawWay` in every class, `drawTunnel`, `addLink` and `placeSkyAccess` (T4); `quarter`, `drawBoundary`, `declareEnd` and the district paths (T5);
  - every T6 row; `roster`; every T8 row except the Terraces chip (VAT-25);
  - T9's way, plot, building, plan, massing, passage, decline, tunnel, island, Works and `editTable` rows; T10's (but `forest`); T11's; T12's;
  - the producer rows for `closeup`, `setAttrMany`, `editTable`/`editPreset`, `epoch`, `undo`/`redo`, `upgrade`/`rebase` and the dossier events.
  
  The exceptions are VV910-07, VDC0-04, VAT-08, VAT-12 and VAT-25. §7.4's create column cites the binding's tools in every row read.
- **The outcome table (E-07).** All 28 key families that §7.1's table names have a V09 §4.9 row. V10 §3.16's `dossier`, `lock` and `role` rows word engine refusals by V09's rows (the `rule` row's classification is VAT-20). The bends reach the card as `DraftItem.bent` and `ProposalView.variations[].bends`.
- **The event shapes.** V10 §4.1's encoders match §7.1's event fields except VAT-02, VAT-13 and VAT-21, and VAT-09 for the empty geometry fields:
  - T2: `raise`, `cliff`, `flatten`, `terrace`, `islet`, `coast`, `river`, `harbour`, `warp` and `knot`;
  - T3: `wall`, `retaining` and `gate`; T4; T5's `quarter`;
  - T6: `placeAt`, `roster`, `element` and `move`; T7; T8;
  - T9: `split`, `join`, `merge`, `move`, `set`, `entrance`, `paint`, `tier`, `span`, `link`, `merge` and `siting`;
  - T10, T11 and T12.
  
  The siting cells match V11 §4.2's key forms and cells (V09-XAGREE-1 applied).
- **The API.** These agree among §11.2, V09 and V10:
  - `preview` with `variations` and `thumbnail`; `edit`'s resubmission with `fates` and `renames` (V09 §3.3 step 7, V10 §4.2 (1));
  - `confirm` when the state moved; `filtered` and `admitAs` (V10 §4.2's unfiltered re-preview, compared at the effective key);
  - `HitAnswer` and `entity { at, below }`; `created` with `CreatedRef`; `scratch`; `forkAt`/`rerunFrom`.
  
  The constants V09 attributes to §12.6 match it: `settleMs` 120 ms, ghost delivery ≤ 3 ms, latest wins.
- **The host seam.** §11.3's `clerk.config`, `clerk.config.refused`, `clerk.needsToken`, `preview { proposal }` and `clerk.proposal { id, status, seqs? }` match V09 §2.10's `ClerkMount.host` field for field. V10 §3.17's host projection (a `frame` without `near` and `radiusM`; `measure`, `hit` and `inView` answered `E_HOST_KIND`) matches §11.3's sentence.
- **The drawer.** V09 §2.10's `ClerkHandle.run` split matches V10 §2.6's dispatch table: `propose`, `undo` and `rebuild` go to the harness, the seven other kinds to the application. The card buttons, the card-only host drawer and the apply-then-undo setting also match.
- **Admission (E-17).** §9.2 is the one statement of admission. Neither V09 nor V10 restates its table, and both read it through `admitAs`/`viewAs`.
- **E-32 and E-33.** `error.clerkOffline` and `ClerkHarness` are gone from both volumes.
- **The other canon rulings.**
  - V10-XAGREE-1: V10's `avoid` carries no condition.
  - V10-XAGREE-2: no translation note in V10, and V01 names its pushes by V11's families.
  - V10-XAGREE-3: the size words are quantiles in V10 §3.3 and V09 §4.5.
  - V10-XAGREE-4: V09 has no floor vaults, and V10 words the ledger slabs.
  - CANON-C02: `bend.hood.noClock` is in both volumes.
  - DIC-07: V09's `ToolLayer` is never a refinement level.
- **g item 115.** `info.grand.beyondTier` and `info.grand.dossier` are V09's rows; the shell computes the check, V09 §4.21.5 and V10 l.272 alike.
- **g item 114.** V09's Repair/Wear mapper and V10's `WallInput` `repair`/`wear` encoders agree with each other and with V06 §2.8's ops. Their base half is VDC0-04.

## Not raised, with the reason

- **The flattened `convert { op: 'repairWall', … }` and `setMassing { op: 'tiers', … }` notation.** §7.1 nests the op (`op: ConversionOp`, whose members are `{ op: … }`). Only V09 (3 uses) and V10 (1) write the flattened form, and no text writes the nested one. Read as "convert whose op is V06 §2.8's `{ op: … }`", this is notation and not a disagreement.
- **V10's "upsert" row operations.** These are insert-or-set over §7.1's `RowOp`. V09 §2.6's 'the provider joins the list' agrees with V10's append for `avoid`, and V09 §4.7's `{ avoid: [provider] }` is its shorthand.
- **The `Anchor` type in V10 (place in words) and in V01 (a template anchor).** V01 is outside this lane, and the glossary's 'anchor' (V05 §2.1) is a third, unrelated sense.
