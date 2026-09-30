# handfix-b/repair-model-r1 — the MODEL part's hand-fix issues, repaired as blocks

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat handfix-b/repair-model-r1; queued in docs/FABLE-REVIEW-QUEUE.md.

PROGRESS (kill-safe ledger; a seat that continues this lane reads it first)
ITEM read: planned verify-model-r0, verify-kernel-r0 (VKH-01, VKH-02), verify-pipeline-r0 (VPH-04), verify-scope-r0 (VSH-03), closing-report §2–§3, live §2.5, §2.6, §7.1, §3.4 seed clip, §2.8 decline states, §7.3 item 1 and item 7, §7.4 rows, §8.2/§8.4/§8.5 readers, index + Part A rows | done (doc 5d752c9b… / rationale 61477508…)
ITEM rulings: planned VHM-04 vs VKH-01 (tower order), VHM-03 vs VKH-02 (step 4), VHM-02 (trace and tombstone), scope of the passage writes | done (§2)
ITEM compose: planned scratchpad handfix/rm1/compose.py — REPLACE §2.5, §2.6, §7.1 from the live text with count-asserted substitutions; J-ROWS; RATIONALE-A | done (5 blocks; file sha256 1918cbd9…)
ITEM verify: planned apply-blocks on copies (alone and combined with the three sibling files), restated-row swap, hand-offs, probes, refs.py, doc_checks three copies | done (§4)
ITEM close-out: planned queue row, LANDED line | done
ITEM fable-continuation (Fable seat, 2026-09-27 ~17:30–18:00): planned re-read every block against its issues and the live text, re-execute the receipts, check the tower ruling by script, append the continuation section, LANDED | done (no block changed; see "Fable continuation" below)

Lane `handfix-b/repair-model-r1`, 2026-09-27, an opus stand-in for the Fable seat. Base: `docs/ARCHITECTURE.md` sha256
`5d752c9b…`, `docs/ARCHITECTURE-RATIONALE.md` `61477508…` (unchanged through the lane). This seat edited no design file.
Output: `docs/validation/amendments-b/handfix/repair-r1-model.md` (5 blocks, with a hand-off preamble the parser ignores).

## Outcome

All ten model issues are fixed; none is ruled invalid. The blocks REPLACE §2.5, §2.6 and §7.1 (no other round-1 lane
touches them), restate four index rows and one Part A entry, and add judgment call J-A30.26. Three changes fall in
subsections other lanes REPLACE and are therefore handed off, not blocked:

* VHM-01 (3) (T30-4) is carried verbatim by `repair-r1-scope.md`'s §13.2 block (its preamble, hand-off (2)).
* H1: §7.3 item 1 gets the scope clause for the passage writes (determinism's §7.3 block).
* H2: §13.2 T8-3 gets the bar for the trace-and-tombstone rule (scope's §13.2 block).

Applied together with the three sibling files, the swap and the two hand-offs, every change lands once, and my text
adds no document-check hit.

| issue | fixed by | as required? |
|---|---|---|
| VHM-01 | §2.5 headroom comment; §7.1 registry sentence; T30-4 in scope's block; H1 | (1) and (2) widened (§1); (3) verbatim, carried by scope |
| VHM-02 | §2.6 `BaseWing.spans`; §2.5 `frontBuilding` comment; §7.1 buildings row and registry sentence; H1; H2; J-A30.26 | widened to every trace conversion and to `demolish` (§1) |
| VHM-03 = VKH-02 | §2.6 step 4 | VKH-02's pointer, reworded for C3 |
| VHM-04 + VKH-01 | §2.6 stage-3 contract; J-A28.26 index row and Part A | reconciled ruling (§2.1) |
| VHM-05 | J-A29.25 index row | reworded for C3 |
| VHM-06 | J-A28.23 index row | verbatim |
| VPH-04 | §2.6 `households` comment and capacity bullet | verbatim |
| VSH-03 | J-A28.28 index row | verbatim |

## 1 Where the texts differ from the required changes, and why

* **VHM-01 (1).** The undo is named as an event, "(a `setAttr` of heights, §7.1, or the `undo` of one, §7.4)", instead
  of "its former value in that event's undo record, §7.4". §7.4's setAttr row does not list the headroom, so the old
  wording would repeat VD3-08's broken-reference class; §7.4's undo row ("restores its target's scope") covers the
  new wording.
  Two clauses are added:
  * the event holds the passage in its effective scope (§7.3 item 1). Otherwise a heights edit writes the passage's
    leaf outside its scope, and §7.3 item 7 (ii)'s oracle fails; this is V-MAB3-09's class;
  * while no wing spans the passage, the headroom is kept and read by no reader, until S11 writes it with a successor's
    spans. Without this, the rule "the least … over the base wings that span it" has an empty set after VHM-02's clear.
* **VHM-01 (2).** The same sentence also declares `Passage.frontBuilding` derived. It had no edit kind and no registry
  declaration (§2.8's rule), and VHM-02 gives it a second writer. §2.5's `frontBuilding` comment now names its writer.
* **VHM-02.** Three widenings:
  * **Every trace conversion.** `robStone` reaches the same `cleared` state and zeroes the heights (§2.8; §4.11's
    ladder), so the clear is tied to "the event that makes the front building a footprint trace (`robStone` or
    `clear`)" rather than to `clear` alone.
  * **`demolish` clears both fields.** It clears `spans` as well as `frontBuilding`, so the rule is uniform and T8-3's
    bar holds.
  * **Scope and drawing.** Each such event holds the passage in its effective scope (H1). §8.2's passage arch glyph is
    drawn "on the front building's outline", so the text says no span mark, caster or arch glyph is drawn over an
    uncovered passage.

  Rule (2) (a mechanism with its bar) is met by H2. The ruling is recorded as J-A30.26 (amends J-A30.25).
* **VHM-03 / VKH-02.** VKH-02's pointer is adopted (single source). It reads "in the clip order, which the stage-3
  contract states, by §3.4's seed clip", because the literal "in the stage-3 contract's clip order" adds a C3 hit.
* **VHM-05.** The row reads "… at least two wing-local modules long — else the `trapdoor` fallback —, the core stopping
  at the ground storey; a programme row's `basementAccess` names `core` or `trapdoor` only". The literal text adds the
  C3 hit "at the ground storey the".

## 2 Rulings (vetoable; recorded in the index and Part A)

### 2.1 The composed towers in the clip order (VHM-04 with VKH-01; J-A28.26 amended)

The two proposals conflict at one anchor:

* **VHM-04:** a contained tower that overlaps an earlier wing is taken before both wings.
* **VKH-01:** every tower follows its container, whether that container is a wing or a tower, with its round room
  clipped to the container's piece.

VKH-01's tower-in-a-tower branch cannot hold. The container tower's round room is its whole ring, and the contained
tower's room lies inside it. §3.4 refuses fixed rings that overlap, and making the outer room an annulus would give it
a hole.

**Ruled.** Each tower takes one of two places at a storey:

* **After its container.** A tower wholly inside a wing that overlaps no wing taken before that wing is taken directly
  after it.
* **Before all the wings.** Every other tower goes here, in `Composition.towers` order.

In addition:

* No tower lies wholly inside another. A stair inside a tower is that tower's spiral core.
* Each round room is its ring less the rings of the earlier towers it overlaps.
* Every composer's room lies inside one seed piece (VKH-01's clause).

**Why this gives one order and no hole** (PLAUSIBLE, by reasoning; not executed geometry):

* The towers taken before the wings carry no constraint that points back at them.
* A contained tower taken before its container overlaps an earlier wing. That wing is not wholly inside the container,
  since a contained wing follows its container, so the tower's cut reaches the container's edge.
* A contained tower that follows its container overlaps no wing before it, so its room lies in the container's piece.

**Why this is preferred.** It keeps a tower's round room whole in VHM-04's case (the realism tiebreaker, and J-A28.26's
own "a composer's towers are whole"). Of two engaged towers, the later one takes the earlier one's arc.

### 2.2 A front building that becomes a trace or a tombstone (VHM-02 with VHM-01; J-A30.26 new, amends J-A30.25)

**Ruled** as the verifier proposed, widened as §1 says: the spans and `frontBuilding` are cleared in that event, and the
passage face, its `sealed` bit and its plots' access are kept. This was preferred over three alternatives:

* **Refusing the conversion.** Decline must stay applicable to every building (item 8; §2.8).
* **Keeping the spans on a building with no height.** The span mark would then have a height of zero or less.
* **Retyping the passage as an alley.** A decline step changes existence and drawing only, and exposure is never a sight
  line (J-A30.42).

No owner rule is touched. Item 30 (e)'s "vanish by clearance" concerns the court, and nothing here removes a dossier
element or a household (item 20).

## 3 Assembler hand-off (also in the block file's preamble)

1. **Restated rows.**
   * J-ROWS restates J-A28.23, J-A28.26, J-A28.28 and J-A29.25.
   * RATIONALE-A restates J-A28.26.
   * The assembler moves each restated row into its older row's place (`assemble-r1-handoff.py`'s `swap_restated`).
   * J-A30.26 is new.
2. **H1, §7.3 item 1** (in determinism's block). After "composition has a wing spanning the passage (§2.6's carry
   trigger);" insert:
   > an event that changes a spanning wing's heights, or makes its building a footprint trace or a tombstone, holds the passage it spans, whose `headroomCm` or `frontBuilding` it rewrites (§2.5's `Passage`, §2.6's `BaseWing.spans`);
3. **H2, §13.2 T8-3** (in scope's block). Replace "demolished or succeeded;" with:
   > demolished or succeeded, and a front building made a footprint trace or demolished leaves its passage with no `frontBuilding` and no base wing spanning it, the undo restoring both (§2.6's `BaseWing.spans`);

Both old strings occur exactly once after all four round-1 files are applied (script-asserted in `rm1/swap.py`). If the
assembler does not apply them, verify-r1 should re-raise them against §7.3 (determinism) and §13.2 (scope).

## 4 Receipts

All scratch files are under the session scratchpad, `handfix/rm1/`.

* **Composition.** `compose.py` builds each REPLACE body from the live subsection. Every old string is asserted to
  occur once in its subsection and once in the document.
* **Apply alone** (`apply-blocks.py`, then `swap.py --handoff`). 5 of 5 blocks applied, audit not-OK 0.
  * Swap: index 4, Part A 1.
  * The line diff against live shows 15 hunks, all intended: §2.5 l. 876–877; §2.6 l. 959, 965, 1266, 1386–1387 and
    1480; §7.1 l. 6547 and 6588; H1 l. 6693; H2 l. 10283; four index rows and J-A30.26; Part A J-A28.26 and J-A30.26.
  * The installed file gives byte-identical output to the scratch version.
* **Apply combined** with the current `repair-r1-determinism.md` (ec937979…), `-pipeline.md` (530dd858…) and
  `-scope.md` (43dce04e…):
  * 19 of 19 blocks applied; no heading and no id collides.
  * Swap: index 7, Part A 3. Both hand-offs applied.
  * Probes: every new model text occurs once (VHM-01 (3) from scope's block), and every retired text occurs 0 times.
* **References** (`refs.py`). Headings 139, D 35, J 471 → 472 (J-A30.26), broken 2 → 2 (the two pre-existing external
  citations).
* **Document checks** (`doc_checks.py --sections "2,7,13,Judgment calls"`, one corpus snapshot):

| copy | C1 | C2 | C3 | C4 | S1 | S2 | unreviewed | exit |
|---|---|---|---|---|---|---|---|---|
| untouched (live), runs 1–4 | 5 | 0 | 564 | 3 | 0 | 0 | 0 | 0 |
| mine (live + my blocks + swap + H1, H2) | 5 | 0 | 564 | 3 | 0 | 0 | 0 | 0 |
| combined (all four round-1 files + swap + H1, H2) | 5 | 0 | 567 | 3 | 0 | 0 | 2 | 1 |

  The untouched runs were identical, so the corpus held still. The two unreviewed hits in the combined copy ("one 2 6
  step 3", "side of the ring is", §13) come from repair-r1-scope.md's VHM-07 text. That seat's preamble hands them off
  as allow rows. My text adds none: two first drafts added hits, and those were reworded (§1).

## 5 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed): the blocks parse and apply, both alone and combined. The swaps and the hand-off anchors each
occur once. Probes, references and document checks are as tabulated. Every quoted live text was read in place.

**PLAUSIBLE** (reasoning):

* The clip-order argument of §2.1.
* That the assembler applies H1 and H2.
* How often a tower sits at a wing overlap, or a front building is cleared.

## Fable continuation (2026-09-27)

Seat: Claude Fable 5.1, finishing the opus stand-in's lane. By the time this seat ran, `handfix-b/assemble-r1` (13:25) had
applied the five blocks, `handfix-b/verify-model-r1` (14:19) had judged the assembled text, and the round-2 repair seats
had built their blocks on it. Live hashes at this seat: `docs/ARCHITECTURE.md` `e9c0b828…`, `docs/ARCHITECTURE-RATIONALE.md`
`dcabf14b…`, unchanged through it. This seat edited no design file and changed no byte of the block file.

### What was re-checked

Every block was read against its issues and the live text: the ten deltas whole (`vm1/wdiff-r1.txt`, `vm1/rat-r1.diff`),
each changed passage in place (§2.5 l. 876–877; §2.6 l. 959, 965, 1266, 1386, 1478–1485; §7.1 l. 6546, 6587; §7.3 l. 6692;
§13.2 T8-3, T30-4; the six index rows; Part A J-A28.26, J-A30.25, J-A30.26), and every reader a clause leans on: §2.8's
decline states (l. 1692–1707: `robStone` and `clear` both reach `cleared`, heights zeroed; `demolish` a tombstone), §4.11's
`DeclineOp` (l. 5149), §7.4's setAttr, convert and passage rows and its Application paragraph, §3.4's seed clip and
`transientArena` contracts, §8.2's arch row, §8.4 (l. 8052), §8.5 (2) (l. 8131–8136), §11.1 (l. 9163–9164), `StairCore.tower`
(l. 1003), `Composition.towers` (l. 982), and the owner's item 30 (a)–(g).

| issue | verdict | note |
|---|---|---|
| VHM-01 | right and complete | "or the `undo` of one" is preferred to the verifier's "its former value in that event's undo record": an inverse `setAttr` is itself a heights event, and §7.4's setAttr row lists no headroom in its record. "Read by no reader while none does" holds: every non-tunnel reader of `headroomCm` (§5.2 F-EDIT, §7.1, §7.3, §8.4, §8.5 (2), §11.1, T30-4) keys on `frontBuilding` or on a spanning wing |
| VHM-02 | right and complete | the widening to `robStone` closes a path the verifier's `clear`-only text left open (§2.8 l. 1697, §4.11 l. 5149); `demolish` clearing both fields keeps the rule uniform with T8-3. A `delete` of a generator-added front building is covered by the effect wording (§2.8 l. 1693: removed → tombstone) |
| VHM-03 = VKH-02 | right | one pointer; the home states the order |
| VHM-04 + VKH-01 | right; CONFIRMED by script | see below. The stand-in was right to reject VKH-01's tower-in-tower branch (an annulus or two overlapping round rooms) |
| VHM-05, VHM-06, VPH-04, VSH-03 | right | verbatim (VHM-05 reworded for C3, same content) |
| H1, H2 | applied by the assembler | present once (l. 6692; T8-3) |
| J-A30.26 | sound, vetoable | the owner's item 30 (c) defines a passage as a covered way; the ruling keeps an uncovered passage face, its `sealed` bit and its plots' access until a successor, because a decline step changes existence and drawing only and exposure is reach depth, never a sight line (J-A30.42). Item 30 (e)'s "vanish by clearance" is the back court's clearance (`thin … back_court`, which removes the passage face), not the front building's `clear`. The alternative the owner may prefer — retyping the face as an open alley — is named in Part A; the row is the veto surface |

**The tower clip order, executed.** `docs/validation/amendments-b/handfix/tower-order-check.py` (stdlib; a copy in the
scratchpad `handfix/frm1/`) models one storey on a raster: wings as rectangles (nested, tiled and overlapping), towers as
disks, the r1 text's two places and its tower-in-tower ban, and the seed clip as each ring less the union before it. It
checks four properties per case: H1 no piece has a hole; H2 no round room (its ring less the earlier towers it overlaps)
has a hole; H3 every round room lies inside one seed piece (its own when it precedes the wings, its container's when it
follows it); H4 the order is one permutation. Results: seed 1 and seed 2, 3 000 cases each, **0 failures on all four**;
250 VHM-04 configurations (a free tower wholly inside a wing) and 3 014 engaged-tower rooms exercised; the pre-r1 rule
(#15 alone) admitted no order in 1 381 + 1 317 of those cases. The written argument (§2.1 above) also holds for any
connected ring: a component of an earlier wing's overlap with a later one always touches the later one's boundary, so
the tower it carries cuts to the edge.

### Corrections to the block file

None. The five blocks are right and complete against their issues, so none was regenerated; the file's sha256 is still
`1918cbd9c83f65de…`, the bytes `assemble-r1` applied, and re-applying it alone on the pre-round-1 archive copies gives
5/5 applied, audit 0 not-OK, byte-identical to the stand-in's dry run (`frm1/reapply-*.md` against `rm1/mine-*.md`).
Method, recorded for the sibling continuations: this file is consumed history. Had a correction been needed it would have
gone to `repair-model-r2`'s continuation, whose §2.6 REPLACE is generated from the live text — re-applying a round-1
block now would revert round 2.

### Observations, no change

1. A round room cut in two by two earlier engaged towers: the text's "its ring less those of the earlier towers" then
   yields two rings, both inside the same seed piece (H3 held on the union; 127 of 6 000 raster cases, with turrets as
   large as their tower). A turret smaller than its tower on one side never disconnects it, so no text is added; noted
   for the round-2 verifier's reading.
2. A stored composition's `Wing.spans` on a cleared building stays as stored. Its only reader is the plan rung (l. 989),
   a trace of zero floors has no storey to plan, S11's re-fit of a successor regenerates it, and the undo restores the
   building. Dormant, not stale for any reader.

### Receipts re-executed (`scratchpad/handfix/frm1/`)

* `apply-blocks.py --parse-only`: 5 blocks, 973 lines; re-apply alone on `docs/archive/*-pre-handfix-b-repair-r1-2026-09-27.md`
  (`5d752c9b…` / `61477508…`): 5/5, 0 skipped, audit not-OK 0; `cmp` identical to `rm1/mine-doc.md` and `rm1/mine-rat.md`.
* `probes.py` on the live text: 22 new texts (20 document, 2 rationale) once each and 0 in the pre-round-1 archive; 10
  retired texts 0 (each 1–2 in the archive). ALL OK.
* `refs.py` on the live document: headings 139, D ids 35, J ids 472, broken 2 — the two pre-existing external citations.
* `doc_checks.py --sections "2,7,Judgment calls"` on the live document (9 626 JSON files, 911 940 C3 3-grams): C1 5, C2 0,
  C3 507, C4 3, S1 0, S2 0, 0 unreviewed, exit 0. One copy, since this seat changed no design text.
* The live hashes were `e9c0b828…` / `dcabf14b…` before and after every step.

The queue row `A-handfix-b/repair-model-r1` exists (docs/FABLE-REVIEW-QUEUE.md l. 239) and is left for workflows/05; its
"check first" items — the tower ruling, J-A30.26, H1 and H2 — are the ones checked above. The PENDING line stays.

### CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed): the four clip-order properties on the raster family; every new text once and every retired text
absent; the block file's identity with what the assembler consumed; the references and the document checks as tabulated.
**PLAUSIBLE** (reasoning, for the owner): J-A30.26's preference for an uncovered passage face over an alley retype; how
often a tower stands on a wing overlap or a front building is robbed out; the raster model's fidelity — rectangles and
disks stand for lattice rings, and L-shaped wings were not generated, though the written argument covers any connected
ring.
