import sys,re; sys.path.insert(0,'scripts')
from ed import Ed
e=Ed('parts/18-s8.md')
t=e.t
a=t.index("### 8.1 Where it slots into §16"); b=t.index("### 8.2 Steps")
e.t=t[:a]+"""### 8.1 Where it slots into §16

The owner's roadmap stages "SettlementForge inputs" after the generators are mastered (*Staged by the owner's
roadmap*), and the owner's definition orders it last — built standalone, then calibrated against the corpus, then
connected (docs/DEFINITION.md §1). The stage is milestone **M-SF — the SettlementForge stage**, last in J122's combined
order (§16; `docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md`): after M4, the four streams M5 (V01), the village V-M1–V-M4
(V07), M6-E (V06) and the plan rung's P0, P1 and P3 (V03); then M6 (V02) and M6-U (V04); then M6-P's rest and M6-sky
(V05); then M-CAL (V12); then M-SF, with the village hand-off VH inside it (V08 §11 Q4, decided under J122: M-SF after
M-CAL; J-V8.39; item 529). The port's creation half is built at M1 on frozen dossiers, so a SettlementForge settlement
becomes a map from the first milestone; M-SF adds the live connection. It needs M3a (the API, the bridge, the absorb
half, the dossier contract), M3b (the picture exporters the thumbnails and the party set use), M4 (the incremental path
the catch-up epochs run on, the rung read at each epoch), M6-E (the epochs the port's catch-ups and the history replay
run — V06's E9 reads V08 §2.6c's inputs), V-M4 (the village product VH consults), M-CAL's calibrated tables, and V11's
**C4** — the SettlementForge rows: `dossier.kinds`, archetypes, category synonyms, keywords, good words, ladders, the wall
barrier and waterfront rows, and the history rows (V11 §8's C4, priced there). Without a V11 row an unmapped kind still
stands at its category's generic class, reported — the stage is never blocked by content. Item 110's reach points (V08
§2.6b) and item 111's rows are built before M-SF in this order, so DR34, DR35 and DR40 have their readers when the
live connection lands.

"""+t[b:]
e.R("""| **SF3 — adapters and failure** | `AdapterManifest` with required and optional keys,""","""| **SF3 — adapters and failure** | `AdapterManifest` with required and optional keys and the adapter's field table (V08 §2.4),""")
e.save()
t=e.t
# SF3 tests/estimate, SF4, SF5, SF6, SF7, total rows replaced via regex on the whole row lines
def rep_row(prefix, newrow):
    global t
    i=t.index(prefix); j=t.index("\n",i)
    t=t[:i]+newrow+t[j:]
rows=t
e.t=t
