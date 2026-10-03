### 3.4 The template machine — four NG templates and seven context templates

A template is **seed geometry plus the bent cut on everything else** (NG's own structure, CA-2): its row lists seed
primitives, which S8 lays in the district's template face before §4.6's recursion runs on every face of the district
(§4.6's strategy slot, item 298). No template has a subdivision algorithm of its own.

#### 3.4.1 The template face

D's **template face** is its largest L1 face by area among those that are neither a wall strip, a reservation, an
intramural garden (the spare ground item 106 (b)'s reach encloses, which S12b types as gardens and which is never built
land) nor part of another district, ties by face order (§3.3's canonical order) — S8 reads it on the committed faces,
after S7b (3)'s claims (S7c read the pre-claim face, V01 §3.3.2). The other faces of D take the bent cut alone. Holes in
the template face (S7b's claims, a landing's claim — a sky landing's on an island, a ground landing yard, V05 §3.10 (4)
—, a locked plot's face kept by §7.2's protection in a re-derivation, a fixed input of V01 §3.5.12, and every raised
part's under-deck strip, V01 §3.17.3) stay holes: every seed avoids them (V01 §3.4.2 (d)) — a strip crossed only through
an `open` span (V01 §3.17.3 (3)) — and §4.6's holed laws cut the faces that contain them. An under-deck strip that
crosses a face from boundary to boundary cuts it, and the template face is the largest piece, its area measured without
the strip. A held retaining wall is a line, not a hole (V01 §3.17.2). A committed face that no longer qualifies (every
face a hole, a strip or a zero-area piece) leaves D without a template face: the seeds lay nothing and F-TEMPLATE's
chain ends at `bent-cut` (V01 §3.13).

#### 3.4.2 What every seed primitive shares

**(a) Portals and anchors.** A portal is **usable** when its vertex lies on a chain bounding the template face and its
class is `lane` or above. Its **rank**: `through` 5, `primary` 4, `secondary` and `quay` 3, `lane` 2, others 1; a gate
portal + 2; a bridge portal + 1 — gates and bridges read on part 0 by V01 §2.3's parts table: a part-0 gate (never an
aqueduct's wall arch or a raised gate, V01 §3.17.3 (6)) and a part-0 deck over water; a raised road's ramp or stair end
is an ordinary junction ranked by its carried class, and an aqueduct end is never a portal. **A landing's attach
vertex** — a sky island's (V01 §3.10.3) or a ground landing's S8 destination (§4.6: a `landing` reservation's attach
that no way meets when S8 starts) — ranks as a gate portal (+ 2 on `lane`) and must be reached by a seed or a lane; **on
the ground its destination lane** (§4.6's first cut, from the attach to the nearest way by the lane rule) **is laid before
the seeds**, first in D's S8 transaction, so no seed can pre-empt it, and the seeds then treat it as any spine
(V01 §3.4.2 (c)). Anchors resolve to points: `portal:best` — the pair (a, b) maximising
`(rank_a + rank_b) × min(1, |ab| ÷ (anchor.spanShare × faceObb.majorM))`, ties by portal id; `pair:1`, `pair:2` — the two
usable portal pairs whose chords cross inside the template face at ≥ `elig.crossAngleDeg`, maximising the two pairs'
summed ranks, `pair:1` the higher-ranked, ties by portal ids (the crossroads row's two cross spines); `portal:gate` /
`portal:bridge` — the highest-ranked gate / bridge portal; `axis` — the template face's OBB major axis's two ends projected
onto its boundary (virtual anchors; used when fewer usable portals exist than a spine needs, and in a standalone unit run,
which has none).

**(b) The template street width** `w_tpl`, one per district, drawn once on `hood.template` (creation index 0):
`w_tpl = lerp(tpl.widthLow × top, top, u)` with `top` the upper end of the `secondary` class's width band (§4.6 step 9's
class table), so every draw lands inside the band and none is pinned to its top. It is the row's `streetWidthM`
parameter: the draw is its default, the `secondary` band its range, so T8's "more" edits it like any fabric parameter.
Every seed way (spine, ring course, through street, `secondary` fan) takes `w_tpl` and class `secondary`; a `path` fan
(the `park` row) takes the `path` class's width; NG 1.2.2 likewise gives its template streets one per-map width (II.2,
COV-NG-N20), ours in metres. Lanes the bent cut adds keep §4.6 step 9's law.

**(c) Insertion.** Seeds are inserted in the district's S8 transaction (callback form, L1, §4.1) in row order, each by
`insertChain` of its course clipped to the template face's kerb (§3.7's single kerb function); each end that meets a
spine becomes a T-junction by `splitThrough` (§4.6 step 7) — on a district-boundary spine a `baseLane` portal with its
`SeamAmendment` and the portal-gap slide (§4.6 step 7, II.1 (3)); an end at a hard seam or at a unit's border stops on
the setback or margin line, square to it, as a lane ends at a reservation. A later seed may end on an earlier one.

**(d) Validation**, per seed, on the overlay before its commit: every segment ≥ `minEdge`; every interior turn ≤ 60°;
clearance from the face boundary ≥ `eLo / 2` except within `eLo` of its ends; no crossing of another seed except at a
row's declared crossing or a plaza ring; no contact with a hole (§3.6's contact rule, `attractCm`) except a strip crossed
through an `open` span by V01 §3.17.3 (3); no run within `eLo / 2` of a held retaining wall along more than `eLo` of its
length (a crossing at ≥ 45° is allowed and takes a stair or ramp interval, V01 §3.17.2); every face the seed creates ≥
the band's minimum block width (§4.6 step 8's child test). A failure is F-TEMPLATE's (V01 §3.13); a degenerate course
(zero length after the clip, self-touching, collinear with the kerb) is one such failure, refused by the kernel (§3.1)
before the check.

**(e) The rest.** After the seeds, §4.6 runs on every face of D exactly as on a bent-cut district: stop test, position,
start, corner, far side, flatten, fillet, ends, ladder, width, continuation, recursion; a face with holes by the holed
laws; the deep-interior rule on the resulting blocks. The seeds are spines like any: the bent cut's lanes end on them as
T-junctions, so plots front the seed streets (NG's "plots directly on the main street").

**(f) Draws.** Every seed draw is on `hood.template` keyed by the template face's cell with the seed's creation index
(V01 §2.8) — except the ring courses, which §6.1 already puts on `cut.arc` (II.2) — so each seed has its own sub-stream
and a turned or redrawn seed disturbs no other.

#### 3.4.3 The spine primitive

* **Main and cross spines** (`from`, `to` anchors). The chord A→B; one control point at the chord's midpoint displaced
  perpendicular by `δ = (m3 − ½) × 2 × tpl.courseDelta × |AB|` (`m3` the mean of three uniforms, §6.1's `mean3`); the
  polyline A–c–B resampled into `n = tpl.segMin + ⌊(tpl.segSpan + 1) × u⌋` equal segments (3–7 at the defaults), each
  interior point displaced perpendicular by `(m3 − ½) × ½ ×` the segment length; then, with probability `(n − 1) ÷ n`,
  `4 − ⌊n/2⌋` corner-cutting passes (¼ and ¾ of each edge) — the course shape of NG 1.2.2's main street (provenance
  `ref:NG 1.2.2 main street course (code)`; `code-neighbourhood.md` §2.1), in metres. Each end's last leg is re-aimed to
  arrive at the crossed spine's run within `tpl.arrivalDeg` (a final leg of length ≥ `eLo / 2`, square to the run's
  chord, §4.6's *Sides*) — ours: NG's street ends at its outline, ours at a street, which the T-junction signature needs.
  A cross spine takes `|δ| ≤ tpl.crossDelta × |AB|` (the crossroads read as through-routes). A chord shorter than
  `2 × eHi` lays no spine (the face is below the spine law, V01 §3.3.2) and the row bends by F-TEMPLATE.
* **Parallel spines** (`to: { parallel, offset }`). The longest contiguous run of D's boundary of that seam type (water:
  `water`; wall: `wall`) on the template face; the run's chain offset inward by `onEdge` = the water's unbuildable band
  (§4.2 S1 (8)'s shore setback, or the wall strip's inner setback line) + `w_tpl / 2`, or `plotRow` = that band + `dBar`
  + `w_tpl / 2` (one plot row between the seam and the street, the plots backing onto the water or the wall); clipped to
  the face; its longest piece kept if ≥ `2 × eHi`; one corner-cutting pass. Each end continues by a square leg to the
  nearest way on the face boundary within `2 × eHi` (a T-junction), else stops at the setback line (a reported dead
  end).
* **Contour series** (`parallel: 'contour'`, `series: true`; the `stepped` row; J-V1.60). Level lines of the
  **unlevelled** terrain (marching squares on `Terrain`'s field over the face's box) at `z_k = z_pole + k × Δz`, `z_pole`
  the terrain at the template face's pole of inaccessibility, `Δz = s × slope.meanPct ÷ 100` and `s` the row's
  `terraceSpacingM` (V01 §3.4.7; T8's "more"). Level k's street is its longest component inside the face inset by `eLo`
  (holes excluded), simplified (§3.4 `simplify` at `eLo / 4`), one corner-cutting pass, each end continued to the face
  boundary by a square leg as a parallel spine's is; it is kept when ≥ `2 × eHi`. The series grows outward from k = 0 in
  the order 0, +1, −1, +2, −2, … until a level leaves the face or |k| reaches `terrace.maxLevels` (reported when
  reached); a level that would come within `terrace.minGapShare × s` of the street laid before it on its side (the slope
  steepens) is clipped there, so no block falls below the band's minimum width (V01 §3.4.2 (d)). Level 0 must lay, else
  F-TEMPLATE: rung 1 has nothing to redraw (the series draws nothing), rung 2 offsets level 0 by ± `eLo / 2` along the
  fall (+ first), rung 3 the row's fallback. On flat ground (`slope.meanPct` 0, so `Δz` 0) every level coincides with
  level 0: level 0 alone is laid, as a contour spine without `series`. Each street is a `secondary` way at `w_tpl`
  carrying its `terraceIndex`, its rank from the lowest level laid, 0 (V01 §3.7.2). Without `series` a contour spine is
  level 0 alone. The bent cut then runs on the bands between the streets: its slope term (§4.6 step 1) runs the cross
  lanes down the fall line, V01 §3.6 (3) steps them where steep, and each crossing of a retaining wall is a stair or a
  ramp (V01 §3.17.1 (5)). Creation indices (V01 §2.8): level k of flank f takes the seed's ordinal × 64 + f × 32 + (k +
  16).
* **A ravine's two flanks** (J-V1.64). When the level line at `z_pole` has two or more components each ≥ `2 × eHi`
  inside the inset face, S8 first lays a `path`-class seed of role `thalweg` (creation index the seed's ordinal × 64)
  along the **valley line** — the flow line of greatest accumulation inside the face, from S1's drainage (§4.2 S1),
  clipped to the face, each end continued to the boundary — stair-stepped by V01 §3.6 (3) where steep. The face is split
  along it (`splitThrough`), and each flank face (f = 0 the one holding the template face's pole, f = 1 the other) takes
  its own series, `z_pole` read at its own pole of inaccessibility; a flank below the `spine` law's size (V01 §3.3.2)
  takes none (the bent cut alone). The bent cut's lanes join the thalweg path to each flank's streets, ending on it as on
  any spine. With a **stream** in the ravine the water is a seam, so each flank is its own district, terraced on its own
  by this rule, and no ward-edge wall stands on the water run (hard; item 302). A **generated viaduct** across the
  ravine (item 110 (b), CITY and METROPOLIS) is V01 §3.17.3's strip in each flank face: the thalweg path passes under an
  `open` span, and each level keeps its longest piece beside the strip, as every level keeps its longest component.

#### 3.4.4 The ring primitive (item 58 (a); the courses are II.2's)

II.2 states the ring courses (hexagons sharing one phase, the radial bell of `ringJitter` × the spacing, three
corner-cutting passes to 48 vertices, the spacing law — one growth factor per district, item 543 — the outside-in bands
with a slit first, the staggered radials, the centre rule). This volume fixes the rest:
1. **Centre** `c`: `centroid` — the template face's area centroid when it lies inside the face at ≥ `eLo` from its
   boundary, else its pole of inaccessibility; `landmark` — the centroid of the anchoring reservation: the qualifying one
   (`landmarkSigma`) of highest σ, ties by the larger area, then the id.
2. **Radius budget** `R` = the distance from `c` to the **nearest** point of the template face's boundary, less `eLo`
   (the boundary's inset); with `c` at the pole of inaccessibility this is `inscribedRadiusM − eLo`.
3. **Radii.** `s₁ = eLo + u (R − eLo)` (u on `cut.arc`, creation index 0); `r₁ = s₁ / 2`; **one growth factor per
   district**, `g = 1 + f` with `f` the folded four-uniform bell (§6.1's `bell4`) on `cut.arc` (creation index 1), and
   `s_k = s₁ × g^(k−1)`, `r_k = r_{k−1} + s_k` — NG 1.2.2's geometric law (one factor per map; `code-neighbourhood.md`
   §2.1; J-V1.37). Ring k is laid while its jittered, smoothed course lies wholly inside the face inset by
   `eLo + w_tpl / 2` and the series' laid corridor area stays within the ring land reserved (V01 §3.3.7); the first ring
   that does not fit ends the series (so rings are whole and contiguous from the centre: no clipped ring, NG-GQ-5's
   truncation removed). A budget `R ≤ eLo` lays no ring, and the row bends by F-TEMPLATE. The `landmark` variant lays a
   **precinct ring** round each qualifying reservation in σ order (ties as the anchor's), up to `landmark.maxRings`
   (J-V1.70): its course is the reservation's outline offset outward by `dBar + w_tpl / 2` (the kernel's `insetRing`
   with a negative inset) — one plot row between the precinct and the street round it — with three corner-cutting
   passes (II.2's smoothing), resampled to 48 vertices; only where the outline is round within 10 % (its circularity
   `4πA ÷ P²` ≥ `landmark.roundTol`) is the course a circle of radius the reservation's circumradius + `dBar + w_tpl / 2`.
   A precinct ring is laid when it lies wholly inside the face inset by `eLo + w_tpl / 2` and at ≥ `2 × eLo` from every
   ring already laid; each takes its own fan (2–4 portals, V01 §3.4.6), and a later ring's fan may end on an earlier
   ring. Precinct rings draw nothing.
4. **Width and class** `w_tpl`, `secondary`; each ring a closed chain, one `Way` per ring.
5. **Faces and order.** After the rings, the template face is: the centre face (inside the innermost ring), the annuli
   (each a face with one hole), and the outer band (to the template face's boundary). The bent cut runs outer band
   first, then the annuli from the outside in, then the centre, each band a face of its own (its own cell, so its own
   sub-streams: radials stagger by construction, II.2). A radial end that lands on a ring within the **portal gap** —
   `max(6 m, 2 ×` the wider lane's width) — of an end the other band already made on that ring slides along the ring
   out of the gap toward the side that keeps its arrival within `tpl.arrivalDeg`; neither side does → the cut takes its
   next ladder rung (§4.6 step 7's rule applied to ring spines, so a ring never carries a crossroads). **Through
   radials** (`fabricParams.ringRadials = 1`; NG-GQ-1's option; J-V1.53): each band's first radial after the slit is
   laid as the continuation of the outer band's nearest radial end on the shared ring — the portal-gap rule lifted for
   that one pair, so the ring carries one crossroads per band there; `0` (the default and NG's) staggers as above.
6. **Centre rule.** When §4.6 step 1 stops the centre face as one block, S8 marks the block `ringCentre` and S9b gives
   it a square, a green or a manor block at equal odds among those feasible (V01 §3.5.6); where the district's greenery
   rows allow neither greens nor trees, a square — the innermost ring then encloses a plaza (II.2's plaza loop).

#### 3.4.5 The plaza primitive

**(a) Size.** `A = clamp(SquareRow[type].m2PerInhabitant × inhabitants, SquareRow.minM2, SquareRow.maxShareOfFace ×
templateFaceAreaM2) × fabricParams.plazaScale` (default 1, range 0.5–2) — sized from the people it serves (NG-GQ-7; NG
1.2.2 sizes its plaza by the hood's size tag, which the `NG` preset does through `ng.plazaByTag`, V01 §3.15), rounded to
the lattice, and at S8 at most the plaza land S7c reserved (V01 §3.3.7). A **green**-mode plaza (the `park` row) takes
`A = clamp(parks rate × inhabitants, park.minM2, park.maxShareOfFace × templateFaceAreaM2)`, the parks rate §4.9's row at
D's value, `park.minM2` the row's 0.3 ha floor. A district of 0 inhabitants gets `A = SquareRow.minM2` (or `park.minM2`),
capped by the face share.

**(b) Carved.** Shape: `coin` — a rectangle or a round plaza at even odds on `hood.template` (NG 1.2.2's coin,
provenance `ref:NG 1.2.2 square plaza (code)`); `rect`; `round`. A rectangle has aspect `1 + bell4` when that exceeds
1.2, else 1, its long side along the template face's OBB major axis (ours: a square aligned with the district's grain,
J-V1.5; NG turns it at random); a round plaza is a regular polygon of `max(8, round(2π r ÷ wMin))` sides, `r = √(A ÷ π)`.
**Site:** `centroid` — the template face's pole of inaccessibility when the centroid is nearer than the plaza's
half-diagonal + `eLo` to the boundary, else the centroid; `crossing` — the cross spines' intersection; `bridgeEnd` /
`gate` — the plaza's near side on the portal's boundary kerb, centred on the portal — always on land: a deck's first
frontage plot begins at its abutment and is the deck row's (V01 §3.17.6 (5)). **Fit:** inside the face inset by `eLo`
(the near side excepted for `bridgeEnd` and `gate`) and clear of holes; else the area × 0.8 (≤ 3 times), then the centre
moved toward the pole of inaccessibility in steps of `eLo / 2` (≤ 4); else F-TEMPLATE. **Insertion:** the plaza ring as
one closed L1 chain with the `square` role, owned by a `Reservation` (kind `plaza`, stage S8, §2.5) of D, so S9 types it a
`square` face and its neighbours' kerb edges `square` frontages (§4.7 S9). **Through street** (`through: true`): two
straight spines (`δ = 0`) from the plaza's short sides' midpoints (a round plaza: the axis points) outward along the axis
to the template face's boundary, ending by V01 §3.4.2 (c) — NG's through street, which splits the hood in two (CA-2's two
bisections). **Centrepiece:** S11's furniture step places the plaza's centrepiece by its `SquareRow` (V01 §3.5.10).

**(b′) Green** (`mode: 'green'`, the `park` row). As carved — shape, site, fit — but the ring is owned by a `Reservation`
of kind `park` (stage S8), so S9 types its face `green` and S12b plants it by §4.9's parks row (item 313); its fan paths
arrive at its ring; no centrepiece; its `HoodPlace` is a `green`.

**(c) Void** (`fabricParams.squareVoid = 1`; COV-VG-VN-179, IMPR S4's "keep the square as a void"). Nothing is carved in
S8. S9b picks the **void junction** — among D's junctions inside the template face with ≥ 3 part-0 arms (V01 §2.3), the
one nearest the face's pole of inaccessibility (ties by junction id) — and writes each block with a corner vertex there
`voidCorner = { junction, radiusCm: 1.2 × √(A ÷ π) }`. S10's claims-first step (§4.7 S10 (3)) then claims, in each such
block, the sub-face within that radius of the junction and within `dBar` of the frontage, as residue of kind `square`
(paved, owned by the commons, `road` role, V01 §5.1.2); the block's plots are laid on the rest. The void square is the
corner claims plus the junction's corridor inside the disc; its centrepiece stands at the junction's wedge centroid
(S11). A template face with no junction of ≥ 3 part-0 arms has no void junction: the void square is not made, reported
(F-TEMPLATE's leave-out rung, V01 §3.13).

#### 3.4.6 The fan primitive

From a plaza or a ring to between `portals[0]` and `portals[1]` usable portals not already joined by a seed, taken in rank
order, each new portal's bearing from the anchor ≥ `fan.sepDeg` from every chosen one. Each fan spine is §4.6's two-leg
cut with its start and far side forced: it leaves the anchor's run square at the point nearest the portal's bearing (step
3's rule), turns at a corner drawn by step 4's law (on `hood.template`), and arrives square at the portal's spine (step
5), then step 5's flatten test and step 6's fillet; `w_tpl` and `secondary`, or for a `path` fan the path class and
width. With fewer usable portals than `portals[0]` the fan lays every one there is; with none it lays nothing (the plaza
or ring is reached by the bent cut's lanes), reported.

#### 3.4.7 The rows

| row (card) | seeds, in order | `fabricParams` (default) | fallback |
|---|---|---|---|
| `bent-cut` (Organic; NG `area`) | — | — | — |
| `street` (Main street; NG `street`) | spine main, `portal:best` → `portal:best` | `streetWidthM` | `bent-cut` |
| `square` (Square; NG `square`) | plaza at `centroid`, `carved`, `coin`, type by V01 §3.5.3's rule at the site, `through` | `plazaScale` 1; `squareVoid` 0; `streetWidthM` | `bent-cut` |
| `ring` (Rings; NG `ring`) | ring `centroid`, `law` | `ringJitter` 0.15, `ringPasses` 3 (II.2); `ringRadials` 0; `streetWidthM` | `square`, `bent-cut` |
| `quay` (Quayside) | spine parallel `water`, `onEdge` when D's kind is `docks` or its band ≥ `prosperous`, else `plotRow` (on land; a quay platform's plots are the deck row's, V01 §3.17.6) | `quayOnEdge` by the rule (0 / 1); `streetWidthM` | `street`, `bent-cut` |
| `wallside` (Wall-side) | spine parallel `wall` (walled stretches only), `plotRow` | `streetWidthM` | `bent-cut` |
| `crossroads` (Crossroads) | spine cross `pair:1`; spine cross `pair:2`; plaza at `crossing`, `carved`, `rect`, `crossroads` | `plazaScale` 1; `streetWidthM` | `street`, `bent-cut` |
| `landmark` (Around the church) | ring `landmark`: a precinct ring round each qualifying reservation in σ order, ≤ `landmark.maxRings` (V01 §3.4.4); a fan from each ring, 2–4 portals, `secondary` | `streetWidthM` | `bent-cut` |
| `bridgehead` (Bridgehead) | plaza at `bridgeEnd`, `carved`, `rect`, `bridgehead`; fan from the plaza, 2–3 portals, `secondary` | `plazaScale` 1; `streetWidthM` | `square`, `bent-cut` |
| `stepped` (Terraces) | spine parallel `contour`, `series` — a contour series; over a ravine a thalweg path and a series per flank (V01 §3.4.3) | `streetWidthM`; `terraceSpacingM` (2 × `dBar` + `w_tpl` — two plot rows back to back and their street; range [1.5 × `dBar` + `w_tpl`, 3 × `dBar` + `w_tpl`]) | `bent-cut` |
| `park` (Green) | plaza at `centroid`, `green`, `round`; fan from the plaza, 2–4 portals, `path` | `plazaScale` 1 | `bent-cut` |

The four NG rows emulate NG 1.2.2 (`area` is the base's bent cut; `street`, `square` and `ring` its templates restated
in metres, with II.2's and this section's provenance); the seven context rows are ours (`extension: true`), the templates
NG's creator planned and never shipped (NG-VC-3: junction, park, river bank, bridge, port) together with the base's
context features (II.2's "a quay district gets a quay-parallel street; an intramural district a ring near the wall; a
stepped street on a slope"). **The `square` row's default is `carved`** — NG 1.2.2's own square, read in its code
(J-V1.6; II.2, item 542); `void` is the row's other mode.

#### 3.4.8 Unit runs

In a standalone unit run (V01 §3.10.1) no portal exists: `portal:best` resolves to `axis` — except a `street` hood,
whose main spine is the course S0 drew and built its outline round (V01 §3.10.1 step 1) — so a `ring` hood's radials of
the outer band end on the margin line, and a `bridgehead` or `crossroads` row is never eligible (no bridge portal; fewer
than four portals). In a sky unit run the landings' attach vertices and the deck ends of its laid crossing sites are its
only portals — template portals of kind `landing` and `bridge` (V01 §3.10.3 (4)), never counted in
`SeamReport.portalsTotal` (V01 §3.11 (6)).

### 3.5 S9b Block dispatch — ordinary, manor, square, green and yard blocks

#### 3.5.1 The step

For each district D in lineage order, on the generation worker, as S10a's block hook — **after S10a (i)** has placed the
field-driving classes and the institutions below a block, **before (ii)'s field pass 2** (J-V1.40; §4.7, item 300) —
compute D's three quotas (V01 §3.5.2), then type its blocks in two phases — quota-driven (squares V01 §3.5.3, greens
V01 §3.5.4, manors V01 §3.5.5) and a weighted draw for the remaining small blocks (V01 §3.5.6) — writing `Block.content`,
`Block.squareType` and, for a void square, `Block.voidCorner`. The step runs only while `fabric.extensionWeight` > 0
(V01 §3.15), so in the parity presets every block stays `ordinary`; under `NG` its squares, manors, small blocks and
greens follow V01 §3.15's rules. **Candidate blocks** are D's L2 built blocks whose `interior` is not `wall_strip`,
`reserved`, `green`, `landmark` or `rim_strip` (S8's substitution already typed those, §4.6 step 8 (d)), that are not an
intramural garden (item 106 (b)), that hold no item S10a (i) placed (a field-driving class — a tannery, a midden, a
prison — or an institution below a block, a SIZE record's compound and a GUILD hall among them), and that hold no fixed
input (V01 §3.5.12). Blocks not typed stay `ordinary`; a district with no candidate block types none. Every draw is on
`hood.dispatch` (keys, V01 §3.12). Deck plots (item 110 (d)) are never candidates: they are not blocks (V01 §3.17.6 (2)).

**The band S9b reads per block** is the band §4.7 S10 (2) reads for its geometry rows: at generation the pass-1 field
band (no plot floor exists yet); in every re-derivation over standing plots (an epoch, a replace close-up, a content
edit's scope) the block's **manifested band** (II.3; item 31, J-A31.43) — so a block whose field fell keeps the manor
its standing mansion needs. Quotas stay district-level at D's value. The hood pins' gates read the field band (II.3).

#### 3.5.2 The quotas

* **Inhabitants** `N = Σ` D's allocation household rows × the roster's mean household size at each band.
* **Squares:** `Q_sq = max(0, N ÷ 1 000 × haPer1000(value) × kind[D.kind] × 10 000 − squaresM2)` m², read from
  **`squares.quota`** — the one square quota (§4.7 S9, item 301; J-V1.39), from which S7b (3) already claimed the
  squares larger than a block — with `value` D's pass-1 value (the row interpolated along it) and `squaresM2` every
  square already inside D (V01 §2.3). Default rows: `haPer1000` squalid 0.05, poor 0.05, modest 0.07, comfortable 0.08,
  prosperous 0.10, rich 0.12; kind factors market 1.5, central 1.3, temple 1.2, gate 1.2 (ours; S4 (d)'s band
  0.03–0.15 with median 0.08 is the target over all square sources, §13.7).
* **Greens:** `Q_gr = max(0, G_D − Σ` D's S7b green claims `)`, with `G_D` §4.9's public green for D (the parks row at
  D's band and planned intent, and the `greens` toggle's floor rates), so the part of D's green quota too small for S7b
  to claim (S7b claims only items larger than a block) is met here with whole small blocks.
* **Manors:** `M = min(round(manorBlockShare(band) × N_ord), H_top)` with `N_ord` the candidate blocks whose area lies in
  the manor fit band (V01 §3.5.5) and `H_top` D's allocated households **whose band lies inside D's provisional band
  range** (S7b's reading at the pass-1 mean, §4.5 (5)) and is ≥ `prosperous`, × the class mix's probability (§4.7 S10b,
  item 71) of a `compound`-arrangement class at each band's centre. Default `manorBlockShare`: 0 up to `modest`,
  `comfortable` 0.02, `prosperous` 0.06, `rich` 0.12 (ours; NG 1.2.2's measured manor share 6–11 % of blocks is the
  anchor for the upper bands, `profile-neighbourhood.md` §3.3); 0 for a `secular` standalone recipe (V01 §3.10.1).

A district of 0 inhabitants has every quota 0 and types only by phase 2 (V01 §3.5.6).

#### 3.5.3 Squares

1. **Type split.** Each type t gets a share `q_t ∝ base_t × factor_t(χ̃, context)`: `forecourt` 0.2 × (1 + 2
   mix.religion), only where a church, a temple or a GUILD record's hall (V01 §3.5.12) stands on an S3 or S7b reservation
   touching D **and has no §4.8 forecourt**; `bridgehead` 0.3 when a bridge portal bounds D, else 0; `trading` 0.4 when
   D's kind is `market`, else 0.05 × (1 + sectors.trade); `crossroads` 0.2 × (1 + 2 trade); `well` 0.3. `Q_t = q_t ×
   Q_sq` after normalising the shares. A `trading` square is a small open trading place, never a market: no stalls, no
   market rank, never a market `Reservation`, outside item 24's count and separation (J-V1.44).
2. **Sites.** A block is a candidate for a square when its area is ≤ `min(2 × smallBlockM2, sq.maxM2)` (with
   `smallBlockM2 = eLo² ÷ 2`, NG 1.2.2's small-block rule restated in our block extents; provenance `ref:NG 1.2.2
   small-block rule (code)`) and it is sited for the type. `forecourt` — **at generation** (no plot, building or
   entrance exists yet), only against a landmark on a reservation: the reservation's boundary side on its widest frontage
   way; the candidate block shares that way and its centroid lies within `sq.forecourtM` of that side's midpoint; **in a
   re-derivation**, the landmark's committed main entrance (§2.6) within `sq.forecourtM` and a shared frontage way. A
   church or temple below a block (S10a (i) placed it on a block, no reservation) never takes an S9b forecourt: its
   forecourt is §4.7 S11's `forecourt` yard part. `bridgehead` — a corner within `sq.bridgeM` of a bridge-end junction
   (a part-0 deck over water; V01 §2.3's parts table); `trading` and `crossroads` — a corner at a junction with ≥ 3 arms
   (counted on part 0, a raised road's ramp end a junction of its class; V01 §2.3), one of them tier 1 (`through`,
   `primary`) or two of them tier 2 (`secondary`, `quay`; §8.5's tiers); `well` — a corner at a junction with a tier-1 or
   tier-2 arm. So every typed square stands at a main junction or before a landmark (S4 (c); V01 §7).
3. **Filling.** For each type in the order forecourt, bridgehead, trading, crossroads, well: candidates by score (siting
   distance ascending, then area nearest `Q_t` remaining, then the sunnier block — the lower `shade` at its centroid
   (V01 §3.5.5; item 102 (d)) — then the flatter block, the lower area-weighted mean slope of the unlevelled terrain over
   it (a piazza is a terrace; ours, `extension`), then block id), each taken while `Q_t` remains and its area ≤
   `sq.overTake` × `Q_t` remaining; a type's unmet quota rolls to the next type; the last unmet remainder is reported
   (`stage2.squares.unmet`, F-DISPATCH, V01 §3.13). A taken block: `content: 'square'`, `squareType: t`.
4. **Template plazas** already count in `squaresM2`; a `square` template's plaza takes `trading` when D's kind is
   `market`, `forecourt` when a landmark reservation's widest side faces it (point 2's generation reading), else
   `crossroads` (its through street makes it a junction of tier 2).

#### 3.5.4 Greens

Candidates: blocks of area ≤ `green.maxMedian` × D's median block area, no frontage on a tier-1 part-0 way (V01 §2.3), at
≥ `green.spacingEHi` × `eHi` from every green (S7b's claims, parks, green blocks already typed). Score = `(1 +
intent.greenery) ÷ (1 + d_c ÷ eHi) × siting`, `d_c` the distance to D's pole of inaccessibility (greens sit inward, ours)
and `siting` V01 §3.5.5's push product read with the sensitivity row of D's modal household class (a green's users).
Taken in score order while `Q_gr` remains and the block's area ≤ 1.5 × `Q_gr` remaining: `content: 'green'`.

#### 3.5.5 Manor blocks

The **manor fit band**: block area in `[manor.fitLow, manor.fitHigh] ×` the plot-area budget of the largest `compound`
class the class mix gives nonzero weight at D's upper band (its designation template's size budget, §4.7 S11); a class
mix with no such class gives an empty band, so `M` is 0. Candidates in that band are weighted `prestige × spacing × sun
× siting`:
* **prestige** — §4.7 S10b's prestige rows summed over the block's frontages (a square, a park edge, the waterfront, a
  corner);
* **spacing** — `min(1, d_m ÷ (manor.spacingEHi × eHi))`, `d_m` the distance to the nearest manor block or landmark
  reservation: a spacing *weight*, never a floor (NG 1.2.2 spaces its manors by a multiplicative distance weight,
  provenance `ref:NG 1.2.2 manor spacing (code)`; II.3, item 544);
* **sun** — `1 − manor.sunWeight × shade(centroid)` (ours, `extension`), `shade(x)` item 102's daylight shade share at
  x: the pass-1 sampler's terrain and wall mask OR-ed with every live island's strip onto the ground (V05 §2.3a) — the
  strips are evaluated once per shade evaluation (the generation's, a re-derivation's from S10a or earlier, or an
  epoch's, V05 §3.19 (6)) at S9b's first read, by the same pure call field pass 2 makes, and held for it, so no strip is
  computed twice. **On a sky arena** `shade(x)` is volume 5's `shadeSky(x)` on the island's 32 m lattice (V05 §3.11 (4):
  the strips of higher islands onto it, and after an epoch its own buildings), and no sky reader — S7c's `shade` term,
  this factor, the hood pins' gate — reads the ground's pass-1 mask;
* **siting** — `Π (1 − push)` over the blocks S10a (i) filled, `push` the weight of the derived family row
  (`fam/nuisance/<n>/L<level>`, V11 §2.4) for each nuisance n the placed class emits and the compound class is sensitive
  to, when the candidate lies within that row's radius at the emitter's level (block edge to block edge), else 0;
  clamped to [0, 1]; `extension` (item 103 (a)). A row of weight 1 therefore keeps every manor out of its radius.
`M` blocks are drawn without replacement by weight on `hood.dispatch`, keyed by **the district's lineage with the pick
ordinal as the creation index**, weights recomputed after each pick (spacing updated): `content: 'manor'`. When every
remaining candidate weighs 0 the draw stops, the unmet manors reported (F-DISPATCH).

#### 3.5.6 Small blocks and ring centres (phase 2)

Every candidate block still untyped with area ≤ `smallBlockM2` draws its content from the band row's `small` weights
(interpolated along its value, V01 §3.5.1's band): default squalid (0.80 ordinary / 0.20 yard / 0 green), poor (0.70 /
0.25 / 0.05), modest (0.60 / 0.30 / 0.10), comfortable (0.50 / 0.35 / 0.15), prosperous (0.45 / 0.30 / 0.25), rich
(0.40 / 0.25 / 0.35) — ours; NG 1.2.2 empties every small block (its empty blocks are 0–3 % of blocks,
`profile-neighbourhood.md` §3.3; the `NG` preset does, V01 §3.15), calibrated at M5 on the NG panel pairs; the green
weight × V01 §3.5.4's siting product. The draw is on `hood.dispatch` keyed by the block with pick ordinal 0; a `yard`
block's paving (`yardPaved`) draws on the same key with pick ordinal 1. A `ringCentre` block draws among the feasible of
{square (`plain`, or the type its siting gives), green, manor} at equal odds (II.2's centre rule; pick ordinal 0), a
manor feasible only when its area is in the fit band and the class mix allows a compound class, a green only when D's
greenery rows allow greens. Over-quota typing from phase 2 is allowed up to `dispatch.overQuota` × each quota; beyond it
the block stays ordinary.

#### 3.5.7 Courts greened (§4.9, item 313)

S12b plants a block's court residue (§4.7 S10 (6)) as a green with trees with the band's **court-greening**
probability, drawn on `greenery` keyed by the block: squalid 0.10, poor 0.20, modest 0.35, comfortable 0.45, prosperous
0.60, rich 0.80, × (0.5 + D's greenery value), × 1.5 for a `leafy` standalone recipe, clamped to [0, 1] (ours; II.3's "a
target per band" over NG 1.2.2's complete-frontage-ring rule, whose 23–58 % of ordinary blocks green is the calibration
anchor for the modest to comfortable rows, item 58 (b)). The row is `extension` (0 in the parity presets). A court not
greened stays bare `court` ground. A court residue a `RetainingWall` crosses (a terraced block's rear line,
V01 §3.17.1 (7)) is greened or not by one draw, and a greened one plants every level piece — a terraced garden.

#### 3.5.8 The seam guard (S3)

A block whose frontage on **soft** seams (`way` and `field` runs shared with another district, II.1) is ≥
`guard.softShare` of its frontage is a candidate for `manor` or `green` only when the district across that seam has a
pass-1 band within `guard.bands` of D's at the seam's boundary samples — so a manor or a park never makes a jump across a
soft street (S3's band, §13.7: Δ median frontage ≤ 25 %, Δ plot area ≤ 35 %, Δ storeys ≤ 1). Across a hard seam, or with
no district across (the town's edge, a unit's border), the guard does not apply.

#### 3.5.9 Land in the programme (item 284)

The dispatch takes built land from plots; the programme must plan for it or the population could not stay whole. S2's
land estimate (§4.2 S2) multiplies each band's plot land by `(1 + λ_b)`, `λ_b = sq_b + gr_b + yd_b`: `sq_b` the band's
sub-block share of `squares.quota` over its plot land per 1 000 inhabitants, `gr_b` the sub-block green share of §4.9's
rows at the band, `yd_b` the phase-2 yard and green expectation (the small-block share of blocks at the band,
`land.smallShare`, measured on B-CITY at M5, × its `small.yard + small.green`). S7b (1)'s district capacity subtracts D's
expected dispatch land (`Q_sq + Q_gr` + the yard expectation) and, inside S7b's reconcile, its template land (V01 §3.3.7),
so every household S7b allocates has a plot. A manor block holds one household and its compound; its expected loss of
capacity — the block's row capacity less one — is also subtracted by S7b (1). `λ_b` is 0 without `@plat/hood` and in the
parity presets. **Check (T-V1-12):** on B-CITY, 0 households unplaced because of a dispatched block or a template
(F-SITING's report shows none), per template class. *Fallback:* `λ_b` + 0.05 and re-run; V01 §3.3.7's for the template
land.

#### 3.5.10 What each content does downstream

The rows below are §4.7's S10a, S10, S10b and S11 clauses (item 300) as they read `Block.content`.

| content | S10a | S10 | S10b / S11 | S12b | S13a / S14 |
|---|---|---|---|---|---|
| `ordinary` | by capacity (base) | frontage-first plots (base) | base | base; its court greened by V01 §3.5.7 | base |
| `manor` | one household of D's top band inside D's band range, with that household's own members — servants are members (§10.3); no extra allocation | all residential plots joined into one by §4.7 S10 (7)'s join law (as the cluster row's whole-block join, item 70) | the class mix drawn among `compound` classes only (item 71's weights restricted, renormalised); a compound site plan with its enclosure by its template (§4.7 S11) | yard planting by the compound's rows | base; a manor's name is its house's (§10.4) |
| `square` | capacity 0 | no plots: the block face one L3 residue face of kind `square` (paved, commons) | its centrepiece pin on `pin.centrepiece` by `SquareRow.centrepiece` (defaults: forecourt cross 0.7 / statue 0.3; crossroads market cross 0.5 / well 0.3 / fountain 0.2; bridgehead statue 0.5 / cross 0.5; trading market cross 0.8 / fountain 0.2; well well 0.7 / pump 0.2 / trough 0.1; plain as well), at the face's pole of inaccessibility — skipped where an aqueduct terminal's outlet is the square's centrepiece (V01 §3.17.8); **no stalls** — §4.7's stall rule stays on market reservations only (item 24) | none | a `HoodPlace` (V01 §3.7.1); drawn in the `road` role (V01 §5.1.2) |
| `green` | capacity 0 | one residue face of kind `green` | none | a `green` Greenery on it, owned by the commons, a grove layout by §4.9's park rule for small faces, tree density by the band's greenery; §4.9's parks row admits it at any size (item 313) | a `HoodPlace`; drawn as a green |
| `yard` | capacity 0 | one residue face of kind `yard_common`: paved with probability `yardPaved` (poor 0.7 → rich 0.4), else grassed | no model pin (its hood pins are the close-up's) | grassed: yard planting | a `HoodPlace` (`local`) |

**A manor with no household (F-DISPATCH's revert rung).** After S10a (ii) re-homes the households outside D's band
range (§4.5 (5)), a `manor` block whose district holds no household of the block's band range reverts to `ordinary`,
reported (`stage2.dispatch.manorReverted`); it is never left empty.

#### 3.5.11 Epochs (volume 6)

The `hood.fabric` participant (V01 §3.3.6) runs S9b's rule on the blocks an epoch creates outside a growth run's S10a
hook and on due blocks rung 3 redevelops; a re-cut block keeps its content otherwise, and a standing square, green or
manor block is a survivor.

#### 3.5.12 Fixed inputs, ladder records and catacomb sources

**Fixed inputs.** S9b never types a fixed input's block `square`, `green`, `manor` or `yard`, and a re-derivation (a
replace close-up, a content edit's scope, an epoch) keeps its plot and site (§7.2): (1) a locked, pinned, assigned or
dossier-backed plot; (2) a **SIZE** ladder record's compound (item 108 (a): one larger building or compound by its
template, never typed away); (3) a **GUILD** record's hall; (4) **a catacomb's source cemetery** (the sources volume 4
lists in `UndergroundSystem.sources` under item 109 (k) (2)): a churchyard part's plot (the yard part of a church, temple
or cathedral plot), a separate burial ground's face, a monastery's burial face, a quarry ossuary's surface head, together
with **the plot holding the church that owns a sourcing churchyard** and **the plot holding the catacomb's entrance
`AccessPoint`** — an extramural cemetery lies in the hinterland, which S9b never types; (5) **a declared
`RetainingWall`** (source `declared`, held; item 245): a line every re-derivation keeps and every seed respects
(V01 §3.17.2); (6) **a raised part's under-deck strip** with its piers (V01 §3.17.3): a hole no re-derivation plots. At
generation (no plot yet) (2) and (3) are the blocks S10a (i) placed them on, which are not candidates anyway; (4) exists
only in a re-derivation, since volume 4's systems are laid after the ground's plots. A dossier change that removes the
record behind a fixed input — a dossier-backed plot's, a SIZE or GUILD record, a catacomb's source (volume 4's, from
DR32) — releases it at the next re-derivation of its block; a user's lock or pin on it yields to the dossier's removal and
is reported orphaned (§7.7's precedence, items 20, 22; §7.4).

**Ladder records** (item 108; `DistrictContext.records`). A **QUARTER** record whose district is D makes D's identity the
dossier's (item 72 (3); `identitySource: 'dossier'`), which S7c's `identity` term reads like any dossier identity and the
panel and the title show (V01 §4.5, V01 §5.2.1); its members elsewhere keep their own districts. A **GUILD** record's hall
on a reservation is a σ-bearing landmark for S9b's forecourt (V01 §3.5.3). A **COUNT** record's members are ordinary
allocation rows keyed `#k` (DR9, J-A74.73). **No double counting** (item 108 (c)): every member is counted once, in the
district its plot stands in; `membersHere + Σ elsewhere = membersTotal` = the record's count.

