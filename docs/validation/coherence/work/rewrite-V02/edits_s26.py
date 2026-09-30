E=[
("""### 2.6 Stacked tiers and deck buildings — the records (item 110 (c), (d); item 110 fold)

Item 110 adds no entity kind. A tier, a shrine and a stair are base wings — sub-records of their `Building` (the base's
sub-record rule) — whose new fields say what they stand on and whether they are solid; a building on a deck is an
ordinary building whose `BuildingInput` names its deck. Units as V02 §2.

```ts
// BaseWing (§2.6), as amended by item 227: two fields added
interface BaseWingStackFields {
  on?: number;    // persisted; the key of the wing this wing stands on — its floor is that wing's deck level (deckLevel below):
                  // tier k ≥ 1 names tier k − 1, the shrine the top tier, stair k ≥ 1 the tier on whose terrace its foot stands;
                  // absent: the wing stands on the ground (every wing of every family but `stepped`). Written by the massing
                  // (V02 §3.15 ST7), the `tiers` op (V02 §4.6) and the mutator's stepped rows (V02 §3.15.5); never re-pointed after
                  // minting except by those writers; read by deriveBase (item 370), storeyRange, the capacity (item 371), the
                  // roofscape's occlusion and order (V02 §5.6), the carry check (item 333), the exports and V03 (X18)
  solid?: true;   // persisted; a solid mass with no interior — a stepped pyramid's rubble tier, every stair: Heights.floors 0 and
                  // its eaveCm its top above its baseCm; no storey, room, dormer, porch or capacity. Written by the massing (ST4,
                  // ST5; the `ovalCourt` seating ring, M5), the `tiers` op and the mutator (cleared when `stepped → single` keeps a solid tier 0 as a storeyed range,
                  // V02 §3.15.5); read by storeyRange, the capacity, M11, the composer, V03 (no rooms), the exports
}
// MassingRef (V02 §2.1) gains one field (item 217's MassingRef)
interface MassingRefStackFields {
  stack?: {                                   // persisted; present exactly when MassingRef.family is 'stepped'
    shape: 'rect' | 'round' | 'octagon';      // the tiers' plan shape (ST1)
    stairs: 'axial' | 'flights' | 'internal' | 'none';   // the stair form laid — after ST3's fallback, so it may differ from the row's;
                                              // 'none' (second revision, V2C-47 (2)): a sealed stack, lawful only where tier 0 is solid,
                                              // never a row value, reached only by an edit's bend (V02 §4.6)
    lowerRoof: 'flat' | 'pent';               // every tier's roof but the top's, as laid (a tier's own roof may differ after a setAttr, V02 §4.6)
    top: 'flat' | 'shrine' | 'roofed';        // the top tier's form
    insetCm: Cm;                              // the drawn step d (ST1), which the `tiers` op re-uses
    grade: number;                            // second revision (V2C-49 (5)): the drawn stair grade (rise ÷ run), which the `tiers` op re-uses
    truncated: number;                        // tiers drawn but not laid for want of room (ST3), reported
  };
}
// CompositionRow (V02 §2.3) gains one cell group (composition.json; item 110 (c)'s "composition rows (V02)")
interface TierCells {""",
"""### 2.6 Stacked tiers and deck buildings — the records (item 110 (c), (d))

Item 110 adds no entity kind. A tier, a shrine and a stair are base wings whose fields say what they stand on and whether
they are solid; a building on a deck is an ordinary building whose `BuildingInput` names its deck. `BaseWing.on`,
`BaseWing.solid`, `MassingRef.stack` and `DeckContext` are declared at §2.6 (items 217, 227, 305); their meanings, writers
and readers:

| field | meaning | written by | read by |
|---|---|---|---|
| `BaseWing.on` | the key of the wing this wing stands on — its floor is that wing's `deckLevel`: tier k ≥ 1 names tier k − 1, the shrine the top tier, stair k ≥ 1 the tier on whose terrace its foot stands; absent: on the ground (every wing of every family but `stepped`) | the massing (V02 §3.15 ST7), the `tiers` op (V02 §4.6), the mutator's stepped rows (V02 §3.15.5); never re-pointed after minting except by those writers | `deriveBase` and `rebaseStack` (item 370), `storeyRange`, the capacity (item 371), the roofscape's occlusion and order (V02 §5.6), the carry check (item 333), the exports, V03's plans of tiers (V02 X18) |
| `BaseWing.solid` | a solid mass with no interior — a stepped pyramid's rubble tier, every stair, an `ovalCourt`'s seating ring: `Heights.floors` 0 and its `eaveCm` its top above its `baseCm`; no storey, room, dormer, porch or capacity | the massing (ST4, ST5; M5's seating ring), the `tiers` op, the mutator (cleared when `stepped → single` keeps a solid tier 0 as a storeyed range, V02 §3.15.5) | `storeyRange`, the capacity, M11, the composer, V03 (no rooms), the exports |
| `MassingRef.stack.shape` | the tiers' plan shape (ST1) | ST7 through `massStepped`; every `tiers` op, bend and stepped mutation | the `tiers` op's re-lay, the why provider, the exports |
| `.stairs` | the stair form laid — after ST3's fallback, so it may differ from the row's; `none` is a sealed stack, lawful only where tier 0 is solid, never a row value, reached only by an edit's bend (V02 §4.6) | as `shape` | ST3, ST5, ST6, `stairChain`, `landingSide`, the entrance hint, V03's `W_TIER_UNREACHED` |
| `.lowerRoof` | every tier's roof but the top's, as laid (a tier's own roof may differ after a `setAttr`, V02 §4.6) | as `shape` | the `tiers` op's re-lay |
| `.top` | the top tier's form | as `shape` | the `tiers` op, the why provider |
| `.insetCm` | the drawn step d (ST1), which the `tiers` op re-uses | as `shape` | the `tiers` op |
| `.grade` | the drawn stair grade (rise ÷ run), which the `tiers` op re-uses | as `shape`; `drawTiers` | the `tiers` op's re-lay |
| `.truncated` | tiers drawn but not laid for want of room (ST3) | as `shape` | the report (`tiersTruncated`), T-V2-46 |
| `DeckContext` | the plot's deck (§2.6): its host, kind (a jetty is a pier; a raised way's deck carries no plot, J-V2.71), `surfaceCm` (`null` exactly for a quay platform built on the bank, which is ground — the terrain datum, the ordinary basement gate and a dig floor — while `kind 'quay'` keeps the `@deck` rows and the deck budget) and `landmark` (a mole-head or mid-mole tower or fort: its class's own rows, no deck budget); a `Bridge` of kind `ford` or `draw`, or with no `deckCm`, offers no deck plot (item 246), so no `DeckContext` names one | S11 at each call, from the plot's deck record (`Plot.deck`, its `landmark` flag) | M1, M10, M11, the datum (item 370), the basement gate (item 305), the dig floor |

```ts
interface TierCells {"""),
("""  grade: number;                              // second revision: drawn in""","""  grade: number;                              // drawn in"""),
("""// at most the constant stairGradeMax (1.3)""","""// at most the constant stairGradeMax"""),
("""  heights?: { storeyGroundCm: Cm; storeyUpperCm: Cm };   // second revision (V2C-48 (4)): read only""","""  heights?: { storeyGroundCm: Cm; storeyUpperCm: Cm };   // read only"""),
]
