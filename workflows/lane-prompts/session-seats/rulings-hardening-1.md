# Session seat `session/rulings-hardening-1` — the hardening phase's design rulings (J355, J356; a Fable 5.1 ruling seat)

You are a RULING SEAT opened by the session under the owner's delegation (J238: M0 is the bedrock, "get M0 right"; J237: the
M0 hardening phase before M1). The hardening inventory (`plat/docs/build/checks/hardening-inventory.md`, §5) and the refusal
census (`plat/docs/build/checks/refusal-census.md`, §6) each left questions only a reading of the DESIGN can settle. You settle
them: for each question below, ONE ruling, the design text it rests on (quoted, with the section), the consequence for the code
(the owning item, the fix's shape, the pin), the design-doc amendment text where the design must say more (for the session's
amendments round), and the output shift it makes (declared, never silent). Your one deliverable is
`plat/docs/build/checks/rulings-hardening-1.md`, landed with its record and your CLEAN-ROOM row; the session transcribes your
rulings into `plat/docs/build/checks/M0-spec-notes.md` as note N-61 at the landing (write each ruling so it can be pasted: the
observation and the handling, in the voice of that file's rows — read N-52, N-57, N-58, N-59 first for the form).

## Working rules (M0.md §3 — `plat/docs/build/M0.md`; the clean room)

Machine `python3 tools/machine_profile.py --id`; Node 24.12.0; `corepack pnpm install --frozen-lockfile` in `plat/`. You edit
NOTHING but the rulings file, `plat/CLEAN-ROOM.md` (your row as the last row of §2's seat-ledger table; the id rule) and
`docs/lane-events.log` (CHECKPOINT lines at every step boundary — `YYYY-MM-DD HH:MM session/rulings-hardening-1 CHECKPOINT …`
— and one LANDED line). You run NO git command. A probe that confirms a claim runs in an isolated copy of `plat/` under your
scratch (`cp -a`, install there), never in the tree, and is quoted with its seed and output. WAITING RULE (J258): never end
your turn before the file is written, the record landed and your structured result returned. Read first and whole:
`docs/PROGRESS.md` J238, J264, J290, J318, J335, J348, J355, J356; `M0-spec-notes.md` N-45, N-52, N-55, N-57, N-58, N-59
(and N-60 if present); the design sections each question names (`docs/ARCHITECTURE.md`; it is 500 k words — read the
sections named and what they cite).

## The questions (one ruling each; the recommendation given is the asking seat's, not the session's)

**RQ1 — a chain that retraces an edge (M0-a-05 N-8; C-0205 (3)).** A route A→P→Q→P→R→B retraces P→Q. §3.10 holds for the
committed result; whether a CHAIN may commit a there-and-back is unruled. Options: unlawful for chains (the router refuses
it, typed) · the router simplifies the retrace deterministically (a repair at §3.6 step 1's authoring boundary: the same chain
gives the same simplified chain) · lawful as drawn. Read §3.6 (step 1's pre-clean, Chain classes), §3.4, §7.1 (the stroke's
dry run), §13.1. The asking seat recommends unlawful-with-simplification. Source: `checks/M0-a-05-notes.md` N-8.

**RQ2 — the coincident fold-back vertex reading (M0-a-05 N-23; C-0302 (3)).** Two readings of a fold-back at a coincident
vertex coexist in the code's history. Rule the one the design supports and that RQ3's answer needs; the pin goes in a-05's
hardening round. Source: `checks/M0-a-05-notes.md` N-23; `choices.md` C-0302.

**RQ3 — is a coincident doubled trace LAWFUL input? (refusal census R-42; x-06 c2-4; inventory Q6.)** The edge suite's
EP-01/S5a coincident cell plants the wall trace twice; the kernel attracts the second copy off the first and refuses role
consistency `(wall, enceinte:2) branches` at commit (5 of 1 000 seeds). The census seat reads §3.11 ("coincident points are
one vertex; a collinear overlap is one shared stretch") and §13.1's constructive 'coincident typed chains' as making it
LAWFUL — the kernel should absorb the second copy as the same stretch — and proposes MAKE-IT-SUCCEED in M0-a-05's round
(census count 35 → 40); x-06's checker (c2-4, C-0342) classes it UNLAWFUL by the kernel's own answer (circular, the census
notes). Rule it; if lawful, state the kernel's required behaviour (the absorbed copy's role rows; what `insertChain` returns
for the second copy) and the test that pins it. Sources: `refusal-census.md` R-42 and §6 Q1; `checks/M0-x-06-notes.md` c2-4;
`choices.md` C-0342.

**RQ4 — the "no open frame of this kernel" guard (M0-a-16 note 11; N-55 (5)(1) vs C-0290).** The ruled guard (N-55 (5)(1))
was never built; C-0290's closed-overlay guard exists instead. Building N-55's touches M0-k-04's primitives `writer()` and
M0-d-08's `issue.ts`. Options: build it in a-16's hardening round with the two small riders (N-45 (a): fail loudly) · strike
the clause from N-55 (5) by a choices row (C-0290's guard suffices — show why). Sources: `checks/M0-a-16-notes.md` note 11;
N-55; C-0290.

**RQ5 — strip faces over an arterial's corridor (M0-c-02 N-26; 42 of 1 000 seeds).** A strip face lies over an arterial's
corridor; whether the defect is the strip's (membership by area, or a setback cut along the whole way) or the route's is
unruled. Read §3.7 (corridors as reservations; N-45 (a); J318's corridor statement 'a block never overlaps a corridor it does
not bound'), §4.4 (S5 strips). Rule the owner of the fix and its shape. Source: `checks/M0-c-02-notes.md` N-26.

**RQ6 — the `skeleton.events` work-limit law vs the measured coefficient (M0-f-03a N-6; M0-f-03b).** The any-version law
(perUnit ≥ 8, floor ≥ 64) would refuse f-03b's measured 1.73 per vertex. Options: (a) max(measured, law) in f-03b's brief ·
(b) a version-gated law · (c) the law amended to the measured class. Read §12.4 / §3.11 (the work limits; F-WORK), the f-03a
notes. Rule before f-03b lands (its round is not yet launched). Sources: `checks/M0-f-03a-notes.md` N-6, N-4, N-5;
`tables/data/workLimits.json`'s current hand-over.

**RQ7 — the skeleton's 5° contract on lawful faces (census D-01; a-11 c1's R-c1-1 / N-c1c-2; N-52 (3)).** `skeleton/prepare.ts`
refuses `sharpCorner` < 5° and the readers downgrade (`W_DOWNGRADE`, roof = spine) — on district and water faces that are
lawful arrangement geometry (a sub-5° corner is lawful; `W_ACUTE_CORNER` is soft; exact zero-width spurs were repaired by
N-52 (3)). The census verdict is (a) MAKE-IT-SUCCEED and the session accepted it in principle (J356); the asking seat
recommends a deterministic pre-clean of INEXACT spurs within attractCm (N-52 (3)'s pass widened) with the §3.8 sentence
amended and the reader's downgrade kept as the net. Rule the CRITERION exactly: which spurs are cleaned (the width bound, the
angle), that the pass is deterministic and order-free, what the skeleton returns for a face the clean cannot make simple, and
the amendment text for §3.8's *Numeric contract*; name the declared shift (the corpus footprints whose skeleton moves;
`golden.test.ts` re-recorded by a-11's round). Sources: `refusal-census.md` D-01, §3 and §6 Q3; `checks/M0-a-11-notes.md`
R-c1-1, N-c1c-2; `plat/packages/kernel/src/skeleton/prepare.ts`.

Not yours (already ruled or gated): the census's R-30 (notBuilt #1 'M1' — the session kept it, J356), R-15 and D-03 as (c)
(confirmed, J356), the inventory's Q8 (a seed per kerb component: the record format is OWNER-GATED, parked beside Q60 /
N-60 (b)) — do not re-open them; cite them where a ruling touches them.

## The file's structure (≤ ~250 lines)

§0 The tree (the commit read as files, the date, the machine), the sources read. §1–§7 one section per RQ: the ruling in one
sentence first; the design text (quoted, cited); the reasoning (short); the code consequence (item, fix shape, pin); the
design-doc amendment text if any (verbatim, ready for the amendments round); the declared shift; the N-61 row text (one
line, the file's form). §8 Open points you could not settle from the design (with your recommendation each) — expected few.

## Landing and the result

`cd plat && corepack pnpm landed -- rulings-hardening-1 --lane session/rulings-hardening-1 --wave flow-7 --owns plat/docs/build/checks/rulings-hardening-1.md`,
then `corepack pnpm landed:verify -- flow-7 --item rulings-hardening-1` must print ok; the LANDED line names the file, the record
and your row. Your structured result: `{ lane: "session/rulings-hardening-1", status: "done" | "blocked", files: [the path],
landed_record: "rulings-hardening-1", summary: <the seven rulings in one line each>, notes: [what the session must still rule
or ask the owner] }`.
