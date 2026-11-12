# The session's seams at the seventy-ninth landing (M0-c-04 S6; J786, J789) — 2026-11-12

M0-c-04 S6 (child DU) was built on a base (3a5d75b0) that predates M0-e-02 S2's declared shift (C-0498: a river whose
re-traces fail is re-traced along its descent line). Two things in its `packages/layout/test/growth/s5ab/held.test.ts`
therefore do not hold on the merged tree, and both are re-pinned by the session (lane session/c04s6-seams-1, L-0830):

* (a) THE SEAM OF L-0825 RE-APPLIED. The round's overlay brought back the test-size case on relief-60 seed 2, whose
  stage-1 wall stands inside stage 2's plain boundary since the shift. The case is on seed 12 again and the header's
  paragraph restored: L-0825's two hunks, merged three ways with the round's own changes (`git merge-file`, clean).
  Evidence of the original seam: ../j786-e02s2-seam-2026-11-12/.
* (b) THE ROUND'S THREE NEW LITERALS RE-RECORDED. The pin of C-0475 (2)'s narrowing on relief-60 default seed 13 at
  CITY read, on the round's base, t_3 = 82 753.025 155 004 19 cm, 218 outline points and 26 points of stage 2's wall
  outside stage 3's boundary. Seed 13 is one of the sixteen relief-60 CITY seeds whose river the shift moved:
  `pre-check-on-the-merged-tree.log` is the round's five test files on the merged tree with seam (a) — 10 of 11, the
  one red `expected 82824.21830212144 to be 82753.02515500419` (held.test.ts :145).
  `seed13-plain-on-the-merged-tree.json` is the same derivation read by a probe copy of the case: t_3
  82 824.218 302 121 44 cm, 700 outline points, 6 of the wall's 204 points outside. The pin is NOT VACUOUS there:
  `seed13-under-M6-on-the-merged-tree.json` is the probe with the mutant M6 planted in the scratch tree's
  growth/mainRoads.ts (`const wall = lastWall(state)` — the held enclosure on an unwalled stage too; restored and
  `cmp`'d after): t_3 82 024.299 516 831 96 cm, 898 points, 0 outside — all three still move. The three constants take
  the merged tree's values; no assertion is added or removed. `seed13-final-file.log`: the case alone with the final
  file, 1 of 1.

The round's other pins hold on the merged tree as landed: q173.test.ts (the two refusals verbatim), ways.test.ts,
held-unit.test.ts and the other six cases of held.test.ts (the pre-check's ten greens). The folder whole at full
strength is the landing's NEAR gate.

For the item's next round (M0-c-04 S7, a line of its spec): a literal on a whole derivation moves with every upstream
shift; the pin is better stated against the plain reading the test computes itself.
