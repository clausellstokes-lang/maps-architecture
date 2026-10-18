# os-model — the generation pipeline of TownGeneratorOS (watabou, 2017/2019)

Slice: `reference/TownGeneratorOS/Source/com/watabou/towngenerator/building/{Model,Patch,Topology,CurtainWall,Cutter}.hx`,
`towngenerator/{TownScene,StateManager,Main}.hx`, with `geom/{Voronoi,Polygon,Graph,Segment,GeomUtils,Spline}.hx`,
`utils/{Random,ArrayExtender,PointExtender,MathUtils}.hx`, `wards/*.hx` and `mapping/*.hx` consulted to resolve calls.

Repo state: single commit `7fbc87a "Updated for compatibility with the latest versions of openfl and lime"`, shallow clone,
`project.xml` version 0.0.1, lime 7.3.0 / openfl 8.9.0 / msignal 1.2.5. `README.md` states this is the source of MFCG and
that it **"lacks some of the latest features, namely waterbodies, options UI and some smaller ones."** That is the creator's
own statement that this snapshot is behind the live generator — confirmed below by `Model.waterbody` being declared
(`Model.hx:47`) and never written anywhere in the tree.

## Tagging convention used in this file

This slice is source code, not prose, so the standard tags are bound as follows and used on every technique line:

- **[STATED]** — the open-source code does exactly this; the claim is readable off the cited line(s). Equivalent to "the creator explicitly describes the method", because here the code *is* the description.
- **[SHOWN]** — visible in a recording (`captures/**/report.md`, `console.jsonl`, `*.calls.json`) but not explained anywhere.
- **[INFERRED]** — my reconstruction of intent, consequence, or a cross-version delta; reasoning always given.
- **[NAMED-ONLY]** — a field/stage exists by name with no implementation in this snapshot.

Two claims below are marked **CONFIRMED (executed)** — I re-implemented the PRNG and the spiral seeding in Python and ran
them (`scratchpad/rng.py`); the quoted numbers are real output, not reasoning.

---

## 0. Executive shape of the pipeline

```
Main.new                                        Main.hx:15-28
  StateManager.pullParams()   size,seed from URL query          StateManager.hx:18-29
  StateManager.pushParams()   if seed==-1: Random.reset(); seed=getSeed(); rewrite URL   StateManager.hx:31-45
  new Model( size, seed )                        Model.hx:69-85
      Random.reset(seed)                         (only if seed > 0)
      plazaNeeded   = Random.bool()              draw #1
      citadelNeeded = Random.bool()              draw #2
      wallsNeeded   = Random.bool()              draw #3
      do try { build(); instance=this } catch(e:Error) { trace(e.message); instance=null } while (instance==null)
  super( TownScene )                             renders Model.instance

Model.build()                                    Model.hx:87-97
   streets = []; roads = []
   buildPatches()        Voronoi of a jittered spiral; Lloyd; sort by |p|; flag inner/plaza/citadel
   optimizeJunctions()   merge patch vertices closer than 8 units
   buildWalls()          circumference of `inner` → CurtainWall; gates; towers; cull far patches; castle
   buildStreets()        Topology graph → A* gate→plaza per gate; outward roads; dedupe; smooth
   createWards()         plaza Market, gate wards, WARDS deck + rateLocation scoring, outskirts, countryside
   buildGeometry()       every patch's ward emits its building polygons
```

There are **exactly six stages** and no `buildDomains`, `buildCanals` or `buildCityTowers` — see §14 for what the live
trace shows was added.

---

## 1. Determinism harness and the PRNG

### 1.1 Random — Lehmer / "minimal standard" LCG  [STATED] `utils/Random.hx:5-37`

```
g    = 48271.0        (a Float, deliberately)
n    = 2147483647     (2^31 - 1, Mersenne prime)
seed : Int, default 1
next()   : seed = Std.int( (seed * g) % n )
float()  : next() / n                                  → (0, 1)
normal() : (float()+float()+float())/3                 → 3 draws, Irwin–Hall(3)/3, mean 0.5
int(a,z) : Std.int( a + next()/n * (z-a) )             → 1 draw, range [a, z-1]
bool(c=0.5) : float() < c                              → 1 draw
fuzzy(f=1)  : f==0 ? 0.5 (NO draw) : (1-f)/2 + f*normal()   → 3 draws when f != 0
reset(s=-1) : seed = (s != -1 ? s : Std.int(Date.now().getTime() % n))
```

`g` is typed `Float` on purpose: `seed * g` is evaluated in IEEE double. Max product is
`2147483646 × 48271 ≈ 1.0366e14 < 2^53`, so the multiplication is exact and the generator is the textbook
Lehmer MINSTD (Park–Miller revised). **A re-implementation in 32-bit integer maths will diverge** unless it uses
64-bit or double arithmetic before the modulo. [INFERRED — from the `48271.0` literal and the magnitude bound.]

**CONFIRMED (executed)** — from seed `682063530` (the seed in the README's live link), the first eight `next()` values are
`816864473, 917733616, 1626707620, 63972465, 2080857276, 808948665, 1065854814, 464511768`
and the first eight `float()` values are
`0.380382162, 0.427353017, 0.757494765, 0.029789500, 0.968974678, 0.376696077, 0.496327325, 0.216305148`.
That gives `plazaNeeded=true, citadelNeeded=true, wallsNeeded=false` for that seed. A re-implementer can pin against this.

There is **one global static stream**. Everything — layout, ward choice, building subdivision — pulls from it in call order,
so any change of evaluation order anywhere changes every downstream map. See §12 for the complete draw ledger.

### 1.2 Seed and size plumbing  [STATED] `StateManager.hx`, `Main.hx`, `ui/CitySizeButton.hx`

- URL params `?size=&seed=`; size clamped to `[6, 40]` (`StateManager.hx:23`), seed accepted only if `> 0`.
- If no seed was supplied, `pushParams()` seeds from wall-clock (`Random.reset()`) then publishes
  `Random.getSeed()` into the URL, so a generated city is always reproducible from its link. [STATED `StateManager.hx:31-45`]
- Size buckets and their labels (`StateManager.hx:47-60`, `TownScene.hx:28-31`, `Model.hx:24-28`):
  Small Town 6–9, Large Town 10–14, Small City 15–23, Large City 24–39, Metropolis ≥40 (typo'd "Metropilis").
  `nPatches` default when unspecified is **15** (`Model.hx:72`).
- `CitySizeButton` picks its size with **`Math.random()`**, not `Random` (`ui/CitySizeButton.hx:15`) — a deliberate or
  accidental escape from the deterministic stream; the chosen size is then published to the URL so the result is still
  reproducible after the fact. [STATED; the "deliberate or accidental" half is [INFERRED].]

### 1.3 View fitting  [STATED] `TownScene.hx:47-59`, `Main.hx:30-32`, `coogee/Game.hx:71-79`

`scaleX = rWidth / cityRadius`, `scaleY = rHeight / cityRadius`, then
`scale = (scMax/scMin > 2 ? scMax/2 : scMin) * 0.5`. Because `cityRadius` is a *radius* and `rWidth/rHeight` are full
extents, `scMin * 0.5` makes the city span about the viewport; the `scMax/2` branch is an anti-letterboxing rule for very
non-square windows. Global UI scale is `Std.int(Capabilities.screenDPI / 24)` (`Main.hx:31`), so the world unit is
DPI-relative, not pixel-fixed.

---

## 2. The one structural decision everything else rests on: shared `Point` identity

[STATED] `Patch.hx:25-26`, `geom/Voronoi.hx:83-90`, `geom/Polygon.hx:79-81, 404-415, 423-437`

`Patch.fromRegion(r)` builds its polygon as `[for (tr in r.vertices) tr.c]` — the **circumcentre `Point` objects of the
Delaunay triangles**. A triangle is shared by up to three Voronoi regions, so **adjacent patches hold the identical
`Point` instance**, not a copy. Every adjacency, wall, gate and street query in the codebase is then reference equality:

- `Polygon.contains(v)` is `indexOf(v) != -1` — object identity, not coordinates (`Polygon.hx:79-81`).
- `Polygon.findEdge(a,b)` finds `a` then checks the *next* vertex is the same object as `b` (`Polygon.hx:404-407`).
- `Polygon.borders(other)` finds a common vertex object and checks the neighbour matches in either direction (`:423-437`).
- `Model.patchByVertex(v)` = every patch whose array contains that object (`Model.hx:205-209`).
- `Model.getNeighbour(patch, v)` = the patch holding the **reversed** edge `(next(v), v)` (`Model.hx:419-425`).

Three consequences a re-implementer must plan for:

1. **Moving one `Point` moves every patch that touches it.** This is used deliberately three times: junction merging
   (`Model.hx:327-328`), wall smoothing (`CurtainWall.hx:33-35` via `Polygon.set`), and street smoothing
   (`Model.hx:213-217`). Streets *are* patch edges; smoothing a street bends the blocks either side of it for free.
2. **Consistent winding is a hard invariant.** `Region.sortVertices` orders vertices by increasing CCW angle around the
   seed (`Voronoi.hx:224-227, 247-260`), and `Triangle`'s constructor normalises each triangle to CCW
   (`Voronoi.hx:184-188`). `getNeighbour`, `borders`, `bordersBy` and `Polygon.square`'s sign all break if winding varies.
3. **A port to a value-type language (structs, tuples, numpy rows) must introduce an explicit shared vertex table with
   integer ids**, or reproduce nothing. [INFERRED — direct consequence of the identity semantics above.]

---

## 3. Stage 1 — `buildPatches()`  `Model.hx:99-144`

### 3.1 Seed placement: a jittered Archimedean-ish spiral  [STATED] `Model.hx:100-105`

```haxe
var sa = Random.float() * 2 * Math.PI;                       // random spiral phase
var points = [for (i in 0...nPatches * 8) {
    var a = sa + Math.sqrt( i ) * 5;
    var r = (i == 0 ? 0 : 10 + i * (2 + Random.float()));
    new Point( Math.cos( a ) * r, Math.sin( a ) * r );
}];
```

- **Count**: `8 × nPatches` seeds. Only the first `nPatches` (+1 for the citadel) become city patches; the other ⅞ exist to
  give the city cells bounded, well-shaped Voronoi neighbours and to supply countryside. [INFERRED — `Model.hx:131-141`
  only flags indices `< nPatches` and `== nPatches`.]
- **Angle**: `a = sa + 5·√i` radians. This is a Vogel/Fermat-style spiral but with a **step constant of 5 rad instead of the
  golden angle 2.39996**, and the radius grows *linearly*, not as √i. Angular step between consecutive seeds is
  `5(√(i+1) − √i) ≈ 2.5/√i`. **CONFIRMED (executed)**: steps for i=0…5 are `5.0000, 2.0711, 1.5892, 1.3397, 1.1803, 1.0671`
  rad, and at i=99 it is `0.2506` rad.
- **Radius**: `r = 10 + i·(2 + U(0,1))`, i.e. `r ∈ [10 + 2i, 10 + 3i)`. Seed 0 sits exactly at the origin and **consumes no
  random draw** (Haxe's ternary is lazy, so `Random.float()` is skipped for `i == 0`).
- **Net effect**: the early seeds are a small tight cluster with large angular jumps (5 rad, 2.07 rad, 1.59 rad …), giving
  the centre a few large irregular cells; further out the ring winds more slowly while the radius keeps climbing, producing
  progressively more, smaller, more regular cells. Arc length between neighbours ≈ `r·Δa ≈ 6.25√i`. [INFERRED from the
  formula + the executed numbers.]
- **CONFIRMED (executed)**, seed 682063530, nPatches 15: `sa = 0.187173`; the first four seeds land at
  `i=0 r=0.00`, `i=1 r=12.97 a=5.187`, `i=2 r=14.75 a=0.975`, `i=3 r=17.49 a=2.564`; `i=119 r=283.2`;
  the point cloud's half-extent is ≈346 units.

**Why a spiral and not Poisson-disc/jittered grid**: the spiral gives (a) a guaranteed single central cell, (b) monotone
radius so index order ≈ distance order, which the pipeline later relies on for `plaza`/`citadel`/`inner` selection, and
(c) zero rejection sampling. [INFERRED.]

### 3.2 Voronoi: incremental Bowyer–Watson  [STATED] `geom/Voronoi.hx`

`Voronoi.build(vertices)` (`:152-171`):
1. Bounding box of all vertices; `dx = (maxx-minx)·0.5`, `dy = (maxy-miny)·0.5`.
2. Construct `new Voronoi(minx - dx/2, miny - dy/2, maxx + dx/2, maxy + dy/2)` — i.e. the box padded by **25 % of the
   full extent on every side**.
3. The constructor (`:20-36`) seeds `frame = points = [c1,c2,c3,c4]` (the four box corners) and two triangles
   `(c1,c2,c3)`, `(c2,c3,c4)`.
4. `addPoint(p)` for each vertex in order (`:42-81`): collect every triangle whose **circumcircle contains p**
   (`Point.distance(p, tr.c) < tr.r`); if none, the point is silently dropped and *not* pushed to `points`. Otherwise
   collect the cavity's boundary edges (an edge is on the boundary iff no other doomed triangle has it reversed — the
   `e1/e2/e3` flags at `:54-68`), then walk the edge chain `index = a.indexOf(b[index])` re-fanning triangles from `p`,
   and delete the doomed triangles.

Complexity is **O(n) per insertion → O(n²) overall**, run four times (once per relaxation pass plus the final build), with
n = 8·nPatches ≤ 320. [INFERRED from the loops.]

`Triangle` (`:174-213`) stores `p1,p2,p3` forced CCW via the shoelace sign `s`, plus circumcentre `c` and circumradius `r`.
The circumcentre is computed with an explicit slope `tg1 = dy1/dx1` — **it divides by zero when `p1.y == p2.y`**, yielding
`±Infinity` and then a `NaN` centre. With continuous random inputs this essentially never fires, but a re-implementation
fed axis-aligned or snapped coordinates will hit it. [STATED for the code; [INFERRED] for the hazard.]

`Region` (`:215-260`) = a seed plus its incident triangles sorted by angle (a hand-written half-plane comparator, not
`atan2`, per the commented-out line at `:248`). `Region.center()` is the **mean of the circumcentres**, i.e. the average of
the cell's polygon vertices, *not* the area centroid.

`partioning()` (`:115-131`) iterates **`points`, not `regions`** — the comment says "to use points ordering" — and keeps
only regions all of whose triangles are `isReal` (contain no frame corner). So frame corners and the outermost ring of
seeds produce no patches.

### 3.3 Relaxation — and the off-by-four that makes it not do what the comment says

[STATED] `Model.hx:108-113`:

```haxe
// Relaxing central wards
for (i in 0...3) {
    var toRelax = [for (j in 0...3) voronoi.points[j]];
    toRelax.push( voronoi.points[nPatches] );
    voronoi = Voronoi.relax( voronoi, toRelax );
}
```

`Voronoi.relax(v, toRelax)` (`:136-150`) drops the frame corners, replaces each `toRelax` seed that owns a *real* region
with that region's vertex-mean, and rebuilds the whole diagram.

**[INFERRED — high confidence, derived from three explicit code facts]**: `voronoi.points[0..3]` are **the four frame
corners**, because the constructor initialises `points = [c1,c2,c3,c4]` (`Voronoi.hx:28`) and `addPoint` only ever
*appends* (`:50`). Therefore:

- `[for (j in 0...3) voronoi.points[j]]` = `[c1, c2, c3]` — three frame corners. Frame corners never appear as
  `r.seed` in `partioning()`'s output (their regions all touch frame triangles), so **those three entries are no-ops.**
- `voronoi.points[nPatches]` is input seed index `nPatches - 4`, not the citadel seed.
- Each `relax` removes the relaxed seed from the array and pushes its replacement at the **end**, so the next iteration's
  index `nPatches` shifts by one. Across the three passes the seeds actually Lloyd-relaxed are input indices
  **`nPatches-4`, `nPatches-3`, `nPatches-2`** — one step each, none of them central, none of them the citadel.

The evident intent was "relax the first three seeds and the citadel seed"; what ships is "give one Lloyd step to three
seeds sitting just inside the citadel ring". A re-implementer must decide which behaviour to copy — the visual character of
MFCG's centre depends on the *un*relaxed first seeds, so copying the intent will not reproduce the look.

### 3.4 Ordering, and the bookkeeping flags  [STATED] `Model.hx:115-143`

```haxe
voronoi.points.sort( (p1,p2) -> MathUtils.sign( p1.length - p2.length ) );   // ascending |p| from world origin
var regions = voronoi.partioning();
```

Sorting `points` in place reorders `partioning()`'s output without disturbing the `Map<Point,Region>` (keyed by object).
Frame corners have the largest `|p|` (**CONFIRMED (executed)**: half-extent ≈346 → corners at ≈734 from origin) so they
sort to the end and are skipped anyway. Result: **patches are enumerated in ascending distance of their seed from the
world origin.**

Then, with `count` running over *real* regions only:

| condition | effect | line |
|---|---|---|
| `count == 0` | `center = patch.shape.min(p -> p.length)` — the **vertex** of the central patch nearest the origin, not its centroid. If `plazaNeeded`, this patch becomes `plaza`. | `:127-130` |
| `count == nPatches && citadelNeeded` | this patch becomes `citadel`, and `citadel.withinCity = true` | `:131-134` |
| `count < nPatches` | `patch.withinCity = true`; `patch.withinWalls = wallsNeeded`; pushed onto `inner` | `:136-140` |

**Patch bookkeeping flags** (`Patch.hx:15-16, 21-22`): exactly two booleans, both default `false`.
- `withinCity` — participates in the city: counted for `cityRadius`, routed as `inner` in `Topology`, affects
  `filterOutskirts` density and `isEnclosed`.
- `withinWalls` — set only from `wallsNeeded` at creation, and only for `inner` patches. The citadel is `withinCity` but
  **never** `withinWalls`. Outskirt patches promoted later get `withinCity = true` but stay `withinWalls = false`
  (`Model.hx:396`).
- `isEnclosed(patch)` = `withinCity && (withinWalls || every neighbour withinCity)` (`Model.hx:432-434`) — the test that
  decides whether a ward's outer buildings get thinned by `filterOutskirts`.

Note `plaza` is `inner[0]` and is therefore also `withinCity`/`withinWalls`; the citadel is deliberately outside `inner`
(index `nPatches`), so the curtain wall is built around the city *excluding* the citadel, which gets its own wall.

---

## 4. Stage 2 — `optimizeJunctions()`  `Model.hx:308-344`

**Problem solved**: Voronoi cells meeting at near-degenerate four-way junctions produce sliver edges a few tenths of a unit
long, which become invalid street segments, zero-area blocks and jagged walls. [INFERRED from the operation.]

**Algorithm** [STATED]:

```
patchesToOptimize = citadel == null ? inner : inner ++ [citadel]     // city patches only, never countryside
wards2clean = []
for w in patchesToOptimize:
    index = 0
    while index < w.shape.length:                       // length re-read every iteration
        v0 = w.shape[index]
        v1 = w.shape[(index + 1) % w.shape.length]
        if (v0 != v1 && distance(v0, v1) < 8):          // object inequality, then Euclidean threshold
            for w1 in patchByVertex(v1) where w1 != w:
                w1.shape[ w1.shape.indexOf(v1) ] = v0   // rebind other patches' reference to v0
                wards2clean.push(w1)
            v0.addEq(v1); v0.scaleEq(0.5)               // v0 MOVES to the midpoint (shared object!)
            w.shape.remove(v1)
        index++
// remove duplicate vertex references created by the rebinding
for w in wards2clean:
    for i in 0...w.shape.length:
        v = w.shape[i]
        while ((dupIdx = w.shape.indexOf(v, i+1)) != -1) w.shape.splice(dupIdx, 1)
```

- **Merging threshold: `8` world units, hard-coded** (`Model.hx:321`). For scale: seed radii start at 10 and grow ~2.5 per
  index, `MAIN_STREET = 2.0`, so 8 units is on the order of a third of a small central cell's edge.
- The merge is a **midpoint collapse**: `v0` is moved to `(v0+v1)/2` and, because `v0` is the shared object, every patch
  touching it moves with it. `v1` is then rebound away everywhere and dropped from `w`.
- Only city patches are scanned, but **any** patch touching `v1` is edited, so countryside patches are repaired too.
- `index++` runs unconditionally, so after a collapse the scan resumes past `v0` — **two consecutive short edges are not
  both collapsed in one pass, and there is only one pass.** [INFERRED — the loop structure.]
- Cost: `patchByVertex` is a linear scan over all `8·nPatches` patches, inside a loop over every vertex of every city
  patch → roughly O(nPatches² · vertices). This is the second-hottest thing in the stage. [INFERRED.]
- **Failure mode not handled**: collapsing can leave a patch with fewer than 3 distinct vertices (a degenerate sliver cell
  whose every edge is < 8). Nothing checks for it; the damage surfaces later as a bad circumference, a failed cut, or a
  `NaN` centroid. [INFERRED.]

---

## 5. Stage 3 — `buildWalls()`  `Model.hx:146-170` + `CurtainWall.hx` + `wards/Castle.hx`

```haxe
var reserved = citadel != null ? citadel.shape.copy() : [];
border = new CurtainWall( wallsNeeded, this, inner, reserved );
if (wallsNeeded) { wall = border; wall.buildTowers(); }
var radius = border.getRadius();
patches = patches.filter( p -> p.shape.distance( center ) < radius * 3 );
gates = border.gates;
if (citadel != null) {
    var castle = new Castle( this, citadel );
    castle.wall.buildTowers();
    citadel.ward = castle;
    if (citadel.shape.compactness < 0.75) throw new Error( "Bad citadel shape!" );
    gates = gates.concat( castle.wall.gates );
}
```

- **`border` always exists**; `wall` exists only when `wallsNeeded`. The unwalled city still gets a circumference polygon
  and gates — they are just not drawn and not `blocked` in the topology. This is how an unwalled town still gets radial
  entry streets. [INFERRED from `Topology.hx:36-38` and `CityMap.hx:74-75`.]
- `reserved` = the citadel's vertices, passed so the city wall neither smooths them nor puts a gate on them.
- **Radius cull**: patches whose polygon is farther than `3 × wall radius` from `center` are discarded outright
  (`Model.hx:156`). This caps the countryside. Note it runs **before** the castle is built, so castle gate-splitting adds
  patches back afterwards. Note also it uses the buggy `Polygon.distance` (§13.1).
- **Citadel quality gate**: `compactness < 0.75 → throw "Bad citadel shape!"` → the whole city is rebuilt (§11).
  `compactness = 4πA/P²` (`Polygon.hx:48-52`), documented in-source as **1.00 circle, 0.79 square, 0.60 triangle**.

### 5.1 `Model.findCircumference(wards)`  [STATED] `Model.hx:172-203`

Union outline of a patch set, exploiting the shared-vertex invariant:
1. `wards.length == 0 → empty polygon`; `== 1 → copy of that patch`.
2. For every directed edge `(a,b)` of every patch, the edge is **outer** iff no patch in the set contains the reversed edge
   `(b,a)`. Outer edges are accumulated into parallel arrays `A` (starts) and `B` (ends).
3. Walk the chain: `result.push(A[index]); index = A.indexOf(B[index])` until back to `0`.

Failure modes [INFERRED]: if the union is not simply connected, or a vertex is a pinch point appearing twice in `A`,
`indexOf` returns the wrong/first occurrence → a short or wrong loop; if the chain breaks, `indexOf` returns `-1`,
`A[-1]` is `null`, and `null` is pushed — a latent crash with no guard.

### 5.2 `CurtainWall` construction  [STATED] `CurtainWall.hx:22-42`

```haxe
this.real = true;                                  // NB: the FIELD is hard-set true, ignoring the argument
this.patches = patches;
if (patches.length == 1)
    shape = patches[0].shape                       // ALIASED, not copied
else {
    shape = Model.findCircumference( patches );
    if (real) {                                    // the local PARAMETER, which is honest
        var smoothFactor = Math.min( 1, 40 / patches.length );
        shape.set( [for (v in shape) reserved.contains(v) ? v : shape.smoothVertex( v, smoothFactor )] );
    }
}
segments = [for (v in shape) true];
buildGates( real, model, reserved );
```

- **Which vertices are kept/smoothed**: *every* wall vertex is kept — the vertex count never changes. Every vertex except
  reserved (citadel) ones is replaced by `smoothVertex(v, f) = (prev + f·v + next)/(2 + f)`, a one-pass weighted Laplacian.
  `Polygon.set` writes coordinates **into the existing `Point` objects** (`Polygon.hx:19-21`), so the smoothing drags the
  adjoining patches with the wall — the wall and the blocks behind it stay perfectly glued.
- **`smoothFactor = min(1, 40/|patches|)`.** Since `StateManager` clamps size to ≤ 40 and `inner.length == nPatches`,
  **the factor is 1 for every reachable city size**, i.e. `(prev + v + next)/3`. The `40/len` branch is dead code in the
  shipped configuration. [INFERRED — from the size clamp at `StateManager.hx:23`.]
- **`patches.length == 1` (the castle) aliases the citadel's own polygon**: `castle.wall.shape` *is* `citadel.shape`, the
  same array object. No whole-shape smoothing is applied, but gate smoothing at `:107-109` still mutates the citadel.
- **`segments : Array<Bool>`, one per edge (`i` → edge `shape[i] → shape[i+1]`), initialised all-`true` and never set
  false in this snapshot.** It is read by `buildTowers` (`:118`), `bordersBy` (`:135`) and `borders` (`:145`).
  [INFERRED] it is the hook for wall gaps where a river or shoreline meets the wall — exactly the `addWatergate` /
  `splitSegment` feature the live MFCG trace shows (§14).

### 5.3 Gate selection  [STATED] `CurtainWall.hx:44-110`

**Candidate rule** (`:49-55`): an entrance is a wall vertex that is
- not `reserved`, **and**
- shared by **more than one** of the walled patches (`patches.count(p -> p.shape.contains(v)) > 1`).

The comment gives the reason verbatim: *"Entrances are vertices of the walls with more than 1 adjacent inner ward so that a
street could connect it to the city center."* A vertex touching only one inner patch is a corner, not a junction, and no
interior edge leads away from it. For the single-patch (castle) case the rule degrades to "any non-reserved vertex".

`entrances.length == 0 → throw "Bad walled area shape!"` (`:57-58`).

**Selection loop** (`:60-101`), treating `entrances` as a cyclic list:

```
do {
    index = Random.int( 0, entrances.length );        // 1 draw, range [0, len-1]
    gate  = entrances[index];  gates.push( gate );
    if (real) { ...split the outer ward, see below... }
    if      (index == 0)                  { entrances.splice(0, 2); entrances.pop();   }   // drop self, next, wrap-prev
    else if (index == entrances.length-1) { entrances.splice(index-1, 2); entrances.shift(); } // drop prev, self, wrap-next
    else                                    entrances.splice(index - 1, 3);                 // drop prev, self, next
} while (entrances.length >= 3);
if (gates.length == 0) throw new Error( "Bad walled area shape!" );
```

So each accepted gate **consumes itself plus its two neighbours in the candidate ring**, enforcing a minimum spacing of two
candidate vertices. The loop stops when fewer than 3 candidates remain, giving roughly `floor(|entrances| / 3)` gates.
The comment states the intent: *"Removing neighbouring entrances to ensure that no gates are too close."*

**Gate smoothing** (`:107-109`): after all gates are chosen, each gate vertex is moved to `shape.smoothVertex(gate)` with
default `f = 1` — a second smoothing pass applied only at gates, so the wall bulges/relaxes locally where a road pierces it.
The comment calls this *"Smooth further sections of the wall with gates."*

**Outer-ward splitting** (`:65-88`) — the subtlest part of the stage:

```
outerWards = model.patchByVertex(gate).filter( w -> !patches.contains(w) )
if (outerWards.length == 1 && outer.shape.length > 3):
    wall = shape.next(gate) - shape.prev(gate)        // chord along the wall at the gate
    out  = new Point( wall.y, -wall.x )               // wall rotated -90° = outward normal
    farthest = outer.shape.max( v ->
        (shape.contains(v) || reserved.contains(v)) ? -INF : (v - gate)·out / |v - gate| )
    newPatches = [for (half in outer.shape.split(gate, farthest)) new Patch(half)]
    model.patches.replace(outer, newPatches)
```

**Problem it solves** [STATED via the comment]: *"If there is no road leading from the walled patches, we should make one by
splitting an outer ward."* When only one countryside patch touches the gate, every edge leaving the gate is interior to that
one patch and the topology graph has no outward branch. The fix: cut that patch in two along `gate → farthest`, where
`farthest` maximises `cos∠` between `(v − gate)` and the outward wall normal — i.e. the vertex most directly *away* from the
city. `Polygon.split` (`Polygon.hx:450-462`) slices by index and **both halves retain the two endpoint objects**, so the
gate now has two outer patches and a genuine outward edge. The new `Patch`es are fresh objects with
`withinCity = withinWalls = false, ward = null` — they are picked up later by the countryside pass.

Triangular patches (`length > 3` guard) are never split; in that case the gate simply gets no road (the A* road search at
`Model.hx:243` returns `null` and is silently dropped).

### 5.4 Towers  [STATED] `CurtainWall.hx:112-122`

```
towers = [];
if (real)                                           // the FIELD, always true — see §13.2
  for i in 0...len:
     t = shape[i]
     if (!gates.contains(t) && (segments[(i+len-1)%len] || segments[i])) towers.push(t)
```

**Every non-gate wall vertex with at least one live adjacent segment becomes a tower.** There is no spacing rule, no count
target, and no Poisson filtering — tower placement is purely "wherever two wall segments meet". `buildTowers()` is only
*called* when `wallsNeeded` (`Model.hx:152`) or for the castle (`Model.hx:162`), which is what actually gates it.

**Tower radius is a rendering constant, not a model quantity** (`mapping/CityMap.hx:96-105`):
`r = Brush.THICK_STROKE × (large ? 1.5 : 1)` = **1.8 world units for the city wall, 2.7 for the castle**
(`Brush.THICK_STROKE = 1.800`, `mapping/Brush.hx:9`).

`getRadius()` (`:124-129`) = `max |v|` over the wall vertices — distance from the **world origin**, not from `center`.

### 5.5 Castle  [STATED] `wards/Castle.hx`

```haxe
wall = new CurtainWall( true, model, [patch],
    patch.shape.filter( v -> model.patchByVertex(v).some( p -> !p.withinCity ) ) );
```

The castle's own `reserved` set is *"every citadel vertex that also touches a non-city patch"* — i.e. the citadel's outward
face. Castle gates are therefore forced onto the **city-facing** side of the citadel, so the keep opens into the town rather
than into the countryside. [STATED for the filter; [INFERRED] for the "so that" reading, which follows directly.]
`Castle.createGeometry` = `shrinkEq(MAIN_STREET × 2 = 4.0)` then `createOrthoBuilding(block, √(block.square) × 4, 0.6)`.

---

## 6. Stage 4 — `buildStreets()`  `Model.hx:211-255` + `Topology.hx` + `geom/Graph.hx`

### 6.1 `Topology` — node construction and blocking  [STATED] `Topology.hx:22-80`

```
blocked = (citadel != null ? citadel.shape : []) ++ (wall != null ? wall.shape : [])
blocked = blocked.difference( model.gates )          // gates are punched back open
border  = model.border.shape

for p in model.patches:
    withinCity = p.withinCity
    v1 = p.shape.last(); n1 = processPoint(v1)
    for i in 0...p.shape.length:
        v0 = v1; v1 = p.shape[i]
        n0 = n1; n1 = processPoint(v1)
        if (n0 != null && !border.contains(v0))  (withinCity ? inner : outer).add(n0)
        if (n1 != null && !border.contains(v1))  (withinCity ? inner : outer).add(n1)
        if (n0 != null && n1 != null)  n0.link( n1, Point.distance(v0, v1) )

processPoint(v):
    n = pt2node[v] ?? (pt2node[v] = graph.add(); node2pt[n] = v; n)   // node ALWAYS created & registered
    return blocked.contains(v) ? null : n                              // but returned null when blocked
```

- **The street graph is literally the patch-edge graph**: one node per unique vertex object, one undirected edge per patch
  edge, **cost = Euclidean edge length** (`Node.link` is symmetrical by default, `Graph.hx:94-99`). No cost shaping, no turn
  penalty, no terrain weighting.
- **Blocked nodes** = citadel outline ∪ wall outline, **minus the gates**. A blocked vertex still gets a `Node` and both map
  entries (so `buildPath` can address it), but `processPoint` returns `null`, so **no edge is ever created touching it**.
  It is isolated, not deleted. Consequence: no street runs along the top of the wall or through the citadel wall;
  only the gates are permeable.
- **`inner` / `outer`** are *node exclusion sets*, deduplicated with `ArrayExtender.add`. A node joins `inner` if it belongs
  to a `withinCity` patch, `outer` if it belongs to a countryside patch, **and is not on the `border` polygon**. Border
  vertices (which include all gates and the whole circumference) are in neither, so they remain usable by both searches —
  that is exactly what lets a street and a road meet at a gate. [INFERRED — the `!border.contains(...)` guard has no other
  purpose.]
- A vertex shared by a city patch and a countryside patch would land in **both** lists, but by construction such a vertex
  lies on the circumference and is therefore excluded from both. [INFERRED.]

`buildPath(from, to, exclude)` = `graph.aStar(pt2node[from], pt2node[to], exclude)` mapped back to points (`:82-85`).

### 6.2 A* — which is not A*  [STATED] `geom/Graph.hx:25-57`

```haxe
closedSet = exclude != null ? exclude.copy() : [];
openSet   = [start];
gScore    = [start => 0];
while (openSet.length > 0) {
    current = openSet.shift();                     // FIFO — no priority queue
    if (current == goal) return buildPath(cameFrom, current);
    openSet.remove(current); closedSet.push(current);
    for (neighbour in current.links.keys()) {
        if (closedSet.contains(neighbour)) continue;
        score = gScore[current] + current.links[neighbour];
        if (!openSet.contains(neighbour)) openSet.push(neighbour);
        else if (score >= gScore[neighbour]) continue;
        cameFrom[neighbour] = current;
        gScore[neighbour] = score;
    }
}
return null;
```

Details a re-implementer must not "fix" casually:

- **There is no heuristic and no priority queue.** `openSet.shift()` pops FIFO, so this is a **breadth-first / Bellman-Ford
  hybrid, not A***, despite the name. Nodes are expanded in insertion order, and a node is closed on first expansion, so the
  returned path is **not guaranteed shortest** — it is "first path found by BFS order, with g-scores relaxed along the way".
  This produces the characteristically slightly-meandering MFCG streets. Replacing it with a real A* will straighten the
  streets and change the look. [INFERRED from the code; the divergence from optimality follows from closing on first pop
  without a priority order.]
- `closedSet.contains` and `openSet.contains` are linear scans — O(V) inside the inner loop.
- `exclude` is seeded directly into the closed set, which is how "stay inside the city" / "stay outside the city" is
  expressed.
- `buildPath` returns the path **reversed** (goal → … → start), because it pushes while walking `cameFrom` backwards
  (`:59-66`). `Model.buildStreets` never reverses it, so a street's `[0]` is the *destination* (plaza/centre) and its last
  element is the gate. This matters for `smoothStreet`'s endpoint preservation and for the `tidyUpRoads` chaining.
  [INFERRED — from `buildPath`'s push order.]
- `Graph.calculatePrice` (`:68-86`) is unused and has an off-by-one bug (`next = path[i+1]` inside a loop already advancing
  `current`/`next`). Dead code.

### 6.3 Street and road construction  [STATED] `Model.hx:219-249`

```
topology = new Topology(this)
for gate in gates:                                  // ALL gates: city wall gates + castle gates
    end = plaza != null ? plaza.shape.min( v -> distance(v, gate) ) : center
    street = topology.buildPath( gate, end, topology.outer )      // exclude countryside → stay inside
    if (street == null) throw new Error( "Unable to build a street!" )
    streets.push(street)
    if (border.gates.contains(gate)):                             // castle gates get no outward road
        dir = gate.norm(1000)                                     // 1000 units out along the gate's radial
        start = argmin over ALL topology.node2pt of distance(p, dir)
        road = topology.buildPath( start, gate, topology.inner )  // exclude city → stay outside
        if (road != null) roads.push(road)
```

- **Destination rule** [STATED via the comment]: *"Each gate is connected to the nearest corner of the plaza or to the
  central junction."* With a plaza, streets terminate on the **plaza's nearest vertex**, so the plaza acts as a roundabout
  and streets never cut across it. Without a plaza they all converge on `center` — the single vertex chosen at
  `Model.hx:128`.
- **Road far-end rule**: `gate.norm(1000)` is the gate direction from the **world origin**, scaled to radius 1000 — well
  outside the map (half-extent ≈346 for a size-15 city). The nearest existing topology node to that phantom point is the
  outermost countryside junction in roughly the gate's radial direction, and that becomes the road's tail. So roads run
  radially outward, terminating at the edge of the generated countryside. [STATED for the code; the "outermost radially"
  reading is [INFERRED] and follows from 1000 ≫ map extent.]
- **Castle gates get a street but never a road** (`border.gates.contains(gate)` is false for them) — the castle connects to
  the town, not to the countryside.
- **Only street failure is fatal.** `street == null` throws and restarts the entire city. `road == null` is silently
  dropped, leaving a gate with no outward road.

### 6.4 `tidyUpRoads()` — artery stitching  [STATED] `Model.hx:257-306`

Purpose: streets and roads overlap heavily (all gates funnel into the same central corridors), and drawing them as
polylines would double-stroke shared runs and smooth shared vertices repeatedly. [INFERRED from the comment at
`Model.hx:63-65`: *"Joined list of streets (inside walls) and roads (outside walls) without diplicating segments"*.]

```
segments = []
cut2segments(street):                                     // applied to every street then every road
    for each consecutive pair (v0, v1):
        if (plaza != null && plaza.shape.contains(v0) && plaza.shape.contains(v1)) continue   // drop plaza-hugging runs
        if no existing seg with (seg.start == v0 && seg.end == v1):  segments.push(new Segment(v0, v1))

arteries = []
while (segments.length > 0):
    seg = segments.pop()                                  // LIFO
    attached = false
    for a in arteries:
        if      (a[0]     == seg.end)   { a.unshift(seg.start); attached = true; break }
        else if (a.last() == seg.start) { a.push(seg.end);      attached = true; break }
    if (!attached) arteries.push( [seg.start, seg.end] )
```

Properties and limitations [INFERRED]:
- Deduplication is **directed and identity-based**: `(a,b)` and `(b,a)` are *different* segments and both survive. Because
  streets run gate→plaza and roads run far→gate, a shared run traversed in opposite directions is not deduplicated.
- The comment *"Removing segments which go along the plaza"* explains the plaza skip: the plaza's own edges would otherwise
  be drawn as main streets and inset twice.
- Chaining is greedy, single-pass, first-fit, and only tests an artery's two ends. **Two arteries that become joinable are
  never merged**, and a segment that could extend an artery examined later starts a new artery instead. Order depends on
  `pop()` (reverse insertion), which depends on gate order, which depends on the random gate draws.
- Junctions therefore appear as artery endpoints, which is what keeps `smoothStreet` from dragging junctions around.

### 6.5 Street smoothing  [STATED] `Model.hx:213-217, 253-254`

```haxe
function smoothStreet( street:Street ):Void {
    var smoothed = street.smoothVertexEq( 3 );
    for (i in 1...street.length-1) street[i].set( smoothed[i] );
}
for (a in arteries) smoothStreet( a );
```

- `Polygon.smoothVertexEq(f)` (`Polygon.hx:166-177`) computes, for every index, `(v_{i-1} + f·v_i + v_{i+1}) / (2 + f)`
  **with wrap-around** (it treats the polyline as closed). With `f = 3` that is `(prev + 3·cur + next)/5` — a mild
  Laplacian, 20 % pull to each neighbour.
- Only indices `1 … len-2` are written back, so **both endpoints (gate and plaza/centre) are pinned** and the wrap-around
  artifacts at indices 0 and len-1 are discarded.
- `street[i].set(...)` mutates the **shared** `Point`s, so the smoothing simultaneously curves the street *and* re-shapes
  every patch that touches it. This is the mechanism by which MFCG's blocks acquire gently curved frontages without any
  separate block-geometry step.
- **Exactly one pass**, and `smoothed` is computed before any write *for that artery only* — later arteries see earlier
  arteries' mutations, so the result is order-dependent. A vertex interior to two arteries is smoothed twice.
- `geom/Spline.hx` (Catmull-Rom-ish control-point helpers, `curvature = 0.1`) exists but is **[NAMED-ONLY] / dead** in this
  snapshot — `curvePolygon` is commented out and nothing calls `startCurve`/`midCurve`/`endCurve`.

---

## 7. Stage 5 — `createWards()`  `Model.hx:346-412`

### 7.1 Order of assignment  [STATED]

1. **Plaza → `Market`** (`:348-351`), removed from `unassigned`.
2. **Inner gate wards** (`:354-359`): for every **city-wall** gate, for every patch touching it, if
   `patch.withinCity && patch.ward == null`, assign `GateWard` with probability
   **`0.5` if walled, `0.2` if unwalled** (`Random.bool( wall == null ? 0.2 : 0.5 )`). Note the probability is drawn per
   candidate patch, and `Random.bool` is only evaluated when the first two conditions hold (Haxe `&&` short-circuits).
3. **The ward deck** (`:361-368`): `WARDS.copy()` then a token shuffle —
   `for (i in 0...Std.int(wards.length / 10))` = **3 iterations** for the 36-entry deck; each swaps `wards[index]` with
   `wards[index+1]` where `index = Random.int(0, wards.length - 1)` ∈ `[0, 34]`. So the deck is *nearly* fixed: three
   adjacent transpositions.
4. **Main assignment loop** (`:371-389`): while patches remain, `shift()` the next class off the deck (or `Slum` once the
   deck is empty), look up its **static** `rateLocation` by reflection, and either place it randomly (no rate function) or
   at the **argmin** of the score.
5. **Outskirts** (`:392-399`): only when walled. For each **wall** gate, with probability `1 − 1/(nPatches − 5)`, every
   ward-less patch touching that gate is promoted: `withinCity = true` and given a `GateWard`.
6. **Radius and countryside** (`:402-411`).

### 7.2 The `WARDS` deck  [STATED] `Model.hx:35-42`

36 entries, in this exact order (index: class):

```
 0 Craftsmen   1 Craftsmen   2 Merchant    3 Craftsmen   4 Craftsmen   5 Cathedral
 6 Craftsmen   7 Craftsmen   8 Craftsmen   9 Craftsmen  10 Craftsmen
11 Craftsmen  12 Craftsmen  13 Craftsmen  14 Administration 15 Craftsmen
16 Slum       17 Craftsmen  18 Slum       19 Patriciate 20 Market
21 Slum       22 Craftsmen  23 Craftsmen  24 Craftsmen  25 Slum
26 Craftsmen  27 Craftsmen  28 Craftsmen  29 Military   30 Slum
31 Craftsmen  32 Park       33 Patriciate 34 Market     35 Merchant
```

Composition: **Craftsmen 21, Slum 5, Merchant 2, Patriciate 2, Market 2, Cathedral 1, Administration 1, Military 1, Park 1.**

The deck is consumed in order, so **position encodes priority**: the cathedral is placed 6th (while good plaza-adjacent
patches are still free), administration 15th, the first market 21st, military 30th, the park 33rd. Beyond 36 patches
everything is a `Slum` — so a Metropolis (size 40) has a slum belt by construction. The ordering is effectively a hand-tuned
schedule; the 3-swap shuffle perturbs it only slightly. [STATED for the list; the "priority" reading is [INFERRED] and
follows from `shift()` + argmin selection.]

### 7.3 `rateLocation` — every ward class's scoring  [STATED]

Selection is `unassigned.min(patch -> patch.ward == null ? rateLocation(this, patch) : +INF)` — **lower is better**, and
`ArrayExtender.min` (`utils/ArrayExtender.hx:38-50`) returns the **first** element attaining the minimum, so ties resolve to
the earliest patch in `inner` order, i.e. nearest the origin.

| Class | `rateLocation(model, patch)` | Reading | File:line |
|---|---|---|---|
| `Ward` (base) | `return 0` | constant; see the reflection note below | `Ward.hx:123` |
| `Cathedral` | `plaza != null && patch.shape.borders(plaza.shape)` → `-1/patch.shape.square`; else `patch.shape.distance(plaza ? plaza.center : model.center) * patch.shape.square` | Plaza-fronting wins outright, and among those the **largest** patch wins (`-1/A` is most negative for big A). Otherwise minimise `distance × area` — close **and** small. Comment: *"Ideally the main temple should overlook the plaza, otherwise it should be as close to the plaza as possible."* | `Cathedral.hx:16-22` |
| `AdministrationWard` | `plaza != null ? (borders(plaza) ? 0 : distance(plaza.center)) : distance(model.center)` | Plaza-fronting scores 0 (unbeatable unless another also fronts — then first-wins). Otherwise nearest the plaza. | `AdministrationWard.hx:16-21` |
| `MerchantWard` | `patch.shape.distance(plaza ? plaza.center : model.center)` | *"as close to the center as possible."* | `MerchantWard.hx:16-18` |
| `Slum` | `-patch.shape.distance(plaza ? plaza.center : model.center)` | Negated → *"as far from the center as possible."* | `Slum.hx:16-18` |
| `Market` | `+INF` if any patch in `model.inner` that is already a `Market` **borders** this patch; else `plaza != null ? patch.square / plaza.square : patch.shape.distance(model.center)` | Hard exclusion so *"One market should not touch another"*; then *"Market shouldn't be much larger than the plaza"* — minimise the area ratio, i.e. prefer the **smallest** patch. | `Market.hx:54-62` |
| `MilitaryWard` | `0` if `citadel != null && citadel.shape.borders(patch.shape)`; `1` if `wall != null && wall.borders(patch)`; else `(citadel == null && wall == null) ? 0 : +INF` | Integer preference ladder: adjoin the citadel, else the wall, else — if the city has neither — anywhere; if it *has* one but the patch touches neither, hard-reject. *"Military ward should border the citadel or the city walls."* | `MilitaryWard.hx:18-26` |
| `PatriciateWard` | `rate = 0`; over **all** `model.patches` with a ward that border this patch: `-1` per `Park` neighbour, `+1` per `Slum` neighbour | *"prefers to border a park and not to border slums."* Note it scans `model.patches`, not `inner`, and only already-assigned neighbours count — so it depends on deck order (parks are placed at index 32, *after* the first patriciate at 19). | `PatriciateWard.hx:16-26` |
| `CraftsmenWard`, `Park`, `GateWard`, `Farm`, `Castle`, `CommonWard` | *no static `rateLocation` declared* | placed by `unassigned.random()` (retried until an unassigned patch is drawn) | — |

**The reflection subtlety** [INFERRED, and it is the single most likely place a port silently diverges]:
`Reflect.field(wardClass, "rateLocation")` (`Model.hx:375`) looks up a **static** field on a class object. Haxe does not
inherit statics through the class hierarchy on its JS/Flash targets, so for `CraftsmenWard` (→ `CommonWard` → `Ward`) the
lookup returns `null` and craftsmen wards are placed **randomly** — which is clearly the intent, since 21 of 36 deck slots
are craftsmen and the ward has no locational preference. On any target or port where the base `Ward.rateLocation` *is*
found by inheritance, it returns the constant `0` for every patch, `min` returns the first unassigned patch, and all 21
craftsmen wards would be laid down in strict centre-outward order — a visible, wrong, deterministic spiral. **A port must
implement "has its own rateLocation" explicitly rather than relying on language inheritance rules.**

### 7.4 Outskirts and countryside  [STATED] `Model.hx:392-411`

```haxe
if (wall != null)
    for (gate in wall.gates) if (!Random.bool( 1 / (nPatches - 5) ))
        for (patch in patchByVertex(gate)) if (patch.ward == null) {
            patch.withinCity = true;
            patch.ward = new GateWard( this, patch );
        }

cityRadius = 0;
for (patch in patches)
    if (patch.withinCity)
        for (v in patch.shape) cityRadius = Math.max( cityRadius, v.length );
    else if (patch.ward == null)
        patch.ward = Random.bool( 0.2 ) && patch.shape.compactness >= 0.7 ?
            new Farm( this, patch ) : new Ward( this, patch );
```

- **Suburb probability** is `1 − 1/(nPatches − 5)` per wall gate. Size 6 → `1/1 = 1` → **suburbs never appear in a Small
  Town**; size 10 → 80 %; size 15 → 90 %; size 24 → 94.7 %; size 40 → 97.1 %. Larger cities almost always spill outside
  their gates. Note the expression divides by zero for `nPatches == 5`, which the size clamp (≥6) prevents.
- **`cityRadius` = max `|v|` over all vertices of all `withinCity` patches** — distance from the **world origin**, matching
  the comment *"Radius of the city is the farthest point of all wards from the center"* even though `center` is a different
  point. It exists only for view fitting (`TownScene.hx:51-52`).
- **Countryside**: 20 % of ward-less outside patches become a `Farm`, **but only if `compactness ≥ 0.7`** — long thin cells
  are rejected because the farm's field subdivision would look wrong in them. Thanks to `&&` short-circuiting, compactness
  is only computed for the 20 %. Everything else gets a bare `Ward` whose `createGeometry` emits an empty array
  (`Ward.hx:32-34`) and which `CityMap` draws as nothing (`CityMap.hx:59-60`).

---

## 8. Stage 6 — `buildGeometry()` and the cutting toolkit

`Model.hx:414-416` is a one-liner: `for (patch in patches) patch.ward.createGeometry();`. Every patch must have a ward by
this point or it is a null dereference — an **uncaught** failure (see §11).

The iteration order is `model.patches`, which is: Voronoi order (ascending seed radius), mutated in place by
`ArrayExtender.replace` during gate splitting (`CurtainWall.hx:85`, which inserts the new halves **at the old patch's
position**, `ArrayExtender.hx:91-96`) and thinned by the `radius*3` filter. Since every `createGeometry` draws from the one
global stream, this order is part of the determinism contract.

### 8.1 `Ward.getCityBlock()` — street setbacks  [STATED] `Ward.hx:36-59`

```
innerPatch = (model.wall == null) || patch.withinWalls
for each edge (v0, v1) of the patch:
    if (wall != null && wall.bordersBy(patch, v0, v1))       inset = MAIN_STREET/2          // 1.0
    else:
        onStreet = innerPatch && plaza != null && plaza.shape.findEdge(v1, v0) != -1        // plaza frontage
        if (!onStreet) onStreet = any artery containing BOTH v0 and v1
        inset = (onStreet ? MAIN_STREET : (innerPatch ? REGULAR_STREET : ALLEY)) / 2        // 1.0 / 0.5 / 0.3
return patch.shape.isConvex() ? patch.shape.shrink(insetDist) : patch.shape.buffer(insetDist)
```

Constants (`Ward.hx:18-20`): **`MAIN_STREET = 2.0`, `REGULAR_STREET = 1.0`, `ALLEY = 0.6`** — halved because each side of
the street sets back by half its width. So a block is inset **1.0** along the wall and along main streets/plaza frontage,
**0.5** along ordinary inner edges, **0.3** along outskirt edges. This *is* the street width model: streets are not
geometry, they are the negative space between inset blocks, and only arteries (drawn) and the wall get the full 2.0.

[INFERRED] The artery test `street.contains(v0) && street.contains(v1)` checks membership, not adjacency, so a patch edge
whose two endpoints both lie on the same artery but non-consecutively is falsely widened. Rare but real.

Convex patches use `shrink` (`Polygon.hx:350-362`: successive half-plane cuts, always convex output, vertex count changes);
concave ones use `buffer` (`Polygon.hx:246-339`: offset every edge independently, resolve self-intersections by inserting
each crossing point twice, decompose into loops, **return the loop with the largest signed area**). The in-source comments
grade these honestly: `inset` is *"not very relyable … better for convex vertices than for concave ones"*; `buffer` is
*"kind of reliable for both … but only if all distances are equal. Otherwise weird 'steps' are created"*; `shrink`
*"can't outset … Works very well for convex polygons, not so much concave ones."*

### 8.2 `Cutter` — the four subdivision primitives  [STATED] `Cutter.hx`

| primitive | maths | used by |
|---|---|---|
| `bisect(poly, vertex, ratio=0.5, angle=0, gap=0)` | `p1 = lerp(vertex, next(vertex), ratio)`; `d = next − vertex` rotated by `angle`; `p2 = p1 + rot90(d)`. So the cut line passes through a point on the chosen edge, **perpendicular to that edge**, jittered by `angle`. Then `poly.cut(p1, p2, gap)`. | `Ward.createAlleys` |
| `radial(poly, center=centroid, gap)` | one triangle `(center, v0, v1)` per edge, each `shrink([gap/2, 0, gap/2])` — a fan | `Park` (compact) |
| `semiRadial(poly, center=vertex nearest centroid, gap)` | same fan but anchored on an existing **vertex**, skipping the two edges incident to it; sides are only shrunk where they are not already polygon edges | `Park` (elongated) |
| `ring(poly, thickness)` | for each edge, build the line offset inward by `thickness`; **sort the cuts by edge length ascending** (*"Short sides should be sliced first"*); cut successively, keeping `halves[0]` as the shrinking core and collecting `halves[1]` as the ring pieces | `Cathedral` (40 % of the time) |

`Polygon.cut(p1, p2, gap)` (`Polygon.hx:464-515`) is the workhorse: intersect the infinite line with every edge
(`GeomUtils.intersectLines`, `:6-17`), keep hits with edge-parameter in `[0,1]`; **if exactly two hits**, split into two
polygons sharing two freshly-created `Point`s, optionally `peel` each half by `gap/2` to open an alley, and return them
ordered `[left, right]` relative to the cut direction via `GeomUtils.cross`. **If the count is not 2 it returns
`[copy of this]` — the cut silently fails.** That is the origin of the `createAlleys` infinite-recursion hazard (§13.4).

Crucially, cut points are **new** `Point` objects — building subdivision never perturbs the patch graph.

### 8.3 `Ward.createAlleys` — recursive OBB-free bisection  [STATED] `Ward.hx:125-157`

```
v = the start vertex of the LONGEST edge of p
spread = 0.8 * gridChaos
ratio  = (1 - spread)/2 + Random.float() * spread                    // 1 draw, centred on 0.5
angleSpread = (PI/6) * gridChaos * (p.square < minSq*4 ? 0.0 : 1)    // no angle jitter once small
b = (Random.float() - 0.5) * angleSpread                             // 1 draw ALWAYS, even if spread is 0
halves = Cutter.bisect( p, v, ratio, b, split ? ALLEY : 0.0 )
for half in halves:
    if (half.square < minSq * 2^(4 * sizeChaos * (Random.float() - 0.5))):     // 1 draw
        if (!Random.bool(emptyProb)) buildings.push(half)                      // 1 draw
    else:
        buildings ++= createAlleys( half, minSq, gridChaos, sizeChaos, emptyProb,
                                    half.square > minSq / (Random.float()*Random.float()) )  // 2 draws
```

- **The split axis is "perpendicular to the longest edge"** — a cheap stand-in for an oriented-bounding-box bisection. It is
  the single biggest visual difference from the live generator, which has a real `PolyBounds.obb` (§14).
- `gridChaos` controls both *where* along the edge the cut falls (`ratio` spread up to ±0.4) and *how much* the cut tilts
  (up to ±π/12 ≈ ±15°). **Angle jitter is switched off once the polygon is smaller than `4 × minSq`** — the comment says
  *"Trying to keep buildings rectangular even in chaotic wards."*
- `sizeChaos` randomises the stopping area **multiplicatively**: threshold `= minSq · 2^(4·sizeChaos·U(−0.5,0.5))`, i.e.
  `minSq` scaled by a factor in `[2^(−2·sizeChaos), 2^(+2·sizeChaos)]`. At `sizeChaos = 0.8` that is a **16× range**.
- `emptyProb` is the chance a finished lot is **discarded**, producing courtyards/yards/squares.
- The `split` flag decides whether a cut opens an `ALLEY`-wide gap (0.6) or is a hairline (0.0) — hairline cuts separate
  buildings inside one block; alley cuts separate blocks. Its recursive value,
  `half.square > minSq / (Random.float()·Random.float())`, uses a **product of two uniforms** (density `−ln x`, strongly
  biased toward 0), so the divisor is usually large and the test usually **false** → deeper levels are usually hairline.
  Alleys therefore appear mostly at the top of the recursion. [INFERRED from the distribution of `U·U`.]

### 8.4 `Ward.createOrthoBuilding`  [STATED] `Ward.hx:162-197`

For monumental buildings (castle, cathedral, farm). Fixes **two global axes** `c1 = vector of the longest edge`,
`c2 = rot90(c1)`, then recursively cuts, each time choosing whichever axis is **more perpendicular** to the current longest
edge (`|v·c1|` vs `|v·c2|` — pick the smaller) at `ratio = 0.4 + U·0.2`. Stop threshold is
`minBlockSq · 2^(Random.normal()·2 − 1)`, and a finished cell is kept with probability `fill`. The whole thing is wrapped in
`while (true) { blocks = slice(...); if (blocks.length > 0) return blocks; }` — **retry until at least one block survives**,
which would spin forever if `fill` were 0 (shipped values are 0.5/0.6/0.8, so it terminates).

Result: rectilinear, axis-locked complexes — visually distinct from the free-angle `createAlleys` housing.

### 8.5 `Ward.filterOutskirts` — density thinning  [STATED] `Ward.hx:61-119`

Applied by `CommonWard.createGeometry` whenever `!model.isEnclosed(patch)` (`CommonWard.hx:26-27`). It removes buildings so
that a ward on the city's edge fades out instead of ending in a hard line.

1. **Populated edges.** For each patch edge, decide a "pull" weight:
   - on an artery → `factor = 1`
   - else if the neighbouring patch across that edge is `withinCity` → `factor = model.isEnclosed(n) ? 1 : 0.4`
   - else the edge contributes nothing.
   For each such edge, store its line plus `d` = the largest perpendicular distance from any *other* patch vertex to that
   line, scaled by `factor`. `d` is the ward's "depth" from that frontage.
2. **Vertex density.** For each patch vertex: `1` if it is a gate; else `2·Random.float()` if **every** patch touching it is
   `withinCity`; else `0`. (Haxe's ternary is lazy — the draw only happens on the `every(...)` branch.)
3. **Per building**: `minDist = min over populated edges and building vertices of (perpendicular distance / edge.d)`,
   i.e. the building's normalised depth from the nearest live frontage. Then the vertex densities are
   **inverse-distance interpolated** to the building's centre (`Polygon.interpolate`, `Polygon.hx:517-525`: weights
   `1/dist` to each polygon vertex, normalised) giving `p`, and `minDist /= p`.
   **Keep iff `Random.fuzzy(1) > minDist`** — i.e. keep with probability governed by an Irwin–Hall(3)/3 variate
   (mean 0.5, roughly bell-shaped on [0,1]) compared against depth/density.

Net behaviour: buildings hug roads and the enclosed side of the ward; the far, countryside-facing interior thins out
stochastically. This is MFCG's ragged suburb edge. [INFERRED reading of the formula; the code is [STATED].]

### 8.6 Per-ward geometry parameters  [STATED]

`CommonWard(model, patch, minSq, gridChaos, sizeChaos, emptyProb = 0.04)` (`CommonWard.hx:13-28`). Note every `minSq`
uses `Random.float() * Random.float()` — a product of uniforms, so **most wards land near the low end of their range**.

| Ward | `minSq` | `gridChaos` | `sizeChaos` | `emptyProb` | Source comment |
|---|---|---|---|---|---|
| `CraftsmenWard` | `10 + 80·U·U` | `0.5 + U·0.2` | `0.6` | 0.04 | *small to large* / *moderately regular* |
| `MerchantWard` | `50 + 60·U·U` | `0.5 + U·0.3` | `0.7` | **0.15** | *medium to large* |
| `PatriciateWard` | `80 + 30·U·U` | `0.5 + U·0.3` | `0.8` | **0.2** | *large* |
| `AdministrationWard` | `80 + 30·U·U` | `0.1 + U·0.3` | `0.3` | 0.04 | *large* / *regular* |
| `Slum` | `10 + 30·U·U` | `0.6 + U·0.4` | `0.8` | **0.03** | *small to medium* / *chaotic* |
| `GateWard` | `10 + 50·U·U` | `0.5 + U·0.3` | `0.7` | 0.04 | — |
| `MilitaryWard` | `√(block.square)·(1 + U)` | `0.1 + U·0.3` | `0.3` | **0.25** | *regular* / *squares* |

Non-`CommonWard` geometry:
- **`Market`** (`Market.hx:14-52`): `statue = Random.bool(0.6)`; `offset = statue || Random.bool(0.3)`
  (*"we always offset a statue and sometimes a fountain"*). Statue = `Polygon.rect(1+U, 1+U)` rotated to the longest edge's
  direction; fountain = `Polygon.circle(1+U)` (a 16-gon, `Polygon.hx:540-541`). Offset position =
  `lerp(centroid, midpoint of longest edge, 0.2 + U·0.4)`. **One object, no stalls.**
- **`Cathedral`** (`Cathedral.hx:11-14`): 40 % `Cutter.ring(getCityBlock(), 2 + U·4)` (a cloister/nave ring), else
  `createOrthoBuilding(getCityBlock(), 50, 0.8)`.
- **`Park`** (`Park.hx:7-12`): `compactness ≥ 0.7 ? Cutter.radial : Cutter.semiRadial`, gap `ALLEY`. Groves are the fan
  sectors themselves.
- **`Castle`** (`Castle.hx:24-27`): `shrinkEq(4.0)` then `createOrthoBuilding(block, √(block.square)·4, 0.6)`.
- **`Farm`** (`Farm.hx:11-18`): a `4 × 4` rect placed at `lerp(random patch vertex, centroid, 0.3 + U·0.4)`, rotated by
  `U·π`, then `createOrthoBuilding(housing, 8, 0.5)`. Note the **fields are never generated** — only the farmstead.
- **`Ward`** base: `geometry = []`.

### 8.7 Rendering conventions  [STATED] `mapping/CityMap.hx`, `Brush.hx`, `Palette.hx`

Draw order (z from bottom): **roads → patch fills → invisible hot areas → walls**. Roads are drawn as a
`MAIN_STREET + NORMAL_STROKE`-wide `palette.medium` casing with a `MAIN_STREET − NORMAL_STROKE`-wide `palette.paper` core —
a two-pass stroke that yields a road with outlines (`CityMap.hx:81-87`). **Streets inside the city are never stroked at
all**; they exist only as the gap left by block insets. Strokes: `THIN 0.15`, `NORMAL 0.30`, `THICK 1.80`. Castle and
cathedral use an outline-then-fill double pass (`:116-127`) so they read as heavier. Gates are drawn as a
`THICK_STROKE × 2` bar of length `THICK_STROKE × 3` across the wall, oriented along `next(gate) − prev(gate)` (`:107-114`).
Default palette `0xccc5b8 / 0x99948a / 0x67635c / 0x1a1917` plus seven alternates (BLUEPRINT, BW, INK, NIGHT, ANCIENT,
COLOUR, SIMPLE) that are defined but not selectable in this build — [NAMED-ONLY].

**The project ships exactly one asset**, `Assets/maroubra.png` (`project.xml`, `<image path="maroubra.png" id="font"/>`).
Opened with the Read tool: it is a single-row bitmap **font atlas** — white glyphs on transparency, a few pixels tall —
used only for the UI labels and tooltip (`Main.hx:21-23`, `uiFont.letterSpacing = 1`, `uiFont.baseLine = 8`). **There is no
texture, hatch, paper grain or brush asset anywhere in the repo**: the entire 2017 map look is vector strokes and flat
fills from the four-colour palette. Any paper/ink texture in the live generator was added after this snapshot. [SHOWN for
the image contents; [INFERRED] for the "added later" half, from the absence of any other asset here.]

---

## 9. Every `Random` draw, in order (the determinism contract)

`U` = one `Random.float()`. `Random.normal()` = 3 draws. `Random.fuzzy(1)` = 3 draws. `Random.bool(c)` = 1 draw.
`Random.int(a,z)` = 1 draw. **Draws are consumed in Haxe's left-to-right argument-evaluation order**, and lazily in
ternaries and `&&`/`||` short-circuits — both of which the code exploits.

```
Model.new
  1   plazaNeeded   = bool()
  2   citadelNeeded = bool()
  3   wallsNeeded   = bool()
  [retry loop begins — the three flags are NOT redrawn on retry]

buildPatches                                              8·nPatches draws
  +1  sa = float()
  +(8·nPatches − 1)   one float per seed i ≥ 1   (i = 0 draws nothing)
  Voronoi build / 3× relax / sort / partioning              0 draws

optimizeJunctions                                          0 draws

buildWalls
  CurtainWall(border).buildGates: 1 int() per gate accepted
  Castle → CurtainWall(citadel).buildGates: 1 int() per castle gate
  (findCircumference, smoothing, towers, radius cull)       0 draws

buildStreets                                               0 draws   (A* is deterministic)
tidyUpRoads / smoothing                                    0 draws

createWards
  plaza Market constructor                                 0 draws
  for each border gate, for each touching patch that is withinCity && ward==null:  1 bool()
  3 × int()                                                (deck shuffle)
  main loop, per patch:
      no rateLocation  → ≥1 float() (unassigned.random(), retried while ward != null)
      has rateLocation → 0 draws for selection
      then the constructor:
          CraftsmenWard / MerchantWard / PatriciateWard / Slum / AdministrationWard / GateWard → 3 draws
              (order: minSq's U, U, then gridChaos's U)
          Cathedral / Market / MilitaryWard / Park / Ward / Farm / Castle                      → 0 draws
  outskirts: 1 bool() per wall gate; +3 draws per GateWard constructed
  countryside: 1 bool(0.2) per ward-less outside patch; Farm/Ward constructors draw nothing

buildGeometry — per patch, in model.patches order:
  Ward (empty)          0
  Park                  0
  Market                bool(0.6);  if !statue bool(0.3);  statue ? U,U : U;  if offset U     → 3–4
  Cathedral             bool(0.4);  if ring +U;  else createOrthoBuilding draws
  Castle                createOrthoBuilding draws
  Farm                  U (vertex pick), U (lerp t), U (rotation), then createOrthoBuilding draws
  MilitaryWard          U (minSq), U (gridChaos), then createAlleys draws
  CommonWard subclasses createAlleys draws, then filterOutskirts if !isEnclosed

  createAlleys, per recursion node:   U (ratio), U (angle) ,
                                      per half: U (size threshold) then either bool(emptyProb)
                                      or U,U (split flag) + recursion
  createOrthoBuilding, per slice:     U (ratio), per half: normal() (3 draws) then bool(fill) or recursion;
                                      the outer while(true) retries the whole slice on an empty result
  filterOutskirts:                    1 U per non-gate vertex whose patches are all withinCity,
                                      then fuzzy(1) = 3 draws per candidate building
```

Two determinism landmines for a port [INFERRED]:
- **`i == 0` draws nothing** in the spiral, and `Random.fuzzy(0)` draws nothing. An eager port shifts the whole stream.
- The `&&` in `patch.withinCity && patch.ward == null && Random.bool(...)` and in
  `Random.bool(0.2) && patch.shape.compactness >= 0.7` must short-circuit identically.

---

## 10. Complete magic-number inventory

| Value | Meaning | Location |
|---|---|---|
| `48271.0`, `2147483647` | LCG multiplier / modulus (MINSTD) | `Random.hx:7-8` |
| `6, 10, 15, 24, 40` | size-bucket boundaries; default `15`; URL clamp `[6,40]` | `Model.hx:24-28`, `StateManager.hx:15,23`, `TownScene.hx:28-31` |
| `× 8` | seeds generated per requested patch | `Model.hx:101` |
| `5` | spiral angle constant, `a = sa + 5·√i` | `Model.hx:102` |
| `10`, `2`, `+U` | spiral radius `r = 10 + i·(2 + U)` | `Model.hx:103` |
| `3` (iterations), `3` (indices) | relaxation passes; number of leading indices relaxed | `Model.hx:109-111` |
| `0.5`, `/2` | Voronoi frame padding: 25 % of full extent per side | `Voronoi.hx:163-166` |
| `8` | junction merge distance threshold (world units) | `Model.hx:321` |
| `0.5` | junction midpoint weight | `Model.hx:327-328` |
| `min(1, 40/len)` | wall smoothing factor (**= 1 for all shipped sizes**) | `CurtainWall.hx:32` |
| `f = 1` | default `smoothVertex` weight (gate smoothing) | `Polygon.hx:144`, `CurtainWall.hx:109` |
| `> 1` | min adjacent inner wards for a gate candidate | `CurtainWall.hx:51-53` |
| `3` | gate spacing: candidates consumed per gate; loop-continue threshold | `CurtainWall.hx:92-101` |
| `> 3` | min vertex count to split an outer ward at a gate | `CurtainWall.hx:71` |
| `× 3` | patch cull radius multiple of wall radius | `Model.hx:156` |
| `0.75` | min citadel compactness, else throw | `Model.hx:165` |
| `1000` | outward radial probe distance for a road's far end | `Model.hx:233` |
| `3` | street smoothing weight in `smoothVertexEq(3)` | `Model.hx:214` |
| `2.0 / 1.0 / 0.6` | `MAIN_STREET / REGULAR_STREET / ALLEY` (halved as setbacks) | `Ward.hx:18-20` |
| `0.2 / 0.5` | inner gate-ward probability, unwalled / walled | `Model.hx:356` |
| `Std.int(36/10) = 3` | adjacent swaps in the ward-deck shuffle | `Model.hx:363` |
| `1/(nPatches − 5)` | probability of **skipping** suburbs at a wall gate | `Model.hx:393` |
| `0.2`, `0.7` | farm probability; min farm compactness | `Model.hx:409-410` |
| `0.8`, `π/6`, `×4`, `×4`, `2^` | `createAlleys`: ratio spread factor, max angle jitter, angle cutoff area, sizeChaos exponent scale | `Ward.hx:137-152` |
| `0.4 + U·0.2`, `normal()·2 − 1` | `createOrthoBuilding` cut ratio and stop threshold exponent | `Ward.hx:168, 176` |
| `50`, `0.8`; `2 + U·4`; `0.4` | Cathedral ortho params; ring thickness; ring probability | `Cathedral.hx:12-14` |
| `4.0`, `√A·4`, `0.6` | Castle setback, block size, fill | `Castle.hx:25-26` |
| `4×4`, `8`, `0.5`, `0.3 + U·0.4` | Farm housing rect, block size, fill, placement lerp | `Farm.hx:12-17` |
| `0.6`, `0.3`, `1 + U`, `0.2 + U·0.4` | Market statue prob, fountain-offset prob, object size, offset lerp | `Market.hx:17-46` |
| `0.7` | Park radial-vs-semiradial compactness threshold | `Park.hx:9` |
| `16` | `Polygon.circle` = 16-gon | `Polygon.hx:540-541` |
| `0.000001` | `Polygon.buffer` intersection epsilon | `Polygon.hx:13` |
| `0.15 / 0.30 / 1.80` | THIN / NORMAL / THICK stroke | `Brush.hx:8-10` |
| `1.5×` | castle tower radius multiplier | `CityMap.hx:97` |
| `0.1` | `Spline.curvature` (dead code) | `Spline.hx:11` |
| `screenDPI / 24` | global UI scale | `Main.hx:31` |
| `× 0.5`, `ratio > 2` | viewport fit factor and anti-letterbox rule | `TownScene.hx:55` |

---

## 11. The retry loop and every throw site

```haxe
do try {
    build();
    instance = this;
} catch (e:Error) {
    trace( e.message );
    instance = null;
} while (instance == null);
```
`Model.hx:78-84`

**Three throw sites**, all `openfl.errors.Error`:

| # | Message | Condition | File:line |
|---|---|---|---|
| 1 | `"Bad walled area shape!"` | no gate candidates at all (`entrances.length == 0`) | `CurtainWall.hx:57-58` |
| 2 | `"Bad walled area shape!"` | the selection loop produced zero gates (possible when `1 ≤ entrances.length < 3` on entry) | `CurtainWall.hx:103-104` |
| 3 | `"Bad citadel shape!"` | `citadel.shape.compactness < 0.75` | `Model.hx:165-166` |
| 4 | `"Unable to build a street!"` | A* from a gate to the plaza/centre returned `null` | `Model.hx:248` |

(Sites 1 and 2 share a message, so the trace is ambiguous between them.)

Properties and hazards [STATED where cited, [INFERRED] where reasoned]:

- **Retries continue the same PRNG stream — they do not reseed.** `Random.reset` is only called once, before the loop. Each
  retry therefore consumes fresh randomness and produces a genuinely different city. The *published* seed in the URL still
  reproduces everything because the retries are deterministic replays of the same stream. [INFERRED — `Model.hx:71` is
  outside the loop.] **The live MFCG behaves differently — it reseeds per attempt (§14).**
- **`plazaNeeded` / `citadelNeeded` / `wallsNeeded` are drawn once, before the loop**, so a city that keeps failing keeps
  retrying *with the same structural intent*. If a seed's `wallsNeeded = true` and the wall shape is chronically bad, the
  loop can spin a long time. There is no attempt cap and no fallback to "try without walls". [STATED `Model.hx:74-76`.]
- **`build()` does not reset `plaza` or `citadel` to `null`.** `streets`/`roads` are cleared (`Model.hx:88-89`) and
  `patches`/`inner`/`center`/`gates`/`arteries` are overwritten, but `plaza` and `citadel` are only *conditionally*
  reassigned inside `buildPatches` (`:129-133`). If a retry produces fewer real regions than `nPatches`, the previous
  attempt's `citadel` survives as a **dangling reference into discarded patch objects**, and `buildWalls` will build a
  castle around a patch that is no longer in `model.patches`. [INFERRED — a genuine latent bug; the conditions are rare but
  not impossible after the `optimizeJunctions` collapse.]
- **`catch (e:Error)` catches only `openfl.errors.Error`.** Null dereferences, array-index errors, `NaN` propagation and
  infinite loops are *not* caught: they kill the generation outright. The known candidates are
  `findCircumference`'s `A[-1]` null push (§5.1), the `createAlleys` recursion on a failed cut (§13.4), the degenerate
  circumcentre (§3.2), and a patch reaching `buildGeometry` with `ward == null`. [INFERRED.]
- `instance` is a **static** field, and the constructor writes it. A failed build leaves `Model.instance = null`, which is
  also the loop's termination test — so the loop and the global are the same variable. [STATED `Model.hx:22, 80-84`.]

---

## 12. Known failure modes and how (or whether) 2017 handles them

| # | Failure | Handling in this snapshot |
|---|---|---|
| 1 | No gate candidates on the wall | throw → full rebuild |
| 2 | Citadel too elongated (`compactness < 0.75`) | throw → full rebuild |
| 3 | A* cannot reach the plaza from a gate | throw → full rebuild |
| 4 | A* cannot find an outward road | **silently dropped**; the gate has no road |
| 5 | Gate's single outer patch is a triangle | **not split**; falls through to #4 |
| 6 | `Polygon.cut` finds ≠ 2 intersections | returns the polygon unchanged; `createAlleys` may recurse on an identical polygon (see §13.4) |
| 7 | `createOrthoBuilding`'s slice yields nothing | `while (true)` retries with fresh randomness |
| 8 | Ward too elongated for a fan (`Park`) | falls back from `radial` to `semiRadial` |
| 9 | Countryside patch too elongated for a farm | falls back to an empty `Ward` |
| 10 | Two markets adjacent | `+INF` score — hard exclusion |
| 11 | Military ward with neither citadel nor wall to hug | `+INF` unless the city has neither, in which case 0 |
| 12 | Concave block breaks `shrink` | switch to `buffer` and keep the largest resulting loop |
| 13 | Degenerate patch after junction collapse | **unhandled** |
| 14 | Broken circumference chain | **unhandled** (`null` pushed) |
| 15 | Non-`openfl.errors.Error` exception | **unhandled** — escapes the retry loop |

---

## 13. Bugs in this snapshot that a re-implementer must decide about

Each is confirmed by reading the cited lines; the *consequence* statements are [INFERRED].

**13.1 `Polygon.distance(p)` never updates its running minimum** — `Polygon.hx:155-164`:
```haxe
var v0 = this[0];
var d = Point.distance( v0, p );
for (i in 1...this.length) {
    var v1 = this[i];
    var d1 = Point.distance( v1, p );
    if (d1 < d) v0 = v1;            // updates v0, never d
}
return d;                            // always distance from this[0]
```
It returns **the distance from the polygon's first vertex**, not the nearest vertex (and, per its own comment, never the
true polygon distance). This function is load-bearing in **six** places: the `radius*3` patch cull (`Model.hx:156`) and the
scoring of `Cathedral`, `MerchantWard`, `Slum`, `AdministrationWard` and `Market`. Because a patch's first vertex is an
arbitrary Voronoi circumcentre, all five distance-based ward scores carry a per-patch bias of up to one patch radius.
**Fixing this changes every map.** It is a legitimate behaviour shift that must be recorded, not slipped in silently.

**13.2 `CurtainWall.real` is hard-set to `true`** — `CurtainWall.hx:22-23`: the constructor signature takes `real:Bool` but
the body assigns `this.real = true;`. The *parameter* is used correctly for smoothing and gate splitting, but the *field*
— read only by `buildTowers` (`:114`) — is always true. Harmless only because `buildTowers()` is called solely for real
walls (`Model.hx:152, 162`). A port that calls `buildTowers` unconditionally will grow towers on invisible walls.

**13.3 The relaxation off-by-four** — §3.3. Three of the four `toRelax` entries are frame corners and are silently ignored;
the fourth targets index `nPatches − 4` rather than the citadel.

**13.4 `createAlleys` can recurse forever on a failed cut** — when `Polygon.cut` finds ≠ 2 intersections it returns
`[copy of this]` (`Polygon.hx:513-514`), so `createAlleys` recurses on a polygon of the same area. The only escape is the
randomised stop threshold `minSq · 2^(4·sizeChaos·U)` eventually exceeding it — which is probabilistic, and impossible when
`sizeChaos` is small and the area is far above `minSq`. The live MFCG logs `Bisector.hx:281: (0) Failed to make a cut`
(`captures/mfcg/2026-09-21T05-03-24/report.md`), i.e. this case was later detected and reported explicitly (§14).

**13.5 `Graph.aStar` is not A\*** — §6.2. No heuristic, no priority queue, FIFO expansion, closed on first pop. Paths are
not guaranteed shortest. This is load-bearing *aesthetically*.

**13.6 `Graph.calculatePrice` off-by-one** (`Graph.hx:68-86`) — `next = path[i+1]` while `current`/`next` are also advanced.
Dead code; do not port.

**13.7 `Cutter.ring`'s comparator returns a `Float`** (`Cutter.hx:77`) — it type-checks only because the array is
`Array<Dynamic>`. Intent is ascending sort by edge length.

**13.8 `Polygon.filterShort`, `simplyfy`, `insetEq`, `bufferEq`, `rect`/`regular` helpers and all of `Spline.hx`** are
present but unused by the pipeline — do not mistake them for part of the algorithm.

---

## 14. Limitations of this 2017 design, against the live MFCG trace

Evidence used (no JavaScript bundle was opened):
`captures/mfcg/2026-09-21T05-03-24/report.md`, `captures/mfcg/2026-09-21T05-06-58/{profile,coverage,draw}/console.jsonl`,
and the per-function call counts in `captures/mfcg/**/coverage/gen-*.calls.json`. **All call counts quoted below are
aggregates across every captured generation in `captures/mfcg/*/coverage/`**, so they indicate relative hotness, not
per-city cost. The live build ships with its Haxe
`trace()` positions intact, so the console lines carry **real file paths, line numbers and method names** from
`Source/com/watabou/mfcg/…`, and the coverage records carry fully-qualified function labels. Everything in this section is
**[SHOWN]** (present in the recording) plus **[INFERRED]** (what it implies about the 2017 code), never [STATED] — no
creator prose explains these.

Live stage list, logged from `City.hx:183-191` in this order with per-stage milliseconds:
`buildPatches, optimizeJunctions, buildDomains, buildWalls, buildStreets, buildCanals, createWards, buildCityTowers,
buildGeometry`. Three stages are new, and the class inventory shows why.

| 2017 limitation | What the live trace shows | Evidence |
|---|---|---|
| **No water at all.** `Model.waterbody` is declared (`Model.hx:47`) and never written — [NAMED-ONLY]. The README admits waterbodies are missing. | A whole `buildCanals` stage plus `com.watabou.mfcg.model.Canal` with `createRiver`, `deltaRiver`, `regularRiver`, `validateCourse`, `buildTopology`, `intersect`, `updateState`; `City.getOcean`, `City.getCanalWidth`, `City.addHarbour`, `wards.Harbour`, `CurtainWall.addWatergate`. Rivers are generated by **propose-and-reject**: `Canal.hx:268: discard` appears 884 times across the captures, and `City.hx:156: *** Unable to build a canal!` 23 times. | `calls.json`; `console.jsonl` |
| **One patch = one ward.** `createWards` assigns a class per Voronoi cell, so wards can never span cells and a "district" is never a first-class object. | New `buildDomains` stage plus `District`, `DistrictBuilder`, `Grower`, `DocksGrower`, `ParkGrower`, `WardGroup`. `Grower.grow/validatePatch/validateEdge` (1338/3879/3948 calls) is region-growing: districts are **grown across multiple cells** from seeds, with per-edge and per-patch validity tests. `District.check4holes`, `getRidge`, `pickFaces`, `createGroups`, `createParams`. | `calls.json` |
| **O(n²) Bowyer–Watson Voronoi**, rebuilt 4× per city. | `com.watabou.geom.Delaunator` (362 796 calls: `link`, `inCircle`, `legalize`, `orient`, `hashKey`, `pseudoAngle`, `triCircumcenter`, `edgesAroundPoint`) — the standard O(n log n) Delaunator algorithm, plus a separate `Triangulation` class. | `calls.json` |
| **Topology is plain arrays + reference equality**, with all the winding and pinch-point fragility of §2. | A real half-edge mesh: `DCEL` (`addVertex`, `getEdge`, `collapseEdge`), `HalfEdge`, `Face`, `Vertex`, `EdgeChain`, `Rib`. `DCEL.collapseEdge` (3149) is the principled version of `optimizeJunctions`'s hand-rolled midpoint merge — and it is called often enough to be a routine mesh operation, not a one-off cleanup. | `calls.json` |
| **Deterministic spiral seeding** — rigid radial banding, no way to vary local density. | `com.watabou.geom.PoissonPattern` (93 484 calls: `warp`, `validate`, `step`, `emit`) — **warped Poisson-disc sampling**, i.e. blue-noise seeds with a spatial warp for density control. | `calls.json` |
| **Block subdivision splits perpendicular to the longest edge** (`Cutter.bisect`), which is only an approximation of a good axis. | `com.watabou.geom.polygons.PolyBounds.obb` + `convexHull` (**215 693 calls each — exactly paired**, so every OBB is computed from a fresh hull) — a real **oriented bounding box via convex hull**, and `mfcg.utils.Bisector` (`partition`, `subdivide`, `split`, `makeCut`, `isSmallEnough`, `detectStraight` at 17 819) replacing `Ward.createAlleys`. `detectStraight` implies explicit handling of straight/aligned frontages. | `calls.json` |
| **A failed cut is silent and can loop forever** (§13.4). | `Bisector.hx:281: (0) Failed to make a cut` is logged explicitly; likewise `WardGroup.hx:107: Failed to create a non-empty alleys group`. Both are detected and reported rather than spun on. | `console.jsonl` |
| **The citadel quality gate is a hard throw** at `compactness < 0.75`. | `Castle.hx:60: Bloating the citadel...` followed by `Castle.hx:84: Equalizing... <value>` iterations whose values climb monotonically — observed minimum `0.4675`, observed maximum `0.7499`, never ≥ 0.75. The **same 0.75 threshold survives**, but a bad citadel is now *repaired* by iterative bloating/equalising instead of discarding the whole city. | `console.jsonl` (204 `Equalizing` lines) |
| **A failed street aborts the entire city** (`Model.hx:248`). | `City.hx:591: Unable to build a street!` appears 37 times **mid-run**, with `buildStreets` completing and the pipeline continuing to `buildCanals`. The failure is now tolerated and logged. | `console.jsonl` |
| **Retries continue the same PRNG stream.** | The live retry **reseeds**: `>> seed:777001 size:80` (requested), `-->> seed:777001` (attempt 1), `*** Unable to build a canal!`, then `-->> seed:2128702816` (attempt 2) with no new `>>`. So the outer seed is the user's and each attempt draws a fresh internal seed. | `captures/mfcg/2026-09-21T05-06-58/profile/console.jsonl` lines 1-66 |
| **No standalone towers.** Towers are exactly the non-gate wall vertices, radius fixed by a stroke constant. | New `buildCityTowers` stage; `CurtainWall.getTowerRadius` called 4242 times — **tower radius is now computed per tower**. Gate construction is split into `buildCityGates` / `buildCastleGate`, and `CurtainWall.splitSegment` finally uses the `segments:Array<Bool>` machinery that lies dormant in 2017. | `calls.json`, `console.jsonl` |
| **Blocks are a single polygon inset** (`getCityBlock`), with no notion of street frontage or lots. | `model.blocks.Block` (`indentFronts`, `filterInner`) and `blocks.TwistedBlock.createLots` — explicit **frontage indentation** and **lot** subdivision. | `calls.json` |
| **Street smoothing is one Laplacian pass**; `Spline.hx` is dead. | `com.watabou.geom.Chaikin.render` (211) and `com.watabou.geom.Cubic` (`cubic` 1512, `build`/`smoothOpen` 126 each) — Chaikin corner-cutting and cubic spline smoothing of open polylines are both live; the dead `Spline.hx` idea was finished. | `calls.json` |
| **A\* exclusion sets are rebuilt and passed per call.** | `Topology.excludePoints` / `excludePolygon` as first-class operations, and `Topology.getNode` at 80 876 calls (a hashed node lookup replacing `Map<Point,Node>` on object identity). | `calls.json` |
| **No polygon booleans.** `buffer` hand-resolves self-intersections and keeps the largest loop. | `geom.polygons.PolyBool` (`and`, `augmentPolygons`, 164 345 calls) plus a full `PolyCore / PolyBounds / PolyCut / PolyTransform / PolyCreate` split of `Polygon.hx`. `PolyCreate.stripe` (7538) suggests a striping/hatching primitive with no 2017 analogue — plausibly field furrows or roof shingling. | `calls.json` |
| **No straight skeleton.** Roofs and spines are absent; buildings are flat polygons. | `geom.SkeletonBuilder` (`intersect` 11 240, `step`) with `_SkeletonBuilder.Node`/`Segment` and `Rib`, plus `mapping.BuildingPainter.drawRoof` (68 809) and `BuildingPainter.paint` (6838). Roofs are per-building straight-skeleton geometry, not flat fills. | `calls.json` |
| **No names, no data model.** `Ward.getLabel()` returns a hard-coded English noun; no city name. | `com.watabou.tracery.*` (Grammar, RuleSet, Symbol, TraceryNode, DeckRuleSelector) and `com.watabou.nlp.{Markov, Syllables}`; `City.rerollName`, `City.getDetails`, `model.UnitSystem`, `model.Blueprint`. | `calls.json` |
| **No persisted options; size chosen by four hard-coded buttons.** | `com.watabou.system.State` (`init`, `get`), a `DropDownButton`/`CloseButton` UI, `mfcg.scenes.overlays.Overlay.map2layer` and `_CurvedLabel.Letter` (curved map labels), `mapping.Style.getStrokeWidth`. | `calls.json` |
| **`buildFarms` / `buildShantyTowns` do not exist**; farms are a 20 % coin flip per countryside patch and slums are just deck overflow. | `City.buildFarms` and `City.buildShantyTowns` are distinct methods; `wards.Wilderness` replaces the empty base `Ward`; `wards.Farm.splitField` (1279) actually **generates fields**, which 2017's `Farm` never does. | `calls.json` |

Two 2017 decisions the live trace shows **survived unchanged**: the stage names `buildPatches / optimizeJunctions /
buildWalls / buildStreets / createWards / buildGeometry` in that relative order, and the retry-on-exception loop around the
whole build. The skeleton is the same; every stage's internals were replaced.

---

## 15. What a re-implementer still has to decide (UNKNOWN in this slice)

1. **Whether to reproduce the relaxation off-by-four (§3.3).** Copying the code gives MFCG's look; copying the comment's
   intent gives a different, more uniform centre. No source says which watabou believed he was shipping.
2. **Whether to reproduce `Polygon.distance`'s first-vertex bug (§13.1).** Five ward scores and the patch cull depend on it.
3. **Whether to keep FIFO pseudo-A\* (§6.2).** True A* straightens the streets; the meander is part of the aesthetic.
4. **The `8×` seed multiplier's real purpose.** Nothing states whether 8 was tuned for countryside extent, for boundary
   quality, or arbitrarily. It dominates runtime (O(n²) triangulation of `8·nPatches` points).
5. **Why the spiral constant is 5 rad** rather than the golden angle. No comment; the resulting look is distinctive
   (large irregular centre, regular periphery) and may be accidental.
6. **What `segments:Array<Bool>` was for.** Never set false here; the live `addWatergate`/`splitSegment` strongly suggest
   water gaps, but the 2017 intent is unrecorded.
7. **How gate count should scale with city size.** It is an emergent consequence of `|entrances| / 3`, never a target.
   A re-implementation with a different wall shape will get a different gate count for free.
8. **Whether the retry loop should reseed.** 2017 continues the stream; live MFCG reseeds (§14). The two give different
   distributions of "what seed 12345 looks like", and the choice is a public-API-shaped decision for any shareable-link
   feature.
9. **Cost model for streets.** Edge cost is pure Euclidean length. Nothing in the source explores slope, existing-street
   reuse, or a bias toward straightness — yet MFCG's streets visibly prefer to reuse shared corridors, which here is an
   accident of BFS order plus `tidyUpRoads` deduplication.
10. **Units.** The world has no stated scale. `MAIN_STREET = 2.0` and a seed spacing of ~2.5 imply a patch is a few tens of
    "units" across; the live build has a `UnitSystem` class, so a real scale was added later.

---

### Source index for this file

- `reference/TownGeneratorOS/Source/com/watabou/towngenerator/building/{Model,Patch,Topology,CurtainWall,Cutter}.hx`
- `reference/TownGeneratorOS/Source/com/watabou/towngenerator/{Main,StateManager,TownScene}.hx`
- `reference/TownGeneratorOS/Source/com/watabou/towngenerator/wards/*.hx`
- `reference/TownGeneratorOS/Source/com/watabou/towngenerator/mapping/{CityMap,Brush,Palette,PatchView}.hx`
- `reference/TownGeneratorOS/Source/com/watabou/geom/{Voronoi,Polygon,Graph,Segment,GeomUtils,Spline}.hx`
- `reference/TownGeneratorOS/Source/com/watabou/utils/{Random,ArrayExtender,PointExtender,MathUtils,GraphicsExtender}.hx`
- `reference/TownGeneratorOS/Source/com/watabou/coogee/{Game,Scene}.hx`
- `reference/TownGeneratorOS/{README.md,project.xml}`; git `7fbc87a`
- `captures/mfcg/2026-09-21T05-03-24/report.md`, `captures/mfcg/2026-09-21T05-06-58/*/console.jsonl`,
  `captures/mfcg/*/coverage/gen-*.calls.json` (§14 only)

## Critic-2 addendum (OS seat, 2026-09-25)

Second critic pass (`research/findings/_critic-os.md`). The executed PRNG/spiral pin in §1.1/§3.1 was re-run in this
pass and reproduces exactly (all eight `next()`, eight `float()`, the three bools, `sa`, r₁–r₃, r₁₁₉, half-extent
346). Every constant in §8.6 and §10 matches the source. The following sentences are corrected; nothing above is
edited.

1. **§7.3 Cathedral row — "the largest patch wins (−1/A is most negative for big A)" is backwards.**
   `Cathedral.hx:19-21` returns `−1/patch.shape.square` for plaza-fronting patches and the loop takes the *minimum*:
   −1/10 = −0.10 < −1/100 = −0.01, so the **smallest** plaza-fronting patch wins (`os-wards-render.md` §7 already
   says so and warns against this misreading). Off-plaza the `distance × area` reading stands.
2. **§8.3 — "At `sizeChaos = 0.8` that is a 16× range" is wrong.** The leaf factor is `2^(4·s·(U−0.5))` ∈
   `[2^(−2s), 2^(+2s)]` (`Ward.hx:148`); at s = 0.8 that is 0.33× … 3.03×, a ratio of 2^3.2 ≈ **9.2×**. 16× is the
   value at s = 1.0. `os-wards-render.md` §4.2's table is correct.
3. **§6.4 — "streets run gate→plaza and roads run far→gate" contradicts §6.2 of this file, and §6.2 is right.**
   `Graph.buildPath` pushes from the goal back to the start (`Graph.hx:59-66`); `buildPath(gate, end)` at
   `Model.hx:227` therefore yields `[plaza … gate]` and `buildPath(start, gate)` at `:243` yields `[gate … outer]`.
   Consequence: all streets are oriented plaza → gate, so the central corridors shared by several streets are
   traversed in the *same* direction and **are** de-duplicated by `tidyUpRoads`; the "opposite direction, not
   de-duplicated" case is confined to a street and a road, which share only the gate vertex.
4. **§8.7 — the gate is drawn *along* the wall, not "across" it.** `CityMap.hx:110-113`:
   `dir = wall.next(gate) − wall.prev(gate)`, normalised to 2.7, bar from `gate − dir` to `gate + dir` — a 5.4-long,
   3.6-thick thickening of the wall line (`os-wards-render.md` §9.6).
5. **§9 draw ledger, createWards block — "Castle → 0 draws" is misplaced, not true.** `Castle.new` builds a
   `CurtainWall` (`Castle.hx:17`) whose `buildGates` draws one `int()` per castle gate (`CurtainWall.hx:61`), as the
   buildWalls block of the same ledger says. Two additions the ledger should carry: (a) those castle-gate draws
   happen **before** the compactness test at `Model.hx:165-166`, so a rejected citadel has already consumed them;
   (b) `Graph.aStar` iterates `current.links.keys()` (`Graph.hx:41`) — with a FIFO open set the runtime's
   `ObjectMap` key order decides BFS tie-breaks, hence the exact street; no findings file states this.
6. **§11 throw site 2 — "possible when 1 ≤ entrances.length < 3 on entry" is wrong; the site is unreachable.**
   `CurtainWall.hx:60-101` is a `do { … gates.push(gate) … } while (entrances.length >= 3)`, so one gate is pushed
   before `:103` can be reached. Only sites 1, 3 and 4 can fire.
7. **§6.2 / §13.5 / §15.3, the FIFO-meander argument, against `profile-mfcg.md`.** `profile-mfcg.md` §4.5 describes
   the 2017 A* as "`Map` for `openSet` … and a linear `min` over `keys()`"; that is not this source (`Graph.hx:27`
   `openSet:Array<Node>`, `:33` `shift()`, no `min`). The hot `ObjectMap.keys` in the live profile is what the 2017
   neighbour loop `current.links.keys()` would also produce, so the recordings neither confirm nor refute that the
   live open set is still FIFO. The claim that replacing FIFO with real A* "will straighten the streets" therefore
   cannot be checked against the live build from call counts; keep it `[INFERRED]`/OPEN.
8. §5 wording: the radius cull runs before the castle, but castle gate-splitting adds *new halves of an adjacent
   patch* (`CurtainWall.hx:84-85`); it does not restore culled patches.
