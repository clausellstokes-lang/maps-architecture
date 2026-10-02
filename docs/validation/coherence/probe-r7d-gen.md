# Probe round 7, pass 4 (lens: generation and regeneration) — the family's LAWS (Part L, J146)

> Seat `coherence/probe-r7d-gen` (orchestrator brief `workflows/lane-prompts/coherence-cloud/coherence_probe-r7d-gen.prompt.txt`,
> 2026-10-02), one of the three parallel lens seats of the laws probe (J145). Its lens is the pipeline's meetings in the
> order it runs — S3's gate routes, priced decks, weld vertices and stage-1 trace; S4's viaducts; S5a's trace and pull;
> S5b's spawned primaries; S6's elevated roads and aqueducts; S7's strips, towers and gates; S10's band —, a regeneration
> under held raised ways with its re-solved routes, the fixed-place class (water gates, anchors, welds), and the gate
> counts, §5.3's checks, §5.2's F-WALL and F-ROUTE and §5.4's warnings against the laws. It attacks Part L (the laws) as
> one general resolver, under J146's grading: a finding only where the laws give two outcomes or none (a), cross an owner
> rule (b), leave a law-1 invariant unchecked by §5.3's row and T110-4 (c), or an example contradicts a law (d, minor). A
> case missing from the examples is no finding. It changes no design text; each finding gives the words to amend in
> adjudication-r7.md for the amend seat to rule. Every reading of the owner's words is the program's (J122), never the
> owner's. (The brief's first paragraph names this file `probe-r7d-gen.md`; its WRITE section's `probe-r7d-gen-gen.md`
> is read as that name, as the time lens named `probe-r7d-time.md`.)

**Line references.** `adj l.` = `docs/validation/coherence/adjudication-r7.md`; `base l.` = `docs/ARCHITECTURE.md`;
`V04 l.` = `docs/volumes/V04-underground.md`; `PROGRESS l.` = `docs/PROGRESS.md`; all at the tree of commit `aecf42c`
(Part L landed). Part L: Terms adj l. 230–265, law 1 l. 267–288, law 2 l. 290–338, law 3 l. 340–350, law 4 l. 352–362, the
check l. 364–366, the five corrections l. 368–385, the restated veto list l. 388–447.

**Method.** Each op of the lens was run as a builder would code the laws: (1) the law-1 invariants it can break; (2) which
side is newer on that path; (3) law 2 (a), then (b), then (c); (4) law 3's tie-break; (5) law 4's re-check, fate and
report. The ops that the laws decide uniquely are listed after the findings (*Ops tried that the laws decide*), so the
coverage is visible.

**Totals.** 11 findings — 1 blocker, 7 major, 3 minor. The blocker (PRB7D-GEN-01) is the generation and regeneration side
of the time lens's PRB7D-TIM-01 (one defect, one fix; listed so this lens's evidence reaches the amend seat). Majors: the
order of law 2 (a) and (b) as Part L's correction 1 and veto 6 state it (GEN-02); law 2 (b) after a search fails
(GEN-03); the wall strips' width on a moated stretch and where two walls share a place (GEN-04); "held" undefined
(GEN-05); law 1 (3)'s order stored nowhere, so unchecked (GEN-06, clause (c)); a held road deck's carried way under a
trace laid after it (GEN-07); law 3's tie on a closed line or a line with no stored order (GEN-08). Minors: R7-03 (a)'s
exclusion against its own trigger (GEN-09), E-D11's F-WALL rung stricter than law 2 (c) (GEN-10), §5.4's
`W_RAISED_MEETING` against law 2 (c)'s generation outcomes (GEN-11).

## Summary

| id | severity · clause | law or term | the case and the gap in one line |
|---|---|---|---|
| PRB7D-GEN-01 | blocker · (a) | law 1 (8)'s "has its chamber" with law 1's "after every commit" and the check's "every stage end" | from S4's and S6's span rule to the underground tail (after the first map), and in every build before M6-U, a `vault` span with nothing across has no chamber: §5.3's row fails every CITY generation and regeneration (= PRB7D-TIM-01, generation side) |
| PRB7D-GEN-02 | major · (a) | law 2 (a) then (b) × correction 1 and veto 6 | a raised way laid after a wall: law 2 bends or searches it clear of the wall's gates and towers; correction 1 and veto 6 move the gate or tower first, the bend being the veto option |
| PRB7D-GEN-03 | major · (a) | law 2 (b) for an op that searches; law 3; the reach | when a search finds no lawful shape, (b) has no shape whose meeting it reshapes: the own-cost course with gates and towers moved, or the course of least displacement; "each gate's way following it" has no operator at generation |
| PRB7D-GEN-04 | major · (a) | the wall strips and their width (Terms) | on a moated stretch outer setback + berm (the term's words) or berm alone (§4.8, which it cites), with the moat not yet carved when S3 (7) and S5b place a gate beyond the foot — under §4.8's reading no lawful outcome; at a weld vertex or welded stretch, two walls' widths |
| PRB7D-GEN-05 | major · (a) | "held" (law 1 (10), law 2 *Newer*, law 4's (G2)) | every raised way (the support step's held, Newer's gloss) or §7.2's locked, pinned or declared: `reshaped` entries at every generation or none; and what a hold on a ring holds — its towers and gates stand at a regeneration or are re-laid by S7 |
| PRB7D-GEN-06 | major · (c) | law 1 (3) — "laid after the deck's course"; the check (E-D13); T110-4 | the order law 1 (3) turns on is stored in no record (`Lifecycle.since` seq 0 for a whole generation run, no run or course date), and the lawful and unlawful crossings have one geometry: §5.3's row cannot check (3) after the generation run, so T110-4 cannot |
| PRB7D-GEN-07 | major · (a) | law 2 *Carried way* × *Newer* (a creation prefix; a regeneration) | a held raised road's carried ground way that a trace laid after it crosses: S3's gate law gives gates only to its own routes; a gate by forced pick, no gate (ungated, against §5.3), or the drawing's old gate held |
| PRB7D-GEN-08 | major · (a) | law 3's ties ("nearer the start of that line ... then the lower address") | on a closed line (a ring, a curtain, a lake or island shore) two readings (forward arc length or the shorter way round); on a terrain cliff top, gorge rim, marsh edge or harbour entrance no start; the address cannot part two points |
| PRB7D-GEN-09 | minor · (d) | R7-03 (a)'s exclusion (example) × law 2 (a) | a deck wholly outside the boundary with its foot nearer than beyond the foot: the trigger fires, the exclusion removes no edge, the same unlawful gate returns |
| PRB7D-GEN-10 | minor · (d) | E-D11's F-WALL raised-way rung (example) × law 2 (c) | the rung makes the whole under-deck strip impassable but at "lawful crossings"; law 2 (c) re-lays with law 1's exclusions only |
| PRB7D-GEN-11 | minor · (d) | E-D11's §5.4 comment and the fixed-place sentence (examples) × law 2 (c) | `W_RAISED_MEETING` named for S7's chain but listed for S3, S5a and VS3 only; a raised way not built for a meeting has no key |

## Part 1 — what the laws require at a step that cannot yet hold it

### PRB7D-GEN-01 — BLOCKER · (a) — law 1 (8)'s chamber between the span rule and the underground tail (the generation side of PRB7D-TIM-01)

**Law or term.** Law 1 (8) "and has its chamber (`collapsed` where V04 §3.5.4 (d) (2) says) while nothing does" (adj
l. 284–285), under law 1's lead "After every commit, on every path, at every rung" (adj l. 267) and *The check* "at every
stage end and every commit on every path" (adj l. 364); E-D13's scope "stage-end (every stage) and batch-local (every
commit, on every path: generation, a regeneration, ...)" (adj l. 1771–1772).

**Case.** A first generation, a Regenerate (keep) or a New random at CITY whose S4 viaduct or S6 aqueduct has a span the
span rule rules `vault` with nothing across its strip; and every such document built at a milestone from M3a (raised
ways) to M6-U (arch vaults).

**Claim.** The span rule runs "eagerly at the end of the raised way's generation" (base l. 2729), inside S4's route solve
or at S6's end (base l. 2557–2560), and marks spans `vault`; the chamber is "built with the underground layer (M6-U)"
(base l. 2747–2748), laid by "U-SYS's vaults step (T2)" (V04 l. 867; V04 l. 328: "the tail's T2 vaults step"), and the
tail runs "after the first map" and is absent before its milestone (base l. 4943, 4948–4949). So at every stage end from
S4 through S15, at every generation and regeneration, and in every build before M6-U, a `vault` span with nothing across
its strip has no chamber — a state law 1 (8) calls invalid, which E-D13's row reports as `E_INVARIANT` on a correct
build. Law 2 *Not yet built* (adj l. 304–308) speaks of "a step [that] reads" a part not yet built, not of law 1's
invariant: one builder reads the row's chamber clause through it and passes, another reads it as written and fails every
CITY generation with a `vault` span; before M6-U no step will ever build the chamber, so no reading passes. The time lens
reports the same defect from the epoch side (PRB7D-TIM-01); this is its generation and regeneration evidence, one fix.

**Amended words (Part L).** Law 1 (8): "8. a `vault` span is read `open`, with no chamber, while anything lies across its
strip, and has its chamber (`collapsed` where V04 §3.5.4 (d) (2) says) while nothing does — its record unchanged either
way;" → "8. a `vault` span is read `open`, with no chamber, while anything lies across its strip, and — once the commit
that lays its raised way's arch vaults has run (at generation and at a regeneration the underground tail's vaults step,
V04's T2, after the first map; at an epoch V06's `under.extend`; by hand the edit's own commit; never before the
underground layer's milestone, M6-U) — has its chamber (`collapsed` where V04 §3.5.4 (d) (2) says) while nothing does —
its record unchanged either way;". E-D13's row: "one with nothing across with its chamber" → "one with nothing across
with its chamber (from the commit that lays its raised way's arch vaults: §2.7's laws, law 1 (8))".

## Part 2 — law 2's order and its standing structure

### PRB7D-GEN-02 — MAJOR · (a) — correction 1 and veto 6 run law 2 (b) before law 2 (a)

**Law or term.** Law 2 (a) and (b) (adj l. 316–324); Part L's correction 1 (adj l. 372–374); the restated veto item 6
(adj l. 407–410); J146's method (PROGRESS l. 205).

**Case.** A Regenerate (keep) of a CITY whose stage-1 ring was drawn by hand (held, its towers and gates standing before
every stage, law 2 *Newer*, adj l. 302) and whose S6 aqueduct, re-laid after it, has a least-cost course whose under-deck
strip would meet one of the ring's towers or gates; and a first generation whose S6 aqueduct's least-cost course meets the
footprint of a main gate fixed at S3 (7) or by S5a's pin (read by *Not yet built*).

**Claim.** Law 2 orders: "(a) The newer structure is laid lawfully first ... an op that searches for its shape — a pull
or cost field, a route solve, a castle's siting, ..., a raised way's course ... — searches only shapes law 1 admits ...
(b) Failing that, the standing structure's shape changes ...: its gates (each gate's way following it), posterns and
towers move along its line" (adj l. 316–324) — the order J146's method gives ("the op creating or changing the meeting
reshapes its own structure first; failing that, the standing structure's local shape only — gates and towers moved along
its line", PROGRESS l. 205). Correction 1 reads every example the other way: "Wherever an example has a newer structure
bent, dropped, refused or waiting because a standing wall's gate, postern or tower (not a fixed place) lies where law 1
bars it, law 2 (b) first moves that gate, postern or tower along its wall inside the meeting's reach, and the example's
outcome follows only where (b) finds no lawful point" (adj l. 372–374); veto 6 states the behaviour: "a raised way built
later moves a standing wall's gate or tower along the wall rather than give way. *Veto option:* such a drawing refused,
and such a raised way bent or not built" (adj l. 407–410) — the bend is the veto option, not the rule. The examples
correction 1 reverses are law 2 (a)'s own: *over the band*'s "its under-deck strip keeps clear of the trace's gates and
towers" (adj l. 684–686) and "a declared one bent to the nearest course that can" (adj l. 694–695), E-S1's "its course
bent clear of a tower" (adj l. 1342–1343), E-D2 (adj l. 1685–1694), E-S6's "(1)'s S6 aqueduct *over the band* with its
strip clear of the ring's standing towers and gates" (adj l. 1460–1461). Builder 1 (law 2): the aqueduct takes its
least-cost course among those whose strip is clear of every tower and gate footprint; nothing of the ring moves; no
`reshaped` entry. Builder 2 (correction 1, veto 6): the aqueduct keeps its least-cost course, and the held ring's tower or
gate moves along the ring, a `reshaped` entry naming it (law 4's (G2)). Two courses, two rings and two reports on a common
path — a regenerated aqueduct across a held ring whose towers stand every 35–60 m (base l. 7742–7743).

**Amended words (Part L).** Correction 1 → "1. Wherever an example has a newer structure dropped, refused or waiting — no
lawful shape of its own by law 2 (a) — because a standing wall's gate, postern or tower (not a fixed place) lies where law
1 bars it, law 2 (b) moves that gate, postern or tower along its wall inside the meeting's reach before the example's
outcome, which follows only where (b) finds no lawful point; an example whose newer structure bends or searches clear of
a standing gate, postern or tower is law 2 (a) and stands." Veto item 6: "and a raised way built later moves a standing
wall's gate or tower along the wall rather than give way. *Veto option:* such a drawing refused, and such a raised way
bent or not built." → "and a raised way built later keeps clear of a standing wall's gates and towers by its own course,
moving one along the wall only where no course of its own is lawful, rather than give way. *Veto option:* such a drawing
refused, and such a raised way not built where no course of its own keeps clear."

### PRB7D-GEN-03 — MAJOR · (a) — law 2 (b) after a search fails names no shape to reshape for

**Law or term.** Law 2 (a)–(b) (adj l. 316–324); law 3's lead (adj l. 340); *the reach* (adj l. 264–265).

**Case.** S6's aqueduct at a first generation, or at a regeneration across a held ring, where no course its solver can
reach is lawful with the standing gates and towers where they are — a gate and its towers at the one crossing a gorge and
the river leave, say — so (a) fails and (b) runs (as correction 1 and veto 6 expect it to, adj l. 372–374, 407–410).

**Claim.** (b) changes "the standing structure's shape ... inside the meeting's reach" (adj l. 322–323), the reach being
"the strips, zones and ends it meets and, along each line through them, the nearest points clear of them" (adj
l. 264–265). For an op given its shape the meeting is that shape's. For an op that searches, (a)'s failure leaves no
shape: no meeting, no strip, no reach. Law 3 then picks "Among the lawful shapes law 2 (a) or (b) leaves open, the one of
least displacement" (adj l. 340) — over pairs of a course and a set of moves that is either (i) the search's own-cost best
course with the gates and towers passable, each then moved by law 3, or (ii) the course needing the least gate and tower
displacement, whatever its cost. And "each gate's way following it" (adj l. 323) names no operator and no end nodes on a
path where the gate's arterial was committed at S4 and S5c has grown around it. Two builders lay two courses and move
different gates.

**Amended words (Part L).** Law 2 (b), after "Never a fixed place, a support or a held building." add: "For an op that
searches, (b) reshapes for the shape its search chooses — its own cost choosing — with the standing structure's gates,
posterns and towers read as passable (never its fixed places, supports or held buildings), each one that shape's strip
then meets moved by law 3; a gate's way follows it by the router that laid it (§4.3; by hand §7.3's S4 operator),
re-routed between its nearest pinned nodes on either side of the gate's old and new places."

## Part 3 — terms that read two ways on the generation path

### PRB7D-GEN-04 — MAJOR · (a) — the wall strips' width on a moated stretch, and where two walls share a place

**Law or term.** *The band*, *the wall strips* and *their width* (adj l. 238–242), read by law 1 (4) (adj l. 279), *the
zone* (adj l. 256–257), *beyond the foot* (adj l. 246–248) and *a held building's strip* (adj l. 258–259).

**Case.** (i) A CITY with `moat` `inner` or `all` where a gate route re-solved at S3 (7), an S5b spawned primary or an S4
route comes down from a priced deck outside a main gate, the gate placed beyond the foot. (ii) An `on_enceinte` castle's
weld vertex or welded stretch beside a raised way (S3 (8)'s siting filter, E-P4), and a stage-k stretch anchored on the
earlier enceinte inside a raised way's zone.

**Claim.** Part L's strips are "the band with its inner setback inside and its outer setback, with its glacis or berm,
outside (§4.8)", their width "the band's half there plus the wider of the inner setback and the outer setback with its
glacis or berm" (adj l. 240–242). §4.8, which the term cites, builds the moated outer strip without the setback: "or,
where a moat runs along the wall, by the moat's inner bank, the strip then being the band's half plus the berm" (base
l. 7700–7701; `Enceinte.strips`, base l. 2259–2260: "or the berm up to a moat"). So on a moated stretch the width is band's
half + max(inner setback, outer setback + berm) by the term's words, or band's half + max(inner setback, berm) by the strip
§4.8 builds. And S3 (7) and S5b place their gates beyond a deck's foot before the moat exists: S3 (10) carves the city moat
"along the (9) trace" (base l. 5629–5631), S5a an outer moat "right after committing its trace" (base l. 5979); *Not yet
built* reads a part "whose structure's course or place is already fixed" (adj l. 304–305), but the moat's line is the
later pull's, "that step's own, the newer when it is laid" (adj l. 307–308), so whether the strip at the gate is a berm or
a glacis cannot be read. Under §4.8's reading there is then no lawful outcome: a gate placed beyond the foot by the berm's
width leaves the moat's channel over the ramp or foot, where the way-and-channel table's row (e) stops it at the strip's
edges, "leaving the wall's outer strip closed across the under-deck strip by its glacis line" (adj l. 975) — the wider
glacis strip then over the ends, against law 1 (4). At a place two walls share the term reads "a wall's" band and strips:
an `on_enceinte` castle's welded stretch carries "both enceintes' `wall` roles" (base l. 5594–5595), whose kinds' rows and
`setbackCm` differ (base l. 2252, 2264), the bailey mirroring only the town's condition, material and epoch there (base
l. 2509–2512); its weld vertices are fixed places of both (adj l. 255–256), so their zone has two widths, and so has a
stage-k anchor on the earlier enceinte. Different gates and different zones on common CITY sites.

**Amended words (Part L).** Terms: "**The wall strips** are the band with its inner setback inside and its outer setback,
with its glacis or berm, outside (§4.8); **their width** at a place is the band's half there plus the wider of the inner
setback and the outer setback with its glacis or berm." → "**The wall strips** are the band with its inner setback inside
and, outside, its outer setback and glacis — or, where a moat runs along it, its berm up to the moat (§4.8); **their
width** at a place is the band's half there plus the wider of the inner setback and the outer setback with its glacis,
read so whether or not a moat runs or will run there (a berm never narrowing it, so no width waits on a moat not yet
carved), and law 1 (4) keeps off the ends the band widened each side by that width; at a place two walls share — an
`on_enceinte` castle's welded stretch and its weld vertices, a stretch anchored on an earlier enceinte at its anchor — the
band and the width are the wider of the two walls' there."

### PRB7D-GEN-05 — MAJOR · (a) — "held" is used undefined

**Law or term.** "Held" in law 1 (10) (adj l. 288), law 2 *Newer* (adj l. 296–303) and law 4's (G2) (adj l. 358–361);
the terms *meeting* and *placement* (adj l. 232–235, 263).

**Case.** (i) A first generation at CITY where stage 2's pulled trace crosses an S4 viaduct's `vault` span (W1·C2 at G):
the span read `open`, a change of a raised way's shape ("a `vault` span's reading", adj l. 264). (ii) A Regenerate (keep)
or New random of a CITY whose generated stage-1 ring the user locked (T10 `hold` on the enceinte), its S6 aqueduct re-laid
across it.

**Claim.** Part L defines no "held". *Newer* glosses it as the support step's: "the raised way is the older (held from its
creation, §2.7's support step (6))" (adj l. 297), and the support step makes every raised way **held** from its creating
commit (base l. 2560–2561); law 1 (10) cites §7.2 ("every held structure keeps its placement (§7.2; J144)", adj l. 288),
whose held is locked, pinned or declared (base l. 10797–10818), as E-D7's `reshaped` entry has it ("a locked, pinned or
declared wall, raised way or arch vault", adj l. 1724–1726) and veto 15 ("something the user holds", adj l. 436). Law 4's
(G2) — "Every reshape of a held structure other than the op's own is shown ... off the hand path as a `reshaped` entry in
the report's changes" (adj l. 358–360) — then writes a `reshaped` entry for case (i) at every such generation (every raised
way held) or none (only what the user holds): two reports, and two verdicts from T110-4's "each reshape of a held
structure other than the op's own shown" (adj l. 1527–1528). Nor does Part L say what a hold on a wall-like structure
holds. The structure is "an enceinte of any kind ... with its runs, gates ..., towers" (adj l. 232–235), but placement is
"a wall's trace and course" (adj l. 263), and gates and towers are records of their own (base l. 2274, 2278) that S7
derives. In case (ii) one builder keeps the locked ring's towers and gates standing before every stage ("at a regeneration
every held structure is older than every stage", adj l. 302), so S6's aqueduct keeps clear of them by law 2 (a) — E-S6's
"its strip clear of the ring's standing towers and gates" (adj l. 1461); another re-lays them with S7 as dependants of the
held trace (§7.2 *Protection*: "re-derives its dependants around it", base l. 10797–10799), S7's towers then the newer and
moved off the aqueduct's strip, unreported. Different towers and different reports.

**Amended words (Part L).** Terms, after *the reach* add: "* **Held** is §7.2's: a structure the user locked or pinned, or
one a declaration made (a drawn feature locked by its drawing; a declared placement, `placeAt`) — a hold on a wall-like
structure or a raised way holding the whole structure, with its gates, posterns and towers or its supports, spans and arch
vaults, so that at a regeneration they stand with it before every stage, moved only by law 2 (b). Every raised way's
stations, keys and spans are kept from its creation by §2.7's support step (6), held or not; that keeping makes no raised
way held." *Newer*: "(held from its creation, §2.7's support step (6))" → "(its stations kept from its creation, §2.7's
support step (6))".

## Part 4 — an invariant no bar can check

### PRB7D-GEN-06 — MAJOR · (c) — law 1 (3)'s order is stored nowhere, so §5.3's row and T110-4 cannot check it

**Law or term.** Law 1 (3) (adj l. 274–278); law 2 *Newer* (adj l. 296–303); *The check* (adj l. 364–366); E-D13 (adj
l. 1765–1775); T110-4 (E-S13, adj l. 1517–1530).

**Case.** A METROPOLIS generated with an S4 viaduct and a stage-2 S5b viaduct both over stage 2's ring under a span — the
S4 deck lawfully (the ring traced after its course), the S5b deck not (its course solved after the stage's picked
boundary) — or a stage-3 S5b viaduct or an S6 elevated road over stage 2's standing ring; then any later commit that
touches that ring or deck (a hand stroke nearby, an epoch's `wearWall`, a hand Deck height edit).

**Claim.** Law 1 (3) is a statement of order: "only where that run was laid after the deck's course ..., and never where
its own route crosses a boundary its stage picked before solving that route" (adj l. 274–276), *Newer* dating a course by
its step ("S3 (5)'s gate routes' by S3 (7)", adj l. 298–299). The model keeps no such order. `RaisedWayRecord` holds no
course date (base l. 2288–2298); `Enceinte` holds `stage` and a `lifecycle` (base l. 2272), and `Lifecycle.since` is "the
event that last changed `existence`" (base l. 2896), `seq` 0 for every structure of a generation run; a run re-traced by
an epoch or a carve carries no date of its own (`conditionEpoch` dates its condition, base l. 2271); a generated viaduct
records only its reason (`viaduct`), never whether S4 or which stage's S5b laid it. The lawful and the unlawful crossing
have one geometry — a deck over a wall's line under a span — and §5.3's gate row counts no deck (base l. 9300). E-D13
restates the order clause as a runtime check "batch-local (every commit, on every path ...)" (adj l. 1767, 1772) with
nothing to read it from after the generation run; T110-4 is "§5.3's law-1 row passes after every commit" (adj l. 1518), so
its randomised sequences inherit the gap. A build that lets an S6 elevated road or a stage-3 viaduct pass over a standing
ring passes every bar but a fixture's named clause. (The clause's second half, a stage's own route on a deck over its
picked boundary, is held by §5.3's gate rows — every route the stage solves has its gate on ground part 0, base l. 9300 —
so the gap is the first half.)

**Amended words (Part L).** Terms, add: "* **Order.** Each run of an enclosing wall carries the order of the op that laid
or last re-traced it, and each raised way the order of the op that fixed its course — `{ epoch, seq, step }`, `step` the
pipeline step's ordinal in a generation run and 0 off it (S3 (5)'s gate routes' courses at S3 (7)), a structure held at a
regeneration keeping its own, a frame growth's extension and a repair keeping the course's (`Enceinte.laidAt`, a
stretch-state profile on the trace, §2.2 rule 5; `RaisedWayRecord.courseAt`; §2.7); law 1 (3)'s "laid after" compares
them, and §5.3's law-1 row reads them." Law 1 (3): "only where that run was laid after the deck's course" → "only where
that run was laid after the deck's course (its `laidAt` later than the deck's `courseAt`: *Order*)". E-D13's row: "a road
deck's deck line across an enclosing wall's line only where that run was laid after the deck's course" → "... only where
that run's `laidAt` is later than the deck's `courseAt`". New ENDs: the model's §2.7 records take the two fields
(`laidAt` written by S3 (9), S5a, VS3, S7's run re-trace, V06 §3.7's circuits, contractions and re-anchored stretches, a
carve's or moved river's re-trace and every hand operator that lays or re-traces a run; `courseAt` by S3 (7), S4, S5b, S6's
end, V06 §3.19's founding, the hand operator and a re-shape); determinism's §6.2 hashes them with the records.

## Part 5 — the carried way and the tie-break

### PRB7D-GEN-07 — MAJOR · (a) — *Carried way* gives a held road deck's carried way no gate where a trace is laid after it

**Law or term.** Law 2 *Carried way* (adj l. 311–314); law 2 *Newer*'s creation prefix and regeneration (adj
l. 300–302); the term *meeting*'s "the way it carries (by hand, the declared way to its stroke's end)" (adj l. 236–237).

**Case.** (i) A Regenerate (keep) after other edits, or a New random, of a CITY on which the user drew a raised road over
the valley outside the town, its ground way carried on to the stroke's end inside the ring — at its drawing the deck came
down before the old ring and §7.3's S7 operator made its gate there; the regenerated stage-1 ring crosses that held ground
way where S3 (7) places no gate. (ii) The same map exported as a skeleton and re-imported (T101-4): the ring generated,
the raised road a declaration of the creation prefix.

**Claim.** On both paths the held road deck and its carried way stand before every stage (adj l. 300–302; base
l. 2563–2564), so the stage-1 trace is laid after the carried way's course. *Carried way* says that way "meets every
enclosing wall on its ground course by the gate law (§5.3's gate row)", and "off the hand path a gate is made only by the
gate law of a stage that lays its trace after the route is solved (S3 (7)'s, S5b's), never in a trace laid before" (adj
l. 311–314). S3 (7)'s gate law places a gate only at "the first point at which its solved route, walked outward from its
plaza, reaches `T = t_1`" for each pick's route (base l. 5564–5565); S4 reaches a site outside the boundary "through the
nearest gate, never through a new wall crossing" (base l. 5762); §4.1 makes a declared road's outer end only "a
destination" (base l. 5127–5128). A held way that is no gate route gets no gate from them. Builders: (A) S3's gate law
gives the held way's crossing a gate — a forced pick inside `N₁`, or one past it; (B) none — the held way crosses the ring
ungated, against §5.3's gate row (base l. 9287) and *Carried way*'s own first clause, F-WALL's last rung ("cut a way that
reaches the wall at the setback band and prune the outer stub", base l. 9203) then cutting a held way; (C) the gate the
drawing's S7 operator made, held as the declaration's own, pinning the regenerated trace. At a stage k ≥ 2 S5a pins
"every crossing of an S4, earlier-S5b or this stage's S5b arterial" (base l. 5947), and a held declared road is an S4
route only in a creation prefix ("S4 and S5b take the declared roads (`drawWay`) as fixed routes", base l. 5128–5129). The
skeleton round trip (T101-4; E-S15, adj l. 1535–1538, runs drawn walls only) reproduces its source's gate only under (C).

**Amended words (Part L).** *Carried way*, after "never in a trace laid before, whose standing gates the route takes."
add: "A trace a stage lays after a held road deck's carried way (a creation prefix's declared raised road; a held one at a
regeneration) takes that way's crossing as one of its gates on ground part 0 beyond the foot — at stage 1 a forced pick
of §4.2 S3 (4) there, counted in `N₁`; at a stage k ≥ 2 one of S5b's crossings `c`, pinned by S5a — the held way never
moved; a crossing that cannot lie beyond the foot within the trace's reach takes law 2 (c)." Scope's E-S15 adds the round
trip of a generated ring under a hand raised road's carried way.

### PRB7D-GEN-08 — MAJOR · (a) — law 3's tie on a closed line, and on a line with no stored order

**Law or term.** Law 3's ties (adj l. 347–349), which carry PRB7-10's closure ("ties to the one nearer the line's first
vertex in its vertex order", adj l. 673; Part P, adj l. 2247) — that closure fails on these lines.

**Case.** (i) S7 lays a tower by spacing at a vertex of stage 2's closed ring that lies on an S4 viaduct's deck line where
the ring crosses square to it (the crossing the pull keeps, R7-03 (b)), the strip symmetric about the deck line, so the
nearest clear points either way are equally far. (ii) S3 (9)'s or S5a's anchor on a cliff top, gorge rim or marsh edge, or
on a lake or island shore, inside a viaduct's zone with clear points equally far each way. (iii) S7's harbour-mouth chain
with two pairs of heads equally near (the fixed-place sentence, adj l. 872).

**Claim.** Law 3 sends ties to "the one nearer the start of that line — a deck from its first foot, a wall's line or a way
from its first vertex, a river from its source ... — and then to the lower address" (adj l. 347–349). On a closed line —
every `ring` trace (base l. 2254), a castle's curtain, a lake or island shore — the two candidates lie at arc lengths s₁
and s₂ from the first vertex, and "nearer the start" is the smaller s read forward — as a closed chain's profile is read
"cyclic on a closed chain" (base l. 870) and a run's ordinal counted "from the trace's first vertex in vertex order" (base
l. 2518–2519) — or the smaller of s and L − s, the shorter way round: two answers. A tie line law 3 does not list — an anchor's barrier edge ("the shore, bank, cliff top, gorge rim or
marsh edge", adj l. 860–861; a `cliff` arc may be "terrain whose slope exceeds the table's threshold", base l. 5927–5928,
no stored chain), the entrance a chain moves along — has no start, and "the lower address" cannot part two points of one
anchor, tower or chain. Two outcomes on a ring and none on a terrain edge; T110-4's "each op's outcome one digest on two
hosts" (adj l. 1526) holds inside one build, not between two.

**Amended words (Part L).** Law 3: "Ties go to the one nearer the start of that line — a deck from its first foot, a
wall's line or a way from its first vertex, a river from its source; a part wholly inside a strip to the side nearer its
own first vertex, then the left in spine order — and then to the lower address." → "Ties go to the one at the smaller arc
length from the start of that line, read forward in its vertex order — on a closed line forward from its first vertex,
never the shorter way round — a deck from its first foot, a wall's line or a way from its first vertex, a river from its
source, a shore, bank or water body's edge from its chain's first vertex; a part wholly inside a strip to the side nearer
its own first vertex, then the left in spine order —; on a line with no stored vertex order (a cliff top or slope break
read from the terrain, a gorge's rim, a harbour entrance), and between candidates still tied, to the point first by x,
then by y, in the arena's frame; and then to the lower address."

## Part 6 — minor findings (examples against the laws)

### PRB7D-GEN-09 — MINOR · (d) — R7-03 (a)'s exclusion cannot clear its widened trigger

**Example.** R7-03 (a)'s home text (adj l. 1092–1095), its trigger widened by J146 for PRB7C-GEN-05 (Part P, adj
l. 2361: "S3 (7)'s re-solve, a search over lawful gates (law 2 (a)), takes every such first point").

**Claim.** The trigger now catches a route whose first point at `T = t_1` is "nearer its foot than beyond the foot" (adj
l. 1092). Where the priced deck lies wholly outside `{T ≤ t_1}` with its inner foot a few metres past the boundary, that
point is on ground, the trigger fires, and the re-solve excludes only "every deck edge whose two ends lie on either side
of the stage-1 boundary" (adj l. 1093) — no edge of this deck — so it returns the same route and the same unlawful gate.
Law 2 (a) decides the case (the least-cost route whose first point at `T = t_1` law 1 admits); the example's mechanism
does not reach it.

**Amended words.** R7-03 (a)'s home text: "every deck edge whose two ends lie on either side of the stage-1 boundary
excluded" → "every deck edge whose two ends lie on either side of the stage-1 boundary, or with an end nearer the boundary
than beyond the foot there (§2.7's laws' terms, read with the band and gatehouse rows there), excluded — a search over the
routes whose first point at `T = t_1` §2.7's laws admit (law 2 (a))".

### PRB7D-GEN-10 — MINOR · (d) — E-D11's F-WALL rung is stricter than law 2 (c)

**Example.** E-D11's F-WALL ladder: "the boundary re-pulled once with that raised way's under-deck strip impassable but at
its lawful crossings, its fixed-place zone no crossing or anchor site and every held building's widened strip impassable"
(adj l. 1746–1748). Law 2 (c): "re-laid once with law 1's exclusions impassable" (adj l. 330).

**Claim.** Law 1 bars a line's band and strips over the ends (4), a band past a standing aqueduct support's ring (2), a
fixed place in a zone (6), a held building's strip (9) and gates' and towers' footprints in a strip (5); it does not bar a
line inside an under-deck strip off the deck line (law 1 (2) and (3) speak of the deck line). E-D11's rung makes the whole
strip impassable but at "lawful crossings", a term Part L dropped with the bent-group sentence, so its re-pull can fail —
and the stage be left unwalled — where a shape law 1 admits exists.

**Amended words.** E-D11's ladder: "the boundary re-pulled once with that raised way's under-deck strip impassable but at
its lawful crossings, its fixed-place zone no crossing or anchor site and every held building's widened strip impassable"
→ "the boundary re-pulled once with law 1's exclusions impassable (§2.7's laws, law 2 (c): the ends widened by the wall
strips' width, each standing aqueduct support by the band's half, every zone no crossing or anchor site, every held
building's strip, and every strip to a gate's or tower's footprint)".

### PRB7D-GEN-11 — MINOR · (d) — `W_RAISED_MEETING` against law 2 (c)'s generation outcomes

**Example.** Law 2 (c): "a raised way dropped, reported" and "the wall listed in `requestedVsBuilt` and `W_RAISED_MEETING`
reported" (adj l. 326–334); the fixed-place sentence: a harbour-mouth chain with no clear heads "is not laid at
generation (`W_RAISED_MEETING`)" (adj l. 872); E-D11's §5.4 comment: "S3's, S5a's and VS3's `W_RAISED_MEETING` (a stage
F-WALL's raised-way rung left unwalled ...; VS3's for F-V-RAISED's omitted palisade ...)" (adj l. 1752–1754).

**Claim.** The examples give `W_RAISED_MEETING` to S7's chain, which §5.4's comment does not list among its raisers; law 2
(c)'s "a raised way dropped, reported" for a meeting at S4, S5b or S6 (an elevated road whose course would cross a standing
ring, an aqueduct with no lawful course) names no key, where §4.3's own drops have `raised_too_long` and
`raised_too_tall`. Nothing built differs; the report's keys do.

**Amended words.** E-D11's §5.4 addition → "S3's, S4's, S5a's, S5b's, S6's, S7's and VS3's `W_RAISED_MEETING` — each
outcome of §2.7's laws, law 2 (c), at generation, a regeneration and a village derivation: a stage F-WALL's raised-way
rung left unwalled (§5.2), a palisade F-V-RAISED omitted (V07 §3.13), a raised way not built for a meeting (§4.3), a
harbour-mouth chain not laid (§4.8)".

## Ops tried that the laws decide

Each row ran steps (1)–(5) of the method; where the laws gave one outcome nothing is reported (the findings above aside).

| op or path | law-1 invariants at risk | newer | the laws' outcome |
|---|---|---|---|
| S3 (5)–(7): gate routes, a priced deck at the gate; the harbour gate on `L*` | (1), (3), (4), (5) | the deck, dated S3 (7) (*Newer*) | (a): the re-solve searches lawful gates (GEN-05's closure; GEN-09 corrects the example), a failed re-solve F-ROUTE (E-D16) or the deck dropped ((c)) |
| S3 (8): the castle and a stage's citadel beside S3's stretches, S4's and S5b's viaducts, held ones | (2)–(6), fixed places | the castle (its siting a search) | (a): only claims law 1 admits, curtain, inner ward and vertex towers included; else the next candidate, then F-CASTLE's re-site rungs (the claim moving only whole, Terms) |
| S3 (9) and S5a: the pull, pins, water gates, anchors | (2), (4)–(6), (9) | the trace | (a) within the search band or `wall.barrierReachM`; (c) F-WALL's raised-way rung, the unwalled stage as Part L defines it (GEN-04 and GEN-10 aside) |
| S3 (10), S5a's outer moat; S3 (11)'s harbour route | (8) | the channel or way | its own derivation (row (e), §4.3), lawful under law 1; a span over its water read `open` |
| S4's routes and viaducts; S5b's spawned primaries (row (d), `N_k`) | (1), (3), (4) | the deck | (a): down before a standing trace or picked boundary, the carried way through a standing gate or the stage's own gate beyond the foot; (c) dropped |
| S5d's top-up re-trace | (3), (5) | the re-traced arc | law 4 with E-P12: the picked boundary's crossings kept |
| S6's aqueduct and elevated road (a citadel endpoint by E-V6-17) | (2), (4)–(6) | the raised way | (a) a lawful course (GEN-02, GEN-03 aside); a road deck with fixed ends across a standing ring not built ((c)) |
| S7's strips, towers, gates, castle curtain, intervallum, quays, castle paths, harbour-mouth chain; S10 (0) | (4), (5), (6), (7) | S7's own parts; fixed footprints read by *Not yet built* | towers and posterns moved along by law 3 (GEN-08 aside); the ways by their own rules (row (a)); the cap read; built exactly as read |
| Regenerate (keep), New random, a re-derivation from a stage, Rebuild around my drawings, a creation prefix | all | held older than every stage; prefix in log order; kept unheld ones by stage order | determinate (GEN-05 and GEN-07 aside); a meeting of two held structures as their last commit left it |
| two or more raised ways at one wall | (2)–(6) | per law 2 | every strip, zone and end the union (Terms); beyond the foot clear of the union |
| the undo of a regeneration or an import | all | — | law 4: the inverse, re-checked |

## Verdict

Run as one resolver on the generation and regeneration path, the laws decide most meetings uniquely: the gate routes'
decks, the castle's siting, the pull and its pins, S4's and S5b's decks and the gate counts, S6's raised ways, S7's
furniture and S10's band, the union of several raised ways, the unwalled stage, and the creation prefix's order all come
out one way. They are not yet complete and determinate. One defect is a blocker shared with the time lens: law 1 (8)'s
chamber cannot hold between the span rule and the underground tail, nor before M6-U (GEN-01 = PRB7D-TIM-01). Seven majors
remain in this lens: Part L's own correction 1 and veto 6 invert law 2's order for a raised way laid after a wall (GEN-02);
law 2 (b) has no shape to act on once a search fails (GEN-03); the wall strips' width reads two ways on a moated stretch
and where two walls meet, with no lawful outcome under §4.8's reading while the moat is not yet carved (GEN-04); "held" is
undefined, splitting (G2)'s reports and what a held ring keeps at a regeneration (GEN-05); law 1 (3)'s order is stored
nowhere, so neither §5.3's row nor T110-4 can check it (GEN-06); a held raised road's carried way under a trace laid after
it has no gate law (GEN-07); and law 3's tie-break is two-valued on a closed line and empty on a terrain edge (GEN-08).
None needs a new example: each closes by one sentence in Part L's terms or laws (held, order, the strips' width, law 1
(8)'s timing, law 2 (b)'s searched shape, *Carried way*'s held way, law 3's tie) and one correction (correction 1 and veto
6), with no owner rule changed — J144's rule, items 110 (b) and (f), 114 and 101 R2/R13 stand as Part L reads them, and no
law crosses one in this lens. Three minors correct examples to the laws (GEN-09 – GEN-11). In all, 8 majors (1 a blocker)
remain in the generation and regeneration lens; the laws should be amended before the family's repair seats write
against them.
