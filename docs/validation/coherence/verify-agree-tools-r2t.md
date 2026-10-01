# Agreement check, round 2 — the tools (determinism, rendering, V09, V10) after assemble-r2

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-agree-tools-r2t; covered by the whole-design retrovalidation (J84).

> **PROGRESS** — [x] brief read whole · [x] resume check (fresh: no output, no LANDED line) · [x] round-1 findings re-checked against the live text (29 of 29) · [x] owner items 120–126 parts in scope checked as new design, across the members · [x] repair-touched tool subsections re-read · [x] hand-offs of this round at their destination · [x] issues written · [x] result saved · [x] LANDED

Live text read: base `4ed292e9…`, V09 `23398a30…`, V10 `6efb987b…`, V06 `d12c382b…` — assemble-r2's outputs, each confirmed by sha256 at the start. The pre-round text is git `682e8e998e4f`.

## Scope and method

**Members.** determinism (§5–§7), rendering (§8, §9, §11, §12), V09 and V10.

**Subjects.** Edit events, dry runs, undo, the embedding API, the editor screens, the clerk's calls and its why-answers — and, this round, the owner items 120–126 where they meet those subjects: Find (the view key, the gazetteer's listing, the panel, the clerk's `find` action and read), the resolution setting, the crisis looks (the key, the switch and preview, the why lines, the clerk's look read), a ruined plan's damage lines, the weather switch and stream, the week's source and the host's view commands, and the phone's removal.

**What was read whole.**
- Base: §7.1 (the union, *Delete*, *Empty edits*, the edit-target table, E-07's head and rows, *The returned kinds*, the layer table and the binding); §2.9's view state, *The year position, festivals, crises, Find and colour vision*, *The week's source*, *Weather effects* and *The crisis framing*; §6.3 *Plan damage*; §7.7 item 1's host-input sentence and DR44; §8.2 *Crisis looks* and *Find*; §8.8 *Resolution and the Auto loop*, *Gestures*, *The weather effects layer*, *The surrounding ring*; §9.5's legend and Fit; §11.2 whole; §11.3's *View state* and *The host's view commands*; §11.4; §12.5's Find, crisis and weather budgets.
- V09: §3.3, §4.3, §4.9's lead and the new and touched rows, §5.3, §5.4, §2.10's `ClerkHandle.run`, §2.12's new rows, §4.21.6 – §4.21.14 whole, the test heads T-V9-22, T-V9-83 – T-V9-87.
- V10: §2.6, §2.12's read kinds, §2.13 whole, §3.5 whole, §3.9a's damage part, §3.9b (5)–(8), §3.16 whole, §4.1 whole, §4.2, §3.23 rows 32–35, the test heads T-V10-11, T-V10-51 – T-V10-53, J-V10.127.
- The round's inputs: adjudication-r2 (R2-01 – R2-42, Part H for the four members), assemble-r2, the four repair-r2 files' headers, dispositions and HAND-OFFS, file g items 120–126, and the landed round-2 peers' results (verify-determinism, -rendering, -model, -pipeline, -kernel, -scope, -vol-V01-V02 … -vol-V09-V10).

**Diffs.** `git diff 682e8e998e4f` of the base, V09 and V10, mapped hunk by hunk to their live subsections (base 326 hunks, V09 195, V10 72); every touched subsection in the tool area was read whole, not by hunk.

**Scripted checks.**
- Every key of E-07 against V09 §4.9's rows: every key has its row (`refuse.clerk.opsDevice` in the `refuse.clerk.*` family); `refuse.table.ownerRule` and `refuse.phone` are gone; `refuse.table.required`, `refuse.epoch.cap` and `refuse.water.reservation` have rows whose actions match E-07.
- The binding against V09 §4.3, pair by pair, both directions.
- Every catalogue key V10 renders for Find, the crisis looks and the damage (`clerk.alt.find.*`, `crisis.look.<kind>`, `info.crisis.*`, `info.damage.*`) against V09 §4.9's rows: all present.
- Residues of retired forms in the four members (`reroute` as a conflict kind, `refuse.phone`, `live.coverage`, `button.shareDevice`, the old scratch session form, "toolkit table", "§7.7's calendar row", "traditions row"): none.
- Adjudication and verifier ids in design text: base 0, V10 0, V09 52 lines.

**Peers.** A defect a landed round-2 peer already raised is listed below as confirmed and not raised again. **Not run:** `doc_checks.py` (this brief does not ask for it).

## Outcome

**Not clean: 6 issues — 0 blockers, 4 major, 2 minor.**
- By owner: rendering 2, V09 2, V10 2.
- By kind: DISAGREE 3, MATRIX-GAP 1, AMBIGUOUS 1, NARRATION 1.

**Round 1.** All 29 round-1 findings are closed: 8 FIXED in the text as the adjudicator ruled (VAT-06, VAT-08, VAT-R1-01 – VAT-R1-06), VAT-20 closed for good by R2-02 (INVALID in its rung clause), and all 20 F-MISSING owner-item parts written (G120 – G125 in rendering, determinism, V09 and V10). No round-1 id persists.

**New this round (6).**
- **The clerk's scratch commit** resubmits the *filtered* preview's fates, so under a lowered key it is answered `confirm` and refused as a defect (VAT-r2-01, V10). This is the fix of VAT-R1-03 meeting §11.2's *Confirming fates*.
- **Item 123's one comparison** is restated as "at or above its threshold" in V09 (VAT-r2-02) and as "reaches" in V10 (VAT-r2-03), against §6.3's "above 0 and at least t".
- **The host's "layers shown" command** is written in §11.3 as a `view.set` of `LayerSpec.visible`, which the set elsewhere writes only by the logged `setLayer` (VAT-r2-04, rendering).
- **The standing crisis looks and the festival list have no read on the embedding API.** V09's controls and V10's look read take them from "the legend's entries", which no data structure holds (VAT-r2-05, rendering).
- **V09 cites adjudication rulings in its design text** on 51 lines beyond the one VM-R2T-09 names (VAT-r2-06).

## Round-1 findings — verdicts

| id | owner (r1) | verdict | where (live) |
|---|---|---|---|
| VAT-06 | V09 | FIXED per R2-21 (f) | V09 §3.3 *Refused and bent* (the line of the conflict's `outcome`, each action worded by its own `msg`), steps 6 and 8, §5.3 *Refusal card* |
| VAT-08 | V09 | FIXED (one fix with VAH-r1-03, R2-22) | V09 §4.3: T2 `moveVertex` on a shore or coast; T3 on an enceinte's trace (chain points, a stretch's anchor vertex, a gate's crossing); T4 on a way's, a raised way's and a tunnel's chain; T9 on an island's key; T6 `instance` on a hood pin (add, move, remove, restyle); T8 `instance` on trees and §8.10's instances; T10 `regenerate` of scope `people` (**Re-derive people**) — pair by pair with §7.1's binding, both directions |
| VAT-20 | V10 | CLOSED — INVALID in its rung clause (R2-02); its other clauses fixed in round 1 | V10 §3.16's `rule` row stands with the rung and `refuse.islandsRung` |
| VAT-R1-01 | rendering | FIXED per R2-21 (e) | §11.2 `advance`'s comment `{ status: 'conflict', outcome: { key: 'refuse.dossierClock' }, actions: [] }` and the call table's "or the dossier-clock conflict"; E-07's head names the gate |
| VAT-R1-02 | V10 | FIXED per R2-21 (g) | V10 §4.1's T1 edit row (no `advance` encoded on a dossier-bound document; `refuse.dossierClock`, a `fork` at the head, detached, worded by `button.whatIf`); §3.16's lead and `dossier` row; §3.5 step 3 (the one `app` button a clerk card meets); §3.23 row 33 with T-V10-50 (32); V09 §4.9's row agrees (`button.whatIf` app(`openCopy`), `button.showWhy`) |
| VAT-R1-03 | V10 | FIXED as ruled — but the commit it adds is a new problem (VAT-r2-01) | V10 §3.5 step 3 reads the item from `preview(scratch, events, { filtered: true })` and commits by `edit` with the preview's fates and renames; step 4, §6.1's row, T-V10-11, J-V10.127 |
| VAT-R1-04 | V10 | FIXED | V10 §4.1 `where.locus`: "T6 `place`'s row of §7.1's binding carries the one-line roster (file f item 570)" |
| VAT-R1-05 | V09 | FIXED | V09 §9 J-V9.83 cites §7.1's binding |
| VAT-R1-06 | V10 | FIXED | V10 §3.5 step 1: "its session the one `scratch` mints (`clerk:<n>`, §11.2)" |
| G120-rendering | rendering | WRITTEN | §8.2 *Find*; §9.5 *Find*; §11.1; §11.2's gazetteer `counts`, `chips`, `gaps`, `GazetteerAnswer` and *Find's match listing*; §12.5 *Find*; R12-35; T-ER-25 |
| G120-V09 | V09 | WRITTEN (the phone sheet MOOT, R2-41) | V09 §4.21.10; §2.10 `run` (eight application kinds, `find` among them); §4.11; §4.9 `find.*`, `clerk.alt.find.*`; §5.4 (Coverage folded into Show gaps); T-V9-83 |
| G121-rendering | rendering | WRITTEN | §8.8 *Resolution and the Auto loop*; §8.4 (g); §12.1, §12.5, §12.8; R12-36; T-ER-26 |
| G121-V09 | V09 | WRITTEN | V09 §4.21.11; §5.12; `AppPrefs.resolution`; T-V9-84 |
| G122-determinism | determinism | WRITTEN | §7.7's DR44 |
| G122-rendering | rendering | WRITTEN | §8.2 *Crisis looks*; §11.1; §12.5; R12-37; T-ER-27 |
| G122-V09 | V09 | WRITTEN | V09 §4.21.12 (1)–(7), (9)–(10); T-V9-85 |
| G122-V10 | V10 | WRITTEN | V10 §3.9b (8); `LookAnswer.crises`; prompt rule 21; T-V10-52 |
| G122h-rendering | rendering | WRITTEN | §8.8 *The surrounding ring* |
| G122h-V09 | V09 | WRITTEN | V09 §4.21.12 (5), (8); §4.21.6; `info.zoom.limitCamps`, `info.zoom.coarsest` |
| G123-determinism | determinism | WRITTEN | §6.3 *Plan damage*; §6.1's `plan.damage` row; §6.5 (9) |
| G123-rendering | rendering | WRITTEN | §8.6 *The damaged plan*; §11.1's battle maps; T-ER-28 |
| G123-V09 | V09 | WRITTEN | V09 §4.21.13; T-V9-86 (its comparison's wording: VAT-r2-02) |
| G123-V10 | V10 | WRITTEN | V10 §3.9a's damage part; T-V10-53 (its comparison's wording: VAT-r2-03) |
| G124-determinism | determinism | WRITTEN | §6.1 *The weather stream* (`view.weather`, seeded per session); §6.5 (9) |
| G124-rendering | rendering | WRITTEN | §8.2 *Weather effects*; §8.4 (i); §8.8 *The weather effects layer*; §11.1; §12.5; R12-38; T-ER-29 |
| G124-V09 | V09 | WRITTEN (the phone default MOOT, R2-41) | V09 §4.21.14; `AppPrefs.weatherEffects`; T-V9-87 |
| G125-determinism | determinism | WRITTEN | §7.7's DR1, DR3, DR19, DR29, DR42 re-sourced; item 1's host inputs |
| G125-rendering | rendering | WRITTEN | §11.4 (the port's only data input; `audience`, `displayNames`, `line`); §11.3 *The host's view commands* (its layer command: VAT-r2-04) |
| G125-V09 | V09 | WRITTEN | V09 §4.21.7 (2), (5); §1b; `view.season.noWeek` |

## Owner items 120–126 — the parts in this lane's members, as new design

| item | determinism | rendering | V09 | V10 | agreement across the members |
|---|---|---|---|---|---|
| 120 Find | not named | §8.2, §9.5, §11.1, §11.2, §12.5 written | §4.21.10 written | §2.6, §2.13, §3.9b (7) written | agree on the key (§2.9's `find`, `FindChip`), the listing (§11.2, T120-2's definition), the eight application kinds, the `find` action's `set`/`add`/`remove`/`clear` and `gaps`, the keys, the budgets and the bars; slips raised by peers: V10's three target kinds (VV910-r2-03), `FindView` (VM-R2T-07), V10's inline layer union (VRC2T-18), the scrubbed week (VRC2T-07, VV910-r2-09), Show gaps with no chip (VRC2T-09) |
| 121 resolution | not named | §8.8, §8.4 (g), §12 written | §4.21.11 written | not named | agree on the levels, the ladder, the reasons and the chip; the idle-view settle is VRC2T-08 |
| 122 crisis looks | DR44 written | §8.2, §8.8, §9.5, §11, §12.5 written | §4.21.12 written | §3.9b (8), `LookAnswer.crises` written | agree on `crises`' shape, the drawn `week` (never the year position), the lines and the knowledge rule; **no read carries the standing looks to V09 and V10 (VAT-r2-05)**; peers: VV910-r2-04, VV910-r2-08, VPC-R2-02, VDC2-09 |
| 123 damage | §6.3 written | §8.6, §11.1 written | §4.21.13 written | §3.9a written | agree on the keys and the reading; **the comparison is restated in two other forms (VAT-r2-02, VAT-r2-03)**; §8.6's form is VRC2T-13 |
| 124 weather | §6.1 written | §8.2, §8.4 (i), §8.8, §11, §12.5 written | §4.21.14 written | not named | agree on the switch (device state), the spell (session state), the defaults and the snow rule; dust haze is VV910-r2-01 / VDC2-05, the empty-week shower VDC2-04 |
| 125 the dossier the only input | DR1, DR3, DR19, DR29, DR42; item 1 written | §11.3, §11.4 written | §4.21.7 written | §1b.5 reads the week as item 125's | agree on the week's one source and the three `HostContext` fields; **the host's layer command disagrees with the set's layer path (VAT-r2-04)**; the `view.set { week }` reading in V09 is VV910-r2-02 |
| 126 (a2) no phone | no clause | no clause (T-ER-08's 390 × 844 viewport gone) | narrow class, `refuse.phone`, the sheet and the phone default gone; T-V9-22 tests the absence | no clause | agree |

## Repair-touched subsections in scope — what was re-checked

**§7.1 (determinism).** E-07's head now names the gates outside a dry run (§11.1's export tier, §11.2's `advance` on a dossier-bound document, the shell's layer gate, V09 §3.9's restore, V10 §3.16's refusals) and V09 §4.9's lead names the same five. The new and changed rows — `refuse.water.reservation` (a conflict, Re-derive from S3), `refuse.table.required`, `refuse.epoch.cap`, the table-edit row without `refuse.table.ownerRule` — each have a V09 row with the same action, and *The returned kinds* names no `reroute`, matching §11.2's `ConflictAction.kind`. The `drawWay` `raised` comment is the kernel and model peers' (VKr2-06, VM-R2T-05); the `addUndergroundAccess` route refusal and its catalogue end are VDC2-16 / VDC2-17 / VKr2-04 / VPC-R2-18.

**§11.2 (rendering).** `Progress.wait` gains `'verify'` and `'undo'` and V09's `progress.<wait>` row words all seven kinds; `generate`'s and `export`'s `signal` and `advance`'s `stopAfter` agree with V09 §3.8 (3), §4.21.9 (2) and J-V9.149; `edit`'s `onProgress` comment's bare §3.9 is VKr2-08. `RuleAnswer.register`, `BarrierKind` in the three fields and `WhyAnswer.members.step` are in, and V10 §2.13 cites them. The gazetteer's Find members and *Find's match listing* agree with V09 §4.21.10 (3), (7) and V10's `FindAnswer`. `ExportOpts` undeclared is VRC2T-12.

**§11.3 and §11.4 (rendering).** The per-viewer keys that never cross a bridge list `find` and `crises` with the item-117 and -118 keys, `thematic`, `workingLayer`, `showUnexcavated` and the weather spell, as §2.9, V09 §4.21.10 (1), §4.21.12 (1) and V10 §3.9b (7) say. §11.4's three `HostContext` fields agree with §7.7 item 1. The host's view commands are VAT-r2-04.

**V09.** §3.3 and §5.3 (VAT-06); §4.3 (VAT-08, R2-22); §4.9's lead and the E-07 rows; §2.10 `run` (eight application kinds, matching V10 §2.6's dispatch table); §2.12's rows for `find`, Find's index, `crises`, the crisis framing, `AppPrefs.resolution`, the chip, the damage lines, `AppPrefs.weatherEffects` and the spell, each against §2.9; §4.21.6 – §4.21.14 whole; §5.4 (Coverage folded in); §6.4's Find row against §12.5; the bar heads T-V9-22, T-V9-83 – T-V9-87 against §13.2's take-over table (both ends name the same bars).

**V10.** §2.6 (the `find` action and its dispatch row); §2.13 (`LookAnswer.crises`, `FindView`, `FindAnswer`); §3.5 (steps 1–4; VAT-R1-02's `app` button; the look and find reads); §3.9a's damage part; §3.9b (7)–(8); §3.16 (the `dossier` row with `refuse.dossierClock`); §4.1 (T1's edit row, `where.locus`); §4.2 (acceptance compares the filtered projection of an unfiltered dry run — the rule VAT-r2-01 asks step 3 to share); §3.23 rows 32–35; T-V10-11, T-V10-51 – T-V10-53.

## Hand-offs of this round, at their destination

| from → to | hand-off | at destination |
|---|---|---|
| V09 → rendering §8.8 | the view-status chip reads the Auto loop's level in force and its reason | closed (§8.8: each change and its reason, read by V09's chip) |
| V09 → rendering §11.3 | `crises` among the per-viewer keys that never cross | closed |
| V10 (CVR-V10-22) → V09 | the `crisis.look.<kind>`, `info.crisis.*` and `info.damage.*` rows | closed (V09 §4.9's family rows) |
| V10 (CVR-V10-22) → V09 | V09 §4.21.12 (3)–(4)'s one evaluation of the standing looks, *exposing* each condition's name and a disaster's districts to the look read | **open** — V09 names no exposure and the API has no read: VAT-r2-05 (the districts' citation alone is VV910-r2-04) |
| V10 → rendering §9.5 | the legend lists each standing look with its condition and weeks | closed as a drawing; as the look read's producer, VAT-r2-05 |
| rendering → V09 | §4.21.10 cited by §9.5; the chip names a DPR by §8.8's rule; the legend's crisis entries read by Show crises and Find | the first two closed; the third is VAT-r2-05 |
| rendering → V10 | `FindAnswer`'s layer union may cite §11.2 | raised by VRC2T-18 (its V10 end named there) |
| rendering → determinism §6.1 | `view.weather`'s mark draws keyed by spell index and cell | raised by VDC2-02 |
| determinism → rendering §11.1 | the geo anchor's default with no realm input | raised by VDC2-12 / VRC2T-11 |

## Issues

### VAT-r2-01 — major · DISAGREE · owner V10

**Claim.** The clerk's scratch commit resubmits filtered lists that §11.2 compares unfiltered. VAT-R1-03's fix makes V10 §3.5 step 3 (l.1450–1457) read the item from `preview(scratch, events, { filtered: true })`, then commit by `edit(scratch, events, { filtered: true })` "with the preview's fates and renames filled, §11.2's resubmission form". It adds: "A commit that answers otherwise than its preview (a `conflict`, or a `confirm` whose fates differ) refuses the item with that answer and records the preview equality check's defect". But the preview's lists are the *filtered* ones. §11.2 *`filtered`* renders a dry run's fates and renames under the caller's key: a withheld place by address and kind, a concealed use and an unexcavated element absent. §11.2 *Confirming fates* commits a resubmission only "when a fresh dry run computes the same fates and renames", and *Knowledge* states that "a `confirm` result go[es] only to an editing role, unfiltered: `confirm` needs the lists back unchanged". So whenever the session's effective key withholds something in an item's fates or renames, the resubmitted lists differ from the fresh dry run's and the engine answers `confirm`. This happens under View as, or with a host-lowered editor key (V10 §2.3). The scratch cannot have moved between the two calls (declarations run one at a time), so the difference is the filter's, not a defect. Yet V10 refuses a lawful item and writes a `previewMismatch` record. Round 1's text confirmed a scratch `confirm` at once. V10 §4.2 (1) avoids the trap on the user's document: it previews *unfiltered* and compares the filtered projection with the card. Step 3 no longer shares that rule.

**Required change.** V10 §3.5 step 3, after "§11.2's resubmission form, as V10 §4.2 (1) commits:", reads: "a `confirm` answer — which a filtered resubmission receives wherever the session's key withholds an entry of the fates or renames (§11.2 *`filtered`*, *Confirming fates*) — is confirmed on the scratch at once, `confirm(scratch, token, fates, renames)` with that answer's own lists. A `confirm` result reaches an editing client unfiltered (§11.2 *Knowledge*), and the scratch is disposable. This holds whenever the filtered projection of the answer's lists at the session's effective key equals the preview's, compared as V10 §4.2 (1) compares (counts, fates by address, renames). Only a `conflict`, or a `confirm` whose projection differs, refuses the item with that answer and records the preview equality check's defect (V10 §2.8)". T-V10-11's scratch clause adds a View as fixture whose declaration moves a concealed use and renames a withheld place: the item commits on the scratch and records no defect. J-V10.127 adds "a filtered resubmission's `confirm` is confirmed with its own lists".

### VAT-r2-02 — major · DISAGREE · owner V09

**Claim.** V09 §4.21.13 (1) (l.3616–3617) states item 123's one comparison as "an element shows damaged when the level is at or above its threshold", citing "R2-38's one comparison". The comparison's home, §6.3 *Plan damage*, says "the element shows damaged exactly while the level is above 0 and at least t — a level of 0 damages nothing, so a building never decayed draws its plan unchanged (`item123.damage`) whatever its kinds' ranges". V03 §5.6 (2) (a) and V11 §3.25.10 say the same. V11's ranges admit lo = 0 and a draw u = 0 (VDC2-07), so V09's reading shows a damage line on a never-decayed building. That contradicts V09's own (4) ("A building never decayed shows no line") and T-V9-86's no-op clause. The panel and the plan would then disagree on the same building. The model and rendering forms of this slip are VDC2-07 and VRC2T-13; V09's is unraised.

**Required change.** V09 §4.21.13 (1): "by R2-38's one comparison — an element shows damaged when the level is at or above its threshold —" → "by §6.3's one comparison — an element shows damaged while the level is above 0 and at least its threshold, so a level of 0 shows nothing —".

### VAT-r2-03 — minor · AMBIGUOUS · owner V10

**Claim.** V10 §3.9a's damage part (l.1803–1808) restates the comparison: "each plan element shown damaged once the building's decay level … reaches the element's one keyed threshold (§6.3's `plan.damage`, within its element kind's range of V11's rows), the one comparison every reader makes". "Reaches" without §6.3's "above 0" reads as level ≥ t. With V11's lo = 0 that damages an element at level 0, which V10's own *Absent* bullet ("a building never decayed has none … `item123.damage`") and T-V10-53's no-op clause exclude. The text holds two readings of one rule. It also restates a rule whose home is §6.3.

**Required change.** V10 §3.9a: "reaches the element's one keyed threshold (§6.3's `plan.damage`, …), the one comparison every reader makes" → "is above 0 and at least the element's one keyed threshold — §6.3's comparison (`plan.damage`, within its element kind's range of V11's rows), the one every reader makes, so a level of 0 damages nothing".

### VAT-r2-04 — major · DISAGREE · owner rendering

**Claim.** The host's "layers shown" command writes a field the set writes only by a logged event. §11.3 *The host's view commands* (l.16282–16285, new this round for item 125 (c)) has a host drive "the layers shown (`view.set` of the view's layer choices, §8.4's `LayerSpec.visible`)". Elsewhere in the set, `LayerSpec` is the document's style state, written by the logged `setLayer`:
- §7.1's binding homes `setLayer` on T12 `dress`, and §7.4's row (l.11019) reads "setLayer … style state (canonical, outside the model digest) | log | … | inverse";
- II.7 (l.20565) has the underground toggle set "the underground `LayerSpec.visible` through `setLayer`";
- V09 §4.3 maps the view chips to `setLayer`, V09 l.4050 records `LayerSpec.showCircuit` as "the style's layer spec (`setLayer`, logged)" (J-V9.54), and V10 §4.1's T12 `layer` encodes `setLayer { layer, spec: { visible } }`.

`view.set` patches only "the view keys that travel" (§11.3, l.16195), and `LayerSpec` is no view key. So by §11.3 a host's toggle changes neither the log nor the document's style state, while the same toggle by a user or the clerk is a logged, undoable event that travels as `doc.changed`. The same command thus has two meanings, and a reload or another client shows different layers. §7.7 item 1 (l.11687) and V08 (`setView`'s comment l.489; §3.16 (4), (6) (g)) restate "a week, the layers shown, a selection" as `view.set` commands. V09 §4.2 (l.1654) calls the visibility a layer switch sets "view state only". This new text sharpens an ambiguity the set had not resolved.

**Required change.** One path for a layer's visibility, the one §7.1, §7.4 and §8.4 already give:
- §11.3 *The host's view commands*: "the layers shown (`view.set` of the view's layer choices, §8.4's `LayerSpec.visible`)" → "the layers shown (a `setLayer { layer, spec: { visible } }` sent by `doc.apply`, as a user's layer toggle is that logged event — §7.1's binding, T12 `dress`; §7.4's `setLayer` row; `LayerSpec` is the document's style state, §8.4, and no view key, so `view.set` never carries it)". The week (`view.set { week }`) and the selection (`view.set { select }`) stay `view.set` commands, keeping R2-33 (b)'s three commands.
- The restatements follow the same form: §7.7 item 1, V08's `setView` comment and its §3.16 (4) and (6) (g).
- V09 §4.2's "(§7.8's layer controls, view state only)" reads "(§7.8's layer controls: `LayerSpec.visible`, written by `setLayer`, §8.4)".

### VAT-r2-05 — major · MATRIX-GAP · owner rendering

**Claim.** Two lists derived for the view — DR44's standing crisis looks and DR43's festival list — are read by three members, and no member produces them through an interface. `live.crises` evaluates DR44 in the generation worker over the model, the view state and the key (§8.2 *The layer*, l.12931). The readers sit on the main thread and in the clerk's harness:
- V09's Show crises controls, crisis card, why lines and Find's `crises` section read "the legend's crisis entries (§9.5: the values drawn) … one evaluation" (V09 §4.21.12 (3), l.3571–3572). V09 §2.12's row (l.1005) has the card "derived from the standing overlays by DR44 at `effectiveKey()`".
- V10's `read_map { kind: 'look' }` takes `LookAnswer.crises` "by §9.5's legend entries" (V10 §3.5, l.1441; §1.2, l.185). That answer needs each look's condition id, map row (`source`), severity, weeks and a disaster's districts (V10 §2.13, l.1001–1011).

But §9.5's legend is a drawn furniture panel: it carries a glyph, a name and weeks, and no data structure holds it. §11.2 has no query kind, answer type or event that returns the standing looks. The main thread does not hold the model, §10.2's crisis table, V01's `disasterDistricts` or V06's `frontierFor`, so neither reader can run DR44 itself. The same holds for the festival list: V09 §4.21.8 (1) and V10's `LookAnswer.festivals` read "§7.7's DR43 … from the dossier", with no read on the API. These are dangling inputs (principle (7): every interface has an implementer and a caller). V10's hand-off CVR-V10-22 asked V09 to *expose* the evaluation; V09 cites only the legend. VV910-r2-04 covers only V09's missing citation of V01's districts.

**Required change.** §11.2 adds one view-bound reader kind:
- `{ kind: 'looks'; view: ViewHandle }`, answered as `LooksAnswer { week: number /* §2.9's week */; yearWeek: number; festivals: { id: string; name?: string; weeks: [number, number]; shown: boolean }[] /* DR43's list in window order */; crises: { look: CrisisLookKind; condition?: Id; source?: { from: 'stressor'|'archetype'|'event'; key: string }; sinceWeek?: number; untilWeek?: number; severity: number; forces?: { headcount: number; groups: number }; districts?: Id[]; massed?: true }[] /* DR44's standing looks, or the preview, in the legend's order */ }`.
- It is computed in the generation worker by the same evaluation `live.crises` draws and §9.5's legend lists, admitted at the view's effective key by *Knowledge* (a withheld condition absent and uncounted). Its row in the call table reads "out: one answer, ≤ 64 KB".

The readers cite it in place of "the legend's entries":
- V09 §4.21.8 (1), §4.21.12 (3)–(7) and §2.12's crisis-card row;
- V10 §2.13 (`LookAnswer.festivals` and `.crises` as projections of `LooksAnswer`) and §3.5's `look` read;
- V10 §1.2's §9.5 row becomes a §11.2 row.

### VAT-r2-06 — minor · NARRATION · owner V09

**Claim.** V09's design text cites adjudication rulings by id — "(R2-30)", "(R2-31 (c))", "(R2-37 (2))", "R2-38's one comparison", "(R2-41)" and the like. These are review-process ids, which principle (5) removes from the design: "per VD2-10 …" is its own example, and the validation records keep the ids. It is on 52 lines outside §9–§12's decision and request records, against 0 in the base and in V10, whose repairs removed them: l.321, 329, 370, 378, 1000, 1298, 1610, 1612, 1725, 2174, 2186, 2191, 2854, 2877, 3284, 3340, 3353, 3364, 3372, 3401, 3402, 3418, 3440, 3504, 3525, 3553, 3557, 3567, 3597, 3609, 3613, 3616, 3625, 3629, 3634, 3637, 3644, 3653, 3658, 3663, 4231, 4258, 4312, 4313, 4318, 4319, 4320, 4321, 4322, 4531, 4539, 4541. VM-R2T-09 (verify-model-r2t) raises l.3284 alone and leaves "the pattern … in V09 (56 lines)" to V09's verifier, who did not raise it.

**Required change.** In V09's design text (every line listed except l.3284, which VM-R2T-09 fixes), delete each adjudication-ruling citation `R2-nn` with its clause letters. Where it stands as the only source of a rule, put that rule's design home in its place:
- R2-22 → §7.4's regenerate row and §10.3;
- R2-30 → §8.8's limit (stop 0);
- R2-31 → V06 §6.8 and §12.1;
- R2-32 and R2-36 → §16's milestone rows;
- R2-33 → §2.9's `find` and §11.3;
- R2-34 → V11 §2.3's `CoverageSpec`;
- R2-35 → §13.2's bar ids;
- R2-37 → §2.9's `crises`, §7.7's DR44 and §10.2;
- R2-38 → §6.3 and V06 §3.23;
- R2-39 → §8.2's snow rule;
- R2-40 → §7.7's DR42;
- R2-41 → item 126 (a2);
- R2-42 → §11.2.

No rule changes. The §9 decision rows and §10 request rows keep their citations as records (R2-10's rule for decision rows).

## Confirmed here, already raised by a landed round-2 peer (not raised again)

| defect seen in this lane | raised as | by |
|---|---|---|
| V10's Find address chip names three target kinds, §2.9's four | VV910-r2-03 | verify-vol-V09-V10-r2t |
| `FindView = ViewState['find']` against §2.9's `ViewState` shape | VM-R2T-07 | verify-model-r2t |
| §11.2's `FindLayer` duplicates `Layer`; V10's two inline unions | VRC2T-18 (its V10 end named) | verify-rendering-r2t |
| Find at a scrubbed week (§8.2's re-runs, V09 §4.21.10 (7)) | VRC2T-07; VV910-r2-09 | verify-rendering-r2t; verify-vol-V09-V10-r2t |
| Show gaps with no chip veils the map | VRC2T-09 | verify-rendering-r2t |
| an Auto change or a DPR change with no gesture to settle | VRC2T-08 | verify-rendering-r2t |
| §8.6 and §2.6 step 7 state the damage comparison as "level ≥ t" | VRC2T-13 / VDC2-08; VDC2-07 | verify-rendering-r2t; verify-determinism-r2t |
| Start a shower now's dust haze against V11's "starts none" | VV910-r2-01; VDC2-05; VDC2-04 | verify-vol-V09-V10-r2t; verify-determinism-r2t |
| V09's `view.set { week }` moving the year position and turning the follow switch off | VV910-r2-02 | verify-vol-V09-V10-r2t |
| V09 never reads V01's `disasterDistricts` | VV910-r2-04 | verify-vol-V09-V10-r2t |
| the crisis card's **Ask the assistant** has no `WhyAnswer` | VV910-r2-08 | verify-vol-V09-V10-r2t |
| two tool-word first uses in V10 §3.5 step 3 and §3.16 | VV910-r2-06 | verify-vol-V09-V10-r2t |
| `edit`'s `onProgress` comment cites a bare §3.9 | VKr2-08 | verify-kernel-r2t |
| §7.1's `drawWay` `raised` comment at the frame | VKr2-06; VM-R2T-05 | verify-kernel-r2t; verify-model-r2t |
| `addUndergroundAccess`'s route refusal: no E-07 row, no V09 row | VDC2-16; VDC2-17; VKr2-04; VPC-R2-18 | verify-determinism-r2t; verify-kernel-r2t; verify-pipeline-r2t |
| DR44's "regional_* pressures `none`" against item 122 (b) | VDC2-09; VPC-R2-02 | verify-determinism-r2t; verify-pipeline-r2t |
| `ExportOpts` declared nowhere | VRC2T-12 | verify-rendering-r2t |
| §11.1's geo-anchor default with no realm input | VRC2T-11; VDC2-12 | verify-rendering-r2t; verify-determinism-r2t |
| V09 §4.21.3 (1)'s "(VM-R1T-14; R2-23)" | VM-R2T-09 | verify-model-r2t |

## Checked and agreeing

- **The refusal card's line.** One source on canvas and clerk: the conflict's `outcome` (§11.2), rendered by its V09 §4.9 row; each action's words from its own `msg` (V09 §3.3, §5.3; V10 §3.5 step 3).
- **The binding and its screens.** §7.1's binding and V09 §4.3 pair by pair, both directions, `people` among T10's scopes; V10 §4.1's encoders within their tools' rows.
- **E-07 and its words.** Every key has its V09 row with E-07's action; E-07's head and V09 §4.9's lead name the same five gates outside a dry run; V10 §3.16's categories reach every key (`refuse.dossierClock` in `dossier`, `refuse.islandsRung` kept in `rule`, R2-02).
- **The dossier clock.** §11.2's answer, E-07's head, V09 §4.3, §4.9's row (`button.whatIf`, `button.showWhy`), V10 §4.1's T1 row, §3.16's `dossier` row and §3.5's one `app` button.
- **The run controls.** `Progress`'s seven waits, `signal`, `stopAfter` and `onProgress` in §11.2 and V09 §3.8 (3), §4.21.9 and the `progress.*` rows.
- **Find.** §2.9's key and `FindChip`, §11.2's listing, §8.2's rows, §9.5, V09 §4.21.10, V10's action and read: one key, one listing, one index rebuilt per commit, the same budgets; the eight application kinds in V09 §2.10 and V10 §2.6.
- **The crisis display.** `crises`' shape and default, the drawn `week` against which conditions are read, never the year position (§2.9, §8.2, DR44, V09 §4.21.12 (3), V10 §3.9b (8)); the lines' keys one home (V09 §4.9), rendered by V10.
- **Resolution and weather.** `AppPrefs.resolution` and `AppPrefs.weatherEffects` as device state; the spell as session state; the levels, reasons and defaults in §2.9, §8.8 and V09.
- **The week and the host's fields.** DR42, §2.9 *The week's source*, V09 §4.21.7 and V10 §1b.5 give one source; §7.7 item 1 and §11.4 name the same three `HostContext` fields; no retired input remains in V09 or V10.
- **Item 126 (a2).** No phone layout, screen, catalogue row, default or fixture in the four members.
- **The bars.** V09's and V10's test heads take the R2-35 ids §13.2's take-over table lists for them.
