# Round 2B — the prototype measured: P, P′ (the lay-planned read) and P′ + R+ (with the resolution rule)

Measurement seat, 2026-11-12. Everything under /home/user/maps-scratch/2b-proto/ (nothing in the repository edited).
Heads: the session's HEAD **b8425a3c36958b89f3e1d618ff676ecdc3417d64**; S20 branch `origin/wip/child-a09s20` at my start
**1b93e9d2bb7aa4f3b1ab0bacaada76acaa918f30** (the draft cites 9e5022ff). Node 24.12.0; every command `corepack pnpm …`;
seed 20261112 for every suite and B-FUZZ run. Every figure below names its file; each file names its command and log.
Running log: results/progress.md; every probe's start / end: results/queue.txt. CPU: the managing session's rule kept from
08:30 (one / two processes); all timings are informative (a shared box, source mode).

THE MIRRORS AND THE DIFFS (all against S20's kerb.ts, `s20-src/kerb.ts`):
`p.diff` → P (`kerb.P.ts`: readKerb serves X; `constructionRead` keeps the old body); `pprime.diff` → P′ (`kerb.Pprime.ts`:
kerb() lays X with the commit's own engine in the open transaction and reads the blocks back); `r.diff` → P′ + R+
(`kerb.R.ts`: readKerb serves R+(X); the lay handed its read; the view; the placeholder; `P2B_SERVE=x` gives P + R+).
Worktrees: base/ (BASE), tree/ (P), treeL/ (P′), treeR/ (P′ + R+), probeP/ probeB/ probeL/ probeR/ probeRR/ (the same
with the inert counters of scripts/instr.py).

---

## WHAT THE SESSION MUST KNOW
(see the head of this file's final form below)

1. **THE LADDER (P′ with the construction as its second rung, no rule) is the only design measured here that clears every
   bar at once** (step11-ladder.md): B-FUZZ at seed 20261112 — **no network BASE commits is refused** (4 refused, all
   refused by BASE too; it commits 30 of BASE's 34 refused networks; main 9 997 / widened 2 000 committed against BASE's
   9 984 / 1 987), 0 kerb refusals, the census below BASE's in every operation; the harness — S8 ≡ S9 exact share 0.973 /
   1.000 / 0.983 / 1.000 at the four TEST seeds, **0.998 (fusion 3) and 0.999 (integrated 4) at CITY** (BASE 0.961 – 0.991),
   `beyond` 0, S8 / S9 refusals 0, 0 'unresolved' rungs, and NO read or op fell to rung 2 at any harness seed (the
   figures are P′'s). Rung 2 carries B-FUZZ's hard cases: 9 lay reads and 44 ops of 28 673 / 22 698. Cost at CITY:
   11.95 ms a read (X 3.6, the lay 8.3; 6 insertChain), **S8 34.5 ms a cut** (P 21.0; the construction 98.0).
   ITS PRICE (step 11 §3): where the rungs differ inside one district, plan and commit can differ beyond the 73.5 cm bound
   by a NEEDLE — in B-FUZZ 2 of 44 mixed faces (rung-1 read, rung-2 commit: 299 and 514 cm) and 1 of 2 reverse faces
   (406.7 cm), every difference piece thin. Never seen at a harness seed.
2. **P′ + R+ (the v2 design's resolution rule with review-3's changes) FAILS the B-FUZZ bar** (step10-R.md): 20 networks
   BASE commits are refused (11 NEW 'dangling tip' refusals on widened antennae — S snaps kerb vertices onto the antenna,
   a bridge of F's walk; 9 main 'no route … keeps clearance', 12 of 13 a shallow edge convergence no vertex rule reaches),
   bandUnion's refused networks above BASE's (7 > 5); worse than step 9's simple rule (b) (4). At CITY it holds every bar
   (exact share 0.999 / 1.000, beyond 0). Two of section 11's definitions do not work as written: T-3's erosion radius
   (9.58 cm) calls a 26 cm strip NOT thin, failing its own pin (13 cm passes it; used); the erosion test leaves lattice
   residue on ≈ 26 cm slivers (2 894 false "not thin" of 39 384 difference pieces in B-FUZZ). R+ is idempotent (0 of
   143 400) and order-free (0 of 1 434 sampled). The L3 variant commits nothing more (its target network stays refused:
   an edge convergence, not a vertex).
3. **P as drafted fails** (step 3): S9 committing X misses the plan beyond the bound on 5 – 38 % of blocks (needles to F's
   route vertices; necks), exact share 0.05 – 0.12; B-FUZZ's commit refusals rise (bandUnion 1 → 29, corridorUnion 5 → 15
   'replays'), 37 networks BASE commits refused. S8 plans on 12.9 sub-minEdge edges a read (BASE 0).
4. **X is the definition's value to about a centimetre** (step 5): the X ≠ X_U column (S20's 165.06 / 176.50 cm,
   reproduced) is 0 % spine set, 3 islands under 2.3 cm, and needles along F's spine-less boundary opened or closed by a
   hot-pixel move; at witness points either side may be wrong, always by ≤ 1.05 cm in depth.
5. **What a real P′ (rung 1) needs in the kernel** — the three workarounds of the mirror, as what the build must provide:
   (a) **an L2 lay inside an L1 batch**: bandCore lays at the batch's level and corridorUnion refuses off L2; S8 reads in an
   L1 batch. The build needs a kernel-internal one-face entry of the engine that lays at max(2, level) on the batch's arena
   and frames (the construction's dry run had its own `insertTx` shell at `dryLevel`). (b) **an open-transaction view**:
   tx/state.ts's minted-overlay set refuses a copy (`openTx`: "the writer was handed no open transaction"); the mirror
   registered a `{ ...t, level }` copy with `markOpen`, which shares the journals, log, warnings and batch frame by
   reference and keeps per-copy `failed` / `closed` and a separate `chainJournal` — the build needs a real view type
   (review-2 S-4). (c) **work accounting**: `opSave` keeps work charged; a lay must not consume S8's batch headroom or
   depend on S8's history — the mirror gives the view its own work object from 0 (and step 8's first form restored the
   batch's work by hand). Also: an unowned face needs a placeholder entity (S-3; savepoint.test.ts / cost.test.ts read
   one); the lay needs its read handed to the engine (S-9; the mirror's module-level `HANDED`); the read-back must split
   face walks into simple loops and serve F's own rings for a `whole` face (S-2; B-FUZZ's widened family failed without
   the first). For the LADDER besides: the construction must stay in the build as rung 2 (`constructionRead`), the
   engine needs the op-level retry (`bandCore` → `bandCoreOnce` twice with construction reads), and the work-limit exit
   `overLimit` inside bandCore does not roll the op back (no second rung after it).
6. **The red lists** (step2-redlist.md): P (51 of 109 chunks, stopped), P′ (46, stopped), P′ + R+ (51, stopped), and
   THE LADDER — see section 2 below for how far it ran.
7. **`remeasure.sh <commit> [R|Pprime|P] [s20-commit]`** rebuilds P / B mirrors on another head, applies the mode's diff
   (LADDER, the default: ladder-kerb.diff + ladder-bandUnion.diff; R: r.diff; Pprime: pprime.diff; P: p.diff), runs the suite in resumable chunks and the BASE re-run, and writes REDLIST.tsv. Syntax-checked
   and its diffs dry-run-patched against S20's kerb.ts; never run end to end.
