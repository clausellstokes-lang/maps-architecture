# Verify V01 and V02 — round 2 (after repair round 2 / assemble-r2)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/verify-vol-V01-V02-r2t; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V01-V02-r2t`, 2026-10-01)
- P1 brief read whole; inputs located (r1t findings, adjudication-r2 R2-04 – R2-42 and Part H V01/V02, assemble-r2, repair-r2-V01/V02); pre-r2 volumes extracted from 682e8e9 (V01 1480993b…, V02 a11f04cc… = assemble-r2's before column): done
- P2 round-1 findings (VV12-08, VV12-r1-01 – -09, G122-V01, G122-V02, G123-V02) re-checked on the live text: pending
- P3 V01 round-2 blocks read whole (pre → live diff), new problems: pending
- P4 V02 round-2 blocks read whole (pre → live diff), new problems: pending
- P5 g items 120–126 parts in V01 and V02 as new design (wiring, lifecycle, edges, agreement, owner's words); phone clauses (R2-41): pending
- P6 references, ids, doc checks, words: pending
- P7 report and result: pending

## Inputs

* Live: `docs/volumes/V01-neighbourhoods.md` `fb2d1496…`, `docs/volumes/V02-buildings.md` `c4d39837…` (assemble-r2's after column; V02 with assemble's R2-07 line-7 hand-off).
* Before: the same files at commit 682e8e9 (`1480993b…`, `a11f04cc…`).
* Rulings: `adjudication-r2.md` R2-04 – R2-42; Part H · V01 and · V02.

## Part 1 — round-1 findings re-checked

| id | owner | ruling | verdict on the live text |
|---|---|---|---|
| VV12-08 | V02 | CLOSED per R2-04 | CLOSED. J-V2.109 stands (V02 l.1297, §9 l.3920); the canon's E-27 gained the shed clause (canon, adjudication-round-2 entry). Not re-raised. |
| VV12-r1-01 | model | ONE FIX with VM-R1T-01 (R2-13) | FIXED. Base l.3041 is the comment "// OutlineTemplateId is §4.2 S1 (2)'s …"; the one declaration is §4.2 S1 (2) (l.5013); V01 §2.1 (l.362) points at it. |
| VV12-r1-02 | pipeline | ONE FIX with VAF-R0S-08 | FIXED. II.1 l.20135 reads "DistrictContext is V01 §2.3's and TypedBoundary §2.5's". (l.19120's "(V01 §2.3)" names where the view is assembled, which V01 §2.3 l.453 states: no finding.) |
| VV12-r1-03 | V01 | FIX per R2-34 | FIXED. V01 §3.16 `catchmentOf` reads `walk`, `households`, `parish`, `district`, `settlement` as V11 §2.3's `CoverageSpec`, cited (checked against V11 l.379–388), keeping only `neighbourhood` → `district`, `underDistance` underground, the island one `walk` unit, and no unit in a district with no residential plot. Dependents: V01 §5.4 (3) *Evaluation* (one pass per member and radius over the 16 m raster; symmetric disc, each district's own `households` radius), §6's services and Show-gaps lines with fallbacks, J-V1.102's reason, T-V1-42 and T-V1-59 (b) plot by plot on all four units. |
| VV12-r1-04 | V01 | FIX | FIXED. §0 l.89 "making a standalone neighbourhood document"; a joined-line scan finds no bare "standalone neighbourhood" in V01 or V02. |
| VV12-r1-05 | V02 | FIX (second option) | FIXED. V02 §6.4 l.3210 reads exactly Part H's text; §6.2 gains no figure. |
| VV12-r1-06 | V02 | FIX per R2-07 | FIXED. V02 l.7 "owner items 1–101, file g, file f 200–585" (assemble-r2's hand-off). |
| VV12-r1-07 | V11 | ONE FIX with VAF-R0S-13 (R2-15) | FIXED. No `X-V11-7`, `fallbackM2`, `fallbackFloors` or "stopgap band" anywhere in the base or the volumes. |
| VV12-r1-08 | V12 | FIX per R2-15 | FIXED. V12 l.2177's `deck` line ends "the panel rule \|". |
| VV12-r1-09 | scope | FIX | FIXED. §14's `@plat/hood` (l.18986–18994) lists catchmentOf / districtsAbove / fabricSignature / skyDistrictCount / findAreas / gapUnits / disasterSource with disasterDistricts / campLand and the writer plantRimWalk (V01 §3.16, V01 §5.4), with the M3b note for `campLand`. |
| G122-V01 | V01 | NEW DESIGN per R2-37 (4)–(5), R2-36 | PRESENT (see Part 3): `disasterSource` / `disasterDistricts` and `campLand` (V01 §3.16), §2.3's `DisasterUnit` / `DisasterSource`, §1–§1b wiring, §3.18 rows, §5.4 (6), §6's line, T-V1-60, J-V1.104/105. New findings on it in Part 2. |
| G122-V02 | V02 | NEW DESIGN per R2-37 (4), (7), R2-36 | see Part 3 |
| G123-V02 | V02 | NEW DESIGN per R2-38 (4), R2-35 (T123-5) | see Part 3 |

## Part 2 — new findings

(pending)

## Part 3 — owner items 120–126 in V01 and V02

(pending)

## Part 4 — references, ids, checks, words

(pending)
