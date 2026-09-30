# Seam check: the application (V09), the clerk (V10) and the host (V08) — round 1

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-surfaces-r1; covered by the whole-design retrovalidation (J84).

PROGRESS
- §0 Method, inputs and coverage | done
- §1 Re-check of round 0 (SS-01 – SS-27) | done
- §2 Sweep findings (SR-01 – SR-21) | done
- §3 Disposition summary by owning volume | done
- §4 CONFIRMED versus PLAUSIBLE | done
- §5 Continuation — why, inputs, method and coverage (2026-09-29, re-issued brief) | done
- §6 Re-check of round 0's continuation (SS-28 – SS-46) | done
- §7 Sweep of every change since round 3's inputs (SR-22 onward) | done
- §8 Disposition summary of the continuation | done
- §9 Decisions, CONFIRMED versus PLAUSIBLE of the continuation | done

## 0 Method, inputs and coverage

Inputs (md5 at start): V09 `16a16491…` (3 864 lines), V10 `ed19f693…` (3 195), V08 `f6549c4a…` (2 873), `_integrate.md`
`1487de32…`, file f `40e2f8d6…`; the base `docs/ARCHITECTURE.md` §11.2 and §11.3 whole, §7.1's sugar paragraph (the roster
rule). Method: every round-0 issue re-read on both sides in the live text; then the seam's four contracts (tool
vocabulary, preview protocol, knowledge rule, host clerk seam) swept again across the sections round 0 left open, each
finding read on both sides before filing; a mechanical census compared every `BCR-V8-n`, `BCR-V9-n` and `BCR-V10-n` id in
the three volumes with file f (script output in the session scratchpad, `volumes/ssr1/`).

**Read whole:** V09 §0–§3.15 (l. 1–1190), §4.3–§4.8, §4.9's rules and families table, §4.11, §4.16, §4.20.4, §5.8, §5.9,
§5.12, §6.2–§6.3, BCR-V9-10 – -13, -23, -27 – -29, -35, §10.2, §11, the Integration and Reconciliation notes; V10 §1b –
§2.15, §3.1 – §3.5, §3.9 – §3.22, §4 – §5.4, BCR-V10-6, -7, -13, -14, -18, -20 – -23, §10.2, §10.3, §13, the Integration
and Reconciliation notes, T-V10-1, -2, -4, -6, -20, -29, -44; V08 §2.2, §3.1, §3.14, §4.1 – §4.6, §5.1 – §5.5, BCR-V8-1 –
-3, T-V8-27, the Integration and Reconciliation notes; file f's header, its §11.2 and §11.3 items and its Reconciliation
round 1. **By targeted grep, then in context:** V09's T-V9-12, -15, -27, -40, -64, -65, its catalogue rows `clerk.*`,
`deck.landmarkMinSpanM`, `admitAs`; V08's §1b rows; `_integrate.md` §2.2 – §2.3's rows naming V08, V09 or V10. **Not
re-read** (outside the four contracts, or read whole by round 0 and untouched by the reconcilers' notes): V09 §4.10,
§4.12 – §4.15, §4.17 – §4.20 (but §4.20.4), §6.1, §6.4 – §13; V10 §0 – §1.3, §3.6 – §3.8, §6 – §9, §11, §12; V08 §2.1,
§2.3 – §2.8, §3.2 – §3.13, §6 – §13 (the settlements seam's ground).

**Decisions (vetoable).** J-SS1.1 — chose one owner per issue and, where a fix needs a second volume's sentence, a
separate issue for that volume (SR-05/SR-06) over one issue with two owners, because each reconciliation lane reads only
its own rows. J-SS1.2 — chose, for "see what the players see", the display filter of V09 (J-V9.46) widened to carry a key
over V08's lowered knowledge key, because J-V9.46 already decided that lowering the key breaks the document formats and
saves, and the party key needs its places list, which the tier-only `viewAs` cannot carry. J-SS1.3 — chose to have the
application run a critique finding's fix itself, as the user's declaration, over routing it to the harness, because the
import dialog must work with no clerk mounted (R19, T-V10-2) and a rule-based fix is not an AI proposal.

## 1 Re-check of round 0

All 27 round-0 issues are fixed in the text their owners were asked to change. Five left a second half unmet or a new
defect beside the fix; each is filed in §2 with its own id.

| id | owner | state now | residue filed |
|---|---|---|---|
| SS-01 | V08 | FIXED — V08 §5.4 (3), §4.4 (1), §2.2's `query` comment and T-V8-27's transport tap put the projection in the module | SR-01 (BCR-V10-7 (c), the text the base receives, omits the preview reply) |
| SS-02 | V08 | FIXED — `setClerk(config: ClerkConfig)` by citation | — |
| SS-03 | V08 | FIXED — `preview(events, { view, proposal })`, `on('clerkProposal' \| 'clerkConfigRefused')`, §4.4 (3) cites V10 §3.17 | — |
| SS-04 | V08 | FIXED — §4.4 (2), §5.4 (3) and T-V8-27 list the offered kinds | SR-01 |
| SS-05 | V08 | FIXED — §4.4 (4) | — |
| SS-06 | V09 | FIXED — V9 §2.2, §4.11's card-only drawer, T-V9-64 | — |
| SS-07 | V09 | FIXED on V09's side — `ClerkMount.host` | SR-03 (V08 never fills it), SR-07 (V10 never reads it) |
| SS-08 | V09 | FIXED — `ClerkHandle` declares `run`, `newTopic`, `setKey`'s verdict, `defects`, `clearDefects` | SR-07 (V10 still redeclares them) |
| SS-09 | V10 | FIXED — V10 §2.6's dispatch table; V9 §4.11 cites it | SR-11, SR-13 |
| SS-10 | V10 | FIXED — V10 §2.3's effective key, BCR-V10-22; V9 §2.10's `effectiveKey` | SR-02 (BCR-V10-22 not in file f), SR-08 (V09's own panels never lower) |
| SS-11 | V09 | FIXED — V9 §4.5's T6 cites V10 §4.1 | SR-09 (V9 §3.3 step 4 still fills `plot`) |
| SS-12 | V10 | FIXED — V10 §4.1's `where.locus` emits the one-line `roster` | SR-10 (the dossier-bound case) |
| SS-13 | V09 | FIXED — BCR-V9-35 | SR-02 (not in file f) |
| SS-14 | V10 | FIXED — `HoldInput` has no layer re-roll | — |
| SS-15 | V09 | FIXED — `WhyCardModel.sections` | — |
| SS-16 | V09 | FIXED — V9 §2.9, §4.9's families table | SR-17 (V10 still words the access causes) |
| SS-17 | V10 | FIXED — V10 §3.16; `RefusalCategory` has no `bend` | — |
| SS-18 | V10 | FIXED — K17 cites the two keys | — |
| SS-19 | V10 | FIXED — V10 §4.1 cites V11's cell | SR-15 (V09 still restates the constant) |
| SS-20 | V10 | FIXED | — |
| SS-21 | V10 | FIXED | — |
| SS-22 | V09 | FIXED | — |
| SS-23 | V09 | FIXED | — |
| SS-24 | V10 | FIXED — "Assistant (AI)" throughout | — |
| SS-25 | V10 | FIXED | — |
| SS-26 | V10 | FIXED — V10 §4.2 (1) | — |
| SS-27 | V10 | FIXED — `siting.weights` | SR-18 (a stale parenthetical) |

## 2 Findings (the sweep)

Severity: **blocker** (breaks an owner ruling), **major** (a contradiction or an unwired piece a builder would hit),
**minor** (wording, a type left loose, a restatement). Each names one owning volume and the exact change.

### 2.1 The host clerk seam

**SR-01 · major · V10 · base change request narrower than the design.** BCR-V10-7 (c) — the text file f item 473 hands
the base — applies the host projection "to every `query.result`", lists `brief`, `entity`, `sites`, `why` and `frame`,
and refuses only `measure`. V08 §5.4 (3) (with J-V8.84), V10 §3.17's own table and T-V8-27 also project every
`preview.result` (whose `shape` and `ConflictAction.at` are geometry), offer `rule` and `profile`, and refuse `hit` and
`inView`; and no text says how the refusal travels (§11.3's `query.result` has no error form). A builder of the bridge
from the base would post preview shapes to SettlementForge's page — door 1 (J86). *Required change:* BCR-V10-7 (c)
reads: "in host mode the module applies the host projection to every `query.result` and every `preview.result` before
it leaves the frame — V08 §5.4 (3)'s rows for the base's kinds and the preview reply, V10 §3.17's rows for `brief`,
`entity`, `sites`, `why`, `frame` (without `near` and `radiusM`), `rule` and `profile`; `measure`, `hit` and `inView`
are answered `query.result { error: 'E_HOST_KIND' }` — so no length, bearing, extent or coordinate reaches a host (door 1,
J86)". T-V10-20's clauses follow: "every `query.result` and `preview.result`", and its T-V8-27 list names `rule`,
`profile` and the three refused kinds.

**SR-03 · major · V08 · unwired (XV-V9-17 unmet).** V9 §2.2 and §2.10 have the embed's bridge handler (V08 §3.1) fill
`ClerkMount.host` and `HostSlots`; V08 names neither anywhere (no `ClerkMount`, `HostSlots`, `clerkMode` or `hostName`
in the volume), its §1b row 32 ends at "the module", and §1b row 40 still lists "the players' frames" and a "filtered
history" that V08 §3.1 and §3.14 abolished. *Required change:* V08 §3.1 gains a step "Bridge to the shell": the embed
entry's bridge handler routes `clerk.config` to `ClerkMount.host.config`/`onConfig` and `HostSlots.clerkMode`,
`preview { proposal }` to `ClerkMount.host.proposals`, and posts `clerk.needsToken`, `clerk.config.refused` and
`clerk.proposal` when the harness calls `needsToken`, `refused` and `answer` (V9 §2.10); it fills `HostSlots` —
`header` with V08 §4.2's controls, `lockedControls` with the population and tier word (reason "Set by SettlementForge", a `host.*` row), `exportFormats` by
V08 §5.4 (2), `fileMenu: false`, `banner` with V08 §5.1's in-frame strips, and `hostName` "SettlementForge" as a
deployment constant of the embed build (§3.1 step 2's rows). §1b gains the row; row 32's consumer reads "the embed's
bridge handler → `ClerkMount.host` (V9 §2.10)"; row 40 reads "the DM's and co-DM's frames".

**SR-04 · major · V08 · unwired.** V08 §4.2's actions are "a control in the frame's header" (V9 `HostSlots.header`,
rendered by module code in the frame), but their operations are host-page calls — `MapSession.setClerk`, `setParty`,
`seePlayersView`, `MapStore.replaceSnapshot`, `create`, a `dossier.offer` — and no PLAT → host message carries a click
from the frame to the page (BCR-V8-1's vocabulary and `MapSession.on` have none). "Assistant settings" cannot reach
`setClerk`. *Required change:* BCR-V8-1 and V08 §2.2 gain a PLAT → host push `host.action { action: 'refresh' | 'restore'
| 'newMap' | 'reveal' | 'hide' | 'partyTier' | 'assistantSettings'; args? }` (owner or editor frames only; `reveal` and
`hide` carry the selected binding keys or addresses), surfaced as `MapSession.on('action', h)`; the host runs the V08 §4.2
row's operation with its existing calls; "Update the map engine" and "Keep the saved town" commit their events in the
frame and then ask for `doc.snapshot` as today; "See what the players see" runs in the frame (SR-05). A new bar T-V8-47 (SF6, the host harness) asserts each header control produces its `host.action` and nothing else.

**SR-05 · major · V08 · contradiction with a recorded decision (the knowledge rule).** V08 §3.14 (5) and §4.2 implement
"See what the players see" by setting the session's view-state `knowledge` to the party key; V9 §4.8 (J-V9.46,
BCR-V9-23) decided that a lowered view is a display filter (`ViewOpts.viewAs`) so the knowledge key — and with it the
document formats, compaction and saves — stays the role's. Two mechanisms for one capability, and V08's refuses the
frame's document exports and risks `doc.snapshot` while the check is on. *Required change:* `seePlayersView(true)` sets
the frame's `ViewOpts.viewAs` to the resolved party key (V08 §3.14 (1)) by the key form SR-06 adds, and `false` clears
it; no view-state write; the strip "Showing what the players see" stays; §4.2's row and §2.2's comment follow.

**SR-06 · major · V09 · companion of SR-05.** `ViewOpts.viewAs` (BCR-V9-23) holds a tier only, so the party key (a tier
plus the revealed places) cannot be a display filter. *Required change:* BCR-V9-23's `viewAs` reads `'public' | 'local' |
'secret' | { tier: 'public' | 'local'; places: string[] }` — a key form admits as the lower of the view's key and that key,
its `places` replacing the view key's when its tier is the lower; V9 §2.10's `effectiveKey()` returns that key; V9 §4.8
adds that a host may set it (V08's players' view) and that the View as menu then reads "What the players know".

**SR-07 · major · V10 · unwired (XV-V9-18 unmet).** V10 never names `ClerkMount.host` (0 hits): §2.11's
`HostProxyBackend` takes "the host's base address and short-lived token from `clerk.config`", and §3.17 has "the module"
send `clerk.needsToken`, accept `preview { proposal }` and send `clerk.proposal` — so a builder of the harness from V10
would handle the bridge inside it, which V9 §2.10 forbids (J-V9.81). §2.6 also still declares `ClerkHarness extends
ClerkHandle` re-declaring `run`, `newTopic`, `setKey`, `defects` and `clearDefects`, says it "adds the members the
drawer's buttons and settings need (J-V10.57)", and comments "V09's void-returning member is satisfied" — V09 now declares
all five with `setKey`'s verdict. *Required change:* V10 §2.6, §2.11 and §3.17 name `ClerkMount.host` (V9 §2.10) as the
harness's one channel to the bridge — `config()`/`onConfig` for the transport, its `fallbacks` and `capUsd` (→
`ClerkSettings`' forced fields and `HostProxyBackend`), `needsToken()` at `network.tokenRefreshLeadS` or an
authentication failure, `refused('origin')`, `proposals` for the intake, `answer(id, status, seqs)` for `clerk.proposal`;
`createClerk` returns `ClerkHandle` (V9 §2.10) and `ClerkHarness` is deleted or declared `type ClerkHarness =
ClerkHandle`; J-V10.57 is marked superseded by XV-V9-18; §1b.2's first row follows.

### 2.2 The knowledge rule

**SR-08 · major · V09 · unwired.** V9 §4.8 says the panels, the gazetteer, the why card and the default export tier
"read the same way" — at the lower of the key and View as — but those are band-less `query` calls on a `DocHandle`, which
carry no view; the only mechanism is BCR-V10-22's `admitAs` ("a client that speaks for a view … passes the view's
effective tier as `admitAs`"), and V09 never passes it (0 hits for `admitAs`). An owner viewing as a player gets secret
names in every panel. *Required change:* V9 §2.7 and §4.8: every band-less read the application makes for a view —
`why`, `entity`, `sites`, `links`, `gazetteer`, `people`, `whereIs`, `relations` — passes `admitAs` = the view's
effective tier (V9 §2.10's `effectiveKey()`), and the default export tier reads it; a new bar T-V9-66 asserts a `public`
View as shows no canary name in the why card, the gazetteer or the Link card.

**SR-02 · major · BASE-F · base change requests missing.** The census of every BCR id in V08, V09 and V10 against file
f finds three absent: BCR-V9-35 (T6's one-line `roster`), BCR-V10-22 (`admitAs`) and BCR-V10-23 (an unnamed roster
line) — all written by the round-1 reconcilers after the file's own round closed (03:39). Without them the base keeps
T6 without `roster` (T101-2 and T-V10-1 fail on the canvas's locus drop), has no `admitAs`, and has no meaning for an
empty line name. *Required change:* file f gains items 570 – 572 in base-section order: under §7.1, BCR-V9-35 — *Needed
by* V09, V10; **BASE (M1–M3b, the reference UI (AP1–AP4))**; *Note:* applied after BCR-V10-20 (item 368), BCR-V3-16 and
V01 BCR-12 (c) on T6's and T10's rows — and BCR-V10-23 — *Needed by* V09, V10; **BASE (M3a, the oracle and the tool API
(item 101))**; under §11.2, BCR-V10-22 — *Needed by* V09, V10; **BASE (M3a, the oracle and the tool API (item 101))**;
*Note:* applied after BCR-V9-23 (item 464) and BCR-V10-6 (item 470), on the same options.

### 2.3 The tool vocabulary

**SR-09 · major · V09 · contradiction (byte equality).** V9 §3.3 step 4 writes "a `placeAt`'s `plot` is the plot a hit
query finds under its point" and §4.20.4 (1) relies on it; V9 §4.5's T6 row, V10 §4.1's `where.at` and BCR-V10-18 write
`plot: ''` with the point form, the dry run deriving the plot. T101-3 and T-V10-4 compare the emitted bytes. *Required
change:* V9 §3.3 step 4 reads "a `placeAt` from a point is written `plot: ''` with `from: { points: [p] }`, the dry run
deriving and writing the plot (BCR-V10-18; V10 §4.1's `where.at`); 'this plot only' writes the plot under the point
(`where.plot`)"; §4.20.4 (1) reads "the dry run finds the deck plot under the point".

**SR-10 · major · V09 · unwired (the dossier-bound locus).** With a dossier connected, §7.1's roster rule refuses a line
that names no element (`dossier-owned`, the unplaced elements offered). V10 §4.1 and §3.16 answer a place by a locus on
such a map with the unplaced elements and the same place on the first `sites` candidate that satisfies the locus. V9
§4.5's T6 locus drop has no dossier branch: T6 offers no element picker (only T7 has one, V9 §4.16 (5)), and the refusal
renders `refuse.dossierOwned`'s "SettlementForge sets this…", which names neither alternative. *Required change:* V9 §4.5's
T6 row: with a dossier connected, a locus drop of a class stamp previews the one-line `roster`, and its refusal card is a
new row `refuse.roster.dossier` ("SettlementForge's record decides this town's places. Place one of them here, or put
{thing} on a plot near {locus}.") with the element picker of V9 §4.16 (5) and **Put it at {site}** — `placeAt` on the
first `SiteCandidate` satisfying the locus (the alternative V10 §3.16 offers), the same two for canvas and clerk.

**SR-12 · major · V09 · unwired (two clerk entries without a control).** V10 §3.1 starts turns from "How do I …?" (the
`help` route, "in the drawer's menu and the application's help") and from "the roster paste box (T7's panel …)"; V09's
drawer menu (V9 §4.11: New topic, What the assistant sees, Copy conversation, Save …), its Help (V9 §5.9) and T7's panel
(V9 §4.5, §4.16) have neither — `send(…, 'help')` is declared and never called. *Required change:* V9 §4.11's drawer menu
and V9 §5.9's Help gain **How do I …?** (shown when a clerk is on), which sends on V10's `help` entry and runs the
answer's `useTool` action; T7's panel gains **Ask the assistant to place these** (shown when a clerk is on), which sends
the pasted text on the `roster` entry; T-V9-40 covers both.

**SR-13 · major · V09 · unwired (the import dialog's Fix).** V9 §3.12's skeleton import dialog offers **Fix** — "its
`ClerkAction`, previewed then accepted like any proposal" — and a fix is a `propose` action, which V10 §2.6's table gives
to the harness alone (T-V10-44); in the standalone product without a clerk `ShellConfig.clerk` is null, so there is no
harness, while V10 §3.21 and T-V10-2 require the skeleton check to work without the model. *Required change:* V9 §3.12:
the dialog runs a finding's `propose` fix itself, whether or not a clerk is mounted — its events through V9 §3.3's
pipeline as a ghost with Accept, committed as the user's declaration (no `proposedBy`, since no model proposed it) — and
V10 §2.6's dispatch table is cited with this one exception; T-V9-40 asserts a Fix with no clerk configured.

### 2.4 The preview protocol

**SR-11 · major · V10 · unwired (the card's Undo and Put it back).** V9 §4.11's card shows **Undo** once accepted and
**Put it back** on a removal no longer the latest group, each a `ClerkAction` the drawer passes to `run` —
`{ kind: 'undo'; group }` and `{ kind: 'rebuild'; seq }`; `ProposalView` carries neither the accepted group nor the
removal's `seq`, and its `actions` enum has no `rebuild`. The same enum offers `retry` on a host's card, which V9 §4.11
and T-V9-64 omit (the host re-proposes on its side) and V10 §5.4 says is "drawn the same way". *Required change:*
`ProposalView` gains `accepted?: { group: number; seqs: number[] }` and `rebuild?: { seq: number }` (present on an
accepted removal once a later group follows), `actions` gains `'rebuild'`, and for `source: 'host'` `actions` is
`accept`, `drop`, `why` only; V10 §5.4's host-card sentence reads "drawn the same way, without Try again".

### 2.5 Words, types and single sources

**SR-14 · minor · V09 · two sentences for one event.** V9 §3.14's clerk row quotes "The assistant is not available
right now…", "The assistant's key was not accepted…" and "…reached this month's limit of {usd}" as what the refusal card
shows, while the card's text is V10 §3.16's `refuse.clerk.offline`, `.key.<keyState>` and `.budget`; the row
`clerk.key.refused` duplicates `refuse.clerk.key.invalid`. *Required change:* §3.14's row cites V10 §3.16's refusal keys
without quoting; delete `clerk.key.refused`; `clerk.cap.reached` stays the meter's foot line only (V9 §4.11).

**SR-15 · minor · V09 · restated value (J-VI.8, rule R-c).** V09 keeps `deck.landmarkMinSpanM` with "40 m" as its own
constant (the §4.20 constants table, §4.20.4 (7), BCR-V9-30, XV-V9-13), while V10 §4.1 cites V11's
`deck.landmarks/bridgeMid/minSpanM`. *Required change:* V09 names V11's cell in all four places and drops the number;
XV-V9-13's `deck` clause is marked met by V11 §3.24.4.

**SR-16 · minor · V09 · slot comments that point at nothing.** `HostSlots.banner` reads "V08 §5.1's status banners", which
V08 §5.1 (J-V8.35) draws outside the frame; `historyFilter` reads "a viewer's history (V08 §5.1)" and V9 §1.3 lists "the
viewer's filtered history" among V08's differences, but SettlementForge mounts no viewer frame (V08 §3.1, §3.14).
*Required change:* `banner` renders the frame's own strips (V08 §5.1's "Showing what the players see", the held and
frozen notices); `historyFilter` cites §11.3's viewer role for a generic host and notes that SettlementForge sets none;
§1.3 drops "the viewer's filtered history".

**SR-17 · minor · V10 · words written twice.** V10 §3.9a's access-point row quotes its own words for `dig` ("the smith's
cellar broke into the cave"), `overlap` and `crypt`; V9 §4.17.3 writes `info.under.cause.<rule>` and V9 §4.9's families
table states that V10 names the causes without words (XV-V9-18). *Required change:* the row lists the `cause.rule` values
and cites V9 §4.17.3's lines, with no quoted words.

**SR-18 · minor · V10 · stale after V09's round.** V10 §2.3's "Until the mount carries the two members, the harness reads
the view's key alone", §13's "each with its interim behaviour stated in section 12", CVR-V10-15's and CVR-V10-16's open
status, and §4.1's `siting` row "which V09's per-kind panel writes as its `weights`" — V09 now declares `effectiveKey`
and `onEffectiveKey` and writes `familyWeights`. §2.3 also restates the effective key's definition that V9 §2.10 owns.
*Required change:* delete the interim sentences; mark CVR-V10-15 and -16 met (V9 §2.10, §2.6); §4.1 reads "`weights` as
the kind row's `familyWeights` cell (V11 §4.2; V9 §2.6)"; §2.3 defines the session key as `ClerkMount.effectiveKey()`
(V9 §2.10) without restating it, so SR-06's key form reads through.

**SR-19 · minor · V10 · a union restated wrongly.** `ProposalView.variations[].effects[].kind`'s comment lists "rerouted,
junction, dry, removed, lost, displaced, rederived"; BCR-V9-27's `Effect['kind']` is `added | removed | rerouted | joined
| lost | displaced | rebuilt | moved`. *Required change:* type it `Effect['kind']` (BCR-V9-27) and drop the list.

**SR-20 · minor · V10 · a field the prose promises.** V10 §1b.5 and V08 §4.4 (2) say a `why` names the dossier change's
`changeId`, `source`, `week` and reason; `WhyAnswer.history[].change` is `{ changeId; reason? }`. *Required change:*
`change: { changeId: string; source?: string /* DossierChange.source, §7.7 item 13 */; reason?: string }`.

**SR-21 · minor · V10 · a refusal where the canvas bends (J-VI.4).** V10 §4.1's `where.slot` refuses a slot the deck
does not offer or one already taken; V9 §4.20.4 (3) bends a drop on a slot to the nearest free deck plot
(`bend.deck.full`), and item 101 R2 leaves refusals to dossier facts and locks. *Required change:* such a slot encodes
`placeAt { plot: '', from: { points: [the slot's point on the deck — its seaward end or midpoint] }, designation }`, so
the dry run takes the nearest free deck plot and bends as the canvas does.

## 3 Disposition summary by owning volume

| owner | blocker | major | minor | ids |
|---|---|---|---|---|
| V08 | 0 | 3 | 0 | SR-03, SR-04, SR-05 |
| V09 | 0 | 6 | 3 | SR-06, SR-08, SR-09, SR-10, SR-12, SR-13; SR-14, SR-15, SR-16 |
| V10 | 0 | 3 | 5 | SR-01, SR-07, SR-11; SR-17, SR-18, SR-19, SR-20, SR-21 |
| BASE-F | 0 | 1 | 0 | SR-02 |

Totals: 0 blockers, 13 majors, 8 minors; round 0's 27 issues all fixed.

## 4 CONFIRMED versus PLAUSIBLE

CONFIRMED (both sides read in the live text, the sentence located in each): SR-01, SR-03 – SR-21; SR-02 by an executed
census (every `BCR-V8-n`, `BCR-V9-n`, `BCR-V10-n` id in the three volumes against file f: three absent) and the log's
times (file f's round closed 03:39; V09's and V10's reconcilers landed 04:01 and 04:03). PLAUSIBLE: that the sections
listed as not re-read in §0 hold no further seam defect — round 0 read most of them whole and the reconcilers' notes show
no edit there, but this round claims nothing about them.

## 5 Continuation — why, inputs, method and coverage (2026-09-29, re-issued brief)

**Why a continuation.** The workflow re-issued this lane at 08:58. Its brief — re-check every issue the previous round
raised (`seam-surfaces-r0.md`), then sweep the whole seam — now covers a wider set than the 04:26 landing did: round 0
gained its continuation SS-28 – SS-46 at 08:31, fixed by the second briefs of reconcile-V10-r1 (08:45), reconcile-V09-r1
(08:54) and reconcile-V08-r1 (08:57). SS-01 – SS-27 and §2's SR-01 – SR-21 are history (re-checked by rounds 2 and 3) and
are not redone. Round 4 of this seam (STARTED 07:42) was cut at its skeleton, so no surfaces round has swept the text since
round 3's inputs. New findings are numbered on from SR-22.

**Inputs** (md5 at the continuation's start; snapshots in `scratchpad/volumes/surfr1b/`): V09 `94ce6753…` (4 329 lines),
V10 `2bcc431b…` (3 496), V08 `3d6de46b…` (3 437), `_integrate.md` `965ab696…` (468), file f `1d04dca0…` (1 377), the base
`docs/ARCHITECTURE.md` `01fea21f…` (unchanged since round 3).

**Method.** (1) Each of SS-28 – SS-46 re-read on both sides in the live text: the owner's fix located, then every
sentence on the other side of the seam that the fix touches (by grep, then the paragraph or table in context). (2) The
sweep read whole every change since the last completed surfaces sweep — round 3's inputs (V09 `6b762ccf…`, V10
`02b1e8ca…`, V08 `c30a39c9…`, `_integrate.md` `d868438e…`, file f `38c29d39…`) to the live text — as two diff layers: round
4's reconcilers plus the integration continuation (to round 0's continuation inputs), then the second-brief reconcilers
(to now); 1 765 diff lines, 307 KB. (3) Every seam term a changed hunk introduced was followed into the other two volumes,
the base and file f. The four contracts' sections the hunks touch were read whole in the live text: V9 §2.8, §2.9, §2.10,
§4.8, §4.9's refusal and bend rows and family table, §4.10, §4.15, §4.17.4, §5.6, §5.7, the T4, T9, T11 and T12 rows of
§4.3 and §4.5; V10 §3.6, §3.16, §3.17, the T9 – T12 input types and encoder rows of §4.1, T-V10-1, -4, -6, -7, -20, -29,
§10.2; V08 §4.6, §5.1's banner table, §5.2's `CustomChainRecord` row, §3.9's table, T-V8-14, -25, -27, -45, -47, X11,
X12, X17; the base's `rerollLayer` event and salt rule (§6.1, §7.1), §7.1's toolkit table, `GenerationReport` (§5.4),
the `gazetteer` query; file f items 277, 348, 372, 453, 472, 570 – 572, 582.

## 6 Re-check of round 0's continuation (SS-28 – SS-46)

All nineteen are fixed in the text their owners were asked to change. Ten left a residue on the other side of the seam or
beside the fix; each is filed in §7 with its own id.

| id | owner | state now | residue filed |
|---|---|---|---|
| SS-28 | V10 | FIXED — V10 §3.16 *The dry run's bends*; the `rule` and `lock` rows render the engine's `MsgRef`; §3.5 step 3, prompt rule 10, §2.9, §2.10, T-V10-29, J-V10.94; V09 applied CVR-V10-17 (V9 §4.9's family row, T-V9-15) | SR-30 (an F-EDIT the fix left without a row); SR-33 (CVR-V10-17 still open in V10) |
| SS-29 | V09 | FIXED — V9 §3.7 without layer chips; **New trees** on T12 (§4.3, §4.5), T-V9-6, AP4, J-V9.101 | SR-26 (the clerk's T12 re-roll writes no salt) |
| SS-30 | V09 | FIXED — IN-V09-16 | — |
| SS-31 | V09 | FIXED — V9 §4.15 names `EntityCard.anchor`; T-V9-13's word cases | SR-35 (a restated list of V10's anchor rules) |
| SS-32 | V09 | FIXED — V9 §4.20.2 (5), (6), §4.20.9, the island and rim rows, J-V9.75/-76/-44/-106, T-V9-52, -59, XV-V9-16 (b), XV-V9-25 | SR-31 (V10 still offers "Add a hoist instead") |
| SS-33 | V10 | FIXED — "Dig a well…" gone from §3.16 and IN-V10-1 | SR-31 |
| SS-34 | V09 | FIXED — AP8 with V10's C2 – C5; T-V9-64 at M3c with C5 | — |
| SS-35 | V09 | FIXED — V9 §4.17.4's four-step ladder, `bend.under.noAccess`, BCR-V9-22, T-V9-38, J-V9.102 | SR-32 (file f item 372's note still names the shaft as the last resort) |
| SS-36 | V10 | FIXED — V10 §4.1's `terrace` row writes `water: input.water ?? 'locked'`; IN-V10-5; T-V10-4 | — |
| SS-37 | V10 | FIXED — BCR-V10-12's sentence and §10.3's row; file f item 348 agrees | — |
| SS-38 | V08 | FIXED — V08 §1's out-of-scope sentence and in-scope item 9 | — |
| SS-39 | V08 | FIXED — V08 §6's page row with the scratch line (161 / 231 / 421 MB; J-V8.97's two corrections hold against V10 §3.17's selection and BCR-V10-19's figures); T-V8-30 | — |
| SS-40 | V09 | FIXED — AP5 and AP5b, T-V9-28/-40/-64/-66/-67 milestones, the scripted host page, J-V9.103 | — |
| SS-41 | V09 | FIXED — the Show menu's **SettlementForge's chains**, BCR-V9-3's `supplyChains`, §5.15, T-V9-68, J-V9.105; V08 applied XV-V9-26 (§5.2, §1b, BCR-V8-15) | SR-25 (the view and its GeoJSON ignore the key); SR-34 (XV-V9-26 still open in V09) |
| SS-42 | V08 | FIXED — J-V8.21 REVISED | — |
| SS-43 | V08 | FIXED — V08 §4.6 cites V9 §4.10's `epoch` row and `info.raised.built` / `.suppressed`; X11 names V06; T-V8-45 reads keys | SR-33 (CVR-V10-14's V08 part still open in V10) |
| SS-44 | V08 | FIXED — V08 §4.6's table *The port's notes in words*, §3.9 and §5.1 keyed, `PortNote.msg`/`.keys`, the ledger's `notes`/`notesCleared`, `DossierBinding.notes`, `held.reason`, `module.status.detail`, X12, T-V8-14 | SR-22 (V09's history rows cannot carry the absorb group or its note lines); SR-23 (no read reaches the standing notes); SR-24 (note lines filtered by the frame's key, not the view's) |
| SS-45 | V08 | FIXED — X17 CLOSED; §12 CONFIRMED | — |
| SS-46 | V09 | FIXED — the four context controls and a way's own `setAttr` on T9 (§4.3, §4.5, §4.20, §4.20.6), J-V9.104 | SR-27, SR-28 (a way's split and merge: homed on T4 and T9 in V09, no typed form in V10 — the case reconcile-V09-r1 left to this round) |

## 7 Sweep of every change since round 3's inputs (SR-22 onward)

Severity as in §2: **blocker** (breaks an owner ruling), **major** (a contradiction or an unwired piece a builder would
hit), **minor** (wording, a status, a restatement). One owning volume per issue (J-SS1.1).

### 7.1 The history and report surfaces (SS-44's consumer side)

**SR-22 · major · V09 · unwired (the absorb group and the port's notes reach no history row).** V08 §4.6 (after SS-44)
has the history panel draw each committed absorb as one group headed `host.group.absorb` / `.absorbUndated`, holding (1)
the absorb's dossier events, each followed by the report entries it caused, (2) one line per note of the `dossierFacts`
ledger event's `notes`, rendered from its `msg`, with **Show** on its `keys`, and (3) the epochs' rows; and the creation's
prefix "under V9 §4.10's creation row" with its notes. V09's panel cannot draw it: `HistoryRow` (V9 §2.8) is one row per
event with one `text` and its `targets`; V9 §4.10's templates have no `dossierFacts` row, no creation row and no group
head — only "a dossier event | 'SettlementForge: {reason}' (V08 §4.6 groups them)"; "absorb" occurs nowhere in V09. V9
§5.7's "V08's dossier state list" is also the one pointer to the standing notes (SR-23). A builder of `@plat/app` has no
field for a note line, and T-V8-14's clause "an absorb's `event` and new `standing` notes are drawn in its history group
… in a second editor's frame and after a reload" cannot pass. *Required change:* V9 §2.8's `HistoryRow` gains `lines?: {
text: MsgRef; targets: Id[] }[]` (sub-lines drawn under the row, each with **Show** when `targets` is not empty;
derived, never stored). V9 §4.10's template table gains two rows: "`dossierFacts` of an absorb — the head of the
absorb's group (V08 §4.6): `host.group.absorb` with `{n}` its `changes` count and `{week}` the ledger entry's week,
`host.group.absorbUndated` when that week is null; the absorb's other events (the same `group`) and the epoch rows it
carried are listed under it in V08 §4.6's order; its `lines` are the event's `notes`, each `msg` rendered by the catalogue
and its `keys` resolved through the dossier binding to addresses as `targets`, a line dropped when the view's effective
key (V9 §2.10) does not admit a target" and "`dossierFacts` opening a creation's prefix — 'Made from SettlementForge's
record' (key `history.dossierFacts.creation`), its `lines` the event's notes as above"; the dossier-event row adds "its
`lines` are the §5.4 `changes` entries whose `seq` is the event's, worded as V9 §5.7's What moved". The group shows under
the All and SettlementForge filters. V9 §5.7's dossier-bound item reads "the placement state (`GenerationReport.dossier`)
and, under `host.group.standing`, the standing notes (`GenerationReport.dossierNotes`, V08 §4.6; SR-23), each line as V9
§4.10's note lines". A new bar T-V9-69 (M-SF, with AP5b, since only the port writes `dossierFacts`) checks on `town-1`'s
pairs the head and its count, one line per stored note with Show, a line dropped under View as "What anyone knows", and
the standing notes in the report panel; T-V9-15's walker covers `history.dossierFacts.creation`.

**SR-23 · major · V08 · unwired (the standing notes have no read).** V08 §4.6's *The standing notes* has "the report
panel's dossier section (V9 §5.7's 'for a dossier-bound town, V08's dossier state list')" list `DossierBinding.notes`,
and §2.7's lifecycle row names that panel as the field's reader; no call reaches it. The report panel reads `report(h)`
(§5.4's `GenerationReport`), whose `dossier` member is the standing *placement* state of every dossier-backed element —
the list V9 §5.7's phrase named from the start — and neither a §11.2 `query` kind nor any V08 request returns the
binding's notes. The phrase now names two lists. *Required change:* BCR-V8-8 adds to §5.4's `GenerationReport`
`dossierNotes: PortNote[]` — the document's `DossierBinding.notes` at the report's seq, in identity order, `[]` for an
unbound document, rebuilt with the report by every derivation (the report is a derived cache, excluded from every
digest); V08 §4.6's *The standing notes* reads "the report panel's dossier section lists `GenerationReport.dossier` (the
placement state), then `GenerationReport.dossierNotes` under `host.group.standing`, one line per note as the absorb
group's item 2"; §1b's and §2.7's rows name `report(h)` as the read; X12's clause on V9 §5.7 follows; file f's item for
BCR-V8-8 applies it by reference. (V09's sentence is SR-22's.)

**SR-24 · minor · V08 · the knowledge rule on the note lines.** V08 §4.6 item 2 drops "a line whose `keys` bind an
element the **frame's key** does not admit"; V9 §4.8 has every panel read at the view's effective key, so under "See what
the players see" (V08 §3.14 (5), a `viewAs` key form) a note naming a withheld element stays drawn. *Required change:* item
2 and *The standing notes* read "the view's effective key (V9 §2.10; V9 §4.8)" in place of "the frame's key".

### 7.2 The knowledge rule

**SR-25 · major · V08 · a relation drawn and exported past the key (door-1's sibling, §11.1 Knowledge).** V08 §5.2's
`CustomChainRecord` row draws every ACTIVE chain — a dashed line along the way graph between its placed nodes, an
arrowhead at each node — and exports it as a GeoJSON LineString "with its key and label", filtering only the legend's
label by the key; its new gazetteer clause (XV-V9-26) lists a chain "withheld unless the key admits every node". So a
chain through a concealed or `secret` node shows where that node stands in a `public` view, in "See what the players
see" and in a `public` GeoJSON export — and since SS-41 the Show menu makes the view reachable. The gazetteer clause also
disagrees with V09: a withheld row is still listed (§11.2 *Knowledge*: "an unnamed {kind}"), so V9 §5.4 would offer the
entry, while T-V9-68 requires it absent under a key withholding one node. *Required change:* V08 §5.2's row reads "a chain
is drawn, labelled, listed in the gazetteer and exported only when the key admits every one of its nodes — the view's
effective key (V9 §2.10) for the drawing, the legend and the gazetteer, the export's tier for GeoJSON and pictures
(§11.1) — and is otherwise not drawn, not listed (a chain is a relation, never an 'unnamed' row) and not exported";
BCR-V8-15's gazetteer clause reads "listed only when the key admits every node"; T-V8-25 gains a clause on its
active-chain variant at a key withholding one node: no line, arrowhead, legend row, gazetteer row or GeoJSON feature, and
all of them at `secret` (J-SS1.9).

### 7.3 The tool vocabulary (one declaration, one set of bytes)

**SR-26 · major · V10 · the re-roll encoders disagree with the base's event and with the canvas.** V10 §4.1's T11
`newNames` row writes `rerollLayer { concern: 'naming', ids: scope, salt: +1 }`, while the base's event carries `salt: 0`
with `ids` (§7.1: "town-wide: the concern's new salt; 0 with `ids`", the per-entity `salts` filled by §6.3's draw);
`NameInput.newNames` is `{ scope: Ref[] }` only, so V09's town-wide **New names** (V9 §4.5's T11: "these, this quarter,
the town") has no clerk form; the T12 `restyle` row writes "`rerollLayer` of the style concern V09's T12 row names" with no
salt, and `DressInput.restyle`'s comment calls it "a style re-roll" though V09's T12 row (SS-29) now names
`render.instances` (the trees) beside `style.compass` and `naming.emblem`. The same "new names for these" or "new trees"
said to the clerk and made on the canvas then differ in bytes (T101-3, T-V10-4). *Required change:* `NameInput.newNames`
reads `{ scope: Ref[] } | { quarter: Ref } | { town: true }`, encoded as V9 §4.5's T11 row states its three scopes (SR-29):
`rerollLayer { concern: 'naming', ids, salt: 0 }` for `scope` and `quarter`, and `rerollLayer { concern: 'naming', salt:
the concern's current salt + 1 }` with no `ids` for `town` (previewed with its fates, as the canvas's town-wide New names);
the T12 row writes `rerollLayer { concern, salt: the concern's current salt + 1 }`, and `restyle`'s comment reads "a
display re-roll: one concern of V9 §4.3's T12 row (`style.compass`, `naming.emblem`, `render.instances`)"; T-V10-4's
golden compares each with V09's New names (these, this quarter, the town), New emblem and New trees, byte for byte.

**SR-27 · minor · V09 · one kind homed under two tools (a way's split and merge; the case reconcile-V09-r1 left to this
round).** V9 §4.3 lists `split` of a way and `merge` of two ways under **T4** (**Split here**, **Join these**) and lists
`split`, `join` and `merge` again under **T9**; V9 §4.5's T4 row offers the two controls with no mapper bytes. By
J-V9.104's own rule (one home tool per kind; §7.1's T9 row owns `split`, and `merge` is on no row) they belong to T9.
*Required change:* the way row's tool cell reads "T9 `shape` (on a selected way: **Split here**, one click on it; with two
ways selected: **Join these**)"; V9 §4.5's T4 row drops the two controls, and T9's row's "on a way" controls gain them with
the mapper "Split here → `split { id: the way, cut: [the click point on its centre-line] }`; Join these → `merge { ids:
[the first selected, the second] }`"; J-V9.104 is extended to the two kinds (J-SS1.6); T-V9-12 reads it.

**SR-28 · major · V10 · no typed form for a way's split or merge.** V10's `ShapeInput` offers `split: { through: [Anchor,
Anchor] }` → `split { id, cut: [p1, p2] }` and `join: Ref[]` → `join { ids }` — a plot's two-point cut and a plot's
fusion (§7.1: "on plots, split and join are item 31's"); `RoadInput` has neither. "Split the road at the bridge" or "join
these two streets" therefore encodes a two-point cut on a way or a plot `join` on ways, where the canvas writes `split {
id, cut: [p] }` and `merge { ids }` (§7.1's ways row; SR-27). *Required change:* on a way target, `ShapeInput.split` takes
`{ at: Anchor }` → `split { id: target, cut: [the resolved point] }`, and `join` → `merge { ids: [target, ...join] }`; a
plot target keeps `through` and `join`; the T9 tool description tells the model which form a way takes; T-V10-4's golden
adds a way split and a way join, byte-equal with V09's Split here and Join these (SR-27); T-V10-1's T9 enumeration lists
`merge`.

**SR-29 · minor · V09 · the re-roll mappers state no salt and no scope.** V9 §4.5's T11 mapper writes `rerollLayer {
concern: naming, ids? }` for **New names** with its scopes "these, this quarter, the town", without the salt or the ids a
scope stands for; T12's New emblem and the compass re-roll state no salt (only New trees writes `salt: the concern's current
salt + 1`). *Required change:* T11's mapper reads "these → `rerollLayer { concern: 'naming', ids: the selection's named
entities, salt: 0 }`; this quarter → the same with `ids` the quarter and every `gazetteer` row whose district is the
quarter, read at the role's key, in address order (J-SS1.8); the town → `rerollLayer { concern: 'naming', salt: the
concern's current salt + 1 }` with no `ids`, through the fates sheet"; T12's New emblem and compass re-roll write `salt:
the concern's current salt + 1`, as New trees; a J-V9 row records the quarter scope.

### 7.4 Words, refusals and bends

**SR-30 · major · V09 · an engine refusal left without a row.** File f item 582 (J-VI.30) bends a user's placement no
plot fits, one over budget and an occupied join or split, but keeps F-EDIT for "an assignment, or the re-placement a
`rejectSite` causes, that no plot satisfies inside the hard rows (a dossier fact's conflict)". V09 renamed all three rows
that worded the old refusals (`refuse.noSite`, `refuse.overBudget`, `refuse.vacateFirst` → `bend.*`, IN-V09-16), so the
F-EDIT that stays has no row: T-V9-15's walker fails on its code, and V10's `rule` row — which, since SS-28, renders "V9
§4.9's `refuse.*` row for the code" and nothing of its own — has no sentence and no button for it. *Required change:* V9
§4.9 gains `refuse.assignment.noSite` — "No plot here suits {thing} as it is assigned. The closest places are marked." —
with the buttons "Put it at {site}" (a `placeAt` of the element on the first acceptable site, previewed) and "Show me
why", its codes that F-EDIT (§5.2 as item 582 amends it); IN-V09-16's last sentence names it among the refusals that stay;
T-V9-13's fixture list includes it. V10 needs no change (its `rule` row renders the code's row and offers its buttons by
V10 §3.5 step 3).

**SR-31 · minor · V10 · a bend alternative no row offers.** V10 §3.16's *The dry run's bends* (its list "Add a hoist
instead"; "Stairs along the front") and IN-V10-1 still give "Add a hoist instead" as a bend's alternative. Under J-VI.4 (d)
the sky access is the bend itself (`bend.raised.island`, whose alternative in V9 §4.9 is **Draw a road to its foot**), and
no V09 row offers a hoist (reconcile-V09-r1's note to this round). *Required change:* both places read "Draw a road to its
foot" (`bend.raised.island`; V9 §4.20.2 (6); J-VI.4 (d)) in place of "Add a hoist instead".

**SR-36 · minor · V09 · two bend alternatives with no events, which the clerk must carry.** V10 §3.16 makes each bend's
alternative a `propose` "carrying the events the canvas's button for that row commits". V9 §4.9's `bend.under.accessDug`
offers "Use another building" and `bend.under.accessOpening` "Dig from a building instead", and V9 §4.17.4 defines
neither's events; the second is unlawful where it appears, since steps 2 and 3 of the closure run only when no building
stands within `DigRule.maxM` of the cluster. *Required change:* "Use another building" re-previews the declaration with
step 1's dug access from the next building in step 1's order (plan distance, then address), offered only when another
qualifies; "Dig from a building instead" is removed from `bend.under.accessOpening`, whose buttons are "Show the way in" ·
"Show me why"; T-V9-37 or T-V9-38 checks both.

### 7.5 The base change record

**SR-32 · major · BASE-F · a note that overrides the request it applies.** File f item 372's note reads that BCR-V9-22's
"last resort reads, by J-VI.4, 'else a public opening of kind `collapsed_shaft` at the nearest public ground above the
cluster, cause `edit`' instead of F-EDIT". Since reconcile-V09-r1 (SS-35; J-V9.102) BCR-V9-22 has four steps: a dug
access, a public opening, a `collapsed_shaft` at the point of public ground over the cluster nearest in plan to its
shallowest element, and — where no public ground lies over the cluster — the dry run's bend of the declaration onto
ground part 0 over the same footprint (`bend.under.noAccess`). Applied as written, the note makes the shaft the last
resort and leaves no outcome where no public ground lies over the cluster (V09's lane note of 08:54 routed this to the
base record's reconciler, whose continuation had landed at 08:40). *Required change:* item 372's note reads "applied as
BCR-V9-22 reads after reconcile-V09-r1 (SS-35; J-V9.102): … else a public opening of kind `collapsed_shaft` at the point
of public ground over the cluster nearest, in plan, to its shallowest element, cause `edit`; where no public ground lies
over the cluster, the dry run bends the declaration onto ground part 0 over the same footprint, named `bend.under.noAccess`
with 'add a way down' (item 101 R2)".

### 7.6 Statuses and single sources

**SR-33 · minor · V10 · statuses left open after their halves landed.** CVR-V10-17 is not marked met, though V09 applied
it (V9 §4.9's `refuse.clerk.<category>` family row, T-V9-15, V9 §4.20.2 (5); landed 08:54, V09 `94ce6753…`); §13's
second-brief paragraph still says "Until it lands, the catalogue loader … T-V9-15's family check reports the two as
missing"; CVR-V10-14's V08 part is met (V08 §4.6, X11, T-V8-45; SS-43); CVR-V10-3's row lacks the **Met** that V10 §3.17
already states (V08 §3.1's `connect-src`, T-V8-27's list, V08 §4.4 (4)). *Required change:* CVR-V10-17 and CVR-V10-3 marked
**Met** with those citations; CVR-V10-14 marks its V08 part met; §13's "Until it lands …" sentence is replaced by "landed
08:54 (V09 `94ce6753…`)".

**SR-34 · minor · V09 · statuses left open after V08 landed.** XV-V9-24 is met in V08's text (V08 §3.1 step 7 (b), §3.8,
§5.2, T-V8-47; round 4, landed 07:32) and XV-V9-26 in V08's (§5.2's row, §1b, BCR-V8-15; landed 08:57), both still open
in V9 §10.2, and V9 §12's PLAUSIBLE "that volume 8 adopts XV-V9-24" and "that the gazetteer can list `customChain`
records (XV-V9-26 asks volume 8)" stand. *Required change:* both rows marked **Met** with those citations (XV-V9-26's
listed rule as SR-25 leaves it), and the two PLAUSIBLE clauses moved to CONFIRMED.

**SR-35 · minor · V09 · two sibling rules restated.** V9 §4.15 lists V10 §3.6 rule 1's anchors by kind ("a quarter's
first area-label spine midpoint, a plot's or building's centroid or inscribed centre, a way's or a river course's
half-length point, a gate's own point, …"), and V9 §5.4 and XV-V9-26 restate V08 §5.2's legend rule ("a chain's label in
the legend only when the key admits every node"), which SR-25 changes. *Required change:* V9 §4.15 reads "the target's
`EntityCard.anchor` (V10 §3.6 rule 1)" without the list; V9 §5.4 reads "drawn, labelled and listed by V08 §5.2's
`supplyChains` row" without its rule; XV-V9-26 cites V08 §5.2.

## 8 Disposition summary of the continuation

| owner | blocker | major | minor | ids |
|---|---|---|---|---|
| V09 | 0 | 2 | 5 | SR-22, SR-30 (majors); SR-27, SR-29, SR-34, SR-35, SR-36 (minors) |
| V08 | 0 | 2 | 1 | SR-23, SR-25 (majors); SR-24 (minor) |
| V10 | 0 | 2 | 2 | SR-26, SR-28 (majors); SR-31, SR-33 (minors) |
| BASE-F | 0 | 1 | 0 | SR-32 |

Continuation totals: 0 blockers, 7 majors, 8 minors (15); round 0's continuation SS-28 – SS-46 all fixed. Pairs to
apply together: SR-22 with SR-23 (the panel's rows and the report's field), SR-26 with SR-29 (the clerk's and the
canvas's re-roll bytes), SR-27 with SR-28 (a way's split and merge on T9 in both volumes), SR-25 with SR-34 and SR-35
(XV-V9-26's rule). **Routing:** the owners' next reconcile lanes (reconcile-V08, -V09, -V10 and -BASE-F of the round that
consumes this file).

**Consistent across the seam (checked in this continuation, no finding).** Every engine code V10 §3.16's `lock`, `rule`
and `dossier` rows name has its V9 §4.9 row (`refuse.locked`, `.kept`, `.staged`, `.islandsRung`, `.warp`, `.water`,
`.undo.*`, `.assigned`, `.dossierOwned`, `.dossierRemove`, `.roster.dossier`); V9 §4.9's `refuse.clerk.<category>` family
row, T-V9-15 and T-V10-29 agree (no key for `lock` and `rule`); `bend.place.noSite`, `.overBudget` and `bend.vacate` with
V10's `bent` line, its alternatives as `placeAt { plot }` and **Keep {building}** as Drop; the terrace's `water` on both
paths; the uphill well and the rim move as bends on both sides; BCR-V10-19's scratch figures, V10 §3.17's selection
(`builtin` without a transport is A in host mode) and V08 §6's with-turn bars; T-V9-64's scripted host page and T-V10-20's
scripted `ClerkMount.host`; AP5b at M-SF with V08's SF4 and SF6; V9 §3.14's three load outcomes and V08 §3.8, §4.2, §5.2
and T-V8-47 in host mode; `fileMenu: false` and V08 §5.1's list; `effectiveKey()`'s `admitAs` form and
`ClerkTranscript.key`; the `host.*` families of X12 and V9 §4.9's sentence; file f items 348, 453, 472, 570 – 572 and 582
against their requests.

## 9 Decisions, CONFIRMED versus PLAUSIBLE of the continuation

**Decisions (vetoable).**
* **J-SS1.4** — chose to continue this lane under its key rather than return the 04:26 summary under the resume rule,
  because the re-issued brief's issue set (round 0 now SS-01 – SS-46) is wider than that landing covered, as
  reconcile-V08-r1, -V10-r1 and -BASE-F-r1 did for their second briefs; the 04:26 content stays as written.
* **J-SS1.5** — chose to sweep by reading whole every change since round 3's inputs (the last completed surfaces sweep;
  round 4 was cut at its skeleton), plus the contract sections those changes touch, over a sixth whole read of the three
  volumes (about 1.5 MB), because rounds 1 – 3 and round 0's continuation read the rest whole and the owner's ~300k-token
  checkpoint would cut a whole read before its findings were written.
* **J-SS1.6** — chose T9 as the home of a way's `split` and `merge` (SR-27, SR-28) over T4, because J-V9.104's rule gives
  each kind one home tool, §7.1's T9 row owns `split` and lists the way's `setAttr` there already, and T4's row lists
  `drawWay` only.
* **J-SS1.7** — chose to carry the standing notes on `GenerationReport.dossierNotes` (SR-23) over a new `query` kind,
  because the report panel already reads `report(h)`, the report is a derived cache rebuilt by every derivation, and the
  notes change only with the log.
* **J-SS1.8** — chose "this quarter" in New names to mean the quarter and every named entity whose district it is (SR-29,
  SR-26) over the quarter's own name alone, because a user asking for new names for a quarter means the names in it, and
  the town-wide and selection scopes already cover the other readings.
* **J-SS1.9** — chose to hide a custom chain whole — drawing, legend, gazetteer and export — when the key withholds any of
  its nodes (SR-25) over listing it as an "unnamed" row, because a chain is a relation whose line reveals where each node
  stands, and V09's T-V9-68 already expects the entry absent.
* **J-SS1.10** — chose not to file that V08's stored notes carry English words as args (a class's display label, V9
  §2.7's chip words, a land use's label), because English is the only shipped locale and V9 §2.9's `MsgRef` passes words
  for every engine line; a second locale is a new capability, and its lane decides how stored args are worded.

**CONFIRMED (both sides read in the live text; the lines are cited in each finding):** the nineteen re-checks of §6 and
all fifteen findings SR-22 – SR-36, each located in the text it names; SR-32 by reading file f item 372 against V9 §4.17.4
and BCR-V9-22; SR-30 by a search of V09 for any row carrying the F-EDIT item 582 keeps (none); SR-26 against the base's
`rerollLayer` event (§7.1) and its salt rule (§6.1); SR-23 against the base's `GenerationReport` (§5.4); every item of
§8's consistent list. Inputs were unchanged from start to end (md5 as in §5).

**PLAUSIBLE:** that the sections of the three volumes untouched since round 3 hold no new seam defect — rounds 1 – 3 and
round 0's continuation read them whole, and this continuation read only their changes and the contract sections those
changes touch (J-SS1.5); and that SR-30's row text, SR-22's head keys and SR-29's quarter scope need no further readability
or fixture change once their owners write them (T-V9-15's step and T-V9-13 settle it).
