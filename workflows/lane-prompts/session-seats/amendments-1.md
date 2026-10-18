# Session seat `session/amendments-1` — the M0 hardening amendments to the design (item 130; J355 Q3, J358)

You are a DOCUMENTATION seat opened by the session under the owner's delegation (J237: the M0 hardening phase; J355 (Q3): "one
spec-lane amendments round … needs no code"). The design doc has fallen behind the rulings the M0 build made: session rulings
recorded in `plat/docs/build/checks/M0-spec-notes.md` (N-notes) and `docs/PROGRESS.md` (J-rows) amended the design in words, but
the design's own text — `docs/ARCHITECTURE.md` (the base) and `docs/volumes/V01 … V12-*.md` — still says the old thing in the
places named below. You write those amendments INTO the design text, in the design's voice, each one minimal and exact, and you
record them as amendments file **i**, item **130** (`docs/AMENDMENTS-2026-10-14i.md`, the form of `docs/AMENDMENTS-2026-10-13h.md`:
read it first — numbered items, the authority named, the consequences as the program's vetoable interpretation; here the authority
is the session's rulings under the owner's delegation, each vetoable by the owner, cited by note and J-row). You change NOTHING
else in the design, and no code.

## Working rules

The clean room for a docs seat: you edit only `docs/ARCHITECTURE.md`, `docs/volumes/V*.md`, `docs/AMENDMENTS-2026-10-14i.md` (new),
`README.md` (its amendments row gains file i), `docs/BACKLOG.md` (one row), your report `plat/docs/build/checks/amendments-1.md`,
`plat/CLEAN-ROOM.md` (your row, the last row of §2's table, the id rule) and `docs/lane-events.log` (CHECKPOINT lines at step
boundaries, one LANDED line); `docs/ARCHITECTURE-FULL.md` is DERIVED — regenerate it with `python3 tools/bundle_architecture.py`
after your edits and never edit it by hand. You run NO git command. Machine `python3 tools/machine_profile.py --id`, Node 24.12.0;
`corepack pnpm install --frozen-lockfile` in `plat/` (for `landed`). WAITING RULE (J258): never end before the files are written, the
report landed and your structured result returned. The design doc is ~500 k words across the base and twelve volumes: find each
section by its heading (`grep -n '^### 3.6' docs/ARCHITECTURE.md` and so on; a volume's sections are headed the same way), read the
whole section before editing it, and quote the sentence you replace in the report.

## The amendments (each: the design text to change, the new text or its source, the authority)

Read first: `plat/docs/build/checks/M0-spec-notes.md` rows N-38, N-40, N-41, N-43, N-44, N-45, N-46, N-52, N-55, N-57, N-58, N-59,
N-61 (and N-60 if present); `plat/docs/build/checks/rulings-hardening-1.md` §1–§7 (each has an "amendment text" paragraph —
take it VERBATIM where it is given as text, and shape it into the design's voice where it is given as a direction);
`docs/PROGRESS.md` rows J264, J290, J318, J348, J349, J355–J358; `docs/KNOWN-ISSUES.md` KI-2; `plat/docs/build/choices.md`
C-0177 (14), C-0290. Then:

1. **KI-2 (the backlog of ruled text; J191–J211).** §3.6 *Insertion, contact and move semantics* and §3.7: the Chain classes and
   readings of N-38, N-40, N-43, N-44 and N-46 (mandatory / optional / constructive chains; the fidelity bound N-43 B; N-44's
   refusal register and caps; N-46's amendments to N-43–N-45) as the design's text where §3.6 still describes the pre-ruling
   behaviour; §13.1 (B-FUZZ: the evidence-set caps and the register, N-44 (3)–(4), N-46 (3)–(4)); C-0177 (14)'s reading where
   §3.6 / §3.10 state the parent-finding rule; §16's M4 row gains N-45's hardening shape (N-45 (a): fail loudly; the M0 hardening
   phase J237 before M1).
2. **The corridor statement (J318 (1), J348 (1); N-60 when the session writes it — until then J348 (1)'s words).** §3.7's "bounding
   spines": every spine INCIDENT to F — on a route edge of its boundary or through a route vertex of it — whose buffer meets F; kerb(F)
   subtracts every incident spine whose buffer reaches into the edge spines' kerb; "a block never overlaps a corridor it does not
   bound". With it RQ5's gate sentence (rulings §5): "a strip ends at the corridor of the way through each gate" and §4.8's stop
   sentence — a wall-strip face never overlaps a corridor; every way corridor meeting the strip region is a stop along its whole
   length, membership by area.
3. **§3.10's level-consistency row (Q61; N-s6-2's wording, checks/M0-a-06-notes.md; J349 (3); built by M0-a-14 s3):** "a vertex finer
   than level r with edges of level ≤ r has exactly two, of one level, with identical rows of level r (of level ≤ 1 at r = 1), for
   every r between" — the every-level reading replaces the single-level one.
4. **RQ1 (rulings §1; N-61 (1)):** §3.6 — a chain's committed rows never retrace an edge; the router cuts a route back to a vertex it
   would re-enter (deterministic); state that N-41 (3)'s "a row that traverses an edge out and back is lawful" is superseded for
   chains and kept for the winding walk's reading (rulings §8 (6)).
5. **RQ3 (rulings §3; N-61 (3)):** §3.11 / §3.6 / §13.1 — a chain given again under a key already carrying a run IS that run: the
   kernel lands within √2 · attractCm and walks the run, `insertChain` returns ok with nothing new; the doubled trace is lawful input.
6. **RQ7 (rulings §7; N-61 (7)):** §3.8 *Numeric contract* — (A) the pre-clean of fold-back tips (the criterion verbatim: a tip whose
   shorter arm's end lies within attractCm of the longer arm's segment; every tip of a round removed at once, to a fixpoint;
   order-free; roof included); (B) the contract angle 1° for spine and regions, roof keeps 5°, the validator the net — write (B) as
   the design WITH the sentence "ruled by the session 2026-10-14 (N-61 (7)), vetoable by the owner; the earlier 5° for every use
   stands as history" so the owner sees the widened constant.
7. **RQ6 (rulings §6; N-61 (6)):** §3.8's `skeleton.events` law 4 · (n + r) + 64 is the FLOOR at every version, the measured
   coefficient written as max(measured p999 × 1.5, law) — one sentence where §5.1 (5) / §3.11 state the coefficients.
8. **RQ4 (rulings §4; N-61 (4)):** where the design (or N-55 (5) (1) as quoted in the design) names the "no open frame of this
   kernel" guard, the clause is struck and C-0290's closed-overlay guard is the design (isOpenTx: open set ∧ not closed).
9. **Q11 (J355):** ONE sentence in `plat/docs/build/M0.md` §3 (the working rules every seat keeps): harness-injected context (a
   memory index, a git status line, a file listing the harness shows a seat unasked) is disclosed in the seat's CLEAN-ROOM row and
   never used — the row's disclosure is the rule's satisfaction. `plat/docs/build/M0.md` is owned by no item: declare it in your
   record (below); if `landed` refuses it, leave the sentence out, say so, and the session takes it.

Where a ruling's text and the design's surrounding text conflict in a second place you did not expect, amend the second place
too and list it; where you cannot find the sentence a ruling names, say so in the report rather than inventing a place. Keep
each edit minimal: the design's prose, its cross-references, no editorialising, no history inside the design (history lives in the
AMENDMENTS file and the N-notes).

## The report and the landing

`plat/docs/build/checks/amendments-1.md`: §0 the tree and the sources; §1 one entry per amendment (the file and heading, the
sentence replaced — quoted —, the sentence written, the authority); §2 what you could not place; §3 the bundle regenerated (its
line count before and after). Land it: `cd plat && corepack pnpm landed -- amendments-1 --lane session/amendments-1 --wave flow-7
--owns plat/docs/build/checks/amendments-1.md --owns plat/docs/build/M0.md` (drop the second --owns if refused), then
`corepack pnpm landed:verify -- flow-7 --item amendments-1` prints ok; your CLEAN-ROOM row; the LANDED line names the report, the
record, the AMENDMENTS file and the design files touched. Your structured result: `{ lane: "session/amendments-1", status: "done" |
"blocked", files: [every file you changed, docs/ included], landed_record: "amendments-1", summary: <the amendments made, one line
each; what could not be placed>, notes: [what the session must rule] }`.
