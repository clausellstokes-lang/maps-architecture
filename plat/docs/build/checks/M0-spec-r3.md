# Check r3 — the M0 build spec after its third fix round (lane build/m0-check-r3, 2026-10-03)

**Verdict: FIX.** Checker seat: build/m0-check-r3 (Opus, on the owner's Mac), ledger row L-0015; independent of the
spec's writers (build/m0-spec, -fix1, -fix2, -fix3) and the scaffold's (build/m0-scaffold, -fix1, -fix2, -fix3). Read
whole: `M0.md`, `M0-work.json` (69 items, flattened by script and re-validated by this seat's own validator in the
scratchpad), `choices.md` (C-0001 – C-0111), `open-design-findings.md`, `CLEAN-ROOM.md`, `checks/*-r2.md`;
`docs/ARCHITECTURE.md` §16 (the M-1 and M0 rows and the preamble), §17 whole, §13's head, §13.1 whole, §13.2's
T34-1 – T41-1, §13.5 whole, §13.8 whole, §12.1, §12.4, §6.2's bars, §6.5 whole, §4.13 whole, §14's package list and
dependency rules.

## What holds (CONFIRMED by script, run or reading)

All 13 r2 findings are answered as §10 says (M0-x-06, C-0110, M0-k-06 now / M0-k-07, C-0102, C-0103, C-0097, C-0098,
C-0109, C-0104 with `tools/landed/`, C-0106, C-0107, C-0108, C-0105 / C-0099). The validator: 69 items; every wave's
items equal the items' `wave`; every `dependsOn` lands in an earlier wave except AFTER-M-1 (b)'s stated sequence
(b-05b → c-07b → x-03); every AFTER-M-1 item depends on M0-x-01 and names its rows and digest entries in
`afterM1Needs`; 0 undeclared owns overlaps between items (the generic `<module>` / `<harness>` index hand-overs aside);
bars 69 here / 22 timing-phase / 9 after-M-1 equal the header. Every §16 M0 (a) – (f) clause and §13.8's M0 rows
(T34-1 – T41-1, B-EDGE) have an item; every open design finding is decided; no cloud clause survives without its Mac row.

## Findings

1. **The kernel reads types the spec places in `@plat/model`** (CONFIRMED). M0-m-01 declares the ref forms (`FaceRef`,
   `ChainRef`, `EdgeSetRef`, `VertexRef`, `StretchRef`, `LatticePoint`), `ChainProfile`, `Invariant`, `Seed`,
   `ConcernId` and (C-0003) `StreamOpts` in `@plat/model`; kernel items read them — M0-a-02's `resolve`, M0-a-06's
   `ChainProfile` and `KernelTx.expect: Invariant[]` (§3.3), M0-a-14's "Invariant (from @plat/model)", M0-d-01's and
   M0-a-16's `Rng.stream(…, opts: StreamOpts)` — and M0-a-02 / a-06 / d-01 list M0-m-01 in `dependsOn`. The kernel's
   `package.json` has no `@plat/model` and its tsconfig no reference; model references kernel, so adding one is a
   cycle; M0-d-07's own fixture says "kernel importing model fails" (§14: kernel ← model). No choices row decides.
2. **Command surfaces no item owns** (CONFIRMED). `corepack pnpm bench -- scan` (M0-k-06's and M0-k-07's interface)
   exits 64 `unknown harness "scan"`: `scripts/bench.mjs` (M0-s-01's, not handed over) has no `scan` entry and no item
   owns `bench/src/scan/`. `plat parity` and `plat baselines check <file>` (M0-k-05) have no bin, root script or
   dispatcher entry in any `owns`, yet M-1's crossings, the countersigning checker, M0-b-05a / c-07a and the nightly
   parity job (a "command" whose status C-0099 derives from "the command's script exists") all need them.
3. **Tests with no owned home** (CONFIRMED by a scratch `tsc -b`: TS6307 / TS6059). M0-k-04's S11 call-count test
   (C-0107, code in `bench/src/fuzz-bar/`) and M0-a-12's corpus-runner test (`bench/src/skeleton/`) can live neither in
   `testkit/test/runner/` nor `kernel/test/medial/` (those projects do not reference the bench), and neither item owns
   `bench/test/fuzz-bar/` or `bench/test/skeleton/`; `landed --touched` would refuse them.
4. **M0-t-01's script is built inside the timing wave** (CONFIRMED by reading). It owns no test folder for its eight
   tests and writes, tests and runs the script in wave T (4–6 seat-hours with M-1 paused), so the code that produces the
   authoritative record is checked only after it ran — C-0107's own objection, at larger scale.
5. **§13.5's ⟨M-1⟩ rule misread** (CONFIRMED). "The parity CLI reports an ⟨M-1⟩ cell without its baseline row as
   *fail*, never as *pass*"; M0-k-05 builds and tests only `missingBaseline` for a missing row, and M0-b-05a / c-07a
   list verdicts pass / fail / missingBaseline. The gating M0 rows T / Y share, dead ends, blocks per ha, blocks, deep
   interiors and the cut-lengths row are ⟨M-1⟩ cells.
6. **M-1's crossings into `plat/` mid-build are unscheduled** (CONFIRMED by reading the tools and rules; timing
   PLAUSIBLE). (a) `baselines.json`, `ng-faces.json`, `denylist.json`, `docs/digest/`, CLEAN-ROOM §4 rows and the
   countersign append to `crossings.json` lie in no `owns`, outside C-0104's permitted appends and the snapshot's
   exclusions: committed while a wave is open, `landed:verify` names them unattributed and the wave fails. (b) By
   C-0099 the PR deny-list job turns `built` the moment `denylist.json` exists, but its review (M0-k-07) waits for
   M0-x-01 (C-0102): every `tier:pr` in between — T's gating PR run included — runs an unreviewed scan; the parity job
   likewise.
7. **AFTER-M-1 code buildable now** (PLAUSIBLE). By C-0101's rule ("only the runs over M-1's files are AFTER-M-1"),
   M0-b-05b's phase-b runner over `loadNgFaces`, its KS comparisons and the `cut.flattenM` search, and the fusion-ng
   phases' comparison and recalibration paths are testable on synthetic files now; only M0-k-06 was split.
8. **The cliff × frame cell** (minor; reading). Its outcome ("clipped at the arena's outer ring by S1") rests on M0's
   S1 (the cliff primitive, M0-e-01; the outer ring, M0-e-03); M0-x-06 runs only the river, bridge and wall frame cells.
9. **Stale text** (CONFIRMED). C-0102 says M0-x-01 is "wave 18" (it is 19); M0-a-01's checker runs "the probe fixture
   against src/num" (C-0106: in place, no copy); M0.md §5 item 48 keeps C-0088's whole-tier timing and "≈ 4–6 h" beside
   item 61's C-0097; `CLEAN-ROOM.md` rule 6 says the scanner runs "from M1" (M0-k-07 runs it after M-1).

**CONFIRMED vs PLAUSIBLE.** Findings 1 – 5 and 9 are CONFIRMED (manifests, tsconfigs, an executed command, a scratch
compile, quoted text); 6 is CONFIRMED as a rule conflict, its timing PLAUSIBLE; 7 and 8 are PLAUSIBLE readings.
