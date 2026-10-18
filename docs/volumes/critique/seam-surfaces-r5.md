# Seam check: the application (V09), the clerk (V10) and the host (V08) — round 5

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-surfaces-r5; covered by the whole-design retrovalidation (J84).

PROGRESS
- §0 Method, inputs and coverage | done
- §1 Re-check of round 4 (SR4-01 – SR4-06) | done
- §2 What the sweep found consistent | done
- §3 Issues (SR5-01 – SR5-09) | done
- §4 Disposition summary by owning volume | done
- §5 Decisions of this check | done
- §6 CONFIRMED versus PLAUSIBLE | done

## 0 Method, inputs and coverage

**Inputs** (md5 at the start and again before §3 was written; snapshots in `scratchpad/volumes/surfr5/now/`): V09
`9274c4bc…` (4 667 lines), V10 `c5aa04a6…` (3 896), V08 `8be737e0…` (3 745), file f `e4c1756e…` (1 709), `_integrate.md`
`965ab696…` (468, unchanged since round 1's continuation), the base `01fea21f…` (unchanged). Round 4's inputs are kept in
`scratchpad/volumes/surfr4b/now/` (V09 `f16fc374…`, V10 `0edd1635…`, V08 `bb42f20b…`, file f `0da3c86c…`; md5 checked).

**Method** (J-SS5.1). (1) Each of SR4-01 – SR4-06 located in its owner's live text — reconcile-V10-r5 (landed 13:10),
reconcile-V09-r5 (13:14), reconcile-V08-r5 (12:49) — and every sentence the fix touches read on the other side of the
seam. (2) Every change since round 4, by word diff against round 4's snapshots: V10 65 KB, V09 25 KB, V08 20 KB, file f
26 KB, `_integrate.md` none — all read whole. (3) The other volumes' round-5 changes, by word diff against their lanes'
backups (V01, V02, V03, V04, V05, V06, V07, V11, V12), grepped for every seam term (the three volumes and their section
pointers, `ClerkMount`, `ClerkAction`, `MsgRef`, the `clerk.`, `host.`, `bend.`, `refuse.`, `info.` keys, `forkAt`,
`rerunFrom`, `ChronicleEntry`, the XV/CVR/BCR ids); the hits (V07 23, V11 15, V12 6, V01 1, V06 1) read in context.
(4) The two censuses of round 4 re-run on the live text (`surfr4b/xref.py`, `keys.py`; outputs in `surfr5/`): every
`V9 §`, `V10 §` and `V8 §` pointer among the three volumes resolves (0 unresolved); every catalogue key V10 and V08 cite
is a V09 row or falls under a V09 family row (the residue is `clerk.ops` / `clerk.content` table paths, `report.changed`,
`history.ageYears` and family references, none a missing row). (5) Every cross-volume request row the three hold toward
one another (V9 §10.2's XV rows, V10 §10.2's CVR rows, V08 §13's X rows) checked against its target's text. (6) Read whole
in the live text: V10 §2.6, §2.9, §2.10, §3.3's prompt rules, §3.5, §3.11 – §3.17, §4.2 – §4.4, §5.4, the changed tests
and J-V10.100 – 105; V9 §2.3, §2.9, §2.10, §3.3's refusal sentence, §3.9, §4.5's T6 and T9 rows, §4.6, §4.9 whole, §4.11
whole, §5.3, §5.8 – §5.10, §5.15, T-V9-15, -27, -32; V08 §3.1 step 7, §4.2 – §4.4 (not re-read by round 4); V6 §3.15.5,
§4.4, §2.10's `ChronicleEntry`, W19, W81, T-V6-22; V11 registry row 87. **Not re-read** this round: the parts of the
three volumes no diff touched and step (6) does not list (V10 §3.9 – §3.10 and V08 §2 – §3.14 but step 7 among them) —
claimed as PLAUSIBLE only (§6). Scratch: `scratchpad/volumes/surfr5/`.

## 1 Re-check of round 4

All six round-4 issues are fixed in the text their owners were asked to change. Three left a residue that this round
files anew, and two of those residues are this seam's own required wording (J-SS5.4, J-SS5.8): round 4's `{ kind; msg }`
row for a refusal's alternatives carries no tool, mode or format (SR5-02 (d)), and round 4's what-if offer pairs the fork
with a re-run that replays the same history (SR5-03).

| id | owner | state now | residue filed |
|---|---|---|---|
| SR4-01 | V10 | FIXED — (a) `ClerkAction` gains `{ kind: 'why'; id?; page?; label }` (exactly one of `id`, `page`), the dispatch table's `why` row (the application), `run` rejecting it with the application's kinds, V10 §1b.2's dispatch row; (b) V10 §3.5 step 3's four classes and *The why target*, one rule for canvas and clerk; the bends paragraph (`bend.under.accessOpening`'s **Show me why** a `why`, both rows' **Show the way in** a `select`, `bend.under.noAccess`'s **Add a way down** a `useTool` of `place`); (c) the `role` row's "See why {thing} is here" (`why`) and `select`; (d) the `select.label` comment; (e) `useTool.tool` narrowed to the twelve canvas tools; (f) T-V10-4's accessOpening clause, T-V10-44; J-V10.101; CVR-V10-19 met in V9 §4.9's opening (J-V9.120) | SR5-01 (the row's own buttons have no data to read), SR5-02 (a `useTool` cannot name the canvas's mode) |
| SR4-02 | V10 | FIXED — `label` required on every kind but `select` (on `undo` and `rebuild` too, J-V10.102: sound, since both now reach the reply), its three sources stated once (V10 §2.6's comment, §1b.1's label row), the `clerk.alt.<category>.<n>` family written in V10 §3.16's alternatives column, `clerk.alt.help.useTool`, `.history.*`, `.critique.fix`, `.stale.retry`; V10 §5.4's key list; T-V10-29, T-V10-44 | SR5-02 (d): `refusals.actions: { kind; msg? }[]` holds no tool, mode or format; SR5-07 (b): V09 cites V10 §2.6's comment, which does not name `clerk.alt.stale.retry` |
| SR4-03 | V10 | FIXED — the action form `[[do:<kind>(:<arg>)]]` and V10 §3.13 step 4 (repair now step 5), extended to `undo`, `rebuild` and `refuse` (J-V10.103: sound — V10 §3.14's answers and group G's recorded categories had no producer); the chronicle read carrying the cause's `seq`; prompt rules 8, 15, 17, 18; V10 §1b.1's `ReplyBlock` row; T-V10-16, -35; group C's what-if case (89 cases) | SR5-03 (the what-if re-run), SR5-06 (b), (c) (step 1 reads the form as a link; step 4's closing claim) |
| SR4-04 | V10 | FIXED — (a) the stale card shows `refuse.stale` with **Show the new preview** (`focus`) and **Ask again** (`clerk.alt.stale.retry`), a host's card without it; (b) `clerk.view.cleared`, `clerk.applied`; (c) "Three cases"; (d) CVR-V10-4 **Met**; (e) the `role` row renders `refuse.viewer`, T-V10-29 "but `lock`, `rule` and `role`"; J-V10.105 | SR5-05 (the host's `stale` answer has no moment now that the stale host card stays open) |
| SR4-05 | V09 | FIXED — (a) V9 §4.11's *Turns*, *The actions* (`why` → the why card or the Help page), V9 §2.10's `run` comment ("seven kinds"), T-V9-27; (b) V9 §4.9's `clerk.alt.*`, `clerk.view.cleared`, `clerk.applied` rows, the `refuse.clerk.<category>` row "but `lock`, `rule` and `role`" with `refuse.clerk.dossier.count`, T-V9-15, V9 §1b's messages row; (c) the stale and applied quotations; (d) XV-V9-7, -10, -11, -12, -17, -18 **Met**, V9 §12's clauses moved (XV-V9-12's reading of `RaisedOutcome`'s `key`, J-V9.119: sound — V10 §2.13's type has no `reason` field) | SR5-07 (b) |
| SR4-06 | V08 | FIXED — X11 and X12 **CLOSED** with citations; §13's opening names them; V08 §12's round-5 paragraph | — |

## 2 What the sweep found consistent

Read on every side and found to agree, so not filed (each a check a later round need not repeat unless its text moves):

* **The `why` action, end to end.** V10 §2.6's kind, its dispatch row and T-V10-44; V9 §4.11's *The actions* bullet and
  V9 §2.10's `run` comment (seven application kinds: `select`, `why`, `openSettings`, `useTool`, `export`, `fork`,
  `rerun`); V9 §4.9's opening rule citing V10 §3.5 step 3's *The why target*; the `role` row's two `why` buttons (the
  row's **Show me why** on `refuse.viewer`, which has no address argument, so its page; "See why {thing} is here" on the
  declaration's target). The why card reads at the session's key, which V10 §2.3 takes from `ClerkMount.effectiveKey()`,
  the canvas's own key (V9 §2.10), so the two cards cannot disagree on what they name.
* **Labels and keys.** Every `clerk.alt.*` key V10 names falls under V9 §4.9's `clerk.alt.*` family row, and every text
  is written once in the V10 section V10 §5.4's list names; `refuse.viewer`, `refuse.stale`, `clerk.view.cleared` and
  `clerk.applied` are drawn where V9 §2.10 and §4.11 say (the viewer's declarations, a key change, the applied card);
  T-V9-15 and T-V10-29 walk the same families. `ToolRow.label` (V9 §2.3) is a `MsgKey`, so "Open {tool}" renders in the
  session's locale.
* **The action form's inputs.** `WhyAnswer.history[].seq` and `removed.seq` (V10 §2.13), `ChronicleEntry.cause`
  (`EditRef | RuleRef`, V6 §2.10), `ProposalView.accepted.seqs` and `ClerkMount.rebuildEvents(seq)` (V9 §2.10) hold every
  value step 4 checks a form against; `forkAt(h, seq)` takes the prefix *through* `seq` (V9 §3.9, V6 §4.4), so "one less"
  forks before the event.
* **The host seam** (V08 §3.1 step 7, V08 §4.2 – §4.4, V10 §3.17, V9 §2.10's `ClerkMount.host`): one channel, the bridge
  handler; the host card's actions `accept`, `drop`, `why`; the projection kinds (T-V8-27's list, V10 §3.17's table); the
  handler's one `subscribe` and its per-key cache — as round 4 found them, with nothing moved but SR5-05's answer timing.
* **Requests.** V9 §10.2's XV rows to V10 and V08 are **Met** but XV-V9-8's V10 part (SR5-07 (d)); V10's CVR rows to V09
  and V08 are **Met** (CVR-V10-3, -4, -7, -15 – -19; CVR-V10-14's V08 part); V08's X rows to V09 and V10 are **CLOSED**.
  V08's X22 (V07, V11) belongs to the settlements seam.
* **The other volumes' round-5 changes** touch this seam nowhere that the three volumes cite differently: V07's and V11's
  hits are the pin-record and `unmapped_kind` work of the settlements seam (V08 §3.5.1 (c), §4.6), read as V08 now states
  it; V12's are the register's `--defaults --milestone` (the clerk's provenance answer reads statuses, not the command);
  V06's new `EpochReport.shade.surfacesRelaid` and `.surfacesHeld` (W81) name "the app's history panel, the clerk" as
  readers, which V10's `report` read (V10 §3.5: "summarises `report(h)`") and W19's generic reader row cover; V01's is a
  register wording. File f's round-5 items (505, 575, 576, 580, 581, 309, 251, 444) touch no surface of this seam, and no
  BCR of V08, V09 or V10 changed this round.

## 3 Issues

Severity: **blocker** (breaks an owner ruling), **major** (a contradiction or an unwired piece a builder would hit),
**minor** (wording, a restatement, a stale status, a type left loose). One owning volume per issue (J-SS1.1); a volume's
companions, statuses and wording are bundled into one minor (J-SS2.6). SR5-01 – SR5-03 and SR5-05 sit in the contract
round 4 opened — the buttons of a card, on canvas and clerk; SR5-04 is where that contract meets volume 6's history calls.

### 3.1 The buttons of a card — one source for canvas and clerk

**SR5-01 · major · V09 · unwired (a row's buttons are prose, and the type holds one).** V9 §2.9's `MsgRow` carries a
single `action?: MsgKey /* the button the message offers */` and nothing of what it does, while V9 §4.9's rows offer up
to three ("Put it at {site}" · "Show me why"; "Show the way in" · "Show me why"; the element picker · "Put it at {site}"),
their behaviour in prose parentheses, and the opening rule adds **Show me why** to every refusal (V9 §3.3: "every card
carries at least one action — at the least **Show me why**") though `refuse.locked`, `refuse.assigned`, `refuse.kept` and
`refuse.dossierOwned` list none. Since round 4 the clerk builds its cards from the same buttons: V10 §3.5 step 3 turns
"the row's own buttons" into `ClerkAction`s "by what the canvas's button does", labelled by "V9 §4.9's button text". So a
builder of either card has no data from which to list a row's buttons, find their words' keys or know what each does, and
several fit none of V10's classes as the prose stands: **Keep {building}** withdraws the edit; **Change the stairs** and
**Change the building's shape** open controls on the building; **Show a different name** and **Show a different name on
this map** open the display-text path (V9 §4.4: "the map-side alternative … (`displayText`, §9.1)"; T11), yet V10 §3.5
step 3 lists the latter as a button that commits events; **Choose another of the marked places** picks among the preview's
sites. T101-3's one-mapping bar and T-V10-4's card comparison need one source. *Required change:* (a) V9 §2.9's
`MsgRow.action?` is replaced by `buttons?: MsgButton[]`, in the row's order:
`interface MsgButton { key: MsgKey /* its words: a row of a new button.* family, one row per wording, shared — "Show me
why" is button.showWhy wherever offered */; does: 'commit'|'why'|'show'|'tool'|'drop'; from?: ConflictAction['kind'] |
'alternatives' | 'unplaced' | 'event' /* commit: the dry-run action whose events it carries, one button per preview
alternative, one per unplaced dossier element, or the one event the row names */; page?: string /* why: a page the row
names (refuse.staged's layer page); else V10 §3.5 step 3's target rule */; arg?: string /* show: the MsgRef argument, or
'alternatives', whose ids it selects */; tool?: ToolId; mode?: string /* tool: the tool and its ToolModeRow.id */;
subject?: true /* tool: the row's first admitted address selected first */ }`. (b) V9 §4.9's button column is that list
with its keys, and every `refuse.*` row's list ends with `button.showWhy` (the opening rule made data; J-SS5.2). (c) The
buttons named above read: **Keep {building}** `drop`; **Change the stairs** and **Change the building's shape** `tool`
`shape` with `subject`; **Show a different name** and **Show a different name on this map** `tool` `name` with `subject`;
**Choose another of the marked places** `commit` from `alternatives`; the element picker `commit` from `unplaced`; **Make
this town a city** and **Rebuild from {stage}** `commit` from `event`; **Add a way down** `tool` `place` with T6's Below
access mode (SR5-07 (a)); every other button is classed by the same five values. (d) T-V9-15 checks that every row with
a button carries its list, every button key is a `button.*` row, every `tool` button names a `ToolId` and a mode of
`toolkit.json`, and every `refuse.*` row carries `button.showWhy`; T-V9-27 and T-V10-4 read both cards' buttons from these
lists. V10's companion is SR5-06 (a). (J-SS5.2.)

**SR5-02 · major · V10 · contradiction (the tool buttons cannot do what the canvas's do).** `ClerkAction`'s `useTool`
carries only `tool` (V10 §2.6), and V9 §4.11 runs it as "that tool active with its options strip" — in whatever mode the
tool last had (V9 §4.2: "Options are remembered per tool"). (1) `bend.under.noAccess`'s **Add a way down** is "T6 on a
chosen spot" in T6's **Below** access mode (V9 §4.5's T6 row; V9 §4.17.4 (4)); the clerk's `useTool` of `place` (V10
§3.16's bends paragraph) opens T6 in whatever mode it last had, on the current working layer. (2) The `dossier` row's (3) "Move a place" and (5) "Move
one of the existing ones" are `useTool place`, and its (1)'s fallback for a dossier-declared way or wall is a `useTool` of
`road` or `wall`; on the canvas a place, a way or a wall moves by dragging the selection or its handles (V9 §4.6), while
T6, T4 and T3 make new things — each button promises a move and opens creation. (3) A contextual tool (T9 `shape`, T10
`hold`) acts on the selection, which a `useTool` cannot set (SR5-01 (c)'s `subject` buttons). (4) `clerk.content.refusals
.actions: { kind; msg? }[]` (V10 §2.10; round 4's own wording, SR4-02 (b); J-SS5.8) holds no tool, mode or format, so the
`picture` row's `useTool dress` and `export` PNG, the `scope` row's tool and the dossier row's rows cannot be written as
the data the harness reads. *Required change:* (a) `useTool` becomes `{ kind: 'useTool'; tool: Exclude<ToolName, …>;
mode?: string /* a ToolModeRow.id of that tool, V9 §2.3 */; ids?: Id[] /* selected before the tool is activated */;
label: string }`; the dispatch row reads "that tool active in `mode` (else as last used) on the mode's working layer
(V9 §4.2), `ids` selected first"; V10 §3.5 step 3's `tool` class carries the button's `tool` and `mode` and, for a
`subject` button, the row's first admitted address as `ids`; `bend.under.noAccess`'s **Add a way down** is `useTool {
tool: 'place', mode: T6's Below access mode }`, and T-V10-4's noAccess clause asserts the mode. (b) Moves are selections:
the `dossier` row's (1) reads "a `propose` of the `road` or `wall` re-declaration of its course through the anchor the
request named, else a `select` of the way or wall (its handles drawn, V9 §4.6)"; (3) becomes "Move {thing}" and (3) and
(5) become `select` actions of the address the model's form names — the forms gain an optional last argument,
`[[do:refuse:dossier:<id>]]` and `[[do:refuse:dossier:count:<id>]]`, `<id>` an address a read of this segment returned
(the element asked about; for `count`, one existing place of that class), checked by V10 §3.13 step 4 as a link is; with
no `<id>`, (3) and (5) are not offered and (4) stands; prompt rules 6 and 10, step 4's `refuse` bullet, T-V10-7's count
clause and T-V10-16's form clauses follow. (c) J-V10.104's reason drops "`useTool` alternatives" for the moves. (d)
`refusals.actions` reads `{ kind: ClerkAction['kind']; msg?: string; tool?: ToolName; mode?: string; format?: string }[]`
— `tool` and `mode` for a `useTool` row, `format` for an `export` row (the `picture` row's (2): PNG, V9 §5.10's Picture
tab), the `scope` row's tool read from the model's form. V09's companion is SR5-07 (a). (J-SS5.3.)

**SR5-03 · major · V10 · contradiction (a what-if re-run replays the same history).** Prompt rule 17 answers "what if the
old wall had stayed?" with `[[do:fork:<s−1>]]` and `[[do:rerun:<s−1>]]`, saying "a copy from just before it can take the
other course", and group C's what-if case expects both blocks — round 4's required text (SR4-03; J-SS5.4). But
`rerunFrom(seq)` forks and re-appends every later epoch from its stored `EpochInputs` in one call (V6 §4.4), and "with no
change reproduces the original history's digests epoch for epoch" (T-V6-22): the re-run copy dismantles the wall again.
Only the fork answers a what-if — in the copy the user keeps the wall (a lock, T10) and grows the copy on (V6 §4.1's
`advance`). A build passes group C and ships a button that answers the question wrongly. *Required change:* (a) prompt
rule 17 ends the answer with `[[do:fork:<seq>]]` alone and says the copy starts just before that event, where the user can
keep the thing (lock it) and advance the copy; (b) rule 17 adds: `[[do:rerun:<seq>]]` only when the user asks to re-run
the town's history from a point, never as a what-if; (c) group C's what-if grader reads "ends with a `fork` block at the
seq before the epoch event that dismantled the wall, worded by V9 §3.9's words, with no `rerun` block, and declares
nothing"; T-V10-16's `rerun` clause stays (the form's check); J-V10.103's reason reads "V6 §4.4 gives the clerk the
what-if fork". V06's companion is SR5-09. (J-SS5.4.)

### 3.2 The history calls, the host's answer

**SR5-04 · major · V09 · contradiction (a copy from before a rebase point).** V9 §3.9's *Re-run from here*: "Before a
rebase point the action is disabled with V06's reason." Volume 6 bends instead, since the integration's first round:
"`forkAt` and `rerunFrom` at an earlier seq **bend** (J-VI.4; ST-35) to the earliest seq they can take, with the line
'history before year N was condensed; the copy starts at year N'" (V6 §3.15.5; V6 §4.4; J-V6.98). "V06's reason" no
longer exists, and the bend's line has no row in V9 §4.9, so a builder either disables a control volume 6 serves or shows
a line the catalogue cannot word (V9 §2.9: an engine line with no row is a CI failure). Since round 4 the clerk's `fork`
and `rerun` blocks (V10 §3.13 step 4, whose check does not read the rebase point) reach the same calls through V9 §4.11.
*Required change:* V9 §3.9's sentence reads "Before a rebase point both take the earliest seq they can, with volume 6's
line (V6 §3.15.5; J-V6.98)", for the history and chronicle rows, the restore points' items and the drawer's `fork` and
`rerun` buttons alike; V9 §4.9 gains `info.copy.condensed`, its text V6 §3.15.5's line with `{year}`, loaded from there as
V9 §4.9's explanation paragraph loads volume 10's families, shown in the new document's opening toast after V9 §3.9's
own; T-V9-15 covers it; a T-V9-27 clause forks from a drawer `fork` block below a rebased document's `base.seq` and finds
the copy at the earliest seq with the line. (J-SS5.6.)

**SR5-05 · major · V10 · unwired (the host's `stale` answer has no moment).** V10 §3.17 answers a host proposal
`clerk.proposal { status: 'accepted'|'dropped'|'stale'|'failed' }` — "`stale` follows V10 §3.11's staleness rule" — V10
§2.6 says a host's card "closes once answered", and T-V10-20 asserts a `stale` answer. Since round 4 (SR4-04 (a)), V10
§3.11 keeps a stale host card open: it "shows `refuse.stale` and its button alone", whose **Show the new preview** is
then "accepted like any other", and V9 §4.11 draws the same. No step posts `stale`: posting it when the card turns stale
closes a card both volumes keep open, and a later Accept would answer one proposal twice, while V08 §4.4 (3) hands the
answer to the host's assistant as "what the DM chose" (citing V10 §3.17). *Required change:* V10 §3.17 reads "A host
proposal is answered once, when its card closes: **Accept** → `accepted` with its `seqs` (the fresh preview's when the
card had turned stale); **Drop** → `stale` when the card had turned stale, else `dropped`; superseded → `dropped`; no
variation left (V10 §3.11) → `failed`"; V10 §3.11's host sentence adds "answered when it closes (V10 §3.17)"; T-V10-20's
clause reads "a moved town turns the card stale; its Drop answers `stale`, its Accept `accepted`". V08 needs no text (it
cites V10 §3.17). (J-SS5.5.)

### 3.3 Companions, wording and statuses

**SR5-06 · minor · V10 · the companion of SR5-01, three wording defects and a price.** *Required change:* (a) V10 §3.5
step 3 reads each row's buttons from V9 §2.9's `MsgRow.buttons` (SR5-01): `does` names the class, `commit` → `propose`,
`why` → `why`, `show` → `select`, `tool` → `useTool` (SR5-02 (a)), `drop` → the card's **Drop**, or `check_draft`'s `drop`
in words (as the bends paragraph already says of **Keep {building}**); "by what the canvas's button does" and "Every
button of a row the dry run gives the clerk falls in one class" are replaced by that reading, and class (a)'s examples
drop **Show a different name on this map**; where the user's request carried the words, the `dossier` row's `setAttr
displayText` `propose` stands in for **Show a different name** under that button's words (V10 §3.16's "shown once" rule).
(b) V10 §3.13 step 1 reads "Every `[[id]]` or `[[id|words]]` — an action form, `[[do:…]]`, is step 4's and never a link —
must name …". (c) Step 4's closing sentence reads "The form never carries events: the only map-changing buttons it makes
are `undo` of the session's own last accepted proposal and `rebuild`, which previews first; every other button that changes
the map is the harness's (a proposal card, a refusal's or a bend's alternatives), so text inside a tool result or a label
can never make one (group H, V10 §7.3)". (d) The bends paragraph closes its "(the preview's `alternatives`, in two cases:
…)" parenthesis after the dug-access case and states the `select`, `why` and `useTool` mappings and the examples ("Draw a
road to its foot" for `bend.raised.island`; "Stairs along the front") as sentences of their own. (e) V10 §8's total names
V09's AP8 (1–1.25 pw, V9 §8.1) as the rest of M3c's price, outside this volume's total (V9 XV-V9-8's V10 part).

**SR5-07 · minor · V09 · the companions of SR5-01 and SR5-02, a pointer, the why page's id and a status.** *Required
change:* (a) V9 §4.11's `useTool` bullet reads "that tool active in the action's `mode` (else as last used) on that mode's
working layer (V9 §4.2), its `ids` selected first" (SR5-02 (a)); V9 §4.5's T6 row names the `ToolModeRow.id` of its Below
access mode, which `bend.under.noAccess`'s and `info.under.sealed`'s **Add a way down** open (SR5-01 (c)). (b) V9 §4.9's
`clerk.alt.*` row and T-V9-15 read "each key V10 §5.4's list of the drawer's keys names" in place of "each harness button
V10 §2.6's `label` comment names", since that comment does not name `clerk.alt.stale.retry`. (c) The why page's id: V9
§5.15's message-catalogue row states the form `why.page` carries — the `@plat/docs` messages page's anchor for a row's key,
and for `refuse.staged` the staged layer's guide page — V9 §1b's "`@plat/docs`' messages page" names its per-row anchors,
and T-V9-32 covers every catalogue row whose **Show me why** resolves to a page by V10 §3.5 step 3's rule and every staged
layer's page. (d) XV-V9-8's V10 part is marked **Met** once V10 §8 names AP8 (SR5-06 (e)); its V04, V05 and V02 parts are
outside this seam.

**SR5-08 · minor · V11 · the catalogue's registry row lists old sources.** V11 §3.1's row 87 (`messages`) loads volume 10's
key families' `en` texts "from V10 §2.10, §3.9, §3.9a, §3.10, §3.16 and §3.20"; since round 5 V10 also writes them in §3.11
(`clerk.alt.stale.retry`), §3.12 (`clerk.view.cleared`), §3.13 (`clerk.alt.help.useTool`, `clerk.alt.history.*`) and §4.4
(`clerk.applied`), as V9 §1b's messages row now lists, and row 87 omits volume 8's `host.*` rows, which V9 §1b names.
*Required change:* row 87's source reads "V9 §2.9 (the rows V9 §4.9; volume 10's key families' `en` texts loaded from V10
§2.10, §3.9, §3.9a, §3.10, §3.11, §3.12, §3.13, §3.16, §3.20 and §4.4; volume 8's `host.*` rows, V08 §13 X12; volume 6's
`info.copy.condensed` line, V6 §3.15.5, SR5-04)".

**SR5-09 · minor · V06 · the what-if example names a flow no call gives.** V6 §4.4 illustrates `rerunFrom` with "what if I
had kept the old wall: fork before the epoch that dismantled it, lock the wall, re-run" and closes "the clerk offers them
on 'what if…' questions"; but `rerunFrom` forks and re-appends in one call, so no lock comes between, and with no change
it reproduces the original (T-V6-22). *Required change:* the example reads "fork before the epoch that dismantled it, lock
the wall in the copy, and advance the copy (V6 §4.1)"; the last sentence reads "the clerk offers a copy from before the
event on 'what if…' questions, and a re-run when asked (V10 prompt rule 17; seam-surfaces-r5 SR5-03)".

## 4 Disposition summary by owning volume

| owner | blocker | major | minor | ids |
|---|---|---|---|---|
| V09 | 0 | 2 | 1 | SR5-01, SR5-04; SR5-07 |
| V10 | 0 | 3 | 1 | SR5-02, SR5-03, SR5-05; SR5-06 |
| V11 | 0 | 0 | 1 | SR5-08 |
| V06 | 0 | 0 | 1 | SR5-09 |

Totals: 0 blockers, 5 majors, 4 minors (9). Round 4's six issues: all FIXED. Two of the majors correct this seam's own
round-4 wording (SR5-02 (d)'s row type, SR5-03's what-if re-run; J-SS5.4, J-SS5.8); SR5-01 is the data the four-class
rule of round 4 (J-SS4.1) needs and the prose table never gave; SR5-04 is an older contradiction between V9 §3.9 and
volume 6 that the clerk's new `fork` and `rerun` blocks now reach (J-SS5.6); SR5-05 follows from SR4-04 (a)'s open
stale card. No base change request is needed: `MsgRow`, `ClerkAction`, the action form and the host answer are volume
9's and volume 10's own text, and no base section states them; volume 8 needs no change.

**Pairs to apply together:** SR5-01 with SR5-06 (a) (V09 writes the button list, V10 reads it); SR5-02 with SR5-07 (a)
(V10 widens `useTool`, V09 runs it and names T6's access mode); SR5-03 with SR5-09 (the what-if fork, and V06's example);
SR5-04 with SR5-08's `info.copy.condensed` source; SR5-06 (e) with SR5-07 (d). **Order of work:** V09 and V10 in
parallel — each writes its own half first (V09 the `MsgButton` list and the rebase sentence; V10 the `useTool` shape, rule
17 and the host answer) and reads the other's landed text for its companion before it lands; V11 and V06 at any time.

## 5 Decisions of this check (vetoable)

| id | decision |
|---|---|
| J-SS5.1 | chose to re-check round 4 in the owners' live text and to sweep by whole word diffs against round 4's snapshots plus the seam's core sections read whole (§0 (6)), over reading all three volumes whole (1.7 MB), as rounds 1 – 4 did (J-SS1.5); the sections no diff touched and §0 (6) does not list stay PLAUSIBLE (§6) |
| J-SS5.2 | chose, for SR5-01, a typed button list on V09's catalogue row (`MsgButton`: its words' key in a shared `button.*` family, its class, the data the class needs) over V10 keeping a per-row mapping of its own, because V09 owns the rows and both cards must read one source (T101-3, T-V10-4); chose a fifth class `drop` for **Keep {building}**, which withdraws an edit and fits none of round 4's four; and chose to read V9 §3.3's and §4.9's "at the least **Show me why**" as every refusal row carrying it, since the why card is the refusal's explanation on canvas and clerk alike and the lists must agree |
| J-SS5.3 | chose, for SR5-02, to widen `useTool` with `mode` and `ids` over new action kinds, because the canvas's tool buttons differ only by mode and by what they act on; to make every "move" alternative a `select` (the canvas moves a selection by dragging, V9 §4.6) over a tool; and to give the model's dossier form an optional address over dropping the move alternatives, since the address is what the user asked about and a read already returned it |
| J-SS5.4 | revised round 4's SR4-03: its required text paired the what-if fork with a re-run, which by V6 §4.4 and T-V6-22 replays the same history; the fork alone answers "what if", the re-run stays for a request to re-run — the defect is this seam's own, not volume 10's |
| J-SS5.5 | chose, for SR5-05, one answer per host proposal, sent when its card closes (`stale` for a Drop of a card that had turned stale), over answering `stale` at the moment the card turns stale, because both V09 and V10 now keep the stale host card open with an acceptable fresh preview, and V08 §4.4 (3) hands the host's assistant "what the DM chose" |
| J-SS5.6 | chose to file SR5-04 in this seam although its other side is volume 6, because the clerk's `fork` and `rerun` blocks (V10 §3.13 step 4) reach volume 6 through V09's handlers, and V9 §3.9's sentence contradicts V6 §3.15.5 on the same calls |
| J-SS5.7 | kept J-SS1.1 (one owner per issue) and J-SS2.6 (one bundled minor per volume for companions, statuses and wording: SR5-06, SR5-07), and rated SR5-05 major rather than minor, since T-V10-20 asserts a `stale` answer no step produces, a bar no build can pass without re-deciding |
| J-SS5.8 | recorded that SR5-02 (d)'s row type (`{ kind; msg }`) is round 4's own required wording (SR4-02 (b)), which named the words but not the payload a `useTool` or `export` needs; the correction is filed against V10, which owns the type |

## 6 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (each located in the live text on both sides; quoted phrases copied from the files read this round): the
§1 re-check of SR4-01 – SR4-06; SR5-01 – SR5-09, each by the lines it quotes — V9 §2.9's `MsgRow` (`action?: MsgKey`, one
button), V9 §3.3's refusal sentence, V9 §4.9's button column (`refuse.locked`, `refuse.assigned`, `refuse.kept`,
`refuse.dossierOwned` without **Show me why**; `bend.vacate`, `bend.stack.removeStair`, `bend.stack.addWing`,
`bend.place.noSite`, `refuse.roster.dossier`, `bend.under.noAccess` and their buttons), V9 §4.4's display-text
alternative, V9 §4.2's remembered options, V9 §4.5's T6 row, V9 §4.6's moving, V9 §4.11's `useTool` bullet and stale
lines, V9 §3.9's rebase sentence, V9 §5.15, V9 §1b's messages row, T-V9-15, T-V9-32, XV-V9-8; V10 §2.6's `ClerkAction`,
dispatch table and card buttons, V10 §2.10's `refusals` type, V10 §3.3's rules 6, 8, 10 and 17, V10 §3.5 step 3, V10
§3.11's staleness, V10 §3.13 steps 1 and 4, V10 §3.16's `dossier`, `picture`, `scope` rows and bends paragraph, V10 §3.17's
host answer, V10 §8's total, T-V10-4, -7, -16, -20, group C; V6 §3.15.5, §4.4 and T-V6-22; V11 row 87; V08 §4.4 (3). The
absence claims by `grep` over the current files: no `mode` or `ids` on `useTool`; no `buttons` on `MsgRow`; no row in V9
§4.9 for V06's "condensed" line; no step of V10 posting `stale`; no `AP8` in V10. The changes since round 4 were
established by executed word diffs against snapshots whose md5s equal round 4's inputs; the pointer and key censuses by
script (0 unresolved). Inputs unchanged from start to end (md5 as in §0, re-checked before §3 and before this section).

**PLAUSIBLE:** that the parts of the three volumes no diff touched and §0 (6) does not list — V10 §3.9 – §3.10, V08 §2 –
§3.14 but step 7 among them — hold no new seam defect (rounds 0 – 4 read them; J-SS5.1); that the owners can class every
other V9 §4.9 button by SR5-01's five values without a sixth (the table was read whole and the named cases are the only
ones found open); that a `mode` on `useTool` suffices for every tool button the canvas offers (T6's access mode is the one
found needing it); and that SR5-01 – SR5-09 need no re-pricing beyond V09's AP3 and AP8 and V10's C3 – C5 ranges (a
type, a table column, a prompt rule, a sentence each).
