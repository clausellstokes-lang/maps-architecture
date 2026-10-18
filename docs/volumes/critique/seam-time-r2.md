# Seam check, round 2 — evolution (V06) against every stage it changes (V01, V02, V03, V04, V05, V07, the base, file f)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-time-r2; covered by the whole-design retrovalidation (J84).

Lane `volumes/seam-time-r2`, 2026-09-29. Reconciliation round 2 of the time seam: (A) re-check every issue of round 1
(`docs/volumes/critique/seam-time-r1.md`, TR-01..TR-25) against the reconciled volumes — each must now be fixed; (B) sweep
the whole seam again, since the repairs elsewhere can break it.

PROGRESS
- §1 Method, inputs and scope: done
- §2 Round-1 re-check (TR-01..TR-25: FIXED / PARTLY / NOT FIXED / REGRESSED): done
- §3 New issues from the sweep (TT-01..TT-10): done
- §4 Summary counts and CONFIRMED versus PLAUSIBLE: done

## 1 Method, inputs and scope

**Inputs (as read on 2026-09-29, 05:17–05:33).** `docs/volumes/V06-evolution.md` (3 910 lines, md5 07e78fe8… — the
reconcile-V06-r2 landing plus reconcile-V11-r2's SCC-34 half), V01 (3 670, cb72db1f…), V02 (4 276, dc951b81…), V03
(3 031, 3d02f097…), V04 (3 617, 08a632a2…), V05 (3 376, 6f080c15…), V07 (3 559, 3a6cc3d2…), `docs/volumes/_integrate.md`
(367, a8c72fb4…), `docs/AMENDMENTS-2026-09-28f.md` (1 167, a85996a2…), the base `docs/ARCHITECTURE.md` (md5 01fea21f…,
unchanged since round 0), and round 1 (`critique/seam-time-r1.md`, 495 lines).

**How the seam was read.** (1) **Every line that changed since round 1**, from the diffs of each seam file against the
round-2 lanes' own pre-edit backups (`scratchpad/volumes/rcV1r2` … `rcV7r2`, `rcBFr2`), whose md5s equal round 1's inputs
(V06's backup, 2c9eee46…, already holds reconcile-BASE-F-r2's one edit to V6 §2.12's retaining row, which was read in its
current text); file f was compared item by item with line pointers normalised — 25 items changed (202, 209, 213, 226, 229,
245, 268, 282, 291, 296, 305, 308, 309, 361, 427, 447, 461, 463, 510, 570–575). (2) **The seam's sections whole in their
current text**: V06 §2.1 (`ProductEpochRows`, `EpochScope`, `EpochContext`), §2.8's ops, §2.12's rows touched, §3.5.2 whole,
§3.5.3 (1), §3.6 (1), §3.7.1–§3.7.5, §3.8.2 whole, §3.11.6, §3.18 whole, §3.19.4 (1)–(3), W3, W8, W11, W40, W46, W63–W76,
T-V6-11, -17, -51, -52, -61, -66–-69, BCR-V6-28 and both round-2 notes; V04 §1b.1–§1b.2's rows touched, §2.4's
`FoundationsResult`, §3.5.0 *At an epoch*, §3.5.1 (2) and (5), §3.5.5's terraces, §3.5.7 (a)'s village working, §3.10 whole,
BCR-6, T-V4-15, -52, -56, -65, -72 – -75, J-V4.105 – J-V4.113; V05 §2.6's rows, §3.15 step 1, §3.16 (4)–(8), BCR-V5-9;
V07 §2.1, §2.2's epoch rows, §3.12 (the village siting tiers, the ways ladder, persistence, land use), §3.16 (4), §1's
dependency (9), BCR-V7-18; V01 V1-3.3.6 and V1-3.17.4; file f items 202, 209, 245, 252, 260, 268, 291, 309, 317, 319,
322, 447 and 573–575; `_integrate` J-VI.5, J-VI.14, J-VI.18 and H3. Outside the brief's list a sentence was opened only
where a seam row names it: V10's digest (TR-25's `carriedSince`), V11 §3.12 (l. 2157) and V08 §3.5.1 (b) (l. 1496) for
the village range wording V06 §3.9.1 (2) cites.

**Method.** (A) Every round-1 issue was traced to the sentence its required change names, on each side of the seam, and
graded **FIXED** (both sides say one thing), **PARTLY** (a counterpart still disagrees), **NOT FIXED** or **REGRESSED**.
(B) The sweep asked of every piece of state round 2 added or moved — the hollow-way ladder's `again` and `reopen`, the
landfall members' leaving and the accesses reopened with them, BCR-V6-28's void seats, `Foundations.apply` and its result,
the calamity deaths in the need, the buried floor's terraces, the village working's breach, the retaining wall's state
profile (item 245), the enceinte's condition profile (item 575), the village's epoch rows — the brief's three questions
(its epoch behaviour, its transition step and participant, its undo) and whether a producer and a consumer exist on both
sides. Line numbers (`l. n`) are the files' as read today.

**Scope limit, stated so it is not mistaken for coverage.** Text unchanged since round 1 was judged by rounds 0 and 1;
this round re-read it only inside the sections listed above. Two findings (TT-04's remnant clause, TT-06 (f)) sit in
text older than round 1 and were found because a round-2 change made them reachable; they are marked so. No finding
rests on a sampled line: each was re-read in its enclosing subsection on both sides before it was written.

## 2 Round-1 re-check (TR-01 – TR-25)

**Result: 25 FIXED, 0 PARTLY, 0 NOT FIXED, 0 REGRESSED.** Every owner applied its side, and the counterpart sentences
round 1 routed across lanes (V07's rows for V06's type, V05's write for V06's reader, V04's function for V06's call) now
agree. Round 2's lanes ran in parallel again, so several fixes left a stale sentence in a sibling, and three of the fixes
opened a new gap where round 1's own required change stopped short; those are §3's issues (the *residual* column).

| id | sev. (r1) | owner | status | evidence now | residual |
|---|---|---|---|---|---|
| TR-01 | major | V07 | FIXED | V07 §2.1 l. 457–458 ("the product and rung of the fold above … choose the phases"), §3.12 *Which path runs* l. 2135–2136, BCR-V7-18 l. 3155–3158 (the fold's product; item 317's absorption noted), J-V7.3, J-V7.109; no "target's rung" wording left in V01–V07 | — |
| TR-02 | major | V07 | FIXED | `VillageRungRow.epoch.rows: ProductEpochRows` (l. 500–502), §2.2's three rows keyed by class id (l. 564–567), `ProductDecl.rows` (l. 447–448), §3.12's citations (l. 2192–2197), J-V7.109 | V06 still names V07's retired cells — TT-06 (a) |
| TR-03 | major | V06 | FIXED | V6 §2.1 `street.again` / `.reopen` (l. 477–479); §3.5.2's stricter retirement test, the effacement band and the reopen rule (l. 1181–1192); §3.8.2 (5′) (l. 1487–1495); §3.19.2 (2), (5); BCR-V6-18; H-DESERT and T-V6-51; J-V6.107; V07's row fills both cells; file f item 268 *Needed by* V06 | round 1's trigger covered tier (5)'s cuts only — TT-01; V07's pointer — TT-08 (a), (b) |
| TR-04 | major | V05 | FIXED | V5 §3.16 (4) (l. 1447–1452), (8), §2.6's `formerClass` row (l. 745), §4.2's dry run, T-V5-14, J-V5.73; V6 §2.12's row names the writer | — |
| TR-05 | major | V06 | FIXED | V6 §3.5.2 *Every member leaves by the op that ends its cover* (l. 1213–1224), §2.10's `landfall` counts, W76, T-V6-66, J-V6.108 | the member record cannot hold a span or a support — TT-03 |
| TR-06 | major | V06 | FIXED | V6 §3.5.2 *Accesses under the rubble* (l. 1223–1229), `EpochScope.surfaceChanged` (l. 499), W46, W76, T-V6-66 | V04's closure sentence still says "an epoch's clearance" — TT-07 (a) |
| TR-07 | major | V04 | FIXED | `Foundations.apply` in V4 §1b.2 (l. 389), §3.5.0 *At an epoch* (l. 1334–1345), §3.10's order and bullet (l. 2054–2059, 2079–2082), the maintenance mode (l. 975–976, 2105–2108), `FoundationsResult` (l. 856–860), T-V4-65, J-V4.109 | the result's household field — TT-07 (c); V06's scope comments — TT-06 (d) |
| TR-08 | major | V04 | FIXED | V4 §3.10 *Access at an epoch* (l. 2128–2130), the crowding-hook bullet (l. 2132–2134), §1b.2's `UndercityEpoch.reread` row (l. 399), §3.4 F6 (l. 1264–1265) | the round's new bar and decision over-reach — TT-02 |
| TR-09 | major | V06 | FIXED | BCR-V6-28 (l. 3596–3617: §4.11 step (6), II.7.3 (c), §4.5 S7b (6)), V6 §3.6 (1), §3.18.1 (4), W40, J-V6.109; file f item 574 | item 574 keeps a pointer and misses S7b (6) — TT-10 (a); V04 BCR-6's quote — TT-07 (b) |
| TR-10 | major | V04 | FIXED | `grow(doc, epoch, opts?: { capM2; primary; deaths? })` (V4 §1b.2 l. 393, §3.5.1 (5) l. 1526–1531), (2)'s need (l. 1486–1488), §1b.1's deaths row (l. 482), T-V4-52, J-V4.111; V6 §3.18.2 (3) passes the deaths once | — |
| TR-11 | major | V04 | FIXED | V4 §3.5.5 *Terraces under a raised grade* (l. 1708–1716), §3.5.0 (2)'s tombstoned footing, §1b.2's builder row (l. 379), T-V4-15, J-V4.112; V6 §3.19.4 (1) agrees | — |
| TR-12 | major | V04 | FIXED | V4 §3.5.7 (a) *The village working* (l. 1742–1753), *With a scope* (l. 1827), §1b.1's `EpochScope.workings`, the T2b row, T-V4-56, J-V4.113; V6 §3.18.1 (2c) agrees | V07 §3.16 (4) still restates the test — TT-08 (c) |
| TR-13 | major | V06 | FIXED | V6 §3.18.2 (5) (l. 2292–2295) cites V4 §3.5.1 (8) for a closed and a reopened face | — |
| TR-14 | major | BASE-F | FIXED | file f item 245 (`state` a step knot profile `retaining_state_knot`, its writers, canonical form, re-derivation, undo, migration), item 291's note, item 447's one LineString per run; V6 §2.12's row (l. 841); V5 §3.16 (4) cites item 245 | V6 §2.12's writer cell omits `repairRetaining` — TT-06 (c) |
| TR-15 | minor | V06 | FIXED | every sentence the issue listed now reads "a ruined span" / "a raised way with a ruined span"; §3.19.1 (3) (l. 2482–2483); W55 (l. 401); §3.2 rows 1 and 10a (l. 938, 948) | T-V6-61 (not in the list) keeps "a breached way" — TT-06 (b) |
| TR-16 | minor | V06 | FIXED | V6 §3.4 (8) (b) (l. 1115–1117) | — |
| TR-17 | minor | V06 | FIXED | V6 §3.18.1 (1) (l. 2146–2148) | — |
| TR-18 | minor | V06 | FIXED | V6 §1.2 (l. 287), W3, W65, §3.2's `under.extend` row (l. 967) in V4 §3.10's one order; §3.18.2 (1) cites `workedOut`; §3.18.1 (2c) notes the idempotence | V04's parenthetical on the old order — TT-07 (b) |
| TR-19 | minor | V06 | FIXED | V6 §2.12's `formerClass` row (l. 817), W11, BCR-V6-7 (a) | — |
| TR-20 | minor | V01 | FIXED | V1-3.3.6 (2) reads `EpochScope.recut`, its inputs `scope.recut` and `scope.raised` (l. 907–917); V1-3.17.4's epoch clause and J-V1.89 | — |
| TR-21 | minor | V07 | FIXED | `ProductDecl.participants` (l. 444–446) with V6 §3.2's orders 10 and 20, echoed in §3.12 (l. 2140, 2211–2212); §1's dependency (1) and FL-2 cite V04 §3.5.1 (3) and V11 §3.23.8 | — |
| TR-22 | minor | V05 | FIXED | V5 §3.15 step 1 (l. 1343–1345), `rung = ctx.rung`, J-V5.74 | — |
| TR-23 | minor | BASE-F | FIXED | (a) item 573 (BCR-V6-27, STAGED M6-E); (b) item 268 *Needed by* V06, V07; (c) item 209's `repairRetaining` with the earlier of M6-sky and M6-E; (d) item 574 | — |
| TR-24 | minor | BASE-F | FIXED | `_integrate` J-VI.5 and H3 (clearing by V6 §3.19 (7), cause `clearance`), J-VI.14 (the five kinds; islands and accesses in volume 5's form), J-VI.18, and the dated note | — |
| TR-25 | minor | V10 | FIXED | V10 `MapBrief.raised[].source` `'generated'`·`'declared'` with `carriedSince?` (l. 299, 965); `info.raised.carried` unchanged | — |

## 3 New issues from the sweep (TT-01 – TT-10)

Severity as rounds 0 and 1: **blocker** (the seam cannot be built as written, or an owner rule fails on it), **major** (a
contradiction or an unwired piece a builder would hit), **minor** (wording, a restatement, a stale pointer). Each names one
owner (V01–V12, or BASE-F for file f and the integration ledger) and the exact change. No blocker was found.

### 3.1 Majors

**TT-01 — Hollow ways are reopened only before tier (5) cuts, so reoccupied and rebuilt plots on them have no access.**
major · unwired · **V06** (new; round 1's TR-03 asked only for the tier-(5) trigger, and V06 applied it as asked).
A retired hollow way leaves every router (V6 §3.5.2 l. 1182–1184; V07 §3.12 l. 2174–2176: "skipped by the trackers' merge
test and S4's router"). The street test lets a way retire while its fronting plots still hold vacant, derelict, ruined or
cleared buildings ("every fronting plot … empty, garden, orchard or field", empty meaning unoccupied). In a later rise,
V6 §3.8.2's tiers (1) `reoccupy`, (2) derelict `reoccupy`, (3) `rebuild` on cleared traces and (4) vacant plots place
households on those plots before tier (5) runs — among them V07's house platforms, which "regrowth-first rebuilds on …
first" (V07 l. 2190) — and V07's own village tiers (6v) infill and (8v) extension occupy tofts without passing through
tier (5). But (5′) (l. 1487–1495) reopens a retired way only "before tier (5) cuts a plot on a face that … a retired
hollow way bounds". So a plot whose only access edge is a retired way is occupied while the way stays out of every
router, and V6 §3.5.2's own invariant for retirement (no "occupied plot without a path", §5.3) fails at that batch. Tier
(1) already carries the precedent the hollow way lacks: "A vacant building whose rear plots a sealed passage served is
taken only after `openPassage` reopens it (the passage first, regrowth-first)" (l. 1478–1479).
*Required change (V06):* §3.8.2 gains, before (5′): "**A placement on a retired way reopens it first.** At every tier
(0)–(5), and in the village's (6v)–(9v) (V07 §3.12), a placement on a plot whose access edge (§4.7's access test) is a
retired hollow way — a way whose `abandoned` or `decayed` existence `retireWay` or `effaceWay` set — is made only after
`reopenWay` restores that way in the same batch (the way first, regrowth-first, as tier (1)'s passage rule; no cap)";
(5′) keeps its cut clause. T-V6-51's H-DESERT clause adds "at every batch of the rise, 0 occupied plots whose only access
edge is `abandoned` or `decayed`"; J-V6.107 is amended to name the placement trigger. V07's companion (its next round;
either side may land first): §3.12's platform rebuild and (6v)–(8v) cite this rule.

**TT-02 — V04's new bar and decision forbid the S7b (6) void allocation the crowding hook makes at an epoch.** major ·
contradiction · **V04** (new, from TR-08's repair).
V6 §3.6 (1) (l. 1266–1271) seats `crowdingShare` of the residual's poorest households through "S7b (6)'s underground
allocation and U-FRONT's placement … on lived runs, then reopened runs …, then **accessible** void clusters (at any rung
…)"; BCR-V6-28 (c) (l. 3614–3616) adds to S7b (6) "In an epoch, the crowding hook's void part … is allocated whether or
not `Features.sewers` is on, to the accessible cavern and ruin clusters' dwellings"; V04's own bullet agrees (l. 2132–2134:
"sends its households through S7b (6)'s underground allocation at the epoch … then in accessible void clusters"). But
T-V4-72 (f) (l. 2633) requires "an epoch that makes a cluster accessible fills F6's dwellings with volume 6's relocated
households only — **0 households allocated by S7b at an epoch**, the total unchanged", and J-V4.110 (l. 2807) records the
choice "to seat the crowding hook's households on lived, then reopened runs, then accessible void clusters, **over an S7b
(6) allocation at an epoch**". The bar fails on every epoch whose crowding hook seats anyone underground, and those seated
are new households (part of the target), not a relocation. V6's T-V6-52 is narrower and right: F6's **new** dwellings in
a cluster the epoch opens are filled by relocation only.
*Required change (V04):* T-V4-72 (f) reads "(f) F6's new dwellings in a cluster that `under.access` made accessible this
epoch are filled only by volume 6's relocation (V6 §3.18.1 (4); T-V6-52), none of their households new; the crowding
hook's S7b (6) allocation (V6 §3.6 (1); BCR-V6-28 (c)) runs at `growth`, before `under.access`, and seats only on runs
and clusters accessible before it; ground + underground + sky households equal the epoch's target"; J-V4.110 reads
"chose to fill F6's new dwellings at an epoch only by volume 6's relocation of the district's poorest-band ground
households, while the crowding hook's residual households take S7b (6)'s underground allocation at the epoch — on lived,
then reopened runs, then accessible void clusters (V6 §3.6 (1); BCR-V6-28) — over allocating F6's new dwellings through
S7b (6), because S7b does not run over standing districts at an epoch and the relocated households keep the total equal
to the target".

**TT-03 — The landfall's member list cannot hold the raised spans and supports V05 puts in it, and has no lifecycle
row though V06 now writes it.** major · record · **V05** (new, from TR-05's repair).
V5 §3.16 (5) (l. 1470–1472) makes the `fallen_island` decoration's `members` "the covered plots, land uses, reservations
and ways, and the covered raised spans, raised-way piers and retaining walls"; V6 §3.5.2 (l. 1213–1224) and W76 now
release each **span** and **support** member in the batch of the `repairRaised` or `dismantle` that ends its cover, and
V6 §2.10 counts `landfall.raised`. But BCR-V5-9 (l. 2788–2793) types the field `members?: Id[] /* the plots and land uses
a fallen island covers */`: a span and a support have no Id (file f item 244: `supports: { key; ring; state? }[]`, `spans:
{ a; b; … }[]`), and V6's `SpanRef` is "never stored in a record" (V6 l. 854). So the members V05 names cannot be stored,
and V06's per-span release has no key to remove. V5 §2.6 lists `Decoration.name` and `.source` (l. 744) but no row for
`members`, which V06's clearance writes by `setAttr` in every member-leaving batch and V04 §3.10's closures read. File f
item 252 (BCR-V5-9) is *Needed by* V05 only.
*Required change (V05):* BCR-V5-9's field reads `members?: DecorationMember[] /* what a fallen island covers (V05 §3.16
(5)) */` with `type DecorationMember = Id /* a plot, land use, reservation, way or retaining wall */ | { raised: Id; span:
[number, number] /* the span between two support keys, item 244's a and b */ } | { raised: Id; support: number /* item
244's support key */ }` — keys a re-derivation of the raised way keeps (support keys are stable, item 244); V5 §2.6 gains
the row `Decoration.members` — created by `fallIsland`; written by V6 §3.5.2's member-leaving `setAttr` in the batch of
whichever op ends a member's cover; read by §8.2's `fallen` row, V6 §3.5.2's landfall candidate, V4 §3.10's closures and
the clerk; persisted model data; the writing event's undo restores the prior list; absent = none — and V5 §3.16 (5) cites
the type. V06's companion (its next round): §3.5.2 and W76 name the three member forms. File f item 252's *Needed by*:
TT-10 (b).

**TT-04 — Item 575's wall condition profile is unwired in V06.** major · unwired · **V06** (new: item 575 was added by
reconcile-BASE-F-r2 at 04:55, while reconcile-V06-r2 was open; its remnant clause (d) is older text).
File f item 575 gives `Enceinte` a `condition` step profile (`wall_state_knot`: `standing` · `breached` · `dismantled`),
written by `DeclineOp`'s `breach` and `dismantle` over their stretch, by V05's landfall (→ `breached`) and by V06's
`repairWall` (→ `standing`), with the record's `lifecycle` "`decayed` while any run is not `standing`; back to its former
state when `repairWall` leaves every run `standing`"; *Needed by* V05, V06. V06 names the field only in the base-change
lane's note (l. 3790–3791). Its body: §2.8's `repairWall` comment (l. 722) reads "a breached stretch back to 'in use'
(decayed → generated state)" — a per-stretch lifecycle the record does not have, and a return item 575 allows only when
every run is standing; §3.7.3 (l. 1370–1371) and §3.7.2 (2) issue `breach` and `dismantle` with no field named; §3.7.5
(l. 1396–1399) repairs "each breached stretch in address order" and clears the pathway "when no breach remains" with no
stored breach to enumerate — TR-14's defect, for walls; §2.12 has no row for the condition; and §3.7.2 (3) (l. 1361–1362)
leaves "the towers and any remaining stretch" standing "as `ruined` structures until the lottery clears them", though item
575 has no `ruined` value and V6 §3.5.2 (l. 1232) keeps enceinte walls out of the pool.
*Required change (V06):* (a) §2.12 gains the row: "an enceinte's condition by run (file f item 575's `condition`, a step
knot profile `wall_state_knot`: standing · breached · dismantled) | written by `breach` (§3.7.3 and the pathway's),
`dismantle` (§3.7.2 (2)), V05's landfall (→ breached), `repairWall` (→ standing), each by knots at its `StretchRef`'s ends
placed by `splitThrough` | read by §3.7.5's repair (the `breached` runs, in chain order), the pathway's end, the renderer's
gap glyph, §11.1's per-run LineStrings and the clerk | persisted model data (knot rows) | kept through a re-derivation as
item 575 states | the op's undo restores the former profile | absent = standing"; (b) §2.8's comment reads "a `breached`
run of the ring's `condition` back to `standing` (item 575) with a `repair` Works on the run's towers; the record's
lifecycle returns to its former state when every run is `standing`; on a `dismantled` run it bends …"; (c) §3.7.5 reads
"… `repairWall` on each `breached` run of the ring's `condition`, in chain order from its first vertex … the pathway is
cleared when no run is `breached`"; (d) §3.7.2 (3) reads "… the towers stand as `ruined` structures until the pool's
building layer clears them, and the remaining runs keep their `condition` on the `cleared` record, step (2)'s dismantling
continuing on them until every run is `dismantled`" (§3.5.2's exclusion of enceinte walls from the pool stands).

**TT-05 — A landfall's breach of a ring in use is never repaired.** major · unwired · **V06** (new).
V5 §3.16 (4) (l. 1443–1445) steps "every covered wall stretch and gatehouse … to `breached` over its covered length" and
every covered tower to `ruined`, whatever the ring's pathway. V06 repairs breaches only in §3.7.5, for "A ring with
pathway cause `neglected` or `contracted` whose threat rises back to `walls.threatMin`". A ring in use — no pathway, its
threat above `walls.neglectThreatMax` — has no repair path, and V05 names none (its landfall hands only ways, retaining
walls, plots and reservations to V6 §3.5.2's clearance). A defended town under a fallen island keeps its gap and its
ruined gatehouse for ever, while the same landfall's retaining walls (`repairRetaining`, ST-10), spans and decks
(`repairRaised`) are restored — the write one path restores and another ghosts.
*Required change (V06):* §3.7.5 gains "**A ring in use with a breach.** A ring with no pathway whose `condition` (item
575) holds a `breached` run while its threat exceeds `walls.neglectThreatMax` is repaired at the next `fortification`
phase: `repairWall` on each `breached` run in chain order with its towers' `repair` Works, `fabric` cap charged; a
`dismantled` run stays a gap (J-V6.16); a locked or pinned ring is held"; the report gains `walls.repairedInUse`; T-V6-11
adds a fixture (a landfall over a live ring's stretch and gatehouse: both repaired at the next epoch, a dismantled run
left a gap); a J-V6 row records the choice. V05's citation: TT-09.

### 3.2 Minors

**TT-06 — V06's stale citations and one restatement.** minor · term / restatement · **V06**.
(a) V07's retired cell names: `ProductDeclEpoch.rows`' comment (l. 475, "`village.json`'s `epoch` block"), the `hinterland.slack`
comment (l. 480) and §3.5.3 (1) (l. 1244) (both "V07's `epoch.arableSlack`"). (b) T-V6-61 (l. 3095): "a breached way whose
reason is live" (TR-15's wording, outside its list). (c) §2.12's retaining-state row (l. 841): the writer cell omits
`repairRetaining` (item 245's writer, a `decayed` run back to `standing`). (d) `EpochScope`'s comment (l. 493, "read by
under.access") and W64's consumers omit `Foundations.apply`, which reads `built`, `basementGrown`, `raised` and
`levelled` as `under.extend`'s first act (V4 §3.5.0 *At an epoch*). (e) §3.9.1 (2) (l. 1544) clamps an unnumbered record at
an epoch "into V11 §3.12's range for its qualifier and member class"; at the village rungs that range is V07 §2.4's row,
now keyed by step type (V07 J-V7.105; V08 l. 1496 already reads so; V11 l. 2157 keeps the old words — the settlements
seam's). (f) §3.18.3 (l. 2305–2306) restates V11's crypt column as "`basement` for a church, `never` otherwise", which
V07 §2.4's `v.parish_church` (`basement`, chance 0.1) contradicts (older text, reached through TR-21's `v.` key).
*Required change (V06):* (a) "V07 §2.2's `epoch.rows` cell" and "V07's `epoch.rows.hinterland.slack`, 20 %"; (b) "a raised
way with a ruined span whose reason is live is repaired …"; (c) the writer cell adds "`repairRetaining` (→ standing, V6
§3.19.4 (6))"; (d) the comment reads "read by `under.extend` (`Foundations.apply`, the arch-vault reconcile, the invert
drops) and `under.access` (V6 §3.18)" and W64's consumer cell adds `Foundations.apply`; (e) "… into V11 §3.12's range —
at the village rungs V07 §2.4's row for its step type and member class"; (f) "volume 11's three-valued `crypt` column
(BCR-V11-13; the village rows' by V07 §2.4)", no values restated.

**TT-07 — V04: the closure's reopening, BCR-6's quote, and the vacated households.** minor · wiring / record · **V04**.
(a) §3.10 *Access closures* (l. 2142) reopens a landfall-bricked access "until an epoch's clearance restores that host";
V6 §3.5.2 now reopens it in the batch in which its host leaves the decoration, by whichever op ends the cover, at an epoch
or by hand (V06's X33). (b) BCR-6's second bullet (l. 2882) quotes step (6)'s text before BCR-V6-28, which file f item 574
applies first; and §3.10's parenthetical (l. 2056–2057, "so volume 6's row may list it after the workings") is stale now
V06 lists the reconcile second. (c) `FoundationsResult.vacated` (l. 859) returns `households: number`, but V6 §3.18.1 (4),
(6) re-house the vacated households by name inside the participant.
*Required change (V04):* (a) "… until the batch in which that host leaves its `fallen_island` decoration — whichever op
ends its cover, at an epoch or by hand (V6 §3.5.2) — when it returns to `open` …"; (b) BCR-6's bullet adds "applied after
file f item 574 (BCR-V6-28): its current text is step (6) as that request leaves it", and the parenthetical is deleted;
(c) `vacated: { plot: Id; households: Id[] }[]`.

**TT-08 — V07: the reopening pointer, a dead fallback, and a restated breach test.** minor · wiring / restatement ·
**V07**.
(a) §3.12 (l. 2177): "`reopenWay` … in V6 §3.8's tier order" (V06's X32 asks for the tier). (b) §1's dependency (9)
(l. 287–289) keeps a fallback for V06's TR-03 half ("a struck hollow way stays `abandoned` (no effacement) and the
village's `siting` override issues `reopenWay` in its regrowth-first tier"); V06 landed that half (reconcile-V06-r2,
05:04), so the fallback now contradicts the design it waited for. (c) §3.16 (4) (l. 2423–2429) restates the village
working's breach test, which V04 now states once (V4 §3.5.7 (a) *The village working*, J-V4.113) with the nearest element
per void system, the key and the cause's `event` that V07's sentence lacks.
*Required change (V07):* (a) "… by V6 §3.8.2 tier (5′) and its placement rule (TT-01)"; (b) the V06 clause of the
fallbacks is deleted; (c) §3.16 (4) keeps the working and `mine.workingDepthM` and reads "is tested by V4 §3.5.7 (a) *The
village working*", no test restated.

**TT-09 — V05 names no field for the landfall's wall breach.** minor · wiring · **V05** (with TT-04, TT-05).
V5 §3.16 (4) (l. 1443–1445) steps the covered stretches "to `breached` over its covered length" with no record named;
item 575 makes that the enceinte's `condition` profile, and its §2.6 landfall row and (8)'s undo do not list it.
*Required change (V05):* §3.16 (4) reads "… writes `breached` over its covered length into the enceinte's `condition`
(file f item 575: knots at the covered length's ends), repaired by volume 6 (V6 §3.7.5)"; §2.6's landfall row and §3.16
(8)'s undo name the profile.

**TT-10 — File f: item 574's pointer, and item 252's readers.** minor · bcr · **BASE-F**.
(a) Item 574 still says "until it has, the coherence pass applies the new text of TR-09's required change
(`docs/volumes/critique/seam-time-r1.md`, TR-09)", though V06 §10 now carries BCR-V6-28 (V06's X34), and a critique file
is no design source; it names §4.11 step (6) and II.7.3 (c) but not the request's third part, §4.5 S7b (6). (b) Item 252
(BCR-V5-9) is *Needed by* V05 only, though V06's clearance writes the decoration's `members` and V04's closures read them.
*Required change (file f):* (a) item 574 drops the pointer sentence and reads "… BCR-V6-28 (V06 §10) as written. Also
touches: §4.5 S7b (6)"; (b) item 252's *Needed by* reads "V04, V05, V06".

## 4 Summary counts and CONFIRMED versus PLAUSIBLE

**Round 1 re-checked:** 25 issues — **25 FIXED, 0 PARTLY, 0 NOT FIXED, 0 REGRESSED.** Every round-1 blocker-class
contract of round 0 still holds (the fold's product and rung, the catacomb primary, the underground's own lottery), and
every counterpart that round 1 routed across lanes now agrees.

**New from the sweep:** 10 issues — **0 blockers, 5 majors, 5 minors** (the minors carry lettered parts). Three majors
are gaps a round-1 required change left (TT-01's trigger, TT-02's over-reaching bar, TT-03's member keys); two come from
file f item 575, which reached V05 and V06 after their lanes (TT-04, TT-05).

| owner | major | minor | total | issues |
|---|---|---|---|---|
| V06 | 3 | 1 | 4 | TT-01, TT-04, TT-05 (major); TT-06 (a)–(f) |
| V04 | 1 | 1 | 2 | TT-02; TT-07 (a)–(c) |
| V05 | 1 | 1 | 2 | TT-03; TT-09 |
| V07 | 0 | 1 | 1 | TT-08 (a)–(c) |
| BASE-F | 0 | 1 | 1 | TT-10 (a)–(b) (file f items 574, 252) |

**What must move together.** TT-01 with TT-08 (a)–(b) (the placement trigger in V06; V07's pointer and its dead fallback).
TT-03 with TT-10 (b) (V05's member type and its readers in file f; V06 names the forms next round). TT-04 with TT-05 and
TT-09 (the enceinte's condition: V06's row and ops, its in-use repair, V05's write). TT-02 alone (V04's bar and decision;
V06 is already right). Each pair is stated so either side can land first.

**What the seam now holds** (round 0's census rows and every row rounds 1 and 2 repaired): the fold's product and rung
read by every V06 step, V05's islands and V07's phases; V07's epoch rows in V06's `ProductEpochRows` shape keyed by class
id; the hollow-way ladder issued whole by V06 (retire, efface, reopen) with the frame protected; the landfall's
`formerClass` written and restored, its members released by the op that ends their cover and the accesses under them
reopened; the catacomb primary, cap, ratchet, count, deaths and keys on both sides; the underground's own lottery;
`Foundations.apply` at every rung with the maintenance mode; F6's new dwellings by relocation; the village working's
breach at generation and at an epoch; the buried floor's terraces; one suppression rule in two record forms; the
retaining wall's condition by stretch (item 245); decks as their host's existence; one clearing under a new strip on
every path; the crypt rank that never shortens a basement.

**CONFIRMED versus PLAUSIBLE.** Every status in §2 and every issue in §3 is **CONFIRMED** as a textual fact: each side's
sentence was read in its enclosing subsection in the files as they stood at 05:17–05:33 on 2026-09-29 (md5s in §1), and
is cited by section and line. The **consequences** named — an occupied toft on a hollow way with no routed access
(TT-01), a failing T-V4-72 (f) (TT-02), a span member that cannot be stored (TT-03), a breached stretch no field records
(TT-04), a live ring's gap left for ever (TT-05) — are **PLAUSIBLE**: reasoned from the texts, with no implementation or
fixture executed (none exists at this stage). Each required change is the seam's recommendation, vetoable by the owning
volume's next revision or by the whole-design retrovalidation (J84).
