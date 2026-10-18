# os-geometry — watabou TownGeneratorOS: geometry + utility layer

Slice: `reference/TownGeneratorOS/Source/com/watabou/geom/**` and `.../utils/**` (every file read in
full), plus `reference/TownGeneratorOS/README.md`, `LICENSE`, `project.xml`, and a geometry-only skim of
`.../coogee/**`. Consumer files (`towngenerator/**`) were read only where needed to pin down the
*semantics* of a geometry call; they belong to other slices and are cited, not analysed.

Evidence tags: **[STATED]** = the code or its own comments say it; **[SHOWN]** = observable in
recorded behaviour; **[INFERRED]** = my reconstruction, reasoning given; **[NAMED-ONLY]** = named, no
method. Because this slice *is* source code, most lines are [STATED] — I reserve [INFERRED] for
semantics that are implied rather than written (winding conventions, bug consequences, intent).

---

## 0. Provenance and licence

### 0.1 What this repository is

- `README.md`: "This is the source code of the Medieval Fantasy City Generator … It **lacks some of
  the latest features, namely waterbodies, options UI and some smaller ones**." [STATED]
- Dependencies: OpenFL + msignal via haxelib. `project.xml` pins `lime 7.3.0`, `openfl 8.9.0`,
  `msignal 1.2.5`; window `800×800`, background `0xccc5b8`, 120 fps, `company="Retronic Games"`.
  [STATED, `project.xml`]
- Single commit in the local clone: `7fbc87a "Updated for compatibility with the latest versions of
  openfl and lime"`, remote `https://github.com/watabou/TownGeneratorOS.git`. So this is a **2017-era
  snapshot with a later build-compat touch-up**, not the live generator. [STATED, `git log`]

**Consequence for the project:** this repo is the *ancestor*, not the current MFCG. Anything the live
generator does with water, terrain, curved roads, or options is **not** in here. Two strong internal
confirmations of that (see §3.7 and §4.3): the `Spline` class and the entire `PerlinNoise` class have
**zero callers** anywhere in `Source/` — they are staged-but-unused capability, exactly matching the
README's "lacks … waterbodies".

### 0.2 Licence — GPL-3.0, and what it implies

`LICENSE` is the **complete, unmodified GNU General Public License version 3** (verified head and
tail; §7 "Additional Terms" and §13 present as boilerplate only). There is **no** additional-permission
grant, **no** linking exception, and **no** per-file copyright/licence header anywhere in `Source/`
(`grep -rn "Copyright\|GPL\|License" Source/` → zero hits). [STATED]

Engineering implications (I am not a lawyer; this is the practice I recommend, not legal advice):

1. **Copying or mechanically translating this code makes the derivative GPL-3.0** and obliges source
   distribution. A Haxe→TypeScript port of `Polygon.hx` is a translation, i.e. a derivative work.
   That is incompatible with a closed-source or differently-licensed commercial generator.
2. **Algorithms, mathematics and technique are not protected by copyright.** Shoelace area, Lloyd
   relaxation, Bowyer–Watson, half-plane inset, recursive OBB bisection, Park–Miller, Perlin fade —
   all are prior art independent of this repo, most of it decades older.
3. **The safe path** for the original generator: use this repository as *specification by
   observation* — read it to learn **which** techniques produce the look and **what parameter values
   matter**, then implement from independently-sourced standard references (Delaunator / Fortune,
   Clipper2 or a straight-skeleton offsetter, Shewchuk's robust predicates, a modern PRNG). Do not
   have the source file open while writing the corresponding new file, and keep a written record that
   no code was copied.
4. The **live** MFCG/VG/NG are proprietary and *not* covered by this GPL release. The project's
   existing rule — never open `captures/**/network/bodies/*.js` — is the right one and is unaffected
   by the ancestor being GPL.
5. Practical upside: because parameters and constants are facts about behaviour rather than
   expression, the **numeric tables in this document are the most reusable thing in the slice.**

---

## 1. Cross-cutting invariants (read this before any class)

These five facts explain nearly every design decision in the layer. Missing any one of them makes the
code look arbitrary.

### 1.1 Topology is carried by *object identity* of shared `Point` instances [INFERRED — strongly]

There is no half-edge structure, no vertex index, no spatial hash. Adjacency is tested by **reference
equality of `openfl.geom.Point` objects**:

- `Polygon.contains(v)` is `indexOf(v) != -1` — "is this Point object one of my vertices", **not**
  point-in-polygon. (Naming trap; `Model.patchByVertex` depends on exactly this reading.)
- `Polygon.findEdge(a,b)`, `Polygon.borders(other)`, `Voronoi.isReal`, `Region.borders`,
  `Map<Point,Region>`, `Map<Point,Float>` — all identity-keyed.

The mechanism that makes it work: `Patch.fromRegion(r)` builds a patch polygon as
`[for (tr in r.vertices) tr.c]` — the patch's vertices **are the circumcenter `Point` objects of the
Delaunay triangles**. Two adjacent Voronoi regions share the same `Triangle` objects, therefore the
same circumcenter `Point` instances, therefore **adjacent patches literally share vertex objects**.
(`building/Patch.hx:26`.)

Two consequences a re-implementer must not miss:

- **Mutating a shared `Point` moves the boundary in every polygon that shares it, atomically.** This
  is used deliberately: `CurtainWall.hx:109` does `gate.set( shape.smoothVertex( gate ) )` to nudge a
  gate and have every abutting patch follow. `Model.hx:214-216` smooths a street and writes the result
  back with `street[i].set( smoothed[i] )` for the same reason.
- **Any operation that replaces a `Point` object instead of mutating it silently severs topology.**
  `Polygon.inset` does exactly that (`this[i1] = p1.subtract(...)`), as does `smoothVertexEq`, `cut`,
  `buffer` and `shrink` (all produce fresh `Point`s at new positions). Hence the pipeline order:
  topology-sensitive work (walls, streets, adjacency, ward assignment) happens **first** on the shared
  mesh; identity-destroying work (`getCityBlock`, alley cutting, building geometry) happens **last**
  and its output is never queried for adjacency.
- **`new Polygon(vertices)` is a shallow copy** — `vertices.copy()` gives a new *array* holding the
  *same* `Point` objects. `Polygon` is a Haxe `abstract` over `Array<Point>` with `@:forward`, so it is
  a zero-cost wrapper, not a container. (`Polygon.hx:10-17`)
- **`Polygon.set(p)`** (`Polygon.hx:19-21`) is the identity-preserving assignment: it copies
  *coordinates* into the existing `Point` objects (`this[i].set(p[i])`). It iterates `p.length`, so a
  longer `p` overruns — no guard.

> **Rewrite verdict:** this is the single most important architectural decision in the slice, and the
> one I would *not* copy. Shared mutable `Point`s give O(1) "move the shared boundary" at the cost of
> O(n) `indexOf` adjacency queries, aliasing bugs, and un-serialisable state. A modern rewrite should
> use an explicit **half-edge / DCEL or an indexed vertex arena** (vertices in a flat array, polygons
> holding `Int` indices, an edge→faces map), which gives the same atomic-move property *and* O(1)
> adjacency *and* trivial serialisation.

### 1.2 Winding convention: polygons are CCW in math orientation, `square > 0` [INFERRED — verified]

Verified three ways:

- `Polygon.rect(w,h)` yields vertices `(-w/2,-h/2),(w/2,-h/2),(w/2,h/2),(-w/2,h/2)`; hand-evaluating
  the shoelace gives `square = +w·h`. [verified by hand]
- `isConvexVertex` returns `cross(v1-v0, v2-v1) > 0`, and `Ward.getCityBlock` calls `isConvex()` on
  real patches expecting `true` for convex ones — only consistent with CCW-positive.
- Every caller compares `shape.square` against **positive** thresholds (`Ward.hx:148`,
  `Ward.hx:176`, `Ward.hx:186`, `MilitaryWard.hx:13`).
- `Region.sortVertices` produces this order: `compareAngles` returns `sign(x2*y1 - x1*y2)` =
  `-sign(cross(v1,v2))`, so `v1` sorts *before* `v2` when `v2` is counter-clockwise of `v1` →
  ascending CCW. The leading half-plane rules (`x<0` before `x>=0`) make the sweep start at +90° and
  run continuously to +90°+360°. [verified by case analysis]

**`PointExtender.rotate90(p) = (-p.y, p.x)` is therefore the INWARD (left) normal** for these
polygons. That is why `buffer(+d)`, `shrink(+d)`, `peel(+d)` and `Cutter.ring(+t)` all *inset*.
Note the rendering layer uses screen coordinates with **y downward**, so these "CCW" polygons appear
*clockwise* on screen — the `Triangle` constructor's `// CCW` comment refers to the screen reading and
is the opposite sign of `Polygon.square`. Do not conflate the two.

### 1.3 One global PRNG stream drives everything [STATED]

`Random` is an all-static class with a single `seed`. Every stochastic decision in the generator draws
from it in program order. Therefore **any change to the order or count of random draws changes every
map for every seed.** The seed round-trips through the URL (`StateManager`: `?size=<6..40>&seed=<int>`,
`size` clamped to [6,40], `seed` accepted only if `> 0`).

> **Rewrite verdict:** replace with **named, independently-seeded sub-streams** (layout, wards,
> buildings, decoration, naming), each derived from the master seed by hashing. Then adding a feature
> to one subsystem does not re-roll the whole world, and same-seed goldens stay meaningful across
> development. This is the change that most protects a long-lived project.

### 1.4 The global failure strategy is *throw and regenerate the whole town* [STATED]

`Model.new` (`building/Model.hx:70-76`):

```haxe
do try { build(); instance = this; }
catch (e:Error) { trace( e.message ); instance = null; }
while (instance == null);
```

This is the key to reading the whole geometry layer: **the primitives are permitted to be fragile
because the top level retries.** A NaN circumcenter, a `cut()` that finds ≠2 crossings, an `aStar`
that returns `null`, a `CurtainWall` that throws `"Bad walled area shape!"`
(`CurtainWall.hx:104-105`) — all collapse into "discard this town, build another". Because the global
PRNG has already advanced, the retry produces a different layout.

**Failure mode of the failure handling:** the loop is unbounded, and the seed can be pinned from the
URL. A seed that fails deterministically is an **infinite hang with no diagnostic** beyond `trace`.
A rewrite must (a) cap retries, (b) re-seed deterministically per attempt (`seed⊕attempt`) rather than
relying on stream drift, and (c) surface the failure.

### 1.5 Units and the constant table [STATED]

Everything is in abstract "world units" where a **regular street is 1.0 wide**. The full set of
spatial constants visible from this slice's consumers:

| Constant | Value | Source |
|---|---|---|
| `Ward.MAIN_STREET` | 2.0 | `wards/Ward.hx:18` |
| `Ward.REGULAR_STREET` | 1.0 | `wards/Ward.hx:19` |
| `Ward.ALLEY` | 0.6 | `wards/Ward.hx:20` |
| `Brush.NORMAL_STROKE` | 0.300 | `mapping/Brush.hx:8` |
| `Brush.THICK_STROKE` | 1.800 | `mapping/Brush.hx:9` |
| `Brush.THIN_STROKE` | 0.150 | `mapping/Brush.hx:10` |
| `Spline.curvature` | 0.1 | `geom/Spline.hx:11` |
| `Polygon.DELTA` | 1e-6 | `geom/Polygon.hx:13` |
| `Random.g` (multiplier) | 48271.0 | `utils/Random.hx:7` |
| `Random.n` (modulus) | 2147483647 (2³¹−1) | `utils/Random.hx:8` |
| compactness gates | 0.7 (park, ward), 0.75 (citadel) | `Park.hx:9`, `Model.hx:409`, `Model.hx:165` |
| wall smoothing factor | `min(1, 40 / nWalledPatches)` | `CurtainWall.hx:32` |
| street smoothing factor | 3 | `Model.hx:214` |

---

## 2. `com/watabou/geom/` — class by class

### 2.1 `Polygon.hx` (541 lines) — the workhorse

`@:forward abstract Polygon(Array<Point>)`. Zero-cost over an array; all `Array` methods forwarded.
`private static inline var DELTA = 0.000001`.

#### 2.1.1 Measures

| Member | Formula | Notes |
|---|---|---|
| `square` | `0.5·Σ(xᵢ·yᵢ₊₁ − xᵢ₊₁·yᵢ)` over all n edges incl. closing | Standard shoelace **signed** area. Positive for this codebase's CCW convention. O(n). |
| `perimeter` | `Σ‖vᵢ₊₁−vᵢ‖` via `forEdge` (closed) | O(n), n sqrt calls. |
| `compactness` | `4π·square / perimeter²` | **Polsby–Popper / isoperimetric quotient.** Code comments give circle = 1.00, square = 0.79, triangle = 0.60 — exact values π/4 ≈ 0.7854 and π√3/9 ≈ 0.6046. ✓ Used as a *shape gate*, not a metric: Park picks round vs rectangular geometry at ≥ 0.7 (`Park.hx:9`); citadel is rejected below 0.75 (`Model.hx:165`); a ward type is gated at ≥ 0.7 (`Model.hx:409`). |
| `center` | arithmetic mean of vertices | Self-described "Faster approximation of centroid". **Vertex** centroid — biased toward densely-sampled sides. |
| `centroid` | `C = (1/(6A))·Σ(vᵢ+vᵢ₊₁)·cross(vᵢ,vᵢ₊₁)`, with `a = Σcross = 2A`, `s6 = 1/(3a)` | Correct **area** centroid. Diverges (±∞) for A = 0. |
| `distance(p)` | *intended*: min distance from any vertex to p | **BUG — see below.** |

**`distance()` is broken** (`Polygon.hx:155-164`). The loop updates the *witness* `v0` but never
updates the running minimum `d`:

```haxe
var v0 = this[0];
var d = Point.distance( v0, p );
for (i in 1...this.length) {
    var v1 = this[i];
    var d1 = Point.distance( v1, p );
    if (d1 < d) v0 = v1;     // <-- d is never reassigned
}
return d;
```

It always returns the distance from **`this[0]`** to `p`. This is not cosmetic: `distance()` is the
scoring function for ward placement in `Cathedral.hx:22`, `MerchantWard.hx:18`, `Slum.hx:18`,
`AdministrationWard.hx:20-21` and `Market.hx:61`. So ward siting is scored from *an arbitrary vertex
of each patch* (specifically the first circumcenter in the region's angular order, i.e. the vertex
nearest bearing +90° from the seed), not from the nearest vertex. **Fixing this changes every map.**
Record it as a deliberate behavioural pin if the look is being matched; fix it if not — but never
silently. Both `center` and `centroid` exist and are used elsewhere, so the author clearly had working
alternatives; this reads as an unnoticed bug, not a stylistic choice. [INFERRED — high confidence]

#### 2.1.2 Traversal and predicates

- `forEdge(f)` — all n edges including `v(n-1)→v(0)`.
- `forSegment(f)` — n−1 edges, skipping the closing one. **No callers** (open polylines are handled
  as raw arrays instead).
- `contains(v)` — vertex-identity membership (§1.1), *not* containment.
- `isConvexVertex(v)` / `isConvexVertexi(i)` — `cross(v1−v0, v2−v1) > 0`. The `i` variant has no
  callers.
- `isConvex()` — all vertices convex. O(n²) as written, because `isConvexVertex` does two `indexOf`
  lookups per vertex via `prev`/`next`. Called once per patch in `Ward.getCityBlock`.
- `next(a)` / `prev(a)` / `vector(v)` / `vectori(i)` — cyclic neighbour access; the `Point`-keyed
  forms are O(n) (`indexOf`). `vectori` has no external callers but is used internally by `cut`.
- `findEdge(a,b)` → index `i` with `this[i]==a && this[i+1]==b`, else −1. **Directed**. This is the
  primitive for "which side of a shared edge am I on": `CurtainWall.bordersBy` picks `findEdge(v0,v1)`
  or `findEdge(v1,v0)` depending on whether the patch is inside the walls (`CurtainWall.hx:131-139`),
  and `Ward.getCityBlock` uses `plaza.shape.findEdge(v1,v0) != -1` to detect plaza frontage
  (`Ward.hx:45`). Reversed-edge convention = opposite-facing neighbour.
- `borders(another)` — shares an edge in either direction. Carries the author's own honest comment:
  *"If this cause is not true, then should return false, but it doesn't work for some reason"*
  (`Polygon.hx:430-431`). It therefore **keeps scanning** after a shared vertex fails the shared-edge
  test, which makes it tolerant of the degenerate fan cases the Voronoi layer produces.
  `Region.borders` (§2.2) has the same shape but **returns early**, which is the stricter, buggier
  version.
- `getBounds()` — AABB via `openfl.Rectangle`; seeded as a zero-size rect at `this[0]`. Relies on
  OpenFL's `left/right/top/bottom` setters mutating x/width. **No callers.**

#### 2.1.3 Smoothing

- `smoothVertex(v, f=1.0)` / `smoothVertexi(i, f)` → `(prev + f·v + next) / (2 + f)`. A **weighted
  3-tap Laplacian**; `f` is the retention weight of the original vertex. `f=1` is the plain average
  of the three; larger `f` = gentler. Returns a **new** `Point` (caller decides whether to `set()` it
  back in place and preserve identity). The `i` variant has no callers.
- `smoothVertexEq(f=1.0)` → a new polygon with **all** vertices smoothed **simultaneously** (Jacobi,
  not Gauss–Seidel: the rolling `v0/v1/v2` read from the original array). O(n), allocates n `Point`s.

Call sites and their parameters, which are the recipe for the characteristic MFCG silhouette:

| Use | Factor | Pinning | Source |
|---|---|---|---|
| Curtain-wall outline | `min(1, 40/patches.length)` — more walled patches → *smaller* f → *heavier* smoothing | `reserved` vertices (gates, citadel junctions) pinned | `CurtainWall.hx:32-36` |
| Gate vertices, second pass | default 1.0, applied in place via `gate.set(...)` | — | `CurtainWall.hx:107-109` |
| Streets | 3 (gentle) | endpoints pinned — loop is `for (i in 1...street.length-1)` | `Model.hx:213-216` |

The street case is the clean pattern: compute the whole smoothed polyline first, then write
coordinates back into the shared `Point`s, skipping index 0 and n−1 so the gate and the plaza corner
stay exactly where the topology put them.

#### 2.1.4 The three different inset operators — the most important distinction in the slice

The layer offers **three** inward-offset operators with genuinely different contracts. `Ward.getCityBlock`
(`Ward.hx:56-58`) chooses between two of them on a shape predicate, which is the clearest statement of
their trade-off in the whole codebase:

```haxe
return patch.shape.isConvex() ?
    patch.shape.shrink( insetDist ) :   // convex → half-plane intersection
    patch.shape.buffer( insetDist );    // concave → offset + self-intersection repair
```

**(a) `inset(p1, d)` — slide one edge, preserve vertex count.** [STATED, incl. its own caveat]

Self-described: *"It's not very reliable, but it usually works (better for convex vertices than for
concave ones). It doesn't change the number of vertices."*

Maths: with `v0 = p1−p0` (incoming), `v1 = p2−p1` (the edge), `v2 = p3−p2` (outgoing):
`cos = v̂0·v̂1`, `z = cross(v0,v1)`, `t = d / √(1−cos²) = d / |sin θ|` — sliding `p1` back along `v0`
by `t` displaces the *line* of `v1` laterally by `t·sin θ`, so `t = d/sin θ` achieves exactly `d`. ✓
Clamps: convex (`z>0`) → `t ≤ 0.99·|v0|` (don't cross the previous vertex); concave → `t ≤ 0.5·|v1|`.
Then `t *= sign(z)` so concave corners slide the other way. Applies the mirrored computation at `p2`
using `(v1,v2)`.

Failure modes: collinear edges give `cos → ±1`, `t → ∞`, saved only by the clamps; exactly collinear
gives `z = 0` → `t = 0` → no-op. **Replaces `Point` objects** (`this[i1] = …`) → severs identity (§1.1).
`insetAll(d[])` and `insetEq(d)` wrap it; **all three have no callers.** Dead code, but instructive:
it is the naive approach the author abandoned.

**(b) `shrink(d[])` — intersection of inward half-planes. Always produces a convex result.** [STATED]

Self-described: *"It can't outset a polygon. Works very well for convex polygons, not so much
concave ones. It produces a convex polygon. It does change the number of vertices."*

Algorithm: for each edge `(v1,v2)` with `d[i] > 0`, build the inward-offset line
`(v1+n, v2+n)` where `n = rotate90(v2−v1).norm(d[i])` (inward by §1.2), and `q = q.cut(…)[0]` — clip
and keep the left/interior half. O(n) cuts × O(n) per cut = **O(n²)**, allocating a fresh polygon per
edge. `shrinkEq(d)` is the uniform-`d` wrapper.

Because it is a half-plane intersection it is exact and robust for convex input and **silently
convexifies** concave input — which is precisely why `getCityBlock` gates on `isConvex()`.

**(c) `buffer(d[])` — true polygon offsetting via self-intersection repair.** [STATED]

Self-described: *"It's kind of reliable for both convex and concave vertices, but only if all
distances are equal. Otherwise weird 'steps' are created. It does change the number of vertices."*
Four phases:

1. **Raw offset, joints ignored.** For each edge, push `v0+n` and `v1+n` (or `v0`,`v1` unchanged when
   `d[i]==0`). Result `q` has 2n points and is generally **invalid** — adjacent offset edges no longer
   meet. The author's own comment sits exactly here: *"here we may want to do something fancier for
   nicer joints"*. This missing miter/round/bevel join is the source of the "weird steps" warning.
2. **Self-intersection resolution.** Repeatedly scan every non-adjacent edge pair for a *proper*
   crossing (both line parameters strictly within `(DELTA, 1−DELTA)`, DELTA = 1e-6); on the first
   hit, insert **the same `Point` instance twice** — at `j+1` and at `i+1` — then restart the scan
   from `lastEdge`. Adjacency is handled by the bound `for (j in i+2...(i > 0 ? n : n-1))` (when
   `i==0`, the last edge wraps to `q[0]` and is adjacent, so it is excluded). ✓
3. **Component extraction by identity teleport.** Walk the loop; at index `i`, `next = (i+1)%len`,
   `v = q[next]`; if `q.indexOf(v) == next` use `q.lastIndexOf(v)` instead — i.e. **when a vertex
   appears twice (an inserted crossing) jump to its other occurrence**, which splits the
   self-intersecting loop into its simple sub-loops. Each walk collects one component; visited indices
   are removed from `regular`.
4. **Keep the largest.** Return the component with the greatest `square`, discarding inverted lobes
   (negative area) and islands.

Complexity: the scan is O(n²) and restarts on every insertion, so worst case **O(n³)** or worse with
many crossings; fine at MFCG's n ≈ 4–12 per patch. `bufferEq(d)` is the uniform wrapper — **no callers**
(the real call passes a per-edge array).

Numerical weaknesses: crossings at or very near an endpoint are excluded by the DELTA guard and can
leave the polygon self-touching; exactly-parallel edges return `null` from `intersectLines` so
collinear overlaps are never resolved; `lastEdge` is never reset to 0, so a crossing created *before*
the resume point by a later insertion can be missed.

**The per-edge inset distances are where street widths come from** (`Ward.hx:37-54`), and this is the
single most transferable recipe in the slice — *street width is produced by insetting each patch edge
by half the width of whatever runs along it*:

| Edge condition | inset | resulting corridor |
|---|---|---|
| abuts a real curtain-wall segment | `MAIN_STREET/2` = 1.0 | 2.0 clear of the wall |
| abuts the plaza, or lies on an artery (street/road) | `MAIN_STREET/2` = 1.0 | 2.0 main street |
| inside the walls, otherwise | `REGULAR_STREET/2` = 0.5 | 1.0 street |
| outside the walls, otherwise | `ALLEY/2` = 0.3 | 0.6 alley |

Each side insets by half, so two abutting patches jointly open the full width. Elegant and worth
copying wholesale (the idea, not the code).

**(d) `peel(v1, d)` — inset exactly one edge by cutting.** Computes the inward-offset line of edge
`(v1,v2)` and returns `cut(...)[0]`. Self-described: *"It effectively cuts a peel along the edge."*
Its real job is inside `cut(gap)` (below).

#### 2.1.5 Splitting

**`spliti(i1,i2)` / `split(p1,p2)`** — split along the chord between two **existing** vertices; both
halves retain **both** endpoint `Point` objects, so identity/adjacency survives. Used once, to carve a
gate patch out of an outer ward (`CurtainWall.hx:84`). `spliti` has no external callers.

**`cut(p1, p2, gap=0)` — the core subdivision primitive.** [STATED]

- Cuts along the **infinite line** through `p1,p2` (only the *edge* parameter `t.y ∈ [0,1]` is
  constrained; the line parameter `t.x` is free). The endpoints are direction, not extent.
- Requires **exactly 2** crossings. If `count != 2` — including `count > 2` on a concave polygon —
  it returns `[new Polygon(this)]`, a **silent single-element no-op**. Callers must check
  `halves.length == 2` (`Cutter.ring` does, `Cutter.hx:85`).
- Crossing points: `pointₖ = p1 + (p2−p1)·ratioₖ`. Halves are
  `slice(edge1+1, edge2+1)` with `point1` unshifted and `point2` pushed, and the complementary
  `slice(edge2+1) ++ slice(0, edge1+1)` with `point2`, `point1`.
- **`gap > 0` is how streets get their width**: each half is `peel`ed by `gap/2` along its new edge,
  leaving a corridor of exactly `gap` between them.
- **Return order:** `cross(p2−p1, vectori(edge1)) > 0 ? [half1, half2] : [half2, half1]`. I verified
  by hand on a CCW unit square cut left-to-right at y=0.5: `half1` is the **top** half and the sign
  test returns it first. **`cut(...)[0]` is the half to the LEFT of the directed line `p1→p2`.**
  [INFERRED — verified numerically] This is the contract `shrink` and `peel` silently rely on
  (they always take `[0]`, and for a CCW edge direction the interior is on the left). Any rewrite
  must reproduce this or `shrink` inverts.
- Winding is preserved in both halves.

**`simplyfy(n)`** (sic — the typo is in the source) — greedy vertex decimation to exactly `n`
vertices. Per removal it scans all vertices for the minimal
`|aₓ(b_y−c_y) + bₓ(c_y−a_y) + cₓ(a_y−b_y)|` = twice the area of the triangle `(prev, v, next)` — this
is **Visvalingam–Whyatt effective area**, recomputed from scratch each pass (no heap), so
**O((len−n)·len)**. Index bookkeeping verified correct (at `i`, the candidate is `this[i]` with
neighbours `this[i−1]`, `this[i+1]`). In-place. **No callers.**

**`filterShort(threshold)`** — drop vertices closer than `threshold` to the last kept vertex.
**No callers**, and buggy if it were used: the inner loop can exit on `i >= length` while still
pushing an under-threshold vertex, there is no wrap-around check against `result[0]`, and
`this[1]` throws for a polygon of fewer than 2 vertices.

#### 2.1.6 Other

- `interpolate(p)` → **Shepard / inverse-distance weights**, power 1: `wᵢ = (1/‖vᵢ−p‖) / Σ(1/‖vⱼ−p‖)`,
  summing to 1. Used to blend a per-vertex "density" field at a building's centre
  (`Ward.hx:111-115`). Degenerates to NaN if `p` coincides exactly with a vertex — unreachable in
  practice with float coordinates.
- `offset(p)` / `rotate(a)` — in-place translate / rotate-about-origin, both **mutating the shared
  `Point`s** (fine for freshly built building polygons, catastrophic on mesh polygons).
- Factories: `rect(w,h)` (origin-centred, CCW, `square = w·h`); `regular(n=8, r=1)` (angles
  `i/n·2π`, CCW); `circle(r)` = `regular(16, r)` — **16 segments is the circle resolution** for
  market statues and round buildings (`Market.hx:41`). `regular` has no direct external callers.

### 2.2 `Voronoi.hx` (260 lines) — incremental Delaunay + dual extraction

**Problem solved:** produce the irregular, roughly-cellular patch partition that the whole city is
built on, with a controllable "more regular in the centre" gradient.

**`Triangle`** — stores `p1,p2,p3`, circumcentre `c`, circumradius `r`.

- *Orientation normalisation:* `s = Σ(xᵢ₊₁−xᵢ)(yᵢ₊₁+yᵢ)` over the three edges. Expanding and
  cancelling gives `s = Σ(xᵢ₊₁yᵢ − xᵢyᵢ₊₁) = −2·A`. So `s>0` ⟺ negative shoelace area ⟺ clockwise in
  math orientation ⟺ **counter-clockwise on screen (y down)**, which is what the `// CCW` comment
  means. It swaps `p2`/`p3` to normalise. [INFERRED — verified algebraically]
- *Circumcentre:* intersect the perpendicular bisectors of `p1p2` and `p2p3` (midpoints `(x1,y1)`,
  `(x2,y2)`; directions `(p1.y−p2.y, p2.x−p1.x)` and `(p2.y−p3.y, p3.x−p2.x)`), solved as
  `tg1 = dy1/dx1`, `t2 = ((y1−y2) − (x1−x2)·tg1) / (dy2 − dx2·tg1)`, `c = (x2,y2) + t2·(dx2,dy2)`,
  `r = ‖c−p1‖`. I re-derived this and it is algebraically correct.
  **Numerical hole:** `dx1 = p1.y − p2.y`. If `p1` and `p2` share a y-coordinate, `tg1 = ±∞` and
  `t2 = ∞/∞ = NaN` — **a horizontal `p1p2` edge produces a NaN circumcentre**, with no guard. Near-
  horizontal gives catastrophic cancellation. Random float seeds make exact ties improbable, which is
  why it survives; **any grid-aligned or snapped input breaks it.** Collinear points make the
  denominator zero → ∞. A NaN circumcentre propagates into `r`, into every in-circle test, and into
  patch vertices — and is then caught only by §1.4's regenerate-the-town retry.
- `hasEdge(a,b)` — identity-based, **directed**: true only for `(p1,p2)`, `(p2,p3)`, `(p3,p1)` in that
  order. This directedness is what makes cavity-boundary detection work.

**`new Voronoi(minx,miny,maxx,maxy)`** — seeds a **frame**: four corners
`c1(minx,miny), c2(minx,maxy), c3(maxx,miny), c4(maxx,maxy)`, two triangles `(c1,c2,c3)` and
`(c2,c3,c4)` (rectangle split on the `c2–c3` diagonal). `frame` and `points` both start as the four
corners. The frame is the super-structure that keeps the incremental insertion total; its cells are
discarded later.

**`addPoint(p)` — Bowyer–Watson insertion.** [STATED]

1. `toSplit` = every triangle whose circumcircle contains `p`, tested as
   `Point.distance(p, tr.c) < tr.r` — a **sqrt-based, non-robust in-circle predicate** (strictly less,
   so cocircular points are not split).
2. **Cavity boundary:** for each `t1 ∈ toSplit`, each of its three directed edges is a boundary edge
   unless some other `t2 ∈ toSplit` has the **reversed** edge (`t2.hasEdge(t1.p2, t1.p1)` etc.) —
   consistent orientation makes shared internal edges appear in opposite directions. Boundary edges
   are accumulated into parallel arrays `a[]` (starts) and `b[]` (ends). Cost **O(k²)** in cavity size.
3. **Re-triangulate:** starting at index 0, emit `Triangle(p, a[i], b[i])`, then
   `index = a.indexOf(b[index])` — follow the edge that starts where this one ended — until back at 0.
4. Remove the split triangles; mark `_regionsDirty`.

Failure modes, none guarded:

- **`toSplit` empty → the point is silently discarded** (never pushed to `points`). Happens for points
  outside the frame, or when NaN has poisoned the circumcircles. Silent point loss.
- Step 3 assumes the cavity boundary is a **single closed cycle starting at index 0**. If the cavity
  is non-star-shaped or the predicate was numerically inconsistent, `indexOf` returns −1 →
  `a[-1]` is `null` → crash (→ §1.4 retry) or an infinite loop.
- **No duplicate-point check** — an exactly repeated seed yields degenerate triangles and NaN centres.

**`buildRegion(p)` / `regions`** — a region is the list of triangles incident to `p`, angularly sorted;
`buildRegion` **scans all triangles** (O(T)) and the `regions` getter **rebuilds every region**
(O(n·T) ≈ **O(n²)**) whenever `_regionsDirty`, which `addPoint` sets every time. The constructor even
builds regions for the frame with a self-aware comment: *"Maybe we shouldn't do it beause these
temporary regions will be discarded anyway"*.

**`Region.sortVertices` / `compareAngles`** — the classic half-plane-then-cross angular comparator
(quadrant split on `x ≥ 0`, tie-break on `y`, otherwise `sign(x2·y1 − x1·y2)`). Yields a CCW cycle
starting at bearing +90° (§1.2). The commented-out `atan2` one-liner above it shows the author
replaced a trig sort with the cheaper cross-product sort.

**`Region.center()`** — mean of the incident circumcentres = **the centroid of the Voronoi cell's
vertices**, which is the point Lloyd relaxation moves the seed to. Note this is the *vertex* centroid,
not the area centroid: true Lloyd uses the area centroid, so this is a cheaper approximation that
converges to a slightly different (and slightly less uniform) fixed point. [INFERRED]

**`Region.borders(r)`** — **early-returns** on the first shared triangle
(`return vertices[(i+1)%len1] == r.vertices[(j+len2−1)%len2]`), so a shared vertex whose adjacency
happens to be recorded in a different rotational position reports `false` even when the regions do
share an edge. `Polygon.borders` is the corrected sibling (§2.1.2). Reached only via
`getNeighbours`, which has **no callers** (`Model` implements patch adjacency itself using
`Polygon.borders`, `Model.hx:427-428`).

**`isReal(tr)` / `triangulation()` / `partioning()`**

- `isReal` — no vertex of the triangle is a frame corner (identity test).
- `triangulation()` — all real triangles (the Delaunay mesh). **No callers.**
- `partioning()` (sic) — the dual extraction: a region is emitted only if **every** incident triangle
  is real, i.e. all unbounded / frame-touching cells are discarded. Iterates `points`, not the map,
  with the explicit comment *"Iterating over points, not regions, to use points ordering"* — the
  output order is the caller's contract (see below).

**`relax(voronoi, toRelax=null)` — Lloyd relaxation, selective.** [STATED]

Copies `points`, removes the four frame corners, replaces each seed in `toRelax` with its region's
`center()`, and **rebuilds from scratch** via `build()`. `toRelax = null` relaxes everything.
Two consequences: it is **O(n²) per pass**, and **relaxed seeds are appended at the end of the array**,
so the point ordering that `partioning()` deliberately preserves is reshuffled by every relaxation.

**`build(vertices)`** — computes the bbox, expands it by **25 % of the bbox width/height on each side**
(`dx = (maxx−minx)·0.5`, frame at `minx − dx/2`), constructs the frame, and inserts every point.
Sentinel init is asymmetric — `minx = miny = 1e+10` but `maxx = maxy = -1e+9` — a harmless typo unless
coordinates exceed ±1e9. Total **O(n²)**.

#### 2.2.1 How `Model` actually drives it — and a latent bug worth knowing [INFERRED — high confidence]

`Model.buildPatches` (`building/Model.hx:98-121`):

```haxe
var sa = Random.float() * 2 * Math.PI;                       // global rotation
var points = [for (i in 0...nPatches * 8) {                  // 8x oversample
    var a = sa + Math.sqrt( i ) * 5;                         // spiral: angle ∝ √i, step 5 rad
    var r = (i == 0 ? 0 : 10 + i * (2 + Random.float()));    // radius ~linear in i, jittered
    new Point( Math.cos( a ) * r, Math.sin( a ) * r );
}];
var voronoi = Voronoi.build( points );
for (i in 0...3) {                                           // 3 relaxation passes
    var toRelax = [for (j in 0...3) voronoi.points[j]];
    toRelax.push( voronoi.points[nPatches] );
    voronoi = Voronoi.relax( voronoi, toRelax );
}
voronoi.points.sort( function(p1,p2) return MathUtils.sign( p1.length - p2.length ) );
var regions = voronoi.partioning();
```

The seed distribution is a **Vogel/Fermat-style spiral**, not Poisson-disc: angle advances as `5·√i`
radians (compare the golden angle 2.39996 rad of a true phyllotactic spiral), radius grows linearly
in `i` with per-point jitter `2 + U(0,1)`. Angular step `d/di[5√i] = 2.5/√i` shrinks while radius
grows linearly, giving **denser, more regular cells at the centre and sparser ones outward** —
exactly the MFCG look. **8× oversampling** (`nPatches * 8`) exists because `partioning()` discards
every frame-touching cell, so only the inner core survives to become patches.

Then the whole point list is **sorted by distance from the origin**, which is what makes
`partioning()`'s order meaningful: `regions[0]` is the innermost cell → the plaza, and
`regions[nPatches]` → the citadel candidate (`Model.hx:125-133`). Frame corners, being far away, sort
to the end.

**The latent bug:** `Voronoi.build` constructs the frame first, so `voronoi.points[0..3]` are the four
**frame corners**, and only `points[4]` onward are real seeds. The relaxation loop therefore passes
`toRelax = [c1, c2, c3, points[nPatches]]`. But `relax` only relaxes seeds that appear in
`partioning()`, and frame-corner regions are by definition never real — **so three of the four
requested relaxations are no-ops**, and the comment "Relaxing central wards" describes an intent the
code does not achieve. Worse, after each pass the single genuinely-relaxed seed is appended to the end
of the array, so `points[nPatches]` names a *different* seed on each of the three iterations. The
observable effect is a **small, drifting perturbation of a few mid-ring seeds**, not the intended
regularisation of the three central wards.

A re-implementer who writes what the comment *says* (Lloyd-relax the three innermost seeds plus the
citadel seed, three times) will get **noticeably more regular central patches** than MFCG has. That
may well be desirable — but it is a deliberate choice, not a faithful port. Flagging it so it is made
knowingly. [INFERRED — from the constructor's `points = [c1,c2,c3,c4]` plus `relax`'s
`partioning()` filter; high confidence, cheap to confirm by instrumenting a build]

### 2.3 `Graph.hx` (112 lines) — "aStar" that is not A*

`Graph` holds `nodes:Array<Node>`; `Node` holds `links:Map<Node,Float>` with symmetric `link`/`unlink`.

**`aStar(start, goal, exclude)` is mis-named.** There is **no heuristic and no priority queue** —
`openSet.shift()` pops in **insertion order**. Consequences:

- It is a **breadth-first / best-effort search, not A*, and not guaranteed to return a shortest path**:
  the first time `goal` is dequeued its `gScore` may not be minimal.
- `closedSet.push(current)` on pop means a node whose score is improved later is **never reconsidered**,
  so even the Dijkstra property is lost.
- `exclude` pre-seeds the closed set — the mechanism by which `Topology` forbids regions when routing
  roads (`Topology.hx:83`).
- `buildPath` returns the path **reversed** (goal → start), since it pushes while walking `cameFrom`
  backwards. Callers must know this.
- Complexity **O(V²)** — `Array.contains`/`remove` inside the loop.

**`calculatePrice(path)` is broken** (`Graph.hx:68-86`). The cursor advance at the end of the body is
`next = path[i + 1]` using the **pre-increment** `i`, so after the first iteration `current` and
`next` are the *same* node; `current.links.exists(next)` is then false and the function returns `NaN`
for **any path of length ≥ 3**. It should be `next = path[i + 2]`. **No callers** — dead and broken.

> **Rewrite verdict:** replace wholesale with a real binary-heap Dijkstra/A* with an admissible
> Euclidean heuristic and adjacency held in typed arrays. Keep the `exclude` idea (it is how "roads
> avoid this region" is expressed) and keep the reversed-path convention *out* of the new API.

### 2.4 `Spline.hx` (48 lines) — Catmull-Rom tangents, **unused**

`static var curvature = 0.1`. Not an evaluator — a **Bézier control-point generator** for feeding
OpenFL's quadratic `curveTo`:

- `startCurve(p0,p1,p2)`: `tangent = p2−p0`; `control = p1 − tangent·curvature`; → `[control, p1]`.
- `endCurve(p0,p1,p2)`: `control = p1 + tangent·curvature`; → `[control, p2]`.
- `midCurve(p0,p1,p2,p3)`: `p1a = p1 + (p2−p0)·c`, `p2a = p2 − (p3−p1)·c`, `p12 = midpoint(p1a,p2a)`;
  → `[p1a, p12, p2a, p2]` — i.e. **two quadratics approximating one cubic**, split at the midpoint of
  the control polygon (the standard cubic→2×quadratic trick, since Flash/OpenFL `Graphics` has only
  `curveTo`).

This is **Catmull-Rom tangent estimation** (tangent at `pᵢ` ∝ `pᵢ₊₁ − pᵢ₋₁`) with tension **0.1**,
noticeably tighter than the canonical uniform Catmull-Rom 1/6 ≈ 0.167.

The driver `curvePolygon(g, p)` is **commented out and incomplete**, and `Spline` has **zero callers**
in `Source/`. Confirmed by the renderer: `CityMap.drawRoad` uses `g.drawPolyline(road)` — straight
segments — twice, wide-dark then narrow-paper, which is the **street casing** technique
(`mapping/CityMap.hx:81-87`). So in this ancestor **roads are smoothed polylines
(`smoothVertexEq(3)`), never splines.** Curved roads in the modern MFCG are a later addition; this
class is the seed of it. [STATED + SHOWN]

### 2.5 `GeomUtils.hx` (31 lines)

- **`intersectLines(x1,y1,dx1,dy1, x2,y2,dx2,dy2) → Point(t1,t2)`** — parametric line/line
  intersection returning the two **parameters**, not the point. `d = dx1·dy2 − dy1·dx2`; `d == 0` →
  `null` (parallel/collinear). `t2 = (dy1·(x2−x1) − dx1·(y2−y1)) / d`, then `t1` by back-substitution
  choosing the non-zero component: `dx1 != 0 ? (x2−x1+dx2·t2)/dx1 : (y2−y1+dy2·t2)/dy1`.
  Verified numerically against a unit-square cut (§2.1.5).
  Weaknesses: the component choice is an **exact `!= 0` test**, so a tiny-but-nonzero `dx1` is used
  and loses precision (should pick the larger-magnitude component); a degenerate first line
  (`dx1 == dy1 == 0`) divides by zero unguarded; exact parallelism is an exact float compare, so
  near-parallel lines return enormous finite parameters rather than `null`.
- **`distance2line(x1,y1,dx1,dy1, x0,y0)`** — the expanded numerator
  `dx1·y0 − dy1·x0 + (y1+dy1)·x1 − (x1+dx1)·y1` simplifies exactly to
  `dx1·(y0−y1) − dy1·(x0−x1)` = `cross(d, p0−p1)`, so this is the standard **signed** perpendicular
  distance `cross(d, p0−p1)/‖d‖`, positive when `p0` is to the **left** of `d`. It is written in an
  obfuscated expanded form that costs two extra adds and loses a little precision. Used to measure
  building distance from street frontage (`Ward.hx:69` and `Ward.hx:104`).
- `interpolate(p1,p2,ratio=0.5)` — lerp. `scalar` — dot. `cross` — the 2D scalar cross `x1·y2−y1·x2`.

### 2.6 `Segment.hx` (24 lines), `Circle.hx` (13 lines)

Plain value types. `Segment(start,end)` with lazy `dx`, `dy`, `vector`, `length`; used only to collect
street segments for de-duplication (`Model.hx:258-283`). `Circle(x,y,r)` is a bare struct with
**no callers** — the renderer calls `g.drawCircle` directly (`CityMap.hx:103`).

---

## 3. `com/watabou/utils/` — class by class

### 3.1 `Random.hx` (37 lines) — Lehmer / Park–Miller MINSTD

```haxe
private static inline var g = 48271.0;        // multiplier
private static inline var n = 2147483647;     // modulus = 2^31 - 1 (Mersenne prime)
private static var seed = 1;
private static inline function next():Int return (seed = Std.int( (seed * g) % n ));
```

This is the **MINSTD Lehmer generator** `x ← 48271·x mod (2³¹−1)` — the revised Park–Miller constant
(the 1988 original used 16807). Period 2³¹−2; state is a single Int.

The multiply is done in **floating point** (`g` is `48271.0`), so the product reaches ≈1.04e14 — well
inside the 2⁵³ exact-integer range of a double, hence exact and identical across Haxe targets. That is
almost certainly deliberate: in 32-bit integer arithmetic this multiply overflows, and the usual
workaround is Schrage's algorithm. [INFERRED — the alternative explanations are worse]

| Member | Definition | Range / distribution |
|---|---|---|
| `reset(seed=-1)` | `seed != -1 ? seed : Date.now().getTime() % n` | time-seeded by default |
| `getSeed()` | current state | used by `StateManager` for the URL |
| `float()` | `next() / n` | **(0,1)** — Park–Miller never emits 0 or n, so exactly 0 and 1 are unreachable |
| `normal()` | `(float()+float()+float())/3` | **Irwin–Hall n=3, scaled.** Mean 0.5, variance (1/12)/3 = 1/36, σ ≈ 0.1667, support [0,1]. A cheap bell curve, *not* a Gaussian. Consumes **three** draws. |
| `int(min,max)` | `Std.int( min + next()/n·(max−min) )` | `[min, max−1]`; **max is exclusive** |
| `bool(chance=0.5)` | `float() < chance` | |
| `fuzzy(f=1.0)` | `f == 0 ? 0.5 : (1−f)/2 + f·normal()` | **Interpolates between "exactly 0.5" and "full bell"**: support `[(1−f)/2, (1+f)/2]`, always mean 0.5. `f` is a literal *fuzziness* dial. |

`fuzzy` is the idiom worth stealing: one parameter moves a decision continuously from deterministic to
noisy, with the mean pinned. Used as the acceptance test when thinning outskirt buildings
(`Ward.hx:117`: `return Random.fuzzy(1) > minDist`).

**Hazards.** (a) `reset(0)` — or any multiple of `n` — **kills the generator**: state 0 is absorbing
and `float()` returns 0 forever. Guarded only by convention (`Model`: `if (seed > 0)`;
`StateManager`: `seed1 > 0 ? seed1 : -1`), never inside `Random`. (b) State is a single global
(§1.3). (c) MINSTD is a weak generator by modern standards — serial correlation in low bits,
lattice structure in 2-3 dimensions, which for **point placement** is a real (if subtle) artefact risk.

> **Rewrite verdict:** keep the `fuzzy`/`normal` *interface*, replace the engine with PCG32 or
> xoshiro128\*\*, and split into named sub-streams (§1.3). Keep `int(min,max)` exclusive-max but say so
> in the name.

### 3.2 `ArrayExtender.hx` (148 lines) — static extension, `using`-imported everywhere

**`shuffle(a)`** — builds a new array, inserting each element at
`Std.int(Random.float() · (result.length+1))`. Inserting the (k+1)-th element into one of k+1 equally
likely positions is a **correct uniform shuffle** (the insertion form of Fisher–Yates), but it is
**O(n²)** because of array insertion. ✓ correct, ✗ slow.

**`random(a)`** → `a[Std.int(Random.float()·a.length)]` — uniform; returns `null` for an empty array.

**`weighted(a, weights)`** → linear-scan roulette: `z = float()·Σw`, return the first `i` with
`z <= Σ_{0..i} w`. O(n), one draw. Zero-weight entries are correctly unreachable (since `float() > 0`).
Falls back to `a[0]`.

**`min(a,f)` / `max(a,f)`** — argmin/argmax by projection, returning the **element**. Heavily used
(`Model.hx:127` for the central vertex, `Cutter.hx:48` for the vertex nearest the centroid,
`Ward.hx:160` for the longest edge via `-vector(v).length`).

Set-ish helpers, all **O(n·m) via `indexOf`**: `contains`, `add` (push-if-absent), `clean` (dedupe,
first-occurrence order), `intersect`, `union`, `difference`, `removeAll`, `flatten`, `uflatten`.
Plus `isEmpty`, `last`, `every`, `some`, `count`, `map`, `replace`.

Two defects:

- **`equals(a,b)` is wrong** — it checks only equal length plus "every element of `a` occurs somewhere
  in `b`". `[1,1,2]` vs `[1,2,2]` compares **equal**. It is a sloppy set-comparison wearing a sequence
  name. **No callers.**
- **`replace(a, el, newEls)`** does not guard `indexOf == -1`; on a miss it writes `a[-1]`.

### 3.3 `MathUtils.hx` (15 lines)

`gate(v,min,max)` = `v < min ? min : (v < max ? v : max)` — clamp. `gatei` is the Int twin.
`sign(v)` = `v == 0 ? 0 : (v < 0 ? -1 : 1)`.

**NaN behaviour, unguarded and load-bearing:** every comparison against NaN is false, so
`gate(NaN,…)` returns **max** and `sign(NaN)` returns **+1**. Since `sign` is the comparator body for
`Model`'s radial point sort (`Model.hx:114-115`) and for `Region.compareAngles`, a NaN coordinate from
a degenerate circumcentre (§2.2) does not raise — it silently corrupts the ordering. A rewrite should
assert on non-finite coordinates at the mesh boundary.

### 3.4 `PointExtender.hx` (42 lines)

`set` (in-place copy — the identity-preserving write of §1.1), `scale`, `norm(length=1)`
(clone-then-`normalize`), `addEq`/`subEq`/`scaleEq` (in-place), `atan` = `atan2(y,x)`,
`dot`, **`rotate90(p) = (-p.y, p.x)`** (the inward normal, §1.2).

`norm` inherits OpenFL's `Point.normalize` semantics: **a negative length flips the direction**, which
`Polygon.inset` relies on (`t *= sign(z)` then `v0.norm(t)`); a zero-length input yields NaN.

### 3.5 `FloatExtender.hx`, `NullUtils.hx`

Null-coalescing shims for Haxe's static/dynamic target split. `FloatExtender.nullValue` is a no-op
outside Neko. `NullUtils` has `float/int/bool/string/array/orEmpty` defaults. `NullUtils.array` uses
`Std.is`, deprecated in modern Haxe (`Std.isOfType`). Pure portability scaffolding — a rewrite in a
single-target language deletes all of it.

### 3.6 `Observable.hx` (47 lines)

`Observable<T>` = value + `msignal.Signal1` fired on set. `ObservableInt` adds `[min,max]` clamping via
`MathUtils.gatei` and a `Signal2<Int,Int>` carrying **(newValue, delta)**. Note the ordering quirk:
`changed2` is dispatched **before** `super.set_value` updates `_value` and fires `changed`, so a
`changed2` listener that reads `.value` sees the **old** value. Drives the city-size UI.

### 3.7 `PerlinNoise.hx` (174 lines) — classic Perlin, several defects, **no callers**

Uses **Ken Perlin's canonical 256-entry permutation table** verbatim.

- **Seeding is a rotation, not a shuffle:** `p = [for (i in 0...256) permutation[(i + seed) % 256]]`,
  then `p = p.concat(p)` (512 entries). So there are only **256 distinct noise fields**, and they are
  cyclic shifts of one another — **strongly correlated across seeds**. A rewrite must shuffle the
  table with the PRNG (Fisher–Yates) instead.
- **No coordinate masking.** The reference implementation does `p[p[X & 255] + (Y & 255)]`; here
  `j0 = Std.int(x)` and `i0 = Std.int(y)` are used raw. Since `p[j0] ∈ [0,255]` and the table has 512
  entries, this only stays in range for `0 ≤ x,y < 256`. **Negative coordinates additionally break the
  fade lookup** — `Std.int` truncates toward zero, so `x ∈ (−1,0)` gives `fx < 0` and
  `ease[Std.int(fx·256)]` indexes negatively → `null` → NaN. **Valid domain is roughly `[0,255]²`,
  non-negative only.**
- **The fade is a 256-entry lookup table**, built once (static) as
  `t³(t(6t−15)+10)` = the standard quintic `6t⁵−15t⁴+10t³`. Quantising the fade to 1/256 causes
  visible banding at high magnification; on any modern target, computing the polynomial is cheaper
  than the cache miss.
- **Gradients: `hash & 3` → only 4 diagonal gradients** `(±1,±1)`, unnormalised (length √2). A common
  2D simplification; output range ≈ ±1 rather than the ±0.707 of normalised Perlin.
- **`noise(x,y,gridSize)` silently ignores `gridSize`** — the parameter never appears in the body.
- **`noiseHigh` is broken and the author says so**: the inline comment reads
  `// INCORRECT! x & y should be updated as well`. It calls `noise(x, y, gridSize *= 2)` without
  rescaling the coordinates and — because `noise` ignores `gridSize` anyway — **every octave returns
  the identical value**, so `noiseHigh = noise(x,y)·Σpersistanceᵏ`. It also `trace()`s on every
  iteration. Unusable.
- **`noiseMap(w,h,gridSize)` is the working path**: it walks the domain in steps `gridSize/width`,
  `gridSize/height`, inlining the same lerp. `noiseMapHigh` therefore *is* a correct fBm —
  `Σ noiseMap(gridSize·2ᵏ)·persistanceᵏ` — though unnormalised (amplitudes sum > 1) and it recomputes
  the whole map per octave. The scalar `noiseHigh` path is dead inside a commented-out block.
- **Zero callers anywhere in `Source/`.** Combined with the README's "lacks … waterbodies", this is
  strong evidence that **terrain/water noise postdates this snapshot.** [STATED + INFERRED]

> **Rewrite verdict:** discard. Use simplex/OpenSimplex2 or a properly seeded Perlin with masked
> indices, normalised gradients, computed fade, and correctly scaled octaves.

### 3.8 `MarkovChain.hx` (68 lines) — misfiled, unfinished, **no callers**

**Its `package` declaration is `com.watabou.mythology` while the file sits in `utils/`** — a mismatch
that standard Haxe rejects, so this file is almost certainly **imported from another watabou project
and never wired up** (the name generator of his mythology/naming tools). [INFERRED — high confidence]

Order-1 Markov chain over `T`: `addSample` records transitions including a `null → first` opening and
a `last → null` terminator; `FollowUp` keeps parallel `states`/`weights` arrays incremented per
observation and samples via `ArrayExtender.weighted`. `generate()` walks from `null` until
`isTerminal(state)`.

**As shipped, `generate()` never terminates**: `isTerminal` defaults to
`function(state) return false;`, while the only real terminator in the table is `null`. The default
should be `state == null`. Dead code, but the structure is exactly the letter-level name generator
watabou uses elsewhere.

### 3.9 Engine plumbing (minimal geometric content)

- **`Updater.hx`** (148 lines) — a static tick bus (`msignal.Signal1<Float>` carrying delta seconds)
  with three interchangeable sources: `Timer`, `ENTER_FRAME`, or `lime.ui.Window.onRender`, plus a
  global `timeScale` and a `wait(time, callback)` helper that self-removes. First tick dispatches 0.
- **`ObjectPool<T:Constructible>`** — `@:generic` free-list (`get`/`recycle`/`clear`). **No callers.**
- **`PixelCache`** and **`BitmapUtils.getColor`** — *two independent implementations of the same
  thing*: a `Map<colour, 1×1 BitmapData>` cache. Duplicated, and only one is needed.
  `BitmapUtils.create(id)` wraps an asset with `PixelSnapping.ALWAYS`, no smoothing — the crisp-pixel
  bitmap-font setup.
- **`Stopwatch`** — `Lib.getTimer()` millisecond timing (`start`/`lap`/`next`/`measure(fn)`).
  **No callers** — the profiling harness was removed.
- **`GraphicsExtender`** — `drawPolygon(g,p)` (moves to the **last** vertex first, then lines through
  all, closing the loop implicitly), `drawPolyline(g,p)` (open), `moveToPoint`, `lineToPoint`. The
  closed/open distinction is the entire renderer-side geometry vocabulary.
- **`DisplayObjectExtender`** — `centerX/centerY/center/right/bottom` set `x = -width/2` etc., i.e.
  **anchor-point emulation** by offsetting the child; plus `onActivate` folding
  ADDED/REMOVED_FROM_STAGE into one `Bool->Void`.
- **`StringUtils`** — `capitalize`, `enumerate` ("a, b and c"), `plural` (`-man → -men`, `-s → -ses`,
  else `+s`). **`genitive` is buggy**: `s.charAt(s.length-1) == s` compares a character to the whole
  string, true only for 1-character strings, so "Jones" → "Jones's" instead of "Jones'". Intent was
  `== "s"`. **No callers.**

### 3.10 `coogee/` skim (geometry only)

`Atlas`, `BitmapText`, `Game`, `MovieClip`, `NinePatch`, `Scene` — 646 lines of a tiny
`openfl.display.Tilemap` sprite framework. The only geometry is `openfl.geom.Rectangle` arithmetic for
tileset sub-regions (`Atlas.sub`, `Atlas` grid slicing, `MovieClip` frame rects) and `NinePatch`'s
nine-rect decomposition around a centre rect. `BitmapText` scans a bitmap font image for glyph
separators to build a `Map<String, Rectangle>`. **Nothing algorithmic, nothing reusable for map
generation.** Confirmed no `Polygon`/`Voronoi`/`Point`-maths usage beyond layout.

---

## 4. Complexity and robustness summary

| Operation | Complexity | Dominant risk |
|---|---|---|
| `Voronoi.addPoint` | O(T) circumcircle scan + O(k²) cavity | NaN circumcentre on horizontal `p1p2`; silent point drop when cavity empty; `a[-1]` crash on broken cavity |
| `Voronoi.build` (n points) | **O(n²)** | as above, ×n |
| `Voronoi.relax` (1 pass) | **O(n²)** — full rebuild | reshuffles point order that `partioning()` contractually preserves |
| `regions` getter | **O(n²)** | rebuilt on every access after any insert |
| `partioning` | O(n·k) | — |
| `Polygon.borders` / `findEdge` / `next` / `prev` | O(n) per call (`indexOf`) | identity-only; a copied `Point` silently breaks adjacency |
| `Polygon.isConvex` | O(n²) | — |
| `Polygon.buffer` | O(n²) per crossing, restarts → up to O(n³) | DELTA-window misses endpoint-touching crossings; parallel edges never resolved |
| `Polygon.shrink` | O(n²) | silently convexifies concave input |
| `Polygon.cut` | O(n) | returns 1 polygon on ≠2 crossings — **silent no-op** |
| `Polygon.simplyfy` | O((len−n)·len) | unused |
| `Graph.aStar` | O(V²) | not A*, not shortest-path, path returned reversed |
| `ArrayExtender.shuffle` | O(n²) | correct distribution |
| set helpers | O(n·m) | — |

**Numerical-robustness weaknesses, ranked by how much they would bite a rewrite:**

1. Circumcentre via `dy1/dx1` — NaN on horizontal edges, catastrophic cancellation near-horizontal.
2. In-circle test by `distance < r` (sqrt), not an exact/adaptive determinant.
3. Exact `== 0` / `!= 0` float tests for parallelism and component selection in `intersectLines`.
4. Identity-based topology: no tolerance-based vertex merging anywhere, so two coincident-but-distinct
   `Point`s are invisible to every adjacency query.
5. `MathUtils.sign`/`gate` swallow NaN instead of raising, so corruption propagates silently into
   sort orders.
6. `buffer`'s DELTA = 1e-6 is a **parameter-space** tolerance, so its effective world-space tolerance
   scales with edge length — inconsistent across a map that spans ~10 to ~1000 units.

---

## 5. What a modern rewrite should replace, and with what

| Replace | With | Why |
|---|---|---|
| Shared mutable `Point` topology (§1.1) | Half-edge/DCEL or indexed vertex arena | same atomic shared-boundary moves, O(1) adjacency, serialisable, no aliasing bugs |
| `Voronoi` (own Bowyer–Watson, O(n²)) | Delaunator / Fortune + robust predicates (Shewchuk) | O(n log n), exact predicates, no NaN circumcentres, handles duplicates |
| `Region.center()` Lloyd step | area-centroid Lloyd, or weighted/capacity-constrained CVT | true Lloyd converges more uniformly; keep the *selective* relaxation idea — it is what makes the centre regular and the edge organic |
| `buffer` (self-intersection repair) | Clipper2 offsetting, or a straight-skeleton offsetter | correct joins (miter/round/bevel), handles non-uniform offsets, no "weird steps" |
| `shrink` | keep — it is the right tool for convex blocks | half-plane intersection is exact and cheap; just keep the convexity precondition explicit |
| `inset`, `insetAll`, `insetEq` | delete | unused, unreliable, severs identity |
| `Graph.aStar` | binary-heap Dijkstra/A* with Euclidean heuristic | correctness; keep the `exclude` set |
| `Graph.calculatePrice` | delete (broken) | — |
| `PerlinNoise` | OpenSimplex2 / properly seeded Perlin | seeding-by-rotation, unmasked indices, ignored `gridSize`, broken octaves |
| `Random` (MINSTD global) | PCG32 / xoshiro128\*\*, split into named sub-streams | stronger statistics; stops feature work from re-rolling every seed |
| `ArrayExtender` set ops | `Set`/`Map` | O(n·m) → O(n) |
| `MarkovChain` | keep the *design*, fix `isTerminal` default | order-1 chain with null sentinels is the right shape for name generation |
| `Spline` | a real Catmull-Rom→cubic-Bézier converter with centripetal parameterisation | the 0.1 tension and the cubic→2×quadratic split are Flash-era workarounds |
| retry-forever on exception (§1.4) | bounded retries, deterministic per-attempt re-seed, surfaced failure | a pinned bad seed currently hangs forever |
| `FloatExtender`, `NullUtils`, `PixelCache`/`BitmapUtils` duplication, `coogee` | delete | Haxe-target and Flash-era scaffolding |

**Keep these ideas outright** (they are the cheap, high-yield ones): `compactness` as a *shape gate*
with the 0.7/0.75 thresholds; `Random.fuzzy(f)` as a single fuzziness dial; **per-edge inset by half
the adjoining street's width** as the mechanism that produces streets; `cut(gap)` + `peel` for
corridor-carving; pinned-vertex Laplacian smoothing with `f = min(1, 40/n)`; the **√i-angle,
linear-radius spiral with 8× oversampling** as a seed distribution that is denser and more regular in
the centre; and the two-pass wide-dark/narrow-paper polyline casing for roads.

---

## 6. Open questions a re-implementer must decide

1. **`Polygon.distance()`'s bug (§2.1.1) — pin or fix?** It silently changes ward siting. Fixing it
   moves cathedrals, markets, slums and administration wards on every seed. Decide deliberately and
   record it.
2. **The relaxation bug (§2.2.1) — reproduce or implement the comment?** Doing what the comment says
   yields visibly more regular central patches. Which is wanted?
3. **`cut()[0]` = left half** — I verified this on one hand-worked case. A rewrite should assert it
   with a property test (cut a known CCW polygon along a known direction) before `shrink` depends on it.
4. **What the 8× oversampling factor is really tuned to.** `nPatches*8` interacts with the 25 % frame
   margin and `partioning()`'s discard rule. The surviving-cell count is not obviously `nPatches`;
   only instrumentation of a real build will say.
5. **Is the `5·√i` angular step tuned, or arbitrary?** 5 rad is not the golden angle; whether the
   resulting near-resonances are a deliberate part of the look is not recoverable from the source.
6. **`Array.sort` stability** — `MathUtils.sign(p1.length − p2.length)` returns 0 for ties, so the
   radial ordering of equidistant seeds depends on the target's sort stability. Irrelevant for floats
   in practice; relevant if a rewrite snaps coordinates.
7. **Whether the modern MFCG still uses this Voronoi core at all.** The CPU-profile and draw-call
   recordings in `captures/`/`profiler/` are the only evidence; this slice cannot say.
8. **Intended `buffer` joint style.** The author flagged "something fancier for nicer joints" but never
   chose; a rewrite picking miter vs round will visibly change block corners.
9. **How water/terrain was meant to consume `PerlinNoise`.** The class is present, broken and unused;
   nothing here reveals the intended domain scaling, octave count, or thresholding.

## Critic-2 addendum (OS seat, 2026-09-25)

Second critic pass (`research/findings/_critic-os.md`), every line below checked at the cited source line. Nothing
above is edited; these entries supersede the specific sentences they name.

1. **§1.4 and §2.2 overstate what the retry loop catches.** `Polygon.cut` with ≠ 2 crossings does *not* fail the
   town — it returns `[new Polygon(this)]` (`Polygon.hx:513-514`) and the caller continues on the same polygon; a
   road search returning `null` is silently dropped (`Model.hx:244-245`); a broken Bowyer–Watson cavity (`a[-1]`) or
   a NaN coordinate raises a native error, not an `openfl.errors.Error`, and `Model.hx:82` is `catch (e:Error)`. The
   only paths into "discard and rebuild" are the four throws at `CurtainWall.hx:57-58, 103-104` and
   `Model.hx:165-166, 247-248` (`os-model.md` §11 has this right). Target caveat (PLAUSIBLE, not compiled here): on
   the Flash target `TypeError` extends `flash.errors.Error`, so null dereferences *would* be caught there; on the
   HTML5/desktop targets of this snapshot they escape.
2. **§2.1.3 smoothing table, "reserved vertices (gates, citadel junctions) pinned" — gates are not pinned.**
   `reserved` is `citadel.shape.copy()` (`Model.hx:148`), i.e. the citadel's vertices only. The wall smoothing at
   `CurtainWall.hx:31-36` runs *before* `buildGates` (`:41`), so no gate exists yet; the gates are chosen afterwards
   and are then smoothed a **second** time at `:107-109`.
3. **§2.4 and §5, "wide-dark then narrow-paper" road casing — the casing is `palette.medium`, not dark**
   (`CityMap.hx:82`: `lineStyle(MAIN_STREET + NORMAL_STROKE, palette.medium, …)`). Widths 2.3 / 1.7 are right.
4. **§3.6 "Drives the city-size UI" — `ObservableInt` has no callers.** `grep -rn Observable Source/` hits only
   `utils/Observable.hx`; the size UI is `ui/CitySizeButton.hx` + `StateManager.hx`. Dead code, like `ObjectPool`.
5. **§2.2.1 relaxation off-by-four — confirmed by re-derivation**, with the exact indices: `Voronoi.build` puts the
   four frame corners first (`Voronoi.hx:27-28`) and appends real seeds (`:50`); `relax` removes a relaxed seed and
   pushes its centre to the *end* (`:139-149`); so pass k (k = 0,1,2) of `Model.hx:110-112` relaxes original spiral
   index `nPatches − 4 + k`, once. The three central cells are never relaxed (`os-model.md` §3.3 states the same).
6. **§2.3 `aStar` — one determinism hazard missing from every findings file:** the neighbour loop is
   `for (neighbour in current.links.keys())` over a `Map<Node,Float>` (`Graph.hx:41, 90`). Because the open set is
   FIFO, the order in which neighbours are pushed decides ties between equal-hop routes, and that order is the
   runtime's `ObjectMap` key order (creation order of the node ids on Haxe/JS, unspecified on Flash). A port that
   wants seed-exact 2017 streets must reproduce this order, not just the algorithm.
7. §2.1.4 inset table: the plaza-frontage row applies to inner patches only (`innerPatch && …`, `Ward.hx:45`);
   `os-wards-render.md` §3.3 has the complete condition.
