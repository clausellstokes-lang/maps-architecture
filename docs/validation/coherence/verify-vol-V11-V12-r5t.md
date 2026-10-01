# Verify — coherence pass, round 5: volumes V11 (content) and V12 (calibration) after repair round 5

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-vol-V11-V12-r5t; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V11-V12-r5t`, 2026-10-01, cloud checkout; scratch `scratchpad/coherence/v1112r5/`)
- P0 resume check (no LANDED line, no output): fresh start — done
- P1 inputs read (brief whole with its ROUND-5 and ORCHESTRATION NOTES; r4t report and result; adjudication-r5's intro,
  Summary, R5-01, R5-02, R5-10, the V11/V12 notes of R5-03 – R5-09's sweeps, Part H · V08, V11, V12; repair-r5-V11 and
  -V12 headers; assemble-r5) — done
- P2 live text against assemble-r5 (sha256 V11 b1445a5f…, V12 1e305ebe…, base 2d84eac2…, V08 8b5b5243…, each equal to
  assemble-r5's "after"; the pre-round text from HEAD 3310b53, V11 47b14d9f…, V12 2db3c8c9…, base 5f34cceb…, V08
  4675c05e…, each equal to assemble-r5's "before") — done
- P3 round-4 findings VV1112-r4-01 – 04 re-checked at their homes, with each END line's and hand-off's second end — done
  (4 of 4 fixed as ruled)
- P4 every subsection the 6 V11 and 6 V12 round-5 blocks changed, word-diffed against its pre-round form, every hunk read
  with the texts it cites — done (V11 8 hunks, V12 11 hunks; one new issue, VV1112-r5-01; the landed r5t results read so as
  not to repeat their issues)
- P5 references, ids, deferral, review ids, doc_checks — done
- P6 this report, the result file, LANDED — done

## Outcome

**Not clean: 1 issue — 0 blocker, 1 major, 0 minor** (owner V12). All four of this lane's round-4 findings are written at
their homes as adjudication-r5 rules them: VV1112-r4-01 per R5-10 (V08's crisis week now on a copy of `metropolis-3`
mutated to the 120 000 cap), VV1112-r4-02 and -03 as written, and VV1112-r4-04 in both volumes (V12's two register lines,
and V11's two pointers through repair-r5-V12's hand-off, which repair-r5-V11 received and wrote). R5-02's END line under
V11 is in. The new issue is in a text written this round as VAP-r4-04's required change. T-V12-57 makes `weather.replay`
fail a planted spell "carried into a week with no live kind across a year-position change". §6.1 *The weather stream* makes
such a carry lawful: a spell's kind and length are fixed once it starts. A replay comparison also cannot see a
deterministic carry, so the clause cannot pass as written (VV1112-r5-01).

| measure | V11 | V12 |
|---|---|---|
| words (`wc -w`), archive → pre-round → live | 103 331 → 110 255 → 110 345 (+6.8 % on the archive) | 75 054 → 83 196 → 83 448 (+11.2 % on the archive) |
| this round's change | +90 (170 added, 78 removed): the R5-02 END drops; the readers that R5-02's support step (6) and (7) name (row 80, §3.24.2's list, the crossing cells, the span cells); the refusal list's two missing cases at §3.2.3 (c) and §3.26; the named row in J-V11.113; the crossing cells' calibration route at §3.24.2 and §8 | +252 (261 added, 8 removed): T124-9's replay inputs and three fixtures at three statements; the two fires at two fixture lists; V05's landfall clause and T114-9/-10's owners at §3.15.4; the crossing cells' route at two register lines; the pin qualifier |
| repair blocks applied (assemble-r5) | 6 of 6 (§3.1, §3.2, §3.24, §3.26, ## 8, ## 9) | 6 of 6 (§2.13, §3.4, §3.11, §3.15, §7.1, §10.2) |
| word-diff hunks read (whole, with counterparts) | 8 | 11 |
| own ids (table-defined T-, J-, EI-, M-, X- rows) | 209, no duplicate; set unchanged by the round | 185, no duplicate; set unchanged |
| round-4 findings closed | VV1112-r4-03 | VV1112-r4-02, -04 (and -01 at V08) |
| issues this round | — | VV1112-r5-01 |

Neither volume shrinks this round: both grow by ruled content, as repair-r5-V11 and -V12 report. So no whole-volume nuance
audit was due. Each of the round's cuts was checked against what it cut. The V11 phrases dropped are R5-02's superseded
mechanism (the support step's re-runs in S5a and after S7's batches), which base §2.7's support step (6) no longer has, and
their readers now carry the rule that replaced it. "Route and growth proposal … on ground part 0" became "part-0 way", the
same set, widened to (6) (a)'s list. The crossing cells' "`raisedWays.structure` line" became "default line", as ruled. No
NUANCE-LOST.

## Round-4 findings — status on the live text

| id | owner | grade (Part H) | disposition | status | where, as checked |
|---|---|---|---|---|---|
| VV1112-r4-01 | V08 | **minor** (regraded from major, R5-01) | FIX per R5-10 | **fixed** | V08 §7.1 (l. 3246–3248): "with one week on `city-1`, and one on a copy of `metropolis-3` mutated test-side to the population cap's 120 000 people (as T-V8-36 mutates `city-1`), in which the siege, the plague's quarantine and the refugee wave stand at once …" — the required text. 120 000 is inside METROPOLIS [30 000, 120 000] (base l. 324, 357), so the port takes it (only a dossier above the cap is refused, l. 8525). V12's readers agree unchanged: §3.15.12's "at CITY and at the METROPOLIS cap", T122-6's bullet, X-V12-5. Closes VV78-r4-08 (MERGED) |
| VV1112-r4-02 | V12 | minor | FIX | **fixed** | V12 §2.13's row (l. 919): "B-CITY's 200 seeds per rung (V11, T-V11-21, on `item105.web`)". T-V11-21 registers on `item105.web` only. `item107.spread` is registered only at V05 l. 2659 and T-V6-44 (searched), and the row lists both under both pins. §3.7.8's list and X-V12-11 name T-V11-21 without a pin and stand |
| VV1112-r4-03 | V11 | minor | FIX | **fixed** | J-V11.113 (l. 5282): "… what readers fall back to or need — a table's `defaultRow`, an `allowFallback` target, a totality rule's only cover, a table's named row (V11 §2.1's settings form), the last row of a table not `mayEmpty` —". The seat's sweep also conformed §3.2.3 (c) (l. 1169–1170) and §3.26's lead (l. 4741–4742) to §4.1's five cases in §4.1's order. Every restatement now agrees with §4.1 (l. 4836–4843) and EI-V11-EDGE-3 |
| VV1112-r4-04 | V12 (and V11's two pointers) | minor | FIX | **fixed** | V12 §3.11's `raisedWays.structure` line (l. 2176): "… but the `span` block (the span-rule line's) and `clearWidthM` and `squareDeg` (§4.3's crossing cells, the default line's, `corpus` at M-CAL, as when V01 held them; J-V1.97)". The default line's list (l. 2042–2043) adds "V11's `raisedWays.structure.clearWidthM` and `.squareDeg` (§4.3's crossing cells)". V11 §3.24.2 (l. 3963): "their entry V12 §3.11's default line (`corpus` at M-CAL)". V11 §8 (l. 5147–5149) is the required text. The default line's due is M-CAL, and the cells land at M3a (C3b), before it (base l. 20297). *Items 109 and 110 by column* reads "the method, metric and fallback of its line", so it covers them; J-V12.82 and X-V11-17 (f) stay true |

**END lines and hand-offs naming V11 or V12 this round:**

| END / hand-off | where it landed | status |
|---|---|---|
| R5-02's END → V11 (§3.24.2's two reader phrases dropped) | l. 3906–3909 and l. 3981–3982 | **written**. Both phrases are gone. The cells, values and provenance stand: 1 m, 30°, [0, 3] m, [10°, 45°], `own`. In their place the seat wrote R5-02's own readers (below) |
| repair-r5-V12 → V11 (VV1112-r4-04's V11 part) | §3.24.2 l. 3963, §8 l. 5147–5149 | **written** as the issue's text; the two volumes agree |
| R5-10's sweep: VV1112-r4-01 needs nothing at V12 | — | **confirmed**: §3.15.12, T122-6's bullet and X-V12-5 already read "the METROPOLIS cap" |
| repair-r5-rendering → V12 (`time.findGlow` at a drawn week) | not written. V12 waits for §13.2's T120-6 | Already raised at scope by verify-agree-proof-r5t (VAP-r5-01) and verify-rendering-r5t (VRC4T-04). Not repeated |
| repair-r5-V09 → V08/V12 (the famine's severity) | V08's | Already raised by verify-agree-proof-r5t (VAP-r5-02, owner V08). Not repeated |

## Round-5 changes in scope — new problems

Every hunk of the two word diffs (HEAD 3310b53 → live) was read whole, together with the texts it cites.

**V11 (6 blocks, 8 hunks).**
* **Row 80's readers (§3.1).** S5a and S7 keep their place with R5-02's reasons: "a wall laid after a raised way meeting
  its under-deck strip at `structure.stripMarginM`, §2.7's support step (6) (b), (d), §4.4 S5a, §4.8; S7's quays,
  intervallum and castle paths crossing that strip by §4.3's crossing rule". VS4 is added for V07's trackers. Each agrees
  with its home:
  - base §2.7's support step (6) (a), (b), (d) (l. 2580–2616);
  - §4.8's lead (l. 7609–7616);
  - V07 §3.5a (3) (V07 l. 1585–1593), whose trackers read `raisedWays.structure.clearWidthM`, `.squareDeg` and §2.7's
    *The clearance*.

  VS4 is a registered village StageId (V11 §3.1's *Readers*, `VS1`–`VS6`). The epoch circuits and contractions run S5a's
  trace and S7's furniture under those stages' own ids (V06 l. 1458, 1524; J-V11.109), so they need no further reader.
  No new issue.
* **§3.24.2's reader list, the crossing cells' readers and the span cells' readers.** Each now carries the (6) (a) list
  ("a route, a growth proposal, … V07 §3.5a (3)'s trackers, S7's quays, intervallum and castle paths and a hand way"),
  base l. 2591–2595. The span cells add "on a frame growth's extension of a deck (§2.7's support step (7))", base
  l. 2623–2628. The one wording residue is §3.24.2's "a later wall's strips and berm stop at its edges". Under (6) (d) the
  band runs on and only the setback, glacis and berm stop. verify-model-r5t raised this as VM-R5T-01 (owner pipeline) with
  the V11 end in its required change, so it is not repeated here.
* **§3.2.3 (c), §3.26's lead, J-V11.113** — the refusal list (VV1112-r4-03, above). No new issue.
* **§8.** The ship line carries the two routes; it agrees with V12's register. No new issue.
* **R5-02 residue swept** (the superseded rule must not survive in scope). Neither volume holds "after S7's batches", "last
  run", a give-way rung, a crossing station, a raised gate, a wall opening or a lock clause (searched). V11 §2.10's
  `slideMaxFactor` / `maxClearSpanM` row ("an edit re-runs the support step on the generated ways") is a table edit
  re-deriving a generated way, as a regeneration does, and (6) keeps that. V12's one "support step" (l. 2187) cites it as
  a reader of the `span` cells, which R5-02 keeps.

**V12 (6 blocks, 11 hunks).**
* **§2.13 and §3.11** — VV1112-r4-02 and -04 (above). No new issue.
* **§3.15.4 (VAP-r4-03).** The lead and the T114-1 – T114-3 bullet now name V05's landfall clause (T-V5-14) and "T114-3's
  crossing and regrowth clauses on H-AQUA". The closing sentence names T114-9 and T114-10 as the base's bars, with their
  village and epoch clauses at V07 (T-V7-59) and V06 (T-V6-73). Each agrees with §13.2's runs sentence (base l. 18583–18587)
  and §13.8's T114 rows (l. 19353–19354, 19369–19370). No new issue. (T114-3's regrowth clause has its own open edge in
  the base, VM-R5T-02, at model.)
* **§3.15.12 and X-V12-5 (VAP-r4-05).** The two fires — "one naming more target districts than its share of its place's
  units gives (§10.2 (c)) and one on a place whose district adjacency from its seed ends before that count (V01 §3.16
  `disasterSource` (5))" — agree with V08 §7.1's END text (V08 l. 3249–3256: the second fire on `city-1`; a fire at
  severity 1 on `town-1`, whose river parts its districts into two banks no seam joins). At severity 1 the count is every
  unit, so the fire order that ends at the bank is shorter than it. They also agree with T-V12-54's passing cases. No new
  issue.
* **§3.4.2's `weather.*` row and §3.15.14's T124-9 bullet (VAP-r4-04).** Both carry the replay's inputs and T124-9's
  three fixtures, as §13.2's T124-9 (base l. 18733–18737) and §6.1 *The weather stream* (l. 9585–9599) state them. No new
  issue.
* **T-V12-57 (VAP-r4-04).** The added planted case contradicts §6.1's running-spell rule, and a replay comparison cannot
  catch it: **VV1112-r5-01**.

**The landed r5t results** (agree-layers, agree-proof, determinism, model, rendering, vol-V07-V08) were read for any issue
touching V11 or V12: VM-R5T-01's V11 end, VAP-r5-01 (V12 waits on T120-6), VAP-r5-02 (the famine's severity at V08) and
VAP-r5-03 (V12 §2.13's H-AQUA suite for `item110.*`). None is repeated here.

## Issues

**VV1112-r5-01 — major — CONFLICT — owner V12.** T-V12-57 (V12 l. 3179) was written this round as VAP-r4-04's required
text. It ends: "`weather.replay` fails a planted spell drawn from the host's clock and one carried into a week with no
live kind across a year-position change".

The base makes the second case lawful. §6.1 *The weather stream* (base l. 9585–9589): "a change of the year position,
the climate row, the sites, the `light` mode or the hour changes the rate from that moment, the drawn E kept … A spell's
kind and length are fixed once it starts; a change acts on a running spell only through §8.2's hard rules". Those hard
rules (l. 13262–13264) concern only snow and arid rain. T124-9's own fixture moves the year position "from a week with no
live kind into a live one and back" (base l. 18735; determinism §6.5 (9), l. 10224–10228; V12 §3.15.14, l. 2795–2797).
So a spell started in the live week and still running when the year position goes back is carried into the week with no
live kind by rule.

`weather.replay` counts the spells that differ in kind, start or length between two timelines from the same seed, clock,
presses and inputs (§3.4.2's row, l. 1212). A carried spell — the lawful one, or any deterministic planted code — is the
same in both runs. So the statistic reads 0, and the clause "fails … one carried into a week with no live kind" cannot
pass. The first planted case passes only because the host's clock differs between runs.

Builders would split three ways:
- one finds the clause unpassable and stops;
- one reads it as requiring a running spell to end at a change into a week with no live kind, and builds a timeline
  against §6.1;
- one plants a run-varying fault of their own.

This is a test bar that cannot pass as written (J141: major).

*Required change:* T-V12-57: "and one carried into a week with no live kind across a year-position change" → "and one
whose gap is re-drawn from the host's clock at a year-position change instead of kept (§6.1 *The weather stream*: the
drawn E kept), on T124-9's year-position fixture — a spell in force at that change carried into the week with no live
kind, its kind and length fixed (§6.1), passing". The rest of the row stands.

## Checks

* **References.** assemble-r5's resolver (`work/assemble-r5/refs.py`, read-only) was rerun on the live set: 56 169
  references (55 946 resolved, 131 external, 85 ambiguous-form, 6 resolved-form, 1 generic), **0 broken**. V11: 3 692
  resolved, 8 ambiguous-form, 3 external. V12: 2 900 resolved, 2 ambiguous-form, 7 external. The one ambiguous form the
  round added in scope is V11 l. 3962's "§2.7's support step (6) (a)", after a V07 list. It is the base's §2.7, as its words
  say (assemble-r5 lists it). The pointers the round added each resolve and state what is cited:
  - V07 §3.5a (3);
  - base §2.7's support step (6) (a), (b), (d) and (7);
  - §4.4 S5a, §4.8, §6.1 *The weather stream*, §10.2 (c);
  - V01 §3.16 `disasterSource` (5);
  - T-V5-14, T-V7-59, T-V6-73, J-V1.97.
* **Ids.** V11 has 209 and V12 185 table-defined ids, none duplicated, and the round adds or removes none.
* **Deferral wording and review ids.** In the 170 words the round added to V11 and the 261 it added to V12 there is no
  "TBD", "for now" or open question, and no `R5-nn`, `R4-nn` or verifier id. The one "later" is "a later wall", a wall
  laid after the raised way, not a deferral.
* **doc_checks** (`docs/validation/bench/doc_checks.py`, whole volume, S2 against the base's headings). It printed this
  WARNING: the reference corpus is INCOMPLETE (captures, research/patreon, research/devlogs, research/ftg-docs and
  research/external are missing), so the clean-room results are NOT authoritative and are provisional. Pre-round → live:
  - V11: C1 0 → 0, C2 0 → 0, C3 305 → 305 (277 → 277 unreviewed), C4 5 → 5 (0), S1 0 → 0, S2 332 → 332 (33 → 33).
  - V12: C1 8 → 8 (0 unreviewed), C2 0 → 0, C3 140 → 140 (126 → 126), C4 2 → 2 (0), S1 0 → 0, S2 117 → 119 (11 → 11).

  Both exit 1 before and after, on the same pre-existing unreviewed hits. The unreviewed sets are identical (diffed).
* **Edges (principle (11)) of the round's mechanisms.**
  - The replay's year-position, no-live-kind press and `hours` crossing fixtures are defined (§6.1, EI-V11-EDGE-6) and
    tested (T124-9 at V12 and §6.5 (9); T-V11-45 (v)). Only the planted case is wrong (VV1112-r5-01).
  - The two fire cases are defined (V01 §3.16 (4), (5)) and are passing cases of T-V12-54, now on named fixtures.
  - The cap-week fixture sits at the cap's inclusive edge, which the port accepts.
  - The crossing cells' route is the default line's fallback.
  - No other undefined or untested edge was found.
* **Item 126 (a2).** V11 and V12 hold no phone view. V12 l. 3181 and 3380 state that no fixture has a phone viewport.
  Nothing to raise.

**CONFIRMED** (executed here): the hashes; the word diffs; the reference resolver's counts; the id census; the
added-text scans; doc_checks' counts (provisional by its own warning); every quoted line read in the live files.
**PLAUSIBLE** (reasoning over the text): the grade of VV1112-r5-01, and that its required change closes it without
opening another.
