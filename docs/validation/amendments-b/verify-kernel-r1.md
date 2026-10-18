# verify-kernel-r1 — lane amendments-b/verify-kernel-r1 (VERIFY the KERNEL part, §3, after repair round 1)

> PENDING FABLE REVIEW — Opus-produced (amendments-b/verify-kernel-r1).

PROGRESS (kill-safe ledger; a seat that continues this lane reads it first)
BASE: docs/ARCHITECTURE.md sha256 365e19f2… (assemble-r1 installed; checked); rationale 50a94f2d… (checked)
READ: verify-kernel-r0 whole; assemble-r1 whole; repair-r1-kernel preamble and blocks; §3 diff r0→r1 (21 hunks) — done
ITEM 12: PRESENT | issues VK1-06, VK1-09 — done
ITEM 21: PRESENT (r0's CONFLICT resolved) | no issue — done
ITEM 28: PRESENT | issues VK1-01, VK1-03, VK1-04, VK1-05, VK1-06, VK1-07, VK1-08, VK1-10, VK1-12 — done
ITEM 28 (f): PRESENT | issues VK1-01, VK1-02, VK1-03, VK1-13 — done
ITEM 30: PRESENT | issue VK1-08 (passage clause) — done
RE-CHECK VK-01..VK-29: 29 of 29 resolved as required (table §3) — done
CHECKS: single-source, stale, cross-part, deferral wording, broken references, new problems — done (§4)
RECEIPTS: doc_checks "3,Judgment calls" exit 0; refs.py broken 2 (pre-existing external); drift model — done (§6)
SIBLINGS: de-duplicated against verify-model-r1 (V-MAB1-06/07/08) and verify-pipeline-r1 (VP1-18) — done (§5a)
STATUS: COMPLETE (2026-09-27): 14 issues — 0 blocker, 1 major, 13 minor; owners kernel 7, model 2, determinism 2, scope 2, rendering 1

## Outcome

Repair round 1 fixed every one of verify-kernel-r0's 29 issues as its required change asked: the licence blocker
(VK-01) is gone, the re-cut no longer claims byte identity under attraction (VK-02), seeds tile (VK-03), the passage is a
seed-and-fixed ring at the ground storey (VK-04), and the stale pointers, signatures and fields are corrected. Items 12,
21, 28, 28 (f) and 30 are PRESENT in §3 in the terms the route required.

One **major** new problem comes from the repair's own mechanism (VK1-01). The re-cut now inserts kept rooms by exact
topology and splits an input side only at a vertex within the 0.71 cm hot pixel of that side's straight line. But on a
one-level transient arena, §3.6's placement rule places each later cut end against the sub-edge an earlier split left,
not against the straight side. On rotated wings, those vertices drift. A model of the rule puts a vertex beyond the hot
pixel on 11 % of sides split four times (worst 1.6 cm). A kept room's corner there is refused at re-cut. The same drift
puts a T's second stem crossing off the bar's straight side in about 1 % of cases, and that refuses a valid building's
seeds. F-PLAN detects these refusals but has no tier that answers them (VK1-02).

The other twelve issues are minor:
* §2.6's re-cut list passes the wing rings and the entrances "as fixed rings" (VK1-03).
* A stair core serving the basement need not lie inside the basement ring (VK1-04).
* The stored-plan tiling check cites a §3.10 row defined only on a transient arena (VK1-05).
* Slot-only services have no arena outside a transaction (VK1-06).
* The transient batch's stage id rests on a §6.1 fact that §6.1 does not state (VK1-07).
* Three wording repairs in the kernel's own text (VK1-08 to VK1-10), and a stale "site-plan table" in §3.7 that the
  pipeline verifier found (VK1-14 = VP1-18).
* One duplicate (VK1-11) and two scope follow-ons (VK1-12, VK1-13).

**Rulings needed:** VK1-01's two mechanisms (input sides as routes; the clip taken from one overlay) and VK1-02's
repair tier are this seat's proposals. They are vetoable; record them as an amendment of J-A28.34 and a determinism row.

## 1 What was read (whole unless stated)

* `docs/AMENDMENTS-2026-09-25b.md` items 12, 21, 28 (with (f)) and 30 in their final text; `route.json`'s four kernel
  entries (home [], referencing 12, 21, 28, 30).
* `verify-kernel-r0.md` whole (this lane's r0 report); `assemble-r1.md` whole; `repair-r1-kernel.md` (preamble,
  ledger, hand-offs, cross-part notes and every block); the kernel-addressed rows of the five other repair reports
  (determinism VK-22; model VK-21 and its note to §3.4/§3.10; pipeline VK-28; rendering VK-24; scope VK-18, VK-19) and of
  the other verify-r0 reports (V-MAB-04; the scope table rows for VK-01, VK-16–VK-20).
* `docs/ARCHITECTURE.md` §3 whole (l. 2033–3128), diffed against `docs/archive/ARCHITECTURE-pre-amendments-b-repair-r1-2026-09-27.md`
  §3 (l. 1981–3043): 21 hunks, all inside the six kernel REPLACE blocks and rendering's §3.8 pointer.
* Every section that cites the changed kernel text or that the kernel cites: §2.2 rules 2, 4 and 5; §2.5 `Passage`;
  §2.6 l. 940–1489 (records, the wing-carrying rule, the carry of a stored composition, the stage-3 contract, entrances,
  basements, the plan rung's steps, the interior ladder); §3.6's attraction and placement rule; §3.9 (chunks, load);
  §4.7 S10 (9); §5.2 F-PLAN; §5.3's scope definitions, the stored-plan tiling, interior-ladder and reachability rows;
  §6.1's stream key and the stage-3 rung counters; §7.1 `moveWall`; §7.3's two plan rows; §8.5's change marker; §11.1's
  per-storey `lights`; §12.2; §12.7's plan row; §13.1's amendments-b fixtures; §13.2 T28-4, T28-10 and T28-14; §14's
  kernel package and façade; II.6's island interfaces and condition table; II.7.1–II.7.4's kernel pointers; the §0.2 rows
  12, 21, 28 and 30; the Staged list's stage-3 and sewers rows; D-14; §17.4; the index rows and Part A entries of J-A12.31,
  J-A12.32, J-A21.01, J-A21.31, J-A28.01, J-A28.31–J-A28.34, J-A30.31 and J-K5; canon.md's CANON-C03.

## 2 Per item — PRESENT, PARTIAL or MISSING in the terms the route required

| item | route's ask of §3 | verdict | the mechanism, quoted |
|---|---|---|---|
| 12 | §3.7: `bandUnion` / the corridor use on `tunnel` chains, the outer wall the plots' frontage edge | **PRESENT** | §3.7: "in the underground arena a tunnel's corridor half-width, `widthCm ÷ 2 + wallCm` — half its bore plus its wall (`Tunnel.widthCm`, II.7.2's profile row)"; "`kerb`, `corridorUnion` and `bandUnion` take the arena from the transaction's `key` (§3.3) … the band's outer ring, the tunnel's external wall, is the `kerb` edge every underground frontage plot's lines end on … No arena-specific band operation exists." §3.4's isolation now names II.7.3's surface constraint as the home; §3.10's row is a debug-build assertion plus the reroll-isolation fixture. Residue: VK1-06, VK1-09. |
| 21 | §3.1: the skeleton row's CGAL ground (the route predates the owner's 2026-09-27 ruling) | **PRESENT** (r0's CONFLICT resolved) | §3.1: "CGAL's is GPL (the rest of CGAL LGPL), which §17.4's permissive-only production closure excludes (the module's licence stays the owner's, §17.3), and it fails the stack and one-engine grounds besides". J-A21.31's index row and Part A entry and J-A21.01's sentence carry the same ruling; §17.4 and D-14 unchanged. No GPL-3 wording in §3. |
| 28 | §3.4 / §3.8 / §3.10: the plan partition's operations; a skeleton reader; rooms tile each storey's wings, outer walls on the wing rings | **PRESENT** | §3.4: "Its L0 faces are the seed rings and then the `fixed` rings, each a face of its own, inserted as exact topology … Seed rings that overlap, and a fixed ring that crosses a seed ring's side, lies outside the seeds' union or overlaps another fixed ring, are refused with `E_DEGENERATE` (detail `overlap`)"; its writers the face partitioners. §3.8's `spine` reader "(§2.6, §8.5, §11.1; item 28)". §3.10: "the rooms of each storey tile exactly the seed rings §2.6 passes … with every outer wall on a seed-ring side". Defects: VK1-01 (major), VK1-03 to VK1-08, VK1-10, VK1-12. |
| 28 (f) | the re-cut (J-A28.33) | **PRESENT** | §3.4: "A kept ring re-enters exactly on the lattice points it left with and keeps its polygon: every vertex unmoved and in order, any vertex a new wall adds lying within the hot pixel of one of its sides … the model derives the plan as a chain of least-disruption steps (§2.6's canonical chain, J-A28.26; §7.3), each step its own open, cut and read-back". Defects: VK1-01 (the acceptance claim), VK1-02, VK1-03, VK1-13. |
| 30 | §3.4 / §3.7 / §3.10: the passage representation keeps planarity and nesting | **PRESENT** | §3.10: "A passage under a building's wing (item 30) is an L3 face of kind `passage` in one parent — §2.5's `Passage`, cut by S10 along one side line of the front plot (§4.6, §4.7 S10 (9)) … the seal is `Passage.sealed`, the one bit of the passage's record (§2.5)"; §3.4's `fixed` "a spanned passage's room (item 30)", a fixed ring allowed to coincide with its seed ring, matching §2.6's `Wing.spans` ("at the ground storey the plan rung adds the span ring as a seed ring and passes it as a fixed ring"). Residue: VK1-08's paraphrase. |

## 3 The r0 issues — re-checked against the assembled text

Every r0 issue is resolved as its required change asked (or by an equivalent text that states the same thing).

| r0 id | owner | where re-checked | verdict |
|---|---|---|---|
| VK-01 | kernel | §3.1 row l. 2049; index J-A21.31 l. 12594; Part A l. 350 | resolved — licence ground restored, GPL-3 premise gone |
| VK-02 | kernel | §3.4 l. 2571–2575, 2564, 2610–2615; Part A J-A28.33, J-A28.34 | resolved as written (no attraction, typed refusal); its mechanism has the new problem VK1-01 |
| VK-03 | kernel | §3.4 seed / fixed comments l. 2562–2563, overlap test l. 2576–2585; §3.10 row l. 3108 | resolved; the clip's second-crossing case is part of VK1-01 |
| VK-04 | model | §2.6 `Wing.spans` l. 983, contract l. 1249–1258, step 1 l. 1339–1345, step 4 l. 1361–1365; T28-4 l. 10175–10179; §5.3 l. 5540 | resolved |
| VK-05 | pipeline | II.6 l. 11714, 11720 (each interface once), l. 11633–11637 (toggle only shows) | resolved |
| VK-06 | kernel | §3.10 l. 3117–3125; index J-A30.31 l. 12598; Part A l. 354 | resolved |
| VK-07 | kernel | §3.7 l. 2879–2880, 2909–2914 | resolved; the index row keeps the old half-width, VK1-09 |
| VK-08 | kernel | §3.4 l. 2548–2551 | resolved |
| VK-09 | kernel | §3.4 l. 2541; §3.10 l. 3107; Part A J-A12.32 | resolved |
| VK-10 | kernel | §3.4 l. 2541–2548; §3.10 l. 3107 | resolved; its service clause has VK1-06 |
| VK-11 | kernel | §3.4 l. 2486–2489, 2499, 2561 | resolved |
| VK-12 | kernel | §3.4 l. 2606–2617 | resolved |
| VK-13 | kernel | §3.3 l. 2181–2184; §3.1 l. 2073; §3.4 l. 2587–2589 | resolved; the stage id it names is VK1-07 |
| VK-14 | kernel | §3.2 (9) l. 2146–2154 | resolved; §12.2's restatement is VK1-11 |
| VK-15 | kernel | allow row present (1 occurrence); doc_checks "3,Judgment calls" exit 0 | resolved |
| VK-16 | scope | Part A J-A21.01 l. 469 | resolved |
| VK-17 | scope | §13.1 l. 9913–9926 | resolved |
| VK-18 | scope | T28-14 l. 10197–10200; index J-A28.01 l. 12718 | resolved |
| VK-19 | scope | §0.2 rows l. 143, 152, 159, 161; Staged l. 12765, 12767 | resolved |
| VK-20 | scope | §14 l. 10807–10809 | resolved; its "plan rung's" wording is VK1-12 |
| VK-21 | model | §2.6 l. 1251–1253, 1361–1365 | resolved |
| VK-22 | determinism | §7.1 l. 6302; F-PLAN l. 5511 | resolved; F-PLAN's missing answer is VK1-02 |
| VK-23 | determinism | §7.3 l. 6598 | resolved |
| VK-24 | rendering | §11.1 l. 9084–9086; §3.8 l. 2981; §2.6 `Room.lit` l. 988 | resolved |
| VK-25 | rendering | §12.7 l. 9676 | resolved |
| VK-26 | rendering | §8.5 l. 7996–7998 | resolved |
| VK-27 | pipeline | §4.1 l. 3282; II.4; index J-A28.42 l. 12676; no "mutating the cached" left in either file | resolved |
| VK-28 | pipeline | II.7.3 l. 11925–11926; no `E_SCOPE` in PART II | resolved |
| VK-29 | pipeline | II.7.1 l. 11808 (rule 2); II.6's condition table l. 11734 | resolved |

## 4 The checks

**SINGLE-SOURCE.** §3 states each of its mechanisms once: the transient arena, its construction and the re-cut in §3.4,
the tunnel kerb in §3.7, the `spine` reader in §3.8, and the tiling, isolation and nesting rules in §3.10. Nothing in §3
restates another part's rule: VK-08's restated surface-constraint list is now a pointer to II.7.3. Outside §3 there is
one restatement of a fact §3.2 (9) now homes. §12.2 still states the population scaling of the frame area in its own
words (VK1-11; CANON-C03 made §3.2 (9) the frames' home).

**STALE — the probes over §3.** Lots as buildings: none. Binary wealth: none. Size fixed by tier: none, since §3.2 (9)
now scales the area with population. One central market: none. The map editing the dossier: none. A proprietary licence
default: not stale, because the private default stands (item 21). Terrain and water that never change: none. Decided
alternatives written as open: none; VK-06's and VK-12's hedges are gone. Stale remnants in the kernel's own index rows
and wording:
* J-A12.31's half-width "a tunnel's bore plus wall" (VK1-09);
* "party wall" used for a wing joint, while §2.6's `Wall.kind 'party'` is the plot's party-wall edge (VK1-10);
* §3.7's "site-plan table", which item 19 folded into the designation template (VK1-14, found by the pipeline
  verifier as VP1-18).

**CROSS-PART.** Each pointer in the changed kernel text resolves to a section that states what the kernel assumes, with
these exceptions:
* §3.3's transient `stage` points to §6.1, which names no stage id for the stage-3 rungs (VK1-07).
* §3.4's "F-PLAN's tier 1 takes" a refusal, but F-PLAN has no tier that answers one (VK1-02).
* §2.6 cites §3.10's seed-tiling test for a stored plan's carried rooms, and so does §5.3 l. 5540; the kernel defines
  that test only on a transient arena (VK1-05).

The kernel's contract has also exposed two model-side mismatches:
* §2.6's re-cut FIXED list and kept-room rule (VK1-03);
* the basement storey's stair bay (VK1-04).

Each r0 cross-part note is now reflected; the table in §3 gives the detail. The repair's own notes to other parts:
* To the model: VK-21 and VK-04 are carried. The note that the kept-room rule should read the wing's seed ring is not
  carried, and is now part of VK1-03.
* To determinism: F-PLAN's detail names match.
* To scope: the §13.1 wording matches.
* To rendering: "O(seed vertices)" is kept.

**DEFERRAL-WORDING.** §3 has no "TBD", no "later" in the deferral sense (every "later" is temporal: a later batch, a
later split), no "open question" and no choice left unresolved.

**BROKEN-REFERENCE.** `refs.py` gives the same 2 broken references as before, both external: `os-geometry.md` §2.1.4 at
l. 2635 and RFC 7946 §3.1.6 at l. 9012. Every J id resolves, J-A28.34 among them. The content-level mismatch is VK1-07.

**NEW-PROBLEM.** Four problems:
* VK1-01, major: the hot-pixel split test is exact, but on a one-level arena vertices drift away from the straight input
  side.
* VK1-06: a slot-only service called outside a transaction has no arena.
* VK1-04: the tightened fixed-ring containment meets the inset basement ring.
* VK1-02: the refusal path ends in no repair.

## 5 Issues — each with its owning part and the exact required change

Line numbers are the assembled document's (`docs/ARCHITECTURE.md`, sha256 `365e19f2…`) and, for Part A, the rationale
file's (`50a94f2d…`).

### VK1-01 — major · new-problem · kernel · items 28, 28 (f) (§3.4 l. 2571–2585, 2610–2615; Part A J-A28.34 l. 487)
**Claim.** The exact construction splits an input side only at a vertex that lies within the hot pixel (0.71 cm) of
that side's straight line. A vertex farther off but closer than `minEdge` is refused. On a transient arena every vertex
has one level, so each sub-edge is its own route. §3.6's placement rule (i) therefore places each later cut end within
0.71 cm of the sub-edge an earlier split left, not of the straight side. §3.6 itself measures the same kind of drift in
a plat after successive same-level changes: ≈ 1.36 cm after two changes, ≈ 1.49 cm after three or four.

A model of the rule shows the scale of the problem on rotated sides (receipt §6). It puts at least one vertex beyond
0.71 cm of the straight side on:
* 2.5 % of sides split twice;
* 11.2 % of sides split four times;
* 22 % of sides split six times.

The worst case is 1.6 cm. Axis-aligned sides show none.

This causes two failures:
* **(a) Re-cut.** A kept room's corner on an exterior wall can be one of those vertices. When the room re-enters, the
  straight seed side is not split there, and the ring is refused (`E_DEGENERATE`, `fixed`). The paragraph says the only
  difference is a side "straightened — by at most the hot pixel". That is false both where several walls ended on the
  side and at the kept room's own corners.
* **(b) Clip.** A T's stem crosses one side of its bar twice. The overlay places the second crossing against the
  sub-edge the first one left. In 1.3 % of cases (worst 1.06 cm) it lands off the bar's straight side, although §3.4
  says such vertices "lie within the hot pixel of that ring's sides". A valid building's seeds are then refused.

**Required change.**
1. In §3.4, after "…so a planner places an anchor on a wall or at least `minEdge` from it.", insert: "**The input sides
   are the arena's routes.** Every vertex that a cut or the construction places on a fixed edge is placed by §3.6's
   placement rule against the input side that edge lies on. That side is the seed or fixed ring's side as passed, and
   no split changes it, just as a Steiner vertex on a plat's coarser route is placed against that route (§2.2 rule 3).
   It is never placed against a sub-edge an earlier split left. So every vertex on a fixed edge stands within the hot
   pixel of its input side's line, however many walls end on that side."
2. In §3.4, replace "each ring minus every ring before it in wing order, by `booleans('difference', …, 'nonzero')` on
   the arrangement (§3.7) — so the joints are shared sides: the clip moves no vertex where the rings keep §2.6's
   composition contract (at least `attractCm` apart except at their joints), and the vertices where a clipped ring
   leaves an earlier ring lie within the hot pixel of that ring's sides, which the construction splits there." with
   "the faces of one overlay of the storey's rings on the arrangement (§3.7's boolean machinery). Each face goes to the
   first ring in wing order that contains it, and each ring's faces are united. Each ring is thereby minus every ring
   before it, and every ring, an earlier one included, carries each crossing vertex the overlay placed on its sides. So
   the joints are shared sides vertex for vertex, and the overlay moves no vertex where the rings keep §2.6's
   composition contract (at least `attractCm` apart except at their joints)."
3. In the re-cut paragraph, replace "It was valid in the arena that read it back, and the only geometry beside it that
   can differ is a seed or anchor side straightened — by at most the hot pixel — where an unkept wall ended on it," with
   "Its vertices on a seed or anchor side lie within the hot pixel of that side's line (the routes above), so the
   construction splits the side at each of them. It was valid in the arena that read it back, and the only geometry
   beside it that can differ is such a side straightened — by at most the hot pixel — where an unkept wall ended on it,".
4. J-A28.34's Part A entry: before "It amends J-A28.31's insertion", insert: "Every vertex placed on a fixed edge is
   placed against the input side as passed — the input sides are the arena's routes — because same-level splits of a
   rotated side otherwise drift its later vertices beyond the hot pixel of the straight line (a model of §3.6's rule:
   one side in nine split four times, `docs/validation/bench/amendb_verify_kernel_r1_drift.out`). Overlapping wings are
   clipped as the faces of one overlay, so that an earlier ring carries the crossings too."
5. J-A28.34's index row gains "; vertices on a fixed edge placed against the input side (its route); overlapping seeds
   read from one overlay".
6. Companion: VK1-13 (§13.1, scope). §2.6 step 4's "each extent less the union of the extents before it in wing order:
   §3.4's seed contract" stays as the semantics.

### VK1-02 — minor · partial · determinism · items 28, 28 (f) (§5.2 F-PLAN l. 5511; cited by §3.4 l. 2575 and J-A28.34)
**Claim.** Tier 1 now detects "a seed or fixed ring the rung's transient arena refuses (`E_DEGENERATE`, detail `seed`,
`fixed` or `overlap`; §3.4)". But no later tier answers it. The arena refuses at the open, before any cut, so:
* tiers 2–4 (local repair, the layout re-run on the next attempt, `bisect`) re-open the same inputs;
* tiers 5–6 drop rooms, which does not remove a refused kept room or anchor.

J-A28.34 says "a refusal is typed and caught by F-PLAN", and §3.4 says F-PLAN "takes" it. A refused ring is therefore
caught and left unresolved. It can arise on correct code:
* on a re-cut, when a straightened side comes within `minEdge` of a kept room's vertex (§3.4's stated caveat, and
  VK1-01 until it is fixed);
* after item 18's mutation, when an earlier wing's change moves a later wing's clipped seed (VK1-03).

**Required change.** In F-PLAN's ladder, tier 2 begins with: "a kept room the arena refuses (detail `fixed` or
`overlap`) leaves the kept set and is cut with the rest, its address carried by §6.3's re-match where its anchor falls
in a new room, reported; a refused stair bay or chimney stack is re-placed by §2.6 step 3 on its wall or at least
`minEdge` from it on the next `attempt`; a refused seed ring (detail `seed`, or `overlap` between seeds) breaks §2.6's
composition contract and aborts the rung with its stream key, as tier 6's bug does".

### VK1-03 — minor · conflict · model · item 28 (f) (§2.6 re-cut bullet l. 1464–1470; §3.4 l. 2609–2610) — same finding as verify-model-r1's V-MAB1-06 and V-MAB1-08, and its kernel clause as V-MAB1-07's §3.4 clause
**Claim.** §2.6 says: "FIXED: the wing rings per storey, the stair core's bay, every entrance and its door, the hearths
and chimney stacks, the passage room (the span ring at the ground storey) and the basement ring — passed as `fixed`
rings to the transient arena (§3.4; J-A28.33)". Under §3.4's contract this has three faults:
* A wing ring passed as a fixed ring coincides with its seed ring, which §3.4 allows, and so becomes one face that no
  cut divides. A literal reader would make every wing uncuttable.
* The basement ring is the basement storeys' seed, not a fixed ring.
* An entrance is a vertex, not a ring.

§3.4's re-cut passes the seeds and "the rooms the ladder keeps and the anchors that never move … as `fixed` rings". In
addition, the kept-room rule reads "a room whose wing ring is unchanged". The kernel's seeds are the extents clipped in
wing order. After item 18 changes an earlier wing, a later wing's ring can be unchanged while its clipped seed changes,
and its kept room is then refused (`overlap`). The kernel repair's cross-part note (3) asked for the seed ring; the
model repair did not carry it.

**Required change.**
1. §2.6: replace "FIXED: the wing rings per storey, the stair core's bay, every entrance and its door, the hearths and
   chimney stacks, the passage room (the span ring at the ground storey) and the basement ring — passed as `fixed` rings
   to the transient arena (§3.4; J-A28.33)." with "FIXED: the shell — each storey's seed rings (the wings' extents clipped
   to tile, the span ring at the ground storey, `Basement.ring` below it), opened again as the transient arena's seeds —
   every entrance and its door, the hearths, and, passed as `fixed` rings (§3.4; J-A28.33), the stair core's bay, the
   chimney stacks, the passage room and the rooms kept below."
2. "a room whose wing ring is unchanged" becomes "a room whose wing's seed ring (its extent clipped to tile, step 4) is
   unchanged".
3. Kernel companion (§3.4): "a room is kept only in a wing whose ring is unchanged (§2.6's kept-room rule)" becomes "a
   room is kept only in a wing whose seed ring is unchanged (§2.6's kept-room rule)".

### VK1-04 — minor · new-problem · model · items 28, 29 (§2.6 Basements l. 1318–1321; step 3 l. 1356–1360; §3.4 l. 2563)
**Claim.** §3.4 now refuses a fixed ring that does not lie inside one seed ring. At a basement storey the only seed is
`Basement.ring`, which is "inset by `cellar.insetCm`" (default 60 cm) from the ground storey's wings. The stair core's
bay is "the same bay on every storey it serves", and step 3 places it by the row's `stair.placement` (`by_entrance`,
`rear`, …), often against an exterior wall. So a core that serves the basement (`basementAccess: 'core'`) can have a bay
that crosses the basement ring. The arena then refuses it (`overlap`), and T28-3's "the basement is entered by that core"
cannot hold. Nothing in §2.6 places a basement-serving core inside `Basement.ring`.

**Required change.** In §2.6 step 3, after "serves every storey of its wing, the basement by the row's
`basementAccess`", add: "— a core that serves the basement takes a bay inside `Basement.ring` as well as its wing (the
placement's candidates filtered by exact containment); where none fits, the plan joins the basement by a `trapdoor`
opening inside the ring and reports it, `Basement.access` `core` reading 'by the core where its bay fits the ring' — the
plan writes no building record (a click changes no digest, §6.2)". T28-3's clause then reads "…entered by that core,
or through a trapdoor the class row declares or the plan reports".

### VK1-05 — minor · partial · kernel · item 28 (§3.10 seed-tiling row l. 3108; cited by §2.6 carry check (4) l. 1185–1188 and §5.3 l. 5540)
**Claim.** §2.6's carry check (4), new in r1, reads "a stored plan's rooms tiling each storey's extent (the contract's
fourth rung, by §3.10's seed-tiling test)". §5.3's stored-plan row checks "no overlap, no gap (§3.10's seed-tiling row,
per storey)" batch-local on carried rings. §3.10's row is defined only on a transient arena: at its open, per batch and
at `readBack`. A stored plan's carried room rings are values in no arena. The row's own "how" (an `area2` sum plus
per-face containment) does not prove there is no overlap between free rings.

**Required change.** §3.10's seed-tiling row: add to the "how" cell "; for a stored plan's carried rooms (§2.6's carry
check (4), §5.3), the same test on a transient arena opened with the storey's carried seed rings as seeds and its rooms
as `fixed` rings: §3.4's overlap test, then the faces' `area2` sum equal to the fixed rings' (no face outside a room)",
and add "at a stored plan's carry" to the scope cell.

### VK1-06 — minor · new-problem · kernel · items 12, 28 (§3.4 l. 2499, 2544–2547; §5.3 l. 5522–5524, 5545)
**Claim.** The r1 text says the services "handed a slot alone (`kerb`, `offsetFace`, `insetRing`, `sideRuns`,
`sampleBoundary`, `faceNeighbours`) … read the open transaction's arena". A stage-end invariant runs "once when a stage
… completes", after its batches have committed, with no transaction open. §5.3's reachability walk, which "uses
`faceNeighbours`, §3.4", is stage-end on S10, and S10 also runs on the underground arena (II.7.3). There `faceNeighbours`
has no arena to read, and the debug assertion has no key to compare.

**Required change.**
1. In §3.4's service list, `faceNeighbours(face, level)` becomes `faceNeighbours(key: ArenaKey, face, level)`.
2. In the arenas paragraph, the parenthesis becomes "(`kerb`, `offsetFace`, `insetRing`, `sideRuns`, `sampleBoundary`,
   which read the open transaction's arena and are called only inside one)", and "the `key` argument otherwise" stays.

### VK1-07 — minor · broken-reference · determinism · item 28 (§3.3 l. 2182–2183 → §6.1 l. 5636–5670, 5725–5736)
**Claim.** §3.3 fixes a transient arena's `stage` and `rederivesFrom` as "the stage id under which the opening rung draws
its streams (§6.1)". Every stream key carries a stage id (u16), but §6.1 names none for the stage-3 rungs: not for
`plan.*`, and not for the composition's concerns. Its only reserved id is `STAGE_VIEW`. So the rungs' stream keys lack
a component, and the kernel's field points to a fact nobody states.

**Required change.** In §6.1's stage-3 rungs paragraph, after "…in that order from the coarsest.", add: "Their streams —
`plan.*` and the composition's concerns — carry S11's stage id, the stage that made the building (§4.7; the underground
stage's S11 run for an underground building, II.7.3), which a transient arena's batches also carry (§3.3)."

### VK1-08 — minor · partial · kernel · items 28, 30 (§3.10 seed-tiling row l. 3108) — same finding as verify-model-r1's V-MAB1-07 §3.10 clause; this wording adds the basement ring
**Claim.** The row paraphrases what §2.6 passes: "the wings that stand at its level, clipped to tile, plus a spanned
passage's ring on the ground storey". §2.6 step 4 passes the **extents** of the wings that reach the storey, which above
the ground are the ring ∪ the span ring. It also passes `Basement.ring` below the ground. So the paraphrase leaves out
the rooms over a passage and every basement storey.

**Required change.** "the wings that stand at its level, clipped to tile, plus a spanned passage's ring on the ground
storey" becomes "the extents of the wings that reach it (a wing's ring and, above the ground, its ring ∪ its span ring),
clipped to tile, plus each spanned passage's span ring on the ground storey, or the basement ring below the ground
(§2.6's step 4)".

### VK1-09 — minor · stale · kernel · item 12 (index J-A12.31 l. 12592; Part A l. 348)
**Claim.** VK-07 corrected §3.7 to the half-width "`widthCm ÷ 2 + wallCm` — half its bore plus its wall". J-A12.31's
index row still reads "the half-width read from the chain's linear entity — a tunnel's bore plus wall". Its Part A entry
reads "the half-width of a bounding chain read from the entity … a tunnel's bore plus its wall below it". Both give the
half-width as a full bore plus a wall.

**Required change.**
1. The index row: "— a tunnel's bore plus wall —" becomes "— half a tunnel's bore plus its wall (`widthCm ÷ 2 + wallCm`)
   —".
2. The Part A entry: "a tunnel's bore plus its wall below it" becomes "half a tunnel's bore plus its wall below it
   (`widthCm ÷ 2 + wallCm`, II.7.2)".

### VK1-10 — minor · stale · kernel · item 28 (§3.4 l. 2563, 2572–2573)
**Claim.** The r1 text twice calls the joint between two wings a "party wall":
* "a side two rings share is one edge (the party wall between two wings)";
* "(a room never spans a party wall)".

In §2.6 a `party` wall is "on the plot's party-wall edge", the wall between two buildings (`Wall.kind`, and §2.2's
`party_wall` role). A plan reading `readBack`'s joint edges could then type an interior joint as `party`.

In addition, the `fixed` rings' orientation is not stated, although the overlap test counts containment by the winding
walk. The seeds are stated counter-clockwise.

**Required change.**
1. "(the party wall between two wings)" becomes "(the wall at the joint between two wings — an interior wall of the
   building, never a `party` wall, §2.6)".
2. "(a room never spans a party wall)" becomes "(a room never spans a joint between wings)".
3. The `fixed` comment begins "world lattice rings, counter-clockwise — faces made before any cut …".

### VK1-11 — minor · duplicate · rendering · item 9 (VK-14's follow-on) (§12.2 l. 9340)
**Claim.** §3.2 (9) now states the frame's population scaling, "A = A_target · population ÷ target (the side with its
square root; §12.2, item 9)". CANON-C03 made §3.2 (9) the frames' home. §12.2 still states the rule on its own: "Within
a rung the frame area scales with population ÷ target (the side with its square root)."

**Required change.** In §12.2, that sentence becomes "Within a rung the frame scales with the requested population
(§3.2 (9))." The cap figures that follow stay; they already cite §3.2 (1).

### VK1-12 — minor · partial · scope · item 28 (§14 l. 10717, 10808)
**Claim.** §3.4 opens transient arenas for "the composition rungs — a stage-3 `compose()` and the plan's storeys", as
J-A28.31 records ("rooms and composed rings"). §14's package line and façade comment name them only as "the transient
arenas of the plan rung" and "the plan rung's transient arenas".

**Required change.**
1. At l. 10717, "the transient arenas of the plan rung" becomes "the composition rungs' transient arenas (a stage-3
   `compose()` and the plan rung's storeys)".
2. At l. 10808, "the plan rung's transient arenas" becomes "the composition rungs' transient arenas (§3.4)".

### VK1-13 — minor · partial · scope · item 28 (f) (§13.1 l. 9913–9926)
**Claim.** The amendments-b fixtures cover a kept vertex split 25.3–25.9 cm from a seed corner and random partitions of
rect, L, T and curved-quad rings. They do not cover the drifted cases VK1-01 turns on:
* a rotated side split by several unkept walls before a kept room's corners were placed on it;
* a T whose stem crosses one side of its bar twice.

As a result, neither the routes rule nor the one-overlay clip would be proven.

**Required change.** In the re-cut clause, after "…from a seed corner in the earlier arena (the exact insertion, §3.4)",
insert: "and a kept room on a rotated rect wing whose side four unkept walls split before its corners — every corner
within the hot pixel of the straight side (the input sides as routes, §3.4) and the ring accepted". In the transient-arena
clause, "a T's two wings clipped to tile (§3.4)" becomes "a T's two wings clipped to tile as the faces of one overlay,
rotated, with the stem crossing one side of the bar twice (§3.4)".

### VK1-14 — minor · stale · kernel · item 19 (§3.7 l. 2940) — found by verify-pipeline-r1 (VP1-18); confirmed here
**Claim.** §3.7's M0 bar says S11's row is the geometry share plus "S11's rule evaluation (site-plan table, heights,
materials, entrance)". Item 19 folded the site-plan table into the designation template: J-A19.41 records "folding in
the site-plan table". The term survives nowhere else in the document (grep: l. 2940 only).

**Required change.** §3.7: "S11's rule evaluation (site-plan table, heights, materials, entrance)" becomes "S11's rule
evaluation (the designation template, heights, materials, entrance)". This is VP1-18's text.

## 5a De-duplication with the sibling verify-r1 reports (read 07:31–07:36)

* **verify-model-r1.** Three of its findings overlap this report:
  * V-MAB1-06 (the kept-room rule reads the wing ring) and V-MAB1-08 (the FIXED list passes seeds as fixed rings) are
    VK1-03's two halves.
  * V-MAB1-07 is VK1-03's kernel clause (§3.4's kept-room sentence) and VK1-08 (§3.10's paraphrase).

  The wordings agree. VK1-03 (1) also keeps the hearths and the entrances out of the fixed rings, and VK1-08 adds the
  basement storeys. Apply one text per sentence.
* **verify-pipeline-r1.** VP1-18 is VK1-14 and is carried here so that the kernel's repair list is complete.
* **verify-determinism-r1.** No finding overlaps. Its VK-22 row (FIXED) checks only the detail names. VK1-02, the
  missing repair tier, and VK1-07, the stage id, are new.

## 6 Receipts (executed 2026-09-27)

* **Hashes.** `docs/ARCHITECTURE.md` sha256 `365e19f24743c88a…` and `docs/ARCHITECTURE-RATIONALE.md` `50a94f2d6fca8b86…`,
  equal to assemble-r1's installed values.
* **§3 diff** between the pre-repair archive (l. 1981–3043) and the live §3 (l. 2033–3128): 21 hunks, all in the blocks
  of `repair-r1-kernel.md` (§3.1 ×3, §3.2 (9), §3.3 ×1, §3.4 ×9, §3.7 ×4, §3.10 ×2) and rendering's §3.8 pointer.
  Scratch copy: `scratchpad/vk1/sec3-r1.diff`.
* **Document checks.** `python3 docs/validation/bench/doc_checks.py --sections "3,Judgment calls"` → C1 5/0, C2 0/0,
  C3 159/0, C4 0/0, S1 0/0, S2 0/0, **exit 0** (9 626 JSON files, 911 940 3-grams). The VK-15 row is present once.
* **References.** `python3 docs/validation/amendments-b/refs.py docs/ARCHITECTURE.md …` → headings 139, D ids 35, J ids
  459, **broken 2**: `os-geometry.md` §2.1.4 (l. 2635, external) and RFC 7946 §3.1.6 (l. 9012), both pre-existing.
* **Drift model (VK1-01).** `docs/validation/bench/amendb_verify_kernel_r1_drift.py` → `.out` (stdlib, fixed seed; run
  twice, byte-identical). It models §3.6's placement as the nearest lattice point to the exact point on the current
  sub-edge. It measures:
  * rotated sides with 1 / 2 / 3 / 4 / 6 splits: 0 % / 2.5 % / 6.6 % / 11.2 % / 22.0 % of sides with a vertex beyond
    0.71 cm of the straight side (worst 0.70 / 1.21 / 1.55 / 1.41 / 1.60 cm);
  * axis-aligned sides: 0;
  * a T's second crossing: 1.32 % beyond 0.71 cm (worst 1.06 cm).
* **Probes** (grep):
  * "mutating the cached": 0 hits in either file;
  * `E_SCOPE` in PART II: 0;
  * `interface IslandRule|SkyStrategy`: one of each;
  * "T28-4" carries the span-ring clause;
  * the `lights` per storey are in §11.1;
  * "five rows" is gone from §12.7;
  * `wallCm` appears at l. 2879, 11844 and 12003;
  * `CGAL` appears at l. 2049, 11415 and 12156, plus the J-A21.31 row;
  * no "TBD" or "open question" in §3.

## 7 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (quoted text or an executed check):
* the r0 re-check table (§3);
* the item verdicts;
* VK1-03, VK1-05, VK1-06, VK1-07, VK1-08, VK1-09, VK1-10, VK1-11, VK1-12, VK1-13 and VK1-14, where the quoted texts disagree or
  a pointer lands on a section without the content;
* VK1-02's gap, since the F-PLAN row names no tier that answers a refusal;
* the document checks and the resolver;
* the drift figures, as outputs of the model.

**PLAUSIBLE** (reasoning, since the kernel does not exist yet):
* That the real placement rule drifts as the model does. The model uses the nearest lattice point, which §3.6 says
  qualifies "almost always", and §3.6's own J-K32 measurements show drift of the same size.
* VK1-01's rates in real plans, which depend on how many walls end on a wing's side.
* VK1-04's frequency.

The mechanisms proposed in VK1-01 and VK1-02 are this seat's choices. They are vetoable and should be recorded as the
Outcome says.
