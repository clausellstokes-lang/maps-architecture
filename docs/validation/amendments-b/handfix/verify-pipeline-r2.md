# handfix-b/verify-pipeline-r2 — verification of the PIPELINE part's fixes after repair round 2

> PENDING FABLE REVIEW — Opus-produced (handfix-b/verify-pipeline-r2).

PROGRESS (kill-safe ledger; a seat that continues this lane reads it first)
ITEM inputs: planned closing-report §2 (#1, #2, #21; #18 (i) edits §10.2) and §3, apply.md, verify-pipeline-r1, repair-r2-pipeline.md + its report whole (the other five r2 files for collisions), assemble-r2.md, archives A0/A1/A2, live hashes | done (doc 357c02f2… / rationale 9575f26c…, unchanged through the lane)
ITEM diff: planned per-section diff of the pipeline part (§4, §10, PART II, PART III) A2→live and A0→live, word diff; block bodies against live | done (A2→live: §4.7 and §10.2, one line each, plus the J-A28.46 row pair and P1 in §2.5; A0→live: 22 word hunks, each a required text)
ITEM per-fix: planned PRESENT / PARTIAL / MISSING / MISAPPLIED for closing #1, #2, #18 (i), #21; r1 VPH-01..03; r2 VPH1-01 (1)–(5) and hand-off P1 | done (all PRESENT once; 49 probes, 48 OK, the 49th too broad and cleared by reading)
ITEM checks: planned other text unchanged; single source; refs; deferral; item 20; lifecycle of `BuildingSlot.unhoused` | done (refs 0 new; deferral 0; item 20 held; 2 minor issues)
ITEM issues: planned exact required changes, applied on scratch copies, anchors once, doc checks three copies | done (VPH2-01 model = VHM2-01, VPH2-02 scope; 4 sub-changes, anchors once, new texts once; refs 0 new; doc checks 672 = 672 hits, exit 0, untouched run three times identical)
ITEM close-out: planned queue row, LANDED line | done (row B-handfix-b/verify-pipeline-r2 appended; LANDED line written)

Lane `handfix-b/verify-pipeline-r2`, 2026-09-27, opus verifier. Judged: `docs/ARCHITECTURE.md` sha256 `357c02f2…`
(13 025 lines) and `docs/ARCHITECTURE-RATIONALE.md` sha256 `9575f26c…` (2 053 lines), as handfix-b/assemble-r2 installed
them; both hashes were checked at the start and at the end. The befores are A0
`docs/archive/ARCHITECTURE-pre-handfix-b-2026-09-27.md` (`1a861c72…`, before the hand fix), A1
`…-pre-handfix-b-repair-r1-2026-09-27.md` (`5d752c9b…`) and A2 `…-pre-handfix-b-repair-r2-2026-09-27.md` (`e9c0b828…`,
before round 2), with their rationale twins. The pipeline part is `## §4`, `## §10`, `# PART II` with its sections and
`# PART III`. This seat edited no design file. Line numbers are the live document's.

## Outcome

* **Every pipeline fix is PRESENT, once, at its place.** That covers the closing hand fixes #1 (1)–(4), #2 (1)–(3),
  #18 (i) and #21 (1)–(2); round 1's VPH-01 (1)–(3), VPH-02 (1)–(2) and VPH-03 (1)–(2); and round 2's VPH1-01 (1)–(5)
  with the hand-off P1 (`BuildingSlot.unhoused`, §2.5, l. 879). Where a later round superseded an earlier text in place
  (#1 (1) → VPH-02 (1) → VPH1-01 (2); VPH-01 (1) → VPH1-01 (3); #21 (1) → VPH-03 (1)), the later round required it.
  Every retired text is gone.
* **Round 2 differs from its filed wording exactly where the repair seat recorded it.** Refinements (a) the main slot,
  required or not; (b) "a residential plot" in the index row's vacant clause; (c) the stored field; and the Fable
  continuation's institution widening and recorded overflow-pass ruling. I judged each sound (§1, §4). None is PARTIAL
  or MISAPPLIED.
* **No other text of the part changed.** A2→live changes §4.7 (l. 4680) and §10.2 (l. 8914) by one line each, and each
  live section equals the round-2 block body byte for byte; the J-A28.46 index row and Part A entry equal the block's
  rows; P1 is the only change in §2.5. A0→live gives 22 word hunks in §4.7, §10.2, §10.3 and II.6, each a required text.
* **Checks.** 0 new broken references, 0 deferral hits, no single-source break, and item 20 holds. Round 2 in fact
  closes an item-20 path the filed text left: a non-required main slot of a dossier-backed live-in workplace could have
  been dropped with the building its use stands in.
* **2 minor issues** (§3), each with an exact change applied on scratch copies (anchors once, new texts once, refs 0
  new; document checks in §5):
  * **VPH2-01 (model; concurs with verify-model-r2's VHM2-01).** The new persisted attribute `BuildingSlot.unhoused`
    is neither given an edit kind nor declared derived in §7.1, against §2.8's registry rule. The repair seat's reason
    ("`frontage` is not listed there either") is wrong on the live text: §7.1's buildings row declares `frontage`
    derived.
  * **VPH2-02 (scope).** No bar makes the round-2 rule occur. T19-4's clauses pass vacuously where no workplace lacks a
    household, and none checks that a non-required main slot is kept or that the typing is recorded and reported —
    amendments-b rule (2)'s missing bar.

## 1 The fixes, one by one

`presence2.py` (whitespace-normalised counts on the live files; each filed text also checked verbatim in its source
file) gives every applied text once and every retired or superseded text 0 times.

| fix | sub | where (live line) | verdict | the live text |
|---|---|---|---|---|
| #1 VP3-04 | (1) | §10.2 `structures` (l. 8914) | PRESENT, superseded in place by VPH-02 (1) and then VPH1-01 (2), as each required | "required: boolean; houses: boolean /* item 28 (f): a residential slot — its building houses households by §4.7's generation fill; …" |
| #1 | (2) | §4.7 *Households per building* (l. 4675–4676) | PRESENT, once | "per residential slot (a structure with `houses`, §10.2) of the plot's designation template row at least one household" |
| #1 | (3) | §4.7 (l. 4679) | PRESENT, once | "never below its structure's least `count` where the structure is `required`; a residential plot whose required residential slots the demand cannot all fill is typed vacant by S10b's reconcile (above), its households placed on the next candidate" |
| #1 | (4) | §4.7 (l. 4681) | PRESENT, once | "writes each residential building's `Building.households` (a building S11 builds for a slot with `houses`; every other building's list is empty) … clamped into [1, capacity], a locked or pinned household kept before the clamp drops any (§7.2; §2.6's capacity rule)" |
| #2 VP3-01 | (1) | §4.7 (l. 4688) | PRESENT, once | "— except a household of a dossier's roster (the dossier's population, §7.7 item 2), which is never taken off the manifest: its housing is re-provided inside its district (item 20 (e); J-A20.72) by S10b's `dossier` request … a hand edit's among its dry-run fates (§7.3 item 4)." |
| #2 | (2) | J-A28.46 index row (l. 12976) | PRESENT, once | "else an F-SITING item — never a household of a dossier's roster, whose housing S10b's `dossier` request re-provides inside the district (the post-build least-disruption order, its closest option where none passes), S11's operator building a residential slot there;" |
| #2 | (3) | J-A28.46 Part A (rat l. 513) | PRESENT, once | "— VP2-07 — and never a household of a dossier's roster, whose housing the `dossier` request re-provides inside the district, over dropping it or widening the search to the town … closing ruling on VP3-01, VD3-01 and VD3-02)" |
| #18 V-MAB3-04 | (i) | §10.2 `RoomProgramRow` (l. 8994) | PRESENT, once | "basementAccess: 'core'\|'trapdoor' /* … read at the plot's builtBand — never external, which only a walk-out's fall derives; the plan rung reads Basement.access */" |
| #21 VP3-05 | (1) | II.6 (l. 11947) | PRESENT, superseded in place by VPH-03 (1), as required | (see VPH-03 (1)) |
| #21 | (2) | J-A11.43 Part A (rat l. 510) | PRESENT, once | "A block's `Frontage` record split at the same ends follows §6.3's rule, the part holding its first kerb edge keeping the address, so identity has one rule (verify-r3: VP3-05, VP3-06, VD3-10)." |
| VPH-01 | (1) | J-A28.46 index row (l. 12976) | PRESENT, amended in place by VPH1-01 (3) | (see VPH1-01 (3)) |
| VPH-01 | (2), (3) | J-A28.46 Part A (rat l. 513) | PRESENT, once each | "a residential slot being a structure with `houses` (§10.2), a slot the demand cannot fill dropped …"; "(§4.7; items 28 (f) and 16; the slot rule added for VP2-01, and typed by `houses`, bounded by the required structures and kept to residential buildings for VP3-04)" |
| VPH-02 | (1) | §10.2 `houses` comment (l. 8914) | PRESENT, amended in place by VPH1-01 (2) | (see VPH1-01 (2)) |
| VPH-02 | ruling | J-A28.46 Part A | PRESENT, amended by VPH1-01 (4) | (see VPH1-01 (4)) |
| VPH-02 | (2) | §10.3 *Uses that move* (l. 9094) | PRESENT, once | "when the destination's designation template has a residential slot (a structure with `houses`, §10.2; §4.7 S11)" |
| VPH-03 | (1) | II.6 (l. 11947) | PRESENT, once (round 1's recorded wording) | "split wherever one spans a stretch end, all in the one step that splits the tunnel … and each re-pointed (`Frontage.way`) to the part it fronts; an `undo` restores the one tunnel record and each split `Frontage`'s one record (§7.4; J-A11.43)." |
| VPH-03 | (2) | J-A11.43 index row (l. 12973) | PRESENT, once | "a block `Frontage` spanning an end split there with the part holding its first kerb edge keeping the address (amended by verify-pipeline-r2; verify-r3 VP3-05, VD3-10)" |
| VPH1-01 | (1) | §4.7 (l. 4680) | PRESENT, once, refined as recorded ((a), (c), institution widening) | "never an empty residential building; a residential slot on a workplace's or an institution's plot that is its main slot (a live-in class's among them) or within a `required` structure's least `count`, and that no household of its band or drift can fill, is neither dropped nor typed vacant — the workplace or institution and its use stand — and S11 builds it as a slot without `houses`, housing none, `Building.dwelling` absent, reported; its `BuildingSlot.unhoused` (§2.5) records that typing, written by every run of this fill and cleared by the designation mutator (above)." |
| VPH1-01 | (2) | §10.2 `houses` comment (l. 8914) | PRESENT, once, the filed text plus a pointer | "main slot is one whatever this cell holds (its flag read as true), unless §4.7's fill finds it no household (BuildingSlot.unhoused, §2.5) — its building houses the live-in household …" |
| VPH1-01 | (3) | J-A28.46 index row (l. 12976) | PRESENT, once, refined ((b), (c)) | "a live-in class's main slot one wherever a household fills it, §10.2; … a residential plot whose required residential slots it cannot all fill typed vacant, its households placed on the next candidate; a workplace's or an institution's main or required residential slot it cannot fill kept and built without `houses`, housing none, `BuildingSlot.unhoused` recording it)" |
| VPH1-01 | (4) | J-A28.46 Part A (rat l. 513) | PRESENT, once, exactly as filed | "A live-in class's main slot that a household fills is residential whatever its `houses` cell holds" |
| VPH1-01 | (5) | J-A28.46 Part A (rat l. 513) | PRESENT, once, refined ((a), (c), institution widening, overflow-pass ruling) | "A residential slot on a workplace's or an institution's plot that is its main slot or within a `required` structure's least `count` … is kept and built as a slot without `houses`, housing none and reported, with `BuildingSlot.unhoused` recording that typing until the fill runs again or a designation mutation re-derives the slot, over dropping it, typing the plot vacant or standing an empty residential building … and over letting S11's overflow pass let such a slot … (§4.7, §2.5; verify-pipeline-r1 VPH1-01; repair-pipeline-r2)." |
| P1 (hand-off) | — | §2.5 `BuildingSlot` (l. 879) | PRESENT, once, inside §2.5, equal to the block file's preamble line | "persisted with the slot */; unhoused?: true /* item 28 (f): present only on a residential slot of a workplace's or an institution's plot — its main slot or one within a required structure's least count — … cleared by the designation mutator (§4.7), whose undo restores it with the former parts */ }" |

**Retired and superseded texts: 0 each** (normalised). They are the filed #1 (1) and #21 (1), the filed VPH-01 (1),
VPH-02 (1) and VPH-03 (1), round 1's live texts that round 2 replaced ("(its flag read as true) — its building …", the
index row's "a live-in class's main slot always one" and "; a plot whose required residential slots", Part A's "A
live-in class's main slot is residential whatever"), the §4.7 sentence end "never an empty residential building. S11,",
the filed VPH1-01 (1) and (5) (refined, so 0 as filed), P1's old string, and r1's list ("dwelling slot", "keyed as
the tunnel's parts are", "both keyed by §6.3's rule", and the rest). One probe, `'core'|'trapdoor'|'external'`, counts 1:
it is §2.6's `Basement.access` (l. 1019), which rightly keeps `external`; the retired §10.2 column is gone.

**The companions round 2 depends on, read in place.** VPH1-02 (model) is present: "A building S11 builds for a slot
without `houses` (§10.2, §4.7) has capacity 0 — the slot's typing, like the template row, a fact of what the shell was
built as, never of its occupants." (l. 1480), and its table list names "a structure's `houses` cell, the class's
`liveIn`" (l. 1487). `Building.dwelling`'s clearing clause (l. 965), §5.2's F-SITING row (l. 5636), §7.3 items 1 and 4
(l. 6697, 6890), §7.4's round-2 re-provision sentence (l. 7051) and T28-18's round-2 dossier fixtures (l. 10407) all
agree with #2's re-provision and with the unhoused typing.

## 2 Checks on the touched subsections and those that cite them

**Read whole:** §4.7 (l. 4363–4694) and §10.2 (l. 8885–9033), through the round-2 block file, whose two REPLACE bodies
`blockeq.py` proves equal to the live sections; §2.5 (l. 826–942); §10.3 (l. 9034–9098); §7.6 (l. 7229–7311); the
J-A28.46, J-A28.23 and J-A11.43 index rows and Part A entries in A0, A2 and live. **Read for the cross-checks:** §2.6's
`Building` record (l. 961–975), capacity bullet and never-omit bullet (l. 1471–1499) and re-cut bullet; §2.8's registry
paragraph (l. 1782–1795); §4.11's rung 1, epoch steps (c)–(f) and the regrowth-first order; §5.2's F-SITING, F-PLAN and
F-EDIT rows; §5.3's capacity row; §6.2's leaf digest; §7.1's blocks/plots and buildings rows (l. 6590–6591); §7.3 items
1 and 4 and its stored-plan row; §7.4's regenerate, assign, setField rows and the round-2 Application sentence; §7.7
item 2; §13.2 T18-1 – T18-4, T19-4, T28-18; §16's M2b row; II.6 and PART III for housing references; the owner's items
20 and 28 (f) (`docs/AMENDMENTS-2026-09-25b.md` l. 155–181, 303–327) and `docs/OWNER-INSTRUCTIONS-2026-09-25.md`.

* **No other text changed** (CONFIRMED). `secdiff.py` over the four versions: A2→live changes, in the pipeline part,
  §4.7 and §10.2 only; `linediff.py` finds one replaced line in each (l. 4680, l. 8914), section lengths unchanged
  (332, 149). `worddiff.py` gives one hunk each, the round-2 texts. A0→live gives 11 hunks in §4.7, 4 in §10.2, 2 in
  §10.3 and 5 in II.6 (`wd-A0-L-pipe.txt`), every one a word of a required or recorded text. The rationale changes from
  A2 in five entries; J-A28.46's diff is exactly VPH1-01 (4) and (5).
* **Single source** (CONFIRMED by reading). The unhoused rule has one home, §4.7's *Households per building*; §2.5
  defines the field with its writer and clearer, as the document's field comments do; §10.2's `houses` comment points to
  it for the live-in case; §2.6's capacity-0 sentence (the model's) points to §10.2 and §4.7; J-A28.46 records the call.
  No text states the rule a second way.
* **References** (CONFIRMED). `refs.py` on the live document: 139 headings, 35 D ids, 472 J ids, 2 broken — the
  pre-existing external citations `os-geometry.md` §2.1.4 (l. 2709) and RFC 7946 §3.1.6 (l. 9196); A2 gives the same
  2. Every pointer the round-2 texts add resolves: §2.5, §2.6, §4.7, §10.2, §13.2 T19-4, and "(above)" for S10b's
  reconcile and the designation mutator, both earlier in §4.7.
* **Deferral wording** (CONFIRMED). The five round-2 lines (doc l. 879, 4680, 8914, 12976; rationale l. 513) and the
  whole pipeline part in A2 and live: 0 hits for TBD, to be decided or determined, deferred, defer, open question,
  later pass or round, TODO, FIXME, left open, decide later, for now, future work, revisit, not yet decided.
* **Owner rules, item 20** (CONFIRMED by reading). No round-2 text removes a dossier element or a dossier-roster
  household. The unhoused typing keeps the workplace or institution and its use standing and removes no household; a
  dossier roster's overflow household is still re-provided by #2; and refinement (a) closes a path the filed VPH1-01
  text left, since nothing in §10.2 makes a main structure `required` (probe: no "main slot … required" rule exists),
  so a non-required main slot of a dossier-backed live-in workplace would have been dropped with the building its use
  stands in. Item 28 (f)'s ladder, item 18's mutation and item 23's emulation default are untouched.
* **Lifecycle of the new state `BuildingSlot.unhoused`** (CONFIRMED by reading, except the registry).
  * *Create:* every run of the generation fill writes it, including every re-derivation that re-runs S10b and S11 —
    Regenerate (keep settings) with the same result, New random, `Adjust`, a brush's re-derivation past τ, a §7.6
    slice re-derivation — and §13.2's T18-4 "S11 run as a mutation from the empty design reproduces generation" keeps
    the generation path and the mutator path one.
  * *Read:* S11's write (the building houses none), §2.6's capacity (0), T19-4; `relet` and the re-homing receivers see
    capacity 0.
  * *Persist:* with the slot in `Plot.sitePlan.slots`, inside the plot's leaf digest (§6.2: attributes in schema order).
  * *Clear and undo:* the designation mutator clears it; its undo (§4.7 item 5, T18-3) and a regenerate's undo (the
    scope's entities from the undo record, §7.4) restore it; a brush undo re-runs the fill on the prior field.
  * *Migrate:* optional, absent meaning the template's typing — every older document's meaning.
  * *Registry:* missing — VPH2-01.
  * *Epochs:* no epoch re-runs the fill on a survivor, so the flag holds until a mutation adapts the building. That is
    consistent: an unhoused building was built without dwelling rooms, and `relet` cannot let rooms a shell lacks.

## 3 Issues

| id | owner | severity · kind | where | claim in one line |
|---|---|---|---|---|
| VPH2-01 (= verify-model-r2 VHM2-01) | model | minor · missing (registry) | §7.1 buildings row; §2.8 registry paragraph | the new persisted attribute `BuildingSlot.unhoused` has no edit kind and is not declared derived, so §13.2's path test does not reach it |
| VPH2-02 | scope | minor · missing (bar, amendments-b rule (2)) | §13.2 T19-4 | no fixture makes the round-2 unhoused typing occur, and no clause checks that a non-required main slot is kept or that the typing is recorded and reported |

Old strings are quoted once in their file (checked on the live text, a single space matching one soft line break);
each new text is absent before and occurs once after (`proposed2.py`, scratch copies only).

### VPH2-01 — `BuildingSlot.unhoused` is not registered (model · minor; concurs with VHM2-01)

**Claim** (CONFIRMED on the text). §2.8's registry paragraph (l. 1782–1795) requires that "every new attribute has its
edit kind or is declared derived (§7.1)", and amendments-b rule (3) that "§7's edit kinds cover any new state". Round 2's
P1 added `BuildingSlot.unhoused` (l. 879), a persisted attribute written by the fill and cleared by the mutator. `unhoused`
occurs only in §2.5, §4.7, §10.2 and the J-A28.46 row, never in §7.1 or §2.8. The repair seat ruled "no registration"
because "the item-19 field `frontage` is not listed there either" (repair-pipeline-r2-report §2); that premise is false on
the live text, and in A0 and A2 alike: §7.1's buildings row (l. 6591) declares "each slot's `frontage` (§2.5's
`BuildingSlot`: from the designation template, re-derived by S11's mutator)" derived, beside `spans`, `nextEntrance` and
the others. The closing seat applied the same rule to `Passage.headroomCm` (VR3-01 (2)). verify-model-r2 filed the same
defect as VHM2-01 (owner model, the field being a §2.5 record's); this seat's required change is VHM2-01's text word for
word, so the two merge without reconciling.

**Required change.**
1. §7.1, the buildings row: replace "§2.6) and each slot's `frontage` (§2.5's `BuildingSlot`: from the designation
   template, re-derived by S11's mutator)" with "§2.6), each slot's `frontage` (§2.5's `BuildingSlot`: from the
   designation template, re-derived by S11's mutator) and each slot's `unhoused` (§2.5's `BuildingSlot`: written by
   every run of §4.7's generation fill, cleared by the designation mutator)".
2. §2.8, the registry paragraph: replace "sub-records and its base wings' `spans` (§2.6), the plot's `builtBand`" with
   "sub-records and its base wings' `spans` (§2.6), a site-plan slot's `unhoused` (§2.5), the plot's `builtBand`".

### VPH2-02 — no bar exercises the unhoused typing (scope · minor)

**Claim** (the gap CONFIRMED on the text; that a generated fixture rarely meets the case is PLAUSIBLE). Round 2 made a
rule and a stored state: a workplace's or an institution's main slot — required or not — or a slot within a `required`
structure's least `count`, that no household of its band or drift can fill, is kept, not typed vacant, built without
`houses` with `BuildingSlot.unhoused` set (capacity 0 by §2.6), housing none, `Building.dwelling` absent, and reported
(§4.7, l. 4680). Amendments-b rule (2) asks that every rule land with "the test or acceptance bar that proves it", and
the closing seat added one for the last new derived field (VR3-01's T30-4 clause). T19-4 is the only bar on the fill:
* "every building S11 builds for a slot without `houses` (§10.2) houses none" holds vacuously wherever no workplace
  lacks a household. Its pointer (§10.2) reaches the flag only for a live-in main slot; a `houses` slot typed unhoused
  is read "as one without" by §2.5's comment alone.
* "no plot's site plan holds a `required` structure below its least `count`" covers the required case. Nothing checks
  refinement (a) — a non-required main slot kept, its use standing — or that the typing is recorded and reported.
* Whether a generated map meets the case depends on the household shares and the block allocation, so a bar that
  proves the rule needs a fixture, as T19-4's own dossier clause has one. T18-3 and T18-4 cover the flag's mutation
  and undo generically once a fixture holds it.

The new clause is part of T19-4 but not its dossier clause, so it gates M2b with the rest (§16's M2b row: "T19-4 but
its dossier clause"; M2b builds "the generation fill (§4.7; J-A28.46)"). §16 needs no change.

**Required change** (§13.2 T19-4, two replacements in one sentence):
1. Replace "every building S11 builds for a slot without `houses` (§10.2) houses none," with "every building S11 builds
   for a slot without `houses` (§10.2; `BuildingSlot.unhoused`, §2.5) houses none,".
2. Replace "is housed or reported unplaced by F-SITING (§4.7, J-A28.46); on a dossier fixture" with "is housed or
   reported unplaced by F-SITING (§4.7, J-A28.46); on a fixture whose district holds a live-in workshop and no household
   of its band or drift, the workshop's plot keeps its use and its main slot, which S11 builds without `houses` —
   `BuildingSlot.unhoused` set (§2.5), capacity 0 (§2.6), housing none, `Building.dwelling` absent — the typing
   reported (§4.7); on a dossier fixture".

## 4 Considered and ruled not defects

* **Refinement (a), the main slot required or not.** Sound: §10.2's `structures` has a per-structure `required` flag and
  no rule makes a main structure required, so the filed text would have dropped a non-required live-in main slot and
  the building its use stands in.
* **Refinement (b), "a residential plot" in the index row.** Sound: it states the vacant rule as §4.7 does, and the
  workplace case follows it.
* **Refinement (c), the stored field.** Necessary, as the Fable continuation argued: after generation an unhoused
  building and a vacated shop-house are the same stored state without it, and §2.6's capacity is "a property of the
  shell alone". Its home (`BuildingSlot`, reached by `Building.slot`) matches `frontage`. Only its registration is
  missing (VPH2-01).
* **The institution widening.** Sound, and dormant where no institution row carries a `houses` structure. The fill's
  opening words "S10b places a residential plot's households — per residential slot …" must be read broadly (every plot
  whose template row has a residential slot): §10.2 glosses every `houses` slot as one whose "building houses households
  by §4.7's generation fill", and the index row says "per residential slot". Read narrowly, no `houses` slot on a
  workplace's or an institution's plot other than a live-in main slot could ever be filled at generation, which that
  gloss excludes; the vacant clause keeps its narrow sense only because the new clause excepts those plots.
* **The overflow-pass ruling** (an unhoused slot is not let by S11's overflow pass). A recorded, vetoable call with its
  reasons; it contradicts no text: the pass re-places "over the district's residential buildings that house fewer
  households than their capacity", which excludes capacity 0, and a dossier roster's overflow household is still
  re-provided by #2. The shell has no dwelling rooms, so a later mutation, not a `relet`, gives it one.
* **§10.2's "unless" covers only the live-in main slot.** Consistent: the `houses` cell's first clause ("its building
  houses households by §4.7's generation fill") takes §4.7's exception with it; the "unless" is needed only because
  the live-in clause says "whatever this cell holds". VPH2-02 (1) gives T19-4 the direct pointer.
* **J-A28.46's index row: "main or required residential slot" and the where column `§4.7, §10.2`.** An index row's
  compression of §4.7's "within a `required` structure's least `count`", read with the row's own "never below a
  `required` structure's least `count`". The where column omits §2.5 by the repair seat's recorded choice (a pointer
  digit run the document checks flag); the row names the field.
* **The writer and clearer stated in §2.5 and §4.7.** The document's field comments carry their writer and clearer
  (`frontBuilding`, `spans`, `headroomCm`); the two statements agree and point to each other.
* **The canonical chain's "[1, capacity]" beside capacity 0.** A capacity-0 building houses none (§4.7's S11 write), so
  the clamp glosses concern housing shells; verify-pipeline-r1 and verify-model-r2 ruled the same.

## 5 Receipts

| check | live (untouched) | my proposed copy | combined (mine + verify-model-r2's VHM2-02 … VHM2-04) | note |
|---|---|---|---|---|
| `presence2.py` (normalised probes) | 49 probes: 48 OK; every applied text once, every retired text 0 | — | — | the one "FAIL" is a probe too broad (§2.6 `Basement.access`, l. 1019), read and cleared |
| `blockeq.py` | §4.7 and §10.2 equal the round-2 REPLACE bodies; the J-ROWS and RATIONALE-A rows occur once, at l. 12976 and rat l. 513; P1 once, l. 879 | — | — | |
| `proposed2.py` / `combined2.py` | — | 4 of 4 anchors once (none across a break), 4 of 4 new texts absent before and once after, "ALL OK" | VHM2-02 … VHM2-04 applied on top, anchors once, "ALL OK" | scratch copies `doc-proposed2.md`, `doc-combined2.md` |
| `doc_checks.py --sections "2,3,7,13,Judgment calls"`, default allow | exit 0 · C1 5, C2 0, C3 664, C4 3, S1 0, S2 0, 0 unreviewed — run three times (20:29, 20:32, 20:38), identical output | exit 0 · identical counts, 0 unreviewed | exit 0 · identical counts, 0 unreviewed | every run: 9 626 JSON files, 911 940 C3 3-grams, 478 C4 lists |
| the same keys, empty allow file (every hit listed) | 672 hits | 672, identical after normalising line numbers | 672, identical | **0 new hits**; no allow row needed |
| `refs.py` | 139 headings, 35 D ids, 472 J ids, 2 broken (pre-existing external: `os-geometry.md` §2.1.4, RFC 7946 §3.1.6); A2 the same | the same 2 | the same 2 | 0 new |
| `deferral.py` | 0 hits on the round-2 lines and in the whole pipeline part (A2 and live) | — | — | |
| hashes | `357c02f2…` / `9575f26c…` at the start and at the end | — | — | the design files untouched |

A first proposed copy worded VPH2-02 (2)'s end "— and reports (§4.7)"; it was reworded to "— the typing reported
(§4.7)" (the subject was ambiguous), and the second batch of runs above is on the reworded copies; the first batch gave
the same result (672 = 672, exit 0). During the lane a `pkill -f "doc_checks.py --doc"` stopped this seat's own
sequential first attempt; a search of every scratchpad under `/private/tmp/claude-502` found no other seat's
doc-check output written at that time, so no other lane's run was affected.

Scratch files are under the session scratchpad's `handfix/vp2/`: `secs.py`, `secdiff.py`, `linediff.py`, `worddiff.py`,
`rowdiff.py` (diffs; outputs `wd-A2-L-pipe.txt`, `wd-A2-L-other.txt`, `wd-A0-L-pipe.txt`), `blockeq.py`,
`presence2.py` (`presence2.out`), `deferral.py`, `proposed.py` / `proposed2.py`, `combined.py` / `combined2.py`,
`hitdiff.py`, `dc.sh` / `dc2.sh` with `dc-*.txt`, `dc-times.txt`, `dc-exits.txt`, and `refs-*.json` / `refs-*.txt`.

## 6 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed or read on disk): the hashes; every fix present once at its place and every retired text gone;
the pipeline part's diff (only the required hunks; the block bodies byte-identical to the live sections); 0 new broken
references; 0 deferral hits; single source; item 20 held by the round-2 texts; both issues' text claims (the missing
registration, with §7.1's `frontage` declaration read in place in A0, A2 and live; T19-4's clauses as quoted); my four
sub-changes: anchors once, new texts once, 0 new doc-check hits on three copies against one corpus snapshot.

**PLAUSIBLE** (reasoning, vetoable): the soundness of refinements (a)–(c), the institution widening and the recorded
overflow-pass ruling; the broad reading of the fill's opening words; that a generated map rarely meets the unhoused case
without a fixture; that my wordings leave no new defect — a later seat applies them and verifies.
