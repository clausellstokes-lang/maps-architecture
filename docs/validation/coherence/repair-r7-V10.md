# Repair round 7 — V10 (the clerk) — lane coherence/repair-V10-r7

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-V10-r7; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/repair-V10-r7`, 2026-10-02)
- [x] P0 brief read whole; adjudication-r7 read: How to read, table of contents, Part A, R7-01, Part L whole (terms, laws
  1–4, the check, the seven corrections, the restated veto list), R7-02 (banner, owner rules, *beneath* whole), R7-05,
  R7-06, Part H's head and Part H · V10, Part P rows naming V10 (PRB7B-11, PRB7C-LCK-01, PRB7C-LCK-07), the held list
- [x] P1 issue source (verify-edges-life-r6t VEL6-r6-01) and probe sources (probe-r7c-locks PRB7C-LCK-01, -07) read; live
  V10 §2.6, §3.5, §3.9, §3.16, §3.23 (C7), §4.1, §7.1, §8 read whole; base §2.7's span record, §7.1's binding row,
  §11.2's card, T110-2 (3); V09 §4.20.6; V04 §8's U3
- [x] P2 blocks built from the live file (sha256 1014b64c7dc8…) by count-asserted substitutions
- [x] P3 checks: dry run of the block applier on a copy, ids, review-id and deferral scan, doc_checks
- [x] P4 report, result JSON, LANDED

## Summary

* **Blocks:** 5 `REPLACE` blocks on `docs/volumes/V10-clerk.md` (§2.6, §3.9, §3.16, §4.1, §7.1; no retitle, insert or
  append). **Ruling requests: 0. Hand-offs: 0.**
* **Live file** (assemble-r6's output): `docs/volumes/V10-clerk.md` sha256 1014b64c7dc8…; each REPLACE body is the live
  subsection with count-asserted substitutions (8 changed lines in all), every other line verbatim.
* **Binding rulings applied:** adjudication-r7's Part L (the laws, cited as "§2.7's laws" with the law's number, never
  restated), R7-05 (the span's `use` at every reader, in PRB7B-11's citing form), R7-06 (a)'s schedule for an arch-vault
  clause, Part H's head (J146's citing form; the seat names each change below), Part H · V10 (one FIX, E-V10-1,
  E-V10-2), R7-01 (2)'s sweep of blind spot (b). R3-01 – R3-03, R4-01, R5-01, R6-01 standing. No ruling or review id is
  written into design text.
* **Not touched:** V10's three held issues (VAT-r6-05, VV910-r6-04, VV910-r6-05; held for round 8); V10's lock texts
  (§3.16's `lock` row, T10 `hold`), which keep their words until round 8 (J150; Part A).

## Issues → where fixed (1 routed id: 1 FIXED; none MERGED or INVALID)

| id | disposition | where |
|---|---|---|
| VEL6-r6-01 | FIX per R7-05 (amended, PRB7B-11), in J146's citing form | (1) §3.9's default providers, the raised-way row's last cell: "… from the base's span record, a `vault` span naming its arch vault where V04 §3.5.4 (d) lays one — but a span §2.7's laws read `open` is told `open` while they read it so, with what lies under it in V09 §4.20.6 (2)'s words, whatever its recorded `use`, and no arch vault named in it (§2.7's laws, law 1 (8); its worked example *beneath*; V09 §4.20.6 (2))"; (2) §7.1's T-V10-41 adds: "on T110-2 (3)'s c14 fixture at a seed searched so that a `vault` span of its S4 viaduct lies under a run of stage 2's ring with nothing but that run across the span's strip (§2.7's laws, law 1 (8)), the clerk's read of the viaduct (`why`, V10 §3.9's raised-way row) tells that span `open` with "A wall runs under this arch", as its V09 panel and why card do, and after a hand `delete` of that run tells it `vault` — with its arch vault from M6-U's U3 (V04 §3.5.4 (d)), the reading alone before it (§2.7's laws, law 1 (8))" |

## END lines written (Part H · V10)

| END | where | text |
|---|---|---|
| E-V10-1 | §4.1's `span` encoder row | "`setAttr { id: target, path: 'spans/<n>/use', value: use }`" → "`setAttr { id: target, path: 'spans/<a>-<b>/use', value: use }`, the n-th span's keys read from the target's card (§7.1's binding, as §2.7's record keys a span; a span §2.7's laws read `open` takes the held `use` as the canvas does, law 1 (8))" — as given (it already cites §2.7's laws with the law's number; nothing to convert); "on a raised way (item 362 (d)); a held user edit" kept after it |
| E-V10-2 | §2.6's `ProposalView`, the per-variation `fates` count | `fates: Record<EditFate['fate'], number>;` keeps its type and gains the comment "keyed by EditFate['fate'], 'reshaped' among them (§7.1's EditFate; §2.7's laws, law 4)". The END names the field `ProposalView.counts.fates`; in the live record it is `ProposalView.variations[].fates` (beside `counts`), the record's one count of fates, already keyed by `EditFate['fate']`, so §7.1's widened union (E-D14) reaches it with no change of type |

## Notes on the texts (where a ruling, the guard or a law shaped the words; each vetoable)

1. **J146's citing form (Part H's head).** R7-05's FIX cites *beneath* twice — inline ("a span §2.7's crossing table's
   *beneath* reads `open` is told `open` while it does") and in the closing parenthesis "(§2.7's crossing table,
   *beneath*; V09 §4.20.6 (2))". Written once, as the law with its worked example: "a span §2.7's laws read `open` is
   told `open` while they read it so, … (§2.7's laws, law 1 (8); its worked example *beneath*; V09 §4.20.6 (2))". No
   case of law 1 (8) is listed, so a case the laws add reaches the clerk at once (R7-05's aim).
2. **A `vault` span names its arch vault** (added to the raised-way row). The FIX's "and no arch vault named in it" and
   its test's "tells it `vault` with its arch vault" both presuppose that the read names a span's arch vault where one
   stands. The row did not say so, so the test would have targeted no mechanism (principle (7)). The words agree with
   V09 §4.20.6 (1)'s span panel ("its vault's building when walled up") and cite V04 §3.5.4 (d), the arch vault's home
   (R7-06 (b)). Before the underground layer, no arch vault is laid and none is named.
3. **T-V10-41's fixture holds its case** (round-7 note (c)). T110-2 (3)'s c14 ring is moated and carries an
   intervallum. Its moat stops at the under-deck strip's edges where it meets a `vault` span's strip, but its
   intervallum may pass under a span that reads `open` beneath the ring. If it does, the span still reads `open` after
   the run's `delete` (law 1 (8)), and the clause's second half could not hold. R7-05's "with no way, channel or
   retaining wall under the span" is therefore written as the fixture's condition, in R7-06 (a)'s C6 pattern ("the
   fixture's seed searched"), and cites law 1 (8) instead of listing three of its cases: "at a seed searched so that a
   `vault` span … lies under a run of stage 2's ring with nothing but that run across the span's strip". *A span's
   strip* is the term law 1 (8) reads.
4. **T-V10-41's arch-vault half is staged.** T-V10-41 exits at C1, inside M3a, which is before the underground layer.
   Law 1 (8) says arch vaults are laid "never before the underground layer (M6-U), where the reading alone holds", and
   R7-06 (a) runs every arch-vault clause at the later of its exit and M6-U's U3 (V04 §8's U3 lays item 110's arch
   vaults and `ArchVaults.reconcile`). So the clause reads "tells it `vault` — with its arch vault from M6-U's U3 (V04
   §3.5.4 (d)), the reading alone before it". At C1 the clause holds with the span told `vault` and no arch vault
   named; from U3 on, the hand `delete`'s commit lays the chamber (V04's reconcile; the crossing table's W11) and the
   read names it.
5. **"The clerk's read"** is named as `why` (V10 §3.9's raised-way row), the reader the FIX changes. The V09 string is
   written as V09 writes it: "A wall runs under this arch" (E-V9-8).
6. **The card read (§3.5, l. 1451) stands.** A raised way's `entity` card lists its `spans` among its `attrs`, which are
   the registry's readable paths (§11.2). §7.1's binding row (E-D15, determinism) reads the path `open` while §2.7's
   laws read it so. The card therefore agrees with the why row, and no V10 text there restates the record. §11.2's
   hit-test `sub` path (`spans/<ordinal>`) selects a span by ordinal, which E-V10-1's encoder maps to its keys, so it
   is no third edit-path form.

## The sweep (R7-01 (2); blind spot (b), V10's clerk)

Grepped V10 for every term, key and field the rulings change: the crossing table and its outcomes, the lock, bent-group
and fixed-place sentences, (G1)–(G3), `reshaped`, `refuse.raised.meeting`, `refuse.locked` at a meeting,
`W_RAISED_MEETING`, `raised.extendedPastBound`, `raised.waited`, `walls.waited`, `bend.raised.*`, `bend.wall.*`, the
state sweep, `laidAt`, `courseAt`, `stripMarginM`, the under-deck strip, fixed places, posterns, `gateMoved`,
`towerMoved`, UC18, T110-2 and T110-4, `spans/…/use`, `EditFate` and the fate kinds. Conformed, each in its block:

* **§7.1's T-V10-40** (E-V10-1's other end): "(T101-3 on the clerk's path)" → "(T101-3 on the clerk's path) —
  `span`'s on a span §2.7's laws read `open` too (law 1 (8); T-V10-41's c14 span): its path by the span's bounding
  piers' keys, its held `use` the event the canvas's enabled **Walled up as a vault** sends (V09 §4.20.6 (2))". E-V10-1
  defines a new encoder outcome: a keyed path, and a held `use` applied on a span read `open`. Without this clause, a
  build that bent that call away, or that wrote an ordinal path, would pass every V10 bar. That is an untested edge whose
  outcome the text defines, which R7-01 grades major.
* **§3.16** (E-D4's new row of §7.1's outcome table, keyed `refuse.raised.meeting`, reaching the clerk).
  * The lead's statement of what that table refuses gains "a meeting of a wall and a raised way that no lawful shape
    resolves (§2.7's laws, law 2 (c))".
  * The `rule` row's case list gains the same case, and its code list gains `refuse.raised.meeting`.
  * The routing itself was already generic. §3.5 step 3 maps any non-lock, non-dossier conflict to `rule`, and maps
    its row's buttons: V09's E-V9-3 row gives `button.chooseMarked` over `alternatives`, which becomes one `propose` per
    alternative, and `button.showWhy`, which becomes a `why`. It has no Unlock, as law 2 (c) requires.
  * The parenthesis of *The dry run's bends* ("J-VI.4, J-VI.30: item 101 R2 — a declaration is refused only where …")
    keeps its words. They summarise those integration decisions, and the same wording stands at the base and V03. Law
    2 (c) reads its refusal with the nearest lawful declarations as item 101 R2's.

Searched and standing:
* §2.12's `span` form (`{ n, use }`): the model writes an ordinal, which E-V10-1 maps to the span's keys.
* §3.23's row C7: its outcome stays true, and its tests (T-V10-42; T-V10-40) now hold the open-span case.
* §3.9's V04 `underground` owed row ("item 110's arch vaults with their span and its reason"): it lists only arch
  vaults V04 lays, and V04 lays none in a span read `open`.
* §3.5's card read (note 6).
* V10 states no crossing, gate, tower, aqueduct-form or lock rule. The family terms above have 0 hits beyond those named
  here, and the `bend.raised.island`, `bend.wall.newStretch` and `refuse.locked` hits are other families' rows.
* The *One rule for the rest* (J148, J149) finds no clause in any text written here.

## Hand-offs

None. Every other end of these texts is another unit's END this round: §7.1's binding row and `EditFate` (E-D15, E-D14;
determinism), §7.1's new refusal row (E-D4; determinism), V09 §4.20.6 (2) and §4.9's `refuse.raised.meeting` row (E-V9-8,
E-V9-3; V09), §2.7's laws at the support step (6) (E-M1; model).

## Checks

* **Dry run** (`docs/validation/amendments-b/apply-blocks.py`, unchanged, on a copy of the live V10 with the live
  rationale, the `=== FILE` routing line stripped for the single-document applier):
  * 5 of 5 blocks applied; audit 5/5 OK.
  * Headings 86 → 86; fences balanced, 24 → 24; title block unchanged; rationale unchanged.
  * Exactly 8 lines differ (585, 1686, 2394–2395, 2412, 2810, 3155–3156); output sha256 4988e5ae15e1….
* **Ids:** none added or removed. T-V10-1 – T-V10-53 are each defined once (53 rows before and after). §3.23's rows are
  unchanged in number. Every new pointer resolves to a live heading or a home this round writes: §2.7 (the laws, E-M1),
  §7.1, V04 §3.5.4 (d), V09 §4.20.6 (2), V10 §3.9, T110-2 (3), T-V10-41, and M6-U's U3 (V04 §8).
* **Design text scans** over the 8 changed lines: no review or ruling id (no R7-nn, PRB…, verifier id, J146–J151
  marker), no deferral wording, no phone.
* **doc_checks** (`--doc` the copy, `--heads docs/ARCHITECTURE.md`):
  * It printed: reference corpus INCOMPLETE (captures, research/patreon, research/devlogs, research/ftg-docs and
    research/external are missing), so the results are NOT authoritative and stand as PROVISIONAL. It exits 1 for the
    unreviewed C3 runs, as in every round.
  * Live → output: C1 0 → 0, C2 0 → 0, C4 0 → 0, S1 0 → 0. C3 hits 165 → 167, but the unreviewed runs stay at 146, an
    identical list; the two new hits are runs the allow file already reviews. S2 334/12 → 334/12.
* **Words** (wc): 83 281 → 83 569 (+288, +0.3 %). All of it is the defect fixes' design text: the why
  row's reading, the arch vault named, the two test clauses, and the refusal routing. No word was removed, so no shrink
  source applies and no cut over half needs a nuance audit. No content was thinned.

=== FILE docs/volumes/V10-clerk.md ===

=== REPLACE ### 2.6 The drawer's view model and the harness it drives (session memory; drawn by V09) ===
### 2.6 The drawer's view model and the harness it drives (session memory; drawn by V09)

```ts
interface TurnView { n: number; user: string; progress: string[] /* one plain line per step (V10 §3.1) */;
  reply: ReplyBlock[]; proposal?: ProposalView; refusal?: RefusalView /* the turn's own: a gate or the model's form (V10 §3.13 step 4) */;
  refused?: { item: string /* the DraftItem id */; refusal: RefusalView }[] /* every refused or conflicting item of the draft, in item order, with its ClerkRefusal's msg and actions — drawn with the proposal card, or alone when no proposal stands */;
  outcome: ClerkTurn['outcome']; costUsd: number }
type ReplyBlock =
  | { kind: 'text'; text: string }
  | { kind: 'entity'; id: Id; text: string; tier: FactTier; withheld?: true }   // a checked link (V10 §3.13): clicking selects it on the map
  | { kind: 'unverified'; text: string; why: 'name'|'claim'|'number'|'relation' }   // a span the grounding check could not tie to the map
  | { kind: 'action'; action: ClerkAction };
interface ProposalView {
  id: string; ai: true; source: Proposal['source']; reason: string; status: Proposal['status']; active: number;
  accepted?: { group: number; seqs: number[] };   // Proposal.accepted's group and seqs once accepted: Undo runs { kind: 'undo', group } (V10 §4.3)
  rebuild?: { seq: number };                  // an accepted removal once a later group follows (the harness's subscribe watcher, V10 §4.3):
                                              // Put it back runs { kind: 'rebuild', seq }, seq = accepted.seqs[0]
  variations: { n: number; label: string; previewId?: string; counts: { plots: number; households: number; buildings: number };
    fates: Record<EditFate['fate'], number>;   // keyed by EditFate['fate'], 'reshaped' among them (§7.1's EditFate; §2.7's laws, law 4)
    bends: { item: string /* the DraftItem id */; msg: MsgRef; actions: ClerkAction[] /* V10 §3.5 step 3's reading of the row's MsgRow.buttons; empty on a source 'host' proposal, whose card offers accept, drop and why only */ }[]; renames: Rename[]; findings: CritiqueFinding[];
    effects: { kind: Effect['kind'] /* item 465 */;
      text: string /* its MsgRef rendered under the key */; targets: Id[] /* key-filtered */ }[] /* ≤ 10, by kind then address */;
    effectsMore: number;                     // effects beyond the ten shown, counted
    lines?: { name: string; state: 'placed'|'bent'|'refused'; closest?: Id[]; actions?: ClerkAction[] /* a bent or refused line's row buttons by V10 §3.5 step 3's reading — refuse.roster.dossier's picker, Put it at {site}, Show me why */ }[] /* a roster's cards */ }[];
  actions: ('accept'|'acceptLines'|'retry'|'drop'|'why'|'undo'|'rebuild')[];   // source 'host': 'accept', 'drop' and 'why' only (V09 §4.11's card-only mode)
}
// label (J-V10.102): the button's words, rendered under the session's key — required on every kind but select; its sources are V10 §1b.1's label row
type ClerkAction =
  | { kind: 'propose'; label: string; events: WithoutBase<EditEvent>[] }   // a one-click alternative, itself previewed before commit
  | { kind: 'why'; id?: Id; page?: string; label: string }   // exactly one of id, page: the why card of id (V09 §5.8, read at the session's key), else the @plat/docs page
                                                     // page (V09 §5.9) — the target the canvas's Show me why opens for that row (V10 §3.5 step 3's target rule); run by the application
  | { kind: 'export'; format: string; label: string } | { kind: 'fork'; seq: number; label: string } | { kind: 'rerun'; seq: number; label: string }   // V06 §4.4; run by the application (V09 §3.9's forkAt, rerunFrom)
  | { kind: 'select'; ids: Id[]; label?: string }   // label: set when the action is a V09 §4.9 row's button (a bend's or an engine refusal's: Move it, Show the way in, Show them) —
                                                     // that button's text rendered under the session's key, so the card words it as the canvas does (T101-3) —
                                                     // or a V10 §3.16 alternative with its own clerk.alt key (the dossier row's (1) fallback, (3) and (5): a move is a
                                                     // selection the user drags, V09 §4.6); absent for V10 §3.16's role and knowledge rows, whose button the
                                                     // drawer draws as its ids' chips (V10 §5.4; J-V10.100)
  | { kind: 'openSettings'; label: string }
  | { kind: 'useTool'; tool: Exclude<ToolName, 'read_map'|'why'|'check_draft'|'critique'>;   // one of the twelve canvas tools (V09 §2.3's ToolId): the application
                                                     // activates a canvas tool, and the four read tools are none
      mode?: string;   // a ToolModeRow.id of that tool (V09 §2.3): the mode the button opens — 'access', T6's Below access mode, for Add a way down; absent: the tool as last used (V09 §4.2)
      ids?: Id[];      // selected before the tool is activated: a MsgButton with subject (V10 §3.5 step 3) or a refusal form's address; a contextual tool (T9, T10) acts on them
      label: string }                                // J-V10.107
  | { kind: 'find'; op: 'set'|'add'|'remove'|'clear'; chips: FindView['chips'] /* empty for clear */; gaps?: boolean; label: string }
                                                     // item 120: a view action — the application sets §2.9's view key find from it (V10 §3.9b (7)); never an event
  | { kind: 'undo'; group: number; label: string }                       // the last accepted clerk proposal's undo (V10 §4.3)
  | { kind: 'rebuild'; seq: number; label: string };                     // "put it back" after later edits: the removal group whose first seq is seq, rebuilt
                                                                         // from the events ClerkMount.rebuildEvents(seq) returns (V09 §2.10, by the rule of V09 §4.20.3 (4)), previewed as a proposal first (V10 §4.3)
interface RefusalView { category: RefusalCategory; text: string /* the catalogue text in the application's locale */; msg: MsgRef; actions: ClerkAction[] }

// @plat/clerk/core — the harness. V09 §2.10 declares ClerkSlot, ClerkMount (with its host channel) and ClerkHandle — every
// member the drawer and the settings call among them; this volume implements the handle and adds no member (J-V10.88).
declare function createClerk(mount: ClerkMount, opts?: { backend?: ClerkBackend /* tests: ReplayBackend */ }): ClerkHandle;   // V09 §2.10's handle; no alias, no member of its own
```

`ClerkHandle`'s members keep V09's meaning, fixed here where the behaviour is this volume's: `run` takes the harness's kinds
only — `propose`, `undo`, `rebuild` (the dispatch table below) — and rejects any other kind without effect, since the drawer
dispatches by kind before it calls `run`; `newTopic` closes the route's live segment (`'user'`, V10 §3.2); `setKey`
validates before storing and returns the verdict (V10 §3.19); `defects` and `clearDefects` read and clear the device's
defect store (V10 §2.8); `send` starts a turn at an
entry (V10 §3.1) — the `why` entry takes the attached `WhyAnswer` as a data block, `check` the attached skeleton, `roster`
the pasted text, and `attach.newMap` (V09 §2.10) marks a drawer message to be read in creation mode (V10 §3.1 (4)); `accept`, `acceptLines`, `retry` and `drop` are V10 §4.2 and V10 §3.11; `focus(proposalId, variation)` runs
that variation's own `preview` with the view (its ghost) — the "flip" of the drawer's chips; `stop` aborts the turn and
discards its draft; `close` closes the scratch, drops the session's memory and, with keep history off, its transcript;
`turns` yields a `TurnView` on every change of a turn; `usage` returns the tally. A host clerk's proposal (V10 §3.17)
reaches the drawer through the same `turns` stream as a turn with no user words and `source: 'host'`.

**Who runs a `ClerkAction`** — one dispatch table (J-V10.82). The drawer reads an action's `kind` and dispatches
before it calls anything; V09 §4.11's action list cites this table (CVR-V10-15).

| kind | run by | what happens |
|---|---|---|
| `propose` | the harness, `ClerkHandle.run` | its events previewed as a proposal of their own (V10 §3.11), committed only on Accept (V10 §4.2); the one exception is V09 §3.12's skeleton import dialog, whose **Fix** runs a finding's `propose` itself as the user's declaration, with no `proposedBy`, clerk or none (J-V9.90) — no application-run `propose` reaches `run`, so T-V10-44's dispatch clauses hold unchanged |
| `undo` | the harness, `run` | the accepted group's undo (V10 §4.3) |
| `rebuild` | the harness, `run` | **Put it back**: the events `ClerkMount.rebuildEvents(seq)` returns (V09 §2.10, by the rule of V09 §4.20.3 (4)) previewed as a proposal, committed on Accept (V10 §4.3) |
| `select` | the application | the ids selected on the map (V09 §4.11) |
| `find` | the application | the Find panel's chips set from the action — `set` replaces them, `add` and `remove` change them, `clear` empties them and turns Show gaps off; `gaps`, when given, sets the Show gaps switch — §2.9's view key `find` (item 120; V09's Find panel), the panel opening on them; run once when the reply is complete (never again on a redraw of the turn), then on each press of its button; nothing logged or hashed (V10 §3.9b (7)) |
| `why` | the application | the why card of `id` (V09 §5.8, at the session's key), else the Help page `page` (V09 §5.9): what the canvas's **Show me why** opens for the same row (V10 §3.5 step 3) |
| `openSettings` | the application | the settings' Assistant section (V09 §5.12) |
| `useTool` | the application | that tool active in `mode` (else as last used) on that mode's working layer (V09 §4.2), its `ids` selected first, with its options strip (V09 §4.11) |
| `export` | the application | the export dialog on that format (V09 §5.10) |
| `fork` | the application | **Open a copy from here**: `forkAt(h, seq)` (V09 §3.9) |
| `rerun` | the application | **Re-run from here**: `rerunFrom(h, seq)` (V09 §3.9) |

The harness needs no callback for the application's kinds: it only places them in reply blocks and cards.

**The card's buttons**. Each `ProposalView.actions` value maps to one call: `accept` → `ClerkHandle.accept`,
`acceptLines` → `acceptLines`, `retry` → `retry`, `drop` → `drop`, `why` → the application's why card of what the
proposal makes, `undo` → `run({ kind: 'undo', group: accepted.group, label })` and `rebuild` → `run({ kind: 'rebuild', seq:
rebuild.seq, label })`, their labels V09 §4.9's shared `button.undo` ("Undo") and `clerk.alt.history.rebuild` ("Put it
back"), the words the same actions carry as reply blocks (V10 §3.13 step 4; J-V10.102, J-V10.112). Every card words `retry` as **Ask
again** (`clerk.alt.stale.retry`, V10 §3.11), "Try again" being New random's label alone (V09 §4.9). The harness offers
`undo` from acceptance on — to an `editor`'s session only while the group is the session's latest live group (V10 §4.3)
— and adds `rebuild` to an accepted removal's card when its
`subscribe` watcher sees a later group land (V10 §4.3). A host's card offers `accept`, `drop` and `why` only — the host's
assistant re-proposes on its side — and is answered once, when it closes (V10 §3.17; V09 §4.11).

**The bridge, through the mount only** (J-V10.88). In host mode the harness's one channel to the bridge
is `ClerkMount.host` (V09 §2.10), which the embed's bridge handler fills (V08 §3.1); the harness imports nothing of the
bridge and posts no message itself (J-V9.81). `config()` at mount and every `onConfig` notice give the latest
`clerk.config` body — its mode (the forced `enabled` and `backend` of `ClerkSettings`) and, for configuration B, the
transport with its `fallbacks` (`HostProxyBackend`, V10 §2.11) and `capUsd` (the meter, V10 §3.18); `needsToken()` is
called `network.tokenRefreshLeadS` before the transport's `expiresAt` and on an authentication failure (V10 §3.17,
V10 §3.19); `refused('origin')` for a transport the allowlist or the connect rule refuses; `proposals` yields each host
`preview { proposal }` to the intake (V10 §3.17); `answer(id, status, seqs)` reports the user's choice, which the handler
posts as `clerk.proposal`. Standalone, `host` is absent and none of this runs.

=== END ===

=== REPLACE ### 3.9 The oracle at depth — providers, sections, the solver's explanation and the field's drivers ===
### 3.9 The oracle at depth — providers, sections, the solver's explanation and the field's drivers

**The query.** `query({ kind: 'why', id, path?, mode?, historyPage?, view? })` finds the entity's kind in the registry, calls
that kind's `WhyProvider` (item 270) — or, for a kind with none, the **generic provider** — over the committed model
with the caller's key and, for a view-bound why, the view's state and `looks` answer (`opts.view`, V10 §2.13), then appends the rows of every registered `WhySectionProvider` whose `appliesTo` holds for the
entity, in registration order — each passed the same `opts.view` — and returns the `WhyAnswer`. The facade then applies §11.2's oracle rules (1)–(4) and item
468's three knowledge rules (§11.2; V10 §2.13) **generically**, to every field and every section row, so no provider can leak: a withheld target
returns `{ id, kind: <registry kind>, withheld: true, mode, facts: [], cause: [], evaluated }` and nothing else; any other
withheld place inside the answer — a pull's target, a link's other end, an alternative site's use, a section row's `ref`
— appears by address and registry kind with `withheld: true`, its row id replaced by `fam/<family>` and its good
removed; a row marked `purpose: true` whose entity is withheld is dropped; a concealed use the key does not admit, and an
unexcavated element below `secret`, is absent from every list and uncounted, and a `why` on one of its parts returns the
empty answer an unknown address returns; a front's `why` is the answer the solver's explanation gives for the front's
class alone at that plot. **A removed thing**: an address whose entity a live `delete` tombstoned answers `{
id, kind: <its registry kind>, mode, facts: [], cause: [{ step: 'delete', rule: 'removed', slices: [], seq }], history,
evaluated, removed: { seq, week, by } }` to a key that admitted the entity before its removal, with the `raised`
section's `suppressed` row for a generated raised way; a key that never admitted it gets the unknown-address answer.

**The generic provider** (this volume's; item 270) answers any registered kind: `facts` from the registry's readable
paths (each with its tier and, for a dossier-derived fact, its DR row), `cause` from the kind's latest lifecycle event
(§2.8) and its derivation record's slices, and `history` from the lifecycle block, newest first, a page of
`limits.historyPage` entries with `historyMore`.

**The default providers** (this volume's, for the base kinds; the volumes register theirs, table below). One provider
answers a kind at a time: a volume's provider registered for a base kind takes it over from that volume's milestone —
V01's `RetainingWall` from M5, V06's `Enceinte` from M6-E — and this default answers it until then (J-V10.120).

| kind | `facts` | `cause` | the rest |
|---|---|---|---|
| a `Use`, a building, a plot | class, use, band, name, each with its tier and, for a dossier-derived fact, its DR row; a design above its rung's grandeur ceiling as V09's `info.grand.beyondTier` (tier `declared`) or `info.grand.dossier` (tier `dossier`) (item 115; V10 §3.9b (4)) | the event or stage that placed it: its latest `place`, `open`, `relocate`, `assign` or `mutate` lifecycle event (§2.8), else S10b at generation; the derivation record's slices | `pulls`, `alternatives` and `links` from `PlacementSolver.explain({ item, at: plot, mode, candidates: { district, k: 3 } })`, each pull with its sentence (`says`) and each link with its `siting.linkEdits` state (`declared`); `profile` for a custom use from its stored resolution (item 104 (a)); `members` for a collective or ladder record's use (item 108); `history`; `evaluated` (step 4 of the solver's explanation, below) |
| a district | name, kind, identity, band, band range, the character's components | S6's seed kind and grower, or its declaring `quarter` or `drawBoundary` event; S12c's identity with the quarter identity row that won (item 72); on an arid site the growth field's water pull that drew it (S3 (6), item 111 (b)) with its climate row | `drivers` averaged over its plots for `path` `prosperity` or `band` (item 102 (f)); `history` (renames, epochs) |
| a way | class, width, name | S4's route and the destinations it joins, S5's growth, or its `drawWay` | `history` |
| an enceinte, gate or tower | kind, closure, the stretch profile; each run's condition and material with its last change (§2.7, item 114) | S3 or S5a's trace from its stage boundary, its gate law, or its `drawWall`/`placeGate`; each run's generation-time condition from §7.7's DR41 — the town's defence readiness and wealth at the table's shares (item 114 (d)) — or the event that last changed it (`repairWall`, `wearWall`) | `closure`: each arc a barrier closes with its barrier and defensibility class (item 106 (g)); for a gate, the road that crosses it; each run worded by V09's `info.wall.run` (V10 §3.9b (3)) |
| a water body | kind, level, bank class; an oasis's `spring` with its `flow`, its grove and gardens by `fedBy` (§2.3, item 111 (a)) | S1 by descent — an oasis by the arid row's chance — its `drawWater` (T2 `ground`'s spring flag for a drawn oasis), or a dossier's `oasis_water` (DR40, tier `dossier`) | DR1 for a dossier site; for an oasis, that it is water to every rule that reads water (V10 §3.9b (1)) |
| a name or label (`path` `name`) | the name, its display text, its tier | S13a's draw with its naming record's slices, a claim (item 82), the dossier's name, or the rename event | — |
| greenery | kind, density | S12b's rule row | — |
| a plot's prosperity (`path` `prosperity`) | value, band | the field's two passes (§4.5) | `drivers` at the plot's sample points, with the daylight term's `sources`, the water term and the climate cell (`climateSun`; item 111 (b), (c)) |
| a raised way (viaduct, raised road, aqueduct; item 110 (b)) | kind, class, deck height, length, spans with their use, supports, the part-0 ways it crosses (key-filtered, ≤ `limits.members`), an aqueduct's source and terminal | **generated:** `rule: 'raisedWay'` with the reason kind and its values from the creation event's `detail.why` (V06 §3.19 (8)) — a viaduct's drop against `viaduct.minDropM` and the metres saved against span length × `spanCostFactor`; an elevated road's two ends, the lower district, the mean prosperity and the dossier landmarks counted; an aqueduct's need ratio against its threshold, its source and the source's reach — with the gate's chance and the rung's cap at the generation or epoch that built it; **carried:** "built in year {n}, when {town} was a city" (a generated way standing below CITY); **declared:** its event, "declared by you" (at TOWN and below the only source) | the `raised` section (below); each span's use with its reason (`open` by way, water, flood, tall, low, slope or land; `vault`; `user`) from the base's span record, a `vault` span naming its arch vault where V04 §3.5.4 (d) lays one — but a span §2.7's laws read `open` is told `open` while they read it so, with what lies under it in V09 §4.20.6 (2)'s words, whatever its recorded `use`, and no arch vault named in it (§2.7's laws, law 1 (8); its worked example *beneath*; V09 §4.20.6 (2)) |
| a `RetainingWall` (item 110 (a); V01 §4.5's provider from M5, the same rows) | step range, material, towers or buttresses, high side, source | **generated:** the levelled block, plot or ward, its slope against `terrace.slopeMin` and its step against `terrace.stepMinCm`, by S10 or S11 or the terraced district's edge row; **drawn:** its `drawWall`; **a terrace's:** its `terrace` event | each way that crosses it, "by a stair" or "by a ramp", with the way-class rule by slope |
| a deck plot, and a building on one (item 110 (d)) | the deck, its kind and host way, the budget band and `maxFloors` (V02's `massing/deck`), a landmark slot's `head` or `mid` | the deck's plotting at S10, or its `placeAt` | "falls with its deck"; a refused class's or storey's bend |

**Owed providers and sections** (the completeness test of item 270 checks a specific provider or section provider for
exactly these; every other kind is answered by the generic provider; J-V10.48):

| kind or section | owing volume | provider | what it adds |
|---|---|---|---|
| `district.fabric`, `block.content`, `block.squareType`, `HoodPlace`, hood pins, `district.terrace`, `RetainingWall` (from M5), `district.raised` (the under-deck strip); section `fabric` | V01 | V01 §4.5 | the fabric pick, quotas, the siting pushes as pulls of V11's families, the naming feature, the pin's gate; the terrace state and its source; a wall's producer, slope and step and each way that crosses it; the raised way over an under-deck strip with its reason |
| `building` paths `massing`, `wings/<key>`, `composition`; section `massing` | V02 | V02 §4.5, V02 §4.6 (6), V02 §4.6 (7) | the massing family, its rows and alternatives, the rejected tower; item 110's stack facts `massing/stack/*`, `wings/<key>/on`, `wings/<key>/solid`, `massing/stairSteep`, a deck building's `massing/deck`, and the facts `massing/bend/<id>`, `stack.grade` and the derived aspect, each bend of V02 §1b worded by its V09 §4.9 row |
| `room`, `building` path `plan`; sections `plan` and **`crypt`** | V03 | V03 §4.6 | the programme rows and owed rows; the crypt (V10 §3.9a); item 110's room causes (`info.plan.cause.<cause>`: `landingDoor`, `terraceDoor`, `terraceExit`, `seatingExit`, `walkOut`, `tombDoor`, `gradeFace`, `deckNoCellar`, `stoop`, `exposure`, `stackCarried`) and `PlanReport.notes`' `shrineOneRoom`, `solidMonument` and `stackCarried` (`info.plan.note.<id>`), their words V10 §3.9a's `plan` table; item 123's damage rows (`info.damage.*`, V09's words; V10 §3.9a) |
| underground systems, `AccessPoint`, `UndergroundLink`, `RuinRecord`, `CatacombComplex`, void clusters; section **`underground`** on burial faces, buildings over a void and districts above a ruin | V04 | V04 §4.5 | V10 §3.9a; item 110's arch vaults with their span and its reason, a ruin's stepped monument (tiers laid, standing, truncated), an aqueduct's terminal cistern, a void met by a support's footing ("the builders filled what they met"); item 113's `lost` clusters and buried former settlements |
| `SkyIsland`, `SkyAccess`, the `fallen_island` decoration; section `island` on shaded ground | V05 | V05 §4.5 | the island's gate, reason, strip and supply; per-island daylight `sources`; "removed by you", "raised clear of the aqueduct", "clearance held by your lock", "held without its institution" and "not yet in the ground's shade" (V05 §4.5) |
| `Use` (lifecycle `detail.why`), `Enceinte` (pathway, from M6-E), `district` path `prosperity` (`FieldDrivers.since`), `MutationPlan`; section `move` | V06 | V06 §4.5 | the recorded move reasons, the wall's pathway and each run's condition, material and last change (item 114), the shade since year N and the water term's fall ("the spring failed in year N"), a re-plan under the grandeur ceiling; a raised way built at an epoch, a slumped retaining wall, a struck deck |
| the village records (`VillagePlan`, `VillageField`, `VillageEnd`) | V07 | V07 §4.5 (its `info.village.*` rows; T-V7-61) | the heart's terms, a field's system, an end's reason; a house-platform wall; arches carried from when the place was larger |

The section names V09's why card renders (V09 §2.7) are exactly those in this table's first column and this volume's
`raised` and `history` (V10 §3.9b (2)).

**The `raised` section** (this volume's `WhySectionProvider`; J-V10.74). It applies to a raised way itself; to a
part-0 primary or secondary way that crosses a ravine or valley feature; to a spring, or a river reach within the
`raisedWays` row's `sourceReachKm`; and to a high ward, a terrace district, a citadel's or a great temple's reservation.
Its rows come from `raisedOutcome(model, subject)` (item 290), the single-subject read of V06's `RaisedWayLedger`: one
row per reason key the subject takes part in, evaluated for that key alone, so the answer and the generator agree by
construction. V06's candidate outcomes map to the section's: `admitted`, `repaired` and `standing` → `built` (→ `carried`
when the rung now stands below CITY), `rung` → `belowCity`, a key whose reading misses its bar → `reasonNotMet`,
`noCourse`, `chance`, `cap`, `suppressed`, and `capsCannotPay` → `waited`; the ledger's `declared` list → `declared`.
Every row's words are one catalogue key `info.raised.<outcome>`, as V10 §3.9a's are:

| outcome | words (the `en` text) | values shown |
|---|---|---|
| `built` | "the {town} raised {way} here: {reason}" | the reading and its bar; a `ref` to the way |
| `declared` | "you declared {way}" | the event's week |
| `carried` | "built in year {n}, when {town} was a city" | the creation week |
| `belowCity` | "{town} builds them only as a city; you may draw one" (at a village rung: "villages never build them; you may draw one") | the rung |
| `reasonNotMet` | "{reason} falls short: {value} against {threshold}" | the reading and its bar |
| `noCourse` | "no course the arches could take" | — |
| `chance` | "the rules gave it none this time" | the gate's chance `p`, shown as J-V10.23 shows the chance term |
| `cap` | "{town} has {count} of its {cap}" | the rung's count and cap |
| `suppressed` | "you removed it in week {w}; the town will not rebuild it" (one key with V08's history panel, V08 §4.6) | the removal's week and `seq` |
| `waited` | "the city could not yet afford the course" | the strength against the cost |

**Tiers and knowledge of a reason**. A dossier record a reason read — the water-system record, a
landmark on high ground (V10 §1b.5) — appears as a `facts` row of tier `dossier` with its DR row; the raised way's own
existence is tier `map` (generated) or `declared`, so prompt rule 6 never makes the clerk refuse to remove a generated
way. A reason row that names an institution — an elevated road's landmarks, an aqueduct's conduit-house terminal — is a
`ref` row under §11.2's withheld rule (item 468; V10 §2.13), `purpose: true` where its words name the class. An arch vault's
building, its use and its stored plan follow V04's and V03's knowledge rules in the `underground` rows and in the
effects list.

**The solver's explanation** (`PlacementSolver.explain`, item 311) decomposes S10b's own score read-only, as §4.7 S10b
states it — its inputs, its lazily built rasters, every hard row and soft term, the chance term recomputed without
advancing a stream, the top candidates and the links. This volume fixes the placed set, the shares, the candidates' form
and drift:

1. **The placed set** (J-V10.44). S10b places sequentially — claims first, then item 105 (f)'s anchors-first order with a
   bounded relaxation pass — and its coverage, competition, spacing and supply terms read the members already placed.
   `asPlaced` scores against the members as they stood when the item was placed: from the item's `PlacementOrder` (BCR-
   V10-15), the committed uses whose own order `(seq, k)` precedes the item's, plus every member fixed before that run;
   for a `pass: 2` item, the run's whole placed set less the item, as the relaxation pass scored it. `asNow` scores
   against every committed member. `why` on a placed use defaults to `asPlaced`; `sites` and the `drifted` test use
   `asNow`. `exact` is true when no use in the item's scope has a lifecycle event (`place`, `open`, `close`, `relocate`,
   `assign`) with a `seq` after the item's placing `seq` (so the placed set is reproducible) and the item carries its
   `PlacementOrder`; otherwise the answer is the `asPlaced` reading over the members that still stand, marked `exact:
   false`.
2. **At the plot.** Each term's signed contribution grouped into `WhyPull` families by V10 §2.13's mapping, each with its
   sentence — the district allocation's term being S7b's row with item 105 (g)'s supply term; shares are each term over
   the plot's total score; a cross-arena term names its landing (`via`, V05 §3.20).
3. **Candidates and links.** The top `k` other plots of the scope by the same score in `asNow` mode, among those with
   capacity for the item (S10b's own pre-filter), each with its hard fails and its five largest pulls; the item's supply
   links as S10b binds them — each consumer to its nearest provider of the good (item 105 (a)) — with the good, the other
   end, the distance, the good's `comfortM` and `maxDistanceM`, the class's orientation, a split pair's `branchOf`, a
   `siting.linkEdits` row's state and an active chain's status.
4. **Equivalence and drift.** On an untouched generated town (`exact` true), `explain`'s `asPlaced` score at a placed
   plot equals the score S10b computed when it placed the item, to the last bit (T-V10-9). `drifted` is true only when
   an `asNow` candidate's score beats the plot's `asNow` score by more than `explain.driftMargin` (0.05 of the scope's
   score range, the solver's own parameter, item 311; own); `driftCause` then names why ("a second bakery opened nearby
   since"). A survivor is never re-rolled for it (§4.11). **Pre-decided fallback** if the order index cannot be recorded
   at M3a: the answer is `asNow` only, the bit-exact claim is dropped, and T-V10-9 checks that the shares sum to 1 within
   10⁻⁹ and that the chance term equals its draw.

**The field's drivers** are §4.5's `ProsperityField.drivers(points)` (item 297), sampled at a plot's centroid or at a
district's plot centroids: every term of `P(x)` apart — the daylight term with V05 §4.5's per-caster `sources`, the water
term and the climate cell (item 111 (b), (c)) among them — summing before the clamp to the stored value (T-V10-10). V06's
`district` provider fills `since` from the shade masks of the history frames ("the island's shade since year N") and the
water term's fall ("the spring failed in year N").

=== END ===

=== REPLACE ### 3.16 Refusals with alternatives ===
### 3.16 Refusals with alternatives

Every refusal is one sentence in plain words and at least one thing the clerk *can* do, as a button (`ClerkAction`),
except where nothing can be offered (`model`, `offline`, `host`) and for `knownWork`, whose turn goes on. The engine's
refusals come from the dry run — §7.1's dry-run outcome table, which refuses a dossier fact or a lock (item 101 R2),
the availability gates its rows name (J-VI.4) and a meeting of a wall and a raised way that no lawful shape resolves (§2.7's laws, law 2 (c)), and bends every other case, and §5.2's F-EDIT row citing it, with its actions and closest options as `MsgRef`s — and from §11.2's `advance` gate on a dossier-bound document
(`refuse.dossierClock`, outside the dry run; V10 §4.1), and are worded by that `MsgRef` alone — V09 §4.9's `refuse.*` row for the code, one sentence per engine code on canvas and clerk (J-V9.79,
J-V10.93) — so the `dossier` row's engine cases, the `lock` row and the `rule` row add no English of their own (J-V10.94), and the `role` row renders `refuse.viewer`, the sentence every viewer declaration answers on the canvas
(V09 §2.10); their buttons become actions by V10 §3.5 step 3's reading of the row's `MsgRow.buttons`. The clerk's other
refusals come from the harness's gates (`budget`, `key`, `offline`, `host`; `role` on a viewer's declaration;
`knowledge` on an id the key withholds, V10 §3.5) and from the model's refusal form, `[[do:refuse:<category>]]` (V10
§3.13 step 4; prompt rules 6 and 10). The rows are `clerk.content.refusals`: each category with its own alternatives —
each worded by a key `clerk.alt.<category>.<n>`, shown in the column below as (n) with its `en` words quoted, `<n>` its
number in the column, kept when an alternative is retired (J-V10.102) — and, where the clerk words the refusal itself, its key in V09's catalogue
(`refuse.clerk.<category>`, with `refuse.clerk.dossier.count` and the `key` row's `refuse.clerk.key.<keyState>`; none for
`lock`, `rule` and `role`, V10 §2.10). An own alternative whose events equal a dry-run button's is shown once, with the
button's words. The English text below is the shipped `en` locale:

| category | when | what the clerk says (template) | the alternatives offered |
|---|---|---|---|
| `dossier` | an engine `dossier-owned` refusal; the user asks in words to add, remove, rename or re-designate a dossier element (the model's form `[[do:refuse:dossier:<id>]]`, prompt rule 6); or asks for a new place of a class whose count a dossier record owns (`[[do:refuse:dossier:count:<id>]]`, J-V10.70); a roster line or a place by a locus that names no element (§7.1's roster rule); an `advance` asked on a dossier-bound document (V10 §4.1's T1 `intend` row) | an engine `dossier-owned` refusal renders the dry run's `MsgRef`, V09 §4.9's row for the code — `refuse.dossierOwned`, `refuse.dossierRemove`, for a roster line or a place by a locus naming no element `refuse.roster.dossier`, and for an `advance` on a dossier-bound document `refuse.dossierClock`, the outcome of §11.2's `advance` gate rather than of the dry run (each text written once, in V09's catalogue, J-V9.79), its slots filled by V09 §4.9's row (J-V10.93); the clerk's own sentences serve only the model's form, which no engine code words (prompt rules 6 and 10): `refuse.clerk.dossier` "SettlementForge keeps this town's record; the map can move places and show other names, but not change the record." · `refuse.clerk.dossier.count` "SettlementForge sets how many of these {town} has; the map can move one of them, but not add another." (`{town}` the brief's settlement name; slot-free otherwise, since the form names no element; J-V10.104) | engine cases — the row's buttons by V10 §3.5 step 3, kind-aware: for a use, building or plot, `refuse.dossierRemove`'s **Move it** (a `select` of the thing, its handles drawn — the user drags it, V09 §4.6) and **Not here** (a `propose` of `rejectSite`), and `refuse.dossierOwned`'s **Show a different name** (the `setAttr displayText` `propose` with the words the user asked for, under that button's words; without words, the button's `useTool` of `name` in its mode with the thing as `ids` — V10 §3.5 step 3); for a dossier-declared way or wall (a raised way V08's declaration row made), in place of those buttons, (1) "Move it" — a `propose` of the `road` or `wall` re-declaration of its course through the anchor the request named, else a `select` of the way or wall (its handles drawn, V09 §4.6, which the user drags) — never `rejectSite` or `placeAt`; for a roster line or a place by a locus naming no element, `refuse.roster.dossier`'s element picker — the dossier's unplaced elements (§7.1's roster rule), each a `propose` re-previewing the line with its `element` (V10 §4.1's `element` row), worded by that button with the element's admitted name (V10 §3.5 step 3; the former own alternative (2) is retired, since the row's own button now words it) — and its **Put it at {site}**, the same place on the first candidate with no `hardFails` of V10 §4.1's dossier-alternative `sites` query (V09 §4.5's, one text for canvas and clerk), encoded as `where.plot` (a map fact; J-V10.18, J-V10.80) — not offered when none of its candidates is free of hard fails, the unplaced elements remaining; for `refuse.dossierClock`, its `button.whatIf` — a `fork` at the head (`seq` the user's document's last event), the copy detached (V06 §4.4), the one `app` button a clerk card meets (V10 §3.5 step 3) — and its **Show me why** (a `why`). The model's form (V10 §3.13 step 4): `dossier` — (3) "Move {thing}", a `select` of the form's `<id>` (`{thing}` its admitted name at the session's key, else its `withheldWords` word), offered only when the form names one, and (4) "Show another name on this map", a `useTool` of `name` in mode `rename` (the mode of `refuse.dossierOwned`'s **Show a different name**, V09 §4.9) with the form's `<id>` as `ids` when it names one; `dossier:count` — (5) "Move one of the existing ones", a `select` of the form's `<id>`, one existing place of that class (J-V10.70); a `dossier:count` form without an `<id>` is read as the `dossier` form, its sentence and (4) (J-V10.107) |
| `lock` | an F-EDIT naming a lock or pin — `refuse.locked`, `refuse.water`, `refuse.warp` (§7.1's first row) | the dry run's `MsgRef` — V09 §4.9's row for the code | the row's buttons by V10 §3.5 step 3 — **Unlock** (a `propose` of the unlock), the closest acceptable declarations that leave the locked thing untouched (each a `propose`, one per alternative of the preview: V09 §4.9's `button.chooseMarked`, **Choose another of the marked places**; item 101 R2) and **Show me why** (a `why`); no own alternative |
| `rule` | an F-EDIT that is neither dossier-owned nor a lock's or pin's and that the dry run does not bend — an availability gate or conflict of §7.1's outcome table (a kept record in the way, a staged layer, the rung of §7.1's islands row, an undo's dependence, an assignment holding the target, an invalid `editTable` row, a meeting of a wall and a raised way that no lawful shape resolves (§2.7's laws, law 2 (c))) — a placement no plot fits, one over its disruption budget, an occupied join or split and an invalid value are bends, below (file f item 582; J-VI.30), and so is a sky quarter declared below CITY, which reaches the card as V05 §3.23's `bend.island.belowCity` | the engine's `MsgRef` — V09 §4.9's `refuse.*` row for the code (`refuse.kept`, `refuse.staged`, `refuse.islandsRung`, `refuse.undo.*`, `refuse.assigned`, `refuse.table.invalid`, `refuse.raised.meeting`) — as its sentence | the code's actions (the row's buttons) as `ClerkAction`s, by V10 §3.5 step 3's reading of `MsgRow.buttons`; no own alternative |
| `role` | a viewer asks for a change (every declaration tool answers `role`, V09 §2.10) | the engine's `MsgRef` — V09 §4.9's `refuse.viewer` | the row's **Show me why** (a `why`, by V10 §3.5 step 3); (1) "See why {thing} is here" — a `why` action with the thing's `id` (the declaration's target; `{thing}` its admitted name or its `withheldWords` word), offered when the declaration names one; and a `select` of it (its chips, J-V10.100) |
| `knowledge` | the reader withheld what the user asked about | "That place's name isn't known in this view." | a `select` of it on the map (its chips, J-V10.100) |
| `picture` | a request for an image, a painting, an illustration | "I don't draw pictures; I build the map, which you can style and export." | (1) "Style the map" (`useTool`, `tool: 'dress'`); (2) "Save a picture" (`export`, `format: 'png'`, V09 §5.10's Picture tab) |
| `scope` | a request unrelated to the map | "I can only help with this map." | (1) "Open {tool}" — a `useTool` of the canvas tool the model's form names, else `intend` (V10 §3.13 step 4) |
| `knownWork` | a request to copy a published map or setting by its names | "I'll build a town with that shape and give it names of its own." | continue with the structure (the turn proceeds; no button) |
| `budget` | the month's or the turn's cap reached | "This month's assistant budget is used up." | (1) "Change the limit" (`openSettings`) |
| `key` | the key is missing, not valid, out of credit, or not permitted the model (V10 §3.19) | "That key isn't valid." · "The AI service has no credit left on this key." · "This key can't use the assistant's model." (the service the deployment's AI setup names, J121) | (1) "Change the key" (`openSettings`) |
| `offline` | no connection, or the provider unavailable — the one sentence for an unreachable clerk (V09 §3.14) | "The assistant is offline; every tool still works." | — |
| `host` | the host's configuration is refused (an unlisted origin, V10 §3.17) or its token not renewed | "The assistant isn't available in this host." | — |
| `model` | the provider declined the request after its fallbacks | "The assistant couldn't help with that request." | — |

**The dry run's bends** (**J-VI.4**, **J-VI.30**: item 101 R2 — a declaration is refused only
where it contradicts a dossier fact or a lock, and every other infeasible one is bent). Every `bend.*` row of V09 §4.9 —
item 110's (`bend.raised.island`, `bend.aqueduct.uphill`, `bend.retaining.rim`, the massing set of V02 §1b —
`bend.tiers.*`, `bend.stack.*`, `bend.deck.*` and the rest, which V02 owns — and the rest of V09 §4.20's), V05's island
lines (every `bend.island.*` row of V09 §4.9 — `keepRoom`, `rimStop`, `handMax`, `belowCity`, `join`, `lastAccess`,
`footMoved`, `accessKind`; V05 §4.2, V05 §3.23), V06's line for a standalone neighbourhood document's clock
(`bend.hood.noClock`, "a neighbourhood alone has no history yet — open it in its town to advance time", V06 §4.1), item
114's `bend.wall.newStretch`, file f item 582's (`bend.place.noSite`, `bend.place.overBudget`, `bend.vacate`),
`bend.invalid`'s clamp and every other — reaches the model and the card as the item's `bent` line (`DraftItem.bent`,
`ProposalView.variations[].bends`), its buttons as actions by V10 §3.5 step 3's reading of the row's `MsgRow.buttons`
. A `commit` button is a `propose` carrying the events the canvas's button for that row commits,
previewed before it commits. One from the preview's `alternatives` is one `propose` per alternative, in two cases: for a
placement bend, plots (item 463), each `placeAt { plot, designation }` by V10 §4.1's `where.plot` row, worded by the
button's `each` (`button.putAt`) with that plot's site; for `bend.under.accessDug`, the further buildings item 372's dug-access rule qualifies (as
reconcile-V09-r2 widened it; V09 §4.17.4), each a `propose` of the group
`[addUndergroundAccess { building: that building }, the item's declaration]` with no `target` on the access, so
item 372's grouped-access rule sets it — the bytes of V09 §4.17.4's **Use another building** for that building, at most
three, in the dry run's order (plan distance, then address), each worded by the button's `each`, V09 §4.9's `bend.under.accessDug` row's list form (`button.digDownFrom`, "Dig down from {building} instead"
(e)), `{building}` the building's name read at the session's effective key, or its `clerk.content.withheldWords` word
when it has none or the key withholds it (J-V10.98). The other commits carry the events their row names,
such as "Draw a road to its foot" for `bend.raised.island` (V09 §4.20.2 (6); J-VI.4 (d)) and **Stairs along the
front** for `bend.tiers.internal` (V02 §4.6 (1)). A `show` button is a `select`: `bend.under.accessDug`'s and
`bend.under.accessOpening`'s **Show the way in**. A `why` button is a `why` with the canvas's target (a bend row's page:
the guide page of its key, V10 §3.5 step 3): `bend.under.accessOpening`'s **Show me why**, that row listing no building,
and `bend.under.noAccess`'s. A `tool` button is a `useTool` in the button's mode: `bend.under.noAccess`'s **Add a way
down** is `useTool { tool: 'place', mode: 'access' }`, T6 `place`'s Below access mode as V09 §4.9's `button.addWayDown` names it
(CVR-V10-20). Each is labelled with its button's words, so the card carries every button of the row,
as the canvas's does (T101-3). No refusal category is used. An uphill aqueduct's bent result is the well
at its terminal itself (V09 §4.20.2 (5); J-VI.4 (h)), so no well is offered beside it. `bend.vacate`'s demolition is a fate the card lists and acceptance confirms (V10 §4.2 (1);
item 31), and its **Keep {building}** (a `drop` button) withdraws the item: on the card it is the proposal's **Drop** where the item is the proposal's only item, and inside a proposal holding other items a `propose` of the active variation's events without the bent item's, worded by the button (V10 §3.5 step 3),
and in words ("keep the mill") the model drops the item with `check_draft`'s `drop` — never a `propose` with no events. Prompt rule 10 tells
the model a bent item is not refused. A removal is never a
`dossier` refusal unless the thing is dossier-declared: a dossier-backed element becomes `rejectSite` (§7.2) and the card
says so, and a generated raised way whose reason read a dossier record is generated content and is removed (V08's
declaration rows own only the ways a dossier declares).

A concealed use is never the subject of a refusal: for a viewer who may not know it, it does not exist, so "is the
tannery a front?" is answered from the front's own `why` — a tannery — and never with a refusal that would reveal
that something is hidden (item 63 (c)). The same holds for an unexcavated void below `secret`: "is there anything under
the town?" is answered from what the key admits, with no hint.

=== END ===

=== REPLACE ### 4.1 The encoders — each tool's input to its events ===
### 4.1 The encoders — each tool's input to its events

`ToolEncoder.encode(input, doc) → WithoutBase<EditEvent>[]` (in `@plat/clerk/core`): anchors resolved by V10 §3.6
against `doc` (the scratch while a draft exists); every event one of the kinds its tool's rows of §7.1's binding home,
or one another tool homes that the same mode emits on the canvas too (`toolkit.json`'s `emits`, V09 §2.3; §7.1) — a
named place's `setAttr` (T101-1, T101-2); an input's `events` array passed through after its `zod` check. Points forms are left for the
dry run to derive (§7.1), so the scratch and the user's document derive the same shapes; a geometry field the dry run
resolves is written empty in the points form, as §7.1's points-form bullet states — `points: []`, `boundary: []`, `add: []`
— and a `placeAt`'s `plot` as `''` (item 367). A reference to what an earlier event of the same draft created is a
`CreatedRef` (V10 §2.4); a name travels inside the creating event wherever its kind carries one (the `quarter` sugar
and the `roster` sugar, a place by a locus included), so the placeholder forms are few: `placeAt`'s name and specialisation, a created raised way's name or span use, and a
created stepped building's tiers — `CreatedRef` kinds `use`, `way` and `building` (J-V10.45, J-V10.76). Item 110's
forms are declared only when the user's words ask for them (V10 §3.3 rule 16); their event shapes are item 362's, one
text with V09, cited and never restated.

| tool | input | events |
|---|---|---|
| T1 `intend` | creation mode | the draft's `Blueprint` (§4.2 S0), routed by `LadderRouter.route(population)` (V10 §3.7): `population` → `size.population` (the rung follows, §1.1, V07 §2.1); `form`, `wealth`, `planned`, `defence`, `density`, `era` → `intent` (§7.7), and at a village rung `form` → `village.form` (V07's `PlanForm`); `water` → `intent.water` and the site request's coast and river, at a village rung `village.water`; `fieldSystem`, `palisade` → `village.fieldSystem`, `village.palisade`; `coastSide` → the site request's coast bearing; `walls` → `toggles.walls` and `intent.wallRings`; `relief` → the site request; `castle`, `harbour`, `temple` → `toggles`; `era`, `biome`, `magic` → `circumstances`; `history` → the blueprint's `history` (§2.7's `HistoryHint`, its standalone form), `{ peak: { tier: onceA, symbolic: false, evidence: [] }, ageYears: ageYears ?? V09's `history.defaultAgeYears`, scars: [] }`, `'none'` → absent, as V09 §4.21.3 (1)'s **History** chip writes it (item 113 (a)); `seed` → `seed` (V10 §3.7) |
| | edit mode | one `adjust` per changed field, its `param` the control registry's parameter for that intent field (§7.8), its `fromStage` the registry's consuming stage; a parameter consumed early is §7.1's Re-derive from Sk, whose fates the card shows for confirmation; `seed: 'new'` is the `Same kind, new seed` action (a new document, §7.1) offered as a `ClerkAction`, never an event; `advance` is V06 §4.1's request, run on the scratch, its epochs the proposal's events and its three shapes the variations — on a dossier-bound document (`MapBrief.settlement.dossier`) no `advance` is encoded: the item is refused in V10 §3.16's `dossier` category with V09 §4.9's `refuse.dossierClock` (§11.2's `advance` gate, outside the dry run; V06 §2.3), its alternative a `fork` `ClerkAction` at the head, detached (V06 §4.4; V10 §2.6), worded by `button.whatIf` (V10 §3.5 step 3); `history` → `adjust('history', …)` with the creation row's value (`'none'` → `undefined`), a Re-derive from S0 whose fates the card shows, byte for byte V09's chip after a declaration |
| T2 `ground` | `raise`, `lower` | `setField { field: 'terrain', stroke: { path, radiusCm, falloff: 'cosine', amount: ±amountM × 100, water } }` — radius and amount default to `encoders.raise`; `water` default `locked` |
| | `cliff` | the same with `falloff: 'linear'` and `encoders.cliff`'s radius and amount |
| | `flatten` | `setField { field: 'terrain', stroke: { path, radiusCm, falloff: 'cosine', amount: share ?? encoders.flatten.share, mode: 'flattenTo', water } }` — the terrain under the stroke moves toward the mean ground height under its footprint by `share`, the dry run resolving the level into the event (item 366) |
| | `terrace` | the `terrace` sugar of item 362 (c): `terrace { stroke: { path, radiusCm: (radiusM ?? encoders.terrace.radiusM) × 100, falloff: 'cosine', amount: 1, water: input.water ?? 'locked' }, levelCm, expansion: sugar.json's current version }` (the stroke's `falloff` and `amount` as volume 9's T2 `ground` mapper sets them, V09 §4.20.1 (4), since §7.1's `FieldStroke` requires both; `water` as the `raise` row writes it and as that mapper sets it from T2's water mode, so the canvas's and the clerk's terrace are one byte sequence and a terrace whose water follows can be asked for; J-VI.26) — `levelCm` the `EntityCard.groundCm` of the path's first point, raised by `upM` × 100 or lowered by `downM` × 100; its expansion is one `setField(terrain)` stroke in item 366's flatten mode with `share` 1 and that `levelCm`, and the retaining walls along its edges (item 110 (a)) |
| | `islet` | `drawWater { kind: the water's kind at the point (its entity card), add: [], subtract: [the ring of radius √(sizeM2 ÷ π) around `at`, `encoders.ringSides` sides] }` — land raised in the water (the base's land brush); `sizeM2` default `encoders.islet.sizeM2` (V10 §2.10) |
| | `coast` | `drawWater { kind: 'sea', add: [], line: path }` — the shore drawn as a knotted curve (§14's T2 `ground` row) |
| | `lake` | `drawWater { kind: 'lake', add: [], from: { points: [p], levelCm: ground(p) + depthM × 100 } }`, `ground(p)` the `EntityCard.groundCm` of the point; with `spring` the points form carries the flag — `from: { points: [p], levelCm: ground(p) + depthM × 100, spring: true }` (§7.1's `PointsForm.spring`; item 111 (a)) — an oasis with its grove and gardens (§7.1's T2 `ground` row), byte for byte V09 §4.21.1 (2)'s **Spring-fed (oasis)** mapper, which writes the flag in the points form too |
| | `river` | `drawWater { kind: 'river', add: [], from: { points: [source, mouth] } }` |
| | `harbour` | `drawWater { kind: 'harbour_basin', add: [], from: { points: [shore], levelCm: the sea's level from its entity card, sizeM2: sizeM2 ?? encoders.harbourM2 } }` |
| | `warp` | `warp { key: the ground layer's arena key, fromLevel: 1, strokes: [{ kernel, centre, radiusCm, strength, dragCm }] }` |
| | `knot` | `moveCourseKnot { water, ordinal, at: the knot's current position (its entity card), to }` |
| T3 `wall` | `wall` | `drawWall { points: [], kind: kind ?? ('inner' when no enceinte stands, else 'outer'), closed: closed ?? false, from: { points } }` |
| | `retaining` | `drawWall { kind: 'retaining', points: [], closed: closed ?? false, highSide (omitted for `auto`), from: { points } }` (item 362 (a)); the `inner`/`outer` default is op `wall`'s alone; a closed retaining wall is a platform; a retaining wall drawn where the ground does not step is the dry run's bend, reaching the model through the item's result (K2) |
| | `gate` | `placeGate { enceinte, at, expansion: sugar.json's current version }` |
| | `repair`, `wear` (item 114) | V06 §2.8's shapes, as V09 §4.21.4's **Repair**, **Wear** and **Back in use** write them: `repair` with `run` → `convert { op: 'repairWall', enceinte, stretch, material: material ?? 'robust' }`, `stretch` the run of `Enceinte.condition` holding the point nearest `run` (the stretch between its two knots, as the canvas's grip selects it); a patch `material` on a run that is not `breached` is written `'robust'`, the item's result carrying `info.wall.patchOnlyGap` (V10 §3.9b (3)); `repair` without `run` → `convert { op: 'repairWall', enceinte }` (a neglect lifted); `wear` → `convert { op: 'wearWall', enceinte, stretch }` |
| T4 `road` | — | `drawWay { points: [], class: class ?? 'secondary', widthCm: widthM × 100 ?? the class's model width, from: { points: [from, ...via, to] } }` — across water the drawn way is a bridge by §7.1's drawing rule; with `raised` (or `class: 'aqueduct'`, which implies it) the event carries `raised: true` (item 362 (b)): the dry run snaps the two ends to ground vertices and never splits a way an interior point lies on, and its bends (a town wall in the way, an island's rim, a source lower than the terminal) reach the model through the item's result |
| T5 `quarter` | — | `quarter { boundary: [], from: { points: seed ? [seed] : corners ?? lasso, sizeM2? }, kind, name, band, district, expansion }` (`sizeM2` only in a size variation, item 348); `district` may be a `CreatedRef` to a quarter the draft made |
| T6 `place` | `where.at` | `placeAt { plot: '', from: { points: [p] }, designation: { cls, use } }` (the plot derived by the dry run, §7.1); then, with a name, `setAttr { id: { created: { item: <this item>, event: 0, kind: 'use', nth: 0 } }, path: 'name', value }` — the one placeholder form |
| | `where.plot` | `placeAt { plot, designation }`, then the name as above |
| | `where.locus`, `where.free` | V09 §4.5's one-line roster, one text with the canvas's locus drop: `roster { lines: [{ name, cls, locus }], expansion: sugar.json's current version }` — `cls` the class; `locus` the input's `Locus4`, its `target` resolved to an address (no `locus` for `where.free`); `name` the input's name, or `''` when the user gave none (an unnamed line, item 571; J-V10.81). The sugar's expansion makes the one `assign`, whose id the engine mints from the event's `seq` (§6.3): the clerk never writes an assignment id. T6 `place`'s row of §7.1's binding carries the one-line roster (file f item 570). With a dossier connected the line obeys §7.1's roster rule (item 101: the roster is the dossier's): naming no element, it is refused `dossier-owned` with the unplaced elements offered, and the clerk's `dossier` refusal (V10 §3.16) adds the same place on the first candidate with no `hardFails` of `query({ kind: 'sites', cls, near: the locus target's EntityCard.anchor, district: the target's id when the locus is `in` a quarter, k: 3 }, { admitAs: the session's effective key in V10 §2.3's form })` — V09 §4.5's query, one text for canvas and clerk; for a line with no locus (`where.free`, or a T7 `roster` line without one) `near` and `district` are omitted (J-V10.93) — encoded as `where.plot` (a map fact; J-V10.18, J-V10.80); when no candidate is free of hard fails, that alternative is not offered and the unplaced elements remain |
| | `where.slot` | a free slot (in `MapBrief.decks[].slots`): `placeAt { plot: the slot's landmark plot, designation }` — the plot read from the deck's `EntityCard.attrs` at `deck/landmarks/<head\|mid>` (CVR-V10-8); a bridge offers `mid` only when it is at least V11's `deck.landmarks/bridgeMid/minSpanM` long (V11 §3.24.4; J-VI.8). A slot the deck does not offer, or one already taken, is not refused (item 101 R2; J-VI.4): it encodes `placeAt { plot: '', from: { points: [the slot's point on the deck — V10 §3.6 (4)'s `{ along: deck, t: 1 }` for `head`, its seaward end, or `t: 0.5` for `mid`, its midpoint] }, designation }`, so the dry run takes the nearest free deck plot and bends it (`bend.deck.full`) as the canvas's drop does (V09 §4.20.4 (1), (3); J-V10.89) |
| | `class` | a specialisation id (`stepped_temple`, `terraced_palace`, `tiered_tower`) places its first carrier class in the document's class table in V11 §3.24.3's carrier order (`stepped_temple`: `great_temple`, `cathedral`, `church`; `terraced_palace`: `palace`; `tiered_tower`: `tower_house`, `mage_tower`, `watchtower`), then `setAttr { id: <the use's CreatedRef>, path: 'specialisation', value }` — the user-set specialisation V11 §3.24.3 exempts from the chance and the cap; every other class id as written |
| | `element` | `placeAt { plot: '' or the plot, from?, element }` — positions a dossier element or an assignment member (item 20 (g)); with `where.locus`, the one-line roster of the row above with the line's `element` (§7.1's roster rule) |
| | `move` | `convert` with §4.11's `relocateUse` naming the use and the target plot (V06 §4.2's hand form) |
| T7 `roster` | — | `roster { lines: [{ name, cls, locus, element }], expansion }` |
| T8 `fill` | `arrangement`, `class` | `fill { scope, arrangement, cls }` — `scope` `{ ids: [ref] }`, or for `around` `{ ring: the regular `encoders.scopeRingSides`-gon of the radius, key, level: 1 }` |
| | `density`, `greenery`, `prosperity` | one `setField { field, stroke: { path: [the scope's anchor], radiusCm: 1.2 × the scope's equal-area radius (or `radiusM`), falloff: 'cosine', amount } }` each — `amount` the input's relative change in field units, −1 … 1 (§7.1's `FieldStroke.amount`) |
| | `green` | `drawGreen { polygon: the regular `encoders.ringSides`-gon of the radius around the anchor, kind }` |
| T9 `shape` | `split`, `join` | by the target's registry kind (its `EntityCard.kind`): on a **plot**, `split { through }` → `split { id: target, cut: [p1, p2] }` and `join` → `join { ids: [target, ...join] }` (item 31's splitting and fusion); on a **way**, `split { at }` → `split { id: target, cut: [p] }`, `p` the resolved point taken to the nearest point of the way's centre-line (the polyline V10 §3.6 (4) reads, in `dmath`, rounded by §3.2's rule, a tie going to the lower arc length) — the point V09's **Split here** writes for a click (V09 §4.5's T9 row; CVR-V10-18 (b)) — and `join` → `merge { ids: [target, ...join] }`, as **Join these** writes it (§7.1's ways row); a form the target's kind does not take (`at` on a plot, `through` on a way) or a target of any other kind is an `is_error` result naming the form each kind takes (J-V10.97) |
| | `move`, `rotateDeg` | `moveFootprint { id, deltaCm, rotateCdeg }` |
| | `set` | one `setAttr { id, path, value }` per entry — a path the registry does not list as editable is refused by the encoder; a dossier path by the engine |
| | `entrance`, `paint` | `setEntrance { building, op, index, role, side, offsetCm }`; `paint { target, ids: [target], brush: one point at the building's anchor, value }` |
| | `tiers` | `setMassing { building: target, op: { op: 'tiers', count, insetCm: insetM × 100, top, stairs, stairWidthCm: stairWidthM × 100 } }` — §7.1's `building` field and `op: MassingOp`, V02 §4.6 (1)'s `tiers` member — a field left out keeps the stored value; offered only while T9 `shape`'s registry row lists the op (from M6c); V02's bends and refusals reach the model through the item's result |
| | `tier` | `setAttr { id: target, path: 'wings/<key>/heights/floors', value: floors }` or, for a solid tier, `path: 'wings/<key>/heights/eaveCm', value: heightM × 100` — the key of the n-th tier read from the target's `massing/stack` attribute (CVR-V10-8); available from M3a (V02 §4.6 (2)) |
| | `span` | `setAttr { id: target, path: 'spans/<a>-<b>/use', value: use }`, the n-th span's keys read from the target's card (§7.1's binding, as §2.7's record keys a span; a span §2.7's laws read `open` takes the held `use` as the canvas does, law 1 (8)) on a raised way (item 362 (d)); a held user edit |
| | `link` | `editTable { table: 'siting.linkEdits', ops: [ pin: an upsert of row `<target address>/<good>` with `{ bindTo: provider }`; avoid: an upsert adding `provider` to the row's `avoid` list; cut: an upsert with `{ cut: true }`; release: a delete of the row ] }` (V11 §4.2's cells) |
| | `merge` | `editTable { table: 'siting.declared', ops: [an upsert of row `use:<the works use's address>` with `{ split: false }`] }`, or with `allOfKind` the kind's key (`uid:<localUid>`, `cat:<catalogId>` or `cls:<class>`, V11 §4.2) — "Let the rules decide" is the row's delete |
| | `siting` | `editTable { table: 'siting.declared', ops: [an upsert of the target's kind key with the given `place`, `quarter` and `profile` cells and `weights` as the kind row's `familyWeights` cell, and — `pin` being a `use:` row's cell only — an upsert of the target use's `use:<address>` row with `pin`] }` (V11 §4.2's key forms and cells; V09 §2.6), writing no cell its key form does not declare — never a dossier write (item 20); a cell the dossier owns is refused `dossier-owned` by the dry run |
| T10 `hold` | `lock`, `unlock`, `pin`, `unpin` | the event of that name on `targets` (with `paths` for a lock) |
| | `revert` | one `revert { id }` per target |
| | `remove` | one `delete { id }` per target, in target order (item 368); no reason key and no suppression is written by the encoder — the fold writes the suppression by reason key (item 260's `detail.suppress`), so a transcript replays the call exactly; a target the key withholds is refused `knowledge`, and a concealed use or an unexcavated element is an unknown address (V10 §3.12); what kind of removal it is — a generated thing's delete, a dossier-backed element's `rejectSite` (§7.2), a dossier-declared record's `dossier-owned` refusal — is the engine's, never the clerk's |
| | `regenerate` | `regenerate { scope: { ids: targets }, mode: mode ?? 'keep', rerolls: {}, fates: [] }` — rerolls and fates filled by the dry run; a scope that covers the whole town is refused in edit mode ("choose a block or a quarter", R5) |
| T11 `name` | `name`, `displayText`, `hide` | `setAttr { id: target, path: 'name', value }`; `setAttr { id: the target's label, path: 'displayText', value }`; `hideLabel { id: the label, hidden }` |
| | `group` | `group { name, quarters: the leaf quarter nodes of the named districts (EntityCard.where.quarterNode), expansion }` |
| | `newNames` | V09's **New names** in its three scopes (V09 §4.5's T11 `name` row): `scope` → `rerollLayer { concern: 'naming', ids, salt: 0 }`, `ids` the named entities among the resolved addresses (an `EntityCard` with a `name`); `quarter` → the same with `ids` the quarter and every `gazetteer` row not marked `withheld` whose district is the quarter, read with `admitAs` the session's effective key (V10 §2.3; V10 §6.1's row) — the scope V09 §4.5's T11 row writes (J-V10.95); `town` → `rerollLayer { concern: 'naming', salt: MapBrief.salts.naming + 1 }` with no `ids` (J-V10.96). `ids` in address order in both scoped forms (CVR-V10-18 (c)); a scoped `rerollLayer`'s per-entity `salts` are the dry run's (§6.3 case (3)); the town-wide one's renames are on the card, as the canvas's fates sheet lists them, and V10 §4.4 never applies it at once |
| T12 `dress` | `preset`, `layer`, `restyle` | the `setStyle` row operation the style dialog emits for choosing a preset (§8.2); `setLayer { layer, spec: { visible } }`; `restyle` → for `style.compass`, `naming.emblem` or `render.instances`, `rerollLayer { concern, salt: MapBrief.salts[concern] + 1 }`, town-wide — the bytes of V09's **New compass**, **New emblem** and **New trees** (J-V10.96); for `decoration`, the group V09 §4.5's T12 row states for **New decoration** (J-V9.115), each concern's salt from `MapBrief.salts` + 1 — one item and so one group on acceptance (V10 §4.2; J-V10.99); any other `concern` fails the schema, an `is_error` result with no event (V10 §3.4 (3)) |
| | `export` | no event: a `ClerkAction` `export` the user runs |

**Reached only through the `events` escape hatch.** For each tool, the kinds its tool's rows of §7.1's binding home
(T101-1) that no form above emits reach the model only through the tool's `events` array, the model reading a kind's
field schema with `read_map { kind: 'schema', event }` first. The list is computed at build — the binding's rows less the
encoders' emitted kinds — written into the `events` field's description and checked by T-V10-1, so a kind a volume
registers later joins it with no change here. Its geometric fields take anchors (`AnchorGeom`, V10 §3.4 (2); J-V10.73).
It holds, for example, `drawWater` with `subtract` rings (islands) beyond the typed islet under T2 `ground`; the
underground kinds V04 §4.1 registers (`drawChamber`, `placeAccess` among them) under T4 `road` and T6 `place`; the plan
and massing events of V02 and V03 under T9 `shape`; the village track's `rerollLayer('village.track')` under T10 `hold`;
and the leader-line switch, the quarter tint and the furniture rows under T12 `dress`. Each is validated by its
`@plat/model` schema like any event.

=== END ===

=== REPLACE ### 7.1 Tests ===
### 7.1 Tests

| id | what it proves | tier |
|---|---|---|
| T-V10-1 | the tool registry: each declaration tool's `events` enumeration equals its tool's rows of §7.1's binding (T101-1's registry), `delete` under T10 `hold` (item 368) included; every event kind of the twelve rows is reachable through one clerk tool — no surface lacks a declaration (§14); the escape-hatch list in each `events` description equals the row less the encoders' kinds; item 110's discriminating fields — `drawWall.kind: 'retaining'`, `drawWay.raised`, the `aqueduct` class, the `terrace` sugar, `spans/<n>/use`, and `setMassing { op: 'tiers' }` once T9 `shape`'s row lists it — are each emitted by a typed form; T10's enumeration holds `rerollLayer` for the village track alone, reached through `hold`'s `events`, and `hold` no typed layer re-roll; T6 `place`'s holds the one-line `roster` a place by a locus emits; T9's holds `split` and `merge`, a way's split and join, each emitted by `shape`'s typed form and so absent from T9's escape-hatch list (§7.1's binding table, its ways rows) | PR |
| T-V10-2 | offline: the application built without `@plat/clerk/model` runs §13.4's scripted tasks to the same model digests; the drawer shows its offline line; the "why?" panel and the skeleton check still answer | PR |
| T-V10-3 | byte-stable prompt and tools: two renders with one set of table versions are byte-identical, per route; a vocabulary edit changes exactly the tools block; a document's or a host's `clerk.content` rows never change the system prompt's bytes (they render only in the fenced vocabulary block, schema-validated); the token budgets of V10 §6.3 hold (milestone, with the provider's counter) | PR, milestone |
| T-V10-4 | the encoders: for every tool and every input form, a fixture input gives its golden event list; the same declaration made through the scripted canvas (§13.4) and through the clerk's encoder gives one event, byte for byte (T101-3 on the clerk's path) — a place by a locus and V09's locus drop give one `roster` line, named and unnamed, and `shape { siting: { weights } }` and V09's per-kind panel one `siting.declared` upsert; on a dossier-bound fixture the `dossier` alternative of a place by a locus names the plot T-V9-13's **Put it at {site}** names, both from V10 §4.1's `sites` query; a `ground { op: 'terrace' }` and V09 §4.20.1 (4)'s T2 `ground` terrace over the same path and level give one `terrace` event, byte for byte, with the water mode at its default (`locked`) and at `follow`; `name { newNames }` in its three forms gives V09's **New names** for these, this quarter and the town, and `dress { restyle }` for `style.compass`, `naming.emblem`, `render.instances` and `decoration` gives V09's **New compass**, **New emblem**, **New trees** and **New decoration** (its two `rerollLayer` events, `style.jitter` then `style.crowns`), byte for byte — the scoped forms with `salt: 0` and `ids` in address order, the town-wide ones with `MapBrief.salts`' value + 1, which equals `DisplayList.salts`' — and a `restyle` with any other `concern` is an `is_error` result with no event; `shape { target: a way, split: { at } }` and `shape { target: a way, join }` give **Split here** at the same point and **Join these** on the same two ways, byte for byte; the this-quarter case runs with View as off and on (CVR-V10-18 (a), met); on T-V9-38's three-building fixture, the clerk's alternatives for a dwelling declaration on the cluster give, for each listed building in the dry run's order, the events V09's **Use another building** commits for it — `[addUndergroundAccess { building }, the declaration]`, the access with no `target` — byte for byte, and none is a `placeAt`; each is labelled by V09 §4.9's `bend.under.accessDug` list form with `{building}` read at the session's effective key (under View as, a withheld building by its `withheldWords` word), and the card carries that row's **Show the way in** as a `select` whose `label` is the button's text, as the canvas's card does; on the same fixture with no building qualifying, `bend.under.accessOpening`'s **Show me why** is a `why` whose target (its `page`, by V10 §3.5 step 3's rule) is the one the canvas's button opens and its **Show the way in** a `select` labelled with the button's text, and `bend.under.noAccess`'s **Add a way down** is a `useTool` of `place` whose `mode` is `access`, T6 `place`'s Below access mode, the mode the canvas's `button.addWayDown` opens; over every V09 §4.9 row a scripted clerk call meets, each button becomes the action its `MsgButton.does` names — a `tool` button carrying the `MsgButton`'s `tool` and `mode` and, for a `subject` one, the row's first admitted address as `ids` (none offered for a `subject` button whose row has no such address), a button V09 §2.9 does not draw is not offered, and each is worded by V09 §2.9's *Words* — and `refuse.dossierOwned`'s **Show a different name** is the `setAttr displayText` `propose` when the request carried the words, else a `useTool` of `name` with the thing as its `ids`; item 110's other forms are T-V10-40's; the bend actions stand on `ProposalView.variations[].bends` with their item (the dug-access and `bend.under.noAccess` cases above); a two-item draft, one item bent by `bend.place.noSite` and one applied — its **Choose another of the marked places** alternative yields one proposal holding both items, and **Drop** is not offered as the bend's button; a turn with one refused and one applied item carries the refusal in `TurnView.refused` beside the proposal | PR |
| T-V10-5 | the spatial resolver: golden points for every anchor form on three fixture towns (a coastal TOWN, a river CITY, a hilly METROPOLIS), identical on the five engines; `{ at }` and `{ along }` on a retaining wall; `t: 1` on an aqueduct is its terminal and on a mole its head; a point on a raised deck stays a model point; `{ edge }` ignores raised parts; a `ring` anchor's polygon | PR, nightly |
| T-V10-6 | the knowledge canary: fixture towns hold `local`, `secret`, concealed and unexcavated places named with unique canary strings, whose class ids, signature-pair ids and goods ids also carry canaries; clerk sessions at `public`, `local` and `secret`, with the view at the city band and at the building band, replay their cassettes; no request body, reply, card, finding, transcript export, stored transcript or defect record contains a canary the key withholds; every withheld `kind` is a registry kind with its `withheldWords` word; a concealed use appears in no result at `public`; an unexcavated ruin appears in nothing at `public` or `local`; a front's `why` is the front's; an owner's `secret` session whose view is set to **View as** `public` (`ViewOpts.viewAs`, item 464) sends, shows and stores nothing a `public` key withholds, every `query` and filtered dry run carrying `admitAs: 'public'`, and choosing View as clears the session while leaving it closes only the segment; and one whose View as is a party's key `{ tier: 'local', places }` (item 464's key form) admits the party's learned places and nothing else a `local` key withholds, every read carrying that key form as `admitAs` and admitting nothing the owner's key would not (J-V10.90); a transcript made under `{ tier: 'public', places: [p] }` is not listed to, nor opened by, a `{ tier: 'public', places: [] }` session, and a View as moved from that key to `{ tier: 'public', places: [q] }` counts as lowered and clears the session | PR (replay), milestone (live) |
| T-V10-7 | never a dossier write: on B-DOSSIER-lite's fixtures, scripted tool calls that set a dossier path, remove, rename or re-designate a dossier element each return a `dossier` refusal with at least one alternative, kind-aware (a use's **Move it** is a `select` of it and its **Not here** a `propose` of `rejectSite`; a dossier-declared way offers "Move it" — a `propose` of its course through the request's anchor, else a `select` of the way — never `rejectSite`); the model's `[[do:refuse:dossier:<id>]]` gives the card `refuse.clerk.dossier` with (3) "Move {thing}", a `select` of `<id>`, and (4), a `useTool` of `name` with `<id>` as its `ids`, and without an `<id>` (4) alone; a request for a new place of a class whose count a dossier record owns is refused with "move one of the existing ones" (the model's `[[do:refuse:dossier:count:<id>]]`, its card `refuse.clerk.dossier.count` with (5) a `select` of `<id>`, one existing place of that class; a `dossier:count` form without an `<id>` shows the `dossier` form's card with (4); J-V10.104, J-V10.107); K13's fix on a dossier map is a move; a roster line naming no element — and a place by a locus naming none — is refused with the unplaced elements offered and, where a `sites` candidate is free of hard fails, its placement on a plot — a place by a locus and a roster line alike (J-V10.93), a line with no locus querying without `near` and `district` (V10 §4.1) — the card's text V09's `refuse.roster.dossier`, the plot the first candidate with no hard fails of V10 §4.1's query, and no plot offered when none of the three is free of them | PR |
| T-V10-8 | reader and oracle goldens: `brief` (its item-110 lines included), `entity` (by address, and at a point with `hasBelow` and `below`), `sites`, `measure` (straight; by street over part-0 ways, stairs, raised roads and viaducts joined at their ends, never an aqueduct), `rule`, `profile` and `why` answers on B-CITY-lite seeds at `public` and `secret` keys hash identically on the five engines; §11.2's oracle rules (1)–(4) and item 468's three rules (§11.2; V10 §2.13) each hold on their fixture; `brief.salts` equals `DisplayList.salts` on each seed before and after a town-wide `rerollLayer` of each rerollable concern; the model-side budgets of V10 §6.1, the this-quarter scope read among them | nightly |
| T-V10-9 | explain equivalence: on 200 untouched B-CITY-lite towns, `explain` in `asPlaced` mode at every placed item's plot reproduces the score S10b computed, bit for bit; the shares sum to 1 within 10⁻⁹; the chance term equals its stream's draw; cold and warm budgets; with the order index absent the pre-decided fallback of V10 §3.9 step 4 holds | nightly |
| T-V10-10 | field drivers: on 1 000 plots the terms sum, before the clamp, to the stored value within 10⁻⁹; with `w_sun` = 0 the daylight term is 0 (item 102's no-op pin) | PR |
| T-V10-11 | the draft is deterministic: a cassette replayed twice gives identical draft items, scratch digests, proposals and previews; over 500 replayed proposals the scratch's results and the user document's preview agree (V10 §3.11's equality, effects included); acceptance's re-check turns a proposal whose effects changed under equal counts and fates `stale` and commits nothing (V10 §4.2 (1)); placeholders of kinds `use`, `way` and `building` resolve to the same addresses in every run; every declaration on the scratch reads its item from the filtered `preview` and then commits with the preview's fates and renames filled (V10 §3.5 step 3) — a bent declaration's item carries its `bent` line, its alternatives and its counts, a `conflict` preview commits nothing, and the commit's `created` equals the preview's; under View as a declaration that moves a concealed use and renames a withheld place commits on the scratch through its `confirm` answer, confirmed with that answer's own lists, and records no defect, the item, the model and the card holding only the preview's filtered lists | PR, nightly |
| T-V10-12 | transcripts replay: a creation transcript's skeleton imported under its seed reproduces the accepted document's model digest with every clerk event still marked `proposedBy: 'clerk'` (item 365); an edit transcript's accepted events, replayed at their `seq`s onto the base document, reproduce the session's digest (T101-4 on the clerk's path); a creation transcript with a raised way and a terrace replays to its digest; an edit transcript with a removal replays with the thing still removed | PR |
| T-V10-13 | preview-first: a static check finds `edit` on the user's document called only from acceptance (V10 §4.2) and the apply-then-undo path (V10 §4.4); over every cassette in `preview` mode, a turn's end leaves the user document's `logHead` unchanged; in `applyThenUndo` mode a variation needing a confirmation, a creation and a variation with a `removed`, `lost` or `displaced` effect are shown as previews, never applied | PR |
| T-V10-14 | staleness: a waiting proposal stays waiting after an unrelated edit (equal previews, effects included) and becomes `stale` after an overlapping one; a conflicting host dossier event fails it with its refusals; a proposal whose `place` carries a name, followed by an unrelated hand edit before Accept, puts the name on the new use | PR |
| T-V10-15 | variations: a `fill` proposal carries §7.3 item 10's three variations; a `place` the second and third site candidates; a `quarter` the smaller and larger size-band targets; a `road`, raised or not, exactly one; a creation seed variation in which any item fails is omitted | PR |
| T-V10-16 | grounding: synthetic replies with an unknown id, mismatched link words, an unlinked invented name, an unsupported dossier claim, an invented founding year, an invented count and an invented distance are each flagged; relation claims — "the catacombs under [[b12\|St Mary's]]" where the complex lies under its churchyard, a raised way said to cross a way not in its `crosses`, an aqueduct said to feed a fountain that is not its terminal, a building said to stand on a deck it is not on — are each flagged; after the cassette's repair, which runs at the route's own effort, the remaining spans are `unverified`; a German reply flags at most the risk-(5) share of its clean spans; action forms: `[[do:useTool:read_map]]` (a read tool), a `fork` at a seq no read of the segment returned (nor one less than one), a `rebuild` of an id no accepted removal of the session deleted and `[[do:refuse:essay]]` each leave no block and are listed in the repair, and `[[do:refuse:dossier:<id>]]` with an `<id>` no read of the segment returned is listed in the repair and, still failing after it, gives the `dossier` card without (3), while a `fork` and a `rerun` at `s − 1` for a chronicle cause `s` the segment read, `[[do:useTool:place]]`, `[[do:undo]]` after an accepted proposal, `[[do:refuse:picture]]` and `[[do:refuse:dossier:<id>]]` with a read `<id>` (its (3) a `select` of it) each become their labelled block or the turn's refusal | PR |
| T-V10-17 | critique: one fixture per row K1–K18 (K16 one per bend key, K17 one per crypt bend key, `bend.crypt.cathedral` and `bend.crypt.largest`) yields exactly its finding and fix; both known-city skeletons (J78's and item 110 (e)'s) yield no finding above `info`; K5 ignores a raised way over the quarter, and K7 a retaining wall | PR |
| T-V10-18 | failure ladders: a mock backend raising each SDK error class, returning a `refusal`, a `max_tokens` stop inside a tool input and an unparseable tool input, produces each ladder of V10 §3.19; a cassette with a mid-stream fallback carrying a pre-boundary `tool_use` never runs that call, strips the pre-boundary blocks from what is appended, and meters two iterations; no path changes the user's document | PR |
| T-V10-19 | caps: scripted usage crosses the warning and the cap; no request is sent past the monthly cap; the turn cap finalises the turn with its draft proposed; each iteration is priced at its own model's row, a fallback's included | PR |
| T-V10-20 | the host seam: `clerk.config` `off`, `builtin` and `host` show and hide the drawer as V10 §3.17 states; a non-`https`, non-allowlisted or not-in-`connect-src` transport is refused with `clerk.config.refused`; `clerk.needsToken` is sent before expiry; `transport.fallbacks` `server`, `client` and `none` behave as stated; under the proxy the map block and every result pass the host projection rows (T-V8-27's list: `brief`, `entity`, `sites`, `why`, `frame` without radius, `rule` and `profile`, with `measure`, `hit` and `inView` answered `query.result { error: 'E_HOST_KIND' }`); in configuration C the module projects every `query.result` and every `preview.result` before it leaves the frame (asserted on the posted bytes); a host's `preview { proposal }` shows the card without Ask again, Accept commits one group and `clerk.proposal` answers `accepted`, a Drop `dropped`, a newer one supersedes it (answered `dropped`) and a proposal left with no variation answers `failed`; a moved town turns the card stale, which posts nothing, and its Drop then answers `stale`, its Accept `accepted` with the fresh preview's `seqs`; closing the harness with the card open answers as its Drop; every host proposal is answered exactly once; with a scripted `ClerkMount.host` the harness takes the transport, its `fallbacks` and `capUsd` from `config()` and `onConfig`, calls `needsToken()` at the lead and on an authentication failure, `refused('origin')` for a refused transport and `answer(id, status, seqs)` for each outcome, and a source scan finds no bridge import and no message post in `@plat/clerk`; in host mode a document holding only its creation prefix gets an `edit`-mode turn; the suite runs under both content security policies (V08's frame and V09's standalone) | PR |
| T-V10-21 | privacy and the ops split: across every cassette, no request body holds document bytes, an image block, a coordinate field, a `dossierKey` or the API key; the key reaches device storage only after "remember"; a fixture document carrying `editTable` rows on every `clerk.ops` cell and an instruction inside a lexicon word has every `clerk.ops` row refused with `refuse.clerk.opsDevice`, and the system prompt's bytes equal the shipped render | PR |
| T-V10-22 | scratch cost: `scratch(h)` time and memory at TOWN, CITY and METROPOLIS within V10 §6.1–V10 §6.2; a forced allocation failure runs overlay mode | milestone |
| T-V10-23 | roles: a `viewer` session's clerk refuses every declaration tool with `role`, never calls `preview`, and reads and explains | PR |
| T-V10-24 | segments: roll-over on length, key, tables and delta; the carried memory holds only harness-written lines; a lowered key — the view's, or its View as — clears the session and a raised one closes only the segment | PR |
| T-V10-25 | scope: the encoder refuses a whole-town `regenerate` in edit mode; every re-roll the clerk proposes is scoped — a town-wide `rerollLayer` (names, compass, emblem, trees, decoration and the village track) by its layer (V10 §4.5) | PR |
| T-V10-26 | the first-five-minutes clerk task: in §13.4's sessions once the clerk exists, each participant asks the clerk for "a walled harbour town with a temple quarter" and makes one follow-up change; pass as §13.4's rule; the preview-first question is answered and V10 §4.4's setting applied if it fails | milestone (human) |
| T-V10-27 | the evaluation set's pass bars (V10 §7.3) | milestone |
| T-V10-28 | cache health: in the live run, every segment's second request reads at least the static prefix's tokens from cache; a steady segment writes only what its last turn added; no request of a repaired turn writes the messages cache from before the repair; the gaps between a segment's turns are recorded for the TTL switch (V10 §6.4) | milestone |
| T-V10-29 | the words, once: every value of `CatacombComplex.source.kind`, `blockedBy`, `AccessPoint.cause.rule`, the crypt form, the burial-face outcome, `RaisedOutcome.outcome`, every critique row, every refusal category but `lock`, `rule` and `role` (with `refuse.clerk.dossier.count`), every `clerk.alt.*` key — V10 §3.16's alternatives column, V10 §3.13 step 4's, `clerk.alt.critique.fix` and `clerk.alt.stale.retry` — the notices `clerk.view.cleared` and `clerk.applied`, every row of V10 §3.9a's `plan` table and `info.under.none`, every `info.damage.*` and `info.crisis.*` key V10 §3.9a and V10 §3.9b (8) render (V09's rows; this volume writes no words for them), and every `withheldWords` kind has a catalogue key in every shipped locale (a compile test); `RefusalCategory` holds no `bend`, every `bend.*` row of V09 §4.9 reached through a scripted clerk call — item 110's and file f item 582's among them — arriving on the card as the item's `bent` line with no refusal; no engine code has a second English sentence in `clerk.content.refusals`: the `lock`, `rule` and `role` rows carry no `msg` (a viewer's declaration shows `refuse.viewer`'s key), and for every engine code a `refuse.*` row of V09 §4.9 renders, a scripted clerk call that meets it shows a card whose `msg.key` is that row's key, never a `refuse.clerk.*` key (the `dossier` row's own sentences are reached only by the model's refusal form, V10 §3.13 step 4) | PR |
| T-V10-30 | the placed set: `explain`'s `asPlaced` placed set comes from `PlacementOrder` and not from the order the reader walks (the same answer with the registry's iteration shuffled); a `pass: 2` item scores against its run's set less itself; `exact` turns false after a later lifecycle event in the item's scope; `drifted` is set only beyond `driftMargin`; a document without placements answers `asNow` with `exact: false` | PR |
| T-V10-31 | village routing: a description below 1 500 people routes to the village product when `ProductDecl('village')` is registered, V07's fields in the blueprint's `VillageRequest`; while it is not, §1.1's clamp applies with its message; the lexicon's thorp, hamlet and village words reach `size.population` as those rungs' default targets, and every size word as V09 §4.5's quantile — the population V09's chip gives for the same word (J-V10.118) | PR |
| T-V10-32 | history reads: `chronicle` pages between weeks, `frame` at a week (the frame V06's `locate` chooses; entities with their states at that week, key-filtered, no geometry, `since` counted), `history` pages and `FieldDrivers.since` equal to the shade masks' deltas; the `frame` budget of V10 §6.1 | PR, nightly |
| T-V10-33 | siting, link and merge: `shape.link`, `merge` and `siting` (its `weights` included) encode to the `editTable` operations of V10 §4.1 on `siting.linkEdits` and `siting.declared`; a cell the dossier owns is refused `dossier-owned`; `why` names a pinned or cut link with its row | PR |
| T-V10-34 | at rest on the device: a stored `secret` transcript is not listed or opened under a `local` key on the same device; a version-1 transcript reads as `secret`, and a version-2 transcript below `secret` is listed only to a `secret` session; the defect store keeps at most 100 records of counts and codes only and saves them as a file | PR |
| T-V10-35 | the key and help: `setKey` maps an authentication, billing, permission and connection failure of the models call to `invalid`, `noCredit`, `noAccess` and `unchecked`, and success to `ok`; the data notice gates the first request; the help route sends one tool and ends its answer with a `useTool` action block — made from its `[[do:useTool:<tool>]]` form — labelled `clerk.alt.help.useTool` with that tool's `ToolRow.label` | PR |
| T-V10-36 | typed reads: every `ReadMapInput` member validates against §11.2's `Query` fields of its kind; `people`, `relations` and `whereIs` reach the facade typed; `measure` rounds to 10 m, gives walking minutes by street and marks an unreachable pair | PR |
| T-V10-37 | item 109's explanations: on fixtures with a ruin, a cavern, a sealed deep void, catacombs growing, stagnant, stopped and over the count, a cathedral's principal crypt, a raised-choir crypt and a crypt join, and one burial face per candidate outcome, the `underground` and `crypt` sections give V10 §3.9a's rows; `catacombOutcome` equals V04's candidate pass; a withheld building's answer keeps no crypt or catacomb row; an unexcavated element's rows exist only at `secret`; the budget of V10 §6.1 | PR, nightly |
| T-V10-38 | removal through the clerk: a scripted `hold { op: 'remove' }` on a generated viaduct and on a generated aqueduct commits one `delete` each; each stays removed after Regenerate, a scoped `regenerate` over every district it crossed, a transcript replay and ten epochs (V06's pass); `undo` restores it with its ids; `rebuild` after a later edit previews V09's "Build it again" events — those `ClerkMount.rebuildEvents(seq)` returns — and commits them on Accept; a dossier-declared raised way is refused `dossier` with "Move it"; a generated way whose reason read a dossier record is removed; the removal's previews stay within V09's Delete row | PR (the epochs nightly) |
| T-V10-39 | never unasked: no critique fix holds `raised`, the `aqueduct` class, a `terrace`, a `retaining` wall or a `delete` (a static check over the rows' fix builders); no replayed evaluation turn whose words ask for none of these holds one | PR |
| T-V10-40 | item 110's encoders: goldens for `wall` `retaining`, `ground` `terrace` and `islet`, `road` `raised` and the `aqueduct` class, `place` by `slot` and by a specialisation class, `shape` `tiers` (from M6c), `tier` and `span`, `hold` `remove`, and the hatch's anchors and rings; each equals the scripted canvas gesture's event byte for byte (T101-3 on the clerk's path) — `span`'s on a span §2.7's laws read `open` too (law 1 (8); T-V10-41's c14 span): its path by the span's bounding piers' keys, its held `use` the event the canvas's enabled **Walled up as a vault** sends (V09 §4.20.6 (2)); a slot the deck does not offer, or one already taken, encodes the points form at the slot's point, and its dry run places on the plot, with the bend (`bend.deck.full`), that the canvas's drop there gets | PR |
| T-V10-41 | item 110's explanations: on fixture towns, `why` on a generated viaduct, elevated road and aqueduct names its reason kind and values and the rung's chance and cap; a TOWN's declared way answers "declared by you", a carried one its year, a removed one its removal (`WhyAnswer.removed`); the `raised` section on a gorge-crossing primary way answers `belowCity` at TOWN, `cap` over the cap at CITY and `suppressed` after a removal; on 200 CITY seeds every `raisedOutcome` equals the generator's own ledger decision; on T110-2 (3)'s c14 fixture at a seed searched so that a `vault` span of its S4 viaduct lies under a run of stage 2's ring with nothing but that run across the span's strip (§2.7's laws, law 1 (8)), the clerk's read of the viaduct (`why`, V10 §3.9's raised-way row) tells that span `open` with "A wall runs under this arch", as its V09 panel and why card do, and after a hand `delete` of that run tells it `vault` — with its arch vault from M6-U's U3 (V04 §3.5.4 (d)), the reading alone before it (§2.7's laws, law 1 (8)); the budgets of V10 §6.1 | nightly |
| T-V10-42 | effects and knowledge: every effect kind of item 465 appears on the card and in the model's item result, filtered; the canary (T-V10-6) gains a concealed use in an arch vault and a void met by a support's footing, both absent at `public`; K18 fires on an effect of kind `lost` or `removed` on a thing the user did not name | PR |
| T-V10-43 | the no-op pin: with V11 §3.24.0's item-110 switches off, T-V10-8's reader goldens, the brief's rendered text and the goldens of the encoders that existed before item 110 are byte-identical — a `NoOpPin` registration of the reader goldens on V12 §3.7.8's engine (`item110.*`), written by the C1 seat at M3a (the tools block changes once, by the declared shift of V10 §7.2) | PR |
| T-V10-44 | the action dispatch: `ClerkHandle.run` acts on `propose`, `undo` and `rebuild` and rejects every other kind without effect; with a scripted drawer, `fork` and `rerun` reach V09's `forkAt` and `rerunFrom`, and `select`, `why` (the why card of its `id`, else the page `page`), `openSettings`, `useTool` (its tool active in its `mode` on that mode's working layer, its `ids` selected first), `export` and `find` (the Find panel's chips set, with no event and no log entry) the application's handlers; no application kind reaches the harness; the card's buttons: an accepted proposal's view carries `accepted` and its Undo runs `{ kind: 'undo', group }`; an accepted removal gains `rebuild` with its group's first `seq` once a later group lands, and Put it back runs `{ kind: 'rebuild', seq }`; a host proposal's `actions` are `accept`, `drop` and `why` only; Put it back previews exactly the events `ClerkMount.rebuildEvents(seq)` returns; over every cassette, every `action` block and every `RefusalView.actions` entry carries a `label` but a `select` of the `role` or `knowledge` rows, and every `useTool.tool` is a canvas tool and its `mode`, when present, a `ToolModeRow.id` of that tool in `toolkit.json` | PR |
| T-V10-45 | item 111's explanations and forms (takes T111-5's `item111.water` registration): on arid fixtures — an oasis the arid row laid, one a dossier's `oasis_water` made (DR40) and one drawn by T2 `ground`'s spring flag — `why` on each names its source (tiers `map`, `dossier`, `declared`), its grove and gardens and its `spring.flow`; the prosperity `drivers` of the quarter by the water carry the water term (`why.driver.water`) and `climateSun` 0 or negative in the hot arid row, 1 in a temperate one; a district's `cause` names the water pull on the arid site only; `ground { op: 'lake', spring: true }` and V09 §4.21.1's toggle give one `drawWater`, byte for byte; its flag sits in the points form (§7.1's `PointsForm.spring`); the brief marks the site arid and the lake `spring`; with item 111's cells at their no-op values the drivers carry a water term of 0 and `climateSun` 1, and every read and why golden but the brief's is byte-identical to the build before item 111 (the brief's arid mark is item 111's own line) — T111-5's `item111.water` registration of the reader and why goldens, the brief's excepted, on V12 §3.7.8's engine (V12 §2.13), written by the C1 seat | PR |
| T-V10-46 | item 113's story: on the city-to-village fixture, a refounded fixture and a symbolic-peak fixture, the `history` section gives the peak, the replay epoch that laid the walls with its rung and population, each destruction and refounding and each buried system, each row's key a `report.history.<line>` row that V09's "What its past left" also shows; on the symbolic fixture no answer or card states a population for the peak, a scripted reply stating one is marked *unsupported*, and the words say the size is not recorded; a `lost` cluster answers `lost` with its closing at the key that admitted it while accessible; `intend { history }` gives V09's **History** chip's events byte for byte and is refused `dossier` on a dossier history; with the replay off every golden is byte-identical; the budget of V10 §6.1 | PR |
| T-V10-47 | item 114's walls: on fixtures with runs `standing`, `worn`, `patched`, `breached` and `dismantled`, at generation and after V06's epochs, `why` on the enceinte words each run's state, material and year (`info.wall.run`), the generation-time reason from §7.7's DR41 and, with V06, its last change; the brief counts the runs by state; `wall { op: 'repair' \| 'wear' }` gives V09 §4.21.4's **Repair** (each material), **Wear** and **Back in use** events byte for byte; a patch asked on a `worn` run is written robust with `info.wall.patchOnlyGap`; a repair of a `dismantled` run carries `bend.wall.newStretch` | PR |
| T-V10-48 | item 115's ceiling (takes T115-3's clerk form): at THORP, HAMLET and VILLAGE a clerk declaration above the ceiling (a tower on a farmhouse, a second manor) commits as asked, its card carrying `info.grand.beyondTier` exactly when V09's canvas card for the same events does, and a dossier-named grand building `info.grand.dossier`; at TOWN and above no line shows; "why are the farmhouses plain?" names the ceiling row by its id; no creation declaration and no critique fix goes above the ceiling on words that ask for none | PR |
| T-V10-49 | items 117 and 118 as a look: `read_map look` returns the view's week, season and follow flag, the climate row's season cells at that week and the dossier's festival list the view shows (§11.2's `LooksAnswer.festivals`), and on a standalone fixture no festival, a previewed generic one named in V09's words; its answer follows the view while the brief, every read, every digest and the cached prefix stay byte-identical over all 52 weeks and every festival display; no turn about a season or a festival proposes an event; a document without the view keys reads week 19 with no festival; the budget of V10 §6.1 | PR |
| T-V10-50 | the edge suite (V10 §3.23): one scripted fixture per numbered clause — rows 1–35 and combinations C1–C10 — each asserting its outcome and its rung and that nothing reaches the user's document without acceptance; clause (33) asks the look read, on T-V10-52's fixtures and from its milestones, with a `building` naming a district, a plot, a field and a building gone since the read that returned it, each answering no `over` and every other field as without `building`; with a `field` naming a building, a plot, a district and a field gone since the read that returned it, each answering no `over` and every other field as without `field`; with both — a building a disaster look stands over and a field a famine look draws bare — each look's `over` as asked with that one alone; and with one naming an address no read of the session returned, as `building` and as `field`, refused before the read runs (row 34) | PR (the rung and budget clauses nightly) |
| T-V10-51 | item 120's Find from words (takes T120-2's clerk clause): on a canary fixture (T-V9-66's) at `public` and `secret` keys and under View as, "show me the blacksmiths" ends in one `find` block whose run sets the Find panel's chips to the blacksmith kind, with no event, no log entry and the document's hash and every digest unchanged; the `add`, `remove`, `clear` and `gaps` forms set, change, empty and switch as V10 §3.9b (7) states; a form naming a class the town lacks, the concealed guild's class at `public`, an address no read of the segment returned, or a seventeenth target leaves no chip for it and is listed in the repair; `read_map find`'s counts, per-layer counts and matches equal §11.2's gazetteer listing at the session's effective key and the panel's own counts, the canary absent below its key, and at a drawn week whose frame is not the head (a scrub to before a matched building was built, and one to before a matched building's use changed) they equal the panel's — §11.2's listing at that week, a building matched by its use then, never its head use — a chip with none there counting 0; an address form naming an institution sets its chip; a build without Find renders no rule 20, no find form and no `find` member; a host proxy's projection keeps `FindAnswer` whole; a host message never sets a chip — no bridge message, a `view.set` among them, changes §2.9's `find` (§11.3), and SettlementForge's assistant answers in words (V08 §3.16 (6) (g)); the budget of V10 §6.1 | PR, from M5 (Find's milestone; V09 §8); its drawn-week clause at the later of M5 and V06's E6 (V06 §3.15.2's frames) |
| T-V10-52 | item 122's crisis looks explained: on a B-DOSSIER-lite fixture (§13.2) carrying a siege of two armies, a refugee wave with no `untilWeek`, a plague, an `infiltrated` stressor (a `none`-row condition) and a fire calamity naming a district with its linked `reconstruction` condition (V08 §3.16 (7) (b), (d)), at `public` and `secret` keys and under View as, in weeks inside and outside each condition's weeks, `read_map look`'s `crises` lists exactly §11.2's `looks` answer's crises — the legend's entries (§9.5) — at the session's effective key: at `public` every look-bearing condition — the siege, the refugee wave, the plague and the fire's linked `reconstruction` condition (its disaster look) — is listed with its name and weeks (§7.7's DR44), and the `none`-row condition carried beside them is named in no read, request, reply, card or transcript at `public`, and only at `secret`; each look with V09's line (`info.crisis.line`, `.lineOpen`, `.lineUnnamed`) and its weeks read against §2.9's `week`, never the year position, and on a copy of the fixture whose plague the dossier names not, given an `untilWeek` and then none, its look worded `.lineUnnamed` and then `.lineUnnamedOpen`; a scripted "what are the tents by the north gate?" names the refugee camp with its condition and weeks as a look and proposes no event; standalone, a preview reads `info.crisis.preview` alone; with `crises` `off`, or no condition and no preview, `looks` is empty and the brief, every read, every digest and the cached prefix are byte-identical across every week and every crisis display; "why is this house in ruins?" on a house the fire's disaster look stands over (`read_map look` with it answering `over` true) tells the look, worded `info.crisis.ruinedFor`, and the house's own damage rows apart, and on a house of the struck district whose rebuilding Works has begun (`over` false) tells its own rows alone (C10); under a `disaster` preview a house of its units names it by `info.crisis.ruinedForPreview`; on V08 §7.1's famine fixture (T-V9-85's, a famine at severity 0.5), "why is this field bare?" on a bare field names the famine in `info.crisis.ruinedFor`'s form, as its why card's `facts` row does, and on a field left sown names none; the budget of V10 §6.1 | PR, from C4's exit (its dossier clauses from M-SF, the famine fixture's among them; its disaster district's and its previewed `disaster`'s from M5) |
| T-V10-53 | item 123's damaged plan explained: on V03's damage fixtures — an `abandoned`, a `decayed` and a `ruined` building, one restored with patches, one never decayed, a ruined church with its crypt, one generated ruined and one item 113's replay ruined — `why`'s `plan` section carries V10 §3.9a's damage rows: `info.damage.head.<state>` with the level and its run's whole years, one `info.damage.<kind>` row per damaged kind present with its count and range row, and `info.damage.head.restored` with `info.damage.patched` on the restored one; a scripted "what is left inside?" answers in those rows' words ("roof fallen in over the hall; the upper floor is gone") and names no element, hole or cause they lack; at a higher level the rows are a superset of a lower level's and the room, wall and opening ids are the intact plan's; the never-decayed building has no damage row and its `why` answer is byte-identical to the answer without item 123 (item 123 (f)), a kind's range edited to `lo` = 0 included (§6.3 *Plan damage*: a level of 0 damages nothing); at `public` on a building the key withholds the room-naming rows are absent and the state, level and counts kept, the crypt row `purpose: true`; the generated ruin reads V11's default age at the creation week and ages from then, and the replayed one the years of its run from its replay epoch's week (V06 §3.23 (4)); before M6-E each reads its existence state at V11's default age with no years; the budget of V10 §6.1 | PR, from V03's item-123 plan step (V03 §8; its decay-level clauses from M6-E) |

=== END ===
