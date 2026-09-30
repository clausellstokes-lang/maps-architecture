import sys; sys.path.insert(0,'scripts')
from ed import Ed
e=Ed('parts/08-s2-7-8.md')
t=e.t
# 2.7 rows
e.R("before the revision: filled at its next absorb as a declared remap with no map event","before these fields existed: filled at its next absorb as a declared remap with no map event")
e.t=e.t.replace("digest additions of the revision: `site.ruinEvidence`","digest additions: `site.ruinEvidence`")
e.t=e.t.replace("| the adapter | DR29 – DR28, DR2, DR9 |","| the adapter | DR28–DR33, DR2, DR9 |")
# new lifecycle rows appended after the last row of the 2.7 table
last="| an older `held` without it shows `host.status.held` with the row of its `code` (E_RUNG_UNAVAILABLE: `.village`) |"
assert e.t.count(last)==1
new=last+"""
| carried `wealth` (on the settlement fact), `site` and `history` (2.3) | `creation`, `absorb` | the diff's `wealth`, `site` and `history` rows (3.5) | the dossier block | kept | n/a | absent in an older document's carried facts: filled at its next absorb as a declared remap with no map event and no note (the map never saw them change) |
| `HistoryHint`'s additions (2.6c) | the port's creation (or V09's editor from a blueprint's history option) | V06's replay plan (V06 §3.20.1); V10's story through `HistoryRecord` | the recipe (`Recipe.history`, §2.9) | the replay re-run from the recipe by Regenerate and New random (V06 §3.20.8) | n/a (the creation prefix) | absent in an older recipe: no replay, as before (an upgrade never adds one, V06 §3.20.8) |
| `MapHostConfig`'s SettlementForge inputs — origin, locale, backup depth, quota (2.2) | the host page, from SettlementForge's product decisions (J121) | the frame's `src` and CSP (3.1), the catalogue locale (5.5), `replaceSnapshot` (3.7), the quota check (3.7) | never stored by the module (the host's configuration) | n/a | n/a | a smaller `backupDepth` drops the extra backups at the next compaction; a changed locale takes effect at the next frame boot |
| `exportBundle`'s blobs (2.2, 5.4 (2)) | the module on the client's call, from M-SF | SettlementForge's export bundle, packaged unread | never stored by the module; the host's bundle is SettlementForge's | re-made on each call from the committed document | n/a | the scene formats' own versions (§11.1) |"""
e.t=e.t.replace(last,new)
e.R("""**What the pinned line gives (CONFIRMED on the `town-cc-1` fixture, generated on `fp/integration-2026-09-23` @ `5d699cc68`
with SettlementForge's reference custom pack; `research/sf/dossier-outputs.md` §3.5, `research/sf/dossier-model.md` §13,
and the line's custom-content manifest read read-only for item 104).**""","""**What the pinned line gives (CONFIRMED on the `town-cc-1` fixture, generated on the pinned line with SettlementForge's
reference custom pack, and on the line's custom-content manifest, read-only).**""")
e.R("""// additions to §14's DossierInstitution (item 511) — present only on a record the dossier marks `source: 'custom'`; replaces §14's `custom?: { uid }`
  custom?: { uid: string""","""// §14's DossierInstitution.custom (item 511): present only on a record the dossier marks `source: 'custom'`
interface CustomRecordRef { uid: string""")
t=e.t
a=t.index("**The staged records the chains and services become (item 256;")
b=t.index("**The assignment's custom part (item 394).**")
e.t=t[:a]+"""**The staged records the chains and services become (item 256).** `CustomChainRecord` and `CustomServiceRecord` are
§2.7's, filled only by `dossierRecord` events (V08 §2.5) and read by S10b's chain pulls (item 104, with V11's rows),
§10.3's sub-locations, the renderer and labels (V08 §5.2) and the clerk. Their fields' rules: a chain's `nodes` in flow
order — the resource (a `res:` key), the processors (`inst:` keys) and the outputs (`def:<definitionId>`), each kept by
name when it joins nothing; `endpoints[].partner` the trade partner's binding key when the dossier's trade links name
one for the good, else absent (the main gate or harbour, item 104 (h) (6)); `volume` the admitted library's
`economicWeight` of the chain's final processor, else `moderate` (item 104 (h) (2)); `crossLinks` only from admitted
library fields (item 104 (h) (4); V08 §3.13 (7)); a chain retired when the dossier no longer lists it. A service's
`provider` is its provider institution's binding key, inside which or on an adjoining plot item 104 (h) (5) puts it.

**Keys.** §7.7 item 12's key law holds `chain:<chainId>`, `res:uid:<localUid>`, `svc:uid:<localUid>` and
`def:<definitionId>` (item 256). A chain's id is stable while its node set is unchanged; a chain whose nodes change is a
new chain, SettlementForge's own identity (J-V8.42). None re-binds: a custom item is renamed in SettlementForge without
changing its uid, so its keys never change (item 104 (e): "a rename changes nothing").

"""+t[b:]
e.R("""**The assignment's custom part (item 394).** A custom record's dossier-backed assignment carries
`Assignment.custom?: { uid: string; revision: string; contentHash: string }` — dossier-owned (§7.7 item 11), written by the
creation prefix's `assign` and changed only by a `setAttr` on `custom.revision` with cause `custom_revision`.""","""**The assignment's custom part (item 394).** `Assignment.custom` (§7.7) is dossier-owned (§7.7 item 11), written by the
creation prefix's `assign` and changed only by a `setAttr` on `custom.revision` with cause `custom_revision`.""")
e.save()
