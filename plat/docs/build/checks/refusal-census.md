# The M0 refusal census — every refusal class the M0 code meets on its registered families, one verdict each (J264 (4), J290 / N-58; queue row L23)

## session/refusal-census-1 — 2026-10-14 (the phase's opening census; re-run at the phase's end as §5 says)

Seat: `session/refusal-census-1`, a Fable 5.1 seat under the owner's delegation (J237 (1)); the hardening phase's triage.
Rules applied: J264 (zero refusals of lawful input), J290 / N-58 (one verdict per class: (a) MAKE-IT-SUCCEED, (b) REPAIR,
(c) REFUSE with the layer or the door argument, else a numbered notBuilt), J237 (2) (rounds batched per owning item),
J264 (5) (every closing check since 2026-10-11 reports its refusals). The design read: §3.6 (the authoring boundary and
chain classes), §3.10 (the invariants and codes), §3.11 (the limits table), §4.6, §5.2 (the ladders), §7.1 (dry-run
validation, the empty edit, G-R10), §11.4 (the doors), §13.1 (B-FUZZ's draw and constructive classes).

## §0 The tree

* Commit: `.git/HEAD` → `refs/heads/main` → **a7f28fde5d38d5a8a38423b712d71b198fefe93f** (read as files; no git). The lane
  log's last LANDED lines before this seat: `check/M0-a-10-consolidate-close-1` 2026-10-13 23:26 and
  `check/M0-a-11-consolidate-close-1` 23:32. Wave snapshot `landed/snapshots/flow-7.json` (taken 2026-10-04T20:46Z).
* Not on this tree: M0-c-06's summary (`summaries/M0-c-06.json` is absent — its record and C-0333 stay on child C's branch
  until the third continuation lands, J318 (3)); M0-a-09 s6 (landed on `wip/child-a09s6b`, J348; not committed to main).
* Date: opened 2026-10-13 23:52Z, written 2026-10-14. Machine `linux:Intel(R) Xeon(R) Processor @ 2.80GHz:4cpu:16gib`
  (`tools/machine_profile.py --id`), Node v24.12.0, `corepack pnpm install --frozen-lockfile` exit 0 (already up to date).
* Every run of this seat ran in an isolated copy of `plat/` under the scratchpad (`cp -a`; 0 links back into the tree);
  nothing under `plat/` but this file and the CLEAN-ROOM row was written; no git command ran.

## §1 The sources — measured or harvested, and how

1. **The kernel's B-FUZZ families, MEASURED** at the registered strength (`PLAT_FUZZ_RUNS` unset = 10⁴ cases per
   property), `PLAT_FUZZ_SEED=20261013` (fixed so §5's re-run replays the same draws), one vitest process at a time,
   `corepack pnpm vitest run --project kernel --maxWorkers=1 <file>` in the mirror; the step3-5 run with
   `PLAT_FUZZ_COUNTS=<scratch>/step35.counts.jsonl` (caps.ts's tally), the bands run with `--silent=false
   --reporter=verbose` so its `REFUSAL` register lines print (N-15: the default reporter hides a passing test's logs).
   Results in §1.1 below. Every family passed; the num, geom and step1-2 families assert refusals TYPED and do not tally
   them (their class counts are harvested from the consolidation checks' seeded probes, a-01 c2 and a-10 c1).
2. **The step3-5 refusal register, MEASURED** (`register.test.ts` green: fix1-case1 s36 and fix1-case2 s31 refuse
   `E_INVARIANT` and write nothing; n43a-buffer, n43b-s60, n43b-s25 and the S5/S6 registers commit or refuse as pinned).
3. **The edge suite M0-x-06, HARVESTED** from `summaries/M0-x-06.json` (72 fixtures × 1 000 seeds, run 2026-10-12
   10:36–17:09 on main `2d09aa13` + the item's files; committed b6eb081d, J327) and `checks/M0-x-06-notes.md` 'Fix round
   2' (the per-seed table of the 35 lawful refusals) and 'Closing check r2' (c2-4). Not re-run (6.5 h).
4. **The fusion harness M0-c-06, HARVESTED and PROVISIONAL**: no summary on this tree; the 50-seed CITY smoke's census
   from `checks/diagnosis-c06-smoke.md` §5 (the second smoke, 2026-10-11, 11 070 s), its after-figures from
   `checks/M0-b-03-s4.md`/`-s5.md` (N-59) and J348 (a-09 s6's kerb/corridorUnion/bandUnion counts). The third
   continuation re-runs the smoke; §5's re-run reads the landed summary.
5. **The site, F-CUT, fuzz-bar, determinism and ladder harnesses, HARVESTED**: `summaries/M0-e-06.json` (CITY, 8 seeds,
   relief-60 and relief-3000 × default/coarse; landed 2026-10-08 16:09 — STALE against c-02 s3/s4 and c-04's rounds,
   marked PROVISIONAL), `M0-k-04.json` (24 primitives × 10⁴; 2026-10-06 15:00), `M0-b-04.json` (F-CUT 10⁵ faces;
   2026-10-06 21:26), `M0-d-09.json` (crosshost `refused` 0; 2026-10-07), `M0-x-05.json` (`plain.bugs` 0; 2026-10-07).
   Nothing re-run: the classes each names are confirmed by a closing check's replay (§3 cites it).
6. **Every closing check since 2026-10-11 mentioning a refusal**: `grep -ln refusal checks/M0-*.md` gives 171 files; the
   92 dated 2026-10-11 or later were grep'd for their refusal sections (768 lines kept in the seat's scratch) and every
   class named is a row below or folded into one (one class, one row); the per-item results are in §3.
7. **The known classes** Q52 A–F, Q55, Q58, Q59, Q62, Q63, L25, KI-1, KI-7, KI-10 and the consolidation rounds' unlawful
   classes each have a row (the id in §2's `queue` column).

### §1.1 The measured B-FUZZ run (mirror, W=1, 10⁴ per property, seed 20261013)

Every family green; 2026-10-13 23:54Z – 2026-10-14 00:36Z, 12 vitest runs in sequence (the step3-5 family's tally came
from its first run; the bands, faces, warp and step1-2 families were run twice, the second time with the console output
forced). Each line: file · tests · duration · what it counted.

| family | tests | s | refusals counted (seed 20261013, 10⁴ per property) |
|---|---|---|---|
| `test/num/bfuzz.test.ts` | 9/9 | 2 | typed only (R-01 – R-03 asserted well-formed; no tally) |
| `test/geom/bfuzz.test.ts` | 11/11 | 21 | typed only (`collinear` / `empty` / `fit` / `E_NO_PATH` asserted; no tally — R-20, R-21 from a-10 c1) |
| `test/faces/bfuzz.test.ts` | 2/2 | 365 | 10 000 faces built; commits absorb 10 000, band 655, claim 9 675, hole 5 400, merge 9 005, pin 10 000, radial 1 435, split 4 365 — the rest typed refusals of the ops' contracts (R-13); isolated-point family 10 000 built, 7 407 holding a point, split 2 648 |
| `test/warp/bfuzz.test.ts` | 3/3 | 70 | > 5 000 committed steps, 0 refusals; the no-op (D-03) tally is asserted, not printed |
| `test/insert/step1-2/bfuzz.test.ts` | 4/4 | 43 | attractVertex 9 537 written cases, placement fallbacks 0; near-frame 63 863 splits, 28 811 written, 34 256 on an edge whose ends cannot clear (landed on an end, nothing written); no refusal class |
| `test/insert/step3-5/bfuzz.test.ts` (+ `PLAT_FUZZ_COUNTS`) | 7/7 | 341 | **random 0 E_INVARIANT + 3 optional N-43 (cap 12); constructive 0 + 1 (cap 8); mandatory 2 + 0 (cap 8)** — 6 bound-caused refusals of lawful input in 3 × 10⁴ cases (R-04: 2, R-05: 4); the four register replays commit as pinned |
| `test/insert/step3-5/register.test.ts` | green | 4 | fix1-case1 s36, fix1-case2 s31 refuse `E_INVARIANT`, nothing written (R-04); n43a / n43b / S5 / S6 fixtures as pinned |
| `test/arr/bands/bfuzz.test.ts` | 2/2 | 1 130 | 10 000 networks, 9 992 committed; **kerb 6, corridorUnion 8, bandUnion 6 refusals, every one insertChain's `insert: no route … within the fidelity bound (N-43)`, own 0** (R-06; R-18 0); tileRings 10 000 cases, 228 `overlap` results (R-17), refusals 0 |
| `test/arr/bands/register.test.ts` | 3/3 | 53 | every `refusals.json` case and R2 still refuse typed, nothing written, insertChain's (R-06) |

Measured lawful-input refusals on this tree, this seed: **26** (step3-5 6, bands 20), all R-04 – R-06's one router class;
unlawful-input refusals in the measured families: typed in every case, 0 crashes, 0 hangs, 0 invalid outputs.

## §2 The class table (ordered by owner, then source)

Columns: id · source (operation or stage, code, site) · input kind (with the rule) · count (k of N, seeds) · family / source
of the count · provenance (MEASURED on a7f28fde, or HARVESTED with the commit or date it measured) · verdict · owner · queue.
"insertChain's" means the refusal replays on `insertChain` alone (C-0212 (10)'s replay / caps.ts `countedRefusal`).

| id | source | input kind | count | family / source | provenance | verdict | owner | queue |
|---|---|---|---|---|---|---|---|---|
| R-01 | `snap` `E_OUT_OF_RANGE` x/y (`num/snap.ts:15,17`) | UNLAWFUL — §3.2 (7) range invariant | 5 861 of 10⁴ (probe draws over doubles and specials); k-04 4 619 of 10⁴ | a-01 c2's seeded probe; `M0-k-04.json` snap | HARVESTED (c2 2026-10-12; k-04 2026-10-06); MEASURED typed (num family 9/9) | (c) REFUSE — the door names the coordinate; §7.1's authoring boundary keeps a stroke inside the frame, so no user reaches it | M0-a-01 | — |
| R-02 | `ratio` `E_DEGENERATE ratio` | UNLAWFUL — a denominator below the floor (§3.2) | 1 731 of 10⁴ | a-01 c2 probe | HARVESTED 2026-10-12 | (c) REFUSE — internal numeric contract; no user | M0-a-01 | — |
| R-03 | `frameOf` `E_OUT_OF_RANGE` area/aspect/margin/range, `E_DEGENERATE` (`num/frame.ts:26–37`) | UNLAWFUL — configuration outside §3.2 (1), (9) | 8 320 of 10⁴ | a-01 c2 probe | HARVESTED 2026-10-12 | (c) REFUSE — the layer is door (1)'s blueprint validation (the run's configuration) | M0-a-01 | — |
| R-04 | `insertChain` `E_INVARIANT` 'insert: no route … keeps clearance (§3.10) within the fidelity bound (N-43)' (`insertChain.ts:840`), MANDATORY chains | LAWFUL — §3.6 Chain classes: a mandatory chain cannot fail for precision | caps.ts's 31-seed measure (S6): random 58, constructive 31, mandatory 47, fidelity 3 per 31 × 10⁴; this seat's run: §1.1; a-05 c1's probe 12 of 269 104 (cons 3 944/5, 13 184/3, 18 036/3; dense 6 738/11, 10 209/8, 14 135/7, 14 508/8, 14 563/8, 14 564/3, 17 560/0, 17 791/2, 18 085/8); register fix1-case1 s36, fix1-case2 s31 | step3-5 B-FUZZ (3 families), register, a-05 c1 N-c2-5 | MEASURED (seed 20261013) + HARVESTED (C-0221; c1 2026-10-12) | **(a) MAKE-IT-SUCCEED** — the router (Q20 A / Q21's precedent: a deterministic clean-up or a better route) | M0-a-05 | KI-1 |
| R-05 | `insertChain` `E_BELOW_MIN_EDGE` '… keeping clearance leaves the fidelity bound (N-43)' (`:838`), OPTIONAL chains | LAWFUL — the chain has a lawful place; only the router's bound stops it (N-46 (3)) | caps table: 49 + 15 + 2 + 0 per 31 × 10⁴; this seat: §1.1 | step3-5 B-FUZZ | MEASURED + HARVESTED (C-0221) | **(a)** — with R-04 (F-NUM absorbs it at the stage, so the stage count is 0; the kernel count is the census figure) | M0-a-05 | KI-1 |
| R-06 | `insertChain`'s `E_INVARIANT` (R-04's text) reached through the arr overlays: `kerb`, `corridorUnion`, `bandUnion`, `tileRings` (`bandUnion.ts bandCore`, `kerb.ts:361–383`), `buffer`, `offsetFace`, `settlementPerimeter`'s union | OUR OWN INTERMEDIATE — the overlay's chains are our construction from lawful input (N-58 (a)) | bands: cU 16 / 16, bU 2 / 3 per 10⁴ at seeds 1012 / 20261011 (s4); a-09 s6 (not landed): kerb 15/10/36, cU 16/16/39, bU 2/3/13 before = after; k-04: kerb 7, corridorUnion 1, buffer 7, offsetFace 56 per 10⁴; a-08: buffer 10, offsetFace 6 per 1 000 at seed 8611; this seat's bands run: §1.1; register `arr/bands/refusals.json` (every row insertChain's, re-run green) | bands B-FUZZ + register; k-04; a-08 c1 | MEASURED + HARVESTED (a-09 s4 2026-10-12, J348 2026-10-13, k-04 2026-10-06, a-08 c1 2026-10-12) | **(a)** — the router's round (R-04); the kerb share re-measured after Q18 (the read on the real arena's overlay changes the attractors it sees) | M0-a-05 (router); M0-a-09 / M0-a-08 callers | KI-1, Q58 |
| R-07 | `insertChain` `E_INVARIANT` '(way, way:fuzz) branches: a linear role forms simple chains or rings' in the fuzz-bar (`invariants/batch.ts:571`, `tx/tx.ts:442`) | UNLAWFUL — one entity id over disjoint random chains (§3.10 role consistency) | 314 of 10⁴ | `M0-k-04.json` insertChain; k-04 probe P3 | HARVESTED 2026-10-06 | (c) REFUSE — harness-internal; no user reaches (the same text on lawful input is R-12 and R-40) | M0-a-05 / M0-k-04 | — |
| R-08 | `insertChain` `E_DEGENERATE empty` — a mandatory chain with < 2 distinct points after snap and decimation (§3.6 step 1) | UNLAWFUL — zero-length / duplicate chains (§13.1's draw) | 523 of 10⁴ (k-04); the planted zero-length cells of R-45 | k-04; x-06 | HARVESTED 2026-10-06 / 2026-10-12 | (c) REFUSE — the layer is §7.1's dry run: a stroke of < 2 resampled points is an empty edit, reported with its reason; in generation a stage's bug (R-36 is the lawful case) | M0-a-05 | — |
| R-09 | `insertChain` F-NUM codes on OPTIONAL chains: `E_BELOW_MIN_EDGE` (collapse; wedge > attractCm), `E_BELOW_MIN_ANGLE`, `E_SELF_INTERSECT` (a ring role) | UNLAWFUL for an optional chain — §3.6 Chain classes ("a proposal that cannot be inserted is not a street") | 519 + 57 of 10⁴ (k-04); step3-5 random family's PRECISION codes (asserted, not tallied) | k-04; step3-5 B-FUZZ | HARVESTED 2026-10-06; MEASURED typed | (c) REFUSE — the layer is F-NUM's ladder (re-propose from the next attempt stream → reject with a report line, §5.2); optional chains are the generator's proposals, so no user reaches | M0-a-05 | — |
| R-10 | `tx` 'remove lane' `E_INVARIANT` 'an L2 batch wrote the L1 index (delete of vertex N (L1)) outside its promotions and demotions' (`index/fresh.ts:86`; N-s6-1's kept vertex) | LAWFUL — removing a live lane | 9 batches in the WIDE families: along ×104 729 seeds 325 @12, 1097 @9/@12/@15; heavy ×15 485 863 seeds 7 @18, 9 @6, 247 @5, 619 @19, 719 @14; 0 in the registered families | a-06 s6's 52 220-batch golden | HARVESTED 2026-10-13 (c4f1005) | **(a)** — the restoration trigger reads a finer chain ending on the run (N-s6-1) | M0-a-06 | Q62 |
| R-11 | `tx`'s registered-family refusals: `E_KEPT` (kept content), a stretch removal leaving a way in two parts without `rekey` (role consistency), one `E_DEGENERATE` | UNLAWFUL — the families draw §3.3's and §13.1's refused cases on purpose | default 59 of 336, along 104 of 384, regressions 49 of 220 batches; wide 3 478 / 16 800, 4 579 / 19 200, 3 576 / 16 000 | a-06 s6 golden (identical before and after) | HARVESTED 2026-10-13 | (c) REFUSE — the layer is §7.1's dry run (a drawn way across kept or locked content is a conflict with its action; `refuse.locked`); generator-internal otherwise | M0-a-06 | — |
| R-12 | `tx` 'insert way' along 648 @13 `E_INVARIANT` '(way, way:13) branches' | LAWFUL (Q62) — not examined (N-s6c-4 (2): likely a three-point way whose snapped form touches itself) | 1 batch (wide family) | a-06 s6 golden | HARVESTED 2026-10-13 | **(a)**, provisional — §3.6 step 1 already specifies the repair of a chain touching itself (split into simple runs); the round examines the case and makes it commit | M0-a-06 | Q62 |
| R-13 | the face partitioners' contract refusals: `splitFace` `E_NOT_TWO_CROSSINGS` (GEO-6), `connectHole` `E_HOLE_CONTACT`, `mergeFaces` `E_STRUCTURAL`, `ringBand` `E_BELOW_MIN_WIDTH` | UNLAWFUL for the op — §3.6 splitFace contact semantics | splitFace 5 111 of 10⁴ random cuts (k-04); faces B-FUZZ asserts codes (§1.1) | k-04; faces B-FUZZ | HARVESTED 2026-10-06; MEASURED typed | (c) REFUSE — the layer is F-CUT's ladder, which picks another cut (§4.6, §5.2); S8/S10 internal, no user | M0-a-07 | — |
| R-14 | `insetRing` `E_NON_CONVEX` (`insetRing.ts:129`) | UNLAWFUL for the op — §3.7 Insets | 4 424 of 10⁴ | k-04 | HARVESTED 2026-10-06 | (c) REFUSE — §3.7 names the alternative (`offsetFace` inward, `buffer` ∪ face outward); no user | M0-a-08 | — |
| R-15 | `booleans` / `buffer` / `offsetFace` / `insetRing` `E_DEGENERATE empty` / `collapsed` (with `partial`, `lastCm`) | LAWFUL input, the design's typed result (§3.11 'no input'; §3.7 the inset past the inradius) | booleans 2 814, buffer 1 820, offsetFace 5 459, insetRing 789 of 10⁴ | k-04 | HARVESTED 2026-10-06 | (c) REFUSE — the alternative is in the result (`partial`, `lastCm`) and the caller's ladder (S10's setbacks); no dead end, no user | M0-a-08 | — |
| R-16 | `insetRing`'s bisection reading an overlay refusal at a trial distance as an empty result (KI-7; `insetRing.ts:134–149`) | OUR OWN INTERMEDIATE — an insertChain refusal inside our own bisection | 0 met in 1.2 × 10⁵ (C-0231); 0 in k-04's 10⁴ | a-08 S1; k-04 | HARVESTED | **(a)** — the bisection propagates the typed refusal instead of reading it as empty (a `lastCm` can otherwise be lowered wrongly) | M0-a-08 | KI-7 |
| R-17 | `tileRings` `E_DEGENERATE overlap` (`tileRings.ts:158`) | UNLAWFUL — rings breaking §2.6's composition contract (§13.1: a refusal exactly where the oracle has a hole) | 1 131 of 10⁴ (k-04); bands tileRings property typed (§1.1) | k-04; bands B-FUZZ | HARVESTED 2026-10-06; MEASURED typed | (c) REFUSE — the layer is the composition rung's contract (`setComposition`'s dry run bends, never silently repairs, §7.1); no M0 user | M0-a-09 | — |
| R-18 | `bandUnion`'s own N-57 (2) clauses: 'outline: piece i … cannot pin its contact … within attractCm' (`bandUnion.ts:587`), 'ends on a dangling tip' (`:622`, `:644`), 'an end to pin first' (`:532`) | OUR OWN INTERMEDIATE | 0 at seeds 1012 / 20261011 (s4); 1 of 10⁴ at seed 20261011 (#7644) after J318 (a-09 s6, not landed) | bands B-FUZZ; a-09 s4, J348 | HARVESTED 2026-10-12 / 13 | **(a)** | M0-a-09 | Q59 |
| R-19 | kernel misuse refusals: `corridorUnion` / `bandUnion` `E_LEVEL` (batch level), the façade's `kernel:` texts (closed overlay, no index), `tx` without an index | programming errors | 0 in every family (a-16 notes, a-02 c1) | consolidation checks | HARVESTED 2026-10-12/13 | (c) REFUSE — no user reaches (the stages call the façade) | M0-a-09 / M0-a-16 / M0-a-02 | — |
| R-20 | `regularFit` `E_DEGENERATE fit` (`geom/regular-fit.ts:59,61,110`) on self-crossing star rings {n/k} | UNLAWFUL — a face ring is simple (§3.10) | 300 of 300 star rings (a-10 c1); k-04 779 of 10⁴ (< 3 vertices / zero area) | a-10 c1 census; k-04 | HARVESTED 2026-10-13 / 10-06; MEASURED typed (geom 11/11) | (c) REFUSE — no user reaches a self-crossing ring (the arrangement's faces are simple) | M0-a-10 | — |
| R-21 | `lir` `E_DEGENERATE empty` (`lir.ts:340`) on star rings; `hull` / `obb` / `lir` `collinear` (`hull.ts:24,41`) | UNLAWFUL — §3.11 'one item' / self-crossing | lir 63 of 300 star rings; hull 226, obb 252 of 10⁴ random | a-10 c1; k-04 | HARVESTED | (c) REFUSE — no user (tier-1 results of the services) | M0-a-10 | — |
| R-22 | `delaunator` adapter `E_OUT_OF_RANGE` on an off-lattice coordinate (`adapters/delaunator.ts:40`) | UNLAWFUL — §3.2 (1) | 0 of 15 200 registered calls; 2–3 in the unlawful probe family | a-12 c1 | HARVESTED 2026-10-13 | (c) REFUSE — snap is the door; no user | M0-a-12 | — |
| R-23 | arena block decode of corrupt bytes / a lattice reference with no vertex (`io/`) | UNLAWFUL bytes | 400 corruptions, every one typed; lawful round trips 0 | a-15 c1 | HARVESTED 2026-10-13 | (c) REFUSE — the layer is §3.9: a corrupt cache is loaded by replay | M0-a-15 | — |
| R-24 | S8 refused whole by the `seam-portals` stage-end row (`infill/stage.ts:190`, `E_INVARIANT`) | LAWFUL (N-57 (1), N-59) | integrated CITY 4 of 50 (seeds 20, 23, 39, 44) → **0** after s4 | c-06 smoke 2026-10-11; b-03 s4 | HARVESTED — PROVISIONAL (the third continuation re-reads) | **(a) DONE** 756b1a76 (kept for §5's before/after) | M0-b-03 | Q41 |
| R-25 | S8 kerb read refused / 'no working block read' (a split child's seed outside kerb(F); Q47's 14 blocks) | LAWFUL — a wrong recorded seed | fusion 1 of 50 (seed 30) → 0 (s4); 14 blocks → 0 (s5) | c-06 smoke; b-03 s4, s5 | HARVESTED — PROVISIONAL | **(a) DONE** (s4 756b1a76; s5 9398b2b9) | M0-b-03 | Q47 |
| R-26 | S8 antenna corner check refusing an exactly-collinear cut (`ladder.ts:573` `cornerBelow` → `why: 'angle'`; rung `antenna` `refused`, `bentCutFabric.ts:1241`) | LAWFUL — a lawful cut; a rung-level refusal later rungs absorb (stage refusals 0) | fusion 30: 59 `antenna:refused:angle` against 14 cuts | b-03 s4 (C-0329), N-59 | HARVESTED 2026-10-12 | **(a)** — the corner test admits the exactly-collinear case (a lawful class hiding in a rung) | M0-b-03 | L25 |
| R-27 | S8 F-CUT depth-0 ladder ending `unresolved` (every rung refused: `kerb-arrival`, `width`, once `contact`; concave faces above the substitution bound) | LAWFUL — a stage FINAL outcome (an unresolved cut; §4.6 step 8 calls rung (c) always-succeeding) | 59 of 10⁵ faces (seed 1); b-03 s4's base runs 3 → 3 | `M0-b-04.json` fcut; b-04 N-1; b-03 s4 | HARVESTED 2026-10-06 / 10-12 | **(a)** — rung (c) completes on concave faces (with L20's needle rule) | M0-b-03 / M0-x-05 | new (b-04 N-1), L20 |
| R-28 | S3 `trace: gate gate:n is not on the committed trace at its point (§4.2 S3 (9))` `E_INVARIANT` (`enceinte/trace.ts:290`) | LAWFUL | x-06 1 (cell/bridge×frame 1409296145, Q52 C); the small river frame (CITY 30 ha) seed 27 (c-03 c1 N-c1c-3); river900 seed 12 (gate:2; N-33); KI-10's seed 5 | x-06; c-03 c1; c-02 N-33; x-04 notes 1 | HARVESTED 2026-10-12 / 13 | **(a)** | M0-c-01 / M0-c-02 | Q52 C, Q46, KI-10 |
| R-29 | S3 water `the crossing … has no clear chord between its two bank pins` `E_INVARIANT` (`trace.ts:151`) | LAWFUL | x-06 4 (bridge×frame 396602230, 765046355, 914597522, 3484178840; Q52 D); base river seed 2 → 0 (Q40 DONE 194eb090); relief-3000 S3 `E_INVARIANT` 1 of 8 (e-06, class by code — PROVISIONAL) | x-06; c-02 s4; e-06 | HARVESTED | **(a)** | M0-c-02 | Q52 D, Q46 |
| R-30 | S3 / S5a F-WALL `E_SELF_INTERSECT` 'the trace touches itself / crosses the core after the re-offset and union-simplify rungs; the later rungs are M1's' (`trace.ts:196`; C-0085) | LAWFUL | x-06 4 (bridge×frame 1523636832/3428569941, 1785777080, 1918289972, 3360356802; Q52 E); river900 S5 seeds 8, 14; RIVER_BLUEPRINT S5 seeds 3, 4 and S3 seed 5; relief-60 spike seed 2 (N-33); runBase RIVER 3 (c-04 c1); KI-10 seeds 1, 6 (river N); e-06 relief-60 S5 12 of 32 (first check, STALE), relief-3000 S3 1 of 8 | x-06; c-02 N-33; c-04 c1; x-04 notes 1; e-06 | HARVESTED 2026-10-12 / 13 (e-06 2026-10-08) | **(c) REFUSE as notBuilt — milestone #1: `notBuilt('M1')`, F-WALL's redraw → drop rungs (§5.2; C-0085)**; the refusal's detail names M1 already; the code should carry `notBuilt('M1')` (x-04 notes 1). The session may pull the redraw rung into this phase (§6 Q2) | M0-c-02 / M0-c-04 | Q52 E, Q46, KI-10 |
| R-31 | S3 the trace's insert `E_DEGENERATE empty` | LAWFUL | x-06 1 (bridge×frame 1933152649; Q52 F) | x-06 | HARVESTED 2026-10-12 | **(a)** | M0-c-01 / M0-c-02 | Q52 F |
| R-32 | S5 / S3 `layStrips`: 'a side's lines closed no strip face' (`strips.ts:397–398`), 'one face on both sides of the wall' (`:399`) `E_INVARIANT` | LAWFUL | x-06 18 (Q52 B, the seeds in x-06-notes' table); EP-01/S5a/coincident's unplanted control 3 of 1 000 (957349493, 2306189499, 4102748823 — Q37: the trace spike at a pinned gate, M0-c-04's `stageStops` corridor direction); c-02 c1 3 → 3 | x-06; c-02 s3/c1 | HARVESTED 2026-10-12 / 13 | **(a)** | M0-c-02 (strips), M0-c-04 (stageStops) | Q52 B, Q37 |
| R-33 | S5a `E_DEGENERATE stretch` (the id rule at a collision; KI-10's seed 2, river W) | LAWFUL | 1 → 0 (c-02 s4: "always refused E_DEGENERATE stretch before") | c-02 s4; x-04 notes 1 | HARVESTED 2026-10-13 | **(a) DONE** 194eb090 | M0-c-04 / M0-c-02 | KI-10 |
| R-34 | S5a `notBuilt('M1')`: 'stage k's trace crosses water while an earlier enceinte holds water gates' (`growth/boundary.ts:443`; C-0244) and the gate-plan refusals (`:453–486`) | LAWFUL | not named by any summary; e-06 relief-60 S5 `E_INVARIANT` 1 of 8 per config may be it (c-04 notes: +1 per walled stage k ≥ 2 at relief-60 seed 15) — PROVISIONAL | e-06 2026-10-08; c-04 notes; c-02 N-34 | HARVESTED | **(a)** — c-02 N-34: the `earlierWaterGates` guard is redundant after C-0324 (3); remove it, then re-measure | M0-c-04 | new |
| R-35 | S4 the spines' batch refused `(way, way:n) branches: a linear role forms simple chains or rings` `E_INVARIANT` (`backbone/commit.ts:586`) | LAWFUL | x-06 7 (EP-01/S4/self-touching 4078456246; S5a/zero-area 1104735897; S6/zero-length 2787492733; EP-05/S5d 1625622056; EP-20/M0 1334794515, 3068986432, 3296267945; Q52 A); relief-3000 S4 `E_INVARIANT` 1 of 8 (e-06, by code — PROVISIONAL) | x-06; e-06 | HARVESTED 2026-10-12 (e-06 2026-10-08) | **(a)** | M0-c-03 | Q52 A |
| R-36 | S5c growth's inner refusals: `W_END_UNMARKED` (`growth/proposals.ts:627`) ×4 and F-NUM `reject: E_BELOW_MIN_EDGE` ×2 (handled inside the stage; 0 of 44 runs refused) | OUR OWN INTERMEDIATE | plain seeds 9, 17, 20, 23 (×1 each) and 20, 23 | c-05 c1 N-c1-4 (44 registered runs) | HARVESTED 2026-10-13 (9ba593f) | **(a)** | M0-c-05 | Q55 |
| R-37 | S1 water: a tributary dropped `refused` on both polygon paths (a mouth meeting the river at a grazing angle) | LAWFUL | 1 of 100 CITY seeds (bar seed 62); stage refusals 0 | e-03 exit bar; e-03 c1 | HARVESTED 2026-10-13 | **(a)** | M0-e-03 | Q45 |
| R-38 | S6 `settlementPerimeter` `E_INVARIANT` — the union's insertChain on a coincident boundary (given twice round) or a self-touching one | UNLAWFUL — a non-simple boundary | EP-01/S6/coincident 2 of 1 000 (2708765650), S6/self-touching 2 of 1 000 (4101706098); S6/zero-area 996 of 1 000 | x-06 | HARVESTED 2026-10-12 | (c) REFUSE — the layer is §7.1's `drawBoundary` dry run (the snapped boundary shown before commit, J-DET-14; a stroke resampled and split into simple runs at the authoring boundary) | M0-e-04 | Q21 |
| R-39 | the stages' planted ZERO-LENGTH cells: S1 `E_DEGENERATE` (218369345), S3 (2376620364), S5a (1924675773), S5b (3504584308) | UNLAWFUL — §13.1's per-class degenerate fixtures | 1 000 of 1 000 in each of the 4 cells (refused-safe, rolled back) | x-06 | HARVESTED 2026-10-12 | (c) REFUSE — the layer is §7.1's empty edit (a stroke of < 2 resampled points appends nothing, the reason reported); the generator plants none | M0-e-03, M0-c-02, M0-c-04 | Q52 context |
| R-40 | the planted ZERO-AREA and COLLINEAR cells: S1 (492415066, 3531121151), S3 (642402145, 2401321442), S5a (2829448911, 716606205) `E_INVARIANT` rolled back; S6 zero-area (3899199413) | UNLAWFUL — a ring of zero area | 1 000 of 1 000 in each of 6 cells; S6 996 of 1 000 | x-06 | HARVESTED 2026-10-12 | (c) REFUSE — §7.1: "a ring to zero area is an empty edit", the dry run reports it; no generator path makes one | M0-e-03, M0-c-02, M0-c-04, M0-e-04 | — |
| R-41 | the planted SELF-TOUCHING cells: S1 bow-ties (2651453823; Q20 class B), S3 (2065051154), S5a (3380957245), S5b (1745954339), S6 (4101706098) | UNLAWFUL — a self-crossing ring | S1 33 of 1 000; S3, S5a, S5b 1 000 each; S6 2 | x-06 | HARVESTED 2026-10-12 | (c) REFUSE — the layer is the authoring boundary (§7.1, §3.4): a user's stroke is split into simple runs before `insertChain`; the fixture plants past it (generator-internal) | M0-e-03, M0-c-02, M0-c-04, M0-e-04 | Q20 B |
| R-42 | the planted COINCIDENT cell S5a: the doubled wall trace — the kernel attracts the second copy off the first and refuses role consistency `(wall, enceinte:2) branches` at commit | **LAWFUL** by this seat's reading of §3.11 ("coincident points are one vertex; a collinear overlap is one shared stretch") and §13.1's constructive 'coincident typed chains' — c2-4 classes it UNLAWFUL by the kernel's own answer; the session rules (§6 Q1) | 5 of 1 000 (1658509524, 3650193777, 3114039644, 2262416935, 57196073) | x-06 c2-4 | HARVESTED 2026-10-13 | **(a)** — stretch attraction shares an exactly coincident chain (M0-a-05); the census then counts 40 lawful, not 35 | M0-a-05 (kernel) / M0-c-02 | Q22 context, new |
| R-43 | non-geometric contract refusals of malformed records: model kinds and counts (m-01 `schemaOrder`, `lawLimit`), lineages (d-05a/b), digests (d-04), tables (s-02 `TableError`), work-limit laws (f-03a), terrain samplers (e-01) | UNLAWFUL — malformed input | lawful inputs 0 refused in every item (m-01 351, d-05a 160 000 + 3 000, s-02 13 tables, f-03a's hand-overs, e-01 36 runs) | the consolidation closing checks | HARVESTED 2026-10-12 / 13 | (c) REFUSE — each refusal names the table, row and cell or the lineage; a dossier comes through the port (§11.4 door (2)); no map user | M0-m-01, M0-d-04/05a/05b, M0-s-02, M0-f-03a, M0-e-01 | — |

Zero-count sources, stated: M0-d-09 crosshost `refused` 0 (2 of 10 cells ran); M0-x-05 `plain.bugs` 0; M0-b-04 `setupRefused`
0, `s8Refused` 0 (10⁵ faces; 500 signature faces); M0-a-14's rows refuse nothing in the families; M0-a-13 warp refuses
nothing (D-03 below); M0-c-06 smoke: S8 refused districts 0, S9 unions refused 0; M0-x-02's 12 fixture + 12 base runs 0.

### §2b Downgrades (an operation commits a degraded result and reports it)

| id | source | input kind | count | family / source | provenance | verdict | owner | queue |
|---|---|---|---|---|---|---|---|---|
| D-01 | the skeleton's numeric contract (`skeleton/prepare.ts:191–218`: `sharpCorner` < 5°, `holeContact`, `empty`, not simple) → each reader's `W_DOWNGRADE` (roof = spine) | LAWFUL on the district and water faces (a sub-5° corner is lawful arrangement geometry — `W_ACUTE_CORNER` is soft; exact zero-width spurs were REPAIRED by N-52 (3)); UNLAWFUL in k-04's degenerate families by construction | corpus bar: relief-60 district 16 of 514 / 16 of 508, water 7 of 8 / 3 of 8; relief-3000 district 43 of 590 ×2, water 1 / 0 of 8 (CITY, 8 seeds, 2026-10-08, pre-N-52 (3)); fusion smoke 3 of 1 597 and 5 of 2 419 district faces (seeds 2, 28, 38, 47; 2026-10-11, post-spur-fix); k-04 3 695 of 10⁴ random; a-12 corpus contract 0 of 2 000 | e-06, diagnosis §5, k-04, a-12 | HARVESTED — the corpus figures PROVISIONAL | **(a)** for the lawful faces' residual (the contract widened or a deterministic pre-clean of inexact spurs within attractCm; the reader's downgrade stays as the safety net); the 5° sentence of §3.8 amended in the hardening pass (§6 Q3) | M0-a-11 | new |
| D-02 | the skeleton validator's `planarity` downgrade (`skeleton/validate.ts:217`): corpus footprints 1144 'arc 3 crosses arc 10', 1840 'arc 6 crosses arc 9' | LAWFUL | 2 of 2 000 on every reader, 2 → 2 across a-11 c1 (seed 20261004) | `M0-a-12.json`; a-11 c1 | HARVESTED 2026-10-13 (d553b2f) | **(a)** — an engine repair, a declared output shift (§3.8 Decision; `golden.test.ts` re-recorded with its choices row) | M0-a-11 | Q63 |
| D-03 | a `warp` step halving to its end — a reported no-op (≤ 8 halvings, §3.6, §3.11 caps) | LAWFUL field whose full strength would break §3.10 | warp B-FUZZ: see §1.1 (`noops` tally); a-13 c1 0 refusals | warp B-FUZZ | MEASURED | (c) REFUSE-as-designed — the layer is §7.1's warp preview and empty-edit report (the dry run names the no-op and its reason); the brush is bent, never a dead end | M0-a-13 | — |

## §3 The verdicts' reasoning (one short paragraph per class)

* **R-01 – R-03, R-20 – R-23 (the numeric and geometric services' doors).** §3.2 (7) makes `snap` the one door to the
  lattice, §3.10 makes every face ring simple, §3.11 lists collinear, < 3-point and self-crossing inputs as tier-1 typed
  results. Each is UNLAWFUL by construction of the probe (doubles, specials, star rings); a repair would guess (which
  coordinate, which lobe). The user never meets them: §7.1 resamples and splits strokes before the kernel and keeps them
  in the frame, and the arrangement's faces are simple. REFUSE, typed, with the door named — no notBuilt needed.
* **R-04 – R-06 (KI-1, the router).** N-43 B's bound is the owner-approved fidelity contract; refusing a MANDATORY chain
  because no route found keeps both clearance and the bound is the router's shortfall, not the input's (§3.6: a mandatory
  chain cannot fail for precision). Every overlay refusal in R-06 replays on `insertChain` alone, so one round owns them
  all: the router (better routing, a deterministic clean-up of the input as Q20 A and Q21 did). The optional variant
  (R-05) is the same shortfall seen through F-NUM's codes (N-46 (3)); the stage absorbs it, the kernel count stays the
  census figure. The caps (12 / 8 / 8 / 3 at 10⁴) remain the flow's gate only (J264 (1)). KI-1's verdict: (a).
* **R-07 – R-09, R-13 – R-15, R-17 (the designed typed outcomes).** Role consistency on one fuzz entity, a chain of one
  point, an optional chain's precision codes, a cut touching the boundary elsewhere, an inset of a non-convex face, an
  empty boolean or a collapsed inset, overlapping composition rings: each is the design's tier-1 answer to an input that
  breaks the op's stated contract (§3.6 Chain classes and GEO-6, §3.7 Insets, §3.11, §13.1's tileRings clause). The
  alternative is named by the design — F-NUM's and F-CUT's ladders, §3.7's offsetFace / buffer, the `partial` and
  `lastCm` in the result, the composition dry run — and none is reached by a user through §11.4's doors. REFUSE.
* **R-10, R-12 (Q62).** Removing a live lane is lawful; the index-freshness row fires because N-s6-1 left a `split`
  vertex restored short (a kerb ending at it). The fix is the restoration trigger reading a finer chain ending on the
  run (a-06's notes propose it; a declared shift, so a hardening round). The 648 @13 'branches' refusal is kept with
  Q62 as (a) provisionally: if the snapped way touches itself, §3.6 step 1 says the kernel splits it into simple runs —
  a repair the design already specifies — so the lawful verdict stands until the round reads the case; were it a
  genuine bow-tie by the generator, the generator (S5c) owns the defect, still (a).
* **R-11 (tx's registered families).** The families draw §3.3's refused cases on purpose (kept content, a stretch
  removal leaving two parts without `rekey`); the kernel answers as §3.3 and §13.1 state. A user's equivalent is a stroke
  across locked or kept content, which §7.1's dry-run table turns into a conflict with its actions. REFUSE.
* **R-16 (KI-7).** The bisection is ours; an overlay refusal inside it is our own intermediate. Reading it as 'empty' can
  lower `lastCm` wrongly — a silently degraded answer, N-45 (a)'s class even at 0 met. (a): propagate the typed refusal.
  Cheap, no shift on any measured input. KI-7's verdict: (a).
* **R-18 (Q59).** `bandCore`'s pinned-first engine refusing to pin a contact within attractCm is our own geometry failing
  our own clause; the input (three lawful chords) is lawful. (a), with Q58 (an R-06 member) in M0-a-09's round.
* **R-24 – R-27 (S8).** The seam-portals row is right and S8's cut was wrong (N-57 (1), N-59): fixed, kept here so the
  phase-end census compares 4 → 0 and 1 → 0 on the landed c-06 summary. L25's antenna corner check refusing an exactly
  collinear cut is a lawful class hiding in a rung (59 refusals against 14 cuts on fusion 30, fails safe); (a). The
  F-CUT `unresolved` outcome is a stage FINAL outcome on 59 of 10⁵ lawful concave faces — every rung refused, the face
  stands whole with 0 kernel calls — against §4.6 step 8's always-succeeding rung (c); (a), with L20's needle rule.
  The deep-spine fallback (`W_DEEP_SPINE_REFUSED`, N-52 (4)) and rung (a)'s `failed` are absorbed rungs with a designed
  landing (a court); no lawful class hides in them on the measured runs (N-24).
* **R-28, R-29, R-31, R-32, R-35 (Q52 A–D, F; Q37; Q46).** Every one is a registered blueprint at a registered seed, or
  the fixture's own prepared / control state before the planted degeneracy (x-06 r2-1): LAWFUL. The classes are the
  stages' own rows (a gate off its trace, no clear chord, strips closing no face, a spines' batch branching) and each
  closing check since J264 classed them (a). The owners: S3's slice and trace (c-01 / c-02), the strips (c-02), the
  stage stops' corridor at a trace spike (c-04, Q37), the spines' batch (c-03). The S5a coincident control's three
  (R-32) are Q37's true corridor crossings, not Q22's class.
* **R-30 (Q52 E, KI-10's seeds 1 and 6, N-33's S5 self-touches).** The trace's later F-WALL rungs (redraw → drop) are
  M1's by C-0085, so the stage cannot succeed by design not yet built: J264 (2)'s one admitted ground for
  detect-and-refuse. N-58's form then requires a NUMBERED notBuilt: **milestone #1, `notBuilt('M1')`** (the refusal
  already names it in its detail; the code should carry the `notBuilt` text as x-04 notes 1 asks, so a report line reads
  the milestone, not a geometric code). It is the one (c) on lawful input in this census and the only class the owner's
  "wherever possible" leaves open: the session may pull the redraw rung into this phase (§6 Q2). KI-10's verdicts:
  seeds 1, 6 → R-30 (c, notBuilt #1); seed 2 → R-33 (a, done); seed 5 → R-28 (a).
* **R-33, R-34.** The `stretch` collision refusal was drained by c-02 s4 (kept for the before/after). The C-0244 guard is
  a declared notBuilt whose premise C-0324 (3) removed; removing the guard makes the class succeed — (a) rather than a
  second notBuilt number — and e-06's one S5 `E_INVARIANT` per config is then re-measured (§5).
* **R-36 (Q55).** A proposal ending unmarked or rejected by F-NUM at plain seeds the stage registers is our own walk's
  intermediate, absorbed inside S5c (0 of 44 runs refused); (a) by N-58's intermediate rule, as the c-05 check classed it.
* **R-37 (Q45).** A lawful tributary dropped for a grazing mouth: (a) (e-03 notes 7's hardening shape).
* **R-38 – R-41 (the planted unlawful cells).** Each is §13.1's degenerate class planted inside a stage's batch past
  the authoring boundary. The design already repairs a USER's version of each at §7.1's boundary (resample, split into
  simple runs, zero-area → empty edit, the snapped boundary previewed), so the alternative layer exists and is named;
  inside the generator no path makes them. REFUSE, typed, rolled back, one `bugs` entry — as x-06 round 2 pinned them.
  A (b) REPAIR inside the stage is not chosen: it would duplicate the boundary's repair at a layer no user reaches.
* **R-42 (c2-4, the doubled wall).** §3.11's degenerate-geometry row makes a coincident chain one shared stretch, and
  §13.1's constructive set lists coincident typed chains among the lawful cases; the kernel attracting the second copy
  off the first (so the role row branches) is M0-a-05's stretch-attraction shortfall, not the plant's fault. This seat's
  verdict is (a); the x-06 suite's declared rule (C-0342) counts the five as refused-safe, so the session rules which
  census figure (35 or 40 lawful) the phase carries (§6 Q1).
* **R-43.** Malformed records have no lawful reading to repair to; the refusal names the cell or the lineage, and a dossier
  comes through the port. REFUSE.
* **D-01 – D-03.** A lawful face downgraded to roof = spine is the brief's MAKE-IT-SUCCEED case; the 5° contract is the
  design's own sentence, so the round's repair must either widen the contract (handle the sub-5° corner) or pre-clean
  inexact spurs deterministically within attractCm, and the design sentence is amended (§6 Q3). Q63's planarity
  downgrade is an engine defect on lawful footprints: (a), a declared shift. The warp no-op is the design's own bend of a
  brush that cannot commit, reported in the dry run: (c) with the layer named.

## §4 The fix-round batching (J237 (2)) — one proposed round per owning item, in the recommended launch order

| order | item | round takes | waits on |
|---|---|---|---|
| 0 | perf (M0-a-09 / M0-b-03) | **Q18** — the kerb read on the real arena's overlay (N-56 §7's first item; not a class) | — |
| 1 | M0-a-05 (the router) | R-04, R-05, R-06 (with Q58), R-42 if ruled lawful; re-measure the caps' 31 seeds and this seat's seed | nothing; its kerb share (R-06 kerb) re-measured after Q18 |
| 2 | M0-c-02 (+ c-01's slice) | R-28, R-29, R-31, R-32 (strips), Q46's seeds pinned, R-33's pin kept; the edge suite re-run at 1 000 seeds after | — |
| 3 | M0-c-04 | R-32's stageStops spike (Q37), R-34 (the redundant guard) | after 2 (shared files with c-02's strips are c-02's) |
| 4 | M0-c-03 | R-35 (Q52 A) | — |
| 5 | M0-a-09 | R-18 (Q59), the R-06 kerb/corridorUnion/bandUnion re-measure, note 28's class and the dangling spurs (not refusals; §6 Q6) | a-09 s6 landed; Q18 |
| 6 | M0-b-03 | R-26 (L25), R-27 (unresolved; with L20), the s4/s5 pins kept | Q18 for its timing only |
| 7 | M0-a-11 | D-01's residual, D-02 (Q63) — declared shifts, `golden.test.ts` re-recorded | — |
| 8 | M0-a-06 | R-10, R-12 (Q62) with Q57 | — |
| 9 | M0-a-08 | R-16 (KI-7) | — |
| 10 | M0-c-05 | R-36 (Q55) | — |
| 11 | M0-e-03 | R-37 (Q45) | — |
| — | session rulings | R-30 (notBuilt #1 or the redraw rung now), R-42 (lawful?), D-01's design sentence | §6 |

Every (b) REPAIR verdict: none — every unlawful class either already has the design's repair at §7.1's authoring boundary
(named as the layer in (c)) or admits no repair without guessing. Every (c) on lawful input: R-30 only (notBuilt #1).

## §5 The phase-end re-run (the 'after' census, comparable to this one)

1. Mirror the tree (`cp -a plat <scratch>/mirror/plat`), `corepack pnpm install --frozen-lockfile`, machine id and Node
   as §0. Then, one process at a time, `PLAT_FUZZ_SEED=20261013 corepack pnpm vitest run --project kernel --maxWorkers=1
   --silent=false --reporter=verbose <file>` over `packages/kernel/test/{num,geom,faces,warp}/bfuzz.test.ts`,
   `test/insert/step1-2/bfuzz.test.ts`, `test/insert/step3-5/bfuzz.test.ts` (with `PLAT_FUZZ_COUNTS=<file>`),
   `test/insert/step3-5/register.test.ts`, `test/arr/bands/bfuzz.test.ts`, `test/arr/bands/register.test.ts`; read the
   counts file, the bands `REFUSAL` lines and the faces / step1-2 / warp tallies against §1.1.
2. Harvest `summaries/M0-x-06.json` after the stage rounds' 1 000-seed re-run (lawfulRefusals per fixture against §2's
   35 (+5 of R-42), refused-safe per cell unchanged), `summaries/M0-c-06.json` (the landed third continuation: `bugs`,
   `s8Refused`, `ladder`, kerbReads, the corpus clause) against R-24 – R-26 and D-01, `summaries/M0-e-06.json` re-run at
   CITY 8 seeds both fixtures (S3/S4/S5 `refused` per code against R-29, R-30, R-34, R-35; the corpus numbers against
   D-01), `M0-b-04.json` (fcut `unresolved` against R-27), `M0-a-12.json` (validator planarity against D-02).
3. Re-run the cheap registered sets the checks used: a-10's `refusals.mts` constructive census (R-20, R-21), a-01 c2's
   probe (R-01 – R-03), c-05's 44 runs (R-36), c-02's `runBase` RIVER 900 ha seeds 1–15 and RIVER_BLUEPRINT 1–6 (R-28 –
   R-30, R-33), e-03's 100-seed bar (R-37), a-06 s6's golden subsets (R-10 – R-12).
4. Write the 'after' section under the re-run's lane key with the same row ids and both counts per row; M0-x-01 cites it.

## §6 Open questions for the session (with this seat's recommendation)

1. **R-42 — is the doubled wall trace lawful input?** c2-4 says the kernel's own answer (refused) makes it unlawful; this
   seat reads §3.11 and §13.1 as making a coincident chain lawful and absorbed. Recommendation: rule it LAWFUL, route to
   M0-a-05's round, census 40.
2. **R-30 — keep F-WALL's redraw rung at M1 (notBuilt #1) or pull it into this phase?** C-0085 defers it; J238 makes M0
   the bedrock and every KI drains before M1. Recommendation: keep notBuilt #1 for the phase (the refusal is typed and
   names M1), make the code carry `notBuilt('M1')`, and re-decide at M1's first towns if the rate stays at N-33's level.
3. **D-01 — the 5° skeleton contract on lawful faces.** The design makes the downgrade the tier-4 outcome; the brief
   makes a lawful downgrade (a). Recommendation: (a) via a deterministic pre-clean of inexact spurs within attractCm
   (N-52 (3)'s pass widened), the §3.8 sentence amended, the reader's downgrade kept as the net.
4. **R-15 and D-03 as (c).** An empty or collapsed result and a halved-to-nothing warp are typed results with the
   alternative inside them; this seat did not count them as lawful-input refusals. Confirm.
5. **Fusion rows are PROVISIONAL** until the third continuation lands (R-24 – R-26, D-01's corpus share); the before
   figures here are the diagnosis's second smoke.
6. **Not refusals, flagged**: a-09 note 28's class (corridorUnion blocks beyond 73.5 cm with no closing, 25 per 10⁴) and
   the dangling kerb / band spurs (2–6 per 10⁴) are committed results, not refusals; L21's unpinned-edge offset likewise.
   They belong to M0-a-09's hardening round beside Q18, outside this census's counts.
7. **x-06 r2-1**: a stage fix that removes a lawful class shifts the fixtures' standing states, so §5's x-06 figures move
   by construction; compare per class, not per cell.
8. **KI-4** (a per-town refusal budget) needs M1's towns; no row here.

## §7 Summary counts

* **46 classes**: 43 refusal classes (R-01 – R-43) and 3 downgrade classes (D-01 – D-03).
* **(a) MAKE-IT-SUCCEED 23**: refusals R-04, R-05, R-06, R-10, R-12, R-16, R-18, R-24, R-25, R-26, R-27, R-28, R-29, R-31,
  R-32, R-33, R-34, R-35, R-36, R-37, R-42 (21; three already DONE on this tree: R-24, R-25, R-33) and downgrades D-01,
  D-02. **(b) REPAIR 0** (every unlawful class's repair already lives at §7.1's authoring boundary, named as the layer).
  **(c) REFUSE 23**: 22 refusal classes + D-03; of these ONE on lawful input is a numbered notBuilt — R-30, milestone #1
  `notBuilt('M1')` (F-WALL's later rungs) — and two are typed results carrying their alternative (R-15, D-03).
* **Lawful refusals counted, before**: the edge suite 35 (+5 if R-42 is ruled lawful) in 72 000 runs; the fusion smoke
  4 whole-S8 + 1 kerb read of 100 runs (→ 0 after b-03 s4/s5, provisional); B-FUZZ at seed 20261013: 26 of 5 × 10⁴
  cases (step3-5 6, bands 20); a-05 c1's probe 12 of 269 104; a-09 s4 18 / 19 per 10⁴ (two seeds); a-08 16 per 1 000;
  k-04 71 per 10⁴ (kerb 7, corridorUnion 1, buffer 7, offsetFace 56); tx 10 in the wide families; S1 1 of 100; S5c 6 inner
  in 44 runs; e-06 (stale) S3 2, S4 1, S5 2 of 16 CITY derivations; N-33's 7 seeds; F-CUT `unresolved` 59 of 10⁵; L25's 59
  rung refusals on fusion 30. Downgrades: corpus 3 / 1 597 and 5 / 2 419 (smoke), e-06 16–43 per ~500 (stale),
  planarity 2 / 2 000.
* **Items with proposed rounds (§4)**: M0-a-05, M0-c-02 (+ c-01), M0-c-04, M0-c-03, M0-a-09, M0-b-03, M0-a-11, M0-a-06,
  M0-a-08, M0-c-05, M0-e-03 — eleven, after Q18 (perf) and the three rulings of §6 Q1–Q3.
