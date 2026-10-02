# Repair round 7w — V01 (the city's fabrics) — lane coherence/repair-V01-r7w

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-V01-r7w; covered by the whole-design retrovalidation (J84).

# Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): text before the first block header is
# ignored; the FILE line routes every block to docs/volumes/V01-neighbourhoods.md. Live unit: V01 as assemble-r7v left it
# (sha256 b8430af89b39c593…, 529 041 bytes, 3 759 lines). Each REPLACE body is the live subsection with count-asserted
# substitutions (scratch rV01r7w/gen.py: 5 substitutions, each applied exactly once); every untouched line is verbatim,
# only the lines a substitution touches rewrapped. Blocks: 4, all REPLACE of leaf sections — §3.17.3, §5.1.1, §5.1.2,
# §5.1.3. No heading retitled or added, no whole-volume REPLACE, the title block untouched.
# Ruling requests: 0. Binding rulings applied: adjudication-r7w (its head and "How to read", the decision table, Part H ·
# V01: V1-1 and V1-2; Part H · rendering: R1, the home V1-2 cites); adjudication-r7's Part H head (the citing form
# "§2.7's laws, law n; its worked example …") and R7-01 (2) (the sweep); every earlier ruling standing.
# No review id, ruling id or Part P marker is written into design text.
#
# PROGRESS (lane `coherence/repair-V01-r7w`, 2026-10-02)
# - [x] P1 brief read whole (with its FAMILY FIX PASS NOTES and ORCHESTRATION NOTES; fresh run: no output, no LANDED
#       line); adjudication-r7w: its head, the decision table (42 rows), the class ruling, Part H · V01 and · rendering,
#       the builders' choices, the held notes; adjudication-r7's R7-01 (2); the issue source famverify-readers-r7v.md
#       (VF7v-RDR-01 and VF7v-RDR-02, read whole, with its held notes); the round-7v V01 repair (its sweep)
# - [x] P2 live V01 read whole at every site: §3.17.3 (1)–(7) and its closing paragraph, §5.1.1 (the band table and
#       *Item 110's marks*), §5.1.2 (every program), §5.1.3 (the lead, the table, *Stacks in slot 12*); live base §2.7's
#       way-and-channel table lead (ARCHITECTURE.md l. 2897: "these laws, law 1 (1), (8), with §4.3's crossing rule") and
#       §8.2's layer-order table (l. 14139–14155), the light pass's "slots 1–20" (l. 14165)
# - [x] P3 blocks generated (4 REPLACE) and dry-run on a copy of the live V01 (below)
# - [x] P4 report, result saved, LANDED
#
# DISPOSITIONS — Part H · V01: one FIX and one END, both written in adjudication-r7w's exact words.
#  * VF7v-RDR-02 (minor, CITATION, FIX) — V1-1: FIXED in the text.
#  * VF7v-RDR-01 (major, rendering's FIX) — V1-2, its END at V01: WRITTEN in the text. The fix's home is rendering's R1
#    (§8.2's slot table, row 19a); V01's neighbourhood and building list now places the deck there and cites it.
#  No VALID CHOICE, MERGED or INVALID issue is routed to V01; no other END line in Part H names V01 (searched the whole
#  file for "V01" and "V1-"). The class ruling's sweep names no V01 clause as a member (T-V1-51 "read and holding").
#  Nothing goes to a fix list.
#
# ISSUE → WHERE FIXED (each "old → new" as Part H words it, every other word standing)
#  V1-1  §3.17.3 (3): "(*Lattice and costs*; §2.7's way-and-channel table, row a)" → "(*Lattice and costs*; §2.7's laws,
#        law 1 (1), (8); its worked example the way-and-channel table's row (a))". The item's next clause ("a `vault`
#        span read as §2.7's laws read it (law 1 (8); its worked example *beneath*)") stands; the two lines rewrapped.
#  V1-2  §5.1.3's table: "| 14 | piers and bridges; raised decks (`raisedWay`), their shadows drawn in a pass just
#        before this slot over everything below, roofs included | a deck may stand above the roofs beside it |" →
#        "| 14 | piers and bridges | — |"; and after "| 19 | towers and gate blocks | — |" the row "| 19a | raised decks
#        (`raisedWay`), their shadows drawn in a pass just before this slot over everything below, roofs, walls, towers
#        and gate blocks included | drawn above what it crosses, as §8.2's slot 19a, this order's one home, places it
#        (item 110 (b)) |".
#  V1-2  §5.1.2, the `way.stair`, `retaining`, `raisedWay` program: "a raised part's piers take slot 11 and its deck slot
#        14, its shadow by the prism law from the deck's height in the pass before slot 14" → "a raised part's piers take
#        slot 11 and its deck slot 19a (§8.2's slot 19a), its shadow by the prism law from the deck's height in the pass
#        before slot 19a".
#  Nothing lost: row 14's old reason ("a deck may stand above the roofs beside it") lives at the home, §8.2's row 19a as
#  R1 writes it ("— a deck may stand above the roofs beside it, and a wall running beneath it … draw beneath it"); the
#  shadow pass, its "over everything below" and its "roofs included" stand in V01's row 19a, widened to walls, towers and
#  gate blocks as the home's.
#
# THE SWEEP (R7-01 (2): every restatement in V01 of a text this repair changes, searched in prose, tables, edge rows,
# tests, decisions, milestone cells and index rows) — "slot 14", "slot 11", "deck slot", "19a", "slots 1–", "raised
# deck", "its deck", "the deck's height", "pass before", "drawn above", "above what it crosses", "draw order", "order
# parity", `raisedWay`, "way-and-channel", "crossing table", "row a", "row (a)". Conformed (one site beyond Part H's
# lines, named here as the sweep requires):
#  * §5.1.1, *Item 110's marks*: "raised parts at every band by §8.5's way selection, drawn above the ground ways with
#    their shadow (`raisedWay`)" → "… drawn above what they cross with their shadow (`raisedWay`; §8.2's slot 19a)". The
#    deck's draw relation stated in its "ways only" form — the form R1 widens at §8.3's item-110 marks row ("over the
#    ways, walls, towers and gate blocks it crosses") — now in item 110 (b)'s words with a citation of the one home; at
#    the city and district bands (§8.2's shared list) and at the neighbourhood and building bands (§5.1.3's row 19a) the
#    slot is the same. Nothing built changes beyond V1-2's own slot move.
# Searched and standing, each with its reason:
#  * §5.1.3's *Stacks in slot 12*: "The light pass (§8.4) runs over slots 1–20 as in every family" — 19a lies in the
#    range as 8b does; the base's own light pass reads "slots 1–20" over its 8b and (after R1) 19a in the same words.
#  * §5.1.3's lead: NG 1.2.2's order a subsequence (§8.3's order parity) — NG draws no deck; the subsequence holds.
#  * §5.1.3 slot 11 ("landmark footprints; raised-way piers (in `wall`)") and §5.1.2's "piers take slot 11" — the piers'
#    slot is unchanged by the ruling.
#  * §5.1.6, `ink`'s close-up ("raised decks as ink double lines with dashed spans", l. 3065) — a mark, no slot or order.
#  * §5.3's export row ("raised decks at their height on their piers", l. 3119), §2's arena-parts paragraph (l. 566),
#    l. 582's deck-plot sentence — no draw order.
#  * T-V1-51 (a)–(g) and every other V01 test, §8's milestone cells, §1.2's hook rows — none names a deck's slot or its
#    order against walls; T-V1-51 (c) already cites "§2.7's laws read `open` …, law 1 (8); its worked example
#    *beneath*". After the repair V01 holds no "slot 14" for a deck and no bare way-and-channel citation.
#
# OWNER RULES. Item 110 (b) ("RENDERED above what it crosses, with its shadow") is what V1-2 brings V01's list into line
# with; J144, J146 – J151 bind: nothing written here reads a lock, a re-grade or a repair (J150's round-8 hand-offs get no
# text); no program reading is marked the owner's. Items 114–126: untouched.
#
# HAND-OFFS: none. Both ends: V1-2's citation "§8.2's slot 19a" resolves when rendering's R1 (adjudication-r7w Part H ·
# rendering, the same round) inserts the row; V01's row 19a is the neighbourhood-band twin of that row, and §8.2's slot
# resolution (R1's second bullet) and §5.1.3's "the loader refuses a `hatched` sheet whose neighbourhood list leaves a
# semantic unplaced" read the deck's entry at 19a in both lists. The readers lens's held note 6 (fields, trees and
# boundary treatments over decks, V01 l. 3024–3027) closes with this row, as adjudication-r7w's held list says, for the
# next full round to confirm.
#
# CHECKS. Dry run on a copy of the live V01 (apply-blocks.py, the FILE line left out as assemble routes it, a throwaway
# rationale): 4 blocks found, 4 applied, 0 skipped; audit not-OK 0; headings 123 → 123; fences balanced (12 → 12); title
# block unchanged; PENDING FABLE REVIEW lines 1 → 1; 529 041 → 529 232 bytes, 3 759 → 3 762 lines; the diff touches
# exactly live lines 2473–2474, 2905, 2976–2977, 3024 and one row inserted after 3029. No other round-7w repair file
# writes V01 (searched: model, scope, determinism, V06, V10 and rendering's files). docs/validation/bench/doc_checks.py
# (--heads docs/ARCHITECTURE.md) on the copy before and the output after: identical but for one S2 line number shifted —
# C1 0 / C2 0 / C3 407 (352 unreviewed) / C4 2 (0) / S1 0 / S2 286 (3 unreviewed); no hit added (the three S2 hits
# pre-exist, outside the blocks). WARNING "reference corpus INCOMPLETE (missing: captures, research/patreon,
# research/devlogs, research/ftg-docs, research/external) — clean-room results are NOT authoritative": the result is
# provisional (orchestration note).
#
# WORDS (principle (9)'s shrink report). V01 85 192 → 85 226 words (+34, +0.04 %). Removed: restatement 10 (row 14's
# reason "a deck may stand above the roofs beside it", now at the home, §8.2's row 19a), narration 0, duplicated
# mechanisms 0, verbose prose 0. Added: the ruled law citation at §3.17.3 (3), the row 19a with its reason citing the
# home, the slot 19a citation in §5.1.2 and §5.1.1. The unit grows because this pass's V01 work is one minor's citation
# and one major's END, each an addition the rulings require; irreducible here.

=== FILE docs/volumes/V01-neighbourhoods.md ===

=== REPLACE #### 3.17.3 Raised ways in the close-up (J-V1.65) ===
#### 3.17.3 Raised ways in the close-up (J-V1.65)

1. **Committed inputs.** A raised part — item 110 (b)'s viaduct, elevated road or aqueduct on a ground part ≥ 1 —
   generated or declared, is committed before S7b (1) (item 290) and is an input of every stage-2 step. This volume never
   creates, moves or removes one: the generator's reason, chance, cap and rung bars are the base's and volume 11's rows'
   (item 110 (f)); this volume owns the bars inside a close-up (T-V1-51). Its piers are those item 244's support step
   lays, which this volume's crossings and under-deck strip read (J-VI.27).
2. **The under-deck strip.** The part's ground projection — its piers and spans over the deck's width plus
   `raisedWays.structure.stripMarginM` (V11 §3.24.2) each side, §4.6 S8's one strip — is a **hole** in the faces it
   crosses, as an S7b claim is (V01 §3.4.1): where it crosses a face from boundary to boundary it cuts it; no plot, block
   interior, seed or hood pin lies in it; the base's arch vaults (II.7.6; volume 4's `vault` spans) fill it where they
   exist — none in a span §2.7's laws read `open` (law 1 (8); its worked example *beneath*) — and an `open` span stays
   open ground, a way passing under it, bare ground or a wall's run beneath it (§2.7's laws, law 1 (7), (8); its
   worked example *beneath*) (item 110 (b): "the spaces between piers stay open or hold the base's vaults").
   `DistrictContext.areaM2` and the pre-claim template face exclude it.
3. **Crossing under an arch.** A part-0 way this volume lays (a seed, a fan, a bent-cut lane) crosses a strip only
   where §4.3's crossing rule admits it (*Lattice and costs*; §2.7's laws, law 1 (1), (8); its worked example the
   way-and-channel table's row (a)), a `vault` span read as §2.7's laws read it (law 1 (8); its worked example
   *beneath*). A seed that would cross elsewhere takes F-TEMPLATE
   rung 1 (redraw), then rung 2 (its crossing shifted along the strip to the nearest qualifying span); a bent-cut lane
   takes §4.6's ladder and, finding no span, ends at the strip's edge as at a reservation.
4. **Ends.** Each ramp or stair end is a ground vertex on part 0 (item 110 (b)); V01 §3.6 (4)'s portal gap applies to it
   as to a bridge end and extends over the ramp's or stair's rise, so no lane joins it mid-rise; it is an ordinary
   junction of its carried class (V01 §2.3's parts table).
5. **Pins.** V01 §3.8.2 step 5's clearance holds every pier footprint and the whole strip: no hood pin stands under a
   deck.
6. **A raised way over a wall is no gate.** A raised way meets a wall by §2.7's laws (its worked example the crossing
   table), never with a gate or an opening (§2.7's laws, law 1 (1), (2)): an aqueduct crossing a curtain, over it on an
   arch or merged into it, and a deck over a wall laid after it give no gate portal, no `gate` rank or kind factor, no
   gate plaza, no wall-side feature and no S9b square — a gate standing beneath an aqueduct's arch that clears it
   (law 1 (5)) being a part-0 gate as any, with its portal, rank and plaza.
7. **Boundaries.** A raised part never bounds a district (V01 §3.11 (8)).

A raised part whose strip lies wholly on hinterland land-use faces crosses no district: stage 2 reads nothing of it (the
span stays open by J-C4's rule). A strip that covers a district's whole template face leaves D with no template face
(V01 §3.3.2).
=== END ===

=== REPLACE #### 5.1.1 Per band ===
#### 5.1.1 Per band

| band | what `hatched` draws |
|---|---|
| city | block ground = paper; footprint masses in the lit roof tone (`building`) with the band's outline; the street stripe in `road` (ways at the band's selection, §8.5); `square` blocks and plazas in `road`; `green` blocks, parks and wood fills in `green` / `tree` (§8.5 (1), item 417); water in `water`; walls in `wall`; one prism shadow pass under the masses (§8.4 (h)); labels by §9 |
| district | as city, plus: two-tone roofs by the sheet's `roofConstruction` — `fakeGablePerWing` over the stored wings until stage 3 registers, then `roofscape('twoTone')` over each building's facets (V02 §5.2–§5.3; §8.6, item 406) — each face's or facet's tone by the roof law below, footprints outlined, yards by role, boundary treatments, entrance ticks, every way stroked with its casing, courts in `court`, crowns (lobed, two greens) |
| neighbourhood | as district, plus: the **hatch** program on every roof facet, the road **surface** programs, stair-stepped ticks, the hood pins and model pins as symbols with their prism shadows, the ground access symbols the viewer's key admits (V01 §3.8.8), chimneys, the large-tree pins under the buildings and block trees above them (item 58 (d)), place labels (openings included), every named way labelled, addresses (§9.3), the close-up's title and vignette when a district or an outline is opened |
| building | per-facet hatching as at the neighbourhood band; the plan rung as `ink`'s (§8.2's presets row) once stage 3 exists |

**Item 110's marks**: retaining walls from the district band (`retaining`); raised parts at every band by §8.5's way
selection, drawn above what they cross with their shadow (`raisedWay`; §8.2's slot 19a); stair and ramp intervals from
the district band
(`way.stair`); deck plots and their buildings as any plot and building; each stepped building's tiers in stack order with
their shadows (V01 §5.1.3).
=== END ===

=== REPLACE #### 5.1.2 The programs ===
#### 5.1.2 The programs

* **Roof law.** Each roof face or facet takes the lit roof colour or its dark variant `dark = lit × lerp(ambience,
  shadow, α)` by its normal against the light (`faceLight`, §8.2), `α` the sheet's shadow alpha — the law §8.3's
  `hatched` census row tests within ± 0.02. The lit colour per building is the `roof` role's pick (the role holds a list
  in `hatched`: index by §8.2's multi-colour rule) scaled by `2^(0.3 × s)` with `s` a centred bell of three uniforms from
  the building's `render.instances` stream (a gentle per-building tone variance, ours; NG 1.2.2 scales its roof colour by
  a power of two, provenance `ref:NG 1.2.2 roof tone (code)`), clamped per channel; so terraces read as separate houses.
* **Hatch** (item 58 (e); J-V1.47, J-V1.69, J-V1.73). The hatch runs **per roof facet** of the sheet's
  `roofConstruction`: under `fakeGablePerWing` (every sheet before stage 3 registers), each wing's faces by its
  `RoofSpec.kind` (§2.6) — a gable or hip wing's two faces split at its ridge line, a flat wing's one level face, a
  pyramid, tent or skeleton wing's one face per eave, a cone or dome as one surface; under `roofscape` (from stage 3's
  landing, V02 §5.2–§5.3), each of the building's `RoofFacet`s. **The NG parity sheet** takes its roof
  construction by V01 §7's rule (V02 §5.3 supplies `roofscape`; J-VI.17 H8); every other `hatched` sheet switches to `roofscape('twoTone')` and
  the per-facet hatch when stage 3 registers. Lines at a **world pitch** `hatch.pitchM` — a model length, as
  Neighbourhood's spacing is (`code-neighbourhood.md` §2.11), so a facet has the same lines at every zoom; its default is
  calibrated at M5 so the census mean is 17–19 per wing on B-ZOOM's neighbourhood-band reference viewport, starting at
  0.8 m (ours; NG's unit-to-metre reading is HOLD). **Direction:** a sloped facet's lines run parallel to its **eave** (its
  lowest horizontal edge) — so a long facet's run parallel to its wing's ridge, NG's law (under `fakeGablePerWing` a gable
  or hip wing is hatched parallel to its ridge across its whole footprint, as Neighbourhood hatches), and a hip, pyramid,
  tent, pent-band or skeleton facet's parallel to its own eave; a level (flat) facet's parallel to its wing's OBB major
  axis; a cone's or dome's facets as concentric rings about the apex at the world pitch. **Every line is clipped to its
  facet**, so it stops at a valley line, a hip line and the outline of a wing standing on the wing. Each line's two
  crossings with its facet's boundary each carry one filled tapered triangle, base one stroke width (0.5 px at 1×) on the
  crossing, pointing inward along the line to a point at `½ × m3 × chord` from it (a ring: two tapers where it crosses the
  light axis); then, per ridge-bearing wing (gable, hip), two heavier tapers from the ridge's ends inward along the ridge,
  each `(0.3 + 0.2 u) ×` the ridge length, base 1 px — unchanged by the construction; a flat, pyramid, tent, skeleton,
  cone or dome wing has none — the taper and ridge-taper laws NG 1.2.2's (provenance `ref:NG 1.2.2 hatch (code)`),
  restated in our words. A flat facet adds its parapet (V02 §2.6's `parapetCm` on a flat tier) as one inset outline at
  its plan offset, in the lit tone of the up normal (`faceLight`); a `none` roof has no hatch (its state program,
  V01 §5.1.4); a facet of zero area (a degenerate wing) draws nothing. Where the on-screen pitch falls below `hatch.minPx`
  (1.5 px), the program draws every second line by index parity — a zoom-stable subset, never a re-spacing. No ridge
  stroke; the outline is the footprint only (NG BG-3). The draws are the wing's render key's (§6.1's decoration rule:
  hatch phase and lengths never re-scatter with zoom). A wing's triangles are emitted into its tile's one `hatch` path per
  role (§8.1's `hatch` mark kind), so a tile's draw calls stay within §12.5's 80 (instanced hatching, II.4); the census
  (§8.3) counts per wing (the lines of all its facets) — 15–20 per gable or hip wing on the NG parity sheet, the two ridge
  tapers included — and the line count per wing is invariant across the band's zoom for every kind. With the style's
  `details` off **no hatching draws**, the ridge tapers included (NG E1, E6); with `shadows` off the hatch turns 90° to the
  eave (NG's own switch). The parity subset below `hatch.minPx` and the `details` and `shadows` switches apply to every
  facet.
* **Stair flights** (volume 2's `stairFlight`, V02 §2.6). The flight's facet as volume 2 paints it, its treads hatched
  across the flight by volume 2's `stairTreads(w)` (its `n − 1` lines at its `goingCm`, V02 §2.6), no ridge tapers; below
  2 px of plan per tread the lines are omitted as volume 2's `stairFlight` omits them; drawn after the wing it rises from
  and before the wing it lands on (V01 §5.1.3).
* **Crowns.** A **lobed crown**: `k = 5 + ⌊4u⌋` lobes, each a circular arc centred on a point of a jittered k-gon at 0.55
  of the crown radius (radial jitter ± 0.1), lobe radius 0.5 of the crown radius, their union's outline filled at the
  crown's shaded tone; a lit cap — the same construction at 0.65 scale — offset toward the light by 0.15 of the radius in
  the lit tone; with `details` on, two inner rings of short arcs. Two greens (the `tree` role's list) by §8.2's pick rule.
  Our construction (J-V1.27), stamped per crown size class like §8.10's library (so no crown is built at raster time).
  Order: large-tree **pins** in the pins slot under the buildings; **block trees** (Greenery instances) in the tree slot
  above them, smaller crowns first within a block (item 58 (d)).
* **Road surfaces** (§8.2's `surface(kind)`, by `Way.surface`, V01 §3.7.3; square faces by their residue's surface):
  `cobble` — the `road` fill with a stipple of small irregular polygons (5–7 sides, 0.35–0.5 m across) at 0.6 m spacing,
  stroked in `ink` at α 0.35, and a kerb line of dots at 1.2 m along each kerb; `paved` — setts: rows of 0.6 × 0.3 m
  rectangles across the way, staggered by half a sett row to row, stroked at α 0.3; `dirt` — the plain `road` fill;
  `planks` — bars across the way at 0.3 m, stroked at α 0.4. **One shared stamp tile per surface kind** (§8.10's stamp
  mechanism; a 12 m world-anchored tile generated once per sheet) is drawn as a clipped pattern fill of the way's body,
  never generated per way; the kerb dots are per way. The street stripe is the way's model width × `roads.widthRatio`
  (the `hatched` default 0.4 — a narrow stripe in a cream gap, provenance `ref:NG 1.2.2 road width ratio (code)`), read by
  the `full` and `outlined` modes. The style row `roads.mode`: `full` (default: fill and surface), `outlined` (a casing
  pass of 2 × the thin stroke, then fill and surface), `dashed` (the centreline dashed 9 : 6 × the stroke, no fill — the
  dash NG 1.2.2's, `ref:NG 1.2.2 road dash (code)`), `hidden`. NG 1.2.2's road modes and surfaces (plain, cobbles, tiles,
  outlined, dashed, hidden) are the reference (II.4); the stone shapes and spacings are ours.
* **Stair-stepped ticks** (§8.2's `steps`): across a stair-stepped way (V01 §3.6 (3)) every 1.2 m of ground length, a
  line at the thin stroke across the way's body, drawn from the district band.
* **`way.stair`, `retaining`, `raisedWay`** (§8.2's programs, item 110): in `hatched`, a retaining wall's shadow is drawn
  in slot 9, cast from the high side's level onto the low side along the sheet's light vector by the pins' prism law,
  its height the derived step (`stepProfile`, §2.7); a raised part's piers take slot 11 and its deck slot 19a (§8.2's
  slot 19a), its shadow by the prism law from the deck's height in the pass before slot 19a.
* **Pin symbols** (model pins and hood pins alike, sized by their model size): `well` — a round (by the render key's
  parity) or square stone rim in `wall` with an `ink` α 0.8 shaft; `pump` — a small square with a handle tick; `trough` —
  a thin rectangle in `wall` with a `water` inner strip; `fountain` — a stone disc with a `water` basin shaded toward its
  far side from the light; `large_tree` — a lobed crown at its size; `statue` — a plinth square with a figure dot;
  `monument` — a plinth with a slender triangle; `bandstand` — an octagon hatched like a roof; `cross` — a cross glyph on a
  plinth; `shrine` — a small square with a ridge hatch. Every symbol casts its prism shadow at its row's `heightM` (§8.4
  (h); a tree's shadow its crown's outline shifted), which S5 (e) reads.
* **Ground access symbols** (V01 §3.8.8; drawn from the model, sized by `access.<accessSymbolKind>M`; only accesses
  opening on a ground face outside every footprint draw one — a cellar stair, shaft, ladder, hatch or broken well where
  it opens in a yard, none where the building or its basement hosts it, the plan drawing its head). The symbol is
  `accessSymbolKind(a)`'s: the access's kind's, except a catacomb entrance (V01 §3.7.1's selection: a `stair` of a
  catacomb system), which draws `catacomb`: `stair` (a neighbourhood or lifeline stair on public ground, volume 4) — a
  rectangular rim in `wall` round four step ticks narrowing toward its lower end; `ladder` — two short rails with three
  rungs inside a square rim; `hatch` — a small square with a hinge line along one side and one diagonal; an arch vault's
  `door` — no symbol, the vault's infill being the base's drawing; `cellar_stair` — a small rectangle with three step
  ticks; `shaft` — a square rim in `wall` with an `ink` α 0.9 void; a broken-through `well` — the well rim with a dark
  shaft and a crack tick; `grating` — a small square crossed by three bars; `sinkhole` — an irregular ring of rubble
  stipple round a dark centre shaded away from the light; `mouth` — a dark arc opening in the slope's face with a rock
  fringe; `collapsed_shaft` — a rubble disc with a dark hollow; `ruin_entrance` — two short double-lined walls flanking a
  stair of step ticks (the ruin's masonry style, item 109 (g)); `catacomb` — a small pitched hood over a stair of step
  ticks with a cross tick. Its state form is §8.2's access row (V01 §3.8.8). They sit in the pins slot and cast no shadow
  but the `mouth`'s and the catacomb hood's.
* **Titles**: V01 §5.2.1.
=== END ===

=== REPLACE #### 5.1.3 Layer order at the neighbourhood and building bands (`hatched`) ===
#### 5.1.3 Layer order at the neighbourhood and building bands (`hatched`)

`StyleSheet.order` is per band (§8.2); `hatched`'s city and district bands take the shared list, and its neighbourhood
and building bands take this one, of which NG 1.2.2's order (greens → roads → shadows → pins, large-tree pins under the
buildings → buildings → chimneys → block trees → title) is a subsequence (§8.3's order parity):

| # | slot | reason |
|---|---|---|
| 1 | paper | background |
| 2 | water | — |
| 3 | ground.block (= paper) | the figure-ground contract (§8.5) |
| 4 | relief | off by default |
| 5 | greens, parks, green blocks, yard parts by role, courts | NG: greens first |
| 6 | way casings (`way.*`, pass 1) | — |
| 7 | way bodies, square faces and road surfaces (`way.*`, pass 2; `ground.square`) | NG: roads |
| 8 | river casing and body; shore marks | — |
| 8b | retaining walls (`retaining`; item 110 (a)) | under the shadows, over the river |
| 9 | prism shadows (each building's ground shadow, cast from its stack's envelope; walls, towers, pins, crowns; each retaining wall's shadow from its high side onto its low side) | NG: shadows after roads, before buildings |
| 10 | pins: model pins, hood pins and ground access symbols, large-tree pins among them (group `pins`) | NG: pins under the houses |
| 11 | landmark footprints; raised-way piers (in `wall`) | — |
| 12 | buildings: roof faces, outlines, hatching — each building's wings in stack order, with its upper tiers' shadows (below) | NG: houses |
| 13 | chimneys and roof detail | NG: props |
| 14 | piers and bridges | — |
| 15 | fields | — |
| 16 | block trees (Greenery instances; group `trees`) | NG: trees above the houses |
| 17 | boundary treatments | — |
| 18 | curtain walls | — |
| 19 | towers and gate blocks | — |
| 19a | raised decks (`raisedWay`), their shadows drawn in a pass just before this slot over everything below, roofs, walls, towers and gate blocks included | drawn above what it crosses, as §8.2's slot 19a, this order's one home, places it (item 110 (b)) |
| 20 | grid | — |
| 21–25 | scale bar, compass, labels, title and legend, live layers | as §8.2's list |

**Stacks in slot 12** (item 110 (c), (f)). A building's wings are drawn in stack order by `BaseWing.on` depth
(V02 §2.6; §8.6, items 227, 419) — a wing before the wings standing on it, ties by wing key (V02 §2.1's canonical order; item 216) — and
after each wing that carries others, the prism shadows of the wings standing on it are drawn clipped to that wing's roof,
in the shadow tone at the sheet's shadow alpha (slot 9's law), so each tier casts its own visible shadow on the tier below;
slot 9 keeps only the building's ground shadow, cast from its stack's envelope. A stair flight is drawn after the wing it
rises from and before the wing it lands on. The light pass (§8.4) runs over slots 1–20 as in every family. §8.2's
slot-resolution rule applies per band, so the loader refuses a `hatched` sheet whose neighbourhood list leaves a semantic
unplaced. **Group switches** (T12's `setStyle` of `StyleSheet.groups`, §8.2; NG F1): the hood pins, model pins and access
symbols belong to the `pins` group and block trees to the `trees` group, so the view bar hides them as Neighbourhood's
keys do; the access symbols obey the `pins` switch and the key's admission both.
=== END ===

