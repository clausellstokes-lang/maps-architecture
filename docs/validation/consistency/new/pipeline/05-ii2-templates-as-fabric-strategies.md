## II.2 Templates as fabric strategies (NG B2, B7, B8)

`RingFabric` (COV-NG-N12): concentric `secondary` ring roads inside the boundary at a radius law (a table) are the template's
only seed geometry — no template radials. The bands are processed **outside-in**, one hole-aware bent-cut recursion per
annulus (§4.6's slit, σ = 0.098): the band's **first cut is a slit** that opens the annulus without splitting it, and its
later cuts are its radial streets, arriving at the ring roads at right angles by the recipe's perpendicular departure and
arrival; each band draws its cuts from its own sub-stream, so radials are **staggered band to band**, never one straight line
through all rings (NG RA-2, RA-4, PF-1). Radials of the outermost band that reach the boundary use II.1 rule (3)'s seam
amendment. `SquareFabric`: `mode: 'carved'` places a rectangular or round plaza face at the district's centroid or at a
portal, sized from population, frontages typed `square`, then the bent cut on the remainder; `mode: 'void'` (COV-VG-VN-179)
carves nothing — the plots whose frontages face a chosen open area are left unbuilt, so the square is the irregular void
their omission forms; in both modes a centrepiece pin (monument, statue or fountain; COV-NG-XB23) sits at the square's nexus.
The `square` template row's default is `mode: 'void'` (J-S42) — so a district opened with `square` and no mode, and every
`square` pair of the D-5 panel against NG (§13.6 (2)), gets the void; `carved` is the row's other value, recorded as
`fabricParams.squareMode = 1` (0 or absent is `void`, since `fabricParams` holds numbers, §2.5) and set by `setAttr` like
any fabric parameter (II.4). `StreetFabric`: a main street between two portals with plots directly on it, bent cuts on the
deeper faces. **Template road widths (COV-NG-N20):** ring roads and template streets take fixed per-district widths drawn
once from the district's stream (NG: per-seed values), while cut streets follow §4.6's width law. A template is its seed
geometry plus the number of sub-areas it hands to the bisector (CA-2 via the parity judge) — a data row plus a strategy
class. The **`area` template is the base's own bent-cut fabric** (`FabricStrategyId` `bent-cut`, §4.6), the default, opened
as a `refine` close-up. Templates chosen by context (stage-2 feature S4) read the district context (a quay district
gets a quay-parallel street; an intramural district a ring near the wall; a stepped street on a slope).
