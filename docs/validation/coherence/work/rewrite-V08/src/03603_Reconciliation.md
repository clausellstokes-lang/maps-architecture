## Reconciliation round 4 (volumes/reconcile-V08-r4, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V08-r4; covered by the whole-design retrovalidation (J84).

Reconciled in place against the one seam issue owned by this volume in `docs/volumes/critique/seam-surfaces-r3.md`
(SR3-06, minor, restatement): **FIXED**, 0 ruled invalid, 0 left on the fix list. Every sentence that read otherwise was
edited in place; this note lists the changes.

| issue | what changed (where) |
|---|---|
| SR3-06 (a) | §3.1 step 7 (b)'s `newDocuments` clause reads "`newDocuments: 'download'` — V9 §3.9's host-mode rule then governs every action that makes a new document; a copy of a dossier-bound document is detached (V6 §4.4): it does not follow SettlementForge (J-V8.93)": the shorter action list and the `export(h, 'plat')` mechanism, both V9 §3.9's, are gone. §1b's `HostSlots.newDocuments` row cites V9 §3.9 without the list. |
| SR3-06 (b) | §4.6's last sentence reads "Each line is drawn by V9 §4.10's rule for the host's lines; its undo is V08 §4.2's "Hide again" or "Reveal again"." Earlier in that paragraph, step 7 (b)'s restated difference rule became a citation of V08 §3.1 step 7 (b), (c). |
| SR3-06 (c) | §5.1's host-mode differences gain the assistant as the host's `clerk.config` sets it — the Assistant button only under `builtin`, otherwise the card-only drawer for a host's proposal (V9 §2.2, §4.11; V10 §3.17) — with no creation mode and no **Start a new map from this** (V9 §3.9, §4.11); "no file menu, open, save or permalink" reads "no file operations — New town, Open…, Save a copy, Recently deleted — and no permalink (V9 §2.2's `fileMenu: false`; SR3-02)", plus Settings without its Storage section (SR3-02's second effect; J-V8.96), so the list T-V9-28's allowlist reads is complete; the new-document point cites V9 §3.9 without a list. |

**Found in passing and fixed (the intake rule).** §3.1 step 2 and BCR-V8-3's new text for base §14 read "no file menu"
for host mode, the wording SR3-06 (c) retires; both read "no file operations" (step 2 citing V9 §2.2's `fileMenu:
false` and V08 §5.1).

**Found in passing and fixed (V09's note of 07:28, XV-V9-24; J-V9.97).** V09's round 4 makes a frozen view's notice the
shell's own `error.frozen` strip with its one owner control **Edit it with this version** (V9 §3.14 (b)). §3.1 step 7
(b)'s `banner` now carries the held notice only; §5.2's frozen view cites V9 §3.14 (b)'s strip; §3.8's `frozenImport`
rebase is offered by that control and committed through `doc.changed`, the client then sending `doc.snapshot`; T-V8-47
gains that path and the banner slot's absence of a frozen-view notice. Inside
the window V08 §4.2's **Update the map engine** stays host mode's only upgrade control (V9 §3.14 (a); J-V8.94), and a
model-less document's **Open its recipe with this version** follows V9 §3.9's host rule, which §3.1 step 7 (b) now cites
for every new document.

**New rows.** J-V8.96; §13 X17 (V09's SR3-02 half, met in V09's checkpointed text, closing when V09's round 4 lands);
§12's round-4 paragraph. Counts now: 96 J-V8, 32 BCR-V8 (BCR-V8-9 withdrawn), 47 T-V8, 5 owner questions (unchanged). Effort
unchanged: wording only.

**For the coherence pass.** File f item 507 (BCR-V8-3, the host client package and the embed entry): its New text
changed one phrase ("no file operations" for "no file menu"), applied by reference.

