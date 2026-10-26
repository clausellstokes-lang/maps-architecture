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
