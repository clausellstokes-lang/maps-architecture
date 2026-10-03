# Verify — agreement between units: the tools (round 0, full sweep)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/verify-agree-tools-r0; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-agree-tools-r0`, cloud continuation 2026-10-03)
- P1 inputs (matrix pairs among determinism, rendering, V09, V10; canon rulings DXC-04, V09-ICONF-2, RXC-02, SCOPE-C07, V09/V10 XAGREE and J121 rows; E-04, E-07, E-08, E-16, E-17, E-19, E-32, E-33; 77 hand-offs touching the members): done
- P2 §7.1 events, the binding table and the dry run's outcome table against V09 §4.3, §4.5, §4.9 and V10 §2.12, §3.5, §4.1: done
- P3 §7.4 undo, redo, lifecycle and replay against V09 §3.9, §4.10 and V10 §4.2–§4.3: done
- P4 §11.2 embedding API, §11.3 host bridge against V09 §2.10, §3.3 and V10 §2.6, §3.11, §3.17: done
- P5 rendering (§8.2 ghost, §9.2 admission, §11.1 knowledge, §12.6 and §12.10) against V09 and V10: done
- P6 V09 ↔ V10 seams (catalogue keys, why answers, tool shapes, the drawer, words): done
- P7 hand-offs (77 touching the members) and matrix gaps: done
- P8 issue index, results JSON, LANDED: done

Members: determinism (§5–§7), rendering (§8, §9, §11, §12), V09, V10. Text checked: the live files after assemble r0
(docs/ARCHITECTURE.md, docs/volumes/V09-application.md, docs/volumes/V10-clerk.md). The reference corpus is absent in this
checkout; no check here depends on it.

## Result

**19 issues**, all major (DISAGREE 13, MATRIX-GAP 5, HANDOFF-OPEN 1); no blocker — no disagreement found here changes
what the generator builds from a given log; each changes what a tool emits, what a test checks, what a card or the clerk
says, or what an API result carries. By owning unit: V10 7, V09 6, determinism 4, rendering 2.

The pattern: the base's tool homes landed as the canon ruled (DXC-04's one binding table in §7.1, E-07's one outcome
table, V09-ICONF-2's pair keying, RXC-02, E-16, E-17, E-32, E-33), and V09 and V10 cite them; what is left is (a) a
handful of rows the consumers read that the homes never state (an `edit` result's bend line, a ghost's clerk source, the
`invalid` conflict, the outcome of an `adjust` of a rung-disabled control, a sea coast drawn as a line, `WhyCause`'s
author), and (b) places where one volume's tool shape still differs from the base's binding or from the other volume's
(the village-track re-roll under T10, the history size word, the advance's threat and era, the editor's undo, the T9 row's
kind list, the scratch's session name).

## Method

* **Matrix.** From `agreement.json`, every subject of the six member pairs (determinism–rendering 48, determinism–V09
  28, determinism–V10 30, rendering–V09 75, rendering–V10 56, V09–V10 524; 761 in all), the seven marked `disagree`
  (`EditEvent` ×3 with DXC-04 and V09-ICONF-2, `SettlementForge` with SCOPE-C07, `T-V9-15` with V09-XAGREE-3,
  `BCR-V10-20` with DXC-04, `F-LIGHT` with RXC-02), the editing-rules contract (home §7), and the canon's rulings for the
  members: DXC-04, V09-ICONF-1–5, V09-XAGREE-1–3, V09-XCONF-1, V10-XAGREE-1–4, V09-J121-1–5, V09-J122-1, V10-J121-1–3,
  SCOPE-C07, RXC-01–02, RIC-01–05; elegance E-04, E-07, E-08, E-09, E-11, E-12, E-16, E-17, E-19, E-32, E-33.
* **Reading** (whole subsections, the live text after assemble r0): base §7.1 whole (the events, the named actions, the
  drawing rules, delete, empty edits, the edit-targets table, the dry run and its outcome table, the toolkit and the
  binding), §7.4's replay semantics and *Undo and redo are events*, §7.8's control registry and layer controls, §5.2's
  F-EDIT and F-LIGHT rows, §6.1's rerollable concerns, §8.2's live layers and the ghost's source, §9.2's admission
  function, §11.1's *Knowledge*, §11.2 whole, §11.3's vocabulary and clerk configuration, §12.6 and §12.10; V09 §2.7,
  §2.10, §3.3, §3.9, §4.1–§4.5, §4.9 (whole catalogue), §4.10, §4.11, §4.20.7, §4.21.2, §5.6, §5.8, §6.1, §13 and its
  hand-off rows; V10 §2.6, §2.12, §2.13, §3.5, §3.9, §3.11, §3.12, §3.16, §3.17, §3.23, §4.1–§4.6, §5.1–§5.3, §7.1,
  §10.2 and its hand-off rows; the V06 rows the members' hand-offs name (§2.2, §2.3, §5.1) and V05 §4.2's bend table.
* **Comparisons.** §7.1's binding row by row against V09 §4.3's pairs and V10 §4.1's encoders and §2.12's tool inputs;
  every catalogue key §7.1's outcome table names against V09 §4.9 (29 keys, each with its row) and back (every V09
  `refuse.*` key classified as a dry-run or an application refusal); V09 §4.5's mappers against V10 §4.1's encoders form
  by form (T101-3's one byte sequence); §11.2's `ApplyResult`, `PreviewResult`, `ConflictAction` and `scratch` against
  every reading of them in V09 §3.3 and V10 §3.5, §3.11, §4.2; V10 §2.13's `WhyAnswer` against V09 §2.7's projection
  field by field; §11.3's `clerk.*` bodies against V09's `ClerkMount.host` and V10 §3.17; each hand-off against the text
  at its destination.
* **Sibling lanes.** Overlaps checked against every landed verify result: verify-vol-V09-V10's V09-BIND-1 (minor; four
  convert kinds) is a subset of VAT-02, which also carries the hand-off and the row's other differences;
  verify-agree-time's AT-28 (V06's ops outside the `ConversionOp` union) and verify-agree-host's AH-07/AH-08
  (`HistoryHint`'s shapes) are distinct from VAT-03 and VAT-11 and are not restated here.

## Findings

| id | kind | owner | subject |
|---|---|---|---|
| VAT-01 | DISAGREE (major) | V10 | T10's `rerollLayer('village.track')` denied by V10's `hold` and T-V10-1 |
| VAT-02 | DISAGREE (major) | V09 | V09 §4.3's T9 and no-tool rows against §7.1's binding; V06:X21's repair hand form |
| VAT-03 | DISAGREE (major) | determinism | §7.1's T9 "the decline kinds" and the `ConversionOp` members with no named home |
| VAT-04 | DISAGREE (major) | rendering | `edit`'s `ok` result carries no bend line, alternatives or effects |
| VAT-05 | DISAGREE (major) | V10 | the rung as a dry-run refusal (`refuse.islandsRung`, `belowCity`) |
| VAT-06 | MATRIX-GAP (major) | determinism | the outcome of an `adjust` of a control the registry disables at the rung |
| VAT-07 | DISAGREE (major) | V10 | an editor's undo of a non-latest clerk group sent to the owner-only panel control |
| VAT-08 | DISAGREE (major) | V09 | `ClerkHandle`'s home named circularly by V09 §2.10 and V10 §2.6 |
| VAT-09 | DISAGREE (major) | determinism | the `invalid` conflict §8.2 and §9.2 cite has no row in §7.1's outcome table |
| VAT-10 | DISAGREE (major) | V09 | `bend.invalid` reads a `ConflictAction` `invalid` as a clamp |
| VAT-11 | MATRIX-GAP (major) | V10 | the History chip's size word against `IntendInput.history.once: Rung` |
| VAT-12 | MATRIX-GAP (major) | V09 | `refuse.exportTier`'s "only its owner" against §11.1's tier rule |
| VAT-13 | MATRIX-GAP (major) | V10 | V09's `decidedBy` reads fields `WhyCause` does not carry |
| VAT-14 | MATRIX-GAP (major) | determinism | a sea coast drawn as a line: emitted by V10, promised by §14, undefined in §7.1 |
| VAT-15 | DISAGREE (major) | V09 | V09's T2 has no coast-line mode; its harbour mapper has no `kind` |
| VAT-16 | HANDOFF-OPEN (major) | V09 | V06:X6's way forward from a past view (Open a copy from here) |
| VAT-17 | DISAGREE (major) | rendering | a ghost's `source: 'clerk'` has no input in §11.2's `preview` |
| VAT-18 | DISAGREE (major) | V10 | the scratch's session name (`clerk:<n>` against `clerk:<session>.<turn>`) |
| VAT-19 | DISAGREE (major) | V10 | V10's `advance` input against V06 §2.3's (threat, era; `hazards` a parameter) |

### VAT-01 — DISAGREE (major); owner V10

**Claim.** §7.1's binding (base l. 9759) homes `rerollLayer('village.track')` at T10 `hold`, and §7.4's lifecycle row (l. 10291), V07 §4.x (l. 2991) and V09 §4.3's T10 row (l. 1573) agree; V10 denies it twice: §2.12's `HoldInput` comment (l. 873) reads "no layer re-roll: T10's row lists no rerollLayer", and T-V10-1 (l. 2820) asserts both that each tool's `events` enumeration equals the kinds §7.1 binds to it and that "T10's enumeration holds no `rerollLayer` and `hold` no layer re-roll" — a test that cannot pass, and a clerk with no route to re-grow a village's tracks (§6.1's one rerollable geometry concern, a Re-derive from VS4). The matrix lists `rerollLayer` only for V09–V10, V09–rendering and V10–rendering (home V10); the determinism–V10 pair is missing, and the home is §7.1 (determinism), not V10.

**Required change.** V10 §2.12's `HoldInput` comment reads: "T10's row lists `rerollLayer` for `village.track` alone (§7.1; V07's roads re-grown, a Re-derive from VS4 with its fates, §6.1): it reaches the model through `hold`'s `events` escape hatch at a village rung; new names are `name.newNames` (T11), a display re-roll `dress.restyle` (T12)". T-V10-1's clause "T10's enumeration holds no `rerollLayer` and `hold` no layer re-roll" becomes "T10's enumeration holds `rerollLayer` for `village.track` only, in T10's escape-hatch list, and no typed form of `hold` emits a layer re-roll".

### VAT-02 — DISAGREE (major); owner V09

**Claim.** V09 §4.3 (l. 1552) says it places every pair of §7.1's binding on the screen and that T-V9-12 checks both directions, but its T9 row (l. 1572) differs from §7.1's T9 row (base l. 9758): (a) it omits `convert` `burn`, `downgradeWay`, `upgradeWay` and `repairRaised` (V06's hand forms; none of the four appears anywhere in V09), `setAttr` on a Works, and §7.1's "every `setAttr` path no other row homes (a person's attributes, a use's specialisation)"; (b) it lists `reshapeRange`, `moveTower` and `addTower` as event kinds — they are `MassingOp`s of `setMassing` (V02 §4.1; base l. 2459–2461); (c) its no-tool row (l. 1576) lists `advance` as a kind beside `epoch`, while `advance` is §11.2's request that appends `epoch` events (V06 §2.3), not an `EditEvent` kind. So T-V9-12's two-way check fails on (a) and is ill-typed on (b) and (c). V06's hand-off X21 to V09 ("the hand forms of V6 §4.2 (repair a raised way or a deck …)") is open: no V09 screen emits `repairRaised`. verify-vol-V09-V10's V09-BIND-1 (minor) names (a)'s four convert kinds only.

**Required change.** V09 §4.3's T9 row adds `convert` `burn` ("Change over time → Burn" on a building), `downgradeWay` and `upgradeWay` ("Change over time" on a way), `repairRaised` ("Change over time → Repair" on a ruined span, an abandoned raised way and a struck deck's host — V06 §4.2's hand forms, closing V06:X21), `setAttr` on a Works (its start week and duration, the Works panel) and "every `setAttr` path no other row homes" (the context panel's Shape tab); it writes `setMassing` (its ops `reshapeRange`, `addTower`, `moveTower`, V02 §4.1) instead of listing the ops as kinds; its no-tool row reads "`epoch`: appended by V06's `advance` request from T1's time card and the timeline bar". V06's X21 is marked closed at V09 §4.3.

### VAT-03 — DISAGREE (major); owner determinism

**Claim.** §7.1's binding is the one home keyed by (event kind, target class or path) (E-04, V09-ICONF-2), yet its T9 cell (base l. 9758) homes "the decline kinds" — a set the base never defines ("decline kinds" also in §7.4's lifecycle row, l. 10273) — and names no home for several `ConversionOp` members (§4.11, l. 7474–7480, 7822–7826, 7938–7961, 7999): `demolish`, `abandon`, `decay`, `ruin`, `robStone`, `clear`, `build` (the convert form), `outskirtToDistrict` (a district-making edit §7.3's S6 row re-derives, l. 9941), `carve`, `DeclineOp`'s `vacate`, `reoccupy`, `reuse`, and `reclearIsland` (the `sky.clearance` participant's only); and `neglect`, `breach`, `dismantle` are listed under T3 with no target class while `DeclineOp` also applies them to raised ways, retaining walls and decks, which "the decline kinds" would home at T9. V09 §4.3 enumerates a different set (`demolish`, `abandon`, `decay`, `ruin`, `robStone`, `clear`, `rebuild`, `build`, and the retaining wall's decline at T3), so the base's registry and enumeration bars (T101-1, T101-2) and V09's T-V9-12 check different pair sets.

**Required change.** §7.1's binding names every `ConversionOp` member by its target: T9 `shape` — on a building `demolish`, `abandon`, `decay`, `ruin`, `robStone`, `clear`, `rebuild`, `build`, `vacate`, `reoccupy`, `reuse`, `burn`; on a way `downgradeWay`, `upgradeWay`; `neglect`, `breach`, `dismantle` and `ruin` on a raised way, a span, a support or a deck, and `repairRaised`; T3 `wall` — `neglect`, `breach`, `dismantle` on an enceinte or a retaining wall's stretch (as its row and V09's T3 row have them); T5 `quarter` — `outskirtToDistrict`; T2 `ground` — `carve` of a canal, moat or basin by hand (`digCanal` its canal form); the no-tool row — `reclearIsland` (V05's `sky.clearance` participant only) and every `convert` from an epoch. "the decline kinds" is removed from §7.1 and §7.4 (l. 10273 names the same members).

### VAT-04 — DISAGREE (major); owner rendering

**Claim.** §11.2's `ApplyResult` (base l. 14301–14305) has `ok { logHead, changed, created }`, `conflict { actions }` and `confirm { …, effects?, effectsMore?, holds? }`; the bend line (`bent`), the placement `alternatives` and the `effects` exist only on `PreviewResult`. V10 §3.5 step 3 (l. 1431) runs `edit(scratch, events, { filtered: true })` and reads "an answer carrying a `bent` `MsgRef`", its alternatives ("each of the preview's plots as `placeAt`") and, in step 4 (l. 1484), its effects — fields `edit` never returns on `ok`. Beyond the clerk, every client that commits without a preview (a bridged `doc.apply`, a script through `@plat/api/node`) has its declaration bent with no word of it, against §7.1's outcome rule ("bent to the nearest lawful one, which the dry run names in one line") and J-A101.71's "nothing changes silently".

**Required change.** §11.2's `ApplyResult` `ok` branch gains `bent?: MsgRef; alternatives?: Id[]; effects?: Effect[]; effectsMore?: number; holds?: MsgRef` — the committed dry run's own values, filtered under `filtered` and `admitAs` as a preview's are — and the table's `edit` row names them; V10 §3.5 steps 3 and 4 cite that branch ("`edit`'s `ok` carries the bend line, the alternatives and the effects, §11.2").

### VAT-05 — DISAGREE (major); owner V10

**Claim.** V10 §3.16's `rule` row (l. 2143) lists "the rung" among "every other refused or conflict row of §7.1's outcome table" with the code `refuse.islandsRung`, and §3.23's refusals edge (l. 2430) reads "the rung-specific rows (`refuse.islandsRung`, the raised way's `belowCity`) as the dry run gives them". §7.1's outcome table has no rung row and refuses only for a dossier fact or a lock (item 101 R2; J-VI.4, J-VI.30); V05 §4.2 bends a T5 `sky` declaration at TOWN or a village rung to a ground quarter (`bend.island.rung`, V05 l. 2071, J-V5.10); `belowCity` is a `RaisedOutcome` of the `why` answer (V10 §2.13 l. 1045, `info.raised.belowCity`), not a dry-run row; V09 sources `refuse.islandsRung` from §7.8's disabled control (V09 l. 1813), not from the dry run. The clerk would word a bend as a refusal and drop its bent item.

**Required change.** V10 §3.16's `rule` row drops "the rung" and `refuse.islandsRung` from its refused list, and its bends paragraph lists `bend.island.rung` (V05 §4.2) among the dry run's bends; §3.23's refusals row reads "the rung-specific bends (`bend.island.rung`) and why lines (`info.raised.belowCity`) as the dry run and the oracle give them"; the outcome of an `adjust` of a rung-disabled control is cited from §7.1's row (VAT-06).

### VAT-06 — MATRIX-GAP (major); owner determinism

**Claim.** Shared subject missed (determinism–V09–V10): what the dry run answers when an `adjust` arrives through the API (the clerk's `intend` in edit mode or its `events`, a host's `doc.apply`, a script) for a parameter §7.8's registry disables at the document's rung — the islands control at TOWN and every village rung (base l. 11287), any "control with nothing to act on at a rung" (l. 11284). §7.8 states only the control's disabled state; §7.1's outcome table has no row; V09 §4.9 keys `refuse.islandsRung` ("Floating islands exist only in cities and metropolises.", button cityUp) to "§7.8's disabled control" (l. 1813); V10 expects it from the dry run (l. 2143, 2430). Verdict: disagree — an undefined edge with three readings (principle (11)).

**Required change.** §7.1's outcome table gains the row: "an `adjust` of a parameter the control registry disables at the document's rung (§7.8) | empty edit — nothing appended, the parameter unchanged (item 101 R2 admits no refusal) | the registry's reason row, with "Make this town a city" for a control a higher rung enables | V09 §4.9's row for the control (`refuse.islandsRung` for the islands control)"; *Empty edits* lists the case; V09 §4.9's `refuse.islandsRung` row cites this row as its source beside §7.8's disabled control.

### VAT-07 — DISAGREE (major); owner V10

**Claim.** V10 §4.3 (l. 2574–2578): when later events followed an accepted clerk group, "the `owner` role's `undo(h, of)` runs the independence check …, and an `editor` is sent to the history panel, where the group is undone like any other (§7.4)". The panel's **Undo this** is the owner's only (V09 §4.10, l. 2085: "owner role: `undo(h, of)`"), and §7.4 lets only an `owner` session name any live event; an editor's session undoes its own latest live event, in order. The editor is sent to a control it cannot use.

**Required change.** V10 §4.3 reads: "when the group is the session's latest live event, **Undo** is the session's `undo`; when the session's own later events followed, an `owner` runs `undo(h, of)` with its independence check and its conflicts shown, and an `editor`'s card says those later changes are undone first — each its own undo (§7.4) — and offers **Undo** again once the group is the session's latest; an editor is never sent to the history panel's **Undo this**, which is the owner's (V09 §4.10)".

### VAT-08 — DISAGREE (major); owner V09

**Claim.** `ClerkHandle` has one declaration, in V09 §2.10's code block, but the two volumes name each other as its home: V09 §2.10 (l. 764–765) says "`ClerkHandle`'s members are V10 §2.6's (the harness adds none)", and V10 §2.6 (l. 568) says "V09 §2.10 declares ClerkSlot, ClerkMount (with its host channel) and ClerkHandle, every member the drawer and the settings call among them; this volume implements the handle and adds no member (J-V10.88)". E-33 rules `ClerkHandle` the one name; the circular pointer leaves which text governs a member's signature undetermined (principle (1)).

**Required change.** V09 §2.10's sentence reads: "`ClerkHandle` is declared here, with every member the drawer and the settings call; volume 10 implements it (`createClerk(mount)`, V10 §2.6), states each member's behaviour and adds no member (J-V10.88)" — replacing "`ClerkHandle`'s members are V10 §2.6's (the harness adds none)".

### VAT-09 — DISAGREE (major); owner determinism

**Claim.** §8.2 (base l. 12019–12020): "a `setStyle` event carrying a refused sheet fails its dry run with the conflict action `invalid` (§7.1)"; §9.2 (l. 13189): "an `editTable` fails its dry run with `invalid` (§7.1)" for a `knowledge.admit` table that breaks its order. §7.1's outcome table — "the one home of every refusal, conflict and bend cause" — has no such row: its only value row is "a value outside its declared range … | bent | clamped to the nearest lawful value | `bend.invalid`", which commits. A table or sheet whose cross-row check fails has no nearest value, so the two rendering rows cite a §7.1 outcome that does not exist, and an implementer of §7.1 alone would clamp and commit what §8.2 and §9.2 refuse.

**Required change.** §7.1's outcome table gains the row "an `editTable`, `editPreset` or `setStyle` whose result fails the loader's check of that table or sheet (§9.2's `knowledge.admit` order, §8.2's unresolved or ambiguous sheet pairs, a table schema's cross-row rule, §7.6) | conflict — nothing commits | `ConflictAction` `invalid` naming the failed check | `refuse.invalid` (V09 §4.9)", beside and distinct from the range row's clamp; §8.2 and §9.2 cite it.

### VAT-10 — DISAGREE (major); owner V09

**Claim.** V09 §4.9's `bend.invalid` row (l. 1810) — "{field} can't be {value}; set to {nearest}, the nearest it allows" — gives its source as "`ConflictAction` `invalid`, clamped to the nearest lawful value". A `ConflictAction` comes back in `status: 'conflict'` with nothing committed (§11.2), and `invalid` is the conflict of a table or sheet that fails its check (§8.2 l. 12019, §9.2 l. 13189; VAT-09); a clamp is a bend of a committed value (§7.1's range row). The canvas would word a refused table edit as "set to the nearest", and V09 has no row for the `invalid` conflict.

**Required change.** V09 §4.9's `bend.invalid` source reads "§7.1's range row: the value clamped (a `bent` `MsgRef`)"; a new row `refuse.invalid` — "{table} can't take this change: {check}." with `button.showWhy` why — is sourced "`ConflictAction` `invalid` (§7.1's table-check row)"; T-V9-15's walker covers it.

### VAT-11 — MATRIX-GAP (major); owner V10

**Claim.** Shared subject missed (V09–V10): the history option's peak word. V09 §4.21.2 (1) (l. 3004) offers one chip **Once {a sizeWord}** per size word of V09 §4.5's seven T1 size chips (small town … metropolis, J-V9.56), writing `peak: { rung, population }` from that word's rung and quantile. V10 §2.12 types `IntendInput.history` as `{ once: Rung; ageYears? }` (l. 816) and §4.1's T1 row maps `once` to "population: once's size word's quantile" while claiming "the bytes V09 §4.21.2's History chip writes": a rung has three size words (TOWN: small town, town, large town; CITY: small city, city, large city), so the population is undetermined, and "once a large town" or "once a small city" cannot be written by the clerk. V09's "for the present rung" default age and V10's "for the rung" also differ. Verdict: disagree.

**Required change.** V10 §2.12's `IntendInput.history` reads `{ once: SizeWord | VillageRung; ageYears?: number } | 'none'`, `SizeWord` the seven words of V09 §4.5's T1 rule (the lexicon's rows, V10 §3.3); V10 §4.1's T1 row maps `peak.rung` to the word's rung and `population` to its quantile (a village rung its typical, V07 §2.1), and the default `ageYears` to V11's `history.settings` `defaultAgeYears` for the present rung, as V09 §4.21.2 reads it — one byte sequence with the chip (T101-3).

### VAT-12 — MATRIX-GAP (major); owner V09

**Claim.** Shared subject missed (rendering–V09): who may take a document format. §11.1 *Knowledge* (base l. 14116–14119): `.plat`, the compact twin, the JSON schema, a permalink and the skeleton go "only to a key of tier `secret` (the `owner` and `editor` roles by default, §11.3 …) and refuses any other key with the API error `E_KNOWLEDGE_TIER`". V09 §4.9's `refuse.exportTier` (l. 1819), the sentence for that error, reads "This file holds every secret of the town; only its owner can make it." — an editor at tier `secret` can, and an owner whose host-set key is below `secret` cannot. Verdict: disagree.

**Required change.** V09 §4.9's `refuse.exportTier` reads "This file holds every secret of the town; only someone who knows all of them can make it." (the rule of §11.1's *Knowledge*: a key of tier `secret`), keeping `button.pictureInstead` and `button.showWhy`.

### VAT-13 — MATRIX-GAP (major); owner V10

**Claim.** Shared subject missed (V09–V10): `WhyCause`. V09 §2.7's projection (l. 581) builds the why card's `decidedBy` line from "the oldest `cause` entry": an event carrying `EditBase.dossier` → "Placed here by SettlementForge's record"; a user's declaring event → "You placed it here", or with `proposedBy: 'clerk'` "You accepted the assistant's proposal"; an epoch → "… in {year}"; a creation-prefix epoch of the history replay → "Built when the town was {a tierWord}, in year {year}". V10 §2.13's `WhyCause` (l. 1017) is `{ step, rule, slices, seq?, chance? }`: no author, no clerk or dossier mark, no creation flag, no week. `WhyAnswer.history` carries `by` but is paged newest first, so the oldest cause's event is not reliably in it, and §11.2 has no read of an event by `seq`. Verdict: disagree — a consumer reading fields its producer never writes.

**Required change.** V10 §2.13's `WhyCause` gains `by?: 'generation'|'user'|'clerk'|'host'|'epoch'` (from the event at `seq`: `EditBase.dossier` set → `host`, `proposedBy: 'clerk'` → `clerk`, author `epoch` → `epoch`, else `user`; `generation` for a stage step), `creation?: true` (the event carries `EditBase.creation`) and `week?: number` (an epoch's week), written by the generic and every default provider (V10 §3.9); V09 §2.7's `decidedBy` rows read them.

### VAT-14 — MATRIX-GAP (major); owner determinism

**Claim.** Shared subject missed (determinism–V10–V09, with scope's §14): a sea coast drawn as a line. §14's T2 row (base l. 17250) promises "a coast or a river drawn as a knotted curve"; V10 §4.1's `coast` encoder (l. 2490) emits `drawWater { kind: 'sea', add: [], line: path }`. §7.1's `drawWater` gives `line` a meaning only for rivers and canals ("rivers and canals take a `line` and a width", *Drawing at the authoring boundary*, l. 9518–9530), and its points forms give a coast "a sea level and one shore point with a basin size"; nothing says which side of a sea `line` is water, how its ends meet the existing shore or which operator repairs it, so the clerk's event has no defined fold. Verdict: disagree (an event form with no defined outcome).

**Required change.** §7.1's drawing rule gains the coast line form: "`drawWater { kind: 'sea', line }` re-draws the shore along `line`: the water on the side the existing sea lies at the line's first point, each end joined to the existing shore at its nearest shore point, the land gained or lost between the old and the new shore applied as `add` and `subtract` rings by the boolean engine and repaired by §7.3 (b)'s water operator; a line that meets no sea is bent to the nearest shore (`bend.*`, the outcome table's last row)" — the event of §14's T2 row and V10 §4.1's `coast`.

### VAT-15 — DISAGREE (major); owner V09

**Claim.** V09 §4.5's T2 row (l. 1640) has no coast-line mode — its water modes are Lake, River, River or canal, Coast & harbour ("sea level, one shore point, a basin size") and Water paint — though §14's T2 row promises a coast drawn as a knotted curve and V10 §4.1's `coast` encodes one, so the clerk emits a form the canvas never does (T101-3's one vocabulary); and its harbour mapper writes `drawWater { from: { points: [shore], levelCm, sizeM2 } }` with no `kind` (a required field) where V10 writes `kind: 'harbour_basin'` — the canvas and the clerk cannot give one byte sequence for one harbour.

**Required change.** V09 §4.5's T2 row gains a **Coast** line mode (draw a line along the wanted shore) mapped to `drawWater { kind: 'sea', add: [], line }` (§7.1's coast line form, VAT-14; V10 §4.1's `coast` row), and its harbour mapper reads `drawWater { kind: 'harbour_basin', add: [], from: { points: [shore], levelCm, sizeM2 } }`; V09 §4.3's T2 row lists the coast line among its gestures.

### VAT-16 — HANDOFF-OPEN (major); owner V09

**Claim.** V06's X6 asks V09 for "the forward path from the past", and V06 §5.1 (l. 3269–3272) states it: while the timeline's thumb is off "now", "every editing tool is disabled … and every disabled tool offers the way forward: V09's 'Open a copy from here'" (a `forkAt` at the seq of the frame on screen), except over the replayed past before the creation week, which offers no fork (V06 §3.20.6). V09 §5.6 (l. 3222–3223) disables the tools with V06's band only, and no V09 rule offers the copy from a disabled tool; V09 §1.3 assigns the bar and card to V06 but keeps the tools and their disabled states (V09 §4.2).

**Required change.** V09 §5.6 reads: "while the thumb is off 'now' the editing tools are disabled with V06's 'viewing the past' band, and each disabled tool's reason offers **Open a copy from here** (`button.openCopy`, a `forkAt` at the seq of the frame on screen, V09 §3.9; in host mode by `HostSlots.newDocuments`), except over the replayed past before the creation week, which offers none (V06 §3.20.6)"; V09 §13's row for V06:X6 marks the forward path met.

### VAT-17 — DISAGREE (major); owner rendering

**Claim.** §8.2 (base l. 11866–11867): "A ghost a clerk's `preview` delivers carries `source: 'clerk'` and draws the AI mark beside its count badge (R19; file f item 518)", and V10 §5.1 relies on it. §11.2's `preview(h, e, opts?: { view?; filtered?; admitAs?; variations?; page?; focus? })` (l. 14276) carries nothing that says a preview is a clerk's, the bridge's `preview` has a `proposal` only for a host's assistant, and V10 §3.11 (4) previews with `{ filtered: true }` alone; edit-mode events receive `proposedBy` only at acceptance (V10 §4.2). The engine cannot tell which ghost to mark, so the AI mark on the built-in clerk's ghost has no producer.

**Required change.** §11.2's `preview` options gain `source?: 'clerk'` — set by the clerk's handle on every proposal preview (V10 §3.11 (4), a flip, a re-preview) and by the module for a bridged `preview { proposal }` — and §8.2's sentence reads "a ghost whose `preview` carried `source: 'clerk'` carries it in its `live.ghost` delivery and draws the AI mark …"; the `preview` row of §11.2's table names the option.

### VAT-18 — DISAGREE (major); owner V10

**Claim.** The scratch document's session has two values: §11.2's `scratch(h)` (base l. 14269) — a call with no session parameter — opens the scratch with "its session 'clerk:<n>'"; V10 §3.5 (1) (l. 1427) states "`scratch(h)` (item 469), its session `clerk:<session>.<turn>`", a value the call has no way to receive.

**Required change.** V10 §3.5 (1) reads "The turn's first declaration makes the scratch: `scratch(h)` (item 469), its session the one `scratch` mints (§11.2)", dropping `clerk:<session>.<turn>`.

### VAT-19 — DISAGREE (major); owner V10

**Claim.** V10 §2.12's `IntendInput.advance` (l. 818) is `{ years; shape?; to?; hazards?: 'none'|'minor'|'full' }`. V06 §2.3 (l. 557–570) maps the shapes to a `Trajectory` and states "the card's 'more' pane and the clerk's `advance` accept `trajectory.slice`'s threat (0–1) and era row" — neither is in V10's input; and `hazards` is V06 §2.2's `EvolutionParams.hazards` (l. 447), a document parameter set by `adjust` and refused on a dossier-bound document, not an `AdvanceRequest` field — V10's encoders (§4.1's T1 edit-mode row) map it nowhere. V06's hand-off X7 to V10 ("the `advance` shapes table (V6 §2.3)") is therefore met only in part.

**Required change.** V10 §2.12's `advance` input gains `threat?: number /* 0–1 */` and `era?: string /* an era row */`, written into `trajectory.slice` (V06 §2.3); `hazards` is stated as the `adjust('evolution.hazards', value)` V10 §4.1's T1 edit-mode row emits beside the advance (V06 §2.2; on a dossier-bound document refused with V06 §3.11.1's line), not a field of the request; V10 §13 marks V06:X7 met.

## Shared subjects confirmed in agreement

Each read in every member that states it; none needs a change beyond the issues above.

* **The binding's one home** (DXC-04, E-04): §7.1 holds the table keyed by (event kind, target class or path) with the
  history kinds' producers; V09 §4.3 keeps only its mode, gesture and panel columns and cites §7.1; V10 §4.1's encoders
  and T-V10-1 read it. Pair keying (V09-ICONF-2) holds in §7.1 and T-V9-12 (split and merge at T5 and T9, delete at T10
  and T9, instance at T6, T8, T9). Rows T1–T8, T10–T12 agree between §7.1 and V09 §4.3 pair for pair (T1's `history`
  is the recipe's `adjust`, inside "recipe"); the differences are VAT-01, VAT-02 and VAT-03.
* **The dry run's outcome table** (E-07): one home in §7.1, §5.2's F-EDIT row citing it; all 29 catalogue keys the
  table names have their V09 §4.9 row; the bends V02 §1b emits (`bend.tiers.*`, `bend.stack.*`, `bend.deck.*`, …) are
  exactly V09's rows (V09-XAGREE-3 applied); V10 §3.5 step 3 and §3.16 map refused, conflict, bent and confirm the way
  §7.1 classes them, apart from VAT-05; V09's application refusals (`refuse.viewer`, `.stale`, `.phone`, `.layer`,
  `.restore.dossier`, `.exportTier`) are not dry-run rows and none claims to be.
* **Undo and redo** (§7.4): sessions, the no-undo-target rule (creation events, dossier events, an epoch that carried
  one), independence and owner-only `of` agree with V09 §3.9 (Go back to here as one group, owner role), V09 §4.10's
  controls and V10 §4.2's one group per accepted proposal; the exception is VAT-07.
* **The embedding API** (§11.2): `scratch`, `filtered`, `admitAs`, `variations`, `thumbnail`, `PreviewResult`'s
  `bent`, `alternatives`, `effects`, `holds`, `created`; the eight `Effect` kinds, each worded by a V09 `effect.*` row
  (V09 §4.20.7) and filtered on the clerk's card; `confirm`'s token and resubmission form as V09 §3.3 step 7 and V10
  §4.2 (1) use them; the lowering rule as V09 §2.10's `effectiveKey()` and V10 §3.12 apply it. Exceptions: VAT-04,
  VAT-17, VAT-18.
* **The host bridge** (§11.3): `clerk.config { mode, transport { baseURL, token, expiresAt, fallbacks? }, capUsd }`,
  `preview { proposal }`, `clerk.needsToken`, `clerk.config.refused`, `clerk.proposal { id, status, seqs }` agree with
  V09 §2.10's `ClerkMount.host` and V10 §3.17's configurations (C for SettlementForge, J121, J122; SCOPE-C07 applied).
* **The drawer** (V09 §2.10, §4.11 ↔ V10 §2.6): `TurnView`, `ProposalView`, `ClerkAction`'s ten kinds and the dispatch
  table (seven run by the application, three by the handle), `RefusalView`, `refuse.clerk.<category>` for every
  category but `lock`, `rule` and `role`, `refuse.clerk.offline` the one offline row (E-32), no `ClerkHarness` (E-33).
* **Knowledge** (§9.2's one admission function, E-17): §11.2's readers, V09 §2.7's band-less reads with `admitAs`, V10
  §3.12's filtered dry runs and reads at the city band — all cite it.
* **Rendering names** (E-16): neither V09 nor V10 uses the retired post-operation names or the role `lights`.
* **Latency** (§12.6, R12-15): settle 120 ms, ghost delivery ≤ 3 ms, latest wins, preview-on-release fallback — V09 §6.1
  uses the same figures.
* **Table edits from the tools**: `siting.linkEdits` cells `{bindTo?, avoid?, cut?}` and `siting.declared`'s key forms
  (V09-XAGREE-1, V10-XAGREE-1) are written identically by V09 §4.7 and V10 §4.1, and §7.1's binding homes both at T9.
* **The size words** (V10-XAGREE-3): V10 §3.3's lexicon reads V09 §4.5's quantile rule; the remaining difference is the
  History chip's (VAT-11).
* **F-LIGHT** (RXC-02): §5.2's row cites §8.4 (g)'s and §8.8's triggers.

## Hand-offs touching the members

77 hand-offs in `agreement.json` have a member as source or destination. Those on the tools were checked at their
destination:

* **Open:** V06:X21 (V09: the repair hand forms) — VAT-02; V06:X6 (V09: the forward path from the past) — VAT-16;
  V06:X7 (V10: the `advance` shapes table's threat and era) — VAT-19.
* **Closed at the destination, read in its text:** V06:X17, X30, X39, X44, X48; V08:X11, X12, X15–X18, X20 (marked
  open in the requester's column, closed in the text); XV-V9-7, -10, -11, -12, -16 (a) (V05 no longer reads "T9's
  delete"), -18, -19, -22, -30; CVR-V10-4, -7, -15 – -20; X-V11-13; X-V12-6, -8, -10. V06:X6's other parts (the time
  card's shapes, threat and era, the grey range, the link view) are V06's own screens by V09 §1.3 and V06 §5.1, which
  states them.
* The hand-offs whose subject is not a tool (pricing, calibration rows, catalogue texts owned elsewhere, V05's and V07's
  word rows of CVR-V10-14) belong to the proof, host and layers lanes and are not judged here.

## Matrix corrections (no unit changes)

The units cite the right homes; the matrix's `home` column does not, for these subjects of the member pairs (each found
by "most-stated"): `EditEvent`, `rerollLayer` and `drawWater` are determinism's (§7.1; R6), not V09's or V10's;
`MsgRef`, `admitAs`, `edit`, `preview` and `undo` (the calls) are rendering's (§11.2), not V09's or V10's. The
determinism–V10 and determinism–V09 pairs lack `rerollLayer` (VAT-01) and `refuse.islandsRung` (VAT-06); the matrix
has no subject for `WhyCause` (VAT-13), the History chip's size word (VAT-11), the document-format admission (VAT-12),
the coast line (VAT-14) or `Effect` (agree). Recorded for the canon's next round.

## Issue counts

19 issues: DISAGREE 13, MATRIX-GAP 5, HANDOFF-OPEN 1; all major. Owners: V10 7 (VAT-01, -05, -07, -11, -13, -18, -19),
V09 6 (VAT-02, -08, -10, -12, -15, -16), determinism 4 (VAT-03, -06, -09, -14), rendering 2 (VAT-04, -17). Design files
untouched; the results file is `docs/validation/coherence/results/coherence_verify-agree-tools-r0.json`.
