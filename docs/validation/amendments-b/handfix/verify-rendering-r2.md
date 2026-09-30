# handfix-b / verify-rendering-r2 — the RENDERING part's fixes after repair round 2

> PENDING FABLE REVIEW — Opus-produced (handfix-b/verify-rendering-r2).

PROGRESS (resume from the first unchecked item):
- [x] 1. Read closing-report §2 (rendering-owned issues and issues whose change edits a rendering section) and §3 — none owned by rendering, none edits §8/§9/§11/§12; #7 (VR3-01) and #14 (VR3-02) fix model text the rendering part reads
- [x] 2. Read apply.md, repair-r2-rendering.md + report, assemble-r2.md — the one rendering change is VHM1-05 (REPLACE §8.2, one row); part diff A0=A1=A2, live = A2 + that row
- [x] 3. Diff archive (pre-handfix-b) vs live per touched rendering subsection — §8/§9/§11/§12 A0=A1=A2 (acb84a2e…); live differs by 1 line (§8.2 passage-arch row)
- [x] 4. Verdict per fix — VHM1-05 PRESENT verbatim; closing #7/#14 pointers into §8.4/§8.5 (2)/§11.1 consistent; no MISSING/MISAPPLIED
- [x] 5. Collateral checks: no other change, single source, refs, deferral wording, owner rules (item 20) — done (§3)
- [x] 6. Doc checks three-copy — sections 8,12,Judgment calls: untouched ×2 / mine / combined C1 5 C3 179, 0 unreviewed, exit 0; raw hits 0 added 0 removed; rationale whole 0 added 0 removed
- [x] 7. Issues with exact required changes (§4: VR2H-01, VR2H-02, both rendering, minor); queue row B-handfix-b/verify-rendering-r2 appended; LANDED line written

Lane `handfix-b/verify-rendering-r2`, 2026-09-27, an Opus verifier. The rendering part is §8, §9, §11 and §12 (the
part map every earlier rendering verifier used). Document under test: `docs/ARCHITECTURE.md` sha256 `357c02f28cbf1682…`
(13 025 lines) and `docs/ARCHITECTURE-RATIONALE.md` `9575f26c1df137ab…`, as handfix-b/assemble-r2 installed them at
19:40; both unchanged through this lane (re-hashed at the start and the end). Before-texts: the pre-handfix-b archive
`docs/archive/ARCHITECTURE-pre-handfix-b-2026-09-27.md` (`1a861c72…`, "A0"), the pre-repair-r1 archive (`5d752c9b…`,
"A1") and the pre-repair-r2 archive (`e9c0b828…`, "A2"). This lane edits no design file. Scratch:
`handfix/vr2/` under the session scratchpad.

## Outcome

**The rendering part's one fix is PRESENT exactly as required, and nothing else in the part changed.** Across the whole
hand-fix pass, §8, §9, §11 and §12 differ from the A0 archive by one line: the §8.2 passage-arch row, which now carries
VHM1-05's required text verbatim. The part is byte-identical in A0, A1 and A2 (sha256 `acb84a2e…` for each extracted
part), so the apply round and repair round 1 left it alone, as `apply.md` says ("rendering: none"). The block
`repair-r2-rendering.md` (REPLACE §8.2) equals the live §8.2 byte for byte, apart from the blank line before §8.3
that the applier keeps.

* **Scope of the verification.** The closing report's §2 has no issue owned by rendering, and none of its 31 required
  changes edits a rendering section (script over §2: only #7 VR3-01 and #14 V-MAB3-02 name §8.4, §8.5 or §11.1, and
  only as pointers inside texts that land in §2.5, §2.6 and §13.2). Of the verifiers' later issues, only VHM1-05
  (verify-model-r1, owner rendering) required a rendering edit (script over every handfix verify report).
* **The model fixes the part reads agree with it.** #7 (VR3-01: `Passage.headroomCm` derived, every spanning wing at
  least two floors) and #14 (VR3-02: `Wing.spans` read on the base wing by the span mark, its caster and the 3-D
  export) now match what §8.4, §8.5 (2) and §11.1 already said. The span mark's height is always positive.
* **Collateral checks hold.** There are 0 new broken references (the same 2 external citations), 0 deferral wording in
  the part's diff, item 20 held (a drawing rule removes nothing), and no new contradiction with an owner rule. The
  proposed changes, applied to copies alone and combined with the sibling verifiers' proposals, add 0 document-check
  hits (§5).
* **Two new minor issues, both owned by rendering, and neither needs an owner ruling:**
  * **VR2H-01.** Round 2 gave every building built for a slot without `houses` capacity 0. With that rule, §12.7's
    re-cut chain bound ("the band set's rows less one … plus the building's capacity less one") undercounts such a
    building's chain by one step. The same bound is stated in J-A28.83's index row and its Part A entry.
  * **VR2H-02.** VHM1-05's new clause, "none while the passage has none", has no acceptance bar (amendments-b rule
    (2)). §8.3's passage census samples only passages with a `frontBuilding`, and T8-3 checks the model state, not the
    drawing.
* The rendering repair seat's two recorded judgments (the `sealed` row left without a condition; the city-band clause
  left as it stands) are sound. The sealed-and-uncovered case follows the model's J-A30.26, which verify-model-r1
  already listed as PLAUSIBLE for Fable (§3.6).

## 1 What reached the rendering part, and how that was established

| source | rendering-owned issues | required changes that edit §8, §9, §11 or §12 | evidence |
|---|---|---|---|
| closing-report §2 (31 issues, apply round) | none (owners: determinism 12, scope 8, model 7, pipeline 3, kernel 1) | none. #7 and #14 point at §8.4, §8.5 (2) and §11.1 from texts landing in §2.5, §2.6 and §13.2 | the report's owner table; a script over every "Required change" of §2; `apply.md` ("rendering: none") |
| repair round 1 (verifiers r0: kernel, model, determinism, pipeline, scope) | none | none | the r0 reports' issue tables; the part diff A1 → A2 is empty |
| repair round 2 (verifiers r1) | VHM1-05 (verify-model-r1) | VHM1-05: §8.2's passage-arch row | a script over every handfix verify report's "Required change" paragraphs: only verify-model-r1 l. 243 names §8.2 |
| assemble-r2 | — | 1 of 14 blocks (REPLACE §8.2) | `assemble-r2.md` §3 and §5 |

The part diff was made on the four versions by `vr2/extract.py`, which takes each `## §8`, `## §9`, `## §11` and
`## §12` section whole. A0, A1 and A2 are byte-identical (`acb84a2e…`, 2 166 lines). Live differs by one line, the
row (live l. 7760).

## 2 The fix, and the rendering readers of the fixes it depends on

| fix | where (live) | verdict | the live text |
|---|---|---|---|
| VHM1-05 (verify-model-r1; repair-r2-rendering, REPLACE §8.2) | §8.2 symbolisation table, the passage-arch row, l. 7760 | **PRESENT exactly as required**, once; old text 0 times in the document | "an arch glyph on the front building's outline (`Passage.frontBuilding`; none while the passage has none, §2.6's `BaseWing.spans`) at each end of the face" |
| closing #7 VR3-01, read by the rendering part (the fix itself is model's, in §2.5) | §8.5 (2) l. 8139–8140; §8.4 l. 8055–8057; §11.1 l. 9167–9168 | consistent | §2.5 now writes `headroomCm` as "the least ground-storey height (eaveCm ÷ floors, rounded down to the centimetre) over the base wings that span it", with every spanning wing at least two floors. So §8.5 (2)'s `heightCm` ("that wing's `eaveCm` less that `headroomCm`") is at least half that wing's eave and never zero. §8.4's caster ("from its wing's `baseCm` plus the passage's `headroomCm` to that wing's eave") and §11.1's extrusions ("from the passage's `headroomCm` above that wing's base to its eave") read the same field, which is written and bounded. `Heights.eaveCm` is "above baseCm" (l. 946), so the mark's top is the eave. |
| closing #14 V-MAB3-02 (= VR3-02), read by the rendering part (the fix itself is model's, in §2.6) | §2.6 `Wing.spans` l. 987 against §8.5 (2), §8.4 and §11.1 | consistent | `Wing.spans` ends "read on the base wing by the capacity (below), §8.5's span mark (also §8.4's span caster) and the 3-D export (§11.1), and on the base or the composed wing by the plan rung". §8.5 (2) says "one per base wing that spans the passage (`BaseWing.spans`, which a composed wing inherits as `Wing.spans` …)", and §11.1 cites `BaseWing.spans`. |

**The block and its placement.** The body of `repair-r2-rendering.md` (333 lines) equals live §8.2 (l. 7633–7965),
apart from the blank separator line before §8.3 that the applier keeps. The block file ends with `=== END ===`, and
`assemble-r2` applied it once (14 of 14 blocks, no heading replaced twice). The fix is in the row it names, and in no
other place: the new text occurs once, and the retired text "an arch glyph on the front building's outline at each end
of the face" occurs 0 times (`vr2/probes.txt`). **Not MISSING, not PARTIAL (as applied), not MISAPPLIED.**

**Why the text closes VHM1-05's claim.** The row, which is the arch glyph's home, is now keyed on the same field as
every other reader of the span:
* §8.5 (2), "A building over a passage (`Passage.frontBuilding`, §2.5)";
* §8.4's span caster, which projects the span marks that exist only under that condition;
* §8.3's census row, "every passage with a `frontBuilding`" (l. 8019);
* §11.1's "each wing that spans a passage".

The pointer target holds the rule. `BaseWing.spans` (l. 959) clears `frontBuilding` inside the event that makes the
front building a trace or a tombstone, and adds "no span mark, span caster or arch glyph drawn over it". The field's own
comment in §2.5 (l. 876) sends the reader there: "cleared as §2.6's BaseWing.spans states". J-A30.26's claim, that
every reader keys on `spans` or `frontBuilding`, is now true of the row too.

## 3 Collateral checks

### 3.1 No other text changed

In the touched subsection (§8.2) and in the whole part, the only change is the row: the diff of A2 against live over
§8, §9, §11 and §12 is one changed line (`vr2/diff-a2-live.txt`), and A0 against live is the same line
(`vr2/diff-a0-live.txt`). The part's headings are unchanged (145 headings in the document, the same list in A0 and in
live).

### 3.2 Single source

The drawing rule for an uncovered passage is now stated in two places that agree and cite each other:
* the rendering home, §8.2's row, which is the rule, keyed on the field;
* the model's consequence clause in `BaseWing.spans`, which the row's pointer names.

This is the arrangement VHM1-05 asked for: the rendering home states the condition the model section declares. It is
not a new divergent copy.

Nothing else in the part restates the uncovered case:
* the paint-program list (l. 7784–7786) names the program, not the condition;
* the `sealed` states row (l. 7875) is an override laid over the glyph;
* §8.3's catalogue (l. 7973) points to "§8.2's rows";
* the census row is scoped to passages with a `frontBuilding`.

This lane re-ran the repair seat's sweep of every arch-glyph text: a grep over both files for "arch glyph", "an arch",
"arch, §8.3" and "arch-glyph" (`vr2/arch-sweep.txt`). It finds:
* the repair seat's seven texts;
* §16's pricing mentions of "the arch-glyph rows" (l. 11360, 11374, 11406) and J-A16.01's Part A (rationale l. 466);
* J-A30.84's Part A (l. 450), the original covered-case record that J-A30.26 (l. 518) amends.

No other text needs the condition. §0.2 row 30 and §2.4's note point to §8.3 for the glyph. Those pointers are
pre-existing (A0) and are not touched by this pass.

### 3.3 References

`refs.py` on live: 139 heading keys, 35 D ids, 472 J ids, **2 broken**. The two are the pre-existing external citations
`os-geometry.md` §2.1.4 (l. 2709) and RFC 7946 §3.1.6 (l. 9196). The row's own pointers all resolve:
* §2.5, §2.6's `BaseWing.spans` (l. 959) and §8.5 (2);
* J-A30.84 (index l. 12913) and J-A30.87 (index l. 12966).

### 3.4 Deferral wording

The part's probes (TBD, to be decided / determined, open question, deferred to, decide later, later pass / round, TODO,
FIXME, left open, revisit, "later", "deferr", "pending") give the same counts in A0 and in live. The changed row has 0
hits. The pre-existing hits are ordinary prose: "the passage left open beneath" (§11.1), "pending tiles", "a pending
confirmation", "no later casing" and the like (`vr2/probes.txt`).

### 3.5 Owner rules

* **Item 20.** A rendering rule removes nothing: no dossier element and no dossier-roster household is taken off the
  map by the row or by any text of the part. The part's other texts that touch dossier content (§12.6's post-build
  placement budget, §11.3's bridge, §11.4's host inputs) are unchanged, and they agree with the pass's dossier rules:
  * §11.3's convergence test counts only accepted events, and an `undo` of a dossier event is now refused, F-EDIT
    (closing #25);
  * the re-provision of a dossier household's housing is a post-build placement by the `dossier` request, priced
    generically by §12.6's row, with its stored-plan re-cuts at §12.7's per-step rate.
* **Item 30 (c), (g).** A covered passage still draws its arch glyph at each end. An uncovered one is, in J-A30.25's
  own words, "an alley, not a passage", so drawing no arch over it keeps item 30 (c)'s meaning. A hidden court's
  legibility bar (§8.3's hidden-courts row) is untouched.
* **Item 23 (emulation first).** No reference draws a passage, so there is nothing to match.

### 3.6 The rendering repair seat's recorded judgments

**JUDGMENT 1** left the `sealed` states row without a condition of its own, and it is sound. That row "lays its changes
over" the resolved programs, so over an undrawn glyph it changes nothing, and §8.3's states census still resolves.

The one consequence worth recording, and not a defect of the rendering part, is this. A sealed passage whose front
building is then cleared draws its floor in `road` with no closed arch, while its plots keep exposure `sealed`. That
state is the model's J-A30.26: the passage stays "open above — its face, its `sealed` bit and its plots' access
unchanged". The rendering draws what that state has, since a bricked arch has no building left to stand in.
verify-model-r1 listed J-A30.26 under PLAUSIBLE for the Fable review. This lane re-flags the combination in its queue
row and does not re-file it.

**JUDGMENT 2** kept the city-band clause, and it is sound. The row's `bands` column (district, neighbourhood) never
reaches the city band. At the city band an uncovered passage has no span mark (§8.5 (2)) and no mass over the cleared
trace (§8.2's `cleared` row).

### 3.7 The sibling round-2 verifiers

None of verify-kernel-r2 (VKH2-01), verify-model-r2 (VHM2-01 … 04), verify-pipeline-r2 (VPH2-01, 02) or
verify-determinism-r2 (VDH2-01, 02) files an issue on §8, §9, §11, §12 or a rendering judgment call. Their proposed
copies change no line this lane's proposals touch (§5's combined copy).

## 4 Issues

| id | owner | severity · kind | where | defect |
|---|---|---|---|---|
| VR2H-01 | rendering | minor · stale (a stated bound, after round 2's capacity-0 rule) | §12.7 plan row (l. 9863–9864); J-A28.83 index row (l. 12918) and Part A (rationale l. 455) | the re-cut chain bound "rows less one plus the capacity less one" gives one step too few for a building of capacity 0 |
| VR2H-02 | rendering | minor · missing bar (amendments-b rule (2)) | §8.3's draw-style census (after l. 8019) | no bar checks that an uncovered passage draws no arch glyph and no span mark, which is VHM1-05's new clause and §2.6's |

Every old string below occurs exactly once in its file. This was asserted by `vr2/proposals.py`, which applies all
four sub-changes to copies.

### VR2H-01 — §12.7's chain bound undercounts a capacity-0 building (minor · rendering)

**Claim.** Round 2 wrote into §2.6's capacity bullet (l. 1480, VPH1-02): "A building S11 builds for a slot without
`houses` (§10.2, §4.7) has capacity 0". Every stable, barn, chapel and non-residential outbuilding is such a building.
Each still has a plan rung, and its plot's occupants' band can move. §2.6's canonical chain (l. 1513–1517) derives the
plan "first the ROWS, one band at a time from the built row toward r", then the households.

A capacity-0 building houses no household (§4.7's S11 write; the model and pipeline r2 verifiers read the chain's
"[1, capacity]" clamp as concerning housing shells alone). So its chain has up to the band set's rows less one row
steps (five by default) and no household step.

§12.7 states the chain's length as "at most the band set's rows less one (five: the default set has six rows, §2.6)
plus the building's capacity less one (§2.6)". For capacity 0 that is 5 + (0 − 1) = 4, one step fewer than the chain
takes. The bound is stated "known before the first open". J-A28.83's index row ("its steps at most the band set's rows
less one plus the capacity less one") and its Part A entry ("plus the building's capacity less one, §2.6's canonical
chain") carry the same arithmetic.

Before round 2 no text gave a building capacity 0 (A0, A1 and A2 have 0 hits of "has capacity 0"; live has 2), so the
bound was correct when verify-rendering-r3 checked it. CONFIRMED on the text: the three statements and the
capacity-0 counts come from a script over both files and the three archives (`vr2/bound-statements.txt`).

**Required change.** Each quoted string is given on one line, exactly as it stands.
1. §12.7, the plan row: replace "plus the building's capacity less one (§2.6)" with "plus the building's capacity less one (none for a building of capacity 0, which houses no household; §2.6)".
2. J-A28.83's index row: replace "its steps at most the band set's rows less one plus the capacity less one)" with "its steps at most the band set's rows less one plus the capacity less one, none at capacity 0)".
3. J-A28.83's Part A entry (a restated-row swap; the index row is as in (2)): replace "plus the building's capacity less one, §2.6's canonical chain)" with "plus the building's capacity less one, none for a building of capacity 0, which houses no household, §2.6's canonical chain)".

No new ruling is needed: this corrects the arithmetic of an existing call.

### VR2H-02 — no bar for the uncovered passage's drawing (minor · rendering)

**Claim.** VHM1-05 put into §8.2's passage-arch row the rule that the arch glyph is drawn "on the front building's
outline (`Passage.frontBuilding`; none while the passage has none, §2.6's `BaseWing.spans`)". §2.6 (l. 959) states the
same consequence for the span mark and its caster: "no span mark, span caster or arch glyph drawn over it".
Amendments-b's rule (2) asks every rule to land with "the test or acceptance bar that proves it", and nothing proves
this one:
* §8.3's passage census (l. 8019) samples "every passage with a `frontBuilding`" on generated B-CITY-lite seeds, where
  S11 covers every passage;
* T8-3 (§13.2) checks the model state only: "a front building made a footprint trace or demolished leaves its passage
  with no `frontBuilding` and no base wing spanning it, the undo restoring both";
* no text in §13 mentions an arch glyph or a span mark (grep).

So the implementer error VHM1-05 was filed to prevent, a glyph drawn on the cleared trace's outline, passes every bar.
CONFIRMED on the text.

**Required change.** §8.3's draw-style census: after the row that begins "| passages (item 30; §8.5 (2)): B-CITY-lite seeds whose hidden share is > 0, every passage with a `frontBuilding` |", insert the row:

```text
| passages left uncovered (item 30; §8.2's row; §2.6's `BaseWing.spans`): B-CITY-lite seeds whose hidden share is > 0, every front building over a passage cleared by hand (`clear`), then each clear undone | ink | while a passage has no `frontBuilding`, no span mark over it in any band's mark table and no arch glyph at any band, its floor in `road` at the district band; after the undos every tile pixel-identical to the render before the clears |
```

The row is one line, given above in a fence so it is copied verbatim. Checking the mark tables covers the caster too,
since §8.4's span caster is the span mark itself read at the finer bands. No new ruling is needed.

## 5 Receipts: references and document checks

**Copies.** All built on the scratchpad; the design files were never written.
* "untouched" is the live document (`357c02f2…`).
* "mine" is live plus this lane's four sub-changes, made by `vr2/proposals.py` with each anchor asserted once
  (`44df8d22…`; rationale `4c5f7c5f…`).
* "combined" is mine plus the round-2 sibling verifiers' proposed copies (`5fb1c018…`; rationale `8b9e6e6e…`):
  * verify-model-r2's 7 hunks;
  * verify-determinism-r2's 3;
  * verify-pipeline-r2's 1 (its other two equal the model's VHM2-01 texts);
  * the rationale hunks of verify-model-r2 and verify-kernel-r2.
  
  Kernel's line-1267 hunk was left out, because it rewrites the same line as model's. No sibling hunk touches a line
  this lane changes.

**References** (`refs.py`): live, mine and combined each give 139 heading keys, 35 D ids, 472 J ids and **2 broken**.
The two are the same pre-existing external citations, `os-geometry.md` §2.1.4 and RFC 7946 §3.1.6. The inserted census
row has the table's three cells.

**Document checks.** The command was `doc_checks.py --sections "8,12,Judgment calls"`. The six runs were launched
together at 20:57:54 and ended at 21:01:02. The untouched copy ran once more after them, ending at 21:03:34. Every run
read 9 626 JSON files, 911 940 C3 3-grams, 478 C4 lists and 10 099 colour files, so the corpus held still.

| run | copy | allow file | C1 | C2 | C3 | C4 | S1 | S2 | unreviewed | exit |
|---|---|---|---|---|---|---|---|---|---|---|
| untouched, run 1 | live | default | 5 | 0 | 179 | 0 | 0 | 0 | 0 | 0 |
| mine | live + VR2H-01, VR2H-02 | default | 5 | 0 | 179 | 0 | 0 | 0 | 0 | 0 |
| combined | mine + siblings' proposals | default | 5 | 0 | 179 | 0 | 0 | 0 | 0 | 0 |
| untouched | live | empty | 5 | 0 | 179 | 0 | 0 | 0 | 184 | 1 (raw hits) |
| mine | as above | empty | 5 | 0 | 179 | 0 | 0 | 0 | 184 | 1 (raw hits) |
| combined | as above | empty | 5 | 0 | 179 | 0 | 0 | 0 | 184 | 1 (raw hits) |
| untouched, run 2 (after) | live | default | 5 | 0 | 179 | 0 | 0 | 0 | 0 | 0 |

**Raw hits, compared by (check, text) with the location dropped:**
* mine against untouched: 0 added, 0 removed;
* combined against untouched: 0 added, 0 removed.

**The rationale**, whole (`--heads` the matching document, empty allow file; not gated). Untouched, mine and combined
each give C3 403, C4 6 and S2 17. The 17 are the pre-existing unresolved pointers `apply.md` recorded. Raw hits are 426
in each copy, with 0 added and 0 removed.

## 6 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed or read on disk in this lane):
* the hashes of the live files, which did not change through the lane, and of the three archives;
* the part diffs: A0 = A1 = A2 over §8, §9, §11 and §12, and live = A2 plus one row;
* the block body equal to live §8.2;
* the new row text once and the retired text 0 times;
* the scripts over closing §2 and over every handfix verify report that fix the scope of this lane;
* `refs.py` on live, mine and combined, with 2 broken each, both pre-existing and external;
* the deferral probes, A0 against live;
* the arch-glyph sweep over both files;
* the bound statements, and "has capacity 0" counted in all four versions;
* the proposals applied to copies with each anchor once, and the new row's cell count;
* the document checks in §5.

**PLAUSIBLE** (reasoning, for the Fable review):
* That a capacity-0 building's plan re-cut crosses band rows without household steps (VR2H-01). This follows from §2.6's
  canonical chain and the sibling verifiers' reading of its clamp for housing shells, and no code exists to run it.
* That the census row of VR2H-02 is the right home for the bar, rather than a clause in scope's T8-3.
* That §12.6's generic "post-build placement" row prices the re-provision of a dossier household's housing (§3.5).
* The judgment that the sealed-and-uncovered passage, which draws no seal, is the model's J-A30.26 to settle and not a
  rendering defect (§3.6).

## Files

* `docs/validation/amendments-b/handfix/verify-rendering-r2.md`: this report.
* `docs/FABLE-REVIEW-QUEUE.md`: one row appended (B-handfix-b/verify-rendering-r2).
* `docs/lane-events.log`: the STARTED and LANDED lines.
* The scratch receipts are in `handfix/vr2/` under the session scratchpad:
  * `extract.py`, `part-*.md` and `diff-*.txt`;
  * `probes.txt`, `arch-sweep.txt` and `bound-statements.txt`;
  * `proposals.py`, `doc-*.md`, `rat-*.md` and `refs-*.json`;
  * `dc*.sh`, `dc-*.txt` and `dcr-*.txt`.
* This lane edited no design file.
