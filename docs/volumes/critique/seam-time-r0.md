# Seam check — evolution (V06) against every stage it changes (V01, V02, V03, V04, V05, V07, the base, file f)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-time-r0; covered by the whole-design retrovalidation (J84).

Lane `volumes/seam-time-r0`, 2026-09-29. The question: does every piece of state volume 6's evolution engine touches
have its epoch behaviour, its transition stage and its undo, stated once and consistently on both sides of the seam —
and do the volumes, the base (`docs/ARCHITECTURE.md`, md5 01fea21f…) and the consolidated base change requests
(`docs/AMENDMENTS-2026-09-28f.md`, items 200–566) agree on the terms, ids, units, records and requests that cross it?

PROGRESS
- §1 Method and scope: done
- §2 The seam's state census (every piece of state V06 touches: epoch behaviour, transition stage, undo): done
- §3 Issues (severity, owner, required change): done
- §4 Summary counts and CONFIRMED versus PLAUSIBLE: done
- (continuation 03:01 after a cut at 02:51: ST-45, ST-49, ST-50, ST-53, ST-56, §3.3 and §4 written then; the ledger above had read done before they existed)

## 1 Method and scope

**Read whole:** `docs/volumes/V06-evolution.md` (3 450 lines, every section including §10's twenty-six requests, §13's
hand-offs X1–X24 and the Integration notes IN-V06-1–7); `docs/volumes/_integrate.md` (J-VI.1–22, the hand-off census
H1–H35); `docs/AMENDMENTS-2026-09-28f.md`'s preamble, its rules R-a–R-d and every item that carries a V06 request (206,
209, 244, 245, 246, 254, 260, 264–266, 275, 290, 291, 293, 317, 321, 322, 335, 336, 339, 342, 343, 368, 383, 388, 409, 429,
431, 443, 447, 458, 478, 479, 550) or a request of a sibling that V06 schedules (268, 319, 322, 431).

**Read by whole section** (every section of the sibling volumes that meets the seam — its hooks, wiring, records and
lifecycles, every paragraph that states an epoch, an `advance`, a participant, a hand-off, a Works, a suppression or an
undo over time, and its Integration notes; a grep for `epoch`, `V06`, `V6 §` and `volume 6` located every such passage,
each then read in its enclosing subsection, never as a line):
* **V01** — §1.2 hooks, §1b, V1-3.3.6 (`hood.fabric`), V1-3.5.11–3.5.12, V1-3.17.1–3.17.8 (item 110), J-V1.36's hood
  document row, the Integration notes.
* **V02** — §1b rows 204–252, §3.9 W1–W10, §3.14.5 (dig floor, crypts), §3.15.5 pointers, §3.16 (decks), §3.17 (retaining
  walls, raised ways), BCR-V2-40, §13 X8 and X23, the Integration notes.
* **V03** — §1.3's epoch sentence, 2.1's `Basement.crypt`, 3.7.4 (the crypt and its rank), §13's hand-offs, the
  Integration notes.
* **V04** — §1.2, §1.3, §1b.1–1b.5, §2.2, §2.3 (every table), §2.5, §2.6, §3.1 (tail order, maintenance mode), §3.5.0,
  §3.5.1, §3.5.4, §3.5.7, U-FRONT F6, §3.10, §3.11, §3.12, BCR-6, §13, the Integration notes.
* **V05** — §1.2, §1.3, §1b, §2.1–2.3b, §2.6, §3.1–3.2, §3.15, §3.16, §3.19, §3.21, §3.22, every epoch passage of §4–§9
  (by grep, each read in context), the Integration notes.
* **V07** — §1b W1–W59's epoch rows, §2.1, §2.6's epoch rows, §3.12 (whole), §3.16 (whole), §3.5a's decline line,
  §3.10a (6), BCR-V7-26 and BCR-V7-32, §13, the Integration notes.
* **The base** — §4.11 *The evolution engine … hooks*, `EpochInputs`, *The clock*, *The rung at an epoch*, *Uses across
  epochs* (l. 6342–6440), §7.4's epoch and group undo rows, §2.9's truncation fields.
* **Cross-checks outside the brief's list, read only where a V06 row names them:** V08 §2.6a (4)'s deaths, §3.6's
  calamity carriage and its X3 to V06; V11 §3.24.3's `raisedWays` rows (to test V06 §3.19's restated defaults).

**Continuation.** The first sitting was cut at 02:51 after ST-41 (its ledger already read done); the continuation (03:01) re-read every remaining candidate against its sentences on both sides — V06 §2.1, §2.6, §2.8, §2.12–§2.13, §3.1–§3.2, §3.4, §3.6, §3.11, §3.18–§3.19, §6.5, BCR-V6-24–26, §13 and the Integration notes; V05 §3.15–§3.16, §3.19, §4.2; V04 §1b.2, §3.1, §3.5.1 (1)–(8), §3.10–§3.12, §4.3, the Integration notes; V07 §2.7, §3.5a, §3.12; V01 V1-3.3.6, V1-3.5.11, V1-3.17.3–3.17.7; V02 §3.9 W10; V03 3.7.4; file f items 209, 244–246, 260, 264, 268, 275, 290, 317, 319, 322, 409, 431, 443, 447; base §4.11 *Islands and the underground over epochs* and T8-6 — and wrote ST-45, ST-49, ST-50, ST-53, ST-56, §3.3 and §4.

Nothing was sampled: every candidate below was traced to the sentence on each side and re-read in its enclosing
subsection before it was written down. Line numbers (`l. n`) are those of the files as read on 2026-09-29.

## 2 The seam's state census

Every piece of state V06 creates, reads or changes in a sibling volume or the base, with the three things the brief asks
of it. "OK" means stated on both sides and consistent; otherwise the issue id of §3.

| state (home) | epoch behaviour | transition stage (step, participant) | undo | status |
|---|---|---|---|---|
| the product and rung of an epoch (V07 §2.1 fold; §4.11) | V06 reads the router; V07 folds with a hysteresis band | `prelude` | epoch event | ST-01, ST-02 |
| `District.fabric`, `Block.content`, `squareType` (V01) | new faces, rung-3 blocks, raised crossings | `afterGrowth` 40 `hood.fabric` | epoch event | fabric rule OK; the row ST-54; plot removal ST-53 |
| close-up plots under a raised strip (V01 §3.17.4) | removed, households re-homed | `raisedWays` (10a) and `hood.fabric` | epoch event | ST-08, ST-53 |
| `RetainingWall`, generated (base 245; V01; V07) | made or re-derived only where an epoch levels; slump; dismantle | `growth`, `ladder`, `hazards` (`raiseGrade`), `decline` | epoch event | re-derivation OK; restoration ST-10; removal hold ST-15; burial ST-34 |
| deck plots and decks (base 246; V02 §3.16) | offered, struck, repaired | `siting` tier (5), `decline`, `raisedWays` (B) | epoch event | ST-38 (op names), ST-14 (landfall), ST-56 (no condition field), ST-51 (stale rows) |
| raised way record (base 244) | founded, disused, breached, repaired, released | `raisedWays` (10a), `decline` | epoch event; removal by suppression | ST-06, ST-07, ST-32, ST-33, ST-40, ST-42 (ledger), ST-43 (why rows) |
| massing wings and tiers (V02 W1–W10, §3.15.5) | `MutationPlan` steps, tiers over epochs, `rebaseStack` | `ladder` (plan steps), `works` | epoch event | OK (minor ST-52) |
| buildings under a new raised strip (V02 §3.17 (b)) | cleared (V01, V06) or only the tall ones (V02, IN-V06-2) | `raisedWays` (7) | epoch event | ST-08, ST-09 |
| `Basement.crypt` and its rank (V03 3.7.4) | laid in the causing op; trimmed; lifted when the see returns | the causing op (`ladder`, `dossier`, `growth`) | epoch event | ST-39 |
| stored plans (V03, BCR-V3-28/29) | stale beside a levelling; re-matched by storey | any levelling op | epoch event | OK (IN-V06-4) |
| `CatacombComplex` (V04 §2.2) | count, source draw, growth cap, primary, ratchet, stagnation, closure | `afterGrowth` 10 `under.extend` | epoch event (ratchet exempt) | ST-03, ST-16, ST-18, ST-21, ST-24, ST-44, ST-55; at the hand-off up ST-58 |
| `AccessPoint` of dig, opening, overlap, mine breach, crypt (V04 §3.5.7) | drawn once by key; transitive reading | `afterGrowth` 20 `under.access` | epoch event | ST-16 (openings), ST-29 (village workings), ST-50 (callers) |
| void dwellings F6 and the undercity (V04 §3.4, §3.6, §3.10) | settle only after access; vacate on sealing; size re-read | `afterGrowth` 30 `under.undercity`; `decline` 10 `under.fade` | epoch event | ST-19 |
| underground fade (V04 §3.10) | silt, cave-in, seal, flood | `decline` 10 `under.fade` | epoch event | ST-17; a flood's reach ST-45 |
| sewer network (V04 U-NET) | laid whole at the first `Features.sewers` epoch; extended; wall drops | `afterGrowth` 10 | epoch event | laid whole at an epoch ST-50; village rung ST-18 |
| quarry and mine workings (V04 §3.5.3) | "the workings of the epoch's new extraction uses" | `afterGrowth` 10 | epoch event | ST-23 |
| foundations over older voids (V04 §3.5.0) | new piers, footings and basements fill what they meet | none named | — | ST-20 |
| arch vaults (V04 §3.5.4 (d)) | laid, collapsed, deleted with their span | `afterGrowth` 10 reconcile; the op's own batch | epoch event | OK |
| `RuinRecord` (V04 §2.2) | arrival by a dossier source; decay; removal of its source | `dossier`; `decline` | epoch event | ST-22 |
| buried system from `raiseGrade` (V04 §3.5.5) | the buried town with its walls | `hazards` | epoch event | ST-34 |
| `SkyIsland` state, area, altitude (V05 §3.15) | the island laws | `afterField` 0 `sky.islands` | epoch event | OK |
| `SkyIsland.shadeBasis`, strips (V05 §2.3a, §3.19) | written at each epoch's S6 | `field` | epoch event | OK at an epoch's S6; a raised island's basis ST-49 |
| `groundRefCm` clearance (V05 §3.15 (7)) | raised over new casters | `afterGrowth` 50 `sky.clearance` | epoch event | OK |
| removed islands and accesses (V05 §2.1, §3.2 (6)) | held; released by undo, a declaration, an `adjust` | every epoch's slot redraw | the removal's undo | ST-04, ST-05, ST-59 |
| the landfall's members (V05 §3.16) | ruined, breached, rubble, quarried | `afterField` 0 (a fall) | epoch event | ST-10, ST-12, ST-13, ST-14, ST-48 |
| the island shade mask (V06 §2.6 on V05's lattice) | one mask per arena | `field` | epoch event | ST-37, ST-46, ST-47 |
| village phases and participants (V07 §3.12) | `siting`, `growth`, `village.plan`, `village.density` | the product's overrides | epoch event | ST-28 |
| hollow ways, decks and crossings at village rungs (V07 BCR-V7-32) | the ways' decline ladder | `decline` | epoch event | ST-26, ST-27 |
| village land use (V07 `retypeLandUse`) | furlongs to pasture | `decline` (the hinterland) | epoch event | ST-25, ST-26 |
| village persistence multipliers (V07 §3.12) | church 0.3, manor 0.5 | `decline` | epoch event | ST-26 |
| house-platform walls (V07 §3.12) | standing fabric, decay, repair | `decline`, `siting` | epoch event | ST-10 (repair), ST-11 (rows), ST-27 |
| a mine working at a village rung (V07 §3.16 (4)) | breach into a cave | `afterGrowth` 20 | epoch event | ST-29 |
| an island at the hand-off down (V07 §3.12) | V05's wane over dwells | `afterField` 0 | epoch event | ST-57 |
| `EpochInputs.events` (base §4.11) | calamities typed by V06 | `hazards` | — | ST-30, ST-31 |
| a hood document (V01 J-V1.36) | "epochs not offered" | `advance` gate | — | ST-41 |
| `LifecycleEvent.detail.suppress` (base 260) | generators skip the key | every generator | the delete's undo | ST-05, ST-15, ST-59 |
| the engine's hand forms that refuse (V6 §2.8, §4.2: `repairWall`, `repairRaised`, `advance` from founding, `forkAt`/`rerunFrom`) | an epoch's op or a hand edit | — | the edit's | ST-35 |
| `Person` succession (base §10.3, BCR-V6-10) | derived by death week | none (derived) | — | ST-36 |

## 3 Issues

Severity: **blocker** (the seam cannot be built as written, or an owner rule fails on it), **major** (a contradiction or
an unwired piece a builder would hit), **minor** (wording, a restatement, a stale pointer). Kinds: `contradiction`,
`unwired`, `restatement`, `term`, `id`, `record`, `bcr`. Each issue names one owner (V01–V12, or BASE-F for a file-f item
that must change) and the exact change; where the other side must also move, the change says so.

### 3.1 Blockers

**ST-01 — The product and the rung of an epoch.** blocker · contradiction · **V06**.
V06 builds `EpochContext.product` "from §1.1's router at the epoch's target" (§3.1 (3); §3.2 row 1; the `EpochContext`
comment; W37), runs "the product whose ladder holds the epoch's target" (§3.1 (4); BCR-V6-1 (a)), hands a town down "below
1 500" (§3.3.2), and reads "the rung at the epoch's target" for the feature re-resolution (§3.2), the catacomb count
(§3.18.2 (1)) and the raised-way gate (§3.19 (C)). Volume 7 makes the product at an epoch a **fold with a hysteresis
band** — village → town only at 1 500 × (1 + `handoff.band`) = 1 575, town → village only below 1 425 — and, inside the
band, the previous product "reading its own rung row at the edge of its range (a 1 560-person village on the VILLAGE row, a
1 440-person town on the TOWN row)" (V07 §2.1 *The hand-off band*, §3.12, J-V7.68); BCR-V7-26 writes that fold into
§4.11. A 1 440-person town is a VILLAGE by V06's router and a TOWN by V07's fold: V06 would run V07's `siting` and
`growth` overrides, register `village.plan` and read the VILLAGE rows (no catacomb foundation, no sewers' TOWN law) while
V07 expects the town path; T-V7-14's 1 480 / 1 520 alternation changes product at every epoch under V06.
*Required change (V06):* everywhere above, "the router at the epoch's target" becomes **"the product and rung that V07
§2.1's fold gives at the epoch (BCR-V7-26)"**: §3.1 (3)–(4), §3.2 row 1 and its feature re-resolution, §3.3.2's last
sentence ("a town that falls below 1 425 is handed down"), §3.18.2 (1), §3.19 (C) and its rung gate, W37, the
`EpochContext.product` comment and BCR-V6-1 (a)'s runner sentence; T-V6-51 adds the 1 480 / 1 520 and 1 400 / 1 600
alternations (no hand-off, and a hand-off at every epoch). §3.3.2's clamp to the union of the ladders is unchanged.

**ST-02 — Two base texts choose the epoch's product differently.** blocker · bcr · **BASE-F**.
File f item 317 (BCR-V6-1 with BCR-V7-18 absorbed) writes into §4.11 "a step's phase is the override `ProductDecl.phases`
of the product **whose ladder holds the epoch's target** declares"; item 322 (BCR-V7-26) writes into §4.11's *The rung at
an epoch* "The product at an epoch is **the fold of V07 §2.1** (the hand-off band `handoff.band`, default 5 %)". The two
items carry no cross-reference or order note, and item 322's *Needed by* omits V06, so the coherence pass would write both.
*Required change (file f):* item 317's merged sentence reads "…of the product **the epoch's fold gives (item 322; V07 §2.1's
hand-off band)** declares…"; item 322 gains *Needed by:* V06 and the note "applied before item 317, whose runner reads this
fold".

**ST-03 — The catacomb rank cap reads the formation order; the owner's "largest under the largest cemetery" fails over
time.** blocker · contradiction · **V04**.
V04 caps "every complex but rank 1 … at `rankCap` (0.9) × the first's extent" (§3.5.1 (5)), `rank` being "set at
creation, never re-ranked" (§2.2), and `CatacombGrowth.grow(doc, epoch)` takes neither a cap nor a primary (§1b.2,
§3.10). V06 derives at every epoch the **primary** — the complex whose cemetery serves the most burials now, with a 10 %
hysteresis — grows it by its full cap and holds every other complex at 0.9 × the primary, "passing this cap and the primary
(3a) to `CatacombGrowth.grow`" (V6 §3.18.2 (3), (3a); J-V6.65; X1 to V04). V04's second round and IN-V04-1–12 never
mention a primary. Under V04's rule the main cemetery that a growing city opens outside its walls can never exceed 0.9 ×
the rank-1 churchyard complex, so g item 109 (k) (3)'s owner rule — the largest catacomb is the largest cemetery's — fails
in every history whose largest cemetery changes, and T-V6-40 (c) cannot pass.
*Required change (V04):* §3.5.1 (5) reads "Every complex but the **primary** is capped at `rankCap` × the primary's
extent — at generation the primary is rank 1; at an epoch it is volume 6's derived primary (V6 §3.18.2 (3a)); the cap only
blocks growth (`blockedBy: 'rank'`) and never removes anything"; the signature becomes `CatacombGrowth.grow(doc, epoch,
opts?: { capM2: Record<Id, number>; primary: Id })` in §1b.2 and §3.10 (defaults when absent: the need uncapped, rank 1),
its caller V06's `under.extend`; T-V4-52 gains an overtaking fixture (a newer cemetery serving more burials becomes the
largest complex over epochs).

### 3.2 Majors

**ST-04 — A count adjust releases removed islands; the one suppression rule forbids it.** major · contradiction · **V05**.
V05 releases a held slot by "(ii) a T5 `sky` declaration when no slot is free" and "(iii) an `adjust('islands.count')` to
an integer, which re-states the count after the removals and so releases every hold older than itself" (§3.2 (6); §2.1's
`removed.releasedBy`; §2.6's `removed` row; §3.15 (5), which every epoch reads; J-V5.62). J-VI.14 and file f item 260 make
the removals of every re-adding generator one mechanism: "a cap increase opens only new keys; lifted only by the delete's
undo or the user's re-add serving the same key". An integer `islands.count` is the islands' cap; under item 260 it cannot
release a hold, under V05 it releases all older ones. IN-V05-2 names V05's fields "this volume's form of the one
suppression mechanism" but leaves (iii) standing.
*Required change (V05):* keep (i) the removal's undo and (ii) — a T5 `sky` declaration re-fills the lowest held slot, which
is the user's re-add serving that key — and delete (iii): an integer `islands.count` counts every held slot as filled and
opens only slots above them; `removed.releasedBy` names only the re-adding declaration; §2.1, §2.6, §3.15 (5), J-V5.62 and
the T-V5 removal bar (l. 2419) follow.

**ST-05 — Item 260 puts island and access removals in `detail.suppress`; volume 5 stores them on the island.** major ·
record · **BASE-F**.
Item 260 widens `LifecycleEvent.detail.suppress.kind` to `…|'island'|'skyAccess'`, "an island's slot and a generated
access's ordinal (volume 5's `removedSlots`, `removedAccesses`)". Volume 5 holds the same facts as **model data on the
island record** — `SkyIsland.state 'removed'`, `removed { seq, generated, releasedBy }`, `removedAccesses: number[]` —
written by `convert removeIsland` (not a `delete`) and by the fold of an access's `delete`, and read through
`removedSlots(doc)`; volume 6's ledger reads "the `suppress` of every `delete` in the log whose event is live" (V6 §2.13),
which cannot see a `convert removeIsland`. One fact, two stores, and item 260's text names the one volume 5 does not use.
*Required change (file f item 260):* "For `island` and `skyAccess` the suppression is volume 5's record form —
`SkyIsland.removed` and `.removedAccesses`, written by `convert removeIsland` and by an access's `delete` — and no
`detail.suppress` is written for them; `raised`, `harbourChain` and `quayWall` keep `detail.suppress`; one lift rule for
all five kinds (the removal's undo, or the user's re-add serving the key; ST-04)." The `suppress.kind` union drops
`island` and `skyAccess` (and gains ST-15's `retaining` and `deckPlot`).

**ST-06 — Item 244's `source` and `foundedRung` have no producer.** major · unwired · **BASE-F**.
Item 244 gives the raised-way record `source: 'generated'|'declared'|'carried'` and `foundedRung?: Rung /* volume 6
§3.19.1 */`; J-VI.2 makes `source` the switch readers fold into their word (IN-V01-4: "`'declared'` where the record's
`source` is `declared`; a carried way keeps its word"). Volume 6 writes neither: it counts a way as declared by its
lifecycle cause (an edit, a skeleton file; V6 §3.19.1 (2)), "carried" is only a reading (a generated way at a rung below
CITY; §3.19.1 (4)–(5)), no hand-off writes anything ("rewrite no event", §3.19.1 (5); V07 J-V7.92), and §3.19.1 defines no
`foundedRung`. Two fields of the consolidated record are unwired.
*Required change (file f item 244):* `source` is **derived at read, never stored** — `declared` when the way's lifecycle
cause is an edit or a skeleton file, else `generated`; `carried` is dropped (readers that say "carried down from year N"
read the lifecycle and the epochs' rungs, V6 §4.5); `foundedRung` is dropped (the founding epoch's rung is its
`EpochRecord`'s). J-VI.2's and IN-V01-4's carried clause read so; item 447's `source` export property is the derived value.

**ST-08 — What a new raised strip clears: every building (V01, V06) or only the tall ones (V02, IN-V06-2).** major ·
contradiction · **V02**.
V02 §3.17 (b) (V2C-67 (1)): "when the user adds one, or an epoch raises one (volume 6), the buildings whose footprint meets
a pier, or meets the strip under the deck with its envelope top above the deck's underside less `raised.clearCm`, take the
base's least-disruption fates; **lower ones stay**" — carried into V06 by IN-V06-2. Against it: V01 V1-3.17.3 (2) — the
strip is "a hole in the faces it crosses … no plot, block interior, seed or hood pin lies in it"; V1-3.17.4 — a part added
by T4 or "an epoch's pass (V06 §3.19)" removes "the plots under its piers and strip"; V06 §3.19 (7) clears every building
of "its support footprints and its under-deck strip" (whole or nothing, re-housing tested); T-V6-64 — "no plot in its
strip"; and V02's own previous sentence — "its piers and the strip under its deck are obstacles the base's plots avoid
(S10, S11, volume 1), so no `H` meets them". Under V02's rule a way founded at an epoch leaves low houses in its strip that
the regeneration of the same way (V6 §3.16: one address on both paths) never places — the two paths diverge.
*Required change (V02):* §3.17 (b) drops "…with its envelope top above the deck's underside less `raised.clearCm` … lower
ones stay": every building whose footprint meets a pier or the strip takes the fates on every path (V01 V1-3.17.3 (2));
`raised.clearCm` is withdrawn (the least soffit over a crossed way is volume 11's `raisedWays.structure.clearanceCm`); X23's
clause and J-VI.5's consequence sentence for V06 follow, and IN-V06-2's clause is withdrawn (ST-09).

**ST-10 — Retaining walls are never restored over epochs, though two sibling rules rely on it.** major · unwired ·
**V06**.
(a) V05 §3.16 (4), J-V5.64 and its bar (l. 2296–2299): a landfall steps each covered retaining wall to a breached state
"keyed by the wall's lineage address so a later re-derivation … keeps it `breached` **until an epoch's clearance restores
it**". (b) V07 §3.12 (J-V7.89): once a house platform's dwelling is `cleared`, its walls decay "by stretch in the
persistence order (the `wall` rate, V06's wall rows)" and "regrowth-first rebuilds on the platform first and **repairs its
walls** at the platform's datum". V06 §3.19.4 has only made or re-derived where an epoch levels, the slump (`breach` →
`decayed`) and the salvage (`dismantle` → `ruined`); `repairRaised` covers raised ways and decks only (V6 §2.8); no epoch
op and no hand op restores a retaining-wall stretch.
*Required change (V06):* §3.19.4 gains **(6) Restoration**: a `decayed` stretch of a generated wall is re-derived intact by
the op that re-levels a plot on its high side (a regrowth tier (3) build or a rebuild on a house platform, a rung-3 re-cut)
and by the landfall clearance of ST-13; a `ruined` stretch is not restored (its stone is gone) and a re-levelling lays a
new stretch on its line; a drawn wall is restored only by hand. The hand form is an `EvolveOp` member `{ op:
'repairRetaining'; retaining: Id; stretch?: StretchRef }` (BCR-V6-5), with its registry, lifecycle, render, export and
undo rows (§2.12, §4.2, §5.1), cause `rule:regrowth` or `edit`. V07 changes its sentence per ST-11.

**ST-13 — The landfall's rubble waits for "an epoch's clearance" that no epoch phase performs.** major · unwired · **V06**.
V05 §3.16 (4)–(6) leaves every covered way with surface `rubble` "routed as `track` until the first epoch whose clearance
(§4.11's salvage demand) reaches it restores its class", every covered retaining wall breached "until an epoch's
clearance restores it", every covered plot and reservation "vacant under the rubble", and credits the salvage ledger; its
bars (l. 2289, 2298) test the clearance. V06's pool (§3.5.2) has candidates for buildings, plot boundaries, streets,
raised spans, retaining stretches and decks — none for a `fallen_island` decoration's members — and no phase restores a
rubble way's class, clears the decoration or ends the landfall's `quarry` working (the fallow ladder skips quarries,
§3.5.3). V06 never names the landfall except as a source of `scope.raised` (§2.1, §3.19.2 (4)).
*Required change (V06):* §3.5.2 gains a **landfall** candidate kind (the decoration's members, rate the street's 0.08,
weight × `min(1, demand ÷ yield)` of the salvage ledger's haul radius, charged to the `fabric` cap): a struck way member
takes back its routing class and surface (a `setAttr` pair, cause `rule:landfall`); a struck retaining-wall member is
restored by ST-10 (6); a struck plot member leaves the decoration (its ruin treatment ends; regrowth tier (3) may build);
the decoration is tombstoned when it has no member; the `quarry` face of a landfall steps to `commons` after
`land.scrubAfterYears` once the ledger's credit from it is spent. Report counts and a chronicle kind (`landfallCleared`)
follow; V05 §3.16 cites this rule.

**ST-14 — A landfall and a struck deck leave a ruined deck's plots in two different states.** major · contradiction ·
**V05**.
V06 §3.19.5 (3): a struck deck ruins what stands on it and "the deck plots are tombstoned with the deck"; (4): a repaired
deck's faces "are then offered again by (1)" (regrowth tier (5): "a deck … whose deck face holds no plot"), its buildings
new lineages; V02 §3.16 (7) and V01 V1-3.17.6 (6) agree. V05 §3.16 (4) instead demolishes each building on a covered
deck and leaves "its plot vacant with the `ruin` treatment", the plot kept. A deck the landfall ruined and an epoch later
repairs (V06 (B)) then has live vacant plots on its face, which tier (5) does not offer and tier (4) would refill as old
plots — a third path the other volumes do not design.
*Required change (V05):* §3.16 (4)'s deck clause reads "every deck plot on a covered bridge, pier, mole or quay deck falls
with its deck by item 110 (d)'s least disruption — its building demolished (cause `convert:fallIsland`) and the plot
tombstoned with the deck (volume 6 §3.19.5 (3)); a repaired deck re-offers its faces"; J-V5.64 and the landfall bar
follow.

**ST-15 — A removed generated retaining wall or deck plot does not hold through an epoch.** major · unwired · **V06**.
V05 §3.22 (7): "A removed generated raised way, retaining wall or deck plot beneath an island holds through regeneration
and epochs by the base's and volume 6's rule". V06's suppression covers raised ways, harbour-mouth chains and quay walls
only (§2.13, §3.19.3), and V06 itself explains why a tombstone alone cannot hold at an epoch: the base's collision rule
mints `~k` over it (§3.19.3's preamble). Yet §3.19.4 (1) re-derives generated walls wherever an epoch levels, and
§3.8.2 tier (5) / §3.19.5 (1) offer deck faces "whose deck face holds no plot", so a user's deletion of a generated wall or
deck plot is re-made by the next re-levelling or tier (5).
*Required change (V06):* the one suppression mechanism (J-VI.14) carries them: BCR-V6-24's `suppress.kind` gains
`'retaining'` (key: the deleted wall's chain lineage address) and `'deckPlot'` (key: the deck host's id and the deleted
plot's slot ordinal along the deck), written by the delete operator when the entity's lifecycle cause is a generation or
epoch rule; §3.19.4 (1)'s re-derivation skips a wall whose chain lineage a live suppression names, and §3.19.5 (1)'s tier
(5) skips a suppressed deck slot, each counted as held; lifted only by the delete's undo or by the user's own redraw or
re-add on that line or slot. §2.12's suppression row, §2.13's union and file f item 260 follow (with ST-05, the union
reads `'raised'|'harbourChain'|'quayWall'|'retaining'|'deckPlot'`); T-V6-62 and T-V6-63 add the removal clause. (A
tombstone keyed by line alone is rejected: §6.3's collision rule re-mints over it, the reason §3.19.3 gives.)

**ST-16 — V04's epoch-component rule re-draws the catacomb source and the openings every epoch.** major · contradiction ·
**V04**.
V04 §3.12: "At an epoch the keys take the epoch component (§6.1) **except the dig draw** … **and the crypt join**". The
catacomb source draw ("one uniform on `sewer` keyed by (`catacomb`, the face's lineage)", §3.5.1 (3)), each public
opening's draw (§3.5.7 (e)) and each overlap shaft's (§3.5.7 (a)) are not in the exception list, so at an epoch they
would take the epoch component and be re-drawn. V06 builds on their being drawn once: J-V6.52 ("one uniform per catacomb
source lineage, drawn once and compared at each epoch against the rung's chance … never by a second roll"), §3.18.1 (2d)
("V04's one uniform per (element lineage, opening kind)"), and T-V6-34's "exactly one draw per (lineage, void kind)". A
re-drawn source chance founds a catacomb by re-rolling, which the owner's ratchet and J-V6.52 exclude.
*Required change (V04):* §3.12's exception list reads "except the dig draw, the catacomb source draw (keyed by the face's
lineage), each public opening's draw and each overlap shaft's (keyed by their elements), and the crypt join — each fixed
by its key, never re-drawn"; §3.5.1 (3) and §3.5.7 (a), (e) say "no epoch component".

**ST-17 — The underground's decline: the one strike lottery (V04, base) or a participant after it (V06).** major ·
contradiction · **V04**.
V04's BCR-6 (file f item 319) writes into §4.11 that a tunnel, gallery or chamber "silts, caves in, floods or is sealed **by
that lottery** at the underground's rate" — the base's one strike lottery — and V04 §1b.2 gives `UndergroundFade.candidates`
/ `.apply` the caller "§4.11's strike lottery (BCR-6)" (also its §1.2 row, l. 158). V06 §3.5.2 takes the underground **out**
of the pool ("nor is the underground (V04's `under.fade` participant runs after the pool at this step)"), so underground
strikes neither compete with fabric strikes for the district's `fabric` cap nor enter T-V6-6's persistence order. A
builder of the pool cannot follow both.
*Required change (V04):* BCR-6's new text reads "…silts, caves in, floods or is sealed by **its own lottery at the
evolution engine's `decline` step, after the fabric pool** (volume 6's `under.fade` participant), at the underground's
rate, weights `UndergroundFade.candidates`', uncapped by the district's `fabric` cap…"; §1b.2's caller and the §1.2 row
read "volume 6's `under.fade` participant"; file f item 319 gains *Needed by:* V06.

**ST-18 — The village rung's maintenance mode is invisible to the engine's underground participants.** major · unwired ·
**V06**.
V04 §3.1 and §3.10 (C4-65 (3), J-V4.90) and V07 §3.12: at a village rung a standing sewer, catacomb, quarry, vaults or
buried town is in **maintenance mode** — "U-FADE, the arch-vault reconcile and the undercity's re-read the only changes an
inherited system sees: nothing grows, nothing new is laid"; a catacomb is stagnant with `blockedBy 'rung'`. V06 never
names the mode: `under.extend` runs "U-NET laid whole the first epoch `Features.sewers` turns on, else V04's
`SewerStrategy.extend`; `CatacombGrowth.grow` …; the quarry and mine workings …" at every epoch (§3.2's table), the feature
is "once on, never off" (§3.2), and §3.18.2 (5)'s stagnation reasons list no `'rung'`.
*Required change (V06):* §3.2's `under.extend` and `under.access` rows add "at a village rung, V04's maintenance mode
(V4 §3.1): no extension, no growth, no new working; the arch-vault reconcile only; `CatacombGrowth` records `blockedBy
'rung'`"; §3.18.2 (5) lists `'rung'` beside `sourceClosed` and `rank`; T-V6-51 checks that a town handed down grows no
underground element.

**ST-19 — Underground households after `siting`: new void dwellings have no source and a shrinking undercity's go to
tents.** major · unwired · **V06**.
(a) V04's F6 seats void dwellings "of F6's allocation (S7b (6)'s void part)" — a share of the poorest band
(`voidDwellings.share` 0.05), at every rung (V4 §3.4 F6, §3.10 *Access at an epoch*, `UnderLayoutRule.voidDwellings`);
V07 §3.16 (5) relies on it at village rungs. V06 seats underground households only through the crowding hook, on the
residual, "where `Features.sewers` is on" (§3.6 (1)), at step 14 — **before** `under.access` (step 15, order 20) opens this
epoch's accesses — and then promises that `under.undercity` (order 30) starts F6 dwellings "in the same epoch" (§3.18.1 (4),
J-V6.51) without naming whose households fill them; T-V6-52 requires ground + underground + sky = the target. (b) V04's
`UndercityEpoch.reread` vacates a shrinking neighbourhood's plots, may `clearUndercity`, and at a hand-down re-reads against
the village bound 0 (V4 §3.1, §3.10); these households leave at `afterGrowth` 30, after `siting` (13), and V06 routes none
of them (only `under.fade`'s sealing, cause `void`), so `close` sends them to the tent rung (§3.1 (5)).
*Required change (V06):* §3.18.1 (4) states the channel: F6's new dwellings at an epoch are filled by **relocating** the
poorest band's households of the same district's ground stock up to `voidDwellings.share` (each a `relocate`, within the
`use` cap), never by new households; the crowding hook's gate (§3.6 (1)) drops "where `Features.sewers` is on" for void
clusters (sewer runs keep it); and households `under.undercity` vacates are re-housed inside that participant by §4.7's
overflow pass on ground stock (the base's in-event re-homing; a tent only if that fails), reported
`households.undergroundVacated`. T-V6-52 adds an H-VOID epoch that opens an access and a clearance epoch.

**ST-20 — New footings at an epoch never collapse the older voids they meet.** major · unwired · **V06**.
V04 §3.5.0 *Foundations*: raised-way piers, retaining-wall footings and basements are foundation obstacles; "an older void
… the builders fill what they met: a gallery's stretch within reach is … `collapsed`, cause `foundation`; a chamber whose
floor the grown footprints cover by at least `collapseShare` … `collapsed`", "re-made at every derivation"; §3.5.1 (6):
"A kept element that a later town puts under a basement ring is converted `collapsed`, cause `foundation`"; T-V4-65 bars
"0 open void floor … within reach of a foundation obstacle". At an epoch V04's stages do not re-run; V06's participants
run the arch-vault reconcile, the extension, the access pass and the undercity re-read (§3.2), none of which applies the
foundation rule to `scope.built`, `scope.basementGrown`, `scope.raised` or `scope.levelled`. A pier founded over a lived
cavern chamber leaves F6's plot on a floor the pier now fills.
*Required change (V06):* `under.extend` gains a first act, **foundations over the epoch's scope**: V04's foundation rule
(the function `Foundations.apply(doc, scope, cause)` V04 exports, added to V4 §1b.2) over the new footprints and
basements of `scope.built` and `scope.basementGrown`, the supports of `scope.raised` and the footings of `scope.levelled`,
collapsing the elements within reach (cause `foundation`, event the epoch's seq); a dwelling on a collapsed floor is
vacated and its households re-housed by ST-19's in-participant rule (the participant runs after `siting`). V04 adds the
function to §1b.2 with this caller.

**ST-21 — "A closed burial face" is stated twice, differently.** major · restatement · **V04**.
V04 §3.5.1 (8): "A face is closed when its cemetery use is removed or ruined, its churchyard part removed, or, for a quarry
ossuary, when no face is left for it to relieve". V06 §3.18.2 (5) restates it with a different list — "a cemetery closes
when its use closes, its face is retyped to another land use, the dossier removes its record, or — a churchyard — its
church's use closes or leaves the plot; a church-family use arriving on that plot reopens the same churchyard (the same
lineage)". Under V04 a churchyard whose church closes but whose yard part stands is open (it keeps growing); under V06 it is
frozen (`sourceClosed`). `blockedBy` and the growth differ by which text the builder reads.
*Required change (V04, the owner of the face):* §3.5.1 (8) adopts the full list — cemetery use closed or ruined; face
retyped; dossier record removed; for a churchyard, its plot holding no live church-family use; for a quarry ossuary, no
feeding face open — and the reopening rule (a church-family use on the plot reopens the same face, its lineage kept);
V06 §3.18.2 (5) then cites V4 §3.5.1 (8) instead of restating, keeping only its epoch statements (frozen, no change of
`fill`; resumption).

**ST-22 — A ruin whose dossier source is removed: V04 removes the system, V06 says a ruin changes only by decay.** major ·
contradiction · **V04**.
V04 §2.6's `RuinRecord` row: "a source the dossier removes removes the system at the next re-derivation (item 20 (h))".
V06 §3.18.1 (5): "A ruin's ancient plan changes only by decay …, by excavation and by collapse — never re-laid", and it
states only the arrival of a later source (§3.18.1 (1)). DEFINITION §4 (tunnels "silt up, cave in or are sealed, never torn
down") and item 11 (the underground fades and is never removed) side with V06; V04's row would delete a lived ruin, with
its dwellings and accesses, at the dossier phase, with no household channel. No epoch rule exists for the case.
*Required change (V04):* the row reads "a source the dossier removes clears `RuinRecord.source.ref` (reported
`ruinSourceRemoved`); the system stays, fading by U-FADE, because the underground is never torn down (item 11; DEFINITION
§4); a blueprint ruin follows the toggle only at a re-derivation from S1"; V06 §3.18.1 (1) adds the removal case citing it.

**ST-23 — `under.extend` runs "the quarry and mine workings of the epoch's new extraction uses", which V04 never exposes.**
major · unwired · **V04**.
V06 §3.2's `under.extend` row and §3.18.1 (2b)–(c) (a working in `scope.elements`, its mine breach) call for the quarry
and mine workings an epoch's new mining or quarry use opens, and §3.18.2 (1) for a "worked-out quarry working" as an
ossuary candidate over epochs. V04 lays workings only in the tail's U-SYS (T2, §3.5.3); §1b.2 exports no epoch function for a
new working and §3.10 names none; no text says when a working becomes worked out over time.
*Required change (V04):* §3.5.3 and §1b.2 add `QuarryWorkings.extend(doc, scope, epoch)` — the workings of the mining and
quarry uses opened since the last epoch, by §3.5.3's volume law, each running U-ACCESS (a)'s overlap test in its commit —
and the worked-out rule (a working whose use closed, or whose volume law's target is reached, is worked out from that
epoch); caller V06's `under.extend`, which cites it.

**ST-24 — The catacomb count counts ground churches only; volume 5 counts island churches too.** major · contradiction ·
**V04**.
V04 §3.5.1 (3): "`churches` counts the **ground** buildings of classes `cathedral`, `great_temple`, `church` and
`parish_church` … and each monastery's church". V05 §1.3: "each church on an island still counts once toward the catacomb
count (`catacomb.churchesPer`)". V06 re-reads the count at every epoch (§3.18.2 (1)), so an institution island carrying a
cathedral changes the count by which text is built.
*Required change (V04):* §3.5.1 (3) reads "…the buildings of those classes on the ground and on every live island (V05
§1.3), each once…"; V06 §3.18.2 (1) cites it (ST-55).

**ST-25 — Two conversion ops for one land-use retype.** major · bcr · **BASE-F**.
File f item 209 (BCR-V6-5) adds `{ op: 'retypeLand'; landUse; to }` — the hinterland's fallow ladder, hand form T2
`ground`'s land-use chip — and item 431 (BCR-V7-22) adds `{ op: 'retypeLandUse'; landUse; kind; crop?; rotation? }` —
the village's furlongs to pasture, hand form T9. Both enter `ConversionOp`, both retype a `LandUse` face, with two tools and
two lifecycle rows; the integration's overlap census did not pair them (their quoted current texts differ).
*Required change (file f):* one item: `{ op: 'retypeLand'; landUse: Id; to: LandUse['kind']; crop?: string; rotation?:
{ scheme: string; slot: number } }` (V06's name, V07's optional fields), one hand form (T2 `ground`'s land-use chip;
V07 §4.1's T9 line re-pointed), one lifecycle row; item 431 is absorbed into item 209 with *Needed by:* V06, V07. V07
renames its uses of `retypeLandUse`.

**ST-26 — The village's decline rules are "the engine's, unchanged", but the engine reads none of them.** major · unwired ·
**V06**.
V07 §3.12 runs every phase except `siting` and `growth` as "the engine's, unchanged", then states village rules that only
the engine's decline and hinterland steps could apply: "the engine's strike lottery (V06 §3.5) with **the village's
persistence rows**" — a church × `epoch.persistence.church` (0.3), a manor × `epoch.persistence.manor` (0.5); a disused way
retired to a hollow way (BCR-V7-32) rather than V06's `downgradeWay`; land use by `epoch.arableSlack` (20 %), "the furlongs
farthest from the perimeter and poorest by §3.9's suitability …, one great field's worth at most per epoch", where V06
§3.5.3's fallow ladder uses `dial.hysteresis` (5 %), farthest from a live farmstead, one rung per drawn span. V06's lottery
reads only §4.11's layer rates and its own table; `ProductDeclEpoch` has only `phases` (siting, growth) and
`participants` — no product rows reach `departures`, `decline` or the hinterland.
*Required change (V06):* `ProductDeclEpoch` gains `rows?: TableId` — the product's epoch rows (V07's `village.json`
`epoch.*` cells) — read at a rung of that product by the decline step (a per-class persistence multiplier on the building
layer's rate; the way op the street candidate issues, `downgradeWay` or V07's retirement, ST-27) and by the hinterland step
(the slack, the order key and the per-epoch cap replacing §3.5.3 (1)'s); §3.5.2, §3.5.3, W37 and BCR-V6-1's
`ProductDeclEpoch` say so; V07 §3.12 cites the hook instead of "the engine's, unchanged".

**ST-27 — Hollow ways (V07) against `downgradeWay` (V06).** major · contradiction · **V07**.
V07 §3.12 and BCR-V7-32 (file f item 268) retire a disused way of **any land class** — `through`, `primary`, `secondary`,
`lane`, `alley`, `cul_de_sac`, `track`, `path` — to existence `abandoned` (a hollow way) and efface it to `decayed` "by the
street layer's rate 0.08 **per epoch**", and send a disused bridge, pier or quay "to ruined, then to stumps" by "the
base's bridge row". V06's street candidate downgrades only `lane`, `alley`, `cul_de_sac` and `track` to `path` by
`downgradeWay` (class lowered, `formerClass` kept, the line live), "primaries never downgrade" — a rule V06's viaduct
lapse depends on (§3.19.2 (2)) — every chance is per year (§4.11 *The clock* (5)), and a deck's states are `decayed` and
`ruined` (BCR-V6-26); the base has no bridge row with "stumps". BCR-V7-32 names no op the engine issues and no regrowth
op that reopens a hollow way.
*Required change (V07):* BCR-V7-32 and §3.12 (1) state the rate per year; (2) keep the wider list at village rungs — the
main street of a deserted village is the classic hollow way, and V07's disuse test already excludes a way with an entry,
approach or landing, so no route beyond the frame is cut — and state that retirement is a different op from
`downgradeWay`, whose "primaries never downgrade" stays at every rung (V06 §3.19.2 (2)'s viaduct lapse also reads a
retired carried way as lapsed); (3) name the ops —
`DeclineOp` members `{ op: 'retireWay' | 'effaceWay'; way: Id }` and the regrowth op `reopenWay` — issued by V06's street
candidate at a village rung through ST-26's product rows; (4) replace "to ruined, then to stumps" by V06's deck states
(`decayed`, `ruined`; BCR-V6-26), a bridge, pier or quay deck being struck only as V06 §3.19.5 (3) states.

**ST-28 — The participant `village.density` has no step and no order.** major · unwired · **V06**.
V07 §2.1's `ProductDecl.participants` registers "`village.plan`; and `village.density`, registered into the base product's
epochs while a superseded `VillagePlan` exists, so a re-derived old core runs the village fabric" (J-V7.67; §3.12 hand-off
up (2)). V06 §3.2's participant table lists `village.plan` (afterField 10) only; `EpochParticipant.step` and `.order` are
required, and T-V6-26 checks "every participant id of V6 §3.2's table is registered by its package" — the reverse (every
registered participant is in the table) is unchecked.
*Required change (V06):* §3.2's table adds `afterField` · 20 · `village.density` · `@plat/village` (while a superseded
`VillagePlan` exists, under any product) · "VS2's density raster re-derived on the old core's recorded inputs" (V07 §3.12);
T-V6-26 checks both directions; V07 §2.1 states the same step and order.

**ST-29 — A village's mine working never breaks into a cave at an epoch.** major · unwired · **V06**.
V07 §3.16 (4): at a village rung a mining use's outside-plot **working** (no `quarry` system, TOWN-gated) is a breach
candidate — a cavern or ruin element within `cavern.breachM` (40 m) at a depth the working reaches (`mine.workingDepthM`)
gets an `AccessPoint` at the working, cause `mineBreach`, no link record. V06 §3.18.1 (2c) looks for mine breaches only
among "a mine or quarry working in `scope.elements`" — underground elements — so a village mine opened at an epoch never
breaches (item 109 (a) (3), "mines breaking into caves").
*Required change (V06):* §3.18.1 (2c) adds "and, at a village rung, each mining use's outside-plot working opened this
epoch (V07 §3.16 (4)), tested by its depth; a breach is an `AccessPoint` at the working, cause `{ rule: 'mineBreach',
system, event }`, no link"; `EpochScope` gains `workings: Id[]` (the mining and quarry uses whose workings this epoch
opened, address order), read by (2c).

**ST-30 — `EpochInputs.events` cannot carry a calamity.** major · record · **V06**.
The base declares `events: { kind: string; params: Record<string, number> }[]` (§4.11, l. 6360). V06 §2.4 has the port carry
each calamity as `{ week, kind: 'calamity', calamity: CalamityRef }` (V08 §3.6 fills it), and §2.3's trajectory events carry
`week`; a `CalamityRef` (an id, a name, a severity word and target ids) is no `Record<string, number>`. None of BCR-V6-9,
BCR-V6-12 or V08's requests widens the type.
*Required change (V06):* a new request, BCR-V6-27, on §4.11's `EpochInputs`: `events: { week?: number; kind: string;
params?: Record<string, number>; calamity?: CalamityRef }[]` with `CalamityRef` declared beside it (V6 §2.4's type, `deaths`
included, ST-31); file f gains the item, *Needed by:* V06, V08.

**ST-31 — The calamities' deaths never reach catacomb growth.** major · unwired · **V06**.
V08 §2.6a (4) and §3.6 fill `CalamityRef.deaths` "for V04's burial growth" and hand the field to V06 (V08 X3); V06's
`CalamityRef` (§2.4) has no `deaths`, and V6 §3.18.2 (3)'s need adds only "a plague condition active in the span"; V04's
`CatacombGrowth` reads "a plague epoch's burials". The _integrate hand-off census (H1–H35) did not carry V08 X3.
*Required change (V06):* `CalamityRef` gains `deaths: number` (V08's); §3.18.2 (3)'s need adds the span's calamity deaths
to the cemeteries' burials (by `burialShare`, never to the cap); V04 §3.10's `CatacombGrowth.grow` names the input.

**ST-32 — The raised way's GeoJSON properties: V06 and item 447 name different things.** major · contradiction · **V06**.
V06 §5.3 (and BCR-V6-15 (b), item 409) exports on a raised way `plat:reason` ("its reason kind, its values and its gate,
from the creation event's why rows"), `plat:underuseSince` and "each span's and support's `plat:state`". Item 447 (J-VI.18)
exports `raisedKind`, `source`, `reason` (the word `drop`/`link`/`water`, absent when declared), `deckMinCm`, `deckMaxCm`,
support Polygons with `state` and span Polygons with `use` only. The same export would carry two `reason` meanings and
two naming schemes.
*Required change (V06):* §5.3's raised-way clause reads "the properties of item 447 (`raisedKind`, `source`, `reason` the
word), plus `underuseSince` on the way and `state` on each span Polygon (ST-33), and the creation event's why rows as
`why` (the same property the uses carry)"; BCR-V6-15 (b)'s GeoJSON clause points to item 447 for raised ways.

**ST-34 — Buried retaining walls have no record fate.** major · unwired · **V06**.
V06 §3.19.4 (1): under `raiseGrade` "the walls inside the raised region are **buried** with the old grade — they join the
buried system's features (V04's buried-system builder)"; the report counts `retaining.buried`; X14 asked V04 to take
them. V04 §3.5.5's builder lays galleries from way centrelines, `storey` chambers from footprints and `square` chambers
from squares — no wall features — and item 245's `RetainingWall.state` is `'decayed'|'ruined'`. Neither side says what the
wall record becomes.
*Required change (V06, with V04):* V06 states the op: each wall inside the region is tombstoned (cause
`convert:raiseGrade`) in the `raiseGrade` batch; V04 §3.5.5 adds "a tombstoned `RetainingWall` inside the raised region
becomes a step in the buried floor: the storey chambers on its high side take its high-side datum" (the buried town keeps
its terraces, as excavated raised towns show), its caller the `raiseGrade` op's buried-system build. `retaining.buried`
counts the tombstones.

**ST-35 — Refusals the integration ruled bends (J-VI.4) remain in V06.** major · contradiction · **V06**.
J-VI.4 (item 101 R2): a declaration is refused only where it contradicts a dossier fact or a lock; every other infeasible
declaration is bent and the dry run names the bend. V06 was not in J-VI.4's list and still refuses: `repairWall` on a
dismantled stretch ("is refused (its stone is gone)", §2.8; §3.7.5); `repairRaised` on a dismantled span or cleared
support (§2.8; §4.2 "a dismantled span is refused with the alternative 'draw a new raised way here'"); `advance` with
`from: { founding }` outside the creation flow ("refused with R2's line", §2.3); `forkAt` and `rerunFrom` before a rebase
point ("refused with that line … offer the earliest seq", §3.15.5; T-V6-22). (The dossier-bound refusals — `advance`, the
hazard mode — are dossier facts and stand.)
*Required change (V06):* each becomes its bend with the named line: the dismantled stretch is re-drawn as a new stretch on
its line by the `drawWall` path ("its stone is gone; a new stretch is built here"); the dismantled span as a new raised
part on the way's line by the hand operator ("rebuilt as a new span"); `from: founding` outside creation as "Start a new
town small" (a new document) with the present one untouched; `forkAt`/`rerunFrom` before the rebase point as the earliest
seq ("history before year N was condensed; the copy starts at year N"); §2.8's comments, §4.2's rows, §3.15.5, T-V6-11,
T-V6-22 and BCR-V6-5's text follow.

**ST-36 — BCR-V6-10's new text keys a successor by the epoch; V06 keys it by the death week.** major · bcr · **V06**.
BCR-V6-10's first new sentence (file f item 443, "as written"): "a member slot passes to ordinal `k + n × j` **at the first
epoch past its person's lifespan, with that epoch as the successor's birth epoch**". V06 §3.14 (3) (C6-35, J-V6.75): the
successor's key is "that death week as its birth week … so the same history at a 13-, 52- or 520-week cadence gives the
same successors"; the same BCR's appended paragraph adds `bornWeek`. Applied as written, §10.3 would state both.
*Required change (V06):* BCR-V6-10's sentence reads "…passes to ordinal `k + n × j` at its person's **death week**
(`birthWeek + round(52 × lifespanYears)`), the successor keyed by that week (`Person.key.bornWeek`), shown from the first
drawn week at or after it"; the appended paragraph keeps only the `bornWeek` field; file f item 443 re-reads it.

**ST-37 — One `BuildingShadeMask` per document (BCR-V6-7, BCR-V6-13) or one per arena (V6 §2.6).** major · record ·
**V06**.
V06 §2.6 ("one mask per arena": the ground and every island's arena), §2.12 ("`BuildingShadeMask` (one per arena)") and
§3.4 (8) (b) (the mask on each island's lattice, OR-ed into V05's `shadeSky`) against BCR-V6-7 (a) ("`BuildingShadeMask`
(one per document, engine only)") and BCR-V6-13 ("the `fields` block holds … **the document's one** `BuildingShadeMask`").
The base would declare one mask; the island receivers need theirs.
*Required change (V06):* BCR-V6-7 (a) reads "(one per arena — the ground's and each live island's — engine only)", and
BCR-V6-13 "the `fields` block holds … one `BuildingShadeMask` per arena (the ground's and each island's, V06 §2.6)";
file f items 264 and 275 re-read them.

**ST-38 — The deck's decline op: `dismantle` in the rule, `breach` | `ruin` in the type.** major · id · **V06**.
V06 §3.19.5 (3): "a strike **`dismantle`s** it — the deck `ruined`"; hazards leave a deck `decayed`. BCR-V6-26's
`DeclineOp` member for decks is `{ op: 'breach' | 'ruin'; deck: Id }` (breach → decayed, ruin → ruined). The strike's op
is not in the union.
*Required change (V06):* §3.19.5 (3) reads "a strike **`ruin`s** it (the deck `ruined`)", matching BCR-V6-26 (`breach` →
`decayed`, `ruin` → `ruined`); §2.12's and §4.2's rows follow.

**ST-39 — V06's "a trim never loses a vault" is not V03's rank.** major · contradiction · **V03**.
V06 §3.18.3 (3) (J-V6.62), its §2.12 crypt row and T-V6-55: a rank trim "shortens `Basement.crypt.ring` only, never
`Basement.ring`: the bays it leaves take the basement's `undercroft` role …; when the see returns or the principal's area
falls, the same rank lifts the trim and the bays regain the crypt role. A crypt-only basement … keeps its full ring as
basement." V03 3.7.4 (3): "Every other crypt's ring is **trimmed** … to at most `crypt.rankShare` × the principal's area",
the rank a closing pass that only trims; V03's `Basement.crypt.ring` is "equal to [`Basement.ring`] for a crypt-only
basement" (2.1); V03 states no lift and no capped-bay role. V06's X3 asked V03 for exactly these; V03's second round
answered only "a crypt never shrinks below an `edited` ring". A builder following V03 shortens a crypt-only church's
basement at the epoch the see moves to it — the vaults V06 promises are kept.
*Required change (V03):* 3.7.4 (3) adds "The trim shortens `Basement.crypt.ring` only; `Basement.ring` is never shortened
by the rank (for a crypt-only basement the ring keeps its extent, the trimmed bays planned as `undercroft` rooms); when the
principal's area falls or the trimmed building becomes the principal, the rank re-grows the crypt ring by step 2 within
`Basement.ring`"; 2.1's comment reads "equal to it for a crypt-only basement at its derivation".

**ST-40 — V06 restates the raised-way rows, and its copy has drifted from volume 11's.** major · restatement · **V06**.
V06 §3.19 (2)–(3) and its "rows the pass reads" table hold defaults "until V11's rows land". V11 §3.24.3 has landed them
(J-V11.55), and they differ: the viaduct's `routeClasses` are `through`, `primary`, `secondary` (V06 reads "primary or
secondary"); the elevated road's chance is `min(pMax, chance[rung, kind] × bandFactor × landmarkFactor^n ×
culture.elevatedM)` with `n ≤ landmarkMax` (2) (V06: the band value itself as the chance, × 1.5 per landmark, capped at 0.8,
no culture factor); V11 adds `aqueduct.capPerSizeMember`, `viaduct.maxSpanM` and `elevated.highGroundM`, which V06's
readings omit. Two sources for one rule.
*Required change (V06):* §3.19 (2)–(3) and the table cite V11 §3.24.3's rows and its "chance, stated once" formula
instead of restating them (keeping only the readings' geometry — `A`, `B`, the drop, the anchors, the intake — which are
V06's), the viaduct candidates reading V11's `routeClasses`; the "declared shift when they arrive" sentence is dropped.

**ST-41 — Epochs on a hood document: V01 says "not offered in volume 6's first build"; V06 has no such gate.** major ·
unwired · **V06**.
V01 J-V1.36 and its §3.10 hood-document row: a lone neighbourhood document has islands off, sewers off, no raised
generation, and "**epochs** are not offered for a hood document in volume 6's first build". V06 never mentions a hood
document: its time card, the clerk's `advance`, the CLI and a skeleton file's `history` block (§4.1, §5.3) would run the
grow path on a unit-run document that has no S4–S5 growth route.
*Required change (V06):* §4.1 adds "On a lone neighbourhood document (V01 J-V1.36) the time card, the clerk's `advance`
and the CLI's `advance` are absent, and a skeleton file's `history` block is bent to none with its line ('a neighbourhood
alone has no history yet'); `forkAt` and the timeline still work"; T-V6-23 adds the clause.

**ST-45 — How far a flood reaches underground: every element under the flooded land (V06) or the shallow ones where
volume 4 admits a flood (V04).** major · contradiction · **V06**.
V06 §3.11.3: "every underground gallery or chamber whose floor lies below the flooded water line takes the base's `flood`
op (§4.11 `DeclineOp`; volume 4's element)". Every underground element's floor lies below the ground surface, so under this
test a 60 cm river flood floods every sewer, catacomb, cavern and ruin chamber under the flooded cells, at any depth.
Volume 4 states the reach and the admission differently: a water change reaches "a void element whose ceiling lies within
`surfaceClearCm`" (V4 §4.3's water-edit row, l. 2034), and `flood` "is admitted only on an element whose floor lies below
the water table (II.6's condition table)" (V4 §2.3, l. 637), else the edit reports `W_VOID_UNDER_WATER`. Two rules for
one fate; the epoch's would drown deep catacombs that the same flood drawn by hand leaves dry.
*Required change (V06):* §3.11.3's underground clause reads "every underground gallery or chamber under the flooded cells
that volume 4's water rule reaches — its ceiling within `surfaceClearCm` of the ground (V4 §4.3) — takes `flood` where V4
§2.3 admits it (floor below the water table), else is reported `W_VOID_UNDER_WATER`; the op is drawn in the hazards
batch, cause `rule:flood`"; T-V6-17's flood fixture adds a deep catacomb that stays dry.

**ST-49 — An island raised after the epoch's S6 has no `shadeBasis`, and a load between epochs would invent one.** major
· unwired · **V05**.
`SkyIsland.shadeBasis` is a required field (V5 §2.1, l. 388: "written only by a shade evaluation, never by an island
edit"), and the evaluations are SKY's last step, field pass 2 at a re-derivation, **each epoch's S6 "for every island not
fallen, from the island as it stands when the epoch begins"**, and Update shade now (V5 §3.19 (6); §2.6, l. 710). An island
that `sky.islands` raises at an epoch (`afterField` 0, after S6; V5 §3.15 (5)) or a T5 declaration raises between epochs
(`convert raiseIsland`, which "leaves `shadeBasis` … where they were", V5 §4.2) has no basis until the next evaluation, and
the migrate column reads an absent basis as "an older document: computed at load from the island as stored". So a save
and a load after such a raise computes a strip the session never had — T-V5-21 (h) (session strips equal a load's
rebuild) fails — and V06's building mask for the new island's arena (V6 §3.4 (8) (b)) is written only at the next field
phase.
*Required change (V05):* `shadeBasis?:` is optional: a raised island has none until the next shade evaluation and casts no
strip and receives none meanwhile (the owner's lag, item 102 (e), unchanged); the load path computes a basis for a
document older than the island-basis format version only (§7.5's format version, never by absence); §2.6's
migrate cell, §3.15 (5) and §4.2's raise row say so; T-V5-21 (h) adds a raise-save-load case at an epoch and by hand.
V06 §3.4 (8) (b) adds "an island raised this epoch has no mask until the next field phase (absent = zero building shade)".

**ST-50 — Volume 4 publishes no epoch caller for the functions volume 6's participants call.** major · unwired · **V04**.
V06's `under.extend` lays "U-NET laid whole the first epoch `Features.sewers` turns on" (V6 §3.2's participant table and
*The feature set at an epoch*), calls `AccessPass.run` "over the epoch's scope", `CatacombGrowth.grow` and
`UndercityEpoch.reread` from its adapters (V6 §3.18). V04 §1b.2 lists `SewerStrategy.derive`'s caller as "the tail
scheduler, first" only and no epoch semantics for laying a whole network over standing ways mid-history (V06's X2 asked
for it; V04's second round and IN-V04-1–12 are silent); `AccessPass.run`'s callers as the tail's T2b and "every commit
that touches an access…" — no `EpochScope` input; `CatacombGrowth.grow`'s as "U-FADE at an epoch, `SewerStrategy.extend`'s
growth stage, every re-derivation"; `UndercityEpoch.reread`'s as "§4.11's epoch after the ground's step (6)" — none of
them V06's participants at their steps and orders. A builder of V04's package has no contract for the calls V06 makes.
*Required change (V04):* §1b.2's rows read — `SewerStrategy.derive`: add "V06's `under.extend` at the first epoch whose
prelude turns `Features.sewers` on (V6 §3.2): N1–N8 over the current ways as the epoch's mutation, existing entities never
re-derived, U-ACCESS (a)'s overlap test over the new runs"; `AccessPass.run(doc, scope?: EpochScope)`: add "V06's
`under.access` (`afterGrowth` 20) with the epoch's scope"; `CatacombGrowth.grow`: the caller "V06's `under.extend`
(`afterGrowth` 10) with ST-03's `opts`; every re-derivation"; `UndercityEpoch.reread`: "V06's `under.undercity`
(`afterGrowth` 30)"; `UndergroundFade`: per ST-17. §3.10's bullets cite the same callers.

**ST-53 — At an epoch the plots under a new raised strip are removed twice, and their households re-homed by two
channels.** major · contradiction · **V01**.
V06 §3.19 (7) clears the strip **before** the raised way's commit in the `raisedWays` step (10a): buildings demolished,
households displaced into the ledger (cause `clearance`) and re-housed at `siting` (13) by the regrowth-first tiers, "the
plots under the supports and the strip … re-cut by the operator's own least disruption", whole or nothing against free
capacity. V01 V1-3.17.4 says that a part added by "an epoch's pass (V06 §3.19) — removes the plots under its piers and
strip by least disruption … and their households are re-homed in V1C-01's order: D's other blocks first …, then the
first district in S7b's order", and V1-3.3.6 (3) makes `hood.fabric` (`afterGrowth` 40, after `siting`) apply
"V1-3.17.4's add path" to every district a part in `scope.raised` crosses — while the same subsection says the
participant's outputs are only `setAttr` ops of `district.fabric`, `block.content` and `block.squareType`. A builder
following V01 re-homes households after `siting` by a different order than the engine's, outside the household ledger
that T-V6-52 audits.
*Required change (V01):* V1-3.17.4's epoch clause reads "at an epoch the plots and households under the strip are volume
6's clearing (V6 §3.19 (7)): its households go through the engine's ledger and `siting`; this volume re-cuts nothing";
V1-3.3.6 (3) reads "the districts a part in `scope.raised` crosses: their fabric reading and hood pins re-derived over the
committed plot set (V1-3.17.3 (2), (5)), with no plot removal and no re-homing"; V06 §3.2's `hood.fabric` row drops "by
V01's add and remove paths" for the same words.

**ST-56 — A deck's condition has no field: `deck: Id` names no record.** major · record · **V06**.
BCR-V6-26's member `{ op: 'breach' | 'ruin'; deck: Id }` and `repairRaised`'s `{ deck: Id }` (V6 §2.8) write "decayed"
and "ruined" on "a bridge, pier, mole or quay-platform deck"; V05 §3.16 (4) ruins a covered bridge or pier deck; V01
V1-3.17.6 (6) ("a fallen or ruined deck") and V02 §3.16 (7) ("removing or ruining a deck") read the condition. In the base a bridge deck is a `Bridge` (whose `state` is
`'site'|'built'`), and a pier, mole or quay platform is a `pier` or `quay` `Way` (§4.8); item 246 gives the deck **plot** a
`host: Id` but gives no host a deck condition, and BCR-V6-26 adds only §8.2's drawing rows. No record says where the
condition lives, who writes it, or how a reader tells a charred deck from a standing one.
*Required change (V06, in BCR-V6-26):* the member's `deck` is item 246's `Plot.deck.host` — a `Bridge` id for a bridge
deck, a `pier` or `quay` way's id for a mole, pier or quay platform — and its condition is that host's lifecycle
existence: `breach` → `decayed`, `ruin` → `ruined`, `repairRaised` → the host's former existence (from the op's undo
record); `Bridge.state` is untouched (a ruined bridge is still `built` in plan, its crossing closed by the way's
existence). §2.12 gains the row "a deck's condition (the host's existence)" with its create, read (V01, V02, V05, the
renderer, §3.19.5 (1)'s tier (5)), persist, regenerate (kept), undo and migrate (absent = standing) cells; file f item
246 adds the sentence.

### 3.3 Minors

**ST-07 — A ruined span has three names.** minor · term · **V07** (with V06's wording).
Item 244 (BCR-V6-25 (b), BCR-V6-26) stores a span's and a support's condition as `state?: 'ruined'|'cleared'`, absent
meaning standing. V06 calls the `breach` op's result a "breached span" (§2.8's `repairRaised` comment, "a breached span
back to standing"; §3.19.1 (3), "every span standing, abandoned or breached"; §3.19.2 (5); §3.2 row 10a) though no span
state is `breached` and `abandoned` is the way's existence, not a span's. V07's `RaisedRead` (§2.7, l. 897–900) reads
`spans.state: 'standing'|'fallen'` and `origin: 'declared'|'generated'`, and §3.5a (3), (8) say "standing or fallen".
*Required change (V07):* `RaisedRead.spans.state` reads `'standing'|'ruined'|'cleared'` (item 244's, absent = standing),
`origin` is ST-06's derived reading, and §3.5a's "standing or fallen" reads "standing, ruined or cleared". V06 writes "a
ruined span" wherever it says "a breached span", and §3.19.1 (3)'s list reads "every span standing or ruined, none
cleared" (the way itself `abandoned` or in use).

**ST-09 — IN-V06-2 carries volume 2's low-building rule and a cause the engine does not have.** minor · id · **V06**.
IN-V06-2's last clause — "a raised way built at an epoch displaces the buildings under its strip that stand taller than
its underside less `raised.clearCm` (V2 §3.17 (b)) through the displaced pool (cause `raised`)" — names a `DisplaceCause`
that V6 §2.1's union (`'fire'|'flood'|'topple'|'contraction'|'works'|'island'|'void'|'clearance'|'redevelopment'`) does not
hold, and imports the rule ST-08 withdraws.
*Required change (V06):* IN-V06-2's clause reads "a raised way built at an epoch clears every building in its support
footprints and strip by V6 §3.19 (7), households displaced with cause `clearance`" (J-VI.5's consequence sentence
follows).

**ST-11 — The house platform's walls decay by "V06's wall rows", which are not the retaining-wall rows.** minor ·
restatement · **V07**.
V07 §3.12 (J-V7.89): a platform's wall "decays by stretch in the persistence order (the `wall` rate, V06's wall rows) to
`decayed`", and "regrowth-first … repairs its walls at the platform's datum". V06's wall rows are the enceinte's (§3.7);
a retaining wall is the pool's own `retaining` kind (V6 §3.19.4 (3): rate 0.05 per BCR-V6-26, `retaining.stretchM` 20 m,
the high-side neglect test of `retaining.holdM` and `retaining.neglectAfterYears`), and its repair is ST-10's new (6).
*Required change (V07):* the sentence cites V6 §3.19.4 (3) for the decay and V6 §3.19.4 (6) (ST-10) for the repair,
keeping only the village fact (the wall is standing fabric from the step its dwelling is `cleared`; the
`house_platform` role draws it).

**ST-12 — A landfall leaves a retaining wall `breached`, a state the record does not have.** minor · term · **V05**.
V05 §3.16 (4) and T-V5-14 (l. 2297–2298): "Every covered retaining wall … steps to `breached` over its covered length …
keeps it `breached` until an epoch's clearance restores it". Item 245's `RetainingWall.state` is `'decayed'|'ruined'`, and
V06 §3.19.4 (3)'s `breach` op leaves a stretch `decayed` (only an enceinte's stretch is `breached`, by §4.11's wall
ladder).
*Required change (V05):* "steps to `decayed` over its covered length (item 245's state, the `breach` op's result) …
keeps it `decayed` until an epoch's restoration re-derives it (V6 §3.19.4 (6), ST-10)"; J-V5.64 and T-V5-14 follow.

**ST-33 — Item 447 exports no span condition and no under-use mark.** minor · bcr · **BASE-F**.
Item 447's raised-way clause gives each span Polygon `use` only and the way's LineString `raisedKind`, `source`, `reason`,
`deckMinCm`, `deckMaxCm`; item 244's record holds `spans[].state` and `underuseSince`, which V06 §2.12 and §5.3 export
and V10's "fallen", "disused" readings need.
*Required change (file f item 447):* "each span a Polygon of kind `span` (`use`, `state` — item 244's, absent when
standing)"; the raised way's LineString adds `underuseSince` (week, absent when in use); `source` takes ST-06's derived
values (`generated` · `declared`).

**ST-42 — The ledger counts dossier-declared raised ways the dossier never declares.** minor · contradiction · **V06**.
V6 §2.13's `RaisedWayLedger.kinds.declared` comment: "raised ways whose lifecycle cause is an edit, a skeleton file or the
dossier (V08)"; V6 §3.19.1 (2) and §3.19.6: "The dossier declares no arches"; V12 and V09 record "no 'dossier' raised-way
source per V06".
*Required change (V06):* the comment reads "an edit or a skeleton file (the dossier declares none, V6 §3.19.1 (2))".

**ST-43 — The why rows' lifecycle row omits the raised way that writes them.** minor · unwired · **V06**.
V6 §2.12's `LifecycleEvent.detail.why` row creates the rows at "the use phase's `open`, `relocate`, `close`; a circuit's
creation"; V6 §3.19 (8), W31 and BCR-V6-20 also write them on a generated raised way's creation event, which V10's
raised-way provider reads (X17).
*Required change (V06):* the row's create cell adds "a generated raised way's creation (V6 §3.19 (8))" and its read cell
"V10's raised-way provider".

**ST-44 — The catacomb cap and plague factor are still called volume 4's.** minor · restatement · **V06**.
V6 §3.18.2 (3) reads "V04's share read **per year and compounded** … so the cap equals V04's per-epoch cap at the port's
52-week cadence" and "V04's `plagueNeedFactor`"; J-V6.53 and X1 say the same. J-VI.6 made `growthCapShare` volume 11's
0.01 per year compounded (V11 §3.23.8, J-V11.32), V04 now cites it (IN-V04-1) and states no per-epoch cap, and
`plagueNeedFactor` is V11's row (J-V11.56). V06 has no Integration note for J-VI.6.
*Required change (V06):* §3.18.2 (3), J-V6.53 and X1 cite V11 §3.23.8's `growthCapShare` and V11 §3.23's
`plagueNeedFactor`; the clause "equals V04's per-epoch cap at the 52-week cadence" and X1's parenthesis are dropped.

**ST-46 — "One reach law" with a cap the other side does not have.** minor · contradiction · **V06**.
V05 §3.19 (1) (BCR-V5-15 (i), J-V5.44): the reach is `c = min(cot altitude, 8)` × the caster's height, "the sampler's rule
for every model-side source … volume 6's building mask as much as the strips". V6 §3.4 (4)–(5) and §2.2's row (l. 530)
bound a building's shadow by `min(shade.maxDistM, shade.reachFactor × h)` with `maxDistM` 300 m, "the same as V05's island
strips". A 90 m spire at the day's lowest sample reaches 720 m under V05's law and 300 m under V06's; the OR-ed mask then
follows two laws.
*Required change (V06):* `shade.maxDistM` is withdrawn and `shade.reachFactor` is not a V06 row: the sweep and the march
read BCR-V5-15 (i)'s cap (8) from the sampler; §2.2's row, §3.4 (4)–(5) and §12's list follow.

**ST-47 — The mask's memory budget assumes four sample points a cell.** minor · contradiction · **V06**.
V6 §6.5: "at CITY (≈ 10 000 cells × 4 points × 9 suns) ≈ 45 KB, at METROPOLIS (≈ 40 000 cells × 36 bits) ≈ 180 KB".
The sampler's default is one point per cell and nine suns (V5 §3.19 (1), J-V5.42), which V06 reads (§3.4 (4)).
*Required change (V06):* the budget reads the sampler's layout — by default 9 bits a cell: ≈ 11 KB at CITY, ≈ 45 KB at
METROPOLIS, each island arena ≤ 5 KB — with the four-point figures kept as the bound if item 102's application raises
the points.

**ST-48 — The aqueduct's lost supply after a landfall: "the next epoch" (V05) or "at once" (V06).** minor ·
contradiction · **V05**.
V05 §3.16 (4): an aqueduct ruined by a landfall loses its terminal's supply, "read by volume 6's raised-way pass as water
need at the next epoch". V6 §3.19.2 (4): `sky.islands` (step 5) records the ruined parts in `scope.raised`, "so this
epoch's `raisedWays` reads an aqueduct's lost supply in its need ratio at once" (step 10a).
*Required change (V05):* "read by volume 6's raised-way pass at its first `raisedWays` step after the fall — the same
epoch for an epoch's fall (V6 §3.19.2 (4)), the next epoch for a hand `convert`".

**ST-51 — The deck budget "until the row lands", after it landed.** minor · restatement · **V06**.
V6 §3.8.2 tier (5) (l. 1363) and §3.19.5 (1) (l. 2430) read the deck budget "until the row lands `deck.fallbackM2` and
`deck.fallbackFloors`", and X20 still asks V11 for the `deck`, `deckOk` and `terrace` rows. V11 §3.24 has them; the
fallbacks are volume 2's build-order stopgap (V2 §3.16, X16; V11 X-V11-7), not an epoch rule.
*Required change (V06):* both places cite V11 §3.24's `deck` table and `deckOk` column as read by V2 §3.16, the "until"
clauses dropped; X20's deck, `deckOk` and `terrace` clause is marked answered.

**ST-52 — W10 listed as an epoch participant.** minor · contradiction · **V06**.
V6 §1.2's hooks table (l. 259) lists "W10 (V02 §3.9)" among the pieces "registered as `EpochParticipant`s at their named
steps (V6 §3.2)"; V02 W10: "V06 calls them through the mutator; no epoch participant of its own"; V6 §3.2's table has
none.
*Required change (V06):* the row reads "… S7c and S9b through `hood.fabric` (V01 §3.3.6) — the participants of V6 §3.2's
table, V04's functions through V6's adapters; W10 (V02 §3.9) is no participant: its steps run through S11's mutator from
the ladder's `MutationPlan` steps (V6 §3.10)".

**ST-54 — The `hood.fabric` row omits the blocks rung 3 re-cut.** minor · restatement · **V06**.
V01 V1-3.3.6 (1)–(2) and V1-3.5.11: the participant runs S7c on districts the epoch created outside S7b's hook and S9b on
"every block the epoch's ladder (step 11) re-cut or redeveloped"; V6 §3.2's row says "V01's S7c and S9b on the new faces",
and `EpochScope` (V6 §2.1) lists no re-cut blocks, though V01 says the participant finds them in `EpochContext.doc`.
*Required change (V06):* the row reads "V01's S7c on the districts the epoch created outside S7b and S9b on the blocks
the ladder's rung 3 re-cut or redeveloped (V01 §3.3.6 (1)–(2))"; `EpochScope` gains `recut: Id[]` (blocks a rung-3 op
re-cut or redeveloped this epoch, from the lifecycle entries), read by `hood.fabric`; V01 V1-3.3.6 names it as its input.

**ST-55 — The catacomb count is restated.** minor · restatement · **V06**.
V6 §3.18.2 (1) restates V04 §3.5.1 (3)'s formula and church list ("1 at TOWN; at CITY and METROPOLIS 1 + ⌊churches ÷
`churchesPer`⌋ capped (3, 5) … the cathedral, great temple and church buildings and each monastery's church").
*Required change (V06):* the bullet reads "`K` is V04 §3.5.1 (3)'s count (V11 §3.23's `count` row) at the epoch's rung
and church count, island churches included (ST-24), re-read at each epoch", keeping the epoch statements (the count
bounds foundations, J-V6.64).

**ST-57 — "No island reaches" the hand-off down, though islands wane over their dwells.** minor · contradiction ·
**V07**.
V07 §3.12's hand-off down ends "No island reaches this case: §4.11 fells an island when the CITY band is left, and TOWN
holds none". §4.11 (*Islands and the underground over epochs*), T8-6 and V05 §3.15 (6) say the opposite: a city that
leaves the CITY band loses its islands "over their dwell spans — waning, settled, fallen — never in one epoch", so a steep
fall can bring a waning or settled island to a TOWN and to the village product.
*Required change (V07):* the sentence reads "An island still waning or settled when the fold gives the village product
continues V05's steps (`sky.islands` runs at every rung, V6 §3.2); the village phases read no island, its landing
houses are ground uses, and the households it releases enter the village's siting tiers (0)–(5) through the engine's
ledger".

**ST-58 — The catacomb "step of V04's tail runs at the next derivation" after the hand-off up.** minor · contradiction ·
**V07**.
V07 §3.12 hand-off up (6): "From the first TOWN epoch the catacomb step of V04's tail runs at the next derivation", with
chances quoted from "C4-49 (3)" (a critique id the implementer does not hold, §17.1) and restated values (a churchyard
0.25, a `cemetery` plot 0.3). At an epoch V04's tail does not run; V6 §3.18.2 (1) founds complexes inside `under.extend`
in the same epoch, and the chances are V11 §3.23's rows.
*Required change (V07):* (6) reads "From the first TOWN epoch, volume 6's `under.extend` evaluates the burial faces at
every epoch (V6 §3.18.2 (1); V04 §3.5.1), a re-derivation giving the same answer from the same draws"; the chance values
and the critique citations are replaced by V11 §3.23's `CatacombRule` rows.

**ST-59 — IN-V06-7 says the suppression covers islands and accesses.** minor · contradiction · **V06**.
IN-V06-7: "BCR-V6-24's suppression covers islands and accesses too (file f)"; V6 §2.13's union and BCR-V6-24's text keep
three kinds, and ST-05 returns item 260's union to three, islands and accesses keeping volume 5's record form.
*Required change (V06):* the sentence reads "Islands and accesses keep volume 5's record form (`SkyIsland.removed`,
`.removedAccesses`) under the same lift rule — the removal's undo or the user's re-add serving the key (file f item 260
as ST-05 amends it)".

## 4 Summary counts and CONFIRMED versus PLAUSIBLE

**59 findings: 3 blockers, 38 majors, 18 minors.** By kind: 23 contradictions, 17 unwired pieces, 7 restatements, 4
records, 4 base-change-request conflicts, 2 ids, 2 terms.

| owner | blocker | major | minor | total | findings |
|---|---|---|---|---|---|
| V06 | 1 | 21 | 11 | 33 | ST-01, 09, 10, 13, 15, 18, 19, 20, 26, 28, 29, 30, 31, 32, 34, 35, 36, 37, 38, 40, 41, 42, 43, 44, 45, 46, 47, 51, 52, 54, 55, 56, 59 |
| V04 | 1 | 7 | 0 | 8 | ST-03, 16, 17, 21, 22, 23, 24, 50 |
| V05 | 0 | 3 | 2 | 5 | ST-04, 12, 14, 48, 49 |
| V07 | 0 | 1 | 4 | 5 | ST-07, 11, 27, 57, 58 |
| BASE-F (file f) | 1 | 3 | 1 | 5 | ST-02 (items 317, 322), 05 (260), 06 (244), 25 (209, 431), 33 (447) |
| V01 | 0 | 1 | 0 | 1 | ST-53 |
| V02 | 0 | 1 | 0 | 1 | ST-08 |
| V03 | 0 | 1 | 0 | 1 | ST-39 |

**What must move together.** ST-02 before ST-01 (the base's one fold, then V06's runner reading it; T-V7-14 and T-V6-51
prove both). ST-03 with ST-50 (the grow signature and its caller). ST-04, ST-05, ST-15 and ST-59 (one suppression rule:
volume 5's record form for islands and accesses, `detail.suppress` for raised ways, harbour chains, quay walls,
retaining walls and deck plots). ST-06, ST-07 and ST-33 (the raised way's derived `source` and its span
condition, in the record, the village's reading and the export). ST-08 with ST-09 and ST-53 (one clearing of a raised
strip at an epoch, V06 §3.19 (7)). ST-10 with ST-11, ST-12 and ST-13 (retaining-wall restoration and the landfall's
clearance). ST-17 with ST-18 and ST-19 (the underground's decline, its village maintenance mode, its households). ST-26
with ST-27 and ST-25 (the product's epoch rows, the hollow way and the one land retype). ST-30 with ST-31 (the calamity's
type and its deaths). The other file-f items a revision re-reads: 264 and 275 (ST-37), 268 (ST-27), 319 (ST-17), 409
(ST-32), 443 (ST-36), 246 (ST-56), and a new item for BCR-V6-27 (ST-30).

**What the seam holds.** The census rows marked OK in §2 — the island laws at `afterField` 0 and the clearance at
`afterGrowth` 50 (V05 and V06 agree on step, order, inputs and the never-written `shadeBasis`), the arch vaults over
`scope.raised` (V04's closure follows the span's condition at every derivation, V06's reconcile lays and deletes, V05 writes nothing underground), V02's
mutation steps and `rebaseStack` under Works, V03's stale plans beside a levelling, the sewer's wall drops over
`scope.levelled`, and the crypt join's one fixed draw — need no change.

**CONFIRMED versus PLAUSIBLE.** Every finding is **CONFIRMED** as a textual fact: each side's sentence was read in its
enclosing subsection and is quoted or cited by section and line in §3 (line numbers as the files stood on 2026-09-29:
V01, V02, V03, V06 and V07 last written at 02:19, V04 at 02:26, V05 at 02:28, file f at 02:29). The **consequences** named in the
findings — T-V7-14's alternation changing product at every epoch (ST-01), a newer cemetery never overtaking (ST-03),
T-V5-21 (h) failing after a raise and a load (ST-49), a 60 cm flood drowning deep catacombs (ST-45), households
re-homed outside the ledger (ST-19, ST-53) — are **PLAUSIBLE**: reasoned from the texts, with no implementation or
fixture executed (none exists at this stage). Each required change is a design choice recorded here as the seam's
recommendation, vetoable by the owning volume's revision or the whole-design retrovalidation (J84).
