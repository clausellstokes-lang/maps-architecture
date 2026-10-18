# handfix-b/verify-determinism-r0 — the DETERMINISM part's hand fixes, verified

> PENDING FABLE REVIEW — Opus-produced (handfix-b/verify-determinism-r0).

PROGRESS (kill-safe ledger; a seat that continues this lane reads it first)
ITEM read: planned closing-report §2 (determinism-owned + edits in §5/§6/§7), §3, handfix/apply.md | done (12 determinism-owned: #3, #6, #8, #9, #10, #11, #12, #22, #24, #25, #26, #27; other parts editing §5-§7: #7 VR3-01 (2), (3))
ITEM diff: planned archive vs live diff of §5, §6, §7 and the touched index / Part A rows | done (live 5d752c9b… / 61477508… = apply.md's after-hashes; 17 hunks in §5-§7)
ITEM per-fix: planned PRESENT / PARTIAL / MISSING / MISAPPLIED for each fix, quoted | done (26 sub-texts PRESENT once each, 11 retired texts absent; script scratchpad vd-check.py)
ITEM checks: planned no-other-change, single source, references, deferral wording, owner rules (item 20) | done (no other change; refs 2 pre-existing external; 0 deferral hits; item 20 held; 6 issues: VDH-01..06)
ITEM doc-checks: planned three-copy method on the proposed texts (this seat edits no design file) | done (subsection and top-level runs: the §3 changes add 0 hits, exit 0; one first-wording C3 hit reworded away)
ITEM close-out: planned queue row, LANDED line | done (row B-handfix-b/verify-determinism-r0; LANDED line)

Lane `handfix-b/verify-determinism-r0`, 2026-09-27, opus verifier. Judged: `docs/ARCHITECTURE.md` sha256 `5d752c9b…`
(13 021 lines) and `docs/ARCHITECTURE-RATIONALE.md` sha256 `61477508…` (2 052 lines) — the hashes handfix-b/apply
wrote — against the read-only archive `docs/archive/ARCHITECTURE(-RATIONALE)-pre-handfix-b-2026-09-27.md`
(`1a861c72…` / `8a24a5a7…`). This seat edits no design text.

## Outcome

* **Every determinism fix is PRESENT exactly as required, once, at the right place; none is PARTIAL in its wording,
  MISSING or MISAPPLIED.** 12 determinism-owned fixes (26 sub-texts) plus VR3-01 (2) and (3), which edit §7.1 and
  §5.2, were checked by an independent whitespace-normalised script: each required new text occurs once and each
  retired text occurs 0 times live and once in the archive.
* **Nothing else in §5, §6 or §7 changed.** A word-level diff of the archive against the live file finds 17 hunks in
  §5–§7, each one of the required texts; the rest of the diff there is soft-break whitespace.
* **References resolve** (refs.py: 139 headings, 471 J ids, 2 flags, both the pre-existing outside citations). **No
  deferral wording** in any added text. **Item 20 holds** on every touched path: F-SITING, F-EDIT, §5.3, §7.7 item 2
  and the capacity re-homing never take a dossier element or a dossier-roster household off a map.
* **Six issues, all minor, none needing the owner** (§3): four where a fix's own claim is not fully closed or the new
  text leaves a neighbouring sentence stale (VDH-01, VDH-03, VDH-05, VDH-06), one new scope gap between two applied
  fixes (VDH-04: VP3-01's re-provision against V-MAB3-09's scope clause), and one scope-owned test that VD3-04 made
  unsatisfiable (VDH-02, T20-2). Owners: determinism 5, scope 1. Each has one required change whose old strings occur
  exactly once in the live file (script), and all ten sub-changes apply cleanly to a scratch copy.

## 1 Per-fix verdicts

Live line numbers; "retired" = the old text, 0 live / 1 archive. Quotes are the live text.

| # | id | sub | verdict | live text (quoted) | line |
|---|---|---|---|---|---|
| 3 | VD3-01 | (1) ladder | PRESENT | "no re-cut after S11 — never a household of a dossier's roster (§7.7 item 2), whose housing §4.7 re-provides inside its district by the `dossier` request, which always places (J-A20.42) —" | 5633 |
| 3 | VD3-01 | (2) test | PRESENT, retired | "every household S2 demanded housed or reported unplaced, and every household of a dossier's roster housed (§13.2 T19-4)" | 5633 |
| 6 | V-MAB3-08 | (i) §7.3 item 4 | PRESENT, retired | "with their lifecycle events; every edit's report lists the households §2.6's capacity rule re-homes, each with its `relocate` event (from and to), the residential slots §4.7 builds to re-provide a dossier household's housing, and the names it re-draws" (see VDH-04) | 6887 |
| 6 | V-MAB3-08 + VR3-01 (3) | (ii) F-EDIT | PRESENT (one insertion, as ruled) | "a hand edit whose capacity re-homing cannot place its excess — locked or pinned households alone above the new capacity, or a household of no dossier's roster that no residential building of the district has room for (§2.6's capacity rule); a heights edit that would leave a base wing spanning a passage below two floors (§2.5 `Passage.headroomCm`; item 30);" | 5641 |
| 7 | VR3-01 | (2) §7.1 | PRESENT | "`Passage.headroomCm` is derived — S11 writes it with the spanning wings' `spans` (§2.5) — and has no edit kind of its own;" (satisfies §2.8's "declared derived (§7.1)") | 6547 |
| 8 | VD3-05 | §5.3 row | PRESENT, after the interior-ladder row | "\| no building houses more households than its capacity: `Building.households ≤ capacity(b)` … \| batch-local (…, and the receivers of its re-homing); stage-end (S11 per district after the overflow pass; each `epoch` event; a §7.6 table edit's re-derived set) \| the capacity function recomputed on the touched buildings against `Building.households` \|" (3 cells, the table's count) | 5666 |
| 9 | VD3-06 | §7.1 | PRESENT, retired | "an edit that lowers a building's capacity below its households — any change §2.6's capacity rule lists — re-homes the excess by that rule, each move among its fates (§7.3 item 4);" | 6555 |
| 10 | VD3-07 | §7.3 stored-plan row | PRESENT | "— a `relet`, a household moved in or out (§4.7's overflow pass, §2.6's capacity re-homing, item 17's relocation, §10.3), an occupants' band change at an epoch, a designation mutation (item 28 (f))" | 6747 |
| 11 | VD3-08 | (1) setAttr undo | PRESENT (at the cell's end, as located) | "the text it replaces kept in that event's undo record; a `setAttr` of heights or class that re-homed households keeps their former buildings in its undo record, which its undo restores (§2.6)" (claim partly open: VDH-03) | 6978 |
| 11 | VD3-08 | (2) moveVertex / warp | PRESENT | "former bases of re-based entities, and the households §2.6's capacity rule re-homed, with their former buildings" | 6979 |
| 11 | VD3-08 | (3) editTable | PRESENT | "never re-drawn; the households its capacity re-homing moved restored to their former buildings" | 6995 |
| 12 | V-MAB3-09 | §7.3 item 1 | PRESENT, retired | "an edit that lowers a building's capacity below its households holds that building and the buildings §2.6's capacity rule re-homes its households into." (see VDH-04) | 6694 |
| 22 | VD3-10 | §6.3 | PRESENT | "A block's `Frontage` record (§2.5) that the same split cuts at a stretch end (II.6) follows the same rule: the part holding the record's first kerb edge in the centreline's order keeps its address, the other takes an address minted …, and an `undo` restores the one record (§7.4)." (see VDH-05) | 6202 |
| 24 | VD3-03 | (1) §7.7 item 2 | PRESENT, retired | "§4.11's *Dossier content across epochs* relocates it first, or keeps it in its building, wherever a step would close it or empty or remove that building —" | 7394 |
| 24 | VD3-03 | (2) J-A20.75 index | PRESENT, retired | "— §4.11 relocates it first or keeps it in its building (J-A20.43) —" | 12940 |
| 24 | VD3-03 | (3) J-A20.75 Part A | PRESENT | "§4.11 relocates the use first, or keeps it in its building where no candidate plot exists (J-A20.43)" | rat 480 |
| 25 | VD3-04 | (1) Replay semantics | PRESENT (claim partly open: VDH-01, VDH-02) | "Every later dossier event (`EditBase.dossier` set, §7.7 item 1) is likewise no `undo`, `redo` or `revert` target of a map event: … an `epoch` that carried one in `EpochInputs.dossier` is refused as an `undo` target the same way, because undoing either would change dossier content without a dossier instruction (item 20 (c))." | 6971 |
| 25 | VD3-04 | (2) Targets | PRESENT | "other than a `creation` event, a dossier event or an epoch that carried one (above)" | 7035 |
| 25 | VD3-04 | (3) revert comment | PRESENT, retired | "never a `creation` or dossier event, §7.4" | 6447 |
| 25 | VD3-04 | (4) §7.7 item 6 | PRESENT, retired | "they fold only inside the epoch and are never undo targets, and neither is the epoch that carries them (§7.4)" | 7437 |
| 25 | VD3-04 | (5) F-EDIT detection | PRESENT | "an `undo` naming a `creation` event, a dossier event or an epoch that carried one (§7.4)" | 5641 |
| 25 | VD3-04 | (6) J-A22.76 index | PRESENT, retired | "are never undo targets, and the epoch that carries them is none either (item 20 (c); verify-determinism-r3 VD3-04)" | 12967 |
| 25 | VD3-04 | (7) J-A22.76 Part A | PRESENT, retired | "never make them undo targets, nor the epoch that carries them, since undoing either would change dossier content without a dossier instruction (item 20 (c); verify-determinism-r3 VD3-04)" | rat 507 |
| 26 | VD3-09 | (1) F-PLAN tier 2 | PRESENT | "where that order holds no further candidate, the anchor goes to tier 6 — a chimney stack omitted, its hearth room kept and reported; a stair bay's upper storeys left unreached — the bar failing and the building flagged;" | 5635 |
| 26 | VD3-09 | (2) J-A28.73 Part A | PRESENT (index row stale: VDH-06) | "An anchor whose filtered order is exhausted takes tier 6, reported and flagged, never an abort, because the exhaustion is the building's geometry, not a bug (verify-determinism-r3 VD3-09)." | rat 506 |
| 27 | VP3-08 | J-A28.51 Part A | PRESENT, retired | "tier 6 never reaching a unit because the generation fill (§4.7: S10b's placement, S11's clamped write and its overflow pass), `relet` and §2.6's re-homing keep the count within §2.6's capacity" | rat 336 |

## 2 The checks

* **No other text changed** in the touched subsections (§5.2, §5.3, §6.3, §7.1, §7.3, §7.4, §7.7) or the touched rows
  (J-A20.75, J-A22.76 index and Part A; J-A28.51, J-A28.73 Part A): the word-level diff's 17 §5–§7 hunks are the
  required texts above; the §7.4 Replay-semantics and Targets lines are now long unwrapped lines (soft-break joins),
  which render identically.
* **Single source kept.** The new texts point to their homes: F-SITING and §7.7 item 2 to §4.7's re-provision; §7.1 to
  §2.6's list (VD3-06 removed the partial second list); §7.1's `revert` comment, §7.4 Targets, §7.7 item 6 and F-EDIT to
  §7.4's Replay semantics; §7.7 item 2's gloss of §4.11 now matches its home (J-A20.43). The §5.3 row restates §2.6's
  bound as an invariant with its check, as every §5.3 row does. The per-row undo clauses of VD3-08 are per-kind
  lifecycle cells, the table's own design.
* **References.** refs.py over the live document: 139 headings, 35 D ids, 471 J ids, 2 flags — `os-geometry.md`
  §2.1.4 and RFC 7946 §3.1.6, both pre-existing outside citations. Every pointer in the added texts resolves: §7.7
  items 1, 2, 6; §13.2 T19-4 (defined once); J-A20.42, J-A20.43, J-A28.23, J-A28.46; §2.5 `Passage.headroomCm`;
  `EpochInputs.dossier` (§4.11's interface); II.6; §10.3.
* **No deferral wording.** Probe over every added text (TBD, to be decided / determined, open question, defer, decide
  later, later pass / round, TODO, FIXME, left open, future): 0 hits.
* **Owner rules (item 20).** A dossier-roster household that no building of its district holds is re-provided, never
  dropped: F-SITING's ladder excludes it and its test demands it housed; §2.6's hand-edit refusal and F-EDIT name only
  households of no dossier's roster; §5.3's dossier row ("F-SITING never drops it") and §7.7 item 2 agree. An epoch never
  closes or unhouses a dossier-backed use (§7.7 item 2 now matches §4.11). Refusing the undo of a dossier event and of an
  epoch that carried one keeps item 20 (c). No touched text lets an epoch, an edit or a solver rung remove a dossier
  element or a dossier-roster household.

## 3 Issues (owner part · severity · kind)

### VDH-01 — determinism · minor · partial (VD3-04's claim not closed where it pointed)

**Claim (CONFIRMED on the text).** VD3-04's claim quoted §7.4's assign / unassign row, whose undo cell still gives "a
dossier event among them" the ordinary undo ("the inverse mutation from the undo record … and the former placements");
the fix put the rule in Replay semantics but left that cell. Three more sentences now contradict or under-state the new
rule: §7.4's Independence bullet still promises "an owner may undo through a chain", which cannot pass a dependent
dossier event or an epoch that carried one; §5.2 F-EDIT's detection names the new refusals, but its ladder lists the
offered actions for an `undo` of a `creation` event only; and Replay semantics offers "`rejectSite` and `placeAt`" for
every refused dossier event, though a dossier `unassign` leaves no element to reject or re-place.

**Required change.** (1) §7.4 Replay semantics: replace "and an `undo(h, of)` naming it returns F-EDIT offering
`rejectSite` and `placeAt`;" with "and an `undo(h, of)` naming it returns F-EDIT offering `rejectSite` and `placeAt` for
each dossier element it placed or re-designated (a dossier `unassign` leaves none to offer);". (2) §7.4's assign /
unassign row, undo cell: replace "the inverse mutation from the undo record (§4.7 S11 rule 5) and the former
placements" with "the inverse mutation from the undo record (§4.7 S11 rule 5) and the former placements — for an event
that is neither a `creation` event nor a dossier event, which are no undo targets (Replay semantics, above)". (3) §7.4
Independence bullet: replace "the session may undo its own dependent events first (each its own `undo`), and an owner
may undo through a chain." with "the session may undo its own dependent events first (each its own `undo`), and an owner
may undo through a chain — never through a dossier event or an epoch that carried one, which are no undo targets
(Replay semantics, above), so a target one of them depends on stays live.". (4) §5.2 F-EDIT, ladder cell: replace "in
place of an `undo` of a `creation` event `unassign` (a blueprint assignment) or `rejectSite` and `placeAt` (a dossier
element; §7.4)" with "in place of an `undo` of a `creation` event `unassign` (a blueprint assignment) or `rejectSite`
and `placeAt` (a dossier element), and in place of an `undo` of a later dossier event or of an epoch that carried one
`rejectSite` and `placeAt` for each dossier element it placed or re-designated (§7.4)". Apply with VDH-02.

### VDH-02 — scope · minor · conflict (a test VD3-04 made unsatisfiable)

**Claim (CONFIRMED on the text).** §13.2 T20-2 requires, for both its clauses, that "an undo of the lapsing event
restores the hold"; its dossier-event clause's lapsing event is a dossier event, which §7.4 now refuses as an undo
target (VD3-04), so a correct build fails T20-2.

**Required change.** §13.2 T20-2: replace "and an undo of the lapsing event restores the hold; (T20-3)" with "and an
undo of a lapsing epoch that carried no dossier event restores the hold, while an `undo` naming a lapsing dossier event
returns F-EDIT (§7.4); (T20-3)". Apply with VDH-01.

### VDH-03 — determinism · minor · partial (VD3-08's claim not closed for the brush)

**Claim (CONFIRMED on the text; trigger PLAUSIBLE).** §2.6 promises that a hand edit's undo restores the households
its capacity re-homing moved, and its list includes "a rewrite of the plot's `builtBand` (J-A31.44's paths)", which a
field brush makes (§7.4's `builtBand` row: "`Adjust` and a brush reset it in their scope"). Every other capacity-lowering
row now restores them — by the three VD3-08 clauses, or by §7.4 Application's scope record, which holds the receivers
through §7.3 item 1 — but the setField row's undo is a re-run ("the operator re-runs on the stroke's region"), which does
not return households re-homed into buildings outside the stroke's region.

**Required change.** §7.4's setField (brush) row, undo cell: replace "the stroke leaves the list; the field or
heightfield re-composites (exact) and the operator re-runs on the stroke's region" with "the stroke leaves the list; the
field or heightfield re-composites (exact) and the operator re-runs on the stroke's region; the households §2.6's
capacity rule re-homed restored to their former buildings from its undo record (§2.6)".

### VDH-04 — determinism · minor · new-problem (VP3-01's re-provision against V-MAB3-09's scope clause)

**Claim (CONFIRMED on the text; trigger PLAUSIBLE — on a dossier map every roster household is a dossier household,
so a hand edit in a full district takes this path).** §4.7's new re-provision houses a dossier household that no
building has room for by S10b's `dossier` request in the post-build least-disruption order — a vacant plot, an
under-used plot, a plot whose use moves, a JOIN — and S11 builds a residential slot there, "a hand edit's among its
dry-run fates (§7.3 item 4)". But §7.3 item 1 holds only "that building and the buildings §2.6's capacity rule re-homes
its households into", so a hand edit that triggers the re-provision writes the site's joined neighbour and a displaced
use's new site outside its effective scope (oracle (ii) fails); and §7.3 item 4 lists the built slots but not the
displacements and joins that §4.7 sends there.

**Required change.** (1) §7.3 item 1: replace "below its households holds that building and the buildings §2.6's
capacity rule re-homes its households into." with "below its households holds that building, the buildings §2.6's
capacity rule re-homes its households into and, where §4.7 re-provides a dossier household's housing, the plots its
`dossier` request touches — the site, its joined neighbour if any, and each displaced use's new site — bounded as a
dossier event's scope is (above).". (2) §7.3 item 4: replace "the residential slots §4.7 builds to re-provide a dossier
household's housing," with "the residential slots §4.7 builds to re-provide a dossier household's housing, with the
uses that re-provision displaces and the plots it joins,".

### VDH-05 — determinism · minor · new-problem (VD3-10's sentence covers a two-part split only)

**Claim (CONFIRMED on the text; the three-part case follows from II.6's widening rule, its frequency PLAUSIBLE).**
II.6 widens a stretch only to plot-frontage breaks, so a block's `Frontage` record
can span both ends of an interior stretch and is then split at each end into three parts ("the part beyond the end a
new record", once per end). §6.3's new sentence says "the other takes an address", as if there were two parts; the
tunnel sentence before it says "the other parts".

**Required change.** §6.3 JOIN and SPLIT bullet: replace "the other takes an address minted from the causing event's
`seq` and ordinal, each part continues the record's lineage with its part index" with "every other part — two where the
record spans a whole interior stretch — takes an address minted from the causing event's `seq` and ordinal, each part
continues the record's lineage with its part index".

### VDH-06 — determinism · minor · stale (J-A28.73's index row after VD3-09)

**Claim (CONFIRMED on the text).** VD3-09 ruled, in J-A28.73's Part A, that an anchor whose filtered order is
exhausted goes to tier 6 (reported, flagged), never an abort — a vetoable call. The index row, where the owner reviews
calls, still says only that a refused stair bay or chimney stack "is re-placed in the same attempt by a deterministic
move".

**Required change.** J-A28.73's index row: replace "a stair bay or chimney stack is re-placed in the same attempt by a
deterministic move," with "a stair bay or chimney stack is re-placed in the same attempt by a deterministic move, or
taken by tier 6 (reported, the building flagged) where its filtered order holds no further candidate,".

**Anchors.** Each old string above occurs exactly once in the whitespace-normalised live document (script); the ten
sub-changes were applied in the order VDH-01 … VDH-06 to a scratch copy by a matcher that lets a single space match one
soft line break, each new text found once after (scratchpad `handfix/vd-proposed.py`).

## 4 Document checks

This seat edits no design file, so the live document is at once the untouched and the combined copy; "mine" is a
scratch copy with the ten required sub-changes of §3 applied (`vd-proposed.py`). One corpus snapshot: the untouched copy
was run before, between and after the others with identical counts, so the corpus held still.

| keys | untouched (= live) | mine (the §3 changes applied) |
|---|---|---|
| changed subsections: 5.2, 6.3, 7.3, 7.4, 13.2, Judgment calls | C1 5 / C2 0 / C3 178 / C4 2 / S1 0 / S2 0, 0 unreviewed, exit 0 | the same counts, 0 unreviewed, exit 0 |
| top-level: 5, 6, 7, 13, Judgment calls | C1 5 / C2 0 / C3 358 / C4 3 / S1 0 / S2 0, 0 unreviewed, exit 0 | the same counts, 0 unreviewed, exit 0 |

VDH-05's first wording ("spans both ends of an interior stretch") added one C3 hit, the run "both ends of an interior";
it was reworded to "spans a whole interior stretch" (the text in §3), after which the change adds no hit and needs no
allow row.

## 5 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed): the live and archive hashes; the 26 required texts present once and the 11 retired texts
absent (vd-check.py); the 17 §5–§7 hunks and nothing else (word-level diff); references (refs.py); the deferral probe;
the anchors of §3 once each and the scratch application of all ten sub-changes; the document checks of §4.
**PLAUSIBLE** (reading): the triggers of VDH-03 (a brush lowering a capacity) and VDH-04 (a hand edit reaching the
re-provision), and that the six required changes, once applied, add no new defect.

## Files

* `docs/validation/amendments-b/handfix/verify-determinism-r0.md` — this report.
* Scratchpad (session-local): `handfix/vd-check.py` (presence probe), `handfix/vd-wdiff.py` (word diff),
  `handfix/vd-proposed.py` (the required changes on a scratch copy), `handfix/vd-dc-*.txt` (document checks).
