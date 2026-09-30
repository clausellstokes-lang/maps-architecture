import sys; sys.path.insert(0,'scripts')
from ed import Ed
e=Ed('parts/15-s5.md')
e.R("Keyed by phase; the key and its words are this table's (V08 §13 X12):","Keyed by phase; the key and its words are this table's (V09 §4.9 loads them):")
last_row_marker="| — (the player's tab, no frame) |"
t=e.t; i=t.index(last_row_marker); j=t.index("\n",i)
e.t=t[:j]+"""
| — (a commit past SettlementForge's storage allowance, `MapHostConfig.quotaBytes`) | `host.status.quota` "This map is larger than its storage allowance; older copies will be dropped first." | owner |"""+t[j:]
e.R("(V09 §2.2's `fileMenu: false`; SR3-02: the host is the store,","(V09 §2.2's `fileMenu: false`: the host is the store,")
e.R("(J-V8.89; V08 §13 X15).","(J-V8.89; V09 §4.8).")
e.R("own `error.frozen` strip (V09 §3.14 (b); XV-V9-24),","own `error.frozen` strip (V09 §3.14 (b)),")
e.R("(research C-11); the inert","(`research/sf/dossier-seam.md` C-11); the inert")
e.R("""Door 1 is closed by ruling (J86; §11.4). Structurally (J-V8.37 revised), no STRUCTURED format reaches
SettlementForge's code — no GeoJSON, VTT, glTF, CityJSON, CSV, skeleton or query geometry. What the host does hold is
stated plainly: the document, as an opaque stored artifact it has no decoder for, and pictures, whose drawn outlines the
owner's audience table accepts (§14; research C-11).""","""Door 1 is closed by ruling (J86; §11.4). Structurally (J-V8.37), no call returns a structured format to
SettlementForge's code as data — no GeoJSON, VTT, glTF, CityJSON, CSV, skeleton or query geometry it could read. What
the host does hold is stated plainly: the document, as an opaque stored artifact it has no decoder for; pictures, whose
drawn outlines the owner's audience table accepts (§14); and, from M-SF, the export bundle's scene files as opaque blobs
it packages unread ((2)).""")
e.R("""   `export.refused { error: 'E_HOST_FORMAT' }` (item 472). Whether SettlementForge's own export bundle may carry the
   map's scene files is the owner's (V08 §11 Q3); until the owner says so, it may not.""","""   `export.refused { error: 'E_HOST_FORMAT' }` (item 472) — with one exception, the export bundle (V08 §11 Q3, decided
   under J122: yes, from M-SF; until then maps export on their own). **The export bundle** (J-V8.116). From M-SF,
   `MapSession.exportBundle(formats, { knowledge? })` asks for the scene files a DM chose for SettlementForge's export
   bundle — `dd2vtt` and `foundry`, §11.1's scene formats — as `export.request { fmt, opts: { bundle: true }, knowledge? }`
   from an owner's or editor's session (a viewer's is refused `role`); the module renders each at the export's
   knowledge key (the requester's key, lowered by `knowledge` and never raised, item 572) under §11.1's key rules and
   answers `export.ready { bytes }`; the client returns each as an opaque `Blob` of type `application/octet-stream`,
   parsing nothing, and SettlementForge's code packages the blobs into its bundle unread — the contract clause the host
   implements, beside the no-decoder rule of (1). Door 1 stays closed: the bundle is packaging for the user's download,
   never input to SettlementForge's simulator, which reads no map geometry (J86). Any other format, and `opts.bundle` in
   a build before M-SF, is refused `E_HOST_FORMAT` (T-V8-48).""")
e.R("""   | `people` rows | `id`, `name`, `withheld`, type, race, gender, age, profession, workplace and household by id and name (by address when withheld), district | any position |""",
"""   | `people` rows | `id`, `name`, `withheld`, type, race, gender, age, profession, workplace and household by id and name (by address when withheld), district; ordered with the dossier-backed persons first by their carried `importance` (`pillar`, `key`, `notable`, `minor`, then none), then by name (W-DOS-07) | any position |""")
e.R("""as SettlementForge supplies the words — the module's own strings are its locale table (§14's app), with English the
default.""","""as SettlementForge supplies the words. The frame's interface language is SettlementForge's (J121): `MapHostConfig.locale`
reaches the frame in its `src` (V08 §3.1 step 1) and the module reads that locale's catalogue file (V09 §2.9's
*Locales*); English is the catalogue's source language, whose row stands in for a missing file or key — never a product
default of its own (T-V8-53).""")
e.save()
