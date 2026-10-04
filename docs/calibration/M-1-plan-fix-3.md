# M-1 plan fix 3 — the FTG verifiers' prefix rule, the recorded-slot guard, the checklist's section I, R-48 and the text left behind

Lane `m1/plan-fix-3`, 2026-10-03 (20:08 EDT → the LANDED line in `docs/lane-events.log`), a research-side seat (§17.1) on
the owner's Mac, run before programme 2 records anything and before `m1/W-01b` touches `plan.py`. A research-side record
(`plat/CLEAN-ROOM.md` rule 2: implementer seats do not read it): numbers, metric ids, file paths and our own words only.
Nothing was written into `plat/` or the design, no website was touched, no benchmark ran and no git command changed state.
M0's build and check seats, `m1/W-11b` and `design/m1-corrections-1` ran on the machine at the same time.

**Outcome.** All five units landed, and each has its own receipt. The first two units were red first.
(U1) `ftg_capture_post.py` no longer passes a resource change. Seven planted resource changes exit 0 under the old
script and exit 1 under the new one, and all six programme-1 captures still pass 10 of 10. (U2) `plan.py` refuses any
change to a recorded slot's label, size or water, and refuses the slot's removal. The closing check's relabel wrote with
exit 0 before the fix and is refused after it. The live `--check` reads SAME. (U3) The checklist has its section I: the
programme-2 procedure, with the retry rule corrected. (U4) `water.step` keeps §13.5's fixed bound (R-48, an amendment to
R-34). (U5) The text left behind is reworded, item by item. **One hazard found at the end is not this lane's.** The
design seat's catalogue edit now makes `plan.py` refuse every write, binds included, until W-01b registers three ids. The
session should land W-01b before slot 6 binds (section "A hazard found at the end"). Inputs: `results/W-02-signed-in-verify.json` and
`-verifyb.json` (the prefix rule); `M-1-plan-notes.md` §6 points 2, 4, 5 and 6; `results/plan-check-close-2.json`.

## U1 — the water-implied resource class is pinned (`research/baselines/ftg_capture_post.py`)

**The fault (CONFIRMED, executed).** The script classed every request leaf under the raw-resource list as water-implied,
by its path prefix. So the request-diff check (against the 2026-09-21 base) and the slot-0 check passed any resource
change. Both verifiers showed this with a planted change.

**The fix.** The class is pinned as R-24 pinned the size class. The water options add or drop exactly one entry, the
fishing one, at the head of the list. That shifts the other five entries by one place, so the leaf diff shows six
positional leaves (E02 §4 and §11.3). The script now names those six leaves (`WATER_IMPLIED`) and admits them only when
the request's **whole list** equals the list its water setting implies: for `coast+river`, the base's list (the base is
coastal with rivers on); for `none`, that list without the fishing entry (`water_resources()`). A wrong list fails the
request-diff check even where no leaf differs from the base. The slot-0 check passes only when both its own list and slot
0's list are their water settings' lists. Each receipt names the result ("resource list equals the coast+river list").

**Red first (CONFIRMED, executed 20:12–20:16).** A scratch mirror held an old and a new copy of the script, a copy of
`plan.json`, links to slots 0, 2, 3 and 4, and scratch folders for slots 1 and 5. Those two folders held a reduced
`index.jsonl` (the four calls the checks read, with the PUT body edited per case) and links to their bodies. Each case
ran `--check-only` under both copies:

| slot (water) | case | old script | new script |
|---|---|---|---|
| 5 (`coast+river`) | control, unchanged | exit 0 | exit 0 |
| 5 | one non-fishing entry replaced by an absent value (the verifiers' test) | exit 0 | exit 1 (`requestDiff`, `vsSlot0`) |
| 5 | two entries swapped | exit 0 | exit 1 (both) |
| 5 | one non-fishing entry dropped | exit 0 | exit 1 (both) |
| 5 | the fishing entry dropped, water keys coastal | exit 0 | exit 1 (both) |
| 1 (`none`) | control, unchanged | exit 0 | exit 0 |
| 1 | one entry replaced | exit 0 | exit 1 (both) |
| 1 | two entries swapped | exit 0 | exit 1 (both) |
| 1 | the fishing entry added, water keys none | exit 0 | exit 1 (both) |

**Installed (CONFIRMED, 20:16).** Before the swap, the live file's hash was checked unchanged (`3911fc3b…`). The new file went in
by an atomic rename (`4d396e67…`), byte-equal to the tested copy (`cmp`). **`--check-only` on the six bound captures,
slots 0 to 5, gives exit 0 and 10 of 10 each**, with every receipt reading "resource list equals the" `none` or
`coast+river` list, as the slot's water. **The writing run** of the new script was run on a fresh scratch folder. That
folder held slot 5's reduced index and a link to its bodies, and no linked output name, so nothing could be written
through a link. It exits 0 with 10 PASS. Its `create-request.json` is byte-equal to slot 5's, and its `request-diff.txt`
and `structure.md` differ from slot 5's in their first line only, the folder path. The READMEs those slots' writing runs
produced are not regenerated. They are the
seats' history, and their verdicts are unchanged.

## U2 — a recorded slot is frozen (`research/baselines/plan.py`)

**The fault (CONFIRMED, executed).** R-36 guards only the first six labels. On a scratch mirror with the old script,
slot 6 was bound and the first `FTG_PREMIUM_SCHEDULE` row was changed from METROPOLIS `none` to BIG_TOWN `none`. The script
regenerated with exit 0, and slot 6 became `capture/FTG/BIG_TOWN/none/1` while it still held its METROPOLIS folder: the
closing check's finding, reproduced. **A further fault, found here:** striking every programme-2 row while slot 6 was
bound also wrote with exit 0. When the schedule was restored, slot 6 came back **open**, so its binding had been lost
silently.

**The fix.** `compute()` now compares every slot the prior `plan.json` records (bound to a capture, or recorded failed,
in either programme) with the new plan. It refuses with exit 2, and writes nothing, if that slot's label, size or water
changed, or if the slot is gone. Striking or reordering rows after the last recorded slot stays allowed: that is the
owner's veto of R-33, and the TOWN pair goes first. The guard runs on every path through `compute()`: the plain
regeneration, `--check`, `--bind-ftg` and `--fail-ftg`. The docstring and the comment at `FTG_FIRST_LABELS` say so. The
output is byte-identical to the old script's for an unchanged schedule.

**Receipts on a scratch mirror (CONFIRMED, executed 20:17; the same twelve steps under both scripts).** The mirror
held copies of `plan.py`, `plan.json`, `metrics.m-1.json` and V12, and two empty capture folders.

| step | old `plan.py` | new `plan.py` |
|---|---|---|
| T1 `--check` on the copies | SAME | SAME (`524830f5…` / `7a21bb29…`) |
| T2 bind slot 6, then `--check` | writes `f44946aa…`; SAME | writes `f44946aa…` (byte-equal); SAME |
| T3 slot 6's row METROPOLIS `none` → BIG_TOWN `none` | exit 0, slot 6 relabelled | **exit 2**, "recorded FTG slot 6 … changed: label … ftgSize METROPOLIS -> BIG_TOWN", nothing written |
| T3b bind slot 7 with that edit in place | exit 0 | **exit 2**, the same refusal |
| T4 strike row 0 (slot 6 would become METROPOLIS `coast+river`/0) | exit 0 | **exit 2** (label, water) |
| T5 strike every programme-2 row | exit 0, slot 6's binding lost | **exit 2**, "recorded FTG slot 6 … is no longer in the schedule" |
| T6 strike the TOWN pair (unrecorded tail) | exit 0 | exit 0, 26 slots, slot 6 still bound |
| T7 restore the pair and swap the CITY rows 24 / 25 | exit 0 | exit 0 |
| T8 the declared schedule, then `--check` | — | exit 0, `f44946aa…` again; SAME |
| T9 `--fail-ftg 7=create-failed` | refused: slot 6 open (its binding lost at T5) | exit 0 |
| T10 slot 7's (failed) row `coast+river` → `none` | exit 0 | **exit 2** (label, water) |
| T11 slot 6's size and water changed together | exit 0 | **exit 2** (label, size, water) |
| T12 the declared schedule, `--check` | DIFFERS | SAME |

**Installed (CONFIRMED, 20:18).** The lane log showed no bind since slot 5's at 19:20, and neither `m1/W-01b` nor any
programme-2 seat had started. Both live files' hashes were checked unchanged before the swap (`plan.py` `4015955f…`,
`plan.json` `524830f5…`). The new script went in by an atomic rename (`a128b9d1…`), byte-equal to the tested copy. The
live `plan.py --check` gives **SAME for `plan.json` (`524830f5…`) and `metrics.m-1.json` (`7a21bb29…`)**, exit 0.
CONFIRMED again at 20:23, after the plan and work-file edits.

## U3 — the checklist's section I (`research/baselines/ftg_capture_checklist.md`)

Section I, "Programme 2: the premium slots 6–27", was written from plan §2.1b (1)–(10) in the checklist's own voice. Site
controls are named by their labels, as the checklist already names them (R-27). The section holds:

- the slot table, 6–27, from `plan.json`: request key, form option by value, coast select, rivers box and label;
- the pre-slot check of `plan.json` and the capture folders (never a second settlement for a slot);
- the landing and list steps, including the row count expected before slot K;
- the never-click list;
- the size step: the METROPOLIS option only for slots 6–9, chosen by its request value, never by a guessed text;
- the create step with **the retry rule corrected** (note 4): a retry only when the PUT did not return 200 **and** the
  list shows no new row. A PUT 200 with no new row is ambiguous: it stops the run and is reported, and is never retried.
  So is any other combination;
- the `--fail-ftg` paths: three attempts without a settlement, and a created settlement that fails a post check. A site
  refusal leaves the slot open;
- the post command with `--signed-in --premium` and the half widths;
- **R-41 as a six-step list** for slots 6, 24 and 26;
- the window rule and privacy.

Plan §2.1b (10) had given this section to the first programme-2 seat. It moved to this lane so that every programme-2 seat
reads the same procedure. The plan's §12c records the move, and `M-1-rulings-2.md` §8 notes R-41's superseded last
sentence. The file's hash moved from `2bc14e19…` (equal to `HEAD`) to `f88ceaa3…`. Sections A–H are unchanged.

## U4 — R-48: `water.step`'s bucket

§13.5's water row has, in its band column, "outline step ≤ 25 m; width band by class" (read 2026-10-03). The outline
step is a fixed bound. R-34 had put it under the band rule, and a band formed from FTG's ≈ 50 m step would fail our ≤ 25 m
step (note 5). **R-48**, in a short addendum section (`M-1-rulings-2.md` §8, decided under J122, vetoable, with its
reason), rules as follows. W-15 treats `water.step` like the fixed-band rows: the reference value is sharpened and the
band column kept. `water.riverWidth` is banded by the band rule per class, over the six `coast+river` slots per matched
size (`minmax`). R-34's other buckets stand as the closing check read them. Applied in plan §1 D26 and §2 W-15, and in
`M-1-work.json` D26 and W-15.

## U5 — the text left behind, by name

| item | where | now |
|---|---|---|
| §2.2's last sentence | plan | history: `m1/W-03-complete` ran the re-export and the retry; W-03b is the extension only (R-39) |
| §9's "freezes on the retry" row | plan | history; the extension is W-03b's one load, and a further index needs a new approval |
| W-16b's depends and inputs | plan; work file | depends gains W-02b; inputs "the corpus after programme 2's close" |
| D13 | work file (and the plan's own D13 class, which still read "LANDED slots 0–3") | both FTG programmes; slots 0–5 landed, 6–27 new; section H and section I; the listed population; work W-02 and W-02b |
| `sampleRule.FTG` | work file | the plan's §1 sample text: 28 slots, `type7` at n = 10, METROPOLIS 4, CITY three usable, TOWN research-side |
| `wave2[0]` | work file | "W-02 complete (slots 0-5 bound at 19:20), then W-02b slots 6-27 … by the checklist's section I" |
| the risks entry "thin FTG samples" | work file | answered by programme 2 (R-33, R-34); a short programme leaves the smaller n, never faked |
| W-03b's checker | plan; work file | `plan.py --vectors capture/MFCG/130/plain/10` prints the seed (H32 1179968782, parkMiller 1179968783; CONFIRMED by running it in this lane); `--check` prints SAME or DIFFERS only |
| literal site-control labels | plan §2.1b (1); `M-1-rulings-2.md` §2 and §7 | our terms; the checklist keeps the labels (R-27); `results/rulings-2.json` stays as that seat's history |
| `metrics.m-1.json` `variety.dispersion` text | — | **left to `m1/W-01b`**, which regenerates that file: its `m1` entries (from `plan.py`'s `M1` table and `M1_ROLE_NOTES`) name W-09 / W-05 and "minmax at n = 3", and its `open` names W-09 / W-05; R-40 moved both dispersions to W-15 |

**Found in passing and fixed here (same subject):**

- **The W-02b row's failure path.** The row said `--fail-ftg` for a slot "the site or the server refuses after the retry
  rule", which disagreed with §2.1b (6) and §9 (a site refusal stops the run and leaves the slot open). Plan and work
  file now read: a failed post check, or three create attempts without a settlement.
- **The retry text in §9 and the work file's risks entry**, with the same correction as §2.1b (6).
- **Programme-2 status and procedure.** The plan's §4 (1) and the work file's `ftgProgramme2.procedure` name section I.
- **The recorded-slot guard.** It is named in §5 (1), the work file's `ownerGated` and `seedFamilies.FTG.orderRule`.

**Left for `m1/W-01b`, which regenerates `plan.json`:** two texts inside `plan.json` predate this round. `ftg.slotRule`
names only R-36's checks, and `ftg.programmes[1].procedure` names section H with §2.1b. They were left as they are, so that
`--check` stays SAME (a regeneration is W-01b's). That lane may add the recorded-slot guard and section I there.

## A hazard found at the end, not caused by this lane: `plan.py` refuses every write until W-01b lands

The live `plan.py --check` read SAME at 20:18 and 20:23, and `plan.json` and `metrics.m-1.json` are still byte-unchanged
(`524830f5…`, `7a21bb29…`). At 21:03 the same command gave **exit 2, "PLAN CHECK FAILED, nothing written: catalogue
mismatch: missing `bldg.wallAlign.median`, `bldg.wallAlign.share15`, `cut.length`; extra `bldg.wallAlign`"**. The cause is
the design seat `design/m1-corrections-1`. At 20:24 and 20:46 it applied DC-01 … DC-35 to V12 §3.4.2's catalogue: the
alignment metric is split and `cut.length` is added. `compute()`'s catalogue check compares that catalogue with
`plan.py`'s registry, and registering those ids is **W-01b's** item.

**Proof that this lane's change is not the cause (CONFIRMED).** The pre-fix `plan.py` (`4015955f…`), run on a scratch
mirror against today's V12, fails the same way. Against the V12 copy taken at 20:17, it reads SAME.

**Consequence.** Every write through `plan.py` now refuses, `--bind-ftg` and `--fail-ftg` included. **Programme 2's first
bind (slot 6) will be refused until W-01b lands.** The session should land W-01b before slot 6's seat binds: before
programme 2 is launched, or at least before its first post step. Otherwise the seat holds a created settlement it cannot
bind.

This lane does not register the ids. They are W-01b's (plan §2 W-01b), and doing it here would regenerate
`metrics.m-1.json`, which the brief leaves to W-01b. The hazard is logged as a NOTE line in `lane-events.log` (21:03) and
in the result's owner notes.

## Calls made under the owner's delegation (J122; each vetoable)

1. **The water entry is pinned by its value in the script.** The alternatives were deriving the entry from the base
   against slot 0's recorded request, or pinning it by a hash of its value. The value is pinned the way R-24 pins the size
   class's leaf names and `WATER_KEYS` pins the coastal value. The script is a research-side tool, not a record; records,
   this one included, name the entry in our words.
2. **Fail closed on the resource list.** Any wrong list fails both request checks, even where no leaf differs from the base
   (the request-diff check) or from slot 0 (the slot-0 check).
3. **The guard also refuses a recorded slot's removal.** This is beyond the brief's "label, size or water": T5 showed that
   the old script silently lost a binding when rows were struck.
4. **Section I's failure paths.** Three create attempts without a settlement are `--fail-ftg K=create-failed`, and the seat
   returns `failed`, as the W-02b row said. A site refusal leaves the slot open, as §2.1b (6) and §9 say. Besides the
   note's case (a PUT 200 with no new row), any other mismatch also stops the run and is never retried: a new row after a
   PUT that did not return 200, or two new rows. That is the conservative reading.
5. **The plan stays revision 3,** with a §12c changelog, like the rulings seat's status touch. These are corrections, not
   new rulings, apart from R-48.
6. **The TOWN size step.** The form opens at TOWN, so section I has the seat confirm the value by `eval` rather than
   requiring a select. Either way the request carries the form's TOWN values.

## CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed or read):**

- the red tests and controls of U1 and U2, and both atomic installs with their hash checks;
- `--check-only` 10 of 10 on slots 0–5 under the installed post script;
- the live `plan.py --check` SAME (`524830f5…` / `7a21bb29…`) after the install and after every document edit;
- the `--vectors` seed;
- §13.5's water row and band rule, read whole;
- the base and slots 0–5 resource lists: the `none` captures equal the base's list without the fishing entry, the
  `coast+river` captures equal the base's list;
- the self-checks (section below);
- the catalogue mismatch and its cause (the hazard section).

**PLAUSIBLE (reasoning only):**

- that the METROPOLIS form keeps H4's coordinates (section I re-reads them anyway);
- that CITY's first slot needs no new size-dependent leaf, because the base is a CITY capture;
- that programme 2's sizes imply the same resource lists as programme 1's (the post script would fail a slot that does
  not, and R-41's step list routes it).

## Self-checks (`doc_checks.py --doc <file> --heads docs/ARCHITECTURE.md`, full corpus)

The full corpus was the same for all runs: colour files 10 670, JSON files 10 204, 3-grams 955 797, lists 521, own outputs
left out 54, values-only 1. The runs took 20:23–20:51 on a machine at a load average near 97.

| document | C1 | C2 | C3 hits / unreviewed | C4 | S1 | S2 |
|---|---|---|---|---|---|---|
| `M-1-plan.md` | 1 (reviewed) | 0 | 46 / 44 | 0 | 0 | 1 (reviewed) |
| `M-1-rulings-2.md` | 1 (reviewed) | 0 | 44 / 41 | 0 | 0 | 1 (reviewed) |
| `M-1-work.json` | 0 | 0 | 27 / 25 | 0 | 0 | 0 |
| `ftg_capture_checklist.md` | 4 (reviewed) | 0 | 21 / 20 | 0 | 0 | 1 (reviewed) |

Every unreviewed hit was read, and they are of these kinds:

- capture dates and stamps (the 2026-09-21 base, the 2026-09-25 captures, the recorded CITY family's folder names);
- digit runs of section numbers;
- our own file paths (the presets file, the NG draw record, the road-length README, our `referenceBuild` string, the FTG
  critique and layout-analysis files of `research/`);
- phrases of our own records. The ones this round added are "settlement in the owner's", "export and the retry as",
  "md and the plan's", "md 6 and the two", "steps the first of size", "the rivers and the other", "s on the server and"
  and "value of the layout preset".

None is a reference word list, palette, grammar or identifier.

The plan's 46 / 44 and the rulings record's 44 / 41 against the closing check's 45 / 43 and 42 / 39 are these phrases
(net), with one hit removed ("is written by the first", from §2.1b (10)).

**Three of the checklist's hits are not our words.** One is the run of the material, race and religion presets' names,
and two are runs of the land-cover and wall boxes' labels, all in the checklist's sentence on the base form values (its
opening paragraph). They are the site's form labels, and this record does not repeat them. Lane `m1/W-02`
wrote that paragraph, and this lane did not touch it. The checklist holds them by design (PC-20, R-27: it is the one file
that carries the literal labels the driver needs). They name site controls, not generator content.

No allow row was added for any hit. This record's own counts are in `results/plan-fix-3.json`.
