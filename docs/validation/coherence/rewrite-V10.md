# Rewrite — design volume V10 (the clerk)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-V10; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/rewrite-V10`, started 2026-09-30 ~21:14 in the cloud; cut at ~21:21 by a container restart with
parts 00 and 01 saved; continued under the CONTINUE rule from part 01)
- P1 inputs gathered (canon unit V10 → `work/rewrite-V10/unit.json`, `routing.md`, `handoffs*.md`, `edges-v10.md`,
  `f-items.md`, `bcr-map.json`; `src/V10-work2.md`, the volume with G-cite, G-DR, G-clerkhandle, list prefixes and
  request → item citations applied mechanically, logged in `transform-log.tsv`): done
- P2 head, §0, §1: done (part 00); §1b: done on continuation (part 01: stripped before the restart, hand edits by `spec01.py`)
- P3 §2: done (part 02, `spec02.py`)
- P4 §3: done (parts 03a–03e by `spec03a.py` – `spec03e.py`; new §3.9b, part 03b2; new §3.23, part 03f)
- P5 §4–§6: done (parts 04, 05)
- P6 §7: done (part 06; T-V10-45 – T-V10-50; 97 cases; J122's staged spend)
- P7 §8–§13, Integration notes: done (parts 07, 08; J-V10.111 – J-V10.122)
- P8 assemble, checks: done (`chk.py`; `doc_checks.py`, provisional)
- P9 report, mapping table, result file, LANDED: done

Source: `docs/volumes/V10-clerk.md` (4 047 lines, 538 604 bytes). Output: `docs/validation/coherence/new/volumes/V10-clerk.md`
(the same title line and section structure, one marker line; new §3.9b and §3.23). Working parts:
`docs/validation/coherence/work/rewrite-V10/parts/` (00, 01, 02, 03a, 03b, 03b2, 03c, 03d, 03e, 03f, 04 – 08, concatenated in
that order); scripts beside them: `transform.py` and `bcr.py` (citation forms, DR aliases, the alias, request ids), `strip.py`
(review-round ids, `strip-log.tsv`), `rep.py` with `spec01.py` – `spec07.py` (exact, count-checked replacements,
`rep-log.tsv`), `chk.py` (retired forms, ids, references), `mapping.py` (§11 and §12 below).

## 1 Sizes and the shrink goal

| measure | before | after |
|---|---|---|
| words (`str.split`, the canon's measure) | 84 658 | 75 073 (−11.3 %; the canon's band 50 795 – 63 494) |
| bytes | 538 604 (526.0 KB) | 466 617 (455.7 KB) |
| sections | §0–§13, Integration notes, eleven reconciliation, continuation and finalization records | §0–§13 with new §3.9b and §3.23; an Integration-notes map |

| section | words before | words after |
|---|---|---|
| title, banners, *How to read* | 1 551 | 349 |
| §0 | 1 113 | 1 302 |
| §1 | 2 335 | 2 512 |
| §1b | 3 858 | 4 426 |
| §2 | 11 434 | 11 830 |
| §3 (with the new §3.9b, 1 485, and §3.23, 2 419) | 22 046 | 27 209 |
| §4 | 4 129 | 4 382 |
| §5 | 971 | 1 001 |
| §6 | 1 774 | 1 871 |
| §7 (with T-V10-45 – T-V10-50, 621) | 6 408 | 7 330 |
| §8 | 1 253 | 1 382 |
| §9 (with J-V10.111 – J-V10.122, 793) | 8 079 | 8 686 |
| §10 | 6 337 | 1 635 |
| §11 | 675 | 406 |
| §12 | 3 689 | 506 |
| §13 | 1 034 | 76 |
| Integration notes | 246 | 166 |
| reconciliation rounds, continuations, finalization | 7 726 | 0 |

**The four sources of the removed words** (≈ 18 500 removed, ≈ 8 800 added):
* **Narration** ≈ 13 400 — the eleven reconciliation, continuation and finalization records (7 726), §12's per-round
  paragraphs with their md5s, landing times and counts (≈ 3 230), §13's per-round dispositions (≈ 960), the eight stacked
  banners, the revision notes and the PROGRESS ledgers (≈ 1 200), the review-round and critique ids woven into normative
  text (`strip-log.tsv`, ≈ 200 lines), the decisions' history (J-V10.28's count history, J-V10.34's and J-V10.57's former
  texts, "found beside", "revised by reconciliation round 3", "*Finalization.*").
* **Restatement** ≈ 4 600 — §10.1's 23 request blocks as a pointer table to their applied file f items (≈ 3 900); the CVR
  statuses' reading notes (≈ 600); §2.1's package chain and entry points (§14's); §2.13's three knowledge rules (§11.2's,
  item 468); §3.9's solver inputs and terms (§4.7 S10b's, item 311) and the field's drivers (§4.5's, item 297); the
  lexicon's population numbers (V07 §2.1's rung table, V09 §4.5's quantiles); the siting-weights ladder gloss (V09
  §2.6); T12's New decoration pair (V09 §4.5); `MsgButton`'s field list (V09 §2.9); the catacomb's 0.9 cap (V04's
  `rankCap`).
* **Duplicated mechanisms** ≈ 200 — E-33 (the alias), E-32 (one offline sentence), E-24 (J-V10.34 and J-V10.57 reduced
  to their marks), E-04 and E-07 (the binding and the outcome table cited at §7.1), J-V10.112 (two `clerk.alt` keys
  retired for V09's shared `button.openCopy` and `button.undo`).
* **Verbose prose** ≈ 300 — §3.9's explanation steps merged, reflowed paragraphs, shorter CVR rows.

**What holds the volume below the band** (principle (9): not a defect). The additions are mandated new design: items 111
and 113–118's parts at build depth (§3.9b, 1 485 words, with their rows in §1b, §2.10, §2.12, §2.13, §3.3, §3.4, §3.5, §3.9,
§3.9a, §3.13, §3.16, §4.1, §5.4, §6.1, §7 and §8, ≈ 2 000 more); the edge catalogue's 73 entries (§3.23, 2 419); T-V10-45 –
T-V10-50 (621) and the eight evaluation cases; J-V10.111 – J-V10.122 (793); the closure tables of §10.2 (the received
hand-offs). Without them the volume would stand ≈ 22 % below its source. The irreducible remainder is data at build
depth that no reference can replace: the type declarations of §2 (≈ 11 800 words — the reader's and the oracle's types
live here, §11.2 citing them), the wiring and lifecycle tables (≈ 5 500), the prompt's nineteen rules and the lexicon
(≈ 3 000), the encoders' table (≈ 3 900), the refusal rows with their alternatives (≈ 2 400), the tests' bars (≈ 5 300)
and the decisions (≈ 8 700, each a vetoable record the owner reads). No unit shrank by more than half except those whose
content moved to a pointer or a record (§10, §12, §13, the banners, the rounds), each mapped in §11 below.

## 2 File f and g items (cited as base text, never restated)

* **File f items this volume cites as base text** (the canon's 39): 238, 246, 260, 270, 271, 290, 297, 311, 339, 348, 362,
  365, 366, 367, 368, 460, 461, 463, 464, 465, 466, 468, 469, 470, 471, 473, 481, 487, 516, 518, 519, 531, 538, 568, 570,
  571, 572, 582, 583 — with 244 and 372 cited where read. This volume's own requests BCR-V10-1 – BCR-V10-23 are V10
  §10.1's pointer table (each applied as its item); the other volumes' request ids quoted in the body were rewritten as
  their applied items (`bcr.py`).
* **File g items written here at build depth** (each an addition, never a change of another decision):
  * item 111 — the water term and `climateSun` on `FieldDrivers`, the oasis row of the water-body provider (DR40), a
    district's water-pull cause, `ground`'s `lake` with `spring`, the lexicon's desert and oasis rows, the brief's arid
    mark and `spring` lakes, creation mode's oasis (V10 §3.9b (1); V10 §2.12, V10 §2.13, V10 §3.3, V10 §3.7, V10 §3.9,
    V10 §4.1; T-V10-45; J-V10.113);
  * item 113 — the `history` section over §2.7's `HistoryRecord` and the chronicle's replay entries, the symbolic peak told
    without a number and checked by the grounding check, the brief's history line, `intend`'s `history`, the lost void and
    the buried former settlement in V10 §3.9a (V10 §3.9b (2); T-V10-46; J-V10.114);
  * item 114 — each run's story (the default enceinte row from §7.7's condition row, V06's provider over epochs), the brief's
    runs by state, `wall`'s `repair` and `wear` as V09's mappers write them (V10 §3.9b (3); T-V10-47; J-V10.115);
  * item 115 — a design above the ceiling honoured and explained, V09's one check's line on the clerk's card, prompt rule 16
    extended (V10 §3.9b (4); T-V10-48; J-V10.116);
  * items 117 and 118 — the `look` read of view state (`LookAnswer`), prompt rule 19, words only and no declaration
    (V10 §3.9b (5); T-V10-49; J-V10.117).
  Items 110 (integrated), 112, 116 and 119 name no part for V10; the clerk's budgets are interaction budgets, which item
  119 leaves unchanged.

## 3 Conflicts resolved (18)

| conflict | ruling as applied | where |
|---|---|---|
| DIC-06 | tools with their word at first use; a bar group with its number | throughout (ID-TOOL) |
| DIC-07 | toolkit layers written with their word; a bare L0–L4 a refinement level | head; V10 §3.3 rule 4 |
| DXC-04 | the event → tool binding's one home §7.1; the encoders cite it | V10 §1.2, V10 §4.1, T-V10-1 (E-04) |
| MC-11 | the base declares every type a base record uses; the clerk's conversation segment renamed `ClerkSegment` so it no longer shares a name with §2.1's geometric `Segment` | V10 §2.3, V10 §1b.1, V10 §2.14, V10 §3.2 |
| SCOPE-C07 | SettlementForge's assistant drives the tool API through the host seam (C); the built-in clerk at M3c where a configuration enables it; provider, tier and key path the AI setup's | V10 §0, V10 §1.1 (8), V10 §3.17, V10 §8 |
| SCOPE-C16 | §14 places `@plat/clerk` and `@plat/cli` (items 518, W-PKG-01); V10 §2.1 cites it | V10 §2.1, V10 §1.2 |
| V09-XAGREE-1 | V11 §4.2's key forms and cells; the encoders write only declared cells (`pin` on a `use:` row) | V10 §4.1, V10 §2.12 |
| V09-XAGREE-3 | V02 §1b's bend ids the one set; `bend.tiers.internal`'s **Stairs along the front** | V10 §3.16, V10 §3.9's owed table |
| V10-XAGREE-1 | `avoid` a declared cell; the condition dropped | V10 §2.12, V10 §3.14, V10 §4.1 |
| V10-XAGREE-2 | V01 names V11's families; the translation note dropped; CVR-V10-6 met | V10 §2.13, V10 §10.2 |
| V10-XAGREE-3 | the size words by V09 §4.5's quantiles and the rungs' default targets | V10 §3.3; J-V10.118; T-V10-31 |
| V10-XAGREE-4 | V03 §3.7.4's wet-ground rule: raised-choir for an `always` class, else ledger slabs | V10 §3.9a |
| V10-J121-1 | §0, §1.3, `ops.model.id`, the key row read the deployment's AI setup | V10 §0, V10 §1.3, V10 §2.10, V10 §3.16, V10 §3.19 |
| V10-J121-2 | SettlementForge's configuration C named; the notice provider-neutral; the relay J121's | V10 §3.17, V10 §3.20, V10 §8, J-V10.4, J-V10.24 |
| V10-J121-3 | §11 a table of answers; §7.3 carries J122's staged spend | V10 §11, V10 §7.3; J-V10.119 |
| CANON-C02 | the standalone neighbourhood document's clock bends (`bend.hood.noClock`) | V10 §3.16 |
| CANON-C03 | §11 a table of decisions | V10 §11 |
| CANON-C04 | SR6-05 fixed; no fix-list item left | V10 §3.5, V10 §2.6, V10 §1b.1, V10 §5.4, V10 §3.10 (K4), J-V10.107, J-V10.112, T-V10-4 |

## 4 Elegance rulings applied, with their equivalence lists

* **E-04 (the event → tool binding)** — V10 cites §7.1's one table (V10 §1.2's §7.1 row; V10 §4.1's opening; T-V10-1's
  ways rows). ✓ every edit kind has its row (§7.1's); ✓ history kinds marked with their producers (§7.1's); ✓ V09's per-target
  homes (§7.1's); ✓ T-V9-12 completeness (V09's). V10's encoders emit only kinds their tool's row lists (unchanged).
* **E-07 (the dry-run outcome table)** — V10 §3.16's first sentence cites §7.1's table and §5.2's F-EDIT row. ✓ each case's
  alternative its own row (V09 §4.9, read by V10 §3.5 step 3); ✓ the dossier-owned and lock refusals the only refusals
  (V10 §3.16's `dossier`, `lock`; `rule` for the remaining F-EDITs the dry run does not bend, §7.1's own); ✓ item 582's
  three bends (V10 §3.16); ✓ `bend.*`/`refuse.*` one to one (V09 §4.9).
* **E-17 (one admission)** — V10 §3.12 (4) names §9.2's admission, the one function; §2.13 cites §11.2's rules. ✓ the band
  each reader admits (the city band for every clerk read, V10 §3.12 (1)); ✓ `admitAs` and the filtered dry runs cite it.
* **E-24 (superseded and amended marks)** — J-V10.34 and J-V10.57 reduced to "*Superseded by J-V10.80*" / "*…J-V10.88*",
  which keep the reasons; J-V10.28, J-V10.101, J-V10.102 and J-V10.106 carry "*Amended by …*". ✓ no row dropped; ✓ the
  governing row keeps the reason.
* **E-28 (PlanReport notes)** — V10 §3.9's owed V03 row names `PlanReport.notes`' `shrineOneRoom`, `solidMonument`,
  `stackCarried`. ✓ same producer and readers; ✓ the three conditions reported as notes.
* **E-32 (one offline sentence)** — V10 §3.16's `offline` row is the one sentence (V09 §3.14). ✓ same condition, same
  user outcome.
* **E-33 (the alias)** — `ClerkHandle` everywhere; the alias line removed (V10 §2.6, V10 §1b.2, J-V10.88). ✓
  `createClerk(mount)` returns `ClerkHandle`.

No unification the canon did not rule was made. J-V10.112 retires two keys by the seam ruling J-SS6.7 that SR6-05 (d)
records (one wording, one key) — its equivalence: the same words, the same buttons, `.rerun` and `.rebuild` kept.

## 5 Id rulings, renumberings and renames

* **ID-TOOL, ID-LAYER** — kept as ruled (the head states both conventions; no bare bar group in the text).
* **ID-WX** — volume-local rows cited with their volume (V02's X22, V06's X7, V09's XV-V9-n in §10.2's closure table).
* **ID-DUPDEF** — every J-V10, T-V10 and CVR-V10 id defined once (`chk.py`: J-V10.1 – J-V10.122, T-V10-1 – T-V10-50,
  CVR-V10-1 – CVR-V10-20; no gap, no duplicate, none cited undefined).
* **ID-BCR / G-DR** — V10's BCR ids live only in §10.1's pointer table; DR26–DR40 by number (no alias).
* **G-cite** — every volume citation `Vnn §x`, every section of a list carrying its prefix (`transform.py`, then two
  hand-fixed continuations; `chk.py` finds none left but two base hooks written bare on purpose).
* **Renames** — `Segment` (the clerk's conversation segment) → `ClerkSegment` (MC-11: the base's `Segment` is §2.1's
  geometric piece); `ClerkHarness` → `ClerkHandle` (E-33); `deckRefusal` → V03's `deckNoCellar`; `bend.stack.internalSolid`
  → V02's `bend.tiers.internal`; `clerk.alt.history.fork` and `.undo` → V09's `button.openCopy` and `button.undo`.
* **New ids** — J-V10.111 – J-V10.122; T-V10-45 – T-V10-50; §3.9b; §3.23 (rows 1–30, C1–C8).

## 6 Wiring gaps, hand-offs and open findings closed

**Wiring gaps (10):** W-IF-01 (V04's providers, V04 §4.5 — the owed table cites them); W-IF-02 (V07 §4.5's provider,
T-V7-61); W-IF-03 (V01 §4.5's `district.terrace`, `RetainingWall`, `district.raised` in the owed table; one provider per
kind, J-V10.120); W-IF-05 (`RuleAnswer.register` from V12 §2.6's `register.json`; §1b.1); W-PKG-01 (§14 places
`@plat/cli`; V10 §2.1, V10 §1.1 (9)); W-EDIT-01 (closed by E-04); W-FLD-12 (`ClerkSegment.promptTokens` read by the
length rule, V10 §3.2); V05-WGAP-2b and V06-WGAP-1b (V10 §3.16's bend list); V10-WGAP-1 (`encoders.islet.sizeM2`,
`scopeRingSides`, the green's `ringSides`).

**Hand-offs to close (21):** V06's X7, X17, X30, X48; V08's X11; V09's XV-V9-6 – XV-V9-8, XV-V9-10 – XV-V9-12, XV-V9-18,
XV-V9-19, XV-V9-22, XV-V9-30 (and the new XV-V9-32, XV-V9-33); V11's X-V11-3, X-V11-14 (d); V12's X-V12-7, X-V12-8,
X-V12-16, X-V12-18 — each closed at its V10 home (V10 §10.2's *Received and closed here*); CVR-V10-1 – CVR-V10-20 each
closed at its destination (V10 §10.2).

**Agreement disagreements (8):** WhyPull with V01 (V10-XAGREE-2), SettlementForge with V08, V09 and scope (SCOPE-C07), EditEvent
and BCR-V10-20 with V09 and determinism (DXC-04), T-V9-15 with V09 (V09-XAGREE-3) — each applied as §3 states.

**Open findings (39):** VOL-V09-V10-RESTATEMENTS-018 (V10 §2.12), -019 (V10 §4.1 T12), -020 (V10 §3.3), -021 (V10 §3.9a);
V10-RESTATE-1, -2 (the same); V10-XAGREE-1 – -4, V10-J121-1 – -3 (§3); V10-ELEG-1, -2 (E-32, E-33); V10-EDGE-1 (V10 §4.2 (3),
§3.23 row 30); V10-WGAP-1; V10-MISSING-1, -2 (items 111 and 113, V10 §3.9b); V10-TERM-1 (G-cite); V10-DEFER-1 (CVR-V10-12
and -13 met, the conditional gone), V10-DEFER-2 (SR6-05 fixed); V10-NARR-1 – -5 (banners, ids, decision history, §12,
§13 and the records removed); V10-BREF-1 (`clerk.ops` or `clerk.content`), V10-BREF-2 (list prefixes); V10-HANDOFF-1
(the ravine quarter by V01 §3.17.1 (2)), -2 (CVR-V10-6, -13, -14 met), -3 (the CVR statuses in §10.2); SR6-05 (surfaces)
(its (a) – (g) in V10 §3.5, V10 §1b.1, V10 §2.6, V10 §5.4, V10 §3.13 step 4, V10 §4.4, V10 §3.10's K4, J-V10.107, T-V10-4);
IN-V10-1 – IN-V10-5 and IN-V02-3 (folded, the Integration-notes map). None is carried; none is marked for the
adjudicator.

## 7 Edges (principle (11))

The canon's 73 entries for V10 — 64 mechanism edges (50 UNDEFINED, 14 UNTESTED), EI-V10-EDGE-1 and 8 combinations — each
have an outcome, a failure rung and a test in V10 §3.23 (three general rules — E4, E6, E8 — and rows 1–30, C1–C8), the
suite T-V10-50; §12 below maps each entry to its row.

## 8 Judgment calls (vetoable)

* J-V10.118 — "vast metropolis", with no V09 chip, at the METROPOLIS band's 85th percentile ("large" in the lower rungs)
  rather than its former 100 000.
* J-V10.119 — J122's "smallest evaluation tier first" read as a subset tier (one run of each group's first two cases),
  then every case once at C5, the full suite at M3c's exit.
* J-V10.120 — one provider per kind at a time; a volume's registration takes the kind from its milestone.
* J-V10.115 — a patch asked for a run that is not breached is written robust with V09's `info.wall.patchOnlyGap`.
* J-V10.122 — a specialisation class encoded as its first carrier with `setAttr specialisation` (V11 §3.24.3).
* The `ClerkSegment` rename (MC-11's homonym), a form-only change.
* The brief's arid mark and wall runs render only where they say something, so an ordinary map's block stays byte-identical.
* §8's price: items 111 and 113–118's parts +1–1.5 pw (C1 +0.25–0.5, C3 +0.25, C4 +0.25, C5 +0.25–0.5) — expert estimates.

## 9 CROSS-PART NOTES

* **scope (§16, INDEX §3/§4)** — V10's prices change: C1 3.25–5 pw (M3a's delta, item 531, +3.5–5.25 with the second
  transcript), M3c 11–14.75 pw, the volume 14.5–20 pw (15–20.5 with `plat clerk`); §16 recomputes its totals once (item 568).
* **scope (§14)** — `@plat/cli` is placed (W-PKG-01) as V10 §2.1 cites it; no further change.
* **model (§2.9)** — V10 reads item 117's year position (week 0–51) and follow flag and item 118's festival display as view
  keys (V10 §2.13's `LookAnswer`), which the base's §2.9 lists only as "season" today: the model unit's repair round writes
  them (routed there by the dated rulings).
* **determinism (§7.7)** — V10 cites the condition row (item 114 (d)), the calendar row (item 117) and the traditions row
  (item 118) by name; their DR numbers (after DR40) come with the repair round.
* **V09** — (a) the why card's daylight bar may say, like V10 §3.9b (1), that a hot arid row prizes shade (`climateSun` ≤ 0);
  (b) V09 §4.9's `refuse.clerk.key.<keyState>` rows read V10 §3.16's provider-neutral key sentences ("The AI service has no
  credit left on this key"); (c) T-V9-40's clause on the replaced empty-state town matches V10 §4.2 (3) and §3.23 row 30.
* **V04 / V09** — the lost void's words: V04 §4.5 names `info.under.excavation.lost`, V09 §4.9 `info.under.lost`; V10 §3.9a
  cites V09's row — the two should name one key.
* **V11** — (a) the lexicon's desert, oasis, history and patch rows read V11's `arid` biome, `walls.patchMaterials`' `label`
  cells (XV-V9-35's) and the rung table; (b) CVR-V10-12 is met by V11 §3.24.3 as the source states it; V11's rewrite keeps
  the carriers' order V10 §4.1 reads.
* **V12** — (a) `RuleAnswer.register` reads `CalibrationEntry`'s `id`, `status`, `method` and `due`; (b) this volume's new
  default cells (`encoders.islet.sizeM2`, the evaluation tiers' sizes) are calibrate-later by V10 §7.3, outside V12's corpus
  (V11 §3.1 rows 88–89).
* **V06** — V10 §3.9b (2) reads the chronicle's `replay`, `destroyed`, `refounded` and `buried` entries (V06 §3.20.6).

## 10 Checks run (provisional where noted)

* `chk.py` over the output: retired forms and narration — none left but the file extension `.plat-clerk.json` and the
  backend's type name `AnthropicBackend` (the built-in backend over the provider's SDK, item 538); ids — J-V10 122, T-V10 50,
  CVR-V10 20, each defined once, none cited undefined; volume references — 0 unresolved (V01–V09 at their rewritten texts,
  V11 and V12 at their source texts); base references — 0 unresolved but two line-wrapped `V10 §…` citations.
* `docs/validation/bench/doc_checks.py --doc <output> --heads docs/ARCHITECTURE.md` — **WARNING: reference corpus INCOMPLETE
  (captures, research/patreon, research/devlogs, research/ftg-docs, research/external absent) — clean-room results NOT
  authoritative**: C1 0, C2 0, C3 145 (140 unreviewed; the source 239), C4 0, S1 0, S2 322 (the source 466; V10's own
  `V10 §x` and sibling pointers are not headings of the base document).
* Every replacement was exact and count-checked (`rep.py`; `rep-log.tsv`).

## 11 MAPPING TABLE — every inventory id of the volume → where it now lives

| id | kind | was | now lives |
|---|---|---|---|
| V10-0001 | convention | header | the head's *How to read* (one marker line) |
| V10-0002 | summary | 0 | V10 §0 |
| V10-0003 | summary | 0 | V10 §0 |
| V10-0004 | summary | 0 | V10 §0 |
| V10-0005 | summary | 0 | V10 §0 |
| V10-0006 | summary | 0 | V10 §0 *Turning it on* (SettlementForge's own assistant; provider, model and key follow the AI setup — J121, J122; V10-J121-1) |
| V10-0007 | scope | 1.1 | V10 §1.1 |
| V10-0008 | scope | 1.1 | V10 §1.1 |
| V10-0009 | scope | 1.1 | V10 §1.1 |
| V10-0010 | hooks | 1.2 | V10 §1.2 |
| V10-0011 | hooks | 1.2 | V10 §1.2 |
| V10-0012 | hooks | 1.2 | V10 §1.2 |
| V10-0013 | hooks | 1.2 | V10 §1.2 |
| V10-0014 | hooks | 1.2 | V10 §1.2 |
| V10-0015 | hooks | 1.2 | V10 §1.2 |
| V10-0016 | hooks | 1.2 | V10 §1.2 |
| V10-0017 | hooks | 1.2 | V10 §1.2 |
| V10-0018 | hooks | 1.2 | V10 §1.2 |
| V10-0019 | hooks | 1.2 | V10 §1.2 |
| V10-0020 | hooks | 1.2 | V10 §1.2 |
| V10-0021 | hooks | 1.2 | V10 §1.2 |
| V10-0022 | hooks | 1.2 | V10 §1.2 |
| V10-0023 | hooks | 1.2 | V10 §1.2 |
| V10-0024 | hooks | 1.2 | V10 §1.2 |
| V10-0025 | hooks | 1.2 | V10 §1.2 |
| V10-0026 | hooks | 1.2 | V10 §1.2 |
| V10-0027 | hooks | 1.2 | V10 §1.2 |
| V10-0028 | hooks | 1.2 | V10 §1.2 |
| V10-0029 | hooks | 1.2 | V10 §1.2 |
| V10-0030 | hooks | 1.2 | V10 §1.2 |
| V10-0031 | hooks | 1.2 | V10 §1.2 |
| V10-0032 | hooks | 1.2 | V10 §1.2 |
| V10-0033 | hooks | 1.2 | V10 §1.2 |
| V10-0034 | hooks | 1.2 | V10 §1.2 |
| V10-0035 | hooks | 1.2 | V10 §1.2 |
| V10-0036 | hooks | 1.2 | V10 §1.2 |
| V10-0037 | hooks | 1.2 | V10 §1.2 |
| V10-0038 | hooks | 1.2 | V10 §1.2 |
| V10-0039 | hooks | 1.2 | V10 §1.2 |
| V10-0040 | hooks | 1.2 | V10 §1.2 |
| V10-0041 | hooks | 1.2 | V10 §1.2 |
| V10-0042 | hooks | 1.2 | V10 §1.2 |
| V10-0043 | hooks | 1.2 | V10 §1.2 |
| V10-0044 | hooks | 1.2 | V10 §1.2 |
| V10-0045 | hooks | 1.2 | V10 §1.2 |
| V10-0046 | hooks | 1.2 | V10 §1.2 |
| V10-0047 | hooks | 1.2 | V10 §1.2 |
| V10-0048 | hooks | 1.2 | V10 §1.2 |
| V10-0049 | hooks | 1.2 | V10 §1.2 |
| V10-0050 | scope | 1.3 | V10 §1.3 |
| V10-0051 | rule | 1b | V10 §1b |
| V10-0052 | wiring | 1b.1 | V10 §1b.1 |
| V10-0053 | wiring | 1b.1 | V10 §1b.1 |
| V10-0054 | wiring | 1b.1 | V10 §1b.1 |
| V10-0055 | wiring | 1b.1 | V10 §1b.1 |
| V10-0056 | wiring | 1b.1 | V10 §1b.1 |
| V10-0057 | wiring | 1b.1 | V10 §1b.1 |
| V10-0058 | wiring | 1b.1 | V10 §1b.1 |
| V10-0059 | wiring | 1b.1 | V10 §1b.1 |
| V10-0060 | wiring | 1b.1 | V10 §1b.1 |
| V10-0061 | wiring | 1b.1 | V10 §1b.1 |
| V10-0062 | wiring | 1b.1 | V10 §1b.1 |
| V10-0063 | wiring | 1b.1 | V10 §1b.1 |
| V10-0064 | wiring | 1b.1 | V10 §1b.1 |
| V10-0065 | wiring | 1b.1 | V10 §1b.1 |
| V10-0066 | wiring | 1b.1 | V10 §1b.1 |
| V10-0067 | wiring | 1b.1 | V10 §1b.1 |
| V10-0068 | wiring | 1b.1 | V10 §1b.1 |
| V10-0069 | wiring | 1b.1 | V10 §1b.1 |
| V10-0070 | wiring | 1b.1 | V10 §1b.1 |
| V10-0071 | wiring | 1b.1 | V10 §1b.1 |
| V10-0072 | wiring | 1b.1 | V10 §1b.1 |
| V10-0073 | wiring | 1b.1 | V10 §1b.1 |
| V10-0074 | wiring | 1b.1 | V10 §1b.1 |
| V10-0075 | wiring | 1b.1 | V10 §1b.1 |
| V10-0076 | wiring | 1b.1 | V10 §1b.1 |
| V10-0077 | wiring | 1b.1 | V10 §1b.1 |
| V10-0078 | wiring | 1b.1 | V10 §1b.1 |
| V10-0079 | wiring | 1b.1 | V10 §1b.1 |
| V10-0080 | wiring | 1b.1 | V10 §1b.1 |
| V10-0081 | wiring | 1b.1 | V10 §1b.1 |
| V10-0082 | wiring | 1b.1 | V10 §1b.1 |
| V10-0083 | wiring | 1b.1 | V10 §1b.1 |
| V10-0084 | wiring | 1b.1 | V10 §1b.1 |
| V10-0085 | wiring | 1b.1 | V10 §1b.1 |
| V10-0086 | wiring | 1b.1 | V10 §1b.1 |
| V10-0087 | wiring | 1b.1 | V10 §1b.1 |
| V10-0088 | wiring | 1b.1 | V10 §1b.1 |
| V10-0089 | wiring | 1b.1 | V10 §1b.1 |
| V10-0090 | wiring | 1b.1 | V10 §1b.1 |
| V10-0091 | wiring | 1b.1 | V10 §1b.1 |
| V10-0092 | wiring | 1b.1 | V10 §1b.1 |
| V10-0093 | wiring | 1b.1 | V10 §1b.1 |
| V10-0094 | wiring | 1b.1 | V10 §1b.1 |
| V10-0095 | wiring | 1b.1 | V10 §1b.1 |
| V10-0096 | wiring | 1b.1 | V10 §1b.1 |
| V10-0097 | wiring | 1b.1 | V10 §1b.1 |
| V10-0098 | wiring | 1b.1 | V10 §1b.1 |
| V10-0099 | wiring | 1b.1 | V10 §1b.1 |
| V10-0100 | interface | 1b.2 | V10 §1b.2 (`ClerkHandle`, no alias; E-33) |
| V10-0101 | interface | 1b.2 | V10 §1b.2 |
| V10-0102 | interface | 1b.2 | V10 §1b.2 |
| V10-0103 | interface | 1b.2 | V10 §1b.2 |
| V10-0104 | interface | 1b.2 | V10 §1b.2 |
| V10-0105 | interface | 1b.2 | V10 §1b.2 |
| V10-0106 | interface | 1b.2 | V10 §1b.2 |
| V10-0107 | interface | 1b.2 | V10 §1b.2 |
| V10-0108 | interface | 1b.2 | V10 §1b.2 |
| V10-0109 | interface | 1b.2 | V10 §1b.2 |
| V10-0110 | interface | 1b.2 | V10 §1b.2 |
| V10-0111 | interface | 1b.2 | V10 §1b.2 |
| V10-0112 | interface | 1b.2 | V10 §1b.2 |
| V10-0113 | interface | 1b.2 | V10 §1b.2 |
| V10-0114 | interface | 1b.2 | V10 §1b.2 |
| V10-0115 | interface | 1b.2 | V10 §1b.2 |
| V10-0116 | interface | 1b.2 | V10 §1b.2 |
| V10-0117 | interface | 1b.2 | V10 §1b.2 |
| V10-0118 | interface | 1b.2 | V10 §1b.2 |
| V10-0119 | interface | 1b.2 | V10 §1b.2 |
| V10-0120 | interface | 1b.2 | V10 §1b.2 |
| V10-0121 | rule | 1b.3 | V10 §1b.3 (citing §7.1's rows and binding table) |
| V10-0122 | dossier-fact | 1b.5 | V10 §1b.5 |
| V10-0123 | dossier-fact | 1b.5 | V10 §1b.5 |
| V10-0124 | dossier-fact | 1b.5 | V10 §1b.5 |
| V10-0125 | dossier-fact | 1b.5 | V10 §1b.5 |
| V10-0126 | dossier-fact | 1b.5 | V10 §1b.5 |
| V10-0127 | dossier-fact | 1b.5 | V10 §1b.5 |
| V10-0128 | dossier-fact | 1b.5 | V10 §1b.5 |
| V10-0129 | dossier-fact | 1b.5 | V10 §1b.5 |
| V10-0130 | dossier-fact | 1b.5 | V10 §1b.5 |
| V10-0131 | dossier-fact | 1b.5 | V10 §1b.5 |
| V10-0132 | dossier-fact | 1b.5 | V10 §1b.5 |
| V10-0133 | dossier-fact | 1b.5 | V10 §1b.5 |
| V10-0134 | dossier-fact | 1b.5 | V10 §1b.5 |
| V10-0135 | dossier-fact | 1b.5 | V10 §1b.5 |
| V10-0136 | dossier-fact | 1b.5 | V10 §1b.5 |
| V10-0137 | dossier-fact | 1b.5 | V10 §1b.5 |
| V10-0138 | dossier-fact | 1b.5 | V10 §1b.5 |
| V10-0139 | rule | 2 | V10 §2 |
| V10-0140 | rule | 2.1 | V10 §2.1 (a reference to §14, item 518; the clerk's own details kept) |
| V10-0141 | type | 2.2 | V10 §2.2 (unchanged; `anthropic` names the built-in backend over the provider's SDK, item 538) |
| V10-0142 | rule | 2.2 | V10 §2.2 |
| V10-0143 | type | 2.3 | V10 §2.3 |
| V10-0144 | rule | 2.3 | V10 §2.3 (the clerk's use of V09 §2.10's effective key; the key itself V09's) |
| V10-0145 | rule | 2.3 | V10 §2.3 |
| V10-0146 | type | 2.4 | V10 §2.4 |
| V10-0147 | type | 2.5 | V10 §2.5 |
| V10-0148 | type | 2.6 | V10 §2.6 |
| V10-0149 | type | 2.6 | V10 §2.6 |
| V10-0150 | type | 2.6 | V10 §2.6 (the label comment cites V10 §1b.1's label row; SR6-05 (c)) |
| V10-0151 | rule | 2.6 | V10 §2.6 |
| V10-0152 | dispatch | 2.6 | V10 §2.6 dispatch table (`ClerkHandle.run`; E-33) |
| V10-0153 | dispatch | 2.6 | V10 §2.6 |
| V10-0154 | dispatch | 2.6 | V10 §2.6 |
| V10-0155 | dispatch | 2.6 | V10 §2.6 |
| V10-0156 | dispatch | 2.6 | V10 §2.6 |
| V10-0157 | dispatch | 2.6 | V10 §2.6 |
| V10-0158 | dispatch | 2.6 | V10 §2.6 |
| V10-0159 | dispatch | 2.6 | V10 §2.6 |
| V10-0160 | dispatch | 2.6 | V10 §2.6 |
| V10-0161 | dispatch | 2.6 | V10 §2.6 |
| V10-0162 | rule | 2.6 | V10 §2.6 |
| V10-0163 | rule | 2.6 | V10 §2.6 *The bridge, through the mount only* (V09 §2.10's `ClerkMount.host`; J-V9.81) |
| V10-0164 | type | 2.7 | V10 §2.7 |
| V10-0165 | type | 2.8 | V10 §2.8 |
| V10-0166 | type | 2.9 | V10 §2.9 |
| V10-0167 | rule | 2.10 | V10 §2.10 |
| V10-0168 | type | 2.10 | V10 §2.10 |
| V10-0169 | rule | 2.10 | V10 §2.10 default rows (provenance cites V11 §3.1 rows 88–89) |
| V10-0170 | default-row | 2.10 | V10 §2.10 |
| V10-0171 | default-row | 2.10 | V10 §2.10 |
| V10-0172 | default-row | 2.10 | V10 §2.10 |
| V10-0173 | default-row | 2.10 | V10 §2.10 |
| V10-0174 | default-row | 2.10 | V10 §2.10 |
| V10-0175 | default-row | 2.10 | V10 §2.10 |
| V10-0176 | default-row | 2.10 | V10 §2.10 |
| V10-0177 | default-row | 2.10 | V10 §2.10 |
| V10-0178 | default-row | 2.10 | V10 §2.10 |
| V10-0179 | default-row | 2.10 | V10 §2.10 |
| V10-0180 | default-row | 2.10 | V10 §2.10 |
| V10-0181 | default-row | 2.10 | V10 §2.10 |
| V10-0182 | default-row | 2.10 | V10 §2.10 |
| V10-0183 | default-row | 2.10 | V10 §2.10 |
| V10-0184 | default-row | 2.10 | V10 §2.10 |
| V10-0185 | default-row | 2.10 | V10 §2.10 |
| V10-0186 | default-row | 2.10 | V10 §2.10 `content.encoders` (islet size and scope ring added; V10-WGAP-1) |
| V10-0187 | default-row | 2.10 | V10 §2.10 |
| V10-0188 | default-row | 2.10 | V10 §2.10 |
| V10-0189 | default-row | 2.10 | V10 §2.10 |
| V10-0190 | default-row | 2.10 | V10 §2.10 |
| V10-0191 | default-row | 2.10 | V10 §2.10 |
| V10-0192 | default-row | 2.10 | V10 §2.10 |
| V10-0193 | default-row | 2.10 | V10 §2.10 |
| V10-0194 | interface | 2.11 | V10 §2.11 (unchanged; see V10-0141) |
| V10-0195 | type | 2.12 | V10 §2.12 |
| V10-0196 | type | 2.12 | V10 §2.12 `IntendInput` (`history` added, item 113) |
| V10-0197 | type | 2.12 | V10 §2.12 |
| V10-0198 | type | 2.12 | V10 §2.12 `ShapeInput` (link cells V11 §4.2's, V10-XAGREE-1; the weights gloss cited to V09 §2.6) |
| V10-0199 | type | 2.12 | V10 §2.12 |
| V10-0200 | rule | 2.13 | V10 §2.13 (home confirmed: §11.2 cites V10 §2.13's types) |
| V10-0201 | type | 2.13 | V10 §2.13 (home confirmed: §11.2 cites V10 §2.13's types) |
| V10-0202 | type | 2.13 | V10 §2.13 (home confirmed: §11.2 cites V10 §2.13's types) |
| V10-0203 | type | 2.13 | V10 §2.13 (home confirmed: §11.2 cites V10 §2.13's types) |
| V10-0204 | type | 2.13 | V10 §2.13 (home confirmed: §11.2 cites V10 §2.13's types) |
| V10-0205 | type | 2.13 | V10 §2.13 (home confirmed: §11.2 cites V10 §2.13's types) |
| V10-0206 | family-map | 2.13 | V10 §2.13 |
| V10-0207 | family-map | 2.13 | V10 §2.13 |
| V10-0208 | family-map | 2.13 | V10 §2.13 |
| V10-0209 | family-map | 2.13 | V10 §2.13 |
| V10-0210 | family-map | 2.13 | V10 §2.13 |
| V10-0211 | family-map | 2.13 | V10 §2.13 |
| V10-0212 | family-map | 2.13 | V10 §2.13 |
| V10-0213 | family-map | 2.13 | V10 §2.13 |
| V10-0214 | rule | 2.13 | removed: V01 §4.5 names V11's families (V10-XAGREE-2); CVR-V10-6 met |
| V10-0215 | lifecycle | 2.14 | V10 §2.14 |
| V10-0216 | lifecycle | 2.14 | V10 §2.14 |
| V10-0217 | lifecycle | 2.14 | V10 §2.14 |
| V10-0218 | lifecycle | 2.14 | V10 §2.14 |
| V10-0219 | lifecycle | 2.14 | V10 §2.14 |
| V10-0220 | lifecycle | 2.14 | V10 §2.14 |
| V10-0221 | lifecycle | 2.14 | V10 §2.14 |
| V10-0222 | lifecycle | 2.14 | V10 §2.14 |
| V10-0223 | lifecycle | 2.14 | V10 §2.14 |
| V10-0224 | lifecycle | 2.14 | V10 §2.14 |
| V10-0225 | lifecycle | 2.14 | V10 §2.14 |
| V10-0226 | lifecycle | 2.14 | V10 §2.14 |
| V10-0227 | lifecycle | 2.14 | V10 §2.14 |
| V10-0228 | lifecycle | 2.14 | V10 §2.14 |
| V10-0229 | lifecycle | 2.14 | V10 §2.14 |
| V10-0230 | rule | 2.15 | V10 §2.15 |
| V10-0231 | rule | 3 | V10 §3 opening (`clerk.ops` or `clerk.content`; V10-BREF-1) |
| V10-0232 | rule | 3.1 | V10 §3.1 |
| V10-0233 | entry | 3.1 | V10 §3.1 |
| V10-0234 | entry | 3.1 | V10 §3.1 |
| V10-0235 | entry | 3.1 | V10 §3.1 |
| V10-0236 | entry | 3.1 | V10 §3.1 |
| V10-0237 | entry | 3.1 | V10 §3.1 |
| V10-0238 | lexicon-row | 3.3 | V10 §3.3 lexicon (the rung's default target, §1.1's rung table; V10-RESTATE-1) |
| V10-0239 | lexicon-row | 3.3 | V10 §3.3 lexicon (the rung's default target, §1.1's rung table; V10-RESTATE-1) |
| V10-0240 | lexicon-row | 3.3 | V10 §3.3 lexicon (the rung's default target, §1.1's rung table; V10-RESTATE-1) |
| V10-0241 | lexicon-row | 3.3 | V10 §3.3 lexicon (V09 §4.5's quantile; V10-XAGREE-3, J-V10.118) |
| V10-0242 | lexicon-row | 3.3 | V10 §3.3 lexicon (V09 §4.5's quantile; V10-XAGREE-3, J-V10.118) |
| V10-0243 | lexicon-row | 3.3 | V10 §3.3 lexicon (V09 §4.5's quantile; V10-XAGREE-3, J-V10.118) |
| V10-0244 | lexicon-row | 3.3 | V10 §3.3 lexicon (V09 §4.5's quantile; V10-XAGREE-3, J-V10.118) |
| V10-0245 | lexicon-row | 3.3 | V10 §3.3 lexicon (V09 §4.5's quantile; V10-XAGREE-3, J-V10.118) |
| V10-0246 | lexicon-row | 3.3 | V10 §3.3 lexicon (V09 §4.5's quantile; V10-XAGREE-3, J-V10.118) |
| V10-0247 | lexicon-row | 3.3 | V10 §3.3 lexicon (V09 §4.5's quantile; V10-XAGREE-3, J-V10.118) |
| V10-0248 | lexicon-row | 3.3 | V10 §3.3 lexicon (V09 §4.5's quantile; V10-XAGREE-3, J-V10.118) |
| V10-0249 | lexicon-row | 3.3 | V10 §3.3 |
| V10-0250 | lexicon-row | 3.3 | V10 §3.3 |
| V10-0251 | lexicon-row | 3.3 | V10 §3.3 |
| V10-0252 | lexicon-row | 3.3 | V10 §3.3 |
| V10-0253 | lexicon-row | 3.3 | V10 §3.3 |
| V10-0254 | lexicon-row | 3.3 | V10 §3.3 |
| V10-0255 | lexicon-row | 3.3 | V10 §3.3 |
| V10-0256 | lexicon-row | 3.3 | V10 §3.3 |
| V10-0257 | lexicon-row | 3.3 | V10 §3.3 |
| V10-0258 | lexicon-row | 3.3 | V10 §3.3 |
| V10-0259 | lexicon-row | 3.3 | V10 §3.3 |
| V10-0260 | lexicon-row | 3.3 | V10 §3.3 |
| V10-0261 | lexicon-row | 3.3 | V10 §3.3 |
| V10-0262 | lexicon-row | 3.3 | V10 §3.3 |
| V10-0263 | lexicon-row | 3.3 | V10 §3.3 |
| V10-0264 | lexicon-row | 3.3 | V10 §3.3 |
| V10-0265 | lexicon-row | 3.3 | V10 §3.3 |
| V10-0266 | lexicon-row | 3.3 | V10 §3.3 |
| V10-0267 | lexicon-row | 3.3 | V10 §3.3 |
| V10-0268 | lexicon-row | 3.3 | V10 §3.3 |
| V10-0269 | lexicon-row | 3.3 | V10 §3.3 |
| V10-0270 | lexicon-row | 3.3 | V10 §3.3 |
| V10-0271 | lexicon-row | 3.3 | V10 §3.3 |
| V10-0272 | step | 3.1 | V10 §3.1 |
| V10-0273 | step | 3.1 | V10 §3.1 |
| V10-0274 | rule | 3.2 | V10 §3.2 |
| V10-0275 | rule | 3.2 | V10 §3.2 |
| V10-0276 | rule | 3.3 | V10 §3.3 |
| V10-0277 | rule | 3.3 | V10 §3.3 |
| V10-0278 | rule | 3.3 | V10 §3.3 |
| V10-0279 | rule | 3.4 | V10 §3.4 |
| V10-0280 | rule | 3.4 | V10 §3.4 |
| V10-0281 | tool-description | 3.4 | V10 §3.4 |
| V10-0282 | tool-description | 3.4 | V10 §3.4 (`ground`'s description with the spring-fed lake) |
| V10-0283 | tool-description | 3.4 | V10 §3.4 |
| V10-0284 | tool-description | 3.4 | V10 §3.4 |
| V10-0285 | tool-description | 3.4 | V10 §3.4 |
| V10-0286 | tool-description | 3.4 | V10 §3.4 |
| V10-0287 | tool-description | 3.4 | V10 §3.4 |
| V10-0288 | tool-description | 3.4 | V10 §3.4 |
| V10-0289 | tool-description | 3.4 | V10 §3.4 |
| V10-0290 | tool-description | 3.4 | V10 §3.4 |
| V10-0291 | tool-description | 3.4 | V10 §3.4 |
| V10-0292 | tool-description | 3.4 | V10 §3.4 |
| V10-0293 | tool-description | 3.4 | V10 §3.4 |
| V10-0294 | tool-description | 3.4 | V10 §3.4 |
| V10-0295 | tool-description | 3.4 | V10 §3.4 |
| V10-0296 | tool-description | 3.4 | V10 §3.4 |
| V10-0297 | step | 3.5 | V10 §3.5 |
| V10-0298 | rule | 3.5 | V10 §3.5 |
| V10-0299 | step | 3.5 | V10 §3.5 |
| V10-0300 | rule | 3.5 | V10 §3.5 step 3 (SR6-05 (a), (b), (f)) |
| V10-0301 | rule | 3.5 | V10 §3.5 |
| V10-0302 | rule | 3.5 | V10 §3.5 |
| V10-0303 | rule | 3.6 | V10 §3.6 |
| V10-0304 | step | 3.7 | V10 §3.7 |
| V10-0305 | rule | 3.7 | V10 §3.7 |
| V10-0306 | rule | 3.8 | V10 §3.8 |
| V10-0307 | rule | 3.9 | V10 §3.9 |
| V10-0308 | default-provider | 3.9 | V10 §3.9 |
| V10-0309 | default-provider | 3.9 | V10 §3.9 |
| V10-0310 | default-provider | 3.9 | V10 §3.9 |
| V10-0311 | default-provider | 3.9 | V10 §3.9 |
| V10-0312 | default-provider | 3.9 | V10 §3.9 |
| V10-0313 | default-provider | 3.9 | V10 §3.9 |
| V10-0314 | default-provider | 3.9 | V10 §3.9 |
| V10-0315 | default-provider | 3.9 | V10 §3.9 |
| V10-0316 | default-provider | 3.9 | V10 §3.9 |
| V10-0317 | default-provider | 3.9 | V10 §3.9 |
| V10-0318 | default-provider | 3.9 | V10 §3.9 |
| V10-0319 | owed-provider | 3.9 | V10 §3.9 |
| V10-0320 | owed-provider | 3.9 | V10 §3.9 |
| V10-0321 | owed-provider | 3.9 | V10 §3.9 owed table (V03's keys; `deckNoCellar`; E-28's notes) |
| V10-0322 | owed-provider | 3.9 | V10 §3.9 |
| V10-0323 | owed-provider | 3.9 | V10 §3.9 |
| V10-0324 | owed-provider | 3.9 | V10 §3.9 |
| V10-0325 | owed-provider | 3.9 | V10 §3.9 |
| V10-0326 | rule | 3.9 | V10 §3.9 |
| V10-0327 | rule | 3.9 | V10 §3.9 |
| V10-0328 | raised-outcome | 3.9 | V10 §3.9 |
| V10-0329 | raised-outcome | 3.9 | V10 §3.9 |
| V10-0330 | raised-outcome | 3.9 | V10 §3.9 |
| V10-0331 | raised-outcome | 3.9 | V10 §3.9 |
| V10-0332 | raised-outcome | 3.9 | V10 §3.9 |
| V10-0333 | raised-outcome | 3.9 | V10 §3.9 |
| V10-0334 | raised-outcome | 3.9 | V10 §3.9 |
| V10-0335 | raised-outcome | 3.9 | V10 §3.9 |
| V10-0336 | raised-outcome | 3.9 | V10 §3.9 |
| V10-0337 | raised-outcome | 3.9 | V10 §3.9 |
| V10-0338 | rule | 3.9 | V10 §3.9 |
| V10-0339 | rule | 3.9 | V10 §3.9 *The solver's explanation* (inputs and terms cited to §4.7 S10b, item 311; the placed set, shares, candidates and drift kept) |
| V10-0340 | rule | 3.9 | V10 §3.9 *The field's drivers* (a reference to §4.5, item 297; the water term and climate cell named) |
| V10-0341 | rule | 3.9a | V10 §3.9a (the words' home, loaded by V09 §4.9; the rows' data V04 §4.5) |
| V10-0342 | underground-row | 3.9a | V10 §3.9a (the words' home, loaded by V09 §4.9; the rows' data V04 §4.5) |
| V10-0343 | underground-row | 3.9a | V10 §3.9a (the words' home, loaded by V09 §4.9; the rows' data V04 §4.5) |
| V10-0344 | underground-row | 3.9a | V10 §3.9a (the words' home, loaded by V09 §4.9; the rows' data V04 §4.5) |
| V10-0345 | underground-row | 3.9a | V10 §3.9a (the words' home, loaded by V09 §4.9; the rows' data V04 §4.5) |
| V10-0346 | underground-row | 3.9a | V10 §3.9a (the words' home, loaded by V09 §4.9; the rows' data V04 §4.5) |
| V10-0347 | underground-row | 3.9a | V10 §3.9a (the words' home, loaded by V09 §4.9; the rows' data V04 §4.5) |
| V10-0348 | underground-row | 3.9a | V10 §3.9a catacomb row (`CatacombRule.rankCap` cited; V10-RESTATE-2) |
| V10-0349 | underground-row | 3.9a | V10 §3.9a (the words' home, loaded by V09 §4.9; the rows' data V04 §4.5) |
| V10-0350 | underground-row | 3.9a | V10 §3.9a (the words' home, loaded by V09 §4.9; the rows' data V04 §4.5) |
| V10-0351 | crypt-row | 3.9a | V10 §3.9a crypt table (the words' home; keyed by V03 §4.6) |
| V10-0352 | crypt-row | 3.9a | V10 §3.9a crypt table (the words' home; keyed by V03 §4.6) |
| V10-0353 | crypt-row | 3.9a | V10 §3.9a crypt table (the words' home; keyed by V03 §4.6) |
| V10-0354 | crypt-row | 3.9a | V10 §3.9a crypt table (the words' home; keyed by V03 §4.6) |
| V10-0355 | crypt-row | 3.9a | V10 §3.9a crypt table (V03 §3.7.4's wet-ground rule; V10-XAGREE-4) |
| V10-0356 | rule | 3.9a | V10 §3.9a |
| V10-0357 | rule | 3.10 | V10 §3.10 |
| V10-0358 | critique-row | 3.10 | V10 §3.10 |
| V10-0359 | critique-row | 3.10 | V10 §3.10 |
| V10-0360 | critique-row | 3.10 | V10 §3.10 |
| V10-0361 | critique-row | 3.10 | V10 §3.10 |
| V10-0362 | critique-row | 3.10 | V10 §3.10 |
| V10-0363 | critique-row | 3.10 | V10 §3.10 |
| V10-0364 | critique-row | 3.10 | V10 §3.10 |
| V10-0365 | critique-row | 3.10 | V10 §3.10 |
| V10-0366 | critique-row | 3.10 | V10 §3.10 |
| V10-0367 | critique-row | 3.10 | V10 §3.10 |
| V10-0368 | critique-row | 3.10 | V10 §3.10 |
| V10-0369 | critique-row | 3.10 | V10 §3.10 |
| V10-0370 | critique-row | 3.10 | V10 §3.10 |
| V10-0371 | critique-row | 3.10 | V10 §3.10 |
| V10-0372 | critique-row | 3.10 | V10 §3.10 |
| V10-0373 | critique-row | 3.10 | V10 §3.10 |
| V10-0374 | critique-row | 3.10 | V10 §3.10 |
| V10-0375 | critique-row | 3.10 | V10 §3.10 |
| V10-0376 | rule | 3.10 | V10 §3.10 |
| V10-0377 | step | 3.11 | V10 §3.11 |
| V10-0378 | step | 3.11 | V10 §3.11 |
| V10-0379 | rule | 3.11 | V10 §3.11 |
| V10-0380 | rule | 3.12 | V10 §3.12 |
| V10-0381 | rule | 3.12 | V10 §3.12 |
| V10-0382 | rule | 3.13 | V10 §3.13 |
| V10-0383 | step | 3.13 | V10 §3.13 |
| V10-0384 | step | 3.13 | V10 §3.13 step 4 (`button.openCopy`, `button.undo`; J-V10.112) |
| V10-0385 | step | 3.13 | V10 §3.13 |
| V10-0386 | rule | 3.14 | V10 §3.14 (`avoid` a declared cell, V10-XAGREE-1) |
| V10-0387 | rule | 3.15 | V10 §3.15 |
| V10-0388 | rule | 3.15 | V10 §3.15 (the ravine quarter by V01 §3.17.1 (2); CVR-V10-13 met; V10-HANDOFF-1) |
| V10-0389 | rule | 3.16 | V10 §3.16 opening (§7.1's dry-run outcome table cited, E-07) |
| V10-0390 | refusal-row | 3.16 | V10 §3.16 |
| V10-0391 | refusal-row | 3.16 | V10 §3.16 |
| V10-0392 | refusal-row | 3.16 | V10 §3.16 |
| V10-0393 | refusal-row | 3.16 | V10 §3.16 |
| V10-0394 | refusal-row | 3.16 | V10 §3.16 |
| V10-0395 | refusal-row | 3.16 | V10 §3.16 |
| V10-0396 | refusal-row | 3.16 | V10 §3.16 |
| V10-0397 | refusal-row | 3.16 | V10 §3.16 |
| V10-0398 | refusal-row | 3.16 | V10 §3.16 |
| V10-0399 | refusal-row | 3.16 | V10 §3.16 `key` row (provider-neutral words, J121; J-V10.121) |
| V10-0400 | refusal-row | 3.16 | V10 §3.16 `offline` row (the one sentence, E-32) |
| V10-0401 | refusal-row | 3.16 | V10 §3.16 |
| V10-0402 | refusal-row | 3.16 | V10 §3.16 |
| V10-0403 | rule | 3.16 | V10 §3.16 *The dry run's bends* (V02 §1b's set, V05's and V06's lines, `bend.tiers.internal`; V09-XAGREE-3, V05-WGAP-2b, V06-WGAP-1b) |
| V10-0404 | host-config | 3.17 | V10 §3.17 configurations (SettlementForge's is C, J121, J122; V10-J121-2) |
| V10-0405 | host-config | 3.17 | V10 §3.17 |
| V10-0406 | host-config | 3.17 | V10 §3.17 |
| V10-0407 | rule | 3.17 | V10 §3.17 |
| V10-0408 | rule | 3.17 | V10 §3.17 |
| V10-0409 | rule | 3.17 | V10 §3.17 |
| V10-0410 | rule | 3.17 | V10 §3.17 *Door 1* (V08 §5.4 (3)'s rows for the base kinds; this volume's kinds here) |
| V10-0411 | host-projection | 3.17 | V10 §3.17 |
| V10-0412 | host-projection | 3.17 | V10 §3.17 |
| V10-0413 | host-projection | 3.17 | V10 §3.17 |
| V10-0414 | host-projection | 3.17 | V10 §3.17 |
| V10-0415 | host-projection | 3.17 | V10 §3.17 |
| V10-0416 | host-projection | 3.17 | V10 §3.17 |
| V10-0417 | rule | 3.17 | V10 §3.17 (a relay follows SettlementForge's AI setup, J121) |
| V10-0418 | rule | 3.18 | V10 §3.18 |
| V10-0419 | failure-ladder | 3.19 | V10 §3.19 key check (provider-neutral words) |
| V10-0420 | failure-ladder | 3.19 | V10 §3.19 |
| V10-0421 | failure-ladder | 3.19 | V10 §3.19 |
| V10-0422 | failure-ladder | 3.19 | V10 §3.19 |
| V10-0423 | failure-ladder | 3.19 | V10 §3.19 |
| V10-0424 | failure-ladder | 3.19 | V10 §3.19 |
| V10-0425 | failure-ladder | 3.19 | V10 §3.19 |
| V10-0426 | failure-ladder | 3.19 | V10 §3.19 |
| V10-0427 | failure-ladder | 3.19 | V10 §3.19 |
| V10-0428 | failure-ladder | 3.19 | V10 §3.19 |
| V10-0429 | failure-ladder | 3.19 | V10 §3.19 |
| V10-0430 | failure-ladder | 3.19 | V10 §3.19 |
| V10-0431 | failure-ladder | 3.19 | V10 §3.19 |
| V10-0432 | failure-ladder | 3.19 | V10 §3.19 |
| V10-0433 | failure-ladder | 3.19 | V10 §3.19 |
| V10-0434 | failure-ladder | 3.19 | V10 §3.19 |
| V10-0435 | failure-ladder | 3.19 | V10 §3.19 |
| V10-0436 | failure-ladder | 3.19 | V10 §3.19 |
| V10-0437 | failure-ladder | 3.19 | V10 §3.19 |
| V10-0438 | rule | 3.19 | V10 §3.19 |
| V10-0439 | rule | 3.20 | V10 §3.20 |
| V10-0440 | rule | 3.20 | V10 §3.20 data notice (the service the setup names, J121) |
| V10-0441 | rule | 3.21 | V10 §3.21 |
| V10-0442 | rule | 3.22 | V10 §3.22 |
| V10-0443 | rule | 4.1 | V10 §4.1 |
| V10-0444 | encoder-row | 4.1 | V10 §4.1 |
| V10-0445 | encoder-row | 4.1 | V10 §4.1 |
| V10-0446 | encoder-row | 4.1 | V10 §4.1 |
| V10-0447 | encoder-row | 4.1 | V10 §4.1 |
| V10-0448 | encoder-row | 4.1 | V10 §4.1 |
| V10-0449 | encoder-row | 4.1 | V10 §4.1 |
| V10-0450 | encoder-row | 4.1 | V10 §4.1 `islet` (`encoders.islet.sizeM2`; V10-WGAP-1) |
| V10-0451 | encoder-row | 4.1 | V10 §4.1 |
| V10-0452 | encoder-row | 4.1 | V10 §4.1 |
| V10-0453 | encoder-row | 4.1 | V10 §4.1 |
| V10-0454 | encoder-row | 4.1 | V10 §4.1 |
| V10-0455 | encoder-row | 4.1 | V10 §4.1 |
| V10-0456 | encoder-row | 4.1 | V10 §4.1 |
| V10-0457 | encoder-row | 4.1 | V10 §4.1 |
| V10-0458 | encoder-row | 4.1 | V10 §4.1 |
| V10-0459 | encoder-row | 4.1 | V10 §4.1 |
| V10-0460 | encoder-row | 4.1 | V10 §4.1 |
| V10-0461 | encoder-row | 4.1 | V10 §4.1 |
| V10-0462 | encoder-row | 4.1 | V10 §4.1 |
| V10-0463 | encoder-row | 4.1 | V10 §4.1 |
| V10-0464 | encoder-row | 4.1 | V10 §4.1 |
| V10-0465 | encoder-row | 4.1 | V10 §4.1 |
| V10-0466 | encoder-row | 4.1 | V10 §4.1 |
| V10-0467 | encoder-row | 4.1 | V10 §4.1 |
| V10-0468 | encoder-row | 4.1 | V10 §4.1 |
| V10-0469 | encoder-row | 4.1 | V10 §4.1 |
| V10-0470 | encoder-row | 4.1 | V10 §4.1 T8 (`encoders.scopeRingSides`; V10-WGAP-1) |
| V10-0471 | encoder-row | 4.1 | V10 §4.1 |
| V10-0472 | encoder-row | 4.1 | V10 §4.1 `green` (`encoders.ringSides`; V10-WGAP-1) |
| V10-0473 | encoder-row | 4.1 | V10 §4.1 |
| V10-0474 | encoder-row | 4.1 | V10 §4.1 |
| V10-0475 | encoder-row | 4.1 | V10 §4.1 |
| V10-0476 | encoder-row | 4.1 | V10 §4.1 |
| V10-0477 | encoder-row | 4.1 | V10 §4.1 |
| V10-0478 | encoder-row | 4.1 | V10 §4.1 |
| V10-0479 | encoder-row | 4.1 | V10 §4.1 |
| V10-0480 | encoder-row | 4.1 | V10 §4.1 |
| V10-0481 | encoder-row | 4.1 | V10 §4.1 |
| V10-0482 | encoder-row | 4.1 | V10 §4.1 |
| V10-0483 | encoder-row | 4.1 | V10 §4.1 |
| V10-0484 | encoder-row | 4.1 | V10 §4.1 |
| V10-0485 | encoder-row | 4.1 | V10 §4.1 |
| V10-0486 | encoder-row | 4.1 | V10 §4.1 |
| V10-0487 | encoder-row | 4.1 | V10 §4.1 |
| V10-0488 | encoder-row | 4.1 | V10 §4.1 |
| V10-0489 | encoder-row | 4.1 | V10 §4.1 |
| V10-0490 | encoder-row | 4.1 | V10 §4.1 |
| V10-0491 | encoder-row | 4.1 | V10 §4.1 |
| V10-0492 | rule | 4.1 | V10 §4.1 |
| V10-0493 | step | 4.2 | V10 §4.2 (3) (the untouched town dropped, no Recent entry; J-V9.127; V10-EDGE-1) |
| V10-0494 | rule | 4.3 | V10 §4.3 |
| V10-0495 | rule | 4.4 | V10 §4.4 (Undo worded by `button.undo`) |
| V10-0496 | rule | 4.5 | V10 §4.5 |
| V10-0497 | rule | 5 | V10 §5 |
| V10-0498 | map-mark | 5.1 | V10 §5.1 |
| V10-0499 | map-mark | 5.1 | V10 §5.1 |
| V10-0500 | map-mark | 5.1 | V10 §5.1 |
| V10-0501 | map-mark | 5.1 | V10 §5.1 |
| V10-0502 | rule | 5.2 | V10 §5.2 |
| V10-0503 | rule | 5.3 | V10 §5.3 |
| V10-0504 | rule | 5.4 | V10 §5.4 (SR6-05 (c), (d), (f); the grandeur line) |
| V10-0505 | rule | 6 | V10 §6 |
| V10-0506 | local-budget | 6.1 | V10 §6.1 |
| V10-0507 | local-budget | 6.1 | V10 §6.1 |
| V10-0508 | local-budget | 6.1 | V10 §6.1 |
| V10-0509 | local-budget | 6.1 | V10 §6.1 |
| V10-0510 | local-budget | 6.1 | V10 §6.1 |
| V10-0511 | local-budget | 6.1 | V10 §6.1 |
| V10-0512 | local-budget | 6.1 | V10 §6.1 |
| V10-0513 | local-budget | 6.1 | V10 §6.1 |
| V10-0514 | local-budget | 6.1 | V10 §6.1 |
| V10-0515 | local-budget | 6.1 | V10 §6.1 |
| V10-0516 | local-budget | 6.1 | V10 §6.1 |
| V10-0517 | local-budget | 6.1 | V10 §6.1 |
| V10-0518 | local-budget | 6.1 | V10 §6.1 |
| V10-0519 | local-budget | 6.1 | V10 §6.1 |
| V10-0520 | local-budget | 6.1 | V10 §6.1 |
| V10-0521 | local-budget | 6.1 | V10 §6.1 |
| V10-0522 | local-budget | 6.1 | V10 §6.1 |
| V10-0523 | local-budget | 6.1 | V10 §6.1 |
| V10-0524 | local-budget | 6.1 | V10 §6.1 |
| V10-0525 | local-budget | 6.1 | V10 §6.1 |
| V10-0526 | local-budget | 6.1 | V10 §6.1 |
| V10-0527 | local-budget | 6.1 | V10 §6.1 |
| V10-0528 | local-budget | 6.1 | V10 §6.1 |
| V10-0529 | local-budget | 6.1 | V10 §6.1 |
| V10-0530 | local-budget | 6.1 | V10 §6.1 |
| V10-0531 | local-budget | 6.1 | V10 §6.1 |
| V10-0532 | rule | 6.1 | V10 §6.1 |
| V10-0533 | rule | 6.2 | V10 §6.2 |
| V10-0534 | rule | 6.3 | V10 §6.3 |
| V10-0535 | rule | 6.4 | V10 §6.4 (the tier follows the AI setup, J121) |
| V10-0536 | cost-row | 6.4 | V10 §6.4 |
| V10-0537 | cost-row | 6.4 | V10 §6.4 |
| V10-0538 | cost-row | 6.4 | V10 §6.4 |
| V10-0539 | cost-row | 6.4 | V10 §6.4 |
| V10-0540 | cost-row | 6.4 | V10 §6.4 |
| V10-0541 | latency-target | 6.5 | V10 §6.5 |
| V10-0542 | latency-target | 6.5 | V10 §6.5 |
| V10-0543 | latency-target | 6.5 | V10 §6.5 |
| V10-0544 | latency-target | 6.5 | V10 §6.5 |
| V10-0545 | latency-target | 6.5 | V10 §6.5 |
| V10-0546 | rule | 6.5 | V10 §6.5 (J121) |
| V10-0547 | rule | 7 | V10 §7 |
| V10-0548 | test | 7.1 | V10 §7.1 T-V10-1 |
| V10-0549 | test | 7.1 | V10 §7.1 T-V10-2 |
| V10-0550 | test | 7.1 | V10 §7.1 T-V10-3 |
| V10-0551 | test | 7.1 | V10 §7.1 T-V10-4 |
| V10-0552 | test | 7.1 | V10 §7.1 T-V10-5 |
| V10-0553 | test | 7.1 | V10 §7.1 T-V10-6 |
| V10-0554 | test | 7.1 | V10 §7.1 T-V10-7 |
| V10-0555 | test | 7.1 | V10 §7.1 T-V10-8 |
| V10-0556 | test | 7.1 | V10 §7.1 T-V10-9 |
| V10-0557 | test | 7.1 | V10 §7.1 T-V10-10 |
| V10-0558 | test | 7.1 | V10 §7.1 T-V10-11 |
| V10-0559 | test | 7.1 | V10 §7.1 T-V10-12 |
| V10-0560 | test | 7.1 | V10 §7.1 T-V10-13 |
| V10-0561 | test | 7.1 | V10 §7.1 T-V10-14 |
| V10-0562 | test | 7.1 | V10 §7.1 T-V10-15 |
| V10-0563 | test | 7.1 | V10 §7.1 T-V10-16 |
| V10-0564 | test | 7.1 | V10 §7.1 T-V10-17 |
| V10-0565 | test | 7.1 | V10 §7.1 T-V10-18 |
| V10-0566 | test | 7.1 | V10 §7.1 T-V10-19 |
| V10-0567 | test | 7.1 | V10 §7.1 T-V10-20 |
| V10-0568 | test | 7.1 | V10 §7.1 T-V10-21 |
| V10-0569 | test | 7.1 | V10 §7.1 T-V10-22 |
| V10-0570 | test | 7.1 | V10 §7.1 T-V10-23 |
| V10-0571 | test | 7.1 | V10 §7.1 T-V10-24 |
| V10-0572 | test | 7.1 | V10 §7.1 T-V10-25 |
| V10-0573 | test | 7.1 | V10 §7.1 T-V10-26 |
| V10-0574 | test | 7.1 | V10 §7.1 T-V10-27 |
| V10-0575 | test | 7.1 | V10 §7.1 T-V10-28 |
| V10-0576 | test | 7.1 | V10 §7.1 T-V10-29 |
| V10-0577 | test | 7.1 | V10 §7.1 T-V10-30 |
| V10-0578 | test | 7.1 | V10 §7.1 T-V10-31 |
| V10-0579 | test | 7.1 | V10 §7.1 T-V10-32 |
| V10-0580 | test | 7.1 | V10 §7.1 T-V10-33 |
| V10-0581 | test | 7.1 | V10 §7.1 T-V10-34 |
| V10-0582 | test | 7.1 | V10 §7.1 T-V10-35 |
| V10-0583 | test | 7.1 | V10 §7.1 T-V10-36 |
| V10-0584 | test | 7.1 | V10 §7.1 T-V10-37 |
| V10-0585 | test | 7.1 | V10 §7.1 T-V10-38 |
| V10-0586 | test | 7.1 | V10 §7.1 T-V10-39 |
| V10-0587 | test | 7.1 | V10 §7.1 T-V10-40 |
| V10-0588 | test | 7.1 | V10 §7.1 T-V10-41 |
| V10-0589 | test | 7.1 | V10 §7.1 T-V10-42 |
| V10-0590 | test | 7.1 | V10 §7.1 T-V10-43 |
| V10-0591 | test | 7.1 | V10 §7.1 T-V10-44 (`ClerkHandle.run`; E-33) |
| V10-0592 | rule | 7.2 | V10 §7.2 |
| V10-0593 | rule | 7.3 | V10 §7.3 |
| V10-0594 | eval-group | 7.3 | V10 §7.3 |
| V10-0595 | eval-group | 7.3 | V10 §7.3 |
| V10-0596 | eval-group | 7.3 | V10 §7.3 |
| V10-0597 | eval-group | 7.3 | V10 §7.3 |
| V10-0598 | eval-group | 7.3 | V10 §7.3 |
| V10-0599 | eval-group | 7.3 | V10 §7.3 |
| V10-0600 | eval-group | 7.3 | V10 §7.3 |
| V10-0601 | eval-group | 7.3 | V10 §7.3 |
| V10-0602 | eval-group | 7.3 | V10 §7.3 group I (a failing case reported, J122) |
| V10-0603 | rule | 7.3 | V10 §7.3 *When it runs* (J122's staged spend; J-V10.119) |
| V10-0604 | rule | 8 | V10 §8 |
| V10-0605 | build-step | 8 | V10 §8 |
| V10-0606 | build-step | 8 | V10 §8 |
| V10-0607 | build-step | 8 | V10 §8 |
| V10-0608 | build-step | 8 | V10 §8 C2 (unchanged) |
| V10-0609 | build-step | 8 | V10 §8 |
| V10-0610 | build-step | 8 | V10 §8 |
| V10-0611 | build-step | 8 | V10 §8 |
| V10-0612 | rule | 8 | V10 §8 |
| V10-0613 | rule | 8 | V10 §8 risks (1), (3) (J121) |
| V10-0614 | decision | 9 | V10 §9 J-V10.1 |
| V10-0615 | decision | 9 | V10 §9 J-V10.2 |
| V10-0616 | decision | 9 | V10 §9 J-V10.3 |
| V10-0617 | decision | 9 | V10 §9 J-V10.4 (J121 wording) |
| V10-0618 | decision | 9 | V10 §9 J-V10.5 |
| V10-0619 | decision | 9 | V10 §9 J-V10.6 |
| V10-0620 | decision | 9 | V10 §9 J-V10.7 |
| V10-0621 | decision | 9 | V10 §9 J-V10.8 |
| V10-0622 | decision | 9 | V10 §9 J-V10.9 |
| V10-0623 | decision | 9 | V10 §9 J-V10.10 |
| V10-0624 | decision | 9 | V10 §9 J-V10.11 |
| V10-0625 | decision | 9 | V10 §9 J-V10.12 |
| V10-0626 | decision | 9 | V10 §9 J-V10.13 |
| V10-0627 | decision | 9 | V10 §9 J-V10.14 |
| V10-0628 | decision | 9 | V10 §9 J-V10.15 |
| V10-0629 | decision | 9 | V10 §9 J-V10.16 |
| V10-0630 | decision | 9 | V10 §9 J-V10.17 |
| V10-0631 | decision | 9 | V10 §9 J-V10.18 |
| V10-0632 | decision | 9 | V10 §9 J-V10.19 |
| V10-0633 | decision | 9 | V10 §9 J-V10.20 |
| V10-0634 | decision | 9 | V10 §9 J-V10.21 |
| V10-0635 | decision | 9 | V10 §9 J-V10.22 |
| V10-0636 | decision | 9 | V10 §9 J-V10.23 |
| V10-0637 | decision | 9 | V10 §9 J-V10.24 (J121 wording) |
| V10-0638 | decision | 9 | V10 §9 J-V10.25 |
| V10-0639 | decision | 9 | V10 §9 J-V10.26 |
| V10-0640 | decision | 9 | V10 §9 J-V10.27 |
| V10-0641 | decision | 9 | V10 §9 J-V10.28 (amended by J-V10.111, E-24) |
| V10-0642 | decision | 9 | V10 §9 J-V10.29 |
| V10-0643 | decision | 9 | V10 §9 J-V10.30 |
| V10-0644 | decision | 9 | V10 §9 J-V10.31 |
| V10-0645 | decision | 9 | V10 §9 J-V10.32 |
| V10-0646 | decision | 9 | V10 §9 J-V10.33 |
| V10-0647 | decision | 9 | V10 §9 J-V10.34 (superseded by J-V10.80, E-24) |
| V10-0648 | decision | 9 | V10 §9 J-V10.35 |
| V10-0649 | decision | 9 | V10 §9 J-V10.36 |
| V10-0650 | decision | 9 | V10 §9 J-V10.37 |
| V10-0651 | decision | 9 | V10 §9 J-V10.38 |
| V10-0652 | decision | 9 | V10 §9 J-V10.39 |
| V10-0653 | decision | 9 | V10 §9 J-V10.40 |
| V10-0654 | decision | 9 | V10 §9 J-V10.41 |
| V10-0655 | decision | 9 | V10 §9 J-V10.42 |
| V10-0656 | decision | 9 | V10 §9 J-V10.43 |
| V10-0657 | decision | 9 | V10 §9 J-V10.44 |
| V10-0658 | decision | 9 | V10 §9 J-V10.45 |
| V10-0659 | decision | 9 | V10 §9 J-V10.46 |
| V10-0660 | decision | 9 | V10 §9 J-V10.47 |
| V10-0661 | decision | 9 | V10 §9 J-V10.48 |
| V10-0662 | decision | 9 | V10 §9 J-V10.49 |
| V10-0663 | decision | 9 | V10 §9 J-V10.50 |
| V10-0664 | decision | 9 | V10 §9 J-V10.51 |
| V10-0665 | decision | 9 | V10 §9 J-V10.52 |
| V10-0666 | decision | 9 | V10 §9 J-V10.53 |
| V10-0667 | decision | 9 | V10 §9 J-V10.54 |
| V10-0668 | decision | 9 | V10 §9 J-V10.55 |
| V10-0669 | decision | 9 | V10 §9 J-V10.56 |
| V10-0670 | decision | 9 | V10 §9 J-V10.57 (*Superseded by J-V10.88*, E-24) |
| V10-0671 | decision | 9 | V10 §9 J-V10.58 |
| V10-0672 | decision | 9 | V10 §9 J-V10.59 |
| V10-0673 | decision | 9 | V10 §9 J-V10.60 |
| V10-0674 | decision | 9 | V10 §9 J-V10.61 |
| V10-0675 | decision | 9 | V10 §9 J-V10.62 |
| V10-0676 | decision | 9 | V10 §9 J-V10.63 |
| V10-0677 | decision | 9 | V10 §9 J-V10.64 |
| V10-0678 | decision | 9 | V10 §9 J-V10.65 |
| V10-0679 | decision | 9 | V10 §9 J-V10.66 |
| V10-0680 | decision | 9 | V10 §9 J-V10.67 |
| V10-0681 | decision | 9 | V10 §9 J-V10.68 |
| V10-0682 | decision | 9 | V10 §9 J-V10.69 |
| V10-0683 | decision | 9 | V10 §9 J-V10.70 |
| V10-0684 | decision | 9 | V10 §9 J-V10.71 |
| V10-0685 | decision | 9 | V10 §9 J-V10.72 |
| V10-0686 | decision | 9 | V10 §9 J-V10.73 |
| V10-0687 | decision | 9 | V10 §9 J-V10.74 |
| V10-0688 | decision | 9 | V10 §9 J-V10.75 |
| V10-0689 | decision | 9 | V10 §9 J-V10.76 |
| V10-0690 | decision | 9 | V10 §9 J-V10.77 |
| V10-0691 | decision | 9 | V10 §9 J-V10.78 |
| V10-0692 | decision | 9 | V10 §9 J-V10.79 |
| V10-0693 | decision | 9 | V10 §9 J-V10.80 |
| V10-0694 | decision | 9 | V10 §9 J-V10.81 |
| V10-0695 | decision | 9 | V10 §9 J-V10.82 |
| V10-0696 | decision | 9 | V10 §9 J-V10.83 |
| V10-0697 | decision | 9 | V10 §9 J-V10.84 |
| V10-0698 | decision | 9 | V10 §9 J-V10.85 |
| V10-0699 | decision | 9 | V10 §9 J-V10.86 |
| V10-0700 | decision | 9 | V10 §9 J-V10.87 |
| V10-0701 | decision | 9 | V10 §9 J-V10.88 (E-33 wording) |
| V10-0702 | decision | 9 | V10 §9 J-V10.89 |
| V10-0703 | decision | 9 | V10 §9 J-V10.90 |
| V10-0704 | decision | 9 | V10 §9 J-V10.91 |
| V10-0705 | decision | 9 | V10 §9 J-V10.92 |
| V10-0706 | decision | 9 | V10 §9 J-V10.93 |
| V10-0707 | decision | 9 | V10 §9 J-V10.94 |
| V10-0708 | decision | 9 | V10 §9 J-V10.95 |
| V10-0709 | decision | 9 | V10 §9 J-V10.96 |
| V10-0710 | decision | 9 | V10 §9 J-V10.97 |
| V10-0711 | decision | 9 | V10 §9 J-V10.98 |
| V10-0712 | decision | 9 | V10 §9 J-V10.99 |
| V10-0713 | decision | 9 | V10 §9 J-V10.100 |
| V10-0714 | decision | 9 | V10 §9 J-V10.101 (amended by J-V10.106, E-24) |
| V10-0715 | decision | 9 | V10 §9 J-V10.102 (amended by J-V10.112, E-24) |
| V10-0716 | decision | 9 | V10 §9 J-V10.103 |
| V10-0717 | decision | 9 | V10 §9 J-V10.104 |
| V10-0718 | decision | 9 | V10 §9 J-V10.105 |
| V10-0719 | decision | 9 | V10 §9 J-V10.106 (amended by J-V10.110, E-24) |
| V10-0720 | decision | 9 | V10 §9 J-V10.107 (SR6-05 (a)) |
| V10-0721 | decision | 9 | V10 §9 J-V10.108 |
| V10-0722 | decision | 9 | V10 §9 J-V10.109 |
| V10-0723 | decision | 9 | V10 §9 J-V10.110 |
| V10-0724 | bcr | 10.1 | V10 §10.1 pointer row → file f item 468 (base §11.2) |
| V10-0725 | bcr | 10.1 | V10 §10.1 pointer row → file f item 311 (base §4.7) |
| V10-0726 | bcr | 10.1 | V10 §10.1 pointer row → file f item 270 (base §2.8) |
| V10-0727 | bcr | 10.1 | V10 §10.1 pointer row → file f item 297 (base §4.5) |
| V10-0728 | bcr | 10.1 | V10 §10.1 pointer row → file f item 469 (base §11.2) |
| V10-0729 | bcr | 10.1 | V10 §10.1 pointer row → file f item 470 (base §11.2) |
| V10-0730 | bcr | 10.1 | V10 §10.1 pointer row → file f item 473 (base §11.3) |
| V10-0731 | bcr | 10.1 | V10 §10.1 pointer row → file f item 518 (base §§14) |
| V10-0732 | bcr | 10.1 | V10 §10.1 pointer row → file f item 538 (base §17.4) |
| V10-0733 | bcr | 10.1 | V10 §10.1 pointer row → file f item 531 (base §§16) |
| V10-0734 | bcr | 10.1 | V10 §10.1 pointer row → file f item 487 (base §13.2) |
| V10-0735 | bcr | 10.1 | V10 §10.1 pointer row → file f item 348 (base §7.1) |
| V10-0736 | bcr | 10.1 | V10 §10.1 pointer row → file f item 471 (base §11.2) |
| V10-0737 | bcr | 10.1 | V10 §10.1 pointer row → file f item 519 (base §§14) |
| V10-0738 | bcr | 10.1 | V10 §10.1 pointer row → file f item 271 (base §2.8) |
| V10-0739 | bcr | 10.1 | V10 §10.1 pointer row → file f item 365 (base §7.1) |
| V10-0740 | bcr | 10.1 | V10 §10.1 pointer row → file f item 366 (base §7.1) |
| V10-0741 | bcr | 10.1 | V10 §10.1 pointer row → file f item 367 (base §7.1) |
| V10-0742 | bcr | 10.1 | V10 §10.1 pointer row → file f item 481 (base §12.8) |
| V10-0743 | bcr | 10.1 | V10 §10.1 pointer row → file f item 368 (base §7.1) |
| V10-0744 | bcr | 10.1 | V10 §10.1 pointer row → file f item 290 (base §4.3) |
| V10-0745 | bcr | 10.1 | V10 §10.1 pointer row → file f item 572 (base §11.2) |
| V10-0746 | bcr | 10.1 | V10 §10.1 pointer row → file f item 571 (base §7.1) |
| V10-0747 | rule | 10 | V10 §10.1 opening |
| V10-0748 | cvr | 10.2 | V10 §10.2 (closed at its destination) |
| V10-0749 | cvr | 10.2 | V10 §10.2 (closed at its destination) |
| V10-0750 | cvr | 10.2 | V10 §10.2 (closed at its destination) |
| V10-0751 | cvr | 10.2 | V10 §10.2 (closed at its destination) |
| V10-0752 | cvr | 10.2 | V10 §10.2 (closed at its destination) |
| V10-0753 | cvr | 10.2 | V10 §10.2 (closed at its destination) |
| V10-0754 | cvr | 10.2 | V10 §10.2 (closed at its destination) |
| V10-0755 | cvr | 10.2 | V10 §10.2 (closed at its destination) |
| V10-0756 | cvr | 10.2 | V10 §10.2 (closed at its destination) |
| V10-0757 | cvr | 10.2 | V10 §10.2 (closed at its destination) |
| V10-0758 | cvr | 10.2 | V10 §10.2 (closed at its destination) |
| V10-0759 | cvr | 10.2 | V10 §10.2 (closed at its destination) |
| V10-0760 | cvr | 10.2 | V10 §10.2 (closed at its destination) |
| V10-0761 | cvr | 10.2 | V10 §10.2 (closed at its destination) |
| V10-0762 | cvr | 10.2 | V10 §10.2 (closed at its destination) |
| V10-0763 | cvr | 10.2 | V10 §10.2 (closed at its destination) |
| V10-0764 | cvr | 10.2 | V10 §10.2 (closed at its destination) |
| V10-0765 | cvr | 10.2 | V10 §10.2 (closed at its destination) |
| V10-0766 | cvr | 10.2 | V10 §10.2 (closed at its destination) |
| V10-0767 | cvr | 10.2 | V10 §10.2 (closed at its destination) |
| V10-0768 | merged-text | 10.3 | V10 §10.1's closing paragraph (one text each in the base) |
| V10-0769 | merged-text | 10.3 | V10 §10.1's closing paragraph (one text each in the base) |
| V10-0770 | merged-text | 10.3 | V10 §10.1's closing paragraph (one text each in the base) |
| V10-0771 | merged-text | 10.3 | V10 §10.1's closing paragraph (one text each in the base) |
| V10-0772 | merged-text | 10.3 | V10 §10.1's closing paragraph (one text each in the base) |
| V10-0773 | merged-text | 10.3 | V10 §10.1's closing paragraph (one text each in the base) |
| V10-0774 | owner-question | 11 | V10 §11 (answered, J121/J122) |
| V10-0775 | owner-question | 11 | V10 §11 (answered, J121/J122) |
| V10-0776 | owner-question | 11 | V10 §11 (answered, J121/J122) |
| V10-0777 | owner-question | 11 | V10 §11 (answered, J121/J122) |
| V10-0778 | owner-question | 11 | V10 §11 (answered, J121/J122) |
| V10-0779 | evidence | 12 | V10 §12 CONFIRMED (standing evidence; the per-round record to the validation records) |
| V10-0780 | evidence | 12 | V10 §12 PLAUSIBLE |
| V10-0781 | fix-list | 13 | V10 §13 (none open) |
| V10-0782 | integration-note | IN | folded into the body (V10 §3.16, V10 §2.13, V10 §2.12, V10 §10.2, V10 §4.1); V10's Integration notes map |
| V10-0783 | note | finalization | applied in place (V10 §2.6, V10 §3.5 step 3, V10 §3.16; J-V10.110); the record to the validation records |
| V10-0784 | term | glossary | V10 §2 |
| V10-0785 | term | glossary | V10 §2.6 (`createClerk(mount)` → `ClerkHandle`; E-33) |
| V10-0786 | term | glossary | V10 §2.3 (the term's definition) |
| V10-0787 | term | glossary | V10 §2.4 (the term's definition) |
| V10-0788 | term | glossary | V10 §2.5 (the term's definition) |
| V10-0789 | term | glossary | V10 §2.13 (the term's definition) |
| V10-0790 | term | glossary | V10 §2.3 (the term's definition) |
| V10-0791 | term | glossary | V10 §3.12 (the term's definition) |
| V10-0792 | term | glossary | V10 §3.13 (the term's definition) |
| V10-0793 | term | glossary | V10 §3.13 (the term's definition) |
| V10-0794 | term | glossary | V10 §2.9 (the term's definition) |
| V10-0795 | term | glossary | V10 §3.10 (the term's definition) |
| V10-0796 | term | glossary | V10 §2.13 (the term's definition) |
| V10-0797 | term | glossary | V10 §3.9 (the term's definition) |
| V10-0798 | term | glossary | V10 §3.9 (the term's definition) |
| V10-0799 | term | glossary | V10 §3.9 (the term's definition) |
| V10-0800 | term | glossary | V10 §3.17 (the term's definition) |
| V10-0801 | term | glossary | V10 §3.18 (the term's definition) |
| V10-0802 | term | glossary | V10 §2.10 (the term's definition) |
| V10-0803 | term | glossary | V10 §7.2 (the term's definition) |
| V10-0804 | term | glossary | V10 §2.7 (the term's definition) |
| V10-0805 | term | glossary | V10 §4.4 (the term's definition) |

## 12 EDGES MAP — every catalogue edge and combination → its V10 §3.23 row

| edge | state in the catalogue | V10 §3.23 row | test |
|---|---|---|---|
| M-V10-456-E5-data | UNTESTED | 1 | T-V10-50 |
| M-V10-504-E5-data | UNTESTED | 2 | T-V10-50 |
| M-V10-570-E5-data | UNDEFINED | 3 | T-V10-50 |
| M-V10-781-E5-data | UNDEFINED | 4 | T-V10-50 |
| M-V10-795-E5-data | UNTESTED | 5 | T-V10-50 |
| M-V10-900-E5-data | UNDEFINED | 6 | T-V10-50 |
| M-V10-1215-E4-degenerate | UNDEFINED | E4 rule | T-V10-50 |
| M-V10-1215-E8-lifecycle | UNDEFINED | E8 rule; 7 | T-V10-50 |
| M-V10-1265-E1-none | UNTESTED | 8 | T-V10-50 |
| M-V10-1265-E2-one | UNTESTED | 8 | T-V10-50 |
| M-V10-1265-E4-degenerate | UNDEFINED | E4 rule (no geometry) | T-V10-50 |
| M-V10-1265-E8-lifecycle | UNDEFINED | E8 rule; 8 | T-V10-50 |
| M-V10-1306-E4-degenerate | UNDEFINED | 9 | T-V10-50 |
| M-V10-1441-E4-degenerate | UNDEFINED | E4 rule (no geometry) | T-V10-50 |
| M-V10-1503-E4-degenerate | UNDEFINED | E4 rule | T-V10-50 |
| M-V10-1503-E6-rungs | UNDEFINED | E6 rule; 10 | T-V10-50 |
| M-V10-1598-E4-degenerate | UNDEFINED | 11 | T-V10-50 |
| M-V10-1636-E1-none | UNTESTED | 7; 12 | T-V10-50 |
| M-V10-1636-E2-one | UNDEFINED | 12 | T-V10-50 |
| M-V10-1636-E4-degenerate | UNDEFINED | E4 rule | T-V10-50 |
| M-V10-1636-E5-data | UNTESTED | 12 | T-V10-50 |
| M-V10-1636-E6-rungs | UNTESTED | 12 | T-V10-50 |
| M-V10-1677-E1-none | UNTESTED | 13 | T-V10-50 |
| M-V10-1677-E2-one | UNTESTED | 13 | T-V10-50 |
| M-V10-1677-E4-degenerate | UNDEFINED | E4 rule; 13 | T-V10-50 |
| M-V10-1677-E5-data | UNDEFINED | 13 | T-V10-50 |
| M-V10-1690-E4-degenerate | UNDEFINED | 14 | T-V10-50 |
| M-V10-1820-E4-degenerate | UNDEFINED | E4 rule; 15 | T-V10-50 |
| M-V10-1820-E6-rungs | UNDEFINED | 15 | T-V10-50 |
| M-V10-1820-E8-lifecycle | UNDEFINED | 15 | T-V10-50 |
| M-V10-1862-E3-cap | UNDEFINED | 16 | T-V10-50 |
| M-V10-1862-E4-degenerate | UNDEFINED | 16 | T-V10-50 |
| M-V10-1862-E8-lifecycle | UNDEFINED | 16 | T-V10-50 |
| M-V10-1962-E4-degenerate | UNDEFINED | E4 rule (no geometry) | T-V10-50 |
| M-V10-1962-E6-rungs | UNDEFINED | 17 | T-V10-50 |
| M-V10-1962-E8-lifecycle | UNDEFINED | 17 | T-V10-50 |
| M-V10-2014-E4-degenerate | UNDEFINED | E4 rule (no geometry) | T-V10-50 |
| M-V10-2118-E1-none | UNDEFINED | 18 | T-V10-50 |
| M-V10-2149-E4-degenerate | UNDEFINED | E4 rule (no geometry) | T-V10-50 |
| M-V10-2149-E6-rungs | UNDEFINED | 19 | T-V10-50 |
| M-V10-2220-E4-degenerate | UNDEFINED | E4 rule (no geometry) | T-V10-50 |
| M-V10-2316-E1-none | UNDEFINED | 20 | T-V10-50 |
| M-V10-2316-E2-one | UNDEFINED | 20 | T-V10-50 |
| M-V10-2316-E3-cap | UNTESTED | 20 | T-V10-50 |
| M-V10-2316-E5-data | UNDEFINED | 20 | T-V10-50 |
| M-V10-2329-E5-data | UNDEFINED | 21 | T-V10-50 |
| M-V10-2329-E8-lifecycle | UNDEFINED | 21 | T-V10-50 |
| M-V10-2357-E1-none | UNTESTED | 22 (never sent: V10 §3.20) | T-V10-50 |
| M-V10-2357-E2-one | UNDEFINED | 22 | T-V10-50 |
| M-V10-2357-E5-data | UNDEFINED | 22 | T-V10-50 |
| M-V10-2357-E8-lifecycle | UNDEFINED | 22 | T-V10-50 |
| M-V10-2403-E1-none | UNDEFINED | 23 | T-V10-50 |
| M-V10-2403-E6-rungs | UNDEFINED | 23 | T-V10-50 |
| M-V10-2425-E4-degenerate | UNDEFINED | E4 rule; 24 | T-V10-50 |
| M-V10-2560-E2-one | UNDEFINED | 25 | T-V10-50 |
| M-V10-2569-E5-data | UNDEFINED | 26 | T-V10-50 |
| M-V10-2569-E7-toggles | UNDEFINED | 26 | T-V10-50 |
| M-V10-2569-E8-lifecycle | UNTESTED | 26 | T-V10-50 |
| M-V10-2586-E8-lifecycle | UNDEFINED | 27 | T-V10-50 |
| M-V10-2602-E1-none | UNDEFINED | 28 | T-V10-50 |
| M-V10-2602-E2-one | UNDEFINED | 28 | T-V10-50 |
| M-V10-2602-E8-lifecycle | UNTESTED | 18 | T-V10-50 |
| M-V10-2618-E1-none | UNDEFINED | 29 | T-V10-50 |
| M-V10-2618-E4-degenerate | UNDEFINED | E4 rule (no geometry) | T-V10-50 |
| EI-V10-EDGE-1 | UNDEFINED (inventory) | 30 | T-V10-50 (24), T-V9-40 |
| C-steep-clerk | combination UNDEFINED | C1 | T-V10-50 |
| C-moat-clerk | combination UNDEFINED | C2 | T-V10-50 |
| C-square-clerk | combination UNDEFINED | C3 | T-V10-50 |
| C-frame-clerk | combination UNDEFINED | C4 | T-V10-50 |
| C-sewer-clerk | combination UNDEFINED | C5 | T-V10-50 |
| C-access-clerk | combination UNDEFINED | C6 | T-V10-50 |
| C-vault-clerk | combination UNDEFINED | C7 | T-V10-50 |
| C-custom-clerk | combination UNDEFINED | C8 | T-V10-50 |
