# Watch list — findings the session confirmed by hand, to be closed by the loop

Each row is checked after the verify round-0 sweep: if no verifier raised it, it joins the first repair round's work as
an operator finding (recorded in driver/log.md), so the zero bar covers it either way.

| id | found | units | finding | required change |
|---|---|---|---|---|
| OP-1 | 2026-10-03 01:40 UTC, while checking the walls and aqueducts family (items 106, 110, 111) | V07, V01, rendering | V07 §5.1 names style roles `aqueduct.channel`, `raised.support` and `deck.shadow` (also in the pre-pass V07), and the new V01 names `raised.support`; the new base §8 defines none of them — it draws an aqueduct's channel in `water` between two `wall` lines on the deck body in `road`, piers as their model footprints, and shadows by `derived: 'shadow'` (§8.4). Principles (2) and (10): one name per concept, one home. | one set of role names for the raised way's channel, supports and shadow, defined once in base §8 (or V07 and V01 rewritten to §8's names), cited by V07 §5.1 and V01 |
| OP-2 | 2026-10-03 01:40 UTC | model, determinism (from V06's cross-part note 4) | base §2.8 and §7.1 quote the delete dry-run line "The city will not rebuild …" instead of citing V09's `info.remove.holds` key (V06-AGREE-1, fixed in V06 only) | §2.8 and §7.1 cite V09's key and its variant rows |
| OP-3 (CLOSED by assemble r0: the four sections placed whole, the intro reads items 102–113) | 2026-10-03 01:55 UTC, before assemble r0 | scope (INDEX.md) | the scope editor wrote INDEX.md §3, §4, §6 and §7 anew (`new/index/03-dependency-graph.md`, `04-combined-build-order.md`, `06-owner-questions.md`, `07-reconciliation.md`) and its report asks the assembler to place them and to change the intro's "(file g, items 102–110)" to "items 102–113"; the assemble r0 brief names only the base, the volumes and the rationale | check after assemble r0 that INDEX.md carries the four sections and the intro change; if not, a repair of INDEX.md in the first repair round |
| OP-4 | 2026-10-03 02:20 UTC, assemble r0's unplaced list (docs/validation/coherence/assemble-r0.md) | determinism | §5.3: the `Invariant` type used by `KernelTx.expect` (§3.3) and `StageDecl.invariants` (§4.12) is declared nowhere (scope's cross-part note) | declare `Invariant` once at its home and cite it from §3.3 and §4.12 |
| OP-5 | 2026-10-03 02:20 UTC, assemble r0's unplaced list (docs/validation/coherence/assemble-r0.md) | rendering | §8.2 / §11.3: `Role` and `BridgeMessage` are cited by §14's type map but not declared as named types (scope's note) | declare both named types at their homes |
| OP-6 | 2026-10-03 02:20 UTC, assemble r0's unplaced list (docs/validation/coherence/assemble-r0.md) | determinism | §5.4: the warnings comment names 7 underground codes against V04 §1b.1's 12 (V04 note 1) | the comment lists V04 §1b.1's 12 codes or cites them |
| OP-7 | 2026-10-03 02:20 UTC, assemble r0's unplaced list (docs/validation/coherence/assemble-r0.md) | determinism | §7.3: the closure reads V04's excavation reading `unexcavated` without `or lost` (V04 note 2) | read `unexcavated or lost` as V04 states |
| OP-8 | 2026-10-03 02:20 UTC, assemble r0's unplaced list (docs/validation/coherence/assemble-r0.md) | pipeline | II.6: the retired stored field `flowToward` still named twice; item 208 replaced it by the wayFall reading (V04 note 4) | name the wayFall reading, retire `flowToward` |
| OP-9 | 2026-10-03 02:20 UTC, assemble r0's unplaced list (docs/validation/coherence/assemble-r0.md) | V04 | one rank, two names: base `UndercityRule.sourceRank` (II.7.5) and V04 `RuinRule.sourceWeight` (V11 note 1); V11 already writes `sourceRank` | one name (the base's `sourceRank`, the canonical home) everywhere |
| OP-10 | 2026-10-03 02:20 UTC, assemble r0's unplaced list (docs/validation/coherence/assemble-r0.md) | scope | unresolved pointers: base PART III 'V07 §15'; V11 'V11 §3.17.3' (twice); INDEX §8 'V6 §2.1', 'V9 §4.16' (old cite form) | point each at the section that states the fact, in the Vnn §x.y form |
| OP-11 | 2026-10-03 02:20 UTC, assemble r0's unplaced list (docs/validation/coherence/assemble-r0.md) | V11 | bare self-references against canon S7: 19 in V11 (§3.26's edges table, §9 rows) plus 8 sibling pointers that silently resolve to the base; V04 '§3.12 (9)' meaning V03 §3.12 (9) | write every one as Vnn §x.y |
| OP-12 | 2026-10-03 02:20 UTC, assemble r0's unplaced list (docs/validation/coherence/assemble-r0.md) | scope | ids defined only in records outside the set (principle (4)): J-S23.2 (base), J-S23.5 (V03), J-SS3.10 (V04), J-RF2.4 (V06, V11, V12, INDEX), J-M2 / J-M11 (V08) | each id defined in the set (an index row at its home) or the citation replaced by the decision it names |
| OP-13 | 2026-10-03 02:20 UTC, assemble r0's unplaced list (docs/validation/coherence/assemble-r0.md) | scope | INDEX.md: the intro still says file f items are 'not yet applied'; the head keeps the volumes pass's PROGRESS ledger (narration); §5 and §8 not rewritten | the intro true of the applied set, the ledger removed (the records keep it), §5 and §8 brought into line |

Checked on landing (2026-10-03 ~01:35 UTC): V08 — the aqueduct's terminal bound to `conduit_house` and the need test met by it
(no chance factor), as the canon rules; V09 — the wall tool's snapping to natural barriers and its barrier-arc ghost (106
(g)); the ten bend keys stated once (V09-ICONF-3); the aqueduct's values cited from V11's `raisedWays.settings`, none
restated (V09-RESTATE-6). V11 (~01:45) — the aqueduct's
values in one table (`aqueduct: { sourceReachKm, needRatioMin, minFallPerKm }`, cited by V09), item 106's `WallBarrierRow`
defensibility and waterfront-threat rows (V11 §3.16), each culture row's `aqueductM` (V08 X6 closed); V12 (~01:45) — the
"factor on the aqueduct's chance" sentence gone, §3.7.6's bump carries the met need, cap step and cistern terminal
(V12-ICONF-1/-2). V10 (~01:55) — the why-answer's wall record lists
each open arc with the barrier that closes it (`open: { from, to, barrier: 'shore'|'cliff'|'gorge'|'marsh'|'sheer'|'enceinte' }`,
item 106), and item 106 (g)'s unwalled sides are among the clerk's explained subjects. Every volume's wall and aqueduct
item is closed in its rewrite; OP-1 and OP-2 remain for the loop.

Not findings (kept for the record): assemble r0's live-versus-source note (the live files are authoritative after assembly), the size (−7.8 % by words: base +13.3 % with files f and g applied, volumes −14.9 %; the validator judges the shortfall under principle (9); §0 −52.3 % and the judgment index −36.8 % go to the verifiers' nuance audit) and the provisional doc checks (corpus absent here).
