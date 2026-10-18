# PART III — What a later village product needs from the base (one page; the hooks are concrete)

*In plain words.* The village generator is a separate product the owner stages after the town, with its own ladder (thorp →
hamlet → village). This page lists what it would take from the base, the hooks the base carries for it now, and confirms
nothing here stands in its way; the base does not pay for it.

**What it would reuse unchanged:** the kernel and plat (§2–§3); the site model — descent-traced rivers with a carved field,
level-set ponds, the coast routine (§4.2) — and, for VG's own order, a `RiverStrategy` that lays a terrain-independent
spline course first (VG's live course runs through 6–7 control points laid before its terrain; COV-VG-WC2) and asks S1 to
carve the field to it, which S1's carve step already does; the sequential roster and lazy people (§10); the frontage-first
plot machinery and the site-plan tables, which already contain cottage, farmstead and detached-in-yard classes (§4.7); the
hinterland presets incl. the VG sector look, orchards and commons (§4.9); the `palisade` enceinte kind (§2.7); the display
list, style sheets, the base's relief tier (hillshade, contour and hachure marks) and the reserved `painterly` preset slot
(§8.2); the document, edits, exports and the API (§7, §11).

**What it would add behind hooks the base now carries (DEF-15):**
1. **A density stage before its network (COV-VG-VN-002).** The pipeline is the topological order of declared stage I/O
   (§4.1, §4.12), so a `VillageStrategy` registers a density `StageDecl` whose output the network stage declares as an input;
   VG computes its density before its roads, and the base's S6 order does not bind it.
2. **A palisade before its roads (MN-4, COV-VG-VN-003).** On the live VG build 19365073 the palisade is built before the
   roads — the hull of the populated points of a 10 × 10 lattice over the density field, cleaned and smoothed — and the road
   trackers consult it at every step, gates falling where they meet it (`profile-village.md` New-build addendum N2, P1). The
   village registers an `EnceinteStrategy` that builds exactly that from its density stage, and its tracker-steered
   `NetworkStrategy` receives the result through the `enceintes` input every network strategy takes (§4.12).
3. **A tracker-steered network** (VG's roads are steered trackers, not A\* — `_critic-vg-ng.md`) with one through-road and
   partial driveways, and a **"houses along ways" `FabricStrategy`** with no block cutting.
4. **One district (COV-VG-WC4).** A village is modelled as **one district** of kind `village` (one quarter) covering the
   settlement; its blocks are the large faces between ways and its plots line the ways, so the containment invariant building
   ⊂ plot ⊂ block ⊂ district holds unchanged and nothing in §2–§4 needs a village exception.
5. **A size ladder below TOWN.** Rung rows THORP ≈ 20–80, HAMLET ≈ 80–400, VILLAGE ≈ 400 up to (not including) 1 500
   inhabitants (our own rows, calibratable; VG spans ≈ 130–1 700); a request of 1 500 or more is a base TOWN and below 1 500
   `LadderRouter` routes to the village product (§1.1, D-33). A village request's default is not a walled circle (walls are a
   rule keyed on rung); VG's independent tree stream is a keyed sub-stream (already the design); VG's spotlight vignette and
   grass-tuft look are `painterly` programs — the hillshade, contour and hachure marks are the base's relief tier (§8.2), built
   at M2b (§16), so the village adds none of them (COV-VG-VN-029).

**Not-precluded checks** (the parity judge's 44 / 44): the strategy registry admits every strategy above; the level model
tolerates nearly empty L2 / L3; model time is near-linear in building count; every VG rendering row has a program or a
preset slot; terrain-and-water-as-one-picture is the base's own model. **What the base does not pay for:** tracker steering,
the palisade construction, VG's spotlight and painterly look, the palisade look, VG's grammar and its tag vocabulary.
