# M0-d-06: minor notes for the hardening milestone M4 (lane `check/M0-d-06`, 2026-10-06)

These are minor findings from the first check (`checks/M0-d-06.md`). None of them fails the item (J180, N-45). The
mutant ids are the check's. Logs are in `~/maps-scratch/waves/check-M0-d-06/mut-logs/`.

1. **The runner's thread-mismatch path has no end-to-end test (M17 survives).**
   * `crossHostThreadProblem` is unit-tested. But removing its call in `runNodeLeg` leaves all 62 tests green, because
     an honest leg never reports the wrong thread.
   * The realistic mis-dispatch is still caught by `legs.test.ts`'s own `r.thread` assertion.
   * To harden: add a test table or leg stub whose answer carries the wrong thread, and assert the run is `failed`
     with the mismatch reason (the Node leg here, and the browser leg on the Mac).
2. **"A fresh carry per seed" is not held by a test (M21 survives).**
   * `CrossHostStageContext.carry` is documented as "Empty at each seed's first stage". M0-d-09's spike-city pipeline
     builds on that. `stages.test.ts`'s title says "with a fresh carry".
   * Hoisting the map out of the seed loop leaves every test green. The test's first stage writes the carry before
     any stage reads it.
   * To harden: make that stage digest `carry.size` before it writes, and assert 0 for every seed.
3. **The seeded `dmath` and `xoshiro` stages have no recompute test (M25 survives).**
   * The `lanes`, `regularFit`, `circumcentres` and `constructive` stages each have one. A `dmath` stage that dropped
     pow's and atan2's second argument still passes.
   * The committed vectors (the known-answer stages, once B-1 is fixed) cover the routines themselves.
   * To harden: recompute those two stages' digests in `stages.test.ts`, as for the others.
4. **Any kernel run rewrites the committed summary, including a narrowed one.**
   * In my mirror, `crosshost run kernel --timing --legs node-x64-rosetta,chromium --workers on` overwrote
     `docs/build/summaries/M0-d-06.json` with a 2-run summary.
   * Two possible fixes: write the summary only for the full run (all legs, both worker settings, timing off), or
     record the legs and workers that were asked for in it.
5. **A browser run's time limit does not bound the answer itself.**
   * `page.setDefaultTimeout` does not apply to `page.evaluate`, so a Web Worker that never answers would hang the
     run. The Node legs have a kill timer.
   * To harden (Mac step): race the evaluate against `timeoutMs` and report the run `failed`.
6. **The Node legs' bundle file is written to `os.tmpdir()`.**
   * It is generated in-process from plat/ sources and deleted after the run. It is an output, not an input, so
     C-0067 holds in substance.
   * A sentence in a choices row would make this explicit.
7. **A non-universal Node on the Mac makes the Rosetta leg `failed`, not `blocked`.**
   * The x86-64 leg runs `arch -x86_64 <process.execPath>`. If the runner's Node is not the universal binary
     C-0028 names (`/usr/local/bin/node`), the leg fails. That is fail-safe: the verdict is `fail`.
   * A plan-time check of the binary's slices would give a reason instead.
8. **The blocked browser reasons always end "— a Mac step", even when printed on the Mac (wording).**

The setTimeout global that the browser bundle needs at load, seen in my vm probe, comes from fast-check, which the
stage table pulls into the bundle through testkit's constructive set (traced in the bundle text). Browsers provide that
global, so this is noted for completeness and is not a finding.

## Closing check (lane `check/M0-d-06-close-r1`, 2026-10-06)

9. **The known-answer anchor alters one case per file, so a stage that reads the expected column for only part of a
   file passes (R02–R05 survive).**
   * Fix round 1's `kat-anchor.test.ts` closes B-1: under R01 (= M01, the whole stage hashes the expected column) it
     fails 4 of 4. But it alters only the first line of `xoshiro128ss.txt`, of `fdlibm/pow.txt` and `h128[0]` of the
     first lane vector. A stage that reads the expected column elsewhere still passes all 67 tests:
     * R02: `xoshiro.kat` takes the long vectors' expected words;
     * R03: `dmath.kat` computes pow only and takes the other six routines' expected results;
     * R04: `lanes.kat` takes each vector's lane count from the file;
     * R05: `xoshiro.kat` writes the expected value for each line's first word.
   * These are deliberate-writer escapes: each needs a computed path that branches into the expected data. A whole-stage
     slip (R01) is caught. Fail-safe today: none of the four changes what a leg computes for the seeded stages or the
     cross-leg comparison, only how deep the C anchor goes.
   * To harden: alter **every** expected value of every vector file (each word or result's lowest bit, each lane count
     + 1, each h128 word ^ 1) and assert each stage's digest is unchanged and differs from `crossHostKatExpected` of
     the altered inputs. The closing checker's probe of exactly this
     (`~/maps-scratch/waves/check-M0-d-06/close-r1/probes/kat-all.test.ts`) passes on the clean code and kills R01–R05.
   * Hardening milestone: M4.

## Hardening round S1 (lane `build/M0-d-06-fix-s1`, 2026-10-19)

The session's hardening round of M0-d-06 (J237 (2)) on the FIX-NOW rows of `checks/hardening-inventory.md` (§ M0-d-06,
plan entry 21), as re-triaged on 2026-10-19 (J423, batch B3). Choices row C-0394 names every row it closes. Mutants ran
in the lane's one scratch mirror (`scratchpad/waves/selfcheck-build-M0-d-06-fix-s1`, isolation proven: no link into the
tree, `@plat/kernel` realpath inside the mirror; removed after), each with
`vitest run --maxWorkers=1 --bail=1 packages/testkit/test/crosshost bench/test/crosshost`; the clean mirror ran 15
files, 83/83. Every mutant was restored from the tree and checked with `cmp` before the next.

| row | source note | outcome | the change | pin (red without the fix) | mutant(s), each killed |
|---|---|---|---|---|---|
| M0-d-06:6 1 | note 1 | PINNED (Node leg); browser half PINNED with a stubbed playwright-core; the real browsers PENDING-MAC | `test/crosshost/answers.test.ts` (new): a Node leg stub — a plain script handed to `runCrossHost` as the fixture's Node bundle (`bundles`) — answers on the wrong thread; every run is `failed` with `crossHostThreadProblem`'s reason, verbatim; the control (right thread) runs; a silent stub is killed at `timeoutMs` ("no answer within 1500 ms"). `test/crosshost/browser-stub.test.ts` (new): the same for the browser leg's page answer | answers.test.ts "a leg answering on the wrong thread is failed …"; browser-stub.test.ts "a page answering on the wrong thread …" | M17 (the Node leg's `checkThread` call removed), M17b (the browser leg's removed) |
| M0-d-06:12 2 | note 2 | PINNED | `stages.test.ts` "the leg runtime": stage `a` digests `carry.size` BEFORE it writes; the test asserts `5:0` and `6:0` — an empty carry at each seed's first stage | stages.test.ts "runs the unseeded stages first … with a fresh carry" | M21 (the carry map hoisted out of the seed loop in `leg.ts`) |
| M0-d-06:18 3 | note 3 | PINNED | `stages.test.ts`: the seeded `xoshiro` and `dmath` stages recomputed from `crossHostStream` (dmath's argument draw restated in the test), plus the routine list and arities (`pow/2`, `atan2/2`) | stages.test.ts "the xoshiro stage digests …", "the dmath stage digests …" | M25 (pow's and atan2's second argument dropped), M25x (the `normal()` draws dropped from the xoshiro digest) |
| M0-d-06:23 4 | note 4 | FIXED and PINNED | `bench/src/crosshost/index.ts`: the summary is written only by the FULL run (all five legs, workers off and on, timing off); a narrowed kernel run says `crosshost: summary <path> not written: a narrowed run (legs …; workers …; timing …) — the summary records the full run only …` and leaves the committed file as it is. Of the note's two options this one keeps the summary's format (C-0067's numbers-only shape) unchanged; the other would have changed a committed record's shape (a contract, rule (3)) | bench `runner.test.ts` "a narrowed kernel run (fewer legs, one workers setting, the timing mode) leaves the summary unwritten and says so"; "the kernel fixture's full run writes the numbers-only summary" (now a full run with the browsers pointed at an empty cache, exit 3 incomplete) | R4a (unconditional write, the pre-round code), R4b (timing condition dropped), R4c (workers condition dropped), R4d (legs condition dropped) |
| M0-d-06:28 5 | note 5 | FIXED and PINNED (the Node half: the runner's race and its harness); the real-browser exercise PENDING-MAC | `runner.ts`: `page.evaluate` is raced against the run's `timeoutMs` (`within`); past it the run is `failed` with the Node legs' own reason text, `no answer within <ms> ms`, and `page.close()` is bounded too. A page that throws keeps `the page failed: <message>` | browser-stub.test.ts "an answer that never comes fails the run at timeoutMs …" (the stub's `evaluate` never settles; without the fix the test hangs to its 20 s limit); control "an answer inside the limit is taken"; "a page that throws is failed with its message" | R5 (the race's limit made 1e9 ms ≈ the pre-round code), R5b (the time-limit reason folded into "the page failed") |
| M0-d-06:32 6 | note 6 | TEXT (choices row) | C-0394 (6): the Node legs' bundle file in `os.tmpdir()` is an output generated in-process from plat/ sources and deleted after the run; C-0067 holds. The same sentence heads `runner.ts` | — (text row) | — |
| M0-d-06:36 7 | note 7 | DEFERRED to M4 (the re-triage of 2026-10-19, J423, plan entry 21, batch B3) | nothing built: a non-universal Node on the Mac stays fail-safe (the Rosetta leg `failed`, the verdict `fail`) | — | — |
| M0-d-06:40 8 | note 8 | FIXED and PINNED | `legs.ts`: `planCrossHostBrowserLeg(browser, env, m = CROSSHOST_THIS_MACHINE)` (an optional third argument; no export added, the two-argument call unchanged) and `planCrossHostLeg` passes its machine on. Off the reference Mac the reason is unchanged, verbatim (`… never downloaded (the no-download rule, C-0028) — a Mac step`); on darwin arm64 it ends `— on the reference Mac: restore the pinned build into the cache <root> (corepack pnpm browsers:check launches the three)` | blocked.test.ts "the absent build's reason ends "— a Mac step" off the reference Mac, and on it names the cache to restore" | R8 (the Mac wording never chosen = the pre-round text), R8b (`planCrossHostLeg` not passing its machine) |
| M0-d-06:48 9 | note 9 | PINNED | `kat-anchor.test.ts`: EVERY expected value of EVERY vector file altered — each xoshiro output word's lowest bit (both sets), each fdlibm result's lowest bit (a NaN result made 1.0, since the digest writes one word for every NaN), each lane count + 1 and each h128 word ^ 1; each stage's digest is unchanged and differs from `crossHostKatExpected` of the altered inputs, all files at once, each file alone (every line checked altered), in process and on every Node leg workers off and on | kat-anchor.test.ts "%s: every expected value altered …", "%s: each of its vector files altered alone …", "the alteration reaches every expected value …" | R02 (long xoshiro vectors' expected words taken), R03 (dmath.kat computes pow only), R04 (lanes.kat's lane count from the file), R05 (each line's first xoshiro word taken from the file) |

17 mutants, 17 killed, each by the row's own pin (the first failing test of each log named above); no survivor, no
equivalent.

**Refusal census (J264 / N-58).** The item's registered family is the kernel fixture's stage table over its 16 seeds
(`bench/src/crosshost/fixtures/kernel.json`). Before the round (measured in the mirror on the pre-round tree): 0 error
cells of 99; `regularFit` 0 refusals of 256 rings; `delaunay` 0 of 128 point sets; the constructive stage's 2144 M0
draws, 0 thrown, 0 non-input. After: `kernel-stages.ts` and `leg.ts` are byte-identical to the landed record
(sha256 8d68f94b… and 59cb51a3…), so the family's inputs and outputs are unchanged; the full CLI run after the round
gave 0 error cells (node-x64-rosetta off and on, agreeing bit for bit) and the committed summary unchanged byte for
byte. Refusals 0 → 0; nothing to class (no LAWFUL, UNLAWFUL or OUR-OWN-INTERMEDIATE refusal met). The round's two
behaviour changes are failure paths of the runner (a page that never answers is now `failed` instead of hanging; a
narrowed run no longer writes the summary): neither moves a digest, a golden or a committed output (DECLARED in C-0394:
no shift).

**Mac steps (PENDING-MAC).** Rows 1 and 5 in the three real browsers (Chromium, Firefox, WebKit from the Playwright
cache, C-0028, C-0051): the stubbed playwright-core here exercises the runner's handling; a real Web Worker that never
posts, and a real page answering on the wrong thread, are the Mac step. Row 8's Mac wording is printed only on the
reference Mac. This machine's Playwright cache (`/opt/pw-browsers`) holds chromium 1194, not the pinned 1223, so every
browser leg is blocked here, correctly.

## Closing check of hardening round S1 (lane `check/M0-d-06-close-s1`, 2026-10-19)

The verdict is `checks/M0-d-06-s1.md` (PASS). One minor note, not a blocker (N-45, J162):

10. **Row 4's new message is pinned by its prefix only.**
    * `bench/test/crosshost/runner.test.ts` "a narrowed kernel run … leaves the summary unwritten and says so" checks
      that the output contains `crosshost: summary <path> not written: a narrowed run`. The rest of the line (the legs,
      workers and timing asked, and "— the summary records the full run only (all five legs, workers off and on, timing
      off)") is not held: a change to it leaves the test green.
    * Fail-safe: the summary file is not written either way, and that is asserted (`existsSync(summary)` false, killed
      by this check's C12–C16).
    * To harden: assert the whole line verbatim for one narrowed case (J263 Q6's pinning applied to a new text).
    * Hardening milestone: M4.
