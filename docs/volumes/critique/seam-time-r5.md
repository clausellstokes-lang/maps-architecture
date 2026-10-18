# Seam check, round 5 — evolution (V06) against every stage it changes (V01, V02, V03, V04, V05, V07, the base, file f)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-time-r5; covered by the whole-design retrovalidation (J84).

Lane `volumes/seam-time-r5`, 2026-09-29. Reconciliation round 5 of the time seam: (A) re-check every issue of round 4
(`docs/volumes/critique/seam-time-r4.md`, TV-01..TV-07) against the reconciled volumes — each must now be fixed; (B) sweep
the whole seam again, since the repairs elsewhere can break it.

PROGRESS
- §1 Method, inputs and scope: done
- §2 Round-4 re-check (TV-01..TV-07: FIXED / PARTLY / NOT FIXED / REGRESSED): done
- §3 New issues from the sweep (TW-01..TW-09): done
- §4 Summary counts and CONFIRMED versus PLAUSIBLE: done

## 1 Method, inputs and scope

**Inputs (as read on 2026-09-29 from 13:14, after every reconcile-*-r5 lane had landed).** `docs/volumes/V06-evolution.md`
(4 508 lines, md5 c63ae4ae…, which holds reconcile-V06-r5's landing and reconcile-V07-r5's two shared-file edits of
12:59 and 13:01), V01 (4 373, 15a69be1…), V02 (4 828, 65e5ea63…), V03 (3 721, e60491e3…), V04 (4 075, 27bdbbd7…), V05
(3 740, 5d0a101c…), V07 (4 331, 75393e28…), `docs/volumes/_integrate.md` (468, 965ab696…, unchanged since round 4),
`docs/AMENDMENTS-2026-09-28f.md` (1 709, e4c1756e…) and the base `docs/ARCHITECTURE.md` (md5 01fea21f…, unchanged since
round 0). Round 4 itself (`critique/seam-time-r4.md`, 299 lines, md5 8664a09e…) is unchanged since its landing, so its
seven issues TV-01 – TV-07 are the re-check's whole list. Snapshots: `scratchpad/volumes/str5/now/` and `str5/pre/`.

**How the seam was read.** (1) **Every line changed since round 4**, from line diffs of each seam file against the
round-5 lanes' pre-edit backups (`rcV1r5/V01-pre.md`, `rcV2r5`, `rcV3r5`, `rcV4r5`, `rcV5r5/V05-pre-r5.md`,
`rcV5r5/V06-pre.md` — the V06 state before any round-5 edit —, `rcV7r5/V07-pre-r5.md`, `rcBFr5/f-pre-r5.md`), whose md5s
equal round 4's inputs (V01 cbbfe6e8, V02 34f5b1f5, V03 735035b5, V04 87f5ce61, V05 a60dbcc9, V06 ba61b240, V07 a2279e33,
file f 0da3c86c), so every round-5 landing — V05's counterpart words in V06, reconcile-V06-r5 and V07's companion rows in
V06 — is inside the diffs (`str5/d-*.txt`, 1 921 lines). V06's, V07's and V05's diffs were read whole; V01's, V02's,
V03's, V04's and file f's were read hunk by hunk wherever a hunk touches an epoch, a participant, a V06 op or record, or a
base record an epoch writes, each such hunk in its enclosing subsection. (2) **The seam's round-5 sections whole in their
current text**: V06 §2.1 (`EpochParticipant`, `ProductDeclEpoch`, `EpochPlacement`, `EpochContext`, `EpochScope`), §2.8's
`retypeLand` and `repairWall`, §2.10's `EpochReport` and `ChronicleKind`, §3.2 (the step table and participant table),
§3.4 (9), §3.7.5, §3.9.1, §3.9.6 with *Claim-sized classes at a village rung*, §3.16 (stage ids, keys, identity), §3.19
(5)–(7), §4.1's undo bullet, §6.2 and §6.3 whole, W3, W10, W37, W39, W57, W64, W75, T-V6-12, -26, -51, -57, J-V6.118,
J-V6.121, J-V6.122, BCR-V6-1, X40 – X46 and both round-5 notes; V07 §2.1 (`ProductDecl` and *The records placement*),
§2.6's round-5 rows, §3.10's pin-record rule and furniture sentence, §3.11's absorb half, §3.12 from *Which path runs* to
*Pins over epochs*, §3.14, §6's epoch prices, T-V7-13, T-V7-21, T-V7-57, §8 (V-M2, V-M3, *Where it slots*, the risks),
J-V7.116, J-V7.125 – J-V7.128, BCR-V7-18, W25, W28, W65, W66, W70 – W73; V05 §4.2's *Moving an island* and *Resizing*, §6
whole, §12's round-5 paragraph, §13 items 25 – 32; V01 V1-3.7.3 and its `Way.surface` row, V1-3.10.3's `plantRimWalk`
rows; file f items 202, 244, 309, 317, 575 and 581; the base's `Pin` (§2.7, l. 1807–1809), §6.1's post-build placement
key (l. 7139–7140), §6.3's creation index (l. 7433), §7.4's undo targets (l. 8632), §7.7 items 2, 5 and 6 (l. 9158–9225,
J-A22.76 at l. 16962), §4.11 *Markets over epochs* (l. 6742) and §12.6's post-build placement row (l. 12629).

**Method.** (A) Every round-4 issue was traced to the sentence its required change names, on each side, and graded
**FIXED** (both sides say one thing), **PARTLY**, **NOT FIXED** or **REGRESSED**; a FIXED issue whose repair left a
neighbouring sentence stale, or whose required change was itself incomplete, keeps FIXED and names the residual raised in
§3. (B) The sweep asked of every piece of state round 5 added or moved — the records placement `village.records` and its
call on both paths, the siting step (m), the hall's plot, building and use, `village.outsidePlot`, the fair field's
`retypeLand` and furlongs, the participant `village.pins`, the pin-record rule at an epoch, the field phase's way-surface
re-lay, the support step at an epoch, V05's gate wording, the island events' pricing and the re-declared century bounds —
its epoch behaviour, its transition step and phase, its identity and keys, its undo, and whether a producer and a
consumer exist on both sides, on the epoch path and on every other path that reaches the same code (the absorb without an
epoch, the base's grow path without volume 6). Line numbers (`l. n`) are the files' as read today.

**Scope limit, stated so it is not mistaken for coverage.** Text unchanged since round 4 was judged by rounds 0–4 and
re-read this round only inside the sections listed above. Three findings trace to round 4's own required change (TW-01's
mint — "minted as V6 §3.9.6 mints an opening" was TV-02 (3)'s wording —, TW-07's "every op in the epoch's record, undone by
the epoch's undo record", and TW-04, which is V06's own observation X46 left for a V05 lane that had already landed), so
this round owns them. Checked and **not** raised: V6 §3.4 (9)'s way-surface re-lay against V01's `Way.surface` lifecycle
row and V1-3.7.3's epoch clause (the plot's `fieldBand` hysteresis gates the re-read, an edited surface is kept, the op
is in the epoch's undo record — both sides say one thing); V03's round-5 crypt join and entrance-storey rules, whose
basement changes at an epoch are the base's re-cut of a stored plan inside the causing event, as V06's crypt row already
reads; V04's opening-pass gate (V01's local-place step inside `AccessPass.run` and `CatacombGrowth.grow` at an epoch);
file f item 581's parity reading of V06's "0 in the parity presets" cells, which is the content seam's; the village's
epoch warnings (`W_CLAIM_CLOSEST`, `W_ENCROACH_OVER_CAP`, `W_FAIR_ON_GREEN`), which go to the epoch event's base report as
every warning does, and its opened uses, which reach the chronicle through the lifecycle events. No finding rests on a
sampled line: each was re-read in its enclosing subsection on both sides before it was written.

## 2 Round-4 re-check (TV-01 – TV-07)

**Result: 7 FIXED, 0 PARTLY, 0 NOT FIXED, 0 REGRESSED.** Every owner applied its side as round 4 required, and every
companion round 4 routed across lanes (V06's `ProductDeclEpoch.records`, `EpochPlacement`, row 12, W75, BCR-V6-1's text,
§3.9.6's companion sentence, T-V6-51, `retypeLand`'s comment and W10 for TV-02; V06's participant row for TV-03, both
applied by reconcile-V07-r5 as a logged shared-file edit; V06's one word for TV-04, applied by reconcile-V05-r5) now
agrees. Four repairs left a residual — a sibling's row the repair priced from, a path the new code is also reached by, or
a sentence of round 4's own required change — raised in §3.

| id | sev. (r4) | owner | status | evidence now | residual |
|---|---|---|---|---|---|
| TV-01 | major | V06 | FIXED | V6 §3.2's `sky.islands` row (l. 1037: a raise, a growing or shrinking resize with V05 §4.2's whole resize, a wane, settle, refloat, the re-reasoning and a fall, "each priced per event in V6 §6.2 at V05 §6's row for it"); §6.2's row (l. 3177) cites V05 §6's rows by name and restates no figure; the participants total's exclusion (l. 3184); the century re-derived (l. 3186–3224: ≈ 39.3 / 47.4 / 5.1 s of island events, sums ≈ 20.3 / 83.6 / 182.2 s) and the bounds re-declared under D-18 at TOWN ≤ 25 s, CITY ≤ 85 s, METROPOLIS ≤ 185 s; §6.3 (l. 3229–3230) and BCR-V6-22 (l. 3832–3834) cite the bound; J-V6.118 (l. 3596); X40 (l. 4168) | V05 §6's resize row, which the sums quote, prices the re-landed feet's placements but not the re-claimed yards' tops, which V5 §4.2 serves by `placeAt` at every resize — V06's own X46 (l. 4174) left it for a V05 lane that had already landed — TW-04 |
| TV-02 | major | V07 | FIXED | V07 §2.1's `records?` and *The records placement* (l. 550–575); §3.12's step (m) (l. 2389–2395), *Markets, halls and the fair over epochs* (a)–(d) with **the ops** (l. 2413–2461) and *Records at a village epoch* (l. 2467–2490); §2.6's rows (l. 1168–1178); W65, W66, W70 – W73; T-V7-13's village-history and absorb clauses (l. 3204); J-V7.125, J-V7.128; BCR-V7-18's round-5 sentence (l. 3620–3628); V6 §2.1 (l. 528–531), §3.2 row 12 (l. 1024), W75, BCR-V6-1 (l. 3624–3629), §3.9.6's companion (l. 1783–1797), T-V6-26, T-V6-51, §2.8's `retypeLand` (l. 787), W10 (l. 405) | the placement's draws and mints are keyed by the epoch (round 4's "minted as V6 §3.9.6 mints an opening"), against the base's dossier-event keys, and collide on the absorb path — TW-01; a removed record's two tombstones have no issuer — TW-02; the call rides on a base hook staged after its caller's milestone, and the path without volume 6 has neither call nor pins — TW-03; a record's join charges a cap its context cannot reach — TW-05; "undone by the epoch's undo record" for a record — TW-07 |
| TV-03 | major | V07 | FIXED | V07 §3.12 *Pins over epochs* (l. 2492–2518) with steps 1–4, the no-move and declared-means-held rules and the hand-offs; §3.10's furniture sentence as required (l. 2128–2132); §2.1's participants comment (l. 545–547); W25, W28, W72; T-V7-57's village-history clause (l. 3248); J-V7.126; V6's participant row `afterGrowth` · 60 · `village.pins` (l. 1046), row 15 (l. 1027), W3 (l. 398), `EpochParticipant`'s comments (l. 521–523), §3.16 (l. 2237–2238), T-V6-26 | step 1's household scope is narrower than T-V7-57's and §6's; "a pin goes with its host by V06's decline" names a V06 mechanism that does not exist; a forced market cross at an epoch removes a standing centrepiece — TW-06; how a product's participant is scoped to its rung is stated two ways — TW-08 |
| TV-04 | minor | V05 | FIXED | V5 §3.16 (2), (4)–(5) (l. 1469, 1484–1493, 1527: "a `Gate` of any kind — `main`, `postern`, `water`, `gatehouse` or `castle`"), §1b's landfall row (l. 393), §2.6's `Enceinte.condition` row (l. 781), §5.1's states (l. 2238), T-V5-14 (l. 2479–2483, a `main` gate), J-V5.11, J-V5.79 (l. 2812); V6 §3.7.5's in-use paragraph (l. 1512) and J-V6.110 (l. 3588) "towers and gates" (V05 §13 item 32) | — |
| TV-05 | minor | BASE-F | FIXED | file f item 575 (l. 172): "with no stretch, volume 6's lift of the ring's `neglect` (V6 §2.8)" and "(`abandoned` on `neglect`, until volume 6's no-stretch `repairWall` lifts it — back to the pre-neglect existence when every run is `standing`, else `decayed`; …)", the note naming X42; V6's X42 marked met (l. 4170) | — |
| TV-06 | minor | V05 | FIXED | V5 §12's round-5 paragraph (l. 3398–3406) moves the TU-01 and item-309 clauses to CONFIRMED; §13 item 25's second half (l. 3525–3530) and item 27 (l. 3542–3545) marked landed with their lanes | the same class recurs one round on: §12's new PLAUSIBLE clause and §13 items 30–31 read volume 1's and file f's round-5 halves as pending, both landed — TW-09 |
| TV-07 | minor | V06 | FIXED | V6 §3.19 (5) (l. 2600–2608: the clearance, item 244's support step, `raised_too_tall`, the wait), (7)'s "the support step's pier rings" (l. 2615–2616), W57 (l. 452), the report's `raised.waited` comment (l. 830), §3.17 (9) (l. 2293), §6.1's `raisedWays` row (l. 3156), T-V6-57's support-step clause (l. 3335), J-V6.122 (l. 3600) | — |

## 3 New issues from the sweep (TW-01 – TW-09)

Severity as rounds 0–4: **blocker** (the seam cannot be built as written, or an owner rule fails on it), **major** (a
contradiction or an unwired piece a builder would hit), **minor** (wording, a restatement, a stale pointer). Each names one
owner (V01–V12, or BASE-F for file f) and the exact change; a companion row in another volume or in file f is named inside
the change, as rounds 3 and 4 did. No blocker was found.

### 3.1 Majors

**TW-01 — The records placement keys its draws and mints its addresses by the epoch, not by the dossier event; on the
absorb path two placements mint one address.** major · identity / determinism · **V07**, with V06's rows named below
(round 4's own wording: TV-02 (3)'s "minted as V6 §3.9.6 mints an opening").
V7 §3.12 (b)'s ops (l. 2435–2440) mint a record's hall use "as V6 §3.9.6 mints an opening (the town root as derivation
unit, the placing phase's stage id, the epoch and its ordinal in that phase's opening order, §6.3)", (c) takes "the cause
and the mint of (b)", and §3.14 (l. 2695–2702) draws every epoch draw of §3.12 on `epoch.transform` "keyed by lineage and
epoch", `village.records` under `S10b` and a join's scores "as V6 §3.9.6's". On the absorb path V6 §2.1's `EpochPlacement`
comment (l. 529–530), V7 §2.1 (l. 573–574) and J-V7.128 hand the placement "a context holding … the last epoch's number,
the absorb's week", and `EpochContext.stream` keys by "the entity's key, the phase's stage id, the epoch" (V6 l. 564). The
base keys the same work by the dossier event: the events an epoch carries take their own `seq` "so their draws and minted
addresses are keyed as a standalone event's are (§6.1, §6.3)" (§7.7 item 6, l. 9221–9225; J-A22.76); "a post-build
placement — an `assign`, a dossier event, a positive placement or a relocation (§7.7) — draws on `siting` with the causing
event's `seq` as its creation index (§6.3)" (§6.1, l. 7139–7140); a created element's creation index is the hash of the
creating event's `seq` and its ordinal (§6.3, l. 7433); and V6 §3.16's own *Keys* (l. 2243–2250) key anything begun at a
non-epoch event by that event's `seq` with epoch component 0. Consequences: (1) two absorbs between the same pair of epochs
that each place a hall or a cloister both mint (town root, `S10b`, *e*, 0) — one address for two uses — and an absorb's
first placement repeats the address `village.records` minted at epoch *e* itself (before any epoch, *e* is the creation's 0,
where generation's own S10b run mints); (2) on the epoch path a market, claim-sized or pin record takes addresses and draws
other than those the same dossier event takes folded standalone, which J-A22.76 made equal so the port's grouping of a
week's changes never changes an identity.
*Required change (V07, with V06's rows):* (1) V7 §3.12 (b)'s ops sentence reads "… `openUse` — cause `dossier` with the
record's assignment for a record, its entities minted as the base mints a post-build placement's, from the adding dossier
event's `seq` and their ordinal in the placement's ops (§6.3; §7.7 item 6, J-A22.76); cause `demand` for a roster member,
minted as V6 §3.9.6 mints an opening", and (c), §2.6's two round-5 rows and W70 follow; (2) §3.14: `village.records` draws
on `siting` (the `plot.*` concerns for its joins) keyed as a post-build placement is — the entity, the adding dossier event's
`seq` as creation index, epoch component 0 (§6.1) — on both paths, the forced pin's `pin.decor` draw keyed by the record's
binding key as now; (3) **V06:** `EpochPlacement.place(ctx, record: DossierRef, event: { seq: number } /* the dossier event
that adds the record — carried by the epoch, or applied by the absorb */)`, the context comment's "the last epoch's number"
deleted (an absorb passes no epoch), W75 and BCR-V6-1's text following, and V6 §3.16's *Keys* gains: "A product's records
placement draws and mints as the base's post-build placement does — keyed by the adding dossier event's `seq`, epoch
component 0 — on the epoch path and the absorb path alike (§6.1, §6.3; §7.7 item 6)"; (4) J-V7.128 and BCR-V7-18's round-5
sentence drop "the last epoch's number"; (5) T-V7-13's absorb clause adds two `fish_market` records absorbed in two weeks
between the same epochs (two halls, two distinct use addresses) and a record carried by an epoch whose addresses equal those
the same event mints folded standalone at that `seq`; a J-V7 row records the key (over the epoch key, which collides on
the absorb path and splits identities between the port's two groupings).

**TW-02 — A removed market or pin record at a village epoch or absorb: the two tombstones V07 promises have no issuer.**
major · unwired / lifecycle · **V07**, with V06's rows named below.
V7 §3.12 (a) (l. 2425–2426): "A removed record tombstones the reservation; its faces stay `commons`"; *Records at a village
epoch* (l. 2483–2486): "A removed record is the base's dossier step's: its use closed (§3.11's absorb half), the fair field's
reservation tombstoned ((a)), a pin the record forced (§3.10) tombstoned with its binding in that batch"; J-V7.127: "the
forced pin tombstoned with its record". But the placement is called only "once for each dossier record the step adds"
(V7 l. 2469–2470; V6 §3.2 row 12, l. 1024: "each record the step adds"; V6 §2.1's comment: "a dossier record the epoch's
dossier step adds"), §3.11's absorb half says only "a removed one closes its use" (l. 2349), and the base's removal "leaves
the plot vacant through `closeUse`" (§7.7 item 2, l. 9161–9162) — a `fair_ground` member binds a reservation with no
building (W66), and the base keeps a closed market's square (§4.11 *Markets over epochs*, l. 6742–6744). `village.pins`'
step 4 re-binds a pin record; it removes nothing for a removed one. So, on the epoch path and on the absorb path alike, a
removed `annual_fair` leaves a live secondary `market` reservation drawn and labelled as the fair field, and a removed
`wayside_shrine`, `water_source` or custom pin record leaves its forced pin standing with a provenance naming a record the
dossier no longer holds.
*Required change (V07, with V06's rows):* (1) **V06:** `EpochPlacement` gains `remove?(ctx, record: DossierRef, event:
{ seq: number }): KernelResult<EpochOps>`, called by the dossier step, for each record it removes at an epoch whose product
declares the placement, after the base's removal of that record, and by §7.7 item 2's removal of a record an absorb removes
without an epoch at a rung of that product; V6 §3.2 row 12, W75 and BCR-V6-1's text name it; (2) V07's `village.records`
registers it: the fair field's reservation tombstoned (its faces kept `commons`, left to V6 §3.5.3's hinterland ladder), a
pin the record forced tombstoned with its binding, a pin it bound but did not force unbound — each an op of that batch,
keyed as TW-01 states; §3.12 (a), *Records at a village epoch*'s removal sentence, §3.11's absorb half and W70 cite it; (3)
T-V7-13's village-history clause adds an `annual_fair` record removed at a later epoch (its reservation tombstoned, its
faces `commons`) and a `Wayside shrine` record removed (its forced pin tombstoned, a bound chance pin left standing); a
J-V7 row records it (over keeping the fair field as the base keeps a square — the field is common grazing between fairs,
§3.6 (4b), with no square to keep — or leaving a forced pin to the next Regenerate).

**TW-03 — The records call and the pins over epochs ride on a base hook staged after the milestone that needs them, and the
path without volume 6 has neither.** major · unwired / build order · **V07**, with file f's text named below.
V7 §8's V-M2 row (l. 3271) builds `village.records` "called on the absorb path without an epoch", and T-V7-13's absorb
clause exits at V-M2 (l. 3204: "at V-M2, an `annual_fair` and a `fish_market` record absorbed without an epoch lay the fair
field and the built, open hall in that absorb's commit, and S10b's `dossier` request receives neither"). That call is the
base's §7.7 item 2 placement calling `ProductDecl.records`, which BCR-V7-18 (l. 3620–3628) says "rides on BCR-V6-1 … so file
f item 317 carries it there"; file f item 317 (l. 357) is **STAGED (M6-E)** and words only the phases override, while the
village's registration is item 202 (l. 62), STAGED with the village product (V-M0 to V-M4). V7 §8 slots V-M0 and V-M1 "after
M4 … in parallel with M5" (l. 3308–3310) and names no dependency on M6-E. And BCR-V7-18 (l. 3617–3618) keeps "Without V06,
`grow-by-stage` consults the same two overrides (`siting`, `growth`)" — the path the village runs before volume 6 lands — on
which nothing calls `ProductDecl.records` (the dossier step's call is BCR-V6-1's) and V07 registers no `village.pins` (V6
§3.2's note, l. 1058–1059, lets participants run on M4's grow path "when their packages are loaded (V04's U5 runs them on
M4's grow path)", but V07 never says it does). So before M6-E a record absorbed at a village rung, or carried by a village
epoch, is placed by S10b's `dossier` request — which "cannot lay a fair ground's reservation or a hall's claim" (J-V7.128's
own reason) — and a village epoch adds no well or stall: TV-02's and TV-03's failures return on that path. V7 §8's
pre-decided fallbacks (l. 3317–3343) cover V04's tail, file g's mechanisms, the base's item 110, V04's arch-vault source and
V06's raised-way decline, not this.
*Required change (V07, with file f's text):* (1) BCR-V7-18: `ProductDecl.records` and **both** calls — §7.7 item 2's
placement (and removal, TW-02) of a record an absorb adds or removes without an epoch, and the dossier step's (§4.11 (e))
at an epoch — are hooks of the product's registration, landing with file f item 202 (the village product, V-M0 to V-M4) on
M4's grow path, BCR-V6-1 carrying them into its phase interface at M6-E; the "Without V06" sentence reads "Without V06,
`grow-by-stage` consults the same two overrides, its dossier step (e) calls the product's records placement as above, and the
village's participants `village.plan` and `village.pins` run on M4's grow path by the hook V04's U5 uses (V6 §3.2's
participants note)"; (2) V7 §8's V-M2 row names the item-202 hook as built there (priced inside its range), and *Where it
slots* says V-M2 and V-M3 need no M6-E milestone; (3) **BASE-F:** file f item 202 gains `ProductDecl.records?` and the two
call sentences as BCR-V7-18's round-5 text words them (*Requests* adding BCR-V7-18; *Needed by* V06, V07), and item 317's
note reads "the `records` member and its calls land with item 202; BCR-V6-1 (a) carries them into the phase interface".

**TW-04 — The island resize's yard tops are placed at every resize and priced nowhere; V06's re-declared CITY and
METROPOLIS bounds fail by ≈ 27 s.** major · budget / unwired · **V05**, with V06's re-sum (TV-01's residual: V06's own X46,
left for a V05 lane that had landed at 12:39, seventeen minutes before V06's note).
V5 §4.2 *Resizing* (l. 1990–1995): one island L1 batch "re-claims each landing yard at its top … Each re-claimed yard is
served in the same commit: its `sky_landing_top` plot re-cut on the new yard (the old one tombstoned) and its use opened
there by a positive placement (§7.7's `placeAt`)". V5 §6's row (l. 2362) prices "≤ 5 ms + §12.6's scoped regeneration …
+ §12.6's 30 ms per re-landed foot's placement", its basis naming "one island L1 batch re-laying the strip and yards" and
no placement at a top; the base prices a `placeAt` at ≤ 30 ms of model work at CITY (§12.6, l. 12629–12631), as V05's own
"a move" row does ("two post-build placements (§12.6's 30 ms each)"). V6 §6.2 (l. 3186–3226) quotes V05's row "as those rows
read on 2026-09-29" and sums from it; V6 X46 (l. 4174) names the gap and routes it to "volume 5 (its next lane)", which no
lane holds. At V06's own worst case (every island resized at every epoch, one yard per access, ≤ 3 per island) the tops add
3 × 100 × 90 ms ≈ 27 s at CITY and at METROPOLIS and 3 × 15 × 90 ms ≈ 4.1 s at TOWN: the sums become ≈ 110.6 s (CITY) and
≈ 209.2 s (METROPOLIS), past the bounds re-declared this round (85 s, 185 s); TOWN ≈ 24.3 s stays inside 25 s.
*Required change (V05, with V06's):* (1) V5 §6's "a resize, a rim reshape" row reads "≤ 5 ms + §12.6's scoped regeneration of
each receiving district and of the district whose institution claim is re-searched where it receives no face (at most
k ≤ 3 in all; V01 V1-6's sky row) + §12.6's 30 ms per re-claimed landing yard's top placement (`placeAt`, one per access,
≤ `accessCount.max`; a reshape's on the moved stretch's yards only) + §12.6's 30 ms per re-landed foot's placement", its basis
cell naming the tops' placements; (2) **V06:** V6 §6.2's century paragraph quotes the amended row, re-derives the growing
resize (≈ 221 ms at CITY, ≈ 248 ms at METROPOLIS) and the shrink (≈ 197 / 206 ms), and applies its own D-18 rule — CITY ≤
115 s, METROPOLIS ≤ 210 s, TOWN ≤ 25 s kept — for the owner's veto; J-V6.118, §6.3, BCR-V6-22's parenthesis and X46 (marked
met) follow.

### 3.2 Minors

**TW-05 — A record's claim-sized join is charged to a churn cap its context cannot reach.** minor · unwired · **V06**, with
V07's citation.
V6 §3.9.6's *Claim-sized classes at a village rung* (l. 1785–1789) joins a candidate's neighbours "— V6 §3.8.4's `amalgamate`
form, neighbours fixed, never across a retaining wall, the joins charged to the district's `geometry` cap —" for "a roster
member in this `uses` step; a record through the product's `records` placement in the `dossier` step". `EpochPlacement`'s
context "reads only doc, tables, stream, product, rung, epoch and week" (V6 l. 529) and "`village.records` reads nothing else
of its context" (V7 l. 574–575): no `churn`; an absorb without an epoch has no churn ledger at all. A record never waits
(V7 §3.12 (c)'s last rung), so a spent cap must be overrun or treat the candidate as none, and neither text says which; the
base bounds a dossier event's disruption by its `DisruptionBudgetRow`, "never the dossier's authority" (§7.7 item 5,
l. 9200–9206).
*Required change (V06):* V6 §3.9.6's sentence reads "… the joins charged to the district's `geometry` cap for a roster member;
a record's joins (the product's records placement, at an epoch or an absorb) are its dossier event's disruption, charged to
no churn cap, bounded by the request kind's `DisruptionBudgetRow` and reported over budget, never refused (§7.7 item 5)";
V7 §3.12 (c) cites it; T-V6-51's claim-sized clause adds a record placed while its district's `geometry` cap is spent.

**TW-06 — The pins over epochs: a narrower well scope than the test, a host rule pointed at a V06 that has none, and a forced
market cross that removes a standing pin.** minor · contradiction / pointer · **V07**.
(a) Step 1 (l. 2497–2501) serves "the households the epoch housed or moved that the standing wells leave unserved", while
§6 prices "a coverage pass over the housed households" (l. 3170) and T-V7-57 checks "every housed household served … at
every village epoch" (l. 3248): a household that neither moved nor was housed but lost its well (tombstoned with its host,
(b)) or its aqueduct delivery point (a declared aqueduct's span breached by V06's raised-way decline) stays unserved, and no
`EpochScope` field or ledger view holds "the households the epoch housed or moved" at `afterGrowth` (the ledger's pool is
empty by then, V6 §2.1), though W72 names it as the input. (b) "It removes no pin whose host stands (a pin goes with its
host by V06's decline)" (l. 2512) and §2.6's row "a host's decline takes its pins (V06's decline)" (l. 1171) point at a
mechanism V06 does not state — V06 has no pin rule — and the base's `Pin` carries a `host` face (§2.7, l. 1807–1809) with no
cascade stated for a removed host (none found in §4.11's conversions or §7.3). (c) The pin-record rule sets a
`market_cross` "replacing the centrepiece §3.6 (5) drew there" (§3.10, l. 2116–2118; J-V7.127) and runs "in
`village.records` for a record added at a village epoch" (l. 2123), so a `mercantile-market` record arriving at an epoch
removes a standing centrepiece whose host stands — against *Pins over epochs*' no-removal rule, declared means held (an
author-placed centrepiece, §7.2) and T-V7-57's "0 standing pins moved and 0 removed whose host stands".
*Required change (V07):* step 1 reads "every housed household the standing wells, pumps and unbroken delivery points leave
unserved (the coverage row over the district's housed households, as §6 prices it)", and W72's input "the housed
households"; the step list opens with "0. **orphans** — a pin whose host face the epoch tombstoned is tombstoned in this
batch (`Pin.host`, §2.7; a pin record it bound re-bound by step 4)", and l. 2512's parenthesis and §2.6's row read "(step 0)"
for "V06's decline"; §3.10's market-cross sentence adds "at an epoch or an absorb the cross replaces only an engine-placed
centrepiece no one holds (tombstoned in that batch, a listed fate) and otherwise stands beside it at the reservation's
centre", and T-V7-57's village-history clause excepts that one tombstone.

**TW-07 — A record's ops "undone by the epoch's undo record": an epoch that carries a dossier event is no undo target.**
minor · wording / base contradiction · **V07** (round 4's own wording: TV-02 (3)'s "Every op in the epoch's record, undone
by the epoch's undo record").
V7 §3.12's lead-in to (a)–(d) (l. 2419: "each op in the epoch's record, undone by the epoch's undo record"), §2.6's rows for
the records placement's ops and a forced pin (l. 1170, 1172: "the epoch's undo record"), W70's and W71's "the epoch's record
and undo", J-V7.125 ("so each has the epoch's undo") and the absorb sentence (l. 2488–2489: "its ops that absorb commit's
batches, undone with it"). The base: "a dossier event, or an epoch that carried one, is no undo target" (§7.4, l. 8632;
§7.7 items 3, 5 and 6, l. 9187, 9214, 9225); V6 §4.1's undo bullet (l. 2912–2913): "a dossier-bound history is undone only
by the host". Only a roster member's ops (step (m), V6 §3.9.6) and the law's crossing are undone by an epoch's undo record,
and then only at an epoch that carried no dossier event.
*Required change (V07):* the lead-in reads "each op in the epoch's record (replayed with it); a roster member's and the law's
ops undone by the epoch's undo record where the epoch is an undo target, a record's never (an epoch that carries a dossier
event is no undo target, base §7.4; the host restores, item 87)"; the absorb sentence reads "its ops that absorb commit's
batches (no undo target, §7.4)"; §2.6's two rows, W70 and J-V7.125's last clause follow ("so each is in the epoch's record").

**TW-08 — How a product's participant is scoped is stated two ways, and neither says who applies it.** minor ·
contradiction · **V06**.
W37 (l. 432) gives a product's `.participants` to "the runner at an epoch whose product … is that product — its phases,
participants and epoch rows"; BCR-V6-1's runner sentence (l. 3615–3616) runs "the participants registered at that step (the
product's included)" at every epoch. V6 §3.2's table and V7 §2.1 scope the village's three differently — `village.plan` and
`village.pins` "only at a village rung", `village.density` "while a superseded `VillagePlan` exists, under any product"
(l. 1038–1039, 1046) — and `EpochParticipant` (l. 521–524) carries no scope member and no sentence says who applies the
scope. A builder following W37 never runs `village.density` after a hand-up, the only time it exists for; one following
BCR-V6-1 runs `village.pins` at a TOWN epoch unless it gates itself.
*Required change (V06):* `EpochParticipant.run`'s comment adds "every registered participant runs at every epoch at its step
(BCR-V6-1); a participant scoped to a product, a rung or a state returns no ops outside it, reading `ctx.product`, `ctx.rung`
and the document (V6 §3.2's table states each scope)"; W37's consumer cell reads "… that product — its phases and epoch rows;
its participants, registered as every participant is, run at every epoch and gate themselves by V6 §3.2's scopes"; T-V6-51
adds `village.density` running at a base-product epoch after the hand-up and `village.pins` returning no ops at a TOWN epoch.

**TW-09 — V05: its round-5 cross-lane halves have landed.** minor · stale pointer · **V05** (TV-06's class, one round on).
V5 §12's round-5 paragraph (l. 3413–3418) keeps "PLAUSIBLE until volume 1's round-5 lane lands: V1-3.10.3 step 4's
island-level `plantRimWalk` … and (6) (c)'s *A re-searched institution claim* … not yet landed"; §13 item 30 (l. 3565–3574)
ends "they land with that lane", and item 31 (l. 3575–3578) reads file f item 309's island-bridge reader as pending. Both
landed: reconcile-V01-r5 at 12:40 (V1-3.10.3 step 4's `plantRimWalk`, V01 l. 2020; its W-row, l. 409; its lifecycle row,
l. 766) and reconcile-BASE-F-r5 at 12:39 (item 309 names "the island bridge build after S8"). V6 §3.2's `sky.islands` row
runs the resize that cites both at every epoch.
*Required change (V05):* §13 items 30 and 31 marked landed with those lanes; §12's clause moved to CONFIRMED, citing V1-3.10.3
step 4, (6) (c) and item 309's text.

## 4 Summary counts and CONFIRMED versus PLAUSIBLE

**Round 4 re-checked:** 7 issues — **7 FIXED, 0 PARTLY, 0 NOT FIXED, 0 REGRESSED.** Every contract rounds 0–4 settled
still holds on both sides: the fold's product and rung, the catacomb primary, cap, ratchet and keys, the underground's own
lottery, the hollow-way ladder with its placement trigger over every placement an epoch makes, the landfall's typed
members and reopened accesses with every covered gate kind breached with its run, the enceinte's `condition` with no Works
and the no-stretch lift of a neglect now in file f's text, the kept stretch under a raised gate, the one reader list of
`EpochScope`, every island event priced per event, the support step on every raised-way path, the field's way-surface
re-lay, the village's market members and records placed in the epoch they arrive, and VS8's rows at a village epoch.

**New from the sweep:** 9 issues — **0 blockers, 4 majors, 5 minors.** Three majors sit in the round-5 records placement
— its keys (TW-01, from round 4's own mint wording), its removal side (TW-02) and the paths and milestone that reach it
before volume 6 (TW-03); one is TV-01's residual, a work item V05's resize runs and no row prices (TW-04, V06's own X46).

| owner | major | minor | total | issues |
|---|---|---|---|---|
| V07 | 3 | 2 | 5 | TW-01 (with V06's `EpochPlacement` signature, §3.16 sentence, W75, BCR-V6-1), TW-02 (with V06's `EpochPlacement.remove`, row 12, W75, BCR-V6-1), TW-03 (with file f items 202 and 317); TW-06, TW-07 |
| V05 | 1 | 1 | 2 | TW-04 (with V06's §6.2 re-sum, J-V6.118, §6.3, BCR-V6-22, X46); TW-09 |
| V06 | 0 | 2 | 2 | TW-05 (with V07 §3.12 (c)'s citation), TW-08 |

**What must move together.** TW-01 and TW-02 with their V06 rows (`EpochPlacement`'s `event` parameter and `remove`
member, V6 §3.2 row 12, W75, BCR-V6-1's text, V6 §3.16's keys sentence) — one V06 edit serves both, and TW-02's removal op
takes TW-01's keys; TW-03 with file f items 202 and 317 (either side may land first, each citing the other's sentence);
TW-04 with V06's re-sum of §6.2 (V05's row first, then V06's D-18 re-declaration; V06's rule already follows the row by
citation). TW-05, TW-06, TW-07, TW-08 and TW-09 alone. Each is stated so either side can land first.

**What the seam now holds** (round 0's census rows and every row rounds 1–5 repaired): the fold's product and rung read by
every V06 step, V05's islands and V07's phases; V07's epoch rows in V06's `ProductEpochRows` shape and its participants'
stages `VS1`, `VS2` and `VS8`; the records placement `village.records` (stage `S10b`) called by the dossier step before the
base's placement, with the siting step (m) for the roster's market members, the hall's plot, building and use, the
claim-sized join or outside plot, the fair field's `retypeLand` and furlongs (to be keyed, given its removal side and landed
on the right milestone by TW-01 – TW-03); the pins over epochs; the hollow-way ladder issued whole by V06 and reopened before
any placement an epoch makes; the landfall's `formerClass`, typed members, member-leaving batches and reopened accesses,
its towers and gates of every kind breached with their runs; the enceinte's `condition` by run with its writers, readers
and undo, the no-stretch lift of a neglect, and towers and gates with no state of their own; the catacomb primary, cap,
ratchet, count, deaths and keys; the underground's own lottery; `Foundations.apply` at every rung; the crowding hook's void
part at `growth` and F6's new dwellings by relocation; the village working's breach; the buried floor's terraces; one
suppression rule in two record forms; the retaining wall's condition by stretch; decks as their host's existence; the
island unit run after generation inside its calling commit, every island event priced per event (the yard tops to be
priced by TW-04); the crypt rank that never shortens a basement; stored plans re-cut and unstored ones staled by a
levelling; the support step and the clearance on every raised-way path; way surfaces re-laid with their frontage's band.

**CONFIRMED versus PLAUSIBLE.** Every status in §2 and every issue in §3 is **CONFIRMED** as a textual fact: each side's
sentence was read in its enclosing subsection in the files as they stood from 13:14 on 2026-09-29 (md5s in §1), cited by
section and line, and the base's records and rules (`Pin`, §6.1's post-build placement key, §6.3's creation index, §7.4's
undo targets, §7.7 items 2, 5 and 6 with J-A22.76, §4.11 *Markets over epochs*, §12.6's placement row) and file f's items
202, 317 and 575 were read at their lines. The **consequences** named — two halls minted at one address and an identity
that depends on the port's grouping (TW-01), a stale fair field and a forced pin outliving its record (TW-02), a record
placed by S10b's request and no well added before M6-E (TW-03), CITY's and METROPOLIS's century sums past their
re-declared bounds (TW-04), a spent cap with no rule (TW-05), an unserved household, an orphan pin and a removed
centrepiece (TW-06), a record's ops presented as undoable (TW-07), `village.density` never run after a hand-up (TW-08) — are
**PLAUSIBLE**: reasoned from the texts, with no implementation or fixture executed (none exists at this stage); TW-04's
figures are this round's arithmetic from V06's own worst-case shape and the rows as they stand, not a measurement. Each
required change is the seam's recommendation, vetoable by the owning volume's next revision or by the whole-design
retrovalidation (J84).
