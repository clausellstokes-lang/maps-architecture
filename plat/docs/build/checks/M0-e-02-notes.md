# M0-e-02 — the closing check's notes (not failing lines)

These notes come from the closing check of item M0-e-02 (lane `check/M0-e-02-close-r1`, 2026-10-04). Under the
session's rulings J162 and J169, the closing check fails the item only on a blocker. The finding below is not a
blocker. It is a hardening test for a rule the fix round recorded (C-0175 (5)), found while the closing round confirmed
line 3. Its row names its handling and where it belongs. The verdict and its evidence are in `checks/M0-e-02.md` (the
closing round is at the top).

The first check's notes (the "60 m relief" fixture's range, the stale step-1 comment in `trace.ts`, the corridor's D8
from the planned bed, the M0-e-06 dependency) are bullets in `checks/M0-e-02.md` round 1 and carry no ids. This file
starts the numbering at N-1.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-1 | **C-0175 (5)'s closing of a line-fault's cells has no test that fails without it.** When a re-trace finds that the course through the descent line itself fails the same check, `traceRiver` marks the failing cells closed (`trace.ts` 465, `for (const c of shut) closed[c] = 1;`), so the re-run descent can take another way. Mutant L3e keeps the event but drops the effect (`closed[c] = 0`). It survives the item's whole hydro set: `56 passed (56)`, exit 0, on the scratch mirror with `--maxWorkers=1` (CONFIRMED, executed). The ridge test (`river.test.ts` 454, line 2 (d)) asserts only the event's `closed?.length` of 1. Its ridge spans the arena, so the trace fails on the carve whether or not the cell is closed. No fixture has a line-fault that a detour can cure. The kept code does what C-0175 (5) says (by reading; PLAUSIBLE). Whether the closing changes any relief-fixture outcome was not measured. This is not one of the three parts of route (i) that line 3 named (the carve-bounded surface, the halving re-trace and the nearest-descending inlet), and all three are pinned (L3f, L3d and L3g are red). | Add a fixture whose descent line crosses one over-cap cell (a one-cell pit or a short ridge stub on the raster, invisible to the hydrology grid) with a detour beside it. Assert that the trace re-routes (`ok`, `end.kind` `frame`) and that its course avoids the closed cell. L3e must go red on it. | M4 (hardening), or earlier at the next touch of `site/src/hydro/trace.ts` |
