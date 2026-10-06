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
