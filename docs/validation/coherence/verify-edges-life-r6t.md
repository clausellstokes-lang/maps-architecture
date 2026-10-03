# Coherence verify — edges and combinations across time, the host, the tools and the tables (round 6)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/verify-edges-life-r6t; covered by the
> whole-design retrovalidation (J84).

Lane: `coherence/verify-edges-life-r6t` (opus seat). Members: determinism, scope, V06, V08, V09, V10, V11, V12.

> PROGRESS
> - [x] inputs read: the brief whole (with its ROUND-6 NOTES and ORCHESTRATION NOTES); round 5's report and result
>   (`verify-edges-life-r5t.md`, `results/coherence_verify-edges-life-r5t.json`); `adjudication-r6.md` (R6-01, R6-02
>   whole with its tables and Ends, R6-03 whole, Part H for my members, Part P); `assemble-r6.md`
> - [x] live text = assemble-r6's after hashes (base `f39f1c30…`, V06 `9653164e…`, V08 `83382cac…`, V09 `046b6610…`,
>   V10 `1014b64c…`, V11 `0e2767c1…`, V12 `006b8ef1…`)
> - [x] round-5 findings re-checked (VEL5-r5-01 – 04) with their END lines: all four FIXED
> - [x] round-6 blocks in scope re-checked: word diffs of `b3f83a0` → `db26bb9` for V06, V08–V12 and the base's §5–§7,
>   §13–§16 and the index, each changed subsection read whole where it states a mechanism at a limit; R6-02's two tables,
>   R6-03's life, and the rules they rest on (V04 §3.5.4 (d), UC18; V08 §3.16 (7); V06 §3.7.4–§3.7.6, §3.11.1, §3.15.2;
>   §6.1 *The weather stream*; §10.2 (d)–(h)) read whole
> - [x] peers' r6t working files read (none had landed): verify-agree-layers (VAL-R6-01 the locked arch vault, VAL-R6-03
>   GeoJSON's span use), verify-determinism (VDC6-01, VDC6-02), verify-agree-tools (VAT-r6-05); overlaps not re-raised
> - [x] report and result written (`results/coherence_verify-edges-life-r6t.json`)

## 1. Round-5 findings re-checked against the live text

| id | disposition (adjudication-r6 Part H) | verdict | where, in the live text |
|---|---|---|---|
| VEL5-r5-01 (pipeline) | FIX per R6-03 | **FIXED** | §4.11 *The clock* (1) (base l. 8510): "The document's current week is derived — the greatest week the folded events carry, so an event folded after one of a later week (a late change at `W₀` + 1 or `W₀`, (4); a dossier change dated before an event an earlier absorb folded) never moves it back — never a stored counter (§2.9)" — the text as written. **ENDs:** (model) §2.9's `EpochRecord` comment (l. 3239) "the greatest week the folded events carry (§4.11's clock)"; (scope) J-A67.45's index row (l. 22853) "(the greatest folded week, §4.11 *The clock* (1))", and the rationale's Part A row (l. 631) the same; (scope) T76-1 (l. 18301–18303) "the document's current week never before it nor before the week of any event an earlier absorb folded"; (V08) T-V8-49 (g) (V08 l. 3316) carries the `W₀` + 3 Works clause word for word. All closed. |
| VEL5-r5-02 (V08) | FIX per R6-03, amended (PRB6-15, PRB6-18, PRB6-19) | **FIXED** (by the ruling's form) | `DossierBinding.lateCalamities` is gone from the set (grep: 0 hits in the base and the twelve volumes). The no-epoch path is now ruled by R6-03 step 3 and tested: T-V8-49 (g) (V08 l. 3316) "and on a copy, that next absorb carrying no year end, no crossing and no other calamity — an epoch folded at its week for the calamity, the same strike", the `unchanged` variant, the standing `lateDeferred` note's write-once-and-clear, and the turned-back clock (PRB6-19). V08 §3.6 (3) (l. 1872–1877), §3.6 (4) (l. 1904–1928: the event's members `{ changes, quarantined, notes, notesCleared }`, the deferral as an `unchanged` digest) and §3.2 (l. 1530–1531) carry R6-03's texts. |
| VEL5-r5-03 (V08) | FIX per R6-03, amended (PRB6-18) | **FIXED** | V08 §3.8's line-change bullet (l. 2046–2050): "and each `quarantined` entry's `key` by the same entry in that absorb, before the diff, the absorb's `dossierFacts` event carrying the list under the new keys (V08 §3.6 (4)); a key the entry does not map keeps its key". V08 §2.7's `DossierBinding.quarantined` row (l. 1291) migrate cell: "; a line migration re-keys it by the `fromLines` entry (V08 §3.8)". T-V8-11 (l. 3278) runs the re-keyed quarantined record and the uncarried calamity carried after the migration under the new key, struck once. The binding's third list, `notes`, needs no re-key: a standing note is cleared by "the identities of the binding's standing notes this run no longer writes" (V08 §3.6 (4), l. 1913–1915), so a `lateDeferred` note written under line A's key is cleared by the first run that does not write it, whatever its key. |
| VEL5-r5-04 (determinism) | FIX per R6-02 | **FIXED** | (1) §7.1's lock row (base l. 10631): "— a drawn way across a locked entity (never a ground way, a carve or a wall stretch passing beneath a locked or pinned raised way's deck, which changes none of its parts: §2.7's crossing and way-and-channel tables, bent by the rows below as beneath an unlocked one)" — (D5) word for word. (2) `bend.wall.raisedCrossing`'s row (l. 10674) "locked, pinned or neither (§2.7's crossing table, *beneath*, row W13)" and `bend.raised.underSpan`'s row (l. 10675) "a standing raised way's — locked, pinned or neither — supports" — (D7), (D8). (3) T110-2 (4) (l. 18564–18567: "each run again with the raised way locked and with it pinned: no `refuse.locked`") and (5) (l. 18593–18598: "each hand case run again with the raised way locked and with it pinned … no `refuse.locked`"). The way-and-channel table's lead (l. 2578–2580) adds "A lock or pin on the raised way never refuses any row". |

All four round-5 issues are closed.

## 2. Round-6 blocks in scope — re-checked for new problems

Method: word diffs of `b3f83a0` → `db26bb9` (assemble-r6) for V06, V08, V09, V10, V11, V12 and the base's §5–§7, §13–§16
and the index. Each changed subsection was read whole where it states a mechanism at a limit. Where a change rests on a rule
outside my members, that rule was read whole too: §2.7's crossing table and way-and-channel table (l. 2572–2711), §4.11
*The clock* (1)–(4), §6.1 *The weather stream*, §10.2 (d)–(h), V04 §3.5.4 (d) and §3.11's UC18, V08 §3.16 (7), and
V06 §3.7.4–§3.7.6, §3.11.1 and §3.15.2.

**R6-02 at my members (round-6 note (6) (b)).**
* (ii) No leftovers. A grep of the base, V06, V08–V12 and INDEX for crossing station, raised gate, wall opening, held
  stretch, `bend.wall.held`, `lateCalamities`, "support step (6) (d)", "(6) (a)", "(6) (b)" and "an arch in the
  curtain" finds only T-V6-47's bar "0 crossing stations" (R6-02's own (V6-21) words, a bar that asserts none). Every
  restatement in §5.3, §5.4, §7.1, §7.3, V06 W64/W65/W68/W79, §3.6 (4), §3.7.1, §3.7.2, §3.7.4, §3.7.6 (5), §3.11.4,
  §3.19, §3.19.2, V09 §4.9 and §4.20.2 (4), and V11 §3.24.2 and row 80 is reduced to a citation.
* (iii) Every citation of the two tables in my members names an outcome (*over the band*, *down before the wall*,
  *beneath*, *unchanged meeting*), a row (W1–W13, (a)–(e)) or a cell (W1·C12, C12) that exists. assemble-r6's
  `tablerefs.py` agrees.
* (i) The cells my members' tests run. W1 and W2 are covered by T110-2 (1)–(5), (7) and (8), with T-V6-47, T-V6-73 and
  T-V9-52. W4, W5 and W8 are covered by T114-3, T-V6-73 and T-V6-11, and W13 by T110-2 (4). **W3's cells C3–C6 (and
  C10–C13) name T110-2 (6), which regenerates only standing held raised ways.** So S3's and S5a's pull, S4's crossing
  rule and S10's band reading a support's `state` at a regeneration are reached by no bar. See **VEL6-r6-02**.
* §7.1's lock row and the bend rows (VEL5-r5-04) are written as ruled (§1). Every hand case of T110-2 (4) and (5) runs
  again locked and pinned.
* VDC6-01 (verify-determinism) raises the reverse case: an aqueduct drawn across a locked wall. Not raised again here.
* **Lifecycle.**
  - A hand `drawWall` removes an arch vault in its commit, and its undo restores the vault with the same id (W2's last
    column; V04's key law (`arch`, the way's lineage, `a`, `b`)).
  - `wallToWay`, `absorbWall` and a `delete` lay the vault again by the same key, and their undo removes it again
    (W7, W8, W11).
  - An epoch's reconcile runs over `EpochScope.raised` (V6-3). Its port epochs are no undo target.
  - The "read `open`" state is derived and never stored, so save, load and migration need nothing.
  - A user's held `vault` on a span a wall later comes over keeps its record and is read `open` (M11). It reads `vault`
    again once the wall goes, so no hold is lost.
* **A locked arch vault under a wall.** At an epoch, a regeneration or a dossier-admitted circuit, V04's UC18 (keep it)
  and *beneath* (no arch vault under a wall) give two outcomes. It is the open hand-off of repair-r6-V04. **VAL-R6-01**
  (verify-agree-layers) and **VEW-r6-02** (verify-edges-world) raise it with exact changes, so it is not raised again
  here. V06's two summaries fall under
  that issue's ends: W65 and §3.2's "the reconcile is the epoch-side guarantee that no chamber stands … under a wall".
* **The span's `use` under a wall.**
  - VAL-R6-03 raises §11.1's GeoJSON row.
  - The clerk's read row (V10 l. 1686) is the other reader R6-02's sweep missed. It reads each span's use "from the base's
    span record". See **VEL6-r6-01**.
  - V09 §4.20.6 (2) is consistent: its panel, badge and why card read the span `open`, and "Walled up as a vault" is
    disabled.
* **A hand wall stretch that meets an aqueduct's support without crossing its deck line** (one drawn along beneath it,
  or ended at a pier). *beneath* gives no outcome for it. See **VEL6-r6-04**.
* Defined at their limits:
  - W13's `placeGate`, with no `refuse.locked` on a locked raised way;
  - the `W_RAISED_CROSSING` count per crossing of a deck line (its stage bookkeeping is VDC6-02's);
  - the frame growth's C12 and the raised way's own edits C13;
  - `item110.*`'s pin on H-AQUA without its two raised-way edits (V06 §8 E1 line and V12 §2.13 agree);
  - V11's `stripMarginM`, `clearWidthM`, `squareDeg` and `maxClearSpanM`. A `maxClearSpanM` edited below the band's span
    drops or waits the aqueduct by the support step's bound, and a hand one is bent, else not built and reported.

**R6-03 — the late calamity (round-6 note (6) (c)).** No held-calamity clause stands anywhere: `lateCalamities` has 0
hits in the base and the twelve volumes. The rest of the life is defined:
* **The sequence.**
  - A deferral that finds nothing else changed answers `unchanged`, with its note in the host's report. The host stores
    the new `lastOffer` (V08 §3.2), so that dossier is not offered again. The next dossier version, which carries a later
    present week, carries the calamity.
  - With other changes, the `lateDeferred` note is `standing`. It is written once and cleared by the first run that no
    longer writes it (V08 §3.6 (4)'s `notesCleared`), whatever key a line migration gave it.
  - A turned-back clock and an absorb with no epoch past `W₀` are run by T-V8-49 (g).
  - A copy forked meanwhile never receives the calamity (V06 §4.4).
  - Two late calamities sharing a target strike in their events order, and the shared target is counted by both
    (V06 §3.11.1; T-V6-27).
* **No later-week events before it.** The first absorb past `W₀` carries the deferred calamity. No absorb past `W₀`
  folded events before it, so the deferral puts no strike at `W₀` + 1 behind events of later weeks.
* **The current week** is the greatest folded week. Hand edits carry no week (§7.1's `EditBase`), so the rule reads
  only epochs, dossier events and `generate`. An undo of a standalone `grow` epoch un-folds it, so the week rightly falls
  back.
* **Gap: which conditions wait.** Step 2 makes "a condition naming it" wait with the calamity. A SettlementForge
  condition names no calamity: `activeConditions[]` carries `id`, `archetype`, `label`, `severity`, `severityBand`,
  `status`, `triggeredAt.tick`, `triggeredAt.sourceEventType` and `duration` (V08 l. 665). Its only link is V08 §3.16 (7)
  (d)'s week rule. So which conditions wait is undefined, and a carried one links to an earlier calamity. See
  **VEL6-r6-03**.

**The other rulings at my members.**
* R6-04: T120-6, `time.findGlow`, T-V12-52 and V12 §3.15.10 agree on the drawn-week timing, the frame never waiting
  (§12.5).
* R6-05 and R6-06:
  - V09 §2.7's re-ask of a view-bound answer and T-V9-65 are defined.
  - V10's `look` read with `field` covers its edges: a field naming none, gone or sown; both a building and a field; an
    unreturned address. These are row 34, T-V10-50 (33) and T-V10-52.
  - At the village rungs, V07 §4.5's provider tells the famine row. "The read adding none" concerns the telling.
* R6-07: the "under no disaster look" condition is written at every V11 and V12 restatement. A disaster look standing
  with `crises` off only narrows `item123.damage`'s scope, and T-V9-85's on-and-off clause bars a look drawn with the
  switch off.
* R6-08: §7.7 l. 12111 and §14's `field_fallback` comment agree with V08 §3.5.
* R6-10: V09's 10 s rule (row 89, §4.21.11, T-V9-84) agrees with §8.8 l. 14428–14433. The Dress panel's Trees and Pins
  switches stop at V10's `dress` tool; that is VAT-r6-05's (verify-agree-tools).
* R6-11:
  - `DossierFixtureRow`'s `derived` kind;
  - T-V8-61 (a)'s reopen on the lit `city-1` pair;
  - T-V12-57's kept weather gap, which agrees with §6.1 l. 9615–9630 ("the drawn E kept");
  - V06's E1 pin line.
* R6-09: E3's T-V6-11 sky clause is placed at the later of E3 and V05's P6.

**Checked and not raised.**
* V06 §3.15.2's frames show a between-epoch event from the previous epoch's week, not from its own. The text states this
  explicitly ("Events between two epochs are in the prefix at their log positions"), it predates round 6, and no
  round-6 block changed it.
* A standing note an `unchanged` run cannot clear (no event is written) is V08 §3.6 (4)'s general rule for every
  standing note, and also predates round 6.

Totals: round 5's 4 issues are closed. **4 new issues: 0 blocker, 4 major, 0 minor.**

## 3. Issues

### VEL6-r6-01 — MAJOR, EDGE-UNDEFINED, owner V10

**The clerk tells a `vault` span under a wall as a vault; every other reader tells it open.**

R6-02's *beneath* (base l. 2640–2646) rules that a `vault` span whose under-deck strip meets a wall's band or wall strip
"is read `open` by every reader of its `use` while that band or strip lies there … its record unchanged (the span rule
never reads a wall)". The record keeps `use: 'vault'`. V09 §4.20.6 (2) (l. 3196–3199) applies this to the span's panel,
its raised way's panel, the badge's vaults and the why card: the span reads open, and "Walled up as a vault" is disabled
with "A wall runs under this arch".

V10's read row for a raised way (l. 1686) gives "each span's use with its reason (`open` by way, water, flood, tall,
low, slope or land; `vault`; `user`) **from the base's span record**". A V10 builder serialises the record. Asked about
the c14 fixture's viaduct (T110-2 (3): stage 2's ring crossing an S4 viaduct), the clerk says the arch under the ring is
a vault, while the card on the same span says it is open and that a wall runs under it. The clerk then also names a
vault for which V04 lays no chamber, since no arch vault stands under a wall. Two units give two outcomes for one case.

R6-02's sweep (b) searched V10 only for crossing-rule words. VAL-R6-03 (verify-agree-layers) raises the same reader gap
at §11.1's GeoJSON row. This is its V10 sibling: a different unit, so a separate fix.

**Required change.**
1. V10 l. 1686, the raised-way row's last cell: "each span's use with its reason (`open` by way, water, flood, tall,
   low, slope or land; `vault`; `user`) from the base's span record" → "each span's use with its reason (`open` by way,
   water, flood, tall, low, slope or land; `vault`; `user`) from the base's span record — but a span whose under-deck
   strip a wall's band or wall strip meets is told `open` while that band or strip lies there, with "a wall runs under
   this arch", whatever its recorded `use`, and no arch vault named in it (§2.7's crossing table, *beneath*; V09
   §4.20.6 (2))".
2. T-V10-41 adds: "on T110-2 (3)'s c14 fixture with a `vault` span of its S4 viaduct under stage 2's ring, the clerk's
   read of the viaduct tells that span `open` with "a wall runs under this arch", as its V09 panel and why card do, and
   after a hand `delete` of that run tells it `vault` with its arch vault".

### VEL6-r6-02 — MAJOR, EDGE-UNTESTED, owner scope

**A regeneration under a held raised way whose parts have gone: the crossing table's cells name a test that never runs
them.**

The crossing table's row W3, "a regeneration re-deriving a ring under a held raised way" (base l. 2700), names
**T110-2 (6)** as the test for each of these cells:
* C3: one span fallen;
* C4: all spans fallen;
* C5: a support cleared or toppled;
* C6: a `vault` span breached;
* C10 – C13: repaired, created across a gap, extended, edited.

T110-2 (6) (l. 18598–18607) regenerates only **standing** held raised ways:
* (1)'s c15 fixture with its aqueduct locked;
* the oblique-route variant;
* the New random run whose new boundary meets "one of the aqueduct's supports";
* (3)'s `moat: 'all'` fixture with its viaduct locked.

At generation every raised way is new, so every support stands and every span stands. A regeneration is the only time
S3's and S5a's pull, S4's crossing rule, S10's band and V04's T2 vaults step meet fallen parts. They must then read:
* a `ruined` support's stump as impassable and a `cleared` one's ring as open ground (*beneath*, *Where the line crosses*;
  C5);
* the clear width between **standing** rings only (the way-and-channel table's lead);
* the run at its own top beneath a fallen span (*The cap*);
* no chamber in a breached span (C6).

The other bars reach other mechanisms, not these:
* T110-2 (7) runs V06's epoch circuit and contraction (the cost field of V06 §3.7.4 (2)).
* T110-2 (4) runs the hand operator's local bend.
* T-V6-47 runs the epoch's re-solve.

So a generation-path builder who reads every recorded support as standing, as at generation, passes every bar. At the
user's Regenerate (keep), or New random, of a town whose held aqueduct has lapsed, that build then routes the ring round
a cleared support, or caps a run at a soffit that has fallen. This is principle (11)'s "regenerate … at each" state, on
the common path of a held raised way that has decayed.

**Required change.** §13.2's T110-2 (6), after "0 S5b or S5c way corridors over a support ring, ramp, stair or foot"
(the clause's end, before "(7) parts going"), add:

"; and (1)'s c15 fixture with its aqueduct locked after scripted `DeclineOp`s — a span over the band `ruined`, a support
by the band `cleared` and a `vault` span over the trace breached — regenerated (keep), then given New random with its seed
searched so that the new ring's boundary meets the `cleared` support's former ring and, on a second run, a `ruined`
support's stump: the trace through the cleared ring as open ground and crossing the deck line clear of the stump as of a
standing support, the band whole across each former footprint, the run at its own top beneath each fallen span, no arch
vault in the breached span, each S4 route the regeneration re-solves crossing the deck under a span §4.3 admits with its
clear width read between standing rings, every station, key, span and state of the aqueduct unchanged (§2.7's crossing
table, W3·C3–C6)".

### VEL6-r6-03 — MAJOR, EDGE-UNDEFINED, owner V08

**"A condition naming it": a SettlementForge condition names no calamity, so which conditions wait with a deferred late
calamity is undefined. A carried one links to an earlier calamity.**

R6-03's step 2 has an absorb whose week is not after `W₀` carry "neither the calamity, nor the records of its F5 targets
…, nor a condition naming it". The same words stand at:
* §4.11 *The clock* (4) (base l. 8531);
* V08 §3.6 (3) (l. 1874), §3.2 (l. 1530) and §3.6 (4) (l. 1927–1928);
* the §3.17 row (l. 2702);
* T-V8-49 (g).

Nothing defines "naming".
* The dossier's `activeConditions[]` carries `id`, `archetype`, `label`, `severity`, `severityBand`, `status`,
  `triggeredAt.tick`, `triggeredAt.sourceEventType` and `duration` (V08 l. 665). None of these refers to a calamity.
* The only link is V08 §3.16 (7) (d) (l. 2583–2588), and it is a rule on weeks over **carried** calamities: "the key of
  the carried calamity whose week equals its `triggeredAt.tick`, else of the latest carried calamity in the 52 weeks up
  to its `sinceWeek`".

Builders differ:
* One defers a condition only when its `triggeredAt.tick` equals the calamity's week.
* Another applies (d)'s whole rule with the deferred calamity counted as carried.
* A third matches labels.

Take SettlementForge's `reconstruction` condition raised a week after the calamity, in a town that carried an earlier
calamity within 52 weeks. The first builder carries the condition now. By (d) it then links to the **earlier**
calamity, so its disaster look stands on the earlier calamity's districts (V08 §3.16 (7) (b); §10.2 (d)) until the next
absorb past `W₀` re-links it. That is a silent wrong look on the map, and every bar passes: T-V8-49 (g)'s condition
"naming it" can be built to whichever rule the test's author reads.

**Required change.**
1. V08 §3.16 (7) (d), after "with none it carries no calamity.", add: "A condition **names** a calamity when this link
   would give it that calamity were it carried: its `triggeredAt.tick` at the calamity's week, else the calamity the
   latest in the 52 weeks up to the condition's `sinceWeek`. So a late calamity an absorb leaves uncarried (§4.11 *The
   clock* (4); V08 §3.6 (3)) holds back each condition that names it, and none of them is carried meanwhile or linked to
   an earlier calamity."
2. V08 §3.6 (3): "nor a condition naming it" → "nor a condition naming it (V08 §3.16 (7) (d))".
3. END (pipeline), §4.11 *The clock* (4): "nor a condition naming it" → "nor a condition naming it (V08 §3.16 (7) (d))".
4. T-V8-49 (g) adds: "and on a copy whose binding carries an earlier calamity in the 52 weeks before the second absorb,
   and whose `reconstruction` condition's `triggeredAt.tick` falls the week after the late calamity's — that condition not
   carried by the second absorb (no disaster look on the earlier calamity's districts), and carried by the absorb past
   `W₀` with the calamity, its look on the late calamity's targets".

### VEL6-r6-04 — MAJOR, CATALOGUE-GAP, owner model

**A wall stretch of the bent group that meets an aqueduct's support without crossing its deck line has no outcome.**

*beneath*'s *Where the line crosses* (base l. 2617–2635) sets three rules:
* "a trace's line never crosses … an aqueduct's standing support";
* a stretch laid by no pull or cost field — a hand `drawWall`, a moved trace vertex, a re-anchored stretch, VS3's
  palisade, V06 §3.7.6 (3)'s quay wall, `repairWall`'s new stretch — "is **bent locally**, between its nearest points
  clear of the raised way's under-deck strip, ramps, stairs and feet on either side: to cross an aqueduct under the
  nearest span";
* "No gate and no tower in the under-deck strip".

The bend is written only for a stretch that **crosses** the deck line. It gives no outcome for one that meets a support
without crossing:
* a hand wall drawn along beneath an aqueduct, between or through its piers — the old way of carrying a wall on an
  aqueduct's line, which R6-02 rules no longer bears on it;
* a stretch that enters the under-deck strip and leaves it on the same side;
* a stretch drawn, or a trace vertex moved, so that it ends at a pier.

For these there are no "nearest points clear … on either side" to bend between, and no crossing to move under a span.
The case is not in the canon's catalogue. The probe and adjudication-r6 never consider it (no "along", "lengthwise" or
"ends inside" case in either).
VEW-r6-03 (verify-edges-world) rules a barrier anchor or weld vertex inside a strip. That is a different case: no
anchor rule reaches a hand stretch run along beneath an aqueduct, or ended at one of its piers.

Builders differ:
* One moves the stretch out to the strip's edge.
* One makes it cross the deck line under a span, so it now crosses twice.
* One refuses the drawing.
* One lets it run through the piers, against "never crosses … an aqueduct's standing support" and T-V6-47's bar "0 trace
  lines across … an aqueduct's standing support".

The pulled and cost-field traces are defined: they treat the supports as impassable. So is a road deck: its supports are
built into the line.

**Required change.**
1. §2.7's crossing table, *beneath*, *Where the line crosses*: after "…through a gate there (by hand a fate named in
   `bend.wall.raisedCrossing`'s line)." add: "A stretch of that group whose line meets an aqueduct's standing support
   without crossing its deck line there — one drawn along beneath it, one entering and leaving its under-deck strip on
   one side, one ending at a support — is bent the same way. Its part inside the strip is moved to the strip's edge on
   the side it entered from, between its nearest points clear of the strip, and an end inside the strip is moved to that
   edge (by hand a fate in `bend.wall.raisedCrossing`'s line). So no such stretch runs along within, or ends inside, an
   aqueduct's under-deck strip."
2. END (determinism), §7.1's `bend.wall.raisedCrossing` row, outcome: after "under an aqueduct's nearest span," add "a
   stretch along beneath an aqueduct or ending at one of its supports moved to the under-deck strip's edge,".
3. END (scope), T110-2 (4): after "each a fate in `bend.wall.raisedCrossing`'s line;" add "a hand `drawWall` drawn along
   beneath a standing aqueduct through two of its supports, and one ending at a support — each moved to the under-deck
   strip's edge, a fate in `bend.wall.raisedCrossing`'s line, every station, key and span unchanged;".

(The adjudicator may instead refuse such a drawing with its nearest lawful alternative under §7.1's catch-all. The bar
in (3) then asserts that refusal.)
