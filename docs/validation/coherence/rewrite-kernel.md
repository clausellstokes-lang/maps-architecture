# Coherence rewrite — base part §3 geometry kernel (coherence/rewrite-kernel)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-kernel; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/rewrite-kernel`, 2026-09-29)
- P1 inputs read (§3 whole, lines 2452–3679 of docs/ARCHITECTURE.md md5 01fea21f; inventory-kernel; canon kernel section, rulings DXC/KIC/KXC, E-12–E-15, W-SET-01, g item 110, f items 202/245/279/510/560/575 whole; edges.md kernel; owner docs): done
- P2 new text `docs/validation/coherence/new/base/kernel/01-geometry-kernel.md` (one top-level section, heading line unchanged): done
- P3 mapping table (403 of 403 inventory ids): done
- P4 report sections: done
- P5 results JSON + LANDED: done

## Outcome

One file replaces the base's `## §3 Geometry kernel` whole: `docs/validation/coherence/new/base/kernel/01-geometry-kernel.md`
(md5 99cb2e2eb8b51b5f74ac5a5d21350526 at landing; result saved to `docs/validation/coherence/results/coherence_rewrite-kernel.json`). Subsections 3.1–3.10 keep their numbers; **§3.11 "The kernel at its limits" is new**
(the edge table of principle (11)). Every one of the 403 inventory ids is mapped below (none missing). All 15 conflicts
routed here are resolved as ruled; the kernel parts of f items 245, 279 and 575 and of g item 110 are applied; f items
202, 510 and 560 carry no kernel part (their routing matched a volume's "§3.x", recorded below); the 9 wiring gaps, 4
elegance rulings, 38 edges (23 UNDEFINED, 15 UNTESTED) and 77 open findings routed here are closed at their homes, with
the other units' halves in the cross-part notes. CONFIRMED: sizes, the token check (every number, identifier and
section reference of the old text present in the new unless listed as moved or removed below), code-fence balance and
§-reference resolution were executed on the files; the per-source split of removed words is PLAUSIBLE (estimated).

## Sizes (principle (9))

| measure | before | after | change |
|---|---|---|---|
| words (`wc -w`) | 23 820 | 25 103 | +1 283 (+5.4 %) |
| bytes / KiB | 144 634 / 141.2 | 152 950 / 149.4 | +8 316 |

Per subsection (words, before → after): intro 105 → 103; 3.1 1 353 → 1 508; 3.2 1 883 → 1 941; 3.3 5 379 → 5 436; 3.4 5
084 → 5 232; 3.5 500 → 377; 3.6 3 823 → 3 806; 3.7 2 022 → 2 163; 3.8 1 101 → 1 152; 3.9 853 → 914; 3.10 1 717 → 1 694;
3.11 (new) 777.

**Words removed, by source** (≈ 1 245 in all; PLAUSIBLE split): restatement ≈ 800 (the lattice values → §2.2
`LatticeSpec`; the class-floor values → §4.7; rung areas and cap figures → §1.1, §12.2; raster extension and cells →
§2.3; step (0), copy and merge figures → §12.4, §12.8; the fixed-ring lists and storey extents → §2.6; passage
construction and seal → §2.5, §4.6, §4.7; recordCheck's record lists → §7.4, §2.6; the roof cache key → §8.1 (5);
`ridgeAxis` → §2.6; the GeoJSON antenna rule → §11.1; the rotation → §7.1; reproducibility → §6.5; the lint → §6.5;
street trees → §2.7, §4.9; the wood edge → §4.9, §8.10; CGAL's grounds in full → J-A21.31); duplicated mechanisms
≈ 320 (E-13's scattered E_DEGENERATE vocabulary and twice-stated contracts; E-14's rebuild threshold, placement bound,
moves-keep-nothing and §3.5's restating table; E-15's binary angle; the transient batch fields, absorbSliver and
kept-content duplicates); verbose prose ≈ 150; narration ≈ 10 ("the engineering judge computed").

**Words added, all mandated** (≈ 2 530): §3.11's edge table 777 (measured); the E_DEGENERATE detail table 197
(measured, E-13; replaces a ≈ 110-word comment); each warning's producer and readers 114 (measured; KWG-01/02,
KXC-05); `KernelTx.expect`/`onFail` semantics 110 (measured) plus the `expect` comment ≈ 60 (W-FLD-01, major);
KernelError readers ≈ 110 (KWG-04); commit-record readers and the undo-record sentence ≈ 80 (W-FLD-02); g item 110's
raised parts and feet ≈ 260 (§3.4, §3.6, §3.7, §3.10); the frame law and its margin (item 279) and the never-shrink /
no-op / law-change cases of frame growth ≈ 110 (EI-007); edge definitions in place ≈ 700 (buffer joins and ends
EI-001, skeleton preconditions EI-002/EI-008, hexLattice EI-003, the spine-less kerb EI-004, empty seeds EI-005,
sampleProfile EI-006, insetRing at 0 and below 0, a mandatory chain's collapse, a one-point cut, the corrupt chunk, the
empty arena, the skeleton's lifecycle); the knot door of items 245/575 ≈ 45.

**Why the part does not reach the 25–40 % band** (not a defect, principle (9)): the consistency pass already removed
§3's restatements and history clauses (rationale Part A B., "History clauses dropped"); what remains is mechanism,
numeric argument, receipt, fallback and decision text with one home each, which the guard forbids thinning; and this
pass had to add ≈ 2 530 words of mandated wiring, rulings, owner-item design and edge outcomes. Net of those additions
the existing text shrank by ≈ 5.2 %.

## Elegance rulings applied (equivalence lists ticked)

* **E-12 KEEP APART** — no change: `E_LOCKED` fails the op (§3.1), `clearFiner` returns `Conflict[]` and clears the
  rest (§3.4, §3.3's clear rule), a warp holds the vertex with a zero field and succeeds (§3.6's held set). ✓
* **E-13 UNIFY** — one detail table under `KernelError` (§3.1): detail → op → when; each contract once at its op.
  Equivalence: ✓ `stretch` (removeEdges, retypeEdges; contract §3.4 Stretches) ✓ `seed`, `fixed`, `overlap`
  (transientArena, tileRings; contract §3.4's opening and seed clip) ✓ `fit` (regularFit; §3.4 regular fit) ✓
  `collinear` (obb, hull, lir; the GEO-7 contract on §3.4's `obb` line) ✓ `empty` (booleans, buffer, insetRing; §3.7)
  ✓ `collapsed` (insetRing with the last non-empty distance; §3.7 Insets) ✓ each op's contract text once (the §3.1
  table rows now point to §3.4). Additions (edge definitions, not unification): `ratio` for `ratio()` (the old text
  gave that case no detail), `empty` for offsetFace and a mandatory chain's collapse, `seed` for an empty seed list.
* **E-14 UNIFY** — ✓ max(256, ¼ of static size) once, at §3.3 rebuild moment (2) (pool step 1 cites it) ✓ the
  placement bound once, §3.10's row (§3.3's route box cites §3.6/J-K32; §3.6 cites §3.10) ✓ "a move keeps nothing"
  once, §3.6 (J-K27; §3.3's KernelTx comment, kept-content bullet and §3.10's kept-content row cite it) ✓ §3.5 a
  traceability table of pointers, every creator failure kept with its answer's home ✓ every value kept once.
* **E-15 UNIFY** — the 16-bit binary angle removed from §3.2 (3); centidegrees (`Cdeg`, §2.1) the one angle unit. ✓
  every angle the kernel reads is in Cdeg (`minFaceAngleCdeg`, `raysCdeg`, `turnTolCdeg`, `minAngleCdeg`, `phaseCdeg`,
  growth headings).

## File f and file g items applied

| item | kernel part | where |
|---|---|---|
| 279 (BCR-V7-30) | the frame rule reads the rung's `frameLaw`: `base` A = A_target · population ÷ target; `territory` V07 §3.2 (1)'s land law with its floor; frame growth reads the same law; `Frame.marginShare` typed number (0.3 base, `territory.marginShare` territory) so the village arena's margin agrees with V07 §3.2 (1) | §3.2 (9), §3.2 Frame |
| 245 (RetainingWall.state) | the state profile's writers put a knot on an existing vertex by `splitThrough` landing on it and drop one by `removeEdges` on its `VertexRef` (the doors); `sampleProfile` reads a closed wall's profile cyclically and a step profile's categorical values as strings; carry by lattice point unchanged (§3.10) | §3.4 code block and *The doors* |
| 575 (Enceinte.condition) | the same doors for `wall_state_knot` | §3.4 *The doors* |
| 202, 510, 560 | none: the routing matched "§3.x" of a volume or of the item's quoted text (202: V6 §3.2, V07 §3.12, V08 §3.5; 510: V11 §3.11–§3.13, §3.1; 560: V04 §3.5.1, V11 §3.23.8); no kernel text is named or touched by them | — |
| g 110 (b) | ground parts from 1: each raised way on its own `ground` part ≥ 1, allocated once, never reused; crosses part-0 ways without a junction; piers are part-0 footprints; its two feet join part 0 by record (one vertex per part), re-placed on re-derivation; the parts share no topology; frame growth, bands, warp and invariants cover them | §3.4, §3.2 (9), §3.6 held set (3), §3.7, §3.10 |

## Conflicts resolved (15)

DXC-01 = KXC-01 (E_OUT_OF_RANGE's two uses, §3.1; §3.6 chain classes); DXC-02 = KXC-04 (§3.8 names F-SKELETON; the
four post-conditions stated there); DXC-06 = KXC-02 (class floors homed at §4.7's row; §3.2 (2) keeps the kind rule;
§3.10 cites); KIC-01 (anchor-key uniqueness rests on the allocation rule and §13.1's permuted-ops fixture); KIC-02 (the
transient arena's services stated once; `resolve` PlatKey-only; ArenaKey accepted by pointLocate, faceNeighbours,
§14's view); KIC-03 (a warp batch's level = its fromLevel, the level governs); KIC-04 (a smoothing warp holds every
kernel-pinned vertex; a user warp moves them unless held); KIC-05 (corridorUnion comment: kept content nested in the L2
face); KIC-06 (§3.2 (6): simple or retracing only declared antennae); KIC-07 (§3.2 (1) restricted to points entering an
arena); KIC-08 (§3.9: each L2–L4 partition is one chunk); KXC-03 (§3.3 states the clear rule and cites §7.2). KXC-05 is
determinism's (§5.4); the kernel side (the complete code list, W_DOWNGRADE's producer) is in §3.1.

## Wiring gaps closed

W-FLD-01 = KWG-03 (`expect` filled from `StageDecl.invariants` of scope batch and the class floors; checked at commit;
codes; `onFail` = §5.1 tiers 1/2/4; edits use `reject`); W-FLD-02 = KWG-05 (`owners`, `roles` → §6.2 entity leaves and
§8.1 dirty set; `work` and the four counts → §13.2's cost-model O(touched) check); KWG-01 (W_STEINER removed: no
producer, no reader in the set; ruling of this editor under J122, vetoable); KWG-02 (§3.6 steps 1–3 emit W_ATTRACTED);
KWG-04 (readers bracketed in §3.1; §5.2 half in the notes); KWG-06 → W-SET-01 (§3.3 cites `index.gridCellM`; V11 row in
the notes); KWG-07 (hexLattice's caller §4.2 S3 (3) named; hull, area2Big marked internal; sampleBoundary's callers
named; pipeline half in the notes); KWG-09 → E-15; W-SET-01 (kernel half done). KWG-08 is scope's (note).

## Edges (principle (11)) — all 38 closed

Each is defined in place and indexed in §3.11 (outcome, tier; the fixture a case of §13.1's constructive set, listed in
the scope note): §3.1 E1/E2/E4 (UNTESTED) and E3/E5/E8 (UNDEFINED) → §3.11 rows 1–5 and 8; §3.3 E4 → §3.11 row 4 and
§3.3 (empty transaction); §3.4 E6/E7 → §3.11 rows 6–7; §3.5 E1–E4, E6 (UNTESTED), E8 → §3.5's opening line (each answer's edges are at the home it points to and in §3.11) and §3.11; §3.6 E1–E5, E7, E8 (UNTESTED), E6 → §3.6 (mandatory collapse, merge
reporting, held raised feet) and §3.11; §3.7 E6/E7 → §3.11 rows 6–7; §3.8 E6/E8 → §3.8 decision (lifecycle) and §3.11;
§3.9 E4/E5 → §3.9 (outer-ring-only arena; corrupt chunk → replay) and §3.11; §3.10 E5 → the stored-references row's
failure handling; EI-001 buffer miter/flat → §3.7; EI-002 sub-5° corner → §3.8 (downgrade, no cleaning reshapes a roof);
EI-003 hexLattice → §3.4; EI-004 spine-less kerb → §3.7; EI-005 empty seeds / no rings → §3.4; EI-006 sampleProfile →
§3.4; EI-007 frame at the same size → §3.2 (9); EI-008 touching holes → §3.8 (downgrade). No crash, hang, lost data,
silent wrong result or whole-map retry remains.

## Open findings routed here (77) — all FIXED

KERNEL-RESTATEMENTS-001…027: pointers written as the mapping table records (027: the list stays — no §4 text lists the
stages that read booleans; it is the fallback's only statement). KERNEL-INTERNALDUPLICATIONS-001…010: one statement
each (E-13, E-14; 008 → the doors' home is §3.4, model note). KIC-01…08, KXC-01…05: as above. KEL-01…06: E-12…E-15.
KERNEL-EDGESOBSERVED-001…008: as EI-001…008 above. KWG-01…09: as above. KBR-01 (KIC-01), KBR-02 (§3.3 cites §7.2),
KBR-03 (§2.6's re-cut bullet, J-A28.26), KBR-04 (§8.10).

## Renumberings and retired terms

No existing subsection number changed; §3.11 added. The `Warning` union drops `W_STEINER` (11 codes). G-lot: "the lot
cut's one bend" → "the plot cut's one bend" (0 hits left). G-binaryangle: removed. No id collision in this part.

## Cross-part notes (what another unit must change; their files not edited here)

**model (§2)**
1. §2.2 rule 4 restates §3.4's doors: reduce it to a pointer ("the doors: §3.4") (INTERNALDUPLICATIONS-008).
2. §2.2 rule 6: keep "is §3.3's" — §3.3 now states the clear rule and cites §7.2 for locks and pins (KXC-03).
3. §2.2 `PlatKey`: ground parts ≥ 1 = one arena per raised way (g item 110 (b); item 244), each number allocated once
   and never reused, with its document counter beside `nextUndergroundPart` (§2.9); §3.4 cites "§2.2's `PlatKey`" for it.
4. §2.2 rule 1: a raised ground part's outer ring is the frame with its margin, its `margin` rows on its own record (the
   raised way's), and its level mapping — §3.2 (9)'s frame growth and §3.7's bands read it.
5. §2.2 rule 2 and rule 7, §2.7 `RaisedWayRecord` (item 244): a raised way's two feet — where its ramps or stairs meet
   part 0 — are ends `{ part; at }` naming one vertex in each part by an indexed vertex role (as `link_end`), so
   §3.4's join exception and §3.10's stored-references row resolve them; item 244's record has no feet field today.
6. §2.2 rule 5 and §2.7 (items 245 and 575): a state-profile writer adds a knot on an existing vertex by `splitThrough`
   landing on it and drops one by `removeEdges` on its `VertexRef` (§3.4's doors), renumbering the knots in chain order
   within the same batch (strip and re-add) so §3.10's ordinal-order check holds.
7. §2.1: `Cdeg` is the one angle unit (E-15); no 16-bit binary angle anywhere.
8. §2.6: now the only home of `ridgeAxis`'s rect/quad definition (with `BaseWing.corners`), of the fixed-ring lists of
   the stage-3 contract and the re-cut rule (a composer's room less any bay or stack it holds), and of the storey seed
   extents (plan rung steps 1, 4 and 6: wings reaching the storey with their spans at level ≥ 1, the ground storey's
   span ring, `Basement.ring`) — §3.4 and §3.10 cite them.
9. §2.2 `LatticeSpec`: the values' home (`minEdgeCm` 25, `attractCm` 26, `minFaceAngleCdeg` 500); §3.2 (2) gives their
   meaning.

**pipeline (§4, II)**
10. §4.7 gains the class-floor row (KXC-02 = DXC-06): `minPlotWidth` 2.5 m, `minInteriorAnglePlot` 12° (with "FTG's
    sheared quads at p95 22.9° corner deviation stay legal — invariants police validity, not regularity"), `minCorridor`
    per way class = the smallest corridor width S9's width row gives that class; read by each stage's
    `KernelTx.expect` (§3.3) and by §3.10.
11. KWG-07: §4.2 S3 (3) names `hexLattice` for S4's candidate lattice; §4.7 S11 names `offsetFace` for per-edge
    setbacks. `hexLattice`'s spacing and jitter cells must hold spacing ≥ `minEdge` and jitter < spacing ÷ 2 (§3.4).
12. §4.3/§4.6/§4.11 (raised ways): part-0 stages read a raised part only through the services; a raised way's
    re-derivation re-places its feet by one transaction per part (§3.4); a part-0 warp holds its feet (§3.6).
13. KERNEL-RESTATEMENTS-027: §4 has no list of the stages that read booleans, buffers, insets or bands; §3.7's M0
    fallback keeps the list as its only statement.

**determinism (§5–§7)**
14. §5.2 F-NUM keeps `E_OUT_OF_RANGE` and cites §3.1 (DXC-01).
15. §5.2 F-SKELETON's detection cites "§3.8's four post-conditions" and adds "or an input §3.8's numeric contract
    refuses (a corner sharper than 5°, a hole touching the outer ring or another hole)" (DXC-02 + EI-002/EI-008).
16. §5.4 `kernel.warnings`: "a count per Warning code of §3.1" (11 codes: `W_STEINER` removed by KWG-01);
    `kernel.downgrades` counts `W_DOWNGRADE` (DXC-03).
17. §5.2 detection columns name the codes (KWG-04): F-CUT `E_NOT_TWO_CROSSINGS`, `E_HOLE_CONTACT`,
    `E_BELOW_MIN_WIDTH`/`_AREA`/`_ANGLE`; F-CORRIDOR and F-PLOT the class-floor codes; F-OUTLINE `E_SELF_INTERSECT`;
    F-ROUTE and F-RIVER `E_NO_PATH`; F-WORK `E_WORK_LIMIT`; an inset caller's `E_NON_CONVEX` → `offsetFace` or a buffer
    union (§3.7). F-PLOT, F-CORRIDOR and §5.3's class-floor row cite §4.7's row without values (DXC-06).
18. §5.3 declares the `Invariant` type (it is used by `KernelTx.expect` and `StageDecl.invariants` and declared
    nowhere): at least name, scope (`batch`|`stage`|`save`|`ci`), class (hard/soft) and its check; §5.1 states that
    `onFail`'s `reject`/`repair`/`downgrade` are its tiers 1/2/4 (§3.3; W-FLD-01).
19. §5.1 states E-GEN-1 once (every stage commits through transactions; a degenerate result is refused by the kernel
    and taken by the stage's failure class on its ladder), which §3.11 relies on.
20. §5.2 F-REDERIVE's detection includes §3.10's stored-references failure after an edit.
21. §7.1: a mandatory stroke that collapses below one edge is reported by the dry run as empty (§3.6 step 1); the
    rotation sentence stays §7.1's home.
22. §7.4 cites §3.3 for what an undo record keeps of `promoted`, `demoted` and `unflagged`.
23. W-SET-01 naming agrees across units: the base settings row's cells `reroll.maxAdvance`, `crossing.searchBandM` and
    `index.gridCellM`.
24. §6.2's per-arena `plats` node covers every raised ground part (§3.4).

**rendering (§8, §9, §11, §12)**
25. §8.1 (5) is the only home of the roof cache key ((entity, content revision, roof construction), never by id alone;
    a `setAttr` on floors or a re-fitted footprint changes the revision; LC-23, N-19).
26. §11.1: "emitted without antennae" is the rule's home (KERNEL-0265); its pointer "(§3.6)" becomes "(an antenna:
    §3.6 rule 3)" so the two sections do not point at each other.
27. §12.4's S10 (0) and merge rows and §12.8 are the homes of the step (0) rebuild (≈ 9 000 items, ≈ 2.3 ms at CITY)
    and of the per-copy size and time (≤ ≈ 15 MB, ≈ 1.5 ms; ≈ 20 MB after edits); §3.3 cites them and keeps the
    METROPOLIS ≈ 5.8 ms, the ≈ 26 partitions and the three-copy ≈ 4.6 ms receipt.

**scope (§13–§16)**
28. §13.1's constructive set gains §3.11's cases: empty query, `hexLattice` of an empty region and its argument
    asserts, `tileRings([])`, Poisson on an empty domain, Delaunay of < 3 or collinear sites, empty results of
    `booleans`/`buffer`/`offsetFace`/`insetRing` (`empty`), `transientArena` with no seed ring (`seed`), a transaction
    with no op (version kept), `sampleProfile` of a no-edge chain ([]), a mandatory chain collapsing (`E_DEGENERATE
    empty`) and an optional one (`E_BELOW_MIN_EDGE`), `obb`/`hull`/`lir` and `regularFit` below 3 points, a one-point cut
    and one with both ends on one vertex (`E_NOT_TWO_CROSSINGS`), a one-knot ring profile, a spine-less face (`kerb(F) =
    F`, one block), `buffer` with `miter` and `square` joins and `flat` ends, `insetRing` at 0 and below 0 (and
    `E_NON_CONVEX` on a non-convex face), a skeleton input with a corner sharper than 5° or a touching hole (reader's
    downgrade, `W_DOWNGRADE`), a stale-slot assertion, a corrupt snapshot chunk (replay), an arena holding only its outer
    ring (round trip), a frame growth whose target frame is not larger (nothing runs) and a village → town fold (frame
    kept, arena by the new margin), a part-0 warp under a raised way (feet held), and a raised way crossing part-0 ways
    (no junction).
29. §13.2's cost-model test adds, per commit, `work` and `edgesAdded`/`edgesRemoved`/`steinerAdded`/`steinerDissolved`
    bounded by a constant times the touched faces — the O(touched) claim of §3.10 (SCL-1; W-FLD-02).
30. §14's `Kernel.resolve(ref, key)` takes a `PlatKey` (KIC-02); a transient arena is read through `readBack` and
    `view` (unchanged).
31. §16's M4 exit (or §12.8) lists the extreme-growth memory measurement that selects §3.2 (9)'s re-grid fallback
    (KWG-08).

**volumes**
32. V11 §3.1 registers one base settings row (W-SET-01) with `index.gridCellM` (per level: L0–L1 25 m, L2 10 m,
    L3–L4 5 m; reader §3.3), `reroll.maxAdvance` (3; §5.1 (6)) and `crossing.searchBandM` (120 m; §4.2 S1 (5), §6.3).
33. V07: item 279 is applied at §3.2 (9); V07 §3.2 (1) and its BCR-V7-30 pointer cite it; under `territory` the arena
    margin is `territory.marginShare` (§3.2's `Frame`); the frame never shrinks across item 322's fold.
34. V01: its outward offset of a reservation outline by `insetRing` with a negative inset holds for a convex outline; a
    non-convex one returns `E_NON_CONVEX` and V01 unites the face with a `buffer` of its ring (§3.7 Insets).
35. V06 (items 245, 575 writers) and V05 (landfall): the knot door is §3.4's (`splitThrough` landing on the vertex;
    `removeEdges` on its `VertexRef`).

## Mapping table — every inventory id of this part (403 of 403)

| id | canon role | statement (short) | new home |
|---|---|---|---|
| KERNEL-0001 | home | All shape mathematics lives in one kernel library that never thr | §3 intro (kept) |
| KERNEL-0002 | home | Every generation stage changes geometry only through transaction | §3 intro; normative home §3.3 (kept) |
| KERNEL-0003 | home | Lattice, snapping and attraction are BUILT in-house; degenerate  | §3.1 (kept) |
| KERNEL-0004 | home | Exact predicates: orient2d BUILT (exact in doubles under the ran | §3.1 (kept) |
| KERNEL-0005 | home | Planar subdivision (the §2.2 record) is BUILT as the core asset: | §3.1 (kept) |
| KERNEL-0006 | home | Polygon booleans, buffers, offsets, insets and bands are BUILT o | §3.1 (kept) |
| KERNEL-0007 | home | Straight skeleton is BUILT (§3.8; J-K5, J-A21.31); none adopted: | §3.1 (kept) |
| KERNEL-0008 | home | OBB, convex hull and largest inscribed rectangle BUILT: monotone | §3.1 (kept) |
| KERNEL-0009 | home | GEO-7 degenerate contract for OBB/hull/LIR: fewer than 3 distinc | §3.4 `obb` line (the one contract, GEO-7); §3.1 detail row `collinear`; §3.1 table row points to §3.4 (E-13; INTERNALDUPLICATIONS-002) |
| KERNEL-0010 | home | Best-fit regular polygon regularFit BUILT (§3.4; J-A45.31): a ri | §3.1 row → §3.4 regular fit (contract stated once there); detail row `fit` (E-13; INTERNALDUPLICATIONS-001) |
| KERNEL-0011 | home | Delaunay/Voronoi ADOPTED: delaunator (ISC), d3-delaunay (ISC); d | §3.1 (kept) |
| KERNEL-0012 | home | Poisson-disc/blue noise BUILT: Bridson with k = 50 candidates, a | §3.1 (kept) |
| KERNEL-0013 | reference | A ragged wood edge comes from thinning the stamped points by the | REFERENCE → §4.9, §8.10 (the thinning); the §3.1 Poisson row keeps the sampler clause "the sampler is never warped" (COV-VG-WC3) |
| KERNEL-0014 | home | Noise (fBm, domain warp, ridged): simplex-noise (MIT) ADOPTED; s | §3.1 (kept) |
| KERNEL-0015 | home | Curves BUILT: Chaikin, centripetal Catmull-Rom to cubic, pinned- | §3.1 (kept) |
| KERNEL-0016 | home | Spatial index: flatbush (ISC) ADOPTED for static partitions plus | §3.1 (kept) |
| KERNEL-0017 | home | Marching squares ADOPTED (d3-contour, ISC; §17 licence table); d | §3.1 (kept) |
| KERNEL-0018 | home | Path search BUILT: binary-heap A*/Dijkstra on rasters and on the | §3.1 (kept) |
| KERNEL-0019 | home | Triangulation (render, fields) ADOPTED: earcut (ISC); holes supp | §3.1 (kept) |
| KERNEL-0020 | reference | Deterministic math dmath BUILT (§6.5 (2); J-11); a division by a | REFERENCE: the row keeps its pointer, `dmath` (§6.5 (2); J-11) |
| KERNEL-0021 | reference | RNG and hashing BUILT (§6.1). | REFERENCE: the row keeps its pointer (§6.1) |
| KERNEL-0022 | home | Every kernel primitive returns a typed KernelResult and never th | §3.1 (kept) |
| KERNEL-0023 | home | type KernelResult<T> = { ok: true; value: T; warnings: Warning[] | §3.1 (kept) |
| KERNEL-0024 | home | type KernelError: the closed enumeration of 18 failure codes (E_ | §3.1 (kept) |
| KERNEL-0025 | home | E_OUT_OF_RANGE: snap() given a non-finite value or /coordinate/  | §3.1 KernelError comment: both uses (KXC-01 = DXC-01) |
| KERNEL-0026 | home | E_DEGENERATE: ratio() with a vanishing denominator; OBB/hull of  | §3.1 detail table (E-13): every detail value with its op; each contract at its op |
| KERNEL-0027 | home | E_LEVEL: a batch wrote a level other than its own, added a row c | §3.1 (kept) |
| KERNEL-0028 | home | E_LOCKED: the op would cut, move or delete geometry owned by a l | §3.1 (kept) |
| KERNEL-0029 | home | E_KEPT: an insertion or clear would cross, clear or come within  | §3.1 (kept) |
| KERNEL-0030 | home | E_SCOPE: a pool district overlay wrote outside its district scop | §3.1 (kept) |
| KERNEL-0031 | home | E_STRUCTURAL: a merge or removal would delete an edge carrying a | §3.1 (kept) |
| KERNEL-0032 | home | E_NOT_TWO_CROSSINGS: splitFace contact semantics violated (§3.6) | §3.1 (kept) |
| KERNEL-0033 | home | E_HOLE_CONTACT: connectHole post-condition violated (§3.6). | §3.1 (kept) |
| KERNEL-0034 | home | E_SELF_INTERSECT: a ring whose role requires a simple polygon (a | §3.1 (kept) |
| KERNEL-0035 | home | E_BELOW_MIN_EDGE: optional chains only; its two triggers are tho | §3.1 (kept) |
| KERNEL-0036 | home | E_BELOW_MIN_ANGLE: optional chains only: a face corner below min | §3.1 (optional chains; and an angle floor of a KernelTx.expect entry, W-FLD-01) |
| KERNEL-0037 | home | E_BELOW_MIN_AREA: a class floor (minimum area) declared by the c | §3.1 (a class floor of a KernelTx.expect entry, W-FLD-01; readers named, KWG-04) |
| KERNEL-0038 | home | E_BELOW_MIN_WIDTH: a class floor (minimum width) declared by the | §3.1 (as KERNEL-0037) |
| KERNEL-0039 | home | E_NON_CONVEX: the half-plane inset path was asked for a non-conv | §3.1 (kept) |
| KERNEL-0040 | home | E_NO_PATH: path search found no path; returned with the closest  | §3.1 (kept) |
| KERNEL-0041 | home | E_WORK_LIMIT: an operation-count budget was exhausted - counted  | §3.1 (kept) |
| KERNEL-0042 | home | E_INVARIANT: a declared hard invariant failed at commit (§3.10). | §3.1 (kept) |
| KERNEL-0043 | home | type Warning = { code: W_ATTRACTED / W_STRETCH_SHARED / W_WEDGE_ | §3.1 Warning type — W_STEINER removed (KWG-01 ruling); producer/reader paragraph added |
| KERNEL-0044 | home | W_ATTRACTED: a new vertex was attracted onto existing geometry ( | §3.1 producers paragraph; emitted at §3.6 steps 1–3 (KWG-02) |
| KERNEL-0045 | home | W_STRETCH_SHARED: a stretch was shared between rows (§3.4/§3.6). | §3.1 (kept) |
| KERNEL-0046 | home | W_WEDGE_ROUTED: an acute wedge was routed (§3.6). | §3.1 (kept) |
| KERNEL-0047 | home | W_PLACED: §3.6 placement rule placed a point on an existing edge | §3.1 (kept) |
| KERNEL-0048 | home | W_PROMOTED: a finer vertex was promoted (§2.2 rule 3) - prepared | §3.1 (kept) |
| KERNEL-0049 | home | W_SNAP_PASSES: snap-rounding needed extra passes (§3.6). | §3.1 (kept) |
| KERNEL-0050 | home | W_ACUTE_CORNER: a soft minFaceAngle corner kept (§3.6/§3.10). | §3.1 (kept) |
| KERNEL-0051 | home | W_SLIVER_RETYPED: a sliver face was retyped (§3.6). | §3.1 (kept) |
| KERNEL-0052 | home | W_STEINER: Steiner points were added (§3.7 overlay or §3.6). | REMOVED with ruling (KWG-01): no producer and no reader anywhere in the set; Steiner vertices stay counted in CommitRecord.steinerAdded (read by §13.2) |
| KERNEL-0053 | home | W_HEIGHT_CLAMPED: a height was clamped (§3.4/§3.9). | §3.1 producers paragraph (producer: §2.3 raster range check) |
| KERNEL-0054 | home | W_DOWNGRADE: an operation downgraded to a simpler shape (skeleto | §3.1 (kept) |
| KERNEL-0055 | home | W_CUT_SLID: §4.6 step 8 (c) slid always-succeeding cut; count =  | §3.1 (kept) |
| KERNEL-0056 | home | interface Frame { widthCm: Cm; heightCm: Cm; aspect: number (wid | §3.2 Frame (marginShare typed number: 0.3 under `base`, territory.marginShare under `territory`; item 279) |
| KERNEL-0057 | home | (1) Integer world: all persisted geometry is integer cm; interme | §3.2 (1), restricted to points that become arena geometry (KIC-07) |
| KERNEL-0058 | home | (1) Range invariant: /x/, /y/ < 2^23 cm (83.9 km), enforced by s | §3.2 (1) (kept) |
| KERNEL-0059 | home | (1) Headroom check: the largest arena is METROPOLIS at the popul | §3.2 (1): cap figures cited to §12.2 (RESTATEMENTS-002); derived km, |x| and headroom kept |
| KERNEL-0060 | home | (2) Tolerances are world lengths, never parameter-space (the OS  | §3.2 (kept) |
| KERNEL-0061 | reference | (2) minEdge = 25 cm: the minimum edge length on the lattice (nam | REFERENCE → §2.2 LatticeSpec (value); §3.2 (2) keeps the meaning |
| KERNEL-0062 | reference | (2) attractCm = 26 cm = minEdge + 1 cm of lattice slack, so a ve | REFERENCE → §2.2 LatticeSpec (value); §3.2 (2) keeps the meaning and the 25.29 cm bound |
| KERNEL-0063 | reference | (2) minFaceAngle = 5 deg (500 centidegrees); hard or soft by cha | REFERENCE → §2.2 LatticeSpec (value); §3.2 (2) keeps "hard or soft by class" |
| KERNEL-0064 | reference | (2) Class floors come from the stage tables: minPlotWidth = 2.5  | REFERENCE → §4.7 class-floor row (pipeline; KXC-02 = DXC-06): values and the FTG sheared-quad note move there (cross-part note); §3.2 (2) keeps the kind rule |
| KERNEL-0065 | home | (2) Face-size floors are a minimum width and a minimum area; ang | §3.2 (kept) |
| KERNEL-0066 | home | (2) GEO-35 one minimum-edge rule for every writer: insertChain,  | §3.2 (kept) |
| KERNEL-0067 | home | (2) There is no weld tolerance: coincidence is lattice-point equ | §3.2 (kept) |
| KERNEL-0068 | home | (3) No float comparisons for topology: equality is index equalit | §3.2 (3) with E-15 (centidegrees the one angle unit; the 16-bit binary angle removed) |
| KERNEL-0069 | home | (3) A distance comparison against attractCm or minEdge on a comp | §3.2 (kept) |
| KERNEL-0070 | reference | (4) Cross-platform reproducibility is §6.5 policy (integer-deriv | REFERENCE → §6.5; §3.2 (4) keeps the kernel part |
| KERNEL-0071 | home | (5) Angles and directions are unit vectors in doubles derived fr | §3.2 (kept) |
| KERNEL-0072 | home | (6) area2(ring) (GEO-32; J-K13) returns twice the signed area as | §3.2 (6) (KIC-06 wording) |
| KERNEL-0073 | home | (6) area2Big(ring) returns the BigInt twice-area of a self-cross | §3.2 (kept) |
| KERNEL-0074 | home | (6) Receipt: three star rings of radius 2^23 - 2 whose terms all | §3.2 (kept) |
| KERNEL-0075 | home | (6) Ring orientation is orient2d at the ring lowest-leftmost ver | §3.2 (kept) |
| KERNEL-0076 | home | (7) GEO-7 the one door: snap(x, y) is the only way a number beco | §3.2 (kept) |
| KERNEL-0077 | home | (8) Checked ratios: in model packages a division by a computed v | §3.2 (8) (detail `ratio`) |
| KERNEL-0078 | reference | (8) Lint rule: flags every division in model packages whose divi | REFERENCE → §6.5 lint; §3.2 (8) keeps the division rule |
| KERNEL-0079 | home | (9) Frames are rectangles (COV-VG-VN-156): a rung declares its f | §3.2 (9) with `frameLaw` (item 279); rung areas cited to §1.1, cap to §12.2 (RESTATEMENTS-003) |
| KERNEL-0080 | home | (9) The range bound of (1) is taken at the population cap and th | §3.2 (9) (kept) |
| KERNEL-0081 | reference | (9) The arena outer ring and the frame rectangle are the margin  | REFERENCE → §2.2 rule 1 (one pointer sentence) |
| KERNEL-0082 | home | (9) Frame growth at an epoch (item 81 (b); J-A81.31): a frame on | §3.2 (9) frame growth (never-shrink and no-op cases defined, EI-007; the product fold's law change) |
| KERNEL-0083 | glossary | Defined term LAPSING STRETCH: a stretch of the old margin ring o | §3.2 (kept) |
| KERNEL-0084 | glossary | Defined term REGION (of a frame growth): the union of the L1 fac | §3.2 (kept) |
| KERNEL-0085 | home | Frame growth (a) Clearing (L1): one L1 batch removes the content | §3.2 (kept) |
| KERNEL-0086 | home | Frame growth (b) The margin (L0): one L0 batch inserts the new o | §3.2 (kept) |
| KERNEL-0087 | home | Frame growth (c) The border (L1): one L1 batch inserts the new f | §3.2 (kept) |
| KERNEL-0088 | home | Frame growth: a vertex of an old chain that keeps a row or anoth | §3.2 (kept) |
| KERNEL-0089 | home | Frame growth of underground parts: every underground part (its o | §3.2 (9): every part whose outer ring is the frame with its margin — underground parts and raised ground parts (g item 110 (b)) |
| KERNEL-0090 | home | Frame growth of rasters: each §2.3 raster extends by whole cells | §3.2 (9) citing §2.3 for the whole-cell extension (RESTATEMENTS-008); hydro recompute kept |
| KERNEL-0091 | home | Frame growth: what changes is the region faces, the faces beside | §3.2 (kept) |
| KERNEL-0092 | home | Frame growth draws no random stream in the kernel part, so a rep | §3.2 (kept) |
| KERNEL-0093 | home | Pre-decided fallback: if M4 memory measurement of the extreme gr | §3.2 (9) fallback (TOWN cell cited §2.3, RESTATEMENTS-009; figures kept) |
| KERNEL-0094 | home | interface KernelTx { key: ArenaKey (a PlatKey or a transient are | §3.3 KernelTx (expect/onFail defined, W-FLD-01; level = fromLevel, KIC-03) |
| KERNEL-0095 | home | type BatchScope = { kind: stage; stage } / { kind: district; id  | §3.3 (kept) |
| KERNEL-0096 | home | interface CommitRecord (returned by every commit; kernel-interna | §3.3 CommitRecord (readers named, W-FLD-02; undo-record notes gathered in the commit-record bullet) |
| KERNEL-0097 | home | Batch granularity: a transaction batch is one growth stage, one  | §3.3 (kept) |
| KERNEL-0098 | home | Transient arena batches use this protocol with level 0 (its one  | §3.3 batch paragraph (home of the transient batch fields; §3.4 cites it, INTERNALDUPLICATIONS-010) |
| KERNEL-0099 | home | Batch execution: the kernel applies the ops to a scratch overlay | §3.3 (kept) |
| KERNEL-0100 | home | One level per transaction: a batch creates vertices, edges, owne | §3.3 (kept) |
| KERNEL-0101 | home | Kept content (J-K14): every face records the rank of the stage w | §3.3 kept content (+ the clear rule citing §7.2, KXC-03/KBR-02) |
| KERNEL-0102 | home | E_KEPT governs insertion and clearing only; a move keeps nothing | §3.3 kept content ("moves: §3.6"; home of moves-keep-nothing is §3.6, E-14) |
| KERNEL-0103 | home | In generation E_KEPT cannot arise on a correct pipeline because  | §3.3 (kept) |
| KERNEL-0104 | home | A batch faces are the faces it names or creates. A same-level sp | §3.3 (kept) |
| KERNEL-0105 | home | Clear regions and prepared contacts (LC-7; J-I10, J-I12, J-I13,  | §3.3 (kept) |
| KERNEL-0106 | glossary | Defined term FOOTPRINT (of an edit, the clear region): computed  | §3.3 (kept) |
| KERNEL-0107 | home | Clear region rule 1 Clearing: clearFiner in a batch declaring a  | §3.3 (kept) |
| KERNEL-0108 | home | Clear region rule 2 Preparation: one or more finer-level batches | §3.3 (kept) |
| KERNEL-0109 | home | Contact names: a contact name is placed by splitThrough with its | §3.3 rule 2 (uniqueness rests on the allocation rule and §13.1's permuted-ops fixture; KIC-01/KBR-01) |
| KERNEL-0110 | home | Preparation cut-backs: a coarse chain never shares a finer edge, | §3.3 (kept) |
| KERNEL-0111 | home | Clear region rule 3 Contact: the coarse batch splits the finer f | §3.3 (kept) |
| KERNEL-0112 | reference | The carve fixtures of §13.1-§13.2 confirm the clear-region rules | REFERENCE kept (§13.1–§13.2 carve fixtures) |
| KERNEL-0113 | home | Pre-decided fallback if a carve fixture cannot be met: the batch | §3.3 (kept) |
| KERNEL-0114 | home | Two op forms (GEO-11; J-K15): a transaction takes exactly one of | §3.3 (kept) |
| KERNEL-0115 | home | Declared form: KernelTx.ops lists independent ops, none reading  | §3.3 (kept) |
| KERNEL-0116 | home | Callback form: tx(tx, fn) (§14) hands fn the open overlay; each  | §3.3 (kept) |
| KERNEL-0117 | home | No output depends on slot numbers: every kernel tie-break uses l | §3.3 (kept) |
| KERNEL-0118 | home | Work limits instead of clocks (GEO-2): every op charges operatio | §3.3 (kept) |
| KERNEL-0119 | home | The commit record lists what the batch created, changed, moved,  | §3.3 commit-record bullet (readers: §8.1 dirty set, §6.2 entity leaves, §13.2 cost model) |
| KERNEL-0120 | home | The derivation pool overlays (J-K16): the per-district stages th | §3.3 (kept) |
| KERNEL-0121 | home | Pool step 1 The frozen base (J-K25): when the eager S10a and S10 | §3.3 (kept) |
| KERNEL-0122 | home | Pool step 1 freeze: at the freeze the generation worker first re | §3.3 pool step 1 (threshold cites rebuild moment (2), E-14/INTERNALDUPLICATIONS-007) |
| KERNEL-0123 | home | Freeze rebuild costs measured (docs/validation/bench/fixall_kern | §3.3 pool step 1 (r4 B receipts kept; CITY items and cost → §12.4 S10 (0) row, RESTATEMENTS-010; ≈ 26 partitions and METROPOLIS ≈ 5.8 ms kept) |
| KERNEL-0124 | home | Pool step 1 copy: the generation worker freezes the arena at tha | §3.3 (kept) |
| KERNEL-0125 | home | Frozen copy size: the arena and its tables at most about 12 MB a | §3.3 pool step 1 (copy contents and per-item sizes kept; per-copy size and time → §12.4 merge row, §12.8, RESTATEMENTS-011; three copies ≈ 4.6 ms kept) |
| KERNEL-0126 | home | Pre-decided fallback if M1 memory measurement (or M4 on the epoc | §3.3 (kept) |
| KERNEL-0127 | home | Pool step 2 One overlay per district: a worker derives each dist | §3.3 (kept) |
| KERNEL-0128 | home | Pool step 3 The scope check: a district face set is its L1 faces | §3.3 (kept) |
| KERNEL-0129 | home | Pool step 3 shared edges: the L1 edges two overlays face sets sh | §3.3 pool step 3 (street trees → §2.7, §4.9, RESTATEMENTS-013) |
| KERNEL-0130 | home | Pool step 3: the hinterland unit, which the generation worker ru | §3.3 (kept) |
| KERNEL-0131 | home | Pool step 4 The merge: the generation worker applies overlays in | §3.3 (kept) |
| KERNEL-0132 | reference | Merge cost is O(overlay size): the about 200 000 records S10-S12 | REFERENCE → §12.4 merge row (RESTATEMENTS-012) |
| KERNEL-0133 | home | Pool step 5 Pool size 0: the single-worker configuration runs th | §3.3 (kept) |
| KERNEL-0134 | home | Spatial indexes (SCL-2; J-K6): each level has (a) static packed  | §3.3 spatial indexes (grid cell cited) |
| KERNEL-0135 | home | Dynamic grid cell size: 25 m at L0-L1, 10 m at L2, 5 m at L3-L4  | MOVED → V11 §3.1's base settings row, cell `index.gridCellM` (W-SET-01, KWG-06; values 25 m L0–L1, 10 m L2, 5 m L3–L4 in the cross-part note); §3.3 cites the cell |
| KERNEL-0136 | home | What each level index holds: the items of that level (current bi | §3.3 (kept) |
| KERNEL-0137 | home | Route-edge box completeness: the run box holds every finer verte | §3.3 what each level holds (drift cited §3.6/J-K32) |
| KERNEL-0138 | home | Index writes by level: a finer batch that splits a coarser edge  | §3.3 (kept) |
| KERNEL-0139 | home | No item changes in place (J-K34): every item a batch deletes, re | §3.3 (kept) |
| KERNEL-0140 | home | Consequence of J-K34: a static item is either exact or filtered, | §3.3 (kept) |
| KERNEL-0141 | home | Queries: inside a stage every insertion and deletion goes to the | §3.3 (kept) |
| KERNEL-0142 | home | Query result order: sorted by the canonical key of each item kin | §3.3 (kept) |
| KERNEL-0143 | glossary | Defined term TOMBSTONE: an item key - kind * 2^32 + slot, the ki | §3.3 (kept) |
| KERNEL-0144 | home | Partition rebuild: indexes the live items belonging to the parti | §3.3 (kept) |
| KERNEL-0145 | home | Home column: 2 B per vertex, edge-pair and face slot (about 0.5  | §3.3 (kept) |
| KERNEL-0146 | home | Static partitions are rebuilt at three moments, never per batch: | §3.3 tombstones and rebuilds (home of max(256, ¼), E-14) |
| KERNEL-0147 | home | Measured flatbush construction (docs/validation/bench/bench_inde | §3.3 (kept) |
| KERNEL-0148 | reference | §13.2 cost-model test fails if rebuild work grows with the numbe | REFERENCE → §13.2 cost-model test |
| KERNEL-0149 | home | @plat/kernel ops are the only writers of any arena; tx is the op | §3.4 (kept) |
| KERNEL-0150 | home | insertChain(tx, points: Point[], roles: RoleRow[], cls: mandator | §3.4 (kept) |
| KERNEL-0151 | home | interface ChainInsert { placed: VertexId[] } - one per input poi | §3.4 (kept) |
| KERNEL-0152 | home | splitThrough(tx, at: HalfEdgeId, p: Point, row?: RoleRow): Kerne | §3.4 splitThrough (lands on an endpoint within attractCm, which takes the row: the knot door of items 245 and 575) |
| KERNEL-0153 | home | removeEdges(tx, ref: ChainRef / EdgeSetRef / StretchRef / Vertex | §3.4 (kept) |
| KERNEL-0154 | home | clearFiner(tx, faces: FaceRef, level: Level): KernelResult<Confl | §3.4 clearFiner (cites §3.3's clear rule) |
| KERNEL-0155 | home | retypeEdges(tx, ref: ChainRef / EdgeSetRef / StretchRef, add: Ro | §3.4 (kept) |
| KERNEL-0156 | home | retypeEdges rekey: moves the ref (role, from) rows, knot rows an | §3.4 (kept) |
| KERNEL-0157 | home | setOwner(tx, faces: FaceId[], owner: Id): KernelResult<void>. | §3.4 (kept) |
| KERNEL-0158 | home | splitFace(tx, face: FaceId, cut: Point[] (a bent cut is 2-3 vert | §3.4 (kept) |
| KERNEL-0159 | home | connectHole(tx, face: FaceId, cut: Point[]): KernelResult<FaceId | §3.4 (kept) |
| KERNEL-0160 | home | mergeFaces(tx, a, b): KernelResult<FaceId> - deletes shared part | §3.4 (kept) |
| KERNEL-0161 | home | absorbSliver(tx, face: FaceId, floor: { minWidthCm; minAreaCm2 } | §3.4 absorbSliver → "§3.6's sliver rule" (INTERNALDUPLICATIONS-003) |
| KERNEL-0162 | home | claimSubFace(tx, claim: { ring: Point[] } / { areaCm2; within: F | §3.4 (kept) |
| KERNEL-0163 | home | radialSplit(tx, face: FaceId, apex: Point, raysCdeg: number[]):  | §3.4 (kept) |
| KERNEL-0164 | home | ringBand(tx, face: FaceId, widthCm: Cm): KernelResult<{ band: Fa | §3.4 (kept) |
| KERNEL-0165 | home | corridorUnion(tx, l1Faces: FaceRef / FaceId[]): KernelResult<Ban | §3.4 corridorUnion comment (KIC-05) |
| KERNEL-0166 | home | bandUnion(tx, chains: { ref: ChainRef; halfWidthCm: Cm / ChainPr | §3.4 (kept) |
| KERNEL-0167 | home | warp(tx, field: DisplacementField, fromLevel: Level, region: Poi | §3.4 warp (fromLevel = tx.level, KIC-03; recordCheck cites §7.4 and §2.6, RESTATEMENTS-023) |
| KERNEL-0168 | home | pinVertices(tx, refs: VertexRef[]): KernelResult<void> - sets th | §3.4 pinVertices (smoothing, simplification and cutting keep the vertex, a user's warp moves it unless held; KIC-04) |
| KERNEL-0169 | home | resolve(ref: FaceRef / ChainRef / EdgeSetRef / VertexRef, key: A | §3.4 resolve (PlatKey only, KIC-02; empty when no geometry) |
| KERNEL-0170 | home | resolveVertexAt(key: PlatKey, at: LatticePoint, sig: VertexSig,  | §3.4 (kept) |
| KERNEL-0171 | home | signature(key: PlatKey, v: VertexRef / LatticePoint): VertexSig  | §3.4 (kept) |
| KERNEL-0172 | home | sampleProfile(p: ChainProfile, owner: Id, key: PlatKey, atCm: Cm | §3.4 sampleProfile (ring cyclic, step profiles as strings, [] when no edge: EI-006; item 245) |
| KERNEL-0173 | home | kerb(face: FaceId (L1, committed or in the open overlay)): Kerne | §3.4 (kept) |
| KERNEL-0174 | home | booleans(op: union / intersection / difference / xor, a: Ring[], | §3.4 (kept) |
| KERNEL-0175 | home | tileRings(rings: Ring[] (world lattice rings, counter-clockwise, | §3.4 (kept) |
| KERNEL-0176 | home | buffer(chains: Point[][], halfWidthCm: Cm / Cm[] (per input poin | §3.4 buffer; join and end semantics §3.7 (EI-001) |
| KERNEL-0177 | home | offsetFace(face: FaceId, perEdgeCm: Cm[]): KernelResult<Ring[]>  | §3.4 (kept) |
| KERNEL-0178 | home | insetRing(face: FaceId, dCm: Cm): KernelResult<Ring[]> - uniform | §3.4 insetRing; §3.7 Insets (dCm 0 and negative defined) |
| KERNEL-0179 | home | skeleton(rings: Ring[], use: roof / spine / regions): KernelResu | §3.4 (kept) |
| KERNEL-0180 | home | simplify(chain: Point[], minSegmentCm: Cm, minAngleCdeg: number, | §3.4 (kept) |
| KERNEL-0181 | home | hexLattice(region: Ring[], spacingCm: Cm, jitterCm: Cm, rng: Str | §3.4 hexLattice (empty region; argument asserts, EI-003; caller §4.2 S3 (3), KWG-07) |
| KERNEL-0182 | home | Geometry services: obb(ring), hull(points), lir(ring, axes), sid | §3.4 service lines (hull and area2Big internal; sampleBoundary callers; KWG-07) |
| KERNEL-0183 | home | regularFit(ring: Ring): KernelResult<RegularFit> - the ring best | §3.4 (kept) |
| KERNEL-0184 | home | interface RegularFit { n (the ring vertex count); centre {x, y}  | §3.4 (kept) |
| KERNEL-0185 | home | The doors: insertChain is the only door for new edges in a plat  | §3.4 The doors (+ the profile writers' knot door, items 245, 575) |
| KERNEL-0186 | home | Each op has documented preconditions, work local to the touched  | §3.4 (kept) |
| KERNEL-0187 | home | sideRuns gives stages a side notion surviving curved, round-join | §3.4 sideRuns line (folded into the service comment) |
| KERNEL-0188 | home | setOwner and retypeEdges are the calls §6.3 succession uses: whe | §3.4 (kept) |
| KERNEL-0189 | home | Profiled chains: a chain carrying a profile is inserted with its | §3.4 (kept) |
| KERNEL-0190 | home | The regular fit (item 45; J-A45.31): regularFit is the ONE compu | §3.4 (kept) |
| KERNEL-0191 | home | regularFit numerics: cosines, sines and phase from dmath (§6.5 ( | §3.4 (kept) |
| KERNEL-0192 | home | regularFit callers move vertices toward targets only through war | §3.4 (kept) |
| KERNEL-0193 | home | Stretches (J-K31): every operator edit on part of a chain names  | §3.4 (kept) |
| KERNEL-0194 | home | Stretch removal on profiled chains: removeEdges gives each remai | §3.4 (kept) |
| KERNEL-0195 | home | A removal that would leave a linear entity in more parts than it | §3.4 (kept) |
| KERNEL-0196 | home | Arenas, keys and services (J-A12.32): every writer acts on the a | §3.4 Arenas, keys and services (KIC-02) |
| KERNEL-0197 | home | Slot stamping: every slot a caller holds comes from a result sta | §3.4 (kept) |
| KERNEL-0198 | home | Cross-arena reads: a stage on one arena reads another through th | §3.4 (kept) |
| KERNEL-0199 | home | An arena is one planar subdivision: its faces never overlap and  | §3.4 A layer's several arenas |
| KERNEL-0200 | home | The underground layer several arenas (item 65; J-A65.31): underg | §3.4 A layer's several arenas: underground bullet; raised-parts bullet added (g item 110 (b)) |
| KERNEL-0201 | home | Underground parts add no kernel operation: J-A12.32 holds across | §3.4 A layer's several arenas (kept, widened to raised ways) |
| KERNEL-0202 | home | Every entity faces, chains and vertices lie in the one part its  | §3.4 (the exception widened to a raised way's two feet, g item 110 (b)) |
| KERNEL-0203 | home | Each underground part has its own index partitions (§3.3), snaps | §3.4 (a raised way's re-derivation re-places its feet) |
| KERNEL-0204 | home | Transient arenas (J-A28.31): the composition rungs - a stage-3 c | §3.4 (kept) |
| KERNEL-0205 | home | type TransientKey = { transient: true; owner: Id (the entity who | §3.4 (kept) |
| KERNEL-0206 | home | type ArenaKey = PlatKey / TransientKey - what KernelTx.key and C | §3.4 ArenaKey (pointLocate, faceNeighbours, §14 view; KIC-02) |
| KERNEL-0207 | home | transientArena(owner: Id, seed: Ring[] (world lattice rings, cou | §3.4 transientArena (fixed-ring list cited to §2.6's stage-3 contract and re-cut rule, RESTATEMENTS-017) |
| KERNEL-0208 | home | readBack(key: TransientKey): { faces: { ring; holes: Ring[]; own | §3.4 (kept) |
| KERNEL-0209 | home | release(key: TransientKey): void - ends the transient arena; no  | §3.4 (kept) |
| KERNEL-0210 | home | Transient arena opening: its L0 faces are the seed rings then th | §3.4 transient opening (+ an empty seed list, EI-005) |
| KERNEL-0211 | home | Transient arena overlap refusal: seed rings that overlap, and a  | §3.4 (kept) |
| KERNEL-0212 | home | The seed clip (tileRings): a caller whose wings overlap (§2.6 ru | §3.4 (kept) |
| KERNEL-0213 | home | The opening exact insertion is the one way edges enter a transie | §3.4 (kept) |
| KERNEL-0214 | home | Fixed edges: the seed and fixed rings edges are the arena FIXED  | §3.4 (kept) |
| KERNEL-0215 | home | Transient arena op set: its batches are §3.3 transactions with t | §3.4 the transient op set stated once (KIC-02) |
| KERNEL-0216 | home | A transient arena has no static partitions (its dynamic grid ser | §3.4 (kept) |
| KERNEL-0217 | home | A caller may plan its cuts on a coarser module of its own (the p | §3.4 (kept) |
| KERNEL-0218 | home | Transient arena opening costs O(seed vertices) and each op what  | §3.4 (kept) |
| KERNEL-0219 | home | The input sides are the arena routes (J-A28.34): a side of a see | §3.4 (kept) |
| KERNEL-0220 | home | Every vertex a face partitioner places on a fixed edge (a cut en | §3.4 (kept) |
| KERNEL-0221 | home | A re-cut is the same call (item 28 (f); J-A28.33): the plan deri | §3.4 re-cut (fixed rings cited to §2.6's re-cut rule, RESTATEMENTS-018; KBR-03 → §2.6's re-cut bullet, J-A28.26) |
| KERNEL-0222 | home | Kept ring re-entry: a kept ring re-enters exactly on the lattice | §3.4 (kept) |
| KERNEL-0223 | home | Nothing of an earlier cut is edited, because no arena outlives i | §3.4 (kept) |
| KERNEL-0224 | home | Creator failure class closed: collapsed/intersecting edges on co | §3.5 traceability row (the answer as pointers, E-14/KEL-05) |
| KERNEL-0225 | home | Creator failure class closed: silent no-op of the 2017 cut routi | §3.5 traceability row (the answer as pointers, E-14/KEL-05) |
| KERNEL-0226 | home | Creator failure class closed: null OBB / rect crash (61026228) - | §3.5 traceability row (the answer as pointers, E-14/KEL-05) |
| KERNEL-0227 | home | Creator failure class closed: "two intersections with the same w | §3.5 traceability row (the answer as pointers, E-14/KEL-05) |
| KERNEL-0228 | home | Creator failure class closed: stale graph state after edits brea | §3.5 traceability row (the answer as pointers, E-14/KEL-05) |
| KERNEL-0229 | home | Creator failure class closed: hourglass/sliver footprints (FTG 1 | §3.5 traceability row (the answer as pointers, E-14/KEL-05) |
| KERNEL-0230 | home | Creator failure class closed: self-intersecting user strokes bre | §3.5 traceability row (the answer as pointers, E-14/KEL-05) |
| KERNEL-0231 | home | Creator failure class closed: NG 1.2.2 silent rotated-frame retr | §3.5 traceability row (the answer as pointers, E-14/KEL-05) |
| KERNEL-0232 | home | Creator failure class closed: boolean "thorns" (VG 50688261) ->  | §3.5 traceability row (the answer as pointers, E-14/KEL-05) |
| KERNEL-0233 | home | Creator failure class closed: "weird steps" of per-edge buffers  | §3.5 traceability row (the answer as pointers, E-14/KEL-05) |
| KERNEL-0234 | home | Creator failure class closed: skeleton "glitches in special case | §3.5 traceability row (the answer as pointers, E-14/KEL-05) |
| KERNEL-0235 | home | Creator failure class closed: identity-keyed topology, un-serial | §3.5 traceability row (the answer as pointers, E-14/KEL-05) |
| KERNEL-0236 | home | Creator failure class closed: allocation hot spot of NG 1.2.2 in | §3.5 traceability row (the answer as pointers, E-14/KEL-05) |
| KERNEL-0237 | home | Attraction (GEO-3; J-K2): insertChain processes each chain of a  | §3.6 (kept) |
| KERNEL-0238 | home | Promotion by attraction: a finer vertex of (b) or (c) that a cha | §3.6 (kept) |
| KERNEL-0239 | home | Obstacles: kept geometry, and inside a clear region every finer  | §3.6 (kept) |
| KERNEL-0240 | home | insertChain step 1 Snap and decimate: every point passes snap (§ | §3.6 step 1 (merge reported W_ATTRACTED; mandatory collapse → E_DEGENERATE `empty`) |
| KERNEL-0241 | home | insertChain step 2 Vertex attraction: a chain vertex within attr | §3.6 step 2 (W_ATTRACTED emitted, KWG-02) |
| KERNEL-0242 | home | insertChain step 3 Segment and stretch attraction: a chain segme | §3.6 step 3 (routing through a vertex reported W_ATTRACTED) |
| KERNEL-0243 | home | insertChain step 4 Crossings: remaining crossings computed exact | §3.6 (kept) |
| KERNEL-0244 | home | Wedge routing (step 4): two consecutive crossings closer than mi | §3.6 step 4 (corner bound kept; the 30° junction and 12° plot floors named with §4.7 cited) |
| KERNEL-0245 | home | insertChain step 5 Re-walk: only faces incident to touched edges | §3.6 (kept) |
| KERNEL-0246 | home | The placement rule (GEO-3, GEO-35; J-K17): every new vertex on a | §3.6 (kept) |
| KERNEL-0247 | home | Placement rule behaviour: the nearest lattice point qualifies al | §3.6 (kept) |
| KERNEL-0248 | home | Placement rule fallback: if no candidate qualifies, the incoming | §3.6 (kept) |
| KERNEL-0249 | home | W_PLACED reports every vertex the placement rule places away fro | §3.6 (kept) |
| KERNEL-0250 | home | Placement bound drift (J-K32): the rule gives every vertex it pl | §3.6 (placement bound's home is §3.10, E-14; drift receipts kept) |
| KERNEL-0251 | home | Existing geometry wins: an incoming chain vertex moves at most s | §3.6 (kept) |
| KERNEL-0252 | home | No edge shorter than minEdge can be created: every edge a batch  | §3.6 (kept) |
| KERNEL-0253 | home | Measured (fixall_kernel_r2_attract.out A-B): over 400 000 vertic | §3.6 (kept) |
| KERNEL-0254 | home | Chain classes - mandatory: coast, shore, bank, river, wall trace | §3.6 (kept) |
| KERNEL-0255 | home | Chain classes - optional: growth proposals, optional lanes, deco | §3.6 chain classes (F-NUM takes E_OUT_OF_RANGE on optional chains, KXC-01) |
| KERNEL-0256 | home | Clearance: attraction and the placement rule maintain §3.10 clea | §3.6 (kept) |
| KERNEL-0257 | home | Roles on shared stretches (GEO-4): when a chain shares an edge ( | §3.6 (kept) |
| KERNEL-0258 | home | Slivers (GEO-4): a face below its class floor (width or area, ne | §3.6 (kept) |
| KERNEL-0259 | home | splitFace contact semantics (GEO-6): a cut is a polyline whose i | §3.6 (kept) |
| KERNEL-0260 | home | splitFace rule 1: each endpoint is a boundary vertex or a point  | §3.6 (kept) |
| KERNEL-0261 | home | splitFace rule 2: any other contact is E_NOT_TWO_CROSSINGS: the  | §3.6 rule 2 (+ a one-point cut and one whose ends land on one vertex) |
| KERNEL-0262 | home | splitFace rule 3: an antenna (a dangling chain inside the face - | §3.6 (kept) |
| KERNEL-0263 | home | splitFace rule 4: a cut from the outer ring to a hole does not s | §3.6 (kept) |
| KERNEL-0264 | home | splitFace rule 5: the two children are returned in canonical ord | §3.6 (kept) |
| KERNEL-0265 | reference | splitFace rule 6: a face exported area boundary omits its antenn | REFERENCE → §11.1 (rule 6 is a pointer) |
| KERNEL-0266 | home | Moves - warp and smoothing (GEO-10, GEO-35, GEO-5 (c)): warp(fie | §3.6 (kept) |
| KERNEL-0267 | home | A move batch keeps nothing (J-K27): E_KEPT governs insertion and | §3.6 moves (home of moves-keep-nothing, E-14) |
| KERNEL-0268 | home | Held vertices (GEO-5 (c)): before the step the kernel computes t | §3.6 held set (smoothing: kernel-pinned held, KIC-04; raised feet held; §7.2 fixed inputs cited, RESTATEMENTS-022) |
| KERNEL-0269 | home | Kernel-pinned vertices under warp: gates, junctions, portals and | §3.6 held set (a user warp moves kernel-pinned vertices unless held, KIC-04) |
| KERNEL-0270 | home | Deck and water-gate ends held: a bridge deck_end vertices and a  | §3.6 held set item (2) |
| KERNEL-0271 | home | Vertices on fixed routes slide (J-K18): a route is FIXED when it | §3.6 (kept) |
| KERNEL-0272 | home | Re-seats (J-K17): each Steiner vertex on a moved coarser edge is | §3.6 (kept) |
| KERNEL-0273 | home | Order within a step (J-K30): re-seats and slides read vertices t | §3.6 (kept) |
| KERNEL-0274 | home | The split flag under moves (J-K26): a step clears the split flag | §3.6 (kept) |
| KERNEL-0275 | home | Whole-step validation (GEO-10, GEO-35): each target is rounded t | §3.6 whole-step validation (recordCheck cites §7.4, §2.6, RESTATEMENTS-024) |
| KERNEL-0276 | home | Whole-step failure: the step strength is halved globally - deter | §3.6 (kept) |
| KERNEL-0277 | home | Faces a committed move step leaves below a class floor are re-de | §3.6 (kept) |
| KERNEL-0278 | reference | The named brushes of §7.1 are displacement fields supplied by th | REFERENCE → §7.1 (brushes; rotation is view state) |
| KERNEL-0279 | home | One geometry engine on every host (GEO-9, DEF-2; J-K4): booleans | §3.7 (kept) |
| KERNEL-0280 | home | Boolean algorithm: overlays both operands rings, labels every fa | §3.7 decision (empty → detail `empty`) |
| KERNEL-0281 | home | Buffer algorithm: the union of per-segment strips and per-vertex | §3.7 decision (square and miter joins, flat ends defined, EI-001) |
| KERNEL-0282 | home | Every engine output takes and returns integer coordinates and is | §3.7 (kept) |
| KERNEL-0283 | home | The kerb, defined once (GEO-20): for an L1 face F, kerb(F) = F m | §3.7 kerb (a spine-less face: kerb(F) = F, EI-004) |
| KERNEL-0284 | home | corridorUnion commits exactly the kerb geometry at L2: the kerb  | §3.7 (kept) |
| KERNEL-0285 | home | Kept faces inside a kerb: a finer face an earlier stage made ins | §3.7 kerb (kept content cites §3.3, INTERNALDUPLICATIONS-004) |
| KERNEL-0286 | home | kerb is also a read-only service on the faces of an open transac | §3.7 (kept) |
| KERNEL-0287 | home | corridorUnion takes a set of L1 faces and re-derives only those, | §3.7 (kept) |
| KERNEL-0288 | home | Insets: the per-edge half-plane inset of the 2017 idea survives  | §3.7 Insets |
| KERNEL-0289 | home | Wall bands, glacis, tower and gatehouse footprints use bandUnion | §3.7 (kept) |
| KERNEL-0290 | home | The same functions on every arena (J-A12.31): kerb, corridorUnio | §3.7 same functions on every arena (+ raised parts) |
| KERNEL-0291 | home | Sewer part bands: corridorUnion over part 0 L1 faces commits eac | §3.7 (kept) |
| KERNEL-0292 | home | One cut for every underground part (item 65; J-A65.32): on the o | §3.7 (kept) |
| KERNEL-0293 | home | Oracles, not fallbacks (J-K19): Clipper2 (compiled to WebAssembl | §3.7 (kept) |
| KERNEL-0294 | home | B-FUZZ unattracted cases: the operation reports no W_ATTRACTED,  | §3.7 (kept) |
| KERNEL-0295 | home | B-FUZZ attracted cases (thin, near-collinear and near-touching i | §3.7 (kept) |
| KERNEL-0296 | home | The harness draw count (keeping the strict comparison from being | §3.7 (kept) |
| KERNEL-0297 | home | M0 (a) confirmation: (i) differential correctness on 10^6 fuzzed | §3.7 (kept) |
| KERNEL-0298 | home | M0 speed fallback: if (ii) fails after one optimisation pass, th | §3.7 M0 fallback (the stage list kept: its only statement — RESTATEMENTS-027's premise fails, no §4 list exists) |
| KERNEL-0299 | home | No WASM kernel (DEF-13; J-K8): the kernel is TypeScript on every | §3.7 (kept) |
| KERNEL-0300 | home | What an M0 per-op miss triggers, per hot loop after one optimisa | §3.7 (kept) |
| KERNEL-0301 | home | The WebAssembly accelerator must pass §6.5 (10) cross-implementa | §3.7 (kept) |
| KERNEL-0302 | home | Skeleton decision (DEF-3; J-K5): built in-house (§3.1); it never | §3.8 decision (roof cache key → §8.1 (5), RESTATEMENTS-015; lifecycle sentence added) |
| KERNEL-0303 | home | Skeleton reader roof: the roofs not taking the exact path (quad  | §3.8 (kept) |
| KERNEL-0304 | home | Skeleton reader spine: the hole-aware skeleton graph as a medial | §3.8 (kept) |
| KERNEL-0305 | home | Skeleton reader regions: S10 per-frontage regions of a block (§4 | §3.8 (kept) |
| KERNEL-0306 | home | Skeleton numeric contract (GEO-8): exact rational event times ar | §3.8 numeric contract (corners sharper than 5° and touching holes → downgrade, EI-002/EI-008) |
| KERNEL-0307 | home | Skeleton work limit: 4 * (n + r) + 64 events for n vertices and  | §3.8 (kept) |
| KERNEL-0308 | home | Convex near-rectangles take the exact path (J-K21): the CONVEX N | §3.8 (kept) |
| KERNEL-0309 | home | Exact roof constructions: a hip roof ridge ends half the OBB min | §3.8 (ridgeAxis definition → §2.6 BaseWing.ridgeAxis, RESTATEMENTS-016) |
| KERNEL-0310 | home | Convexity is what makes the exact path true: a 20 x 10 m rectang | §3.8 (kept) |
| KERNEL-0311 | home | Roofs are taken wing by wing, by BaseWing.kind (§2.6): rect wing | §3.8 (G-lot: "the plot cut's one bend") |
| KERNEL-0312 | home | Skeleton post-condition validator: every result checked before a | §3.8 (kept) |
| KERNEL-0313 | home | A validator failure, or E_WORK_LIMIT, takes the reader downgrade | §3.8 validator (F-SKELETON named, KXC-04 = DXC-02) |
| KERNEL-0314 | home | Skeleton M0 (a) confirmation: runs §13.1 skeleton fixtures and t | §3.8 (kept) |
| KERNEL-0315 | home | Skeleton pre-decided fallback: if the corpus bar fails after one | §3.8 (kept) |
| KERNEL-0316 | home | Geometry in the document (SCL-11, kernel part): the snapshot geo | §3.9 (kept) |
| KERNEL-0317 | home | Snapshot vertices: live vertices in slot order (slots compacted  | §3.9 (kept) |
| KERNEL-0318 | home | Snapshot edges: one (origin, destination, birth level) triple pe | §3.9 (kept) |
| KERNEL-0319 | home | Snapshot roles: (edge or vertex, role, entity, level, ordinal) r | §3.9 (kept) |
| KERNEL-0320 | home | Snapshot faces: per level, one (boundary half-edge, owner, kind, | §3.9 (kept) |
| KERNEL-0321 | home | No per-level digest is stored (§2.9 step 3). The ordinal and sta | §3.9 (+ an arena holding only its outer ring) |
| KERNEL-0322 | home | Chunks: the block is written as content-addressed chunks (§2.9). | §3.9 chunks (each L2–L4 partition, KIC-08) |
| KERNEL-0323 | home | Cross-chunk references: every reference to a vertex another chun | §3.9 (kept) |
| KERNEL-0324 | home | Chunk load order: the kernel inserts the level-<=1 routes, then  | §3.9 (kept) |
| KERNEL-0325 | home | Chunk rewrite locality: an edit that renumbers one partition ver | §3.9 (kept) |
| KERNEL-0326 | home | Load: the kernel rebuilds next/prev by sorting each vertex outgo | §3.9 load (+ a corrupt chunk loads by replay) |
| KERNEL-0327 | home | Pre-decided fallback for §2.9 open-to-editable bar: each L2-L4 s | §3.9 (kept) |
| KERNEL-0328 | home | Entities carry no slots (§2.2 rule 5), so the entity table needs | §3.9 (kept) |
| KERNEL-0329 | home | Invariant - lattice and range: every coordinate is a lattice poi | §3.10 (kept) |
| KERNEL-0330 | home | Invariant - minEdge: no edge shorter than minEdge, whichever wri | §3.10 (kept) |
| KERNEL-0331 | home | Invariant - clearance: every vertex lies at least minEdge from e | §3.10 (kept) |
| KERNEL-0332 | home | Invariant - one vertex per lattice point: no two vertices share  | §3.10 (kept) |
| KERNEL-0333 | home | Invariant - simplicity: faces simple except declared antennae; n | §3.10 (kept) |
| KERNEL-0334 | home | Invariant - nesting: every face of level n+1 has exactly one par | §3.10 (kept) |
| KERNEL-0335 | home | Invariant - placement bound: every vertex a batch places, re-sea | §3.10 placement-bound row (home, E-14) |
| KERNEL-0336 | home | Invariant - level consistency: every edge birth level is the low | §3.10 (kept) |
| KERNEL-0337 | home | Invariant - held vertices: no vertex of a warp or smoothing step | §3.10 (kept) |
| KERNEL-0338 | home | Invariant - prepared contacts: a clear-region batch met finer ge | §3.10 (kept) |
| KERNEL-0339 | home | Invariant - kept content: no finer face made by a stage before t | §3.10 (kept) |
| KERNEL-0340 | home | Invariant - role consistency: every role the registry declares l | §3.10 (kept) |
| KERNEL-0341 | home | Invariant - stored references resolve: each FaceRef, ChainRef, E | §3.10 stored-references row (+ raised way feet; failure handling) |
| KERNEL-0342 | home | Invariant - frozen base complete: at every pool freeze, after th | §3.10 (kept) |
| KERNEL-0343 | home | Invariant - index levels and freshness: a batch wrote no index o | §3.10 (kept) |
| KERNEL-0344 | home | Invariant - pool scope: no district overlay wrote outside its di | §3.10 (kept) |
| KERNEL-0345 | home | Invariant - arena isolation: a batch wrote only the arena its ke | §3.10 arena-isolation row (+ raised parts) |
| KERNEL-0346 | home | Invariant - seed tiling on a transient arena: the union of its f | §3.10 seed-tiling row (storey extents cited to §2.6's plan rung steps 4 and 6, RESTATEMENTS-019) |
| KERNEL-0347 | home | Invariant - face corners >= minFaceAngle. Class: soft for mandat | §3.10 (kept) |
| KERNEL-0348 | home | Invariant - Euler characteristic per level: V - E + F = 1 + comp | §3.10 (kept) |
| KERNEL-0349 | home | The §3.10 rows are the kernel part of the §5.3 invariant suite.  | §3.10 closing paragraph (class floors via KernelTx.expect → §4.7; the O(touched) cost-model check) |
| KERNEL-0350 | home | Nesting admits no exception (J-A30.31): a passage under a buildi | §3.10 nesting paragraph (passage construction cited §2.5, §4.7 S10 (9), RESTATEMENTS-020) |
| KERNEL-0351 | reference | A sealed passage (item 30 (e)) keeps its face and its edges; the | REFERENCE → §2.5 Passage.sealed, §4.6 (RESTATEMENTS-021) |
| KERNEL-0352 | home | A building rooms (item 28) are never plat faces: they are cut on | §3.10 (kept) |
| KERNEL-0353 | glossary | Defined term lattice point: the integer-cm world grid point; eve | term: defined at §3.2 (1) (kept) |
| KERNEL-0354 | glossary | Defined term hot pixel: the 0.71 cm (sqrt(2)/2 cm) tolerance squ | term: defined at §3.3, §3.6 (kept) |
| KERNEL-0355 | glossary | Defined term range invariant: /x/, /y/ < 2^23 cm. | term: §3.2 (1) |
| KERNEL-0356 | glossary | Defined term minimum edge: 25 cm minimum edge length. | term: §3.2 (2) (value: §2.2 LatticeSpec) |
| KERNEL-0357 | glossary | Defined term attraction distance: 26 cm. | term: §3.2 (2) (value: §2.2 LatticeSpec) |
| KERNEL-0358 | glossary | Defined term minimum face angle: 5 deg = 500 centidegrees. | term: §3.2 (2) (value: §2.2 LatticeSpec) |
| KERNEL-0359 | glossary | Defined term class floors: per-class minimum width, area and ang | term: §3.2 (2) (values: §4.7 class-floor row) |
| KERNEL-0360 | glossary | Defined term transaction: an atomic batch of kernel ops at one l | term: defined at §3.3 (kept) |
| KERNEL-0361 | glossary | Defined term birth level: the level an item currently belongs to | term: defined at §3.3, §2.2 (kept) |
| KERNEL-0362 | glossary | Defined term kept content: finer faces made by a stage ranked be | term: defined at §3.3 (J-K14) (kept) |
| KERNEL-0363 | glossary | Defined term clear region: the footprint of a coarse insertion i | term: defined at §3.3 (kept) |
| KERNEL-0364 | glossary | Defined term prepared contact: a vertex a preparation batch plac | term: defined at §3.3, §3.6 (kept) |
| KERNEL-0365 | glossary | Defined term contact name: an anchor vertex role row placed by s | term: defined at §3.3 rule 2 (kept) |
| KERNEL-0366 | glossary | Defined term commit record: per-batch result listing the dirty s | term: defined at §3.3 (kept) |
| KERNEL-0367 | glossary | Defined term declared form: op set applied in canonical order. | term: defined at §3.3 (kept) |
| KERNEL-0368 | glossary | Defined term callback form: ops issued by fn and applied in issu | term: defined at §3.3 (kept) |
| KERNEL-0369 | glossary | Defined term canonical order: stable key sort (op kind rank, lin | term: defined at §3.3 (kept) |
| KERNEL-0370 | glossary | Defined term overlay: a copy-on-write layer over an arena. | term: defined at §3.3, §3.4, §3.7 (kept) |
| KERNEL-0371 | glossary | Defined term frozen base: the read-only arena copy sent to pool  | term: defined at §3.3 pool step 1 (kept) |
| KERNEL-0372 | glossary | Defined term scope (district): faces, edges and vertices a pool  | term: defined at §3.3 pool step 3 (kept) |
| KERNEL-0373 | glossary | Defined term static partition: flatbush packed index partition w | term: defined at §3.3 (kept) |
| KERNEL-0374 | glossary | Defined term dynamic grid: per-level uniform grid index with O(1 | term: defined at §3.3 (kept) |
| KERNEL-0375 | glossary | Defined term tombstone: item key (kind * 2^32 + slot) filtered f | term: defined at §3.3 (kept) |
| KERNEL-0376 | glossary | Defined term home column: per-slot partition number (Plat.indexH | term: defined at §3.3 (kept) |
| KERNEL-0377 | glossary | Defined term route edge: a maximal run of a level sub-edges betw | term: defined at §3.3 (kept) |
| KERNEL-0378 | glossary | Defined term Steiner vertex: a finer vertex placed on a coarser  | term: defined at §3.3, §3.6, §2.2 rule 3 (kept) |
| KERNEL-0379 | glossary | Defined term promotion / demotion: lowering / raising a vertex o | term: defined at §3.3, §3.6 (kept) |
| KERNEL-0380 | glossary | Defined term split flag: flag on a vertex that split a run; clea | term: defined at §3.6 (kept) |
| KERNEL-0381 | glossary | Defined term kernel pinned flag vs held vs opts.pinned: three di | term: defined at §3.4, §3.6 (kept) |
| KERNEL-0382 | glossary | Defined term stretch: part of a chain between two of its vertice | term: defined at §3.4, §3.6 (kept) |
| KERNEL-0383 | glossary | Defined term knot / profile: ChainProfile knots carrying a varyi | term: defined at §3.4, §2.2 rule 5 (kept) |
| KERNEL-0384 | glossary | Defined term arena: one planar subdivision (a plat or a transien | term: defined at §3.4 (kept) |
| KERNEL-0385 | glossary | Defined term transient arena parts: seed rings, fixed rings, fix | term: defined at §3.4 (kept) |
| KERNEL-0386 | glossary | Defined term chain class: mandatory (never fails for precision)  | term: defined at §3.6 (kept) |
| KERNEL-0387 | glossary | Defined term antenna: a dangling chain inside a face. | term: defined at §3.6, §3.2 (9) (kept) |
| KERNEL-0388 | glossary | Defined term slide / re-seat: placement-rule seating of a vertex | term: defined at §3.6 (kept) |
| KERNEL-0389 | glossary | Defined term whole-step validation: validation of a whole warp s | term: defined at §3.6 (kept) |
| KERNEL-0390 | glossary | Defined term sliver / residue: a face below its class floor; kep | term: defined at §3.6 (kept) |
| KERNEL-0391 | glossary | Defined term kerb: F minus the union of spine buffers; also the  | term: defined at §3.7 (kept) |
| KERNEL-0392 | glossary | Defined term corridor parts: half-corridor strip, junction wedge | term: defined at §3.7 (kept) |
| KERNEL-0393 | glossary | Defined term chamber: a closed chamber_wall chain enclosing a vo | term: defined at §3.7 (kept) |
| KERNEL-0394 | glossary | Defined term oracle: Clipper2 / polygon-clipping used only for C | term: defined at §3.7 (kept) |
| KERNEL-0395 | glossary | Defined term accelerator: a WebAssembly compilation of one hot l | term: defined at §3.7 (kept) |
| KERNEL-0396 | glossary | Defined term arrangement engine: the kernel own boolean/buffer e | term: defined at §3.7 (kept) |
| KERNEL-0397 | glossary | Defined term skeleton uses and downgrades: roof/spine/regions an | term: defined at §3.8 (kept) |
| KERNEL-0398 | glossary | Defined term convex near-rectangle test: convex, four OBB corner | term: defined at §3.8 (kept) |
| KERNEL-0399 | glossary | Defined term snapshot block and chunks: one geometry block per P | term: defined at §3.9 (kept) |
| KERNEL-0400 | glossary | Defined term frame: the map rectangle; arena = frame + margin. | term: defined at §3.2 (9) (kept) |
| KERNEL-0401 | glossary | Defined term work limit: operation-count budget per transaction. | term: defined at §3.3 (kept) |
| KERNEL-0402 | glossary | Defined term placement rule: lattice-point choice for vertices p | term: defined at §3.6 (kept) |
| KERNEL-0403 | glossary | Defined term attraction: moving new geometry onto existing geome | term: defined at §3.6 (kept) |
