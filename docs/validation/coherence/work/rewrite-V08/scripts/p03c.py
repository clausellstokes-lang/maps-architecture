import sys,re; sys.path.insert(0,'scripts')
from ed import Ed
e=Ed('parts/03-s2-1-5.md')
t=e.t
a=t.index("// §14's PortResult refusal codes gain 'E_OTHER_SETTLEMENT'")
b=t.index("CLASS (event, standing or report) is V08 §4.6's table's, and decides where it is kept (V08 §3.6 (4))")+len("CLASS (event, standing or report) is V08 §4.6's table's, and decides where it is kept (V08 §3.6 (4))")
new="""// §14's PortResult (with E_OTHER_SETTLEMENT) and PortNote (its kinds, `msg` and `keys`; item 508) are the base's; what each kind is written for and its
// words and class are V08 §4.6's table. The union gains one kind: 'frozen_fact_changed' /* a later change of creation's site words or of the history (V08 §3.5's
// `site` and `history` rows; W-DOS-08) */. A note's IDENTITY is the first 16 hex digits of H128 over the canonical CBOR of (kind, msg, keys sorted); its CLASS
// (event, standing or report) decides where it is kept (V08 §3.6 (4))"""
e.t=t[:a]+new+t[b:]
e.R("""**The first line's key sets (CONFIRMED on the 35 births and 12 after-tick dossiers generated on the pinned line;
receipt `scratchpad/volumes/rv8/census2.out`).**""","""**The first line's key sets (CONFIRMED on the 35 births and 12 after-tick dossiers generated on the pinned line).**""")
e.R("""`customContentRoster`, `populationHistory`, `resourceHistory`, `tierHistory`, `institutionHistory`, `calamityHistory`;
not read: `urbanFabric` (on §7.7 item 1's never-read list), `npcLadder` and `traditions` (no reader: the notables and
powers already carry what the map uses).""","""`customContentRoster`, `populationHistory`, `resourceHistory`, `tierHistory`, `institutionHistory`, `calamityHistory`,
and `neighbourNetwork` (a campaign's saved neighbour links, read when present; not seen in the census); not read:
`urbanFabric`, `npcLadder` and `traditions` (on §7.7 item 1's never-read list).""")
e.R("**Selection (J-V8.9 revised).**","**Selection (J-V8.9).**")
e.R("**The catalogue manifest (V11's request, answered with C8-22).**","**The catalogue manifest.**")
e.save()
