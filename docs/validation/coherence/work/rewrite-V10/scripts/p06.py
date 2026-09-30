import sys; sys.path.insert(0,'scripts')
from ed import Ed
e=Ed('parts/06-s2-13-15.md')
e.R("""### 2.13 The reader's and the oracle's typed results (item 468 – item 297, item 271)

These are base types — any client, host or clerk reads them — declared here once and placed in the base by the BCRs.""",
"""### 2.13 The reader's and the oracle's typed results (items 468, 311, 270, 297 and 271)

These are base types — any client, host or clerk reads them — declared here once; §11.2 and §4.3 cite this section for
them (items 468, 311, 270, 297), and `PlacementOrder` is §2.8's (item 271).""")
e.R("""  counts: { plots: number; buildings: number; households: number; declared: number; clerkProposed: number };""",
"""  history?: { id: Id /* the HistoryRecord (§2.7): why on it answers the story (V10 §3.9b) */; fromYearsAgo: number /* the first replay epoch's start */;
    epochs: number; epochYears: number /* the first epoch's span (a bent length included, V06 §3.20.1 (4)) */;
    peak?: { rung: string; population?: number /* absent when symbolic: no figure the clerk may say (V10 §3.9b) */; symbolic: boolean };
    refounded: { yearsAgo: number; cause: string }[]; buried: number /* the buried systems the key admits (an unexcavated one absent below secret) */ };
                                              // item 113: from HistoryRecord (V06 §3.20.6); absent when no replay ran (no record)
  counts: { plots: number; buildings: number; households: number; declared: number; clerkProposed: number };""")
e.R("""interface RuleAnswer { table: string; key: string; says?: string; provenance: string; extension: boolean; readers: string[] /* stages and components */;
  citing: { count: number; ids: Id[] /* ≤ 16, key-filtered: an entity whose purpose the key withholds is absent and uncounted */ } }""",
"""interface RuleAnswer { table: string; key: string; says?: string; provenance: string; extension: boolean; readers: string[] /* stages and components */;
  citing: { count: number; ids: Id[] /* ≤ 16, key-filtered: an entity whose purpose the key withholds is absent and uncounted */ };
  evidence?: { status: string /* the register's plain word for the cell's entry: provisional, confirmed, fallback applied, not achieved, owner-set, fixed; 'owner' for a stamped cell */;
    lines: string[] /* one plain line per cited evidence id */; ids: string[] /* the evidence ids: runs, panels, baseline rows (V12 §2.10) */ } /* a calibrated cell: read from the shipped dist/evidence.json (V12 §4.4); absent for a cell with no entry */ }""")
e.R("""  sections?: WhySection[];                                                     // C10-11: what a volume's provider knows beyond these fields (V10 §3.9)""",
"""  sections?: WhySection[];                                                     // what a volume's provider knows beyond these fields (V10 §3.9)""")
e.R("""type WhySection = { kind: string /* registered with its provider: 'underground', 'crypt', 'raised', 'massing', 'plan', 'fabric', 'island', 'move' … (V10 §3.9) */;""",
"""type WhySection = { kind: string /* registered with its provider: exactly V10 §3.9's owed sections and this volume's 'raised' and 'past' */;""")
e.R("""  terms: { driver: string /* a driver of §4.5's field, 'daylight' (item 102) among them, or 'character', 'brush', 'epoch', 'chance' */; delta: number;
    sources?: { caster: Id | 'terrain' | 'walls' | 'buildings'; samples: number }[] /* daylight: V05 §4.5's per-island attribution */ }[];""",
"""  terms: { driver: string /* a driver of §4.5's field, 'daylight' (item 102, × item 111 (c)'s climate cell) and 'water' (item 111 (b)) among them, or 'character', 'brush', 'epoch', 'chance' */; delta: number;
    sources?: { caster: Id | 'terrain' | 'walls' | 'buildings'; samples: number }[] /* daylight: V05 §4.5's per-island attribution */;
    water?: { distM: number /* to S3 (6)'s nearest reliable water */; source: Id /* the river, lake, oasis, spring or well-yield ground it measured to */; flow?: number /* a spring's WaterBody.spring.flow */ } /* water: V09's why.driver.water line reads it */;
    climate?: number /* daylight: the climate row's sunlight cell (1, 0 or negative) */ }[];""")
e.R("""// @plat/model — the placement order S10b records (item 271), on the DerivationRecord of the plot a use stands on
type PlacementOrder = { use: Id; seq: number /* the event whose S10b run placed it; 0 at generation */; k: number /* its index in that run's order */; pass: 1 | 2 /* 2: moved by item 105 (f)'s relaxation pass */ };
```""","""// PlacementOrder, the order S10b records on the DerivationRecord of the plot a use stands on, is §2.8's (item 271)
```""")
e.R("""V01's providers name their pushes in the pre-revision words (`SUNLIGHT`, `EMITS`, `SENSITIVE`); they read as `sun`,
`nuisance` and `nuisance`. Each family's plain words are `clerk.content.familyWords`' catalogue keys.""",
"""Every provider names its pulls by these families — V01's siting pushes as `sun` and `nuisance` (V01 §4.5). Each family's
plain words are `clerk.content.familyWords`' catalogue keys.""")
e.R("""| `ClerkTranscript` | each turn; its `key` at opening and at each raised key change, a lowered one ending it (V10 §2.7) | the store (gated by `admitsAll`, V10 §2.3), the export, the harness | memory; device store only with keep history (V10 §3.15) | — | the user deletes entries or all | versions 1 and 2 read as `key: 'secret'` (J-SS2.5); never rewritten |""",
"""| `ClerkTranscript` | each turn; its `key` at opening and at each raised key change, a lowered one ending it (V10 §2.7) | the store (gated by `admitsAll`, V10 §2.3), the export, the harness | memory; device store only with keep history (V10 §3.15) | — | the user deletes entries or all | versions 1 and 2 read as `key: 'secret'`; never rewritten |""")
e.R("""| `RaisedOutcome`, `WhyAnswer.removed`, the `raised` rows, `MapBrief.raised`, `.terraces`, `.decks` | each query | the clerk, V09, V08 | never (derived) | recomputed at every read | — | a document without item 110's records answers with empty lists, and its brief renders byte-identically (T-V10-43) |""",
"""| `RaisedOutcome`, `WhyAnswer.removed`, the `raised` rows, `MapBrief.raised`, `.terraces`, `.decks` | each query | the clerk, V09, V08 | never (derived) | recomputed at every read | — | a document without item 110's records answers with empty lists, and its brief renders byte-identically (T-V10-43) |
| `MapBrief.history`, the `past` rows, the water rows, `FieldDrivers`' water and climate entries, `RuleAnswer.evidence` | each query | the clerk, V09's why card, a host clerk (projected) | never (derived from `HistoryRecord`, the log's replay epochs, the oasis's records, the field and the shipped evidence file) | recomputed at every read; a Regenerate or New random re-runs the replay and rewrites the record (V06 §3.20.6) | — | a document without a history record answers `history` absent and no `past` rows, and one without an oasis no water rows; its brief renders byte-identically (T-V10-45, T-V10-46) |""")
e.save()
