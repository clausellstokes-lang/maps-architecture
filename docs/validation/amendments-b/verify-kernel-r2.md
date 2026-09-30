# verify-kernel-r2 — lane amendments-b/verify-kernel-r2 (VERIFY the KERNEL part, §3, after repair round 2)

> PENDING FABLE REVIEW — Opus-produced (amendments-b/verify-kernel-r2).

PROGRESS (kill-safe ledger; a seat that continues this lane reads it first)
BASE: docs/ARCHITECTURE.md sha256 831efd42… (assemble-r2 installed; checked); rationale f2c2a1ca… (checked, and again after the incident below)
READ: assemble-r2 whole; repair-kernel-r2 report whole; verify-kernel-r1 whole; §3 diff r1→r2 (12 hunks); §3.4, §3.7, §3.10 whole; §3.3 index and queries; §3.6 insertion and placement; §2.6 contract, carry (1)–(4), plan steps 1–6, re-cut; F-PLAN; §5.3 stored-plan row; §6.1 stage-3 rungs; §12.2; §13.1; T28-3/T28-4; §14 façade; J-A12.31, J-A28.34, J-A28.73, J-A29.25 — done
ITEM 12: PRESENT (unchanged mechanism; VK1-09 fixed) — done
ITEM 21: PRESENT (unchanged) — done
ITEM 28: PRESENT | issues VK2-01, VK2-02, VK2-03, VK2-04, VK2-05, VK2-08, VK2-09 — done
ITEM 28 (f): PRESENT | issues VK2-01, VK2-03, VK2-06 — done
ITEM 30: PRESENT (VK1-08 fixed) — done
RE-CHECK VK1-01..VK1-14: 12 resolved, VK1-04 partial (T28-3 = VK2-07), VK1-11 resolved with a §1.1 residue (VK2-10) — done
CHECKS: single-source, stale, cross-part, deferral wording, broken references, new problems — done (§4)
RECEIPTS: routes model re-run byte-identical (274 s); refs.py broken 2 (pre-existing external); doc_checks '3,Judgment calls' exit 0 (C3 161/0) — done (§6)
INCIDENT 08:55: refs.py's out-argument overwrote docs/ARCHITECTURE-RATIONALE.md; restored 08:56 from the assembler's installed copy, sha256 f2c2a1ca… verified; NOTE in docs/lane-events.log — done (§6)
SIBLINGS: de-duplicated against verify-model-r2 (V-MAB2-09, V-MAB2-14) and verify-determinism-r2 (VD2-09, VD2-10) — done (§5a)
STATUS: COMPLETE (2026-09-27): 10 issues — 0 blocker, 0 major, 10 minor; owners kernel 4, scope 4, model 1, determinism 1 (3 of them the same findings as sibling verifiers')

## Outcome

Repair round 2 fixed the kernel part's major issue. VK1-01 said that vertices drift beyond the hot pixel on a one-level
transient arena. §3.4 now states two mechanisms:
* **The input sides are the arena's routes.** A seed or fixed ring's side, as passed, is the route of every fixed edge
  on it, so §3.6's test (i) reads the straight side.
* **The seed clip `tileRings`.** Overlapping wings are clipped as the faces of one overlay, so every ring carries every
  crossing vertex.

§3.10's placement-bound row checks the transient case. J-A28.34 records both rulings, in the index and in Part A. The
repair seat's model reproduces byte for byte: with the routes rule, 0 of 400 000 vertices lie beyond the hot pixel and 0
of about 200 000 kept corners are unsplittable.

Eleven more of the 14 round-1 issues are resolved as required: VK1-02, VK1-03, VK1-05 to VK1-10, VK1-12, VK1-13 and
VK1-14. VK1-11 is resolved, with a §1.1 pointer left over (VK2-10). VK1-04 is resolved in §2.6, but T28-3 still omits
the trapdoor fallback (VK2-07). Items 12, 21, 28, 28 (f) and 30 are PRESENT in the route's terms.

The ten new issues are all minor:
* **The routes rule meets §3.3's keys (VK2-01).** An input side is now the route of several edges, but §3.3 keys an
  edge by its route's endpoints and claims the key is total. So `readBack`'s edges on one input side tie, and an edge on
  two input sides has two keys.
* **Two wording gaps in the kernel.** The routes paragraph says "two input sides … both" where an edge can lie on three
  (VK2-02). The re-cut sentence's list of fixed rings lags §2.6's, which gained the composer's rooms (VK2-03).
* **The holed piece `tileRings` refuses.** §2.6 does not exclude it and F-PLAN calls it a bug (VK2-04 to VK2-06; the
  model and determinism verifiers found the same). The kernel's own companion is VK2-04: the clip order.
* **Tests.** T28-3 lacks the trapdoor fallback (VK2-07). A §13.1 fixture asserts a hot-pixel bound on a T's crossings
  that §3.4 does not give (VK2-08). §13.1 has no fixture for `tileRings`' outcomes (VK2-09). §1.1's comment still cites
  §12.2 for the frame scaling (VK2-10).

**Nothing needs a ruling beyond the repair seats'.** VK2-05's container-after rule is the model verifier's proposal
(V-MAB2-09), and the kernel seat offered it first. The kernel's part of it is VK2-04.

## 1 What was read (whole unless stated)

* `docs/AMENDMENTS-2026-09-25b.md` items 12, 21, 28 (with (f)) and 30, as in round 1; `route.json`'s four kernel entries
  (home [], referencing 12, 21, 28, 30), re-read: §3.7 tunnel bands; §3.1 skeleton licence ground; §3.4/§3.8/§3.10 plan
  partition, reader, tiling; §3.4/§3.7/§3.10 passage planarity and nesting.
* `assemble-r2.md` whole (its §8 cross-part notes 5 and 7 concern this part); `repair-kernel-r2-report.md` whole; the
  kernel-addressed lines of the other five repair-r2 reports; this lane's `verify-kernel-r1.md` whole.
* `docs/ARCHITECTURE.md` §3 (l. 2060–3172) diffed against `docs/archive/ARCHITECTURE-pre-amendments-b-repair-r2-2026-09-27.md`
  §3 (l. 2033–3129): 12 hunks, all inside the four kernel REPLACE blocks (§3.1 ×1, §3.4 ×7, §3.7 ×1, §3.10 ×2 — the
  E_DEGENERATE comment, `tileRings`, `faceNeighbours`' key, the arenas paragraph, the `ArenaKey` and `fixed` comments,
  the construction paragraph, the routes paragraph, the re-cut paragraph, the designation template, the placement-bound
  and seed-tiling rows). §3.4, §3.7 and §3.10 read whole in their live text.
* The text the changed kernel cites or that cites it: §3.3's index items, queries and canonical key (l. 2415–2460);
  §3.6's insertion steps and placement rule (l. 2696–2760); §2.6's stage-3 contract and fourth rung (l. 1255–1267), the
  carry of a stored composition (1)–(4) (l. 1165–1197), rule 4's tiers (l. 1130–1150), plan steps 1–6 (l. 1345–1400),
  the capacity and the re-cut (l. 1460–1500); §5.2 F-PLAN (l. 5586); §5.3's stored-plan row (l. 5615); §6.1's stage-3
  rungs (l. 5728–5736); §12.2 (l. 9454); §13.1's amendments-b fixtures and oracle line (l. 10005–10045); T28-3 and T28-4
  (l. 10296–10301); §14's façade (l. 10845, 10937); §1.1 l. 211; the index rows and Part A entries of J-A12.31,
  J-A28.34, J-A28.73 and J-A29.25.
* The sibling verify-r2 reports landed so far (determinism, pipeline, model), for overlaps (§5a).

## 2 Per item — PRESENT, PARTIAL or MISSING in the terms the route required

| item | route's ask of §3 | verdict | the mechanism, quoted (live text) |
|---|---|---|---|
| 12 | §3.7: `bandUnion` / the corridor use on `tunnel` chains, the outer wall the plots' frontage edge | **PRESENT** | §3.7 unchanged since round 1: "in the underground arena a tunnel's corridor half-width, `widthCm ÷ 2 + wallCm` — half its bore plus its wall … the band's outer ring, the tunnel's external wall, is the `kerb` edge every underground frontage plot's lines end on". J-A12.31's index row now reads "half a tunnel's bore plus its wall (`widthCm ÷ 2 + wallCm`)", and its Part A entry agrees (VK1-09 fixed). `faceNeighbours` now takes a key, so §5.3's reachability walk works on the underground arena (VK1-06 fixed). |
| 21 | §3.1: the skeleton row's licence ground | **PRESENT** | §3.1 row unchanged: "CGAL's is GPL (the rest of CGAL LGPL), which §17.4's permissive-only production closure excludes (the module's licence stays the owner's, §17.3), and it fails the stack and one-engine grounds besides". |
| 28 | §3.4 / §3.8 / §3.10: the plan partition's operations; a skeleton reader; rooms tile each storey's wings, outer walls on the wing rings | **PRESENT** | §3.4: "`tileRings(rings …)` … the seed clip"; "A caller whose wings overlap (§2.6 rule 4 (iii)) passes them clipped to tile by `tileRings`, the **seed clip**: the faces of one overlay of the storey's rings … each face going to the first ring in wing order that contains it". The routes paragraph: "Every vertex a face partitioner places on a fixed edge … is therefore placed by §3.6's placement rule against the input side that edge lies on, never against a sub-edge an earlier split left". §3.10: "the rooms of each storey tile exactly the seed rings §2.6 passes — at and above the ground, the extents of the wings that reach the storey … below the ground, the basement ring (§2.6's plan rung, steps 4 and 6)". Defects: VK2-01 to VK2-05, VK2-08, VK2-09. |
| 28 (f) | the re-cut (J-A28.33) | **PRESENT** | §3.4: "a room is kept only where its seed ring — its wing's extent at that storey, clipped to tile — is unchanged … Its vertices on a seed or anchor side lie within the hot pixel of that side's line (the routes above), so the construction splits the side at each of them". §3.10's placement-bound row: "on a transient arena every vertex a batch places on a fixed edge lies within 0.71 cm of the line of each input side the edge lies on … so the bound stands for the arena's life". Defects: VK2-01, VK2-03, VK2-06. |
| 30 | §3.4 / §3.7 / §3.10: the passage keeps planarity and nesting | **PRESENT** | §3.10's nesting paragraph unchanged. The seed-tiling row now names "every spanned passage's span ring" on the ground storey and "a wing's … ring ∪ the span ring of the passage it spans" above it (VK1-08 fixed). |

## 3 The round-1 issues — re-checked against the assembled text

| r1 id | owner | where re-checked (live lines) | verdict |
|---|---|---|---|
| VK1-01 | kernel | §3.4 l. 2519, 2610–2617, 2634, 2638–2646, 2655–2656; §3.1 l. 2095; §3.10 l. 3141; index J-A28.34 l. 12870; Part A l. 487 | **resolved**: all six parts of the required change are present. The seat's deviations are sound: the paragraph moved after "fixed edge" is defined, it says "face partitioner" because the construction places no vertex, the one overlay is a named service, and a holed piece is refused. Follow-ons: VK2-01, VK2-02 and VK2-04. |
| VK1-02 | determinism | F-PLAN tier 2 (l. 5586); J-A28.73 (l. 12889) | **resolved**: "answer a refusal of the rung's transient arena (tier 1) by the ring it refused". The seed clip's holed piece is not covered (VK2-06 = VD2-10). |
| VK1-03 | model | §2.6 l. 1481–1491; §3.4 l. 2652 | **resolved**: the FIXED list opens the shell as the seeds, the entrances and hearths are anchors, and the kept-room rule reads the clipped seed. The one-sided gloss is VK2-05 (= V-MAB2-09 (iii)). |
| VK1-04 | model | §2.6 step 3 l. 1366–1374; J-A29.25; T28-3 l. 10296–10297 | **partial**: §2.6 places the basement-serving core inside `Basement.ring`, with a reported `trapdoor` fallback. T28-3 still reads "a trapdoor the class row declares" (VK2-07 = V-MAB2-14). |
| VK1-05 | kernel | §3.10 l. 3152 ("at a stored plan's carry") | **resolved**: the stored plan's carried rooms are tested on a transient arena of the carried seeds with the rooms as `fixed` rings, then by an `area2` identity. The carry puts a room vertex that lies on a composed ring's side onto that ring (§2.6 carry (1)), so carried rooms meet the construction's split test. |
| VK1-06 | kernel | §3.4 l. 2527, 2567, 2573–2575, 2589 | **resolved** |
| VK1-07 | determinism | §6.1 l. 5731–5733 | **resolved**: "carry S11's stage id, the stage that made the building … which a transient arena's batches carry too (§3.3)". |
| VK1-08 | kernel | §3.10 l. 3152 | **resolved** (text quoted in §2, item 30) |
| VK1-09 | kernel | index l. 12731; Part A l. 348 | **resolved** |
| VK1-10 | kernel | §3.4 l. 2591, 2601; Part A J-A28.34 | **resolved**: "the wall at the joint between two wings — an interior wall of the building, never a `party` wall"; the fixed rings are counter-clockwise. "party wall" is used nowhere in §3 for a joint (the one hit, l. 3056, is a quad's party-wall side). |
| VK1-11 | rendering | §12.2 l. 9454 | **resolved**: "Within a rung the frame scales with the requested population (§3.2 (9))". The §1.1 residue is VK2-10. |
| VK1-12 | scope | §14 l. 10845, 10937; §13.1 l. 10030 | **resolved** |
| VK1-13 | scope | §13.1 l. 10030–10044 | **resolved**. The rotated-T clause over-claims (VK2-08). |
| VK1-14 | kernel | §3.7 l. 2984 | **resolved**: "S11's rule evaluation (the designation template, heights, materials, entrance)". "site-plan table" now occurs only as the record of the fold (l. 4041, J-A19.41). |

## 4 The checks

**SINGLE-SOURCE.** §3 states each new mechanism once, in §3.4: the routes rule in its own paragraph, the seed clip in
the construction paragraph and in the `tileRings` signature, and the stored plan's carry test in §3.10's row. §3.10's
placement-bound row and J-A28.34 point to §3.4 and do not restate it. §2.6 step 4 describes the clip by its meaning
("each extent less the union of the extents before it in wing order") and cites §3.4, which is what round 1 asked.
There is one restatement that lags its home: §3.4's re-cut sentence lists the fixed anchors itself, and that list now
lacks the composer's rooms that §2.6's FIXED list gained in round 2 (VK2-03).

**STALE.** The probes over §3 find no hits for binary wealth, rich or poor, market, dossier, a proprietary licence,
lots as buildings, size fixed by tier, or terrain and water that never change. The two "never change" hits are about
the index handle and the seed rings under an occupant change; neither is stale. The licence hits are §3.1's candidate
column and the item-21 row, both correct. "party wall" no longer names a wing joint. "site-plan table" is gone from §3.7.
The one stale pointer is outside §3: §1.1 l. 211 still sends the frame scaling to §12.2 (VK2-10).

**CROSS-PART.** Each pointer in the changed kernel text resolves to a section that states what the kernel assumes, with
these exceptions:
* §3.4's seed clip refuses a piece with a hole. §2.6 neither excludes that composition nor orders the clip so that it
  cannot arise (VK2-05 = V-MAB2-09 = VD2-09). F-PLAN calls every seed refusal a bug (VK2-06 = VD2-10). The kernel's own
  wording follows whatever order §2.6 adopts (VK2-04).
* §3.4's re-cut list and §2.6's FIXED list differ (VK2-03).
* §13.1's rotated-T fixture asserts a bound that §3.4 does not give (VK2-08). §13.1 has no fixture for `tileRings`'
  outcomes or for an edge on several input sides (VK2-09).
* T28-3 lacks §2.6's trapdoor fallback (VK2-07 = V-MAB2-14).

The kernel seat's cross-part notes:
* **(1) Model §2.6 step 4 may name `tileRings`.** Not carried; it is part of VK2-05.
* **(2) Model §2.6 must rule on the hole case.** Not carried: VK2-05.
* **(3) The kept-room rule compares the clipped piece.** Carried: "a room whose seed ring — the one it lies in: its
  wing's extent at that storey clipped to tile …". Its gloss is one-sided (VK2-05 (iii)).
* **(4) Determinism, F-PLAN and the holed piece.** Not carried: VK2-06.
* **(5) Scope, §13.1 wording.** Carried, but it over-claims (VK2-08). B-FUZZ does not treat `tileRings` as a boolean
  case (VK2-09).
* **(6) Rendering, §12.7.** "O(seed vertices)" is unchanged. One overlay per storey where wings overlap is within that
  order. No issue.

**DEFERRAL-WORDING.** §3 has no "TBD", "open question", "to be decided" or "deferred". Every "later" is temporal: a
later batch, a later split, "an earlier ring wholly inside a later one". One choice is handed off unresolved.
J-A28.34's Part A says "which wing takes the enclosed rooms is the plan rung's choice, not the kernel's", and the plan
rung does not make it (VK2-04 and VK2-05 close it).

**BROKEN-REFERENCE.** `refs.py` finds 139 heading keys, 35 D ids and 469 J ids, and 2 broken references: the
pre-existing external pair `os-geometry.md` §2.1.4 (l. 2679) and RFC 7946 §3.1.6 (l. 9123). Every J id cited in §3
resolves, among them J-A28.34, J-A28.31, J-A28.33 and J-A12.32. There is no content-level mismatch beyond VK2-03.

**NEW-PROBLEM.** Two come from round 2's own kernel text:
* **VK2-01.** The routes rule makes one input side the route of several edges. §3.3 keys an edge by its route's
  endpoints ("never by a sub-edge's endpoints") and calls the key total. So `readBack`'s edges on one input side tie,
  and an edge on two input sides has no single route to key it by.
* **VK2-02.** "Two input sides … reads both" leaves out an edge on three input sides.

## 5 Issues — each with its owning part and the exact required change

Line numbers are the installed document's (`docs/ARCHITECTURE.md`, sha256 `831efd42…`) and, for Part A, the rationale
file's (`f2c2a1ca…`).

### VK2-01 — minor · new-problem · kernel · items 28, 28 (f) (§3.4 routes paragraph l. 2638–2641 against §3.3 l. 2417–2425, 2445–2460; `readBack` l. 2593–2595, 2630)
**Claim.** The routes paragraph makes an input side "the route of every fixed edge on it … and the arena's grid holds it
as one route-edge item". §3.3 applies to transient arenas without an exception. It returns "each level-n route edge once
(as its sub-edge leaving its lower endpoint)", keys an edge "by the positions of the two endpoints of its level-n route
edge … never by a sub-edge's endpoints", and says "The key is total". `readBack` returns its edges "in §3.3's canonical
order". On a transient arena every vertex is of level 0, so before round 2 each sub-edge was its own route. Now:
* every wall segment on one seed side shares that side's key, so `readBack`'s edge order has ties that §3.3 does not
  break;
* a query near that side returns one of its sub-edges;
* an edge on two input sides that are not one segment (a fixed ring's side along a seed side) has two routes and no
  defined key.

The design says no tie is ever broken by a slot (§3.3 "No output depends on slot numbers"). The plan's records are
built from `readBack` "whichever worker cut them", so the key must be total.

**Required change.** In §3.4's routes paragraph, after "…its box the side's padded by the hot pixel (§3.3)." insert:
"It is the route that placement and the grid read, never the unit of an answer: a query and `readBack` return every edge
between two of the arena's vertices on its own, keyed by §3.3's canonical key read on that edge's own endpoints — every
vertex of the arena being of its one level — so no two edges share a key and an edge on more than one input side needs
no choice between them."

### VK2-02 — minor · new-problem · kernel · item 28 (f) (§3.4 routes paragraph l. 2643–2644)
**Claim.** "on an edge that lies on two input sides — a joint, or a fixed ring's side along a seed side — it reads
both". Some edges lie on three input sides:
* a kept room's side along a joint: the two seeds' sides and the kept ring's side;
* the passage room at the ground storey, where the span ring is both a seed and a fixed ring, beside a wing's seed side.

The next sentence ("each input side it lies on") is right. A literal reader of "two … both" implements a two-line test.
The repair's model (`amendb_repair_kernel_r2_routes.py`) covers one side only.

**Required change.** "and on an edge that lies on two input sides — a joint, or a fixed ring's side along a seed side —
it reads both" becomes "and on an edge that lies on more than one input side — a joint, a fixed ring's side along a
seed side, or a kept room's or the passage room's side along a joint — it reads each". The fixture is VK2-09 (3).

### VK2-03 — minor · conflict · kernel · item 28 (f) (§3.4 re-cut paragraph l. 2649–2651 against §2.6 l. 1481–1486)
**Claim.** §3.4: the re-cut "passes the rooms the ladder keeps and the anchors that never move (the stair core's bay,
the hearths' chimney stacks, a passage) as `fixed` rings". Round 2's §2.6 FIXED list passes "the stair core's bay, the
chimney stacks, the passage room (the span ring, both seed and fixed), the composer's rooms and the rooms the
least-disruption rule below keeps". F-PLAN's tier 2 (J-A28.73) also names "a composer's room" among the refused rings.
The kernel's list lacks the composer's rooms (a tower's round room) and restates what §2.6 homes.

**Required change.** "passes the rooms the ladder keeps and the anchors that never move (the stair core's bay, the
hearths' chimney stacks, a passage) as `fixed` rings, and cuts the rest" becomes "passes as `fixed` rings the rings
§2.6's re-cut rule fixes (the stair core's bay, the chimney stacks, the passage room, the composer's rooms and the rooms
the ladder keeps), and cuts the rest".

### VK2-04 — minor · conflict · kernel · item 28 (§3.4 l. 2519, 2610–2617; Part A J-A28.34 l. 487) — the kernel's companion to VK2-05 (= V-MAB2-09, VD2-09)
**Claim.** The seed clip is defined on "wing order": the signature says "in wing order", and the body says "each face
going to the first ring in wing order that contains it". J-A28.34's Part A leaves the hole case to "the plan rung's
choice". The model fix that the model and determinism verifiers require (VK2-05) makes the clip's order wing order with
a contained wing after its container. So "wing order" no longer names the order the caller passes, and the Part A hand-off
is answered.

Separately, the signature's comment, "per input ring its pieces — the faces of one overlay of all the rings that no
earlier ring contains", leaves out the face's own ring. It reads as every uncovered face, not the faces the ring itself
contains.

**Required change.**
1. §3.4 signature: `tileRings(rings: Ring[] /* world lattice rings, counter-clockwise, in the caller's clip order (§2.6
   step 4) */): KernelResult<Ring[][]>   // the seed clip (below): per input ring its pieces — the faces of one overlay
   of all the rings that it contains and no ring before it contains, united — counter-clockwise, none where the rings
   before it cover it`.
2. §3.4 body:
   * "each face going to the first ring in wing order that contains it" becomes "each face going to the first ring in
     the order passed (§2.6 step 4's clip order) that contains it";
   * after "…because a seed is one ring." add "§2.6's clip order puts a contained wing after its container, so the
     refusal marks a caller's bug (F-PLAN, §5.2)".
3. J-A28.34 Part A:
   * "each face going to the first ring in wing order that contains it (`tileRings`)" becomes "each face going to the
     first ring in the caller's clip order that contains it (`tileRings`)";
   * "because a seed is one ring and which wing takes the enclosed rooms is the plan rung's choice, not the kernel's"
     becomes "because a seed is one ring; the plan rung's clip order puts a contained wing after its container, which
     takes the enclosed rooms (§2.6), so the refusal marks a bug".

### VK2-05 — minor · missing · model · items 28, 28 (f) (§2.6 stage-3 contract l. 1260–1262, step 4 l. 1376–1378, re-cut gloss l. 1490–1491) — the same finding as verify-model-r2's V-MAB2-09 and verify-determinism-r2's VD2-09
**Claim.** §3.4 refuses "a piece left with a hole — an earlier ring wholly inside a later one". Overlapping wings are
legal (§2.6 rule 4 (iii)), and §2.6's contract only requires the seeds to "stand at least `attractCm` apart except where
they share a joint". Nothing in §2.6 excludes an extent wholly inside a later one's at a storey (0 hits for "wholly
inside"), and step 4 does not name `tileRings`. The gloss "so a later wing's rooms are re-cut too where an earlier
overlapping wing changed" is one-sided: under one overlay, an earlier wing's piece also gains or loses the crossing
vertices of a later wing that crosses it.

**Required change.** Apply V-MAB2-09's text once:
1. After the contract's "stand at least `attractCm` apart except where they share a joint", insert "; the clip takes
   the wings that reach a storey in wing order, except that a wing whose extent there lies wholly inside another's is
   taken after that container, so it has no piece at that storey (its floor there is its container's) and no piece has
   a hole".
2. Step 4's parenthesis becomes "(where wings overlap, rule 4 (iii), each extent less the union of the extents before it
   in wing order, a contained wing after its container (the stage-3 contract): §3.4's seed clip, `tileRings`)".
3. The gloss becomes "— so a wing's rooms are re-cut too where an overlapping wing, earlier or later, changed its piece
   (the clip's crossing vertices included, §3.4)".

VD2-09's wording says the same thing; apply one of the two. VK2-04 is the kernel's companion.

### VK2-06 — minor · conflict · determinism · item 28 (f) (§5.2 F-PLAN tiers 1 and 2, l. 5586) — the same finding as verify-determinism-r2's VD2-10, extended to tier 1
**Claim.** Tier 1 detects "a seed or fixed ring the rung's transient arena refuses … §3.4". The seed clip's refusal
comes from `tileRings`, before any arena opens, so tier 1's wording does not catch it. Tier 2 sends every seed refusal
to the bug abort "the shell §2.6's composition contract guarantees", and that contract says nothing about a holed piece
until VK2-05 lands.

**Required change.**
1. Tier 1: "a seed or fixed ring the rung's transient arena refuses (`E_DEGENERATE`, detail `seed`, `fixed` or
   `overlap`; §3.4)" becomes "a seed or fixed ring the rung's seed clip or transient arena refuses (`E_DEGENERATE`,
   detail `seed`, `fixed` or `overlap`; §3.4's `tileRings` and `transientArena`)".
2. Tier 2: VD2-10's insertion, "(its step 4's storey order leaves no seed piece with a hole, §3.4's `tileRings`)",
   after "…is the shell §2.6's composition contract guarantees".

### VK2-07 — minor · partial · scope · items 28, 29 (T28-3, l. 10296–10297) — VK1-04's residue; the same finding as verify-model-r2's V-MAB2-14
**Claim.** §2.6 step 3 now joins the basement by "a core of kind `trapdoor`", either the row's or "the fallback where no
candidate fits the ring … reported". T28-3 still reads "the basement is entered by that core or through a trapdoor the
class row declares". A correct plan that takes the fallback therefore fails the bar.

**Required change.** Apply V-MAB2-14's text: "and the basement is entered by that core or through a trapdoor the class
row declares" becomes "and the basement is entered by that core, or through a trapdoor — the one `Basement.access`
names, or the `trapdoor` core the plan reports where no bay of the core fits the basement ring (§2.6 step 3;
J-A29.25)".

### VK2-08 — minor · conflict · scope · item 28 (§13.1 transient-arena clause, l. 10031–10033)
**Claim.** The fixture asserts, for the rotated T clipped by one overlay, "every crossing vertex on both rings, within
the hot pixel of the bar's straight side". §3.4 gives no such bound. The overlay is §3.7's boolean machinery, which
inserts each ring "run by run" (§3.6). So the stem's second crossing is placed against the sub-edge the first crossing
left. J-A28.34's own Part A entry says this happens in 1.3 % of cases (worst 1.06 cm; this lane's round-1 receipt,
`amendb_verify_kernel_r1_drift.out`, "T clip"). One overlay makes the drift harmless because both rings share the
vertex, not because the vertex is bounded. The fixture would fail on about one rotated T in 75.

**Required change.** In §13.1, "clipped to tile as the faces of one overlay (§3.4's seed clip) — every crossing vertex on
both rings, within the hot pixel of the bar's straight side, and the seeds accepted" becomes "clipped to tile as the
faces of one overlay (§3.4's seed clip) — every crossing vertex a vertex of both rings, the joint shared vertex for
vertex, and the seeds accepted".

### VK2-09 — minor · missing · scope · item 28 (§13.1 l. 10010, 10030–10044) — the kernel seat's note (5)
**Claim.** `tileRings` is a new listed service with three outcomes, each stated in §3.4:
* no piece for a ring the earlier ones cover;
* two pieces for a ring they cut in two;
* a refusal for a piece with a hole.

No fixture exercises them. B-FUZZ's differential line covers "booleans and buffers" only, although §3.4 says every
listed op has fuzz tests (l. 2539), and the kernel seat asked for `tileRings` to be treated as a boolean case. VK2-02's
case, an edge on three input sides, has no fixture either.

**Required change.** In §13.1:
1. The differential clause: "differential agreement with the CI oracles … on booleans and buffers" becomes "…on
   booleans, `tileRings` (each ring's pieces against the oracle's difference of that ring with the union of the rings
   before it) and buffers".
2. In the transient-arena clause, after "…and the seeds accepted;" insert "`tileRings` on a ring the earlier rings cover
   (no piece), on one they cut in two (two pieces, each simple and counter-clockwise) and on an earlier ring wholly
   inside a later one (refused, `E_DEGENERATE`, detail `overlap`, naming a vertex of the hole);".
3. In the re-cut clause, after "(the input sides as the arena's routes, §3.4)" insert "; a new wall ending on a kept
   room's side that lies along a joint, its end within the hot pixel of each of the three input sides it lies on".

### VK2-10 — minor · stale · scope · item 9 (VK1-11's follow-on) (§1.1 l. 211)
**Claim.** The `RungProfile` comment reads "side scales with √(population ÷ target) (§3.2, §12.2)". Since VK1-11,
§12.2 holds only a pointer to §3.2 (9) and the cap figures, and CANON-C03 made §3.2 (9) the frame's home. The rendering
repair seat and assemble-r2 §8 (7) both flagged this.

**Required change.** "(§3.2, §12.2)" becomes "(§3.2 (9))".

## 5a De-duplication with the sibling verify-r2 reports (read 08:57–09:05)

* **verify-model-r2.** V-MAB2-09 is VK2-05, and its required text is the one to apply. V-MAB2-14 is VK2-07. Its
  VK1-04 row ("FIXED in §2") agrees with §3 here; the T28-3 residue is scope's.
* **verify-determinism-r2.** VD2-09 is VK2-05, with an equivalent wording; apply one of the two. VD2-10 is VK2-06's
  tier-2 half. VK2-06 adds tier 1, because the seed clip's refusal comes from `tileRings`, not from the arena.
* **verify-pipeline-r2.** No overlap: no finding cites §3, `tileRings` or the transient arena.
* **verify-rendering-r2 and verify-scope-r2** were still in progress at 09:05 (skeleton files only). VK2-10 repeats the
  rendering repair seat's own note.
* **New in this report:** VK2-01, VK2-02, VK2-03, VK2-04, VK2-08 and VK2-09.

## 6 Receipts (executed 2026-09-27)

* **Hashes.** `docs/ARCHITECTURE.md` sha256 `831efd429092adf3…` and `docs/ARCHITECTURE-RATIONALE.md` `f2c2a1ca11a0f1da…`,
  equal to assemble-r2's installed values. Both were checked at the start and again after the incident below.
* **§3 diff** between the pre-repair-r2 archive (l. 2033–3129) and the live §3 (l. 2060–3172): 12 hunks, all in the four
  REPLACE blocks of `repair-r2-kernel.md`. Scratch copies: `scratchpad/vk2/sec3-r1.md`, `sec3-r2.md`, `sec3-r2.diff`.
* **The routes model, re-run.** `python3 docs/validation/bench/amendb_repair_kernel_r2_routes.py` ran for 274 s and
  its output is `cmp`-identical to the committed `.out`: rotated sides split 1–6 times, 0 vertices beyond 0.71 cm of
  the straight side, 0 search failures, 0 kept corners unsplittable; axis-aligned sides 0. The model covers one input
  side per edge; the case of an edge on two or three input sides is not modelled (VK2-02, PLAUSIBLE).
* **The round-1 drift model** (`amendb_verify_kernel_r1_drift.out`, "T clip"): 265 of 20 000 second crossings (1.32 %)
  lie beyond 0.71 cm of the bar's straight side, worst 1.057 cm. This is the basis of VK2-08.
* **References.** `python3 docs/validation/amendments-b/refs.py docs/ARCHITECTURE.md scratchpad/vk2/refs.json` →
  headings 139, D ids 35, J ids 469, broken 2 (`os-geometry.md` §2.1.4 l. 2679, external; RFC 7946 §3.1.6 l. 9123),
  both pre-existing.
* **Document checks.** `python3 docs/validation/bench/doc_checks.py --sections "3,Judgment calls"` → C1 5/0, C2 0/0,
  C3 161/0, C4 0/0, S1 0/0, S2 0/0, **exit 0** (9 626 JSON files, 911 940 3-grams). The allow file was not touched.
* **Probes** (grep, on the live text):
  * `tileRings` occurs at l. 2519 and l. 2610 only: 0 times in §2, §5 and §13;
  * "seed clip" occurs at l. 2519, 2610 and 10032;
  * "wholly inside" occurs 0 times in §2.6;
  * "composer's rooms" occurs at l. 1380 and 1486 (§2.6), and not in §3.4's re-cut sentence;
  * T28-3 lacks the fallback;
  * l. 211 still reads "(§3.2, §12.2)";
  * no "party wall" names a joint in §3;
  * "site-plan table" is gone from §3.7.
* **INCIDENT (this seat's error; repaired).** At about 08:55 the resolver was first run as `refs.py docs/ARCHITECTURE.md
  docs/ARCHITECTURE-RATIONALE.md`. Its second argument is the JSON output path, so it overwrote the rationale file with
  a 1 397-byte JSON. At 08:56 the file was restored from the assembler's installed copy
  (`scratchpad/asm2/final1-r.md`): sha256 `f2c2a1ca11a0f1da5da2891ee69c70588806000066b77bdd7242d1e5fb64dae1`, 2 050
  lines, the value assemble-r2 recorded. The content is identical; only the mtime changed.
  * A NOTE line in `docs/lane-events.log` names the window and asks verify-model-r2, verify-rendering-r2 and
    verify-pipeline-r2 to re-read any Part A entry they quoted in that minute.
  * No other file was written by this lane except this report, the log lines and the review-queue row.

## 7 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (quoted text or an executed check):
* the round-1 re-check table (§3) and the item verdicts (§2);
* VK2-01: the texts of §3.3 and §3.4 that conflict are quoted;
* VK2-02 and VK2-03: the quoted lists differ;
* VK2-04: the wording against VK2-05's rule;
* VK2-05, VK2-06 and VK2-07, each confirmed by a sibling verifier too;
* VK2-08: the fixture's claim against J-A28.34's own figure and the drift receipt;
* VK2-09 and VK2-10: 0-occurrence probes;
* the routes model's re-run, the resolver, the document checks and the restoration hash.

**PLAUSIBLE** (reasoning only, since no kernel exists yet):
* that a lattice point within the hot pixel of all three nearly coincident input-side lines always lies within
  `attractCm` of the exact point (VK2-02 assumes the placement search succeeds there, as it does for one side);
* that §3.6's run-by-run insertion is how the seed clip's overlay will place a T's second crossing (VK2-08; round 1's
  model and J-A28.34's Part A read it so);
* how often a composition has an extent wholly inside a later one's (VK2-05; a composer's inner block or a hand-stored
  composition).
