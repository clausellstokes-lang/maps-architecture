# judge-engineering — ENGINEERING SOUNDNESS verdict on the three architecture proposals

Lane `design/judge-engineering` (judge seat, three-judge panel, Fable 5.1), 2026-09-25. Status: **COMPLETE**.

Lens: numeric robustness · determinism under feature growth · lifecycle of edits (create / read / persist /
regenerate / undo / migrate) · performance budgets versus recorded timings · testability · dependency and licence
risk · build-plan realism · complexity budget (what a small team can actually ship).

**Verdict in one paragraph.** All three proposals converge on the same engineering substrate — integer-centimetre
coordinates with exact `orient2d`, a built half-edge planar subdivision with snap rounding, typed geometry results,
keyed RNG sub-streams, bounded fallback ladders without a whole-map restart tier, one semantic display list, an edit
log on stable ids, B-FUZZ / goldens / parity metrics, and permissive dependencies only — so the scores are close and
no proposal carries a fatal flaw on this lens. **`proposal-kernel` wins narrowly (77/100)** because its central
mechanism — a transaction protocol on a snapped, exactly-predicated DCEL with typed failure codes and per-operation
fuzz gates — is sound by construction and closes the references' recorded failure classes one by one; it needs two
bounded fixes before it is buildable as written (an unsatisfiable level-nesting invariant for corridor faces, and a
spatial index rebuilt per transaction that would cost seconds if transactions are per insertion). **`proposal-pipeline`
(76/100)** is within judgment noise: it has the best lifecycle, determinism-policy and migration design of the three
and must be grafted almost wholesale into §6/§7 of the final architecture, but its spatial-truth model is internally
inconsistent (single `face` ids on districts, blocks and plots of one flat subdivision that later cuts fragment) and its
memoised dependency DAG is sound only under a declaration discipline it does not test for. **`proposal-product`
(72/100)** has the most credible performance architecture and the best id-stability scheme, but a 32-bit stream-key
hash that collides with probability ≈ 0.25 at CITY scale (CONFIRMED arithmetic), no iterated snap-rounding loop, and
a build plan with no durations or effort for M1–M5.

## §0 Reading log, checks executed, evidence discipline

### 0.1 What was read

| file | read | notes |
|---|---|---|
| `docs/design/proposal-kernel.md` (1 364 lines) | **FULL**, every line | in 150–300-line slices |
| `docs/design/proposal-pipeline.md` (1 702 lines) | **FULL**, every line | |
| `docs/design/proposal-product.md` (992 lines) | **FULL**, every line | |
| `docs/CONFIDENCE.md` (800 lines) | **FULL**, every line | §1 aggregates and effort figures, §3/§4 rulings and tables, §5–§8 |
| `docs/IMPROVEMENTS.md` (1 939 lines) | **FULL**, every line | O1–O19, S1–S6, V1–V3, §4 R1–R16, §5 split, §6 traceability, §7, Appendix A |
| findings | not re-read; every reference number a proposal quotes was checked against `docs/CONFIDENCE.md` / `docs/IMPROVEMENTS.md`, which quote the findings with their capture paths | see §0.2 |

Total reading ≈ 750 KB (≈ 190 k tokens), below the READING-BUDGET switch point; nothing was read by outline only.
No captured JavaScript bundle, no `reference/` source and no file outside `/Users/cstokes/Desktop/Maps` was opened.

### 0.2 Checks executed in this seat (CONFIRMED)

1. **Birthday bound for the product proposal's 32-bit stream-key hash** (`proposal-product.md` line 450: xoshiro128\*\*
   "seeded by splitmix32 from a 32-bit key hash (MurmurHash3-x86-32 …)"): `P(collision) ≈ 1 − exp(−n²/2³³)` — 0.10 at
   30 000 sub-streams, 0.25 at 50 000, 0.69 at 100 000. Using the proposal's own CITY entity counts (≈ 4 500 plots,
   ≈ 5 000 buildings, ≈ 5 000 ways, ≈ 500 blocks) with modest concern lists (5 / 3 / 2 / 3 concerns), a CITY needs
   ≈ 49 000 distinct stream keys → **P(two entities share a stream) ≈ 0.25 per city**, before attempts and epochs. A
   64-bit key at 200 000 streams gives ≈ 1 × 10⁻⁹. Script output kept in the session scratchpad.
2. **`orient2d` exactness for the three coordinate bounds**: kernel 3 × 10⁵ cm (max difference 2^19.2, max product
   2^38.4), kernel's own METROPOLIS frame 8 km + 30 % margin (≈ 5.2 × 10⁵ cm, 2^20 / 2^40), pipeline 2^23 (2^24 / 2^48),
   product 2^25 (2^26 / 2^52): all four products stay below 2^53, so every `orient2d` term is exact in IEEE doubles.
   The kernel's stated bound is wrong for its own METROPOLIS frame but exactness still holds; the product's bound has
   zero headroom (2^52 products; the final subtraction is exact only because both terms are < 2^52 in magnitude).
3. **Per-plot budget arithmetic**: kernel S8 = 25 ms / 6 000 plots = **4.2 µs per plot**; pipeline S10 = 50 ms / 4 500 =
   11.1 µs; MFCG's measured `buildGeometry` floor is 19.5 ms + **7.5 µs per building** on its simpler float pipeline
   (`docs/IMPROVEMENTS.md` O17 (h)). Kernel S5 = 40 ms / 5 000 proposals = 8 µs per incremental DCEL insertion
   including snap rounding and face re-walk.
4. **Flatbush-per-commit hazard**: a static index of ≈ 60 000 items rebuilds in ≈ 10 ms (optimistic); at one commit per
   growth proposal (≈ 5 000 at CITY) that is ≈ 48 s, three orders of magnitude over the 40 ms S5 budget.
5. **Line citations** for every flaw named below were obtained by `grep -n` on the proposal files (line numbers quoted
   in §2).
6. **Reference numbers** used by the proposals — MFCG size-80 model 125–260 ms, NG 10–96 ms per hood, VG 240–330 ms,
   FTG ≈ 3–7 s server, 24 restarts in 58 attempts, FTG 593 KB / 2 798 buildings, MFCG 46 000 fills → 590 uploads, NG
   528 uploads, O3 (d) budgets TOWN ≤ 100 / CITY ≤ 300 / METROPOLIS ≤ 1 000 ms, O12 (b) ≥ 60 fps at 40 k buildings /
   200 k trees, CONFIDENCE effort MFCG 46 (36–62) pw, FTG map subset 52 (44–62) pw, NG 21 (16–27) pw — all found as
   quoted in `docs/CONFIDENCE.md` §1 and `docs/IMPROVEMENTS.md` O3/O11/O12/O17/§4 R1.

### 0.3 Evidence discipline

**CONFIRMED** = an arithmetic check I executed (§0.2) or a quotation checked against the cited file and line.
**PLAUSIBLE** = my engineering judgment. Every proposal's mechanism is PLAUSIBLE by its own admission (none is built);
this file scores the *design's* soundness, not executed evidence. Scores are judgment; the rubric that produced them
is stated so a reader can re-weight it.

### 0.4 Rubric (100 points)

| criterion | weight | what earns points |
|---|---|---|
| numeric robustness | 20 | exact predicates with a stated range proof; snap rounding that terminates; typed degenerate results; tolerances in world units; a spatial-truth model whose invariants are satisfiable |
| determinism under feature growth | 15 | keyed sub-streams with a collision-free key; a stated floating-point policy; ids that survive edits and regeneration; version axes |
| lifecycle of edits | 15 | all six paths (create, read, persist, regenerate, undo, migrate) specified per edit kind; migration with a diff; nothing dropped silently |
| performance vs recorded timings | 15 | budgets that respect the recorded rates (MFCG 7.5 µs/building floor; NG allocation hot spots); mechanisms that make first paint cheap; no unbudgeted machinery |
| testability | 10 | property tests with real identities; per-stage invariants; goldens with per-stage hashes and a shift protocol; parity metrics against our captures |
| dependency / licence risk | 5 | permissive-only, verified at adoption; no LGPL/GPL linkage; adapters so a library can be swapped |
| build-plan realism | 10 | riskiest spikes first; measured exit criteria; effort estimates consistent with `docs/CONFIDENCE.md` §1 |
| complexity budget | 10 | the least machinery that delivers the must-haves; a small team can hold it |

---

## §1 Scores at a glance

| criterion (weight) | kernel | pipeline | product |
|---|---|---|---|
| numeric robustness (20) | **17** | 14 | 14 |
| determinism under feature growth (15) | 12 | **13** | 10 |
| lifecycle of edits (15) | 11 | **14** | 12 |
| performance vs recorded timings (15) | 10 | 9 | **12** |
| testability (10) | 9 | 9 | 9 |
| dependency / licence risk (5) | **5** | **5** | 4 |
| build-plan realism (10) | 7 | 7 | 4 |
| complexity budget (10) | 6 | 5 | **7** |
| **total** | **77** | **76** | **72** |

Fatal flaws: none in any proposal. Major flaws: kernel 2, pipeline 3, product 3 (itemised in §2). The two-point spread
between kernel and pipeline is inside judgment noise; §4 states the tie-break.

---

## §2 Proposal by proposal

### 2.1 `proposal-kernel` (PLAT) — 77/100

**Itemised reasons.**

| criterion | score | reasons |
|---|---|---|
| numeric robustness | 17/20 | The best-specified kernel of the three: integer cm with a range argument (§3.2), iterated snap rounding "bounded to 3 passes, then reject the chain with `E_SNAP_UNSTABLE`" (§3.1), lattice welding as the answer to FTG's coincident-intersection bug, world-space tolerances with the OS `DELTA = 1e-6` named as the anti-pattern, a typed `KernelError` set, per-operation preconditions and fuzz tests (§3.4), and a table that maps every creator-admitted failure to the kernel feature that closes it (§3.5). Deducted: the five-level nesting invariant is unsatisfiable for L2 corridors and junction faces as constructed (major flaw K-1); the coordinate bound is misstated for the proposal's own METROPOLIS frame (minor, §0.2 #2). |
| determinism | 12/15 | Path-keyed streams `<stage>/<entity>/<concern>[/attempt][/epoch]` from a 64-bit hash (§6.1) — collision-free in practice; render-time decoration on `style/*` streams never stored; total-order sorts with id tie-breaks; deterministic math library; a nightly cross-platform golden run on five engines (§3.2 item 4). Deducted: ids are per-parent stage counters (§2.1), so a feature that changes the creation order inside a stage renumbers later siblings and, through the path key, re-rolls them — inherent, but the O2 (d) "100 % stable" claim is stated without that scope; xoshiro128\*\* seeded by SplitMix64 needs 64-bit arithmetic that JavaScript lacks natively (§3.1 row RNG; minor). |
| lifecycle of edits | 11/15 | §7.4 covers all six paths in one table; edits are events on stable ids with inverse events (§7.1); pins and locks are barriers to growth and subdivision (§7.2); scoped regeneration is by the plat tree (§7.3) — coarse but sound. Deducted: the persist row says the document "stores events, not results; results are re-derived on load" (line 758) while §2.8/§2.9 store the plats and a binary geometry block — the two readings need reconciling and a mismatch policy (what the user gets when the hash differs) is missing; the inverse of a `regenerate` event is not defined (the old geometry must be snapshotted or embedded); migration is one sentence ("each event type declares a migration"). |
| performance | 10/15 | The most detailed per-stage split (§12) and the only proposal with **cost-model tests** that fail on super-linear growth (§13.2) — a genuine graft. Deducted: S8 at 4.2 µs per plot is below MFCG's measured 7.5 µs-per-building floor for a simpler float operation (§0.2 #3), so the CITY p50 of 180 ms is optimistic by ≈ 40 ms on that stage alone; `index: FlatbushIndex; // rebuilt per transaction commit` (line 181) together with "every insertion is transactional" (line 332) is, read literally, a ≈ 48 s cost at S5 (§0.2 #4) — the intent is surely per-batch commits, but the text does not say so; five separate DCELs per layer multiply memory and re-walk cost (the 10 MB CITY figure in §12 undercounts half-edge arrays by ≈ 2×). |
| testability | 9/10 | B-FUZZ per primitive with real invariants (Euler characteristic, `remove∘insert ≡ id`, children areas sum, `offset(−d)∘offset(+d) ⊆ original`, cross-backend boolean equality within one lattice unit — §13.1); per-stage invariants on B-CITY; goldens with a declared-shift protocol; option-interaction matrix; the fullest parity-metric table (§13.5). Deducted: goldens store whole-model hashes and entity counts, not per-stage hashes, so a shift cannot be localised from the golden alone. |
| licence | 5/5 | The most careful table (§17): BSL-1.0 Clipper2, MIT/ISC everything else, MPL-2.0 `resvg` explicitly dev-only, "nothing GPL/AGPL/LGPL is linked", CGAL excluded by name, a non-IM-Fell default face for clean-room distance. `robust-predicates` is labelled MIT (it is Unlicense/public domain) — harmless. |
| build plan | 7/10 | M0 retires the three real risks first (kernel fuzz, bent-cut signature, fusion timing gate) with executed exit criteria; every milestone has a range in person-weeks. Deducted: M1 at 16–20 pw for S0–S9 + walls + labels + ink preset + three exporters + report + B-CITY-lite is optimistic; the base total "≈ 60–75 pw for milestones 0–4" (line 1212) sits below the sum of the CONFIDENCE floors it must exceed (MFCG 46 + FTG map subset 52, non-additive but not 30 % overlapping) once the new mechanisms (O1, O17, O18, O19, the document, three backends) are added — see §3 item 4. |
| complexity | 6/10 | A five-level plat, an in-house DCEL, an in-house straight skeleton, an in-house deterministic math library, Clipper2 via WASM plus a pure-JS fallback, three render backends plus print tiles, VTT and glTF exporters, and an optional sim module. Each piece is justified; the sum is a large surface for two implementers. |

**Strengths.** (1) The transaction protocol (`KernelTx` with `expect: Invariant[]` and `onFail`) makes "the unit of
failure is a transaction, never the map" a property of the kernel rather than a discipline of every stage (§3.3, §5.1).
(2) §3.5 is the only place in the three proposals where each recorded failure (MFCG 87882877 collapsed edges, the null
`rect`, FTG 153121107 coincident intersections, hourglasses, NG "Alternative cut", VG thorns, OS identity topology) is
paired with the specific kernel feature that removes it. (3) Ladders per failure class with the test that proves each
(§5.2). (4) The hinterland, water-furniture and fortification stages are specified with the same metric precision as
the core (§4.8). (5) Cost-model tests (§13.2). (6) The build-vs-adopt table names the degenerate-input behaviour per
primitive (§3.1).

**Major flaws (fix before build; none fatal).**

- **K-1 (§2.2 rule 1, line 193; §5.3, line 674) — the level-nesting invariant is unsatisfiable as constructed.** Rule 1
  says "each level's faces nest exactly in one face of the level above (`parent`)" and the invariant suite checks
  "every L(n+1) face inside one L(n) face". But §4.7 S7 (lines 555–556) builds L2 corridors by buffering L1 *spines* —
  which are the boundaries *between* L1 faces — and unions them, with "junction faces where corridors of different
  classes meet". A corridor face straddles its spine and therefore lies in two L1 faces; a junction face lies in three
  or more. Either L2 is defined as L1 plus kerb lines (each L1 face splits into half-corridor children and built blocks,
  and a corridor entity is a *union* of half-corridor faces — the product proposal's `FaceRef` idea), or the invariant
  is restricted to built blocks, plots and footprints. As written, the invariant suite fails on every city.
- **K-2 (§2.2, line 181; §3.1, line 332; §12) — spatial-index rebuild per transaction.** "rebuilt per transaction
  commit" with per-insertion transactions is ≈ 48 s at S5 (§0.2 #4). The design needs an explicit rule: transactions
  are per stage or per district; an incremental structure (uniform grid or `rbush`) serves inside a batch; `flatbush` is
  rebuilt once per stage commit. The S5 budget of 8 µs per insertion (§0.2 #3) is itself optimistic for insert + snap +
  re-walk in JavaScript and should be the first M0 measurement.
- **K-3 (§7.4 line 758 vs §2.8–§2.9) — persist wording contradiction and load cost.** "stores events, not results" versus a
  `Document` that carries `plats` and a binary geometry block. If results are re-derived on load, every load is a full
  generation (acceptable at ≤ 1 s) but requires the exact generator version to be available for every stored document;
  the pipeline proposal's rule (keep the last N minor versions replayable; an upgrade is an explicit diffed replay) must
  be adopted, and the mismatch policy stated.
- **K-4 (§3.2 line 348 vs §12 line 919, §4.8 line 603) — coordinate bound misstated.** "3 × 10⁵ cm for a 6 km METROPOLIS
  frame + margin" does not cover the proposal's own 6 000–8 000 m METROPOLIS frame with a 30 % margin per side
  (≈ 5.2 × 10⁵ cm). Exactness still holds (§0.2 #2); the number should be derived from the frame table.
- **K-5 (§12, §0.2 #3) — per-stage budgets below the recorded rates.** S8 at 4.2 µs per plot (MFCG's floor 7.5 µs per
  building on simpler work). Re-budget S8 at ≈ 10 µs per plot (≈ 60 ms) and let the cost-model test be the gate; the
  CITY p95 of 300 ms still holds with less headroom.
- **K-6 (§6.1 line 688) — SplitMix64 seeding needs 64-bit arithmetic.** JavaScript has no native 64-bit integer multiply;
  BigInt is slow and `Math.imul` emulation is error-prone. Seed the four 32-bit xoshiro words from a 128-bit hash built
  from two 32-bit lanes (or splitmix32 ×4 from a 64-bit key) — the product's construction with a wider key.

### 2.2 `proposal-pipeline` (Burgh) — 76/100

**Itemised reasons.**

| criterion | score | reasons |
|---|---|---|
| numeric robustness | 14/20 | Integer cm with the most conservative range proof (`|x|,|y| < 2^23`, terms < 2^49, §3.1), `incircle` kept off the topology path, iterated split-and-snap "bounded by 3 rounds … `TIMEOUT` result returned if the bound is exceeded", a `GeomResult` that "never throws for a geometric reason", six transactional writer operations so "planarity is a property of six functions, not of every stage" (§3.4), fdlibm-derived `dmath` with a lint ban, tolerances in metres. Deducted: the spatial-truth model is inconsistent — `District.face: number`, `Block.face: number`, `Plot.face: number` (§2.3, §2.6 lines 319–326) are single face ids of one flat subdivision, yet S8/S10 cuts fragment district and block faces and the "larger part keeps the id" rule (§3.2, line 466; §13.1 line 1255) leaves `District.face` pointing at one fragment (major flaw P-1); the same rule makes face ids unstable under small edits (which part is larger can flip). |
| determinism | 13/15 | The most complete policy of the three: a memoised `SubStreamFactory` keyed by (stage, entity, concern, attempt, epoch) with an explicit concern registry (§6.2), a 64-bit key hash, `Enter = seed + 1` for transparency, a lint that forbids `Math.*` transcendentals, `Math.random`, `Date` and `performance.now` in model packages, results merged in id order so workers cannot reorder, a canonical serialisation for the hash (§6.4), four version axes with replay of the last N minor versions (§6.5). Deducted: ids are minted "in the deterministic creation order of its parent's stage run" (§2.2, line 249) — the same inherent feature-growth churn as the kernel, mitigated only by a revision suffix on collision with a locked entity (§6.3); PCG32 "implemented with two 32-bit words and `Math.imul`, no BigInt" (line 915) requires emulating a 64 × 64-bit multiply and is chosen "only for its simpler seeding from a hash" — xoshiro128\*\* seeds as simply from a 128-bit hash and is 32-bit native (minor). |
| lifecycle of edits | 14/15 | §7.3 is the reference standard: a table with one row per edit kind and one column per lifecycle path (create, read, persist, regenerate, undo, migrate), including the hard cases — a warp stored as both per-vertex displacement *and* the brush stroke so a regenerated region without those ids samples the field; drawn constraints inserted "before the stage that would create the class"; a rule-table override that "invalidates exactly the entities whose provenance cites that rule row"; undo of a regenerate as a lookup in the memoised engine's last-k snapshots; orphan locks listed after migration. §7.6 migration = schema chain + optional upgrade replay with a diff and a keep-old-model option. Deducted: the memoised engine's snapshot retention ("the last k") is unbounded in size for METROPOLIS documents and unspecified. |
| performance | 9/15 | A per-stage table per size class that sums honestly to ≈ 310 ms at CITY and states that it reaches ≤ 300 "with S8/S10/S12 in 4 workers" (line 1237) and that METROPOLIS "relies on per-district parallelism"; per-plot rate 11 µs, consistent with MFCG's floor. Deducted: the budget therefore rests on parallel mutation of one DCEL by worker pools (§4.1 line 593, §12 line 1239) whose merge protocol — disjoint face sets, non-colliding vertex/edge id ranges, alley insertion at S10 touching shared block edges — is nowhere specified (major flaw P-3); the memoised engine's own bookkeeping (a `deps` list per entity, invalidation closures) is unbudgeted; no incremental-delivery mechanism for first paint beyond "the display list streams by group". |
| testability | 9/10 | Stage contracts tested as pure functions on two engines and two platforms "with workers on and off" (§13.2) — the right test for P-3; the shift record names stage, cause, seeds, statistics and direction (§13.3); ladder path recorded with a cause code (§5.1); parity CLI with bands flagged as placeholders (J-T). Deducted: no ladder-coverage test (every rung reachable by a fixture); goldens are model hashes per seed, not per stage. |
| licence | 5/5 | Hedged where hedging is due: `robust-predicates` "Unlicense/ISC — verify at adoption", Clipper2 port "the port's own licence to verify", straight-skeleton ports "to verify — decide at M1", an allowlist licence checker in CI, a CI grep that fails the build if any captured bundle path is imported (§17). |
| build plan | 7/10 | Weeks × implementers arithmetic shown (44 + 20 + 10–15 = 75–80 pw); riskiest spikes first in a named order; every milestone ends on executed evidence; the single incremental path (add a growth stage) is built in the base as the EVO proof (M4). Deducted: M1 (S0–S8, S10, S12, S7, S15, ink preset, three exporters, report, B-CITY harness, goldens v0) in seven weeks for two implementers is optimistic by ≈ 2×; the total is below what the CONFIDENCE floors imply (§3 item 4). |
| complexity | 5/10 | The memoised dependency-DAG engine "in the spirit of Salsa/Adapton" (§4.1, line 513) is the single riskiest component in any of the three proposals: correct only if every stage declares every spatial read in `deps` (line 228); an under-declared dependency yields silently stale output — the classic build-system bug — and the proposal has no staleness oracle. Add nine strategy registries, a worker pool, CBOR, and the DCEL; the sum is heavy. |

**Strengths.** (1) The lifecycle table (§7.3) and the migration design (§7.6). (2) The determinism policy (§6.4) and the
concern registry (§6.2). (3) The seven-tier failure ladder as shared vocabulary (§5.1) and the failure-class table with
"how it is tested" per class (§5.2). (4) `Provenance.rules: RuleRef[]` per entity so a table edit invalidates exactly its
dependants (§2.2, §7.3). (5) The override-layer composition `defaults ⊕ preset ⊕ userGlobal ⊕ documentOverrides ⊕
editEvents` with `{value, unit, provenance, calibratable}` per cell (§7.5). (6) One incremental path built and tested in
the base (§4.10, §16 M4). (7) The `StrategyRegistry` (§14) as the extension surface for stage 2 and a later village.
(8) The honest §0.1 reading table and D20.

**Major flaws (fix before build; none fatal).**

- **P-1 (§2.3, §2.6 lines 319–326; §3.2 line 466) — single `face` ids on multi-face entities.** After S8 partitions a
  district face into blocks and S10 cuts blocks into plots, the district's and block's `face: number` point at one
  fragment under the "larger part keeps the id" rule. Containment survives through the hierarchical id path
  (`d:3/b:7/p:2`), but every geometric query on a district or block (area, boundary ring, seam contract, label spine)
  needs a face *union* that the model does not hold. Adopt face unions (`FaceRef = {faces: string[]}`) for districts,
  blocks and merged plots, or the kernel's level hierarchy. The "larger keeps the id" rule should also be replaced by a
  deterministic, edit-stable rule (e.g. the part containing the parent's anchor point keeps the id).
- **P-2 (§4.1 line 513; §7.2) — the memoised DAG has no staleness oracle.** "The closure is computed on the entity graph,
  not by geometry, so it is exact and cheap" is true only if `deps` is complete; a plot's site plan reads its neighbours'
  party-wall flags, the adjacent way's width, the block's court — spatial reads that a stage must declare by hand. The
  design must (a) make tree-scoped invalidation (the kernel's §7.3 / the product's §8.2) the default, sound-by-
  over-invalidation path, (b) treat the DAG as an optimisation, and (c) add a CI oracle: on every B-EDIT sequence the
  incremental result's model hash must equal a from-scratch regeneration's hash.
- **P-3 (§4.1 line 593; §12 lines 1237–1239) — parallel mutation of one subdivision is assumed, not designed.** S10–S12
  "run per district in a worker pool" while S10 inserts alleys and back lanes into the shared DCEL; the CITY and
  METROPOLIS budgets depend on it. Specify per-worker arenas with reserved id ranges and disjoint face sets merged in id
  order, or drop the assumption and budget single-threaded (the product's choice) until profiling justifies workers.
- **P-4 (§2.2 line 249; §6.3) — ids by creation order.** Same inherent churn as K-3's sibling in the kernel; the revision
  suffix covers collisions with locked entities only. Layer the product's anchor rule on top (§5 graft G11).
- **P-5 (§0.1, §18.2 D20) — reading coverage.** O1, O5, O6, O7, O8, O10–O14, O16 and O19 were read "by heading and the §5
  summaries only"; the terrain, plots, hinterland, labels and greenery designs therefore rest on relayed evidence. Honest
  and recorded, but a validator should re-read those opportunities against §4.2, §4.6, §4.8 and §9 before build.

### 2.3 `proposal-product` — 72/100

**Itemised reasons.**

| criterion | score | reasons |
|---|---|---|
| numeric robustness | 14/20 | Integer cm with an explicit (if headroom-free) exactness argument (§4.1), `robust-predicates` for `incircle`, typed `Ok | Degenerate | Rejected` results, world-space tolerances named as the cure for `os-geometry.md` §4 item 6, the only proposal that reads NG's allocation hot spot (`Point.new` 385–561 k, `intersectLines` 147–213 k) and answers it with a struct-of-arrays, allocation-free kernel as the *first* spike (§4.3), one DCEL per layer so sky and underground geometry never cut ground faces (§3.4 item 4), face unions for multi-face entities (`FaceRef`), a largest-inscribed-rectangle routine. Deducted: **no iterated snap-rounding loop** — §4.1 (line 304) says results are "snap-rounded to the cm grid and re-validated (simple, no crossing …) before it enters the DCEL" but not what happens when the rounding itself creates a new incidence (both other proposals iterate with a bound and a typed failure); minimum edge 20 cm with a 5 cm weld is fine. |
| determinism | 10/15 | Keyed xoshiro128\*\* sub-streams, render-time decoration seeded by `(entityId, 'decor', lodBand)`, an Irwin–Hall-6 normal (no transcendental in the RNG helpers), `deck` draw-without-replacement, a cross-platform CI matrix, four version axes, and the **best id-stability scheme of the three**: a regenerated entity keeps its id when its *anchor* (frontage edge, footprint centroid cell, junction pair) is unchanged, else it is superseded with a `supersedes` link (§3.1 item 2, line 177). Deducted: the **32-bit key hash** (§7.1, line 450) collides with probability ≈ 0.25 per CITY at ≈ 49 000 streams (§0.2 #1) — two entities would then draw identical sequences and "no stage or entity shares a stream" (§7.1) is false as written; anchor ids need a canonical encoding and a collision rule (two plots after a JOIN; an anchor cell boundary under warp) that is not given. |
| lifecycle of edits | 12/15 | All six paths in one paragraph (§8.1) with two rules the others lack: every edit is **validated in a dry run against the invariant suite** before commit and "conflicts are returned as actions, never silently resolved"; a migrated edit that no longer applies "is kept as `orphaned` and reported, never dropped silently". Locality guarantees stated with the KS faithfulness test (§8.2); assignments are events (§8.4); tables and presets are events with a preference layer (§8.5). Deducted: undo is "the log is the undo stack; every op has an inverse or is replayed from the previous snapshot" — the snapshot policy is unspecified; migration is "functions vN → vN+1 … the edit log migrates by id maps" without the upgrade-replay-with-diff the other two specify. |
| performance | 12/15 | The most credible shipping architecture: generation in **one** Web Worker with incremental delivery (P0–P6 first → a city-LOD preview while P7–P13 continue, §13 line 630), lazy per-district derivation of site plans and labels (§5.1), retained tiles per district invalidated by edit scope (§9.2), instanced batches, OffscreenCanvas for tiles, derived geometry cached by id; per-stage budgets at MFCG-consistent rates (P8–P10 ≤ 60 ms for 4 000–6 000 plots). Deducted: the paint-program interpreter (§9.1, ≈ 15 operations) is an unbudgeted layer between the display list and every backend; "≥ 60 fps at 40 k buildings / 200 k trees" rests on tiles alone on Canvas2D, which is fine for pan but not for the first rasterisation of a METROPOLIS at neighbourhood LOD (no number given). |
| testability | 9/10 | Property tests with genuine algebraic identities (`A∪B + A∩B = A + B`, inset-then-outset ⊆ original, Poisson min-distance ≥ r), the **ladder coverage test** ("every step reachable by a fixture", §6 tier 2), **per-stage hashes** in goldens with per-stage re-signing (§14), the most detailed draw-style census per preset (casing Δ = 2h on every ribbon, water band ratios to 1e-4, hatch triangles per wing 15–20, roof dark/light ratios ± 0.02) and the option-interaction matrix. Deducted: one invariant is not a property ("skeleton … ridge length monotone in area" is false for concave polygons); the B-FUZZ/B-EDIT gates are stated without the workers-on/off contract test. |
| licence | 4/5 | All permissive, fonts under OFL, "one chosen in S-1" for the boolean library by benchmark is sound. Deducted: `robust-predicates` mis-labelled MIT and no "verify at adoption" hedge for ports (the pipeline's discipline). |
| build plan | 4/10 | Spikes S-1 (2–3 weeks), S-2 (3–4 weeks) and S-3 (1 week) have durations and executed exit criteria; M1–M5 (§17 lines 933–937) have **no durations, no person-weeks and no total**, so the plan cannot be checked against `docs/CONFIDENCE.md` §1's floors — on a build-plan-realism lens this is the largest single gap in any proposal. The spike ordering (kernel → fused layout → bent-cut calibration) is right. |
| complexity | 7/10 | The leanest engine: no dependency DAG, no five-level plat, one generation worker, lazy derivation; the extension surface is one `LayoutStrategy` plus registries. Deducted: the paint-program DSL and tile compositor are a renderer of their own to build and test; three backends remain. |

**Strengths.** (1) Anchor-based id stability with `supersedes` (§3.1). (2) The allocation-free struct-of-arrays kernel as
the first spike, grounded in NG's measured hot spot (§4.3). (3) The shipping performance architecture — one worker,
incremental delivery, lazy per-district derivation, per-district tiles (§5.1, §9.2, §13). (4) Dry-run edit validation
with conflicts as actions; orphaned edits kept and reported (§8.1). (5) Ladder coverage test and per-stage golden
hashes (§6, §14). (6) Face unions and one DCEL per layer (§3.2, §3.4). (7) Irwin–Hall normal and `deck` helpers (§7.1).
(8) The draw-style census as a regression suite (§14).

**Major flaws (fix before build; none fatal).**

- **R-1 (§7.1, line 450) — 32-bit stream-key hash.** P(collision) ≈ 0.25 per CITY (§0.2 #1, CONFIRMED). Replace with a
  128-bit key (two Murmur3 lanes or a 64-bit mixer over the canonical key string) feeding the four xoshiro words; state
  the key width in the determinism section and add a CI test that every stream key in a B-CITY city is distinct.
- **R-2 (§4.1, line 304; §4.2 DCEL row) — no iterated snap-rounding loop and no typed failure for an unstable snap.**
  Adopt the kernel's hot-pixel iteration with a bounded pass count and `E_SNAP_UNSTABLE` / `TIMEOUT`.
- **R-3 (§17, lines 933–937) — no effort or duration for M1–M5 and no total.** Add per-milestone ranges and a total
  consistent with `docs/CONFIDENCE.md` §1 (see §3 item 4) so the plan can be judged.
- **R-4 (§3.1 item 2) — anchor ids lack a canonical encoding and collision rule.** Define the anchor per kind
  (quantised cell size; which frontage edge for a corner plot; the id of a JOINed plot — the pipeline's `p:2+3+4` rule),
  and what happens when two regenerated entities claim one anchor.
- **R-5 (§3.2, line 206) — `to?: typeof this.from`** is not valid TypeScript in an interface; trivial, but it signals that
  the entity catalogue has not been type-checked.

---

## §3 Flaws shared by all three (the final architecture must address them once)

1. **Ids under feature growth are circular in every proposal.** Entity ids depend on creation order or on geometry
   produced by upstream draws; stream keys depend on ids. Adding a feature *inside* a geometry stage legitimately shifts
   that stage's entities (a declared golden shift), so O2 (b)'s guarantee must be scoped to *other* stages and concerns
   — which all three satisfy through concern keys. The final design should state that scope, adopt the product's anchor
   rule for edit and regeneration stability, and keep the pipeline's revision-suffix rule for collisions with locked
   entities.
2. **The fusion timing risk is a claim in all three** (network + infill ≤ 100 ms at CITY, O4 (f)); each gates it at M0.
   No proposal has an executed number, and the MFCG creator's own measurement that road-first growth was slower (devlog
   31287) is the only recorded data point. Keep the gate; the kernel's cost-model tests should run from the first spike.
3. **An in-house straight skeleton is assumed by all three** with typed fallbacks (medial axis / OBB fake gable / inset
   loop). This is 2–4 pw of notoriously special-case-ridden work; the fallback must be exercised by fixtures (the
   product's ladder-coverage test) so that a skeleton failure is never a crash and never a visual surprise.
4. **Effort is optimistic in the two proposals that state it, and absent in the third.** `docs/CONFIDENCE.md` §1 prices
   MFCG alone at 46 (36–62) pw and the FTG map subset at 52 (44–62) pw; the base must reach parity with both *and* add
   O1, O17, O18, O19, the document/edit log, three backends and the exporters. Sharing the kernel, display list and
   document plausibly removes 25–35 % of the two floors, not 50 %. A PLAUSIBLE honest range for base + stage 2 at the
   described scope is **≈ 100–140 expert person-weeks**; the kernel's 75–90 and the pipeline's 75–80 sit at or below the
   optimistic end. The milestone-1 gate list should be re-cut so that M1 is a *viewable* town (S0–S9, walls, ink preset,
   PNG/SVG, report) and everything else moves right, or the team size is raised.
5. **Parallel workers mutating one subdivision are assumed by kernel and pipeline** (S7–S9 / S10–S12 per district) without
   a merge protocol; the product's single-worker + lazy-derivation design is the one that can be shipped first, with
   workers added behind a measured need.
6. **Whole-model golden hashes** (kernel, pipeline) should become per-stage hashes (product) so a shift is localised.

---

## §4 Winner on this lens

**`proposal-kernel`, narrowly.** The two-point margin over `proposal-pipeline` is inside judgment noise; the tie-break is
engineering soundness *by construction*: the kernel's central mechanism (a transaction protocol on a snapped,
exactly-predicated DCEL with typed failure codes, per-operation fuzz gates and a failure-class → kernel-feature table)
is correct if implemented as specified, whereas the pipeline's central mechanism (a memoised dependency DAG with
hand-declared `deps`) is correct only under a discipline the proposal does not test, and the pipeline's spatial-truth
model carries a modelling inconsistency in the very structure every stage writes to (P-1). Both of the kernel's major
flaws (K-1, K-2) are fixed by a paragraph each (face unions for corridor entities; batched transactions with an
in-batch index); neither changes the architecture. The product proposal is the best *shipping* design (performance
foundation, id scheme, dry-run edits) and the weakest on the two things this lens cannot excuse — a determinism bug
that is arithmetic, not judgment, and a build plan that cannot be checked.

The final architecture should therefore be **the kernel's substrate** (§2–§3, §5) with **the pipeline's orchestration,
lifecycle and determinism policy** (§5.1, §6, §7, §13.3, §14) and **the product's performance foundation, id scheme and
edit-validation rules** (§3.1, §4.3, §5.1, §6, §8.1, §9.2, §13) grafted in — the specific list follows.

---

## §5 Grafts from the non-winning proposals (must be in the final architecture)

From **`proposal-pipeline`**:

- **G1** §7.3 — the per-edit-kind lifecycle table (create / read / persist / regenerate / undo / migrate) as the
  normative specification, including the warp rule (store per-vertex displacement *and* the brush stroke), drawn
  constraints inserted before the stage that would create the class, and orphan locks listed after migration.
- **G2** §7.6 + §6.5 — migration as a schema chain plus an optional **upgrade replay with a diff** and a keep-old-model
  option; the app keeps the last N minor generator versions replayable so a permalink never silently changes.
- **G3** §6.4 — the determinism policy as lint and test: no `Math.*` transcendentals, `Math.random`, `Date` or
  `performance` in model packages; fdlibm-derived `dmath`; results merged in id order; **stage contracts tested as pure
  functions on two engines with workers on and off**; a canonical serialisation for the model hash.
- **G4** §6.2 — the explicit **concern registry** (adding a concern is a reviewed change) and the 64-bit key hash.
- **G5** §5.1–§5.2 — the seven-tier ladder vocabulary (feasibility by construction → typed check → local repair →
  bounded local regeneration → simpler primitive → substitution → documented omission) and the failure-class table with
  "how it is tested" per class; the ladder path recorded with a cause code in the report.
- **G6** §13.3 — the declared-shift record (stage, cause, seeds moved, statistics moved, expected direction) as the
  golden re-signing protocol.
- **G7** §4.1/§7.2 — the memoised dependency DAG **only as an optimisation** behind tree-scoped invalidation, gated by a
  CI staleness oracle (incremental hash = from-scratch hash on every B-EDIT sequence).
- **G8** §7.5 + §2.2 — the override-layer composition with `{value, unit, provenance, calibratable}` per table cell, and
  `Provenance.rules: RuleRef[]` per entity so a rule-row edit invalidates exactly its dependants.
- **G9** §4.10 + §16 M4 — **one incremental path built and tested in the base** (add a growth stage; surviving entities
  byte-identical; wall → ring-road as a graph operation) as the EVO proof.
- **G10** §14 — the `StrategyRegistry` (network / fabric / plots / sitePlan / building / terrain / coast / river /
  manifest) as the extension surface, subsuming the kernel's `LayoutStrategy`.

From **`proposal-product`**:

- **G11** §3.1 — **anchor-based id stability** with `supersedes` links layered over counter-minted ids (a regenerated
  entity keeps its id when its anchor is unchanged), with a canonical anchor encoding per kind and the pipeline's JOIN id
  rule (`p:2+3+4`).
- **G12** §4.3 — the **allocation-free struct-of-arrays kernel as the first spike**, measured against NG's recorded hot
  spots (`Point.new`, `intersectLines`).
- **G13** §5.1 / §9.2 / §13 — the shipping performance architecture: one generation worker, **incremental delivery**
  (city-LOD preview after the site/backbone stages), **lazy per-district derivation** of site plans and labels, retained
  per-district tiles invalidated by edit scope; parallel DCEL mutation deferred until profiling demands it.
- **G14** §6 + §14 — the **ladder coverage test** (every rung reachable by a fixture) and **per-stage golden hashes**.
- **G15** §8.1 — every edit **dry-run validated** against the invariant suite before commit; conflicts returned as
  actions; migrated edits that no longer apply kept as `orphaned` and reported.
- **G16** §3.2 / §3.4 — `FaceRef` **face unions** for multi-face entities (the fix for K-1: corridors and junctions as
  unions of half-corridor faces nested in their L1 parents) and **one DCEL per layer** so sky and underground never cut
  ground faces.
- **G17** §7.1 — Irwin–Hall-6 `normal()` and `deck()` helpers (no transcendental in the RNG layer).
- **G18** §14 — the **draw-style census per preset** as a regression suite (casing law, band ratios, hatch per wing,
  roof tone ratios) and the option-interaction matrix.
- **G19** §4.2 — a largest-inscribed-rectangle routine in the kernel (keeps, landmark footprints), deterministic over
  four candidate axes.

Fixes required in the winner before build: K-1 (nesting invariant via G16), K-2 (batched transactions, in-batch index),
K-3 (persist wording and mismatch policy via G2), K-4 (coordinate bound from the frame table), K-5 (S8 re-budget with
the cost-model test as the gate), K-6 (32-bit-native seeding with a 128-bit key), plus the shared items of §3.

---

## §6 CONFIRMED versus PLAUSIBLE

CONFIRMED: the arithmetic in §0.2 (#1 birthday bound, #2 exactness bounds, #3 per-plot rates, #4 index-rebuild cost),
every line citation in §2 (grep-verified), and every reference number the proposals quote that I checked against
`docs/CONFIDENCE.md` §1 and `docs/IMPROVEMENTS.md` (§0.2 #6). PLAUSIBLE: the rubric weights, every sub-score, the
≈ 100–140 pw effort range, the "≈ 2× optimistic" M1 judgments, and the tie-break in §4. No proposal's mechanism has
executed evidence; the M0 spikes each proposal names are where the first CONFIRMED numbers will come from.
