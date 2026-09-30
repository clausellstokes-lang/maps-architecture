# Seam check, round 6 — evolution (V06) against every stage it changes (V01, V02, V03, V04, V05, V07, the base, file f)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-time-r6; covered by the whole-design retrovalidation (J84).

Lane `volumes/seam-time-r6`, 2026-09-29. Reconciliation round 6 of the time seam: (A) re-check every issue of round 5
(`docs/volumes/critique/seam-time-r5.md`, TW-01..TW-09) against the reconciled volumes — each must now be fixed; (B) sweep
the whole seam again, since the repairs elsewhere can break it.

PROGRESS
- §1 Method, inputs and scope: done
- §2 Round-5 re-check (TW-01..TW-09: FIXED / PARTLY / NOT FIXED / REGRESSED): done
- §3 New issues from the sweep (TX-01..TX-06; §3.3 the sibling seams' findings cited): done
- §4 Summary counts and CONFIRMED versus PLAUSIBLE: done

## 1 Method, inputs and scope

**Inputs (as read on 2026-09-29 from 14:27, after every reconcile-*-r6 lane had landed — V09's, the last, at 14:27).**
`docs/volumes/V06-evolution.md` (4 622 lines, md5 412a7418…, which holds reconcile-V07-r6's companion rows of 13:47,
reconcile-V05-r6's counterpart edit of V6 §6.2 at 13:48 and reconcile-V06-r6's landing at 13:59), V01 (4 454, 85b488b3…),
V02 (4 828, 65e5ea63…, unchanged since round 5), V03 (3 852, eb01b7dc…), V04 (4 160, 9cae4284…), V05 (3 808, 663afd43…),
V07 (4 530, 215e9cae…), `docs/volumes/_integrate.md` (468, 965ab696…, unchanged), `docs/AMENDMENTS-2026-09-28f.md`
(1 806, 839ccce5…) and the base `docs/ARCHITECTURE.md` (01fea21f…, unchanged since round 0). Round 5 itself
(`critique/seam-time-r5.md`, 345 lines) is unchanged since its landing, so its nine issues TW-01 – TW-09 are the
re-check's whole list. Snapshots: `scratchpad/volumes/str6/now/`; the round-5 inputs, `str5/now/`, whose md5s equal
round 5's (§1 there).

**How the seam was read.** (1) **Every line changed since round 5**, from line diffs of each seam file against
`str5/now/` (`str6/d-*.txt`, 1 741 lines), so every round-6 landing — reconcile-V07-r6's rows in V06, reconcile-V05-r6's
V6 §6.2 re-sum, reconcile-V06-r6, reconcile-BASE-F-r6's items 202, 238, 313, 317, 516, 578 and 585 — is inside the diffs.
V06's, V07's, V05's and file f's diffs were read whole; V01's, V03's and V04's were read hunk by hunk wherever a hunk
touches an epoch, a participant, a V06 op or record, or a base record an epoch writes (V01's stage-2 switch edit, V03's
stair-entered crypt and its epoch triggers, V04's opening-pass row — none changes an epoch's behaviour). (2) **The seam's
round-6 sections whole in their current text**: V6 §2.1 (`EpochParticipant`, `ProductDeclEpoch.records`,
`EpochPlacement`, `EpochContext`), §3.2 (the step table, the participants table and its note on `'grow-by-stage'`),
§3.9.6's claim-sized paragraph, §3.9.11 (the ladder-step table), §3.16's *Keys*, §6.1, §6.2 whole, W3, W37, W44, W75,
T-V6-45, T-V6-51, J-V6.118, J-V6.123 – J-V6.125, BCR-V6-1, X46 – X48 and both round-6 notes; V07 §1's dependencies (1) –
(13), W18, W25, W28, W70 – W73, §2.1 (`ProductDecl`, *The records placement*), §2.4's ladder rows, §2.6's round-6 rows,
§3.10's pin-record rule, §3.11's absorb half, §3.12 from *Which path runs* to *Decline and desertion*, §3.14, §6's epoch
prices, T-V7-13, -15, -16, -30, -35, -50, -51, -57, §8 whole, J-V7.98, J-V7.125 – J-V7.133, BCR-V7-18 and the round-6
note; V05 §1b's `levelledGroundCm` row, §4.2's inward reshape, §6's resize row, J-V5.81, §12's round-6 paragraph, §13
items 30 – 34; file f items 202, 209, 268, 317 and 322; the base's §4.11 *The epoch's order* (l. 6167–6190), the
`EvolutionStrategy` interface (l. 6356–6363), *Regrowth-first* (l. 6546–6555), *Markets over epochs* (l. 6742–6744),
`Pin` (l. 1807–1809), §6.1's post-build placement key (l. 7139–7140), §7.1's `setAttr` (l. 7853) and §16's M4 row
(l. 14894). Because round 6's V06 and V07 text now cites V08's ladder cases and V11's ladder rows by name, V08 §3.5.1 (c)
*A pair that meets over time* and (d) *Steps over time* (l. 1656–1707), J-V8.111 and J-V8.114 (l. 2875, 2878) — as
reconcile-V08-r6 landed them at 14:12, after V06's and V07's round-6 lanes — and V11 §3.12's `town_watch` row (l. 2746)
were read at their lines; V10's prompt rule 17 (l. 1375–1376) for V6 X48.

**Method.** (A) Every round-5 issue was traced to the sentence its required change names, on each side, and graded
**FIXED** (both sides say one thing), **PARTLY**, **NOT FIXED** or **REGRESSED**; a FIXED issue whose repair left a
neighbouring sentence stale, or whose required change was itself incomplete or wrong, keeps FIXED and names the residual
raised in §3. (B) The sweep asked of every piece of state round 6 added or moved — the placement's `event` key and its
`remove`, the REPLACEMENT greater placed new at an epoch (V07 item 4, V6 §3.9.11), the participants' self-gating, the
registration's hooks on M4's grow path and the milestones that rely on them, the pins' orphans step and wells, the market
cross beside a held centrepiece, a record's joins as its event's disruption, the island resize's yard tops and re-cut
plots and the re-declared century bounds — its epoch behaviour, its transition step and phase, its identity and keys,
its undo, and whether a producer and a consumer exist on both sides, on the epoch path and on every other path that
reaches the same code (the absorb without an epoch; the base's grow path before volume 6). Line numbers (`l. n`) are the
files' as read today.

**Scope limit, stated so it is not mistaken for coverage.** Text unchanged since round 5 was judged by rounds 0–5 and
re-read this round only inside the sections listed above. Three findings trace to round 5's own required changes and this
round owns them: TX-01 (TW-03 (2)'s "V-M2 and V-M3 need no M6-E milestone", true of V-M2 and not of V-M3), TX-02 (TW-03
(1)'s "run on M4's grow path by the hook V04's U5 uses", a hook the grow path does not have) and TX-03 (TW-02 (2) named the fair field's and the pins' removal and not the market rank's). Three contradictions this
sweep also found — V6 §3.9.11's placed-new test, militia clause and receipt binding; V07's receipt binding and stale
§1 (13); V06's X47 and X48 — were written by the sibling round-6 seams while this lane ran (seam-settlements-r6 SR6-01,
SR6-02, SR6-04; seam-surfaces-r6 SR6-07); §3.3 cites them and does not re-raise them (single source). Checked and **not**
raised: V05's resize row and V6 §6.2's re-sum (the arithmetic re-done: growing ≈ 228 / 255 ms, shrink ≈ 209 / 227 ms, worst
case 68.4 / 76.5 s and TOWN 9.6 s, sums ≈ 24.8 / 112.7 / 211.3 s, bounds 25 / 115 / 215 s, cited alike in V6 §6.3,
BCR-V6-22, J-V6.118, J-V5.81 and V5 §12–§13, and quoted by no other volume); V01's round-6 shrink sentence against V6
§6.2's shrink term (the claim's district re-derived, the rim ring re-cut: both priced); V03's stair-entered reading, whose
wing changes at an epoch re-derive the basement inside the causing event as V06's crypt row reads; `forkAt(seq)`'s prefix
"through `seq`" against V10 rule 17's "`<seq>` … less one" (one meaning); `EpochPlacement`'s own stream keys (built from
§6.1's key words, not `ctx.stream`, as V7 §3.14 states); a forced well's provenance turned by `setAttr` on `Pin.rule`;
file f item 209's `retypeLand` "also with the village product, V-M0 to V-M4, whichever lands first", which the absorb
path's fair field at V-M2 needs. No finding rests on a sampled line: each was re-read in its enclosing subsection on both
sides before it was written.

## 2 Round-5 re-check (TW-01 – TW-09)

**Result: 9 FIXED, 0 PARTLY, 0 NOT FIXED, 0 REGRESSED.** Every owner applied its side as round 5 required, and every
companion round 5 routed across lanes now agrees: V06's `EpochPlacement` signature, `remove` member, row 12, W75,
BCR-V6-1 and §3.16 sentence (applied by reconcile-V07-r6 as a logged shared-file edit at 13:47), file f items 202 and 317
(reconcile-BASE-F-r6, 14:03, J-RF6.1), V06's re-sum for TW-04 (reconcile-V05-r6's counterpart edit, 13:48), and V07's
citation of V6 §3.9.6 for TW-05. Four repairs left a residual — a milestone or hook sentence of round 5's own required
change, a removal that stops short of the market rank, or a participant's cost and gate — raised in §3.

| id | sev. (r5) | owner | status | evidence now | residual |
|---|---|---|---|---|---|
| TW-01 | major | V07 | FIXED | V7 §3.12 (b)'s ops (l. 2497–2506: a record's plot, building and use "minted as the base mints a post-build placement's, from the adding dossier event's `seq` and their ordinal"; a roster member's by V6 §3.9.6's epoch key), (c) following (l. 2519–2520); §3.14 (l. 2800–2808); §2.1's *The records placement* (l. 597–611) and `records` comment (l. 580–583); §2.6's rows (l. 1217, 1219); W70, W73; J-V7.128, J-V7.129; BCR-V7-18 (l. 3740–3762, "the last epoch's number" gone); T-V7-13's two-absorb clause (l. 3314); V6 §2.1 `place(ctx, record, event: { seq })` (l. 540–545), the context comment without an epoch number, §3.16's *Keys* sentence (l. 2268–2272), row 12 (l. 1040), W75 (l. 482), BCR-V6-1 (l. 3663–3674) | the placement's context is typed as V06's whole `EpochContext`, which neither the absorb path nor the grow path before E1 can build — TX-02 (2) |
| TW-02 | major | V07 | FIXED | V6 §2.1 `remove?(ctx, record, event)` (l. 544–545), row 12, W75, BCR-V6-1; V7 *A removed record* (l. 2566–2577), §3.12 (a) (l. 2485–2487), §3.11's absorb half (l. 2399–2401), W25, W70, §2.6's rows (l. 1215, 1217, 1219), §6's `remove` price (l. 3279–3282), T-V7-13's removal clause, J-V7.130 | "a market's rank takes nothing more" leaves a removed market record's market standing with its stalls — TX-03 |
| TW-03 | major | V07 | FIXED | BCR-V7-18's "Without V06" sentence and *Where it lands* (l. 3740–3762); §3.12 *Which path runs* (l. 2430–2434); §8's V-M2 and V-M3 rows (l. 3381, 3383), *Where it slots* (l. 3418–3422), risk (9) (l. 3456–3461); W28; §1 (13) (l. 386–403); J-V7.132; file f item 202's *The records hook* and item 317's note (J-RF6.1) | round 5's own required change over-reached: V-M3's clauses that run volume 6's steps cannot exit without M6-E — TX-01; and "the hook V04's U5 uses" names no hook of the grow path — TX-02 |
| TW-04 | major | V05 | FIXED | V5 §6's resize row (l. 2370: "+ §12.6's 30 ms per re-claimed landing yard's top placement (`placeAt`, one per access, ≤ `accessCount.max`; …)" and, beyond the seam, the re-cut plots' one scope), J-V5.81; V6 §6.2's row (l. 3203), century paragraph and sum (l. 3215–3257: ≈ 24.8 / 112.7 / 211.3 s, bounds TOWN ≤ 25 s, CITY ≤ 115 s, METROPOLIS ≤ 215 s under D-18), J-V6.118 (l. 3630), BCR-V6-22 (l. 3879–3880), X46 met (l. 4238) | — |
| TW-05 | minor | V06 | FIXED | V6 §3.9.6 (l. 1804–1808: a roster member's joins on the `geometry` cap; a record's "its dossier event's disruption, charged to no churn cap, bounded by the request kind's `DisruptionBudgetRow` and reported over budget, never refused"); J-V6.123, J-V6.119 aligned; T-V6-51's spent-cap clause (l. 3363); V7 §3.12 (b), (c) citing it (l. 2503–2506, 2520) | — |
| TW-06 | minor | V07 | FIXED | *Pins over epochs* step 0 **orphans** (l. 2587–2588), step 1's "every housed household the standing wells, pumps and unbroken delivery points leave unserved" (l. 2591–2594), the no-removal sentence with step 0 (l. 2611–2613); §3.10's market cross beside a held centrepiece (l. 2164–2166); W72's inputs; §2.6's pins row; T-V7-57's exceptions (l. 3358); J-V7.126, J-V7.127 | — |
| TW-07 | minor | V07 | FIXED | §3.12's lead-in (l. 2477–2479), the absorb sentence (l. 2577–2578), *Pins over epochs*' ops (l. 2614–2616), §2.6's rows (l. 1215, 1217, 1218, 1219, 1225), W70, W71, W73, J-V7.125's last clause | — |
| TW-08 | minor | V06 | FIXED | `EpochParticipant.run`'s comment (l. 536), W3 (l. 410), W37 (l. 444), V6 §3.1 (4), row 5 (l. 1032), the participants table's lead and scope cells (l. 1049–1062), BCR-V6-1's runner sentence (l. 3652–3654), T-V6-51's self-gating clause, J-V6.124 | V07's own sentences still say the runner adds the village participants at a village rung — TX-05; the self-gated `village.density` now runs at base-product epochs no budget prices — TX-04 |
| TW-09 | minor | V05 | FIXED | V5 §12's round-5 clause CONFIRMED (l. 3422–3428) and round-6 paragraph; §13 items 30, 31 **Landed** (l. 3597–3603) | — |

## 3 New issues from the sweep (TX-01 – TX-06)

Severity as rounds 0–5: **blocker** (the seam cannot be built as written, or an owner rule fails on it), **major** (a
contradiction or an unwired piece a builder would hit), **minor** (wording, a restatement, a stale pointer). Each names one
owner (V01–V12, or BASE-F for file f) and the exact change; a companion row in another volume or in file f is named inside
the change, as rounds 3–5 did. No blocker was found. §3.3 cites, without re-raising, what the sibling round-6 seams wrote
on the same sentences while this lane ran.

### 3.1 Majors

**TX-01 — V-M3's clauses that run volume 6's steps cannot exit before M6-E; "V-M2 and V-M3 need no M6-E milestone" is
true of V-M2 only.** major · build order / contradiction · **V07** (round 5's own required change, TW-03 (2)).
V7 §8 *Where it slots* (l. 3418–3422) now reads "V-M2 and V-M3 need no M6-E milestone — the records call, the two phase
overrides and the participants run on M4's grow path by the hooks of the product's registration", J-V7.132 agrees, and
§8's opening (l. 3374–3375) lists the village's needs as M2b, M3a "and the epoch path (M4)". V-M3's row (l. 3383) builds
"the epoch phases, desertion with the hollow ways and house platforms as records, the ladder steps and the palisade's
replacement" and exits T-V7-16, T-V7-30, T-V7-50, T-V7-51 and T-V7-35's promotion clause. By V07's own text those run
volume 6's steps: *Decline and desertion* (l. 2620–2632) is "the engine's strike lottery (V06 §3.5)", a way a candidate "of
the pool's `street` kind at a village rung (V6 §3.5.2, read through the village's epoch rows)", reopened "by V6 §3.8.2 tier
(5′)"; J-V7.98 (l. 3566): `retireWay` "issued by V06's street candidate"; a ladder step carried by an epoch is V6
§3.9.11's (V6 §3.2 row 12 — V7 §3.11, l. 2403–2408, states only the absorb's); a carried raised way declines by V6
§3.19.2 (dependency (6)); the siting override's tier (0) "reads the
ledger's pool as V6 §3.8 states" (l. 2452); a claim-sized roster member opens in V6 §3.9.6's `uses` step (l. 2476–2477).
V06 lands those at M6-E (V6 §8, l. 3410–3413: E1 the household ledger and the runner, E2 the strike candidates and the
siting tiers, E3 the fortification pathway and dossier gate, E4 the counts and the ladder steps), and the base's M4 builds
only "the one incremental path: add a growth stage to an existing town" with the decline table as a hook (§16's M4 row,
l. 14894; §4.11 "The evolution engine is the owner's later stage (DEF-8); its hooks are concrete now"). V07's pre-decided
fallbacks cover only the raised-way decline (risk (8), l. 3450–3455; dependency (6)). So a V-M3 seat landing before M6-E,
as *Where it slots* now permits, cannot exit T-V7-16, T-V7-30 or T-V7-50's desertion clause, nor T-V7-35's promotion
clause where it runs over epochs, and nothing states what a village epoch before M6-E does in place of the street strike or
a ladder step the epoch carries.
*Required change (V07):* (1) *Where it slots* reads "V-M2 needs no M6-E milestone — the records placement on the absorb
path and its hooks land with file f item 202, `retypeLand` with the village product by item 209; V-M3's grow-path parts —
the two overrides, the dossier step's call of `village.records`, `village.pins`, the hand-offs by item 322's fold — need
none, and its clauses that run volume 6's steps exit with M6-E: the desertion's street candidate and hollow ways (V6
§3.5.2 through `ProductDeclEpoch.rows`, E2: T-V7-16, T-V7-30, T-V7-50's desertion clause), a claim-sized roster member's
opening and the counts (V6 §3.9.6, §3.9.1, E4), a ladder step carried by an epoch (V6 §3.9.11, E4: T-V7-35's promotion
clause over epochs) and a carried raised way's decline (V6 §3.19.2, E3: T-V7-51, risk (8))"; §8's opening names M6-E's E2–E4 for those clauses, and §1's dependencies gain (14) volume 6's engine for them;
(2) a risk (10) states the pre-decided fallback for a village epoch run on the grow path before M6-E — recommended: no
way struck (no hollow way until E2), a ladder step or a walls record the epoch carries applied by the base's dossier step
as V07 §3.11's absorb half applies it (member #1 kept, the rest by S10b's `dossier` request; the palisade's REPLACEMENT;
V08 §3.5.1 (c), (d)'s bindings), a claim-sized roster member waiting in its deficit, each
reported in the epoch's report — and moves those clauses' exits to the first V07 exit after E4, priced inside V-M3's
range; (3) V-M3's row's "all on M4's grow path by the registration's hooks (V-M2) until volume 6's engine carries them"
is narrowed to its grow-path parts, and J-V7.132's reason names the split.

**TX-02 — The grow path has no "hook V04's U5 uses": the product's participants, phases and placement have no call point
and no context before volume 6's E1.** major · unwired · **V07** (round 5's own wording, TW-03 (1)), with V06's §2.1 and
§3.2 note and file f item 202 (BASE-F).
BCR-V7-18 (l. 3740–3744) and §3.12 *Which path runs* (l. 2430–2434): "Without V06, `grow-by-stage` consults the same two
overrides (`siting`, `growth`), its dossier step (e) calls the product's records placement as below, and the village's
participants `village.plan`, `village.density` and `village.pins` run on M4's grow path by the hook V04's U5 uses (V6
§3.2's participants note)"; file f item 202's *The records hook* the same ("its participants, which run on M4's grow path
by the hook volume 4's U5 uses"); J-V7.132 (l. 3600): "the hooks are small wiring on the grow path's existing dossier step
and participant loop". But V6 §3.2's note (l. 1074–1076) says the opposite of a shared hook: "`'grow-by-stage'` registers
no participant of its own …, so the adapters live in `@plat/evolve` only for `'history'`, and under `'grow-by-stage'`
V04's own M4 hooks stand" — and V04's M4 hooks are sentences its BCR-6 writes into base §4.11 naming V04's functions at
fixed places (V04 l. 3053–3067: the underground's lottery at the decline step; `SewerStrategy.extend` after S11 of a new
stage), not a loop over registered participants. The base's grow path is one `EvolutionStrategy.plan(doc, inputs, tables,
rng)` (l. 6356–6363) over the order (a)–(j) (l. 6167–6190), with no `afterField` or `afterGrowth` step (V6 §3.2's table
marks `afterField` "—", no base step). The interfaces are V6 §2.1's: `EpochParticipant.run(ctx: EpochContext)`,
`EpochPhase`, `EpochPlacement.place(ctx: EpochContext, …)` — and `EpochContext` (l. 573–582) carries `params`,
`exposure()`, `households: HouseholdLedger`, `churn: ChurnLedger` and `report: EpochReportSink`, which only V06's E1 builds
(the household ledger, BCR-V6-17; the report skeleton, BCR-V6-14). So on M4's grow path a V-M2 or V-M3 seat finds no
place in (a)–(j) where `village.plan`, `village.density` or `village.pins` run and no context type or value to call them
with, and the absorb path "passes a context holding those" (doc, tables, product, rung, week; V6 l. 542, V7 l. 607–608)
to a parameter typed as the whole `EpochContext`.
*Required change (V07, with V06's and file f's text):* (1) BCR-V7-18's "Without V06" sentence, §3.12's *Which path runs*
and file f item 202's records hook (**BASE-F**) replace "by the hook V04's U5 uses (V6 §3.2's participants note)" with the
grow path's call points in base §4.11's order, at the places V6 §3.2's table gives the same steps (so V06's runner
reproduces them; T-V6-1): the `siting` override in place of step (f)'s placement and the `growth` override in place of
step (g)'s; `place` inside step (e) before each added record's *One path* placement and `remove` after each §7.7 item 2
removal; the participants registered at `afterField` after step (a) and before (b), at `decline` at the end of (c), at
`afterGrowth` after (g) and before (h) — each in (order, id) order, each run's ops one batch of the `epoch` event;
(2) **V06:** V6 §2.1 splits the context — `ProductEpochContext` (doc, epoch, seq, week, prevWeek, years, inputs, tables,
product, rung, productRows?, stream(stage, entity), scope()), which the grow path fills and which lands with file f item
202 beside `EpochPhase`, `EpochParticipant`, `EpochPlacement` and `ProductDeclEpoch`, and `EpochContext extends
ProductEpochContext` with params, exposure(), households, churn and report at E1; a product's phases and participants take
`ProductEpochContext` and read the extension only where it is present (on the grow path the siting override's tier (0)
reads an empty pool and step (m)'s roster joins take the base's churn cap, §4.11 *Churn*); `EpochPlacement.place` and
`.remove` take `Pick<ProductEpochContext, 'doc' | 'tables' | 'product' | 'rung' | 'week'>`, which the absorb path fills;
V6 §3.2's note adds "a product's participants run on M4's grow path at the call points file f item 202 adds (V07
BCR-V7-18); V04's own M4 hooks stand for V04's functions", and V6 §8's E1 row re-uses the interfaces item 202 landed;
(3) J-V7.132's "existing … participant loop" reads "the call points item 202 adds to the grow path's order", and T-V7-57's
and T-V7-13's village-history clauses name the grow path as a path they run on before M6-E (with TX-01's split).

**TX-03 — A removed market record keeps its market: `remove` leaves the principal rank, so no path reaches "a market that
closed".** major · lifecycle / owner rule (the dossier the sole truth, every gap derived; items 20, 22) · **V07** (round
5's TW-02 (2) named the fair field and the pins, not the rank).
V7 *A removed record* (l. 2573–2575): "A hall, a cloister or a market's rank takes nothing more: the building stands vacant
for item 17's re-use, and a closed market's square is kept (the base's *Markets over epochs*), its stalls going by
`village.pins`' step 2." But a village market is a rank, not a use: (d) (l. 2522–2530) sets the principal `market` rank by
`setAttr` for a record or the law's crossing, the market kinds (and `fish_market` after its hall) take "the rank by (d)"
(l. 2543–2544), and §3.6 (4) (l. 1831–1838) makes the market a dossier market record "else the market law". §7.7 item 2's
`closeUse` therefore closes nothing for a `weekly_market` record, and the base keeps a closed market's *square*, not its
market ("a market whose institution closes … keeps its square", l. 6742–6744). Step 2 (l. 2595–2598) brings "every
reservation carrying the principal market rank" to VS8's stall count and says "a market that closed loses its stalls";
T-V7-57 (l. 3358) checks "a closed market with 0 stalls"; `dist.market` measures to the reservation carrying the principal
rank (J-V7.111, W64). So a market record removed at a village epoch or an absorb below the law's crossing leaves the rank,
the stalls at count and `dist.market` pulling the prosperity field toward a market the dossier no longer holds and our law
would not derive, and T-V7-57's closed-market clause is reached by no path.
*Required change (V07):* `remove` of a market record (the market-family kinds of §3.6 (4) and a `mercantile-market`
custom record) clears the principal `market` rank by `setAttr` in that batch unless another market record stands or §3.6
(4)'s one draw passes `rules.market.law` at the population (the target at an epoch, the absorb's population on an absorb)
— the law's market, which never vanishes by the law ((d)) — the square kept as an open space (the base's *Markets over
epochs*); step 2's "a market that closed" reads "a reservation that lost the principal market rank since the last village
epoch"; `dist.market` falls back by W64 (J-V7.111); W70's `remove` cell, §2.6's records-placement row and J-V7.130 follow;
T-V7-13's removal clause adds a `weekly_market` record removed below the law's crossing (the rank cleared in that batch,
0 stalls at the next village epoch, `dist.market` to the first nucleus's open space) and one removed above it (the market
kept by the law, its stalls at count).

### 3.2 Minors

**TX-04 — `village.density` at base-product epochs is priced nowhere.** minor · budget · **V07**, with V06's row (TW-08's
residual).
Round 6 makes the run explicit: V6 §3.2's participants table (l. 1049–1055) and J-V6.124 — `village.density` "runs at a
base-product epoch after the hand-up, the case it exists for" — and V7 §2.1 (l. 572–574) runs it "while a superseded
VillagePlan exists, under any product", so at every TOWN, CITY and METROPOLIS epoch of a town that was once a village.
V7 §6 (l. 3277–3282) prices "an epoch at a village rung ≤ 60 ms" only; V6 §6.2's participants table (l. 3200–3210) lists no
village participant, and its totals (≤ 34 / 75 / 151 ms) and the century sums exclude it.
*Required change (V07, with V06's row):* V7 §6 prices `village.density` at a base-product epoch — VS2's density raster over
the old core's recorded inputs, bounded by V-M0's VS2 row, one figure since the old core does not grow — and the early
return of `village.plan` and `village.pins` outside their scope (≈ 0); V6 §6.2 adds a `village.density` row citing V7 §6,
the participants total and the century sums re-stated where it moves them (a bound re-declared by D-18 only if passed).

**TX-05 — V07 still says the runner adds the village participants at a village rung.** minor · wording (TW-08's V07 half)
· **V07**.
V7 §3.12 *Which path runs* (l. 2423–2426): "at a village rung the runner takes the village's `siting` and `growth` phases
in place of the engine's and adds the participant `village.plan` at `afterField`"; *Pins over epochs* (l. 2584–2585):
"registered by `@plat/village` at `afterGrowth`, order 60 …, at a village rung only"; §2.1's participants comment
(l. 571–576) the same. V6 §2.1 (l. 536), W3, the participants table's lead (l. 1049) and J-V6.124 run every registered
participant at every epoch, each gating itself; a builder of `@plat/village` reading V07 would leave the gate to the
runner, and T-V6-51's TOWN-epoch clause would fail.
*Required change (V07):* *Which path runs* reads "… in place of the engine's; the village's participants, registered with
the product and run at every epoch, act where their own scopes admit (V6 §2.1; J-V6.124) — `village.plan` at `afterField`,
order 10 …"; *Pins over epochs* reads "registered by `@plat/village` at `afterGrowth`, order 60 …, `stage: 'VS8'`, acting
at a village rung only (its own scope: at any other rung its run returns no ops)"; §2.1's comment adds "each run at every
epoch and gating itself by its scope (V6 §2.1)".

**TX-06 — The dossier step offers "every re-key" to the records placement, so a re-key that keeps the lesser's thing
would be declined into a placement.** minor · wording a builder would follow · **V06**, with V07's mirrors.
V6 §3.2 row 12 (l. 1040) offers "each record the step adds (or re-keys to a REPLACEMENT greater, V07 §3.12 item 4;
SR5-02)" to the product's `records` placement, "which places it or declines it to the base's placement"; V6 §2.1's
`records?` comment (l. 540), BCR-V6-1 (a)'s sentence (l. 3663–3665), V7 W70 (l. 482), V7 §2.1's `records` comment
(l. 580–581) and *The records placement* (l. 600–601) say the same. V08 §3.5.1 (c) reaches a re-key three ways: in its
first case (the greater's thing is the lesser's — `graveyard` over `burial_ground`, `wizard_s_tower` over `hedge_wizard`
…) the lesser's members are re-bound by `rebind` and nothing is placed, V6 §3.9.11 converting in place; in the second and
third the greater is placed by an `assign` (V08 §3.6 (5)). V7 item 4 places the third case only and says a first-case
re-key "places nothing" (l. 2558–2559), while `village.records` "declines nothing it names" (l. 2540) and a record it does
not name is declined to the base's placement. A builder who offers every re-keyed record, as row 12 reads, hands a
first-case re-key at a village rung — a hedge wizard promoted to a wizard's tower — to that placement, which would place a
second building beside the house the ladder step converts.
*Required change (V06, with V07's mirrors):* row 12, V6 §2.1's `records?` comment and BCR-V6-1 (a)'s sentence read "each
`assign` the step places — a record it adds, a member a count step adds, or the greater a REPLACEMENT re-key places new
(V08 §3.5.1 (c)'s second and third cases, (d)) — offered first …; a re-key whose greater keeps the lesser's thing (V08's
first case) is a `rebind`, never offered to the placement and never placed (V6 §3.9.11's in-place `convert`)"; V07's
W70, §2.1's `records` comment and *The records placement* follow in the same words. It lands with seam-settlements-r6
SR6-02's edit of the REPLACEMENT row, which states the same three cases.

### 3.3 Found in this sweep and raised by the sibling round-6 seams (cited, not re-raised)

Three contradictions this sweep found on the epoch path were written by the sibling seams while this lane ran
(seam-settlements-r6's §3 at 14:43, seam-surfaces-r6's at 14:47), with required changes that cover the epoch side too.
They are cited here so that one fix serves both, and are not counted in §4:
* **seam-settlements-r6 SR6-02 (V06).** V6 §3.9.11's REPLACEMENT row (l. 1927) decides "placed new" by template family.
  That test takes in `parish_church` → `cathedral_10_000_only`, `hedge_wizard` → `wizard_s_tower` and `wizard_s_tower` →
  `mages_guild`, all converted in place by V08 §3.5.1 (c)'s first case (the cathedral also by the row's own crypt
  clause). The row's "a watch over a militia keeps the militia's building" names a building that V11 §3.12's
  `town_watch` row (l. 2746) says the militia never has. T-V6-45's receipt clause (l. 3357) binds one key to two
  things, against J-V8.111 and J-V8.114. J-V6.125 and X47 follow. This sweep adds only W44 (l. 451), which reads right
  once the row cites V08's three cases, and TX-06 above.
* **seam-settlements-r6 SR6-01 and SR6-04 (V07).** V7 §3.12 item 4, §3.10, §3.11's palisade key, §2.4's three ladder
  rows, T-V7-13's two promotion clauses and J-V7.131 bind a promoted record's one key to the lesser's thing: the churchyard
  cross, the palisade's alias, the fishmonger's alias. V08 §3.5.1 (d) and J-V8.114 re-point that key to the greater
  placed new instead. V7 §1 (13) still carries V08's companion (landed 14:12) and V11's (landed 14:25) as pending, with a
  fallback that V08's landed text contradicts.
* **seam-surfaces-r6 SR6-07 (V06).** X48 and V6 §12's round-6 clause read V10's rule 17 as pending; it landed at 14:21
  (l. 1375–1376). X47's status is SR6-02 (d)'s.

## 4 Summary counts and CONFIRMED versus PLAUSIBLE

**Round 5 re-checked:** 9 issues — **9 FIXED, 0 PARTLY, 0 NOT FIXED, 0 REGRESSED.** Every contract rounds 0–5 settled
still holds on both sides: the fold's product and rung, the catacomb primary, cap, ratchet and keys, the underground's own
lottery, the hollow-way ladder with its placement trigger, the landfall's typed members and every covered gate kind, the
enceinte's `condition` and the no-stretch lift of a neglect, the one reader list of `EpochScope`, every island event priced
per event. The island resize's price now includes each re-claimed yard's top and the re-cut plots, and the century bounds
are re-declared at TOWN ≤ 25 s, CITY ≤ 115 s and METROPOLIS ≤ 215 s under D-18. Also still holding: the support step on
every raised-way path, the field's way-surface re-lay, and the village's records placed in the epoch or absorb they arrive
in, keyed by their dossier event, with a removal side. A record's joins count as its event's disruption, every participant
gates itself, and VS8's rows run at a village epoch with the orphans step and a well for every housed household.

**New from the sweep:** 6 issues — **0 blockers, 3 majors, 3 minors.** Two majors are residuals of round 5's own
required change for the build order: V-M3 is not free of M6-E (TX-01), and the grow path has no participant hook and no
context before E1 (TX-02). One is the removal side's missing market rank (TX-03). Three further contradictions on the
same sentences were written by the sibling seams while this lane ran (§3.3: SR6-01, SR6-02, SR6-04 of seam-settlements-r6,
SR6-07 of seam-surfaces-r6) and are not counted here.

| owner | major | minor | total | issues |
|---|---|---|---|---|
| V07 | 3 | 2 | 5 | TX-01; TX-02 (with V06 §2.1's context split and §3.2's note, file f item 202); TX-03; TX-04 (with V06 §6.2's row); TX-05 |
| V06 | 0 | 1 | 1 | TX-06 (with V07's W70 and §2.1 mirrors; lands with seam-settlements-r6 SR6-02) |

**What must move together.** TX-02 with file f item 202's records hook (BASE-F) and V06's §2.1 split and §3.2 note: one
wording of the call points and the context in all three. Either side may land first, each citing the other's sentence.
TX-06 with seam-settlements-r6 SR6-02 in V06's next lane (both state V08's three cases) and with V07's mirrors. TX-01
reads TX-02's call points for its grow-path parts but lands alone. TX-04 needs V07's price first; V06 §6.2's row then
follows by citation. TX-03 and TX-05 land alone.

**What the seam now holds** (round 0's census rows and every row rounds 1–6 repaired):
* **The fold and the products.** The fold's product and rung are read by every V06 step, by V05's islands and by V07's
  phases. V07's epoch rows take V06's `ProductEpochRows` shape, and its participants carry the stages `VS1`, `VS2` and
  `VS8`; each registered participant runs at every epoch and gates itself.
* **The records placement.** `village.records` (stage `S10b`) calls `place` before the base's *One path* placement and
  `remove` after §7.7 item 2's removal, on the epoch path and the absorb path alike. Its draws and addresses are keyed by
  the dossier event's `seq` with epoch component 0, and its ops are no undo target. A REPLACEMENT greater of a new thing
  is placed new at a village rung (item 4; its receipt binding is aligned by SR6-01 and SR6-02, and the set of re-keys it
  is offered by TX-06). A record's claim-sized joins are charged to its event's disruption, never a churn cap.
* **The market members.** The siting step (m), the hall's plot, building and use, the fair field's `retypeLand` and
  furlongs, and their removal hold; the market rank's removal is TX-03's.
* **The pins over epochs.** Orphans, a well for every housed household, stalls, a Roadside Shrine quarter's shrine, and
  the market cross beside a held centrepiece.
* **The registration's hooks.** They land with file f item 202; their call points and context are TX-02's, and the
  milestone split is TX-01's.
* **Unchanged since earlier rounds.** The hollow-way ladder, issued whole by V06 and reopened before any placement an
  epoch makes. The landfall's `formerClass`, typed members and reopened accesses. The enceinte's `condition` by run, with
  its writers, readers and undo. The catacomb's primary, cap, ratchet, count, deaths and keys. The underground's own
  lottery, `Foundations.apply` at every rung, the crowding hook's void part and F6's dwellings by relocation, and the
  buried floor's terraces. The retaining wall's condition by stretch, and decks as their host's existence.
* **The islands.** The island unit runs inside its calling commit, and every island event is priced per event, the
  yards' tops and re-cut plots included.
* **Buildings over time.** The crypt rank never shortens a basement, and the stair-entered reading is re-derived inside
  the causing event. The support step and the clearance run on every raised-way path, and way surfaces are re-laid with
  their frontage's band.

**CONFIRMED versus PLAUSIBLE.** Every status in §2 and every issue in §3 is **CONFIRMED** as a textual fact: each side's
sentence was read in its enclosing subsection in the files as they stood from 14:27 on 2026-09-29, and all were unchanged
at this lane's close (md5s in §1). Each is cited by section and line, and so are the base texts read: §4.11 *The epoch's
order*, the `EvolutionStrategy` interface, *Regrowth-first*, *Markets over epochs*, `Pin`, §6.1's post-build placement
key, §7.1's `setAttr` and §16's M4 row. Also read at their lines: file f's items 202, 209, 268, 317 and 322; V04's BCR-6;
V08 §3.5.1 (c) and (d) with J-V8.111 and J-V8.114; V11 §3.12's `town_watch` row; V10's rule 17; and the sibling seams'
SR6-01, SR6-02, SR6-04 and SR6-07. The **consequences** named are **PLAUSIBLE**: a V-M3 exit that cannot pass before
M6-E (TX-01); a participant with no call point or context on the grow path, and a placement typed against a context the
absorb path cannot build (TX-02); a removed market still ranked and stalled (TX-03); a participant's cost outside every
budget (TX-04); a village participant left ungated (TX-05); and a second building placed for a re-key that converts in
place (TX-06). They are reasoned from the texts; no implementation or fixture was executed, since none exists at this
stage. The re-summed century (§1's scope paragraph) is this round's arithmetic from the rows as they stand, not a
measurement. Each required change is the seam's recommendation, vetoable by the owning volume's next revision or by the
whole-design retrovalidation (J84).
