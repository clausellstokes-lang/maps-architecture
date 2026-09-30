import sys; sys.path.insert(0,'scripts')
from ed import Ed
import shutil
parts=['00385_2.md','00387_2.1.md','00444_2.2.md','00544_2.3.md','00609_2.4.md','00677_2.5.md']
t=''.join(open('cl/'+p).read() for p in parts)
open('parts/03-s2-1-5.md','w').write('\n'+t)
e=Ed('parts/03-s2-1-5.md')
# 2.1
e.R("row keyed by the settlement's id and the map id — never inside the dossier's `data` blob, where it would ride every save,\nsync and public projection at about ten times the dossier's size (research: `research/sf/dossier-seam.md` C-6; J-V8.3). The",
    "row keyed by the settlement's id and the map id — never inside the dossier's `data` blob, where it would ride every save,\nsync and public projection at about ten times the dossier's size (`research/sf/dossier-seam.md` C-6; J-V8.3). The")
e.R("renewed after each map */ };   // C8-30","renewed after each map */ };")
e.R("kept until the next compaction */ }[];   // the two previous snapshots, newest first",
    "kept until the next compaction */ }[];   // the previous snapshots, newest first — at most MapHostConfig.backupDepth, SettlementForge's backup rule (J121)")
e.R("// bytes, for the host's quota","// bytes, read against SettlementForge's storage allowance (MapHostConfig.quotaBytes, J121)")
# 2.2
e.R("""This volume adds nine
message types — host → PLAT `dossier.offer`, `doc.snapshot`, `host.state` and `party.render`; PLAT → host `dossier.result`,
`doc.snapshot.ready`, `module.status`, `host.action` and `party.rendered` — and extends three base messages and two export
options (item 472):""","""§11.3's vocabulary lists the port's
messages (item 472); their types are this section's, generated into `@plat/api`'s bridge schema:""")
e.R("""interface MapHostConfig { moduleOrigin: string /* e.g. the module's own subdomain (owner question V08 §11 Q1) */; embedPath: string /* '/embed.html' */;""",
"""interface MapHostConfig {   // every SettlementForge product decision the module needs arrives here as an input (J121) — the design decides none of them
  moduleOrigin: string /* the origin SettlementForge serves the module from (J121; V08 §11 Q1) */; embedPath: string /* '/embed.html' */;
  locale: string /* SettlementForge's interface language, BCP 47 (J121): carried in the frame's src (V08 §3.1 step 1); the frame reads messages/<locale>.json, a missing file or key reading the source catalogue en.json (V09 §2.9's Locales) */;
  backupDepth: number /* SettlementForge's backup rule (J121; V08 §11 Q2): how many previous snapshots a record keeps, an integer ≥ 0 */;
  quotaBytes?: number /* SettlementForge's per-map storage allowance (J121); absent: no check (V08 §3.7) */;""")
e.R("moves the old snapshot to backups[0] with the removed segment as tailAfter, drops backups[2]",
    "moves the old snapshot to backups[0] with the removed segment as tailAfter (none when backupDepth is 0), drops every backup beyond backupDepth")
e.R("""  seePlayersView(on: boolean): void;""","""  exportBundle(formats: ('dd2vtt'|'foundry')[], o?: { knowledge?: Admission }): Promise<{ fmt: string; bytes: Blob /* application/octet-stream, never parsed */ }[]>;   // from M-SF only (J122; V08 §5.4 (2)): the scene files for SettlementForge's export bundle
  seePlayersView(on: boolean): void;""")
e.save()
