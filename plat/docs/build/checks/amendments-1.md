# The M0 hardening amendments to the design — item 130 (lane `session/amendments-1`, 2026-10-14)

A documentation seat under the owner's delegation (J237 the M0 hardening phase; J355 Q3 the one spec-lane amendments
round, no code; J358 it runs next, docs-only), on the brief `workflows/lane-prompts/session-seats/amendments-1.md`. It
writes the M0 build's session rulings into the design's own text and records them as amendments file **i**, item **130**
(`docs/AMENDMENTS-2026-10-14i.md`). Every ruling stays vetoable by the owner.

## §0 The tree and the sources

* The tree: `.git/HEAD` → `refs/heads/main` = `f9772441b4432e43901b185eca5354ab4575544d`, read as files (no git
  command); 2026-10-14, machine `linux:Intel(R) Xeon(R) Processor @ 2.80GHz:4cpu:16gib`, Node v24.12.0;
  `corepack pnpm install --frozen-lockfile --offline` in `plat/` 0 ("Already up to date").
* Read: `docs/AMENDMENTS-2026-10-13h.md` (the form); `plat/docs/build/checks/rulings-hardening-1.md` §0 – §8 whole;
  `M0-spec-notes.md` rows N-37, N-38, N-40, N-41, N-42, N-43, N-44, N-45, N-46, N-52, N-55, N-57, N-58, N-59, N-61
  (N-60 absent); `docs/PROGRESS.md` rows J237, J238, J264, J290, J318, J348, J349, J355 – J358; `docs/KNOWN-ISSUES.md`
  KI-2; `plat/docs/build/choices.md` C-0177 (whole, (14) the reading named), C-0290, C-0209 (head, for N-42's context),
  and a grep for J318 (C-0344); `checks/M0-a-06-notes.md` N-s6-2, N-s6c-3; `docs/M0-FIX-QUEUE.md` Q54, Q56, Q61;
  `plat/docs/build/M0.md` §3 and its heading list. Design sections read whole before editing: base §3.6, §3.7, §3.8,
  §3.10, §3.11, §4.8's wall-strip and gate paragraphs, §5.1 (5), §13.1, §16 (preamble, M0 and M4 rows); by grep and the
  paragraphs found: §2.2 rule 3 (dissolution, the flag, demotion), §3.3's overlay sentences, §4.6's kerb sentences, §4.7
  S9, §5.2's F-SKELETON row. The twelve volumes searched by grep for every sentence the rulings change (the 5° contract,
  the kerb's spines, the strips' stops, the wedge sweep, "never rejected for precision", the open-frame guard): none
  restates one, so every design edit is in the base.
* Method: each edit made by exact string replacement (asserted unique), paragraphs re-wrapped to the file's 120 columns;
  a word-level diff of the edited base against its copy inside the pre-edit `ARCHITECTURE-FULL.md` (lines 273 – 24552)
  shows only the replaced passages below.

## §1 The amendments (file and heading; the sentence replaced; the sentence written; the authority)

All in `docs/ARCHITECTURE.md` unless named. Each written passage carries an `(item 130 (x))` tag, the design's way of
citing an item (as item 129's rows do).

1. **(a) §3.6 *Attraction*, step 4 — wedge routing capped.** Replaced: "Either way the chain moves at most `minEdge / (2
   tan(θ/2))` for a corner of angle θ (0.47 m at the 30° junction floor, 1.2 m at the 12° plot floor; §4.7)." Written:
   "Either way the chain moves `minEdge / (2 tan(θ/2))` for a corner of angle θ (0.47 m at the 30° junction floor, 1.2 m
   at the 12° plot floor; §4.7), a move with no bound as θ → 0, so wedge routing applies only where it moves the chain at
   most 2 · √2 · `attractCm` ≈ 73.5 cm (θ ≥ 19.3° at `minEdge`), the largest move under which §3.7's attracted bound
   holds: the 30° junction floor keeps its wedge route, the 12° plot floor's 1.2 m does not. Beyond it the two crossings
   are placed in turn by the placement rule — the second at least `minEdge` from the first under (ii), a step across the
   sliver — or by the rule's endpoint fallback, and a corner below `minFaceAngle` this leaves on a mandatory chain
   commits with `W_ACUTE_CORNER`." The optional-chain sentence after it is unchanged. Authority: N-38 (J186) with its
   first sentence replaced by N-40 (J188).
2. **(a) §3.6 *Existing geometry wins*.** Replaced: "An incoming chain vertex moves at most √2 · `attractCm` ≈ 36.8 cm
   (onto an edge's endpoint from beside the edge), or by the corner bound of step 4 at an acute tip; no existing vertex
   moves; …". Written: "… or by the corner bound of step 4 at an acute tip (at most 2 · √2 · `attractCm`), and a crossing
   that the placement rule's endpoint fallback moves onto the crossed edge's nearer endpoint is held by the fidelity bound
   below; no existing vertex moves; …". And edge kind (d), replaced "(d) the span between two crossings — resolved at
   the acute corner by step 4." with "… resolved at the acute corner by step 4, or placed in turn at least `minEdge` apart
   under (ii) where the corner's move exceeds step 4's cap." (a second place the cap reaches). Authority: N-40 ("the
   endpoint route moves a crossing up to half a sub-edge, which can exceed √2 · `attractCm`"), N-38 / N-40.
3. **(a) §3.6 — a new paragraph, *The fidelity bound*** (after *Existing geometry wins*): every commit of a mandatory
   chain's segment keeps its route within 2 · √2 · `attractCm` ≈ 73.5 cm of the input segment, Hausdorff both ways,
   join and leave points included, whichever step routed it; a route beyond is never committed, the router seeks an
   in-bound route (crossings in turn, the segment split at the obstruction, rounding moves) and a chain with none is
   refused; a stretch's leave point at an existing vertex is not an incoming vertex and is held by this bound; it does
   not replace §3.7's area bound; every endpoint-fallback commit reports `W_PLACED`. No sentence replaced. Authority:
   N-43 B (J199), N-44's "Effect now" (J201), N-41 (2) (J191), N-46 (1) (J211), N-37 appended by N-40.
4. **(a) §3.6 *Chain classes*.** Replaced: "`mandatory` chains — … — cannot fail for a precision reason: after
   attraction and placement no precision error is left, only §3.1's non-precision codes can reject one, and a corner
   below `minFaceAngle` commits with `W_ACUTE_CORNER`." Written: "`mandatory` chains — … — are refused for a precision
   reason only where no route keeps §3.10's clearance within the fidelity bound, as `E_INVARIANT`, and every such
   refusal is counted (§13.1); otherwise only §3.1's non-precision codes can reject one, and a corner below
   `minFaceAngle` commits with `W_ACUTE_CORNER`." Authority: N-46 (1) (KI-2's own wording), N-44.
5. **(e) §3.6 *Roles on shared stretches, and slivers*.** Appended to its roles part (after "a quay on a shore carries
   `shore` and `way`."), the ruling's text verbatim: "A chain given again under a key that already carries a run — the
   same trace re-inserted, an arc re-traced between its gates, a stroke along a standing way — is that run: its points
   land on the run's vertices within √2 · `attractCm` (the bound its first insertion moved them by), its segments follow
   the run between two landings, and it adds no vertex, no edge and no row; a point farther than `attractCm` from the
   run is another chain under the key and is refused by role consistency (§3.10)." Nothing replaced. Authority: RQ3,
   rulings §3, N-61 (3), J358 (3).
6. **(d) §3.6 step 4, appended** (the ruling's place, "after step 4's text"), verbatim: "A route never re-enters a
   vertex already on the chain's path: where a landing or an attraction would lead the segment back through such a
   vertex, the path is cut back to that vertex and routed on from it, so every committed run is a simple path or ring
   (§3.10's role consistency; §3.11). The cut is a function of the arena and the input and moves nothing." Nothing
   replaced. Authority: RQ1, rulings §1, N-61 (1), J358 (1). N-41 (3) ("a row that traverses an edge out and back is
   lawful") is superseded for chains and kept for the winding walk's reading (rulings §8 (6)) — said in the AMENDMENTS
   file (history), and in the design as the walk's rule (entry 8).
7. **(b) §3.7 *The kerb, defined once* — the bounding spines.** Replaced: "`kerb(F) = F − ⋃ buffer(spineᵢ,
   half-widthᵢ)` over F's bounding spines, each half-width sampled …". Written: "… over F's bounding spines — every spine
   incident to F, on a route edge of its boundary or through a route vertex of it, whose buffer meets F: the spines of
   F's boundary edges, and every spine through a boundary vertex whose buffer reaches into their kerb —, so a block never
   overlaps a corridor it does not bound (a corridor is a reservation), each half-width sampled …". And, its consequence
   in the same paragraph, replaced "A face with no bounding spine (bounded only by shore, border or other edges that
   declare no half-width) has `kerb(F) = F`." with "… declare no half-width, and met by no incident spine's buffer) has
   `kerb(F) = F`." Authority: J318 (2)'s reading, ACCEPTED as the design by J348 (1) (N-60 not yet written; J348 (1)'s
   words, as the brief directs).
8. **(d) §3.7 *Decision* — the winding walk.** Replaced: "(a breadth-first walk from the unbounded face that adds each
   crossed edge's ring orientation)". Written: "(… ring orientation; an edge one ring traverses out and back adds 0, so
   such a spur is never boundary)". Authority: N-41 (3) kept for the walk (rulings §1 and §8 (6)).
9. **(b) §3.7 — the gate sentence.** Replaced: "— and a strip ends at the corridor of the way through each gate, so every
   gate passage stays open by construction." Written: "— and a strip ends at the corridor of the way through each gate
   (and at every other corridor a strip meets, §4.8), so every gate passage stays open by construction." (the ruling's
   words). Authority: RQ5, rulings §5 and §8 (4), N-61 (5), J358 (5).
10. **(a) §3.7 *Oracles, not fallbacks*, the attracted cases.** Replaced: "(a wedge-routed tip sweeps at most half a
    `minEdge` per unit of arm length)". Written: "(a wedge-routed tip moves at most 2 · √2 · `attractCm` and so sweeps at
    most √2 · `attractCm` per unit of arm length, §3.6)". Authority: N-40's restatement of N-38's sentence.
11. **(f) §3.8 *Numeric contract*.** Replaced: "Input is pre-cleaned by merging collinear vertices; holes are supported.
    After the clean the input must have no corner sharper than 5° on either side (an interior angle below 5° or above
    355°) and no hole touching the outer ring or another hole (faces may have both, §3.10): a ring set that breaks either
    takes its reader's downgrade without running, so no cleaning step ever reshapes a roof." Written, the ruling's text
    verbatim with the old text's "holes are supported" and "(faces may have both, §3.10)" kept in it: "Input is
    pre-cleaned by merging collinear vertices and by dropping spurs — exact zero-width spurs, and inexact ones whose
    shorter arm's end lies within `attractCm` of the longer arm (the lattice's own coincidence band, §3.6): every tip of a
    round removed at once, to a fixpoint, so the clean is a function of the ring alone; holes are supported. After the
    clean the input must have no hole touching the outer ring or another hole (faces may have both, §3.10), and no corner
    sharper than the use's bound — 5° on either side for `roof` (an interior angle below 5° or above 355°: a 1 cm edit
    never flips a ridge, GEO-8), 1° for `spine` and `regions` (the engine's fold threshold, below which two edges are one
    direction): a ring set that breaks either takes its reader's downgrade without running, so no cleaning step reshapes
    a roof beyond the lattice's coincidence. The 1° bound for `spine` and `regions` was ruled by the session 2026-10-14
    (N-61 (7)), vetoable by the owner; the earlier 5° for every use stands as history." Authority: RQ7 (A) and (B),
    rulings §7, N-61 (7), J358 (7); N-52 (3)'s exact-spur clean folded in. (B) is OWNER-VETOABLE (rulings §8 (1)).
12. **(f) Second places of the 5° contract.** §3.11 *degenerate geometry*: replaced "or a corner sharper than 5°, takes
    its reader's downgrade (§3.8)" with "or a corner sharper than its use's bound (5° for `roof`, 1° for `spine` and
    `regions`), takes its reader's downgrade (§3.8)"; §5.2's F-SKELETON row: replaced "(a corner sharper than 5°, a hole
    touching the outer ring or another hole)" with "(a corner sharper than its use's bound — 5° for a roof, 1° for
    `spine` and `regions` —, a hole touching the outer ring or another hole)". Authority: as entry 11.
13. **(g) §5.1 (5) *Coefficients* — the law as floor.** Appended, the ruling's text verbatim: "A counter whose law the
    design states as a floor (the skeleton's 4 · (n + r) + 64, §3.8) is written as the larger of the measured coefficient
    and that law." With it §3.8's work-limit sentence gains "The law is the floor of the `skeleton.events` row at every
    version (§5.1 (5))", so the design does state it as a floor. Nothing replaced. Authority: RQ6, rulings §6, N-61 (6),
    J358 (6). (§3.11 states no coefficient; nothing there.)
14. **(c) §3.10's level-consistency row.** Replaced: "a vertex finer than an incident edge lies inside that edge's run —
    its incident edges coarser than it are exactly two, of one level, with identical rows of that level (§2.2 rule 3)".
    Written: "a vertex finer than an incident edge lies inside that edge's run at every level between — a vertex finer
    than level r with edges of level ≤ r has exactly two, of one level, with identical rows of level r (of level ≤ 1 at
    r = 1), for every r between (§2.2 rule 3)". Authority: Q61, N-s6-2's wording (`checks/M0-a-06-notes.md`), J349 (3);
    built by M0-a-14 s3.
15. **(e) §3.11 *degenerate geometry*.** After "a collinear overlap is one shared stretch with merged roles;" added "a
    chain given again under a key that already carries a run is that run and adds nothing (§3.6);". Authority: RQ3.
16. **(b) §4.8 *Wall strips* — the stop sentence.** Replaced: "The lines carry the structural `setback` role (§2.2 rule
    7), run from gate to gate, stop at each gate's plaza claim or arterial corridor, and close on the secondaries S5c
    stopped at the setback band, so each strip is a face of its own;". Written, the ruling's text with the brief's
    "membership by area": "… run from gate to gate, stop at each gate's plaza claim and at the corridor of every way they
    meet — a gate's way at its passage, and any way whose corridor runs inside the strip's width, along its whole length
    there — so no strip face overlaps a corridor (a corridor is a reservation, §3.7, §4.6; a face is a strip's by area: it
    lies within the strip's width of the trace and its interior meets no corridor), and close on the secondaries S5c
    stopped at the setback band, so each strip is a face of its own;". Authority: RQ5, rulings §5, N-61 (5), J358 (5).
17. **(b) §4.7 *S9 Corridors* — a second place.** Replaced: "a wall strip's L2 is its half-corridor strips along the
    arterials at its gates (and along the intervallum, where there is one)". Written: "… along the arterials at its gates
    and along any other way whose corridor it meets (§4.8) (and along the intervallum, where there is one)". Authority:
    RQ5 (the strip now ends at every corridor it meets, so its L2 meets those corridors too).
18. **(a) §13.1 — the bar.** After the bar's sentence ("… 0 invalid outputs … at the sizes of §13.8's tiers.") a
    paragraph: the bar is how an operation fails — (1) no throw; (2) no silent wrong result, the commit record included;
    (3) every refusal counted by cause and family (random, constructive, mandatory-only, the arrangement's buffer and
    `offsetFace` families, none split), the fidelity bound's refusals counted whatever their code, the target zero
    refusals of lawful input, each family's cap its measured rate + 3 · √(count), ratcheted, never raised without the
    owner, the build failing above it, a built-on operation's `insertChain`-replayed refusals counted against
    `insertChain` and its own held to 1 per 10⁴; (4) the refusal register. Nothing replaced. Authority: N-44 (1) – (4)
    (owner-approved, J201; J204, J206 – J208), N-46 (2) – (5) (J211), J264 (owner, the zero target).
19. **(a) §13.1 *Properties*.** Replaced: "mandatory chains never rejected for precision;". Written: "a mandatory chain
    refused only where no route keeps §3.10's clearance within §3.6's fidelity bound, every such refusal counted, and
    every committed mandatory segment within that bound of its input;". Authority: N-46 (1) (KI-2's wording for §13.1 and
    C-0177 (14)), N-43 B.
20. **(e) §13.1, constructive *geometry classes*.** After "a track on a field boundary" added "— and a chain given again
    under its own key, identical and with every point moved up to √2 · `attractCm`, absorbed as its run (§3.6)".
    Authority: RQ3 (P2's cases; the census's five seeds are M0-a-05's pins).
21. **(a) §16, the M4 row's content.** After "release notes naming known defects;" added "**the whole-system hardening
    pass under the build's fail-safe rule** — a throw or crash on a valid input, a silently wrong committed result and
    nondeterminism are never deferred (each fixed when found, every failure on valid input failing loudly: a typed
    refusal or a bug abort, never a quiet wrong state), and a rare-case shortfall that already fails safely (a counted
    refusal under §13.1's caps, a result within its bars but short of ideal) is a known-issue row with its repro, drained
    here; M0's own known-issue rows are drained in M0's hardening phase before M1, so this pass takes those of M1 on;".
    Nothing replaced; the row's estimate is unchanged. Authority: N-45 (a) (owner-approved, J202), J237 (owner), J238.
22. **(i) `plat/docs/build/M0.md` §3** (the protocol's preamble, the rules every seat keeps), after "A checker seat is
    implementer-side … never the item's author.": "Every seat, author or checker, discloses harness-injected context — a
    memory index, a git status line, a file listing the harness shows a seat unasked — in its `CLEAN-ROOM.md` row and
    never uses it; the row's disclosure is the rule's satisfaction (J355 Q11; item 130 (i))." `M0.md` is owned by no
    item: declared with `--owns` in this seat's record (§4 below). Authority: J355 Q11, J358 (M0.md §3, never
    CLEAN-ROOM §1).
23. **The records.** `docs/AMENDMENTS-2026-10-14i.md` (new; item 130 (a) – (i) in file h's form); `README.md`'s owner
    rules row names file i; `docs/BACKLOG.md` one row (no new owner words; what stays parked for the owner); the bundle
    regenerated (§3).

## §2 What could not be placed

* **(h) RQ4 — the "no open frame of this kernel" guard.** The design never names it: §3.3 and §3.11 say only that an
  overlay past its batch is a programming error (rulings §4: "Design-doc amendment. None needed"); no volume names it.
  Nothing struck; the reading is N-61 (4) and the choices row M0-a-16's round writes; recorded in the AMENDMENTS file.
* **C-0177 (14)'s "parent-finding rule".** The brief asks for "C-0177 (14)'s reading where §3.6 / §3.10 state the
  parent-finding rule". C-0177 (14) holds the tests' readings (snap-rounding idempotence, `remove(insert(x)) ≡ id`, the
  10⁶ of "mandatory chains never rejected for precision"); the parent-finding (re-parenting) reading is C-0177 (9), and
  neither §3.6 nor §3.10 states a parent-finding rule beyond step 5's "a kept face is re-parented into the new face that
  contains it", which (9) does not contradict. KI-2 and N-46 (1) name (14) for the refusal reading, and that is what
  was placed (entries 4 and 19). No re-parenting text was invented.
* **RQ2 (N-61 (2))** — the coincident fold-back vertex row `(shape, chain)`; its ruling gives a §2.2 rule 3 amendment
  text, but neither the brief's list nor N-61's list of the amendments round's texts carries it; left unwritten for the
  session.
* **N-60** is absent from `M0-spec-notes.md`; the corridor statement is J348 (1)'s words (entry 7), to be checked
  against N-60 when M0-c-06's third continuation writes it.
* **§4.7 S9's "and one built block, the strip block"**: where a way's corridor runs inside a strip's width the strip
  may leave more than one strip face (rulings §5's code consequence: the ground on both sides of the corridor within
  the width); the sentence was left as it stands (entry 17 amended only the corridors).
* **J358's "M0-work.json's twin at the amendments round"** (RQ6's twin entry) and its "OWNER-INSTRUCTIONS rows": both
  outside this brief's clean room (`M0-work.json`, `docs/OWNER-INSTRUCTIONS-2026-09-25.md`); not touched.

## §3 The bundle regenerated

`python3 tools/bundle_architecture.py` → "wrote docs/ARCHITECTURE-FULL.md: 73133 lines from 14 source(s)"; `--check` →
"UP TO DATE". Line counts (`wc -l`): `ARCHITECTURE-FULL.md` 73 068 before, 73 132 after; `ARCHITECTURE.md` 24 280
before, 24 344 after. No volume changed.

## §4 The landing

`corepack pnpm landed -- amendments-1 --lane session/amendments-1 --wave flow-7 --owns
plat/docs/build/checks/amendments-1.md --owns plat/docs/build/M0.md`, then `corepack pnpm landed:verify -- flow-7 --item
amendments-1`; outputs quoted in the lane log's LANDED line. No git command was run; no code, test or table was touched.
