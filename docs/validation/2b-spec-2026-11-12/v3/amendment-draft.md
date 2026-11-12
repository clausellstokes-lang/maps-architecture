# Round 2B — the amendment text the binding needs (draft, 2026-11-12)

For the session. It is based on v2/design.md section 6 with the rule R removed and the ladder put in its place. The file
and item number are the session's: a new file `docs/AMENDMENTS-2026-11-12ac.md`, numbered from the next free number
(1007 if file ab's 997 – 1006 is the last). The item is written and the owner told before round 2B-B (M0-a-09 S22)
binds. Round 2B-A (S21) changes no design text.

## 1. The item

**1007. The served kerb is the door's lay of the exact kerb, with the construction as its second rung (supersedes
item 986 (c); re-declares 986 (d), 986 (e) (1) – (3) and (5); replaces the first clause of 991 (b)).**

(a) *What is decided.* `kerb(F)` stays §3.7's definition. It is served by a LADDER of two rungs.
- Rung 1: X(F), the definition's region, is computed exactly by a lattice boolean that writes no arena. It is laid for F
  alone by `corridorUnion`'s own engine at L2, in the open transaction. The built blocks are read back and everything is
  undone.
- Rung 2: where that lay refuses, F is read by the construction, §3.7's method until now — the strips' parts laid by the
  door in an undone dry run and read back.

S9's commit (`corridorUnion`, `bandUnion`) uses the same ladder.
- Rung 1: the engine runs with the exact regions.
- Rung 2: where the operation refuses, it is undone and run again with the construction's reads.
- After a refusal for the batch's work limit, which dooms the batch, no second rung is taken.
- A district committed on rung 2 is not re-planned.

Every result says which rung it took: `BandResult.rung`, and `kerbCensus().rung` for a read.

(b) *What it replaces.*
- **986 (c)** (the kept kerb state, the derived children) is WITHDRAWN. It was never applied to §3.7 and never built.
- **986 (d)'s ruling** is RE-DECLARED: the exact region is the definition's value and the oracle of every kerb served or
  committed; what is served and committed is the door's lay of it, or the construction where the lay is refused.
- **986 (e) (1)** (a derived read ≤ 50 µs) is WITHDRAWN: there is no derived read. The ladder's first rung costs about
  12 ms a read in source mode at CITY (to be measured in the production bundle by round 2B-B).
- **986 (e) (2)** (S8 ≤ 16 ms a cut) is WITHDRAWN as a bar. The S8 figure (34.5 ms a cut, source mode) is carried to item
  989's re-declaration.
- **986 (e) (3)**'s share between the derived kerb and the construction is MOOT. It is replaced by:
  - the fusion harness's S8 ≡ S9 share (M0-c-06's floor 0.95, unchanged);
  - `beyond` 0 and the closed list of causes for a non-exact block;
  - "no read and no operation on the second rung" at every registered harness seed;
  - the thin-difference bar in the stress population.
- **986 (e) (4)** (the declared model shift) STANDS, re-stated as "the ladder in place of the construction". It is shown
  by a control that serves the construction and moves nothing.
- **986 (e) (5)** is re-stated: no construction in S9's first rung.
- **991 (b)'s first clause** ("kerb(F) is §3.7's definition computed exactly on the kerb state, the construction's
  arena-attracted read being its oracle") is REPLACED by (a). Its second clause STANDS: the S8 ≡ S9 contract as KI-13
  states it, the ratchet 0.91 and the target 0.95. Under the ladder the measured share is 0.973 – 1.000.

(c) *Why.*
- **Serving X directly fails.** Measured, it holds slivers no arena can keep. The commit folds them, so the plan and the
  build disagreed on most blocks and some beyond the bound, and the door's refusals rose.
- **Laying X gives the plan back but still refuses networks.** The door's lay of X brings plan ≡ commit back to
  0.973 – 1.000. It still refuses 37 networks the construction commits in the stress population.
- **No tidying rule cured those refusals.** Three were measured. Each traded one refusal class for another, because what
  the door refuses is an edge-to-edge relation with the arena's content that only the door computes.
- **The ladder clears every bar.** With the construction as the second rung, no network the construction commits is
  refused (it also commits 30 of the 34 networks the construction refuses). No harness seed takes the second rung.
- **The price is declared.** Inside a district where the read and the commit took different rungs, the planned and the
  committed block can differ by thin needles of any length.

(d) *Contract and bars.*
- §3.7 and GEO-9 as section 2 and section 3.
- §4.6 and §13.2 as section 2.
- The queue rows as section 5.

## 2. The replacement sentences

**§3.7, the decision paragraph.** Replace "and no second geometry engine ships (the one exception is the pre-decided
fallback below)" by:

> and no second geometry engine ships, with two exceptions: the pre-decided fallback below, and the outline of
> `kerb(F)`, which an exact lattice boolean computes on the face's own rings — it writes no arena, and no stage and no
> façade caller receives its output: every kerb served (`kerb`, S8) or committed (`corridorUnion`, S9) is either that
> outline laid by `insertChain`, or, where that lay is refused, the construction's read, so every one obeys attraction,
> placement, `minEdge` and clearance like every other chain.

**§3.7, *The kerb, defined once*.** The definition and the commit sentences are unchanged. Replace the service sentence
("`kerb` is also a read-only service … so the block S8 cut and the block S9 keeps are one face (tested, §13.2).") by:

> `kerb` is also a read-only service on the faces of an open transaction's overlay, served by a ladder of two rungs.
> Rung 1: the region this paragraph defines, computed exactly by a lattice boolean that writes no arena, with its outline
> and junction splits laid for F alone by `corridorUnion`'s own engine at L2 in the open transaction, the built blocks
> read back and everything undone. Rung 2, where that lay is refused: the construction — the strips' parts laid by
> `insertChain` on the open transaction's arena, the faces they leave read back, and everything undone. S8 plans every
> cut on `kerb(F)` of the current L1 faces, inserts each accepted lane at L1 in its own district transaction and recurses
> on the children's kerbs. S9 then commits `corridorUnion` for those L1 faces by the same ladder: the engine on the exact
> regions, or, where that operation is refused, undone and run again on the construction's reads (never after the
> batch's work limit is reached). Each result names its rung. [The contract sentence of section 3 follows here.] The
> kerb served omits the parts of the definition no arena can hold: slivers and needles thinner than `attractCm`, up to a
> few metres long where a flat junction end meets a width-less edge at a shallow angle.

**§3.4's signature comment.** "`// §3.7's kerb: what corridorUnion commits`" becomes "`// §3.7's kerb by its ladder:
what corridorUnion commits`". Also add one line: "`BandResult.rung: 1 | 2` — the rung the operation took (§3.7)".

**§4.6.** Replace "S9's `corridorUnion` then commits exactly those kerbs (contract test "S8's working block ≡ S9's
committed block, Hausdorff 0", §13.2)" by:

> S9's `corridorUnion` then commits those kerbs by the same ladder (contract test "S8's working block ≡ S9's committed
> block", §13.2, with §3.7's contract sentence)

**§13.2.** Replace "S8's working block equals S9's committed block (Hausdorff 0; §3.7)." by:

> S8's working block equals S9's committed block within N-43's bound (2 · √2 · `attractCm`), the exact share at or above
> KI-13's ratchet (0.91, target 0.95), every inexact block explained by a cause §3.7's contract sentence names, and no
> kerb read and no corridor operation on the second rung at any registered harness seed; in the B-FUZZ bands population
> every piece of the difference between a face's served kerb and its committed block is thinner than `attractCm`
> (§3.7).

## 3. The contract sentence (ruling 2 (d))

As ruled:

> A planned block equals its committed block within the bound; in a district whose commit took another rung than a
> face's read, they may differ by pieces thinner than the attraction distance, of any length, and by nothing else.

My proposed wording. It closes two gaps in the ruled sentence (open-questions Q14): the same-rung second rung, which
already differs beyond the bound in the base, and the closed list of causes (review-3 T-6):

> Where a face's read and its district's commit both took the first rung, the planned block equals the committed block
> within N-43's bound, and an inexact one differs only where another face of the same commit, or a neighbour district's
> kerb on a shared seam, lies within `attractCm` of the difference, where the commit folded a part thinner than
> `attractCm` that the lone lay did not, or by a single sliver under 1 cm thick. Wherever either took the second rung,
> they may differ by pieces thinner than `attractCm`, of any length, and by nothing else.

## 4. For the owner, in plain words

On 28 October you accepted, under your delegation, that the kerb of a block — the line where a street's reserved width
ends and the block begins — would be computed exactly by geometry and served that way, with today's trial-insertion
method kept only as a check.

We built the exact calculation and measured it at full city size. It is right to the centimetre, but in places it draws
slivers centimetres wide and metres long that the map's own rules cannot hold. Served as it is, the planned block and the
built block stopped matching on most blocks.

Laying the exact shape with the map's own code, tried and undone, gives the match back on 97 – 100 % of blocks. But it
still makes the street commit refuse some layouts that today's method accepts. Three tidying rules we designed each
cured one kind of refusal and caused another.

So we are reversing the core of that decision. The exact shape stays as the reference. What is served is that shape as
the map's code lays it. Where that lay is refused, today's method is used as a second rung, for the planner and for the
commit alike.

Measured:
- No layout today's method accepts is refused, and 30 of the 34 it refuses now commit.
- At every test and city seed the second rung is never needed, and plan and build match within the allowed tolerance.
- It costs about a third of today's time per kerb in our first measurement, to be confirmed in the production build.

The price, which we state rather than hide: in the rare district where the commit needs the second rung after its
blocks were planned on the first, a planned block and its built block can differ by a thin sliver — never thicker than
26 cm, but sometimes metres long. We count these. We bar them anywhere they would reach a real derivation, and we
require them to stay thin in the stress tests.

The speed target attached to the old decision is withdrawn and carried into the budget re-declaration you already hold.
You may veto this; a veto keeps today's method alone.

## 5. The queue rows owed at the binding

1. **M0-a-06 — the lay view's constructor into tx/.** The lay's transaction-shaped view, made today in arr/bandUnion.ts
   and never minted, is the one declared exception to "transactions are made only in tx/" (RQ4). M0-a-06's round after
   the merged RQ2 round and Q181's round moves its constructor into tx/state.ts, built from an explicit field list,
   NO-SHIFT. The compiled key-list pin moves with it, and support.ts's frame classifier then reads the view's tag instead
   of a function name.
2. **M0-b-03 (and the stage that registers S9) — S9's receipt counts second-rung commits.** The receipt reads
   `BandResult.rung` and pins 0 at every registered seed. If a registered seed ever shows one, the replan is the open
   alternative, with its own ruling (ruling 3).
3. **M1 — the district commit order.** All of a district's S8 reads come before any neighbour's S9 on a shared seam, or
   the dependence is declared (review-2 S-6).
4. **M0-b-03 — a refused child read refuses the cut.** A refused kerb read on a child passes S8's needle floor today
   (bentCutFabric.ts, the needle floor's `!kc.ok` skip): a wrong-result path (review-3 T-13).
5. **M0-c-06 — the 1 000-seed summary run counts rungs** (open-questions Q6).
