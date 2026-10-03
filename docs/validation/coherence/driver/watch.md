# Watch list — findings the session confirmed by hand, to be closed by the loop

Each row is checked after the verify round-0 sweep: if no verifier raised it, it joins the first repair round's work as
an operator finding (recorded in driver/log.md), so the zero bar covers it either way.

| id | found | units | finding | required change |
|---|---|---|---|---|
| OP-1 | 2026-10-03 01:40 UTC, while checking the walls and aqueducts family (items 106, 110, 111) | V07, V01, rendering | V07 §5.1 names style roles `aqueduct.channel`, `raised.support` and `deck.shadow` (also in the pre-pass V07), and the new V01 names `raised.support`; the new base §8 defines none of them — it draws an aqueduct's channel in `water` between two `wall` lines on the deck body in `road`, piers as their model footprints, and shadows by `derived: 'shadow'` (§8.4). Principles (2) and (10): one name per concept, one home. | one set of role names for the raised way's channel, supports and shadow, defined once in base §8 (or V07 and V01 rewritten to §8's names), cited by V07 §5.1 and V01 |
| OP-2 | 2026-10-03 01:40 UTC | model, determinism (from V06's cross-part note 4) | base §2.8 and §7.1 quote the delete dry-run line "The city will not rebuild …" instead of citing V09's `info.remove.holds` key (V06-AGREE-1, fixed in V06 only) | §2.8 and §7.1 cite V09's key and its variant rows |

Checked on landing (2026-10-03 ~01:35 UTC): V08 — the aqueduct's terminal bound to `conduit_house` and the need test met by it
(no chance factor), as the canon rules; V09 — the wall tool's snapping to natural barriers and its barrier-arc ghost (106
(g)); the ten bend keys stated once (V09-ICONF-3); the aqueduct's values cited from V11's `raisedWays.settings`, none
restated (V09-RESTATE-6). Still to check when they land: V10 (explaining an unwalled side, "the cliff is the wall here", 106 (g)), V11 (the aqueduct table as the
one home of its values; the defensibility rows; the culture modifier row for the aqueduct's chance, X6), V12 (the
water-system factor withdrawn, V12-ICONF-1/-2).
