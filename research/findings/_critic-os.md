# _critic-os — second critic seat: TownGeneratorOS (2017) constants, algorithms, RNG order

Seat requested by `_critic.md` §0 / §6.9 ("os-model ↔ os-wards-render constant tables"). Run 2026-09-25 (Fable).
Scope: `research/findings/os-geometry.md`, `os-model.md`, `os-wards-render.md` (read cover to cover) cross-checked
line by line against `reference/TownGeneratorOS/Source/com/watabou/**` (GPL-3, read for VERIFICATION ONLY — at most a
constant or a one-line formula is quoted here, never code). Also read: `_critic.md` §0/§2/§4 (spot-checks 21–24) and
the parts of `profile-mfcg.md` that cite the 2017 source.

Status legend for this file: **CONFIRMED** = checked at the cited source line during this run; **PLAUSIBLE** =
reasoning only. Everything in §1–§4 is CONFIRMED unless a row says otherwise.

## 0. What this seat did and did not do

* Status: **complete** (2026-09-25).
* **Read cover to cover:** `os-geometry.md` (912 lines), `os-model.md` (1 223), `os-wards-render.md` (1 113) — every
  line, in ranges; `_critic.md` in full (§0, §2, §4 spot-checks 21–24 and the §3 rows that summarise the OS files).
  `profile-mfcg.md` was read **only** where it cites the 2017 source (the 27 grep hits for
  `2017|TownGeneratorOS|os-model|os-wards|os-geometry` and their surrounding sections: lines 140–175, 200–225,
  295–320, 405–440, 750–862, 895–905) — not cover to cover.
* **Source read in full:** all of `geom/`, `utils/`, `towngenerator/building/`, `towngenerator/wards/`,
  `towngenerator/mapping/`, `towngenerator/ui/`, `TownScene.hx`, `StateManager.hx`, `Main.hx`, `coogee/Game.hx`,
  `coogee/Scene.hx`, `README.md`, `project.xml` (≈ 3 800 of the tree's 4 416 lines); **not read:**
  `coogee/{Atlas,BitmapText,MovieClip,NinePatch}.hx` (sprite-framework plumbing with no generation content, per all
  three files). Every "no callers" claim was re-checked by grep over `Source/`.
* **Executed:** the MINSTD recurrence and the seed spiral in Python (double precision) to re-check the pin in
  `os-model.md` §1.1/§3.1 — it reproduces to 9 s.f.; the seed formula for ten seeds to bound the size-15 city radius.
  **Not executed:** the Haxe pipeline itself (no Haxe/OpenFL toolchain on this machine, and no numpy for a Voronoi),
  so gate counts, block geometry and the radius figure are derived, not measured. No capture file and no JavaScript
  bundle was opened.
* **Clean-room discipline:** the GPL source was quoted only as single constants or one-line formulas; the Python check
  re-implemented only the published MINSTD recurrence and the three-line spiral formula, in the scratchpad, and is not
  part of the project.
* **Three claims stay PLAUSIBLE, not CONFIRMED,** because they rest on compiler/runtime rules that were not compiled
  here: Haxe static fields not being inherited through `Reflect.field` (random vs rated placement of Craftsmen/Park),
  Haxe's optional-argument skipping in `lineStyle(…, false, null, CapsStyle.NONE)`, and `ObjectMap` key order in
  `Graph.aStar`.
* **Result in one line:** the three OS files are numerically sound — of 141 constant rows, 132 are SUPPORTED and the
  8 WRONG rows are all wording/arithmetic slips in one file that another file already has right; 18 cross-file
  contradictions were found (13 RESOLVED at the source line, 4 RECONCILED, 1 OPEN-narrowed); 20 algorithm
  spot-checks (16 SUPPORTED, 4 UNSUPPORTED in whole or part); the draw order in `os-model.md` §9 is verified complete
  with two additions; four addenda were appended (§5).

## 1. Consolidated constants table (2017 pipeline)

Columns: the value each findings file states (with §; "—" = not stated in that file) | value in source (file:line, paths
relative to `reference/TownGeneratorOS/Source/com/watabou/`) | verdict. **SUPPORTED** = every file that states it
states it correctly; **WRONG** = at least one file states a different value (the right value is given); **MISSING** =
stated by no file. Every source cell was read at the cited line during this run (CONFIRMED) unless marked PLAUSIBLE.
Line numbers in the findings files are quoted as they appear there; where a findings file cites a line that is off by
one or two, the value itself was still checked and the citation drift is ignored.

### 1.1 PRNG (`utils/Random.hx`)

| # | constant | os-geometry | os-model | os-wards-render | source | verdict |
|---|---|---|---|---|---|---|
| 1 | LCG multiplier `g` | 48271.0 (§1.5, §3.1) | 48271.0 (§1.1, §10) | 48271 (§10) | `Random.hx:7` = `48271.0` (Float) | SUPPORTED |
| 2 | modulus `n` | 2147483647 (§1.5, §3.1) | same (§1.1) | same (§10) | `Random.hx:8` | SUPPORTED |
| 3 | initial seed | 1 (§3.1) | 1 (§1.1) | `seed₀ = 1` (§10) | `Random.hx:10` | SUPPORTED |
| 4 | `reset(-1)` | `Date.now().getTime() % n` (§3.1) | same (§1.1) | — | `Random.hx:12-13` | SUPPORTED |
| 5 | `float()` | `next()/n ∈ (0,1)` (§3.1) | same (§1.1) | same (§10) | `Random.hx:20-21` | SUPPORTED |
| 6 | `normal()` | mean of 3 floats, Irwin–Hall(3) (§3.1) | same, 3 draws (§1.1) | same (§10) | `Random.hx:23-24` | SUPPORTED |
| 7 | `int(min,max)` | `Std.int(min + next()/n·(max−min))`, max exclusive (§3.1) | same (§1.1) | same (§10) | `Random.hx:26-27` | SUPPORTED |
| 8 | `bool(c)` default | `float() < c`, c = 0.5 (§3.1) | same (§1.1) | — | `Random.hx:29-30` | SUPPORTED |
| 9 | `fuzzy(f)` | `f==0 ? 0.5 : (1−f)/2 + f·normal()` (§3.1) | same, "NO draw" when f = 0 (§1.1) | same (§10) | `Random.hx:32-37` | SUPPORTED |
| 10 | executed pin: seed 682063530 → `next()` 816864473, 917733616, 1626707620, 63972465, 2080857276, 808948665, 1065854814, 464511768; bools T/T/F; `sa` = 0.187173; r₁ = 12.97, r₂ = 14.75, r₃ = 17.49, r₁₁₉ = 283.2; half-extent ≈ 346 | — | all (§1.1, §3.1, §3.4) | — | re-executed in this run (Python, double arithmetic): identical to 9 s.f.; bbox x ∈ [−346.2, 288.1] | SUPPORTED (CONFIRMED) |
| 11 | README live link is `?size=15&seed=682063530` | — | §1.1 | — | `README.md:2` | SUPPORTED |

### 1.2 Sizes, URL, view (`Model.hx`, `StateManager.hx`, `TownScene.hx`, `Main.hx`, `ui/*`)

| # | constant | os-geometry | os-model | os-wards-render | source | verdict |
|---|---|---|---|---|---|---|
| 12 | size buckets | — | Small Town 6–9, Large Town 10–14, Small City 15–23, Large City 24–39, Metropolis ≥ 40 (§1.2) | Small Town **6–10**, Large Town **10–15**, Small City **15–24**, Large City **24–40**, ≥ 40 (§8.4) | `TownScene.hx:28-31` buttons (6,10) (10,15) (15,24) (24,40); `CitySizeButton.hx:15` `min + Std.int(Math.random()·(max−min))` ⇒ **max exclusive**; `StateManager.hx:48-57` labels `[6,10) [10,15) [15,24) [24,40) [40,∞)`; `Model.hx:24-28` comment 6/10/15/24/40 | os-model SUPPORTED; **os-wards-render WRONG** (button rolls are 6–9 / 10–14 / 15–23 / 24–39; size 40 is reachable only via the URL) |
| 13 | default `nPatches` | — | 15 (§1.2) | 15 (§8.4) | `Model.hx:72` | SUPPORTED |
| 14 | URL clamp | size [6,40], seed > 0 (§1.3) | same (§1.2) | same (§8.4) | `StateManager.hx:23, 26` | SUPPORTED |
| 15 | button size roll uses `Math.random()` | — | §1.2 | §8.4 | `CitySizeButton.hx:15` | SUPPORTED |
| 16 | view scale | — | `(scMax/scMin > 2 ? scMax/2 : scMin)·0.5` (§1.3, §10) | same (§9.7) | `TownScene.hx:51-55` | SUPPORTED |
| 17 | UI scale | — | `Std.int(screenDPI/24)` (§1.3, §10) | same (§9.7) | `Main.hx:30-32` | SUPPORTED |
| 18 | window 800×800, fps 120, background 0xccc5b8 | §0.1 | — | §9.7 | `project.xml:14-15` | SUPPORTED |
| 19 | Button 45×13, label at x=5, y=(13−8)>>1=2; column gap 1 px, top-right | — | — | §9.7 | `Button.hx:17-18, 27`; `TownScene.hx:36, 57-58` | SUPPORTED |
| 20 | Tooltip: bitmap `w+4 × h+2`, text at (2,1), follows mouse at (+4, +0) | — | — | §9.7 | `Tooltip.hx:40-41, 51-52` | SUPPORTED |
| 21 | UI font `letterSpacing 1`, `baseLine 8` | — | §8.7 | §9.7 | `Main.hx:22-23` | SUPPORTED |

### 1.3 Stage 1 `buildPatches` + `geom/Voronoi.hx`

| # | constant | os-geometry | os-model | os-wards-render | source | verdict |
|---|---|---|---|---|---|---|
| 22 | seed count | `nPatches·8` (§2.2.1) | same (§3.1, §10) | same (§10) | `Model.hx:101` | SUPPORTED |
| 23 | spiral angle | `a = sa + 5·√i` (§2.2.1) | same (§3.1) | same (§10) | `Model.hx:102` | SUPPORTED |
| 24 | spiral radius | `r = 10 + i·(2+U)`, `i=0 → 0` (§2.2.1) | same + "no draw at i = 0" (§3.1, §9) | same (§10) | `Model.hx:103` (lazy ternary) | SUPPORTED |
| 25 | spiral phase | `sa = U·2π` (§2.2.1) | same (§3.1) | — | `Model.hx:100` | SUPPORTED |
| 26 | relaxation, literal | 3 passes, `toRelax = points[0..2] ++ [points[nPatches]]` (§2.2.1) | same (§3.3, §10) | "3 iterations over the first 3 points plus point nPatches" (§10) | `Model.hx:109-113` | SUPPORTED (literal) |
| 27 | relaxation, effective | the three leading entries are frame corners ⇒ no-ops; one mid-ring seed per pass, drifting (§2.2.1) | relaxed seeds = spiral indices **nPatches−4, −3, −2**, one Lloyd step each, never the centre, never the citadel (§3.3, §13.3) | — | `Voronoi.hx:27-28` (`points = [c1,c2,c3,c4]` first), `:50` (append), `:139-149` (`relax` removes the seed and **pushes** its centre), `:152-171` (`build` re-frames) — re-derived here: after pass k the element at index `nPatches` is original index `nPatches−4+k` | SUPPORTED for os-geometry/os-model; **os-wards-render §10 states only the literal indices — a re-implementer following §10 alone relaxes the wrong seeds** (addendum written) |
| 28 | Voronoi frame padding | bbox ± 25 % of extent per side (§2.2) | same (§3.2, §10) | — | `Voronoi.hx:163-166` (`dx = (maxx−minx)·0.5`, frame at `minx − dx/2`) | SUPPORTED |
| 29 | bbox sentinels | `1e+10` / `−1e+9` (§2.2) | — | — | `Voronoi.hx:153-156` | SUPPORTED |
| 30 | frame corners and initial triangles | c1(minx,miny) c2(minx,maxy) c3(maxx,miny) c4(maxx,maxy); (c1,c2,c3), (c2,c3,c4) (§2.2) | same (§3.2) | — | `Voronoi.hx:23-30` | SUPPORTED |
| 31 | in-circle predicate | `distance(p, c) < r`, strict (§2.2) | same (§3.2) | — | `Voronoi.hx:45` | SUPPORTED |
| 32 | circumcentre formula, NaN when parameter `p1.y == p2.y` | §2.2 | §3.2 | — | `Voronoi.hx:190-205` — note `c`/`r` use the **parameter** order, the CW/CCW swap at `:187-188` does not affect them | SUPPORTED |
| 33 | `Region.center()` = mean of incident circumcentres (cell-vertex mean, not area centroid) | §2.2 | §3.2 | — | `Voronoi.hx:229-234` | SUPPORTED |
| 34 | `Region.sortVertices` comparator ⇒ CCW (y-up) cycle starting at +90° | §1.2, §2.2 | "increasing CCW angle" (§2) | — | `Voronoi.hx:247-260` — re-derived: x<0 half first; within a half `sign(x2·y1 − x1·y2) = −sign(cross(v1,v2))` ⇒ ascending CCW | SUPPORTED |
| 35 | sort patches by `\|seed\|`; region 0 → plaza (if `plazaNeeded`); region `nPatches` → citadel (if `citadelNeeded`); `count < nPatches` → `inner`, `withinCity`, `withinWalls = wallsNeeded` | §2.2.1 | §3.4 | §6.3 | `Model.hx:115-143` | SUPPORTED |
| 36 | `center` = vertex of patch 0 nearest the origin | — | §3.4 | — | `Model.hx:128` | SUPPORTED |

### 1.4 Stage 2 `optimizeJunctions`

| # | constant | os-geometry | os-model | os-wards-render | source | verdict |
|---|---|---|---|---|---|---|
| 37 | merge threshold | — | 8 world units (§4, §10) | 8.0 (§0.1, §10) | `Model.hx:321` | SUPPORTED |
| 38 | merge = midpoint (`v0 += v1; v0 *= 0.5`), `v1` rebound everywhere, removed from `w`; scope `inner` (+ citadel); dedupe pass | — | §4 | §0.1 | `Model.hx:310-343` | SUPPORTED |
| 39 | after a collapse the scan skips the pair (`v0`, old `index+2`) | — | §4 ("two consecutive short edges are not both collapsed") | — | `Model.hx:317-333` (`index++` unconditional) | SUPPORTED |

### 1.5 Stage 3 `buildWalls` (`CurtainWall.hx`, `wards/Castle.hx`)

| # | constant | os-geometry | os-model | os-wards-render | source | verdict |
|---|---|---|---|---|---|---|
| 40 | wall smoothing factor | `min(1, 40/patches.length)` (§1.5, §2.1.3) | same, **= 1 for every reachable size** (§5.2, §10) | — | `CurtainWall.hx:32`; `inner.length = nPatches ≤ 40` (`StateManager.hx:23`, `TownScene.hx:31`) | SUPPORTED (os-model's saturation note is right) |
| 41 | `smoothVertex(v,f) = (prev + f·v + next)/(2+f)` | §2.1.3 | §5.2 | §1 | `Polygon.hx:144-151` | SUPPORTED |
| 42 | vertices pinned during wall smoothing (`reserved`) | "**gates**, citadel junctions" (§2.1.3 table) | citadel vertices (§5, §5.2) | — | `Model.hx:148` `reserved = citadel.shape.copy()`; smoothing at `CurtainWall.hx:31-36` runs **before** `buildGates` at `:41` | **os-geometry WRONG** — gates do not exist yet and are not pinned; they are smoothed a second time afterwards (addendum written) |
| 43 | gate smoothing weight | default 1.0 (§2.1.3) | `f = 1` (§5.3, §10) | (§0.1) | `CurtainWall.hx:109`; default at `Polygon.hx:144` | SUPPORTED |
| 44 | entrance rule | — | not reserved **and** touched by > 1 walled patch; single-patch wall → every non-reserved vertex (§5.3, §10) | castle case (§6.3) | `CurtainWall.hx:49-55` | SUPPORTED |
| 45 | gate draw | — | `Random.int(0, entrances.length)` ∈ [0, len−1], one per gate (§5.3, §9) | — | `CurtainWall.hx:61` | SUPPORTED |
| 46 | gate spacing | — | remove self ± 1 **in the entrance list** (cyclic), loop while ≥ 3 remain ⇒ ≈ ⌊E/3⌋ gates, min 1 (§5.3, §10) | "3 candidates removed per gate" (§11) | `CurtainWall.hx:90-101` — re-checked: E ∈ {1,2} ⇒ 1 gate; E = 3..5 ⇒ 1; E = 6..8 ⇒ 2 | SUPPORTED |
| 47 | outer-ward split at a gate | — | only when `real` && exactly 1 outer ward && `> 3` vertices; `farthest` maximises `(v−gate)·out/\|v−gate\|` with `out = (wall.y, −wall.x)`; halves replace the patch in place (§5.3, §10) | (`split` row, §1) | `CurtainWall.hx:65-87`; `ArrayExtender.hx:91-96` | SUPPORTED |
| 48 | `"Bad walled area shape!"` sites | §1.4 | two sites (§11 #1, #2) | §8.3, §11 | `CurtainWall.hx:57-58` and `:103-104` | SUPPORTED as sites; **os-model §11's claim that site 2 "is possible when 1 ≤ entrances.length < 3" is WRONG** — the `do … while` at `:60-101` pushes a gate before testing, so `gates.length ≥ 1` always and site 2 is unreachable (addendum written) |
| 49 | towers | — | every non-gate wall vertex (`segments` all true) (§5.4) | same (§9.6) | `CurtainWall.hx:112-122`, `:39` | SUPPORTED |
| 50 | `this.real = true` regardless of the argument | — | §5.2, §13.2 | — | `CurtainWall.hx:23` | SUPPORTED |
| 51 | countryside cull | — | `p.shape.distance(center) < 3·border.getRadius()` (buggy `distance`) (§5, §10) | §1.1, §10 | `Model.hx:155-157` | SUPPORTED |
| 52 | citadel gate | 0.75 (§1.5, §2.1.1) | 0.75 → throw (§5, §10, §11) | 0.75 (§6.3, §10) | `Model.hx:165-166` | SUPPORTED |
| 53 | `compactness = 4πA/P²`; comment 1.00 / 0.79 / 0.60 | §2.1.1 | §5 | §1 | `Polygon.hx:45-52` | SUPPORTED |
| 54 | Castle `reserved` = citadel vertices touching any non-city patch | — | §5.5 | §6.3 | `Castle.hx:17-21` | SUPPORTED |
| 55 | castle wall aliases `citadel.shape` (single-patch branch) | — | §5.2 | — | `CurtainWall.hx:26-27` | SUPPORTED |
| 56 | Castle bailey inset | — | `shrinkEq(MAIN_STREET·2 = 4.0)` (§5.5, §8.6, §10) | 4.0 (§6.3, §10) | `Castle.hx:25` | SUPPORTED |
| 57 | Castle ortho parameters | — | `√A·4`, fill 0.6 (§8.6, §10) | same (§6.3, §10) | `Castle.hx:26` | SUPPORTED |
| 58 | Castle is constructed (gates drawn from `Random`) **before** the compactness throw | — | code quoted, not remarked (§5) | — | `Model.hx:161-167` | MISSING as a remark — matters for §4 (a rejected citadel still consumes its gate draws) |
| 59 | tower radius (render) | — | 1.8 city / 2.7 castle (§5.4) | same (§9.6, §10) | `CityMap.hx:96-97`, `Brush.hx:9` | SUPPORTED |

### 1.6 Stage 4 `buildStreets` (`Topology.hx`, `geom/Graph.hx`, `Model.hx:211-306`)

| # | constant | os-geometry | os-model | os-wards-render | source | verdict |
|---|---|---|---|---|---|---|
| 60 | edge cost = Euclidean length, symmetric | — | §6.1 | — | `Topology.hx:63-64`; `Graph.hx:94-99` | SUPPORTED |
| 61 | blocked = citadel vertices ∪ wall vertices − gates | — | §6.1 | — | `Topology.hx:33-38` | SUPPORTED |
| 62 | `inner`/`outer` exclusion sets exclude border vertices | — | §6.1 | — | `Topology.hx:52-61` | SUPPORTED |
| 63 | street end = nearest plaza vertex, else `center` | — | §6.3 | — | `Model.hx:223-225` | SUPPORTED |
| 64 | street excludes `outer`, road excludes `inner` | — | §6.1, §6.3 | — | `Model.hx:227, 243` | SUPPORTED |
| 65 | road tail = node nearest `gate.norm(1000)` | — | §6.3, §10 | — | `Model.hx:232-241` | SUPPORTED |
| 66 | roads only for `border.gates` (castle gates get none) | — | §6.3 | — | `Model.hx:231` | SUPPORTED |
| 67 | `"Unable to build a street!"`; road `null` silently dropped | §1.4 | §6.3, §11 | §8.3, §11 | `Model.hx:244-248` | SUPPORTED |
| 68 | `aStar`: `openSet` is an `Array`, popped FIFO (`shift`), no heuristic, closed on first pop, `exclude` pre-seeds the closed set, path returned goal → start | §2.3 | §6.2 | — | `Graph.hx:26-33, 37-38, 59-66` | SUPPORTED (see §2 C10 for profile-mfcg's contrary description) |
| 69 | street smoothing | `smoothVertexEq(3)`, endpoints pinned (§1.5, §2.1.3) | same (§6.5, §10) | `f = 3` (§1) | `Model.hx:213-217` | SUPPORTED |
| 70 | `tidyUpRoads`: skip segments with both ends on the plaza; directed identity dedupe; LIFO chaining onto artery ends only | — | §6.4 | — | `Model.hx:257-306` | SUPPORTED **except** the direction wording — see §2 C6 |

### 1.7 Stage 5 `createWards`

| # | constant | os-geometry | os-model | os-wards-render | source | verdict |
|---|---|---|---|---|---|---|
| 71 | `WARDS` deck: 36 entries; Craftsmen 21, Slum 5, Merchant 2, Patriciate 2, Market 2, Cathedral 1, Administration 1, Military 1, Park 1; index listing | — | §7.2 | §8.1 | `Model.hx:35-42` — recounted per line: 6 + 5 + 5 + 5 + 5 + 5 + 5 = 36 | SUPPORTED |
| 72 | deck shuffle | — | `Std.int(36/10) = 3` adjacent swaps, `Random.int(0, 35)` ∈ [0,34] (§7.1, §10) | same (§8.1) | `Model.hx:363-368` | SUPPORTED |
| 73 | `Slum` after the deck is exhausted | — | §7.1, §7.2 | §8.1 | `Model.hx:374` | SUPPORTED |
| 74 | inner gate-ward probability | — | 0.5 walled / 0.2 unwalled, per **border** gate, per touching patch that is `withinCity && ward == null` (§7.1, §10) | same (§6.8, §10) | `Model.hx:354-359` | SUPPORTED |
| 75 | outskirts | — | per **wall** gate, skip with prob `1/(nPatches−5)`; promoted patches `withinCity = true`, `GateWard` (§7.4, §10) | same (§6.8, §10) | `Model.hx:392-399` | SUPPORTED |
| 76 | Farm rule | 0.7 gate (§1.5) | `bool(0.2) && compactness ≥ 0.7`, draw always happens (§7.4, §10) | same (§6.7, §10) | `Model.hx:409-411` | SUPPORTED |
| 77 | `cityRadius` = max `\|v\|` over `withinCity` patches | — | §7.4 | §9.7 | `Model.hx:402-407` | SUPPORTED |
| 78 | selection = `unassigned.min(rate)`, first minimum wins; `+∞` for assigned | — | §7.3 | §7 | `Model.hx:382-384`; `ArrayExtender.hx:38-50` | SUPPORTED |
| 79 | `rateLocation`: Cathedral | — | plaza-fronting → `−1/A` "**largest** patch wins"; else `distance·A` (§7.3) | plaza-fronting → `−1/A` prefers the **smaller** patch; else `distance·A` (§7) | `Cathedral.hx:19-22` — `min(−1/A)`: −1/10 = −0.1 < −1/100 = −0.01 ⇒ **smallest** A | **os-model WRONG**, os-wards-render right (addendum written) |
| 80 | `rateLocation`: Administration | — | `plaza ? (borders ? 0 : distance(plaza.center)) : distance(center)` (§7.3) | same (§7) | `AdministrationWard.hx:16-21` | SUPPORTED |
| 81 | `rateLocation`: Merchant / Slum | — | `distance(plaza.center or center)` / negated (§7.3) | same (§7) | `MerchantWard.hx:16-18`, `Slum.hx:16-18` | SUPPORTED |
| 82 | `rateLocation`: Market | — | `+∞` if any `inner` Market borders; else `A/plazaA` or `distance(center)` (§7.3) | same (§7) | `Market.hx:54-62` | SUPPORTED |
| 83 | `rateLocation`: Military | — | 0 borders citadel / 1 borders wall / else (neither exists ? 0 : +∞) (§7.3) | same (§7) | `MilitaryWard.hx:18-26` | SUPPORTED |
| 84 | `rateLocation`: Patriciate | — | over all `model.patches` with a ward: −1 per Park, +1 per Slum (§7.3) | same (§7) | `PatriciateWard.hx:16-26` | SUPPORTED |
| 85 | classes without an own `rateLocation` → `unassigned.random()` (1 draw) via `Reflect.field` | — | §7.3 | §8.2 | `Model.hx:375-380`; `Ward.hx:123` base returns 0 | SUPPORTED as read; the static-inheritance premise is PLAUSIBLE (target-dependent, both files say so) |
| 86 | `isEnclosed(p) = withinCity && (withinWalls \|\| every neighbour withinCity)` | — | §3.4 | §3.4 | `Model.hx:432-434` | SUPPORTED |
| 87 | all `distance()`-based scores use the first-vertex bug | §2.1.1 | §13.1 | §1.1, §7 | `Polygon.hx:155-164` (`d` never updated) | SUPPORTED |

### 1.8 Stage 6 `buildGeometry` (`wards/*.hx`, `Cutter.hx`, `Polygon.hx`)

| # | constant | os-geometry | os-model | os-wards-render | source | verdict |
|---|---|---|---|---|---|---|
| 88 | `MAIN_STREET / REGULAR_STREET / ALLEY` | 2.0 / 1.0 / 0.6 (§1.5) | same (§8.1, §10) | same (§3.1, §10) | `Ward.hx:18-20` | SUPPORTED |
| 89 | `getCityBlock` insets: wall 1.0; plaza frontage 1.0 (**inner patches only**); artery 1.0; other inner 0.5; other outer 0.3; `innerPatch = wall == null \|\| withinWalls` | table (§2.1.4; plaza row omits the inner-only condition) | §8.1 | §3.3 (complete) | `Ward.hx:37-54` | SUPPORTED (os-geometry's plaza row is incomplete, not wrong) |
| 90 | convex → `shrink`, else `buffer` | §2.1.4 | §8.1 | §3.3 | `Ward.hx:56-58` | SUPPORTED |
| 91 | `createAlleys`: longest edge, first strict maximum | — | §8.3 | §4.1 | `Ward.hx:127-135` | SUPPORTED |
| 92 | ratio | — | `spread = 0.8·gridChaos`; `ratio = (1−spread)/2 + U·spread` (§8.3, §10) | same (§4.1, §10) | `Ward.hx:137-138` | SUPPORTED |
| 93 | angle jitter | — | `angleSpread = π/6·gridChaos·(A < 4·minSq ? 0 : 1)`, `b = (U−0.5)·angleSpread` ⇒ ±π/12·gridChaos; draw always taken (§8.3, §10) | same (§4.1, §10) | `Ward.hx:141-142` | SUPPORTED (`_critic.md` §3 writes "angle π/6·gridChaos" = the full spread, not the half-range) |
| 94 | alley gap | `cut(gap)` peels each half by `gap/2` (§2.1.5) | `split ? ALLEY : 0` (§8.3) | same (§4.1) | `Ward.hx:144`; `Polygon.hx:506-509` | SUPPORTED |
| 95 | leaf test | — | `A < minSq·2^(4·sizeChaos·(U−0.5))`; "at sizeChaos = 0.8 that is a **16×** range" (§8.3) | factor ∈ [2^(−2s), 2^(+2s)]: 0.33×…3.03× at 0.8 (§4.2) | `Ward.hx:148` — at s = 0.8 the ratio is 2^3.2 ≈ **9.2×**; 16× needs s = 1.0 | **os-model WRONG** on the 16× (addendum written) |
| 96 | `emptyProb` default; leaf dropped with prob `emptyProb` | — | 0.04 (§8.3, §8.6) | 0.04 (§4.4, §6.2) | `Ward.hx:125, 149-150`; `CommonWard.hx:13` | SUPPORTED |
| 97 | recursive `split` flag | — | `A > minSq/(U·U)` (§8.3) | same + `P(alley) = 1 − 1/s − (ln s)/s` (§4.3) | `Ward.hx:152`; the closed form re-derived: P(U₁U₂ ≤ t) = t − t·ln t | SUPPORTED (table values 0.15/0.40/0.67/0.85/0.94 re-computed) |
| 98 | termination guard | none (§1.4 says failures "collapse into" a rebuild — see §2 C1) | none; `cut` ≠ 2 ⇒ same polygon again (§13.4) | none; not caught by the `Error` retry (§4.5) | `Polygon.hx:513-514`; `Ward.hx:152` | SUPPORTED for os-model/os-wards-render |
| 99 | `createOrthoBuilding` | — | `ratio = 0.4 + 0.2U`; axis = the one of `c1,c2` with smaller `\|v·c\|`; leaf `A < minBlockSq·2^(normal·2−1)`; keep with prob `fill`; `while(true)` retry (§8.4, §10) | same + early-out `A < minBlockSq → [poly]` (§5) | `Ward.hx:162-197` | SUPPORTED |
| 100 | `filterOutskirts` | — | factor 1 / 0.4; density gate 1, `2U`, 0; `minDist` init 1; keep iff `fuzzy(1) > minDist/p` (§8.5) | same, incl. comment/code discrepancy and signed-distance note (§3.4) | `Ward.hx:61-119` (comment at `:92-93` says 1, code at `:96` says `2·Random.float()`) | SUPPORTED |
| 101 | Common-ward parameters: Craftsmen `10+80UU / 0.5+0.2U / 0.6 / 0.04`; Merchant `50+60UU / 0.5+0.3U / 0.7 / 0.15`; Patriciate `80+30UU / 0.5+0.3U / 0.8 / 0.2`; Administration `80+30UU / 0.1+0.3U / 0.3 / 0.04`; Slum `10+30UU / 0.6+0.4U / 0.8 / 0.03`; GateWard `10+50UU / 0.5+0.3U / 0.7 / 0.04`; Military `√A·(1+U) / 0.1+0.3U / 0.3 / 0.25` | — | §8.6 | §6.2 | `CraftsmenWard.hx:11-13`, `MerchantWard.hx:11-14`, `PatriciateWard.hx:11-14`, `AdministrationWard.hx:11-13`, `Slum.hx:11-14`, `GateWard.hx:11-13`, `MilitaryWard.hx:12-15` — all 28 numbers checked | SUPPORTED |
| 102 | constructor draw order `minSq` U,U then `gridChaos` U | — | §9 | — | Haxe left-to-right argument evaluation on the lines above | SUPPORTED (PLAUSIBLE only in that it rests on the language rule) |
| 103 | Market | — | statue 0.6; offset = statue ‖ 0.3; `rect(1+U,1+U)` rotated to the longest edge; `circle(1+U)`; offset `lerp(centroid, mid(longest edge), 0.2+0.4U)` (§8.6, §10) | same, "no `getCityBlock`" (§6.5) | `Market.hx:17-49` | SUPPORTED |
| 104 | Cathedral | — | ring 0.4, thickness `2+4U`; else ortho(50, 0.8); label "Temple" (§8.6, §10) | same (§6.4) | `Cathedral.hx:12-14, 24` | SUPPORTED |
| 105 | Park | 0.7 (§1.5) | `compactness ≥ 0.7 ? radial : semiRadial`, gap `ALLEY` (§8.6) | same (§6.6) | `Park.hx:8-11` | SUPPORTED |
| 106 | Farm | — | `rect(4,4)`; `lerp(random vertex, centroid, 0.3+0.4U)`; rotate `U·π`; ortho(8, 0.5); no fields (§8.6, §10) | same (§6.7) | `Farm.hx:12-17` | SUPPORTED |
| 107 | `Cutter.bisect` | — | `p1 = lerp(v, next, ratio)`, cut ⟂ to the edge rotated by `angle` (§8.2) | same (§2.1) | `Cutter.hx:13-27` | SUPPORTED |
| 108 | `Cutter.radial` / `semiRadial` / `ring` | — | sectors shrunk `[gap/2, 0, gap/2]`; semi: `gap /= 2`, centre = vertex nearest the centroid, sides shrunk only where not polygon edges; ring: slices sorted ascending by edge length, returns the peels, core discarded (§8.2) | same (§2.2-2.4) | `Cutter.hx:29-90` | SUPPORTED |
| 109 | `Polygon.circle` = `regular(16, r)`; `regular` default n = 8 | §2.1.6 | §10 | §1 | `Polygon.hx:534-541` | SUPPORTED |
| 110 | `Polygon.DELTA` | 1e-6 (§1.5) | same (§10) | same (§1.3) | `Polygon.hx:13` | SUPPORTED |
| 111 | `cut` return order = `[left of p1→p2, right]`; `shrink`/`peel` keep `[0]` | §2.1.5 (one hand case) | §8.2 | §1.4 (two hand cases) | `Polygon.hx:511-513` — general argument re-derived here: `cross(cutDir, edge1) > 0` ⟺ edge1 crosses right→left ⟺ the vertices after it (`half1`) lie left | SUPPORTED |
| 112 | `inset` clamps 0.99·\|v0\| (convex) / 0.5·\|v1\| (concave); `inset`/`insetAll`/`insetEq` unused | §2.1.4 | §13.8 | §1 | `Polygon.hx:211-215, 221-226`; grep: `.inset(` only inside `insetAll` (`:233`) | SUPPORTED |
| 113 | `Polygon.distance(p)` returns the distance from vertex 0 | §2.1.1 | §13.1 | §1.1 | `Polygon.hx:155-164` | SUPPORTED |
| 114 | `buffer`: joints unhandled (chamfer at reflex corners), crossings inserted twice, largest loop kept, `lastEdge` never reset | §2.1.4 | §8.1 | §1.3 | `Polygon.hx:246-339` | SUPPORTED (chamfer-at-reflex re-derived: convex corners self-intersect and are resolved, reflex ones are bridged) |

### 1.9 Rendering (`mapping/*.hx`)

| # | constant | os-geometry | os-model | os-wards-render | source | verdict |
|---|---|---|---|---|---|---|
| 115 | eight palettes, 32 hex values | — | DEFAULT values + seven names (§8.7) | full table (§9.1) | `Palette.hx:17-24` — all 32 values compared | SUPPORTED |
| 116 | active palette `CityMap.palette = DEFAULT`, static | — | — | §9.1 | `CityMap.hx:21` | SUPPORTED |
| 117 | strokes NORMAL 0.300 / THICK 1.800 / THIN 0.150 (unused) | §1.5 | §8.7, §10 | §9.2, §10 | `Brush.hx:8-10`; grep: `THIN_STROKE` has no readers | SUPPORTED |
| 118 | Brush defaults `strokeColor 0x000000`, `fillColor 0xcccccc`; `color == −1` ⇒ stroke with fill colour; `JointStyle.MITER` default; `palette`/`lastDark`/`lastPaper` never read | — | — | §9.2 | `Brush.hx:12-23, 35`; grep confirms | SUPPORTED |
| 119 | layer order roads → patch views → hot areas → walls (city wall then castle wall) | — | §8.7 | §9.3 | `CityMap.hx:34-79` | SUPPORTED |
| 120 | road casing | "wide-**dark** then narrow-paper" (§2.4, §5) | `MAIN_STREET + NORMAL_STROKE` in `palette.medium`, `MAIN_STREET − NORMAL_STROKE` in paper (§8.7) | 2.3 medium / 1.7 paper, `CapsStyle.NONE` on the casing (§9.6, §10) | `CityMap.hx:82-86` (`palette.medium`) | **os-geometry WRONG** on the colour word (medium, not dark); widths SUPPORTED (addendum written) |
| 121 | only `model.roads` are stroked; streets are negative space | §2.4 | §8.7 | §9.3 | `CityMap.hx:34-38` | SUPPORTED |
| 122 | `drawBuilding` double pass: castle `NORMAL·2 = 0.6` visible outline, cathedral 0.3 | — | §8.7 | §9.4-9.5 | `CityMap.hx:48-51, 116-127` | SUPPORTED |
| 123 | houses: fill light, 0.3 dark miter stroke per building; Park: fill medium, stroke = fill; plain `Ward` view never added | — | §7.4 | §9.4 | `CityMap.hx:52-61, 65-66` | SUPPORTED |
| 124 | wall `THICK 1.8` dark; gate bar `THICK·2 = 3.6` thick, half-length `THICK·1.5 = 2.7` (5.4 long), **along** the wall | — | "bar … **across** the wall" (§8.7) | along the wall (§9.6) | `CityMap.hx:107-114` (`dir = next(gate) − prev(gate)`) | **os-model WRONG** ("across"; the bar is tangent to the wall) (addendum written) |
| 125 | hot area `beginFill(0,0)` over the whole patch; `MOUSE_OVER`; tooltip label from `getLabel()` | — | — | §9.6 | `PatchView.hx:23-34` | SUPPORTED |
| 126 | labels: Administration, Castle, Temple, Craftsmen, Farm, Gate, Market, Merchant, Military, Park, Patriciate, Slum; base `null` | — | — | §9.6 | `wards/*.hx` `getLabel` | SUPPORTED |
| 127 | `lineStyle(thickness, color, false, null, CapsStyle.NONE)` "oddity" | — | — | flagged, consequence UNKNOWN (§9.6, §13.4) | `CityMap.hx:82, 108` | SUPPORTED as a description; closable — Haxe skips an optional parameter whose type does not match the argument, so `false` binds to `pixelHinting`, `null` to `scaleMode`, `NONE` to `caps`, alpha stays 1 (PLAUSIBLE: language rule, not compiled here) |

### 1.10 Utilities and dead code (`utils/*.hx`, `geom/{Spline,Circle,Segment}.hx`)

| # | constant | os-geometry | os-model | os-wards-render | source | verdict |
|---|---|---|---|---|---|---|
| 128 | `Spline.curvature = 0.1`, zero callers | §1.5, §2.4 | §6.5, §10 | §12 | `Spline.hx:11`; grep | SUPPORTED |
| 129 | `PerlinNoise`: canonical 256 table, seeding by rotation, 256-entry quintic ease LUT, `hash & 3` gradients, `noise` ignores `gridSize`, `noiseHigh` broken (+`trace`), `noiseMapHigh` is the working fBm; zero callers | §3.7 | — | — | `PerlinNoise.hx:4-35, 51-78, 128-140, 142-174`; grep | SUPPORTED; **MISSING**: the defaults `gridSize = 1`, `persistance = 0.5` (`:90, 128, 142`) are not written down anywhere (low value — dead code) |
| 130 | `ArrayExtender.shuffle` (insertion shuffle, 1 draw per element), `random` (1 draw), `weighted` (1 draw) | §3.2 | — | — | `ArrayExtender.hx:4-27` | SUPPORTED; grep: `shuffle`/`weighted` have no pipeline callers (`weighted` only from dead `MarkovChain`), `random()` at `Farm.hx:13`, `Model.hx:379` |
| 131 | `ArrayExtender.equals` wrong, no callers; `replace` unguarded | §3.2 | — | — | `ArrayExtender.hx:137-147, 91-96`; grep | SUPPORTED |
| 132 | `MathUtils.sign(NaN) = +1`, `gate(NaN) = max` | §3.3 | — | — | `MathUtils.hx:4-14` | SUPPORTED |
| 133 | `ObservableInt` "drives the city-size UI" | §3.6 | — | — | grep: `Observable`/`ObservableInt` referenced only inside `Observable.hx` | **os-geometry WRONG** — nothing in `Source/` uses it (addendum written) |
| 134 | `Graph.calculatePrice` returns NaN for paths ≥ 3, no callers | §2.3 | §6.2, §13.6 | — | `Graph.hx:68-86`; grep | SUPPORTED |
| 135 | `Voronoi.getNeighbours` / `Region.borders` (early return) unused; `triangulation()` unused | §2.2 | — | — | grep: only `Model.getNeighbours` (`Model.hx:433`) is called | SUPPORTED |
| 136 | `StringUtils.genitive` compares a char to the whole string; no callers | §3.9 | — | — | `StringUtils.hx:26`; grep | SUPPORTED |
| 137 | `Circle`, `ObjectPool`, `Stopwatch`, `PixelCache`/`BitmapUtils` duplication — no callers | §2.6, §3.9 | — | §12 | grep | SUPPORTED |
| 138 | `MarkovChain`: package `com.watabou.mythology`, `isTerminal` default never true, no callers | §3.8 | — | — | `MarkovChain.hx:1, 48`; grep | SUPPORTED |
| 139 | `GeomUtils.distance2line` = signed `cross(d, p0−p1)/‖d‖` | §2.5 | — | §3.4 | `GeomUtils.hx:30-31` (expanded form re-simplified) | SUPPORTED |
| 140 | `Node.links` is a `Map<Node,Float>`; `aStar` iterates `current.links.keys()` — the neighbour order (hence BFS tie-breaks and the exact street) depends on the target's `ObjectMap` key order | — | — | — | `Graph.hx:41, 90` | **MISSING** in all three files — a determinism hazard for seed-exact reproduction (§4) |
| 141 | size-15 `cityRadius` "on the order of 150–250 units" | — | executed seeds: the 16th-nearest seed sits at r ≈ 48 (§3.1) | 150–250 `[INFERRED]` (§0.3) | seed formula re-run for 10 seeds: 16th-nearest seed radius 42.5–48.8; cells there are ≈ 6.25·√15 ≈ 24 units across | **os-wards-render UNSUPPORTED** — the inner city plus its gate-ward ring reaches ≈ 60–95 units, not 150–250 (PLAUSIBLE estimate: the Voronoi vertices were not computed — no numpy on this machine; addendum written) |

**Tally for §1:** 141 rows; **SUPPORTED 132**, **WRONG 8** (rows 12, 42, 48, 79, 95, 120, 124, 133; plus row 141
UNSUPPORTED-estimate), **MISSING 2** (rows 58/140 as remarks; row 129's defaults are a sub-item). No stated constant in
os-model §10 or os-wards-render §10 disagrees with the source; the two files' constant tables agree with each other on
every number they both state.

## 2. Contradictions between os-geometry / os-model / os-wards-render (and profile-mfcg.md where it relies on 2017)

Verdict key as in `_critic.md` §2: **RESOLVED** = one side is refuted at the cited source line; **RECONCILED** = both
are right about different aspects; **OPEN** = cannot be settled from the corpus. Rows C1–C9 and C11–C15 are between the
three OS files (or inside one of them); C10 and C16 involve `profile-mfcg.md` / `_critic.md` where they rely on the 2017
source.

| # | subject | file A says | file B says | verdict |
|---|---|---|---|---|
| C1 | what the retry loop catches | `os-geometry.md` §1.4: a NaN circumcentre, a `cut()` with ≠ 2 crossings, an `aStar` that returns `null` … "all collapse into 'discard this town, build another'"; §2.2: a broken cavity `a[-1]` → "crash (→ §1.4 retry)" | `os-model.md` §11, §13.4 and `os-wards-render.md` §1.4, §4.5, §11: `cut` ≠ 2 is a **silent no-op** (returns the polygon), only `openfl.errors.Error` is caught, a road `null` is silently dropped, stack overflow / null dereference escape the loop | **RESOLVED for B.** `Polygon.hx:513-514` returns `[new Polygon(this)]`; `Model.hx:244-245` drops a null road; the only throws are `CurtainWall.hx:58, 104`, `Model.hx:166, 248`; `Model.hx:82` is `catch (e:Error)`. Caveat (PLAUSIBLE): on the Flash target `TypeError` extends `flash.errors.Error`, so null dereferences *would* be caught there; on the HTML5/desktop targets of this snapshot they escape. Addendum in os-geometry. |
| C2 | vertices pinned during wall smoothing | `os-geometry.md` §2.1.3 table: `reserved` vertices = "**gates**, citadel junctions" | `os-model.md` §5, §5.2: `reserved` = the citadel's vertices | **RESOLVED for B.** `Model.hx:148` `reserved = citadel.shape.copy()`; the smoothing at `CurtainWall.hx:31-36` runs before any gate exists (`buildGates` is called at `:41`); gates are then smoothed **again** at `:107-109`. Addendum in os-geometry. |
| C3 | Cathedral among plaza-fronting patches | `os-model.md` §7.3: `−1/A` ⇒ "the **largest** patch wins (−1/A is most negative for big A)" | `os-wards-render.md` §7: `−1/s` "is more negative for a **smaller** patch ⇒ prefers the small patch on the square", with a warning against the opposite reading | **RESOLVED for B.** `Cathedral.hx:19-21` minimises `−1/A`; −1/10 = −0.10 < −1/100 = −0.01. The temple takes the smallest plaza-fronting patch. Addendum in os-model. |
| C4 | `sizeChaos` threshold range | `os-model.md` §8.3: factor in `[2^(−2s), 2^(+2s)]` … "At `sizeChaos = 0.8` that is a **16×** range" | `os-wards-render.md` §4.2: at 0.8 the factor is 0.33× … 3.03× | **RESOLVED for B.** `Ward.hx:148`: 2^(±1.6) ⇒ ratio 2^3.2 ≈ 9.2×; 16× would need `sizeChaos = 1`. Addendum in os-model. |
| C5 | size-button ranges | `os-model.md` §1.2: Small Town 6–9, Large Town 10–14, Small City 15–23, Large City 24–39 | `os-wards-render.md` §8.4: 6–10, 10–15, 15–24, 24–40 | **RESOLVED for A.** `CitySizeButton.hx:15` `min + Std.int(Math.random()·(max−min))` never yields `max`; `StateManager.hx:48-57` labels the same half-open buckets. Addendum in os-wards-render. |
| C6 | direction of streets and roads | `os-model.md` §6.2: `buildPath` returns goal → start, so "a street's `[0]` is the destination (plaza/centre) and its last element is the gate" | `os-model.md` §6.4 (same file): "streets run gate→plaza and roads run far→gate", hence shared runs traversed in opposite directions are not deduplicated | **RESOLVED for §6.2.** `Graph.hx:59-66` pushes from the goal back to the start; `Model.hx:227` `buildPath(gate, end)` ⇒ `[plaza … gate]`; `:243` `buildPath(start, gate)` ⇒ `[gate … outer]`. Consequence a designer must not lose: every street runs **plaza → gate**, so the central corridors shared by several streets are traversed in the *same* direction and **are** de-duplicated by `tidyUpRoads`; the un-deduplicated case is confined to a street and a road, which share only the gate vertex. Addendum in os-model. |
| C7 | gate bar orientation | `os-model.md` §8.7: "a `THICK_STROKE × 2` bar of length `THICK_STROKE × 3` **across** the wall" | `os-wards-render.md` §9.6: `dir` runs **along** the wall — a locally thickened wall segment | **RESOLVED for B.** `CityMap.hx:110-113`: `dir = wall.next(gate) − wall.prev(gate)`, the bar is drawn from `gate − dir` to `gate + dir`, i.e. tangent to the wall. Addendum in os-model. |
| C8 | road casing colour | `os-geometry.md` §2.4 and §5: "wide-**dark** then narrow-paper" | `os-model.md` §8.7, `os-wards-render.md` §9.6: casing in `palette.medium` | **RESOLVED for B.** `CityMap.hx:82` `lineStyle(MAIN_STREET + NORMAL_STROKE, palette.medium, …)`. Addendum in os-geometry. |
| C9 | which seeds the relaxation touches | `os-wards-render.md` §10 ("everything a re-implementer must hard-code"): "relaxation 3 iterations over the first 3 points plus point nPatches"; `_critic.md` §3 row: "3 relax passes on **central cells**" | `os-model.md` §3.3, §13.3 and `os-geometry.md` §2.2.1: the first three entries are frame corners (no-ops); the seeds actually moved are spiral indices `nPatches−4, −3, −2`, one step each; the central cells are untouched | **RESOLVED for B** — re-derived in this run from `Voronoi.hx:27-28` (frame corners occupy `points[0..3]`), `:50` (real seeds appended), `:139-149` (`relax` removes the relaxed seed and pushes its centre to the end), `:152-171`. Addendum in os-wards-render. `_critic.md` §3's "central cells" wording is the intent, not the behaviour. |
| C10 | the 2017 `Graph.aStar` open set | `profile-mfcg.md` §4.5: "literally the 2017 `Graph.aStar` … the 2017 A* uses `Map` for `openSet`/`cameFrom`/`gScore` and a linear `min` over `keys()`"; §12.2: "unchanged, including the O(V) `keys()` open-set scan" | `os-geometry.md` §2.3, `os-model.md` §6.2: `openSet` is an `Array`, popped FIFO with `shift()`, no `min`, no heuristic, closed on first pop | **RESOLVED for B for the 2017 half.** `Graph.hx:27` `openSet:Array<Node> = [start]`, `:33` `openSet.shift()`, `:41` `for (neighbour in current.links.keys())`. The only `keys()` call is the neighbour iteration, which is enough to make `ObjectMap.keys` hot in a profile; the recorded hotness therefore does **not** evidence a min-scan, and whether the live open set is FIFO or priority-ordered stays unknown from call counts alone (OPEN for the live half). Addendum in profile-mfcg. |
| C11 | how often a cut opens an alley | `os-model.md` §8.3: `U·U` is "strongly biased toward 0, so the divisor is usually large and the test usually **false** → deeper levels are usually hairline" | `os-wards-render.md` §4.3: `P(alley) = 1 − 1/s − (ln s)/s` — 0.40 at `s = 4`, 0.67 at 10, 0.94 at 100 | **RECONCILED.** Same law (`Ward.hx:152`; closed form re-derived). Alleys are *likely* while the piece is ≳ 4–10 house-areas and unlikely near house size; A's "usually false" is only true for the last levels, its conclusion ("alleys mostly at the top") is the same as B's. |
| C12 | wall smoothing strength | `os-geometry.md` §2.1.3: "more walled patches → smaller f → heavier smoothing" | `os-model.md` §5.2, §10: `min(1, 40/len)` "**= 1 for all shipped sizes**" | **RECONCILED.** A describes the formula, B the shipped range: `inner.length = nPatches ≤ 40` (`StateManager.hx:23`, `TownScene.hx:31`) so `f = 1`, i.e. `(prev + v + next)/3`, everywhere reachable. |
| C13 | `Triangle` winding | `os-model.md` §2: the constructor "normalises each triangle to CCW" | `os-geometry.md` §2.2: `s = −2A`, kept when `s > 0` ⇒ **clockwise** in the y-up frame, which is what the source's `// CCW` means on a y-down screen | **RECONCILED** (frame ambiguity). `Voronoi.hx:184-188`; and `c`/`r` at `:190-205` are computed from the **parameter** order, so the swap never affects circumcentres. |
| C14 | does the `Castle` constructor draw? | `os-model.md` §9 (createWards block): "Cathedral / Market / MilitaryWard / Park / Ward / Farm / **Castle** → 0 draws" | `os-model.md` §9 (buildWalls block): "Castle → CurtainWall(citadel).buildGates: 1 `int()` per castle gate" | **RESOLVED for the buildWalls line.** `Castle.hx:17` builds a `CurtainWall`, whose `buildGates` draws at `CurtainWall.hx:61`; `Castle` is never instantiated inside `createWards`, so the createWards line is merely misplaced. Addendum in os-model. |
| C15 | reachability of the second `"Bad walled area shape!"` | `os-model.md` §11: site 2 "possible when `1 ≤ entrances.length < 3` on entry" | `os-wards-render.md` §11 lists both sites without a reachability claim | **RESOLVED against A.** `CurtainWall.hx:60-63` is a `do { … gates.push(gate) … } while`, so at least one gate is pushed before `:103` is reached; site 2 is dead code. Addendum in os-model. |
| C16 | size-15 city radius | `os-wards-render.md` §0.3 `[INFERRED]`: "`cityRadius` on the order of 150–250 units" | `os-model.md` §3.1 (executed): 16th-nearest seed at r ≈ 48; cloud half-extent 346 | **OPEN, narrowed.** Re-run of the seed formula for 10 seeds: 16th-nearest seed radius 42.5–48.8; local cell size ≈ 6.25·√15 ≈ 24 ⇒ inner-city vertices ≈ 55–65 units, with the gate-ward ring ≈ 60–95. A's figure is 2–3× high; exact value needs a Voronoi (no numpy here). Addendum in os-wards-render. |
| C17 | `ObservableInt` usage | `os-geometry.md` §3.6: "Drives the city-size UI" | (no other file mentions it) | **RESOLVED against A.** grep: `Observable`/`ObservableInt` are referenced only inside `utils/Observable.hx`; the size UI is `CitySizeButton` + `StateManager`. Addendum in os-geometry. |
| C18 | angle-jitter shorthand | `_critic.md` §3: "angle π/6·gridChaos" | `os-model.md` §8.3, `os-wards-render.md` §4.1, `profile-mfcg.md` §4.9: jitter `±π/12·gridChaos` | **RECONCILED.** `Ward.hx:141-142`: `angleSpread = π/6·g` is the full width, `b = (U−0.5)·angleSpread` ∈ ±π/12·g. |

Not contradictions, recorded so a synthesiser does not re-litigate them: `os-geometry` §2.1.4's inset table omits the
"inner patches only" condition on plaza frontage (`Ward.hx:45`), which `os-wards-render` §3.3 has; `os-model` §5 says
the radius cull runs before the castle "so castle gate-splitting adds patches back afterwards" — the split adds *new*
halves of an adjacent patch, it does not restore culled ones; `os-model` §7.3 lists `GateWard`, `Farm`, `Castle`,
`CommonWard` among "placed by `unassigned.random()`" — true of the lookup, but only `CraftsmenWard` and `Park` ever
reach that branch (the others are not in the deck).

## 3. Algorithm-description spot-checks

Method: the algorithm description in the findings file was re-read against the `.hx` at the cited lines, and where the
description makes a derived claim (ordering, side, count) the derivation was redone by hand in this run. **SUPPORTED**
= the description is what the code does; **UNSUPPORTED** = it is not, with the correction. 20 checks.

| # | algorithm | findings § | verdict |
|---|---|---|---|
| S1 | Voronoi construction (`build` → frame → `addPoint` Bowyer–Watson with directed cavity edges → `partioning`) and `relax` | os-geometry §2.2; os-model §3.2–3.3 | **SUPPORTED**, incl. the frame-offset consequence for `Model.buildPatches` (re-derived: passes relax original indices `nPatches−4, −3, −2`). One precision added: the circumcentre uses the constructor's *parameter* order (`Voronoi.hx:190-205`), so the CW/CCW normalisation cannot cause the NaN case by itself. |
| S2 | `Polygon.cut(p1,p2,gap)`: infinite line, exactly-two-crossings rule, `peel` by `gap/2`, return order | os-geometry §2.1.5; os-wards-render §1.4; os-model §8.2 | **SUPPORTED.** Hand case (unit square, cut +x at y = 0.5) reproduced: `half1` = top, returned first. The general statement "`[0]` = left of `p1→p2`" holds for any polygon with exactly two crossings because the test `cross(cutDir, edge1) > 0` is exactly "edge1 crosses from right to left", and `half1` is the run of vertices after edge1. |
| S3 | `shrink` (sequential half-plane cuts keeping `[0]`), `peel`, `buffer` (offset → self-intersection insertion → largest loop) | os-geometry §2.1.4; os-wards-render §1.2–1.3 | **SUPPORTED.** Re-derived that at a *convex* corner the two full-length offset segments cross (resolved by the insertion pass) and at a *reflex* corner they diverge and are bridged by the joint chord — os-wards-render's "reflex corners are chamfered" is the right way round. |
| S4 | `smoothVertex` / `smoothVertexEq` (Jacobi, closed-loop wrap) and the street use with pinned endpoints | os-geometry §2.1.3; os-model §6.5 | **SUPPORTED** (`Polygon.hx:144-151, 166-177`; `Model.hx:213-217`). |
| S5 | `split`/`spliti` keep both endpoint objects; used once at `CurtainWall.hx:84` | os-geometry §2.1.5; os-model §5.3 | **SUPPORTED** (`Polygon.hx:450-462`; grep: one caller). |
| S6 | `Topology`: one node per vertex object, edge cost = length, `blocked` returns `null` so no edge touches a wall/citadel vertex except gates; `inner`/`outer` exclude border vertices | os-model §6.1 | **SUPPORTED** (`Topology.hx:33-80`). Nuance: the citadel's outward vertices are `withinCity` (citadel) *and* countryside but are blocked, so os-model's "a vertex in both lists cannot occur" holds for every usable node. |
| S7 | `Graph.aStar` = FIFO breadth-first with g-score relaxation only while a node is still open; `exclude` pre-seeds the closed set; path returned reversed | os-geometry §2.3; os-model §6.2 | **SUPPORTED** (`Graph.hx:25-66`). **Addition (MISSING in all files):** neighbour order comes from `current.links.keys()` on a `Map<Node,Float>` (`Graph.hx:41, 90`), so BFS tie-breaks — and therefore which of several equal-hop streets is chosen — depend on the target's `ObjectMap` iteration order. |
| S8 | `buildStreets` + `tidyUpRoads` artery stitching | os-model §6.3–6.4 | **SUPPORTED except direction** — see §2 C6: streets are `[plaza … gate]`, roads `[gate … outer]`; shared central runs are deduplicated. The LIFO first-fit chaining, the plaza-run skip and the "junctions become artery ends" reading are as described (`Model.hx:257-306`). |
| S9 | `createAlleys` termination | os-model §8.3, §13.4; os-wards-render §4.5 | **SUPPORTED.** No depth or area guard; the only escapes from a failed cut are the re-rolled `ratio`/`angle` (new line next call) and the re-rolled leaf threshold (`Ward.hx:138, 142, 148`); a stack overflow is not an `openfl.errors.Error`. |
| S10 | `createOrthoBuilding` | os-model §8.4; os-wards-render §5 | **SUPPORTED** (`Ward.hx:162-197`): frozen axes `c1`, `c2 = rot90(c1)`; cut through `p1 + c` with `c` the axis less aligned with the current longest edge; `normal()·2 − 1` exponent; `while(true)` retry; early-out below `minBlockSq`. |
| S11 | `filterOutskirts` | os-model §8.5; os-wards-render §3.4 | **SUPPORTED** (`Ward.hx:61-119`), including the comment/code disagreement at `:92-96` (comment "1", code `2·Random.float()`), the signed `distance2line`, and the 0.4 factor for an unenclosed city neighbour. |
| S12 | `CurtainWall.buildGates` / `buildTowers` | os-model §5.3–5.4 | **SUPPORTED** with one correction: the second `"Bad walled area shape!"` (`CurtainWall.hx:103-104`) is unreachable (§2 C15). Gate count for E entrances: 1 for E ≤ 5, ⌊E/3⌋ for E ≥ 6 (re-derived from `:92-101`). |
| S13 | `Model` retry loop and throw sites | os-geometry §1.4; os-model §11; os-wards-render §8.3, §11 | **SUPPORTED for os-model/os-wards-render** (four throw sites, three flags drawn once before the loop, PRNG never reseeded, `plaza`/`citadel` not reset). os-geometry §1.4's list of what "collapses into" a rebuild is **UNSUPPORTED** (§2 C1). |
| S14 | `rateLocation` scoring per ward and the `min`/`+∞` convention | os-model §7.3; os-wards-render §7 | **SUPPORTED** for Administration, Merchant, Slum, Market, Military, Patriciate; **os-model UNSUPPORTED** for Cathedral (§2 C3). |
| S15 | `optimizeJunctions` | os-model §4 | **SUPPORTED** (`Model.hx:308-344`), incl. the skipped pair after a merge and the cross-patch rebinding of `v1`. |
| S16 | `Region.sortVertices` ⇒ CCW (y-up) polygons with positive `square` | os-geometry §1.2, §2.2; os-wards-render §0.2 | **SUPPORTED** (comparator re-derived; `Polygon.rect` shoelace = +w·h re-computed). |
| S17 | executed PRNG / spiral pin | os-model §1.1, §3.1, §3.4 | **SUPPORTED — CONFIRMED** by re-execution (all eight `next()`, eight `float()`, three bools, `sa`, r₁–r₃, r₁₁₉, half-extent 346). |
| S18 | `lineStyle(thickness, color, false, null, CapsStyle.NONE)` | os-wards-render §9.6, §13.4 (UNKNOWN) | **SUPPORTED as read; the UNKNOWN is closable.** Haxe skips optional parameters whose type does not match the supplied argument, so the call binds `pixelHinting = false`, `scaleMode = null`, `caps = NONE`, `alpha = 1` — exactly the values the file recommends. PLAUSIBLE (language rule; nothing compiled here). |
| S19 | size-15 `cityRadius` ≈ 150–250 | os-wards-render §0.3 | **UNSUPPORTED** (§2 C16): ≈ 60–95 by the seed formula (PLAUSIBLE estimate). |
| S20 | `ObservableInt` drives the city-size UI | os-geometry §3.6 | **UNSUPPORTED** (§2 C17): no callers. |

Tally: 20 checks — **16 SUPPORTED** (S1–S12 with S8/S12 carrying a correction, S15–S18), **4 UNSUPPORTED in part or
whole** (S13 for os-geometry §1.4, S14 for os-model's Cathedral line, S19, S20).

## 4. Random draw order in Model.build (determinism bound)

### 4.1 Completeness of the draw inventory (CONFIRMED by grep over `Source/`)

Every call into the seeded stream is one of: `Random.float` (29 sites), `Random.bool` (11), `Random.int` (2),
`Random.normal` (1, `Ward.hx:176`), `Random.fuzzy` (1, `Ward.hx:117`), and the three `ArrayExtender` wrappers
(`random()` at `Farm.hx:13` and `Model.hx:379`; `shuffle`/`weighted` have no pipeline callers). **None of
`geom/Voronoi.hx`, `geom/Polygon.hx`, `geom/Graph.hx`, `building/Topology.hx`, `building/Cutter.hx`, `mapping/*.hx`,
`TownScene.hx` draws from `Random`.** Outside `Model.build()` the stream is touched only by `Random.reset`/`getSeed`
(`Model.hx:71`, `StateManager.hx:33-34`, `CitySizeButton.hx:22`); the size-button roll uses `Math.random()`
(`CitySizeButton.hx:15`), which is outside the seed. So the answer to "does any ward/geometry code draw outside the
stated order" is **no**: every draw is inside the `Model.build()` call tree, in program order.

### 4.2 The order, verified line by line (`os-model.md` §9 is correct; corrections and additions in bold)

```
Model.new                      Random.reset(seed) only if seed > 0             Model.hx:71
  bool, bool, bool             plazaNeeded, citadelNeeded, wallsNeeded          :74-76   (drawn ONCE; retries reuse them)
  do { build() } while failed                                                    :78-85   (stream continues, never reseeded)

buildPatches                   float (sa); then one float per seed i = 1 … 8n−1 :100-103 (i = 0: lazy ternary, no draw)
                               Voronoi build ×4, sort, partioning: 0 draws

optimizeJunctions              0 draws

buildWalls
  CurtainWall(border)          int(0, |entrances|) once per accepted gate        CurtainWall.hx:61   (also when unwalled)
  **Castle(citadel)**          **int(…) once per castle gate — BEFORE the compactness test at Model.hx:165, so a
                               rejected citadel has already consumed its gate draws** (Castle.hx:17 → CurtainWall.hx:61)

buildStreets / tidyUpRoads     0 draws (Topology, Graph, smoothing)

createWards
  plaza → Market               0
  for gate in border.gates, for patch in patchByVertex(gate) [= model.patches order, Model.hx:206-208]:
      bool(wall == null ? 0.2 : 0.5) only if patch.withinCity && ward == null   :355-357 (short-circuit)
      GateWard ctor: float, float (minSq), float (gridChaos)                    GateWard.hx:12-13
  3 × int(0, 35)               deck swaps                                         :363-368
  per remaining patch (deck order, then Slum):
      no own rateLocation  → float (unassigned.random())                        :379-380 (exactly one in practice)
      own rateLocation     → 0
      ctor: Craftsmen/Merchant/Patriciate/Slum/Administration → float,float,float; Cathedral/Market/Military/Park → 0
  if wall: per wall gate: bool(1/(n−5)); if it fails, per ward-less touching patch: GateWard ctor (3)   :393-398
  per patch in model.patches order, not withinCity, ward == null: bool(0.2)  [compactness only if true]   :404-411

buildGeometry — per patch in model.patches order (sorted by |seed|, halves spliced in place at gate splits):
  Ward 0 · Park 0
  Market      bool(0.6); [if !statue] bool(0.3); statue ? float,float : float; [if offset] float      Market.hx:17-46
  Cathedral   bool(0.4); ring → float (thickness) | else createOrthoBuilding                          Cathedral.hx:12-14
  Castle      createOrthoBuilding on shrinkEq(4)                                                     Castle.hx:25-26
  Farm        float (vertex pick), float (lerp t), float (rotation), then createOrthoBuilding          Farm.hx:13-17
  Military    float (minSq), float (gridChaos), then createAlleys (no filterOutskirts)                 MilitaryWard.hx:12-15
  CommonWard  createAlleys, then filterOutskirts iff !isEnclosed                                       CommonWard.hx:22-28

  createAlleys (depth-first):  float (ratio), float (angle — always, even when angleSpread = 0);
      for each half in cut order: float (leaf threshold); leaf → bool(emptyProb); else float,float (split) then recurse
  createOrthoBuilding: [early-out A < minBlockSq: 0 draws]; per slice: float (ratio); per half: normal (3) then
      bool(fill) or recurse; whole slice retried while the result is empty
  filterOutskirts: per patch vertex, in shape order: float iff not a gate and all touching patches withinCity;
      then per building, in geometry order: fuzzy(1) = 3 floats
```

### 4.3 What bounds seed-exact reproduction

A port reproduces a 2017 map for a given seed only if it matches **all** of:

1. the MINSTD arithmetic in double precision (`Random.hx:17-18`; product < 2^53, exact) — CONFIRMED by the pin in §1 row 10;
2. the lazy evaluation points: the `i == 0` ternary, `Random.bool(0.2) && compactness`, `patch.withinCity && ward == null && Random.bool(…)`, `statue || Random.bool(0.3)`, `Random.fuzzy(0)`;
3. Haxe's left-to-right argument evaluation for the three-draw ward constructors and for `GeomUtils.interpolate(random(), centroid, 0.3 + U·0.4)` in `Farm.hx:13`;
4. the iteration orders that decide *which* object receives a draw: `model.patches` (sorted by `|seed|` with `MathUtils.sign` — ties are float-exact and practically absent — then mutated in place by `ArrayExtender.replace` at gate splits and by the radius cull), `patchByVertex` (patches order), `border.gates`/`wall.gates` (draw order), `unassigned` (`inner` order), `entrances` (wall-vertex order), `halves` (cut side order), `geometry` (emission order);
5. **the target's `ObjectMap` key order** in `Graph.aStar` (`current.links.keys()`), which fixes BFS tie-breaks and hence the exact street polylines, hence `arteries`, hence `getCityBlock` insets and every downstream cut — not stated in any findings file (§1 row 140);
6. the `Reflect.field` static-lookup semantics (random vs. rated placement of Craftsmen/Park) — PLAUSIBLE, target-dependent;
7. the retry loop's stream continuation (no reseed; three flags kept).

Items 1–4 and 7 are fully specified by the source and the findings (after the corrections above). Item 5 is
specified only up to the runtime; item 6 only up to the compiler target. **Bound:** with a faithful port of 1–4 and 7,
same-seed layouts should match through `buildPatches`, `optimizeJunctions` and `buildWalls` exactly, and diverge at
`buildStreets` only where two frontier nodes tie in BFS order — i.e. street-level agreement is likely but not
guaranteed, and everything after (`createWards` uses `arteries` only for geometry, so ward *assignment* still matches;
`buildGeometry` inherits any street divergence). For the **live** MFCG the 2017 order bounds nothing directly: it
reseeds per attempt and has `Random.save/restore` (`profile-mfcg.md` §6.5, §11), the seed count is `8·size + 4`, and the
ward stage was replaced — only the *shape* of the order (patches → walls → streets → wards → geometry, one global stream)
is evidence about the live build.

## 5. Addenda written to the findings files

Each is appended under the exact header `## Critic-2 addendum (OS seat, 2026-09-25)`; no existing text was edited.

| file | items | what changes for a reader |
|---|---|---|
| `os-geometry.md` | 7 | §1.4/§2.2 retry-catch scope narrowed to the four `openfl.errors.Error` throws (C1); §2.1.3 `reserved` = citadel vertices, gates not pinned and smoothed twice (C2); road casing colour = medium (C8); `ObservableInt` unused (C17); relaxation indices `nPatches − 4 + k` confirmed; `Map` key-order hazard in `aStar`; plaza-frontage inset is inner-only |
| `os-model.md` | 8 | Cathedral prefers the *smallest* plaza-fronting patch (C3); `sizeChaos` 0.8 ⇒ 9.2×, not 16× (C4); streets run plaza → gate and shared runs *are* de-duplicated (C6); gate bar along the wall (C7); `Castle` constructor draws, before the compactness test (C14, §4.2); throw site 2 unreachable (C15); the FIFO-meander argument is OPEN against the live build (C10); radius-cull wording |
| `os-wards-render.md` | 6 | size ranges are max-exclusive (C5); §10's relaxation line is literal, effective seeds differ (C9); `cityRadius` estimate 2–3× high (C16); `lineStyle` oddity closable via optional-argument skipping; cross-references to the correct Cathedral/`sizeChaos` readings; `Map` key-order hazard |
| `profile-mfcg.md` | 4 | the 2017 `aStar` has an `Array` FIFO open set and no `min` scan — the hot `ObjectMap.keys` is neighbour iteration, so live-vs-2017 "unchanged" is unverified (C10); executed 2017 spiral numbers for the `8·size + 4` cross-check; 14 not 13 ward files; 0.75 and palette anchors re-verified |

`_critic.md` was not amended (it is the first critic's report, not a findings file); its §3 shorthand "3 relax passes on
central cells" and "angle π/6·gridChaos" are corrected by C9 and C18 above.

## 6. Remaining gaps

1. **Runtime/compiler-dependent semantics were not compiled.** Whether `Reflect.field(CraftsmenWard, "rateLocation")`
   is `null` (random placement) or finds `Ward.rateLocation` (centre-outward deterministic placement) depends on the
   Haxe target and output mode (ES5 vs ES6 classes); the optional-argument binding in `lineStyle`; `catch (e:Error)`
   scope on Flash; `ObjectMap` key order in `aStar`; `Array.sort` stability in the radial sort. A single
   `haxelib`/`lime` html5 build of the repo with two `trace()`s would settle all five and is the cheapest remaining
   measurement — it also yields a per-seed golden (patch count, gate count, street polylines) for any port.
2. **Nothing in the 2017 pipeline was executed.** Gate count ≈ ⌊E/3⌋, the ≈ 60–95 unit size-15 radius, and the
   claim that street-level agreement is where a faithful port first risks divergence are derivations (PLAUSIBLE),
   not measurements.
3. **Live-vs-2017 `aStar`** (C10, live half): call counts cannot distinguish a FIFO open set from a priority one;
   only a black-box test (street straightness of the live build against a FIFO re-implementation on the same mesh)
   could, and the bundle must stay closed.
4. **Other files that lean on the 2017 source were not swept.** Only `profile-mfcg.md` was checked where it cites
   2017; `profile-village.md`, `profile-neighbourhood.md`, `visual-spec.md` and the devlog/post readers may carry
   2017 references (`grep -rn "2017\|TownGeneratorOS" research/findings/` lists them) — out of this seat's scope.
5. **`_critic.md` spot-check 21** reads the relaxation literally ("`points[0..2]` + `points[nPatches]`", SUPPORTED);
   it is still true as a quotation but a synthesiser should take the effective indices from C9.
6. **Not a gap in the findings but in the source's own record:** the intent behind the relaxation targets, the 5-rad
   spiral constant, the 8× oversampling and the `segments:Array<Bool>` hook are unrecoverable from this snapshot
   (all three files say so); the 2017 devlogs (`mfcg-devlogs-a.md`) are the only place they might be explained.
