# J723 — the scan test's timeout seam (Q147), 2026-11-09

The session's seam on `plat/bench/test/scan/scan.test.ts` (M0-k-06's test), lane `session/k06-scan-timeout-seam-1`,
CLEAN-ROOM row L-0739. One case — the real whole-tree scan with a synthetic deny-list, K6-6 — takes an explicit
`60_000` ms timeout and a comment saying why; nothing it asserts changed.

| log | run | result |
|---|---|---|
| before.log | the file alone on this container, idle, before the seam | 9 passed of 9 (the red is load-dependent: 5.8–7.2 s were recorded on loaded containers, Q147) |
| after.log | the file alone after the seam, idle (verbose) | 9 passed of 9; the case 3342ms |
| after-under-load.log | the same with six busy loops on the container's four cores | 9 passed of 9; the case 6624ms |
| eslint.log | eslint on the file | exit 0 |

The red's mechanism is reproduced by the third run: under load the case took 6 624 ms — over vitest's default
5 000 ms, which is what failed it in every RELATED@1000 run of x-04 S1, x-05 S1, x-06 S1 and the g16 integration check
(Q147) — and it passes because the seam's timeout now bounds it; idle it takes 3 342 ms.
