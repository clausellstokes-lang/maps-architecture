# handfix-b/verify-determinism-r2 — the DETERMINISM part's fixes after repair round 2, verified

> PENDING FABLE REVIEW — Opus-produced (handfix-b/verify-determinism-r2).

PROGRESS (kill-safe ledger; a seat that continues this lane reads it first)
ITEM read: planned closing-report §2 (determinism-owned + edits in §5/§6/§7), §3, handfix/apply.md, verify-determinism-r1, repair-r2-*.md + reports, assemble-r2.md | done (live §5.2, §5.3, §6.3, §7.1, §7.3, §7.4, §7.7 read whole; block file ce62542d… = assemble-r2's)
ITEM diff: planned archive pre-handfix-b-repair-r2 (e9c0b828…) vs live (357c02f2…) in §5, §6, §7 + touched index / Part A rows; pre-handfix-b (1a861c72…) vs live for every earlier fix | done (24 doc hunks, 2 in §5-§7 = VDR-01, VDR-02 exactly; rat 5 lines, J-A20.74 = VDR-03; the 3 block bodies = live byte for byte)
ITEM per-fix: planned PRESENT / PARTIAL / MISSING / MISAPPLIED for the closing, round-1 and round-2 determinism fixes, quoted | done (probe2.py: 62 probes OK — 40 new texts once, 22 retired texts 0; r2 transcription 4/4)
ITEM checks: planned no-other-change, single source, references, deferral wording, owner rules (item 20) | done (§5-§7 2 hunks only; refs 2 pre-existing external; deferral 0; item 20 held; 2 minor issues: VDH2-01 determinism, VDH2-02 scope)
ITEM doc-checks: planned three-copy method on scratch copies with any required change applied (this seat edits no design file) | done (keys 7,13 and 7.4,13.2: mine = untouched on every count, raw hits 179 = 179, 0 added, exit 0; corpus held, 4 untouched runs identical)
ITEM close-out: planned queue row, LANDED line | done (row B-handfix-b/verify-determinism-r2 appended, old prefix byte-identical; live files still 357c02f2… / 9575f26c…; LANDED line written after this ledger line)

Lane `handfix-b/verify-determinism-r2`, 2026-09-27, opus verifier. Judged: `docs/ARCHITECTURE.md` sha256 `357c02f2…`
(13 025 lines) and `docs/ARCHITECTURE-RATIONALE.md` sha256 `9575f26c…` (2 053 lines) — the hashes handfix-b/assemble-r2
installed. This seat edits no design text.
The befores are the read-only archives `docs/archive/ARCHITECTURE(-RATIONALE)-pre-handfix-b-repair-r2-2026-09-27.md`
(`e9c0b828…` / `dcabf14b…`, the state verify-determinism-r1 judged), `…-pre-handfix-b-repair-r1-…` (`5d752c9b…` /
`61477508…`) and `…-pre-handfix-b-2026-09-27.md` (`1a861c72…` / `8a24a5a7…`, before the hand fix); their hashes were
checked at the start. The determinism block file is `repair-r2-determinism.md` at `ce62542d…`, the hash assemble-r2 applied.

## Outcome

* **Every determinism fix is PRESENT exactly as required, once, at the right place; none is PARTIAL in its wording,
  MISSING or MISAPPLIED.** This covers round 2's three repairs — VDR-01 (§5.2's F-EDIT ladder), VDR-02 (§7.4's
  Application bullet) and VDR-03 (1), (2) (J-A20.74's restated Part A entry) — with the verifier's text verbatim (4 of 4
  sub-changes, transcription checked by script). It also covers everything the earlier rounds put in this part and round
  2 left standing: the twelve determinism-owned hand fixes of closing-report §2 (#3, #6, #8–#12, #22, #24–#27), the
  model-owned VR3-01 (2), (3) that land in §7.1 and §5.2, round 1's VDH-01 (1)–(6), VDH-03, VDH-04 (1), (2), VDH-05 and
  VDH-06, the model seat's H1 and §7.1 rewrite (VHM-02 (3)), and the scope seat's VDH-02 (T20-2). An independent
  whitespace-normalised probe (`probe2.py`) finds all 40 required texts once and all 22 retired texts 0 times.
* **Nothing else in §5, §6 or §7 changed.** Round 2 changed the document in 24 hunks, and only two lie in §5–§7: l. 5644
  (§5.2) and l. 7051 (§7.4). Each is a pure insertion of VDR-01's or VDR-02's text (word diff). The three block bodies
  equal their live text byte for byte (§5.2 l. 5617–5646, §7.4 l. 6963–7137, J-A20.74 at rationale l. 330). The only
  rationale change of this part is J-A20.74's two substitutions.
* **References resolve** (refs.py: 139 headings, 35 D ids, 472 J ids, 2 broken — the pre-existing outside citations
  `os-geometry.md` §2.1.4 and RFC 7946 §3.1.6). **No deferral wording** in the round-2 texts or in §5.2, §5.3, §6.3,
  §7.1, §7.3, §7.4 and §7.7. **Item 20 holds**: VDR-01 and VDR-03 only narrow offers and promises to what §7.4 admits, and
  VDR-02's undo moves households and a displaced use back, a move and never a removal (J-A20.75).
* **Two minor issues, none needing the owner** (§3). Round 2 made a designation change a central re-homing path: a
  building S11 builds for a slot without `houses` has capacity 0 (§2.6, VPH1-02), and J-A28.23's restated Part A promises
  that path "its fates, its F-EDIT refusal and its undo". §7.4 does not give that undo. Only four rows restore re-homed
  households, and VDR-02's sentence covers only a re-homing that re-provides a dossier household's housing (VDH2-01,
  determinism). The bars do not cover the path either: T18-1 still bounds a designation change to "the plot and its
  joined neighbour", and T28-18 exercises no designation change (VDH2-02, scope). Each old string occurs exactly once.
  All three sub-changes apply to scratch copies, add no broken reference and add no document-check hit (§4).

## 1 Per-fix verdicts

Live line numbers (document unless marked rat) are where the probed text starts. "Retired" = the superseded text occurs 0
times in the live file. The closing and round-1 rows re-check verify-determinism-r1's table on the round-2 text: every
one of them is unchanged by round 2 (their texts equal the r2 archive's).

| # | id | sub | verdict | live text (quoted) | line |
|---|---|---|---|---|---|
| r2 | VDR-01 | §5.2 F-EDIT ladder | PRESENT (inserted after "the dependent events to undo first,"; old ladder join retired) | "the dependent events to undo first, never a dossier event or an epoch that carried one (a target one of them depends on stays as it is, §7.4's Independence), in place of an `undo` of a `creation` event" | 5644 |
| r2 | VDR-02 | §7.4 Application | PRESENT (appended after "reproduces the target's result exactly.") | "An edit whose capacity re-homing re-provides a dossier household's housing (§4.7) keeps in its undo record, whatever its row's undo, the plots the re-provision touched (§7.3 item 1) — the site with the residential slot built there, its joined neighbour, each displaced use's new site — and its undo restores them with the households it re-homed." (see VDH2-01) | 7051 |
| r2 | VDR-03 | (1) J-A20.74 Part A | PRESENT, retired | "the lapse written by that event inside its own touched set so that the log gains no event and its undo — where §7.4 admits one, an epoch that carried no dossier event — restores the hold" | rat 330 |
| r2 | VDR-03 | (2) J-A20.74 Part A | PRESENT, retired | "`held.blockSeq` replaced by `populationTarget`; the undo limited to what §7.4 admits by handfix-b verify-determinism-r1 VDR-03)." | rat 330 |
| 3 | VD3-01 | (1) ladder, (2) test | PRESENT, (2)'s old text retired | "no re-cut after S11 — never a household of a dossier's roster (§7.7 item 2), whose housing §4.7 re-provides inside its district by the `dossier` request, which always places (J-A20.42)"; "every household S2 demanded housed or reported unplaced, and every household of a dossier's roster housed (§13.2 T19-4)" | 5636 |
| 6 | V-MAB3-08 | (i) §7.3 item 4 (with VDH-04 (2)) | PRESENT, retired | "every edit's report lists the households §2.6's capacity rule re-homes, each with its `relocate` event (from and to), the residential slots §4.7 builds to re-provide a dossier household's housing, with the uses that re-provision displaces and the plots it joins, and the names it re-draws" | 6890 |
| 6 | V-MAB3-08 + VR3-01 (3) | (ii) F-EDIT detection | PRESENT | "a hand edit whose capacity re-homing cannot place its excess — locked or pinned households alone above the new capacity, or a household of no dossier's roster …; a heights edit that would leave a base wing spanning a passage below two floors (§2.5 `Passage.headroomCm`; item 30);" | 5644 |
| 7 | VR3-01 (model) | (2) §7.1, as widened by VHM-01 (2), VHM-02 | PRESENT, r0 wording retired | "`Passage.headroomCm` and `Passage.frontBuilding` are derived — S11 writes them with the spanning wings' `spans`, a heights edit of a spanning wing re-derives the headroom, and the event that makes the front building a footprint trace or a tombstone clears `frontBuilding` … — and have no edit kind of their own;" | 6550 |
| 8 | VD3-05 | §5.3 row | PRESENT | "\| no building houses more households than its capacity: `Building.households ≤ capacity(b)` (§2.6's one capacity function) after every committed change …" | 5669 |
| 9 | VD3-06 | §7.1 | PRESENT, retired | "an edit that lowers a building's capacity below its households — any change §2.6's capacity rule lists — re-homes the excess by that rule, each move among its fates (§7.3 item 4);" | 6558 |
| 10 | VD3-07 | §7.3 stored-plan row | PRESENT | "— a `relet`, a household moved in or out (§4.7's overflow pass, §2.6's capacity re-homing, item 17's relocation, §10.3), an occupants' band change at an epoch, a designation mutation (item 28 (f))" | 6750 |
| 11 | VD3-08 | (1) setAttr, (2) moveVertex / warp, (3) editTable | PRESENT | "a `setAttr` of heights or class that re-homed households keeps their former buildings in its undo record, which its undo restores (§2.6)"; "former bases of re-based entities, and the households §2.6's capacity rule re-homed, with their former buildings"; "never re-drawn; the households its capacity re-homing moved restored to their former buildings" (see VDH2-01) | 6981, 6982, 6998 |
| 12 | V-MAB3-09 (with VDH-04 (1)) | §7.3 item 1 | PRESENT, both earlier wordings retired | "an edit that lowers a building's capacity below its households holds that building, the buildings §2.6's capacity rule re-homes its households into and, where §4.7 re-provides a dossier household's housing, the plots its `dossier` request touches — the site, its joined neighbour if any, and each displaced use's new site — bounded as a dossier event's scope is (above)." | 6696 |
| 22 | VD3-10 (with VDH-05) | §6.3 | PRESENT, r0 "the other takes" retired | "A block's `Frontage` record (§2.5) that the same split cuts at a stretch end (II.6) follows the same rule: the part holding the record's first kerb edge in the centreline's order keeps its address, every other part — two where the record spans a whole interior stretch — takes an address minted from the causing event's `seq` and ordinal, …, and an `undo` restores the one record (§7.4)." | 6205 |
| 24 | VD3-03 | (1) §7.7 item 2, (2) J-A20.75 index, (3) Part A | PRESENT, (1) and (2) retired | "§4.11's *Dossier content across epochs* relocates it first, or keeps it in its building, wherever a step would close it or empty or remove that building —"; "— §4.11 relocates it first or keeps it in its building (J-A20.43) —"; "§4.11 relocates the use first, or keeps it in its building where no candidate plot exists (J-A20.43)" | 7397, 12943, rat 480 |
| 25 | VD3-04 | (1) Replay semantics (with VDH-01 (1)) | PRESENT, retired | "Every later dossier event (`EditBase.dossier` set, §7.7 item 1) is likewise no `undo`, `redo` or `revert` target of a map event: … an `epoch` that carried one in `EpochInputs.dossier` is refused as an `undo` target the same way, …" | 6974 |
| 25 | VD3-04 | (2) Targets, (3) `revert` comment, (4) §7.7 item 6, (5) F-EDIT detection | PRESENT; (3), (4) retired | "other than a `creation` event, a dossier event or an epoch that carried one (above)"; "never a `creation` or dossier event, §7.4"; "they fold only inside the epoch and are never undo targets, and neither is the epoch that carries them (§7.4)"; "an `undo` naming a `creation` event, a dossier event or an epoch that carried one (§7.4)" | 7037, 6450, 7440, 5644 |
| 25 | VD3-04 | (6) J-A22.76 index, (7) Part A | PRESENT, retired | "are never undo targets, and the epoch that carries them is none either (item 20 (c); verify-determinism-r3 VD3-04)"; "never make them undo targets, nor the epoch that carries them, since undoing either would change dossier content without a dossier instruction (…)" | 12970, rat 507 |
| 26 | VD3-09 | (1) F-PLAN tier 2, (2) J-A28.73 Part A | PRESENT | "where that order holds no further candidate, the anchor goes to tier 6 — a chimney stack omitted, its hearth room kept and reported; a stair bay's upper storeys left unreached — the bar failing and the building flagged"; "An anchor whose filtered order is exhausted takes tier 6, reported and flagged, never an abort, …" | 5638, rat 506 |
| 27 | VP3-08 | J-A28.51 Part A | PRESENT, retired | "tier 6 never reaching a unit because the generation fill (§4.7: S10b's placement, S11's clamped write and its overflow pass), `relet` and §2.6's re-homing keep the count within §2.6's capacity" | rat 336 |
| r1 | VDH-01 | (2) assign / unassign undo | PRESENT | "the inverse mutation from the undo record (§4.7 S11 rule 5) and the former placements — for an event that is neither a `creation` event nor a dossier event, which are no undo targets (Replay semantics, above)" (see VDH2-01) | 6989 |
| r1 | VDH-01 | (3) Independence | PRESENT | "and an owner may undo through a chain — never through a dossier event or an epoch that carried one, which are no undo targets (Replay semantics, above), so a target one of them depends on stays live." | 7056 |
| r1 | VDH-01 | (4) F-EDIT ladder | PRESENT, retired | "in place of an `undo` of a later dossier event or of an epoch that carried one `rejectSite` and `placeAt` for each dossier element it placed or re-designated (§7.4)" | 5644 |
| r1 | VDH-01 | (5) rejectSite / placeAt undo, (6) §7.7 item 3 | PRESENT, retired | "an undo of a lapsing epoch that carried no dossier event restores the hold, while an `undo` naming a lapsing dossier event, or an epoch that carried one, returns F-EDIT (Replay semantics, above)"; "(a dossier event, or an epoch that carried one, is no undo target: §7.4; J-A20.74, with J-A20.41)" | 6990, 7409 |
| r1 | VDH-03 | setField undo | PRESENT | "the operator re-runs on the stroke's region; the households §2.6's capacity rule re-homed restored to their former buildings from its undo record (§2.6)" | 6997 |
| r1 | VDH-06 | J-A28.73 index | PRESENT, in place | "a stair bay or chimney stack is re-placed in the same attempt by a deterministic move, or taken by tier 6 (reported, the building flagged) where its filtered order holds no further candidate," | 12969 |
| model | H1 | §7.3 item 1 | PRESENT once | "an event that changes a spanning wing's heights, or makes its building a footprint trace or a tombstone, holds the passage it spans, whose `headroomCm` or `frontBuilding` it rewrites (§2.5's `Passage`, §2.6's `BaseWing.spans`);" | 6696 |
| model | VHM-02 (3) | §7.1 buildings row | PRESENT, retired | "each base wing's `spans` (written only by S11 when it builds or re-fits a passage's front building, and cleared by S11 or by the event that makes that building a footprint trace or a tombstone, §2.6)" | 6591 |
| scope | VDH-02 | §13.2 T20-2 | PRESENT, agrees with §7.4 and §7.7 item 3 | "and an undo of a lapsing epoch that carried no dossier event restores the hold, while an `undo` naming a lapsing dossier event returns F-EDIT (§7.4); (T20-3)" | 10337 |

The three round-2 texts, read against their claims on the live §5.2, §7.4 and Part A:

* **VDR-01** closes the ladder leg that verify-determinism-r1 found open. The parenthesis "stays as it is" is exact for
  both cases the row covers: an undo's target stays live, and a redo's target stays undone. Independence's own "stays
  live" covers the undo alone. §11.2's `undo` comment ("a conflict lists the dependent events") offers no action and
  needs none.
* **VDR-02** is stated once, at the undo record's home. It reaches the rows whose undo is an inverse or a re-run. Its
  plots are those §7.3 item 1 puts in scope and item 4 lists as fates. T28-18's dossier clause ("its undo restoring those
  plots and every household byte-identically (§7.4; …)") cites it and finds it. "its joined neighbour" without "if any"
  is governed by "the plots the re-provision touched". That is the Fable continuation's recorded JUDGMENT, and it reads
  right. The sentence covers only a re-homing that re-provides. A plain re-homing (no re-provision) on a row without
  a household clause is VDH2-01.
* **VDR-03** leaves J-A20.74's Part A entry promising an undo only where §7.4 admits one. A sweep of both files for
  "restores the hold" finds §7.4's rejectSite / placeAt row (l. 6990), §7.7 item 3 (l. 7409), T20-2 (l. 10337) and
  J-A20.74's entry. All four carry the same condition. J-A20.74's index row (l. 12793) and J-A20.41's row and entry make
  no undo claim.

## 2 The checks

* **No other text changed.** The word diff of the round-2 archive against the live document (`wdiff-r2-s5-7.txt`)
  shows two hunks in §5–§7. Each is a pure insertion, of VDR-01's and VDR-02's text. §5.1, §5.3, §5.4, §6 whole, §7.1,
  §7.2, §7.3, §7.5 to §7.8 and every §5–§7 line outside those two equal the archive's. The other 22 document hunks and 4
  rationale lines are the sibling seats' intended texts (§2.5 P1, §2.6, §3.4, §4.7, §8.2, §10.2, §13.2 and the J-A28.23,
  J-A28.26, J-A28.34 and J-A28.46 rows); none rewrites a determinism text. Of the determinism index rows none changed in
  round 2. In Part A only J-A20.74 changed, in place, by exactly VDR-03's two substitutions.
* **Single source kept.**
  * The dossier-undo rule keeps its one home, §7.4's Replay semantics. VDR-01's parenthesis is a gloss that points to
    Independence.
  * The re-provision's scope has one home (§7.3 item 1), its fates one (§7.3 item 4) and its undo one (VDR-02's
    sentence in §7.4's Application); §4.7 keeps the mechanism.
  * VDR-03 brings Part A to the home's statement, so it no longer adds a second, stronger one.
* **References.** Every pointer in the three round-2 texts resolves: §7.4's Independence, §4.7, §7.3 item 1, §7.4 and
  the provenance citation. refs.py over the live document gives 139 headings, 35 D ids, 472 J ids and 2 flags, both
  pre-existing outside citations (l. 2709, l. 9196). This is the baseline, so there are 0 new broken references.
* **No deferral wording.** The probe (TBD, to be decided / determined, open question, defer…, decide later, later pass /
  round, TODO, FIXME, left open, future, pending, revisit, for now, placeholder) finds 0 hits in the three round-2 texts
  and 0 in §5.2, §5.3, §6.3, §7.1, §7.3, §7.4 and §7.7 whole.
* **Owner rules (item 20).** VDR-01 withholds an undo offer from a dossier event, and from an epoch that carried one,
  which item 20 (c) already makes no undo target. VDR-03 limits a promise to what §7.4 admits. VDR-02's undo moves the
  households back to their former building, a displaced use back to its site and a joined plot back apart. These are
  moves, which J-A20.75 keeps allowed, and the residential slot is un-built only once its households have left it. A
  dossier event that depends on those plots keeps the target live (Independence), so the rollback never crosses a
  dossier instruction. No text touched in round 2, in this part or in the sections that cite it, lets an epoch, an edit
  or a solver rung remove a dossier element or a dossier-roster household. The same holds for the two required changes
  of §3: they move households back and test that they move.
* **The sections that cite this part, re-read on the round-2 text.**
  * §2.6's capacity bullet ("its undo restores them (§7.4)") and J-A28.23's index row and restated Part A are the
    ground of VDH2-01.
  * §4.7's *Households per building* (the re-provision sentence VDR-02 leans on is intact, l. 4688) agrees.
  * §4.11's epoch order, lapse step (h) and *Dossier content across epochs* agree with §7.7 items 2, 3 and 6.
  * §10.3's *Uses that move* agrees.
  * §11.2's `undo` comment agrees.
  * §13.2's T19-4, T20-2, T20-6 and T28-18 agree (T28-18's round-2 brush clause cites §7.4's setField row, which says
    what it claims). T18-1 is VDH2-02.
  * II.6 is unchanged, and so is §6.3's Frontage rule.
* **Considered and ruled not defects.**
  * §5.3's capacity row names in its batch-local scope the buildings whose wings, heights, class, plot `builtBand` or
    household count the batch wrote, not a changed designation. That is not a gap in the check. A designation change runs
    S11's mutator, its scope holds the mutated plot's buildings (§7.3 item 1), and its dry run evaluates the stage-end
    rows of its scope (§5.3's preamble; §7.1's dry-run validation), S11's among them. A correct re-homing also writes the
    household count.
  * T18-3 ("A → B → A by the inverse mutation is byte-identical when nothing else changed") concerns the mutation
    record's inverse, which restores the design exactly (§4.7 S11 rule 5). What else the event touched is its scope's.
    The undo path restores all of it once VDH2-01 lands.
  * `Building.dwelling` and `BuildingSlot.unhoused`, both given writers in round 2, have undo paths. The re-homing's
    former building records carry `dwelling` (VDH2-01's sentence), and a use conversion keeps "a use conversion's former
    use and building links". The designation mutator's undo keeps "the former parts" (rule 5), with the slot's
    `unhoused`. Their registration and clearing lists are the model part's (verify-model-r2 VHM2-01, VHM2-03).
  * A composer's room passed less its bay or stack (round 2's VHM1-03) can be refused at a vertex of its own. F-PLAN
    tier 2 and J-A28.73 still classify that refusal as a composer's bug. verify-kernel-r2 (VKH2-01) and verify-model-r2
    (VHM2-02), both owner model, make the §2.6 filter guarantee the ring, which keeps §5.2 and J-A28.73 true as written,
    so no determinism change is needed. The two proposals replace the same §2.6 sentence ("step 3 filters its candidates
    to those that stay out of every composer's room or stand in one so.") with different texts. That is for the next
    model seat, or the closing lane, to reconcile into one.

## 3 Issues (owner part · severity · kind)

Each old string below occurs exactly once in its file, found by a matcher that lets a single space match one soft
line break (`anchors.py`); `proposed2.py` applies all three sub-changes in order to scratch copies and finds each new
text once afterwards.

### VDH2-01 — determinism · minor · partial (VD3-08's undo leg, reached through round 2's capacity-0 rule)

**Claim (CONFIRMED on the text; trigger PLAUSIBLE).** The capacity rule and its judgment call promise an undo that §7.4
gives only on some rows.

* **What is promised.**
  * §2.6's capacity rule lists "S11's operator (§4.7)" among the changes that lower a capacity and re-home the
    households past it, and says of a hand edit "its undo restores them (§7.4)".
  * §4.7 runs that overflow pass inside "a designation mutation, item 18".
  * Round 2 made that path central. "A building S11 builds for a slot without `houses` (§10.2, §4.7) has capacity 0"
    (l. 1480). J-A28.23's index row now says "a change that leaves a building no residential slot re-homes its
    households" (l. 12820). Its restated Part A entry says that such a change — "a `houses` or `liveIn` table edit, a
    designation mutation" — re-homes "with its fates, its F-EDIT refusal and its undo" (rat l. 357).
* **What §7.4 gives.** The household clause appears on four rows only: setAttr "of heights or class", moveVertex /
  warp, setField and editTable / editPreset. The rows of the hand designation changes lack it:
  * assign / unassign restores "the inverse mutation from the undo record (§4.7 S11 rule 5) and the former placements",
    and rule 5's inverse restores "the earlier design exactly". `MutationRecord` holds parts, joins and displaced uses,
    no household.
  * A `setAttr` of a plot's use is outside the setAttr row's "heights or class".
  * The convert row keeps "a use conversion's former use and building links".
  * Round 2's VDR-02 sentence restores the households "whatever its row's undo" only for a re-homing that re-provides a
    dossier household's housing.
* **The failure.** Take the undo of a `setAttr` that turns an occupied house into a workshop whose main slot has no
  `houses`. It returns the house with its capacity, but its households stay in the buildings that received them, and
  those buildings' stored plans stay re-cut. So the undo does not restore its target's scope. The closing ruling on
  VD3-08 treats exactly this as a defect ("which restores the heights and leaves the households moved").
* **How it slipped through.** verify-pipeline-r1 wrote that VPH1-02's capacity-0 sentence "settles without
  further edits" "§7.1, §7.3 items 1 and 4, and §7.4's rows" and "T28-18's clause". For §7.4 that holds on the four rows
  above and not on the designation rows; for T28-18 see VDH2-02.
* **Structural note.** This is the fourth fix of this shape: VD3-08's three rows, round 1's setField row (VDH-03), and
  round 2's re-provision sentence (VDR-02). So the change states it once, at the home VDR-02 chose.

**Required change.** §7.4, Application bullet, the sentence round 2 added. The old string is on one line, l. 7051.
Replace:

> An edit whose capacity re-homing re-provides a dossier household's housing (§4.7) keeps in its undo record, whatever
> its row's undo, the plots the re-provision touched (§7.3 item 1)

with:

> An edit whose capacity re-homing moves households (§2.6) keeps in its undo record, whatever its row's undo, the former
> records of the buildings it moves them out of and into and, where it re-provides a dossier household's housing (§4.7),
> the plots the re-provision touched (§7.3 item 1)

The sentence then continues unchanged: "— the site with the residential slot built there, its joined neighbour, each
displaced use's new site — and its undo restores them with the households it re-homed." Four points about the change:

* T28-18's dossier clause, which cites this sentence, still finds it.
* The four row clauses stay as its glosses and need no change (T28-18's brush clause cites the setField row).
* "The former records of the buildings" carries their `households`, a live-in household's `dwelling` and a receiver's
  stored plan re-cut by "a household moved in or out" (§7.3's stored-plan row).
* No new judgment call is made: this states the consequence of §2.6's "its undo restores them (§7.4)" and of
  J-A28.23.

JUDGMENT: widened the one sentence at the undo record's home over adding the clause to the assign / unassign, setAttr
(use) and convert rows, because a row-by-row fix has now needed three rounds and would still miss the rows whose record
is generic, while VDR-02 already fixed the home as the place — say "veto" to flip it (then: the three row cells take the
household clause, and the home sentence stays VDR-02's).

### VDH2-02 — scope · minor · conflict and missing bar (the bars for round 2's designation-path re-homing)

**Claim (CONFIRMED on the text).** Two bars in §13.2 do not match the designation path round 2 made central.

* **(1) T18-1's locality is narrower than the oracle it names.** T18-1 says a designation mutation "leaves everything
  beyond the plot and its joined neighbour untouched (the locality oracle)". The oracle's locality is the event's
  effective scope (§7.3 item 7 (ii), (vii)). For a designation change §7.3 item 1 makes that scope "the site, its
  joined neighbour if any, and each displaced use's new site". Where the change lowers a capacity, it also holds "the
  buildings §2.6's capacity rule re-homes its households into" and the plots of a dossier household's re-provision.
  Since round 2, a designation change that leaves an occupied building no residential slot gives it capacity 0 and
  re-homes every household it houses. So T18-1 fails a correct engine on a designation fixture whose building houses
  households, such as a house turned into a workshop.
* **(2) No bar exercises that path or its undo.**
  * T28-18's re-homing clause lists "a `setAttr` of a tenement's heights, a `moveVertex` that shrinks its footprint, a
    moved face of a passage it spans and a §7.6 edit of its template's `households.max`", and round 2 added the brush
    stroke.
  * T19-4 checks generation only ("every building S11 builds for a slot without `houses` (§10.2) houses none").
  * J-A28.23's restated Part A promises the path "its fates, its F-EDIT refusal and its undo", and VDH2-01 states the
    undo. The program's rule is that every mechanism has its bar ("rule 2's bar", closing report §3.4).

**Required change.** (1) §13.2, T18-1 (the old string crosses one soft line break). Replace:

> leaves everything beyond the plot and its joined neighbour untouched (the locality oracle)

with:

> leaves everything outside its event's effective scope untouched (§7.3 item 1: the plot, its joined neighbour, each
> displaced use's new site and the buildings and plots its capacity re-homing touches; the locality oracle)

(2) §13.2, T28-18 (one line). Replace:

> and the stroke's undo returns every household to its former building byte-identically (§7.4's setField row);

with:

> and the stroke's undo returns every household to its former building byte-identically (§7.4's setField row); a
> `setAttr` of the tenement's plot use to a class that leaves it no residential slot (capacity 0, §2.6) re-homes every
> household it houses the same way, and its undo returns the tenement's design and every household to its former
> building byte-identically (§4.7 S11 rule 5; §7.4's Application);

Where (2) sits, and why:

* It sits inside T28-18's re-homing clause, so it gates at M3a with that clause (§13.8, §16 M3a). No milestone row
  changes.
* It stands outside the dossier fixtures' "each of these edits, the brush stroke among them". A dossier-backed
  tenement's use is refused as a map edit (§7.7 item 2), and that refusal does not enter the dossier fixtures.
* Apply it with VDH2-01, whose Application sentence it cites.
* If verify-scope-r2 files the same bar, the closing lane keeps one.

## 4 Document checks

`python3 docs/validation/bench/doc_checks.py --doc <copy> --sections <keys>`. The keys are those of the required changes
of §3: the top-level keys 7 and 13, and the subsections 7.4 and 13.2. This seat edits no design file, so the live
document is at once the untouched and the combined copy. "Mine" is a scratch copy with the three sub-changes of §3
applied: `doc-mine2.md` from `proposed2.py`. `doc-mine.md` holds the first wording of VDH2-02 (1), which the
refined text replaced.

The required changes do not touch the rationale, so it has no run here. Every run read one corpus snapshot: 9 626 JSON
files, 911 940 C3 3-grams and 478 C4 lists. The untouched top-level run, made at the start and the end of each round,
gave identical output (`colour_files` set aside), and so did the two rounds' untouched runs against each other.

| run | copy | keys | allow file | C1 | C2 | C3 | C4 | S1 | S2 | unreviewed | exit |
|---|---|---|---|---|---|---|---|---|---|---|---|
| untouched, rounds 1 and 2, each at start and end | live `357c02f2…` | 7, 13 | default | 5 | 0 | 174 | 0 | 0 | 0 | 0 | 0 |
| **mine (final wording)** | `doc-mine2.md` | 7, 13 | default | 5 | 0 | 174 | 0 | 0 | 0 | 0 | 0 |
| mine (first wording) | `doc-mine.md` | 7, 13 | default | 5 | 0 | 174 | 0 | 0 | 0 | 0 | 0 |
| untouched | live | 7.4, 13.2 | default | 5 | 0 | 45 | 0 | 0 | 0 | 0 | 0 |
| **mine (final wording)** | `doc-mine2.md` | 7.4, 13.2 | default | 5 | 0 | 45 | 0 | 0 | 0 | 0 | 0 |
| mine (first wording) | `doc-mine.md` | 7.4, 13.2 | default | 5 | 0 | 45 | 0 | 0 | 0 | 0 | 0 |
| untouched, rounds 1 and 2 | live | 7, 13 | empty | 5 | 0 | 174 | 0 | 0 | 0 | 179 | 1 |
| **mine (final wording)** | `doc-mine2.md` | 7, 13 | empty | 5 | 0 | 174 | 0 | 0 | 0 | 179 | 1 |
| mine (first wording) | `doc-mine.md` | 7, 13 | empty | 5 | 0 | 174 | 0 | 0 | 0 | 179 | 1 |

With the empty allow file, the raw hit lists of the untouched copy and of each mine copy agree hit for hit: 179 each,
0 added and 0 removed. They were compared by (check, text) with line numbers normalised (`dc-diff1.txt`,
`dc-diff2.txt`, both empty). The three sub-changes therefore add no hit and need no allow row, and every default-allow
run exits 0.

## 5 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed):

* the live and archive hashes, with the live files unchanged through the lane (hashed at the start and at the end);
* the three determinism block bodies equal to their live text byte for byte (`blockcmp.py`);
* the 24-hunk line diff with only VDR-01's and VDR-02's insertions in §5–§7, and J-A20.74's two substitutions the only
  rationale change of this part (`wdiff-r2-*.txt`);
* the 40 required texts present once and the 22 retired texts absent (`probe2.py`), and round 2's four sub-changes
  transcribed exactly from verify-determinism-r1 §3 (`transcribe.py`);
* references (refs.py) on the live file and on the proposed copy;
* the deferral probe;
* the sweep for the lapse-undo clause;
* each §3 anchor once (`anchors.py`), and the scratch application of all three sub-changes (`proposed2.py`);
* the document checks of §4.

**PLAUSIBLE** (reading, for the Fable review):

* the triggers of VDH2-01 and VDH2-02: a hand designation change on a building that houses households, whose new class
  leaves it no residential slot or a lower `households.max`;
* that "inverse" rows leave re-homed households moved, the closing ruling's reading of VD3-08, which VDH2-01 applies to
  the designation rows;
* that T18-1 is an event-level bar (its "(the locality oracle)" says so) rather than a bound on the mutator's own writes;
* the two rulings of §2 that §5.3's capacity row and T18-3 need no change;
* that the required changes, once applied, add no new defect.

## Files

* `docs/validation/amendments-b/handfix/verify-determinism-r2.md` — this report.
* Scratchpad (session-local) `handfix/vd2/`:
  * `blockcmp.py`, `wdiff.py`, `wdiff-r2-s5-7.txt`, `wdiff-r2-all.txt` and `wdiff-rat-r2.txt`: the block-body check and
    the word diffs;
  * `probe2.py` with `probe2.out`, and `transcribe.py`: the presence probe and the transcription check;
  * `lines.py`, `deferral.py` and `anchors.py`: the line locator, the deferral probe and the anchor check;
  * `refs-live.*` and `refs-mine*.*`: the reference resolver's output;
  * `proposed2.py`, `doc-mine2.md` and `doc-untouched.md`: the required changes on a scratch copy (`proposed.py` and
    `doc-mine.md` hold the first wording of VDH2-02 (1));
  * `dc.sh`, `dc2.sh`, `dc-*.txt`, `dc2-*.txt`, `dc-exits.txt`, `dc2-exits.txt` and `dc-diff*.txt`: the document
    checks.
