# Fix-all round 3 — SCOPE area (§1, §13 testing, §14 packages, §15 matrices, §16 build plan, §17 clean room, decisions, judgment calls, staged list, summary)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat fixall/draft-scope-r3 (2026-09-25); queued in docs/FABLE-REVIEW-QUEUE.md.

Lane `fixall/draft-scope-r3` · 2026-09-25 · fix architect, SCOPE area, round 3 (Fable role; opus stand-in). Status:
COMPLETE (2026-09-25). Clean-room: every mechanism below is described in this seat's own words and numbers; no
reference code, grammar, palette, word list, identifier or content table is quoted.

## 0. How to read this file (plain words)

The round-2 check left eleven small things wrong in the parts of the design that say what is built and in what order,
how it is tested, how it stays legally clean and which decisions were taken. **All eleven are fixed here; none is put
off and none is waved away.**

* **The plan now says plainly that the metropolis size exists from the first milestone.** A size is one row of a
  table on the same generator, so the first milestone's tests already make metropolises; the second milestone measures
  and tunes them (VS2-2).
* **The speed promises now match the numbers.** The parity checklist no longer says "under a second at every size": it
  says the first picture is under a second for every town and city and for metropolises up to about 48 000 people, and
  about 2.3 s for the very largest; and building the town itself meets the improvement plan's bars up to about 4 500,
  17 700 and 59 000 people, with the slower cases above declared for the owner's veto (VS2-3, with the drawing area's
  NR-1).
* **The re-roll test catches real faults on the first night.** Its four measurements move together in a real town, so
  the nightly sample doubles from 400 to 800 areas (about 12 CPU-minutes). Re-run here with related measurements: a
  perfect re-roller still fails only about one night in a hundred (and is then re-run), while every faulty one tried was
  caught in 2 000 of 2 000 runs (VS2-9).
* **The seeds for the owner's side-by-side panels are now computed by a published hash**, checked here against that
  hash's published test value, with worked examples in the text, so the research side and the product always draw the
  same panel (VS2-6); the seed type and the one spelling of the water settings are declared (VS2-5).
* **The check that copied reference material never enters the design is now a script** that looks for the borrowed
  message names, the reference colours and copied runs of words, and also catches broken table rows; it runs at every
  merge and stops the merge until each hit is fixed or reviewed. On today's text it finds exactly the one broken row
  (VS2-1, VS2-8).
* **Placement of labels stays identical in every browser** because the drawing code that feeds it is now held to the
  same maths rules as the label code (VS2-4).
* Three pointers and names were corrected: the build-plan row that was split over four lines is one line again, a
  stale "label-tile" measurement is now the label-composition measurement, and the list of published algorithms now
  names every one the design uses (VS2-1, NR-9, NR-10, VS2-7).

**Format.** §1 is the disposition table. §2 holds the replacement blocks: eleven whole-subsection blocks, each starting
`=== REPLACE <section and exact heading> ===` followed by the complete new text with its banner under the heading, and
seven row-level blocks for the delegated decisions and the judgment calls (both are single long tables; replacing the
rows alone keeps every other area's rows untouched). Every block was **built by a script from the current
`docs/ARCHITECTURE.md`** with each change an asserted unique replacement, so every sentence a block does not change is
byte-identical to the integrated text. §3 lists what other areas must change and what the integrator must do,
including which round-3 requests to this area are already folded into the blocks. §4 is the evidence.

## 1. Disposition table

| id | sev | disposition | sections changed | mechanism (one line) |
|---|---|---|---|---|
| NR-9 | minor | **FIX** | §16 (M1 exit) | "the label-tile measurement (§8.9)" → "the label-composition measurement (§8.9)" |
| NR-10 | minor | **FIX** | §17.1 (8) | adds, each with its section: MurmurHash3's x86 128-bit hash and 32-bit finaliser (Appleby, public domain), Krüger's series in Karney's formulation, the van der Corput radical inverse and Morton order, Ulichney's void-and-cluster — and every other published method the text now uses (xoshiro128\*\*, Irwin–Hall, monotone chain and rotating calipers, centripetal Catmull–Rom, Laplacian smoothing, Dijkstra / A\*, Brandes, Kruskal, Lambert, CIELAB / CIEDE2000, χ² with Holm, Spearman, Moran's I, KS, SSIM) |
| VS2-1 | minor | **FIX** | §16 (M3a row), §17.1 (2) check (iv); `docs/validation/bench/doc_checks.py` S1 | the M3a row is one line again; the integration seat's scripted check fails any table line outside fenced code that does not start and end with `\|` (executed: it finds exactly this row today and 0 after the blocks are applied to a copy) |
| VS2-2 | minor | **FIX** | §1.1, §13.2, §13.6 (1), §16 (M1 content, M2a exit, M2b content, estimate note), D-35, J-S28; cross: §5.3 (determinism) | METROPOLIS generates from M1 as a `ladder.json` row on the one pipeline; M2b measures and tunes it; its cost-model sizes are reported from M1 and gate from M2b |
| VS2-3 | minor | **FIX** | §15.1 FTG H2, §1.1 (column head, cells, *Budgets inside a rung*), D-18, §15.2 O3 (d) (the last two with rendering's NR-1) | H2: client-side, no server round trip; first map < 1 s for every TOWN and CITY and METROPOLIS ≤ ≈ 14 200 buildings, ≈ 2.3 s at the cap; model within O3 (d)'s bars up to ≈ 4 500 / 17 700 / 58 800 people; both misses declared; §1.1's column reads "model p95 at the target (§12.3's law inside the band; O3 (d) read over the band)" with the law's range per cell |
| VS2-4 | minor (PLAUSIBLE) | **FIX** | §13.3 (placement digests), §14 (dependency rules, `RoleIndex` comment), J-S31; cross: §6.5 (3) (determinism), §9.2 (rendering) | §6.5's allowlist lint covers `@plat/labels` and the renderer code that feeds S13b — every `ObstacleSource` / `RoleIndex` implementation, what it calls and the S14 writers of `bbox`, geometry, `layer`, `z` and symbol-extent columns — found as import closures by CI; the rest of `@plat/render` stays outside |
| VS2-5 | minor | **FIX** | §13.3 (`WaterSetting`, `ShiftRecord`, `MilestoneRecord.parity`), §13.6 (2), (9), §14 | `parity: string` added to `MilestoneRecord`; one `type WaterSetting = 'none'\|'coast'\|'river'\|'coast+river'` in `@plat/testkit`, used by B-CITY, the golden store, `ShiftRecord`, `D5Record` and §13.6 (2) |
| VS2-6 | minor | **FIX** | §13.6 (2), §14, J-S29; cross: §2.9 `type Seed`, §6.1 Enter (determinism) | `H32(s)` = h1 of MurmurHash3_x86_128 over the UTF-8 bytes of `s`, seed 0 — verification value 0xB3ECE62A reproduced, two check vectors in the text; MFCG seeds 1 + (H32 mod 2 147 483 646); seeds are u32 `Seed`s written as decimal strings |
| VS2-7 | minor | **FIX** | Judgment calls (preamble) | "`r2-integration-log.md` §3" → "§4, its conflict table"; a round-3 clause added |
| VS2-8 | minor | **FIX** | §17.1 (2), (9); `docs/validation/bench/doc_checks.py`, `docs/validation/doc-checks-allow.tsv`; J-S32 | five scripted checks before M-1 — identifiers, colour values, token 3-gram runs of ≥ 5 tokens, table rows, pointers — with a reviewed allow file and a non-zero exit that stops the pass; from M-1 the hashed scan replaces the three content checks |
| VS2-9 | minor | **FIX** | §13.2, §13.8, §15.2 O9 (c), J-S4, J-S30; cross: §7.3 item 7 (iv) (determinism) | n = 800 scopes (400 block + 400 district, ≈ 40 800 generations, ≈ 12.5 CPU-min); executed at ρ = 0 / 0.8 / 1: 1.0–1.4 % false campaign failures, 2 000 / 2 000 detection of +0.25 sd bias and 0.8 × snugness at ρ ≤ 0.8, 99.3 % / 99.7 % at ρ = 1, against 92.2 % / 95.2 % at n = 400 |

**Counts:** 11 items — **11 FIX**, 0 INVALID, 0 STAGED-BY-OWNER, 0 deferred.

**Requests of other round-3 drafts to this area, folded into the blocks** (the integrator records them as applied
through these blocks and does not apply them a second time): rendering r3 §3.3 **S1** (D-18 row), **S2** (§15.2 O3 (d)),
**S3** (§1.1 column head), **S4** (§13.2 and §13.8), **S5** (§13.3 stamp-tile view shift), **S6**, **S7**, **S8** (§14),
**S9** (§16 exits), **S10** (J-R19), **S11** (J-R38 – J-R43, verbatim); pipeline r3 §3 SCOPE **S1** (§13.1 fixtures),
**S2** (§16 M3a exit), **S3** (§13.2 stage property tests), **S5** (§14 stage registrations); determinism r3 §3.4
**SR3-1** and **SR3-2** (§13.2 B-EDIT and harbour-works fixtures, "course-knot" for "river-control-point"), **SR3-3**
(§13.1 and §16 M3a), **SR3-4** (§16 M2a and M3a content); kernel r3 Part 3 **X-S1** (a)–(h) (§13.1) and **X-S3** (§16
M3a). Three of them rewrite the same two clauses — §13.1's carve fixture and §16 M3a's clear-region exit — so this lane
merged them into one clause each (pipeline's footprint and seam exception, the kernel's "attraction onto exactly the
prepared vertices", determinism's course-knot and street-grid river moves). **One kernel × pipeline disagreement is
left to the integrator, not decided here:** kernel X-S1 (b) calls each carve deck "an L0 edge carrying `deck` and `way`",
while pipeline K8 / J-P40 makes the deck the kept way's own L1 span with no L0 edge across the water; the §13.1 fixture
is therefore written against "the form §2.2 rule 7 defines", so it holds whichever form the integrator settles in
§2.2 and §3.3. **Not folded** (they touch rows these blocks do not replace; the integrator applies them): pipeline r3
SCOPE **S4** (J-P34 – J-P40, J-I10, J-DET-14), determinism r3 **SR3-5** (J-DET-23 amended, J-DET-29 – J-DET-39), kernel r3
**X-S2** (J-K22 – J-K27 and its amendments of J-K6, J-K14, J-K17, J-K18, J-I10, J-I11).

## 2. Replacement blocks

Whole-subsection blocks first, in document order; then the row-level blocks for the two decision tables.

=== REPLACE §1.1 What is built, in what order; the two size ladders ===

### 1.1 What is built, in what order; the two size ladders

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-scope-r3

| stage | what | depth in this document |
|---|---|---|
| **STAGE 1 — the BASE** (built first) | one general town/city generator on the ladder **TOWN → CITY → METROPOLIS**, fusing MFCG-class and FTG-class generation plus O1–O19: the plot model, plot granularity, prosperity field, greenery, heights, editability, permanent addresses, layers, drainage, every owner hook, and the optional content module `@plat/sim` (its own milestone, M4b) | build-ready: §2–§14, §16 |
| **STAGE 2** (designed here, built after the base) | the same town composed of NG-class neighbourhood close-ups with consistent seams, shared seeds and one style system | interface depth: PART II; what the base must already carry is a base requirement (§2.5, §4.12) |
| **STAGE 3** (staged by the owner, after stage 2) | manor-style building compositions per plot, from a giant manor to a hovel by data rules | hooks concrete: §2.6 (`outline` / `compose` split, cost contract, intake measurement), §8.6 |
| **VILLAGE** (a separate product, staged by the owner; THORP → HAMLET → VILLAGE) | not designed; its hooks are concrete and nothing in the base precludes it | PART III, §15.1 VILLAGE-LATER rows |
| **staged by the owner, hooks concrete** | sewers and floating islands (II.6; §2.1 layers, §2.3 drainage); the evolution engine beyond the one built growth path (§4.11); calibration against the historical corpus (§13.9); SettlementForge inputs (§11.4's host-input contract) | the named sections |

**The two ladders (owner rule 4).** The town/city generator scales **TOWN → CITY → METROPOLIS**; the village product scales
**THORP → HAMLET → VILLAGE** (PART III). The ladders meet without a gap or an overlap: the village ceiling and the base
floor are both **1 500 inhabitants** (D-33). **Size within a rung follows population** (owner, 2026-09-25): the request's
population chooses the rung whose band contains it — bands include their lower bound and exclude their upper one, so
TOWN is [1 500, 10 000), CITY [10 000, 30 000) and METROPOLIS [30 000, 120 000] — and every quantity below it — roster,
stage budgets, district count, frame, plots — is computed from that population, never from the rung's target. All three
rungs generate from M1 — a rung is a `ladder.json` row on the one pipeline, not a separate build — so M1's goldens,
B-CITY runs, determinism tests and diagnostic side-by-side include METROPOLIS; M2b measures and tunes it (§16; VS2-2).

**The rung profile.** Everything the owner's rule says is "defined per rung" lives in one versioned data table,
`ladder.json` in `@plat/tables`, one `RungProfile` row per rung, calibratable like every table (§7.6) and refined by the
corpus phase (§13.9):

```ts
interface RungProfile {
  rung: 'TOWN'|'CITY'|'METROPOLIS';
  populationBand: [number, number]; populationTarget: number;           // the band chooses the rung; the target is the default request
  frameAreaKm2AtTarget: number; aspect: [number, number] /* 0.5–2; square by default */;   // side scales with √(population ÷ target) (§3.2, §12.2)
  stageRows: StageRowRef;                                               // stage count, regimes and walled shares (§4.2 S2)
  budgets: BudgetRef;                                                   // model, first-map and memory budgets (§12.3, §12.5, §12.8)
  granularity: { frontageScale: number; depthScale: number; joinMaxDelta: Record<ProsperityBand, number> };   // scales the §4.7 rows
  greenery: { parkPer1000Scale: number; edgeGreenProb: number; privateGreenShift: number /* points */ };       // scales the §4.9 rows
  districtCountLaw: LawRef; gateLaw: LawRef;                            // §4.5, §4.8
  matched: { mfcgSize: number; ftgSize?: 'BIG_TOWN'|'BIG_CITY'|'METROPOLIS' };   // the side-by-side references (§13.6)
}
```

| rung | population band (default target) | buildings at the target | frame at the target (+ 30 % margin per side) | stage rows | model p95 at the target (§12.3's law inside the band; O3 (d) read over the band) | granularity (frontage × / depth × / rich join max +) | greenery (parks per 1 000 × / edge green or orchard probability / private green shift) | matched references |
|---|---|---|---|---|---|---|---|---|
| TOWN | 1 500–10 000 (5 000) | 1 200–1 500 | 4 km² (2.0 km square) | 2 stages; walled core 0.90 of buildings, ribbon 0.10 | ≈ 100 ms (92–110 ms) | 1.10 / 1.10 / 0 | 0.8 / 1.0 / +5 points | MFCG size 40; FTG BIG_TOWN (≈ 5 600) |
| CITY | 10 000–30 000 (20 000) | 4 500–6 000 | 25 km² (5.0 km square) | 3 stages; 0.55 / 0.33 walled, ribbon 0.12 | ≈ 300 ms (265–340 ms) | 1.00 / 1.00 / 0 | 1.0 / 0.6 / 0 | MFCG size 80; FTG BIG_CITY (24 500) |
| METROPOLIS | 30 000–120 000 (50 000) | 12 000–15 000 | 64 km² (8.0 km square) | 4 stages; 0.30 / 0.30 / 0.28 walled, ribbon 0.12 | ≈ 800 ms (724–880 ms) | 0.90 / 0.95 / +1 | 1.2 / 0.4 / −3 points | MFCG size 130; FTG METROPOLIS per D-31 |

**Budgets inside a rung (VS2-3, NR-1).** Because size follows population, a rung's budgets are §12's laws of its
building count B, never one number per rung; the table's model column is the law at the target's building range. Model
p95: TOWN ≤ 20 ms + 60 µs × B, CITY ≤ 40 ms + 50 µs × B, METROPOLIS ≤ 100 ms + 52 µs × B, and no single generation
above 1.25 × its own law (§12.3). O3 (d)'s bars — 100 ms, 300 ms, 1 s — therefore hold for p95 up to ≈ 1 333 / 5 200 /
17 300 buildings (≈ 4 500 / 17 700 / 58 800 people) and are missed above them: ≈ 196 ms and ≈ 481 ms at the TOWN and
CITY band tops and ≈ 1.92 s at the METROPOLIS cap. The first map follows §12.5's laws: under 1 s for every TOWN and CITY
and for METROPOLIS up to ≈ 14 200 buildings (≈ 48 000 people), ≈ 2.3 s at the 120 000 cap. Both misses are declared
for the owner's veto (§12.3, §12.5, D-18).

The stage rows are §4.2 S2's (MFCG's measured 0.87–0.92 of buildings inside the outermost wall); the budgets are §12's;
the matched references are §13.6's. *Chose* modest per-rung modifiers — wider and deeper plots and more private green in
a town, narrower frontages, larger joined rich plots and more public parks in a metropolis — *over* identical rows at
every rung *because* the owner asked for granularity and greenery to be defined per rung, and land pressure in the core
rises with town size (the historical pattern the corpus phase will calibrate); the values are PLAUSIBLE defaults with
provenance "architecture 2026-09-25". **Confirmation (M2b, B-CITY):** the modest band's median frontage orders TOWN >
CITY > METROPOLIS and park area per 1 000 inhabitants orders TOWN < CITY < METROPOLIS. **Pre-decided fallback:** if an
ordering fails, that modifier's distance from 1 is doubled once and re-measured; if it still fails, the modifier is set
to neutral (1.0 / 0) and the ordering is reported as not produced.

**Requests at the ends of the ladder.** A request below 1 500 inhabitants is routed by `LadderRouter.route(population) →
{ product: 'base' | 'village', rung }` to the village product (PART III); while no village product is registered the
base builds a 1 500-person TOWN and `requestedVsBuilt` reports the clamp. A request above 120 000 is clamped to 120 000
and reported. A request that names both a rung and a population outside that rung's band is an F-EDIT conflict whose dry
run offers the rung the population belongs to.

=== REPLACE §13.1 Kernel property tests (fast-check; B-FUZZ) and the ladder coverage test ===

### 13.1 Kernel property tests (fast-check; B-FUZZ) and the ladder coverage test

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-scope-r3

Every kernel primitive is fuzzed with two input families, held to one bar — **0 crashes, 0 hangs (hard timeout), 0
invalid outputs** — at the sizes of §13.8's tiers.

1. **Random inputs** (`fast-check`): concave, holed, thin, near-collinear, snapped, duplicated-vertex, ≥ 300-vertex and
   zero-area polygons and chains.
2. **Constructive degeneracies (GEO-12).** Random sampling almost never lands on an exact degeneracy — a line across a
   2²⁴ frame holds at most 2²⁴ of its 2⁴⁸ lattice points, so a random third point is collinear with probability
   ≤ 2⁻²⁴ — so every degenerate class is built on purpose from random parameters:
   * lattice points exactly on a segment, placed by gcd stepping (`p₀ + k · d / gcd(dx, dy)`);
   * collinear triples and collinear overlapping edges (shared runs from 1 cm to the whole edge, same and opposite
     direction);
   * cuts through a vertex and cuts grazing a reflex vertex (through it, and offset by 0 and ± 1 lattice unit);
   * antennae (chains dangling into a face) and chains touching a boundary at one point;
   * coincident typed chains — a wall on a bank, a quay on a shore, a street on a district boundary, a track on a field
     boundary;
   * rectangles, squares and regular n-gons (n = 3 … 12) rotated by random angles and snapped to the lattice;
   * holes touching the outer ring at a vertex and along an edge, and holes touching each other;
   * simultaneous skeleton events (regular polygons, equal-sided rectangles, symmetric notches);
   * values exactly on quantisation boundaries (half-centimetre ties before snapping; ± (2²³ − 1)) and values `snap`
     must refuse (± 2²³, NaN, ± ∞);
   * the attraction, move and kept-content cases (GEO-3, GEO-5, GEO-35, VK-1–VK-18): a vertex at (20, 20) against the
     edge (0, 0)–(1 000, 0) (it moves onto (0, 0); no sub-`minEdge` edge); a chain crossing an edge next to a vertex
     standing 25.0–25.7 cm from it; a stretch whose join point lies within `attractCm` of an edge endpoint; a `warp`
     with `fromLevel = 1` over a street ending on a shore (the junction slides along the shore and the step commits); a
     `pinch` that would shorten an edge below `minEdge` and a step that would put two vertices on one lattice point (both
     halve); a 20 × 10 m rectangle with a 3 × 2 m notch on a long side (skeleton path; no roof line outside); star rings
     of radius 2²³ − 2 (`area2` exact); an L1 lane into a face holding kept L3 content of an earlier stage (`E_KEPT`); a canal across a CITY district
     that cuts a lane whose remainder is pruned and re-routes a `primary` — every face outside its footprint (§4.11: the
     channel buffer ∪ every L1 cell its way rule touches) byte-identical except the seam exception at its boundary, and
     its L0 channel attracting onto exactly its prepared vertices (each promoted, no other finer vertex promoted, each deck
     carrying `deck` beside `way` in the form §2.2 rule 7 defines); a course-knot move and a river move across a street
     grid, with the same footprint and contact assertions (§7.3 (b)); a carve chain that touches a finer edge away from
     its prepared vertices (`E_LEVEL` inside the clear region, `E_KEPT` outside; §3.3 clear regions); a lane removed from a spine it ended on (the spine's chain restored exactly, its own
     shape vertices untouched; the `split` flag, §2.2 rule 3); II.1 (3)'s neighbour
     step beside finished plots — a plot-line end within `attractCm` of the foot (promoted; every plot ring unchanged), one
     farther (a kerb split; each ring equal to its prior ring with the vertex removed), and the street removed again (the
     kerb restored exactly); an S8
     T-junction on a spine with a width profile (every sampled half-width unchanged); a pool overlay writing outside its
     district (`E_SCOPE`); a logged `moveVertex` replayed after an upgrade that puts an unrelated vertex 20 cm from its
     position (bound to the signature-matching vertex or orphaned, never to the unrelated one); a slot freed and reused
     inside a stage (the query returns the new item); a pooled district beside the settlement perimeter commits plot
     lines that end on the backland part's inner edge with 0 unresolved crossings at pool sizes 0 and 3, and the freeze
     finds every dynamic grid and tombstone set empty (§3.3 pool step 1); an L3 query in a block before and after S11
     derives L4 there — two plots sharing their lowest-leftmost vertex with an L4 vertex on their shared edge — returns
     its results in the same order (`fixall_kernel_r3_checks.out` C); a `warp` over a spine carrying a same-level
     T-junction, then its lane removed (the junction stays as a shape vertex of the warped spine), and a `warp` that
     re-seats a Steiner vertex, then `clearFiner` (the vertex dissolves and the coarser edge is restored exactly); a warp
     moving a kerb beside a vertex 25.3 cm from it — the kerb (0, 0)–(1 000, 9) past (517, 30) — commits, its re-seated
     vertex placed by the placement rule (`fixall_kernel_r3_checks.out` A); a `warp` over a locked plot and over a pinned
     building (every corner held; a neighbour's footprint corner on the locked plot's line slides) and a `warp` with
     `fromLevel = 1` over finished fabric (0 `E_KEPT`); a way split between two width knots (every sampled half-width
     within 10⁻⁹ cm of its value before the split), then re-joined (the original profile bit for bit); the frozen copy
     sent to a pool worker holds typed arrays only — no `Map` or `Set` reachable from the message.

**Properties** (checked after every operation): output simple; nesting by index (every face inside its parent); no
edge shorter than `minEdge` from any writer, after every insertion and every warp step, and clearance ≥ `minEdge`; Euler characteristic after every insertion;
`remove(insert(x)) ≡ id` on the topology; **`splitFace` children tile the parent exactly at the child level (integer
`area2` equality)**; `mergeFaces ∘ splitFace` restores the ring and the id; `corridorUnion` faces disjoint and covering;
`offset(−d) ∘ offset(+d)` ⊆ original and `insetFace` empties monotonically; **every straight-skeleton output passes the
§3.8 validator — a connected graph inside the face whose number of independent cycles equals the number of holes — or is
a reported downgrade**; OBB contains the hull and collinear input returns `E_DEGENERATE`; LIR inside the face; snap
rounding idempotent and terminating within its bound; the `orient2d` sign equal to a BigInt reference on adversarial
triples; Poisson minimum distance ≥ r; differential agreement with the CI oracles (Clipper2-WASM in Node,
`polygon-clipping`) on booleans and buffers, split by attraction (§3.7): unattracted cases with equal face counts and
symmetric difference ≤ perimeter × 1 cm, attracted cases valid and within perimeter × √2 · `attractCm`, ≥ 10⁵ unattracted
cases per operation; roles preserved on coincident chains (a sliver between a spine and a
shore keeps both); a declared batch's result identical under any permutation of its ops, and a callback-form stage's identical across two
runs, a slot renumbering and pool sizes 0–3 (§3.3); `clearFiner` after a refinement restores
the coarser level exactly; mandatory chains never rejected for precision; 0 stale references after every batch; save →
load → save byte-identical (§3.9); a 3 000 m relief fixture stores without a clamp and D8 is defined on 100 % of the hydrology grid's land
cells over frame and margin (§2.3); every routine returns a typed result on the pathological corpus.

**Ladder coverage (G-R9):** every rung of every ladder in §5.2 is reachable by a fixture, and each downgrade (medial
axis, the plain-roof downgrade, straight cut, substitution) is exercised; no roof line lies outside its footprint; a
skeleton failure is never a crash and never a visual surprise.

=== REPLACE §13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT ===

### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-scope-r3

* **Invariants.** The §5.3 suite runs by scope — batch-local invariants per batch, stage-end invariants per stage,
  save / load invariants per document, CI-only invariants in the harness — on B-CITY (1 000 seeds × the 4
  `WaterSetting`s of §13.3 × 3 rungs in the nightly tier; 50 seeds per rung in the PR tier, §13.8; all three rungs from
  M1, because METROPOLIS generates from M1, §16). Each invariant has an id, a severity, a count in
  the report and a CI threshold: hard = 0 per 1 000 cities; soft within its band. The **digest-maintenance oracle**
  checks on every B-CITY-lite city that the Merkle digest maintained batch by batch equals a full recompute (§6.2).
* **The statistics record, split (SCL-21).** The **core record** is O(n) and is emitted by every generation within
  4 ms at CITY (§12.4): counts per entity kind and class; areas per class and band; fixed-bin histograms per district and
  band of plot area, frontage, depth, footprint area and storeys; way length per class; the junction-degree histogram;
  turning per 100 m on ways resampled at 10 m; the walled share and built extent; ladder uses per cause and rung; every
  requested feature's delivery tier (§5.1 principle 7); stage timings. The **bench metrics** — detour index over sampled
  destination pairs, Moran's I, KS distances, junction-to-junction runs, orientation coherence and wall alignment,
  figure-ground metrics on renders (§8.5), tree nearest-neighbour and pair-correlation statistics computed from §8.10's
  stamped scatter — run through `stats(doc, { level: 'bench' })` on demand or in the bench, never on the one-click path.
* **Cost-model tests (SCL-19; NF-S10).** Each stage is timed on **nine sizes — three per rung: the band's bottom, its
  target and its top** — 1 500, 5 000 and 9 900 (TOWN); 10 000, 20 000 and 29 900 (CITY); 30 000, 50 000 and 120 000
  (METROPOLIS) inhabitants, five seeds each (nightly; the METROPOLIS sizes are reported from M1 and gate from M2b, which
  measures and tunes METROPOLIS, §16; VS2-2).
  Its log-log slope of time against its declared work measure (the `Stage`'s work-limit laws, §5.1 (5), §14) must
  not exceed **1.15** for a stage declared linear and **1.25** for one declared n log n; §12.3's per-rung cost laws are
  fitted on the same runs. **Work limits follow population:** each run reports, per stage, the F-WORK hit rate (work
  cuts per 1 000 batches), and CI fails when the rate at the top of a band exceeds the rate at its bottom by more than
  1 per 1 000 — §5.1 (5)'s pre-decided coefficient fallback then applies and the sweep re-runs. **Per-edit cost against
  model size:** a fixed scope — one plot edit, one block reroll, one district regeneration — costs the same at TOWN, CITY
  and METROPOLIS within ± 20 % (§12.6), and so does per-edit validation (§5.3); both are measured TOWN → CITY from M2a
  and TOWN → METROPOLIS from M2b (§16). **Index work** is fitted against commits × level size (§3.3). A **memory test** per
  rung uses §12.8's definition; a **document-size test** per rung holds ≤ 320 B per building at CITY (§2.9); the
  simulation module's occupancy (one hour for 50 000 people ≤ 50 ms in the worker, §10.3, §12.7) has its own cost-model
  test in the module's milestone (M4b). **First map by size (N-2):** B-CITY's browser runs time the first map at the
  same three sizes per rung — TOWN 1 500 / 5 000 / 9 900, CITY 10 000 / 20 000 / 29 900, METROPOLIS 30 000 / 50 000 /
  120 000 people — and fit §12.5's first-map laws (M1 for TOWN and CITY, M2b for METROPOLIS; nightly thereafter).
  **The model max clause (NR-1):** every nightly B-CITY generation's model time ÷ its rung's law at its own building
  count ≤ 1.25 (§12.3), gating TOWN and CITY from M1 and METROPOLIS from M2b. All timings are normalised by §12.1's
  calibration score.
* **Stage contract tests.** The same inputs and stream give the same digest on Node x86 / arm64, Chromium, Firefox and
  WebKit, with workers on and off and pool sizes 0–3 (G-P10); §6.5's determinism tests run beside them (time dilation
  × 10 and × 0.1, the derived-complete digest over three district orders — S12b and the hinterland unit included, replay = session, truncation identity, the
  host-provider double run, links and documents without their packs or host). S8's working block equals S9's committed
  block (Hausdorff 0; §3.7). The per-stop placement digests of §13.3 are the contract test of S13b; the stamp-tile
  hashes of §8.3 are equal in the generation worker and the tile worker on the five engines and equal to their stored
  value (NR-6). **View-data contracts:** every shipped style sheet loads at every band through §8.2's slot resolution
  with 0 unresolved and 0 ambiguous (semantic, pass) pairs (NR-3); entities with equal lineage in two seeds' towns get
  different render keys (§8.3; VD2-6), on two B-CITY-lite seeds per rung.
* **Stage property tests.** 10 000 coast / island / fjord / sky outlines per intent → 0 self-intersections and 0
  untyped loops; 0 overlapping or self-intersecting plots on concave, notched and curved blocks before any fallback;
  attached and party-wall shares on curved-street blocks inside the dense band; roster `manifest(P₂) ⊇ manifest(P₁)`
  for P₂ > P₁ on 1 000 seeds; the stage-3 contract (the union of composed wings equals the outline, §2.6); the `ringed`
  fixture (≥ 3 closed rings, radius CV ≤ 10 %); a B-CITY sweep over `wealthLevel` ∈ {0, 0.5, 1} (population ± 5 %,
  walled share in band); the derived-complete digest identical across district orders; opening a person leaves the
  digest, the log and the undo stack unchanged; **0 `E_KEPT` on the one-click path** over B-CITY (a stage whose domain
  overlaps an earlier stage's kept content is a pipeline bug; VK-1); every gate and weld vertex on its trace, and stage
  1's trace within 40 m of its boundary except along an `on_enceinte` castle's shared stretch (NF-P1, R3-P1); 0 lanes
  crossing a wall strip and 0 L3 band faces split or cleared (NF-P5); 0 S7b claims meeting a wall strip (VP2-3); the
  seam exception on New random of 20 districts per B-CITY-lite city (NF-P6); the union rule (composed wings = outline)
  on curved-street row fixtures with `quad` wings, including rear lines oblique to the frontage — bent party-wall
  chains, `corners` recorded, the ridge at the arc-length midpoints (NF-P2, VP2-5); decks on 100 % of way–water
  crossings, moats and canals included (NF-P4); harbour fixtures with a two-arm mole and a detached breakwater
  pass the crossing invariant as harbour works, and a `quay` way drawn across a river without a deck fails it (§5.3;
  VD2-2); the walled coastal harbour fixtures of §4.2 S3 (11) — the harbour
  outside the stage-1 region, with and without `moat: 'inner'`, and sealed with `N = 0` — each with the harbour served,
  0 non-gate ways reaching the trace, every way–moat crossing on a deck, roads leaving = N, plus the harbour gate at
  `N = 0` (VP2-2); `castle: 'on_enceinte'` with water in reach, with and without a city moat — 0 trace–water crossings
  off a river's water gate, the outer-arc channel beside the shared stretch, the town side dry-ditched or plain by its
  row (VP2-10); every seam edge typed, a way-less shared reservation boundary typed `reserve` (II.5; VK2-10).
* **B-EDIT and the locality oracle.** §7.3 item 7 (i)–(iii) and (v), and (iv)'s byte identity of Regenerate (keep
  settings), run **once per sequence** — at its end and at one seeded random position — never per edit (SCL-18).
  Fixtures: the re-parenting set (`drawBoundary`, district merge and split, `outskirtToDistrict`, regenerate around a
  lock, the id-recycling case); terrain-brush sequences in both water modes, and course-knot, drawn-water and
  drawn-bridge sequences with §7.3 (7)(v)'s assertions (0 decks over land, 0 off-deck crossings, 0 wings off §2.6's
  datum rule, 0 footprints in water); table weight edits and row insertions; drawn features mixed with later attribute
  edits; epochs and rebases; undo and redo from several sessions, with the truncation-identity property (§7.4,
  §6.5 (9)); New random on minimal scopes (§5.1 (6)); the naming-collision replay fixture (§7.3 (7)(i)); the B-EDIT-lite
  identity fixtures (≥ 99.9 % of addresses kept under 1 cm perturbation, §6.3); Regenerate (keep settings) of a
  perimeter district, a walled district and the hinterland, byte-identical, and the margin-band sharing check after
  `outskirtToDistrict`, `drawBoundary` and a merge (§7.3 (7)(vi)); a river move across a street grid that commits with
  decks and cuts and keeps every face outside its footprint — its clear region, §4.11 — byte-identical, and a
  course-knot move replayed after an upgrade that changed the knot count (§7.3 (7)(v)); a warp over a square keeping
  its fountain, over a yard keeping a user-moved tree, and one halved by a pinned pin (§7.4); the truncation-identity
  property with a redo followed by a user-created entity (§7.4); undo after a reload of an unshared document undoing
  the pre-reload event (§7.4, sessions); an edit within 100 ms of opening with a forced mismatch under both choices
  (§2.9 step 4); and **the thirteen MFCG asks of §7.4 as
  scripted scenarios (IMP-16)**, each reporting its locality share (entities outside the effective scope
  byte-identical), its invariant results and its re-run cost against §12.6.
* **The faithfulness campaign (O9 c; §7.3 item 7 (iv); IMP-7, VS2-9).** New random is judged by a campaign, not per
  sequence. Each nightly run draws **n = 800 regenerated scopes** from its B-EDIT New-random events — 400 block scopes
  and 400 district scopes, by a seeded draw; a night whose B-EDIT run holds fewer than 400 New-random events of a kind
  adds New random on seeded scopes of that kind in its B-CITY-lite towns until it has 400 — and for each generates
  **K = 50 from-scratch references** of the same scope: the same upstream state and context, rerolls 32 768 + i for
  i = 0 … 49, a range no user reroll reaches, so no reference can coincide with the tested regeneration. For each of the
  four statistics (median plot area, median frontage width, density, attached share) the rank r of the regenerated value
  among the K references counts the references below it plus a uniform draw from 0 … t over the t references equal to
  it (the draw comes from the campaign's own stream), so r is exactly uniform on 0 … K for a perfect regenerator,
  whatever K and however discrete the statistic. The ranks are binned into 10 bins of ⌊r · 10 / (K + 1)⌋ with expected
  counts proportional to the number of rank values each bin holds; a χ² test per statistic gives four p-values, and the
  campaign **fails when Holm's procedure rejects at family-wise 0.01** (the smallest p-value below 0.0025). Cost
  ≈ 40 800 scope generations (800 × 51), ≈ 12.5 CPU-min at §12.6's block and district costs (20 400 × ≈ 6.6 ms +
  20 400 × ≤ 30 ms), inside the nightly tier's budget (§13.8).
  **Why 800 scopes (VS2-9).** A scope's four statistics move together — a denser block has smaller plots, narrower
  frontages and more attached houses — and correlated statistics add less evidence than independent ones: with them
  correlated at ρ = 0.8, a campaign of 400 scopes catches a +0.25 standard-deviation bias in only 92.2 % of nights and a
  regenerator 0.8 × too snug in 95.2 % (922 / 1 000 and 952 / 1 000; the round-2 verifier's independent re-implementation
  gave 92.0 % and 95.0 %), so with the re-run rule below a real fault would be declared on its first night only
  0.85–0.91 of the time. **Executed** at n = 800 (`docs/validation/bench/fixall_scope_r3_o9c_n800.py` → `.out`, own
  code, stdlib; each generation's four statistics share a scope component at ρ = 0, 0.8 and 1): a perfect regenerator
  fails 1.0 % of campaigns on continuous statistics (31 / 3 000 at ρ = 0.8, 15 / 1 500 at ρ = 0) and 1.4 % (14 / 1 000) on
  heavily tied, scope-varying discrete statistics; a +0.25 sd bias and a 0.8 × too-snug regenerator are caught in
  2 000 / 2 000 campaigns each at ρ = 0 and at ρ = 0.8 (95 % lower bound 99.8 %), a 0.6 × too-snug and a 1.5 × too-loose
  one in 500 / 500, and — at the degenerate ρ = 1, where the four statistics move as one — the bias in 99.3 % and the
  snugness in 99.7 %. Without the randomised tie-break a perfect regenerator fails every campaign on a tied statistic
  (`fixall_verify_scope_o9c_rank.out`). A failing statistic's histogram names the fault: a hump is too snug, a U too
  loose, a slope a bias. **A failed campaign is re-run once with the next campaign seed**: a perfect regenerator fails
  two in a row with probability ≈ 1–2 × 10⁻⁴, and a fault of the sizes above is declared on the night it first runs with
  probability ≥ 0.996 at ρ ≤ 0.8 (≥ 0.985 at ρ = 1). A second failure is a regeneration defect — entered in
  `known-defects.json`, and M3a does not exit until it is fixed (§16), because no threshold can be relaxed without
  passing a wrong regenerator.
* **Control sweeps.** §7.8's statistical monotonicity and continuity: 21 steps × 50 seeds at TOWN and CITY (nightly);
  METROPOLIS in the milestone tier. The population control's sweep also reports the F-WORK hit rate per stage, which
  must stay flat across each band as above.
* **Option-interaction matrix.** Every pair of toggles rendered and diffed; no option silently disables another (O12 c).
* **Documentation coverage (COV-FTG-A25).** 100 % of controls and entity kinds have a guide anchor (§14 `@plat/docs`);
  every in-app help link resolves (CI link check); the release notes list every open entry of `known-defects.json`.

=== REPLACE §13.3 Seed goldens with the declared-shift protocol (G-P11, G-R9), from M1 ===

### 13.3 Seed goldens with the declared-shift protocol (G-P11, G-R9), from M1

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-scope-r3

A golden suite of 12 seeds × {TOWN, CITY, METROPOLIS} × the four `WaterSetting`s {`none`, `coast`, `river`,
`coast+river`} stores, per stage, its
**stage-isolated digest** (the stage's new code run on the previous output version's frozen upstream outputs, §6.4), its
entity counts, the core statistics record and one PNG per LOD and preset; and, per shipped preset's label style, a
**per-stop placement digest** (below). A release either matches or declares:

* a **shift record** for every stage whose isolated digest moved — the stage, the cause (a rule-table change, a fix, a
  new concern), the seeds and statistics that moved, the expected direction, and the output version the release creates;
* a **cascade record** for every end-to-end golden it re-signs, listing each downstream stage that moved and showing,
  from the isolated goldens, that each moved only through its inputs; a downstream stage whose isolated digest also
  moved needs its own shift record, so an unrelated regression cannot ride on an upstream shift.

An undeclared move fails CI; a declared statistic that moves against its declared direction fails CI until the record
states why; only declared stages are re-signed; stages untouched by a release stay byte-identical (O2 e). A same-seed
output change is never let ride silently (owner non-negotiable 10).

**The records are product files (NF-S1).** Everything the golden gate and the release-notes generator read lives inside
`plat/`, so §17.1 (3)'s path rule and the gate never collide:

```ts
// @plat/testkit — the golden store and its records; JSON with a schema, committed in plat/goldens/
type WaterSetting = 'none'|'coast'|'river'|'coast+river';   // the one spelling of a water setting: B-CITY, the golden store, every record (VS2-5)
// a seed in a record is a Seed (u32, §2.9) written as its decimal string, e.g. "1221236157"; permalinks write it in base 36 (§6.4)
interface ShiftRecord {
  id: string; release: string /* generator version */; outputVersion: string | null /* the o<k> it creates; null for a view shift (S13b, render.stampTiles) */;
  stage: StageId | 'S13b' | 'render.stampTiles' /* view shifts: placement digests (S13b) and stamp-tile hashes (§8.10) */;
  cause: { kind: 'table'|'fix'|'concern'|'engine'|'feature'|'calibration'|'baselineShift'; ref: string /* table id@version, issue, concern id, CalibrationRun id, baseline id */; note: string };
  seeds: { seed: string; rung: Rung; water: WaterSetting; before: Hash128; after: Hash128 /* isolated stage digest, or the placement digest for S13b */ }[];
  statistics: { metric: string /* core-record field or §13.5 metric id */; rung: Rung; before: number; after: number; expected: 'up'|'down'|'none'|'any' }[];
  tiles?: { tile: string /* class, spacing, tile index (§8.10) */; before: Hash128; after: Hash128 }[] /* render.stampTiles shifts only; their seeds list is empty, the library being seed-independent */;
  d5SeedsChanged: string[] /* seeds of any D-5 panel (§13.6) whose render moved */; milestone: string; date: string; author: string }
interface CascadeRecord {
  id: string; outputVersion: string; upstream: string[] /* ShiftRecord ids that explain it */;
  downstream: { stage: StageId; before: Hash128; after: Hash128 /* end-to-end digests */; isolatedUnchanged: true /* otherwise the stage needs its own ShiftRecord */ }[];
  seeds: string[]; date: string }
interface MilestoneRecord {
  milestone: string; date: string; outputVersions: string[] /* created during the milestone */; shifts: string[]; cascades: string[];
  parity: string /* plat/goldens/parity/<milestone>.json — the ParityReport the exit is judged on, §13.5 (VS2-5) */;
  d5: { status: D5Status; record: string /* plat/goldens/d5/<milestone>/record.json, §13.6 */ } | null;
  knownDefects: { opened: string[]; closed: string[] }; exitCriteria: { id: string; result: 'pass'|'fail'|'fallback-applied'; evidence: string }[] }
```

* `plat/goldens/store/o<k>/` holds, per seed and stage, the frozen upstream outputs and the digests, counts, statistics
  and placement digests; PNGs are stored content-addressed in `plat/goldens/png/` (large-file storage) and referenced by
  hash.
* `plat/goldens/shifts/o<k>.json` holds the shift and cascade records that created output version o<k>;
  `plat/goldens/shifts/view/<release>.json` holds a release's view shifts (S13b and `render.stampTiles`).
* `plat/goldens/milestones/<milestone>.json` is each milestone's exit record.
* The golden CLI refuses a record with a missing field; the release-notes generator of `@plat/docs` reads only these
  files and `plat/docs/known-defects.json`.
* `docs/validation/shifts/<milestone>.md` and `docs/validation/d5/<milestone>.md` are **research-side copies** generated
  from these files by `research/baselines/mirror_records.py` (research may read the product; the product never reads
  research); no CI job reads them, and a hand edit there changes nothing.

**Placement digests (N-24; §9.1's cross-engine promise).** For every golden town, every shipped preset's label style and
each of B-ZOOM's 27 zoom stops, S13b places the band's area and way labels for all candidates and the addresses and
repeated street names of the default view's visible tiles (§9.2's scope); the placement digest hashes, per candidate in
id order, the label id, the chosen alternate (or *yielded*), the ladder rung, the size and every glyph's position and
angle as exact IEEE doubles — placement uses only + − × ÷, `Math.sqrt` and `dmath` on the fonts' integer metrics and
the stop's scale, and `@plat/labels` is held to §6.5's allowlist lint like a model package. So are the inputs S13b
reads from the renderer (VS2-4): every implementation of `ObstacleSource` and `RoleIndex`, every function they call and
the S14 code that writes the display-list columns they read — `bbox`, the geometry ranges and `GeomTable`, `layer` and
`z`, and the symbol extents computed from the style sheet's sizes (§6.5 (3), §14). Equal code on equal inputs then
gives equal bits on every engine; the rest of `@plat/render` (paint programs, backends, compositing) stays outside the
lint, because its output is pixels, compared by visual regression (§13.4), not by bit identity. The PR tier
compares the digests on Node x86 against the store; the nightly tier compares them on all five engines with workers on
and off. A digest that moves while every model digest holds is a
**view shift**: it needs a `ShiftRecord` with stage `S13b` and `outputVersion: null`, bumps no output version
(placement is view data, §9.1) and bumps the style version of every shipped sheet whose placements moved, because the
style version is the axis that carries pixel identity (§6.4). A digest that differs between engines is a determinism
defect and fails the nightly run. The stamp-tile hashes of §8.3 are stored with the placement digests; a stored hash
that moves while every model digest holds is a view shift of the same kind — a `ShiftRecord` with stage
`render.stampTiles` and `outputVersion: null`, bumping the style version of every shipped sheet that draws stamped
classes (NR-6).

**From M1 (LC-19).** The output-version stamp, the shift, cascade and milestone records and the stage-isolated golden
tooling are built at M1, not at hardening (§16). Every milestone from M1 on writes its `MilestoneRecord` — each output
version created, its shift records, the D-5 panel seeds that changed — and a milestone cannot exit with an undeclared
shift. **Preview links:** until M4's exit fixes output version 1, every permalink and document made by the app is marked
*preview* — the app shows "preview: made with output version oN; a later release may draw this seed differently and
will say so" — and the link carries its `o=` (§6.4). Retention of output versions N−1 and N−2 (§6.4) is built and its
replay test passes at M3a; from then on a link inside the window replays exactly and one outside it opens with §6.4's
notice.

A nightly cross-platform golden run (Node x86 / arm64, Chromium, Firefox, WebKit; workers on and off; pool sizes 0 and
3) is the reproducibility proof: identical model digests per stage, identical derived-complete digests and identical
placement digests on every engine.

=== REPLACE §13.6 The owner's side-by-side protocol (D-5) ===

### 13.6 The owner's side-by-side protocol (D-5)

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-scope-r3

"Mastered" means the owner's eye on side-by-sides against MFCG and FTG at town, city and metropolis, plus the measured
parity numbers (D-5). This protocol makes the eye a recorded, repeatable judgement that cannot be steered by choosing
flattering seeds, and it never lets a milestone claim the eye's verdict without the eye.

1. **When.** At M1 (diagnostic: the base is not yet complete, so the result is recorded and does not gate; the panel
   covers all three rungs, because METROPOLIS generates from M1, §16), at M2b (gates
   "the base at parity"), at M4 (gates "mastered") and at M5 against NG (gates stage 2, and replaces S2's blind preference
   test with n ≥ 20 raters, which the program has no pool for; IMP-11).
2. **Seeds fixed before rendering.** Five seeds per rung and per water setting (`none`; `coast+river`), each
   `H32("d5/⟨milestone⟩/⟨rung⟩/⟨water⟩/⟨i⟩")` — ⟨milestone⟩ the id its `MilestoneRecord` carries (`M1`, `M2b`, `M4`,
   `M5`), ⟨rung⟩ the `Rung` (`TOWN`, `CITY`, `METROPOLIS`), ⟨water⟩ the `WaterSetting` (§13.3), ⟨i⟩ = 0 … 4 in
   decimal. **`H32(s)`** is defined exactly (VS2-6): the first 32-bit output word (h1) of MurmurHash3's x86 128-bit
   variant — the published public-domain algorithm §6.2's H128 already implements — run over the UTF-8 bytes of `s` with
   seed 0. Its implementation passes the algorithm's published verification value (SMHasher's procedure gives
   0xB3ECE62A), and the text fixes two check vectors: `H32("d5/M1/TOWN/none/0")` = 1221236157 and
   `H32("d5/M1/TOWN/coast+river/4")` = 3998735106 (`docs/validation/bench/fixall_scope_r3_h32.out`). The result is a
   u32, so it is a `Seed` (§2.9), written in records as its decimal string; every list is reproducible from its formula.
   The product CLI (`plat d5 seeds ⟨milestone⟩`) writes the list to `plat/goldens/d5/⟨milestone⟩/seeds.json`, which is
   committed before any render; no seed is replaced after it is rendered. MFCG seeds come from the same formula with the
   prefix `d5-mfcg/`, reduced as 1 + (H32 mod 2 147 483 646) into 1 … 2³¹ − 2, the state range of MFCG's Park–Miller
   stream (`research/findings/profile-mfcg.md`), by the research-side panel script, which applies exactly this formula
   (check vector: `d5-mfcg/M1/TOWN/none/0` → 1965791931). FTG cannot be seeded — its
   server draws its own seed — so its side of each pair is taken from the captures in capture order, and the milestone's
   list of capture ids is committed with the seeds, before any PLAT render.
3. **Matched pairs.** Each pair shows PLAT and one reference at the same rung, the same ground scale (metres per pixel)
   and the same frame. Against MFCG, PLAT's population is set so that its building count matches MFCG's at the matched size
   (sizes 40 / 80 / 130; §12.2's rate); against FTG, PLAT is generated at FTG's population (BIG_TOWN ≈ 5 600, BIG_CITY
   24 500; METROPOLIS per D-31). PLAT draws `ink` against MFCG's default style and, from M2b, `lit` against FTG's default
   (`ink` at M1). Against FTG, one pair per seed shows the extramural suburb at FTG's overview framing (VIS-3).
4. **Blind order.** Generator-identifying furniture is removed from both sides (titles, legends, compasses, interface
   chrome) and the blind pairs are rendered without labels; labels are judged in a separate, non-blind pass. Left or right
   is a seeded coin per pair and the pair order is shuffled; the key is sealed — only its hash is committed — and opened
   after the answers.
5. **The rubric** — three questions per pair, each answered *left*, *right* or *same*, with an optional one-line note:
   (1) *Legibility:* which lets you read the town — its streets, walls and quarters — more easily at this size?
   (2) *Realism:* which looks more like a real medieval town? (3) *Charm:* which would you rather use for a game or a
   story?
6. **Pass rule.** For each reference and each question, PLAT is judged better or the same on at least two thirds of the
   milestone's pairs, and on no rung is PLAT judged worse on every pair. A gating milestone whose rated run fails a
   question does not exit until a re-run passes or the owner accepts the failure in the record; the failing question
   and the owner's notes enter `known-defects.json`.
7. **The rater, and one rule for an unrated panel (NF-S2).** The owner is the declared rater; no seat rates on the
   owner's behalf. If the owner has not rated within seven days of the panel being ready, the build continues on the
   milestone's measured numbers and the milestone's D-5 status is recorded **provisional — not rated** in its `D5Record`
   and its `MilestoneRecord` (§13.3). A provisional status never claims what the panel gates: M2b's "the base at parity",
   M4's "mastered" and M5's stage-2 gate are claimed only by a rated pass or by an owner acceptance recorded in the
   `D5Record`. The same panel — the same seeds, re-rendered under the current output version — is offered again at every
   later milestone and, after M5, with every release, until it is rated; a later rated pass turns the status into
   *passed* with its date, and a later rated failure follows (6). The release notes state every provisional status
   (§14 `@plat/docs`). §16 states the same rule at each gating exit.
8. **The threshold panel and the `house` pick.** At the same sitting the owner sees the strips of §13.7 (renders of one
   seed at a threshold's number and one step either side) and picks one or answers *same*; the pick becomes the threshold
   with provenance "owner-eye ⟨milestone⟩". From M4 on, the sitting also shows the three candidate `house` sheets drafted
   at M3b (D-1) on the milestone's seeds. **Pre-decided outcome if no `house` pick is recorded by M4's exit:** candidate 1
   — the first sheet in the M3b draft order — ships as `house`, selectable and never the default; `ink` stays the
   default; the pick is offered again at every later sitting, and a later pick replaces `house`'s sheet as a
   style-version change (pixels only; no model digest moves).
9. **Record and clean room (NF-S1).** The panel is assembled research-side (`research/d5/`) from PNG exports that the
   product's CLI writes and from the reference images in `captures/`; the product repository never reads the captures
   (§17). The machine-readable record lives in the product, committed by the seat that ran the sitting, like
   `baselines.json` (§17.1 (4)) — numbers, hashes and answers only, no reference image or reference data:

   ```ts
   type D5Status = 'diagnostic' /* M1 */ | 'passed' | 'failed' | 'accepted' /* a failure or an unrated panel accepted by the owner in writing */ | 'provisional-not-rated';
   interface D5Record {                    // plat/goldens/d5/<milestone>/record.json
     milestone: string; status: D5Status; date: string; offeredAgainAt: string[] /* later milestones and releases */;
     seeds: { rung: Rung; water: Extract<WaterSetting, 'none'|'coast+river'>; i: number; seed: string /* a Seed as its decimal string */ }[]; ftgCaptures: string[];
     platImages: Hash128[] /* PNG hashes of PLAT's side */; key: { commitment: Hash128; revealed?: string };
     answers: { pair: number; question: 'legibility'|'realism'|'charm'; answer: 'left'|'right'|'same'; note?: string }[];
     verdicts: { reference: 'MFCG'|'FTG'|'NG'; question: 'legibility'|'realism'|'charm'; betterOrSame: number; pairs: number; worseOnEveryPairAtARung: boolean; pass: boolean }[];
     thresholdPicks: { letter: string; picked: number | 'same' }[]; houseSheet?: string; acceptance?: { by: 'owner'; text: string; date: string } }
   ```

   The research-side `docs/validation/d5/⟨milestone⟩.md` — the human-readable record with the reference images' hashes —
   is generated from this file (§13.3); no CI job reads it.

=== REPLACE §13.8 CI tiers and compute budgets (SCL-18; D-34) ===

### 13.8 CI tiers and compute budgets (SCL-18; D-34)

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-scope-r3

The full verification rig costs ≈ 10–20 CPU-hours (12 000 B-CITY generations ≈ 1.6 CPU-h before the suite; 10⁵ oracle
regenerations ≈ 8 CPU-h; 10⁶ fuzz inputs × ≈ 20 primitives ≈ 0.3–5.5 CPU-h), so it cannot gate a single change. It runs
in three tiers, each with a wall-clock budget on a stated runner (a 16-core x86-64 Linux machine; timings normalised by
§12.1's calibration score):

| tier | runs | budget | contents |
|---|---|---|---|
| **PR** | every change | ≤ 15 min on 8 cores | lint (the determinism allowlist, units, dependency direction, the repository path rule), type check, unit and contract tests; B-FUZZ with 10⁴ random inputs per primitive plus the whole constructive-degeneracy set; B-CITY-lite 50 seeds per rung × 4 water settings; B-EDIT 10³ sequences with the oracle once per sequence; stage-isolated goldens and the per-stop placement digests on Node x86 (§13.3); every shipped style sheet through §8.2's slot resolution at every band (0 unresolved, 0 ambiguous pairs) and the render keys across two B-CITY-lite seeds per rung (§8.3); the licence, notices and deny-list scans; the app's scripted and accessibility tasks on Chromium |
| **nightly** | every night | ≤ 4 h on 16 cores | B-CITY 1 000 seeds × 4 water settings × 3 rungs with the invariant suite and §12.3's model max clause on every generation; B-FUZZ 10⁶ per primitive; B-EDIT 10⁴ sequences; **the O9 (c) faithfulness campaign** (n = 800 scopes — 400 block, 400 district — × K = 50 references, ≈ 12.5 CPU-min, §13.2; VS2-9); the five-engine golden run with one PNG per LOD and preset, the placement digests and the stamp-tile hashes in both workers (§8.3); visual regression and B-ZOOM; cost-model sweeps (nine sizes — every band's bottom, target and top — × five seeds, with the F-WORK flatness check) and the first-map runs at the same three sizes per rung (§12.5); the model budgets re-measured inside Chrome's worker on the same seeds (the Chrome figure governs a gap above ± 15 %, §12.1); control sweeps at TOWN and CITY; the option matrix; the B-REF parity report |
| **milestone** | every milestone exit, and weekly | ≤ 12 h on 16 cores | B-EDIT 10⁵ sequences; METROPOLIS control sweeps; the 20-epoch test; the parity report at five seeds per matched size; the D-5 renders, including every earlier panel still *provisional — not rated* (§13.6 (7)); memory and document-size tests at every rung |

A tier whose normalised wall-clock exceeds its budget by more than 10 % fails with *over budget*; the answer is to split
the job or make it faster, never to raise the cap — a budget changes only by a recorded decision. **Measurement (M0):**
the harness times each tier on the runner. **Pre-decided fallback:** if the PR tier exceeds 15 min, B-CITY-lite drops to
25 seeds per rung and the random fuzz to 5 × 10³ inputs per primitive (the constructive set is never cut), and the
nightly tier absorbs the difference.

=== REPLACE §14 Package and module layout, key interfaces, dependency rules, extension points ===

## §14 Package and module layout, key interfaces, dependency rules, extension points

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-scope-r3

*In plain words.* The code is split into small packages with one-way dependencies: the geometry kernel knows nothing
about towns; the town model knows nothing about drawing; the drawing code knows nothing about how the town was made;
the app sits on top of a headless library. New looks, new layout templates, new export formats, new building
generators and new rule tables plug into named registries without touching the pipeline. All of it lives in one
repository, `plat/`, that never reads the research material (§17).

```
@plat/kernel   lattice, predicates, one arena per layer with the five levels as views (§2.2), role and owner tables, resolution of stored
               references, batched transactions, kernel invariants, arrangement booleans / buffers / bands (§3.7), the straight skeleton and
               its validator (§3.8), obb / hull / lir, delaunay (delaunator), poisson (stamped ranked tiles, built from a constant stream key, §8.10), curves, index (flatbush / rbush /
               grid), noise, dmath (our fdlibm 5.3 port), rng (xoshiro + 128-bit keys; `rng.stream`, the one structured stream mixer of
               §6.1), concern registry
@plat/model    schema (zod), addresses and lineage (§6.3), layers, entity registry (CI path-coverage test), lifecycle, provenance, document,
               serialisation (.plat, CBOR twin), migrations, the Merkle model digest, the core statistics record, the control registry; the
               label records `LabelEntity` and `QuarterNode` (§9.1) and the shared view vocabulary `LodBand`, `Role`, `ZoomStop`
@plat/tables   rule tables, presets, style sheets, rung profiles (`ladder.json`, §1.1), the work-limit coefficients (`workLimits.json`,
               §5.1 (5)), setting packs (§10.4) and the default keymap as versioned JSON with provenance; loaders; the override layer
@plat/site     S1 terrain, hydrology, coast / lake / island outline routine, rivers by descent, islands, bank classes, water faces
@plat/content  S2 sequential roster, demand, government and religion rows, S7b / S10a allocation, S10b placement, households and people
               derivation, the relation-store schema, the economy and personality schema stubs (D-32), naming engine + grammar
@plat/layout   S3 siting, reservations and gate sites, S4 backbone, S5 growth and regimes, S6 grower / typing / fields / the quarter merge tree, S7
               fortification and water furniture, S7b claims, S8 infill (BentCutFabric), S9 corridors, S12a hinterland siting, the hinterland
               unit, S12b greenery; the StrategyRegistry and the ordering of registered StageDecls
@plat/plots    S10 granularity law, per-frontage regions, joins / splits / alleys, boundary treatments; S11 site plans, packer, heights,
               footprint templates; the BuildingGenerator interface (`outline` / `compose`) + OutlineBuildingGenerator; assignment +
               placement solver
@plat/hood     stage 2: RingFabric / SquareFabric / StreetFabric, the neighbourhood LOD workflow   [built after the base; the interface lives in @plat/layout]
@plat/labels   S13a names (every node of the quarter tree), candidates and spines; S13b view placement over the parameters the renderer
               passes in (`ObstacleSource`, `RoleIndex`, below) — it never imports render; the font-metrics reader; collision; furniture
               incl. the ruler and the emblem generator
@plat/render   S14 columnar display-list builder, paint programs, style sheets, LOD, the tile pyramid and the tile worker (which runs S13b
               by calling `@plat/labels`), backends (Canvas2D, SVG, print tiles; the WebGL2 tile compositor as a fallback), shadow pass,
               decoration stamps, live layers
@plat/edit     edit events, dry-run validation, undo and redo records, scoped regeneration, rebase, the dependency audit, event
               migrations, warp kernels
@plat/export   geojson, svg, png / tiles (streaming), vtt (Foundry-class scene JSON, dd2vtt), gltf / obj, cityjson, csv, permalinks
@plat/sim      optional, M4b: the relation store materialised, postings, occupancy and schedules, calendar, factions, events, economy,
               personality and the stat-block pack (D-32) — over @plat/content ids
@plat/api      the handle-based facade (§11.2), the generation worker host, the derivation pool, the host bridge (§11.3) and DocResolver
               (§11.5), the headless CLI
@plat/app      the reference UI (below)
@plat/docs     the user guide: generated reference pages from the control, entity and table registries plus written pages;
               `known-defects.json`; release notes generated from `plat/goldens/shifts/` and the milestone records (§13.3), the D-5
               statuses (§13.6) and the known defects
@plat/testkit  B-FUZZ generators (random and constructive), invariant runners, cost-model tests, the bench statistics and the `parity` CLI
               (reads `baselines/baselines.json` only), golden tooling with shift, cascade and milestone records and placement digests over
               `plat/goldens/` (§13.3) and the one `WaterSetting` type every record uses, the O9 (c) faithfulness campaign (§13.2), the boolean
               and buffer oracles (Clipper2-WASM in Node, polygon-clipping), the clean-room scanner (§17), the D-5 seed list by `H32` and
               the export command (`plat d5 seeds`, PNGs for §13.6)
```

**Stage registrations whose declared I/O the round-2 and round-3 pipeline changed** (§4.1–§4.12 hold the definitions): S3 declares as
outputs the gate routes, the travel-cost field `T`, the stage-1 trace and gates, the carved water with its decks and the
decoration ponds, the harbour route (solved after its L0 batch) and, for a sealed town with `N = 0`, the harbour gate
(§4.2 S3 (11)); S6 the settlement perimeter and the `Seam` records (II.1), whose `SeamEdge.type` includes `reserve`
with its `reservation` id; S7b passes `claimSubFace` a face list (`within: FaceRef | FaceId[]`, §3.4); the castle
template row carries `townSide: 'dry_ditch' | 'none'` (§4.8); S12a no geometry (sites only); the hinterland unit
registers as a unit of S10 / S10b / S11 / S12b over the hinterland's blocks (§4.9); `SkyStrategy.place` takes S7b's sky
allocations (II.6); `BuildingInput.fixedWings`, `BaseWing.kind` and `BaseWing.corners` are §2.6's;
`SettingPack.rosterPatch` is §10.4's.

**Dependency rules (enforced by lint):** `kernel ← model ← tables ← {site, content} ← layout ← plots ← labels ← render
← edit ← export ← api ← app`; **labels ← render** (N-22): the tile worker in `render` runs S13b from `labels`, and the
drawn symbol extents and the display-list index that S13b reads reach it only as the parameters `ObstacleSource` and
`RoleIndex` — interfaces `labels` declares and `render` implements — so `labels` never imports `render`, and the types
both use (`LodBand`, `Role`, `ZoomStop`, `LabelEntity`) come from `model`; `docs` reads the registries of `model` and `tables` only; `hood` depends on `layout` /
`plots` only through their interfaces; `sim` depends on `content` and `model` only; `render` never imports `layout`;
nothing depends on `app`; no package imports a backend it does not need; every adopted runtime library is imported in
exactly one adapter file of the one package that uses it; model packages obey §6.5's allowlist lint, which also scans
the vendored dependency sources; **so do `@plat/labels` and the renderer code that feeds S13b (VS2-4)** — every
implementation of `ObstacleSource` and `RoleIndex`, the functions they call, and the S14 builder code that writes the
display-list columns they read (`bbox`, the geometry ranges and `GeomTable`, `layer`, `z`, the symbol extents from the
style sheet's sizes). CI finds that code as the import closure of those implementations and of the column writers, from
the TypeScript program, so a module that joins it is linted without being listed; the rest of `@plat/render` stays
outside the lint (§6.5 (3), §13.3). No import, fixture or script path may resolve outside `plat/` (§17).

```ts
// @plat/layout — stages and strategies (StageDecl, NetworkStrategy and EnceinteStrategy are §4.12's)
interface Stage<I, O> extends StageDecl {
  version: string; lineageUnit: EntityKind /* whose lineage keys its draws, §6.3 */;
  workLimits: WorkLimits /* laws over the batch scope's population-derived counts, §5.1 (5); coefficients in workLimits.json */; budgetMs: Record<Rung, number> /* reporting only */;
  txForm: 'declared'|'callback' /* §3.3: declared op sets in canonical order, or callback sequences in issue order */;
  inputsOf(model: Model, scope: Scope): I; run(input: I, ctx: StageContext): KernelResult<O> }
type ConcernId = number & { readonly __brand: 'ConcernId' };   // u16 from the concern registry (§6.1), generated as typed constants — never a string
interface StreamOpts { reroll: number /* the derivation unit's reroll (§6.1) */; attempt: number /* ladder retry, ≤ the concern's registered cap: 3 for geometric ladders, 8 for naming (§6.1, §9.6) */;
  epoch: number; salt: number /* the concern's current salt from the recipe and the log's rerollLayer events; 0 for geometry concerns */ }
interface StageContext { doc: Document; plats: Record<string /* PlatKey */, Plat>;
  stream(concern: ConcernId, entity: Handle /* its entity key is cached in the arena beside its lineage hash (§6.1); TOWN_ROOT for town-level draws */, opts: StreamOpts): Stream;
  streamOpts(concern: ConcernId, entity: Handle, attempt?: number): StreamOpts /* the defaults: reroll from the entity's derivation unit, epoch from this context, salt from the document */;
  tables: TableView; rung: RungProfile /* §1.1 */; report: ReportSink; scope?: Scope; epoch: number }
// TOWN_ROOT: the handle of the town itself as a derivation unit; its entity key is the seed key mixed with the fixed town lineage (ground arena, no parent,
// creation epoch 0, index 0), so town-level draws — S0's features, terrain noise, the compass and emblem furniture (§9.5) — depend on the recipe alone, never on docId (NF-D12)
type Scope = { kind: 'all' } | { kind: 'entities'; ids: Id[] } | { kind: 'region'; ring: Polygon; key: PlatKey; level: Level } | { kind: 'epoch'; epoch: number };   // no raw face ids at the API
interface StrategyRegistry { terrain: Map<string, TerrainStrategy>; coast: Map<string, CoastStrategy>; river: Map<string, RiverStrategy>; manifest: Map<string, ManifestStrategy>;
  network: Map<string, NetworkStrategy>; enceinte: Map<string, EnceinteStrategy>; fabric: Map<string, FabricStrategy>; plots: Map<string, PlotStrategy>;
  sitePlan: Map<string, SitePlanStrategy>; building: Map<string, BuildingGenerator>; evolution: Map<string, EvolutionStrategy>; sky: Map<string, SkyStrategy>; sewer: Map<string, SewerStrategy> }
interface FabricStrategy  { partition(district: District, seam: SeamContract, ctx: DistrictContext, sc: StageContext, k: Kernel): KernelResult<{ blocks: Block[]; ways: Way[] }> }
interface PlotStrategy    { subdivide(block: Block, ctx: BlockContext, claims: Claim[], sc: StageContext, k: Kernel): KernelResult<{ plots: Plot[]; alleys: Way[]; residue: Residue[] }> }
interface SitePlanStrategy{ plan(plot: Plot, ctx: ContextVector, tables: TableView, rng: Stream, k: Kernel): KernelResult<SitePlan> }
interface GranularityLaw  { bands(ctx: ContextVector, rung: RungProfile): { frontageM: [number, number]; depthM: [number, number]; areaM2: [number, number]; joinMax: number; vacancyRunShare: number } }   // the deep-interior choice is S8's (§4.6)
// @plat/kernel — the façade the stages see, and the one stream mixer every reader uses
interface Kernel { plat(key: PlatKey): Plat; view(key: PlatKey, level: Level): LevelView; resolve(ref: GeomRef, key: PlatKey): Resolved; geom: GeomOps; index: SpatialIndex;
  tx<T>(tx: KernelTx, fn?: (overlay: Overlay) => KernelResult<T>): KernelResult<T>   // exactly one form: tx.ops (declared) or fn (callback), §3.3
}   // KernelTx (§3.3) carries `stage` and `rederivesFrom`; the services resolveVertexAt, signature and sampleProfile are §3.4's
interface Rng { stream(entityKey: Hash128, stage: number /* u16 stage id; STAGE_VIEW = 0xffff for paint programs and furniture */, concern: ConcernId, opts: StreamOpts): Stream }
// StageContext.stream is rng.stream with the calling stage's id and the entity's cached key; paint programs and furniture call rng.stream with STAGE_VIEW.
// No string reaches the mixer; the textual form of a key (§6.1) is rendered for reports only, and a lint rejects a stream call whose concern is not a ConcernId.
// @plat/content — a host's own roster or people; registered only after §11.4's double-run check, its outputs recorded in the document
interface ContentProvider { id: string; version: string; roster(pop: number, character: CharacterVector, tables: TableView, rng: Stream): Roster;
  site(roster: Roster, plots: Plot[], ctx: SitingContext, rng: Stream): SitingResult; people(household: Id, rng: Stream): Person[] }
// @plat/plots — the stage-3 hook: BuildingGenerator { outline(…); compose(…, lod) } is §2.6's
// @plat/labels — S13b's inputs from the renderer, declared here and implemented by @plat/render (labels never imports render)
interface ObstacleSource { protectedExtents(stop: ZoomStop, box: Box): { box: Box; entity: Handle; kind: 'gate'|'castle'|'plaza'|'bridge'|'wall' }[] /* drawn symbol extents at the stop, §9.2 */;
  coverage(stop: ZoomStop, box: Box): { labels: number; protected: number; buildings: number; ways: number; water: number } /* mark cover, for furniture placement, §9.5 */ }
interface RoleIndex { roleAt(p: Point, band: LodBand): Role /* the area mark under a point: halos, §9.4 */; snap(p: Point, radiusPx: number, stop: ZoomStop): Point | null /* the measure tool, §9.5 */ }
// both are implemented by @plat/render over a display list: in the tile worker for S13b, furniture placement and the ruler (the main thread reaches coverage and snap
// through §8.9's queries), and in the generation worker over an SVG export's transient list (§11.1); every implementation is under §6.5's allowlist lint (VS2-4)
interface LabelPlacer { place(stop: ZoomStop, labels: LabelEntity[], obstacles: ObstacleSource, roles: RoleIndex, fonts: FontMetrics, memo: PlacementMemo): PlacementSet /* §9.2; view data */ }
// @plat/model — LabelEntity, QuarterNode: §9.1 (model records written by S13a); LodBand, Role, ZoomStop: the shared view vocabulary (§8.1, §8.2, §8.8)
// @plat/render — DisplayList, MarkTable, DisplayDelta, DisplayListBuilder: §8.1; StyleSheet, Symbolisation, OrderSlot, LiveLayerProvider: §8.2; LayerSpec: §8.4;
//                backends and threads: §8.9
interface TileBackend   { raster(tile: TileAddress, list: DisplayList, style: StyleSheet, opts: { layers: Layer[]; tileLayer: 'base'|'under'|'shadow'|'over';
  shadows: 'off'|'drop'|'prism' /* §8.2's StyleSheet.shadows.projected */; sun?: { azimuthCdeg: number; altitudeCdeg: number }; tier: 'low'|'mid'|'high'; dpr: number }): ImageBitmap }
interface VectorBackend { write(list: DisplayList, style: StyleSheet, opts: { layers: Layer[]; band: LodBand; frame: Box }): string }
// @plat/edit
interface EditEngine { apply(doc: Document, e: EditEvent): ApplyResult /* Ok | Conflict(actions) | Confirm(token, fates) — an event carrying fates commits only when a fresh dry run computes the same fates (§11.2) */;
  undo(doc: Document, session: string, of?: number): ApplyResult /* appends an undo event for the session, §7.4; `of` only for the owner role */;
  redo(doc: Document, session: string): ApplyResult /* appends a redo event */;
  replay(base: Base, log: EditEvent[], opts?: { toSeq?: number; mode: 'interactive'|'replay' }): Model; migrate(doc: Document, to: string): { doc: Document; diff: Diff }; rebase(doc: Document, reason: RebaseReason): Document }
// @plat/api — PlatApi and DocHandle: §11.2; BridgeTransport and BridgeMessage: §11.3; DocResolver: §11.5
// @plat/export
interface Exporter<Opts> { id: string; write(doc: Document, list: DisplayList | null, opts: Opts): Promise<Uint8Array | string> }
  /* runs in the generation worker (§11.1): list = the transient export list for SVG; null for model formats (GeoJSON, glTF / OBJ, CityJSON, CSV, the document
     forms) and for raster formats, which send a raster-export request to the tile worker (§8.9) */
// @plat/testkit — Baseline, ParityReport: §13.5; ShiftRecord, CascadeRecord, MilestoneRecord, WaterSetting: §13.3; D5Record, H32: §13.6; CorpusAdapter, CalibrationRun: §13.9
```

**`@plat/app`, the reference UI.** One click; the basic panel (≤ 12 controls, §7.8) and the advanced panel; the report
panel; the editing tools (draw, move, warp, brushes, the four actions, lock, assign); the tables editor and the style
dialog; the ruler (§9.5); the gazetteer and the "features in view" list; context help; the family-tree view (module).

* **Input scheme (COV-MFCG-L08)** — MFCG's idiom kept and stated, held in `keymap.json` (data, editable, versioned like
  every table). Pointer: *click* selects and opens the context panel; *double-click* zooms to the entity's band (a
  district fills the view — MFCG's district view); *shift+click* is New random on the entity's scope, keeping its kind
  (MFCG's ward reroll); *ctrl / cmd+click* resets the entity to generated (one logged event that applies the inverses of
  the entity's own edits); *alt+click* toggles its lock; right-click or long-press opens the context actions (§7.4);
  dragging a selected vertex is `moveVertex`; wheel or pinch zooms; dragging empty map pans. Keys while the map has focus:
  **A** alleys at the city band, **B** buildings shown / hidden, **D** grid, **N** hairline mode, **L** labels, **T**
  trees, **M** ruler, **W** warp tool (then **1–8** choose the kernel), **G** gazetteer, **F** features in view, **R** New
  random on the selection, **Esc** cancel, **ctrl / cmd+Z** undo, **ctrl / cmd+shift+Z** redo, **+ / −** zoom, **0** fit,
  **?** the keymap overlay. Bindings are active only while the map region has focus; an embedding host can switch global
  bindings off; every bound action is also on a menu or a button.
* **Accessibility (COV-FTG-A24)** — the app's chrome (panels, dialogs, menus, toolbars, the report, the gazetteer, the
  tables editor) meets WCAG 2.2 level AA. Landmarks: header (title and seed), navigation (panels), main (the map region,
  `role="application"` with an accessible name and a live description of the view — rung, band, the district under the
  pointer or the focused entity), complementary (report, gazetteer). Every control's accessible name and description come
  from the control registry (its label and documentation anchor); every icon button has a text label. Every action is
  reachable by keyboard in a focus order that follows the layout, with visible focus and no keyboard trap; the map region
  takes arrow-key panning and **+ / −** zoom. **The non-visual route to the map** is the gazetteer (list and search over
  districts, quarters, streets, buildings, institutions and pinned people through `query`) and the "features in view" list
  (the entities whose marks are visible, grouped by kind, ordered by distance from the view centre, each announcing its
  name, kind and district); selecting in either list selects on the map and the reverse. UI text contrast ≥ 4.5 : 1 and
  UI components ≥ 3 : 1 (the map follows §8.2's contrast matrix); the reduced-motion preference turns off animated zoom;
  the UI scales 100–200 % without loss. Tests: §13.4.
* **Context help and the guide (COV-FTG-A25)** — every control and panel carries a help link to its anchor in
  `@plat/docs` (§7.8's documentation anchor), opened in a side panel. The guide's reference pages are generated from the
  control registry (label, range, unit, output metric, consuming stage, locality class), the entity registry and the table
  schemas (columns, units, provenance); written pages cover getting started, each panel, each edit action, each export and
  the tables editor. Release notes are generated per release from the shift records (§13.3) and `known-defects.json`
  (id, symptom, affected rungs and presets, workaround, since, fixed-in). Tests: §13.2.
* **Family-tree view (COV-FTG-C11; module tier, M4b)** — reads `query(h, { kind: 'relations', person, up: n, down: m })`
  over the relation store (§10.3): generations in rows by birth epoch, partners side by side and children below;
  branches beyond two generations elided into a count that expands on click; re-root on any person; opening a person
  never pins it (§10.3); keyboard-operable as a tree grid.

**Extension points:** every `Map` in `StrategyRegistry` (stage 2 registers the three template fabrics; a village product
registers a tracker `NetworkStrategy`, a palisade `EnceinteStrategy`, a density `StageDecl` and a "houses along ways"
`FabricStrategy`; the owner-staged layers register `SkyStrategy` and `SewerStrategy`; the evolution engine an
`EvolutionStrategy`); `BuildingGenerator` (stage 3); `StageDecl` registration by declared inputs and outputs; the
`PaintProgram`, `StyleSheet` and `LiveLayerProvider` registries; `Exporter`s; rule tables, presets, rung profiles,
setting packs and keymaps (data); `EditEvent` kinds with migrations; `LayerSpec`s; `ContentProvider` (host rosters, after
the double-run check); `BridgeTransport` and `DocResolver`; the `PlacementSolver`; `CorpusAdapter` (§13.9).

=== REPLACE §15.1 Parity matrix — every capability row of `docs/confidence/*.md` (rows per `judge-parity.md` §2), plus the audit rows the matrix lacked ===

### 15.1 Parity matrix — every capability row of `docs/confidence/*.md` (rows per `judge-parity.md` §2), plus the audit rows the matrix lacked

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-scope-r3

Tags: **BASE** (delivered by stage 1), **STAGE-2** (delivered by the neighbourhood stage through an interface the base
carries), **VILLAGE-LATER** (the separate product staged by the owner; checked as not precluded, hooks in PART III),
**module** (the optional `@plat/sim`, milestone M4b), **hook**. "Beyond" marks rows where the base deliberately exceeds
the reference's recorded weakness. Rows whose id starts `a:` were added by the fix-all pass from the coverage audits'
rows (COV-FTG-OBS1): the matrix is now no coarser than the findings.

**MFCG (40 rows) — all BASE**

| id | capability | where | tag |
|---|---|---|---|
| A1 | parameter surface / blueprint / URL | §4.2 S0, §6.4 permalinks, §7.7 intent (MFCG's flags kept as intent toggles and the features strip, §7.8) | BASE |
| A2 | RNG stream, seed chain, save/restore | §6.1 keyed sub-streams (beyond: no global stream) | BASE |
| A3 | pipeline structure and failure policy | §4.1, §5 (beyond: no whole-city restart; every requested feature counted by delivery tier) | BASE |
| B1 | patch mesh (spiral seeds → Delaunator → Voronoi/DCEL) | replaced by the plat and backbone faces (§2.2, §4.3); Delaunator kept for site sampling; the "denser, regular centre" look carried by the stage regimes | BASE |
| B2 | junction optimisation | §3.6 attraction + §4.3 junction merge (8 m), Y → T | BASE |
| B3 | coast / water field / `sea` | §4.2 S1 closed-outline coast at the request's bearing | BASE |
| B4 | `buildDomains` (land components) | §4.2 S1 flood fill of L0 | BASE |
| B5 | curtain wall, gates, towers, watergate | §4.2 S3 gate sites; §4.4 trace before the stage's growth; §4.8 gates at arterials with exact N by the measured gate law, water gates, towers by rule | BASE |
| B6 | citadel / castle (repair loop, placement, keep) | §4.2 S3 castle reservation by score with the inside / on-enceinte / outside option; §4.8 keep by `lir`, bailey, and the 0.75 compactness gate kept as a shape check, repaired in place first in MFCG's order (angle equalisation, then bloat within the area band), then re-sited, then a keep without a bailey — never a restart (F-CASTLE) | BASE |
| B7 | streets and roads (`Topology`, `aStar`, `tidyUpRoads`) | §4.3 routed arterials, destinations = gates / market / bridges / harbour | BASE |
| B8 | rivers / canals (regular, delta, bridges, mouth) | §4.2 S1 rivers by descent, distributaries (a delta), estuary as a width rule, islands; §4.8 bridges, canals as an intent flag | BASE |
| B9 | districts (seeded region growing, types, holes) | §4.5 grower over coarse faces, `check4holes`, feature-named kinds, quarters | BASE |
| B10 | ward → blocks (alleys by twisted bisection) | §4.6 bent-cut infill of each district polygon: the intramural secondary network and its lanes as spines | BASE |
| B11 | block → lots (twisted bisection, OBB, `indentFronts`) | §4.7 S10 per-frontage plots + front jitter (construction replaced by ruling O5; statistics matched, §13.5) | BASE |
| B12 | outskirts density falloff | §4.4 ribbon regime with the distance-to-gate kernel; §4.5 density field | BASE |
| B13 | shanty town / ribbon sprawl | §4.5 squalid type after the first half of the stages, outside the enceinte, with MFCG's trigger set; §4.4 ribbon regime; the suburb regime on the shanty toggle | BASE |
| B14 | plaza, temple, churches, gate plazas | §4.2 S3 plaza reservation sized per rung; §4.7 S9 `square` faces; §4.8 gate plazas and church forecourts (G-R1); institutions via claims | BASE |
| B15 | landmark / solid buildings, keep plan | §4.7 S11 institution site plans; §2.6 landmark footprint templates and OutlineBuildingGenerator; `lir` keep; solid-ink landmarks in `ink` | BASE (+ stage-3 hook) |
| B16 | greens / parks | §4.9 greenery rule table | BASE |
| B17 | farms and fields | §4.9 hinterland presets incl. the furrow style | BASE |
| B18 | harbour, docks, piers | §4.8 water furniture (basin, moles, quays, piers at 12–20 m) | BASE |
| B19 | trees and forests | §4.9 forests as faces; §8.10 stamped ranked tiles (Poisson k = 50, built once per session) | BASE |
| B20 | elevation field (`Apply elevation`) | §4.2 S1 real heightfield feeding S4 / S5 costs (beyond) | BASE |
| C1 | display modes (Lots / Complex / Block / Hidden) | §8.5 LOD bands + the plot model: the Lots look = footprint masses over the `ground` role at the city band; Hidden = a layer toggle; cadastral layer optional (beyond: no global switch) | BASE |
| C2 | roofs Plain / Hip / Gable, Raised, Solids | §3.8 straight skeleton with the plain-roof downgrade; §8.2 `roof` program; §2.6 roof spec + heights; Raised = `ink`'s offset under-copy, on by default (the projected shadow off, §8.4) | BASE |
| C3 | lot post-processing (`Offset`) | §4.7 S11 front-line jitter parameter | BASE |
| D1 | naming (Tracery + Markov, feature-conditioned) | §10.4 own engine and grammar | BASE |
| D2 | district labels (curved / straight / legend / hidden) | §9 hole-aware spines, quarter labels at city zoom, OBB-arc / straight / legend fallbacks (beyond: protected features) | BASE |
| D3 | map furniture (title, legend, scale bar, grid, compass, emblem, pins) | §9.5 (emblem slot with import and a minimal own generator; compass reroll) | BASE |
| E1 | colour system (schemes, roles, tints, weathering) | §8.2 roles, the contrast matrix, per-entity tints, thematic overrides | BASE |
| E2 | stroke discipline, layer order, caching | §8.2–§8.3 (casing idiom, round joins, order parity, world-aligned tiles) | BASE |
| E3 | alleys layer | §4.6 lanes / alleys are ways; §8.5 access-critical lanes drawn at the city band, the rest by LOD | BASE |
| E4 | district view, framing, no-zoom, thin lines | §8.8 continuous zoom on 2^¼ stops + the district band (beyond "no zoom"); framing §9.5; hairline mode (key **N**) | BASE |
| F1 | warp tools (8) | §3.4 `warp` + §7.1 `warp` event with dry-run and whole-step validation | BASE |
| F2 | rerolls, renames, landmarks | §7.1 the named actions, `setAttr`, `assign` (beyond: persisted, undoable) | BASE |
| F3 | UI / hotkeys / size bands | `@plat/app` input scheme in `keymap.json` (click edits, shift+click New random, ctrl / cmd+click reset, single-key toggles, §14); the measure tool (§9.5); the size ladder as data (§1.1) | BASE |
| G1 | export PNG / SVG / JSON | §11 (beyond: round-trip import, layered SVG) | BASE |
| G2 | integrations (FMG, Armoria, PS, Procgen Mansion) | §11 API, host bridge and static exports serve any host; the emblem is our own generator (§9.5); no third-party service is called (standalone) | BASE (hook) |
| H1 | population and scale model | §10.2 population as input; §2.1 metres (beyond the multiplier) | BASE |
| H2 | performance envelope | §12 (matched sizes 40 / 80 / 130; §12.9's declared trade) | BASE |

**FTG (46 rows + 9 audit rows) — BASE unless noted**

| id | capability | where | tag |
|---|---|---|---|
| A1 | parameter surface, presets, save/load | §4.2 S0, §7.6 presets as data, §2.9 document | BASE |
| A2 | two-phase pipeline, staging, failure policy | §4.1 (programme before layout, two-way), §5 | BASE |
| A3 | coordinate system, units, wire format | §2.1 integer cm centred; §2.9 binary blocks / CBOR twin | BASE |
| A4 | determinism, seeding, regeneration of old settlements | §6, §6.4 retention, §7.5 migrate (beyond: FTG has none) | BASE |
| A5 | server/client split, persistence, lazy person generation | §11.2 handle API and workers; §2.9 document; §10.3 lazy people | BASE |
| a:A24 | app accessibility; list and search views reaching buildings and people without the map | §14 `@plat/app` accessibility contract, the gazetteer and "features in view" lists; §13.4 tests | BASE |
| a:A25 | user guide, context-aware documentation links, release notes naming defects | §14 `@plat/docs` and context help; §7.8 anchors; §13.2 coverage and link checks | BASE |
| B1 | size ladder, population and area budget | §1.1 ladder and rung profiles; §4.2 S2 stage quotas; §12.2 | BASE |
| B2 | dependency-graph building selection | §10.2 sequential roster (own tables) | BASE |
| B3 | residents, job postings, backfill, matching | §10.3 households (base); postings and re-matching in the module | BASE + module |
| B4 | people model | §10.3 derived people with ancestry rows (own tables) | BASE + module (data depth) |
| B5 | government, religion, factions, military | §2.7 Faction / Institution entities with seats; §10.2 government and religion rows (base); meetings, roles and goals in the module | BASE + module |
| B6 | relations, friend groups, rivalries, events | the relation store — schema in the base (§10.1), materialised by `@plat/sim` | module |
| a:B10 | economy: resource chains, items and services with prices, stock per building, global price edits | D-32: `@plat/sim` over the base schema stub (§10.3); roster rows' provides / uses edges (§10.2) | module |
| a:C03 | personality, education gated by class, stat block with profession modifiers | D-32: `@plat/sim`, derived from the person key; the stat block a named game-system pack, off by default | module |
| a:C11 | family-tree view (layered generations, elided expansion, re-root) | §14 `@plat/app` family-tree view over the relation store | module |
| C1 | coast generation, islands, ponds | §4.2 S1 closed-outline routine, bank classes (also sky islands) | BASE |
| C2 | rivers, branches, bridges, classification, direction | §4.2 S1 hydrology, tributaries, distributaries, river islands, crossing sites; §4.8 bridges | BASE |
| C3 | manually drawn water | §7.1 `drawWater` | BASE |
| C4 | road-graph substrate (PSLG, incremental faces, edge types) | §2.2 the plat (beyond: attraction policy, levels as views of one arena, role sets on edges) | BASE |
| C5 | road growth (proposal queue, cap, lengths, stages, initial roads) | §4.4 S5 outside the walls (mean-reverting curvature walk, destination-biased, explicit legality; per-preset growth rules for `american` / `ringed`); travel-cost stage boundaries with the anisotropy row (FTG's spoke priority) | BASE |
| C6 | district lots: creation, merge floor, type selection, order | §4.5 grower and typing, merge floor; S7b allocation | BASE |
| C7 | district internal pipeline (landmarks → divide → plots → buildings), placement modes, modifiers | §4.7 claims first → S8 → S10 → S11; Dense / Gaps / Individually placed ≈ row / detached / compound; the tents arrangement row (§4.7 S11) and the building-scale multiplier (§2.5) | BASE |
| C8 | lot → plot subdivision geometry | §4.7 S10 per-frontage regions (replaces recursive random cuts by ruling O5) | BASE |
| C9 | building footprints, landmark templates, entrances | §4.7 S11; entrance rule kept; non-rectangular landmark footprint templates in the base (§2.6) | BASE |
| C10 | suburb stage | §4.4 suburb regime (offshoots, cul-de-sacs, small lots from the outset, density Bernoulli) by preset or the shanty toggle | BASE |
| C11 | walls and towers | §4.8 | BASE |
| C12 | castle district | §4.2 S3 castle reservation + §4.8 | BASE |
| C13 | harbours and waterfront districts | §4.8 water furniture; §4.5 docks | BASE |
| C14 | outer settlement: farmland, farmsteads, outside buildings | §4.9 S12a count-driven outside land, farmsteads, outside buildings on their resources (§10.2 `outside` rows) | BASE |
| C15 | forests, tree areas, trees, hedgerows | §4.9; §8.2 hedgerow instances in `lit` | BASE |
| a:I11 | tree species | §2.7 `Greenery.species` from the climate table; §4.9 inner and outer shares for woods | BASE |
| C16 | landscape decorations, reserve, climate presets | ponds carved at S3 (§4.2 S3 (10)); the rest of the decoration table (copses, stone circles, ruins with trails, counts by rung and biome, keep-clear radii) is S12a's sites, built by the hinterland unit (§4.9); `reserve` land use; climate as a circumstance + style preset | BASE (should-have) |
| a:I05 | feathered field edges | §8.2 `feather` program (vector bands), on in `lit` | BASE |
| C17 | perimeter expand + round; decoration system | §4.5 S6's settlement perimeter, offset and rounded; §4.7 furniture pins (per-block weighted rows, per-district singletons) and plot boundary treatments (§2.5) | BASE |
| a:J05 | market stalls | §4.7 furniture pins: stalls on the square's edge band and round the market hall | BASE |
| C18 | district and building naming, erosion | §10.4 (contraction as an EVO event) | BASE |
| D1 | renderer architecture | §8.1 columnar display list + tile backends (batched; picking through hit-test slices) | BASE |
| D2 | palette and feature treatment | §8.2 `lit` preset on Canvas2D with our procedural texture set | BASE |
| D3 | roofs (straight skeleton) | §3.8, §8.2 (roofs cached per entity revision, not per render) | BASE |
| D4 | water rendering and coast decoration | §8.2 bands, depth ramp, foam, bank classes | BASE |
| D5 | day/night, weather, seasons, window lights | §8.4 sun vector + shadow hook; `night` preset with the `lights` role; lights from the module | BASE (hook) + module |
| D6 | post-process effects | §8.2 post operations per tile (greyscale, sepia, tint, vignette, pixelate, dot screen, scanline, crosshatch noise) | BASE (should-have) |
| D7 | labels, scale bar, grid, units, legend, thematic layers | §9; thematic layers = style overrides keyed by attributes (§8.2) | BASE |
| a:L08 | ruler (distance measuring) | §9.5 measure tool (distance and area, metres and feet, snapping) | BASE |
| D8 | 3-D view, street view, height maps | §11 glTF and CityJSON exports; heights in the model; no 3-D default view (R13 restraint) | BASE (export) |
| E1 | layout editor | §7.1 draw / move / warp events with split-on-cross and dry-run validation | BASE |
| E2 | regenerate area, bulk edit, constrained re-roll | §7.1 the named actions with scope; `setAttr` batches; faithful regeneration (beyond: undoable) | BASE |
| E3 | entity editing, dictionaries, pins, notes, layers | §7.1 `setAttr`, data dictionaries by id (§10.3), annotation layer (§9.5), view notes (§11.3), `LayerSpec` | BASE |
| F1 | schedules, behaviours, sub-locations | §10.3 module; sub-locations with capacities (§2.6) | module |
| F2 | clock, calendar, external time sync | §10.3 module; the time view state and the module's command over the bridge (§11.3) | module |
| G1 | export | §11 (beyond: districts in GeoJSON; per-layer VTT; CityJSON) | BASE |
| G2 | integrations (Foundry, Roll20, public links) | §11 VTT exports (Foundry-class, dd2vtt) + the host bridge over any transport; no hosted service — the host is the store (§11.5) | BASE |
| H1 | data scale | §12.8 memory; lazy people | BASE |
| H2 | performance envelope | §12 (beyond: client-side, no server round trip; the first map under 1 s for every TOWN and CITY and for METROPOLIS up to ≈ 14 200 buildings (≈ 48 000 people), ≈ 2.3 s at the 120 000 cap; model time within O3 (d)'s bars up to ≈ 4 500 / 17 700 / 58 800 people; both misses above declared for the owner's veto — D-18, §12.3, §12.5; VS2-3) | BASE |

**NG (31 rows) — STAGE-2 unless the base already delivers it**

| id | capability | where | tag |
|---|---|---|---|
| A1 | tags, `Settings`, URL state | PART II request (fabric id, params, character); §6.4 permalinks | STAGE-2 (request shape in BASE) |
| A2 | RNG engine, one stream, successor seed | §6.1 per-district sub-seed (beyond) | BASE |
| A3 | pipeline structure and failure policy | §4.1, §5 (NG's local retries are the F-CUT ladder) | BASE |
| B1 | hood outline (`createShape`) | the district's typed boundary (II.1); standalone and sky outlines from §4.2 S1 (2)'s closed-outline routine with an outline template — disc, D-shape, lozenge, crescent, spindle (II.1 rule (5)) | STAGE-2 |
| B2 | templates area / street / square | `FabricStrategy` registrations selected per district (II.2) | STAGE-2 |
| B3 | street network by bent recursive bisection | §4.6 (the base's infill primitive; NG signature as regression) | BASE |
| B4 | hole-aware bisection of annuli (`BisectorEx`) | §4.6 slit routing — the primitive `RingFabric` needs | BASE (primitive), STAGE-2 (ring) |
| B5 | street finishing: extend, fillet, width, corridor | §4.6; §4.7 S9 corridors | BASE |
| B6 | block content dispatch (Normal / Manor / Empty / Green) | §4.6 the deep-interior choice by band shares; §4.7 S10 residue typing; §4.9 greens; the weighted, area- and spacing-conditioned choice as a stage-2 table (II.3) | BASE + STAGE-2 |
| B7 | square-template plaza | `SquareFabric`; §4.7 `square` faces | STAGE-2 |
| B8 | ring-template seed geometry | `RingFabric` (II.2): concentric ring roads at a radius law are the only seed geometry — no template radials; each annulus is cut outside-in by the hole-aware bent cut, whose first cut is a slit and whose later cuts are the radial streets, staggered band to band | STAGE-2 |
| C1 | lots, setback, validation (perimeter filter) | §4.7 S10 (construction, 0 discards) | BASE |
| C2 | buildings, wings, compound plans, roof kinds, landmarks | §2.6 wings in the base + stage-3 hook; roof kinds in the base | BASE (+ stage 3) |
| C3 | manor compounds (walls, hall, grove) | §4.7 S11 set-back compound site plan with boundary treatments + §4.9 grove rule | BASE |
| C4 | greens, groves, shared Poisson field | §4.9 greenery rules; §8.10 stamped tiles | BASE |
| C5 | trees (crown construction, colour, shading, depth sort) | §8.2 lobed crowns, depth sort in `hatched`; §8.10 crown library | BASE symbol, STAGE-2 tier |
| C6 | pins: wells, fountains, large trees | §2.7 `Pin` kinds; §4.7 furniture pins in yards and squares; close-up density by the stage-2 table (II.3) | BASE (pins), STAGE-2 (close-up density) |
| C7 | uneven streetwall | §4.7 S11 front-line jitter | BASE |
| C8 | size tags, scale, character knobs | §2.5 character vector; metric scale (beyond) | BASE |
| D1 | naming | §10.4 | BASE |
| D2 | title layout (corner choice) | §9.5 emptiest-corner rule | BASE |
| E1 | palette / style schema, presets, multi-colour | §8.2 (`hatched` / `graphic` presets; multi-colour roles) | BASE |
| E2 | canvas, layer order, stroke discipline, depth-sorted trees | §8.2–§8.3 | BASE |
| E3 | roads rendering (Plain + five modes) | §8.2 programs (paved stripe, cobbles, tiles, outlined, dashed) in `hatched` | STAGE-2 tier |
| E4 | roof rendering: fake gables, colour law, hatching | §8.2 `roof` + `hatch(taper)`; §8.6 | STAGE-2 tier (programs in BASE) |
| E5 | shadows (prism quads, tree shadows) | §8.4 shadow pass from stored heights | BASE hook, STAGE-2 tier |
| E6 | unrecorded style features (night lights, presets) | §8.2 presets as data | STAGE-2 tier |
| F1 | toggles, hotkeys, presets, tags dialog, rotation, renaming | `@plat/app` (keymap, §14); rotation = view (§7.1); `setAttr` rename persists | BASE (app) |
| G1 | export PNG / SVG / JSON, permalinks | §11 | BASE |
| G2 | integrations (Procgen Mansion hand-off) | the stage-3 `BuildingGenerator` takes the plot and entrance directly (beyond the rasterised hand-off) | hook |
| H1 | performance envelope | §12 (open a district ≤ NG's 10–96 ms; per-district regeneration ≤ 30 ms) | STAGE-2 |

**VG (44 rows) — VILLAGE-LATER: not-precluded checks, hooks in PART III**

| rows | capability group | not precluded because |
|---|---|---|
| G1, G20 | tags, descriptive tags | the intent layer and presets are data (§7.7); tags derivable from the statistics record |
| G2 | seed / RNG / retry | §6 streams; §5 no seed swap |
| G3–G5 | river course before terrain, height field, water extraction | S1 shares level-set water and a carved field; VG's course-first, terrain-independent spline is a `RiverStrategy` the village registers, which S1's carve step serves (PART III) |
| G6, G7 | density map, heart | the density field is the same field type (§4.5); a village registers a density `StageDecl` ahead of its network (§4.12) and seeds one heart (§4.2 S3) |
| G8, G9 | tracker roads, bridges | a village registers a tracker-steered `NetworkStrategy` that receives the traced enceintes (§4.12); bridges §4.8 |
| G10, G11 | square + centrepieces, wharf / piers | `square` faces + pins; `quay` / `pier` ways |
| G12–G16 | buildings + population, fields, orchards, forest, palisade | detached / farmstead site plans (§4.7); hinterland presets and orchards (§4.9); forests; the palisade built before the roads by the village's `EnceinteStrategy` (PART III) |
| G17–G19 | naming, legend / POIs, population class | §10.4, §9.5 annotation layer, §10.2; the ladder's village rows (PART III) |
| R1–R17 | rendering (palette, layers, relief, hillshade, spotlight, water bands, roads, buildings, trees, shadows, fields, outlining, palisade, lights, nameplate, grid, numbering) | style sheets + programs (§8.2: bands, contour and hachure marks, outline mix, vignette, `lights`); the relief tier (hillshade, contours, hachures) is an optional base program, off by default; VG's grass-tuft and spotlight looks stay with the village product |
| E1–E6, D1 | export, JSON, permalinks, editing, integrations, performance, scale | §11, §7, §12, §2.1 (metres everywhere; VG's 0.7 m / unit ambiguity removed) |

All 44 rows are not precluded; the base pays for none of them beyond what it needs itself (the relief tier is a base
should-have in its own right, O12 extras). Caution recorded from the parity judge: the five-level plat is the least
village-shaped model — a village with houses along ways leaves L2 / L3 nearly empty — admissible, since a village is one
district and nothing assumes walls or a market (PART III).

=== REPLACE §15.2 Improvement matrix — every must-have / should-have / hook / stage-2 item of `docs/IMPROVEMENTS.md` §5 ===

### 15.2 Improvement matrix — every must-have / should-have / hook / stage-2 item of `docs/IMPROVEMENTS.md` §5

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-scope-r3

Every acceptance letter carries its class: **[C] conformance** — it holds by construction once the rule is built, so it
proves the implementation follows the design and is never cited as evidence that an improvement was achieved; **[P]
parity** — compared with a measured reference number in `baselines.json` by §13.5's band rule; **[O] outcome** — it can
show that the result is better than the references, for a user or for realism. Thresholds without a reference source
have their numbers in §13.7. Letters that `docs/IMPROVEMENTS.md` stated and an earlier draft dropped are restored with
their numbers (IMP-10). Every letter is stated here in full, stage-2 letters included (NF-S4): implementers read this
matrix, never `docs/IMPROVEMENTS.md`, which is cited for traceability only (§17.1 (1)).

**The first-weighted improvements (D-7) and the evidence their own rules cannot fake (IMP-4).**
* *Plot texture* (O5, O17, O18): §13.5's figure-ground and streetwall rows against MFCG's exports at the matched rung,
  with the intended direction of each difference declared; the plots, party-wall and MFCG street-signature rows; the
  within-district plot-area CV floor [P / O].
* *Editability* (O9, O16-core, O2 c): the thirteen MFCG asks as measured scenarios; locality outside the scope;
  faithfulness against from-scratch generations; carry-over rates of edited entities [O].
* *Legibility and charm*: the §13.6 protocol's legibility and charm questions; street-edge recoverability [O / P].
* *Realism*: the §13.6 protocol's realism question and the P rows of §13.5. Realism against real towns is the corpus
  phase's measurement (§13.9), which the owner's roadmap stages after the standalone generators; this matrix makes no
  realism claim beyond those two.

| id | tier | mechanism in this design | acceptance (class of each letter) |
|---|---|---|---|
| O2 deterministic recipe | must | §6.1 keyed streams with the concern registry; §6.3 addresses and lineage; seeded decoration; epoch components | (a) identical model digest on two machines and three browsers, 100 % [O — FTG has no seed; VG drifts between builds]; (b) the scope of stability as §6.3 states it — grammar, decoration and block-reroll perturbations change 0 other entities [C]; (c) per parameter class: entities outside the stage-k closure byte-identical 100 %, the seam exception of §4.6 / II.4 excepted — computed by the oracle from the batches' commit records and checked (§7.3) [C]; edited entities kept or carried ≥ 95 % for local actions and re-derivation from S7 on, ≥ 80 % from S4–S6, ≥ 60 % from S1–S3, measured at M3a with §13.7's fallback [O]; (d) addresses 100 % stable outside the scope on B-EDIT [C]; (e) stage-isolated goldens: only declared stages move (§13.3) [C] |
| O6 metric units, furniture, statistics | must | §2.1 cm + unit lint; §1.1 ladder; §9.5 furniture; §13.2 core statistics record | (a) 100 % of length fields carry a unit (lint) [C]; (b) ordinary-house footprint median 60–160 m², p95 < 400 m² [P — FTG 103 / 154 m²; MFCG's footprints are lots, descriptive only]; (c) scale bar and grid within 0.5 % [C]; (d) 100 % of generations emit the core statistics record with provenance, the bench metrics on demand (§13.2) [C] |
| O3 robust kernel, typed ladders, report | must | §3, §5 | (a) B-FUZZ on random inputs and constructive degeneracies: 0 crash / hang / invalid output [O — all four references crash or retry on degenerate input]; (b) hard invariant violations 0 / 1 000 cities [O]; "no restart path" is a design property, not an acceptance number (IMP-5); (c) B-EDIT 0 planarity violations [C]; (d) model time per §12.3's laws — p95 TOWN ≤ 20 ms + 60 µs × B, CITY ≤ 40 ms + 50 µs × B, METROPOLIS ≤ 100 ms + 52 µs × B; every generation ≤ 1.25 × its own law — so O3 (d)'s bars (100 ms / 300 ms / 1 s) hold for p95 up to ≈ 4 500 / 17 700 / 58 800 people and for the max up to ≈ 3 400 / 13 600 / 45 800, and are missed above them, a miss declared in §12.3 for the owner's veto (NR-1) [P — MFCG at matched sizes, with §12.9's declared trade]; (e) identical digest across platforms [O]; (f) the seed never swapped; ladder uses ≤ 2 % of transactions, p99 ≤ 3 attempts [C]; (g) p95 per delivered town on the MFCG-worst configuration set ≤ 1.0 s against MFCG's 3.7–4.0 s (§13.5) [O] |
| O11 schema, registry, exports, API | must | §2 schema + registry with the CI path test, §11, §14 | (a) registry round-trip 100 %, no type missing from any path [C]; (b) containment 100 % [C]; (c) export → import → export identical [C]; (d) GeoJSON validates and loads in QGIS with districts [P — FTG omits districts]; (e) 0 dangling references [C]; (f) headless digest = UI digest [C]; (g) VTT grid 0 px [C]; (h) layered SVG separable and opening in Inkscape within 120 s at METROPOLIS [O] |
| O1 terrain and hydrology first | must | §4.2 S1 | (a) requested water features counted by delivery tier: tier-6 omissions 0, degraded ≤ 5 % (§13.7) [O — MFCG fails a requested river in 7 of 10 attempts at size 80]; (b) 0 non-monotonic beds; every river has an outfall; width never decreases downstream; every terrain cell has a defined flow path to an outfall (100 %); contours cross water 0 times [C]; (c) 10 / 10 configurations on 100 seeds each — coast, estuary, confluence, river island, lake shore, delta (distributaries), moat, island city, hill town, cliff or ravine [O]; (d) building ∩ water = 0 [O — MFCG's buildings over its river]; (e) the water stage linear in cell count, ≤ 5 ms at a 128²-cell equivalent and inside §12.4's S1 budget [P — VG 17–87 ms for one 128² village]; (f) site classifier ≥ 90 % [O]; (g) unused eligible land components 0 [C]; R11: river within the core when requested = 100 % [C] |
| O4 two-tier street network | must | §4.3, §4.4, §4.6 | (a) 100 % of through-roads reach destinations, bearings ± 10° [C]; (b) detour ≤ 1.4; junction p5 ≥ 30°; no turn cliff (10 m resampling); 4-way share per preset — organic 0–15 %, `ringed` 20–45 %, `american` 40–80 % [P]; (c) width ~ betweenness [C]; (d) slope p95 within class [C]; (e) 0 edges below `minEdge` and 0 clearance violations [C]; (f) network + infill ≤ 100 ms at CITY with block statistics in the NG bands — the fusion gate, at M0 on a flat site and at M1 on river, coast and relief configurations [P]; the MFCG street signature inside the walls (§13.5) [P]; (g) N external connections exactly, island towns counting their shore landings [C]; (h) between-seed dispersion of the signature vector ≥ the larger of MFCG's and FTG's at the matched rung, from M1 (IMP-12) [O] |
| O5 frontage-first plots | must | §4.7 S10 | (a) access edge 100 % [C]; (b) 0 plots < 3 m, wedges < 0.5 % [C]; (c) side walls ± 5° ≥ 90 % [C]; (d) typed coverage 100 %, discard ≤ 0.05 [C]; (e) plot and block distributions by §13.5's band rule [P]; (f) 0 self-intersecting, duplicate or doorless buildings [O — FTG's hourglasses and ≈ 10 % doorless]; (g) streetwall gap ≤ 1 m [C]; streetwall continuity on dense frontages ≥ MFCG's at the matched rung [P] |
| O18 prosperity field + granularity law | must | §4.5 field; §4.7 S10 joins / splits / alleys; §4.6 deep interiors | (a) Spearman(prosperity, plot area) ≥ 0.8 and Spearman(prosperity, plots per ha) ≤ −0.8 [C]; (b) Moran's I of plot area > 0 [C]; (c) detached, yard, attached and coverage shares monotone in prosperity [C]; (d) alley length per ha ~ −prosperity (Spearman ≤ −0.7), 0 alleys below the class minimum, the dead-end share in band [C]; the court share of deep blocks within band per class (IMP-8) [P]; (e) access 100 % [C]; (f) institutions placed 100 %, never gives up [C]; (g) provenance, and the perturbation test ≥ 95 % outside [C]; (h) soft-seam jumps within §13.7's bands [O]; (i) a smooth field — p99 \|∇P\| ≤ 0.5 per 100 m (§13.7) — whose edits replay [C]; (j) within-district plot-area CV ≥ 0.25 (§13.7) [O — FTG's 441 m² in every class]; (k) gap-width modes [C] |
| O17 plot model, site plans, heights | must | §2.5–§2.6, §4.7 S11, §8.4 | (a) coverage within the table [C]; (b) multi-footprint plots > 0 for institutions, manors, inns and farms [C]; (c) party-wall share by band, attached ≥ 90 % in dense bands [P — NG 39–43 %, 95–99 %]; (d) streetwall continuity ≥ MFCG's Lots mode, walled or fenced frontage counted [P]; (e) yards owned 100 % [C]; (f) footprints fit 100 % [C]; (g) heights on 100 %, shadow ∝ height r ≥ 0.99 [C]; (h) ≤ 5 µs per plot median for site plans (§12.4) [C]; (i) footprint hash identical across LOD [C] |
| O7 content-first land use | must | §4.2 S2, §4.5 S7b, §4.7 S10b, §10.2 | (a) every building has a function and an occupancy (100 %); requested population ± 5 % on ≥ 95 % of seeds [O — MFCG's multiplier]; every person a home (100 %) [C]; every person a work or role (100 %) — a module letter, measured at M4b [C]; (b) rule satisfaction ≥ 95 % (noxious trades downstream or extramural; water trades within 100 m of water; market on a tier-1 junction or gate), reported per city [C]; (c) Moran's I (wealth) > 0 and monotone in the requested gradient [C]; (d) 0 constraint violations; per-capita ratio error against the tables reported; no occupation above its per-capita maximum [O — FTG's "20 adventurers" per 100 people]; (e) reconciliation ≤ 3 rounds [C]; (f) seam discontinuity within §13.7's bands [O]; (g) lazy people stable 100 %; opening a person writes nothing [C]; (h) gazetteer 100 % [C]; block-level use mix within §13.7's bands (MFP-7) [O] |
| O19 greenery by prosperity | must | §4.9 rule table | (a) Spearman(prosperity, private green share) ≥ 0.7 within ± 5 points of the table mean, σ ≤ 8 across seeds [C — NG's 23–58 % at identical tags is the weakness]; (b) public-green rules ≥ 95 %; park area per 1 000 inhabitants in band per rung [C]; (c) 100 % of greenery typed and owned or common, untyped leftover green 0 [O — MFCG and NG green is leftover space]; (d) tree nearest-neighbour p1 ≥ §13.7's canopy threshold, pair-correlation per class [O — FTG minimum 0.14 m]; (e) a district-band view with 10 000 visible trees composes in one 16 ms frame from cached tiles (§12.7) [P — VG P1]; (f) the greenery control monotone and continuous (§7.8) [C]; (g) city-zoom greenery passes §13.7's legibility check and no option coupling drops the layer [O] |
| O8 fortification network | must | §4.2 S3, §4.4, §4.8, §4.11 | (a) gates at 100 % of arterial crossings, count exact [C]; (b) 0 buildings in the setback band on both faces [C]; (c) tower spacing in band, 0 sawtooth [P — FTG 39 m]; (d) defensible-ground share; castle ≥ p80 among candidates [C]; castle area and compactness in MFCG's band [P]; (e) walled share in MFCG's band (§13.5) [P]; outer curtain on request [C]; (f) 4 / 4 circuit configurations, including two independent enceintes (polycentric nuclei, §4.2 S3) [O]; (g) wall → road keeps plot ids [C]; (h) the wall an entity in every export [C] |
| O12 display list, LOD, style as data, layers | must | §8 | (a) continuous zoom, footprint hash identical per LOD, minimum drawn feature ≥ 2 px, labels above §9.4's floors at every level, no feature pops more than once [O — MFCG has no zoom]; (b) pan and zoom ≥ 60 fps at 40 000 buildings and 200 000 trees on the reference machine and ≥ 30 fps on the low-end device; edit-to-redraw < 100 ms; roof computations per frame after warm-up = 0; ≤ 80 draw calls per tile (≤ 80 × P per view) and ≤ 4 uploads per frame during gestures, every ready tile at first paint and settle (§12.5) [P — NG 528 uploads per hood; FTG's roofs recomputed every render]; (c) screen = PNG = SVG within threshold, 0 silent couplings [C]; (d) glyph ambiguity 0, legend 100 %, every visible feature hit-testable [C]; (e) 300 dpi A2 [O]; (f) §8.2's contrast matrix on the rendered city band [C]; (g) first map by §12.5's laws of the building count: under 1 s for every TOWN and CITY request and for METROPOLIS up to ≈ 14 200 buildings, the miss above declared for the owner's veto [P]; street-edge recoverability ≥ MFCG − 0.03 (§8.5) [P] |
| O9 persistent document, locks, regeneration, undo | must | §2.9, §7 | (a) save / load / save identical [C]; (b) locked preserved 100 %; outside the effective scope byte-identical (§7.3 item 7 ii) [C]; (c) faithfulness = §7.3 item 7 (iv): Regenerate (keep settings) byte-identical [C]; New random judged by §13.2's calibrated rank campaign — per regenerated scope and per statistic (median plot area, frontage width, density, attached share) the rank among K = 50 from-scratch generations of the same scope, ties broken by a uniform draw; the campaign (n = 800 scopes — 400 block, 400 district — nightly) passes unless a 10-bin χ² test rejects at family-wise 0.01 (Holm over the four statistics) — executed with the four statistics correlated at ρ = 0.8: 1.0–1.4 % false campaign failures for a perfect regenerator; ≥ 99.5 % detection (2 000 / 2 000 each) of 0.8 × too-snug and +0.25 sd biased regeneration, 500 / 500 at 0.6 × too snug and 1.5 × too loose; ≥ 99.3 % even at ρ = 1 (IMP-7, VS2-9; §13.2) [O — FTG's "too snug" regeneration]; (d) every operation undoable (enumeration test) [C]; (e) an upgrade keeps 100 % of edited entities or reports each orphan [O — FTG cannot regenerate old towns]; (f) the thirteen MFCG edit asks of §7.4 as scripted B-EDIT scenarios, each reporting its locality share, invariants and re-run cost (§13.2) [O — MFCG: "no way to save those changes"] |
| O16-core report and honest controls | must | §5.4, §7.1, §7.8 | (a) report 100 %; the requested-vs-built diff and every requested feature's delivery tier shown when non-empty [O — MFCG's 28 silent street failures]; (b) auto-resolved values reported 100 % [C]; (d) hidden couplings 0 [C]; (f) every numeric control monotone and continuous by §7.8's statistical rule [C]; (h) seed → map identity 100 % [C] |
| O13-core labels and names | must | §9, §10.4 | (a) 0 protected overlaps, 0 collisions, inside ≥ 99 %, curvature within §13.7's limit, 0 labels crossing holes [O — MFCG covers gates and the keep]; quarter labels at MFCG's count at matched sizes [P]; (c) name–feature consistency 100 % within 250 m [C]; (e) edited names persist 100 % [C] |
| O14-core hinterland and margin | must | §4.9 | (a) farmland per capita ± 20 % [C]; (b) field access 100 %; every farmstead within 300 m of one of its fields and 1 500 m of all; land-use overlaps 0; unused components 0 [C]; (d) roads leave to destinations 100 %, rivers enter and exit [C]; (e) built / map area 0.06–0.25 at every rung (§13.7) [O — FTG's fixed canvas per class] |
| O10 intent, constraints, assignment, forms | should (input schema + drift bounds: must hook) | §7.7 | (a) 10 / 10 scripted intent tasks without URL editing [O]; (b) hard targets 100 %, achieved-vs-requested reported [C]; (c) monotonicity [C]; (d) pins 100 % [C]; (e) assignments ≥ 99 % within drift, infeasibility reported with the nearest count [C]; (f) size error p90 ≤ 10 % [C]; (g) the forms classifier ≥ 90 % over the forms catalogue, `linear-street`, `island-city` and `twin-town` included [C]; (h) edited tables versioned, default path byte-identical [C] |
| O13 full (street names, addresses, annotation) | should | §9 | (b) ≥ 90 % of named streets labelled at neighbourhood LOD [O — no reference names its streets]; (d) 0 spelling errors [C]; (f) annotation layer [C]; (g) addresses 100 % [C] |
| O14 full (rings, presets, wildness, feasibility) | should | §4.9 | (c) wood-edge straightness median ≤ 0.90, canopy monotone in wildness (§13.7) [O — VG's "Some" ≈ "Many"]; (f) ≥ 95 % of the map land-classed [C]; (g) scatter statistics [P] |
| O16 full (thumbnails, drafts, discoverability, responsive, accessible) | should | §7.8 (S0–S4 proxy thumbnails, G-R4), `@plat/app` (§14) | (c) the scripted tasks of §13.4 — share a view link, export a layered SVG, change the coast side, see five variants of one kind, recover from a mistaken regenerate — each in one action where a reference needs a detour, every response ≤ 1 s (replaces "≥ 90 % of testers"; IMP-11) [O]; (e) six thumbnails < 1 s at TOWN [P]; (g) editor usable at 768 px [C]; the accessibility contract (§14, §13.4) [C] |
| O12 extras (relief tier, tiled export, low-end tier) | should | §8.2 relief tier; §8.8 tiled export; the low tier (§12) | as O12 (b), (e); the relief tier renders at every rung and is off by default [C] |
| O7 simulation module | should | §10.1, §10.3 `@plat/sim` (M4b) | the same person on every view; `whereIs` deterministic; stored bytes per 10 k population reported; every person a work or role (100 %); the economy and personality content of D-32 derived deterministically from its keys [C] |
| O11 extras (VTT native, per-layer, binary, 3-D, GIS profile) | should | §11 | (g), (h); format validators, CityJSON's included [C] |
| O9 extras (upgrade replay with diff) | should | §7.5, §6.4 retention | the upgrade test; goldens replay under N−1 and N−2 [C] |
| O2 / O6 extras (golden suite, calibration interface) | should | §13.3, §7.6, §13.9 | the declared-shift protocol in CI from M1; every table value replaceable with provenance; the corpus interface of §13.9 present [C] |
| hooks 1–8 (§5.4) | must | 1 addresses + sub-seeds §6.3 / §6.1; 2 lifecycle + edit log + incremental pipeline + conversions §2.8 / §7 / §4.11; 3 assignment input + solver §7.7; 4 context vector + rules as data §2.5 / §7.6; 5 building-generator interface + heights + shadow hook §2.6 / §8.4; 6 layers + drainage + any-boundary neighbourhood + island outlines §2.1 / §2.3 / PART II / §4.2; 7 editable versioned tables + preference layer §7.6; 8 circumstances timeline + stored editable field §7.7 / §4.5 | every hook field declared in the schema of every entity type and populated when used (registry test, 100 %) [C]; zero cost when unused — with every hook unused, the one-click model time and document size equal a build with the hook fields removed within 2 % (a CI comparison) [C] |
| S1 boundary and seam contract | STAGE-2 (must in base) | §2.5 `SeamContract` from M1, §4.12, PART II | 100 % of districts carry a complete contract; portals 100 %; misalignment 0; Hausdorff 0 for shared entities [C]; at M1 the check is schema completeness only (the field is flat until M2b, so its samples are constants) [C] |
| S3 seam-continuous fields | STAGE-2 (must in base) | §4.5 fields with `hard` flags per seam edge | Δ frontage, area and storeys within §13.7's bands on soft seams [O — NG's hoods cannot share a street] |
| S2 context features inside the neighbourhood | STAGE-2 | II.1 (the request's context), II.3 (context features as constraints), §4.8 water furniture, §4.4 intervallum | (a) a context coverage matrix — district context (waterfront, wall-side, slope, bridgehead, gate approach, sky) × generated feature — with no empty cell: every waterfront district has a quay or bank path, every wall-side district an intervallum or a rear-plot rule [C]; (b) 0 buildings in water; bridges within ± 10° of the channel normal [C]; (c) 0 fragments cut at the close-up frame — the surroundings continue at lower LOD to the frame [C]; (d) S2's blind preference test, run as §13.6's protocol against NG at M5 with the owner as the declared rater (IMP-11) [O] |
| S4 composable context templates, functional squares, landmark-centred neighbourhoods | STAGE-2 | II.2 template fabrics, II.3 dispatch table, §4.7 claims, §2.6 footprint templates | (a) every base district kind has ≥ 1 template [C]; (b) the templates' morphologies are separable by generated statistics — a nearest-centroid classifier over §7.7's signature vector, computed per district, assigns ≥ 90 % of template districts to their template [C]; (c) ≥ 90 % of squares on a tier-1 junction or in front of a landmark [C]; (d) typed-square area per 1 000 inhabitants within §13.7's band [C]; (e) a requested landmark delivered ≥ 99 % [C]; (f) rule satisfaction ≥ 95 % [C] |
| S5 NG-class close-up render tier | STAGE-2 | II.4, §8.2 `hatched`, §8.6, §8.4 shadow pass | (a) opening one district at neighbourhood LOD ≤ NG's 10–96 ms at comparable building counts [P]; (b) generation ≤ NG's 64–75 µs and rendering ≤ ≈ 85 µs per building [P]; (c) draw operations per frame and uploads within §12.5's budgets, against NG's 528 uploads per hood and 55–80 % hatch share of operations [P]; (d) the `hatched` style regression — per-wing operation mix and the roof colour law (§8.3) [P]; (e) shadow length ∝ stored height, r ≥ 0.99 [C]; (f) footprint hash identical to the city LOD [C]; (g) city-zoom legibility unchanged with the tier on (B-ZOOM) [C] |
| S6 stage-2 workflow | STAGE-2 | II.4 workflow, §7.1 named actions, §6.1 per-district streams | (a) five variants of one template in five actions, where NG needs a tags dialog or a URL detour [O]; (b) the default path one action with p95 ≤ 0.5 s for a medium neighbourhood [P — NG]; (c) rerolling one district or block leaves 100 % of entities outside it identical in address and geometry, the seam exception of II.4 excepted [C]; (d) addresses, names and footprints preserved across levels, 100 % [C]; (e) 0 hand-offs to another tool [C] |

=== REPLACE §16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2 ===

## §16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-scope-r3

*In plain words.* Before building anything we measure what we still need from the recordings and take a few small new
ones (FTG towns at two sizes, MFCG towns at five seeds per size), then build the riskiest pieces first as short spikes
with pass/fail numbers: the geometry kernel, the bent cut, the fused street layout with its speed gate, and the
determinism machinery. The first real milestone (M1) is a town the owner can look at next to MFCG and FTG. Because the
owner ranks editability first, editing comes next (M2a), before the second look and the rest of parity (M2b). Then full
editing and the API (M3a), the exports and the should-have extras (M3b), hardening (M4), the simulation module (M4b) and
stage 2 (M5). Effort is stated honestly as a range with its basis: about 150–200 expert person-weeks. The subjects the
owner's roadmap puts later are listed at the end with their hooks; nothing else is out of scope.

Person-weeks are expert estimates (PLAUSIBLE) for two implementers plus a verifier seat — about 75–100 calendar weeks
at that staffing; staffing per the owner (architecture and rulings on Fable seats; build, verify and measure on Opus
seats). Every milestone ends on executed evidence, never on intention, and every exit writes its `MilestoneRecord`
with the milestone's declared shifts and fails on an undeclared one (§13.3). **One rule for the owner's panel at every
gating exit (NF-S2):** M2b ("the base at parity"), M4 ("mastered") and M5 (the stage-2 gate) claim their D-5 verdict only
by a rated pass of §13.6's protocol or by the owner's acceptance recorded in the `D5Record`; if the owner has not rated
within seven days, the build continues on the measured numbers, the milestone's D-5 status is *provisional — not
rated*, the claim is not made, and the panel is offered again at every later milestone and, after M5, with every release
until it is rated (§13.6 (7)).

| milestone | content | exit criteria (executed, not asserted) | est. |
|---|---|---|---|
| **M-1 — calibration and the clean-room inputs** | `docs/CONFIDENCE.md` §6 **#5** FTG face recovery (block sizes inside rings, dividing-road position vs OBB, plot depth and frontage, FTG's plot share of land) and **#10** NG adjacent-footprint pairing; **#2** the NG size sweep; the NG baselines of `docs/IMPROVEMENTS.md` §7.2 (detour index, 4-way share, cycles per km², plot minimum-width distribution, streetwall gap per 100 m); NG's hollow-block frequency and MFCG's inner-lot removal (IMP-8); **the MFCG sweep at five seeds per matched size** (40 / 80 / 130, plain options, plus a river-and-coast variant) with lot-orientation coherence, wall alignment, walled and ribbon shares, district areas, gates, towers, castle and plaza, and — every ⟨M-1⟩ number of §13.5 (NF-S5) — streetwall continuity on dense frontages, lots per block, T / Y share, intramural dead ends, blocks per ha, inner-lot removal and street-edge recoverability on its plain renders (the metric of §8.5, implemented research-side and cross-checked against the product's implementation on M1's golden renders within 0.01) (MFP-2, MFP-6, MFP-8); **FTG captures at BIG_TOWN and BIG_CITY**, three of each over six days on the free daily allowance, decoded with the existing tools (FTG-16); outline anisotropy and turning per 100 m after 10 m resampling on every FTG payload (FTG-5, FTG-15, NF-S3); NG block counts per template at `medium` from the vertex captures; the variety dispersions of MFCG and FTG (IMP-12); **`baselines.json`** generated research-side with `referenceBuild` on every row and committed into `plat/`; **the sanitised implementer digest**, written by one seat and checked by another; the hashed content deny-list; `CLEAN-ROOM.md`'s seat ledger (IMP-1) | every §13.5 baseline row present with its provenance — or, for an ⟨M-1⟩ number M-1 could not measure, the row made descriptive and entered in `known-defects.json` by §13.5's ⟨M-1⟩ rule — and every band computed by the band rule; a `docs/calibration/` record per experiment; FTG's six captures decoded; the digest checker's report shows 0 code excerpts, 0 reference word lists, palettes or tables and 0 deny-list hits | 2–3 pw |
| **M0 — kernel, bent cut, fusion, determinism and site spikes** (risk retirement) | (a) `@plat/kernel`: lattice, predicates, one arena per layer with the levels as views, role and owner tables and reference resolution, attraction and contact semantics, batched transactions with stage-end index partitions, booleans / buffers / bands on the arrangement with the CI oracles, OBB / LIR, snap rounding, the straight skeleton with its validator and exact OBB roofs; (b) the **bent-cut transaction** with the hole slit, calibrated on NG's vertex captures; (c) the **fused-layout spike**: S4 routing + S5 growth + S8 infill on a flat synthetic site at CITY face counts; (d) the **determinism spike**: structured stream keys, lineage-hash minting, the Merkle digest, `dmath`, the time-dilation shim, the allowlist lint with its vendored scan; (e) the **site-and-fields spike**: S1 + S4 + S6 with §12.4's mechanisms; (f) the CI tiers timed on the runner (§13.8) | (a) B-FUZZ 0 crashes / hangs / invalid outputs on 10⁶ random inputs per primitive and on the whole constructive set (§13.1); insert + snap + attract + re-walk ≤ 8 µs per proposal, or §3.7's miss rule applied before M1 (the accelerator, or a declared budget amendment); S11's geometry share ≤ 3 µs per plot median; §3.7's bars (i)–(ii) and §3.8's bar, with their pre-decided fallbacks applied before M1 if a bar fails; op-permutation determinism for declared batches and issue-order determinism for callback-form stages (§3.3); (b) start position σ within ± 0.02 of 0.066 (plain faces) and 0.098 (ring faces), corner within 0.10 of mid-course on ≥ 80 %, arrival ≥ 85° on ≥ 95 %, block-area and cut-length KS by the band rule — on curved, round-joined, triangular, C-shaped and holed faces; (c) **the fusion gate**: S4 + S5 + S8 ≤ 100 ms at CITY, block-area and junction-degree distributions inside the NG bands on the same district shapes and the MFCG street-signature rows of §13.5, no turn cliff, 0 whole-map restarts on 1 000 seeds — if it fails, §4.4's fallback applies before M1; (d) digests identical on Node x86 / arm64, Chromium, Firefox and WebKit, workers on and off, 100 seeds; every stream key distinct; ≤ 0.1 µs per structured key; digest maintenance ≤ 5 % of stage time and a full recompute ≤ 150 ms at CITY; (e) S1 + S4 + S6 ≤ 50 ms at CITY, or §12.4's coarsening fallback applied and re-measured; (f) each CI tier inside its budget, or §13.8's fallback applied | 9–12 pw |
| **M1 — a viewable MFCG/FTG-class town** (the first product milestone) | S0–S11 with row / detached / hovel site plans and heights (compounds in M2b), at all three rungs — METROPOLIS is a `ladder.json` row on the one pipeline, so the goldens, B-CITY, the determinism tests and the diagnostic panel include it from M1, and M2b measures and tunes it (VS2-2); S3 reservations and gate sites; S5 with each trace before its stage's growth; S7 walls / gates / towers / castle; the eager allocation; S13a names with the quarter merge tree (quarter labels at the city band, district names at the district band); the `ink` preset at the city and district bands on the Canvas2D tile pyramid (its close-up and building bands at M2b); SVG / PNG export; permalinks marked *preview* (§13.3); the report panel with delivery tiers; the B-CITY harness in the PR and nightly tiers; **the output-version stamp, the shift, cascade and milestone records in `plat/goldens/`, and the stage-isolated golden tooling with the per-stop placement digests (LC-19, NF-S1, N-24; §13.3)**; `SeamContract` on every district; the derivation pool; the milestone-1 gate list of `docs/IMPROVEMENTS.md` §5.1 (O2, O6, O3, O11 schema + PNG / SVG, O1, O4, O5, O18 with a flat field, O17 basic, O8 basic, O12 ink, O16-core). **Named work items (IMP-2):** the M1 content, authored fresh — roster rows for the M1 classes, households, the naming grammar and word lists, the era table, the `ink` palette (≈ 3–4 pw of the estimate); the app shell — one click, basic panel, report, gazetteer and "features in view", the keymap, the accessibility contract, context-help skeleton (≈ 2–3 pw) | the **D-5 protocol's first run** (diagnostic, §13.6) with its threshold panel; on B-CITY-lite (200 seeds × 4 water settings): 0 tier-6 omissions of requested features and degraded ≤ 5 %, plots with access 100 %, population ± 5 %; **the fusion gate re-run on B-CITY-lite's river, coast and relief configurations with the reordered stages (IMP-13)** — pre-decided fallbacks: on time, §4.4's class-boundary move (growth stops at district-scale secondaries everywhere; lanes infill-only), then the CITY model budget re-declared at the measured p95 as a D-18 amendment for the owner's veto; on statistics, the infill band table gains a slope class (face mean slope < 5 %, 5–15 %, > 15 %) calibrated on NG's faces, and the gate re-runs; model within §12.3 at TOWN and CITY with the pool measurement (the pool stays primary if its CITY p95 ≤ 300 ms and digests are identical for pool sizes 0–3 on 200 seeds, else the single-worker column is declared); the label-composition measurement (§8.9); the figure-ground metrics against MFCG's M-1 recoverability, contrast matrix, `ink` symbolisation census, label floors and counts and hairline fidelity (§8.3, §8.5, §9.4); B-ZOOM's role continuity across `ink`'s city → district switch; placement digests identical on Node x86 and in the nightly five-engine run; the walled share and extramural ribbon share in MFCG's band (§13.5); the between-seed dispersion against MFCG's and FTG's (IMP-12); the B-EDIT-lite identity fixtures (≥ 99.9 %); the document-size test (≤ 320 B per building at CITY); the control-continuity sweep; the parity report by the band rule; every district carries a complete `SeamContract`; the scripted tasks of §13.4 that M1 supports, keyboard-only included; the first-map, settle and re-raster runs at TOWN and CITY band bottom / default / top (§12.5); the model max clause at TOWN and CITY (§12.3); the furniture and snap query round trip (§8.9); the SVG export's transient-list peak (§12.8); the font-feature test (§9.2); the SVG and PNG export budgets (§12.7) | 33–43 pw |
| **M2a — the editing core** (D-7: before the second preset) | the document and log with the one replay fold; locks and pins; scoped faithful regeneration; the named actions (Regenerate keep settings, Adjust with the fate report, New random, Same kind new seed); undo / redo as logged events with per-session stacks, the independence check and unshared truncation (§7.4); per-document sessions (§7.4); edits applied at once during load verification with both mismatch choices (§2.9); replay with S13a per event (§7.3); dry-run validation with conflicts returned as actions; `setAttr`, `delete`, `merge`, `split`, `join`; the app's selection, context panel, lock and the keymap's pointer idioms; B-EDIT at 10³ (PR) and 10⁴ (nightly) with the oracle once per sequence | O9 (a), (b), (d); the oracle's (i)–(iii) green on 10⁴ sequences; a CITY district undo ≤ 30 ms; per-edit validation and fixed-scope edit cost flat within ± 20 % from TOWN to CITY (METROPOLIS joins at M2b, which measures it; NF-S6); "recover from a mistaken regenerate" in one undo; the verification reference mix within §12.6's V + 10 % | 9–12 pw |
| **M2b — the base at parity** | the prosperity field with drivers and the brush; the full granularity law with the rung modifiers (§1.1) — joins, splits, alleys, back lanes, the deep-interior shares; S10b placement from the roster; compound site plans with the packer; roofs; S12 hinterland presets, greenery rules, outskirts and the suburb regime; harbour, bridges, canals; O13-core street names; O14-core; the bench statistics; **`lit` on Canvas2D at all four bands** with our procedural texture set (≈ 1 pw); **`ink`'s neighbourhood close-up and building band** with the roofs — ridge hairlines by the roof construction, tapered ticks, prism shadows when shadows are on, cobbles as ink stipple, pins as ink symbols, every named way labelled; wings as ink outlines (§8.2; N-23); the relief tier; METROPOLIS measured and tuned, with the single-thread METROPOLIS measurement (§4.1), the compositor measurement (§8.9) and the projected-shadow budget measurement (§8.4). **Named work item:** the rest of the base content — the remaining roster classes, institutions, government and religion rows, the greenery and hinterland tables, the `lit` palette (≈ 4–6 pw) | every must-have letter run on B-CITY (1 000 seeds) against its §13.5 or §13.7 band — no letter without a number; every §13.7 threshold due at M2b confirmed or its fallback applied, O19 (g) city-zoom greenery for `ink` and `lit` among them; per-edit validation and fixed-scope edit cost flat within ± 20 % from TOWN to METROPOLIS (NF-S6); B-ZOOM role continuity across every band switch of `ink` and `lit` (N-23); O17 / O18 / O19 runs; roster placed 100 %; site plans ≤ 5 µs per plot median; 300 dpi export; ≥ 60 fps at 40 k buildings; METROPOLIS first-map runs at 30 000 / 50 000 / 120 000 people (§12.5); the model max clause and the export-time peak at METROPOLIS (§12.3, §12.8); the query round trip at METROPOLIS (§8.9); the moving-sun step budget (§8.4); the METROPOLIS SVG budget (§12.7); the rung-profile orderings of §1.1; **the D-5 protocol passes** against MFCG (`ink`) and FTG (`lit`) at TOWN and CITY (METROPOLIS per D-31), or the owner's acceptance is recorded — unrated: M2b's status is *provisional — not rated* and "the base at parity" is not claimed (the rule above) | 33–42 pw |
| **M3a — full editing, migration and the API** | warp kernels with whole-step validation; drawn constraints and the "rebuild around my drawings" rebase; assignments and the placement solver; rule-table overrides, the preference layer and the tables editor; migration and upgrade as undoable events with their diff; rebase; **retention of output versions N−1 and N−2** (§6.4); the dependency audit with the locality oracle at full scale; B-EDIT 10⁵ in the milestone tier; the handle-based embedding API (§11.2); the host bridge and `DocResolver` (§11.3, §11.5); S1's water and terrain operators with re-sited crossings and exact re-basing (§7.3), the water operator in §4.11's order with course-knot edits (§7.3 (b)); point-anchored records under a warp (§7.4); the carve edit with §4.11's way rule and the kernel's clear regions (§3.3); the `packs` block and the link refusal rules (§2.9, §6.4); GeoJSON; the app's drawing, warp, brush, assignment and tables-editor tools | O9 (c) faithfulness — Regenerate (keep settings) byte-identical, and §13.2's rank campaign for New random passing in the nightly tier (a failed campaign is re-run once with the next seed; a second failure is a regeneration defect, fixed before exit; IMP-7) — (e) and (f), the thirteen MFCG asks as scripted scenarios; §7.3 (7)(v)'s coarse-edit assertions on B-EDIT's terrain and water sequences; the clear-region fixtures of §3.3 (a canal across a CITY district, an outer moat at S5a, a course-knot move and a river move across a street grid: every face outside the edit's footprint (§4.11) byte-identical except the seam exception at its boundary, attraction onto exactly the prepared vertices and no other contact), or §3.3's pre-decided fallback applied before exit; B-EDIT 0 planarity violations and 0 lost faces over 10⁵ sequences; O2 (c)'s carry-over rates, or §13.7's fallback; goldens replay under N−1 and N−2, each retained version ≤ 150 KB gzipped; the bridge convergence test (a host and three headless clients, 1 000 interleaved random events — undo and redo from every client and one owner undo through a chain among them — one digest, 0 lost accepted events; §11.3); a link to a town with a non-shipped pack or host content is refused and its `.plat` file replays without them; GeoJSON loads in QGIS with districts | 15–19 pw |
| **M3b — exports, forms and the should-have tiers** | VTT (Foundry-class scene JSON and dd2vtt, one scene per layer); glTF / OBJ; CityJSON; the CBOR twin with its decoder; S0–S4 proxy thumbnails; O10 intent expansion and the forms catalogue with its classifier; O13 full (path labels, addresses, the annotation layer and legend sheet); O14 full (rings, presets, wildness, feasibility); O16 full (drafts, discoverable export, the responsive editor); O12 extras (the low tier); the `@plat/docs` guide and generated release notes; three candidate `house` style sheets (D-1); the ink-family variants `parchment`, `bw-print` and `night` at all four bands (the `night` sheet's occupancy-driven window lights arrive with the module at M4b); random styles with the bounded repair (§8.2) | VTT import with no manual steps; every format validator green; scripted intent tasks 10 / 10; the forms classifier ≥ 90 %; six thumbnails < 1 s at TOWN; every scripted task of §13.4; monotonicity sweeps green at every rung; documentation coverage 100 %; B-ZOOM role continuity across every band switch of the ink-family variants; the random-style shipped-palette fallback ≤ 2 % of 10 000 draws per family (§8.2); the anchored CityJSON file validated with PLAT's extension, or the sidecar fallback taken and reported (§11.1) | 16–21 pw |
| **M4 — hardening and the incremental path** | the performance tiers and the low-end tier measured on the named device (§12.1); the table-provenance audit; **the one incremental path: add a growth stage to an existing town** (surviving entities byte-identical, new entities on epoch components, wall → ring road as `retypeEdges`); output version 1 fixed, ending the *preview* label; release notes naming known defects; **the D-5 protocol's "mastered" run**, with the owner's pick among the three `house` sheets (no pick by the exit: candidate 1 ships as `house`, `ink` stays the default and the pick is offered again, §13.6 (8)) | nightly cross-platform goldens green for two weeks; the epoch test (0 re-rolled survivors); a document with interleaved edits and two epochs replays to the session digest; the conversion test; the 20-epoch heap and document budgets; METROPOLIS first map within §12.5's law at 30 000, 50 000 and 120 000 people (under 1 s up to ≈ 14 200 buildings); "mastered" claimed only when the D-5 protocol passes, rated, at all three rungs (METROPOLIS per D-31) or the owner's acceptance is recorded — unrated: M4 closes with "mastered" *provisional — not rated* and the panel offered again at M4b, M5 and every release (the rule above); every table value replaceable with provenance | 11–16 pw |
| **M4b — the content module `@plat/sim`** (after the relation store's schema, which is in the base from M1) | the relation store materialised (family units, relations, memberships); postings and re-matching; occupancy and schedules as a query; the calendar; factions with roles, goals and reconciliation; religions' meetings; events as templates; the economy and personality content of D-32 with its authored tables; the family-tree view | O7's module letters (every person a work or role 100 %; the same person on every view; `whereIs` deterministic; stored bytes per 10 k population reported); one hour for 50 000 people ≤ 50 ms; a scoped regeneration changes 0 relations outside its scope; the family-tree view keyboard-operable and pins nothing | 8–14 pw |
| **M5 — stage 2: neighbourhood composition** | `@plat/hood`: `RingFabric`, `SquareFabric`, `StreetFabric`; the block-content dispatch table and pins; the `hatched` family at all four bands — city (masses in the lit roof tone, ground = paper, the street stripe, wood fills), district (two-tone roofs by `fakeGablePerWing`), neighbourhood (the render tier: tapered hatch, prism shadows, cobbles, chimneys, wells, lobed depth-sorted trees, hood title) and building (per-wing hatching) (§8.2; N-23); the close-up workflow on any district and on an arbitrary boundary (sky context); the "same kind, new seed" per-district workflow with locks | every district of every B-CITY city opens as an NG-class close-up; portals connected 100 %; shared-edge geometry byte-equal across adjacent neighbourhoods (Hausdorff 0); per-district regeneration ≤ 30 ms and open ≤ NG's 10–96 ms at comparable counts; footprint hash identical to city LOD; every stage-2 letter of §15.2 (S1–S6) run against its number, S4 (d)'s §13.7 band confirmed or its fallback applied; B-ZOOM role continuity across every band switch of `hatched`; the stage-2 gate claimed only when **the D-5 protocol against NG** (S2's preference test with the owner as rater) passes, rated, or the owner's acceptance is recorded — unrated: M5 closes *provisional — not rated* and the panel is offered with every release until it is rated (the rule above) | 14–18 pw |

**Effort, with its basis (IMP-2; D-20).** Re-derived line by line (PLAUSIBLE; each line a range with its basis):

| line | pw | basis |
|---|---|---|
| parity floors after sharing: (MFCG 46 + FTG map subset 52) × 0.65–0.75 | 64–74 | `docs/CONFIDENCE.md` §1; sharing the kernel, the display list and the document removes 25–35 % of the two floors, not 50 % |
| O1 terrain and hydrology beyond the references' water | 4–6 | priority-flood, D8, rivers by descent, coast–terrain coupling, islands, distributaries, bank classes |
| O9 document and edit system (events with inverses and undo records, dry run, locks, scoped regeneration, the named actions, rebase, migration with diff, retention, the locality oracle, B-EDIT) | 9–13 | neither reference has it |
| O12 renderer beyond the floors (columnar display list, paint programs, tile pyramid and tile worker, label composition, SVG, print bands, `lit` on Canvas2D, the relief tier) | 4–6 | one drawing path; no second backend |
| O11 exports and interop beyond PNG / SVG / GeoJSON (VTT × 2 per layer, glTF / OBJ, CityJSON, CBOR, CSV, the handle API, the host bridge and resolver) | 5–7 | §11 |
| O17 + O18 + O19 (plot model, site plans, packer, heights; the field and the granularity law; greenery rules) | 7–11 | new in both references |
| O10 (intent expansion over ≈ 200 parameters, the forms catalogue, assignments, the placement solver) | 4–6 | forms tuned by eye and the D-5 panel |
| should-have "full" tiers (O13, O14, O16, O12 extras) | 4–6 | §15.2 should rows |
| original content under the clean room (≈ 60–100 roster classes, institutions, households, government and religion rows, naming grammar and corpora, era tables, presets, the symbol set, the procedural textures) | 8–12 | ≈ 40–50 % of CONFIDENCE's 25 pw FTG content line (§3.4's re-pricing), plus presets and symbols |
| `@plat/sim` (relations, postings, schedules, calendar, factions, events, economy and personality) | 8–14 | inside FTG's 125 − 52 = 73 pw non-map scope; the relation schema already in the base |
| the reference app's UI (panels, drawing and snapping tools, four field brushes, the tables editor, the style dialog, the advanced panel over ≈ 200 documented parameters, accessibility, context help, keymap) | 7–10 | no reference line covers it |
| the verification rig (five benches in three CI tiers, stage-isolated goldens with shift and cascade records, the five-engine nightly run, visual regression, the option matrix, control and cost-model sweeps, `baselines.json`, the clean-room scanner, the D-5 tooling) | 7–10 | §13 |
| mechanisms the fix-all pass added that the lines above do not price (booleans and bands on the arrangement, the derivation pool and its merge, the eager allocation and reservations, per-frontage regions and wings, the label placement engine) | 5–7 | the kernel, pipeline and rendering drafts of 2026-09-25 |
| **base subtotal (M-1 – M4b)** | **136–182** | |
| stage 2 (M5) | 14–18 | as before |
| **total** | **150–200** | equal to the milestone sum above |

The round-2 additions — `ink`'s close-up and building band (M2b), `hatched`'s city and district bands (M5), the
ink-family variants (M3b), the records in `plat/goldens/` and the placement digests (M1), the faithfulness campaign
(M3a) — are style sheets over existing paint programs and test tooling already priced in the O12 renderer, the
verification rig and the stage-2 lines, so the ranges stand (PLAUSIBLE). Round 3's additions — METROPOLIS in M1's test
inputs (a `ladder.json` row on the one pipeline), the doubled faithfulness campaign (≈ 6 more CPU-minutes a night), the
determinism lint over S13b's renderer inputs and the scripted document checks of §17.1 (2) — change no line of the
table either (PLAUSIBLE).

*Chose* to state the larger, honest total *over* keeping 100–130 by cutting scope *because* the owner asked that nothing
be deferred and that everything be fixed as soon as possible, and the earlier figure left out the content, the app and
the rig that the base contains. The cuts that would shrink it are recorded for the owner's veto, not applied: the
module M4b (8–14 pw); VTT, glTF / OBJ, CityJSON and the CBOR twin (≈ 3–5 pw); all but three forms (≈ 2–3 pw); the
should-have "full" tiers (4–6 pw) — together a base of ≈ 119–154 pw and a total of ≈ 133–172 pw.

The riskiest items, in order: the fusion timing and statistics on real terrain (M0 c, M1); the bent-cut engine on
concave and holed faces (M0 b); the kernel's own booleans and bands (M0 a, with Clipper2-WASM as the pre-decided single
engine, §3.7); the straight skeleton's robustness (M0 a); the content authoring cost (M1, M2b, M4b — CONFIDENCE §3.4's
re-pricing is the warning); the thin CITY budget headroom (§12); the D-5 protocol's dependence on the owner's time
(§13.6's rater rule answers it: an unrated panel never stops the build and never lets a gate be claimed).

**Staged by the owner (hooks concrete; documented, not bugs to re-find):** stage-3 building compositions (§2.6's
`outline` / `compose` split, cost contract and intake measurement); the village product THORP → HAMLET → VILLAGE (PART
III); sewers and floating islands (II.6); the evolution engine beyond the one built growth path (§4.11); calibration
against the historical corpus (§13.9); SettlementForge inputs (§11.4's host-input contract). Nothing else is out of
scope: CityJSON is built (§11.1), the host-input contract is decided (§11.4), sharing needs no hosted service (§11.5),
setting packs have their format (§10.4), there is no WASM kernel (§3.7), and the relief tier is a base program (§8.2).

=== REPLACE §17.1 The clean-room chain (IMP-1; D-29) ===

### 17.1 The clean-room chain (IMP-1; D-29)

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-scope-r3

1. **Who reads what.** *Research seats* (readers, measurers, the digest writer) may read the findings, `captures/`,
   `research/` and — under the standing ruling — `reference/`. *Implementer seats* (anyone writing code, tables, style
   sheets, content, assets or tests in `plat/`) read only `docs/ARCHITECTURE.md`, the implementer digest in
   `plat/docs/digest/`, the `plat/` repository, published algorithm papers and the public documentation of adopted
   libraries; they never open `research/`, `captures/`, `reference/`, the findings, the critics, `docs/confidence/`,
   `docs/improvements/`, `docs/CONFIDENCE.md`, `docs/IMPROVEMENTS.md` or the red-team files. The citations in this
   document are for traceability; an implementer follows them only into the digest. No code from TownGeneratorOS
   (GPL-3), the FTG Foundry module or any captured bundle is read for implementation, ported or paraphrased.
2. **The implementer digest.** A digest seat writes `plat/docs/digest/` from the research: behaviours, measured numbers
   (each with its `baselines.json` id or finding reference) and the creators' stated ideas — no code excerpts, no
   reference word lists, grammars, palettes, tables or identifiers. A separate checker seat, which reads only the digest,
   runs the content scan below on it and files a report with it; every change to the digest repeats the check. This
   document is held to the same rule (FTG-22). The hashed scan of (5) needs the deny-list that M-1 builds, so until then
   the integration seat runs, at every integration pass that changes this document, the scripted document checks of
   `docs/validation/bench/doc_checks.py` (VS2-8, VS2-1) — the content checks over the sections the pass changed, the
   structural checks over the whole document:
   (i) *identifiers* — a whole-word, case-sensitive search for the backticked identifiers of
   `research/findings/ftg-payload-visual.md` §7.2 and the one further time-setting message name the round-2 scan
   added — 36 names, which the script reads from the finding or holds research-side, so none is copied into this
   document;
   (ii) *colours* — every six-digit colour value of the document (`#rrggbb` or `0xrrggbb`) looked up, case-insensitive
   and hex-delimited, in `research/` (its text files), `captures/**/README*.md`, `docs/confidence/`,
   `docs/improvements/`, `docs/CONFIDENCE.md` and `docs/IMPROVEMENTS.md`;
   (iii) *token 3-grams* — the lower-cased word tokens of the changed sections against every 3-gram of
   `research/findings/*.md`; a hit is a run of three or more consecutive shared 3-grams (five or more tokens in a row that
   also stand together in a finding) — the size at which a copied list, table row, grammar line or palette shows, while
   a single shared 3-gram ("per 100 m") is ordinary phrasing;
   (iv) *tables* — outside fenced code every line that starts with `|` ends with `|`, and no other line sits between two
   table lines (VS2-1: a table row split over several lines renders as broken rows);
   (v) *pointers* — every `§n` and `§n.m` pointer resolves to a heading of this document.
   Each hit is corrected before the pass lands or reviewed: a reviewed hit is entered in
   `docs/validation/doc-checks-allow.tsv` with its check, its exact text and a written reason (a capture-citation file
   name, a measured number, a creator's sentence under 15 words quoted for traceability, ordinary phrasing, a pointer
   into another document). The script exits non-zero while any hit is unreviewed, the pass does not land until it exits
   zero, and the integration log records its counts. From M-1 the hashed scan of (5) also runs over this document and
   replaces (i)–(iii); (iv) and (v) stay. *Calibration (executed 2026-09-25 on §13–§17 as they stood after round 2):*
   1 196 of 26 236 token 3-grams are shared with the findings and they form 27 runs of five or more tokens — measured
   numbers, ordinary phrases and one quoted creator sentence — a hand review of minutes; (ii) finds none of the
   document's 36 colour values in the sources; (iv) finds exactly the one broken row VS2-1 names. *Chose* scripted
   proxies with a reviewed allow file *over* a hand-run grep *because* round 2's hand-run proxy checked identifiers only
   and so passed any pasted palette or table while the rule read as satisfied (VS2-8).
3. **The repository boundary.** The product is its own repository, `plat/`, at the root of this folder, outside
   `research/`, `captures/` and `reference/`. A PR-tier CI rule fails any import specifier, fixture path, script path or
   build input that resolves outside `plat/` (symbolic links resolved). The product's CI never reads the research trees.
4. **Reference numbers only through `baselines.json`.** Research-side scripts (`research/baselines/`) measure the
   captures and write numbers with provenance (§13.5's `Baseline` rows); the file is committed into
   `plat/packages/testkit/baselines/`, and the parity CLI reads only it. The D-5 panel is assembled research-side from
   the product's PNG exports and the capture images (§13.6).
5. **The content scan.** Research-side, `research/baselines/make_denylist.py` builds the deny-list from the creative
   data the findings and captures record — the references' naming-grammar rule names and terminal words, Markov and
   corpus sample words, palette colour values, FTG's building-type, profession, item and service identifiers and names,
   FTG's Foundry-module message and field names (FTG-22), and texture and image file hashes. The list holds only salted
   SHA-256 digests: of single normalised tokens (lower-cased, diacritics stripped) that are not in the spell-check word list §9.6 already needs,
   of token 3-grams in list order (so a copied table is caught even when every word in it is ordinary), of exact six-digit
   colour values, and of file bytes. `@plat/testkit`'s clean-room scanner digests the same way every token of
   `@plat/tables`, assets, source string literals and comments and the digest, in the PR tier; a hit fails the build
   unless an allow entry with a written reason is reviewed and added. At every milestone the checker seat also runs a
   research-side palette audit: a shipped palette with three or more colours within ΔE2000 2 of one reference palette
   fails and is redesigned. Every file in `plat/assets` names the script that generated it or its third-party licence
   (fonts); a file with neither fails the build.
6. **Honest provenance.** Every table cell's provenance names where its number came from: `own`, `ref:⟨reference⟩
   ⟨behaviour⟩` (a measured or stated behaviour of a reference, admissible as a calibration anchor — for example the
   castle's 0.75 compactness gate (MFCG), 40 m bridge spacing and 39 m tower spacing (FTG), NG's lane-width law, Poisson
   k = 50), `owner`, `owner-eye ⟨milestone⟩`, `architecture ⟨date⟩`, `corpus` or `host`. A number that describes a
   behaviour is a fact; a list, grammar, palette or table is creative content and is never reused.
7. **The record.** `plat/docs/CLEAN-ROOM.md` holds the rule, the seat ledger (which seat read which research file, from
   the lane logs), the digest checker's reports and the deny-list's generation record (date, sources, counts — never the
   tokens).
8. **Sources of algorithms.** Published: Shewchuk predicates; snap rounding (Hobby; Guibas–Marimont; Hershberger);
   arrangement booleans by winding number; Bridson Poisson-disc; Felkel–Obdržálek and Aichholzer straight skeletons;
   Chaikin; Visvalingam–Whyatt; Parish–Müller growth; Lloyd relaxation; marching squares; priority-flood;
   Garbrecht–Martz flat resolution; fBm. With the round-2 and round-3 text (NR-10): the xoshiro128\*\* generator
   (Blackman–Vigna, public domain; §6.1) with Irwin–Hall sums for its normal draws; MurmurHash3's x86 128-bit hash and
   its 32-bit finaliser (Appleby, public domain; H128 in §6.2, `RH32` in §8.1, `H32` in §13.6), checked against the
   SMHasher verification values; Krüger's transverse Mercator series in Karney's formulation, to fourth order in the
   third flattening (Krüger 1912; Karney 2011; §11.1); the van der Corput radical inverse and Morton (Z-order) bit
   interleaving for §8.10's progressive grid ranks; Ulichney's void-and-cluster ranking (1993; §8.10); the monotone-chain
   hull (Andrew) and rotating calipers (Toussaint) for the OBB (§3.1); centripetal Catmull–Rom splines and pinned-vertex
   Laplacian smoothing (§3.1, §4.2, §9.3); Dijkstra's and A\* shortest paths (§3.1, §4.2, §4.3); Brandes' betweenness
   (§4.3); Kruskal's spanning tree (§9.3); Lambert shading (§8.2's hillshade); CIELAB and the CIEDE2000 colour
   difference (Sharma–Wu–Dalal; §8.2); and, for the tests, Pearson's χ² test with Holm's step-down procedure (§13.2),
   Spearman's rank correlation, Moran's I, Kolmogorov–Smirnov distances and SSIM (Wang et al.; §13.4, §13.5). An
   implementer reads each in its published form; the seat ledger of (7) records which. The creators' *stated* ideas:
   twisted bisection, the casing idiom, skeleton labels, the proposal queue, dependency ratios, lazy people, integer
   centimetres — with constants calibrated on our own measurements.
9. **Protocol names (FTG-22).** The host bridge's vocabulary is our own (§11.3): the concurrency token is `logHead`
   (§2.9), carried as `baseLogHead` and `currentLogHead`; time is the view key `time`, set by `view.set`, and the
   simulation module advances it with its own command `sim.advance { hours }` (§10.3, §11.3). Schema-level ideas — an
   event / command split, an optimistic-concurrency token — are admissible as ideas; the FTG module's message, command and
   field names are not reused, are in the deny-list, and occur nowhere in this document (check (i) of (2)).

=== REPLACE Delegated decisions (the owner deferred all judgment; each is final unless vetoed) — row D-18 only (the rest of the section unchanged; set the section banner to name fixall/draft-scope-r3) ===

| D-18 | **Budgets per §12.3 as per-rung laws of the building count — model p95 TOWN ≤ 20 ms + 60 µs × B, CITY ≤ 40 ms + 50 µs × B, METROPOLIS ≤ 100 ms + 52 µs × B (100 / 300 / 800 ms at the targets; O3 (d)'s bars — 100 ms, 300 ms, 1 s — hold for p95 up to ≈ 1 333 / 5 200 / 17 300 buildings (≈ 4 500 / 17 700 / 58 800 people) and, with the max clause that no generation exceeds 1.25 × its own law, up to ≈ 1 000 / 4 000 / 13 460 buildings; above them a declared miss of O3 (d): p95 ≈ 196 ms and ≈ 481 ms at the TOWN and CITY band tops and ≈ 1.92 s at the METROPOLIS cap, §12.3) — with the derivation pool as the primary configuration and the single worker as the pre-decided fallback (measured at M1 at CITY and at M2b at METROPOLIS); time to first map per §12.5 — TOWN ≤ 40 ms + 70 µs × B, CITY ≤ 60 ms + 60 µs × B, METROPOLIS ≤ 120 ms + 62 µs × B — under one second for every TOWN and CITY and for METROPOLIS up to ≈ 14 200 buildings (≈ 48 000 people), ≈ 2.3 s at the 120 000 cap, a declared miss of O12 (g); a per-building cost ≈ 2 × MFCG's at TOWN and CITY and ≈ 5 × at METROPOLIS declared as a trade (§12.9)** — *owner veto on the misses above the knees (the first map's, §12.5, and the model's, §12.3)* | the one-click floor and the references' bars; the trade buys terrain, plots, site plans, roster placement, greenery and labels MFCG does not build, which D-7 ranks above speed; size follows population inside a rung, so the budgets are laws, and the one-click path stays complete at every size; O3 (d)'s model bars are read over every size of a rung, like O12 (g)'s first-map bar | workers assumed without a merge protocol; matching MFCG's per-building cost by dropping plot detail; a preview or a coarser one-click path above the knee | low (numbers); ≈ 1 pw for a district-by-district city band above the knee; medium (architecture) if M0 or M1 miss |

=== REPLACE Delegated decisions (the owner deferred all judgment; each is final unless vetoed) — row D-35 only ===

| D-35 | **Build order: M-1 → M0 → M1 viewable town → M2a editing core → M2b parity (the second preset; METROPOLIS, which generates from M1, measured and tuned) → M3a full editing, migration and API → M3b exports, forms and should-have tiers → M4 hardening and the incremental path → M4b the content module → M5 stage 2; nothing leaves the program** | the owner's weighting orders the build; M3 was overloaded (≈ 31–40 pw itemised against 20–26); the module needs the relation store first (IMP-3) | the lit look before editing; moving exports, forms or the module out of the program | low (a plan) |

=== REPLACE Judgment calls ("chose X over Y because Z"; each vetoable) — the preamble paragraph only (set the section banner to name fixall/draft-scope-r3) ===

J-1 – J-18 are the synthesis seat's (seven amended by the fix-all pass). The rows added on 2026-09-25 keep their
area prefixes — J-K (kernel), J-DET (determinism), J-P (pipeline), J-R (rendering), J-S (scope) — because the blocks
that made them cite them by those ids; the full reasoning of each sits in the section it names. The J-I rows are the
integration seat's: each settles a disagreement between two area drafts (the record is
`docs/validation/fix-all/r1-integration-log.md` §3). Round 2 of the fix-all pass added J-K9 – J-K21, J-DET-16 – J-DET-28, J-P26 – J-P33,
J-R19 – J-R37 and J-S20 – J-S27, and restated J-K2, J-K5, J-K6, J-K8, J-R7, J-R9, J-R17, J-I2, J-I5, J-P3 and J-S4; its
integration seat added J-I9 – J-I11 and amended J-K14 (the record is `docs/validation/fix-all/r2-integration-log.md`
§4, its conflict table). Round 3 added, among others, J-R38 – J-R43 and J-S28 – J-S32 and restated J-R19 and J-S4;
the full list, with the round-3 integration seat's own rows, is in `docs/validation/fix-all/r3-integration-log.md`.

=== REPLACE Judgment calls — row J-R19 (rendering r3 request S10, folded) ===

| J-R19 | Chose the low 64 bits of the entity key — the seed key mixed with the lineage hash, layer and island — as the one key of every render-time hash over the bare lineage hash, the address and the interned handle, because the lineage alone carries no seed and would repeat the same looks at the same derivation positions in every town (VD2-6), the entity key is what every stream of the entity is drawn from, so a New random re-rolls its look with its shape, and handles are session-local, which broke pixel identity across reloads (§8.1; NF-D10). |

=== REPLACE Judgment calls — row J-S4 ===

| J-S4 | Chose byte identity for Regenerate (keep settings) and, for New random, a calibrated rank test — each regenerated statistic's rank among K = 50 from-scratch generations of the same scope, ties broken by a uniform draw, a 10-bin χ² test per statistic with Holm at family-wise 0.01 over a nightly campaign of 800 scopes (400 block, 400 district; VS2-9) — over two-sample KS tests per regeneration and over a fixed 95 % pass rate of an empirical central band, because both of those fail a perfect regenerator (the band passes it only 70–79 % of the time on four statistics, executed) while ranks are exactly uniform for any K: executed with the four statistics correlated at ρ = 0.8, 1.0–1.4 % false campaign failures and ≥ 99.5 % detection of too-snug (0.8 ×, 0.6 ×), too-loose (1.5 ×) and +0.25 sd biased regeneration (≥ 99.3 % even at ρ = 1), where 400 scopes caught only 92–95 %; the randomised tie-break is what keeps a discrete statistic calibrated (without it a perfect regenerator failed every campaign) (IMP-7; §13.2, §15.2 O9 c). |

=== INSERT AFTER Judgment calls — row J-R37 (rendering r3 §3.4 rows J-R38 – J-R43, folded verbatim) ===

| J-R38 | Chose to read O3 (d)'s model-time bars over every size a rung builds and to declare where they hold — p95 up to ≈ 4 500 / 17 700 / 58 800 people, the max (each generation ≤ 1.25 × its own law) up to ≈ 3 400 / 13 600 / 45 800 — and the miss above them for the owner's veto, over reading them at the targets only, because size follows population inside a rung, as N-2 ruled for the first map, and a reading at the targets hides the miss (§12.3; NR-1). |
| J-R39 | Chose explicit passes on `OrderSlot` with most-specific-wins resolution and refusal of any unresolved or tied (semantic, pass), with `derived` entries for the raised under-copy and projected shadows, over one slot per semantic or an order fixed in code, because a way's casing and body must sit in different slots while sheets stay data (§8.2; NR-3). |
| J-R40 | Chose furniture-placement and snap queries answered by the tile worker within one frame — ahead of raster work, tile rasters cut at 8 ms — over copying mark kinds and vertices into the main thread's hit-test slices or placing furniture in the generation worker, because the slices would carry model-sized geometry and the generation worker's index has no kinds, vertices or placed labels (§8.9; NR-4). |
| J-R41 | Chose a transient display list built in the generation worker for SVG exports and released after writing, over handing SVG to the tile worker or keeping a second resident list, because the SVG writer reads the document, which the tile worker never holds, and exports are occasional (§11.1, §12.8; NR-5). |
| J-R42 | Chose a constant stream key for the stamp-tile library — (class, spacing, tile index), `STAGE_VIEW`, `render.stampTiles` — with integer-centimetre points, `dmath` transcendentals and index-order sums and ties, over a seed- or document-keyed library, because the tiles are shared by every document of a session and the per-town variety comes from the stamp's offset, rotation and seed-dependent variant (§8.10; NR-6). |
| J-R43 | Chose a declared PLAT CityJSON Extension for `+platGeoAnchor`, validated in CI against the repository's schema, over a sidecar as the primary, with a `<name>.geoanchor.json` sidecar as the pre-decided fallback, because the extension keeps the anchor inside the one file a GIS user moves around and the sidecar leaves the CityJSON file valid by construction (§11.1; NR-7). |

=== INSERT AFTER Judgment calls — row J-S27 ===

| J-S28 | Chose to generate METROPOLIS from M1 — the rung is a `ladder.json` row on the one pipeline — with M2b measuring and tuning it and its budgets gating from M2b, over "M2b builds METROPOLIS", because M1's goldens, B-CITY runs, determinism tests and diagnostic panel already take all three rungs as inputs, a rung costs no code of its own, and read literally the old wording left M1's gates unable to run a third of their inputs (§1.1, §13.2, §16; VS2-2). |
| J-S29 | Chose `H32(s)` = the first output word of MurmurHash3's x86 128-bit variant over the UTF-8 bytes of `s` with seed 0, over a word-by-word fold through §6.1's lane-0 finaliser, because the published algorithm fixes padding, tail and length handling and has a published verification value that the product CLI and the research-side panel script can each check, and §13.6 (2) now carries check vectors, while a fold through a finaliser whose constants and salt §6.1 does not spell out would still let two faithful readings draw different panels (§13.6 (2); VS2-6). |
| J-S30 | Chose 800 regenerated scopes per nightly faithfulness campaign over 400, because a scope's four statistics move together and, correlated at ρ = 0.8, 400 scopes catch a +0.25 sd bias or 0.8 × snugness on only 92–95 % of nights, while 800 catch them in 2 000 of 2 000 campaigns (executed) for ≈ 6 more CPU-minutes a night; the false-failure rate (1.0–1.4 %) does not depend on n (§13.2; VS2-9). |
| J-S31 | Chose to extend §6.5's allowlist lint to the renderer code that feeds S13b — the `ObstacleSource` and `RoleIndex` implementations, what they call and the S14 writers of the columns they read, found as import closures — over linting all of `@plat/render` or leaving S13b's inputs unlinted, because only these inputs reach a bit-compared digest, while paint programs and backends produce pixels that visual regression compares within a threshold (§6.5 (3), §13.3, §14; VS2-4). |
| J-S32 | Chose scripted pre-M-1 document checks — identifiers, colour values, token 3-gram runs of five or more tokens, table rows and pointers, in `docs/validation/bench/doc_checks.py`, with a reviewed allow file and a non-zero exit — over round 2's hand-run identifier grep, because that grep passed any pasted palette, table or grammar and missed a broken table row, while the 3-gram runs flag a copied list at a size a reviewer clears in minutes (27 runs over §13–§17, executed) (§17.1 (2); VS2-8, VS2-1). |


## 3. Cross-area requests (changes in sections other areas own; the integrator applies them)

### 3.1 Determinism (§2.9, §5.3, §6.1, §6.2, §6.5, §7.3)

| # | section | request | item |
|---|---|---|---|
| D1 | §2.9, beside `Recipe` (`seed: Seed`) | Declare `type Seed = number /* u32, 0 … 2³² − 1 */` with the sentence: "A seed is a u32; records write it as its decimal string (§13.3), permalinks in base 36 (§6.4); the D-5 panel seeds are `H32` values (§13.6 (2))." | VS2-6 |
| D2 | §6.1, the **Enter** bullet | "Enter creates a **new document** with seed + 1" → "Enter creates a **new document** with seed (seed + 1) mod 2³² (a `Seed` is a u32, §2.9)". | VS2-6 |
| D3 | §6.5 (3), after its first sentence's list of model code | Append: "The allowlist also holds for the view code whose output reaches a bit-compared digest (VS2-4): `@plat/labels`, every implementation of `ObstacleSource` and `RoleIndex` (§14), the functions they call, and the S14 builder code that writes the display-list columns they read — `bbox`, the geometry ranges and `GeomTable`, `layer`, `z` and the symbol extents computed from the style sheet's sizes (a rotated symbol's extent uses `dmath`). CI finds that code as the import closure of those implementations and column writers, from the TypeScript program, so a module that joins it is linted without being listed; the rest of `@plat/render` — paint programs, backends, compositing — stays outside, because its output is pixels compared by visual regression (§13.3, §13.4)." | VS2-4 |
| D4 | §7.3 item 7 (iv) | "a campaign of n = 400 regenerated scopes per nightly run (§13.2)" → "a campaign of n = 800 regenerated scopes per nightly run — 400 block, 400 district (§13.2; VS2-9)"; "calibrated (executed: ≈ 1 % false campaign failures at K = 50 and 99) with ≥ 99.5 % detection of too-snug (0.8 ×, 0.6 ×), too-loose (1.5 ×) and biased (+0.25 sd) regeneration" → "calibrated (executed: 1.0–1.4 % false campaign failures) with ≥ 99.5 % detection of too-snug (0.8 ×, 0.6 ×), too-loose (1.5 ×) and biased (+0.25 sd) regeneration with the four statistics correlated at ρ = 0.8 (≥ 99.3 % at ρ = 1; 400 scopes caught only 92–95 %)"; add `docs/validation/bench/fixall_scope_r3_o9c_n800.out` to its receipt list. The determinism r3 draft carries this item's old text (its §7.3 block), so the edit applies to that block after it lands. | VS2-9 |
| D5 | §5.3, the **Cost rule** | "TOWN → METROPOLIS at M2b, which builds METROPOLIS" → "TOWN → METROPOLIS at M2b, which measures METROPOLIS (it generates from M1, §16)". The determinism r3 draft's §5.3 block carries the old wording. | VS2-2 |
| D6 | §6.2, the H128 bullet | "with a fixed seed" → "with seed 0" (or the value the determinism area chooses, stated as a number), so the digest's hash is exactly specified like `H32` (§13.6 (2)); found while defining `H32`, not an open item — an unstated seed would let two faithful implementations compute different digests. | VS2-6 (companion) |

### 3.2 Rendering (§9.2)

| # | section | request | item |
|---|---|---|---|
| R1 | §9.2, where S13b's inputs are named (`ObstacleSource`, `RoleIndex`) | Add: "Both implementations, what they call and the S14 writers of the columns they read are under §6.5 (3)'s allowlist lint, so S13b's inputs are bit-identical on every engine and the placement digests of §13.3 can be compared across the five engines (VS2-4); a symbol's rotated extent is computed with `dmath`, never `Math.cos` or `Math.hypot`." | VS2-4 |

### 3.3 For the integrator (not an area)

1. **Run the scripted document checks of §17.1 (2)** on the integrated text of this round:
   `python3 docs/validation/bench/doc_checks.py --sections "<every section heading key the pass changed>"` from the project
   root. Review each hit; add a reviewed row to `docs/validation/doc-checks-allow.tsv` (check, exact text, reason) or
   correct the text; record the counts in `docs/validation/fix-all/r3-integration-log.md`. This lane's blocks were applied
   to a copy of the document and checked (§4): 0 unreviewed hits over its sections, 0 broken table rows in the whole
   document, every `§` pointer resolved.
2. **Banners.** The ten whole-subsection blocks carry their banner under the heading. For the two row-level sections,
   set the banner line under "# Delegated decisions …" and "# Judgment calls …" to name `fixall/draft-scope-r3` (with the
   round-3 integration seat).
3. **Folded requests.** Mark rendering r3 S1 – S11, pipeline r3 S1 – S3 and S5, determinism r3 SR3-1 – SR3-4 and kernel r3
   X-S1 and X-S3 as applied through this lane's blocks; apply pipeline r3 S4, determinism r3 SR3-5 and kernel r3 X-S2 (all
   judgment-call rows) as targeted edits; settle kernel X-S1 (b)'s deck form against pipeline K8 / J-P40 in §2.2 and §3.3
   — the §13.1 fixture cites §2.2 rule 7 and needs no change either way (§1's note).
4. **Order with the determinism draft.** D3 – D5 above edit text that the determinism r3 draft's blocks replace (§5.3,
   §6.5, §7.3); apply them after those blocks.

## 4. Evidence and what a Fable reviewer should re-check first

* **Read in full:** `docs/validation/fix-all/r2-verify-scope.md` (all 190 lines — no `r2-validate.md` exists), the
  scope sections of the integrated `docs/ARCHITECTURE.md` line by line — the title and one-page summary, §0.4–§0.8, §1
  (l. 201–401), §13 (l. 6657–7191), §14, §15, §16, §17 (l. 7192–7826), the delegated decisions, the judgment calls, the
  staged list and Appendix A (l. 8086–8383) — and, for the items' cross-references, §5.3's cost rule, §6.1, §6.2's H128
  bullet, §6.5, §7.3 item 7 (iv), §8.1's mark table and `RH32` paragraph, and the lines naming each published algorithm;
  `r2-verify-rendering.md`'s NR-1, NR-9 and NR-10; `r3-rendering.md` §0–§1, its §12.3 declaration and its §3 requests;
  `r3-pipeline.md` §3; `r3-determinism.md` §3 (and its §2.9, §5.3, §6.1, §6.5 and §7.3 blocks, for the old wording
  D3 – D5 edit) and `r3-kernel.md` Part 3, both of which landed while this lane worked; the verifier's O9 (c) script and output; `research/findings/ftg-payload-visual.md`
  §7.2's structure (to have the script extract its identifiers — none is copied here) and `profile-mfcg.md`'s seed-chain
  line (MFCG's Park–Miller modulus). Nothing outside the project folder.
* **Executed (CONFIRMED):**
  1. **O9 (c) at n = 800** — `docs/validation/bench/fixall_scope_r3_o9c_n800.py` → `.out` (own code, stdlib, 8 worker
     processes, 8 min): perfect regenerator 31 / 3 000 (ρ = 0.8), 15 / 1 500 (ρ = 0), 14 / 1 000 (heavy ties, ρ = 0.8)
     false campaign failures; +0.25 sd bias and 0.8 × snugness 2 000 / 2 000 each at ρ = 0 and 0.8, 1 985 / 2 000 and
     1 994 / 2 000 at ρ = 1; 0.6 × snug and 1.5 × loose 500 / 500 at ρ = 0.8; the n = 400 reference 922 / 1 000 and
     952 / 1 000, reproducing the round-2 verifier's 92.0 % and 95.0 %.
  2. **`H32`** — `docs/validation/bench/fixall_scope_r3_h32.py` → `.out`: our MurmurHash3 port reproduces SMHasher's
     published verification values for both the x86 32-bit (0xB0F57EE3) and the x86 128-bit (0xB3ECE62A) variants — two
     independent constants, so the port is exact; the check vectors quoted in §13.6 (2) come from it.
  3. **Scripted document checks** — `docs/validation/bench/doc_checks.py` on today's document: C2 0 hits for its 36
     colour values; S1 exactly one broken table row, l. 7636 (VS2-1); S2 only the external `§16.2`. On a copy with this
     lane's blocks applied (the lane's own `apply` script, never the real file): S1 0, S2 only `§16.2`, C1 only the
     `README.md` file name, C3 60 runs over the thirteen changed sections — every one reviewed into
     `docs/validation/doc-checks-allow.tsv` (measured numbers and section pointers, ordinary phrasing, a file path, three
     stated reference behaviours, one short creator quote) — exit 0. A first draft of §17.1 (2) named the time-setting
     message in clear; check C1 caught it and the text was changed before this file landed.
  4. **Block construction** — every block was generated from the current architecture by asserted unique replacements;
     a column-count check over every table in the blocks finds no row with a wrong number of cells; the deferral-language
     scan (TBD, later, defer, postpone, "not yet", placeholder, revisit, "at M0") finds only wording round 2's verifier
     already cleared (owner-roadmap subjects, milestone-bound mechanisms, the unrated-panel rule, ordinary prose).
* **PLAUSIBLE (reasoning only):** VS2-4's cross-engine scenario (argued from the lint's scope, not reproduced); the
  O9 (c) model — correlated normal and binomial statistics stand in for real scope statistics, and the per-scope costs
  are §12.6's laws, not measurements; the 3-gram rule's power against a paraphrased copy (it catches verbatim runs of
  five or more tokens; single-token reuse waits for M-1's hashed scan).
* **Output shifts, stated.** No golden, placement digest or model output moves: the changes are test sizes, record
  schemas, the definition of the D-5 seed hash (no panel has been drawn yet), lint scope and text.
* **What a Fable reviewer should re-check first.** (1) J-S29 — `H32` as the first word of MurmurHash3's x86 128-bit
  variant, where the verifier prescribed a word fold through §6.1's lane-0 finaliser; chosen because that finaliser's
  constants and salt are not stated in §6.1, so the prescribed fold would not have been exact. (2) J-S32 — whether runs
  of five or more shared tokens are the right pre-M-1 threshold (27 runs over §13–§17 today; 60 over this round's
  changed sections, all benign). (3) J-S28 — METROPOLIS generated from M1 while its budgets gate from M2b: the
  cost-model sweep reports METROPOLIS from M1 and gates it from M2b, which the reviewer should confirm matches the owner's
  "a viewable town first" intent for M1.
