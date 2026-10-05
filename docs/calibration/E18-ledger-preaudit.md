# E18 — W-19 pre-audit: the seat ledger against the M-1 seats (before the crossing)

Lane `filler/w19-ledger-preaudit` (Opus, research-side; workflow wf_2dccb46b-5d7), 2026-10-05 03:29–03:34. This record is
research-side (`plat/CLEAN-ROOM.md` rule 2: implementer seats do not read it). It is a **pre-audit**, not W-19 itself:
W-19 is the exit check and runs after W-20 (plan §2, §4 wave 3 (3); R-25). This lane wrote **no** ledger row, no file under
`plat/`, ran no git command and no test runner. It holds lane keys, row ids, counts and our own words only.

## 0 Verdict

* **Seats with no ledger row: 0.** No M-1 seat has written into `plat/` yet, so none owes a §2 row today (CONFIRMED, §2).
* **Rows with no seat: 0.** The committed §2 holds 143 rows; every one is an M0 build or check seat. No row belongs to an
  M-1 seat, and none names a seat the log does not know as M0's (CONFIRMED, §3).
* **Role mismatches in rows: 0** (there are no M-1 rows to mismatch). **Role and scope mismatches in the plan's text: 4**
  (F1–F4, §5), each to settle before W-20 so that W-19 has one rule to check against.
* **Rows W-19 should expect after W-20: 5 §2 rows, 1 §3 report, 1 §4 record** (§4).

## 1 Sources and how they were read

| source | state read | how |
|---|---|---|
| `plat/CLEAN-ROOM.md` **as committed** | the copy the session saved at `maps-scratch/filler/w19/CLEAN-ROOM.head.md` (255 lines; sha256 prefix `04f12a0e57852b0a`) | whole §1 rule and §2 ledger read; §2a–§5 read for their tables' state |
| `plat/CLEAN-ROOM.md` working copy | the tree at 03:31 | **row ids and seat keys only**, to say which rows are uncommitted (§3); none of it feeds a finding |
| `plat/docs/digest/`, `plat/packages/testkit/baselines/` | the working copy at 03:31 | a directory listing and `crossings.json`'s size: the crossing targets' state (§2) |
| `docs/lane-events.log` | 5 570 lines at 03:32 | every line of the 107 M-1-related lane keys (§6), each searched for a `plat/` path and for a stated no-`plat/` clause |
| M-1 plan files | `M-1-plan.md` (revision 3, with §12c and §12d), `M-1-work.json`, `M-1-rulings-1.md` R-25, `M-1-rulings-2.md` R-45, `M-1-plan-notes.md` N-06, §3 | §7's table and R-45's sentence give the seat list; W-17 … W-20 rows in both files |
| `docs/calibration/results/W-20-dryrun.json`, `W-18-twin.json` | as landed at 03:10 and 03:30 | searched for ledger and role sentences only |

## 2 The M-1 seats in the lane log, and whether any wrote into `plat/`

107 lane keys serve M-1: 82 `m1/…` keys, `catchup/m1-plan`, `catchup/cleanroom`, nine `design/…` lanes (the clean-room fix
and the M-1 design corrections, with their verifiers) and 14 `filler/…` keys of this workflow (this lane included). §6 lists
every one.

* **No line of any of the 107 keys names a `plat/` path as written.** 66 keys state it outright in one of their lines ("no
  `plat/`", "nothing under `plat/`"); 40 are silent and every path their lines name lies outside `plat/`; one
  (`m1/wave2-verify`) mentions `plat/packages` as a search left unrepeated — a reading, no write. CONFIRMED (the search of
  §1; the counts are this lane's, from the table of §6).
* **`m1/W-17-draft`** has CHECKPOINT and NOTE lines and no LANDED line; it wrote its digest candidate to
  `docs/digest-candidate/`, outside `plat/` (its own lines say so). The digest reaches `plat/docs/digest/` only at W-20.
* **The crossing targets hold nothing of M-1's** (working copy, 03:31): `plat/docs/digest/` holds only its `README.md`;
  `plat/packages/testkit/baselines/` holds its `README.md` and a `crossings.json` of 3 bytes (an empty array). No
  `baselines.json`, `ng-faces.json` or `denylist.json` is there. CONFIRMED for the working copy at that minute.
* **Reading `plat/` is not a ledger event.** Several M-1 lanes read `plat/` files (the M0 spec, `CLEAN-ROOM.md` §1–§4);
  the ledger's own header asks a row only of a seat that "writes or checks anything in `plat/`".

So every M-1 seat to date is a research-side seat outside the ledger's scope, and the expected count of M-1 §2 rows today
is zero.

## 3 The committed ledger's rows

The committed §2 holds **143 rows**, ids L-0001 … L-0145 with **L-0142 and L-0144 absent** from the committed text (both
are in the working copy, uncommitted). Every seat cell is a `build/…` or `check/…` key of an M0 spec, scaffold or item lane;
every role cell names an implementer-side author, checker or closing checker (three, L-0101, L-0109 and L-0110, say
"independent checker" without the word "side"; none says research-side). Lane keys of M-1 appear in the ledger only
inside notes cells (rule-8 incidental-read notes about `docs/lane-events.log` output) — 15 distinct `m1/…` keys, cited by M0 seats that read M-1 log lines and used nothing from them
— never as a seat. Seven seat keys repeat over 15 rows; most of the repeats name the row they correct or say they are a
continuation, relaunch or re-dispatch, and one (L-0143, a later fix round of the same item in another flow) says neither;
none is an M-1 seat, and the repeats are M0's to judge.

§3 (the digest checker's reports) and §4 (the deny-list's generation record) each hold only their "(none yet …)"
placeholder, as they should before W-18 and W-20.

The working copy carries 19 more rows (L-0142, L-0144, L-0146 … L-0162), all M0 build or check seats; none is an M-1 seat.
They are the busy items' uncommitted lines and are not this record's to judge.

## 4 The plan's seat list for `plat/`, and the rows W-19 should find after W-20

From plan §7's table and R-45 (the heading of §7 as corrected: the baseline, deny-list, digest and design seats are
research-side; the checker and digest-checker seats are implementer-side):

| seat (plan §7) | side (R-45) | what it writes into `plat/` | ledger entries owed at its landing | seated yet? |
|---|---|---|---|---|
| baseline seat | research | `packages/testkit/baselines/baselines.json`, `ng-faces.json` | one §2 row | no (W-15's candidates wait in `research/baselines/candidates/`) |
| deny-list seat | research | `packages/testkit/baselines/denylist.json` | one §2 row and the §4 G-row | no (W-16b's candidate built) |
| digest seat | research | `plat/docs/digest/` | one §2 row | no (W-17 drafted outside `plat/`) |
| checker seat (countersigner) | implementer | the in-file `crossings` entries and `crossings.json`'s records | one §2 row (its id is the one the record carries; W-20-dryrun used a placeholder id) | no |
| digest-checker seat | implementer | the §3 report in `CLEAN-ROOM.md` | the §3 D-row, and one §2 row (it checks in `plat/`) | no (the research-side twin half ran as `filler/w18-twin-half`; the implementer half waits on M0-k-06) |
| design seat | research | nothing (the design's cells live outside `plat/`) | none | — |

**W-19's expectation after W-20:** five §2 rows (one per seat above that writes or checks in `plat/`; the design seat owes none, see F2), one §3 report, one
§4 record, each dated no later than its seat's LANDED line; and still zero rows for every other M-1 seat of §6.

## 5 Mismatches in the plan's text (role and scope)

**F1 — Rule 1's definition against the research-side crossing seats.** `CLEAN-ROOM.md` rule 1 defines an implementer-side
seat as anyone who writes or checks tables, content or tooling *in `plat/`*. R-45 keeps the baseline, deny-list and digest
seats research-side, and each of them writes into `plat/` at W-20 and so owes a §2 row. Under rule 1's words those three
rows would describe implementer-side seats that have read the research trees, which rule 2 forbids. Either rule 1 gains a
third kind (a research-side seat that places numbers-only or digest files and reads nothing of `plat/` beyond its target),
or the three rows' role cells cite R-45 and C-0120 (3) as the exception. The choice touches the clean-room rule's wording,
so it is the session's (and, as a security-posture matter, the owner's); this record only names it. PLAUSIBLE as a
mismatch (reasoning over the two texts); the texts themselves are CONFIRMED.

**F2 — The work file names fewer §2 rows than the plan.** Plan §7's last row has *each* crossing seat append its own §2
row. `M-1-work.json`'s W-20 names only the checker seat's §2 row (and the deny-list seat's §4 G-row); W-17 and W-18 name no
§2 row; W-19's output reads "ledger rows" with no count. The work file is behind the plan here, as `M-1-plan-notes.md` §3
found for other items; follow the plan. CONFIRMED by the two texts. One limit on "follow the plan": plan §7's "each seat
above" literally includes the design seat, which writes nothing in `plat/` and so owes no row under the ledger's header.
W-19 tests the ledger's rule and expects five rows (§4), not six. When the plan's row is next touched it should read "each
seat above that writes into `plat/`"; route that wording with the work-file fix.

**F3 — Three wordings of W-19's test.** The plan's W-19 says "every seat that **wrote into** `plat/`"; the work file says
"every seat that **touched** `plat/`"; the ledger's header says "writes **or checks** anything in `plat/`". A seat that
only checks (the digest-checker's implementer half before it writes its report) falls inside the ledger's words but
not the plan's. W-19 should test the ledger's wording, which is the binding one. CONFIRMED (all three texts read).

**F4 — W-18's tool against the digest-checker's side.** The plan's W-18 row has the digest-checker seat (implementer-side
by R-45) run "the research twin of the scanner with W-16b's list + `doc_checks.py`"; both tools lie in trees rule 2 closes
to implementer seats (`research/baselines/`, `docs/validation/bench/`). In practice the work is already split:
`filler/w18-twin-half` (research-side) ran the twin half and landed `results/W-18-twin.json`, which leaves M0's scanner
half to W-18 proper, implementer-side, after M0-k-06. The plan's and work file's W-18 rows were not amended to say so (the
work file also still says "W-16's list" where the plan says W-16b's). Only the implementer half writes into `plat/` (the §3
report), so only it owes a ledger entry; the research half owes none. CONFIRMED by the texts and the landed result file.

**Outside W-19's M-1 scope, written down here to save a later re-find.** The session's own hand-off lanes (`session/handoff-1` …
`-4`) write `plat/docs/build/checks/M0-spec-notes.md`, `M0-handoff-M1.md` and `plat/docs/build/landed/session-handoff-*.json`,
and the committed ledger has no row for any `session/…` key. Whether the orchestrating session counts as a "seat" under the
ledger's header is the session's call; it is not an M-1 seat, so W-19 does not check it.

## 6 The 107 M-1-related lane keys (from `docs/lane-events.log`, 5 570 lines at 03:32)

"plat/ in its lines" reads: *states no plat/ write* — one of its lines says so; *silent* — no such clause, and every path the
key's lines name lies outside `plat/`.

**capture lanes (programme 1 and 2 slots and their verifiers)** (35 keys)

| lane key | first line | last line | LANDED lines | plat/ in its lines |
|---|---|---|---|---|
| `m1/W-02` | 2026-10-03 13:13 | 2026-10-03 13:33 | 1 | silent; every named path outside plat/ |
| `m1/W-02-slot1` | 2026-10-03 18:04 | 2026-10-03 18:19 | 1 | states no plat/ write |
| `m1/W-02-slot2` | 2026-10-03 18:20 | 2026-10-03 18:28 | 1 | states no plat/ write |
| `m1/W-02-slot3` | 2026-10-03 18:28 | 2026-10-03 18:37 | 1 | states no plat/ write |
| `m1/W-02-signed-in-verify` | 2026-10-03 18:37 | 2026-10-03 18:58 | 1 | states no plat/ write |
| `m1/W-02-slot3b` | 2026-10-03 18:42 | 2026-10-03 19:33 | 1 | states no plat/ write |
| `m1/W-02-slot4b` | 2026-10-03 18:56 | 2026-10-03 19:34 | 1 | states no plat/ write |
| `m1/W-02-slot5b` | 2026-10-03 19:10 | 2026-10-03 19:35 | 1 | states no plat/ write |
| `m1/W-02-signed-in-verifyb` | 2026-10-03 19:35 | 2026-10-03 19:45 | 1 | states no plat/ write |
| `m1/W-02-slot6` | 2026-10-03 22:17 | 2026-10-03 22:22 | 1 | states no plat/ write |
| `m1/W-02-slot6b` | 2026-10-03 22:54 | 2026-10-03 23:10 | 1 | states no plat/ write |
| `m1/W-02-slot7b` | 2026-10-03 23:11 | 2026-10-03 23:24 | 1 | states no plat/ write |
| `m1/W-02-slot8b` | 2026-10-03 23:25 | 2026-10-03 23:39 | 1 | states no plat/ write |
| `m1/W-02-slot9b` | 2026-10-03 23:39 | 2026-10-03 23:52 | 1 | states no plat/ write |
| `m1/W-02-slot10b` | 2026-10-03 23:53 | 2026-10-04 00:05 | 1 | states no plat/ write |
| `m1/W-02-slot11b` | 2026-10-04 00:07 | 2026-10-04 00:18 | 1 | states no plat/ write |
| `m1/W-02-slot12b` | 2026-10-04 00:19 | 2026-10-04 00:34 | 1 | states no plat/ write |
| `m1/W-02-slot13b` | 2026-10-04 00:34 | 2026-10-04 00:51 | 1 | states no plat/ write |
| `m1/W-02-slot14b` | 2026-10-04 00:52 | 2026-10-04 01:06 | 1 | states no plat/ write |
| `m1/W-02-slot15b` | 2026-10-04 01:07 | 2026-10-04 01:22 | 1 | states no plat/ write |
| `m1/W-02-slot16b` | 2026-10-04 01:23 | 2026-10-04 01:39 | 1 | states no plat/ write |
| `m1/W-02-slot17b` | 2026-10-04 01:40 | 2026-10-04 01:58 | 1 | states no plat/ write |
| `m1/W-02-slot18b` | 2026-10-04 01:59 | 2026-10-04 02:13 | 1 | states no plat/ write |
| `m1/W-02-slot19b` | 2026-10-04 02:29 | 2026-10-04 02:40 | 1 | states no plat/ write |
| `m1/W-02-slot20b` | 2026-10-04 02:41 | 2026-10-04 02:53 | 1 | states no plat/ write |
| `m1/W-02-slot21b` | 2026-10-04 02:54 | 2026-10-04 03:06 | 1 | states no plat/ write |
| `m1/W-02-slot22b` | 2026-10-04 03:06 | 2026-10-04 03:19 | 1 | silent; every named path outside plat/ |
| `m1/W-02-slot23b` | 2026-10-04 03:20 | 2026-10-04 03:32 | 1 | silent; every named path outside plat/ |
| `m1/W-02-slot24b` | 2026-10-04 03:33 | 2026-10-04 03:49 | 1 | silent; every named path outside plat/ |
| `m1/W-02-slot25b` | 2026-10-04 03:49 | 2026-10-04 04:04 | 1 | silent; every named path outside plat/ |
| `m1/W-02-slot26b` | 2026-10-04 04:05 | 2026-10-04 04:25 | 1 | silent; every named path outside plat/ |
| `m1/W-02-slot27b` | 2026-10-04 04:26 | 2026-10-04 04:36 | 1 | silent; every named path outside plat/ |
| `m1/W-02b-verifyb` | 2026-10-04 04:36 | 2026-10-04 04:51 | 1 | silent; every named path outside plat/ |
| `m1/W-02-slot27c` | 2026-10-04 05:33 | 2026-10-04 05:51 | 1 | silent; every named path outside plat/ |
| `m1/W-02b-verifyc` | 2026-10-04 05:52 | 2026-10-04 06:01 | 1 | silent; every named path outside plat/ |

**plan, rulings, plan-check and hand-off lanes** (15 keys)

| lane key | first line | last line | LANDED lines | plat/ in its lines |
|---|---|---|---|---|
| `catchup/m1-plan` | 2026-10-03 03:34 | 2026-10-03 03:58 | 1 | silent; every named path outside plat/ |
| `m1/plan-check` | 2026-10-03 12:50 | 2026-10-03 13:01 | 1 | silent; every named path outside plat/ |
| `m1/rulings-1` | 2026-10-03 16:27 | 2026-10-03 17:01 | 1 | states no plat/ write |
| `m1/plan-check-close-1` | 2026-10-03 17:03 | 2026-10-03 17:20 | 1 | states no plat/ write |
| `m1/rulings-2` | 2026-10-03 18:42 | 2026-10-03 19:46 | 1 | states no plat/ write |
| `m1/plan-check-close-2` | 2026-10-03 19:47 | 2026-10-03 20:01 | 1 | states no plat/ write |
| `m1/plan-fix-3` | 2026-10-03 20:08 | 2026-10-03 21:08 | 1 | states no plat/ write |
| `m1/plan-fix-3-check` | 2026-10-03 21:23 | 2026-10-03 21:34 | 1 | states no plat/ write |
| `m1/plan-guard-2` | 2026-10-03 21:58 | 2026-10-03 22:41 | 1 | states no plat/ write |
| `m1/rulings-2b` | 2026-10-03 21:58 | 2026-10-03 22:13 | 1 | silent; every named path outside plat/ |
| `m1/handoff-m0` | 2026-10-03 22:16 | 2026-10-03 23:00 | 1 | states no plat/ write |
| `m1/plan-guard-2-check` | 2026-10-03 22:41 | 2026-10-03 22:49 | 1 | states no plat/ write |
| `m1/rulings-3` | 2026-10-04 10:28 | 2026-10-04 10:53 | 1 | states no plat/ write |
| `m1/round3-apply` | 2026-10-04 10:55 | 2026-10-04 11:47 | 1 | states no plat/ write |
| `m1/round3-check` | 2026-10-04 11:48 | 2026-10-04 12:18 | 1 | states no plat/ write |

**measurement and record lanes (work items)** (29 keys)

| lane key | first line | last line | LANDED lines | plat/ in its lines |
|---|---|---|---|---|
| `m1/W-01` | 2026-10-03 12:50 | 2026-10-03 13:12 | 1 | silent; every named path outside plat/ |
| `m1/W-16` | 2026-10-03 12:53 | 2026-10-03 14:25 | 1 | silent; every named path outside plat/ |
| `m1/W-03` | 2026-10-03 13:13 | 2026-10-03 14:20 | 1 | silent; every named path outside plat/ |
| `m1/W-10` | 2026-10-03 13:34 | 2026-10-03 13:59 | 1 | silent; every named path outside plat/ |
| `m1/W-11` | 2026-10-03 14:00 | 2026-10-03 14:57 | 1 | silent; every named path outside plat/ |
| `m1/W-05` | 2026-10-03 14:21 | 2026-10-03 14:57 | 1 | silent; every named path outside plat/ |
| `m1/W-07` | 2026-10-03 14:26 | 2026-10-03 14:57 | 1 | silent; every named path outside plat/ |
| `m1/W-04` | 2026-10-03 14:58 | 2026-10-03 15:26 | 1 | silent; every named path outside plat/ |
| `m1/W-03-complete` | 2026-10-03 16:30 | 2026-10-03 16:49 | 1 | states no plat/ write |
| `m1/W-11b` | 2026-10-03 20:08 | 2026-10-03 21:27 | 1 | silent; every named path outside plat/ |
| `m1/W-22` | 2026-10-03 21:10 | 2026-10-03 21:44 | 1 | silent; every named path outside plat/ |
| `m1/W-10b` | 2026-10-03 21:36 | 2026-10-03 22:21 | 1 | states no plat/ write |
| `m1/W-01b` | 2026-10-03 21:48 | 2026-10-04 02:21 | 1 | states no plat/ write |
| `m1/W-03b` | 2026-10-03 22:16 | 2026-10-03 23:30 | 1 | states no plat/ write |
| `m1/W-05b` | 2026-10-03 22:23 | 2026-10-03 23:50 | 1 | silent; every named path outside plat/ |
| `m1/W-07b` | 2026-10-03 23:31 | 2026-10-04 00:00 | 1 | states no plat/ write |
| `m1/W-06` | 2026-10-03 23:54 | 2026-10-04 01:16 | 1 | states no plat/ write |
| `m1/W-09` | 2026-10-04 00:02 | 2026-10-04 03:07 | 1 | states no plat/ write |
| `m1/W-13` | 2026-10-04 03:08 | 2026-10-04 03:32 | 1 | states no plat/ write |
| `m1/W-08` | 2026-10-04 03:15 | 2026-10-04 04:15 | 1 | states no plat/ write |
| `m1/W-14` | 2026-10-04 03:36 | 2026-10-04 03:52 | 1 | states no plat/ write |
| `m1/W-05b-final` | 2026-10-04 04:52 | 2026-10-04 05:39 | 1 | states no plat/ write |
| `m1/W-12-fit` | 2026-10-04 04:58 | 2026-10-04 06:15 | 1 | silent; every named path outside plat/ |
| `m1/W-16b` | 2026-10-04 05:00 | 2026-10-04 06:36 | 1 | states no plat/ write |
| `m1/W-06-final` | 2026-10-04 05:40 | 2026-10-04 06:14 | 1 | states no plat/ write |
| `m1/W-12` | 2026-10-04 06:26 | 2026-10-04 06:38 | 1 | silent; every named path outside plat/ |
| `m1/W-05b-slot27` | 2026-10-04 06:56 | 2026-10-04 07:21 | 1 | silent; every named path outside plat/ |
| `m1/W-15` | 2026-10-04 07:21 | 2026-10-04 08:14 | 1 | states no plat/ write |
| `m1/W-17-draft` | 2026-10-04 08:14 | 2026-10-04 08:50 | 0 | silent; every named path outside plat/ |

**wave verifiers** (4 keys)

| lane key | first line | last line | LANDED lines | plat/ in its lines |
|---|---|---|---|---|
| `m1/wave1-verify` | 2026-10-03 15:27 | 2026-10-03 15:56 | 1 | states no plat/ write |
| `m1/wave2-verify` | 2026-10-04 04:16 | 2026-10-04 04:52 | 1 | mentions `plat/packages` as a search left unrepeated (a reading, no write) |
| `m1/wave2-verify-ftg` | 2026-10-04 06:14 | 2026-10-04 06:53 | 1 | states no plat/ write |
| `m1/wave3-verify-ab` | 2026-10-04 09:36 | 2026-10-04 10:28 | 1 | states no plat/ write |

**design and clean-room lanes serving M-1** (10 keys)

| lane key | first line | last line | LANDED lines | plat/ in its lines |
|---|---|---|---|---|
| `catchup/cleanroom` | 2026-10-03 03:35 | 2026-10-03 07:28 | 1 | silent; every named path outside plat/ |
| `design/cleanroom-fix-1` | 2026-10-03 16:27 | 2026-10-03 17:24 | 1 | silent; every named path outside plat/ |
| `design/cleanroom-fix-1-verify` | 2026-10-03 17:25 | 2026-10-03 17:59 | 1 | silent; every named path outside plat/ |
| `design/m1-corrections-1` | 2026-10-03 20:08 | 2026-10-03 21:22 | 1 | states no plat/ write |
| `design/m1-corrections-1-verify` | 2026-10-03 21:28 | 2026-10-04 02:21 | 1 | states no plat/ write |
| `design/m1-corrections-1-fix` | 2026-10-03 22:15 | 2026-10-03 22:44 | 1 | states no plat/ write |
| `design/m1-corrections-1-fix-verify` | 2026-10-03 22:44 | 2026-10-03 23:15 | 1 | states no plat/ write |
| `design/m1-corrections-2` | 2026-10-04 08:14 | 2026-10-04 09:05 | 1 | silent; every named path outside plat/ |
| `design/m1-corrections-2-verify` | 2026-10-04 09:06 | 2026-10-04 09:35 | 1 | silent; every named path outside plat/ |
| `design/m1-corrections-3` | 2026-10-04 10:55 | 2026-10-04 11:26 | 1 | states no plat/ write |

**filler lanes (this workflow)** (14 keys)

| lane key | first line | last line | LANDED lines | plat/ in its lines |
|---|---|---|---|---|
| `filler/w20-dryrun` | 2026-10-05 02:34 | 2026-10-05 03:10 | 2 | silent; every named path outside plat/ |
| `filler/k06-handoff` | 2026-10-05 02:34 | 2026-10-05 03:11 | 2 | states no plat/ write |
| `filler/e19-known-defects` | 2026-10-05 02:37 | 2026-10-05 03:11 | 2 | silent; every named path outside plat/ |
| `filler/phase-c-workflow` | 2026-10-05 02:39 | 2026-10-05 03:12 | 2 | states no plat/ write |
| `filler/m1-scope-inventory` | 2026-10-05 02:41 | 2026-10-05 03:15 | 2 | silent; every named path outside plat/ |
| `filler/m1-volume-shares` | 2026-10-05 02:46 | 2026-10-05 03:11 | 2 | silent; every named path outside plat/ |
| `filler/m1-spec-workflow` | 2026-10-05 02:47 | 2026-10-05 02:52 | 1 | states no plat/ write |
| `filler/w20-check` | 2026-10-05 02:53 | 2026-10-05 03:16 | 2 | states no plat/ write |
| `filler/e19-check` | 2026-10-05 02:55 | 2026-10-05 02:59 | 1 | states no plat/ write |
| `filler/m1-spec-workflow-check` | 2026-10-05 03:08 | 2026-10-05 03:08 | 1 | states no plat/ write |
| `filler/m1-spec-workflow-r1` | 2026-10-05 03:12 | 2026-10-05 03:13 | 1 | states no plat/ write |
| `filler/w18-twin-half` | 2026-10-05 03:29 | 2026-10-05 03:30 | 1 | silent; every named path outside plat/ |
| `filler/w19-ledger-preaudit` | 2026-10-05 03:29 | 2026-10-05 03:30 | 0 | silent; every named path outside plat/ |
| `filler/m1-deferral-ledger` | 2026-10-05 03:31 | 2026-10-05 03:32 | 0 | silent; every named path outside plat/ |


## 7 Receipts

* The deny-list twin (`research/baselines/make_denylist.py scan`) over this file before placing it: the research list
  TOK 0, ID 2 hits with 0 unreviewed, TRI 0, COL 0, SET 0, PHR 0, FILE 0 (six generic 3-gram runs of a first draft were
  reworded, not allowed); the M0-format list TOK 0, TRI 0, COL 0, SET 0, FILE 0. Exit 0 both.
* The seat table of §6 was generated by a short script in this lane's scratch folder from the log as it stood at 03:32;
  the ledger extract (`rows.txt`) and the key list (`m1-keys.txt`) sit beside it. Nothing under `plat/` was written; no
  git command and no test runner ran.
