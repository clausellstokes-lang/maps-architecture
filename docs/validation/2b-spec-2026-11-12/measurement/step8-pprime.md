# Step 8 — P′, THE LAY-PLANNED READ (the review's third design), beside P and BASE

## The prototype (mirror probeL/; results/step8/pprime-full.diff = P → P′ with the inert counters; results/step8/kerb.Pprime-with-instr.ts)
`kerb()` (the §3.4 service S8 reads through: bentCutFabric `kerbFace`, `kerbSeed`, the needle floor; the harness's working
block) serves, where globalThis.__p2bMode === 'lay': X read by P's `readKerb`, then in the open transaction under an op
savepoint (`opSave`) the commit's own engine — `bandCore(t2, [face], corridorUnion's spec: widths, edgeRole 'kerb', the
face's owner as the entity, vertexContacts true)` — the built blocks read back (`BandResult.blocks`' L2 rings; the face's X
where `whole`; none where `wholeBand`), then `rollback(t, save)` and the batch's work counters restored. `readKerb` itself
(S9's own reads inside bandCore) stays X, so S9 commits X exactly as under P.
WHAT STANDS IN THE WAY of a clean one-face dry lay (found, worked around in the mirror):
1. bandCore lays at the batch's level (`t.level`) and corridorUnion refuses outside L2; S8's reads run in an L1 batch. The
   mirror hands bandCore a COPY of the open transaction with level 2 (`{ ...t, level: 2 }`) — and
2. the copy is not an open transaction (tx/state.ts keeps a set of minted overlays; `openTx` refused it: the first run's
   every read threw 'the writer was handed no open transaction', results/step8/failed-1/). The mirror registers the copy
   with `markOpen` (tx/state.ts's minting function). A real P′ needs a kernel-internal "lay at L2 inside an L1 batch" form of
   bandCore (as the construction's dry run has its own `insertTx` shell at `dryLevel`), not this copy.
3. `opSave` keeps work charged ("work charged stays charged"); the lay would charge S8's batch for every read. The mirror
   restores `t.work` after the rollback (the construction's dry run charged its own shell, not the batch).

## (e) Soundness: nothing left behind, no dependence on the order of reads
`scripts/laneC.sh` item lay-sanity: from probeL/plat, `PLAT_FUZZ_SEED=20261112 corepack pnpm exec vitest run --maxWorkers=1
--silent=false --project kernel packages/kernel/test/arr/bands/p2b-lay.test.ts` (log results/step8/sanity.log; 1/1 green):
the bands fixtures and 100 B-FUZZ chord networks with three S8-style cuts; every live L1 face read by kerb() in lay mode in
one L1 batch, then again in REVERSE order in another:
`{"faces":378,"reads":378,"ok":378,"refused":0,"insertChainInLay":539,"bitsChanged":0,"stateChanged":0,"orderDiffers":0,"laidEqualsX":206}`
— the arena's bits and state unchanged after the lay reads, 0 reads differing between the two orders, 206 of 378 laid
kerbs equal to X. At CITY fusion 3 the 235 repeated keys (key proxy: F's rings + spine keys + X) gave the same laid kerb
every time (0 differ). CAVEAT: P′ reads the arena's L2 content (the lay meets it); at S8 time L2 is empty in these runs, so
"function of the key" is shown only for an empty L2 — the draft's P property (X ignores L2) does not carry over.

## (a) S8 ≡ S9 — does P′ give back "the plan equals the commit"?  YES.
Commands: `scripts/s9L-run.sh <run> <seed> [test]` (probes/s9b.ts --mode lay on probeL; JSON results/step8/L-*.json).
| run | BASE exact share / beyond | P exact share / beyond | **P′ exact share / beyond** | P′ max cm | P′ S9 refused |
|---|---|---|---|---|---|
| fusion 1 TEST | 0.964 / 0 | 0.066 / 28 | **0.973 / 0** (109/112) | 20.62 | 0 |
| fusion 2 TEST | 0.991 / 0 | 0.061 / 30 | **1.000 / 0** (112/112) | 0 | 0 |
| integrated 1 TEST | 0.961 / 0 | 0.117 / 67 | **0.983 / 0** (175/178) | 19.75 | 0 |
| integrated 2 TEST | 0.989 / 0 | 0.097 / 66 | **1.000 / 0** (178/178) | 0 | 0 |
| fusion 3 CITY | 0.987 / 0 | 0.060 / 171 | **0.998 / 0** (1 233/1 235) | 3.61 | 0 |
| integrated 4 CITY | 0.989 / 0 | 0.057 / 318 | **0.999 / 0** (1 422/1 423) | 2.15 | 0 |
Every block's seed on a face of the L2 view and alone in it, every run (P′ as P and BASE).

## (b) How far the door moves X (P′'s laid kerb against X, per S8 lay read)
| run | lay reads | equal to X | p50 / p95 / max cm | beyond 73.5 cm | of them thin (every difference piece < attractCm) | repeats / differing |
|---|---|---|---|---|---|---|
| fusion 1 TEST | 232 | 9 | 1.88 / 197.17 / 201.81 | 68 | 68 | 11 / 0 |
| fusion 2 TEST | 240 | 15 | 2.24 / 189.61 / 203.79 | 67 | 67 | 19 / 0 |
| integrated 1 TEST | 376 | 19 | 15.13 / 194.76 / 214.44 | 167 | 167 | 26 / 0 |
| integrated 2 TEST | 385 | 27 | 2.24 / 190.06 / 2 646.19 | 150 | 150 | 36 / 0 |
| fusion 3 CITY | 2 747 | 88 | 1.41 / 180.18 / 229.63 | 546 (19.9 %) | 546 | 235 / 0 |
| integrated 4 CITY | 3 132 | 127 | 2.23 / 173.47 / 987.56 | 825 (26.3 %) | 825 | 255 / 0 |
The far ones are the folded needles of step 3 (X's thin spikes to F's route vertices): the lay removes them, exactly as S9's
commit does — which is why the plan and the commit agree. (Hausdorff over the folded needle's length; the area moved is a
thin sliver.)

## (c) Refusals
S8 refused districts: 0 (BASE 0, P 0) at every seed. S9 refused unions: 0 everywhere. Lay reads refused: 0 (of 2 747 at CITY;
0 at TEST). S8 'needle' refusals at CITY fusion 3: P′ 1 (its tip on a thin/small component: 1), P 3 (0), BASE 3 (1).
S8's outcome under P′ is close to BASE's: fusion 1 TEST 105 cuts / 103 blocks (BASE 105 / 103; P 99 / 100); CITY fusion 3
1 203 cuts / 1 051 blocks (BASE 1 207 / 1 057; P 1 222 / 1 060).

## (d) Cost (source mode, informative; CITY fusion 3, beside the suite's one worker)
| | BASE (construction) | P (X) | P′ (X laid) |
|---|---|---|---|
| ms a read (S8's) | 38.8 | 4.77 | 3.50 (X) + 11.77 (lay) = **15.3** |
| insertChain a read | 37.2 (102 936 / 2 764) | 0 | **6.0** (16 547 / 2 747) |
| S8 ms a cut | 98.0 | 21.0 | **42.2** (50 760 / 1 203) |
(TEST: lay 9.8 ms + X 3.3 ms a read, 4.6 insertChain a read. integrated 4 CITY: X 3.40 + lay 11.16 = 14.6 ms a read, 5.5
insertChain a read, S8 43.7 ms a cut (60 055 / 1 373); its needle refusals 2, one with a tip on a thin/small component.)
S8 under P′ at integrated 4: 1 373 cuts / 1 303 blocks (BASE 1 373 / 1 310; P 1 393 / 1 340).

## (e) Unsoundness found: none in the measured runs — with the caveats above (the copy-and-markOpen form is not a design;
the lay depends on L2 content; the batch's work must be restored by hand).
