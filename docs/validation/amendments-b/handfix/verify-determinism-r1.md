# handfix-b/verify-determinism-r1 — the DETERMINISM part's fixes after repair round 1, verified

> PENDING FABLE REVIEW — Opus-produced (handfix-b/verify-determinism-r1).

PROGRESS (kill-safe ledger; a seat that continues this lane reads it first)
ITEM read: planned closing-report §2 (determinism-owned + edits in §5/§6/§7), §3, handfix/apply.md, verify-determinism-r0, repair-r1-*.md + reports, assemble-r1.md | done (live e9c0b828… / dcabf14b…; §5.2, §6.3, §7.1, §7.3, §7.4, §7.7 read whole)
ITEM diff: planned archive pre-handfix-b-repair-r1 (5d752c9b…) vs live (e9c0b828…) in §5, §6, §7 + touched index / Part A rows; and pre-handfix-b (1a861c72…) vs live for the r0 fixes | done (11 hunks in §5-§7, all required texts; 5 REPLACE bodies = live sections exactly, H1 applied; J-A28.73 row once; no determinism Part A change)
ITEM per-fix: planned PRESENT / PARTIAL / MISSING / MISAPPLIED for the r0 fixes (still present) and the r1 fixes, quoted | done (probe.py: 55 probes OK — 36 new texts once, 19 retired texts 0)
ITEM checks: planned no-other-change, single source, references, deferral wording, owner rules (item 20) | done (refs 2 pre-existing external; deferral 0; item 20 held; 3 minor issues VDR-01..03, all determinism)
ITEM doc-checks: planned three-copy method on scratch copies with VDR-01..03 applied (this seat edits no design file) | done (0 added hits, exit 0; VDR-02's first placement extended a reviewed C3 run and was moved)
ITEM close-out: planned queue row, LANDED line | done (row B-handfix-b/verify-determinism-r1; LANDED line)

Lane `handfix-b/verify-determinism-r1`, 2026-09-27, opus verifier. Judged: `docs/ARCHITECTURE.md` sha256 `e9c0b828…`
(13 021 lines) and `docs/ARCHITECTURE-RATIONALE.md` sha256 `dcabf14b…` (2 053 lines) — the hashes handfix-b/assemble-r1
installed — against the read-only archives `docs/archive/ARCHITECTURE(-RATIONALE)-pre-handfix-b-repair-r1-2026-09-27.md`
(`5d752c9b…` / `61477508…`, the state verify-determinism-r0 judged) and `…-pre-handfix-b-2026-09-27.md` (`1a861c72…` /
`8a24a5a7…`, before the hand fix). This seat edits no design text.

## Outcome

* **Every determinism fix is PRESENT exactly as required, once, at the right place; none is PARTIAL in its wording,
  MISSING or MISAPPLIED.** That covers the twelve determinism-owned hand fixes of closing-report §2 (#3, #6, #8–#12,
  #22, #24–#27) with VR3-01 (2), (3), which still stand after round 1, and round 1's determinism repairs: VDH-01 (1)–(6),
  VDH-03, VDH-04 (1), (2), VDH-05 and VDH-06. It also covers the other parts' changes that land in this part's sections:
  the model seat's H1 (§7.3 item 1) and its §7.1 rewrites (VHM-01 (2), VHM-02 (3)), and the scope seat's VDH-02 (T20-2),
  which cites §7.4. An independent whitespace-normalised probe (`probe.py`) finds all 36 required texts once and all 19
  retired texts 0 times; the texts round 1 superseded (V-MAB3-09's, VD3-10's, VR3-01 (2)'s r0 wording) are absent.
* **Nothing else in §5, §6 or §7 changed.** Word-level diff of the round-1 archive against the live file: 11 hunks in
  §5–§7, each a required text. Each of the five determinism REPLACE bodies equals its live subsection byte for byte
  (§7.3's with H1 applied); every other subsection of §5–§7 equals the archive's; J-A28.73's index row is present once,
  in its old place; no determinism Part A entry changed in round 1.
* **References resolve** (refs.py: 139 headings, 35 D ids, 472 J ids, 2 flags — the pre-existing outside citations).
  **No deferral wording** in any text round 1 added. **Item 20 holds**: no touched text lets an epoch, an edit or a
  solver rung remove a dossier element or a dossier-roster household, and VDH-01's refusals keep item 20 (c).
* **Three issues, all minor, all determinism, none needing the owner** (§3). Two are lifecycle legs round 1 left open
  next to its own fixes: §5.2's F-EDIT ladder still offers "the dependent events to undo first" when one of them is a
  dossier event, which VDH-01 (3) makes no undo target (VDR-01); and no text restores, on undo, the plots VDH-04 put in
  a capacity-lowering edit's scope — the residential slot §4.7's re-provision builds, the use it displaces, the plots it
  joins — for rows whose undo is an inverse or a re-run (VDR-02). One is a stale Part A clause (J-A20.74) that the
  repair seat left as history (VDR-03). Each has one required change whose old strings occur exactly once (script); all
  four sub-changes apply to scratch copies and add no document-check hit (§4).

## 1 Per-fix verdicts

Live line numbers (document unless marked rat). "Retired" = the superseded text is absent from the live file.

| # | id | sub | verdict | live text (quoted) | line |
|---|---|---|---|---|---|
| 3 | VD3-01 | (1) ladder | PRESENT | "no re-cut after S11 — never a household of a dossier's roster (§7.7 item 2), whose housing §4.7 re-provides inside its district by the `dossier` request, which always places (J-A20.42)" | 5632 |
| 3 | VD3-01 | (2) test | PRESENT, retired | "every household S2 demanded housed or reported unplaced, and every household of a dossier's roster housed (§13.2 T19-4)" | 5632 |
| 6 | V-MAB3-08 | (i) §7.3 item 4 | PRESENT (with VDH-04 (2)), retired | "every edit's report lists the households §2.6's capacity rule re-homes, each with its `relocate` event (from and to), the residential slots §4.7 builds to re-provide a dossier household's housing, with the uses that re-provision displaces and the plots it joins, and the names it re-draws" | 6886 |
| 6 | V-MAB3-08 + VR3-01 (3) | (ii) F-EDIT detection | PRESENT | "a hand edit whose capacity re-homing cannot place its excess — locked or pinned households alone above the new capacity, or a household of no dossier's roster that no residential building of the district has room for (§2.6's capacity rule); a heights edit that would leave a base wing spanning a passage below two floors (§2.5 `Passage.headroomCm`; item 30);" | 5640 |
| 7 | VR3-01 | (2) §7.1 | PRESENT as widened by the model seat (VHM-01 (2), VHM-02), r0 wording retired | "`Passage.headroomCm` and `Passage.frontBuilding` are derived — S11 writes them with the spanning wings' `spans`, a heights edit of a spanning wing re-derives the headroom, and the event that makes the front building a footprint trace or a tombstone clears `frontBuilding` (§2.5's `Passage`, §2.6's `BaseWing.spans`) — and have no edit kind of their own;" | 6546 |
| 8 | VD3-05 | §5.3 row | PRESENT, §5.3 unchanged in round 1 | "\| no building houses more households than its capacity: `Building.households ≤ capacity(b)` … \| the capacity function recomputed on the touched buildings against `Building.households` \|" | 5665 |
| 9 | VD3-06 | §7.1 | PRESENT, retired | "an edit that lowers a building's capacity below its households — any change §2.6's capacity rule lists — re-homes the excess by that rule, each move among its fates (§7.3 item 4);" | 6554 |
| 10 | VD3-07 | §7.3 stored-plan row | PRESENT | "— a `relet`, a household moved in or out (§4.7's overflow pass, §2.6's capacity re-homing, item 17's relocation, §10.3), an occupants' band change at an epoch, a designation mutation (item 28 (f))" | 6746 |
| 11 | VD3-08 | (1) setAttr | PRESENT | "a `setAttr` of heights or class that re-homed households keeps their former buildings in its undo record, which its undo restores (§2.6)" | 6977 |
| 11 | VD3-08 | (2) moveVertex / warp | PRESENT | "former bases of re-based entities, and the households §2.6's capacity rule re-homed, with their former buildings" | 6978 |
| 11 | VD3-08 | (3) editTable | PRESENT | "never re-drawn; the households its capacity re-homing moved restored to their former buildings" | 6994 |
| 12 | V-MAB3-09 | §7.3 item 1 | PRESENT (with VDH-04 (1)), both earlier wordings retired | "an edit that lowers a building's capacity below its households holds that building, the buildings §2.6's capacity rule re-homes its households into and, where §4.7 re-provides a dossier household's housing, the plots its `dossier` request touches — the site, its joined neighbour if any, and each displaced use's new site — bounded as a dossier event's scope is (above)." | 6693 |
| 22 | VD3-10 | §6.3 | PRESENT (with VDH-05), r0 "the other takes" retired | "A block's `Frontage` record (§2.5) that the same split cuts at a stretch end (II.6) follows the same rule: the part holding the record's first kerb edge in the centreline's order keeps its address, every other part — two where the record spans a whole interior stretch — takes an address minted from the causing event's `seq` and ordinal, …, and an `undo` restores the one record (§7.4)." | 6201 |
| 24 | VD3-03 | (1) §7.7 item 2 | PRESENT, retired | "§4.11's *Dossier content across epochs* relocates it first, or keeps it in its building, wherever a step would close it or empty or remove that building —" | 7393 |
| 24 | VD3-03 | (2) J-A20.75 index | PRESENT, retired | "— §4.11 relocates it first or keeps it in its building (J-A20.43) —" | 12939 |
| 24 | VD3-03 | (3) J-A20.75 Part A | PRESENT | "§4.11 relocates the use first, or keeps it in its building where no candidate plot exists (J-A20.43)" | rat 480 |
| 25 | VD3-04 | (1) Replay semantics | PRESENT (with VDH-01 (1)) | "Every later dossier event (`EditBase.dossier` set, §7.7 item 1) is likewise no `undo`, `redo` or `revert` target of a map event: … an `epoch` that carried one in `EpochInputs.dossier` is refused as an `undo` target the same way, because undoing either would change dossier content without a dossier instruction (item 20 (c))." | 6970 |
| 25 | VD3-04 | (2) Targets | PRESENT | "other than a `creation` event, a dossier event or an epoch that carried one (above)" | 7034 |
| 25 | VD3-04 | (3) `revert` comment | PRESENT, retired | "never a `creation` or dossier event, §7.4" | 6446 |
| 25 | VD3-04 | (4) §7.7 item 6 | PRESENT, retired | "they fold only inside the epoch and are never undo targets, and neither is the epoch that carries them (§7.4)" | 7436 |
| 25 | VD3-04 | (5) F-EDIT detection | PRESENT | "an `undo` naming a `creation` event, a dossier event or an epoch that carried one (§7.4)" | 5640 |
| 25 | VD3-04 | (6) J-A22.76 index | PRESENT, retired | "are never undo targets, and the epoch that carries them is none either (item 20 (c); verify-determinism-r3 VD3-04)" | 12966 |
| 25 | VD3-04 | (7) J-A22.76 Part A | PRESENT, retired | "never make them undo targets, nor the epoch that carries them, since undoing either would change dossier content without a dossier instruction (item 20 (c); verify-determinism-r3 VD3-04)" | rat 507 |
| 26 | VD3-09 | (1) F-PLAN tier 2 | PRESENT | "where that order holds no further candidate, the anchor goes to tier 6 — a chimney stack omitted, its hearth room kept and reported; a stair bay's upper storeys left unreached — the bar failing and the building flagged" | 5634 |
| 26 | VD3-09 | (2) J-A28.73 Part A | PRESENT | "An anchor whose filtered order is exhausted takes tier 6, reported and flagged, never an abort, because the exhaustion is the building's geometry, not a bug (verify-determinism-r3 VD3-09)." | rat 506 |
| 27 | VP3-08 | J-A28.51 Part A | PRESENT, retired | "tier 6 never reaching a unit because the generation fill (§4.7: S10b's placement, S11's clamped write and its overflow pass), `relet` and §2.6's re-homing keep the count within §2.6's capacity" | rat 336 |
| r1 | VDH-01 | (1) Replay semantics | PRESENT, retired | "and an `undo(h, of)` naming it returns F-EDIT offering `rejectSite` and `placeAt` for each dossier element it placed or re-designated (a dossier `unassign` leaves none to offer);" | 6970 |
| r1 | VDH-01 | (2) assign / unassign undo | PRESENT | "the inverse mutation from the undo record (§4.7 S11 rule 5) and the former placements — for an event that is neither a `creation` event nor a dossier event, which are no undo targets (Replay semantics, above)" | 6985 |
| r1 | VDH-01 | (3) Independence | PRESENT | "and an owner may undo through a chain — never through a dossier event or an epoch that carried one, which are no undo targets (Replay semantics, above), so a target one of them depends on stays live." (see VDR-01) | 7053 |
| r1 | VDH-01 | (4) F-EDIT ladder | PRESENT, retired | "in place of an `undo` of a `creation` event `unassign` (a blueprint assignment) or `rejectSite` and `placeAt` (a dossier element), and in place of an `undo` of a later dossier event or of an epoch that carried one `rejectSite` and `placeAt` for each dossier element it placed or re-designated (§7.4)" | 5640 |
| r1 | VDH-01 | (5) rejectSite / placeAt undo | PRESENT, retired | "an undo of a lapsing epoch that carried no dossier event restores the hold, while an `undo` naming a lapsing dossier event, or an epoch that carried one, returns F-EDIT (Replay semantics, above)" | 6986 |
| r1 | VDH-01 | (6) §7.7 item 3 | PRESENT, retired | "so no event is logged for the lapse, and an undo of a lapsing epoch that carried no dossier event restores the hold (a dossier event, or an epoch that carried one, is no undo target: §7.4; J-A20.74, with J-A20.41)." (Part A: see VDR-03) | 7405 |
| r1 | VDH-03 | setField undo | PRESENT | "the operator re-runs on the stroke's region; the households §2.6's capacity rule re-homed restored to their former buildings from its undo record (§2.6)" | 6993 |
| r1 | VDH-04 | (1) §7.3 item 1 | PRESENT | row 12 above (see VDR-02) | 6693 |
| r1 | VDH-04 | (2) §7.3 item 4 | PRESENT | row 6 (i) above | 6886 |
| r1 | VDH-05 | §6.3 | PRESENT, retired | row 22 above | 6201 |
| r1 | VDH-06 | J-A28.73 index | PRESENT, in place | "a stair bay or chimney stack is re-placed in the same attempt by a deterministic move, or taken by tier 6 (reported, the building flagged) where its filtered order holds no further candidate," | 12965 |
| model | H1 | §7.3 item 1 | PRESENT once | "an event that changes a spanning wing's heights, or makes its building a footprint trace or a tombstone, holds the passage it spans, whose `headroomCm` or `frontBuilding` it rewrites (§2.5's `Passage`, §2.6's `BaseWing.spans`);" | 6692 |
| model | VHM-02 (3) | §7.1 buildings row | PRESENT, retired | "each base wing's `spans` (written only by S11 when it builds or re-fits a passage's front building, and cleared by S11 or by the event that makes that building a footprint trace or a tombstone, §2.6)" | 6587 |
| scope | VDH-02 | §13.2 T20-2 | PRESENT, agrees with §7.4 and §7.7 item 3 | "and an undo of a lapsing epoch that carried no dossier event restores the hold, while an `undo` naming a lapsing dossier event returns F-EDIT (§7.4); (T20-3)" | 10333 |

## 2 The checks

* **No other text changed** in the touched subsections (§5.2, §6.3, §7.1, §7.3, §7.4, §7.7) or rows: the 11 §5–§7 hunks
  of the word diff are exactly the round-1 texts above (§7.1's two are the model seat's, §7.3's first is H1); §5.1,
  §5.3, §5.4, §6.1, §6.2, §6.4, §6.5, §7.2, §7.5, §7.6 and §7.8 equal the archive's; of the determinism index rows only
  J-A28.73 changed, in place; the rationale's round-1 changes (J-A28.26, J-A16.01, J-A28.46, J-A30.26) are other parts'.
* **Single source kept.** The dossier-undo rule has one home, §7.4's Replay semantics; the F-EDIT ladder, the assign and
  rejectSite rows, Independence and §7.7 items 3 and 6 each carry a short gloss that points to it. The re-provision's
  scope has one home (§7.3 item 1) and its fates one (§7.3 item 4); §4.7 keeps the mechanism. VDH-05 extends §6.3's one
  identity rule, which II.6 and T11-1 cite without restating. H1 states the passage's scope once, in §7.3 item 1.
* **References.** refs.py over the live document: 139 headings, 35 D ids, 472 J ids, 2 flags — `os-geometry.md` §2.1.4
  and RFC 7946 §3.1.6, both pre-existing outside citations. Every pointer in the round-1 texts resolves: "Replay
  semantics, above" (§7.4's opening paragraph, before the table and before Independence), §7.3 items 1 and 4, §4.7,
  §2.6's capacity rule, §6.3, §7.4, J-A20.74, J-A20.41, §2.5's `Passage`, §2.6's `BaseWing.spans`.
* **No deferral wording.** Probe over every text round 1 added (TBD, to be decided / determined, open question, defer,
  decide later, later pass / round, TODO, FIXME, left open, future, pending): 0 hits.
* **Owner rules (item 20).** VDH-04 widens a hand edit's scope to the plots §4.7's re-provision touches; the
  re-provision re-houses a dossier household and may move a use (a move, never a removal: J-A20.75). VDH-01 closes every
  path by which an `undo`, a `revert` or an owner's chain undo could roll back a dossier event or an epoch that carried
  one (item 20 (c)); a lapsed rejection stays lapsed where the lapsing event was a dossier event, as item 20 (b) lets a
  dossier change lapse it. VDH-06 records VD3-09's tier-6 ruling, under which a household unit is never dropped. H1 and
  the §7.1 rewrites clear a front building's spans only in an event §7.7 item 2 already refuses as a map event when the
  building houses a dossier-backed element. No touched text lets an epoch, an edit or a solver rung remove a dossier
  element or a dossier-roster household.
* **The repair seat's PLAUSIBLE items, ruled.** VDH-01 (5), (6) are complete in the document (§7.4's row, §7.7 item 3,
  and T20-2 agree), but J-A20.74's Part A still gives every lapsing event an undo (VDR-03). §7.4's epoch row promises no
  undo, so it needs no change. §11.3's M3a convergence test ("one owner undo through a chain among them") can pick a
  chain with no dossier event, so it stays satisfiable.

## 3 Issues (owner part · severity · kind)

### VDR-01 — determinism · minor · partial (VDH-01's claim not closed in §5.2's ladder)

**Claim (CONFIRMED on the text).** VDH-01 (3) states in §7.4's Independence that an owner may undo through a chain
"never through a dossier event or an epoch that carried one, which are no undo targets …, so a target one of them
depends on stays live"; a `redo` "is checked the same way". §5.2's F-EDIT ladder still answers "an `undo` or `redo`
whose target has dependent live events" with "the dependent events to undo first" for every dependent, so where one of
them is a dossier event (or an epoch that carried one) the dry run offers an action that §7.4's Replay semantics
refuses. VDH-01 (4) gave the ladder the actions for naming such an event, but not this case.

**Required change.** §5.2 F-EDIT, ladder cell: replace "the dependent events to undo first," with "the dependent
events to undo first, never a dossier event or an epoch that carried one (a target one of them depends on stays as it
is, §7.4's Independence),".

### VDR-02 — determinism · minor · partial (VDH-04's lifecycle not closed: the undo of the re-provision)

**Claim (CONFIRMED on the text; trigger PLAUSIBLE — on a dossier map every roster household is a dossier household,
so a capacity-lowering hand edit in a full district reaches the re-provision).** §4.7 re-provides a dossier
household's housing by the `dossier` request, and "S11's operator builds there a residential slot … in the same …
causing event"; VDH-04 put the plots that request touches into the edit's effective scope (§7.3 item 1) and its fates
(item 4). No text restores them on undo. The four capacity-lowering rows restore only the households: setAttr's undo is
the "inverse" with "their former buildings in its undo record", setField's re-runs "the operator … on the stroke's
region" (the re-provision site lies outside it), editTable's restores "the re-derived entities" and the households, and
moveVertex / warp's record lists the households. After such an undo the households are back in their former building,
while the residential slot built on the re-provision site stays with no household (§4.7: "never an empty residential
building"), a displaced use stays moved and a join stays joined, so the undo does not restore its target's scope (§7.4's
undo / redo row). §7.4's Application record would hold those plots now that they are in scope, but the rows whose undo
is an inverse or a re-run do not read it.

**Required change.** §7.4, Application bullet (its last sentence): replace "so from the restored state it reproduces
the target's result exactly." with "so from the restored state it reproduces the target's result exactly. An edit whose
capacity re-homing re-provides a dossier household's housing (§4.7) keeps in its undo record, whatever its row's undo,
the plots the re-provision touched (§7.3 item 1) — the site with the residential slot built there, its joined
neighbour, each displaced use's new site — and its undo restores them with the households it re-homed." This is one
statement at the undo record's home, so the four row cells need no second copy. (The old string crosses one soft line
break in the file.)

### VDR-03 — determinism · minor · stale (J-A20.74's Part A after VD3-04 and VDH-01)

**Claim (CONFIRMED on the text).** J-A20.74's Part A still says the lapse is written "inside its own touched set so that
its undo restores the hold". Since VD3-04 and VDH-01 (5), (6), a lapsing dossier event, or an epoch that carried one, is
no undo target (§7.4, §7.7 item 3, T20-2), so the entry gives an undo §7.4 refuses. The repair seat left it as history
(its report §1, PLAUSIBLE). But Part A is the live record of the call, and the same kind of over-strong clause in
J-A20.75's and J-A28.51's entries was corrected by the hand fix (VD3-03 (3), VP3-08).

**Required change.** RATIONALE-A restating J-A20.74 (restated-row swap; the index row unchanged): (1) replace "the lapse
written by that event inside its own touched set so that its undo restores the hold and the log gains no event" with
"the lapse written by that event inside its own touched set so that the log gains no event and its undo — where §7.4
admits one, an epoch that carried no dossier event — restores the hold"; (2) replace "`held.blockSeq` replaced by
`populationTarget`)." with "`held.blockSeq` replaced by `populationTarget`; the undo limited to what §7.4 admits by
handfix-b verify-determinism-r1 VDR-03)."

**Anchors.** Each old string occurs exactly once in its live file (the document for VDR-01 and VDR-02, the rationale
for VDR-03), found by a matcher that lets a single space match one soft line break. All four sub-changes were applied
in order to scratch copies, and each new text was found once afterwards (`proposed.py`).

## 4 Document checks

This seat edits no design file, so the live document is at once the untouched and the combined copy. "Mine" is a
scratch copy with the four sub-changes of §3 applied (`proposed.py`). One corpus snapshot was used: the untouched
subsection run, made before and after the others, gave identical output, and every run read 9 626 JSON files and
911 940 corpus 3-grams with the same 994 unreadable-JSON warnings.

| keys | untouched (= live) | mine (§3 applied) |
|---|---|---|
| changed subsections: 5.2, 7.4 | C1 5 / C2 0 / C3 66 / C4 2 / S1 0 / S2 0, 0 unreviewed, exit 0 (run twice) | the same counts, 0 unreviewed, exit 0 |
| top-level: 5, 7 | C1 5 / C2 0 / C3 169 / C4 3 / S1 0 / S2 0, 0 unreviewed, exit 0 | the same counts, 0 unreviewed, exit 0 |
| rationale Part A (VDR-03; `--heads` the document) | C3 283 / C4 6 / S2 17, the rationale's standing unreviewed set | the identical hit list (diff: 0 lines) |

VDR-02's first placement, directly after "never a copy of the model.", extended a reviewed C3 run into "a copy of the
model an edit". The sentence was moved to the end of the same bullet (the text in §3), after which the change adds no
hit and needs no allow row. The rationale is outside the allow file's regime, so its check is a comparison of the two
copies: VDR-03 adds and removes nothing.

## 5 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed): the live and archive hashes, with the live files unchanged through the lane (`cmp` at the
end); the 36 required texts present once and the 19 retired texts absent (`probe.py`); the five determinism REPLACE
bodies equal to their live subsections, the untouched §5–§7 subsections equal to the archive's, and the 11 §5–§7 hunks
(word diff); references (refs.py); the deferral probe; §3's anchors once each and the scratch application of all four
sub-changes; the document checks of §4.

**PLAUSIBLE** (reading): the triggers of VDR-01 (a dossier event depending on an undo's target) and VDR-02 (a
capacity-lowering hand edit reaching the re-provision on a dossier map); that the Application sentence closes VDR-02
for every row, since the rows whose undo is an inverse or a re-run now read the record for those plots; and that the
three required changes, once applied, add no new defect.

## Files

* `docs/validation/amendments-b/handfix/verify-determinism-r1.md` — this report.
* Scratchpad (session-local) `handfix/vd1/`:
  * `wdiff.py` and `wdiff-r1-*.txt`: the word diffs;
  * `probe.py` and `probe.out`: the presence probe;
  * `refs-live.*`: the reference resolver's output;
  * `proposed.py`, `doc-proposed.md` and `rat-proposed.md`: the required changes on scratch copies;
  * `dc-*.txt`: the document checks.
