# Session seat `session/refusal-census-1` — the M0 refusal census and triage (queue row L23; J264 (4), J290 / N-58, J237 (1))

You are the M0 HARDENING PHASE's triage seat, a Fable 5.1 seat opened by the session under the owner's delegation. Your one
deliverable is the file `plat/docs/build/checks/refusal-census.md` — the census of EVERY refusal class the M0 code meets on its
registered families, each with ONE verdict — landed with its record and your CLEAN-ROOM row. The owner's rule (J264, 2026-10-11:
"wherever possible, get it down to zero refusals"; J290: every class gets a lawful alternative or the reason none exists) and its
form (N-58) are binding; read them FIRST and whole: `docs/PROGRESS.md` rows J264, J290, J237, J238; `plat/docs/build/checks/M0-spec-notes.md`
notes N-58, N-45, N-52 (6), N-57, N-59, N-60 (if present); `docs/KNOWN-ISSUES.md` rows KI-1, KI-7, KI-10, KI-12; `docs/M0-FIX-QUEUE.md`
rows Q52, Q55, Q58, Q59, Q62, Q63, L23, L25; `plat/M0.md` §3 (the working rules every seat keeps). The design: `docs/ARCHITECTURE.md`
§3.6 (the authoring boundary — what a stroke must satisfy; attraction, repairs), §3.10 (the kernel invariants and refusal codes),
§4 (the stage contracts), §5.2 (the ladders), §7.1 (dry-run validation, G-R10), §11.4 (host inputs: what reaches the kernel and
through which doors), §13.1 (B-FUZZ: lawful draws by construction). The design doc is 500 k words — read the sections named and
what they cite, not the whole.

## Working rules (M0.md §3; the clean room)

Machine: `python3 tools/machine_profile.py --id` (expected class `linux:Intel(R) Xeon(R) Processor[ @ <clock>]:4cpu:16gib`), Node
24.12.0 (`node --version`), `corepack pnpm install --frozen-lockfile` in `plat/` first. You edit NOTHING but the census file,
`plat/CLEAN-ROOM.md` (your row appended as the last row of §2's seat-ledger table, the id rule: re-read the last L- id, append in
one write) and `docs/lane-events.log` (a CHECKPOINT line at every step boundary — `YYYY-MM-DD HH:MM session/refusal-census-1
CHECKPOINT …` — and one LANDED line at the end naming the files and the record). You run NO git command. Every run you start goes
through a mirror or a read-only invocation; you change no source and no test. One test process of your own at a time, vitest at
`--maxWorkers=1`; a long run in the background only with a done-file (`( cmd > out.log 2>&1; echo $? > done ) &`) and a poll with
`sleep` ≤ 600 — the WAITING RULE (J258): never end your turn before the census is written, the record landed and your structured
result returned. If the file `plat/docs/build/checks/refusal-census.md` already exists when you start, you APPEND a dated section
headed by your lane key and never rewrite the earlier sections; otherwise you create it.

## What a census row is (N-58's form)

One row per REFUSAL CLASS — the same operation or stage refusing for the same reason — with these columns:
`id` (R-01, R-02, …) · `source` (the operation or stage, its refusal code, the site in code `file:line`) · `input kind` — LAWFUL,
UNLAWFUL, or OUR OWN INTERMEDIATE (geometry an earlier stage of ours made from lawful input) — with the design rule that decides it
(§3.6's boundary, §3.10, the stage's §4 contract, §13.1's draw) · `count` over the registered families with the seeds and the
family's size (`k of N cases, seeds …`) · `family / source of the count` · `provenance` (MEASURED by you on this tree at its
commit, or HARVESTED from a landed summary / notes row, named with the commit it measured) · `verdict` — exactly one of
**(a) MAKE-IT-SUCCEED** (every LAWFUL class and every OUR OWN INTERMEDIATE class: a fix round makes the operation commit),
**(b) REPAIR** (a deterministic, documented repair of the UNLAWFUL input before the operation, of the kind §3.6's authoring
boundary applies — resample, decimate, split into simple runs, merge collinear duplicates — named, with the determinism bar
stated: the same input gives the same repaired input, every time, and the run's report or the edit's dry-run line names it),
**(c) REFUSE** (typed and visible, only where a repair would have to guess the intent; the verdict names the LAYER that gives the
user the alternative — the dry-run preview before commit, the fate report, an empty edit — or states that no user reaches the
class through §11.4's doors; a (c) with neither is a notBuilt milestone you NUMBER) · `owner` (the item whose owns hold the
source, by `plat/docs/build/M0-work.json`) · `queue` (the existing queue / KI / notes row that already names the class, or new).
A LAWFUL class is never left at REFUSE. Where a row you reconcile with (a queue row, a KI row, a closing check's report) carries
a different classification, state both and why yours stands — the session rules on the difference.

A validator or bar DOWNGRADE (an operation that commits a degraded result and reports it — the skeleton validator's planarity
downgrade of Q63, the corpus bar's downgrades) is not a refusal; list downgrades in their own table (§2b) with the same columns
and the same verdict rules (a lawful input downgraded is MAKE-IT-SUCCEED). A LADDER rung's refusal that a later rung absorbs
(§5.2; the fusion summary's `ladder` counts such as `S8/F-CUT/antenna`) is not a refusal of the stage: count a stage's FINAL
outcomes (a refused run, an unresolved cut, an operation no rung rescues), and list the per-rung refusals as context only where
a lawful class hides in them (L25's antenna corner check refusing an exactly-collinear cut is such a class).

## The sources to cover (J264 (4)) — measure what fits, harvest the rest, state which

1. **The kernel's B-FUZZ families at their registered strength** (`PLAT_FUZZ_RUNS` unset = 10⁴ cases per property; §13.1):
   `packages/kernel/test/{num,geom,faces,warp}/bfuzz.test.ts`, `test/insert/step1-2/bfuzz.test.ts`, `test/insert/step3-5/bfuzz.test.ts`
   (its counted refusals and caps: `step3-5/caps.ts`'s table, the tally a run writes to `PLAT_FUZZ_COUNTS`), `test/arr/bands/bfuzz.test.ts`
   (kerb / corridorUnion / bandUnion refusals per class, the register lines of N-44 (4)). RUN each family yourself at W=1 in a
   mirror (`cd plat && corepack pnpm vitest run --project kernel --maxWorkers=1 <file>` or the project's documented form — read
   `plat/package.json` and the file headers), with the tally environment the family documents, and read every refusal it counts:
   its code, its class, its seed and case. A family at full strength that would exceed ~90 minutes runs at `PLAT_FUZZ_RUNS=1000`
   instead, SAID SO in the row's size column — never silently.
2. **The step3-5 refusal register** (`test/insert/step3-5/register/*.json`, `register.test.ts`'s table; N-44 (4)): every refused chain,
   its code and the cause the register records (N-43 B's fidelity bound: "no route keeps clearance and the bound").
3. **The edge suite** (M0-x-06; `plat/docs/build/summaries/M0-x-06.json`: 72 fixtures × 1 000 seeds — `refused-safe` per cell,
   `lawfulRefusals` per fixture; `plat/docs/build/checks/M0-x-06-notes.md` "Fix round 2"'s census table, classes A–F = Q52).
   HARVEST (its run is 6.5 h); do not re-run it. Every refused-safe cell is an UNLAWFUL class by the fixture's construction
   (§13.1's per-class degenerate fixtures — zero-length, zero-area, collinear, self-touching, coincident …): give each its (b)/(c)
   verdict with the repair or the layer; the 35 lawful ones are (a).
4. **The fusion harness** (M0-c-06; `plat/docs/build/summaries/M0-c-06.json`: `runs[].bugs`, `faces.s8Refused`, `ladder`, the corpus
   clause; the 50-seed CITY smoke, both runs). HARVEST. NOTE: M0-c-06's third continuation (a child's round, launched about when
   you start) re-runs that smoke and may land during your seat; use the summary your tree holds, state its date, and mark the
   fusion rows PROVISIONAL (the phase-end re-run reads the landed one). The a-09 s6 census (choices rows of lane
   `build/M0-a-09-fix-s6`, landed about when you start — read `plat/docs/build/choices.md` for the lane) gives the kerb /
   corridorUnion / bandUnion refusal counts on B-FUZZ's bands draws and the register before and after J318's kerb.
5. **The site harness** (M0-e-06; `summaries/M0-e-06.json` `groups[].stages[].refused` per fixture and config at CITY, 8 seeds —
   e.g. relief-60 S5 `E_INVARIANT` 1), **k-04** (`summaries/M0-k-04.json` primitives' `refused`), **b-04** (`fcut` refused /
   `setupRefused`), **d-09** (crosshost `refused`), **x-05** (`bugs`). HARVEST; re-run only a small, cheap case to confirm a class
   you must see (one seed, one fixture) and say so.
6. **Every closing check's refusal report since J264 (5)** — each closing check since 2026-10-11 reports its item's registered
   families' refusal count before and after its round and classes what it met: `grep -ln 'refusal' plat/docs/build/checks/M0-*.md`
   (about 70 files); read the matching sections, harvest every class named, reconcile with your rows (one class, one row).
7. **The known classes** that MUST appear with your verdict: Q52 (A–F, the edge fixtures' prepared / control states; M0-c-03,
   M0-c-02, M0-c-01), Q55 (S5c growth's inner refusals W_END_UNMARKED and the F-NUM reject on plain seeds 9, 17, 20, 23; M0-c-05),
   Q58 / Q59 (a-09 s6's traded draws #8897 and #7644), Q62 (tx's wide fuzz families: the 'remove lane' E_INVARIANT index-freshness
   class, 9 batches, and the unclassed 648 @13 'insert way' refusal; M0-a-06), Q63 (the skeleton validator's planarity downgrades,
   corpus footprints 1144 and 1840; M0-a-11; a downgrade), L25 (the antenna corner check's exactly-collinear refusal, fusion 30:
   59 against 14 cuts; M0-b-03), KI-1 (insertChain's residual E_INVARIANT and optional E_BELOW_MIN_EDGE 'N-43' under caps.ts's caps;
   M0-a-05 / M0-a-08), KI-7 (insetRing's bisection reading an overlay refusal as empty; M0-a-08), KI-10 (S5 refusing on the 900 ha
   river × walled frame: E_SELF_INTERSECT seeds 1 and 6, E_DEGENERATE seed 2, E_INVARIANT seed 5; M0-c-04 / M0-c-05), and the
   consolidation rounds' UNLAWFUL classes (regularFit `fit` 300 / 300 and lir `empty` 63 / 300 on self-crossing star rings, M0-a-10;
   E_OUT_OF_RANGE on an off-lattice coordinate, M0-a-12; the skeleton contract's refusals of self-crossing, touching and sharp
   rings, M0-a-11).

## The file's structure (keep it under ~400 lines; the tallies and logs stay in your scratch, summarised here)

§0 The tree: the commit (`git` is not yours — read `plat/docs/build/snapshots/` and the lane log's last LANDED lines, or the
HEAD line of `.git/HEAD` + `.git/refs` read as files), the date, the machine id, Node. §1 The sources: for each of 1–7 how it was
measured or harvested — the command, the size, the duration, the commit the harvested figure measured. §2 The class table (the
columns above), ordered by owner then source; §2b the downgrades table. §3 The verdicts' reasoning, one short paragraph per
class (the design rule that makes the input lawful or not; for (b) the repair and its determinism bar; for (c) the layer or the
door argument, or the notBuilt number). §4 The fix-round batching (J237 (2)): the MAKE-IT-SUCCEED and REPAIR classes grouped by
owning item, one proposed round per item with the classes it takes, in the order you recommend the session launch them, and
whether any waits on Q18 (the S8 kerb-read speed-up, N-56 §7's first hardening item — a perf round, not a class). §5 The
phase-end re-run: the exact commands and harvests to repeat so the 'after' census is comparable. §6 Open questions for the
session (what you could not decide from the design, with your recommendation each).

## Landing and the result

`cd plat && corepack pnpm landed -- refusal-census --lane session/refusal-census-1 --wave flow-7 --owns plat/docs/build/checks/refusal-census.md`
(a seat without an item declares its file; your CLEAN-ROOM row is the permitted append), then `corepack pnpm landed:verify -- flow-7
--item refusal-census` must print ok; the LANDED line in the lane log names the file, the record and the row. Your structured
result: `{ lane: "session/refusal-census-1", status: "done" | "blocked", files: [the census path], landed_record: "refusal-census",
summary: <the counts: classes by verdict (a)/(b)/(c), downgrades, lawful refusals in total, the items with proposed rounds>,
notes: [anything the session must rule on] }`. `blocked` only when a working rule stops you after three honest, different attempts;
say exactly what.
