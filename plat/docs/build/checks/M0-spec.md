# Check — the M0 build spec (M0.md, M0-work.json, choices.md; lane build/m0-check, 2026-10-03)

**Verdict: FIX.** Checker seat: build/m0-check (Opus), ledger row L-0005. Read whole: `M0.md`, `M0-work.json` (60 items,
flattened by script), `choices.md` (C-0001 – C-0060), `open-design-findings.md`; `docs/ARCHITECTURE.md` §16's M-1 and
M0 rows and preamble, §17, §12.1, §12.4, §13.1, §13.5, §13.8, §6.5, §3.7 – §3.8, §14's package list and dependency
rules, §13.2's bent-cut tests, §4.3's lattice and deck sentences; `docs/volumes/INDEX.md` §1 – §3.

What holds (CONFIRMED by reading and by script): every §16 M0 (a) – (f) clause appears as a NOW, TIMING or AFTER-M-1
bar; the timing-phase wave runs alone; the 25 open questions of M0.md §5 are decided; every row of
`open-design-findings.md` is decided (all "not affecting M0", reasons checked against the items); the cloud rows
C-0001, C-0019, C-0022, C-0023, C-0024 each have a superseding Mac row (C-0025 – C-0029, C-0051); every `dependsOn`
points to an earlier wave or an ordered one; every item names its design sections with the clause it reads.

## Findings

1. **Items share files** (CONFIRMED by a prefix-overlap script over every `owns` entry): M0-a-02 owns
   `kernel/src/arena/` while M0-d-04 owns `kernel/src/arena/levelDigest.ts`; M0-m-01 owns `model/test/` while M0-d-04,
   M0-d-05a and M0-d-05b own `model/test/{digest,identity,match}/`; M0-s-02 owns `tables/test/` while M0-f-03a owns
   `tables/test/workLimits/`; M0-b-05 and M0-c-07 rewrite `granularity.json`, `regimes.json`, `cut.json` and the
   deep-interior cells, owned by M0-s-02, with no hand-over; C-0004's `H128` / `H32` re-export "lives in the scaffold's
   index.ts" (M0-m-01), which carries no such line and which M0-m-01 may not edit; the numbers-only summaries M0-d-09,
   M0-b-04, M0-c-06 and M0-e-06 write under `plat/docs/build/` are in no `owns` list. The spec's own validation checked
   exact duplicates only.
2. **Waves violate dependencies** (CONFIRMED by a script over tests, exit bars and builds): M0-f-02 (wave 11) runs the
   fusion, site, cross-host and determinism harnesses of waves 12 – 14 (none in `dependsOn`); the wave-13 stages
   M0-c-05 and M0-e-05 "register themselves" through M0-x-02, in the same unordered wave; M0-b-03 and M0-c-02 (both
   wave 10) each test the strips with the other; M0-a-15 needs M0-a-14 and M0-d-08 (same wave 8) and M0-d-04 (undeclared);
   M0-a-06's exit bar needs M0-d-08 (wave 8) and M0-d-04 (wave 7); M0-a-12's corpus bar on the spikes' faces needs
   wave 14 and no later item carries it; M0-d-02's byte-order test needs M0-d-06 (wave 12).
3. **Timing beside other work:** M0-f-01 (wave 3, three other seats) must record "the reference score", which C-0050
   defines as the first AUTHORITATIVE run — impossible while other seats run. No timing-phase re-run follows a fallback's
   fix round, though §16 (c) and (e) require the fallback "applied and re-measured" / the gate re-run.
4. **§13.5 misread:** "a missing file … stops the parity CLI naming the file (T-RIG-1)"; M0-k-05 builds "an absent file
   → every metric missingBaseline" (against its own T-RIG-1 test), and M0.md §4, M0-f-02's nightly parity job and
   M0-x-01's record rest on that reading.
5. **§13.8's PR-tier deny-list scan** (§17.1 (5)'s content scanner) is neither built, deferred nor labelled AFTER-M-1.
6. **S4 across water has no owner:** M0-e-06 needs routes through sites' `deck_end` vertices and the lattice's water
   penalty (§4.3), which M0-c-03 defers to M1 and M0-c-01 does not build; M0-e-06 owns only bench files.
7. **The MFCG street-signature rows measure lots** (R4, lot alignment with the wall, lots per block), which arrive at
   M1; C-0018 makes M0's R4 a non-gating proxy while M0-c-06 / M0-c-07 gate "the MFCG street-signature rows inside their
   bands". Undecided per metric.
8. **Corner (≥ 80 %) and arrival (≥ 95 %)** of §16 M0 (b) are absolute thresholds on ours, measurable on the M0 (b)
   synthetic faces now, yet judged only AFTER-M-1, with no choices row naming the digest entry they wait for.
9. **§12.1's in-Chrome re-measure** of the model-budget gates is deferred to M1 in two items' `defers` with no choices
   row, although Chromium is cached here and M0-d-06 bundles the M0 stages for it.
10. **§16's preamble clause** — a milestone landing calibratable cells exits with `plat calibrate register --check`
    green — is not addressed (the register lands at M1).
11. **Noise in `@plat/site`:** §14 lists noise in `@plat/kernel` (§6.5 (4) "a kernel adapter"); the spec places the
    simplex-noise adapter and fBm in `@plat/site` with no choices row.
12. **`ng-faces.json`** (C-0043) gates the AFTER-M-1 wave but is not in §16's M-1 row; the spec records neither M-1's
    acceptance of it nor what runs if M-1 commits without it.
13. **Corpus inputs outside `plat/`:** M0-a-12's runner reads face sets from `PLAT_BENCH_OUT` (the scratchpad), against
    §17.1 (3)'s path rule and M0-d-07's repository-path rule.
14. **Stale or wrong references:** C-0027 cites C-0032 for owner-gated hosting (it is C-0031); M0-work.json's M0-s-01
    entry (the declared authority) still lists four vendored libraries, `vitest.workspace.ts`, an `install` script and
    the chromium-1243 pin, superseded by C-0051 – C-0054.

**CONFIRMED vs PLAUSIBLE.** Findings 1 and 2 are CONFIRMED by script; 4, 5, 9, 10 and 14 are CONFIRMED by quoted text;
3, 6, 7, 8, 11, 12 and 13 are PLAUSIBLE readings of the design against the spec's text.
