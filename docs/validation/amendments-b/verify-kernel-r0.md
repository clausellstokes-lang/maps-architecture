# verify-kernel-r0 — lane amendments-b/verify-kernel-r0 (VERIFY the KERNEL part, §3, after assemble-r0)

> PENDING FABLE REVIEW — Opus-produced (amendments-b/verify-kernel-r0); queued as B-amendments-b/verify-kernel-r0 in docs/FABLE-REVIEW-QUEUE.md.

PROGRESS (kill-safe ledger; a seat that continues this lane reads it first)
ITEM 12: verdict PRESENT (§3.7 J-A12.31; §3.4 + §3.10 J-A12.32) | issues VK-07, VK-08, VK-09, VK-10, VK-28, VK-29 — done
ITEM 21: verdict PRESENT-to-the-route but CONFLICT with the item's final ruling (private, 2026-09-27) | issues VK-01, VK-16, VK-19 — done
ITEM 28: verdict PRESENT (§3.3, §3.4 transient arena J-A28.31, §3.8 J-A28.32, §3.10 seed tiling) | issues VK-03, VK-11, VK-13, VK-17, VK-18, VK-20, VK-21, VK-22, VK-24, VK-25 — done
ITEM 28 (f): verdict PRESENT (§3.4 re-cut paragraph J-A28.33; §3.10 row) | issues VK-02, VK-12, VK-23, VK-26, VK-27 — done
ITEM 30: verdict PRESENT (§3.10 J-A30.31; §3.4 fixed passage ring) | issues VK-04, VK-06 — done
CHECKS: single-source, stale probes, cross-part, deferral wording, broken references, new problems — done (§3)
IN PASSING (outside §3): VK-05 — done
RECEIPTS: doc_checks on "3,Judgment calls" (exit 1: 1 unreviewed C3, VK-15); refs.py (2 broken, both external) — done (§6)
STATUS: COMPLETE (2026-09-27): 29 issues — 1 blocker, 4 major, 24 minor; owners kernel 13, scope 5, model 2, determinism 2, rendering 3, pipeline 4 (VK-05 found in passing)

## Outcome

The kernel part carries every mechanism the route asked of it for items 12, 28, 28 (f) and 30, but four defects need
fixing before the pass can close. (1) **Item 21 (blocker):** §3.1's straight-skeleton row still says CGAL is rejected
"no longer for its licence, which the module's own GPL-3 (§17.3) makes compatible". The owner ruled on 2026-09-27 that
the module stays private, so the row now contradicts §17.3, D-22, §17.4 ("CGAL is excluded (its straight skeleton is
GPL)"), D-14 and J-A21.01. J-A21.31's index row and its Part A entry carry the same withdrawn premise. (2) **The re-cut's
"moves nothing" (major):** §3.4 inserts seed and fixed rings as `mandatory` chains under §3.6's attraction. §3.2 (2)
lets an earlier arena place a split vertex 25.29–26 cm from an endpoint, and attraction moves such a vertex onto that
endpoint when it is re-inserted. A new wall that ends on a kept room also adds a vertex to its ring. So J-A28.33's
"moves nothing and reads back byte-identical" does not hold. (3) **Seed and fixed preconditions (major):** overlapping
seed rings are wings that §2.6 rule 4 (iii) admits and plan step 1 passes. With them, §3.10's `area2` check reports a
failure on a valid building, and the overlap is left enclosed by fixed walls that nothing can remove. (4) **The passage in
the plan (major, the model's home):** §2.6 says the ground storey ends at the passage's edge. Yet the plan rung passes
"the passage" as a fixed ring, which by §3.4's contract must lie inside the storey's seed rings. The remaining issues are
minor: stale pointers from II.6 to II.7, a kernel error code II.7.3 relies on but §3 does not define, the rule-1/rule-2
citation, signatures, one stale frame sentence (item 9) and one new unreviewed document-check hit.

## 1 What was read (whole unless stated)

* `docs/AMENDMENTS-2026-09-25b.md` items 8–32 (12, 21, 28 with (f), 30 in their final text; item 21's 2026-09-27 ruling).
* `route.json` entries for the four items routed here (home [], referencing 12, 21, 28, 30) and `route.md`'s kernel
  duties and stale-text table.
* `amend-kernel.md` whole; the notes addressed to the kernel in every other `amend-*.md` (scope §3–§4, rendering §4,
  model §0–§4, pipeline-emulation-hidden §8, pipeline-sewers §4); `assemble-r0.md` whole.
* `docs/ARCHITECTURE.md` §3 whole (l. 1981–3043, 1 063 lines), diffed against the archive
  `docs/archive/ARCHITECTURE-pre-amendments-b-2026-09-26.md` §3 (l. 1525–2503): 12 hunks, exactly the kernel blocks.
* The sections the changed kernel text cites or that cite it: §2.2 rules 1–2; §2.5's `Passage` and `Plot`; §2.6 whole
  (l. 940–1441); §2.7's `Tunnel`; §4.1's elaboration paragraph; §4.6's reach rule; §4.12; §5.2 F-PLAN, F-SKELETON,
  F-PLOT; §5.3's plan, ladder, U and reachability rows; §6.2's cache paragraph; §7.1's plan events; §7.3's two plan
  rows; §8.1 (5); §8.5; §11.1's VTT fields; §12.2; §12.7's plan row; §13.1's amendments-b fixtures; §13.2 T28-1 to T28-17;
  §14's `Kernel` façade; §16's pricing lines; II.6 and II.7 whole; the §0.2 landing rows; the Staged list; D-13, D-14;
  the index rows and Part A entries of J-A12.31–J-A30.31, J-A21.01, J-A21.81, J-A28.21–.27, J-A30.21–.22, J-A30.41–.44, J-K5.

## 2 Per item — PRESENT, PARTIAL or MISSING in the terms the route required

| item | route's ask of §3 | verdict | the mechanism, quoted |
|---|---|---|---|
| 12 | §3.7: confirm `bandUnion` and the corridor use accept `tunnel` chains, the outer wall being the plots' frontage edge, or name the operation | **PRESENT** | §3.7: "`kerb`, `corridorUnion` and `bandUnion` take the arena from the transaction's `key` (§3.3) and a chain from its `(role, entity)` row, so they run on the underground arena on `tunnel` chains … the band's outer ring, the tunnel's external wall, is the `kerb` edge every underground frontage plot's lines end on … No arena-specific band operation exists." Also §3.4 (J-A12.32) and §3.10's arena-isolation row. Defects: VK-07, VK-08, VK-09, VK-10 (and VK-28, VK-29 on the pipeline side). |
| 21 | §3.1: re-ground "CGAL is GPL/LGPL — rejected" ("the licence is no longer the reason") | **CONFLICT** — present as the route asked, but the route predates the owner's 2026-09-27 ruling. The item's final text says "no GPL-3 wording enters the document" and that dependencies stay permissive-only | §3.1 l. 1997: "… and no longer for its licence, which the module's own GPL-3 (§17.3) makes compatible". §17.3 is unchanged (proprietary), §17.4 l. 11079 reads "CGAL is excluded (its straight skeleton is GPL)" and D-14 reads "Rejected: CGAL (GPL)". VK-01, VK-16, VK-19. |
| 28 | §3.4 / §3.8 / §3.10: the plan partition's operations or a new one; a skeleton reader if used; invariants (rooms tile each storey's wing rings, outer walls equal the rings) | **PRESENT** | §3.4 "Transient arenas (J-A28.31)" with `TransientKey`, `ArenaKey`, `transientArena`, `readBack` and `release`; its writers are "`splitFace`, `connectHole`, `radialSplit`, `ringBand`, `mergeFaces`, `absorbSliver`, `setOwner`". §3.3 `KernelTx.key: ArenaKey` and `BatchScope { kind: 'entity' }`. §3.8: "`spine` … each room's label spine and light point … the plan rung's only skeleton use (J-A28.32)". §3.10's seed-tiling row. Defects: VK-03, VK-11, VK-13 (plus VK-17, VK-18, VK-20–VK-22, VK-24, VK-25 elsewhere). |
| 28 (f) | the route's update said "Kernel — no new text"; the seat ruled otherwise, vetoably (J-A28.33) | **PRESENT** | §3.4: "**A re-cut is the same call (item 28 (f); J-A28.33).** … opens a fresh arena from the same seed rings … passes the rooms the ladder keeps and the anchors that never move … as `fixed` rings, and cuts the rest …". Defects: VK-02, VK-12 (plus VK-23, VK-26, VK-27 elsewhere). |
| 30 | §3.4 / §3.7 / §3.10: confirm that the passage representation keeps planarity and nesting; name any operation option (ii) needs | **PRESENT** | §3.10: "**Nesting admits no exception (J-A30.31).** … A passage is never an L1 way …". Option (i) needs no operation, option (ii) is refused, and §3.4's `fixed` includes "a passage under the wing (item 30)". Defects: VK-06 (stale alternative and seal attribute) and VK-04 (the passage's place in the plan's seeds, the model's home). |

## 3 The checks

**SINGLE-SOURCE.** The kernel states its own mechanisms once: the transient arena and the re-cut in §3.4, the tunnel
kerb in §3.7, the spine reader in §3.8, and the tiling, isolation and nesting rules in §3.10. The index rows point
there. There are two restatements of other parts' rules. VK-08: §3.4 restates II.7.3's surface-constraint list, and the
two lists differ. VK-23 (determinism): §7.3's stale-click row restates §2.6's re-cut rule without the unchanged-wing
guard. Outside §3 there are two duplicates. VK-05: II.6 declares `IslandRule` and `SkyStrategy` twice, with different
shapes. VK-18: T28-14 and J-A28.01 cite §3.10's row for a guarantee the row does not state.

**STALE — the probes over §3.**

| probe | result in §3 |
|---|---|
| lots as buildings | none; "lot" occurs only as "the lot cut's one bend" |
| binary wealth | none: §3 has no wealth term |
| size fixed by tier | **hit, VK-14.** §3.2 (9) gives each rung one fixed frame area. §1.1 and §12.2 scale it with population ÷ target (item 9) |
| one central market | none |
| the map editing the dossier | none |
| a proprietary licence default | not stale. Item 21's final ruling keeps the proprietary default. What is stale is the opposite: §3.1's GPL-3 wording (**VK-01**) |
| terrain and water that never change | none: §3.3's clear regions carry the carve and the re-carved reach that item 25's conversions use |
| decided alternatives still written as open | **VK-06** (§3.10 "an L3 alley face … or an L4 site-plan part"; J-A30.31's row "the model's choice") and **VK-12** (§3.4 "where the model derives the plan as a chain …", which J-A28.26 has decided) |

**CROSS-PART.** Each pointer in the changed kernel text was checked against the section it names.
* Resolved and consistent: §2.2 rule 1's underground levels; §2.6's composition contract ("Composed rings stand at least
  `attractCm` apart except where they share a joint … so the plan rung's transient arena inserts them unmoved (§3.4)");
  §2.6's `Room.ring` and `Chimney` as values from the arena; §2.6's capacity on `area2`; §4.1 ("S10 never writes L1");
  §5.2 F-SKELETON including the plan rung; §5.3's reachability walk "uses `faceNeighbours`, §3.4"; §6.2 ("so no digest
  ever depends on a click"); §8.1 (5)'s roof cache key; §12.7's plan row ("opening the storey's transient arena
  (O(seed vertices)), the cuts and the read-back (§3.4)"); §13.1's fixtures; §14's façade comment; §16's
  "amendments b: the transient arena".
* Wrong home or missing content, VK-07 / VK-09 / VK-24 / VK-22 / VK-29. §3.4 and §3.7 point to II.6 for the wall
  thickness, the plotted blocks and the frontage rule, but II.6 now hands all three to II.7 (II.6 l. 11410–11413).
  "(§2.2 rule 1)" for "the arenas share no topology" should be rule 2. §3.8's "light point … (§8.5)" names a light that
  neither §8.5 nor §11.1 draws or exports. §7.1 and F-PLAN point to §3.3 for the transient arena, which §3.4 defines.
  II.7.3 and §2.7 cite "II.6's condition table (its `open` column)", which II.6 does not have.
* Home contradicts the kernel's assumption: VK-04 and VK-01 (see §4).
* Notes addressed to the kernel: scope (a), the J-A21.31 amendment note, is not done and becomes VK-01. Scope (b), the
  façade names, matches. Rendering's §12.7 clause is carried. Pipeline-emulation-hidden's "nothing new" holds. The model
  seat addressed no note to the kernel; the kernel's own notes to the model were carried: the `attractCm` clause, the
  kept-room guard and the `area2` capacity.

**DEFERRAL-WORDING.** §3 contains no "TBD", "later" or "open question". Its only unresolved wordings are the two
decided alternatives above (VK-06, VK-12).

**BROKEN-REFERENCE.** `docs/validation/amendments-b/refs.py` over the assembled document reports 2 broken references,
both external citations that were already there: `os-geometry.md` §2.1.4 at l. 2552, inside §3.5, and RFC 7946 §3.1.6.
Every § pointer in §3 therefore resolves to an existing heading. The content-level mismatches are VK-07, VK-09, VK-22,
VK-24 and VK-29.

**NEW-PROBLEM.** The amendment's text contradicts existing rules of §3 in these places:
* VK-02: attraction (§3.6) together with §3.2 (2)'s 25.29 cm split bound breaks the claim that a re-cut moves nothing.
* VK-03: `area2` summed over overlapping seeds is not the area of their union.
* VK-10: "an assertion in every build" cannot be checked while slots are plain `number`s (§2.2).
* VK-11: the services' signatures take `PlatKey` while the prose says every service accepts `ArenaKey`.
* VK-12: item 18's mutation can change the seed rings.
* VK-13: several `KernelTx` fields are undefined for a transient batch, and `E_STRUCTURAL`'s comment does not cover
  fixed edges.
* VK-15: a new unreviewed C3 hit, caused by corpus growth.

## 4 Issues — each with its owning part and the exact required change

Line numbers are the assembled document's (`docs/ARCHITECTURE.md`, sha256 `87d89692…`) and, for Part A, the rationale
file's (`3f39b2de…`). The ids run from the most severe down.

### VK-01 — blocker · conflict · kernel · item 21 (§3.1 l. 1997; index l. 12245; Part A l. 350)
**Claim.** §3.1's straight-skeleton row rejects CGAL "on the stack and one-engine grounds … and no longer for its
licence, which the module's own GPL-3 (§17.3) makes compatible". J-A21.31's index row says the same ("no longer on its
licence (J-K5's licence clause superseded)"), and so does its Part A entry ("now that the module's own GPL-3 licence
(§17.3, item 21) makes its licence compatible"). On 2026-09-27 the owner ruled "then lets stay private for now". Item 21
now says that §17.3 and D-22 are unchanged, that "no GPL-3 wording enters the document" and that dependencies stay
permissive-only. The rest of the document follows that ruling: §17.4 l. 11079 reads "CGAL is excluded (its straight
skeleton is GPL)", D-14 reads "Rejected: CGAL (GPL)", J-A21.01 records the private ruling, and the §0.2 row for item 21
reads SATISFIED. So the kernel row asserts a licence the module does not have and cites §17.3 for it.
**Required change.**
1. §3.1 row, candidate cell (the decision cell stays "**build** (§3.8; J-K5, J-A21.31)"): "none adopted: no permissive,
   mature JS/TS skeleton that could be held to §3.8's numeric contract is known to this design; CGAL's is GPL/LGPL,
   which §17.4's permissive-only production closure excludes (the licence is the owner's, §17.3), and it fails the stack
   and one-engine grounds besides — a C++ library is not the TypeScript kernel every host runs (D-4; no WASM kernel,
   §3.7) and its doubles could not be made byte-identical to §3.8's validated construction".
2. J-A21.31's index row: "| J-A21.31 | the straight skeleton stays in-house; CGAL rejected on its licence (§17.4's
   permissive-only closure under the private licence, J-A21.01) and on the stack and one-engine grounds; J-K5 stands
   whole | §3.1 |".
3. J-A21.31's Part A entry: "Chose to keep the straight skeleton in-house and to state CGAL's rejection on all its
   grounds — its GPL/LGPL licence, which §17.4's permissive-only production closure excludes while the module stays
   private (§17.3, D-22; the owner's ruling of 2026-09-27, J-A21.01), and the stack and one-engine rule: a C++ library is
   not the TypeScript kernel every host runs (D-4; no WASM kernel, §3.7) and its doubles could not be held byte-identical
   to §3.8's validated construction — over re-grounding the rejection on the stack alone, as this entry first chose under
   the owner's GPL-3 intent of 2026-09-25, because that intent was withdrawn on 2026-09-27 and a copyleft dependency
   would constrain the owner's licensing choice; J-K5 stands whole (§3.1; item 21; amendments-b, kernel seat, amended by
   verify-kernel-r0)."
4. Companion: VK-16 (J-A21.01, scope).

### VK-02 — major · new-problem · kernel · item 28 (f) (§3.4 l. 2500, 2507–2508, 2531–2532; Part A l. 353)
**Claim.** §3.4 inserts the seed rings and the `fixed` rings "as `mandatory` chains", so §3.6's attraction applies to
them. §3.2 (2) allows a vertex split onto an edge to stand 25.29–26 cm from that edge's endpoint. When a kept room is
re-inserted, such a vertex lies within `attractCm` (26 cm) of the endpoint, and §3.6 step 2 moves it onto the endpoint:
the kept ring deforms and `W_ATTRACTED` fires. This happens on quad and curved wings, whose cuts do not fall on the
50 cm module. In addition, a new partition that ends on a kept room's wall adds a vertex to that room's ring. So these
claims are false for a share of rooms:
* the re-cut paragraph's "a kept ring re-enters on the lattice points it left with, so the insertion moves nothing and
  it reads back byte-identical";
* J-A28.33's Part A entry, "moves nothing and reads back byte-identical";
* §13.1's re-cut fixture, "come back byte for byte, `W_ATTRACTED` and `W_PLACED` are empty for them".

The last can fail on correct code.
**Required change.**
1. §3.4, replace "Its L0 faces are the seed rings, inserted as `mandatory` chains — a side two rings share becomes one
   edge (an exact collinear overlap, §3.6), the party wall between two wings — and then the `fixed` rings inside them,
   each a face of its own." with "Its L0 faces are the seed rings and then the `fixed` rings, each a face of its own,
   inserted as exact topology the way §3.9's load inserts stored chunks: a lattice point two rings share is one vertex, a
   side two rings share is one edge (the party wall between two wings), a vertex within the hot pixel (0.71 cm) of
   another ring's edge splits that edge there, and no attraction moves any of them; an input ring that would break
   `minEdge`, clearance or simplicity is refused with `E_DEGENERATE` (detail `seed` or `fixed`) naming the vertex, which
   F-PLAN's tier 1 takes (§5.2), so a planner places an anchor on a wall or at least `minEdge` from it."
2. `transientArena`'s trailing comment "// W_ATTRACTED and W_PLACED name every seed or fixed vertex the insertion moved"
   becomes "// E_DEGENERATE (detail 'seed' | 'fixed' | 'overlap') names the offending vertex; the construction moves
   nothing".
3. In the re-cut paragraph, replace "a kept ring re-enters on the lattice points it left with, so the insertion moves
   nothing and it reads back byte-identical" with "a kept ring re-enters exactly on the lattice points it left with —
   valid in the arena that read it back, so the exact insertion accepts it — and keeps its polygon: every vertex
   unmoved and in order, any vertex a new wall adds lying on one of its sides".
4. In J-A28.33's Part A entry, replace "a kept ring re-inserted on the lattice points it left with moves nothing and
   reads back byte-identical" with "a kept ring re-inserted exactly on the lattice points it left with keeps its polygon,
   its vertices unmoved and in order".
5. Companions: VK-17 (§13.1, scope) and VK-22 (F-PLAN, determinism).

### VK-03 — major · new-problem · kernel · item 28 (§3.4 l. 2498–2499; §3.10 l. 3024)
**Claim.** The `seed` parameter assumes abutting rings ("abutting rings share the joint's vertices exactly, as §2.6 rule
1 requires"). But §2.6 rule 4 (iii) admits wings that overlap ("a T whose stem runs into its bar"), and plan step 1
passes `BaseWing.ring`s as the seeds. Overlapping seeds cause three failures:
* (a) §3.10's check, "`area2` summed over the faces against `area2` summed over the seed rings", reports a failure on a
  valid building. The faces tile the union once, while the sum counts the overlap twice.
* (b) The overlapped sides become fixed edges inside the building, which `mergeFaces` refuses to delete. The overlap is
  therefore a forced room.
* (c) `readBack`'s `seed` and `joint` tags are ambiguous in the overlap.

Nothing states what happens to a fixed ring that lies outside the seeds' union or overlaps another fixed ring; that
would break the union invariant, which is hard. The row's consequence clause ("a storey's rooms tile exactly the wings
that stand at its level") also leaves out a spanned passage's ring (VK-04).
**Required change.**
1. §3.4, the `seed` comment becomes "world lattice rings, counter-clockwise, tiling: interiors pairwise disjoint, two
   rings meeting only along shared sides — whose vertices they share exactly, as §2.6 rule 1 requires — or at
   vertices".
2. The `fixed` comment gains "each inside the seeds' union, interiors pairwise disjoint; a fixed ring may coincide with a
   seed ring (a spanned passage's room, §2.6)".
3. After the construction sentence (VK-02's text), add: "Seed rings that overlap, and a fixed ring outside the seeds'
   union or overlapping another, are refused with `E_DEGENERATE` (detail `overlap`); a caller whose wings overlap (§2.6
   rule 4 (iii)) passes them clipped to tile — each ring less the union of the rings before it in wing order, by
   `booleans('difference', …, 'nonzero')` on the arrangement (§3.7) — so the joints are shared sides."
4. §3.10's seed-tiling row: in the invariant cell, "so a storey's rooms tile exactly the wings that stand at its level
   and every exterior wall follows a wing-ring side" becomes "so a storey's rooms tile exactly the seed rings §2.6
   passes — the wings that stand at its level, clipped to tile, and at the ground storey a spanned passage's ring — and
   every exterior wall follows a seed-ring side".
5. The same row's "how" cell gains "; at the open, the seeds' and the fixed rings' pairwise disjointness (the
   construction finds no crossing)".
6. Companions: VK-21 (§2.6, model) and VK-17 (§13.1's T rings, scope).

### VK-04 — major · conflict · model (the plan's home) · items 28 and 30 (§2.6 l. 983, 1225–1227, 1266–1268, 1303–1307, 1320–1323, 1337–1338, 1414; §4.6 l. 4128; §3.4 l. 2499, 2530)
**Claim.** §2.6 puts the passage outside the ground storey in four places:
* `Wing.spans`: "the ground storey ends at the passage's edge and every storey above extends over it";
* the stage-3 contract: "the passage face lying outside the union at the ground";
* the fourth rung: "per storey, the union of the plan's rooms equals the union of the rings of the wings that reach the
  storey";
* step 1: "with `Wing.spans` at level ≥ 1".

The same section, and the texts around it, reserve the passage inside the plan:
* step 1: "a reserved passage (`Wing.spans`)";
* step 3: "a reserved passage are anchors fixed in their wing and side before any cut";
* step 4: "its fixed rings the stair core's bay, the chimney stacks, the passage and the composer's rooms";
* step 5: "a `passage` opening at each end of a reserved passage";
* entrances rule 5 and `Opening.entrance`: "the two ends of a reserved passage are entrances onto it";
* the re-cut's FIXED list: "the reserved passage cells" (J-A28.26 says the same);
* §4.6: "the plan rung reserves those cells";
* the kernel's `fixed` example: "a passage under the wing (item 30)", and its re-cut anchor "a passage".

A `fixed` ring must lie inside the storey's seed rings (§3.4). At the ground storey, the only storey the passage takes,
the seed excludes it. As written, the plan cannot reserve the passage, and T28-4's tiling bar contradicts the
reservation.
**Required change** (§2.6; resolve toward the reservation, which the route assumes — "the plan rung reserves the
passage cells before partitioning, as a passage room" — and which step 5's `passage` openings, `RoomRole` `passage`,
`Room.scope` "… or passage", J-A28.26 and §4.6 also assume):
1. `Wing.spans` comment: "item 30: the Passage face (§2.5) the wing spans: its ground ring ends at the passage's edge (the
   stage-3 contract reads that ring) and every storey above extends over it (the wing's extent at level ≥ 1 is footprint
   ∪ the passage face's ring); at the ground storey the plan rung adds the passage face's ring as a seed ring and passes
   it as a `fixed` ring — the passage room (role `passage`, scope `circulation`), never cut, its two ends the `passage`
   openings".
2. The fourth rung: "per storey, the union of the plan's rooms equals the union of the rings of the wings that reach the
   storey — at the ground storey with each spanned passage's face ring, the passage room".
3. Step 1: "with `Wing.spans` at level ≥ 1)" becomes "with `Wing.spans` at level ≥ 1 and, at the ground storey, the
   spanned passage's face ring)".
4. Put the same qualifier in T28-4 (§13.2, scope) and in §5.3's stored-plan tiling row (determinism). The kernel's
   clause is VK-03 (4).

### VK-05 — major · duplicate · pipeline · found in passing while checking the kernel's II.6 pointers (II.6 l. 11301–11320 against l. 11334–11393)
**Claim.** II.6 keeps its pre-amendment island paragraph and interfaces beside the amendment's rule. The paragraph at
l. 11301 reads "The toggle creates 1–3 islands … by rule, when the toggle is on, S7b allocates …". That contradicts rule 1
of the new text (the view toggle "shows the islands a settlement has and creates none"; the model setting is
`recipe.layers.islands`) and rule 4 (the count is 0–3, by slot). Each interface is also declared twice, with different
shapes:
* `IslandRule`, first as `{ reason; maxIslands: 1|2|3; elevationCmBand; areaHaBand; placement; terrain }` (l. 11316),
  then as `{ rung; chance; thresholdCut; supply; areaHaMax; …; institutions; hysteresis; dwellYears }` (l. 11384);
* `SkyStrategy`, first as `place(doc, rules: IslandRule[], …)` (l. 11317), then as `place(doc, rule: IslandRule, …)`
  (l. 11390).

**Required change** (II.6):
1. Delete the first code block (l. 11315–11320).
2. Replace "The toggle creates 1–3 islands. **Why an island exists** is one of two reasons, by rule or by assignment:"
   with "A settlement has 0–3 islands by the island rule below — the model setting creates them where the supply admits
   them, the view toggle only shows them. **Why an island exists** is one of two reasons, by rule or by assignment:".
3. Replace "by rule, when the toggle is on, S7b allocates" with "by rule, when the model setting is on and a slot opens,
   S7b (5) allocates".
4. Change "Hook interface:" to "Hook interfaces: `IslandRule` and `SkyStrategy`, declared once below".

### VK-06 — minor · stale · kernel · item 30 (§3.10 l. 3033–3042; index l. 12249; Part A l. 354)
**Claim.** The nesting paragraph still offers an alternative that the homes have decided: "a face of one level in one
parent — an L3 alley face beside the plots it serves, or an L4 site-plan part inside the front plot, as §2.5 and §4.7 S10
declare". §2.5's `Passage.face` is "the L3 face of kind passage", and J-A30.43 rejected "an L4 site-plan part inside the
front plot". The paragraph also says "the seal is an attribute of the plot's record (§2.5, §2.8)", whereas the seal is
`Passage.sealed` — §2.5 calls it "the one stored bit behind 'a sealed access edge' and a plot's exposure 'sealed'". J-A30.31's
index row ("an L3 alley face or an L4 site-plan part, the model's choice") and its Part A entry ("the model editor's
choice"; "a seal an attribute of the plot's record") carry both.
**Required change.**
1. In §3.10, replace the first two clauses with: "A passage under a building's wing (item 30) is an L3 face of kind
   `passage` in one parent — §2.5's `Passage`, cut by S10 along one side line of the front plot (§4.6, §4.7 S10 (9)) by
   `splitFace` or `claimSubFace` as any alley face is;".
2. Replace the seal sentence with: "A sealed passage (item 30 (e)) keeps its face and its edges — the seal is the
   `Passage` record's `sealed` bit (§2.5), from which the sealed access edges and the plots' exposure `sealed` are read
   (§4.6), not a change of geometry."
3. J-A30.31's index row becomes "| J-A30.31 | a passage is an L3 `passage` face (the form J-A30.21 and J-A30.43 took)
   with the wing above it a composition ring; no nesting exception, no new kernel operation; a seal is the `Passage`
   record's bit | §3.10 |".
4. In the Part A entry, replace "an L3 alley face beside the plots it serves or an L4 site-plan part inside the front
   plot, the model editor's choice (§2.5, §4.7 S10)" with "an L3 face of kind `passage` (§2.5's `Passage`; J-A30.21,
   J-A30.43)", and replace "a seal an attribute of the plot's record" with "a seal the `Passage` record's bit".

### VK-07 — minor · broken-reference · kernel · item 12 (§3.7 l. 2795–2796, 2827, 2830; §3.4 l. 2487)
**Claim.** II.6 hands "the tunnel profile with its wall thickness" and "the underground neighbourhoods" to II.7
(l. 11410–11413). The kernel still points to II.6 for them: "(`Tunnel.widthCm` and II.6's wall-thickness row)", "which
of those blocks is plotted, and how deep, is II.6's", "the frontage rule and its invariants are II.6's and §5.3's", and
"(II.6; item 12)". In addition, "a tunnel's corridor width, its bore plus its wall" reads as the bore plus one wall,
while II.7.2 (l. 11500–11501) and §2.7 define the corridor half-width as `widthCm ÷ 2 + wallCm`.
**Required change.**
1. §3.7: "in the underground arena a tunnel's corridor width, its bore plus its wall (`Tunnel.widthCm` and II.6's
   wall-thickness row)" becomes "in the underground arena a tunnel's corridor half-width, `widthCm ÷ 2 + wallCm` — half
   its bore plus its wall (`Tunnel.widthCm`, II.7.2's profile row)".
2. §3.7: "is II.6's" becomes "is II.7.3's".
3. §3.7: "are II.6's and §5.3's" becomes "are II.7.3's (U1–U3) and §5.3's".
4. §3.4: "(II.6; item 12)" becomes "(II.7.3's surface constraint; item 12)" — or VK-08's sentence, which supersedes it.

### VK-08 — minor · duplicate · kernel · item 12 (§3.4 l. 2484–2487)
**Claim.** §3.4 restates what the underground tests: "each tunnel band, frontage plot and building it lays against the
ground arena's water, wall, gate, keep and reservation faces". II.7.3, the home, tests something different. It tests
plot rings only, at their vertices, the frontage midpoint and 1 m samples of the rear line. It tests them against L0
water, `damp` and `flood` cells, the wall strip's parts, towers and gatehouses, the castle's reservation, a precinct's
main footprint and every other L4 footprint. The kernel's list adds tunnel bands and buildings and leaves out the cells
and the footprints.
**Required change.** §3.4: "A stage on one arena reads another through the services alone and never writes it: the
underground stage tests what it lays against the ground by `pointLocate` and `resolve` on the ground's `PlatKey` — what
it tests, and what excludes a sample, are II.7.3's surface constraint (item 12) — and a sky island's shadow footprint is
the same query the other way."

### VK-09 — minor · broken-reference · kernel · item 12 (§3.4 l. 2482–2483; §3.10 l. 3023; Part A l. 349)
**Claim.** "The arenas share no topology … a cross-arena link is an entity id" is §2.2 **rule 2** (l. 505–507). Rule 1's
underground paragraph itself cites "(rule 2)". The kernel nevertheless cites "(§2.2 rule 1)" in §3.4 and in §3.10's
arena-isolation row, and J-A12.32's Part A entry says "§2.2 rule 1 already keeps the arenas free of shared topology".
**Required change.** In these three places, "§2.2 rule 1" becomes "§2.2 rule 2". II.7.1 has the same slip; it is VK-29.

### VK-10 — minor · new-problem · kernel · item 12 (§3.4 l. 2483–2484; §3.10 l. 3023)
**Claim.** §3.4 says "an op handed a slot of another arena is a programming error, caught by an assertion in every
build", and §3.10's row says "by construction | an op handed another arena's slot fails an assertion in every build".
No check can do this: slots are plain numbers (§2.2: `type VertexId = number; type HalfEdgeId = number; type FaceId =
number`), so a slot of one arena cannot be told apart from a valid slot of another.
**Required change.**
1. §3.4: "…is a programming error: every slot a caller holds comes from a result stamped with its `ArenaKey` and arena
   version (`Resolved`, a query result, a commit record, `ChainInsert.placed`), valid until that arena's next commit
   (§2.2 rule 5), and a debug build asserts the key and the version wherever such a slot is passed, as `resolve` already
   asserts the version; a cross-arena link is an entity id, never a slot".
2. §3.10's row: scope "by construction; debug-build assertion"; how "each slot passed to an op or service checked in a
   debug build against the key and version of the result it came from; the multi-arena stages' property tests (§13.2)".

### VK-11 — minor · new-problem · kernel · item 28 (§3.4 l. 2430–2433, 2497)
**Claim.** The `ArenaKey` comment calls it "what every service's `key` accepts", but the service list still types
`resolve(…, key: PlatKey)`, `resolveVertexAt(key: PlatKey, …)`, `signature(key: PlatKey, …)` and `sampleProfile(…,
key: PlatKey, …)`. §14 types `resolve(ref: GeomRef, key: ArenaKey)`. And the role services mean nothing on a transient
arena, which has "no role rows beyond the owners the caller sets … and no entity".
**Required change.**
1. §3.4: `resolve(ref: FaceRef | ChainRef | EdgeSetRef | VertexRef, key: ArenaKey)` and `pointLocate(key: ArenaKey,
   level, p)`.
2. The `ArenaKey` comment becomes "// what KernelTx.key and CommitRecord.key name (§3.3), and what `resolve` and
   `pointLocate` accept; `resolveVertexAt`, `signature` and `sampleProfile` read a plat's role rows and take a
   `PlatKey`".

### VK-12 — minor · new-problem · kernel · item 28 (f) (§3.4 l. 2528–2534)
**Claim.** The re-cut paragraph says "The plan derived again for new occupants under §2.6's interior ladder, or after
item 18's mutation, opens a fresh arena from the same seed rings". But item 18's mutation may change the shell (an extra
wing or storey), and §2.6 says "a shell mutation by item 18 keeps nothing in the wing that changed". The paragraph also
says "where the model derives the plan as a chain of least-disruption steps (§2.6, §7.3)", which hedges a question
J-A28.26 has settled: the canonical chain.
**Required change.**
1. Replace the first sentence with: "The plan derived again for new occupants under §2.6's interior ladder opens a fresh
   arena from the same seed rings — the shell that item 31's geometry floor fixed (§4.11) — passes the rooms the ladder
   keeps and the anchors that never move … as `fixed` rings, and cuts the rest; after item 18's mutation the seeds are
   the mutated shell's rings, and a room is kept only in a wing whose ring is unchanged (§2.6's kept-room rule)."
2. Replace "where the model derives the plan as a chain of least-disruption steps (§2.6, §7.3), each step is its own
   open, cut and read-back" with "the model derives the plan as a chain of least-disruption steps (§2.6's canonical
   chain, J-A28.26; §7.3), each step its own open, cut and read-back".

### VK-13 — minor · partial · kernel · item 28 (§3.3 l. 2127–2128; §3.1 `E_STRUCTURAL` l. 2021; §3.4 l. 2509–2510)
**Claim.** §3.3 says a transient arena's batches "use this protocol unchanged, their `batch` the entity whose derivation
opened it". But `KernelTx` requires `level`, `stage` and `rederivesFrom` — the StageIds that rank kept content — and
allows `clearRegion` and `prepared`. Neither §3.3 nor §3.4 fixes these for a one-level arena that has no stages.
`E_STRUCTURAL`'s comment covers structural roles only. And §3.4 says "`mergeFaces` and `absorbSliver` never delete one
(`E_STRUCTURAL`, as for a structural role)", though `absorbSliver` answers a structural boundary by retyping the sliver
(`W_SLIVER_RETYPED`, §3.6), not with that error.
**Required change.**
1. §3.3: "…a transient arena's batches (§3.4) use this protocol with `level` 0 (its one level), `batch` `{ kind:
   'entity' }` naming the entity whose derivation opened it, `stage` and `rederivesFrom` the registered stage of the rung
   that opened it (the plan rung's registration, §2.6; no kept content exists on it), and no `clearRegion` or
   `prepared`."
2. §3.1: the `E_STRUCTURAL` comment becomes "// a merge or removal would delete an edge carrying a structural role (§2.2
   rule 7) or a transient arena's fixed edge (§3.4)".
3. §3.4: "`mergeFaces` refuses to delete one (`E_STRUCTURAL`) and `absorbSliver` never deletes one — a sliver bounded
   only by fixed edges stays a face, `W_SLIVER_RETYPED` (§3.6)".

### VK-14 — minor · stale · kernel · item 9, size by population (§3.2 (9) l. 2094–2100)
**Claim.** §3.2 (9) reads "A rung declares a frame *area* A — TOWN 4 km², CITY 25 km², METROPOLIS 64 km² … gives
`width = √(A · aspect)`", which fixes the frame by tier. Item 9 says "the actual size of the town, even within each tier
is determined by population". §1.1 (`frameAreaKm2AtTarget`: "side scales with √(population ÷ target) (§3.2, §12.2)")
and §12.2 ("Within a rung the frame area scales with population ÷ target") both scale it. §1.1 even points to §3.2 for
the scaling, which §3.2 does not state.
**Required change.** In §3.2 (9), replace "A rung declares a frame *area* A — TOWN 4 km², CITY 25 km², METROPOLIS 64 km²
(squares of 2, 5 and 8 km at the default aspect) — and the blueprint's `aspect`" with "A rung declares its frame *area*
at its target population, `frameAreaKm2AtTarget` (§1.1) — TOWN 4 km², CITY 25 km², METROPOLIS 64 km² (squares of 2, 5
and 8 km at the default aspect) — and the request's population scales it within the band, A = A_target · population ÷
target (the side with its square root; §12.2, item 9); the blueprint's `aspect`". Also replace "The range bound of (1) is
taken at the extreme aspect" with "The range bound of (1) is taken at the population cap and the extreme aspect".

### VK-15 — minor · new-problem · kernel (document checks) (§3.6 l. 2619)
**Claim.** `python3 docs/validation/bench/doc_checks.py --sections "3,Judgment calls"` now exits 1 with one unreviewed
C3 hit: "the edge s line and a". The text is §3.6's placement rule and has not changed since the archive. The hit is
corpus growth after assemble-r0's final run (873 545 3-grams against 871 603). Its 3-grams are stitched from four files:
`code-neighbourhood.md` ("the edge s", "edge s line"), `os-wards-render.md`, `code-manor.md` ("s line and"; that lane
started at 03:08 and has not landed) and `dwellings-posts.md` ("line and a"). No file holds the run whole.
**Required change.** Once `code/manor` has landed, re-run the check and add a reviewed row for each hit of this kind.
For this hit, append this row to `docs/validation/doc-checks-allow.tsv`: `C3<TAB>the edge s line and
a<TAB>amendments-b/verify-kernel-r0 (2026-09-27): corpus-growth false positive — §3.6's placement-rule text unchanged by
amendments b (present in docs/archive/ARCHITECTURE-pre-amendments-b-2026-09-26.md); its 3-grams are stitched from
code-neighbourhood.md, os-wards-render.md, code-manor.md (written 2026-09-27 after this text) and dwellings-posts.md, and
no file holds the run whole`.

### VK-16 — minor · conflict · scope · item 21 (J-A21.01's Part A entry, l. 469)
**Claim.** J-A21.01 says "The kernel seat's J-A21.31 (CGAL rejected on the stack and one-engine grounds, no longer on its
licence) stays valid on its own reasons". Under the private ruling, CGAL's licence is a reason (§17.4, D-14), so this
sentence endorses the withdrawn premise. It must follow VK-01.
**Required change.** "The kernel seat's J-A21.31, re-stated under this ruling, keeps CGAL's licence ground (§17.4's
permissive-only closure) beside its stack and one-engine grounds; its first premise, that the module would be GPL-3, is
withdrawn with that intent, and D-14's and §17.4's GPL exclusions stand unchanged."

### VK-17 — minor · conflict · scope · item 28 and 28 (f) (§13.1, the amendments-b fixtures, l. 9608–9617)
**Claim.** The fixtures assert what VK-02 and VK-03 show the kernel cannot promise as written. The re-cut fixture says
"the kept rings and the stack ring come back byte for byte, `W_ATTRACTED` and `W_PLACED` are empty for them", but a new
wall that ends on a kept ring adds a vertex to it, and attraction moves a vertex in the 25.29–26 cm band. The transient-arena
fixture checks "the seed-tiling `area2` identity after random partitions of rect, L, T … rings", but a T made of two
overlapping rects breaks the identity.
**Required change.**
1. Replace the re-cut clause with "the kept rings and the stack ring come back as the same polygons — every input vertex
   unmoved and in order, any added vertex on one of their sides — including a kept vertex split 25.3–25.9 cm from a seed
   corner in the earlier arena (the exact insertion, §3.4)".
2. In the transient-arena clause, replace "random partitions of rect, L, T and curved-quad rings" with "random
   partitions of rect, L, T and curved-quad rings, a T's two wings clipped to tile (§3.4); overlapping seed rings, and a
   fixed ring outside the seeds, refused with `E_DEGENERATE` (detail `overlap`)".

### VK-18 — minor · broken-reference · scope · item 28 (f) (§13.2 T28-14 l. 9878–9880; index row J-A28.01)
**Claim.** T28-14 says "the shell stays byte-identical through any interior re-cut — its wings, entrances, heights and
roof — which is §3.10's seed-tiling row per storey, cited rather than restated". J-A28.01's index row says "the shell bar
citing §3.10's seed-tiling row". But §3.10's row checks that the rooms tile the seed rings and that fixed edges survive.
It does not check that the wings, entrances, heights and roof are unchanged; the plan never writes them. That is §2.6's
bar ("the shell's leaf digest … is byte-identical across every re-cut") and §5.3's interior-ladder row ("the shell's
digest before and after the re-cut").
**Required change.**
1. T28-14 becomes "…its wings, entrances, heights, roof and basement — checked by the shell's leaf digest before and
   after the re-cut (§2.6's bar, §5.3's interior-ladder row), with §3.10's seed-tiling row proving the re-cut rooms tile
   that unchanged shell".
2. J-A28.01's index row: "the shell bar citing §3.10's seed-tiling row" becomes "the shell bar citing §2.6's leaf-digest
   bar and §3.10's seed-tiling row for the tiling".

### VK-19 — minor · partial · scope · items 12, 21, 28, 30 (§0.2 landing rows l. 144, 153, 160, 162; the Staged list l. 12389, 12391)
**Claim.** The landing rows and the Staged list map the kernel's clauses incompletely.
* Item 12's row names only "`corridorUnion` over `tunnel` chains in §3.7". It leaves out §3.4's and §3.10's arena
  isolation (J-A12.32).
* Item 21's row does not name §3.1, whose licence ground VK-01 restores.
* Item 28's row names §3.4 and §3.10 but not §3.3 (`ArenaKey`, `BatchScope` `entity`) or §3.8 (the `spine` reader,
  J-A28.32).
* Item 30's row names "`faceNeighbours` in §3.4", a service that already existed. It should name §3.10's nesting
  paragraph (J-A30.31) and §3.4's fixed passage ring.
* The Staged list's stage-3 row cites "the kernel's §3.4 and §3.7". The plan's kernel clauses are §3.3, §3.4, §3.8 and
  §3.10.
* The Staged list's sewers row names no kernel clause at all.

**Required change.**
1. Item 12's row: "`corridorUnion` over `tunnel` chains in §3.7" becomes "`corridorUnion` over `tunnel` chains in §3.7
   and the arenas' isolation in §3.4 and §3.10 (J-A12.31, J-A12.32)".
2. Item 21's row gains "; §3.1's skeleton row keeps CGAL's licence ground (J-A21.31)".
3. Item 28's row: "the transient arena (§3.4); the seed-tiling row (§3.10)" becomes "the transient arena and the re-cut
   (§3.4, with `ArenaKey` in §3.3); the `spine` reader (§3.8); the seed-tiling row (§3.10)".
4. Item 30's row: "`faceNeighbours` in §3.4" becomes "the nesting paragraph of §3.10 (J-A30.31) and the passage room as
   a fixed ring in §3.4".
5. Staged list, stage-3 row: "the kernel's §3.4 and §3.7" becomes "the kernel's §3.3, §3.4, §3.7, §3.8 and §3.10".
6. Staged list, sewers row: add "the kernel's arena isolation (§3.4, §3.10) and tunnel kerb (§3.7)".

### VK-20 — minor · new-problem · scope · item 28 (§14's `Kernel` façade, l. 10468–10469)
**Claim.** §14 types `plat(key: ArenaKey): Plat`. A transient arena is not a `Plat`: §3.4 says it has "no static
partitions …, no stage ranks, … no `PlatKey`", while a `Plat` carries `key: PlatKey`, five level views and static
partitions (§2.2).
**Required change.** §14: `interface Kernel { plat(key: PlatKey): Plat; view(key: ArenaKey, level: Level): LevelView /* a
transient arena has level 0 only */; resolve(ref: GeomRef, key: ArenaKey): Resolved; …`. The façade comment gains "; a
transient arena is read through `readBack` and `view`, never as a `Plat` (§3.4)".

### VK-21 — minor · partial · model · item 28 (§2.6 step 4 l. 1322–1323; the stage-3 contract l. 1226–1227)
**Claim.** Step 4 passes "its seed rings the storey's wing rings", and §2.6 rule 4 (iii) admits wings that overlap. The
kernel's arena needs seeds that tile (VK-03). The contract's `attractCm` clause covers composed rings only, although
step 1 also passes `BaseWing.ring`s.
**Required change.**
1. Step 4: "its seed rings the storey's wing rings" becomes "its seed rings the storey's wing rings clipped to tile —
   where wings overlap (rule 4 (iii)), each ring less the union of the wings before it in wing order (§3.4's seed
   contract) — and at the ground storey a spanned passage's ring (`Wing.spans`, VK-04)".
2. The contract sentence "Composed rings stand at least `attractCm` apart except where they share a joint" becomes "The
   plan's seed rings — base or composed, clipped to tile — stand at least `attractCm` apart except where they share a
   joint".

### VK-22 — minor · broken-reference · determinism · item 28 (§7.1 `moveWall` l. 6126; §5.2 F-PLAN tier 1 l. 5378)
**Claim.** `moveWall`'s comment ends "(mergeFaces then splitFace on the rung's transient arena, §3.3)", and F-PLAN's tier
1 reads "a seed vertex the rung's transient arena reports moved (`W_ATTRACTED`, `W_PLACED`; §3.3)". The transient arena,
its wall move and its insertion rules are §3.4's, not §3.3's. F-PLAN also covers seed vertices only.
**Required change.**
1. §7.1: "…transient arena, §3.3)" becomes "…transient arena, §3.4)".
2. F-PLAN tier 1, following VK-02: "a seed vertex the rung's transient arena reports moved (`W_ATTRACTED`, `W_PLACED`;
   §3.3)" becomes "a seed or fixed ring the rung's transient arena refuses (`E_DEGENERATE`, detail `seed`, `fixed` or
   `overlap`; §3.4)".

### VK-23 — minor · duplicate · determinism · item 28 (f) (§7.3's stale-click row, l. 6415)
**Claim.** The row restates §2.6's re-cut rule: "the wing rings, stair core, entrances, hearths, reserved passage cells
and basement ring fixed; partitions, corridors, doors and roles re-derived with least disruption; a room whose ring fits
a role of the new programme kept with its ring and address even when its role changes". In doing so it drops §2.6's
guard "whose wing ring is unchanged". That guard is what keeps a kept room inside the new seed rings, and §3.4's `fixed`
rings must lie inside the seeds.
**Required change.** §7.3's row: "…each step §2.6's re-cut rule (its FIXED set, its re-derived set and its kept-room
rule, stated there) — with its draws keyed by the step (§6.1); …".

### VK-24 — minor · broken-reference · rendering · item 28 (§11.1's "Per storey" bullet, l. 8793–8796; §3.8 l. 2896–2898; §2.6 `Room.lit` l. 988)
**Claim.** §3.8 names "each room's label spine and light point when the plan rung draws a storey on the building band
(§2.6, §8.5; item 28)", and §2.6's `Room.lit` reads "a light at the room's spine summit (§8.5; J-A28.32)". Nothing
consumes that light point. §8.5's building band draws "walls by kind, openings …, windows, the stair core, chimneys,
abstract furniture by room role and room labels", with no light, and §11.1's per-storey VTT scene lists
`line_of_sight` and `portals` only.
**Required change.**
1. §11.1's "Per storey (item 28)" bullet gains: "`lights` — one per lit room (`Room.lit`, §2.6) at its spine summit (§3.8's
   `spine` reader; the sampled medial axis's summit under its downgrade), `{ position, range in squares, intensity: 1,
   color, shadows: true }` as the scene-level `lights` above".
2. §3.8's pointer then reads "(§2.6, §8.5, §11.1; item 28)" (the kernel's one-word companion), and `Room.lit`'s reads
   "(§11.1; J-A28.32)".

### VK-25 — minor · stale · rendering · item 28 (f) (§12.7's plan row, l. 9371–9372)
**Claim.** The row says "since the ladder has five rows". §2.6's interior ladder has six default rows (rich,
prosperous, comfortable, modest, poor, squalid), so a re-cut chain crosses at most five band steps.
**Required change.** "since the ladder has five rows and `relet` moves one household at a time (§4.11)" becomes "since
the ladder has six rows (at most five band steps) and `relet` moves one household at a time (§4.11)".

### VK-26 — minor · stale · rendering · item 28 (§8.5's change markers, l. 7745)
**Claim.** The marker "vanishes when the click re-derives the rung by mutating the cached state (§7.3)". §6.2, §7.3 and
§2.6 rule (J-A28.71, J-A28.26) that a stale rung is re-derived from its canonical prior, which is committed state and
never the cache. The kernel's re-cut edits nothing of an earlier cut (§3.4, J-A28.33).
**Required change.** "…when the click re-derives the rung by mutating the cached state (§7.3)" becomes "…when the click
re-derives the rung from its canonical prior (§7.3; never from the cache, §6.2)".

### VK-27 — minor · stale · pipeline · item 28 (§4.1 l. 3202; II.4 l. 11264; J-A28.42's index row l. 12327 and Part A entry l. 432)
**Claim.** Three passages still say the stale rung is re-derived "by mutating the cached state": §4.1 ("until the next
click re-derives it by mutating the cached state (§7.3, item 18)"), II.4 ("the click re-derives it by mutating the cached
state (§7.3, item 18)") and J-A28.42 ("a stale one is re-derived by mutating the cached state"). This contradicts §6.2
("never takes the cache as its prior"), §7.3's stale-click row ("committed state, never the cache") and §2.6
(J-A28.26).
**Required change.** In §4.1, in II.4, and in J-A28.42's index row and Part A entry, "by mutating the cached state"
becomes "as a mutation from its canonical prior — committed state, never the cache (§6.2, §7.3)".

### VK-28 — minor · conflict · pipeline · item 12 (II.7.3's cut paragraph, l. 11580)
**Claim.** II.7.3 says "the stage writes only that arena (`E_SCOPE` otherwise)". §3.1 defines `E_SCOPE` only for a
pool overlay that writes outside its district and for two overlays that touch one record (§3.3). No kernel check ties a
batch's `key` to the arena its stage may write: §4.12's `StageDecl.outputs` is not checked when a batch opens. The
refusal II.7.3 cites therefore does not exist.
**Required change.** II.7.3: "the stage writes only that arena (`E_SCOPE` otherwise), and the ground's static index
partitions are read, never touched" becomes "the stage writes only that arena — every transaction it opens is keyed to
the underground arena (§3.4's isolation), and the reroll-isolation fixture proves the ground byte-identical (§13.2) —
and the ground's static index partitions are read, never touched".

### VK-29 — minor · broken-reference · pipeline · items 11–12 (II.7.1 l. 11464; II.6's lifecycle paragraph l. 11395–11408; cited by II.7.3, §2.7 l. 1513 and §2.8 l. 1611)
**Claim.** Two citations do not resolve to what they name.
* II.7.1 cites "(§2.2 rule 1)" for "a one-way cross-arena link by entity id". Rule 2 is the rule that states it.
* II.7.3 (the cut (1), "the condition row's `open` flag, II.6", and its lifecycle, "the condition row's `open` flag
  turns false"), §2.7's `Tunnel` ("II.6's condition table (its `open` column)") and §2.8 ("their condition reading and
  its `open` column are II.6's") cite a table that II.6 does not contain. II.6 names the states in prose only.

**Required change.**
1. II.7.1: "(§2.2 rule 1)" becomes "(§2.2 rule 2)".
2. II.6's lifecycle paragraph gains the table, from its own ladder and II.7.3's closing rule:

| condition | `existence` | `Tunnel.closure` | `open` |
|---|---|---|---|
| in use | `generated`, `built`, `altered` or `converted` | — | yes |
| neglected, silted | `abandoned` | — | yes |
| partly caved in | `decayed` | — | no |
| collapsed | `ruined` | `collapsed` | no |
| sealed (decommissioned) | `ruined` | `sealed` | no |

## 5 Notes for the repair round

* **Order.**
  * VK-01 comes before VK-16 and VK-19's item-21 clause.
  * VK-02 comes before VK-17's re-cut clause and VK-22's F-PLAN text.
  * VK-03 and VK-04 go together: VK-03 (4) names the spanned passage's ring, which VK-04 creates. VK-21 then follows
    both.
  * VK-06 needs nothing first.
  * VK-07 and VK-08 touch the same §3.4 sentence. Apply VK-08's sentence, which already carries VK-07's pointer.
* **Rulings to record.** VK-02 (exact insertion for seed and fixed rings) and VK-03 (tiling seeds, clipped by the
  caller) change J-A28.31's and J-A28.33's contracts. Record them as amendments of those entries, or as a new row
  `J-A28.34`: "exact insertion of the arena's inputs; overlapping seeds clipped by the caller; chose over attraction on
  re-insertion because a kept ring must re-enter unmoved". VK-04 resolves toward the passage room; record it in the
  model's J-A30.21 or as a new row. Each choice is vetoable.
* **Out of scope here but worth a glance.** The II.6 island paragraph (VK-05) was found while checking pointers into
  II.6. The determinism, rendering and pipeline verifiers may report VK-22 to VK-29 as well, so de-duplicate by text.

## 6 Receipts (executed 2026-09-27)

* `diff` of §3 between the archive (l. 1525–2503) and the assembled document (l. 1981–3043): 12 hunks, all inside the
  kernel blocks' anchors (§3.1 row; §3.3 ×4; §3.4 +47 and +11 lines; §3.7 ×2; §3.8 ×1; §3.10 +2 rows and +11 lines).
  §3.2, §3.5, §3.6 and §3.9 are byte-identical to the archive. Scratch copy: `scratchpad/sec3.diff`.
* `python3 docs/validation/amendments-b/refs.py docs/ARCHITECTURE.md …` printed "headings 139 D ids 35 J ids 432 broken
  2". Both broken references are external citations that were already there: `os-geometry.md` §2.1.4 at l. 2552 and
  RFC 7946 §3.1.6 at l. 8726.
* `python3 docs/validation/bench/doc_checks.py --sections "3,Judgment calls"` exits 1 with C1 5/0, C2 0/0, C3 129/1,
  C4 0/0, S1 0/0 and S2 0/0. The unreviewed hit is "the edge s line and a" at l. 2619, attributed by script (VK-15).
  Receipts: `scratchpad/dc-kernel-verify.txt` and `scratchpad/c3attrib.txt`.
* Probes, all by grep: `GPL` over the document (l. 153, 1997, 10883, 10900, 11048–11049, 11079–11080, 11808, 12364);
  `E_SCOPE` (l. 2020, 2303, 2312, 3157, 9563, 11580); `mutating the cached` (l. 3202, 7745, 11264, 12327, Part A 432);
  `interface IslandRule|SkyStrategy` (l. 11316, 11317, 11384, 11390); `W_ATTRACTED|W_PLACED` (l. 2032, 2500, 2625, 5378,
  9613, 9616); `key: PlatKey` (l. 417, 2430–2433 among others); the stale probes of §3 in `scratchpad/probes.txt`.

## 7 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (quoted text or an executed check):
* VK-01: §3.1's GPL-3 wording against §17.3, §17.4, D-14, J-A21.01 and item 21's ruling.
* VK-03 (a): the sum of `area2` over overlapping seeds exceeds the area of their union. This is arithmetic on the row's
  own "how".
* VK-05, VK-06, VK-07, VK-09, VK-11, VK-14, VK-16, VK-18, VK-19, VK-20, VK-22, VK-23, VK-25, VK-26, VK-27, VK-28, VK-29:
  the quoted texts contradict each other, or the pointer lands on a section without the content.
* VK-15: the doc-checks run and the attribution.

**PLAUSIBLE** (reasoning from the design's stated numbers and rules, not executed; the kernel does not exist yet):
* VK-02's mechanism: re-insertion inside the 25.29–26 cm band moves a vertex, by §3.2 (2) and §3.6 step 2. How often it
  happens depends on the wing shapes.
* VK-03 (b): the forced walls around an overlap.
* VK-04's reading that the plan cannot reserve a passage that lies outside its seed.
* VK-10's undetectability claim.
* VK-12, VK-13, VK-17, VK-21 and VK-24.

The recommended resolutions in VK-02, VK-03 and VK-04 are this seat's choices. They are vetoable and should be recorded
as §5 says.
