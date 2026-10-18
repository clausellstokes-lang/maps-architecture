# PART III — What a later village product needs from the base (one page; the hooks are concrete)

*In plain words.* The village generator is a separate product the owner stages beside the town's later milestones (V-M0 to
V-M4), with its own ladder (thorp → hamlet → village); V07 designs it at build depth. This page lists the hooks the base
carries for it and confirms nothing here stands in its way; the base does not pay for it.

**What it reuses unchanged** (V07 §3.2 (2)): the kernel and plat (§2–§3); the site model — descent-traced rivers with a carved
field, level-set ponds, the coast routine (§4.2) — and, for VG's own order, a `RiverStrategy` that lays a terrain-independent
spline course first (VG's live course runs through 6–7 control points laid before its terrain; COV-VG-WC2) and asks S1 to
carve the field to it, which S1's carve step already does; the sequential roster and lazy people (§10); the frontage-first plot
machinery, the one placement solver, the designation templates and the designation mutator (§4.7 S10b, S11; §10.2), whose
rows gain the village classes as their own `v.` keys (V07 §2.4; V11 §2.9), and the `Use` record with its relocation path
(§2.7, §4.11) — a village adds rows, not code; the hinterland presets incl. the VG sector look, orchards and commons (§4.9);
the `palisade` enceinte kind (§2.7); the display list, style sheets, the base's relief tier and the reserved `painterly` preset
slot (§8.2); the document, edits, exports and the API (§7, §11).

**The hooks it registers against (DEF-15; each built by V07; numbers kept):**
1. **Its registration and a density stage before its network (COV-VG-VN-002; item 202).** The product registers its
   `ProductDecl` in `StrategyRegistry.products` (§4.12). The pipeline is the topological order of declared stage I/O (§4.1,
   §4.12), so the village's density `StageDecl` feeds an input its network stage declares: VG computes its density before its
   roads, and the base's S6 order does not bind it. Its writer order and `ProductDecl.extraInputs` are §4.1's (V07 §3.0, §3.5).
2. **A palisade before its roads (MN-4, COV-VG-VN-003).** VG 1.6.9 (itch 19365073) builds its palisade before the roads — the
   hull of the populated points of a 10 × 10 lattice over the density field, cleaned and smoothed — and its road trackers
   consult it at every step, a per-type terrain weight plus terms for water, the destination's pull and the wall's push, gates
   falling where they meet it (reader-tier, for the village rung's calibration; provenance row D5, item 61; `profile-village.md`
   New-build addendum N2, P1). The village's `EnceinteStrategy` of kind `palisade` (§2.7) builds exactly that from its density
   stage, and its tracker-steered `NetworkStrategy` receives it through the `enceintes` input every network strategy takes
   (V07 §3.4).
3. **A tracker-steered network** (VG's roads are steered trackers, not A*; V07 §1b W15) with one through-road and partial
   driveways, and a "houses along ways" `FabricStrategy` with no block cutting.
4. **One district (COV-VG-WC4).** A village is modelled as one district of kind `village` (one quarter) covering the
   settlement; its blocks are the large faces between ways and its plots line the ways, so the containment
   invariant building ⊂ plot ⊂ block ⊂ district holds unchanged and nothing in §2–§4 needs a village exception.
5. **A size ladder below TOWN (D-33).** `LadderRouter` routes a population inside the village range (THORP [1, 80), HAMLET
   [80, 400), VILLAGE [400, 1 500) inhabitants; our own rows, calibratable, §1.1's with V07 §2.1's households, the THORP floor
   of 1 by J-V7.1) to the product, and a request of 1 500 or more is a base TOWN; the port consults
   `LadderRouter` at creation and at every absorb, and one document
   crosses the 1 500 boundary by §4.11's fold of the product at an epoch (item 322). VG itself spans ≈ 130–1 700 inhabitants;
   a village request's default is not a walled circle (walls are a rule keyed on rung); VG's independent tree stream is a keyed
   sub-stream (already the design); VG's spotlight vignette and grass-tuft look are `painterly` programs, and the hillshade,
   contour and hachure marks are the base's relief tier (§8.2, built at M2b), so the village adds none of them
   (COV-VG-VN-029).

**Its rung rows** carry the village's baselines as data: `frameLaw` `territory`, a hidden-share target of 0 and reach weights
of `open` only (§4.6), a `market` row of `min` 0 with at most one market sited by §4.2 S3 (12)'s score with the plaza kind
absent, the farm mode by plan form (§4.9; V07 §3.2 (3)), the band set's cuts computed per village from its own roster
shares over its one district (§4.5), `layers.islands = 'none'` (II.6), `layers.sewers.existence = 'never'` (II.7.1: no
network stage registers, a request's `toggles.sewers` reported as not applicable, the `drain` column read by nothing) and
`layers.undercity.existence = 'never'` (II.7.5). The furniture pins at its rungs are its own pin stage's (§4.7), a concealed
institution takes the `front` mode (§4.7), and §4.11's terrain and water conversions apply unchanged.

**The underground below TOWN (item 109 (j) (1)).** The village derives no sewer network, catacomb, quarry, vaults or
buried-town system (their rows of II.7.6 are gated to TOWN and above); caverns and ruins exist at every rung by the site
(V07 §3.16), unexcavated until an access exists, with scattered dwellings only after access; an author's
`addUndergroundAccess` (item 66) digs a private passage (II.7.6); a town shrunk into a village keeps its standing systems in
maintenance mode (V07 §3.12).

**A dossier below the town floor (item 81; J80).** A dossier whose population lies below 1 500 is refused by the port
(`E_RUNG_UNAVAILABLE`, naming the village product; §7.7 item 15) only while no village product is registered — the
dossier's population is a dossier fact a clamped town would contradict; with one registered, the port routes it through
`LadderRouter`, an absorb at population 0 routing to THORP and V07's desertion (V07 §3.12) while a creation below 1 stays
refused (SCOPE-C01; item 202). §1.1's clamp to a 1 500-person TOWN stays for a request that carries no dossier.

**Not-precluded checks** (the parity judge's 44 / 44; V07 §15): the strategy registry admits every strategy above; the level
model tolerates nearly empty L2 / L3; model time is near-linear in building count; every VG rendering row has a program or a
preset slot; terrain-and-water-as-one-picture is the base's own model. **What the base does not pay for:** tracker steering,
the palisade construction, VG's spotlight and painterly look, the palisade look, VG's grammar and its tag vocabulary.
