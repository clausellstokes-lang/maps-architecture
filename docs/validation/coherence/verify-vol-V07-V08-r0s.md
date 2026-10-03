# Verify — design volumes V07 (the village product) and V08 (the SettlementForge stage), coherence pass round 0

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/verify-vol-V07-V08-r0; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V07-V08-r0`; started 2026-10-03 in the cloud continuation; no earlier output on disk)
- P1 inputs gathered (canon routing for V07/V08, rulings, edges, cross-part notes from every rewrite report): done
- P2 mechanical checks (ids, references, terms, deferral, narration tags, mapping table, per-item tokens): done
- P3 V07 archive → new review (low-aligned units, keyed row diffs, decisions, rulings' equivalence lists): done
- P4 V08 archive → new review (the same, plus the moved DR rows against base §7.7 and the field table): done
- P5 cross-unit agreement, cohesion, wiring, edges, g items 111, 113 and 114, other verifiers' issues de-duplicated: done
- P6 report, results JSON, LANDED: done

Scratch: `/tmp/claude-0/-home-user-maps-architecture/ce371545-83c4-5807-9f2a-da73abd8485d/scratchpad/coherence/v78/`
(`rulings-V07.md`, `rulings-V08.md`, `mapping.json`, `refs-*.txt`, `tokmiss-*.txt`, `align-*.json`, `low-*.txt`,
`rowsig-*.txt`, `nokey-*.txt`, `jdiff-*.txt`, `jspan-*.txt`, `edges-V0?.txt`, `xnotes.txt`, `v08-fieldtable.txt`,
`notes.md` and the scripts that made them).

## 1. Outcome

**18 issues: 1 blocker, 7 majors, 10 minors.** By owner: V08 8 (1 blocker, 5 majors, 2 minors), V07 6 (2 majors,
4 minors), scope 2 minors, V11 1 minor, V02 1 minor. The live files are the assembled ones:
`docs/volumes/V07-village.md` and `docs/volumes/V08-settlementforge.md` are `cmp`-identical to their rewrite outputs in
`docs/validation/coherence/new/volumes/`.

Both volumes keep their content well:

* **Every inventory id is mapped and traced.** All 498 ids (V07 333, V08 165) are in the two mapping tables and every
  target resolves. Of the 29 ids whose code names, quotations or numbers were not found verbatim, every one is a
  formatting artefact (`x` for `×`, `[80,400)` read as a number), a value ruled changed (V07-ICONF-1's "4 from 320", the
  E-38 territory figure, NARR-7's superseded values in J-V7.42 and J-V7.45) or §16's totals removed as restatement.
* **The canon's routes are applied.** V07: DIC-06, MC-11, V02-ICONF-1, V07-ICONF-1 – -5, V07-XCONF-1, -2, CANON-C01,
  -C03, -C04; E-01, E-24, E-30, E-38 with their equivalence lists (E-30's compile check with the unit-mismatch failure,
  inverse and undo at base §7.6 l. 10633; E-38's `a_h · P ÷ usableShare`, 2.275 ha, 1.1 / 5.7 / 19.9 km² agreeing in
  V07 §2.1, §2.2 and §3.2 (1)); W-IF-02, W-FLD-08, V07-WGAP-1, -2; ID-BCR, ID-TOOL, ID-DR, ID-DUPDEF; all seven terms
  (0 retired-pattern hits); the 54 open findings; the 26 hand-offs; g items 111 (V07 §3.2 (4a), T-V7-58, W74, J-V7.134,
  J-V7.138) and 113 (V07 §3.12a, `history.former` with its lifecycle row, `rules.refound`, T-V7-59, W75, J-V7.135 –
  J-V7.137) at build depth. V08: SCOPE-C07, V08-XCONF-1 – -9, CANON-C03, -C04; E-17, E-24; W-DOS-01a/b (the field table
  covers all 41 required and 11 optional top-level keys), W-DOS-02, -07, -08, -09, W-HOOK-02; ID-BCR, ID-WX, ID-DR,
  ID-DUPDEF; the 36 open findings; the 20 hand-offs; g item 113 at build depth (V08 §2.6c, the history block, T-V8-49,
  J-V8.117).
* **The removed V08 restatements stand at their homes.** DR29 – DR35, removed from V08 §2.6a, §2.6b and §3.5 as cited
  rows, are word for word in base §7.7 (l. 11104 – 11110) save the base-side wording, and DR34's and DR35's V08-only
  details (the SIZE member, V11's culture modifier, the castle's significance and the `kinds` mapping) stay at V08 §2.6b
  (1), (2), (4); the `dossierRecord` event's author, refusal, tombstone and migration rules are at base l. 9450, 9678,
  10279 and 10581; W70's ≈ 250-word cell is wholly in V07 §2.1 *The records placement* and V07 §3.12 *Records at a
  village epoch* (V07-DUP-1).
* **What is wrong is narrow:** E-31's unification dropped two village clauses of the toll-bridge rule (the blocker);
  g item 114 (filed after both rewrites) has no V07 or V08 part; V07 names a reroll concern the base does not register;
  V08's compaction text still hard-codes two backups, its quota ladder deletes SettlementForge's backups (J121), and its
  co-DM design edits one map by two people at once against J122; g item 111's port reading has no bar.

**Not raised (checked):** `ProductDecl`'s type home at V07 §2.1 (rewrite decision 1) and V08's bridge, binding and digest
types at V08 §2.2 – §2.5 (decision 1) agree with file f items 202 ("V07 §2.1's type") and 509 / J-A509.01 and with the
landed base's citations; verifiers VD0-21 and AL-31 treat V07 §2.1 as the home. V08's §1b rows, renumbered W1 – W63
and merged by subject, lose no producer or consumer (the archive's `onCommit`/`onSnapshot`/`onThumbnail` callbacks were
named only in that row and never declared). Issues other verifiers already hold for V07 and V08 (AF-17; AH-01, -02, -10,
-12, -18, -23, -24; AL-20, -23, -24, -26, -30; VAP-10, -12; AT-22, -23, -24, -27; EL-03, -04; EW-04; VR0-25; VS0-09,
-21; VD0-13; VM0-13, -16; VK0-09; VP0-06, -27; ID-U-V07) are not repeated.

**Sizes** (whitespace words, the canon's count): V07 104 422 → 91 366 (−12.5 %), V08 84 356 → 71 572 (−15.2 %). Both lie
below the 25–40 % band; each rewrite names the irreducible content and its mandated additions (V07 ≈ 8 600 words of item
111/113 parts, edges, bars and decisions; V08 ≈ 8 100: the field table, items 111/113, edges and combinations, the bundle
call) — not a defect. Neither unit shrank by more than half; the chapters that did (§10, §12, §13, the integration notes
and the heads) were read whole: every §10 row's request and item checked against the canon's `requests_in_f` (V07 38,
V08 32, all agreeing; V07's co-applied items 376, 581, 210, 432, 496 extra and correct), §11 – §13 read whole, and the
narration ranges (the heads' ledgers, the reconciliation rounds 1–6 and their continuations, the finalization) read for
any rule found nowhere else (none).

## 2. Method (nothing sampled)

* **Mapping.** `mapping.json` from the two reports' tables: 498/498 ids, 0 unresolved; the withdrawn W40 (V07-0058) read.
* **References.** Every `§` token classified (V07 2 319, V08 1 487); the 21 not resolving at first pass read one by one —
  all line-wrapped `Vnn` prefixes or inline bold headings (V11 §3.19.2). Incoming: one unresolved, base l. 19211's
  "V07 §15" (VP0-27 holds it). Removed V07/V08 ids cited elsewhere: "V07's dependency (14)" (base §16) and "V08 X…" (V11,
  V02) — issues 16–18.
* **Ids.** T-V7-1 – T-V7-65, J-V7.1 – J-V7.142, W1 – W76 (W40 deleted), T-V8-1 – T-V8-51, J-V8.1 – J-V8.124, W1 – W63
  each defined once; every archived T/J id survives; every citation in the set resolves.
* **Terms, deferral, narration.** The canon glossary's 35 retired patterns: 0 hits. 157 deferral candidates ("later",
  "until", "pending", "owner's", "recommend") read in context: all descriptive or pre-decided fallbacks, save issues 9–10.
  Narration tags: three survivors (issues 12, 14, 15).
* **Tokens.** `tokens.py`: every inventory statement's code names, quotations and numbers looked up (29 flagged, §1).
* **Rows.** Every table row matched by its first cell and word-diffed (V07 663, V08 579); the 55 + 84 changed rows whose
  removed words were more than ids and citation forms read; the 69 + 125 rows with no same-key row matched by content
  (`nokey.py`) and the 8 + 57 below 0.8 containment read in full.
* **Prose.** Every archived prose unit aligned to its best new unit (V07 2 757, V08 2 353); the 92 + 144 below 0.7
  outside the narration ranges read.
* **Decisions.** Every J-V7 and J-V8 row diffed with its reason retention (`jdiff.py`, `jspan.py`); the 8 + 10 rows with
  removed spans of six words or more read — each a round label, a REVISED history or an amended-by mark (E-24), save
  J-V8.106's revised content, which the new row carries in full.
* **Rulings.** Each routed ruling's equivalence list checked item by item against the archive (E-01, E-17, E-24, E-30,
  E-31, E-38): E-31's list is met but the archive carried two village clauses the list omits (issue 1).
* **Edges.** The 82 open V07 edges (38 undefined, 44 untested) and the 61 open V08 edges and 62 routed combinations
  checked against V07 §3.17 and V08 §3.15 row by row; the outcomes, rungs and tests are present (V08's thin tests are
  EL-03's and EL-04's).
* **Cross-part notes** to V07 or V08 in the other seventeen rewrite reports (23 notes) checked at their destination:
  all closed except the determinism editor's note on `rerollLayer('forest')` (issue 4) and the V07 report's note 2 to V08
  (issue 1).

## 3. Issues

| # | id | sev. | kind | owner | where | claim (short) |
|---|---|---|---|---|---|---|
| 1 | VV78-E31-1 | blocker | NUANCE-LOST | V08 | V08 §2.6b (3) l. 1130–1132 | E-31's village column dropped "a flowing type keeps its type, its course placed between the frame arcs either way" and "the estuary at the brook's width class, its exit the sea side" |
| 2 | VV78-G114-V07 | major | F-MISSING | V07 | V07 §2.2a, §3.5a, §3.12, §4.1, §4.3–§4.5, J-V7.92 | g item 114's V07 part ("the kinds a village builds") absent; the forever-holding removals remain |
| 3 | VV78-G114-V08 | major | F-MISSING | V08 | V08 §0, W44, §2.7, §4.1, §4.3, §4.6, J-V8.66 | g item 114's V08 part ("map-side, never the dossier") absent; "stays removed through every later update" remains |
| 4 | VV78-REROLL-1 | major | CONFLICT | V07 | V07 l. 1927, 2750, 2934, 3096 | `rerollLayer('forest')` names no registered concern; base T10 has only `village.track` |
| 5 | VV78-BKP-1 | major | CONFLICT | V08 | V08 §3.7 l. 1859–1860 | compaction keeps exactly `backups[0]` and `backups[1]`, against `backupDepth` (§2.2 l. 403–405, J121) |
| 6 | VV78-QUOTA-1 | major | CONFLICT | V08 | V08 §3.7 l. 1893–1899, J-V8.118 | the quota ladder deletes SettlementForge's backups (J121) and contradicts "no stored snapshot is ever dropped" |
| 7 | VV78-COEDIT-1 | major | CONFLICT | V08 | V08 §0 l. 65, §3.3 l. 1518 | a DM and a co-DM editing one map at once, against J122 ("not now"; SCOPE-C08) |
| 8 | VV78-G111T-1 | major | F-MISSING | V08 | V08 §2.6 `site` l. 732–736, §7 | g item 111's port reading has no bar |
| 9 | VV78-PLAN-V07 | minor | COHESION | V07 | V07 §8 risks (6), (8) | fallbacks for base milestones that J122's slot puts before V-M1 |
| 10 | VV78-PLAN-INDEX | minor | COHESION | scope | INDEX §4 l. 112 | the V-M1 row's "(fallback: VG's water cut)" for a closure that lands at M2b |
| 11 | VV78-IN-V07 | minor | ID | V07 | V07 *Integration notes* l. 3726–3732 | IN-V07-n ids kept in the volume against ID-WX |
| 12 | VV78-SEAM-V07 | minor | NARRATION | V07 | V07 §4.5 l. 3041 | "CVR-V10-14's V07 half" — a seam id as a reference |
| 13 | VV78-RESTATE-V07 | minor | RESTATEMENT | V07 | V07 §2.4 l. 797–798 | V11 §3.5.2's reading rule restated incompletely |
| 14 | VV78-RCPT-V08 | minor | BROKEN-REFERENCE | V08 | V08 l. 534, 1014, 3110–3111 | receipts cited at `scratchpad/volumes/…`, outside the repository |
| 15 | VV78-NARR-V08 | minor | NARRATION | V08 | V08 §4.6 l. 2526 | "(applied by the finalization)" |
| 16 | VV78-REF-SCOPE | minor | BROKEN-REFERENCE | scope | base §16 l. 17638 | "V07's dependency (14)" — the list is now V07 §1's facts (1)–(8) |
| 17 | VV78-XREF-V11 | minor | BROKEN-REFERENCE | V11 | V11 §10b l. 4706–4712 | cites V08 X1, X2, X4 – X6, X9, X14, X19, X22, X25, which V08 no longer has |
| 18 | VV78-XREF-V02 | minor | BROKEN-REFERENCE | V02 | V02 l. 3820 | cites "V08 X6", which V08 no longer has |

The full claim and the exact required change of each issue are in
`docs/validation/coherence/results/coherence_verify-vol-V07-V08-r0.json`; the essentials:

**1 (blocker).** The archive's V07 §3.1 step 1 (l. 1363–1374) ruled, for a bridge-implying record at village rungs:
when the site gives `none` or a still water, a brook (on a coastal site an estuary *at the brook's width class, its exit
the sea side*); *a flowing type drawn or given keeps its type; either way* the course's entry and exit bearings lie on the
two frame arcs the through road's entries divide. V08 §2.6b (3)'s one rule, which V07 §3.1 step 1 now cites, scopes the
whole village column by "it applies when … give no river or canal", forces "a brook; on a coastal site an estuary" and
places only that forced course. A riverside village (DR1 `riverside`) with a `Toll bridge` record therefore has no rule
placing its river across the through road and no defined outcome for its toll house — a silent wrong result. The
rewrite-V07 report's cross-part note 2 asked V08 to carry exactly these clauses; V08 did not.

**2, 3 (g item 114).** Item 114 (filed 2026-10-03 02:35 UTC, after both rewrites landed; applied like items 111 – 113)
names V07 and V08. V07 has no switch rows and keeps the hold-for-ever removals item 114 (c) withdraws (V07 §3.5a l. 1657,
§3.12 l. 2544 and 2577, §4.1 l. 2937, §4.3 l. 2995, §4.4 l. 3016, §4.5 l. 3044, J-V7.92); V08 keeps "it stays removed
through every later update from SettlementForge" (§0 l. 61) and the slot that "stays closed" (W44, §2.7 l. 1265, §4.1
l. 2304, §4.3 l. 2359, §4.6 l. 2447 – 2450, J-V8.66 "never lapses"), and says nothing of switches being map-side.

**4.** Base §6.1 (l. 8624 – 8632) registers exactly `naming`, `render.instances`, `style.jitter`, `style.crowns`,
`style.compass`, `naming.emblem` and `village.track`, the schema refusing any other key; §7.1's tool table puts
`rerollLayer('village.track')` under T10 `hold` and `render.instances` under T12 `dress`. V07 offers
`rerollLayer('forest')` under T10 — refused by the schema. The determinism editor's cross-part note asked V07 to change it.

**5 – 7.** See the table; 6 and 7 are the two choices the V08 editor marked for the adjudicator (decision 4; cross-part
note 10) — both conflict with an owner delegation (J121; J122's "two people editing one map at once — not now").

**8.** V08 §2.6 `site`'s desert reading (a river when `access` is `river`, a coast with its harbour when `port`, else the
arid row's chances; the oasis exactly when `oasis_water` is listed, none without) is g item 111's V08 part; no T-V8 bar
holds it (T-V8-40 holds only the toll-bridge failure union; DR40's bar names no test).
