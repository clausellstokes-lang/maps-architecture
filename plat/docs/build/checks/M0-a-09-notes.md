# M0-a-09 — the checker's minor notes (for the hardening milestone M4)

Lane `check/M0-a-09`, 2026-10-06. These notes do not fail the item (J180, N-45). The two blockers, B-1 and B-2, are in
`checks/M0-a-09.md`, which also defines the mutant ids (K…) and probe ids (P…) used below.

1. **KI-1 (N-45) — the dangling antenna, copied from C-0212 (8) and C-0218 (5) at the author's request.** On an
   attracted corridor case, a committed face ring can hold a two-point loop: a short kerb or corridor_split edge left
   dangling into the face. That is arena-legal (§13.1's antennae), a valid result short of ideal, and not a refusal. The
   agreement counts it as `dangling-attracted`, with no pass/fail bar. This seat's unseeded PR-size run counted 26 per
   10⁴ corridor cases (the author measured 27, then 17), every one attracted. Repro: run
   `testkit/test/kernel/arr-bands/agreement-corridor.test.ts` with `--silent=false` and read the `notes` field; each
   case's input is the `corridorCaseArb` draw. Hardening: draw the split only where the commit kept its kerb end, or
   remove the dangling edge in the same batch.
2. **K06 / K36 — C-0212 (4)'s turn-away junction and the splice are reached by no test.** A junction where F turns away
   (two different spines meeting at a bend, or a third edge declaring no half-width) gets one split from J to the
   nearest kerb point. B-FUZZ, the random-network property and the agreement draw straight chords only, so no face
   reaches this path. P20 and P23 show it valid and S8 ≡ S9-exact. B-1's required fixture covers the splice. Pinning the
   split's end there as well would kill K06 (the turn-away treated as a corner) and K36 (the splice threshold).
3. **K34 — the near filter's margin is untested.** `spineParts` keeps a spine segment whose box lies within
   2·half-width + sagitta + 4 cm of F's box. With the reach at 0 the mutant survives. It differs only where a
   non-bounding segment of a bounding spine passes within its half-width of F's box without touching it, which takes
   two near-parallel streets closer than a half-width (a contrived escape). Suggested fixture: a way that bounds F,
   leaves F's boundary, and runs back parallel to F's far side 1 cm farther than F's box, inside its half-width.
4. **K35 — the boundary tolerance for "a kerb edge on F's boundary" is not pinned.** `ON_BOUNDARY_SQ = 1` (1 cm). A
   10 cm tolerance survives the near tests at 1000 and B-FUZZ + the corridor agreement at 10⁴. A kerb edge 1 – 10 cm from a no-half-width
   boundary is within `attractCm` and lands by attraction either way. Suggested fixture: a kerb parallel to a shore at
   5 cm, asserting the kerb edge is inserted.
5. **K05 — `unspiked` has no deterministic fixture.** At 1000 cases nothing meets a zero-width spike, so disabling it
   survives the near tests. It also survives B-FUZZ + the corridor agreement at 10⁴, and probe P24 (450 slivers of
   1 – 30 cm folded onto the frame) finds no spike on S5's insertChain, with or without the guard. The author also reports no deterministic spike fixture (C-0212 (8) found the
   class at PR size). Suggested fixture: the PR-size seed that produced a spike, kept as a register row.
6. **The tileRings judge accepts every attracted overlap refusal.** §13.1 allows a refusal on an attracted case only
   where the oracle's result has a hole or two of its boundary parts lie within `attractCm`. `judgeTile` settles any
   attracted `overlap` without checking either condition. P3 (10⁴ cases) found 3 attracted refusals, each with an oracle
   hole, so nothing escaped in practice. Suggested hardening: check the oracle result for a hole or for parts within
   `attractCm`.
7. **The corridor agreement loses 4 % of its draws as `input-refused`, with no ceiling.** P21 found 366 of the 416 per
   10⁴ to be the judge's own chord leaving its frame (reach = diagonal + 400 cm against a 20 000 cm margin; insertChain
   then refuses `E_LEVEL a new edge of an L1 batch lies outside …`). That is about one chord case in eight, mostly large
   polygons. The vacuity guard still holds (2 164 unattracted ≥ 1 000). Suggested hardening: clamp the chord to the
   frame, and cap `input-refused` and `not-united` in `verdict`.
8. **The agreement classes refusals by detail prefix, not by replay (C-0218 (3)).** An own refusal carrying an
   `insert: …` detail would be counted as insertChain's there. The kernel B-FUZZ's replay does catch it (mutant K28 was
   killed by B-FUZZ and the register), so the bar holds. Only the agreement's own tally is weaker.
9. **`BandResult`'s strips and wedges are classed by how many spines bound a face.** With a half-width below
   `attractCm` (P5: 20 cm), the narrow strip is attracted onto its spine, and every band face of the crossing is classed
   a wedge (strips 0). Likewise, a corner whose foot falls within `attractCm` of J leaves a wedge bounded by one spine,
   which is classed a strip. The arena is valid. S9 (M1) reads these lists for its Corridor and Junction entities, so M1
   should know that half-widths below `attractCm` blur the split.
10. **insertChain-class refusals are capped nowhere in this item's tests (N-46 (5): PENDING-S5).** This seat's PR-size
    run measured B-FUZZ kerb 6, corridorUnion 9, bandUnion 7, tileRings 1, and corridor agreement 1. In the register,
    62 of 323 are still refused, all insertChain's. Each must be asserted per family against S5's residual + margin once
    S5's closing check records it (the session's step).
11. **The random-network property (`corridor.test.ts:129`) is looser than the agreement.** On attracted cases it bounds
    |area difference| rather than the symmetric difference. It also accepts any number of `E_KEPT` and `E_INVARIANT`
    refusals, which B-FUZZ caps instead. The agreement carries the strict comparison, so this is a nice-to-have.
12. **A vacuous line: `kerb.test.ts:181`.** `expect(normal([pt(0, 2300), …])).toBe('0,2300 4000,2300 4000,4000 0,4000')`
    normalises a literal ring and tests no output of the code. The test's other assertions carry it.
13. **The generators' reach.** B-FUZZ and the random property draw straight frame-to-frame chords: no dead-end
    antennae, no bent spines, no turn-away junctions. The agreement draws a closed ring way plus a straight chord with
    one scalar half-width: no profiles, no square ends, no dead ends. The kernel fixtures pin profiles, square ends and
    one antenna exactly. B-FUZZ also checks each kerb ring is simple, but not that holes are clockwise inside an outer
    ring.
14. **Kept content (C-0212 (6)) refuses more widely than §3.7.** Any finer face of an earlier stage inside F refuses
    `E_KEPT`, even far from every kerb, where §3.7 refuses only an edge that would cross one or come within `attractCm`
    of it. The design's nesting is staged to M3a, with a choices row, and the one-click order makes no such input at M0.
    For M3a.
15. **Cost.** `bandCore`'s read-back scans every face slot of the batch's level in the arena (O(arena) per call, not
    O(touched)). For the timing phase's one-district ≤ 3 ms bar (§3.7 (ii)), measured by M0-t-00 / M0-t-01, not here.
16. **Housekeeping, for the session.** `plat/undefined.cur` (599 bytes, dated 2026-10-05 00:09, an M0-a-08-era
    agreement-case dump) is an untracked file at `plat/`'s root and is in no record. It is not this item's. C-0218 is
    dated 2026-10-05 but sits after C-0217, dated 2026-10-06 (cosmetic).

## Closing check (lane `check/M0-a-09-close-r1`, 2026-10-06)

17. **Note 2 is closed by fix round 1.** The turn-away fixture beside §13.2's S8 ≡ S9 test
    (`corridor.test.ts:129`) now kills K06 (the turn-away treated as a corner) and K36 (the splice threshold). Both
    fail on that test in this seat's mirror at `PLAT_FUZZ_RUNS=1000`. No handling is left.
18. **R04 — the order and spike drop of kerb()'s final rings are not pinned.** Mutant R04 removes `readKerb`'s last
    `unspiked` pass and its `sort(compareRings)`. It survives `corridor.test.ts` and `kerb.test.ts` at 1000, because
    `normals()` re-normalises every comparison, and kerb() and the commit read the same rings (so S8 ≡ S9 still holds).
    The spike half is note 5's class. The order half is a cosmetic contract: the module promises rings counter-clockwise
    from the lowest-leftmost vertex in `compareRings` order. Suggested hardening (M4): one raw `toEqual` on kerb()'s
    output for the turn-away face, where the splice inserts a vertex.
19. **The turn-away fixture pins insertChain-dependent coordinates.** These are the spliced vertex `2308,1823` and the
    three `corridor_split` edges. They are lattice results of insertChain's routing. A later legitimate insertChain round
    (M0-a-05's) may move them by a lattice step. That is a re-pin with its cause stated, not a defect of this item. The
    S8 ≡ S9 line (`:166`) is coordinate-free and carries the contract. Note 12's vacuous line has moved to
    `kerb.test.ts:204`.

## Closing check of session fix round S1 (lane `check/M0-a-09-close-s1`, 2026-10-08)

The mutant ids (X…) and the differential probe are defined in `checks/M0-a-09-s1.md`. The blockers of this check are
there. These rows do not fail the item (N-45).

20. **X01 / X04 / X06 — the corner flag's reach and the corner vertex's reach are each redundant to within
    `attractCm`.** Removing the reach from `junctionsOf`'s corner flag (X01), putting the flag back to the orient2d sign
    (X04), or accepting the corner's kerb vertex wherever it lies (X06) each changes 1 of the probe's 4 977 faces, and
    every split drawn stays within its junction's reach: the other check catches the rest. Each one alone is equivalent
    up to an `attractCm` margin. Together (X07) they are not; X07 is a blocker in the s1 file. Hardening (M4): none
    owed beyond the s1 file's reach pin.
21. **X11 — the spliced kerb point is left in the kerb when the guard drops its chain.** The mutant keeps the vertex.
    It changes the kerb's vertex list on 385 of the 4 977 faces, by a dent of at most the hot pixel (the snapped point
    sits ≤ 0.71 cm off the kerb edge; for example chord case 43 face 3 keeps `3253,3690` on the edge
    `0,404 – 3274,3711`). S8 and S9 read the same function, so they still agree. Suggested hardening (M4): a fixture
    where the guard fires (chord case 43 face 3 of the probe) asserting the kerb equals the kerb with no splice.
22. **KI (N-45) — a junction whose corner chain the guard drops gets no split at all.** After `entersRegion` rejects
    a corner chain, `splitChain` does not try the straight-through aim, so the junction draws nothing. The strips of
    the two streets and the corner's wedge then commit as one band face. The blocks stay exact. This row records the
    quality side; s1 file line 4 covers the record. Repro: chord case 43 face 3. The kerb's acute tip
    `3274,3711` lies 29.5 cm from the inner edges' meeting point `3253.7,3689.6`, which is beyond `attractCm`, so the
    splice lands on the edge 29 cm short of the tip and the wedge crosses the tip. Suggested handling: retry the
    straight-through aim after a guard drop, or take the kerb's own vertex nearest the meeting point within reach.
    Milestone: the M0 hardening phase (J237/J238), because it touches S9's band partition before M1 reads it.
23. **Note 22 is closed by C-0281 (1); the residue is counted (check/M0-a-09-close-s2).** `splitChain` now tries the
    next target after the guard drops a candidate, and chord case 43 face 3 draws `3915,3645 3241,3677` (pinned in
    `widthstep.test.ts`). This seat's instrumented mirror on the s1 probe's 4 977 faces counted 13 316 junctions, 664
    dropped candidates (471 by the guard, 193 that snap to one point), 449 junctions drawn by a later target and 100
    junctions with no split after a candidate. Of those 100, 92 had only collapsed candidates (the kerb passes through
    J, C-0281 (2)) and 8 had every target dropped by the guard. Fusion seed 1 at CITY: 3 guard drops, all 3 redrawn;
    integrated seed 1 at the test size: none. The blocks stay exact at the 100. Milestone: the M0 hardening phase
    (J237/J238), as C-0281 (1) records.
24. **XR1 — the retry after the first corner target is not pinned (check/M0-a-09-close-s2).** The mutant returns no
    split when the guard drops the wedge through the kerb's own vertex near the meeting point (C-0281 (1), target (i)),
    instead of trying the spliced point and the straight-through aim. It survives `kernel/test/arr/bands`
    (widthstep, kerb, corridor, band), B-FUZZ and the corridor agreement at 1 000. On the probe it changes 14 of 4 977
    faces (1 chord face, 13 polygon faces), each by losing one split, for example chord case 214 face 4
    (`3746,3936 3834,3790`) and polygon case 158 face 1 (`7128,11916 7342,11617`). The outcome is the "no split"
    behaviour that the s1 file's line 4 allowed as a counted KI, so the blocks stay exact and it is not a wrong result.
    The retry after target (ii) is pinned (XR2 and XR are killed by chord case 43 face 3). Suggested hardening: one of
    those two faces as a fixture asserting the redrawn split. Milestone: the M0 hardening phase (J237/J238).
25. **XF / XG — the end-beyond-reach fallback in `spliceAt` (check/M0-a-09-close-s2).** When the kerb edge's end
    within `attractCm` lies beyond reach, `spliceAt` splices the point itself if it lies at least `minEdge` from that
    end. XF (always refuse there) changes none of the 4 977 probe faces, so it is equivalent on the probe, as C-0281 (2)
    says. XG (splice even within `minEdge` of the end) changes 1 face: chord case 1046 face 2 draws
    `110,181 33,47 30,49` instead of `110,181 158,132`, within reach either way, a chain whose last two points lie 3.6 cm apart.
    That is a quality gap with no safety effect. Hardening: none owed beyond a fixture if the hardening phase wants
    one (M4).

## Closing check of session fix round S3 (lane `check/M0-a-09-close-s3`, 2026-10-12)

The mutant ids (K0, C1 – C12) and the probes (`zz-s3sweep`, `zz-s3net`) are defined in `checks/M0-a-09-s3.md`. The
blockers of this check are there: line 1, the far-pin closing, and line 4, bandUnion 2 → 3 at seed 1012. These rows
do not fail the item (N-45).

26. **C5 / C10 / C12: the closing at a piece's FIRST end is not pinned by the item's dead-end tests.** Three mutants
    survive `deadend.test.ts`, `corridor.test.ts` and `agreement-corridor.test.ts` at 1 000:
    * C5 closes only the last end;
    * C10 checks the post-condition at the last end only;
    * C12 inserts the first end's chord tip-first.

    First-end closings do occur in B-FUZZ: at seed 20261011, kerb 2 of 2 closings and band 8 of 28. So C5 would turn
    them into E_INVARIANT refusals. B-FUZZ's own cap at the PR size probably catches that (PLAUSIBLE; this seat did not
    run B-FUZZ on the mutants).

    Suggested handling: one first-end fixture (for example seed 20261011 case 3140 once line 1's fix places its contact)
    asserting the closing and the post-condition at end 0. Milestone: with line 1's fix round, else M4.
27. **C7 / C9 / C8 / C6: `pinContact`'s guards and the degenerate-chord skip are not pinned.** Four mutants survive
    the same kill set at 1 000:
    * C7 drops the onBoundary check on the route piece's ends;
    * C9 drops the lookup of a vertex already at the contact;
    * C8 refuses a degenerate chord instead of skipping it;
    * C6 also closes ends with two edges (the builder's K6).

    C9 and C8 fail safe either way. C7 widens what line 1's far-pin fallback can reach. Suggested handling: line 1's
    fix rewrites `pinContact` (accept only a vertex at the contact); pin it with a contact whose nearest route piece
    leaves F's boundary. Milestone: with line 1's fix round, else M4. C11 (`ends[k]` not updated) is equivalent: after
    a chord the tip has two edges.
28. **Routed to the session: corridorUnion blocks beyond 2·√2·attractCm where no closing ran (predates S3).**
    `zz-s3sweep` measures the sampled Hausdorff distance between each face's committed blocks and kerb(F).
    * More than 73.5 cm on 29 (K0) / 28 (round) of 10⁴ networks at seed 1012, and 26 / 26 at seed 20261011. Both
      engines give the same distance on each such network.
    * Seed 1012 case 2392: 337 cm. Case 2577: 574 cm.
    * Case 367: 103 cm, kerb `(1907,0) (1919,22) (1717,12)`, block `(1820,17) (1906,0) (1918,22)`, with one kerb
      edge with one face on both sides, `1717,38→1820,17`.
    * The cases marked `inf` (a face with a kerb and no block) are not classed. Some may be C-0218 (7)'s folded
      slivers, committed whole-band by design.

    C-0327 (3) routed this class (KI-1 spurs, sliver ends) to the hardening census. This row adds the seeds. It is not
    S3's, and it is not judged here as a fail of the round. Suggested handling: M0-x-01's census classes each case as
    folded-sliver (by design) or wrong union (a defect, MAKE-IT-SUCCEED). Milestone: the M0 hardening phase
    (J237/J238).
29. **C-0327 (3)'s 96 cm example is this round's own closing, not a pre-existing union.** Seed 20261011 case 3140 is
    C-0327 (3)'s network `[{"a":11336,"b":7968,…},{"a":4005,"b":11071,…},{"a":9,"b":7960,…}]`, face 5.
    * The closing log: tip `(1050,3971)`, contact `(1050,3996)`, a 25 cm chord. `splitThrough` fell back onto
      `(954,3997)`.
    * The block is 96.01 cm beyond kerb(F), at that vertex. K0 gave 221.7 cm on the same face.

    Suggested handling: C-0327 (3) is corrected by line 1's fix round, which re-measures that network. Milestone: with
    line 1's fix round.

## Closing check of session fix round S4 (lane `check/M0-a-09-close-s4`, 2026-10-13)

The mutant ids (N1 – N14) and the probes (`zz-s4sweep`, `zz-s4net`, `zz-s4pin`) are defined in `checks/M0-a-09-s4.md`.
This check's one blocker is there: N13, line 1's "where neither works, refuse E_INVARIANT" clause not pinned. These
rows do not fail the item (N-45). Note 26's first-end closing is now pinned: seed 20261011 case 3140 closes its end 0
along the run.

30. **N12: the retry into the pinned-first path is not pinned.** The mutant makes `closeEnds` refuse E_INVARIANT
    where it now asks for a re-run with the end pinned first. It survives `deadend.test.ts` and `corridor.test.ts`. It
    gives the same outcome on all 72 closing networks of seeds 1012 and 20261011 (10⁴ each). The families never reach
    the retry: 0 `pinned` closings. The pinned-first test enters through the `pinFirst` seam, not through the retry.
    The mutant's effect is a fail-safe refusal of lawful input.

    Suggested handling: a fixture (or a `pieces`-seam plant) whose along closing cannot go in, so `closeEnds` itself
    asks for the re-run and the pinned-first closing commits. Milestone: M4 (hardening), or with the fix of N13.
31. **N2 / N3 / N6: three of the closing's guards are not pinned.** Each survives the item's tests, and each gives the
    same outcome on the 72 closing networks.
    * N2 makes `ALONG_SQ` unbounded. That is equivalent in practice: the insertion's displacement is bounded by N-43,
      and the largest tip seen was 73.01 cm (seed 1012 case 9034).
    * N3 accepts the strict pin within attractCm, not (1 + 0.71) cm. No placement on the families lands 1.71 – 26 cm
      off its contact. If one did, the error would stay ≤ attractCm.
    * N6 drops `runVertex`'s "no other contact between" check. If that were reached, an along chord could pass another
      piece's contact. B-FUZZ's `closingsBeyond` would not see that, because the run vertex would still be on kerb(F).

    Suggested handling: a synthetic face with two contacts on one route piece (a dead-end lane's cap clipped against a
    spineless edge, its tip needing the along closing toward the other contact) for N6; a seam placement 5 – 20 cm off
    the contact for N3. Milestone: M4.
32. **The module comment overstates the along closing's bound.** `bandUnion.ts`'s header says the along chord "lies
    within the tip's distance of that run, so the outline errs by at most attractCm + 1 cm". `ALONG_SQ` admits tips up
    to 2·√2·attractCm, and the families reach them:
    * seed 1012: 2243 (61.4 cm), 4482 (55.0), 6318 (49.4), 7799 and 8072 (40.8), 9034 (73.0);
    * seed 20261011: 2621 (47.2), 2810 (70.3).

    The measured errors are within N-52 (1)'s bar and below K0's (9034's band block 47.6 cm against K0's 145.7; 6318's
    32.8 against 143.7). The displacement is the insertion's, and the closing keeps it. Only the comment is wrong.

    Suggested handling: the comment reads "at most the tip's offset (≤ 2·√2·attractCm, N-43)". Milestone: with the next
    round on the item, else M4.
33. **The at-contact closing never stands on the families.** In 2 × 10⁴ B-FUZZ networks, 0 of 63 closings are `chord`.
    62 are `along`, and 1 is `folded` (seed 1012). On these lawful slivers the placement never lands within the hot
    pixel of the contact. Only faces 871 / 822 (the integrated seeds) exercise the at-contact branch.

    Suggested handling: none needed now. Re-read the share when M0-c-06's corpus re-runs. Milestone: M0-c-06's re-run.
34. **Routed to the session: lawful-input refusals and blocks beyond the bar, unchanged by round S4.** Per 10⁴ B-FUZZ
    networks:
    * Refusals. corridorUnion 16 / 16 and bandUnion 2 / 3 (seeds 1012 / 20261011). Every one is insertChain's
      `insert: no route … within the fidelity bound (N-43)`, identical on K0. LAWFUL, verdict MAKE-IT-SUCCEED, in
      insertChain's class (N-44 / N-46 cap). Seed 1012 case 2243 and seed 20261011 case 8859 are among them, each with
      an along closing in the refused run.
    * Note 28's class. corridorUnion blocks beyond 73.5 cm where no closing decides them: 25 / 25 (K0 29 / 26). One
      example is seed 1012 case 2681, face 0: 142.4 cm on both engines.
    * Dangling spurs. corridorUnion dangling kerb 2 / 6 and bandUnion dangling band 3 / 0, where no closing ran (C-0212
      (8)'s KI). Examples are seed 1012 cases 231, 2898, 4372, 5761 and 6189.

    Suggested handling: the session's hardening census (KI-1, note 28). Milestone: M0 hardening phase.

## Closing check of session fix round S6 (lane `check/M0-a-09-close-s6`, 2026-10-14)

The mutant ids (Z1 – Z15) and the probes (`zz-c6census`, `zz-c6fusion`, `zz-c6tee`, `zz-c6refused`, `zz-c6z3cu`) are
defined in `checks/M0-a-09-s6.md`. This check's two blockers are there: Z3 (C-0380 (2)'s "where the edge spines' kerb
refuses, the read refuses as before" not pinned) and Z5 (the reach test's larger end half-width not pinned for a
profile band). These rows do not fail the item (N-45).

35. **Z9: the staged read's post-condition is not pinned in `readKerb`.** `clearOf` itself is pinned by its unit test,
    but the mutant that drops the `st.through.every(clearOf)` guard (the builder's S3) survives the NEAR set at 1000. On
    the 87 faces this seat's census saw refused (register, B-FUZZ 1012 and 20261011, 10⁴ each) it gives the same outcome
    as the tree: the guard never fires on the families. By §3.7's attraction bound the staged region (F − E) − V moves a
    boundary point at most √2 · attractCm, so the guard is a defensive assertion of that bound (20261011 network 2182
    stands 32.8 cm in, the bound 38.8 cm).

    Suggested handling: a planted staged result (a seam, as `pieces` / `pinFirst` are) deeper than the move bound,
    expected refused with the one overlay's refusal. Milestone: M4 (hardening).
36. **The tree's kerb keeps thin slivers inside a vertex-only band, along F's boundary.** This seat's census found kerb
    vertices more than 39 cm into a vertex-only band on 1 register face, 14 B-FUZZ-1012 faces and 8 B-FUZZ-20261011
    faces; every one lies within 27 cm of F's own boundary (none farther). Examples: refusals.json row 116 face 2, a
    ring `(0,1760) (14,1781) (0,2383)` 14 cm wide along the frame ending on the contact vertex `(0, 2383)`, way:0's
    centreline (578 cm deep; before J318 the whole face was its kerb); B-FUZZ 1012 draw 6317 face 2, an 8 cm sliver 276
    cm deep; draw 2862 face 2, a 27 cm sliver 227 cm into way:2's profile band. These are C-0212 (8)'s class (a strip
    thinner than attractCm the overlay's attraction folds onto F's boundary), which S9's folding (C-0218 (7)) handles;
    J318 shrank them (the pre-J318 kerb there was the face). Not a corridor overlap beyond the attraction envelope.

    Suggested handling: the hardening census reads kerb slivers inside any band (edge or vertex-only) with their width
    and depth; a sliver wider than attractCm would be a defect. Milestone: M4.
37. **Z6: the vertex census over a hole's route vertices is not pinned.** The mutant that reads the outer ring's
    route vertices only survives the NEAR set at 1000 and is outcome-identical on fusion seed 33 (every kerb read and
    all 1 026 blocks byte-equal: no face with a hole was read) and on B-FUZZ (chords across the frame make no holes).
    The design's census is every route vertex of F's rings (C-0380 (1)).

    Suggested handling: a hand-built face with a hole whose ring meets a wide way at one vertex (a road entering the
    island at its corner), kerb(F) clear of that way's band. Milestone: M4.
38. **C-0380's self-check label for V6 (= this check's Z3) rests on a false premise.** It reads "a refusal path the
    families never reach with a vertex-only contact". The census reaches it on refusals.json rows 142 / 143 (face 1) and
    B-FUZZ seed 20261011 draws 1000 (face 1) and 4776 (face 0), where V6 / Z3 commits the face as all band. Blocker 1 of
    `checks/M0-a-09-s6.md` carries the required change; this row only corrects the record.

    Suggested handling: C-0380's self-check sentence restated with the blocker's test. Milestone: the next round on the
    item.
39. **C-0381 (5)'s corridorUnion change count differs from this seat's on the same draws.** C-0381 (5): corridorUnion's
    outputs changed on 260 / 243 / 26 networks (1012 / 20261011 / register). This seat, comparing the committed blocks'
    normal forms and the band-face count, counts 496 / 491 / 40; the kerb counts agree (512 / 504 / 47). Whatever the
    measure, every changed corridorUnion network has a changed kerb with a reaching vertex-only chain (0 exceptions),
    so line 2's claim holds; only the reported figure is in question.

    Suggested handling: C-0381 (5) names its measure. Milestone: the next round on the item.

## Closing check of fix round S7 (lane `check/M0-a-09-close-s7`, 2026-10-14)

40. **Z5c: the reach test's "larger end" is pinned in one direction only.** The S7 pin (B-FUZZ seed 1012 draw 4102
    face 0) has way:0's wider end (479 cm) at the segment's END point, so a mutant that reads only the segment's end
    half-width (`line.hw[(k + 1) % n]` for `Math.max(...)`, kerb.ts's `reaches`) survives `vertexcontact.test.ts`
    (16/16 in this seat's mirror), while the start-only (Z5b) and smaller-end (Z5) mutants are killed. Not judged
    against the families (outside this re-check's confirm-only scope); PLAUSIBLY non-equivalent by symmetry (a profile
    band wider at its start). Suggested handling: the same case with the chord reversed (wider end first), or a
    hand-built profile spine in each direction. Milestone: M4 (hardening), unless the next round on the item takes it.

## Builder of session fix round S9 (lane `build/M0-a-09-fix-s9`, 2026-10-19) — returned BLOCKED

41. **BLOCKER: the dry-run's own refusals exceed N-44 (3)'s cap.** kerb(F) read on the real arena (C-0417) refuses
    through the item's own post-conditions where the found tree refused only through insertChain ('insert: no route'):
    census at 10⁴ (kerb / corridorUnion / bandUnion) 20261011 10/16/3 → 11/16/15, 1012 15/16/2 → 8/11/4; refusals.json
    still refused 36/39/13 → 1/5/19 (bandUnion own 19). Classes: (a) `KEPT_DEEP` — a run end given on a window line (F's
    own edge) placed off its point by the insertion (attracted onto other content within attractCm, or §3.6's placement
    fallback), the part's face left unclosed and its interior read with the kept region (1012 draws 3070, 3186, 4722,
    6167; 20261011 draws 348, 8563, 8859; bandUnion's L3 read beside S9's committed kerb, 20261011 draws 2542, 2810, 4132,
    4241, 6059, 6816, 6826, 7033, 7448, 7779, 8162, 8898, 1012 draws 2029, 5696, 6219, 8006); (b) `CENSUS_DEEP` — a band's
    cut across a neck of F narrower than minEdge, its run collapsed or merged (20261011 draws 1426, 4506, 8457, 8556,
    9046, 9182, 9207; 1012 draws 3607, 3729, 9034, 9605: the pre-S9 scratch overlay was silently wrong on six of them,
    depth 236–524 cm); (c) `UNLAID_DEEP` — a run no route laid crossing a face beyond N-43's move (20261011 draw 1525).
    Without `keptClear` the counts drain (8/13/3, 4/7/0) but class (a) reads are silently wrong kerbs (N-45 (a)), and
    (b)/(c) still exceed the cap. Every input is LAWFUL (B-FUZZ chords); verdict MAKE-IT-SUCCEED needs a construction the
    round does not have (closing a displaced run end inside the read; a cut across a sub-minEdge neck). Needs the
    session's ruling: (i) class these as insertChain's (the cause is the insertion's placement / attraction / minEdge),
    counted against its measured cap; (ii) authorise the construction; (iii) revisit the dry-run. Milestone: this round.
42. **bfuzz.test.ts judges bandUnion's closings against an L1 read.** `kerbOf(…, false)` reads in an L1 batch, while
    bandUnion's own read is a dry-run in its L3 transaction beside S9's committed kerb, so a closing by that read can sit
    off the L1 read's kerb (PLAT_FUZZ_SEED 1012: face 1 piece 0 end 1 contact (10, 1233) pin (29, 0) "the run's vertex
    off kerb(F)"). The judge should read in an L3 batch before bandUnion commits. Milestone: the round that lifts 41.
43. **The dead-end cap's sector beside a lane's end stays in the block (attracted).** The cap's clip point on the
    spine-less edge stands 25.96 cm from the strip's corner the read laid first and is attracted onto it; the piece
    closes at the lane's end E by the strip's end edge, and the sector (≤ attractCm wide along F's edge, to 157 cm long)
    stays kerb — S8 ≡ S9 hold (corridor.test.ts's dead-end case, the deadend sweeps: 548/556 exact, the rest within N-43;
    nearLast 0). A run-on construction (ends carried 2·attractCm past the window, fallback on refusal) and a window
    offset 60 cm restored the chord but met neighbours' kept content (E_KEPT) and the L0 frame. Milestone: M4.
44. **N-57 (2)'s closing mechanisms are rarely reached under the dry-run.** At 1012 over 10⁴ networks: 3 along
    closings, no chord, pinned or folded; the old pins moved (3186 / 3140 no closing; 367 kerb(F) empty). Kept pinned:
    the along closing on 1012 draw 2243, the pinFirst refusal on 20261011 draw 1110 (face 0, contact (15, 887)), the
    pinned fallback and the lost chord on fixture 871. The folded kind has no reaching input (the `pieces` seam meets
    kerb(F) = [] first). Milestone: M4.
45. **replayKerb (replay.ts) does not replay `sharedPath`.** The replay lays each part's runs as clipped, so a refusal
    of a run laid along an earlier part's held edges may replay differently. Milestone: the round that lifts 41.
46. **DECLARED SHIFT (J260 (3)): the moved pins of this item, each with its attractor.** Measured over 3 455 changed
    reads (the lane's mirror, the scratch overlay against the dry-run on the same faces): new kerb vertices on F's own L1
    edge 3 447 (median 1.0 cm, p95 4.5 cm off the scratch's), within attractCm of an arena vertex 69, interior corners
    beside those cuts 328 (median 1.4 cm, max 85 cm), near F's edge 21. Re-recorded: widthstep.test.ts four junction
    pins (kerb corners 1–21 cm; the acute corner's (3979, 286) 21 cm from the L0 frame and its inner edge 17 cm from F's
    vertex (4000, 314) → a corner wedge; the guard-drop case's tip gone → a wedge) with each rule held on its recorded
    pre-S9 region; corridor.test.ts the dead-end chord (25.96 → 157 cm, row 43) and the bent block (one ring → two, a
    triangle at the frame); deadend.test.ts fixture 871 ((50557, −47030) → (50556, −47032) on F's L1 edge), the sweeps
    (nearLast ≥ 1 / ≥ 8 → 0), 3186 / 3140 (no closing; 3140's kerb holds the arena vertex (954, 3997)), 3070 (way:0's
    6 cm band folded onto F's edge: kerb(F) = F, `whole`), 367 (kerb(F) empty), 4722 (KEPT_DEEP, row 41);
    vertexcontact.test.ts the fusion fixtures (seed 3: (−1234, −76010) → (−1227, −76014), after (−1483, −76158) →
    (−1482, −76158), (−1601, −75786) dropped, depth 289.95 → 294.07; seed 33: (83180, −23209) → (83184, −23204), depth
    141 → 135.98; seed 44: (2339, 2855) → (2338, 2855), (2149, 2885) → (2148, 2885), after (2165, 3042) → (2164, 3042),
    depth 233.95 → 232.96) and the C-0380 (2) promise moved from 20261011 draws 1000 / 4776 (now read: the drain) to
    draw 1525. Another item's pins in the RELATED run were not measured (blocked first). Milestone: the closing check.
47. **The bandUnion L3 read meets S9's committed kerb.** Most of row 41's bandUnion refusals are KEPT_DEEP at L3: a band
    part's run end attracted onto an L2 kerb vertex within attractCm. Milestone: the round that lifts 41.
48. **Not measured in this round (blocked first):** the wall times of the read loop and of
    layout/test/infill/fabric/splitSeeds.test.ts (reported only), the memo's hit rate (repeated canonical inputs within
    one transaction), the self-check mutants, the RELATED run at PLAT_FUZZ_RUNS=1000. Milestone: the round that lifts 41.

### Continued under RULING J433 (the session, 2026-10-19 12:40; same lane) — the round lands

49. **RULING J433 applied: the refusal class follows the cause (rows 41, 42, 45 lifted).** kerb.ts names the place a
    post-condition refused at (`kerbCensus(p).refusedAt`: the part's index — its row `arr:dry:<i>` — and the point found
    deep in it; KEPT_DEEP from `keptDeep`, CENSUS_DEEP from `deepIn` with the vertex-only part holding the vertex,
    UNLAID_DEEP from the unlaid run), a diagnostic beside the arena as the census was; no read changes. replay.ts:
    `replayKerb` lays the parts as the dry-run does — clipped to the window, `layRun` giving a segment an earlier part
    laid through that part's held vertices (the dry-run's `sharedPath`, row 45), collapses and no-route runs recorded —
    and reads the refusing part's hold (`holdOf`): (a) `displaced` — an open run's end (on a window line) held off its
    input point, the distance and the level of the vertex it was held at (null: a vertex the dry-run made; a distance
    over attractCm printed `(fallback)`); (b) `merged` — two given points held at one vertex, or the run collapsed; (c)
    `no-route`; else `exact`. `classify`: insertChain's when insertChain alone meets the same code and detail (as before),
    or when the refusal is one of `POST_CONDITIONS` (KEPT_DEEP, CENSUS_DEEP, UNLAID_DEEP) and the part's hold is not
    exact, the part's input well formed; the item's own otherwise. The cause is printed in every REFUSAL / REGISTER line
    (`causeOf`) and tallied per operation in B-FUZZ's summary. One unit test per reading, `cause.test.ts` (a displaced
    end, a merge and a collapse, a no-route run, an exact hold that stays own; a non-post-condition and a malformed part
    stay own; the pre-J433 reading beside it; `layRun`'s shared segment). keptDeep and the other post-conditions stay
    (N-45 (a)). bfuzz.test.ts: bandUnion's closings judged against kerb(F) read in an L3 batch before it commits (row 42).
50. **The census at 10⁴ per operation, class and cause (J433 (4); Q90's measured rate).** The lane's mirror, the tree's
    code (labelPoint included, row 55), a probe of B-FUZZ's networks (`fc.array(chordArb, 1..3)`, draw numbers 1-based):
    PLAT_FUZZ_SEED 20261011 — kerb 10 (insertChain: displaced 3, merged 6, no-route 1; own 0) over 22 924 reads;
    corridorUnion 16 (insertChain: replays 6, displaced 3, merged 6, no-route 1; own 0) over 22 924 face reads; bandUnion
    8 (insertChain: replays 3, displaced 5; own 0) over 22 860 band reads. PLAT_FUZZ_SEED 1012 — kerb 9 (displaced 6,
    merged 3; own 0) over 23 092 reads; corridorUnion 12 (replays 3, displaced 6, merged 3; own 0); bandUnion 2
    (displaced 2; own 0) over 23 047 band reads. Own ≤ 1 per 10⁴ per operation: met (0). The rate of insertChain's
    refusals by the dry-run's post-conditions per 10⁴ band reads (bandUnion): 2.19 (20261011: 5 by displacement) and
    0.87 (1012: 2 by displacement); per 10⁴ kerb reads: 4.36 (20261011: 3 displacement, 6 merge, 1 no route) and 3.90
    (1012: 6 displacement, 3 merge). (Before labelPoint, the sitting's first census: 20261011 11/16/15, 1012 8/11/4 —
    some bandUnion refusals were faces labelled at a point on their boundary.) The mechanism (row 41's classes, now
    measured by cause): (a) a strip's run end given on F's L1 edge where that edge runs within minEdge of the L0 frame (a
    near-frame chord) — no vertex can stand there minEdge clear of the frame, and §3.6's placement puts it 25 cm
    (minEdge) into F, 26–91 cm where it falls back; at L3 the same along the frame; (b) a band's cut across a neck of F
    narrower than minEdge (the run collapses, CENSUS_DEEP); (c) one run with no route (20261011 draw 1525). Input kind
    LAWFUL (B-FUZZ chords; N-58): the verdict MAKE-IT-SUCCEED needs the construction J433 queues as Q90 (closing a
    displaced run end inside the read), not authorised in this round; meanwhile every case is a typed refusal, nothing
    written. Milestone: M4 (Q90).
51. **J264 (5)'s refusal counts, before → after (kerb / corridorUnion / bandUnion): drains everywhere but bandUnion on
    one seed (+5), every refused case insertChain's by cause under J433.** 20261011 10/16/3 → 10/16/8; 1012 15/16/2 →
    9/12/2; the register (refusals.json, still refused) 36/39/13 → 1/6/7. Drained (refused before, read or committed
    now): 20261011 kerb 1001, 4777, 5229, 6327, 6562, 6584, 7063, 7538, 7958, 8080; corridorUnion 1001, 4777, 5040, 5066,
    5229, 6327, 6562, 6584, 7063, 7538, 7645, 7958, 8080, 8898, 9521; bandUnion 7283, 7559, 8576; 1012 kerb 121, 729,
    2275, 2777, 2877, 3416, 3757, 3915, 4606, 5091, 5104, 5918, 6708, 9320, 9645; corridorUnion the same and 2243;
    bandUnion 835, 2609 (the pre-round census of the found code, the lane's 08:28 logs). New: 20261011 kerb 348, 1426,
    1525, 4506, 8457, 8556, 8859, 9046, 9182, 9207; corridorUnion 268, 348, 1426, 1525, 3119, 4506, 5395, 8457, 8556,
    8894, 9046, 9126, 9182, 9207, 9496 (8859 refused in both); bandUnion 715, 1087, 2810, 4241, 4912, 6059, 7033, 9039;
    1012 kerb 3070, 3186, 3341, 3607, 3729, 4722, 6167, 9034, 9605; corridorUnion 1947, 3070, 3186, 3341, 3607, 3729,
    4722, 4963, 6167, 6951, 9034, 9605; bandUnion 2029, 6219. Six of the new kerb refusals were silently wrong reads
    before the round (row 41: depth 236–524 cm). The one RISE, bandUnion on 20261011 (3 → 8): 715, 1087 and 4912 replay
    insertChain's 'insert: no route' (a band commit's chain), 2810, 4241, 6059, 7033 and 9039 a band part's run end
    displaced 25–91 cm (class (a)). J264 (5) reads "a rise fails"; J433 rules the dry-run with its post-conditions and
    classes these refusals by cause, with row 41's larger counts in its evidence — reported for the session; no class or
    tolerance widened. Milestone: the closing check (the session's ruling on the +5).
52. **DECLARED SHIFT (J260 (3)), this sitting's additions, each with its attractor.** deadend.test.ts: case 3186 (face 1)
    now refuses KEPT_DEEP — way:2's strip end (23, 397) on F's L1 edge (0, 1510)–(31, 0) (0.15 cm), the L0 frame
    (0, 0)–(0, 1510) 23 cm away, placed at (62, 397), 39 cm (fallback); case 3070 (face 0) — (12, 1809) on F's edge
    (4, 2293)–(41, 0) (0.19 cm), the frame (0, 0)–(0, 2318) 12 cm away, placed at (37, 1809), 25 cm; case 4722 (face 4,
    row 41) — (11, 1490) on (7, 1814)–(27, 0) (0.43 cm), the frame 11 cm away, placed at (36, 1490), 25 cm: each pinned
    as the refusal expectation, classed insertChain's (`refusedByDisplacement`); corridorUnion refuses with it, nothing
    written. corridor.test.ts's "§13.2 across two faces" REBUILT: the case as first written (e vertical, u = (1900, 2318))
    gave the same contacts and blocks under the pre-S9 engine (a mirror run of the found kerb.ts and bandUnion.ts), so it
    pinned nothing; e now slants from (2000, 2000) to (2600, 4000), the stub runs from (2180, 2600) to u = (2050, 2318) —
    under the pre-S9 engine F's scratch overlay routes T's inner edge through u to e at (2095, 2318), G's (never holding u)
    meets e at (2090, 2300), and the commit attracts G's kerb onto F's contact (G's block off kerb(G)); under the dry-run
    both read (2090, 2300) and both commit exactly (a scan of 310 positions of u: 310 off under the old engine, 0 under
    the dry-run). refusals.json unchanged: its details are the 2026-10-05 runs' record and the register asserts each
    case's code and the class of what it still meets; still met (all insertChain's): corridorUnion cases 10, 144 and 169
    (replays 'insert: no route'), 67 (no-route), 204 and 283 (displaced 31 / 29 cm, fallback); kerb case 203 (displaced
    31 cm, fallback); bandUnion cases 107, 132, 136, 236, 270, 291 (each a displaced run end, 25–26 cm) and 198 (no-route).
    Milestone: the closing check.
53. **Self-check (fix) of this round (J183), the lane's mirror (isolation proven; every mutated file restored and
    cmp-equal), PLAT_FUZZ_RUNS=1000, base green (56/56 on the targets):** M1 the pre-S9 engine (the found kerb.ts and
    bandUnion.ts) — killed: dryrun.test.ts 4 red (arenas built 2 / 1 / 1 per read; the bare read), corridor "§13.2 across
    two faces" red (expected [] to equal ['2090,2300']); M2 the dry-run laid on the batch, not a shell — killed (dryrun
    3 red: the batch touched); M3 the engine without `sharedPath` — killed (deadend fixture 871, its pinned fallback, the
    slanted dead-end sweep); M4 own() on attracted cases only — killed (arr-bands harness.test.ts); M5 classify without
    the cause reading — killed (cause 3, deadend 3186 / 3070 / 4722, register); M6 a displaced end unread — killed (cause
    (a), deadend 3); M7 the replay without `sharedPath` — SURVIVED the first pass (no refused case of the census reads
    differently: 65 of 65 alike), killed after `layRun` and its unit pin were added; M8 the refusing part off by one —
    killed (deadend 3, register); M9 the post-condition list empty — killed (cause (b), (c), register); M10 the parts at
    the batch's level (no L2 floor) — survives the share test, killed over the folder (deadend 1012 draw 2243's along
    closing); M11 the labels read from the input ring (N-45 (a)) — killed over the folder (widthstep's corner wedge);
    M12 the labels at `interiorPoint` (row 55) — killed (agreement-corridor's fixed polygon+chord case); M13 a
    self-crossing oracle output judged as it is (row 56) — killed (agreement-corridor's needle-tip case); M14 a split
    antenna in a band face judged invalid (row 57) — killed (the bridge case); M15 the antenna exemption in block faces
    too — survives: no input of the families reaches a split dangling into a block (N-52 (2)'s `splitsInBlocks` and the
    split's guard keep splits out of blocks), the restriction is defensive.
54. **Reported, not gated (the MACHINE: never a timing gate; CONTENDED, this Linux container, the same build).** The
    kerb read loop over the fixture faces (fusion 3 / 33 / 44, dead end 871 / 822; 20 reads each after one warm read, in
    one L1 batch), the found engine → the dry-run: 98.77 / 84.96 → 25.25 / 19.87 ms per read (two passes; per face
    106–156 → 16–41 ms, 33–60 → 9–33 ms), with createPlat 2 / 2 / 2 / 1 / 1 → 0 per read; layout
    test/infill/fabric/splitSeeds.test.ts (city-split-seeds.json) 20.12 s → 9.54 s, 9 / 9 green under both. The memo's
    hit rate (no memo built): 17 of 309 reads in splitSeeds.test.ts repeat their canonical inputs (the face's rings, its
    spines and widths, the census's spines, the batch's level and the transaction's journal and work unchanged) within
    one transaction (5.5 %); B-FUZZ at 1 000 networks 2 180 of 10 903 (20 %: the test's own second read of each face).
    The remainder REPORTED, not built here: the O(arena) image per read (profile fix 5, a-06 / a-07) and the
    insertion's constant factors (fix 2, a-03 / a-05).
55. **The dry-run's labels at the deepest candidate (`labelPoint`), found by the NEAR run at PR size.** An unattracted
    agreement case (triangle (41107, 58683), (35600, 55196), (45395, 51745), chord (28094, 55223) – (52901, 55205), hw 459:
    the chord attracted through the triangle's corner) committed a 120 cm band sliver as a third block — the face
    between the lower edge's strip (poking above the chord at the corner), the chord's arena edge and the left edge's
    strip was labelled at `interiorPoint`'s widest interval, 0.5 cm above the chord's edge, where the chord strip's cycle
    runs its window stretch as a straight chord between its unlaid points and the arena's edge runs through lattice
    vertices a hot pixel off it: the label fell outside the strip (keptDeep measured the face 59 cm from the part's
    outline — F's edge counted as outline — and let it pass). kerb.ts `labelPoint`: the candidate farthest from the face's
    boundary (a label deeper than the hot pixel cannot change side); pinned by agreement-corridor.test.ts's fixed case
    (red under M12). The census moved with it (row 50: fewer bandUnion refusals). Remaining risk (hardening): a face
    thinner than ~1.5 cm whose every candidate lies within the hot pixel of such a chord; keptDeep reads depth from the
    whole clipped outline, F's edge included. Milestone: M4 (hardening).
56. **The arr-bands judge takes a self-crossing oracle output as that oracle's refusal.** The second NEAR-size red: an
    unattracted ring way (hw 412) with a 9° tip at (11768, 34568), where polygon-clipping's band ends its outer ring
    (31501, 37854) → (11770, 34568) → (11768, 34568) — its first edge crossing F's edge 0.012 cm short of the tip, an
    output that crosses itself, which the face count reads as two faces; clipper2's band and ours are one face, |Δ|
    within bound for both. Before round S9 the scratch overlay attracted near such a tip (W_ATTRACTED) and the case was
    judged attracted (no face count); the dry-run lays nothing there (F's ring is the arena's), so the case is unattracted.
    testkit support.ts `judge`: a failing verdict whose oracle output has crossing edges (`ringProblems`) is re-judged as
    that oracle's refusal (`oracle-invalid`, settled and counted per engine; the other oracle judges the case; the
    unjudged bound applies) — no change for ours (Q84's own() on every case kept). Pinned by agreement-corridor.test.ts's
    needle-tip case (red under M13); the main property at 10⁴ green on PLAT_FUZZ_SEED 7 and 424242. Milestone: M0-k-03's
    oracles (a polygon-clipping output check), reported.
57. **A corridor_split antenna in a band face is legal (the arr-bands judge).** The third NEAR-size red: an unattracted
    polygon+chord case (ring (-41862, 62959), (-43225, 65281), (-44364, 63116), (-45814, 61958), (-45290, 59985),
    (-42130, 61136); chord (-50846, 62629) – (-36830, 62637); hw 448) whose face above the chord keeps one corner split, J =
    (-41910, 62634) to the kerb corner (-42454, 63082); its other junction's kerb corner (-43877, 63081) stands 1 182 cm
    away, beyond reach (2·448 + 26 cm; N-52 (2), C-0281), so the band face's ring runs the split twice (a bridge from F's
    boundary to the block, cutting nothing) and the judge's ring check read it as "an edge dangling into the face". The
    found engine commits the same arena (blocks within 9 cm) and the case passed only as attracted — the scratch
    overlay's attraction 3 000 cm away at (-46192, 62198); under the dry-run it is unattracted. Q19 (d) asks the
    agreement verdicts unchanged: testkit support.ts `judgeCorridor` takes a two-point loop of a BAND face that is a
    committed corridor_split (`CorridorOurs.splitEdges`) as a legal antenna (§13.1), counted `split-antenna` in the notes;
    a block face is held as before. Pinned by agreement-corridor.test.ts's bridge case (red under M14). The design
    question left (for the hardening pass): whether a band piece with a single split should keep it (the split marks the
    junction for M1's Corridor entities) or drop it. Milestone: M4 (hardening), reported.
58. **The round's last sitting (2026-10-20, a relaunched container; the CONTINUE RULE): the gates, the agreement seeds,
    NEAR and RELATED.** Gates in the tree: install --frozen-lockfile 0, lint 0 (eslint 1157 files 0/0, probe-red ok,
    kernel-boundary ok), build 0. agreement-corridor.test.ts at 10⁴, W=1: green on PLAT_FUZZ_SEED 1012 (6/6, 574 s) and
    20261011 (6/6, 568 s), beside 7 and 424242 (row 56). NEAR at the PR size (the item's 17 test files, B-FUZZ
    included, unseeded): 101/101 green (1 290 s). RELATED at PLAT_FUZZ_RUNS=1000 over kerb.ts and bandUnion.ts (the
    round's changed sources; W=1, 6 777 s): 340 files, 4 201 / 4 204 — three reds, none a test of this item, each
    classed in the lane's mirror beside the pre-S9 item state (kerb.ts, bandUnion.ts and the bands support.ts read from
    the repository branch whose files hash equal to the fix-s8 landed record; a probe compared every `kerb()` read of
    the two engines on the same open overlay; probes kept in the session scratchpad, the mirror deleted):
    (a) **M0-a-05's `kernel/test/insert/step3-5/sliver.test.ts:54` (Q53), kernel and kernel-tiny — foreign to this
    round:** red under the pre-S9 item state as well (received band [4, 1, 3, 5, 2], blocks [0] against the recorded
    [4, 1, 3, 5, 2, 7] / [0, 6]); under the dry-run the test's own claims hold when line 54 is set aside (`healthy`,
    `checkIndexState` [], `tilesExactly` [], the L1 records [0 … 4] unchanged, the sliver's L2 records under L1 f4 with
    its owner, stage 8 and kind, none under a freed L1); the classes moved again (band [0, 1, 3, 6, 4, 5], blocks [2],
    the sliver's L2 records 0, 1, 4) with one kerb read changed, kerb(f0): (3996, 432) added 25.26 cm off the scratch's
    ring, 0.38 cm from the sliver's L1 edge (the declared attractor: a neighbour's L1 edge within the hot pixel), and
    the near-tangent corner beside it moved 2.8 cm ((3753, 3639) → (3756, 3636)). Reported to M0-a-05 (its line 54
    re-recorded by its owner; never edited here).
    (b) **M0-x-05's `testkit/test/ladders/rungs-s8.test.ts:102` (cut/antenna, the small flat town seed 6) — moved by
    this round:** green under the pre-S9 engine, under the dry-run `{ 'S8 F-CUT antenna': 1 }` (the 'a@attempt>=1'
    line gone: rung (a) cuts at attempt 0). Of S8's 37 kerb reads 28 are identical, 6 differ by ≤ 1 cm (the lattice), 3
    move a vertex: read 24 (face 34, 3.16 cm, 0.4 cm from F's L1 edge — the attractor class) and reads 35 / 37 (faces
    50 / 48, the antenna's children; Hausdorff 29.65 / 39.84 cm): there the pre-S9 kerb held four vertices each lying
    6.5–39.6 cm DEEP inside a buffer part (on one part's outline, inside another's: a silently wrong kerb, N-45 (a)),
    where the dry-run's vertices lie on a part's outline (≤ 0.5 cm) and inside none (≤ 0.28 cm, the lattice). The move
    is a correction of a wrong read, not an attractor shift; reported to M0-x-05 with the count (1 pin, 1 face pair) and
    the class, for its owner's re-record (J260 (3)); never edited here.
    (c) c-06's drift red (Q60) was not met in this run. Milestone: the closing check.

## Closing check of session fix round S9 (lane `check/M0-a-09-close-s9`, 2026-10-20 – 21) — hardening round S9

The verdict is in `checks/M0-a-09-s9.md` (FAIL: one blocker, B-ME — the dry-run's labelling of its faces against the
parts AS THE ARENA HOLDS them is a stated promise of Q18 / C-0417 that no test of the item pins; the engine itself is
the ruled one). The rows below are the check's non-blocking findings, each for the hardening milestone M4 unless named
earlier. Every figure is this seat's own (its mirror, its mutants, its probes); the outcome census is its
`hash.probe` — per draw of bfuzz's chord arbitrary (seed 20261011, 10⁴ draws) the digest of every L1 kerb read, the
arena's digest after corridorUnion (L2) and after bandUnion (L3) — run on the tree (bit-equal on three runs) and under
each survivor, one clean `mut.py` run each with the file `cmp`-restored.

59. **MD (the parts' indices NOT pinned against decimation, `pinned: []`) survives the item's tests at 1000 and 10⁴ and
    is equivalent on every result; the pin's only effect is the attracted split.** The seat's `pin.probe` ran
    `decimate` on every part of `kerbParts` over 1 000 B-FUZZ networks (seed 20261011; 12 822 parts): the kept points
    are IDENTICAL with and without the pinning on every part (12 265 equal, 0 differ, 557 refused alike) — step 1 keeps
    the FIRST point of a close pair either way (a pinned merge keeps `top`'s coordinates; unpinned decimation drops the
    later point) — and 2 435 parts (19 %) hold a pair closer than minEdge (arc chords at SAGITTA_CM spacing on small
    radii), where the pinning adds W_ATTRACTED (2 435 pinned, 0 unpinned). The clean outcome census under MD: 329 of
    10⁴ draws differ from the tree, every one in the `attracted` count ONLY — 0 kerb-read digests, 0 corridorUnion
    commits, 0 bandUnion commits differ. So kerb.ts's header sentence "no arc vertex at SAGITTA_CM spacing is dropped"
    is not what the pin does (the point is merged away either way), and a part's OWN arc spacing reads as attraction in
    19 % of parts, which inflates §3.7's attracted class and loosens the agreement harness's comparison on those cases.
    Suggested handling: state the pin's effect truthfully in the header; decide whether a merge of a part's own arc
    points is attraction (§3.7's split) or a quiet decimation (then no W_ATTRACTED, and the pin is unneeded), and pin
    the decision by a part with an arc pair under minEdge. Milestone: M4 (hardening).
60. **S4N7 (s4's deferred post-condition in bandUnion.ts :604–609, the tips left across F's boundary judged after
    every outline is in) survives at 1000 and 10⁴ under S9, where the S4 check killed it by case 367.** Under the dry-run
    case 367 folds (row 44), and the clean outcome census under S4N7 equals the tree's on every one of 10⁴ draws (0
    kerb reads, 0 corridorUnion commits, 0 bandUnion commits differ): the guard's reaching input is gone from the
    families at this size. The guard stays (fail-safe, N-45 (a)); the claim it holds is unpinned. Suggested handling:
    a hand-built case whose band tip crosses F's boundary after the outlines are in (or the S4 case 367 geometry
    re-posed on the real arena). Milestone: M4 (hardening).
61. **The re-class probe's limit: the engine's window and laid runs are not reproducible from the choices row alone.**
    The seat's own replay (`recls.probe`: the refusing part found geometrically, clipped by the seat to F's convex hull
    within the L0 box by Sutherland–Hodgman, its runs cut at the window, the run nearest the item's refusing point
    inserted ALONE on a shell at max(level, 2), every index pinned, under a savepoint put back — never through
    `replay.ts`) matched the item's reading on 20 of 56 sampled refusal rows and found the insertion alone moving or
    merging the run on 46; on the rest the seat's window reconstruction put the run's end 100–800 cm from the item's
    refusing point, so `clipToWindow`, `runsOf` and `sharedPath` are not reproducible from C-0417's description.
    Suggested handling: export the window and the laid runs of the last read in `kerbCensus` (beside `refusedAt`) so a
    checker can replay by them and the J433 class can be re-derived without the engine. Milestone: M4 (hardening);
    earlier if the session's Q90 ruling needs the per-cause counts re-derived.
62. **For the session (J264 (5)): bandUnion's count on seed 20261011 rose 3 → 8; every other count drained.** The
    seat's census at 10⁴ (its `census.probe`, every refusal classed by the item's `classify` and tallied by cause): seed
    20261011 kerb 10 / corridorUnion 16 / bandUnion 8 (before the round 10 / 16 / 3), seed 1012 9 / 12 / 2 (before
    15 / 16 / 2), refusals.json still refused 1 / 6 / 7 (before 36 / 39 / 13); own 0 on every operation and seed. The
    five new bandUnion cases on 20261011: draws 715, 1087, 4912 replay insertChain's own 'no route'; 2810, 4241, 6059,
    7033, 9039 a band run end displaced 25–91 cm (J433 class (a)). Under RULING J433 these are insertChain's by cause
    and "never gated", with the construction that would close a displaced run end queued as Q90 (M4); this seat does not
    fail the round on them and routes them to the session as the remaining LAWFUL-input refusals of the family with
    their seeds and draws, as the ZERO REFUSALS rule asks, for the ruling J264 (5) literally requires on a rise. Input
    kind LAWFUL; verdict MAKE-IT-SUCCEED at Q90 (a band run end placed off its point inside the read). Milestone: Q90 /
    M4, the session's ruling.
63. **The moved pins of other items (J260 (3)), each its owner's re-record, measured by this seat beside the pre-S9
    engine.** (a) M0-a-05 `kernel/test/insert/step3-5/sliver.test.ts:54` (Q53), kernel and kernel-tiny: red under the
    pre-S9 engine too (`band [4, 1, 3, 5, 2]`, `blocks [0]` against the recorded `[4, 1, 3, 5, 2, 7]` / `[0, 6]`), red
    under S9 (`band [0, 1, 3, 6, 4, 5]`); stale before this round, a-05's. (b) M0-x-05 `testkit/test/ladders/
    rungs-s8.test.ts:102` (cut/antenna, the small flat town seed 6): green under pre-S9, red under S9 (`{ 'S8 F-CUT
    antenna': 1 }`, the 'a@attempt>=1' line gone); the seat's like-for-like probe (every `kerb()` read of that ladder
    under S9, each also read by the pre-S9 `kerb.ts` on the same open overlay at the same moment): 37 reads, 28
    identical, 7 within 3.16 cm, and faces 50 / 48 at Hausdorff 29.65 / 39.84 cm where the pre-S9 kerb held four
    vertices each 6.51–39.55 cm INSIDE a buffer part (a silently wrong read, N-45 (a)) and the dry-run's lie on a
    part's outline (≤ 0.52 cm): a corrected wrong read, x-05's re-record (1 pin, faces 50 / 48). Neither is this
    round's blocker; neither file was edited. Milestone: the owners' next rounds.

## Builder of fix round S10 (lane `build/M0-a-09-fix-s10`, 2026-10-21)

64. **B-ME (the closing check of round S9, section (3)) pinned: the dry-run's labels are read against the parts as the
    arena holds them.** No engine file changed. `kernel/test/arr/bands/dryrun.test.ts` gains the describe 'the dry-run
    labels against the parts as the arena holds them, never the clipped input ring (C-0417; B-ME)': three B-FUZZ
    networks of seed 20261011 written as chords — draw 532 (face 2's kerb `4000,3967 4000,4000 3825,4000`; the part's
    input point (4000, 3980) merged into (4000, 3967), so at the face's interior point (3956.25, 3983.5) the clipped
    input winds 1 and the held cycle 0), draw 275 (face 2's kerb `2534,3430 3045,4000 2948,4000`; part 1's input
    `40,0 194,172 2967,3986 2948,4000` winds 1 at (2765.25, 3715), its held cycle `194,172 2534,3430 2948,4000 40,0`
    0), each with corridorUnion's committed block of face 2 equal to the read, the tiling exact, the arena healthy; and
    draw 71 (bandUnion's L3 read: the band's input `0,0 4000,4000 3980,4000 0,20` winds 1 at (9.9, 20), its held cycle
    `4000,4000 3960,4000 0,0` 0; two blocks, the corner `0,0 3960,4000 0,40` among them). The winding numbers were read
    by a probe in the lane mirror (the two labels side by side at every face of each read). Self-check: mutant ME (the
    checker's replacement, `const cycles = d.clipped.map((r) => r.map((q) => ({ x: q.x as number, y: q.y as
    number })));`) in the mirror — all three cases red (kerb read EMPTY on 532 and 275; bandUnion one block on 71),
    and the item's 17 files with `--bail=1`: 1 failed (draw 532); green on the tree. Gates in the tree: install 0, lint
    0 (eslint 1157 files 0 / 0, probe-red ok), build 0; NEAR at the PR size 17 files 104 / 104 (W=1, 972 s). RELATED:
    no source file under `packages/*/src/` changed in this round (kerb.ts and bandUnion.ts sha256-equal to round S9's
    record), so round S9's RELATED@1000 (340 files 4201 / 4204, the three reds of other items' pins, rows 58 / 63)
    stands. The refusal census is unchanged by construction (20261011 10 / 16 / 8, 1012 9 / 12 / 2, register 1 / 6 / 7,
    own 0). C-0418.

## Builder of fix round S11 (lane `build/M0-a-09-fix-s11`, 2026-10-21)

65. **B-ME2 (the closing check of round S10, section (3)) pinned: the held cycle runs along the part's row edges.** No
    engine file changed. `kernel/test/arr/bands/dryrun.test.ts` gains the describe 'the held cycle runs along the
    part’s row edges, never the chords between its placed vertices (C-0417; B-ME2)': four networks of B-FUZZ's chord
    arbitrary, seed 20261011, written as chords (the checker's draws 1682, 3213, 389, 1109) — 1682: face 0's kerb
    `2702,606 0,2188 0,1233 118,1222` + `3626,0 3697,0 3622,67`, both committed as blocks of face 0; 3213: face 0's kerb
    `1386,0 1623,0 1624,54 1562,40` and its block; each with every face's read equal to the blocks committed in it; 389
    / 1109: face 3 / face 1 read EMPTY, no block in it, committed whole to the band. Self-check in the lane mirror
    (isolation proven; `cp -a`): under ME2 (`cyc.push(at(a)); void path;`) all three cases red, the 17 files --bail=1
    1 failed (draw 1682); under ME five cases red (532, 275, 71, 1682, 3213), the 17 files --bail=1 1 failed (532);
    restored equal; green on the tree. Gates in the tree: install 0, lint 0 (eslint 1157 files 0 / 0, probe-red ok),
    build 0.
    **NEAR at the PR size RED (BLOCKED for the session).** The item's 17 files at 10⁴ (W=1, random global seed, 1006 s):
    16 / 17 files, 106 / 107 tests; `bfuzz.test.ts` 'kerb, corridorUnion and bandUnion on random street networks'
    fails its own cap (`expected 2 to be less than or equal to 1`, :195): refusals per operation kerb insertChain 9 /
    own 2, corridorUnion 12 / 2, bandUnion 7 / 0. The two own refusals are two lawful networks, each refused by kerb's
    C-0381 census (`E_INVARIANT arr: a vertex of the region lies deeper in a vertex-only buffer than an insertion moves
    a boundary point (C-0381)`, CAUSE `exact part 4`: the insertChain-alone replay holds the part exactly, so J433
    classes it the item's own), corridorUnion refusing after it:
    `[{a:15997,b:2390,hw:170,knots:[7,92],ends:'square'},{a:13944,b:51,hw:399,knots:null,ends:'round'},{a:67,b:7156,hw:429,knots:[168,495],ends:'square'}]`
    (face 2) and
    `[{a:15521,b:12686,hw:11,knots:[35,591],ends:'square'},{a:4099,b:8029,hw:28,knots:null,ends:'square'},{a:7473,b:8030,hw:20,knots:[157,520],ends:'round'}]`
    (face 0). Both reproduce deterministically on the tree (a probe in the lane mirror read every face of each network in
    one L1 batch: the other faces read). Not this round's change: every engine and support file is sha256-equal to round
    S9's landed record (only `dryrun.test.ts` differs), so the refusals are round S9's engine's; the fixed-seed census
    (own 0 on 20261011 and 1012) never met them, and the four earlier NEAR runs (S9 and S10, builder and checker) drew
    ≤ 1 own. By ZERO REFUSALS (J264) and N-58 they are lawful-input refusals of the item's own code (MAKE-IT-SUCCEED),
    and the own cap of N-44 (3) is the item's exit bar; making them succeed is an engine change to the C-0381 census that
    this round (test-only, "no engine change") is not authorised to make. The session rules: a fix round on the census
    with these two networks as pins, or a ruling on the cap. RELATED: no source file under `packages/*/src/` changed, so
    round S9's RELATED@1000 stands. Logs (scratchpad of the session): `near.log`, `ME2-all.log`, `ME-dry.log`,
    `ME-all.log`, `g-{install,lint,build}.log`. C-0419.

## Fix round S12 — builder (lane `build/M0-a-09-fix-s12`, 2026-10-21)

66. **B-ME2 (round S11's line) re-landed: the pin is round S11's work, kept as it stands.** No engine change for it:
    `kernel/test/arr/bands/dryrun.test.ts`'s describe 'the held cycle runs along the part’s row edges, never the chords
    between its placed vertices (C-0417; B-ME2)' (draws 1682, 3213, 389 + 1109 of seed 20261011, written by
    `build/M0-a-09-fix-s11`, C-0419, row 65) is unchanged by this round; the round's one edit to that file is the
    savepoint rule of row 67. Re-killed in this round's mirror: ME2 (`cyc.push(at(a)); void path;` in `cycleOf`) over
    the item's 18 files at 1000 `--bail=1` — 1 failed (B-FUZZ's closings, the first file to meet it); alone on
    `dryrun.test.ts` the three B-ME2 cases red (3 failed | 7 passed); restored equal (cmp).
67. **B-FUZZ's own cap (`bfuzz.test.ts:195`, unchanged): the two lawful networks of row 65 made to succeed — the
    restaged read (C-0420).** The probe (mirror; the dry-run's faces, labels, windings and every part's held edges):
    N1 face 2 — the census laid way:1's end strip on the arena holding way:0's and way:2's held edges; its end edge was
    routed through their meeting vertex (366, 12) and its corner (450, 10) placed at (463, 41), so the kept face ran
    on to the tip (366, 12), 84 cm into way:1's round end (hw 399), by `deepIn` and by its distance to F − V alike;
    N2 face 0 — way:2's strip run was laid along a join's held edges, a run so laid records none of its own segments,
    so the cap's radius was laid apart from the strip's identical end edge and routed back along the frame; the cap's
    held cycle bounds nothing, its sliver face was kept, its vertex (3943, 4000) 492 cm into way:2's end. The measure
    and the bound are right (no bound changed); the census's read was wrong. The fix (kerb.ts `restagedRead`): only
    where the census's post-condition refuses, a fresh dry-run lays the reaching vertex-only spines' parts first and the
    edge spines' after them, accepted only where no vertex lies deeper than `DRY_MOVE_CM` in any of F's spines' bands;
    refused too, the census's refusal and its place stand. Both networks now commit (restage.test.ts: the regions of
    C-0420 (2), every vertex within √2 · attractCm + SAGITTA_CM of every band, corridorUnion's blocks equal to the
    reads, bandUnion committed; red on round S9's kerb.ts). Refusal census (B-FUZZ's own draws, 10⁴ each; mirror;
    before round S9's kerb.ts, after this tree): 20261011 10 / 16 / 8 → 10 / 16 / 8, 1012 9 / 12 / 2 → 9 / 12 / 2,
    refusals.json's 317 network cases 4 / 7 / 7 → 4 / 7 / 7 (kerb / corridorUnion / bandUnion), own 0 → 0, 0 of
    20 317 draws with any outcome changed (no declared shift). Refusal verdicts (J290 / N-58): the two networks LAWFUL,
    MAKE-IT-SUCCEED — done; the fixed seeds' 11 `CENSUS_DEEP` reads (20261011 draws 1425, 4505, 8456, 8555, 9045, 9181,
    9206; 1012 draws 3606, 3728, 9033, 9604), LAWFUL, J433 insertChain's (a part collapsed or displaced onto the frame),
    restaged and refused again by the restaged post-condition at a frame vertex deep in the vertex-only band —
    MAKE-IT-SUCCEED of insertChain's hold at the frame, for the session (unchanged by this round; draw 1425 pinned in
    restage.test.ts as the guard's case). `dryrun.test.ts`'s savepoint rule: a second savepoint only on a read whose
    census added vertex-only spines and which ended ok or `CENSUS_DEEP` (the 100-network sample of seed 20261019 green).
    Self-check (mirror, 1000, `--bail=1`, 18 files, base 110 / 110): R1 (no restage), R2 (restaged in the census's
    order), R3 (restaged without its post-condition), R5 (the census's place always cleared), R7 (the place kept on
    success) killed; R4 survives (row 68).
68. **KI for the hardening pass (N-45: these fail safe).** (a) The restaged read's guard on the EDGE spines (mutant R4:
    the guard on the vertex-only spines only) survives the item's tests: no family case gives a restaged region deep in
    an edge band; a hand-built case would pin it. (b) The census-order `sharedPath` gap of N2 (a run laid along an
    earlier part's held edges records none of its own segments, so a later identical segment is laid apart) stays in
    the census's read, where its sliver is within the bound or refused and restaged; recording those segments there
    moves committed kerbs (a declared shift with digests), so it waits for the hardening pass.
69. **Gates of round S12 (tree).** install --frozen-lockfile 0; lint 0 (eslint 1158 files 0 / 0, `probe-red ok`,
    `kernel-boundary ok` — the restaged read takes the census's parts rather than calling `kerbParts` again, holding the
    allowlist's cap of 20 'kerb' identifiers); build 0. NEAR at full strength (the PR size 10⁴, a random global seed,
    W=1), twice: the item's 18 files 110 / 110 (1134 s), 110 / 110 (1153 s) — B-FUZZ's own cap held both times.
    RELATED@1000 over `kerb.ts` (W=1, 7366 s): 341 files, 4210 / 4213; the three reds are round S9's classed foreign
    pins (rows 58, 63) — kernel and kernel-tiny `insert/step3-5/sliver.test.ts` Q53 (a-05's) and testkit
    `ladders/rungs-s8.test.ts` cut/antenna seed 6 (x-05's) — replayed in the lane mirror on this round's kerb.ts and on
    round S9's, the same three assertions failing identically on both (not this round's). Logs (session scratchpad,
    `s12/`): `g-{install,lint,build}.log`, `near1.log`, `near2.log`, `related.log`.

## Fix round S13 — builder (lane `build/M0-a-09-fix-s13`, 2026-10-21)

70. **B-CLOSE (`checks/M0-a-09-s12.md` (3)): an along-run closing commits only a run vertex kerb(F) holds after the op
    (C-0421).** Why the L1 read moved: an L1 read lays its parts at L2 (kerb.ts `dryLevel`), so after corridorUnion's
    L2 commit it meets the commit's own geometry; where the insertion left an open piece's end as a tip off its contact
    and the along closing joined it to the run's vertex (`runVertex`), the tip and that chord are new L2 content beside
    F's boundary — seed 20261011 draw 1263: the read's vertex at the contact (2362, 3977) attracted onto the tip
    (2362, 3952), the part routed along the chord, the run vertex (1538, 3986) dropped (259.6 cm off); seed 1012 draw
    3369: (2251, 3991) 34.8 cm off. The fix (bandUnion.ts `offRead`, L2 batches): before the read-back each face with an
    along closing is read again on the arena the run left, and an end whose run vertex stands off that outline (1 cm) is
    pinned first on the op's next run; on the four networks (the two draws and fast-check's two shrunk counterexamples)
    the contact cannot be pinned within attractCm and the piece, a sliver 13.5 – 15.1 cm from F's boundary, is folded
    (C-0218 (7)); draw 1263's every L1 read is the same before and after the commit. `closingsBeyond` unchanged.
    B-FUZZ at 10⁴ in the tree: `PLAT_FUZZ_SEED=20261011` exit 0 (2 passed, 338 s), `PLAT_FUZZ_SEED=1012` exit 0
    (2 passed, 340 s). Fixtures: `closing.test.ts`'s first describe, 4 tests, all red on round S9's bandUnion.ts.
71. **B-SPLIT — found by this round's NEAR #2 at the PR size (random seed), pre-existing: a split laid between two faces
    of one L1 face read outside the band is left out (C-0422).** testkit `agreement-corridor.test.ts` 'the built blocks
    and the bands, by attraction' red once: `corridorUnion faceSet-concave+chord: corridor_split edges between two built
    blocks 188175,-216383-188201,-216369` (its input in the new fixed case of that file), identical on round S9's
    bandUnion.ts in the lane mirror. Face 0's kerb has a spur at the junction; the wedge split's leg passes 21 cm from the
    spur's tip and the insertion laid it along the spur's far side, so the spur was committed as a block of its own with
    the split between it and the rest of the block. The read-back now judges the op's splits on the faces the arena holds
    (`cutSplits`) and the op runs again with such a split left out (C-0281's answer for a split that cannot stay in the
    band). B-FUZZ's family met the same class unseen at seed 1012 draw 7964 (a sliver second block of face 1), pinned in
    `closing.test.ts`'s second describe. Census (both rows; the lane mirror; bfuzz's arbitrary by `fc.sample`, 10⁴ per
    seed; refusals classed by replay.ts): round S9's bandUnion.ts → this round's: refusals 20261011 10 / 16 / 8 → same,
    1012 9 / 12 / 2 → same (kerb / corridorUnion / bandUnion), own 0 → 0, crashes 0; along closings off kerb(F) 1 / 1 →
    0 / 0; splits cutting a block of their face 0 / 1 → 0 / 0; outcomes changed on exactly draws 1263 (20261011), 3369
    and 7964 (1012) — no declared shift, no digest re-recorded. Refusal verdicts (J290 / N-58): B-CLOSE and B-SPLIT
    involve no refusal (LAWFUL inputs, wrong committed results made right — MAKE-IT-SUCCEED, done).
72. **KI for the hardening pass (N-45: these fail safe).** (a) Mutants surviving the item's tests, no family case
    reaching them: M1 (`offRead` at L3 too), M2 (a refused re-read taken as holding the run vertex), M4 (the re-read
    without vertex contacts), S3 (`cutSplits` widened to two L1 faces), S4 (the face's first split named, not the
    nearest). (b) A split row laid along F's own L1 boundary between blocks of two L1 faces, where a narrow spine's
    strips collapsed onto it (B-FUZZ census: 20261011 draws 589, 2721, 2964, 3424; 1012 draw 6956), cuts no block and
    is left as it is; testkit's `splitsInBlocks` would flag it, but its corridor family (half-widths of metres) has not
    drawn one. (c) An L1 read after the commit can still differ from the read before it where the commit folded a
    sliver (seed 1012 draw 3369, the 20261011 shrunk case): S8 reads before S9, and B-FUZZ's judges hold on it.
73. **For the session (J264: a lawful-input refusal routed with its input): NEAR #2's testkit corridor family met one
    corridorUnion refusal of class own** — `E_INVARIANT` KEPT_DEEP, source faceSet-curved, hw 482, the ring of 31 points
    beginning (194740, 242166) (`REFUSAL corridorUnion own …` in that run's log; within the harness's own cap of 1 per
    10⁴). It is a kerb read refusing (kerb.ts is unchanged since round S12's record; neither C-0421 nor C-0422 runs
    before that read): replayed in the lane mirror, refused identically on round S9's bandUnion.ts; not this round's
    line.
74. **Gates of round S13 (tree, the final engine).** install --frozen-lockfile 0; lint 0 (eslint 1159 files 0 / 0,
    `probe-red ok`, `kernel-boundary ok` — bandUnion.ts's 14 'kerb' identifiers held: the one read call shared by
    `readOn`, one read-back alias); build 0. B-FUZZ at 10⁴ with `PLAT_FUZZ_SEED=20261011` and `=1012` on the final engine:
    exit 0 both (2 passed, 343 s; 2 passed, 355 s; on C-0421's engine alone too, 338 s / 340 s). NEAR at full strength (the PR size 10⁴, a random
    global seed, W=1) on the final engine, twice: the item's 19 files 116 / 116 (1247 s), 116 / 116 (1167 s) —
    `register.test.ts` (refusals.json) green in both. (On C-0421's engine alone: NEAR #1 114 / 114 green, NEAR #2 red on
    B-SPLIT, row 71.) RELATED@1000 over `bandUnion.ts` (W=1, 6982 s): 341 files, 4191 / 4194; the three reds are
    round S9's classed foreign pins (rows 58, 63) — kernel and kernel-tiny `insert/step3-5/sliver.test.ts` Q53 (a-05's)
    and testkit `ladders/rungs-s8.test.ts` cut/antenna seed 6 (x-05's) — replayed in the lane mirror on this round's
    bandUnion.ts and on round S9's, the same three assertions failing identically on both. Logs (session scratchpad,
    `s13/`): `g-{install,lint,build}.log`, `fixed-{20261011,1012}.log`, `near1.log`, `near2.log`, `related.log`,
    `replay-{tree,pre}.log`, `mut-*.log`, `mut2-*.log`.

## Hardening round S14 — builder (lane `build/M0-a-09-fix-s14`, 2026-10-25)

The session's hardening round for M0-a-09 (J237 (2), J489): the inventory's FIX-NOW rows for the item, the census's
MAKE-IT-SUCCEED lines L21, Q58 and Q59, re-measured first under round S13's engine. Choices row C-0423 names every row.
Measurements in the lane mirror (`/home/user/maps-scratch/waves/selfcheck-build-M0-a-09-fix-s14`, deleted at the end);
B-FUZZ's networks drawn by bfuzz.test.ts's own chord arbitrary with `fc.sample` at the seed (draw numbers 1-based; the
queue rows Q58 / Q59 number from 0); every refusal classed by replay.ts (`classify`, `causeOf`). Self-check (J183): one
targeted mutant per pinned row, each in the mirror against the item's two test folders (`packages/kernel/test/arr/bands`,
`packages/testkit/test/kernel/arr-bands`, B-FUZZ included) at `PLAT_FUZZ_RUNS=1000`, `--bail=1`, W=1, the file restored
from the tree and `cmp`-checked after each — the table is row 100.

75. **Q58 / Q59 — CONFIRMED by replay under round S13's engine (no fix needed), pinned.** Seed 20261011 draw 8897
    (0-based; 8898 1-based): corridorUnion commits (an along closing among its closings) and bandUnion commits at L3;
    draw 7644 (7645 1-based): commits, no N-57 (2) refusal (the pinned-first engine, C-0391 / C-0421, pins the contact).
    Both are fixtures (`hardening.test.ts` 'Q58 / Q59 …', healthy arenas, exact tilings, no spur). Q58's partner draw
    1524 (1525 1-based) still refuses: kerb(F) `UNLAID_DEEP`, classed **insertChain's** by replay (cause `no-route`: a
    run the insertion cannot route) — not this item's line (insertChain is M0-a-05's; routed to the session with its
    seed, below row 97); pinned as a fixture of the refusal's class and its "nothing written" (so a change of class is
    seen). Census row: Q58 / Q59 lawful, MAKE-IT-SUCCEED — done for both draws (both commit); 1524 lawful,
    MAKE-IT-SUCCEED — another item's. **Q59's CLASS is not gone** (row 101): the clause "cannot pin its contact … within
    attractCm" still refuses lawful networks at about 0.7 per 10⁴ — REPORTED for a design ruling.
76. **L21 — re-measured under S9's read: offset 0 on the two-face case, CONFIRMED FIXED by measurement and pinned;
    fusion 30's measurement REPORTED.** The kerb read runs on the real arena's overlay since round S9 (C-0417), and the
    commit reads kerb(F) again in its own transaction, after the district's lanes exist (the queue row's second
    alternative, the one the code already takes): the read and the commit see one set of attractors. The two-face case
    (a long spine read alone, lanes then inserted as T-junctions on it, the corridors committed): every block's long
    edge at the spine's half-width, offset 0 cm per block (6 vertices, max 0) — `hardening.test.ts` 'L21 …', which
    holds the measurement. No mutant of the current code brings the row's cause back (two overlays, two attractors: the
    scratch overlay is gone since C-0417); the one tried, L21m (the dry-run laid at the batch's own level, not L2),
    leaves the fixture green — the S9 read is at L2 either way — and is killed by B-FUZZ. Fusion seed 30's way d2rb
    could not be re-measured: `packages/bench/src/fusion` holds no fusion pipeline in this tree (M0-x-06's in-flight
    edits; M0-c-06 blocked), and the smoke is M0-c-06's — REPORTED for the session: re-measure on fusion 30 when
    c-06's smoke runs.
77. **N-c2-1 (M0-a-01-notes:94) — fixed, pinned.** bandUnion.ts's crossing-rule copy (`insideKerb`'s Sunday crossings)
    is gone: `windsRound` sums exact.ts's `windingNumber` over the rings and tests `!== 0` (the fourth reading the note
    names, by its definition). Pin: `consolidated.test.ts` (new) scans bandUnion.ts's source by the TypeScript AST (the
    copy table's `sourceOf`): it imports `windingNumber` from `../num/exact.js` and declares no crossing loop; a control
    case sees kerb.ts's `strictlyInside` (copy site N-3). Mutant NC2 (the private crossing loop restored) red.
78. **N-c1-1 (M0-a-08-notes:287) — fixed, pinned.** tileRings.ts imports `simpleLoops` and `dropStraight` from
    winding.ts (bodies identical; its private copies and their `orient2d` import removed; the header says so); the
    arr/index.ts header's scaffold sentence reworded to who owns which re-export lines (no export added, removed or
    renamed: API frozen, J263 Q1). Pin: `consolidated.test.ts` — tileRings.ts imports both from `./winding.js` and
    declares neither. Mutant NC1 (tileRings.ts as round S13 left it) red.
79. **Row 1 KI-1 — fixed, pinned (count 0).** The census's dangling edges (an edge with one face on both sides, op
    roles) of committed L2 / L3 faces: 20261011 15 / 5 → 0 / 0, 1012 10 / 6 → 0 / 0 (10⁴ each). The fix takes the
    note's second shape ("remove the dangling edge in the same batch"): bandUnion.ts `dropSpurs`, before the read-back,
    strips through the removal door (`rewriteRows`, each row noted) every op-own edge (the op's edge role or
    `corridor_split`, at the batch's level) with an end of degree 1, repeatedly (a spur of two edges loses both); and an
    edge of the outline's role alone with one face on both sides and both ends reached — a BRIDGE bounding no block (the
    agreement's corridor family: 4 per 10⁴ at seed 20261011, its `dangling-attracted` note → 0; the widened family 1 →
    0). A split's bridge (notes row 57: a single split to an island kerb, marking the junction) is kept. Pins:
    `hardening.test.ts` 'KI-1 …' (draws 1043, 2345, 3066, 5811, 6773: no spur at L2 or L3, the blocks as before);
    bfuzz.test.ts's `checkNetwork` asserts `spursOf` empty on every network at L2 and L3; testkit
    `agreement-corridor.test.ts` 'the polygon+chord cases whose kerb bridged …' (draws 1567, 1756). Mutants KI1
    (`dropSpurs` not called) and BR (bridges kept) red.
80. **Row 3 K34 — pinned.** A way bounding F that leaves F's boundary and turns back 40 cm beyond F's box, its round end
    (radius 200 cm) reaching 160 cm into F: the near filter's reach (2 · half-width + sagitta + 4 cm) keeps the segment,
    the bite is in kerb(F), no kerb vertex deeper in the disk than the sagitta (≥ 196 cm), and S9 commits the read
    (`hardening.test.ts` 'K34 …'). Mutant K34 (reach 0) red. Not a carry-forward: the fixture needs no later material.
81. **Row 4 K35 — pinned.** The outline's boundary reading (`ON_BOUNDARY_SQ`, 1 cm²) on bandUnion.ts `outlinePieces`: a
    kerb edge 5 cm and 2 cm off a spine-less boundary is an outline piece (inserted), one within 1 cm is F's own edge
    (`hardening.test.ts` 'K35 …'). On the families the dry-run lays a part edge within attractCm of F's edge along it
    (W_STRETCH_SHARED; this round's probe of lane caps 3 – 12 cm off a shore), so the reading is pinned on the function.
    Mutant K35 (10 cm) red.
82. **Rows 5 K05 and 18 R04 — re-read against S9's read (J489 (a)): CONFIRMED that the families make no spike; pinned.**
    A probe of 2 × 10⁴ B-FUZZ networks (both seeds, every face read) under S9's dry-run read: `unspiked` dropped no
    vertex — the scratch overlay's trace that made zero-width spikes is gone. The final pass and the ring order are
    pinned deterministically: `splitsOn` on a recorded region with a zero-width spike, given out of order — the spike
    dropped, the rings in `compareRings` order, raw `toEqual` (K05); `kerb()` of the turn-away face (corridor.test.ts's
    fixture, the split end spliced in), raw `toEqual` on its rings (R04) — `hardening.test.ts` 'K05 / R04 …'. Mutants
    K05 (the spike test off) and R04 (the final unspiked/filter/sort pass removed) red. The register row the inventory
    offered (a PR-size spike seed) is not needed: the deterministic fixture holds the pass.
83. **Row 6 — fixed, pinned.** testkit's tileRings judge (`judgeTileResult`) settles an attracted overlap refusal only
    where §13.1 allows it: the oracle's piece has a hole, or two of its boundary parts lie within attractCm
    (`partsWithinAttract`: two rings, or two edges of one ring sharing no vertex, within 26 cm); otherwise a failure.
    Pins: `harness.test.ts` 'arr-bands tileRings judge …' (planted refusals: a plain square → failure; a hole → settled; a
    20 cm neck → settled; `partsWithinAttract`'s own cases). Mutant T6 (every attracted refusal settled, the old judge)
    red. The agreement at 10⁴ (seed 20261011): tileRings settled `overlap-attracted` 4, failures 0.
84. **Row 7 — fixed, pinned.** The judge's chord ran the whole box diagonal + 400 cm from the box centre and left
    oursCorridor's frame (20 000 cm round the box) on large polygons, so the arena refused the judge's own chord
    (E_LEVEL): 4 % of the draws settled `input-refused`. The chord now runs half the diagonal + 400 cm (still past the
    box on both sides); the verdict caps `input-refused` at 0.5 % and `not-united` at 0.1 % of the run
    (`INPUT_REFUSED_SHARE`, `NOT_UNITED_SHARE`). The agreement at 10⁴ (seed 20261011): input-refused 10 (0.1 %; the
    tunnel fixture's own), not-united 0. Pins: `guard.test.ts` 'the corridor cases stay inside the judge's own frame'
    (4 000 draws of the arbitrary: every chord end inside the frame and past the box); the caps in `verdict`. Mutant T7
    (the whole diagonal again) red.
85. **Row 8 — REPORTED (a contract change: J263 Q1).** Classing the agreement's refusals by replay needs replay.ts's
    machinery (kernel test code: `replayCommit`, `classify`, `causeOf`) reachable from testkit, i.e. a new export of
    `@plat/kernel` or of a kernel folder index (C-0122's test graph), which this round may not add. The agreement's
    refusal count at 10⁴ is 0 (`refusals {}` on both corridor ops and tileRings), so the prefix class decides nothing
    today; B-FUZZ already classes by replay. For the session's ruling: export a replay classifier (or move it to
    testkit) — then the agreement switches.
86. **Row 11 — fixed, pinned.** corridor.test.ts's random-network property bounds the attracted case's SYMMETRIC
    difference (`withinAttractedBound`: |g Δ e| by the kernel's own `booleans('xor')`, ≤ perimeter × √2 · attractCm)
    instead of |area(g) − area(e)|, which let a block moved off kerb(F) by any distance pass at equal area. Its refusals
    were already counted (`tally.refused`, asserted 0, since round S9). Pin: the planted describe 'the random-network
    property's attracted bound reads the symmetric difference' (a block of kerb(F)'s area moved 40 cm fails). Mutant T11
    (the old area difference) red.
87. **Row 12 — fixed, pinned.** The vacuous line (a literal ring normalised) is replaced by an output assertion: the
    upper face's committed block, `normals(ringsOf(p, 2, upper[0]))` = `0,2300 4000,2300 4000,4000 0,4000`
    (kerb.test.ts). Mutant R12 (kerb.ts's constant half-width read halved at interior vertices) red on the test that
    holds it (5 of kerb.test.ts's 8 tests red; in this one its split assertions fail first).
88. **Row 13 — fixed, pinned.** The generators widened: B-FUZZ gains a second family (`wideNetwork`: bent chords,
    dead-end antennae and ring ways — islands, faces with holes — with square ends and profiles), checked by the same
    `checkNetwork` (healthy, tiling, every block / band ring simple, holes clockwise inside their outer ring by winding
    — `nestingProblems` — no spur); the testkit agreement gains `widenedCaseArb` (dead-end lanes with square ends; a way
    across with a two-knot half-width profile, its oracle buffer per point and per end kind). Pins: the widened
    properties themselves; mutant HOLES (holes turned counter-clockwise in kerb.ts's final pass) red. The widened B-FUZZ
    family surfaces pre-existing refusals of class own — reported, row 97.
89. **Row 18 R04 — see row 82.**
90. **Row 21 X11 — DONE per plan (J489 (b)); its fixture did NOT stand, re-targeted and pinned.** The self-check ran
    mutant X11 (the spliced kerb point kept after the guard drops its chain) against the item's tests as round S13
    left them: it SURVIVED. The plan's fixture (widthstep.test.ts 'a corner wedge the guard drops …', chord case 43
    face 3) no longer reaches a spliced target: on its recorded region the corner's target (ii) is not spliced, and
    under S9's read the region holds a vertex at the corner. Where the straight-through split lands on the dropped
    splice's own point the splice comes back, so the mutant is equivalent there (draw 101); a census under the mutant
    found kerb(F) changed on 107 of 10⁴ networks at seed 20261011. New fixture: `hardening.test.ts` 'row 21 X11 …',
    seed 20261011 draw 268, face 2 (kerb(F) raw, the straight-through split from J = (3975, 2802)); mutant X11 red on
    it. widthstep.test.ts's case is left as it stands (its assertions hold; it no longer pins X11).
91. **Row 23 — fixed, pinned.** Re-read against S9's read (J489 (a)): the junction probe (every face of 2 × 10⁴ B-FUZZ
    networks) found 4 (20261011) and 5 (1012) junctions whose every target the guard dropped and no split drawn. kerb.ts
    `splitChain` now tries a fourth target where the guard dropped one: J → J's nearest kerb point (spliced), unless it
    is the third target's own. After: 20261011 2 drawn (draws 3620 and 8859, kerb reads changed), 2 collapsed; 1012 5
    collapsed — a collapsed target is J's nearest kerb point within the collapse distance of J (no split to draw: the
    band closes there by design). Residue with a kerb point in reach: 0 at both seeds. Pin: `hardening.test.ts` 'row
    23 …' (draw 3620, face 2: J = (17, 1389) → (0, 1370)). Mutant R23 (no fourth target) red.
92. **Row 24 XR1 — re-read against S9's read; pinned.** Seed 20261011 draw 390, face 1: target (i)'s wedge crosses the
    block and the retry draws the wedge through the kerb point nearest the meeting point (`hardening.test.ts` 'row 24
    …', raw split points). Mutant XR1 (no retry after target (i)) red.
93. **Row 27 — C7, C9, C6 pinned; C8 equivalent.** Hand-built faces (`hardening.test.ts` 'the closing's guards …',
    with `pinContact`, `runVertex`, `closeEnds` exported from bandUnion.ts — module exports, not the folder index):
    C9 — a vertex already at the contact is the pin, nothing written; C7 — a contact whose nearest route piece is on
    another face's boundary is not pinned from this face; C6 — an end with two edges is no tip. Mutants C9, C7, C6 red.
    C8 (the degenerate-chord skip): `planSplitThrough` returns `E_DEGENERATE 'empty'` only for a contact at the piece's
    end, which C9's vertex test returns first — unreachable, an equivalent mutant (one line, J169). C11 equivalent per
    the source note.
94. **Row 28 — the wrong unions fixed, the rest classed folded slivers; pinned.** Census of blocks beyond 2·√2·attractCm
    of kerb(F) with no closing (10⁴): 20261011 33 → 30, 1012 35 → 27. Classed by the depth of the difference: the wrong
    unions — 20261011 draw 8999 (a strip of way:1 42 cm deep in way:0's band committed as a block), 1012 draws 4066
    (two kerb corner triangles, 472 × 552 cm and 866 × 1 084 cm, committed as band), 6781 (a corner block as band) and
    8706 (a junction wedge 204 cm deep in the band as a block) — all from the read-back classing a face at ONE interior
    point while the commit's outline may stand up to N-43's bound off the read (a face straddling the read's outline).
    The read-back now classes each face of the batch's level by its exact area share inside kerb(F) as read (> ½,
    bandUnion.ts `shareInside`, exact by horizontal strips) — the choice of faces whose union differs least from kerb(F)
    (§13.2 S8 ≡ S9); a whole L1 face keeps its interior-point reading. Every remaining beyond-bar face is a folded sliver
    (depth ≤ attractCm; C-0218 (7), by design). An oracle written in the probe (share > ½ of every L2 / L3 face against
    kerb(F) read before) agrees with every class on the changed draws. Pins: `hardening.test.ts` 'note 28 …' (draws
    4066, 8706, 8999, 6781). Mutant N28m (any share inside → block) red.
95. **Row 30 N12 and row 31 N2 / N3 / N6 — pinned (N2 too: the source note's equivalent is killed here).** `closeEnds` asks for the pinned-first re-run,
    never a refusal, where no closing goes in — a tip beyond 2·√2·attractCm, or one the run cannot reach (N12, retry
    keys `"<face> 3 1"` / `"<face> 4 1"`); a tip whose contact stands 25 cm from a shore vertex is closed along the run
    to that vertex, never by a chord pinned 25 cm off (N3: the pin within the contact's 1 cm and the hot pixel); `runVertex`
    takes the far end where another piece's contact stands between (N6). Mutants N12a, N12b, N3, N6 red; N2
    (`ALONG_SQ` unbounded) red on the N12 fixture's tip beyond 2·√2·attractCm. Not carry-forwards: hand-built faces
    need no later material.
96. **Row 32 — fixed (comment only; the text is the deliverable).** bandUnion.ts's header said the along chord errs "by
    at most attractCm + 1 cm"; `ALONG_SQ` admits tips up to 2·√2·attractCm and the families reach them (the note's eight
    draws). It now reads, as the note suggests, "by at most the tip's offset (≤ 2·√2·attractCm, N-43: the insertion's
    own displacement of the contact, which the closing keeps and never adds to; notes row 32)". The header's sentence on
    the read-back's classing is brought to row 94's rule (area more than half inside kerb(F), exactly, by strips).
97. **For the session (J264 / N-58: lawful-input refusals routed with their input).** (a) Q58's partner, seed 20261011
    draw 1524 (1525 1-based): kerb `UNLAID_DEEP`, insertChain's (cause `no-route`) — LAWFUL, MAKE-IT-SUCCEED, M0-a-05's.
    (b) The widened B-FUZZ family (row 13; new this round, identical before and after the round's engine, 2 000 draws per
    seed): own refusals, all `E_INVARIANT` — 20261011: kerb 8 / corridorUnion 11 / bandUnion 3 (KEPT_DEEP: "a kept face
    of the dry-run holds a point of a part deeper than an insertion moves", draws 544, 546, 775, 899, 1008, 1504, 1702,
    1873 at L2, 355, 1553, 1857 at L3; "ends on a dangling tip … off the face's boundary", draws 301, 511, 1621);
    1012: kerb 15 / corridorUnion 17 / bandUnion 1 (KEPT_DEEP draws 77, 253, 397, 938, 999, 1345, 1364, 1405, 1458,
    1590, 1631, 1711, 1712, 1907, 1938 at L2, 1656 at L3; dangling tip draws 584, 1199). Input LAWFUL (ring ways round islands; a lane's dead end at an antenna);
    verdict MAKE-IT-SUCCEED; the widened B-FUZZ property reports them (counted, uncapped) and does not fail on them, as
    the round may not raise the census of the registered family (the chord family) and these are a new family's.
    insertChain's refusals there: 20261011 9 / 9 / 0, 1012 14 / 14 / 1.
98. **Refusal census (J264 (4), N-58) and declared shift (J260 (3)).** Registered families, before (round S13's
    engine) → after (this round's), 10⁴ per seed: B-FUZZ chord family refusals kerb / corridorUnion / bandUnion
    20261011 10 / 16 / 8 → 10 / 16 / 8, 1012 9 / 12 / 2 → 9 / 12 / 2, all insertChain's by replay, own 0 → 0, crashes
    0; the agreement (testkit) after, 10⁴ at seed 20261011: refusals 0 on corridorUnion, its bands and tileRings (round
    S13's NEAR met 1 own at an unseeded PR size, row 73 — a kerb read refusing, kerb.ts's KEPT_DEEP class of row 97).
    Never rising. DECLARED SHIFT (committed outcomes,
    each a wrong or short result made right — rows 1, 23, 28): 20261011 — kerb reads changed on 2 draws (3620, 8859:
    the fourth target's split), corridorUnion arenas on 15, its results on 9, bandUnion arenas on 20, its results on 6;
    1012 — 0 / 11 / 14 / 20 / 11; the census digest (sha-256 over every draw's outcome) 20261011 a086bda9… → baa0b632…,
    1012 01f20f5c… → 2039dc2a…. The bridge removal (row 1's second part) moved no outcome of the chord family (digests
    equal before and after it). No persisted digest, golden or register row of the repository changed; none
    re-recorded.
99. **Found by this round's self-check, fixed, pinned: a throw on a lawful input (N-45: fail-safety).** Mutant BR's run
    (B-FUZZ, unseeded, seed -1784686652, shrunk) met `arena: vertex 20 is not live` in bandUnion.ts's read-back — on the
    round's engine as well, not the mutant's: network {15589 → 7960, hw 1, knots 338 / 539, round}, {7179 → 0, hw 24},
    bandUnion at L3 along way:0. Face 1's piece ends on a tip 25 cm from its contact (1618, 1286); the along closing's
    chord to the run vertex (3404, 2705) passes within attractCm of the piece's own vertices (2550, 2071) and
    (3092, 2474), so the insertion laid it back along the piece (W_STRETCH_SHARED): the tip kept one edge, `dropSpurs`
    (row 79) took it out, and the read-back's along rule read the dead tip. On round S13's engine the same network
    committed with that spur (KI-1's class). The read-back now skips an along closing whose tip (or run vertex) is gone:
    the piece ends where the chord left it and its faces are classed by area (row 94). A retry with that end pinned
    first was tried and rejected: on this network the pinned-first path refuses (`cannot pin its contact … within
    attractCm`, own) — a lawful input refused where committing errs by about 44 cm at most (the wedge between the tip and
    (3092, 2474); below N-43's 2·√2·attractCm). Pin: `hardening.test.ts` 'an along chord laid back onto its own piece …'
    (commits at L2 and L3, healthy, tiling, no spur, face 1's block (3092, 2474) – (3404, 2705) – (4000, 3179) –
    (4000, 3263) kept). Mutant AL (the guard removed) red. The census on the final engine is unchanged by it (the chord
    and widened families' digests equal before and after: no such network among their 2.4 × 10⁴ draws).
100. **Self-check (J183; the lane mirror, the item's two test folders — 21 files, B-FUZZ included — at
    `PLAT_FUZZ_RUNS=1000`, `--bail=1`, W=1; each file restored from the tree and `cmp`-checked).** Base 21 / 21 files,
    152 / 152 tests. Killed (first red): AL — hardening 'an along chord laid back …' (row 99); BR — agreement-corridor
    'the polygon+chord cases whose kerb bridged …' (row 79); KI1 — bfuzz (a spur) (row 79); N28m — deadend.test.ts and
    hardening 'note 28' (row 94); K35, K34, K05, R04 — their hardening fixtures (rows 80–82); C7, C9, C6, N12a, N12b,
    N3, N6, N2 — hardening 'the closing's guards' (rows 93, 95); NC2 — consolidated 'N-c2-1' (re-run on the final
    bandUnion.ts; row 77); NC1 — consolidated 'N-c1-1' (row 78); R23 — hardening 'row 23' (row 91); XR1 — hardening
    'row 24' (targeted run; in the sweep the KI-1 draws went red first) (row 92); X11 — hardening 'row 21 X11' (the
    re-targeted fixture; it survived the sweep on the plan's fixture, row 90); R12 — kerb.test.ts (row 87); HOLES —
    bfuzz's widened family (row 88); T6 — harness.test.ts (row 83); T7 — guard.test.ts 'the corridor cases stay inside
    the judge's own frame' (targeted; in the sweep the agreement's caps first) (row 84); T11 — corridor.test.ts's
    planted describe (row 86); L21m — bfuzz (not the L21 fixture: row 76). Survived: C8 — equivalent (unreachable behind
    C9; row 93). 28 mutants, 27 killed, 1 equivalent.
101. **NEAR #2 RED — B-FUZZ's own cap (1 per 10⁴) met 2, a pre-existing class (Q59's) that needs a design ruling.**
    NEAR #2 at the PR size (unseeded): `bfuzz.test.ts` 'kerb, corridorUnion and bandUnion on random street networks'
    failed `expected 2 to be less than or equal to 1` (corridorUnion own): (a) {14426 → 56, hw 23, square},
    {15969 → 7961, hw 227, square}, {14544 → 7980, hw 25, knots 76 / 559, square} — `outline: piece 0 of the face 3
    cannot pin its contact at (13, 1218) within attractCm on the face's boundary (N-57 (2))`; (b) {11816 → 53, hw 1,
    knots 99 / 7, square}, {13 → 11231, hw 11, square} — `outline: piece 0 of the face 3 ends on a dangling tip at
    (109, 432), off the face's boundary (N-57 (2))`. Both refuse IDENTICALLY on round S13's engine (the lane mirror with
    round S13's kerb.ts and bandUnion.ts): not this round's regression. The rate, measured on the final engine with
    B-FUZZ's own arbitrary (`fc.sample`, 10⁴ per seed): seeds 20261011 0, 1012 0, 1 1 (draw 8419), 2 0, 3 1 (7294), 4 2
    (8149, 9373) — 4 per 6 × 10⁴, every one the clause "cannot pin its contact … within attractCm"; so a random 10⁴ run
    meets ≥ 2 about one time in seven, on either engine (the four draws refuse identically on round S13's kerb.ts /
    bandUnion.ts, replayed in the mirror). Cause (case (a), probed): the contact (13, 1218) stands 13 cm
    from the L0 frame; §3.6's placement of a vertex on F's boundary edge (42, 410) – (4, 1481) there falls back onto the
    edge's end (4, 1481), 263 cm off, so `pinContact` cannot pin it within attractCm; three of the other four contacts
    stand 4 – 20 cm from the frame too. Making the class succeed needs N-57 (2)'s contract changed (a contact pinned
    farther than attractCm, or the piece's end folded where the kerb narrows below attractCm — a partial fold), or
    §3.6's placement (M0-a-05's) — not this round's to build (J263; rule (3) of a hardening round): REPORTED for the
    session's ruling, with the inputs above. Case (b)'s clause also stands in the widened family (row 97). B-FUZZ's
    cap is left at 1 (Q59's line).
102. **Gates of round S14 (tree, the final engine; W=1).** install --frozen-lockfile 0; lint 0 (eslint 1172 files
    0 / 0, `probe-red ok`, `kernel-boundary ok` — bandUnion.ts's 'kerb' identifiers held at 14 and 'corridor' strings at
    2 by `splitRoleId`); build 0. B-FUZZ at 10⁴: `PLAT_FUZZ_SEED=20261011` exit 0 (3 passed, 493 s), `=1012` exit 0
    (3 passed, 488 s). NEAR at the PR size, unseeded, the item's 21 files: #1 153 / 153 exit 0 (1214 s); #2 152 / 153
    exit 1 — row 101. RELATED@1000 over kerb.ts, bandUnion.ts, tileRings.ts and arr/index.ts (6109 s): 353 files,
    4503 / 4506; the three reds are the known foreign pins — kernel and kernel-tiny `insert/step3-5/sliver.test.ts` Q53
    (a-05's) and testkit `ladders/rungs-s8.test.ts` cut/antenna (x-05's) — replayed in the lane mirror on this round's
    engine and on round S13's kerb.ts / bandUnion.ts: the same three assertions fail with identical received values.
    Census re-run on the final engine (rows 98, 99). Logs: the session scratchpad's `s14/` (`g-*.log`, `c6-*`,
    `w6-*`, `rate-*`, `mut/`).

## Closing check of hardening round S14 (lane `check/M0-a-09-close-s14`, 2026-10-26)

The verdict is in `checks/M0-a-09-s14.md`. The rows below are the check's non-blocking findings, each for the hardening
milestone M4 unless named earlier; every figure is this seat's own (its mirror, its mutants M01 – M31, its probes P1 – P6).

103. **A T-junction's strip-join vertex attracts the kerb corner of a lane within attractCm of it — in the read and the
    commit alike (S8 ≡ S9 holds; L21's class is gone).** P5 / P5b: a slanted spine (half-width 300) with two lanes
    (half-width 100) inserted on it as T-junctions, the kid faces read in an L1 batch and committed at L2: every S9 block
    equals its S8 read vertex for vertex, and the long edge's vertices stand 0.2 – 0.5 cm off the design line — but the
    kerb corner where a lane's inner edge meets the long edge lies within attractCm of the spine's strip-segment join at
    the T (the join vertex a lattice step off the line, so `dropStraight` keeps it) and is attracted onto its height:
    3.63 cm off the design line on the spine (0, 500) → (4000, 1700) (corners (900, 1087) and (2850, 1672), design
    y 1083.2 / 1668.4) and 9.10 cm on (0, 300) → (4000, 2100) (corner (900, 1024), design 1034.0). Within §3.7's
    attraction allowance and identical on both sides of §13.2, so not L21 (whose read and commit disagreed by up to
    49 cm). Suggested handling: at a straight-through T the two strips of one spine could be buffered as one run (no
    join vertex at the T; §2.2 rule 5 says the T carries no knot), or the join vertex dropped where it lies within the
    hot pixel of the line. Milestone: M4 (hardening).
104. **The builder's reconstruction of round S13's sources is not hash-equal to S13's record.** The lane's CHECKPOINT of
    2026-10-25 19:23 says the originals of the five source files were "reconstructed in the scratchpad and hash-equal
    to the S13 landed record"; the files there (`scratchpad/s14/orig/`) differ from the tree exactly by the round's
    edits (diffed), but their sha256 — kerb.ts `738a54ea…`, bandUnion.ts `53bf2067…` — are not the hashes
    `checks/M0-a-09-s13.md` quotes for S13's record (`1a59c05a…`, `c8938850…`; `landed` hashes raw bytes, the tree's
    hashes equal its record). This seat used them only as PLAUSIBLE S13 sources (P6: which fixtures are red without the
    round's engine). Suggested handling: the session, which alone runs git, confirms round S13's engine from the
    repository when it needs the like-for-like comparison (Q104's "refuses identically on round S13's engine"), and the
    lane line's claim is read as "equal up to the round's edits". Milestone: the session's commit of this round.
105. **The agreement verdict's new caps are a test-helper assertion no test pins.** Mutant M10 (testkit `support.ts`
    `verdict`'s `input-refused` ≤ 0.5 % and `not-united` ≤ 0.1 % lines dropped) survives `harness.test.ts` and
    `guard.test.ts`; the chord clamp itself is pinned (`guard.test.ts`, M09 killed). Suggested handling: one
    `harness.test.ts` case planting `h.settled` above each cap and expecting `verdict` to throw (as the Q84 case does for
    `h.failures`). Milestone: M4.
106. **C8 judged equivalent by this seat's own reasoning (row 27).** Mutant M19 (`closeEnds` refuses a chord that
    collapses `E_DEGENERATE empty` instead of skipping it) survives the hardening fixtures at 1000: the chord from the tip
    to its pin collapses only when the two stand within minEdge (25 cm); a vertex that close would have attracted the
    tip at the piece's insertion (attractCm 26 > minEdge), and the placement never puts a new vertex within minEdge of
    the tip (§3.6, `placePoint`'s endpoint fallback), so the skip is unreachable — PLAUSIBLE (reasoned; the builder's
    reading, "behind C9's vertex test", reaches the same end by another road). Suggested handling: none beyond a
    hand-built case if the hardening pass wants the skip pinned or removed. Milestone: M4.
107. **The row-23 residue after a guard drop is the kerb passing through J (C-0281 (2)); the count of the inventory's
    class is 0.** P4 / P4b (the mirror's `splitChain` instrumented): per 10⁴ networks, junctions left with no split after
    the guard dropped a candidate — 20261011 6 of 10 447, 1012 17 of 11 004 (4 with no kerb point within reach) — and
    every one with a kerb point in reach has that point AT J (|J N| = 0, J within 1 cm of a kerb edge; half-widths
    1 – 27 cm, the bands folded onto F's boundary), so target (iv)'s chain is one point and nothing is drawn, by design.
    Suggested handling: none (a reading of the count, for the record). Milestone: —.
108. **For the session (ZERO REFUSALS, J264; N-58): the widened B-FUZZ family's own refusals, re-measured identically.**
    At 2 000 networks per seed in this seat's B-FUZZ runs: 20261011 kerb 8 / corridorUnion 11 / bandUnion 3 own
    (KEPT_DEEP 8 + 3, the clause "ends on a dangling tip … off the face's boundary" 3 — the builder's row 97 figures and
    draws), 1012 15 / 17 / 1 (KEPT_DEEP 15 + 1, the dangling-tip clause 2); insertChain's 9 / 9 / 0 and 14 / 14 / 1. Input
    LAWFUL (ring ways round islands; a lane's dead end at an antenna); verdict MAKE-IT-SUCCEED; counted and logged,
    uncapped (the chord family's cap never widened). The REFUSAL lines with each input stand in this seat's logs
    (`logs/bfuzz-20261011.log`, `bfuzz-1012.log`) and the builder's row 97 lists the draws. Milestone: the session's
    ruling (Q104's clause for the dangling-tip class; KEPT_DEEP's for the islands).
109. **The builder's disclosed working-rule breach, for the record.** L-0651 discloses one `git -C plat status`
    (read-only) early in the build seat, against the brief's "run NO git command of any kind", nothing used from it;
    not a clean-room breach (no forbidden folder read). Suggested handling: the session's note at the commit.
    Milestone: —.
110. **The Q104 class in this check's unseeded NEAR runs (RULING N-63): not met.** B-FUZZ's chord family at the PR
    size in NEAR #1 and NEAR #2 (random seeds) and at the fixed seeds 20261011 / 1012: own refusals 0 / 0 / 0 on every
    operation — no refusal whose message is one of N-57 (2)'s two clause texts in the registered family, so this check
    counts nothing under Q104 (the builder's rate, 4 per 6 × 10⁴ at seeds 1 – 4, all "cannot pin its contact … within
    attractCm", is not contradicted by 2 × 10⁴ unseeded draws). The dangling-tip clause stands in the WIDENED family
    only (row 108: 3 and 2 per 2 000 networks, a lane's dead end at an antenna). Milestone: the session's ruling on
    Q104 (M0-a-05's placement) and on the widened family's classes.
