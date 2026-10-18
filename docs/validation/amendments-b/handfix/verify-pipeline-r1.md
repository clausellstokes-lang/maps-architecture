# handfix-b/verify-pipeline-r1 — verification of the PIPELINE part's fixes after repair round 1

> PENDING FABLE REVIEW — Opus-produced (handfix-b/verify-pipeline-r1).

PROGRESS (kill-safe ledger; a seat that continues this lane reads it first)
ITEM inputs: planned closing-report §2 (#1, #2, #21; #18 (i) edits §10.2) and §3, apply.md, verify-pipeline-r0, repair-r1-pipeline.md + report, assemble-r1.md, archives, live hashes | done (doc e9c0b828… / rationale dcabf14b…, unchanged through the lane)
ITEM diff: planned per-section diff of the pipeline part (§4, §10, PART II, PART III) against both archives, word diff | done (A0→live: §4.7, §10.2, §10.3, II.6 only; A1→live: §10.2, §10.3, II.6, one line each; every hunk a required text)
ITEM per-fix: planned PRESENT / PARTIAL / MISSING / MISAPPLIED for #1 (1)–(4), #2 (1)–(3), #18 (i), #21 (1)–(2), VPH-01 (1)–(3), VPH-02 (1)–(2), VPH-03 (1)–(2) | done (all present once; 3 recorded refinements judged sound; retired texts gone)
ITEM checks: planned other text unchanged; single source; refs; deferral; item 20; lifecycle of the new `houses` state | done (refs 0 new, deferral 0, item 20 held; 2 new-problem issues)
ITEM issues: planned exact required changes, applied on scratch copies, anchors once, doc checks three copies | done (VPH1-01 pipeline, VPH1-02 model; 8 sub-changes applied, 0 new doc-check hits)
ITEM close-out: planned queue row, LANDED line | done

Lane `handfix-b/verify-pipeline-r1`, 2026-09-27, opus verifier. Judged: `docs/ARCHITECTURE.md` sha256 `e9c0b828…`
(13 021 lines) and `docs/ARCHITECTURE-RATIONALE.md` sha256 `dcabf14b…` (2 053 lines), as handfix-b/assemble-r1 installed
them; both hashes were checked at the start and at the end of the lane. The befores are
`docs/archive/ARCHITECTURE-pre-handfix-b-2026-09-27.md` (A0, `1a861c72…`, before the hand fix) and
`docs/archive/ARCHITECTURE-pre-handfix-b-repair-r1-2026-09-27.md` (A1, `5d752c9b…`, before repair round 1), with their
rationale twins. The pipeline part is `## §4`, `## §10`, `# PART II` with its sections, and `# PART III`. This seat
edited no design file. Line numbers are the live document's.

## Outcome

* **Every pipeline fix is PRESENT, once, at its place.** That covers the hand fixes #1 (1)–(4) VP3-04, #2 (1)–(3)
  VP3-01, #18 (i) V-MAB3-04 (a model fix that edits §10.2) and #21 (1)–(2) VP3-05, and the round-1 repairs VPH-01
  (1)–(3), VPH-02 (1)–(2) and VPH-03 (1)–(2). Two of the hand fixes, #1 (1) and #21 (1), were superseded in place by
  VPH-02 (1) and VPH-03 (1), as those repairs required. Every retired text is gone (script, whitespace-normalised).
* **Three texts differ from their filed wording, as the repair seat recorded.** They are VPH-02 (1)'s "(its flag read as
  true)", VPH-03 (1)'s "split wherever one spans a stretch end, all in the one step" plus its undo naming both records,
  and VPH-01 (1)'s index clause "a live-in class's main slot always one". I judged each one sound (§4). None is PARTIAL
  or MISAPPLIED.
* **No other text of the part changed.** From A1 to live, only §10.2, §10.3 and II.6 differ, each by one line. From A0 to
  live, only §4.7, §10.2, §10.3 and II.6 differ, and every word hunk belongs to a required text. The companions
  VPH-04 (§2.6), VPH-05 (1) (T19-4), VSH-01 (T11-1) and VDH-05 (§6.3) are in place and agree with the pipeline texts.
* **Checks.** There are 0 new broken references, 0 deferral hits and no single-source break. Item 20 holds: no fix
  removes a dossier element or a dossier-roster household. The document checks exit 0.
* **2 minor issues, both new problems that trace the lifecycle of #1's `houses` state** (§3). Each comes with an exact
  change, applied on scratch copies: each anchor once, each new text once, refs 0 new, doc checks +0.
  * **VPH1-01 (pipeline).** A required residential slot on a workplace's plot — a live-in class's main slot, which
    VPH-02 makes residential whatever the cell says — has no outcome when no household can fill it.
  * **VPH1-02 (model).** A change that leaves a housing building no residential slot re-homes nobody, because the
    capacity function never reads `houses`.

## 1 The fixes, one by one

| fix | sub | where (live line) | verdict | the live text |
|---|---|---|---|---|
| #1 VP3-04 | (1) | §10.2 `DesignationTemplateRow.structures` (l. 8910) | PRESENT, then superseded in place by VPH-02 (1), as required | "required: boolean; houses: boolean /* item 28 (f): a residential slot — its building houses households by §4.7's generation fill; a live-in class's (BuildingClassRow.liveIn) main slot is one …" |
| #1 | (2) | §4.7 *Households per building* (l. 4671–4672) | PRESENT, once | "per residential slot (a structure with `houses`, §10.2) of the plot's designation template row at least one household" |
| #1 | (3) | §4.7 (l. 4674–4675) | PRESENT, once | "never below its structure's least `count` where the structure is `required`; a residential plot whose required residential slots the demand cannot all fill is typed vacant by S10b's reconcile (above), its households placed on the next candidate" |
| #1 | (4) | §4.7 (l. 4677) | PRESENT, once | "writes each residential building's `Building.households` (a building S11 builds for a slot with `houses`; every other building's list is empty) … clamped into [1, capacity], a locked or pinned household kept before the clamp drops any (§7.2; §2.6's capacity rule)" |
| #2 VP3-01 | (1) | §4.7 (l. 4683–4684) | PRESENT, once | "— except a household of a dossier's roster (the dossier's population, §7.7 item 2), which is never taken off the manifest: its housing is re-provided inside its district (item 20 (e); J-A20.72) by S10b's `dossier` request … a hand edit's among its dry-run fates (§7.3 item 4)." |
| #2 | (2) | J-A28.46 index row (l. 12972) | PRESENT, once | "else an F-SITING item — never a household of a dossier's roster, whose housing S10b's `dossier` request re-provides inside the district (the post-build least-disruption order, its closest option where none passes), S11's operator building a residential slot there;" |
| #2 | (3) | J-A28.46 Part A (rat l. 513) | PRESENT, once | "reported — VP2-07 — and never a household of a dossier's roster, whose housing the `dossier` request re-provides inside the district, over dropping it or widening the search to the town … closing ruling on VP3-01, VD3-01 and VD3-02)" |
| #18 V-MAB3-04 | (i) | §10.2 `RoomProgramRow` (l. 8990) | PRESENT, once | "basementAccess: 'core'\|'trapdoor' /* … read at the plot's builtBand — never external, which only a walk-out's fall derives; the plan rung reads Basement.access */" |
| #21 VP3-05 | (1) | II.6 (l. 11943) | PRESENT, then superseded in place by VPH-03 (1), as required | (see VPH-03 (1)) |
| #21 | (2) | J-A11.43 Part A (rat l. 510) | PRESENT, once | "A block's `Frontage` record split at the same ends follows §6.3's rule, the part holding its first kerb edge keeping the address, so identity has one rule (verify-r3: VP3-05, VP3-06, VD3-10)." |
| VPH-01 | (1) | J-A28.46 index row (l. 12972) | PRESENT, once, refined (VPH-02's clause added; where column `§4.7, §10.2`) | "(a structure with `houses`, a live-in class's main slot always one, §10.2; a slot the demand cannot fill dropped from the site plan, its ground a yard, never below a `required` structure's least `count`; a plot whose required residential slots it cannot all fill typed vacant, its households placed on the next candidate), S11 writes each residential building's `Building.households` clamped to §2.6's capacity on the wings it made, a locked or pinned household kept and every other building's list empty;" |
| VPH-01 | (2) | J-A28.46 Part A (rat l. 513) | PRESENT, once, exactly | "a residential slot being a structure with `houses` (§10.2), a slot the demand cannot fill dropped … but never below a `required` structure's least `count`, … writing each residential building's `Building.households` (every other building's list empty) clamped into [1, capacity] … a locked or pinned household kept before the clamp drops any" |
| VPH-01 | (3) | J-A28.46 Part A | PRESENT, once, exactly | "(§4.7; items 28 (f) and 16; the slot rule added for VP2-01, and typed by `houses`, bounded by the required structures and kept to residential buildings for VP3-04)" |
| VPH-02 | (1) | §10.2 `structures` (l. 8910) | PRESENT, once, refined ("(its flag read as true)") | "a live-in class's (BuildingClassRow.liveIn) main slot is one whatever this cell holds (its flag read as true) — its building houses the live-in household, Building.dwelling (§4.7 S10b) — so the two columns never disagree */" |
| VPH-02 | ruling | J-A28.46 Part A (closing sentence) | PRESENT, once (the seat's recorded vetoable call) | "A live-in class's main slot is residential whatever its `houses` cell holds (`BuildingClassRow.liveIn` governing, the flag read as true), over letting the two columns disagree or refusing an `editTable` that leaves the cell false (§7.6), because …" |
| VPH-02 | (2) | §10.3 *Uses that move* (l. 9090) | PRESENT, once, exactly | "when the destination's designation template has a residential slot (a structure with `houses`, §10.2; §4.7 S11)" |
| VPH-03 | (1) | II.6 (l. 11943) | PRESENT, once, refined (grammar; the undo names both records) | "split wherever one spans a stretch end, all in the one step that splits the tunnel (a record spanning both ends of an interior stretch in three parts) — each part beyond an end a new record, … every part keyed by §6.3's rule for a split `Frontage` — and each re-pointed (`Frontage.way`) to the part it fronts; an `undo` restores the one tunnel record and each split `Frontage`'s one record (§7.4; J-A11.43)." |
| VPH-03 | (2) | J-A11.43 index row (l. 12969) | PRESENT, once, exactly | "and the chambers, access points and block frontages re-pointed, a block `Frontage` spanning an end split there with the part holding its first kerb edge keeping the address (amended by verify-pipeline-r2; verify-r3 VP3-05, VD3-10)" |

**Retired texts: 0 each** (whitespace-normalised). They are "a live-in workplace's main slot is one */", "a plot none of
whose slots it fills typed vacant" (document and rationale), "none of whose slots it can fill", "dwelling slot"
(document and rationale), "basementAccess: 'core'|'trapdoor'|'external'", "keyed as the tunnel's parts are", "both
keyed by §6.3's rule", "an `undo` restores the one record (§7.4; J-A11.43)", the index's "S11 writes
`Building.households` clamped to §2.6's capacity", and Part A's "writing `Building.households` clamped into [1,
capacity]". The string `'core'|'trapdoor'|'external'` itself still occurs once. That is §2.6's `Basement.access`
(l. 1019), which rightly keeps `external`.

**Companions read in place.** Each agrees with the pipeline texts:

* VPH-04 is present in §2.6: l. 965 reads "… for a residential building and empty for every other", and l. 1479 reads
  "writes each residential building's `Building.households`".
* VPH-05 (1) is present in T19-4 (l. 10329).
* VSH-01 is present in T11-1 (l. 10296): "each part beyond an end a new record … one spanning both ends of an interior
  stretch split in three … its undo restores the one tunnel record and each split `Frontage`'s one record".
* VDH-05 is present in §6.3 (l. 6201): "every other part — two where the record spans a whole interior stretch — takes
  an address".
* VDH-04 is present in §7.3 item 4 (l. 6886), which lists the re-provision's builds, displacements and joins. So #2 (1)'s
  pointer "a hand edit's among its dry-run fates (§7.3 item 4)" now resolves to a list that holds them.

## 2 Checks on the touched subsections and those that cite them

**Read whole:** §4.7 (l. 4359–4690), §10.2 (l. 8881–9029), §10.3 (l. 9030–9094), II.6 (l. 11832–11970), and the J-A28.46
and J-A11.43 index rows and Part A entries in all three versions.

**Read for the cross-checks:**

* §2.5 `Frontage` (l. 855) and `BuildingSlot` (l. 878).
* §2.6: the `Building` record (l. 962–974); the capacity function, its change rule and the never-omit bullet
  (l. 1468–1497); and the canonical chain (l. 1511–1512).
* §4.2 S2 (l. 3498–3531), §4.7 S10a / S10b.
* §5.3's capacity row (l. 5665), §6.3 JOIN and SPLIT (l. 6188–6203), §7.1 (VD3-06's pointer), §7.3 items 1 and 4,
  §7.4's editTable row, and §7.6's tables and slice invalidation (l. 7245–7300).
* §13.2 T11-1, T19-4 and T28-18, and §0.2 row 28.
* The `Household` record (l. 1585) and J-A28.23's Part A.
* The owner's item 20 and item 28 (f) (`docs/AMENDMENTS-2026-09-25b.md` l. 155–181 and 303–324).

**Findings:**

* **No other text changed.** `secdiff.py` splits the three versions by heading. The pipeline part changes only in
  §4.7 (A0→A1), §10.2 (both rounds), §10.3 (round 1) and II.6 (both rounds). `worddiff.py` gives 2, 2 and 7 hunks
  from A1 to live, and 10, 4, 2 and 5 hunks from A0 to live, each a word of a required or recorded text. `linediff.py`
  finds one changed line per section in round 1, with section line counts unchanged. The A0→A1 line changes are
  apply.md's soft-break joins.
* **Single source.** The `liveIn` precedence has one home, §10.2's comment. §4.7, §10.3 and T19-4 cite "a structure with
  `houses`, §10.2". J-A28.46's index row and Part A record the call, and they do not state it a second time as a rule.
  II.6's split identity points to §6.3, and §6.3, II.6, T11-1 and J-A11.43 agree word for word on the part that keeps
  the address, three parts for an interior stretch, and the undo. #2 (1)'s least-disruption gloss is unchanged; r0
  ruled on it.
* **References.** `refs.py` on the live document gives 139 headings, 35 D ids, 472 J ids and 2 flags. Both flags are the
  pre-existing external citations, `os-geometry.md` §2.1.4 and RFC 7946 §3.1.6, and A1 has the same 2. That is 0 new.
  Every id in the new pipeline texts resolves: §4.7 S10b, §10.2, §10.3, §7.6, §3.4, §6.3, §7.4, J-A11.43 and MFP-7.
* **Deferral wording.** The 28 changed pipeline lines (document and Part A) were probed for TBD, to be decided or
  determined, deferred, open question, later pass or round, TODO, FIXME, left open, decide later, for now, future work
  and revisit. The probe found 0 hits.
* **Owner rules (item 20).** No pipeline text adds a path by which an epoch, an edit or a solver rung removes a dossier
  element or a dossier-roster household:
  * VPH-02 keeps a live-in household in its workplace, where before the overflow could move it away.
  * §10.3 keeps a live-in household that cannot follow its use "in the vacated building as an ordinary household".
  * II.6 touches only tunnel and frontage records.
  * #2's re-provision still covers every overflow, the table-edit path of VPH1-02 included.

  VPH1-01's case is the one place where the text leaves open whether a workplace plot might be typed vacant, which
  could drop a dossier-backed use. The required change closes it by keeping the use.
* **Lifecycle of the new state** (the `houses` cell, S11's empty list, `liveIn` governing). The lifecycle is traced
  through create (S11's write), re-derive (§7.6's slice invalidation, S11's operator), hand edit (F-EDIT, §7.3 fates,
  §7.4 undo) and relocation (§10.3). Two gaps were found: VPH1-01 and VPH1-02 (§3).

## 3 Issues

| id | owner | severity · kind | where | claim in one line |
|---|---|---|---|---|
| VPH1-01 | pipeline | minor · new-problem | §4.7 *Households per building*; §10.2 `houses`; J-A28.46 | a required residential slot on a workplace's plot (a live-in main slot, residential after VPH-02) that no household can fill has no outcome |
| VPH1-02 | model | minor · missing (lifecycle) | §2.6 capacity function and change rule; J-A28.23 | a change that leaves a housing building no residential slot lowers no capacity, so its households get no re-homing, fate, refusal or undo |

### VPH1-01 — pipeline · minor · new-problem (#1 (1), (3) with VPH-02 (1))

**Claim.** The text is CONFIRMED; reachability is PLAUSIBLE.

* **The main slot is always residential.** VPH-02 (1) makes a live-in class's main slot residential "whatever this cell
  holds", and #1 (3) never drops a slot below a `required` structure's least `count`.
* **The vacant rule does not reach a workplace's plot.** Only "a residential plot" is typed vacant when its required
  residential slots go unfilled. §4.7 S10b's "households take residential plots of their band ± drift" makes that a
  plot households take, not a workplace's plot.
* **So one case has no outcome.** A live-in workplace's main slot that no household of its band or drift can fill (the
  `Household` record, l. 1585, has no workplace link, and S2 demands households by band, not per workplace) is neither
  dropped nor typed vacant. S11 would then build a residential building with no household. §4.7 ("surplus capacity,
  never an empty residential building"), J-A28.46's Part A and T19-4 ("every residential building houses at least one
  household") forbid that.
* **The other reading drops a use.** Reading "residential plot" widely instead types the workplace's plot vacant, which
  drops a use, and a dossier-backed one against item 20 (b).
* **The same gap holds more widely.** It applies to any `required` structure with `houses` on a workplace's plot.
* **The repair seat's considered item does not close it.** It said "It cannot happen: the *Live-in* bullet sites the
  live-in household at its workplace first", which assumes that a household of the band is left.

**Required change.** Old strings are quoted once in their file, and a single space may match one soft line break.

1. §4.7 *Households per building*. Replace "its households placed on the next candidate — surplus capacity, never an
   empty residential building." with "its households placed on the next candidate — surplus capacity, never an empty
   residential building; a required residential slot on a workplace's plot (a live-in class's main slot among them)
   that no household of its band or drift can fill is neither dropped nor typed vacant — the workplace and its use
   stand — and S11 builds it as a slot without `houses`, housing none, `Building.dwelling` absent, reported."
2. §10.2 `DesignationTemplateRow.structures`, the `houses` comment. Replace "main slot is one whatever this cell holds
   (its flag read as true)" with "main slot is one whatever this cell holds (its flag read as true), unless §4.7's fill
   finds it no household".
3. J-A28.46's index row. Replace "a live-in class's main slot always one" with "a live-in class's main slot one wherever
   a household fills it".
4. J-A28.46's Part A entry. Replace "A live-in class's main slot is residential whatever its `houses` cell holds" with
   "A live-in class's main slot that a household fills is residential whatever its `houses` cell holds".
5. The same entry. Replace "(§10.2, §10.3; MFP-7; handfix VPH-02)." with "(§10.2, §10.3; MFP-7; handfix VPH-02). A
   required residential slot on a workplace's plot that no household of its band or drift can fill — a live-in main
   slot among them — is built as a slot without `houses`, housing none and reported, over typing the workplace's plot
   vacant or standing an empty residential building, because a use is never dropped for want of a household and the
   fill leaves no residential building empty (§4.7; verify-pipeline-r1 VPH1-01)."

A restated-row swap carries (3) through (5) (J-ROWS and RATIONALE-A of J-A28.46). T19-4 needs no change: its "every
building S11 builds for a slot without `houses` (§10.2) houses none" covers the new case, and "every residential
building houses at least one household" stays exact. Apply with VPH1-02, in either order.

### VPH1-02 — model · minor · missing, lifecycle (#1 (4) and VPH-02 against §2.6's capacity rule)

**Claim.** The text gap is CONFIRMED; the paths are PLAUSIBLE.

* **Only a lowered capacity triggers re-homing.** #1 (4) makes S11 write an empty `Building.households` for every
  building it builds for a slot without `houses`. But §2.6's capacity function reads the template's `households.max`,
  the programme row and the wings, never `houses` or `liveIn`. Its change rule re-homes only "the households past the
  capacity" after "a committed change that lowers a building's capacity below its `households` count".
* **Some changes leave a housing building no residential slot but lower no capacity.** Such a change:
  * a §7.6 edit of a structure's `houses` cell;
  * an edit of a class's `liveIn`, which VPH-02 made govern the main slot;
  * a designation mutation that converts a residential slot's building to a role without `houses` inside a template
    whose `households.max` stays above 0.
* **Its households are then lost in the gaps.** S11's re-derivation writes the list empty, but no rule gives those
  households:
  * a re-homing event;
  * a dry-run fate (§7.3 item 4 lists "the households §2.6's capacity rule re-homes");
  * the F-EDIT refusal of a hand edit;
  * or an undo record (§7.4's editTable row restores "the households its capacity re-homing moved").
* **A hand table edit can then drop a roster household.** Through §4.7's generation text, such an edit can send a
  household of no dossier's roster to F-SITING's last rung. That is against closing ruling §3.1 ("the F-EDIT refusal
  (hand edit)") and J-A28.23's "a user's edit must never delete population the dossier or the roster supplied".
  §5.3's capacity row does not catch the state either, because the building's capacity still admits the households.

**Required change** (§2.6 and J-A28.23; old strings quoted once, a single space may match one soft line break):

1. §2.6, the capacity function. Replace "occupants; basement storeys excluded." with "occupants; basement storeys
   excluded. A building S11 builds for a slot without `houses` (§10.2, §4.7) has capacity 0."
2. §2.6, the change rule's table list. Replace "(the designation template's `households.max`, the `circulation` share
   or" with "(the designation template's `households.max` or a structure's `houses` cell, the class's `liveIn`, the
   `circulation` share or".
3. J-A28.23's Part A entry. Replace "(verify-model-r3 V-MAB3-01 with VD3-11 and VP3-07). |" with "(verify-model-r3
   V-MAB3-01 with VD3-11 and VP3-07). A building built for a slot without `houses` has capacity 0, over a shell-only
   capacity that such a building never uses, so every change that leaves a building no residential slot — a `houses`
   or `liveIn` table edit, a designation mutation — re-homes its households by this rule, with its fates, its F-EDIT
   refusal and its undo (verify-pipeline-r1 VPH1-02). |"

**What (1) settles without further edits.** Every reader that says "lowers a building's capacity below its households"
or "any change §2.6's capacity rule lists" now reads the new case through unchanged. That covers:

* §4.7's overflow trigger;
* §5.3's capacity row, which now also catches a non-residential building that houses a household;
* §7.1, §7.3 items 1 and 4, and §7.4's rows;
* §5.2's F-EDIT refusal;
* T28-18's clause.

It also means a hand `relet` into a workshop is refused.

**The clamp glosses.** The "[1, capacity]" clamp glosses concern the buildings that house households. Capacity 0 is
already the value for every class whose template's `households.max` is 0, so this change does not alter them in kind.
Apply with VPH1-01, whose sub-change (1) builds its case "as a slot without `houses`".

## 4 Considered and ruled not defects

* **VPH-02 (1)'s "(its flag read as true)".** It keeps §4.7's, §10.3's and T19-4's gloss "a structure with `houses`"
  exact for a live-in main slot whose cell is false. Sound; no change beyond VPH1-01 (2).
* **VPH-03 (1)'s grammar and its undo clause.** "Split wherever one spans a stretch end" keeps the original construction
  with its plural subject. "An `undo` restores the one tunnel record and each split `Frontage`'s one record" matches
  T11-1 and §6.3. Sound.
* **"Each part beyond an end a new record" (II.6, T11-1) against §6.3's "every other part".** Read in the centreline's
  order these are the same set: the part holding the first kerb edge lies before every end it spans. No change.
* **The J-A28.46 precedence ruling (`liveIn` governs the cell).** It is recorded and vetoable, and it is not reopened.
  VPH1-01 only adds the case where no household fills the slot.
* **§10.3's "otherwise" branch after VPH-02.** The seat's reading holds: it is reached after a `liveIn` edit or for a
  non-live-in class. No change.
* **Pre-existing and untouched.** The following is outside this round's texts and not reopened: the canonical chain's
  "[1, capacity]" for a building of capacity 0 (already the case for a class whose template's `households.max` is 0).
  The same goes for the other items r0 considered (the re-provision's distances, "that plot's designation template" at a
  closest option, and the kerb cut point).

## 5 Receipts

| check | live (untouched) | my proposed copy (= combined; no other writer) | note |
|---|---|---|---|
| `presence.py` (normalised probes) | 33 probes: every present text once, every retired text 0 | — | the one "FAIL" was a probe too broad (§2.6 `Basement.access`), read and cleared |
| `proposed.py` | — | 8 of 8 anchors once (1 across a soft break), 8 of 8 new texts once, "ALL OK" | scratch copies `doc-proposed.md`, `rat-proposed.md` |
| `doc_checks.py --sections "2.6,4.7,10.2,10.3,II.6,Judgment calls"` | exit 0 · C1 5, C2 0, C3 334, C4 2, S1 0, S2 0, 0 unreviewed (run before and after: identical, 911 940 3-grams) | exit 0 · identical counts, 0 unreviewed | 0 new hits |
| `doc_checks.py --sections "2,4,10,PART II,Judgment calls"` | exit 0 · C3 639, C4 4, 0 unreviewed | exit 0 · identical | 0 new hits |
| `refs.py` | 2 broken (pre-existing external), J ids 472 | 2 broken (the same), J ids 472 | 0 new |
| hashes | `e9c0b828…` / `dcabf14b…` at start and at end | — | the design files untouched |

The scratch files are under the session scratchpad's `handfix/vp1/`:

* the diff scripts `secdiff.py`, `worddiff.py` and `linediff.py`, with the outputs `wd-A1-L.txt` and `wd-A0-L.txt`;
* `presence.py`, `deferral.py` and `proposed.py`;
* the resolver outputs `refs-live.*`, `refs-a1.*` and `refs-mine.*`;
* the check outputs `dc-live1.txt`, `dc-live2.txt`, `dc-mine.txt`, `dc-top-live.txt` and `dc-top-mine.txt`.

## 6 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed or read on disk):

* the hashes;
* every fix present once and every retired text gone;
* the part diff (only the required hunks);
* 0 new broken references and 0 deferral hits;
* each issue's text claim;
* my 8 sub-changes: anchors once, new texts once, and 0 new doc-check hits.

**PLAUSIBLE:**

* the reachability of both issues, which needs a district with no household of a live-in workplace's band or drift,
  or a `houses` or `liveIn` table edit;
* the soundness of the three recorded refinements;
* that my proposed wordings leave no new defect. A later seat applies and verifies them.
