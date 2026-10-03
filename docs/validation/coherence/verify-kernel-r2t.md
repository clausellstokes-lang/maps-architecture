# Coherence verify — base part §3 geometry kernel, round 2 (coherence/verify-kernel-r2t)

> Opus seat standing in for the verifier; round 2 after coherence/assemble-r2. PENDING FABLE REVIEW.

PROGRESS (lane `coherence/verify-kernel-r2t`, 2026-10-01, cloud checkout)
- P0 brief read whole (round-2 notes, owner rules 114–126, orchestration notes); resume state: no output, no LANDED line — fresh start: done
- P1 orientation: live base sha256 `4ed292e9…` (assemble-r2's output), pre-round base `137ecc0e…` (HEAD `682e8e9`); §3 diff r1 → r2: done
- P2 the 8 round-1 findings VKr1-01 – VKr1-08 re-checked against the live text and adjudication-r2's rulings: done
- P3 §3.3 and §3.4 (the kernel's two REPLACE blocks) read whole; seams other units' round-2 blocks changed under §3's pointers: done
- P4 g items 114–126 (canon routing, R2-30 – R2-41) for kernel parts; phone clauses (R2-41): done
- P5 references, ids, retired terms, deferral wording, doc checks: done
- P6 issues, result JSON, LANDED: done

## Outcome

**All 8 round-1 findings are fixed in the live text**, each as adjudication-r2 ruled it (R2-24 for VKr1-06/-07, R2-26 (a)
for VKr1-02/-03/-04, ONE FIX with VDC0-27 for VKr1-01, ONE FIX with VAL-R1-14 for VKr1-08). None is partly fixed, none
fixed wrongly, none skipped by the assembler. The kernel's own round-2 text is exactly the two substitutions
repair-r2-kernel.md declares. Both are sound, and §3.3's `expect` now agrees with §5.3's `Invariant.class` and §3.1's
`E_INVARIANT`.

No routing of g items 114–126 (canon's dated rulings, adjudication-r2's R2-30 – R2-41) names a kernel part, so there is
no F-MISSING for the kernel. Items 120–126's text asks nothing of the kernel. Item 123's damage layer is a drawing over
the as-built plan, with no re-cut and no new transient-arena op (§2.6 step 7). The crisis looks are view-only. Item
125's "the dossier the only input" holds at §3.11 ("the kernel reads no dossier field"). §3 holds no phone clause.

**9 new issues — 0 blocker, 2 major, 7 minor** (owners: kernel 2, determinism 2, pipeline 1, rendering 1, scope 1,
V04 1, V05 1). All of them sit where round-2 text written elsewhere meets the kernel's mechanisms or codes:

- **Frame growth (VKr2-01, VKr2-02).** Round 2 put a raised way's ring-end foot on ground part 0's `margin` chain
  (R2-26 (a)). The kernel's frame growth strips that chain, which would leave the foot's vertex with its row and no edge.
  The arena cannot hold such a vertex, and no test covers the case.
- **`E_NO_PATH` (VKr2-03, VKr2-04).** Pipeline's new II.7.6 refusal makes the code reach F-EDIT, which §3.1's bracket
  does not name. §7.1's outcome table has no row for it (pipeline's open hand-off).
- **Restatements of the feet (VKr2-05 – VKr2-07).** Three places still say a raised way's two ends are ramps or stairs,
  against R2-26 (a)'s one statement.
- **Wrong references (VKr2-08, VKr2-09).** A new §11.2 list continuation reads as kernel §3.9, and V04's new damage
  rows name `bandUnion` for the underground bands, which are `corridorUnion`'s.

## Sizes

| measure | archive §3 | round 1 (`137ecc0e…`) | live (`4ed292e9…`) |
|---|---|---|---|
| words (`wc -w` on the section as extracted, heading included) | 23 323 | 24 672 | 24 678 (+6; +5.8 % on the archive) |
| lines | 1 228 | 1 298 | 1 297 |

The +6 words match repair-r2-kernel.md's own count: +14 for VKr1-05's rule, −8 of restatement at VKr1-03. This round
shrank nothing, so no nuance audit was required. The part stays above the shrink band for the reason round 0 gave: its
mechanisms, numeric arguments, receipts and fallbacks are each stated once, plus mandated content. That is not a defect.

## Method

1. **§3 diff.** §3 was extracted from the pre-round base (`git show 682e8e9:docs/ARCHITECTURE.md`, sha256 `137ecc0e…`,
   the base every repair-r2 file was written against) and from the live base (sha256 `4ed292e9…`, assemble-r2's
   recorded output). The diff has exactly the 2 hunks repair-r2-kernel.md declares: §3.3's `KernelTx.expect` comment
   and §3.4's feet sentence, plus its re-wrap. §3.1, §3.2 and §3.5–§3.11 are byte-identical to round 1. No other unit's
   block touches §3.
2. **§3.3 and §3.4 read whole** in the live text (l. 3592–4153), with each substitution checked against its issue, its
   ruling and the seams: §2.7's `RaisedWayRecord.feet` / `RaisedFoot`, §4.1's `RaisedRead.feet`, §5.3's `Invariant`,
   §4.12's `StageDecl`, §3.1's `E_INVARIANT` and §3.10's class-floor sentence.
3. **Round-1 findings.** Each was re-checked at the lines its required change named, against the binding ruling's text
   (table below).
4. **Seams under the kernel's pointers.**
   - **Changed lines.** Every r1 → r2 changed line of the base and the twelve volumes was scanned for bare `§3.x`
     references (37, each read in context; 31 are wrapped `Vnn` references or correct base pointers). A second scan looked
     for kernel op names, kernel types and `E_`/`W_` codes (29 lines, each read).
   - **Label census.** All 52 labelled pointers §3 makes into other parts were checked (§2.2 rules 1–8, §2.6 rule 4 (iii),
     §2.9 steps 3 and 5, §4.2 S1/S3 (3), §4.6 steps 1, 7, 8 (c), §4.7 S10 (0)/(4)/(9), §4.11 step 4, §5.1 (5),
     §6.5 (2)/(7)/(9)/(10), §7.3 (b), items 1–2, §8.1 (5), II.1 (3), the §4.7, §7.4, §12.4 and §12.7 rows, and §13.7 O14 (e)).
     None was renumbered; round 2 only appended items.
   - **Facts.** The METROPOLIS cap's 17.53 km frame that §8.8 now cites from §3.2 matches §3.2 (1)'s aspect-2 frame
     (m₀ = 11.97 m per CSS px, so 17 530 m ÷ m₀ ≈ 1 464 px, as R2-30 says). §4.6 step 8 (c), the `W_CUT_SLID` producer
     §3.1 names, is unchanged.
5. **g items 114–126.** canon.md's dated rulings through "File g item 126 routed" and adjudication-r2's Part F name no
   kernel part. Items 120–126's text in docs/AMENDMENTS-2026-09-28g.md asks nothing of the kernel (scan of l. 1037–1414).
6. **References.** assemble-r2's resolver reports 0 broken references set-wide. The two new wrong references found here are
   continuation and attribution errors that a resolver cannot see (VKr2-08, VKr2-09).
7. **Retired terms, deferral wording, phone.** Canon's 35 glossary patterns: 0 hits in live §3. Deferral wording and
   narration: none (every "later" in §3 means an order of batches). Phone, mobile or small-screen clauses: none.
   **Ids:** the kernel added none this round.
8. **Doc checks** (`python3 docs/validation/bench/doc_checks.py --doc docs/ARCHITECTURE.md --sections 3 --allow
   docs/validation/doc-checks-allow.tsv`): exit 0, with hits / unreviewed of C1 5/0, C2 1/0, C3 95/0, C4 0/0, S1 0/0
   and S2 208/0. S2 counts the whole document, which grew from 183. These are identical to round 1 apart from S2. The
   script warns "reference corpus INCOMPLETE (missing: captures, research/patreon, research/devlogs, research/ftg-docs,
   research/external) - clean-room results are NOT authoritative". The result is therefore **PROVISIONAL** until it is
   re-run on the machine that holds the corpus.

## Round-1 findings — status on the live text

| id | owner | ruling | status | where (live `docs/ARCHITECTURE.md` unless named) |
|---|---|---|---|---|
| VKr1-01 | determinism | ONE FIX with VDC0-27 | FIXED | §5.2 F-RIVER (l. 8963): "descent stalls in a sink (§4.2 S1 (3));" — no `E_NO_PATH`; §3.1 (l. 3450) `[F-ROUTE]` |
| VKr1-02 | model | FIX per R2-26 (a) | FIXED | §2.7 `RaisedWayRecord.feet` (l. 2275); `RaisedFoot.ground` (l. 2290) and the ring-end block (l. 2296–2299); the opening line (l. 2509–2511) "or an end on the arena's outer ring"; the support step (l. 2513–2514) "between its two feet (`RaisedWayRecord.feet`)"; *At the frame* (l. 2611). New seam at the kernel's frame growth: VKr2-01, VKr2-02 |
| VKr1-03 | kernel | FIX per R2-26 (a) | FIXED | §3.4 (l. 4047–4049): "a raised way's two feet (`RaisedWayRecord.feet`, §2.7; item 110 (b)), each a `raised_foot` vertex on part 0 and one on the raised part"; the stray line re-joined |
| VKr1-04 | pipeline | FIX per R2-26 (a) | FIXED | §4.1 `RaisedRead.feet` (l. 4765): "the positions of the ground-part-0 ends of RaisedWayRecord.feet (§2.7)". A further restatement at §4.3: VKr2-05 |
| VKr1-05 | kernel | FIX | FIXED | §3.3 `KernelTx.expect` (l. 3598): "of scope 'batch' and class 'hard' (§4.12, §5.3; a soft row goes to the report, never into `expect`)". Agrees with §5.3 (l. 9018, l. 9081–9082) and §3.1's `E_INVARIANT` (l. 3452) |
| VKr1-06 | determinism | FIX per R2-24 | FIXED | §7.4's frame row, regenerate cell (l. 11184): "a population `adjust` one from the population control's consuming stage (§7.8: the earliest stage that reads it — at the latest S1, which lays the frame from the frame law, §4.1's S1 row)" |
| VKr1-07 | model | FIX per R2-24 | FIXED | §2.2 `Plat.frame` (l. 590): replaced by an epoch's growth, which only grows it, "and by a Re-derive that recomputes the frame (a rung change or a population adjust), which never shrinks it below its protected content (§7.4's frame row)" |
| VKr1-08 | pipeline | ONE FIX with VAL-R1-14 | FIXED | all seven and the union's three more: l. 4788 "V01 §3.5"; l. 6779 "V05 §3.10 (5)"; l. 7155 "V07 §3.10"; l. 7490 "V07 §3.4"; l. 14939 "V07 §2.4"; l. 15126 "V11 §3.7"; l. 15179 "V03 §3.3 S6 (d)"; l. 21318 "V07 §3.5"; l. 6137 "V05 §3.2–V05 §3.7"; l. 20427 "V05 §3.4–V05 §3.7" |

## Issues

### VKr2-01 — major — EDGE-UNDEFINED — owner: kernel

**Claim.** R2-26 (a) put a raised way's ring-end foot on ground part 0's `margin` chain (§2.7 `RaisedFoot`, l. 2296–2299):
"its ground end a `raised_foot` vertex placed by `splitThrough` on ground part 0's `margin` chain at the deck's end point
… no ramp or stair is drawn there". It hands the frame growth to "the raised way's re-derivation re-placing both ends of
that foot on the new rings". The kernel's frame growth runs first, and it does not define what happens to that vertex:

1. Batch (b) on part 0 (§3.2 (9), l. 3563–3566) strips the old ring's `margin` rows, and "a stretch left with no row is
   deleted".
2. At a ring-end foot, part 0 carries no ramp and no way. The foot's vertex therefore loses both its edges and keeps only
   its `raised_foot` row.
3. §3.2 (9)'s vertex rule (l. 3573) says such a vertex "stays". But the arena's vertex record has `out: one outgoing
   half-edge` (§2.2, l. 592), and no text defines a vertex with no edge.
4. §2.2 rule 3's dissolution covers only degree-2 vertices.
5. §3.4's strip of a far end "restores the edge it split", and that edge is gone.

The raised part's own end is an antenna end of its spine, as a through-road's end is. Part 0's end is not. So between the
growth and §4.11's re-derivation, part 0 holds a vertex the kernel cannot represent. Whether the walks, the index and
§3.10's rows hold there, and how the re-derivation then removes it, is undefined. This is canon's named combination
C-raised-frame (edges.json, UNDEFINED), opened by this round's foot on the ring (principle (11)).

**Required change.** §3.2 (9): after "A vertex of an old chain that keeps a row or another edge stays — a through-road's
end on the old ring is an antenna end until §4.11 continues its way — and every other dissolves or stays by §2.2 rule 3."
add:

"A raised way's ground foot at a deck end on the old ring (§2.7 `RaisedFoot`) — a `raised_foot` vertex the strip would
leave with its row and no edge — is never left so. On part 0, batch (b)'s insertion (the new ring with S1's water) and its
strip are then two L0 batches, and between them one batch at the foot row's level moves each such foot: its row is
stripped by `removeEdges` on its `VertexRef`, the vertex dissolving back into the old ring (§2.2 rule 3), and added by
`splitThrough` on the new ring at that ring's point nearest it (ties by lattice address). The deck end on the raised
part's own old ring stays an antenna end of its spine, as a through-road's end does. The raised way's re-derivation
(§4.11) then extends the deck to the new ring and re-places both ends of that foot (§2.7), so both ends resolve at every
stage end (§3.10's stored-references row)."

In (b) itself, replace "`Plat.frame` takes the new frame as this batch commits" with "`Plat.frame` takes the new frame as
its last batch commits".

### VKr2-02 — major — EDGE-UNTESTED — owner: scope

**Claim.** No bar exercises VKr2-01's case: a raised way whose deck ends on the outer ring, carried through an epoch's
frame growth. T110-2 (§13.2, l. 17982–17985) builds "its part sized to the ground's frame plus margin and growing with it"
and "an aqueduct sourced beyond the frame laid to the outer ring without a ramp" as separate clauses. §13.1's kernel set
(l. 17186–17190) grows a frame only in "a frame growth whose frame and arena would be no larger" and "a village → town
fold". Nothing checks the foot through the growth: it must resolve at every stage end, the old ground vertex must leave
nothing behind, and both ends must lie on the new rings after §4.11. Under principle (11) an untested edge is a major.

**Required change.** §13.2 T110-2: after "an aqueduct sourced beyond the frame laid to the outer ring without a ramp," add
"and the same aqueduct through an epoch's frame growth — §3.10's stored-references row passing at every stage end of the
epoch, no part-0 vertex left with a row and no edge, and after §4.11 both ends of its ring-end foot on the new rings (§2.7
`RaisedFoot`, §3.2 (9)) —".

### VKr2-03 — minor — CONFLICT — owner: kernel

**Claim.** §3.1's code list (l. 3450) gives `'E_NO_PATH' // with the closest reached point [F-ROUTE]`. The bracket names
the classes the code reaches, as the brackets of `E_KEPT`, `E_LEVEL` and `E_SELF_INTERSECT` name the dry run.
Pipeline's round-2 text (VPC-R1-23) in II.7.6 step 3 (l. 21252–21256) now routes the same code elsewhere: "a route the
search does not find (`E_NO_PATH`, §3.1 …): the dry run refuses with its reason … (F-EDIT, §5.2)". At generation, the
connection stage runs the same connector for an undercity lifeline (§7.3 item 9 (d)'s *At generation*, l. 10932–10934). A
neighbourhood whose lifeline finds no route is F-VOID's "a neighbourhood left without a lifeline" (§5.2, l. 8978). The
code's home thus names one consumer of three.

**Required change.** §3.1, l. 3450: replace "`// with the closest reached point [F-ROUTE]`" with "`// with the closest
reached point [F-ROUTE; F-VOID — an undercity lifeline's dug connector at generation, II.7.5, II.7.6; in an edit the dry
run's refusal, F-EDIT — II.7.6 step 3]`".

### VKr2-04 — minor — WIRING — owner: determinism

**Claim.** II.7.6 step 3's new refusal has no row in §7.1's outcome table. That refusal (l. 21252–21256, VPC-R1-23) covers
a dug connector the path search cannot route, "naming the blocking building or the water table (F-EDIT, §5.2)". §5.2
F-EDIT detects "every refusal and conflict cause of §7.1's dry-run outcome table". §7.1 calls the table "the one home of
every refusal, conflict and bend cause of a dry run". Yet the table's `addUndergroundAccess` row (l. 10380) covers only
"terrain rules out every basement form … or whose connector passes its route's bound (II.7.6)". So the refusal has no
catalogue key or action. repair-r2-pipeline.md lists this as a HAND-OFF for round 3 that no repair applied; T66-2
(l. 17740–17747) already tests the outcome.

**Required change.** §7.1's outcome table, the `addUndergroundAccess` row:
- replace "or whose connector passes its route's bound (II.7.6)" with "or whose connector passes its route's bound or
  finds no route (II.7.6 step 3, `E_NO_PATH`)";
- in its actions cell, replace "else the refusal naming the terrain or the route's bound" with "else the refusal naming
  the terrain, the route's bound, or the building or water table that blocks the route".

### VKr2-05 — minor — CONFLICT — owner: pipeline

**Claim.** §4.3 *Raised ways* (l. 5572–5573) still reads "its two ends are ramps or stairs joined to ground vertices —
each of its two feet a vertex on part 0 joined by record to one on its part (§3.4) —". R2-26 (a) makes §2.7's
`RaisedWayRecord.feet` the one statement, which §3.4 and §4.1 now cite without restating. §2.7's opening line (l. 2510)
now adds "or an end on the arena's outer ring". §4.3 thus restates the feet, leaves out the ring end, and cites §3.4
rather than the record's home. It is the same defect as VKr1-04.

**Required change.** §4.3: replace "its two ends are ramps or stairs joined to ground vertices — each of its two feet a
vertex on part 0 joined by record to one on its part (§3.4) —," with "its two ends are its feet on ground part 0
(`RaisedWayRecord.feet`, §2.7),".

### VKr2-06 — minor — CONFLICT — owner: determinism

**Claim.** §7.1's `drawWay` comment (l. 10073) reads "raised?: true /* item 110 (b): the deck in its own ground arena
part (§3.4), its two ends ramps or stairs joined to ground vertices, …". A drawn raised course beyond the frame is bent to
the ring (§2.7 *At the frame*, item 101 R2), and that end carries no ramp or stair (`RaisedFoot`). The comment
contradicts the one statement R2-26 (a) rules.

**Required change.** §7.1 `drawWay`: replace "its two ends ramps or stairs joined to ground vertices" with "its two ends
its feet (§2.7's `RaisedWayRecord.feet`)".

### VKr2-07 — minor — CONFLICT — owner: V05

**Claim.** V05 §3 (d) (V05 l. 1687) argues "No raised way reaches an island" from the premise "A raised part's two ends
are ramps or stairs joined to ground vertices (item 110 (b))". That premise restates §2.7 without its ring-end foot (R2-26
(a)). The conclusion holds either way, since every foot lies on ground part 0.

**Required change.** V05 l. 1687: replace "A raised part's two ends are ramps or stairs joined to ground vertices (item
110 (b))" with "A raised part's two ends are its feet on ground part 0 (§2.7's `RaisedWayRecord.feet`; item 110 (b))".

### VKr2-08 — minor — BROKEN-REFERENCE — owner: rendering

**Claim.** Round 2's §11.2 `apply` signature (R2-42) has `onProgress` for a `'undo'` wait (l. 15850): "a group of `undo`
or `redo` events, its events undone or redone of the total (V09 §4.21.9, §3.9)". Under canon S7 the bare `§3.9` reads as
the kernel's *Geometry in the document*, which says nothing of undo progress. The meant section is V09 §3.9 *Undo, redo,
restore points and "open a copy from here"* (V09 l. 1312). It is the list-continuation class of VKr1-08, new this round.

**Required change.** §11.2, l. 15850: "(V09 §4.21.9, §3.9)" → "(V09 §4.21.9, V09 §3.9)".

### VKr2-09 — minor — CONFLICT — owner: V04

**Claim.** V04's round-2 damage rows (item 123) name `bandUnion` for underground bands in two places:
- the `cellarWall` kind (V04 l. 2886): "an underground building's wall run on a footprint side that lies on its part's
  rock (outside the part's `bandUnion`, §3.7)";
- the read map (V04 l. 308): "each underground building's footprint sides on its part's rock (§3.7's `bandUnion`)".

But §3.7 gives `bandUnion` the wall bands, glacis, tower and gatehouse footprints (l. 4440–4441). A tunnel's or gallery's
band — bore plus wall, whose outer ring is the kerb — is committed by `corridorUnion` (§3.7, l. 4445–4451; §2.2 rule 1's
underground parts; V04's own l. 1135 and l. 2010). The rows name the wrong kernel function for the band a footprint side
is tested against.

**Required change.** V04 l. 2886: replace "(outside the part's `bandUnion`, §3.7)" with "(off its tunnel's or gallery's
band, which `corridorUnion` commits, §3.7)". V04 l. 308: replace "(§3.7's `bandUnion`)" with "(off the bands
`corridorUnion` commits, §3.7)".

## CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed or read):**
- the two base hashes and the §3 diff (2 hunks, both the kernel's);
- every round-1 finding's status at the lines cited, against its ruling's text;
- the 37 bare-reference and 29 kernel-token seam lines, and the label census;
- canon's dated rulings for items 114–126 and adjudication-r2's Part F;
- the retired-term scan (0 of 35), the phone and deferral scans, the doc checks' counts (exit 0, provisional) and the sizes;
- each new issue's premises, read at the lines cited.

**PLAUSIBLE:**
- that VKr2-01's two-batch move is the narrowest shape. The kernel may choose another, for example a defined isolated
  vertex with `out` = −1 that the re-derivation deletes, provided both ends resolve at every stage end and the case is tested;
- that the undercity lifeline's connector at generation reaches F-VOID through `E_NO_PATH` (VKr2-03). The lifeline steps
  are II.7.6's connector by §7.3 item 9 (d)'s *At generation*, but no text names the code there.
