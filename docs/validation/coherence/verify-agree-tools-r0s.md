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

