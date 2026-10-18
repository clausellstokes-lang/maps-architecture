# Slice `os-wards-render` — TownGeneratorOS ward geometry + rendering

**Scope.** Every file under `reference/TownGeneratorOS/Source/com/watabou/towngenerator/wards/`,
`.../mapping/`, `.../ui/`, plus `building/Cutter.hx`, every `geom/Polygon.hx` method those files call,
and the supporting files needed to read them correctly (`building/Model.hx`, `Patch.hx`,
`CurtainWall.hx`, `Topology.hx`, `geom/GeomUtils.hx`, `utils/{Random,ArrayExtender,PointExtender,
GraphicsExtender,MathUtils}.hx`, `TownScene.hx`, `Main.hx`, `StateManager.hx`,
`coogee/{Scene,Game,BitmapText}.hx`, `project.xml`, `README.md`).

**Repo version.** `reference/TownGeneratorOS` @ `7fbc87a` — "Updated for compatibility with the latest
versions of openfl and lime", Sun 7 Apr 2019. Single commit in a shallow clone. Haxe / OpenFL 8.9.0 /
lime 7.3.0 / msignal 1.2.5 (`project.xml:9-11`). GPL-3.

**Evidence tagging.** This slice is source code, so almost everything is `[STATED]` in the strong sense
(the algorithm is literally the text). I reserve `[STATED]` for what the code or a code comment says
outright, `[SHOWN]` for behaviour I derived by hand-executing the code on a worked example,
`[INFERRED]` for reconstruction/interpretation (reasoning given), `[NAMED-ONLY]` for things referenced
but absent from this snapshot.

**Authoritative caveat from the author** `[STATED]` (`README.md:2-3`): "It lacks some of the latest
features, namely waterbodies, options UI and some smaller ones." So this is MFCG circa v0.3x–0.4x,
*not* the live generator. Everything below is the 2019 ancestor's behaviour.

---

## 0. Coordinate system, units, and the one data-structure decision that everything depends on

### 0.1 Shared `Point` identity is the mesh topology `[INFERRED, very high confidence]`

`Polygon` is `abstract Polygon(Array<Point>)` (`geom/Polygon.hx:10-11`) and *every* adjacency query is
reference identity on `openfl.geom.Point` objects:

- `Polygon.contains(v)` → `indexOf(v) != -1` (`Polygon.hx:79-81`) — identity, not coordinate compare.
- `Polygon.findEdge(a,b)` → index of `a` if `this[(i+1)%len] == b` (`Polygon.hx:404-407`).
- `Model.patchByVertex(v)` → all patches whose shape array contains that *instance* (`Model.hx:205-209`).
- `Topology` keys a `Map<Point,Node>` by Point instance (`Topology.hx:14-15,69-80`).

Consequence for a re-implementer: adjacent Voronoi patches **must share the identical vertex object**.
`Model.optimizeJunctions()` (`Model.hx:308-344`) exploits this: when two vertices of a patch are closer
than **8.0** units it rewrites every other patch's reference to point at `v0`, then mutates `v0` in
place to the midpoint (`v0.addEq(v1); v0.scaleEq(0.5)`), then removes `v1`. Mutating one shared Point
moves that corner in every patch at once. Same trick in `CurtainWall.buildGates` final loop
(`CurtainWall.hx:107-109`): `gate.set(shape.smoothVertex(gate))` moves the gate for the wall *and* for
both adjacent patches simultaneously. A re-implementation on value-type vertices needs an explicit
shared-vertex / half-edge structure or it will silently desynchronise walls, streets and blocks.

### 0.2 Winding `[SHOWN]`

All polygon code assumes **CCW winding in math orientation (y up)**, i.e. positive shoelace area:

- `Polygon.square` is the raw shoelace half-sum (`Polygon.hx:23-34`), and `createAlleys` /
  `createOrthoBuilding` compare it against positive thresholds — so it must be positive.
- `isConvexVertex` requires `cross(v1-v0, v2-v1) > 0` (`Polygon.hx:120-124`).
- `shrink`/`peel`/`ring` offset an edge by `v.rotate90().norm(d)` with
  `rotate90((x,y)) = (-y, x)` (`PointExtender.hx:41-42`) — that is the **left** normal, i.e. interior
  side of a CCW ring.

On screen (Flash/OpenFL y-down) this renders clockwise; the maths is unaffected.

### 0.3 Units `[INFERRED]`

One world unit ≈ a metre-ish "street half-width" unit. Nothing is normalised: patch radii come from
`Model.buildPatches` seeding points at `r = 10 + i*(2 + rand)` (`Model.hx:99-105`), a farmhouse
footprint is a 4×4 square (`Farm.hx:12`), an alley is 0.6 wide, a main street 2.0. A city of
`nPatches = 15` has `cityRadius` on the order of 150–250 units. `TownScene.layout()` scales so the map
fits the window (§9.7), so world units are arbitrary but *internally consistent* — reuse the same
numbers verbatim or all of the ward constants below change meaning.

---

## 1. The `Polygon` toolbox as the wards use it

Exact semantics matter here because every ward is a thin wrapper over these. All citations
`geom/Polygon.hx`.

| Method | Lines | What it actually does |
|---|---|---|
| `square` | 23-34 | Shoelace ×0.5, signed |
| `perimeter` | 36-43 | Sum of edge lengths |
| `compactness` | 45-52 | `4πA / P²`. Author's own comment: **circle 1.00, square 0.79, triangle 0.60** `[STATED]` |
| `center` | 54-62 | Mean of vertices ("faster approximation of centroid") |
| `centroid` | 64-77 | True area centroid |
| `contains` | 79-81 | Identity membership |
| `forEdge(f)` | 83-87 | Iterates `(this[i], this[(i+1)%len])` — **edge i is indexed by its first vertex** |
| `forSegment` | 90-92 | Same but skips the closing edge |
| `isConvex` | 126-130 | All vertices convex |
| `smoothVertex(v,f)` | 144-151 | `(prev + f·v + next)/(2+f)` — corner-cutting |
| `smoothVertexEq(f)` | 166-177 | Whole-polygon version; `Model.buildStreets` uses `f = 3` on streets |
| `distance(p)` | 155-164 | **BUG — see §1.1** |
| `inset(p1,d)` | 198-228 | Moves 2 vertices, keeps vertex count. Clamps: convex corner `t ≤ 0.99·|v0|`, reflex `t ≤ 0.5·|v1|` |
| `buffer(d[])` | 246-339 | Per-edge offset + self-intersection resolution + largest-loop pick (§1.3) |
| `shrink(d[])` | 350-362 | Sequential half-plane clipping (§1.2) |
| `shrinkEq(d)` | 364-365 | `shrink` with one distance for all edges (used by `Castle`) |
| `peel(v1,d)` | 369-378 | Inset exactly one edge by cutting; returns the **retained** side |
| `cut(p1,p2,gap)` | 464-515 | Line split with optional gap (§1.4) |
| `split(p1,p2)` / `spliti` | 450-462 | Split at two **existing vertices** (used by `CurtainWall` road-carving) |
| `interpolate(p)` | 517-525 | Inverse-distance weights over vertices, normalised to sum 1 (used by `filterOutskirts`) |
| `rect(w,h)` | 527-532 | Axis-aligned rect centred on origin |
| `regular(n,r)` | 534-538 | Regular n-gon, first vertex at angle 0 |
| `circle(r)` | 540-541 | `regular(16, r)` — **circles are 16-gons**, incl. the market fountain |
| `borders(another)` | 423-437 | Shares an edge (either orientation). Contains an author comment admitting the early-exit logic is wrong but "it doesn't work for some reason" otherwise `[STATED]` |

Unused-by-this-slice but present: `filterShort` (179-192), `simplyfy` (381-402), `insetAll` (230-235),
`insetEq` (238-240), `bufferEq` (343-344), `offset`, `rotate`, `getBounds`. `offset`/`rotate` are used
by `Farm` and `Market`. `simplyfy`/`filterShort` are dead in this snapshot — plausibly the ancestors of
the live generator's polygon-simplification pass `[INFERRED]`.

### 1.1 `Polygon.distance()` is broken, and it changes ward placement `[SHOWN]`

```haxe
public function distance( p:Point ):Float {
    var v0 = this[0];
    var d = Point.distance( v0, p );
    for (i in 1...this.length) {
        var v1 = this[i];
        var d1 = Point.distance( v1, p );
        if (d1 < d) v0 = v1;        // <-- updates v0, never updates d
    }
    return d;                        // <-- always distance from this[0]
}
```
(`Polygon.hx:155-164`.) The loop tracks the nearest vertex but returns the **distance to vertex 0**.
The doc comment above it says it "returns minimal distance from any of the vertices" `[STATED]` — so
this is unambiguously a bug, not a design choice.

Every consumer is inside my slice:

- `AdministrationWard.rateLocation` (`AdministrationWard.hx:20-21`)
- `Cathedral.rateLocation` (`Cathedral.hx:22`)
- `MerchantWard.rateLocation` (`MerchantWard.hx:18`)
- `Slum.rateLocation` (`Slum.hx:18`)
- `Market.rateLocation` fallback when there is no plaza (`Market.hx:61`)
- `Model.buildWalls` countryside cull: `p.shape.distance(center) < radius*3` (`Model.hx:156`)

So "distance from this ward to the plaza" is in fact "distance from this ward's **first Voronoi
vertex** to the plaza centre". Vertex 0 comes from `Patch.fromRegion` → `r.vertices[0].c`, i.e. the
Voronoi region's triangle ordering — effectively an arbitrary corner. The effect is a **noisy** ward
placement: merchants are near-ish the centre, slums far-ish, but with a per-patch error of up to the
patch diameter. A faithful port must decide whether to reproduce the bug (MFCG's actual look) or fix it
(tighter, more obviously "designed" zoning). **This is the single highest-leverage discrepancy in the
slice.**

### 1.2 `shrink(d[])` — convex inset by sequential half-plane clipping `[SHOWN]`

```haxe
forEdge( function( v1, v2 ) {
    var dd = d[i++];
    if (dd > 0) {
        var n = (v2 - v1).rotate90().norm( dd );
        q = q.cut( v1 + n, v2 + n, 0 )[0];
    }
} );
```
(`Polygon.hx:350-362`.) Each edge's supporting line is pushed inward by `d[i]` and the polygon is
clipped to that half-plane, keeping `cut(...)[0]`. Properties:

- Output is always **convex** (intersection of half-planes) — the author's comment says so and warns it
  is bad for concave input `[STATED]` (`Polygon.hx:346-349`).
- Vertex count changes.
- Per-edge distances are honoured exactly (unlike `buffer`), which is why it is the preferred path in
  `getCityBlock`.
- `d[i] == 0` edges are skipped entirely (no clip) — so a zero-inset edge stays exactly on the patch
  boundary.
- Degenerate risk: if the insets exceed the polygon's inradius the successive cuts return `count != 2`
  and `cut` hands back the polygon unchanged (§1.4), so `shrink` **silently under-insets** rather than
  producing an empty polygon. No exception, no empty result.

### 1.3 `buffer(d[])` — concave-capable offset `[SHOWN]`

(`Polygon.hx:246-339`.) Three phases:

1. **Offset each edge independently** into a 2n-vertex scratch polygon `q`: push `v0+n, v1+n` where
   `n = (v1-v0).rotate90().norm(d[i])`. If `d[i] == 0`, push `v0, v1` unchanged. The offset segments are
   disjoint — the implicit connecting segment between consecutive pairs is the "joint". Author's own
   comment: "here we may want to do something fancier for nicer joints" `[STATED]` (`Polygon.hx:256`).
2. **Resolve self-intersections**: O(n²) all-pairs edge intersection with `DELTA = 0.000001`
   (`Polygon.hx:13`) guard bands on both parameters; each intersection point is inserted **twice**
   (at `j+1` then at `i+1`), splitting the loop into sub-loops. Restarts the scan from `lastEdge` and
   loops until no cut is found.
3. **Keep the largest sub-loop**: walk the index ring, using `indexOf`/`lastIndexOf` on the duplicated
   intersection points to hop between loops, and keep the loop with maximum `square`.

Visual signature: convex corners get their offset segments intersected properly, but **reflex corners
are bridged by the straight joint chord**, so buffered blocks show small chamfers/notches at concave
corners. The author documents the failure mode for mixed distances: "weird 'steps' are created"
`[STATED]` (`Polygon.hx:244-245`).

### 1.4 `cut(p1, p2, gap)` — the primitive under every ward `[SHOWN]`

(`Polygon.hx:464-515`.)

1. Intersect the **infinite line** `p1→p2` with each polygon edge via
   `GeomUtils.intersectLines` (`GeomUtils.hx:6-17`), which returns `(t1, t2)` = (parameter on the cut
   line, parameter on the polygon edge). Accept when `t.y ∈ [0,1]` — the cut line is unbounded, the
   edge is not.
2. If exactly **2** hits: build `point1`, `point2` on the cut line, then
   - `half1 = [point1] + verts(edge1+1 .. edge2) + [point2]`
   - `half2 = [point2] + verts(edge2+1 .. edge1) + [point1]`
3. If `gap > 0`: `half1 = half1.peel(point2, gap/2)`, `half2 = half2.peel(point1, gap/2)`. In each half
   the edge that starts at that point **is** the cut edge, so both sides retreat by `gap/2` → a corridor
   of total width `gap`. This is how alleys are created.
4. **Return order** `[SHOWN by hand-execution]`: `cross(cutDir, vectori(edge1)) > 0 ? [half1, half2] :
   [half2, half1]`. I hand-ran two cases (unit square `A(0,0) B(1,0) C(1,1) D(0,1)`, cut `x=0.5` upward;
   and the `shrink` offset of edge `A→B` by 0.2) and the invariant is:

   > **`cut()` returns `[half on the LEFT of p1→p2, half on the RIGHT]`** (math orientation, y up).

   Because `shrink`/`peel` build the cut line in the same direction as the edge and offset by the left
   normal, `[0]` is always the interior/retained side. A re-implementer must reproduce this ordering
   convention or `shrink`, `peel` and `Cutter.ring` will keep the wrong pieces.
5. **Failure mode**: `count != 2` (0, 1, or ≥3 hits — the ≥3 case happens on concave polygons, and the
   `switch` only records cases 0 and 1 then falls through) ⇒ `return [new Polygon(this)]`, i.e. a silent
   no-op that hands back *one* polygon identical to the input. See §5.4 and §6.4 for how this turns into
   non-termination.

---

## 2. `Cutter` — four block-subdivision primitives (`building/Cutter.hx`)

### 2.1 `bisect(poly, vertex, ratio=0.5, angle=0.0, gap=0.0)` `[STATED]` (`Cutter.hx:13-27`)

```
next = poly.next(vertex)
p1   = lerp(vertex, next, ratio)
d    = next - vertex
(vx,vy) = rotate(d, angle)                 // cos/sin rotation of the edge direction
p2   = (p1.x - vy, p1.y + vx)              // p1 + rotate90(rotated d)
return poly.cut(p1, p2, gap)
```
So: pick a point at fraction `ratio` along the edge starting at `vertex`, and cut **perpendicular to
that edge**, tilted by `angle`. `angle = 0` ⇒ exactly perpendicular ⇒ rectangles stay rectangles.
This is the only cut used by `createAlleys`.

### 2.2 `radial(poly, center=null, gap=0)` `[STATED]` (`Cutter.hx:29-43`)

`center` defaults to `poly.centroid`. For each edge emit the triangle `[center, v0, v1]`; if `gap > 0`,
`sector.shrink([gap/2, 0, gap/2])` — i.e. inset the two radial sides by `gap/2` each and leave the outer
boundary edge untouched. Produces a pinwheel of wedges separated by `gap`-wide alleys, with the outer
ring flush to the block boundary. Used by `Park` for compact blocks.

### 2.3 `semiRadial(poly, center=null, gap=0)` `[STATED]` (`Cutter.hx:45-65`)

`center` defaults to the **existing polygon vertex nearest the centroid**
(`poly.min(v => distance(v, centroid))`). `gap /= 2` first, then for each edge *not* touching the centre
vertex emit `[center, v0, v1]`, insetting side `center→v0` by `gap` only if that pair is **not** already
a polygon edge (`poly.findEdge(center,v0) == -1`), and likewise for `v1→center`. Net: wedge sides that
coincide with the block boundary are not inset; only genuinely internal cuts get the alley. Produces a
fan anchored at a corner. Used by `Park` for elongated/irregular blocks.

### 2.4 `ring(poly, thickness)` `[STATED]` (`Cutter.hx:67-90`)

For each edge, build the inward-offset line `(v1+n, v2+n)` with `n = (v2-v1).rotate90().norm(thickness)`
and record the edge length. **Sort slices by edge length ascending** — author's comment: "Short sides
should be sliced first" `[STATED]` (`Cutter.hx:76-77`). Then peel iteratively: `halves = p.cut(p1,p2)`;
`p = halves[0]` (the shrinking core), and if the cut actually split (`halves.length == 2`) push
`halves[1]` — the strip — into the result. **Returns only the strips; the core is discarded.** So
`ring` yields a hollow band of `thickness`-wide wings around an empty courtyard. Used by `Cathedral`.

---

## 3. `Ward` base class (`wards/Ward.hx`)

### 3.1 Street-width constants `[STATED]` (`Ward.hx:18-20`)

```
MAIN_STREET     = 2.0
REGULAR_STREET  = 1.0
ALLEY           = 0.6
```
These three numbers set the whole visual rhythm of an MFCG map. Every gap between two buildings, blocks
or wedges is one of them.

### 3.2 `createGeometry()` base = `geometry = []` `[STATED]` (`Ward.hx:32-34`)

A plain `Ward` (the countryside default assigned in `Model.createWards`, `Model.hx:411`) draws nothing,
and `CityMap`'s switch falls to `default:` and never even adds the view (`CityMap.hx:59-61`). Empty
countryside patches still exist as hover targets though — see §9.6.

### 3.3 `getCityBlock()` — per-edge inset by street class `[STATED]` (`Ward.hx:36-59`)

```haxe
var innerPatch = model.wall == null || patch.withinWalls;
patch.shape.forEdge( function( v0, v1 ) {
    if (model.wall != null && model.wall.bordersBy( patch, v0, v1 ))
        insetDist.push( MAIN_STREET/2 );                       // 1.0 — "Not too close to the wall"
    else {
        var onStreet = innerPatch && (model.plaza != null && model.plaza.shape.findEdge( v1, v0 ) != -1);
        if (!onStreet)
            for (street in model.arteries)
                if (street.contains( v0 ) && street.contains( v1 )) { onStreet = true; break; }
        insetDist.push( (onStreet ? MAIN_STREET : (innerPatch ? REGULAR_STREET : ALLEY)) / 2 );
    }
} );
return patch.shape.isConvex() ? patch.shape.shrink( insetDist ) : patch.shape.buffer( insetDist );
```

**The inset table** (note every value is *half* the street width, because the neighbouring patch insets
by the same half — the two halves add up to the full street):

| Edge condition | Inset | Resulting gap between the two blocks |
|---|---|---|
| On the city wall (`wall.bordersBy`) | 1.0 | 2.0 clear strip inside the wall (pomerium) |
| Fronting the plaza (inner patches only) | 1.0 | 2.0 |
| On an artery (street or road) | 1.0 | 2.0 |
| Ordinary edge, patch inside the walls (or wall-less town) | 0.5 | 1.0 |
| Ordinary edge, patch **outside** the walls | 0.3 | 0.6 |

Three consequences worth stating explicitly:

1. `innerPatch = model.wall == null || patch.withinWalls` is a *model-level* test: in a **wall-less**
   town **every** patch counts as inner, so outskirts get 1.0-wide streets too. Only walled cities get
   the tight 0.6 suburban texture.
2. The plaza test uses the **reversed** edge `findEdge(v1, v0)` because the neighbour traverses the
   shared edge in the opposite direction `[INFERRED — standard for a consistently wound mesh]`.
3. The artery test `street.contains(v0) && street.contains(v1)` only checks that both vertices appear
   *somewhere* in the polyline, not that they are consecutive. A winding artery that touches both
   endpoints non-consecutively yields a false positive and a spuriously wide street `[INFERRED]`.
   Cheap and almost always right, because arteries are short paths through the same vertex set.

`isConvex ? shrink : buffer` is a deliberate quality/robustness trade: exact per-edge insets on convex
patches, chamfered approximate insets on concave ones.

### 3.4 `filterOutskirts()` — density falloff at the city edge `[STATED]` (`Ward.hx:61-119`)

Called only by `CommonWard.createGeometry` when `!model.isEnclosed(patch)`
(`CommonWard.hx:26-27`), where `isEnclosed(p) = p.withinCity && (p.withinWalls || all neighbours
withinCity)` (`Model.hx:432-434`). Problem it solves: a ward on the city's ragged outer boundary should
*fade out* — buildings crowd the road and the city-facing edges and thin out toward open country —
instead of filling the block uniformly like an enclosed ward.

Algorithm (buildings already exist; this is a **filter**, it deletes whole buildings, it never resizes):

1. **Collect "populated edges"** — the edges of the patch that attract buildings. For each patch edge
   `(v1,v2)`:
   - if some artery contains both endpoints → `addEdge(v1, v2, factor = 1.0)`;
   - else look up the neighbour across that edge (`Model.getNeighbour`, `Model.hx:419-425`); if it
     exists and is `withinCity` → `addEdge(v1, v2, factor = model.isEnclosed(n) ? 1.0 : 0.4)`.
   - Otherwise the edge attracts nothing (open country / water side).
2. `addEdge(v1, v2, factor)` stores `{x, y, dx, dy, d}` where `d` = **the maximum factor-scaled
   perpendicular distance from that edge's line to any patch vertex** (endpoints excluded, they score 0).
   So `d` is the "depth" of the patch measured from that edge — the normalisation denominator. With
   `factor = 0.4` the depth is shrunk 2.5×, which makes every measured distance read as 2.5× farther ⇒
   weak attraction from a neighbour that is itself an outskirt ward.
3. **Per-vertex density** (`Ward.hx:94-97`), with the author's comment "For every vertex: if this belongs
   only to patches within city, then 1, otherwise 0" `[STATED]` — but the code actually says:
   - vertex is a gate (`model.gates.contains(v)`) → **1**
   - else all patches sharing the vertex are `withinCity` → **`2 * Random.float()`** (uniform 0..2)
   - else → **0**

   The comment and the code disagree: the "1" case is gates only, and interior vertices get a random
   0..2 weight, not 1. `[STATED discrepancy]` The random weight is what makes each outskirt ward's
   thinning pattern unique rather than radially symmetric.
4. **Per-building keep test** (`Ward.hx:99-118`):
   ```
   minDist = 1.0
   for each populated edge e, for each vertex v of the building:
       minDist = min(minDist, distance2line(e, v) / e.d)      // normalised 0..1 depth
   c = building.center
   i = patch.shape.interpolate(c)                             // inverse-distance weights over vertices
   p = Σ density[j] * i[j]
   minDist /= p
   keep if Random.fuzzy(1) > minDist
   ```
   `Random.fuzzy(1) == Random.normal()` = mean of 3 uniforms (`Random.hx:23-24,32-37`), i.e.
   Irwin–Hall(3)/3 on [0,1], mean 0.5. Its CDF on `[0, 1/3]` is `4.5x³`, symmetric about 0.5. So:

   | normalised `minDist` | P(keep) |
   |---|---|
   | 0.2 | 0.964 |
   | 0.33 | 0.83 |
   | 0.5 | 0.500 |
   | 0.67 | 0.17 |
   | 0.8 | 0.036 |

   Note `minDist` is taken over **every vertex of the building**, so it is the *closest corner*'s
   distance — buildings are given the benefit of the doubt.
5. Edge cases: with **no** populated edges, `minDist = 1/p`, so a patch surrounded by nothing still
   keeps buildings wherever the random vertex densities happen to be high (`p` up to 2 ⇒ `minDist`
   0.5 ⇒ half survive). `distance2line` is **signed** (`GeomUtils.hx:30-31`), so a building vertex that
   ends up on the outer side of an edge yields a negative `dist` and an unconditional keep `[INFERRED]`.

### 3.5 `getLabel()` / `rateLocation()` hooks `[STATED]` (`Ward.hx:121-123`)

`getLabel()` returns `null` on the base class (countryside ⇒ no tooltip, §9.6).
`static rateLocation(model, patch) : Float` returns 0 — but see §8.2: **Haxe does not inherit statics**,
so this base implementation is never reached through `Reflect`.

---

## 4. `createAlleys` — the recursive block subdivider (`Ward.hx:125-157`)

This is the heart of MFCG's look: the organic, slightly-skewed patchwork of houses.

```haxe
public static function createAlleys( p:Polygon, minSq:Float, gridChaos:Float, sizeChaos:Float,
                                     emptyProb:Float = 0.04, split = true ):Array<Polygon> {
    // 1. longest edge
    var v = null; var length = -1.0;
    p.forEdge( function( p0, p1 ) { var len = Point.distance(p0,p1); if (len > length) { length = len; v = p0; } } );

    // 2. split ratio
    var spread = 0.8 * gridChaos;
    var ratio  = (1 - spread)/2 + Random.float() * spread;

    // 3. angle jitter, suppressed for small pieces
    var angleSpread = Math.PI/6 * gridChaos * (p.square < minSq * 4 ? 0.0 : 1);
    var b = (Random.float() - 0.5) * angleSpread;

    // 4. cut
    var halves = Cutter.bisect( p, v, ratio, b, split ? ALLEY : 0.0 );

    // 5. recurse or emit
    var buildings = [];
    for (half in halves) {
        if (half.square < minSq * Math.pow( 2, 4 * sizeChaos * (Random.float() - 0.5) )) {
            if (!Random.bool( emptyProb )) buildings.push( half );
        } else {
            buildings = buildings.concat( createAlleys( half, minSq, gridChaos, sizeChaos, emptyProb,
                            half.square > minSq / (Random.float() * Random.float()) ) );
        }
    }
    return buildings;
}
```

### 4.1 The exact bisect rule `[STATED]`

- **Which edge**: the *longest* edge, strict `>` so ties keep the first found in `forEdge` order. Cutting
  perpendicular to the longest edge is what keeps pieces from degenerating into slivers — it is an
  OBB-free approximation of "split the long way".
- **Where**: `ratio ∈ [(1-0.8g)/2, (1+0.8g)/2]`, centred on 0.5 with total width `0.8·gridChaos`.
  `gridChaos = 0` ⇒ exact halving; `gridChaos = 1` ⇒ uniform in [0.1, 0.9].
- **Angle**: `b ∈ ±(π/12)·gridChaos`, i.e. **±15° × gridChaos** off perpendicular, **but zero once the
  piece is smaller than `4 × minSq`**. The author's comment names the intent: "Trying to keep buildings
  rectangular even in chaotic wards" `[STATED]` (`Ward.hx:140`). This is the trick that gives slums
  crooked *blocks* made of still-rectangular *houses*.
- **Gap**: `ALLEY = 0.6` when `split` is true, else `0.0` (buildings share a party wall).

### 4.2 Termination / leaf test `[STATED]`

A half becomes a building when `half.square < minSq · 2^(4·sizeChaos·(u−0.5))`, i.e. the threshold is
`minSq` multiplied by a log-uniform factor in `[2^(−2·sizeChaos), 2^(+2·sizeChaos)]`:

| `sizeChaos` | threshold factor range | used by |
|---|---|---|
| 0.3 | 0.66× … 1.52× | Administration, Military |
| 0.6 | 0.44× … 2.30× | Craftsmen |
| 0.7 | 0.38× … 2.64× | Merchant, Gate |
| 0.8 | 0.33× … 3.03× | Patriciate, Slum |

So `sizeChaos` is literally the log-variance of building footprint area. Each half rolls its own
threshold ⇒ siblings can differ wildly.

### 4.3 The `split` flag — why some houses touch and others don't `[STATED, mechanism INFERRED]`

The recursive call passes `split = half.square > minSq / (u1 · u2)` with two fresh uniforms. Since
`u1·u2` has density `−ln z` on (0,1), for `s = half.square / minSq`:

> **P(alley) = P(u₁u₂ > 1/s) = 1 − 1/s + (1/s)·ln(1/s)**

| `s = half.square/minSq` | P(the next cut leaves a 0.6 alley) |
|---|---|
| 2 | 0.15 |
| 4 | 0.40 |
| 10 | 0.67 |
| 30 | 0.85 |
| 100 | 0.94 |

Interpretation `[INFERRED]`: alleys are carved only while the piece is still *block*-sized; once it is
within a few multiples of a house, the cuts are gapless and the resulting houses are **terraced —
sharing walls**. That is exactly the medieval-row-housing look, and it is produced by one line.
Note the top-level call always uses the default `split = true`.

### 4.4 `emptyProb` — courtyards and squares `[STATED]`

A leaf is discarded with probability `emptyProb`, leaving a hole in the block: 0.03 (Slum) … 0.25
(Military, "squares" per the author's comment at `MilitaryWard.hx:15`). Defaults to 0.04
(`Ward.hx:125`, `CommonWard.hx:13`).

### 4.5 Failure modes `[INFERRED]`

- **Non-terminating recursion** if `Polygon.cut` returns a single unchanged polygon (`count != 2`,
  §1.4) whose square still exceeds the leaf threshold. Because `ratio` and `b` are re-rolled every call,
  the recursion usually escapes on the next try, but a badly self-intersecting input (possible out of
  `buffer`) can loop until stack exhaustion. There is **no** guard, no depth cap, no area floor.
  `Model`'s global retry only catches `openfl.errors.Error` (`Model.hx:78-84`), not a stack overflow.
- **Degenerate slivers**: nothing enforces a minimum aspect ratio, so a long thin block yields long thin
  houses. `minSq` is area-only.
- **Empty result**: if every leaf is dropped by `emptyProb` the ward renders as an empty block. There is
  no retry (unlike `createOrthoBuilding`).

---

## 5. `createOrthoBuilding` — the L/rectangle building slicer (`Ward.hx:159-197`)

Used for single *structures* (castle keep, cathedral, farmstead) rather than blocks of houses.

```haxe
private static function findLongestEdge( poly ):Point
    return poly.min( function( v ) return -poly.vector( v ).length );   // vertex starting the longest edge

public static function createOrthoBuilding( poly, minBlockSq:Float, fill:Float ):Array<Polygon> {
    function slice( poly, c1, c2 ):Array<Polygon> {
        var v0 = findLongestEdge( poly ); var v1 = poly.next( v0 ); var v = v1 - v0;
        var ratio = 0.4 + Random.float() * 0.2;
        var p1 = GeomUtils.interpolate( v0, v1, ratio );
        var c = (|scalar(v, c1)| < |scalar(v, c2)|) ? c1 : c2;          // the axis most perpendicular to v
        var halves = poly.cut( p1, p1 + c );                            // NO gap
        var buildings = [];
        for (half in halves)
            if (half.square < minBlockSq * Math.pow( 2, Random.normal() * 2 - 1 )) {
                if (Random.bool( fill )) buildings.push( half );
            } else
                buildings = buildings.concat( slice( half, c1, c2 ) );
        return buildings;
    }

    if (poly.square < minBlockSq) return [poly];
    var c1 = poly.vector( findLongestEdge( poly ) );
    var c2 = c1.rotate90();
    while (true) { var blocks = slice( poly, c1, c2 ); if (blocks.length > 0) return blocks; }
}
```

### 5.1 Why it produces L/T/U footprints `[INFERRED, mechanism is explicit in the code]`

- The two cut directions are **frozen once** at the top (`c1` = the original longest-edge direction,
  `c2` = its 90° rotation), so every cut anywhere in the recursion is parallel to one of two orthogonal
  axes ⇒ all leaves are axis-aligned rectangles in the building's own frame. Hence "ortho".
- Per call it picks whichever axis is *most perpendicular* to the current longest edge
  (`min |dot(v, c)|`) ⇒ it always cuts across, never along.
- `ratio ∈ [0.4, 0.6]` — much tighter than `createAlleys`; these are near-halvings.
- **`cut` is called with no gap**, so sibling rectangles stay edge-to-edge.
- Leaves are kept with probability `fill`. Dropping a rectangle out of a 2×2-ish grid of touching
  rectangles is exactly how you get an L, a T, a U or a plus.

### 5.2 Leaf threshold `[STATED]`

`minBlockSq · 2^(Random.normal()·2 − 1)`, exponent ∈ [−1, +1] with a bell shape (mean of 3 uniforms ⇒
mean exponent 0) ⇒ factor ∈ [0.5, 2.0], median 1.0. Compare `createAlleys`, which uses a *uniform*
exponent — orthobuildings are size-tighter.

### 5.3 Early out `[STATED]`

`poly.square < minBlockSq` ⇒ return the polygon itself as one building, un-sliced and never dropped.
(So `Farm`'s 4×4 = 16 unit² house with `minBlockSq = 8` always gets at least one slice pass.)

### 5.4 Failure modes `[INFERRED]`

- **`while(true)` retry** when `fill` drops everything (probability `(1−fill)^k` per attempt). Guarantees
  a non-empty result but can spin; with `fill = 0.5` (Farm) and 2 leaves that is a 25% retry rate.
- **Infinite recursion** if `poly.cut` degenerates (§1.4) and the returned single polygon is still above
  threshold — `slice` recurses on an identical polygon. Since `ratio` and `findLongestEdge` are
  deterministic given the polygon except for `ratio ∈ [0.4,0.6]`, escape depends on the re-rolled ratio.
  A re-implementer should add a depth cap.
- `findLongestEdge` uses `poly.min(v => -poly.vector(v).length)`, and `vector`→`next`→`indexOf` is O(n),
  so this is O(n²) per call. Irrelevant at n≈10, relevant if ported to high-vertex polygons.

---

## 6. Ward subclass catalogue

### 6.1 `CommonWard` — the parametric base (`wards/CommonWard.hx`)

```haxe
new( model, patch, minSq, gridChaos, sizeChaos, emptyProb = 0.04 )
override createGeometry() {
    var block = getCityBlock();
    geometry = Ward.createAlleys( block, minSq, gridChaos, sizeChaos, emptyProb );
    if (!model.isEnclosed( patch )) filterOutskirts();
}
```
Six subclasses differ **only** in four numbers. That is the whole "ward character" system.

### 6.2 Master parameter table `[STATED]` (`u` = an independent `Random.float()` ∈ [0,1))

| Ward | file:line | `minSq` | `gridChaos` | `sizeChaos` | `emptyProb` | author's comment |
|---|---|---|---|---|---|---|
| **Craftsmen** | `CraftsmenWard.hx:11-13` | `10 + 80·u·u` → [10,90], median 30, mean 36.7 | `0.5 + 0.2u` → [0.5,0.7] | 0.6 | 0.04 (default) | "small to large" / "moderately regular" |
| **Merchant** | `MerchantWard.hx:11-14` | `50 + 60·u·u` → [50,110] | `0.5 + 0.3u` → [0.5,0.8] | 0.7 | **0.15** | "medium to large" / "moderately regular" |
| **Gate** | `GateWard.hx:10-13` | `10 + 50·u·u` → [10,60] | `0.5 + 0.3u` | 0.7 | 0.04 (default) | — |
| **Slum** | `Slum.hx:10-14` | `10 + 30·u·u` → [10,40] | `0.6 + 0.4u` → [0.6,1.0] | 0.8 | **0.03** | "small to medium" / "chaotic" |
| **Patriciate** | `PatriciateWard.hx:10-14` | `80 + 30·u·u` → [80,110] | `0.5 + 0.3u` | 0.8 | **0.2** | "large" / "moderately regular" |
| **Administration** | `AdministrationWard.hx:10-13` | `80 + 30·u·u` → [80,110] | `0.1 + 0.3u` → [0.1,0.4] | **0.3** | 0.04 (default) | "large" / "regular" |
| **Military** | `MilitaryWard.hx:10-16` | `√(block.square)·(1+u)` — **scales with the block** | `0.1 + 0.3u` | **0.3** | **0.25** | "regular" / "squares" |

Three design notes `[INFERRED]`:

1. `minSq = a + b·u·u` (a *product of one uniform squared*) is skewed strongly toward the small end:
   median `u·u ≈ 0.25`. So craftsmen wards are usually small-housed (≈ 10+20 = 30 unit²) with an
   occasional grand one. It is a cheap heavy-tailed distribution — no Beta, no rejection sampling.
2. `gridChaos` and `sizeChaos` are orthogonal axes: *street-grid regularity* vs *plot-size uniformity*.
   Administration is regular in both; Slum is chaotic in both; Patriciate has regular streets and wildly
   varied plots (0.5–0.8 / 0.8) plus 20% empty lots ⇒ big houses in gardens.
3. Military's `minSq ∝ √area` means its buildings get *bigger* in a bigger patch — barracks scale with
   the ward, they don't multiply. Combined with `emptyProb = 0.25` you get long regular barrack blocks
   around parade squares. Military is **not** a `CommonWard`, so it never calls `filterOutskirts`.

### 6.3 `Castle` (`wards/Castle.hx`)

- **Constructor** builds its own `CurtainWall` (`Castle.hx:17-21`):
  `new CurtainWall( true, model, [patch], reserved )` where `reserved` = the castle patch's vertices
  that are shared with any patch that is **not** `withinCity`. Reserved vertices are excluded from gate
  candidates (`CurtainWall.hx:49-55`) and from smoothing (`CurtainWall.hx:33-35`) ⇒ **the castle gate
  always faces into the city, never out into the countryside** `[STATED intent via the reserved
  mechanism]`.
- **Geometry** (`Castle.hx:24-27`):
  `block = patch.shape.shrinkEq( Ward.MAIN_STREET * 2 )` = **inset 4.0 all round** (note: *not*
  `getCityBlock` — a flat 4.0, the widest inset in the generator, the castle bailey), then
  `createOrthoBuilding( block, Math.sqrt(block.square) * 4, 0.6 )`.
  `minBlockSq ∝ √area` again, so a big castle gets a big keep, and `fill = 0.6` ⇒ ~40% of leaves dropped
  ⇒ a ragged L/U-shaped keep with courtyards.
- **Placement**: not chosen by `rateLocation`; `Model.buildWalls` hands the Castle the patch at index
  `nPatches` in the distance-sorted list, i.e. the first patch *outside* the inner ring, when
  `citadelNeeded` (`Model.hx:131-134, 160-169`).
- **Validity gate** `[STATED]`: `if (citadel.shape.compactness < 0.75) throw new Error("Bad citadel
  shape!")` (`Model.hx:165-166`) ⇒ the whole city is discarded and regenerated. Compactness 0.75 is
  between a square (0.79) and a triangle (0.60), so the citadel must be squarish.
- Label "Castle". Rendered specially (§9.4).

### 6.4 `Cathedral` (`wards/Cathedral.hx`)

```haxe
geometry = Random.bool( 0.4 )
    ? Cutter.ring( getCityBlock(), 2 + Random.float() * 4 )   // 40%: hollow ring, thickness ∈ [2,6]
    : Ward.createOrthoBuilding( getCityBlock(), 50, 0.8 );    // 60%: solid ortho massing
```
`[STATED]` (`Cathedral.hx:11-14`). The ring variant reads as a cloister/quadrangle around a courtyard;
the ortho variant as a cruciform/L massing (`fill = 0.8` ⇒ only ~20% dropped, so it stays chunky).
`minBlockSq = 50` is a fixed absolute — a cathedral's wings are always roughly the same size regardless
of patch size.
Label is **"Temple"**, not "Cathedral" (`Cathedral.hx:24`) — a visible naming mismatch between class and
UI.

### 6.5 `Market` (`wards/Market.hx`) — the plaza furniture

`[STATED]` (`Market.hx:14-52`). The market ward generates **no buildings at all**; the patch is left
open and receives exactly one object:

```
statue  = Random.bool( 0.6 )                       // 60% statue, 40% fountain
offset  = statue || Random.bool( 0.3 )             // statues always offset; fountains 30% of the time
if (statue || offset): find the patch's longest edge (v0, v1)
object  = statue ? Polygon.rect( 1+u, 1+u ) rotated to atan2(v1−v0)    // 1..2 × 1..2 box, aligned to the edge
                 : Polygon.circle( 1+u )                                // 16-gon, r ∈ [1,2]
position = offset ? lerp( patch.centroid, midpoint(v0,v1), 0.2 + 0.4u )  // 20–60% toward the long edge
                  : patch.centroid
geometry = [ object ]
```
Author's comment: "we always offset a statue and sometimes a fountain" `[STATED]` (`Market.hx:18`).
So a fountain is centred 70% of the time (0.4 × 0.7) and a statue never is. Rotating the statue to the
longest edge makes it read as *addressing* the square. Note `getCityBlock()` is **not** called — the
market square is flush to the patch boundary, which is why plazas look wide open, and the neighbours'
own `getCityBlock` plaza-frontage rule (§3.3) gives the 2.0-wide setback on the other side.

### 6.6 `Park` (`wards/Park.hx`)

```haxe
var block = getCityBlock();
geometry = block.compactness >= 0.7
    ? Cutter.radial( block, null, Ward.ALLEY )       // pinwheel from the centroid
    : Cutter.semiRadial( block, null, Ward.ALLEY );  // fan from the nearest-to-centroid vertex
```
`[STATED]` (`Park.hx:7-12`). Threshold **0.7** sits just below a square (0.79) and above a triangle
(0.60): compact blocks get the full pinwheel, elongated ones the fan (a radial cut of a long block would
give absurd slivers). Alleys are `ALLEY = 0.6`. Rendered as `palette.medium` wedges (§9.4) — the
"lawn/grove" look with 0.6-wide paths between wedges.

### 6.7 `Farm` (`wards/Farm.hx`)

```haxe
var housing = Polygon.rect( 4, 4 );
var pos = GeomUtils.interpolate( patch.shape.random(), patch.shape.centroid, 0.3 + Random.float() * 0.4 );
housing.rotate( Random.float() * Math.PI );
housing.offset( pos );
geometry = Ward.createOrthoBuilding( housing, 8, 0.5 );
```
`[STATED]` (`Farm.hx:11-18`). A 4×4 (=16 unit²) footprint, randomly rotated in [0, π), placed 30–70% of
the way from a **random patch vertex** toward the centroid — i.e. off-centre, toward one corner of the
field, which is how real farmsteads sit. `createOrthoBuilding(·, 8, 0.5)` splits 16 into ~2–4 leaves and
keeps each with p = 0.5 ⇒ a small L-shaped or split farmstead (retrying until non-empty).
Placement: `Model.createWards` gives a countryside patch a Farm with probability **0.2** and only if
`patch.shape.compactness >= 0.7` (`Model.hx:409-411`) — farms only on tidy fields.
No fields/furrows in this version (`[NAMED-ONLY]` for MFCG's later "farm fields" feature, devlog 59798
per the project's devlog list — outside this slice).

### 6.8 `GateWard` (`wards/GateWard.hx`)

Parameters in §6.2. Placement is special-cased twice in `Model.createWards`:
- **Inside**: for each border gate, each patch touching that gate with no ward yet becomes a GateWard
  with probability **0.5 if walled, 0.2 if unwalled** (`Model.hx:353-359`).
- **Outside**: for each wall gate, with probability `1 − 1/(nPatches − 5)`, every ward-less patch
  touching the gate is promoted to `withinCity = true` and becomes a GateWard (`Model.hx:392-399`).
  This is the suburb-outside-the-gate mechanism.

### 6.9 `MilitaryWard`, `PatriciateWard`, `Slum`, `MerchantWard`, `AdministrationWard`, `CraftsmenWard`

Geometry is entirely §6.2 + `CommonWard.createGeometry` (except Military, §6.2 note 3). Their distinct
identities come from parameters + `rateLocation` (§7).

---

## 7. `rateLocation` — the ward placement objective functions

**Convention**: `Model.createWards` picks `unassigned.min( rate )` — **lower is better**, and
`Math.POSITIVE_INFINITY` means "forbidden" (`Model.hx:382-384`). Already-assigned patches are forced to
`+∞`.

| Ward | formula | reading |
|---|---|---|
| `Ward` (base) | `0` | never reached, see §8.2 |
| **Administration** (`AdministrationWard.hx:16-21`) | `plaza != null ? (borders(plaza) ? 0 : shape.distance(plaza.center)) : shape.distance(model.center)` | "Ideally … should overlook the plaza, otherwise as close as possible" `[STATED]` |
| **Cathedral** (`Cathedral.hx:16-22`) | `borders(plaza) ? −1/square : distance(plazaCenter or center) · square` | Among plaza-fronting patches, `−1/s` is **more negative for a *smaller* patch** ⇒ prefers the *small* patch on the square. Off-plaza, it minimises `distance × area` ⇒ close **and** small |
| **Market** (`Market.hx:54-62`) | `+∞` if any `inner` patch already holding a `Market` borders this one; else `plaza != null ? square/plaza.square : distance(center)` | "One market should not touch another"; "Market shouldn't be much larger than the plaza" `[STATED]` — minimising the ratio means it picks the **smallest** available patch |
| **Merchant** (`MerchantWard.hx:16-18`) | `distance(plazaCenter or model.center)` | "as close to the centre as possible" `[STATED]` |
| **Military** (`MilitaryWard.hx:18-26`) | `0` if borders citadel; `1` if borders the wall; else `+∞` if a citadel or wall exists, `0` if neither does | Hard constraint with a preference ordering |
| **Patriciate** (`PatriciateWard.hx:16-26`) | `Σ over already-warded bordering patches: −1 per Park, +1 per Slum` | "prefers to border a park and not to border slums" `[STATED]`. Integer-valued ⇒ many ties, broken by array order (first minimum wins, `ArrayExtender.min` uses strict `<`) |
| **Slum** (`Slum.hx:16-18`) | `−distance(plazaCenter or model.center)` | "as far from the centre as possible" `[STATED]` |
| Craftsmen, Gate, Park, Farm, Castle | *(none defined)* | ⇒ random unassigned patch (§8.2) |

**Three structural caveats** `[INFERRED]`:

1. Every `distance()` here is the §1.1 bug — distance from the patch's **vertex 0**.
2. `Patriciate` and `Market` only see wards assigned **earlier** in the `WARDS` sequence, because
   assignment is greedy and sequential. In the fixed `WARDS` order the first Patriciate sits at index 19
   and the only Park at index 32 — **the first patriciate ward can never benefit from the park rule**,
   only the second (index 33) can. Similarly the first Market (index 20) has only the plaza-market
   (assigned pre-loop) to avoid.
3. `Cathedral`'s `−1/square` branch is easy to misread as "prefer big"; it is not. For `s = 10` it gives
   −0.100, for `s = 100` −0.010, and `min` picks −0.100.

---

## 8. Integration: how `Model` drives the wards (context needed to read this slice)

### 8.1 The `WARDS` deck `[STATED]` (`Model.hx:35-42`)

36 entries, consumed with `shift()` (front to back), `Slum` once exhausted (`Model.hx:374`):

```
 0 Craftsmen   1 Craftsmen   2 Merchant    3 Craftsmen   4 Craftsmen   5 Cathedral
 6 Craftsmen   7 Craftsmen   8 Craftsmen   9 Craftsmen  10 Craftsmen
11 Craftsmen  12 Craftsmen  13 Craftsmen  14 Administration  15 Craftsmen
16 Slum       17 Craftsmen  18 Slum       19 Patriciate 20 Market
21 Slum       22 Craftsmen  23 Craftsmen  24 Craftsmen  25 Slum
26 Craftsmen  27 Craftsmen  28 Craftsmen  29 Military   30 Slum
31 Craftsmen  32 Park       33 Patriciate 34 Market     35 Merchant
```
Composition: 21 Craftsmen, 5 Slum, 2 Market, 2 Merchant, 2 Patriciate, 1 each of Cathedral,
Administration, Military, Park. **The order is the zoning policy**: the cathedral lands 6th (while
plaza-adjacent patches are still free), administration 15th, the park only 33rd.

**Shuffle** (`Model.hx:362-368`): `for i in 0...Std.int(36/10)` → **3** adjacent-pair swaps at
`Random.int(0, len-1)` ∈ [0,34]. A deliberately *weak* shuffle — it jitters the deck without destroying
the ordering policy. Reproduce exactly: `Random.int(min,max)` is `Std.int(min + next()/n*(max−min))`,
exclusive of `max` (`Random.hx:26-27`).

### 8.2 Static methods are not inherited — the placement consequence `[INFERRED, high confidence]`

`Model.createWards` does `Reflect.field( wardClass, "rateLocation" )` and, when it is `null`, picks a
random unassigned patch instead (`Model.hx:375-384`). In Haxe, **static fields are not inherited by
subclasses** (and the JS/Flash outputs do not chain constructor objects), so `CraftsmenWard`,
`GateWard`, `Park`, `Farm` and `Castle` resolve to `null` despite `Ward.rateLocation` existing. The base
`Ward.rateLocation` returning `0` is dead code. Net effect: **21 of 36 ward slots (all the craftsmen)
plus the park are placed uniformly at random among the remaining patches.** The zoning you see is
produced by ~14 constrained placements against a random background.

### 8.3 Build order and the global retry `[STATED]` (`Model.hx:78-97`)

```
do try { build(); instance = this; } catch (e:Error) { trace(e.message); instance = null; }
while (instance == null);

build(): buildPatches → optimizeJunctions → buildWalls → buildStreets → createWards → buildGeometry
```
`buildGeometry` is simply `for (patch in patches) patch.ward.createGeometry()` (`Model.hx:414-416`) —
**every ward's geometry is built exactly once, after all wards are assigned**, which is what lets
`getCityBlock` consult final arteries and final wall geometry.

Three throw sites restart the *entire* city: `"Bad citadel shape!"` (`Model.hx:166`),
`"Unable to build a street!"` (`Model.hx:248`), `"Bad walled area shape!"` (`CurtainWall.hx:58,104`).
This "generate-and-reject with full restart" is the generator's only validity mechanism `[STATED]`.

### 8.4 City sizes `[STATED]` (`Model.hx:24-28`, `TownScene.hx:28-31`, `StateManager.hx:47-59`)

| Label | nPatches |
|---|---|
| Small Town | 6–10 |
| Large Town | 10–15 |
| Small City | 15–24 |
| Large City | 24–40 |
| "Metropilis" *(sic)* | ≥ 40 |

Default 15. `StateManager` clamps URL `size` to [6,40]. `CitySizeButton` picks
`minSize + Std.int(Math.random() * (maxSize − minSize))` — note it uses **`Math.random()`, not the
seeded `Random`** (`CitySizeButton.hx:15`), so the size roll is outside the seed.

---

## 9. Rendering

### 9.1 `Palette` — every colour of every palette `[STATED]` (`mapping/Palette.hx:17-24`)

Four slots: `paper` (background), `light` (building fill), `medium` (roads / parks), `dark` (ink).

| Palette | paper | light | medium | dark |
|---|---|---|---|---|
| `DEFAULT` | `0xccc5b8` | `0x99948a` | `0x67635c` | `0x1a1917` |
| `BLUEPRINT` | `0x455b8d` | `0x7383aa` | `0xa1abc6` | `0xfcfbff` |
| `BW` | `0xffffff` | `0xcccccc` | `0x888888` | `0x000000` |
| `INK` | `0xcccac2` | `0x9a979b` | `0x6c6974` | `0x130f26` |
| `NIGHT` | `0x000000` | `0x402306` | `0x674b14` | `0x99913d` |
| `ANCIENT` | `0xccc5a3` | `0xa69974` | `0x806f4d` | `0x342414` |
| `COLOUR` | `0xfff2c8` | `0xd6a36e` | `0x869a81` | `0x4c5950` |
| `SIMPLE` | `0xffffff` | `0x000000` | `0x000000` | `0x000000` |

Notes `[INFERRED]`: `BLUEPRINT` and `NIGHT` are **inverted** (paper darker than dark) — the same drawing
code produces white-on-blue and amber-on-black without any branch, because every call site is written in
terms of the four roles, never literal colours. `SIMPLE` collapses light/medium/dark to black ⇒ solid
silhouettes on white. `DEFAULT.paper = 0xccc5b8` also appears as the OpenFL window background in
`project.xml:14` and as `stage.color` (`Main.hx:19`).

Active palette: `CityMap.palette = Palette.DEFAULT`, a **static** (`CityMap.hx:21`); there is no palette
switcher in this snapshot (`[NAMED-ONLY]` — "options UI" per `README.md:2`).

### 9.2 `Brush` — stroke constants and state `[STATED]` (`mapping/Brush.hx`)

```
NORMAL_STROKE = 0.300
THICK_STROKE  = 1.800
THIN_STROKE   = 0.150      // defined, never used in this snapshot
default strokeColor = 0x000000, fillColor = 0xcccccc, stroke = NORMAL_STROKE
```
- `setFill(g, color)` → `g.beginFill(color)`.
- `setStroke(g, color, stroke = NORMAL_STROKE, miter = true)` → `stroke == 0` ⇒ `noStroke`, else
  `g.lineStyle( stroke, color == -1 ? fillColor : color, 1, false, null, null, miter ? MITER : null )`.
  **The `color == −1` sentinel means "stroke with the current fill colour"** — used by Park.
  Alpha 1, pixelHinting false, **JointStyle.MITER** by default (sharp corners — the map's crisp look).
- `noStroke(g)` → `g.lineStyle(0, 0, 0)`.
- `setColor(g, fill, line = −1, stroke = NORMAL_STROKE, miter = true)` → both.
- Vestigial: `private var palette` is stored and never read; `lastDark`/`lastPaper` statics are never
  read or written (`Brush.hx:16-23`). `[INFERRED]` leftovers of a colour-caching/hatching path — the
  devlog "preview of hatching" (id 1367) is the likely relative, outside this slice.

### 9.3 `CityMap` layer order `[STATED]` (`mapping/CityMap.hx:27-79`)

`addChild` order = back to front:

1. **Roads** — one `Shape` **per road**, `drawRoad(...)` (`CityMap.hx:34-38`). Only `model.roads`
   (the outside-the-wall paths) are drawn. `model.streets` are **never stroked**.
2. **Patch views** — one `PatchView` (a `Shape`) per patch, in `model.patches` order, added only if the
   ward type matched a case (`CityMap.hx:41-66`).
3. **Hot areas** — every patch's transparent `hotArea` Sprite, all of them, above all art
   (`CityMap.hx:68-69`).
4. **Walls** — a single `Shape` on top: `model.wall` first (`large = false`), then the citadel's
   `Castle.wall` (`large = true`) (`CityMap.hx:71-78`).

Then `TownScene` adds, above the map: the `Tooltip`, then the button column (`TownScene.hx:20-38`).

**Key visual-grammar consequence** `[INFERRED, follows directly]`: inside the walls, streets are
**negative space** — they exist only as the gaps `getCityBlock` leaves between blocks, filled by the
paper background. Outside the walls, roads are **positive strokes** drawn under the buildings. One
generator, two rendering idioms, and they meet exactly at the gate because road-adjacent outskirt blocks
are inset by `MAIN_STREET/2 = 1.0` on each side — precisely the drawn road's 2.0 width.

`patches` order matters for z-fighting of strokes: `Model.buildPatches` sorts the Voronoi points by
distance from origin (`Model.hx:115-117`), so central patches are drawn first and are *under* the
outer ones.

Smell `[STATED]`: `CityMap.new(model)` immediately shadows its parameter with
`var model = Model.instance;` (`CityMap.hx:32`) — the argument is ignored.

### 9.4 The five drawing cases `[STATED]` (`CityMap.hx:46-61`)

| Ward class | call |
|---|---|
| `Castle` | `drawBuilding( g, geometry, palette.light, palette.dark, Brush.NORMAL_STROKE * 2 = 0.6 )` |
| `Cathedral` | `drawBuilding( g, geometry, palette.light, palette.dark, Brush.NORMAL_STROKE = 0.3 )` |
| `Market`, `CraftsmenWard`, `MerchantWard`, `GateWard`, `Slum`, `AdministrationWard`, `MilitaryWard`, `PatriciateWard`, `Farm` | `brush.setColor( g, palette.light, palette.dark )` then `drawPolygon` per building — fill light, **0.3 miter stroke in dark, per building** |
| `Park` | `brush.setColor( g, palette.medium )` — `line = −1` ⇒ stroke colour **= fill** ⇒ groves in medium with a 0.3 medium stroke (which slightly *narrows* the 0.6 alleys to ~0.3 visible) |
| default (plain `Ward` = countryside) | `patchDrawn = false` — view created but **never added** |

### 9.5 `drawBuilding` — the silhouette trick `[SHOWN]` (`CityMap.hx:116-127`)

```haxe
brush.setStroke( g, line, thickness * 2 );      // pass 1: stroke only, DOUBLE width, no fill
for (block in blocks) g.drawPolygon( block );
brush.noStroke( g );
brush.setFill( g, fill );                       // pass 2: fill only, no stroke
for (block in blocks) g.drawPolygon( block );
```
Two full passes over the same polygons. Because a stroke straddles its path, drawing at `thickness*2`
and then covering the interior with the fill leaves an **effective outline of `thickness`** (the outer
half). And because *all* blocks are stroked before *any* is filled, the fills of neighbouring blocks
cover the internal seams ⇒ the L/T/U composite from `createOrthoBuilding` reads as **one outlined
silhouette**, not a pile of rectangles. That is why castles and cathedrals look like single massed
structures while craftsmen houses (single-pass `setColor`) look like individually outlined plots.

Outline widths: Castle **0.6**, Cathedral **0.3**, everything else **0.3**.

Caveat for a canvas/SVG port `[INFERRED]`: pass 2 issues several sub-paths inside one `beginFill`, so
the fill rule matters if blocks ever overlap. `createOrthoBuilding` output is non-overlapping and
consistently wound, so nonzero and even-odd agree — but a port that lets blocks overlap will punch
holes under even-odd.

### 9.6 Roads, walls, towers, gates, hot areas `[STATED]`

**`drawRoad`** (`CityMap.hx:81-87`) — two passes on the same polyline (`drawPolyline` = `moveTo(p0)` then
`lineTo` each, `GraphicsExtender.hx:18-23`):
```
lineStyle( MAIN_STREET + NORMAL_STROKE = 2.3, palette.medium, ..., CapsStyle.NONE );  drawPolyline
lineStyle( MAIN_STREET − NORMAL_STROKE = 1.7, palette.paper );                        drawPolyline
```
Classic **casing**: a 2.3-wide medium stroke with a 1.7-wide paper stroke on top ⇒ two 0.3-wide medium
kerb lines exactly `NORMAL_STROKE` thick, enclosing a 1.7 paper carriageway, total 2.3.
`CapsStyle.NONE` on the casing means road ends are square-cut (they butt into the gate); the paper pass
uses default caps (ROUND) and default joints (ROUND) — so the inner carriageway has rounded corners
while the casing miters, which is what softens the bends. Roads were already smoothed by
`smoothVertexEq(3)` in `Model.buildStreets` (`Model.hx:213-217, 253-254`).

**`drawWall`** (`CityMap.hx:89-98`): `lineStyle( THICK_STROKE = 1.8, palette.dark )` + `drawPolygon`
(closed), then gates, then towers.

**`drawTower`** (`CityMap.hx:100-105`): `noStroke`, `beginFill(palette.dark)`,
`drawCircle(p.x, p.y, r)`, `endFill` with **r = 1.8** for the city wall and **r = 2.7**
(`THICK_STROKE * 1.5`) for the citadel (`large = true`). Towers sit on every wall vertex that is not a
gate (`CurtainWall.buildTowers`, `CurtainWall.hx:112-122`).

**`drawGate`** (`CityMap.hx:107-114`):
```
lineStyle( THICK_STROKE * 2 = 3.6, palette.dark, ..., CapsStyle.NONE );
dir = wall.next(gate) − wall.prev(gate);  dir.normalize( THICK_STROKE * 1.5 = 2.7 );
moveTo( gate − dir ); lineTo( gate + dir );
```
`dir` runs **along** the wall, so the gate is a 5.4-long, 3.6-wide dark bar centred on the gate vertex —
i.e. a locally thickened wall segment reading as a gatehouse, drawn with square caps so it butts flush
into the 1.8 wall on both sides.

**`PatchView`** (`mapping/PatchView.hx`): a `Shape` holding the ward art plus a separate `hotArea`
Sprite filled `beginFill(0, 0)` (alpha 0) over the **full patch shape** — invisible hit geometry.
`MOUSE_OVER` (with the comment "Since 5.1.5 assigning a listener to ROLL_OVER here causes a crash"
`[STATED]`, `PatchView.hx:26`) sets `Tooltip.instance.set( patch.ward.getLabel() )`, guarded by a static
`lastPatch` so repeats are free. Countryside wards return `null` ⇒ `Tooltip.set(null)` ⇒ hidden. Note
the hot area covers **every** patch, including ones whose art was never added.

**Ward labels** `[STATED]`: Administration, Castle, **Temple** (Cathedral), Craftsmen, Farm, Gate,
Market, Merchant, Military, Park, Patriciate, Slum; base `Ward` → `null`.

**A `lineStyle` argument oddity** `[STATED, consequence UNKNOWN]`: `drawRoad` and `drawGate` call
`g.lineStyle( thickness, color, false, null, CapsStyle.NONE )`. In the OpenFL/Flash signature
`lineStyle(thickness, color, alpha, pixelHinting, scaleMode, caps, joints, miterLimit)` the third
argument is **alpha**, so `false` lands on alpha and `CapsStyle.NONE` lands on `scaleMode`. Roads and
gates are obviously drawn opaque in the real generator, so either that OpenFL version coerced it or the
call was meant to read `(thickness, color, 1, false, null, CapsStyle.NONE)`. A re-implementer should use
**alpha = 1, pixelHinting = false, default scaleMode, caps = NONE**.

### 9.7 Scene, scale and UI chrome `[STATED]`

- `TownScene.layout()` (`TownScene.hx:47-59`):
  ```
  map.x = rWidth/2;  map.y = rHeight/2;              // world origin at window centre
  scaleX = rWidth / cityRadius;  scaleY = rHeight / cityRadius;
  scale  = (scMax/scMin > 2 ? scMax/2 : scMin) * 0.5;
  ```
  `cityRadius` is the farthest city vertex from the origin (`Model.hx:402-407`), the map spans `2R`, so
  the `× 0.5` makes the city just fill the smaller window dimension; the `scMax/2` branch keeps
  extremely elongated windows from over-shrinking.
- `Main.getScale()` = `Std.int( Capabilities.screenDPI / 24 )` (`Main.hx:30-32`) — an **integer** device
  scale applied to the whole scene by `Game.layout()` (`Game.hx:71-79`), with
  `StageScaleMode.NO_SCALE`, `StageAlign.TOP_LEFT` (`Game.hx:27-29`). So world stroke widths (0.3, 1.8)
  are multiplied by `mapScale × deviceScale` before rasterisation — **they are not pixel widths**.
- Window: 800×800 desktop, resizable, fps 120, vsync, hardware, allow-high-dpi, background `0xccc5b8`
  (`project.xml:14-18`).
- `Button` (`ui/Button.hx`): fixed **45 × 13** px bitmap filled `CityMap.palette.dark`, label blitted at
  `x = 5`, `y = (13 − baseLine) >> 1` = `(13−8)>>1` = **2**; `buttonMode = true`; fires on `MOUSE_DOWN`.
- `CitySizeButton` (`ui/CitySizeButton.hx`): on click sets `StateManager.size`, `StateManager.seed =
  Random.getSeed()`, pushes the URL params, builds `new Model(size)` and switches scene.
- Button column: top-right, `buttons.x = rWidth − width − 1`, `y = 1`, stacked with **1 px** gaps
  (`TownScene.hx:33-38, 57-58`).
- `Tooltip` (`ui/Tooltip.hx`): cached `BitmapData` per string, size `textW + 4 × textH + 2`, background
  `palette.dark`, text at (2,1), follows the mouse at `(mouseX + 4, mouseY)` and calls
  `updateAfterEvent()`.
- UI font: `BitmapFont.get("font", CityMap.palette.paper)` with `letterSpacing = 1`, `baseLine = 8`
  (`Main.hx:21-23`). Asset `Assets/maroubra.png` — **viewed**: a 360×10 px single-row bitmap-font strip,
  glyphs stored as white pixels on full transparency (it reads as blank on a white background), with
  `BitmapFont` auto-slicing glyph rectangles by scanning for fully transparent columns
  (`BitmapText.hx:116-174`). `get()` recolours the strip via `ColorTransform` and caches it under
  `id + "_" + color`.

### 9.8 What is *not* drawn in this snapshot `[STATED / NAMED-ONLY]`

No water (`Model.waterbody` is declared and never populated, `Model.hx:47`), no rivers, no hatching, no
labels/city name, no scale bar, no compass, no elevation, no district colouring, no export, no options
UI, no palette switching at runtime. `README.md:2-3` names waterbodies and the options UI explicitly.
`CurtainWall.segments` (all `true` here, `CurtainWall.hx:39`) exists precisely so that wall sections can
be *disabled* where water replaces them — the hook for coastal cities is present, the feature is not
`[INFERRED, strong]`.

---

## 10. Consolidated constant index (everything a re-implementer must hard-code)

**Street widths** — `MAIN_STREET 2.0`, `REGULAR_STREET 1.0`, `ALLEY 0.6` (`Ward.hx:18-20`).
**Insets** — wall 1.0, plaza frontage 1.0, artery 1.0, inner ordinary 0.5, outer ordinary 0.3; Castle
bailey `shrinkEq(4.0)`.
**Strokes** — `NORMAL_STROKE 0.300`, `THICK_STROKE 1.800`, `THIN_STROKE 0.150` (unused); castle outline
0.6, cathedral/houses 0.3, wall 1.8, gate bar 3.6 × 5.4 long, tower radius 1.8 / 2.7; road casing 2.3
over carriageway 1.7.
**createAlleys** — ratio spread `0.8·gridChaos`; angle spread `π/6·gridChaos`, i.e. ±15°·gridChaos,
zeroed below `4·minSq`; leaf factor `2^(4·sizeChaos·(u−0.5))`; alley-gap test `square > minSq/(u₁u₂)`.
**createOrthoBuilding** — cut ratio `[0.4, 0.6]`; leaf factor `2^(normal()·2 − 1)`.
**Ward params** — see §6.2 table.
**Probabilities** — Cathedral ring 0.4 (thickness 2 + 4u); Market statue 0.6, fountain offset 0.3, object
size `1 + u`, offset ratio `0.2 + 0.4u`; Farm chance 0.2 with compactness ≥ 0.7, fill 0.5, minBlockSq 8,
footprint 4×4, placement `0.3 + 0.4u` from a random vertex to centroid; Castle fill 0.6, minBlockSq
`4√A`; Cathedral fill 0.8, minBlockSq 50; GateWard inner chance 0.5 walled / 0.2 unwalled, outer chance
`1 − 1/(nPatches − 5)`.
**Compactness thresholds** — Park radial ≥ 0.7; Farm eligibility ≥ 0.7; citadel validity ≥ 0.75
(reference values: circle 1.00, square 0.79, triangle 0.60).
**Model** — vertex merge distance 8.0; countryside cull `distance < 3·wallRadius`; deck shuffle
`int(36/10) = 3` swaps; relaxation 3 iterations over the first 3 points plus point `nPatches`
(`Model.hx:108-113`); Voronoi seeding `a = sa + √i·5`, `r = 10 + i·(2+u)`, `nPatches·8` points.
**PRNG** — Lehmer/MINSTD, `g = 48271`, `n = 2147483647`, `seed₀ = 1`, `float() = next()/n`,
`normal() = (u+u+u)/3`, `int(min,max) = int(min + u·(max−min))` (max exclusive),
`fuzzy(f) = (1−f)/2 + f·normal()` (`utils/Random.hx`). **Generation is fully reproducible from the seed
except the city-size roll** (`Math.random()` in `CitySizeButton.hx:15`).

---

## 11. Failure modes and how the code handles them

| Failure | Detection | Handling | Where |
|---|---|---|---|
| Citadel patch too ragged | `compactness < 0.75` | `throw Error` ⇒ **regenerate the whole city** | `Model.hx:165-166` |
| No street can reach a gate | `buildPath` returns null | `throw Error` ⇒ regenerate | `Model.hx:247-248` |
| Walled area has no valid entrance | `entrances.length == 0` / `gates.length == 0` | `throw Error` ⇒ regenerate | `CurtainWall.hx:57-58, 103-104` |
| `createOrthoBuilding` drops every leaf | `blocks.length == 0` | `while(true)` **retry the whole slicing** | `Ward.hx:191-195` |
| `Polygon.cut` finds ≠ 2 intersections | `count != 2` | **silent no-op**, returns the polygon unchanged | `Polygon.hx:513-514` |
| Over-inset in `shrink` | none | silent under-inset (the no-op above) | `Polygon.hx:350-362` |
| `buffer` self-intersection | explicit all-pairs pass | keeps the largest resulting loop | `Polygon.hx:264-338` |
| Reflex corners in `buffer` | none | chamfered by the straight joint chord | `Polygon.hx:250-262` |
| Ward block ends up empty (all leaves dropped by `emptyProb`) | none | accepted — empty block | `Ward.hx:146-151` |
| Degenerate recursion in `createAlleys` / `slice` | none | **none** — potential stack overflow, not caught by the `Error` retry | `Ward.hx:152`, `Ward.hx:180` |
| Gates too close together | pre-emptive: neighbouring entrance candidates are spliced out after each pick | 3 candidates removed per gate | `CurtainWall.hx:90-99` |
| Two markets adjacent | `rateLocation` returns `+∞` | placement avoids it (unless *all* candidates are `+∞`, in which case `min` still returns one) | `Market.hx:55-58` |

`[INFERRED]` The dominant design pattern is **generate-and-reject at the whole-city level**, plus one
local retry loop. There is no local repair anywhere.

---

## 12. Delta vs. the live generator (what this snapshot is *not*)

`[STATED]` (`README.md:2-3`): missing waterbodies, options UI, "some smaller ones".
`[INFERRED]` from hooks present but inert: `CurtainWall.segments` (water-broken walls),
`Brush.THIN_STROKE` / `lastDark` / `lastPaper` (a second stroke weight and a colour cache, plausibly
hatching), `Model.waterbody`, `Polygon.simplyfy` / `filterShort` (polygon simplification),
`utils/PixelCache`, `geom/Spline` and `geom/Circle` (unused by anything in this slice).
`[NAMED-ONLY]` for this slice — everything later: rivers, house shapes, warp tool, neighbourhoods,
farm fields, custom colours, scale bar, elevation, districts, 3D view. Those belong to the devlog slices.

---

## 13. UNKNOWN / decisions a re-implementer must make

1. **Reproduce or fix `Polygon.distance()`?** (§1.1) It silently randomises all distance-based zoning.
   Fixing it makes zoning visibly tidier than MFCG's — a *look* decision, not a bug decision.
2. **Polygon winding and `cut()` return order.** Documented here (§0.2, §1.4) but never asserted in the
   code; a port must pin it with a test or `shrink`/`peel`/`ring` will keep the wrong halves.
3. **Voronoi vertex ordering** determines "vertex 0" and therefore both the distance bug and
   `forEdge` index alignment with `insetDist[]`. Not recoverable from this slice — it comes from
   `geom/Voronoi.hx` / `Patch.fromRegion` (another slice's ground).
4. **`lineStyle` alpha/caps ambiguity** in `drawRoad` / `drawGate` (§9.6).
5. **Fill rule** for multi-subpath fills in `drawBuilding` (§9.5) — matters only if blocks can overlap.
6. **No termination guard** in either recursive slicer; a port needs a depth/area cap and must decide
   what to emit when the cap trips.
7. **`filterOutskirts` sign handling** — signed `distance2line` can produce negative normalised
   distances (unconditional keeps). Unclear whether intentional.
8. **Ward geometry is built once, globally, after assignment** — any incremental/editable
   re-implementation has to decide how to invalidate `getCityBlock` when arteries or walls change.
9. **`gridChaos`/`sizeChaos`/`minSq`/`emptyProb` are the entire ward vocabulary.** Whether four scalars
   are enough character for an original generator, or whether ward identity should also drive
   *orientation* (e.g. a preferred axis per ward) and *frontage* (buildings addressing the street), is
   the main open design question this code raises: MFCG has no explicit street-frontage rule at all —
   frontage is an emergent side effect of perpendicular-to-longest-edge cutting.
10. **Scale semantics**: all constants are absolute world units against a city radius that grows with
    `nPatches`, so a metropolis has the *same* house size as a small town and simply more of them. An
    original generator must decide whether to keep that (it is why MFCG maps zoom consistently).

---

## 14. Verification status

**CONFIRMED by reading the complete source** (every claim above cites file:line): all constants, all
parameter formulas, all control flow, the layer order, the palettes, the draw calls.

**CONFIRMED by hand-execution** (worked numerically in this session, §1.4): `Polygon.cut` returns
`[left-of-cut-direction, right-of-cut-direction]`, and `shrink`'s `[0]` is therefore the interior side;
the two-cut example on the unit square is reproduced in §1.4.

**CONFIRMED by reading** (no execution needed, the defect is textual): `Polygon.distance()` returns the
distance to vertex 0, contradicting its own doc comment (§1.1).

**PLAUSIBLE (analytic, not executed)**: the probability tables in §4.2/§4.3 and §3.4 — derived from the
PRNG definitions (`P(u₁u₂ > t) = 1 − t + t·ln t`; Irwin–Hall(3)/3 CDF `4.5x³` on `[0,⅓]`). The formulas
are exact; I did not run a Monte-Carlo check.

**PLAUSIBLE**: Haxe not inheriting statics ⇒ Craftsmen/Gate/Park/Farm/Castle are randomly placed
(§8.2). This follows from the Haxe language semantics rather than from anything in the repo; a port
should verify against a recorded MFCG map before copying the behaviour.

**NOT VERIFIED against the live generator** — by instruction, this slice reads no captures and no
bundles. Every "MFCG looks like X" statement here is about the 2019 open-source ancestor only.

## Critic-2 addendum (OS seat, 2026-09-25)

Second critic pass (`research/findings/_critic-os.md`). Every constant in §6.2, §9.1 (all 32 palette values), §9.2,
§9.6 and §10 was re-checked at the source and is correct; §7's Cathedral reading (−1/A ⇒ the *smaller* plaza-fronting
patch) and §4.2's `sizeChaos` table are the correct versions where `os-model.md` disagreed. Corrections and closures,
nothing above edited:

1. **§8.4 size table — the button ranges are max-exclusive.** `CitySizeButton.hx:15` rolls
   `minSize + Std.int(Math.random() · (maxSize − minSize))`, so the buttons yield Small Town 6–9, Large Town 10–14,
   Small City 15–23, Large City 24–39; `StateManager.hx:48-57` labels the same half-open buckets and size 40
   ("Metropilis") is reachable only through the URL. `os-model.md` §1.2 has the right ranges.
2. **§10 "relaxation 3 iterations over the first 3 points plus point nPatches" is the literal code, not what
   happens.** `Voronoi.build` puts the four frame corners at `points[0..3]` (`Voronoi.hx:27-28`) and appends the real
   seeds (`:50`); `relax` removes a relaxed seed and pushes its centre to the end (`:139-149`). So the three leading
   entries of `toRelax` are frame corners (no-ops) and pass k relaxes original spiral index `nPatches − 4 + k`, once;
   the central cells are never relaxed (`os-model.md` §3.3, `os-geometry.md` §2.2.1, re-derived in this pass). A
   re-implementer who hard-codes this §10 line literally — Lloyd-relaxing the three central seeds and the citadel
   seed three times — gets a more regular centre than the 2017 output.
3. **§0.3 "cityRadius on the order of 150–250 units" for `nPatches = 15` is 2–3× too high** (PLAUSIBLE estimate, the
   Voronoi itself was not computed): re-running the seed formula for ten seeds puts the 16th-nearest seed at
   42.5–48.8 units from the origin, cells there are ≈ 6.25·√15 ≈ 24 units across, so the inner-city vertices reach
   ≈ 55–65 and the promoted gate-ward ring ≈ 60–95. The whole 120-seed cloud has half-extent ≈ 346
   (`os-model.md` §3.1, executed), which may be where the larger figure came from.
4. **§9.6 / §13.4 `lineStyle(thickness, color, false, null, CapsStyle.NONE)` — closable.** Haxe skips an optional
   parameter whose type does not match the supplied argument, so `false` binds to `pixelHinting`, `null` to
   `scaleMode` and `NONE` to `caps`, leaving `alpha = 1` — exactly the values §9.6 recommends. PLAUSIBLE (language
   rule; nothing was compiled in this pass).
5. **§1.4 / §4.5 / §11 on `cut` ≠ 2 and the `Error`-only retry are the correct account**; `os-geometry.md` §1.4's
   broader "all collapse into a rebuild" is superseded by its own addendum.
6. One hazard no OS file states: `Graph.aStar` iterates `current.links.keys()` on a `Map<Node,Float>`
   (`Graph.hx:41`); with the FIFO open set, the runtime's `ObjectMap` key order decides which of several equal-hop
   streets is built, and therefore the arteries that `getCityBlock` (§3.3) insets against. Seed-exact block
   geometry needs that order reproduced, not just the constants in §10.
