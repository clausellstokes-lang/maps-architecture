# Verify — edge cases and combinations across time, the host, the tools and the tables, round 1 (coherence/verify-edges-life-r1t)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-edges-life-r1t; covered by the whole-design retrovalidation (J84).

> **PROGRESS** — [x] brief read whole · [x] resume check (fresh start) · [ ] round-0 findings VEL0-01–11 re-checked · [ ] repaired subsections in scope re-checked · [ ] items 120–125 parts (G120/G121/G122/G123/G124/G122h/G125) · [ ] lane walk of new text at its limits · [ ] issues written · [ ] result saved · [ ] LANDED

Members: determinism, scope, V06, V08, V09, V10, V11, V12 — the live text after assemble-r1 (sha256 per assemble-r1.md §1).

## Working ledger (filled as the checks run)

- Round-0 re-check: VEL0-02, 03, 04, 05, 07, 08, 09, 10 FIXED in the live text; VEL0-01 PARTLY (§7.7 and §7.1 fixed; §13.2's
  T20 group and the Part A rows J-DET-11, J-A20.71 not); VEL0-06 PARTLY (§6.1 fixed; J-A113.61's index row and Part A row
  stale); VEL0-11 PARTLY (V11 fixed; V09 §4.9's key and §7.1's E-07 row not written).
- New candidates: protected dwelling at 0 households vs §2.6's clamp and §4.11 (c); T20-2 and T-V6-27 bars vs the
  `host:port` rule; the accepted advance's cadence not carried by `AdvanceRequest` or the journal; the stopped advance's
  recovery by a timed cancel.
- Reviewed hunks: base §5–§7, §13, V06 whole diff. Next: V08, V09, V10, V11, V12 hunks; items 120–125 parts.

