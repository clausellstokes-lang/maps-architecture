P=[
("""interface ExcavationRecord {                 // one per system the excavation reading covers (cavern, ruin, a buried former
  system: Id;                                // settlement), in the entities block; written only by U-ACCESS (g)
  reached: Id[] }                            // the galleries and chambers that have stood in an `accessible` cluster, sorted by
                                             // address; an entry is added in the commit whose reading first makes its element's
                                             // cluster accessible and is removed only with its element (tombstoned or not carried
                                             // over by a regeneration, §6.3) or by the undo of the commit that added it""",
"""interface ExcavationRecord {                 // one per system the excavation reading covers (cavern, ruin, a buried former
  system: Id;                                // settlement), in the entities block; written only by U-ACCESS (g)
  reached: Id[];                             // the galleries and chambers that have stood in an `accessible` cluster, sorted by
                                             // address; an entry is added in the commit whose reading first makes its element's
                                             // cluster accessible and is removed only with its element (tombstoned or not carried
                                             // over by a regeneration, §6.3) or by the undo of the commit that added it
  lostAt: { element: Id; event: number }[] } // each element of a `lost` cluster with the `seq` of the commit whose reading
                                             // turned its cluster lost (sorted by element address); cleared when the cluster is
                                             // accessible again; read by V09's panel ("its way in closed in ⟨year⟩") and V10"""),
("""age, before the history's factors; a Roman-to-medieval town street rose on the order of 1–2 m per few centuries),
`formerRiseMaxCm` 900 (V04 §3.5.5 (b)).""",
"""age, before the history's burial factor; a Roman-to-medieval town street rose on the order of 1–2 m per few centuries),
`formerRiseMinCm` 250 (the least rise a former fabric is buried by: the destruction's debris over it, so its rooms keep
200 cm of headroom), `formerRiseMaxCm` 900 (V04 §3.5.5 (b))."""),
("""`Chamber.columns` is a view, exported
as `ruinColumns(chamberId)` (V04 §3.5.0a (5b)); an arch vault's, a street vault's and a bridge vault's open faces are the
derived reading `gradeFaces(chamberId)` (V04 §3.5.4 (f)).""",
"""`Chamber.columns` is a view, exported
as `ruinColumns(chamberId)` (V04 §3.5.0a (5b)); an arch vault's grade faces are the derived reading
`gradeFaces(chamberId)` (V04 §3.5.4 (f))."""),
("""| `ExcavationRecord.reached` | U-ACCESS (g), in the commit whose reading first makes an element's cluster `accessible` — generation's T2b, a replay epoch's `under.access`, a live epoch's, an edit's | the excavation reading (`lost` against `unexcavated`), V10 |""",
"""| `ExcavationRecord.reached`, `.lostAt` | U-ACCESS (g): `reached` in the commit whose reading first makes an element's cluster `accessible`, `lostAt` in the commit whose reading turns it `lost` (cleared when it is accessible again) — generation's T2b, a replay epoch's `under.access`, a live epoch's, an edit's | the excavation reading (`lost` against `unexcavated`), V09's legend and panel, V10 |"""),
]
