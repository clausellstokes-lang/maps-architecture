# Seam check, round 3 — evolution (V06) against every stage it changes (V01, V02, V03, V04, V05, V07, the base, file f)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-time-r3; covered by the whole-design retrovalidation (J84).

Lane `volumes/seam-time-r3`, 2026-09-29. Reconciliation round 3 of the time seam: (A) re-check every issue of round 2
(`docs/volumes/critique/seam-time-r2.md`, TT-01..TT-10) against the reconciled volumes — each must now be fixed; (B) sweep
the whole seam again, since the repairs elsewhere can break it.

PROGRESS
- §1 Method, inputs and scope: done
- §2 Round-2 re-check (TT-01..TT-10: FIXED / PARTLY / NOT FIXED / REGRESSED): done
- §3 New issues from the sweep (TU-01..TU-08): done
- §4 Summary counts and CONFIRMED versus PLAUSIBLE: done

## 1 Method, inputs and scope

**Inputs (as read on 2026-09-29, 06:36 onward).** `docs/volumes/V06-evolution.md` (4 048 lines, md5 62ab91db… — the
reconcile-V06-r3 landing), V01 (3 800, 079cc7de… — reconcile-V01-r3 with reconcile-V04-r3's counterpart edits), V02
(4 420, 77417d41…), V03 (3 087, 69209c71… — reconcile-V03-r3 with reconcile-V02-r3's one quote edit), V04 (3 708,
8c42db56…), V05 (3 466, 2599efb7…), V07 (3 707, fb232447… — with its after-LANDED X36 edit), `docs/volumes/_integrate.md`
(369, d868438e…), `docs/AMENDMENTS-2026-09-28f.md` (1 238, 38c29d39…), the base `docs/ARCHITECTURE.md` (md5 01fea21f…,
unchanged since round 0) and round 2 (`critique/seam-time-r2.md`, 301 lines). Every md5 equals the one its landing lane
logged, so no later edit sits under this read.

**How the seam was read.** (1) **Every line changed since round 2**, from the diffs of each seam file against the round-3
lanes' own pre-edit backups (`scratchpad/volumes/rcV1r3` … `rcV7r3`, `rcBFr3`), whose md5s equal round 2's inputs
(V01 cb72db1f, V02 dc951b81, V03 3d02f097, V04 08a632a2, V05 6f080c15, V06 07e78fe8, V07 3a6cc3d2, file f a85996a2,
`_integrate` a8c72fb4); the diffs were read whole (≈ 2 300 lines, `scratchpad/volumes/str3/d*.diff`). (2) **The seam's
sections whole in their current text**: V06 §2.1, §2.7, §2.8, §2.12, §3.5.2, §3.5.3, §3.6, §3.7 whole, §3.8.2, §3.9.1,
§3.9.5–§3.9.6, §3.18.1, §3.19.4, §5.1's wall rows, §6.2, W64, W75, W76, W79, T-V6-11, -51, -52, -66, -67, J-V6.31,
-90, -107, -110 – -113, X18, X36 – X38, IN-V06-4; V05 §3.15, §3.16 whole, §2.6's new rows, T-V5-14, §6's epoch rows,
§12, §13 items 23 – 25; V04 §3.10 whole, T-V4-72, -73, J-V4.109, -110, BCR-6; V07 §2.2's `epoch.rows`, §2.6 whole, §3.6,
§3.7, §3.8's join law, §3.12 whole; V01 V1-3.10.3 (6), its V1-6 sky row and note (26); V03's outside-ground row, T-V3-30
and BCR-V3-28; file f items 252, 309, 310, 574, 575; the base's `Enceinte`, `Gate`, `Tower`, `Works` records (§2.7),
the decline hooks (§2.8), *Markets over epochs* and *Dossier content across epochs* (§4.11).

**Method.** (A) Every round-2 issue was traced to the sentence its required change names, on each side of the seam, and
graded **FIXED** (both sides say one thing), **PARTLY**, **NOT FIXED** or **REGRESSED**; a FIXED issue whose repair left a
neighbouring sentence stale, or whose required change was itself incomplete, keeps FIXED and names the residual raised in
§3. (B) The sweep asked of every piece of state round 3 added or moved — the placement rule's reopenings, the enceinte's
`condition` runs and its in-use repair, the landfall's members and condition writes, the crowding hook's void seats, the
vacated households by id, the island unit run after generation, the village's market records, market halls' claims, fair
field and `rules.claimArea`, the levelled-ground reader's datum and stale readers — the brief's three questions (its epoch
behaviour, its transition step and participant, its undo) and whether a producer and a consumer exist on both sides.
Line numbers (`l. n`) are the files' as read today.

**Scope limit, stated so it is not mistaken for coverage.** Text unchanged since round 2 was judged by rounds 0–2 and
re-read this round only inside the sections listed above. Three findings sit in older text that a round-3 change made
reachable (TU-01 (c)–(d), TU-04's claim-sized classes, TU-06 (c)); they are marked so. Two round-3 findings trace to round
2's own required changes (TU-01 (a) — the `repair` Works on towers came from TT-04 (b) and TT-05's wording — and TU-05 —
TT-01's scope sentence), so this round owns them. Noticed outside the seam and left to the settlements seam: V07 §1
dependency (9)'s "**Pending**: V11 §3.12's range sentence still reads 'for its qualifier and member class'" (l. 298) is
stale since reconcile-V11-r3 landed at 06:25 (V11 SR2-06). No finding rests on a sampled line: each was re-read in its
enclosing subsection on both sides before it was written.

## 2 Round-2 re-check (TT-01 – TT-10)

**Result: 10 FIXED, 0 PARTLY, 0 NOT FIXED, 0 REGRESSED.** Every owner applied its side as round 2 required, and every
counterpart round 2 routed across lanes (V07's citation of V06's placement rule, V06's naming of V05's member forms, V04's
bar for V06's crowding hook, file f's readers for V05's record) now agrees. Four repairs left a residual — a sentence
beside the one the required change named, or a gap in the required change itself — raised in §3.

| id | sev. (r2) | owner | status | evidence now | residual |
|---|---|---|---|---|---|
| TT-01 | major | V06 | FIXED | V6 §3.8.2 *A placement on a retired way reopens it first* (l. 1527–1537), (5′)'s closing clause (l. 1546–1548), §3.5.2's *Reopened* (l. 1217), `street.reopen`'s comment (l. 494), W75 (l. 435), the report's `ways.retired`/`effaced`/`reopened` (l. 770–771), T-V6-51's batch clause (l. 3143), J-V6.107 (l. 3368), BCR-V6-18's text; V07 §3.12's *Village siting* head (l. 2215–2218) and l. 2247 cite it (V6 X36) | the rule's scope names the siting tiers only, while its own list names "a relocated use's arrival" — TU-05 |
| TT-02 | major | V04 | FIXED | T-V4-72 (f) (l. 2657), J-V4.110 (l. 2831), V4 §3.10's order line and *Access at an epoch* (l. 2070, 2141–2143), the crowding-hook bullet (l. 2145–2150), §3.4 F6 (l. 1275–1277), §1b.2's `UndercityEpoch.reread` row (l. 408); V6 §3.6 (1) and T-V6-52 agree | — |
| TT-03 | major | V05 | FIXED | BCR-V5-9 types `members?: DecorationMember[]` with the three forms on item 244's support keys (l. 2823–2830); V5 §2.6's `Decoration.members` row (l. 754); §3.16 (5) (l. 1483–1490); T-V5-14's member clause; J-V5.76; V6 §3.5.2 (l. 1239–1241) and W76 (l. 436) name the forms | — |
| TT-04 | major | V06 | FIXED | V6 §2.12's condition row (l. 849), W79 (l. 439), §2.8's `repairWall` comment (l. 745), §3.7.2 (2) (l. 1381–1383), (3) (l. 1389–1393), §3.7.3 (l. 1401–1402), §3.7.5 (l. 1427–1433), T-V6-11, J-V6.112 | §2.8's `absorbWall` comment and §5.1's absorbed-wall row still say "ruined" towers and stretches; the towers left "to the pool's building layer" — TU-01 (b)–(c); the pathway's clearing never lifts the `neglect` — TU-02 |
| TT-05 | major | V06 | FIXED | V6 §3.7.5 *A ring in use with a breach* (l. 1434–1440), the report's `walls.repairedInUse` (l. 775–776), T-V6-11's landfall fixture, J-V6.110; V05 §3.16 (4) and T-V5-14 cite it | the required change's "its towers' `repair` Works" names a Works no record holds — TU-01 (a) |
| TT-06 | minor | V06 | FIXED | (a) l. 489, 495, 1271, W75, X27; (b) T-V6-61 (l. 3153); (c) l. 867; (d) `EpochScope`'s header comment (l. 508) and W64 (l. 424); (e) §3.9.1 (2) (l. 1596–1598); (f) §3.18.3 (l. 2362–2363) | the per-field comments of `EpochScope` still name fewer readers than W64 — TU-06 (b) |
| TT-07 | minor | V04 | FIXED | (a) §3.10 *Access closures* (l. 2158–2159), T-V4-73 (c); (b) BCR-6's bullet applied after item 574 with its post-574 quote (l. 2907–2911), §3.10's parenthetical gone (l. 2069); (c) `FoundationsResult.vacated: { plot; households: Id[] }[]` (l. 869–871), §3.5.0, T-V4-65, J-V4.109 | file f item 574's note still quotes BCR-6's pre-574 text as BCR-6's — TU-07 (a) |
| TT-08 | minor | V07 | FIXED | (a) §3.12 l. 2247 ("by V6 §3.8.2 tier (5′) and its placement rule"); (b) §1 dependency (9)'s V06 fallback withdrawn (l. 290–300); (c) §3.16 (4) cites V4 §3.5.7 (a) (l. 2497–2498) | — |
| TT-09 | minor | V05 | FIXED | §3.16 (4) writes `breached` into the `condition` (l. 1455–1458), §2.6's `Enceinte.condition` row (l. 756), (8)'s undo (l. 1500–1503), §1b's landfall row, T-V5-14 | the same sentence's "every covered tower becomes `ruined`" writes no field — TU-03 |
| TT-10 | minor | BASE-F | FIXED | (a) item 574 drops the critique pointer and touches §4.5 S7b (6) (l. 357); (b) item 252 *Needed by* V04, V05, V06 (l. 174) | item 574's note (TU-07 (a)) |

## 3 New issues from the sweep (TU-01 – TU-08)

Severity as rounds 0–2: **blocker** (the seam cannot be built as written, or an owner rule fails on it), **major** (a
contradiction or an unwired piece a builder would hit), **minor** (wording, a restatement, a stale pointer). Each names one
owner (V01–V12, or BASE-F for file f and the integration ledger) and the exact change. No blocker was found.

### 3.1 Majors

**TU-01 — Wall towers and gates: a `repair` Works no record can hold, a `ruined` state they do not have, and a raised
gate dismantled under its deck.** major · record / contradiction · **V06** ((a) from round 2's own TT-04 (b) and TT-05
wording; (b) TT-04's residual; (c)–(d) older text made reachable by J-V6.112).
The base's `Works.target` is `{ building?: Id; plots?: Id[] }` (§2.7, l. 1855); `Tower` and `Gate` carry no state and no
lifecycle (l. 1778–1781); walls go in use → neglected → breached or partly dismantled on the `Enceinte` alone (§2.8's
decline hooks, l. 2012–2013), and file f item 575 draws a tower by its run ("the towers of each dismantled run as trace
discs"). V06 itself chose no Works for walls (J-V6.31, l. 3292; J-V6.90, l. 3351; V6 §3.13 (1): "Walls, ways, water and
land uses take no Works"). Yet:
(a) §3.7.5's renewed threat (l. 1429–1430) repairs "a `repair` Works per run on its towers (§4.11's decay stages
backward)"; its ring-in-use paragraph (l. 1436–1437) "with its towers' and gatehouses' `repair` Works"; §2.8's `repairWall`
comment (l. 745) "with a 'repair' Works on the run's towers"; J-V6.110 (l. 3371) likewise — a Works with no target a record
can hold, against the volume's own decision.
(b) §3.7.2 (3) (l. 1389–1390): after `absorbWall` "the towers stand as `ruined` structures until the pool's building
layer clears them" — a tower is no `Building` (the building layer's candidates, V6 §3.5.2 l. 1178–1182) and "Enceinte walls are not in
the pool" (l. 1259); §2.8's `absorbWall` comment (l. 741) still reads "its towers and remaining stretches stand
`ruined` (V6 §3.7.2)", contradicting (3)'s runs that keep their `condition`; J-V6.112 (l. 3373) "its towers left to the
pool's building layer".
(c) §5.1's absorbed-wall row (l. 2895): "the towers left standing draw as ruins until cleared; the cleared `Enceinte`
record draws nothing" — while §3.7.2 (3) keeps dismantling the cleared record's runs for decades, their state drawn by no
row.
(d) §3.7.6 (5) (l. 1498–1500): after `absorbWall` the old curtain's raised gate — "a gate whose tower
carries the deck" — "stays … until the lottery clears the old line's structures"; the lottery holds no enceinte part, and
since round 3 step (2) dismantles the cleared record's runs until every run is `dismantled`, the run through a raised gate
under a live viaduct's deck is dismantled with the deck still on it (its tower a trace disc).
*Required change (V06):* (a) §3.7.5's two paragraphs, §2.8's `repairWall` comment and J-V6.110 drop the Works: "`repairWall`
on each `breached` run … drawn at its effective week, no Works (J-V6.31, J-V6.90: the base's `Works.target` is a building or
plots); the run's towers and gates stand again with it (file f item 575: a tower and a gate read their run's
`condition`)"; (b) §3.7.2 (3) reads "… the remaining runs keep their `condition` on the `cleared` record, their towers and
gates with them (item 575: a `dismantled` run's towers drawn as trace discs), and step (2)'s dismantling continues on them —
the fortification phase keeps the cleared record in its loop — until every run is `dismantled`; a tower or a gate is no
building and never a pool candidate", the "`ruined` structures until the pool's building layer clears them" clause deleted;
§2.8's `absorbWall` comment reads "its remaining runs keep their `condition`, dismantled on by V6 §3.7.2 (2), its towers and
gates following them (item 575)"; J-V6.112's "its towers left to the pool's building layer" reads "its towers and gates
following their runs"; (c) §5.1's row reads "the runs not yet `dismantled` draw by the base's superseded-wall `trace`
treatment where no plot has built over them, their towers with them, a `dismantled` run's towers as trace discs (item 575);
the cleared record draws no label"; (d) §3.7.6 (5)'s last bullet reads "… its opening or raised gate in the old curtain
stays as a free-standing arch or gate tower: §3.7.2 (2)'s dismantling never takes the stretch that holds a raised gate
whose deck stands — the deck's support, its run left as it is — and takes it once that raised way is removed or its
crossing span `dismantled`; a wall opening under an aqueduct goes with its stretch", deleting "until the lottery clears the
old line's structures"; T-V6-11 adds "0 Works whose target is a wall, tower or gate; after `absorbWall` every run is
dismantled in time but one holding a raised gate under a standing deck"; a J-V6 row records (d). Moves with TU-03.

**TU-02 — Renewed threat clears a neglected ring's pathway but never lifts its `neglect`: the ring stays `abandoned` in
use.** major · lifecycle · **V06** (new: round 2's TT-04 (b)–(c) wording, item 575's "former state", replaced the old
comment's "back to 'in use' (decayed → generated state)"; this round owns it).
§3.7.3 (l. 1399–1401) gives a ring in long safety `neglect` at once — existence `abandoned` (the base's walls ladder,
l. 2012). §3.7.5 (l. 1431–1432) and §2.8's `repairWall` comment (l. 745) now read "the pathway is cleared when no run is
`breached`, and the record's lifecycle returns to its former state when every run is `standing` (item 575)": for a
neglected ring the state before its first breach is `abandoned`, so a repaired ring leaves the fortification phase with no
pathway and existence `abandoned`; a neglected ring whose threat returns before any breach has its pathway cleared
with nothing to repair and stays `abandoned` too. No op
lifts a `neglect` — not §2.8's union, not the base's `neglect` · `breach` · `dismantle` (§4.11, l. 6584); `repairRaised` has
the form for a raised way ("with no span, an abandoned raised way back to in use", l. 747), `repairWall` none. Every
existence reader — §8.2's wall rows and §5.1's pathway row, the `enceinte` provider and the clerk (V6 §4.5), exports — then
reads a defended, repaired ring as neglected, while §3.7.5's ring-in-use rule treats it as in use: the write that survives
one path (neglect) and is never undone on the other (renewed threat).
*Required change (V06):* §2.8's union makes `repairWall`'s `stretch?` optional — "with no stretch: the ring's `neglect`
lifted, its existence back to the state before its `neglect` (from that event's undo record) when every run is `standing`,
else `decayed`"; §3.7.5's renewed threat reads "… the pathway is cleared when no run is `breached`, and in that batch a
`repairWall` with no stretch lifts a `neglected` ring's `neglect` (cause `rule:threat`) — also when no run was ever
breached — so a ring whose pathway is cleared is never `abandoned`: in use when every run is `standing`, `decayed` while a
`dismantled` run remains"; §4.2's "repair a breach" row gains the no-stretch form on T3's inspector ("back in use"); W10 and
W79 name it; T-V6-11 adds "a neglected ring under renewed threat is in its pre-neglect existence once its pathway is
cleared (`decayed` with a dismantled run), 0 rings with no pathway in existence `abandoned`"; a J-V6 row records the choice
(over leaving the ring `abandoned` or a separate op).

**TU-03 — The landfall's towers become `ruined`, a state no `Tower` has.** major · record · **V05** (older text, reached
through TT-09's `condition` write in the same sentence).
V5 §3.16 (2) covers "every tower" (l. 1440); (4) "every covered tower becomes `ruined`" (l. 1458); (5) "the walls, towers,
bridges, raised parts and retaining walls draw by their own state rows" (l. 1490–1491); the states paragraph (l. 2163)
"the landfall's breached walls, ruined towers and bridges"; T-V5-14 (l. 2398) "the tower and the bridge `ruined`"; J-V5.11
(l. 2635) "towers and bridges ruined". The base's `Tower` (§2.7, l. 1781) carries no state and no lifecycle, §8.2 has no
ruined-tower row, V05's §2.6 no tower row, and item 575 draws a tower by its run. So `fallIsland` has no field to write and
its undo nothing to restore, and volume 6's in-use repair (V6 §3.7.5; T-V6-11, "the stretch and the gatehouse are standing
again") restores the run while the fixture still expects a `ruined` tower.
*Required change (V05):* (4) reads "… every covered tower's vertex lies inside the `breached` length (a tower covered while
its stretch is not has `breached` written over its footprint's chord along the trace): a `Tower` carries no state of its
own and draws by its run's `condition` (file f item 575), standing again with it (V6 §3.7.5)"; (5) reads "the walls with
their towers by their runs' `condition` (item 575), the bridges, raised parts and retaining walls by their own state rows";
the states paragraph reads "the landfall's breached walls with their towers, ruined bridges …"; T-V5-14 reads "the tower
inside the `breached` run, the bridge `ruined`"; J-V5.11 reads "walls breached with their towers, bridges ruined". Moves
with TU-01.

**TU-04 — The village's market records, fair field and claim-sized classes have no epoch path, and the base's market rule
puts the fair in the wrong place.** major · unwired / contradiction · **V07** (the fair field, the halls' claims and
`rules.claimArea` are round 3's; the market rank's gap is older text they made reachable).
Round 3 made a village's market a dossier record (§3.6 (4), l. 1655–1662) and added the market halls' claims ((4a),
l. 1663–1675, made by VS4), the fair field ((4b), l. 1676–1684, laid by VS5: an extramural secondary `market` reservation
by the road, common grazing between fairs) and `rules.claimArea` (read by S10's join law, §3.8 l. 1760–1762, VS4's claim
and VS6's estimate only). §2.6's row (l. 1058) creates the claims and the fair field only "VS4 … and VS5 … from S2's
manifest", and §3.12 (l. 2200–2369), the village's epochs, names none of them. At a village epoch:
(i) a `fair_ground` member that arrives (an `annual_fair` record at the `dossier` phase, or the roster) is placed by the
base's *Markets over epochs* (§4.11, l. 6742: "claimed by the epoch's S7b in the new stage or in a due district by §4.5
S7b (3)'s rule") — inside the one village district, against §3.6 (4b)'s field outside the perimeter on the common by
the road; no S5 stage runs at a village rung (§3.12, l. 2232) to take the other path;
(ii) a `market-hall`- or `cloister`-family class opening at an epoch (a `fish_market`, `slave_market` or
`monastery_or_friary` record, or the roster) goes through V6 §3.9.6's openings over standing plots S11 can bring to the class
(V6 l. 1652–1658, 1678–1689); both families' `underSize` is `refuse` (V11 l. 1514), so the class opens only on a vacant
plot already of its `rules.claimArea` area — for a cloister 3 000–8 000 m², a manor's toft at most — because the join law
that assembles slots (S10 (7), §3.8) and the rim claim (§3.6 (4a)) are generation steps with no epoch caller;
(iii) (8v)'s perimeter re-derivation (l. 2227, VS5 (1)) around new tofts along the through road can enclose the fair
field's face, turning an extramural common into a district face with no rule for its common claim;
(iv) at the hand-up the grow path clears "the hinterland's faces the new stage takes" (l. 2290–2292), with no word for
the fair field's reservation.
*Required change (V07):* §3.12 gains **Markets, halls and the fair over epochs** (a J-V7 row; a T-V7-13 village-history
clause), deciding: (a) a `fair_ground` member arriving at a village epoch is laid by §3.6 (4b)'s placement in the batch
of the phase that brings it (the `dossier` phase for a record, `siting` for a roster member) over the hinterland faces
there, each retyped `commons` by `retypeLand`, with F-V-FAIR's ladder — never by the base's *Markets over epochs* S7b (3)
claim; a record removed tombstones the reservation, its faces staying `commons` for V6 §3.5.3's ladder; (b) a
`market-hall`-family member opening at a village epoch takes §3.6 (4a)'s claim cut from the open space's rim **without**
growing the space, its area counted against `epoch.encroachShareMax` as (7v)'s encroachment is, and where that share is
spent the vacant slots at the rim joined to `A_h` by S10 (7)'s join law; a `cloister`-family member joins vacant slots up
to `claimArea.cloister` at its band by the same law (V6 §3.8.4's `amalgamate` form); V6 §3.9.6's candidate set reads
`rules.claimArea` for the two families at village rungs (a hand-off row for V06, whose §3.9.6 cites this sentence); (c) a
dossier market record, or the market law crossing, at a village epoch sets the principal `market` rank on the open space
(the first nucleus's) by `setAttr`, as the hand-up's step 3 does; (d) (8v)'s perimeter re-derivation cuts the fair field's
face out as a hole, as §3.7 (1) cuts a deep interior, so it stays extramural common; (e) at the hand-up the fair field is a
standing secondary `market` reservation — the grow path keeps it and the base's *Markets over epochs* governs it from then
on; (f) §2.6's row gains the epoch create path and its undo (the epoch's record).

**TU-05 — The placement rule covers the siting tiers, not the use phase's openings and moves or a dossier-backed use's
relocation.** major · unwired · **V06** (new: round 2's TT-01 scope sentence stopped at the tiers; this round owns it).
V6 §3.8.2's rule (l. 1527–1537) reads "At every tier (0)–(5), and in the village's (6v)–(9v) … — a `relet`, a `reoccupy`, a
`rebuild` …, a new building on a vacant or newly cut plot, a relocated use's arrival — a placement on a plot whose access
edge … is a retired hollow way … is made only after `reopenWay` restores that way". A use's arrival is no tier placement:
uses open and move in the `uses` phase — §3.9.5 (1)'s candidates are "the plots … that hold a vacant building, a cleared or
ruined trace, or no building" (l. 1652), §3.9.6's openings the same set (l. 1678–1689), §3.9.10's relaxation and split
shops likewise — and a dossier-backed use is relocated inside whichever step empties its building (the base's *Dossier
content across epochs*, l. 6459). None reads the rule, and the street test retires a way whose fronting plots are empty, so
house platforms and cleared traces remain on it (V6 §3.5.2): a use can open or move onto one with the way still retired,
leaving a live plot with no path over the ways in use — §5.3's invariant the retirement test protects — and T-V6-51's
clause "at every batch of the rise, 0 occupied plots whose only access runs over an abandoned or decayed way" (l. 3143)
fails.
*Required change (V06):* the rule's first sentence reads "At every placement an epoch makes — every siting tier (0)–(5),
the village's (6v)–(9v) (V07 §3.12), the use phase's openings and moves (§3.9.5, §3.9.6, §3.9.10's relaxation and split
shop) and a dossier-backed use's relocation (§4.11 *Dossier content across epochs*) — …"; §3.9.5 (1) and §3.9.6 add "a
candidate whose access runs over a retired way is scored as any other; its winning placement reopens the way first, in the
same batch (V6 §3.8.2's placement rule)"; T-V6-51's clause adds "a use opened or moved onto a house platform on a hollow
way"; J-V6.107's amendment names the use phase.

### 3.2 Minors

**TU-06 — V06: the island participant's budget, the scope's reader comments, and stale stored plans.** minor · budget /
wiring / term · **V06**.
(a) §6.2's `sky.islands` row (l. 3027) sums "≤ 2 ms + ≤ 4–6 ms per island" from V05 §6, whose row reads "≤ 2 ms **plus its
conversions** at the rows above" (V5 l. 2292): a `raiseIsland` at an epoch runs SKY's rows for the new island and volume
1's unit run inside the participant (V5 §3.15 (5); V01 V1-3.10.3 (6) (a) and its V1-6 row, ≈ 8–12 ms at CITY, 12–18 ms at
METROPOLIS per island, l. 2729), and a growing `resizeIsland` a receiving district's scoped re-derivation (§12.6) — none
inside the 20 / 25 ms. (b) `EpochScope`'s field comments (l. 509–516) name fewer readers than W64 and their homes: `built`
none; `raised` "the arch-vault reconcile, sky.clearance and hood.fabric"; `levelled` "the invert drops and V03's stale
marking" — while `Foundations.apply` reads `built`, `basementGrown`, `raised` and `levelled` (V4 §3.5.0 *At an epoch*;
W64) and `sky.clearance` reads `built`, `raised` and `levelled` (V5 §3.15 (7)). (c) §3.19.4 (5) (l. 2672–2674), X18
(l. 3860), IN-V06-4 (l. 3962–3964) and the "V03's stale marking" reader of W64 and §2.12's `EpochScope` row say an epoch
that levels "marks the stored plans … stale", while V03's outside-ground row (l. 922) and T-V3-30's round-3 clause
(l. 2234) stale an **unstored** plan and re-cut a **stored** one inside the changing event (BCR-V3-28) (older text, reached
through V03's round-3 trigger on a levelled platform's datum).
*Required change (V06):* (a) the row adds "plus, in an epoch that raises or grows an island, the raise's SKY rows and unit
run (V01 V1-3.10.3 (6), V1-6) and a resize's scoped re-derivation (§12.6), each at its own rows and excluded from the
century bound as a stage's own budget is" — which also meets V01's note (26) (l. 3494), so V01 changes nothing; (b) each
`EpochScope` field comment ends "— its readers W64's" (the list stated once), or lists them as W64 does; (c) the five
places read "an unstored plan beside the levelled faces goes stale and a stored one is re-cut inside the epoch event
(V03's outside-ground row; BCR-V3-28; T-V3-30)".

**TU-07 — File f: item 574's stale quote, item 310's title, item 309's readers.** minor · bcr · **BASE-F**.
(a) Item 574's note (l. 357) still gives V04 BCR-6's "quoted current text" as "(6) new faces of a new stage — where
`Features.sewers` is on, the underground crowding hook first sends"; since TT-07 (b) BCR-6 quotes the post-574 step itself
and says it applies after 574 (V4 l. 2907–2911; V04 §13 logs it for this lane). (b) Item 310's title (l. 320) "splits by
rung, and a declared split" — V07 now heads the request "a declared split, and split pairs across a rung change" (V7
l. 3279–3280). (c) Item 309's reader list (l. 318) omits two readers BCR-V5-30 now names (V5 l. 3136–3138; SLR2-12):
volume 4's buried floor under a raised grade (V4 §3.5.5 — the epoch's `raiseGrade` path, V6 §3.19.4 (1)) and its village
working's depth test (V4 §3.5.7 (a) — the village product's epochs, V6 §3.18.1 (2c)).
*Required change (file f):* (a) "Applied before item 319 (V04 BCR-6), which quotes step (6) as this item leaves it and
appends its addition after S11 of the new stage"; (b) the title reads "a declared split, and split pairs across a rung
change"; (c) "Volume 4's other readers (wall-face knots, arch-vault floors, foundation obstacles, the buried floor under a
raised grade) read it from M6-U, and its village working's depth test with the village product (V-M0 to V-M4)".

**TU-08 — V05: round 3's cross-lane halves have landed.** minor · stale pointer · **V05**.
§12's round-3 clause (l. 3261–3262, "PLAUSIBLE until the sibling lanes land") and §13 items 23–25 (l. 3360–3369) still read
as pending: item 23 landed (reconcile-V01-r3, 06:08: V1-3.10.3 (6) and V1-3.2 (5)'s parenthesis), item 24 landed
(reconcile-V06-r3, 06:17: V6 §3.5.2, W76 and §3.7.5's ring in use), item 25's first half landed (reconcile-BASE-F-r3,
06:08: item 252's *Needed by*); its second half, item 309's reader list, is TU-07 (c).
*Required change (V05):* items 23, 24 and 25's first half marked landed with those lanes (as V07 marked FL-2 and FL-3
closed), the §12 clause moved to CONFIRMED for them, item 25's second half pointing at TU-07 (c).

## 4 Summary counts and CONFIRMED versus PLAUSIBLE

**Round 2 re-checked:** 10 issues — **10 FIXED, 0 PARTLY, 0 NOT FIXED, 0 REGRESSED.** Every contract rounds 0–2 settled
still holds on both sides: the fold's product and rung, the catacomb primary, cap, ratchet and keys, the underground's own
lottery, the hollow-way ladder with its placement trigger, the landfall's typed members and the accesses reopened with
them, the crowding hook's void seats at `growth` and F6's new dwellings by relocation, `Foundations.apply` with its vacated
households by id, the enceinte's `condition` runs and the ring in use repaired.

**New from the sweep:** 8 issues — **0 blockers, 5 majors, 3 minors** (the minors carry lettered parts). Two majors trace
to round 2's own required changes (TU-01 (a)'s `repair` Works; TU-05's scope sentence) and one to a wording it chose
(TU-02's "former state"); two sit in text a round-3 addition made reachable (TU-03's towers; TU-04's village markets).

| owner | major | minor | total | issues |
|---|---|---|---|---|
| V06 | 3 | 1 | 4 | TU-01, TU-02, TU-05 (major); TU-06 (a)–(c) |
| V05 | 1 | 1 | 2 | TU-03; TU-08 |
| V07 | 1 | 0 | 1 | TU-04 (with a V06 hand-off row for V6 §3.9.6's reading of `rules.claimArea`) |
| BASE-F | 0 | 1 | 1 | TU-07 (a)–(c) (file f items 574, 310, 309) |

**What must move together.** TU-01 with TU-03 (towers and gates follow their runs: V06's repair, absorption and drawing;
V05's landfall write). TU-02 alone (V06's `repairWall` with no stretch). TU-04 with its V06 companion (V6 §3.9.6 reading
`rules.claimArea` for the two claim-sized families at village rungs; either side may land first, V06 citing V07's new
paragraph). TU-05 alone (V06). TU-06 (a) closes V01's note (26) with no V01 edit. TU-07 (c) with TU-08 (item 309's readers;
V05's item 25). Each is stated so either side can land first.

**What the seam now holds** (round 0's census rows and every row rounds 1–3 repaired): the fold's product and rung read by
every V06 step, V05's islands and V07's phases; V07's epoch rows in V06's `ProductEpochRows` shape; the hollow-way ladder
issued whole by V06 and reopened before any tier's placement; the landfall's `formerClass`, typed members, member-leaving
batches and reopened accesses; the enceinte's `condition` by run with its writers, readers and undo; the catacomb primary,
cap, ratchet, count, deaths and keys; the underground's own lottery; `Foundations.apply` at every rung; the crowding hook's
void part at `growth` and F6's new dwellings by relocation; the village working's breach; the buried floor's terraces; one
suppression rule in two record forms; the retaining wall's condition by stretch; decks as their host's existence; the
island unit run after generation inside its calling commit; the crypt rank that never shortens a basement.

**CONFIRMED versus PLAUSIBLE.** Every status in §2 and every issue in §3 is **CONFIRMED** as a textual fact: each side's
sentence was read in its enclosing subsection in the files as they stood from 06:36 on 2026-09-29 (md5s in §1), cited by
section and line, and the base's record shapes (`Works.target`, `Tower`, `Gate`, the walls' ladder, *Markets over epochs*)
were read at their lines in `docs/ARCHITECTURE.md` (md5 01fea21f…). The **consequences** named — a Works a builder cannot
target and a tower state no record holds (TU-01, TU-03), a repaired ring left `abandoned` (TU-02), a fair claimed inside
the village and a friary with no plot at an epoch (TU-04), a shop opened on a hollow way with no path
(TU-05) — are **PLAUSIBLE**: reasoned from the texts, with no implementation or fixture executed (none exists at this
stage). Each required change is the seam's recommendation, vetoable by the owning volume's next revision or by the
whole-design retrovalidation (J84).
