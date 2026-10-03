# Repair round 1 — V01 (neighbourhoods) — lane coherence/repair-V01-r1

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-V01-r1; covered by the whole-design retrovalidation (J84).

PROGRESS
- P0 resume check (no output, no LANDED line): fresh start — done
- P1 brief read whole; the 13 issues' sources (verify-agree-fabric/-proof/-time-r0s, verify-edges-world-r0s,
  verify-vol-V01-V02-r0s), the canon's dated rulings for items 119, 119 (a2) and 120 (V01 is named in 120: G120-V01),
  the landed sibling repairs this unit cites (model §2.7's gate moat deck, pipeline II.2, rendering §12.1, V06, V07 §5.5,
  V10 §2.13, V11 §3.25.8, V12 §2.13 and §3.15.10) and every concerned V01 section read whole — done
- P2 count-asserted substitutions on the live V01, emitted as REPLACE blocks (96 edits, 0 failed) — done
- P3 checks on a copy (applier dry run, references, ids, per-issue presence, doc_checks), result file, LANDED — done

FORM OF THIS FILE. One "=== FILE docs/volumes/V01-neighbourhoods.md ===" line, then 34 REPLACE blocks, one per V01
subsection that changes (## 0, §1.1, §1.2, §1.3, §1b, §2.3, §2.6, §2.7, §3.3.6, §3.4.4, §3.4.5, §3.5.3, §3.5.7, §3.8.8,
§3.10.1, §3.10.3, §3.12, §3.14, §3.16, §3.17.6, §3.18, §4.2, §4.3, §5.1.2, §5.3, ## 6, ## 7, §8.2, §8.3, ## 9, ## 11, ## 12,
## 13, ## Integration notes); no RULING REQUEST. Source: the live V01 after assemble-r0, sha256 8ced48409fb352ce…; the
intended result sha256 1480993bec654309…. Every line the edits do not touch is verbatim. The §5.3 block also carries the
new sibling subsection "### 5.4 Find over the town — areas and gaps …" (G120-V01), so the applier's note "REPLACE body
holds heading(s) of the target level or higher" on that block is intended. The working material — the generator
(gen.py, lib.py, edits_a.py … edits_c.py, every edit tagged with its issue id and count-asserted), the line diff (diff.txt)
and the word diff (wdiff.txt) — is in docs/validation/coherence/work/repair-V01-r1/; `python3 gen.py` there reproduces the
blocks byte for byte from V01.orig.md (the live copy).

ISSUES (13 routed, all FIXED in the text; plus G120-V01)
- VAT0-03 (blocker) — V01 §3.3.6: the participant's ops are drawn on `ctx.stream(S9b, entity)` (`epoch.transform`; its
  registered stage, V06 §2.1, V06 §3.16), item (1)'s S7c rule included, its table reads recorded under `S9b`; V01 §3.12's
  `epoch.transform` line says the same.
- VAF-R0S-14 — V01 §3.10.1: both formulas read §4.2 S2's `plotShare(dense core)` by name (no 0.62 left in the rule).
- VAF-R0S-22 — V01 §3.4.4 (3): the spacings `s₁, s₂, …` are cited as II.2's law over the radius budget `R` (the growth
  factor and the `cut.arc` draws included); only `R`, `r₁ = s₁ / 2`, `r_k = r_{k−1} + s_k`, the fit and the land-budget stop
  stay (NG's one-factor-per-map note and J-V1.37 kept as the provenance).
- VAP-22 — T-V1-4 (e) reads item 110's off form as V11 §3.24.0's switches and names its `NoOpPin` registration of the M5
  neighbourhood suite on V12 §3.7.8's engine (`item110.*`, written by the M5 seat), the extension marking unchanged;
  §3.18 (c)'s toggle row agrees (V12 §2.13's `item110.*` rows already list "the neighbourhood suite (V01, T-V1-4 (e))").
- VAT0-11 — J-V1.36: "no epochs: such a document has no clock (no S4–S5 route), so `advance` and a skeleton's `history`
  bend (V06 §1.3, V06 §4.1; J-V6.102)".
- VEW-14 — V01 §3.17.6 (1): no deck plots on a gate's moat deck (a bridge over a `moat` or `castle_moat` whose way is a
  `Gate.way`; §2.7, §4.7), otherwise item 246's rule; a fixed moat bridge away from a gate belongs by the owner rule;
  T-V1-53 gains the walled, moated fixture (0 deck plots on a gate's stone moat bridge); §3.18 (e)'s deck row and a new
  (f) row ("a bridge over a moat and deck plots") state it.
- VEW-19 — V01 §3.18 (f) gains the rung column (`—` for the 14 rule cells; "simpler shape; leave out and report;
  substitute" for steep ground and a terraced ward) and its lead says what the column holds.
- VV12-03 — V01 §6 gains item 119's part (J-V1.103): the lines stay the targets; the one-time waits stage 2 adds or
  lengthens (generation with stage 2, a standalone document's first map, a replace close-up, the switch's Re-derive from
  S2, the sky unit run at generation and inside a raise, a district or outline export) within ten seconds of total time at
  every rung to the METROPOLIS cap; progress past one second (V09 §4.21.9); slower only for a recorded measured gain
  (V11 §3.25.8's `perf.qualitySpend`); the interactive lines unchanged; T-V1-29 gains the timing clause (the switch edit
  at the METROPOLIS cap among them); §0, §1.1, §1.2, §1b, §8.2, §9, §11 and §12 carry it.
- VV12-07 — V01 §3.4.4's precinct course offsets as the kernel does (§3.7 *Insets*): `insetRing` with the negative inset on
  a convex outline, else the outer ring of the face's union with a `buffer` of its ring by `dBar + w_tpl / 2` (a pocket the
  offset closes lies inside the course), then the three passes and the 48-vertex resampling; §3.18 (e)'s spine-series-ring
  row gains "a non-convex precinct outline → the buffer union" (T-V1-7).
- VV12-11 — every listed rule cites its cell: `plaza.voidRadius`, `plaza.aspectMin`, `sq.smallDiv`,
  `ring.insetELo × eLo + w_tpl / 2` (twice), `max(ring.portalGapM, …)`, `green.leafyCourt` (§2.6, §3.5.7, §3.10.1),
  `size.small` / `size.medium` / `size.large` (§2.6, §3.10.1, §4.2); §3.14's "used in" cells name the uses without
  values, so the values stand only in the default column (§0's plain words keep the house counts for the reader).
- VV12-12 — every listed continuation takes its volume's prefix (V01's, V02's, V03's, V04's, V05's, V12's); the ranges
  and the intended base pointers stay; the same fix applied to §3.14's `terrace.profileNoticeCm` row ("§3.9, §3.11 (7)",
  outside the assembler's list). A scan of the result finds no bare continuation after a volume pointer (the original held
  49).
- VV12-13 — V01 §7's parity paragraph states the NG parity sheet's roof-construction sentence whole; V01 §5.1.2's hatch
  bullet, J-V1.73, §12 and the integration notes cite V01 §7 for it, so V02's three "V01 §7's rule" pointers resolve.
- VV12-16 — "(V05 §3.8)"; §3.18 (e)'s constants row "clamped by V11 §4.1's rule (V11 §2.1's `ColumnSpec.range`)"; §3.14
  "its `range` clamps an edit (V11 §2.1; V11 §4.1's rule)".
- G120-V01 (item 120, J133; the canon names V01 for "districts, neighbourhoods, quarters and catchments as area targets
  and as Show gaps' units") — new V01 §5.4 *Find over the town — areas and gaps* (J-V1.102): `findAreas(key)` — every
  district but the hinterland on every layer (a neighbourhood is the district a close-up opens, J-V1.35: one target per
  area), the city cut's quarters of two or more districts, the region groups; their shapes, anchors, search words and
  admission; named `HoodPlace`s as the gazetteer's place targets — and `gapUnits(chip, key)` — the class's coverage unit
  read through `catchmentOf` (partition units `district`, `parish`, `settlement`; per-plot units `walk`, `households` as the
  unserved residential plots grouped by district), members only those the key admits, parish cells only from admitted
  churches; evaluation by one pass or one multi-source walk; over time and edits; exports; cost. Declared in V01 §2.3
  (`FindArea`, `GapUnit`, the two signatures), wired in §1b, §1.2, §1.3, §2.7's derived list, §3.16 (and `catchmentOf`'s
  callers: Show gaps replaces volume 9's Coverage view, item 120 (i)), budgeted in §6 (two lines), edged in §3.18 (c) and
  (e), tested by T-V1-59, built in W10 and W11 (§8.2) and `@plat/hood` (§8.3).

ITEM 119 (a2) AND THE HELD VV56-07. The orchestrator's note held VV56-07 (advance time and the history replay, per step or
in total); the canon's later dated ruling records the owner's answer ("Total", J132), which is V06's part. No V01 issue
touches it: V01 §6's item-119 part covers stage 2's own one-time waits only, and the `hood.fabric` participant's work runs
inside an epoch, whose time is V06's advance and replay budget.

PRICING. Items 119 and 120 add no work line: Find's two pure services lie within W10's range and T-V1-29's clause and
T-V1-59 within W11's, so the M5 total (27.25–36.25 pw) and §16's M5 row are unchanged.

CHECKS (on a copy; no live file touched)
- apply-blocks.py on V01.orig.md (the live V01) with this file's blocks (the FILE line stripped): 34 applied, 0 skipped,
  every block's audit OK (present once), fences balanced (14 fence lines), headings 122 → 123 (+ §5.4), the result
  byte-identical to the intended V01.new.md (sha256 1480993bec654309…).
- References (assemble-r0's refs.py on the base and the volumes with this V01): V01 3 108 resolved, 0 broken but
  "V07 §5.5", which V07's own round-1 block (its whole-volume REPLACE) adds; 11 ambiguous-form rows, all ranges
  (`V01 §4–§8`, `V11 §2.3–§2.4`, `V02 §5.2–§5.3`, `V01 §2.1–§2.2`, `V01 §4.1–§4.4`) or the intended base pointers the issue
  keeps (l.270 §2.8, l.2447 §5, l.2748 §8.6).
- Ids: T-V1-1 – T-V1-59 and J-V1.1 – J-V1.103 each defined once (T-V1-59, J-V1.102 and J-V1.103 new; none used elsewhere
  in the set).
- Per-issue presence: each required text present, each removed form absent (`S7c | S9b`, "volume 6's first build",
  `s₁ = eLo + u …`, `g = 1 + f`, `s_k = s₁ × …`, `0.62` in §3.10.1, `1.2 ×`, `max(6 m`, `eLo² ÷ 2`, `× 1.5`, the house counts
  in §2.6, §3.10.1 and §4.2).
- doc_checks.py (`--allow docs/validation/doc-checks-allow.tsv --heads docs/ARCHITECTURE.md`): WARNING: reference corpus
  INCOMPLETE (captures, research/patreon, research/devlogs, research/ftg-docs, research/external) — clean-room results NOT
  authoritative; provisional. Live V01: C1 0, C2 0, C3 388 (347 unreviewed), C4 2 (0), S1 0, S2 200 (3). Result: C1 0, C2 0,
  C3 391 (351 unreviewed), C4 2 (0), S1 0, S2 215 (3 — the same three `code-neighbourhood.md` §2.0 false positives). The
  16 C3 three-grams the new text adds, reviewed here and proposed as allow rows (generic English or section-number runs, no
  reference identifier, word list, palette or table): "16 1 2 the base hooks", "3 10 1 1 5 2 1 5", "3 4 4 3 3 7", "4 5 and
  the tree s", "4 7 the gate s", "5 4 5 5 4", "a cell that is a rule", "as it is the longer", "by name and the map",
  "committed state and the key", "definition of the town s", "its state is the per", "or not at all a", "ring of the union
  of the outline s", "small medium large size small", "the look of an area"; 13 earlier number-run hits are gone.
- Words (`wc -w`): 74 506 → 79 160 (+4 654). Removed: restatement only (the ring law, the dense-core share's
  literal, eight constant literals, the parity sentence's second home); added: items 119 and 120's new design at build depth (§5.4
  ≈ 1 590 words, §6's paragraph and two lines, §2.3's records, T-V1-59, T-V1-29's clause, J-V1.102–103, the wiring rows)
  and VV12-07's buffer rule. The owner's new rules hold the growth; no content was cut.

HAND-OFFS (other units' text; nothing written here)
- V09: the Find panel lists `findAreas`' entries (one per area; `word`), `live.find` draws an area's shapes, halo, pin and
  ghost pins and Show gaps' units from `gapUnits`; its Coverage view and `live.coverage` give way to Show gaps (item 120
  (i)), and its §1.1 line "volume 1's coverage and voids views" and the `live.coverage` wiring row then read Show gaps.
- rendering: §8.2's dashed gap outline with its "none here" label and the area halo along `FindArea.shapes`; §11.2's match
  listing by area reads `findAreas`; §12.5's overlay budget holds V01 §6's two Find lines; §8.2's `live.coverage` row (l.
  11858 of the live base) is folded into Find.
- V10: `FindAnswer.none` carries `GapUnit.id`s (districts, parish church members, `TOWN_ROOT`); an area chip's `id` is a
  `FindArea.id`.
- model §2.9: the `find` key's address chip covers an area (`FindArea.id`).
- scope §13.2: the take-over row for item 120's town areas and gaps names T-V1-59, and item 119's for stage 2's one-time
  waits names T-V1-29's clause; §16's M5 row unchanged.
- V12 §3.15.10 already names "the area targets and Show gaps' units V01's" (T-V1-59 is that part).
- OBSERVATION for the next verify round (not routed here, so not changed): V01 §3.16's `catchmentOf` measures `walk` and
  `households` along the way graph (households by the nearest `per` households), while V11 §2.3's `CoverageSpec` comment and
  V12 §3.6's `servedShare` read both as discs on the 16 m raster (households by `√(per × a_res ÷ π)`); T-V1-42 asserts the
  served-district shares agree. Show gaps reads `catchmentOf` and so follows whichever reading a ruling keeps.

