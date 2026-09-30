# Seam check: the application (V09), the clerk (V10) and the host (V08) — round 3

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-surfaces-r3; covered by the whole-design retrovalidation (J84).

PROGRESS
- §0 Method, inputs and coverage | done
- §1 Re-check of round 2 (SR2-01 – SR2-19) | done
- §2 What the sweep found consistent | done
- §3 Issues (SR3-01 – SR3-09) | done
- §4 Disposition summary by owning volume | done
- §5 Decisions of this check | done
- §6 CONFIRMED versus PLAUSIBLE | done
- §7 Continuation — why, inputs, method and coverage (2026-09-29, re-issued brief) | done
- §8 Re-check of round 2's continuation (SR2-20 – SR2-29) | done
- §9 Sweep of every change since round 2's continuation inputs (SR3-10 onward) | done
- §10 Disposition summary of the continuation | done
- §11 Decisions, CONFIRMED versus PLAUSIBLE of the continuation | done

## 0 Method, inputs and coverage

**Inputs** (md5 at start and at the end, each the landed md5 of its round-3 reconciler per `docs/lane-events.log`): V09
`6b762ccf…` (4 128 lines, reconcile-V09-r3 06:25), V10 `02b1e8ca…` (3 369, reconcile-V10-r3 06:25), V08 `c30a39c9…`
(3 165, reconcile-V08-r3 06:30), `_integrate.md` `d868438e…` (369, reconcile-BASE-F-r3 06:08), file f `38c29d39…`
(1 238, reconcile-BASE-F-r3 06:08), the base `docs/ARCHITECTURE.md` `01fea21f…` (unchanged since round 1).

**Method.** (1) Every round-2 issue (SR2-01 – SR2-19) re-read on both sides in the live text. (2) Every line changed
since round 2, by `diff`: the round-3 reconcilers' backups are byte-identical to round 2's inputs (V09 `bddde2a4…`,
V10 `fe19e39e…`, V08 `d32c6a0e…`, file f `a85996a2…`, `_integrate.md` `a8c72fb4…`, each md5 checked), so the diffs are
the whole change set — V09 299 lines, V10 273, V08 446, file f 123, `_integrate.md` 7, all read whole. (3) The seam's
four contracts read whole again in the live text, each finding read on both sides before filing: V09 §2.2, §2.10,
§3.1 (3), §3.2, §3.9, §3.12's first bullet, §3.14, §4.3's `upgrade`/`rebase` and `delete` rows, §4.5's T6 and T7 rows,
§4.8, §4.9's `refuse.*` rows, §4.10, §4.11, §4.16, §5.1's top-bar row, §5.10's Files row, §5.12, BCR-V9-14, -34, -35,
§10.2 (XV-V9-1 – -23), §12's round-3 paragraph; V10 §2.3, §2.6, §2.7, §3.17, §4.1's `where.locus`, `element` and T7
rows, §4.2, §4.3, BCR-V10-7, -22, -23, §10.2 (CVR-V10-1 – -16), §12's PLAUSIBLE list, T-V10-4, -6, -7, -20, -34, -38,
-44; V08 §1b's round-3 rows, §2.2's new types, §3.1 whole, §3.8's first paragraph, §3.14 whole, §4.2, §4.4, §4.6, §5.1,
§5.4, BCR-V8-1, T-V8-16, -17, -41, -47, §13 X12, X15, X16; file f items 260, 362, 453, 464, 467 – 470, 472, 473,
570 – 572; the base's §2.9 *Load* steps 1 – 3; V06 §2.13 (7) (for XV-V9-23). Greps over the current files: the frame's
sandbox flags (V08 §3.1 step 1 grants `allow-downloads`), `fileMenu`, `frozen` and `rebase` in V09, every citation of
`ClerkTranscript` or a transcript `tier` in the siblings (none outside V10), every citation of BCR-V9-34 (V09 only).
**Not re-read** this round: the sections neither diff touched and not listed above — claimed as PLAUSIBLE only (§6).
Scratch: `scratchpad/volumes/surfr3/` (the five diffs, the three volumes' headings).

## 1 Re-check of round 2

All 19 round-2 issues are fixed in the text their owners were asked to change. Five left a stale status, a restated
rule or an unmet sibling request beside the fix; those are filed in §3 with their own ids, none reopened as such.

| id | owner | state now | residue filed |
|---|---|---|---|
| SR2-01 | V09 | FIXED — `HostSlots.historyLines` and `HostHistoryLine { at, text, targets }` (V9 §2.2); V9 §4.10's "The host's lines", the group `history.group.party` under **All** and **SettlementForge**, newest first, **Show** only with targets, no **Undo this**, never persisted; §1b, §2.12, §5.6 rows; T-V9-28's allowlist; J-V9.91 | — |
| SR2-02 | V09 | FIXED — `HostSlots.newDocuments: 'download' \| 'off'`; V9 §3.9's "In host mode a new document is saved, never opened" (every new-document action, `info.copy.saved`, `info.copy.rerunEdits`, hidden below `secret` and under `'off'`); V9 §3.2 (3), §4.10, §4.11 cite it; T-V9-28, T-V9-40; J-V9.92. The download path is real: V08 §3.1 step 1's sandbox grants `allow-downloads` | — |
| SR2-03 | V08 | FIXED — V08 §3.1 step 7 (b) fills `historyLines` (`host.revealed`, `host.hidden`, `host.partyTier`, one replaced `host.picturesDrawn`; empty at each load) and `newDocuments: 'download'`; §4.6, §5.1, X12, T-V8-47 (both slots asserted) | SR3-06 (a), (b) (V9 §3.9's rule and V9 §4.10's line rule restated, the first with a shorter action list) |
| SR2-04 | V08 | FIXED — the `upgrade-available` banner has no button; "Keep the saved town" is V9 §3.14's load-mismatch choice with no header control; T-V8-47; J-V8.94 | — |
| SR2-05 | V10 | FIXED — V10 §3.17's **Roles and keys** as required | — |
| SR2-06 | V08 | FIXED — `export.request { …, knowledge?: Admission }` in BCR-V8-1 and §2.2, `exportPicture` likewise, the host's own pictures as key forms with empty places (J-V8.92), T-V8-16 | — |
| SR2-07 | V08 | FIXED — V08 §3.14 (2) (c) queries with `admitAs` = the party key form; T-V8-17. Found in passing by V08 and sound: the set now crosses as `party.render` / `party.rendered` (J-V8.91), since only the module can resolve binding keys to ids and apply `admitAs` | — |
| SR2-08 | V10 | FIXED — `ClerkTranscript` version 3 with `key: Admission`; `admitsAll` (V10 §2.3's key order); §3.12 (6)'s "does not only add … counts as lowered"; versions 1 and 2 read as `'secret'`; T-V10-6, T-V10-34; J-V10.67 revised, J-V10.91, J-V10.92 | SR3-07 (c) (the field's type admits a bare tier the order does not define) |
| SR2-09 | V08 | FIXED — V08 §3.14 (5) cites `effectiveKey()` and BCR-V9-23; §12 reads V09 as landed; X15 CLOSED | — |
| SR2-10 | V10 | FIXED — V10 §4.1's `where.locus` row states V9 §4.5's query once, the no-candidate case included; §3.16 cites it; T-V10-4, T-V10-7 | SR3-03 (roster-list lines: the clerk offers the plot, the canvas's T7 does not) |
| SR2-11 | V09 | FIXED — V9 §4.5's T6 row and `refuse.roster.dossier`'s button column; T-V9-13 | — |
| SR2-12 | V10 | FIXED — V10 §3.16's `dossier` row renders V09's `refuse.roster.dossier` for the roster and locus case; `ClerkRefusal.msg` and §1b.1 name the key | SR3-04 (the row's slots have a fill rule in V10 only) |
| SR2-13 | V09 | FIXED — the drawer's **Start a new map from this** (standalone only), `clerk.newMap.line`, `attach.newMap` on `send`; T-V9-40; J-V9.93 | — |
| SR2-14 | V09 | FIXED — `ClerkMount.rebuildEvents(seq)`, V9 §4.20.3 (4)'s one function (read at `effectiveKey()`, `[]` when nothing can be built); T-V9-53 byte-equality; J-V9.94 | — |
| SR2-15 | V09 | FIXED — V9 §4.20.3 (2) cites file f item 260's kinds; (4) gains a Build-it-again row per kind; BCR-V9-34 widened; T-V9-53's fixture; J-V9.95 | SR3-08 (XV-V9-23 unmet: V06 landed before the request was written) |
| SR2-16 | V08 | FIXED — "a raised way, a retaining wall (a generated terrace's walls among them) or a deck plot" in §4.1, §4.3 and BCR-V8-31 | — |
| SR2-17 | V10 | FIXED — (a) the dispatch table's `propose` note; (b) BCR-V10-22's last sentence; (c) §4.3, §2.6, §1b.2 cite `rebuildEvents`; (d) §3.1 (4) reads `attach.newMap`, both creation conditions standalone's (XV-V9-22 (c)); (e) CVR-V10-16 ends at "Met", §12's V09-round-2 bullet moved | SR3-07 (a), (b) (§12's round-3 bullet and CVR-V10-7 now stale) |
| SR2-18 | V09 | FIXED — V9 §4.9 names every `host.*` key V08 X12 lists; V9 §5.12 reads `host.locked`; XV-V9-20 marked met | SR3-05 (§12 still holds XV-V9-19 open; XV-V9-21 and -22 unmarked) |
| SR2-19 | BASE-F | FIXED — items 464, 453, 572 *Needed by* with V08; item 472's note "one field, one type" | SR3-09 (453's and 572's "once … lands" conditions are now met) |

## 2 What the sweep found consistent

Read on every side and found to agree, so not filed (each a check a later round need not repeat unless its text moves):

* **The host's two new slots.** V9 §2.2's `historyLines` and `newDocuments`, V08 §3.1 step 7 (b)'s fill, V08 §1b's rows
  and T-V8-47 / T-V9-28 name the same members, the same keys (`host.revealed`, `host.hidden`, `host.partyTier`,
  `host.picturesDrawn`; `info.copy.saved`, `info.copy.rerunEdits`) and the same life (empty at each `doc.load`, cleared at
  `switchTo`, never persisted). V9 §4.9's "Every `host.*` key volume 8 names is a row of the same file, its text volume
  8's" and V08 §5.1's "ONE source, volume V09's `host.*` catalogue rows" are one arrangement: V09's file, V08's words.
* **No creation mode in host mode.** V9 §3.9 and §4.11 ("no turn enters creation mode"), V10 §3.1 (4) (both conditions
  standalone's), T-V10-20's clause and T-V9-40's host clause agree; `ClerkMount.openNewDocument`'s host comment is
  consistent with no creation proposal arising there.
* **The rebuild.** V9 §2.10's `rebuildEvents(seq)`, V9 §4.20.3 (4)'s table and its one function, V10 §2.6's action and
  dispatch row, §4.3 (offered only while the answer holds an event), §1b.2, T-V10-38, T-V10-44 and T-V9-53 name one
  source; `@plat/clerk` still imports nothing of `@plat/app`.
* **One knowledge rule, end to end.** `Admission` is one type in BCR-V10-22, BCR-V9-14 (the union), BCR-V8-1 and
  `MapSession.exportPicture`, with one reading (lowering only; a tier alone read with the caller's places; a key form a
  key in its own right); the party render passes the resolved key form as `knowledge` and as `admitAs` (V08 §3.14 (1),
  (2) (c)); V08 §3.14 (5) cites `effectiveKey()`; V10's `admitsAll` reads two keys alone and no sibling cites the
  transcript's old `tier` (grep: 0 outside V10); the copies saved in host mode are `.plat` at the role's key, which View
  as does not lower (V9 §3.9), matching §11.1's "a copy is the document".
* **The dossier alternative.** V10 §4.1's `where.locus` query is V9 §4.5's T6 query word for word in substance (`sites`,
  `cls`, `near` the target's `EntityCard.anchor`, `district` only for `in` a quarter, `k: 3`, the first candidate with no
  `hardFails`, none offered when all fail), and T-V10-4 / T-V9-13 bind the two to one plot.
* **The host header.** V08 §4.2's rows, V9 §3.14's load-mismatch row and `error.mismatch`, and T-V8-47 give the keep one
  control; the banner has no button.
* **The bridge's new pair.** `party.render` / `party.rendered` (BCR-V8-1, V08 §2.2, §3.14 (3), B18, §2.7, §5.4 (4))
  touch neither V09's shell nor V10's harness: the module answers them, and no dossier change travels in them, so the
  base's *One way* paragraph holds (PLAUSIBLE only in that BCR-V8-1 does not say so in words, as round 2 noted for
  `host.action` and `host.state`).
* **File f.** Items 260 (the five suppression kinds), 464, 472's note and 570 – 572 carry this seam's requests in base
  order; `_integrate.md`'s one change (J-VI.16) is outside this seam.

## 3 Issues

Severity: **blocker** (breaks an owner ruling), **major** (a contradiction or an unwired piece a builder would hit),
**minor** (wording, a restatement, a stale status, a type left loose). Each names one owning volume and the exact change
(J-SS1.1: a fix that needs a second volume's sentence is a separate issue, or a bundled companion, for that volume).

### 3.1 Loading and the shell in host mode

**SR3-01 · major · V09 · contradiction with the base and V08 (an older document's load).** V9 §3.14's row reads "a
document of another output version | §2.9 step 2 | frozen view, read-only, with "Open its recipe with this version" and
the owner's upgrade offer (§7.5's diff)"; `error.frozen`'s button is "Open its recipe"; V9 §3.1 (3) (b) opens "frozen
view for another output version"; and V9 §4.3's row for `upgrade`, `rebase` lists "the upgrade offer (§7.5's diff); the
load-mismatch choice; "Rebuild around my drawings" (§7.2)" — no control issues the `frozenImport` rebase. The base
separates three cases (§2.9 *Load*): an output version inside the retention window replays and edits under its own
version (step 3), where §7.5's upgrade is offered; one outside the window opens as a frozen view whose "one edit offered
is `rebase` (reason `frozenImport`)" (step 2); only a document without `model` "offers to open its recipe under the
current version as a new document". V08 §3.8 builds on the same split — in the window "the upgrade dialog with §7.5's
diff" behind V08 §4.2's header control **Update the map engine**; "Outside the window the document opens as §2.9's
frozen view for everyone, and the owner is offered the `frozenImport` rebase" — and V08 draws no such control (the frame
draws everything, V08 §5.1). A builder of V09 offers an upgrade to a document no retained version can replay, offers
"Open its recipe" (a new document, outside V9 §3.9's host rule) where the base offers the rebase, and in host mode draws a
second upgrade control beside V08's header one; the base's frozen-view edit has no control at all. *Required change:*
V9 §3.14's row becomes three rows, each citing §2.9 — (a) **inside the window** (§2.9 step 3, §6.4): the document edits
under its own version, and the owner is offered the upgrade with §7.5's diff (standalone: V09's upgrade offer as now; in
host mode V08 §4.2's **Update the map engine** is that offer and the shell draws none of its own — one event, one
control, J-V8.94); (b) **outside the window, with `model`** (§2.9 step 2): the frozen view, labelled as step 2 states with
its CLI command, whose one control, for the owner, is **Edit it with this version** — `rebase { reason: 'frozenImport' }`
previewed with its renames (§7.4's rebase row) and committed on confirmation (in host mode through `doc.changed`, the
client then sending `doc.snapshot`, as V08 §4.2's upgrade row does), refused with the damage message when a chunk misses
its content hash; (c) **without `model`**: the message and the CLI command, and **Open its recipe with this version**, a
NEW document with §6.4's notice — in host mode under V9 §3.9's host rule, added to that rule's list. `error.frozen`'s
button reads "Edit it with this version"; a new row carries case (c)'s words; V9 §3.1 (3) (b) reads "frozen view for an
output version outside the retention window"; V9 §4.3's `upgrade`, `rebase` row adds "the frozen view's **Edit it with
this version** (`frozenImport`)"; a new T-V9 bar opens one fixture of each case and asserts the control each shows and
the event it commits, and in host mode that the frame shows no upgrade control but V08's header one. (J-SS3.1.)

**SR3-02 · major · V09 · unwired (host mode loses Settings and an edit).** V9 §2.2 declares `fileMenu: false` for host
mode without saying what it removes; V08 §3.1 step 7 (b) sets it and V08 §5.1 reads it as "no file menu, open, save or
permalink". But V9 §5.1's top bar puts eight entries in that one menu — "the file menu (New town, Open…, Save a copy,
Export skeleton, Rebuild around my drawings, Recently deleted, Settings, About)" — and names no other route to Settings,
About or "Rebuild around my drawings", which V9 §4.3 makes the only control of the `rebase` of §7.2 ("'Rebuild around my
drawings' (§7.2) in the file menu"). Meanwhile host mode needs Settings: V9 §5.12 shows the Assistant section under a
host's `builtin` mode with "the fields the host forces … locked with `host.locked`", the clerk's `openSettings` action
opens "the settings' Assistant section" (V9 §4.11; V10 §2.6's dispatch table), and V9 §3.14's clerk row offers
`openSettings` for the `key` and `budget` refusals. A builder hiding the menu leaves those buttons dead and one edit kind
unreachable in the frame (the owner's "everything is editable"). *Required change:* V9 §2.2's `fileMenu: false` gains
its meaning, stated once: "host mode: the file menu keeps Export skeleton, Rebuild around my drawings, Settings and About
and drops the file operations — New town, Open…, Save a copy and Recently deleted — the host being the store (V08 §5.1);
Settings drops its Storage section (no local store, V9 §3.8 (6))"; V9 §5.1's top-bar row and V9 §5.12 cite it; T-V9-28's
allowlist names exactly those four items and the Storage section; a T-V9-40 clause runs `openSettings` from a `key` or
`budget` refusal in host mode (`clerkMode: 'builtin'`) and finds the Assistant section with its forced fields locked.
V08's wording is SR3-06 (c). (J-SS3.2.)

### 3.2 The tool vocabulary — one refusal, one card

**SR3-03 · minor · V09 · a roster-list line refused two ways.** V10's round 3 decided (J-V10.93) that a dossier-owned
line naming no element gets the dossier's unplaced elements "and the same place on the first candidate with no
`hardFails`" for "a roster line or a place by a locus" (V10 §3.16), `near` and `district` omitted "for a line with no
locus (`where.free`, or a T7 line without one)" (V10 §4.1). V09's T7 row offers, with a dossier, only "an element picker
per line (unplaced elements)", and `refuse.roster.dossier`'s source column is "a one-line `roster` naming no element", so
the canvas's list card and the clerk's roster card show different alternatives for one engine refusal. *Required
change:* V9 §4.5's T7 row adds "a line committed naming no element comes back `dossier-owned`; its card is
`refuse.roster.dossier` — the element picker and, when a candidate is free of hard fails, **Put it at {site}** by T6's
`sites` query (`near` and `district` from the line's locus, both omitted for a line with none; V10 §4.1) — one rule with
volume 10's `dossier` alternative (J-V10.93)"; the row's source column reads "a `roster` line naming no element (T6's
one line, any line of T7's list, or the clerk's)"; T-V9-13 gains the T7 case. V10's test wording is SR3-07 (e). (J-SS3.3.)

**SR3-04 · minor · V09 · a row's slots filled by another volume.** `refuse.roster.dossier` reads "…Place one of them
here, or put {thing} on a plot near {locus}." V09 states no fill rule for `{thing}` (a T6 line may be unnamed, `name:
''`) or `{locus}`, and V9 §4.16 only parses a locus — it has no rule that words one. V10 §3.16 now states both — "`{thing}`
the line's name, or the class's label when it has none, and `{locus}` the line's locus as V09 words it, or the
settlement's name for a line with none" — pointing at a V09 rule that does not exist. *Required change:* V9 §4.16 gains
(6) **Wording a locus**, the reverse of (4): the `rel`'s `parse.*` connective ("in", "on", "at", "near"), a `side` as "the
{side} side of", then the target's gazetteer name ("near the North Gate", "on the west side of the Market"), read by this
row and by the history template "Asked for {name} {locus}"; `refuse.roster.dossier`'s row states its slots: `{thing}` the
line's name, or the class's display label when the name is `''`; `{locus}` the line's locus by (6), or the settlement's
name for a line with none. V10's citation is SR3-07 (d).

### 3.3 Statuses and single sources

**SR3-05 · minor · V09 · stale cross-volume statuses.** V9 §10.2 leaves XV-V9-19, XV-V9-21 and XV-V9-22 without a status,
and V9 §12 still reads "volume 10 adopts XV-V9-19 as stated — open until volume 10 writes seam-surfaces-r2's SR2-10 and
SR2-17" and, as PLAUSIBLE, "that V08, V10 and V06 adopt XV-V9-21 – XV-V9-23 as stated". Volume 10's round 3 (06:25)
wrote XV-V9-19 (a) – (c) and XV-V9-22 (a) – (c) (V10 §2.6's dispatch note and `rebuild` rows, §4.1's query,
BCR-V10-22's last sentence, §3.1 (4), §4.3, §1b.2, T-V10-20), (d) holding since round 2 (V10 §2.3); volume 8's round 3
(06:30) wrote XV-V9-21 (V08 §3.1 step 7 (b), (c), §4.6, §5.1, X12). *Required change:* XV-V9-19, XV-V9-21 and XV-V9-22
are marked **Met** with those citations; V9 §12's sentences read "XV-V9-19, XV-V9-21 and XV-V9-22 are met (CONFIRMED by
reading volumes 8 and 10 as their third rounds landed); XV-V9-23 stays open (volume 6; seam-surfaces-r3 SR3-08)".

**SR3-06 · minor · V08 · restatements, and the host-mode list.** *Required change:* (a) V08 §3.1 step 7 (b)'s
`newDocuments` clause restates V9 §3.9's rule with a shorter list ("a copy, a re-run, Same kind, new seed,
`ClerkMount.openNewDocument`" — V9 §3.9 also names `refuse.restore.dossier`'s button and the drawer's `fork` and `rerun`)
and the mechanism ("writes it with `export(h, 'plat')` at the role's key to the user's device"); it reads
"`newDocuments: 'download'` — V9 §3.9's host-mode rule then governs every action that makes a new document; a copy of a
dossier-bound document is detached (V6 §4.4): it does not follow SettlementForge (J-V8.93)", and §1b's
`HostSlots.newDocuments` row cites V9 §3.9 without the list. (b) V08 §4.6's last sentence ("A line has **Show** when it
has targets and no **Undo this**…") reads "Each line is drawn by V9 §4.10's rule for the host's lines; its undo is V08
§4.2's "Hide again" or "Reveal again"." (c) V08 §5.1's list of host-mode differences, "exactly these points", gains "the
assistant as the host's `clerk.config` sets it — the Assistant button only under `builtin`, otherwise the card-only
drawer for a host's proposal (V9 §2.2, §4.11; V10 §3.17) — with no creation mode and no **Start a new map from this**
(V9 §3.9, §4.11)", and its "no file menu, open, save or permalink" reads "no file operations — New town, Open…, Save a
copy, Recently deleted — and no permalink (V9 §2.2's `fileMenu: false`; SR3-02)", so T-V9-28's allowlist, which reads
this list, meets the shell V09 builds.

**SR3-07 · minor · V10 · companions, stale lines and a loose type.** *Required change:* (a) §12's PLAUSIBLE bullet "That
V09's third round (reconcile-V09-r3, running) lands `ClerkMount.rebuildEvents(seq)` and `ClerkHandle.send`'s
`attach.newMap` as its batch 1 wrote them" moves to CONFIRMED: landed 06:25, V9 §2.10 as this volume cites it
(`rebuildEvents` answering `[]` when nothing can be built; `attach.newMap?: true`, never set in host mode). (b)
CVR-V10-7's clause "the history row's "Build it again" events as `rebuild`'s one source" reads "`ClerkMount.rebuildEvents
(seq)`, V09's one implementation of V9 §4.20.3 (4)", and the row is marked **Met** (V9 §4.3's `delete` row with T10,
BCR-V9-26 as one text, V9 §4.11's **What else changes**, V9 §4.20.8 (5)'s stack top for `entity { at }`, V9 §2.10). (c)
`ClerkTranscript.key` is typed `'secret' | { tier: 'public' | 'local'; places: Id[] }` — the `admitAs` form the
effective key is passed in (V9 §2.10) — rather than `Admission`, whose bare `'public'` and `'local'` `admitsAll` (V10
§2.3) does not define; the field's comment already says so. (d) Once SR3-04 lands, §3.16's `dossier` row's slot clause
reads "its slots filled by V9 §4.9's row" in place of its own statement, J-V10.93 keeping the decision. (e) SR3-03's
companion: T-V10-7's clause reads "…is refused with the unplaced elements offered and, where a `sites` candidate is free
of hard fails, its placement on a plot — a place by a locus and a roster line alike (J-V10.93)".

**SR3-08 · minor · V06 · XV-V9-23 unmet (the re-adds that lift a removal).** V6 §2.13 (7), landed at 06:17 before V09
wrote the request (06:25), lifts a generated chain's, quay wall's, retaining wall's or deck plot's suppression by "the
delete's undo, or the user's own wall drawn on that line or plot added at that slot" — no event form, and a chain's
re-add is no wall. V9 §4.20.3 (4)'s **Build it again**, which volume 10's **Put it back** takes through
`ClerkMount.rebuildEvents`, emits `drawWall { kind, points, closed }` for a quay wall, `placeGate { enceinte, at }` for a
harbour-mouth chain, `drawWall { kind: 'retaining', … }` for a retaining wall and `drawFootprint` on the deck for a deck
plot (its fallback pre-decided there). *Required change:* V6 §2.13 (7) names each kind's lifting re-add as V9 §4.20.3
(4)'s rows emit it, keys unchanged — the quay wall's by `drawWall` on its former line, the chain's by `placeGate` at its
former place serving (enceinte, basin), the retaining wall's by `drawWall { kind: 'retaining' }` on its chain serving its
lineage address, the deck plot's by a `drawFootprint` on the deck whose plot S11 fits at slot k serving (host, k) — and a
T-V6-58 or T-V6-63 clause commits each **Build it again** and finds its key lifted and counted once; V09 then marks
XV-V9-23 met and withdraws its deck-plot fallback. (J-SS3.4.)

**SR3-09 · minor · BASE-F · conditions now met.** *Required change:* item 453's "(V08's `export.request` carries its union
once seam SR2-06, volume 8's half, lands; SR2-19)" reads "(V08 §2.2's `export.request.knowledge` and `exportPicture`,
BCR-V8-1; SR2-19)"; item 572's "(V08's party gazetteer passes `admitAs` once seam SR2-07, volume 8's half, lands;
SR2-19)" reads "(V08 §3.14 (1), (2) (c): the party render's `admitAs`; SR2-19)"; item 472's note adds "`Admission` is
item 572's type, applied before it; its text also carries `party.render` and `party.rendered` (V08's round 3, J-V8.91),
applied by reference".

## 4 Disposition summary by owning volume

| owner | blocker | major | minor | ids |
|---|---|---|---|---|
| V09 | 0 | 2 | 3 | SR3-01, SR3-02; SR3-03, SR3-04, SR3-05 |
| V08 | 0 | 0 | 1 | SR3-06 |
| V10 | 0 | 0 | 1 | SR3-07 |
| V06 | 0 | 0 | 1 | SR3-08 |
| BASE-F | 0 | 0 | 1 | SR3-09 |

Totals: 0 blockers, 2 majors, 7 minors (9). Round 2's 19 issues: all FIXED. Of the 9, five are round 2's residues (a
status or condition left stale when the other lane landed, a restated rule, an unmet sibling request: SR3-05, -06 (a)
and (b), -07 (a) and (b), -08, -09), two were opened by round 3's own repairs (SR3-03 — J-V10.93 extended the dossier
alternative to roster-list lines without the canvas's T7 following; SR3-04 — V10's slot rule points at a wording rule
V09 lacks), and
the two majors are in text the earlier rounds read without filing (the load outcomes of V9 §3.14 against the base's
§2.9, and the meaning of `fileMenu: false`). Order of work: V09 first (its two majors define a control and a slot's
meaning the others cite), then V08 and V10 (their companions), V06, and file f.

## 5 Decisions of this check (vetoable)

| id | decision |
|---|---|
| J-SS3.1 | chose to route the three load outcomes to V09 (a split row, a frozen-view control, the recipe action under the host rule) over asking V08 for a frame control, because the shell draws every load outcome (V9 §3.14) and V08 §5.1 says the frame draws everything, while one event keeps one control: in host mode the in-window upgrade stays V08 §4.2's header control (SR3-01) |
| J-SS3.2 | chose to define `fileMenu: false` as dropping the file operations only — keeping Export skeleton, Rebuild around my drawings, Settings and About — over a second menu or a settings gear for host mode, because one shell in both modes is T-V9-28's premise, the kept entries are edits and preferences rather than storage, and the host is the store only for documents (SR3-02) |
| J-SS3.3 | chose to bring the canvas's T7 to volume 10's round-3 rule (J-V10.93: the plot offered for a roster line too) over narrowing volume 10, because J-V10.93 is a recorded decision grounded in item 101's R2 (a one-click lawful alternative wherever the query finds one) and T6 already carries the button (SR3-03) |
| J-SS3.4 | chose to file XV-V9-23's unmet half from this seam, owned by V06, over leaving it to the time seam, because volume 10's **Put it back** consumes those events through `rebuildEvents` and V06 landed before the request existed; V09's pre-decided deck-plot fallback keeps a builder unblocked until it lands (SR3-08) |
| J-SS3.5 | kept J-SS1.1 (one owner per issue) and J-SS2.6 (one bundled minor per volume for companion citations and stale lines: SR3-06, SR3-07) |

## 6 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (each located in the live text on both sides; quoted phrases copied from the files read this round):
SR3-01 – SR3-09; the §1 re-check of SR2-01 – SR2-19; the §2 agreements, except the one marked PLAUSIBLE there. The
changes since round 2 were established by an executed `diff` against backups whose md5 equals round 2's inputs
(`bddde2a4…`, `fe19e39e…`, `d32c6a0e…`, `a85996a2…`, `a8c72fb4…`); the absence claims by `grep` over the current files —
no `frozenImport` control and no meaning of `fileMenu` in V09, Settings reachable only from the file menu (V9 §5.1's
top-bar row), no locus-wording rule in V9 §4.16, no event form in V6 §2.13 (7), no sibling citation of the transcript's
`tier`; V08 §3.1 step 1's `allow-downloads` flag by `grep`.

**PLAUSIBLE:** that the sections listed in §0 as not re-read hold no further seam defect (rounds 0 – 2 read them and no
round-3 diff touched them); that `party.render`, `host.action` and `host.state` leave §11.3's *One way* paragraph intact
(none carries a dossier change, but BCR-V8-1 does not say so in words); and that SR3-01's and SR3-02's required changes
need no re-pricing (a split failure row with one control, and a comment on an existing slot: AP1–AP5 absorb them).

## 7 Continuation — why, inputs, method and coverage (2026-09-29, re-issued brief)

**Why a continuation.** The workflow re-issued this lane. Its brief — re-check every issue the previous round raised
(`seam-surfaces-r2.md`), then sweep the whole seam — now covers a wider set than the 06:49 landing did: round 2 gained its
continuation SR2-20 – SR2-29 at 10:02, fixed by the second briefs of reconcile-BASE-F-r3 (10:39), reconcile-V08-r3
(10:44), reconcile-V09-r3 (10:48) and reconcile-V10-r3 (10:55). SR2-01 – SR2-19 and this file's §0 – §6 (SR3-01 –
SR3-09) are history: the round-3 fixes landed at 07:19 – 07:38 (reconcile-V06-, V08-, V09-, V10-r4 and
reconcile-BASE-F-r4) and were swept by round 1's continuation (09:15), which read every change since this round's first
inputs. They are not redone (J-SS3.6). New findings are numbered on from SR3-10.

**Inputs** (md5 at the continuation's start and re-checked before §10 was written; snapshots in
`scratchpad/volumes/surfr3b/now/`): V09 `a843d0a3…` (4 542 lines, reconcile-V09-r3 10:48), V10 `9e3fdbd3…` (3 656,
reconcile-V10-r3 10:55), V08 `594909a3…` (3 614, reconcile-V08-r3 10:44), `_integrate.md` `965ab696…` (468, unchanged
since round 1's continuation), file f `b4546425…` (1 526: reconcile-BASE-F-r3 10:39 and reconcile-V12-r3's item-497
note 10:44), the base `docs/ARCHITECTURE.md` `01fea21f…` (unchanged).

**Method.** (1) Each of SR2-20 – SR2-29 re-read on both sides in the live text: the owner's fix located, then every
sentence across the seam the fix touches. (2) Every change since round 2's continuation, as one diff per file against
the reconcilers' backups, each byte-identical to round 2's continuation inputs (V09 `rcV9r3c/V09-pre-r3c.md` =
`4d08c4fa…`, V10 `reconcile-v10/V10-pre-reconcile-r3b.md` = `e737f403…`, V08 `rcV8r3c/V08-pre-r3c.md` = `a2bdf6d3…`,
file f `rcBFr3c/f-pre-r3c.md` = `ae1bb8ca…`; md5 checked): V09 178 diff lines, V10 173, V08 253, file f 127,
`_integrate.md` none — about 138 KB, all read whole. (3) Every seam term a changed hunk introduced (`historyLines`,
`list(key)`, the per-key cache, `dossierKey`, `restyle`, `decoration`, **Use another building**, `withheldWords`,
`rebuildEvents`, `suppressedFired`) counted across the three volumes, file f, `_integrate.md` and the base
(`surfr3b/census.txt`) and read in context. (4) Every cross-volume request the three volumes hold toward a volume outside
the seam and cite as a mechanism (V9 §10.2's open XV rows, V08 §13's open X rows, V10 §12's PLAUSIBLE list) checked
against the target volume's live text by `grep` and a read of the section named. Read whole in the live text: V08 §3.1
step 7 (b), (c) and §4.6 item 3; V9 §2.2's `HostSlots.historyLines`, §2.10's effective-key paragraph, §4.9's opening
rule and the `bend.under.*` rows, §4.17.4's closure ladder and *The bends' alternatives*, §4.20.3 (4) with its fallback,
BCR-V9-36, J-V9.86, J-V9.95, T-V9-38, XV-V9-23, -27, -28 and §12's round-2- and round-3-continuation paragraphs; V10
§3.16 whole, §4.2's group rule, §12's PLAUSIBLE list, J-V10.98, J-V10.99; file f items 372, 463, 467, 468, 583 and its
*Reconciliation round 3 — continuation*; outside the seam, V04 §3.8 whole (U-DIG), V04 §1b's U-DIG and `DugGenerators`
rows and §4.1's declaration table, V06 §2.10's `EpochReport`, §3.19.3 whole, W19, W58 – W60 and X39, V11's row 63 and
§3.24.2 (for V08's X19); the base's §11.2 `subscribe` and `ApiEvent` row.

## 8 Re-check of round 2's continuation (SR2-20 – SR2-29)

All ten are fixed in the text their owners were asked to change. Five left a residue across the seam, or a defect beside
the fix that the fix exposed; each is filed in §9 with its own id, none reopened as such.

| id | owner | state now | residue filed |
|---|---|---|---|
| SR2-20 | BASE-F | FIXED — item 583 carries BCR-V9-36 in §11.2's run after item 468, applied after items 468 and 467 on the one `entity` member ("its input reads `id`, `at`, `layer`, `below` and `dossierKey`"), *Needed by* V08, V09, V10, **STAGED (SettlementForge stage, SF0 to SF7), with volume 9's AP5b**; items 467 and 468 name the order from their ends (J-RF3.8) | SR3-12 (c) (BCR-V9-36's own reader list omits V08's party lines, a reader item 583 names) |
| SR2-21 | BASE-F | FIXED — item 372's note applies BCR-V9-22 as reconcile-V09-r2's second brief left it: the four rungs, then the further qualifying buildings in `PreviewResult.alternatives` (plan distance, then address, at most three) and the untargeted grouped access's target rule; "Also touches: §11.2", applied after item 463, whose note names the order; *Needed by* V09, V10 | SR3-11 (V4 §3.8's ban on unexcavated targets contradicts the grouped-access rule); SR3-15 (item 372's *Needed by* lacks V04) |
| SR2-22 | V10 | FIXED — V10 §3.16's *The dry run's bends* reads the alternatives in two cases (a placement bend's plots as `placeAt`; `bend.under.accessDug`'s buildings as the group `[addUndergroundAccess { building }, the item's declaration]`, no `target`, at most three, in the dry run's order); §3.5 step 3 and §1b.1's filtered dry-run row cite it; T-V10-4's three-building clause (no `placeAt` among them); J-V10.98 | SR3-14 (b) (each alternative's label composed from a button text and a name, a line no catalogue row holds), (c) (`bend.under.accessDug`'s **Show the way in** not carried) |
| SR2-23 | V09 | FIXED — V9 §2.2's `historyLines.list(key: ViewState['knowledge'])` with its comment (the shell calls `list(effectiveKey())` at each draw, so again on each `onChange` and `onEffectiveKey`; the provider keeps no View-as state or key subscription; a provider may answer at once and fire `onChange` when more is read); §2.10's paragraph, §4.10, §2.12, §1b; T-V9-28's spy clause; J-V9.114; XV-V9-29 **Met** | SR3-13 (a) (V08's X20 left open after this landed), (c) (V08's "no subscription of its own" beside a head-move drop that needs §11.2's `subscribe`) |
| SR2-24 | V08 | FIXED — (a) V08 §3.1 step 7 (b): `{places}` at the key `list` is called with, each by `query(h, { kind: 'entity', dossierKey } \| { kind: 'entity', id }, { admitAs })`, `withheld` unnamed and untargeted, `null` named by its key, a line with no place not listed, the per-key cache (J-V8.109), no `onEffectiveKey` handler; J-V8.106 REVISED; T-V8-47's clause; §1b and §2.7 rows; (b) §4.6 item 3 from `EpochReport.raised.suppressedFired` (XV-V9-28; J-V9.113); (c) §4.6's word homes and item 1 by `report.moved.<kind>`; (d) the absorb group by the port's `host:port` session; (e) X18 **CLOSED**, §12's clause CONFIRMED | SR3-10 (item 3's field is produced by no volume: V06 never adopted XV-V9-28); SR3-13 (a), (d) (X19 and X20 left OPEN after their lanes landed; §12's CONFIRMED sentence on the field) |
| SR2-25 | V10 | FIXED — (a) CVR-V10-18 **Met**, T-V10-4's this-quarter case with View as off and on, §12's bullet CONFIRMED, §13's "it landed 09:49"; (b) §4.1's `quarter` row states the scope (every `gazetteer` row not marked `withheld` whose district is the quarter, at the effective key) and cites V9 §4.5's T11 row as the same, §6.1's budget row names the exclusion; (c) `ClerkQuery`'s `entity` member gains `dossierKey?` with its comment (never the model-facing `read_map` input), BCR-V10-1's parenthesis, §1b.1's `EntityCard` row; (d) `restyle.concern` the closed set `'style.compass'\|'naming.emblem'\|'render.instances'\|'decoration'`, any other value an `is_error` result, §3.4's enum list, J-V10.99 | — |
| SR2-26 | V09 | FIXED — **New decoration** in V9 §3.7, §4.3's and §4.5's T12 rows (one `group` of `rerollLayer` `style.jitter` then `style.crowns`, each at its current salt + 1, registry order, display only), §4.10's template (the group one row; "New emblem" and "New compass" found beside), §5.7, §1b, T-V9-6, T-V9-12 (every rerollable concern of §6.1's registry written by a control), AP4; J-V9.115. V10's `restyle { concern: 'decoration' }` writes the same two events (V10 §4.1's T12 row; T-V10-4) | — |
| SR2-27 | V09 | FIXED — V9 §4.10's report-entry lines and V9 §5.7's two lists name their `{ id }` arguments by `entity` reads at `effectiveKey()`, a withheld address as its `kind.<registry kind>` word with no **Show**, re-rendered on `onEffectiveKey`; §2.9's `MsgRef` comment separates engine-built messages (the caller's key) from panel-built lines (the view's key); §6.3; §1b; T-V9-69's clause; J-V9.116 | — |
| SR2-28 | V09 | FIXED — V9 §2.12's `HistoryRow` readers read "the history panel, the context panel's History tab, `HostSlots.historyFilter`", as §1b does; V10 holds no `HistoryRow` (census) | — |
| SR2-29 | BASE-F | FIXED — item 390 "Also touches: §5.4 (`GenerationReport.dossierNotes`; SR-23)", *Needed by* V08, V09; item 410 "Also touches: §8.3, §11.1, §11.2 (the `gazetteer` query's `customChain` rows …)", *Needed by* V08, V09 | — |

## 9 Sweep of every change since round 2's continuation inputs (SR3-10 onward)

Severity as in §3: **blocker** (breaks an owner ruling), **major** (a contradiction or an unwired piece a builder would
hit), **minor** (wording, a status, a restatement, a label left outside the catalogue). One owning volume per issue
(J-SS1.1); pure companions and stale statuses of one volume are bundled into one minor for that volume (J-SS2.6). Two of
the six are owned by volumes outside the three: each is a mechanism this seam's volumes read as their input, requested
in V9 §10.2 and taken by no lane (J-SS3.7).

### 9.1 Mechanisms the seam reads that no volume produces

**SR3-10 · major · V06 · unwired (the history's "kept removed" line has no producer).** Round 2's continuation left
XV-V9-28 to volume 6's own lane (J-SS2.12), and no lane took it: V6 §2.10's `EpochReport.raised` reads `{ founded;
repaired; spansFallen; ranDry; waited; aboveCap; suppressedHeld: number /* live reasons a removal suppresses */; disused }`,
and V06 holds no occurrence of `suppressedFired` or of XV-V9-28 (reconcile-V06-r3's continuation landed 10:31 on other
issues). Four readers across the seam depend on the field: V9 §4.10's `epoch` row ("its `lines` one
`info.raised.suppressed` line (`{w}` the removal's week) per entry of the epoch report's `raised.suppressedFired`"), V08
§4.6 item 3 (since SR2-24 (b): "drawn as V9 §4.10's `epoch` row's line, from V06's `EpochReport.raised.suppressedFired`"),
T-V9-69's variant ("an epoch in which a removed raised way's reason fires again (V06's fixture for W60) … carries one
`info.raised.suppressed` line with **Show** on the removed way's former outline") and T-V8-45 ("a reason firing at a slot
the DM closed is one line `info.raised.suppressed` with the removal's week as `{w}`"). `suppressedHeld` is a count: it
names no removal to **Show** and no week for `{w}` (J-V9.113). A builder of the history panel has nothing to read; a
builder of volume 6 has no request in its own text. *Required change:* V6 §2.10's `raised` gains `suppressedFired: {
removal: number /* the seq of the live removal (the delete) holding the key */; week: number /* that removal's week */
}[]`, filled by the raised-ways pass where V6 §3.19.3 (2) skips a suppressed key: one entry for each candidate whose
reason reading (V6 §3.19 (2)) gives a key a live removal suppresses and whose chance gate passes this epoch — W59's one
uniform, drawn for a suppressed key exactly as for any other, so no other draw moves — that is, each epoch in which the
town would have founded it; in removal order; a key a user's re-add serves adds no entry (V6 §3.19.3 (3), (7)); derived
with the rest of the report (W19's lifecycle: rebuilt by replay). W19's and W58's reader columns add "V9 §4.10's `epoch`
row lines and V08 §4.6 item 3 (`raised.suppressedFired`)". T-V6-58 gains the clause "on its METROPOLIS fixture, an epoch
whose viaduct reason passes its gate at the removed viaduct's key reports one `suppressedFired` entry carrying the
delete's `seq` and week, an epoch whose gate fails reports none, and none after the delete's undo or while a serving
re-add stands" — the fixture T-V9-69's variant names. V09's status is SR3-12 (b); V08's is SR3-13 (d). (J-SS3.7,
J-SS3.8.)

**SR3-11 · major · V04 · contradiction with the base as file f item 372 applies BCR-V9-22 (the grouped access into a
sealed void).** Item 372 (SR2-21, landed 10:39) applies BCR-V9-22's second new sentence: "an `addUndergroundAccess` with
no `target`, grouped before a dwelling declaration on the cluster from one of those buildings, targets the cluster's
element nearest in plan to that building's footprint (ties by address), so the declaration's closure finds the cluster
reachable and generates no access of its own". V9 §4.17.4's **Use another building**, V10 §3.16's alternatives
(J-V10.98), T-V9-38 ("… with the access reaching the cluster and no second access") and T-V10-4's three-building clause
rest on it. But V4 §3.8 — U-DIG, the closure generators every `addUndergroundAccess` runs (V4 §1b's U-DIG and
`DugGenerators` rows; the `addUndergroundAccess` row of V4 §4.1: "the closure (V4 §3.8)") — says: "**Voids and bans.**
The target search never picks an element of an `unexcavated` cluster unless the edit names it", and the dwelling
closure's cluster is `unexcavated` by definition (item 109 (j) (4)). A builder of U-DIG, holding the base and V04, digs
the grouped access to another target or ends it at the minimal system (V4 §3.8's outlet row); the dwelling
declaration's closure then finds the cluster sealed and digs its own access from step 1's building, so the canvas's
button and the clerk's card commit two accesses, one from a building the user did not choose, and T-V9-38 fails. V04
also names no caller for the dwelling closure (U-DIG's row: "for `addUndergroundAccess`, an undercity lifeline, a
subterranean dossier institution and its network"; `DugGenerators`' callers likewise), and XV-V9-27's citation "V4
§4.1's adoption of BCR-V9-22" points at text V04 does not hold (no occurrence of `BCR-V9-22` in V04). *Required
change:* V4 §3.8's *Voids and bans* reads "The target search never picks an element of an `unexcavated` cluster unless
the edit names it, or the access is BCR-V9-22's grouped access (base §7.3 item 9 (d) as file f item 372 applies it): an
`addUndergroundAccess { building }` with no `target`, grouped before a dwelling declaration on an `unexcavated` cluster
(V9 §4.17.4's forms), targets that cluster's element nearest in plan to the building's footprint (ties by address). Either
is the user's excavation (cause `edit`), its dry run listing the clusters it opens, and the declaration's closure then
finds the cluster reachable and adds no access."; V4 §3.8 names the dwelling closure's dug access among its callers —
"the dwelling closure's first rung (base §7.3 item 9 (d); BCR-V9-22): from the ground building nearest above the cluster
whose dig floor lies within `DigRule.maxM`, the cluster's nearest element its target, the further qualifying buildings
listed by the dry run as the base states" — and V4 §1b's U-DIG row and `DugGenerators` row add "a dwelling
declaration's closure on a sealed void and the grouped access before it (BCR-V9-22)"; T-V4-48 gains "on T-V9-38's
three-building fixture, the group `[addUndergroundAccess { building: the second building }, the dwelling declaration]`
digs from that building to the cluster's element nearest its footprint, opens the cluster (cause `edit`), and the
declaration adds no second access". V09's status is SR3-12 (b); file f's *Needed by* is SR3-15. (J-SS3.7, J-SS3.10.)

### 9.2 Statuses, citations and one label

**SR3-12 · minor · V09 · statuses left behind, one reader list, one list-form button.** *Required change:* (a)
**XV-V9-23 is met** — V6 §3.19.3 (7) names each suppressed kind's serving re-add in Build it again's forms, the deck
plot's "`drawFootprint { polygon, cls? }` on the deck whose plot S11 fits at slot `k`: served while that declared plot
stands at (host, `k`)", with V6 §2.12's suppression row, J-V6.116 and V06's X39 (reconcile-V06-r4 landed 07:31), yet
V9 §10.2 still reads "**Open** (volume 6; …; the deck plot's fallback pre-decided in V9 §4.20.3 (4) until it lands)".
The row is marked **Met** with those citations; V9 §4.20.3 (4)'s sentence "**Pre-decided fallback** for the deck plot:
if volume 6 does not count a declared footprint at the slot as the re-add serving its key (XV-V9-23), the deck plot's
row is withdrawn and its removal is lifted only by Undo this." is removed, its condition no longer able to arise; the
deck-plot row's "(V6 §2.13 (7)'s "plot added at that slot"; XV-V9-23)" reads "(served by V6 §3.19.3 (7); XV-V9-23 met)";
J-V9.95's "with a pre-decided fallback" gains "(withdrawn: V6 §3.19.3 (7) serves the key; SR3-12)". (b) XV-V9-27's
text cites what volume 4 is now asked to write — "V4 §3.8's *Voids and bans* exception for BCR-V9-22's grouped access,
and the dwelling closure among U-DIG's callers (seam-surfaces-r3 SR3-11)" in place of "V4 §4.1's adoption of
BCR-V9-22, XV-V9-4" — marked **Open** (V04; SR3-11); XV-V9-28 is marked **Open** (V06; SR3-10); V9 §1b's
dwelling-closure row's "the access closure's pieces with the dwelling (BCR-V9-22)" reads "the access closure's pieces
with the dwelling (BCR-V9-22), dug by V4 §3.8's U-DIG". (c) BCR-V9-36's "Read by volume 9's history note lines and the
report panel's standing-note lines (volume 9 §4.10, §5.7) …" adds "and by volume 8's embed bridge handler for the party
lines' places (volume 8 §3.1 step 7 (b))" — the reader file f item 583 names and V10 §2.13's comment calls "a host
reader". (d) V9 §12 gains, after its round-3-continuation paragraph, a sentence moving to CONFIRMED "that the base
record's reconciler carries BCR-V9-36 and BCR-V9-22's two new sentences into file f" (items 583 and 372, landed 10:39)
and XV-V9-23 (met in V06's text), and keeping PLAUSIBLE only "that volume 4 adopts XV-V9-27 and volume 6 XV-V9-28"
(SR3-11, SR3-10). (e) SR3-14 (b)'s companion: V9 §4.9's `bend.under.accessDug` row's button column gains the list form
"Dig down from {building} instead" — the label of one alternative where a card shows every alternative at once (volume
10 §3.16), `{building}` the building's name as the card's reader reads it (the canvas at the role's key, J-V9.86; the
clerk at its session key) — beside the canvas's stepping "Use another building".

**SR3-13 · minor · V08 · two hand-offs left open, one sentence, one mechanism unnamed.** *Required change:* (a) X19 is
marked **CLOSED** (V11 §3.24.2 holds `elevated.landmarkMinSignificance` and V11 §3.1 row 63 lists `customWeights` with
`calibratable: false`; reconcile-V11-r3's continuation landed 10:48) and X20 **CLOSED** (V9 §2.2's `list(key)`, §4.10's
re-list and T-V9-28's clause; XV-V9-29 met; reconcile-V09-r3's second brief landed 10:48); §13's opening "and X19 (V11)
and X20 (V09) are added" gains "(both since closed; seam-surfaces-r3 SR3-13)". (b) §12's "**PLAUSIBLE:** that V09 adopts
SR2-23's slot shape `list(key)` and V11 adds `elevated.landmarkMinSignificance` and `customWeights` as V08 §13 X19 and X20
state them (open until those lanes land)" moves to CONFIRMED with those landing times. (c) V08 §3.1 step 7 (b)'s "The
handler keeps no subscription of its own — the shell re-lists on `onEffectiveKey` (V9 §4.10) —" reads "The handler keeps
no key subscription of its own (V9 §2.2) — the shell re-lists on `onEffectiveKey` (V9 §4.10) —", and the cache's
"dropped when a line is added and when the document's head moves (a commit or an applied tail)" names its source: "—
the head move read from the `doc.changed` `ApiEvent` of the handler's one `subscribe(h, …)` on the frame's document
(§11.2), registered at each `doc.load` and released at `close` and `switchTo` — firing `onChange` then, so the shell lists
again"; T-V8-47's "the handler registers no `onEffectiveKey` handler" gains "and exactly one `subscribe` on the loaded
document". As written, "no subscription of its own" forbids the one read the head-move drop needs, and a builder who
honours it keeps a renamed or newly withheld place's old answer. (d) SR3-10's companion: §12's continuation sentence
confirming "its `epoch` row's `info.raised.suppressed` lines from V06's `EpochReport.raised.suppressedFired` (XV-V9-28;
J-V9.113)" keeps V09's text as CONFIRMED and adds "PLAUSIBLE until volume 6 writes the field (seam-surfaces-r3 SR3-10)";
§13 gains X21 (V06): `EpochReport.raised.suppressedFired` as SR3-10 states it, read by V08 §4.6 item 3 and T-V8-45.

**SR3-14 · minor · V10 · a stale bullet, a label outside the catalogue, one button not carried.** *Required change:* (a)
§12's PLAUSIBLE bullet "That V09's **Use another building** and the clerk's alternatives read one list — BCR-V9-22's
widened sentences, which file f's item 372 carries once SR2-21 lands, and XV-V9-27's adoption in V04's U-DIG — T-V10-4's
three-building case decides." reads "… — BCR-V9-22's widened sentences, which file f's item 372 carries (landed 10:39),
and V4 §3.8's grouped-access exception (seam-surfaces-r3 SR3-11) — T-V10-4's three-building case decides." (b) §3.16's
and J-V10.98's "each labelled with that button's text and the building's name read at the session's effective key, or its
`clerk.content.withheldWords` word when it has none or the key withholds it" read "each labelled by V9 §4.9's
`bend.under.accessDug` row's list form ("Dig down from {building} instead"; SR3-12 (e)), `{building}` the building's name
read at the session's effective key, or its `clerk.content.withheldWords` word when it has none or the key withholds it":
a label joined from a button's text and a name is a line no catalogue row holds, against §3.16's own opening (the
engine's bends "worded by that `MsgRef` alone — V9 §4.9's … row") and V9 §4.9's one-source rule; a locale could not
reorder it. (c) §3.16's "`bend.under.accessOpening` lists no building, so its buttons are `select` actions (**Show the way
in**, **Show me why**)" reads "`bend.under.accessDug`'s **Show the way in** and `bend.under.accessOpening`'s buttons
(**Show the way in**, **Show me why**) are `select` actions, the latter row listing no building", so the clerk's card
carries every button of V9 §4.9's `bend.under.accessDug` row, as the canvas's does (T101-3).

**SR3-15 · minor · BASE-F · item 372's *Needed by* lacks the volume that builds it.** Item 372 reads "*Needed by:* V09,
V10 (V10 §3.16's dry-run bends turn those buildings into **Use another building** proposals, with seam SR2-22)". Its
grouped-access rule is built by V4 §3.8's U-DIG (SR3-11), so the coherence pass would not re-check volume 4 against it.
*Required change:* item 372's *Needed by* adds "V04 (V4 §3.8's U-DIG digs the closure's access and the grouped access's
target, with seam SR3-11)".

## 10 Disposition summary of the continuation

| owner | blocker | major | minor | ids |
|---|---|---|---|---|
| V06 | 0 | 1 | 0 | SR3-10 |
| V04 | 0 | 1 | 0 | SR3-11 |
| V09 | 0 | 0 | 1 | SR3-12 |
| V08 | 0 | 0 | 1 | SR3-13 |
| V10 | 0 | 0 | 1 | SR3-14 |
| BASE-F | 0 | 0 | 1 | SR3-15 |

Continuation totals: 0 blockers, 2 majors, 4 minors (6); round 2's continuation SR2-20 – SR2-29 all fixed. The two
majors are cross-volume mechanisms this seam's volumes read as input, requested by reconcile-V09-r2 at 09:49 (XV-V9-27,
XV-V9-28) and taken by no lane in two rounds (J-SS3.7). The minors hold statuses left stale when a sibling landed after
the lane that cites it (SR3-12 (a), (d); SR3-13 (a), (b); SR3-14 (a)) and defects found beside a fix (SR3-12 (c), (e);
SR3-13 (c), (d); SR3-14 (b), (c); SR3-15). **Pairs to apply together:** SR3-11 with SR3-12 (b) and SR3-15 (the grouped
access in V04, V09's request row and file f's reader list); SR3-10 with SR3-12 (b) and SR3-13 (d) (the field in V06 and
the statuses of its two readers); SR3-14 (b) with SR3-12 (e) (the list-form label in V09's row and V10's card). **Order
of work:** V04 and V06 first (the mechanisms), then V09 (its statuses and the row V10 cites), then V08, V10 and file f.
**Routing:** the owners' next reconcile lanes — for V04 and V06 a lane of the round that consumes this file, since their
round-3 lanes have landed without these requests.

**Consistent across the seam (checked in this continuation, no finding).** The host lines' key: V9 §2.2's
`list(key: ViewState['knowledge'])`, V9 §2.10 and §4.10 (the shell's one `effectiveKey()`, re-listed on `onChange` and
`onEffectiveKey`), V08 §3.1 step 7 (b)'s fill with its per-key cache (an unread key answering only the lines that name no
place, then `onChange`), J-V8.109, T-V9-28's spy clause and T-V8-47's clause name one contract; `effectiveKey` and
`onEffectiveKey` stay `ClerkMount`'s alone. The binding-key read: V10 §2.13's `entity` member, BCR-V9-36, file f item 583
("`id`, `at`, `layer`, `below` and `dossierKey`"), V9 §4.10's note lines and V08's party lines read one member, never the
model-facing `read_map` input (J-V10.68); a collective record's `<key>#k` members are binding rows (V08 §2.3: "members
`#k` in the binding rows only"), so `dossierKey` answers them. The display re-rolls: V9 §4.5's T12 mapper and V10 §4.1's
`restyle` write the same bytes for New compass, New emblem, New trees and New decoration (one group of `style.jitter` then
`style.crowns`, each at its effective salt + 1, `DisplayList.salts` there and `MapBrief.salts` here, T-V10-8's one
number); a clerk proposal is one group on acceptance (V10 §4.2); T-V9-12 and J-V10.99 each hold every one of §6.1's six
rerollable concerns written by a control or a form. The report-entry names: V09's panels read them at `effectiveKey()`,
the clerk's reads at its session key, which is the same function (V9 §2.10). The removal line's words:
`info.raised.suppressed` is one key with `{w}` the removal's week in V10 §3.9's `suppressed` row, V9 §4.10 and V08 §4.6
item 3 (its producer is SR3-10). The dug access's alternatives: base item 372, V9 §4.17.4 and V10 §3.16 agree on the
list (the further qualifying buildings, plan distance then address, at most three) and the events (the access first, no
`target`); only V04's rule contradicts (SR3-11). File f's order notes on items 372, 463, 467, 468 and 583 read the same
from every end, and items 390 and 410 carry their new targets. **Outside this seam, not filed:** V10's CVR-V10-12 (V11),
CVR-V10-13 (V01) and CVR-V10-14's V05 and V07 parts, and V9 §10.2's rows to V02 – V05, V07 and V11 — open requests
whose targets the stage and content seams check; J-V9.86 (the canvas's own dry runs at the role's key, the clerk's at
its session key) is a recorded decision, so the two cards may name a building differently under View as by design.

## 11 Decisions, CONFIRMED versus PLAUSIBLE of the continuation

**Decisions (vetoable).**
* **J-SS3.6** — chose to continue this lane under its key rather than return the 06:49 summary under the resume rule,
  because the re-issued brief's issue set (round 2 now SR2-01 – SR2-29) is wider than that landing covered, as round 1's
  and round 2's continuations did (J-SS1.4, J-SS2.7); §0 – §6 stay as written.
* **J-SS3.7** — chose to file XV-V9-27 (V04) and XV-V9-28 (V06) as seam issues now, REVISING J-SS2.12, because in two
  rounds no lane took them: the workflow issues reconcile lanes from the critique files, V9 §10.2's open rows reach no
  lane of their own (a grep of every critique file finds the two ids only in round 2's decision not to file them), and
  V04's and V06's round-3 lanes landed without them; meanwhile this seam's sections (V9 §4.10, §4.17.4, V08 §4.6, V10
  §3.16) and bars (T-V9-38, T-V9-69, T-V8-45, T-V10-4) consume them. J-SS3.4 (XV-V9-23 filed to V06 from this seam) is
  the precedent.
* **J-SS3.8** — chose, for SR3-10, `suppressedFired`'s entries as the chance-gated firings — each epoch in which the
  town would have founded the removed way — over every held key at every epoch, because the readers' words are "a
  reason that fired" (V9 §4.10, V08 §4.6 item 3, T-V8-45) and "the town will not rebuild it" (V10 §3.9's `suppressed`
  row), and listing every held key at every epoch would repeat the line at each epoch of an absorb; the gate's uniform is
  keyed by its reason (W59), so drawing it for a suppressed key moves no other draw.
* **J-SS3.9** — chose, for SR3-14 (b), a list form of the button in V09's `bend.under.accessDug` row over letting V10
  join the button's text to the building's name, because V9 §4.9 is the one home of every line a bend shows (J-V9.79)
  and a card that shows every alternative at once must name each building, which the canvas's stepping button never
  does.
* **J-SS3.10** — rated SR3-11 major over minor, because a builder of U-DIG holding the base and V04 meets two
  contradictory sentences and either reading fails a bar (T-V9-38 or V04's own ban); and routed the exception to V04's
  text over asking file f to narrow the base, because the grouped-access rule is a decided mechanism (J-V9.112,
  J-V10.98, item 372) and V04's ban is the sentence it overrides.
* **J-SS3.11** — kept J-SS1.1 (one owner per issue) and J-SS2.6 (one bundled minor per volume for companions, statuses
  and stale lines: SR3-12, SR3-13, SR3-14).

**CONFIRMED (both sides read in the live text; each quoted sentence copied from the files read this continuation):** the
ten re-checks of §8 and the six findings SR3-10 – SR3-15, each located in the text it names. SR3-10 by `grep` over V06
(no `suppressedFired`, no `XV-V9-28`) and a read of V6 §2.10's `EpochReport`, §3.19.3 and W19, W58 – W60; SR3-11 by a
read of V4 §3.8 whole, V4 §1b's U-DIG and `DugGenerators` rows and §4.1's declaration table, `grep` (no `BCR-V9-22`,
no `XV-V9-27` in V04), file f item 372's note, V9 §4.17.4 and T-V9-38; SR3-12 (a) by V6 §3.19.3 (7), V6 §2.12's
suppression row, J-V6.116 and V06's X39 against V9 §10.2's XV-V9-23 row and V9 §4.20.3 (4); SR3-13 (a) by `grep` over V11
(`elevated.landmarkMinSignificance` 8 occurrences, `customWeights` 5, row 63's list) and the log's landing lines; SR3-13
(c) by the base's §11.2 `subscribe` and its `ApiEvent` row; SR3-14 (b) by V9 §4.9's opening rule and V10 §3.16's opening;
every item of §10's consistent list. The changes since round 2's continuation were established by executed `diff`s
against backups whose md5s equal round 2's continuation inputs. Inputs were unchanged from start to end (md5 as in §7,
re-checked before §10 was written).

**PLAUSIBLE:** that the sections of the three volumes untouched since round 2's continuation hold no new seam defect —
rounds 0 – 3 and the two continuations read them, and this continuation read the changes and the contract sections they
touch (the method of J-SS1.5); that the per-key cache's re-read after a head move completes within a frame, so the party
lines do not visibly flicker at each commit (J-V8.109; no bar measures it); that V04's and V06's changes need no
re-pricing (one rule exception and one caller in U-DIG, one derived list in a report the pass already writes); and that
SR3-11's required text is the whole of V04's side — V04 §3.5.7's U-ACCESS and the dwelling closure's steps 2 and 3
(public openings) were not re-read for the grouped case, which opens no public access.
