# Family check, round 7y — the laws and their examples (coherence/famverify-table-r7y)

> Seat `coherence/famverify-table-r7y`, 2026-10-03, run from a new cloud session on branch
> `claude/ecstatic-gates-iyenrz`. It checks round 7's fourth family fix pass (`adjudication-r7y.md`, the eight
> `repair-r7y-*.md` files, `assemble-r7y.md`; the design text as `4771493` installed it, unchanged since). Lens: §2.7's
> support step (6). That is the laws as the design now states them (terms, laws 1–4 with law 1 (1)–(11), the tiers, the
> check), then the worked examples: the way-and-channel table, the crossing table, the lock, bent-group and fixed-place
> sentences, *Strips, zones and nearest points*, the four outcomes, the columns and *Paths and tests*. It also takes in
> the support step's own rules (1)–(7), the span rule, and every reader that restates them.
>
> Graded by J141 as the owner applies it to this family (J146, J151). A finding is MAJOR only for: no lawful outcome; an
> outcome breaking an owner rule or a law-1 invariant; a law-1 invariant no bar checks; or a check or named test failing
> a correct build. Where every outcome is lawful in that sense, the case is a minor VALID CHOICE. An example that differs
> from the laws is a minor. A case missing from the examples is no finding. Nothing here concerns what J150 hands to
> round 8: a lock under an undo, a redo, a re-grade or value edit within a standing meeting, or a repair; the two-axis
> lock itself and its readers outside the family. Line numbers are `docs/ARCHITECTURE.md` unless a volume is named;
> "Part L l. n" is `adjudication-r7.md`.

PROGRESS
- [x] R1 read whole. Fresh start: the 2026-10-02 23:15 CHECKPOINT of this seat had no report on disk, so the brief's
  RESUME condition was not met. Read: the brief; `adjudication-r7.md` Part L (terms, laws 1–4, the check, corrections
  1–7, the restated veto list), How to read, Part A, R7-02's banner, record veto list and Block 1, Part H's head and
  model heading, Part P pass 8 with its re-check; `adjudication-r7v.md`, `-r7w.md`, `-r7x.md` and `-r7y.md` (decisions,
  END-L1 – END-L3, forms F1 – F6, class (B)'s B1 – B17, builders' choices, held notes); `famverify-table-r7x.md`;
  PROGRESS J144 – J155; item 110 (b), (f) and item 127; the live §2.7 support step (l. 2534–3415) whole; §4.3 *Where it
  may not go* (l. 6508–6512); §4.2 S3 (6)–(7) (l. 6228–6240); §4.6's strip (l. 7213–7224); §5.2's F-WALL (l. 9862); §5.3's
  law-1 row (l. 9950) and gate row; §13.2's state sweep (l. 19262–19305), T110-2 (4) (l. 19460–19510) and T110-4
  (l. 19683–19712); V06's T-V6-11 (V06 l. 4184)
- [x] R2 the round-7x findings of this lens re-checked against the live text (section 1)
- [x] R3 the laws attacked by event, state, path and lock; findings (section 2); closed cases (section 3); verdict

**Method.**
(1) Each round-7x finding of this lens was re-checked against the live text.
(2) Part L l. 332–652 was word-diffed against the live laws l. 2581–2891 after normalising whitespace. Every difference
is one of these:
* a dropped "(J146, PRB7…)" or bare owner-id marker;
* a citation form, such as "(6)'s lead", "the span rule's (1), below", "the program's reading, J122", "§13.2's
  **T110-4**", or law 2 (c)'s "V06 §2.10; (7)";
* a J150 hand-off parenthesis Part L keeps;
* one of the three supersessions by name: END-L1 (law 1 (8)'s chamber), END-L2 (*Order*'s "a regeneration's") and
  END-L3 (law 3's "leaves it on the side it entered from").

The fourth fix pass changed no law (`adjudication-r7y.md`: "Laws changed: none").
(3) Every "as Wn·Cm" of the crossing table was parsed: 14 rows × 15 cells.
(4) Laws 1–4 were applied to:
* every wall event W1–W14, and the events no row lists;
* every column C1–C13;
* every path (G, R, E, V, H, a replay, a skeleton's import);
* every lock: none, placement or shape, on either side;
* every text the fourth pass wrote into or beside the support step (M1–M10; the class (B) texts the examples
  illustrate).

The questions asked were: two readings, no outcome, owner-rule clashes, readers that restate the laws, and law-1
invariants no bar checks.
(5) The support step was swept for the forms Part L's seven corrections and forms F1 – F6 retire, and the hits were read
in context.

## 1. The round-7x findings in this lens, re-checked against the live text

| id | sev | verdict | evidence in the live text |
|---|---|---|---|
| VF7x-TBL-01 | minor | fixed | The bent-group sentence's strip, l. 3185–3189, now reads: "the under-deck strip widened each side by the band's half there (…) together with every place meeting it where these laws bar the line itself (law 1, read with its terms; chiefly each place from which its band or wall strips would lie over a raised way's ends (4), a held building's widened strip (9) and, of a shape-locked raised way, each place from which they would lie newly across one of its `vault`-use spans' strips (10); *beneath*)". The long sides, l. 3194–3195, read "each passing outside every such place on its side". This is F6, as `adjudication-r7y.md`'s M1 writes it. |
| VF7x-TBL-02 | minor | fixed | The lock sentence, l. 2942–2945, reads: "the newer bending itself, else the soft things moved (a carried way re-routed, law 2 *Carried way*), else giving way (law 1 (10); law 2, in its order)". The C8 lead, l. 3287–3288, reads: "the newer bending itself, else the soft things moved, else giving way (law 1 (10); law 2, in its order; *Carried way*)". |
| VF7x-TBL-03 | minor | fixed | (a) *A held building in an arch vault*, l. 3127–3129: "to the nearest lawful course or spacing these laws give (law 1 (2)–(6), (9)–(11), law 2 (a), law 3; item 101 R2; …)". (b) *Paths and tests*, l. 3336–3337: "an aqueduct's to the nearest lawful course these laws give (law 1 (2)–(6), (9)–(11), law 2 (a), law 3; `bend.wall.aqueductArch`)". (c) W1·C1, l. 3346: "S7's towers after it placed where law 1 (5) admits them (law 2 (a), law 3)". |
| VF7x-TBL-04 | minor | fixed | T110-4 (c), l. 19694–19698: "… and, on a third, the ring both meet shape-locked before an aqueduct stroke and a raised road are drawn across it by hand and an aqueduct is founded across it at an epoch — the shape-locked runs from the milestone that carries the shape lock, J147, J150)". W1·C1's test cell, l. 3346, names "T110-4 (c) (its shape-locked ring)". |
| VF7x-TBL-05 | minor (valid choice) | closed by a ruling | Listed in `adjudication-r7y.md`'s builders' choices (l. 784–788) and in `fix-list.md` (l. 188). The choice stands; section 3 notes that its pick also times W8·C2's chamber. |
| VF7v-TBL-04, VF7v-TBL-05 | minor (valid choice) | closed by a ruling | Listed in `adjudication-r7w.md`'s builders' choices and in `fix-list.md` (l. 177–178). Both stand. |

The fourth pass's other model edits in this lens are all installed in its words:
* M5: row (d)'s gates cell, l. 2916, in F6 with law 2's (c);
* M6: *No gate and no tower*, l. 3150–3154, a contraction laid through S5a's pin;
* M7: W14's event cell, l. 3359, "law 2, in its order";
* M8: row (b)'s gates cell, l. 2914;
* M9: *Several raised ways*, l. 2992–2994;
* M10: *over the band*, l. 3022–3023.

**All four fixable round-7x findings of this lens are fixed. The listed choices stand.**

## 2. Findings

### VF7y-TBL-01 — the bent-group sentence fixes a two-edge path where law 2 (a) with law 3 lays another line

* **Severity:** minor. **Kind:** an example contradicts law 2 (a) with law 3. **Owner:** model.

* **Claim.**
  * **What the laws say.** Law 2 (a) (l. 2810–2813) reads: "a line, point or value an event or costless rule sets (a
    stroke, a drag of a vertex, gate or grip …) takes the lawful shape law 3 picks nearest it, and every other op (a pull
    or cost field, a route solve, a siting, a points-form `drawWall`'s trace) searches only shapes law 1 admits, its own
    cost choosing among them". Law 3's key (2) (l. 2846–2852) ranks a re-laid line by "the largest distance any changed
    thing moves; then the sum of those distances; then the area between each re-laid line and its old — … a re-laid or
    re-routed line … by the largest distance of the new from the old".
  * **What the example says.** The bent group is "every stretch laid by neither the `EnceinteStrategy`'s pull nor a
    cost field". Every member is a stroke, a drag or a costless rule's line, or a points-form `drawWall` (l. 3178–3182).
    Yet the bent-group sentence fixes the replacement's path itself (l. 3203–3206): "Every other part of the line inside
    the strip is replaced, between the points where the line enters and leaves the strip: (i) an unlawful crossing by the
    nearest lawful one along the deck from the point where it met the deck line (ties by law 3) — the line from its entry
    point along that side's edge to it, across the strip there and along the other edge to its exit point —". Its (iv)
    reuses that path (l. 3215–3216): "the line bent through it by (i)'s path".
  * **A worked case.** Take a hand `drawWall` stroke whose line meets an aqueduct's deck line at a standing support, where
    the channel runs above the wall's top. Law 1 (2) makes that crossing unlawful (over: "no standing support in the
    band"). The nearest lawful crossing Q lies under the next span, a distance d along the deck.
    * (i)'s path runs from the entry point along the strip's edge to opposite Q, across, and back along the other edge
      to the exit point: a rectangle d wide over the strip's whole width.
    * A line from the entry point to Q and on to the exit point is also lawful if its band keeps clear of the support's
      ring. It enters on one long side, leaves by the other and meets the deck line once (law 1 (4); law 1 (2), over,
      *the edge*).
    * Its largest distance from the old line is the same d, reached at the crossing. It encloses less area, so law 3's
      key (2) ranks it before (i)'s path.
  * **Why it matters.** The two builds lay different lines. With the lines go the wall strips each lays over the
    under-deck strip, and so the `vault` spans each reads `open` (law 1 (8)). For a points-form `drawWall`, (i)–(iii)
    pin moves that law 2 (a) leaves to the trace's own cost.
  * **Why it is minor.** (ii)'s and (iii)'s edge places agree with law 3 for a stroke: no lawful line lies closer to a
    part that runs along beneath the deck or ends inside the strip. No bar asserts (i)'s path:
    * T110-2 (4), l. 19463–19472, asserts the crossing place: "bent along the deck to the nearest lawful crossing (law 3),
      under a span that clears the wall"; "bent to that crossing … (…; its worked example the bent-group sentence (i))".
    * T110-2 (4), l. 19496–19500, asserts (ii) and (iii) as "moved to the strip's edge on its entry side", which law 3
      gives too.

    So a build that follows the laws passes every named test, and §5.3's row accepts both lines. The builder texts cite
    the laws (§7.1's `bend.wall.raisedCrossing`, F4: "bent to the nearest lawful shape §2.7's laws give"). An example
    that differs from the laws: minor, fixed by correcting the example.

* **Required change (model).**
  * The bent-group sentence (l. 3203–3204), from "Every other part of the line inside the strip is replaced, between
    the points where the line enters and leaves the strip:" to "Every other part of the line inside the strip is
    replaced, between the points where the line enters and leaves the strip, by the lawful shape law 2 (a) gives it (a
    stroke's or a costless rule's line the one law 3 picks nearest it; a points-form `drawWall`'s trace its own cost's),
    these its cases:".
  * (i) (l. 3205–3206), from "— the line from its entry point along that side's edge to it, across the strip there and
    along the other edge to its exit point —" to "— the line between its entry and exit points re-laid through it —".
  * (iv) (l. 3216), from "the line bent through it by (i)'s path" to "the line re-laid through it as (i) re-lays a
    crossing".

### VF7y-TBL-02 — W1's hand give-way, and F-WALL's twin, cite law 2 (a) and (c) without (b) (F3's residue)

* **Severity:** minor. **Kind:** an example's citation names a subset of law 2's order (form F3). **Owner:** model; END
  determinism.

* **Claim.**
  * **The two sites.** Row W1's last column (l. 3346) reads: "no lawful shape: (G3) — a hand op refused once its own
    pull, within its own search band, finds no lawful shape, its band never widened and never a stage left unwalled
    (law 2 (a), (c))". §5.2's F-WALL ladder cell (l. 9862), the builder text W1 illustrates, carries the same words: "a
    hand op that runs F-WALL — a hand `contractWall`, a terrain stroke's cliff re-anchor — takes no rung of it: it is
    refused `refuse.raised.meeting` once its own pull, within its own search band, finds no lawful shape, its band never
    widened and never a stage left unwalled (§2.7's laws, law 2 (a), (c))".
  * **Why (b) belongs.** The hand op's pull is S5a's trace step (W1's event cell: "a hand `contractWall` (H: S5a's trace
    step, §4.11)"). That step resolves a barred pin by law 2 in its order. *beneath* (l. 3087–3089): "a pin these laws
    bar there is resolved by law 2 in its order — (a) moved along its way, the trace laid through it, (b) its way
    re-routed, (c) …". *No gate and no tower* (l. 3150–3153) names the contraction among the traces whose pin is so
    resolved.
  * **The precedent.** The fourth pass ruled this citation form at its sibling sites. `adjudication-r7y.md`'s M7 moved
    W14's identical "(law 2 (a), (c))" to "law 2, in its order" (VF7x-EPO-02, F3), and its D5 did the same for §7.3
    (b) 3 (VF7x-HND-02). Both sites here were written by `adjudication-r7w.md`'s M7 and D4 (VF7v-HND-04) and kept the
    subset.
  * **Why it is minor.** A build that read the parenthesis as the order would refuse a hand contraction whose barred pin
    (b) re-routes, short of a lawful shape (item 101 R2 as the program reads it, PRB7H-LCK-03). But the text names "its
    own pull", which runs (b). The outcome is the laws' and §5.3's row decides nothing else: a citation, minor (the grade
    of VF7x-EPO-02 and VF7x-HND-02).

* **Required change.**
  * model — row W1's last column (l. 3346), from "its band never widened and never a stage left unwalled (law 2 (a),
    (c))" to "its band never widened and never a stage left unwalled (law 2, in its order; §4.4 S5a *Trace* (2))".
  * END determinism — §5.2's F-WALL row, its ladder cell (l. 9862), from "its band never widened and never a stage left
    unwalled (§2.7's laws, law 2 (a), (c))" to "its band never widened and never a stage left unwalled (§2.7's laws,
    law 2, in its order; §4.4 S5a *Trace* (2))".

## 3. What was attacked and closed with no finding

* **The laws as stated.** They are Part L's words with the differences listed in the method, and the fourth pass touched
  no law.
  * §5.3's law-1 row (l. 9950) checks every clause, once per commit: "its clauses (1)–(11) as the laws state them (§2.7's
    laws' terms: each raised way's own)", "as §2.7's laws' *The check* says", with the stored `laidAt` and `courseAt`.
  * T110-4 (l. 19683–19712) runs that row after every commit on the family's fixtures, the state sweep and 32 random
    seeds, on every path and on each lock axis. Law 1 (10)'s wall side now has its fixture (VF7x-TBL-04's third run).
  * No law-1 invariant is unchecked.
* **The cells.** Every row has its 15 cells and every "as Wn·Cm" lands on a cell that states an outcome. None lands on
  "—" or chains, and the one cross-row reference, W7's last column to W6·C2, states one.
  * Each cell gives one built form, its writing op and records, its gates on ground part 0, its bend key or fate by law
    4, and its undo. Where a cell omits one, law 4 and law 1 (8) supply it.
  * Correction 1 ("gateMoved", "towerMoved", a standing gate moved): 0 hits.
  * Correction 2 (a held building's `refuse.locked`): 0 hits. The six `refuse.locked` hits are *Entry* and C8's "no
    `refuse.locked`".
  * Correction 3: each "band's half" hit is the strips' width, *the edge*, or a strip that already counts it.
  * Correction 5: each "fate" is G2's *reshaped* or a "never a fate".
  * Correction 6 ("drawn" or "declared" holding): 0 hits.
  * Correction 7: no "arches that clear" restatement. W6·C2's and W7's "arch that clears it" cite law 1 (5).
* **The fourth pass's texts in this lens.**
  * F6 at the bent-group strip, rows (b) and (d), *Several raised ways* and *over the band* keeps law 1 whole. The clause
    numbers there are pointers.
  * The lock sentence and C8 now name law 2's (b).
  * Row (d) names law 2 (c) on its path, F-WALL's rung.
  * The class (B) texts the examples illustrate cite the bent-group sentence or *down before the wall* as worked
    examples, and none contradicts them: S3 (6)'s cross wall (l. 6234), S3 (7)'s re-solve (l. 6236) and §4.3 *Where it
    may not go* (l. 6510).
  * *down before the wall*'s list of what counts as standing at S3 (7) (l. 3035–3036) does not name the merged pair's
    cross wall, which §4.3 and S3 (7) now name. That is a case missing from the example: *Order* decides it (the cross
    wall dated S3 (6), the raised stretches S3 (7)), so no build differs.
* **Every wall event** — W1–W14, plus a burial, a warp, a `revert`, a `split` or `merge`, a castle grip, a hand castle
  siting or bailey edit, a water op's re-trace, a terrain stroke, an absorb with no epoch, and a skeleton's import.
  * Law 4 re-checks each, and law 2 (a)–(c) gives each an outcome on its paths.
  * A terrain stroke names neither side, so *Newer* makes the raised way the older. Law 3's key (1) keeps the stroke's
    value and re-traces the wall locally; a placement-locked wall's line is never moved (law 1 (10)), so law 2 (c)
    takes it.
  * W14's REPLACEMENT wait agrees with law 1 (2), (5), (11).
  * W12's landfall is an *unchanged meeting* for each record.
* **Every raised-way state** (C1–C13).
  * C5's `cleared` ring is crossed where *Where the line crosses* admits it.
  * At C11, a dismantled run still stands. Law 1 (3) and §5.3's gate row ("a drawn way across any run — a `breached` or
    `dismantled` one … included — makes its gate there") give the carried way one gate.
  * C12's frame growth lays only on ground the grown frame reveals, so no older wall meets the extension. Its kept old
    end span agrees with law 2 (c).
  * VF7x-TBL-05's listed choice also times W8·C2's chamber for a span that only the absorbed record's wall strips meet:
    laid again in `absorbWall`'s commit on reading (A), at the last `dismantle` on reading (B). S8 holes the whole
    under-deck strip (l. 7216–7219), so no plot holds it open. Both readings keep law 1 (8). T-V6-11's span (V06 l. 4184)
    is the band's and is timed alike on both. The choice stands as listed.
* **Every path.** Generation, a regeneration (END-L2's slot), an epoch, a village derivation, a replay and a skeleton's
  import, as `famverify-table-r7x.md` closed them; nothing the fourth pass wrote reopens one.
* **Every lock.**
  * Placement, either side: the soft readings, *Carried way*'s gate by hand, (G2) shown, no refusal (*Entry*).
  * Shape on the raised way: no wall line, band or strip newly across a `vault`-use span's strip.
  * Shape on the wall: no merge and no gate; *Carried way* re-routes, else law 2 (c).
  * Nothing reported concerns a lock under an undo, a redo, a re-grade or value edit within a standing meeting, or a
    repair (C10's shape-locked cap, l. 3304–3305; a Deck height edit over a shape-locked run), nor *Entry*'s
    protection of a locked side (W12·C8). J150 hands all of these to round 8.
* **Owner rules.**
  * Item 110 (b): no junction, and ends at ramps or stairs. "Crossing the wall through an arch" is read as over or
    merged. The spaces between piers are open or vaulted.
  * Item 110 (f): zero junctions; a removed way stays removed (C7, T110-3; but see the held notes).
  * Item 114: a run's condition is its own, and the top is read whatever the condition.
  * Item 101 R2: law 2 (a), law 3 and (G3)'s alternatives, save VF7y-TBL-01's example.
  * J144: law 2 *Entry*; (G1)–(G3).
  * J147: *held*, and law 1 (10) read with its (3).
  * J148: Tier 1 never moved (law 1 (11)).
  * J149: over and merged by level, beneath left out. J149's own rule text says "the aqueduct's own arch or pier", as
    law 1 (2)'s merged form does.

  None is contradicted.

## Held for round 8 (outside the family, or routed elsewhere by the owner; not graded)

1. **Base §4.6 (l. 7217) × §2.7's laws' term *the strip* (l. 2614–2615).** This persists from `adjudication-r7y.md`'s
   held note 11. §4.6 words the under-deck strip as the deck's ground projection over its piers and spans; §2.7's term
   words it as the deck's plan between its feet. The open question is whether a ramp's or stair's plan lies in the
   strip. Both are holed as (6)'s reservation, so the difference shows only where a reader reads the strip alone (raised
   way × plots).
2. **§2.7's C7 column (l. 3282–3283), W3·C7 (l. 3348) and T110-3 × item 127 (`AMENDMENTS-2026-09-28g.md`; PROGRESS
   J152).** "A suppressed generated way staying removed (item 110 (f), T110-3)" keeps item 110 (b)'s removal that holds
   through regeneration. Item 127 (2026-10-03) replaces that removal with a delete that lapses at the next change that
   re-reads the kind. Item 127's HOMES name §2.7's support step, and J153 routes its changes to `fix-list.md`. The brief
   predates J152, so the rule is not graded here.

## 4. Verdict for this lens

The laws at §2.7's support step (6) are Part L's laws in Part L's words, with the three END-L supersessions; the fourth
fix pass changed none of them. They decide every case this lens ran: every wall event, every raised-way state, every path
and every lock axis on either side. Each case has one lawful outcome or a listed valid choice, and no owner rule is
crossed. Every law-1 invariant is checked by §5.3's law-1 row and T110-4; law 1 (10)'s wall side now has its fixture.

Of the five round-7x findings of this lens, four are fixed in the fourth pass's words and one is a valid choice that
stays listed. The pass's other model edits (F6 at five example sites; W14's and row (d)'s law 2 in its order) agree with
the laws. Two worked-example slips remain:
* the bent-group sentence still fixes (i)'s two-edge path, where law 2 (a) with law 3 lays a closer lawful line (and a
  points-form trace takes its own cost's) (VF7y-TBL-01);
* W1's hand give-way and its F-WALL twin still cite law 2 (a) and (c) without (b), the F3 residue the pass closed at W14
  and §7.3 (b) 3 (VF7y-TBL-02).

No named test fails a build that follows the laws in either case. **No blocker, no major; two minors in this lens.**
