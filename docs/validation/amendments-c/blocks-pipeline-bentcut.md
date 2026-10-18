Blocks — amendments-c seat pipeline-bentcut (items 33–40; report: docs/validation/amendments-c/amend-pipeline-bentcut.md)

=== REPLACE ### 4.6 S8 Infill — the measured bent cut as a kernel transaction, per district, with the deep-interior rule ===
### 4.6 S8 Infill — the measured bent cut as a kernel transaction, per district, with the deep-interior rule

S8 runs per district (one batch each, districts in lineage order in the generation worker) on every coarse face of the
district except its reservations (a reservation inside a face is a hole) and its wall strips (faces S8 never cuts, §4.8)
whose kerb polygon — `kerb(F)`, the kernel's single kerb function: the face minus the buffered spines, §3.7 — step 1's
stop test does not already accept as a block (each face's threshold falls inside **the district's block-depth
range**, which step 1 derives from the granularity law's plot depths at the district's pass-1 band, §4.7, and the stage
regime's floor, §4.4). In walled regimes the faces are district-scale (S5c grew only arterial-connecting
secondaries), so this recursion produces every intramural lane and secondary and propagates the wall's and the shore's
direction into the fabric (MFP-2). S8 plans each cut on `kerb(F)` of the current L1 faces, inserts each accepted lane at
L1 in the district's transaction, extended to the crossed spine as a T-junction (step 7), and recurses on the children's
kerbs; S9's `corridorUnion` then commits exactly those kerbs (contract test "S8's working block ≡ S9's committed block,
Hausdorff 0", §13.2), so no `insetRing` by corridor half-widths is needed (GEO-20). **The wall is a barrier:** S7 has cut
each enceinte's wall strips off the faces beside the trace (§4.8), so the `kerb(F)` of a face beside a wall stops at the
strip's boundary — the inner setback line, or the intervallum's kerb where the era row has one — and no cut is planned
through a wall's band or setback; the band, tower and gatehouse faces are built later inside the strips by S10's step (0)
(§4.7), so S8 never meets an L3 face. **Test:** on every walled B-CITY seed, 0 lanes cross a wall strip and 0 L3 band
faces are cleared or split by an L1 batch.

**Sides (GEO-22).** Before any rule reads a side, the face boundary is reduced to **runs** (the kernel's `sideRuns`,
§3.4): maximal boundary chains whose cumulative turning stays within 10°, each with its chord direction; a crossing
street's fillet arc is replaced by its virtual corner (NG PF-1's method). "Perpendicular to a side" is measured against the
run's chord or, on a curved run, against the tangent over a ± 5 m window at the contact point — never against the one short
segment a cut happens to hit on a Chaikin-smoothed, round-joined kerb. M0 (b)'s face set is §16's.

**The recipe (MN-3; the mechanism of NG 1.2.2's plain bisector as read in its code — reader-tier, via the digest —
restated in our metric terms; the profile's measured statistics remain the §13.5 targets; MFCG 12710731 and VG 1.6.9
differ where step 5 says).** Given a face F:

1. **Stop test.** `obb(F)`; the face stops as a block when its minor extent is under a threshold drawn for it from
   `cut.stop`: `τ = e_lo · (e_hi / e_lo)^g` (the power by `dmath.pow`, §6.5 (3)), with `g = |(u₁ + u₂ + u₃ + u₄) / 2 − 1|` —
   four uniforms folded into a bell over [0, 1] (mean 7/30, its mass heaped near 0) — so most faces stop close to the
   range's shallow end and a few run deeper (provenance `ref:NG 1.2.2 per-face stop threshold (code)`, P1 — NG 1.2.2
   and MFCG 12710731 compare the face's area; ours re-expresses the test on the extent, because a block's depth, not its
   area, decides whether its frontage rows fit; J-A34.41). **The block-depth range**, stated here once:
   `e_lo = max(2 · d_lo, r_lo)` and `e_hi = max(2 · d_hi, r_hi)` — two back-to-back rows of the band's shallowest and
   deepest plots, floored by the regime — where `[d_lo, d_hi]` is the plot-depth band the granularity law gives the
   district at its pass-1 band (`GranularityLaw.bands(…).depthM`, §4.7 S10 (2): interpolated along the prosperity value
   and scaled by the rung's depth factor) and `[r_lo, r_hi]` is the district's stage regime's block-depth band floor
   (§4.4; both 0 for a regime whose row gives none). In this section **the band's plot depth** is
   `d̄ = (d_lo + d_hi) / 2` and **the band's upper block area** is `e_hi²` (J-A34.42); the depth rows and the regime
   floors are re-fitted at M-1 under this reading (§13.5's blocks row).
   **Slope term (COV-MFCG-C05):** on a face whose mean slope exceeds 5 %, the working major axis is the OBB major axis
   rotated toward the contour direction by the weight `min(0.5, slope / 0.3)`, so cuts on a hillside run with the fall
   line and blocks lie along the contours (our own rule: no reference reacts to slope here — MFCG 12710731's model has
   no terrain; provenance `own`, its cell marked `extension: { over: 'both', mode: 'option' }`, so the parity presets
   switch it off, §7.6; J-A33.42).
2. **Position.** `f = (c + b) / 2` along the working major axis, where `c` is the relative position (0 to 1) of F's area
   centroid's projection on that axis and `b` averages three uniforms drawn from `cut.t`, `(u₁ + u₂ + u₃) / 3`; there is no
   outlier term, clamp or redraw — `f` never strays more than 0.25 from `(0.5 + c) / 2`, and a lopsided face is cut
   toward its mass, so its children's plot depths balance (provenance `ref:NG 1.2.2 centroid-and-bell position (code)`,
   P2; MFCG 12710731 and VG 1.6.9 place the cut alike). On a holed or annular face `f = m + (1 − 2m) · b` over the outer
   ring's OBB length, so that `f` keeps at least `m` from either end, `m = min(0.45, e_lo ÷ that length)`, with no
   centroid term (NG 1.2.2's hole-aware law, P2). The σ of 0.066 (plain) and 0.098 (holed) that §13.5 and §16 M0 (b)
   read are NG's measured outputs of this law, never its inputs (J-A35.41).
3. **Start.** The minor-axis line at `f` meets F in one segment around the OBB centre's projection (for a concave face, the
   segment containing the point nearest to it); its two ends are the candidate starts, one on each long side, which
   defines the start and far sides for any face shape — triangles, C-shapes and curved faces included. The start A is the
   candidate lying on the run whose chord is most nearly parallel to the working major axis (ties: the earlier run in
   boundary order) — a deterministic choice with no draw (provenance `ref:NG 1.2.2 start-run rule (code)`, P3; MFCG
   12710731 and VG 1.6.9 start alike; J-A36.41). The runs are ours (GEO-22): NG 1.2.2 works on raw edges, the cause of its
   inexact arrivals. Leave A exactly perpendicular to its run.
4. **Corner.** The first leg leaves A along its run's inward normal; `λ` is how far it runs inside F before reaching the
   boundary. The corner K sits `o + (λ − 2o) · b` from A on that leg — `b` again averages three
   uniforms from `cut.t`, `o = e_lo` (on a holed or annular face `o = e_lo / 2`) — or at `λ / 2` when `λ < 2o`, so the
   bend lands near mid-course and at least `o` from both ends (provenance `ref:NG 1.2.2 corner-first rule (code)`, P4;
   MFCG 12710731 and VG 1.6.9 alike). K is fixed **before** any far side is chosen (J-A37.41, which supersedes J-P16's
   perpendicular-ray far side and its fallback chain).
5. **Far side and second leg.** Among the runs that face the first leg (inward normal against its direction), whose
   perpendicular foot from K falls inside the run and whose segment K–foot crosses no other boundary, the far run is the
   one whose chord — on a curved run, its tangent at the foot (*Sides*) — meets the first leg nearest to a right angle
   (ties: the earlier run in boundary order); the second leg is K's perpendicular onto that run, so every cut arrives
   square. No such run: the plan fails (`E_NOT_TWO_CROSSINGS`) and step 8's ladder takes the face (provenance
   `ref:NG 1.2.2 far-side rule (code)`, P4). Two bends never (3 / 519 in NG's measurement). **Measurement:** M0 (b)
   compares our block-area, cut-length and junction-angle distributions with NG's on the same faces — the check of the
   adopted rule (§16). **Straight or bent** is the table row `cut.bendMode` (J-A37.42):
   * `flatten` — the default (provenance `ref:NG 1.2.2 flatten test (code)`, P5): the cut is A → K → foot, and K is
     dropped (the cut becomes A → foot) when the triangle A–K–foot has a height below `max(cut.flattenM, 0.02 × |A–foot|)`;
     `cut.flattenM` = 0.7 m (provenance `own` — ours: NG 1.2.2's two model units read as ≈ 0.7 m through its export
     scale — 0.35 per unit in the GeoJSON schema MFCG 12710731 writes in metres — an inference, recalibrated at M-1 on
     the bent-cut signature of §13.5);
   * `straightFirst` — the `MFCG` parity preset's value (provenance `ref:MFCG 12710731 square test (code)`, P5; VG 1.6.9
     likewise): the cut runs straight, A → the first leg's hit, if the first leg arrives at the run it hits within
     `asin(√0.99)` of square (≈ 84.3°, tested without trigonometry: the two unit directions' cross product, squared, exceeds 0.99) and
     step 8's checks pass; otherwise it is planned as under `flatten`. The preset also reads `cut.flattenM` = 8 m
     (MFCG 12710731's default flatten height of two model units at its 4 m export unit; all three builds share the
     test; P5), so it reproduces MFCG's own street signature (§13.5) through §7.6's per-preset values.
6. **Fillet (COV-NG-N19).** Lane and street cuts only, never lot cuts (§4.7). At a kept corner with deflection δ and
   shorter leg ℓ, one draw from `cut.arc` keeps the corner sharp with probability `s + (1 − s) · min(1, w_min / ℓ)`, where
   `s = sin²(δ/2) = (1 − cos δ) / 2` and `cos δ = û₁ · û₂`, the legs' unit directions (no trigonometric call), and
   `w_min` is the district's minimum plot frontage (the low end of `GranularityLaw.bands(…).frontageM` at its pass-1
   band, §4.7) — so a sharp turn or a short leg keeps its corner and a gentle turn between long legs is rounded.
   Otherwise K gives way to an arc of a circle, tangent where the shorter leg ends and, along the longer leg, as far
   from K as that end is — so the curve spans the shorter leg entirely and what remains of the longer one is straight —
   sampled in equal chords no shorter than `w_min` or the lattice minimum edge; an arc with under three sample points,
   or one leaving the face, leaves the corner sharp. The radius follows from the legs, never a constant (provenance
   `ref:NG 1.2.2 fillet rule (code)`, P6, shared by MFCG 12710731; J-A38.41). NG's measured 53 % filleted share is this
   rule's output on NG's faces (the fillet bar of §13.5).
7. **Ends in the model (GEO-21).** Each junction end is extended along its arrival direction from the kerb to the crossed
   spine and inserted there as a T-junction (`splitThrough`, §3.4), so the L1 face splits and the lane joins the street
   graph, the junction census, betweenness and R3. NG's "stop half the crossed road's width short, square caps" is the
   renderer's stroke rule, which S9's corridor union and junction wedge produce without model trimming. A cut end that
   meets a dead end or a hole follows §3.6's contact semantics (an antenna end becomes a T-junction; a hole is joined by
   `connectHole`, §3.4). An end that arrives at a wall strip's setback line — a boundary with no spine — stays there,
   square to the line, as a lane ends at a reservation; an end at the intervallum is a T-junction like any other.
   **Seam portals (J-P32).** When the crossed spine bounds the district — an arterial or a boundary secondary — the
   T-junction's vertex lies on a chain two districts share, so S8 records it as a `baseLane` portal, with its
   `SeamAmendment`, in the shared `Seam` record of that boundary run (II.1), which both districts' contracts read. A
   planned end inside the **portal gap** of an existing portal on that spine — max(6 m, 2 × the wider lane's width), a
   table row — slides along the spine out of the gap, toward the side that keeps its arrival within 85–95°; if neither side
   does, the cut takes its next ladder rung. So two districts' lanes never meet at one boundary vertex (the crossroads step
   10 forbids) and each portal vertex carries exactly one lane. When a re-derivation removes a lane, its end vertex loses
   its `portal` role (`removeEdges` on its `VertexRef`, §3.4) and is dissolved, its portal and amendment leave the `Seam`
   record, so the spine reads exactly as it did before the lane, and the neighbour step's reversal restores the
   neighbour's kerb (II.1 (3)). A district's effective scope — its own faces plus this **seam exception** (the chains,
   corridors, strips, wedges, neighbouring rings and `Seam` records its lane ends touch) — is §7.3 item 1's; every other
   entity of every other district stays byte-identical, and the locality oracle checks exactly that (§7.3, II.4).
8. **Transaction and ladder (GEO-23).** Before step 1, on any face with a reflex vertex deeper than the band's plot depth
   (L- and C-shaped faces, faces wrapped round a cul-de-sac antenna), a **reflex pre-cut** splits the face perpendicular
   to the reflex vertex's longer run, and antennae are split off at their roots (FTG's fix for "internal corners"). Then
   `splitFace(F, cut)` as a transaction; reject if either child violates `minEdge`, min angle or the class's minimum block
   width. The **ladder**, each rung under an operation-count work limit: (a) **a turned frame** — re-plan steps 2–7 in
   the working frame turned by 36° (attempt k in the frame turned by k × 36°; ≤ 2 more frames, ≤ 3 in all), drawing
   afresh from `cut.t` for steps 2 and 4 on the stream key's `attempt` component (§5.1 (6)), because a redraw on the
   same frame often fails the same way while a turned frame is a genuinely different cut (provenance
   `ref:NG 1.2.2 rotated-frame retry (code)`, P7; NG 1.2.2 retries like MFCG 12710731, in frames turned by 36° up to ten
   times, after which NG 1.2.2 leaves the face whole and MFCG 12710731 restarts the whole city — ours is bounded and restarts
   nothing, D-9; J-A39.41); (b) the straight cut from A along the **mean normal** — the average direction of the start
   run's inward normal and the far run's outward normal, both as steps 3 and 5 found them in the unturned working frame
   (the start run's inward normal alone when step 5 found no far run); (c) **the always-succeeding cut** — a straight cut
   perpendicular to the longest run through its midpoint, clipped to F's own component by boolean intersection (a clipped
   line cannot make four crossings); when §3.6's contact rule refuses it — its interior passes within `attractCm` of a
   shallow reflex vertex (one the reflex pre-cut left, being no deeper than the band's plot depth) or touches an
   antenna — its foot **slides along the longest run** in steps of 2 · `attractCm`, alternating sides of the midpoint
   (first toward the run's lower (y, x) end), each candidate re-clipped and re-tested under the rung's work limit, until
   the contact rule passes: for k shallow reflex vertices at most 2k candidates fail, since each refuses a foot interval
   of at most 2 · `attractCm`, and a run as long as the band's minimum block width holds hundreds of steps; a run too
   short to hold one passing candidate is a face below the band's block width, which step 1 already types a block; the
   slide draws nothing and is reported as `W_CUT_SLID` with its step count (J-Fredteam-1); (d) substitution — F becomes
   a court, green or landmark block chosen from the district allocation's pending claims (NG's substitution rule, K6) —
   **only for faces ≤ 2 × the band's upper block area**; a larger face reaching (d) is cut by (c) again — that slide,
   never a repeat of a refused cut. No rung restarts anything above F.
   Every district reports the share of its built land left as court or green by substitution (soft bound ≤ 5 %), so
   MFCG's "empty areas inside city walls" cannot return silently.
9. **Width (COV-NG-N20).** The new way's width, one scalar per lane: `w = w_lo + Δw · min(1, L / L_ref)^p` with
   `Δw = w_hi − w_lo` — `[w_lo, w_hi]` the cut's class's metric width band (alleys 2–3 m, lanes 3–5 m), L its final
   kerb-to-kerb length, `L_ref` the district OBB's major extent (its working major-axis length), and `p` one draw per
   district on `cut.width`, with ln p uniform between ln 0.5 and ln 2 (`p = 0.5 · 4^u`; both powers by `dmath.pow`,
   §6.5 (3)) — longer cuts are wider, saturating at the band's top (provenance `ref:NG 1.2.2 width law (code)`, P8,
   re-expressed in metres; the former free-end term is withdrawn — it was a drawing artefact; J-A40.41). In a walled
   regime a cut that exceeds the lane length band is typed `secondary`. Never narrower than a lower class (O4 c). Template roads take fixed
   per-district widths (II.2).
10. **Continuation (J-P11).** A cut may **continue across an existing lower-or-equal-class street** when collinear within
   6° (the rare crossroads) — **only inside its own district**, never across a district-boundary edge (GEO-42).
11. **Recurse** on both children with their own sub-streams.

**The deep-interior rule (IMP-8, GEO-25; J-P15).** When recursion stops and a block's local thickness exceeds twice its
band's plot depth, the district's band row chooses the interior **now, in S8**, by target shares: `court` (a hollow block,
perimeter plots around a shared court — MFCG's donut and NG's hollow block), `back_lane` (a lane spine through the middle,
parallel to the longer frontage), `through_alley` (an alley spine joining two opposite frontages), `rear_plots` (a second
row of plots reached from the frontage through the front row). Default shares — poor: court 0.35, back lane 0.25,
through-alley 0.30, rear plots 0.10; modest: 0.45 / 0.30 / 0.15 / 0.10; prosperous: 0.65 / 0.15 / 0.05 / 0.15; rich:
0.75 / 0.10 / 0 / 0.15 — our own values, calibrated at M-1 on NG's hollow-block frequency in the vertex captures (an
output of NG 1.2.2's no-frontage rule on its block and lot sizes) and MFCG's inner-lot removal in the size-sweep exports;
the rows are keyed by §4.5's band set (a band without a row interpolates, item 27). The lanes and alleys chosen here are
inserted as L1 spines in S8's own district batch (S10 never writes L1, §4.1), so no sibling block is left stale; dense
poor quarters get many narrow alleys and still keep courts, rich quarters keep gardens behind their houses. Keep-test:
the court share of deep blocks within band per class (§13.5).

**Hidden plots, and how a court or a rear row is reached (item 30; owner: "plots that do not have a direct access to
streets … only accessible via alleys … slums or hidden or clandestine places outside of public view").** A `court` or
`rear_plots` interior is reached from the public way in one of three ways — the block's **reach**, drawn here with the
treatment and recorded beside it (`Block.reach`, §2.5) — and S10 builds what the reach names:
* `open` — an open slot between two front buildings, an alley face (§4.7 S10 (9)) or the L1 spine of a `back_lane` or a
  `through_alley`: the court or rear row is in view from the street. This is the references' every-plot-fronts-a-street
  baseline — MFCG and FTG give every building a street, NG's infill yields open back lanes and courts — and the parity
  presets' only value (item 23);
* `passage` — a **covered way under a front building**: an L3 face of kind `passage` (an alley-as-face, §4.7 S10 (9);
  §2.5) of width `passage.widthM` (2.4 to 3.5 m by band) that S10 cuts along one side line of the front plot the rule picks —
  the plot of widest frontage in the middle third of the run — from the kerb to the court or the rear row; the front plot
  keeps its identity and its footprint ends at the passage's edge, and S11 gives its building a wing that **spans** the
  passage at every storey above the ground (`BaseWing.spans`, §2.6, which a composition inherits: the passage takes the
  ground storey's cells, the storeys
  above keep the frontage continuous; the plan rung reserves those cells, item 28). A passage is chosen only where the
  front row is continuous — the band's arrangement is `row` (§4.7 S11) — so the arch sits in a streetwall; where the
  buildings stand apart the reach stays `open`;
* `gated` — an opening in a frontage enclosure: the `PlotBound` gate of a compound's wall or a gatehouse arch (§4.7 S11)
  into a **private court** — a rich house's hidden garden court, a guild's or an inn's court — chosen only where the band's
  arrangement is `compound` or `detached`.

The reach weights are band rows — squalid and poor: open 0.25, passage 0.75, gated 0; modest: 0.70 / 0.30 / 0;
comfortable: 0.80 / 0.15 / 0.05; prosperous: 0.60 / 0.05 / 0.35; rich: 0.30 / 0 / 0.70 — interpolated along the prosperity
value, the non-open weights scaled by the density value (× (0.5 + density), so the densest blocks hide the most) and by
the rung (TOWN 0.6, CITY 1.0, METROPOLIS 1.2; the village rung rows are 0, PART III); the draw is the block's interior
draw (`cut.interior`, one pair: treatment, reach). Each band row also states its **hidden-share target** — the district's
share of plots whose exposure is `hidden`, below: squalid 0.20, poor 0.12, modest 0.04, comfortable 0.02, prosperous
0.04, rich 0.08, ± 0.03 — read for a district at its plots' area-weighted mean prosperity value (interpolated between the band
rows) and scaled as the reach weights are, by the rung's factor (TOWN 0.6, CITY 1.0, METROPOLIS 1.2) and by (0.5 + the
district's area-weighted mean density value), capped at one; the base weights are fitted at M-1 on B-CITY so that
every rung's districts meet their scaled targets, and §13.2's bar checks each district against its own (§13.7's row
holds the fit's fallback; our own values, calibratable, J-T; 0 in the parity presets and at every village rung). The share is made deliberately,
never left over: the slum's back courts and rear tenements behind a passage at the bottom, private gated courts at the
top, few in between (J-A30.41).

**Exposure — how a plot's reach is named (item 30 (a)).** When S10 types a plot's access edges it sets `Plot.exposure`
(§2.5) by reading the block's **interior access graph** — its plots, alley faces, passage faces and court residues, with an edge
between two nodes that share an L3 edge, and the public kerbs (the corridor edges of every L1 way, `alley` and
`cul_de_sac` spines included) as the roots — by adjacency and reach depth, never by a sight line (J-A30.42): `street` —
an access edge on the kerb of a `through`, `primary`, `secondary` or `quay` way; `lane` — on a `lane`, `cul_de_sac`,
`track` or `path` kerb (S8's back lanes among them) and none on a street; `alley` — only on an alley face or a
`through_alley` spine's kerb, each open to a public kerb at its ends; `court` — only on a court residue whose own reach to
a public kerb is one `open` step; `hidden` — every access edge lies on a face whose reach to any public kerb passes
through a `passage` face or a `gated` opening, or through two or more interior faces; `sealed` — a hidden plot whose every
reach passes a sealed passage (§2.8, §4.11). The access guarantee is unchanged: every plot, hidden ones included, has ≥ 1
access edge and a chain of access faces to a public kerb (F-PLOT, §5.2; the chain-reachability bar is §13.2's). Knowledge
is a separate fact: `knownTo` on the plot, building and institution records (§2.5, §2.6) takes §2.5's default and is
otherwise a dossier fact; it moves label visibility and the reader's answers (§9.2), never geometry, and a `local` or `secret`
institution prefers hidden plots through the placement solver's `exposure` row (§4.7 S10b, item 16; a concealed
institution's mode and front: §4.7, item 63). At the city band a
hidden court draws as a court behind buildings — ground and `court` tones under the building masses (§8.5) — never as an
empty block. Hidden plots arise, are sealed and reopen over epochs by §4.11's kinds, and a user seals or opens a passage,
hides or reveals a place, by §7.1's events; villages have no hidden share by default (PART III).

**Holes (the case of NG 1.2.2's hole-aware bisector, C13 — ours).** A cut that would cross a hole is routed to the hole's
boundary (a *slit*, committed by `connectHole`, §3.4), the annulus becomes simply connected, and the same ladder applies
(step 2's holed position law and step 4's halved offset); this is the primitive the stage-2 ring template needs (II.2).
Cuts are inserted as `lane` / `alley` / `secondary` spines, so lanes are real ways in the same graph (NG's look on FTG's
substrate). Junction fillets at street corners are a style-time smoothing (Urban Places' arcs), not a model change.

**Partition recipes (COV-MFCG-G03).** The same module exposes `PartitionRecipe` rows built only from the kernel's
`splitFace`, `radialSplit`, `ringBand` and `insetRing` (§3.4): `fan` (k radial cuts from the centroid with alley-width
gaps), `semiFan` (from a boundary vertex) and `ring` (an inset band around a court, split into segments by slit cuts, short
sides first). Park layouts (§4.9) and institution templates (cloister, quadrangle; §4.7 S11) use them.

**The strategy slot.** S8 calls `FabricStrategy.partition(district)`; the base registers `BentCutFabric`; stage 2
registers `RingFabric`, `SquareFabric`, `StreetFabric` (G-P2, §14).

**An alley that presents itself; back courts across epochs (items 29, 30 and 31).** For item 29's side and rear
entrances an alley "presents itself" exactly when this rule's `back_lane`, `through_alley` or `rear_plots` treatment,
or S10's alley rung and passage choice (§4.7 S10 (9)), gives the plot an access edge beyond its frontage (`Plot.access`,
§2.5); the entrance rules of §2.6 read that edge set and nothing else. Across epochs §4.11's rung 2 makes and unmakes such
interiors on standing plots: `densify … back_court` cuts a yard into rear plots reached by a new passage where the
passage choice above allows one and the plot's manifested band's row (§4.11's floor) carries a rear-plot or hidden share
— a middle-floored plot's yard is infilled instead — and `thin … back_court` clears one — its households re-homed and
its buildings vacated first, as §4.11's rung 2 states — and seals its passage, each a recorded event through this rule's shares, never a re-cut of the block's interior.

=== REPLACE ## II.5 What the base already carries for stage 2 (all base requirements in PART I) ===
## II.5 What the base already carries for stage 2 (all base requirements in PART I)

Typed boundary edges with `hard` flags and portals in the shared `Seam` records of every district (§2.5, II.1), the lane ends
S8 puts on boundary spines included (§4.6); shared geometry owned by the base (§2.2) with the seam-amendment protocol and
`splitThrough` (§3.4, II.1); plot lines and alleys on the boundary (§4.7); seam-continuous prosperity, density and greenery
fields with hard / soft seams (§4.5); per-district streams keyed from each district's lineage (§6.1); the hole-aware bent cut
with its restated recipe (§4.6); the `FabricStrategy` slot (§14, G-P2) with `BentCutFabric` registered from M1 and the three
template fabrics at M5; stored wings, boundary treatments and the complete pin vocabulary (§2.5–§2.7); the neighbourhood LOD
band declared in the display list and the `hatched` programs (§8); the world-aligned tile pyramid (§8.8), invalidated by
per-district dirty regions; the per-district regeneration budget (§12.6); the close-up persistence rule and the
instance-override event (II.4, §7.1); the sky context and outline templates (§2.1, §4.2, II.6).

**Stage-2 readiness of the base itself (M1 exit, before any close-up generator exists):** on every B-CITY city every
district's `SeamContract` view resolves completely — every boundary run belongs to exactly one `Seam` record, every seam edge
carries one of II.1's types (a way-less reservation boundary between two districts as `reserve`, with its two margin-band
parts), every portal's vertex resolves, every `baseLane` portal matches exactly one S8 lane end and every lane end on a
boundary spine one `baseLane` portal — 100 %; and a New random on each of 20 districts per city changes nothing outside its
seam exception (II.4).

**Stage 2 itself (M5 exit, §16), read from II.1's `SeamReport` — stage-2 feature S1's acceptance:** portals connected 100 %
(added portals included); shared-edge Hausdorff distance 0; field jumps on soft seams within band; the footprint hash at
neighbourhood LOD identical to the city-LOD hash for every entity a refine close-up covers; opening a district ≤ NG's recorded
10–96 ms at comparable counts, and per-district regeneration ≤ 30 ms (§12.6); rerolling one district leaves every other
district byte-identical outside the seam exception (II.4); the model hash unchanged by opening, closing or reopening any
number of districts.

The elaboration record per rung (§2.8) and the elaboration cache (§2.9), with the `elaborate` view key (§4.1) and the stale
marker (§8.5): the base's carriage of item 28's click policy, which stage 2's close-ups and stage 3's rungs share.

=== J-ROWS ===
| J-A33.41 | §4.6's recipe is cited as the mechanism of NG 1.2.2's plain bisector, read in its code and restated in metres; the profile's statistics remain §13.5's targets; MFCG 12710731 and VG 1.6.9 are named where they differ (step 5) | §4.6 |
| J-A33.42 | the slope term kept as our own rule — provenance `own`, an `extension` over both references with mode `option`, off in the parity presets | §4.6 |
| J-A34.41 | the stop test keeps the OBB minor extent as its quantity and draws its threshold per face, `τ = e_lo · (e_hi / e_lo)^g`, `g` the folded four-uniform bell from `cut.stop` | §4.6 |
| J-A34.42 | the block-depth range stated once in §4.6 step 1 — `e_lo = max(2 · d_lo, r_lo)`, `e_hi = max(2 · d_hi, r_hi)` from the granularity law's plot-depth band and the regime floor; `d̄` is the band's plot depth and `e_hi²` its upper block area; §4.7's table gains no block column | §4.6 |
| J-A35.41 | the cut position `f = (c + b) / 2` (centroid fraction plus a three-uniform bell), no outlier, clamp or redraw; holed faces `b` rescaled to `[m, 1 − m]`, `m` capped at 0.45; σ a measured output | §4.6 |
| J-A36.41 | a deterministic start — the candidate on the run most nearly parallel to the working major axis — replacing the `cut.side` coin and the `cut.sideLongerBias` row; the runs stay ours | §4.6 |
| J-A37.41 | K, the corner, comes first and the far run is chosen from it — of the facing runs K reaches unobstructed, the one meeting the first leg nearest a right angle; J-P16's perpendicular-ray far side, `cut.farSideAlt` and its fallback chain are superseded | §4.6 |
| J-A37.42 | `cut.bendMode` is `flatten` (NG 1.2.2) in the base, with `cut.flattenM` 0.7 m; the `MFCG` parity preset reads `straightFirst` and an 8 m `cut.flattenM` | §4.6, §7.6 |
| J-A38.41 | the fillet decided by deflection and shorter leg — kept sharp with probability `s + (1 − s) · min(1, w_min / ℓ)`, `s = sin²(δ/2)`, otherwise an arc spanning the shorter leg; lane and street cuts only; the constant 0.53 and `r_t` go | §4.6 |
| J-A39.41 | the bounded ladder kept; its rung (a) re-plans in frames turned by 36° (at most three frames) instead of redrawing `f` on the same frame | §4.6 |
| J-A40.41 | the lane width `w_lo + Δw · min(1, L / L_ref)^p` (`Δw = w_hi − w_lo`), one `p` per district with ln p uniform between ln 0.5 and ln 2; the free-end term withdrawn | §4.6 |
=== RATIONALE-A ===
| J-A33.41 | Chose to cite §4.6's recipe as NG 1.2.2's plain bisector as read in its code — reader-tier, reaching implementers only through the sanitised digest — and restated in our metric terms, keeping the profile's measured statistics as §13.5's targets and naming MFCG 12710731 and VG 1.6.9 where they depart from it (their straight-first test, step 5), over leaving the citation on the profile's addenda as "the measured default", because the code shows that the measured numbers are the products of a mechanism we can now state, and the bisector exists in two versions — NG 1.2.2 always builds the bend while MFCG 12710731 and VG 1.6.9 first try a straight cut — so a citation without its build would misdescribe one of them. The measured statistics stay valid parity targets when measured the same way (item 41, §13.5); every default that steps 1–9 take from the code carries `ref:… (code)` provenance with its P-id (P1–P8), the trace key of §17.1 (§4.6; amendments-c item 33). |
| J-A33.42 | Chose to keep step 1's slope term — the working axis turned toward the contours on a face steeper than 5 % — as our own rule, provenance `own`, its cell marked `extension: { over: 'both', mode: 'option' }` so that the `MFCG` and `FTG` parity presets switch it off, over dropping it as unsupported and over the old citation that MFCG's single elevation effect falls on its alleys, because the realism tiebreaker favours lanes that follow the fall line and blocks that lie along the contours, and the code reading shows that MFCG 12710731 carries no terrain field at all: the citation was false and the rule was always ours (§4.6; item 33; J-A23.71). |
| J-A34.41 | Chose to compare the OBB's minor extent with a threshold drawn afresh for every face — `τ = e_lo · (e_hi / e_lo)^g`, with `g` four uniforms folded into a bell over [0, 1] whose mean is 7/30, from the new concern `cut.stop` — over the per-face threshold on area that NG 1.2.2 and MFCG 12710731 draw and over the former single fixed threshold at the band's upper end, because the plot model needs a block deep enough for its frontage rows, which is a length and not an area (a burgage's depth runs back from the street), while a threshold drawn per face is what gives the references their spread of block sizes — most faces stop near the shallow end and a few run deeper — which no fixed value can produce. The draw uses four uniforms and the power goes through `dmath.pow`, so the determinism rules are untouched (§4.6; item 34). |
| J-A34.42 | Chose to state the block-depth range once, in §4.6 step 1 — `e_lo = max(2 · d_lo, r_lo)` and `e_hi = max(2 · d_hi, r_hi)`, two back-to-back rows of the band's shallowest and deepest plots with the stage regime's floor under them — and to define there the band's plot depth as the mid depth `d̄ = (d_lo + d_hi) / 2` and its upper block area as `e_hi²` (what the reflex pre-cut, the deep-interior rule and substitution read), over adding a block column to §4.7's granularity table, because the plot depths already live in that table and the regime floor in §4.4's, so deriving the range keeps one home for each fact and leaves §4.7 as it is, while the former text named "the district class's block band", which no table carried. With these definitions the deep-interior rule (J-P15, unchanged) fires on exactly the blocks the draw lets run deeper than two mid-depth rows. The depth rows and the regime floors are re-fitted at M-1 under this reading (D-19's calibratable rows), so the defaults are a starting point, not a claim of calibration (§4.6; item 34). |
| J-A35.41 | Chose NG 1.2.2's position law, restated — `f = (c + b) / 2`, halfway between the centroid's relative position on the working axis and a three-uniform bell, with no outlier term, clamp or redraw; on a holed or annular face `f = m + (1 − 2m) · b` with no centroid term and `m = min(0.45, e_lo ÷ the outer ring's OBB length)` — over the measured law, a normal draw about the middle with a small uniform outlier share and one redraw near the ends, because the centroid term cuts a lopsided face toward its mass so both children get balanced plot depths (realism), the bounded support needs no redraw and no extra draw, and the measured spreads (σ of 0.066 on plain and 0.098 on holed faces) and the thin tail are this law seen through the measurement's frame and the turned-frame retries — outputs that §13.5 keeps as targets, not inputs. The 0.45 cap is ours: it keeps a little spread on a narrow ring band (§4.6; item 35). |
| J-A36.41 | Chose a start without a draw — of the minor-axis segment's two ends, the one lying on the run whose chord lies most nearly along the working major axis (ties: the earlier run in boundary order) — over the coin `cut.side` with its `cut.sideLongerBias` row, because none of the three builds tosses a coin here (each begins on the crossed side whose chord best matches the long axis), the recorded 2 : 1 lean was this rule seen through merged sides, and a deterministic start saves a draw per cut at no locality cost; the runs (GEO-22) stay ours, because working on raw edges is what makes NG 1.2.2's arrivals inexact (§4.6; item 36). |
| J-A37.41 | Chose to fix the corner before anything else — a bell-drawn distance out from A on the free first leg, no nearer than the lower block depth `e_lo` to either end (half that on holed faces), at mid-leg when the leg is shorter than twice that — and only then to pick the far run as the corner sees it: of the runs facing the first leg that the corner reaches square and unobstructed, the one meeting the first leg nearest a right angle — over J-P16's far side struck by a ray square to the start, with `cut.farSideAlt` and its three-step fallback (0, then 0.34, then the minor-axis line), because this is how all three builds cut, the 34 % mismatch the profile measured against its ray rule is exactly this corner-first choice, and a rule that reproduces the measurements needs no fallback; J-P16 is superseded, and M0 (b)'s comparison with NG on the same faces becomes the check of the adopted rule (§4.6; item 37). |
| J-A37.42 | Chose the table row `cut.bendMode` with two sourced values — `flatten` in the base (NG 1.2.2 always builds the bend, then drops it when the triangle start–corner–foot is lower than `max(cut.flattenM, 0.02 × the chord)`, with `cut.flattenM` = 0.7 m) and `straightFirst` as the `MFCG` preset's value (MFCG 12710731 and VG 1.6.9 go straight whenever the first leg reaches its far run within `asin(√0.99)` of square, ≈ 84.3°, while the children pass step 8's checks, and otherwise bend as under `flatten`), the preset also reading `cut.flattenM` = 8 m — over `straightFirst` as the base default under emulation-first, because §1.4 takes NG 1.2.2's bent cut for the base's walled fabric and the bent-cut signature of §13.5 is NG's (the owner-facing definition names the bent cut and NG's measured constants), while the `MFCG` preset must reproduce MFCG's own street signature (§13.5), which its own square test and its own flatten height give: two of its model units at its 4 m export unit, the same flatten test in all three builds (P5). The base's 0.7 m is ours: NG 1.2.2's two model units read through its export scale of 0.35 per unit, an inference that Fable's evidence gate released as such, recalibrated at M-1 on that signature. A preset that carries a value, not only a zeroed extension, needs §7.6's per-preset value rule, which the determinism part states (§4.6, §7.6; item 37; Fable J-Fcode-2, J-Fcode-3). |
| J-A38.41 | Chose NG 1.2.2's fillet rule, restated — a corner stays sharp with probability `s + (1 − s) · min(1, w_min / ℓ)`, `s = sin²(δ/2)` (δ the deflection, ℓ the shorter leg, `w_min` the band's least plot frontage), otherwise it is rounded into a circular arc spanning the whole of the shorter leg, sampled in chords no shorter than `w_min`, and it stays sharp when the arc has under three points or leaves the face; lane and street cuts only — over a constant 53 % fillet chance with a tangent length drawn around 0.73 times the shorter leg, because a rule under which sharp turns and short legs keep their corners while gentle turns on long legs curve is legible and realistic, the measured 53 % is its output (the rule predicts 209.9 fillets where 200 of 378 were observed), and the 0.73 was the measurement's reconstruction of the legs, not a drawn ratio; MFCG 12710731 uses the same predictor (§4.6; item 38). |
| J-A39.41 | Chose to keep the bounded ladder — reflex pre-cut, turned frames, the straight cut, the always-succeeding cut, substitution, no restart (D-9) — and to make its rung (a) a re-plan in the working frame turned by 36° (attempt k at k × 36°, at most three frames in all) with fresh position and corner draws, over rung (a) redrawing `f` on the same frame and over the references' ten turned frames after which NG 1.2.2 leaves the face whole and MFCG 12710731 restarts the whole city, because a redraw on the same frame tends to fail the same way while a turned frame is a genuinely different cut, and a bounded ladder ending in substitution never loses a face or a city; the turned frames use the stream key's existing `attempt` component, so no concern or cap changes. The former citation of NG's logged retry as rung (a)'s source is withdrawn: NG 1.2.2's plain bisector retries silently, and its logged loops belong to its hole-aware bisector (§4.6; item 39; Fable J-Fcode-1). |
| J-A40.41 | Chose the lane width `w = w_lo + Δw · min(1, L / L_ref)^p` with `Δw = w_hi − w_lo` — `[w_lo, w_hi]` the class's metric band (alleys 2–3 m, lanes 3–5 m), L the lane's kerb-to-kerb length, `L_ref` the district OBB's major extent, and one `p` per district drawn from `cut.width` with ln p uniform between ln 0.5 and ln 2 — over the linear law with a term per free end, because NG 1.2.2 widens a lane as a saturating power of its own length (restated from the seed alone, that law reproduces every drawn width of eight maps to an rms of at most 0.0008 model units) and has no term for free ends: the length fit had read the drawn junction ends, which overshoot the cut, as a width effect. We keep the law's shape — longer cuts wider, saturating — inside our metric band rather than its per-map constants (§4.6; item 40). |
=== END ===
