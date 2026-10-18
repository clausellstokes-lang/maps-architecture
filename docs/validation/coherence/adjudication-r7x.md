# Coherence adjudication — round 7, the third family fix pass (coherence/adjudicate-r7x)

PROGRESS (lane `coherence/adjudicate-r7x`, 2026-10-02; fresh start, no earlier CHECKPOINT of this seat)
- [x] A1 read whole: the brief; the six family checks' third run (`famverify-{table,generation,epochs,hand,readers,
  tests}-r7w.md`) and their result JSONs; `adjudication-r7v.md` and `adjudication-r7w.md` whole; `adjudication-r7.md`
  Part L (terms, laws 1–4, the check, the seven corrections, the restated veto list), Part H's head (the citation
  rule) and Part P pass 8; PROGRESS J144 – J151; the live text of every cited site, and of every text that restates
  law 1's exclusions or law 2's order, by grep and in ranges — every quoted old text below located by its words
- [x] A2 the decision table (below): 27 rows; the root-cause ruling and its sweep
- [x] A3 Part H by unit (model, pipeline, determinism, scope, V04, V06, V07, V09, V11 with work), the builders' choices
  (none), the held notes (13); result JSON; LANDED

## What this pass is

Round 7 works the raised-way × wall family alone (J144). Its laws — Part L of `adjudication-r7.md`, normative under
J146 with J147 – J151, at home in §2.7's support step (6) — were written into the design and assembled; six family
checks then read the live design three times, each run followed by a fix pass: `famverify-*-r7.md` (13 majors;
`adjudication-r7v.md`), `famverify-*-r7v.md` (8 majors; `adjudication-r7w.md`), and now, on the design `assemble-r7w`
installed, `famverify-*-r7w.md`. This file decides every finding of that third run so that the repair seats can write
the fixes and the six checks can run once more; the loop ends when they find no major (J144, J151 (2)). Every text
below is the exact wording a seat writes. Nothing here changes an owner rule, and no reading of the owner's words is
recorded as the owner's: where a reason rests on J144 or J147 beyond the owner's quoted words, it says "as the program
reads it" (J122).

**The count.** The six result files hold **27 rows** — 26 new ids and one persisting id (VF7v-TBL-02) — **0 blocker, 7
major, 20 minor**. Three of the major rows restate another lens's major in the same words (VF7w-GEN-02 and VF7w-TST-01
are VF7w-TBL-02; VF7w-GEN-06 is VF7w-TBL-01), so the majors are **4 distinct defects**, as the orchestrator's note says;
its "23 findings" counts the new distinct ones (27 − 1 persisting − 3 restated). All 27 rows are decided here.

**Grading** (J146 refined by J151, PROGRESS; applied as `adjudication-r7v.md` and `adjudication-r7w.md` apply it). A
case where every outcome keeps every law-1 invariant and every owner rule, passes the runtime check and fails no named
test is a minor **valid choice**: picked where the pick costs no words and keeps the laws whole, else listed for
fix-list.md. A case with no lawful outcome, an outcome breaking an owner rule or a law-1 invariant, a law-1 invariant no
bar checks, or a check or named test failing a correct build is MAJOR. §2.7's worked examples are non-normative (the
laws govern), so an example's slip is at most a minor; a pipeline step, an outcome row, a catalogue line, a fixture or a
test is what a builder builds or runs, so one whose literal outcome breaks a law-1 invariant or an owner rule as the
program reads it — a stage given way where the laws lay a lawful shape (Part P pass 8, PRB7H-GEN-04 (i)), a hand
declaration bent past a nearer lawful place (PRB7H-LCK-03, item 101 R2) — is MAJOR. A citation, a restatement the laws
already decide, a case a fixture may not hold, a list omitting a reader, or a test gap whose wrong build keeps law 1 is
a minor.

**Totals.** 27 decided — **FIX 24**, **FIX, VALID CHOICE PICKED 0**, **VALID CHOICE LISTED 0**, **MERGED 3**
(VF7w-GEN-02 and VF7w-TST-01 into VF7w-TBL-02; VF7w-GEN-06 into VF7w-TBL-01), **INVALID 0**. **Regraded 0**: each
lens graded by J146 and J151 as the two earlier passes apply them, and every grade stands (the four majors each give,
on one reading of a text a builder builds, an outcome breaking law 1 (4) or an owner rule as the program reads it; the
minors are restatements, readers, citations, fixtures and test gaps whose wrong build keeps law 1). Graded: **7 major
rows (4 distinct defects, every one a FIX)**, **20 minor**. **Laws changed: one END-L line** — law 3's sentence on a
line's part inside a strip (VF7w-TBL-04), 3 words fewer (J150); no other law is touched.

**The root cause, closed once** (the ruling below). All four distinct majors, and seven of the minors (VF7v-TBL-02,
VF7w-TBL-03, VF7w-GEN-03, VF7w-EPO-01, VF7w-EPO-02, VF7w-HND-04, VF7w-RDR-01), sit in
a text that restates §2.7's laws in its own words — a list of what a pulled line, a course, a gate or a fixed place
must keep clear of (law 1's exclusions), or the order in which an op that meets one resolves it (law 2's order). Every
pass that corrected such a list in its own words opened a new deviation in it. This pass does not correct the lists: it
replaces each by a citation of the laws, keeping only what the laws do not say (the search band, the operator, the
step, the ladder or counter that carries law 2 (c)'s outcome on its path, the bend key and its line), and sweeps the
family for every other such restatement (the class sweep, 45 further sites in 7 units, each named in Part H).

**How to read.** Disposition words are `adjudication-r7.md`'s: **FIX** applies the finding's required change as this
file words it (where this file's words differ from the finding's, this file's govern and the entry says why); an **END**
line is the exact text a unit writes for a fix another unit's finding asks of it, written under that unit; an **END-L**
line changes the laws at their home and is the model unit's alone; **CLASS** marks a site of the root-cause sweep that
no finding names. Every text quoted "old → new" keeps every other word as it stands; a quoted old text may run across a
line break. Line numbers are the live files' as the six checks read them (`docs/ARCHITECTURE.md` unless a volume is
named); a seat locates each old text by its words (each was found exactly once, save where an entry says twice). No
review id (VF7…, PRB7…) is written into the design (R3-02). Where two entries edit one sentence or row, each edits only
the words it quotes. **Supersession by name:** this file supersedes, in `adjudication-r7.md` Part L, law 3's sentence "A
line's part inside a strip that crosses no deck line there goes to the strip's edge on the side it entered from"
(END-L3, M12); and, where it rewrites a text an earlier pass wrote — `adjudication-r7v.md`'s P1, M8, D1, D2;
`adjudication-r7w.md`'s P1 – P3, M1, M2, M4, M6, D6, V6-3, V6-4, V7-2 —, this file's words govern.

## The decisions

| id | lens | sev | grade | disposition | writes | reason |
|---|---|---|---|---|---|---|
| VF7w-TBL-01 | table | major | major | FIX | pipeline (P1, P3); model (M4); END model (M1 – M3) | §4.4 S5a *Trace* (2)'s one list and §4.3's course rule keep a wall off a raised way's bare ramps, stairs and feet where law 1 (4) keeps its line, band and wall strips off its **ends** (widened by the strip margin): one reading of a text a builder builds lays wall strips in that margin, breaking law 1 (4) at the commit (§5.3's row, `E_INVARIANT`) — no valid choice (J151), major as VF7-GEN-01 was. Closed by the root cause: both texts cite the laws instead of listing them; the examples say "ends". VF7w-GEN-06 merged here. |
| VF7w-TBL-02 | table | major | major | FIX | pipeline (P1); model (M4); V06 (V6-1) | The list's "each widened all round by the wall strips' width" reads over a held building's strip, which its term already widens; the doubled build searches fewer shapes than law 1 admits and gives way (F-WALL's rung, `walls.waited`, a hand `contractWall` refused) where law 2 (a) lays a lawful trace — the outcome Part P pass 8 ruled against J144 as the program reads it (PRB7H-GEN-04 (i)). Closed by the root cause: the list becomes a citation that widens nothing (the line read with the band and wall strips it carries). VF7w-GEN-02 and VF7w-TST-01 merged here. |
| VF7v-TBL-02 | table | minor | minor | FIX | model (M9) | Persisting: the C5 column's lead and W1·C5, W3·C5 pass a trace through a `cleared` ring unconditioned, where law 1 (2) reads both fallen spans' soffits; the bars carry the condition and §5.3's row catches a wrong build. Written as a citation of law 1 (2) and *Where the line crosses* (the finding's words for the cells; this file's for the lead, which would otherwise restate the condition once more). |
| VF7w-TBL-03 | table | minor | minor | FIX | model (M8) | The bent group's strip takes in held buildings' widened strips but not a shape-locked raised way's `vault`-use spans, so its edge moves lay wall strips across them (law 1 (10)); the laws govern and the check catches it. Written as the places law 1 (9) and (10) bar the line — not the finding's new widening, which would add one more restated widening, the class this pass closes. |
| VF7w-TBL-04 | table | minor | minor | FIX (END-L3) | model (M12) | Law 3's "goes to the strip's edge on the side it entered from" names a place law 1 (4) bars (half the band in the strip); law 3 ranks only lawful shapes, so the sentence decides only the side. The finding's words; the laws lose 3 words (J150). |
| VF7w-GEN-01 | generation | major | major | FIX | pipeline (P2); END determinism (D4) | S5a's pin rule sends an arterial's barred pin from law 2 (a) straight to F-WALL's raised-way rung, skipping law 2 (b)'s re-route of a Tier-3 way, which law 2 orders "for every op on every path": a stage left to the rung, sometimes unwalled, where (b) gives a lawful walled shape — the outcome pass 8 ruled against J144 as the program reads it (PRB7H-GEN-04 (i)), as the r7w regrade of VF7v-GEN-03 held. The pin rule now cites law 2 in its order — (a) moved along its way, (b) its way re-routed, (c) F-WALL's rung. |
| VF7w-GEN-02 | generation | major | major | MERGED into VF7w-TBL-02 | — | The same phrase of the same list, found on the generation and regeneration paths. |
| VF7w-GEN-03 | generation | minor | minor | FIX | pipeline (P4) | §4.13's raised-way × wall cell cites law 1 (2)–(9) and names one rung; §4.1's S3 row omits F-ROUTE; §4.8 *The harbour mouth* lays the chain unconditionally. Readers omitting outcomes their rules name; written in the citation forms (this file's words for the cell's rung and the chain, which the finding restated). |
| VF7w-GEN-04 | generation | minor | minor | FIX | pipeline (P3, P5) | Six pipeline sites cite the way-and-channel table without the laws (Part H's citation rule). The finding's words. |
| VF7w-GEN-05 | generation | minor | minor | FIX | scope (S2) | The state sweep's C12 needs a raised way ending on the frame, which T110-2 (6)'s and (4)'s fixtures do not name; a case the fixture may not hold. The finding's words. |
| VF7w-GEN-06 | generation | major | major | MERGED into VF7w-TBL-01 | — | The same list's and §4.3's "ramps, stairs and feet", found on the generation paths. |
| VF7w-EPO-01 | epochs | minor | minor | FIX | V06 (V6-1, V6-2, V6-4); END pipeline (P3), model (M1), scope (S9 (d)) | Five restatements of law 1 (6) and one bar admit an anchor under a clearing arch, which law 1 (4) bars; the laws decide and the check catches it. Each site cites law 1 (4)–(6) instead of adding "an anchor in none" to its restatement (this file's words: the class). |
| VF7w-EPO-02 | epochs | minor | minor | FIX | V06 (V6-2, V6-3); END determinism (D5), pipeline (P2) | V06 §3.7.1, §3.17 (3), F-WALL's ladder and S5a's pin rule do not state law 2 (c)'s epoch wait for a circuit with no lawful meeting; T110-2 (4)'s table-edit run asserts it, so a wrong build fails a named bar. The finding's words, S5a's half carried by P2's citation of law 2 (c) on its path. |
| VF7w-EPO-03 | epochs | minor | minor | FIX | V06 (V6-5) | V06 §7's founding row omits the hand-drawn, placement-locked ring that T-V6-73 runs. The finding's words. |
| VF7w-EPO-04 | epochs | minor | minor | FIX | scope (S3); V06 (V6-6) | A bare "§3.2" resolves to the base's numeric policy (canon S7), not V06's phase order. The finding's words. |
| VF7w-HND-01 | hand | major | major | FIX | determinism (D1); END scope (S1) | §7.1's `bend.wall.raisedCrossing` row restates the laws narrower than they are — a stretch's gate carried clear of the whole strip where law 1 (5) admits it in an over crossing's margin, a road deck's crossing under a span only, an over crossing without the `cleared` ring — so a build of the row passes a nearer lawful place on a hand gesture no bar holds, against item 101 R2 as the program reads it (PRB7H-LCK-03; VF7-HND-01's grade). The row now names the outcome as the nearest lawful shape §2.7's laws give. |
| VF7w-HND-02 | hand | minor | minor | FIX | V09 (V9-2) | Two family bends reach no line form (a crossing bent to a road deck's first lawful crossing or a nearer merged one; a raised stroke kept off a wall it would run along); the outcome is the laws' in every build. The finding's words. |
| VF7w-HND-03 | hand | minor | minor | FIX | V09 (V9-3) | `bend.wall.aqueductArch`'s source cell keeps "held or not" (VF7v-HND-03's sixth site). The finding's words, the cell's citation conformed in the same block (the class). |
| VF7w-HND-04 | hand | minor | minor | FIX | scope (S5); END V09 (V9-4) | T110-2 (4) and T-V9-52 gloss a gate's lawful places in an aqueduct's strip as "clear of the strip, or under an arch"; S0 makes each assert the laws'. Written as citations of law 1 (5), not the finding's new gloss (the class). |
| VF7w-RDR-01 | readers | minor | minor | FIX | V09 (V9-1) | V09's `decidedBy` cell words law 1 (8) as "none under a wall". The finding's words. |
| VF7w-RDR-02 | readers | minor | minor | FIX | V11 (V11-1) | Row 80 and W50 omit EVO_FORT and S1 among the readers of `stripMarginM` and `span.deckDepthCm` through the laws. This file's words: EVO_FORT for the fortification phase's own traces and chains, a trace laid through S5a's trace step reading under `S5a` (J-V11.109), so no read is listed twice. |
| VF7w-RDR-03 | readers | minor | minor | FIX | scope (S4) | §8.11's T-ER-12, a base bar on T110-2's fixtures, lies outside the class rule's "every volume bar". The finding's words. |
| VF7w-TST-01 | tests | major | major | MERGED into VF7w-TBL-02 | — | The same phrase of the same list, found against T110-2 (4)'s held-building run. |
| VF7w-TST-02 | tests | minor | minor | FIX | scope (S6) | Six outcomes the second pass wrote are run by no bar; each wrong build keeps law 1 (J146, J151). The finding's clauses, (3)'s worded for the rewritten pin rule, with one more run for its step (b) (this file's addition, so that VF7w-GEN-01's fix is held by a bar). |
| VF7w-TST-03 | tests | minor | minor | FIX | scope (S7) | C6's residue: T110-2 (6)'s seed fixes the aqueduct's level only where the boundary meets it, not along the pull's band. The finding's words. |
| VF7w-TST-04 | tests | minor | minor | FIX | V04 (V4-1) | T-V4-63's epoch circuit under the `vault` span has no seed condition (C2's and C10's twin). The finding's words. |
| VF7w-TST-05 | tests | minor | minor | FIX | model (M11); END scope (S8), V07 (V7-1) | Five crossing-table cells misname a test or leave a path unrun; each outcome an *unchanged meeting*. The finding's words. |

## The root cause, closed once — the laws cited, never restated

**The class.** Three of the four distinct majors sit in one sentence, §4.4 S5a *Trace* (2): its one list of a trace's
impassables (VF7w-TBL-01, -TBL-02) and its pin rule (VF7w-GEN-01); the fourth in §7.1's `bend.wall.raisedCrossing` row
(VF7w-HND-01). Each is a restatement of §2.7's laws in its own words, and each pass that corrected it opened a new
deviation: in round 7 the list missed the low spans, in 7v it did not widen them, in 7w it said "ramps, stairs and feet"
for law 1 (4)'s ends and "each widened" over a strip already widened, and its pin rule skipped law 2 (b); §7.1's row
moved gates "clear of" a strip law 1 (5) admits them in. The same restatements — law 1 (5) glossed as "save under an
arch that clears it", law 1 (6) without law 1 (4)'s anchor, law 1 (4)'s ends as "ramps, stairs and feet", law 2's
order with a step missing — stand in 45 further family texts, which the next check would raise one by one.

**The ruling.** Every family text that names what a wall's line, band, wall strips, gates, posterns, towers or fixed
places, or a raised way's course, must keep clear of, or how an op that meets such a bar resolves it, **cites §2.7's
laws** in one of these forms and keeps only what the laws do not say — the search band and bound, the operator, the
step that runs it, the ladder or counter that carries law 2 (c)'s outcome on its path, the bend key and its line:
* **(F1) a searched shape** (a pull, a cost field, a course solve, a siting): "searching only the shapes §2.7's laws
  admit (law 1 (2)–(6), (9)–(11), read with their terms; law 2 (a))" — for a wall's line, "its line read with the band
  and wall strips it carries there", and, where a stage's boundary meets a road deck's carried way or an arterial on a
  deck, "and law 2 *Carried way*";
* **(F2) a place a stroke, drag or costless rule sets**: "moved to the nearest place §2.7's laws admit it (law 2 (a),
  law 3)";
* **(F3) a thing the laws bar there whose resolution has more than one step**: "resolved by §2.7's laws, law 2, in its
  order — (a) …, (b) …, (c) …", each step naming only its operator and bound;
* **(F4) a hand bend**: "bent to the nearest lawful shape §2.7's laws give (law 1 (2)–(6), (9)–(11), law 2 (a), law 3)";
* **(F5) a named place**: where a text must name a barred or admitted place it uses the laws' own words — "a raised
  way's ends", "where law 1 (5) bars it", "where law 1 (4)–(6) admit it" (a fixed place: law 1 (4) for an anchor, which
  ends its line) — never a paraphrase of a clause's exceptions ("save under an arch that clears it", "ramps, stairs and
  feet", a widening).

The brief's own words for these sites are used, save where this file adds a clause the brief's list would drop: law 2
*Carried way* in F1 (the deck-only crossing a trace keeps is *Carried way*'s, not law 1's — leaving it out would drop
the list's carried-way item, PRB7H-GEN-04 (ii)), and law 1 (6), (9)–(11) in F4 (§7.1's row moves fixed places and a
castle's claim, law 1 (6), and keeps a stretch off held buildings and shape-locked spans, law 1 (9), (10); citing
(2)–(5) alone would leave those uncited, a new restatement gap). No form adds a widening, a list or a case: each text's
outcome is the laws' by construction, so a later change of the laws carries into it and no check can find it narrower
or wider than they are. Bars stay under S0 (T110-2's lead: each asserts the laws' outcome for its fixture), and their
restated invariants are written in F5's words.

**Its sites.** The five texts the brief names — §4.4 S5a *Trace* (2)'s list (P1) and pin rule (P2), §4.3 *Where it may
not go*'s course rule (P3), *beneath*'s list (M4), V06 §3.7.4 (2)'s cost field (V6-1) — and §7.1's
`bend.wall.raisedCrossing` row (D1); then the sweep, 45 CLASS sites, with the sites of the class a finding names written
as its FIX or END beside them: model (M1 – M3, M5 – M8, M10: *over the band*, *Where the line crosses*, *Line and band*,
*No gate and no tower*, *Strips, zones and nearest points*, the fixed-place sentence, the bent-group sentence, rows (b)
and (d), W1, W1·C1, W8·C1, W13, W14, *Paths and tests*, the support step's (7)); pipeline (P6 – P9: §4.2 S3 (7) and (8),
§4.4 S5a (1), *Water and the waterfront*, S5b, §4.8's S7 lead); determinism (D2, D3, D6: §7.1's refuse row and *Raised
ways*, §7.3's S7 row); scope (S9: six bars of T110-2); V06 (V6-2, V6-4, V6-7: §3.7.1, §3.19 (5), T-V6-47); V07 (V7-2,
V7-3: §3.5a (4), T-V7-48); V09 (V9-3, V9-5: §4.20.2 (4) and two source cells). **R7-01 (2)'s sweep stands with these
forms:** each seat greps its own unit for any further text that restates law 1's exclusions or law 2's order and writes
it in the form above in the same block, naming each in its report.

## Part H — by unit

Each unit's work: its root-cause rewrites and FIXes, then the END lines other units' findings ask of it, then its CLASS
entries (the root-cause sweep). "old → new" keeps every other word as it stands. Where a text below differs from the
finding's required change, the note after it says why. Every citation a seat writes follows Part H's head of
`adjudication-r7.md` ("§2.7's laws, law n; its worked example …") and this file's forms F1 – F5.

### model (base §2)

Writes the root cause's *beneath* (M4) for VF7w-TBL-01 and -TBL-02; VF7v-TBL-02, VF7w-TBL-03 and VF7w-TST-05 (its
FIXes); END-L3 for VF7w-TBL-04; the ENDs of VF7w-TBL-01 and VF7w-EPO-01; and the class's model sites. Every edit is inside
§2.7's support step (6); the only change to the laws is M12.

**M1 · END for VF7w-TBL-01 and VF7w-EPO-01; CLASS** — *over the band* (l. 3015–3021):
* "and its ramps, stairs and feet kept by its course off the band and the wall strips (law 1 (4); §4.3 *Where it may not
  go*)" → "and its ends kept by its course off the band and the wall strips (law 1 (4), these laws' *ends*; §4.3 *Where it
  may not go*)";
* "a gate, postern, tower or fixed place of the trace stands under it only where the crossing is over and its arches
  clear them, the course otherwise keeping clear of them (law 1 (5), (6);" → "a gate, postern, tower or fixed place of
  the trace stands under it only where these laws admit it, the course otherwise keeping clear of it (law 1 (4)–(6),
  read with their terms;";
* (CLASS) "a tower its spacing or a turn would place in the strip where the arches do not clear it is placed along the
  trace at the nearest lawful point (law 2 (a), law 3)" → "a tower its spacing or a turn would place where law 1 (5) bars
  it is placed along the trace at the nearest lawful point (law 2 (a), law 3)".
(VF7w-TBL-01's change names the term, not its definition, which the laws state once; VF7w-EPO-01's anchor is law 1 (4)'s
in the citation, not a clause "an anchor under none" added to a restatement.)

**M2 · END for VF7w-TBL-01** — *beneath*'s *Where the line crosses* (l. 3058–3059): "a trace's line never crosses a
raised way's ramp, stair or foot, its band and wall strips kept off them too (law 1 (4))" → "a trace's line, band and
wall strips never lie over a raised way's ends (law 1 (4), these laws' *ends*)". (Law 1 (4)'s own words.)

**M3 · END for VF7w-TBL-01** — *beneath*'s *Line and band* (l. 3069–3071): "every keep-clear this table states for a
trace's line holds for its band and wall strips — the line kept from a ramp, stair or foot by the wall strips' width
there (law 1 (4)), and from an aqueduct's standing support, where the crossing is over, by the band's half there (§4.8's
rows along the stretch profile; *the edge*) —;" → "every keep-clear these laws state for a wall's line, band or wall
strips binds its line — a line admitted only where it and the band and wall strips it carries there (§4.8's rows along
the stretch profile) keep each clause, so that the line is kept from a raised way's ends by the wall strips' width there
(law 1 (4)) and, where an aqueduct's crossing is over, from its standing support by the band's half there (law 1 (2);
*the edge*) —;". (*Line and band* is the worked example every F1 citation names: the one place the reading of a line
through its band and wall strips is shown, with "ends" for "a ramp, stair or foot".)

**M4 · FIX for VF7w-TBL-01 and VF7w-TBL-02 — the root cause: *beneath*'s list** — *beneath*, the trace laid by the pull
or a cost field (l. 3079–3085): "treats as impassable to its line the impassables these laws give a trace, each widened
as the one list of them, §4.4 S5a *Trace* (2), states it (law 1 (2)–(4), (9), (10); V06 §3.7.4 (2)'s cost field taking
that list); S5a's pull keeps each arterial's crossing of the boundary as the stage's picked boundary had it, at its pin
or under its deck (§4.4 S5a *Trace* (2)); and where S5a pins gates, an arterial whose crossing of the boundary falls on a
ramp, stair or foot pins its gate on its ground course at the first point beyond the foot, the trace laid through it (a
way S5a pins no gate for meets the trace as anywhere on ground part 0)." → "searches only the shapes these laws admit,
its line read with the band and wall strips it carries there (law 1 (2)–(6), (9)–(11) and *Carried way*, read with their
terms; law 2 (a): its own cost choosing among them; *Line and band*), as §4.4 S5a *Trace* (2)'s pull and V06 §3.7.4
(2)'s cost field do; S5a's pull keeps each arterial's crossing of the boundary as the stage's picked boundary had it, at
its pin or under its deck, and a pin these laws bar there is resolved by law 2 in its order — (a) moved along its way,
the trace laid through it, (b) its way re-routed, (c) F-WALL's raised-way rung, law 2 (c)'s outcome on its path (§4.4
S5a *Trace* (2)) —; a way S5a pins no gate for meets the trace as anywhere on ground part 0." (The brief's words; the
pin's order as P2 writes it.)

**M5 · CLASS** — *No gate and no tower* (l. 3137–3154):
* "— under a standing span or a fallen one, but under an aqueduct's arches that clear it and the wall (law 1 (5)) —" →
  "— wherever law 1 (5) bars it —";
* "at generation and in an epoch circuit S5a's pin moved and the trace laid through it (§4.4 S5a *Trace* (2))" → "at
  generation and in an epoch circuit S5a's pin resolved by law 2 in its order and the trace laid through it (§4.4 S5a
  *Trace* (2))";
* "whichever is laid later keeps it out of a road deck's zone, and out of an aqueduct's strip but under arches that clear
  it, an anchor's tower out of it always (law 1 (4), (6); the fixed-place sentence)" → "whichever is laid later keeps it
  where law 1 (4)–(6) admit it (the fixed-place sentence)".

**M6 · CLASS** — *Strips, zones and nearest points* (l. 2986–2988): "— an aqueduct's over crossing admitting, under
arches that clear them by each span's recorded soffit, what law 1 (5) and (6) admit —" → "— an aqueduct's over crossing
admitting what law 1 (5) and (6) admit, each span read by its recorded soffit —".

**M7 · CLASS** — the fixed-place sentence:
* (l. 3230–3231) "an aqueduct has none, a fixed place standing in its strip only under arches that clear it and the wall
  (law 1 (5), (6))" → "an aqueduct has none, a fixed place standing in its strip only where law 1 (4)–(6) admit it";
* (l. 3244–3246) "takes no claim whose weld vertices lie where law 1 (6) bars them (in a standing road deck's zone, or in
  an aqueduct's strip but under arches that clear them)," → "takes no claim whose weld vertices lie where law 1 (6) bars
  them,";
* (l. 3258–3262) "a road deck keeps each outside its zone and an aqueduct each out of its strip but under arches that
  clear it, an anchor out of it always (law 1 (4)), and either keeps each off its ramps, stairs and feet widened by the
  strip margin (law 1 (4), (6)), as it keeps its strip clear of the trace's gates and towers" → "it keeps each where law
  1 (4)–(6) admit it (its zone, strip and ends read by these laws' terms), as it keeps the trace's gates and towers where
  law 1 (5) admits them".

**M8 · FIX for VF7w-TBL-03; CLASS** — the bent-group sentence:
* (l. 3176–3178; VF7w-TBL-03) "the strip here being the under-deck strip widened each side by the band's half there
  (§4.8's rows along the stretch profile) together with every held building's widened strip that meets it (*beneath*),
  so that every part and edge below is the band's." → "the strip here being the under-deck strip widened each side by
  the band's half there (§4.8's rows along the stretch profile) together with every place meeting it where these laws
  bar the line itself — a held building's widened strip (law 1 (9)) and, of a shape-locked raised way, each place from
  which the line's band or wall strips would lie newly across one of its `vault`-use spans' strips (law 1 (10)) —
  (*beneath*), so that every part and edge below is the band's.";
* (l. 3187–3188; VF7w-TBL-03) "each passing outside every held building's widened strip on its side;" → "each passing
  outside every such place on its side;";
* (l. 3180–3189; CLASS) "A **lawful crossing** is a part of the line that enters the strip on one long side and leaves it
  on the other, meeting the deck line once (law 1 (2)–(4)): of an aqueduct at its level — over where its channel runs
  above the wall's top, under a span that clears it or through a `cleared` support's ring (open ground, C5) where every
  span above its band, standing or fallen, clears it, its band's half at most touching a standing support's ring (*the
  edge*); merged where its channel runs within the wall's height, the band built round its arch or pier —; of a road deck
  under its span or at its support (the band laid through the support); its band and wall strips never on the ends (law
  1 (4)), and its line never in a held building's widened strip, nor its line, band or wall strips newly across a
  shape-locked raised way's `vault`-use span's strip (law 1 (9), (10))." → "A **lawful crossing** is a part of the line
  that enters the strip on one long side and leaves it on the other, meeting the deck line once, where these laws admit
  it with its band and wall strips (law 1 (2)–(4), (9), (10), read with their terms; its worked example *Where the line
  crosses*: of an aqueduct at its level, over or merged; of a road deck under its span or at its support, the band laid
  through it).";
* (l. 3199–3200; CLASS) "and a crossing on a road deck's ramp, stair or foot by the nearer, by law 3, of the first lawful
  crossing under its deck and the one beyond the foot" → "and a crossing over a road deck's ends (these laws' term) by
  the nearer, by law 3, of the first lawful crossing under its deck and the one beyond the foot".
(VF7w-TBL-03's case in words that name the place law 1 (10) bars, not the finding's "widened all round by the wall
strips' width", which would restate a widening once more. The lawful crossing becomes the citation D1 names as its
worked example; *Where the line crosses* stays the one worked example of law 1 (2)–(4) at a crossing.)

**M9 · FIX for VF7v-TBL-02** —
* the C5 column's lead (l. 3273): "a trace laid after a support is `cleared` passes through its ring as open ground," →
  "a trace laid after a support is `cleared` meets its ring as open ground, crossing through it only where these laws
  admit the crossing (law 1 (2); *Where the line crosses*),";
* W1·C5 (l. 3340; in row W1's C5 cell, the first of the two places these words stand): "through a `cleared` ring as open
  ground," → "a `cleared` ring open ground, crossed where *Where the line crosses* admits it,";
* W3·C5 (l. 3342): "*beneath* as read: through a `cleared` ring as open ground," → "*beneath* as read: a `cleared` ring
  open ground, crossed where *Where the line crosses* admits it,".
(The finding's words for the cells; for the lead a citation, where the finding's words restated law 1 (2)'s condition.)

**M10 · CLASS** — the tables:
* the way-and-channel table, row (b), its gates cell (l. 2914): "never where these laws bar a gate (law 1 (5): in a road
  deck's under-deck strip, or in an aqueduct's unless its arches there clear the gate and the wall and the way passes the
  strip by the crossing rule)" → "never where these laws bar a gate (law 1 (5), read with their terms; a gate's way under
  an aqueduct passing the strip by the crossing rule, law 2 (a))";
* row (d), its gates cell (l. 2916): "and one whose crossing falls on a ramp, stair or foot, pinned by S5a at the first
  point beyond the foot (these laws, law 1 (4)), is a gate and one of `c` where that pin is lawful (law 2 *Not yet
  built*)" → "and one whose gate these laws bar where the boundary crosses it (law 1 (1), (4), (5)) is a gate and one of
  `c` where S5a moves its pin to a lawful place (law 2 (a), *Not yet built*; §4.4 S5a *Trace* (2)), else its way
  re-routed through a gate S5b spawns (law 2 (b))";
* the crossing table, row W1, its last column (l. 3340): "S5a pins none on a deck and one beyond a foot where its
  crossing falls on a ramp, stair or foot, S5b spawns to `N_k`" → "S5a pins none on a deck and resolves a pin these laws
  bar by law 2 in its order (§4.4 S5a *Trace* (2)), S5b spawns to `N_k`";
* W1·C1 (l. 3340): "a gate, tower or fixed place of the trace under it only where its arches clear them," → "a gate,
  tower or fixed place of the trace under it only where law 1 (4)–(6) admit it,";
* W8·C1 (l. 3347): "no gate, tower or fixed place of theirs under it but where an aqueduct's arches clear them, an anchor
  under none (law 1 (4))," → "no gate, tower or fixed place of theirs under it but where law 1 (4)–(6) admit it,";
* W13·C2 (l. 3352): "where law 1 (5) bars a gate (inside a road deck's under-deck strip, or an aqueduct's unless its
  arches there clear the gate and the wall and its way passes the strip by the crossing rule)," → "where law 1 (5) bars a
  gate (read with these laws' terms; its way under an aqueduct passing the strip by the crossing rule, law 2 (a)),";
* W14's event cell (l. 3353): "would lie where law 1 (5) bars it (in a road deck's under-deck strip, or in an aqueduct's
  but under arches that clear it)," → "would lie where law 1 (5) bars it,";
* *Paths and tests* (l. 3329–3331): "no gate, postern, tower or fixed place under it but where its arches clear them, an
  anchor under none (law 1 (4); `bend.wall.aqueductArch`)," → "no gate, postern, tower or fixed place under it but where
  law 1 (4)–(6) admit it (`bend.wall.aqueductArch`),";
* the support step's (7) (l. 3369–3371): "no gate, postern, tower or fixed place under it but where an aqueduct's arches
  clear them, an anchor under none (law 1 (4))" → "no gate, postern, tower or fixed place under it but where law 1
  (4)–(6) admit it".

**M11 · FIX for VF7w-TST-05** — the crossing table's cells (the finding's words):
* W4·C2 (l. 3343): "*unchanged meeting* · T110-2 (4) (H), T114-3, T-V6-11 (E)" → "*unchanged meeting* · T110-2 (4) (H),
  T-V6-11 (E)";
* W1·C1 (l. 3340): "a shape-locked one never merged into (law 1 (10)) · T110-2 (1), (2) |" → "a shape-locked one never
  merged into (law 1 (10)) · T110-2 (1), (2), T-V7-48 (V) |";
* W5·C2 (l. 3344): "*unchanged meeting* · T114-3, T-V6-73, T110-2 (4) (H) |" → "*unchanged meeting* · T114-3, T-V6-73,
  T110-2 (4) (H), T-V7-48's decay clause (V) |";
* W6·C2 (l. 3345): "read across the span's strip by law 1 (8) · T-V6-47 |" → "read across the span's strip by law 1 (8) ·
  T-V6-47, T110-2 (4) (H) |";
* W8·C2 (l. 3347): "or in `absorbWall`'s own where none is left · T-V6-11 |" → "or in `absorbWall`'s own where none is
  left · T-V6-11, T110-2 (4) (H) |".
Scope's half is S8, V07's V7-1.

**M12 · END-L3 for VF7w-TBL-04 — a change to the laws** — law 3 (l. 2855–2856): "A line's part inside a strip that
crosses no deck line there goes to the strip's edge on the side it entered from." → "A line's part inside a strip that
crosses no deck line there leaves it on the side it entered from." Law 3 ranks only the lawful shapes law 2 (a) or (b)
leaves open, and a line on the strip's edge holds half its band inside the strip, which law 1 (4) bars; the sentence
decides the side alone, its place law 3's keys. The laws lose 3 words (J150); `adjudication-r7.md` Part L's sentence is
superseded by name (*How to read*).

### kernel (base §3)

No work: no finding, END line or class site names base §3.

### pipeline (base §4, §10, PART II, PART III)

Writes the root cause at §4.4 S5a *Trace* (2) (P1, P2) and §4.3 (P3) for VF7w-TBL-01, -TBL-02 and -GEN-01; VF7w-GEN-03
and -GEN-04 (its FIXes); the ENDs of VF7w-EPO-01 and -EPO-02; and the class's pipeline sites. P1 and P2 edit different
words of one paragraph; so do P3's two items.

**P1 · FIX for VF7w-TBL-01 and VF7w-TBL-02 (VF7w-GEN-02, -GEN-06 and VF7w-TST-01 merged) — the root cause: S5a's list** —
§4.4 S5a *Trace* (2) (l. 6602): "the impassables §2.7's laws give a trace (law 1 (2)–(4), law 1 (9) and (10); the one
list of them, which every pull, cost field and reader of them cites) impassable to it — a standing raised way's ramps,
stairs and feet widened by the wall strips' width there, its strip, widened each side by the band's half there, but to
cross its deck line once (law 1 (4)), the deck line of every road deck whose stretch there is dated after the stage's
boundary pick (S3 (7)'s stretches at stage 1, the stage's own S5b decks), where an aqueduct's channel runs above the
wall's top (its crossing there over), its standing supports and the strip of each span whose soffit does not clear the
wall's top, each widened so that the band's half at most touches the ring or that strip (*the edge*; law 1 (2): a
crossing that fits neither form unlawful), a carried way's ground course beyond each foot where the stage's boundary
crossed only its deck (law 2 *Carried way*), every held building's strip and a shape-locked raised way's `vault`-use
spans' strips, each widened all round by the wall strips' width there (law 1 (10): no line, band or wall strip across
one))" → "searching only the shapes §2.7's laws admit, its line read with the band and wall strips it carries there (law
1 (2)–(6), (9)–(11) and law 2 *Carried way*, read with their terms; law 2 (a): its own cost choosing among them; their
worked examples *beneath*'s *Where the line crosses* and *Line and band*))". (The last ")" of each closes the parenthesis
that opens at "(local ridges".) Each item the list carried is a clause or term the citation names — the ends (law 1 (4)
with its term), the strip but to cross once (4), a later deck's deck line (3 with *Order*), an over crossing's standing
supports and low spans (2; *the edge*), a deck-only crossing kept (*Carried way*), a held building's strip (9, already
widened by its term) and a shape-locked raised way's `vault`-use spans (10) —, and the reading of the band and wall
strips the line carries widens each exclusion once, by the clause that names it. *beneath* (M4) and V06's cost field
(V6-1) cite the laws in the same words, so "the one list" is no longer named anywhere.

**P2 · FIX for VF7w-GEN-01; END for VF7w-EPO-02 — the root cause: S5a's pin rule** — §4.4 S5a *Trace* (2) (l. 6603): "—
on ground part 0, a raised way met by §2.7's laws (law 1 (1), (3)–(5); its worked example *beneath*): an arterial
crossing the boundary on a raised deck pins no gate there, and the pull keeps that crossing beneath its deck — that
arterial's ground course beyond each foot of the deck, within the search band, impassable to the pull as the deck's
ramps, stairs and feet are — so the pulled trace crosses each arterial as the picked boundary did: on ground part 0 at
its pin, or under its deck (§2.7's laws, law 1 (1), (3); its worked example *beneath*), and the stage's gates are its
pins (`N_k`, §4.4 S5b); one whose crossing falls on a ramp, stair or foot, or nearer its foot than the first point
beyond the foot, pins its gate on its ground course at the first point beyond the foot (§2.7's laws' terms); and a pin
whose gate's footprint, read from the gatehouse row it will be built by, meets a raised way's under-deck strip where
§2.7's laws bar a gate (law 1 (5): any but under an aqueduct's arch that clears it), or whose band or wall strips there
would lie over a raised way's ends (law 1 (4)), moves along its arterial until both are clear, within the pull's search
band, else — a carried way's pin first re-routed as §2.7's laws, law 2 *Carried way*, says — that crossing takes
F-WALL's raised-way rung (§2.7's laws, law 1 (5); law 2 *Not yet built*, (a), (c)) —" → "— on ground part 0, a raised
way met by §2.7's laws (law 1 (1), (3)–(5); its worked example *beneath*): an arterial crossing the boundary on a raised
deck pins no gate there, and the pull keeps that crossing beneath its deck (law 1 (1), (3), law 2 *Carried way*), so the
pulled trace crosses each arterial as the picked boundary did: on ground part 0 at its pin, or under its deck (its
worked example *beneath*), and the stage's gates are its pins (`N_k`, §4.4 S5b); and a pin §2.7's laws bar where the
boundary crosses its arterial — its gate's footprint, band and wall strips read from the gatehouse row and section they
will be built by (law 1 (1), (4), (5), read with their terms; law 2 *Not yet built*) — is resolved by §2.7's laws, law
2, in its order: (a) moved along its arterial to the nearest place those laws admit it, within the pull's search band
(law 3; past a road deck's foot, the first point beyond the foot, these laws' terms); (b) else its arterial re-routed
as law 2 (b) moves a ground way, to cross the boundary at a gate those laws admit (a gate S5b spawned among them; a
carried way as law 2 *Carried way* says); (c) else that crossing goes to F-WALL's raised-way rung (§5.2), which gives it
law 2 (c)'s outcome on its path —". (The brief's form. No outcome of the old rule changes but VF7w-GEN-01's: each of its
triggers — a crossing on a ramp, stair or foot, one nearer the foot than the first point beyond it, a footprint law 1 (5)
bars, band or wall strips over the ends — is "a pin §2.7's laws bar there" read with their terms, and (a) gives the
first point beyond the foot where the old rule pinned it, within the band law 2 (a) bounds; (b) is the step the finding
found missing; (c) cites F-WALL's rung, whose row gives each path's outcome — at an epoch the wait VF7w-EPO-02 asks
for, D5 — so the finding's "at an epoch its trace waiting (`walls.waited`)" needs no words here.) F-WALL's detection is
D4.

**P3 · FIX for VF7w-TBL-01 and VF7w-GEN-04 at this site; END for VF7w-EPO-01 — the root cause: §4.3's course rule** —
§4.3 *Where it may not go* (l. 6503):
* "meets a wall by §2.7's laws (their worked example the crossing table) — an aqueduct crossing a standing wall at its
  own level, over the band on an arch or merged into it, its ramps, stairs and feet off the band and wall strips and no
  gate, postern, tower or fixed place of the trace under it but where its arches clear them, a placement-locked wall as
  an unlocked one and a shape-locked one never merged into (§2.7's laws, law 1 (2), law 1 (4)–(6), law 1 (10); its
  worked example *over the band*), and every road deck's course, a viaduct's priced in a route's solve among them,
  keeping each fixed place of a standing trace outside its zone (law 1 (6)); a road deck," → "meets a wall by §2.7's
  laws — its course, a viaduct's priced in a route's solve among them, searching only the courses those laws admit (law
  1 (2)–(6), (9)–(11), read with their terms; law 2 (a); a placement-locked wall met as an unlocked one, law 2 *Entry*;
  their worked examples *over the band* and the crossing table), an aqueduct so crossing each wall at its own level, in
  the form that level gives (law 1 (2)); a road deck,";
* "(a channel laid after it by §2.7's way-and-channel table)" → "(a channel laid after it by §2.7's laws, law 1 (1), (8);
  its worked example the way-and-channel table's row (e))".
(The finding's "its ends (… widened by `raisedWays.structure.stripMarginM`) off the band and wall strips" and VF7w-EPO-01's
"an anchor under none" would each restate one more clause; the citation names law 1 (4) with its term and law 1 (6) with
(4) for an anchor. The road deck's rest — never across a trace standing when its course is laid, at S3 (7) and S5b, a
frame growth excepted — is law 1 (3) with the pipeline's dates and stays.)

**P4 · FIX for VF7w-GEN-03** —
* §4.13's raised-way column, its `wall` row (l. 9712): "a wall laid after it — a village palisade among them — by law 1
  (2)–(9)" → "a wall laid after it — a village palisade among them — by law 1 (2)–(11)"; and "*Rung:* leave out and report
  (a road deck that cannot come down before a standing trace, at generation; at an epoch it waits, V06 §3.19 (5));" →
  "*Rung:* leave out and report (a raised way §2.7's laws give no lawful course, at generation; at an epoch it waits, V06
  §3.19 (5); a wall laid after it with no lawful shape taking law 2 (c) on its path — F-WALL's raised-way rung at
  generation and a regeneration, §5.2, F-V-RAISED at a village, V07 §3.13, `walls.waited` at an epoch, V06 §2.10);";
* §4.1's S3 row (l. 5709): "| F-SITE, F-WALL, F-CASTLE, F-RIVER |" → "| F-SITE, F-ROUTE (§4.2 S3 (7)'s re-solve of a gate
  route), F-WALL, F-CASTLE, F-RIVER |";
* §4.8 *The harbour mouth* (l. 8404): "and a chain between them:" → "and a chain between them — at the nearest heads or
  shore points along the entrance whose gate and towers §2.7's laws admit, else not laid, reported (`W_RAISED_MEETING`;
  law 1 (5), (6), law 2; its worked example the fixed-place sentence) —:".
(The finding's words for the row and the citation; for the cell's rung, "a raised way §2.7's laws give no lawful course"
in place of a second case added to "a road deck that cannot come down", and law 2 (c)'s path outcomes named by their
ladders, as F2 – F3 ask.)

**P5 · FIX for VF7w-GEN-04** — the finding's words, each old → new (l. 6503 is P3's second item):
* §4.3 *Lattice and costs* (l. 6407) and §4.4 S5c (l. 6693) — both places these words stand: "(§2.7's way-and-channel
  table, row a)" → "(§2.7's laws, law 1 (1), (8); its worked example the way-and-channel table's row (a))";
* §4.4 S5b (l. 6658): "(§2.7's way-and-channel table, row d)" → "(§2.7's laws, law 1 (3); its worked example the
  way-and-channel table's row (d))";
* §4.11 *cut* (l. 8954): "the channel meets it by §2.7's way-and-channel table (row e)" → "the channel meets it by §2.7's
  laws (law 1 (1), (8); its worked example the way-and-channel table's row (e))";
* §4.13's river cell (l. 9710): "and one laid after the course by §2.7's way-and-channel table (row e)" → "and one laid
  after the course by §2.7's laws (law 1 (1), (8); its worked example the way-and-channel table's row (e))".

**P6 · CLASS** — §4.2 S3 (7) (l. 6227):
* "or would put its gate where §2.7's laws admit none: on a ramp or stair, nearer its foot than the first point beyond
  the foot, or with its gate's footprint in a strip where law 1 (5) bars it, or the band or wall strips there over the
  ends (law 1 (1), (4), (5)) —" → "or would put its gate where §2.7's laws admit none (law 1 (1), (4), (5), read with
  their terms: its footprint, band and wall strips as the gatehouse and band rows there will build them) —";
* "(8)'s siting filter and (9)'s pull, anchors and water gates read their ramps, stairs, feet, under-deck strips and
  fixed-place zones" → "(8)'s siting filter and (9)'s pull, anchors and water gates read their ends, under-deck strips
  and fixed-place zones";
* "its gate, where law 1 (4) or (5) bars it there, moved along the way within (9)'s search band as S5a's pin is (§4.4 S5a
  *Trace* (2); §2.7's laws, law 2 (a)), and only where §2.7's laws give it no lawful gate so, the way re-routed through
  one of the stage's gates (§2.7's laws, law 2 *Carried way*, (a), (b))." → "its gate, where §2.7's laws bar it there
  (law 1 (4), (5)), resolved as S5a's pin is (§4.4 S5a *Trace* (2)) — by those laws, law 2, in its order: (a) moved
  along the way within (9)'s search band, (b) the way re-routed through one of the stage's gates as law 2 *Carried way*
  says, (c) F-WALL's raised-way rung (§5.2)."
(The first item keeps VF7-GEN-05's pick — the re-solve exactly where law 1 bars the gate — in the laws' words.)

**P7 · CLASS** — the fixed places of S3 and S5a:
* §4.2 S3 (8) (l. 6244): "and no weld vertex lies where §2.7's laws bar a fixed place — in a standing road deck's zone,
  or in an aqueduct's strip but where law 1 (5) admits a gate or tower (law 1 (6); its worked example the fixed-place
  sentence) —" → "and no weld vertex lies where §2.7's laws bar a fixed place — law 1 (4)–(6), read with their terms;
  its worked example the fixed-place sentence —";
* §4.4 S5a (1) (l. 6586): "never in a standing raised way's strip nor a road deck's zone (§2.7's laws, law 1 (4), (6);
  its worked example the fixed-place sentence)" → "never where §2.7's laws bar an anchor (law 1 (4)–(6), read with their
  terms; its worked example the fixed-place sentence)";
* §4.4 *Water and the waterfront* (l. 6618): "— never in a standing road deck's zone, nor in an aqueduct's strip but where
  law 1 (5) admits a gate there (§2.7's laws, law 1 (5), (6); its worked example the fixed-place sentence):" → "— never
  where §2.7's laws bar a fixed place (law 1 (4)–(6), read with their terms; its worked example the fixed-place
  sentence):".

**P8 · CLASS** — §4.4 S5b (l. 6653): "(a crossing on a raised deck no gate, and one on a ramp, stair or foot, pinned beyond
the foot, one of them where that pin is lawful — S5a *Trace* (2); §2.7's laws, law 1 (4), law 2 *Not yet built*; its
worked example the way-and-channel table's row (d);" → "(a crossing on a raised deck no gate, and one whose gate §2.7's
laws bar where the boundary crosses it, one of them only where S5a *Trace* (2) moves its pin to a lawful place, its way
else re-routed through a gate this step spawns — §2.7's laws, law 1 (1), (4), (5), law 2 (a), (b), *Not yet built*; its
worked example the way-and-channel table's row (d);". (Read before this step counts, as *Not yet built* and PRB7H-GEN-04
(iii) give it; the count P2's order needs.)

**P9 · CLASS** — §4.8's S7 lead (l. 8347): "no gate's, postern's or tower's footprint in its under-deck strip but under
an aqueduct's arch that clears it (law 1 (5); one whose footprint the spacing or the gate law would place there moved
clear to the nearest place the laws admit, law 2 (a), law 3), no fixed place (the laws' terms) where law 1 (6) bars it"
→ "no gate's, postern's or tower's footprint where law 1 (5) bars it (one whose footprint the spacing or the gate law
would place there moved to the nearest place the laws admit, law 2 (a), law 3), no fixed place (the laws' terms) where
law 1 (4)–(6) bar it". (The old words moved a tower in an over crossing's strip margin, under no span, past the nearest
lawful place — PRB7H-GEN-03's pick, VF7w-HND-01's case at generation.)

### determinism (base §5–§7)

Writes the root cause at §7.1's `bend.wall.raisedCrossing` row (D1) for VF7w-HND-01; the ENDs of VF7w-GEN-01 and
VF7w-EPO-02 (D4, D5); and the class's determinism sites. §7.1's lock row, §7.2, §7.3 item 4, §7.4's lock column and §5.3's
declared row keep their words (`adjudication-r7.md` Part A; J150). D4 and D5 edit different cells of §5.2's F-WALL row;
D1 and D2 different rows of §7.1's outcome table.

**D1 · FIX for VF7w-HND-01 — the root cause: §7.1's row** — §7.1's outcome table, the `bend.wall.raisedCrossing` row (l.
11343), its outcome and key cells: "| bent | the stretch's line inside the strip held to lawful crossings (§2.7's laws,
law 2 (a), law 3; its worked example the bent-group sentence) — an unlawful crossing moved to the nearest lawful one (an
aqueduct's deck line crossed once in the form its level there gives — over, under a span that clears the wall's top and
never through a standing support, where its channel runs above that top; merged where it runs within the wall's height
—, law 1 (2); under a road deck's span or beyond its foot through a gate there, whichever law 3 finds nearer), a part
along beneath or entering and leaving on one side moved to the strip's edge, an end moved to the edge, a fixed place it
lays moved along its tie to the nearest place §2.7's laws admit it (law 1 (6)), a gate it makes for a ground way inside
the under-deck strip moved along that way clear of it (none that stands under an aqueduct's arch in an over crossing
whose spans clear it, law 1 (5)) — each part of the bend, never a fate (law 4), an arch vault in a `vault` span under it
removed (one of the edit's consequences; a placement-locked one's the fate *reshaped*, law 4's (G2)); a placed or slid
gate moved along the trace to the nearest point at which §2.7's laws admit its footprint (law 1 (5)) — a `placeGate`'s
gate to the nearer such point, a slid one back to the first such point on the side its grip came from (§2.7's laws, law
2 (a), law 3; its worked example the crossing table's row W13), its stub or way following, the trace unchanged; a
castle's claim moved whole to the nearest lawful site, or its bailey to the nearest lawful area, measured back along the
drag (§2.7's laws, law 2 (a), law 3; its worked example the fixed-place sentence); the raised way unchanged; named in one
line | `bend.wall.raisedCrossing` |" → "| bent | the op's own stroke, drag or edit bent to the nearest lawful shape §2.7's
laws give (law 1 (2)–(6), (9)–(11), law 2 (a), law 3, read with their terms; its worked examples the bent-group sentence
and its lawful crossing, the fixed-place sentence and the crossing table's rows W2 and W13) — the stretch's crossings, a
gate it makes for a ground way, a fixed place it lays, a placed or slid gate and a castle's claim or bailey each moved
only as law 2 (a) moves it, to the place law 3 picks; where law 2 (a) leaves none, law 2 (b), then (c) (the row below)
—, each part of the bend, never a fate (law 4); a placed or slid gate's stub or way following it, the trace unchanged by
its move; an arch vault in a `vault` span under the stretch removed (one of the edit's consequences; a placement-locked
one's the fate *reshaped*, law 4's (G2)); the raised way unchanged; named in one line | `bend.wall.raisedCrossing` |".
(The brief's form, citing law 1 (2)–(6), (9)–(11) where the brief's "(2)–(5)" would leave the row's fixed places and
castle (6), held buildings and shape-locked spans (9), (10) and standing gates and towers (11) uncited. Its three places
close at once: a stretch's gate goes to the nearest point law 1 (5) admits, in an over crossing's margin among them; a
road deck's lawful crossing is under a span or at a support, its band laid through it; an over crossing passes a
`cleared` ring where *Where the line crosses* admits it. V09's line forms read the same moves, V9-2 and V9-5.) The bar
is S1.

**D2 · CLASS** — §7.1's outcome table, the `refuse.raised.meeting` row (l. 11344): "(law 2 (c); its worked example the
crossing table's lock sentence's (G3)) — an aqueduct, or a hand repair's" → "(law 2 (c); its worked example the crossing
table's lock sentence's (G3)) — among them an aqueduct, or a hand repair's". (The row's cause is the citation; its list
becomes its examples, so a case the list does not name — a stroke's gate with no lawful point, a shape-locked thing — is
refused by the same row.)

**D3 · CLASS** — §7.1 *Raised ways, aqueducts and retaining walls* (l. 11147–11152):
* "a course meeting an enceinte's trace comes down to a ground vertex before it and passes through the gate its ground way
  makes there" → "a course meeting an enceinte's trace comes down to a ground vertex before it, its ends where §2.7's laws
  admit them (law 1 (3), (4)), and passes through the gate its ground way makes there";
* "never a gate, a course that cannot cross so — an over crossing whose span over the band would not clear the wall's
  top, a gate, postern, tower or fixed place its arches would not clear — bent to the nearest course that can, else
  refused (item 363; §2.7's laws, law 1 (2), (5), (6), (10); law 2 (a), (c);" → "never a gate, a course §2.7's laws do
  not admit bent to the nearest course they admit, else refused (item 363; §2.7's laws, law 1 (2)–(6), (9)–(11); law 2
  (a), (c), law 3;".
(The old list cited no law 1 (4): a hand aqueduct whose end met a wall's band or strips, or an anchor under a clearing
arch, had no bend in it — a member the checks had not yet raised.)

**D4 · END for VF7w-GEN-01** — §5.2's F-WALL row, its detection (l. 9855): "or a carried way given no lawful gate and no
re-route" → "or an arterial or a carried way given no lawful gate and no re-route". (The finding's words.)

**D5 · END for VF7w-EPO-02** — §5.2's F-WALL row, its ladder cell (l. 9855): after "reading then as §4.2 S3 (9) (a)'s
unwalled stage (§2.7's laws, law 2 (c));" insert " at an epoch it takes no rung of it: the epoch's circuit, contraction
or stretch waits that epoch, counted `walls.waited` (V06 §2.10; V06 §3.7.1; §2.7's laws, law 2 (c));". (The finding's
words; P2's (c) and V6-2's second item cite it.)

**D6 · CLASS** — §7.3's S7 operator row (l. 11601): "on each standing raised way the new run meets, the meeting by §2.7's
laws (law 2 (a); its worked example the crossing table's *beneath*)" → "on each standing raised way the new run meets,
the meeting by §2.7's laws (law 2, in its order; its worked example the crossing table's *beneath*)".

### rendering (base §8, §9, §11, §12)

No work: no finding, END line or class site names the rendering unit's sections (§8.2's slot 19a describes what draws
beneath a deck and restates no exclusion; §8.11's T-ER-12 is scope's, S4).

### scope (base §0–§1, §13–§17, the index, INDEX.md)

Writes VF7w-GEN-05, -EPO-04, -RDR-03, -HND-04, -TST-02 and -TST-03 (its FIXes); the ENDs of VF7w-HND-01, -TST-05 and
-EPO-01; and the class's bars. S1, S5, S6's item 4, S8 and S9 (e) edit different words of T110-2 (4); S3 and S9 (b)
different words of T110-2 (1); S6's items 2 – 3 and S9 (c), (d) different words of T110-2 (3); S6's item 5, S7 and S9 (f)
different words of T110-2 (6); S2, S4 and S9 (a) different words of T110-2's lead.

**S1 · END for VF7w-HND-01** — §13.2's T110-2 (4) (l. 19402–19404): "a gate the wall makes for a ground way laid clear of
the under-deck strip, or under an aqueduct's arch that clears it (§2.7's laws, law 1 (5), law 2 (a))" → "a gate the wall
makes for a ground way laid at the nearest point along that way at which §2.7's laws admit its footprint (§2.7's laws,
law 1 (5), law 2 (a), law 3) — and, on a run of the hand `drawWall` across the standing aqueduct whose seed is searched
so that a ground way crossing under a span over level ground meets the new trace under that span's deck, the channel
there above the wall's top and the span's soffit clearing the wall's top but not the gatehouse's, that gate moved along
the way only until its footprint leaves the deck's plan, the footprint still meeting the under-deck strip beside the
deck, the stretch bent through it, part of its bend —". (The finding's words.)

**S2 · FIX for VF7w-GEN-05** — §13.2, T110-2's lead, the state sweep's C12 (l. 19287–19288): "C12, the deck extended by a
frame growth (on the clause's variant whose raised way ends on the frame's outer ring, §2.7 *At the frame*, the frame
grown by an epoch before the event)" → "C12, the deck extended by a frame growth (on the clause's variant whose raised
way ends on the frame's outer ring, §2.7 *At the frame* — on a clause whose fixture names none, a variant whose raised
way is declared to end there, as the aqueduct of T110-2's frame clause does —, the frame grown by an epoch before the
event)".

**S3 · FIX for VF7w-EPO-04** — T110-2 (1) (l. 19310): "V06 §3.1, §3.2, V06 §3.7.5" → "V06 §3.1, V06 §3.2, V06 §3.7.5". V06's
half is V6-6.

**S4 · FIX for VF7w-RDR-03** — §13.2, T110-2's lead (l. 19256–19257): "every clause of T110-1, T110-2 and T110-4, and every
volume bar that takes one of them or cites §2.7's laws, asserting the outcome those laws give its fixture" → "every
clause of T110-1, T110-2 and T110-4, and every bar of the base or a volume that takes one of them or cites §2.7's laws
(§8.11's T-ER-12 among them), asserting the outcome those laws give its fixture".

**S5 · FIX for VF7w-HND-04** — T110-2 (4) (l. 19430–19431): "(§2.7's laws, law 1 (5): clear of the strip, or under an
aqueduct's arch that clears it)" → "(§2.7's laws, law 1 (5), read with its terms)". (F5: the finding's "clear of the
strip, or, in an aqueduct's over crossing, where no span over it fails to clear it" would gloss law 1 (5) a third
time.) V09's half is V9-4.

**S6 · FIX for VF7w-TST-02** — §13.2; each insertion keeps every other word:
1. T110-2 (2) (l. 19334): after "the gate on ground part 0 and S4 committing the re-solved route" insert ", and the same
   on a variant whose route's first point at `T = t_1` lies past its deck's foot but nearer it than the first point
   beyond the foot (§4.2 S3 (7); §2.7's laws' terms)".
2. T110-2 (3) (l. 19365), in "the stage's `N_k` gates on ground part 0; a variant whose picked boundary crosses that
   deck", after "on ground part 0;" insert " the same on a variant whose boundary crosses that arterial past the ramp's
   foot but nearer it than the first point beyond the foot and, on a second run, where its pin's band or wall strips
   would lie over the ends of a second S4 viaduct — the pin moved along its arterial to the nearest place §2.7's laws
   admit it within the pull's search band, the trace laid through it and the stage walled with its `N_k` gates on
   ground part 0 (§4.4 S5a *Trace* (2); §2.7's laws, law 1 (4), law 2 (a), law 3) —; and, on a third run whose seed is
   searched so that those laws admit that arterial's gate at no point of it within the pull's search band while S4's
   router can re-route it, between its nearest unmoved nodes, through a lawful gate of the stage, the arterial so
   re-routed, the stage walled with its `N_k` gates on ground part 0 and F-WALL's raised-way rung not run (§4.4 S5a
   *Trace* (2); §2.7's laws, law 2 (b));".
3. T110-2 (3) (l. 19380): after "no weld vertex or gate moved after siting (§2.7's laws, law 1 (5), (6), law 2 (a));"
   insert " and on that fixture a castle sited by hand (`setAttr(castle, 'site')`) so that a weld vertex of its claim
   falls in that strip — the claim moved whole to the nearest lawful site, measured back along the drag, with
   `bend.wall.raisedCrossing`'s castle line, and, on a second run with no lawful site within the drag's reach, refused
   `refuse.raised.meeting` (§2.7's laws, law 1 (6), law 2 (a), (c), law 3; its worked example the fixed-place
   sentence);".
4. T110-2 (4) (l. 19494): after the table-edit variant's "nothing of either written (§2.7's laws, law 1 (2), (4), law 2
   (c));" insert " on a variant whose only lawful crossing of the standing aqueduct by a hand `contractWall` of the ring
   lies beyond the pull's search band but within `wall.barrierReachM`, that `contractWall` refused
   `refuse.raised.meeting`, its search band never widened (§5.2's F-WALL row; §2.7's laws, law 2 (a), (c));".
5. T110-2 (6) (l. 19567): before "; and (3)'s table-edit variant regenerated" insert "; on a fourth run whose seed is
   searched so that §2.7's laws bar that way's gate where the stage-1 boundary crosses its ground course (law 1 (4) or
   (5)) but admit one at a point of that way within the pull's search band, the gate moved along the way to the nearest
   such point and the trace pulled through it, the way not re-routed (§4.2 S3 (7); §2.7's laws, law 2 (a)); and on a
   fifth whose seed is searched so that a stage-2 boundary with a wet outer moat crosses the raised road's ground course
   beyond its foot, the way's gate a lawful pin of S5a and the way kept across the outer moat on a deck at that gate,
   never cut (§4.4 S5a *Outer moats*; §2.7's laws, law 2 *Carried way*)".
(The finding's clauses, but item 2: its "moved to the first point beyond the foot, or along its arterial until its band
and wall strips are clear" is written as P2's (a), and its third run is this file's — a bar for P2's step (b), so that
VF7w-GEN-01's fix is held as the second pass's outcomes now are.)

**S7 · FIX for VF7w-TST-03** — T110-2 (6) (l. 19533–19540), the finding's words:
* "its seed searched so that the new ring's boundary meets one of the aqueduct's supports where its channel runs above
  the ring's top —" → "its seed searched so that the new ring's boundary meets one of the aqueduct's supports and its
  channel runs above the ring's top wherever S3's pull's search band meets the aqueduct —";
* "and on (1)'s variant the crossing merged wherever the boundary meets the deck line where its channel runs within the
  ring's height" → "and on (1)'s variant, its channel within the ring's height wherever that search band meets the
  aqueduct, the crossing merged wherever the trace crosses the deck line".

**S8 · END for VF7w-TST-05** — T110-2 (4) (l. 19428–19429): "a hand `delete` of the run (W11), a hand `placeGate` inside
the under-deck strip" → "a hand `delete` of the run (W11), a hand `convert` `gateToJunction` of a gate of that run beside
the raised way (W6) and a hand `convert` `absorbWall` of its ring (W8), a hand `placeGate` inside the under-deck strip".

**S9 · CLASS, with the END for VF7w-EPO-01 (item (d))** — six bars of T110-2 written in F5's words (S0 already makes each
assert the laws' outcome; these words make each say it):
* (a) the state sweep's C10 (l. 19283–19284): "— no gate, tower or fixed place under it save under an aqueduct's arch
  that clears it (§2.7's laws, law 1 (5), (6)) —" → "— no gate, tower or fixed place under it but where §2.7's laws admit
  it (law 1 (4)–(6)) —";
* (b) T110-2 (1) (l. 19328–19330): "the water gate and the weld vertex outside it save under an arch that clears them
  (§2.7's laws, law 1 (4)–(6), law 2 (a);" → "the water gate and the weld vertex in it only where §2.7's laws admit them
  (law 1 (4)–(6), law 2 (a);";
* (c) T110-2 (3) (l. 19364–19365): "no ramp, stair or foot under the band, its wall strips or the channel (§2.7's laws,
  law 1 (4))," → "no raised way's ends under the band, its wall strips or the channel (§2.7's laws, law 1 (4); these
  laws' *ends*),";
* (d) T110-2 (3) (l. 19382–19384; VF7w-EPO-01's END): "in a road deck's fixed-place zone or in an aqueduct's under-deck
  strip but where §2.7's laws, law 1 (5) and (6), admit one, and 0 gates' or towers' footprints in an under-deck strip
  save under an aqueduct's arch that clears them (§2.7's laws, law 1 (5), (6);" → "where §2.7's laws, law 1 (4)–(6), bar
  one, and 0 gates' or towers' footprints where law 1 (5) bars one (§2.7's laws, law 1 (5), (6);";
* (e) T110-2 (4) (l. 19463–19464): "of the ring's gates, towers and fixed places save under an arch that clears them
  (§2.7's laws, law 1 (2), (5), (6), law 2 (a);" → "of the ring's gates, towers and fixed places but where §2.7's laws
  admit them (law 1 (2), (4)–(6), law 2 (a);";
* (f) T110-2 (6) (l. 19554–19555): "clear of the ring's standing towers, gates and fixed places save under an arch that
  clears them (§2.7's laws, law 1 (2), (5), (6);" → "clear of the ring's standing towers, gates and fixed places but
  where §2.7's laws admit them (law 1 (2), (4)–(6);".
(Item (d) is VF7w-EPO-01's scope END in citation form, not the finding's "an anchor in none (law 1 (4))" added to a
gloss. Each old gloss of law 1 (5) and (6) would fail a correct build that leaves a gate, tower or fixed place in an
over crossing's strip margin, under no span — the case VF7w-HND-01 found — but for S0.)

### V01

No work.

### V02

No work.

### V03

No work.

### V04

**V4-1 · FIX for VF7w-TST-04** — T-V4-63 (V04 l. 3164): "passed beneath by an epoch circuit and, on a second run, by a hand
`drawWall`" → "passed beneath by an epoch circuit (its seed searched so that the circuit's line crosses the deck line
under that span; §2.7's laws, law 2 (a)) and, on a second run, by a hand `drawWall`". (The finding's words.)

### V05

No work.

### V06

Writes the root cause's cost field (V6-1); VF7w-EPO-01, -EPO-02, -EPO-03 and -EPO-04 (its FIXes); and the class's V06
sites. V6-2's two items edit different sentences of §3.7.1; V6-4's two items different words of §3.19 (5).

**V6-1 · the root cause: V06 §3.7.4 (2)'s cost field; FIX for VF7w-EPO-01 at this site** — V06 §3.7.6 (5):
* its first bullet (V06 l. 1611–1613): "and V06 §3.7.4 (2)'s cost field takes as **impassable** the impassables §2.7's
  laws give a trace (law 1 (2)–(4), (9), (10); the list §4.4 S5a *Trace* (2) gives the pull, each widened as it says),
  none demolished for a wall;" → "and V06 §3.7.4 (2)'s cost field searches only the shapes §2.7's laws admit, its line
  read with the band and wall strips it carries there (law 1 (2)–(6), (9)–(11) and law 2 *Carried way*, read with their
  terms; law 2 (a); as §4.4 S5a *Trace* (2)'s pull does), none demolished for a wall;";
* its second bullet (V06 l. 1614–1622): "the trace meets it by §2.7's laws — an aqueduct crossed where the trace's line
  crosses its deck line, at the aqueduct's level in the form that level gives: over where its channel runs above the
  wall's top and every span over the band clears it, merged where its channel runs within the wall's height (law 1
  (2)); a road deck crossed under its deck, the band built through its supports (law 1 (3)), its ramps, stairs and feet
  passed beyond the foot (law 1 (4)); a stretch laid through no cost field by §2.7's laws, law 2 (a) with law 3 (its
  worked example the bent-group sentence); no station, gate or opening made on a deck (law 1 (1)); no gate, postern or
  tower in the under-deck strip but in an aqueduct's over crossing whose spans clear it (law 1 (5)), and no fixed place
  in a road deck's fixed-place zone, nor in an aqueduct's strip but where law 1 (5) admits one (law 1 (6) with law 2;
  its worked example the fixed-place sentence); the moat" → "the trace, its gates, posterns and towers and its fixed
  places meet it by §2.7's laws, each taking only a shape those laws admit (law 1 (1)–(6), (9)–(11), read with their
  terms; law 2 (a), a stretch laid through no cost field with law 3, its worked example the bent-group sentence; a fixed
  place's, its worked example the fixed-place sentence; their worked example the crossing table's *beneath*); the moat".
(The brief's form; VF7w-EPO-01's anchor is law 1 (4)'s in the citation.)

**V6-2 · FIX for VF7w-EPO-01 and VF7w-EPO-02; CLASS** — V06 §3.7.1:
* (V06 l. 1470–1476; VF7w-EPO-01, CLASS) "a standing raised way's under-deck strip, supports, ramps, stairs and feet
  excepted where the trace meets it (§2.7's laws, law 1 (2)–(4); its worked example the crossing table's *beneath*) —
  never a held building's strip or a shape-locked raised way's `vault`-use span's strip, which the trace keeps clear (law
  1 (9), (10)), and no fixed place of the trace in a standing road deck's fixed-place zone, nor in an aqueduct's strip but
  where law 1 (5) admits a gate or tower there (law 1 (6) with law 2; its worked example the fixed-place sentence) —" →
  "a standing raised way's under-deck strip, supports and ends excepted where the trace meets it as §2.7's laws admit,
  and only so, the trace and its fixed places taking only shapes those laws admit (law 1 (2)–(6), (9)–(11), read with
  their terms; law 2 (a); its worked examples the crossing table's *beneath* and the fixed-place sentence) —";
* (V06 l. 1479–1480; VF7w-EPO-02) "F-WALL's ladder (§5.2) binds the trace; a trace that fails it leaves the stage
  unwalled, the circuit re-evaluated at the next growth (reported)." → "F-WALL's ladder (§5.2) binds the trace; a trace
  that fails it leaves the stage unwalled, the circuit re-evaluated at the next growth (reported) — one §2.7's laws give
  no lawful meeting with a standing raised way taking no rung of that ladder and counted `walls.waited` (§2.7's laws, law
  2 (c); V06 §2.10; V06 §3.7.6 (5))."
(VF7w-EPO-01's "an anchor in none" is the citation's law 1 (4). VF7w-EPO-02's words, its list of what has no lawful
meeting written as "§2.7's laws give no lawful meeting" — the class; what a waiting circuit does to its stage stays
§3.7.1's unwalled stage, the general question held, *Held* item 1.)

**V6-3 · FIX for VF7w-EPO-02** — V06 §3.17 (3) (V06 l. 2496–2497): "a circuit whose trace fails leaves the stage unwalled
(V06 §3.7.1)" → "a circuit whose trace fails leaves the stage unwalled (V06 §3.7.1; one §2.7's laws give no lawful
meeting with a standing raised way counted `walls.waited`, never taking F-WALL's raised-way rung: law 2 (c))". (The
finding's words.) §5.2's half is D5.

**V6-4 · FIX for VF7w-EPO-01; CLASS** — V06 §3.19 (5):
* (V06 l. 2853–2856; VF7w-EPO-01) "and each fixed place of a standing curtain, with its footprint, to a road deck's
  fixed-place zone and to an aqueduct's under-deck strip but where law 1 (5) admits a gate or tower there (law 1 (6) with
  law 2; its worked example the fixed-place sentence)," → "and each fixed place of a standing curtain, with its
  footprint, to the course's strip, zone and ends wherever §2.7's laws bar it there (law 1 (4)–(6), read with their
  terms; its worked example the fixed-place sentence),";
* (V06 l. 2861–2870; CLASS) "— by §2.7's laws, nothing of either written (law 1 (2)–(6), law 2): an aqueduct *over the
  band* (J-V6.140), crossing the curtain at its own level in the form that level gives — over where its channel runs
  above the wall's top and every span over the band clears it, merged where its channel runs within the wall's height, a
  shape-locked curtain never merged into (law 1 (2), (10)) —, its under-deck strip clear of the curtain's gates, posterns
  and towers but where its arches clear one in an over crossing (law 1 (5)); a road deck *down before the wall* (law 1
  (3) with law 2 (a)), its under-deck strip clear of the curtain's gates, posterns and towers (law 1 (5)), founded with
  its two ends fixed, so not founded where its course would cross a standing curtain or a curtain's line, band or wall
  strips would lie over an end of it (law 1 (4)): it waits, `raised.waited` (law 2 (c))." → "— by §2.7's laws, nothing of
  either written, its course searching only the courses those laws admit against every standing curtain (law 1 (2)–(6),
  (9)–(11), read with their terms; law 2 (a)): an aqueduct *over the band* (J-V6.140), crossing each curtain at its own
  level in the form that level gives (law 1 (2)); a road deck *down before the wall* (law 1 (3) with law 2 (a)), founded
  with its two ends fixed; a candidate with no such course — a road deck's among them wherever its course would cross a
  standing curtain — not founded: it waits, `raised.waited` (law 2 (c))."
(The old "its under-deck strip clear of the curtain's gates, posterns and towers but where its arches clear one" would
have a founding wait where a standing gate in an over crossing's strip margin, under no span, leaves a lawful course —
VF7w-TBL-02's outcome on the epoch path; the citation admits that course.)

**V6-5 · FIX for VF7w-EPO-03** — V06 §7's T110-2 founding row (V06 l. 4173): "and the founding across a retaining wall
drawn by hand and placement-locked," → "and the foundings across a ring and a retaining wall drawn by hand and
placement-locked,". (The finding's words.)

**V6-6 · FIX for VF7w-EPO-04** — T-V6-73 (V06 l. 4255): "V06 §3.1, §3.2, V06 §3.7.5" → "V06 §3.1, V06 §3.2, V06 §3.7.5".
The base's half is S3.

**V6-7 · CLASS** — T-V6-47 (V06 l. 4229):
* "no ramp, stair or foot under the wall's line, band or wall strips (law 1 (4))," → "no raised way's ends under the wall's
  line, band or wall strips (law 1 (4); §2.7's laws' *ends*),";
* "0 trace lines, bands or wall strips over a ramp, stair or foot (law 1 (4))" → "0 trace lines, bands or wall strips
  over a raised way's ends (law 1 (4))".

### V07

Writes the END of VF7w-TST-05 and the class's V07 sites. V7-1 and V7-3 edit different words of T-V7-48.

**V7-1 · END for VF7w-TST-05** — T-V7-48 (V07 l. 3710): "of the palisade's run beneath the carried-down deck" → "of the
palisade's run beneath the carried-down deck and, on a second run, beneath the declared viaduct". (The finding's words.)

**V7-2 · CLASS** — V07 §3.5a (4) (V07 l. 1615–1623):
* "its line by §2.7's laws (law 1 (2)–(4), law 2 (a), law 3; its worked example the bent-group sentence) — crossing an
  aqueduct's deck line in the form the aqueduct's level there gives and a road deck's carried way beyond its foot, never
  across a ramp, stair or foot, never running along within or ending inside an under-deck strip — and its anchors by law
  1 (6) with law 2 (its worked example the fixed-place sentence);" → "its line, band and wall strips by §2.7's laws,
  taking only shapes they admit (law 1 (2)–(4), (9)–(11), read with their terms; law 2 (a), law 3; its worked example the
  bent-group sentence), and its anchors only where law 1 (4)–(6) admit them (law 2; its worked example the fixed-place
  sentence);";
* "placed by §2.7's laws (law 1 (5), law 2 (a), law 3: off a road deck's under-deck strip and `raised.supportClearM` off a
  support's ring, under an aqueduct's arch only where the crossing is over and every span over it clears it)," → "placed
  where §2.7's laws admit it (law 1 (5), read with its terms; law 2 (a), law 3) and `raised.supportClearM` off a support's
  ring, as VS4's tracker keeps (V07 §3.5a (3)),".
(The old anchor rule cited law 1 (6) alone — VF7w-EPO-01's member at the village; the gate's gloss barred an over
crossing's margin. `raised.supportClearM` is V07's own clearance, not a law, and stays.)

**V7-3 · CLASS** — T-V7-48 (V07 l. 3710):
* "no ramp, stair or foot in it," → "no raised way's ends under its line, band or wall strips (§2.7's laws, law 1 (4)),";
* "0 gates in an under-deck strip but under an aqueduct's arch clearing the palisade and the gate (§2.7's laws, law 1
  (5))," → "0 gates where §2.7's laws, law 1 (5), bar one,".

### V08

No work.

### V09

Writes VF7w-RDR-01, -HND-02 and -HND-03 (its FIXes), the END of VF7w-HND-04 and the class's V09 sites. V9-2 and V9-5 edit
different cells of `bend.wall.raisedCrossing`.

**V9-1 · FIX for VF7w-RDR-01** — V09 §2.7's why card, the `decidedBy` row (V09 l. 648): "a span walled up by the rules
(one read `vault`: none under a wall, V09 §4.20.6 (2))" → "a span walled up by the rules (one §2.7's laws read `vault`,
law 1 (8); its worked example *beneath*; V09 §4.20.6 (2))". (The finding's words.)

**V9-2 · FIX for VF7w-HND-02** —
1. V09 §4.9's `bend.wall.raisedCrossing` (V09 l. 2104), its line cell: "for a crossing moved along {way} to the nearest
   lawful one (under an arch that clears the wall, or beyond a road deck's foot through a gate there)" → "for a crossing
   moved along {way} to the nearest lawful one (§2.7's laws, law 1 (2)–(4), law 3; its worked example the bent-group
   sentence (i))".
2. V09 §4.9's `bend.raised.wall` (V09 l. 2102), its line cell: after "for its Arch spacing, Deck height or width bent to
   the nearest lawful value, "{way}'s {measure} is {v}, the nearest that {wall} allows."" add " — and, for a raised or
   aqueduct stroke bent where §2.7's laws, law 1 (4), bar it (along a wall, or an end under its band or wall strips),
   "{way} keeps clear of {wall}, {m} m off your line.""; its source cell: after "(§2.7's laws, law 2 (a), law 3; its
   worked example the crossing table's C13)" add "; a raised or aqueduct stroke bent off a wall it would run along or end
   under (§2.7's laws, law 1 (4), law 2 (a), law 3)".
(The finding's words, the second form's trigger a citation of law 1 (4) rather than "a wall whose band its strip would
hold without crossing its line", which restates it; an end under a wall's band or strips takes the same form.)

**V9-3 · FIX for VF7w-HND-03; CLASS** — `bend.wall.aqueductArch` (V09 l. 2103), its source cell: "an aqueduct drawn across
a standing wall, held or not (§7.1's *Raised ways, aqueducts and retaining walls*; §2.7's laws, law 1 (2), (5), (6),
(10), law 2 (a); its worked example *over the band*)" → "an aqueduct drawn across a standing wall, placement-locked or
not, a shape-locked one never merged into (§7.1's *Raised ways, aqueducts and retaining walls*; §2.7's laws, law 1
(2)–(6), (9)–(11), law 2 (a), law 3; its worked example *over the band*)". (The finding's words; the citation that of
§7.1 *Raised ways* as D3 writes it.)

**V9-4 · END for VF7w-HND-04** — T-V9-52 (V09 l. 4428): "— crosses it clear of the strip, with `bend.raised.underSpan` in its
wall form," → "— crosses it at the nearest point at which §2.7's laws admit its gate (law 1 (5), law 2 (a), law 3), with
`bend.raised.underSpan` in its wall form,". (The finding's words less its gloss "clear of the strip on the merged
variant", which the citation decides.)

**V9-5 · CLASS** —
* §4.20.2 (4) (V09 l. 3022–3023): "never a gate, a course that cannot cross so bent to the nearest course that can, else
  refused (§2.7's laws, law 1 (2), (5), (6), (10), law 2 (a), (c);" → "never a gate, a course §2.7's laws do not admit
  bent to the nearest course they admit, else refused (§2.7's laws, law 1 (2)–(6), (9)–(11), law 2 (a), (c), law 3;";
* `bend.wall.raisedCrossing` (V09 l. 2104), its source cell: "either side locked, pinned or neither (§2.7's laws, law 1
  (4)–(6), law 2 (a), law 3;" → "either side locked, pinned or neither (§2.7's laws, law 1 (2)–(6), (9)–(11), law 2 (a),
  law 3;".
(§7.1's half is D3 and D1: the panel's text and the catalogue cite what the outcome row cites.)

### V10

No work.

### V11

**V11-1 · FIX for VF7w-RDR-02** —
* row 80 (V11 l. 1006), its readers cell: after "by §2.7's laws, law 1 (2), (4)–(7), V07 §3.5a (4))," insert " EVO_FORT
  (V06 §3.7.6 (5): the fortification phase's traces and harbour-mouth chains meeting a raised way's under-deck strip, ends
  and fixed-place zone at `structure.stripMarginM`, and each span's soffit by `structure.span.deckDepthCm`, by §2.7's
  laws, law 1 (2), (4)–(7) — a trace it lays through S5a's trace step reading under `S5a`, J-V11.109), S1 (a wall run S1's
  water operator re-traces beside a standing raised way, read against its strip and fixed-place zone at
  `structure.stripMarginM` by §2.7's laws, law 1 (4)–(6); §7.3 (b) 3, §5.2's F-REDERIVE),";
* W50 (V11 l. 208): "§2.7's laws at S3, S5a, S7 and VS3 (law 1 (4)–(6); its worked example the crossing table)" →
  "§2.7's laws at S3, S5a, S7, VS3, EVO_FORT and S1 (law 1 (4)–(6); its worked example the crossing table)".
(This file's words for EVO_FORT: V11 §3.1's *Readers* records a read under the StageId of the stage function that reads
(J-V11.109), so an epoch's circuit, laid through S5a at `growth`, already reads under `S5a`; EVO_FORT names the
fortification phase's own traces and chains — the finding's "circuits, shorter rings, re-anchored and repaired
stretches, quay walls and harbour-mouth chains" would list a read twice.)

### V12

No work.

## Builders' choices for fix-list.md

None from this pass: no finding of the third run is a valid choice (J151), and no text this file writes leaves one.
The five choices `adjudication-r7w.md` listed (VF7v-TBL-04, -TBL-05, -GEN-05, -EPO-06, -RDR-05) and the two
`adjudication-r7v.md` listed (VF7-GEN-06, VF7-RDR-07) stand as written there.

## Held for the next full round

Outside the family; never graded here (the checks' 13 held notes, each with its site).

1. (epochs) V06 §3.7.1 (V06 l. 1479–1480) × §3.7.6 (2) (V06 l. 1573–1574) × §3.17 (3), (7) (V06 l. 2496–2497,
   2508–2510): for a circuit that cannot hold water access and the occupied-footprint rule, whether the walled stage grows
   unwalled that epoch or waits whole, and whether the circuit is tried again at the next epoch or only at the next
   growth, is unstated — wall × water and footprints.
2. (epochs) `adjudication-r7w.md`'s held notes 1 and 2 persist: V07 §3.5a (5), (7) × §2.7's support step (6) (a plot
   under a `vault` span at a village rung); V06 §3.11.6 and II.7.6's `raiseGrade` (what a raised region does to a run or a
   raised way standing in it).
3. (generation) §4.3 *Trade flow* (l. 6529–6533) × §4.2 S3 (13) (l. 6365–6366) × S3 (7) (l. 6227): a carried way's stage-1
   gate is no pick and has no bearing, so as a `main` gate (VF7-GEN-06's listed choice) its trade weight and destination
   bearing are undefined — trade flow.
4. (generation) `adjudication-r7v.md`'s held items 1–3 stand: S3 (9)'s **Test** against F-WALL's non-raised rung; a (5)
   route's re-crossing of `T = t_1`; S3 (5)'s raised stretch over a canal dropped at S4.
5. (hand) Base §7.3 (b) 3 (l. 11695): "it cuts every other way the new channel ⊕ bank setback meets" names no exception
   for a raised way whose deck passes over a moved river's new channel — raised way × water (`adjudication-r7w.md`'s held
   note 3).
6. (readers) V04 l. 2892 (§5.5's CityJSON row) × base §11.1's CityJSON row (l. 16729): an arch vault exported as a
   `TunnelHollowSpace` of the `vaults` system's `Tunnel` and as a `BridgeRoom` of its raised way's `Bridge` — two objects
   for one chamber (held note 4).
7. (readers) V04 l. 222–223, 2727–2728 × base §8.2's `raisedWay` program (l. 13557–13560): V04 leaves the vault's infill
   wall and door on the ground view to the base, whose program draws neither (held note 5).
8. (readers) `adjudication-r7v.md`'s held notes 5–7 persist: V09 l. 3258's and §11.2's (l. 17108) span path against
   §7.1's `spans/<a>-<b>`; T-V9-58's fixture (V09 l. 4434); §4.5's and §8.4's casters on a `breached` or `dismantled`
   run (l. 6888, 14412–14413, 14637–14638).
9. (readers, new) Base §8.2's slot resolution (l. 14182–14183) × slot 10 (l. 14149) × slot 19a (l. 14161): a sheet is
   refused when one `derived` kind is placed in two slots of a band, while slot 19a draws the decks' shadows in a derived
   pass with no `derived` kind named — a raised way's drawing, no wall meeting.
10. (readers, new) Base §8.2's `OrderSlot.slot: number` (l. 13314) × the lettered rows 8b, 9b, 13b, 15b, 19a, 19b: no
    numeric form of a lettered slot is stated, 19a the first `a` beside a `b`.
11. (tests) V09 T-V9-52 (V09 l. 4428): "a road drawn across a viaduct crosses under its nearest `open` span" pins the
    span row (b) gives by §4.3's crossing rule — a raised way with a ground way (held item 8).
12. (tests) V07 §3.12 item 7 and T-V7-51 (V07 l. 2627, 3713): "crosses the hand-off up held" means carried unchanged,
    while §2.7's *held* now means locked — a rung hand-off (held item 9).
13. (tests) Base §13.2 T110-2 (6) (l. 19532): "that route re-solved to cross under the nearest span the rule admits" pins
    a place a route solve's own cost chooses — a raised way with a ground way (held item 10).

Every other held note of `adjudication-r7v.md` and `adjudication-r7w.md` stands as written there; `adjudication-r7w.md`'s
note 6 (fields, trees and boundary treatments over decks) is closed by slot 19a, as the readers check confirms.
