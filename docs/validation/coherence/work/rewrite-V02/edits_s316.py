E=[
("""### 3.16 Buildings on moles, jetties, quay platforms and bridge decks (item 110 (d); item 110 fold)""","""### 3.16 Buildings on moles, jetties, quay platforms and bridge decks (item 110 (d))"""),
("""**No deck plot on a
   ford, a drawbridge or an unbuilt deck** (second revision, V2C-66 (2)): a `Bridge` of kind `ford` or `draw`, or one whose
   `deckCm` is not yet set (§2.7: optional until S7 builds the bridge), offers none (X28, the coherence pass's deck-plot
   rule). **A quay built on the bank is ground** (V2C-66 (1)):""","""**No deck plot on a
   ford, a drawbridge or an unbuilt deck**: a `Bridge` of kind `ford` or `draw`, or one whose `deckCm` is not yet set
   (§2.7: optional until S7 builds the bridge), offers none (item 246). **A quay built on the bank is ground**:"""),
("""S11 copies `DeckContext.landmark` from
   the deck-plot record's `landmark` flag (a mole's head and mid-mole slots, and a bridge's mid-span slot where the
   coherence pass adopts one; X28 — the producer, V2C-66 (6)). **The lighthouse islet is land** (V2C-66 (3)):""","""S11 copies `DeckContext.landmark` from
   the deck-plot record's `landmark` flag (§2.7 *Deck plots*, item 246: a mole's head and mid-mole slots, and on a
   bridge whose deck span reaches V11's `deck.landmarks/bridgeMid/minSpanM` one mid-span slot, offered to a tower or fort
   class only). **The lighthouse islet is land**:"""),
("""at the
   plot's band and deck kind (V11's `deck` row, X16; until it lands `deck.fallbackM2`, [20, 60] m²) ×
   `footprintShare_i ÷ count_i × buildingScale` — **per slot**, so a compound's slots share the plot's budget (second
   revision, V2C-66 (4)) — **replacing**""","""at the
   plot's band and deck kind (V11's `deck` row, X16) × `footprintShare_i ÷ count_i × buildingScale` — **per slot**, so
   a compound's slots share the plot's budget — **replacing**"""),
("""M11 clamps every wing's floors to at most `maxFloors` (fallback `deck.fallbackFloors`, 2) — the owner's
   "small, light" (J-V2.67) — and the mutator's W5 clamps a kept wing's floors the same way (V02 §3.9).""","""M11 clamps every wing's floors to at most `maxFloors` — the owner's "small, light" (J-V2.67) — and the mutator's W5
   clamps a kept wing's floors the same way (V02 §3.9). **The stand-ins (X-V11-7):** the constants `deck.fallbackM2` and
   `deck.fallbackFloors` (V02 §3.10.9) are read in place of the band and `maxFloors` only while V11's `deck` table is not
   registered (a build-order stand-in); a document whose pinned `deck` table resolves off never reads them, and a deck plot
   exists only where V11's `deck.offer` drew yes, so a deck plot with no `deck` row cannot arise at run time."""),
("""**No crypt-bound use ever stands on a deck** (second revision, V2C-58; J-V2.68
   amended): S10b never places on a deck plot a use whose class's `crypt` column is `always`, **or a use to which a dossier
   crypt record binds** (V04's C4-05) — V11's `deckOk` is read **per use**, false for either (X16 extended); a
   hand placement (T6) of such a use on a deck plot bends to the nearest land plot at the deck's landward end, named (the
   bend of V9C-58 (2));""","""**No crypt-bound use ever stands on a deck** (J-V2.68): S10b never places on a deck plot a use whose class's `crypt`
   column is `always`, **or a use to which a dossier crypt record binds** (V04 §2.3a) — V11's `deckOk` is read **per
   use**, false for either (X16); a hand placement (T6) of such a use on a deck plot bends to the nearest land plot at the
   deck's landward end, named (T6's landward bend, V09);"""),
("""a row built against the terrace wall — the ordinary terraced street; second revision, V2C-57). **The datum reads its own
  terrace** (item 370, item 231): S10 and S11's levelling is a platform datum, never a
  write to the raster (V05's item 309), so every datum sample is `levelledGroundCm(doc, key, p)` — the levelled
  plot's, block's or ward's platform, else the unlevelled raster — and a wing-vertex sample within `terrace.wallBandCm`
  (250 cm, one refined raster cell) of a `RetainingWall` chain is replaced by the sample at the point moved along the
  wall's normal, toward the side that holds the wing's centroid, until it lies `terrace.wallBandCm` from the wall's line —
  so `levelledGroundCm` reads the wing's own terrace, never the platform across the wall, and a house is neither lifted
  toward the terrace above nor sunk toward the one below (T-V2-51). A walk-out basement where the plot's low edge is a
  wall is V03's item 242 (a) (§2.6's basement rule reading the step there; its door on that side; reconciliation
  round 3, S23R2-07). V02 adds no wall rule (J-V2.72).""","""a row built against the terrace wall — the ordinary terraced street). **The datum reads its own terrace** by §2.6's
  datum rule and its wall-side sample (items 370, 231; `levelledGroundCm`, item 309): a house is neither lifted toward
  the terrace above nor sunk toward the one below (T-V2-51). A walk-out basement where the plot's low edge is a wall is
  item 242 (V03 §3.7.1: §2.6's basement rule reading the step there; its door on that side). V02 adds no wall rule
  (J-V2.72)."""),
("""a removal holding through regeneration (item 110 (b) as revised ~23:40).""","""a removal holding through regeneration (item 110 (b))."""),
("""(V01's V01 §3.17.3 (2): the strip is a hole in the faces it crosses)
  takes the base's least-disruption fates, its plot removed by V01's V01 §3.17.4 add path**""","""(V01 §3.17.3 (2): the strip is a hole in the faces it crosses)
  takes the base's least-disruption fates, its plot removed by V01 §3.17.4's add path**"""),
("""stand over the same open ground (reconciliation round 1, S23-01, ST-08; J-V2.89: the second
  revision's exception for buildings below the deck's underside less `raised.clearCm` is withdrawn, because item 110 (b)
  keeps the spaces between the piers open or vaulted). The least soffit over a crossed way is V11's
  `raisedWays.structure.clearanceCm`, which V01 reads; V02 keeps no clearance of its own.""","""stand over the same open ground (J-V2.89: no building stays under the deck, because item 110 (b) keeps the spaces
  between the piers open or vaulted). The least soffit over a crossed way is item 244's clearance rule — the way's held
  `clearanceCm` first, else V11's `raisedWays.structure.clearanceCm` for the crossed class — which V01 §3.17.3 (3) cites
  identically (V02-XCONF-1, V01-ICONF-4); V02 keeps no clearance of its own."""),
("""is clamped under the vault's soffit by M11's `vaultClamp` (V2C-67 (2); X29).""","""is clamped under the vault's soffit by M11's `vaultClamp` (X29)."""),
]
