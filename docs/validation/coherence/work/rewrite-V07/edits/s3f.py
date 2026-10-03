from lib import *
t = extract(2411, 2745)
t = strip_narr_ids(t); t = strip_narr_more(t); t = strip_narr_tail(t); t = norm_items(t); t = norm_d5(t)
R = [
("registration, landing with item 202 (item 202; TW-03, J-V7.132).", "registration, landing with item 202 (J-V7.132)."),
("(V06 X36)", "(V06 §3.8.2)"),
("in the same batch (V06 §3.8.2, TT-01); the decline's", "in the same batch (V06 §3.8.2); the decline's"),
("a green loses at most `epoch.encroachShareMax` (0.25) of its area over its life;", "a green loses at most `epoch.encroachShareMax` of its area over its life;"),
("""* **(9v) a new nucleus** — when the residual exceeds `epoch.newNucleusShare · D` in one epoch, a second nucleus is sited by VS1's score at
  least `0.8·R_s` from the existing ones and grown as a polyfocal nucleus (the village turns polyfocal).""",
 """* **(9v) a new nucleus** — when the residual exceeds `epoch.newNucleusShare · N` in one epoch, a second nucleus is sited by VS1's
  score, spaced by the polyfocal rule (V07 §3.2 (4)): at least `max(polyfocal.spacingMinM, polyfocal.spacingShareRs · R_s)`
  from the existing ones, so the 250 m floor holds at epochs as at creation; it is grown as a polyfocal nucleus (the village
  turns polyfocal)."""),
("**Markets, halls and the fair over epochs** (J-V7.116; the phases and ops by reconciliation round 5, TV-02,\nJ-V7.125).",
 "**Markets, halls and the fair over epochs** (J-V7.116, J-V7.125)."),
("(§6.3; §7.7 item 6, J-A22.76; TW-01, J-V7.129)", "(§6.3; §7.7 item 6, J-A22.76; J-V7.129)"),
("(§7.7 item 5; V06 §3.9.6, J-V6.123;\n  seam-time-r5 TW-05)", "(§7.7 item 5; V06 §3.9.6, J-V6.123)"),
# DUP-1: the calls are V07 §2.1's; this paragraph keeps what it places, declines and removes
("""**Records at a village epoch** (`village.records`; J-V7.125; round 6: TW-01, TW-02, TW-07). The engine's
`dossier` step (V06 §3.2 row 12) calls the placement `ProductDecl('village').records` names — `village.records`,
registered by `@plat/village` with `stage: 'S10b'`, the stage whose `dossier` request it stands in for (its draws key by
it, §6.1) — once for each dossier record the step adds, **member a count step adds, or greater a REPLACEMENT re-key places new** (V08 §3.5.1 (c)'s second and third cases, (d)) — a re-key whose greater keeps the lesser's thing being a `rebind`, never offered — at a village epoch, in
binding-key order, before the base's placement (§7.7's *One path* sentence), with the adding dossier event's `seq` (its
keys, V07 §3.14; J-V7.129), and commits its ops as that step's batches. It places, and declines nothing it names:""",
 """**Records at a village epoch** (`village.records`; J-V7.125, J-V7.129 – J-V7.131). `village.records`, registered by
`@plat/village` with `stage: 'S10b'` (the stage whose `dossier` request it stands in for; its draws key by it, §6.1), is
called by the engine's `dossier` step (V06 §3.2 row 12) and, without an epoch, by the base's *One path* placement, as
V07 §2.1's *The records placement* states — its calls, order, keys and batches. It places, and declines nothing it names:"""),
("(V06 §3.9.11's REPLACEMENT row, which excepts a greater\n   V08 §3.5.1 (d) places new; J-V6.125, seam-settlements-r5 SR5-04).",
 "(V06 §3.9.11's REPLACEMENT row, which excepts a greater\n   V08 §3.5.1 (d) places new; J-V6.125)."),
("""**Without an epoch** (found beside TV-02; J-V7.128): a record an absorb adds at a village
rung with no epoch (V08's absorb path, V07 §3.11's absorb half) is placed by the same call and the same list — the base's
*One path* placement calls `village.records` first (item 202) — and a record it removes is handed to `remove` after §7.7
item 2's removal; their ops are that absorb commit's batches (no undo target, §7.4), keyed by the
absorb's dossier event's `seq`; so a fair field, a hall, a cloister, a forced pin or a REPLACEMENT greater never waits for
the next epoch, and S10b's `dossier` request never meets a record it cannot place (a fair ground's reservation, a hall's
claim).""",
 """**Without an epoch** (J-V7.128) the same list runs on an absorb (V07 §2.1; its ops that absorb commit's batches, no undo
target, §7.4), so a fair field, a hall, a cloister, a forced pin or a REPLACEMENT greater never waits for the next epoch,
and S10b's `dossier` request never meets a record it cannot place (a fair ground's reservation, a hall's claim)."""),
("struck at the street\nlayer's rate, 0.08 **per year** over the epoch's span (`1 − (1 − p)^years`, §4.11 *The clock* (5)),",
 "struck at V06 §3.5.2's street rate\n**per year** over the epoch's span (`1 − (1 − p)^years`, §4.11 *The clock* (5)),"),
("cell (0.3) of a dwelling's", "cell of a dwelling's"),
("`stagnant` with `blockedBy` gaining `'rung'` (asked of V04, V07 §1),", "`stagnant` with `blockedBy` holding `'rung'` (V04 §2.2),"),
("the cap, counting the declared ones (critique C6-40 (2), J-V6.86).", "the cap, counting the declared ones (V06 §3.19; J-V6.86)."),
("The suppression ledger (critique C6-39) is the log's and crosses unchanged.", "The suppression ledger (§4.3, item 290) is the log's and crosses unchanged."),
("so the suppression ledger (critique C6-39), derived\nfrom the log,", "so the suppression ledger (§4.3, item 290), derived\nfrom the log,"),
]
t = apply(t, R, strict=False)
t += """
### 3.12a A village over a former town, and refounding (item 113; J-V7.135 – J-V7.137)

History-first generation (§4.11 *History-first generation*; V06's replay engine, V08's history reading, V11's rows) builds
a settlement with a known history as its past and ages it to the present. This section is the village product's part: the
remnants a former town or city leaves at village rungs, and a thorp, hamlet or village refounded on the ruins.

**(1) Which product runs which replay epoch.** The replay's coarse epochs (`history.epochYears`, V11) fold the product by
V07 §2.1's hand-off band exactly as live epochs do. Generation runs at the peak's population (§4.11 (2)): the base product
when the peak is TOWN or above, the village product when the peak is itself a village rung (then the village's own epochs,
V07 §3.12, are the whole replay); each replay epoch whose target falls below the band hands down by *The hand-off down*
(V07 §3.12), and from then the village phases run. The replay's epochs are the creation prefix (flagged `creation`, never
undo targets, §7.4); the village's draws at them are the ordinary `…/epoch=e` streams (§6.1) on V07 §3.14's concerns, so
the replay is byte-stable per seed and history (J-V7.135).

**(2) A village over a former town — the remnants at village rungs.** After the hand-off down the former town is standing
fabric, read by the village phases as a shrunk town (V07 §3.12) and never re-cut; each remnant §4.11 (3) names has its
village mechanism:
* *walls far beyond the houses* — the former enceintes stand; the `VillagePlan`'s palisade is the innermost standing one
  (the hand-off down), each decaying by its stretch-state profile (§2.2 rule 5; V06's decline); the barrier closure and
  VS3 are never re-run on them;
* *old streets as tracks and field boundaries* — a former street the village no longer uses is the street candidate of the
  village's epoch rows (*Decline and desertion*: `retireWay`, then `effaceWay`); a decayed way keeps its chain (a live
  record, §2.8's decline hooks), so the hinterland faces it bounds keep it as their edge and V07 §3.9's furlongs and field
  lines follow the old street lines; one inside the perimeter that still serves an access stays a lane (J-V7.137);
* *a church too big for the congregation* — the town's churches keep their persistence (`epoch.rows.persistence`) and
  their crypts (the hand-off down); a standing cathedral stays a cathedral;
* *a market square too large for its market* — the plan's open spaces are the town's market reservations (the hand-off
  down), kept at their size; VS8's stalls are counted at the village's households (*Pins over epochs*);
* *empty plots, roofless and ruined buildings* — V06's decline states and the dwell bands, unchanged;
* *the buried town* — ruins older than `history.burialYears` are II.7.6's buried former settlement (V04), kept at a village
  rung in maintenance mode like a buried old town (V07 §3.12 *The standing underground*); access to it follows item 109 (j)
  through V07 §3.16's access readings and is lost when its last open link closes (item 113 (e); V04);
* *a symbolic peak* — every fact the effective peak sizes carries provenance `symbolic` (§2.8): the plate's population is
  the present's (V07 §5.3), never the peak's, and the clerk says "its exact size is not recorded" (V10).

**(3) Refounding at village rungs** (item 113 (b); J-V7.136). Where the history destroys the place outright and the new
settlement is a thorp, hamlet or village, the old geometry becomes ruins (§4.11 (4): every building `ruined`, every way a
trace) and the village product's stage set runs on top of it at that epoch, reading the former fabric through the data key
**`history.former`** — the ruined ways, wall chains with their gate gaps, bridges and building footprints of the destroyed
settlement, clipped to the territory frame, published by the kernel's declaration layer from the standing records as
`raised` is (V07 §3.0) and written by no village stage. The village's stages read it with the cells `rules.refound`
(V07 §2.2a):
* **VS1** — the heart scores `+ refound.heart` × the proximity to the former principal market (1 inside its reservation,
  falling linearly to 0 at `refound.reachM`): the new village settles at the old centre unless the ground says otherwise;
* **VS3** — where the planned trace runs within `palisade.bandM` of a former wall chain, the vertices snap onto the former
  line, and the former gate gaps on the snapped stretch are gate sites (a `road` makes its gate there whatever the spacing
  rule of V07 §3.5 step 3 says); the former wall's ruined stretches under the new palisade are `supersededBy` it, as the
  palisade's REPLACEMENT supersedes a palisade (V07 §3.11);
* **VS4** — a former way's trace within `refound.snapM` of a tracker's next point is a merge target as a laid way is (V07
  §3.5 step 4), and the stretch the tracker then follows is **reopened** by `reopenWay` (the ways' decline ladder, item 268;
  back to `built`, its address kept) in VS4's batch — regrowth-first, as the village's epochs reopen a hollow way before
  laying a track; the steering adds `refound.followWeight` × the tangent of the nearest former way within `refound.snapM`;
  step 2 takes a former bridge's crossing site first, its deck rebuilt by S1 (5)'s rules (`built`); the neighbour roads'
  router calls price a former way at `history.reuseCost` through the lattice's `existingFabricCost` (§4.11 (4));
* **VS6 and S10b** — a slot whose toft holds a former building footprint weighs `refound.foundationBoost` × in the slot
  race's key (`m_i`, V07 §3.8), and S11 builds on the old foundation by the base's `reuse … build` form where the footprint
  fits the slot; the builds debit the salvage ledger (§4.11) for their stone;
* **S0** — the new village's form is drawn on the history's culture row (the refounders may follow a different plan and
  culture), its source `auto`.
The old plan persists wherever it helps: a former way no tracker follows stays a trace (a decayed way), a field boundary
by (2). A history destroyed and refounded twice reads only the latest former fabric (the older ruins are ruins or buried).

**(4) Neutral and failure.** With the replay off (`history.replay` false; the parity presets, `VG` included) no
`history.former` key exists, `rules.refound` is unread and a village is byte-identical to one without item 113 (a NoOpPin,
T-V7-59). A peak at or below the present population is no peak (§4.11 (7)); a peak above the rung table's top is sized at
the cap (§1.1); a history whose founding lies after its present replays nothing and is reported (§4.11 (7)); a former way
cut by water the replay's floods moved is not snapped (S1's water wins) and its traces stay; a former bridge whose river
moved is not rebuilt. None of these retries the map (§5).
"""
save('13-s3f.md', t)
print('ok', len(t.split()))
