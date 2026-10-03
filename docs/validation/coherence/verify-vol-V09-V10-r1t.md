# Verify — coherence pass, round 1: volumes V09 (application) and V10 (clerk) after repair round 1

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-vol-V09-V10-r1t; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V09-V10-r1t`, 2026-10-01, cloud checkout; scratch `scratchpad/coherence/v910r1/`)
- P0 resume check (no LANDED line, no output): fresh start — done
- P1 inputs (brief whole; round-0 report and result; assemble-r1; repair-r1-V09, repair-r1-V10 and the hand-offs of the other sixteen repair files; canon dated rulings 114–125; g items 119–125) — done. Live V09 `c2dc5b80…` and V10 `f8f591b3…` equal assemble-r1's recorded hashes.
- P2 round-0 findings VV910-01 – VV910-21 re-checked on the live text — done (18 fixed, 2 partly fixed, 1 fixed with its base end still open)
- P3 every repaired subsection of V09 (56 blocks) and V10 (40 blocks) read whole, pre-round (`3f0e02b2d7b9`) → live word diff with the ID-TOOL tool words normalised (V09 28 sections changed beyond the tool words, V10 44) — done
- P4 owner items 119 (a2) and 120–125 for V09 and V10 — done
- P5 references, ids, terms, deferral, doc_checks, cohesion against INDEX and §16 — done
- P6 this report, the result file, LANDED — done

## Outcome

**Not clean: 17 issues — 0 blockers, 12 major, 5 minor.** Owners: V09 11, V10 4, rendering 2.

- **Round 0 (21 findings).** 18 fixed. Two persist:
  - VV910-02 is fixed in V10, but the type moved to base §11.2 with the old shape, so it is re-raised against rendering;
  - VV910-20 leaves two bare first uses.
  
  VV910-05, -10 and -11 are fixed in V09, but their base ends are open: VRC1T-06 (already raised) and VV910-r1-01 (new).
- **Ruling requested:** VAT-20, V10's rung clause, is re-raised for the adjudicator. It is not judged here.
- **Owner items, F-MISSING.** These V09 parts are absent:
  - item 120 (G120-V09), item 121 (G121-V09), item 122 (G122-V09), item 122 (h)–(i) (G122h-V09);
  - item 123 (G123-V09), item 124 (G124-V09), item 125 (G125-V09);
  - item 119 (a2)'s progress-view part (G119a2-V09).

  These V10 parts are absent: item 122 (G122-V10) and item 123 (G123-V10). V10's item-120 part (G120-V10) is present at build depth and holds against item 120 (a)–(k), apart from VV910-r1-04.
- **New:**
  - VV910-r1-01 (rendering): Stop on a history-first generation and on an export has no API;
  - VV910-r1-02 (V09): re-issuing a stopped `advance` depends on a cross-thread timing that cannot reproduce a stop after the first epoch;
  - VV910-r1-03 (V09): three term slips;
  - VV910-r1-04 (V10): V10 lets a host's own assistant set Find chips over the bridge, against V08 §3.16 (g) (J-V8.127) and §2.9's never-over-a-bridge rule.
- **No nuance lost.** V10 §2.13's 2 143 removed words, the reader and oracle declarations, were checked fragment by fragment against base §11.2 and §2.8. Every field and comment survives:
  - the model-facing exclusion of `entity { dossierKey }` now sits in V10 §2.12 (V10's note (3));
  - "volume 9's note lines" survives as `EntityCard.dossierKey`'s "for V09 and a host reader".

  The one shape that changed is `RuleAnswer.register` (VV910-02).

## Sizes

| volume | archive (wc words) | pre-round (assemble-r0) | live (assemble-r1) | archive → live |
|---|---|---|---|---|
| V09-application.md | 109 687 | 103 572 | 107 149 (+3 577) | −2.3 % |
| V10-clerk.md | 83 260 | 73 916 | 75 811 (+1 895) | −8.9 % |

Neither volume shrank by half, and both stay below the 25–40 % band. The round's growth is new design:
- V09: the issue fixes' rows and tests (the nine `edge.nothingToApply.<form>` keys, the six `bend.island.*` rows, the table and gate refusals, T-V9-81, T-V9-82) and the tool words;
- V10: item 120's part, `info.plan.*`, `memoryTokens`.

V10 removed about 2 200 words of restatement (its §2.13 declarations, now §11.2's).

## Round-0 findings re-checked on the live text

| id | owner | verdict | where it now stands |
|---|---|---|---|
| VV910-01 | rendering | FIXED | §9.5 l.14208: plus and minus step `sizeM2` by (band max − band min) ÷ 8, a fill's dial by one step, a roster none (item 348). |
| VV910-02 | V10 → rendering | **PARTLY** | V10 is fixed: §1.2's V12 §2.10 row, §1b.1, §3.5, §10.2 now read `dist/evidence.json`, `entry` and `method`. But the type is now §11.2's (VAT-03), and §11.2 l.15233 still reads `register?: { id; status; method; due }` from "V12 §2.6's plat/calibration/register.json". Re-raised, owner rendering (V10's note (2) handed it there). |
| VV910-03 | V09 | FIXED | V09 §5.12 l.3664–3666 states 256 MB, 96 MB and 8 frames; §2.11 l.896 cites it; V06 §2.2 l.580–581 cites V09 §5.12. |
| VV910-04 | V06 | FIXED | V06 §2.2, §2.12 (l.844), §3.15.2 (l.2308, 2315) and §6.5 (l.3680) cite V09 §5.12; no "V09 §9" pointer remains. |
| VV910-05 | rendering | FIXED | §11.2 l.15086 declares `Progress`; `open`, `regenerate`, `adjust`, `export` and `advance` take `onProgress`; §12's progress rule cites it (l.15658). The `undo` wait added by VV910-10 has no member: VRC1T-06. |
| VV910-06 | V09 | FIXED | l.355 and l.3318 cite "§11.2's worker boundary (`onProgress`)". |
| VV910-07 | determinism | FIXED | §7.1 l.10211–10212: T2 homes `setAttr` on `WaterBody.spring.flow`; T3 homes it on `Enceinte.pathway`. |
| VV910-08 | V09 | FIXED | Six `bend.island.*` rows (l.2083–2088), each with its producer and buttons, every button defined. |
| VV910-09 | V10 | FIXED | V10 §3.16 l.2239 names every `bend.island.*` row of V09 §4.9. |
| VV910-10 | V09 | FIXED in V09 | §3.9 l.1284, §4.9 `progress.undo` l.2116, §4.21.9 (1) l.3306, T-V9-79. The base end (no `undo` wait, no `onProgress` on `edit`) is VRC1T-06. |
| VV910-11 | V09 | FIXED in V09 | Stop on the replay, `info.history.cancelled`, `button.generateWithoutHistory` and the `generateWithoutHistory` command (l.2103, 2146, 2201, 3315). The API end is VV910-r1-01. |
| VV910-12 | V09 | FIXED | `edge.nothingToApply.<form>`: nine keys, one per empty form of §7.1 l.10051 (the stroke and ring split into two). |
| VV910-13 | V09 | FIXED | `people` (S15) and `below` (tail stages) groups (l.2115, l.3318); J-V9.131 says thirteen groups. |
| VV910-14 | V09 | FIXED | Row 22 (l.1482): "a (kind, target class or path) pair". |
| VV910-15 | V09 | FIXED | §4.9's lead (l.1868–1877) names each row's producer: an outcome row or a listed gate. Census: every key of §7.1's outcome table has a V09 row (`refuse.clerk.opsDevice` under the clerk family row), and every V09 `refuse.*` row outside the table is a listed gate. |
| VV910-16 | V09 | FIXED | §1.1 (9) l.162 names the own-key card. |
| VV910-17 | V10 | FIXED | No **Change the stairs** in the set. |
| VV910-18 | V09 | FIXED | "Ceiling" now names only item 115's grandeur ceiling. |
| VV910-19 | V09 | FIXED | l.1454 "(V09 §2, V09 §3)"; l.2211–2212 "V08 §4.2's …, V08 §5.1's …". |
| VV910-20 | V09 | **PARTLY** | 350 tool words inserted, all with the right word. Two bare first uses remain: l.2666 "a T6 `placeAt`" and l.3239 "A T6 placement". The repair's scan matched `placeAt` and "placement" as the word `place`. |
| VV910-21 | V10 | FIXED | A strict scan finds 0 bare first uses (the title block's statement of the rule aside). |

## Method

1. **P2.** Each round-0 finding was read at its required change's lines in the live set. The checks are the line references in the table above.
2. **P3.** `wdiff1.py` diffs every section of the pre-round copy (`git show 3f0e02b2d7b9`) against the live one, word by word. Tool words written as "Tn \`word\`" or "Tn (\`word\`)" are stripped from both sides first, so the 350 + 71 ID-TOOL insertions do not hide other hunks. Every hunk was read, and each subsection a block replaced was read whole where a hunk touched it. A section with no hunk after normalisation is identical but for its tool words.
3. **Mechanical checks:**
   - **Keys and buttons.** Every key of §7.1's outcome table (l.10114–10157) has a V09 row. Every `button.*` a row names is defined in the button list, and every defined button is named by a row. Every `refuse.*` row ends with `button.showWhy` (the clerk family row excepted).
   - **The V10 §2.13 move.** Every comment and field fragment of the removed V10 §2.13 block was searched for in §11.2 and §2.8.
   - **Ids.** T-V9-81, T-V9-82, T-V10-51, J-V9.137, J-V10.123 and J-V10.124 are each defined once, and the two volumes hold no duplicate T or J id.
   - **Terms.** The canon's retired-term patterns were run over both volumes (VV910-r1-03).
   - **Deferral wording.** The new text was scanned: none.
4. **P4.** Each dated ruling's V09 and V10 parts were checked against the item's text, (a) to (k).
5. **Hand-offs.** I read the hand-offs the other sixteen repair files address to V09 and V10, and checked each at its destination:
   - the item-120 ones (V01, V03, V04, V05, V07, V08, V11, V12) wait on G120-V09;
   - V06's epoch-line hand-off is G119a2-V09;
   - V11's ownerRule and required-row hand-off is VDC1-14;
   - V03's `report.plan.*` hand-off is VV34-r1-01;
   - V08's Find hand-off to V10 is VV910-r1-04;
   - determinism's VAT-08, VAT-11 and rendering's VAT-06 hand-offs are closed in V09 and V10.

### Cohesion

The build plans agree with INDEX and §16:
- **V09 §8.1:** 21.5–31.75 = base line 16.25–24.0 + staged 3.25–5.0 + AP11 2–2.75.
  - §16's application line 17.5–25.75 is 16.25–24.0 + AP11's base 1.25–1.75.
  - §16's staged-screens line 4–6 is 3.25–5.0 + AP11's staged 0.75–1.
  - AP5 sits at M6-E in V09, §16 l.18752 and INDEX l.32.
- **V10 §8:** 14.5–20 = INDEX l.33; §16's clerk line 11–14.75. Item 120's form lies within C4's price.

### References

assemble-r1's ambiguous-form list holds 7 V09 entries and 3 V10 entries. Each was read, and each reads correctly as the base, including the new l.1868 "§7.1's table". assemble-r1 found 0 broken references.

Two forward references depend on parts not yet written: V10's citations of §2.9's `find` key and §11.2's gazetteer match listing. They close with G120-model and G120-rendering (raised by those units' verifiers) and with G120-V09 here.

### doc_checks (provisional)

`python3 docs/validation/bench/doc_checks.py --doc docs/volumes/<V>.md --heads docs/ARCHITECTURE.md` warned:

> "reference corpus INCOMPLETE (missing: captures, research/patreon, research/devlogs, research/ftg-docs, research/external) - clean-room results are NOT authoritative; re-run on the machine that holds the corpus before any freeze"

Both runs exit 1 on unreviewed hits.

| file | C1 | C2 | C3 (hits / unreviewed) | C4 | S1 | S2 (hits / unreviewed) |
|---|---|---|---|---|---|---|
| V09-application.md | 1 / 0 | 1 / 0 | 245 / 234 | 0 | 0 | 354 / 105 |
| V10-clerk.md | 0 | 0 | 152 / 143 | 0 | 0 | 287 / 17 |

- **S2:** every unreviewed hit is a volume-prefixed pointer that the check matched against base headings (`s2check.py`: 0 bare).
- **C3:** the C3 hits new since round 0 (13 in V09, 9 in V10) are generic phrases ("a fault in the map", "on every building with a plan", "the rest of the map and") or runs of numbers, never copied text.

## Already raised by other round-1 verifiers (not raised again here)

These touch V09 or V10 and are on record:
- **VRC1T-06** (rendering): `Progress` has no `undo` wait and `edit` no `onProgress` (V09's `progress.undo`).
- **VRC1T-02** (rendering): whether per-viewer keys cross the bridge.
- **VDC1-13** and **VDC1-14** (V09): the report's recipe line; withdrawing `refuse.table.ownerRule`, adding `refuse.table.required`, `refuse.epoch.cap` and `refuse.water.reservation`, and dropping the `reroute` clause.
- **VDC1-15** (rendering): `reroute`.
- **VM-R1T-15** and **VM-R1T-16** (V09, V10): the History chip's `peak` shape against §2.7's `HistoryHint`.
- **VV34-r1-01** (V09): the `report.plan.<code>` family.
- **VV34-r1-02** (V09): the `info.plan.*` row names one key form for two.
- **VV34-r1-03** (V09): `findRooms` and `underFindPlaces` uncalled; Find's milestone.
- **VCS-10** and **VCS-18** (scope): §13.2's take-over range T-V9-1 – T-V9-80 against T-V9-82; INDEX prices.

The canon's other G120–G125 parts (model, rendering, determinism, pipeline, scope) are each raised by that unit's verifier.

## Issues

| id | severity | kind | owner | claim (short) |
|---|---|---|---|---|
| VV910-02 | major | CONFLICT | rendering | §11.2's `RuleAnswer.register` still reads `register.json` with `id`; V10 and V12 §2.10 read `dist/evidence.json` with `entry` (partly fixed) |
| VV910-20 | minor | ID | V09 | two bare first uses of T6 remain (partly fixed) |
| VAT-20 | minor | CONFLICT | V10 | the `rule` row's rung clause (ruling requested by V10) |
| G120-V09 | major | F-MISSING | V09 | item 120's V09 part absent: the Find panel, `live.find`, Coverage folded into Show gaps, the `find` action's handler |
| G121-V09 | major | F-MISSING | V09 | item 121's V09 part absent: Settings › Display › Resolution, `AppPrefs.resolution`, the view-status chip, (f)'s message |
| G122-V09 | major | F-MISSING | V09 | item 122's V09 part absent: Show crises, the preview, the why lines, Find's listing |
| G122h-V09 | major | F-MISSING | V09 | item 122 (h)–(i)'s V09 part absent: Fit, the opening view, the widened limit, the panel's numbers |
| G123-V09 | major | F-MISSING | V09 | item 123's V09 part absent: the panel lines of a damaged plan |
| G124-V09 | major | F-MISSING | V09 | item 124's V09 part absent: the Weather effects switch, Start a shower now, the defaults |
| G125-V09 | major | F-MISSING | V09 | item 125's V09 part absent: the season control as the week's fallback; the week still from the campaign calendar |
| G119a2-V09 | major | F-MISSING | V09 | item 119 (a2)'s V09 part absent: the progress view does not show the coarsened cadence |
| G122-V10 | major | F-MISSING | V10 | item 122's V10 part absent: the crisis looks explained |
| G123-V10 | major | F-MISSING | V10 | item 123's V10 part absent: a ruined plan's damage explained |
| VV910-r1-01 | minor | WIRING | rendering | V09's **Stop** on a history-first generation and on an export has no §11.2 call (only `cancelAdvance`) |
| VV910-r1-02 | minor | EDGE-UNDEFINED | V09 | the stopped `advance`'s re-issue times `cancelAdvance` on a progress message: a stop after the first epoch cannot be reproduced, and any stop races |
| VV910-r1-03 | minor | TERM | V09 | "a standalone neighbourhood's outline", "scoped re-rolls", "a restore jump" |
| VV910-r1-04 | major | CONFLICT | V10 | V10 lets a host's own assistant set Find chips by `view.set`; V08 §3.16 (g) (J-V8.127) and §2.9 say it sets none |

### VV910-02 — major — CONFLICT — owner: rendering (partly fixed)

**Claim.** V10 now reads each cell's calibration record from V12 §2.10's `dist/evidence.json`, naming `entry`, `status`, `method` and `due`:
- §1.2's V12 §2.10 row (l.204);
- §1b.1 (l.262);
- §3.5 (l.1406);
- §10.2 (l.3302).

But repair round 1 moved the type itself to base §11.2 (VAT-03), and §11.2 l.15233–15234 still declares `register?: { id: string; status: CalibrationEntry['status']; method: CalibrationEntry['method']; due: string } /* the cell's entry in V12 §2.6's plat/calibration/register.json, … its id and run only behind "details" (V10 §3.5) */`.

This disagrees with V12 §2.10 (l.774–791) and with V10 §3.5 in four ways:
- **The file.** `plat/calibration/` never ships.
- **The field.** It names `id`, which the file does not have.
- **`entry`.** V12 §2.10 makes `entry` optional, absent for a stamped or `ref:` cell.
- **`status`.** It takes `'owner'` for a stamped cell.

V10's repair note (2) handed the field to rendering, and rendering's repair predates it.

**Required change.** §11.2's `RuleAnswer.register` reads:

`register?: { status: CalibrationEntry['status'] | 'owner'; entry?: string /* absent for a stamped or ref: cell */; method?: CalibrationEntry['method']; due?: string } /* the cell's row in V12 §2.10's dist/evidence.json, where one exists; an absent file, or one of other table versions: the provenance source alone; told plain first, its entry and method only behind "details" (V10 §3.5) */`

This is V10's note (2), word for word.

### VV910-20 — minor — ID — owner: V09 (partly fixed)

**Claim.** The ID-TOOL pass inserted 350 tool words, each the right one. Two first uses in a paragraph still lack theirs:
- l.2666, §4.17.4: "a T5 quarter or boundary on a void part, a T6 `placeAt` of a dwelling class";
- l.3239, §4.21.5 (1): "A T6 placement or a T9 `shape` reshape".

The repair's scan read `placeAt` and "placement" as the word `place`.

**Required change.**
- l.2666: "a T6 `place` `placeAt` of a dwelling class".
- l.3239: "A T6 `place` placement or a T9 `shape` reshape".

Run the scan again with a whole-word match on the tool word: 0 bare first uses.

### VAT-20 — minor — CONFLICT — owner: V10 (ruling requested)

**Claim.** VAT-20 (verify-agree-tools-r0s) is fixed in V10 §3.16 except for its rung clause, which V10 sent to the adjudicator instead of fixing. Its RULING REQUEST block was never applied (assemble-r1 §2). The live `rule` row (l.2223) keeps "the rung of §7.1's islands row" and `refuse.islandsRung`, which VAT-20 asked to drop.

**Required change.** Per VAT-20: V10 §3.16's `rule` row drops "the rung" and `refuse.islandsRung` — or keeps them if the adjudicator rules the clause INVALID, as superseded by VAH-11's §7.1 islands row. (ruling requested by V10: see repair-r1-V10.md)

### G120-V09 — major — F-MISSING — owner: V09

**Claim.** The canon's item-120 ruling routes this part to V09: "the Find panel, type-ahead, chip grid, results list, the `live.find` overlay provider, Coverage folded into Show gaps (§5.4's table and cue column amended), across bands and layers, the phone bottom sheet, its tests". V09 has none of it:
- no Find panel and no `live.find`;
- §5.4 still offers **Coverage** with its `live.coverage` provider (l.298, l.3430–3431, the cue-table row l.3483, l.3702);
- `ClerkHandle.run`'s comment (l.842–844, "seven kinds") and §4.11 do not run V10's new `find` action (V10 §2.6, V10 §3.9b (7));
- V09 §8 names no Find milestone;
- the title block's range stops at 119.

As a result, V10's `find` action and the interfaces V03 §5.5 (`findRooms`), V04 §5.1 (`underFindPlaces`), V01 (`findAreas`, `gapUnits`), V05 §5.6 and V07 §5.5 wrote for Find have no caller (VV34-r1-03 raises the V03 and V04 pair).

**Required change.** Add V09 §4.21.10 *Find (item 120)* at build depth, with the parts below.
- **(a) The view.** The per-viewer key `find` (§2.9: the chips and the gaps switch), edited only by the panel. It is kept across zoom, pan, layer, season, advance and edits, and saved in view pins. It ends only by **Clear** or by closing the panel. It never touches the model, the document, its hash or the log.
- **(b) The list,** by the gazetteer at the view's effective key:
  - institution kinds with their counts;
  - named institutions, V08's dossier entries first, a dossier chip re-evaluated by its key and anchor (V08 §3.16; J-V8.127);
  - districts, neighbourhoods and quarters from V01's `findAreas`;
  - named places, and people through "Where is" (V09 §4.18).

  With the box empty, the grouped grid shows under V11's nine `findGroup` headings, as `find.group.<key>` rows.
- **(c) Type-ahead** over V11 §2.3's lexicon, the dossier's names and the place names:
  - prefix and whole-word matches, one-letter typos forgiven in words of five letters or more;
  - grouped by kind, with counts;
  - arrows and Enter add the highlighted suggestion;
  - a word matching several kinds offers each and an "all smiths" chip.
- **(d) The chip grid:** the union of the chips; each chip has its colour and second cue (a glyph on its pins, a dash pattern on its outline, item 112); past eight chips the colours repeat.
- **(e) `live.find`:**
  - the veil, the style's paper colour at α 0.55;
  - the halo, ≈ 8 px inside a 2 px outline, with labels above the veil;
  - an area lifted, with a glow along its boundary;
  - pins under ≈ 6 px, merging into count bubbles at ≈ 24 px, which zoom in when clicked.
- **(f) Across bands and layers:**
  - ghost pins on Below and Sky, "2 more Below" / "1 on Sky" and **Go there**, by V04 §5.1's `underFindPlaces` and V05 §5.6;
  - the interior band's rooms by V03 §5.5's `findRooms`;
  - V07 §5.5's targets at the village rungs, with the ends as gaps' units;
  - re-evaluation at every commit, regenerate, undo, advance and season change.
- **(g) The results list:** **Go to**, **Next**, **Previous** (keys too), and each chip's count.
- **(h) Knowledge.** Knowledge admission and View as govern every suggestion, count, glow and pin.
- **(i) Coverage becomes Show gaps.** §5.4's Coverage row, its cue-column row and the `live.coverage` provider are replaced by Find's **Show gaps**. Every Coverage behaviour is kept on V01's `gapUnits`: a dashed outline, "none here". Find draws over any Show view. §1.1's "coverage and voids views" line and the wiring rows l.298 and l.3702 follow.
- **The clerk's `find` action.** The application runs it: `set`, `add`, `remove`, `clear`, `gaps` (V10 §2.6). `ClerkHandle.run`'s comment counts eight kinds, and §4.11's action list adds it.
- **Exports.** Picture exports draw Find, with the chips in the legend. Battle-map exports leave it off unless asked (the export dialog).
- **(j) Speed and the phone:**
  - suggestions within ≈ 50 ms and the glow within ≈ 100 ms (V09 §6 rows);
  - the index rebuilt once per commit, and the base tiles never re-rendered;
  - the phone shows the panel as a bottom sheet (V09 §4.12).
- **Wiring:**
  - §1b rows for the panel, `live.find` and the action;
  - a §2.12 lifecycle row for `find`;
  - §3.16 edge rows (no chip, one chip, many chips, a class the town lacks, a withheld target, a layer change);
  - §4.9 rows (the panel's words, "none here", "{n} more Below", "{n} on Sky", Go there, Go to, Next, Previous, Clear, `find.group.*`);
  - a J-V9 decision.
- **(k) Tests:** a T-V9 row with item 120 (k)'s bars. V12 §3.15.10's fixtures run on V09's harness.
- **Build plan.** V09 §8.1 places Find's landing as the step that V03 §8, V04 §8 and V10 §8's C4 cite.
- **Title block.** The range reads 102–125.

### G121-V09 — major — F-MISSING — owner: V09

**Claim.** The canon's item-121 ruling routes this part to V09: "Settings › Display › Resolution, `AppPrefs.resolution`, the view-status chip and its why, the message of item 121 (f), its tests". V09 has none of it. §5.12 has no Display group, §2.11 no `resolution`, and there is no resolution chip or message.

**Required change.**
- **V09 §5.12** gains **Display › Resolution**: **Auto** (the default) · **4K** · **1440p** · **1080p (HD)** · **720p**.
- **V09 §2.11** gains `AppPrefs.resolution` (device state; never in the document, its hash or the log; a map opened on another machine takes that machine's setting).
- **Levels above the screen** are greyed ("your screen is 1440p").
- **The view status** shows the level in force ("Auto · 1440p"), and its tooltip says why Auto chose it.
- **A manual level the device cannot hold** draws the nearest that fits, with item 121 (f)'s line ("4K needs more graphics memory than this device has; showing 1440p"): never a refusal, never a crash.
- **Wiring:** §1b and §2.12 rows; §4.9 rows; §3.16 edges (a change never during a gesture; a device-pixel-ratio change re-evaluates; a manual level above capacity).
- **Tests:** a T-V9 row for item 121 (h)'s V09 bars:
  - Auto is the default on a fresh install;
  - a manual level is honoured or its explanation shown;
  - labels and chrome are drawn at the device pixel ratio at every level;
  - exports are byte-identical across settings.

### G122-V09 — major — F-MISSING — owner: V09

**Claim.** The canon's item-122 ruling routes this part to V09: "Show crises, the preview, the why lines, Find's listing". V09 has no crisis look anywhere: 0 hits for crisis, `ConditionOverlay` or Show crises.

**Required change.** V09 adds, at build depth:
- **Show crises:** a switch in §5.4's Show menu, on by default.
- **The preview:** a manual crisis preview for a map without a dossier, as item 118 (b)'s festival preview.
- **The why lines:** in §5.8's card, naming the crisis and its weeks ("Refugee camp: the Northmarch migration, weeks 12–20").
- **Find's listing:** the looks under item 120's panel (G120-V09).
- **Knowledge:** a condition the viewer's key withholds is neither drawn nor listed (View as, V09 §4.8).
- **Wiring:** §4.9 rows; §1b and §2.12 rows; §3.16 edges (no condition and no preview: byte-identical to the base).
- **Tests:** a T-V9 row for item 122 (g)'s V09 bars.

### G122h-V09 — major — F-MISSING — owner: V09

**Claim.** The canon's ruling for item 122 (h)–(i) routes this part to V09: "Fit, the opening view, the limit, the panel's numbers". V09 §4.21.6 (l.3253), **Fit the town**, `info.zoom.limit` ("This is the whole town.") and T-V9-76 know only item 116's limit.

**Required change.** V09 §4.21.6 adds the following.
- While crisis looks stand, the opening view and **Fit the town** take in the town and its camps.
- Item 116's zoom-out limit widens to the bounds of town and camps together, and both return to item 116's when the crisis ends.
- A view the user has already moved is never yanked.
- The panel gives the full number for a force drawn as massed camp marks on the ring ("about 24 000 besiegers, three armies"). The line for `info.zoom.limit` while a look stands is added.
- T-V9-76 gains two clauses: the opening view contains every camp, and the limit is restored when the crisis ends.

### G123-V09 — major — F-MISSING — owner: V09

**Claim.** The canon's item-123 ruling routes "the panel lines" to V09. V09's plan panel and why card have no line for a damaged plan (item 123 (e): "roof fallen in over the hall; the upper floor is gone").

**Required change.**
- V09's plan panel (its contents V03 §4.5's, V09 l.236) and §5.8's card show the damage lines of V03's damage layer for a building that is `abandoned`, `decayed`, `ruined`, or restored with patches. There is one line per damaged element kind at the building's decay level, its words a catalogue family loaded from V10 and V03.
- §4.9 adds the family row.
- A T-V9 row covers them: a never-decayed building shows no damage line, and a higher decay level shows a superset.

### G124-V09 — major — F-MISSING — owner: V09

**Claim.** The canon's item-124 ruling routes this part to V09: "the advanced panel's switch, Start a shower now, the defaults (on with headroom; off on the low tier, phones and reduced motion)". V09 §4.14 and §2.11 carry none of it.

**Required change.**
- **The switch.** V09 §4.14's advanced panel gains **Weather effects** on/off (device state, `AppPrefs`), with **Start a shower now** (a spell of the season's commonest kind).
- **Defaults:**
  - on where the tier has headroom;
  - off on the low tier, on phones and wherever the system or V09 §5.12's reduced-motion setting asks it.
- **Wiring:** §2.11's field; §2.12's row; §4.9 rows; §3.16 edges (the switch never changes a tile or the hash).
- **Tests:** a T-V9 row for item 124 (i)'s V09 bars.

### G125-V09 — major — F-MISSING — owner: V09

**Claim.** The canon's item-125 ruling routes "the season control as the week's fallback" to V09, and V09 still takes the week from the retired campaign input:
- §1b's dossier table row (l.388) reads "the campaign calendar's week and season";
- §4.21.7 (2) reads "the dossier's current week and season";
- §4.21.7 (5): "A dossier with no week falls back to midsummer with the switch on".

Item 125 (a)–(b) retires `HostContext.week`. The week is the dossier's latest stamped tick where it has one, else the user's season control.

**Required change.**
- **l.388:** the dossier field reads "the dossier's latest stamped tick — its conditions' `triggeredAt`, its calamities' and history's ticks (item 125 (b))".
- **§4.21.7 (2):** **Follow SettlementForge** follows that tick.
- **§4.21.7 (5):** a dossier without a stamped tick leaves the week to the Season control, at midsummer, with `view.season.noWeek`.
- **A host's `view.set { week }`** is a command, not an input (item 125 (c)).
- **T-V9-77** gains item 125 (e)'s V09 clause: the same dossier with and without a host context opens on the same week.

### G119a2-V09 — major — F-MISSING — owner: V09

**Claim.** The canon's item 119 (a2) part for V09 (J132) reads "the progress view shows the coarsened cadence". V06 now coarsens an `advance`'s cadence and the replay's epoch length to fit the comfort level in total (V06 §6.8). Its hand-off asks V09's epoch line to count at the cadence chosen, from `EpochReport.advance`.

V09 does not show the cadence:
- §4.9's `progress.<wait>` row (l.2116) has `epoch` "Year {year} of {years}" and `history` "Replaying the town's past: {year}", with no cadence;
- §4.21.9 (1) (l.3302–3304) and T-V9-79 defer to "V06's part of item 119".

**Required change.**
- **The rows.** `epoch` reads "Year {year} of {years}, in {n}-year steps" (from `EpochReport.advance.cadenceWeeks` against `.requestedWeeks`), and `history` reads "Replaying the town's past: {year}, in {n}-year steps" (from `ReplayPlan.epochYears` when `coarsened`). Each step clause shows when the run coarsened.
- **§4.21.9 (1):** an advance and a history-first generation each complete within the ten-second comfort level in total (item 119 (a2); J132), coarsened to fit.
- **T-V9-79:** the line names the cadence chosen.

### G122-V10 — major — F-MISSING — owner: V10

**Claim.** The canon's item-122 ruling routes "the explanations" to V10. Item 122 (f): "The 'Why?' card and the clerk name the crisis and its weeks". V10 has no crisis section, look read or prompt rule (0 hits for crisis or `ConditionOverlay`).

**Required change.** V10 §3.9b adds item 122 at build depth:
- **The look read** (V10 §3.9b (5)) gains the conditions standing in the view's week, each with its look kind, its weeks and its words ("Refugee camp: the Northmarch migration, weeks 12–20"). A condition the session's key withholds is absent (§7.7's admission).
- **A crisis look is a look, never a model fact.** Its aftermath is explained through the epoch path (V06's hand-over: the camp at the growth frontier, reconstruction as Works).
- **The rest of the wiring:** a prompt-rule clause; `LookAnswer`'s field in V10 §2.13; T-V10-50 edge clauses (no condition; a withheld condition); a T-V10 test.

### G123-V10 — major — F-MISSING — owner: V10

**Claim.** The canon's item-123 ruling routes "the explanations" to V10. Item 123 (e): the clerk says "roof fallen in over the hall; the upper floor is gone". V10 §3.9a's `plan` section has no damage rows, and no part of V10 explains the decay level.

**Required change.**
- V10 §3.9a's `plan` table gains the damage rows of V03's damage layer: one key per element kind and state (`info.plan.damage.<kind>`), with their `en` words. Each row's `ref` is the element, and the decay level is read from V06 (its existence state and the years since it was abandoned).
- A building never decayed shows none.
- T-V10-29's words walker and a T-V10 clause cover them.

### VV910-r1-01 — minor — WIRING — owner: rendering

**Claim.** V09 §4.21.9 (2) (l.3313–3316) offers **Stop** on three waits:
- V06's advance;
- item 113's history replay at generation, where "a stopped history-first generation leaves no document and shows `info.history.cancelled`" (added this round, VV910-11; V06 §3.20.4's cancel edge row);
- an export.

§11.2's `PlatApi` has `cancelAdvance(h)` only (l.15114). Neither `generate` (which has no handle until it resolves) nor `export` can be stopped. Two of the three Stop controls are one-ended hooks. VRC1T-06 covers the progress side, not this.

**Required change.**
- §11.2: `generate`'s and `export`'s `opts` gain `signal?: AbortSignal`.
  - **`generate`.** A stopped run rejects with no handle and no document; for a history-first generation the app then shows `info.history.cancelled` (V06 §3.20.4; V09 §4.21.9).
  - **`export`.** A stopped export rejects with nothing written.
- V09 §4.21.9 (2) cites it.

### VV910-r1-02 — minor — EDGE-UNDEFINED — owner: V09

**Claim.** V09 §3.8 (3) (l.1253–1256, J-V9.137, new this round) re-issues a journalled `advance` that **Stop** ended: "the shell calls `cancelAdvance` when the job's `onProgress` (§11.2) reports epoch `stoppedAfter` running".

§12's progress rule (l.15658–15660) posts a non-stage wait's `Progress` "as each of its own steps completes". So:
- **A stop after the first epoch can never be reproduced.** For `stoppedAfter` = 1, no message reports epoch 1 running.
- **Any other stop is a cross-thread race.** It holds only if the cancel arrives before the next epoch starts.

Either way the re-issued group folds more epochs than the journal recorded. Its `logHeadAfter` mismatches, and recovery stops with `error.recoveryPartial`. That contradicts T-V9-17's "no epoch lost and no recovery line shown" (l.3893). The outcome is a defined rung, so this is not a blocker, but the stated outcome fails.

**Required change.**
- **V09 §3.8 (3):** a stopped `advance` is re-issued with its epoch count — `advance(h, req, { stopAfter: stoppedAfter, onProgress })` — the job folding at most that many epochs and writing `stoppedAt` on the last, as Stop does (V06 §2.3, V06 §4.1). The timed `cancelAdvance` is dropped.
- **V09 §10.1** lists the request that §11.2's `advance` options gain `stopAfter?: number`.
- **T-V9-17** adds a clause: an advance stopped after its first epoch and killed before compaction reopens at its `logHeadAfter`.

### VV910-r1-03 — minor — TERM — owner: V09

**Claim.** Three term slips sit in subsections this round replaced (principle (2); canon glossary):
- **l.1628** (§4.3's T1 row): "a standalone neighbourhood's outline". G-standalone retires that form, and base §7.1's T1 row says "a standalone neighbourhood document's outline".
- **l.959** (§2.12): "holds through Regenerate, scoped re-rolls, reloads and epochs". G-newrandom retires "scoped re-roll".
- **l.2116 and l.3305:** "a restore jump". This is a new name for **Go back to here** from a restore point (V09 §3.9). It names no separate action, and §3.9 never uses it.

**Required change.**
- l.1628: "a standalone neighbourhood document's outline".
- l.959: "holds through Regenerate, New random, reloads and epochs".
- l.2116 and l.3305: "**Go back to here** (from a history row or a restore point, V09 §3.9)" in place of "Go back to here and a restore jump".

### VV910-r1-04 — major — CONFLICT — owner: V10

**Claim.** The two volumes give opposite answers on whether a host's own assistant may set the viewer's Find chips:
- **V10 §3.9b (7)**, item 120's part written this round, says: "A host's own assistant (configuration C) sets the chips as it sets any per-viewer view key, by §11.3's `view.set`".
- **V08 §3.16 (g)**, also written this round, says SettlementForge's assistant "answers … in words from the `gazetteer` query and sets no chip — no host message sets the frame's view but `view.set { week }` … while the in-frame clerk's 'show me …' is V10's (item 120 (i); J-V8.127)". V08's repair handed exactly this to V10.
- **§2.9 and V09** (T-V9-45) keep per-viewer keys, `find` among them, off the bridge (VRC1T-02).

SettlementForge is the host (J121), so configuration C's assistant is V08's.

**Required change.** V10 §3.9b (7) *Absent and at its limits*: replace that sentence with:

"A host's own assistant (configuration C) sets no Find chip: it answers in words from the `gazetteer` query (V08 §3.16 (g); J-V8.127), the per-viewer keys never crossing a bridge (§2.9), and a host proposal carries no find form; 'show me …' is the in-frame clerk's (this section)."

T-V10-51 adds: a host message never sets a chip.

## CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed, or read at the line):
- every claim above;
- the live hashes equal assemble-r1's;
- the per-section word diffs and every hunk read;
- the outcome-key and button censuses;
- the V10 §2.13 → §11.2 fragment check;
- the id-uniqueness and retired-term scans;
- the strict ID-TOOL scan;
- the price arithmetic against §16 and INDEX;
- the doc_checks counts.

**PLAUSIBLE:**
- VV910-r1-02's race for a stop after more than one epoch depends on message latency; the stop after the first epoch fails by construction.
- doc_checks stays provisional until it runs against the full corpus.
- Verifiers still running (vol-V05-V06, vol-V11-V12 and the seam and edge seats) may raise V09 or V10 hand-offs that this report does not list.
