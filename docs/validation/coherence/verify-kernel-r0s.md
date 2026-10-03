# Verify — the kernel part of the base (§3 geometry kernel) after the coherence rewrite (round 0)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/verify-kernel-r0; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-kernel-r0`, cloud continuation 2026-10-03)
- P1 §3 extracted from the live base and the archive; mechanical checks (references, retired terms, deferral, narration, ids, tokens): done
- P2 inventory check (403 ids) against the mapping table and the new text: done
- P3 canon routes (f and g items, conflicts, wiring, elegance, edges, open findings): done
- P4 section reads archive vs new; cross-part notes addressed to the kernel; agreement with the other units: done
- P5 issues, results file, LANDED: done

## Inputs

The live base `docs/ARCHITECTURE.md` (sha256 `70ce49bfa1c64a8a…`, as assembled by `coherence/assemble-r0`): its `## §3 Geometry
kernel` (l. 3058–4351) is byte-identical to `docs/validation/coherence/new/base/kernel/01-geometry-kernel.md` (md5 `99cb2e2e…`)
but for one trailing blank line. The archive `docs/archive/ARCHITECTURE-pre-coherence-2026-09-28.md` (md5 `01fea21f…`, §3 at
l. 2452–3679) and `docs/archive/volumes-pre-coherence-2026-09-28/`; `inventory-kernel.json` (403 ids, 27 restatements, 10
internal duplications, 8 internal and 5 cross-part conflicts, 4 broken references, 9 wiring gaps, 6 elegance candidates, 8
observed edges); `canon.json` (the kernel unit's routes: 15 conflicts, f items 202/245/279/510/560/575, g item 110's §3.4 part,
9 wiring gaps, E-12–E-15, 77 open findings, 23 undefined and 15 untested edges, 16 agreement subjects); `edges.json`;
`rewrite-kernel.md` (its mapping table, 403 of 403, and its 35 cross-part notes); the other units' rewrite reports (their
notes to the kernel); `docs/AMENDMENTS-2026-09-28f.md`, `docs/AMENDMENTS-2026-09-28g.md` (items 110–114). Scratch:
`scratchpad/coherence/vk0/` (the split subsections, word diffs, token diffs, notes).

## Method

1. §3 split per subsection (intro, 3.1–3.10, new 3.11) in the live base and the archive; `git diff --word-diff` per
   subsection; **every changed hunk read against the archive** and, for every fact the rewrite moved out (a REFERENCE or
   RESTATEMENT row of the mapping table), the destination read to confirm it states the fact.
2. Mechanical: every `§`, `II.`, `Vnn §`, J-, D- and test id in §3 resolved against the live set; the canon's 35 retired-term
   patterns; deferral and narration sweeps; a token diff (numbers with units, identifiers, codes) archive → live, each
   missing token traced to its new home.
3. Canon routes one by one: each conflict ruling, wiring link (both ends), elegance equivalence list, f and g item text,
   open finding and edge class; the agreement subjects against the other units' live text.
4. Cross-part notes: the 35 kernel notes checked at their destinations (to judge whether the kernel's text is now true of
   the set); the notes other units addressed to the kernel (model, determinism, scope, V11) checked in §3.

## Mechanical checks

* Section pointers: 648 in §3, 78 distinct; all resolve (one external, `os-geometry.md` §2.1.4). Volume pointers: V07 §3.2 (1)
  (twice) and V11 §3.1 resolve. J ids (47, J-DET-36 and J-Fredteam-1 included) and D ids all resolve; §3 defines no test id.
* Retired terms: 0 (G-lot's one hit fixed: "the plot cut's one bend"). Deferral wording: 0 (every "later" is temporal).
  Narration: 0 (the one "engineering judge" clause removed); no canon ids (KWG-, KIC-, E-1x) left in the text.
* Token diff: 24 identifiers and ≈ 30 numbers of the archive are absent from §3; every one is traced to a home — `LatticeSpec`'s
  25 / 26 / 500 (§2.2 l. 559), the class floors (§4.7 l. 6173), the rung areas (§1.1 ladder), the cap figures (§12 l. 14714),
  the grid cells (V11 §3.1 l. 939–941), the step (0) and copy figures (§12.4 l. 14826–14829, §2.2 *Size*), the fixed-ring lists
  and storey extents (§2.6 l. 1327, 1333, 1918, 2060), `ridgeAxis` (§2.6 l. 1259), the roof cache key (§8.1 (5)), the
  rotation reason (§7.1 l. 9513), recordCheck's host-face clearance (§7.4 l. 10413), the passage (§2.5 l. 1146, §4.6 l. 6032),
  CGAL's grounds (Part A J-A21.31; "no WASM kernel" §3.7), the FTG sheared-quad note (§5.1 (4) and §13.5's row) — except
  the ≈ 200 000-record basis of the merge and the "our count" of step (0)'s items (VK0-03). `W_STEINER` is removed by a
  recorded ruling (J-K37, index and Part A).

## Sizes (principle (9))

Archive 23 820 words → live 25 103 (Python `split`; `wc -w` in this locale counts 23 323 → 24 607): **+5.4 %**. The rewrite
states why the part misses the band (≈ 1 245 words removed as restatement, duplication and prose; ≈ 2 530 mandated words
added — §3.11's edge table, the `E_DEGENERATE` detail table, the expect/onFail semantics, the warning wiring, g item 110's
raised parts, the edge definitions). Checked: the additions are present and of that order (§3.11 alone is 777 words); no
remaining restatement of another unit's fact was found beyond VK0-12. Not a defect; no >50 % audit applies.

## Inventory check (403 ids)

The mapping table maps all 403 (274 kept, 16 REFERENCE, 110 moved or re-worded in place, 3 removed by ruling). Every kept id
lies in unchanged text or in a hunk read in full; every moved or referenced id's destination was read. Findings: KERNEL-0123
and KERNEL-0132 (step (0)'s count provenance; the merge's record basis) are LOST at their destination (VK0-03); KERNEL-0225's
row in §3.5 is blurred (VK0-04); KERNEL-0082 (frame growth) carries a new defect (VK0-01). Every other id survives with its
meaning; the rewrite's in-place additions were each checked against the archive for contradiction.

## Canon routes

| route | verdict |
|---|---|
| DXC-01 = KXC-01 (`E_OUT_OF_RANGE`'s two uses) | applied: §3.1 comment, §3.6 chain classes; §5.2 F-NUM keeps the code and cites §3.1 |
| DXC-02 = KXC-04 (F-SKELETON) | applied: §3.8 names F-SKELETON; §5.2 cites "§3.8's four post-conditions" (the refused-input case: VD0-16) |
| DXC-06 = KXC-02 (class floors) | applied for the named constants (§4.7 l. 6173); the area floors stay undefined (VK0-08) |
| KIC-01 … KIC-08, KXC-03 | applied as ruled (§3.3 rule 2; §3.4 services and ArenaKey; `KernelTx.level` = fromLevel; smoothing holds kernel-pinned vertices; corridorUnion comment; §3.2 (6); §3.2 (1); §3.9 chunks; §3.3 clear rule citing §7.2, §2.2 rule 6 citing §3.3) |
| W-FLD-01 (expect, onFail) | kernel end written (§3.3 *Expectations*); `Invariant` itself undeclared — raised as VD0-02 / VS0-14, not repeated |
| W-FLD-02 (commit-record readers) | both ends: §8.1, §6.2, §13.2's batch-cost bar (l. 15434) |
| KWG-01 (`W_STEINER`) | removed with a recorded ruling (J-K37); §5.4 counts "per Warning code of §3.1"; no other mention in the set |
| KWG-02 | applied (§3.6 steps 1–3 emit `W_ATTRACTED`) |
| KWG-04 | kernel end bracketed; the §5.2 end is VD0-16 (not repeated); three codes still lack a reader (VK0-10) |
| KWG-06 = W-SET-01 | both ends: §3.3 cites `index.gridCellM`; V11 §3.1 holds 25/25/10/5/5 m |
| KWG-07 | kernel end only (VK0-11); `hull` marked internal although two volumes use it (VK0-09) |
| KWG-08 | §16's M4 row names the extreme-growth measurement |
| KWG-09 = E-15 | applied; `Cdeg` the one angle unit (§2.1 l. 493); no binary angle anywhere |
| E-12 KEEP APART | no change, correct |
| E-13 UNIFY | equivalence ticked item by item: every detail with its op, each contract once at its op (`obb` line, regular fit incl. clockwise reversal, the 1 cm radius, `dmath`) |
| E-14 UNIFY | max(256, ¼) once (§3.3); placement bound once (§3.10); moves keep nothing once (§3.6); §3.5's pointers: all homes hold their answers except the 2017 cut row (VK0-04) |
| E-15 UNIFY | every angle read is Cdeg |
| f 279 (BCR-V7-30) | applied as written (frameLaw; growth reads the same law); `Frame.marginShare` typed to agree with V07 §3.2 (1)'s `territory.marginShare` (0.1) — agreement, not a change |
| f 245, 575 | the kernel's door (a knot on an existing vertex by `splitThrough` landing on it; `removeEdges` on its `VertexRef`) and `sampleProfile`'s cyclic and categorical reading applied; the ordinal rule the writers need is missing at the model's home (VK0-07) |
| f 202, 510, 560 | confirmed: no kernel part (their texts name volumes' §3.x only) |
| g 110 (b) | §3.4's raised-ways bullet, the join exception, §3.6 held set (3), §3.7 and §3.10 rows applied; the model records they cite are missing (VK0-05) |
| g 111–114 | none names §3 or the kernel (checked); item 114's homes are §2.8, §7.x, §13.2 and volumes |
| edges (23 undefined, 15 untested), EI-001…008 | each defined in place; §3.11 indexes most, not all (VK0-02); EI-002's resolution (the 5° bound read as a precondition: refuse and downgrade) is a faithful reading of "pre-cleaned (collinear merge, minimum angle 5°)" and stated with its consequence |
| open findings (77) | closed in the text, except as the issues below state |

## Section reads

* **§3.1** — rows and codes kept; the reader brackets added (three codes without one, VK0-10); the detail table complete.
* **§3.2** — (1)–(8) kept with pointers whose homes hold the values; (9) item 279 applied; frame growth: the new
  never-shrink and no-op cases introduce VK0-01.
* **§3.3** — protocol, clear regions, op forms, pool steps, indexes unchanged in meaning; *Expectations* new and consistent
  with §5.1's tiers; the commit-record bullet restates §7.4 (VK0-12); pool steps 1 and 4 lost two receipts (VK0-03).
* **§3.4** — ops and services kept; the knot door, sampleProfile edges, hexLattice asserts, the transient service list
  (KIC-02) and g item 110's raised parts added (VK0-05, VK0-06, VK0-09).
* **§3.5** — VK0-04. **§3.6** — held set re-listed (1)–(5) with the closure applied to the whole set, equivalent to the
  archive (an edge of level < fromLevel is fixed anyway); mandatory collapse, merge reporting and the one-vertex cut added.
* **§3.7** — buffer joins and ends defined; kerb of a spine-less face; insets at 0 and below 0; raised parts named.
* **§3.8** — lifecycle sentence and numeric-contract refusals added, roof cache key and `ridgeAxis` homed elsewhere.
* **§3.9**, **§3.10** — chunk wording (KIC-08), the outer-ring-only arena, the corrupt-chunk replay, raised parts in the
  isolation and stored-reference rows, failure handling of the stored-reference row: all consistent.
* **§3.11** — new; its rows true of the text; incomplete (VK0-02).

## Cross-part notes addressed to the kernel

* determinism → kernel (`E_OUT_OF_RANGE`, F-SKELETON naming, the grid cells as V11 cells): all applied.
* model → kernel: §2.2 homes kept and cited; KXC-03 applied; "§3.4 names `Document.nextGroundPart`" **not applied** (VK0-06).
* scope → kernel (KIC-02 agrees with §14's `Kernel`): applied (§14 l. 17026–17029: `resolve` PlatKey-only, `view` ArenaKey).
* V11 note 14 (cite registry row 93): §3.3 cites "the base settings row's `index.gridCellM` (V11 §3.1)", the row's home — sufficient.
* The kernel's own notes to other units, as far as §3 now depends on them: notes 3–6 (model) open → VK0-05, VK0-07; note 10
  (§4.7 class floors) applied for the named constants; note 11 (pipeline callers) open → VK0-11; notes 14–17 (determinism)
  partly open → VD0-16; note 18 → VD0-02; notes 25, 27 (rendering) → VK0-03, and note 26 → VR0-21 plus VK0-13; note 28
  (scope's §13.1 fixtures) became a pointer to §3.11's rows → VK0-02; notes 29–31 applied; note 32 (V11) applied; note 33
  (V07) consistent; notes 34–35 (V01, V05, V06) not checked here beyond their kernel side.

## Issues

| id | sev | kind | owner | short |
|---|---|---|---|---|
| VK0-03 | blocker | NUANCE-LOST | rendering | §12.4 rows lack the merge's ≈ 200 000-record basis and step (0)'s "our count" |
| VK0-04 | blocker | NUANCE-LOST | kernel | §3.5's 2017 cut row: the recursion bound replaced by the ladder |
| VK0-01 | major | NEW-PROBLEM | kernel | frame growth skips (a) when only the arena grows; `Plat.frame` timing |
| VK0-02 | major | EDGE-UNTESTED | kernel | §3.11 omits edges the text defines; §13.1 tests only §3.11's rows |
| VK0-05 | major | WIRING | model | raised ground parts: feet, level mapping, `PlatKey`, `nextGroundPart` missing in §2 |
| VK0-07 | major | EDGE-UNDEFINED | model | stretch-state knots inserted mid-profile have no ordinal rule |
| VK0-08 | major | EDGE-UNDEFINED | pipeline | class area floors read by the kernel are defined nowhere |
| VK0-06 | minor | CONFLICT | kernel | piers "read through the services" though they are record attributes; counter unnamed |
| VK0-09 | minor | CONFLICT | kernel | `hull` marked internal while V04 §3.2 and V07 §3.4 take convex hulls |
| VK0-10 | minor | WIRING | kernel | `E_DEGENERATE`, `E_STRUCTURAL`, `E_INVARIANT` have no bracketed reader |
| VK0-11 | minor | WIRING | pipeline | `hexLattice` and `offsetFace` named by their callers only by description |
| VK0-12 | minor | CONFLICT | determinism | the undo record's keep-list stated in §3.3 and §7.4, differently |
| VK0-13 | minor | LOST | rendering | the antenna rule's reason ("never retraces a slit") stated nowhere |

Confirmed and not repeated (raised by sibling verifiers): `Invariant` undeclared (VD0-02, VS0-14); §5.2's detection cells
for `E_HOLE_CONTACT`, the class-floor codes, `E_NO_PATH` and F-SKELETON's refused input (VD0-16, whose F-RIVER fix this
verifier accepts in place of dropping F-RIVER from §3.1's bracket); the circular antenna pointers (VR0-21).

### VK0-01 (major, NEW-PROBLEM, kernel) — §3.2 (9) frame growth, l. 3203–3245

The rewrite's never-shrink cases made the batches conditional: "(b) when the arena grows, (a) and (c) when the frame grows".
But (a) is (b)'s precondition — (a) runs "so no deletion of the growth joins two faces finer than L1", and (b) deletes each
lapsing `margin` stretch "joining … each cleared L1 face beside it with the ring's". Where the arena grows and the frame does
not (the case "kept at the current frame where that is no larger; the new arena … plus the current law's margin" creates —
a territory frame kept across item 322's fold, its margin share rising from `territory.marginShare` 0.1 to 0.3), (b) runs on
uncleared faces: its deletion meets finer geometry (`E_LEVEL` in a clear-region batch: an epoch bug abort) or joins finer
faces. `Plat.frame` is updated only "as this batch [(b)] commits", so where the frame grows and the arena does not it is never
updated. And `Frame.marginShare`'s comment ("0.3 under the `base` frame law") is false for a folded document whose territory
frame still holds its town, which §4.11 (l. 7741) does not grow.

**Required change.** In §3.2 (9) replace "(b) when the arena grows, (a) and (c) when the frame grows" by "(a) whenever the
frame or the arena grows, then (b) when the arena grows and (c) when the frame grows"; in (b) replace "`Plat.frame` takes the
new frame as this batch commits" by "`Plat.frame` takes the new frame as this batch commits — or, where the arena keeps its
size, as (c) commits"; in the `Frame` block let `marginShare`'s comment read "context margin per side, that of the frame law in
force when the arena was made or last grown: 0.3 under `base`, `territory.marginShare` under `territory` (V07 §3.2 (1)); a
folded document whose frame holds its town keeps its margin until a growth (§4.11)".

### VK0-02 (major, EDGE-UNTESTED, kernel) — §3.11, l. 4336–4351; §13.1 l. 15340

§13.1 tests "the kernel at its limits (§3.11): every case its rows name", but §3.11's rows omit edges the rewrite defined in
place: `buffer`'s `square` and `miter` joins (the miter limit) and `flat` ends (§3.7); `insetRing` at `dCm` 0, below 0 and on a
non-convex face (`E_NON_CONVEX`; §3.7 *Insets*); a cut whose two endpoints land on one vertex (§3.6 rule 2); an arena holding
only its outer ring (§3.9); a frame growth whose target is not larger, and one across a change of frame law (§3.2 (9)); a
part-0 warp under a raised way (its feet held, §3.6 held set (3)). The rewrite's note 28 listed these for §13.1, which instead
cites §3.11's rows, so these defined outcomes have no test (principle (11)).

**Required change.** §3.11's *degenerate geometry* row adds "`buffer` with `square` and `miter` joins (cut at twice the
half-width) and `flat` ends (§3.7); `insetRing` at `dCm` 0 (the face's ring), below 0 (outward, never collapsing) and on a
non-convex face (`E_NON_CONVEX`, the caller taking `offsetFace` or a buffer union); a cut whose two endpoints land on one vertex
(`E_NOT_TWO_CROSSINGS`, §3.6 rule 2); a part-0 warp under a raised way (its feet held, §3.6)"; *the caps* row adds "a frame
growth whose target frame and arena are no larger (nothing runs), and one across a change of frame law (item 322's fold;
§3.2 (9))"; the *save, load …* row adds "an arena holding only its outer ring writes its level-≤ 1 chunk alone and loads to that
one face (§3.9)".

### VK0-03 (blocker, NUANCE-LOST, rendering) — §12.4 l. 14826, 14829; §3.3 pool steps 1 and 4

Two §3.3 receipts were cut as restatements of §12.4 rows that do not hold them. Pool step 4's "the ≈ 200 000 records S10–S12b
create at CITY merge within §12.4's 8 ms row" (KERNEL-RESTATEMENTS-012, home "§12.4 merge row") is now "(§12.4's merge row)",
but the merge row states only the copies and "13 ms (8 merge + 5 copies)": the ≈ 200 000-record basis of the 8 ms is stated
nowhere in the set. Pool step 1's ≈ 9 000 step (0) items lost their provenance "our count" and their composition ("both sides
of ≈ 6 km of perimeter margin band and of the wall's band, setback, glacis and tower parts"); §12.4's S10 (0) row cites "§3.3
pool step 1" for the count, and pool step 1 now cites §12.4 back.

**Required change.** §12.4's merge row's estimate cell ends "…, ≈ 1.5 ms each at CITY (measured, `fixall_kernel_r4_bench.out`
A); the ≈ 200 000 records S10–S12b create at CITY merge within the 8 ms"; its S10 (0) row reads "… + ≈ 2.3 ms for the L3
partition rebuild of the ≈ 9 000 items it made (both sides of ≈ 6 km of perimeter margin band and of the wall's band, setback,
glacis and tower parts; our count; build rate measured, `fixall_kernel_r3_bench.out` A; the rebuild: §3.3 pool step 1)".

### VK0-04 (blocker, NUANCE-LOST, kernel) — §3.5, l. 3815

E-14 made §3.5 a pointer table ("every creator failure kept with its answer's home"), but the 2017 cut row's answer
"recursion bounded by the class band and a depth cap, every rejection logged (§4.6)" became "the bent cut's bounded, logged
ladder (§4.6, §5.2 F-CUT)": the answer to the unbounded recursion is now the failure ladder, a different mechanism, and the two
bounds that close it — the block-depth range at which the face recursion stops (§4.6) and the declared recursion-depth work
limit (§5.1 (5), F-WORK) — are neither named nor pointed to. A precise statement replaced by a vaguer one (principle (9)'s
guard).

**Required change.** The row's answer reads "`E_NOT_TWO_CROSSINGS` and `connectHole` (§3.6); the face recursion bounded by the
block-depth range (§4.6) and its declared recursion-depth limit (§5.1 (5), F-WORK), every rejection logged (§5.1 (3)); the bent
cut's ladder (§4.6 step 8, §5.2 F-CUT)".

### VK0-05 (major, WIRING, model) — §2.1 l. 516, §2.2 l. 543 and rule 1, §2.7 l. 2131, §2.8 l. 2463

The kernel's g item 110 (b) part rests on model records that do not exist. §3.4 (l. 3701) and §3.10's stored-references row
(l. 4310) resolve "a raised way's two feet … each a vertex on part 0 and one on the raised part … Each end names its part
(`{ part; at }`)", but `RaisedWayRecord` has no feet field and §2.2 rule 7 no foot role, so the row checks a reference nothing
stores; `Identity.key`'s exception names only `UndergroundLink`; §3.2 (9) grows "each raised part of the ground layer" by "the
`margin` rows of its own record", but §2.2 rule 1 gives a raised part no level mapping and no holder of its `margin` ring; and
the kernel cites "§2.2's `PlatKey`" for the ground parts' numbering while the `PlatKey` comment and §2.1 *Arena parts* (its
counters `nextUndergroundPart`, `nextSkyPart`) omit ground parts ≥ 1 and `Document.nextGroundPart` (declared at l. 2745).
The kernel's cross-part notes 3–5 were not applied.

**Required change.** §2.7 `RaisedWayRecord` gains `feet: [RaisedFoot, RaisedFoot]` with `interface RaisedFoot { ground: VertexRef
/* ('raised_foot', way id, i) on part 0 */; deck: VertexRef /* the same row on the way's own part */ }` — where its ramps or
stairs meet part 0, placed and re-placed by its re-derivation (§3.4); §2.2 rule 7's vertex roles gain `raised_foot` (indexed);
`Identity.key`'s comment adds "and a raised way, whose two feet are one vertex in part 0 and one in its own part (§3.4)";
§2.2 rule 1 gains a *raised ground part* bullet — L0 its outer ring, the frame with its margin, the `margin` role on its way's
record; L1 the deck way and its kerbs; L2–L4 as the ground's; and the `PlatKey` comment and §2.1 *Arena parts* add "ground
parts ≥ 1 = one arena per raised way (§2.7), numbered by `Document.nextGroundPart` (§2.9), allocated once and never reused".

### VK0-06 (minor, CONFLICT, kernel) — §3.4 *Raised ways*, l. 3689–3693

"Its piers are footprints on part 0 (§2.7's `supports`), which part-0 stages read through the services": §2.2 rule 5 and
`RaisedWayRecord.supports` make a pier ring "an ordinary attribute of its record" — no part-0 geometry a service reads; and the
model's note (J-RM3) asks this bullet to name the counter, which it does not.

**Required change.** The bullet reads "… each lies on its own part of the `ground` layer, numbered from 1 by
`Document.nextGroundPart` (§2.9) — part 0 is the ground — allocated once and never renumbered or reused, as the underground's
and the sky's parts are. … its piers are footprints on part 0 held as point attributes of its record (§2.7's `supports`, §2.2
rule 5), which part-0 stages read from that record".

### VK0-07 (major, EDGE-UNDEFINED, model) — §2.2 rule 5's stretch-state *Write*, l. 806–808

A stretch-state writer (items 245, 575: `breach`, `dismantle`, `repairWall`, landfall) placing knots inside an existing profile
has no rule for their ordinals: the *Write* bullet places "a knot at each end" by `splitThrough`, whose `row` "carries its
ordinal, an assertion otherwise" (§3.4), while §3.10's stored-references row requires "every `ChainProfile`'s knots lie on its
chain in ordinal order". A mid-chain breach must give its two knots ordinals between existing ones, and nothing renumbers
(only `retypeEdges`' `rekey` does), so the common case fails §3.10 at stage end or save (a bug abort at an epoch, F-REDERIVE
after an edit). The kernel's note 6 was not applied.

**Required change.** The *Write* bullet ends "…; the writer then renumbers the entity's knots from 0 in chain order in the same
batch — each moved knot row stripped by `removeEdges` on its `VertexRef` and re-added by `splitThrough` landing on its vertex
(§3.4) — after the canonical form's drops, so §3.10's ordinal order holds".

### VK0-08 (major, EDGE-UNDEFINED, pipeline) — §4.7's class-floor row, l. 6173–6176

§3.2 (2) states the class floors are "per face class a minimum width, a minimum area and an angle floor — … §4.7's class-floor
row", and `E_BELOW_MIN_AREA`, `absorbSliver`'s `floor.minAreaCm2`, F-CUT's "min area" and F-CORRIDOR's "face below its class
floor" read them, but the row holds only `minPlotWidth`, `minInteriorAnglePlot` and `minCorridor(c)`: no face class has a
minimum area anywhere in the set (DXC-06's ruling covered the named constants only). An undefined constant read by a code.

**Required change.** §4.7's class-floor row states, for each face class whose floors §3.10, §5.3, F-CUT, F-CORRIDOR and F-PLOT
check (plot, half-corridor strip, junction wedge, built block, residue), its minimum area — as a value or a derivation from
existing rows (a plot's from `minPlotWidth` and its granularity band's minimum depth) — or that the class has none; §3.2 (2)
then reads "per face class the minimum width, area and angle §4.7's class-floor row declares".

### VK0-09 (minor, CONFLICT, kernel) — §3.4 l. 3599

"hull is obb's and lir's internal step" marks `hull` internal (KWG-07), but V07 §3.4 (VS3's "convex hull of the kept points",
l. 1414) and V04 §3.2 (N3's "R's convex hull", l. 954) take convex hulls; either they re-implement one (a second mechanism) or
call an op the kernel says no stage calls.

**Required change.** The comment reads "…; `hull` is obb's and lir's step and a service read by V07 §3.4 (VS3's palisade hull)
and V04 §3.2 (N3's extent of R)".

### VK0-10 (minor, WIRING, kernel) — §3.1 `KernelError`, l. 3092–3110

The comment promises "each code's reader in brackets", but `E_DEGENERATE`, `E_STRUCTURAL` and `E_INVARIANT` carry none
(`E_OUT_OF_RANGE` names its readers in prose).

**Required change.** `E_DEGENERATE` … "[the caller's failure class by §5.1 (9); `seed`, `fixed`, `overlap`: F-PLAN tier 1,
§5.2]"; `E_STRUCTURAL` … "[the caller: §3.6's sliver rule keeps the face as residue; an edit's dry run, §7.1; a plan wall move,
F-PLAN]"; `E_INVARIANT` … "[in generation the issuing stage's property tests, §13.2; after an edit F-REDERIVE, §5.2]".

### VK0-11 (minor, WIRING, pipeline) — §4.2 S3 (3) l. 4883, §4.3 l. 5074, §4.7 S11

KWG-07 is closed only at the kernel: §3.4 names `hexLattice` as "S4's routing lattice, built at §4.2 S3 (3)" and §3.7 names
`offsetFace` for S11's per-edge setbacks, but §4.3's candidate lattice ("a jittered hexagonal point set at ≈ 25 m") never names
`hexLattice` nor the cell constraints its assertion relies on (spacing ≥ `minEdge`, jitter < half the spacing), and §4.7 S11
does not name `offsetFace` — interfaces whose callers name them only by description.

**Required change.** §4.3's sentence reads "… a jittered hexagonal point set at ≈ 25 m (`hexLattice`, §3.4: its spacing cell
≥ `minEdge`, its jitter cell < half the spacing)"; §4.7 S11's setback step names `offsetFace` (§3.4, §3.7) for per-edge setbacks.

### VK0-12 (minor, CONFLICT, determinism) — §7.4 *Application* l. 10335–10338; §3.3 l. 3403–3405

What an edit's undo record keeps of the commit record's lists is stated twice and differently: §3.3 — "for `promoted`, their
lattice points, former levels and flags and the anchor contact names promotion stripped; for `demoted`, the former levels; for
`unflagged`, the flags it restores" — and §7.4, which keeps former birth levels, `split` flags and stripped contact names but no
lattice points. One fact, two homes, disagreeing (principle (1)).

**Required change.** §7.4's *Application* bullet reads "… the lattice points, former birth levels, `split` flags and stripped
contact names of the vertices it promoted …"; §3.3's sentence becomes "What an edit's undo record keeps of `promoted`, `demoted`
and `unflagged` is §7.4's."

### VK0-13 (minor, LOST, rendering) — §11.1 GeoJSON row, l. 14084

The archived §3.6 rule 6 gave the antenna rule its reason — "so a GeoJSON ring never retraces a slit". The rule now has its home
at §11.1 (KERNEL-RESTATEMENTS-014), whose row says only "emitted without antennae"; the reason is stated nowhere. (The
circular pointer itself is VR0-21.)

**Required change.** The row reads "faces as Polygons with holes, emitted without antennae (an antenna: §3.6 rule 3), so a ring
never retraces a slit".
