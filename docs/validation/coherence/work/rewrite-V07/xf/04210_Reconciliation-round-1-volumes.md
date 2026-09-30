## Reconciliation round 1 (volumes/reconcile-V07-r1, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V07-r1; covered by the whole-design retrovalidation (J84).

This volume was reconciled in place against its eighteen seam issues (`docs/volumes/critique/seam-time-r0.md`,
`docs/volumes/critique/seam-settlements-r0.md`): 1 blocker, 6 majors, 11 minors, all **fixed**, none invalid, none on the
Fix list. Decisions J-V7.95 – J-V7.100 (vetoable). What changed, by issue:

| issue | severity | what changed (where) |
|---|---|---|
| SS-47 | blocker | Every village class row is keyed `v.<id>` (V07 §2.4's namespace paragraph, J-V7.95): 162 backticked class ids renamed across V07 §1's dependencies, V07 §1b (W18, W19, W23, W51, W60 and the trace), V07 §2.2a (`ladders.ranges.lesser`), V07 §2.4's class, crypt, archetype, supply and ladder tables, V07 §2.6, V07 §2.7, V07 §3.0, V07 §3.2 (7), V07 §3.8's class mix, V07 §3.10, V07 §3.10a, V07 §3.11's resolution order, fallback, burial, seat and deposit rows, V07 §3.12, V07 §3.13, V07 §3.16 (3)'s dig rows, V07 §4.5's describe-to-map; V07 §2.7 and BCR-V7-21: `villageForm` names a `v.` class; V07 §7's bench: a class a bar names in words is its `v.` row. Left unprefixed on purpose: the `hovel` arrangement, V11's town `chapel` row, and the history in V07 §13 (FL-2) and the integration notes. |
| SS-04 | major | V07 §2.4's ladder table: "Craft guilds (5–15), Merchant guilds (3–8)" is COUNT of `guildhall` members (V11 §3.12), a trade's GUILD record's hall one of them; a separate GUILD row for a trade's guild; V07 §3.11's DR9-with-108 GUILD wording; T-V7-35. |
| SS-14 | major | V07 §3.11 DR2: a sea threat is any key of `PortValues.threats` (V08's `threats` row); the watchtower's presence reads `Intent.defence` from V08's `threat` row (V07 §2.4's row); V07 §1b's trace split into the two rows; T-V7-13's coastal `naval` clause. |
| SS-16 | major | V07 §2.4's supply table uses V11 §3.7.1 ids — `beer`, `fodder`, `pottery`, `import`, `logs`, `firewood` — with lodging and shoeing as services in the reading column; the charcoal pit and the tannery's bark read the coppice faces, the wood yard the managed-wood faces; T-V7-33's id and provider clause. |
| SS-22 | major | T-V7-42: tiers T, H, V and W, the count read from `dossier.catalogue`'s manifest (182 at the pinned line), and the `v.` compile clause. |
| SS-27 | major | V07 §3.1 (1) and V07 §3.11 DR1: a bridge-implying record forces a brook (an estuary on a coast) whose course separates the through road's entries, `toll_bridge_dry` on a dry desert or a fixed isolated access (J-V7.97); W5 and V07 §1b's trace; T-V7-13's toll-bridge clause. |
| ST-27 | major | V07 §3.12 and BCR-V7-32 (now (a) and (b)): the street rate per year; the wider land-class list kept at village rungs as its own ops `retireWay`, `effaceWay` and the regrowth op `reopenWay` in `DeclineOp`, issued through the product's epoch rows (`ProductDecl.rows`, V07 §2.1; V6 `ProductDeclEpoch.rows`, ST-26), never `downgradeWay`; decks struck only as V06 §3.19.5 (3) states, "stumps" gone; W52, V07 §2.6, V07 §4.1's hand form, §4.3 and §4.4 rows; T-V7-30; J-V7.98. |
| ST-07 | minor | `RaisedRead.spans.state` reads `'standing'`, `'ruined'` or `'cleared'` (item 244's), `origin` the derived source of ST-06; V07 §3.5a (3) and (8), V07 §5.1's `raised.ruin`, T-V7-48. |
| ST-11 | minor | V07 §3.12 and V07 §2.6: a house platform's walls decay by V06 §3.19.4 (3) and are restored by §3.19.4 (6) (ST-10); the village facts kept. |
| ST-57 | minor | V07 §3.12's hand-off down: an island still waning or settled continues V05's steps; the village phases read no island; its households enter the village's siting tiers through the ledger. |
| ST-58 | minor | V07 §3.12 hand-off up (6): V06's `under.extend` evaluates the burial faces at every epoch from the first TOWN epoch; chances and the crypt join cite V11 §3.23.8's `CatacombRule` rows, the critique citations replaced by V04 §3.5.1; W49. |
| SS-32 | minor | V07 §3.11 DR5: the east phrase cites §7.7 item 16's quarter row, a placeholder the owner may drop (J80 Q5); T-V7-13's east clause lapses with it. |
| SS-33 | minor | V07 §3.11: chain status weights are V11 §3.7.4's `chainStatus`, keyed by V08's neutral status. |
| SS-39 | minor | V07 §2.2a gains table-cell references (J-V7.96): the `terrace` cells reference V11 §3.24.1's TOWN row, V07 §3.8a's parenthesised numbers dropped; `deck.minDepthM` removed for V11 §3.24.4's `minPlotDepthM` by deck kind (V07 §3.10a (2): the pier head qualifies by its length); the catacomb chances cite V11 §3.23.8 (with ST-58); T-V7-44, T-V7-49. |
| SS-40 | minor | V07 §2.4's ladder table lists only the readings that differ at village rungs, cites V11 §3.12 for the rest, and adds the wayside-shrine REPLACEMENT and the wells COUNT (a floor, SS-07) rows; T-V7-35. |
| SS-41 | minor | V07 §2.3 declares the landmark yard parts `net_rack`, `drying_rack`, `timber_stack` and the named beach (the `beach` run carrying the dossier's string, J-V7.99); V07 §5.1's three roles, §5.3's beach label, §5.4's `landmark_parts` layer, a V07 §2.6 lifecycle row; V07 §3.11's landmark bullet; T-V7-27. |
| SS-43 | minor | V07 §3.11 and W56 read `access_to_external_mill` as `@absent:watermill+windmill` (V11 §3.11; SS-10); DR9's pseudo-class list gains `@absent:`; V07 §1b's trace. |
| SS-46 | minor | V07 §3.11: a seated burial record enlarges the churchyard to V11 §3.6.1's `burial-ground` plot area at the church plot's band (J-V7.100); T-V7-45. |

Also in this round: V07 §1's dependency (8) lists the companions other volumes own (V11 SS-01, SS-03, SS-07; V08 SS-10; V06 ST-26,
ST-10; file f ST-06) with their fallbacks; V07 §12 records the reads. The base-change lane's own edits to this volume
(ST-25, SS-19, SS-30, ST-02) are its note in V07 §13, untouched here. At volume 11's request (its lane note of 03:58), four
of its companion halves were aligned in passing, outside the eighteen: V07 §2.4's stepped-massing classes read V11 §3.24.3
as SS-31 amends it; V07 §2.4's archetype readings are homed in V11 §3.13.2's `village` cells (SS-09); DR11's seats cite
`GovernmentRow.villageSeat` (SS-06); V07 §3.10's names cite V11 §3.20.1's village naming rows (SS-18). SS-03, SS-05 and SS-15
needed no V07 change beyond V07 §2.4's guild rows (SS-04).

