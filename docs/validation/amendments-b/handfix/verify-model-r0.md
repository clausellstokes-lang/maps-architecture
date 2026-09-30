# handfix-b/verify-model-r0 — verification of the MODEL part's hand fixes (closing-report §2)

> PENDING FABLE REVIEW — Opus-produced (handfix-b/verify-model-r0).

PROGRESS (kill-safe ledger; a seat that continues this lane reads it first)
ITEM read: planned closing-report §2 (model issues #5, #7, #14, #15, #16, #18, #19, and #6 (ii) carrying #7 (3)), §3, handfix/apply.md, the archive for the before | done
ITEM diff: planned a whole-document word diff archive -> live, by subsection | done (scratchpad vm/doc-wdiff.txt; 19 subsections changed; §2.5 and §2.6 changes are exactly the model fixes)
ITEM per-fix: planned PRESENT / PARTIAL / MISSING / MISAPPLIED for every sub-change | done (§1: 23 of 23 sub-changes PRESENT, placed where required, none twice)
ITEM sweeps: planned untouched-text, single source, references, deferral wording, owner rules (item 20) over the touched subsections and the citing ones | done (§2, §3: 7 issues, 0 owner-rule contradictions)
ITEM checks: planned doc_checks.py on the live §2 (this lane edits no design text) | done (§4: exit 0, 0 unreviewed)
ITEM close: planned queue row, LANDED line | done (row B-handfix-b/verify-model-r0; LANDED line)

Lane `handfix-b/verify-model-r0`, 2026-09-27, a verifier seat (opus). Inputs: `docs/ARCHITECTURE.md` sha256
`5d752c9b…` and `docs/ARCHITECTURE-RATIONALE.md` `61477508…` (as handfix-b/apply wrote them); the before is
`docs/archive/ARCHITECTURE-pre-handfix-b-2026-09-27.md` (`1a861c72…`) and its rationale twin (`8a24a5a7…`). This seat
edits no design text.

## Outcome

* **Every model fix is PRESENT exactly as required**, at the required place and once: the 23 sub-changes of #5, #7
  (with #6 (ii)'s F-EDIT insertion that carries #7 (3)), #14, #15, #16, #18 and #19. CONFIRMED by script: each required
  new text, whitespace-normalised, occurs once in the live file and zero times in the archive, and each replaced old
  string occurs zero times in the live file (`checks.py`, §1).
* **No other text in §2.5 or §2.6 changed.** A word diff of every subsection, archive against live, shows in §2.5 only
  #7 (1), and in §2.6 only #5 (i)–(ii), #14 (i)–(iv), #15 (1), #16, #18 (ii) and #19. The model's Part A entries
  (J-A28.23, J-A28.26, J-A28.28, J-A29.25) changed only by their appended sentence, and J-A30.25 is new in both files.
* **References and deferral wording.** `refs.py` on the live document finds 139 headings, 35 D ids, 471 J ids and 2
  broken references, both the pre-existing external citations (l. 2706, l. 9193); none is in a model text. No new model
  text carries deferral wording.
* **Owner rules.** There is no new contradiction with item 20. The capacity rule never drops a household of a dossier's
  roster: a hand edit is refused instead (F-EDIT), and generation or an epoch sends the household to §4.7's
  re-provision, whose F-SITING cell (#3) excludes a dossier household from the last rung. §7.7's precedence (lock >
  dossier existence) already makes a locked household outrank a dossier change, so "S11's operator … leave … unchanged"
  adds no new conflict.
* **7 issues are returned (all minor)**, each a defect that a fix left or introduced (§3):
  * **5 model:** VHM-01 headroom stale after a heights edit; VHM-02 a cleared front building; VHM-03 step 4's clip
    order gloss; VHM-04 a cyclic tower order; VHM-05 J-A29.25's index row.
  * **1 model (wording):** VHM-06, J-A28.23's index row.
  * **1 scope:** VHM-07, T28-2 and T28-3 with the walk-out's trapdoor fallback.

## 1 The fixes, one by one

Verdicts: PRESENT = the required text is in the live file once, at the required anchor, and the old text is gone.
Live line numbers are for `5d752c9b…`.

| # | sub | where (live) | verdict | evidence (the live text, quoted from its first words) |
|---|---|---|---|---|
| 5 | (i) | §2.6 capacity bullet, l. 1488 | PRESENT | "re-homes the households past the capacity, the last in address order passing over a locked or pinned one (§7.2), which keeps its building, by §4.7's overflow pass" |
| 5 | (ii) | §2.6 capacity bullet, l. 1491 | PRESENT | "No such change is refused for it, except a hand edit whose excess cannot be re-homed — its locked and pinned households alone above the new capacity, or a household of no dossier's roster … is F-SITING's (§5.2, J-A28.46)." |
| 5 | (iii) | index J-A28.23, l. 12817 | PRESENT | "never by refusing the change; the re-homing passes over locked and pinned households, and a hand edit whose excess cannot be re-homed returns F-EDIT" (see VHM-06) |
| 5 | (iv) | Part A J-A28.23, rat. l. 357 | PRESENT | appended at the end of the entry: "A locked or pinned household keeps its building … (verify-model-r3 V-MAB3-01 with VD3-11 and VP3-07)." |
| 7 | (1) | §2.5 `Passage.headroomCm`, l. 877 | PRESENT | "headroomCm: Cm /* the passage's clear height — the ground storey it takes, … a heights edit that would leave a spanning wing below two floors is refused (F-EDIT, §5.2) */" (see VHM-01, VHM-02) |
| 7 | (2) | §7.1 "Entrances, basements, passages and plans", l. 6547 | PRESENT | "`Passage.headroomCm` is derived — S11 writes it with the spanning wings' `spans` (§2.5) — and has no edit kind of its own;" |
| 7 | (3) = 6 (ii) | §5.2 F-EDIT detection, l. 5641 | PRESENT | "a heights edit that would leave a base wing spanning a passage below two floors (§2.5 `Passage.headroomCm`; item 30);", after the re-homing clause, one insertion as the closing note says |
| 7 | (4) | §13.2 T30-4, l. 10416 | PRESENT | "every passage with a `frontBuilding` has its `headroomCm` written, each base wing spanning it has at least two floors and an eave above that headroom, and a heights edit that would leave a spanning wing below two floors returns F-EDIT;" |
| 7 | (5) | index, l. 12977 (after the table's last row) | PRESENT | "\| J-A30.25 \| `Passage.headroomCm` derived by S11 with the spans — … \| §2.5, §2.6 \|" |
| 7 | (6) | Part A, rat. l. 517 (after the table's last row) | PRESENT | "\| J-A30.25 \| Chose to derive a passage's clear height from the wings that span it — … (verify-rendering-r3 VR3-01; closing ruling). \|" |
| 14 | (i) | §2.6 capacity bullet, l. 1472 | PRESENT | "the union of the extents of the building's base wings (`Building.wings`, with their `spans`) that reach storey `s` (the contract's fourth rung, above) — never a composition's wings, stored or derived, so neither a click nor a stored composition moves it (§6.2):" |
| 14 | (ii) | §2.6 `Wing.spans`, l. 987 | PRESENT | "read on the base wing by the capacity (below), §8.5's span mark (also §8.4's span caster) and the 3-D export (§11.1), and on the base or the composed wing by the plan rung" |
| 14 | (iii) | §2.6 stage-3 contract, l. 1258 | PRESENT | "A composition's wings — generated or stored, and after every composition edit — reach every storey its base wings reach, with at least their area at each storey, so the households the capacity admits always fit its plan (F-PLAN tier 6, §5.2)." |
| 14 | (iv) | §2.6 intake bullet, l. 1278 | PRESENT | "so a stage-3 generator is admitted only with compositions the base can carry and only with compositions that keep that storey rule." |
| 14 | (v) | Part A J-A28.28, rat. l. 492 | PRESENT | appended: "The capacity reads the base wings only, and every composition keeps at least their area at each storey they reach (verify-model-r3 V-MAB3-02, verify-rendering-r3 VR3-02)." |
| 15 | (1) | §2.6 stage-3 contract, l. 1266 | PRESENT | "A composed tower — a round wing to the plan rung — stands in the clip order before every wing its ring overlaps without lying wholly inside it … marks a composer's bug." (see VHM-03, VHM-04) |
| 15 | (2) | index J-A28.26, l. 12820 | PRESENT | "a wing wholly inside another's at a storey after that container, a composed tower before the wings it engages" |
| 15 | (3) | Part A J-A28.26, rat. l. 360 | PRESENT | appended: "A composed tower stands in the clip order before every wing it engages, … (verify-kernel-r3 VK3-01; closing ruling)." |
| 16 | — | §2.6 step 5, l. 1403 | PRESENT | "(item 29 (5)), and a walk-out basement's outside door (step 3, `external`) the root of the basement's storeys;" |
| 18 | (i) | §10.2 `RoomProgramRow`, l. 8991 | PRESENT | "basementAccess: 'core'\|'trapdoor' /* … read at the plot's builtBand — never external, which only a walk-out's fall derives; the plan rung reads Basement.access */" |
| 18 | (ii) | §2.6 step 3, l. 1381 | PRESENT | "opens the basement in the side of `Basement.ring`, among those at least two of step 4's wing-local modules long (a door's width), … — where no side is that long, the basement is joined by the `trapdoor` fallback above, reported —;" (see VHM-05, VHM-07) |
| 18 | (iii) | Part A J-A29.25, rat. l. 508 | PRESENT | appended: "A programme row names a stair core or a trapdoor only, … takes the trapdoor fallback (verify-model-r3 V-MAB3-04)." |
| 19 | — | §2.6 re-cut bullet, l. 1512 | PRESENT | "Re-uniting the households removes what the subdivision added — exactly for an unstored plan, … its undo restores it exactly (§7.4)." |

No sub-change is PARTIAL, MISSING or MISAPPLIED, and none was applied twice (each new text occurs once).

## 2 Sweeps over the touched subsections and those that cite them

Read whole on the live text: §2.5 and §2.6 (l. 826–1533). Read at their citing places:

* §2.8's decline states and registry paragraph;
* §3.4's `tileRings` and seed-clip paragraph and its `fixed` comment;
* §4.7 S11's passage sentence;
* §4.11's rung-3 purchase clause (the lock that stops it);
* §5.2's F-SITING, F-PLAN and F-EDIT rows;
* §7.1's buildings row and "Entrances, basements, passages and plans";
* §7.3 item 1 and the operator table;
* §7.4's setAttr row;
* §7.7's precedence line;
* §8.4's shadow casters, §8.5 (2)'s span mark, and §11.1's glTF and CityJSON rows;
* §10.2 `RoomProgramRow`;
* §13.2 T28-1 … T28-18, T29-4 and T30-4;
* §16 M2a / M2b (which gate T30-4);
* the index rows and Part A entries of J-A28.23, J-A28.26, J-A28.28, J-A28.33, J-A29.25 and J-A30.25.

* **Untouched text:** CONFIRMED unchanged outside the fixes (the word diff above; `vm/doc-wdiff.txt`).
* **Single source:** one new second statement went stale — step 4's gloss of the clip order, which #15 widened
  (VHM-03). The other restatements are pointers, tests or index summaries that agree with their home: F-EDIT's
  re-homing and heights clauses, T28-18, T30-4, and J-A30.25's index row. One index summary is inexact (J-A29.25,
  VHM-05).
* **Lifecycle of the new stored field `Passage.headroomCm`:**
  * create, persist and regenerate: S11, with `spans`;
  * read: §8.4, §8.5 (2), §11.1;
  * undo: through the event's record;
  * migrate: no older document has a passage (§7.5).

  Two paths change its inputs without rewriting it: a heights edit (VHM-01), and `clear` of the front building, which
  zeroes the heights (VHM-02). Either leaves "each spanning wing's eave stands above the headroom" false, which is the
  failure VR3-01 was raised for.
* **Milestones:** T30-4's new F-EDIT clause is gated at M2b, and `setAttr` with dry-run conflicts is M2a's, so the bar
  can run where it is gated.
* **Item 20:** no model text lets an epoch, an edit or a solver rung remove a dossier element or a dossier roster's
  household (Outcome).

## 3 Issues

| id | severity · kind | owner | where | the defect in one line |
|---|---|---|---|---|
| VHM-01 | minor · new-problem (lifecycle) | model | §2.5 `Passage.headroomCm`; §7.1; §13.2 T30-4 | a heights `setAttr` of a spanning wing changes the headroom's inputs, but only S11 writes it |
| VHM-02 | minor · partial (VR3-01) | model | §2.6 `BaseWing.spans`; §7.1 buildings row | `clear` zeroes a front building's heights while its wings keep `spans`, so the span mark's height is negative; a `demolish` leaves `frontBuilding` naming a tombstone |
| VHM-03 | minor · stale duplicate | model | §2.6 step 4 | step 4 restates the clip order without #15's tower rule |
| VHM-04 | minor · new-problem | model | §2.6 stage-3 contract | a tower wholly inside wing A that overlaps a wing B taken before A has no defined place in the clip order |
| VHM-05 | minor · stale | model | index J-A29.25 | the row still says the walk-out door goes in the ring's lowest side |
| VHM-06 | minor · wording | model | index J-A28.23 | "never by refusing the change" is followed in the same row by a refusal |
| VHM-07 | minor · stale | scope | §13.2 T28-2, T28-3 | a correct walk-out that takes step 3's new trapdoor fallback fails T28-3 |

### VHM-01 — a heights edit leaves `Passage.headroomCm` stale (minor · model)

**Claim.** §2.5 makes the headroom "derived, written by S11 whenever it writes the spanning wings' BaseWing.spans …, and
so on every re-fit, as the least ground-storey height (eaveCm ÷ floors …)". A `setAttr` of heights is no re-fit:

* §7.4's row makes it "an input override at the stage that computes the attribute (… heights and roof: S11)", which is
  how regeneration reads it, not an S11 run.
* §2.6's capacity bullet handles its effect by §4.7's overflow pass, which writes households, not `spans`.

So a heights edit that keeps a spanning wing at two or more floors, but changes its `eaveCm` or `floors`, leaves the
stored value stale.

Example: floors 2, eave 900, so the headroom is 450. A `setAttr` to eave 400 leaves 450, and §8.5 (2)'s mark height
(eave less headroom) becomes −50.

That no text names the heights edit as a writer is CONFIRMED. That the edit triggers no S11 re-fit is PLAUSIBLE: it is
read from §7.4's row and the capacity bullet.

**Required change.**

(1) §2.5: replace "and so on every re-fit, as the least ground-storey height" with "and so on every re-fit, and
re-derived inside every other event that changes a spanning wing's heights (a `setAttr` of heights, §7.1; its former
value in that event's undo record, §7.4), as the least ground-storey height".

(2) §7.1: replace "`Passage.headroomCm` is derived — S11 writes it with the spanning wings' `spans` (§2.5) — and has no
edit kind of its own;" with "`Passage.headroomCm` is derived — S11 writes it with the spanning wings' `spans`, and a
heights edit of a spanning wing re-derives it (§2.5) — and has no edit kind of its own;".

(3) §13.2 T30-4: replace "every passage with a `frontBuilding` has its `headroomCm` written," with "every passage with a
`frontBuilding` has its `headroomCm` written and equal to §2.5's rule, after a heights edit of a spanning wing too,".

### VHM-02 — a cleared front building keeps its spans with zeroed heights (minor · model)

**Claim.** VR3-01 was raised because a spanning wing of one storey "gives the mark a height of zero or less". #7 fixed
that for S11's heights, but not for §2.8's decline. There, `clear` leaves a live building whose "heights are zeroed in
the record" (l. 1698), and every state "can be applied by hand" (§7.1). The wings keep their `spans`, which are "written
and cleared only by S11", so the following all still read the building as spanning with eave 0:

* §8.5 (2)'s span mark: height 0 less the headroom, which is negative;
* §8.4's caster;
* §11.1's extrusions;
* T30-4's new "each base wing spanning it has at least two floors".

The gap is CONFIRMED on the text; the hand path is reachable in the base. The ruling proposed follows the realism
tiebreaker and J-A30.25's own "a passage with no storey over it is an alley, not a passage": a robbed-out building no
longer covers its passage. Because every reader keys on `spans` or `Passage.frontBuilding`, clearing both makes each
reader right with no rendering edit, and T30-4 already reads "every passage with a `frontBuilding`".

**Required change.**

(1) §2.6 `BaseWing.spans`: replace "written and cleared only by S11, when it builds or re-fits the passage's front
building or the passage goes" with "written only by S11 and cleared by S11, when it builds or re-fits the passage's
front building or the passage goes".

(2) §2.6 `BaseWing.spans`: replace "sealPassage, openPassage and thin … back_court's sealing change no geometry and leave
it); absent on every other wing." with "sealPassage, openPassage and thin … back_court's sealing change no geometry and
leave it) — and cleared, with `Passage.frontBuilding`, by §2.8's `clear` of the front building, which zeroes its
heights, in that event, a `demolish` of it clearing `Passage.frontBuilding` the same way (each undo restoring what its
event cleared, §7.4), the passage then open above, its face and its plots' access unchanged, until S11 raises a
successor over it (`reuse … build`, `build`); absent on every other wing."

The demolish clause closes the neighbouring case in which `frontBuilding` would name a tombstone. It is the same one
field, so it is folded in here rather than filed as its own issue.

(3) §7.1's buildings row: replace "each base wing's `spans` (written and cleared only by S11 when it builds or re-fits a
passage's front building, §2.6)" with "each base wing's `spans` (written only by S11 when it builds or re-fits a
passage's front building, and cleared by S11 or by a `clear` of that building, §2.6)".

### VHM-03 — step 4's clip-order gloss omits the tower rule (minor · model)

**Claim.** #15 (1) put composed towers into the clip order, and J-A28.26's index row now names it. §2.6 step 4 still
glosses the order as "in the clip order — wing order, a contained wing after its container (the stage-3 contract) —".
That is a second statement of the rule, and it is now incomplete. CONFIRMED.

**Required change.** §2.6 step 4: replace "in the clip order — wing order, a contained wing after its container (the
stage-3 contract) — by §3.4's seed clip" with "in the stage-3 contract's clip order — wing order, a contained wing after
its container, a composed tower before the wings it engages — by §3.4's seed clip".

### VHM-04 — the tower rule can give a cyclic clip order (minor · model)

**Claim.** #15 (1) orders a composed tower "before every wing its ring overlaps without lying wholly inside it (a tower
wholly inside a wing follows its container, as above)". Take a tower T wholly inside wing A whose ring also overlaps a
wing B that precedes A. B precedes A in wing order and is not wholly inside A, since a contained wing would follow A.
Then T must follow A, precede B, and B precedes A: the order is a cycle, and the text defines no clip order.

A valid order exists: T, then B, then A. B is not wholly inside A, so B reaches past A's edge, and T ∪ B cuts A to its
edge with no hole. With T after A instead, T's round room would cross B's piece, and §3.4 would refuse it.

The text gap is CONFIRMED by reasoning. The geometry (a tower on an overlap of wings) is PLAUSIBLE and rare.

**Required change.** §2.6 stage-3 contract: replace "(a tower wholly inside a wing follows its container, as above)"
with "(a tower wholly inside a wing follows its container, as above, unless its ring also overlaps a wing taken before
that container, when the tower is taken before both — that wing, not wholly inside the container, carries the tower's
cut to the container's edge, so no piece has a hole)".

### VHM-05 — J-A29.25's index row is stale after #18 (minor · model)

**Claim.** The row says "a walk-out's outside stair a door in the basement ring's lowest side". §2.6 step 3 now puts the
door in the lowest side "among those at least two of step 4's wing-local modules long", and takes the `trapdoor` fallback
where none is. The programme row can no longer say `external`. Part A was appended (#18 (iii)), but the index row was
left. This is the same kind of issue as VK3-02. CONFIRMED.

**Required change.** J-A29.25's index row: replace "a walk-out's outside stair a door in the basement ring's lowest side,
the core stopping at the ground storey" with "a walk-out's outside stair a door in the lowest of the basement ring's
sides at least two wing-local modules long, the core stopping at the ground storey — the `trapdoor` fallback where no
side is that long; a programme row's `basementAccess` names `core` or `trapdoor` only".

### VHM-06 — J-A28.23's index row reads as a contradiction (minor · model)

**Claim.** After #5 (iii) the row reads "never by refusing the change; the re-homing passes over locked and pinned
households, and a hand edit whose excess cannot be re-homed returns F-EDIT": "never refusing", then a refusal, in the
same row. The home (§2.6) states the exception correctly ("No such change is refused for it, except a hand edit …").
CONFIRMED (wording).

**Required change.** J-A28.23's index row: replace "never by refusing the change; the re-homing passes over locked and
pinned households, and a hand edit whose excess cannot be re-homed returns F-EDIT" with "never by refusing the change,
except a hand edit whose excess cannot be re-homed, which returns F-EDIT; the re-homing passes over locked and pinned
households".

### VHM-07 — T28-2 and T28-3 do not admit the walk-out's trapdoor fallback (minor · scope)

**Claim.** #18 (ii) joins a walk-out whose ring has no side a door fits "by the `trapdoor` fallback above, reported",
with `Basement.access` still `external`. The two bars do not allow for it:

* T28-3 admits a reported `trapdoor` core only "where no bay of the core fits the basement ring", and requires a walk-out
  (`'external'`) to be entered "by its outside stair". So the correct fallback plan fails T28-3.
* T28-2 starts a walk-out's walk "at its outside door", which that plan does not have.

CONFIRMED on the text.

**Required change.**

(1) §13.2 T28-3: replace "or the `trapdoor` core the plan reports where no bay of the core fits the basement ring
(§2.6's fallback; J-A29.25) — or, for a walk-out (`Basement.access` `'external'`), by its outside stair;" with "or the
`trapdoor` core the plan reports where no bay of the core fits the basement ring or, for a walk-out, where no side of the
ring is long enough for its door (§2.6's fallback, step 3; J-A29.25) — or, for any other walk-out (`Basement.access`
`'external'`), by its outside stair;".

(2) §13.2 T28-2: replace "and, for a basement whose `Basement.access` is `external`, at its outside door (§2.6 step 3) —"
with "and, for a basement whose `Basement.access` is `external`, at its outside door where step 3 opens one (§2.6 step
3) —".

Every old string above occurs exactly once in its file, whitespace-normalised (`anchors.py`: 12 of 12).

## 4 Receipts

Scratch files are in the session scratchpad under `handfix/vm/`:

* `wdiff.py` → `doc-wdiff.txt`: the subsection word diff.
* `checks.py`: 23 rows, each new text live = 1 and archive = 0, and each replaced old text live = 0.
* `anchors.py`: 12 of 12 anchors occur once.
* `refs.json` / `refs.out`: headings 139, D 35, J 471, broken 2, both pre-existing external.

**`doc_checks.py`** was run on a copy of the live document (`--heads` the live file). This lane changes no design text,
so the untouched, mine and combined copies are one file, and there are no added hits to review:

| sections | C1 | C2 | C3 | C4 | S1 | S2 | unreviewed | exit |
|---|---|---|---|---|---|---|---|---|
| "2.5,2.6" | 5 | 0 | 233 | 2 | 0 | 0 | 0 | 0 |
| "2" | 5 | 0 | 329 | 3 | 0 | 0 | 0 | 0 |

Verify-model-r3 counted C3 328 for "2", and the live count is 329. The net change comes from the §2.6 hits that
handfix-b/apply reviewed as allow rows ("wing to the plan rung", "root of the basement s", and the split "stair core
doors …" run). The count of unreviewed hits is 0.

## 5 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed on disk):

* The 23 sub-changes present once, the old texts gone, and the placements in their rows and entries.
* No other change in §2.5 or §2.6.
* The references, and the absence of deferral wording.
* Every anchor of §3 occurring once.
* The texts VHM-01 … 07 rest on, read in place.

**PLAUSIBLE** (reasoning):

* How often VHM-01, 02 and 04 are reached.
* The rulings proposed in VHM-02 (a cleared front building clears its spans) and VHM-04 (the tower before both).
* That §2.6's "its undo restores it exactly" (#19) and T28-15's "the subdividing event's undo" agree. Both are true of
  §7.4's inverse records, so no issue is raised.
