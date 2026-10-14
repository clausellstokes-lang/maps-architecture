# Amendments i — the M0 hardening amendments to the design (2026-10-14)

Numbered from **130** (file h ended at 129). Applied directly to the base by the session's documentation seat
`session/amendments-1` (J355 Q3: "one spec-lane amendments round … needs no code"; J358: it runs next, docs-only). The
authority is the session's rulings under the owner's delegation (J237 "also make sure you do the hardening phase for m0
before m1"; J238 "its important that we get m0 right since its the foundation for everything"), each recorded as a spec
note in `plat/docs/build/checks/M0-spec-notes.md` (N-) and a row of `docs/PROGRESS.md` (J), and each **vetoable by the
owner**; two of the cited rules (N-44, N-45) and the refusal rule (N-58) are owner-approved. Legend as in file c: the
rulings are the authority; the consequences are the program's vetoable interpretation. No volume restates a sentence
these rulings change, so every edit is in `docs/ARCHITECTURE.md`; the seat's report, with each sentence replaced quoted,
is `plat/docs/build/checks/amendments-1.md`.

---

130. **SESSION RULINGS — The M0 build's rulings written into the design (2026-10-05 – 2026-10-14; KI-2, J191 – J211,
     J318, J348, J349, J355 – J358).** The M0 build ruled in words where the design's text was silent or wrong; the design
     now says what the build was told.

     **(a) KI-2 — insertion's bounds and the refusal bar** (N-38 as amended by N-40, J186 / J188; N-43 B, J199; N-44, J201
     owner-approved, with J204 and J206 – J208; N-45, J202 owner-approved; N-46 (1) – (6), J211; J237; J264 owner).
     §3.6 step 4: wedge routing applies only where the corner's move is at most 2 · √2 · `attractCm` ≈ 73.5 cm (θ ≥ 19.3°);
     beyond it the crossings are placed in turn or by the endpoint fallback, and a sub-`minFaceAngle` corner left on a
     mandatory chain commits with `W_ACUTE_CORNER`. *Existing geometry wins* names the cap and the fallback (and its edge
     kind (d) the crossings placed in turn). A new paragraph, **the fidelity bound**: every committed mandatory segment
     lies within 2 · √2 · `attractCm` of its input (Hausdorff both ways, join and leave points included); a route beyond
     it is never committed; a stretch's leave point at an existing vertex is held by it (N-41 (2)); it does not replace
     §3.7's area bound (N-46 (1)); every endpoint-fallback commit reports `W_PLACED` (N-37 as appended by N-40).
     *Chain classes*: a mandatory chain is refused `E_INVARIANT` only where no route keeps §3.10 within the bound, and
     the refusal is counted (N-46 (1); C-0177 (14)'s "never rejected" read so). §3.7's sweep sentence: a wedge-routed tip
     moves at most 2 · √2 · `attractCm` and so sweeps at most √2 · `attractCm` per unit of arm length (N-40). §13.1: the
     bar is how an operation fails — no throw, no silent wrong result (the commit record included, N-46 (2)), every
     refusal counted per cause and family with the bound's refusals counted whatever their code (N-46 (3), (4)), the cap
     per family the measured rate + 3 · √(count), ratcheted, never raised without the owner, the target zero refusals of
     lawful input (J264), the built-on rule (N-44's last clause, N-46 (5)) — and the refusal register (N-44 (4)); the
     property "mandatory chains never rejected for precision" restated. §16's M4 row gains N-45's shape: fail loudly
     (N-45 (a)), a safely failing rare case a known-issue row drained by the hardening pass, M0's own rows drained in M0's
     hardening phase before M1 (J237).
     **(b) The corridor statement** (J318 (2), accepted as the design by J348 (1); N-60 not yet written, so J348 (1)'s
     words; RQ5, N-61 (5), J358). §3.7's bounding spines: every spine incident to F — on a route edge of its boundary or
     through a route vertex of it — whose buffer meets F; kerb(F) subtracts every incident spine whose buffer reaches into
     the edge spines' kerb; a block never overlaps a corridor it does not bound. §3.7's gate sentence gains "(and at every
     other corridor a strip meets, §4.8)"; §4.8's stop sentence takes the ruling's text — every way corridor meeting the
     strip region is a stop along its whole length, membership by area. A second place amended: §4.7 S9's "a wall strip's
     L2 is its half-corridor strips along the arterials at its gates" gains "and along any other way whose corridor it
     meets".
     **(c) Level consistency at every level** (Q61; N-s6-2, `checks/M0-a-06-notes.md`; J349 (3); built by M0-a-14 s3).
     §3.10's row: a vertex finer than level r with edges of level ≤ r has exactly two, of one level, with identical rows of
     level r (of level ≤ 1 at r = 1), for every r between — the every-level reading replaces the single-level one.
     **(d) A chain never retraces an edge** (RQ1; N-61 (1); J358 (1)). §3.6 step 4 gains the ruling's text: a route never
     re-enters a vertex already on the chain's path; the router cuts it back to that vertex, deterministically. N-41 (3)'s
     "a row that traverses an edge out and back is lawful" is SUPERSEDED for chains and KEPT as the winding walk's reading
     (rulings §8 (6)); §3.7's walk sentence states it (an edge one ring traverses out and back adds 0).
     **(e) The doubled trace is lawful** (RQ3; N-61 (3); J358 (3)). §3.6 *Roles on shared stretches* appends the ruling's
     text verbatim: a chain given again under a key already carrying a run is that run, landing within √2 · `attractCm`,
     adding nothing (`insertChain` returns ok with nothing new); §3.11's *degenerate geometry* row and §13.1's constructive
     set name it.
     **(f) The skeleton's numeric contract** (RQ7; N-61 (7); N-52 (3); J358 (7)). §3.8: (A) the pre-clean drops exact and
     inexact spurs — a tip whose shorter arm's end lies within `attractCm` of the longer arm's segment, every tip of a
     round removed at once, to a fixpoint, order-free, `roof` included; (B) the contract angle is 1° for `spine` and
     `regions`, 5° kept for `roof`, the validator the net. **(B) widens a design constant and is OWNER-VETOABLE**; the
     design text says so in place ("ruled by the session 2026-10-14 (N-61 (7)), vetoable by the owner; the earlier 5° for
     every use stands as history"); the fallback keeping the design as written is the refusal census's (c) reading.
     M0-a-11's round measures the [1°, 5°) validator pass rate before committing (B). Second places amended: §3.11's
     *degenerate geometry* row and §5.2's F-SKELETON row, which repeated "a corner sharper than 5°".
     **(g) The work-limit law is a floor** (RQ6; N-61 (6); J358 (6)). §5.1 (5) *Coefficients* appends: a counter whose
     law the design states as a floor (the skeleton's 4 · (n + r) + 64, §3.8) is written as the larger of the measured
     coefficient and that law; §3.8's work-limit sentence names the law the `skeleton.events` row's floor at every
     version. f-03b's row: max(measured p999 × 1.5, law) = perUnit 8, floor 64.
     **(h) The open-transaction guard** (RQ4; N-61 (4); C-0290; J358 (4)). N-55 (5) (1)'s "no open frame of this kernel"
     clause is STRUCK; C-0290's closed-overlay guard is the design (`isOpenTx`: minted by `tx` ∧ not closed). The design
     text never named the struck clause (§3.3 and §3.11 say only that an overlay past its batch is a programming error),
     so nothing in it changes; the reading lives in N-61 (4) and the choices row M0-a-16's round writes.
     **(i) Harness-injected context** (Q11; J355). `plat/docs/build/M0.md` §3 gains one sentence: harness-injected context
     (a memory index, a git status line, a file listing the harness shows a seat unasked) is disclosed in the seat's
     CLEAN-ROOM row and never used — the row's disclosure is the rule's satisfaction (never `CLEAN-ROOM.md` §1, J358).

     **What stays.** Every bound the rulings name — √2 · `attractCm` for an incoming vertex, §3.10's clearance, §3.7's
     area bound; RQ2's coincident fold-back vertex row (N-61 (2)) is not in this round's list and its §2.2 rule 3 sentence
     is left to the session; no code. **Where it touches:** base §3.6, §3.7, §3.8, §3.10, §3.11, §4.7 (S9), §4.8, §5.1
     (5), §5.2 (F-SKELETON), §13.1, §16 (M4); `plat/docs/build/M0.md` §3. Estimate: none — the build already carries or
     is building every ruling (M0-a-05, M0-a-11, M0-a-14, M0-a-16, M0-c-02, M0-f-03b hardening rounds).
