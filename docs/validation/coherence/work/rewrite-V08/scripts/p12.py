import sys; sys.path.insert(0,'scripts')
from ed import Ed
e=Ed('parts/12-s3-6-14.md')
e.R("""this volume adds are dated by rows F-V8-1 – F-V8-7 of `tables/dossier/receipts` (item 393): a relation by its powers'
   pulse week when the line stamps one, else arrival; `port-values` by arrival, riding the next epoch; a custom definition
   by arrival; a chain (custom or SettlementForge's) by arrival; a dependency by arrival; a calamity by its own `tick`
   (a receipt); the `evidence` singleton by arrival, riding the next epoch.""","""this volume adds are dated by rows F-V8-1 – F-V8-8 of `tables/dossier/receipts` (item 393; the base names them, §7.7
   item 13): F-V8-1 a relation by its powers' pulse week when the line stamps one, else arrival; F-V8-2 `port-values` by
   arrival, riding the next epoch; F-V8-3 a custom definition, chain or service by arrival; F-V8-4 a chain of
   SettlementForge's by arrival; F-V8-5 a dependency by arrival; F-V8-6 a calamity by its own `tick` (a receipt), riding
   the epoch at its week; F-V8-7 the `evidence` singleton by arrival, riding the next epoch; F-V8-8 the `site` and
   `history` singletons by arrival, response `none` and a `frozen_fact_changed` note (V08 §3.5; W-DOS-08). The
   settlement's prosperity word is the base's F9 (response `epoch`).""")
e.R("""deaths }` (`deaths` added for V04's burial growth, V08 §2.6a (4); handed to V06, V08 §13 X3); its F5 targets' dossier""",
    """deaths }` (`deaths` for V04's burial growth, V08 §2.6a (4); V06 §2.4); its F5 targets' dossier""")
e.R("""removed segment as its `tailAfter`, keeps `backups[1]` without its segment, drops older ones — all in one
  transaction.""","""removed segment as its `tailAfter`, keeps the older backups without their segments and drops every backup beyond
  `MapHostConfig.backupDepth` (SettlementForge's backup rule, J121; with a depth of 0 the old snapshot is dropped, and
  B10's second and third rungs are absent) — all in one transaction.""")
e.R("""* **Backups and restore** (J-V8.44). `backups` hold the two previous snapshots.""","""* **Backups and restore** (J-V8.44). `backups` hold the previous snapshots, as many as `backupDepth` (J121).""")
e.R("""version of this map were dropped". The mirror needs the module's storage to persist inside SettlementForge's page,
  which third-party storage partitioning allows only when the module's origin is same-site with SettlementForge's app —
  Q1's recommendation (a subdomain of SettlementForge's own domain) meets it; on another site the mirror lives for the
  session only.""","""version of this map were dropped". The mirror persists inside SettlementForge's page only when the module's origin
  (SettlementForge's, J121) is same-site with SettlementForge's app, as third-party storage partitioning requires;
  otherwise it lives for the session only (T-V8-53 covers both).""")
e.R("""* **Sizes (the host's quota, per map):** the snapshot within §2.9's size budget (TOWN ≤ 0.6 MB, CITY ≤ 3 MB, METROPOLIS
  ≤ 8 MB), the tail ≤ 256 KB between compactions, two backups (the newer with one tail segment ≤ 256 KB), two thumbnails
  ≤ 150 KB each, the party picture set (V08 §6: ≤ 2, 6 and 12 MB) — at CITY ≤ 15.9 MB worst case, typically ≈ 8 MB.""",
"""* **Sizes, per map:** the snapshot within §2.9's size budget, the tail ≤ 256 KB between compactions, `backupDepth`
  backups (the newest with one tail segment ≤ 256 KB), two thumbnails ≤ 150 KB each and the party picture set (V08 §6's
  storage row). SettlementForge decides whether a record counts against a plan and how large it may be (J121): with
  `quotaBytes` set, a commit that would pass it still commits — the map's log is never refused for size — and the client
  reports `host.status.quota` to the owner, the next compaction dropping backups beyond the allowance first.""")
e.R("""client sends `doc.snapshot` (XV-V9-24).""","""client sends `doc.snapshot`.""")
e.R("""(research:
dossier-generation §3.2); the same seed gives different dossiers on two lines at one `generatorVersion` (research: V
treecheck, g§4.5),""","""(`research/sf/dossier-generation.md` §3.2); the same seed gives different dossiers on two lines at one
`generatorVersion` (§4.5 there),""")
e.R("""  reading that `expiresAtTicks` is the condition's whole length (PLAUSIBLE: a generated condition carries `elapsedTicks`
  3.25 and `expiresAtTicks` 6 at tick 0). Its measurement: `untilWeek` stays within ±1 week across town-1's and city-1's
  one-week, one-season and one-year ticks (T-V8-18); pre-decided fallback, if it drifts: `untilWeek =
  expiresAtTicks` read as an absolute tick.""","""  reading that `expiresAtTicks` is the condition's whole length (a generated condition carries `elapsedTicks` 3.25 and
  `expiresAtTicks` 6 at tick 0). T-V8-18 holds `untilWeek` within ±1 week across town-1's and city-1's one-week,
  one-season and one-year ticks; where it does not, the adapter's next version reads `expiresAtTicks` as an absolute tick
  (`untilWeek = expiresAtTicks`), a declared remap (V08 §3.8), and T-V8-18 then holds that reading (J-V8.63).""")
e.R("""* **History.** At creation only: `Recipe.history = { ageYears: history.age, scars }`, one scar per historical event by
  the `historyScars` row (V08 §2.6) with its `yearsAgo` and severity; never updated by later dossiers (`ageYears` is
  never advanced by the host's weeks, §2.7). The `magical` events go to the ruin evidence instead (V08 §2.6a).""",
"""* **History.** At creation only: `Recipe.history = { ageYears: history.age, scars, … }` — one scar per historical
  event by the `historyScars` row (V08 §2.6) with its `yearsAgo` and severity, and item 113's additions by V08 §2.6c;
  never updated by later dossiers (`ageYears` is never advanced by the host's weeks, §2.7; a later rewrite is V08 §3.5's
  frozen `history` row). The `magical` events give no scar; they are ruin evidence (V08 §2.6a) and replay events.""")
e.R("""   (research s E-7, §3). Area fog is consciously replaced by place-by-place knowledge (J-V8.58): the base's knowledge
   model is by place (§9.2), a revealed place is named in every picture from then on, and an area fog over a live
   map is the "party copy" capability of owner question Q5, not built.""","""   (`research/sf/dossier-seam.md` E-7, §3). Area fog is consciously replaced by place-by-place knowledge (J-V8.58): the
   base's knowledge model is by place (§9.2) and a revealed place is named in every picture from then on. A live shared
   map for players — the "party copy" an area fog would need — is decided under J122: pictures and player views now; a
   live shared map after M-SF, not part of this stage (V08 §11 Q5).""")
e.save()
