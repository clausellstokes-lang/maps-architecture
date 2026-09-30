## Reconciliation round 2 (volumes/reconcile-V08-r2, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V08-r2; covered by the whole-design retrovalidation (J84).

Reconciled in place against the 6 seam issues owned by this volume in `docs/volumes/critique/seam-surfaces-r1.md`
(SR-03, SR-04, SR-05) and `docs/volumes/critique/seam-settlements-r1.md` (SR1-26, SR1-27, SR1-28): 3 majors and 3
minors, **all 6 FIXED**, 0 ruled invalid, 0 left on the fix list. Every sentence that read otherwise was edited in
place; this note lists the changes.

| issue | what changed (where) |
|---|---|
| SR-03 (major) | §3.1 gains step 7 "Bridge to the shell": the embed's bridge handler routes `clerk.config` to `ClerkMount.host.config`/`onConfig` and `HostSlots.clerkMode`, host `preview { proposal }` to `ClerkMount.host.proposals`, and posts `clerk.needsToken`, `clerk.config.refused` and `clerk.proposal` from the harness's `needsToken`, `refused` and `answer` (a); it fills `HostSlots` — `header` with §4.2's controls, `banner` with §5.1's strip, `lockedControls` with the population and tier word (reason `host.locked`, "Set by SettlementForge"), `exportFormats` by §5.4 (2), `fileMenu: false`, `historyFilter` unset, `hostName: 'SettlementForge'` a deployment constant of the embed build (b); it keeps `host.state` (c) and the selection `reveal`/`hide` carry (d). §1b: row 32's consumer is the bridge handler → `ClerkMount.host` (V9 §2.10); row 40 reads "the DM's and co-DM's frames" without "filtered history"; a new row for the handler. §4.4 (6) and §5.1 cite step 7. J-V8.90. |
| SR-04 (major) | A PLAT → host push `host.action { action: 'refresh' \| 'restore' \| 'newMap' \| 'reveal' \| 'hide' \| 'partyTier' \| 'assistantSettings'; args?: { places?, undo?, tier? } }` from owner or editor frames only, surfaced as `MapSession.on('action')` (§2.2, BCR-V8-1). §4.2 gains "How a click reaches the page" and each row's operation column names its `host.action` (or, for "Update the map engine" and "Keep the saved town", the event committed in the frame and the client's `doc.snapshot`; "See what the players see" in the frame alone); confirmation dialogs are the frame's, the restore dialog listing the edits after `backups[0].logHead`; "Hide again"/"Reveal again" are `args.undo` → `setParty({ prev: true })`; "Assistant settings" opens SettlementForge's own settings, then `setClerk`. New bar T-V8-47 (PR, SF6). §1b and §2.7 rows; §5.4 (4); SF6's exit and estimate (+0.25 pw; total 15.75–21.25, BCR-V8-18 follows). J-V8.88. |
| SR-05 (major) | "See what the players see" is a display filter: the header's toggle, or `seePlayersView(on)` posting `host.state { playersView }`, sets the frame's `ViewOpts.viewAs` to the party key resolved as in §3.14 (1), in SR-06's key form, and clears it when off; no view-state write; the frame's key stays `secret`, so the document formats, `doc.snapshot`, compaction and the draft mirror keep working (§3.14 (5), §4.2's row, §2.2's comment, §5.1's strip in `HostSlots.banner`). To give the frame the party key it filters by, a host → PLAT memory-only push `host.state { party?, backups?, partyPicturesAt?, playersView? }` (§2.2, BCR-V8-1, §2.7, §1b; J-V8.86), which also feeds the restore dialog and the history panel's reveal lines (§4.6). T-V8-41 gains the players'-view clause. J-V8.87, J-V8.89. |
| SR1-26 (minor) | §3.5 step 6: "each label is resolved by V11 §3.13.5's matching rule; a label matching none is noted `unmapped_good`". |
| SR1-27 (minor) | T-V8-46 keeps at SF3 the compile check and a base-rung test-side mutation of `town-1` carrying both `@absent` records (with every binding record removed); the two hamlet clauses move to VH, read through V07 §3.11 step 1's `villageForm` reading (SR1-02); §8.2's VH exit lists them. In passing, §2.6's `kinds` shape and §2.6a (3)'s `Access to parish church` row cite that village reading. |
| SR1-28 (minor) | §12: V11's SS-26 burial pairs, SS-09's `village` cell, SS-36's spelling and SS-08's range paragraph, and V07's SS-43 reading, are CONFIRMED in the landed text, cited by section (lines move while both volumes are edited); §13 X14 CLOSED. |

**New rows.** J-V8.86 – J-V8.90; T-V8-47 (BCR-V8-17's range now T-V8-1 – T-V8-47); §13 X15 (V09's companions: SR-06's
key form, the View-as banner yielding to the strip, `historyFilter`, `HostSlots.banner` — read applied in V09's text by its
own round-2 lane, open until it lands); X12 gains `host.locked` and the strip's button; §12's round-2 paragraph. Aligned
with V09's round-2 text as read: `HostSlots.banner` also carries the held and frozen-view notices (XV-V9-20), and
`viewAs` is cleared with `undefined`. **Found in passing** (V07's note to this lane, 05:11): V08 §3.5.1 (b)'s village range
sentence reads V07 §2.4's row "for its step type and member class" (V07 SR1-16). Counts now: 90 J-V8, 32 BCR-V8 (BCR-V8-9 withdrawn), 47 T-V8, 5 owner questions (unchanged).

**For the coherence pass.** File f item 472 cites BCR-V8-1 by id; its text grew by `host.state` and `host.action`
(applied by reference). BCR-V8-17 (the bar range) and BCR-V8-18 (15.75–21.25 pw) changed text likewise.

