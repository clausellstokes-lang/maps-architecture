# Clean-room fix of 2026-10-03: a reference field name, the study-map names and the checker's corpus

Written by Opus for lane `design/cleanroom-fix-1` (workflow `workflows/24-m1-rulings-cleanroom.js`), 2026-10-03, on the
owner's Mac. The lane applies the correction the hashed deny-list found (`docs/calibration/E16-denylist.md` sections 1, 6 and
7; `docs/calibration/results/W-16.json`). Result file: `clean-room-fix-2026-10-03.json`. The independent verifier is lane
`design/cleanroom-fix-1-verify`. This record never writes the reference module's field name or the study map's names. The
field name appears only as its digest and its source line. Study-map names appear only as descriptions.

## Outcome

**The fix is done, and the design passes every check it is held to (CONFIRMED by execution).**

* **The field name is gone.** A Building field, and a field of the class row, carried a field name of FTG's Foundry
  module. That breaks §17.1 (9). The field and its record type are now `facilities` and `Facility`, and the family built on
  them follows. That makes 115 replacements in 12 files. Every section number, test id and J-id is unchanged.
* **The study-map names are gone.** Nine examples drawn from the first study map's names now use our own invented words.
  These are the six places E16 listed, the parenthesis next to the V09 one, and two places in amendments file e, where V10's
  examples came from. V12 l. 1534's cell-boundary coincidence has an allow row with its reason.
* **`doc_checks.py` reads reference material only.** It now leaves 44 of our own files out of the corpus, and it prints that
  count. The corpus-completeness warning is unchanged.
* **The checks.** `doc_checks.py` exits 0 on the base and on every touched design document (V01, V02, V03, V08, V09, V10,
  V11, INDEX), and on V12. The deny-list scan of the design set has 0 unreviewed hits. `make_denylist.py selftest` passes.
  The bundle has been regenerated and is current.
* **The touched records.** These are three critique files, one seam critique and amendments e, f and g. Each keeps the
  backlog of unreviewed hits it already had: that backlog was never held to exit 0. Run against the same corpus, each
  untouched copy and each edited copy gives identical counts and identical unreviewed sets, so these edits add nothing.

## 1 The field name and its family (before → after)

The module's field name is cited by its sha256 prefix, `d3793e0bf78931c2`. Its source is l. 719 of the FTG payload finding
(its §7.3, in `research/findings/`). It sat in the design at base l. 1369 (`Building`), l. 1488 (`PlanRungInput.building`'s `Pick`) and l. 16013
(`BuildingClassRow`), at V03 l. 310 and at V11 l. 1433. The red-team row FTG-11 brought it in, and the old check (i) never
read §7.3. The concept stays admissible (FTG-11). Only the name was the module's.

The record type's name was the singular of the module's field name, so it repeated the module. The brief asks for the type
to be renamed in that case, so it was. Every identifier and prose form built on that name followed, so one concept keeps one
name.

| before | after | where (count) | total |
|---|---|---|---|
| the module's field name (`d3793e0bf78931c2`) | `facilities` | base 3, V03 1, V11 1, critique/V11 3 | 8 |
| `SubLocation` (the record type) | `Facility` | base 8, V03 5, V11 1, critique/V03 1 | 15 |
| `SubLocationRow` | `FacilityRow` | base 2 | 2 |
| `SubLocationRoleRow` | `FacilityRoleRow` | base 1, V03 6, critique/V03 2 | 9 |
| `subLocation` (`Room` and `ProgramRoom` field, `origin` literal, `findRooms` kind) | `facility` | base 4, V03 13, critique/V03 3 | 20 |
| `perSubLocation` (count law) | `perFacility` | base 2, V03 1 | 3 |
| prose `sub-locations`, `Sub-locations` (§2.6's and §10.3's titles included) | `facilities`, `Facilities` | base 13, V03 6, V08 3, INDEX 1, critique/V02 2, critique/V03 6, critique/seam-stage2-3-r0 1, amendments f 2 | 34 |
| prose `sub-location` | `facility` | base 5, V02 1, V03 7, V08 1, V11 1, critique/V02 1, critique/V03 6, critique/seam-stage2-3-r0 1, amendments g 1 | 24 |
| | | | **115** |

**After the edit (CONFIRMED by grep):**

* No form of the old family is left, in any case, in the base, `docs/volumes/` (critique and the superseded copy
  included), `docs/AMENDMENTS-*.md`, `docs/validation/coherence/fix-list.md`, `plat/docs/build/open-design-findings.md` or
  the regenerated `docs/ARCHITECTURE-FULL.md`.
* **plat/ has no occurrence** of the old name, the new name or the study-map phrases (`rg`, `node_modules` left out), so
  nothing is handed to the session.
* The new types are each defined once: `interface Facility` at base l. 1393, `FacilityRow` at l. 16061 and
  `FacilityRoleRow` at V03 l. 505.
* `facility` and `facilities` occur in no file under `research/` or `captures/` outside SettlementForge's notes. So the new
  name repeats no reference identifier.

## 2 The study-map names (before → after)

The first study map's README, under `research/reference-maps/`, bars its names from the design. The before-texts are described
here, not quoted.

| where | before | after |
|---|---|---|
| base l. 15533, `RegionGroup.members` | the map's three region names as the example | "a region such as the Kiln Hill, the Saltings or the Far Bank" |
| V01 l. 3163–3164, the Regions bullet | the same three names | the same phrase, re-wrapped over two lines |
| V09 l. 4475, the known-city fixture's structure | the map's two-word name of its cemetery | "cliffs with a graveyard along their top" |
| V09 l. 4476 | the three region names' distinguishing words, in parentheses | "three region labels (our own names) over the upper town, the lower port and the sprawl" |
| V10 l. 37 | a region name from that map inside "make … denser", and two more of its place words inside "move the … nearer the …" | "make the river quarter denser", "move the chapels nearer the castle" |
| V10 l. 2347–2349, iterating an accepted change | the same two examples and their mechanics | "make the river quarter denser" is a `fill` on that district …; "move the chapels nearer the castle" is `read_map sites` for the chapel class near the castle and a `place { move }` per chapel |
| V10 l. 3200, evaluation set D | the same two prompts | "the river quarter should feel denser"; "move the chapels nearer the castle" |
| amendments e l. 54, item 101 (c) T11 | the three region names | "(say, the Kiln Hill, the Saltings, the Far Bank)" |
| amendments e l. 66–67, item 101 (d) (4) | the two clerk examples | ("the river quarter should feel denser", "move the chapels nearer the castle") |

`chapel` and `castle` are both classes of our class table (§2.6 `BuildingClass`), so the examples keep their mechanics: a
class's sites moved towards a landmark. **The allow row:** `research/baselines/denylist/design-allow.tsv` gains one PHR row
for V12 l. 1534. That hit spans a table-cell boundary: one cell ends with `chainSpread`'s direction and the next begins "CITY
and TOWN custom-chain fixtures". The row states that it matches on text alone, so a later real use of the phrase would also
be cleared (E16 §7).

## 3 The checker's corpus

`docs/validation/bench/doc_checks.py` used to read our own outputs as reference corpus. Its `corpus_files` (C2) and
`json_files` (C3, C4) now go through one test, `reference(f)`, which carries a comment naming the rule, the date and the
records that asked for it (E01 §7, E02 §7, E16 §§5 and 7). The header gains a `corpus` line, and the summary line gains
`own_outputs_left_out=`. The completeness warning is untouched.

**Left out: 44 files, all ours (CONFIRMED by listing).**

* `research/sf/`: 18 files. SettlementForge is the owner's program, not a reference (§17.1 (3), (6)).
* `research/baselines/`: 5 files that the checker reads by extension. These are M-1's own outputs, which cross into `plat/`
  by §17.1 (4): `plan.json`, `metrics.m-1.json`, the capture checklist, and the deny-list's spell supplement and allow file.
* The record files of M-1's capture lanes inside `captures/`: 21 files. The rule covers a capture folder dated
  2026-10-03 or later, and in it the `README*.md` files and the facts, stats, plan, check, index and `probe/` files.
  * FTG day 1: `README.md` and `capture-facts.json`.
  * The MFCG sweep: `README.md`, `export-check.json`, `stats.json`, `probe/ui.json` and, under `probe/`, eleven `ack-*.json`
    and one `ui-as-saved.json`.
  * The NG programme: `README.md`, `build-check.json` and `index.json`.

**Still read.**

* Every recording in those folders, 526 files when listed at 16:35: the `session/`, `draw/` and `steps/`
  trees and their network bodies, the MFCG exports, the recorder's `meta.json` and `session.json`, and FTG's request body
  (`create-request.json`).
* All captures from before M-1, and everything else under `research/`.

**The effect on the base, same tree:**

* The old checker reported C3 2 050 hits with 14 unreviewed and C4 28 hits with 5 unreviewed, exit 1. These are the phantom
  hits E01, E16 and the wave verifier reported.
* The new checker reports C3 1 889 / 0 and C4 24 / 0.
* The corpus went from 10 661 colour files, 10 177 JSON files, 976 674 3-grams and 815 lists to 10 618, 10 152, 953 357
  and 513.

## 4 Receipts (CONFIRMED, executed 16:28–17:25)

**`doc_checks.py`, after the fix.** The base is run whole; every other document is run
whole with `--heads docs/ARCHITECTURE.md`. Outputs are in the scratchpad, `m1r/cr/runs/`.

* `ARCHITECTURE.md`: exit 0. Hits: C1 5, C2 2, C3 1889, C4 24, S2 318; none unreviewed.
* `volumes/V01-neighbourhoods.md`: exit 0. Hits: C3 421, C4 6, S2 286; none unreviewed.
* `volumes/V02-buildings.md`: exit 0. Hits: C3 628, C4 1, S2 214; none unreviewed.
* `volumes/V03-interiors.md`: exit 0. Hits: C3 404, C4 6, S2 200; none unreviewed.
* `volumes/V08-settlementforge.md`: exit 0. Hits: C3 211, C4 4, S2 284; none unreviewed.
* `volumes/V09-application.md`: exit 0. Hits: C1 1, C2 1, C3 363, C4 8, S2 457; none unreviewed.
* `volumes/V10-clerk.md`: exit 0. Hits: C3 202, C4 2, S2 334; none unreviewed.
* `volumes/V11-content.md`: exit 0. Hits: C3 327, C4 8, S2 334; none unreviewed.
* `volumes/V12-calibration.md` (not edited; the allow row's document): exit 0. Hits: C1 8, C3 157, C4 2, S2 119; none unreviewed.
* `volumes/INDEX.md`: exit 0. Hits: C3 22; none unreviewed.
* `volumes/critique/V02.md`: exit 1 (the untouched copy gives the same). Hits: C1 1, C3 170, S2 41; unreviewed: C3 115.
* `volumes/critique/V03.md`: exit 1 (the untouched copy gives the same). Hits: C3 238, S2 9; unreviewed: C3 165.
* `volumes/critique/V11.md`: exit 1 (the untouched copy gives the same). Hits: C3 134, C4 3, S2 70; unreviewed: C3 87, C4 3, S2 2.
* `volumes/critique/seam-stage2-3-r0.md`: exit 1 (the untouched copy gives the same). Hits: C3 62, S2 17; unreviewed: C3 38.
* `AMENDMENTS-2026-09-27e.md`: exit 1 (the untouched copy gives the same). Hits: C1 1, C3 15, S2 1; unreviewed: C1 1, C3 14, S2 1.
* `AMENDMENTS-2026-09-28f.md`: exit 1 (the untouched copy gives the same). Hits: C3 131, C4 2, S2 51; unreviewed: C3 86, C4 2.
* `AMENDMENTS-2026-09-28g.md`: exit 1 (the untouched copy gives the same). Hits: C1 2, C3 110, C4 6, S2 4; unreviewed: C1 2, C3 70, C4 5.
* `validation/clean-room-fix-2026-10-03.md`, this record: exit 0. Hits: C1 3; none unreviewed. The deny-list scan of it has
  none unreviewed either.

**The base needed one round.**

* **The first run after the edits** left 2 unreviewed C3 runs. Both were reviewed rows of `doc-checks-allow.tsv`, l. 944
  and l. 1003. Their source is our own design page, `research/findings/dwellings-synthesis.md`. Each lost its last token,
  the renamed field.
* **The fix.** The two rows were re-keyed in place to the shortened text; each keeps its reason, with a dated note added. The file
  still has 6 299 lines, and no row was added. The second run exited 0.

**Untouched copies.** The seven records were also run as their backup copies, against the same corpus and allow file. Each
gave identical counts and identical unreviewed sets: 0 new hits and 0 gone.

**The deny-list scan** (`make_denylist.py scan`) of the fifteen design documents gave these counts:

* TOK went from 121 hits with 5 unreviewed to 116 hits with none.
* ID went from 20 hits with 5 unreviewed to 15 hits with none.
* TRI went from 6 060 hits to 6 059, none unreviewed either time.
* PHR went from 15 hits with 7 unreviewed to 9 hits with none.
* SET stayed at 104 hits, none unreviewed; COL and FILE stayed at none.

The exit code went from 1 to 0.

**The self-test** (`python3 research/baselines/make_denylist.py selftest`, without the transcription, so check 9 was
skipped) took 7 min 19 s and exited 0 with `"pass": true`. **Its design-set line:** 15 documents, TOK 116/0, ID 15/0, TRI
6059/0, COL 0/0, SET 104/0, PHR 9/0, FILE 0/0; `design_unreviewed_total` 0. The other checks were:

* C1 36/36;
* colours 7 248/7 248;
* check-(vi) lists 210/210;
* all kept lists 234/234;
* tokens 1 329/1 329;
* identifiers 130/130;
* files 9 561/9 561;
* 3-grams 2 004 sampled, 0 missed;
* planted leaks 20/20 in each of TRI, SET and COL;
* the salt matches its file.

**The bundle.** `python3 tools/bundle_architecture.py` wrote `docs/ARCHITECTURE-FULL.md`, 72 975 lines from 14 sources, and
`--check` reports UP TO DATE.

**Backups.** Every file was copied before its first edit to the scratchpad's `m1r/backup/`, with its relative path kept; a
`SHA256SUMS` list covers the first twenty, and the allow file of `doc_checks.py` was copied before its re-key. The edit script refused to write any file whose bytes had changed since its backup.

## 5 Judgment calls (delegated authority, J122; each vetoable)

* **CF-1. The new name is `Facility` / `facilities`.** It is plain English for a named, fitted part of a building where
  people do things: a bed, a bath, a counter, a stage, a service's desk inside its provider. It does not occur under
  `research/` or `captures/` except in SettlementForge's notes (searched in text mode, binary bodies included). Across the
  design and its records the word otherwise occurs only in its ordinary sense, six times: twice in §2.6's band table ("shared
  facilities", meaning rooms of scope `shared`), once in V07's "Docks and port facilities" (a SettlementForge
  institution), once in amendments b and twice in the seam-settlements critique. **Rejected names:**
  * `Station` (72 uses already),
  * `Venue` (`venueMix`),
  * `Amenity` (it fits a service's desk poorly).
* **CF-2. The whole family was renamed, not only the field.** That covers the type, the two row tables, the `Room` and
  `ProgramRoom` field, the `origin` literal, the `findRooms` kind, the count law and the prose, with §2.6's and §10.3's
  titles. Renaming the field alone would leave two names for one concept. Every section number and every test id is
  unchanged.
* **CF-3. The historical records in scope were renamed too.** These are the critique files and amendments f and g, because
  the brief named `docs/volumes/` and `docs/AMENDMENTS-*.md`. The archives and work files elsewhere in `docs/` keep the old
  text as history (section 6).
* **CF-4. Two rewordings go beyond the listed lines.**
  * V09 l. 4476's parenthesis carries the same three region names in adjective form.
  * Amendments e l. 54 and 66–67 are where V10's examples came from. That text is the program's reading of owner rule 101,
    so it is ours to reword; the owner's quoted words were not touched.
* **CF-5. V10's two further place words were replaced too.** These are a class and a landmark. E16 §1 counts them among
  that map's place words. Both replacements are classes of our own table, so the example's mechanics hold.
* **CF-6. The corpus rule recognises an M-1 capture record by two tests.** The folder must be dated on or after 2026-10-03,
  and the file name must match a fixed set of our record names. Capture records made before M-1 stay in, because the
  reviewed allow rows were read against them, and some of them transcribe reference values. A later lane may widen the rule.
  The printed count keeps it visible.
* **CF-7. The touched records are held to "no new hit", not to exit 0.** These are the critique files and amendments e, f
  and g. Their unreviewed backlogs (16 to 165 per file) predate this lane. Clearing them would mean hundreds of new allow
  rows for our own words, which the brief forbids. The untouched-copy runs show that these edits add none.
* **CF-8. Two shortened allow rows were re-keyed in place, not added.** Their reviewed source is our own design page in
  `research/findings/`. Taking that page out of the corpus would be the deeper fix. It is not done here, because the page
  also restates Dwellings mechanisms, and that is a coverage change for the clean-room owner.
* **CF-9. The V12 allow row was added as the brief asks, with the text-key hazard stated in its reason.** Rewording V12's
  cell instead would avoid that hazard; the owner may prefer it.

## 6 For the session (outside this lane's write scope)

* **The old field name is still on disk outside the design.**
  * `docs/validation/` holds it in 98 files, all work and verification history.
  * `docs/archive/` holds it in 17 pre-change copies.
  * `docs/retrovalidation/blocks-model.md`, `docs/lane-events.log` (W-16's checkpoint), one coherence lane prompt under
    `workflows/lane-prompts/`, and two findings: the §7.3 source itself and `dwellings-synthesis.md`, our own design page.
  * None of these is design or `plat/`, and implementers never read them (`plat/CLEAN-ROOM.md`).
* **The study map's names remain in `docs/experiments/known-city-authoring.md`.** That is the experiment's study record (J78),
  and it describes the reference itself, as findings do.
* **Two tool files carry the old prose title of §2.6.** `tools/integrate/arch-order.json` is a stale heading snapshot
  (§2.6 at l. 1110). `workflows/17-volumes.js` names the family in prose. Neither is read by a check.
* **`make_denylist.py` already leaves `research/sf/` and `research/baselines/` out (`EXCLUDE`).** At the rebuild at M-1's
  exit (E16 §7), it should adopt this capture-record rule, so that the two checkers read one corpus.
* **The pre-existing C1 hits in amendments e and g are capitalised English words that match FTG message identifiers.** They
  are owner-rule wording, untouched here and unreviewed before.

## 7 Confirmed and plausible

**Confirmed by execution or reading:**

* every count in sections 1 to 4;
* the absence of the old family from every scoped file and from `plat/`;
* the new name's absence from the reference corpus;
* the exclusion list and the kept recordings;
* each `doc_checks.py` exit code and the untouched-copy comparisons;
* the deny-list scan, the self-test and the bundle check.

**Plausible, by reasoning only:**

* that the invented names (Kiln Hill, the Saltings, Far Bank, river quarter) coincide with no name on either study map. The
  deny-list's 91 transcribed names do not hit them, which supports this, but check 9 was skipped by the brief;
* that V10's two further words were the place words E16 meant;
* that the corpus holds no other own-output file beyond the ones named in E01, E02 and E16 and the synthesis page noted in
  CF-8.
