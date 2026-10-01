# Verify — coherence pass, round 6: volumes V11 (content) and V12 (calibration) after repair round 6

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-vol-V11-V12-r6t; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V11-V12-r6t`, 2026-10-01, cloud checkout; scratch `scratchpad/coherence/v1112r6/`)
- P0 resume check (no LANDED line, no output): fresh start — done
- P1 inputs read (brief whole with its ROUND-6 and ORCHESTRATION NOTES; r5t report and result; adjudication-r6's intro,
  Summary, Part A, R6-01, R6-02 (lead, behaviour changes, (M1)–(M11), both tables, the V11 Ends, the sweep), R6-04, R6-07,
  R6-11, Part H · V11, V12; the round-6 work items VAP-r5-01, VAP-r5-03, VRC5T-03, VM-R5T-01, VV1112-r5-01;
  repair-r6-V11 and -V12 headers; assemble-r6) — done
- P2 live text against assemble-r6 (sha256 V11 0e2767c1…, V12 006b8ef1…, base f39f1c30…, each equal to assemble-r6's
  "after"; the pre-round text from b3f83a0d, V11 b1445a5f…, V12 1e305ebe…, base 2d84eac2…, each equal to its "before") — done
- P3 round-5 finding VV1112-r5-01, VAP-r5-03 and every END line under V11 and V12 re-checked at their homes, with the
  second end of each — done (all fixed or written as ruled)
- P4 every hunk the round-6 blocks changed in V11 (9) and V12 (18), word-diffed against the pre-round text and read whole
  with the texts it cites; the landed r6t results read so as not to repeat their issues — done (3 new issues)
- P5 references, ids, deferral, review ids, R6-02 / R6-03 residue sweeps, doc_checks — done
- P6 this report, the result file, LANDED — done

## Outcome

**Not clean: 3 issues — 0 blocker, 1 major, 2 minor** (owners V12 1, V11 2).

This lane's round-5 finding is fixed as ruled. VV1112-r5-01 (R6-11): T-V12-57's second planted case is now a gap re-drawn
from the host's clock at a year-position change, and the lawful carried spell passes. VAP-r5-03, the other V12 issue, is
fixed in V12 §2.13's suites column, and V06's E1 line agrees. Every END line under V11 and V12 is written as given:
- R6-02's (V11-1) and (V11-2);
- R6-07's VRC5T-03 texts: V11's two, V12's four;
- R6-04's VAP-r5-01 texts at V12, all four.

Their primaries agree with them: T120-6 and §13.8's row, T123-7, and §2.7's two tables.

The new issues come from texts this round wrote:
- **VV1112-r6-01 (major).** T120-6 and R12-35 bar "the frame never waiting" for the chips' drawn-week re-evaluation, and
  R12-35 names V12's `time.findGlow` as the measure. V12's statistic, as rewritten, times only the frame-to-glow
  interval. A build that runs the re-evaluation on the scrub's path therefore passes every bar.
- **VV1112-r6-02 (minor).** The crossing table now runs at VS3 (V07 §3.5a (4)), where the palisade is bent clear of the
  under-deck strip. Registry row 80 is rewritten to name the table's readers, but lists only S5a and S7. VS5, VS6 and S10
  at the village rungs (V07 §3.5a (5)) are also missing from the same cell.
- **VV1112-r6-03 (minor).** EI-V11-EDGE-5 gains two cited outcomes: the disaster look's level and the entry week. Its
  test cell names no test that runs them.

| measure | V11 | V12 |
|---|---|---|
| words (`wc -w`), archive → pre-round → live | 103 331 → 110 345 → 110 391 (+6.8 % on the archive) | 75 054 → 83 448 → 83 697 (+11.5 % on the archive) |
| this round's change | +46 (85 added, 39 removed): R6-02's two V11 ends; W50's third reader list; the way-and-channel table's rows at the crossing cells; R6-07's condition at l. 3828, §3.25.10's lead and *Off*, EI-V11-EDGE-5; J-V11.47's one-term fix | +249 (268 added, 17 removed): R6-04's four texts and two sweep sites; R6-07's six texts and the sweep's (§0, §3.7.6, T-V12-37, §3.12, §1b); R6-11's two; §3.15.4's regrowth clause dropped |
| repair blocks applied (assemble-r6) | 6 of 6 (### 1b, ### 3.1, ### 3.24, ### 3.25, ### 3.26, ## 9) | 9 of 9 (## 0, ## 1b, §2.13, §3.4, §3.7, §3.12, §3.15, §7.1, §8.2) |
| word-diff hunks read (whole, with counterparts) | 9 | 18 |
| own ids (table-defined T-, J-, EI-, M-, X- rows) | 209, no duplicate; set unchanged | 185, no duplicate; set unchanged |
| round-5 findings closed | — | VV1112-r5-01; VAP-r5-03 |
| issues this round | VV1112-r6-02, -03 | VV1112-r6-01 |

Neither volume shrinks this round: both grow by ruled content, so no whole-volume nuance audit was due. Each cut was read
against what it cut:
- **V11.** The dropped "at S5a and S7 a later wall's strips and berm stop at its edges … (6) (d)" is the superseded rule.
  R6-02's behaviour change 4 runs the setback, glacis and berm on beneath the deck. "Laid after" became "meeting", as the
  table now holds in either order. J-V11.47 loses only the word "crossing"; the table it names is unchanged.
- **V12.** "Regrowth clauses" went with the crossing station; T114-3 and §13.8 hold no regrowth clause now (searched over
  the whole set).

No NUANCE-LOST.

## Round-5 findings and V12's other routed issue — status on the live text

| id | owner | grade (Part H) | disposition | status | where, as checked |
|---|---|---|---|---|---|
| VV1112-r5-01 | V12 | major | FIX (R6-11) | **fixed** | T-V12-57 (l. 3181): "`weather.replay` fails a planted spell drawn from the host's clock and one whose gap is re-drawn from the host's clock at a year-position change instead of kept (§6.1 *The weather stream*: the drawn E kept), on T124-9's year-position fixture — a spell in force at that change carried into the week with no live kind, its kind and length fixed (§6.1), passing". This is the required text. Base §6.1 (l. 9628–9631) still reads "the drawn E kept … A spell's kind and length are fixed once it starts". The planted re-draw differs between two runs, so the replay statistic catches it. The lawful carry passes. §3.15.14's T124-9 bullet and §3.4.2's `weather.*` row state no planted case and stand |
| VAP-r5-03 | V12 | minor | FIX (R6-11) | **fixed** | §2.13's `item110.*` row (l. 923): "H-100, H-AQUA without its two raised-way edits (the CITY viaduct row's `editTable` and the declared elevated road), H-TERRACE, H-DECK (V06, T-V6-65)". The second end is V06 §8's E1 line (V06 l. 4275): "(H-100, H-AQUA without its two raised-way edits, H-TERRACE, H-DECK; T-V6-65)". T-V6-65 (V06 l. 4188) runs the same suites. R3-26's union rule holds |

**END lines naming V11 or V12 this round:**

| END | where it landed | status |
|---|---|---|
| R6-02 (V11-1), VM-R5T-01 → V11 §3.24.2's readers | l. 3908–3909 | **written** as given: "(`stripMarginM`, §4.6; a wall meeting it by §2.7's crossing table, its gates and towers kept out of it)" |
| R6-02 (V11-2) → registry row 80's reader cell | l. 1006 | **written** as given: "S5a and S7 (a wall meeting a raised way's under-deck strip at `structure.stripMarginM`, §2.7's crossing table, §4.4 S5a, §4.8; …". The table and its four outcomes exist at base l. 2591 ff.; see VV1112-r6-02 for the cell's reader list |
| R6-07, VRC5T-03 → V11 l. 3828 and l. 4649 | l. 3828, l. 4650 | **written**: "a building never decayed and under no disaster look draws its plan unchanged" and "… never decayed (level 0) and under no disaster look …". They agree with §6.3 *Plan damage* (base l. 10059–10060), §8.6 and T123-7 (base l. 18829–18831) |
| R6-07, VRC5T-03 → V12 l. 933, l. 2761–2762, §2.13's `entityScope` comment, §3.7.8 (5)'s pin text | l. 934, l. 2762–2764, l. 904–906, l. 1748 | **written** as given and as R6-07 words the two adds. The pin's scope ("… and over which no disaster look stands at the drawn week (§10.2 (f))") agrees with T123-7 and with the registering clauses: V03 T-V3-39 (g) "under no disaster look"; V04 T-V4-82 (g) "the never-decayed control, under no disaster look". §10.2 (f) (base l. 15813–15818) defines "stands over" |
| R6-04, VAP-r5-01 → V12's catalogue row, §3.15.10's bullet, T-V12-52's text and cell | l. 1173, l. 2643, l. 3176 | **written** as VAP-r5-01's four texts. They agree with T120-6 (base l. 18771–18775) and §13.8's row (l. 19485: "M5 (its drawn-week clause at the later of M5 and V06's E6)") on the ≈ 100 ms timing and its milestone. T120-6's and R12-35's further clause, "the frame never waiting", is not measured: **VV1112-r6-01** |

## Round-6 changes in scope — new problems

Every hunk of the two word diffs (b3f83a0d → live) was read whole, together with the texts it cites.

**V11 (6 blocks, 9 hunks).**
* **W50's consumer cell (### 1b)** adds "§2.7's crossing table at S5a and S7 (`stripMarginM`)". This is accurate for S5a
  (the gate pins moved clear) and S7 (the towers and gates). It is incomplete for VS3: **VV1112-r6-02**.
* **Row 80 (### 3.1) and §3.24.2's readers (### 3.24)** carry the END texts above. The crossing-cell reader list now cites
  "§2.7's way-and-channel table, rows (a)–(b)". Both rows exist (base l. 2582–2583), and the list's members — a route, a
  growth proposal, V01's seeds, fans and lanes, V07's trackers, S7's quays, intervallum and castle paths, a hand way — are
  exactly row (a)'s and row (b)'s.

  Round-6 note (6) (b):
  - (i) V11 reads no individual cell. It cites the tables whole.
  - (ii) V11 restates neither table. It keeps no crossing station, raised gate, wall opening or held stretch (searched).
  - (iii) Each citation names a table, row or step that exists.

  `maxClearSpanM` 30 m (masonry) agrees with R6-02's behaviour-change-4 figure.
* **§2.10's `stripMarginM` exception (unchanged, re-read under R6-02).** An edit that widens the strip over a standing
  generated tower or gate leaves it in place. The pattern row's general rule keeps it and lists it: "a standing GENERATED
  thing whose draw or admission flips is KEPT and listed with an offer". That is a defined outcome, so nothing is raised.
* **§3.25.10's lead (### 3.25)** — "compared from its entry week into the plan (V03 §5.6 (2) (a)–(b)), but for §2.6 step 7's
  roofless case". This is §6.3 *Plan damage*'s one comparison (base l. 10052–10057), cited. V03 §5.6 (2) (b) carries the
  restoring re-cut's entry week (V03 l. 2700–2704). No new issue.
* **EI-V11-EDGE-5 (### 3.26)** — two cited outcomes are added: the disaster look's level, by V11 §3.25.9 and §10.2 (d); and
  the entry week. Each agrees with its home, but the row's test cell runs neither: **VV1112-r6-03**.
* **J-V11.47 (## 9)** — "a street-scale table keyed by way class (`ways.crossing`)". This is principle (2): "crossing table"
  now names §2.7's raised-way × wall table only. The decision and its reason are unchanged.

**V12 (9 blocks, 18 hunks).**
* **§0, §3.7.6, §3.7.8 (5)–(6), T-V12-37, §3.12's failure row, §3.15.13, §2.13 (R6-07 and its sweep).** Every "never
  decayed ⇒ unchanged" statement now carries "and under no disaster look" (searched: "never decayed", "never-decayed",
  "never held", "level 0"). §3.7.6's switch-on note ("… or that a disaster look stands over at the drawn week
  (`item123.damage` holding every other)") partitions the buildings as the pin's scope does.

  T-V12-56's "the never-decayed control" and J-V12.102's reason stand:
  - the control house lies outside V03's struck district;
  - J-V12.102 is a decision record.

  No new issue.
* **§1b's two wiring rows.** Item 120's row names the frame producer (V06 §3.15.2). Item 123's row names the selection's
  producer (§10.2 (f)), which is principle (7) wiring for the pin's new input. No new issue.
* **§2.13's `item110.*` row and §3.15.4 (R6-11 and R6-02's sweep)** — VAP-r5-03, as above. "T114-3's crossing clause on
  H-AQUA" agrees with T114-3 (base l. 18666–18675, "on a neglected, poor CITY ring over 20 epochs with a masonry aqueduct
  over it … (§2.7's crossing table, *unchanged meeting*)") and with §13.8's T114 row (l. 19466). No new issue.
* **§3.4.2's row, §3.15.10's bullet, T-V12-52 and its cell, §8.2's W7 cell (R6-04 and its sweep).** The ≈ 100 ms timing
  and the milestone clause agree across V12, T120-6, §13.8 and R12-35. T120-6's and R12-35's "the frame never waiting" is
  measured nowhere: **VV1112-r6-01**.
* **T-V12-57 (R6-11)** — VV1112-r5-01, as above.

**R6-02 and R6-03 residue (round-6 note (6) (b)–(c)).** Searched V11 and V12 for these terms and found none of them in
either volume:
- "crossing station", "raised gate", "wall opening", "held stretch", "regrowth clause";
- "strips and berm", "stop at its edges";
- "support step (6) (a)", "(6) (b)", "(6) (d)";
- `lateCalamities`, "late calamit", "held in the binding".

V11's remaining "support step" citations are (3) and (7) and the step itself, all of which R6-02 keeps. V12's one is the
span-rule line. V11 §3.25.9 reads only a "carried calamity" (l. 4576), which agrees with R6-03.

The R6-02 behaviour changes reach V12's raised-way bars (`T110b.*`):
- *down before the wall* now constrains where a viaduct or an elevated road may stand.
- `T110b.viaduct`'s registration check runs the route solver, so it applies the new lattice exclusion and refuses a site
  where the deck could not cross.
- `T110b.elevated.*` are trend bars that stay measurable when some seeds lose the link.

So the text builds one way. By round-6 note (6) (d) nothing is raised.

**The landed r6t results** (agree-layers, agree-time, agree-tools, determinism, edges-life, edges-world, model, pipeline,
rendering, scope, vol-V05-V06, vol-V09-V10) were read for any issue touching V11 or V12:
- VM-R6T-04 (model) reads V11's `slideMaxFactor` comment as the right one;
- VCS-r6-05 (scope) cites V12 l. 633's fixture id;
- edges-life and rendering found R6-04's three statements in agreement on the timing. VV1112-r6-01 concerns the clause
  they did not test.

None is repeated here.

## Issues

**VV1112-r6-01 — major — CONFLICT — owner V12.** The drawn-week clause of Find's timing has three statements:
- §12.5 (base l. 17232–17234): "each change of the drawn week re-evaluates the chips' listing … off the scrub's path,
  within ≈ 100 ms of the frame being drawn …, the frame never waiting for it".
- T120-6, as rewritten this round (l. 18773–18775): "… the chips re-evaluated within ≈ 100 ms of that frame being drawn,
  the frame never waiting for them".
- R12-35 (l. 17582), which names its measure as "V12 §3.15.10's `time.findSuggest` and `time.findGlow` (the glow from a
  chip's click, and from a scrubbed week's frame being drawn)" with the bar "… ≤ 100 ms (T120-6; T-ER-25), the frame never
  waiting for Find".

V12 rewrote its statistic this round, and T-V12-52 takes T120-6. Even so, the statistic times only the interval from a
drawn week's frame to its chips' re-evaluated glow:
- §3.4.2's row, l. 1173;
- §3.15.10's bullet, l. 2643;
- T-V12-52, l. 3176, whose only planted case is "a planted re-evaluation drawn more than 100 ms after a scrubbed week's
  frame".

**Why a wrong build passes.** Suppose a build re-evaluates the chips on the scrub's path, so the frame waits for them.
The glow is then drawn with the frame, `time.findGlow` reads about 0 ms, and it passes. No other bar catches it:
- V06 §6.4's frame budgets (V06 l. 3900–3903) are stated and measured without Find. A cached METROPOLIS frame of
  ≤ 120 ms absorbs a short re-evaluation, and the ≤ 800 ms image path absorbs a long one.
- V09 §6.4's Find row (V09 l. 4314–4317) defers to "V12's T-V12-52 reports T120-6".

**Grade.** R6-04 requires that "neither states a clause the other lacks", and R12-35's register row names a measurement
that V12's statistic, as specified, never takes. Two builders of the statistic build different code: R6-01's grade for
the same group (VAP-r2-11's), so MAJOR. A wrong build also passes every bar.

*Required change* (V12, three statements):
- §3.4.2's catalogue row `time.findSuggest`, `time.findGlow` (l. 1173): after "drawn to its chips' re-evaluated glow drawn
  (from the later of M5 and V06's E6)" add "; with the re-evaluation delayed test-side by 2 s, that frame still drawn within
  V06 §6.4's frame budget at the METROPOLIS cap and its glow after it — the frame never waiting for the re-evaluation
  (§12.5; T120-6)".
- §3.15.10's T120-6 bullet (l. 2643): "— the latter from the later of M5 and V06's E6)" → "— the latter from the later of
  M5 and V06's E6, that frame never waiting for the re-evaluation)".
- T-V12-52 (l. 3176): after "fails `time.findGlow`'s" add ", and, with the chips' re-evaluation delayed test-side by 2 s,
  a scrubbed frame drawn past V06 §6.4's budget (a re-evaluation run on the scrub's path) fails its frame clause".

The cell and the rest of the row stand.

**VV1112-r6-02 — minor — WIRING — owner V11.** Registry row 80 is "the one list of each table's readers" (V11 §3.1
*Readers*, l. 898; E-34; T-V11-1 (b): "0 unlisted stage readers"). This round rewrote its reader cell (l. 1006) and W50's
consumer cell (l. 208) to name the crossing table's readers of `structure.stripMarginM` as "S5a and S7" only.

The crossing table also runs at VS3. V07 §3.5a (4) (V07 l. 1604–1610) was rewritten this round to "A palisade meets a
raised way by §2.7's crossing table". Under *beneath* (base l. 2628–2631), VS3's trace is "a stretch laid by neither"
pull nor cost field. It "is bent locally, between its nearest points clear of the raised way's under-deck strip", which
VS3 computes at `stripMarginM`. Before this round VS3 never bent clear of the strip (pre-round V07 l. 1604–1610), so this
read is new.

The same cell also omits the village readers V07 §3.5a (5) names (V07 l. 1616–1621): "VS5, VS6 and S10 — no house under
the arches. The under-deck strip — … widened each side by `raisedWays.structure.stripMarginM` (V11 §3.24.2)". V07's
settings row says the same: "read, never copied" (V07 l. 609). Row 80 lists VS4 only of V07's stages.

Each registering seat writes its stage into the cell (J-V11.85), and T-V11-1 (b) fails an unlisted reader it records. So
nothing built changes. It is a list omitting readers the rule names: MINOR.

*Required change:*
- Row 80's reader cell (l. 1006): after "VS4 (V07's trackers crossing an under-deck strip by the same rule and cells, V07
  §3.5a (3))," add " VS3 (the palisade meeting a raised way by §2.7's crossing table, its line bent clear of the
  under-deck strip at `structure.stripMarginM`, V07 §3.5a (4)), VS5, VS6 and S10 at the village rungs (no toft yard part
  or building in the under-deck strip at `structure.stripMarginM`, V07 §3.5a (5)),".
- W50's consumer cell (l. 208): "§2.7's crossing table at S5a and S7 (`stripMarginM`)" → "§2.7's crossing table at S5a,
  S7 and VS3, V07 §3.5a (5)'s VS5, VS6 and S10 (`stripMarginM`)".

**VV1112-r6-03 — minor — EDGE-UNTESTED — owner V11.** This round's sweep (R6-07) added two outcomes to EI-V11-EDGE-5
(l. 4784):
- "a building under a disaster look drawn at the look's level (V11 §3.25.9)", at decay level 0;
- "each from its entry week into the plan (V03 §5.6 (2) (a)–(b))", at level 1.

Its test cell still reads "T-V11-47; T-V11-45 (s), (u)". Neither test runs either case:
- T-V11-47 is a compile bar over the two tables.
- T-V11-45 (u) (l. 5044) lists "the damage tables' edges (levels 0 and 1, a material with no row, a range edited out of
  its shares)" under the bar "every stated outcome". No disaster look and no late-entering element is among its cases.

The outcomes are V03's and §10.2's, run by T-V3-40 (b) (V03 l. 2907: "a building under the look and its own decay draws
the higher level on every element") and T-V3-39 (c) (an element a re-cut or `extend` adds, from its entry week). The row
names neither. One builder of T-V11-45 (u) builds a disaster-look fixture to meet "every stated outcome"; another does
not. Nothing built changes, so this is a test list omitting a case its own row names (R6-01): MINOR.

*Required change:* EI-V11-EDGE-5's test cell "T-V11-47; T-V11-45 (s), (u)" → "T-V11-47; T-V11-45 (s), (u); T-V3-40 (b)
(a building under a disaster look at the look's level), T-V3-39 (c) (an element compared from its entry week)".

## Checks

* **References.** assemble-r6's resolver (`work/assemble-r6/refs.py`, read-only) was rerun on the live set: 56 555
  references (56 332 resolved, 131 external, 85 ambiguous-form, 6 resolved-form, 1 generic), **0 broken**.
  - V11: 3 696 resolved, 9 ambiguous-form, 3 external.
  - V12: 2 910 resolved, 2 ambiguous-form, 7 external.

  The two ambiguous forms this round touched in scope are the base's by canon S7 and by their words, since V06 §2.7 has no
  crossing table:
  - V11 l. 208, "§2.7's crossing table at S5a and S7", after a V06 list;
  - V11 l. 3962, "§2.7's way-and-channel table, rows (a)–(b)", after a V07 list.

  Every pointer the round added resolves and states what is cited:
  - §2.7's crossing table and its way-and-channel table, rows (a)–(b);
  - §10.2 (f);
  - §6.1 *The weather stream*;
  - V06 §3.15.2;
  - V03 §5.6 (2) (a)–(b);
  - V11 §3.25.9;
  - T124-9's year-position fixture.
* **Ids.** V11 has 209 and V12 185 table-defined ids, none duplicated, and the round adds or removes none.
* **Deferral wording and review ids.** The 85 words added to V11 and the 268 added to V12 hold no "TBD", "for now", open
  question, `R<n>-nn`, `PRB6-nn` or verifier id. The four "later" hits are each "the later of M5 and V06's E6", a
  schedule, not a deferral.
* **doc_checks** (`docs/validation/bench/doc_checks.py`, whole volume, S2 against the base's headings). It printed this
  WARNING: the reference corpus is INCOMPLETE (captures, research/patreon, research/devlogs, research/ftg-docs and
  research/external are missing), so the clean-room results are NOT authoritative and are provisional. Pre-round → live:
  - V11: C1 0 → 0, C2 0 → 0, C3 305 → 305 (277 → 277 unreviewed), C4 5 → 5 (0), S1 0 → 0, S2 332 → 334 (33 → 33).
  - V12: C1 8 → 8 (0 unreviewed), C2 0 → 0, C3 140 → 140 (126 → 126), C4 2 → 2 (0), S1 0 → 0, S2 119 → 119 (11 → 11).

  Both exit 1 before and after, on the same pre-existing unreviewed hits. The unreviewed sets are identical (diffed).
* **Edges (principle (11)) of the round's mechanisms.**
  - The weather replay's planted cases are now passable and its lawful carry is defined (§6.1) and tested (T124-9).
  - The pin's scope under a disaster look is defined (§10.2 (f)) and tested (T123-7, T-V3-39 (g), T-V4-82 (g), T-V12-37's
    planted case).
  - The drawn-week glow is defined and timed. Its "frame never waiting" clause is defined but unmeasured
    (VV1112-r6-01).
  - EI-V11-EDGE-5's cited outcomes are tested in V03 but not named in its row (VV1112-r6-03).
  - No other undefined or untested edge was found.
* **Item 126 (a2).** V11 and V12 hold no phone view. V12 l. 3183 and l. 3382 state that no fixture has a phone viewport.
  Nothing to raise.

**CONFIRMED** (executed here):
- the hashes;
- the word diffs;
- the reference resolver's counts;
- the id census;
- the added-text scans;
- the residue greps;
- doc_checks' counts (provisional by its own warning);
- every quoted line, read in the live files.

**PLAUSIBLE** (reasoning over the text):
- that an on-path re-evaluation passes V06 §6.4's budgets and `time.findGlow` (VV1112-r6-01), and its grade;
- that VS3, VS5, VS6 and S10 record reads of row 80 under T-V11-1 (b) (VV1112-r6-02).
