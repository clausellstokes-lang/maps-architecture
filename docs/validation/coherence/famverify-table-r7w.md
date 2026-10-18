# Family check, round 7w — the laws and their examples (coherence/famverify-table-r7w)

> Seat `coherence/famverify-table-r7w`, 2026-10-02, after round 7's second family fix pass (`adjudication-r7w.md`, the
> eleven `repair-r7w-*.md` files, `assemble-r7w.md`). Lens: §2.7's support step (6) — the laws as the design now states
> them (terms, laws 1–4 with law 1 (1)–(11), the tiers, the check), then the worked examples (the way-and-channel table,
> the crossing table, the lock, bent-group and fixed-place sentences, *Strips, zones and nearest points*, the four
> outcomes, the columns, *Paths and tests*), with the support step's own rules (1)–(7) and the span rule, and every
> reader that restates them. Graded by J141 as the owner applies it to this family (J146, J151): MAJOR only for no
> lawful outcome, an outcome breaking an owner rule or a law-1 invariant, a law-1 invariant no bar checks, or a check or
> named test failing a correct build; where every outcome is lawful so, a minor VALID CHOICE; an example that differs
> from the laws a minor; a case missing from the examples no finding. Nothing here concerns what J150 hands to round 8
> (a lock under an undo, a redo, a re-grade or value edit within a standing meeting, or a repair; the two-axis lock and
> its readers outside the family). Line numbers are `docs/ARCHITECTURE.md` unless a volume is named; "Part L l. n" is
> `adjudication-r7.md`.

PROGRESS
- [x] R1 read whole: the brief; `adjudication-r7.md` Part L (terms, laws 1–4, the check, corrections 1–7, the restated
  veto list), R7-02's banner, owner-rule checks, record veto list and attack, Part P pass 8, Part H's head and Part A's
  hand-offs; `adjudication-r7v.md` and `adjudication-r7w.md` whole (decisions, class ruling, Part H by unit, builders'
  choices, held notes); `famverify-table-r7v.md`; `assemble-r7w.md`'s outcome; `repair-r7w-model.md` and
  `repair-r7w-pipeline.md` (their notes); PROGRESS J144 – J151; item 110 (b), (f); the live §2.7 support step
  (l. 2534–3408) whole; §4.3 *Where it may not go* (l. 6501–6505); §4.4 S5a *Trace* (2) (l. 6602–6603); §4.2 S3 (7)
  (l. 6227); §4.8's strips (l. 8349–8356); §5.2's F-WALL row (l. 9855); §5.3's law-1 row (l. 9943); §13.2's T110-2
  and T110-4 (l. 19200–19650)
- [x] R2 the five round-7v findings of this lens re-checked against the live text (section 1)
- [x] R3 the laws attacked by event, state, path and lock; findings (section 2); closed cases (section 3); verdict

**Method.** (1) Each round-7v finding of this lens re-checked against the live text. (2) Part L l. 332–652 word-diffed
against the live laws l. 2581–2891 after normalising whitespace: every difference is a dropped "(J146, PRB7…)" or bare
owner-id marker (Part H's head), "§2.7's support step (6)" read "(6)'s lead", "§2.7's span rule (1)" read "the span
rule's (1), below", law 1 (2)'s "as the program reads it" read "the program's reading, J122", law 2 (c)'s added "V06
§2.10; (7)", law 4's "J148:" read "law 1 (11)", the bar named "§13.2's **T110-4**", the J150 hand-off parentheses left in
Part L (round 8's, not reported), and the first fix pass's END-L1 (law 1 (8)'s chamber clause) and END-L2 (*Order*'s "a
regeneration's" struck) — so the design states the laws as Part L gives them, as `adjudication-r7v.md` supersedes them;
`adjudication-r7w.md` changed no law. (3) Every "as Wn·Cm" of the crossing table parsed and resolved (14 rows × 15 cells;
every reference lands on a cell that states an outcome); every citation of a law, clause, row or cell across the base
and the volumes searched for one that does not exist (none). (4) Laws 1–4 applied to every wall event W1–W14 and the
events no row lists, every column C1–C13, every path (G, R, E, V, H, a replay, a skeleton's import) and every lock (none,
placement, shape; either side), and to every text this round wrote into or beside the support step (the model's M1–M7
and its sweep SW1–SW3, the pipeline's one list at S5a that *beneath* now cites) — asking for two readings, no outcome,
owner-rule clashes, readers that restate the laws, and invariants no bar checks.

## 1. The round-7v findings in this lens, re-checked against the live text

| id | sev | verdict | evidence in the live text |
|---|---|---|---|
| VF7v-TBL-01 | minor | fixed | row (b)'s gates cell, l. 2914: "such a crossing of the trace is moved along the deck to the nearest crossing at which these laws admit its gate (law 1 (5), law 2 (a), law 3; `bend.raised.underSpan`, its wall form)"; W2's last column, l. 3341: "a gate it makes for a ground way where law 1 (5) bars one placed along that way at the nearest point these laws admit it (law 2 (a), law 3)"; W2·C2 "through a gate it makes placed where law 1 (5) admits it"; no other gate in the support step is moved "clear of the strip" (the one such phrase left, *No gate and no tower* l. 3145, bounds a trace's local bend, not a gate's place) |
| VF7v-TBL-02 | minor | partly fixed | its two sites are conditioned — *Where the line crosses*, l. 3061–3063: "or through a `cleared` support's ring (open ground: both its spans fallen, C5) where every span above the band, standing or fallen, clears that top"; the bent group's lawful crossing, l. 3180–3183: "… (open ground, C5) where every span above its band, standing or fallen, clears it" —; the same unconditioned statement persists in the C5 column's lead, l. 3273: "a trace laid after a support is `cleared` passes through its ring as open ground", and in W1·C5 and W3·C5 (l. 3340, 3342): "through a `cleared` ring as open ground". It persists below (section 2) |
| VF7v-TBL-03 | minor | fixed | the fixed-place sentence, l. 3258–3260: "and an aqueduct each out of its strip but under arches that clear it, an anchor out of it always (law 1 (4))"; *No gate and no tower*, l. 3152–3154: "… under arches that clear it, an anchor's tower out of it always (law 1 (4), (6); the fixed-place sentence)"; the model's sweep conformed W8·C1 (l. 3347), *Paths and tests*' C1 bend (l. 3330–3331) and (7) (l. 3369–3370): "an anchor under none (law 1 (4))". Read and holding: an anchor ends its line, so it is never in a crossing, and law 1 (5)'s exception ("in an aqueduct's crossing law 1 (2) reads over") never reaches its tower |
| VF7v-TBL-04 | minor (valid choice) | closed by a ruling | VALID CHOICE LISTED, `adjudication-r7w.md`'s builders' choices for fix-list.md (law 1 (5)'s "never on a support's ring" read of every support or of a standing one); no design text changes |
| VF7v-TBL-05 | minor (valid choice) | closed by a ruling | VALID CHOICE LISTED, `adjudication-r7w.md`'s builders' choices (W14's epoch count of a run re-sectioned under an older aqueduct); no design text changes |

Three fixed, two closed by a ruling, one partly fixed (VF7v-TBL-02, its residue below).

## 2. Findings

### VF7w-TBL-01 — the one list of a trace's impassables, and §4.3, keep a wall off a raised way's ramps, stairs and feet, not off its ends

* **Severity:** MAJOR · **Kind:** a reader restates law 1 (4) without the strip margin its term *the ends* carries; two
  readings, one breaking law 1 (4) · **Owner:** pipeline (§4.4 S5a *Trace* (2), §4.3 *Where it may not go*); END model
  (§2.7's worked examples)
* **Claim.** Law 1 (4) (l. 2721–2723): "no enclosing wall's line, band or wall strips lie over a raised way's **ends**";
  the terms (l. 2617–2618): "**the ends** are its ramps, stairs and feet, each widened by the same margin"
  (`raisedWays.structure.stripMarginM`, 1 m as V11 ships it). §5.3's law-1 row (l. 9943) checks law 1 (4) "as the laws
  state them", so against the ends. Three builder texts keep a wall off the ramps, stairs and feet alone:
  * §4.4 S5a *Trace* (2), "the one list of them, which every pull, cost field and reader of them cites" (l. 6602): "a
    standing raised way's ramps, stairs and feet widened by the wall strips' width there" — the list S3 (9)'s pull,
    S5a's pull, every epoch circuit, contraction and re-anchored stretch (V06 §3.7.4 (2), §3.7.6 (5)), a dossier-admitted
    circuit and a hand `contractWall` take (*beneath*, l. 3074–3080: "each widened as the one list of them, §4.4 S5a
    *Trace* (2), states it");
  * §4.3 *Where it may not go* (l. 6503), the course rule of every aqueduct laid after a standing wall (S6's at
    generation and a regeneration, a declared one's course): "its ramps, stairs and feet off the band and wall strips";
  * and §2.7's examples restate the same: *Line and band* (l. 3069–3070) "the line kept from a ramp, stair or foot by the
    wall strips' width there (law 1 (4))"; *Where the line crosses* (l. 3058–3059) "its band and wall strips kept off
    them too (law 1 (4))"; *over the band* (l. 3016) "its ramps, stairs and feet kept by its course off the band and the
    wall strips (law 1 (4); …)".
  The same texts elsewhere use the term rightly — S5a's own pin rule, l. 6603 ("whose band or wall strips there would
  lie over a raised way's ends (law 1 (4))"), S3 (7), l. 6227 ("the band or wall strips there over the ends"), V06
  §3.19 (5) ("a curtain's line, band or wall strips would lie over an end of it"), and the fixed-place sentence, l.
  3260–3261 ("its ramps, stairs and feet widened by the strip margin (law 1 (4), (6))"). A builder who builds the list
  and §4.3 as written buffers the bare ramp, stair or foot: a pull or cost field, which runs its least-cost line along
  an impassable's boundary wherever that boundary is on its way, lays its wall strips up to the bare ramp, stair or
  foot, inside the strip margin round it, and an aqueduct course laid by §4.3 stands its ramp's or foot's margin under
  a standing wall's setback or glacis. Both break law 1 (4), and §5.3's law-1 row fails that build at the commit
  (`E_INVARIANT`). The second reading (the ends) is lawful. One reading of a text a builder builds breaks a law-1
  invariant: not a valid choice (J151) — MAJOR, as the first fix pass graded the same list's missing over-crossing
  spans (`adjudication-r7v.md`, VF7-GEN-01). No earlier check named it: Part L's correction 3 (Part L l. 669–672) itself
  says "widened by the wall strips' width there" of a ramp, stair or foot, and the texts written from it kept the words.
* **Required change.**
  * pipeline — §4.4 S5a *Trace* (2), the one list (l. 6602): "a standing raised way's ramps, stairs and feet widened by
    the wall strips' width there," → "a standing raised way's ends (its ramps, stairs and feet widened by
    `raisedWays.structure.stripMarginM`, §2.7's laws' terms) widened by the wall strips' width there (law 1 (4)),".
  * pipeline — §4.3 *Where it may not go* (l. 6503): "its ramps, stairs and feet off the band and wall strips" → "its
    ends (its ramps, stairs and feet widened by `raisedWays.structure.stripMarginM`, §2.7's laws' terms) off the band
    and wall strips".
  * END model — §2.7's worked examples: *Line and band* (l. 3069–3070): "the line kept from a ramp, stair or foot by the
    wall strips' width there (law 1 (4))" → "the line kept from a raised way's ends (a ramp, stair or foot widened by the
    strip margin, these laws' terms) by the wall strips' width there (law 1 (4))"; *Where the line crosses* (l.
    3058–3059): "its band and wall strips kept off them too (law 1 (4))" → "its band and wall strips kept off its ends
    too (law 1 (4))"; *over the band* (l. 3016): "and its ramps, stairs and feet kept by its course off the band and the
    wall strips (law 1 (4);" → "and its ends (its ramps, stairs and feet widened by the strip margin) kept by its course
    off the band and the wall strips (law 1 (4);".
  Each seat's sweep (R7-01 (2)) conforms any other restatement of the keep-clear that names a ramp, stair or foot
  where law 1 (4) reads the ends.

### VF7w-TBL-02 — the one list widens a held building's strip twice

* **Severity:** MAJOR · **Kind:** two readings of one list; the doubled reading gives way where law 2 (a) lays a lawful
  shape · **Owner:** pipeline (§4.4 S5a *Trace* (2))
* **Claim.** The one list (l. 6602), as the second fix pass wrote it (`adjudication-r7w.md` P2): "every held building's
  strip and a shape-locked raised way's `vault`-use spans' strips, each widened all round by the wall strips' width
  there (law 1 (10): no line, band or wall strip across one)". A held building's strip is by its definition already
  "the strip of a `vault` span whose chamber seats a held building …, widened all round by the meeting wall's strips'
  width" (terms, l. 2642–2643), and §2.7's examples say a pulled line is kept out of it once: *A held building in an arch
  vault*, l. 3124–3128 ("**A held building's widened strip** is these laws' held building's strip …, so a line kept out of
  it keeps a wall's band and strips off that span's strip: a trace laid by the pull or a cost field treats it as
  impassable"), and *Line and band*, l. 3073–3074 ("a held building's widened strip … count[s] the band's half already,
  so a line is kept out of [it] as [it is] drawn"). Read distributively, "each" widens the held building's strip a
  second time; read of the plural alone, once — the pipeline seat itself noted the two readings for this check
  (`repair-r7w-pipeline.md`, its NOTED list), and *beneath* now takes the list's widenings as stated (l. 3078–3079:
  "each widened as the one list of them … states it"). The doubled reading keeps every law-1 invariant, but it bars a
  further band of one wall-strips' width (12–24 m by §4.8's rows, l. 8351, 8354) round each held building's span — one
  to three neighbouring arches. Where the only lawful crossings of the deck line within the pull's search band, or
  within an epoch circuit's or contraction's reach, lie in that band, the doubled build takes law 2 (c) — at generation
  F-WALL's raised-way rung (l. 9855: re-pulled, `W_RAISED_MEETING`, else the stage unwalled), at an epoch the circuit
  waiting (`walls.waited`) — where law 2 (a) lays a lawful trace: law 2 (a)'s "(a) fails where none lies within that
  reach" (l. 2813) is broken, and a meeting given way where a lawful shape stood is the outcome Part P pass 8 ruled
  against J144 as the program reads it (PRB7H-GEN-04 (i)) and the second fix pass held no valid choice (VF7v-GEN-03,
  VF7v-GEN-06). So not every outcome keeps the owner rules: MAJOR. (T110-2 (4)'s held-building circuit, l. 19451–19456,
  asserts only that the circuit crosses "clear of that span's strip", which both builds may meet on its fixture; no bar
  separates them.) The tests lens landed the same defect as VF7w-TST-01 (`famverify-tests-r7w.md`, major); one fix
  closes both.
* **Required change (pipeline).** §4.4 S5a *Trace* (2) (l. 6602): "every held building's strip and a shape-locked
  raised way's `vault`-use spans' strips, each widened all round by the wall strips' width there (law 1 (10): no line,
  band or wall strip across one)" → "every held building's strip (widened by its own definition, §2.7's laws' terms;
  law 1 (9)) and the strip of each `vault`-use span of a shape-locked raised way widened all round by the wall strips'
  width there (law 1 (10): no line, band or wall strip across one)".

### VF7v-TBL-02 (persisting) — the C5 column still passes a trace through a `cleared` ring with no condition on the fallen spans beside it

* **Severity:** minor · **Kind:** example contradicts law 1 (2) · **Owner:** model
* **Claim.** The fix pass conditioned *Where the line crosses* and the bent group's lawful crossing (section 1). The
  column that reads the state, C5 (l. 3273–3274), still says "a trace laid after a support is `cleared` passes through
  its ring as open ground, one laid after it is `ruined` meets the stump as a standing support (law 1 (2); …)", and its
  cells W1·C5 (l. 3340: "through a `cleared` ring as open ground") and W3·C5 (l. 3342: "*beneath* as read: through a
  `cleared` ring as open ground") repeat it. Law 1 (2) (l. 2705–2713) reads an aqueduct's levels "each span's soffit
  standing or fallen" and admits over only with "every span above the band clearing the wall's top"; a band wider than
  the ring lies under the two fallen spans beside it, so where either's recorded soffit is below the wall's top a
  trace through the ring fits neither form. The model's sweep read these as the ring's reading only
  (`repair-r7w-model.md`, SWEEP); the column's lead says the trace "passes through". The bars carry the condition
  (`adjudication-r7w.md` C7, C8: T110-2 (6), (7), T-V6-47), and §5.3's law-1 row catches a build from the column: minor.
* **Required change (model).** C5 (l. 3273): "a trace laid after a support is `cleared` passes through its ring as open
  ground," → "a trace laid after a support is `cleared` meets its ring as open ground, an aqueduct's over crossing
  passing through it only where every span above the band, standing or fallen, clears the wall's top (*Where the line
  crosses*; law 1 (2)),". W1·C5 (l. 3340): "through a `cleared` ring as open ground," → "a `cleared` ring open ground,
  crossed where *Where the line crosses* admits it,". W3·C5 (l. 3342): "*beneath* as read: through a `cleared` ring as
  open ground," → "*beneath* as read: a `cleared` ring open ground, crossed where *Where the line crosses* admits it,".

### VF7w-TBL-03 — the bent group's edge moves lay wall strips across a shape-locked raised way's `vault`-use spans

* **Severity:** minor · **Kind:** example contradicts law 1 (10) · **Owner:** model
* **Claim.** Law 1 (10) (l. 2739–2743) bars a meeting made "newly" with a shape-held thing that changes it, "a
  wall-like line, band or strip newly across the strip of a `vault`-use span of it" among them; *anything across a
  strip* counts "a wall's band or wall strips" (l. 2644–2645). The bent-group sentence's strip is "the under-deck strip
  widened each side by the band's half there … together with every held building's widened strip that meets it" (l.
  3176–3178), and its moves put the line on that strip's edge — (i)'s path "from its entry point along that side's edge
  to it, across the strip there and along the other edge to its exit point" (l. 3198–3199), (ii) "by that side's edge"
  (l. 3202–3203), (iii) "the nearest point of the edge on the side it entered from" (l. 3205). On that edge the band
  lies just outside the under-deck strip, and the wall strip on the deck's side reaches into it by its setback (inner
  6–10 m, outer with glacis 10–20 m, §4.8 l. 8351, 8354), far past the 1 m strip margin and across the deck's plan: every
  span the edge runs beside has the wall strip across its own strip. Second fix pass's M4 (VF7v-GEN-02) conditioned the
  **lawful crossing** (l. 3185–3187: "nor its line, band or wall strips newly across a shape-locked raised way's
  `vault`-use span's strip"), but the strip and its long sides (l. 3187–3188) take in only the held buildings' widened
  strips, so a stretch drawn along beneath a shape-locked aqueduct, or moved along its strip to a lawful crossing, is
  laid by the example with its wall strip across the `vault`-use spans it passes — which law 1 (10) bars and §5.3's
  law-1 row catches (T110-2 (4)'s along-beneath clause runs the shape-locked C8 state, l. 19279–19281, 19441–19445).
  The laws govern (law 2 (a): the stretch re-laid between the nearest points clear of what it meets): minor. (An
  unlocked raised way's spans along such an edge are read `open` by law 1 (8) — a soft reading, lawful.)
* **Required change (model).** The bent-group sentence (l. 3176–3178): "together with every held building's widened
  strip that meets it (*beneath*)," → "together with every held building's widened strip, and the strip of each
  `vault`-use span of a shape-locked raised way widened all round by the wall strips' width there (law 1 (10)), that
  meets it (*beneath*),"; and (l. 3187–3188) "each passing outside every held building's widened strip on its side;" →
  "each passing outside every held building's widened strip and every such widened span strip on its side;".

### VF7w-TBL-04 — law 3 sends a line's part to "the strip's edge", where law 1 (4) leaves half its band inside

* **Severity:** minor · **Kind:** law wording; two readings, one excluded by law 3's own lead · **Owner:** model
  (END-L, the laws' home)
* **Claim.** Law 3 (l. 2855–2856; Part L l. 614–615): "A line's part inside a strip that crosses no deck line there
  goes to the strip's edge on the side it entered from." *The strip* is the under-deck strip (l. 2614–2615); a line on
  its edge has half its band inside it, which law 1 (4) (l. 2721–2723: "its band lies in a raised way's strip only to
  cross its deck line") bars, and for a shape-locked raised way its wall strip across the `vault`-use spans beside it,
  which law 1 (10) bars. Law 3 ranks "the lawful shapes law 2 (a) or (b) leaves open" (l. 2844), so the literal place is
  never among them and the sentence can only choose the side; the bent-group example reads it so, widening its own strip
  "so that every part and edge below is the band's" (l. 3176–3178). Every build that passes the check takes the entry
  side's nearest lawful place; nothing built changes: minor. The fix takes words out (J150).
* **Required change (model, END-L; Part L l. 614–615 with it).** Law 3: "goes to the strip's edge on the side it
  entered from" → "leaves it on the side it entered from".

## 3. What was attacked and closed with no finding

* **The laws as stated.** Part L's words but for markers, citations, the J150 hand-off parentheses and the two END-L
  lines (method (2)); `adjudication-r7w.md` changed no law. Law 1 (1)–(11) each checked by §5.3's law-1 row (l. 9943:
  "its clauses (1)–(11) as the laws state them", once per commit, the stored `laidAt` and `courseAt`, what the commit
  made newly or moved) and by T110-4 (l. 19606–19641: every family fixture, the state sweep, 200 random ops on 32 seeds
  over every path and a village rung, unlocked, placement- and shape-locked, the model and records digests on two hosts,
  undo and redo) — no invariant unchecked.
* **Every wall event** (W1–W14, and a burial, a warp, a `revert`, a `split` / `merge`, a castle grip, a hand castle
  siting or bailey edit, a water op's re-trace, an absorb with no epoch, a skeleton's import — its declarations entered
  as a creation prefix through the dry run, so a conflict is the hand path's bend or refusal, W1·C8): law 4 re-checks
  each; law 2 (a)–(c) gives each an outcome on each of its paths. W14 as the second fix pass wrote it (a REPLACEMENT
  waiting where a kept gate's stone footprint would lie where law 1 (5) bars it, or its new top would take an arch over
  a kept gate below the wall's top) agrees with law 1 (2), (5), (11) and V07 §3.11 (V07 l. 2313–2316).
* **Every raised-way state** (C1–C13): the aqueduct's form read from recorded soffits standing or fallen; a support's
  own derivation keeps every new pier off a standing band ((3); C1, C10's new part, C12), so a merge at C1 is at an arch;
  (7)'s kept old end span and its bent past-bound course agree with law 2 (c) word for word; a frame growth's extension
  lays only on ground the grown frame reveals, so no trace older than the deck lies across it (law 1 (3) by the kept
  `courseAt`).
* **Every lock.** Placement either side: soft readings, *Carried way*'s gate by hand, (G2) shown, no refusal (law 2
  *Entry*). Shape on the raised way: no wall-like line, band or strip newly across a `vault`-use span's strip (the one
  list, the lawful crossing, the retaining-wall sentence, W2·C8, W3·C8 — the edge moves aside, VF7w-TBL-03); a merge
  round its pier or under an `open`-use span, a cap of the newer wall's own top, a gate or claim under its clearing arch,
  and a ring road, square or moat across an already-`open` span lawful (law 1 (10)'s list names wall-like changes only;
  row (e) stops a moat at a span read `vault`). Shape on the wall: no merge, no gate (*Carried way* re-routes, else law 2
  (c)), an over crossing lawful. No finding concerns a lock under undo, redo, a re-grade or a repair (J150).
* **Who bends at an op that names neither side.** *Newer*'s first sentence (l. 2763–2764: "where the op names both or
  neither (a warp), the raised way is the older") and its second ("Between structures standing before the op the newer is
  the later by *Order*") both read a table edit (`stripMarginM`, `span.deckDepthCm`, a band, setback or wall-top row) or a
  terrain stroke that makes a meeting of two standing structures; where the raised way is the later by *Order* they name
  different sides. Closed by the first sentence, which names such an op, read with (6)'s lead (l. 2569–2571: once
  created a raised way is "kept: nothing laid later … moves, adds or omits a station …; only an op that names it changes
  it"), so the wall bends, else law 2 (c) — one outcome, as the first round-7v check read the warp.
* **The cells.** Every row of both tables has its 15 and 5 cells; every "as Wn·Cm" resolves (method (3)); each cell
  gives one built form, its writing op and records, its gates on ground part 0, its bend key or fate by law 4 and its
  undo — where a cell omits one, law 4 and law 1 (8) supply it — but for the cells VF7v-TBL-02 names. The cells' named
  tests are the tests lens's to grade (its VF7w-TST-05 names five cells, W1·C1, W4·C2, W5·C2, W6·C2 and W8·C2, whose
  tests leave a path unrun); those this lens checked hold their cases (W1·C8 → T110-4 (c)'s village rung, now holding a declared viaduct and aqueduct, one
  placement-locked; row (d) → T110-2 (2), (3); W3·C2 → T110-2 (6)'s carried-way runs; W14 → T110-2 (4)'s re-grade and
  T-V7-48's REPLACEMENT; W8·C1 / C2 → T-V6-11; W2·C2 → T-V4-63), every family clause now asserting the laws' outcome
  for its fixture (T110-2's lead, `adjudication-r7w.md` S0).
* **The support step's own rules against the outcomes.** (3)'s obstacles and slide bound and the span rule's step (2)
  agree with *over the band* (supports off the band, its own derivation), *down before the wall* (no road deck across a
  standing trace, (7)'s extension and a repair excepted as no course laid), *beneath* (the band through a road deck's
  support, round a merged arch or pier, at *the edge* of an over crossing's) and *unchanged meeting*; (6)'s lead defers
  walls to the laws; the span rule's last sentence agrees with END-L1. *beneath* now cites the one list at S5a for every
  pulled or cost-field trace (M6): its items agree with law 1 (2)–(4), (9), (10) but for VF7w-TBL-01 and -02, and read
  for an epoch circuit, contraction or hand `contractWall` (whose line is the later of every standing deck's) they bar
  no road deck's deck line, as law 1 (3) gives.
* **Restatements narrower than a law, no example claiming to be whole** (a case missing from the examples, no finding):
  *beneath*'s, row (d)'s and W1's statement of S5a's pin (a crossing on a ramp, stair or foot pinned beyond the foot),
  which the second fix pass widened at S5a (also nearer the foot than the first point beyond it, or with band or wall
  strips over the ends; the model seat's note); the bent group's (i) for an aqueduct's foot, which offers only crossings
  along the deck where *Where the line crosses* also lets a trace pass round its end; (G3)'s list in the lock sentence,
  which names no castle re-sited at generation and no frame growth.
* **Owner rules.** Item 110 (b) (no junction; ends at ramps; "crossing the wall through an arch" as over or merged) and
  (f) (zero junctions; a removed one stays removed, W3·C7, T110-3); item 114 (law 1 reads runs whatever their condition;
  W4, W5, W10, W12; the merged arch the aqueduct's own); item 101 R2 (law 2 (a), law 3, (G3)'s alternatives); J144 (law 2
  *Entry*; the lock sentence); J147 (*held*; law 1 (10)); J148 (Tier 1 never moved, law 1 (11); a user's own placement or
  slide the op's own edit); J149 (over and merged by level; beneath left out as its "if they help" allows) — none
  contradicted by the laws; VF7w-TBL-02's doubled reading is the one outcome found against J144 as the program reads it.
* **Readers inside the lens.** Every citation in the support step outside the laws names a law before its example; no
  citation of a law, clause, row or cell that does not exist anywhere in the set (method (3)); every named part an outside
  text cites (*At the frame*, *Reported*, *Line and band*, *the edge*, *The cap*, *Nearest points*, *Several raised ways*,
  *No gate and no tower*, *A held building in an arch vault*) is defined in §2.7.

## 4. Verdict for this lens

The laws at §2.7's support step (6) are Part L's laws in Part L's words with the first fix pass's two END-L
supersessions (the second changed none), and they decide every case this lens ran — every wall event, every raised-way
state, every path and every lock axis on either side — with one lawful outcome, no owner rule crossed and every law-1
invariant checked by §5.3's law-1 row and T110-4. Of the five round-7v findings of this lens three are fixed, two are
closed as listed valid choices, and one (VF7v-TBL-02) persists in the C5 column. The defects left are in the texts that
restate the laws for a builder. The one list of a trace's impassables at S5a — which *beneath*, every pull and cost
field and a hand `contractWall` now cite — and §4.3's aqueduct course rule keep a wall off a raised way's bare ramps,
stairs and feet where law 1 (4) keeps it off its ends, so a build from them fails the check (VF7w-TBL-01, MAJOR); and
the same list, read as written, widens a held building's strip twice, giving way where law 2 (a) lays a lawful trace
(VF7w-TBL-02, MAJOR). Three examples still say other than the laws: the C5 column passes a trace through a `cleared` ring
unconditioned (VF7v-TBL-02), the bent group's edge moves lay wall strips across a shape-locked raised way's `vault`-use
spans (VF7w-TBL-03), and law 3's "the strip's edge" names a place law 1 (4) bars (VF7w-TBL-04, a word-saving fix). **Two
majors, no blocker, three minors in this lens.**
