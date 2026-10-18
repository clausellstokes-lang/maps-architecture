# Coherence verify — base part §3 geometry kernel, round 1 (coherence/verify-kernel-r1t)

> Opus seat standing in for the verifier; round 1 after coherence/assemble-r1. PENDING FABLE REVIEW.

PROGRESS (lane `coherence/verify-kernel-r1t`, 2026-10-01, cloud checkout)
- P0 brief read whole (round-1 notes, items 120–124 and the orchestration notes); resume state: no output, no LANDED line — fresh start: done
- P1 orientation: live base sha256 `137ecc0e…` (assemble-r1's output), pre-round base `484af066…` (HEAD `3f0e02b2`); §3 diff r0 → r1: done
- P2 the 25 round-0 findings VK0-01 – VK0-25 re-checked against the live text, whatever unit owned them: done
- P3 §3.1–§3.5 (the five subsections the kernel's REPLACE blocks cover) read whole; the seams other units' round-1 blocks changed under §3's pointers (§2.1, §2.2, §2.7, §2.9, §4.1, §4.3, §4.7, §5.1–§5.3, §7.1, §7.4, §12.4, §13.1–§13.2): done
- P4 canon's dated rulings for g items 120, 121–123, 124 (and the later 122 (h)–(i), 125): done
- P5 references, ids, retired terms, deferral wording, doc checks: done
- P6 issues, result JSON, LANDED: done

## Outcome

**All 25 round-0 findings are fixed in the live text** (kernel 4, model 4, pipeline 6, determinism 3, rendering 2, scope 2,
V06 2, V03 1, V09 1); none partly fixed, none fixed wrongly, none skipped by the assembler, none under a ruling request.
**8 new issues — 0 blocker, 1 major, 7 minor** (owners: model 2, kernel 2, pipeline 2, determinism 2). Most sit where two
round-1 repairs, written in parallel, meet. Determinism's VDC0-27 put `E_NO_PATH` into §5.2 F-RIVER from §3.1's old bracket,
and the kernel's VK0-11 removed it from that bracket (VKr1-01). The model's new `RaisedWayRecord.feet` (VK0-06's fix) has no
foot at a deck that ends on the outer ring without a ramp, a case §2.7 *At the frame* and T110-2 already build (VKr1-02, with
two restatements of the feet's place, VKr1-03 and VKr1-04). The determinism hand-off the kernel closed in §3.2 (9) (VEL0-04)
says a population `adjust` recomputes the frame, but §7.4 re-derives it from S2, after S1 has laid the frame (VKr1-06), and
§2.2's `Plat.frame` comment still says only an epoch replaces the frame (VKr1-07). Determinism's new `Invariant` type gives
every row a hard or soft class that §3.3's `expect` does not separate (VKr1-05). Seven pipeline list continuations read, under
canon S7, as kernel subsections (VKr1-08; assemble-r1's ambiguous list).

The kernel's own round-1 text is sound: the eight substitutions of repair-r1-kernel.md are the only change to §3 (no other
unit's block touches §3). Each was re-read against its issue and its targets: every new pointer resolves to the stated fact,
the VK0-23 reorder keeps every figure, and the VK0-19 row restores the archive's two recursion bounds as pointers. The VEL0-04
sentence agrees with §7.1's `bend.frame.held` row and §7.4's frame row. None of g items 120–125 names a kernel part in canon's
dated rulings, so there is no G120–G125 F-MISSING for the kernel.

## Sizes

| measure | archive §3 | round 0 (`484af066…`) | live (`137ecc0e…`) |
|---|---|---|---|
| words (`wc -w` on the section as extracted, heading included) | 23 323 | 24 607 | 24 672 (+65, +0.3 % on round 0; +5.8 % on the archive) |
| lines | 1 228 | 1 294 | 1 298 |

This round shrank nothing, so no nuance audit was compelled. The 65 added words are pointers and the VEL0-04 hand-off
sentence (repair-r1-kernel.md's count matches). The part stays above the shrink band for round 0's reason: its mechanisms,
numeric arguments, receipts and fallbacks are each stated once, plus the content that was mandated. Not a defect.

## Method

1. **§3 diff.** The pre-round base (`git show 3f0e02b2:docs/ARCHITECTURE.md`, sha256 `484af066…`, = assemble-r0's output
   the repairs were written against) against the live base, §3 extracted from each. The word diff has exactly the 8 hunks
   repair-r1-kernel.md declares (§3.1 `E_NO_PATH`; §3.2 (9) ×3; §3.3 pool step 1; §3.4 ×2; §3.5). §3.6–§3.11 are
   byte-identical to round 0.
2. **§3.1–§3.5 read whole** in the live text (l. 3268–4033), each substitution against its issue and the archive.
3. **Round-0 findings** re-checked one by one at the lines their required changes named (table below), the owning
   unit's repair file consulted. Pipeline and determinism fixed theirs without naming the VK0 ids.
4. **Seams under §3's pointers.** 98 base subsections changed this round. A label census found no numbered step, rule or
   item renumbered: §4.7 and §8.1 only append items. Both italic anchors §3 cites resolve (§2.2 *Size*, §2.7 *At the
   frame*). The 85 bare `§3.x` references in changed lines outside §3 were each read in context. The kernel's facts restated
   or relied on elsewhere were read at the new text: raised parts and feet (§2.1, §2.2 rules 1, 2, 7, §2.7, §2.8, §4.1,
   §4.3), stretch-state knots (§2.2 rule 5), the corrupt cache (§2.9), the `Invariant` type (§5.3), §5.1's tiers, §5.2's rows,
   the frame (§2.2, §7.1, §7.4, §4.11), the merge row (§12.4) and the kernel fixtures (§13.1, §13.2). §14's `Kernel` is
   unchanged.
5. **g items 114–125.** canon.md's dated rulings ("File g items 114–116 routed" through "item 122 (h)–(i) and item 125
   routed") name no kernel part. Items 120–125's text in docs/AMENDMENTS-2026-09-28g.md asks nothing of the kernel: item 123's
   damage layer lies over the plan the transient arena already returns and needs no new op.
6. **References.** assemble-r1's resolver: 49 788 checked, 0 broken, no ambiguous reference on a §3 line. Its 82
   ambiguous-form references were read for those whose S7 reading lands on a kernel subsection: 7 list continuations
   (VKr1-08). Four base ranges ("V05 §3.2–§3.7", "V04 §3.5–§3.6", "V05 §3.2–§3.10", "V05 §3.4–§3.7") read as their volume.
   V03 l. 2023 "(§3.2 (9))" and V10 l. 2610 "§3.2's rule" correctly mean the base.
7. **Retired terms:** 0 hits of canon's 35 glossary patterns in live §3. **Deferral wording and narration:** none in §3.
   **Ids:** the kernel added none. assemble-r1 finds no duplicate id definition set-wide.
8. **Doc checks** (`python3 docs/validation/bench/doc_checks.py --doc docs/ARCHITECTURE.md --sections 3 --allow
   docs/validation/doc-checks-allow.tsv`): exit 0; C1 5/0, C2 1/0, C3 95/0, C4 0/0, S1 0/0, S2 183/0 (hits / unreviewed;
   S2 counts the whole document, which grew from 139). Identical on the pre-round base but S2. The script warns "reference
   corpus INCOMPLETE (missing: captures, research/patreon, research/devlogs, research/ftg-docs, research/external) —
   clean-room results are NOT authoritative", so the result is **PROVISIONAL** until it is re-run on the machine that holds
   the corpus.

## Round-0 findings — status on the live text

| id | owner | status | where (live `docs/ARCHITECTURE.md` unless named) |
|---|---|---|---|
| VK0-01 | rendering | FIXED | §12.4 merge row (l. 15803): "the ≈ 200 000 records S10–S12b create at CITY, merged in O(overlay size) (§3.3 pool step 4) within the 8 ms" |
| VK0-02 | pipeline | FIXED | §4.7 *The class floors* (l. 6492–6493): the FTG sheared-quads clause restored, citing §5.1 (4) (l. 8666, where the principle lives) |
| VK0-03 | rendering | FIXED | §11.1 GeoJSON row (l. 14890) "(an antenna: §3.6 rule 3)"; T-ER-19 (l. 15590) "faces written without antennae, §11.1; an antenna: §3.6 rule 3" |
| VK0-04 | pipeline | FIXED | §4.3 *Raised ways* (l. 5413–5419): deck, spans and channel on the raised part; supports on ground part 0; each foot a vertex on part 0 joined by record |
| VK0-05 | model | FIXED | §2.1 *Arena parts* (l. 534–541, `nextGroundPart` among the counters); `PlatKey` (l. 563); §2.2 rule 1's raised-part bullet (l. 663–667); rule 2 (l. 682–686) |
| VK0-06 | model | FIXED | §2.2 rule 7's `raised_foot` (l. 878); §2.7 `RaisedWayRecord.feet`, `RaisedFoot` with its lifecycle (l. 2219, 2233–2238); §2.8 `Identity.key` (l. 2615). New edge at the frame: VKr1-02 |
| VK0-07 | kernel | FIXED | §3.4 (l. 3894 `Document.nextGroundPart`, l. 3897–3898 the `raised` data key, l. 3906–3908 `RaisedWayRecord.feet` / `raised_foot`); §3.2 (9) (l. 3435, §2.7 *At the frame*) |
| VK0-08 | determinism | FIXED | §5.2 F-REDERIVE (l. 8793): §3.10's stored-references row in detection; successor address → tombstone in the ladder; locked or pinned → F-EDIT |
| VK0-09 | determinism | FIXED | §5.3 `interface Invariant` (l. 8819–8830). New seam: VKr1-05 |
| VK0-10 | determinism | FIXED | §5.2 F-CUT (l. 8768), F-CORRIDOR (l. 8769), F-PLOT (l. 8778) and F-SKELETON (l. 8787, the third trigger) name the codes |
| VK0-11 | kernel | FIXED | §3.1 (l. 3309) `E_NO_PATH` [F-ROUTE]. Its counterpart in §5.2 F-RIVER was re-introduced by determinism's VDC0-27: VKr1-01 |
| VK0-12 | pipeline | FIXED | §4.3 *Lattice and costs* (l. 5357–5359) `hexLattice`, jitter below half the spacing; §4.7 S11 (l. 6870–6871) `offsetFace` |
| VK0-13 | model | FIXED | §2.9 *Corrupt cache* (l. 3047–3049): decode failure and unresolved lattice-point reference added |
| VK0-14 | pipeline | FIXED | §4.1 *Transactions* (l. 4686–4687): `E_SELF_INTERSECT`, `E_INVARIANT`; no `E_NON_SIMPLE` left anywhere in the set |
| VK0-15 | V03 | FIXED | V03 l. 1242–1243 (`E_DEGENERATE` `seed` / `overlap`, §3.4) and l. 1993–1994 |
| VK0-16 | V06 | FIXED | V06 l. 3185 |
| VK0-17 | V09 | FIXED | V09 l. 1441–1442 |
| VK0-18 | pipeline | FIXED | §4.7 S11 (l. 6881) "`attractCm` (§2.2's `LatticeSpec`; its meaning §3.2 (2))"; §4.3 (l. 5394) "within `attractCm` (§3.6)" |
| VK0-19 | kernel | FIXED | §3.5 (l. 4021): §4.6 step 1's stop test (l. 6203) and the recursion-depth work limit (§5.1 (5), l. 8667–8668; F-WORK) |
| VK0-20 | scope | FIXED | §13.2 (l. 16452, l. 16508) "no merge raising / failing with `E_SCOPE`"; §3.10's pool-scope row exists (l. 4519) |
| VK0-21 | V06 | FIXED | V06 l. 526 "(V06 §3.11)" |
| VK0-22 | pipeline | FIXED | §4.11 (l. 8145–8146) "V07 §2.1, V07 §3.11"; §10.2 (l. 14414) "V07 §3.2 (3), V07 §3.11"; no other bare `§3.11` in the base but the kernel's own |
| VK0-23 | kernel | FIXED | §3.3 pool step 1 (l. 3639–3640): the ≈ 4.6 ms receipt again belongs to the one-click copies; every figure kept |
| VK0-24 | scope | FIXED | §13.1 *expectations* (l. 16334–16338): each `onFail`, the angle floor after repair, the non-floor `E_INVARIANT` |
| VK0-25 | model | FIXED | §2.2 rule 5 *Write* (l. 836–845): renumbering from 0 in chain order in the same batch through §3.4's doors, no two vertices on one ordinal at any step. Checked: the after-stretch knots shift by one delta, so last-first rising and first-last falling always target a free ordinal |

## Issues

### VKr1-01 — minor — CONFLICT — owner: determinism

**Claim.** §5.2's F-RIVER detection cell (l. 8771) reads "descent stalls in a sink (`E_NO_PATH`, with the closest reached
point, §3.1)". Determinism's VDC0-27 added the clause this round from §3.1's former bracket `[F-ROUTE, F-RIVER]`. The kernel's
VK0-11 fix, landed in the same round, narrowed that bracket to `[F-ROUTE]` (l. 3309). The reason: a river's course is traced
by steepest descent (§4.2 S1 (3), l. 4888–4893), never by the path search, which alone returns `E_NO_PATH` (§3.1's path-search
row, l. 3285). F-RIVER now names a code its stages never receive and contradicts the code's home. repair-r1-kernel.md
records this as its cross-unit note 1.

**Required change.** §5.2 F-RIVER, detection: replace "descent stalls in a sink (`E_NO_PATH`, with the closest reached
point, §3.1);" with "descent stalls in a sink (§4.2 S1 (3));". VDC0-27's other clauses stand.

### VKr1-02 — major — EDGE-UNDEFINED — owner: model

**Claim.** Round 1 gave every raised way `feet: [RaisedFoot, RaisedFoot]` (§2.7, l. 2219, 2233–2238), defined as "the deck's
two ends … where its ramps or stairs meet ground part 0". The same block says "a raised way carries them from its first
commit … so no document holds one without them", and §3.10's stored-references row (l. 4516) requires "a raised way's two
feet each in the part its end names". But §2.7 *At the frame* (l. 2526–2533) lays an aqueduct sourced beyond the frame "up to
the arena's outer ring, its deck ending there without a ramp", and a declared course drawn beyond the frame bends to the ring.
T110-2 builds exactly that fixture (§13.2, l. 17121–17124). At that end no ramp or stair meets part 0, so four things are
undefined there:
- the foot's ground end and its `raised_foot` vertex;
- the support step's length L, measured "between its two feet (where its ramps or stairs meet part 0)" (l. 2440–2441);
- §2.7's own opening line, "its two ends ramps or stairs joined to ground vertices" (l. 2438);
- what an epoch's frame growth (§3.2 (9)), which strips the old ring, does to that end.

The hard stored-references row then fails with `E_INVARIANT` at stage end on T110-2's fixture, an outcome no text intends.
This is the combination of item 110 (b)'s raised way with the frame (principle (11)), opened by this round's feet record.

**Required change.** §2.7: in `RaisedFoot`'s comment block, after "re-placed by the way's re-derivation, one transaction per
part (§3.4)", and in *At the frame*, after "its deck ending there without a ramp", add:

"At a deck end on the arena's outer ring — an aqueduct sourced beyond the frame, a declared course bent to the ring — foot i is
that ring point: its ground end a `raised_foot` vertex placed by `splitThrough` on ground part 0's `margin` chain at the
deck's end point, its deck end the spine's end on the part's own `margin` ring; no ramp or stair is drawn there. A frame
growth (§3.2 (9)) extends the deck to the new ring as §4.11 continues a through-road, the raised way's re-derivation
re-placing both ends of that foot on the new rings, one transaction per part (§3.4)."

In the same section:
- l. 2438: replace "its two ends ramps or stairs joined to ground vertices" with "its two ends ramps or stairs joined to
  ground vertices, or an end on the outer ring (*At the frame*)".
- The support step (l. 2440–2441): replace "between its two feet (where its ramps or stairs meet part 0)" with "between its
  two feet (`RaisedWayRecord.feet`)".

### VKr1-03 — minor — CONFLICT — owner: kernel

**Claim.** §3.4 *A layer's several arenas* (l. 3906–3908) says "a raised way's two feet (`RaisedWayRecord.feet`, §2.7), where
its ramps or stairs meet part 0 (item 110 (b))". That restates where the feet lie, which is §2.7's to state. It also
contradicts §2.7 *At the frame*: a deck that ends on the outer ring has no ramp (VKr1-02).

**Required change.** §3.4: replace "a raised way's two feet (`RaisedWayRecord.feet`, §2.7), where its ramps or stairs meet
part 0 (item 110 (b)), each a `raised_foot` vertex on part 0 and one on the raised part" with "a raised way's two feet
(`RaisedWayRecord.feet`, §2.7; item 110 (b)), each a `raised_foot` vertex on part 0 and one on the raised part".

### VKr1-04 — minor — CONFLICT — owner: pipeline

**Claim.** §4.1's `RaisedRead.feet` comment (l. 4625), "the two part-0 vertices where its ramps or stairs meet the ground
(§3.4)", repeats the same restatement. It contradicts §2.7 *At the frame* for a deck that ends on the outer ring (VKr1-02)
and cites §3.4 instead of the record's home.

**Required change.** §4.1 `RaisedRead`: `feet: [PointCm, PointCm] /* the positions of the ground-part-0 ends of
RaisedWayRecord.feet (§2.7) */`.

### VKr1-05 — minor — CONFLICT — owner: kernel

**Claim.** §3.3's `KernelTx.expect` (l. 3457) takes "§5.3's batch-scope invariants … the issuing stage's
StageDecl.invariants of scope 'batch'". *Expectations* (l. 3488–3494) then rejects, repairs or downgrades on any failed
entry. Round 1's §5.3 `Invariant` (l. 8823–8830) gives every row a `class: 'hard'|'soft'` ("hard: aborts the batch; soft (a
statistics band): goes to the report"; l. 8889–8890 likewise), and §3.1's `E_INVARIANT` (l. 3311) speaks of a hard
invariant. A soft batch-scope entry, which the type admits, therefore has two outcomes: a rejected batch (§3.3) or a report
line (§5.3).

**Required change.** §3.3 `KernelTx.expect` comment: "… the issuing stage's StageDecl.invariants of scope 'batch' and class
'hard' (§4.12, §5.3; a soft row goes to the report, never into `expect`), the class floors of the faces it makes among them
(§4.7's class-floor row); …".

### VKr1-06 — minor — CONFLICT — owner: determinism

**Claim.** §7.4's frame row, regenerate cell (l. 10930), reads "a rung change is a Re-derive from S0 and a population
`adjust` one from S2 …, so a re-derivation never shrinks the frame below its protected content". The frame's area follows
the population (§3.2 (9)'s `base` law), and S1 lays the arena's outer ring from the frame (§4.1's S1 row, l. 4692). A
Re-derive from S2 keeps S1's frame, so it can never recompute it. That contradicts:
- the same row's lock cell;
- §7.1's `bend.frame.held` row (l. 10156);
- the round-1 sentence of §3.2 (9) (l. 3403–3405, "A Re-derive that recomputes the frame — a rung change or a population
  `adjust` — reads this law afresh");
- §7.1's Adjust rule, which re-derives from the parameter's consuming stage, the earliest stage that reads it (§7.1, §7.8).

**Required change.** §7.4's frame row, regenerate cell: replace "a population `adjust` one from S2" with "a population
`adjust` one from the population control's consuming stage (§7.8: the earliest stage that reads it — at the latest S1,
which lays the frame from the frame law, §4.1's S1 row)".

### VKr1-07 — minor — CONFLICT — owner: model

**Claim.** §2.2's `Plat.frame` comment (l. 567) reads "set at creation; replaced only by the frame growth of an epoch's
upward rung crossing (§4.11; J-A81.41), which only grows it". That contradicts §3.2 (9)'s round-1 sentence (l. 3403–3405),
§7.4's frame row and §7.1's `bend.frame.held` row: a Re-derive — a rung change or a population `adjust` — recomputes the
frame by its law and may make it smaller, never below its protected content.

**Required change.** §2.2 `Plat`: `frame: Frame /* §3.2 (9): set at creation; replaced by the frame growth of an epoch's
upward rung crossing (§4.11; J-A81.41), which only grows it, and by a Re-derive that recomputes the frame (a rung change or a
population adjust), which never shrinks it below its protected content (§7.4's frame row) */`.

### VKr1-08 — minor — BROKEN-REFERENCE — owner: pipeline

**Claim.** Seven list continuations in the pipeline's text leave a volume's section bare. Under canon S7 (a bare §x.y is the
base's) each reads as a kernel subsection that does not state the fact. They are in assemble-r1's `ambiguous-refs.tsv`, left
"for the verifier":

| line | as written | reads under S7 as |
|---|---|---|
| l. 4648 (§4.1) | "(V01 §3.3, §3.5)" | the creators' failure table |
| l. 6601–6602 (§4.7) | "(V05 §3.9 (4)–(5), §3.10 (5))" | the kernel invariants, which have no (5) |
| l. 6977 (§4.7) | "(V07 §3.6 (5), §3.10)" | the kernel invariants |
| l. 7311 (§4.8) | "(V07 §2.2, §3.4)" | the kernel ops |
| l. 14478 (§10.2) | "(items 105, 107; V11 §2.5, §3.7)" | the kernel booleans |
| l. 14531 (§10.2) | "/* V03 §2.4, §3.3 S6 (d) */" | the transaction protocol |
| l. 20307 (PART III) | "(V07 §3.0, §3.5)" | the creators' failure table |

**Required change.** Prefix each continuation with its volume: "V01 §3.5", "V05 §3.10 (5)", "V07 §3.10", "V07 §3.4",
"V11 §3.7", "V03 §3.3 S6 (d)", "V07 §3.5".

## CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed or read):**
- the two base hashes, and the §3 diff (8 hunks, all the kernel's);
- every round-0 finding's status at the lines cited;
- the label census (no renumbering) and the anchor checks;
- canon's dated rulings for items 114–125;
- the retired-term scan (0 of 35 patterns), the doc checks' counts (exit 0, provisional) and the sizes;
- each new issue's premises, read at the lines cited.

**PLAUSIBLE:**
- that the required change of VKr1-02 is the narrowest design for the frame end; the model may choose another shape, provided
  both feet resolve at a ring end and through a growth;
- that VKr1-06's consuming stage is S0 or S1 (the population's earliest reader is not named in §7.8's registry text).
