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
