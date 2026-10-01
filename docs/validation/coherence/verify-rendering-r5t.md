# verify-rendering-r5t — base §8, §9, §11, §12 after repair round 5

> Lane `coherence/verify-rendering-r5t` (opus verifier). Base `docs/ARCHITECTURE.md` sha256 2d84eac2… (assemble-r5's output;
> before the round 5f34cceb…, `git show 3310b53`), rationale a480f02e… (unchanged this round). Scratch: `scratchpad/coherence/vr5/`.

PROGRESS
- P0 brief read whole; RESUME/CONTINUE check (no output, no LANDED): done
- P1 inputs: verify-rendering-r4t (9 findings), adjudication-r5 (R5-01, R5-02, R5-04, R5-05, R5-08, R5-09; Part H ·
  rendering, scope, determinism, pipeline, V08, V09 with the END lines closing my findings' second ends), repair-r5-rendering's
  header (issues, END lines, sweeps, hand-offs), assemble-r5 (only rendering's 11 blocks touch §8, §9, §11, §12): done
- P2 the 11 replaced subsections' word diffs read whole, pre → live: done
- P3 round-4 findings re-checked against the live text, each END line's second end included: done (8 FIXED, VRC4T-04 PARTLY FIXED)
- P4 receipts, doc checks, references, terms, review ids, deferral: done
- P5 new findings, report, result, LANDED: done

## 1. What changed in scope

Pre-round base 5f34cceb… (HEAD 3310b53) against live 2d84eac2… (HEAD 52a16b0, the working tree identical). Only
`repair-r5-rendering.md`'s 11 REPLACE blocks touch §8, §9, §11 and §12 (assemble-r5: 0 overlaps; determinism's, kernel's,
model's, pipeline's and scope's blocks lie outside). Eleven subsections replaced, each word diff read whole; every other
subsection of the four sections byte-identical.

| subsection | words pre → live | what the round wrote |
|---|---|---|
| §8.2 | 18 588 → 18 651 | *The layer*: each `live.crises` mark carries its look's `ConditionOverlay` handle in `entity`, a preview none (VV910-r4-02, R5-08 (b), Part H's amendment); Find's budget restatement → "§12.5's (R12-35)" |
| §8.4 | 7 035 → 7 097 | (i) each kind's fade, s moving by 1 ÷ fade a second (VDC4-02); the wall run beneath a span in the heightfield writers and shadow casters (R5-02 R1) |
| §8.6 | 1 606 → 1 646 | the comparison from the element's entry week (VAF-R4T-03, R5-04); "never decayed and under no disaster look" |
| §8.8 | 5 781 → 5 810 | the DPR sentence takes R4-10's phrase whole (VRC4T-01) |
| §8.11 | 4 012 → 4 186 | T-ER-25 (re-evaluation ≈ 100 ms, E6 scheduling), T-ER-26 (idle monitor change within 10 s), T-ER-27 (siege + refugee camp, E6), T-ER-28 (R5-04 END) |
| §9.5 | 1 584 → 1 601 | annotation layer in a picture only with `ExportOpts.pins`; Find "at the view's effective key and drawn week" |
| §11.1 | 6 554 → 6 633 | GeoJSON `supplyLink` feature (VRC4T-02); glTF and CityJSON wall run beneath a span (R5-02 R1) |
| §11.2 | 8 768 → 8 943 | `pins`, `furniture`'s exception (VAT-r4-02); `links` cites §11.1; `vtt.squareM` 1.25 and the non-finite refusal (VRC4T-03); `looks.field` and `over` (VV910-r4-03 END); the view-bound section week (VAT-r4-01); the reader list (VV12-r4-01 END) and the index triggers (VRC4T-04) |
| §11.6 | 524 → 572 | T-ER-19's 1.25, `NaN` and pins inputs, outcomes and bar |
| §12.5 | 1 827 → 1 879 | Find: rebuilt at each effective-key change; a drawn week's re-evaluation ≈ 100 ms, the frame never waiting (R5-05 (b)) |
| §12.10 | 3 026 → 3 085 | R12-35: the triggers, the scrubbed week's timing and bar, E6 scheduling |

Size (principle (9)): §8 + §9 + §11 + §12 95 380 → 96 178 words this round (+798, +0.8 %); against the pre-coherence archive
59 158 → 96 178. Growth is the fixes' required content (tests' rows, `pins`, the crisis marks' look, the `supplyLink`
feature, the drawn week's triggers and budget, the fades, the section week, `looks.field`). The words removed were read
against the new text and each survives at its home: §8.2's Find budget (≈ 50 ms, ≈ 100 ms, the index per commit) in §12.5
and R12-35; §11.2's `links` field list in §11.1's GeoJSON row; §11.2's second reader list as "those readers" (the list just
before it; V10's `FindAnswer` is its `read_map find`). §8.4 (i)'s "at least 5 s … 60 s, V11's rows never shorter" became
exact fades as VDC4-02 rules, every V11 §3.25.11 `lengthS` lower end and override checked at least twice its fade (rain 30,
drizzle 60, snow 60, leaves 20 ≥ 10 s; mist, cloudShadow, shimmer, dust 120, fog 180 ≥ 120 s; overrides rain 60–180 s and
arid 20–60 s). No nuance lost; no shrink; no nuance audit triggered.

## 2. Round-4 findings re-checked

| id | Part H | verdict | evidence (live) |
|---|---|---|---|
| VRC4T-01 | FIX | **FIXED** | §8.8 l. 14380–14383: "… at once when no gesture runs, at the gesture's settle otherwise — and at most once in 10 s, counted with the loop's changes, so one coming within 10 s of the last change applies when those 10 s end (T121-7)"; T-ER-26 (l. 14754) adds the idle monitor change within 10 s of a step-down, its outcome and bar. Agrees with J-A121.07 (index l. 22960, Part A l. 849). V09's restatements: VRC5T-04. |
| VRC4T-02 | FIX | **FIXED** | §11.1's GeoJSON row (l. 15984) names the `supplyLink` LineString with its fields and knowledge rule; `ExportOpts.links` (l. 16283) cites §11.1 and V09 §5.10; V09 END (l. 4153) "one LineString per link within the export's scope (§11.1; §11.2's `ExportOpts.links`)". |
| VRC4T-03 | FIX | **FIXED** | §11.2's rule (l. 16301–16308): "(1.25 to the default, 1.5)"; refusal of "a numeric member that is not a finite number (`NaN` or ±∞, never clamped)"; T-ER-19 adds 1.25 and a `NaN` `vtt.pxPerSquare` with their outcomes. |
| VRC4T-04 | FIX per R5-05 | **PARTLY FIXED** | Written: §11.2's triggers (l. 16426–16428), §12.5's re-evaluation ≈ 100 ms (l. 17200–17204), R12-35 (l. 17527), T-ER-25's bar. Not written: T120-6 (§13.2 l. 18662–18664, scope; R5-05's sweep lists it) and V12's `time.findGlow` (l. 1172, 2642, T-V12-52), which repair-r5-V12 held until §13.2 carries it — kept as VRC4T-04 (minor, owner scope, V12's END). |
| VRC4T-05 | FIX | **FIXED** | §14 l. 19488 "`LodBand`, `Box`, `Role`, `ZoomStop`"; l. 19621 "(`LodBand`, `Box`, `Role`, `ZoomStop`, `LabelEntity`, …)"; l. 19754 "LodBand, Box, Role, ZoomStop, LabelTable, …". |
| VRC4T-06 | MERGED into VCS-r4-01 | **FIXED** | T121-3 (l. 18674–18675) "over §12.5's reference viewports"; no "reference view" left in the set. |
| VRC4T-07 | FIX | **FIXED** | §7.7 l. 11912–11913: "a layer's visibility by a logged `setLayer` sent by `doc.apply`, as a user's toggle". |
| VRC4T-08 | FIX | **FIXED** | V08 l. 490 "a layer's visibility goes as a logged setLayer by doc.apply (§8.4)"; l. 2473–2474 and l. 2544–2545 "… and a layer's visibility by a logged `setLayer` sent by `doc.apply` (the document's style, §8.4; …)". |
| VRC4T-09 | FIX | **FIXED** | §10.2 (d) l. 15703 "its units' tone (§8.2's `ruinTone`)"; `lookLevel` (l. 15330) "the buildings it stands over draw"; closes VAL-R4-08. |

The other ids Part H routed to rendering, and its four END lines, read in the new text and written as ruled: VAF-R4T-03
(§8.6 agrees with §6.3 l. 10005–10011; V02 END l. 3059, 3063), VAT-r4-01 (§11.2's `why` comment; V10 §2.13 l. 991, V03 l. 2378),
VAT-r4-02 (`pins`, `furniture`, §9.5, T-ER-19; V09 l. 4064, 4164), VDC4-02 (fades; §6.1's press l. 9594 reads the same fade;
no stale fade wording in the rationale or volumes), VV910-r4-02 (§8.2 as Part H amends it; V09 §4.21.12 (5) l. 3664–3668
agrees), END VV12-r4-01 (reader list), VV910-r4-03 (`looks.field`, `over`), R5-02 R1 (§8.4 ×2, §11.1's glTF and CityJSON —
but see VRC5T-01), R5-04 (T-ER-28). T-ER-25, T-ER-26, T-ER-27, T-ER-28 and T-ER-19 stay one-to-one (each new input with its
outcome at the same position and its bar). R5-02's sweep: no crossing station, raised gate, wall opening, support step,
under-deck strip, `W_RAISED_CROSSING` or `bend.*` in §8, §9, §11, §12. R5-09: §8.4's working layer and §11.3's kept keys agree.

## 3. Checks

* `doc_checks.py --sections 8,9,11,12` exit 0: C1 5/0, C2 1/0, C3 191/0, C4 3/0, S1 0/0, S2 287/0 (hits/unreviewed). WARNING
  printed: reference corpus INCOMPLETE (captures, research/patreon, research/devlogs, research/ftg-docs, research/external
  absent) — clean-room results NOT authoritative; provisional.
* References (`work/assemble-r5/refs.py` over the live set, 56 169 references): in §8, §9, §11, §12 2 976 resolved, 3
  external, 2 ambiguous-form, 0 broken. New references checked by hand: V06 §6.4 (*6.4 Scrubbing and frames*), V06 §3.15.2,
  V11 §3.25.11, V03 §5.6 (2) (a)–(d), V06 §3.23 (3), V09 §4.19, §4.21.10 (7), §4.21.12 (5), §5.10, V07 §5.5, R12-35, T121-7.
* Terms (canon glossary patterns, pre vs live per subsection): none added (G-postop and G-unitinput counts unchanged, earlier
  verdicts). Review ids in design text: none added. Deferral wording: none ("later" added only as "the later of M5 and
  V06's E6"). Phone clause: none (item 126 (a2)).

## 4. New findings

* **VRC5T-01 (major, CONFLICT, model)** — a wall run beneath a raised way's span: "no higher than" the soffit (the home,
  §2.7's support step (6) (d), l. 2607–2609) against "topped at its soffit" (§8.4 l. 13672–13673, 13897–13898; §11.1
  l. 15988, 15989; §4.5 l. 6150 "to its soffit"; §7.1 l. 10631; T110-2 l. 18495–18496; V06 l. 4170; R5-02's summary "walled
  up to a span's soffit"). They differ wherever the soffit stands above the run's own top — common, a soffit being at least
  `clearanceCm` (450 cm for carts) and aqueduct and valley-viaduct arches far taller than a curtain wall. No bar separates
  them ("0 wall runs above a span's soffit" passes both). (6) (d)'s reader list also omits CityJSON's wall objects
  (repair-r5-rendering's hand-off to model).
* **VRC5T-02 (major, NEW-PROBLEM, rendering)** — the crisis marks' new `entity` handle feeds the hit stack: `entity`
  "routes deltas, hit-tests, edits" (§8.1 l. 12391); the per-tile hit-test slices carry each rastered mark's handle (§8.9
  l. 14501); `HitAnswer` lists one entry per entity, top first (l. 16362); V09 §4.20.8 (2) selects the top; `live.crises` is a
  base layer in slot 19b "over everything built" (l. 13424), with parts on buildings and units. Nothing says whether these
  marks are hit. One build selects a `ConditionOverlay` (a staged dossier record with no selection, panel or edit route) on a
  click in a struck unit; another selects the building.
* **VRC5T-03 (major, CONFLICT, scope)** — T123-7 (l. 18718–18720) keeps the unconditioned "a never-decayed building keeps its
  plan byte for byte as it is without item 123", which §8.6 (l. 14157–14159) now cites for "never decayed and under no
  disaster look" (R5-04; §6.3 l. 10010–10011). V12's pin scope (l. 933, 2761–2763) takes every never-decayed lineage,
  registered on V03's damage fixtures (T-V3-39 (g)), which hold a disaster district (V03 l. 3260). V04 l. 2962, UE33 E1
  (l. 2428), V11 l. 3828 and 4649 restate the same. R5-04's sweep missed them.
* **VRC5T-04 (major, CONFLICT, V09)** — V09 §4.21.11 (2) (l. 3595–3597) and T-V9-84 (l. 4435) state Auto's and the
  device-pixel-ratio change's timing without R4-10's "and at most once in 10 s (§8.8)", while §8.8 now states the
  within-10-s outcome for a DPR change and T-ER-26 runs it: an idle monitor change within 10 s of a step-down applies at once
  by V09, when the 10 s end by §8.8.
* **VRC5T-05 (minor, EDGE-UNDEFINED, rendering)** — §11.2's `looks` takes `building?` and, new, `field?`; neither it nor
  `LooksAnswer.crises[].over` (l. 16385) says what an id naming no building or no field answers. V10 defines it for its
  projection only (l. 1025; row 34).

## 5. Issues (the result's list)

| id | severity | kind | owner | short |
|---|---|---|---|---|
| VRC4T-04 | minor | EDGE-UNTESTED | scope | T120-6 and V12's `time.findGlow` lack the drawn week's re-evaluation timing that R12-35 cites |
| VRC5T-01 | major | CONFLICT | model | a wall run beneath a span: "no higher than" vs "topped at" its soffit; CityJSON missing from the reader list |
| VRC5T-02 | major | NEW-PROBLEM | rendering | crisis marks' `ConditionOverlay` handle in the hit stack |
| VRC5T-03 | major | CONFLICT | scope | T123-7 and its pin and restatements lack "under no disaster look" |
| VRC5T-04 | major | CONFLICT | V09 | §4.21.11 (2) and T-V9-84 lack "at most once in 10 s" |
| VRC5T-05 | minor | EDGE-UNDEFINED | rendering | `looks` with a `building` or `field` naming none |

Totals: 6 issues — 0 blocker, 4 major, 2 minor; owners rendering 2, scope 2, model 1, V09 1. Round-4 findings: 8 FIXED,
1 PARTLY FIXED (VRC4T-04). The exact required changes are in `docs/validation/coherence/results/coherence_verify-rendering-r5t.json`.
