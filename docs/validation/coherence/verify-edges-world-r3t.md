# Verify — edge cases and combinations across the physical world, round 3 (coherence/verify-edges-world-r3t)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-edges-world-r3t; covered by the
> whole-design retrovalidation (J84).

> PROGRESS (kill-safe ledger)
> - P0 resume check (no output, no LANDED line): fresh start — done
> - P1 brief whole; r2t report and result (6 issues); adjudication-r3 (R3-01 – R3-03, R3-14, R3-25 – R3-27, Part H of every member, scope and V06); assemble-r3 (live sha256 = its "after" column) — done
> - P2 the 6 round-2 findings re-checked against the live text (with END lines' second ends) — done (6 of 6 fixed)
> - P3 the round-3 blocks in scope walked whole for new edge problems — pending
> - P4 owner items 114–119 parts and phone census — pending
> - P5 report, result JSON, LANDED — pending

## Round-2 findings re-checked (P2)

Live text: each member file equal to assemble-r3's "after" sha256 (base `593c657d…`, V01 `8260b2a8…`, V02 `4696951c…`,
V03 `f4458cf4…`, V04 `0e3bcacd…`, V05 `cc1dfa61…`, V06 `8f92dd38…`, V07 `285e2f6f…`, V11 `1671da41…`). The pre-round text
for the diffs is HEAD `920d280d`'s (each file equal to assemble-r3's "before" column).

| id | owner | Part H | verdict | where it stands now |
|---|---|---|---|---|
| VEW-04 | pipeline | FIX (closes VM-R2T-06) | **fixed** | §4.13 EP-22 (base l.8869) carries the hill-town plot beside a wet moat reading the moat's derived level + `freeboardCm`, never its bank top, and its outcome cell names §2.6's water table; §2.6 (l.1901–1903) reads the moat's one derived level. |
| VEW-r2-01 | model | FIX per R3-25 (c), BLOCKER | **fixed** (every end) | §2.7 support step (6) (l.2559–2567); §4.4 S5a *Outer moats* (l.5809–5812: the carve clears no support, the raised gate, no part-0 deck); §4.8 S7 *A trace across a standing raised way* (l.7562–7569); V06 §3.7.1's exception (V06 l.1449–1450), §3.7.6 (5)'s crossing-station and continuity bullets (V06 l.1583–1593), T-V6-47 (V06 l.4114); §13.2 T110-2's c14 fixture and epoch circuit (l.18228–18231). |
| VEW-r2-02 | scope | FIX | **fixed** | §13.2 T116-4 (l.18323–18325) reads the limit bounds at any window size and with none, the cap's whole-bounds PNG, print and SVG; the stop-0 clause stays in T116-1 only. |
| VEW-r2-03 | pipeline | FIX per R3-14 (6) | **fixed** (every end) | §10.2 (d) (l.15527–15546): the reference point, `approachByGate` and `outside` measured from it; (h) (l.15587); EP-27 (l.8874); T-ER-27's mesa fixture (l.14581); V06 §3.22 (2) d. (V06 l.3348) and its edge row (V06 l.3272), T-V6-75 (c). |
| VEW-r2-04 | V04 | FIX | **fixed** | V04 §3.2 N2 (V04 l.986–997): the D8 path over land only, a path entering water passed over, every path entering water → gutter and pit, unsewered; UC19 (l.2448), the edge row (l.2356), T-V4-2, T-V4-80 (j)'s mill-intake fixture, J-V4.129. Sinks are filled (§4.2 S1 (3)), so every path not entering water reaches beyond the strip before the frame. |
| VEW-r2-05 | pipeline | FIX per R3-14 (2) | **fixed** (every end) | §10.2 (d)'s town enceintes (no `bailey`; `Castle.cityWeld`), the outer envelope for rings not nested, no part on a building footprint, the siege line broken at an extramural building (l.15513–15526); (f) and (h) read "no standing town enceinte" (l.15571, l.15584–15586); EP-27; T-ER-27's four fixtures and bar. |

All six close. No VEW id was ruled INVALID or MERGED away; assemble-r3 skipped no block.
