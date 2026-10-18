# Verify round 6 — volumes V03 (Interiors) and V04 (the underground) — lane coherence/verify-vol-V03-V04-r6t

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/verify-vol-V03-V04-r6t; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V03-V04-r6t`, 2026-10-01)
- P0 brief read whole (ROUND-6 NOTES, NEW OWNER RULES, ORCHESTRATION NOTES); round-5 result (4 minor) read: done
- P1 adjudication-r6 (head, summary, Part A, R6-01, R6-02 whole with its tables, attack list, equivalence and V04 Ends, R6-07, R6-09, R6-10, R6-11, Part P, Part H · V03/V04), repair-r6-V03/-V04 reports, assemble-r6 (§1, §2.1, §5, §9); live V03 894955c2…, V04 fefd0cd4…, base f39f1c30… equal assemble-r6's "after"; pre-round text from commit 52a16b0 (V03 3fe82c82…, V04 b79fd290…, base 2d84eac2…); diffs: V03 4 hunks, V04 21 hunks: done
- P2 round-5 findings VV34-r5-01..04 and round-6 fixes in scope re-checked: done — all four FIXED as ruled; VAF-R5T-04, VAF-R5T-05, VAL-R5-04 and the END lines (VRC5T-03 at V03 and V04, VAT-r5-04, VAL-R5-02's (V4-1)–(V4-8)) applied
- P3 every round-6 hunk of V03 (4) and V04 (21) read in its subsection, with the base homes it cites (§2.7's crossing table, *beneath*, W1·C6, W2·C2, W7, W8, W11; the support step (7); the span rule; §6.3 *Plan damage*; §8.2's `StyleSheet.groups`; §8.6) and the V06 texts it reads (§2.1, §2.8, §3.7.2 (3), §3.7.6, §3.22 (3), §8's E2 and E8 rows): done
- P4 the other round-6 verifiers' landed issues on V03 and V04 checked (concurred, not re-raised); references, ids, terms, phone, deferral, review ids; §8 against §16 and INDEX; words; doc_checks (provisional): done
- P5 issues, result saved, LANDED: done

Scope: V03 (`docs/volumes/V03-interiors.md`, 3 304 lines) and V04 (`docs/volumes/V04-underground.md`, 3 636 lines) after
repair round 6 as assemble-r6 installed them (V03 3fe82c82… → 894955c2…, V04 b79fd290… → fefd0cd4…; base 2d84eac2… →
f39f1c30…; the live hashes equal assemble-r6's "after"). Binding: adjudication-r6 (R6-01 – R6-11, Part H, Part P's
amendments) and the earlier adjudication files where not superseded by name (R5-02 superseded but what R6-02 restates;
R5-03's hold superseded by R6-03). Grades by J141's severity standard.

## 1 Round-5 findings re-checked

| id | owner | verdict | where (live) |
|---|---|---|---|
| VV34-r5-01 (minor) | V03 | **FIXED** per R6-09, verbatim | V03 §8's P4 tests cell (l. 2943): "T-V3-39 but (e) and (h)'s exports, its scrub across the run at the later of P4 and V06's E6;"; P5's (l. 2944): "T-V3-39 (e) and (h)'s exports,". Agrees with T-V3-39's timing cell (l. 2906: "from P4, (e) and (h)'s exports from P5"). |
| VV34-r5-02 (minor) | V04 | **FIXED** as written, with VAT5-r5-02's carried state (Part H) | T-V4-63 (l. 3156): "the frame growth's case keeping every old station and, with the same id and footprint, the arch vault of every old `vault` span between two of them (§2.7's support step (7)), the span from the old deck's last interior station (with none, its one span) re-derived with the extension — each new span taking that end span's `state` and, where its `use` was held, that `use` (§2.7's support step (7)), a vault laid in a `ruined` or `cleared` one `collapsed` (V04 §3.5.4 (d) (2)) — and its vault laid or deleted by its new span (V04 §3.10)". Agrees with base (7) (l. 2712–2724). Root-cause site §3.10 conformed (l. 2290–2291). The wall qualifier the same bar now needs is a new problem (VV34-r6-01). |
| VV34-r5-03 (minor) | V04 | **FIXED** per R6-07, verbatim | T-V4-82 (b) (l. 3175): "…, compared from its entry week into the plan (§6.3 *Plan damage*'s one comparison; V03 §5.6 (2) (a)–(b))". |
| VV34-r5-04 (minor) | V03 | **FIXED** per R6-07, verbatim, with the END of VRC5T-03 at (g) | T-V3-39 (f) (l. 2906): "(f) on a building no disaster look stands over (the look's lines are T-V3-40 (e)'s), the panel's damage lines and the `plan` section's rows read the same `PlanDamage` …"; (g): "a never-decayed building under no disaster look draws, exports and answers byte-identically". |

## 2 Round-6 fixes in scope and their second ends

**V03** (4 issues, 1 END line; repair-r6-V03, 4 blocks, 7 edits; the diff against 52a16b0 shows exactly those hunks):
* **VAF-R5T-04** (FIX, R6-07) — §3.13's damage-layer row (l. 2094): "every element damaged at 1, each from its entry week
  into the plan (V03 §5.6 (2) (a))". Agrees with V03 §5.6 (2) (a) (l. 2692–2694) and base §6.3 *Plan damage*. The sweep's
  level-0 outcome in the same row ("so under no disaster look (§6.3 *Plan damage*) the plan draws and exports
  byte-identically") agrees with §6.3 (l. 10054). **Applied.**
* **VAF-R5T-05** (FIX, R6-07) — §5.2 (l. 2488): "so a building never decayed and under no disaster look (§6.3 *Plan
  damage*) exports byte-identically". **Applied.** §5.3's JSON block stands as R6-07 rules.
* **VV34-r5-01**, **VV34-r5-04**, **END of VRC5T-03** — section 1. **Applied.**

**V04** (3 issues, 3 END lines; repair-r6-V04, 17 blocks, 29 edits; the diff shows 21 hunks, every one an edit the
report names):
* **VAL-R5-04** (FIX, R6-07) — §5.6's lead (l. 2897–2899) and UE33's E1 (l. 2435), verbatim; E1 is also VRC5T-03's V04 end.
  **Applied** (E1's second subject: VV34-r6-02).
* **VV34-r5-02**, **VV34-r5-03** — section 1. **Applied.**
* **END of VAL-R5-02** (R6-02's (V4-1)–(V4-8), (V4-1) as PRB6-01 amends it): (V4-1) §3.5.4 (d) (1) **Lay** (l. 1695–1698)
  verbatim; (V4-2) (3) **Remove** (l. 1713–1714) verbatim; (V4-3) §1b.2's trigger cell (l. 328) — the given words plus
  "V06 §3.7.6 (3)'s quay wall or (4)'s dossier-admitted circuit" (the crossing table's W1 lists both; V06 §3.7.6 (3) is
  the waterfront, (4) the dossier gate — resolves); (V4-4) §2.6's arch-vault row (l. 867) — the writer cell cites §1b.2's
  list (R6-01 (3)) and adds the epoch clause, the **removed** clause verbatim; (V4-5) §4.3's crossing-station clause
  deleted (l. 2584); (V4-6) §3.10 (l. 2285–2294) verbatim, its lead naming the widened `EpochScope.raised`; (V4-7)
  T-V4-62 (l. 3155) verbatim; (V4-8) T-V4-63 (l. 3156) verbatim. **Applied** (l. 328's "an absorbed record dropped": see
  VV34-r6-03).
* **END of VRC5T-03** — §5.6 (6) (l. 2972): "A building never decayed and under no disaster look draws byte-identically".
  **Applied.**
* **END of VAT-r5-04** — §5.2 (7) (l. 2789) and J-V4.96 (l. 3395): "the `pins` switch (`StyleSheet.groups.pins`, §8.2)".
  Base §8.2 defines `groups?: { trees: boolean; pins: boolean }` (l. 12601). **Applied.**

## 3 Round-6 blocks read — new problems

Every changed passage was read in its subsection. V03's hunks are §3.13's damage row, §5.2's SVG paragraph, T-V3-39 and
§8's P4 and P5 cells. V04's are ## 0's arches (l. 48), §1.2's item-110 hook row (l. 161), §1b.2's reconcile row
(l. 328), §1b.3's span-`use` row (l. 370), §2.6's arch-vault row (l. 867), §3.5.0 *At an epoch* (l. 1341–1342), §3.5.4 (d)
(1) and (3), §3.10's epoch reconcile, UE33, §4.1's raised-way row, §4.2's span row, §4.3 (the station clause gone, a new
wall-commit row at l. 2585), §4.4's wall-commit undo, §4.6's migration, §5.2 (7), §5.6's lead and (6), T-V4-62, T-V4-63,
T-V4-82 and J-V4.96.

**The R6-02 family in scope (round-6 note (6) (b)).**
* (i) The cells V04 reads give one outcome each and name a test that runs it: W1·C6 ("*beneath*, no chamber, read as C3 ·
  T110-2 (7), T-V4-63") — T-V4-63's new breach-first run holds it; W2·C2's vault removal ("· T110-2 (4), T-V9-52,
  T-V4-63") — T-V4-63's hand `drawWall`, its undo and its delete hold it. The re-lay cells W7·C2, W8·C2 and W11·C2 are
  other seats' findings (section 4).
* (ii) No V03 or V04 site restates either table in its own words, and none keeps a crossing station, raised gate, wall
  opening, held stretch, `bend.wall.held` or the old (6) (a), (b) or (d) (grep of both volumes; "wall opening" at V04
  l. 2882 is a vertical access's portal, and "S7b (6) (d)" at l. 3415 is S7b's own step). V04 §3.5.4 (d) (1)'s
  parenthesis is (V4-1)'s text.
* (iii) Every citation names something that exists: "§2.7's crossing table, *beneath*" (l. 161, 1698, 3156) and "W1·C6"
  (l. 3156); `Enceinte.band` and `Enceinte.strips` (base l. 2259–2261).
* The hook has both ends: V04 §1.2 consumes *beneath*'s vault clause, and the base names V04 at it (*beneath*, the span
  rule's last sentence l. 2746, §7.1's `bend.wall.raisedCrossing` row, §7.3's S7 row, §4.11 `wallToWay`).

**R6-03.** Neither volume holds `lateCalamities`, a held calamity or a late-calamity clause.

Found:
* **T-V4-63's lay-rule clauses (the round's sweep)** — the sweep put "no wall stands over" on every restatement of
  (d) (1) but two clauses of T-V4-63's own bar: "a span's `use` edit lays or removes exactly that vault" and the frame
  growth's "the arch vault of every old `vault` span between two of them". The bar's next clause ("no chamber stands …
  in a `vault` span a wall stands over") contradicts both. → **VV34-r6-01** (minor).
* **R6-07's condition on the underground's second subject** — UE33's E1 and T-V4-82 (g) put "under no disaster look" on
  the never-decayed building, but not on "an underground none of whose buildings has decayed", whose storeys below 0 draw a
  look's level (J-V4.130; V04 §5.6 (6); T-V4-82 (i)). → **VV34-r6-02** (minor).
* **§1b.2's "an absorbed record dropped"** — (V4-3)'s example names an event no op makes, the same defect VV56-r6-02 finds
  at the crossing table's W8. Its V04 END names only §3.10's bullet. → **VV34-r6-03** (major, one fix with VV56-r6-02).
* **T-V4-63's epoch clauses in §8's U5 cell** — they run on V06's epoch ops (the founding, the epoch circuit and, new this
  round, its run with the span breached first), whose arch-vault reconcile over `EpochScope.raised` V06 builds at E8,
  after U5. → **VV34-r6-04** (minor).

Checked and found sound:
* §3.10's lead "laid, moved or removed" and its removal clause "laid or moved" are consistent.
* §4.4's wall-commit undo agrees with W2's and W11's last columns.
* §4.3's new row: the raised way, the network and every other part are byte-identical, and the reconcile's fates are in
  the dry run.
* §4.6's migration rule and T-V4-62's door and collapse clauses are consistent.
* §3.5.0's foundations scope ("in `scope.raised` whose `feet`, `supports` or `spans` the epoch changed") agrees with
  V04's own call. Its caller is VAL-R6-05's.
* J-V4.79 – J-V4.81 still hold: the span record is unchanged under a wall, and V04 still decides no span.
* The village derivation is covered by the T2 vaults step, which reads VS3's palisade.
* §1b.2's general words ("the commit of every enceinte band or wall strip laid, moved or removed over a `vault` span's
  under-deck strip") cover a hand `contractWall`, drawn with T3.
* ## 0's plain-words line is a summary: "any arch a town wall passes beneath, stay open". (d) (1) is precise.

## 4 Concurred, not re-raised

Each issue below was raised by another round-6 verifier. I re-read each against the live text and agree with it.
* **VAL-R6-01** (agree-layers, model, with V04 ENDs) and **VEW-r6-02** (edges-world, model, with V04 ENDs) close
  repair-r6-V04's open hand-off.
  * The case: a locked or declared-seated arch vault in a `vault` span that a wall comes to stand over at an epoch or a
    regeneration.
  * UC18 (l. 2459) keeps the vault. (d) (3) (l. 1713–1714), *beneath* and T-V6-47's bar remove it.
* **VAT6-r6-01** (agree-time, V04, major) — T-V4-63's bar "every arch vault's key names a standing span of use `vault`"
  fails the round's own breach-first and frame-growth runs. Those runs leave a `collapsed` vault in a `ruined` span
  ((d) (2)).
* **VAT6-r6-04** (agree-time, V03, minor) — T-V3-40 (b)'s hand-over clause and V03 §8's P4 cell name no exit after V06's E2.
  E2 builds `crisisLookYields` (V06 §8's E2 row). This is repair-r6-V02's observation, which assemble-r6 §2.1 recorded and
  no ruling routed.
* **VAL-R6-05** (agree-layers, V06) — V06 §3.18.1 (6) calls `Foundations.apply` over all of `scope.raised`, while V04 §3.5.0
  reads only the changed raised ways.
* **VV56-r6-02** (V05-V06, model) — W8's "once the record is dropped". Its V04 END covers §3.10. §1b.2 is VV34-r6-03.
* **VM-R6T-03** (model) — W11·C2 should name T-V4-63.
* **VPC-r6-02** (pipeline) — in `wallToWay`'s dry run, the span under the old line reads `open`.
* **VEL6-r6-01** (V10) — the clerk tells a span under a wall as `vault`.
* **VAT6-r6-03** (V06) — T-V6-11's and T-V6-47's arch-vault clauses run before E8. This is the mirror of VV34-r6-04.

## 5 Standing checks

* **References.**
  * Every pointer the round added in V03 and V04 resolves, checked by reading: base §6.3 *Plan damage*, §8.6, §8.2's
    `StyleSheet.groups`, §2.7's crossing table (*beneath*, W1·C6) and the support step (7); V03 §5.6 (2) (a)–(b);
    T-V3-40 (e); V04 §1b.2, §3.5.4 (d) (1)–(3), §3.10; V06 §2.1, §3.7.6 (3)–(4).
  * assemble-r6's census: 56 555 references, 0 broken; table names 0 unresolved.
  * Its ambiguous-form list for these volumes (V03 12, V04 1) was read site by site. Each reads correctly as the base's
    under S7. Examples: V04 l. 321's `HistoryRecord` (§2.7), V03 l. 2100's frame growth (§3.2 (9)), V03 l. 2904's
    budgets (§12) and V03 l. 3129's §4.1.
* **Ids.** Row ids are unique within each volume: V03 213, V04 327 (T-, J-, UE, UC, BCR, IN, W). None was added or
  removed this round.
* **Terms.** The canon's 35 retired-term patterns were run over both volumes. The only hits are G-unitinput's
  "hand-over", which here is the crisis look's `crisisLookYields`, and G-standalone's match inside "standalone
  neighbourhood document". Both are the same false positives as in earlier rounds.
* **Owner rules.**
  * Item 126 (a2): neither volume has a phone clause.
  * No deferral wording.
  * No review id or PRB6 marker appears in design text. V03's record-kept citations are unchanged.
  * Items 110 (b) and 114: the vault rule reads the band "whatever the runs' condition", and the spaces between piers
    "stay open or hold the base's vaults".
* **Cohesion.**
  * V03 §8's total (19–26) and V04 §8's total (28.5–39.5) are unchanged.
  * INDEX is unchanged this round.
  * V03's P4 and P5 cells now carry T-V3-39's own split.
  * §16's M6-P and M6-U rows are unchanged.
* **Words** (`wc -w`):

  | volume | pre-round | live | change | archive |
  |---|---:|---:|---:|---:|
  | V03 | 77 999 | 78 050 | +51 | 81 106 |
  | V04 | 84 327 | 84 976 | +649 | 82 301 |

  * V03 grew by the two conditions and the milestone split.
  * V04 grew by R6-02's no-vault-under-a-wall rule with its triggers, locality row, undo and bars, plus R6-07's
    conditions.
  * Neither unit shrank by more than half.
* **doc_checks** (`docs/validation/bench/doc_checks.py --doc <volume> --heads docs/ARCHITECTURE.md`, run on the pre-round
  text and the live text, no allow file):
  * WARNING — the reference corpus is INCOMPLETE (captures, research/patreon, research/devlogs, research/ftg-docs and
    research/external are missing). The results are **NOT authoritative and are provisional**.

  | volume | C1 | C2 | C3 hits / unreviewed | C4 | S1 | S2 hits, unreviewed |
  |---|---|---|---|---|---|---|
  | V03 | 0 | 0 | 367 / 281 → 367 / 281 | 2 / 0 | 0 | 199 → 200, 0 |
  | V04 | 0 | 0 | 219 / 195 → 222 / 197 | 0 | 0 | 153 → 155, 2 → 2 |

  * V04's two new unreviewed C3 runs are connective sequences of citations: "a b the same element" and "between two of
    them 2". They are not corpus content, and assemble-r6 §6 lists them.
  * V04's S2 pair is the pre-existing "§3.24" pointer at l. 535 and l. 3528.

## 6 Issues

0 blocker, 1 major, 3 minor.

| id | sev | kind | owner | claim | required change |
|---|---|---|---|---|---|
| VV34-r6-01 | minor | NEW-PROBLEM | V04 | The round's sweep put "no wall stands over" (V04 §3.5.4 (d) (1)) on every restatement of the lay rule except two clauses of T-V4-63's own bar (l. 3156). The sweep covered §1b.3, §4.1, §4.2, §4.6, T-V4-62, and T-V4-63's "a user-added raised way's `vault` spans" and "each new `vault` span". The first missed clause is "a span's `use` edit lays or removes exactly that vault and survives a regeneration": on a span under a wall a `use` set to `vault` lays nothing (§1b.3 l. 370, §4.2 l. 2557: "none in a span a wall stands over"). The second is the frame growth's "with the same id and footprint, the arch vault of every old `vault` span between two of them". The span rule never reads a wall (base l. 2733–2736), so a span between two old stations under a ring the old deck crosses can be `vault` in its record yet holds no vault (base l. 2746). Read literally, both clauses expect a vault that a correct build never lays, and the same bar's next clause ("no chamber stands … in a `vault` span a wall stands over") contradicts them. The mechanism is (d) (1)'s, so nothing built changes. | T-V4-63: "a span's `use` edit lays or removes exactly that vault and survives a regeneration" → "a span's `use` edit lays or removes exactly that vault (none in a span a wall stands over, V04 §3.5.4 (d) (1)) and survives a regeneration"; and "the arch vault of every old `vault` span between two of them (§2.7's support step (7))" → "the arch vault of every old `vault` span between two of them that no wall stands over (§2.7's support step (7); V04 §3.5.4 (d) (1))". |
| VV34-r6-02 | minor | DISAGREE | V04 | R6-07 puts "and under no disaster look" on every "never decayed ⇒ unchanged" statement (item 122 (d)). The round wrote the condition on the building subject of UE33's E1 (l. 2435) and on T-V4-82 (g)'s never-decayed control (l. 3175). It did not write it on their second subject: E1's "an underground none of whose buildings has decayed" and (g)'s "every band of an underground with no decayed building", each said to draw (and export) byte-identically. Under a look, a storey below 0 reads its building's drawn level, the higher of its own and the look's (J-V4.130; V04 §5.6 (6): "the look over a storey below 0 with V03 §5.6 (4)'s"). T-V4-82 (i) draws a never-decayed church's crypt at the look's level. So such an underground is not byte-identical while a look stands over it. T-V4-82 (i) runs the look, and (g)'s fixture holds none, so nothing built or tested changes. | UE33's E1: "and an underground none of whose buildings has decayed, draw byte-identically" → "and an underground none of whose buildings has decayed or stands under a disaster look, draw byte-identically". T-V4-82 (g): "and every band of an underground with no decayed building draw and export byte-identically" → "and every band of an underground with no decayed building and none under a disaster look draw and export byte-identically". |
| VV34-r6-03 | major | DISAGREE | V04 | One fix with VV56-r6-02 (major, model), at a V04 site its END list does not name (that END names only §3.10's bullet, l. 2285–2294). V04 §1b.2's `ArchVaults.reconcile` trigger list (l. 328) is the list §2.6's arch-vault row cites as the commits that remove or lay a vault under a wall. It names "an absorbed record dropped". No op drops a cleared enceinte record: `absorbWall` takes it to existence `cleared` and keeps it (V06 l. 717; V06 §3.7.2 (3), l. 1488–1499: "the fortification phase keeps the cleared record in its loop … until every run is `dismantled`", then the `enceinte` provider reads it). The same cell's general words ("the commit of every enceinte band or wall strip laid, moved or removed over a `vault` span's under-deck strip") make `absorbWall`'s own commit the trigger, since its strips re-join the blocks (V06 §2.8's op comment). A hand `convert` `absorbWall` (T3 `wall`'s convert kinds, base l. 10588; the crossing table's W8·C9) runs no `EpochScope.raised`, so l. 328 alone decides it. One builder re-lays the vault in the absorb's commit; another waits for an event no op makes. | V04 §1b.2's trigger cell (l. 328): "`wallToWay`, an absorbed record dropped;" → "`wallToWay`, `absorbWall` (in its commit, its strips merged into the blocks);", written with VV56-r6-02's ruling of the crossing table's W8·C2. If that ruling names another event, l. 328 names the same one in W8's words. |
| VV34-r6-04 | minor | COHESION | V04 | T-V4-63 (l. 3156) has clauses that run on V06's epoch ops: "an epoch that founds a raised way (V06's `under.extend`) lays its vaults in the epoch's commit"; "passed beneath by an epoch circuit" (V06 §3.7; the crossing table's W1: "an epoch's circuit … (V06 §3.7)"); and, new this round, "the circuit's case run again with that `vault` span breached with its chamber first" (a `DeclineOp` breach, which E3 builds, as R6-09 schedules T110-2's lapse). V04 §8's U5 cell (l. 3210) runs T-V4-63 whole at U5, where V04 runs the epoch reconcile "by hand and on M4's grow path". V06's `under.*` adapters, which run the arch-vault reconcile over `EpochScope.raised`, land at V06's E8 (V06 §8's E8 row), and INDEX §4 puts E8 after V04's U5. So these clauses are scheduled before their provider: R6-09's class (INDEX §5 risk 2; R5-05 (c)), the mirror of VAT6-r6-03's V06 clauses. Nothing built changes. | V04 §8's U5 tests cell: "T-V4-63, T-V4-70" → "T-V4-63 (its clauses on V06's epoch ops — the founding, the epoch circuit and its run with the span breached first — at V06's E8, which builds `under.extend`'s reconcile over `EpochScope.raised`), T-V4-70". |
