# Round 2B — the amendment text the binding needs (v4, 2026-11-12)

For the session. Corrected from v3 on the session's rulings Q1 – Q17 and on the reviewer's fourth pass (U-1 – U-18).
The file and the item number are the session's: a new file `docs/AMENDMENTS-2026-11-12ac.md`, numbered from the next
free number (1007 if file ab's 997 – 1006 is the last). It is written, and the owner told, before round 2B-B
(M0-a-09 S22) binds. Round 2B-A (S21) changes no design text.

## 1. The item

**1007. The served kerb is the door's lay of the exact kerb, with the construction as its permanent second rung.
It supersedes item 986 (c); re-declares 986 (d), 986 (e) (1) – (3) and (5); withdraws item 990 (b)'s planned removal
of the construction; and replaces the first clause of 991 (b).**

(a) *What is decided.* `kerb(F)` stays §3.7's definition. It is served by a LADDER of two rungs.
- *Rung 1.* X(F), the definition's region, is computed exactly by a lattice boolean that writes no arena. It is laid
  for F alone by `corridorUnion`'s own engine at L2 in the open transaction. The built blocks are read back and
  everything is undone.
- *Rung 2.* Where that lay is refused for any reason, the lay's own work limit included, F is read by the
  construction. This was §3.7's method until now: the strips' parts laid by the door in an undone dry run and read back.

S9's commit (`corridorUnion`, `bandUnion`) uses the same ladder:
- Rung 1 runs the engine with the exact regions.
- Where that operation is refused, it is undone and run again with the construction's reads, its re-reads included.
  This second rung is the construction's operation as it was.
- After a refusal at the batch's work limit, which dooms the batch, no second rung is taken.
- A district committed on rung 2 is not re-planned.
- Every result names its rung: `BandResult.rung`, and `kerbCensus().rung` for a read.

The construction is therefore a PERMANENT part of the kernel: it is the second rung, and the control.

(b) *What it replaces.*
- **986 (c)** (the kept kerb state, the derived children) is WITHDRAWN. It was never applied to §3.7 and never built.
- **986 (d)'s ruling** is RE-DECLARED. The exact region is the definition's value and the oracle of every kerb. What is
  served and committed is the door's lay of it, or the construction where the lay is refused.
- **986 (e) (1)** (a derived read ≤ 50 µs) is WITHDRAWN: there is no derived read.
- **986 (e) (2)** (S8 ≤ 16 ms a cut) is WITHDRAWN as a bar. The measured figure is carried to item 989's
  re-declaration. Item 989 also carries the construction's cost wherever the second rung runs (none at the harness
  seeds) and a work law over both rungs.
- **986 (e) (3)**'s share between the derived kerb and the construction is MOOT. Its replacements:
  - the fusion harness's S8 ≡ S9 share (M0-c-06's floor 0.95, unchanged);
  - `beyond` 0;
  - a closed list of causes for an inexact block;
  - no read and no corridor operation on the second rung at every registered harness seed;
  - the thin-difference bar in the stress population.
- **986 (e) (4)** (the declared model shift) STANDS, re-stated as "the ladder in place of the construction". It is
  shown by a control that serves the construction and moves nothing.
- **986 (e) (5)** is re-stated: no construction in S9's first rung.
- **Item 990 (b)'s planned removal of the construction** after the re-profile is WITHDRAWN. So is the earlier ruling
  that kept the construction "one round, debug-only".
- **991 (b)'s first clause** ("kerb(F) is §3.7's definition computed exactly on the kerb state, the construction's
  arena-attracted read being its oracle") is REPLACED by (a). Its second clause STANDS: the S8 ≡ S9 contract as KI-13
  states it, the ratchet 0.91 and the target 0.95. Under the ladder the measured share is 0.973 – 1.000.

(c) *Why.*
- **X served as it stands fails.** It holds slivers no arena can keep. The commit folds them, so the plan and the build
  disagreed on most blocks, and the door's refusals rose.
- **X laid by the door restores the plan.** Plan ≡ commit comes back to 0.973 – 1.000, but the door still refuses some
  networks the construction commits.
- **No tidying rule cured those refusals.** Three were measured, and each traded one refusal class for another: what
  the door refuses is an edge-to-edge relation with the arena's content that only the door computes.
- **The ladder clears every bar.** In the stress population (12 000 networks, one seed) it refused no network the
  construction commits, and it commits 30 of the 34 the construction refuses. No harness seed took the second rung.
- **What is by construction and what is measured.**
  - BY CONSTRUCTION: only a network's first operation within the batch's work limit can never be refused where the
    construction commits.
  - MEASURED: every later operation, every later district batch, and S8's shifted trajectory. Those are a measured
    fact at one seed, barred at that seed.
  - DECLARED: at a finite work limit the first rung's charged work can exhaust a batch the construction would commit.
    That is a declared class, not met at M0.
- **The price.** Inside a district where the read and the commit took different rungs, the planned and the committed
  block can differ by thin needles of any length.

(d) *Contract and bars.*
- §3.7 and GEO-9 as section 2.
- The contract sentence as section 3.
- §4.6 and §13.2 as section 2.
- The queue rows as section 5.

## 2. The replacement sentences

**§3.7, the decision paragraph (GEO-9; U-14).** Replace "and no second geometry engine ships (the one exception is the
pre-decided fallback below)" by:

> and no second geometry engine ships, with two exceptions: the pre-decided fallback below, and the outlines that
> `kerb`, `corridorUnion` and `bandUnion` lay, which an exact lattice boolean computes on the face's own rings — it
> writes no arena, and no stage and no façade caller receives its output: every kerb served (`kerb`, S8) or committed
> (`corridorUnion`, `bandUnion`) is either that outline laid by `insertChain`, or, where that lay is refused, the
> construction's read, so every one obeys attraction, placement, `minEdge` and clearance like every other chain.

**§3.7, *The kerb, defined once* (U-9).** The definition and the commit sentences are unchanged. Replace the service
sentence ("`kerb` is also a read-only service … so the block S8 cut and the block S9 keeps are one face (tested,
§13.2).") by:

> `kerb` is also a read-only service on the faces of an open transaction's overlay, served by a ladder of two rungs.
> The first rung is the region this paragraph defines, computed exactly by a lattice boolean that writes no arena, its
> outline and junction splits laid for F alone by `corridorUnion`'s own engine at L2 in the open transaction, the built
> blocks read back and everything undone; it omits the needles and slivers of the definition that no arena can hold,
> and may include the half-band of a way narrower than twice the attraction distance, which the door draws into the
> kerb. The second rung, where that lay is refused, is the construction: the strips' parts laid by `insertChain` on the
> open transaction's arena, the faces they leave read back and everything undone; it serves what the construction
> reads. S8 plans every cut on `kerb(F)` of the current L1 faces, inserts each accepted lane at L1 in its own district
> transaction and recurses on the children's kerbs; S9 then commits `corridorUnion` for those L1 faces by the same
> ladder — the engine on the exact regions, or, where that operation is refused, undone and run again on the
> construction's reads (never after the batch's work limit is reached). Each result names its rung. The planned and
> the committed block differ only by pieces thinner than the attraction distance, to the lattice's tolerance of 2 cm,
> everywhere; at every registered harness seed they are equal within N-43's bound, every inexact block by a named cause.

**§3.4's signature comment.** "`// §3.7's kerb: what corridorUnion commits`" becomes "`// §3.7's kerb by its ladder:
what corridorUnion commits`". Add the line "`BandResult.rung: 1 | 2` — the rung the operation took (§3.7)".

**§4.6.** Replace "S9's `corridorUnion` then commits exactly those kerbs (contract test "S8's working block ≡ S9's
committed block, Hausdorff 0", §13.2)" by:

> S9's `corridorUnion` then commits those kerbs by the same ladder (contract test "S8's working block ≡ S9's committed
> block", §13.2, with §3.7's contract sentence)

**§13.2 (U-9).** Replace "S8's working block equals S9's committed block (Hausdorff 0; §3.7)." by:

> S8's working block and S9's committed block differ only by pieces thinner than `attractCm`, to the lattice's
> tolerance of 2 cm, in the B-FUZZ bands population as at every harness seed; at every registered harness seed they
> are equal within N-43's bound (2 · √2 · `attractCm`), the exact share at or above KI-13's ratchet (0.91, target
> 0.95), every inexact block explained by a named cause, and no kerb read and no corridor operation takes the second
> rung (§3.7).

## 3. The contract sentence (rulings Q14 as corrected by U-9)

> The planned and the committed block differ only by pieces thinner than the attraction distance, to the lattice's
> tolerance of 2 cm, everywhere; at every registered seed they are equal within the bound, every inexact block by a
> named cause.

The named causes form a closed list, each checked mechanically:
1. another face of the same commit has a laid L2 vertex within the attraction distance of the difference;
2. a neighbour district's kerb lies within it on a shared seam;
3. the commit's insertion placed or attracted a vertex within it onto content the lone lay did not meet — another face's
   laid piece, a seam kerb, or a pinned contact of the operation — and that content is named;
4. the lone lay against the district's commit, a hot pixel apart: one sliver under 1 cm thick.

A piece is thin when its erosion by 13 cm, with §3.7's own buffer parts, leaves no residue piece that holds a disc of
1 cm radius.

## 4. For the owner, in plain words (with the four corrections of U-10)

On 28 October you accepted, under your delegation, that the kerb of a block — the line where a street's reserved width
ends and the block begins — would be computed exactly by geometry and served that way. Today's trial-insertion method
was to be kept only as a check.

We built the exact calculation and measured it at full city size. It is right to the centimetre, but in places it draws
slivers centimetres wide and metres long that the map's own rules cannot hold. Served as it is, the planned block and the
built block stopped matching on most blocks.

Laying the exact shape with the map's own code, tried and undone, gives the match back on 97 – 100 % of blocks. But it
still makes the street commit refuse some layouts that today's method accepts. Three tidying rules we designed each
cured one kind of refusal and caused another.

So we are reversing the core of that decision. The exact shape stays as the reference. What is served is that shape as
the map's code lays it, and where that lay is refused, today's method is used instead, for the planner and for the
commit alike. Today's method therefore becomes a permanent part of the product, as this second step, rather than a check
to be removed later.

Measured:
- None of the layouts today's method accepts was refused in our test population, and 30 of the 34 it refuses now commit.
- At every test and city seed the second step was never needed, and plan and build match within the allowed tolerance.
- It costs about a third of today's time per kerb in our first measurement, to be confirmed in the production build.

The price, which we state rather than hide: in a district where the commit needs the second step after its blocks were
planned on the first, a planned block and its built block can differ by a thin sliver — never thicker than about 26 cm,
but sometimes metres long. This is barred at every seed we test before release, counted everywhere else, and required
to stay thin in the stress tests.

The speed target attached to the old decision is withdrawn and carried into the budget re-declaration you already hold.
You may veto this; a veto keeps today's method alone.

## 5. The queue rows owed at the binding

1. **M0-a-06 — the lay view's constructor into tx/.** The lay's transaction-shaped view, made in arr/bandUnion.ts and
   never minted, is the one declared exception to "transactions are made only in tx/" (RQ4). M0-a-06's round after the
   merged RQ2 round and Q181's round moves its constructor into tx/state.ts, built from an explicit field list, NO-SHIFT.
   The compiled key-list pin moves with it, and kernel/test/tx/support.ts's frame classifier then reads the view's `op`
   tag instead of the lay's function name.
2. **The layout's S9 receipt counts second-rung commits** (the stage that registers S9). It reads `BandResult.rung` and
   pins 0 at every registered seed. A registered seed showing one re-opens the replan as the alternative, with its own
   ruling. The price is watched there (U-15).
3. **M0-c-06 — the fusion summary carries the rung counts.** The 1 000-seed summary records reads and corridor
   operations by rung; the session's post-landing run bars them at 0.
4. **M1 — a work law over both rungs** (item 989's re-declaration). A first rung's charged work must not exhaust a batch
   the construction alone would commit: this closes the declared work-limit class.
5. **M1 — the district commit order.** All of a district's S8 reads come before any neighbour's S9 on a shared seam, or
   the dependence is declared (review-2 S-6; U-16).
6. **M0-b-03 — a refused child read refuses the cut.** This row was ruled earlier (review-3 T-13). A refused kerb read on
   a child passes S8's needle floor today (bentCutFabric.ts, the needle floor's `!kc.ok` skip): a wrong-result path.
