"""Whole-paragraph rewrites where several issues meet in one paragraph (kept readable instead of patched twice)."""

CI_OLD = """**CI tiers (§13.8).** PR: T-V2-1 – T-V2-21, T-V2-25 – T-V2-28, T-V2-30 (B-MASS against the compiled V11 templates),
T-V2-33 – T-V2-35, T-V2-37 – T-V2-43, T-V2-54, T-V2-56 and T-V2-57 on B-MASS and B-PLAN (≈ 60 s), and T-V2-55 on 20 seeds
per rung. Nightly: B-CITY bars (T-V2-22, T-V2-29, T-V2-30, T-V2-32), T-V2-36 from M6-U, T-V2-55's full bench, the harness
at N = 2 000 (T-V2-31), B-EDIT at 10⁴ with the new kinds. Milestone: METROPOLIS runs, exports, the harness at N = 20 000,
the owner's panel."""
# VV12-02 (T-V2-58's tiers) and VV12-04 (the ten-second timings at the cap)
CI_NEW = """**CI tiers (§13.8).** PR: T-V2-1 – T-V2-21, T-V2-25 – T-V2-28, T-V2-30 (B-MASS against the compiled V11 templates),
T-V2-33 – T-V2-35, T-V2-37 – T-V2-43, T-V2-54, T-V2-56, T-V2-57 and T-V2-58's B-MASS clauses on B-MASS and B-PLAN
(≈ 60 s), and T-V2-55 on 20 seeds per rung. Nightly: B-CITY bars (T-V2-22, T-V2-29, T-V2-30, T-V2-32), T-V2-36 from
M6-U, T-V2-55's full bench, T-V2-58 on B-VILLAGE's rich fixtures, the harness at N = 2 000 (T-V2-31), B-EDIT at 10⁴
with the new kinds. Milestone: METROPOLIS and population-cap runs, exports and their ten-second timings (T-V2-22,
T-V2-24), the harness at N = 20 000, the owner's panel."""

DEP_OLD = """**Dependencies.** M3a-V2 needs the base's deck plots (item 246), V11's `deck` row (X16; the stand-in constants otherwise)
and its specialisations (X17; without them only the fixture's declared class and the `family` op reach `stepped`);
V03's plans of tiers (X18) follow M6b as its plan rung does, while V03's eager facts at M3a (`ground(b)`, `floorCm`,
`basementDoor(b)`, `stackAccessDoor(b, a)`) read the stack helpers M3a-V2 exports and land after them in the same
milestone."""
# VAF-R0S-13 (no stand-in)
DEP_NEW = """**Dependencies.** M3a-V2 needs the base's deck plots (item 246), V11's `deck` rows (X16; C3b — until they land the
table is empty and no deck plot exists, V11 §2.1's empty-table rule, so T-V2-47 waits for them) and its specialisations
(X17; without them only the fixture's declared class and the `family` op reach `stepped`); V03's plans of tiers (X18)
follow M6b as its plan rung does, while V03's eager facts at M3a (`ground(b)`, `floorCm`, `basementDoor(b)`,
`stackAccessDoor(b, a)`) read the stack helpers M3a-V2 exports and land after them in the same milestone."""

T55_OLD = """  drew it under V07's cap; the `VG` preset's `sunBias` is 0.5; every dwelling but a `grandClasses` building reads its row under the
  rung's grandeur ceiling at THORP, HAMLET and VILLAGE, and no row is capped at TOWN and above (V02 §3.2 step 2; T-V2-58
  holds the bar); every row of V02 §3.18 (b) and (c) holds."""
T55_NEW = """  drew it under V07's cap; the `VG` preset's `sunBias` is 0.5; every dwelling but a `grandClasses` building reads its
  row under the rung's grandeur ceiling at THORP, HAMLET and VILLAGE, and no row is capped at TOWN and above (V02 §3.2
  step 2; T-V2-58 holds the bar); every row of V02 §3.18 (b) and (c) holds."""


def add(E):
    E('VV12-02 VV12-04 CI tiers', CI_OLD, CI_NEW)
    E('VAF-R0S-13 §8.5 dependencies', DEP_OLD, DEP_NEW)
    E('VV12-02 T-V2-55 reflow', T55_OLD, T55_NEW)
