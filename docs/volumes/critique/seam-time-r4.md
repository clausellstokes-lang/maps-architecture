# Seam check, round 4 — evolution (V06) against every stage it changes (V01, V02, V03, V04, V05, V07, the base, file f)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-time-r4; covered by the whole-design retrovalidation (J84).

Lane `volumes/seam-time-r4`, 2026-09-29. Reconciliation round 4 of the time seam: (A) re-check every issue of round 3
(`docs/volumes/critique/seam-time-r3.md`, TU-01..TU-08) against the reconciled volumes — each must now be fixed; (B) sweep
the whole seam again, since the repairs elsewhere can break it.

PROGRESS
- §1 Method, inputs and scope: done
- §2 Round-3 re-check (TU-01..TU-08: FIXED / PARTLY / NOT FIXED / REGRESSED): done
- §3 New issues from the sweep (TV-01..TV-07): done
- §4 Summary counts and CONFIRMED versus PLAUSIBLE: done

## 1 Method, inputs and scope

**Continue rule.** The lane started at 07:42 and wrote only its skeleton; the reconciliation lanes' continuations then
landed from 11:21 to 11:59, so the 07:42 inputs are superseded and this round reads the files as they stand after them.
Round 3 itself (`critique/seam-time-r3.md`, 310 lines, md5 2c1a6163…) was not re-issued with a wider set, so its eight
issues TU-01 – TU-08 are the re-check's whole list.

**Inputs (as read on 2026-09-29 from 12:00).** `docs/volumes/V06-evolution.md` (4 354 lines, md5 ba61b240…), V01 (4 241,
cbbfe6e8…), V02 (4 774, 34f5b1f5…), V03 (3 587, 735035b5…), V04 (4 012, 87f5ce61…), V05 (3 649, a60dbcc9…), V07 (4 090,
a2279e33…), `docs/volumes/_integrate.md` (468, 965ab696…), `docs/AMENDMENTS-2026-09-28f.md` (1 616, 0da3c86c…) and the
base `docs/ARCHITECTURE.md` (md5 01fea21f…, unchanged since round 0). Snapshots: `scratchpad/volumes/str4b/now/`.

**How the seam was read.** (1) **Every line changed since round 3**, from word-level diffs of each seam file against the
round-4 lanes' pre-edit backups (`rcV1r4` … `rcV7r4`, `rcBFr4`) and `integ/pre-cont/_integrate.md`, whose md5s equal round
3's inputs (V01 079cc7de, V02 77417d41, V03 69209c71, V04 8c42db56, V05 2599efb7, V06 62ab91db, V07 fb232447, file f
38c29d39, `_integrate` d868438e) — so both round-4 landings of each lane (07:xx and the 11:xx continuations) are inside
the diffs (`str4b/w*.txt`, 4 071 lines). V06's, V05's and V07's diffs were read whole; V01's, V02's, V03's, V04's, file f's
and `_integrate`'s were read hunk by hunk wherever a hunk touches an epoch, a participant, a V06 op or record, or a base
record an epoch writes, and each such hunk in its enclosing subsection. (2) **The seam's sections whole in their current
text**: V06 §2.8's wall ops, §2.10's `EpochReport`, §2.12's wall and scope rows, §3.2 (the phase order and participant
table), §3.7 whole, §3.8.2's placement rule, §3.9 (intro, 3.9.1, 3.9.6), §3.19 (4)–(8), §4.2 whole, §6.2's `sky.islands`
row and century sum, W10, W64, W79, T-V6-11, -51, J-V6.110 – J-V6.120, X39 – X44; V05 §3.15 whole, §3.16 (4)–(5), §4.2's
*Moving an island* and *Resizing*, §6 whole, T-V5-14, §12's round-4 paragraph, §13 items 21 – 29; V07 §3.6 (4) – (4b),
§3.12 whole (the hand-offs included), §3.10's furniture sentence, BCR-V7-18, BCR-V7-38, T-V7-13, T-V7-57, J-V7.116 –
J-V7.118; V04 §3.10's opening and `UndergroundFade`, §3.8's dwelling closure; V03's outside-ground digest row (l. 993) and
the access head's derived reading; V01 V1-3.10.3 (6) (c) and V1-6's sky row; file f items 575 (l. 171), 309, 310, 319, 336,
574 and 244's support step; `_integrate` §8 (J-VI.23 – J-VI.30); the base's `Gate` and `Tower` (§2.7, l. 1778–1781),
§7.2's *Declared means held*, §4.9's count-driven outside plots, §4.11 *Dossier content across epochs* (l. 6459) and
§12.6's scoped-regeneration law.

**Method.** (A) Every round-3 issue was traced to the sentence its required change names, on each side, and graded
**FIXED** (both sides say one thing), **PARTLY**, **NOT FIXED** or **REGRESSED**; a FIXED issue whose repair left a
neighbouring sentence stale, or whose required change was itself incomplete, keeps FIXED and names the residual raised in
§3. (B) The sweep asked of every piece of state round 4 added or moved — the no-stretch `repairWall` and the pathway it
clears, the kept stretch under a raised gate, the placement rule's use-phase reach, the island raise and resize priced per
event, V05's re-laid rim pieces and resize floor, the village's market records, halls, fair field and claim-sized
openings at an epoch, the government step and the furniture step at territory rungs, the dwelling closure's way in, item
244's support step, the suppressed keys' `suppressedFired` — its epoch behaviour, its transition step and phase, its
undo, and whether a producer and a consumer exist on both sides. Line numbers (`l. n`) are the files' as read today.

**Scope limit, stated so it is not mistaken for coverage.** Text unchanged since round 3 was judged by rounds 0–3 and
re-read this round only inside the sections listed above. One finding traces to round 3's own required change (TV-02:
"the `dossier` phase for a record, `siting` for a roster member" and the routing of a claim-sized record through V6
§3.9.6 were TU-04's wording), so this round owns it. Checked and **not** raised: V09 carries V06 §4.2's `convert` hand
forms (the new no-stretch "back in use" among them) through the context panel's generic **Over time** tab, which lists
each kind's registered `convert` ops (V9 l. 1444, 1464), so no V09 row is owed; V04's dwelling closure's dug pieces are
held while their declaration is live (base §7.2, *Declared means held*), so `UndergroundFade.candidates`' "neither locked
nor pinned" already keeps the engine off them; V03's access heads read their element's closure at draw time, so V06's
epochs redraw them without a re-cut. No finding rests on a sampled line: each was re-read in its enclosing subsection on
both sides before it was written.

## 2 Round-3 re-check (TU-01 – TU-08)

**Result: 8 FIXED, 0 PARTLY, 0 NOT FIXED, 0 REGRESSED.** Every owner applied its side as round 3 required, and every
counterpart round 3 routed across lanes (V06's companion reading of `rules.claimArea` for V07; V05's tower write beside
V06's; file f's order notes and reader list) now agrees. Six repairs left a residual — a sentence beside the one the
required change named, a sibling's number that moved in the same round, or a gap in the required change itself — raised
in §3.

| id | sev. (r3) | owner | status | evidence now | residual |
|---|---|---|---|---|---|
| TU-01 | major | V06 | FIXED | V6 §2.8's `absorbWall` and `repairWall` comments (l. 766, 770: "no Works … the run's towers and gates, which carry no state of their own, stand again with it"); §3.7.2 (2)'s raised-gate filter (l. 1413–1415) and (3) (l. 1421–1426, the "`ruined` structures until the pool's building layer" clause gone); §3.7.5 (l. 1463–1465, 1475–1476); §3.7.6 (5)'s last bullet (l. 1540–1545); §5.1's absorbed-wall row (l. 2995); T-V6-11's "0 Works whose target is a wall, a tower or a gate" and H-METRO absorb clause (l. 3211); J-V6.110, J-V6.112, J-V6.114 (l. 3510–3514); W79; X41 | V6 §3.7.5's in-use paragraph says "towers and gatehouses" where §2.8 and §3.7.2 say "towers and gates" — moves with TV-04 |
| TU-02 | major | V06 | FIXED | `repairWall`'s `stretch?` optional with the no-stretch lift, refused with nothing to lift (l. 770); §3.7.5's pathway batch (l. 1467–1471); §3.7.3's clock from the last lift (l. 1433–1434); §2.12's pathway and condition rows (l. 870, 878); `walls.backInUse` (l. 802); `wallManned` with its template (l. 830, 2109, 3038); §4.2's "back in use"; W10, W79; T-V6-11; J-V6.115 | file f item 575's lifecycle sentence still names no neglect lift (X42 routed it to the coherence pass, and no lane applied it) — TV-05 |
| TU-03 | major | V05 | FIXED | V5 §3.16 (4) (l. 1478–1483: the `breached` length extended over each covered tower's and gatehouse's footprint chord; "a `Tower` carries no state of its own"), (5) (l. 1515–1517), the states paragraph (l. 2224), T-V5-14 (l. 2464), J-V5.11, J-V5.79 (l. 2793), §2.6's `Enceinte.condition` row, §1b's landfall row | "gatehouse" reads as one `Gate` kind — TV-04; §12 and §13 item 27 still read V06's companion as pending — TV-06 |
| TU-04 | major | V07 | FIXED | V7 §3.12 *Markets, halls and the fair over epochs* (a)–(f) (l. 2331–2366); §3.6 (4b)'s epoch sentence (l. 1764–1765); §2.6's row (l. 1118); (8v)'s hole (l. 2322–2323); the hand-off up's step 4 (l. 2424–2425); F-V-FAIR's row; W12, W65, W66; T-V7-13's village-history clause (l. 3040); J-V7.116; V-M3's row; V6 §3.9.6's companion *Claim-sized classes at a village rung* (l. 1747–1756), T-V6-51's clause, J-V6.119, V07 §1 (10) marking it landed | the phases named for a record and a roster member cannot run the placements, and three placements name no op — TV-02 |
| TU-05 | major | V06 | FIXED | V6 §3.8.2's rule over every placement an epoch makes (l. 1572–1584); §3.5.2's *Reopened* (l. 1247); §3.9.5 (1) (l. 1705–1707), §3.9.6 (l. 1734–1735), §3.9.10's relaxation and split shop (l. 1819–1831); W75; T-V6-51 (l. 3251); J-V6.107; §10's BCR-V6-18 text (l. 3713–3716), carried by file f item 336 by pointer | — |
| TU-06 | minor | V06 | FIXED | (a) V6 §3.2's `sky.islands` row (l. 1019) and §6.2's per-event pricing, participants note and re-stated century sum (l. 3128–3146), J-V6.118, X40; (b) every `EpochScope` field comment points to W64 (l. 533–541), whose one reader list matches V04 (l. 261, 1376–1377, 1672–1676, 1867–1869), V05 (l. 1428) and V01 (l. 980–989); (c) V6 §3.19.4 (5), X18, IN-V06-4, W64, §2.12's scope row, §1.2's row and T-V6-62 read "an unstored plan … goes stale and a stored one is re-cut inside the epoch event", as V03's digest row does (l. 993) | (a)'s prices are V05 §6's pre-round-4 resize row; V05 changed the row the same round — TV-01 |
| TU-07 | minor | BASE-F | FIXED | (a) item 574's note (l. 370) quotes step (6) as 574 leaves it and says 319 appends after S11; item 319 (l. 360) names the order from its end; (b) item 310's title (l. 331) is V07's; (c) item 309 (l. 329) lists the buried floor under a raised grade and the village working's depth test, the latter from the later of M6-U and the village product | — |
| TU-08 | minor | V05 | FIXED | V5 §13 items 21 – 25 marked landed with their lanes (l. 3466 – 3484); §12's round-2 and round-3 clauses read CONFIRMED (l. 3346, 3356 – 3362) | item 25's second half still reads "open as seam TU-07 (c)", landed since — TV-06 |

## 3 New issues from the sweep (TV-01 – TV-07)

Severity as rounds 0–3: **blocker** (the seam cannot be built as written, or an owner rule fails on it), **major** (a
contradiction or an unwired piece a builder would hit), **minor** (wording, a restatement, a stale pointer). Each names one
owner (V01–V12, or BASE-F for file f and the integration ledger) and the exact change; a companion row in another volume
is named inside the change, as round 3 did. No blocker was found.

### 3.1 Majors

**TV-01 — The island events priced from V05's superseded resize row: no re-landed feet, no shrink, no fall, "none at
TOWN".** major · budget / restatement · **V06** (TU-06 (a)'s residual: V05 changed the row in the same round, 07:19,
before V06's lane read it at 07:31).
V6 §3.2's `sky.islands` row (l. 1019) runs "a growing `resizeIsland`" only; V6 §6.2's row (l. 3128) prices "per growing
`resizeIsland`, ≤ 3 ms plus the scoped re-derivation of its receiving rim districts … — none at TOWN, where the rung row
admits no island and a carried one only wanes", its source cell quoting V05 §6 as "a resize ≤ 3 ms + §12.6's scoped
regeneration"; the century paragraph (l. 3138–3146) and J-V6.118 (l. 3518) sum "a growing resize of every island at
every epoch, 3 × 100 × ≈ 15 / 21 ms", and the round-4 note (l. 3951–3952) records reading V05 §6 so. V05 §6 now reads
"a resize, a rim reshape | ≤ 5 ms + §12.6's scoped regeneration of each receiving district (at most k ≤ 3) + §12.6's 30 ms
per re-landed foot's placement" (V5 l. 2348), because V5 §4.2's resize (reconcile-V05-r4, SLR3-02) re-lays the rim strip,
re-claims each landing yard at its re-seated top with "its foot re-landed as a move re-lands it", re-searches the
institution claim and re-derives its district where the claim no longer fits, and on a shrink clears the plots that lose
half their face, relocating their households (V5 l. 1977–2005); `fallIsland` is ≤ 80 / 110 ms (V5 §6). And V5 §3.15 (3)
and (6) shrink a waning island by `resizeIsland` at every epoch of its dwell **at every rung, TOWN included**, then settle
and fall it. So V06 prices neither re-landed feet, nor shrinks, nor falls, and states none at TOWN. At V06's own
worst-case shape (every island resized at every epoch), with ≤ 3 accesses per island (V5 §6's route-distance row) each
re-landed, the rows as they stand give ≈ 3 × 100 × (5 + 12 + 90) ms ≈ 32 s at CITY and ≈ 34 s at METROPOLIS, plus ≤ 21
falls ≈ 1.7 / 2.3 s — against V06's ≈ 5.0 / 7.0 s — so CITY's re-stated sum (≈ 48.1 s) would pass its 60 s bound; at TOWN
a wane's shrinks (≤ 15 epochs of the longest waning dwell × 3 islands) and three falls add ≈ 5 s against the ≈ 5.6 s the
paragraph leaves for growth stages.
*Required change (V06):* (a) V6 §3.2's `sky.islands` row names every island event the step can run at an epoch — a
raise, a growing or shrinking resize with its re-laid rim pieces, re-landed feet and claim re-search, a settle, a
refloat and a fall — citing V05 §3.15 and §4.2; (b) §6.2's row cites V05 §6's rows by name (`raiseIsland`'s parts, "a
resize, a rim reshape", `fallIsland`) and restates no number — "≤ 3 ms" and "none at TOWN" deleted; (c) the century
paragraph re-derives the sky's worst case from those rows at every rung, TOWN's waning shrinks and falls included, and
either bounds the re-landings by V05 §4.2's own rule (a vertical access's foot re-lands only when its top's move leaves
its landing plot, a slanted one only past its run — the per-century bound stated from V05's `growthPerYear` and the
landing plot's least width) or, where the bound still fails, applies §6.2's own rule now: the bound re-declared at the
new sum for the owner's veto (D-18); (d) J-V6.118 and the round-4 note say which, and X40's pricing sentence follows.

**TV-02 — The village's market records and claim-sized arrivals at an epoch: phases that cannot run the placements, and
three placements with no op.** major · unwired / order · **V07**, with the V06 companion rows named below (TU-04's
residual; parts (a)–(c) trace to round 3's own wording — "the `dossier` phase for a record, `siting` for a roster
member" and a record routed through V6 §3.9.6 — so this round owns them).
(a) **No hook in the dossier step.** V7 §3.12 places market records "in the batch of the phase that brings them — the
`dossier` phase for a record (§3.11's absorb half), `siting` for a roster member" (l. 2333–2334). At a village rung V07
overrides only `siting` and `growth` (l. 2296) — V06's `ProductDeclEpoch.phases` admits only those two (V6 l. 513) — and
"every other phase … the dossier … is the engine's". The engine's `dossier` step (V6 §3.2 row 12, l. 1006) applies the
epoch's dossier events by the base, where "only a dossier event the epoch applies at step (e) removes, adds or
re-designates" a dossier element (base §4.11 *Dossier content across epochs*, l. 6459), and it names no call into V07.
So a `fish_market`, `weekly_market` or `annual_fair` record arriving at a village epoch is placed by the base's §7.7
placement — not by (a), (b) or (d) — or, for the fair, not at all (the base's *Markets over epochs* claim needs an S7b
that never runs at a village rung, as V07 itself says).
(b) **A record after the step that would place it.** (c) sends a claim-sized member "opening at a village epoch" through
V6 §3.9.6's openings (V6's companion paragraph, l. 1747–1756), and T-V6-51 (l. 3251) reads "a roster member or a record".
V6 §3.9.6 is the `uses` step (row 6), which runs before the `dossier` step (row 12) that adds the record, so a
`monastery_or_friary` record has no join in the epoch it arrives, while the base keeps a dossier element "live and placed
at every step".
(c) **Roster deficits no step reads.** A roster `fair_ground` or `nearMarket` hall is counted by V6 §3.9.1 in `uses`,
which leaves it — "the markets … never opened here" (V6 l. 1728), "placed by V07 §3.12 (b) in the phase that brings it,
never here" (V6 l. 1755–1756) — while V07's siting override (l. 2310–2327) lists no step that reads the manifest's market
members or places them.
(d) **Placements with no op.** (b)'s hall "takes §3.6 (4a)'s claim" only; at generation "S10 lays it as the hall's plot
and S10b seats the hall on it" (l. 1751), but at an epoch no step cuts the plot, builds the hall or opens its `Use`. (c)'s
fallback "takes an outside plot of that area on the nearest hinterland face …, the face's land use closed there" names
no op: the base's outside plots are the hinterland unit's S10 at generation (base §4.9, l. 5893–5905) and V6 §3.9.6
never opens an outside class. (a)'s faces "turned to the `commons` land use by `retypeLand`" leave their `VillageField`'s
furlong list unstated, and V6 §2.8's `retypeLand` comment (l. 771) and W10's issuers (l. 393) do not name this use.
*Required change (V07, with V06's rows):* (1) **V06:** `ProductDeclEpoch` (V6 §2.1) gains `records?: string /* an
EpochPlacement id: the product's placement of a newly added dossier record, called by the dossier step at that
product's epochs before the base's §7.7 item 2 placement; it places the record or declines it, and a declined record
takes the base's placement */`; V6 §3.2 row 12, W75 and BCR-V6-1's text name it. **V07** registers it: at a village rung
it takes the records of V11's `market` profile family (§3.6 (4)) by §3.12 (a), (b) and (d), and those of the `cloister`
family and of the `market-hall` family without a `nearMarket` row by V6 §3.9.6's claim-sized rule (the join, else (c)'s
outside plot), in the dossier step's batch, so a record is placed in the epoch it arrives; V6 §3.9.6's companion sentence,
T-V6-51's clause and V7 §3.12 (c) read "a roster member in the `uses` step; a record through the product's `records`
placement in the `dossier` step". (2) V07's siting override opens with a named step before tier (0): the manifest's
`fair_ground` and `nearMarket` hall members at the target less the standing ones (the count V6 §3.9.1 makes and V6
§3.9.6 leaves to it), placed by (a) and (b). (3) (b) adds "in that batch the claim is laid as the hall's plot by S10's
claim form, the hall is built on it by S11 (a `build`, its Works scheduled by V6 §3.13) and its use opened by `openUse`
(cause `dossier` for a record, `demand` for a roster member, minted as V6 §3.9.6 mints an opening); the joined-plots form
the same on the joined plot"; (c)'s outside plot is cut on the hinterland face by the hinterland unit's S10 in its
incremental form (neighbours fixed), the face's remnant kept, its building by S11 and its use by `openUse`; (a) adds that
each face turned to `commons` leaves its `VillageField` as the hand-off up's clear regions do (a field left without a
furlong tombstoned in that batch). (4) **V06:** §2.8's `retypeLand` comment and W10's issuers add the fair field's retyping
(V07 §3.12 (a)). Every op in the epoch's record, undone by the epoch's undo record. T-V7-13's village-history clause adds a
roster `fair_ground` whose law passes at an epoch and a `fish_market` record whose hall stands built with its use open in
the epoch the record arrives; a J-V7 row records the hook (over overriding the engine's whole dossier step or deferring a
record to the next epoch's `uses` step, which would leave a dossier element unplaced for an epoch).

**TV-03 — VS8's pins have no epoch path, now that S11's furniture step places none at the territory rungs.** major ·
unwired / lifecycle · **V07** (older text made reachable by round 4's SR3-02 and BCR-V7-38).
V7 §3.10 makes VS8's rows "the village's whole furniture": at the rungs whose `frameLaw` is `territory`, S11's furniture
step places no pin (l. 2056–2061; BCR-V7-38, l. 3636). VS8 is a generation stage; V7 §3.12 (l. 2290–2505) gives it no
epoch caller and registers no participant for it (W28, l. 385, names `village.plan` and `village.density` only; W25,
l. 382, names VS8's rows as the pins' only producer). So at a village epoch nothing places the wells of VS8's coverage
row ("one per 8 households within 120 m of their dwellings") for the dwellings (6v)–(9v) add; a new nucleus's centrepiece
((9v), §3.6 (5)); the stalls of a market that arrives or whose law passes — (d) says "VS8's stalls stand along the
through road's frontage nearest the heart", with no op placing them — or of the green the hand-off up's step 3 makes the
principal market (l. 2418); nor the stall count "one per `stalls.perHouseholds` (40) households" as the village grows. A
village grown over a century from 40 to 1 400 people keeps its thorp's wells. And §3.10's "no statue, fountain, bandstand
or monument stands in a village" (l. 2060–2061) contradicts the hand-off down, where "the standing fabric survives
unchanged" (l. 2450) with the town's S11 pins.
*Required change (V07):* §3.12 gains *Pins over epochs*: a participant `village.pins` at `afterGrowth` (ordered after
V06's participants, `stage: 'VS8'`, V6 §2.1 and §3.16; registered at village rungs only) that runs VS8's pin rows by least
disruption over what the epoch changed — wells added by the coverage row where the households the epoch housed lie
uncovered, a market's stalls brought to its count (along the rim, or the frontage (d) names; removed when the market
closes), a new nucleus's open space given its centrepiece by §3.6 (5) — and removes no pin whose host stands (a pin goes
with its host by V06's decline); each pin op in the epoch's record, undone by its undo record. The hand-off up's step 3
runs the stall rows on the green it makes a market, in that batch. W25 and W28 name the participant, V06's participant
table gains its row (a V06 hand-off), and T-V7-57 gains a village-history clause (every housed household within VS8's
coverage row and every market at its stall count at each village epoch). §3.10's sentence reads "… and no village stage
and no furniture step places a statue, fountain, bandstand or monument at a village rung; a handed-down town's standing
pins stay as standing fabric (§3.12)". A J-V7 row records the participant (over re-running VS8 whole at an epoch, which
would move standing pins, or letting S11's furniture step run at village epochs, which BCR-V7-38 forbids).

### 3.2 Minors

**TV-04 — "Gatehouse" for a gate: one `Gate` kind named for all.** minor · term · **V05** (with one V06 word).
V5 §3.16 (4) (l. 1478–1483), (5) (l. 1515–1516), §2.6's `Enceinte.condition` row (l. 773), §1b's landfall row (l. 385) and
J-V5.79 (l. 2793) extend the `breached` length over "each covered tower's and gatehouse's footprint chord"; V6 §3.7.5's
in-use paragraph (l. 1475–1476) stands "its towers and gatehouses" again, while V6 §2.8 (l. 766, 770), §3.7.2 (l. 1422),
§3.7.5's first paragraph and X41 say "towers and gates". In the base `gatehouse` is one `Gate.kind` beside `main`,
`postern`, `water` and `castle`, and every `Gate` has a footprint (§2.7, l. 1778–1779), so the landfall text read
literally leaves a covered `main` gate or postern outside the breached run, drawn standing under the rubble.
*Required change (V05):* the five places read "each covered tower's and gate's footprint chord (a `Gate` of any kind)"
and "towers and gates"; V6 §3.7.5's in-use paragraph reads "its towers and gates standing again with the run".

**TV-05 — File f item 575: the lifecycle sentence has no way out of `abandoned`.** minor · bcr · **BASE-F** (TU-02's
residual).
Item 575 (l. 171) lists "volume 6's `repairWall` (a `breached` run back to `standing`; on a `dismantled` run it bends as
volume 6 §2.8 states)" and "The record's `lifecycle` stays the ops' (`abandoned` on `neglect`; `decayed` while any run is
not `standing`; back to its former state when `repairWall` leaves every run `standing`)". V6 §2.8's `repairWall` now has a
no-stretch form lifting the ring's latest unlifted `neglect` — to its pre-neglect existence when every run stands, else
`decayed` — issued by the fortification phase and by hand (V6 l. 770; J-V6.115). V06's X42 routed this to the coherence
pass as needing no field, which holds, but no lane applied it, and the base will carry a lifecycle in which a neglected
ring's only exit is a `repairWall` that the item describes as run-by-run.
*Required change (file f item 575):* the `repairWall` clause adds "; with no stretch, volume 6's lift of the ring's
`neglect` (V6 §2.8)", and the lifecycle parenthesis reads "(`abandoned` on `neglect`, until volume 6's no-stretch
`repairWall` lifts it — back to the pre-neglect existence when every run is `standing`, else `decayed`; `decayed` while any
run is not `standing`; back to its former state when `repairWall` leaves every run `standing`)"; X42 is then met.

**TV-06 — V05: its round-4 cross-lane halves have landed.** minor · stale pointer · **V05** (TU-03's and TU-08's
residual).
V5 §12's round-4 paragraph (l. 3367–3369) keeps "PLAUSIBLE: that volume 6's round-4 lane makes towers and gates follow
their runs in its repair, absorption and drawing (seam TU-01), which V5 §3.16 (4) relies on (§13 item 27)"; §13 item 27
(l. 3499) reads as pending, and item 25's second half (l. 3484–3486) "open as seam TU-07 (c), merged with SLR3-12 in file
f's round-4 lane". Both landed: reconcile-V06-r4 at 07:31 (V6 §2.8, §3.7.2 (3), §3.7.5, §5.1, J-V6.112, J-V6.114; its X41
"this volume's side is landed"), and file f's round-4 lane (item 309, l. 329, with both readers).
*Required change (V05):* §13 item 27 and item 25's second half marked landed with those lanes; §12's clause moved to
CONFIRMED, citing the V06 anchors and item 309's text.

**TV-07 — V06's raised-way pass skips item 244's support step.** minor · citation / order · **V06** (new with
`_integrate`'s continuation, J-VI.27, 08:13).
File f item 244 (l. 165) gained **the support step**, run "for every raised way — generated, declared or drawn — after its
course and deck level are fixed and before the span rule": the stations at a pitch drawn on the raised-way stream keyed
by the way's lineage and `pitch` in volume 11's `pierSpacingM` band (or the held `spanSpacingCm`), the pier rings, a pier
over `maxPierM` dropping a generated course as `raised_too_tall`, and the clearance rule over crossed part-0 ways;
J-VI.27 chose one step "because every rung and every path (generation, declaration, epoch) lays piers the same way". V6
§3.19 (5) (l. 2552–2559) goes from the course solver to "the base's span rule on the committed course", and (7) clears
"its support footprints" before the commit (l. 2566) — footprints no step before the commit has made; the volume never
names the step (0 hits for "support step", `spanSpacingCm`, `clearanceCm` or J-VI.27).
*Required change (V06):* §3.19 (5) reads "… solves the course …; item 244's support step (file f item 244; J-VI.27) then
lays the stations and pier rings on it — a generated way holding no `spanSpacingCm`, its pitch drawn as the step states —
and checks the clearance over the crossed ways, a course whose pier exceeds `maxPierM` dropped (`raised_too_tall`) and the
candidate waiting (`raised.waited`, its `u` unchanged); the spans' use is then the base's span rule on that course"; (7)'s
"support footprints" reads "(the support step's pier rings)"; W57 names the step among its inputs.

## 4 Summary counts and CONFIRMED versus PLAUSIBLE

**Round 3 re-checked:** 8 issues — **8 FIXED, 0 PARTLY, 0 NOT FIXED, 0 REGRESSED.** Every contract rounds 0–3 settled
still holds on both sides: the fold's product and rung, the catacomb primary, cap, ratchet and keys, the underground's own
lottery, the hollow-way ladder with its placement trigger — now over every placement an epoch makes — the landfall's
typed members and reopened accesses, the crowding hook's void seats, `Foundations.apply` with its vacated households, the
enceinte's `condition` runs with towers and gates following them, no Works on a wall, the ring in use repaired and a
neglected ring put back in use, the kept stretch under a raised gate, and the one reader list of `EpochScope`.

**New from the sweep:** 7 issues — **0 blockers, 3 majors, 4 minors.** One major is a sibling's row that moved in the same
round (TV-01); one is round 3's own required change, whose phases cannot run it and whose placements name no op (TV-02);
one sits in text round 4's furniture rule made reachable (TV-03).

| owner | major | minor | total | issues |
|---|---|---|---|---|
| V06 | 1 | 1 | 2 | TV-01 (major); TV-07 |
| V07 | 2 | 0 | 2 | TV-02 (with V06's `ProductDeclEpoch.records`, row 12, §3.9.6's companion sentence, T-V6-51, `retypeLand`'s comment and W10), TV-03 (with a V06 participant-table row) |
| V05 | 0 | 2 | 2 | TV-04 (with one V06 word), TV-06 |
| BASE-F | 0 | 1 | 1 | TV-05 (file f item 575) |

**What must move together.** TV-02 with its V06 rows (the `records` hook on `ProductDeclEpoch`, V6 §3.2 row 12, W75,
BCR-V6-1's text, §3.9.6's companion sentence and T-V6-51, `retypeLand`'s comment and W10); either side may land first,
each citing the other's new sentence. TV-03 with V06's participant-table row for `village.pins`. TV-04 with V6 §3.7.5's one
word. TV-01, TV-05, TV-06 and TV-07 alone. Each is stated so either side can land first.

**What the seam now holds** (round 0's census rows and every row rounds 1–4 repaired): the fold's product and rung read by
every V06 step, V05's islands and V07's phases; V07's epoch rows in V06's `ProductEpochRows` shape and its participants'
stages `VS1` and `VS2`; the hollow-way ladder issued whole by V06 and reopened before any placement an epoch makes; the
landfall's `formerClass`, typed members, member-leaving batches and reopened accesses, its towers breached with their runs;
the enceinte's `condition` by run with its writers, readers and undo, the no-stretch lift of a neglect, and towers and
gates with no state of their own; the catacomb primary, cap, ratchet, count, deaths and keys; the underground's own
lottery, which a declaration's held pieces escape; `Foundations.apply` at every rung; the crowding hook's void part at
`growth` and F6's new dwellings by relocation; the village working's breach; the buried floor's terraces; one suppression
rule in two record forms and each suppressed kind's serving re-add; the retaining wall's condition by stretch; decks as
their host's existence; the island unit run after generation inside its calling commit; the crypt rank that never
shortens a basement; stored plans re-cut and unstored ones staled by a levelling; the village's market records, halls and
fair at an epoch (to be wired by TV-02).

**CONFIRMED versus PLAUSIBLE.** Every status in §2 and every issue in §3 is **CONFIRMED** as a textual fact: each side's
sentence was read in its enclosing subsection in the files as they stood from 12:00 on 2026-09-29 (md5s in §1), cited by
section and line, and the base's records and rules (`Gate`, `Tower`, §7.2's *Declared means held*, §4.9's count-driven
outside plots, §4.11 *Dossier content across epochs*, §12.6's scoped law) were read at their lines in
`docs/ARCHITECTURE.md` (md5 01fea21f…). The **consequences** named — CITY's century sum past its bound (TV-01), a market
record placed by the wrong rule or not at all and a friary with no join in its arriving epoch (TV-02), a grown village
with its thorp's wells (TV-03), a covered gate drawn standing (TV-04) — are **PLAUSIBLE**: reasoned from the texts, with
no implementation or fixture executed (none exists at this stage); TV-01's figures are this round's arithmetic from the
rows as they stand, not a measurement. Each required change is the seam's recommendation, vetoable by the owning
volume's next revision or by the whole-design retrovalidation (J84).
