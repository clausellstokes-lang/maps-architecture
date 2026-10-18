# Seam check: the application (V09), the clerk (V10) and the host (V08) — round 6

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-surfaces-r6; covered by the whole-design retrovalidation (J84).

PROGRESS
- §0 Method, inputs and coverage | done
- §1 Re-check of round 5 (SR5-01 – SR5-09) | done
- §2 What the sweep found consistent | done
- §3 Issues (SR6-01 – SR6-08) | done
- §4 Disposition summary by owning volume | done
- §5 Decisions of this check | done
- §6 CONFIRMED versus PLAUSIBLE | done

Ids of this check are cited as "SR6-nn (surfaces)" where they could be confused with seam-settlements-r6's SR6-nn.

## 0 Method, inputs and coverage

**Inputs** (md5 at the start and again before §3 was written; snapshots in `scratchpad/volumes/surfr6/now/`): V09
`9cdc1965…` (4 913 lines), V10 `c78aac11…` (4 038), V08 `e41d8fb7…` (3 856), file f `839ccce5…` (1 806), `_integrate.md`
`965ab696…` (468, unchanged since round 1's continuation), the base `01fea21f…` (unchanged). Round 5's inputs are kept in
`scratchpad/volumes/surfr5/now/` (V09 `9274c4bc…`, V10 `c5aa04a6…`, V08 `8be737e0…`, file f `e4c1756e…`). Every round-6
reconcile lane had landed before this check began (V09 14:27, V11 14:25, V10 14:21 with V09's logged companion edit at
14:24, V08 14:12, V06 13:59); no lane touched the three volumes while it ran.

**Method** (J-SS6.1). (1) Each of SR5-01 – SR5-09 located in its owner's landed text and every sentence the fix touches
read on the other side of the seam. (2) Every change since round 5, by word diff against round 5's snapshots: V10 100 KB,
V08 63 KB, file f 29 KB — read whole; V09 126 KB, read whole but for V9 §4.9's table, whose button column was rewritten by
script (110 rows), so the table was read whole in the live text instead; `_integrate.md` none. (3) The other volumes'
round-6 changes, by diff against their lanes' pre-round backups (V01, V03, V04, V05, V06, V07, V11, V12; V02 unchanged,
`65e5ea63…`), grepped for every seam term (the three volumes and their pointers, `ClerkMount`, `ClerkAction`, `MsgRef`,
`MsgRow`, `MsgButton`, the `button.`, `clerk.`, `host.`, `bend.`, `refuse.`, `info.` keys, `useTool`, `forkAt`, `rerunFrom`,
the XV/CVR/BCR ids): V11 60 hits, V07 44, V06 15, V12 12, the rest 0, each read in context. (4) The censuses re-run on the
live text: every `V9 §`, `V10 §` and `V8 §` pointer among the three volumes resolves (`surfr4b/xref.py`, 0 unresolved);
the key census, extended this round to the `button`, `effect`, `fate`, `success`, `share`, `offer`, `import` and
`disabled` families (`surfr6/keys.py`), finds every `button.*` key V10 names among V9 §4.9's rows and leaves round 5's
residue only (table paths, `report.changed`, `history.ageYears`, family references). (5) Every cross-volume request the
three hold toward one another (V9 §10.2's XV rows, V10 §10.2's CVR rows, V08 §13's X rows) and toward this seam from V06
(X48) and V11 (X-V11-17) checked against its target's text. (6) Read whole in the live text: V9 §2.3's `ToolRow` and
`ToolModeRow`, §2.9 (`MsgRow`, `MsgButton`, *The buttons as data*), §3.3's refusal paragraph, §3.9's copy bullets, §4.5's
*Mode ids* and the T6, T9, T10 and T11 rows, §4.6, §4.9 whole (the table, *The `button.*` rows*, *The event forms*, *The
application commands*, the families table), §4.11 whole, §4.20.7, T-V9-13, -15, -27, -32, -60, J-V9.121 – 124, XV-V9-30,
-31; V10 §2.3's `ClerkTurn`, §2.4's `DraftItem`, §2.6 (`TurnView`, `ProposalView`, `ClerkAction`, the dispatch table,
*The card's buttons*), §2.10's `refusals`, §3.3's rules 6, 10 and 15 – 18, §3.5 steps 3 – 4, §3.11's assembly and
staleness, §3.13 steps 1 and 4, §3.16 whole, §3.17's host paragraph, §5.4, T-V10-4, -7, -16, -20, -29, -44, group C,
J-V10.101 – 109, CVR-V10-20; V08 §1b's changed rows, §3.7's draft-mirror bullet, §4.2's introduction and table, §4.4 (3),
§5.1 whole, §13's X12; V6 §4.4 and its X47, X48; V11's registry row 87 and X-V11-17; the base's §5.2 F-EDIT row whole and
§11.2's `ConflictAction` with BCR-V9-12's text; `_integrate.md` J-VI.4 and J-VI.30. **Not re-read** this round: the parts
of the three volumes no diff touched and (6) does not list (V10 §3.9 – §3.10 and §4.1; V08 §2 – §3.14 but §3.1 step 7 and
§3.7's bullet) — claimed as PLAUSIBLE only (§6). Scratch: `scratchpad/volumes/surfr6/`.

## 1 Re-check of round 5

All nine round-5 issues are fixed in the text their owners were asked to change. Six left a residue, filed anew in §3;
one residue (SR5-01's) is the larger gap SR6-01, which the button lists made visible: the clerk's card has no field for a
draft item's bend or refusal buttons.

| id | owner | state now | residue filed |
|---|---|---|---|
| SR5-01 | V09 | FIXED — (a) `MsgRow.buttons?: MsgButton[]` with `key`, `does`, `from`, `page`, `arg`, `tool`, `mode`, `subject` and, found beside, `each`, `event`, `command`, `when`, a sixth class `app` (J-V9.121); *The buttons as data*; (b) V9 §4.9's column as lists, every `refuse.*` row ending with `button.showWhy` (`refuse.stale` gains it, J-V9.123), 67 `button.*` rows, 21 event forms, 24 application commands; (c) every named button classed as asked (**Keep {building}** `drop`; **Change the stairs** `shape`/`tiers` and **Change the building's shape** `shape`/`massing`, both `subject: building`; **Show a different name** and **… on this map** `name`/`rename`, `subject: thing`, `[names]`; **Choose another of the marked places** from `alternatives`, each `button.putAt`; the picker from `unplaced`; **Make this town a city** and **Rebuild from {stage}** from `event`; **Add a way down** `place`/`access`; **Move it** a `show`); (d) T-V9-13, -15, -27 | SR6-01 (the bends' and refused items' buttons have no carrier on the clerk's card); SR6-06 (b) |
| SR5-02 | V10 | FIXED — (a) `useTool` gains `mode?` and `ids?`, the dispatch row, **Add a way down** as `{ tool: 'place', mode: 'access' }`, T-V10-4, -44; (b) the `dossier` row's (1) a `propose` through the request's anchor else a `select`, (3) "Move {thing}", (3) and (5) `select`s of the forms' new optional `<id>`, a `dossier:count` form without one read as the `dossier` form (J-V10.107, found beside), rules 6 and 10, step 4, T-V10-7, -16; (c) J-V10.104; (d) `refusals.actions` with `tool`, `mode`, `format` | SR6-05 (a) (a `subject` button with no admitted address: J-V10.107 against V9 §2.9's not-drawn rule) |
| SR5-03 | V10 | FIXED — prompt rule 17 ends a what-if with `[[do:fork:<seq>]]` alone, a re-run only on request; group C's grader "with no `rerun` block"; J-V10.103's reason; J-V10.108 | — |
| SR5-04 | V09 | FIXED — V9 §3.9's sentence and the bullet *Before a rebase point* (rows, restore points, the drawer's `fork` and `rerun`), detected by `forkedFrom.seq` (J-V9.122); `info.copy.condensed`, its text V6 §3.15.5's line loaded from volume 6; V9 §4.11's bullet; T-V9-15, -27 | — |
| SR5-05 | V10 | FIXED — V10 §3.17: one answer when the card closes, and (found beside) `close` with the card open answers as **Drop**; V10 §3.11's host sentence, §2.6's host card, T-V10-20, J-V10.109; V9 §4.11's card-only drawer and V9 §2.10's `answer` agree; V08 §4.4 (3) cites V10 §3.17 | — |
| SR5-06 | V10 | FIXED — (a) step 3 reads `MsgRow.buttons` by `does` (with `each`, `event`, `when`, `refuse.stale`'s `preview` as the card's `focus`; the lock row's closest alternative and the `dossier` row's (2) retired, as V9's lists no longer offer them); (b) step 1; (c) step 4's closing; (d) the bends paragraph; (e) V10 §8 names AP8 | SR6-05 (b) – (c) (`message` for BCR-V9-12's `msg`; source lists restated) |
| SR5-07 | V09 | FIXED — (a) V9 §4.11's `useTool` bullet, §4.5's *Mode ids* (T6's `access`); (b) V9 §4.9's `clerk.alt.*` row reads V10 §5.4's list; (c) the page forms `messages#<key>` and `staged/<layerId>` in V9 §5.15 and §1b, T-V9-32; (d) XV-V9-8's V10 part **Met** | SR6-06 (a) (T-V9-15 keeps the old clause beside the new) |
| SR5-08 | V11 | FIXED — row 87's sources as required (reconcile-V11-r6, landed 14:25) | SR6-08 (V09's XV-V9-31, raised after V11 landed) |
| SR5-09 | V06 | FIXED — V6 §4.4: "**A what-if is a fork**" in the `forkAt` bullet; the history panel's sentence | SR6-07 (X48 still reads as an open request) |

## 2 What the sweep found consistent

Read on every side and found to agree, so not filed (each a check a later round need not repeat unless its text moves):

* **The button contract, class by class.** V9 §2.9's *The buttons as data* and V10 §3.5 step 3 agree on every class: a
  `commit` from a `ConflictAction` kind takes the first action of that kind, from `alternatives` one `propose` per
  alternative worded by `each`, from `unplaced` one per element worded by `key`, from `event` the bytes of V9 §4.9's event
  form; `why` reads `MsgButton.page` first, else V10's target rule; `show` selects the `arg` (a `MsgRef` argument, or a list
  source), `refuse.stale`'s `preview` being the card's `focus`; `tool` opens `tool` in `mode` with a `subject`'s ids;
  `drop` withdraws. The mode ids V10 uses (`access`, `rename`) are V9 §4.5's; V10's `dossier` row (4) opens T11 in `rename`,
  the mode of `refuse.dossierOwned`'s own button; T6's `access` mode emits `placeAccess` on a chosen spot, as V9 §4.17.4 (4)
  describes **Add a way down**. `MsgButton.tool` (a `ToolId`) and `useTool.tool` (a canvas `ToolName`) are the same twelve
  strings.
* **The lock row.** V9's `refuse.locked` lists **Unlock** and **Show me why**; V10 retired its "closest unlocked
  alternative". The base's F-EDIT recovery names "the blocking lock" for a lock and closest sites only for placements, so
  neither card contradicts §5.2.
* **Moves.** V9 §4.6 moves a place by `placeAt` on the plot under its new centre and a way or wall only by its handles;
  V9's **Move it** (`show(thing)`) and V10's `select`-based (1), (3) and (5) agree, and the base's F-EDIT offers for a
  dossier-backed element (`rejectSite`; `placeAt`) stay reachable — **Not here** is the `rejectSite`, the drag the
  `placeAt`. A dossier-declared way's (1) that a request's anchor turns into a `propose` is V10's own alternative, shown
  once with the button's words when it equals the `select` (V10 §3.16's shown-once rule).
* **The why target and its pages.** `MsgButton.page` (`refuse.staged`'s `staged/{layerId}`, filled from the `MsgRef` by V9
  §2.9's *Arguments a button reads*) is read first; else the blocking thing admitted by name at the reader's key; else
  `messages#<key>` (V9 §5.15, §1b, T-V9-32).
* **Copies before a rebase point.** V9 §3.9's bend follows V6 §3.15.5 and §4.4 for every entry point, the drawer's
  `fork` and `rerun` blocks included; `info.copy.condensed`'s text is written once, in volume 6, and V11's row 87 lists
  that source.
* **The what-if.** V10's rule 17, J-V10.108 and group C's grader; V6 §4.4 ("A what-if is a fork"); T-V6-22.
* **The host's answer.** V10 §3.17, §2.6 and §3.11; V9 §4.11's card-only drawer ("the harness answers the host through
  `ClerkMount.host.answer`"); V9 §2.10's `answer(id, status, seqs?)`; V08 §2.2's `clerkProposal` event and §4.4 (3) — one
  answer per proposal, at the card's close.
* **One knowledge rule.** A `subject`'s ids, a `why`'s `id` and every slot are read at the reader's key — the canvas's the
  role's key (J-V9.86), the clerk's its session key — in V9 §2.9, V10 §3.5 step 3 and V10 §3.16 alike.
* **Volume 8's round 6** (class words from V11's `label` cell or a pin kind's symbol-key word; REPLACEMENT receipts)
  reaches this seam only through the `host.note.*` rows' `class` argument, which V9 §2.9 renders as any string argument
  (and SR6-03's article).
* **The other volumes' round 6.** V11's display cells feed V9's stamp palette, roster reader and `refuse.roster.dossier`'s
  `{thing}` (the content seam's subject; X-V11-17 (a)'s sprite glyphs are V09's next build, not a contradiction); V07's
  *label · synonyms* column is the content and settlements seams'; V12's X-V12-18 needs no edit in V09 or V10; V06's X47
  belongs to the settlements seam.
* **Requests.** V9 §10.2's XV rows to V10 and V08 are **Met** (XV-V9-30 by V10's landed text and V09's logged companion
  edit of V10 §3.11 and §3.17); V10's CVR rows to V09 and V08 are **Met** (CVR-V10-20 on V09's text, SR6-05 (e) for its
  status wording); V08's X rows toward V09 and V10 are **CLOSED** (X12's closure over-reaches: SR6-04). No BCR of V08, V09
  or V10 changed this round; file f's one change inside the seam is item 516's *Needed by* (V07, V08, V09, V10, V11),
  which matches the readers V11's display cells name.

## 3 Issues

Severity: **blocker** (breaks an owner ruling), **major** (a contradiction or an unwired piece a builder would hit),
**minor** (wording, a restatement, a stale status, a type left loose). One owning volume per issue (J-SS1.1); a volume's
companions, statuses and wording are bundled into one minor (J-SS2.6).

### 3.1 The draft's lines on the clerk's card

**SR6-01 · major · V10 · unwired (a bent or refused item's buttons have no place in the drawer's view model).** V10 §3.5
step 3 turns a bent item's row into actions — the answer "leaves the item `bent`, the bend its `bent` line and its
alternatives `propose` actions" — and V10 §3.16's *The dry run's bends* says each bend "reaches the model and the card as
the item's `bent` line (`DraftItem.bent`, `ProposalView.variations[].bends`), its buttons as actions"; J-VI.4 makes "the
former offer … the bend or its first alternative". But V10 §2.6 types `ProposalView.variations[].bends: MsgRef[]`,
`DraftItem.bent?: MsgRef` and a roster card's `lines?: { name; state; closest?: Id[] }` — no actions anywhere. Likewise
V10 §3.11's assembly step 1: "Refused and conflicting items are left out and listed on the card", yet neither
`ProposalView` nor `TurnView` holds such a list — `TurnView.refusal?: RefusalView` is one refusal, the turn's own (a gate
or the model's form, V10 §3.13 step 4), and `DraftItem.refusal` never reaches the view. So V09's drawer cannot draw what
T-V10-4 asserts (on the dug-access fixture the card "carries that row's **Show the way in** as a `select`" and the
alternatives) or what T-V9-27 compares ("for every bend and refusal row of T-V9-13's fixture the drawer's card and the
canvas's card carry the same buttons in the same order"); and V10 §3.5 step 4 gives the model "its bend line" but not the
alternatives prompt rule 10 tells it to offer. A second defect appears as soon as the buttons are drawn: inside a
proposal of several items, a bend's `commit` is a `propose` "previewed as a proposal of their own" (V10 §2.6's dispatch
table), which supersedes the proposal (V10 §3.11 step 6), and **Keep {building}** is "the proposal's **Drop**" (V10
§3.16) — either discards the other items, while the canvas's own button replaces only its one draft (V9 §2.9: "`commit`
previews its events as a new draft"). *Required change:* (a) V10 §2.6: `ProposalView.variations[].bends` becomes
`{ item: string /* the DraftItem id */; msg: MsgRef; actions: ClerkAction[] /* V10 §3.5 step 3's reading of the row's
MsgRow.buttons; empty on a source 'host' proposal, whose card offers accept, drop and why only */ }[]`; `lines[]` gains
`actions?: ClerkAction[]` (a bent or refused line's row buttons by the same reading — `refuse.roster.dossier`'s picker,
**Put it at {site}**, **Show me why**); `TurnView` gains `refused?: { item: string; refusal: RefusalView }[]` — every
refused or conflicting item of the draft, in item order, with its `ClerkRefusal`'s `msg` and actions — drawn with the
proposal card, or alone when none stands, while `TurnView.refusal` stays the turn's own; V10 §1b.1's `TurnView`,
`ProposalView`, `ReplyBlock` row and V10 §2.14's `Proposal` row follow. (b) Inside a proposal that holds other items, a bend's `commit` is a
`propose` of the active variation's events with the bent item's events replaced by the button's events, and its `drop`
(**Keep {building}**) a `propose` of the variation's events without the bent item's, worded by the button; a refused
item's `commit`, while a proposal stands in the same turn, is a `propose` of the active variation's events followed by the
button's events; placeholders re-resolve by V10 §3.11 (3), a dependant that no longer resolves being dropped and listed;
where the item is the proposal's only item, or no proposal stands, these are the button's events and the card's **Drop**,
as now; V10 §3.16's **Keep {building}** sentence and J-V10.106 follow (J-SS6.2). (c) V10 §3.5 step 4's result gives each
bent item's action labels with its bend line. (d) T-V10-4 asserts the bend actions on `ProposalView` (the dug-access and
`bend.under.noAccess` cases it names); a new clause: a two-item draft, one item bent by `bend.place.noSite`, one applied —
its **Choose another of the marked places** alternative yields one proposal holding both items, and **Drop** is not
offered as the bend's button; a turn with one refused and one applied item carries the refusal in `refused` beside the
proposal. V09's companion: SR6-06 (d).

**SR6-02 · minor · V09 · the effect lines on the clerk's card promise buttons they have no data for.** V9 §4.11 draws a
proposal's effects "under **What else changes** drawn as the fates sheet draws them" (V10 §5.4 says the same). The fates
sheet's lines carry their rows' buttons (V9 §4.9): **Show** (`show(targets)`), `effect.raised.goes`'s **Keep it as
yours** (`commit(event:keepRaised)`, T1's checkbox, V9 §4.20.3 (7)) and `effect.more`'s **Show** (`app(showEffects)`, "the
fates sheet's **What else changes**, paged"). A clerk card's effect line is `{ kind; text; targets }` (V10 §2.6) — no key,
so the drawer cannot tell `effect.raised.goes` from `effect.added`; its count is `effectsMore`, "effects beyond the ten
shown", not the engine's beyond fifty; and no fates sheet belongs to a clerk proposal for `showEffects` to page. V10 §3.5
step 3 meanwhile says "No row a dry run gives the clerk carries an `app` button (V9 §2.9; T-V9-15)", where V9 states it of
`bend.*` and `refuse.*` rows only, and `effect.more` — a row the dry run answers (`effectsMore`) — carries one.
*Required change:* V9 §4.11's proposal-card bullet (and its card-only drawer) reads "its effects under **What else
changes**: each line its `text` with **Show**, a selection of its `targets`, then 'and {n} other changes' (`effect.more`'s
words, `{n}` the variation's `effectsMore`) with no button; no other button of an `effect.*` row is drawn on a clerk card —
a Re-derive's **Keep them as yours** is T1's (V9 §4.20.3 (7)), and in the drawer the user asks for the ways to be kept,
which V10 prompt rule 16 lets the clerk declare"; T-V9-60's clerk-card clause follows (J-SS6.4). V10's companion: SR6-05
(f).

### 3.2 The catalogue's words

**SR6-03 · minor · V09 · "a {slot}" before a vowel-initial word renders "a inn".** Volume 11's round 6 writes its class,
kind and family labels bare (V11 §2.3's display cells) and records the defect as its X-V11-17 (c), proposed to V09's and
V08's next rounds, which no lane has taken. V08 §4.6's `unmapped_kind` ("… so it is built as a {class}.") and
`custom_resolved` ("{name} is built as a {class} ({rung}).") render "built as a inn"; V9 §4.9's `bend.room.minArea` ("the
smallest a {role} can be"), `bend.crossing.steep` ("a ramp on a {class}"), `bend.deck.class` ("A {class} can't stand on a
{deck}"), `effect.added` ("The city raises a {kind}" — "a aqueduct"), `effect.raised.goes` ("{name}, a {kind}, goes") and
`button.roleInstead` ("Make it a {role2} instead"), and V9 §4.10's history templates "Drew a {class} ({m} m)", "Raised a
{kind} from {a} to {b} …" and "Placed a {kind}"; V10's K4 ("{quarter} is declared a {kind} quarter …"). The argument forms
are V9 §2.9's. *Required change:* V9 §2.9's argument forms gain the English indefinite form `{a <slot>}`: the slot's
rendered words after "an" when they begin with a, e, i, o or u — except words beginning "uni", "use", "usu", "eu" or
"one", which take "a" — else after "a"; a locale file writes its own grammar in its `text` (the form is `en`'s only); the
V9 §4.9 and §4.10 rows above write `{a role}`, `{a class}`, `{a kind}`, `{a deck}` and `{a role2}` where they now write
"a {…}"; T-V9-15 flags any `en` text with "a {" or "an {" before a slot. Companions: SR6-04 (c) (V08's two notes), SR6-05
(g) (V10's K4). (J-SS6.3; X-V11-17 (c).)

**SR6-04 · minor · V08 · the frame's own words have no keys.** V9 §4.9: "Every `host.*` key volume 8 names is a row of
the same file, its text volume 8's (V08 §13 X12: §4.2's controls and undo words, §5.1's strips and banner rows,
`host.locked`, the port's notes, V08 §4.6's history lines … — and the draft mirror's discard notice)". V08 names keys for
the status banner, the party lines, the notes and the held rows, but none for §4.2's control labels ("Refresh now",
"Restore previous map", "Make a new map from the record", "Reveal to the party", "Hide from the party", "Hide again",
"Reveal again", "The party's base knowledge", "See what the players see", "Assistant settings", "Update the map engine")
and their dialogs' lines; for §5.1's frame strip "Showing what the players see" and its button "Show everything"; for
`host.status.failed`'s button **Retry**; or for §3.7's notice "unsaved changes from an earlier version of this map were
dropped". X12 was closed in round 5 on V09's loading sentence, which loads only keys V08 names, so `HostSlots.header` and
`.banner` (V9 §2.2) must draw literal English, and the strip's button, offered by a message line, stands outside V9 §2.9's
`MsgButton` data (SR5-01). *Required change:* (a) V08 names a `host.*` key beside each of those words, where the words
stand — §4.2's table gains a key column (`host.control.<action>` for a label, `host.dialog.<action>` for a dialog's line,
`host.undo.<action>` for an undo word); §5.1 `host.playersView` for the strip and `host.status.retry` for the banner's
button; §3.7 `host.mirror.dropped` for the notice — each `en` text written once there; the strip's row carries
`buttons: [button.showEverything app(viewAsOff)]` (V9 §2.9; in host mode V9 §4.8's clear is the players'-view toggle's
off, V08 §3.14 (5)); V9 §4.9's `host.*` sentence loads them unchanged. (b) X12 reads "CLOSED on V9 §4.9's sentence and
the keys V08 names in §3.7, §4.2 and §5.1 (seam-surfaces-r6 SR6-04)", and T-V8-14's walker checks that every quoted word
of V08 §4.2 and §5.1 has its key. (c) SR6-03's companion: `unmapped_kind` and `custom_resolved` write `{a class}`.

### 3.3 Companions, wording and statuses

**SR6-05 · minor · V10 · one rule narrower than V09's, a field's name, restated lists, duplicate wordings, a status and
two companions.** *Required change:* (a) V10 §3.5 step 3's "a `subject` button of a contextual tool (`ToolRow.contextual`:
T9, T10) that finds none is not offered" reads "a `subject` button whose row has no address argument the session's key
admits is not offered", and its parenthetical list of V9 §2.9's *Where a button is not drawn* adds that case; J-V10.107's
"while any other tool opens with nothing selected" is replaced by "a V10 §3.16 alternative's `useTool` without an address
(the `dossier` row's (4)) opens with nothing selected"; T-V10-4's "(none offered for a contextual tool's `subject` button
with no such address)" drops "contextual tool's" — V9 §2.9 withholds every such button, whatever the tool. (b) V10 §1b.1's
label row and §3.5 step 3 read "a dry-run action's own `msg` (BCR-V9-12's `MsgRef`, keyed as its button, V9 §4.9)" in
place of "own `message`" — BCR-V9-12 keeps `message` as "the English default" and gives the words to `msg`. (c) V10 §2.6's
`label` comment cites V10 §1b.1's label row in place of its own list of sources (which omits `clerk.alt.stale.retry`);
V10 §1b.1's buttons row cites V9 §2.9 for `MsgButton`'s fields in place of listing them (the list omits `command`); V10
§5.4's "keeps that row's own words, its `MsgButton.key`" reads "keeps that row's words by V9 §2.9's *Words*" (a list
entry is worded by `each`, a dry-run action by its `msg`). (d) `clerk.alt.history.fork` ("Open a copy from here") and
`clerk.alt.history.undo` ("Undo") repeat `button.openCopy` and `button.undo`, V9 §4.9's shared rows, one per wording:
the `fork` block, the card's **Undo** and `clerk.applied`'s **Undo** are worded by those rows, and the two `clerk.alt`
keys leave V10 §3.13 step 4, §2.6's *The card's buttons*, §4.4, §5.4's list and T-V10-29 (`.rerun` and `.rebuild` stay: no
`button.*` row words them) (J-SS6.7). (e) CVR-V10-20 reads **Met** on V09's landed text (reconcile-V09-r6, 14:27,
`9cdc1965…`), its "in flight … it reopens here" clause dropped, and V10 §12's PLAUSIBLE clause on that lane's landing moves
to CONFIRMED. (f) SR6-02's companion: step 3's "No row a dry run gives the clerk carries an `app` button" reads "No
`bend.*` or `refuse.*` row a dry run gives the clerk carries an `app` button (V9 §2.9; T-V9-15); a proposal card's effect
lines are drawn by V09 (V9 §4.11)", and V10 §5.4's "drawn as V09's fates sheet draws them" cites V9 §4.11. (g) SR6-03's
companion: K4's template writes `{a kind}`.

**SR6-06 · minor · V09 · a round-5 residue, a key's number, a bar's scope and SR6-01's companion.** *Required change:*
(a) T-V9-15 drops "`clerk.alt.*` (one per alternative of V10 §3.16's rows and per harness button V10 §2.6's `label`
comment names; SR4-02)" from its family list — the later clause, "one row per key V10 §5.4's list of the drawer's keys
names", is the rule (SR5-07 (b) asked for it "in place of" the old). (b) V9 §4.9's `clerk.alt.*` row's "`<n>` its
position in its row" reads "`<n>` its number in V10 §3.16's alternatives column, kept when an alternative is retired" —
round 6 retired the `dossier` row's (2), so positions no longer name V10's keys. (c) T-V9-27's card comparison states
that its scripted `TurnView`s carry no request words, so the two substitutions volume 10 makes from a request — **Show a
different name** as the `setAttr displayText` `propose` when the request carried the name, and a dossier-declared way's
(1) as a `propose` through the request's anchor (V10 §3.5 step 3, §3.16) — are T-V10-4's to measure, not this bar's.
(d) SR6-01's companion: V9 §4.11's proposal-card bullet draws each bend line with its `actions` as buttons worded by
their labels (a `select` without one as its ids' chips), each roster line's `actions`, and the turn's `refused` items as
refusal cards below the proposal card, or alone; V9 §2.9's *The clerk's reading* says "`drop` → the card's **Drop** where
the bent item is the proposal's only item, else a `propose` without it (V10 §3.16)"; T-V9-27 reads a bend's buttons from
`ProposalView.variations[].bends[].actions`.

**SR6-07 · minor · V06 · a request marked open after its owner landed it.** V6 §13's X48 (V10's prompt rule 17, the
what-if fork), V6 §12's PLAUSIBLE clause ("V10 prompt rule 17 as SR5-03 requires (X48) — this volume is written as if
both were applied") and the round-6 note's ("V10 rule 17's texts as their seams require (their lanes open; X47, X48)")
still read as pending; reconcile-V10-r6 landed at 14:21 with rule 17, J-V10.108 and group C's grader as X48 states.
*Required change:* X48 reads "**Met** in V10's landed text (prompt rule 17, J-V10.108, group C's what-if grader;
reconcile-V10-r6, 14:21)", and both clauses move X48's half to CONFIRMED (X47 is the settlements seam's).

**SR6-08 · minor · V11 · the catalogue's registry row reads one row type for every locale.** V9 §2.9's *Locales* (J-V9.121)
makes a locale file carry each key's `text` only, `buttons`, `tone` and `codes` being read from `en.json`; V11 §3.1's row
87 still types every `messages/<locale>.json` as `MsgRow`. V09 raised it as XV-V9-31 after reconcile-V11-r6 had landed.
*Required change:* row 87's row type reads "`MsgRow` for `en.json`; `{ key; text }` for every other locale's file (V9
§2.9's *Locales*)", its loader refusing a locale file that carries `buttons`, `tone` or `codes`; T-V11-1's registry check
follows; V9 marks XV-V9-31 **Met** on that text.

## 4 Disposition summary by owning volume

| owner | blocker | major | minor | ids |
|---|---|---|---|---|
| V10 | 0 | 1 | 1 | SR6-01; SR6-05 |
| V09 | 0 | 0 | 3 | SR6-02, SR6-03, SR6-06 |
| V08 | 0 | 0 | 1 | SR6-04 |
| V06 | 0 | 0 | 1 | SR6-07 |
| V11 | 0 | 0 | 1 | SR6-08 |

Totals: 0 blockers, 1 major, 7 minors (8). Round 5's nine issues: all FIXED. SR6-01 is new in kind, not a regression:
round 0's SS-17 wrote "its alternatives as `propose` actions" for a bend and no round asked where the card holds them;
the button lists of round 6 (SR5-01) and T-V9-27's card comparison made the missing field a bar no build can pass. No
base change request is needed: `ProposalView`, `TurnView`, `MsgRow`, the argument forms and the `host.*` keys are volume
10's, volume 9's and volume 8's own text, and no base section states them.

**Pairs to apply together:** SR6-01 with SR6-06 (d) (V10 types the carriers and their semantics, V09 draws them);
SR6-02 with SR6-05 (f); SR6-03 with SR6-04 (c) and SR6-05 (g); SR6-08 with V09's XV-V9-31 status. **Order of work:**
V10 and V09 in parallel — V10 writes `ProposalView`'s and `TurnView`'s fields and the multi-item semantics first, V09
reads V10's landed type for SR6-06 (d) before it lands; V08, V06 and V11 at any time. If seam-content-calibration-r6
files X-V11-17 (c) as well, the owners apply SR6-03 once (J-SS6.8).

## 5 Decisions of this check (vetoable)

| id | decision |
|---|---|
| J-SS6.1 | chose to re-check round 5 in the owners' landed text and to sweep by whole word diffs against round 5's snapshots plus the seam's core sections read whole (§0 (6)), over reading all three volumes whole (1.8 MB), as rounds 1 – 5 did (J-SS1.5, J-SS5.1); V9 §4.9's table was read whole in the live text because its button column was rewritten by script and its diff is noise; the sections no diff touched and §0 (6) does not list stay PLAUSIBLE (§6) |
| J-SS6.2 | chose, for SR6-01 (b), that a bend's `commit` inside a proposal of several items replaces the bent item's events in the active variation, its `drop` removes them, and a refused item's `commit` appends to the standing proposal — each still a `propose` previewed as a proposal of its own — over the button's events alone (a new proposal that supersedes and so discards the other items, V10 §3.11 step 6) or a per-item Accept (a second commit path beside V10 §4.2's one group), because the canvas's button replaces only its own draft (V9 §2.9), the user asked for every item of the turn, and one proposal per session stays one group on Accept (J-V10.36); the single-item case keeps today's behaviour, so T-V10-4's existing clauses stand |
| J-SS6.3 | chose, for SR6-03, one English indefinite form `{a <slot>}` in V9 §2.9's argument forms — "an" before a, e, i, o, u; "a" before "uni", "use", "usu", "eu", "one" and every consonant — over an article cell per label in volume 11 (volume 11 keeps its labels bare, X-V11-17 (c)) or rewording every row to avoid the article, because X-V11-17 (c) proposed exactly this, one rule serves every volume's rows, and another locale writes its own grammar in its `text`; the confirming measurement is T-V9-15's check plus its readability step over the fixture labels; the pre-decided fallback, for a label the rule words wrongly, is to reword that one row without an article |
| J-SS6.4 | chose, for SR6-02, that a clerk card draws an effect line's **Show** only — no `effect.more` paging and no **Keep it as yours** — over carrying each effect's key and actions on `ProposalView`, because the card holds ten lines by design (C10-53), a clerk proposal has no fates sheet to page, and a raised way the user wants kept is the user's declaration, which the clerk makes on the user's words (V10 prompt rule 16) |
| J-SS6.5 | chose to file SR6-04 although round 5 closed X12, because that closure checked V09's loading sentence and not the keys it loads, and SR5-01's buttons-as-data rule now requires the strip's **Show everything** to be a `MsgButton`; the key families (`host.control.*`, `host.dialog.*`, `host.undo.*`, `host.playersView`, `host.status.retry`, `host.mirror.dropped`) are this check's proposal, V08 free to name them otherwise so long as each word has one key |
| J-SS6.6 | kept J-SS1.1 (one owner per issue) and J-SS2.6 (one bundled minor per volume for companions, statuses and wording: SR6-05, SR6-06), and rated SR6-01 major, since T-V10-4 and T-V9-27 assert buttons no type carries; SR6-02 – SR6-04 are minor, each a wording or keying gap with no behaviour contradiction between the volumes |
| J-SS6.7 | chose, for SR6-05 (d), that V10's `fork` and `undo` labels reuse V09's shared `button.openCopy` and `button.undo` rows over two keys per wording, because V9 §4.9's `clerk.alt.*` row already limits that family to labels that are not a `button.*` row's words, and a translator should meet one wording once; `.rerun` and `.rebuild` keep their `clerk.alt` keys, no `button.*` row wording them |
| J-SS6.8 | recorded that SR6-03 carries volume 11's X-V11-17 (c), addressed to V09's and V08's next rounds and taken by no lane; should the content seam file it too, one application by its owners closes both |

## 6 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (each located in the live text on both sides; quoted phrases copied from the files read this round): the
§1 re-check of SR5-01 – SR5-09; SR6-01 – SR6-08, each by the lines it quotes — V10 §2.6's `TurnView`, `ProposalView`
(`bends: MsgRef[]`, `lines`, `effects`, `effectsMore`), `ClerkAction`, the dispatch table and *The card's buttons*; V10
§2.3's `ClerkTurn`, §2.4's `DraftItem`; V10 §3.5 steps 3 and 4, §3.11's assembly steps 1 and 6, §3.13 step 4, §3.16's
*The dry run's bends* and **Keep {building}** sentence, §5.4, K4, T-V10-4, J-V10.106, J-V10.107, CVR-V10-20, V10 §12's
round-6 PLAUSIBLE clause; V9 §2.9's *The buttons as data*, V9 §4.9's table, `clerk.alt.*` row and `host.*` sentence, V9
§4.10's templates, V9 §4.11's proposal-card bullet, T-V9-15, T-V9-27, T-V9-60; V08 §3.7's draft-mirror bullet, §4.2's
table, §4.6's `unmapped_kind` and `custom_resolved` rows, §5.1, X12; V6 §12, §13's X48 and its round-6 note; V11's row
87 and X-V11-17 (c); J-VI.4. The absence claims by `grep` over the current files: no field carrying a bend's or a refused
item's actions on `ProposalView` or `TurnView`; no `host.*` key for §4.2's labels, §5.1's strip and its button, the
banner's **Retry** or §3.7's notice; no indefinite form in V9 §2.9. The changes since round 5 were established by
executed diffs against snapshots whose md5s equal round 5's inputs; the pointer and key censuses by script (0 unresolved;
every `button.*` key V10 names is a V9 row). Inputs unchanged from start to end (md5 as in §0, re-checked before §3 and
before this section).

**PLAUSIBLE:** that the parts of the three volumes no diff touched and §0 (6) does not list — V10 §3.9 – §3.10 and §4.1,
V08 §2 – §3.14 but §3.1 step 7 and §3.7's bullet — hold no new seam defect (rounds 0 – 5 read them; J-SS6.1); that
SR6-01 (b)'s replacement semantics need no change to V10 §4.2's acceptance (one group of the proposal's events, as now);
that SR6-03's letter rule words every shipped label correctly (J-SS6.3's measurement decides, its fallback pre-decided);
and that SR6-01 – SR6-08 need no re-pricing beyond V10's C3 – C5 and V09's AP8 ranges (two typed fields and one list on
the view model, their drawing, a rendering form, key names and statuses).
