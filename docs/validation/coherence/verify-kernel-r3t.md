# Coherence verify — base part §3 geometry kernel, round 3 (coherence/verify-kernel-r3t)

> Opus seat standing in for the verifier; round 3 after coherence/assemble-r3. PENDING FABLE REVIEW.

PROGRESS (lane `coherence/verify-kernel-r3t`, 2026-10-01, cloud checkout)
- P0 brief read whole (round-3 notes, owner rules 114–126, orchestration notes); resume state: no output, no LANDED line — fresh start: done
- P1 orientation: live base sha256 `593c657d…` (assemble-r3's output), pre-round base `4ed292e9…` (HEAD `920d280`); §3 diff r2 → r3: done (4 hunks, all the kernel's)
- P2 the 9 round-2 findings VKr2-01 – VKr2-09 re-checked against the live text and adjudication-r3's dispositions, second ends included: done
- P3 §3.1 and §3.2 (the kernel's two REPLACE blocks) read whole; J-A81.31 restated; seams under §3's pointers in other units' round-3 text: done
- P4 g items (canon routings through item 126; adjudication-r3 Part I) for kernel parts; phone clauses: done
- P5 references, ids, retired terms, deferral wording, doc checks: done
- P6 issues, result JSON, LANDED: done

## Outcome

**All 9 round-2 findings are fixed in the live text**, each as adjudication-r3 disposed it:

- VKr2-01 and VKr2-02 per R3-25 (b), in the first form;
- VKr2-03 as written, plus V04's L5 reader;
- VKr2-04 through VDC2-16;
- VKr2-05, VKr2-06 and VKr2-07 per R3-25 (a), VM-R2T-04's §4.6 clause in the ruling's words;
- VKr2-08 as written;
- VKr2-09, regraded major, with its scope correctly widened to walkway bands and chamber floors (§3.7).

None is partly fixed, fixed wrongly or skipped. The kernel's round-3 text is exactly the four hunks repair-r3-kernel.md
declares, and no other unit's block touches §3.

No dated ruling of canon.md through "adjudication round 3", and no g item through 126, names a kernel part, so there is
no F-MISSING. §3 holds no phone clause (item 126 (a2)) and still reads no dossier field (item 125; §3.11).

**4 new issues — 0 blocker, 3 major, 1 minor** (owners: pipeline 1, kernel 1, scope 1, model 1). All of them sit around
the epoch frame growth that this round's §3.2 (9) text extends:

- **VKr3-01 (major, pipeline).** §3.2 (9) and §2.7 `RaisedFoot` both hand a ring-end raised foot to "the raised way's
  re-derivation" after a frame growth. §4.11's epoch run never schedules that re-derivation, so T110-2's new clause
  cannot pass. §4.11 and J-A81.41 also still summarise part 0's margin as one L0 batch. Both are hand-offs repair-r3-kernel
  listed and no repair wrote.
- **VKr3-02 (major, kernel) and VKr3-03 (major, scope).** A frame growth whose law moves a side out by no more than
  `attractCm` has no defined outcome. §3.6's attraction would lay the new chain onto the old one before the strip
  removes its rows. The case is reachable: a frame kept through a decline, re-crossing a band a few people above its
  old peak. It is also untested. repair-r3-kernel.md observed it in passing.
- **VKr3-04 (minor, model).** §2.7's `RaisedFoot` describes the frame growth without the kernel's interim move of the
  ground end.

## Sizes

| measure | archive §3 | round 2 (`4ed292e9…`) | live (`593c657d…`) |
|---|---|---|---|
| words (`wc -w` on the section as extracted, heading included) | 23 323 | 24 678 | 24 946 (+268; +7.0 % on the archive) |
| lines | 1 228 | 1 297 | 1 308 |

The +268 words are VKr2-01's paragraph, (b)'s opening and VKr2-03's bracket; repair-r3-kernel.md counts +275 by its own
extraction. This round removed nothing, so no nuance audit was required. The part stays above the shrink band for the
reason round 0 gave, and this round's growth is defined outcomes and readers the rulings required. That is not a defect.

## Method

1. **§3 diff.** §3 was extracted from the pre-round base (`git show 920d280:docs/ARCHITECTURE.md`, sha256 `4ed292e9…`,
   the base every repair-r3 file was written against) and from the live base (sha256 `593c657d…`, assemble-r3's
   recorded output). The diff has 4 hunks: §3.1's `E_NO_PATH` bracket, §3.2 (9) (b)'s opening and last sentence, the new
   ring-end-foot paragraph, and the undo sentence's "its batches". These are exactly repair-r3-kernel.md's blocks.
2. **§3.1 and §3.2 read whole** (l. 3439–3631), with the new text checked against the mechanisms it calls:
   - §3.3's two op forms and their registration (§4.1: S1 is unnamed, so it registers as callback);
   - §3.3's slot-free tie-breaks (y, then x) and its clear-region rules 1–3;
   - §3.4's doors (`removeEdges` on a `VertexRef`, `splitThrough`'s `row`);
   - §2.2 rule 3: dissolution, the split flag, demotion (b)–(c) and freeing;
   - §2.2's `VertexRef`, which resolves by role key, so a strip must precede its add;
   - §3.10's stored-references and arena-isolation rows (no row binds a foot's two ends to one point);
   - §2.7 `RaisedWayRecord.feet` / `RaisedFoot` and §3.4's raised-way re-derivation paragraph.

   Inventory ids KERNEL-0040, -0086, -0088 and -0092 changed only as R3-25 (b) and VKr2-03's FIX rule, so none is
   CHANGED. The restated J-A81.31 occurs once in the judgment index (l. 22566) and once in Part A (rationale l. 753).
3. **Round-2 findings.** Each was re-checked at the lines its required change named, against Part H's disposition and
   the governing ruling's text (table below).
4. **Seams.**
   - **Bare references.** Every r2 → r3 added line of the base (638) and of the twelve volumes and INDEX.md (1 256) was
     scanned for bare `§3.x` references. Of the 19 found, 9 are wrapped `Vnn` references whose prefix ends the previous
     line. The other 10 are correct base pointers: the kernel's own, §7.1 `drawWay`'s §3.4, §11.1's §3.8 `spine` reader
     (it does carry the room light point and the medial-axis downgrade), T110-2's §3.10 and §3.2 (9), the index row, and
     V04's §3.7 twice.
   - **Kernel tokens.** A second scan looked for kernel ops, types and `E_`/`W_` codes (30 lines, each read). The kernel
     ones are §4.6's feet clause, §7.1's outcome row (`E_NO_PATH`, `refuse.under.route`), V09's catalogue line for that
     key, and V04's two `corridorUnion` rows. The rest are port codes.
   - **Frame-growth restatements.** These were searched set-wide. Only §4.11 (l. 8381–8382) and J-A81.41 restate the
     batches (VKr3-01). R3-25 (c)'s §4.4 S5a text was read against §3.3's clear-region rule 1: supports are point
     attributes (§2.7), not arena geometry, so nothing conflicts.
5. **g items.** canon.md's dated rulings from "File g items 114–116 routed" through "adjudication round 3", and
   adjudication-r3's Part I, name no kernel part. docs/AMENDMENTS-2026-09-28g.md ends at item 126.
6. **Edges.** Each new case the round-3 text opens was walked through:
   - a foot on an old-ring corner (plain-vertex branch: freed by the strip, rule 3 (c));
   - two feet whose nearest new-ring points meet (attraction: one vertex, two rows, each ordinal resolving once);
   - both feet of one way on the ring;
   - a foot on a stretch that keeps a row (outside the case: it stays until the re-derivation).

   Each has a defined outcome. edges.json was searched for frame-growth rows. Its only one, /edges[2677] ("new frame
   equals the old"), is §3.2 (9)'s "nothing runs". The near-equal growth (VKr3-02) has no row.
7. **Scans.**
   - Retired terms: canon's 35 glossary patterns give 0 hits in live §3.
   - Deferral: none; every "later" in §3 means an order of batches or ops.
   - Phone, mobile or small-screen clauses: none.
   - Review ids in §3: none new (the one research id, VIS-11, is pre-existing).
   - Ids: the kernel added none; J-A81.31 was restated in place (one row and one entry).
8. **Doc checks** (`python3 docs/validation/bench/doc_checks.py --doc docs/ARCHITECTURE.md --sections 3 --allow
   docs/validation/doc-checks-allow.tsv`): exit 0. Hits / unreviewed: C1 5/0, C2 1/0, C3 95/0, C4 0/0, S1 0/0, S2 251/0.
   S2 counts the whole document, which grew from 208. The rest is identical to round 2. The script warns "reference
   corpus INCOMPLETE (missing: captures, research/patreon, research/devlogs, research/ftg-docs, research/external) -
   clean-room results are NOT authoritative". The result is therefore **PROVISIONAL** until it is re-run on the machine
   that holds the corpus. assemble-r3's resolver reports 0 broken references set-wide; every new §3 pointer was read at
   its target.

## Round-2 findings — status on the live text

| id | owner | disposition (adjudication-r3 Part H) | status | where (live `docs/ARCHITECTURE.md` unless named) |
|---|---|---|---|---|
| VKr2-01 | kernel | FIX per R3-25 (b), first form | FIXED | §3.2 (9) (b) (l. 3593–3598): "One L0 batch — on part 0 two, where a raised way's foot lies at a deck end on the old ring (below) —" … "`Plat.frame` takes the new frame as its last batch commits"; the paragraph (l. 3604–3615): two L0 batches with the foot batch between them, in the callback form's issue order, each foot's strip by `removeEdges` on its `VertexRef` before its add by `splitThrough` at the new ring's nearest point (ties y then x), the raised part's deck end an antenna end, "so both ends resolve at every stage end"; undo "what its batches removed" (l. 3626). The alternative form is not written. Mechanics sound (Method 2); the re-derivation it hands to is unscheduled at §4.11 (VKr3-01) |
| VKr2-02 | scope | FIX per R3-25 (b) | FIXED | §13.2 T110-2 (l. 18217–18220): "and the same aqueduct through an epoch's frame growth — §3.10's stored-references row passing at every stage end of the epoch, no part-0 vertex left with a row and no edge, and after §4.11 both ends of its ring-end foot on the new rings (§2.7 `RaisedFoot`, §3.2 (9)) —", verbatim |
| VKr2-03 | kernel | FIX | FIXED | §3.1 (l. 3480): "[F-ROUTE; F-VOID — an undercity lifeline's dug connector at generation, II.7.5, II.7.6; in an edit the dry run's refusal, F-EDIT — II.7.6 step 3; a subterranean dossier institution's connector at generation, the next rung of V04 §3.7 L5]". The appended L5 reader is accurate: V04 §3.7 L5 rung (2) is U-DIG's connector, failing to the next rung (V04 l. 2081–2084; its failure table l. 2375) |
| VKr2-04 | determinism | MERGED into VDC2-16 | FIXED (by VDC2-16) | §7.1's outcome table (l. 10462): "or whose connector passes its route's bound or finds no route (II.7.6 step 3: `E_NO_PATH`, …)", the refusal "naming the terrain, the route's bound, or the blocking building or the water table", keys `bend.under.basement`, `refuse.under.basement`, `refuse.under.route`; V09's catalogue carries `refuse.under.route` |
| VKr2-05 | pipeline | FIX per R3-25 (a) (closes VM-R2T-04) | FIXED | §4.3 (l. 5616–5617): "its two ends are its feet on ground part 0 (`RaisedWayRecord.feet`, §2.7)"; §4.6 (l. 6617–6618): "a raised way's feet (§2.7's `RaisedWayRecord.feet`) are ramps or stairs by the same rule, but a foot at a deck end on the arena's outer ring, which draws neither" — R3-25 (a)'s words |
| VKr2-06 | determinism | FIX per R3-25 (a) (closes VM-R2T-05) | FIXED | §7.1 `drawWay` (l. 10154): "its two ends its feet (§2.7's `RaisedWayRecord.feet`)" |
| VKr2-07 | V05 | FIX per R3-25 (a) | FIXED | V05 l. 1687–1688: "A raised part's two ends are its feet on ground part 0 (§2.7's `RaisedWayRecord.feet`; item 110 (b))" |
| VKr2-08 | rendering | FIX | FIXED | §11.2 (l. 16025): "(V09 §4.21.9, V09 §3.9)" |
| VKr2-09 | V04 | FIX (graded major) | FIXED | V04 l. 309: "off the bands `corridorUnion` commits and the chambers' floors, §3.7"; V04 l. 2897 (`cellarWall`): "its outside in neither a band `corridorUnion` commits (a tunnel's, a gallery's or a walkway's) nor a chamber's floor (§3.7)". The widening matches §3.7 (l. 4494–4502: gallery and walkway bands by `corridorUnion`; a chamber's floor a separate L1 face) |

## Issues

### VKr3-01 — major — WIRING — owner: pipeline

**Claim.** This round's §3.2 (9) (l. 3612–3615) and §2.7's `RaisedFoot` (l. 2310–2311) both hand a raised way's
ring-end foot, at a frame growth, to "the raised way's re-derivation". That step "extends the deck to the new ring and
re-places both ends of that foot". §3.2 (9) also grows each raised part by (a) and (b) on its own key (l. 3615–3618), and
(a) clears the content finer than L1 of that part's region faces.

§4.11 *The rung at an epoch* (l. 8372–8392) is the epoch's one statement of what runs after the kernel's growth. It names
S4's through-road continuation, S12a, and the stages that re-derive each kind of cleared face: the hinterland, the
districts, every underground part, and the buried and dug parts. It names no raised part and no raised way's
re-derivation.

A builder of §4.11's epoch therefore runs nothing on a raised part. The deck keeps ending on its part's old ring as an
antenna end, while the kernel has already moved its ground end onto part 0's new ring. The "deck runs between the feet"
of the support step and the span rule then no longer holds. T110-2's new clause, "after §4.11 both ends of its ring-end
foot on the new rings" (l. 18219–18220), cannot pass.

This is a hook with one end (principle (7)), and two builders would build different behaviour, so it is MAJOR.

The same paragraph (l. 8382) and its decision J-A81.41 (rationale l. 639) still summarise the growth as "an L0 batch
replacing the `margin` chain", which part 0's split now contradicts. repair-r3-kernel.md listed both points as HAND-OFFS
1–2. No round-3 repair wrote them, because pipeline held no END line for them.

**Required change.**
1. §4.11, l. 8392: after "`corridorUnion` (§3.7), which draws nothing" and before the closing ")", insert "; on each
   raised part of the ground layer §3.2 (9) grows, its raised way's re-derivation (§3.4) for that part's cleared faces,
   which also extends a deck ending on the old ring to the new ring and re-places both ends of that foot (§2.7
   `RaisedFoot`)".
2. §4.11, l. 8382: replace "an L0 batch replacing the `margin` chain," with "an L0 batch replacing the `margin` chain (on
   part 0 two, a raised way's ring-end foot moved between them, §3.2 (9)),".
3. Rationale J-A81.41: replace "an L0 batch that replaces the margin chain" with "an L0 batch that replaces the margin
   chain (on part 0 two where a raised way's foot lies at a deck end on the old ring)".

### VKr3-02 — major — EDGE-UNDEFINED — owner: kernel

**Claim.** §3.2 (9) (l. 3579–3583) keeps the frame, or the arena, at its current size only "where that is no larger", and
"where neither grows, nothing runs". A growth that moves a side out by no more than `attractCm` (26 cm at
`LatticeSpec`'s values, (2)) has no defined outcome.

The case is reachable, because a frame never shrinks while growth happens at an upward crossing (§4.11):
- A CITY made at 10 005 people (law: 25 km² × P ÷ 20 000) declines below 10 000 and keeps its frame.
- It then re-crosses at 10 007. The law's frame is ≈ 0.35 m wider, so each side moves out ≈ 17.7 cm and each arena side
  ≈ 28 cm (× 1.6).
- At the CITY → METROPOLIS edge, each person above the old peak moves a side ≈ 5 cm.

With the frame's sides moving 17.7 cm, (c)'s new rectangle is not laid beside the old one:
1. Its corners lie within `attractCm` of the old corners (25.0 cm), and its sides run within `attractCm` of the old sides
   over their whole length. §3.6 steps 2–3 therefore move the corners onto the old ones and share the old stretches
   (`W_STRETCH_SHARED`), the shared edges gaining the `border` role.
2. (c) then "strips the old rectangle's `border` rows alike", which strips the only border there is.
3. Either role consistency fails and (c) is rejected with no failure class for an epoch's growth, after `Plat.frame` took
   the new frame as (b)'s last batch committed; or a border survives at the old place under a `Plat.frame` naming the new
   one.

(b) behaves the same way whenever the arena's sides move no more than `attractCm`, as at a fold whose margin share barely
exceeds the old. A through-road's continuation (§4.11) and the moved raised foot (VKr2-01) would also span less than
`minEdge` there.

Principle (11) requires a defined outcome at this extreme. repair-r3-kernel.md observed the case in passing (PLAUSIBLE).

**Required change.** §3.2 (9), l. 3580–3581: replace "kept at the current frame where that is no larger; the new arena is
the new frame plus the current law's margin, kept at the current arena where that is no larger." with "kept at the
current frame where that is no larger or would move any side out by at most `attractCm` ((2); measured on the lattice);
the new arena is the new frame plus the current law's margin, kept at the current arena where that is no larger or would
move any side out by at most `attractCm` — so no new chain is laid within attraction of the chain it replaces, which
§3.6 steps 2–3 would merge into it before the strip removes its rows."

### VKr3-03 — major — EDGE-UNTESTED — owner: scope

**Claim.** §13.1's kernel set (l. 17422–17423) grows a frame only in "a frame growth whose frame and arena would be no
larger (nothing runs)" and "a village → town fold". T81-1 (l. 18100: "an epoch whose population target crosses a band upward") and T110-2 grow a frame across a
crossing's step. No fixture moves a side by no more than `attractCm`, the edge VKr3-02 defines. Under principle (11), an untested edge is a MAJOR.

**Required change.** §13.1, l. 17422: replace "a frame growth whose frame and arena would be no larger (nothing runs)" with
"a frame growth whose frame and arena would be no larger (nothing runs), and one whose law would move a side out by at
most `attractCm` — a CITY frame kept through a decline below 10 000 people, re-crossing two people above its peak (frame
and arena kept, nothing runs, no chain stripped; §3.2 (9))".

### VKr3-04 — minor — WIRING — owner: model

**Claim.** §2.7's `RaisedFoot` comment (l. 2310–2311) states the frame growth's effect on a ring-end foot as "A frame
growth (§3.2 (9)) extends the deck to the new ring as §4.11 continues a through-road, the raised way's re-derivation
re-placing both ends of that foot on the new rings". Its writer list (l. 2304–2305) names the generator, the operators
and the way's re-derivation.

Since this round, the kernel's growth itself first moves the ground end's row onto the new ring (§3.2 (9)'s foot batch).
The record's description therefore omits one of its writers (principle (7)). Nothing built changes, because §3.2 (9) is
explicit, so the grade is MINOR.

**Required change.** §2.7, l. 2310–2311: replace "A frame growth (§3.2 (9)) extends the deck to the new ring as §4.11
continues a through-road," with "A frame growth (§3.2 (9)) first moves the foot's ground end onto the new ring (its foot
batch, between part 0's two L0 batches), then extends the deck to the new ring as §4.11 continues a through-road,".

## CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed or read):**
- the two base hashes and the §3 diff (4 hunks, all the kernel's);
- every round-2 finding's status at the lines cited, against Part H and the governing ruling;
- the new paragraph's mechanics against §3.3, §3.4, §2.2 rule 3, §2.2's `VertexRef`, §3.10 and §4.1's op-form registration;
- the 19 bare-reference and 30 kernel-token seam lines, and the set-wide frame-growth restatement search;
- canon's dated rulings through "adjudication round 3", and the g file ending at item 126;
- the retired-term scan (0 of 35), the phone, deferral and review-id scans, and the doc checks (exit 0, provisional);
- the sizes;
- VKr3-01's premises in §4.11, §2.7, §3.2 (9) and T110-2;
- VKr3-02's arithmetic from §1.1's ladder (CITY 25 km² at 20 000; METROPOLIS 64 km² at 50 000) and §3.6 steps 2–3's
  attraction and stretch sharing.

**PLAUSIBLE:**
- That keeping the frame is the narrowest outcome for VKr3-02. The kernel may instead grow every side by more than
  `attractCm`, never past the cap's frame, provided the outcome is defined at every side and VKr3-03 tests it.
- That role consistency (§3.10) is what would reject (c) in VKr3-02's case. If `border` rows of the old and new rectangle
  carry one key, the strip removes them all. If the keys differ, a border survives at the old place. Either way the
  outcome is not the one §3.2 (9) intends.
