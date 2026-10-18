# Verify — coherence pass, round 0: volumes V09 (application) and V10 (clerk)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-vol-V09-V10-r0s; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V09-V10-r0s`, 2026-09-30 → 2026-10-01, cloud checkout; scratch `scratchpad/coherence/v910/`)
- P0 resume check (no LANDED line, no output): fresh start — done
- P1 inputs read (the brief in full; inventory-vol-V09-V10; rewrite-V09, rewrite-V10; canon units V09 and V10; the 39 conflicts; the dated rulings for g 111–119) — done
- P2 live text against the rewrite outputs (the assembler's changes) — done. Both volumes are byte-identical to `new/volumes`. The assembler left 9 + 3 ambiguous references and a V12 note on `register.json`.
- P3 every inventory id token-checked at its mapped home, and every flagged id read by hand — done (1 916 ids, 111 flagged, all read)
- P4 every changed paragraph of the body read (archive → live word diff, per section) — done (V09 and V10)
- P5 canon rulings routed here (conflicts, elegance equivalence lists, wiring gaps, id rulings, glossary) — done
- P6 g items 111–119 (the dated rulings) and the f items about each volume — done
- P7 edges (the edges.json rows owned by V09 and V10, and the combinations) — done (259 entries mapped)
- P8 cross-part notes addressed to V09 and V10 in the other rewrite reports, and the agreement hand-offs — done
- P9 cohesion (build plan against INDEX and §16), ids, references, terms, deferral, doc_checks — done
- P10 this report, the result file, LANDED — done

## Outcome

**Not clean: 21 issues — 0 blockers, 5 major, 16 minor.** Owners: V09 13, V10 4, rendering 2, determinism 1, V06 1.

**The majors:**
- **VV910-01:** base §9.5's count badge was never given f item 348's step. It still says 'one more or one fewer', while V09 §4.5 steps by (band max − band min) ÷ 8.
- **VV910-02:** V10 reads the calibration record from `plat/calibration/register.json`, which never ships. V12 §2.10 makes `dist/evidence.json` the one copy, and V09 already reads that.
- **VV910-03:** the history store's device defaults (256 MB, 96 MB, 8 frames) are stated nowhere. V09 points to V06, and V06 points back to V09. The V06 side is VV56-02, but its fix picks the other home than the canon does.
- **VV910-05:** item 119's progress view reads worker stage messages that §11.2 never declares fully: `Progress` is undeclared, and four of the one-time waits have no progress option.
- **VV910-07:** §7.1's binding table homes `setAttr` on `Enceinte.pathway` and on `WaterBody.spring.flow` at T9 by its catch-all, while V09 §4.3 and V06 §4.2 home them at T3 and T2.

**The minors:**
- Wiring gaps in V09's catalogue and progress view: VV910-08, -10, -11, -12, -13.
- V10's island bend list: VV910-09.
- Two internal conflicts in V09: §3.16 row 22 against V09-ICONF-2 (VV910-14), and §4.9's one-to-one rule against its own gate rows (VV910-15).
- A lost scope line: VV910-16.
- Two term slips: V10's retired **Change the stairs** (VV910-17), and V09's 'ceiling' for the owner's 'comfort level' (VV910-18).
- Reference slips: VV910-06 and VV910-19 (two of the assembler's twelve ambiguous references).
- ID-TOOL unapplied in both volumes: VV910-20 and VV910-21.

**Held:** the rest of the two volumes holds. Every one of the 39 conflicts routed here is applied as ruled. The E-04, E-07, E-24, E-32 and E-33 equivalences are kept. The g 111–119 parts for V09 and V10 are present. All 259 edge entries map to rows. The moved constants exist at their homes. Every V02 bend id has a row. ID-WX holds. The BCR pointer tables resolve. The price arithmetic and the K2 thresholds agree with V12.

## Sizes

| volume | archive (wc words) | live (wc words) | change | rewrite report (str.split) |
|---|---|---|---|---|
| V09-application.md | 109 687 | 103 572 | −5.6 % | 111 610 → 105 485 (−5.5 %) |
| V10-clerk.md | 83 260 | 73 916 | −11.2 % | 84 658 → 75 073 (−11.3 %) |

Neither volume shrank by half or more. Both stay below the 25–40 % shrink band. Each rewrite report records why: the g 111–119 additions, the item-110 screens, and the J121/J122 rewrites of the clerk's configuration.

Live V09 (md5 61c64d89…) and live V10 (md5 db5d506d…) are byte-identical to `docs/validation/coherence/new/volumes/`.

## Method

1. **P2, the assembler's changes.** I diffed the live volumes against the rewrite outputs: no difference. I read the assembler's report for V09 and V10:
   - 12 ambiguous-form references (`work/assemble-r0/ambiguous-refs.tsv`), each read (§ *Ambiguous references* below);
   - the V12 note on `register.json`, which became VV910-02.
2. **P3, the token check.** For each of the 1 916 inventory ids (V09 and V10), I extracted every distinctive token from its statement:
   - code spans, T-V and J-V ids, DR ids, quantities with units, quoted strings and dotted keys.

   A token flags when it is in the archive volume but not in the live one. 111 ids flagged. I read each at its canon home (`canon.json` by_inventory_id). All 111 resolve to one of four cases:
   - a ruled move (E-04 to §7.1's binding, E-07 to the outcome table, E-24, E-32, E-33, the moved constants, now in V11 §3.24.1–2 and base §7.1);
   - a renaming the canon ordered (ClerkHarness → ClerkHandle, DR-V8.7/8 → DR34/35, `touchL3L4` → `touchFabric`, J-V9.136's retired keys);
   - a J121/J122 rewrite;
   - one of the issues below (VV910-03, -16).
3. **P4, the word diff.** I parsed both copies into sections and diffed each section word by word (`wdiff.py`). The normalizer covers only the canon's mechanical changes: V9 → V09 at volume references (never inside J-V9 or T-V9 ids), the volume prefix that G-cite inserts, and the two renamings above. I read every hunk of both volumes against the rewrite report's mapping table and the canon's rulings, and logged each open question in `checks.md` (C1–C69, all closed: confirmed fine, or one of the issues).
4. **P5, the canon.**
   - **The 39 conflicts routed to V09 and V10:** DIC-06, DIC-07, DXC-04, MC-11, SCOPE-C07, SCOPE-C15, SCOPE-C16, V09-ICONF-1 – -5, V09-XAGREE-1 – -3, V09-XCONF-1, V10-XAGREE-1 – -4, the V09 and V10 J121/J122 rows, CANON-C02 – -C04 and the rest of the unit lists. Each is checked at its text.
   - **The elegance equivalences:** E-04, E-07, E-16, E-17, E-24, E-28, E-32 and E-33, each by its equivalence list.
   - **The id rulings:** ID-WX, ID-BCR, ID-DUPDEF, G-cite, G-DR, ID-TOOL and ID-LAYER.
   - **The glossary terms used by both volumes.**
5. **P6, the owner rules.** For g items 111–119, the dated rulings' V09 and V10 parts:
   - the oasis and spring flow, the battle-map export, items 113's history and lost void, 114's wall states and Repair/Wear;
   - item 115's honoured grandeur, 116's margin stop, 117's season control (weeks 0–51, the chips at 6, 19, 32, 45, Follow SettlementForge);
   - item 118's festival switch, and 119's progress view and comfort level.

   The f items that concern V09 and V10, through their BCR rows, checked at the base text. Item 348's §9.5 part is missing (VV910-01).
6. **P7, edges.** I mapped every edges.json row owned by V09 or V10, and every combination row naming them, to V09 §3.16's rows or V10's edge rows (`edgemap.json`, 259 entries, all mapped). I then checked each outcome's message key against V09 §4.9 (VV910-10, -11, -12).
7. **P8, cross-part notes and agreement.** I read the notes addressed to V09 or V10 in the other 16 rewrite reports, and checked each at its destination:
   - V05's notes 9 and 10 (VV910-08, -09);
   - determinism's note on the empty-edit row (VV910-12);
   - V12's note 2 (VV910-02);
   - V06's notes (VV910-11);
   - V09's own note 5 (VV910-05).

   For agreement, I checked V09 §4.3 against §7.1's binding row by row (VV910-07), V09 §4.9 against §7.1's outcome table key by key (no outcome without a row; VV910-15), and the V09/V10 pairs: the empty-state town (J-V9.127), the crypt words, V11 §4.2's key union, the season weeks and the size words.
8. **P9, the build plan, ids and terms.** I checked the build plan against INDEX and §16 (the gaps are already raised: VCS-08, VCS-18). I scanned the id families and the references. I scanned the terms, including the tool-word scan for ID-TOOL (`idtool.py`, paragraph and table-row units). I checked deferral wording ("TBD", "open", "later": none outside the owner questions and §12's PLAUSIBLE list). Then I ran doc_checks.

### Ambiguous references (assemble-r0's list)

| unit | line | ref | reading under S7 | verdict |
|---|---|---|---|---|
| V09 | 302 | §6.1 | base §6.1 (the render-time hashes of `style.jitter` / `style.crowns`) | correct |
| V09 | 1438 | §3 in "(V09 §2, §3)" | base §3 | **wrong**: V09 §3 is meant (VV910-19) |
| V09 | 2157 | §4.2, §5.1 in "(V08 §13 X12: §4.2's …, §5.1's …)" | base §4.2, §5.1 | **wrong**: V08 §4.2 and V08 §5.1 are meant (VV910-19) |
| V09 | 3831 | §7.3 item 9 (d) | base §7.3 (F-EDIT staged layer) | correct |
| V09 | 4190 | §7.3 item 9 | base §7.3 (the closure) | correct |
| V09 | 4246 | §2.9 (×2), §7.5 | base §2.9 steps 2–3, base §7.5 ("the base separates the three") | correct |
| V10 | 1824 | §2.3 | base §2.3 (terrain and water) | correct |
| V10 | 2568 | §7.1 | base §7.1 (`FieldStroke`) | correct |
| V10 | 2593 | §3.2 | base §3.2 (numeric policy; the rounding rule) | correct |

### doc_checks (provisional)

`python3 docs/validation/bench/doc_checks.py --doc docs/volumes/<V>.md --heads docs/ARCHITECTURE.md` warned:

> "reference corpus INCOMPLETE (missing: captures, research/patreon, research/devlogs, research/ftg-docs, research/external) - clean-room results are NOT authoritative; re-run on the machine that holds the corpus before any freeze"

The counts below are provisional. Both runs exit 1 on unreviewed hits.

| file | C1 | C2 | C3 (hits / unreviewed) | C4 | S1 | S2 (hits / unreviewed) |
|---|---|---|---|---|---|---|
| V09-application.md | 1 / 0 | 1 / 0 | 234 / 224 | 0 | 0 | 337 / 103 |
| V10-clerk.md | 0 | 0 | 145 / 138 | 0 | 0 | 285 / 21 |

- **C3:** every unreviewed hit was read. They are generic phrases and runs of section numbers ("the arrow keys move the", "a copy of the town", "7 5 7 6 7 8"), not copied text.
- **S2:** every unreviewed hit was classified by script (`s2check.py`). All 124 are volume-prefixed pointers (`V09 §5.8`, `V10 §2.12`, …) that the check matched against base headings, so they are false positives. No bare pointer fails to resolve.
- **Reference defects:** the real ones are the two in VV910-19 and VV910-06. S2 does not catch them, because each target exists in the base.

## Already raised by other verifiers (not raised again here)

These touch V09 or V10 and are already on record. Each issue below is new.
- **g 114–119 base parts:** VRC0S-01 – -05, VDC0-04 – -06, VM-R0S-03 – -05, VCS-01 – -06, VPC-01, VPC-04.
- **VDC0-04:** `wearWall` is missing from §7.1's T3 binding row; V09 §4.3 l.1620 carries it.
- **VDC0-15, VV78-13:** `rerollLayer('forest')`. V09 §4.3 l.1651 repeats V07's binding and follows that fix.
- **VV56-02:** the history-store defaults, V06 side. See VV910-03 for the home the canon names.
- **VV56-10:** V06 §4.2 homes `downgradeWay`, `upgradeWay` and `repairRaised` at T4, while §7.1 and V09 home them at T9.
- **VV56-24:** V09 has no rows for the island hand cap and the rung bend. VV910-08 adds the J-VI.4 lines it leaves out.
- **VV34-03:** `info.under.excavation.lost` in V04 against `info.under.lost` in V09 and V10.
- **VV34-05:** `bend.crypt.cathedral` lacks V03's `{m2}`.
- **VK0-17:** V09 l.1427's `E_NON_SIMPLE`.
- **VPC-08, VPC-09:** '§4.2 S10b's ceiling' in V09 and V10 should cite §4.7.
- **VPC-23:** the negative-week modulo.
- **VPC-29:** `StageId` is undeclared.
- **VM-R0S-04:** the year position and the follow flag at §2.9, and how `season` relates to them.
- **VM-R0S-11:** `HistoryHint.peak`.
- **VM-R0S-25:** `Recipe.presetId` has no V09 reader.
- **VRC0S-10:** `cvdVariant`.
- **VRC0S-29:** the empty-edit carrier. VV910-12 is the V09 row it points to.
- **VDC0-36:** `refuse.stale`.
- **VCS-08, VCS-18:** V09's 21.5–31.75 pw and V10's 14.5–20 pw are not in §16 or INDEX.
- **VCS-09:** §16's rows for items 116–118 that T-V9-76 – -78 cite.

## Issues

| id | severity | kind | owner | claim (short) |
|---|---|---|---|---|
| VV910-01 | major | F-MISSING | rendering | §9.5's count badge lacks f item 348's step; it still says 'one more or one fewer' |
| VV910-02 | major | CONFLICT | V10 | V10 reads the never-shipped `register.json`, not V12 §2.10's `dist/evidence.json` |
| VV910-03 | major | LOST | V09 | history store defaults (256 / 96 MB, 8 frames) stated nowhere; V09 ↔ V06 pointer loop |
| VV910-04 | minor | BROKEN-REFERENCE | V06 | V06 cites 'V09 §9' (the decisions table) for the history store settings |
| VV910-05 | major | WIRING | rendering | `Progress` undeclared; four one-time waits have no `onProgress` that V09 §4.21.9 reads |
| VV910-06 | minor | BROKEN-REFERENCE | V09 | '§1.7's worker boundary' cites the tech stack; the boundary is §11.2 |
| VV910-07 | major | CONFLICT | determinism | §7.1's binding homes `Enceinte.pathway` and `spring.flow` at T9, but V09 and V06 home them at T3 and T2 |
| VV910-08 | minor | WIRING | V09 | J-VI.4 (a)–(c) island bends have no V09 §4.9 rows |
| VV910-09 | minor | WIRING | V10 | V10 §3.16 names two island bend keys, not the family |
| VV910-10 | minor | WIRING | V09 | the go-back wait's progress has no `progress.<wait>` row and is not in §4.21.9 (1) |
| VV910-11 | minor | WIRING | V09 | V06's 'Generate without its history' cancel has no control or row in V09 |
| VV910-12 | minor | WIRING | V09 | no catalogue row for §7.1's empty-edit reason |
| VV910-13 | minor | WIRING | V09 | S15 and the tail stages have no progress group |
| VV910-14 | minor | CONFLICT | V09 | §3.16 row 22's 'a kind with two home tools' contradicts V09-ICONF-2 |
| VV910-15 | minor | CONFLICT | V09 | §4.9's one-to-one rule contradicts its own gate refusal rows |
| VV910-16 | minor | LOST | V09 | §1.1 (9) dropped the key entry (the own-key card) |
| VV910-17 | minor | TERM | V10 | V10 cites the retired **Change the stairs** button |
| VV910-18 | minor | TERM | V09 | 'ten-second ceiling' where the owner's rule and V11 and V12 say 'comfort level' |
| VV910-19 | minor | BROKEN-REFERENCE | V09 | two list continuations read as the base under S7 (l.1438, l.2157) |
| VV910-20 | minor | ID | V09 | ID-TOOL not applied (about 344 bare first uses) |
| VV910-21 | minor | ID | V10 | ID-TOOL applied only in part (about 74 bare first uses) |

### VV910-01 — major — F-MISSING — owner: rendering

**Claim.** File f item 348's §9.5 part (BCR-V9-16, applied as written: plus and minus step the declaration's size by (band max − band min) ÷ 8) is applied nowhere.
- Base §9.5 *Authoring surfaces* (l.13431) still reads the count badge's 'plus and minus that re-run the dry run at one more or one fewer'.
- V09 §4.5's T5 row (l.1729) steps `sizeM2` by (band max − band min) ÷ 8, citing item 348. V10 cites §9.5 through BCR-V10-12.
- The canon routed item 348 to determinism only. So §7.1 got its `sizeM2` part (l.9367) and §9.5 got none.

The base and V09 now give two rules for one control.

**Required change.** Base §9.5 *Authoring surfaces*: replace 'with plus and minus that re-run the dry run at one more or one fewer' with BCR-V9-16's text: 'with plus and minus that re-run the dry run at the next step of the declaration's size — a quarter's `sizeM2` by (its band's maximum − its minimum) ÷ 8, clamped into the band, from the median when unset; a fill's density dial by one step (V09 §4.5); a roster's badge has none (its size is its lines)' (file f item 348).

### VV910-02 — major — CONFLICT — owner: V10

**Claim.** V10 reads the calibration register from a file that never ships.
- V10 §1b.1 (l.254) reads 'each cell's calibration register entry from V12 §2.6's `register.json`'.
- §2.13's `RuleAnswer.register` (l.1018–1019) is `{ id; status; method; due }`, 'the cell's entry in V12 §2.6's plat/calibration/register.json'.
- V12 §2.10 (l.759–777) makes `dist/evidence.json` the one shipped copy that the clerk's `RuleAnswer` reads. It takes `entry`, `status` (with 'owner' for a stamped cell), `method` and `due`. An absent or mismatched file shows the provenance source alone, and `plat/calibration/` never ships.
- V09 §4.14 (l.344, l.2454) already reads `dist/evidence.json`.

So the two readers of one record disagree, and V10 names a field (`id`) the file does not have. V12's cross-part note 2 and the assembler's report flag the same.

**Required change.**
- V10 §2.13: `register?: { entry: string; status: CalibrationEntry['status'] | 'owner'; method?: CalibrationEntry['method']; due?: string } /* the cell's row in V12 §2.10's dist/evidence.json, where one exists; an absent file or one of other table versions: the provenance source alone */`.
- V10 §1b.1 l.254: '… each cell's calibration record from V12 §2.10's `dist/evidence.json`'.
- Any 'details' text that names `id` names `entry` instead.

### VV910-03 — major — LOST — owner: V09

**Claim.** The history store's device defaults (256 MB on the desktop tier, 96 MB on the low-end tier; 8 frames kept in memory) are stated nowhere in the set.
- **Archive:** V09 §5.12 stated them (inventory V09-0701, which the canon homes at V09 §5.12), and so did `AppPrefs.history` (V09-0151).
- **Live V09:** §2.11 (l.892) replaced them with 'their defaults and ranges are V06 §2.2's', and §5.12 (l.3592) points to V06 §2.2.
- **Live V06:** §2.2 (l.570) and §6.5 (l.3585) point back to 'V09 §9', so the pointers form a loop.
- V06 §6.5's '≈ 150 CITY or ≈ 60 METROPOLIS epochs' now rests on an unstated size.

VV56-02 (blocker, owner V06) found the same loss but makes V06 §2.2 the home. The canon makes V09 the home: V09-0701 is a home at V09 §5.12, and V06-0100 is a reference to V09. The two fixes must agree on that one home.

**Required change.**
- V09 §5.12's History line: 'History — history store memory (default 256 MB on the desktop tier, 96 MB on the low-end tier) and frames kept in memory (default 8); per-device, outside the recipe, the log and every digest (V06 §2.2 reads them)'.
- V09 §2.11 `AppPrefs.history`: `{ storeMB: number /* default 256 desktop, 96 low-end tier (V09 §5.12) */; frames: number /* default 8 */ }`, replacing 'their defaults and ranges are V06 §2.2's'.
- Resolve VV56-02 to the same home: V06 cites, V09 states.

### VV910-04 — minor — BROKEN-REFERENCE — owner: V06

**Claim.** V06 §2.2 (l.570) and §6.5 (l.3585) cite 'V09 §9' for the history store's device settings. V09 §9 is the decisions table. The settings are in V09 §2.11 (`AppPrefs.history`) and V09 §5.12 (the Settings dialog). V06 §6.5, the home of V06-0319, also dropped its '256 MB desktop, 96 MB low-end' bound.

**Required change.**
- V06 §2.2 and §6.5: cite 'V09 §5.12' (and V09 §2.11's `AppPrefs.history`) in place of 'V09 §9'.
- V06 §6.5 reads '≤ the device's setting (V09 §5.12: 256 MB desktop, 96 MB low-end)', using the values V09 states under VV910-03.

### VV910-05 — major — WIRING — owner: rendering

**Claim.** Item 119 (c)'s progress view reads a worker message that the base never fully declares.
- V09 §4.21.9 (3) (l.3256–3258) and V09 §1b's row (l.354) say stage progress 'reaches the shell from the generation worker as each stage starts (the worker host's messages, §1.7's worker boundary; §12's progress rule), never polled'. This holds for every one-time wait in §4.21.9 (1).
- Base §11.2's `PlatApi` gives `generate` an `onProgress?: (p: Progress)`, but the `Progress` type is declared nowhere (l.14265).
- `advance` has its own `{ epoch; of }` callback (l.14287).
- `open` (a migration, opening from SettlementForge), `regenerate`, `adjust` (Re-derive) and `export` have no progress option at all.

The hook is one-ended (V09's cross-part note 5). VRC0S-05 writes §12's progress rule but not this interface.

**Required change.**
- Base §11.2 declares `type Progress = { stage: StageId; index: number; of: number } /* posted as each StageDecl starts */ | { wait: 'epoch'|'history'|'dossier'|'export'|'migrate'; done: number; of: number }`.
- `open`, `regenerate`, `adjust` and `export` get the same `opts.onProgress?: (p: Progress) => void` that `generate` has.
- `advance`'s callback becomes that `Progress` (`wait: 'epoch'`).
- §12's progress rule cites it.

### VV910-06 — minor — BROKEN-REFERENCE — owner: V09

**Claim.** V09 places the worker boundary in base §1.7, which is the tech stack (§1.7 'Tech stack (reasons; …)'):
- §1b's progress-view row (l.354): '§1.7's boundary';
- §4.21.9 (3) (l.3257–3258): '§1.7's worker boundary'.

The worker boundary and its messages are §11.2 ('The embedding API and the worker boundary').

**Required change.** V09 l.354 and l.3257–3258: replace '§1.7's boundary' and '§1.7's worker boundary' with '§11.2's worker boundary (`onProgress`)'.

### VV910-07 — major — CONFLICT — owner: determinism

**Claim.** E-04 makes §7.1's binding table the one home that V09 §4.3 cites and T-V9-12 checks pair by pair (V09-ICONF-2). Two homes disagree with V09 §4.3 and V06 §4.2:
- **(a) `setAttr` on `Enceinte.pathway`** (a ring's fate: road, absorb or keep). V09 §4.3 (l.1620) and V06 §4.2 (l.3253) home it at T3 `wall`. §7.1's T3 row (l.9752) does not name it, so the T9 catch-all ('every `setAttr` path no other row homes', l.9758) homes it at T9 `shape`.
- **(b) `setAttr` on `WaterBody.spring.flow`** (§2.3, item 111). V09 §4.3 (l.1615) and V06 §4.2 (l.3258) home it at T2 `ground`. §7.1's T2 row (l.9751) names only `geology`, a bank class and a site feature. A spring is not a `SiteFeature` (§2.3: hill, spur, valley, terrace, cliff, ravine), so it too falls to T9.

The other two mismatches in the same table, `wearWall` and `rerollLayer('forest')`, are already raised (VDC0-04; VDC0-15, VV78-13).

**Required change.** In base §7.1's binding table, the T3 `wall` row adds '`setAttr` on `Enceinte.pathway`' and the T2 `ground` row adds '`setAttr` on `WaterBody.spring.flow`'. Each then has one home, matching V09 §4.3 and V06 §4.2.

### VV910-08 — minor — WIRING — owner: V09

**Claim.** V05's island bends under J-VI.4 have no catalogue rows beyond the two that VV56-24 already names (`bend.island.handMax`, `bend.island.belowCity`):
- (a) 'At most three islands float here; this quarter joins {island}' (V05 l.708);
- (b) an access foot moved off a standing raised part, 'the line naming the deck or raised-way pier in the way', and an access kind bent to the nearest admitted kind (V05 l.1931–1933);
- (c) 'An island keeps one way up; moved to {site}', with the alternative 'Place a different access' (V05 l.1924–1925).

V09 §4.9 has only `bend.island.keepRoom` and `bend.island.rimStop` (l.2039–2040). T-V9-13 (l.3812) lists `bend.island.*` among the J-VI.4 bends whose rows must render, and T-V9-15 needs a row for each. Both bars fail on these.

**Required change.** V09 §4.9 adds four `bend.island.*` rows, each 'its text, single source, from volume 5' (V05 §3.23, V05 §4.2; J-VI.4):
- `bend.island.join`: 'At most three islands float here; this quarter joins {island}.'
- `bend.island.lastAccess`: 'An island keeps one way up; moved to {site}.', with the alternative `button.placeOtherAccess` 'Place a different access'.
- `bend.island.footMoved`: 'The way up lands clear of {pier}.'
- `bend.island.accessKind`: 'This way up can only be a {kind} here.'

The last two are worded here, because V05 names these bends but quotes no line. T-V9-13's list covers all four.

### VV910-09 — minor — WIRING — owner: V10

**Claim.** V10 §3.16 (l.2228–2229) names V05's island lines as two keys: '(`bend.island.keepRoom`, `bend.island.rimStop`, V05 §4.2)'. V05's cross-part note 10 (V05-WGAP-2b) and J-VI.4 carry every island bend into the clerk's `bend` category. V10's list is missing the hand cap, the rung bend and the J-VI.4 (a)–(c) lines.

**Required change.** V10 §3.16: replace the two keys with the family, 'V05's island lines (every `bend.island.*` row of V09 §4.9; V05 §4.2, V05 §3.23)'. The list then follows V09's rows (VV56-24, VV910-08).

### VV910-10 — minor — WIRING — owner: V09

**Claim.** V09 §3.9 (l.1270–1271) now shows the undo, restore and go-back wait through 'the progress view (V09 §4.21.9) counting the events undone of the total', once it passes `progress.showAfterMs`. The wiring is missing at both ends:
- §4.21.9 (1) (l.3241–3244) does not list this wait among the one-time waits.
- §4.9's `progress.<wait>` row (l.2065) has only `epoch`, `history`, `dossier`, `export` and `migrate`.

So the wait has no line text, and T-V9-15 and T-V9-79 do not cover it.

**Required change.**
- V09 §4.21.9 (1) adds 'Go back to here and a restore jump past `progress.showAfterMs`'.
- §4.9's `progress.<wait>` row adds `undo`: 'Going back: {n} of {total} changes'.
- V09 §3.9 cites `progress.undo`.

### VV910-11 — minor — WIRING — owner: V09

**Claim.** V06 §3.20.4 (l.3072–3073) says that cancelling a history-first generation leaves no document, and that its dialog offers 'Generate without its history' (the one-click path with `history.replay` false). V09 has neither the control nor its words:
- §4.21.9 (2) (l.3251–3252) offers **Stop** only 'where the wait can stop (V06's advance; an export)', although the history replay is one of its waits.
- No catalogue row or button carries 'Generate without its history'.

The hook is one-ended.

**Required change.**
- V09 §4.21.9 (2): **Stop** also on item 113's history replay.
- V09 §4.9 adds a row `info.history.cancelled`, 'No town was made.', with `button.generateWithoutHistory` 'Generate without its history'. The button commits the one-click path with `history.replay` false (V06 §3.20.4).

### VV910-12 — minor — WIRING — owner: V09

**Claim.** Base §7.1 *Empty edits* (l.9611) says an empty edit's 'dry run reports it empty with the reason (V09 §4.9)'. Two other sources point the same way:
- the determinism rewrite's note to V09 asked for 'a message row for an empty edit ("nothing to apply")';
- VRC0S-29's carrier `PreviewResult.empty` points to V09 §4.9's `edge.*` rows.

V09 §4.9's `edge.<case>` row (l.2066) has no case for an empty edit, so the base's citation has nothing to land on.

**Required change.**
- V09 §4.9's `edge.<case>` row adds `nothingToApply`: 'Nothing to change: {reason}.'
- Its reasons are §7.1's empty forms: no strokes; a stroke too short or a ring of zero area; a query matching nothing; no lines; no quarters; no face in scope; no alternative; every cell kept by locked ground.
- V09 §3.16 names the outcome.

### VV910-13 — minor — WIRING — owner: V09

**Claim.** V09 §4.21.9 (3)'s stage groups (l.3254–3256) end at `drawing` (S14 and the tiles of the first map), and two kinds of stage are left without a proper group:
- **S15:** base S15 Simulation (optional module, §4.10) has no group.
- **The tail stages:** these are `phase: 'tail'`, V04's underground layer, which runs after the first map (§4.1). §4.21.9 (2)'s rule says 'a volume's stage taking the group of the base stage before it'. So they would take S15's missing group, or S14's 'Drawing the map', which misnames them.

So T-V9-79's 'every registered `StageDecl` resolves to a group row' (l.3878) fails, or passes only with a wrong line.

**Required change.**
- V09 §4.21.9 (3) and §4.9's `progress.stage.<group>` row add two groups:
  - `people` for S15, 'Settling the people' (when the module is on);
  - `below` for every `phase: 'tail'` stage, 'Digging the underground'.
- The inheritance rule reads 'a volume's main-phase stage takes the group of the base stage before it'.

### VV910-14 — minor — CONFLICT — owner: V09

**Claim.** V09 §3.16 row 22 (l.1466) makes 'a kind with two home tools; a kind with none' a CI failure of T-V9-12. Canon V09-ICONF-2 rules that the unit of the binding is one home tool per (event kind, target class or path). `split`, `merge`, `delete`, `setAttr` and `instance` legitimately have several home tools by target (§7.1, V09 §4.3). As written, the row fails the binding it checks.

**Required change.** V09 §3.16 row 22: 'a (kind, target class or path) pair with two home tools; a pair with none'.

### VV910-15 — minor — CONFLICT — owner: V09

**Claim.** V09 §4.9's opening (l.1850–1852) says 'each `bend.*` and `refuse.*` row is the message key of one row of §7.1's dry-run outcome table … and T-V9-15 checks the two sets one to one'. But eight of its own refusal rows have no row in §7.1's outcome table (l.9663–9705):
- `refuse.viewer`, `refuse.layer`, `refuse.islandsRung` and `refuse.phone`;
- `refuse.exportTier`, `refuse.restore.dossier` and `refuse.stale`;
- the `refuse.clerk.<category>` family.

The same paragraph calls the viewer role, the staged layer, the rung and the screen 'availability gates, not bends'. As written, the one-to-one check fails. The missing §7.1 row for `refuse.stale` is VDC0-36.

**Required change.** V09 §4.9 reads: 'each `bend.*` row, and each `refuse.*` row of a dry-run cause, is the message key of one row of §7.1's outcome table … one to one. The gate rows (`refuse.viewer`, `.layer`, `.islandsRung`, `.phone`, `.exportTier`, `.restore.dossier`) and the clerk's `refuse.clerk.<category>` family are outside that table, each checked against its producer (§11.2's roles, V05, V09 §4.12, V09 §5.10, V08, V10 §3.16)'. T-V9-15's wording follows.

### VV910-16 — minor — LOST — owner: V09

**Claim.** V09 §1.1 (9) (l.162) lists volume 10's screens that this volume builds. It dropped the archive's 'key entry'. Yet §2.10 (l.836, l.874) and §4.11 still design the own-key card where a configuration enables the built-in clerk (V09-J121-4), and `enterKey` is a catalogue row (l.2144). The scope list no longer names a screen the volume builds.

**Required change.** V09 §1.1 (9): '… volume 10's drawer view model, the own-key card where a configuration enables the built-in clerk (V09 §4.11; J121), data notice, …'.

### VV910-17 — minor — TERM — owner: V10

**Claim.** V10 §3.5 step 3 (l.1499) gives **Change the stairs** as an example `subject` button. J-V9.136 (V09 l.4286) retired `button.changeStairs` along with the massing bend set, in favour of V02 §1b's ids. No catalogue row carries the label.

**Required change.** V10 §3.5 step 3: drop **Change the stairs** from the example list, leaving '(**Show a different name**, **Change the building's shape**)'.

### VV910-18 — minor — TERM — owner: V09

**Claim.** V09 calls item 119's ten seconds 'the ten-second ceiling' (l.200, 258, 3243, 3661, 3693, 3878). Three sources name it the comfort level, with §12's laws staying the targets:
- the owner's rule (g item 119 (a), revised 2026-09-30: 'note where our comfort levels really are');
- the canon's §12 routing;
- the sibling volumes (V11 l.4377, l.4576; V12 l.2210, l.2425–2430).

So one concept carries two terms (principles (2) and (10)). 'Ceiling' also reads as a target, which the revised rule ended.

**Required change.** V09: replace 'ten-second ceiling' with 'ten-second comfort level' at each of the six places. At l.200 the row reads 'the ten-second comfort level of a one-time wait, §12's laws staying the targets, and its progress rule (item 119)'.

### VV910-19 — minor — BROKEN-REFERENCE — owner: V09

**Claim.** Two ambiguous-form references from assemble-r0's list read wrongly under S7, where a bare §x is the base's:
- **l.1438,** '**(a) Data, state and flows (V09 §2, §3)**': V09 §3 (the runtime flows) is meant, but base §3 is the kernel.
- **l.2157,** '(V08 §13 X12: §4.2's controls and undo words, §5.1's strips and banner rows, …)': V08 §4.2 (the host-side actions) and V08 §5.1 (the Map tab) are meant. Base §4.2 is S0–S3, and base §5.1 is the failure tiers.

The other seven V09 and V10 entries in the list read correctly as the base: V09 l.302, 3831, 4190 and 4246 (×3); V10 l.1824, 2568 and 2593.

**Required change.**
- V09 l.1438: '(V09 §2, V09 §3)'.
- V09 l.2157: '(V08 §13 X12: V08 §4.2's controls and undo words, V08 §5.1's strips and banner rows, …)'.

### VV910-20 — minor — ID — owner: V09

**Claim.** Canon ID-TOOL (DIC-06): a bare T1–T12 is written with its tool word at first use in a paragraph or table row (T8 `fill`). V09 keeps about 344 first uses without the word, the same count as the archive (344), so the ruling was not applied to this unit. Examples:
- l.130: 'T3's **Retaining wall** mode and T2's **Terrace** mode … T4's **Raised** toggle … T6 on deck faces … T9's tier controls';
- l.207: 'V01's parameters on T1, T6, T8 and T12';
- the wiring table's '(4.5 T6)', '(4.5 T5)' and '(3.7, 4.5 T12)' (l.286, 287, 301).

**Required change.**
- V09: at the first use of each T1–T12 in every paragraph and table row, add its tool word:
  - T1 `intend`, T2 `ground`, T3 `wall`, T4 `road`;
  - T5 `quarter`, T6 `place`, T7 `roster`, T8 `fill`;
  - T9 `shape`, T10 `hold`, T11 `name`, T12 `dress`.
- For example: 'T3 `wall`'s **Retaining wall** mode'; '(V09 §4.5's T6 `place` row)'.
- Run the paragraph-and-row scan again: zero bare first uses.

### VV910-21 — minor — ID — owner: V10

**Claim.** Canon ID-TOOL (DIC-06; units V09 and V10) is applied only in part in V10. About 74 first uses in a paragraph or row still lack the tool word (96 in the archive). Examples:
- l.251: 'V09's T6 alternatives';
- l.259: 'the T11 `newNames` town form and the T12 `restyle` encoders' (these are encoder names, not tool words);
- l.284: 'the canvas's T8 tray';
- l.320: 'T9's row gains …', 'T10's row gains …', 'reach T2, T3, T4 and T9'.

**Required change.**
- V10: at the first use of each T1–T12 in every paragraph and table row, add its tool word (T6 `place`, T8 `fill`, T9 `shape`, T10 `hold`, T11 `name`, T12 `dress`, …).
- Run the paragraph-and-row scan again: zero bare first uses, apart from l.5's statement of the rule.

## CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed or read at the line):**
- every claim above;
- the byte identity of the live and rewrite copies;
- the token check (1 916 ids);
- the per-section word diff;
- the edge map (259 entries);
- the ID-TOOL scan;
- the doc_checks counts.

**PLAUSIBLE:**
- The ID-TOOL counts (about 344 and 74) depend on the scan's unit, one paragraph or one table row. The exact number of edits may differ by a few where a row wraps a list.
- doc_checks stays provisional until it runs against the full reference corpus.
