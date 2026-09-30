## Reconciliation round 1 — continuation (volumes/reconcile-V08-r1, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V08-r1; covered by the whole-design retrovalidation (J84).

The lane was re-issued with a wider brief than its 03:53 landing covered: the thirteen `seam-settlements-r0` issues of
the first run and six findings of
`docs/volumes/critique/seam-surfaces-r0.md` §5, its continuation of 08:31 (SS-45 — the
two critique files number independently, so the second set is written "(surfaces)" below where an id repeats). **The
thirteen** were verified in the live text after rounds 2 – 4 (every anchor present: the village range sentence, the
`@absent` shape and `Access to parish church` row, the keyword and archetype cells, the fold-time custom class, the band
and T-V8-19's clause, [0, 10⁷] and the desertion, the guild-hall binding, `ProductDecl` withdrawn, 280 kinds, no
`fallbackClass`, the criteria row, the end claim and the burial steps) and not redone. **The six** — 1 major and 5
minors — are **all FIXED**, 0 ruled invalid, 0 left on the fix list. Every sentence that read otherwise was edited in
place; this note lists the changes.

| issue | what changed (where) |
|---|---|
| SS-44 (surfaces, major) | V08 §4.6 gains the table "The port's notes in words": one row per `PortNote` kind — the base's eight and V08 §2.4's twenty-seven — key `host.note.<kind>`, one sentence of at most 25 words, its args and where the port fills them, its **Show** keys and its class (`event`, `standing`, `report`). V08 §3.9's "the user sees" column now names keys: the held reasons `host.held.<code>` (`E_RUNG_UNAVAILABLE` by case: `.village`, `.cap`, `.empty`) with their words, B10 – B11's `host.recovered.*`, B20's `host.verify.mismatch`, and the note rows for B4, B13, B17 and B19; V08 §5.1's banner table keys its rows (`host.status.*`, `host.party.*`). To make the words reachable (the note had only `detail`, and no frame but the port leader's ever saw a note): `PortNote` gains `msg` (item 463's `MsgRef`) and `keys` (V08 §2.4, item 508); the ledger event carries `notes` and `notesCleared` by class and `DossierBinding.notes` keeps the standing list (V08 §2.3, §3.6 (4), item 358, item 390); `MapRecord.held` and `dossier.result.held` carry the refusal's `reason` (V08 §2.1, §2.2, item 472); `module.status.detail` names a key (V08 §2.2, §3.3). §2.7's lifecycle rows, §1b's rows, SF3 and SF6 follow; X12 names every family; T-V8-14 gains the words' walker and the persistence clauses (J-V8.98 – J-V8.102). |
| SS-38 (surfaces) | V08 §1's out-of-scope sentence reads "The built-in clerk itself is volume V10's; this volume builds SettlementForge's own clerk (configuration C) and the host side of V10's configurations B and C — `setClerk` with the transport and its renewal …, the proposal channel and the projection (V08 §2.2, §4.4, §5.4 (3))"; in-scope item 9 says the same. |
| SS-39 (surfaces) | V08 §6's page-memory row adds V10's scratch line (item 481) in the one frame whose built-in clerk holds an authoring turn or a waiting proposal: TOWN ≤ 161 MB, CITY ≤ 231 MB, METROPOLIS ≤ 421 MB (the no-turn bars kept beside them). Two corrections to the finding's arithmetic, recorded in J-V8.97: configuration A runs the same clerk in the frame (host mode's `builtin` without a transport, V10 §3.17), so the line counts under A and B; and the CITY peak is 231 MB, not 266 MB, because V08 §3.4 never runs the refresh frame beside a visible CITY. T-V8-30's page case runs once more under B with a proposal waiting. |
| SS-42 (surfaces) | J-V8.21 marked "REVISED (SS-42 …)": an editor's assistant acts inside that user's frame session with the user's role and key; a player's assistant has no session and reads only the stored party gazetteer made under the party key. |
| SS-43 (surfaces) | V08 §4.6 quotes no raised-way sentence: an absorb's epoch that built a raised way is V09 §4.10's `epoch` row (V06's chronicle `raisedWay` entry, W19), **Why here?** opening `info.raised.built`; a reason at a closed slot is the line `info.raised.suppressed` (V10 §3.9); a way in a slot a cap increase opened is an ordinary founding entry. X11 names V06 beside V10; T-V8-45 checks keys and args, not words. The group heads are keyed too (`host.group.absorb`, `.absorbUndated`, `.standing`). |
| SS-45 (surfaces) | §13 X17 **CLOSED** (V09's round 4 landed 07:35; J-V9.98, V09 §2.2, T-V9-28 read in its text); §12's round-4 PLAUSIBLE moved to CONFIRMED with that citation. |

**Found in passing and fixed (the intake rule).** (1) Seven places said "noted" with no note kind — a notable's
workplace or power and a cross-link reference that join nothing, a kind-family name matching several records, a custom
record without `localUid`, a guild COUNT record above its range, a `kinds` row `'@none'`, and a custom service's provider
or chain resource that join nothing: the first five now name `name_unjoined`, `name_ambiguous`, `custom_unkeyed`,
`count_over_range` and `not_placed` (new kinds, V08 §2.4, item 508; J-V8.100), the last two `custom_node_unjoined`; and
V08 §2.6 states once that every row set's "else …, noted" writes `unmapped_word`. (2) V08 §2.5's `outputs` comment said
an unmatched good label gives `[]`, against V11 §3.13.5's rule (it resolves to the generic good `import`, noted
`unmapped_good`): now it cites that rule. (3) V09's continuation lane (checkpoint 08:47) asks this
volume, XV-V9-26, to list each ACTIVE custom chain in the gazetteer under the kind `customChain` (withheld unless the key
admits every node), the read by which V09 §5.4 offers **SettlementForge's chains** (its SS-41): V08 §5.2's row, the §1b
row and item 410 (the §11.2 gazetteer kind) now say so.

**New rows.** J-V8.97 – J-V8.102; no new bar (T-V8-14, T-V8-30 and T-V8-45 widened); §12's continuation paragraph; §13's
intro, X11, X12 and X17. SF3 +0.25 pw at its top (the notes' args, classes and standing list): M-SF 15.75–21.5 pw
(item 529 follows). Counts now: 102 J-V8, 32 BCR-V8 (item 202 withdrawn), 47 T-V8, 5 owner questions (unchanged).

**For the coherence pass.** File f's items for item 472 (item 472: `dossier.result.held.reason`, `module.status.detail`
as a key), item 508 (five kinds, `PortNote.msg` and `.keys`), item 358 (`dossierFacts.notes`, `.notesCleared`),
item 390 (`DossierBinding.notes`), item 410 (the gazetteer kind `customChain`) and item 529 (15.75–21.5 pw) changed
text, applied by reference. **For V09** (no edit made there): V09 §4.9's sentence on `host.*` keys and T-V9-15 already
cover the port's notes; V08 §13 X12 now lists every family by name, and V09 §5.7's "V08's dossier state list" is
`DossierBinding.notes` under `host.group.standing`.

