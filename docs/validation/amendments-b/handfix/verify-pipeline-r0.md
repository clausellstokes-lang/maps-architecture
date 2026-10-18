# handfix-b/verify-pipeline-r0 — verification of the PIPELINE part's hand fixes

> PENDING FABLE REVIEW — Opus-produced (handfix-b/verify-pipeline-r0).

PROGRESS (kill-safe ledger; a seat that continues this lane reads it first)
ITEM inputs: planned closing-report §2 (#1, #2, #21, #18 (i)) and §3, apply.md, archive, live hashes | done (doc 5d752c9b… / rationale 61477508…)
ITEM diff: planned per-section diff of the pipeline part (§4, §10, PART II, PART III) archive vs live | done (only §4.7, §10.2, II.6 changed; 16 word hunks, all required)
ITEM per-fix: planned PRESENT / PARTIAL / MISSING / MISAPPLIED for each sub-change, quoted | done (10 of 10 PRESENT once; old texts gone)
ITEM checks: planned no other text changed; single source; references; deferral wording; owner rules (item 20) | done (refs 0 new; 0 deferral; item 20 held; doc checks exit 0)
ITEM issues: planned the issue list with exact required changes | done (5 minor: pipeline 3, model 1, scope 1; 2 more concur with VDH-04 / VDH-05, not returned twice)
ITEM close-out: planned queue row, LANDED line | done

Lane `handfix-b/verify-pipeline-r0`, 2026-09-27, opus verifier. Judged: `docs/ARCHITECTURE.md` sha256 `5d752c9b…`
(13 021 lines) and `docs/ARCHITECTURE-RATIONALE.md` sha256 `61477508…` (2 052 lines), the after-hashes of
`handfix/apply.md`; the before is `docs/archive/ARCHITECTURE-pre-handfix-b-2026-09-27.md` (`1a861c72…`) and its rationale
twin (`8a24a5a7…`). The pipeline part is `## §4`, `## §10`, `# PART II` with its `## II.` sections, and `# PART III`.
This seat edits no design file. Line numbers are the live document's.

## Outcome

* **Every pipeline fix is PRESENT, exactly once, at the place the closing report named.** That is 10 of 10
  sub-changes: #1 (1)–(4) VP3-04, #2 (1)–(3) VP3-01, #21 (1)–(2) VP3-05, and #18 (i) V-MAB3-04, the model fix that edits
  §10.2. Each retired old text is gone (script, whitespace-normalised). None is PARTIAL, MISSING or MISAPPLIED.
* **No other text of the part changed.** Only §4.7, §10.2 and II.6 differ from the archive, and a word diff finds 16
  hunks, all inside the required texts. Every other section of §4, §10, PART II and PART III is byte-identical.
* **Item 20 holds.** The fixes add no path by which an epoch, an edit or a solver rung removes a dossier element or a
  dossier-roster household. §4.7 now re-provides the housing of such a household, and the clamp keeps locked and
  pinned households. There are no new broken references and no deferral wording, and the document checks exit 0.
* **5 minor issues**, each with an exact change (§3). Three are pipeline-owned: the J-A28.46 records are stale after
  #1; the `houses` flag has two unreconciled companions (`liveIn`, and §10.3's "dwelling slot"); and II.6's
  `Frontage` split is worded for two parts where three are common. One is model-owned (§2.6's two glosses of S11's
  write) and one is scope-owned (T19-4 has no bar for #1's rules, and T11-1 has the two-part wording).
* **Two more findings concur with the determinism verifier and are not returned twice.** These are §7.3 items 1 and 4
  for the re-provision's displacements and joins (= VDH-04), and §6.3's "the other takes" (= VDH-05). My VPH-03
  and VPH-05 are written to apply with VDH-05.

## 1 The fixes, one by one

| # | sub | where (live line) | verdict | the live text |
|---|---|---|---|---|
| 1 VP3-04 | (1) | §10.2 `DesignationTemplateRow.structures` (l. 8911) | PRESENT, once | "required: boolean; houses: boolean /* item 28 (f): a residential slot — its building houses households by §4.7's generation fill; a live-in workplace's main slot is one */ }[]" |
| 1 | (2) | §4.7 *Households per building* (l. 4672–4673) | PRESENT, once | "per residential slot (a structure with `houses`, §10.2) of the plot's designation template row at least one household" |
| 1 | (3) | §4.7 (l. 4675–4676) | PRESENT, once | "its ground typed as yard, never below its structure's least `count` where the structure is `required`; a residential plot whose required residential slots the demand cannot all fill is typed vacant by S10b's reconcile (above), its households placed on the next candidate" |
| 1 | (4) | §4.7 (l. 4678) | PRESENT, once | "writes each residential building's `Building.households` (a building S11 builds for a slot with `houses`; every other building's list is empty) … clamped into [1, capacity], a locked or pinned household kept before the clamp drops any (§7.2; §2.6's capacity rule)" |
| 2 VP3-01 | (1) | §4.7 (l. 4684–4685) | PRESENT, once | "— except a household of a dossier's roster (the dossier's population, §7.7 item 2), which is never taken off the manifest: its housing is re-provided inside its district (item 20 (e); J-A20.72) by S10b's `dossier` request … and S11's operator builds there a residential slot … in the same derivation or causing event — each such build and displacement reported, a hand edit's among its dry-run fates (§7.3 item 4)." |
| 2 | (2) | J-A28.46 index row (l. 12973) | PRESENT, once, in the row | "else an F-SITING item — never a household of a dossier's roster, whose housing S10b's `dossier` request re-provides inside the district (the post-build least-disruption order, its closest option where none passes), S11's operator building a residential slot there;" |
| 2 | (3) | J-A28.46 Part A (rat l. 513) | PRESENT, once, in the entry | "reported — VP2-07 — and never a household of a dossier's roster, whose housing the `dossier` request re-provides inside the district, over dropping it or widening the search to the town, … (J-A20.42); closing ruling on VP3-01, VD3-01 and VD3-02)" |
| 18 V-MAB3-04 | (i) | §10.2 `RoomProgramRow` (l. 8991) | PRESENT, once | "basementAccess: 'core'\|'trapdoor' /* … read at the plot's builtBand — never external, which only a walk-out's fall derives; the plan rung reads Basement.access */" |
| 21 VP3-05 | (1) | II.6 (l. 11944) | PRESENT, once | "split where one spans an end — the part beyond the end a new record, its kerb edges' `('frontage', id)` rows moved to it by `retypeEdges`' `rekey` (§3.4), each part's `lengthCm` its own, both keyed by §6.3's rule for a split `Frontage` — and each re-pointed" |
| 21 | (2) | J-A11.43 Part A (rat l. 510) | PRESENT, once, at the entry's end | "A block's `Frontage` record split at the same ends follows §6.3's rule, the part holding its first kerb edge keeping the address, so identity has one rule (verify-r3: VP3-05, VP3-06, VD3-10)." |

The determinism-owned companions that cite this part were read in place: #3 (§5.2 F-SITING's ladder and test cells),
#6 (§7.3 item 4), #22 (§6.3), #4 (T19-4) and #23 (T11-1). They agree with the pipeline texts above, except where §3
and the concurring VDH-04 / VDH-05 say otherwise.

## 2 Checks on the touched subsections and those that cite them

**Read whole:** §4.7 (l. 4360–4691), §10.2 (l. 8882–9030) and II.6 (l. 11833–11971).

**Read for the cross-checks:**

* §2.5 `Frontage` (l. 855) and `BuildingSlot` (l. 878).
* §2.6: the `Building` record (l. 963–968), the interior ladder, and the capacity, never-omit and re-cut bullets
  (l. 1440–1519).
* §3.4 `retypeEdges` and *Stretches* (l. 2512–2584).
* §4.11: rung 1, *Dossier content across epochs*, the strike lottery, and the `relet` op.
* §5.2 F-SITING (l. 5633).
* §6.3 JOIN and SPLIT (l. 6185–6205).
* §7.2 *Protection*, §7.3 items 1 and 4, and §7.7 item 2.
* §10.3 *Uses that move* (l. 9090).
* §13.2 T11-1 and T19-4.
* §0.2 row 28.
* The index rows and Part A entries of J-A20.42, J-A20.71, J-A20.72, J-A28.46 and J-A11.43.
* The owner's item 20 (`docs/AMENDMENTS-2026-09-25b.md` l. 155–181).

* **No other text changed.** `secdiff.py` (scratchpad) finds 19 changed subsections document-wide. Of those, the pipeline
  part holds only §4.7, §10.2 and II.6. `worddiff.py` finds 10 hunks in §4.7, 4 in §10.2 and 2 in II.6, each one a word of
  a required text. The one non-word change is the joining of soft line breaks (l. 4676, 4678 and 4685 are now long
  lines), which renders the same.
* **Single source.** The new texts point to their homes: the `houses` flag (§10.2), the capacity rule (§2.6), the
  identity rule (§6.3) and the closest-option order (J-A20.42). Three second statements are now stale or duplicated.
  These are VPH-01 (J-A28.46), VPH-02 (`liveIn` and §10.3's "dwelling slot") and VPH-04 (§2.6's glosses).
  #2 (1) itself restates the least-disruption order ("above: vacant plots and vacancy runs first, …"). This one is
  ruled not a defect: it is an abridged gloss, marked "above", of the order stated earlier in the same subsection; it
  matches the order's four tiers word for word, and it is the closing ruling's own text (§3.1).
* **References.** `refs.py` on the live document found 139 headings, 35 D ids, 471 J ids and 2 flags. Both flags
  pre-exist and are the same citations of outside documents that the archive has (`os-geometry.md` §2.1.4 and RFC 7946
  §3.1.6), so there are 0 new broken references. Every id in the new pipeline texts resolves, including J-A20.72 and
  J-A20.42 in both the index and Part A. My proposed texts add no id.
* **Deferral wording.** The new pipeline texts were probed for TBD, to be decided or determined, deferred, open
  question, later pass or round, TODO, FIXME and left open. The probe found 0 hits.
* **Owner rules (item 20).** A dossier-roster household is:
  * never taken off the manifest by F-SITING (§4.7; §5.2's ladder cell);
  * re-provided inside its district by the `dossier` request, which always places (J-A20.42);
  * kept by the S11 clamp when it is locked or pinned;
  * moved to the next candidate when its plot is typed vacant.

  No fix adds an epoch, edit or solver path that removes a dossier element or such a household. Item 20 (e)'s
  "re-provided elsewhere" is met by "inside its district": that is elsewhere than the full building, and the ruling
  records the district bound (§3.1).

## 3 Issues

| id | owner | severity · kind | where | claim in one line |
|---|---|---|---|---|
| VPH-01 | pipeline | minor · stale | J-A28.46 index row and Part A | both still state the vacant rule #1 (3) retired, and S11's write without #1 (4)'s scope |
| VPH-02 | pipeline | minor · duplicate | §10.2 `houses`; §10.3 *Uses that move* | `houses` restates `liveIn` with no rule for a disagreement, and §10.3 still tests for "a dwelling slot" |
| VPH-03 | pipeline | minor · partial | II.6; J-A11.43 index row | the `Frontage` split is worded for two parts, but an interior stretch inside one block gives three; the index row omits the split |
| VPH-04 | model | minor · stale | §2.6 `Building.households`; capacity bullet | two glosses still have S11 clamp every building's list into [1, capacity] |
| VPH-05 | scope | minor · missing bar | §13.2 T19-4, T11-1 | #1's new rules have no bar, and T11-1 repeats the two-part wording |

Concurring findings, not returned twice:

* **= VDH-04 (determinism).** §7.3 item 1 does not hold the plots that a hand edit's re-provision touches, and item 4
  does not list its displacements and joins. Yet §4.7 #2 (1) sends them to "a hand edit's … dry-run fates (§7.3
  item 4)". I reached the same text independently, and VDH-04's required change is the one to apply.
* **= VDH-05 (determinism).** §6.3's new sentence says "the other takes an address". VPH-03 and VPH-05 are worded to
  apply with VDH-05's text; the scratch application below applied all three together.

### VPH-01 — pipeline · minor · stale (J-A28.46 after #1 VP3-04)

**Claim (CONFIRMED on the text).** #1 (3) changed when §4.7 types a plot vacant: "a residential plot whose required
residential slots the demand cannot all fill … its households placed on the next candidate". It also added the floor
"never below its structure's least `count` where the structure is `required`". #1 (4) limited S11's write to
residential buildings and kept locked and pinned households.

J-A28.46, the judgment call that records this split, still says the old rule. Its index row reads "a plot none of
whose slots it fills typed vacant … S11 writes `Building.households` clamped to §2.6's capacity". Its Part A entry
reads "a plot none of whose slots it fills typed vacant by the reconcile, and S11 … writing `Building.households`
clamped into [1, capacity]". A plot with some slots filled but a required one unfilled is now vacant by the home and
not vacant by the record.

**Required change.**

1. The J-A28.46 index row. Replace "(a slot the demand cannot fill dropped from the site plan, its ground a yard; a
   plot none of whose slots it fills typed vacant), S11 writes `Building.households` clamped to §2.6's capacity on the
   wings it made;" with "(a structure with `houses`, §10.2; a slot the demand cannot fill dropped from the site plan,
   its ground a yard, never below a `required` structure's least `count`; a plot whose required residential slots it
   cannot all fill typed vacant, its households placed on the next candidate), S11 writes each residential building's
   `Building.households` clamped to §2.6's capacity on the wings it made, a locked or pinned household kept and every
   other building's list empty;".
2. The J-A28.46 Part A entry. Replace "a slot the demand cannot fill dropped from the plot's site plan with its ground
   a yard and a plot none of whose slots it fills typed vacant by the reconcile, and S11, which creates the building
   and its wings, writing `Building.households` clamped into [1, capacity] by §2.6's one capacity function evaluated on
   those wings" with "a residential slot being a structure with `houses` (§10.2), a slot the demand cannot fill dropped
   from the plot's site plan with its ground a yard but never below a `required` structure's least `count`, and a plot
   whose required residential slots it cannot all fill typed vacant by the reconcile, its households placed on the next
   candidate, and S11, which creates the building and its wings, writing each residential building's
   `Building.households` (every other building's list empty) clamped into [1, capacity] by §2.6's one capacity function
   evaluated on those wings, a locked or pinned household kept before the clamp drops any".
3. The same entry. Replace "(§4.7; items 28 (f) and 16; the slot rule added for VP2-01)" with "(§4.7; items 28 (f) and
   16; the slot rule added for VP2-01, and typed by `houses`, bounded by the required structures and kept to
   residential buildings for VP3-04)".

### VPH-02 — pipeline · minor · duplicate (the `houses` flag's live-in companions, after #1 (1))

**Claim (CONFIRMED on the text; a disagreeing row is PLAUSIBLE, since the default rows are ours).**

* **`liveIn` and `houses` state one fact twice.** #1 (1)'s comment says "a live-in workplace's main slot is one",
  which restates `BuildingClassRow.liveIn` in a second column. Nothing says which wins when the two disagree.
* **A disagreement leaves contradictory state.** Take a live-in class whose band row leaves `houses` false on its
  main slot. §4.7's *Live-in* bullet sites its household at the workplace, "recorded as the building's `dwelling`".
  But S11 writes that building's list empty, because its slot has no `houses`. The overflow pass then moves the
  household away, while `Building.dwelling` still names it.
* **§10.3 still uses the old name.** *Uses that move* moves a live-in household "when the destination's designation
  template has a dwelling slot (§4.7 S11)". That is a second name for the residential slot, and it misses a live-in
  class whose household lives in its main slot.

**Required change.**

1. §10.2 `DesignationTemplateRow.structures`. Replace "a live-in workplace's main slot is one */" with "a live-in
   class's (BuildingClassRow.liveIn) main slot is one whatever this cell holds — its building houses the live-in
   household, Building.dwelling (§4.7 S10b) — so the two columns never disagree */".
2. §10.3 *Uses that move*. Replace "when the destination's designation template has a dwelling slot (§4.7 S11)" with
   "when the destination's designation template has a residential slot (a structure with `houses`, §10.2; §4.7 S11)".

### VPH-03 — pipeline · minor · partial (II.6's `Frontage` split after #21 VP3-05)

**Claim (CONFIRMED on the text; the three-part case follows from the widening rule).**

* **The three-part case is common.** II.6 widens a stretch only to vertices where plot frontages break. A block's
  `Frontage` record covers all of that block's kerb along the way, so a stretch that lies inside one block's run has
  the record spanning both ends. The record must then be split into three parts: before the stretch, the stretch, and
  beyond it. That is the usual case for an interior stretch that does not reach a junction.
* **#21 (1)'s wording covers two parts only.** It gives "the part beyond the end a new record … both keyed by §6.3's
  rule". It leaves the middle part's status and the order of the two cuts to inference. Read as two successive
  splits, the third part continues the second record's lineage. The tunnel instead splits in one step, and every part
  continues the original's lineage (§6.3). One rule, read two ways, gives two identities.
* **The index row omits the split.** J-A11.43's index row still says only "block frontages re-pointed". Its Part A
  entry now records the split (#21 (2)).

**Required change.**

1. II.6. Replace "split where one spans an end — the part beyond the end a new record, its kerb edges' `('frontage',
   id)` rows moved to it by `retypeEdges`' `rekey` (§3.4), each part's `lengthCm` its own, both keyed by §6.3's rule
   for a split `Frontage` —" with "split at every stretch end it spans, in the one step that splits the tunnel (a
   record spanning both ends of an interior stretch in three parts) — each part beyond an end a new record, its kerb
   edges' `('frontage', id)` rows moved to it by `retypeEdges`' `rekey` (§3.4), each part's `lengthCm` its own, every
   part keyed by §6.3's rule for a split `Frontage` —".
2. The J-A11.43 index row. Replace "and the chambers, access points and block frontages re-pointed (amended by
   verify-pipeline-r2)" with "and the chambers, access points and block frontages re-pointed, a block `Frontage`
   spanning an end split there with the part holding its first kerb edge keeping the address (amended by
   verify-pipeline-r2; verify-r3 VP3-05, VD3-10)".

Apply with VDH-05 (§6.3: "every other part — two where the record spans both ends of an interior stretch — takes an
address …").

### VPH-04 — model · minor · stale (§2.6's glosses of S11's write, after #1 (4))

**Claim (CONFIRMED on the text).** #1 (4) makes S11 write "each residential building's `Building.households` … every
other building's list is empty". Two §2.6 restatements still give every building the clamp's lower bound of one:

* the `Building.households` field comment, "the generation fill (S10b's placement, written by S11 once the wings exist,
  clamped into [1, capacity], §4.7)";
* the capacity bullet, "S11, which creates the building and its wings, writes `Building.households` clamped into [1,
  capacity])".

This is VP3-04's own complaint ("a workshop or stable would need a household"), now carried only by the field's
definition.

**Required change.**

1. §2.6 `Building`, the `households` comment. Replace "the generation fill (S10b's placement, written by S11 once the
   wings exist, clamped into [1, capacity], §4.7)" with "the generation fill (S10b's placement, written by S11 once the
   wings exist, clamped into [1, capacity] for a residential building and empty for every other, §4.7)".
2. §2.6, the capacity bullet. Replace "S11, which creates the building and its wings, writes `Building.households`
   clamped into [1, capacity])" with "S11, which creates the building and its wings, writes each residential
   building's `Building.households` clamped into [1, capacity])".

### VPH-05 — scope · minor · missing bar (T19-4 and T11-1 after #1 and #21)

**Claim (CONFIRMED on the text).** #1 adds two rules that §13.2 does not test, and T11-1 repeats VPH-03's two-part
wording:

* **The empty list.** A building S11 builds for a slot without `houses` houses no household. No bar checks it.
* **The required-structure floor.** An unfillable slot is never dropped below a `required` structure's least `count`.
  No bar checks this either.
* **Where T19-4 stops.** T19-4 checks residential buildings only.
* **T11-1's wording.** It says "the part beyond the end a new record", which is the two-part wording of VPH-03.

**Required change.**

1. §13.2 T19-4. After "but for the moves §4.7's overflow pass reports —" insert " every building S11 builds for a slot
   without `houses` (§10.2) houses none, no plot's site plan holds a `required` structure below its least `count`,".
2. §13.2 T11-1. Replace "each underground block's `Frontage` that spans an end split there — the part beyond the end a
   new record with its kerb edges' rows," with "each underground block's `Frontage` that spans an end split there —
   each part beyond an end a new record with its kerb edges' rows, one spanning both ends of an interior stretch split
   in three,".

Apply after VPH-03 and VDH-05.

**Anchors and application.** Every old string above occurs exactly once in the whitespace-normalised live file (script
`anchors.py`). VPH-04 (2) crosses one soft line break; the others match unwrapped. The 11 sub-changes, together with
VDH-05's text, were applied to scratch copies by `vp-proposed.py`. That script lets a single space match one soft line
break, as `handfix.py` does. Each new text occurred once after application ("ALL OK").

## 4 Considered and ruled not defects

* **The least-disruption gloss in #2 (1).** Covered in §2 under single source.
* **Distances of the generation-time `dossier` request.** The request runs "in the same derivation" of a district, so
  §4.7 S10b's pooled-provider rule governs its distances; it borrows only the least-disruption order. Its scope is the
  district, so no order dependence enters. The closing ruling (§3.1) rests on the same bound. PLAUSIBLE; no change.
* **"that plot's designation template" at a closest option.** A post-build request's placed plot "then mutate[s] to
  the designation by S11's operator" (S10b), so the plot's template after placement is residential. The read is
  coherent. PLAUSIBLE; no change.
* **Where the kerb is cut in a `Frontage` split.** §3.4's *Stretches* (J-K31) names part of a chain by a `StretchRef`
  and places a missing cut end by `splitThrough`. II.6's widening rule reads frontages by centreline station. Together
  they give the cut point. No change.
* **The plan of a building with no household.** Under #1 (4), a workshop's list is empty, so the plan rung reads
  n = 0. §2.6's canonical chain reaches it by its HOUSEHOLDS steps "from the clamped count to n". The result is
  defined, if roundabout. Not raised.
* **Pre-existing and untouched.** The population fall of a dossier town (§4.11, §10.2 *Under a fall*) is not a change
  of this hand fix, and item 20's epoch clause was verified in round 3. It is not re-opened here.

## 5 Receipts

| check | untouched live copy | my proposed copy | note |
|---|---|---|---|
| `doc_checks.py --sections "4.7,10.2,II.6"` | exit 0 · C1 5, C2 0, C3 41, C4 1, S1 0, S2 0, 0 unreviewed | — | the archive gives C3 40 against the same corpus (911 940 3-grams both runs): the +1 is reviewed, and it matches apply.md's allow row "2 of the plot s" for #1 (2) (reviewed hits are not listed one by one) |
| `doc_checks.py --sections "2.6,6.3,10.2,10.3,13.2,II.6,Judgment calls"` | exit 0 · C3 332, 0 unreviewed (run before and after: identical, so the corpus held still) | exit 1 · C3 335, 3 unreviewed | see the note below |
| `refs.py` | 2 flags, both pre-existing external citations | — | J ids 471 (archive 470: J-A30.25 added by apply) |

The 3 new C3 hits are the one phrase "both ends of an interior", at three places:

* II.6, from VPH-03;
* §13.2, from VPH-05;
* §6.3, from VDH-05's text, which was applied for compatibility.

It is a chance match stitched from generic English: no findings file and no JSON under research/ or captures/ holds
even its four-token runs contiguously (grep). The seat that applies VPH-03 and VPH-05 adds allow rows for its hits.
Combined copy: no other writer touched the design files during this lane.

Scratch files, under the session scratchpad's `handfix/` directory:

* `secdiff.py` and `worddiff.py`, with the output `pipeline-worddiff.txt`;
* `presence.py`, `anchors.py` and `vp-proposed.py`;
* the check outputs `refs-live.json`, `dc-*.txt` and `dc2-*.txt`.

## 6 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed or read on disk):

* the hashes;
* the 10 sub-changes present once, with their old texts gone;
* the part diff (only §4.7, §10.2 and II.6 changed, 16 hunks, all required);
* 0 new broken references and 0 deferral hits;
* each issue's claim on the quoted text;
* each proposed old string once, and each new text once after scratch application;
* the doc-check counts.

**PLAUSIBLE:**

* how often VPH-02's disagreeing row and VPH-03's three-part split occur;
* the four considered-and-ruled items of §4;
* that the proposed wordings leave no new defect. A later seat applies and verifies them.
