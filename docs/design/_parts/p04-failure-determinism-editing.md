## §6 Failure handling — no whole-map discard-and-retry

MFCG restarts the whole city on a canal failure or a 'bad poly' (24 restarts in 58 recorded attempts; ST-8), VG discards whole villages and swaps the seed (4 of 13 highway maps), FTG's V1 "would regularly give up" and its 2026 splitter has no fallback (`_critic-ftg.md` F17; `docs/IMPROVEMENTS.md` O3). The base's policy has four tiers and none of them is a restart:

| tier | mechanism | where | detected by | tested by |
|---|---|---|---|---|
| 0 feasibility by construction | terrain-first water (rivers cannot bend back), area budgets derived from the roster before cutting, claims before fabric, destinations known before growth | P0, P3, P5 | — (design) | B-CITY: restarts = 0, requested features present 100 % |
| 1 typed results + candidate retry | every primitive returns `Ok | Degenerate | Rejected`; a stochastic step retries with the next sub-seed `(seed, stage, entity, attempt)` up to a cap (default 3) | kernel, P3, P7, P9, P10 | result types; attempt counter | B-FUZZ per primitive; per-stage retry rate ≤ 2 %, p99 ≤ 3 attempts |
| 2 fallback ladder | a simpler primitive: bent cut → straight cut on the mean normal → axis cut → substitution (landmark / green / court, NG's rule) → documented omission; growth: shorten segment → change branch type → drop proposal; plots: narrower band → single plot → yard; roofs: skeleton → fake gable → flat | each stage declares its ladder in data | ladder step recorded with a cause code | fallback uses per 1 000 cities reported; ladder coverage test (every step reachable by a fixture) |
| 3 post-stage invariants + local repair | invariant suite runs after each stage; violations trigger *local* repair (weld, re-cut one face, re-site one building, re-route one way) inside a declared scope; unrepairable → omission + report | all | invariant checks (below) | hard-invariant violations per 1 000 cities = 0 |

**Invariant suite** (each a pure function `doc → Violation[]`, run in CI on B-CITY and in the app on every generation): planar subdivision valid (Euler, no crossing, no zero-length edge below weld); every face simple; every polygon simple; minimum width/area per class; every plot has an access edge; every building has an entrance on its access edge; no road centreline crosses a building; no footprint overlap; building ∩ water = ∅; every gate joins the network and the centre; walls not crossed by streets except at gates; exclusive land uses do not overlap; bridges within ± 10° of the channel normal; no branch re-joins its parent within k segments; a sealed enclosure only when declared; every requested feature present; containment complete (building ⊂ plot ⊂ block ⊂ district, 100 %); id uniqueness and reference integrity; every length field carries a unit.

**Failure classes and how each is detected and tested:**

| class | reference precedent | detection | test |
|---|---|---|---|
| geometric degeneracy (sliver, hourglass, self-intersection) | FTG hourglasses, MFCG triangles, NG 42 % discards | typed results + invariants (min angle/width/area) | B-FUZZ; B-CITY counts = 0 |
| topological corruption (duplicate junctions, dangling chains) | FTG "two intersections at one position" | DCEL insertion contract; Euler check | B-EDIT 10⁵ sequences → 0 planarity violations |
| hydrological impossibility (river uphill, no outfall) | FTG "bends back", MFCG canal restarts | drainage invariant | 100 seeds × 10 configurations, 10/10 present |
| infeasible allocation (roster > capacity) | FTG "gives up", MFCG empty areas | bounded reconcile loop, report | convergence ≤ k on 100 % of seeds |
| unreachable destination (gate behind water) | MFCG 28 street failures in 13/34 cities | A* typed `unreachable` → add ford/bridge candidate → else report | requested-vs-built diff shown whenever non-empty |
| time budget overrun | MFCG 7-attempt runs; "browser not responding" | per-stage hard budget → degrade (fewer candidates, coarser terrain) → report | p95/p99 per size class in CI |
| user edit conflict (a pinned way through a pinned building) | FTG "generator doesn't know which ones you edited" | constraint solver reports the conflict as an action | B-EDIT conflict fixtures |

**Generation report** (the same object O16 surfaces): stages and timings, attempts, ladder uses with cause codes, invariant results, requested-vs-built diff, auto-resolved parameters with reasons, sub-seeds used. Every attempt is replayable from its printed key (MFCG's replayable attempts, kept).

---

## §7 Determinism

### 7.1 RNG design (hard-to-reverse; alternatives in §19)

* Engine: **xoshiro128\*\*** (32-bit state × 4; fast in JS without BigInt), seeded by **splitmix32** from a 32-bit **key hash** (MurmurHash3-x86-32 over a canonical byte encoding of the key tuple). The town is a pure function of `(generatorVersion, seed, params, assignments, edits)`.
* **Keyed sub-streams**: `StreamKey = hash(seed, stage, entityId, concern, attempt, epoch)`. Every draw comes from a sub-stream; no stage or entity shares a stream with another; naming, style jitter, content, decoration and geometry are separate `concern`s. Adding a feature (a new concern) therefore changes nothing else; growing a settlement (a new epoch) re-derives nothing that survived; re-rolling one block uses `(block id, attempt+1)` and touches nothing outside it. This is the reference weakness O2 answers (MFCG: one `gates` change re-rolls everything down to the name; NG/VG: one global stream; FTG: `seed: null`).
* **Render-time decoration** (tree instances, pebbles, hatch jitter, roof detail) is seeded by `(entityId, 'decor', lodBand)` and never stored — FTG's area-fill economy with determinism restored.
* **Retries** use `(…, attempt)`; the report prints the key so any attempt is replayable.
* Helpers: `float()`, `int(a,b)`, `bool(p)`, `normal()` (Irwin–Hall 6 — NG's roof jitter is a 6-uniform pseudo-normal, `profile-neighbourhood.md` §3.6), `fuzzy(f)` (the 2017 dial worth keeping), `weighted(table)`, `deck(table)` (draw without replacement — MFCG's `DeckRuleSelector` idea, `profile-mfcg.md` §9).

### 7.2 Permalinks, version axes, reproducibility

* Permalink = `?v=<generatorVersion>&s=<seed>&p=<compact intent/params>` for an unedited town (the one-line permalink all three watabou generators have, kept); an edited town is a document (O9).
* Version axes: `schemaVersion` (document), `generatorVersion` (algorithms + tables), `tableVersions` (each rule table separately; user overrides carry their base version), `styleVersion`. A permalink replays under its recorded `generatorVersion` (pinned builds are kept for the last N releases in the app; the CLI can run any tagged version); an explicit opt-in upgrade replays under the new version and shows a diff (O9 extras).
* Golden seeds per release: the model hash and statistics record for a fixed seed set are committed; a stage untouched by a release stays byte-identical; a legitimate behaviour shift is recorded with its cause (owner non-negotiable 10).
* Cross-platform: §4.1's numeric policy; the CI golden test runs Node x86-64 + arm64 and Chromium/Firefox/WebKit and asserts identical model hashes (O2 a).

---

## §8 Editing and regeneration locality — everything is editable

### 8.1 The edit log

An **`EditEvent`** is the only way state changes after generation; the app's tools, the API, assignments and the evolution engine all emit events:

```ts
type EditEvent =
  | { op: 'lock';       target: Id<any>[]; }                                   // pin: never mutated by regeneration
  | { op: 'unlock';     target: Id<any>[]; }
  | { op: 'moveVertex'; layer: Layer; vertex: number; to: [Cm, Cm]; }        // warp/move (MFCG tools are brushes emitting these)
  | { op: 'warp';       layer: Layer; brush: 'rotate'|'equalize'|'bloat'|'pinch'|'smooth'|'shift'|'random'; centre: [Cm,Cm]; radiusCm: Cm; strength: number; } // expands to moveVertex events at apply time (creator's stated semantics: Equalize = angles, Bloat = larger cells, `_critic.md` C4/C5)
  | { op: 'drawWay';    layer: Layer; polyline: [Cm, Cm][]; wayClass: WayClass; widthCm: Cm; }     // user roads as constraints (split-on-cross, weld)
  | { op: 'drawWater';  polygon: Polygon; waterKind: WaterKind; }
  | { op: 'drawWall';   polyline: [Cm, Cm][]; kind: Wall['kind']; }
  | { op: 'setField';   field: 'prosperity'|'density'; brush: RasterBrush; }                     // the prosperity field is editable
  | { op: 'setAttr';    target: Id<any>; path: string; value: unknown; }                          // rename, recolour, use, storeys …
  | { op: 'regenerate'; scope: Id<'district'|'block'|'plot'>[] | Polygon; keep: 'settings'|'adjust'|'newSeed'; attempt?: number; }
  | { op: 'assign';     assignment: Assignment; }                                                  // §8.4
  | { op: 'convert';    conversion: 'wallToWay'|'gateToJunction'|'outskirtToDistrict'|'demolish'|'build'; target: Id<any>; params?: unknown; }  // EVO
  | { op: 'setTable';   table: string; patch: JsonPatch; }                                        // rule tables and presets are editable (preference layer)
  | { op: 'setStyle';   patch: JsonPatch; };
```

Lifecycle of an edit: **create** (a tool or API call emits it; it is validated against the schema and the invariant suite in a dry run; conflicts are returned as actions, never silently resolved) → **read** (the document is `replay(blueprint, edits)`; a materialised snapshot is cached and rebuilt lazily) → **persist** (edits are stored in order with the `generatorVersion` and table versions they were made under) → **regenerate** (a `regenerate` event runs the owning stages inside the scope only; locked and edited entities are constraints; the same sub-seeds are used unless `newSeed`; people are reconciled, not deleted) → **undo/redo** (the log is the undo stack; every op has an inverse or is replayed from the previous snapshot) → **migrate** (a version migration maps ids and table keys; an edit that no longer applies is kept as `orphaned` and reported, never dropped silently).

### 8.2 Locality guarantees

Regeneration locality rests on three things: keyed sub-streams (§7), stable ids (§3) and stage scoping. Rerolling district D re-runs P7–P14 for D's faces with D's keys; entities outside D are byte-identical (O2 c/d: ≥ 95 % locality on parameter edits, 100 % of ids outside the scope preserved). Faithful regeneration: the scoped run uses the same tables and keys as the original, so a regenerated area is statistically indistinguishable (two-sample KS on density, frontage width, footprint area, p > 0.05 on ≥ 95 %; FTG's "too snug" is the failure, O9 c). "Regenerate (keep settings)", "Adjust" (re-solve with the change), "New random" and "Same kind, new seed" are separate actions (O16).

### 8.3 User-drawn constraints and warp

Drawn ways/water/walls enter the DCEL by the same `splitOnCross + weld` contract as generated ones (FTG's snap-and-split invariant, `docs/CONFIDENCE.md` E1) and are locked by default; the generator solves around them. Warp brushes (MFCG's 8 tools, stated semantics) are vertex-space operations on the DCEL that keep topology (MFCG: warping "can't change the topology" — kept) and are followed by the invariant suite with local repair; a warp that would break an invariant is clamped and reported.

### 8.4 Semantic assignments (ASSIGN hook, designed now)

```ts
interface Assignment {
  id: Id<'assignment'>; granularity: 'building'|'neighbourhood'|'dispersed';
  name?: string; function?: string; shapeClass?: string;          // any subset
  drift: DriftBounds;                                               // e.g. area ± 20 %, storeys ± 1, class within a family
  target?: Id<'building'|'district'>;                               // single or whole-neighbourhood
  dispersed?: { count: number; kind: string; criteria: PlacementCriteria };   // N buildings under criteria
  precedence: 'overClassRules';
}
interface PlacementCriteria { minSpacingM?: M; districts?: Id<'district'>[]; nearM?: { to: 'water'|'gate'|'market'|'centre'|Id<any>; maxM: M }[]; prosperityBand?: string[]; frontageClass?: WayClass[]; }
interface PlacementSolver { solve(doc, a: Assignment): Ok<Id<'plot'>[]> | Rejected<{ reason: string; nearest: number }>; }
```

A whole-neighbourhood assignment sets the district's character and venue mix while individual buildings stay diversified by the class rules within the drift bounds; a dispersed assignment is a constraint-satisfaction pick over candidate plots (greedy with a spacing penalty, deterministic under its sub-stream) that reports infeasibility with the nearest achievable count. Assignments are events (persist, undo, migrate) and take precedence over class rules (O10 e).

### 8.5 Rule tables and presets as editable data

Every table (size ladder, way widths, plot bands, coverage and arrangement, wall spacing, greenery, naming, style sheets, dependency graph) is a versioned JSON file with provenance per value; a user **preference layer** (`setTable` events) sits above the defaults and migrates with them; the default path with no edits is byte-identical to the shipped defaults (O10 h).

