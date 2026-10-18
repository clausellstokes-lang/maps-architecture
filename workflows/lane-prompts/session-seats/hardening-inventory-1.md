# Session seat `session/hardening-inventory-1` — the M0 hardening inventory (J237 (1); the triage's second half beside the refusal census L23)

You are the M0 HARDENING PHASE's inventory seat, opened by the session under the owner's delegation (J237, the owner 2026-10-07: "make
sure you do the hardening phase for m0 before m1"; shape (1): "a triage seat inventories every M0 KI row and every checks/M0-*-notes.md
row and classes each fix-now / carry-forward-with-reason / duplicate"). Your one deliverable is `plat/docs/build/checks/hardening-inventory.md`
— every row of `docs/KNOWN-ISSUES.md` (the M0 rows, KI-1 …) and every table row of every `plat/docs/build/checks/M0-*-notes.md` (about 494
rows across 53 files; a row is a line starting `| <id> |` under a table header — ids like N-7, N-c1-2, N-s8c-4, M01, A12, X3, K5, T-2, B …),
each classed ONCE — landed with its record and your CLEAN-ROOM row. Read first and whole: `docs/PROGRESS.md` rows J237, J238, J264, J290,
J351, J352, J353, J354; `plat/docs/build/checks/M0-spec-notes.md` N-45, N-58; `docs/M0-FIX-QUEUE.md` whole (every Q and L row — the queue is
the session's routing ledger; your inventory reconciles with it, never duplicates it); `plat/M0.md` §3 (the working rules). The refusal
CENSUS is a sibling seat (lane `session/refusal-census-1`, the brief `workflows/lane-prompts/session-seats/refusal-census-1.md`, running
now): you do NOT re-judge refusal classes — a row that is a refusal class is ROUTED-TO-CENSUS with the class named.

## Working rules (M0.md §3; the clean room)

Machine: `python3 tools/machine_profile.py --id`; Node 24.12.0; `corepack pnpm install --frozen-lockfile` in `plat/` (you run no test
unless a classification needs one small confirmation — say so). You edit NOTHING but the inventory file, `plat/CLEAN-ROOM.md` (your row
as the last row of §2's seat-ledger table; the id rule) and `docs/lane-events.log` (CHECKPOINT lines at every step boundary —
`YYYY-MM-DD HH:MM session/hardening-inventory-1 CHECKPOINT …` — and one LANDED line). You run NO git command. WAITING RULE (J258): never
end your turn before the file is written, the record landed and your structured result returned. If the inventory file exists when you
start, APPEND a dated section headed by your lane key; never rewrite earlier sections.

## The classes (one per row; the reason in one line, the evidence a row id or a file:line)

* **DONE** — a landed round fixed it: name the round (the choices row C-…, the queue row marked DONE, or the LANDED line's lane key).
  Many notes rows were written before their fix rounds (S1–S8 session rounds, the consolidation rounds C1, the queue's 40+ DONE rows):
  check the queue and the later notes sections of the same file before classing anything FIX-NOW.
* **FIX-NOW** — a defect or gap M0 should close before M1: name the OWNING ITEM (the file's item, or the item whose owns hold the code
  the row names, by `plat/docs/build/M0-work.json`), the fix's shape in one line, and whether a test must pin it. A survivor mutant that
  marks an unpinned behaviour is FIX-NOW (a pin) unless its row states equivalence with evidence (then NOTE).
* **CARRY-FORWARD** — with the reason from the row or the design: needs real towns or M1+ stages (KI-4, KI-11's kind), the perf pass
  (KI-12's kind: Q18 is first, N-56 §7), the timing items (J212: last), design not yet built (a named notBuilt milestone), or a bar the
  owner set aside; name the phase it waits for.
* **DUPLICATE** — the same mechanism already appears as a queue row or another notes row: name it (the queue row wins as the home).
* **ROUTED-TO-CENSUS** — a refusal class or a lawful-input refusal (J264, N-58): the census seat's; name the class in N-58's words.
* **NOTE** — informative, equivalent-mutant or disclosure rows that ask nothing (a stated equivalence, a disclosed slip, a measurement).

## The file's structure (keep it under ~600 lines; one line per row)

§0 The tree (the commit — read as files: `.git/HEAD` and the ref; the date; the machine id), the counts (rows read per file; rows per class).
§1 The KI rows (docs/KNOWN-ISSUES.md), one line each: `KI-n | class | owner | reason / fix shape | evidence`.
§2 The notes rows per file, in the files' order, one line each: `<file> <id> | class | owner | reason / fix shape | evidence` — EVERY row,
none skipped (a skipped row is a defect of this inventory; if a file's rows are all NOTE or DONE, one line per row still).
§3 The fix-round batching (J237 (2)): the FIX-NOW rows grouped by owning item — one proposed round per item with its rows, the queue rows
it also takes (the HARDENING rows of docs/M0-FIX-QUEUE.md that are not refusal classes: Q50's follow-up, Q51, Q56/Q61 are in flight as
M0-a-14 s3, Q57, …), the order you recommend (dependencies first; Q18 the perf round first per N-56 §7; the census's MAKE-IT-SUCCEED rounds
merge into the same item's round where one exists — say where), and a one-line estimate of each round's size (small / medium / large).
§4 The CARRY-FORWARD ledger by phase (the perf pass, M1's towns, the timing items, notBuilt milestones) — so nothing is re-found as a bug.
§5 Open questions for the session, each with your recommendation.

## Landing and the result

`cd plat && corepack pnpm landed -- hardening-inventory --lane session/hardening-inventory-1 --wave flow-7 --owns plat/docs/build/checks/hardening-inventory.md`,
then `corepack pnpm landed:verify -- flow-7 --item hardening-inventory` must print ok; the LANDED line names the file, the record and your
row. Your structured result: `{ lane: "session/hardening-inventory-1", status: "done" | "blocked", files: [the inventory path],
landed_record: "hardening-inventory", summary: <rows read; counts per class; the items with proposed rounds and their sizes>, notes: [what
the session must rule on] }`. `blocked` only when a working rule stops you after three honest, different attempts; say exactly what.
