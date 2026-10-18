# Repair round 3 — V11 (the content system) — lane coherence/repair-V11-r3

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-V11-r3; covered by the whole-design retrovalidation (J84).

Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): text before the first "=== " line is
ignored; the FILE line routes the blocks (route.py). Unit V11: docs/volumes/V11-content.md as assemble-r2 left it (sha256
7842179aaa80abfc…, 668 876 bytes, 5 433 lines). Each REPLACE body is the live subsection with count-asserted substitutions
(generator docs/validation/coherence/work/repair-V11-r3/gen.py over edits.py: 52 substitutions, each found exactly once in
its subsection; gen-log.json maps every block to its issue ids); every other line is verbatim. 14 REPLACE blocks, 0 RULING
REQUEST blocks.

PROGRESS (lane `coherence/repair-V11-r3`, 2026-10-01)
- P0 brief read whole (10 routed issues, 2 END lines); resume check: no output, no LANDED line: fresh start: done
- P1 adjudication-r3: TOC, R3-01 – R3-03, R3-06, R3-09, R3-23, R3-26 whole (R3-10 – R3-16 read for context), Part H · V11:
  done
- P2 issue sources (verify-agree-proof, verify-edges-life, verify-pipeline, verify-vol-V07-V08, verify-vol-V11-V12, all
  r2t) and the live V11 subsections concerned read whole (§1b, §2.1, §2.3, §2.8, §2.8d, §3.1, §3.24, §3.25, §3.26, §4, §7,
  §8, §9, §12); the other ends checked: base §6.1 *The weather stream* as determinism r3 landed it, base §4.7's step
  regions and EP-24, base §10.2's `CrisisLookKind`, V06 r3's §3.23 (4) draft, V08 §2.4's census, V12 §2.13's pins: done
- P3 52 asserted edits over 14 subsections (edits.py), blocks generated: done
- P4 checks on scratch copies (below): done
- P5 result file and LANDED: done

## Dispositions — all 10 routed issues FIXED (0 MERGED, 0 INVALID, 0 ruling requests; nothing to a fix list)

| id | grade (Part H) | disposition | where it is fixed |
|---|---|---|---|
| VAP-r2-09 | minor (bookkeeping) | FIX per R3-26 | §7: T-V11-13 (`item103.coverage`, B-CITY's 200 seeds per rung, the C2 seat), T-V11-31 (`item110.raised`, `.terrace`, `.deck`, `.stepped`, the C3b seat), T-V11-38 (b) (`item111.water`, the arid and temperate sites' 200 seeds per rung), T-V11-39 (b) (on clause (a)'s four fixtures, `item113.history`), T-V11-40 (b) (B-CITY, `item114.condition`), T-V11-41 (b) (B-CITY, `item115.off` and, at TOWN, CITY and METROPOLIS, `item115.ceiling`) — each ending in the one form "— the `<pin>` registration of <suite> on V12 §3.7.8's engine (V12 §2.13), written by the <seat> seat", the C9 seat for (b) of T-V11-38 – T-V11-41 |
| VAP-r2-11 | major | FIX | §8: C9's exit runs T-V11-38 – T-V11-44, T-V11-46 (b) – (d), T-V11-47 and T-V11-48; "T-V11-46 (a), the closed mapping over V08's census lists, is C4b's at M-SF" (C4b's row already exits it) |
| VEL2-r2-02 | major | FIX | (1) §2.1's `TableSchema.totality`: row 107 `crisis.looks` `[{ kind: 'coversEnum', column: 'kind', of: 'CrisisLookKind' }]`, row 109 `damage.elements` `[{ kind: 'coversEnum', column: 'kind', of: 'DamageElementKind' }]`; T-V11-46 (b) and T-V11-47 (a) named their compile form. (2) §4.1: a delete of a `crisis.looks` row for its kind, a `damage.elements` row for its kind, or of a table's named row (the settings form: `settings`, `structure`, `festival.staging`'s `fallback`) is refused `refuse.table.required`, naming the readers, "edit its cells"; §4.4's lifecycle row. (3) EI-V11-EDGE-4 and -5 add the delete case with that outcome and its readers (DR44, §10.2's placement, §8.2's look rows; §6.3's thresholds, V06 §3.23, V03's, V02's and V04's drawings), test T-V11-45 (s); EI-V11-EDGE-3 and §3.26's general rule name the named row. (4) T-V11-45 (s) adds the tables editor's deletes of `crisis.looks`' `siege` row, `damage.elements`' `roofBay` row and `crisis.looks`' `settings` row, each refused with the tables unchanged |
| VPC-R1-01 | minor | FIX | §3.25's lead: "the types are V11 §2.8 and V11 §2.8d's, and §10.2's for item 115's ceiling and item 122's crisis tables"; §3.25.4: "The `settings` row (§10.2's `GrandeurCeilingSettings`)" |
| VPC-R2-06 | major | FIX | §3.24.1's restating bullet of T-V11-32 (a) adds "`stepMinCm < stepMaxCm ÷ 2` (so every intermediate wall of §4.7's step regions, which retains more than `stepMaxCm` ÷ 2, is a wall)", the inequality T-V11-32's §7 row already holds; the tables editor's clamp sentence names it (Part H's note) |
| VPC-R2-13 | minor | FIX | W77 (its piece, producer and consumer cells) and §2.3's *display cells* paragraph add the crisis looks (V11 §3.25.9) |
| VV78-r2-10 | major (raised) | FIX | §3.25.9's *Totality* and T-V11-46 (a): the catalogue manifest's `crisis.stressors` list (V08 §2.4) → `stressor` rows, `crisis.archetypes` → `archetype` rows, and every word of `crisis.events` its `event` row; registry row 77's reader cell adds "the `crisis.map` compile check over its crisis census lists (T-V11-46 (a))", its shape cell names the census, and W46 carries both ends; the `crisis.map` head names the simulator crisis events. §13.2's T122-4 end is scope's END line |
| VV1112-r2-01 | major | FIX per R3-23 (a) | §3.25.11 *The columns*: a kind live at a moment when its band holds the view's year position (§2.9's `yearWeek`, R3-23 (c)) and, under `light: 'time'`, its `hours` hold the view's hour; the gap spent at the live rate (§6.1), none while R is 0; the kind drawn when the gap ends; *The commonest kind* at a moment, none at R = 0 with V09's disabled button (R3-23 (b)); *The kinds*' head and §2.8's `hours` comment: "the hours of the view's day in which the kind is live"; EI-V11-EDGE-6 adds "a kind whose `hours` exclude the view's hour" → "not live then: it adds nothing to R and is never drawn at that hour"; T-V11-45 (v) adds the fixture; J-V11.120 "live hours" |
| VV1112-r2-02 | major (raised) | FIX | §3.25.9's `archetype` row adds "`occupation` → `occupation`" and *The readings* read it beside `vassal_extraction`; §12's CONFIRMED line names `occupation`, "which item 122's text and V08 §2.4's census name" |
| VV1112-r2-03 | minor | FIX | §3.1's never-calibrated summary: "calibratable but for its enumeration columns (V11 §3.25.9, V11 §3.25.10), its switches (`history.replay`, `walls.condition.atGeneration`; T-V11-37), the patch rows' `label` and `look` (V11 §3.25.3) and row 43's two owner-stamped weather caps `aridRainMaxPerHour` and `aridRainMaxWeeks` (item 124 (c); V11 §3.25.11)" |

## END lines written this round (R3-01; Part H · V11)

* **END of VAT2-r2-05 and VAT2-r2-06 (V06; R3-06):** §3.25.10's `settings` row reads "the years a building generated
  abandoned, decayed or ruined reads at the week it is first met so, aging from then as any run (V06 §3.23 (4)); a
  building item 113's replay abandons or ruins ages from that replay epoch's week", as given, followed by R3-06 (d)'s
  unchanged reading the replaced sentence carried ("before V06's level lands (M6-E) every building reads its existence
  state alone at this age"). §2.8d's `DamageSettings.defaultAgeYears` comment and EI-V11-EDGE-5's `defaultAgeYears` 0
  outcome (a building generated so at its state's floor the week it is first met, aging from then) follow the same rule.
* **END of VPC-R2-03 (V08; R3-09 (a)):** §3.25.9's `event` row reads "`calamity` (a condition linked to a carried calamity
  whose own row is `none`, V08 §3.16 (7) (b)) → `disaster`", and *The readings*' calamity sentence reads "A calamity draws
  `disaster` through the condition linked to it (V08 §3.16 (7) (b), (d)), its districts the calamity's `targets` first,
  else its pattern by its type (V01's `disasterDistricts`, §10.2 (d)); a calamity linked to no condition draws no look,
  its aftermath DR28's", both as given. In the same unit: *The readings*' `reconstruction` sentence (it draws none by its
  own row; a `reconstruction` condition linked to a carried calamity carries the `event` word `calamity` and reads that
  row, one condition per calamity, the look leaving building by building, V06 §3.22 (3)); W88's dossier cell and
  J-V11.118's calamity clause name the source word as R3-09 (d) words it.

## Judgment calls (vetoable)

1. **VEL2-r2-02 — every named row.** The required change's sentence ("or of a table's named row (`settings`, `structure`;
   V11 §2.1's settings form)") is written for every named row of the settings form, `festival.staging`'s `fallback`
   (row 103's and §2.8d's "named row") among them, so no named row stays deletable at a new home; §3.26's general rule
   and EI-V11-EDGE-3, the two restatements of §4.1's rule, say the same.
2. **VEL2-r2-02 — where the totality rules live.** §3.1's catalogue has no totality column; the per-table registry fields
   are stated in §2.1's `TableSchema` comments (as `defaultRow` and `mayEmpty` are), so the two `coversEnum` rules are
   written on `totality` there.
3. **VV1112-r2-01 — the chance.** "k with chance perHour_k ÷ R" is written "its live rate ÷ R" — its `perHour` × its site
   factor, the rate R sums — which is §6.1's "kind k with chance its rate ÷ R at that moment"; the week is §2.9's
   `yearWeek` (R3-23 (a), (c)) where the verifier wrote "the view's week". §2.8's `hours` comment and J-V11.120 ("starting
   hours") carry the same meaning; EI-V11-EDGE-6's "a week no band covers" is generalised to a moment with no live kind
   (by the week, and by the hour under `light: 'time'`).
4. **VV1112-r2-03 — the whole list.** The summary sentence also names the two switches and the patch rows' `label` and
   `look`, which §3.25.2, §3.25.3 and T-V11-37 hold `calibratable: false` and the sentence omitted in the same way.
5. **VV1112-r2-02 — the reading.** `occupation` is read in *The readings* beside `vassal_extraction` (item 122 (b)'s own
   word for the look), so every row word has its reading.
6. **VV78-r2-10 — both ends.** W46 and row 77's shape cell name the census beside its new reader; the `crisis.map` head
   names the events; *Totality* states that the `event` row `calamity` is in no census list (the check runs census →
   rows, never the reverse).
7. **VAP-r2-09 — T-V11-13.** The village sentence that followed the byte-identity clause moves into parentheses after the
   registration clause, so the registration ends the byte-identity clause as the form requires; nothing is lost.

## HAND-OFFS (R3-01 (3): the other ends, for round 4's verifiers; all ruled this round)

* **V12** (VAP-r2-08, R3-26): §2.13's suites, §3.7.8's list and X-V12-11 carry V11's six registering clauses as written
  here — `item103.coverage` (B-CITY's 200 seeds per rung, T-V11-13), `item110.*` (B-CITY, T-V11-31), `item111.water` (the
  arid and temperate sites, T-V11-38 (b)), `item113.history` (T-V11-39 (a)'s four fixtures, T-V11-39 (b)),
  `item114.condition` and `item115.off` (B-CITY, T-V11-40 (b), T-V11-41 (b)), `item115.ceiling` (B-CITY's TOWN, CITY and
  METROPOLIS seeds, T-V11-41 (b)).
* **V08** (VPC-R2-03, R3-09 (a)): §3.16 (7) (b)'s linked-condition sentence, which V11's `event` row and *The readings*
  cite.
* **scope** (END of VV78-r2-10): §13.2's T122-4 names the crisis events beside the stressor types and archetypes.
* **V09** (VV910-r2-01, R3-23 (b)): the disabled **Start a shower now** with `settings.weather.noneNow`, which §3.25.11's
  commonest-kind rule cites.
* No new cross-unit end found: every other unit's statement this repair touches already agrees (the base's §4.7 step
  regions and EP-24; §6.1 as determinism r3 landed it; §10.2's `CrisisLookKind`; V06 r3's §3.23 (4)); no other unit
  restates T-V11-32 (a)'s chain, the census list names or the archetype count.

## Checks (on scratch copies; live files untouched)

* **Dry run.** `apply-blocks.py`, unchanged, on a copy of the live V11 (this file's blocks, the FILE line removed as
  route.py splits them): 14 of 14 applied, 0 skipped, 0 malformed; audit 0 not OK; headings 58 → 58, none retitled;
  fences balanced (22 → 22 fence lines); the title block unchanged; the rationale copy byte-identical. Output 668 876 →
  674 664 bytes, 5 433 → 5 451 lines. The diff holds exactly the 52 edits (35 hunks, each at an intended site).
* **Ids.** No test, decision or edge id added or removed; every id cited (T-V11-13 … T-V11-48, EI-V11-EDGE-3 – -6,
  J-V11.118, J-V11.120) defined once; every pointer added resolves (base §2.9's `yearWeek`, §4.7, §6.1, §6.3, §7.8,
  §8.2, §9.5, §10.2; V06 §3.22 (3), §3.23; V08 §2.4, §3.16; V12 §2.13, §3.7.8; V11 §2.1, §3.25.9, §3.25.11, §4.1).
* **Scans.** No `R2-nn`, `R3-nn` or verifier id, and no deferral word, in any added line; no `sf.stressors`,
  `sf.conditionArchetypes`, "a spell may start", "calamity kernel" or "§2.8d's `GrandeurCeilingSettings`" left in V11 (and
  none elsewhere in the set).
* **doc_checks** (WARNING printed: reference corpus INCOMPLETE — captures, research/patreon, research/devlogs,
  research/ftg-docs and research/external missing — so the clean-room results are NOT authoritative; provisional), on the
  volume with the base's headings for S2, exit 1 before and after (the volume's standing unreviewed runs): C1 0 → 0,
  C2 0 → 0, C3 302 → 304 hits (275 → 277 unreviewed: "by its own row its", "row and the last row" — common words, no
  identifier, palette or list), C4 4 → 5 (0 unreviewed), S1 0 → 0, S2 313 → 326 (33 → 33 unreviewed, line shifts only).

## Words (principle (9)'s shrink goal)

`docs/volumes/V11-content.md`: 108 745 words before, 109 650 after (+905, +0.8 %); the 14 subsections 52 629 → 53 549.
Every added word is ruled content this round's issues ask for — six registration clauses, two totality rules, the
named-row refusal and its edge rows and fixtures, the three census lists, the live-hours rule, the `occupation` row, two
END lines. Removed: restatement — the calamity kernel gloss and "fire, flood or earthquake" (V01's `disasterDistricts`
holds the patterns), the old timeline sentence (§6.1's rule now cited). No narration was present in the subsections
touched. The unit grows, below the band: the irreducible content is the round's additions; a converging repair round
removes no content to meet the goal.
