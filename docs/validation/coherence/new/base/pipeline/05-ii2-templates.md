## II.2 Templates as fabric strategies (NG B2, B7, B8)

The template machine — the template face, the four seed primitives, the eleven rows (the four NG templates and seven context
templates) and their ladders — is V01's (V01 §3.4); `RingFabric`, `SquareFabric` and `StreetFabric` are its `ring`, `square`
and `street` rows, registered as `TemplateFabric` (§4.6), and templates chosen by context are S7c's (V01 §3.3). The base's
part is below.

`RingFabric` (COV-NG-N12): concentric `secondary` ring roads inside the boundary at a radius law (a table) are the template's
only seed geometry — no template radials. **The ring courses (default; item 58 (a); provenance `ref:NG 1.2.2 ring courses
(code)`, P19).** The radius law's default row lays the rings from the district's ring centre (its area centroid) outward:
the first spacing is the district's lower block extent `e_lo` (§4.6 step 1) plus a uniform share of the radius that remains
to the boundary's inset, and each further spacing is the previous one × `g`, one growth factor per district, `g = 1 + f` with
`f` the folded four-uniform bell of §4.6 step 1 drawn once (so `g` lies in [1, 2], 2 only when every uniform is 0; NG 1.2.2's
geometric law; V01 §3.4.4, J-V1.37), so the rings widen outward; a ring whose course would leave the boundary's inset is not
laid, and the outermost band runs to the boundary. Each ring is a hexagon at its radius — every ring of the district sharing
one phase drawn once per district, each vertex's radius moved by a centred bell of `ringJitter` × the ring's spacing —
smoothed by `ringPasses` corner-cutting passes (each corner replaced by the points at one quarter and three quarters of its
two edges; three passes take the hexagon to 48 vertices). The draws are on `cut.arc`, keyed by the district: index 0 the first
spacing's u, index 1 the growth factor, and the ring's ordinal for its phase and jitter (§6.1; no new concern). An **uncut
centre** — the face inside the innermost ring — is laid out, at equal odds, as a square, as a green block or as a manor block;
where the district's greenery rows allow no greens and no trees, the ring nearest the centre is closed instead as a loop
around a plaza. `ringJitter` (0.15, provenance `own`) and `ringPasses` (3, provenance `ref:NG 1.2.2 ring courses (code)`,
P19) are the `ring` template row's values, settable per district through `fabricParams` by `setAttr` like every fabric
parameter (II.4); the jitter's share is recalibrated on M5's NG ring pairs (J-S34). For scale only: the medium area template
of NG 1.2.2 spans ≈ 525 m, read through its export scale (0.35 of a metre for each model unit) — descriptive, an inference
(item 58 (f)); no default of ours is derived from it. The bands are processed **outside-in**, one hole-aware bent-cut
recursion per annulus (§4.6's slit and holed position law): the band's **first cut is a slit** that opens the annulus without
splitting it, and its later cuts are its radial streets, arriving at the ring roads at right angles by the recipe's
perpendicular departure and arrival; each band draws its cuts from its own sub-stream, so radials are **staggered band to
band**, never one straight line through all rings (NG RA-2, RA-4, PF-1). Radials of the outermost band that reach the
boundary use II.1 rule (3)'s seam amendment. `SquareFabric`: `mode: 'carved'` places a rectangular or round plaza face at the
district's centroid or at a portal, sized from population, frontages typed `square`, then the bent cut on the remainder;
`mode: 'void'` (COV-VG-VN-179) carves nothing — the plots whose frontages face a chosen open area are left unbuilt, so the
square is the irregular void their omission forms; in both modes the square's centrepiece is drawn by `hood.squares`' row for
its type (V01 §3.5.10) — monument, statue and fountain among them (COV-NG-XB23). The `square` template row's default is
`carved` — NG 1.2.2's own square, a rectangular or round plaza at a coin with a through street (J-V1.6, which supersedes
J-S42) — so a district opened with `square`, and every `square` pair of the D-5 panel against NG (§13.6 (2)), gets it; `void`
is the row's other value, `fabricParams.squareVoid = 1` (0 or absent is `carved`, since `fabricParams` holds numbers, §2.5),
set by `setAttr` like any fabric parameter (II.4). `StreetFabric`: a main street between two portals with plots directly on
it, bent cuts on the deeper faces. **Template road widths (COV-NG-N20):** ring roads and template streets take fixed
per-district widths drawn once from the district's stream (NG 1.2.2 draws them as its per-map maximum), while cut streets
follow §4.6's width law. A template is its seed geometry plus the number of sub-areas it hands to the bisector (CA-2 via the
parity judge) — a data row plus a strategy class. The **`area` template is the base's own bent-cut fabric**
(`FabricStrategyId` `bent-cut`, §4.6), the default, opened as a `refine` close-up. Templates chosen by context (stage-2
feature S4) read the district context (a quay district gets a quay-parallel street; an intramural district a ring near the
wall; a `stepped` street on a slope).
