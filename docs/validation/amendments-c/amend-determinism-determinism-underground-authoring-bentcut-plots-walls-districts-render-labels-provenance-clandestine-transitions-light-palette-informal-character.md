# Amendments c + d + e — seat E2 (determinism: §5, §6, §7 except §7.7) — report

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat amendments-c/amend-determinism-determinism-underground-authoring-bentcut-plots-walls-districts-render-labels-provenance-clandestine-transitions-light-palette-informal-character; queued in docs/FABLE-REVIEW-QUEUE.md.

> PROGRESS (kill-safe ledger; one line per item: planned sections | done blocks)
> READING: planned route §B/§C, amendments c/d/e items, critic rulings, §5–§7 whole, Fable blocks for §5–§7 | done (all read; sibling blocks A, B, C, D, K, T read where they touch §5–§7)
> ITEM 51: planned §5.1 REPLACE | done block 1 (§5.1)
> ITEM 52: planned §6.5 REPLACE (9) | done block 8 (§6.5)
> ITEM 66: planned §7.3 REPLACE (item 9 + operator row) | done block 11 (§7.3 items 9 and the operator row; Fable B-2 folded)
> ITEM 101: planned §7.1 REPLACE (the authoring toolkit paragraph), §7.2, §7.3 item 10, §7.4, §7.5, §7.8 | done block 9 (§7.1), block 10 (§7.2), block 11 (§7.3 item 10), block 12 (§7.4), block 13 (§7.5), block 15 (§7.8)
> REFERENCES: planned §5.2, §5.3, §5.4, §6.1, §6.2, §6.3, §7.2, §7.4, §7.5, §7.6, §7.8 | done blocks 2 (§5.2), 3 (§5.3), 4 (§5.4), 5 (§6.1), 6 (§6.2), 7 (§6.3), 8 (§6.5), 10 (§7.2), 11 (§7.3), 12 (§7.4; Fable B-1 folded), 13 (§7.5 APPEND), 14 (§7.6), 15 (§7.8)
> E1 FOLDS (§C.9.3): planned §7.1, §5.2, §5.3, §5.4, §6.1, §6.2, §6.3, §6.5 | done §5.2, §5.3, §5.4, §6.1, §6.2, §6.3, §6.5 (blocks 2–8); §7.1 (block 9)
> J-ROWS / RATIONALE-A: planned after the section blocks | done blocks 16 (J-ROWS, 24 rows) and 17 (RATIONALE-A, 24 entries)
> DOC CHECKS: planned dry runs on copies (mine, combined, untouched) | done (two wording passes, 49 rewords; residue 6 C3 hits, all proposed allow rows, §6)
> QUEUE ROW: planned at the end | done (docs/FABLE-REVIEW-QUEUE.md, 2026-09-28)


## 1. What this seat did

Seat E2 of the bundled pass c + d + e — the determinism part's second seat: §5 failure handling, §6 determinism, §7
editing, less §7.7 (seat E1 `determinism-dossier` owns §7.7's one REPLACE). Home items **51** (§5.1), **52** (§6.5 (9)),
**66** (§7.3 item 9) and **101** (§7.1's authoring toolkit); referencing items 34, 36, 37, 39, 41–45, 47, 56, 62–65,
67–72; and seat E1's folds into §5.1–§7.8 listed by route §C.9.3. Document read: `docs/ARCHITECTURE.md` sha256
`1c23190f…` (13 026 lines, 145 headings), rationale `0be40dfd…`; both unchanged from the first read to the dry runs.

Block file: `docs/validation/amendments-c/blocks-determinism-determinism-underground-authoring-bentcut-plots-walls-districts-render-labels-provenance-clandestine-transitions-light-palette-informal-character.md`
— 17 blocks: REPLACE §5.1, §5.2, §5.3, §5.4, §6.1, §6.2, §6.3, §6.5, §7.1, §7.2, §7.3, §7.4, §7.6, §7.8; APPEND TO
SECTION §7.5; J-ROWS (24 rows); RATIONALE-A (24 entries). Every REPLACE was built by script from the live text (the
subsection extracted, each change an anchored substitution asserted to occur once), so every sentence not named below is
byte-identical, except the wording-only rewords the document checks asked for (§6: 49 rephrasings of my own new text, no
fact changed); the build scripts are `scratchpad/e2/b01…b17*.py`. §6.4 and §7.7 are not touched (§7.7 is E1's; nothing
routed to §6.4 needed a change). No other seat REPLACEs any of these subsections (checked against every `blocks-*.md` of
this pass); E1's §7.7 block and any E1 APPEND on my subsections sort after this file, so the one-pass order is safe too.

## 2. Per item — where it landed and the mechanism in plain words

**51 (home, §5.1 (1); KEEP OURS, citations corrected).** The sentence that listed what the design removes now names the
three references' whole-map retries with their builds — MFCG 12710731 re-running all nine stages on one stream, VG 1.6.9
retrying on the failed seed's next generator state (not a "swap"), NG 1.2.2 regenerating at seed + 1 — and drops the
reference file-and-line citation (gate (c)). Our rule stands: a failure stays in its batch, every retry a rung of that
batch's ladder on its own keyed stream. MFCG's per-cell seeds are recorded as prior art in J-A51.51's entry only (route).

**52 (home, §6.5 (9); KEEP OURS + test).** A new determinism test: a seed's model digest made first in a fresh process
equals its digest made after 50 other maps and after every view toggle and zoom stop. The motive names only the read
mechanisms (renderer-left stream state as the next seed in MFCG 12710731, VG 1.6.9 and NG 1.2.2; per-session tree tiles;
Dwellings' clock rewind; Fantasy Manor's load-time seed). The HELD claim that those maps visibly differ is not written.
§13.3's pointer is S2's (cross-part note).

**66 (home, §7.3 item 9; OWNER RULE).** "If a user edits a building to have an access to the underground, it generates
all the necessary pieces" becomes a general closure rule: an edit that lacks prerequisites is expanded at its dry run —
by generators the entity registry declares per edit kind — into the minimal pieces in dependency order, applied as one
event and one transaction; the pieces draw on the edited entity's and target's streams keyed by the event's `seq` and are
minted from it, so the same edit gives the same pieces; the event stores a `ClosureRecord` (created and reused pieces);
undo removes exactly the created pieces; deleting the access later removes only created pieces nothing else uses (a
shared connector stays); a created basement returns to its derived state unless edited; a closure never writes a dossier
fact. `addUndergroundAccess` is the first instance (its pieces are seat D's II.7.6, J-A66.41); a front's missing concealed
door and an undercity's missing lifeline use the same rule. Also: §7.1's event, §7.4's lifecycle row, §5.2 F-EDIT's
refusal forms (a lawful basement form or a refusal naming the gate or route bound), §5.3's closure row, §6.3's minting.

**101 (home, §7.1's "The authoring toolkit"; OWNER RULE).** Declare, then derive: authoring is a set of declarations over
the events the editor already has, each with one dry run, one fate report, one commit and one undo. A table maps the
twelve tools in five layers to their events; four sugar events (`placeGate`, `quarter`, `roster`, `group`) are logged as
themselves and expanded at fold by a versioned `sugar.json`; `drawBoundary`, `drawWater`, `drawWall`, `drawWay` and
`placeAt` gain a `PointsForm` whose shape the dry run derives with the class's own operator and stores resolved; the three
surfaces (canvas, clerk tool API, skeleton file) make identical events; a clerk's accepted proposal carries
`proposedBy: 'clerk'`. Declared means held (§7.2: every declared entity pinned by its declaring event); a declaration is
refused only against a dossier fact or a lock, otherwise bent to the nearest lawful form and named. Scoped re-rolls and
three variations as the scope's next three rerolls (§7.3 item 10); `intend` is the basic panel (§7.8); sugar events migrate
by their expansion version (§7.5); skeleton round trip in §6.5 (9); the skeleton's read-ahead in §6.2 and §7.4 (T's §4.1,
J-A101.41); a declared road across a wall makes a gate (§7.3's S7 row, J-A101.76). The built-in clerk and bridge-deck plots
are named staged.

**Referencing items (the pointer, hook field or row the route names):** 34 / 36 / 37 / 41 — §6.1 appends `cut.stop`,
retires `cut.side` and `cut.farSideAlt` (reserved ids), adds the `bell4()` and `mean3()` helpers and the bent cut's readers
(J-A41.61); 37 / 43 / 44 — §7.6's per-preset values rule (J-A37.71), FTG's recession 0 (J-A43.71), the enclosure `over:
'both'` with no NG preset (J-A44.71); 39 — §5.2 F-CUT's turned-frame rung and J-Fredteam-1's slide; 42 — §5.2 F-PLOT's NG
baseline as courts; 45 — §5.2 F-CASTLE in MFCG 12710731's order and §7.1's Equalize row on `regularFit`; 47 — §6.1's
`district.seed` readers and §7.3's S6 row; 56 — §6.1's deck helper without the class name; 62 — §7.6's `(code)` form;
63 — §5.3's concealed row, §6.1's `siting` readers, §7.1's use and institution rows, §7.4's setAttr row; 64 — §5.3's access
rows, §6.1's `sewer` reader, §6.3's anchor, §7.1's `setAttr(state, knownTo)` and `placeAccess.element`, §7.5's transform;
65 — §5.2 F-VOID, §5.3's systems row, §6.1, §6.2's underground layer, §6.3's parts, derivation units and anchors, §7.1's
`drawTunnel.system`, `drawChamber`, `addLink` (J-A65.71), §7.3's staged row, §7.4's rows; 67 — §5.3's Works row, §5.4's
entries, §6.1's `works` concern (J-A67.61), §6.2, §6.3, §6.5's stage-purity test, §7.1's `startWorks` / `cancelWorks`
(J-A67.71), §7.4, §7.6; 68 — §5.2 F-LIGHT, §5.3's light row, §6.1's `pin.light` (J-A68.61), §6.2 (lighting outside every
digest), §6.5's lint closure and lighting test (J-A68.62), §7.1's `placeLight` and lights row (J-A68.72), §7.4, §7.6, §7.8's
view controls (J-A68.71); 69 — §7.6's corpus sentence; 70 — §5.2 F-PLOT's cluster rung, §5.3's cluster row, §6.1, §7.1's
`tenure`, §7.4; 71 — §6.1's `siting` reader, §7.6's tables; 72 — §5.3's character row, §5.4's rename entry, §6.1, §6.2's
digest status (J-A72.61), §6.3's case (5) (J-A72.62), §7.1's `identity`, §7.4's epoch row, §7.6. **E1's folds:** §7.1
(`dossierChange`, `DossierRef` as the binding key, the `dossier-owned` refusal with J-A20.77's list, `state`, claimed
names), §5.2 (F-EDIT `dossier-owned`), §5.3 (coherence, the binding check, a listed ruin present), §5.4 (`changeId` and
reason on entries; the port's refusal no report entry), §6.1 (the partner bearing on `gate.pick`; the collective member
choice on `siting`), §6.2 (the dossier seed; `dossier` block outside the digests), §6.3 (a re-binding never re-keys), §6.5
(T73-8; the adapter-boundary lint); §7.4 nothing for item 87 (as routed).

## 3. Rulings taken (index rows in the J-ROWS block; full entries in RATIONALE-A)

J-A51.51, J-A52.61, J-A41.61, J-A67.61, J-A68.61, J-A68.62, J-A72.61, J-A72.62, J-A37.71, J-A43.71, J-A44.71, J-A66.71,
J-A65.71, J-A67.71, J-A68.72, J-A68.71, J-A76.72, J-A101.71 – J-A101.77. Ids checked free over the design, the rationale
and every block file of this pass (E1 took J-A76.71, so the week transform is J-A76.72).

## 4. Held parts, gates, satisfied and not-applicable

* **Held (HOLD — PLAUSIBLE, not applied):** item 52's claim that the references' session-reached maps visibly differ
  from a fresh load (route §C.4) — only the read mechanisms are written. No other held part falls in §5–§7. File c's
  evidence gate releases (37, 58 (f), 59) and its rejection (49) bind other seats' sections, not mine.
* **Gate (b) build names:** every "the reference does X" sentence I wrote names MFCG 12710731, VG 1.6.9, NG 1.2.2,
  Dwellings (itch 17195045) or Fantasy Manor 1.0.0 build 890. **Gate (c):** `City.hx:156` (§5.1), `DeckRuleSelector`
  (§6.1) and two reference log strings that stood in §5.2 (F-CUT's MFCG baseline and F-ROUTE's MFCG note, citation-only
  vocabulary under critic R5 / J-Fcode-1) are removed; no class, method, grammar, palette or word list enters.
* **Satisfied already, no text needed:** item 52's lint clause (`Date`, timers already forbidden, §6.5 (3)); item 38 and
  40 need no §6 edit (`cut.arc`, `cut.width` keep their names; their readers now listed); item 87 (§7.4 NOT edited).
* **Not applicable to this part:** 32, 33, 35, 38, 40, 46, 48, 49, 50, 53–55, 57–61 (no determinism place routed);
  73–88 except E1's folds above (their homes are §7.7, §14, §2.7, §4.11).
* **Fable blocks folded (apply once):** `docs/fable-review/main/blocks-determinism.md` B-1 (§7.4 independence through the
  input layer, J-Fdet-1) is folded verbatim into §7.4's Independence bullet (only "above" → "below", its new position) and
  B-2 (§7.3 (b) 3, any-level structural edges) into §7.3 (b) 3. The assembler must apply only that file's J-ROWS and
  RATIONALE-A (J-Fdet-1), never its two APPEND bodies (they would duplicate the text; applied before this REPLACE they
  are simply overwritten). `docs/retrovalidation/determinism.md` has no findings written yet (its ledger's last row "in
  progress"; no LANDED line) — nothing to fold.

## 5. CROSS-PART NOTES (the other editors run in parallel; the verifiers check both sides)

1. **E1 (`determinism-dossier`, §7.7).** (a) My §5.2, §7.1 and §7.4 cite `DossierChange` at "§7.7 item 13", the
   `dossier-owned` refusal at "§7.7 items 7 and 11, J-A20.77", the binding as `Document.dossier` (item 12), the per-district
   input as `DistrictIntent` (layer 2) and the slices as "§7.7's circumstance slice" — keep those numbers or tell the
   verifier. (b) §6.1 now says the partner bearing is drawn on `gate.pick` keyed by the partner's key, and a collective
   record's status members on `siting` keyed by the assignment and the event's `seq`: align item 2's fill rule and item
   14's J-P12 sentence to those streams. (c) §7.1's EditBase declares `dossierChange?: DossierChange` and `DossierRef.version`
   as the host's product line (your J-P9). (d) Your "One path" names a skeleton's declarations: my §6.2 / §7.4 read-ahead
   sentences and `EditBase.creation` (a skeleton's events flagged `creation`) match it.
2. **T (`pipeline-transitions-…`).** (a) §6.1 registers `works` (a Works' duration drawn inside its `WorksTable` row's range,
   keyed by the target's lineage with the start week as creation index) and `pin.light` (light placement, keyed by the
   host's lineage with the rule row as creation index): §4.11 and §4.7's light paragraph should name them as their streams;
   if §4.11 makes durations table-exact, say so and the verifier retires `works` before any build (no key moves either way).
   (b) §7.1 declares `startWorks { target; kind: Works['kind']; startWeek? }` and `cancelWorks { works }`; §4.11 states what
   a cancellation leaves ("ends it by §4.11's rule"). (c) §5.4 reports a Works' start, cancellation and finish only. (d)
   §6.3 case (5) is the epoch rename your §4.5 (9) points to; it stores the rename in the epoch event's `renames`. (e) §7.5
   gives an older weekless `epoch` its predecessor's week + `years` × 52 (J-A76.72) — check against `EpochInputs.week`. (f)
   §7.3's S7 row now makes a gate where a declared way above lane crosses an enceinte (J-A101.76) — your §4.1 read-ahead
   says S3 takes declared walls and gates; consistent.
3. **M (`model`).** Records my text names and expects in §2: `Works` (with `kind`), `LightSource` (`host`, `heightCm`,
   `radiusCm`, a light rule row), `UndergroundSystem`, `Gallery`, `Chamber`, `UndergroundLink` (`kind`, `via`, `knownTo`),
   `AccessPoint.state` / `knownTo` / `under.element` / `source` (D's II.7.4), `District.identity`, `pressure`, `nameHistory`,
   `DistrictIntent`, `Plot.tenure`, `Plot`'s `frontJitterCm` (the plots seat's note), the tier marker's `declared` value;
   the registry's per-edit-kind **closure generators** (§7.3 item 9 (a)) and the sugar events' registry rows. §6.2 hashes
   Works and LightSource records, `identity`, `pressure`, `nameHistory`; the character vector and band range are derived.
4. **D (`pipeline-staged-clandestine-underground`).** (a) My §7.1 names `drawTunnel { system }`, `drawChamber`, `addLink`
   and `placeAccess { element }` (from `under.element`) — your II.7.6 says every element and link is an edit target; these
   are the events. (b) §6.1 lists your underground draws on `sewer` (no new concern), as your II.7.6 states. (c) **FINDING
   for the verifier:** the kernel seat's note 7 says a closure's passage to the sewer is written in part 0, while your
   II.7.6 lays a dug passage in the `dug` system's own part; my §7.3 says "the part II.7.6 gives each" — reconcile with K.
5. **S2 (scope).** §13.3 points to §6.5 (9)'s session-history test (item 52); §13.2's T63–T72 and T66 bars match §5.3's
   rows; the elegance bars and skeleton fixtures match §6.5 (9)'s skeleton round trip; the first-five-minutes test is
   §13.4's. §14's port lint: my §6.5 (3) scans the adapter boundary from "the adapter's key list (§14)".
6. **S1 (scope).** §1.4's determinism and failure-policy rows (item 51) should read as §5.1 now does; §15.1 VG G2 "§5 no
   whole-build retry" (S2).
7. **R (rendering).** §8.4's fallback ladder and CPU reference are what §5.2 F-LIGHT, §6.5 (3) and (9) and §7.8 read; §9.5's
   count badge is what §7.1's dry run returns for area declarations; §11.2's tool API is the clerk surface of §7.1.
8. **Assembler.** Apply this file with the two-pass order (route §C.9.2) or the one-pass order — both are safe here: no other
   seat REPLACEs §5.1–§7.8 but E1's §7.7, and E1's file sorts after mine. Apply Fable's `blocks-determinism.md` J-ROWS and
   RATIONALE-A once, not its APPEND bodies (§4 above).
9. **Assembler (not my part).** Seat T's APPEND TO SECTION `### 4.5 …` (its block 3) is overwritten by the walls-districts
   seat's REPLACE of §4.5, which sorts later: fold T's text into that REPLACE or apply T's block after it.
10. **Assembler (allow rows).** §6's six proposed rows, after review.

## 6. Checks run (receipts under scratchpad `e2/dry2/`)

* **Apply (docs/validation/amendments-b/apply-blocks.py, on copies).** This file alone: "files 1; blocks 17 found, 17
  applied, 0 skipped; audit: 17 blocks; not OK: 0; j_rows_without_part_a: []". All eight block files of the pass: "files 8;
  blocks 67 found, 67 applied, 0 skipped"; its one audit failure is not mine — seat T's APPEND TO SECTION on §4.5 (T's
  block 3, l. 220) is LOST under the walls-districts seat's later REPLACE of §4.5 (note 9). Result: 145 headings before
  and after, no fence left open, input design sha256 `1c23190f…` and rationale `0be40dfd…` (unchanged since the first
  read).
* **Document checks** (`doc_checks.py --sections "5,6,7,Judgment calls"`, the live allow file). Untouched design: C1 5/0,
  C2 0/0, C3 306/7, C4 3/0, S1 0/0, S2 0/0 (hits/unreviewed; the 7 unreviewed C3 are corpus drift from parallel lanes —
  the same seven were 287/7 an hour earlier). With my blocks, before rewording: C3 unreviewed 57 and C4 2. After two
  wording-only passes (`e2/reword.py`, 40 rephrasings; `e2/reword2.py`, 9 — digit and pointer runs, reference-echoing
  phrasings, the `Locus.side` literal now the `Cardinal` alias, the F-EDIT row's `gate`/`side` words): C1 5/0, C2 0/0,
  C3 313/13, C4 3/0, S1 0/0, S2 0/0 — the 13 are the untouched 7 plus the 6 below. Rationale copy: S2 17/15 before and
  after (unchanged); C3 unreviewed 261 → 273 (the rationale is not a checked section).
* **Residue — proposed allow rows (the assembler reviews and adds them; each is a false positive):**

| check | exact hit text | reason |
|---|---|---|
| C3 | `and ng 1 2 2 s` | a build name gate (b) requires (NG 1.2.2) in §5.1 (1)'s list of the references' whole-map retries (item 51) |
| C3 | `and ng 1 2 2 the` | a build name gate (b) requires, in §6.5 (9)'s session-history test motive (item 52) |
| C3 | `in mfcg 12710731 vg 1 6 9` | two build names gate (b) requires, same sentence of §6.5 (9) (item 52) |
| C3 | `fantasy manor 1 0 0 build 890` | a build name gate (b) requires, same sentence of §6.5 (9) (item 52) |
| C3 | `fable review 2026 09 27` | our own review label, folded verbatim from Fable's block B-1 into §7.4's Independence bullet (J-Fdet-1) |
| C3 | `4 2 4 4 4 5 and` | section pointers (facts, not creative content) in §7.6's list of tables the amendments add |

## 7. CONFIRMED versus PLAUSIBLE

CONFIRMED: the blocks apply cleanly to copies of the live design (every block found and applied; headings 145 → 145;
fences balanced; index and Part A 472 → 520 with E1's rows); the document checks over §5–§7 and the index leave only the
six false positives of §6's table beyond the untouched baseline; every J id in the J-ROWS block has its Part A entry and every
id cited in my text is either mine or already exists; every substituted anchor occurred exactly once in the live text.
PLAUSIBLE: every ruling (each vetoable, recorded), the names of records other seats declare (§5 note 3), and the fit of my
pointers to sections other seats are still writing (T's §4.11, M's §2, R's §8.4).
