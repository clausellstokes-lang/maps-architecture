# M0-f-01 — notes (hardening rounds)

The item's first check and its rounds r1 and r2 are in `checks/M0-f-01.md`, which stays as committed. This file holds
the session's hardening rounds: the builder's row-by-row outcome and, below it, the closing check's notes.

## Hardening round S1 — the builder's notes (lane `build/M0-f-01-fix-s1`, flow flow-7, 2026-11-09)

The session opened this round (J725, 2026-11-09, under the owner's delegation; vetoable) as the first leg of a merged
round (J443: M0-f-01 S1, then M0-d-06 S2, then M0-t-00 S1 on one tree). It has ONE line. M0-t-00 S1's RL10 (queue row
Q72) times a production bundle in a CHILD of a tsx launcher. The launcher's own loader service (`esbuild --service`,
the launcher's child) is then a SIBLING of the measuring process, outside C-0138 (3)'s exemption. The kind clause would
refuse a quiet machine for the script's own launch on every run, which is B1's class again (`checks/M0-t-00.md` B1).
No earlier session round of M0-f-01 is in the lane log. **One source file changed:** `bench/src/timing/contention.ts`.
The test changed in `bench/test/timing/contention.test.ts`. The choices row is C-0465.

The spec seat's reading of the topology, `docs/validation/t00-s1-spec-2026-11-09/spec-t00-s1.md` §b.4, is cited as
evidence for this line. **This seat did not open it.** `docs/validation/` is outside an implementer seat's reading list
(§17.1 (1), the brief's CLEAN ROOM paragraph), and the binding rule wins over the citation. The line's
`required_change` states the rule and its four pins in full, so the fix needs nothing from that file. The topology the
line describes (a launcher `node` that is an ancestor, its `esbuild` child, this process) is the one pinned below. It
matches B1's `ps` evidence in `checks/M0-t-00.md` (`MainThread` / `esbuild --service=0.28` rows, read in `plat/`).

### Row by row

| row | outcome | the fix or pin and its evidence | mutant (lane mirror) |
|---|---|---|---|
| LINE 1 — the launch-chain loader exemption | **FIXED** and **PINNED** | `contention.ts` `judgeContention`: the kind-clause exemption `runtime` was `launch.has(r.pid) \|\| (r.ppid === machine.selfPid && base === LOADER)`. It is now `launch.has(r.pid) \|\| (base === LOADER && (r.ppid === machine.selfPid \|\| launch.has(r.ppid)))`. This exempts an esbuild child of a LAUNCH-CHAIN process (this process or one of its ancestors, the `ancestors()` set, which excludes pid 1 and 0) from the KIND clause only. The CPU clause (`else if (r.pcpu >= CPU_LIMIT)`) is untouched and still judges it, as C-0138 requires. The header comment and the `LOADER` doc comment say the same. Nothing else of the detector moved. Pin: the new test *the launch chain's loader: an esbuild child of this process or of an ancestor (the tsx launcher) is exempt from the kind clause only; any other esbuild is named (hardening round S1)* in `judgeContention on built readings`. It checks (a) an idle esbuild child of the launcher (pid 300, an ancestor), as a macOS path and as Linux's bare `esbuild`, and one of a farther ancestor (pid 200): reasons `[]`, authoritative. (b) The same loader at 76.4 % and at 10 % CPU gives `process: esbuild (pid 310) at ≥ 10 % CPU`, clause `cpu`; at 9.9 % it is authoritative. (c) An idle esbuild whose parent is outside the launch chain is named by the kind clause: another seat's node's child, a grandchild of this process, an orphan of pid 1, and the child of an ancestor's non-chain child. (d) Today's case, an esbuild child of this process, is exempt when idle and caught by CPU at 77 %. The exemption is the loader's only: a python3 child of the launcher is still named. | M01 (the pre-fix rule): killed at `:309` (a). M02 (every esbuild exempt): killed at `:330` (c) and the old `:296`. M03 (the loader skips the CPU clause too): killed at `:314` (b), and `timing-phase/script.test.ts` is red too. M04 (no `selfPid` branch): killed at `:339` (d) and the old `:268`. M05 (an esbuild child of any `node` exempt): killed at `:330` (c). M06 (pid 1 counted in the launch chain): killed at `:330` (c), `:296` and `:373`. M07 (every child of the chain exempt from the kind clause): killed at `:342` (the python3 line). **7 of 7 killed**, none equivalent. |

**The red-first run.** The new test was run on the pre-fix rule (mutant M01, the exact old line) in the lane mirror. It
is red at `contention.test.ts:309`. Before the fix the reading gave `process: esbuild (esbuild, pid 310)`,
`… pid 311` and `… pid 312`. With the fix the same test is green.

### Behaviour, API and texts

* **The shift is declared, and nothing persisted moves.** An idle esbuild child of an ANCESTOR of the measuring process
  used to contend the stamp by the kind clause (`process: esbuild (esbuild, pid N)`). It now does not. At ≥ 10 % CPU it
  still contends, with the CPU clause's existing text. No stamp format, `TimingResult` field, digest, golden,
  reference-score file or other refusal moves. `reference-score.json` was not touched.
* **The exported API is frozen** (rule (5)). `contention.ts` exports the same names with the same signatures
  (`ancestors`, `ownTree`, `judgeContention`, `contention`, `processKind`, `parsePs`, `parsePower`, `sampleMachine`,
  `baseName`, the types and the three limits). `bench/src/timing/index.ts` is unchanged. No message text changed.
* **Scope.** The CPU clause still sees the loader. B1's start-up figures (esbuild at 76 % CPU right after launch) are
  still refused by that clause. M0-t-00's own fix (the preflight after the protocol's idle) answers them, not this
  item. This round removes only the kind-clause refusal that no idle wait could clear.

### The refusal census (J264 / N-58)

The census was taken in the lane mirror. `judgeContention` was instrumented there only, logging every verdict with its
call site. The run covered the item's test folders (`bench/test/calibrate`, `host`, `timing`, and `timing-phase`
through the folder filter), once on the pre-fix rule and once on the fixed rule, with the same test files. The mirror's
source was restored after each run, checked with `cmp`.

| family | before | after |
|---|---|---|
| deterministic built readings (fixed rows), outside the S1 pin | 938 readings, 56 contended | 938 readings, 56 contended (multisets equal by call site) |
| measured readings (the real machine) | 319, 199 contended | 319, 199 contended |
| the S1 pin's case (a) (a quiet machine holding only the launch chain and its loader) | 1, **1 contended** (3 esbuild reasons) | 1, **0 contended** |

The census falls by exactly case (a). That reading is LAWFUL input (a quiet machine running only the script's own
launch), and its verdict is **MAKE-IT-SUCCEED** (fixed here). The other differences between the two runs are at the
real-sample call sites (`harness.test.ts:271`, `:313`, `:326`, `:440` and the batch sampler). They differ only in how
many samples a live batch took and in this container's live `MainThread` CPU and calibrate drift. No reason there names
an esbuild: 2 esbuild reasons before, 2 after. The refusals still standing are UNLAWFUL inputs (a planted python3, a
browser, a busy process, battery, drift, no reference score). Their verdict is REFUSE by design (C-0103: the timing
phase must not run beside them), and the user's alternative is to quit the process and re-run, as §12.1 says.

### Gates (W = 1; this machine is not §12.1's; no timing is taken or gated)

* `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 corepack pnpm install --frozen-lockfile` exit 0. `corepack pnpm lint` exit 0
  (`eslint 1277 files, 0 errors, 0 warnings`; `probe-red ok`). `corepack pnpm build` exit 0.
* **NEAR**: `corepack pnpm exec vitest run --maxWorkers=1 bench/test/calibrate/ bench/test/host/ bench/test/timing/`
  ran 6 files and 75 tests: 62 passed, 13 failed. All 13 are the J176 baseline reds in calibrate, host, contention,
  harness and sampler, with Mac-reference causes: `/sbin/launchd` at pid 1, the M1 host, Rosetta, `pmset`, the
  Playwright cache path and Linux's `MainThread` comm. They are the same 13 as the pre-change baseline run of the same
  folders.
* **RELATED@1000**: `PLAT_FUZZ_RUNS=1000 corepack pnpm exec vitest related --run --maxWorkers=1
  bench/src/timing/contention.ts` (seed -914809447) ran 56 files and 584 tests: 571 passed, 13 failed, in 2 315 s
  (informative only). The 13 are the same J176 baseline reds as NEAR, and no other file is red. After the choices and
  CLEAN-ROOM appends, `corepack pnpm lint` was run again: exit 0, `probe-red ok`.

### Mac steps (PENDING-MAC)

None new. The pins are built readings and run on every host. The real-machine tests of the file stay J176 baseline reds
here, unchanged by this round.

## Hardening round S1 — the closing check's notes (lane `check/M0-f-01-close-s1`, 2026-11-09)

Verdict and evidence in `checks/M0-f-01-s1.md`. Neither row is a blocker (the J162 / N-45 class: the code does what
LINE 1 says, CONFIRMED by an executed probe of the real topology).

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-s1c-1 | The S1 pin's launch chain holds only `node`-NAMED ancestors (pids 200, 300 `comm: node`). The mutant K13 — the loader exempt only when its parent's kind is `node` — survives the item's tests, yet on this machine's real rows (Linux reports every node process's `comm` as `MainThread`) it names the tsx launcher's `esbuild` exactly as the pre-fix rule did (P-REAL in `checks/M0-f-01-s1.md`). The fixed rule never looks at the parent's name, so the code is right; no test holds that. | Add to pin (a) one launch chain with Linux's real `comm` (`MainThread` ancestors, e.g. B1's rows) and/or a shell ancestor with an esbuild child, so K13 is red. Test-only, inside the item's owns. | the next round touching `contention.test.ts`, at the latest M4 |
| N-s1c-2 | On Linux `ps -o comm` gives `MainThread` for a node process, so the `node` kind (C-0103) is blind there: another seat's IDLE node is not named by the kind clause (the J176 baseline red at `contention.test.ts:435` shows it: `process: MainThread (pid N) at ≥ 10 % CPU` for `process: node (node, pid N)`). Fail-safe today: every measured Linux stamp is contended by `power: unknown (pmset gave no AC reading)`, and the timing bars run on the Mac. | If a Linux leg is ever judged, read the executable (`/proc/<pid>/exe` or `ps -o args`) for the kind on Linux; until then a KI row. | M4 (or the first Linux timing leg) |
