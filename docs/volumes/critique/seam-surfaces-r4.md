# Seam check: the application (V09), the clerk (V10) and the host (V08) — round 4

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-surfaces-r4; covered by the whole-design retrovalidation (J84).

PROGRESS
- §0 Method, inputs and coverage | done
- §1 Re-check of round 3 (SR3-01 – SR3-15) | done
- §2 What the sweep found consistent | done
- §3 Issues (SR4-01 – SR4-06) | done
- §4 Disposition summary by owning volume | done
- §5 Decisions of this check | done
- §6 CONFIRMED versus PLAUSIBLE | done

## 0 Method, inputs and coverage

**Why this file was written now.** The lane started at 07:42 and was cut after its skeleton; the workflow re-issued it
(CONTINUE rule, lane note 12:01). Round 3 (`seam-surfaces-r3.md`) now holds fifteen issues: SR3-01 – SR3-09 (06:49,
fixed by the round-4 reconcilers' first briefs, 07:19 – 07:38) and SR3-10 – SR3-15 (its continuation of 11:07, fixed by
reconcile-V04-r4 11:35, V06-r4 11:39, V09-r4 11:48, V10-r4 11:53, V08-r4 11:54 and BASE-F-r4 11:44). All fifteen are
re-checked here in the live text; the skeleton's "SR3-01 – SR3-09" heading is widened accordingly.

**Inputs** (md5 at the start; snapshots in `scratchpad/volumes/surfr4b/now/`): V09 `f16fc374…` (4 597 lines), V10
`0edd1635…` (3 718), V08 `bb42f20b…` (3 681), file f `0da3c86c…` (1 616), `_integrate.md` `965ab696…` (468, unchanged
since round 1's continuation), the base `01fea21f…` (unchanged).

**Method.** (1) Each of SR3-01 – SR3-15 located in its owner's live text, then every sentence across the seam the fix
touches read on the other side. (2) Every change since round 3's continuation inputs, by `diff` against that round's
snapshots (`surfr3b/now/`: V09 `a843d0a3…`, V10 `9e3fdbd3…`, V08 `594909a3…`, file f `b4546425…`, `_integrate.md`
`965ab696…`, md5 checked): V09 121 diff lines, V10 107, V08 129, file f 168, `_integrate.md` none — all read whole.
(3) The other volumes' round-4 changes, by `diff` against their lanes' backups (V01, V02, V03, V04, V06, V07, V11, V12),
grepped for every seam term (the three volumes' names and section pointers, `ClerkMount`, `HostSlots`, `MsgRef`, the
`clerk.`, `host.`, `bend.`, `refuse.`, `info.` keys, the XV/CVR/BCR ids); the hits (V04 19, V06 17, V11 4, V12 4, V01 2)
read in context. (4) Two censuses by script over the live text: every `V9 §`, `V10 §` and `V8 §`/`V08 §` pointer the three
volumes make to each other resolves to a heading or a numbered paragraph (0 unresolved); every catalogue key V10 and V08
cite is a V09 row or falls under a V09 family row (the residue is table names and API event names, none a missing row).
(5) Every cross-volume request row the three hold toward each other (V9 §10.2's XV-V9 rows to V08 and V10, V10 §10.2's
CVR rows to V08 and V09, V08 §13's X rows to V09 and V10) checked against its target's text. (6) Read whole in the live
text for the sweep: V9 §2.2 (`HostSlots`), §2.10 (`ClerkMount`, `ClerkHandle`, the effective key), §4.9's opening rule,
the `refuse.*` and `bend.under.*` rows and the V10-family table, §4.11's drawer bullets, §4.17.4's alternatives, §12's
PLAUSIBLE clauses; V10 §2.3's effective key and key order, §2.6 (`ClerkAction`, `RefusalView`, the dispatch table, the
card's buttons, the bridge), §2.10 (`ClerkContent`), §3.5's edit-mode steps, §3.11's staleness, §3.12 (6), §3.13's
opening, §3.16 whole, §4.4, §5.4, T-V10-4, -7, -44; V08 §3.1 step 7 whole, §4.6 whole, §5.1 whole, §13's X rows; V06
§2.10's `raised`, §3.19.3 (2) and §4.4 (for the readers across this seam); V04 §3.8's *Voids and bans* and *The
dwelling closure's way in*; the base's §11.2 `subscribe` row; file f items 372, 453, 472, 510, 572, 583.
**Not re-read** this round: the sections of the three volumes that no diff since round 3 touched and that step (6) does
not list (V10 §3.17 and V08 §4.2 – §4.4 among them) — claimed as PLAUSIBLE only (§6). Scratch:
`scratchpad/volumes/surfr4b/` (the diffs, `others/`, the census scripts `xref.py` and `keys.py`).

## 1 Re-check of round 3

All fifteen round-3 issues are fixed in the text their owners were asked to change. Two left a residue beside the fix:
SR3-14 (c)'s own required text maps **Show me why** to a `select`, which this round finds contradicts the canvas (SR4-01,
revising round 3; J-SS4.2), and SR3-05's class of stale request statuses has older members round 3 did not list (SR4-05
(d), SR4-06). None is reopened as such.

| id | owner | state now | residue filed |
|---|---|---|---|
| SR3-01 | V09 | FIXED — V9 §3.14's three rows (a) inside the window, (b) outside with `model`, (c) without `model`; `error.frozen`'s button "Edit it with this version" (owner); V9 §3.1 (3) (b) "a frozen view for an output version outside the retention window"; V9 §4.3's `upgrade`, `rebase` row with the `frozenImport` control; T-V9-67; J-V9.96, J-V9.97; V08's T-V8-47 carries the frozen view's commit and no banner notice | — |
| SR3-02 | V09 | FIXED — V9 §2.2's `fileMenu: false` states its meaning once (keeps Export skeleton, Rebuild around my drawings, Settings, About; drops the four file operations; Settings without Storage); V9 §5.1's top bar, §5.12, §4.3's rebase row cite it; T-V9-28, T-V9-40; J-V9.98 | — |
| SR3-03 | V09 | FIXED — V9 §4.5's T7 row: a list line naming no element comes back `dossier-owned` with `refuse.roster.dossier`, picker and **Put it at {site}**; the row's source column reads "a `roster` line naming no element — T6's one line, any line of T7's list, or the clerk's"; T-V9-13; J-V9.99 | — |
| SR3-04 | V09 | FIXED — V9 §4.16 (6) **Wording a locus**; `refuse.roster.dossier` states its slots (`{thing}` the name or class label, `{locus}` by (6) or "in {settlement}"); §1b row; J-V9.100 | — |
| SR3-05 | V09 | FIXED — XV-V9-19, -21, -22 **Met** with citations; V9 §12's round-3 sentence | SR4-05 (d): XV-V9-7, -10, -11, -12, -17, -18 still carry no status and V9 §12 still holds their adoption PLAUSIBLE |
| SR3-06 | V08 | FIXED — (a) V08 §3.1 step 7 (b): "`newDocuments: 'download'` … V9 §3.9's host-mode rule then governs every action that makes a new document"; (b) V08 §4.6's party group: "Each line is drawn by V9 §4.10's rule for the host's lines; its undo is V08 §4.2's 'Hide again' or 'Reveal again'"; (c) V08 §5.1's host-mode differences (the four file operations and no permalink, Settings without Storage, the assistant by `clerk.config`, no creation mode) | — |
| SR3-07 | V10 | FIXED — (a) §12's bullet CONFIRMED; (b) CVR-V10-7 **Met** citing `ClerkMount.rebuildEvents(seq)`; (c) `ClerkTranscript.key: 'secret' \| { tier: 'public'\|'local'; places: Id[] }`; (d) §3.16's `dossier` row "its slots filled by V9 §4.9's row"; (e) T-V10-7's clause | — |
| SR3-08 | V06 | FIXED — V6 §3.19.3 (3) and (7) name each suppressed kind's serving re-add in Build it again's forms, the deck plot's `drawFootprint` at slot `k`; V6 §2.12's suppression row; J-V6.116; X39 | — |
| SR3-09 | BASE-F | FIXED — item 453 cites V08 §2.2's `export.request.knowledge` and `exportPicture`; item 572 cites V08 §3.14 (1), (2) (c); item 472's note names `Admission` as item 572's type and carries `party.render` / `party.rendered` by reference | — |
| SR3-10 | V06 | FIXED — V6 §2.10's `raised.suppressedFired: { removal; week }[]` with its comment; V6 §3.19.3 (2) fills it (W59's keyed uniform drawn for a suppressed key as for any other, never admitted; one entry per epoch whose met reading's gate passes; none for a served key, a lifted removal, TOWN or village rungs); W19's and W58's reader columns; T-V6-58's clause; J-V6.120; X44 | — |
| SR3-11 | V04 | FIXED — V4 §3.8's *Voids and bans* carries the exception in the finding's words; the new bullet *The dwelling closure's way in* makes the closure's first rung a caller of U-DIG; V4 §1b's U-DIG and `DugGenerators` rows, §4.1's `addUndergroundAccess` row and the dwelling-declaration row; T-V4-48's closures' clause; J-V4.119, J-V4.120 | — |
| SR3-12 | V09 | FIXED — (a) XV-V9-23 **Met**, the deck-plot fallback sentence removed, J-V9.95's parenthesis; (b) XV-V9-27 and XV-V9-28 cite V4 §3.8 and V6 §2.10 and are marked **Met** (J-V9.117: both owners had landed; sound); (c) BCR-V9-36's readers add V08's party lines; (d) V9 §12's round-4-continuation paragraph; (e) `bend.under.accessDug`'s list form "Dig down from {building} instead" (J-V9.118) | — |
| SR3-13 | V08 | FIXED — (a) X19, X20 **CLOSED**; (b) §12's sentence CONFIRMED; (c) V08 §3.1 step 7 (b): "no key subscription of its own (V9 §2.2)" and the head move read from the `doc.changed` `ApiEvent` of the handler's one `subscribe(h, …)`, registered at each `doc.load`, released at `close` and `switchTo`; §1b, §2.7, T-V8-47, J-V8.110; (d) X21 opened and closed | — |
| SR3-14 | V10 | FIXED — (a) §12's bullet; (b) §3.16 and J-V10.98 label each dug-access alternative by V9 §4.9's list form; (c) the row's **Show the way in** carried, as `select`; found beside and added: `ClerkAction`'s `select` gains `label?` (J-V10.100) | SR4-01: part (c) as round 3 wrote it also makes `bend.under.accessOpening`'s **Show me why** a `select`, which the canvas's button is not (J-SS4.2) |
| SR3-15 | BASE-F | FIXED — item 372's *Needed by* opens with "V04 (V4 §3.8's U-DIG digs the closure's access and the grouped access's target, with seam SR3-11; SR3-15 …)" | — |

## 2 What the sweep found consistent

Read on every side and found to agree, so not filed (each a check a later round need not repeat unless its text moves):

* **The dug access's alternatives, end to end.** Base item 372 as file f applies it (its *Needed by* now V04, V09, V10),
  V4 §3.8's exception and *The dwelling closure's way in* (the buildings above the cluster by V4 §3.5.7 (d)'s geometry,
  plan distance then address, at most three), V9 §4.17.4's **Use another building** and its list form "Dig down from
  {building} instead" (V9 §4.9, J-V9.118), and V10 §3.16's `propose` groups `[addUndergroundAccess { building }, the
  declaration]` labelled by that list form (J-V10.98) name one list, one event form and one label; `{building}` is read
  at the reader's key on each side (the canvas at the role's key, J-V9.86; the clerk at its session key, a withheld
  building by `clerk.content.withheldWords`, whose values are the same `kind.<registry kind>` keys V9 §2.9's `MsgRef`
  uses). T-V9-38, T-V10-4's three-building clause and T-V4-48's closures' clause test one fixture.
* **The kept-removed line.** V6 §2.10's `raised.suppressedFired: { removal; week }[]`, filled by V6 §3.19.3 (2), is read
  by V9 §4.10's `epoch` row (one `info.raised.suppressed` line per entry, `{w}` the week, **Show** on the removed way's
  former outline) and by V08 §4.6 item 3 and T-V8-45, which cite V6 §2.10; V10 §3.9's `suppressed` outcome is the same
  key. XV-V9-28 (V09), X21 (V08) and X44 (V06) agree that the request is met.
* **The host's lines and their key.** V9 §2.2's `historyLines.list(key)` with "no View-as state or key subscription of
  its own", V9 §2.10 (the shell passes `effectiveKey()`), and V08 §3.1 step 7 (b)'s handler — no key subscription, one
  document `subscribe` whose `doc.changed` `ApiEvent`s drop its per-key cache (J-V8.110), registered at each `doc.load`,
  released at `close` and `switchTo` — are one contract; the base's §11.2 `subscribe` row lists `doc.changed` among its
  `ApiEvent`s, and V10 §3.11's staleness watch reads the same feed. BCR-V9-36's readers now include V08's party lines,
  as file f item 583's *Needed by* does.
* **The display re-rolls and the host slots** stand as round 3's continuation found them (no text moved): **New
  decoration** and `restyle { concern: 'decoration' }` write one group; `fileMenu: false`, `newDocuments: 'download'`
  and V08 §5.1's list of host-mode differences name the same points T-V9-28's allowlist reads.
* **Section pointers and catalogue keys.** Every pointer the three volumes make to one another resolves (census, 0
  unresolved); every `bend.*`, `refuse.*`, `info.*` and `host.*` key V10 and V08 cite is a V09 row or falls under
  V9 §4.9's family table or its `host.*` sentence (census; the residue is `clerk.ops` / `clerk.content` table names,
  `report.changed`, an `ApiEvent`, and `history.ageYears`, a dossier field).
* **The other volumes' round-4 changes** touch this seam only where §1 names them (V04's §3.8 for SR3-11, V06's §2.10
  and §3.19.3 for SR3-10); V01's, V11's and V12's hits are calibration-register wording (the default line's milestone,
  `way.surface` and `squares.quota` rows) that no sentence of the three volumes cites; V02's, V03's and V07's diffs hold
  no seam term. File f's other changes this round (items 207 – 540, 584, 585) are outside this seam; item 510's
  `customWeights` follows BCR-V8-10's order.
* **The requests the three hold toward one another** are met except the statuses filed as SR4-04 (d), SR4-05 (d) and
  SR4-06: V9 §10.2's XV-V9-19 – -24, -26 – -29 **Met**; V10's CVR-V10-3, -7, -15 – -18 **Met**; V08's X15 – X21
  **CLOSED**.

## 3 Issues

Severity: **blocker** (breaks an owner ruling), **major** (a contradiction or an unwired piece a builder would hit),
**minor** (wording, a restatement, a stale status, a type left loose). One owning volume per issue (J-SS1.1); a
volume's companions, statuses and wording defects are bundled into one minor (J-SS2.6). The three majors are in one
contract — what a clerk's card button is, what it says and who makes it — and are ordered so each builds on the last.

### 3.1 The clerk's buttons — one vocabulary with the canvas

**SR4-01 · major · V10 · contradiction (one vocabulary) and an alternative no action can carry.** On the canvas,
**Show me why** "opens the why card or the page that explains the limit" (V9 §3.3's refusal-card sentence; V9 §4.9's
opening: "the why card of the blocking thing, or the help page of the limit"; J-V9.44). The clerk turns the same button
into a selection: V10 §3.5 step 3 makes "one that shows something (**Show me why**, **Show them**)" a "`select` of the
things it names, labelled with the button's text", and V10 §3.16's bends paragraph makes `bend.under.accessOpening`'s
"(**Show the way in**, **Show me why**) … `select` actions … so the card carries every button of the row, as the canvas's
does (T101-3)" — words this seam's round 3 required (SR3-14 (c)). Since J-V10.100 the card now reads "Show me why" and
only selects, so one row's button does two things. Second, V10 §3.16's `role` row offers "`why` on the thing, `select`",
but `ClerkAction` (V10 §2.6) has no `why` kind — `ProposalView.actions`' `'why'` is a proposal-card button, not an action
— and `clerk.content.refusals.actions: ClerkAction['kind'][]` (V10 §2.10) cannot hold it, so the row's first alternative
cannot be written. Third, a row button that starts a tool on a spot the user picks — `bend.under.noAccess`'s **Add a way
down** ("T6 on a chosen spot") — is neither a `propose` (it commits no events, while V10 §3.16's bends paragraph makes
every bend alternative a `propose` "carrying the events the canvas's button for that row commits") nor a `select`. A
builder of the harness either drops these buttons or invents a behaviour the canvas does not have. *Required change:*
(a) `ClerkAction` gains `| { kind: 'why'; id?: Id; page?: string; label: string }` — run by the application: the why card
of `id` (V9 §5.8, read at the session's key), else the Help page `page` (V9 §5.9's page for the limit), exactly the target
the canvas's **Show me why** opens for that row; the dispatch table gains the row "`why` | the application | the why
card of `id`, or the Help page `page` (V9 §5.8, §5.9)", `run` rejects it with the other application kinds, and §1b.2's
dispatch row lists it. (b) V10 §3.5 step 3 maps a V9 §4.9 row's buttons in four classes, each labelled with the button's
text rendered under the session's key: a button that commits events (**Unlock**, **Remove the assignment**, **Rebuild
from {stage}**, **Make this town a city**, **Show a different name on this map**, **Draw a road to its foot**, a closest
option) → `propose` carrying the events the canvas's button commits; **Show me why** → `why` with the canvas's target;
a button that shows things (**Show them**, **Show the way in**) → `select`; a button that starts a tool on a spot the
user picks (**Add a way down**) → `useTool` with that tool; V10 §3.16's bends paragraph reads the same, naming
`bend.under.accessOpening`'s **Show me why** a `why` and `bend.under.noAccess`'s **Add a way down** a `useTool`
(`place`). (c) §3.16's `role` row's alternatives read "`why` on the thing (a `why` action with its `id`), `select`", and
§2.10's `refusals.actions` admits `'why'`. (d) The `select.label` comment's examples drop **Show me why** (J-V10.100's
reason keeps "tell **Show the way in** from **Show them**"). (e) `useTool.tool` is typed as the twelve canvas tools
(`Exclude<ToolName, 'read_map'|'why'|'check_draft'|'critique'>`), since the application activates a canvas tool and
the four read tools are none. (f) T-V10-44 names `why` among the application's kinds; a T-V10-4 clause, on T-V9-38's
fixture with no building qualifying, finds `bend.under.accessOpening`'s **Show me why** a `why` whose `id` or `page` is
the one the canvas's button opens, and its **Show the way in** a `select`. V09's companion is SR4-05 (a). (J-SS4.1,
J-SS4.2.)

**SR4-02 · major · V10 · unwired (the words of the clerk's buttons).** V10 §5.4 words an `action` block "by its `label`
where it carries one (a `propose`, a labelled `select`)" and says nothing for the rest; `ClerkAction`'s `export`,
`useTool`, `openSettings`, `fork` and `rerun` carry no words (V10 §2.6), and no catalogue row words them — V9 §4.9's
table of V10's families (`critique.K*`, `refuse.clerk.*`, `clerk.notice`, `info.*`, `kind.*`) has none, and V9 §4.11
draws "`action` as a button running its `ClerkAction`". Yet the clerk offers such buttons on every path: the `picture`
row's "`useTool dress`, `export` PNG", the `scope` row's "`useTool` for the nearest tool", the `key` and `budget` rows'
`openSettings` (V10 §3.16), the help route's closing `useTool` (V10 §3.1; prompt rule 15; V9 §4.11 "drawn as its
button"). The `propose` alternatives of V10 §3.16's own rows are worded in prose that no key holds ("move it", "place it
on a chosen plot", "a label display text", "move one of the existing ones", "a proposal to unlock it", "the closest
unlocked alternative"), while `clerk.content.refusals.actions` stores kinds only and V10 §1b.1's label row names "V10
§3.16's rows" as the source. A builder of the drawer must print a button with no text, or compose one — which V9 §4.9's
one-source rule and T-V10-29's "the words, once" forbid — and no locale can translate it. *Required change:* (a) every
`ClerkAction` the harness makes carries its words: `label: string` (the text rendered under the session's key) is
required on `propose`, `why`, `useTool`, `export`, `openSettings`, `fork` and `rerun`, and stays optional on `select`
only (absent: the ids' chips, J-V10.100); `undo` and `rebuild` remain card buttons worded **Undo** and **Put it back**.
(b) Its sources, stated once in V10 §3.5 step 3 and §3.16: a V9 §4.9 row's button — that button's text (SR4-01 (b));
an alternative of a V10 §3.16 row — the new key family `clerk.alt.<category>.<n>` (`<n>` the alternative's position in
its row), each alternative's `en` words written once as quoted words in §3.16's alternatives column; the help route's
closing `useTool` — `clerk.alt.help.useTool` ("Open {tool}", `{tool}` the tool's name from `toolkit.json`, V9 §2.3); a
`fork` or `rerun` (SR4-03) — `clerk.alt.history.fork` and `.rerun`, the words of V9 §3.9's controls ("Open a copy from
here", "Re-run from here"); a critique finding's `fix` — **Fix**, the word V9 §3.12's dialog and the card already show
(`clerk.alt.critique.fix`). `clerk.content.refusals.actions` becomes `{ kind: ClerkAction['kind']; msg: string /* its
clerk.alt key */ }[]`. (c) V10 §5.4 reads "`action` as a button worded by its `label`; a `select` without one as the
chips of its ids (J-V10.100)"; §1b.1's label row lists the three sources; V10 names the family for V9 §4.9's table
(V09's companion, SR4-05 (b)); T-V10-29's compile test covers `clerk.alt.*`; a T-V10-44 clause finds, over every
cassette, a `label` on every `action` block and every `RefusalView.actions` entry but a `select` of the `role` or
`knowledge` rows. (J-SS4.3.)

**SR4-03 · major · V10 · unwired (action blocks nobody makes).** `ReplyBlock`'s `action` is drawn by V09 (V9 §4.11) and
dispatched by V10 §2.6's table, and V10 §2.6 says "the harness … only places them in reply blocks and cards" — but the
volume names no step that places one outside a card. (1) Prompt rule 15 tells the model to "end with the tool's
`useTool` action", and T-V10-35 checks that "the help route … ends its answer with a `useTool` action", yet the model has
no way to write one: its reply is text whose only structured form is the `[[id]]` link (prompt rule 8), checked by V10
§3.13 as an entity link, and no tool result becomes a reply block (the `critique` tool's `fix` actions reach the
card's findings and V9 §3.12's import dialog, never the reply). (2) `fork { seq }` and `rerun { seq }` are produced
nowhere: V10 §2.6 declares and dispatches them (to V9 §3.9's `forkAt` and `rerunFrom`, tested by T-V10-44 and T-V9-27),
and V6 §4.4 says "the clerk offers them on 'what if…' questions", but no rule, route or harness step emits them. V09
builds a dispatch for kinds that never arrive, and the help route cannot pass its own bar. *Required change:* one action
form, the model's only way to put an `action` block in a reply: `[[do:useTool:<tool>]]`, `[[do:fork:<seq>]]` and
`[[do:rerun:<seq>]]`, written at the reply's end. V10 §3.13's check gains a step that turns each into an `action` block
(its `label` by SR4-02 (b)) when `<tool>` is one of the twelve canvas tools and `<seq>` a sequence number a read of this
segment returned (a chronicle entry's cause, a `history` entry, a `frame`'s epoch) at or below the handle's `logHead`,
and otherwise drops it as it drops an unknown link (no block; counted as `unverified`). Prompt rule 15 names the form;
a new prompt rule for a "what if…" question about the town's past (V6 §4.4) ends the answer with `[[do:fork:<seq>]]` and
`[[do:rerun:<seq>]]` at the last event before the point the user names, read from `read_map { kind: 'chronicle' }` or a
`why … historyPage` answer; §1b.1's `ReplyBlock` row names the grounding check as the producer of `action` blocks;
T-V10-16's synthetic replies gain an action naming a read tool and one naming an unread `seq` (both dropped), T-V10-35
asserts the help route's closing `useTool` block and its label, and a new cassette asks "what if the old wall had
stayed?" and finds a `fork` and a `rerun` at the seq before the epoch that dismantled it. (J-SS4.4.)

### 3.2 Words, statuses and restatements

**SR4-04 · minor · V10 · one stale card worded two ways, unkeyed notices, a count, a status, one refusal's
sentence.** *Required change:* (a) **The stale proposal.** V10 §3.11 has the stale card offer "show the new preview" and
"ask again" with no sentence; V9 §4.11 quotes it as "The town changed; here is the new preview" (V10 §3.11), a line V10
does not hold, while V9 §4.9's `refuse.stale` words the same condition on the canvas ("The town changed while you were
working. Here is the new preview.", button "Show the new preview"). V10 §3.11 reads: the card shows V9 §4.9's
`refuse.stale` row — its button the fresh dry run, accepted like any other — and **Ask again** (`clerk.alt.stale.retry`,
a new turn), one sentence for one condition (J-V10.94's rule). (b) **Unkeyed notices.** "Your view changed; the
conversation was cleared" (§3.12 (6)) and "Applied — Undo" (§4.4) are drawer lines no key holds; they become
`clerk.view.cleared` and `clerk.applied`, their words written once where they stand, and V10 names them for V9 §4.9's
family table (SR4-05 (b)). (c) §4.4's "Two cases are never applied at once" lists three (a confirmation, every creation
proposal, a destructive effect): it reads "Three cases". (d) **CVR-V10-4 is met** — V9 §6.2's *The page's
`connect-src`* (V10 §3.17's connect rule), V9 §4.11's card-only drawer, V9 §2.10's `ClerkHandle`, V9 §4.9's family table
and T-V9-15 — and is marked **Met** with those citations. (e) **The viewer's refusal.** V9 §2.10: "a viewer's drawer
reads and asks why, and every declaration answers `role`", which V9 §4.9 words as `refuse.viewer` ("You're viewing this
town. Ask its owner to make changes."); V10 §3.16's `role` row words it itself ("You're viewing this map; its owner can
change it."), so T-V10-29's "no engine code has a second English sentence … never a `refuse.clerk.*` key" fails on a
viewer's declaration. The `role` row renders `refuse.viewer`'s `MsgRef` (no `msg` of its own, as `lock` and `rule`),
its alternatives unchanged; T-V10-29's "every refusal category but `lock` and `rule`" reads "but `lock`, `rule` and
`role`". (J-SS4.5.)

**SR4-05 · minor · V09 · companions of SR4-01 – SR4-04, and statuses left behind.** *Required change:* (a) V9 §4.11's
*Turns* bullet reads "`action` as V10 §5.4 words it — a button worded by its `label`, a `select` without one as its ids'
chips"; its *The actions* bullet adds "`why` → the why card of its `id` (V9 §5.8), else the Help page `page` (V9 §5.9)"
(SR4-01) and "each worded by its `label` (V10 §5.4; SR4-02)"; V9 §2.10's `run` comment lists `why` among the kinds the
application runs; T-V9-27's dispatch clause reads "the seven the application runs" and adds "a `why` opens the card or
page the canvas's **Show me why** opens for that row, a labelled `select` shows its label, an unlabelled one its ids'
chips". (b) V9 §4.9's table of V10's families gains `clerk.alt.<category>.<n>` (V10 §3.16's alternatives column; the
help route's and the history actions' rows, SR4-02 (b)) and `clerk.view.cleared`, `clerk.applied` (V10 §3.12 (6), §4.4;
SR4-04 (b)); the `refuse.clerk.<category>` family row reads "every value but `lock`, `rule` and `role`" (SR4-04 (e));
T-V9-15 covers the new families. (c) V9 §4.11's stale quotation "The town changed; here is the new preview" (V10 §3.11)
reads "a proposal whose town moved on shows `refuse.stale` with **Ask again** (V10 §3.11)"; V9 §2.10's and §4.11's
"Applied — Undo" cite `clerk.applied` (V10 §4.4). (d) **Stale statuses.** XV-V9-7, -10, -11, -12, -17 and -18 carry no
status though each is written in its target's text: XV-V9-7 (V10 §2.6's `createClerk(mount)` returning `ClerkHandle`,
`DraftItem.bent?: MsgRef`, the merged texts in V10 §1b.1's rows for BCR-V9-10, -12, -16, the `why` entry's `WhyAnswer`),
XV-V9-10 (V10 §4.1 "one text with V09 (XV-V9-10)", `hold`'s `remove` as plain `delete` rows, T-V10-38), XV-V9-11 (V10
§2.6's `effects`, §5.4's **What else changes**, §4.4's destructive case), XV-V9-12 (V10 §4.1's `retaining` row with
`closed`, the `terrace` sugar, `RaisedOutcome.reason`, CVR-V10-7's stack top, §3.9's "A removed thing", `rebuild`),
XV-V9-17 (V08 §3.1 step 7 (a), (b)), XV-V9-18 (V10 §2.6's `type ClerkHarness = ClerkHandle`, *The bridge, through the
mount only*, §2.3's session key, §3.9a's `info.under.cause.<rule>` and `info.catacomb.blocked.<cause>` citations). Each
is marked **Met** with those citations; V9 §12's round-0 clause "that the coherence pass and the siblings adopt …
XV-V9-10 – XV-V9-16 as stated" keeps PLAUSIBLE only XV-V9-13 – XV-V9-16 (volumes 11, 4, 3, 5, outside this seam) and
notes XV-V9-10 – XV-V9-12 met, and round 1's "that V08 and V10 adopt XV-V9-17 and XV-V9-18 as stated" moves to
CONFIRMED (seam-surfaces-r4 SR4-05).

**SR4-06 · minor · V08 · two hand-offs met but left open.** X11 (V10, V06) is met — V10 §3.9's `info.raised.*` outcome
rows with `info.raised.suppressed` one key (CVR-V10-14's V08 part **Met**), and V06's chronicle `raisedWay` entries
(W19; V6 §3.15.1) drawn as V9 §4.10's `epoch` rows — and X12 (V09) is met — V9 §4.9's sentence "Every `host.*` key
volume 8 names is a row of the same file, its text volume 8's (V08 §13 X12 …)", with V9 §5.12's `host.locked` and
T-V9-15 (SR2-18, landed in V09's round 2). *Required change:* X11 and X12 are marked **CLOSED** with those citations, and
§13's opening sentence of the current round names them.

## 4 Disposition summary by owning volume

| owner | blocker | major | minor | ids |
|---|---|---|---|---|
| V10 | 0 | 3 | 1 | SR4-01, SR4-02, SR4-03; SR4-04 |
| V09 | 0 | 0 | 1 | SR4-05 |
| V08 | 0 | 0 | 1 | SR4-06 |

Totals: 0 blockers, 3 majors, 3 minors (6). Round 3's fifteen issues: all FIXED. The three majors sit in text the earlier
rounds read without filing — the clerk's card buttons: what each button does (SR4-01), what it says (SR4-02) and who
makes it (SR4-03); the label J-V10.100 added in round 4 made the first visible, and round 3's own SR3-14 (c) wrote one
instance of it (J-SS4.2). The minors are companions and statuses (SR4-04 (d), SR4-05, SR4-06) and three wording defects
found beside the majors (SR4-04 (a), (b), (e)) and one count (SR4-04 (c)). No base change request is needed: `ClerkAction`,
its dispatch, the action form and the key families are volume 10's and volume 9's own text, and no base section states
them.

**Pairs to apply together:** SR4-01 with SR4-05 (a) (the `why` kind in V10's dispatch table and V09's drawer); SR4-02 with
SR4-05 (b) (the `clerk.alt.*` family written in V10 §3.16 and loaded by V9 §4.9's table); SR4-03 with SR4-02 (b)'s
history and help words; SR4-04 (a), (b) and (e) with SR4-05 (b) and (c). **Order of work:** V10 first (it defines the
kind, the family names and the action form), then V09 (its drawer text, catalogue rows and statuses), V08 at any time.

## 5 Decisions of this check (vetoable)

| id | decision |
|---|---|
| J-SS4.1 | chose, for SR4-01, a `why` action kind that the application runs (the why card of an id, else a Help page) over keeping **Show me why** a `select` or making it a `propose`, because the canvas's button opens a card and changes nothing (V9 §3.3, §4.9's opening, J-V9.44), the application already owns the why card (V9 §5.8) and the Help pages (V9 §5.9), and the `role` row's "`why` on the thing" needs the same kind; a button that starts a tool is a `useTool`, since it commits nothing until the user picks the spot |
| J-SS4.2 | revised round 3's SR3-14 (c): its required text made `bend.under.accessOpening`'s **Show me why** a `select`; this round read the canvas's definition of the button (V9 §3.3, §4.9) and files the correction as SR4-01 — the defect is this seam's own, not volume 10's |
| J-SS4.3 | chose, for SR4-02, a required `label` on every harness-made action with its words from three named sources — a V9 §4.9 button's text, a new `clerk.alt.<category>.<n>` family written in V10 §3.16, and V9 §3.9's control words for the history actions — over words per action kind in V09, because the alternatives are volume 10's rows (one kind, `propose`, carries many different offers: "move it", "place it on a chosen plot"), V9 §4.9 already loads families whose `en` text volume 10 writes (SS-16), and one key per alternative lets a locale translate each |
| J-SS4.4 | chose, for SR4-03, a link-like action form (`[[do:<kind>:<arg>]]`) checked by the grounding check over a new model tool or over removing `fork` and `rerun`, because the reply is already text whose `[[id]]` links V10 §3.13 checks, the check can verify a tool and a `seq` against this segment's reads the same way, a tool would add a model round trip and a slot to every route, and V6 §4.4 gives the clerk the "what if…" offer that removing the kinds would drop |
| J-SS4.5 | chose, for SR4-04 (e), `refuse.viewer` on the clerk's `role` card over the clerk's own sentence, because V9 §2.10 has every viewer declaration answered by the engine's `role` refusal and V10's own J-V10.94 and T-V10-29 give one engine code one sentence on canvas and clerk |
| J-SS4.6 | chose to continue under this lane key (CONTINUE rule: file present, no LANDED) and to re-check all fifteen round-3 issues over SR3-01 – SR3-09 alone as the 07:42 skeleton planned, because round 3 gained SR3-10 – SR3-15 at 11:07 and no round-4 file had re-checked any of them |
| J-SS4.7 | kept J-SS1.1 (one owner per issue) and J-SS2.6 (one bundled minor per volume for companions, statuses and wording: SR4-04, SR4-05, SR4-06), and rated SR4-02 and SR4-03 major rather than minor, since a builder of the drawer or the harness meets a button with no words and a bar (T-V10-35) no build can pass |

## 6 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (each located in the live text on both sides; quoted phrases copied from the files read this round): the
§1 re-check of SR3-01 – SR3-15; SR4-01 – SR4-06, each by the lines it quotes — V9 §3.3's refusal-card sentence and §4.9's
opening rule for **Show me why**, V10 §3.5 step 3 and §3.16's bends paragraph for its `select`, V10 §2.6's `ClerkAction`
union (no `why`, `useTool.tool: ToolName` with the four read tools), V10 §2.10's `refusals.actions` type, §3.16's `role`,
`picture`, `scope`, `budget` and `key` rows, §5.4's wording sentence, prompt rules 8 and 15, T-V10-29, -35, -44, V6 §4.4's
"the clerk offers them on 'what if…' questions", V10 §3.11's staleness, §3.12 (6), §4.4, V9 §4.9's `refuse.stale`,
`refuse.viewer`, `bend.under.*` rows and V10-family table, V9 §4.11's bullets, V9 §10.2's XV rows, V9 §12's round-0 and
round-1 clauses, V10's CVR-V10-4, V08's X11 and X12; the absence claims by `grep` over the current files (no `why` member
of `ClerkAction`; no `fork` or `rerun` producer in V10; no `clerk.action`, `clerk.alt` or "Your view changed" key in V09;
no action syntax beside `[[id]]` in V10); every §2 agreement. The changes since round 3's continuation were established
by executed `diff`s against snapshots whose md5s equal that round's inputs; the pointer and key censuses by script
(`surfr4b/xref.py`, `keys.py`). Inputs unchanged from start to end (md5 as in §0, re-checked before this section was
written).

**PLAUSIBLE:** that the sections of the three volumes untouched since round 3's continuation and not listed in §0 (6) —
V10 §3.17 and V08 §4.2 – §4.4 among them — hold no new seam defect (rounds 0 – 3 read them; the method of J-SS1.5);
that the per-key cache's re-read after a head move completes within a frame, so the party lines do not visibly flicker
at each commit (J-V8.109; unmeasured); that §11.2's `doc.changed` `ApiEvent` fires for an applied tail as for a local
commit (V08 §12's own PLAUSIBLE point; T-V8-47's clause measures it); and that SR4-01 – SR4-03's required changes need no
re-pricing beyond V10's C2 – C5 and V09's AP8 ranges (one action kind, one key family, one parse step in the grounding
check, a prompt rule).
