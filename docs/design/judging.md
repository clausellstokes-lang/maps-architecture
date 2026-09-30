# judging — the panel's verdict, the grafts, and how the final architecture answers every flaw raised

Lane `ARCHITECTURE` (chief architect, Fable 5.1), workflow 03 run `wf_e306f20c-a9f`, Synthesize phase, 2026-09-25.
Status: **COMPLETE**. This file records the judging that produced `docs/ARCHITECTURE.md`: the score table (§1), the
per-lens winners and the choice of base (§2), the consolidated graft list (§3), every fatal or major flaw any judge
raised and where the final design answers it (§4), the judgment calls of this seat (§5) and CONFIRMED-vs-PLAUSIBLE
(§6). Section numbers of the form "ARCH §n" point into `docs/ARCHITECTURE.md`.

## §0 Provenance, reading record, and the relay call

**Inputs read in full (every line) by this seat:** `docs/design/proposal-kernel.md` (1 365 lines), `proposal-pipeline.md`
(1 703), `proposal-product.md` (993), `docs/design/judge-parity.md` (441), `judge-improvement.md` (285),
`judge-engineering.md` (362). **Read by section outline plus full reads of the sections the synthesis needed:**
`docs/IMPROVEMENTS.md` — §4 (R1–R16), §5 (5.1–5.5), §7 (7.1–7.4), O10, O16 and O19 in full; the lettered acceptance
criteria of the other opportunities were taken from `proposal-kernel.md` §15.2 and `proposal-product.md` §16.2, which
the improvement judge verified letter by letter against the source; `docs/CONFIDENCE.md` — §1 (verdict), §5 (what
cannot be known), §6 (experiments) in full; its §4.1–4.4 capability tables were not re-read here — every row id and
name in ARCH §15 comes from `judge-parity.md` §2 (which read them at source) and from the three proposals' parity
matrices, whose row lists agree. **Not read:** `docs/confidence/*.md`, `docs/improvements/*.md`, the findings files and
the captures — relied on through the judges and the proposals, which cite them by section; no captured bundle, no
reference source. Reading total ≈ 300 k tokens, the switch point of the READING BUDGET rule; the selective reads
above are its consequence and are recorded here rather than skimmed silently.

**Panel summary as relayed by the workflow** (the three judges' own files agree with it): parity lens — kernel 84,
pipeline 76, product 71, winner kernel; improvement lens — product 86, kernel 83, pipeline 81, winner product;
engineering lens — kernel 77, pipeline 76, product 72, winner kernel.

**The relay call (recorded vetoably, as the kernel seat did in its §0.1).** The harness relayed the owner's chat
message as the status question "what's going on?". The status answer is in this seat's structured summary (the
run's state at 12:57: eight inputs landed, this serial Synthesize step started, eleven red-team and coverage seats
queued behind it). The seat then ran its lane, because a status question is not a stop or a redirect, the owner's
ledger records the run as launched (07:36) and resumed (10:03, 11:33) under the standing "keep four lanes running"
directive, and returning without the two files would have sent the eleven downstream seats at a missing
`docs/ARCHITECTURE.md`. Writing two design documents into the run's own output folder is a regular, non-destructive
action. Veto: stop the run in the workflows pane or delete the two files; nothing else in the tree was touched.

**Amendments.** `docs/AMENDMENTS-2026-09-25.md` says the seven late owner rules reach the architecture through an
amendment pass after the review. This seat's brief already contained all seven (greenery, refined islands, height,
size ladders, everything editable, prosperity as a gradient, adopted defaults), so `docs/ARCHITECTURE.md` incorporates
them directly; the amendment pass should verify rather than fold (ARCH §0.4 lists where each landed).

## §1 Score table

| lens (judge file) | proposal-kernel (K, "PLAT") | proposal-pipeline (P, "Burgh") | proposal-product (R) | winner on the lens |
|---|---|---|---|---|
| capability parity and fusion fidelity (`judge-parity.md`) | **84** | 76 | 71 | K |
| improvement realism and restraint (`judge-improvement.md`) | 83 | 81 | **86** | R |
| engineering soundness (`judge-engineering.md`) | **77** | 76 | 72 | K |
| unweighted sum | **244** | 233 | 229 | K |
| lenses won | 2 | 0 | 1 | |

Itemised sub-scores, for the record. Parity: K 2 + 4 + 1 thin rows against P 3 + 5 + 2 and R 3 + 3 + 6 (R's NG rows
B2/B7/B8 scored MISSING because its refine-only interface precludes templates). Improvement (mechanism 40 / metric 30 /
restraint 30): K 31/26/26, P 33/21/27, R 32/28/26. Engineering (robustness 20 / determinism 15 / lifecycle 15 /
performance 15 / testability 10 / licence 5 / build plan 10 / complexity 10): K 17/12/11/10/9/5/7/6, P 14/13/14/9/9/5/7/5,
R 14/10/12/12/9/4/4/7.

## §2 Per-lens winners and the choice of base

**The base is `proposal-kernel`.** It wins two of the three lenses and the sum; it is the only proposal whose shipped
default contains the fusion as the owner's thesis states it (routed arterials between named destinations, FTG-shaped
growth of secondary streets, NG's bent cut with the measured constants and a hole-aware slit, MFCG's grower for
districts), and its central mechanism — a transaction protocol on a snapped, exactly-predicated DCEL with typed
failure codes and per-operation fuzz gates — is sound by construction. Its defects are sequencing and rule omissions
that a paragraph each repairs (§4).

**Why not the improvement winner.** R wins the improvement lens because it carries every acceptance letter and has the
most concrete rendering and content mechanisms; the judge scored its three specific defects (32-bit stream hash, drawn
rather than constructed bend, no exact-N gate mechanism) as major, not fatal, and named J-3: "if fatal, K wins". On the
other two lenses R is last, with a load-bearing district-formation gap and a stage-2 interface that precludes NG's
templates. The synthesis therefore takes R's rendering, content, id-stability, edit-validation and performance
foundations as grafts (§3) rather than R's skeleton.

**Why not the pipeline proposal.** P is within two points of K on engineering and first on stage-2 readiness, lifecycle
and determinism policy; the improvement judge's J-2 notes that had its nine prose rows been treated as clerical it
would have scored ≈ 87 and won that lens. But its default fabric demotes FTG's growth to a preset (the fusion the
owner asked for is not what it ships), its spatial-truth model carries a modelling inconsistency (single face ids on
entities that later cuts fragment), and its memoised dependency DAG is sound only under an untested declaration
discipline. Its orchestration, lifecycle and determinism sections are grafted almost wholesale (§3).

**Sensitivity.** The choice of K as base is robust to both recorded judgment calls: under J-2 (P ≈ 87 on improvement) K
still wins parity and engineering and the sum (244 vs 239); under J-3 (R's defects fatal) K wins all three lenses.

## §3 The graft list (consolidated from the three judges, deduplicated; where each lands)

Each graft names its source, the judge(s) who required it, and the ARCHITECTURE section that carries it.

**From `proposal-pipeline` (P):**

| # | graft | required by | lands in |
|---|---|---|---|
| G-P1 | `SeamContract` as a first-class record on every `District` from milestone 1, with `hard` flags per seam edge and the "100 % of B-CITY districts carry a complete contract" exit criterion (P §4.9, §16 M1) | parity 1 | ARCH §2.5, §4.12, PART II §II.1, §16 M1 |
| G-P2 | the `FabricStrategy` registry as the template model: a template is a strategy the base selects per district, so ring / square / street districts are laid by the base's own engine with seams by construction (P §4.5, §14, D19) | parity 2, engineering G10 | ARCH §4.6, §14, PART II §II.2 |
| G-P3 | the memoised dependency DAG **only as an optimisation** behind plat-tree scoping, gated by a CI staleness oracle (P §4.1, §7.2) | parity 3, engineering G7, improvement §9 deferral | ARCH §7.3 |
| G-P4 | exact-N gates: arterials ranked by betweenness, excess arterials diverted along the wall to the nearest gate as lanes, posterns, F-WALL and F-CASTLE ladders (P §4.8, §5.2) | parity 4, improvement 5 | ARCH §4.8, §5.2 |
| G-P5 | district typing greedy from the largest face with a mixed-use floor; shanty only after the first half of the stages and only outside the enceinte; Y → T junction conversion (P §4.5, §4.4) | parity 5, improvement 9 | ARCH §4.3, §4.5 |
| G-P6 | `dmath` from a permissively licensed fdlibm port instead of in-house polynomials; `Enter = seed + 1`; the concern registry; the 64-bit key hash (P §6.1, §6.2, §6.4) | parity 6, engineering G3/G4, improvement 4 | ARCH §3.1, §6.1, §6.5 |
| G-P7 | the seven-tier ladder vocabulary and the failure-class table with detection / ladder / test per class, the ladder path recorded with a cause code (P §5.1–5.2) | engineering G5, improvement 6 | ARCH §5.1, §5.2 |
| G-P8 | the per-edit-kind lifecycle table (create / read / persist / regenerate / undo / migrate) including the warp rule (per-vertex displacement and the brush stroke), drawn constraints inserted before the stage that would create the class, orphan locks listed after migration (P §7.3) | engineering G1, improvement 7 | ARCH §7.4 |
| G-P9 | migration as a schema chain plus an optional upgrade replay with a diff and a keep-old-model option; the last N minor generator versions replayable (P §7.6, §6.5) | engineering G2 | ARCH §2.9, §6.4, §7.5 |
| G-P10 | the determinism policy as lint and test: no `Math.*` transcendentals, `Math.random`, `Date`, `performance` in model packages; results merged in id order; stage contracts tested as pure functions on two engines with workers on and off; canonical serialisation for the model hash (P §6.4, §13.2) | engineering G3 | ARCH §6.2, §6.5, §13.2 |
| G-P11 | the declared-shift record (stage, cause, seeds moved, statistics moved, expected direction) as the golden re-signing protocol (P §13.3) | engineering G6 | ARCH §13.3 |
| G-P12 | the override-layer composition `defaults ⊕ preset ⊕ userGlobal ⊕ documentOverrides ⊕ editEvents` with `{value, unit, provenance, calibratable}` per table cell, and `Provenance.rules[]` + `deps[]` per entity (P §7.5, §2.2) | engineering G8, improvement 14 | ARCH §2.8, §7.6 |
| G-P13 | one incremental path built and tested in the base (add a growth stage; surviving entities byte-identical; wall → ring road as a graph operation) (P §4.10, §16 M4) | engineering G9, improvement 10 | ARCH §4.11, §16 M4 |
| G-P14 | coast and contours agree by construction (draw the coast, then lower the heightfield on the sea side); the site placed relative to the river; R11 "river within the core when requested = 100 %" adopted as a criterion; F-RIVER ladder (P §4.2) | improvement 8 | ARCH §4.2, §15.2 O1 |
| G-P15 | the explicit siting solver: per-class score over the plot context, fill in descending score with capacity accounting, plan–fit–reconcile ≤ 3 rounds (P §4.7) — fills K's O7 gap | improvement §5 O7 | ARCH §4.7 S10b, §10.2 |
| G-P16 | the `StrategyRegistry` (network / fabric / plots / sitePlan / building / terrain / coast / river / manifest) as the extension surface, subsuming K's `LayoutStrategy` (P §14) | engineering G10 | ARCH §14 |
| G-P17 | keep Poisson k = 50 (all candidates evaluated, the critic's ruling) as the reference-matching default; k a table value (P §3.3) | improvement 17 | ARCH §3.1, judgment J-10, D-11 |

**From `proposal-product` (R):**

| # | graft | required by | lands in |
|---|---|---|---|
| G-R1 | the gate-plaza rule ("a small plaza face carved at each gate inside the wall") and church forecourt squares typed by function (R §5.4) | parity 7 | ARCH §4.8 |
| G-R2 | the paint-program vocabulary derived from `visual-spec.md` §6; the three preset evidence tables; layer order as data with the two recorded orderings; per-preset draw-style checks (R §9.1, §9.3, §14) | parity 8, improvement §5 O12, engineering G18 | ARCH §8.2, §8.3, §13.5 |
| G-R3 | the FTG-faithful roster loop: virtual-population loop, core/shop pools with a shop probability, lifestyle-banded pools with rare outliers, `firstAtPopulation` size gates, resource-availability gates (R §11) | parity 9, improvement §5 O7 | ARCH §10.2 |
| G-R4 | the `postMessage` bridge event/command set with `stateId` concurrency, Universal VTT (`.dd2vtt`) beside Foundry, per-layer scenes; the four regeneration actions "Regenerate (keep settings) / Adjust / New random / Same kind, new seed" as separate operations; P0–P4 proxy thumbnails (R §12, §8.2, §5.1) | parity 10, improvement §5 O16 | ARCH §11, §7.1, §7.8 |
| G-R5 | per-segment bank classes (beach / rock / cliff / quay / marsh) and the lit preset's water programs (depth ramp, foam) (R §5.2, §9.3) | parity 11 | ARCH §2.3, §8.2 |
| G-R6 | anchor-based id stability with `supersedes` links over counter-minted ids, with a canonical anchor encoding per kind and the JOIN id rule (R §3.1; P §6.3) | engineering G11, §3 item 1 | ARCH §2.1, §6.3 |
| G-R7 | the allocation-free struct-of-arrays kernel as the first spike, measured against NG's recorded hot spots (R §4.3) | engineering G12 | ARCH §3.3, §16 M0 |
| G-R8 | the shipping performance architecture: one generation worker, incremental delivery (city-LOD preview after the site and backbone stages), lazy per-district derivation of site plans and labels, retained per-district tiles invalidated by edit scope; parallel DCEL mutation deferred until profiling demands it (R §5.1, §9.2, §13) | engineering G13, §3 item 5 | ARCH §8.5, §12, §4.1 |
| G-R9 | the ladder coverage test (every rung reachable by a fixture) and per-stage golden hashes (R §6, §14) | engineering G14, §3 item 6 | ARCH §13.1, §13.3 |
| G-R10 | every edit dry-run validated against the invariant suite before commit; conflicts returned as actions; migrated edits that no longer apply kept as `orphaned` and reported (R §8.1) | engineering G15 | ARCH §7.1, §7.4 |
| G-R11 | `FaceRef` face unions for multi-face entities (the fix for K-1: corridors and junctions as unions of half-corridor faces nested in their L1 parents) and one DCEL per layer (R §3.2, §3.4) | engineering G16, K-1, P-1 | ARCH §2.2 |
| G-R12 | Irwin–Hall `normal()` and `deck()` helpers (no transcendental in the RNG layer) (R §7.1) | engineering G17 | ARCH §6.1 |
| G-R13 | a largest-inscribed-rectangle routine in the kernel, deterministic over four candidate axes (R §4.2) | engineering G19 | ARCH §3.1 |
| G-R14 | the schema lint that refuses a length field without a unit; the 0.5 % scale-bar check (R §3.1, §9.5) | improvement §5 O6 | ARCH §2.1, §9 |
| G-R15 | `SitePlan` / `BuildingSlot` types and `NeighbourhoodRequest.laid` + `SeamReport` (R §3.2, §2.2) | improvement §5 O17, S1 | ARCH §2.5–2.6, PART II §II.1 |

**Kept from `proposal-kernel` and named by the judges as the parts other proposals lacked:** the transaction protocol
and kernel op list (K §3.3–3.4), the five refinement levels with `parent` links (K §2.2), the bent cut as recorded
with the hole slit and the 4-rung ladder (K §4.6), the entity-type registry with the CI path-coverage test (K §2.8),
the plot construction details and the greedy packer for compounds (K §4.7 S8/S9), the straight-skeleton downgrade
ladder and the route-not-found ladder (K §3.1, §5.2), the explicit area budget formula (K §4.3), per-stage millisecond
budgets with cost-model tests (K §12), the harbour basin/moles/piers rules and the wall trace rules (K §4.8), the
hinterland margin (K §4.8), the parity-metric table (K §13.5).

## §4 Every fatal or major flaw raised, and how the final design answers it

No judge found a fatal flaw in any proposal. Every major flaw, every shared flaw and every "gap no proposal fills" is
listed here with its answer. "ARCH" = `docs/ARCHITECTURE.md`.

### 4.1 Flaws in the winner (kernel), engineering lens

| id | flaw (judge-engineering §2.1) | answer in the final design |
|---|---|---|
| K-1 | the five-level nesting invariant is unsatisfiable: L2 corridors straddle L1 spines and junction faces lie in three or more L1 faces | ARCH §2.2 redefines L2 as a refinement of each L1 face into half-corridor strips (one per spine edge of that face), junction wedges (one per corner) and built blocks; a `Corridor` entity is a `FaceRef` union of the half-corridor faces on both sides of its spine and a `Junction` a union of the wedges around its vertex; strict nesting holds for every face and the invariant is stated on faces, not on corridor entities (G-R11) |
| K-2 | spatial index "rebuilt per transaction commit" with per-insertion transactions ≈ 48 s at S5 | ARCH §3.3: a transaction is a *batch* (one growth stage, one district's infill, one block's plots, one edit); inside a batch a dynamic uniform grid + `rbush` serves queries; `flatbush` is rebuilt once per batch commit; the commit granularity is part of every stage's declaration (§4.1) and the first M0 measurement is insert + snap + re-walk cost per proposal (§16) |
| K-3 | "stores events, not results" contradicts a document that carries plats and a binary geometry block; no mismatch policy | ARCH §2.9 and §7.4: the document stores the recipe, the edit log **and** a materialised snapshot with its model hash; on load the snapshot is used when the recorded generator version is available and its hash re-verifies, otherwise the recipe replays; a hash mismatch is reported, never silent; the app keeps the last N minor versions replayable; an upgrade is an explicit diffed replay (G-P9) |
| K-4 | coordinate bound misstated for the proposal's own METROPOLIS frame | ARCH §3.2 derives the bound from the frame table: METROPOLIS 8 km + 30 % margin per side = 12.8 km = 1.28 × 10⁶ cm; the range invariant is `|x|, |y| < 2²³` cm (83.9 km), products < 2⁴⁹, exact `orient2d` in doubles with ≥ 6× headroom |
| K-5 | S8 at 4.2 µs per plot is below MFCG's recorded 7.5 µs per building floor | ARCH §12 re-budgets plots (ARCH S10; K's S8) at ≈ 10 µs per plot (≈ 55 ms at CITY) and S1 at 30 ms; the CITY p50 sum is ≈ 252 ms against the 300 ms p95 budget; the cost-model test is the gate |
| K-6 | SplitMix64 seeding needs 64-bit arithmetic JavaScript lacks | ARCH §6.1: the four xoshiro128\*\* words are seeded from a 128-bit key derived by two independent 32-bit-lane mixers over the canonical key string (G-P6/G-R12); a CI test asserts every stream key in a B-CITY city is distinct |

### 4.2 Flaws in the winner, parity and improvement lenses

| flaw | source | answer |
|---|---|---|
| §4.5/§4.6 sequencing gap: the infill's stop predicate reads a district band that S6 has not yet produced | parity major 1 | ARCH §4.1/§4.6: district typing and the prosperity field (S6) now run on the *coarse* skeleton before infill; infill (ARCH S8) runs per district with the district class's block band, floored by the stage's density regime; the coarse faces a district claims remain its faces after infill through the `FaceRef` union |
| MFCG B14: no gate-plaza or church-forecourt rule | parity major 2 | ARCH §4.8 adopts R's gate-plaza rule and adds forecourt squares for churches/temples typed by function (G-R1) |
| FTG C10: the suburb stage is a budget row; its measured rules are not designed | parity major 3, repair (b) | ARCH §4.4 designs the `suburb` regime on the S5 queue: offshoot lanes seeded from perimeter spokes outside the last enceinte, deliberate cul-de-sacs (no destination-bias termination), plots laid directly along offshoots with small lots from the outset, a per-plot density Bernoulli from the distance-to-gate kernel; FTG's 83 cul-de-sacs, 30.00 m streets and 14.70 m lot outlines are the calibration references in §13.5 |
| river islands by branch rejoin missing (shared by all three) | parity repair (c) | ARCH §4.2: a `river: {islands}` request adds a branch that rejoins the main course after k cells, typing the enclosed land as an `islet` face; mid-channel islets at wide reaches by a table rule |
| O7: the step that gives ordinary plots their building class/use is asserted, never designed | improvement major 1 | ARCH §4.7 S10b + §10.2: P's siting solver (G-P15) with R's rule scores (noxious downstream/extramural, mills on water, markets at tier-1 junctions or gates, wealth near the centre or high ground, precincts, turf), capacity accounting, plan–fit–reconcile ≤ 3 rounds, F-SITING ladder |
| O19: a must-have reduced to one clause | improvement major 2, gap 3 | ARCH §4.9 writes the greenery rule table (park and green area per 1 000 inhabitants by band, the avenue rule on tier-1 ways in planned or rich quarters, the edge green/orchard rule, churchyards and market greens, yard planting by plot class) and adopts O19 (a)–(g) with the tests |
| O16-core thin: one `regenerate` event with a `keepSeed` flag stands in for four actions; no monotone-control design | improvement major 3, gap 1 | ARCH §7.1 and §7.8: the four actions are separate operations with distinct semantics (G-R4); every numeric control declares its output metric in the control registry, continuous controls are smooth maps with no thresholds, a CI sweep asserts monotonicity and no jump > ε on the golden seeds, discrete controls declare their effect in the report |
| the intent → parameter expansion and the forms catalogue are names | improvement major 4, gap 4 | ARCH §7.7 gives the expansion as a data-held pure function with a worked example and a ten-form catalogue schema with constraints, growth programme and morphometric signature per form (should-have; the input schema and drift bounds stay must-have hooks) |
| two optimistic budgets (S1 15 ms; S9 ≤ 10 µs with a packer) | improvement major 5 | ARCH §12: S1 30 ms at CITY; site plans (ARCH S11; K's S9) median ≤ 10 µs with the compound packer budgeted separately (mean reported); cost-model tests |
| R6 (walls on by default) and R15 (small control surface) unstated | improvement major 6, gap 2 | ARCH §1.2 states the one-click default in one sentence (walls on at TOWN and above); §7.8 sets the control-surface budget (front door = one action; basic panel ≤ 12 controls; advanced panel behind it; 100 % of parameters documented by a registry test; release notes name known defects) |
| own-built transcendentals a reproducibility risk | parity minor | ARCH §3.1: `dmath` from an fdlibm port (G-P6) |
| no rule for N < arterial crossings; `urban_castle` inside/outside not an option; no thematic layers; perimeter expand + round absent | parity minors | ARCH §4.8 (G-P4 exact-N), §4.2 S3 (castle placement option inside / on the enceinte / outside), §8.2 (thematic layers = style overrides keyed by entity attributes), §4.9 (settlement perimeter = stage boundary offset and rounded) |

### 4.3 Flaws in the non-winners that the grafts must not import

| id | flaw | how the synthesis avoids it |
|---|---|---|
| P-1 | single `face` ids on districts/blocks/plots that later cuts fragment; "larger part keeps the id" is edit-unstable | `FaceRef` unions on every multi-face entity (ARCH §2.2); the part containing the parent's anchor point keeps the id (§6.3) |
| P-2 | the memoised DAG has no staleness oracle | the DAG is an optimisation behind tree-scoped invalidation; CI oracle: incremental hash = from-scratch hash on every B-EDIT sequence (ARCH §7.3) |
| P-3 | parallel mutation of one subdivision assumed, not designed | one generation worker with incremental delivery; parallel per-district arenas deferred behind a measured need, with the merge protocol written before it is used (ARCH §12) |
| P-4 | ids by creation order churn under feature growth | anchor rule + revision suffix + declared scope of O2 (b) (ARCH §6.3) |
| P-5 | nine opportunities read only by summary | not inherited: this seat used the letters the improvement judge verified |
| P: growth demoted to a preset; district-level bent cut unmeasured against any reference | the base ships K's growth; districts are grown groups of coarse faces (MFCG's grower), not district-level bent cuts (ARCH §4.6) |
| P: no hole step under `RingFabric` | the base's bent cut is hole-aware (slit) so ring templates have their primitive (ARCH §4.6, PART II) |
| R-1 | 32-bit stream-key hash, P(collision) ≈ 0.25 per CITY | 128-bit key (ARCH §6.1) + distinctness test |
| R-2 | no iterated snap-rounding loop | K's hot-pixel iteration bounded to 3 passes with `E_SNAP_UNSTABLE` (ARCH §3.1) |
| R-3 | no effort or duration for M1–M5 | ARCH §16 carries per-milestone ranges and one total with its basis |
| R-4 | anchor ids lack a canonical encoding and collision rule | ARCH §6.3 defines the anchor per kind (quantised cell size; the higher-class frontage for a corner plot; the JOIN id rule) and the collision rule |
| R: §5.4 districts never bounded or split to a band | not inherited (K's grower) |
| R: refine-only neighbourhood interface | not inherited: the stage-2 interface admits template replacement inside the boundary through `FabricStrategy` (G-P2) |
| R: lateral-offset bend | not inherited: the BG-4 construction (K §4.6) |
| R: D-7 widening of the simulation module | rejected; J-S stands (ARCH judgment J-9) |
| R: Poisson k = 30 | not inherited; k = 50 default as a table value (G-P17) |

### 4.4 Flaws shared by all three (engineering §3) and gaps no proposal fills (improvement §8)

| item | answer |
|---|---|
| ids under feature growth are circular; O2 (b)'s guarantee must be scoped | ARCH §6.3 states the scope: guaranteed across stages and concerns; inside one geometry stage a feature change may shift that stage's entities as a declared golden shift; the anchor rule gives edit and regeneration stability; the revision suffix covers collisions with locked entities |
| the fusion timing risk (O4 f) is a claim in all three | ARCH §16 M0: the fusion gate is the exit criterion of the first spike; the cost-model tests run from the first spike; the fallback (if the gate fails) is written in ARCH §4.4: re-cut the growth/infill boundary one class up before any milestone |
| an in-house straight skeleton is assumed by all three | ARCH §3.1: built with typed downgrades (medial axis; hip-from-OBB) exercised by fixtures through the ladder coverage test; a permissive port is adopted if it passes B-FUZZ (decided in M0) |
| effort optimistic or absent | ARCH §16: ≈ 100–130 expert person-weeks for base + stage 2 (inside this judge's 100–140), with the basis; M1 re-cut to the viewable town only |
| parallel workers mutating one subdivision | single worker first (G-R8); merge protocol specified before workers are used (ARCH §12) |
| whole-model golden hashes | per-stage hashes (G-R9) with P's shift record (G-P11) |
| O16 (f) monotone, continuous controls | ARCH §7.8 (control registry + CI monotonicity sweep) |
| R15 small control surface | ARCH §7.8 |
| O19 greenery rule table | ARCH §4.9 |
| O10 forms catalogue and intent expansion | ARCH §7.7 |
| CONFIDENCE §6 calibration experiments not in any build plan | ARCH §16 "M-1 calibration" schedules #5 (FTG face recovery) and #10 (NG adjacent-footprint pairing), which need no recording, before M0, and #2 (NG size sweep) in the first capture session |
| compound site-plan geometry only in K | kept (K's greedy packer on the OBB grid), ARCH §4.7 S11 |
| one effort figure | ARCH §16 |

## §5 Judgment calls of this seat (each vetoable)

| id | call | rationale | to veto |
|---|---|---|---|
| JG-1 | base = kernel (two lenses and the sum), not the improvement winner | §2; the choice is robust under the judges' own J-2 and J-3 sensitivities | choose R and graft K's kernel into it — the same content in a different skeleton |
| JG-2 | grafts consolidated across the three judges and deduplicated into one list with landing sections, rather than three lists | one document, one place to check | none |
| JG-3 | "not a concatenation" read as: every mechanism appears once, under the section that owns it, in the winner's structure; where two proposals gave the same mechanism the more precise wording was taken and the other cited | the spec's instruction | none |
| JG-4 | the relay call (§0) | recorded there | stop the run |
| JG-5 | the amendments are incorporated directly (§0) | the brief contained them | have the amendment pass fold them again — it will find them present |

## §6 CONFIRMED versus PLAUSIBLE

CONFIRMED: the scores, winners, flaws and grafts quoted in §1–§4 are those written in the three judge files, read in
full; the arithmetic checks the engineering judge executed (birthday bound, `orient2d` bounds, per-plot rates, index
rebuild cost) are cited as that judge's CONFIRMED results; the run state in §0 is from `docs/lane-events.log`,
`docs/ACTIVE-RUN.json`, the run journal and `docs/PROGRESS.md`, read at 12:58. PLAUSIBLE: the choice of base and every
"answer" in §4 is this seat's design judgment, to be attacked by the red-team lanes that follow.
