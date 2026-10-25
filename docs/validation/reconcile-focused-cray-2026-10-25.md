# Reconciliation inventory: `origin/claude/focused-cray-qhz855` (B) into `main` / `claude/great-galileo-b4mzbq` (A)

*(An Opus 5.5 / high read-only analyst seat spawned by the managing session on account A, 2026-10-25 ~19:00Z — J491; J375's stand-in notice: to be re-read by the Fable seat that runs the reconciliation pass; nothing here was applied.)*

Read-only analysis, 2026-10-25. Repo /home/user/maps-architecture. Commands used: `git diff`, `git show`, `git log`,
`git merge-tree`, `git ls-tree`, `git grep`, `git cat-file -e`. No ref was written. (`git merge-tree --write-tree` does
write loose objects; the result tree was f5fe880e, run with `-c merge.conflictStyle=diff3`, and no ref points to it.)
Tags: **[O]** = OBSERVED (I ran the command or read the text). **[I]** = INFERRED.

## 0. Refs and fork

- [O] main = d56ef355; galileo = d9f4470e; B tip = 57856baf; merge-base(main, B) = 6b7bd736.
- [O] Commits since the fork: main 162, galileo 165 (main is an ancestor of galileo, 3 commits ahead: 5d8b7fef, f849488c, d9f4470e/J489), B 78.
- [O] `merge-tree` gives the same ten conflicting files whether A is main or galileo.
- [O] A's HANDOFF.md line 9 (galileo) already records this branch ("A second design thread, found and not touched (J489)") and plans a
  "Fable-managed pass of its own (the ID RULE for the J rows and the amendment items; the volumes merged by hand; the bundle regenerated; a critic)".
- [O] Which top-level areas B changed: README.md (1), docs (45), research (13), workflows (1). Nothing in plat/, tools/, session-state/, .claude/.
- In the tables below, "A" is main unless galileo is named. Where they differ (PROGRESS/HANDOFF only), the galileo figure is given.

## 1. Conflicting files: size and nature of each side's change

Conflict regions were counted in the diff3 merge tree. Each is classed as **SAME-LINES** (both sides rewrote the same base
lines, so it is a true semantic conflict that needs a hand merge) or **INSERT-BOTH** (both sides inserted at the same base point
and the base is empty, so keeping both normally works, after renumbering). Sections that both sides touched with NO conflict
region are "near only": a three-way merge already takes both.

| file | A (main) `--stat` | B `--stat` | conflict regions |
|---|---|---|---|
| README.md | +1 −1 | +3 −1 | 1 (SAME-LINES) |
| docs/ARCHITECTURE.md | +17 −11 (9 hunks) | +74 −18 (17 hunks) | 1 (SAME-LINES) |
| docs/HANDOFF.md | +345 −2 (galileo +365 −2) | +117 −1 | 2 (1 INSERT-BOTH, 1 SAME-LINES) |
| docs/OWNER-BRIEF-…-2026-10-16.md | +13 −4 | +11 −8 | 2 (SAME-LINES) |
| docs/PROGRESS.md | +98 −1 (galileo +99 −1) | +13 −0 | 1 (SAME-LINES at the blank line after J389) |
| docs/volumes/INDEX.md | +18 −14 | +38 −21 | 8 (7 SAME-LINES, 1 INSERT-BOTH) |
| docs/volumes/SUMMARY.md | +50 −16 | +101 −17 | 7 (6 SAME-LINES, 1 INSERT-BOTH) |
| docs/volumes/V13-world.md | +527 −127 (122 hunks) | +2682 −392 (267 hunks) | 51 (45 SAME-LINES, 6 INSERT-BOTH) |
| docs/volumes/V14-sites.md | +194 −61 (53 hunks) | +70 −10 (16 hunks) | 3 (all INSERT-BOTH) |
| docs/ARCHITECTURE-FULL.md (generated) | +760 −217 | +5654 −451 | not merged by hand |

### 1.1 README.md [O]
- A: one row edited (base line 16, "The owner's rules and words": file j changed to "applied, cited by number…", and adds files r–x).
- B: line 11 "fourteen volumes" changed to "fifteen volumes"; new row after line 14 (V15-atlas + seam check); new row after line 15
  ("Changes applied to the core by the world-growth pass | `docs/AMENDMENTS-2026-10-23r.md` (items 926–1032 …"); B also edits the line-16 region.
- Conflict: the two sides' changes to line 16 and the new row next to it. Fix: keep A's row 16 and add B's rows, with B's file names
  and item numbers renamed (section 6).

### 1.2 docs/ARCHITECTURE.md [O]
Sections A touched: (preamble); "### 3.4 Kernel operations the pipeline needs (complete list)" (2 hunks); "### 4.9 S12a Hinterland
siting and the hinterland unit · S12b Greenery — the rule tables (O14 / O19)"; "### 4.12 The strategy interface, stage registration
by declared I/O, and the stage-2 seam (pointer)"; "### 7.3 Locality — effective scope, local operators, edit fates, recorded inputs,
the oracle (G-P3)"; "### 11.4 Host inputs (DEF-11)"; "## §16 Build plan — calibration and spikes first, then a viewable town, then
editing, then parity, then stage …" (2 hunks).

Sections B touched: "### 0.2 Where the owner's late rules land — items 1–7 …"; "### 2.7 Walls, gates, towers, castle, bridges; greenery,
land use, decorations, pins; labels; content entities"; "### 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, reservations, the
stage-1 boundary and its trace"; "### 6.4 Permalinks, version axes, retention and goldens"; "### 7.1 Edits are ordered events on
addresses; the named actions; the edit targets; dry-run validation"; "### 7.7 Intent, character, constraints, assignments, the forms
catalogue (O10; the ASSIGN hook)"; "### 11.1 Formats" (2); "### 11.2 The embedding API and the worker boundary (SCL-6)"; "### 11.4 Host
inputs (DEF-11)" (2); "### 12.8 Memory (what is counted, per rung)"; "### 12.10 The budget register" (2); "### 13.2 Per-stage
invariants, statistics, cost-model tests, contract tests, B-EDIT"; "### II.7.6 Catacombs, caverns and quarries; depth bands and the
connection graph (item 65)" (2).

- **True semantic conflict (1): "### 11.4 Host inputs (DEF-11)", base lines 17721–17722**, the door-1 sentence:
  - A: "it is outside J86's door 1 by the owner's word of 2026-10-18 (V13 §11 Q4; file r item 926), door 1 itself staying closed …"
  - B: "it is outside J86's door 1 — the owner's explicit word on it given by delegation on 2026-10-23 (V13 §11 Q4, ruled J396 (1) …; BCR-V13-47; file u item 1070) —, so the host's builder … and every new campaign's birth canon (H22) wait on no question …"
  - Both sides reach the same verdict (outside the door, door closed for geometry) by different routes: A has the owner's own "yes" (A's J391 (1)); B has a delegation ruling. [I] A's route is the stronger authority. Keep A's provenance and cite B's ruling as concurring (after renumbering).
- Every other section in the lists above was touched by only one side, so it merges mechanically. [O]

### 1.3 docs/HANDOFF.md: see section 4. docs/PROGRESS.md: see section 4.

### 1.4 docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md [O]
- A: "## 4 Part A — the M0 close gate (item 140; before M0 commits)" (3 hunks), "## 6 Part C — rulings under the delegation and the owner questions that remain" (2), "## 7 Part D — the design volumes (after M0 closes)", "## 9 Order and timing".
- B: "## 6 Part C …" (4), "## 9 Order and timing", "## 10 Not in this brief".
- True conflicts: (C1) §6, base line 125, the Q4 clause. A deletes it ("… (V13 §11 Q2); the audit's"); B replaces it with "(the world canon's place outside J86's door 1 — V13 §11 Q4 — was ruled under the owner's delegation of 2026-10-23, J396 (1) …". Same provenance question as 1.2. (C2) §9, base line 202, the "the host's track (V13 §8.5)" row: each side added different text to the same row, so the row needs a word-level union.

### 1.5 docs/volumes/INDEX.md [O]
- A: (preamble), "## 1 The product map" (2), "## 2 The wiring — base hooks and what each volume feeds", "## 6 Owner questions with recommendations" (6), "## 8 CONFIRMED versus PLAUSIBLE".
- B: the same five, plus "## 3 The dependency graph" (4), "## 4 The combined build order after M5, with estimates", "## 5 Risks and spikes across volumes" (2), "## 7 How the volumes were reconciled, and the fix list".
- True conflicts (all are both sides editing the same row or counter):
  - C1: preamble "are applied" sentence.
  - C2: §1 the V13 and V14 rows; B also adds a V15 row.
  - C3: §1 the BCR tally ("Files m–q … eleven requests (BCR-V13-30 – BCR-V13-40)" vs B's "Files m–r … seventeen requests (BCR-V13-30 – BCR-V13-46)").
  - C4: §2 the V13 and V14 wiring rows.
  - C5: §6 the paragraph on the questions. A: "ten questions … V14 Q5". B: Q4 ruled J396.
  - C6: §6 the V13 Q2–Q4 rows. A changes "H1–H30" to "H1–H32"; B changes it to H1–H48 by its own numbering.
  - C8: §8 the V13 person-weeks. A "39–47 (37–45 before file w's two person-weeks …)"; B "51–66 … 37–45 by file o plus 14–21 by file r".
- INSERT-BOTH C7 (§6): A adds the "| V14 | Q5 …" row; B adds the "| V15 | Q1–Q4 …" rows. Keep both.
- [I] Merged V13 cost = 37–45 + 2 (A's hidden ways) + 14–21 (B's file r) = 53–68. Recompute every total that depends on it.

### 1.6 docs/volumes/SUMMARY.md [O]
- A: (preamble), "## What each volume makes possible, and what it will feel like" (2), "## How big the whole program is" (2), "## How the checking went", "## Decisions that are yours" (3), "## What the two new volumes ask of you" (2).
- B: (preamble) (4), the same "What each volume…" (2), "## The order they would be built in", "## How big the whole program is" (3), "## Decisions that are yours" (2), "## What the two new volumes ask of you".
- True conflicts:
  - C1: preamble decision count. Base "thirty-three"; A "thirty-five … ten from the two new ones"; B keeps its own count and rules Q4.
  - C3: §How big, the V13 line. A "39–47"; B "51–66".
  - C4: §How big, the programme total. A "457–622 (455–620 before the hidden ways' two weeks …)"; B inserts the V15 line "7–10 person-weeks" and its own total.
  - C5: §Decisions, the cost clause.
  - C6: §Decisions, the "One waits on your own word" block (base 4 lines). A replaces it with the sites-and-roads question, answered (+14 lines). B replaces it with the J396 rulings and the V15 decisions (+40 lines).
  - C7: §What the two new volumes ask, "the eight decisions" vs "the ten decisions".
- INSERT-BOTH C2 (§What each volume…, after base line 70): A adds the trods paragraph (+6); B adds the world-growth and atlas paragraphs (+16). Keep both.
- Section touched by A only: "## How the checking went". By B only: "## The order they would be built in".

### 1.7 docs/volumes/V13-world.md [O]
Both sides touched these sections: (preamble); "### 1.1 What this volume builds"; "### 1.3 The owner rules obeyed (file j; quoted by
item)"; "### 1.4 Out of scope, with the reason"; "### 1b.1 Records, fields and tables"; "### 1b.2 Stage outputs and interfaces";
"### 1b.4 Entity kinds (each rendered, labelled, exported, persisted)"; "### 2.2 New records"; "### 2.3 New rule tables (data, editable by
`editTable`, §7.6; every cell `{value, unit, provenance, calibratable}`)"; "### 2.5 Identity: lineage units, creation keys and the namespace
segment (item 140 M1)"; "### 2.6 The lifecycle of every state field this volume adds or gives a producer"; "### 2.7 The version table, the
digests and the storage of the world"; "### 3.0 The world pipeline: registration, order, the materializer contract"; "### 3.8 W7 Routes (W7a
over the stage-1 candidates, W7b over the final seats; C13-33)"; "### 3.9 W8 Polity — the seat territory (W8a) and the sway (W8b)"; "### 3.11
P1–P5 Placement"; "### 3.14 Two verbs and the cascade"; "### 3.16 Failure handling (the ladders, in §5.2's form)"; "### 3.17 Determinism";
"### 4.1 The edit events (declared in §7.1's form; BCR-V13-9 adds them to `EditEvent`)"; "### 4.3 Locality (§7.3's form): effective scope, local
operators, what is pinned"; "### 5.1 The world map: layers and styles (§8's pipeline, the world's rows; BCR-V13-13)"; "### 5.4 Exports (§11.1's
pipeline; the world's exporters in `@plat/export`; BCR-V13-12)"; "### 5.8 The lens mechanism (J379; J384; one derived layer for every host system
the map draws)"; "### 5.9 The lenses (J384 (8)'s order; each a row set of V13 §5.8's mechanism)"; "## 6 Performance budgets (§12's form)";
"### 7.2 Hydrology and water state"; "### 7.3 Placement, glyphs, ports, orientation"; "### 7.4 Editing, view, exports, budgets"; "### 7.5 The report
codes (§5.4's form; BCR-V13-18)"; "### 8.2 Milestones"; "### 8.5 The host's parallel track (stated, not designed here)"; "## 9 Decisions (J-V13.n;
each "chose X over Y because Z"; vetoable under the delegation)"; "## 10 Base change requests (BCR-V13-n)"; "### 10.2 Requests to V14 (what V14
must supply; single source: these stay V14's facts)"; "## 11 Owner questions (true owner decisions only, each with a recommendation)".

B only: "## 0 In plain words", "### 1.2", "### 1b.3", "### 2.1", "### 2.4", "### 3.1 W0 Blueprint", "### 3.2 W1 Terrain recipe", "### 3.4 W3 Climate",
"### 3.6 W5 Biomes and resources", "### 3.7 W6 Suitability and siting proposals", "### 3.10 W9 Labels and the settlement glyph", "### 3.18 Edges",
"### 4.2", "### 4.4 Undo", "### 4.5 The counterfactual fork", "### 4.7", "### 5.2", "### 5.3 Labels", "## 7 Tests and acceptance bars", "### 7.1",
"### 8.1", "### 8.4 Risks and spikes", "## 12 CONFIRMED versus PLAUSIBLE". B also adds a NEW heading: "### 10.3 Requests to V15 (what V15 must
supply; single source: these stay V15's facts)". A only: none.

**Sections with true conflicts (the 51 regions, with counts):**
- (preamble): C1 INSERT-BOTH (revision notes A+62/B+32), C2
- 1b.1: C3
- 1b.2: C4
- 2.2 New records: C5–C8. Example C5: `at?:` comment on an event record; A adds the trod `where`, B adds knowledge events.
- 2.3: C9
- 3.8 W7 Routes: C10, C11 (A+46/B+43 on one base line)
- 3.11 P1–P5 Placement: C12–C18. Example C14: A adds ordered stretches; B adds the sailing offer, H33.
- 3.14: C19, C20
- 3.16: C21 INSERT-BOTH
- 3.17 Determinism: C22, C23
- 4.1 edit events: C24–C27. Example C24: `requestCharter`; A adds `accept?: ('unlawful')[]`, B adds the `{ kind: 'world'; rung … }` subject.
- 4.3: C28
- 5.1: C29, C30
- 5.4 Exports: C31, C32 (each side extends the `ecosystemGeoJson` row)
- 5.8 lens mechanism: C33 (B+34)
- 5.9 lenses: C34–C36
- §6 budgets: C37, C38 (A+4/B+30, the `WORLD-n` rows)
- 7.2: C39. The T-V13-21b count: A "twenty-one consumers … J393", B "twenty-two consumers". [I] merged = twenty-three.
- 7.3: C40 INSERT-BOTH
- 7.4: C41, C42 (B+66)
- 8.2 Milestones: C43, C44 (the M-W2 row; A adds W7 (12) approaches, J393)
- 8.5 host track: C45–C47 (the H5 row, etc.), C48 INSERT-BOTH (A's H31–H32 vs B's H31–H48)
- §9 Decisions: C49 INSERT-BOTH (A's J-V13.107–133, +27, vs B's J-V13.107–215, +96)
- §11 Owner questions: C50 (base 11 lines; A+35/B+30), C51.

On §11: A keeps "**Q4 — J86's door 1 and the world canon.**" as answered and adds "**Q5 — The hidden ways' price, … (file w).**".
B deletes Q4 ("Q4 above ruled J396 (1), gating nothing"). [O] B's §11 now has Q1–Q3; A's has Q1–Q5.

Near only (both touched, no conflict region, so the merge takes both): 1.1, 1.3, 1.4, 1b.4, 2.5, 2.6, 2.7, 3.0, 3.9, 7.5, §10, 10.2.
[I] Still check these after the merge for counts and cross-references that the id shifts in section 6 make stale.

### 1.8 docs/volumes/V14-sites.md [O]
- A touched: (preamble), "## 0 In plain words", 1.3, 1b.1, 1b.5, 1b.6, 2.2, 2.3, 2.4, 2.5 (4), 2.9, 3.4 (5), 3.6, 3.9, 3.10 (3), 3.13 (3), 3.14, 3.15, 4.2, 4.7, 4.8, 4.9, §6, §7, §8, §9, 10.1, 10.2, §11, §12 (53 hunks; headings as in the base, e.g. "### 3.4 G3 — Siting a free-standing site, the terrain pre-edit, the frame; a site as a destination").
- B touched: "### 1.4 Out of scope, with the reason", "### 2.3 The anchor, the access record and the knowledge layers" (2), "### 2.4 Derived transients (never persisted)" (2), "### 3.13 E4 — The transient layer on a transient arena; promotion (item 132 (a); J-V14.2)" (2), "### 5.2 The site document's view: figure-ground, roles, labels, lights", "### 5.3 The encounter crop: the tactical style, the grid, the exports (item 136)" (3), "## 7 Tests and acceptance bars", "## 9 Decisions (each vetoable)", "### 10.1 Requests to the base", "### 10.2 Cross-volume requests (to the siblings; not base changes)" (2).
- Both touched 2.3, 2.4, 3.13, §7, §9, 10.1, 10.2. Only three conflict regions, all INSERT-BOTH, all end-of-table appends that collide on id:
  - §7 after base 2858: A T-V14-34/35 (J393 road rules); B T-V14-34..37 (numbered key M41, party key M47, scene writer J399, crop patrols J400).
  - §9 after base 3005: A J-V14.57..63 (J393); B J-V14.57..60.
  - 10.1 after base 3042: A **BCR-V14-26** (road access, J393); B **BCR-V14-26**, **BCR-V14-27**.
- Fix: keep both and renumber B (section 6).

## 2. Numbering collisions

### 2a. Journal ids (docs/PROGRESS.md). All 13 collide. [O]
B rows (B file lines 449–461), first 120 characters:
- J390 `Owner (2026-10-17 to 2026-10-22, via the session; Opus-managed, J375 notice). THREE OWNER RULES, verbatim: (F1) "I want to`
- J391 `Owner (2026-10-22, via the session; Opus-managed, J375 notice). (F4) verbatim: "Oh what about ocean currents for sail rout`
- J392 `Owner (2026-10-22 to 2026-10-23, via the session; the session back on Fable 5.1 from F16). THE WORLD-GROWTH RULES, verbati`
- J393 `Session (2026-10-23, Fable managing; under the owner's delegation). RULINGS ON THE SCIENCE-AND-HOST REVIEW of amendments r`
- J394 `Session (2026-10-23, Fable managing; under the owner's delegation). RULING ON THE MAP-ARCHITECTURE REVIEW (docs/volumes/cr`
- J395 `Session (2026-10-23, Fable managing; under the owner's "integrate these designs cohesively and coherently", F16). THE WORL`
- J396 `Owner (2026-10-23, via the session): "I leave all judgement to you" — in answer to J395's four open items. RULED by the `
- J397 `Owner (2026-10-24, via the session; verbatim): "So do the prompts and integrate them that can be done on maps and give me `
- J398 `Session (2026-10-24, Fable managing; under the owner's J397 "So do the prompts and integrate them that can be done on maps`
- J399 `Owner (2026-10-24, via the session; verbatim, typos kept): "Campaign is just a term we use for the region of the map. So i`
- J400 `Owner (2026-10-24, via the session; verbatim): "Do it" — in answer to the session's recommendation on the host's answer `
- J401 `Session (2026-10-24, Opus managing under the J375 addendum; under the owner's J399 clarifications and J400 "Do it"). THE C`
- J402 `Owner (2026-10-24, via the session): the host's answer to the map program's reply, uploaded with no words of the owner's (`

A rows with the same ids (galileo; identical on main):
- J390 `Owner (2026-10-17 ~23:45Z, via a new Fable 5.1 session — session_016MFrG9RpdK1W3eLYLyMzC2 on branch claude/great-galileo`
- J391 `Owner (2026-10-18 ~00:05Z, in the Fable session session_016MFrG9RpdK1W3eLYLyMzC2; answering J390's six items in order). (1`
- J392 `Session (2026-10-18 ~09:55Z, Fable-managed under J390 and J394). THE FABLE RETROVALIDATION OF EVERYTHING WRITTEN SINCE J37`
- J393 `Owner (2026-10-18 ~05:05Z, in the Fable session session_016MFrG9RpdK1W3eLYLyMzC2). THE OWNER'S WORD ON SITES, ROADS AND AU`
- J394 `Owner (2026-10-18 ~09:05Z, in the Fable session session_016MFrG9RpdK1W3eLYLyMzC2). STAFFING, with a quarter of the Fable a`
- J395 `Session (2026-10-18 ~10:05Z, Fable-managed under J390/J394). THE M0 COVERAGE VERIFICATION LANDED — the owner's question `
- J396 `Owner (2026-10-18 ~10:00Z, in the Fable session). THE PATROLS DECISION — the question put in the host document's comment`
- J397 `Session (2026-10-18 ~10:55Z, Fable-managed under J390/J394). THE SITES-ROADS DRAFT LANDED (J393's design): workflow sites-`
- J398 `Owner (2026-10-18 ~16:00Z, in the Fable session). Q5 ANSWERED — "Yes": "the catalogue" in the owner's word of J393 is th`
- J399 `Session (2026-10-18 ~16:40Z, Fable-managed under J390/J394). FILES t, u AND v APPLIED AND CONFIRMED — workflow apply-t-u`
- J400 `Owner (2026-10-18 ~16:45Z, in the Fable session): "Continue" — read by the session as the word to RESUME THE M0 HARDENIN`
- J401 `Owner (2026-10-18 ~20:10Z; the session switched to Opus 5.5 by the owner's /model): "Find a good stopping point for everyt`
- J402 `Owner (2026-10-18 ~20:22Z, a new Fable 5.1 session on account A — session_01Pamfi5DVq6FXQYDqJ6f6xV, from main ab2e3348, `

[O] A's highest row: J489 on galileo, J488 on main. A's rows are not in id order (J392 follows J394; J440 is last on main).
[O] `| J46 ` appears twice as a row start on galileo. That predates this merge and is out of scope, but noted.
[O] How many times B's own text cites J390–J402: about 2,990 in B's new files (top: AMENDMENTS-24z 378, -24ab 354, -24w 349, -24v 219,
-23u 144, -24x 125, V15-atlas 124, -23r 109) and, in B's added lines, V13 631, HANDOFF 39, PROGRESS 33, INDEX 20, V09 50, V14 10,
brief 7, ARCHITECTURE 6. A's text cites its own J390–J402 too (V13 58 and V14 45 in A's added lines), so a global replace is unsafe.

### 2b. Amendment items and file letters [O]
| B file | items | | A file | items |
|---|---|---|---|---|
| docs/AMENDMENTS-2026-10-23r.md | 926–1032 (107) | | docs/AMENDMENTS-2026-10-18r.md | 926 (1) |
| docs/AMENDMENTS-2026-10-23s.md | 1033–1051 (19) | | docs/AMENDMENTS-2026-10-18s.md | 927–939 (13) |
| docs/AMENDMENTS-2026-10-23t.md | 1052–1054 (4) | | docs/AMENDMENTS-2026-10-18t.md | 940–948 (9) |
| docs/AMENDMENTS-2026-10-23u.md | 1055–1082 (28) | | docs/AMENDMENTS-2026-10-18u.md | 949–953 (5) |
| docs/AMENDMENTS-2026-10-24v.md | 1083–1119 (37) | | docs/AMENDMENTS-2026-10-18v.md | 954 (1) |
| docs/AMENDMENTS-2026-10-24w.md | 1141–1199 (59) | | docs/AMENDMENTS-2026-10-18w.md | 955–975 (21) |
| docs/AMENDMENTS-2026-10-24x.md | 1201–1240 (40) | | docs/AMENDMENTS-2026-10-18x.md | 976–982 (7) |
| docs/AMENDMENTS-2026-10-24y.md | 1241–1255 (15) | | (no A file after x; galileo adds none) | |
| docs/AMENDMENTS-2026-10-24z.md | 1256–1297 (42) | | | |
| docs/AMENDMENTS-2026-10-24aa.md | 1301–1305 (5) | | | |
| docs/AMENDMENTS-2026-10-24ab.md | 1306–1358 (53) | | | |
| docs/AMENDMENTS-2026-10-24ac.md | 1359–1384 (26) | | | |

- **Overlapping items: 926–982 (57 numbers).** Every one of them is in B's file r, against all of A's files r–x. [O]
- B's gaps: 1120–1140 (w's header says "file v ended at 1140"), 1200 ("w's block ends at 1200"), 1298–1300 ("z's block ended at 1300").
- **File-letter collision:** r, s, t, u, v, w and x exist on both sides. No path collides, because the dates differ (A 2026-10-18, B 2026-10-23/24). But every citation of the form "file r item N" becomes ambiguous. B's text has about 1,105 "file(s) r–x" mentions and about 311 "file(s) y|z|aa|ab|ac" mentions. [O, counted by grep]
- A also MODIFIED files l, m, n, o, p and q since the fork. B did not touch them. [O]

### 2c. Other id families. Highest DEFINED id (table-row start) per side; base in brackets. [O]
| family (file) | base | A new | B new | overlap |
|---|---|---|---|---|
| J-V13.n (V13 §9) | 106 | 107–133 (27) | 107–215 (96 rows; max mentioned 216) | **107–133** |
| T-V13-n (V13 §7) | 56 | 57–61 (5) | 57–139 (73; max mentioned 140) | **57–61** |
| H rows (V13 §8.5) | 30 | H31–H32 | H31–H48 (+ V15 defines H35's row) | **H31, H32** |
| WORLD-n budget rows (V13 §6) | 15 | 16–18 | 16–25 | **16–18** |
| BCR-V13-n | 40 | none defined (A's "BCR-V13-41" only in "No base change (no BCR-V13-41)"; A's HANDOFF quotes B's -54) | 41–59 (max mentioned 60) | none |
| J-V14.n | 56 | 57–63 | 57–60 | **57–60** |
| T-V14-n | 33 | 34–35 | 34–37 | **34–35** |
| BCR-V14-n | 25 | 26 | 26–27 | **26** |
| V14 §11 Q | Q1–Q4 | Q5 | none | none |
| V13 §11 Q | Q1–Q4 | Q5 added, Q4 kept as answered | Q4 removed | structural (§1.7) |
| M-W / SP-W | M-W5 / SP-W8 | none | M-W6–M-W9 / SP-W9–SP-W11 | none |
| BCR-V15, J-V15, T-V15, C15-, ATLAS-*, B-ATLAS-* | none | none | BCR-V15-1–19 (20 mentioned), J-V15.1–52 (53 mentioned), T-V15-1–38 (39 mentioned), C15-1–28, ATLAS-1..18/A/B/C/VIEW/SHARE/CARVE, B-ATLAS-1,2,3,16/VIEW/SHARE/CARVE | none (B only) |
| C13-, C14- | 60, 58 | none | none | none |

Two of the colliding rows mean different things on each side:
- H31: A "after M-W3, after H19 (optional; J393) | its map surfaces draw the map feed's approach roads"; B "with M-W6 | **"based off of my settlements", the best placement…**".
- J-V13.107: A "**(J393.)** chose a world site to lie **along** a route…"; B "chose **the formation op — tectonics run once…** (F1; file r item 926…".

Trap: A's H32 row says "the row's number, never the kernel's `H32` hash". The token `H32` also names a kernel hash in the base, so an H-row renumber must not use a blind token replace.

## 3. New files

**On B, absent on A (60 files; no file B added exists on A):** [O]
- docs/ (12): AMENDMENTS-2026-10-23r, -23s, -23t, -23u, -24v, -24w, -24x, -24y, -24z, -24aa, -24ab, -24ac (.md)
- docs/design/ (1): spine-world-growth-2026-10-23.md
- docs/validation/coherence/ (14): campaigns-aa.md, campaigns-z.md, experience-v.md, experience-w.md, experience-x.md, experience-y.md, host-answer-ab.md, host-answer-ac.md, world-growth-r-critic.md, world-growth-r.md, world-growth-s-check.md, world-growth-s.md, world-growth-t.md, world-growth-u.md
- docs/volumes/ (1): V15-atlas.md
- docs/volumes/critique/ (5): V15.md, experience-vwx.md, host-answer-z-aa-ab.md, seam-world-growth-r0.md, world-growth-r-science-host.md
- research/experience/ (5): 01-birth-and-first-month.md, 02-politics-and-war.md, 03-trade-faith-plague-people.md, 04-physical-world-and-the-dms-hand.md, 05-players-audiences-atlas-style.md
- research/sf/ (6): host-prompts-2026-10-24.md, host-reply-2026-10-24.md, host-reply-2026-10-24b.md, host-rulings-mirror.md, reply-to-host-2026-10-24.md, reply-to-host-2026-10-24b.md
- research/world/ (2): formation-ecology-science.md, formation-ecology-state.md
- workflows/ (1): 44-formation-ecology.js. **Prefix collision:** A has workflows/44-hidden-ways-design.js. [O]

**On A, absent on B, under docs/volumes, docs/design, research/, workflows/:** [O]
- workflows/ (7): 44-hidden-ways-design.js, 45-a09-s9-spec.js, 46-hidden-ways-correction.js, 47-hardening-retriage.js, 48-hidden-ways-third-pass.js, 49-hidden-ways-apply.js, 50-complete-edition-check.js
- No new files under docs/volumes, docs/design or research/. A's research changes are edits only.

**Files B modified with no conflict:** docs/design/proposal-world-native.md (+32 −4) and docs/volumes/V09-application.md (+250 −5), both changed by B only; docs/lane-events.log (A +1609, B +27) auto-merges. [O]

## 4. HANDOFF.md and PROGRESS.md: is B prepend-only?

**docs/HANDOFF.md: NOT strictly prepend-only.** [O] B's hunks against the base:
1. `@@ -2,0 +3,113`: a prepend of 113 lines, **B lines 3–115**, with six new "## RESUME HERE" blocks. The first is "## RESUME HERE — THE HOST'S SECOND ANSWER CARRIED (2026-10-24; Opus managing, J402) — LANDED" and the last is "## RESUME HERE — THE WORLD-GROWTH INTEGRATION PASS (2026-10-23; Fable managing, J392)". The base's "## RESUME HERE — THE HOST SIMULATOR REVIEW AND THE SYSTEM READS (2026-10-17; …)" follows at B line 116.
2. `@@ -17,0 +131,3`: **B lines 131–133**, inside the old block's run table. This adds the row "| wf_c7eb47b5-274 formation and ecology (amendments r; …) | workflows/44-formation-ecology.js | STOPPED by the owner on 2026-10-22 …", a blank line, and "**THE PASS IS RECORDED AS J395.** …".
3. `@@ -19 +135`: **B line 135 REPLACES base line 19.** The base line "**WAITING ON THE OWNER (not delegable by the base's own text, §11.4):** V13 §11 Q4 — …" becomes "**RULED J396 (2026-10-23; the owner, delegating the four open items: "I leave all judgement to you"):** V13 §11 Q4 — …".

A: a prepend of 343 lines on main (`@@ -2,0 +3,343`); galileo's top block is "## RUNNING NOW — 2026-10-25 18:13Z …". A also edits base lines 20–21, filling the script column of the "wf_a7c82671-f52" and "wf_868a6476-905" rows.
- Conflict C1 (both prepend at line 2): keep both. [I] Put A's RUNNING NOW block first and B's six blocks after it, marked as the merged thread's history.
- Conflict C2 (B's line 19 next to A's lines 20–21): take A's two rows and B's line 19. [I] Replace B's "RULED J396" with wording that cites the owner's own answer (A's J391 (1)) and keeps B's J396 under its new number as concurring.

**docs/PROGRESS.md: B is insert-only (+13 −0).** [O]
- `@@ -448,0 +449,13`: **B lines 449–461** are new rows J390–J402, inserted right after the J389 row (base line 448), before the blank line and `<!-- AUTO:BEGIN (tools/progress.py rewrites this block) -->`.
- A: `@@ -449 +449,98` (galileo +99) replaces that same blank line with its rows J390…J488/J489.
- The conflict is only about position. Keep both, with B's rows appended after A's last row and renumbered (section 6). [I]

## 5. plat/ (the build) [O]
`git diff --stat 6b7bd736 origin/claude/focused-cray-qhz855 -- plat` prints nothing: **B changed nothing under plat/.** B also changed nothing under tools/, session-state/ or .claude/.

## 6. Recommended merge procedure (for the Fable-managed pass) [I unless marked]

Precedence: A (main, then galileo) is the trunk and is never renumbered. All of B's colliding ids move. Each renumbered row or
item heading carries "renumbered from X (collision)", as in the precedent [O] PROGRESS line 1042, "file f renumbered from 200".

**Step 0. Freeze the mapping table before editing any text.** Take the next free ids at merge time from galileo's tip, not today's figures.
- J rows: B J390–J402 → J(max_A+1)… (today J490–J502).
- Items: shift B's whole block by +57 (926→983 … 1384→1441). This keeps B's order and its reserved gaps (1120–1140, 1200, 1298–1300 become 1177–1197, 1257, 1355–1357). Patching only 926–982 would leave B's item order inverted.
- File letters: B r, s, t, u, v, w, x, y, z, aa, ab, ac → y, z, aa, ab, ac, ad, ae, af, ag, ah, ai, aj, keeping each date. For example docs/AMENDMENTS-2026-10-23r.md → docs/AMENDMENTS-2026-10-23y.md.
- Other families:
  - J-V13 107–215 → 134–242 (+27)
  - T-V13 57–140 → 62–145 (+5)
  - H31–H48 → H33–H50 (+2)
  - WORLD-16–25 → WORLD-19–28 (+3)
  - J-V14.57–61 → 64–68 (+7)
  - T-V14-34–38 → 36–40 (+2)
  - BCR-V14-26–28 → 27–29 (+1)
  - BCR-V13 41–60, M-W6–9, SP-W9–11 and every V15 family need no change [O: no A ids there].
- workflows/44-formation-ecology.js → workflows/51-formation-ecology.js or later, with its citations updated.

**Step 1. Apply the mapping as ONE simultaneous substitution** (a single regex pass with a dict, never chained seds, because B's new letters y–ac and its id ranges overlap its own old ones).
- Scope it to B's 60 new files and to B's hunks only. A's text cites A's J390–J402, items 926–982 and files r–x (O: V13 58 and V14 45 such J citations in A's added lines), and those must not change.
- Practical way: run the substitution on B's side of a three-way merge, i.e. on a scratch copy of B's tree, before merging. Then the merge sees B's text already renumbered.
- Exclude the kernel's `H32` hash and the base's `H128`. Match H-row ids only where they cite §8.5 rows.
- Verify: no B-side mention of J390–J402 survives in its old meaning; item numbers are unique across all docs/AMENDMENTS-*; ids are unique per family per volume.

**Step 2. Mechanical keep-both merges** (after Step 1):
- docs/PROGRESS.md: append B's renumbered rows after A's last row. Leave the AUTO block to tools/progress.py.
- docs/HANDOFF.md: A's top block first, then B's six RESUME blocks; resolve C2 as in section 4.
- V14 C1–C3 and V13 C1, C21, C40, C48, C49: append B's renumbered rows after A's.
- INDEX C7 and SUMMARY C2: keep both.
- README: B's two new rows plus A's row 16, with B's file names and items renamed.
- lane-events.log, V09 and proposal-world-native already merge cleanly [O].
- The 12 "near only" V13 sections need no hand merge but do need the Step-1 renumbering re-checked.

**Step 3. Hand merges of design text (true semantic conflicts):**
1. **V13 §11 Q4 / door 1.** A has the owner's own "yes" of 2026-10-18 (A J391 (1), A file r item 926). B has the delegation ruling of 2026-10-23 (B J396 (1), B file u item 1070, BCR-V13-47). Carry A's provenance and cite B's ruling as concurring. Places:
   - ARCHITECTURE "### 11.4 Host inputs (DEF-11)"
   - V13 "## 11 Owner questions…" (C50, C51; A keeps Q4 as answered and adds Q5, B deletes Q4. Keep Q1–Q5 per A, and record B's Q4 note)
   - INDEX §6 C5, C6
   - SUMMARY preamble C1, "Decisions that are yours" C6, "What the two new volumes ask of you" C7
   - OWNER-BRIEF §6 C1
   - HANDOFF C2
2. **Costs and counts.** V13 person-weeks become 37–45 + 2 (A, the hidden ways) + 14–21 (B, file r) = 53–68 [I arithmetic]. Recompute the programme total in SUMMARY "How big the whole program is" (C3, C4) and INDEX §8 (C8). Add V15's 7–10 pw. Recompute the decision counts (SUMMARY C1, C7; INDEX C5) and the T-V13-21b consumer count (V13 C39; twenty-three) [I].
3. **V13 same-row unions** (each side added different clauses to one line):
   - "### 2.2 New records" C5–C8
   - "### 3.8 W7 Routes …" C10, C11 (A's W7 (12) approaches and junction ends vs B's sail and current routing)
   - "### 3.11 P1–P5 Placement" C12–C18 (A's site form and bend vs B's F7 best placement)
   - "### 3.14", "### 3.17 Determinism", "### 4.1 The edit events …" C24–C27 (e.g. both extend `requestCharter`)
   - "### 4.3", "### 5.1", "### 5.4 Exports" C31, C32, "### 5.8", "### 5.9", "## 6 Performance budgets" C37, C38
   - "### 7.2" to "### 7.4", "### 8.2 Milestones" C43, C44, "### 8.5 The host's parallel track" C45–C47
   - INDEX §1 (C2, C3, with the BCR tally re-stated over the merged range), §2 (C4)
   - OWNER-BRIEF §9 (C2)
4. **Overlapping subjects to check by reading** [I]:
   - Patrols: A J396 "THE PATROLS DECISION" vs B J400 (18) and B's J-V14.57–60 / T-V14-37 crop patrols.
   - Sites and roads: A J393 / J-V14.57–63 / BCR-V14-26 vs B's V14 §5.3 scene-writer and numbered-key rows.
   - H-row dependencies: B's H31–H48 "with M-W6" vs A's H31–H32.
   - A's file w hidden ways (trods) vs B's world-growth and politics passes in §3.8 and §5.9.

**Step 4. Tools and generated files.**
- Run `python3 tools/bundle_architecture.py` to regenerate docs/ARCHITECTURE-FULL.md. Never merge it by hand: take either side, then regenerate. [O] It globs `docs/volumes/V[0-9][0-9]-*.md`, so V15 is picked up. Its docstring says "V01 … V12" and A's complete-edition doc says "fourteen volumes"; that wording is stale.
- tools/bundle_complete.py (A only) needs updating:
  - [O] It hardcodes `AMENDMENT_LETTERS = "abcdefghijklmnopqrstuvwx"`.
  - [O] Its sort key is `re.search(r"AMENDMENTS-(\d{4}-\d{2}-\d{2})([a-z]?)\.md$", f)` followed by `m.group(1)`.
  - [I] Two-letter files (aa, ab, …) do not match, so `m` is None and the script would raise AttributeError.
  - Widen it to `([a-z]*)` with (length, letter) ordering and extend the letters.
  - Then run `tools/bundle_complete.py --check` (workflows/50-complete-edition-check.js uses it [I from its name]).
- Run tools/progress.py for the PROGRESS AUTO block.

**Step 5. Close.**
- Check: no conflict markers; id uniqueness per family; every "file X item N" resolves; both bundles regenerate with no diff on `--check`.
- Run a critic seat over the merged volumes, as A's HANDOFF line 9 plans.
- Add one PROGRESS row (the next id) recording the reconciliation and the mapping table.
- B's open items are carried forward [O, quoted in A's HANDOFF]: the pending BCR ledger "BCR-V13-54, -55, BCR-V15-16–18, BCR-V14-26" (BCR-V14-26 becomes -27 after the renumber), and "the whole-design Fable retrovalidation of its Opus-managed work".
