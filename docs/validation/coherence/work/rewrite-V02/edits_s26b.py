E=[
("""// the construction's contract (V02 §3.15.1; split by the second revision, J-V2.80) — all four exported by @plat/plots""","""// the construction's contract (V02 §3.15.1; J-V2.80) — all five exported by @plat/plots"""),
("""  // second revision: the `ovalCourt` branch""","""  // the `ovalCourt` branch"""),
("""                                              // BaseWing.corners, V2C-64 (3)) or a regular ring — and not laid""","""                                              // BaseWing.corners) or a regular ring — and not laid"""),
("""interface TierFailure { kind: 'noSecondTier' | 'check'; step: 'ST3' | 'ST6'; detail: string }   // second revision: ST3's forms exhausted, or an ST6 check failed
// BuildingInput (§2.6), as amended by item 305: one field added
interface DeckContext {                       // written by S11 from the plot's deck record (item 110 (d), the base's deck plots); absent on every other plot
  host: Id;                                   // the Bridge (§2.7) or the pier / quay way (§4.8) whose deck carries the plot
  kind: 'bridge' | 'pier' | 'mole' | 'quay';  // item 110 (d)'s hosts (a jetty is a pier); a raised way's deck carries no plot (J-V2.71)
  surfaceCm: Cm | null;                       // the deck's walking surface in terrain cm: Bridge.deckCm, or the pier's, mole's or quay's deck height
                                              // (§4.8) — read by the datum step (item 370). null exactly for a quay platform built on the bank
                                              // (fill behind a quay wall): that is ground — the terrain datum, the ordinary basement gate and a
                                              // dig floor — while `kind 'quay'` keeps the @deck rows and the deck budget (second revision, V2C-66 (1)).
                                              // A Bridge of kind 'ford' or 'draw', or with no deckCm yet, offers no deck plot (X28), so no
                                              // DeckContext names one
  landmark: boolean;                          // a placed landmark (a mole-head or mid-mole tower or fort): its class's own rows, no deck budget;
                                              // copied by S11 from the deck-plot record's `landmark` flag (X28, the coherence pass; V2C-66 (6))
}
// the deck budget V02 reads — V11's table `deck`, keyed by deck kind × band (X16); V02 declares no row of its own""",
"""interface TierFailure { kind: 'noSecondTier' | 'check'; step: 'ST3' | 'ST6'; detail: string }   // ST3's forms exhausted, or an ST6 check failed
// the deck budget V02 reads — V11's table `deck`, keyed by deck kind × band (V02 X16); V02 declares no row of its own"""),
("""(V05's item 309; item 370, item 231), never the raster's TerrainSampler */): void;
  // second revision (J-V2.81): the building-level datum pass for a building with a wing standing on another — (1) the ground
  // wings by §2.6's terrain rule as item 370 words it (every sample by `ground`) (a deck's surface, a kept user base, item 231's wall-side sample, the crypt lift, the half
  // cellar's raise — item 226, reconciliation round 1, S23-10); (2) every wing with""",
"""(item 309; items 370, 231), never the raster's TerrainSampler */): void;
  // J-V2.81: the building-level datum pass for a building with a wing standing on another — (1) the ground wings by §2.6's
  // terrain rule (item 370; every sample by `ground`), with a deck's surface, a kept user base, item 231's wall-side sample,
  // the crypt lift and the half cellar's raise (item 226); (2) every wing with"""),
]
