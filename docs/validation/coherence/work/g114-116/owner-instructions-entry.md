- (2026-09-30 ~00:48) "one thing i wanted to add, at generation time the first generation, teh economy slider determines the
  cieling prosperity for the entire map" — OWNER RULE item 114 in docs/AMENDMENTS-2026-09-28g.md (J126): SettlementForge's
  economy slider (`priorityEconomy`, 0–100, default 50) sets a map-wide prosperity ceiling — the highest prosperity band any
  household, plot, district or building may take — read once at the first generation and recorded; by the program's reading
  (vetoable, J122): standalone, T1's wealth slider renamed "Economy"; no prosperity ceiling at 50 and above (the default
  town unchanged), `modest` at 0; the dossier's own prosperity word always keeps its band; the prosperity values themselves
  are untouched; after the first generation the founding prosperity ceiling carries and lived wealth may lift it.
- (2026-09-30 ~00:54, replaced ~00:55) "and only high magic on the slider allows for floating islands in the initial
  generation." / "actually floating islands has to have both high magic and high economy" — OWNER RULE item 115 in
  docs/AMENDMENTS-2026-09-28g.md (J127), the second message replacing the first: at the first generation floating islands
  need both high magic on the magic slider and a high economy; by the program's reading (vetoable, J122; the magic by its
  correction of 2026-09-30): "high" is 75 or more on each slider, SettlementForge's own word `high` also counts, never in a
  world without magic (standalone, a new Magic slider with a "No magic in this world" switch, on by default), beside the
  islands setting and the CITY/METROPOLIS rung; the gate binds every rule-driven rising, never removes a standing island,
  and never refuses an author's own island except in a world the dossier states magic-less.
- (2026-09-30 ~00:56) "bundle these into the rewrite phase" — items 114 and 115 applied IN the coherence pass's Rewrite
  phase by every unit they name: the units whose rewrite had landed in a late rewrite seat, every other unit in its main
  rewrite (workflows/18-coherence.js `lateItems`, `lateUnits`, `lateRouting`).
- (2026-09-30 ~01:08, refined ~01:10) "oh and material for buildings is determined by terrain, resoucres, and trade. paired
  with prosperity. Think about it. if you are in a river nearby a forrest for timber but no quarry, then most building
  material is going to be wood based. That is not to say that they can't have stone buildings, that would come from trade
  and be reserved for teh very rich as they are exotic and expensive to transport. Pairing all of this with neighborhood
  prosperity, if a town has both a quarry and timber, the richer areas will have buidlings mostly made out of the more
  expensive material stone, the middling areas will have buildings mixed btween wood and stone or individual buildings that
  is a combination of the two. Expand this to all relevant pieces. What do you think?" / "also to say that material not
  native requires trade which means isoalted settlements cant have non nattive materials or grow to have them until and
  unless they trade specifcially with another settlement that has that material." — OWNER RULE item 116 in
  docs/AMENDMENTS-2026-09-28g.md (J128), the owner's rule as the program reads it (vetoable, J122): each building material
  family is native (from the settlement's own land, a dossier fact that it works it, or its ruins), traded (only through a
  named partner that supplies it, priced by route, sea cheapest) or unavailable; the material a building takes is the
  dearest its builder can pay within its neighbourhood's bounds, the middling mixing the two families where their prices
  meet, down to single buildings of two materials (a stone ground storey under timber); a town item 114 caps at `prosperous`
  or lower (an Economy of 33 or less) has no very rich, so none of its houses is of river- or road-borne stone (sea-borne
  only from a near partner); every piece follows — roofs, walls and gates, bridges, harbour works, retaining walls, raised
  ways, paving, linings, quarry voids, islands, the village, interiors, institutions, Works, fire and flood — over epochs as
  well as at generation; item 19's FTG material default and its roof colour by band are superseded as the default (item 19's
  texture-and-colour rule kept), the parity presets and older documents keeping the old model.
- (2026-09-30 ~01:10) "bundle all this with g114-115" — items 114, 115 and 116 filed together after one cross-consistency
  check (docs/validation/coherence/work/g114-116/consistency-report.md) and its verification
  (docs/validation/coherence/work/g114-116/fix-notes.md), with one routing list
  (docs/validation/coherence/work/g114-116/routing.json) and one canon ruling (docs/validation/coherence/canon.md, ruling of
  2026-09-30), applied together in the coherence pass's Rewrite phase (`lateItems` 114-116): late seats for the base model,
  pipeline, determinism and rendering and for V03 and V04, the kernel no part, every other unit in its main rewrite.
- (2026-09-30 ~01:35) "note that we are reworking trade as we speak. but for now its your recomendation" — the program's
  recommendation for item 116 adopted (docs/validation/coherence/work/g116/read-owner-decision.md): every neighbour
  SettlementForge names counts as a trade partner (a hostile or suppressed one excepted, as SettlementForge itself trades
  with none — the program's narrowing, vetoable), supplying the materials its named exports, goods or resources show; a
  settlement with no named neighbour is native-only whatever its access; a stand-alone map's partners are its recipe's own
  list, empty by default; trade is read through one port-side partner record, which each SettlementForge line's adapter
  fills, so the material rule never reads SettlementForge's trade fields directly (J121).
