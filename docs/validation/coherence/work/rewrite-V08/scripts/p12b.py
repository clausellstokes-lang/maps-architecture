import sys; sys.path.insert(0,'scripts')
from ed import Ed
e=Ed('parts/12-s3-6-14.md')
e.R("names catalogue keys (V08 §13 X12);","names catalogue keys (V08 §4.6, §5.1);")
e.R("""`host.held.E_RUNG_UNAVAILABLE.village` "Villages are drawn by the village map, which is coming later.";""",
    """`host.held.E_RUNG_UNAVAILABLE.village` "This settlement is smaller than this map build draws." (a build without the village package only: J122's order registers the village product before M-SF, V08 §3.10);""")
e.R("""→ if the snapshot cannot be decoded at all, `backups[0]` plus its `tailAfter` segment plus the current tail (exact, since the segment holds every event the last compaction removed, V08 §3.7) → `backups[1]` absorbing forward, the map edits since it lost and listed → a new map from the current dossier, reported |""",
    """→ if the snapshot cannot be decoded at all, `backups[0]` plus its `tailAfter` segment plus the current tail (exact, since the segment holds every event the last compaction removed, V08 §3.7) → the next older backup absorbing forward, the map edits since it lost and listed → a new map from the current dossier, reported (a rung whose backup `backupDepth` does not keep is skipped) |""")
e.R("""With no village product registered, a population below 1 500 is refused (§7.7 item 15) and a mapped town that shrinks
below 1 500 is held at its last state (B7) until the dossier's population returns above 1 500 — then the next absorb
diffs everything since the held state in one pass. With the village product registered:""","""J122's combined order builds the village product (V-M, after M4) before M-SF, so every live SettlementForge build has
it registered and small settlements are drawn by it. Only a build without the village package refuses a population
below 1 500 (§7.7 item 15) and holds a mapped town that shrinks below 1 500 at its last state (B7) until the dossier's
population returns above 1 500 — then the next absorb diffs everything since the held state in one pass. With the
village product registered:""")
e.save()
