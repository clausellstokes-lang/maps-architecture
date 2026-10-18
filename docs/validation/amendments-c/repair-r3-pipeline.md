# repair-r3-pipeline — lane amendments-c/repair-pipeline-r3 (PIPELINE part: §4, §10, PART II, PART III): block file per
# the BLOCK PROTOCOL. Text before the first "=== " line is ignored. The lane's report, ledger and receipts are
# docs/validation/amendments-c/repair-pipeline-r3-report.md.
# Base: docs/ARCHITECTURE.md sha256 3daa0b0731b8c76f… and docs/ARCHITECTURE-RATIONALE.md sha256 bfa20419ca4dd6e5…
# (assemble-r2's output, validated by amendments-c/validate). Each REPLACE body is the live subsection with
# count-asserted exact substitutions (scratchpad rp3c/gen.py); every untouched line is verbatim, and every substitution
# keeps its lines' count, so each REPLACE keeps its subsection's line count and every later line keeps its number.
#
# ASSEMBLER HAND-OFF
# (1) RESTATED ROWS. J-ROWS restates J-A88.42 (index); RATIONALE-A restates J-A88.42, J-A42.41 and J-P37 (Part A).
#     apply-blocks.py appends them and notes "DUPLICATE ID"; move each appended row into the older row's place and
#     delete the older row (swap_restated): index {J-A88.42}, Part A {J-A88.42, J-A42.41, J-P37}. J-A42.41 and J-P37
#     are restated in Part A only (their index rows are unchanged, as J-A66.01 was in round 2), so the audit's
#     part_a_without_j_rows lists exactly those two. No new id.
# (2) VD2-03's hand-off (docs/validation/amendments-c/repair-determinism-r3-handoff.py) finds its '§7.7 item 2' contexts
#     inside §4.11 and §10.2, among others. This file's REPLACE bodies carry every one of them verbatim, and each keeps its
#     line count. The new pointer '§7.7 items 5, 11 (b)' (§4.7) does not match the script's item-1/2 pattern. The script
#     was run on a combined copy (all repair-r3 files applied, rows swapped) and exited 0.
# (3) This file REPLACEs §4.6, §4.7, §4.11, §10.2 and II.7.6 — all pipeline-owned. No other repair-r3 block file on disk
#     at write time REPLACEs any of them (checked before each block).

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
   read are NG 1.2.2's measured outputs of this law, never its inputs (J-A35.41).
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

**The staged crime term (item 88; J-A88.41).** When the dossier port fills §10.2's staged crime row (`PortRows.crime`: the
settlement's crime scalar in [0, 1] from the dossier; schema-complete and empty in the base, like §2.7's staged records),
it multiplies each district's hidden-share target above by `1 + crime.hiddenScale × crime` (default 0.5), item 64 (b)'s basement-access probability (II.7.3's *Basement accesses* (2)) by `1 + crime.accessScale × crime` (default 1.0) and item 65's undercity demand (II.7.5's size law) by `1 + crime.undercityScale × crime` (default 1.0) — its three readers, each citing this statement; the row empty, every factor is 1 and nothing changes (our own rows, `extension`, 0 in the parity presets).

=== REPLACE ### 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b Placement · S11 Site plans and footprints — the plot model ===
### 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b Placement · S11 Site plans and footprints — the plot model

**S9 Corridors (L2).** `corridorUnion(l1Faces)` (§3.7), the single kerb function, commits exactly the kerbs S8 cut
against — half-corridor strips, junction wedges and **built blocks**. It runs once per district and once for the
hinterland's faces; a wall strip's L2 is its half-corridor strips along the arterials at its gates (and along the
intervallum, where there is one) and one built block, the strip block (§4.8). The main plaza is S3's reservation, typed
as a `square` face; other squares come from S7b claims sized from population (O7); gate plazas and forecourts from S7
(§4.8). Streets exist as geometry from here on; "negative-space streets" is purely a style, and §8's figure-ground
contract fills blocks in a ground tone.

**S10a Block allocation and field pass 2 (eager, town-wide; LC-2, FTG-1).** Each district's `Allocation` (S7b) is
distributed to its blocks in three declared steps, from the district's `alloc.block` stream (keyed from the district's
lineage; §2.5, §6.1), blocks by score then id: (i) the **field-driving classes** — noxious trades, middens, prisons and
institutions below a block — first, by scores that need no prosperity (downstream, downwind, extramural, frontage class,
adjacency); (ii) **field pass 2** adds their kernels to pass 1 (§4.5), from which each district's band range is written and any household S7b allocated outside it re-homed (§4.5 (5)); (iii) every other class — households by band,
ordinary workplaces, shops — by capacity per band under pass 2, sub-districts receiving contiguous block groups sized to
their clusters (COV-FTG-E02). **The block score is S10b's rule score at block granularity (item 16):** a class's relation
rows and supply edges (§10.2) are evaluated against the block's context — its frontage classes, the distance rasters at
its centroid, the classes already allocated to it and to the other blocks of the town — so a brewery's block scores its distance
to the blocks that hold its maltings and granary and a tannery's block its downstream, downwind and extramural rows before
any plot exists; hard rows filter blocks, soft rows and supply distances weight them. The result is persisted as one
block-level `Allocation` per block. From here on every district's S10, S10b, S11 and S12b, and the hinterland unit's, is a
pure function of these records and its own sub-stream, writing only inside its own faces (§4.1), so the town's content
does not depend on derivation order, viewer order or worker count.

**S10 Plots (L3) — frontage-first with the granularity law (O5 / O18), per block.**
**(0) Shared-edge bands, eager (J-I9).** A block whose `interior` is `wall_strip` (§4.8) gets no plots. Its L3 content is
built **eagerly on the generation worker, after S10a and before the pool's freeze**, in one step that covers the strip
blocks on both sides of each trace at once — the band's cross edges split the trace, which the two sides' districts share,
so no district overlay may write it (§3.3 pool steps 1 and 3; cost §12.4). The batch commits, by `bandUnion` (§3.7), the
enceinte's half-band on each side of the wall edge; the rest of each strip — the inner setback, or the outer setback and
glacis, or the berm up to a moat — as typed unbuildable residue (`setback`, `glacis`; `ditch` in place of `glacis` on the
town side of an `on_enceinte` bailey whose castle template row asks for a dry ditch, §4.8); and each side's parts of every
tower and gatehouse on the trace. The same eager batch lays §4.5's **margin bands** along the settlement perimeter and
along any reservation boundary two districts share. The enceinte's `band` and `glacis` (its `ditch` parts included) and
each tower's and gate's `footprint` are the unions of these parts across the strip blocks (§2.7). S9 has already committed
the strip's corridors and nothing after S10 writes L1 or L2, so no batch ever clears or splits these faces. The step ends
by rebuilding the L3 static partitions it touched, so a pooled plot line finds the band's inner edge through the index
(§3.3 pool step 1). A regeneration re-runs this step one-sided for its own scope (§7.3 item 2). A castle's curtain band is
built the same way inside the bailey's blocks. The hinterland unit's S10 builds §4.9's hinterland recipe — furlongs,
outside lots, driveways, trails, woods and edge orchards — instead of frontage-first plots.

For every other built block: (1) classify each kerb edge as a frontage by way class; (2) read the block's context
(district kind, prosperity value and recorded band, density, growth stage) → the **granularity table** gives target
frontage-width and depth bands, a join maximum and a vacancy-run share, interpolated along the prosperity value and scaled
by the rung's `RungProfile.granularity` (frontage × and depth × on every band; the rich band's join maximum
+ `joinMaxDelta`; §1.1, AM-4) — `GranularityLaw.bands` takes the rung (§14). The band rows are §4.5's band set, whose
default cuts reproduce the references' wealth classes (item 27); every re-derivation other than a rung-3 event of §4.11's
ladder reads the block's **manifested band** — the field band raised to its plots' geometry floor by §4.11's block-level
reading (item 31; J-A31.43) — for every geometry row, and the field band for occupancy, condition and labels; the band row also carries the target share of
interior and hidden plots that S8's deep-interior rule and this stage's cut meet together (§4.6, item 30):

| band (default rows; all calibratable, J-T (§13.7)) | frontage width (m) | depth (m) | join max | vacancy-run share of frontage | reference anchors |
|---|---|---|---|---|---|
| poor / dense | 4–6 (log-normal, CV 0.25) | 12–20 | 1 | 0.03 | NG 95–99 % attached, party walls 39–43 % of perimeter |
| modest | 6–9 | 18–30 | 2 | 0.06 | FTG quad side median 10.3 m, footprint median 103 m² |
| prosperous | 9–14 | 25–40 | 3 | 0.08 | MFCG ≈ 18.6 lots per block |
| rich | 14–25 (joined) | 30–60 | 5 | 0.05 | "fewer, bigger buildings, bigger yards and courts" (owner) |
| institution / assigned | by requirement class | by requirement | whole block above a share threshold | — | FTG landmark-first |

(The block's `interior` — court, back lane, through-alley or rear plots — was chosen by S8, §4.6.) (3) **Claims first:**
institutions and assignments *smaller than a block* `claimSubFace` (which may span several faces, §3.4) the contiguous area
and frontage class their requirement demands — the requirement is the designation template's size budget (S11, item 19) —
before ordinary plots are cut (larger ones are S7b reservations already); claims-first covers every claim that exists at
generation: the roster's institutions and requirement classes, and every assignment or dossier element present in the
recipe when the town is generated (they enter S2's demand, so a brand-new map holds them from the start; §7.7, item 22 (d)).
An assignment or dossier element that arrives after the city is built is placed by S10b's solver and applied by S11's
mutation instead (§7.7). (4) **Per-frontage regions
(GEO-24; J-P13):** the block (minus claims and the S8 interior) is partitioned into one region per frontage run by its
straight skeleton, each region's depth capped by the skeleton height and the band depth — if the skeleton is downgraded
(F-SKELETON), a reflex pre-cut partition (a perpendicular cut from every reflex vertex, built exactly from `sideRuns` and
`splitFace`) is used instead; the validated skeleton arcs enter the arena through `insertChain` (§3.8) — and plots are laid
as strips perpendicular to each region's frontage, widths drawn from the band, depth = min(band depth, region depth); side
lines are bent lot cuts perpendicular to the frontage arriving at the region's rear line (the creator's stated use of the
primitive for buildings, `watabou-extra-a.md` §2.1); strips never leave their region, so reflex corners, notches round
cul-de-sacs and the inside of tight curves cannot produce overlapping or hourglass plots (property test: §13.2).
(5) **Corners and seams:** the corner plot takes the higher-class frontage and the shorter frontage's depth; the wedge left
between two regions becomes a corner plot when it meets the minimum width and angle, else a declared `wedge` class
(bounded < 0.5 %) or residue. (6) The residue is typed: `court` (from the S8 interior), `yard` (assigned to the adjacent
plot when its area < 1.5 × the plot), `green`, `vacant`, `shore` (the shore setback). (7) **Joins and splits, one law:**
strips are cut to the band's lower end, then a merge operator joins k adjacent plots (along a frontage, or back to back
keeping a frontage) up to the band's upper end, keeping `members`; poor bands stay at the lower end; both directions read
the same context vector — one code path (O18 g). **Orderings (item 31):** a join takes vacant or same-owner neighbours
first, then a rear plot into its front plot, then the frontage neighbour with the shorter frontage; a split takes the widest
frontage first, then the deepest yard. A designation's size budget (S11's template) is what a join is asked for — by this
stage at generation, by S10b's solver for a later placement (a JOIN request) and by S11's mutator when a designation
outgrows its plot; a larger class placed by S10b's class mix asks this law for its join (item 71). Across epochs the law runs in its incremental form — a due block re-cut with its neighbours fixed, under
§4.11's ladder, churn cap and geometry floor (item 31) — and a plot vacated by decline merges into a neighbour's garden or
a field by the same operator (`plotToGarden`, `amalgamate`; §4.11, item 8). (8) **Vacancy runs (COV-VG-VN-170):** runs of
frontage totalling the band's vacancy share, each at least one band frontage long, are left unbuilt from the
`plot.vacancy` stream — typed `vacant`, or a `garden` yard joined to the neighbour — so no built block is necessarily fully
ringed. (9) **Alleys:** slivers narrower than the minimum plot width that connect two ways become `alley` L3 faces, not
spines (GEO-25); where the frontage is continuous, §4.6's rule may reserve a covered **passage** under the front plot's
building instead of an open alley (item 30; the passage face is §2.5's).
(10) Every plot gets its `ContextVector`, its `DerivationRecord` and access edges (100 %, O5 a): every plot is built with an
access edge. The frontage-less lots of NG 1.2.2 — about 42 % of its lot leaves, its courts by construction rather than
by error — have no counterpart here outside the deep-interior rule (§4.6), which chooses a deep block's interior — a
court, a back lane, a through-alley or rear plots, and, with item 30's reach, its hidden plots — by band shares (J-P15,
J-A42.41). **Party walls** are shared L3 edges carrying the `party_wall` role in row classes, one edge per wall
(§2.2). **Unbuildable bands:** the shore setback (§4.2 S1 (8)), the wall strips — the band, the inner setback, the outer
setback and glacis (MFP-9; step (0)) — and reservations are never plotted; ribbon plots begin beyond the outer wall strip.
**Exact capacity check (FTG-2):** after the last block of a stage, plots per class × band are compared with the stage
quota; a shortfall goes to S10b's reconcile and the report (F-BUDGET-STAGE).

**S10b Placement (O7; per district; the allocation honoured) — the one placement solver (item 16).** Each block's allocated
classes are placed onto its plots by the **placement solver**, the one solver every path that puts a use on a plot calls:
this stage at generation, the hinterland unit's S10b on its outside plots, every `assign` event (§7.7), a dossier event
and a positive placement (§7.7, items 20 and 22) and the relocation of a use across epochs (§4.11, item 17). Its inputs are
data: the **relation templates** and **supply edges** of the class rows and the neighbourhood kinds (§10.2), the
per-assignment overrides of `PlacementCriteria` (§7.7) and the plot's `ContextVector` (§2.5).
* **Hard rows filter, soft rows score.** A relation row marked `hard` excludes every plot that fails it; the candidates
  that pass are scored `Σ_rows w_r · s_r(plot) + Σ_edges w_e · s_e(plot)`, each soft row's satisfaction `s_r ∈ [0, 1]` read
  from the context vector — a distance row decays by its `falloff` between `withinM` and `beyondM`; a `sameStreet` row is
  1 on the frontage way of the named class's nearest placed member, 0 otherwise; a `clustered` row rises with the number
  of the class's members within its radius; `band` and `exposure` rows compare the plot's band and `Plot.exposure` with the
  row's values (item 30) — and each supply edge's `s_e` decaying from 1 at the plot to 0 at the edge's `maxDistanceM` along
  its **mode** (below). Capacity rows (`plotArea`, `plotShape`, `frontageM`) read the template's size budget (S11): a hard
  capacity row a plot cannot meet is what a JOIN request answers (S10 (7)). Candidates are filled in descending score with
  capacity accounting, ties by plot id; households take residential plots of their band ± drift. The default rows are the
  references' own placement rules — noxious trades downstream and extramural (`upstream` high, outside the enceinte),
  mills and water trades on water, inns and the market hall at tier-1 junctions or gates (the market squares themselves are
  S3's and S7b's, item 24), religious precincts and faction turf as attractors, warehouses at the harbour, frontage class
  and area fit — and the rows the references lack (the supply edges, the upwind and high-ground rows, a trade clustering on
  one street) are soft rows whose weights the table's `placement.extensionWeight` cell scales (the default is 1; the parity
  presets that §13.6's side-by-sides run set it to 0; item 23).
* **Supply distances by mode (item 16 (b)).** `street` distance comes from the class distance rasters (16 m, one linear
  distance transform per class, below) as the land distance × the rung's detour factor (a table cell, default 1.3,
  calibrated at M1 against the way-graph Dijkstra on B-CITY; *pre-decided fallback:* the factor refitted per rung); `river`
  and `sea` distance is ∞ unless plot and provider both lie within the shore setback of one navigable water body (§4.2 S1
  (8)), else the distance along that body's bank chain; `road` distance is the `street` distance to the gate through which
  the provider is reached plus the provider's distance beyond it. A gate provides the `import` resources its bearing's
  trade row lists and the harbour those that arrive by sea, so warehouses and inns fall to the harbour and the gates by the
  same rows. Inside the pooled S10b a provider is **a block whose S10a allocation holds a producing class** (eager and
  town-wide, so the laziness contract of §4.1 holds) or a placed plot of this district; a post-build request measures to
  the placed plots themselves over the L1 way graph (one multi-source Dijkstra per provider class; budget §12.6). A hard
  supply edge with no provider inside `maxDistanceM` fails the plot; S2 has already demanded the producer (§4.2 S2's need
  propagation), so the failure is a siting shortfall, never a missing class.
* **Live-in (MFP-7):** craft and shop rows default to `liveIn`; a live-in household is sited first at its workplace and
  recorded as the building's `dwelling`, so the arterial frontages are shop-houses, not workplace strips, and
  residential-only blocks stay the exception (its block-level acceptance is §13.5's). **Outside classes, and under §4.9's
  `fill` farm mode the farm households,** are placed by the hinterland unit's own S10b (under `perimeter` and `rivers` the
  farm households are town households, placed by their districts' S10b) — the same solver over the outside plots its S10
  built at S12a's sites, whose seeding scores are the outside classes' relation rows (§4.9; FTG-7).
* **Requests after the city is built** — an assignment, a dossier element, a positive placement, a relocation — take the
  **least-disruption order**: vacant plots and vacancy runs first, then under-used plots (a yard part or an outbuilding
  the template can take), then plots whose present use can move within the same district (the displaced use re-placed by
  this solver with one further level of displacement at most — §7.7's `DisruptionBudgetRow.displacementDepth`,
  default 1 — never a cascade), then a JOIN with
  a neighbour by S10 (7)'s orderings. A rejected site (§7.7's rejection record, item 20) is excluded while its rejection
  holds, a locked plot always, and a pinned assignment's plot is fixed (§7.7's precedence). Among the candidates that pass
  the hard rows the order is lexicographic — disruption cost (§7.7's `DisruptionBudgetRow.weights` for the
  request's kind: per displaced use, per join, per subtracted part and per vacated plot), then score descending, then plot id — so the town changes as little as the rules allow. Every displacement, join
  and vacated plot is a lifecycle event of the causing edit (§2.8, §7.4), and the placed plot's buildings then mutate to
  the designation by S11's operator (item 18).
* **Concealed institutions (item 63).** A concealed institution is placed as one item with its front by the concealment
  rule of this section's *Concealed institutions* paragraph (item 63).
* **Reconcile and infeasibility (O18 f).** At generation a bounded **plan–fit–reconcile** loop (≤ 3 rounds) adjusts
  *inside the district's allocation* where a class finds no plot (one more JOIN; a class demoted within its band; surplus
  capacity typed as yards, greens or vacant plots); it never reaches into another district — moving demand between districts
  happens only in S7b's reconcile and in S10a's band-range re-homing (§4.5 (5); J-A72.50) — and what it cannot place goes to F-SITING's ladder (§5.2), whose rungs this stage
  computes as: the reconcile above; then every **soft** row's weight set to 0 for the item; then the manifest reduced,
  lowest-priority classes first and never a dossier-backed item (item 20) — the report naming, for every unplaced item,
  the hard rows that blocked it and its **closest options** (the plots in order of the number of hard rows they fail,
  then score descending, then plot id — each with the rows it fails; J-A20.42). **A hard row is never relaxed
  silently:** a post-build request that no plot satisfies returns
  the same closest options as an F-EDIT action (§5.2) — choose one, relax a named row for this item, or withdraw — except a
  `dossier` request, which places at its first closest option with the hard rows it fails reported (§7.7's precedence,
  J-A20.71) — so placement never gives up silently (O18 f; FTG V1 "would regularly give up").
* *Mechanism (budget: §12.4):* context-vector distances come from per-feature-class distance rasters (16 m; one linear
  distance transform per class) computed once per model, and the provider rasters of the producing classes from S10a's
  block allocation the same way; S10b is a top-k over candidates pre-filtered by district affinity and requirement class,
  with incremental capacity. Both entry points exist, read from `recipe.entryMode` (§2.9): content-first (default) and
  layout-first (thumbnails, then populate). People are derived lazily from the household's key and pinned only by an
  explicit edit (§10.3).

```ts
interface PlacementItem { cls: string /* roster class id */; band?: string; designation?: Designation /* S11 */; count?: number /* generation: the block's allocation row */;
  id?: Id /* a Use, an assignment member or a dossier element being placed or re-placed */; criteria?: PlacementCriteria /* §7.7's per-assignment overrides of the class's relation rows */;
  pinnedTo?: Id /* a positive placement (§7.7, item 20 (g)) */ }
interface PlacementRequest { kind: 'generation'|'assignment'|'dossier'|'positive'|'relocation'; items: PlacementItem[]; scope: Scope /* the blocks or district the solver may use (§14) */;
  fixed: Id[] /* placed members kept (§7.7) */; exclude: Id[] /* locked entities */; rejected: Id[] /* plots under a live rejection (§7.7) */ }
interface PlacementResult { placed: { item: number; plot: Id; score: number; joined?: Id[]; displaced?: { use: Id; to: Id | null }[] }[];
  unplaced: { item: number; blockedBy: string[] /* relation-row and supply-edge keys */; closest: { plot: Id; fails: string[]; score: number }[] /* the closest options in S10b's order: fewest hard rows failed, then score, then plot id */ }[] }
interface PlacementSolver { place(req: PlacementRequest, ctx: StageContext, k: Kernel): KernelResult<PlacementResult> }   // one implementation, registered by name (§4.12, §14); its draws are the `siting` concern (§6.1)
```

**S11 Site plans and footprints (L4; O17; one batch per block) — the designation template and the designation mutator.** One
rule evaluation per plot, no search: the **designation template** — one per roster class (§10.2's `template` rows; item
19), keyed by band with its continuous columns interpolated along the plot's prosperity value and its discrete columns
switching at the band cut (§4.5) — gives the size budget (plot area, footprint area, floors), the structures (the slot list:
main building, workshop, forge, yard, court, stables, store, journeymen's rooms … by role and count), the arrangement,
coverage, setbacks, separation (party wall / slot / passage), the front-line jitter (an area-scaled recession of the main
slot's front, *Front-line jitter* below; item 43), the frontage treatment of the main slot (none, lean-to stall, stall, shopfront, arcaded front, gate, wall), the
yard partition, the **boundary treatments** and the **specialisation** — the designation's variant in this band, with its
room programme (item 28, §2.6): a farrier or nail-maker in a lean-to forge, a general smithy with a yard, and a master
armourer or cutler with a storefront, a court and journeymen's rooms are three rows of one smith template (our own rows).
Density is a modifier column on coverage and separation. Geometry columns read the plot's manifested band
(§4.11's plot-level read); the specialisation and the programme read the field band, so a poor smith in a once-rich
shell is a poor smith in a big house
(item 31). **Every path that creates or changes a building reads this one table** — this stage at generation, the mutator
below on every designation change, S10b's relocation (§4.11) and every assignment (§7.7), whose drift bounds bound the
mutator's adapt and add steps relative to the template. Two smiths a few streets apart differ by degree along the value,
never by switch; the default rows reproduce the references' banding — FTG's lifestyle-banded building pools and MFCG's
ward-type sizes and spacing (§4.5's band set, item 27) — and the interpolation between rows is our extension. J-A19.41
holds within a class; the class itself is S10b's class-mix draw (item 71). A front's building reads the front's template;
its concealed function adds only concealed rooms, a concealed door and a link down (item 63, *Concealed institutions*,
below). **Materials
are not template columns** — the material rule, texture and colour only, is §2.6's (J-A19.42).
The arrangement rows the template chooses among:

| arrangement | geometry | boundary treatment (default rows) | where |
|---|---|---|---|
| row | one or more footprints end to end along the frontage; **footprint = plot ∩ the frontage band of the row depth** (a boolean intersection, GEO-26; J-P14), the band set back by the plot's front-line jitter `h` (*Front-line jitter* below), so every party wall is the plot side line and, the block being one L4 batch, one shared edge even on bent or curved frontages; stored as one `quad` wing with its four corners recorded (`BaseWing.corners`; stepped quads on a slope, each with its own; J-P31, J-P39) and handed to `outline()` as fixed input (§2.6); depth from the coverage; rear yard | frontage none (the house is the frontage); rear wall (dense) or fence | dense and poor bands, shops, workshops (NG 95–99 % attached; FTG's warehouse rows) |
| set-back compound | hall or house set back behind a forecourt; **2–5 disjoint outbuildings** (stables, workshop, chapel, barn, brewhouse) placed by a small greedy packer on the plot's OBB grid around a court | **enclosure wall** (rich, prosperous; ours — NG 1.2.2 draws no enclosure — an `extension` the parity presets set to the fence, §7.6; J-A44.41) or fence, with a **gate on the access edge** | manors, inns, temples, guildhalls, farmsteads (FTG's farmstead with a driveway) |
| detached | one OBB-aligned footprint at the frontage with side yards and a path to the access edge | frontage fence, railing (rich) or hedge, with a gate; side hedges | prosperous / semi-rural bands, sparingly (R4/R5) |
| hovel | one small footprint on the frontage of a plot that is mostly bare yard | none or a hedge | squalid bands, outskirts |
| tents | 1–3 small round or rectangular footprints (6–15 m², class `tent`, roof `tent`) with a fire-pit pin, dirt surface | none | squalid and shanty districts after the first half of the stages (COV-FTG-E07) — FTG's row, which the parity presets keep; how the default preset shares these districts with the cluster row is item 70's (*Informal clusters*, below) |
| cluster | many small structures — shacks, tents or lean-to shelters by the cluster rows (§10.2) — packed across the plot, not in frontage rows, each with its own door on a footpath web of the plot's yard that reaches one of its access edges; the packing, the fire gap and the households per structure are *Informal clusters* (below; item 70) | none | informal plots of the lowest bands with no standing building, where *Informal clusters* admits them (item 70) |
| institution | the claim's own template (§2.6 footprint templates, the axis-locked composer, the `ring` partition recipe for a cloister) | wall with a gatehouse gap; churchyard wall | claims |
| vacant run | no footprint | wall (dense bands) or fence | vacancy runs (S10 (8)) |

Treatments are stored as §2.5's `PlotBound` records on the plot edges; they are drawn at district LOD as a stroke distinct
from buildings (§8.2's treatment row), **walled or fenced frontage counts toward O17 (d)'s streetwall continuity**, and walls and fences
export to VTT and GeoJSON (VIS-8).

**Front-line jitter — an area-scaled recession (item 43).** Each plot's main slot may stand back from its frontage by a
recession `h`, evaluated once per plot and stored, rounded to the centimetre, as `SitePlan.frontJitterCm` (§2.5):
`h = u · min(√(plot area) / 3, jitter.maxM)`, `u` uniform in [0, 1) — one draw of the plot's `siteplan` stream (§6.1;
no new concern) — and `h` kept only when `h ≥ jitter.minM`, else 0. The law's shape — area-scaled, uniform, floored — is
the emulated default (provenance `ref:MFCG 12710731 front recession (code)`, P9); its construction and its values are
ours. Under the default values below, the area term binds only on plots under ≈ 20 m², so the default recession is
in effect uniform up to the band's maximum. *Construction:* `h` is taken square to the frontage, on the frontage band's normal — a row
footprint is `plot ∩` the frontage band between the offsets `h` and `h +` the row depth, and a detached, hovel or
compound main slot's front stands `h` behind the template's setback — so the front stays parallel to a bent or curved
frontage, every party wall stays the plot side line (J-P14) and the strip in front of the recession is the plot's
`forecourt` yard part (§2.5). Where the plot's depth cannot hold `h` in front of a footprint that meets the class's
floors in width and area (§3.10), `h` falls to the largest value that can, and to 0 when that is below `jitter.minM`.
*Values:* `jitter.maxM` and `jitter.minM` are designation-template columns (§10.2), `jitter.maxM` interpolated along the
prosperity value like coverage — defaults ours (`own`): `jitter.maxM` 0.4 m (poor / dense), 0.7 m (modest), 1.0 m
(prosperous), 1.5 m (rich); `jitter.minM` 0.3 m for all bands — each of these band cells marked
`extension: { over: 'MFCG', mode: 'option' }` over the emulated law, whose values the `MFCG` parity preset reads through
§7.6's per-preset values: `jitter.maxM` 4.8 m and `jitter.minM` 2 m (J-A43.41). The institution, tents and cluster rows
carry `jitter.maxM` 0, unmarked, so no preset changes it and their plots draw no recession (a claim's building, a camp's
tents and a cluster's structures have no street front to recede); any row whose `jitter.maxM` lies below its
`jitter.minM` draws none. *Floor:* a front nearer its frontage than `attractCm` (26 cm, §3.2) would be shared with the
frontage by §3.6's stretch attraction and the recession would collapse to 0, so `jitter.minM` is bounded below by
`attractCm` + 1 cm — the column's declared range (§7.6), against which an `editTable` or `editPreset` setting it lower is
refused, naming the bound (F-EDIT, §5.2) — and the recessions drawn are {0} ∪ [`jitter.minM`, `jitter.maxM`]
(J-A43.42). *Changes:* a kept main slot keeps its stored recession through a designation change; an added
main slot evaluates `h` at the target template's columns with its draw from the mutation's `siteplan.mutate` stream, as
every added part does (the mutator's step 2, below); Regenerate (keep settings) re-evaluates the same draw, so it
reproduces the same fronts. The bars: §13.2 (item 43).

The row arrangement's footprints are made here by the boolean above and passed to `BuildingGenerator.outline()` as fixed
`quad` wings, which it returns with heights and roofs and never re-fits (§2.6); every other arrangement's footprints come
from `outline()` itself — rectangles and L / T compositions as `rect` wings with per-wing ridge axes (VIS-10), footprint
templates and the axis-locked composer for institutions (COV-FTG-F16, COV-MFCG-G05) — each shaped inside its slot's
working hint (`SlotPlan.hint`, §2.5, which S11 never stores). **The first carry (J-P42).** S11 inserts each footprint's
rings through every wing vertex on the wings' union boundary and, when the block's batch has committed, carries every wing
onto the committed face by §2.6's wing-carrying rule — from the ring it inserted to the ring the kernel committed
(attraction may have moved a vertex up to `attractCm`, §3.6), each boundary run re-read from the committed rings, a rect
whose sides now carry other vertices recording its `corners` — so every stored wing's boundary runs are its footprint's
rings vertex for vertex and the union of a building's wings is its footprint face exactly (§2.6's check).
**Scale (COV-FTG-F09):** footprint targets are multiplied by the district's `buildingScale` (0.5–2, continuous; FTG's
"smaller / bigger" as a district edit or an `Adjust` regeneration). **Heights** from the class tables on every wing (floors
× storey height + roof rise by pitch; eave and ridge per wing; tower heights for keeps and church towers), with the
**ground datum** `baseCm` from the terrain by §2.6's `deriveBase` (FTG-13; J-P19) — carried although the top-down view never
shows them.
**Entrances:** the building's entrance set by §2.6's rules — the main entrance on the footprint side facing the plot's frontage access edge, where §2.6's rule 1 places it (the owner's rule, item 29), side, rear and yard doors and the basement decision as §2.6 states — re-derived
whenever the designation mutates (below); roof kind by class per wing (the style sheet chooses the construction, §8.2);
**materials** from `MaterialRow` (COV-FTG-F20; §2.6); **description, opening
hours and sub-locations** from the class table and the naming engine (COV-FTG-F21, FTG-11); yards partitioned into typed
parts.

**The designation mutator (item 18).** A change of designation — an `assign` or `unassign`, a `setAttr` on a plot's use or
class, a relocated use (§4.11), a dossier re-designation (§7.7) — never replaces the plot's buildings with a fresh roll.
`mutate(plot, to)` derives the new design from the present one by a recorded delta toward the target template, evaluated
at the plot's current prosperity (item 19 (c)):
1. **Match.** The present design's parts — slots by `BuildingSlot.role`, wings, storeys, roofs, entrances, yard parts,
   treatments, and a stored composition's or plan's rings (§2.6) — are matched to the target template's structures by role
   through a **compatibility table** (a house and a hall, a shop's storefront and a house front, a stable and a store, a
   workshop and a forge … our own rows, editable): each part is **kept** (it fits the target's role within the template's
   tolerance on size), **adapted** (kept with an attribute change — a storey added within the floors band, a wing extended
   within the size budget, a frontage treatment or a roof kind changed), **converted** (kept as another role the table
   allows) or **subtracted** (no role in the target and no protection); each required structure without a match is
   **added**.
2. **Order and draws.** Subtract, convert, adapt, then add, so the added parts pack around the kept ones on the plot's OBB
   grid by the compound packer (above) from the plot's `siteplan.mutate` stream (§6.1: a geometry concern keyed by the
   plot's lineage, so the same change from the same state draws the same numbers on every host, and a New random of the
   plot changes nothing past); added parts are minted from the causing event's `seq` and ordinal (§6.3), kept parts keep
   their addresses, subtracted parts become tombstones with the event's `seq` (§2.8). The old house stays recognisable
   inside the new workshop.
3. **Land.** When the target's size budget exceeds the plot, the mutator asks S10b's solver for a JOIN with a neighbour by
   S10 (7)'s orderings, the neighbour's use relocated by the same solver; when no join is allowed — a locked neighbour, a
   hard row — the template's `underSize` column decides: the compact rows, or a refusal reported with the blocking rule.
4. **Protection.** A locked part or path is never subtracted, converted or adapted (fate *kept*, §7.3 item 4); a
   user-edited attribute is kept (implicitly pinned, §7.2); an added part that would overlap a kept part is placed elsewhere
   on the plot or reported; the entrance set and the basement decision are re-derived by §2.6's rules on the result (item
   29), and the elaboration cache of the plan rung is marked stale (item 28).
5. **Record and reversal.** The steps are one `MutationRecord`, persisted in the causing event beside its fates (§7.1, §7.4)
   and cited by the plot's lifecycle event; the event's undo record keeps the former parts. Reversing the change — a
   designation set back, an `unassign`, an `undo` — applies the **inverse** of the recorded steps when the plot's design is
   still the record's result (its leaf digest, §6.2), restoring the earlier design exactly; otherwise a fresh forward
   mutation toward the earlier template runs and is reported as such.
6. **Timing.** A host or user change decides and records the whole mutation at once; across epochs the evolution engine
   spreads the same steps — occupy if compatible, then adapt, then extend, and rebuild only what cannot be adapted — as
   recorded events (§4.11, item 18 (c)). How a recorded step is shown on the ground over the weeks it takes is §4.11's
   Works (item 67), which reads the steps and never re-decides them (J-A67.49).
7. **One path.** Generation is the mutation from the empty design: every structure an add, every draw from the plot's
   `siteplan` stream, so this stage's own batch and a later mutation are one code path (`@plat/plots`, §14); Regenerate
   (keep settings) and New random remain re-derivations (§7.1), and `rebuild` (§4.11) the whole replacement that a ruin or
   a redevelopment calls for (item 31's rung 3), never a designation change.

```ts
type Designation = { cls: BuildingClass; use: string /* the roster class id */; specialisation?: string /* the template's discrete row; absent: by band */; assignment?: Id }
interface MutationStep { op: 'keep'|'adapt'|'convert'|'add'|'subtract'; part: { kind: 'slot'|'wing'|'storey'|'roof'|'entrance'|'yard'|'bound'|'frontage'|'composition'|'plan'; id?: Id; role: string };
  from?: unknown; to?: unknown; rule: SliceRef /* the template or compatibility row read (§2.8) */ }
interface MutationRecord { plot: Id; from: Designation | null /* null: generation, from the empty design */; to: Designation; band: { field: string; manifested: string }; steps: MutationStep[];
  joined?: Id[]; displaced?: { use: Id; to: Id | null }[]; seq: number /* the causing event; 0 for the generation run */ }
interface DesignationMutator { mutate(plot: Id, to: Designation, cause: EditRef | RuleRef | 'generation', ctx: StageContext, k: Kernel): KernelResult<MutationRecord> }
// one implementation, registered by name (§4.12, §14); called by S11, by every assign, setAttr and dossier event (§7.7) and by §4.11's use step
```

**Furniture pins (COV-MFCG-I01, COV-FTG-J02, COV-FTG-J05; `pin.*` streams).** The main plaza always gets one centrepiece —
statue 0.6, fountain 0.3, market cross 0.1 by default weights (MFCG places one in every market square, 60 % statues) —
offset toward the plaza's longest edge for statues and for 30 % of fountains; each gate plaza gets a well, cross or trough
with probability 0.5; every block draws one **weighted decoration row** from a deck and applies it to its unused plots and
vacancy runs (wells, pumps, troughs, large trees); **singletons** — bandstand, statue, monument — are placed once per
district in an unused plot by a deck draw, campfires in squalid districts; **market stalls**, drawn as small tents, line each
market square's edge band and ring its market hall, by rank: the principal one per ≈ 150 m² of square (≤ 40), a
secondary one per ≈ 200 m² (≤ 20); a flanking principal market takes the main plaza's centrepiece rule and a secondary
market a centrepiece with probability 0.5 (our own rows, calibratable). What each band
draws — footprints, yards, treatments, pins, and the plot outline as an optional cadastral layer — is §8.5's.

**Markets and hidden plots in this stage (items 24 and 30; the rules are §4.2 S3 (12)'s, §4.5 S7b (3)'s and §4.6's).**
Every market square — the plaza when it carries the principal rank, a flanking principal market, each secondary claim —
takes the pins above by its rank; the market hall's `nearMarket` row (§10.2) binds it to the principal market by
default. A passage the block's reach names
(§4.6) is cut by S10 (9) as its `passage` face, and S11 gives the front building the wing that spans it; a hidden plot's
main entrance faces its access face — the court or the passage — as §2.6's entrance rules put a set-back building's on
the court that leads from its gate (item 29), so every plan roots at a door that opens onto the way its plot is reached
by.

**Vacant plots under decline (AM-8).** A plot whose last building is cleared or reused merges into a garden, orchard or
field by `plotToGarden`, or into its occupied neighbour by `amalgamate` (§4.11's ladders), through the merge operator of
S10 (7) with the neighbour's band; the band's vacancy-run share of S10 (8) is the design's deliberate vacancy: regrowth
never fills a run below its share, and decline's vacancies are counted apart from it.

**Households per building (item 28 (f); J-A28.46).** S10b places a residential plot's households — per residential slot
(a structure with `houses`, §10.2) of the plot's designation template row at least one household and at most the row's `households.built`, by band ±
drift, a plot's slots filled in its slot list's order, required slots first (the capacity accounting above; the
capacity itself cannot be read there, because the building and its wings do not exist before S11). A residential slot
the demand cannot fill is dropped from the plot's site plan, its ground typed as yard, never below its structure's least `count` where the structure is `required`; a residential plot whose required residential slots the demand cannot all fill is typed vacant by S10b's reconcile (above), its households placed on the next candidate — surplus capacity, never an empty residential
building; a residential slot on a workplace's or an institution's plot that is its main slot (a live-in class's among them) or within a `required` structure's least `count`, and that no household of its band or drift can fill, is neither dropped nor typed vacant — the workplace or institution and its use stand — and S11 builds it as a slot without `houses`, housing none, `Building.dwelling` absent, reported; its `BuildingSlot.unhoused` (§2.5) records that typing, written by every run of this fill and cleared by the designation mutator (above). S11,
which creates each building and its wings, writes each residential building's `Building.households` (a building S11 builds for a slot with `houses`; every other building's list is empty) from its slot's households in address order, clamped into [1, capacity], a locked or pinned household kept before the clamp drops any (§7.2; §2.6's capacity rule) — §2.6's one capacity function, the one item 31's `relet` (§4.11) and F-PLAN's never-omit
rule (§5.2) read, evaluated on the wings it has just made. A household the clamp leaves, or whose slot S11 builds no
residential building for, moves by §10.3's relocation (its address and its people's keys kept): after the district's
last S11 block batch, still inside the district's derivation (a pseudo-district's alike), the overflow households are
re-placed in address order by S10b's solver over the district's residential buildings that house fewer households
than their capacity — the household's band first, then the bands its drift admits; score descending, then building
address — each move reported, and a household no building of the district has room for is an unplaced item of
F-SITING (§5.2), reported with the capacities that refused it — except a household that fills the dossier's population (§7.7 item 2), which is never taken off the manifest: its housing is re-provided inside its district (item 20 (e); J-A20.72) by S10b's `dossier` request in the least-disruption order of a request after the city is built (above: vacant plots and vacancy runs first, then under-used plots, then a plot whose use can move, then a JOIN), its first closest option where no plot passes the hard rows (J-A20.42), and S11's operator builds there a residential slot of that plot's designation template (a structure with `houses`, §10.2) for it, within that building's capacity, in the same derivation or causing event — each such build and displacement reported, a hand edit's among its dry-run fates (§7.3 item 4). So the solver and the plan agree on how many households
a shell holds and no shell houses more than its capacity; the plan rung records the count among its inputs (§4.1). The
overflow pass runs inside every change §2.6's capacity rule lists — S11's operator building or changing a residential
shell (an epoch's new faces, a rung-3 re-cut, a designation mutation, item 18) among them — whenever the result's
capacity falls below its households, each move a lifecycle event of it (§2.8), as `relet` keeps to the capacity
(§4.11).

**Concealed institutions — a front and a hidden function (item 63; owner: "some criminal like institutions or buildings
have to be clandestine meaning there are certain lots and assignments that have two functions. A front which can be
anything and a second function").** A clandestine institution does not parade itself: its building stands on the map
like any other, and what it is, is withheld. This paragraph is the one statement of how such an institution is resolved,
placed and built; the records are §2.6–§2.7's, the knowledge filter §9.2's and the underground allocations II.7's.
1. **The value and its resolution (J-A63.41).** An institution, a use and an assignment carry
   `concealment: 'none'|'front'|'hidden'|'underground'` (`Institution.concealment`, `Use.concealment`, §2.7;
   `Assignment.concealment` with an optional named front, `Assignment.front`, §7.7), `none` by default. It is resolved
   when the institution is first placed — and again only when a dossier event withdraws the mode the dossier set (below) — from the first source that gives one: the dossier's fact (a mode, and
   optionally a named front); an assignment's value; the class table's default-mode weights — `BuildingClassRow.concealment`
   (§10.2), rows only for the classes our tables mark clandestine (a thieves' den, an assassins' house, a smugglers' store,
   a forbidden cult, a black market, a spy ring … our own rows), read at the plot band's row and the district kind and
   drawn on `siting` keyed by the institution's lineage (§6.1; no new concern); else `none`. The resolved mode is stored on the concealed use, with its map-side source (`Use.concealmentSource`, §2.7) when the dossier gave none; a map edit sets a mode the dossier did not set by `setAttr` (§7.1), and one the dossier set is dossier-owned, a map `setAttr` of it refused (§7.7 items 7, 11; J-A20.77, J-A63.22); a dossier event that withdraws the mode it set re-resolves it by this order from the map-side sources, the use re-placed by (2)–(6) as that event's least-disruption mutation (§7.7 items 5, 11 (b)), as an open use where the order yields `none` (§2.7; J-A63.22).
2. **Feasibility and the fallback chain (J-A63.41).** A mode is feasible where its ground exists: `underground` where an
   underground allocation exists — II.7.3's sewer-front pseudo-district (S7b (6), which needs a navigable run, not only a
   network, J-A14.43) or an undercity neighbourhood (II.7.5, S7b (7)); `hidden` where the district holds a plot whose
   `exposure` is `hidden` (item 30, §4.6); `front` where a cover of the cover table has a plot whose hard rows pass. The
   chain is fixed — `underground` → `front` → `hidden`; `hidden` → `front`; `front` → `hidden` — and where none is
   feasible the front's closest options are F-SITING's (§5.2): a clandestine institution is never placed openly by a
   fallback and never dropped, and every step down the chain is reported with its reason in `requestedVsBuilt`, never
   silent (J-A16.43).
3. **FRONT — one item, two uses (J-A63.42).** The front is a cover class drawn from the cover table
   (`RosterTables.covers`, §10.2: for each concealed class, weighted plausible covers per band — a tavern, a funeral
   parlour, a fencing hall, an apothecary, a warehouse, a bathhouse, a tailor … our own rows; several per class, since a
   front "can be anything") on `siting` keyed by the concealed use's lineage, unless the dossier or an assignment names one;
   a named front is honoured where its hard rows pass, else F-SITING's closest options are offered for it — never a silent
   substitute. S10b's solver places the pair as ONE item (J-A16.41): its hard rows are the FRONT's, so the front is
   plausible where it stands (a tavern on a street, a warehouse at the docks); its soft rows are the true class's relation
   rows and supply edges (near its targets and markets, the waterfront, alleys, passages, an outfall) plus an `exposure` row
   preferring `alley`, `court` and `hidden` plots, at the true class's weights; both classes' band rows apply, so
   prosperity shapes which fronts and which districts are used. The placed building then carries two `Use` records: the
   FRONT's — `Building.use`, a working business with its households, opening hours, label and description — and the
   CONCEALED one (`Use.concealment`; `Use.front` names the front's use; listed in `Building.concealed`, §2.6–§2.7), whose
   `knownTo` is `secret` by default (item 30's values).
4. **S11 builds the front (J-A63.42).** S11 reads the FRONT's designation template row at the plot's band: class,
   footprint, site plan, labels and public room programme are the front's, so at every public zoom the building reads as
   the front. The concealed use adds three things only, each flagged `concealed` and carrying the concealed use's
   knowledge: (a) a **concealed programme** — the concealed class's room-programme rows marked `concealed` (§10.2's
   `RoomRuleRow.concealed`: back rooms, a strongroom, a cellar room, a hidden stair), which the plan rung (§2.6, stage 3)
   places away from the main entrance and off the public circulation hub, reached only through a service, yard or
   concealed door (`Room.concealed`, §2.6); (b) a **concealed entrance** (`Entrance.concealed`, §2.6) — where the plot has
   an access edge beyond its frontage onto an alley or a passage (§2.6's entrance rule 2's condition), `deriveEntrances`
   adds one `service` or `yard` door there on `siteplan.entrance`, flagged, never the `main` door; with no such edge there
   is none and the concealed programme is reached from the front's service side; (c) a **way down** — the basement decision
   (§2.6) reads the higher of the front's and the concealed class's `cellar.prob` at the band (the terrain gate unchanged),
   and over an underground element within reach the building's access lottery takes the concealed class's
   `accessMultiplier` (II.7.3's *Basement accesses*, item 64).
5. **HIDDEN.** The institution goes to a plot whose `exposure` is `hidden` (item 30's plots behind a passage or in a back
   court) — the `exposure` row is hard for this mode — with a front drawn by its class row's `hiddenWithFront` share on
   `siting` (a back-court workshop that also sells something), or bare, its building then of its true class with
   `knownTo: 'secret'`.
6. **UNDERGROUND.** The institution joins an underground allocation: a sewer-front dwelling of II.7.3 (U1–U3; the
   allocation's (b)) or, where one exists, a building of the undercity (II.7.5; its clandestine institutions prefer it),
   there with a front by the same `hiddenWithFront` share; its `knownTo` is `secret`.
7. **Mutation (items 17 and 18; J-A63.43).** A change of the front's designation — an `assign`, the front use's closing,
   a rung-3 rebuild — runs S11's designation mutator on the front: the concealed use persists, its concealed door is
   re-derived with the new entrance set where its access edge survives, and its concealed programme is re-fitted when the
   plan rung, marked `stale`, is next viewed. A relocation of the concealed use (item 17's use step; a dossier event) moves
   it by S10b's request like any use and leaves the front standing as an ordinary business: the building's
   `concealed` list loses it, its concealed door stays as an ordinary `service` door (the flag cleared) and its concealed
   rooms return to the front's programme at the next plan re-cut. The front and the concealed use are two records, so
   either can close without the other.
8. **The dossier stays the authority (items 20 and 22).** The dossier says that the institution exists and is
   clandestine; the map places it and never reveals it on its own. An exposure — a raid, a discovery — arrives as a dossier
   change and is applied as a least-disruption mutation (§7.7): the concealed use may relocate with its mode re-resolved,
   the front close, a passage be sealed (item 30). A map delete of such a place relocates it by `rejectSite` (§7.7 item 3),
   as for any dossier-backed element.
9. **Knowledge, not geometry.** The building's mass and every public part are always on the map (J-A30.83); the concealed
   use, its concealed rooms, its concealed door and its way down carry the concealed use's `knownTo`, so §9.2's filter
   draws them only for a view whose knowledge admits the concealed use (the rendering part's refinement of J-A30.83 for
   concealed parts), and every export and the reader withhold them (§11.1, §11.2) — the public sees the front's label,
   description and rows.
10. **Emulation (item 23; J-A63.44).** No reference has concealment: the non-`none` weights of the `concealment` column and
    the cover table are `extension` rows scaled by `placement.extensionWeight`, so the parity presets (weight 0) resolve
    every class to `none` and place every institution openly; with no clandestine class in the roster nothing here runs.
§5.3 holds the check rows (every clandestine institution in an allowed mode or a reported fallback; concealed rooms
reached only from a concealed door or the front's service side; the `underground` mode never without an underground
allocation) and §13.2's T63 group the bars.

**Light sources — placed by rule (item 68; owner: "a night time view with appropriately spaced and partitioned torches or
magical lights").** S11's furniture step (the furniture pins above) places the town's point lights as `LightSource`
records (§2.7; the lighting model that draws them, and the derived lights — lit windows, room lights, light shafts — are
§8.4's) by the light table's rows, each read against its context: the host kind, the way class, the prosperity value along
band rows, the era row, the `magic` circumstance (§4.2 S0) and the arena. A district places lights only on its own faces
and its own half-corridor strips, as §4.9's avenues are planted, so the laziness contract holds (§4.1):

```ts
interface LightRule { host: 'gate'|'bridge'|'plaza'|'market'|'door'|'castle'|'guardPost'|'way'|'shrine'|'pin'|'tunnel'|'gallery'|'chamber'|'accessPoint' /* 'pin': an emitting pin — lamp, campfire, fire_pit; the underground hosts (arena 'underground', (1)): 'tunnel' a tunnel run's junctions, 'gallery' a gallery at the way rows' spacing, 'chamber' a chamber's altar, hearth or market, 'accessPoint' an access point's foot; a 'door' row with arena 'underground' lights a sewer dwelling's or an undercity building's door */;
  cls?: string /* 'door' rows: the class id or tag whose main entrance carries it (inn, tavern, temple …) */; wayClass?: WayClass /* 'way' rows */; arena: 'ground'|'sky'|'underground'; system?: string /* underground rows: the system they light — sewer, undercity, catacomb, cavern … (II.7.3, II.7.5, II.7.6) */;
  kind: string /* LightSource.kind: torch, lantern, lamp post, brazier, fire pit, campfire, magical orb, shrine lamp … */; source: 'fire'|'magic';
  heightCm: Cm; intensityCd: number /* candela */; radiusCm: Cm /* the smooth cutoff of §8.4's falloff */; sizeCm: Cm /* the flame's or orb's own radius, §8.4's penumbra — own defaults: torch 5, lantern 8, lamp post 10, brazier, fire pit and campfire 25, magical orb 30, shrine lamp 5 */;
  colour: string /* sRGB, the colour the light pass lights with (§8.4 (c)) — own defaults: fire rows #FF9329 (warm), magic rows #A6C8FF (cool); §8.2's light roles tint only the vector rung's glyph and glow */; flicker: boolean /* default true for source 'fire', false for 'magic' */; count?: number /* per host; default 1 */;
  minLux?: { band: string; lux: number }[] /* 'way' rows: the target minimum ground illuminance at night, by band, interpolated along the value */;
  era?: string[] /* the era rows it belongs to; absent: every era */; magic?: ('low'|'high')[] /* magical rows: only under these values of the circumstance */;
  exposure?: ('street'|'lane'|'alley'|'court'|'hidden'|'sealed')[] /* the exposures it may light; absent: street, lane, alley and court */; extension: boolean }
```

1. **Hosts.** A `gate` row lights each gate (two torches flanking the passage by default); `bridge` each end of a built
   bridge; `plaza` and `market` a square's edge at the way rows' spacing and its centrepiece; `door` rows the main entrance
   (§2.6) of each building of the row's class — an inn's or a tavern's lantern, a temple's door lamp; `castle` its gate and
   ward; `guardPost` each post; `pin` rows every emitting pin, which then carries the light (§2.7); `shrine` a wayside shrine. Underground (arena `underground`, each row naming its `system`): `tunnel` rows each junction of a tunnel run, `gallery` rows a gallery at the way rows' spacing, `chamber` rows a chamber's altar, hearth or market, `accessPoint` rows each access point's foot, and `door` rows the doors of the sewer dwellings and the undercity's buildings (II.7.3, II.7.5, II.7.6). A light's address derives from its host's lineage — a door lantern from its building and entrance, a street
   light from its way strip and ordinal (§2.8, §6.3).
2. **Street lights, spaced by what they give (J-A68.41).** A `way` row lights each way of its class whose band row targets a
   minimum night illuminance `E*` (interpolated along the value of the plots fronting it — a gradient, never a switch). The
   spacing `s` is the largest at which two neighbouring lights of the row still give `E*` on the way's centre-line midway
   between them: `2 · I · h ÷ (h² + (s/2)²)^1.5 × f((s/2) ÷ r) ≥ E*`, with `I` the intensity, `h` the height, `r` the radius
   and `f` §8.4's cutoff, solved by bisection through `dmath` (§6.5 (3)) — a 25 cd lantern at 3 m and a target of 0.1 lx
   give lights about 22 m apart. Each district lights its own half-corridor strip at spacing `2s`, the strip on the way's
   left (by the chain's direction, §2.2) from `s/2` past the way's first junction and the right-hand strip from `3s/2`, so
   the two sides alternate and together meet the target without either district reading the other. A site on a door, a
   gate passage or a deck moves to the next; a light that cannot stand is skipped and reported (§5.4).
3. **How much light — "partitioned" (J-A68.41).** Read as distributed by way class, district and band through these rows:
   the era row sets the density of public lighting — sparse in the medieval default (the plaza, the principal market, the
   gates and the `through` and `primary` ways of the prosperous and rich bands), denser in later eras — so rich streets are
   well lit and poor alleys dark; the `magic` circumstance adds the magical rows (`none` by default under D-3: no magical
   light; `low`: orbs on the rich band's squares and the precinct; `high`: on every primary way and square); hidden and
   sealed plots, and the courts and doors of a concealed institution's building (*Concealed institutions*, item 63), stay
   dark unless a row names them; an informal cluster's light is its cooking fires — one `fire_pit` pin with its light per
   `lights.perStructures` (4) structures (item 70). The sky rows light an island by its supply (II.6); the underground
   rows light the underground layer by its system (II.7.3, II.7.5, II.7.6).
4. **Draws and presets.** Each choice reads a rule or a table; one thing only is drawn — a door lantern's side of its door — on the concern `pin.light` keyed by the host's lineage and the rule row (§6.1). Each record copies its row's `sizeCm`, `colour` and flicker flag, and a fire light flickers by §8.4 (f)'s pure function of its render key and the view's time, never by a draw (J-A68.61, J-A68.42). The default rows are
   our own (`extension`); the `MFCG` preset places no light; the `FTG` preset places one window light per lit building at
   its main entrance — the anchor at which FTG's client as captured on 25 September 2026 draws its night lights (item 50) —
   and no street light. A user adds, moves or removes a light by §7.1's edits.
5. **Over time.** A light follows its host's lifecycle (§2.8): removed with a demolished host, unlit on an abandoned or
   decayed one, unlit while its host's Works stands before FINISHED (§4.11); an epoch re-runs these rows on its new and
   changed faces only.

**Informal clusters — tenure and the cluster arrangement (item 70; owner: "some neighborhoods simply have a lot of for
example, shacks on one block no single individual owns it … each one deserving of a door. Sometimes they're just
tents").**

1. **Tenure (item 70 (a); J-A70.41).** A plot's `tenure` (§2.5) is derived, never drawn: `common` for commons, greens and
   market greens (ground no one owns); `informal` for a plot of the tenure table's bands (`RosterTables.tenure`, §10.2; by
   default squalid and poor) with no standing building but shacks, tents or lean-tos, and for vacant, cleared or ruined
   ground in a declining district (§4.11); `rented` for a residential plot whose buildings house more households than
   their template rows' `households.built` (let out by rung 1's `relet`, §4.11); `owned` otherwise. S10b and S11 write it with the plot — at generation a plot is `informal` only where (2) gives it the cluster row, "no standing building" being read over epochs, never before S11 has built (J-A70.49) — every event that changes its inputs re-derives it, and a `setAttr` overrides it (an edited path, §7.2).
2. **Where (item 70 (d); J-A70.43).** The designation template takes the `cluster` arrangement (§10.2) at generation, for the residential plots of the squalid and poor band rows of a shanty-typed district (§4.5's FTG trigger and staging) and for every residential plot of a block of such a district that the cluster row's `wholeBlock` share picks — over epochs, for the plots (1) makes informal — wherever the district's band range admits the squalid band (item 72, §4.5 (5)) — never on a plot whose
   geometry floor is the middle band or above while its stock stands (a standing large building is subdivided inside
   instead, §2.6's interior ladder, item 28 (f)). That is FTG's staging as the emulation default: the shanty districts of §4.5 (FTG's trigger — the roster's average band poor or squalid — after the first half of the stages) take the cluster row, and the class mix never draws a cluster structure's class (§10.2; J-A70.49); the `shanty` kind's `extramural` preference remains our soft extension row (J-A27.43 stands: the
   owner's words name no wall), and the cluster row's relation rows prefer, softly, riverbanks and marsh margins where
   S1's shore setback and flood line allow building, and the lee of walls and ruins. Over epochs the vacant, cleared and
   ruined plots of a declining district join them (§4.11). The undercity's chambers take clusters by II.7.5's rows (item
   65), while II.7.3's sewer-front plots keep "no compound, detached, hovel or tents". Where the cluster row's `wholeBlock` share picks a block — at generation a block of a shanty-typed district, over epochs a block whose residential plots (1) makes informal: one draw on the block's `plot.join` stream at S10 (7), which reads the district's kind and the block's band and no tenure — S10 (7) joins the block's residential plots into one cluster plot — the owner's "shacks on one block" — by its join law over every plot of the block.
3. **The packing — paths first, then structures (item 70 (b); J-A70.45).** S11 builds a cluster plot in one batch from its
   `siteplan` stream, and every structure gets its own door by construction, as frontage-first plots each get a way (O5
   a). (i) **The footpath web:** from the midpoint of every access edge of the plot a trunk path runs inward, square to that
   edge, ending one structure depth before the opposite side; branch paths leave the trunk on alternate
   sides every `2 × structure depth + path width`, each turned by up to ± 20° (drawn), stopping one structure depth
   inside the plot's boundary. The paths are yard parts of kind `footpath` (§2.5) of width `pathWidthM` (the cluster row's, §10.2; below an
   alley's) — plot-internal, never a way or a way class, so the plot keeps its access edges and its exposure (J-A30.42).
   (ii) **The structures:** lining each path left and right, every one fronting it; the kind drawn by the cluster row's
   weights by band × climate × era (tents in the squalid band, in camps and at the newest edge; shacks where the
   settlement has persisted; lean-tos against a standing wall), the footprint from the kind's band in the cluster row (§10.2) —
   a lean-to's against a standing wall on its own plot (a ruin's, a party wall or a plot wall; never inside a
   wall strip, whose band, setback and glacis stay unbuildable, §4.8; J-A70.47) — and a clear gap of the cluster row's
   `fireGapM` at the settlement's rung (§10.2) between any two structures; the packing stops when no site
   fits or the plot's households are housed. (iii) **The doors:** every structure's main entrance lies on its path face —
   §2.6's rule 1 read for a structure whose access is a footpath, as a hidden plot's faces its access face (J-A70.44) — so
   every structure has its own door on a path that reaches an access edge; no basement (the rows' `cellar` 0), one storey,
   `RoofSpec.kind 'tent'` for a tent, a lean-to's back wall shared with its host wall. A plot too narrow for a trunk and
   one structure depth takes the `hovel` arrangement instead (reported).
4. **People per structure (item 70 (c); J-A70.46).** Each structure is a residential slot (`houses`) whose
   `households.built` is the cluster row's households per structure by rung × band (more in larger towns and poorer bands;
   our own rows); its capacity is §2.6's one capacity function — the shack, tent and lean-to programmes carry no circulation
   and the one-room unit, so the capacity is the floor area over the minimum room — and the generation fill above houses
   the households within it, the overflow pass re-homing any excess (never omitting a household, §5.2). The households that
   would crowd a partitioned shell under §2.6's interior ladder here fill many small structures: its outdoor twin.
5. **Presets, drawing and time (item 70 (e), (f); J-A70.42).** In the default preset the cluster row takes the squalid and
   shanty districts' informal plots; the parity presets keep FTG's tents row (1–3 tents) and MFCG's hovel, the cluster's
   packing an `extension` (item 23). The city band draws a cluster as a speckle of small roofs over its paths in the ground
   tone (§8.5's cluster exception), the district band each structure with its entrance tick (§8.2), and the naming engine
   names the cluster once, as a place (§10.4; one label, §9.1), never each structure. Accretion, fire and formalisation
   are §4.11's.

**Class mix inside a band — the gradient reaches the building mix (item 71; owner: "a prosperous neighborhood …
may have a mix … of middle class to rich man manors. Keeping with the idea that it is gradient").**

1. **A class draw above the template (item 71 (a); J-A71.41).** When S10b places the households of a block's residential
   plots, each plot's residential **class** — hovel, cottage, house, row house, town house, manor …, distinct class rows
   with their own templates — comes from the class-mix table `RosterTables.classMix` (§10.2): one row per band of §4.5's
   band set, weights over the residential classes, read at the plot's manifested value (J-A19.43) by §4.5's interpolation
   between the band rows' centres, an end row applying flat beyond its centre. The default rows raise the larger classes
   monotonically through every band — just above the prosperous cut mostly houses with a few manors, the manor share rising
   toward the rich row, which is all manors (the owner's "a very prosperous location may simply have all manors"); the same
   at every band edge (modest houses among the poor near the modest cut). J-A19.41 holds within a class — its template's
   discrete columns switch at the cut — while the class itself follows the gradient.
2. **The town's wealth shifts the weights (item 71 (b); J-A71.42).** Each class's weight is multiplied by
   `max(0, 1 + wealthShift × (wealthLevel − 0.5))`, after which the row is renormalised: `wealthLevel` the intent's (§7.7; with a
   dossier, the wealth §7.7's derivation table derives), `wealthShift` the class's column in the mix row (positive for the
   larger classes). The cuts stay the town's own (§4.5), so "rich" is relative to this settlement while a rich
   metropolis's prosperous quarter holds more manors than a poor town's.
3. **Largest classes on the prime frontages, not salt and pepper (item 71 (c); J-A71.43).** For each block S10b draws the
   multiset of classes — one per residential plot, at that plot's value, on `siting` keyed by the plot (§6.1; no new
   concern), its weights clamped into the band range of the district (item 72, §4.5 (5)) — and assigns them largest class first
   (by the class's template size budget, ties by class id) to the plots in descending **prestige**: the sum of the prestige
   rows' weights (`ClassMixRow.prestige`, §10.2 — a `through` or `primary` frontage, a square, a park edge, a corner, the
   waterfront) over the plot's frontages, ties by plot id; a hard relation row filters first (item 16's rows win). A mixed
   block so reads as a street of grand houses with modest ones behind. A class whose size budget exceeds its plot asks S10
   (7)'s law for a JOIN by its orderings (the reconcile's JOIN at generation), the joined neighbour's draw discarded, so
   manors stand on joined plots and houses on standard ones in one block.
4. **Households and buildings (item 71 (d); J-A71.44).** The households' bands are the roster's (with a dossier, the
   households that fill its population, §7.7); the mix decides only which building each takes — a household takes any class
   the mix gives a plot within its band ± drift. A manor that falls to the middle band keeps its shell (item 31's floor,
   §4.11) and is subdivided inside (item 28 (f)). S2's land estimate reads the mix's expected plot area at each band's
   centre (§4.2 S2), so demand and capacity keep agreeing.
5. **Emulation.** The mix is our extension: the parity presets set it to a step at each cut — one class per band row, the
   references' banded pools (item 23; T23-1 reads it) — with `wealthShift` and the prestige weights 0.

**Neighbourhood placement and the band range (item 72).** S10b places a class by its `distribution` (§10.2, read as §4.5 (3) states):
`dispersed` classes by S7b's allocation over all districts, never gathered into one by rule; a `district-defining`
instance's district taking its defining class up to its identity row's `targetShare` of its placed uses; a `singular` class by the rules
proper to it. Every prosperity-driven read of S10b and S11 — the class the mix draws, the template row's band, a new
building's condition, the occupants' band, the mutator's adapt and add steps — is clamped into the district's band range
(§4.5 (5)).

**A returning dossier element (item 80).** Among the *Requests after the city is built*, a `dossier` request for an element
whose assignment returns to `active` (§7.7, item 80) ranks first the plot of its former building — the building whose
`formerUses` names its use — ahead of the least-disruption order, so a reopened institution reopens where it stood,
repaired by §4.11's Works when the change is dated.

**Notice posts (item 82; J-A82.41).** The furniture step places a `notice` pin (§2.7) where §10.2's notice rule puts one — at the
principal market and at each gate plaza by default, at the main entrance of each class tagged `notice`, and wherever a
named-feature claim of the dossier names one (§7.7, item 82).

=== REPLACE ### 4.11 Incremental mode, transformations and conversions (the evolution hook; one path built in the base) ===
### 4.11 Incremental mode, transformations and conversions (the evolution hook; one path built in the base)

**The one built path: add a growth stage (GEO-27, LC-12, FTG-4, FTG-14).** `grow(doc, epochInputs)` appends an `epoch`
event to the log and runs at that log position (§7.1, §7.4) on the persisted model with the epoch sub-stream: S2 (**delta
demand** = the suffix of the sequential roster between the old and the new population, §10.2 — prefix-stable, so no
survivor's use is withdrawn by arithmetic) → S5 for the new stage, when a residual remains after the regrowth-first order
below (S5a: the boundary grown from the previous one and, if walled, its trace and gates; **S5b**, the main-road step, so each epoch can add main roads; S5c with the built-face legality
below; S5d) → S6 (districts extend over the new faces, existing districts keep their ids; the field's drivers are
re-evaluated with the new circumstances, the brush strokes kept as Δ) → S7 (the new enceinte's furniture) → S7b (allocation
of the delta demand in the regrowth-first order below — the old plan's vacancies, ruins and traces first, new faces only for
the residual) → S12a (outside sites for new outside classes; the hinterland unit builds their plots) → S8–S13 on new faces only (S10–S12b in the derivation pool, over a copy frozen as §3.3
step 1 states). S5c's proposals cross water only on a deck — a built bridge, or a `site` the proposal builds (§4.4) — so an
epoch's growth uses the crossing sites S1 and S3 left unused (§4.2 S1 (5)).
* **Built-face legality (GEO-27).** In an epoch a growth proposal may not cross a face holding footprints unless it runs
  along plot boundaries or back lanes (§4.3's `existingFabricCost` applies to S5c too, pricing a route along plot lines far
  below one through buildings) or a declared `demolish` conversion is chosen at its table cost (by building class and age),
  recorded as events. Plots cut by a new corridor are re-cut through the conversion path — buildings that still fit are
  kept, the others demolished with lifecycle events — never re-derived from scratch.
* **Survivors — the wealth ladder and the geometry floor (LC-12; owner, 2026-09-26; item 31).** Surviving plots and
  buildings keep their built state. A re-evaluated field never re-derives them and never removes an occupied building: it
  acts on them only through the explicit, recorded, rate-limited events of the **wealth ladder** — three rungs by the
  time a block has spent in its new band and by what its standing stock allows — drawn from `…/epoch=e` streams (the
  ladder's own draws on `epoch.transform`; a rung-3 re-cut's `plot.*` and `siteplan` concerns keyed by the block's and
  the new plots' lineage with the epoch component, §6.1 — no new concern). The engine that schedules the ladder is the
  owner's staged evolution stage (DEF-8, below); the base carries now the due mark, the table, the operators, the floor
  and the edit kinds, each usable by hand (§7.1) and undoable (§7.4). With no epoch nothing here runs, so the static
  baseline is unchanged (item 23): neither reference evolves — MFCG fixes granularity by ward type and FTG by lifestyle
  tier at generation, and FTG's "regenerate area" is a re-roll, which this ladder never is.
  - **The trigger — a band change past the hysteresis marks the block DUE.** After S6 re-evaluates the drivers (§4.5)
    each block's band is read again against the town's `FieldBands` with their hysteresis (0.02, §4.5): a block whose value
    has crossed a cut by more than it is marked due — `Block.due = { band, since, epochs }` (§2.5): the band it must
    meet, the epoch of the crossing and the epochs spent in that band, counted up at every later epoch — until its stock
    meets the band or the band changes again (a new mark; a flicker inside the hysteresis marks nothing). The mark is per
    block and the memory per plot (`builtBand`, below): "the neighbourhood grew poor" is the aggregate of its blocks'
    marks and its plots' records, never a district switch (J-A31.43).
  - **The rungs.** Every rung acts through operators the base already has — item 18's designation mutator (`mutate`,
    §4.7 S11), item 17's use step (below), item 30's passage choice (§4.6), S10 (7)'s join-and-split law in its
    incremental form (§4.7) — as `LadderOp` conversion events (below), so **no occupied building is demolished by a band
    change** and nothing is re-rolled (J-A31.41).
    1. **Rung 1, at every due epoch — use, occupancy and condition.** *Growing poor:* buildings are let out — `relet`
       raises a building's household count within §2.6's **capacity** (its one capacity function, J-A28.23),
       the roster's households (with a dossier, the households that fill its population, §7.7 item 2; item 20 (h)) and item 17's
       relocation filling them (§10.3);
       the interior follows the occupants down §2.6's **interior ladder** (item 28 (f)): the plan rung re-cuts the
       programme for the new count inside the unchanged wing rings — from one household with its staff rooms to a
       lodging house, a tenement of one-family apartments off a corridor, or single rooms — inside the `relet` event
       itself for a stored plan (§7.3's stored-plan row; J-A28.72), otherwise when next clicked (the unstored rung goes
       `stale`, §2.8); F-PLAN never drops a household (§5.2);
       outbuildings convert to dwellings and workshops and sheds and hovels infill the yard (`mutate` toward the field
       band's use and specialisation columns; `densify … infill` inside the manifested band's yard rows); the garden is
       built over (§4.9); the fabric's **condition** steps down — `Building.condition` `kept → worn → neglected` (§2.6:
       wear and patched roofs, rendering classes of §8.2, never a shape change, item 19); the roof is lost only by the
       decline ladder's `decay`, after the building's last household has left (`vacate`; the derelict state of §2.8's
       ladder). *Growing rich:* renovation and extension by `mutate`'s adapt and add steps toward the
       richer template (item 18), households re-united (`relet` down to the row's built count; the interior re-cut back
       up the ladder removes what the subdivision added and restores the earlier plan where nothing else changed, §2.6),
       infill cleared once its households are re-homed and the garden reclaimed (`thin … infill`; infill whose
       households cannot be re-homed within the epoch's churn cap waits, as a court does in rung 2), condition restored.
       Use, condition and the interior read the field band; geometry reads the manifested band (the floor, below).
    2. **Rung 2, after the ladder table's duration in the band — tenure and yards.** The holding fragments or
       consolidates without its front changing. Growing poor, the yard becomes a back court of rear plots reached by a
       new passage (`densify … back_court`) where §4.6's passage choice allows one and the plot's manifested band's row
       carries a rear-plot or hidden share — a middle-floored plot's yard is infilled, not cut into tenements; growing
       rich, a back court is cleared and re-gardened (`thin … back_court`: its uses relocated by the use step, its
       households re-homed — item 17's relocation, or a `relet` up in a standing shell within §2.6's capacity — and its
       buildings vacated (`vacate`), then the rear buildings cleared (`clear`) and the passage sealed, item 30; a court
       whose households cannot be re-homed within the epoch's churn cap waits); and big houses change class keeping their
       shells — a mansion to a tenement, an inn, a workshop or a chapel — by `mutate` (item 18). Rung 2 keeps every
       frontage and every main shell; its one plot-line change is `densify … back_court`, which splits the yard off the
       plot into rear plots and a passage face by S10 (7)'s incremental re-cut — the front plot, the child that keeps the
       frontage anchor, keeping its address and `builtBand`, every child's lineage continued by §6.3's SPLIT rule (the
       parent's key with its child index), the rear plots taking their new stock's band as `builtBand` — admitted only as
       above, never on a middle-floored plot; a court
       `thin` has emptied and cleared is vacant, so its rear row returns to the front plot's garden by rung 3's
       `amalgamate` (J-A31.40).
    3. **Rung 3, on vacancy, ruin, a destructive circumstance event or redevelopment only — the geometry follows.** A
       vacant or ruined plot's ring is re-cut to the band: growing poor, an abandoned or ruined mansion's plot is split
       into row houses or tenements (`subdivide`), or the fallen house's plot is re-cut and rebuilt as lodgings; growing
       rich, a buyer joins two or three worn small plots and replaces their houses with one large building (`amalgamate`,
       then `rebuild` or `build`). **Redevelopment** is a composite the engine issues in order — purchase (the plots'
       uses closed or relocated by the use step under item 17's rules — a dossier-backed use relocated, never closed
       (*Dossier content across epochs*); a pinned assignment or a lock stops it),
       vacancy (`vacate`), then the re-cut and the new stock — so the invariant holds at every step (J-A31.47). The
       re-cut is S10 (7)'s law in its incremental form (§4.7): the due block re-cut with its neighbours fixed (§7.3: the
       block is the effective scope, with its seam exception), under the band's granularity target, fusing by S10 (7)'s
       orderings (vacant or same-owner neighbours first, then a rear plot into its front plot) and splitting by them
       (the widest frontage first, then the deepest yard), every survivor's plot byte-identical, the new plots' buildings
       by S11's mutator from the empty design, their residential classes by S10b's class mix at the new stock's value (§4.7,
       item 71). Slums arise where the stock was small and cheap to begin with, or from
       rungs 1 and 2 inside big shells; a district of mansions grows poor as tenements behind grand fronts, never as a
       cleared slum (the owner: "hard to imagine that it would be torn down into a slum if it was filled with
       mansions").
  - **Asymmetry — speed by direction and by the stock's replaceability (owner: "much easier for a poor neighborhood
    to grow rich and merge plots").** The rung durations are rows of the **ladder table** (`WealthLadderTable` in
    `@plat/tables`, §7.6, §14; our own rows, calibratable, §13.9; tendencies changeable per region and era, item 23),
    keyed by direction and by the stock's `replaceability` — a column of the template rows of the class table (§10.2), read
    at the plot's `builtBand` row: `immediate` (tents, sheds, hovels), `short` (cottages and the row houses of the
    poorer bands), `long` (the row and detached houses of the prosperous bands), `ruin_only` (manors, halls,
    institutions) (J-A31.42). Growing rich reaches rung 3 within a few epochs because it replaces cheap stock; growing
    poor stays at rungs 1 and 2 for generations, because expensive stock is not torn down, so splitting waits for
    vacancy, ruin or a destructive event. Every duration in years here is read on the weekly clock (*The clock*, below):
    the years a block has spent in its band are (the epoch's week − the week of the epoch that marked it, from its
    `EpochRecord`) ÷ 52. Default rows:

    | replaceability of the standing stock (at `builtBand`) | years in the band before rung 2, growing rich / poor | rung 3 growing rich: fusion after purchase and vacancy | rung 3 growing poor: splitting |
    |---|---|---|---|
    | `immediate` | 0 / 0 | in the due epoch | on vacancy, ruin, a destructive event or redevelopment |
    | `short` | 0 / 10 | after 10 years in the band | the same |
    | `long` | 10 / 20 | after 30 years in the band | the same |
    | `ruin_only` | 10 / 30 | on vacancy, ruin, a destructive event or redevelopment only | the same |

  - **Churn.** The table's **churn cap** rows bound every epoch, per kind — `geometry` (rung-3 re-cuts and rebuilds),
    `fabric` (the decline lottery's strikes, below), `use` (the use step's relocations, below) — as a share of a
    district's plots (or uses) per decade, scaled by the epoch's `years` — a fraction of a year allowed, the scaled cap's
    fractional part the chance of one more, drawn on `epoch.transform` keyed by the district, the kind and the epoch (no
    new concern; J-A76.44) — and a maximum per block per epoch; defaults
    0.05 / 0.10 / 0.10 per decade and 2 plots per block (the former "10 % of a district's plots per decade" is the
    `fabric` row). Candidates beyond a cap wait, in address order, so a neighbourhood changes over many epochs, never
    all at once; item 17's cap and the lottery's bound are rows of this one table (J-A31.46).
  - **The geometry floor (owner: "their floor is bounded to middle class … once a neighborhood generally gets to a
    middle class outcome, that forever remains its geometry until vacancy, ruin, fire, war, or redevelopment shifts
    things entirely. it would cycle … between rich and middle").** Each plot persists `builtBand` and
    `builtProsperity` — the band and field value its present stock was built for (§2.5; in the model digest, §6.2; never
    recomputed from the field, unlike the fields themselves, J-DET-12) — and derives, never stores, `geometryFloor =
    min(builtBand, FieldBands.middle)` by the band order: the settlement's middle band (§4.5 names it) for stock built
    at or above it, the stock's own band below it — a hovel cannot read poorer than a hovel; it can only be replaced
    upward. The plot's **manifested band** is `max(field band, geometryFloor)` and its manifested value `max(field
    value, floor value)`, the floor value being the middle band's lower cut, or `builtProsperity` when the floor is the
    built band. A **block-level read** — S10 (2)'s granularity rows, II.3's dispatch — takes the block's manifested band
    as `max(block band, the floor of its standing plots' area-weighted median)`: the plots ordered by `geometryFloor` in
    the band order (ties by address), the floor at which their cumulative area first reaches half their total; a
    plot-level read takes the plot's own (J-A31.43). Every change other than a rung-3 event reads the manifested band and value for what is BUILT — S10 (2)'s
    granularity rows, S11's template geometry columns (size budget, structures, storeys, heights, frontage, court and
    garden; J-A19.43), the yard partition (§4.9), II.3's block dispatch — and the field band and value for who is there
    and how it fares — households, condition, specialisation, the room programme, labels and descriptions (J-P1 stands:
    "the rich quarter" is still a description of the field). So a mansion district that grows poor reads as
    middle-class geometry — big plots, big shells, subdivided into lodgings, yards infilled — while its occupants,
    condition and names are as poor as the field says: **the interior has no floor** (item 28 (f)) — the shell keeps its
    floor while its rooms follow its occupants down §2.6's interior ladder, to single rooms off a corridor at the
    poorest, which is where the poor live when every area is developed (the same shells, a different interior; item 30's
    back courts behind them, the cheap stock of item 27's shanty rule at the edge, §4.5); between the rich and the middle
    manifestation it cycles freely and reversibly through rungs 1 and 2 (renovation and re-unification upward,
    subdivision and infill downward) with no frontage change and no shell falling toward a poorer band (renovation may
    extend a shell, item 18); the middle band is each settlement's own (§4.5's per-town cuts), so a town's middle and a
    metropolis's middle each bound their own districts (J-A31.43). **What writes `builtBand`** (J-A31.44): generation
    (the plot's band at S10); a rung-3 event, to the band of the new stock (an `amalgamate` that builds nothing — a
    thinned rear row or a cleared plot returned to its neighbour — keeps the `builtBand` and `builtProsperity` of the
    member whose frontage anchor the joined plot keeps, §6.3's JOIN); rung 2's `densify … back_court`, for the rear
    plots it creates only (their new stock's band; the front plot keeps its own); the hand edits of rung 3's kind, each
    re-deriving the stock by the user's act — `rebuild`, `demolish` then `build`, `amalgamate`, `subdivide`, `fill`, a
    `replace` close-up (II.4) and a New random of the block — and the authorial re-derivations
    that re-derive the stock itself: a field brush's or a `FieldBands` `setAttr`'s re-derivation and `Adjust` (§7.2,
    §7.4 — a brush is how a user designs the town, so it re-derives its scope to the current band; the floor governs
    wealth change over epochs); and a **completed upward refurbishment** — a `mutate` whose result meets a higher band's
    shape template raises `builtBand` to that band, so a renovated quarter keeps its floor (the owner's "refurbished
    housing"). Nothing else lowers it: rungs 1 and 2 never lower a standing plot's
    `builtBand`, and wealth change over epochs lowers it only through rung 3 (a completed upward refurbishment raises it,
    and rung 2's rear plots take their stock's band). Regenerate (keep settings) keeps it (a recorded input, §2.8); a member a split
    `resurrect`s takes it from the rung-3 event that re-cut it, not from its tombstone (§6.3); a document written before
    the attribute existed gets `builtBand` = its plot's `DerivationRecord.band` and `builtProsperity` = its recorded
    sample, exact for every document without an epoch (§7.5). The floor draws no random numbers. With no epoch the
    manifested band equals the field band everywhere.
  - **Lineage survives, so the seed survives (J-A31.48).** Fusion and splitting continue lineage by §6.3's JOIN and
    SPLIT rule (J-A31.73), so one seed with one history gives one town, and an undo returns the former plots exactly from
    the undo record's rings and records (§7.4). Every ladder event is a mutation that continues lineage; only a
    re-derivation takes fresh lineage (§6.3's succession rule; the owner: "It's not new rerolls its modifications and
    variations to the original seed").
  - **The epoch's order** (the engine's loop on the base's path). Before S2: the rung profile is read at the epoch's
    population target (*The rung at an epoch*, below), the dials' applied standings and shares move past their hysteresis
    (*The dials' inputs over epochs*, below) and `TradeFlow` is re-read from the epoch's trade slice on the current
    geometry (§4.3; item 77). After S2's delta demand: (a) S6 re-evaluates the
    drivers and the bands, re-bands every live plot's `fieldBand` against its own column by §4.5's rule (§2.5;
    J-A28.29) — before any rung reads the field band, the former values in the epoch's undo record — and marks the due
    blocks; (b) the use step (item 17, below) closes, opens and relocates uses;
    (c) when the target fell, the roster's suffix leaves in reverse ordinal order — a building whose household count
    falls but not to zero takes a `relet` down (an unstored plan rung `stale`, a stored plan re-cut in the event) and `vacate` fires only when its last household
    leaves; the decline lottery (below) draws per building, deciding whose households leave first, and strikes fabric by
    its exposure (item 28 (f) with item 8; J-A28.45); (d) the
    ladder runs its rungs on the due blocks under the churn cap; (e) the dossier events that arrive with the epoch's inputs
    (`EpochInputs.dossier`, below, in the host's order) are applied here as mutations at that epoch — S10b's `dossier` request and S11's mutator on the current map (§4.7,
    §7.7; item 22 (e)), never a re-roll — it remains what the seed, the ordered history and its own edits make it
    (J-A22.42); (f) siting places the delta in the regrowth-first order below, from its step (0) — a `relet` up in a
    standing shell before `reoccupy` of a vacant one (J-A28.45); (g) a
    residual grows a stage (S5); (h)
    every live placement rejection (§7.7's record, item 20) is re-checked by §7.7's lapse rule (J-A20.74, J-A20.41), the
    epoch writing `lapsedAt` inside its own touched set, and a lapsed site is eligible again from the next placement on;
    (i) the **character step** (item 72): §4.5's S12c on the grown town — each district's character vector, identity
    (past its hysteresis, re-typing a kind its identity row names) and band range re-derived, the clamped excess added
    to its pressure, a district whose identity changed renamed by §6.3's epoch case (§4.5 (8)–(9), §10.4) — and
    `TradeFlow` re-derived on the grown geometry (§4.3); (j) every physical change of steps (a)–(g) is shown on the
    ground by a Works started inside the epoch's span, and every Works that finished more than `works.retainWeeks`
    before the epoch's week is retired (*Works*, below; item 67).
    Each step's events cite the epoch; the whole is one `epoch` event's fold (§7.4). A dossier event between epochs is
    applied at its own log position by the same request and mutator (§7.7); a dated one — between epochs or carried by an
    epoch — keeps its `dossierChange` (§7.1, item 75) and starts its Works at the change's week.
  - **Regenerate, Adjust and the derivation record.** A transformed entity's `DerivationRecord` is updated; every other
    plot keeps its record, so "Regenerate (keep settings)" on an untouched block reproduces it byte for byte, and
    re-deriving it with the new field is the explicit `Adjust` (authorial, above). Siting across epochs places only delta
    demand, in the regrowth-first order below.
* **Test (M4).** On a town with walled, ribbon and suburb regimes, adding a stage re-rolls 0 survivors, adds ≥ 1 primary
  when its gate law asks for one, and replays from the log to the session hash. The ladder's, the floor's and the epoch order's hook tests are §13.2's
  (item 31), as are the Works', the clock's and the character step's (items 67, 72 and 76).

**Conversions** are typed plat operations with recorded events. `ConversionOp` is defined here, once, as one union: the
base's own kinds, the ladder's (`LadderOp`, item 31, the Survivors rule above), the decline hooks' (`DeclineOp`, item 8, below),
the use step's (`UseConversionOp`, item 17, below), the terrain and water conversions' (`TerrainWaterOp`, item 25, below)
the passage sealing's (`HiddenOp`, item 30 (e), below) and the underground's own kinds (item 65: the buried old town's
`RaiseGrade`, II.7.6, and the undercity's `ClearUndercity`, II.7.5, declared there); §7.1's `convert` event carries it, and
`build` below is §7.1's
`build` event:

```ts
type ConversionOp =
  | { op: 'wallToWay'; enceinte: Id; widthCm?: Cm } | { op: 'gateToJunction'; gate: Id; square?: boolean }
  | { op: 'outskirtToDistrict'; region: { ring: Polygon; key: PlatKey } /* the outskirt faces it covers; no stored slots, §2.2 rule 5 */ } | { op: 'demolish'; id: Id }
  | { op: 'rebuild'; building: Id; cls: BuildingClass /* the whole replacement a ruin or a redevelopment calls for (rung 3), never a designation change (§4.7 S11) */ }
  | { op: 'build'; plot: Id; cls: BuildingClass; footprint?: PolygonCm /* as §7.1's build event */ } | { op: 'carve'; kind: 'canal'|'moat'|'harbour_basin'; polygon: Polygon }
  | { op: 'abandon' | 'decay' | 'ruin' | 'robStone' | 'clear' /* removed to a footprint trace */; building: Id } | { op: 'plotToGarden'; plot: Id } | { op: 'contractWall'; enceinte: Id; trace: Polygon }
  | LadderOp | DeclineOp | UseConversionOp | TerrainWaterOp | HiddenOp | RaiseGrade | ClearUndercity;
type LadderOp =                                                                            // item 31's rungs (Survivors, above): each a mutation with an undo record (§7.4), usable by hand (§7.1)
  | { op: 'relet'; building: Id; households: number /* rung 1: the household count the roster fills, within §2.6's capacity (J-A28.23); a stored plan is re-cut inside this event, an unstored one goes stale and is re-cut on the click, both along §2.6's interior ladder (§7.3; item 28 (f)) */ }
  | { op: 'densify'; plot: Id; as: 'infill' | 'back_court' /* rung 1: sheds, hovels and a workshop in the yard, the garden built over; rung 2: rear plots in the yard reached by a new passage (§4.6, item 30) */ }
  | { op: 'thin'; plot: Id; what: 'infill' | 'back_court' /* the inverse: infill cleared and re-gardened (§4.9) after its uses relocate and its households are re-homed (item 17's relocation, or a `relet` up in a standing shell within §2.6's capacity) and its buildings vacated; a back court likewise, its passage sealed */ }
  | { op: 'subdivide' | 'amalgamate'; plots: Id[] /* rung 3 only, on vacated plots: S10 (7)'s law in its incremental form — the due block re-cut with its neighbours fixed; §7.1's plot split and join are the hand forms */ };
```

**`wallToWay(enceinte)`** is `retypeEdges(ChainRef('wall', enceinte), add ('way', the new ring road), remove 'wall')`: the
wall chain becomes the spine of a `primary` way with a ring-road width, on the same edges; the wall strips' setback and
glacis lines are removed, so the strips merge into the faces beside them, their band, tower and gatehouse faces are
cleared with the rest of their finer content, and S9's `corridorUnion` re-derives the ring road's corridor there; towers
are removed; gates become junctions with a `square` option. **Clearance (GEO-38):** the new corridor needs half its width
on each side of the old wall line; where the half-band plus setback on a side is narrower, plots meeting the new corridor
are clipped along its edge — a plot keeps its id when its frontage anchor survives (O8 g), and footprints that no longer
fit are demolished with lifecycle events (cause `convert:wallToWay`).

**`carve` — a canal, moat or basin added by an edit, or an outer moat by S5a (§4.4).** The dry run decides every way's fate
and the carve's one **footprint** before any batch runs. Let `S` be the channel ⊕ its bank setback. Every way whose corridor
meets `S` takes a fate by class (J-P30), recorded as lifecycle events with cause `convert:carve`:
* **kept with a pinned deck** — every `through` and `primary` way, and any other way that is the only connection of the
  streets on its far side to a gate or the plaza. Its deck (S1 (5)'s form, perpendicular to the channel) and its
  **re-route** are solved in the dry run by §7.3's S4 local operator — between the way's nearest pinned nodes on either side
  of `S`, on S3's lattice with `existingFabricCost` (so it keeps near its old line), through the deck as a fixed graph edge;
  a way that already meets the channel within ± 10° of its normal keeps its line and only its stretch across the channel
  changes. The old stretch between the re-route's two ends is the way's **replaced stretch**. S7's rules give the deck its
  `Bridge` (events: `altered` on the way, `built` on the bridge);
* **cut** — every other `secondary`, `lane`, `alley`, `cul_de_sac`, `track` and `path`: its stretch inside the channel ⊕
  max(bank setback, 1 m) is removed, so every cut end lies at least 1 m from the channel, and a remainder that now dangles
  shorter than one block depth is pruned (events: `altered`, `demolished`); `quay` and `pier` ways are cut the same way and,
  where they met the new water at ≥ 30°, extended from the cut end to the new bank as a quay or a landing.

**Other crossings (J-I13).** A wall trace that `S` crosses has its **run** — the trace between the nearest unaffected towers
on either side of the crossing — re-traced as data in the dry run, with a water gate where the channel crosses, as §7.3
(b) 2 re-traces a run a moved river crosses. The stretches of the run's strip lines alongside it — the inner setback line,
the glacis line (or the moat's inner bank, which is water and stays) and, where the era row has one, the intervallum —
between the feet of the perpendiculars from the run's two end towers leave with the old run, and S7's operator re-cuts them
along the re-traced run from those feet (batch (3)). Every way the re-traced run's new strips — the new run ⊕ (half its band
+ its setback, and + its glacis or berm on the field side) — will meet, other than a kept way through a gate of the run
(whose corridor ends each strip, §4.8), takes the `cut` fate at the strip's boundary, as `drawWall` cuts the ways its new
strips meet (§5.2, §7.4), and every plot inside the new strips is re-derived with the rest of `R`. A locked or pinned way,
wall or finer entity, or a reservation, inside `S` or inside a new strip returns to the dry run as an F-EDIT conflict (lock
> drawn geometry; Re-derive from S3 offered for a reservation, §5.2), as for S1's water operator.

**The footprint (J-P34).** `C` is the set of L1 cells (the faces of the L1 view) that (a) the channel ⊕ (`attractCm` + bank
setback) meets; (b) border a removed stretch, a pruned remainder or a stretch the new strips' cuts remove; (c) border a kept
way's replaced stretch or are crossed by its new route; (d) where the channel crosses a wall, border the old run or the
strip-line stretches batch (1) removes with it, or meet the re-traced run ⊕ (half its band + its setback, and + its glacis
or berm on the field side) — the ground its new strips will take. The **footprint** is `R` = ⋃ `C`, exactly: every point of
the arena lies in one L1 cell, so the channel's buffer lies inside the cells (a) names, and no cell outside `C` holds a face
any batch of the carve clears, splits or re-derives. `R` is the carve's one clear region: batches (1) and (2) declare it as
`KernelTx.clearRegion`, step (4) re-derives exactly its cells, the fate report lists exactly the protected entities inside
it, and the locality checks — §3.3's clear-region confirmation, §7.3's carve row, the §13.1 and §16 M3a fixtures and the
O18 (g) / O2 (c) perturbation test — require byte identity outside it, less the seam exception at its boundary (step (4)).
By (b)–(d) no plot outside `R` loses its access (a plot's access edge lies on a kerb of a way it fronts) and batch (1)
removes no edge a kept face uses (no `E_KEPT`); inside `R`, S10 gives every plot an access edge by construction (O5 a),
and S8's deep-interior rule and F-PLOT's alley rung act as in any block. The wall-crossing fixtures are §13.1's and
§13.2's.

**The batches**, each single-level (§3.3):
1. **L1, clear region `R`.** `clearFiner` on `R`'s cells; the cut stretches, the pruned remainders and the kept ways'
   replaced stretches are removed, each through its `StretchRef` (§3.4) — a way cut in two first hands its far part to a new
   way by `retypeEdges`' `rekey` on that part's `StretchRef`; each kept way's new route is inserted whole, across the line the
   channel will take, with its deck's two bank vertices placed on it at the new bank points — carrying `deck_end`, pinned —
   and the span between them carrying the structural `deck` role beside `way`, so every kept way stays one connected chain
   through every batch; each crossed wall run is replaced by its re-traced run, with its water gate's two bank vertices
   carrying `('gate_end', gate, 0 | 1)` under a fresh `Gate` (§2.2 rule 7), the old run leaving with the stretches of its
   strip lines alongside it (each through its `StretchRef`, its ends placed by `splitThrough` at the feet of the end towers'
   perpendiculars); the ways the new strips will meet are cut at the strips' boundaries; and every other L1 edge the
   channel's banks will cross that is no way — a settlement-perimeter or other district-boundary stretch, a wall strip's
   setback or glacis line outside a re-traced run — is split at its two bank points by `splitThrough`, each carrying an
   `anchor` contact name (§2.2 rule 7: the entity of the edge's first own-level row, the smallest free ordinal — from 2 on an
   enceinte), with the stretch between them removed through its `StretchRef`; the map's `border` line is split at its bank
   points the same way but kept whole across the channel (§3.3 clear regions, rule 2; the arena's outer ring is L0 and meets
   the channel at its own level, §4.1). Those `deck_end`, `gate_end` and contact-name vertices are the carve's **prepared**
   vertices; every cut end lies ≥ 1 m from the channel, so no way is prepared except at its deck.
2. **L0, clear region `R`, `KernelTx.prepared` = the `deck_end`, `gate_end` and contact-name vertices of (1) (J-P40).** The
   channel's ring is inserted and attracts onto and promotes the prepared vertices, stripping the contact names (§3.3 rule
   3, §3.6); each deck span — the kept way's own edge between its two promoted bank vertices — now crosses the water as the
   `Bridge`'s deck (§2.2 rule 7), and no L0 edge crosses the channel, so the water body stays one L0 face. Any other contact
   with finer geometry is `E_LEVEL` or `E_KEPT` and returns to the dry run.
3. **L1.** Each kept quay or pier is extended from its cut end to the new bank (its end a Steiner vertex on the L0 bank line,
   §2.2 rule 3); S7's operator re-cuts the wall strips' setback, glacis and intervallum lines along each re-traced run from
   the feet (1) left, closing them on the new banks, and builds its towers and the water gate's `Gate` record, whose `banks`
   name its two `gate_end` vertices (§7.3's S7 row).
4. **Re-derivation of `R` (J-P43).** S6's operator, restricted to `R`'s cells, after the L0 batch: each land face of `R`
   takes the district — or the hinterland pseudo-district, or the `wall_strip` typing — of the pre-edit L1 cell that held
   the larger part of its area (ties by id). A boundary stretch removed under the water lies between its two bank anchors,
   so the L0 batch re-separates the land on either bank along the boundary that remains and no land face spans it: a canal
   across the settlement perimeter leaves the land outside it with the hinterland on both banks (0 district faces outside the
   perimeter; fixture §13.2), and a block part beside a crossed glacis line keeps its own block's typing. The same rule
   settles a boundary stretch removed on land — a cut way that carried a district boundary — by the larger part. The new
   strips (3) cut are typed `wall_strip` and take their district as S7's strips do (§4.8), and the channel's water faces
   leave the district face sets they were cut from. Then S8–S12b re-derive `R`'s cells by tree scoping (§7.3 item 2) — S8
   first, because cuts and replaced stretches merge and reshape L1 cells — with S10's step (0) for `R`'s faces beside a wall
   trace, the settlement perimeter or a shared reservation boundary (§4.7). Where a batch of the carve adds or removes a
   junction vertex on a spine that bounds `R`, the far side takes II.1 (3)'s neighbour step or its reversal; those steps and
   the `Seam` records of `R`'s districts are the carve's seam exception, the same set a district's reroll has (§7.3 item 1),
   which the locality oracle computes from the commit records. A carve therefore costs its footprint, not the town.

At S5a nothing finer than L1 exists yet and the channel meets only the arterials through the stage's gates: every way is
kept with a deck, nothing is cut, and `R` clears nothing (§4.4). Every touched entity's lifecycle records the event with its
cause.

**A cut way's far part — the records that name a way (J-Fpipe-2, from Fable's review of 27 September 2026).** When the carve's batch (1)
hands a cut way's far part to a new way by `retypeEdges`' `rekey` — and S1's water operator, which cuts ways the same way
(§7.3 (b) 3), likewise — the rekey moves the far part's role rows, knot rows and vertex role rows and no record (§3.4), so the same batch
**re-points every record that names the way by id along the far part** to the new way: the `Frontage` records of the
blocks along it (`Frontage.way`, §2.5), `Bridge.way` of a built deck there, `Gate.way` of a gate there (§2.7),
the `Greenery.along.way` of its avenue and street-tree rows (§4.9; §2.7), `Junction.arms` at its junctions
(§2.4), `Tunnel.follows` of a main beneath (§2.7), and the `SeamEdge.chain`, `Portal.wayId` and `SeamAmendment.spine`
entries of the `Seam` records that name it (II.1). Those records lie outside the footprint `R` and change only by that id:
this is the carve's **identity exception**, which the locality oracle admits beside the seam exception (§7.3 item 1, item 7
(ii)) — every such record equals its prior record except that the new way's id replaces the old, and every other entity
outside `R` stays byte-identical. Which part keeps the old address is §6.3's anchor rule — the part keeping the old anchor
(§7.3 (b)); the far part is keyed by §6.3's SPLIT rule as a split plot's or tunnel's part is (J-A31.73, J-A11.43),
continues the lineage, and **keeps the parent's name and naming record without a draw** — a street a canal severs is one
street on both banks, so S13a draws nothing and its label candidates for the new way are built inside the carve's S13a
delta (§7.3 item 2). A `Frontage`'s `class` and `lengthCm` are unchanged (the class is the way's and moves with the
rekey). The carve's undo restores the one way and every re-pointed record (§7.4). *Test (§13.2, with §13.1's carve
fixtures):* after a canal that cuts a `lane` and a `secondary`, §5.3's reference-integrity row holds on every record that
named either way, 0 records outside `R` differ from their prior other than by the new way id, and both parts of each cut
way carry one name.

**Coherence from one seed (owner).** Epoch N+1 is derived from epoch N's persisted state, the inputs and the seed's epoch
sub-stream `…/epoch=<n>`: the same town under different inputs has different histories, under the same inputs the same
history, and nothing that survives is re-rolled, because a survivor keeps its lineage and its derivation record (§6.3,
§7.3).

**The evolution engine is the owner's later stage (DEF-8); its hooks are concrete now.** The owner's history — growth,
regression and growth again: houses emptied and robbed for stone, plots turned to gardens, a shorter wall ring inside the
old one, ruins left standing — is expressed with the base's own records: the transformation and conversion kinds above
(`abandon`, `decay`, `ruin`, `robStone`, `plotToGarden`, `contractWall`, the ladder's `LadderOp` and the `DeclineOp` kinds
below), which a user can also apply by hand in the base (§7.1); the lifecycle history on every entity; the epoch streams; the circumstances timeline (§7.7); and the sequential
roster (a population fall selects its suffix in reverse ordinal order; the decline table's exposure lottery, below,
chooses which buildings empty). A ruined building keeps its footprint and heights and draws with the ruin program and the `none` roof kind (§2.6, §8.2); when and where the engine
applies these kinds is its own rule table over the `…/epoch=e` streams. The engine plugs in behind one interface, and the
base registers only its own path:

```ts
interface EpochInputs { week?: number /* item 76: the absolute week at the epoch (The clock, below) — a dossier-bound map's is SettlementForge's calendar.elapsedWeeks; absent on a standalone call, then the previous week + round(52 × years) */;
  years: number /* derived from the weeks: (week − the previous epoch's week, or the creation week) ÷ 52, a fraction allowed */; populationTarget: number;
  circumstances: CircumstanceSlice /* §7.7 item 2 */; events: { kind: string; params: Record<string, number> }[];
  dossier?: EditEvent[] /* the host's dossier events (author 'host', EditBase.dossier set), in the host's order, applied at step (e) (§7.7 item 6); each keeps its EditBase.dossierChange (§7.1, item 75) */ }
interface EvolutionStrategy { plan(doc: Document, inputs: EpochInputs, tables: TableView, rng: Stream): KernelResult<(ConversionOp | EditEvent)[]> }   // registered by name (§4.12)
// base registration: 'grow-by-stage' — the path above; the owner-staged engine registers its own strategy and reuses every event kind
```

The base builds and tests exactly one path — **add a growth stage to an existing town** — at M4 (G-P13), because it is the
same path "regenerate this area" uses.

**The clock — weeks (item 76, with item 67's Works; owner: "our simulator advances by units of one week").** "Our
simulator" is the clock that changes the map's inputs — the host's (SettlementForge's) or the staged evolution engine's —
never `@plat/sim`'s `time` view key, which changes nothing (§10.3; J-A76.41).
1. **The week.** The map's time is an integer week. For a dossier-bound map it is SettlementForge's
   `calendar.elapsedWeeks` — no conversion; never `elapsedMonths`, never `history.age` — and its creation week is the
   port's `HostContext.week` (§14) or 0; a standalone map starts at week 0. `EpochInputs.week` is the absolute week at the
   epoch and `years` is derived from it (above); a standalone `grow` call that gives `years` only takes the previous week +
   round(52 × years) and re-derives `years` from the whole weeks, so every reader sees one clock. A dossier event carries
   its week in `dossierChange.week` (§7.1, item 75). The document's current week is derived — the week of the last folded
   event that carries one — never a stored counter (§2.9), and each epoch's week is its `EpochRecord`'s.
2. **Dating a dossier change.** The port (§14) dates each change it finds by the first of these rungs that gives a week: an
   explicit tick on the change's receipt (`foundedAt.tick`; lifecycle `institutionHistory[].tick`;
   `populationHistory[].tick`; `activeConditions[].triggeredAt.tick`; campaign-era `historicalEvents[].tick`;
   `decrees[].tickRef`; `calamityHistory[].tick`; `previousGovernments[].tick`; a news tick; the provenance ledger's tick),
   then the week suffix of the change's outcome id, then `HostContext.week`, then none: a change with no week applies
   finished, with no Works (§7.7 item 1 reads these rungs; the port counts an undated change in its report).
3. **The season — one calendar (J-A76.42).** `CalendarRow` gives the week of the year, `(week mod 52) + 1`, and its
   season: a dossier-bound map reads the row `sf445` (52 weeks; four seasons of 13 weeks from spring; month ends at weeks
   4, 8, 13, 17, 21, 26, 30, 34, 39, 43, 47, 52), a standalone map our own default row, shaped alike (month ends 4, 9,
   13, 17, 22, 26, 30, 35, 39, 43, 48, 52). The Works' pauses (below), §8.2's season rows for a campaign week and the
   module read it, and no second calendar exists (`tables/dossier/calendar`, §14).
4. **The cadence.** The port folds a dossier's discrete changes as standalone dossier events at their weeks, in
   SettlementForge's order (decrees first), and an `epoch` at each 52-week boundary crossed — or sooner, when the dossier's
   population has moved from the last epoch's `populationTarget` by more than the **roster tolerance**, ± 5 % (J-A76.43;
   the one number §7.7 item 3's lapse reads too) — carrying the target, the circumstance slices (§7.7 item 2), the event
   kinds and that week's dossier events in `EpochInputs.dossier`; a catch-up batch follows the same rule, gaps allowed.
   No epoch is folded per tick: the Works' stages are derived from the week at any drawing (below), so no weekly epoch is
   needed to show them. A standalone map's epochs are its circumstance timeline's (§7.7, dated in weeks) or a user's
   `grow` calls.
5. **Rates per year (J-A76.45).** Every chance this section states per unit of time is per year, applied over an epoch's
   span as `1 − (1 − p)^years` through `dmath` (§6.5 (3)); dwell bands and ladder durations are in years read as weeks ÷
   52; the churn caps scale by `years` (above) — so epochs a few weeks apart and one a decade long change the town at the
   same rate. II.6's island slots follow the same rule.

```ts
interface CalendarRow { id: string /* 'sf445' — the dossier's; 'plat-default' — ours */; weeksPerYear: 52;
  seasons: { season: 'spring'|'summer'|'autumn'|'winter'; fromWeek: number /* week of the year, 1-based */ }[]; monthEnds: number[] /* twelve week-of-year ends */ }
```

**The rung at an epoch (item 81 (b); J-A81.41).** At each epoch the rung profile is read at the epoch's
`populationTarget` (§1.1's ladder): a crossing of one of §1.1's bands changes the rung's row — its granularity,
greenery, layer and budget rows — for everything the epoch builds from then on, and the standing fabric survives exactly
as it survives a growth stage (§6.3). A crossing upward whose town the frame no longer holds grows the frame to the one §3.2 (9)
gives the new target: S1 derives terrain, water and the hinterland's ground on the ring between the old margin and its
successor — the same terrain field continued, each water body continued across the old margin with its inner reaches fixed
— and the kernel grows the frame by §3.2 (9)'s single-level batches over one clear region (J-A81.31) — an L1 batch clearing the finer content of the whole L1 faces beside a lapsing stretch of the old chains or under the new rectangle, an L0 batch replacing the `margin` chain, an L1 batch replacing the `border` chain — each raster growing by whole cells as §3.2 (9) states, every stored height unchanged and the flow fields recomputed over the grown grid. The pipeline then continues on that region and the ring: S4 continues every through-road from its old end to the new margin, S12a sites the hinterland on the ring; the stages that own the cleared faces re-derive them (the hinterland unit for the hinterland's, a district's S8–S12b for a district's; on each underground part §3.2 (9) grows, that part's stages for its cleared faces — part 0's network stage its bands by `corridorUnion` (II.7.2) and II.7.3's stage its plots, each other system's stage (catacomb, cavern, quarry, vaults) its own part's bands (II.7.6) and II.7.5's stage the undercity's plots there; on the `buried` and `dug` parts, which no stage re-derives at an epoch — a buried town, laid from a history scar at generation or made by a `raiseGrade`, and the passages access edits dig — their cleared bands re-laid from their kept gallery chains by `corridorUnion` (§3.7), which draws nothing); every face outside the region, off a deleted stretch and off the ring keeps its ring, owner and nested faces. The frame never shrinks: a declining town keeps its frame and its hinterland.
II.6's island gate is one reader of the rung. A dossier outside the ladder — below 1 500, or above the 120 000 cap — is refused by the port (§7.7 item 15, item 81; §1.1; J-A81.01) and never reaches an epoch, so §3.2 (9)'s clamp of the frame's target at the cap serves only growth that carries no dossier.

**The dials' inputs over epochs (items 72, 78 and 79).** At each epoch, before S6 re-evaluates the drivers, a power's
applied standing (`PowerStanding.appliedStanding`, §7.7 item 2) moves to the epoch's standing, and a sector's applied share
to the epoch's share, only when they differ by more than `dial.hysteresis` (0.05, a dial-table row); both are folds over
the epochs' slices in log order, so a replay reproduces them and §4.5 (6)'s dials follow the dossier's powers and economy
without flickering at every small move.

**Uses across epochs (item 17) — the hooks now, the engine's step later.** A **use** — a shop, workshop, inn or
institution — is its own record (`Use`, §2.7), separate from the buildings that house it: a building references its
current use or none (vacant) and keeps `formerUses`, so a use can close in one building and open in another while the
building persists — vacant, re-let or converted. The base builds the hand path: the conversion kinds below, applied by a
`convert` event (§7.1) — `openUse` on a vacant plot or building (the building mutates to the designation by §4.7 S11's
operator), `closeUse` (the building stays, vacant — the first state of the decline hooks above — or converts to a named
designation), `relocateUse` (a `closeUse` here and an `openUse` there under one event, `detail.from` and `to` on the use's
lifecycle event, §2.8; `swapUse` is two relocations) and `mutate` (§4.7 S11) — each with its undo record (§7.4) and
reported to a host (§11.3). The staged engine's **use step** runs at each epoch after the roster's delta demand and before
siting, as the same events: (1) **re-score** — for every use, §4.7 S10b's solver scores its present plot and the best
alternative within its catchment (the district and its neighbours, `serviceRadiusM` of §10.2's `useRules`) against the
current field, distribution and supply graph; (2) **inertia** — a use moves only when the alternative beats the present
plot by more than the row's `inertia` and the row's `moveChance` draw falls (the `use.relocate` concern on the use's
`…/epoch=e` stream, §6.1), closes only when its catchment's demand (the households within its radius against the roster's
ratio) has been below `closeShare` for `closeAfterEpochs`, or a hard supply edge has had no provider in reach for
`starveAfterEpochs`; a dossier-backed use never closes by this rule (*Dossier content across epochs*, below); new demand (the roster's suffix) opens uses where the solver scores best — so markets and shops drift
toward where people live and inns toward the busiest gate, by distribution, never by a fixed order; (3) **cap** — at most
the churn cap's share of a district's uses relocates per epoch (the survivors' ladder's churn cap above carries one row
per kind — fabric transformation, use relocation; item 31); (4)
**assignments** — a host or owner assignment is a stable identity that moves with its use under the same rules unless
`pinned` (§7.7, item 20 (g)), in which case it stays and the town adapts around it; every change is reported; (5)
**traces** — a vacated building keeps its former use in `formerUses`, which a later opening prefers (a former inn reopens
as an inn first; a dossier element whose assignment returns to `active` reopens in its former building first, repaired by a
Works when the change is dated — item 80, §4.7) and the naming engine may read (§10.4); (6) **concealed uses** — a
concealed use (item 63) relocates by these rules like any use, and its front stays an ordinary business (§4.7's
*Concealed institutions*). Uses are visited in address order; one seed and one circumstance
timeline therefore give one history of openings, closings and moves; households and postings follow (§10.3).

**The epoch-spread mutation (item 18 (c)).** Across epochs a designation change is not applied at once: the engine issues
§4.7 S11's `MutationRecord` as a sequence of `mutate` events over the ladder's rung durations (item 31) — first occupy,
when the present design is compatible (every kept part, nothing added); then adapt; then extend (the adds); and rebuild
only the parts that cannot be adapted — the same steps and the same draws, spread in time, so a smith moving into a richer
street mutates toward the richer template over epochs. Each of those events decides and records its step at once, as a
host or user change does (§4.7 S11 step 6), and a Works shows it on the ground over the weeks it takes (*Works*, below;
J-A67.49), so the model never changes between events.

**Dossier content across epochs (item 20; J-A20.75, J-A20.43).** No step of an epoch closes a dossier-backed use (its
assignment's `existence: 'dossier'`, §7.7 item 2) or leaves one without a building; only a dossier event the epoch
applies at step (e) removes, adds or re-designates one (§7.7 item 2). The use step never closes one: where its catchment
or its supply fails, the use relocates to (1)'s best alternative by the solver's `dossier` request — its first closest
option where no plot passes the hard rows (J-A20.71) — or, where its catchment holds no candidate plot, stays in its
building; its moves by (2)'s inertia rule are any use's. Before any other step would empty or remove the building that
houses an unpinned one — a redevelopment's purchase, step (c)'s `vacate`, the decline lottery's strike, the growth
step's declared `demolish` or corridor re-cut, a carve, `wallToWay`'s clearance, `contractWall`, a terrain-and-water
repair, `fallIsland`, a tunnel's closing (II.7.3) or a passage's sealing — the use is first relocated the same way
inside the epoch, a `relocateUse` citing the epoch and counted outside the use cap, the request's scope its catchment
less the plots that step empties or removes, widened to the town where that scope holds no candidate plot; a pinned one
keeps its building, which the step treats as it treats any pinned entity (§7.2). So the dossier element is live and
placed at every step (§5.3's row). A dossier-listed ruin (`Assignment.state` `ruined`, §7.7, item 80) is present as its
ruin — its use closed, its building `ruined` — and no step repairs or clears it but a dossier event; a reopening returns
its use to its former building first (above).

The kinds these steps use join `ConversionOp`, defined above:

```ts
type UseConversionOp =
  | { op: 'openUse'; plot: Id; to: Designation /* §4.7 S11 */; building?: Id; assignment?: Id }
  | { op: 'closeUse'; use: Id; leave: 'vacant' | 'convert'; to?: Designation }
  | { op: 'relocateUse'; use: Id; to: Id /* the destination plot: a closeUse here and an openUse there under one event */ }
  | { op: 'mutate'; plot: Id; to: Designation; spread?: 'now' | 'epochs' /* §4.7 S11's operator; 'epochs' issues its steps over the ladder's durations */ };
```

**Decline and regrowth (owner, 2026-09-25: "growth, regression and growth where appropriate"; AM-8).** Regression is
growth read the other way: the population target falls, the roster's manifest shrinks by its suffix (§10.2), and the
fabric the suffix leaves behind steps down a ladder of states over epochs — never re-rolled, never removed by arithmetic
— until regrowth reoccupies it. The steps are scheduled by the owner's staged evolution engine (DEF-8, above); the base
carries now, stated here once: the ladders, the decline table with its exposure function, the salvage ledger, the lag
rule, the regrowth-first siting order — which binds the built `grow-by-stage` path today — and the conversion kinds, each
applicable by hand (§7.1) and undoable (§7.4). The states are §2.8's and the style classes that draw them §8.2's; §6.3
holds the identity rules, §13.2 the hook tests, §16 the price at M4.

* **The ladders** (§2.8's `Existence` value in brackets; every step is one conversion below, a lifecycle event with its
  cause). *Buildings:* occupied → vacant (`abandoned`: the use has left, the fabric stands) → derelict (`decayed`:
  roofless, `RoofSpec.kind 'none'`) → ruin (`ruined`: walls part-standing, the ruin program) → robbed or cleared
  (`cleared`: a footprint trace, its material in the ledger) → reused (`reused`: the trace, keeping its face, drawn as the
  garden, orchard or field it became — `Building.reusedAs`, §2.6 — or a successor building raised on the old
  foundations, which takes the trace's address, §6.3). Upward steps exist at every rung — reoccupy, repair, rebuild, reuse — and regrowth
  uses them first. *Walls and gates:* in use → neglected (`abandoned`) → breached or partly dismantled (`decayed`; the gap
  a `StretchRef`) → superseded by a shorter inner ring: `contractWall` traces and builds the new ring inside the old one
  through S5a's trace step and S7's operator, the old ring's record stays live with `Enceinte.supersededBy` naming the new
  one and its line persists as a trace — or becomes the ring road of the owner's original case by `wallToWay`. *Tunnels*
  (II.6's condition table), and the underground's galleries and chambers at the same persistence rate (II.7.5, II.7.6; item 65):
  in use → neglected, silted (`abandoned`) → partly caved in (`decayed`) → collapsed or sealed (`ruined`;
  `Tunnel.closure`), never demolished by the engine. *Islands* (II.6): floating → waning → settled → fallen. *Plots:* a
  plot whose last building is cleared or reused merges into a garden, orchard or field (`plotToGarden`) or into its
  occupied neighbour (`amalgamate`; §4.7 S10), so surviving households absorb the plots beside them and the plan coarsens
  where people are few — fewer, larger plots from loss, through the same merge operator as from wealth. Fields are their
  own layer: a struck farmstead's fields stay worked, their `LandUse.owner` passing to the nearest farmstead or to the
  commons.
* **The decline table** (`DeclineTable` in `@plat/tables`: an editable, versioned rule table with provenance, §7.6; our
  own rows, calibratable, §13.9). Its rows are tendencies — weights and chance, no fixed order (AM-23):

  | row | default | what it does |
  |---|---|---|
  | persistence rate per fabric layer | `use` 1.0 · `building` 0.6 · `plotBoundary` 0.3 · `street` 0.08 · `wall` 0.05 · `underground` 0.03 · `terrainWater` 0.005 | scales how readily a layer is struck: uses go first, then buildings, then plot boundaries; street and wall lines persist longest; the underground slower still (AM-11); terrain and water slowest (AM-25's conversions are the rarest events) |
  | exposure drivers | kernels over the context vector (§2.5) with weights, §4.5's construction: extramural (the district outside the outermost enceinte, as S10b reads it) +; `terrainClass` low, damp or flood +; downwind +; near the noxious kernels of field pass 2 +; the intramural periphery (`dist.wall` small inside the enceinte, `dist.centre` and `dist.market` large) +; low `prosperity` +; the resilient core (`dist.market` and `dist.plaza` small; the attractors at churches, the precinct and the castle) − | where decline strikes first, as weights |
  | chance share | 0.25 of the exposure field (the prosperity field's is 0.15) | causes vary and chance plays a part |
  | dwell bands (years; each drawn once as its step's `decay` Works duration, *Works* below) | vacant → derelict [10, 30]; derelict → ruin [20, 60]; ruin → cleared on salvage demand only; walls one band slower, tunnels two | the lag on the way down |
  | haul radius | 250 m | how far salvage travels |
  | exemptions | a locked or pinned entity is never struck; an assigned entity only through the use-relocation rule (AM-17); the building of a dossier-backed use only after that use is relocated (*Dossier content across epochs*) | the user's fixings hold |

* **The strike lottery** (the engine's step; the exposure function and the table are the base's). For an epoch whose
  target lies below the manifest, the suffix leaves in reverse ordinal order as the epoch's step (c) states — a `relet`
  down while households remain, `vacate` at a building's last household (J-A28.45); which
  standing fabric then steps down is drawn without replacement from a lottery over the candidates whose dwell band has
  run — for a building, whose `decay` Works has run its span (*Works*, below; J-A67.46) — weight `w = E(x) · rate(layer) · u`: `E(x) = clamp(Σ_j v_j · kernel_j(x) + ε_E(x), 0, 1)` the exposure field,
  computed per epoch on §4.5's 32 m cells from the current context vectors and prosperity field with its chance share;
  `rate` the layer's persistence row; `u` a draw from the `epoch.transform` stream keyed by the entity's lineage and the
  epoch (§6.1; no new concern); the draw bounded by the Survivors rule's churn cap per district and per epoch. An
  undefended suburb, a damp low quarter and the plot beside the tannery empty first as a tendency, the market core last,
  and a core house can still fall — a weighted tendency, not a law (J-A8.41).
* **Salvage — the material ledger.** `robStone`, `clear`, `dismantle` and `demolish` credit the town's `MaterialLedger`
  (§2.7) by the building's class-table yield (`salvageM3` per material, §10.2); `build`, `rebuild`, `reuse … build` and a
  repair (`reoccupy` from derelict) debit it by the new class's row from sources within the haul radius. The ledger is a
  flow record, never a hard constraint: a debit it cannot cover is built anyway and the shortfall is reported (J-A8.45).
  Its mark on the map: the lottery's weight for `robStone` and `clear` is multiplied by the salvage demand within the haul
  radius — the standing debits of planned building, repairs and a new stage's footprints — so cleared zones appear beside
  active building, and a ruin beyond any demand is left standing, the owner's "occasional old decrepit buildings or
  ruins".
* **Lag and memory.** Built extent follows population with a lag on the way down and none on the way up: a fall's
  households leave at once (step (c): a `relet` down, `vacate` at the last household) and the standing stock decays by the dwell bands over later epochs; a rise is met in the epoch it arrives by
  the regrowth-first order below, without a dwell (J-A8.47). Memory is the persistence order itself: plot lines, street
  lines, wall lines and traces outlast the buildings, so the old plan is there for regrowth to refill.
* **Regrowth-first — built now, on the one path.** In `grow-by-stage` (above) S2's delta demand is placed in this order,
  and only the residual grows a stage: (0) standing shells whose household count fell below what their occupants'
  band row houses relet up within §2.6's capacity (`relet`; J-A28.45); (1) vacant buildings reoccupied (`reoccupy`); (2) derelict ones repaired
  (`reoccupy`, a ledger debit); (3) ruins and cleared traces rebuilt or reused on their foundations (`rebuild`, `reuse …
  build`); (4) vacant plots of the old plan beyond the band's vacancy-run share (S10 (8) keeps the share; the design's own
  runs are never filled below it); (5) plots S10 cuts on the faces the old plan left unbuilt along its street lines inside
  the last boundary; (6) new faces of a new stage — where `Features.sewers` is on, the underground crowding hook first sends
  `crowdingShare` of the residual's poorest-band households underground (II.7.3 (c), II.7.4, §4.5 S7b (6)); S5a grows the boundary for the residual only, and an epoch whose
  residual is ≤ 0 grows no stage and adds no face. S7b allocates the delta first to (0)–(5) as each district's old-plan
  capacity and only the remainder to new faces; this replaces the rule that an epoch placed delta demand only on new or
  transformed plots (J-A8.44). **Test:** §13.2's T8-2 (M4).
* **The prosperity field under decline.** The drivers are re-evaluated per epoch (§4.5); under decline the market,
  harbour and main-street kernels shrink with their activity (§7.7's circumstance slice), and where plots merge the
  density field falls, so the field contracts toward the survivors' core and may concentrate there — the ladder's
  amalgamations are its footprint on the plan.
* **Islands and the underground over epochs** (their laws are II.6's). Each epoch re-reads the rung from its population
  target (§1.1; *The rung at an epoch*, above) and re-evaluates II.6's supply law: an island whose supported area shrinks past the hysteresis is resized
  (its rim's plots cleared with lifecycle events, cause `convert:resizeIsland`); one whose supply falls to zero — or whose
  settlement has left the CITY band (AM-13) — wanes, settles after its dwell band and falls: `fallIsland` archives its
  arena and lays a `ruin` decoration face (§2.7) over its projected outline on the ground through the carve path's
  clear-region protocol above, every entity under it demolished with that cause; regrowth re-floats a settled island
  before it raises a new one (J-A10.42). A tunnel silts, caves in and is sealed by the same lottery at the underground's
  rate, is never demolished by the engine (J-A11.41), and is reopened before a new one is dug.
* **Identity and determinism.** A vacant, derelict, ruined, cleared or reused building is a live record with its address
  and lineage (§6.3); it becomes a tombstone only by `demolish` or when a `reuse … build` successor takes its address
  (`supersede`, §2.8) (J-A8.42). Every draw above comes from `epoch.transform` or, for islands, `island.place`, keyed by
  lineage and epoch, so the same seed under the same circumstance timeline gives the same history of decline and regrowth
  and a different timeline a different one (§6.2, §7.7).
* **Emulation note.** Neither reference has time: with no epoch the static baseline is unchanged byte for byte (§13.3's
  goldens), and every rate above is a table value (AM-23).

The kinds this adds to `ConversionOp` — one list with the union above, which reads `… | DeclineOp`; §7.1's `convert` event
carries them all:

```ts
type DeclineOp =
  | { op: 'vacate' | 'reoccupy'; building: Id }                                          // occupied ⇄ vacant; reoccupy from derelict is a repair: roof restored, ledger debited
  | { op: 'reuse'; building: Id; as: 'garden'|'orchard'|'field' | { build: BuildingClass } } // a ruin or trace reused: the trace drawn as that kind (Building.reusedAs, §2.6), or a successor on the old foundations (Building.predecessor, §2.6)
  | { op: 'neglect' | 'breach' | 'dismantle'; enceinte: Id; stretch?: StretchRef }        // walls and gates; the old line persists as a trace; contractWall and wallToWay above supersede a ring
  | { op: 'silt' | 'caveIn' | 'seal' | 'reopen' | 'flood'; element: Id /* a tunnel, gallery or chamber (II.6's condition table); flood only on a gallery or chamber whose floor lies below the water table */; stretch?: StretchRef }   // the underground's ladder (II.6; J-A65.48); a `stretch` splits the record first; no engine plan contains demolish on a tunnel
  | { op: 'resizeIsland'; island: Id; areaHa: number; elevationCm: Cm }                    // the supply law's response: the outline re-drawn by §4.2's routine from the island's own stream; rim plots cleared, or new rim faces grown by the grow path on the island's arena
  | { op: 'settleIsland' | 'fallIsland' | 'refloatIsland'; island: Id }                    // waning → settled (elevation at the floor of its band, districts declined) → fallen (arena archived, a ruin face on the ground); a settled island re-floats first
  | { op: 'raiseIsland'; allocation: Id };                                                 // regrowth: a new island for a sky allocation the count law opened at this epoch, placed by SkyStrategy (II.6)
```

**Terrain and water change slowly (item 25; the engine is owner-staged, the kinds and the hand path are the base's).**
Reclamation, silting and river-course shifts are conversions on the one list — kinds `ConversionOp`'s union admits, the
slowest layer of the persistence order, never immutable — applied by hand in the base through §7.1's `convert` event and, in the staged engine, drawn at
the decline table's `terrainWater` rate by their own trigger rows (below). Each is a typed operation whose repair is an
operator the base already has (J-A25.41):

```ts
type TerrainWaterOp =
  | { op: 'reclaim'; kind: 'marsh'|'foreshore'; region: Polygon /* marsh: LandUse faces of kind 'marsh' or a damp or flood band re-typed as land; foreshore: a shallow water margin filled */ }
  | { op: 'siltReach'; water: Id; stretch?: StretchRef /* a reach or a basin: its width and depth profiles fall by the row's share; a basin below the harbour's draught loses its harbour use */ }
  | { op: 'shiftCourse'; water: Id; from: number; to: number /* control-knot ordinals (§2.3): the reach between them re-traced — a meander cut-off or an avulsion */ }
  | { op: 'digCanal'; polygon: Polygon /* the carve above, kind 'canal' */ };
```

* **Repair.** `reclaim` runs S1's terrain operator (§7.3 (a)) — the region's ground raised to the flood line plus the row's
  margin (`reclaim.raiseCm` 60), drained by a ditch water body and its `LandUse` faces re-typed with `reclaimed` set,
  as §2.3 states — and, for a foreshore, S1's water operator (§7.3 (b)) with the filled margin
  as the new shore; `siltReach` and `shiftCourse` are S1's water operator on the changed reach (the width and depth profiles,
  the shores as their buffer, the crossings re-sited, the kept ways re-routed, F-RIVER's re-trace confined to the reach,
  §7.3 (b) 1–2), so their footprint, fates and locality are the carve's and byte identity holds outside it; `digCanal` is
  `carve`. Every touched entity's lifecycle records the cause (`convert:reclaim` …); the record changes each kind makes
  are §2.3's.
* **Trigger rows (the engine's step; the rows are the decline table's `terrainWater` rows, §7.6).** Candidates and their
  chance per year — applied over the epoch's span as `1 − (1 − p)^years` (*The clock*, below; J-A76.45) — each × the layer's persistence rate (0.005) and drawn from `epoch.transform` keyed by the water body's
  or face's lineage and the epoch (§6.1; no new concern, J-A25.42): `siltReach` — a reach whose accumulation has fallen, or a
  basin whose harbour use has closed (the use step), 0.02 per year; `reclaim` — a marsh or foreshore face beside built
  land whose band's plot demand is short (S5d's shortfall record) and whose district's band is `modest` or above, 0.03
  per year — reclamation is bought by prosperity and pressed by demand; `shiftCourse` — a reach whose sinuosity exceeds
  `river.cutoffSinuosity` (1.8), or whose flood cells beside it exceed the row's share, 0.01 per year; `digCanal` only by
  demand (a `canal` row of the roster's institutions, a dossier element or a user's edit). Each fires at most once per body
  per epoch; AM-23's tendency wording holds — rates, not laws. Emulation note: neither reference has time, and both
  already let a user reshape water — MFCG's warp and FTG's water drawing — which the base keeps as §7.1's edits; nothing
  here runs without an epoch.

**Hidden plots over epochs (item 30 (e); the base carries the kinds).** A passage can be **sealed** — `sealPassage` sets
`Passage.sealed` (§2.5), so the access edges on its face read as sealed; every plot whose only reach passes it takes exposure `sealed` (§4.6), and
its buildings enter the decline ladder as vacant (`vacate`, cause `convert:sealPassage`) — and later **reopened**
(`openPassage`: the exposure returns to `hidden` and the buildings reoccupy by the regrowth-first order); both are hand
edits in the base and the engine's kinds later. Hidden plots **arise** by densification — the ladder's `densify …
back_court` (rung 2) cuts a plot's yard into rear plots reached by a new passage where §4.6's reach weights allow one,
through S10's incremental re-cut with the neighbours fixed (§4.7 S10 (7)) — and **vanish** by `thin … back_court` (the
rear plots cleared after their uses relocate, their households are re-homed and their buildings vacated, the passage
sealed and, on a rising band's re-cut, removed with the rear
row, `amalgamate` returning the land to the front plot's garden: item 31). The sealing kinds are the last kinds of this section the union admits
(`… | TerrainWaterOp | HiddenOp`):

```ts
type HiddenOp = { op: 'sealPassage' | 'openPassage'; passage: Id /* the L3 passage face (§2.5) */ };
```

**Works — every physical change on the ground as a timed project on the weekly clock (item 67; owner: "when a building
gets torn down, ruined, being built, being expanded, Lots need to merge or separate … we should show stages of it being
built. What do you think those stages should be?").**
1. **Decided at once, shown over weeks (J-A67.41).** Every physical change — a build, an extension, a demolition, a
   repair, a conversion, a decay step, a clearance — is decided and recorded by the event that makes it, as it is today
   (the designation mutator's record, a conversion, a ladder or decline op; §4.7 S11 step 6, J-A67.49), so the log alone still
   determines the model. When that event carries a week — an epoch, a dated dossier change (§7.7 item 1), a hand edit
   scheduled by `startWorks` (§7.1) — and the preset's `works.enabled` holds, the event also creates a **`Works`** record
   (§2.7): its kind, its target (a building, whose added or subtracted wings and storeys are the parts of the `MutationRecord` its `cause.mutation` names; or the plots of a join or a split — §2.7's `Works.target`), its start week, its duration in working weeks, the `WorksTable` row read, the event and mutation it shows, and
   what the ground held before that the model no longer holds (the removed parts' rings with their heights and roof kinds;
   the removed plot lines with their treatments). The drawn state at any week is DERIVED — computed from the record, never stored per
   week (2). An event with no week, a hand edit not scheduled, generation (the creation week shows a finished town;
   J-A67.47) and the parity presets create no Works, and the change is drawn finished. So a user's `build`, `demolish` or
   `convert` stays instant unless scheduled; an engine's `demolish` makes its tombstone at once while its Works draws the
   demolition from the kept shell; aborting a change is its undo (§7.4), which removes its Works; `cancelWorks` (§7.1) ends a
   running Works at once — the change it shows stands, drawn finished — and a `setAttr` on a Works moves its start or its
   duration.
2. **The stage at a week.** `stageAt(works, w)`: `e` = the working weeks in [start, w) — the weeks the calendar row does
   not pause for the Works' material in the town's climate (`WorksTable.pauses`: masonry, stone and brick, pauses in winter
   in temperate and cold climates; our own rows) — and `f = min(1, e ÷ duration)`; the stage is the kind's latest
   scheduled stage whose start fraction is ≤ `f`, `before` for w before the start and `finished` at `f` = 1. Weeks are integers,
   so a stage shorter than a week is never drawn (a tick shows the stage it lands in); a tent's zero-week duration applies
   finished in its week. At most one Works runs on a target: a new change on it ends the running one at the stage reached,
   which the new one takes as its `before` (a repair begun on a decaying house runs back from DECAYING).
3. **Durations (item 67 (b); J-A67.43).** `WorksTable` rows keyed by kind × class (or the designation template's `works`
   key, §10.2) × size (storeys, footprint) × material give a range of working weeks; the duration is drawn once, uniform in
   the range, × the labour factor of the plot's band (richer, faster; a row), on the `works` concern (its key is §6.1's;
   J-A67.61; J-A67.42). Defaults (our own, calibratable, §13.9): a hovel or shed 1–2 weeks; a small timber
   house 2–6 (the owner's "two weeks or a month"); a town house 8–17; a stone house 17–52; a manor 52–156; a church 520 or
   more; a cathedral built part by part — choir, transept, nave, towers, each its own Works in its programme's order, the
   choir in use under a temporary roof while the nave rises; a demolition a quarter of its build's range; a clearance 1–4;
   a `decay` Works the decline table's dwell band for its step (below), × 0.6 for timber and thatch. Material enters as a
   duration row only — time, never shape (the owner's materials rule, §2.6; J-A31.42 stands for replaceability).
4. **The stages — the answer to the owner's question (item 67 (c)–(f)).** Start fractions are per class row; what each
   stage draws is §8.2's `states` rows:

   | kind | stages (default start fractions) |
   |---|---|
   | build — and each wing or storey an extension or an adaptation adds | STAKED 0 (a dashed footprint, a material pile) · GROUND BROKEN 0.05 (bare earth, a spoil heap, a cellar pit) · FOUNDATIONS 0.15 (low walls or a sill frame) · WALLS RISING 0.25 (the walls up storey by storey, no roof, the interior open, a scaffold ring) · ROOF FRAMED 0.75 (rafters, no covering) · ROOFED 0.85 (covered, the scaffold still up, a work yard) · FINISHED 1 (the scaffold gone, the yard laid out) |
   | extension | the kept building in use throughout; the added wing through the build stages; at ROOF FRAMED the old roof opened where the two join; at FINISHED the joint wall opened and the wings united (item 18's add step, shown over time) |
   | demolition | EMPTIED 0 (doors and windows out) · STRIPPED 0.2 (the covering salvaged, rafters bare) · ROOFLESS SHELL 0.4 (rubble inside) · RUBBLE 0.7 (wall stubs, heaps, salvage piles) · CLEARED 1 |
   | decay — §2.8's ruin ladder on the way down (5) | toward `decayed`: ABANDONED 0 (shut up, the yard overgrowing, the roof whole) · DECAYING 0.5 (a holed roof, a sagging ridge); then `decayed` is ROOFLESS (weeds and saplings inside), `ruined` COLLAPSED (walls fallen in places, the stone gone to the salvage ledger), `cleared` or `reused` OVERGROWN (a grassy mound and a foundation line, until cleared or built over) |
   | repair | the decay stages backwards under a scaffold, to the building's former state |
   | fire | an instant destructive event (rung 3's trigger): the building `decayed` in its week and drawn CHARRED — a blackened roofless shell — until a clearance or a repair starts |
   | conversion with no geometry step | REFIT 0 (a scaffold on the frontage) · FINISHED 1 |

   The ruin stages are the existing ladder's drawn stages (J-A8.46 stands; no new `Existence` value): the target keeps its
   ladder state from the event on and carries its running Works by a link (`Building.works`, §2.6).
5. **The decay Works carries the dwell band (J-A67.46).** A `vacate` (the building `abandoned`) starts a `decay` Works toward
   `decayed` whose duration is its dwell band drawn once (the decline table, above); the lottery's `decay` candidates are
   the buildings whose `decay` Works has run its span, and the strike's `decay` event (the building `decayed`) starts the
   next toward `ruined` the same way; a `reoccupy` ends it and starts a `repair`. A building left `abandoned` or `decayed`
   by an undated event (a hand edit) gets its decay Works from the next epoch, starting at that epoch's week.
6. **Mutation steps (J-A67.49).** A Works shows its event's `MutationRecord` (§4.7 S11) in the record's order — subtracted
   parts by the demolition stages first, then adapted parts (an added storey's walls rising, an extended wing's build
   stages), then added parts by the build stages — each part's span a share of the duration by its footprint area; kept
   parts stand as they are. A `rebuild` is a demolition then a build, one Works; the epoch-spread mutation's events (above)
   each start their own.
7. **Plots in transition (item 67 (g); J-A67.44).** A join or a split is decided when its event lands — the plot rings
   change then (ownership) — and the ground follows the work: each removed boundary line is drawn from the Works' kept
   lines, dashed as pending removal, until the joined plot's build reaches GROUND BROKEN (or a demolition reaches
   RUBBLE), and a new dividing line is drawn as stakes, dashed, from STAKED and as its fence or wall from WALLS RISING.
   Item 31's `subdivide` and `amalgamate` run through the same stages. Access is the event's, so a Works never leaves a
   plot without access.
8. **What reads the stage.** Heights at a stage are derived, `heightsAt(works, w)`: WALLS RISING raises the eave storey by
   storey (the eave × the storeys reached ÷ the floors), no roof before ROOF FRAMED (drawn as a `framed` roof), the finished
   roof from ROOFED, a demolition lowering them in reverse; the stored heights stay the finished building's, so the shadows
   of §8.4 and §11.1's 3-D export follow the stage. The households an event placed are housed at a week only from
   FINISHED, and a demolition's have left before EMPTIED (item 17's relocation, J-A17.41): the module's occupancy, the lit
   windows (§10.3) and the light sources (§4.7, §8.4) read that. The plan rung of a building in progress draws walls
   without doors or furniture, and of a ruin its fallen walls and open rooms (§2.6); the stage counts among the plan rung's
   recorded inputs, so a stage change marks a derived plan stale and §8.5's change marker shows it (item 67 (j)).
   Descriptions say "being built", "being demolished", "ruined since …" (§10.4); the city band draws the stage glyph on the
   footprint, the neighbourhood band the walls, scaffolds, frames and rubble (§8.5, §8.2).
9. **Which week is drawn (J-A67.45).** Every drawing, export and reader draws the document's current week (*The clock*,
   above) unless the per-viewer view key `week` (§2.9) names another — a host setting its campaign week, or a user
   scrubbing — outside every digest. Scrubbing draws every live Works, and every Works finished within `works.retainWeeks`
   (52), at that week over the current model, forward and back, byte for byte; the full history at an earlier week is the
   log's replay (§7.4). An epoch retires the Works that finished more than `works.retainWeeks` before its week: the record
   leaves the model and its target's lifecycle event keeps the weeks.
10. **Restraint (item 67 (i); J-A67.48).** An epoch's Works start at weeks spread uniformly over its span (the weeks since
   the previous epoch; the offset is the `works` concern's draw before the duration's, §6.1), so the share of stock under works at the epoch's week
   follows the growth or decline rate by construction — a steady town shows a few scaffolds, a boom town many, a declining
   one ruins. A `ConditionOverlay` (§2.7; staged, empty in the base; item 88) scales the share of an epoch's changes it
   starts as Works once the port fills it (a siege stops building). With no epoch and no scheduled edit nothing here runs,
   and the static baseline is byte-identical (item 23: neither reference has time).

```ts
type WorksStage = 'before'|'staked'|'groundBroken'|'foundations'|'wallsRising'|'roofFramed'|'roofed'|'finished'
  | 'emptied'|'stripped'|'rooflessShell'|'rubble'|'cleared' | 'abandoned'|'decaying'|'roofless'|'collapsed'|'overgrown' | 'charred'|'refit';
interface WorksRow { key: string /* a class id, or a designation template's `works` key (§10.2) */; kind: 'build'|'extend'|'demolish'|'repair'|'convert'|'decay'|'clear';
  storeys?: [number, number]; footprintM2?: [number, number]; material?: string /* a duration row only (item 67 (b)); never a shape input */;
  weeks?: [number, number] /* working weeks, drawn once; absent on a decay row, whose span is the decline table's dwell band × 52 */; factor?: number /* a decay row's material factor: timber and thatch 0.6 */;
  stages: { stage: WorksStage; from: number /* a fraction of the duration */ }[] }
interface WorksTable { rows: WorksRow[]; labour: { band: string; factor: number }[] /* the duration × the factor of the plot's band */;
  pauses: { material: string; climate: string; seasons: ('spring'|'summer'|'autumn'|'winter')[] }[]; retainWeeks: number /* 52 */; enabled: boolean /* false in the parity presets */ }
```

`WorksTable` lives in `@plat/tables` (`works.json`, §14), editable with provenance (§7.6); its decay rows read the decline
table's dwell bands, never a second number.

**Markets over epochs (item 24).** A secondary market the roster's suffix adds is claimed by the epoch's S7b in the new
stage or in a due district by §4.5 S7b (3)'s rule; a market whose institution closes (the use step) keeps its square — a
plaza or a `market_green` — until a `clear` or a claim reuses it, so no market moves by wealth change alone.

**Informal clusters over epochs (item 70 (e); J-A70.48).** On the weekly clock a cluster grows by accretion: delta
households of its band placed on an informal plot add structures by §4.7's packing on the plot's free path sites, each a
`build` Works of days (a shack) or less than a week (a tent, finished in its week); rung 1's `densify … infill` on an
informal plot adds structures in that way too. A destructive circumstance event (rung 3's trigger) burns a cluster fast — its
structures `decayed` and drawn CHARRED in one week, then cleared. When its district's band rises past the hysteresis a
cluster is cleared or **formalised** by rung 3 in the due epoch (the replaceability of tents and shacks is `immediate`,
§10.2): its households re-homed by item 17's relocation or re-let, the plot cleared, re-cut by S10 (7) into row-house
plots and built by S11 at the new band. In decline, a vacant, cleared or ruined plot of a district whose value fell past
the hysteresis at the epoch takes tenure `informal` (§4.7) and may take a cluster. Each step is an event of this section's
kinds; the engine that schedules them is the staged one.

**Lights, deposits and conditions over epochs (items 68 and 88).** A light follows its host (§4.7's *Light sources*), and
an epoch re-runs the light rows on its new and changed faces only. A `DepositSite` (§2.7; staged, empty in the base) whose
state changes converts the land use it anchors: `depleted` or `removed` — its quarry, mine or claypit `abandoned` and
drawn worked out (a deposit depleted at creation drawn so from the start); `discovered` — a new outside site sited by
S12a's rows at that epoch. A `ConditionOverlay` is read as *Works* (10) states.

=== REPLACE ### 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values) ===
### 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values)

```ts
interface RosterTables { classes: BuildingClassRow[]; districtKinds: DistrictKindRow[] /* the relation templates of the neighbourhood kinds (item 16 (a)) */;
  resources: ResourceRow[] /* {id, kind: 'site'|'made'|'import'} — the resource ids the supply edges name (grain, malt, hides, import …), our own rows */;
  institutions: InstitutionRow[]; government: GovernmentRow[] /* offices and seat classes per government kind */; religions: ReligionRow[];
  households: HouseholdRow[] /* size distributions by class */; professions: ProfessionRow[]; farm: FarmTable /* §4.9 */;
  roomProgram: RoomProgramRow[] /* item 28: the room programmes, below */; basementGate: BasementGateRow /* item 29 (b): the basement's terrain-gate values, one row, below */;
  covers: CoverRow[] /* item 63: the fronts a concealed class may take, below */;
  classMix: ClassMixRow[] /* item 71: the class mix inside a band, with its prestige rows */; clusters: ClusterRow[]; tenure: TenureRow[] /* item 70: the informal cluster's rows and the tenure defaults by band */;
  quarterIdentities: QuarterIdentityRow[]; powerLinks: PowerLinkRow[]; sectorLinks: SectorLinkRow[]; bandRanges: BandRangeRow[] /* item 72: a neighbourhood's identities, dials and band range */;
  sectors: SectorRow[] /* item 78: the sector set the economy slice is keyed by (§7.7 item 2) */; portRows: PortRows /* item 88: the staged rows the dossier port will fill — schema-complete, empty, extension */;
  names: NamePack; provenance: Provenance }   // the row types of items 70–72, 78, 79, 82 and 88 are declared, with their default rows, in the paragraphs that close this subsection
interface BuildingClassRow { id: string; use: string; perCapita: [number, number]; perOther?: { class: string; ratio: number }; min: number; max: number; firstAtPopulation: number;
  requires: ('water'|'coast'|'route'|'farmland'|'ore'|'stone'|'timber'|'fish'|'clay')[] /* the site-resource gates S2 reads from SiteResources (§4.2) */;
  outside: boolean; liveIn: boolean; cluster?: string; noxious: boolean; lifestyleBand: string; shopProb: number; priority: number;
  relations: RelationRule[] /* the class's relation template (item 16 (a)) */; produces: string[] /* resource ids */; supply: SupplyEdge[] /* its supply chain (item 16 (b)) */;
  template: DesignationTemplateRow[] /* one row per band: the designation template S11 reads (item 19; §4.7) */; useRules: UseRuleRow /* catchment, inertia and closing rows (item 17; §4.11) */;
  secondaryChance?: number /* market rows: the TOWN chance of a secondary market (§4.2 S2) */; salvageM3: Record<string, number> /* item 8: the material yield and debit §4.11's ledger reads (below) */;
  drain: 'none'|'pit'|'channel'; underground: 'never'|'allowed'|'preferred'; undercity: 'never'|'allowed'|'preferred' /* item 65 */;
  undergroundAccess: { prob: Record<string, number> /* item 64: per band row, interpolated along the value — the chance that a basement within reach of an underground element holds an access (II.7.3) */ } /* II.7's columns (below) */;
  concealment?: ConcealmentRow[] /* item 63: the default-mode weights of a class our tables mark clandestine; absent: never concealed unless the dossier or an assignment says so (below) */;
  distribution: 'district-defining'|'dispersed'|'singular'; significance: number; powers: { kind: string; weight: number }[]; sectors: { sector: string; weight: number }[] /* items 72, 78 and 79: how the class spreads over the town, its weight in a neighbourhood's reading, its association with the power kinds and the sectors (weights summing to 1 per column) — read by §4.5's neighbourhood character (below) */;
  subLocations: SubLocationRow[]; openingHours: OpeningRow[]; tags: string[] }
interface RelationRule {   // one row of a class's or a neighbourhood kind's relation template; read by the placement solver (§4.7 S10a, S10b) and, for district kinds, by §4.5's typing scorer
  kind: 'adjacent'|'near'|'far'|'sameStreet'|'clustered'|'avoid'                                  // to another class, cluster tag or feature class
      | 'upwind'|'downwind'|'upstream'|'downstream'|'nearWater'|'highGround'|'lowGround'|'dry'   // environmental: ContextVector.upwind, upstream, terrainClass, dist.water (§2.5)
      | 'frontage'|'nearGate'|'nearMarket'|'nearHarbour'|'nearCentre'|'extramural'|'intramural'  // access: roadClass, dist.* (the nearest of N markets, item 24)
      | 'plotArea'|'plotShape'|'frontageM'                                                        // capacity: areaM2, shape, frontageM, against the template's size budget
      | 'band'|'exposure';                                                                        // the prosperity band; Plot.exposure and knownTo (item 30)
  to?: string; withinM?: number; beyondM?: number; min?: number; max?: number; values?: string[]; falloff?: 'step'|'linear'|'smoothstep';
  strength: 'hard'|'soft'; weight: number /* soft rows: the score at full satisfaction; hard rows: 0 */; extension: boolean /* true: a row the references lack, scaled by placement.extensionWeight (§4.7 S10b) */ }
interface SupplyEdge { resource: string; maxDistanceM: number; mode: 'street'|'river'|'sea'|'road'; strength: 'hard'|'soft'; weight: number;
  perConsumers: number /* S2's need propagation: one provider per this many consumers (§4.2 S2) */; substitutes?: string[] }
interface DesignationTemplateRow {   // one per band of §4.5's band set; continuous columns interpolate along the prosperity value, discrete ones switch at the cut (§4.7 S11)
  band: string; specialisation?: string /* discrete: the designation's variant in this band; drives the use's specialisation, its description and its room programme (item 28) */;
  plotAreaM2: [number, number] /* the size budget a join is asked for (§4.7 S10 (7)) */; footprintM2: [number, number, number] /* p10, p50, p90 */; floors: [number, number]; heights: string /* the class heights row */;
  structures: { role: string; count: [number, number]; footprintShare: number; required: boolean; houses: boolean /* item 28 (f): a residential slot — its building houses households by §4.7's generation fill; a live-in class's (BuildingClassRow.liveIn) main slot is one whatever this cell holds (its flag read as true), unless §4.7's fill finds it no household (BuildingSlot.unhoused, §2.5) — its building houses the live-in household, Building.dwelling (§4.7 S10b) — so the two columns never disagree */ }[] /* the slot list: main building, workshop, forge, yard, court, stables, store, dwelling, journeymen's rooms … data-defined roles */;
  arrangement: 'row'|'compound'|'detached'|'hovel'|'tents'|'cluster' /* item 70: an informal cluster's many structures on one plot (§4.7 S11) */|'institution'; coverage: number; densityShift: number;
  jitter: { maxM: number; minM: number } /* m — item 43: the front-line recession's cap and floor (§4.7 S11's law); maxM interpolated along the value; minM's declared range ≥ attractCm + 1 cm; defaults maxM 0.4 / 0.7 / 1.0 / 1.5 m by band and minM 0.3 m, each an option extension over MFCG (the MFCG preset's values are §7.6's); maxM 0 in the institution, tents and cluster rows, unmarked */; separation: 'party_wall'|'slot'|'passage';
  frontage: 'none'|'lean_to'|'stall'|'shopfront'|'arcade'|'gate'|'wall' /* discrete: the main slot's frontage treatment; the entrance set is §2.6's */;
  yard: { part: string; share: number }[] /* court, garden, formal_garden, forecourt, orchard, midden, pen … (§2.5 YardPart) */; bounds: 'none'|'fence'|'hedge'|'wall'|'railing' /* the compound rows' 'wall' (prosperous, rich) is an extension (option) the parity presets set to 'fence' (item 44; §4.7 S11) */;
  programme: string /* item 28: the key of a RoomProgramRow (below), which the plan rung of §2.6 reads */; underSize: 'compact'|'refuse' /* what the mutator does when the plot cannot be joined to the size budget (§4.7 S11) */;
  replaceability: 'immediate'|'short'|'long'|'ruin_only' /* item 31: read at the plot's builtBand row — how soon §4.11's wealth ladder may replace the stock */;
  works?: string /* item 67: the key of the WorksTable row (§4.11) whose stages and durations this designation's builds, demolitions, repairs and decays read; absent: the class's default row */;
  households: { built: number; max: number } /* item 31: the households the design is built for, and the most it holds when let out (rung 1's relet) */;
  entrances: { side: number; rear: number; service: number; capSide: number; capRear: number; yardDoorMinM2: number } /* item 29: the probability of a side, rear or service door given an access edge beyond the frontage, their caps, and the yard or court area that recommends a yard door — §2.6's entrance rules read them */;
  cellar: { prob: number; kinds: { full: number; half: number; walkout: number }; slopeCm: Cm; rockCost: number; depthCm: Cm /* default 220: a full cellar's floor below the ground storey's baseCm */; insetCm: Cm /* default 60: the basement ring's inset inside the ground-storey wings */ } /* item 29 (b): the base probability §2.6's basement decision starts from, the kind weights, the fall under the footprint past which the decision turns to a half or walk-out cellar, the rock cost that lowers the probability, and the cellar's depth and inset; the terrain gate is §2.6's, its values the basementGate row below */; }
interface UseRuleRow { serviceRadiusM: number; closeShare: number; closeAfterEpochs: number; starveAfterEpochs: number; inertia: number; moveChance: number }   // §4.11's use step (item 17)
interface DistrictKindRow { kind: string; relations: RelationRule[] /* read by §4.5's typing scorer and S7b's affinity rows, and by the solver for a whole-neighbourhood assignment (§7.7) */ }
interface ConcealmentRow {   // item 63: one row of a clandestine class's default-mode weights (§4.7's Concealed institutions); our own rows, extension
  band?: string /* absent: every band; rows interpolate along the value like every band row (§4.5) */; districtKind?: string /* absent: every kind */;
  weights: { none: number; front: number; hidden: number; underground: number } /* the mode draw's weights; the non-none weights are extension, scaled by placement.extensionWeight (0 in the parity presets) */;
  hiddenWithFront: number /* the share of hidden and undercity placements that also take a front, drawn on siting */;
  accessMultiplier: number /* item 64: × the access probability of a surface building that carries this concealed use (II.7.3's Basement accesses); default 6 */ }
interface CoverRow {   // item 63: the plausible fronts of one concealed class; our own rows, extension
  trueCls: string /* the concealed class (BuildingClassRow.id) */; band?: string /* absent: every band */;
  covers: { cls: string /* a front class whose designation template has a row at the band */; weight: number }[] /* weighted, several per class: a front "can be anything" plausible */ }
```

**The sequential roster (FTG-14; J-P20).** FTG's documented *shape* (`ftg-docs-params.md` §3.3), none of its 209 types, 80
nodes, 299 professions or 323 items. A **virtual population** advances on a fixed grid of Δ = 10 people up to the rung's
maximum. At each grid point the target count of every class is a monotone step function of the virtual population —
`perCapita` or `perOther` ratios converted to per-person ratios, core versus shop pools, lifestyle-banded pools with rare
outliers (weights ours), hard `min` / `max`, **size gates** (`firstAtPopulation`), **resource gates** read from
`SiteResources` (no farmland → no farms, shops instead) — and every class below its target receives its next building, in
class-priority then class-id order. Every draw is keyed by the building's ordinal (`roster/<class>/<ordinal>`: shop or
core, lifestyle outlier), so the n-th chandler is the same chandler at any population. The run records each building's
**appearance population**; the manifest for population P is every (class, ordinal) that appeared at or below P. Hence
manifest(P₂) ⊇ manifest(P₁) whenever P₂ > P₁ (property test on 1 000 seeds, §13.2), an epoch's delta demand is exactly the
suffix, a population fall selects the suffix in reverse order, negative deltas arise only from declared circumstance
events, and §7.8's population control is monotone by construction. **Mode (COV-FTG-B06):** `rosterMode:
'minimiseUnemployment'` (default: at each grid point, when the unemployed share of the virtual population exceeds a table
threshold, the workplace class with the largest weighted job deficit receives one extra building) or `'matchRatios'` (the
configured ratios only, FTG's alternative); both are grid-sequential, so both are prefix-stable.

**Output:** demand per class with area / frontage requirement classes, district affinities, cluster tags, live-in flags,
outside flags and wealth bands; the **town-level character** shifts the ratios — read from the economy slice's sector
shares (`circumstances.economy`, §7.7 item 2) through each class's `sectors` weights, so one input drives both the roster
and the neighbourhoods' economy dial (items 72 and 78; an even mix, the neutral default, shifts nothing). **Government (COV-FTG-B13):** the blueprint's `government` circumstance selects a `GovernmentRow` whose
offices force seats — a crown seat a royal castle or palace, a seigneurial lordship a lord's castle or keep, an
ecclesiastical lordship a bishop's palace beside the cathedral, a chartered commune a town hall and guild halls, a merchant
oligarchy a merchants' hall — plus a military share (guard posts per 1 000 inhabitants; barracks at CITY and above near the
castle or the gates); the castle toggle `auto` reads it. **Religion (COV-FTG-B14):** religions come from `ReligionRow`s with
worshipper shares (shifted by the town-level character), a practice share and clergy per 1 000; temples per religion are
proportional to its practising worshippers; each religion has a faction (§2.7). S7b then allocates the demand and S10b
places it (§4.5, §4.7); where capacity is short, placement's reconcile and F-SITING's ladder decide, and surplus capacity is
typed as yards, greens or vacant plots (§4.7 S10b); population is honoured within tolerance and reported (O7 a, e).

**Relation templates, supply edges, designation templates and use rules (items 16, 17 and 19; rows are data, §7.6,
re-signed by the corpus phase, §13.9).** A class's `relations` are the rows the placement solver filters and scores by
(§4.7 S10a, S10b); its `produces` and `supply` are the resource and dependency graph S2's need propagation walks (§4.2 S2)
and the solver measures distance on; a neighbourhood kind's rows serve §4.5's typing scorer and a whole-neighbourhood
assignment (§7.7). Default rows are the references' placement rules where a reference has one and soft tendencies where it
has none (item 23; `extension: true`, scaled by §4.7 S10b's `placement.extensionWeight`) — for instance a tannery
`downstream` hard, `nearWater` hard and `extramural` soft, with supply `hides` 800 m by street and `bark` 2 000 m by road;
a brewery with supply `malt` 1 000 m by street (hard) and `nearWater` soft; a maltings with supply `grain` 3 000 m by
road; a bakery with supply `flour` 600 m by street; a warehouse `nearHarbour` 150 m hard with supply `import` by sea; an
inn `frontage` primary or through hard and `nearGate` 150 m soft; a market hall `nearMarket` 60 m hard; a trade group's
shops `sameStreet` and `clustered` soft; a mill `nearWater` hard with a fall (its outside row, §4.9). The `template` rows
are S11's (§4.7); the `useRules` are §4.11's use step's; the `produces` of the outside classes — grain, timber, fuel,
stone, ore, fish — are the hinterland's food, fuel and timber rows (§4.9, item 26). No row of this table names a
material: a material is a rendering attribute (§2.6), and §4.11's `WorksTable` alone reads it, for durations — time,
never shape (item 67).

**Markets, wealth bands and the countryside's rows (items 24, 26 and 27).** The `market` class row demands the markets by
size — `min` 1 (the principal), `firstAtPopulation` 10 000 and `perCapita` one per 12 000 inhabitants for the secondaries,
`secondaryChance` 0.15 at TOWN (our own rows; §4.2 S2; §13.5's anchors are MFCG's secondary plazas and FTG's two market
squares) — and the market hall's and the market trades' rows cite the market they serve by rank (`nearMarket`, the
principal by default). `HouseholdRow.band` and every class row's `lifestyleBand` name a band of §4.5's band set; the
household shares' default weights are FTG's captured lifestyle distribution (§4.5's table; provenance `ref:FTG lifestyle
distribution`), shifted by the town-level character, and every band-keyed row set of this table may omit bands, which
interpolate (§4.5, item 27). The farm table's fuel and timber rows, the farm modes and the outside classes' seeding rows
are §4.9's.

**Under a fall (AM-8).** A population fall selects the suffix in reverse ordinal order, as above, and its households leave
by §4.11's step (c) — a `relet` down, `vacate` at a building's last household — and it never removes a building by
arithmetic: the standing stock follows with §4.11's dwell lag, and a later rise reoccupies the same suffix
first. `BuildingClassRow.salvageM3` is the class's material yield when robbed, cleared or dismantled, and the debit of a
build or repair of that class — read by §4.11's ledger.

**Replaceability, households, entrances, cellars and the room programme (items 28, 29 and 31; J-A28.43, J-A29.41).**
`DesignationTemplateRow` — one per band of each `BuildingClassRow` — carries them in its `replaceability`, `households`,
`entrances` and `cellar` columns (above); `RosterTables.roomProgram` holds the room programmes and
`RosterTables.basementGate` the basement's terrain-gate values:

```ts
interface RoomProgramRow { for: { cls: BuildingClass; band: string; use?: string; era?: string } /* the designation and its band (item 19's rows) */; rooms: RoomRuleRow[] /* the programme */;
  pattern: Record<'basement'|'ground'|'upper'|'top', { weight: number; pattern: LayoutPattern }[]> /* §2.6's layout patterns, weighted per storey class */; circulation: { num: number; den: number } /* integers: the share num/den of a storey given to halls and corridors — §2.6's capacity reads it exactly */;
  stair: { placement: 'by_entrance'|'rear'|'centre'|'tower'; kind: StairCore['kind'] } /* the stair core §2.6 places before any cut */; basementAccess: 'core'|'trapdoor' /* the access §2.6's basement decision derives into Basement.access for a cellar that is no walk-out, read at the plot's builtBand — never external, which only a walk-out's fall derives; the plan rung reads Basement.access */; furnish: { density: number; wallBias: number } /* item 28's abstract furniture by role */ }
interface RoomRuleRow { role: RoomRole /* §2.6: data-defined */; scope: 'unit'|'shared'|'service'|'circulation' /* item 28 (f): a room of one household's dwelling unit, one the households share (a kitchen, a common room), the use's or the staff's rooms (a forge, a shop, a store, a staff chamber), or a corridor or stair hall — §2.6's interior ladder says which scopes a band's row allows */; count: { n: number; law: 'const'|'perHousehold'|'perStorey'|'perCapacity'|'perSubLocation' /* per household: item 31's relet; per capacity: a sub-location's */; capacity?: string; tag?: string };
  area: [number, number, number] /* m²: min, target, max */; storey: 'any'|'ground'|'upper'|'top'|'basement' /* the storey rule */; exterior: 'none'|'some'|'max' /* windows */; door: 'door'|'arch'|'open' /* the opening kind */; maxDoors?: number;
  adjacency: { kind: 'hard'|'soft'; to: 'core'|'entrance:main'|'entrance:yard'|RoomRole; via?: 'direct'|'corridor'|'under' }[]; priority: 'hard'|'soft'; hearth?: boolean;
  concealed?: boolean /* item 63: a room of a concealed use's programme — placed by §2.6's plan rung away from the main entrance and off the public circulation hub, reached only through a service, yard or concealed door (§4.7's Concealed institutions) */;
  furnish: { density: number; wallBias: number; glyphs: string[] } }
interface BasementGateRow {   // item 29 (b): the values §2.6's basement gate reads; one row per table version
  waterTableM: M /* default 40: within this distance of a shore the water table is the nearest water body's surface plus the freeboard */;
  freeboardCm: Cm /* default 50 */; drainageAccumCells: number /* default 100: the flowAccum at which a hydro cell is the drainage line elsewhere (§2.3; our own, calibratable) */ }
```

The **room programme** lists the rooms a building of that class, use and band must and may have — each with its
size band in m², its storey, its openings, its adjacencies and how many — a fixed number, a number per storey, one for each household of
item 31's `relet`, or a sub-location's capacity — which §2.6's plan rung writes first and then cuts the walls
to fit (item 28), so rooms are never cut before the programme is known. The programme rows follow §2.6's **interior
ladder** (item 28 (f)): the ladder's row for the occupants' band gives the cross-class structure — how many households
the shell holds, each unit's rooms, the shared rooms, the staff rooms and their size beside the owners' rooms, the
circulation form and how large the rooms may be — and a class's programme row adds what a smithy, an inn or a chapel needs; the
`programme` row is read at the occupants' band (the field band, J-A19.43) and the `households` column at the plot's
`builtBand` (the shell's capacity, §2.6), so the interior has no floor while the shell keeps its own (§4.11).
`LayoutPattern`, `StairCore` and `RoomRole` are §2.6's, the role names our own data rows (hall, chamber, solar, parlour,
kitchen, buttery, common room, cooking place, staff chamber, corridor, stair hall, forge, shop, store, undercroft,
chapel, nave, passage …). The plan rung's `plan.program` stream draws the fractional part of a count law (§6.1), as
`plot.join` draws a join (§7.7). Households per building follow the roster's households — where a dossier exists, the households that
fill its population, map facts derived from its population and circumstances (§7.7's derivation table; item 20 (h)) —
and item 17's relocation (§10.3); the `households` row and the shell's floor area bound the ladder's
`relet` through §2.6's one capacity function, which the generation fill (§4.7: S10b's placement, S11's clamped write),
`relet` and F-PLAN (§5.2) all read; with no epoch every residential building houses what §4.7's generation fill gives it — at
least one household and never above its capacity — so the static baseline is unchanged (item 23).
Every column is data with provenance, editable and calibratable (§7.6, §13.9). The entrance rows default to one street
entrance per building — the owner's rule (item 29; provenance `owner`): the FTG client of the 2026-09-25 capture sends no
door, its road-facing anchor being a night light (item 50), and MFCG 12710731's model, read in full, carries no door
record (an inference) — with side, rear and service doors as our tendencies (`extension`, 0 in the parity presets,
item 23); the cellar rows are item 29 (b)'s class rows, whose extensions §2.6's emulation note names; the reference's
basement share is a descriptive baseline only (§13.5).

**The `drain`, `underground`, `undercity` and `undergroundAccess` columns (II.7; items 12, 14, 64 and 65).**
`BuildingClassRow.drain` is the class's drainage need: `none` (tents, sheds, hovels), `pit` (households and most
workplaces: a cess pit or the street gutter of their own), `channel` (the trades and institutions that discharge foul
water: tanners, dyers, fullers, brewers, slaughterhouses, baths, hospitals, monasteries); `underground` names which
classes a sewer-front underground neighbourhood may hold or prefers (II.7.3); `undercity` names which classes the
undercity may hold or prefers (II.7.5) — `preferred` for its microcosm: the black market, a fence's hall, a criminal
guild's seat, a tavern, a forbidden shrine, a fighting pit, a healer; `allowed` for the dwellings of the squalid and poor
bands and the small trades that serve them; `never` for the rest; and `undergroundAccess.prob` is, per band row
interpolated along the value, the chance that a surface building of the class whose basement reaches an underground
element holds an access down to it (II.7.3's *Basement accesses*) — higher for breweries, bathhouses, warehouses and inns
(0.15–0.30 by band), low for houses (0.02, raised with the plot's age by II.7.3's age term), 0 for a barracks, a
courthouse and a temple; a user adds an access to any building by item 66's edit (§7.3 item 9). Which plots a network
connects, what a class does when none exists, and how the underground rows are used are II.7.1's, II.7.3's and II.7.5's
rules; the columns are data like every other, our own rows, and every non-`never`, non-zero cell is an `extension`
(no reference has an underground).

**The `concealment` column and the cover table (item 63).** `BuildingClassRow.concealment` gives, for a class our tables
mark clandestine — a thieves' den, an assassins' house, a smugglers' store, a forbidden cult, a black market, a spy ring —
its default-mode weights per band and district kind (`ConcealmentRow`: `front`, `hidden` and `underground` weighted
against `none`; the default rows weight `front` highest in every band, `hidden` next in the poor and squalid bands,
`underground` where an underground allocation may exist), the share of hidden and undercity placements that also take a
front, and the multiplier on the building's access lottery; `RosterTables.covers` gives each concealed class its weighted
plausible fronts per band (`CoverRow`: an assassins' house behind a tavern, a fencing hall or an apothecary; a smugglers'
store behind a warehouse or a chandler's; a thieves' den behind a tavern, a pawnshop or a bathhouse; a forbidden cult
behind an almshouse, a bathhouse or a bookbinder's …), and `RoomRuleRow.concealed` marks the rooms of a concealed
programme. Every row is our own and an `extension`, so the parity presets conceal nothing; how they are read is §4.7's
*Concealed institutions*.

**The rows of items 70–72, 78, 79, 82 and 88 — their types and default rows.** The fields `RosterTables` and
`BuildingClassRow` name above are typed here; how each is read is the section named beside it. Every row is our own,
calibratable (§13.9) and an `extension` — zero, a step or empty in the parity presets (item 23) — unless it says otherwise.

```ts
interface ClassMixRow {   // item 71 (§4.7's Class mix inside a band): one row per band of the band set; a band without a row interpolates (§4.5)
  band: string; weights: { cls: string /* a residential class id */; weight: number; wealthShift: number /* × (wealthLevel − 0.5), §4.7 */ }[];
  prestige: { frontage: 'tier1'|'square'|'park'|'corner'|'water'; weight: number }[] /* §4.7's prestige order */ }
interface ClusterRow {   // item 70 (§4.7's Informal clusters): by band × climate × era
  band: string; climate?: string; era?: string; kinds: { cls: 'shack'|'tent'|'lean_to_shelter'; weight: number; footprintM2: [number, number]; depthM: number }[];
  householdsPerStructure: { rung: string; range: [number, number] /* households.built of a structure, drawn in the range on siteplan */ }[];
  pathWidthM: number; fireGapM: { rung: string; m: number }[] /* the clear gap between two structures, by rung, as householdsPerStructure (§4.7's packing) */; wholeBlock: number /* the share of eligible blocks S10 (7) joins into one informal plot */; relations: RelationRule[] }
interface TenureRow { band: string; informal: boolean /* this band's plots with no standing building but shacks, tents or lean-tos are informal (§4.7) */ }
interface QuarterIdentityRow {   // item 72 (d′) (§4.5 (4)): an emergent or dossier-declared identity
  id: string; families: { family: string /* a class tag */; weight: number }[]; threshold: number; perHa?: boolean /* the threshold per hectare of the district */;
  bands?: [string, string] /* the district's band within */; priority: number; singular: boolean;
  power?: string /* the power kind its quarter dial follows */; sector?: string; kind?: string /* the S6 kind an epoch re-types a district to past the hysteresis */;
  definedBy?: string /* a district-defining class (BuildingClassRow.distribution): the identity a dossier instance of it claims */; targetShare?: number /* its share of that district's placed uses */;
  magicOnly?: boolean /* admitted only where the magic circumstance is not 'none' or the dossier lists an arcane power */; naming: string /* the naming slice its names draw from (§10.4) */ }
interface PowerLinkRow { element: 'gate'|'wall'|'tower'|'bridge'|'road'|'quay'|'market'|'tollHouse'|'customsHouse'; powers: { kind: string; weight: number }[] }   // item 72 (d″): the infrastructure's powers (the classes' are their `powers` column)
interface SectorLinkRow { element: PowerLinkRow['element']; sectors: { sector: string; weight: number }[] }   // item 72 (d4): the infrastructure's sectors (the classes' are their `sectors` column)
interface BandRangeRow { band: string; lower: [string, string] /* [floor, ceiling] for a district in the band's lower half */; upper: [string, string] /* in its upper half */ }   // item 72 (d‴) (§4.5 (5))
interface SectorRow { id: string; tags: string[] /* the class tags whose classes serve the sector by default */ }   // item 78: the sector set `CircumstanceSlice.economy` is keyed by (§7.7 item 2)
interface PortRows {   // item 88: the staged rows the dossier port fills (§14) — schema-complete and empty in the base
  impairments: { type: string; physical: boolean; conditionSteps: number /* a physical type's condition steps per severity band on the building (§7.7's F4 row); a non-physical type's steps per unit of severity on the impaired institution's own dial term, conditionSteps × severity × dial.conditionStep (§4.5 (6)) */ }[];
  hinterland: { importPct: number /* 0–1 */; foodChain: Record<string, boolean>; farmlandScale: number /* §4.9's arable demand × max(0, 1 − importPct × farmlandScale) */ } | null /* one row; null while empty */;
  crime: number | null /* in [0, 1]; the staged crime term of §4.6 — the factor of its hidden share, of II.7.3's access and of II.7.5's undercity demand */;
  customKinds: { kind: string; criticality?: number; economicWeight?: number; defenseRoles?: string[]; powerAuthorities?: string[]; fallbackClass: string /* the class a custom kind is built as */ }[];
  legitimacy: number | null /* on the government record: × the governing power's amplification in §4.5 (6)'s institution dial, 1 while empty */ }
```

* **Class mix (item 71).** Default weights over the residential classes — squalid: hovel 0.8, row house 0.2;
  poor: hovel 0.3, row house 0.6, cottage 0.1; modest: row house 0.6, cottage 0.2, house 0.2; comfortable: row house 0.3,
  house 0.6, town house 0.1; prosperous: house 0.5, town house 0.35, manor 0.15; rich: manor 1.0 — the manor share thus
  rises monotonically from the prosperous row to all manors in the rich row; `wealthShift` manor +1.0, town house +0.5,
  house 0, row house −0.3, hovel −0.6; prestige weights `tier1` 1.0, `square` 0.8, `park` 0.6, `water` 0.6,
  `corner` 0.4. The parity presets make each band row one class, its class rows' `lifestyleBand` pool (a step at each cut). The `shack`, `tent` and `lean_to_shelter` rows are the cluster's structure classes (§4.7's *Informal clusters*), never drawn by the class mix (J-A70.49).
* **Clusters and tenure (item 70).** Squalid: shacks 0.5, tents 0.4, lean-to shelters 0.1; poor: shacks 0.7, lean-to
  shelters 0.2, tents 0.1; footprints shack 6–20 m² (depth 3–4 m), tent 6–15 m² (round or oblong, depth 3 m), lean-to
  shelter 4–12 m² (depth 2 m); households per structure 1 at TOWN, up to 2 at CITY and up to 3 at METROPOLIS in the squalid
  row, while the poor row gives 1, 1 and up to 2;
  `pathWidthM` 1.2, `fireGapM` 1.0 (in the squalid row 0.8 at CITY and METROPOLIS), `wholeBlock` 0.2 in the squalid row, 0
  otherwise; relations `nearWater` and the lee of walls and ruins, soft. The `shack`, `tent` and `lean_to_shelter` class
  rows (distinct from the `lean_to` frontage treatment): `drain` `none`, `replaceability` `immediate`, cellar 0, one floor,
  a programme of the one-room unit with no circulation, `households` from the cluster row. Tenure: squalid and poor
  `informal: true`.
* **Distribution and significance (item 72).** `distribution`: `singular` for the cathedral, a great temple, the palace, the
  castle, the university and the principal market's hall; `district-defining` for the dossier kinds that are districts (a
  red-light district's brothels, the slums, a foreign quarter, a guild district); `dispersed` for every other class.
  `significance`: cathedral, great temple and palace 30; castle 20; university 15; church 8; guildhall, town hall and
  market hall 5; chapel 3; inn 1.5; workshop 1; shop 0.5; lodging house 0.3; house 0.2; cottage 0.1; shack and tent 0.05.
* **Quarter identities (item 72).** The religious quarter (families religion; chapels and churches 1, a cathedral or a
  great temple 3; threshold 3; power `religion`; kind `temple`); the craftsmen's quarter (craft 1; 0.6 per hectare; power
  `guild`; kind `craft`); the merchants' quarter (trade and warehouse 1; threshold 5; bands prosperous to rich; power
  `company`; sector trade); the harbour quarter (harbour 1; threshold 4; kind `docks`); the garrison quarter (military 2;
  threshold 4; power `military`); the learned quarter (learning 2, a university 5; threshold 5); the arcane quarter (arcane
  1, a mage tower 3; threshold 3; power `arcane`; `magicOnly` — the row a Mages' Quarter naming claim biases toward, item
  82); the defined districts (the red-light district `definedBy` its brothels, `targetShare` 0.15, with no `kind` — §4.5 (3) scores its district by the brothel class row's soft `nearHarbour` (within 300 m), `nearGate` (within 200 m) and `near` an inn (within 100 m) rows, our own and `extension` (J-A72.51); the slums `definedBy`
  the dossier's slum kind, kind `shanty`, the squalid band's rows); and the plain residential identities, one per band,
  lowest priority. Each row's `naming` slice is our naming pack's (§10.4).
* **Powers and sectors (items 72, 78 and 79).** The classes' `powers` column — guildhalls and workshops `guild`; merchant
  houses and warehouses `company`; churches, chapels and temples `religion`; the castle, manors and keeps `lordship`; the
  town hall and the courthouse `council`; barracks and guard posts `military` (item 79's kind); mage towers and alchemists
  `arcane` (item 79's kind, only where the magic circumstance or a dossier arcane power admits it); the clandestine
  classes `criminal` — each an association the dossier's `Institution.powers` overrides (§2.7). `powerLinks`: gates 0.5
  `military`, 0.5 `council`; walls and towers `military`; bridges, roads and quays `council`; the market square `council`;
  the toll and customs houses `council`. The sector set (`sectors`, item 78): trade, taxes and tolls, crafts, agriculture,
  extraction, fishing, finance, religion, military, magic, crime. The classes' `sectors` column and `sectorLinks` (the
  owner's examples as rows): markets, warehouses and quays → trade; gates, toll houses, bridges, roads, walls and the
  customs house → taxes and tolls (0.7) with trade (0.3) on gates, bridges and roads; workshops and guildhalls → crafts;
  farms, mills and granaries → agriculture; quarries and mines → extraction; fisheries → fishing; moneylenders → finance;
  churches → religion; barracks → military; mage towers → magic; the clandestine classes → crime.
* **Band ranges (item 72).** squalid: squalid–poor in both halves; poor: squalid–modest; modest: poor–comfortable;
  comfortable: modest–prosperous; prosperous: comfortable–rich (the middle band to rich, item 71's mix); rich: prosperous–
  rich in its lower half, rich alone in its upper half.
* **Notice posts (item 82).** A `notice` pin stands at the principal market and at each gate plaza by default (§4.7's
  furniture step), at the main entrance of every class whose `tags` hold `notice` (a town hall, a market hall, a
  guildhall), and wherever a named-feature claim of the dossier names one (§7.7).
* **The port's staged rows (item 88).** `portRows` is declared in full and empty; a row the port fills acts only through
  the reader its comment names (the hidden share of §4.6, the farmland of §4.9, the access of II.7.3, the undercity's demand of II.7.5 and the dials of §4.5 (6)), and while empty every factor is 1 and every list empty.

=== REPLACE ### II.7.6 Catacombs, caverns and quarries; depth bands and the connection graph (item 65) ===
### II.7.6 Catacombs, caverns and quarries; depth bands and the connection graph (item 65)

**One layer, several systems (item 65 (a); J-A65.31, J-A65.42).** The underground layer holds the derived sewer network —
the central piece, system kind `sewer`, part 0 (II.7.1–II.7.4) — and beside it the systems below, each an
`UndergroundSystem` record (§2.7) with its kind, its source, its arena part and its depth range: `catacomb`, `cavern`,
`quarry` (quarries and mine voids), `vaults` (cisterns, street and bridge vaults), `buried` (a buried old town) and `dug`
(the private passages an access edit digs, item 66). Each is its own arena part of the `underground` layer (§3.4): the
sewer keeps part 0, and every further system takes the next unused part number when it is first created — at generation
in the stage order below, one system per kind; a `buried` system when a `raiseGrade` first makes one, or at generation from a history scar (*A buried old town*, below); a `dug` system at the
first access edit that needs one — stored on the record (`UndergroundSystem.part`), counted by the document's
`nextUndergroundPart` (§2.9) and never renumbered or reused, because the number is part of its entities' keys and
addresses (§6.3). One system per kind: two catacomb complexes that meet join, as galleries of one kind may; what passes over or under without meeting belongs to another kind and so to another part. Inside one part every plan crossing is a junction (§3.4), so no rule lays an element across another of its part without meeting it: a catacomb or quarry laid beside a complex of its kind joins it at a common depth band; a dug connector's path search treats every other building's dug passage as a foundation (step 3 below); and a drawn gallery or chamber that would cross one of its system's at another depth band is refused by its dry run, naming the crossing (F-EDIT, §5.2; J-A65.47). A system's elements are **galleries**
(`Gallery`, §2.7: a chain at the part's L1 with `widthCm`, `wallCm` and `headroomCm` from its system row below, banded by
`corridorUnion` as a tunnel is, §3.7) and **chambers** (`Chamber`, §2.7: a void wider than a band — an ossuary, a cavern
hall, a quarry room, a cistern — a closed outline chain carrying the `chamber_wall` role, its floor an L1 face;
J-A65.32), each with its floor `elevationCm` and its `ceilingCm`.

**Depth bands.** Every gallery and chamber keeps its own depth, laid inside its system row's `depthM` range (catacombs 3–10
m, vaults 3–8 m, quarries 10–30 m, caverns 5–60 m following the rock, a buried town at its old grade, dug passages 2.5–6 m)
and never above the ground less its system's `coverM`; inside one part depth is per entity (J-A12.45), and systems in
different parts pass over and under one another. The view groups every part's items into the depth bands of
`depthBandCm` (II.7.3), so the layer draws and exports as one (§8.4, §11.1), a crossing of two parts drawn over and under.

**The derivations.** Each system is a registered stage with declared I/O (§4.12) — `UndergroundSystemStrategy`, below —
running after the network stage in the order catacombs, caverns, quarries, vaults — then, at generation, a buried old town where a history scar makes one (below) — each reading the ground and part 0
through the services only (J-A12.32) and writing its own part; every draw is on `sewer`, keyed by the system's lineage
and the element's source (§6.1; no new concern). Every system is gated to TOWN and above (PART III) and by its row's chance
per rung — a history scar's buried town by the `buried` row's `scarSeverity` instead, drawing nothing (*A buried old town*, below); the chances are 0, and the scar rule off, in the parity presets.
- **Catacombs** — from cemeteries' and churchyards' sources: the churchyard parts of church and temple plots (§4.9's
  churchyard row), the crypted classes (`underground: 'preferred'`: crypts, §10.2) and the religious precincts and
  monasteries. A source qualifies when its ground is not `damp` or `flood` (the water table of §2.6's gate values) and its
  age reaches `minAgeYears` (100) — at generation `(K − k + 1) × yearsPerStage` for a source built in growth stage k of K
  (§4.4; `yearsPerStage`, the stage rows' 50 years, §4.2 S2), replaced by the staged `HistoryHint.ageYears` when the port fills it (item 88) and by the
  log's years since its use opened after epochs — and holds a catacomb with the row's chance by source kind and rung
  (crypted church 0.6; churchyard 0.25 at TOWN, 0.4 at CITY, 0.5 at METROPOLIS; precinct 0.4). Its extent is its
  ossuary need, `A = Σ_years servedPopulation × burialRate ÷ 1 000 × ossuaryShare × m2PerBurial` — the population its
  source serves (the town's population history × the source's share of its religion's temples, §10.2; at generation each
  growth stage's population at its built share), `burialRate` 30 per 1 000 a year, `ossuaryShare` 0.1, `m2PerBurial` 0.05 —
  laid as galleries on a grid of `gridM` (6 m) under and beside the source within `reachM` (80 m), an ossuary chamber at
  every fourth crossing, and an entrance stair from the source's building (an `AccessPoint` of source `system`); so a
  catacomb is as large as its town's dead and as old as its church.
- **Caverns** — from geology: where S1's geology flag (`Terrain.geology`, §2.3, written by S1, §4.2) is `soluble` or
  `volcanic`, over the frame's rock (S1's `rock`, `high` and `mid` terrain classes), a cavern system exists with the row's
  chance (soluble 0.7, volcanic 0.4). Soluble rock: galleries along the terrain's drainage lines beneath the rock (§2.3's
  `hydro` cells whose `flowAccum` passes the row's threshold), at the local water table — a gallery below it carries water
  (`Gallery.water`) — with a hall where two galleries meet under high relief; volcanic rock: one to three tubes descending
  from high ground along the steepest descent, with breakdown chambers. The extent is capped at `maxRockShare` (0.1) of the
  rock area, and a gallery that meets a slope's face or a bank opens there as a cave mouth (an `AccessPoint` of kind
  `mouth`).
- **Quarries and mine voids** — from S1's stone resource and the town's stone stock: the volume taken is the stone the town
  is built of — the wall volume of the stock whose material is stone (§2.6's material rule, read here as a quantity of
  stone, never as a shape; J-A65.45) and of the enceinte's walls and towers — × `wasteFactor` (1.6); the workings are laid on
  the frame's stone cells (`SiteResources.stone` ≥ 0.5) ranked by stone value, then nearness to the town, within `reachM`
  (2 km), under the town first where its own ground holds the stone (as the old quarries lay under Paris), as
  room-and-pillar galleries on a `roomM` (5 m) grid leaving `pillarShare` (0.35) of the rock, the area = volume ÷
  `headroomCm` (250); a working whose cover would be under `minCoverM` (6 m) is left to the hinterland's surface quarry
  (§4.9) and laid nowhere underground; a shaft opens at each working's centre (an `AccessPoint` of kind `shaft`). Mine
  voids read `SiteResources.ore` the same way, only where the roster holds a mining class.
- **Vaults** — cisterns and street and bridge vaults: under every bridge approach whose way rises over the ground beyond
  the banks, under way segments on slopes steeper than `vaultSlope` (0.12) where a street is carried on arches, and a
  cistern under the oldest precincts and the castle where `dist.water` exceeds `cisternDistM` (400 m) — each a chamber or a
  short run of vaults under its way or precinct, under public ground only (II.7.3's surface constraint applies).
- **A buried old town** — the settlement's own earlier street level under a raised grade (b (1)'s last source; item 65
  ruling 5; J-A65.46): the conversion kind `raiseGrade` (below; §4.11's union names it) is applied by an epoch (the
  evolution engine, staged) or by hand (a `convert`, §7.1). S1's terrain operator raises the region's ground by `raiseCm`
  (≥ 200 cm, a storey); the region's ways, plots and buildings at the old grade end on the ground (their existence `cleared`,
  §2.8) and fresh records of the `buried` part are the system's elements — each old way's centreline a gallery, each old building's ground storey a chamber, each new record a fresh entity of the `buried` part, minted from the conversion event's `seq` and ordinal as a mutation's added parts are (§6.3), the cleared records keeping their addresses on the ground: an address names its part and no batch writes two (§3.4) — while the ground above is
  re-derived on the new grade from the old centrelines (regrowth-first, §4.11: the streets keep their lines, the buildings
  rise on their plots). The conversion records the system it created or extended in `RaiseGrade.system`, so a replay after a log truncation reads its part number there, as a closure's `ClosureRecord.created` does (§2.9). So an undercity in it walks the old town's streets under the new. At generation none exists unless the port fills the staged `HistoryHint` (item 88) with a `fire` or `flood` scar (the `RaiseGrade.cause` types §4.2 S2 routes here) of `severity` ≥ the `buried` row's `scarSeverity` (0.5): the most severe such scar (ties: the oldest, by `yearsAgo`) makes one `buried` system, in the systems' stage order after vaults and gated to TOWN and above as every system is — its region the districts whose `growthStage` is 1 (its `sources`, §2.7), its galleries that region's way centrelines and its chambers their buildings' ground storeys, fresh records of the `buried` part (the system's lineage children, §6.3), its floors laid at `scarBaseCm + scarGainCm × severity` (200 + 200 × severity) cm below the present grade — its old grade, at which *Depth bands* lays a buried town (above); the town above is generated on the present grade as it stands, no `raiseGrade` event recorded and nothing cleared, and the rule draws nothing (our own rows, calibratable, an `extension` the parity presets turn off); with the hint empty, none.
- **Dug passages** — item 66's pieces (below).

**The connection graph (item 65 (d); J-A65.47).** A link (`UndergroundLink`, §2.7) joins two elements of different parts —
each end one vertex in its part carrying the `link_end` role (§2.2 rule 7), never a vertex two parts share (J-A65.31) —
with a `kind` (`open`, `gated`, `secret`, `collapsed`, `flooded`), a `via` (`breach`, `stair`, `shaft`, `door`) and a
`knownTo`; the surface links are `AccessPoint`s (II.7.4). The **connection stage** (`UndergroundLinkStrategy`, below)
runs last, after the undercity: (1) the undercity's lifelines (II.7.5) first; (2) for every pair of elements of different
systems within `linkReachM` (10 m) in plan and `linkDepthM` (8 m) in depth — found by reads across parts — one link per
pair within `linkSpacingM` (60 m), existing with the row's chance for the pair of kinds (sewer–vaults 0.6, catacomb–quarry
0.5, any–buried 0.5, sewer–catacomb 0.3, sewer–quarry 0.3, cavern–quarry 0.3, sewer–cavern 0.2, others 0.2; our own), so a
catacomb may meet the sewer or not; (3) its kind drawn by the row's weights (open 0.3, gated 0.25, secret 0.25, collapsed
0.15, flooded 0.05 — `flooded` only below the water table); (4) its `knownTo` `secret` for a `secret` link or a link into a
building with a concealed use, else `local`; (5) II.7.3's basement accesses (item 64). A link's kind follows the elements
it joins (II.6), and every link is an edit target (add, delete, `setAttr` on `kind` and `knownTo`, §7.1).

**The same engine, and the rest of the family's rules (item 65 (e)).** Every system is laid by the kernel's one cut
(J-A65.32): galleries as chains banded by `corridorUnion`, chambers as closed outline chains. Plots and buildings exist
only where a system hosts people — the sewer's frontage (II.7.3) and the undercity (II.7.5); a catacomb's, cavern's,
quarry's or vault's chambers carry none unless the undercity takes them. Every element is an edit target (draw, move,
delete, `setAttr` on kind, depth, width, state and `knownTo`; II.6's conversions and `flood`), every rule is a data row
(§7.6), the seed survives edits (§6.3), the dossier stays the authority for institutions (item 20), and every element
fades by II.6's condition table. **Light (item 68 (d′)):** catacombs are dark but for their shrine and ossuary lamps at the
chamber altars, caverns dark but where lived in (a glowing-fungus row only where the `magic` circumstance or the biome
allows), quarries and vaults dark but at their shafts and where lived in — §4.7's light table, context `arena`
underground and the system kind; every access or cave mouth that breaks the surface is a light shaft (§8.4).

**The pieces an access edit generates (item 66; owner: "if a user edits a building to have an access to the underground,
it generates all the necessary pieces"; the closure rule — one event whose batches commit together, the record of what it created,
exact undo, shared pieces kept — is §7.3 item 9's; J-A66.41).** `addUndergroundAccess(building, target?)` (§7.1) calls
these generators in dependency order at its dry run, each drawing on `sewer` keyed by the building's lineage, the
target's and the event's `seq` (§6.1; minted as J-A18.43 mints), so the same edit on the same seed gives the same pieces:
1. **The basement** — §2.6's basement decision with its probability forced: the request overrides the chance, never the
   terrain gate — a full cellar where the gate allows, else a half cellar or a walk-out on a slope, else a hatch to a
   crawl space under a raised floor (§2.6's requested-mode ladder), else a refusal naming the gate (F-EDIT, §5.2), never
   silent (J-A29.22 stands).
2. **The target** — the named element; else the most plausible reachable one: an open navigable sewer tunnel or an
   underground building's wall within `accessReachM` (II.7.3's targets), then within `digReachM` (60 m) the nearest open
   gallery or chamber of a catacomb, cavern, quarry or vaults, or an undercity walkway — ties by plan distance, then address.
3. **The connector** — when the target lies beyond `accessReachM`: a `dug` passage, a gallery chain in the `dug` system's
   part, routed by the kernel's path search (§3.1) on the frame's grid from the basement ring to the target — its cost infinite within `foundationClearM` (0.5 m) of every other building's footprint, basement ring and dug passage and wherever the water
   table (§2.6's gate values) lies above the passage's floor, rising with the rock class — inside the `dug` row's depth
   range, below the street's services (the network's `coverCm`, II.7.2) and above the water table; a route longer than
   2 × `digReachM` is a refusal with the reason.
4. **The system itself** — where no underground element lies within `digReachM` (a town without sewers, a village): the
   minimal private underground, the `dug` system with one passage to the most plausible outlet by the building's outlet
   row (default: another cellar of the same owner within reach, a catacomb or cave the site has, the riverbank, the shore,
   beyond the outermost enceinte; where the building carries a concealed use: beyond the walls, the riverbank, the shore, a
   catacomb or cave) — its outer end an `AccessPoint` of kind `mouth`, or a door into the other cellar. The settlement's
   sewer rows are unchanged — a dug passage is no network and `Features.sewers` is untouched — while `Features.underground`
   turns true (II.7.4).
5. **The access point** — II.7.4's record, its kind by the drop (II.7.3's *Basement accesses* (3)), `state` `open`,
   `knownTo` by II.7.3's *Basement accesses* (4), `source` `edit`.
6. **The plan** — the plan rung reserves the stair, ladder or hatch in the basement plan (§2.6, item 28), and the
   building's plan rung is marked `stale`.
7. **The links** — the connection graph gains the new links, typed (`open` at a dug passage's two ends).
The closure's other instances (§7.3 item 9 (d)) declare their own generators: a concealed front's missing door by §2.6's entrance rules (§4.7's *Concealed institutions* (4)), an undercity entrance's missing lifeline by the target, connector, access-point and link steps above (II.7.5). The bars are §13.2's T66
group.

```ts
interface UndergroundSystemRow {   // one per system kind; II.7.6's rules as data (§7.6); our own values, extension (every chance 0 in the parity presets)
  kind: 'catacomb'|'cavern'|'quarry'|'vaults'|'buried'|'dug'; chance: Partial<Record<Rung, Record<string /* source kind */, number>>> /* absent: none (the buried row's generation-time town reads scarSeverity instead, A buried old town); never below TOWN */;
  depthM: [number, number]; coverM: number; gallery: { widthCm: Cm; wallCm: Cm; headroomCm: Cm } /* the kerb reads widthCm ÷ 2 + wallCm (§3.7) */; chamber: { minM2: number; ceilingCm: Cm };
  params: Record<string, number> /* the kind's own values named above: minAgeYears, burialRate, ossuaryShare, m2PerBurial, gridM, reachM; maxRockShare; wasteFactor, roomM, pillarShare, minCoverM; vaultSlope, cisternDistM; scarSeverity, scarBaseCm, scarGainCm (the buried row's generation-time scar rule); digReachM, foundationClearM */;
  outlets?: { use: 'default'|'concealed'; order: ('cellar'|'void'|'riverbank'|'shore'|'beyondWalls')[] }[] /* dug only: the outlet rows of item 66's step 4 */ }
interface LinkRule { linkReachM: number /* 10 */; linkDepthM: number /* 8 */; linkSpacingM: number /* 60 */; chance: Record<string /* the sorted pair of system kinds, 'catacomb|sewer' … */, number>;
  kinds: Record<UndergroundLink['kind'], number> /* the kind weights */ }
interface RaiseGrade { op: 'raiseGrade'; region: Id[] /* the blocks or districts raised */; raiseCm: Cm /* ≥ 200 */; cause: 'fire'|'flood'|'rebuild'|'hand';
  system?: Id /* the buried system it created or extended, written when the conversion is applied; its address's under<n>/ prefix carries the part number a replay reads (§2.9) */ }   // a conversion kind (§4.11's union names it): the buried old town above
interface UndergroundSystemStrategy { derive(doc: Document, row: UndergroundSystemRow, ctx: StageContext, k: Kernel): KernelResult<{ system: UndergroundSystem; galleries: Gallery[]; chambers: Chamber[]; access: AccessPoint[] }> }
interface UndergroundLinkStrategy { link(doc: Document, rule: LinkRule, access: UndergroundRule['access'], ctx: StageContext, k: Kernel): KernelResult<{ links: UndergroundLink[]; access: AccessPoint[] }> }
// Stages registered after the network stage by declared I/O (§4.12): the systems in the order catacomb, cavern, quarry, vaults and, at generation, a history scar's buried system, each writing its own part; then II.7.3's and II.7.5's stages; then the connection stage last, which writes link records and access points and no geometry but their link_end and access_point vertices, one part per transaction; the StrategyRegistry's `underground` map (§14)
```

=== J-ROWS ===
| J-A88.42 | the staged inputs' readers stated at their homes: `HistoryHint` the stage count (min(K, max(1, ⌈age ÷ yearsPerStage⌉))), its age the catacomb rule's age, and a fire or flood scar the buried old town only; `PowerRelation` a soft typing row and an alliance's spill in the political component; legitimacy on the governing power's amplification; a dossier institution's visible non-physical impairment on that institution's own dial term; the import share on the arable demand — each inert while empty | §4.2 S2, §4.5, §4.9, II.7.6 |

=== RATIONALE-A ===
| J-A88.42 | Chose to state at each home the one reading of every staged dossier input item 88 declared — `HistoryHint` setting the stage count to min(K, max(1, ⌈ageYears ÷ yearsPerStage⌉)), the later walled stages folding into the last kept one, its `ageYears` replacing the age II.7.6's catacomb rule reads, its fire and flood scars read only by II.7.6's buried old town and every other scar by no rule, the creation week showing a finished town (J-A67.47); `PowerRelation` a soft `adjacent` or `avoid` typing row between the kinds its powers' identity rows name and, for an alliance, a spill of 0.25 × its strength between the two powers' political alignments; `PortRows.legitimacy` multiplying the governing power's amplification; a dossier institution's visible non-physical impairment lowering the impaired institution's own dial term, read from that institution's impairments and never from a settlement-wide `ConditionOverlay`; the hinterland row's import share multiplying the arable demand — each inert while the port leaves it empty, over naming the readers only in the records' comments, because a hook the design names must be a mechanism at the stage that reads it, each, while empty, leaves the base as it is, so no emulation changes, and an impairment is a fact of one institution (§7.7's F4 row), so it moves that institution's term alone (§4.2 S2, §4.5, §4.9, II.7.6; item 88; repair round 1, V-MC0-17, VPR0-15; repair round 2, VPR1-03; repair round 3, VS2-04). |
| J-A42.41 | Chose to keep every plot built with an access edge (O5 a) and a deep block's interior chosen in S8 by the band row's shares (J-P15) — item 30's reach making the hidden plots deliberately — over the rule NG 1.2.2 follows, where a lot survives only when it fronts the block's rim, passes a shape test and stays clear of the neighbourhood's outline, so that every leaf without a street edge falls to the court, because our frontage-first cut (§4.7 S10 (4)) gives each plot a frontage from the outset, and the owner's hidden-plot and prosperity rules make the interior a choice rather than a remainder. Only the description changes: the design had called about 42 % of NG 1.2.2's lot leaves "silently discarded"; they are its courts, made on purpose, and how often a block has a court there follows from its block and lot sizes — so the interior shares of §4.6, fitted at M-1 to that frequency, are fitted to a consequence of the rule, not to a share it draws (§4.7's S10 step (10), §4.6, F-PLOT of §5.2, §1.3; item 42; repair round 3, VAL-01). |
| J-P37 | Chose a `reserve` seam type for a way-less reservation boundary two districts share over forbidding such boundaries, because the grower's edge test (§4.5) stops at reservation boundaries by design, so a plaza's or precinct's edge is exactly where districts meet, and the margin band S10 lays there is the shared geometry the type names (II.1; VK2-10; amendments-c repair round 3, VAL-04). |

=== END ===
