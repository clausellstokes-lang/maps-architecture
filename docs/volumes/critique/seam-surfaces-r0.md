# Seam check: the application (V09), the clerk (V10) and the host (V08) — round 0

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-surfaces-r0; covered by the whole-design retrovalidation (J84).

PROGRESS
- §0 Method, inputs and coverage | done
- §1 Seam census (tool vocabulary, preview protocol, knowledge rule, host clerk seam) | done for the parts read (§0)
- §2 Findings SS-01 – SS-27 | done for the parts read; CONTINUE from §0's open list (findings from SS-28)
- §3 Disposition summary by owning volume | done for SS-01 – SS-27
- CHECKPOINT (2026-09-29): the owner's ~300k-token stop reached; the whole read of the parts listed in §0 "Open" is not done
- CONTINUATION (2026-09-29 08:16, CONTINUE rule: file present, CHECKPOINT 02:38, no LANDED) | done
- §4 Continuation: method, inputs, coverage | done
- §5 Findings SS-28 – SS-46 (against the live text, md5s in §4) | done
- §6 Disposition summary of the continuation | done
- §7 CONFIRMED versus PLAUSIBLE of the continuation | done

## 0 Method, inputs and coverage

Inputs (md5 at start): V09 `c3c425f5…` (3 696 lines), V10 `e5edacf6…` (3 063), V08 `121043f8…` (2 746), `_integrate.md`
`e6808ba9…`, file f `7e76cc92…`; base `docs/ARCHITECTURE.md` §7.1 (the toolkit table, the sugar paragraph), §4.7's
`Designation`, §11.3 (by grep). Method: every cross-reference on the seam read in the volume that states it and checked
against the text of the volume it names; each finding below was read on both sides before filing (none is inferred from
a census hit alone).

**Read whole:** `_integrate.md`; file f; V10 §0–§8 (l. 1–2560), V10 §10.1 BCR-V10-1, -5, -6, -7, -13, -20, V10 §10.2,
§10.3, Integration notes; V09 §2.2–§2.11 (l. 394–735), §4.2–§4.8 (l. 1165–1426), §4.11 (l. 1638–1694); V08 §2.2
(l. 378–451), §4.4 (l. 1900–1942), §5.4 (l. 2047–2075). **Read by targeted grep, then in context:** V09's catalogue rows
for `bend.catacomb.*`, `bend.crypt.*`, `info.catacomb.*`, `info.raised.*`, `info.remove.holds`; V09's absence of any
card-only drawer, `newTopic`, defect list, `transport`/`needsToken` and `WhySection` rendering (zero hits, each
confirmed by the whole read of §2.10 and §4.11).

**Open (for the continuation; CONTINUE rule):** V10 §9, §10.1's other BCRs, §11–§13; V09 §0–§1b, §2.1, §2.12, §3,
§4.1, §4.9–§4.10, §4.12–§4.20, §5–§13 and its Integration notes; V08 whole except §2.2, §4.4, §5.4; base §11.2 and
§14 whole. Expected yield: the §1b wiring rows of V09 and V08 against V10 §1b, V09 §3.3's preview pipeline against
V10 §3.11, V09 §4.20's item-110 gestures against V10 §4.1's forms, V08 §3.1's `connect-src` (CVR-V10-3) and V09 §6's
Delete budget (V10 §6.1's removal row).

**Decision recorded (vetoable):** J-SS.1 — stopped at the owner's ~300k-token checkpoint instead of reading on, because
the three volumes alone are ≈ 1.1 MB (≈ 450k tokens) and the rule is the owner's (CLAUDE.md efficiency standard 7);
the findings filed are complete for the seam's four named contracts as far as their defining sections go.

## 1 Seam census (what each side states)

| contract | producer / declarer | consumer | state |
|---|---|---|---|
| tool vocabulary | base §7.1's toolkit table; V09 §4.3/§4.5 (canvas mappers); V10 §2.12/§4.1 (encoders) | T101-3 / T-V10-4 byte equality | SS-11, SS-12, SS-13, SS-14, SS-27 |
| preview protocol | BCR-V10-6, BCR-V9-10/-12/-27; V10 §3.11, §4.2 | V09 §2.4, §4.11 | consistent except SS-26 |
| drawer contract | V09 §2.10 (`ClerkSlot`, `ClerkMount`, `ClerkHandle`) | V10 §2.6 (`ClerkHarness`) | SS-07, SS-08, SS-09 |
| knowledge rule | §11.2 *Knowledge*, BCR-V10-1; V09 §4.8 (`viewAs`, BCR-V9-23) | V10 §3.12 | SS-10 |
| explanations | V10 §2.13 `WhyAnswer` (sections), §3.9, §3.9a | V09 §2.7 `WhyCardModel`, §4.9 catalogue | SS-15, SS-16, SS-18, SS-25 |
| host clerk seam | BCR-V10-7, V10 §3.17 | V08 §2.2 `MapSession`, §4.4, §5.4; V09 §2.2 `HostSlots` | SS-01 – SS-06 |

## 2 Findings

Severity: **blocker** (breaks an owner ruling), **major** (a contradiction or an unwired piece a builder would hit),
**minor** (wording, a type left loose, a restatement). Each names one owning volume and the exact change.

### 2.1 The host clerk seam

**SS-01 · blocker · V08 · contradiction with an owner ruling (J86, door 1).** V08 §5.4 (3) puts the words-only
projection in the host client ("The client's `query` passes the answer through a projection … published with the
client"), and §4.4 (1) returns "the projected answer" from the page; BCR-V10-7 (c) and V10 §3.17 apply it in the module
"before an answer leaves the frame". A client-side projection means full answers — coordinates, rings, bearings — cross
into SettlementForge's page first, which door 1 forbids; and two components would each own the projection.
*Required change:* V08 §5.4 (3) and §4.4 (1) read: "In host mode the module applies the host projection to every
`query.result` before it is posted out of the frame (BCR-V10-7 (c)): this section's rows for the base's kinds, V10
§3.17's for the reader kinds; the host client receives only projected answers and carries no projection code." T-V8-27
asserts on the bytes the module posts, not on the client's output.

**SS-02 · major · V08 · type mismatch.** `MapSession.setClerk` types the transport `{ baseURL; token; expiresAt: string }`
with no `fallbacks`; BCR-V10-7 fixes `expiresAt: number` and adds `fallbacks?: 'server'|'client'|'none'` (V10 §3.17).
*Required change:* V08 §2.2's `setClerk(config)` takes BCR-V10-7's `clerk.config` body by citation (generated from
`@plat/api`'s bridge schema, as the client's other types are), not a restated shape.

**SS-03 · major · V08 · unwired.** V10's host proposal intake has no caller: `MapSession.preview(events, view?)` cannot
carry `proposal` (BCR-V10-7 (b)), `MapSession.on` has no event for `clerk.proposal { id, status, seqs? }` or
`clerk.config.refused { reason }`, and §4.4 (3) describes a `preview { events, view: true }` with "its one-line reason and
variations" that the base message cannot carry. *Required change:* `preview(events, o?: { view?: boolean; proposal?:
<BCR-V10-7 (b)'s proposal> })`; `on('clerkProposal' | 'clerkConfigRefused', h)`; §4.4 (3) cites V10 §3.17's intake (the
card in the frame, Accept → `doc.changed` with `proposedBy: 'clerk'`, the `clerk.proposal` answer) instead of
describing it.

**SS-04 · major · V08 · contradiction.** V08 §4.4 (2) offers the host clerk `gazetteer`, `people`, `relations`,
`whereIs` and `why` only; V10 §3.17's projection table and CVR-V10-3 offer `brief`, `entity`, `sites`, `frame` (without
`near`/`radiusM`), `rule`, `profile`, and refuse `measure` with `E_HOST_KIND`. A host builder cannot tell whether
`brief` is available. *Required change:* V08 §4.4 (2) and §5.4 (3) list the offered kinds by citing V10 §3.17's table
(`measure` refused `E_HOST_KIND`, `hit` and `inView` not offered); T-V8-27's fixture list gains `brief`, `entity`,
`sites`, `why` with sections, `frame` without radius, `rule`, `profile` (CVR-V10-3).

**SS-05 · minor · V08 · contradiction.** V08 §4.4 (4): "The only dossier prose the assistant receives through the map is
the description seed"; V10 §1b.5 and BCR-V10-14: this port line carries no description seed (CVR-V10-3 asked §4.4 (4)
to follow). *Required change:* §4.4 (4) reads "The map passes no dossier prose to any assistant: this port line carries
no description seed (V10 §1b.5; BCR-V10-14); SettlementForge's assistant has the dossier on its own side."

**SS-06 · major · V09 · unwired (CVR-V10-4 unmet).** V10 §3.17 shows a host clerk's proposal "through the drawer's
`turns` stream (the drawer opens in a card-only mode when the built-in clerk is off)"; V09 §2.2 hides the drawer for
`clerkMode` `'host'` and `'off'`, §4.11 shows the Assistant button only for `builtin`, and no card-only mode exists — so
V08 §4.4 (3)'s promised card has no screen. *Required change:* V09 §2.2 and §4.11 add the card-only drawer: in host
mode `ShellConfig.clerk` is always set (kind `'host'` when `clerkMode` is `'host'` or `'off'`), and a `Proposal
{ source: 'host' }` arriving on `turns` opens the drawer showing that card alone (no message box, settings or meter),
its AI mark naming the host's assistant, closing on Accept or Drop.

**SS-07 · major · V09 · unwired.** The harness has no channel to the bridge: `HostProxyBackend` needs `clerk.config`'s
transport and `capUsd`, the harness must send `clerk.needsToken` and `clerk.config.refused`, receive `preview
{ proposal }` and answer `clerk.proposal` — but `ClerkMount` (V09 §2.10) holds only `doc`, `view`, `role`, `selection`,
`openNewDocument`, `showScratch`, and `HostSlots.clerkMode` carries the mode alone. *Required change:* V09 §2.10's
`ClerkMount` gains `host?: { config(): ClerkConfigBody | null; onConfig(h: (c: ClerkConfigBody) => void): () => void;
needsToken(): void; refused(reason: 'origin'): void; proposals: AsyncIterable<HostProposalBody>; answer(id: string,
status: 'accepted'|'dropped'|'stale'|'failed', seqs?: number[]): void }`, filled by the embed's bridge handler (V08 §3.1),
the body types BCR-V10-7's; V10 §2.6 and §3.17 name `mount.host` as their source.

### 2.2 The drawer contract

**SS-08 · major · V09 · unwired.** V10's `ClerkHarness` adds `run`, `newTopic`, `defects`, `clearDefects` and a
`setKey` returning the key verdict "the drawer's buttons and settings need" (J-V10.57), but `ClerkSlot.mount` returns
V09's `ClerkHandle`, which has none of them; V09 has no New topic control, no defect list, and `setKey(): void` leaves
the key card unable to show "That key isn't valid". *Required change:* V09 §2.10 declares these members on
`ClerkHandle` (`setKey(): Promise<ClerkSettings['keyState']>`), §4.11 adds **New topic** (the drawer's menu) and shows the
key verdict on the key card, and §5.12's Assistant section lists the defect records with **Save as file** and **Clear**
(V10 §2.8).

**SS-09 · major · V10 · contradiction.** Who runs a `ClerkAction`: V10 §2.6 says the harness runs `propose`, `undo`,
`fork`, `rerun` and "passes back" `select`, `openSettings`, `useTool`, `export` (no callback exists in `ClerkMount`);
V09 §4.11 runs `fork` (`forkAt`) and `rerun` (`rerunFrom`) itself and has no `rebuild` ("Put it back", V10 §4.3).
*Required change:* V10 §2.6 states one dispatch table — the harness runs `propose`, `undo`, `rebuild`; the application
runs `select`, `openSettings`, `useTool`, `export`, `fork` (V9 §3.9's `forkAt`) and `rerun` (`rerunFrom`), dispatching
by `kind` before calling `run` — and V09 §4.11's action list cites it and adds `rebuild` → **Put it back**.

**SS-10 · major · V10 · unwired knowledge rule.** V09 §4.8 (BCR-V9-23) makes **View as** a display filter,
`ViewOpts.viewAs`, read as the lower of the key and `viewAs` "by … the clerk's reads for this drawer"; V10 §2.3 and §3.12
take the session key from `ViewState['knowledge']` alone and never read `viewAs`, so an owner viewing the town as a
player keeps a clerk that reads and speaks at `secret`. *Required change:* V10 §2.3's `key` is the effective key
`min(knowledge, viewAs)` (BCR-V9-23), re-read on a change of either; a lowered effective key clears the session and a
raised one closes the segment (V10 §3.12 (6)); T-V10-6 adds a `viewAs` case. (V09's `ClerkMount` exposes the effective
key, with SS-07's change.)

### 2.3 The tool vocabulary

**SS-11 · major · V09 · contradiction with the base and V10.** V09 §4.5's T6 mapper writes `placeAt { from,
designation: { cls, name } }`; the base's `Designation` is `{ cls, use, specialisation?, assignment? }` (no name) and V10
§4.1 emits `placeAt { plot: '', from, designation: { cls, use } }` then `setAttr { path: 'name' }` on the created use.
T101-3 and T-V10-4 require the canvas and the clerk to emit the same bytes. *Required change:* V09 §4.5's T6 mapper cites
V10 §4.1's `where.at`/`where.plot` rows as the one mapping (designation `{ cls, use }`; the name as a `setAttr` on the
created use, one group).

**SS-12 · major · V10 · contradiction.** A place by a locus: V09 §4.5 emits a one-line `roster { lines: [{ name, cls,
locus }] }` so the engine mints the assignment id from the sugar's `seq` ("the app never writes an assignment id");
V10 §4.1 emits `assign` "its `id` minted as the canvas's `assign` mints it (§6.3)" — a canvas behaviour V09 does not
have. *Required change:* V10 §4.1's `where.locus` and `where.free` rows emit V09's one-line `roster` (citing V9 §4.5),
and the sentence about canvas-minted `assign` ids is removed.

**SS-13 · major · V09 (base change) · base conflict.** `roster` is T7's kind in §7.1's toolkit table; a T6 gesture
emitting it (V09's locus drop, and V10 after SS-12) breaks T101-2's "each tool emits its row's kinds" and T-V10-1.
*Required change:* V09 §10 files a BCR on §7.1's authoring toolkit table: T6's row reads "`placeAt` (its point form),
`assign`, `build`, `drawFootprint`, and a one-line `roster` (a place by a locus)"; T-V9-12 and T-V10-1 read the row.

**SS-14 · major · V10 · unwired.** `HoldInput.op: 'reroll'` with `layer` encodes `rerollLayer` "for the concerns V09's
registry lists under T10" — but T10's row (§7.1; V09 §4.3, §4.5) lists no `rerollLayer` and V09 lists no concern under
T10, so the form emits a kind outside its row (T-V10-1 fails) over an empty enumeration. *Required change:* V10 drops
`reroll` and `layer` from `HoldInput` and from §3.4 (1)'s enumeration list; naming re-rolls stay `name.newNames` (T11)
and style re-rolls `dress.restyle` (T12), which V09's rows carry.

**SS-27 · minor · V10 · unwired.** `ShapeInput.siting` writes `place`, `quarter`, `pin`, `profile` but not V09 §2.6's
`weights` (the family multipliers on `siting.declared`), so "tanneries should care less about the river" is reachable
only through the raw hatch. *Required change:* `siting.weights?: Partial<Record<<V11 §2.4's eight families>, 0|0.5|1|2|3>>`,
encoded into the same upsert.

### 2.4 The preview protocol

**SS-26 · minor · V10 · contradiction.** Acceptance's re-check (V10 §4.2 (1): counts, fates by address, renames) omits
the effects list, while V10 §3.11's equality and staleness checks and V09's card include it — a changed effect list
would commit consequences the user did not see. *Required change:* §4.2 (1)'s check adds the effects' kinds and counts,
as §3.11 (4).

**SS-22 · minor · V09 · restatement that drifted.** V09 §4.11's *Apply-then-undo* lists two never-applied cases and
omits V10 §4.4's third (effects with `removed`, `lost` or `displaced`). *Required change:* cite V10 §4.4; drop the list.

### 2.5 Explanations and words

**SS-15 · major · V09 · unwired.** `WhyAnswer.sections` has no screen: `WhyCardModel` (V09 §2.7) has no section field
and its table no row reading `sections`, while V10 §3.9 says "the section names V09's why card renders … are exactly
those in this table's first column and this volume's `raised`" — the `underground`, `crypt`, `massing`, `plan`,
`fabric`, `island`, `move` and `raised` rows the providers produce reach no panel. *Required change:* `WhyCardModel`
gains `sections: { kind: string; title: MsgRef; rows: { text: MsgRef; value?: string; tier: FactTier; target?: Id;
withheld?: true }[] }[]`, drawn after `facts` in registration order, with a §2.7 table row reading `sections` (each row's
`says` rendered by the catalogue); V09 §4.17's panels and §4.20.6's why lines read the same rows.

**SS-16 · major · V09 · unwired (CVR-V10-4 unmet).** The catalogue lacks the key families V10 renders: `critique.K1`–
`K18`, `refuse.clerk.*`, `clerk.notice`, `info.under.*`, `info.crypt.*`, `info.raised.<outcome>` (ten outcomes; V09 has
`info.raised.count` and `.walk` only), the `withheldWords` kind words, and `info.catacomb.*` per value of `source.kind`
and the burial-face outcome (V09 has `stagnant`, `stopped`, `overCount`). T-V10-29 and T-V9-15 fail. *Required change:*
V09 §2.9 and §4.9 state that the catalogue file carries these families with V10 §3.9, §3.9a, §3.10, §3.16 and §3.20's
`en` texts as their single source, and T-V9-15 covers them.

**SS-17 · major · V10 · contradiction.** `RefusalCategory` (V10 §2.9) has no `bend`, yet §3.16 and IN-V10-1 (J-VI.4)
file item 110's named bends "in the `bend` category"; `clerk.content.refusals` and T-V10-29 cannot hold it, and a bend
is `DraftItem.bent`, not a refusal. *Required change:* §3.16's paragraph reads "these are bends: each reaches the model and
the card as the item's `bent` line (`DraftItem.bent`, `ProposalView.variations[].bends`), its alternatives as `propose`
actions; no refusal category is used."

**SS-18 · minor · V10 · open choice.** K17's detector reads "V09's `bend.crypt.cathedral` or `bend.crypt.largest`, or
V03's announcement, whichever the owning revisions settle"; V09 §4.9 now carries both keys (V9 §4.17.5 (e)).
*Required change:* cite the two keys; drop the alternative.

**SS-25 · minor · V10 · restatement.** V10 §5.4 quotes `info.remove.holds` as "The town won't rebuild this; undo brings
it back"; V09 §4.9's row is "The town won't {rebuild | raise} this {kind}; undo brings it back." *Required change:* V10
cites the key without its text (and states that `info.raised.suppressed` is the `raised` section's row and V08's history
line, `info.remove.holds` the card's).

**SS-24 · minor · V10 · term.** The user-facing noun: V10 §3.20 titles the drawer "Clerk (AI)"; V09 §4.11's button, cards
and catalogue and V08 §4.2's "Assistant settings" say "Assistant (AI)"; V10's own refusal texts mix both. *Required
change:* V10 §0, §3.16's templates and §3.20 use the catalogue's "assistant" ("Assistant (AI)"); "clerk" stays the
internal name (package, types); V09 §2.10's `ClerkSlot.label` comment follows.

**SS-23 · minor · V09 · restatement.** V09 §4.11's *What the assistant sees* "shows V10 §5.4's read-only map block";
V10 §5.4 shows the map block and the vocabulary block with every dropped row and why. *Required change:* cite V10 §5.4
without restating its contents.

### 2.6 Types and single sources

**SS-19 · minor · V10 · single source (J-VI.8).** §4.1's `where.slot` row cites `deck.landmarkMinSpanM` (BCR-V9-30);
J-VI.8 homes the value in V11's `deck.landmarks/bridgeMid/minSpanM`. *Required change:* cite V11's cell.

**SS-20 · minor · V10 · type.** `MapBrief.walls[].open[].barrier: string`, while `WhyAnswer.closure.barrier` is J-VI.3's
six kinds and V09's preview arcs adopt them. *Required change:* type it `'shore'|'cliff'|'gorge'|'marsh'|'sheer'|'enceinte'`.

**SS-21 · minor · V10 · type.** `WhyLink.chain: { id: string; status: string }` versus V09's `LinkRow.chain.status:
'impaired'|'vulnerable'` with `entrepot?`. *Required change:* V10's `WhyLink.chain` is typed `{ id: string; status:
'impaired'|'vulnerable'; entrepot?: 'consumer'|'provider' }` and V09's `LinkRow` cites it.

## 3 Disposition summary by owning volume

| owner | blocker | major | minor | ids |
|---|---|---|---|---|
| V08 | 1 | 3 | 1 | SS-01, SS-02, SS-03, SS-04, SS-05 |
| V09 | 0 | 7 | 2 | SS-06, SS-07, SS-08, SS-11, SS-13, SS-15, SS-16, SS-22, SS-23 (SS-13 files a BCR on §7.1) |
| V10 | 0 | 5 | 8 | SS-09, SS-10, SS-12, SS-14, SS-17, SS-18, SS-19, SS-20, SS-21, SS-24, SS-25, SS-26, SS-27 |

Totals: 1 blocker, 15 major, 11 minor.

CONFIRMED (both sides read in the text, line cited in the finding): all 27. PLAUSIBLE: none filed; what the unread parts
(§0 "Open") may add is not claimed.

## 4 Continuation — method, inputs and coverage (2026-09-29, CONTINUE rule)

**Why a continuation, and against which text.** Round 0 stopped at its checkpoint (02:38) with the parts in §0 "Open"
unread. Its 27 findings are history: reconcile-V08-r1, reconcile-V09-r1 and reconcile-V10-r1 fixed all of them (lane log
03:53, 04:01, 04:03), and rounds 1 – 3 re-checked them. Those rounds did not close round 0's gap: round 1 listed V09
§4.12 – §4.15, §4.17 – §4.20, §6 – §13, V10 §9, §11, §12 and V08 §2.1, §2.3 – §2.8, §3.2 – §3.13, §6 – §13 as "read whole
by round 0", which they were not, and rounds 2 and 3 read only their diffs and the four contracts. This continuation reads
round 0's Open list whole **in the text as it stands now** (after reconcile round 4 and the integration continuation of
08:13), so the findings below are against the live files, not against round 0's inputs; they are numbered on from SS-28.

**Inputs** (md5 at the continuation's start; snapshots in `scratchpad/volumes/ssr0c/`): V09 `629ab776…` (4 230 lines),
V10 `8629cefa…` (3 424), V08 `9a721ae2…` (3 223), `_integrate.md` `965ab696…` (468), file f `991f27f3…` (1 335), the base
`docs/ARCHITECTURE.md` `01fea21f…`.

**Method.** Every section of round 0's Open list read whole; every cross-reference on the seam that such a section makes
read on the other side (by grep, then the whole paragraph or table in context) before a finding is filed; a finding
already raised and fixed in rounds 0 – 3 is not re-filed. Routing: round 0's reconcilers have landed, so these findings
are for the next surfaces round's re-check and its reconcilers (the lane log carries the pointer).

## 5 Findings of the continuation (SS-28 onward)

### 5.1 Words, bends and refusals

**SS-28 · major · V10 · contradiction with file f item 582 and J-VI.4 (item 101 R2).** V10 §3.16's `rule` row still
refuses "any other F-EDIT: a hard row, an invalid shape" with "The rules don't allow that there: {rows}", its
alternatives "the closest acceptable sites or shapes". Since the integration continuation (08:13; J-VI.30, file f item
582, IN-V09-16) a user's positive placement that no plot fits inside the hard rows, one over its disruption budget, and an
occupied `join`/`split` are **bent** (V09 `bend.place.noSite`, `bend.place.overBudget`, `bend.vacate`), and an invalid
value is clamped (`bend.invalid`); V10 has no "582" anywhere and its bends paragraph covers item 110's bends only. A
clerk proposal placing a guildhall where no plot fits would be refused in the drawer and bent on the canvas. Second, the
drawer's `rule` and `lock` templates are their own sentences for engine refusals V09's catalogue already words
(`refuse.locked`, `refuse.kept`, `refuse.staged`, `refuse.islandsRung`, `refuse.warp`, `refuse.water`,
`refuse.undo.*`), against J-V9.79's one sentence per engine code. *Required change:* V10 §3.16's bends paragraph is
retitled "The dry run's bends" and reads that every `bend.*` row of V9 §4.9 — item 110's and file f item 582's among
them — reaches the model and the card as the item's `bent` line with its alternatives as `propose` actions, no refusal
category used; the `rule` row's *when* reads "an F-EDIT that is neither dossier-owned nor a lock and that the dry run
does not bend (a kept record in the way, a staged layer, the rung, a warp or new water reaching a held record, an undo's
dependence)" and its template column reads "the engine's `MsgRef` — V9 §4.9's `refuse.*` row for the code — as its
sentence"; the `lock` row's template likewise renders `refuse.locked`; T-V10-29 checks that no engine code has a second
English sentence in `clerk.content.refusals`.

**SS-29 · major · V09 · internal contradiction that V10 built on.** V9 §3.7 puts the layer chips **trees only** and
**names only** (`rerollLayer` on the concern) on T10's **Try again**, and T-V9-6 drives "trees only" town-wide; V9 §4.3's
T10 row (and the base's §7.1 T10 row) lists no `rerollLayer`, and no row of V9 §4.3 carries the trees concern (T11 carries
`rerollLayer(naming)`, T12 `style.compass` and `naming.emblem`). So the canvas's T10 emits a kind outside its row
(T101-2, T-V9-12 fail), and V10's J-V10.84 — which dropped the layer re-roll from `hold` because "T10's row lists none" —
leaves the trees re-roll with no clerk form at all (the history line "New trees", V9 §4.10, has no clerk route).
*Required change:* V9 §3.7 removes the layer chips from Try again: "names only" is T11's **New names** with its scope (V9
§4.3's T11 row), and "trees only" becomes T12's **New trees**, `rerollLayer` of the trees concern, added to V9 §4.3's
T12 row beside `style.compass` and `naming.emblem` (so V10's `DressInput.restyle.concern`, whose enumeration reads that
row, reaches it with no change in V10); T-V9-6 reads "New trees" (T12) in place of "trees only".

**SS-30 · minor · V09 · wording that drifted from the fix of SS-17.** IN-V09-16 says item 582's bends are ones "the
clerk (volume 10) files … under `bend`"; V10 has no `bend` refusal category (its §3.16 renders a bend as the item's
`bent` line, SS-17). *Required change:* IN-V09-16's clause reads "the clerk renders them as the item's `bent` line with
its alternatives (V10 §3.16; SS-17, SS-28), no refusal category".

**SS-31 · minor · V09 · undefined point on the words route of the tool vocabulary.** V9 §4.15's *Declaring in words*
puts T5's seed "at the market's anchor" and T4's two points "at their anchors" without saying which point; V10 §3.6
rule 1 defines the anchor by kind (a square's first area-label spine midpoint, a plot's centroid or inscribed centre, a
way's half-length point, …) and serves it as `EntityCard.anchor`. Two builders would pick two points, and the same words
typed on the canvas and said to the clerk would emit different bytes (T101-3). *Required change:* V9 §4.15 reads "at the
target's `EntityCard.anchor` (the point V10 §3.6 rule 1 defines by kind)" and T-V9-13's locus cases compare the point
with the clerk's encoding of the same words.

**SS-32 · major · V09 · J-VI.4's decided bends (g) and (h) not carried into the screens and rows.** J-VI.4 (h) (and file f
item 362's note, and V09's own BCR-V9-26 (b) after IN-V09-15) decide that "an uphill aqueduct with no source above its
terminal within reach becomes a well at the terminal", the former offer now the bend; J-VI.4 (g) that "a retaining wall
or terrace on or along a rim moves inward past the rim walk" in the dry run. V9 §4.20.2 (5) still reads "the refusal
`bend.aqueduct.uphill` offers **Put a well at {terminal} instead**", its catalogue row says only what failed ("No spring
or river lies high enough …") with the well as a button; V9 §4.20.9 says the rim cases "are refused in V05's words …
with **Move it inside the rim**: the app moves every point … and previews again" (an application-side correction the
clerk and a skeleton never get). A builder cannot tell whether the dry run commits the well and the inward move or
returns nothing. *Required change:* V9 §4.20.2 (5) reads "with none in reach, the dry run bends the stroke to a well pin at
the terminal (`instance { op: 'add' }`; J-VI.4 (h)), named by `bend.aqueduct.uphill`, whose alternative is **Show me
why**"; the row's text reads "No spring or river lies high enough within {km} km to feed {terminal}, so it has a well
instead." with the button "Show me why" only; V9 §4.20.9's T2/T3 bullet reads "on or along the rim strip the dry run moves
the stroke inward past the rim walk (J-VI.4 (g)), named by `bend.retaining.rim`", J-V9.76's application-side move is
withdrawn, and the row's text becomes J-VI.4 (g)'s "The rim walk stays level; the wall stands inside it." with "Show me
why". The bars follow: T-V9-52's "an aqueduct from a lower source is bent or refused with its offer; a raised stroke to
an island's rim leaves 0 ways and one offered access" reads "… is bent to the nearest higher source, else to a well at
the terminal (J-VI.4 (h)); a raised stroke to an island's rim commits 0 ways and one sky access (J-VI.4 (d))", and
T-V9-59's "each of V02's refusals shows its row with its offer" reads "each of V02's former refusals shows its `bend.stack.*`
row, pre-selected, with its alternative (J-VI.4 (i))". The decisions follow: J-V9.75 reads "a well pin as the bent
result of an aqueduct with no higher source (J-VI.4 (h))", J-V9.76 is marked "withdrawn by J-VI.4 (g)", and J-V9.44's
"amended by J-V9.67" clause adds "(J-V9.67 withdrawn by J-VI.4)".

**SS-33 · minor · V10 · follows SS-32.** V10 §3.16's bends paragraph (and its Integration note on SS-17) lists "Dig a well
at {terminal} instead" among the bends' alternatives; under J-VI.4 (h) the well is the bend itself. *Required change:*
drop that example from the parenthesis (the list reads "Add a hoist instead", "Stairs along the front"), citing V9
§4.20.2 (5) for the uphill aqueduct's bent result.

**SS-34 · minor · V09 · build-plan dependency across the seam.** V9 §8.1's AP8 ("with V10's C2–C4") builds the card-only
drawer for a host's proposal and the host channel `ClerkMount.host`, and T-V9-64 is its exit; V10 §8 places
`clerk.config`, `clerk.needsToken`, `clerk.proposal`, the host proposal intake and `HostProxyBackend` in **C5** (M3c's
exit). AP8 as written can exit before the harness side of its own bar exists. *Required change:* AP8's milestone cell
reads "M3c (staged; with V10's C2–C5 — C5 for the host channel and the card-only drawer)", and T-V9-64's milestone
"M3c (with V10's C5)".

**SS-35 · minor · V09 · a refusal item 101 R2 no longer allows.** BCR-V9-22's last clause ("where neither exists the dry
run returns F-EDIT with the action 'add a way down'") and V9 §4.17.4 (3)'s `refuse.under.noAccess` refuse a dwelling
declaration on a sealed void that no building can dig into and no opening serves; it contradicts neither a dossier fact
nor a lock, so J-VI.4's rule ("every other infeasible declaration is bent to the nearest lawful one") binds it, and the
clerk would have to carry it as the `rule` refusal SS-28 narrows. *Required change:* BCR-V9-22 and V9 §4.17.4 (3) read
"else the dry run bends the declaration onto ground part 0 over the same footprint (the homes stand above the void),
named by `bend.under.noAccess` ('Nobody can reach this cave yet, so the homes stand above it.'), with the alternatives
**Add a way down** (T6 on a chosen spot) and **Show me why**"; the catalogue row `refuse.under.noAccess` is renamed
`bend.under.noAccess` with that text; T-V9-38's "or returns `refuse.under.noAccess`" reads "or is bent above ground by
`bend.under.noAccess`".

### 5.2 One vocabulary, one set of bytes

**SS-36 · major · V10 · byte equality of the terrace (T101-3, T-V10-4).** V9 §4.20.1 (4)'s mapper writes `terrace {
stroke: { path, radiusCm, falloff: 'cosine', amount: 1, water }, levelCm, expansion }`, "`water` from T2's water-mode
parameter", as every T2 stroke carries it (V9 §4.5's T2 row: the water mode, `locked` by default); V10 §4.1's own `raise`
and `lower` rows write `water` too ("`water` default `locked`"), but its `terrace` row — as the integration continuation
left it (IN-V10-5, J-VI.26) — writes "`water` absent, so `locked`". The same terrace declared on the canvas and by the
clerk then differs by one field, and a user cannot ask the clerk for a terrace whose water follows the new ground.
*Required change:* V10 §4.1's `terrace` row reads "`stroke: { path, radiusCm: …, falloff: 'cosine', amount: 1, water:
input.water ?? 'locked' }`", as its `raise` row; IN-V10-5's "`water` stays absent (`locked`)" is replaced by that clause;
T-V10-4's terrace case compares the canvas's and the clerk's bytes with the water mode at its default and at `follow`.

**SS-37 · minor · V10 · a withdrawal the base change record does not make.** BCR-V10-12's closing sentence and V10
§10.3's table say "V09's BCR-V9-16 is withdrawn in its favour"; V09 still carries BCR-V9-16 live — its `sizeM2` text
identical to BCR-V10-12 and a second part on §9.5's plus and minus that BCR-V10-12 lacks — and file f item 348 applies
BCR-V10-12's wording once **and** BCR-V9-16's §9.5 part as written. *Required change:* BCR-V10-12's sentence and the
§10.3 row's *withdrawn* cell read "BCR-V9-16's duplicate `sizeM2` wording (its part on §7.1); its §9.5 part on the
badge's plus and minus stands (file f item 348)".

### 5.3 The host side

**SS-38 · minor · V08 · scope statement narrower than the volume.** V08 §1's out-of-scope paragraph says "The built-in
clerk is staged with volume V10 …; here only SettlementForge's own clerk", yet the volume builds the host side of V10's
configuration B as well — `MapSession.setClerk` with the proxy transport and its token renewal (V08 §2.2, §4.4 (5)),
the configuration-B projection of the prompt (V08 §5.4 (3)) and T-V9-40's `clerkMode: 'builtin'` frame — which a builder
reading §1 would leave out. *Required change:* the sentence reads "The built-in clerk itself is volume V10's; this volume
builds SettlementForge's own clerk (configuration C) and the host side of V10's configurations B and C — `setClerk` with
the transport and its renewal, the proposal channel and the projection (V08 §2.2, §4.4, §5.4 (3))."

**SS-39 · minor · V08 · a memory line the host budget omits.** V08 §6's "memory, the DM's page, all frames" row sums
"§12.8's line for its document + 30 MB" per live frame (TOWN 141 MB, CITY 211 MB, METROPOLIS 361 MB), and §8.4 risk 6's
fallback and T-V9-40's `clerkMode: 'builtin'` frame run V10's built-in clerk in the DM's frame (configuration B); V10's
scratch document is "a session line counted on top of each rung's working set" (BCR-V10-19: TOWN 20 MB, CITY 55 MB,
METROPOLIS 130 MB, held during an authoring turn and while its proposal waits), which the row does not carry, so the CITY
page peaks near 266 MB against a 211 MB bar (T-V8-30). *Required change:* the row adds "+ V10's scratch line
(BCR-V10-19) in the one frame whose built-in clerk holds an authoring turn — configuration B only; configuration C opens
no scratch" to each rung's figure, and T-V8-30's page-memory case runs once under configuration B with a proposal
waiting.

**SS-40 · major · V09 · host-mode bars scheduled before the host stage exists.** V9 §8.1's AP5 ("M4 (with V06's steps and
V08's SF6)"), T-V9-28 ("M3a (with V08's SF6)"), T-V9-67's host clauses ("M3a (the host clauses with V08's SF6)") and
T-V9-66's embed clause ("M4 (the form through V08's embed, SF6)") need V08's `embed.html`, `HostSlots` filled by the
embed's bridge handler and the host harness — all built in V08's SF0, SF1 and SF6, which V08 §8.1 places in **M-SF,
after V12's M-CAL** (after M4, M5, M6 and V-M4; J-V8.39 revised; BCR-V8-18). T-V9-64 ("M3c … on the embed with a
scripted host") has the same dependency, while V10 §8 tests its host seam at C5 (M3c) on §11.3's bridge alone. A builder
cannot exit AP5 at M4 or the M3a bars. *Required change:* V9 §8.1 splits AP5 — "AP5 — time (M4, with V06's steps)"
keeps `forkAt`, `rerunFrom`, the Chronicle tab and V06's exports (T-V9-16 copy, T-V9-41, T-V9-53 epochs), and a new
"AP5b — host mode (M-SF, with V08's SF6; V08 §8.1)" carries the host shell verified with V08's `HostSlots`,
`newDocuments`, `historyLines` and the three load outcomes in host mode (T-V9-28, T-V9-66's embed clause, T-V9-67's host
clauses), at AP5's current estimate split 0.5–0.75 / 0.25–0.5; T-V9-64 runs at M3c on the app harness's scripted host
page (a test-only host page that fills `ClerkMount.host` and `HostSlots` through §11.3's bridge, as V10's T-V10-20 does)
and again at M-SF on V08's embed; each bar's milestone cell reads accordingly.

**SS-41 · major · V09 · a host view with no control.** V08 §5.2 (and BCR-V8-15) adds "an optional thematic view
`supplyChains` (off by default)" drawing each ACTIVE custom chain of SettlementForge along the way graph, with its legend
and GeoJSON; J-V9.20 says "V08's view of one custom chain … stays its own view". Thematic views are switched only by V9
§5.4's **Show** menu writing the per-viewer key `thematic`, whose enumeration (BCR-V9-3: `none`, `wealth`, `shade`,
`links`, `quarters`, `uses`, `knowledge`, `coverage`, `voids`) and menu lack it, and V08 §5.1's host chrome adds no toggle
— so the view is produced and never reachable. *Required change:* V9 §5.4's Show menu gains **SettlementForge's chains**
(the `supplyChains` view of V08 §5.2), offered only while the document holds an active `CustomChainRecord`; BCR-V9-3's
`thematic` enumeration gains `supplyChains`; V9 §5.15's table gains its row (drawn by V08 §5.2's program; legend; GeoJSON
as V08 §5.2; never persisted but the view key); a T-V9 bar on a `town-cc-1` fixture checks the entry's presence and that
switching it changes no digest.

**SS-42 · minor · V08 · a decision the players' redesign left behind.** J-V8.21 still reasons that SettlementForge's
assistant acts "inside a user's session with that user's role and key … §11.2 already gives every clerk its viewer's
key"; since J-V8.57 a player has no session, no frame and no document, and a player's assistant reads the stored party
gazetteer on SettlementForge's side (V08 §4.4 (1), §1b; V10 §3.17's "Roles and keys"). *Required change:* J-V8.21 is
marked "REVISED (C8-01; SS-42)": "an editor's assistant acts inside that user's frame session with the user's role and
key (§11.2); a player's assistant has no session and reads only the stored party gazetteer, made under the party key
(V08 §3.14, §4.4 (1))".

**SS-43 · minor · V08 · history lines quoted in a third wording.** V08 §4.6 says the absorb group lists the raised ways
its epochs built "in V10's words" and quotes its own sentences — "Week 52: the city built an aqueduct … You can remove
it." and "kept removed (you removed it in week 30)" — and T-V8-45 asserts that quoted text; V10 §3.9's `suppressed` row
is "you removed it in week {w}; the town will not rebuild it", marked "one key with V08's history panel" (CVR-V10-14),
and V9 §4.10 draws an epoch's rows as "V06's chronicle line for the epoch" — so the panel's builder has three texts and no
single renderer for these lines. *Required change:* V08 §4.6 cites keys instead of quoting: a raised way an absorb's
epoch built is V9 §4.10's `epoch` row (V06's chronicle entry for it, V06 W19), with **Why here?** opening its `raised`
section (`info.raised.built`, V10 §3.9); a reason firing at a slot the DM closed renders `info.raised.suppressed`
(V10 §3.9); the quoted sentences are removed; X11 names V06 (the chronicle's raised-way line) beside V10; T-V8-45 checks
the rows' keys, not quoted words.

**SS-44 · major · V08 · the port's notes have no words.** V08 §4.6 lists "quarantined records, unreceipted changes,
adapter remaps, ladder merges and a held state … in the same group with their notes"; V9 §4.9 carries every `host.*` key
"its text volume 8's (V08 §13 X12: … the port's notes …)", and T-V9-15 requires a catalogue row for "every code the
engine can emit (… V08's port notes …)". No section of V08 words a single `PortNote` kind — the base's eight
(`unmapped_kind`, `unmapped_word`, `ignored_key`, `unreceipted_change`, `rename_without_receipt`, `duplicate_key`,
`state_matches_absorbed`, `realm_block_used`) and V08 §2.4's twenty-two; §3.9's "the user sees" column words the held
reasons and a few notes (B3, B5, B6, B17 …) but keys none of them — and X12's list names none, so the history
panel would show raw kinds or a builder invents thirty sentences, and T-V9-15 fails. *Required change:* V08 §4.6 gains a
table "The port's notes in words": one row per `PortNote` kind, key `host.note.<kind>`, one sentence of at most 25 words
in V9 §4.9's style (e.g. `ladder_merged` "{lesser} is counted as part of {greater}, so it is not built twice.";
`quarantine_hold` "One record could not be read, so nothing it might name was removed this week."), with the note's
slots, reusing §3.9's words where a B-row already gives them; §3.9's column keys each held reason as `host.held.<code>`;
X12 names both families; T-V8-14 and T-V9-15 check that every note kind and every refusal code has its row.

**SS-45 · minor · V08 · a closed hand-off still marked open.** V08 §13 X17 ("closes when V09's round 4 lands") and V08
§12's round-4 PLAUSIBLE ("that V09's round 4 lands with that text unchanged") remain open, while reconcile-V09-r4 landed
at 07:35 with V9 §2.2's `fileMenu: false` meaning, J-V9.98 and T-V9-28's allowlist as X17 states them (read in V09's
current text). *Required change:* X17 reads "**CLOSED** (V09's round 4 landed 07:35; J-V9.98, V9 §2.2, T-V9-28 read in
its text)", and §12's PLAUSIBLE sentence moves to CONFIRMED with that citation.

**SS-46 · minor · V09 · one edit homed under two tools.** V9 §4.20's `toolkit.json` rows register the raised way's
context controls — `spanUse`, `crossingForm`, `deckHeight`, `archSpacing`, all `setAttr` — under **T4**, whose §7.1 row
(as BCR-V9-26 (d) amends it) lists `drawWay` only; V10 §4.1 encodes the same `setAttr { path: 'spans/<n>/use' }` under
**T9** (`span`), and reaches the other paths through T9's `set`, as the base's T9 row lists `setAttr` and V9 §4.1's own
rule sends a panel edit to "the tool that owns its event kind". The bytes agree (T101-3 holds), but T-V9-12's "each
mode's `emits` lies within its tool's entry" and the history panel's tool attribution disagree between the surfaces.
*Required change:* V9 §4.20's four context-control rows read "T9 · context controls … (on a selected raised way, span or
crossing)", V9 §4.20.6 (2) and (6) name T9 as their tool, and V9 §4.3's binding table lists the four paths in T9's
`setAttr` row (BCR-V9-33).

## 6 Disposition summary of the continuation

| owner | blocker | major | minor | ids |
|---|---|---|---|---|
| V09 | 0 | 4 | 5 | SS-29, SS-32, SS-40, SS-41 (majors); SS-30, SS-31, SS-34, SS-35, SS-46 (minors) |
| V10 | 0 | 2 | 2 | SS-28, SS-36 (majors); SS-33, SS-37 (minors) |
| V08 | 0 | 1 | 5 | SS-44 (major); SS-38, SS-39, SS-42, SS-43, SS-45 (minors) |
| BASE-F | 0 | 0 | 0 | — (no base change request needs to change; SS-29 and SS-46 are met inside V09's registry rows) |

Continuation totals: 0 blockers, 7 majors, 12 minors (19). Round 0 as a whole: 1 blocker, 22 majors, 23 minors (SS-01 –
SS-46), the first 27 already fixed by the round-1 reconcilers. Severity follows round 1's precedent for a refusal where
R2 wants a bend (SR-21, minor): SS-35 is minor; SS-28 is major because it covers a whole refusal category and J-VI.30
names V10. Pairs to apply together: SS-32 with SS-33 (the uphill well), SS-40 with V10 §8's C5 (no V10 change needed).

**Routing.** Round 0's reconcilers (reconcile-V08-r1, -V09-r1, -V10-r1) have landed and consumed SS-01 – SS-27; these
nineteen are carried by the next surfaces round (seam-surfaces-r4, STARTED 07:42, cut at its skeleton) as input for its
re-check, and by that round's reconcilers.

**Consistent across the seam (checked in this continuation, no finding).** V10 §2.6's dispatch table and V09's T-V9-27
(the six application-run kinds); V10 §6.1's removal row citing V09's Delete row; V10 `keyState`'s six values and V09's
key card and `clerk.key.unchecked`; V10 §2.8's four `DefectRecord` kinds and V09's `clerk.defect.<kind>` rows; V10 §3.9's
ten `raised` outcomes and V09's `info.raised.<outcome>` family; V10 §3.9a's burial-face outcomes and V09's
`info.catacomb.*` family; V10's `applyMode` and V09 §7.3's fallback; BCR-V9-32's `delete { id, suppress }` (never a
client's) and V10's `remove` encoder; BCR-V10-17's flatten mode and BCR-V9-26 (c)'s terrace expansion; the host-only
kinds `dossierFacts` and `dossierRecord` on V9 §4.3's list; T-V8-27's offered and refused host kinds and J-V10.87; V08
§4.6's party lines and V9 §4.10's group; V10 Q2 and V08 §4.4 (configuration C recommended, B available); the base §14
clerk paragraph as BCR-V10-14 amends it.

## 7 CONFIRMED versus PLAUSIBLE of the continuation

**CONFIRMED (both sides read in the live text; the lines are cited in each finding):** all nineteen findings SS-28 –
SS-46, and every "consistent" item of §6.

**Coverage, stated exactly.** Read whole in the live text: V09 §4.1, §4.9, §4.12 – §4.19 (with §4.16), §4.20 (§4.20.3
and §4.20.4 by rounds 2 – 3), §5.1 – §5.6, §5.11, §5.13 – §5.15, §6.1, §6.4 – §6.6, §7, §8, §9, §10.1 (every BCR rounds 1 – 3
had not read), §12, §13, the integration continuation's notes; V10 §3.6, §3.16, §2.6, §2.8, §6.1, §8, §9, BCR-V10-2 –
-4, -8 – -12, -14 – -19, §10.3, §11, the integration continuation's note; V08 §0, §1, §1b, §2.1, §2.3 – §2.5, §3.9's table,
§5.2, §6, §7, §8, §9, §10, §11, §13, the round-4 note, §12's first paragraph; the base §7.1's toolkit table and §14 (the
package list, dependency rules, the dossier port, the authoring surfaces and the clerk, `@plat/app`, the interaction
contract, the input scheme, the extension points; its interface block by a seam-term scan). V09 §0 – §3.15, §4.3 – §4.8,
§4.10, §4.11, §10.2, §11 and the base §11.2 were read whole by rounds 1 – 3 and are not re-claimed here. **PLAUSIBLE:**
V08 §2.6 – §2.8 and §3.2 – §3.13 (the port's row sets, derivations and pipeline) were covered for this seam by an
exhaustive scan for the seam's terms (29 hits, each read in context; `scratchpad/volumes/ssr0c/v08-scan.txt`), not read
line by line — they are the settlements seam's ground, read whole by seam-settlements rounds 0 and 1; a semantic conflict
there that names no surface term is not claimed absent. V08 §12's remainder was scanned the same way.

**Decisions recorded (vetoable).** J-SS.2 — chose to continue round 0 against the live text rather than its 02:30
inputs, because those inputs no longer exist in any file and a finding against superseded text would route nowhere.
J-SS.3 — chose to read the Open list whole where it is this seam's ground and to scan V08's port internals, over a
second whole read of about 190 KB the settlements seam already read twice, because the owner's ~300k-token checkpoint
(CLAUDE.md efficiency standard 7) would otherwise cut the continuation before its findings were written.
