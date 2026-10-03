# Check r1 — the M0 build spec after its fix rounds (lane build/m0-check-r1, 2026-10-03)

**Verdict: FIX.** Checker seat: build/m0-check-r1 (Opus, on the owner's Mac), ledger row L-0009; independent of the
spec's writers (build/m0-spec, build/m0-spec-fix1) and of the scaffold's (build/m0-scaffold, build/m0-scaffold-fix1).
Read whole: `M0.md`, `M0-work.json` (66 items, flattened by script), `choices.md` (C-0001 – C-0082),
`open-design-findings.md`, `CLEAN-ROOM.md`, `checks/M0-spec.md`, `checks/M0-s-01.md`; `docs/ARCHITECTURE.md` §16 (the
M-1 and M0 rows, preamble, risks), §17 whole, §13's head, §13.1 whole, §13.2's invariants / statistics / cost-model /
contract / stage-property paragraphs and its bent-cut tests, §13.5 whole, §13.8 whole, §12.1 – §12.4, §12.10, §14's
package list, dependency rules and interfaces, §3.7 – §3.11, §4.1's op-form paragraph, §4.4's fusion gate and the
trace's water paragraph, §4.2 S3 (7)'s water-gate sentence, §4.6 whole, §4.13, §5.2's ladder list, F-WALL and §5.3's
crossing row, §6.1's key paragraph, §6.2's bars, §6.3's matching paragraph, §6.5 whole; `docs/volumes/INDEX.md`'s M0
lines.

## What holds (CONFIRMED by script or reading)

Every §16 M0 (a) – (f) clause appears as a NOW, TIMING or AFTER-M-1 bar; every `dependsOn` lands in an earlier wave (the
three AFTER-M-1 (b) items run in the wave's stated order); every `owns` prefix overlap is a declared hand-over (14 pairs,
all chained); the waves T and T2 run alone and T-fix takes no timing; the 42 open questions of M0.md §5 are decided; all
twelve rows of `open-design-findings.md` are decided "not affecting M0" with reasons that hold against the items; no
cloud-container clause survives without its Mac row (C-0025 – C-0031, C-0051, L-0002); every after-M-1 item but M0-b-05b
names its rows (finding 4); the 14 findings of `checks/M0-spec.md` are answered as M0.md §8 says.

## Findings

1. **T34-1 misread** (CONFIRMED). §13.2's T34-1 is "every block S8 commits has an OBB minor extent below the τ drawn
   for its face and every face it cut one at or above it, replayed from the `cut.stop` draws" plus the 10 000-face mean.
   M0-b-02's "T34-1 (shape clause): τ ∈ [e_lo, e_hi]" is a property of the formula, and no item runs the commit clause,
   though M0.md §1 (b) lists T34-1 as NOW.
2. **R12-4 unscheduled** (CONFIRMED). §12.10 R12-4 measures §12.4's CITY rows (S1 25, S3 16, S4 10, S5 40, S6 17, S8
   20 ms p50) at the fusion gate and the site spike and restates a row whose p50 exceeds it; the spec reports only the
   hydrology row.
3. **Ladder coverage scheduled too early and incomplete** (CONFIRMED). M0-k-04 (wave 11, no dependency on M0-b-03,
   M0-c-03 or M0-c-05) covers F-CUT a–d, F-ROUTE and F-NUM's re-propose, which land in waves 12 – 14; it omits F-RIVER
   (M0-e-02), F-WALL's gate re-draw (M0-c-01), F-BUDGET-STAGE's top-up (M0-c-05) and F-WORK (§13.1: every rung of every
   §5.2 ladder whose mechanism M0 builds).
4. **M0-b-05b's needs incomplete** (CONFIRMED). §16 M0 (b)'s cut-length KS has no reference named: §13.5's blocks row
   carries NG block counts per template, and `ng-faces.json`'s "recorded per-face numbers" are not said to hold cut
   lengths; the signature row M0-b-05b compares the fillet share against is only in M0-b-05a's list.
5. **The site spike's trace meets the river undecided** (CONFIRMED by reading). M0-e-06 runs M0-c-01 / M0-c-02's S3
   slice on the river fixture; §4.2 S3 (7) adds water gates where the river crosses the boundary, §4.4 S5a lets the
   trace cross water only at one, and §5.3's batch-local row ("a wall trace crosses water only at a water gate") is
   hard — but M0-c-02 defers water gates to M1 and no row says what the M0 trace does there.
6. **The timing phase's tier runs undefined** (CONFIRMED by reading C-0079, M0-f-02b, M0-t-01). The nightly tier's last
   job is `bench:timing-phase`, and M0-t-01 re-runs the nightly tier end to end inside the timing phase — the nesting
   is never broken; and a tier run of minutes to hours cannot meet the ≤ 60 s batch rule the spec applies to every
   timing-phase result.
7. **`resolveVertexAt` unassigned** (CONFIRMED by script). §3.4's service has no owner and no `notBuilt` deferral, so
   M0-a-16's reflection test over §3.4's list cannot pass.
8. **No item builds the matching bar's real-anchor workload** (CONFIRMED by reading). §6.3 measures matching "inside the
   engine, on real anchors, per kind"; M0-t-01 cites "the spike's re-derivation" and M0-d-09 claims to supply it, but no
   item builds an old / fresh pair of the spike city.
9. **M0-f-03b's input contradicts C-0067** (CONFIRMED by reading). It reads "the spikes' reports", which live in
   `PLAT_BENCH_OUT`; the summaries are not specified to carry per-counter work-per-unit quantiles.
10. **V12-defined parts of M0-k-05 undecided** (PLAUSIBLE). The band rule's metric floors and sign-indefinite form
    (V12 §3.5.1 – §3.5.3), `plat baselines check`'s C1 – C10 (V12 §3.3) and the `CrossingRecord` are V12's, which an M0
    implementer may not read; no row fixes the M0 form the AFTER-M-1 verdicts will rest on.
11. **`no-bare-pnpm` over ".md command lines" undefined** (PLAUSIBLE). Applied to every `pnpm` word it hits
    append-only rows (C-0001's "pnpm 10.28") and M0.md's `"pnpm@10.34.6"` line.
12. **Junction row clauses deferred though stated** (PLAUSIBLE). p5 ≥ 30° is judged now; the same row's median 85–95°
    and organic 4-way share 0–15 % wait for M0-c-07a with no row saying why (C-0073's own principle).
13. **Shared files without a hand-over** (CONFIRMED; details in `checks/M0-s-01-r1.md`): M0-d-03's fdlibm notice breaks
    `tools/notices/notices.test.mjs` and `notices:check` (scaffold-owned `THIRD-PARTY-NOTICES.txt` must change); M0-f-01
    and M0-f-02a break `tools/scaffold/workspace.test.mjs`'s dispatcher test (and tier:pr would re-enter vitest);
    M0-x-04's `registerBase` / `runBase` reach the bench only through M0-x-02's `layout/src/pipeline/index.ts`
    (`@plat/layout` exports "." alone); M0-b-05a and M0-c-07a create `ng-shapes.ts` / `ng-hoods.ts` outside their `owns`.
14. **Stale references** (CONFIRMED): M0-b-01 and M0-b-02 defer to "M0-b-05"; C-0027 and C-0043 name "M0-f-02" /
    "M0-b-05"; M0-b-02 cites C-0018 (R4); M0-b-05a's sections copy M0-b-05b's NG-shape clauses; M0-x-01's bar says
    "the sixty items".

**CONFIRMED vs PLAUSIBLE.** Findings 1 – 9, 13 and 14 are CONFIRMED (script, simulation or quoted text); 10 – 12 are
PLAUSIBLE readings of the design against the spec.
