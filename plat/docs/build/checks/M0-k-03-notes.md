# M0-k-03 — the closing check's notes (not failing lines)

These notes come from the closing check of item M0-k-03 (lane `check/M0-k-03-close-r3`, 2026-10-04). Under the
session's ruling J162, the closing check fails the item only on a blocker. Every finding below is a hardening test or a
claim to tighten, so none of them fails the item. Each row names its handling and the milestone or item where it
belongs. The verdict and its evidence are in `checks/M0-k-03.md` (the closing round). The earlier checks' open notes —
N-1 (no `tileRings` adapter; M0-a-09 passes `'nonzero'`), N-5 (`CompareOptions.measure` is a test seam), N-7 (a harness
reports and bounds `unjudged` and `refusals`), N-8 (the two oracles' face counts differ on about 0.1–0.2 % of random
booleans) and N-9 (a plain throw beside a refused cross-check returns a refused verdict) — stay in `checks/M0-k-03.md`
and are not repeated here.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N1 | The unattracted comparison reads ours as a region: the face count is the region's connected pieces (C-0144 (3)) and `symDiffArea` reads both sides by the non-zero rule. So a ring-level fault of ours that leaves the region unchanged, such as a duplicated face, passes an unattracted verdict. CONFIRMED in a scratch copy: ours `[sq, sq, tri]` against either oracle's union of `sq` and `tri` gives `pass` true, `failures` `[]` and `faces {ours 2, oracle 2}`; the same case marked attracted fails with `invalid: crossing edges`. This follows §3.7's text, which asks for §3.10's hard invariants on attracted cases only, so it is not a fault of M0-k-03. A scratch mutant that reads `symDiffArea`'s polygon-clipping xor under even-odd (C02) survives all ten oracle test files: the two rules read sets of disjoint faces alike, so the fill rule matters only for faults like this one. | M0-a-08's and M0-a-09's harnesses check §3.10's hard invariants (or `ringProblems`) on every case they draw, unattracted cases included, or record in a choices row why not. | M0 (M0-a-08, M0-a-09) |
| N2 | C-0150's test column names `regression.test.ts` for F4's two cases only. Fix round 3 added a block for F5 (`symDiffArea`'s measuring xor and `faceCount`'s union on case 2's rings r0 and r2) and no choices row, because it made no deviation. The block is described in the file's header and in the round's LANDED line. | No action now. The next row that amends C-0150 cites the F5 block among its tests. | M4 (or the next row touching C-0150) |
