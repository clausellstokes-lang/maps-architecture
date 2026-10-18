# Seam check: the application (V09), the clerk (V10) and the host (V08) — round 2

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-surfaces-r2; covered by the whole-design retrovalidation (J84).

PROGRESS
- §0 Method, inputs and coverage | done
- §1 Re-check of round 1 (SR-01 – SR-21) | done
- §2 What the sweep found consistent | done
- §3 Issues (SR2-01 – SR2-19) | done
- §4 Disposition summary by owning volume | done
- §5 Decisions of this check | done
- §6 CONFIRMED versus PLAUSIBLE | done
- §7 Continuation — why, inputs, method and coverage (2026-09-29, re-issued brief) | done
- §8 Re-check of round 1's continuation (SR-22 – SR-36) | done
- §9 Sweep of every change since round 1's continuation inputs (SR2-20 onward) | done
- §10 Disposition summary of the continuation | done
- §11 Decisions, CONFIRMED versus PLAUSIBLE of the continuation | done

## 0 Method, inputs and coverage

**Inputs** (md5 at start, each the landed md5 of its round-2 reconciler per `docs/lane-events.log`): V09 `bddde2a4…`
(3 985 lines, reconcile-V09-r2 05:16), V10 `fe19e39e…` (3 284, reconcile-V10-r2 05:03), V08 `d32c6a0e…` (3 012,
reconcile-V08-r2 05:12), `_integrate.md` `a8c72fb4…` (367), file f `a85996a2…` (1 167, reconcile-BASE-F-r2 04:55), the
base `docs/ARCHITECTURE.md` `01fea21f…` (unchanged since round 1).

**Method.** (1) Every round-1 issue (SR-01 – SR-21) re-read on both sides in the live text. (2) Every line changed since
round 1, by diff: the round-2 reconcilers' backups are byte-identical to round 1's inputs (V09 `16a16491…`, V10
`ed19f693…`, V08 `f6549c4a…`, file f `40e2f8d6…`), so `diff` against them gives the whole change set — the three
volume diffs (1 030 lines) read whole, file f's scanned for the items carrying this seam's requests. (3) The seam's four
contracts — one tool vocabulary, one preview protocol, one knowledge rule, the host clerk seam — read whole again in the
live text, each finding read on both sides before filing: V09 §1b's clerk, host and knowledge rows, §2.2, §2.7's new
paragraph, §2.8, §2.10, §3.3 step 4, §3.8 (6), §3.9, §3.12, §3.14, §4.5's T6 and T7 rows, §4.8, §4.9's host and clerk
rows, §4.10, §4.11, §4.16, §4.20.3, §4.20.4, §5.7, §5.9, §5.10, §5.12, BCR-V9-14, -23, -34, XV-V9-19, -20, the
round-2 note; V10 §1b.1 – §1b.2's changed rows, §2.1, §2.6, §2.7, §2.9, §3.1, §3.5's head, §3.7's head, §3.10, §3.12,
§3.16, §3.17, §3.21, §4.1's T6 rows, §4.2 – §4.4, §5.3, BCR-V10-7, -22, -23, CVR-V10-15, -16, §12, §13, the round-2
note, T-V10-1, -2, -4, -6, -20, -40, -44; V08 §2.2 whole, §3.1 whole, §3.4, §3.14 whole, §4.1 – §4.6, §5.1, §5.2's
closing, §5.4, BCR-V8-1, BCR-V8-27, T-V8-27, -41, -46, -47, §12's round-2 paragraph, §13 X12, X14, X15, the round-2
note; `_integrate.md` §2.2's J-VI.12 – J-VI.21 and every H row naming V08, V09 or V10; file f's header rules, items
260, 367, 368, 453, 464, 470, 472, 473, 570 – 572; the base's §11.3 whole. Also read: the lane log's round-2 notes
between these lanes (05:03 V10 → V09; 05:11 V07 → V08; 05:16 V09 → V08, V10). **Not re-read** this round: the sections
round 1 listed as not re-read that neither diff touched — claimed as PLAUSIBLE only (§6). Scratch:
`scratchpad/volumes/surfr2/` (the diffs, the headings, base §11.3).

## 1 Re-check of round 1

All 21 round-1 issues are fixed in the text their owners were asked to change. Seven left a counterpart unwritten or a
new defect next door, filed in §3 with their own ids; none is reopened as such.

| id | owner | state now | residue filed |
|---|---|---|---|
| SR-01 | V10 | FIXED — BCR-V10-7 (c) projects every `query.result` and `preview.result`, names `rule` and `profile`, answers `measure`, `hit` and `inView` `query.result { error: 'E_HOST_KIND' }`; §3.17's door-1 paragraph and table, T-V10-20, J-V10.87 follow; V08 §5.4 (3) and T-V8-27 agree | — |
| SR-02 | BASE-F | FIXED — items 570 (BCR-V9-35), 571 (BCR-V10-23) and 572 (BCR-V10-22) in base-section order with the order notes asked for | SR2-19 (*Needed by* after round 2's texts) |
| SR-03 | V08 | FIXED — V08 §3.1 step 7 (a) – (d) fills `ClerkMount.host` and `HostSlots`; §1b rows 32 and 40 and a new handler row; J-V8.90; T-V8-47 | SR2-03 (two further slots to fill) |
| SR-04 | V08 | FIXED — `host.action` with `MapSession.on('action')`, §4.2's "How a click reaches the page", every row's operation column, T-V8-47 | SR2-04 (the tab banner's Update button has no route into the frame) |
| SR-05 | V08 | FIXED — the players' view is `ViewOpts.viewAs`, fed by `host.state`; no view-state write; T-V8-41's clause | SR2-09 (the rule restated in round 1's superseded wording) |
| SR-06 | V09 | FIXED — BCR-V9-23's union with the both-keys reading, V9 §2.10's `effectiveKey()` rule, V9 §4.8's "A host's players' view", J-V9.85 | — |
| SR-07 | V10 | FIXED — `createClerk` returns `ClerkHandle`, `type ClerkHarness = ClerkHandle`, `ClerkMount.host` the one bridge channel (§2.6, §2.11, §3.17), J-V10.57 superseded, J-V10.88, T-V10-20's source scan | — |
| SR-08 | V09 | FIXED — V9 §2.7's "Every band-less read speaks for its view", §4.8, §5.10, BCR-V9-14's key form, T-V9-66, J-V9.86 | SR2-06 (the bridge's `export.request` still carries the old type in V08) |
| SR-09 | V09 | FIXED — V9 §3.3 step 4, §4.20.4 (1), T-V9-12, J-V9.87 | — |
| SR-10 | V09 | FIXED on V09's side — `refuse.roster.dossier`, the element picker, **Put it at {site}** with its query, T-V9-13, J-V9.88 | SR2-10 (V10's half, XV-V9-19 (b), unwritten), SR2-11 (the no-candidate case) |
| SR-11 | V10 | FIXED — `ProposalView.accepted`, `.rebuild`, `actions` with `rebuild`, host cards `accept`/`drop`/`why`, "The card's buttons", §4.3, T-V10-44 | SR2-14 (the rebuild's events have no channel into the harness) |
| SR-12 | V09 | FIXED — **How do I …?** (drawer menu, Help), **Ask the assistant to place these** (T7), T-V9-40, J-V9.89 | — |
| SR-13 | V09 | FIXED — V9 §3.12's Fix runs a `propose` fix itself, clerk or none, J-V9.90, T-V9-40 | SR2-17 (a) (V10's dispatch table does not note its exception) |
| SR-14 | V09 | FIXED — §3.14's clerk row cites V10 §3.16's keys; `clerk.key.refused` deleted | — |
| SR-15 | V09 | FIXED — the constants table, §4.20.4 (7), BCR-V9-30, T-V9-55 and XV-V9-13 cite V11's `deck.landmarks/bridgeMid/minSpanM` (IN-V09-8's "(40 m)" is a dated integration note, not a live constant) | — |
| SR-16 | V09 | FIXED — `HostSlots.banner`, `historyFilter`, V9 §1.3, §1b | — |
| SR-17 | V10 | FIXED — §3.9a lists `AccessCause.rule`'s values and cites `info.under.cause.<rule>`, `info.under.sealed`, `.deep`, `info.catacomb.blocked.<cause>` | — |
| SR-18 | V10 | FIXED — §2.3 defines the session key as `ClerkMount.effectiveKey()`; interim text deleted; CVR-V10-15 and -16 met | SR2-17 (e) (CVR-V10-16's trailing clause; §12's stale PLAUSIBLE line) |
| SR-19 | V10 | FIXED — `effects[].kind: Effect['kind']` | — |
| SR-20 | V10 | FIXED — `history[].change.source?` | — |
| SR-21 | V10 | FIXED — `where.slot` encodes the points form for a taken or unoffered slot; T-V10-40; J-V10.89 | — |

## 2 What the sweep found consistent

Read on every side and found to agree, so not filed (each a check a later round need not repeat unless its text moves):

* **The host channel, three ways.** V9 §2.10 declares `ClerkMount.host` (`config`, `onConfig`, `needsToken`,
  `refused('origin')`, `proposals`, `answer(id, status, seqs?)`); V08 §3.1 step 7 (a) fills each member with the message
  BCR-V10-7 names; V10 §2.6's "The bridge, through the mount only", §2.11, §3.17 – §3.19 call exactly those members, and
  T-V10-20's source scan forbids a bridge import in `@plat/clerk`. `clerkMode` is `'off'|'builtin'|'host'` in V9 §2.2,
  V10 §3.17 and BCR-V10-7, `off` before the first `clerk.config` in all three.
* **The host projection.** BCR-V10-7 (c), V10 §3.17's table, V08 §5.4 (3) and T-V8-27 / T-V10-20 name the same kinds, the
  same preview reply and the same three refused kinds; V08's "refused `E_HOST_KIND`" reads as BCR-V10-7 (c)'s reply form.
* **The knowledge rule's reading.** BCR-V9-23's `viewAs`, BCR-V10-22's `Admission` and BCR-V9-14's `ExportOpts.knowledge`
  are one union with one reading (what both keys admit); V9 §2.10's `effectiveKey()` states it once and V10 §2.3 cites it.
  The two consent rules — the application's own dry runs at the role's key (J-V9.86), the clerk's card filtered at the
  effective key with an unfiltered re-preview at Accept (V10 §3.12 (4), (7), §4.2 (1)) — are each decided and each cite
  the other, so they are a design split, not a contradiction.
* **The tool vocabulary.** A point drop and `where.at` write the same `placeAt { plot: '', from: { points } }`; a locus
  drop and `where.locus` the same one-line `roster` with `name: ''` when unnamed (BCR-V9-35, BCR-V10-23, file f items
  570 – 571); a taken deck slot bends as the canvas's drop does (V10 §4.1 `where.slot`, V9 §4.20.4 (1), (3)); V10 §3.1's
  five entries have their callers (V9 §4.11, §5.8, §5.9, §3.12, T7), apart from SR2-13's choice.
* **The preview protocol.** `ProposalView`'s `accepted`, `rebuild` and `actions` match V9 §4.11's buttons, the host card
  is `accept`/`drop`/`why` on both sides, and "the drawer closes on either" matches "the card closes once answered".
* **The host header.** `host.action`'s seven actions, V08 §4.2's rows and T-V8-47 agree; `host.action` and `host.state`
  address no dossier change, so §11.3's *One way* paragraph holds (PLAUSIBLE: BCR-V8-1 does not say so in words, as
  BCR-V10-7 does for its messages).

## 3 Issues

Severity: **blocker** (breaks an owner ruling), **major** (a contradiction or an unwired piece a builder would hit),
**minor** (wording, a restatement, a type left loose). Each names one owning volume and the exact change (J-SS1.1: a fix
that needs a second volume's sentence is a separate issue for that volume).

### 3.1 The host seam — what the frame shows for the host

**SR2-01 · major · V09 · unwired (the history panel has no host input).** V08 §4.6 (round 2) lists in the frame's
history panel the DM's reveals and hides ("Revealed to the party: the Tanners' Hall") and the time the party pictures
were last drawn, read from `host.state` (V08 §3.1 step 7 (c)). V09's history panel lists `HistoryRow`s only, "derived
from the log on demand" (V9 §2.8, §4.10), and a reveal is no log event (it writes `MapRecord.party`, V08 §4.3);
`HostSlots` — "the only places host mode changes the shell" (V9 §2.2) — has no slot through which a host adds lines. A
builder of either side has nowhere to put them. *Required change:* V9 §2.2's `HostSlots` gains `historyLines?: { list():
HostHistoryLine[]; onChange(h: () => void): () => void }` with `interface HostHistoryLine { at: number /* ms, when the
host's change reached this session */; text: MsgRef /* a host.* key with its slots */; targets: Id[] /* for Show; may be
empty */ }`; V9 §4.10 draws them as one group, "The party", at the head of the list under the **All** and
**SettlementForge** filters, newest first, each with **Show** when it has targets and no **Undo this** (a host line is not
an event; its undo is V08 §4.2's "Hide again" / "Reveal again"); the shell never persists them; §1b and §2.12 gain the
rows; T-V9-28's allowlist counts the group. V08's fill is SR2-03. (J-SS2.2.)

**SR2-02 · major · V09 · unwired (new documents in host mode).** V9 §3.9's **Re-run from here** (`rerunFrom`) and **Open
a copy from here** (`forkAt`), the clerk's `fork` and `rerun` actions (V10 §2.6's table) and a creation proposal accepted
"beside the current one" (`ClerkMount.openNewDocument`, V9 §4.11; V10 §4.2 (3)) each make a NEW document "opened in a
new tab of the app and added to the recent list". In host mode the local store is off (V9 §3.8 (6)), there is no recent
list and no app tab (the frame is SettlementForge's tab, V08 §3.1), one document is live per frame (V08 §3.1 step 6),
and V08 §5.1's list of host-mode differences — "exactly these points" — does not name them, so T-V9-28 requires them in
the frame. *Required change:* V9 §2.2's `HostSlots` gains `newDocuments: 'download' | 'off'` (required in host mode);
V9 §3.9, §4.10 and §4.11 read: with `'download'` each of those actions makes the new document, writes it with
`export(h, 'plat')` at the role's key to the user's device through the frame's download (V08 §5.4 (2): the user's
format, never the host's), releases it without opening it in the frame, and toasts "Saved a copy to your computer:
{file}. It does not follow {host}." (a new V09 row `info.copy.saved`); with `'off'` those controls are hidden (the history
and chronicle rows' buttons, the restore points' menu items, the clerk's `fork` and `rerun` buttons); in host mode
**Start a new map from this** (SR2-13) is hidden. T-V9-28 and T-V9-40 gain the host clauses. V08's setting is SR2-03.
(J-SS2.3.)

**SR2-03 · minor · V08 · companions of SR2-01 and SR2-02.** *Required change:* V08 §3.1 step 7 (b) fills the two slots:
`historyLines` from `host.state` — a line per reveal or hide, the difference between two successive `party` values
(`host.revealed` "Revealed to the party: {places}", `host.hidden` "Hidden from the party again: {places}"), and one line
`host.picturesDrawn` "Party pictures last drawn {time}" from `partyPicturesAt`, replaced on each change;
`newDocuments: 'download'` (a copy of a dossier-bound document is detached, V06 §4.4: "It does not follow
SettlementForge"). V08 §4.6 cites the slot for its reveal lines; §5.1's differences list gains "a new document (a copy,
a re-run) is saved to the user's device, never opened in the frame"; §13 X12 lists the three new `host.*` keys; T-V8-47
asserts both slots.

**SR2-04 · minor · V08 · a control with no route, and a control twice.** V08 §5.1's `upgrade-available` banner row
offers "a button that focuses the frame's dialog", but that banner is drawn by SettlementForge outside the frame and no
host → PLAT message or `MapSession` call reaches a dialog inside it (BCR-V8-1, V08 §2.2). V08 §4.2's "Keep the saved
town" is a header control for what V9 §3.14 already shows the owner at load — the load-mismatch choice, `error.mismatch`'s
**Keep saved** · **Use rebuilt** (V9 §4.3's `rebase` binding) — so the frame would carry two controls for one event.
*Required change:* the banner row reads "A newer map engine is available — use Update in the map's header", with no
button (J-V8.35); §4.2's "Keep the saved town" row reads "V9 §3.14's load-mismatch choice, which the shell shows the
owner at load — no header control; after its keep commits the `rebase` through `doc.changed`, the client sends
`doc.snapshot`"; T-V8-47's header list drops it.

**SR2-05 · minor · V10 · a sentence the host contradicts.** V10 §3.17's "**Roles and keys** are the host's, as for any
client (§11.3): a player's session holds a viewer role and the party's key, so its clerk (any configuration) reads what
the party knows and cannot preview" contradicts V08 §3.14 and BCR-V8-27: a SettlementForge player has no document, no
session and no frame, and the party key is a display filter or an admission, never a session's key (J-V8.87).
*Required change:* "…as for any client (§11.3): a generic host's viewer session holds the viewer role and the key the
host gives it, so its clerk reads what that key admits and cannot preview (§11.2); SettlementForge mounts no viewer
frame, and a player's assistant reads the stored party gazetteer on SettlementForge's side (V08 §3.14, §4.4 (1))."

### 3.2 The knowledge rule

**SR2-06 · major · V08 · one bridge field, two types.** BCR-V9-14 (as amended in V09's round 2) makes
`ExportOpts.knowledge` "a tier, or a key form `{ tier, places }` — the union of `ViewOpts.viewAs`", read as BCR-V10-22
reads it, and says "the bridge's `export.request` carries the same field, BCR-V8-1". V08's BCR-V8-1 and §2.2 declare
`export.request { …, knowledge?: { tier: 'public'|'local'; places?: string[] } }`, and `MapSession.exportPicture` takes
the same: no bare tier, and an optional `places` that reads two ways under BCR-V10-22 ("a tier given alone is read with
the caller key's places" versus "a key form is a key in its own right"). `@plat/api`'s bridge schema is generated once
(BCR-V8-3), so the two texts give one field two types. *Required change:* BCR-V8-1's `export.request` reads
`knowledge?: Admission` (BCR-V10-22's type — BCR-V9-14's union — with its reading: lowering only, a tier read with the
requester's places, a key form a key in its own right); V08 §2.2's comment and `MapSession.exportPicture`'s `knowledge`
follow; V08 §3.14 (1)'s party renders pass the resolved party key as the key form `{ tier, places }`, `places` always
present (possibly empty).

**SR2-07 · major · V08 · unwired (the party gazetteer's key).** V08 §3.14 (2) (c) builds the party gazetteer from
"`query` `gazetteer` and `people` answers under the same key" — the party key — in "an editing session or the refresh
frame" (V08 §1b; BCR-V8-27), both of which hold the role's `secret` key (§11.3; the refresh frame loads as the DM,
V08 §3.4). The export's `knowledge` lowers pictures only; the one mechanism that lowers a `query` is BCR-V10-22's
`admitAs`, which V08 never names (no occurrence in the volume). A builder queries at `secret` and stores secret names in
what players read; T-V8-17 would fail with no mechanism to pass it. *Required change:* V08 §3.14 (2) (c) reads
"`query(h, { kind: 'gazetteer' | 'people', … }, { admitAs: the party key resolved as in (1), in BCR-V10-22's key form })`,
band-less, so admitted as at the city band (§11.2)"; §1b's party-set row names `admitAs` and BCR-V10-22; T-V8-17 gains
"every `gazetteer` and `people` query of the render carries that `admitAs`".

**SR2-08 · major · V10 · the key form reaches the live session but not the stored one.** Round 2 made the effective key
a key form (`{ tier, places }`; BCR-V9-23, BCR-V10-22, J-V10.90), but a stored transcript records a tier only —
`ClerkTranscript.tier` (V10 §2.7), "listed and opened only for a session whose key is at least that tier" (V10 §3.12 (8),
§5.3; J-V10.67). A transcript made while the DM's players' view is on (a `public` or `local` form carrying revealed
places), or under a host-set viewer key, names places above its tier; with **Keep history** on, a later session on the
same device at that tier without those places lists and opens it. Separately, V10 §3.12 (6) sorts a key change into
raised or lowered, which a change between two key forms (or a tier and a form) can be neither. *Required change:*
`ClerkTranscript` version 3 records `key: Admission` (the effective key it was made under, BCR-V10-22's form) in place
of `tier`; it is listed and opened only when the session's effective key admits everything that key admits (its tier at
least that tier and, below `secret`, its places a superset); a version-2 transcript below `secret` is listed only to a
`secret` session (its places were not recorded), a version-1 as today; §5.3's export records the same `key`; §3.12 (6)
adds "a change that does not only add to what the key admits counts as lowered"; T-V10-6 gains "a transcript made under
`{ tier: 'public', places: [p] }` is not listed to a `{ tier: 'public', places: [] }` session"; J-V10.67 is revised.

**SR2-09 · minor · V08 · a restated rule in its superseded wording; stale status.** V08 §3.14 (5) says the frame "draws,
labels and reads as the lower of its key and the party key, the party's places replacing the key's (V9 §4.8)" — round
1's SR-06 wording, which V10's 05:03 note and V09's round 2 replaced by the both-keys reading (V9 §2.10's
`effectiveKey()`; BCR-V9-23 "admit exactly what both … admit"); the frame's key is `secret`, so the result agrees today,
but the sentence restates a rule V09 owns. V08 §12's round-2 paragraph still says reconcile-V09-r2 "has not yet landed",
and §13 X15 stays open, though V09 landed at 05:16 with every companion X15 lists (read this round). *Required change:*
§3.14 (5) reads "…a display filter, under which the frame draws, labels and reads what both its key and the party key
admit (V9 §2.10's `effectiveKey()`, BCR-V9-23)"; §12's sentence reads "read in V09 as landed (reconcile-V09-r2,
05:16)"; X15 is marked CLOSED.

### 3.3 The tool vocabulary and the drawer

**SR2-10 · major · V10 · unwired (XV-V9-19 (b) unwritten — SR-10's other half).** V10 §3.16's `dossier` row and §4.1's
`where.locus` row offer "the same place on the first `sites` candidate that satisfies its locus" without saying which
query; V9 §4.5's T6 row fixes it (J-V9.88) — `query({ kind: 'sites', cls, near: target.anchor, district: rel === 'in' ?
target.id : undefined, k: 3 }, { admitAs })`, the first candidate with no `hardFails` — and T-V9-13 requires the
canvas's **Put it at {site}** to name "the plot the clerk's `dossier` alternative names for the same locus". A builder of
V10, holding the base and V10 alone (§17.1), picks his own query and T-V9-13 fails. *Required change:* both V10 rows read
"…and the same place on the first candidate with no `hardFails` of `query({ kind: 'sites', cls, near: the locus target's
EntityCard.anchor, district: the target's id when the locus is `in` a quarter, k: 3 }, { admitAs: the session key })` —
V9 §4.5's query, one text for canvas and clerk (XV-V9-19 (b)) — encoded as `where.plot`; when no candidate is free of hard
fails, that alternative is not offered and the unplaced elements remain"; T-V10-4 gains "on a dossier-bound fixture the
`dossier` alternative of a place by a locus names the plot T-V9-13's **Put it at {site}** names".

**SR2-11 · minor · V09 · the no-candidate case.** V9 §4.5's T6 row offers **Put it at {site}** on "the first candidate
with no `hardFails`" and T-V9-13 asserts it previews `ok`; neither says what the card shows when none of the three is
free of hard fails. *Required change:* the T6 row adds "when none is, **Put it at {site}** is not shown and the element
picker stays — one rule with V10's `dossier` alternative (SR2-10)"; T-V9-13 gains that case.

**SR2-12 · minor · V10 · one refusal, two sentences.** V10 §3.16's `dossier` row renders one template — "SettlementForge
sets {name}; the map can move it, but not {verb} it." — for every dossier-owned refusal, "a roster line or a place by a
locus that names no element" included, where there is no element to name and nothing is moved or renamed; the canvas
renders the same engine refusal as `refuse.roster.dossier` (V9 §4.9; J-V9.88). *Required change:* the row's roster and
locus case renders V09's `refuse.roster.dossier` (its text written once, in V09's catalogue, J-V9.79); the other cases
keep the row's template; V10's catalogue row in §1b lists the key.

**SR2-13 · major · V09 · unwired (a choice the clerk reads that no control makes).** V10 §3.1 (4) enters creation mode
"when the user chose 'start a new map from this' in the drawer", and both V10 §4.2 (3) and V9 §4.11's creation preview
build the path that follows ("otherwise the new document opens beside the current one", `ClerkMount.openNewDocument`).
V09's drawer has no such control (its menu: New topic, How do I …?, What the assistant sees, Copy conversation, Save
these changes as a skeleton), and `ClerkHandle.send(text, entry?, attach?)` has no way to carry the choice, so the
harness never learns it and the "beside" path cannot be reached. *Required change:* V9 §4.11's drawer menu gains **Start
a new map from this** (standalone only; hidden in host mode, SR2-02), which puts the message box in creation mode for
its next message under the line "Describe the new town — this one stays as it is"; V9 §2.10's `send` gains
`attach.newMap?: true`, which V10 §3.1 (4) reads as the choice (SR2-17 (d)); T-V9-40 gains the clause (the proposal
previews as a creation proposal and Accept opens the new document beside the current one). (J-SS2.4.)

### 3.4 The preview protocol

**SR2-14 · major · V09 · unwired across the dependency rule (the rebuild's events).** V10 §4.3, §2.6's `rebuild` comment
and §1b.1 say the harness "reads the history row's 'Build it again' events" (V9 §4.20.3 (4): "the one source of volume
10's `rebuild` action's events"), but `HistoryRow` is the application's derived state (V9 §2.8), `@plat/clerk` may import
nothing of `@plat/app` (V10 §2.1: `… ← api ← clerk ← app`), and `ClerkMount` (V9 §2.10) has no member that hands the
harness those events. A builder of the harness cannot build **Put it back** without re-implementing V09's rule.
*Required change:* V9 §2.10's `ClerkMount` gains `rebuildEvents(seq: number): Promise<WithoutBase<EditEvent>[]>` — for
the removal group whose first seq is `seq`, the "Build it again" events of each of its `delete`s by V9 §4.20.3 (4), built
from BCR-V9-34's `entity` answers on the tombstoned ids — the one implementation, which the history row's **Build it
again** also calls; §1b's `ClerkMount` row names it; the removal bar (T-V9-53) asserts that the history row and the
mount give byte-equal events. V10's citation is SR2-17 (c). (J-SS2.1.)

**SR2-15 · minor · V09 · a list the base widened.** V9 §4.20.3 (2) lists the generated content a plain `delete` removes
and suppresses — "a raised way…, a harbour-mouth chain, a quay wall, a floating island, a sky access" — but file f item
260 (J-VI.14 as amended) also suppresses a generated retaining wall and a generated deck plot (`suppress.kind`
`'retaining' | 'deckPlot'`), which V08 §4.3 and V10's `hold remove` treat as removable. *Required change:* V9 §4.20.3 (2)
cites file f item 260's kinds (raised way, harbour-mouth chain, quay wall, retaining wall, deck plot; islands and sky
accesses by volume 5's record form) in place of its own list; T-V9-53's fixture adds a generated retaining wall and a
deck plot.

**SR2-16 · minor · V08 · a removal with no key.** V08 §4.1 and §4.3 name a generated "terrace" among the item-110 content
a delete removes and whose removal holds, but no suppression key exists for a terrace (file f item 260: `'raised' |
'harbourChain' | 'quayWall' | 'retaining' | 'deckPlot'`; J-VI.14) and no `delete` targets one (a terrace is a flatten
stroke with its retaining walls, V10 §4.1's `terrace` row). *Required change:* both sentences read "a raised way, a
retaining wall (a generated terrace's walls among them) or a deck plot".

### 3.5 Companions and single sources

**SR2-17 · minor · V10 · companions and stale lines.** *Required change:* (a) XV-V9-19 (a): V10 §2.6's dispatch table
notes under `propose` "the one exception is V9 §3.12's skeleton import dialog, which runs a finding's `propose` fix itself
as the user's declaration, clerk or none (J-V9.90); no application-run `propose` reaches `run`, so T-V10-44 holds
unchanged". (b) XV-V9-19 (c): BCR-V10-22's last sentence reads "…a client that speaks for a view passes the view's
effective key as `admitAs` — the built-in clerk on its band-less reads and its dry runs, an application on its band-less
reads; an application's own dry runs, which its user confirms, stay at the role's key (volume 9 §2.7)". (c) SR2-14's
companion: V10 §4.3, §2.6's `rebuild` comment and the §1b rebuild rows read "the events `ClerkMount.rebuildEvents(seq)`
returns (V9 §2.10, by the rule of V9 §4.20.3 (4))". (d) SR2-13's companion: V10 §3.1 (4) reads "…or when the drawer's
**Start a new map from this** sent the message with `attach.newMap` (V9 §2.10, §4.11)". (e) CVR-V10-16's row ends at
"Met" (its trailing "until the coherence pass settles one" deleted); §12's bullet on V09's second round moves to
CONFIRMED (V9 §2.10 and BCR-V9-23 carry the both-keys reading, landed 05:16).

**SR2-18 · minor · V09 · the `host.*` rows named too narrowly; stale statuses.** V9 §4.9 says "Host-mode banners and the
port's notes are rows of the same file under `host.*`, their texts V08 §5.1's", but V08 routes more `host.*` keys there
(V08 §13 X12 as round 2 left it): the header controls' labels and undo words (V08 §4.2), the strip's **Show everything**
(V08 §5.1), `host.locked` ("Set by {host}", `HostSlots.lockedControls`' reason, V08 §3.1 step 7 (b)), the draft mirror's
discard notice, and SR2-03's lines; V9 §5.12's "Set by {host}" for the Assistant section's forced fields names no key.
V9 §10.2's XV-V9-20 and §12's "that V08 and V10 adopt XV-V9-19 and XV-V9-20" are open though V08 met XV-V9-20 in its
round 2. *Required change:* V9 §4.9's sentence reads "every `host.*` key volume 8 names (V08 §13 X12: §4.2's controls
and undo words, §5.1's strips and banner rows, `host.locked`, the port's notes, V08 §4.6's history lines), their texts
volume 8's"; V9 §5.12's forced fields use `host.locked`; XV-V9-20 is marked met (V08 §3.1 step 7 (b), (c), §3.14 (5));
§12's sentence keeps XV-V9-19 open until volume 10 writes SR2-10 and SR2-17.

**SR2-19 · minor · BASE-F · *Needed by* after round 2.** File f's rule — "*Needed by* lists the requesting volume and
every volume whose text cites the request" — now reads short for three items. *Required change:* item 464 (BCR-V9-23):
"V08, V09, V10" (V08 §2.2, §3.1 step 7 (c), §3.14 (5); V10 §1b.1, T-V10-6); item 453 (BCR-V9-14): "V08, V09" once
SR2-06 gives V08's `export.request` its union; item 572 (BCR-V10-22): "V08, V09, V10" once SR2-07 has V08 pass
`admitAs`; item 472 (BCR-V8-1) gains the *Note* "its `export.request.knowledge` is BCR-V9-14's union (item 453, applied
before it): one field, one type".

## 4 Disposition summary by owning volume

| owner | blocker | major | minor | ids |
|---|---|---|---|---|
| V08 | 0 | 2 | 4 | SR2-06, SR2-07; SR2-03, SR2-04, SR2-09, SR2-16 |
| V09 | 0 | 4 | 3 | SR2-01, SR2-02, SR2-13, SR2-14; SR2-11, SR2-15, SR2-18 |
| V10 | 0 | 2 | 3 | SR2-08, SR2-10; SR2-05, SR2-12, SR2-17 |
| BASE-F | 0 | 0 | 1 | SR2-19 |

Totals: 0 blockers, 8 majors, 11 minors (19). Round 1's 21 issues: all FIXED. Of the 19, nine are round 1's residues
(a counterpart written by one lane after the other landed, or a defect beside a fix: SR2-03, -04, -06, -09, -10, -11,
-14, -17, -19) and ten are new: two made by round 2's own repairs (SR2-01 — V08 §4.6's reveal lines, added with
`host.state`; SR2-08 — the key form reaching the live session but not the stored transcript) and eight in text the
earlier rounds read without filing (SR2-02, -05, -07, -12, -13, -15, -16, -18).
Order of work: V09 first (its four majors add slots and a mount member the others cite), then V08 and V10, then file f.

## 5 Decisions of this check (vetoable)

| id | decision |
|---|---|
| J-SS2.1 | chose a `ClerkMount.rebuildEvents` member, one implementation in the application that the history row and the harness both call, over the harness rebuilding the events from the tombstone itself, because V9 §4.20.3 (4) is declared the one source of those events, and two implementations of one rule drift (SR2-14) |
| J-SS2.2 | chose a separate `HostSlots.historyLines` list, drawn as its own group, over folding host lines into `HistoryRow`, because `HistoryRow` is derived from the log alone (V9 §2.8) and a reveal is no log event; the group keeps the log's rows, filters and undo untouched (SR2-01) |
| J-SS2.3 | chose, for new documents in host mode, a `'download'` setting that saves the new `.plat` to the user's device, over hiding the actions or giving the host a store operation for copies, because the owner's "everything editable" keeps a past state reachable, `.plat` is already the user's format in host mode (V08 §5.4 (2)), the frame holds one live document (V08 §3.1 step 6), and a host-side copy would be a new capability across the SettlementForge boundary; `'off'` stays for a host that wants none (SR2-02) |
| J-SS2.4 | chose to give "Start a new map from this" its control and an `attach.newMap` flag over deleting V10's clause and V09's "beside" path, because both volumes built that path and the owner's "everything editable" favours starting a new town without losing the current one (SR2-13) |
| J-SS2.5 | chose, for a version-2 transcript below `secret`, to list it only to a `secret` session over reading it as a tier with no places, because its places were not recorded and the rule must err toward hiding (J-A30.82) (SR2-08) |
| J-SS2.6 | kept J-SS1.1 (one owner per issue) and bundled each volume's pure companion citations into one minor per volume (SR2-03, SR2-17), because a reconciliation lane reads its own rows and one bundle per volume keeps the count honest |

## 6 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (each located in the live text on both sides; quoted phrases copied from the files read this round):
SR2-01 – SR2-19; the §1 re-check of SR-01 – SR-21; the §2 agreements, except the one marked PLAUSIBLE there. The
changes since round 1 were established by an executed `diff` against backups whose md5 equals round 1's inputs
(`16a16491…`, `ed19f693…`, `f6549c4a…`, `40e2f8d6…`); the absence claims (no `admitAs` in V08; no host-lines slot, no
new-document setting and no rebuild member in V9 §2.2 and §2.10; no "start a new map" control in V09) by `grep` over the
current files.

**PLAUSIBLE:** that the sections listed in §0 as not re-read hold no further seam defect (round 0 or 1 read them and
neither diff touched them); that `host.action` and `host.state` leave §11.3's *One way* paragraph intact (they address no
dossier change, but BCR-V8-1 does not say so in words); and that the required changes of SR2-02 and SR2-13 need no
re-pricing (each is a slot, a flag or a menu item on an existing flow).

## 7 Continuation — why, inputs, method and coverage (2026-09-29, re-issued brief)

**Why a continuation.** The workflow re-issued this lane. Its brief — re-check every issue the previous round raised
(`seam-surfaces-r1.md`), then sweep the whole seam — now covers a wider set than the 05:34 landing did: round 1 gained its
continuation SR-22 – SR-36 at 09:15, fixed by the second briefs of reconcile-V08-r2 (09:33), reconcile-V10-r2 (09:33),
reconcile-V09-r2 (09:49) and the continuation of reconcile-BASE-F-r2 (09:27). SR-01 – SR-21 and this file's §1 – §6
(SR2-01 – SR2-19) are history — re-checked by round 3 and by round 1's continuation — and are not redone (J-SS2.7). New
findings are numbered on from SR2-20.

**Inputs** (md5 at the continuation's start; snapshots in `scratchpad/volumes/surfr2b/`): V09 `4d08c4fa…` (4 472 lines),
V10 `e737f403…` (3 579), V08 `a2bdf6d3…` (3 521), `_integrate.md` `965ab696…` (468, unchanged since round 1's
continuation), file f `ae1bb8ca…` (1 442), the base `docs/ARCHITECTURE.md` `01fea21f…` (unchanged). V10's md5 differs from
reconcile-V10-r2's landed `5f29725e…` by reconcile-V11-r2's two shared-file edits (SCC-R1C-3: V10 §2.10's default-rows
heading and the lexicon heading), read in the diff and outside this seam.

**Method.** (1) Each of SR-22 – SR-36 re-read on both sides in the live text: the owner's fix located, then every sentence
across the seam that the fix touches. (2) The sweep read whole every change since the last completed surfaces sweep —
round 1's continuation inputs (V09 `94ce6753…`, V10 `2bcc431b…`, V08 `3d6de46b…`, file f `1d04dca0…`), whose snapshots in
`surfr1b/` match those md5s — as one diff per file: V09 301 lines, V10 207, V08 179, file f 115, `_integrate.md` none
(about 160 KB). (3) Every seam term a changed hunk introduced was followed into the other two volumes, the base and
file f by a census (`surfr2b/census1.txt`: 22 terms across the five files), then read in context. Read whole in the live
text: V9 §2.2, §2.8, §2.9, §2.10, §4.10, §5.7, the T9, T11 and T12 rows of §4.3 and §4.5, §4.17.4's new paragraph,
BCR-V9-12, BCR-V9-22, BCR-V9-36, T-V9-12, -13, -15, -38, -68, -69, XV-V9-24 – -28; V10 §2.13's `ClerkQuery` and
`MapBrief.salts`, §3.5 step 3, §3.16's *The dry run's bends*, §4.1's T9, T11 and T12 rows, BCR-V10-1, CVR-V10-3, -14,
-17, -18, T-V10-1, -4, -8, -25, §12, §13; V08 §3.1 step 7 whole, §3.6 whole, §4.6 whole, §5.2's `CustomChainRecord` row,
BCR-V8-8, BCR-V8-15, T-V8-14, -25, -45, -47, §12's continuation paragraph, §13 X12 and X18; file f's header rules and
items 372, 390, 410, 453, 463, 464, 467, 468, 472, 473, 570 – 572, 582 and its *Reconciliation round 2 — continuation*;
the base's §5.4 (`GenerationReport`, `ReportEntry`), §6.1's salt rule and concern registry, §7.1's `rerollLayer` event
and toolkit row, §7.7's `absorbed` week.

## 8 Re-check of round 1's continuation (SR-22 – SR-36)

All fifteen are fixed in the text their owners were asked to change. Seven left a residue across the seam or a new defect
beside the fix; each is filed in §9 with its own id.

| id | owner | state now | residue filed |
|---|---|---|---|
| SR-22 | V09 | FIXED — V9 §2.8's `HistoryRow.lines` and `.dossierGroup`; V9 §4.10's `dossierFacts` absorb and creation rows, the dossier-event row's report-entry lines and *The dossier groups* (membership by the port's `host:port` session, J-V9.107, which agrees with V08 §3.6 step 6's "no `group`"); `report.moved.<kind>`, `report.dossier.<state>`, `history.dossierFacts.creation`; V9 §5.7; T-V9-69; BCR-V9-36 | SR2-20 (BCR-V9-36 is in no file f item); SR2-24 (b)–(e) (V08 §4.6's sentences and X18 after V09 landed); SR2-27 (the new lines' address arguments at the role's key) |
| SR-23 | V08 | FIXED — BCR-V8-8's §5.4 `GenerationReport.dossierNotes`; V08 §4.6 *The standing notes*, §1b, §2.7, T-V8-14, SF3; V9 §5.7 reads it | SR2-29 (file f item 390's "Also touches" and *Needed by*) |
| SR-24 | V08 | FIXED — V08 §4.6 item 2 and *The standing notes* at the view's effective key; T-V8-14's clause | SR2-23 (J-V8.106, found beside it, subscribes to a member the handler is never given) |
| SR-25 | V08 | FIXED — V08 §5.2's row with its **Knowledge** rule (drawn, labelled, listed and exported only when the key admits every joined node), BCR-V8-15's three clauses, §1b, T-V8-25, SF4, J-V8.103, J-V8.105; V9 §5.4 and T-V9-68 agree | SR2-29 (file f item 410's "Also touches" and *Needed by*) |
| SR-26 | V10 | FIXED — `NameInput.newNames` in three forms, `restyle` a display re-roll, `MapBrief.salts` (BCR-V10-1's parenthesis), T-V10-4, -8, -25, J-V10.95, -96 | SR2-25 (a), (b), (d) (CVR-V10-18's status; the quarter scope in V10's own words; `restyle.concern` typed as `string`) |
| SR-27 | V09 | FIXED — a way's `split` and `merge` on T9 (V9 §4.3, §4.5), T4's row without them, the mapper citing V10 §4.1's centre-line rule, J-V9.104 extended, T-V9-12 | — |
| SR-28 | V10 | FIXED — `ShapeInput.split { through } \| { at }`, `join` by the target's registry kind (`merge` on a way), J-V10.97, T-V10-1, -4 | — |
| SR-29 | V09 | FIXED — T11's three scopes with their bytes (the quarter read at `effectiveKey()`, J-V9.110, as CVR-V10-18 (a) asked), **New emblem** and a new **New compass** at the concern's salt + 1 | SR2-26 (the two other rerollable concerns still have no control on either surface) |
| SR-30 | V09 | FIXED — `refuse.assignment.noSite` with **Put it at {site}** (J-V9.111) and **Show me why**, IN-V09-16, T-V9-13, -15; V10's `rule` row renders it with no change (V10 §3.5 step 3) | — |
| SR-31 | V10 | FIXED — "Draw a road to its foot" in §3.16 and IN-V10-1 | — |
| SR-32 | BASE-F | FIXED — item 372's note takes BCR-V9-22's four rungs, no F-EDIT | SR2-21 (the note pins the request to reconcile-V09-r1's reading, which reconcile-V09-r2 then widened) |
| SR-33 | V10 | FIXED — CVR-V10-3, -17 **Met**, CVR-V10-14's V08 part met, §13's sentence replaced | — |
| SR-34 | V09 | FIXED — XV-V9-24 and XV-V9-26 **Met**, V9 §12's clauses moved | — |
| SR-35 | V09 | FIXED — V9 §4.15 cites `EntityCard.anchor`; V9 §5.4, §5.15, §1b and XV-V9-26 cite V08 §5.2's row | — |
| SR-36 | V09 | FIXED — `bend.under.accessOpening` without "Dig from a building instead"; **Use another building** by `PreviewResult.alternatives` and BCR-V9-22's grouped-access rule (J-V9.112), T-V9-38, XV-V9-27 | SR2-22 (V10 §3.16 still reads every bend's `alternatives` as plots); SR2-21 |

## 9 Sweep of every change since round 1's continuation inputs (SR2-20 onward)

Severity as in §3: **blocker** (breaks an owner ruling), **major** (a contradiction or an unwired piece a builder would
hit), **minor** (wording, a status, a restatement, a type left loose). One owning volume per issue (J-SS1.1); pure
companions of one volume are bundled into one minor for that volume (J-SS2.6).

### 9.1 The base change record

**SR2-20 · major · BASE-F · a base change request in no item.** reconcile-V09-r2's second brief (09:49) wrote
BCR-V9-36 — §11.2's `entity` query, as BCR-V10-1 adds it, gains the input `dossierKey?: string`, answered as the
`DossierBinding.rows` row's entity under `admitAs`, `null` when no row holds the key — and routed it to "the base record's
next reconciler" in its lane note; reconcile-BASE-F-r2's continuation had landed at 09:27, and its census (404 request ids,
all carried) predates the request. File f holds no occurrence of `BCR-V9-36` or `dossierKey`. The coherence pass would
leave the query without the input, and V9 §4.10's note lines, V9 §5.7's standing notes (both **Show** and the knowledge
drop) and T-V9-69 would have no base read; V08 §4.6 item 2's "each resolved through the binding table to its address"
would have no mechanism. *Required change:* file f gains item 583 in §11.2's run, placed after item 468: "**583.**
BCR-V9-36 (V09 §10) — an entity by its binding key (SR-22; J-V9.108). *Note:* applied after item 468 (BCR-V10-1, which
adds the `entity` member from volume 10 §2.13's `ClerkQuery`) and item 467 (BCR-V9-34, the same member's tombstone
answer), on the same member: its input reads `id`, `at`, `layer`, `below` and `dossierKey`. *Needed by:* V08, V09, V10
(V08 §4.6 item 2 and V08 §3.1 step 7 (b) once SR2-24 cites it; V10 §2.13 once SR2-25 (c) lands). **STAGED
(SettlementForge stage, SF0 to SF7), with volume 9's AP5b (T-V9-69).**"

**SR2-21 · major · BASE-F · item 372's note applies an older reading of its request.** Item 372's note (SR-32's fix,
09:27) reads "applied as BCR-V9-22 reads after reconcile-V09-r1 (SS-35; J-V9.102)" and spells out the four rungs. At
09:49 reconcile-V09-r2 (SR-36; J-V9.112) gave BCR-V9-22 two more sentences — "With the dug access, the dry run lists in
`PreviewResult.alternatives` the further buildings the same rule qualifies, … at most three; and an
`addUndergroundAccess` without a `target`, grouped before a dwelling declaration on that cluster from one of those
buildings, takes as its target the cluster's element nearest in plan to the building's footprint" — and a second target,
`### 11.2`'s `PreviewResult.alternatives` comment "as BCR-V9-12 revises it". Applied as the note says, the pass writes the
r1 reading: the dry run lists no building, the grouped access has no target rule, and V9 §4.17.4's **Use another
building** (T-V9-38's three-building clause) has no base mechanism; the item has no "Also touches: §11.2" and no order
against item 463, whose consolidated text writes the `alternatives` comment. *Required change:* item 372's note reads
"applied as BCR-V9-22 reads after reconcile-V09-r2's second brief (SR-32, SR-36; J-V9.102, J-V9.112), no rung of its
ladder an F-EDIT (J-VI.4): [the four rungs as now]; with the dug access the dry run lists in `PreviewResult.alternatives`
the further buildings the same rule qualifies, in its order (plan distance, then address), at most three, and an
`addUndergroundAccess` with no `target`, grouped before a dwelling declaration on the cluster from one of those buildings,
targets the cluster's element nearest in plan to that building's footprint (ties by address)"; the item gains "Also
touches: §11.2 (`PreviewResult.alternatives`' comment), applied after item 463 (BCR-V9-12), which writes that comment";
*Needed by:* V09, V10 (V10 §3.16 once SR2-22 lands).

**SR2-29 · minor · BASE-F · two items whose requests grew a target.** V08's continuation note (its "For the coherence
pass" paragraph) names both; neither is written. Item 390 (BCR-V8-8) reads "*Needed by:* V08" with no "Also touches",
though BCR-V8-8 now also adds §5.4's `GenerationReport.dossierNotes` (SR-23) and V9 §1b and §5.7 cite it; item 410
(BCR-V8-15) reads "Also touches: §8.3, §11.1. *Needed by:* V08", though BCR-V8-15 now also rewrites §11.2's `gazetteer`
rows for `customChain` (SR-25) and V9 §1b, §5.4, §5.15 and XV-V9-26 cite it. *Required change:* item 390 gains "Also
touches: §5.4 (`GenerationReport.dossierNotes`; SR-23)" and reads "*Needed by:* V08, V09"; item 410 reads "Also touches:
§8.3, §11.1, §11.2 (the `gazetteer` query's `customChain` rows, listed only when the key admits every joined node;
SR-25). *Needed by:* V08, V09".

### 9.2 The preview protocol

**SR2-22 · major · V10 · the bends' alternatives read as plots where the base now lists buildings.** V10 §3.16's *The
dry run's bends* turns every bend's alternatives into `propose` actions "(the preview's `alternatives` plots, BCR-V9-12,
as `placeAt { plot, designation }` by V10 §4.1's `where.plot` row; …)", and V10 §3.5 step 3 maps a bent answer the same
way. Since reconcile-V09-r2 (SR-36; BCR-V9-22's new sentences; J-V9.112) a dwelling closure bent to a dug access
(`bend.under.accessDug`) fills `PreviewResult.alternatives` with **buildings**, and V9 §4.17.4's **Use another
building** commits the group `[addUndergroundAccess { building: that building }, the declaration]`, the access with no
`target`. A builder of the clerk, holding the base and V10, encodes those building ids as `placeAt` plots: the dry run
refuses or misplaces them, and the card's alternative is not the canvas's button, byte for byte (T101-3). V09's note
("its §3.16 carries **Use another building** as a `propose` with the events above … with no change there") is not
borne out by V10's text, which has no occurrence of "Use another building". *Required change:* V10 §3.16's parenthesis
reads "(the preview's `alternatives`: for a placement bend, plots (BCR-V9-12), each `placeAt { plot, designation }` by
V10 §4.1's `where.plot` row; for `bend.under.accessDug`, the further qualifying buildings (BCR-V9-22 as reconcile-V09-r2
widened it), each a `propose` of the group `[addUndergroundAccess { building: that building }, the declaration]` with
no `target` on the access, so BCR-V9-22's grouped-access rule sets it — the bytes of V9 §4.17.4's **Use another
building**, at most three, in the dry run's order; 'Draw a road to its foot' …)"; V10 §3.5 step 3 cites it; T-V10-4 gains
"on T-V9-38's three-building fixture, the clerk's alternatives for a dwelling declaration on the cluster give, for each
listed building, the events V09's **Use another building** commits for it, byte for byte".

### 9.3 The host seam and the knowledge rule

**SR2-23 · major · V09 · unwired (the host's lines cannot reach the effective key).** V08's continuation (J-V8.106, found
beside SR-24) has the embed's bridge handler name and target only the places "the view's effective key admits" in
`HostSlots.historyLines`, and says "the handler re-makes the list and fires `onChange` when `onEffectiveKey` fires (V9
§2.10)"; T-V8-47 asserts it under "See what the players see". But `effectiveKey` and `onEffectiveKey` are members of
`ClerkMount` — "what the shell hands the harness" — and V9 §2.10 says the shell "computes it once per view and hands
the same function to the clerk slot"; the handler fills `ClerkMount.host` and `HostSlots` (V08 §3.1 step 7 (a), (b)) and
is handed neither member. The View as menu is the user's, so the handler cannot learn of its changes either. A builder of
the embed must reach into the shell or compute a second effective key, which V9 §2.10's "the shell's one computation of
it" forbids. *Required change:* V9 §2.2's `HostSlots.historyLines` reads `{ list(key: ViewState['knowledge']):
HostHistoryLine[]; onChange(h: () => void): () => void }` with the comment "the shell calls `list(effectiveKey())` (V9
§2.10) each time it draws the group; the provider names and targets only the places that key admits"; V9 §4.10's
host-lines paragraph reads "…and re-lists them, with `effectiveKey()`, on each `onChange` and each `onEffectiveKey`";
T-V9-28's host clause gains "a View as change re-lists the host lines with the new key". V08's side is SR2-24 (a).
(J-SS2.8.)

**SR2-24 · minor · V08 · companions and sentences after V09 landed.** *Required change:* (a) SR2-23's companion: V08
§3.1 step 7 (b)'s party lines read "`{places}` the names of the places the key `list` is called with admits (V9 §2.2;
the shell passes `effectiveKey()`), each read by `query({ kind: 'entity', dossierKey } | { kind: 'entity', id }, {
admitAs: that key })` (BCR-V9-36, BCR-V10-22) — a place answered `withheld` neither named nor targeted, one answered
`null` named by its key with no target, a line left with no place not listed; the handler keeps no subscription of its
own" in place of "…re-makes the list and fires `onChange` when `onEffectiveKey` fires"; J-V8.106 and T-V8-47's clause
follow. (b) V08 §4.6 item 3's "read from the epoch's raised-way outcomes (BCR-V10-21's `raisedOutcome` over V06's
`RaisedWayLedger`)" contradicts the read V09 chose (J-V9.113: V06's `EpochReport.raised.suppressedFired`, XV-V9-28,
rejecting a `raisedOutcome` read per removed way); it reads "drawn as V9 §4.10's `epoch` row's line, from V06's
`EpochReport.raised.suppressedFired` (V9 XV-V9-28; J-V9.113)". (c) §4.6's opening "the words are written once, in this
section's tables, in V10 §3.9 or in V06's chronicle templates" gains "or in V9 §4.9's rows (`history.dossierFacts.creation`,
`report.moved.<kind>`, `report.dossier.<state>`; J-V9.109)", and item 1's "worded as V9 §5.7's 'What moved' entries"
reads "each by V9 §4.9's `report.moved.<kind>` row". (d) The absorb group's "the events that carry the same absorb (V08
§3.6)" reads "the port's `host:port` events after it, up to the next ledger event or another session's event (V08 §3.6
step 6; V9 §4.10's dossier groups, J-V9.107)". (e) X18 is marked **CLOSED** (V9 §2.8, §4.10, §5.4, §5.7, §10.2's
XV-V9-26; reconcile-V09-r2 landed 09:49), and §12's PLAUSIBLE "that V09's continuation adopts SR-22's history rows …"
moves to CONFIRMED.

**SR2-27 · minor · V09 · the new lines' names read at the role's key.** V9 §4.10's report-entry lines give "its
addresses as `{ id }` arguments, which the engine renders under the caller's key (V9 §2.9)", and V9 §5.7's "What moved"
and placement rows are rendered the same way. The caller is the application's `DocHandle`, at the role's key; V9 §2.7's
"Every band-less read speaks for its view" and V9 §4.8 require every panel to read at the view's effective key. Under
View as — or V08's "See what the players see" — the absorb group and the report panel would name a `secret` element in
a report-entry line while its note line beside it is dropped (V08 §4.6 item 2). *Required change:* V9 §4.10's
report-entry lines, and V9 §5.7's "What moved" and `report.dossier.<state>` rows, render their `{ id }` arguments under
`effectiveKey()` by V9 §2.7's band-less rule (an `entity` read with that `admitAs`; a withheld address as its
`kind.<registry kind>` word), re-rendered when `onEffectiveKey` fires, never at the role's key; T-V9-69's View as clause
gains "a report-entry line whose element is `secret` names it by its kind word".

### 9.4 The tool vocabulary

**SR2-25 · minor · V10 · statuses, one scope in its own words, two types.** *Required change:* (a) CVR-V10-18 is marked
**Met** (V9 §4.5's T11 row and J-V9.110 for (a), the T9 row citing V10 §4.1 for (b), address order for (c); reconcile-V09-r2
landed 09:49, V09 `4d08c4fa…`); T-V10-4's "the this-quarter case runs with View as off until V09 reads that scope at the
effective key, and with View as on after" reads "the this-quarter case runs with View as off and on"; §12's bullet "That
V09's T11 and T9 mappers write the bytes V10 §4.1 writes …" moves to CONFIRMED, T-V10-4 still deciding the bytes; §13's
"until it lands, T-V10-4 runs the this-quarter case with View as off" reads "it landed 09:49". (b) §4.1's `quarter` row
cites the scope rather than stating it — "the entities that row's this-quarter scope lists (J-SS1.8)", "that row" being
V09's — so a builder holding the base and V10 does not learn that V09 leaves out withheld rows; it reads "`ids` the quarter
and every `gazetteer` row not marked `withheld` whose district is the quarter, read with `admitAs` the session's
effective key (V10 §6.1's row), in address order — the scope V9 §4.5's T11 row writes (J-SS1.8; J-V10.95)". (c) SR2-20's
companion: V10 §2.13's `ClerkQuery` `entity` member — the one declaration BCR-V10-1 places in the base — gains
`dossierKey?: string /* by a binding key (BCR-V9-36): volume 9's note lines and a host reader; never in the model-facing
read_map entity input (V10 §2.12; J-V10.68) */`, and BCR-V10-1's "`entity` (with `at`, `layer` and `below`)" reads
"(with `at`, `layer`, `below` and, by BCR-V9-36, `dossierKey`)". (d) `DressInput.restyle?: { concern: string }` lets the
model name any concern — `naming` among them, a town-wide rename past rule 5 and the fates the `town` form shows — though
§4.1's row admits three; it is typed `{ concern: 'style.compass' | 'naming.emblem' | 'render.instances' | 'decoration' }`,
any other value an `is_error` result, `'decoration'` encoding SR2-26's group; T-V10-4's restyle case adds `decoration`.

**SR2-26 · minor · V09 · two rerollable concerns with no control on either surface.** The base registers exactly six
rerollable concerns — `naming`, `render.instances`, `style.jitter`, `style.crowns`, `style.compass`, `naming.emblem` (§6.1)
— and its §7.4 row offers "reroll names / trees / decoration / compass / emblem". After SR-29 the canvas writes four
(New names, New trees, New emblem, New compass) and V10's `restyle` the same three display concerns; `style.jitter` and
`style.crowns` (the "decoration": line wobble and tree crowns, display only) are rerolled by nothing, and T-V9-12 checks
event kinds, not concerns, so it passes. *Required change:* V9 §4.3's dress row and §4.5's T12 row gain **New
decoration** — `rerollLayer { concern: 'style.jitter', salt: the concern's current salt + 1 }` then `rerollLayer {
concern: 'style.crowns', salt: the concern's current salt + 1 }`, in registry order, as one `group` (one undo step;
display only, §6.1); V9 §4.10's `rerollLayer` template gains "New decoration"; AP4 lists it; T-V9-12 gains "every
rerollable concern of §6.1's registry is written by a control". V10's form is SR2-25 (d). (J-SS2.9.)

**SR2-28 · minor · V09 · a consumer the clerk never is.** V9 §2.12's `HistoryRow` row names its readers "the history
panel, the clerk (read-only)", while V9 §1b's row names "the history panel, the context panel's History tab, a generic
host's viewer filter". V10 reads no `HistoryRow` (no occurrence): its `read_map history` reads the base's lifecycle block
and `why` history pages (V10 §1b, §3.5), and a removal's events reach it by `ClerkMount.rebuildEvents` (V9 §2.10). A
wiring census would record an edge with no consumer. *Required change:* §2.12's row reads "the history panel, the context
panel's History tab, `HostSlots.historyFilter` (V9 §1b)".

## 10 Disposition summary of the continuation

| owner | blocker | major | minor | ids |
|---|---|---|---|---|
| V09 | 0 | 1 | 3 | SR2-23 (major); SR2-26, SR2-27, SR2-28 (minors) |
| V10 | 0 | 1 | 1 | SR2-22 (major); SR2-25 (minor) |
| V08 | 0 | 0 | 1 | SR2-24 |
| BASE-F | 0 | 2 | 1 | SR2-20, SR2-21 (majors); SR2-29 (minor) |

Continuation totals: 0 blockers, 4 majors, 6 minors (10); round 1's continuation SR-22 – SR-36 all fixed. Of the ten,
six are residues of round 1's continuation — a request written after the base record's reconciler landed (SR2-20,
SR2-21), a widened base answer the other volume still reads the old way (SR2-22), a mechanism one lane found in passing
that the other volume does not provide (SR2-23), and sentences and statuses left behind when a sibling landed later
(SR2-24, SR2-25 (a), SR2-29) — and four are in text earlier rounds read without filing (SR2-25 (b) – (d), SR2-26,
SR2-27, SR2-28). **Pairs to apply together:** SR2-20 with SR2-24 (a) and SR2-25 (c) (the `dossierKey` input on all three
sides); SR2-21 with SR2-22 (the dug access's building alternatives in the base and in the clerk); SR2-23 with SR2-24 (a)
(the host lines' key); SR2-26 with SR2-25 (d) (New decoration on both surfaces). **Order of work:** V09 first (SR2-23's
slot shape is what V08's sentence cites), then V08 and V10, then file f, whose items name the texts the volumes land.
**Routing:** the owners' next reconcile lanes (reconcile-V08, -V09, -V10 and -BASE-F of the round that consumes this
file).

**Consistent across the seam (checked in this continuation, no finding).** The three New names scopes and the
town-wide re-rolls write the same bytes on both surfaces — `salt: 0` with `ids` in address order, the town-wide salt
`MapBrief.salts` + 1 in V10 and `DisplayList.salts` + 1 in V09, one number by T-V10-8 (§6.1's effective salt); the
this-quarter read at the effective key on both (J-V9.110, J-V10.95); a way's split and merge on T9 in both, the
centre-line point stated once in V10 §4.1 and cited by V09; `refuse.assignment.noSite` reaching the clerk through V10's
`rule` row and §3.5 step 3 with no second sentence (T-V10-29); the dossier groups' membership by the port's `host:port`
session against V08 §3.6 step 6 ("no `group`"), `{n}` the ledger event's `changes` count and `{week}` its `absorbed`
week (V08 §3.6 (4); the base's `absorbed.week: number | null`, so `absorbUndated` is reachable); note lines and standing
notes dropped at the view's effective key on both sides (V08 §4.6 item 2, *The standing notes*; V9 §4.10, §5.7) with
T-V8-14's and T-V9-69's clauses agreeing; `GenerationReport.dossierNotes` written by V08 (BCR-V8-8) and read by V9 §5.7;
V08 §5.2's chain knowledge rule, BCR-V8-15's three clauses, V9 §5.4's entry and T-V9-68's absent entry; the host
projection keeping `MapBrief.salts` (V10 §3.17's table; V08 §5.4 (3) citing it). **Outside this seam, routed by open
requests (not filed here):** XV-V9-27 (volume 4 adopts BCR-V9-22's two new sentences in U-DIG) and XV-V9-28 (volume 6's
`EpochReport.raised.suppressedFired`), both written by reconcile-V09-r2 at 09:49 and open in V9 §10.2 (J-SS2.12).

## 11 Decisions, CONFIRMED versus PLAUSIBLE of the continuation

**Decisions (vetoable).**
* **J-SS2.7** — chose to continue this lane under its key rather than return the 05:34 summary under the resume rule,
  because the re-issued brief's issue set (round 1 now SR-01 – SR-36) is wider than that landing covered, as round 1's
  continuation (J-SS1.4) and the second-brief reconcilers did; §0 – §6 stay as written.
* **J-SS2.8** — chose, for SR2-23, a key argument on `HostSlots.historyLines.list` — the shell passing `effectiveKey()`
  and re-listing on `onEffectiveKey` — over handing `effectiveKey`/`onEffectiveKey` to the embed's handler or letting the
  handler compute its own, because V9 §2.10 makes the shell's computation the only one, the shell already redraws its
  panels on `onEffectiveKey`, and a provider that is given its key keeps no View-as state of its own.
* **J-SS2.9** — chose, for SR2-26, one **New decoration** control writing both display concerns as one group over two
  controls or folding `style.crowns` into **New trees**, because the base's own word for the pair is "decoration" (§7.4's
  `rerollLayer` row), J-V9.101 fixed New trees' bytes to `render.instances` alone, and one plain button suits the
  owner's reader; `'decoration'` is then one `restyle` value on the clerk's side, encoding the same group.
* **J-SS2.10** — chose to label BCR-V9-36's item STAGED with the SettlementForge stage (SR2-20) over BASE at M3a with
  BCR-V10-1, because its only readers are the dossier-bound panels and T-V9-69 at M-SF with AP5b; and to ask V10 for the
  member in its `ClerkQuery` declaration (SR2-25 (c)) over a cross-volume request from V09, because V10 §2.13 is the text
  BCR-V10-1 places in the base "exactly as" it reads.
* **J-SS2.11** — rated SR2-22 major over minor, because a builder of the clerk would encode the dug access's building
  alternatives as `placeAt` plots from V10's explicit parenthesis, and the card's alternative would then differ from the
  canvas's button (T101-3) — a contradiction a builder hits, not a wording slip.
* **J-SS2.12** — chose not to file XV-V9-27 (volume 4) and XV-V9-28 (volume 6) as seam issues, because both volumes lie
  outside this seam, the requests are recorded as open rows in V9 §10.2 where their owners' lanes read them, and V08 §4.6
  item 3's dependence on XV-V9-28 is carried by SR2-24 (b)'s citation.

**CONFIRMED (both sides read in the live text; the sentences are quoted in each finding):** the fifteen re-checks of §8
and the ten findings SR2-20 – SR2-29, each located in the text it names; SR2-20 by a census over file f (no occurrence of
`BCR-V9-36` or `dossierKey`) and the log's times (reconcile-BASE-F-r2's continuation landed 09:27, BCR-V9-36 written by
reconcile-V09-r2 at 09:49); SR2-21 by reading item 372's note against BCR-V9-22's live text and item 463; SR2-22 by
reading V10 §3.16 and §3.5 step 3 (no occurrence of "Use another building" in V10); SR2-23 by reading V9 §2.2, §2.10 and
V08 §3.1 step 7 whole; SR2-26 against the base's registry sentence in §6.1 (exactly six rerollable concerns) and §7.4's
`rerollLayer` row (no occurrence of `style.jitter` or `style.crowns` in V09 or V10); SR2-28 by the census (no occurrence
of `HistoryRow` in V10); every item of §10's consistent list. Inputs were unchanged from start to end (md5 as in §7,
re-checked before this section was written).

**PLAUSIBLE:** that the sections of the three volumes untouched since round 1's continuation hold no new seam defect —
rounds 1 – 3 and round 1's continuation read them, and this continuation read only the changes and the contract sections
they touch (the method of J-SS1.5); that SR2-27's names are rendered, for a panel-built `MsgRef`, by an `entity` read and
not inside the engine (V9 §2.9 says only that the engine renders address arguments "under the caller's key"; the
required change is written to hold either way); and that none of the required changes needs re-pricing (each is a slot
argument, a table row, a union member, a control on an existing flow or a file f note).
