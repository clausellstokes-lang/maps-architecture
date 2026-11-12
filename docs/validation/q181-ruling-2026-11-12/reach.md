# Q181 — the reach of the amended rule outside the kernel (the managing session, 2026-11-12 07:50Z – 08:03Z)

Method: the UNCHANGED kernel at e5029a5f (its decisions untouched), with a probe in `rewriteRows`' flag step that also
evaluates the amended rule and appends a line whenever the two decisions differ, naming the test file that reached it
(`globalThis.__vitest_worker__.filepath`). Self-test: `test/tx/removals.test.ts` (N-19's file) logs 2 events. Then one
pass of the `site` project at the PR size (22 files, 215 tests, green) and part of `layout`; stopped there — the answer
was already clear.

| events (all old = cleared, new = KEPT) | test file |
|---|---|
| 629 | `packages/site/test/water/exit-bar.test.ts` |
| 88 | `packages/site/test/water/stage.test.ts` |
| 80 | `packages/site/test/water/references-row.test.ts` |
| 60 | `packages/site/test/water/slow-rings.test.ts` |
| 28 | `packages/layout/test/pipeline/base/run.test.ts` |
| 16 | `packages/site/test/water/faces.test.ts` |
| 8 | `packages/layout/test/enceinte/bend.test.ts` |

TWO CLASSES, by the rows' kinds (909 events in all): (i) 854 — a vertex on the arena's frame where a water body's shore
meets it: three L0 edges, the pair "frame alone / shore + frame" sharing the frame's row (row kinds 9 alone, 6 + 9,
6 + 7); (ii) 47 — a vertex where two water bodies' shores meet (a confluence or a mouth): three L0 edges, a pair
sharing one body's shore row while the other body's shore rides on one side (kinds 6 + 7, 6 + 6, 6 alone); 8 others
mix the two. Three sample lines (file, decisions, vertex, the row lists of the lowest-level
pairs as kind/entity/ordinal/level):

```
packages/site/test/water/slow-rings.test.ts	old=false new=true	v=(-43818,-7471)	[9/0/0/0 | 6/1/0/0,7/1/0/0] [9/0/0/0 | 6/1/0/0,9/0/0/0] [6/1/0/0,7/1/0/0 | 6/1/0/0,9/0/0/0]
packages/site/test/water/slow-rings.test.ts	old=false new=true	v=(25877,43818)	[6/1/0/0,9/0/0/0 | 6/1/0/0,7/1/0/0] [6/1/0/0,9/0/0/0 | 9/0/0/0] [6/1/0/0,7/1/0/0 | 9/0/0/0]
packages/site/test/water/slow-rings.test.ts	old=false new=true	v=(-43818,-9707)	[6/1/0/0,9/0/0/0 | 6/1/0/0,7/1/0/0] [6/1/0/0,9/0/0/0 | 9/0/0/0] [6/1/0/0,7/1/0/0 | 9/0/0/0]
```

WHAT IT MEANS: under the amended rule the flag byte of every such vertex changes on every derivation whose water
touches the frame, so every such arena's bytes and every root downstream move — a declared shift far wider than the
forms Q181 names (the confluence class likewise). The fold into the merged RQ2 round (option F) would take away that round's strongest net (its
LINE 7: roots and the golden probe identical on arenas without a `shape` row). THE SESSION'S LEANING IS THEREFORE
OPTION S — the rule as its own round after the RQ2 round, with its own measured re-pin list — pending the adversarial
review, which has been told this figure.
