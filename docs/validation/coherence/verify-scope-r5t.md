# verify-scope-r5t — the SCOPE part after repair round 5 / assemble-r5

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-scope-r5t; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-scope-r5t`, 2026-10-01, cloud checkout)
- P0 brief read whole; resume check (no output, no LANDED): fresh start — done
- P1 inputs: verify-scope-r4t + result (1 issue), adjudication-r5 (R5-01, R5-02, R5-03, R5-07, R5-10 whole; R5-04, R5-05,
  R5-08, R5-09 for the sweep; Part H · scope and every other unit's END lines), round5-work/scope.json (10 issues),
  repair-r5-scope (header, dispositions, END lines, sweep, judgments, hand-offs), the other seventeen repair-r5 files'
  HAND-OFFS, assemble-r5 (live base `2d84eac2…`, rationale `a480f02e…`, INDEX `90e2844a…` = the live files' sha256);
  pre-round-5 copies from HEAD 3310b53 (base `5f34cceb…`); scope-part line diff: 16 hunks — done
- P2 round-4 finding VCS-r4-01 re-checked against the live text — done (FIXED)
- P3 every round-5 block in scope re-read subsection by subsection (§13.1, §13.2's T76-1, T110-2, T114-3, T121-3, §13.8's
  T110 and T114 rows, §14's three type lists, `PortResult`, `PortNote`, port items 2 and 4, §16's M3b row), each against
  its ruling, its home and its other ends; the round's rulings swept over the whole part — done
- P4 cross-checks (index = Part A, T-ids, volume test ids, references, retired terms, deferral, phone clauses, review
  ids, volume §8 prices, doc_checks, sizes, edges, the hand-offs addressed to scope) — done
- P5 report, result file, LANDED — done


**Verdict.** The round-4 finding VCS-r4-01 is FIXED (its merged sibling VRC4T-06 closes with it). Each of the ten
round-5 dispositions is applied as written: VAF-R4T-04, VAH-r4-03, VAH-r4-04, VAP-r4-01, VDC3-03, VKr4-02, VM-R4T-02,
VRC4T-05 and VCS-r4-01 as fixes, and VRC4T-06 merged. VM-R4T-02 takes R5-02's (S1) text whole, checked verbatim. The
three END lines under scope are written, two of them verbatim. Every second end lies in its other unit: V06's T-V6-73
regrowth clause and its §7 row, kernel's §3.2 (9), V08's §2.4 and §3.5 wording, and the model's §2.7 (6) and (7). The
repair seat made five judgment calls, and all five are sound.

**4 issues (0 blocker, 2 major, 2 minor)**, all owned by scope:
* **VCS-r5-01** (minor) — T76-1's new burial-need clause has no milestone that carries its reader.
* **VCS-r5-02** (minor) — T120-6 is the drawn-week timing that rendering handed to scope and nobody wrote.
* **VCS-r5-03** (major) — R5-02 re-ruled a hand carve across a raised way, and no bar runs it.
* **VCS-r5-04** (major) — the regeneration of a crossing station, new in §2.7 (6) this round, has no bar.

No nuance was lost. The unit grew by 681 words (+0.64 %). doc_checks exits 0, but the result is provisional: the
reference corpus is incomplete in this checkout.

## 1. Round-4 findings, re-checked on the live text

Line numbers are the live base after assemble-r5 (`2d84eac2…`) and each volume's live file.

| id | Part H | status | evidence |
|---|---|---|---|
| VCS-r4-01 (scope, minor) | FIX; closes VRC4T-06 | **FIXED** | T121-3 (l. 18675) reads "over §12.5's reference viewports (`resolution.p95`)". A set-wide search for "reference view" or "reference views" not followed by "port" finds no design-text site. The one hit is the rationale's Part F l. 2030, a verbatim archive of old reasoning (RENDERING-224), not design text. |

## 2. The round-5 blocks in scope

Scope's repair replaced five base subsections by count-asserted substitutions: §13.1, §13.2, §13.8, §14 and §16. No
other unit's block touched the scope part. The rationale, the judgment index and INDEX.md are unchanged. A line diff of
the scope part against HEAD 3310b53 gives 16 hunks, and every line outside them is verbatim. Each hunk was read in its
whole subsection.

### The ten dispositions

* **VAF-R4T-04** (§16 M3b, l. 20276) — **FIXED.** The cell reads "the `disaster` look's units (§10.2's
  `neighbourhoods`) … at M5 (W10) — at the village rungs volume 7's `villageDisasterUnits` and `villageUnitPlots`, V-M3
  (V07 §5.6 (8)) —". This agrees with V07 §5.6 (8) ("It lands at V-M3", V07 l. 3534), V07 W84 and V10 C4's "(V07's W84
  at the village rungs)". INDEX.md states no milestone for the look's units, so nothing there disagrees. V-M3 is a
  milestone §16 and INDEX already name.
* **VAH-r4-03** (§14 port item 2, l. 19797–19799) — **FIXED per R5-07 (d).** The refusals now split by the required
  keys, exactly as V08 §2.4 *Selection* has them (V08 l. 693–700; B3, B5).
* **VAH-r4-04** (§14 `field_fallback`, l. 19698) — **FIXED per R5-07 (d).** The comment adds "(V08 §3.5: its path absent
  or its value of no form its row reads; an empty list is a value, compared as read)". It reads consistently with R5-07
  (a): a field is a row's own path.
* **VAP-r4-01** (T114-3, l. 18558–18563; §13.8 l. 19354) — **FIXED.**
  * The regrowth clause is the required text.
  * It agrees with §2.7's support step (3) (l. 2554–2575: the release, and the `repairWall` first "in item 114's patch
    material … on a `dismantled` stretch the op's bend") and with V06 §3.19.2 (5) (V06 l. 2941–2949).
  * T-V6-11's second run, which it cites, is the both-spans topple (V06 l. 4134).
  * V06's END is written: T-V6-73's **the station's regrowth** clause, and V06 §7's T114 row "the station's regrowth on
    H-AQUA" (V06 l. 4117).
  * V06 §8's E3 carries `absorbWall`, repair, the `raisedWays` step and `repairRaised`, so §13.8's M6-E (with E3) cell
    schedules the clause where it can run.
* **VDC3-03** (§14 l. 19692 and l. 19815–19817) — **FIXED per R5-07 (d)** at both sites. The text agrees with §7.7
  item 12's key cell (l. 12159: `settlement:map:<mapId>` "kept for the document's life (a later readable `id` neither
  replaces it nor is checked against it)") and with V08 §2.4's `id` row (V08 l. 636).
* **VKr4-02** (§13.1, l. 638–644) — **FIXED.** The reverse fold is the required text, with "the reverse" written "its
  reverse" (the seat's judgment 3, which only clears doc_checks). I recomputed the numbers:
  * TOWN at 9 000: 4 km² × 9 000 ÷ 5 000 = 7.2 km², a 2 683 m frame. The arena is × 1.6 (§1.1's 30 % per side) =
    4 293 m.
  * The re-crossing at 400 is §1.1's HAMLET → VILLAGE band, which §4.11 names as a frame-growth trigger (l. 8506):
    2.275 ha × 400 ÷ 0.8 = 11.375 km² ≥ VILLAGE's `minKm2` 4.0, a 3 373 m frame. The law's arena, × 1.2, is 4 047 m,
    under 4 293 m, so the arena is kept and only (a) and (c) run.
  * At 1 575 the town law's 1.26 km² keeps the frame, and the arena grows by (b) to 3 373 × 1.6 = 5 397 m.
  * All three steps agree with kernel's §3.2 (9) text (l. 3671–3676: `Plat.frame` as (c) commits, its `marginShare`
    the kept arena's share) and with V07 §2.1's 1 425 / 1 575 band.
* **VM-R4T-02** (T110-2, l. 18478–18506) — **FIXED per R5-02, amended.**
  * T110-2's text from "later work across a raised way, held from its creation" to the end of (6) equals R5-02's (S1)
    character for character (whitespace normalised; a scripted comparison).
  * Every name it cites exists at its home:
    * §2.7's support step (3), (6) (a)–(d) and (7) (l. 2536–2627);
    * §7.1's `bend.wall.held`, `bend.wall.raisedCrossing`, and `bend.raised.underSpan` with `bend.raised.around` as one
      row with two keys (l. 10630–10632);
    * `W_RAISED_CROSSING`;
    * S5a *Trace* (2)'s "pins no gate there" (l. 5856);
    * S5b's count "on ground part 0" (l. 5911, 5918);
    * §4.8 *Gates* (l. 7655).
  * The superseded R4-09 clauses are gone: the crossing at a gate on a later trace, the station on the trace, "after
    generation's last support run", "through one station on the deck", and "unchanged but the crossing station's
    support".
* **VRC4T-05** (§14 l. 19488, 19621, 19754) — **FIXED.** `Box` follows `LodBand` in all three lists, as §8.1 declares it
  in `@plat/model` (l. 12380–12384).
* **VRC4T-06** — MERGED into VCS-r4-01, and closed with it (above).
* **VCS-r4-01** — FIXED (§1 above).

### The three END lines

* **END of VEW-r4-01, VEW-r4-03, VM-R4T-01 (with VPC-R4-01), VDC4-03 and VDC4-04** — these sit inside T110-2's (S1)
  text, written once with VM-R4T-02:
  * (3)'s quay and way-corridor fixtures;
  * (4)'s one-span viaduct, the contraction beside an older station, and the hand `delete` with `bend.wall.held`;
  * (5)'s wide road with `bend.raised.around`.

  Each agrees with §7.1's rows. V06's T-V6-47 runs (4)'s and (5)'s epoch clauses, the contraction "within p ÷ 2 of its
  CITY ring's crossing station" among them (V06 l. 4170). The T110 runs sentence (l. 18515) and the evolution row
  (l. 18762) hold.
* **END of VV34-r4-01** — T110-2's frame-growth clause (l. 18469–18470) adds "every station of the old deck at its key,
  position and ring after the growth (§2.7's support step (7))", verbatim plus its home's citation (judgment 5). §2.7
  (7) (l. 2623–2627) states it.
* **END of VAT4-r4-01** — T76-1's fixture list (l. 18242–18247) adds R5-03's text verbatim.
  * The seat conformed T76-1's trigger parenthesis to §4.11 *The clock* (4)'s amended rule (judgment 2). Checked: it now
    reads "it rides, at that epoch's first week, the first epoch its absorb folds where the absorb's week is after the
    last epoch's (one folded at the absorb's week where no other is), else the first epoch a later absorb folds, held
    meanwhile in `DossierBinding.lateCalamities`". That is §4.11 (4)'s rule (l. 8475–8488), with §7.7's field
    (l. 11825) and §7.1's `dossierFacts` (l. 10357).
  * The new clause's burial-need assertion has no milestone that carries its reader: VCS-r5-01.

### The judgment calls

All five are sound:
1. §13.8's T110 row names (4)'s contraction ("circuits, contraction, stage growth and route re-solve"). R5-02's (S1) puts
   an epoch contraction into (4), T-V6-47 runs it on volume 6's engine, and the row would otherwise omit a clause it
   schedules.
2. T76-1's trigger parenthesis — above.
3. "its reverse", and "else the first epoch a later absorb folds": wording only, meaning kept.
4. T76-1's list punctuation, so that the END's "and one carried …" closes the list.
5. The frame-growth END's citation of (7).

### The ruling sweep over the whole scope part (R5-01 (2))

I searched 27 terms of R5-02, R5-03 and R5-07 over §0–§1, §13–§17, the index, Appendix A and INDEX.md: the crossing
station, raised gate, support step, last support run, re-site, palisade, beneath, the bend keys, `W_RAISED_CROSSING`,
late, `lateCalamities`, the last epoch, fell back, teaching file, the three refusal codes, `field_fallback`, leaves empty,
`settlement:map` and recognise. 52 hits.

Outside T110-2, T114-3 and T76-1, each hit agrees with the rulings or is another subject:
* §0's item-110 row and §16's M3a row state no crossing rule.
* The J-A110 index rows state none either, and the rationale states none.
* T114-3's crossing and landfall clauses agree with §2.7 (3).
* T125-1's `field_fallback` is a creation.
* `HostContext.line`'s comment is unchanged and agrees with V08 §2.4.
* The palisade and re-site hits are other subjects.

The one-page summary's "with a gate wherever a main road crosses it" (l. 40) agrees with §4.8 *Gates*: a deck passing
over a stretch laid after its raised way "is no crossing".

R5-04, R5-08 and R5-09 have no restatement in scope:
* T123-4's "each repaired element drawn in item 114's patch material" stays true, because an element a restoring re-cut
  mints was never damaged.
* T123-7 pins the plan record, not the drawing.
* No scope text names the working layer or the crisis why-line forms.

## 3. The hand-offs addressed to scope (round 5's repair files)

* **rendering** asks for T120-6's drawn-week clause. It is VRC4T-04's required change at scope's end, and no END line
  routes it. **Open: VCS-r5-02.**
* **determinism** reports that no bar runs a hand carve across a standing raised way. **Open: VCS-r5-03.**
* **V08** says its item-122 test-side copies are "each in §13.2's frozen manifest". §13.2 lists frozen *files* only (its
  `manifest.json` has one row per file, l. 18307–18321). It has never listed a test-side mutation: T-V8-36's and the
  `@pop×k` derivatives are registered as V12 §1b's fixture ids (V12 l. 633). The new copies follow the same rule, and
  R5-10's sweep reads the same ("as T-V8-36's and the force fixtures'"). No scope text to change.
* **kernel** and **model**: none for scope. V01's note confirms that §13.8's "each volume's clause at the later of its
  step and M5" covers T-V1-59.

## 4. Cross-checks on the whole part

* **Ids.**
  * Base T-ids: 341 defined in §13. Every one cited in scope is defined. T101-6's second hit is a citation.
  * Volume test ids: 151 cited, all defined. T-V6-11 is new, cited by T114-3's regrowth clause.
  * Judgment ids: the index equals Part A, 805 rows in the same order, 0 duplicates.
* **References.** assemble-r5's resolver reports 0 broken references set-wide and 85 ambiguous in form. The ambiguous
  ones in the scope part's lines (l. 300, 20184, 20186) are unchanged lines, so their earlier verdicts stand. Every
  reference new in scope this round was opened and states what it is cited for:
  * §2.7's support step (3), (4), (6) (a)–(d) and (7); §3.2 (9); §4.11 *The clock* (4); §7.7 item 12;
  * V06 §3.19.2 (5); V07 §5.6 (8); V08 §2.4 and §3.5; §12.5.
* **Retired terms** (the canon's patterns over the part, pre-round 5 → live):
  * G-lot 41 → 41, G-unitinput 3 → 3 and G-M6U 1 → 1, all judged in earlier rounds.
  * G-refview 0 → 0, and the plural "reference views" 1 → 0.
* **Deferral, review ids and phone clauses.** The 76 added lines hold none. Their four "later" are temporal: "a later
  absorb", "later work", twice "a later readable `id`".
* **Volume build plans and §16.**
  * Every volume's §8 person-week figures and table cells are unchanged from HEAD 3310b53 (a scripted comparison), so
    verify-scope-r2t's sums stand.
  * The §8 text changes in V01, V03, V04, V05, V07, V10 and V11 move no milestone §16 states. Most are R5-05's E6 notes
    on drawn-week clauses: V01 W11, V03 P4, V05 P3, V07 V-M3. Of the rest, V04's U5 is unchanged in content and V11 says
    where `clearWidthM` and `squareDeg` enter.
  * INDEX §5 risk 2 carries the general rule ("the dependent test clauses move to the first exit after the provider
    (each named in its volume)").
* **doc_checks.py** `--sections "0,1,1.1,13,13.1,13.2,13.4,13.8,14,15,16,17,Delegated decisions,Judgment calls,Staged,Appendix A"`:
  * **exit 0** — hits/unreviewed: C1 5/0, C2 1/0, C3 450/0, C4 2/0, S1 0/0, S2 287/0.
  * C3's two new hits include assemble-r5's reviewed row "3 on the city and".
  * **WARNING printed: reference corpus INCOMPLETE (captures, research/patreon, research/devlogs, research/ftg-docs,
    research/external missing) — NOT authoritative; provisional.**
* **Sizes (principle (9); whitespace words).**
  * Scope part: 105 880 → 106 561 (+681, +0.64 %): §13.1 +75, §13.2 +486, §13.8 +9, §14 +96, §16 +15, as the repair
    reports.
  * Against the archive: 98 458 → 106 561 (+8.2 %). Items 111–126's bars, rows and decisions hold it: irreducible content
    added after the archive, not a defect.
  * Nothing was cut but R4-09's superseded T110-2 clauses, replaced by R5-02's (S1). I checked R5-02's equivalence list
    against the live T110-2:
    * zero junctions (head);
    * no support in water ((1); the generation clause);
    * every clear span and pier within its bound (the generation clause; (3)'s clear-span-bound viaduct; the raised way
      held from S4's commit, so its spans are as ruled there);
    * the raised way unchanged by later work (the lead fixture, (4), (6));
    * 0 way corridors over a support, ramp, stair, foot or `vault` span ((5), (6));
    * `W_RAISED_CROSSING` ((1));
    * nothing waiting and no course dropped (§2.7 (6)'s sentence cites T110-2, whose bars hold every raised way
      unchanged; T-V6-47's "no trace waiting").

    No NUANCE-LOST. No elegance ruling was routed to scope this round, and the more-than-half audit does not apply.
* **Edges (principle (11)).** Each new clause brings its edge with a defined outcome and a bar:
  * the reverse fold, where only (a) and (c) run;
  * a second absorb in the last epoch's own week, and a late non-calamity change;
  * the station's regrowth through `repairWall`'s bend, and its undo;
  * a later ring, circuit, contraction, hand wall, hand delete, wide road and locked Re-derive meeting a held raised way;
  * the two refusals by required keys;
  * a key minted at creation.

  Two edges the round newly defines at its homes have no bar (VCS-r5-03, VCS-r5-04). The edges.json entries outside the
  touched text keep their earlier verdicts.

## 5. Issues

**VCS-r5-01** (scope · minor · COHESION). *T76-1's new burial-need clause has no milestone that carries its reader.*
* T76-1's second-absorb fixture (the END of VAT4-r4-01, R5-03's text; l. 18243–18245) asserts the held calamity's "deaths
  in that epoch's burial need".
* The burial need is V06 §3.18.2 (3)'s catacomb need inside `under.extend` (V06 W48, l. 331; the `calamityHistory` row,
  l. 389). It lands with V06's E8 ("the calamity deaths in the need", T-V6-69; V06 §8), which §16 places "after V04's U5".
* T76-1's cadence clauses run from M3a on the port's `EpochInputs` (l. 18234). §13.8's row (l. 19340) names a later
  milestone only for the coarsened catch-up fixture: "M3a (T76-1's coarsened catch-up fixture with M6-E)".
* INDEX §5 risk 2 moves such a clause to the first exit after its provider "each named in its volume", and here it is
  not named.

Nothing built changes, so this is minor, in R5-05's scheduling class.

*Required change:*
* In §13.2's T76-1, "its deaths in that epoch's burial need;" → "its deaths in that epoch's burial need (that clause from
  M6-E's E8, V06 §3.18.2 (3));".
* In §13.8's row "T75-1 – T75-5, T76-1's cadence clauses, T81-2's absorb clause, T85-3", the timing cell "M3a (T76-1's
  coarsened catch-up fixture with M6-E)" → "M3a (T76-1's coarsened catch-up fixture with M6-E; its second-absorb
  fixture's burial-need clause with M6-E's E8)".

**VCS-r5-02** (scope · minor · HANDOFF-OPEN). *T120-6 lacks the drawn-week re-evaluation timing that VRC4T-04 required.*
* VRC4T-04 (rendering, FIX per R5-05 (b)–(c)) required "R12-35's row and T120-6 add that timing": the chips re-evaluated
  within ≈ 100 ms of a drawn week's frame being drawn.
* Rendering wrote R12-35 (l. 17527) and T-ER-25 (l. 14753). It handed T120-6 to scope (repair-r5-rendering, HAND-OFFS),
  because §13.2 is scope's text and Part H gives no END line for it. R5-05's sweep lists T120-6.
* T120-6 (l. 18662–18664) still times only "suggestions within ≈ 50 ms of a key and a chip's glow within ≈ 100 ms of its
  click". §13.8's T120-6 row (l. 19373) reads "M5" and names no later exit for a drawn-week clause (R5-05 (c): the later
  of its milestone and V06's E6).
* V12's statistic `time.findGlow` (V12 l. 1172, and T-V12-52's text at l. 2642), which R12-35 cites as its measure,
  measures only a chip's click.

R12-35 and T-ER-25 hold and run the budget, so nothing built changes: minor.

*Required change:*
* In §13.2's T120-6, after "a chip's glow within ≈ 100 ms of its click" add "and, at a drawn week whose frame is not the
  head, the chips re-evaluated within ≈ 100 ms of the frame being drawn, the frame never waiting (that clause from the
  later of M5 and V06's E6, V06 §3.15.2's frames)".
* In §13.8's T120-6 row, "M5" → "M5 (the drawn-week clause at the later of M5 and V06's E6)".
* V12's end, for an END line: V12 §3.15.10's `time.findSuggest`, `time.findGlow` row, "a chip's click to its matches'
  glow drawn" adds "and a scrubbed week's frame drawn to its matches' glow drawn (that clause at the later of M5 and V06's
  E6)", and T-V12-52's `time.findGlow` text the same.

**VCS-r5-03** (scope · major · EDGE-UNTESTED). *No bar runs a hand carve across a standing raised way, which R5-02
re-ruled this round.*
* The rule, at its three homes (§2.7's support step (6) (b), l. 2596–2599; §4.11's carve, l. 8239–8243; §7.1's row,
  l. 10632):
  * a hand carve's channel passes beneath a raised way only where its crossing of the under-deck strip meets no support,
    ramp, stair, foot or `vault` span;
  * the crossing is first moved along the deck to the nearest that passes (`bend.raised.underSpan`);
  * where none does, the channel stops at the strip's edges, ending against the ground as against a berm (§7.1:
    `bend.raised.around`'s branch).
* No bar runs either branch:
  * T110-2 (5) (l. 18500–18504) runs hand *roads* only, and T110-2 (1) and (6) run generation moats.
  * §13.2's carve bar ("a canal carved across a wall", l. 17866) and T-V9-52 name no raised way.
  * Determinism's round-5 HAND-OFF records the gap for scope or V09.
* A build that carves through a support, or that never stops the channel, passes every bar. That is an untested edge
  with a defined outcome on an editing path: MAJOR (principle (11); R5-01's grading).

*Required change:*
* In §13.2's T110-2 (5), "a hand road drawn across one and a hand road wider than every `open` span's clear width drawn
  across one" → "a hand road drawn across one, a hand road wider than every `open` span's clear width drawn across one, a
  hand carve drawn across a standing aqueduct whose line meets one of its supports and a hand carve drawn across a raised
  way all of whose spans are `vault` spans".
* After "(`bend.raised.underSpan`; the wide road routed round the raised way, `bend.raised.around`)" add "; the first
  carve's channel moved along the deck to pass beneath at the nearest crossing that meets no support, ramp, stair, foot
  or `vault` span (`bend.raised.underSpan`), the second's stopped at the under-deck strip's edges, ending against the
  ground as against a berm (`bend.raised.around`), each raised way unchanged (§4.11's carve; §2.7's support step (6)
  (b))".

**VCS-r5-04** (scope · major · EDGE-UNTESTED). *The regeneration of a held raised way's crossing station, new in §2.7
(6) this round, has no bar.*
* The model's R5-02 text (l. 2619–2622) defines a regeneration under a locked, pinned or declared raised way that was
  created across a standing wall:
  * the re-derived stretches are laid after it;
  * "a re-derived stretch on a crossing station's line takes the station into the line as its support again, so an
    unchanged regeneration reproduces it";
  * "a station no stretch lies under any more stands as a pier (its `ring` by (4)), its `supports` entry then carrying
    its own `state`".
* The pre-round-5 text had no such sentence.
* The case is reached on a normal path. A locked generated aqueduct across a ring, or any hand aqueduct drawn across a
  wall (which takes a crossing station by (3)), followed by Regenerate or New random re-derives the ring (§7.2).
* No bar runs either branch:
  * T110-2 (6) re-derives only a fixture with no crossing station: stage 2's ring was laid after the S4 viaduct.
  * T110-2 (4), T114-3, T-V6-11, T-V6-47, T-V6-73, T-V7-48 and T-V9-52 run crossing stations without a regeneration.
* A build that drops the station, re-sites it, or leaves it reading the `condition` of a stretch that no longer exists
  passes every bar: MAJOR (principle (11); R5-01's grading).

*Required change:* in §13.2's T110-2, after (6)'s "… 0 S5b or S5c way corridors over a support ring, ramp, stair or
foot;" add:

> (7) the generation clause's CITY c15 fixture with its masonry aqueduct locked, regenerated — the re-derived ring
> taking the aqueduct's crossing station into its line as its support again, the station, its stretch and its wall
> opening as before — and then given New random, its seed searched so that the new ring no longer lies under that
> station — the station standing as a pier (its `ring` by §2.7's support step (4), its `supports` entry carrying its own
> `state`), the new ring running on beneath the deck where it meets it with no crossing station taken and no gate or
> opening made, every station, key and span of the aqueduct unchanged (§2.7's support step (6));
