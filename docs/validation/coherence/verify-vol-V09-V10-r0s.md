# Verify — design volumes V09 (the application) and V10 (the AI clerk), coherence pass round 0

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/verify-vol-V09-V10-r0; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V09-V10-r0`; started 2026-10-03 02:15 in the cloud continuation; no earlier output
on disk)
- P1 inputs gathered (canon routing for V09/V10, edges, cross-part notes from every rewrite report): done
- P2 mechanical checks (ids, references, terms, deferral, mapping table, per-item tokens): done
- P3 V09 archive → new review, section by section: done
- P4 V10 archive → new review, section by section: done
- P5 cross-unit agreement, cohesion, wiring, edges: done
- P6 report, results JSON, LANDED: done

Scratch: `/tmp/claude-0/-home-user-maps-architecture/ce371545-83c4-5807-9f2a-da73abd8485d/scratchpad/coherence/`
(`routing.txt`, `edges-V09V10.txt`, `xnotes.txt`, `tokmiss-*.txt`, `rowdiff*-*.txt`, `align-*.json`, `prose-low-*.txt`,
`jdiff-*.txt`, `jv9-reasons.txt`, and the scripts that made them).

## 1. Outcome

**19 issues: 3 blockers, 7 majors, 9 minors.** By owner: V09 10 (1 blocker, 3 majors, 6 minors), V10 4 (1 blocker,
1 major, 2 minors), model 2 majors, determinism 1 blocker, scope 1 major, V03 1 minor. The live files are the assembled
ones: `docs/volumes/V09-application.md` and `docs/volumes/V10-clerk.md` are `cmp`-identical to
`docs/validation/coherence/new/volumes/`.

The two volumes keep their content far better than their size numbers suggest, with one large exception:

* **V10 is faithful.** Every one of its 805 inventory ids is mapped and traced (token, keyed-row and sentence diffs); its
  decisions keep their reasons (every J-V10 row retains ≥ 0.6 of its content words, the two lowest being E-24 marks);
  items 111 and 113 are at build depth (V10 §3.9b, the encoders, the lexicon, six cases, T-V10-45/46); the J121/J122
  readings are applied; the edges (V10 §3.23) cover all 65 routed edges and the 8 owned combinations. Its defects are one
  cut provenance column (a blocker), one sentence written twice for one key, a circular calibration note and a restated
  price line.
* **V09's body is faithful; its §9 is not.** §9 shrank 9 012 → 4 395 words (−51 %). Of the 125 archived non-withdrawn
  decision rows, 97 lost more than 40 % of their reasons ("because …") or of their rejected alternatives ("over …") —
  not ids or narration but the reasoned content principle (9)'s guard protects (blocker V09-DEC-1).
* **Hand-offs V10 made to V09 after V09 had landed are open at V09** (the replaced empty-state town, the `info.water.*`
  and `info.history.*` families), and V09's catalogue also lacks V07's `info.village.*` and V03's `info.plan.*` families.
* **Four base texts disagree with what V09 or V10 builds on**: §2.7's `HistoryHint` declares no `peak` (model), §2.9's
  `workingLayer` text was not corrected per V09-XCONF-1 (model), §7.1's flat-ground rule lost "clipped to the drawn run's
  extent" when it moved from V09 (determinism), and §16 and INDEX still carry V10's prices from before items 111 and 113
  (scope).

**Sizes** (as the canon counts): V09 111 610 → 90 664 (−18.8 %), V10 84 658 → 72 685 (−14.1 %). Both are below the
25–40 % band; each rewrite names the irreducible content and the new design (≈ 7 600 and ≈ 6 300 words) that hold it
(their SIZE-1), which is not a defect. Neither unit shrank by more than half; V09 §9 alone did, and it was audited row
by row (V09-DEC-1).

## 2. Method (nothing sampled)

* **Mapping.** All 1 916 inventory ids (V09 1 111, V10 805) are in the two rewrite reports' mapping tables, and every
  target heading exists. Each id's backticked identifiers, quoted words and numbers were looked up in the new text (144
  items flagged; each read: retired keys, E-24 marks, BCR quotations now applied by file f, narration, or the issues
  below).
* **Keyed row diffs.** Every table row (V09 1 015, V10 713) was matched by its first cell and word-diffed; rows whose
  removed words were more than ids and citation forms (V09 211, V10 90) were read in full; archived rows with no same-key
  row (re-keyed by the citation clean-up) were matched by content and the low ones read.
* **Sentence alignment.** Every archived prose sentence of §0–§8 (V09 3 198 units, V10 2 514) was aligned to its best
  new sentence; every unit below 0.7 containment (V09 106, V10 42) was read, and numbers dropped from matched units were
  listed (none beyond the restatement removals and the re-pricing).
* **Decisions.** Every J-V9 and J-V10 row compared archive → new; the "because" and "over" clauses measured separately
  (`jv9-reasons.txt`).
* **New design read whole:** V09 §3.16, §4.21, §7.6, the colour-vision rows, T-V9-71 – T-V9-78; V10 §3.9b, §3.23, §8,
  T-V10-45 – T-V10-49, §11 – §13.
* **Ids:** J-V9.1 – .134, T-V9-1 – 78, J-V10.1 – .119, T-V10-1 – 49 each defined once, none missing, every citation in
  the set resolves. **References:** every `V09 §` and `V10 §` in the set resolves (bold paragraph leads counted as
  headings); ranges `Vnn §a–§b` resolve at both ends; bare list continuations in V09 (V09-REF-1). **Terms:** the canon's
  35 retired patterns — 0 live hits (the one `error.clerkOffline` hit is T-V9-15's check that no such row exists).
  **Deferral:** none.
* **Canon routes checked at their homes:** the 28 + 18 conflicts, the 7 + 7 elegance rulings with their equivalence
  lists (E-04's against base §7.1's binding table row by row), the id rulings, the 8 + 10 wiring gaps, the 55 + 39 f
  items cited, g items 111–113, the 3 + 5 owner questions, the 26 + 21 hand-offs in and every hand-off out, and every
  cross-part note addressed to V09 or V10 in the 17 other rewrite reports.

## 3. Issues

| id | sev | owner | kind | claim | required change |
|---|---|---|---|---|---|
| V09-DEC-1 | blocker | V09 | NUANCE-LOST | V09 §9's decision rows were cut to a short "X over Y because Z" that drops archived reasons, rejected alternatives and stated cases. The because/over content kept is under 60 % in J-V9.3, .4, .5, .8 – .12, .14 – .16, .18 – .20, .24, .26 – .28, .30, .31, .33 – .35, .38 – .41, .43, .46 – .50, .55 – .61, .63 – .66, .68 – .72, .74, .75, .77 – .94, .96 – .116, .118 – .122, .124, .125 (97 rows). Examples: J-V9.3 loses "the survey's strongest pattern is the result appearing with the gesture"; J-V9.12 loses "over drawing every glyph or taking every icon from a library" and "generic glyphs gain from familiarity"; J-V9.13 "a game master's everyday view is `secret`"; J-V9.15 the M2a session's content and "the four tasks need those events"; J-V9.38 the name `showUnexcavated`, the rejected `underSealed` and `LayerSpec` field and "one name must serve both volumes"; J-V9.39 "none of the four catacomb bends or two crypt bends refuses"; J-V9.92 "everything editable keeps a past state reachable" and "`.plat` is the user's format in host mode"; J-V9.96 the three outcomes' reasons; J-V9.121 the five additions (`app`, `event`, `each`, `when`, `command`), `ConflictAction.msg` keyed as its button, **Move it** as a `show`, locale files text-only; J-V9.125 the two namespaces' rung sets and why `commonness` differs. | Rewrite every listed row from its archived text (`docs/archive/volumes-pre-coherence-2026-09-28/V09-application.md` §9), removing only critique, seam and round ids and narration and applying E-24's one mark; keep every "over …" alternative, every "because …" reason and every stated case. A case the body states may be cited instead of repeated (e.g. J-V9.6's "events made elsewhere show no time", V09 §3.9; J-V9.17's salience rule, V09 §3.5). |
| V10-PROV-1 | blocker | V10 | NUANCE-LOST | V10 §2.10's default rows lost their provenance notes: `ops.model.fallbacks` ("Migrating … new API features"), `ops.model.clientFallbacks` ("refusal fallbacks, pattern 2"), `ops.model.thinking` ("thinking and effort"), `ops.routes.converse` ("effort guidance"; "the model's hard cap; streaming default about 64 000"), `ops.cache` ("choosing the TTL"), `ops.prices` (the source table). `ops.prices` also lost its exception "Opus 5.5's read rate as the source states it", so "reads 0.1×" now contradicts its own `claude-opus-5-5` row (cache read 0.20 on input 4, 0.05×). | Restore each row's provenance as archived, naming the provider's documentation per row (worded for the deployment's provider, J121), and write the price note as "reads 0.1× on `claude-opus-5` and `claude-opus-4-8`; `claude-opus-5-5`'s read rate is its row's (0.20)". |
| DET-FLAT-1 | blocker | determinism | NUANCE-LOST | When the flat-ground rule moved from V09 §4.20.1 (3) (a) into §7.1 (V09-RESTATE-6), its clause "clipped to the drawn run's extent" (archive V09 l.2584) was dropped: §7.1 (l.9542–9546) moves the chain "onto the nearest slope break, terrace edge or retaining wall …" with no extent, and V09 now cites §7.1. | §7.1's flat-ground sentence: "… moves onto the nearest slope break, terrace edge or retaining wall stepping at least `terrace.stepMinCm` within `terrace.retainingReachM` of that share of the stations, clipped to the drawn run's extent, else …". |
| V09-CAT-1 | major | V09 | WIRING | V09 §4.9 is the one catalogue, yet four families other units emit and word through it have no row or family entry: `info.water.*` and `info.history.*` (V10 §3.9b; V10 §13's hand-off), `info.village.*` (V07 §4.5, W76; V07's cross-part note), `info.plan.<cause>` and `info.plan.noRoom` (V03 §4.6); and base §7.1's *Empty edits* ("its dry run reports it empty with the reason (V09 §4.9)") has no row (determinism's cross-part note). T-V9-15's code list names none of them, so those keys can reach a user raw. | Add the four families to V09 §4.9's families table with their text homes (V10 §3.9b; V07 §4.5; V03 §4.6); add one empty-edit row (e.g. `info.edit.empty` "Nothing to apply: {reason}.", no button) for §7.1's empty forms; extend T-V9-15's list to V07's and V03's keys and the empty-edit reason. |
| V09-EMPTY-1 | major | V09 | CONFLICT | V09 §4.11 (l.2216) says that when a creation proposal is accepted over the untouched empty-state town "the old one stays in Recent towns"; V10 §4.2 (3), V10 §3.23 and J-V10.116 rule (EI-V10-EDGE-1) that it is replaced as V09 §3.2 (3) replaces it on Surprise me — nothing written to the local store, the blueprint kept for the session's undo. V09 contradicts its own §3.2 (3) and V10 (V10 §13's open hand-off). | V09 §4.11: "Accept follows V10 §4.2 (3): over the untouched empty-state town the view moves to the new town and the old one is replaced as V09 §3.2 (3) replaces it on Surprise me — nothing is written to the local store, the handle keeping its blueprint for the session's undo (J-V10.116); otherwise …"; add the case to T-V9-40 (or cite T-V10-49). |
| V09-QUOTA-1 | major | V09 | WIRING | V08 §3.7's quota ladder ends: a commit answered `doc.rejected { reason: 'quota' }` keeps its events "in its draft mirror (V09 §3.8 (6)) and sends [them] again with its next commit" — "nothing is lost". V09 §3.8 (6) states only that the draft mirror stays local, and `DraftMirror` holds a draft, not committed events; no V09 text keeps or re-sends a rejected group, so the defined outcome rests on a mechanism V09 does not state. | V09 §3.8 (6) states the rule: a `quota` rejection keeps the rejected group's events in the draft mirror (`DraftMirror.rejected?: EditEvent[]`, V09 §2.11), shown pending under `host.status.quota`, re-sent ahead of the next commit and dropped only when one lands or the user discards it; its V09 §2.12 lifecycle row; a T-V9-28 clause. |
| V10-LOST-1 | major | V10 | CONFLICT | One key, two sentences: `info.under.lost` is "Once known; no open way leads here since year {year}." in V09 §4.9 (whose families table makes `info.under.lost`'s words V09's), but V10 §3.9a words it "once known; its last way in closed {n} years ago when {event}" (and adds "found again" on reopening, a line with no key). | V10 §3.9a's lost-void row cites V09 §4.9's `info.under.lost` row instead of writing its own sentence; the reopening line becomes a key of V09's catalogue or is dropped. If the `{event}` slot is wanted, V09's row takes it (one text). |
| MODEL-HH-1 | major | model | WIRING | §2.7's `HistoryHint` declares only `ageYears` and `scars` (l.2264), yet §4.11 reads `HistoryHint.peak` (l.7649), V08 §1.1 (9) carries the peak's evidence into it, and V09 §4.21.2 and V10 §4.1 write `adjust('blueprint.history', { ageYears, scars, peak: { rung, population, symbolic, evidence } })` — a field written and read but never declared. | §2.7's `HistoryHint` gains `peak?: { rung: Rung; population: number; symbolic: boolean; evidence: string[] }` (the shape of `HistoryRecord.peak`), its comment naming the writers (V08's port, the blueprint's history option) and the reader (§4.11). |
| MODEL-WL-1 | major | model | CONFLICT | V09-XCONF-1 ruled that item 277's `workingLayer` text reads "ground, a sky island's `PlatKey`, or the underground (its band the view key `depthBand`)", matching V09 §2.4's type and V04's `depthBand`; §2.9 (l.3048) still reads "or an underground depth band", and V09 §10 states that "the base's §2.9 carries that reading". | §2.9's view-state list: "`workingLayer` (per viewer: the layer the tools act on — ground, a sky island's `PlatKey`, or the underground, its band the view key `depthBand`, never copied here; V09 §2.4)". |
| SCOPE-PLAN-1 | major | scope | COHESION | §16 and INDEX carry V10's prices from before items 111 and 113: §16's M3a row prices V10's C1 and transcript at 3.25–4.75 pw and its M3c row at 10.25–13.75 pw; INDEX §2's V10 row reads 13.5–18.5 (14–19). V10 §8 now reads C1 3.25–4.75 + transcript 0.25 (3.5–5 inside M3a), M3c 10.75–14.5, together 14.25–19.5 (14.75–20 with `plat clerk`), and V10 §13 hands the change to §16. | §16's M3a row: V10's part 3.5–5 pw; §16's M3c row: 10.75–14.5 pw; the program's totals recomputed once (item 568); INDEX §2's V10 row: 14.25–19.5 (14.75–20 with the command-line clerk). |
| V09-REF-1 | minor | V09 | BROKEN-REFERENCE | Bare list continuations survive where the convention reads a bare § as the base: l.143 "V09 §4.11, §3.12, §5.10, §5.12"; l.4075 "V12 §2.14 and §3.14"; l.4102 "V09 §2.3, §2.9"; l.4110 "V02 §3.14.5, §4.5, §4.6"; l.4113 "V10 §2.6, §3.5, §3.16, §4.1, §4.3". And §6.1's tiers row cites "V02 §6" where the archive and V02 name V02 §6.5. | Prefix each continuation with its volume (V09 §3.12, V09 §5.10, V09 §5.12; V12 §3.14; V09 §2.9; V02 §4.5, V02 §4.6; V10 §3.5, V10 §3.16, V10 §4.1, V10 §4.3) and restore "V02 §6.5" in V09 §6.1. |
| V09-BIND-1 | minor | V09 | WIRING | V09 §4.3's T9 row lists the pairs of §7.1's T9 row but omits four `convert` kinds §7.1 binds to T9 — `burn`, `downgradeWay`, `upgradeWay`, `repairRaised` — though its rule (and T-V9-12) is that every pair of §7.1's table has a mode here. | Add the four kinds to V09 §4.3's T9 row with their screen ("Change over time" on a building, a way, a raised way). |
| V09-LAYER-1 | minor | V09 | TERM | V09 §8.3 risk 4 reads "§13.4's fallback: L3–L4 pointer-only on touch"; under ID-LAYER a bare L3–L4 means refinement levels (plots, footprints), not the toolkit's layers. | "§13.4's fallback: the L3 FABRIC and L4 FINISH layers pointer-only on touch." |
| V09-MOAT-1 | minor | V09 | NEW-PROBLEM | V09 §3.16 (g)'s "a moat × the tools" row says "T2's Lake over it refuses with `refuse.water`", but `refuse.water` is the lock refusal (new water reaching a kept record, §7.3 (b) 3); an unlocked moat is no lock, so the row states a refusal item 101 R2 does not allow. | State the outcome by §7.1's outcome table: the lake joins the water by S1's water rules (its level bending by `bend.lake.level`); `refuse.water` only where the new water would reach a locked record. |
| V09-HIST-1 | minor | V09 | TERM | V09 §4.21.2 names the default age "V11's `history.defaultAgeYears`"; V11 §1b and §3.25 name the cell `history.settings`' `defaultAgeYears`, as V10 §4.1 writes it. | "V11's `history.settings` `defaultAgeYears` for the present rung". |
| V09-EPOCH-1 | minor | V09 | CONFLICT | One fact, two sentences on one card: for a thing built in a replay epoch V09 §2.7's `decidedBy` line reads "Built when the town was {a tierWord}, in year {year}" (V09 §4.21.3 (2)), while the card's `history` section (V10 §3.9b's `epoch` row, which V09's why card renders) reads "built {n} years ago, when {town} was {a tierWord}". | Make the `decidedBy` line for a replay epoch the `history` section's `epoch` row (one key), or have V10 §3.9b's `epoch` row carry V09's words; one sentence per fact. |
| V10-CAL-1 | minor | V10 | WIRING | V10 §2.10's `content.encoders` note says the terrace radius and the islet's size "calibrate-later against V09's brush defaults", but V09 §4.20.1 (4) takes its terrace radius from this very cell (V09-RESTATE-6, RESTATEMENTS-016): the calibration source is circular, and V12 §3.11 asks a calibrate-later constant to name its confirming test. | Name the measurement that re-sets them (e.g. "calibrate-later by T-V9-51's terrace gesture and V10 §7.3's group A and D cases"), not V09's default. |
| V10-REST-1 | minor | V10 | NEW-PROBLEM | V10 §6.4's heading restates §2.10's `ops.prices` figures ("`claude-opus-5` input US$5, output US$25, cache read US$0.50, cache write US$6.25"), a second home for one row inside the volume (principle (1)). | "### 6.4 Cost (PLAUSIBLE; at the shipped `clerk.ops.prices` row, V10 §2.10)". |
| V03-CRYPT-1 | minor | V03 | CONFLICT | V03 §4.6 writes its own words for the `info.crypt.*` keys (`.none.row` "its row gave it none", `.none.wet` "ledger slabs in the chancel floor", `.rank.principal`, `.join` …) while V09 §4.9 assigns their texts to V10 §3.9a, whose words differ ("no crypt: its row gave it none", "no crypt: ledger slabs in the chancel floor"); V10 also words the wet-ground `always` case ("a raised-choir crypt: the ground is too wet to dig"), for which V03's key list names no key. | V03 §4.6 names the keys and cites V10 §3.9a for their texts (one home), and adds the key for the wet-ground raised-choir row (e.g. `info.crypt.form.raisedWet`). |

## 4. What was checked and holds

* **Conflicts ruled for V09 and V10**, each applied at its home: DIC-06/ID-TOOL; DIC-07/ID-LAYER (bar V09-LAYER-1);
  DXC-04/E-04 (base §7.1's binding table carries every archived V09 §4.3 per-target home; V09 §4.3 keeps the screens and
  gestures; T-V9-12 and T-V10-1 read it); MC-11 (`ClerkSegment`); SCOPE-C07; SCOPE-C15; SCOPE-C16 (`@plat/cli` in §14);
  V01-XCONF-2 (§11.1's VTT rule); V06-AGREE-1; V08-XCONF-6; V09-ICONF-1 – 5; V09-XAGREE-1 (V11 §4.2 states the union:
  `cls:`, `familyWeights` on the ladder, `avoid`, the three meanings); V09-XAGREE-2 and V10-XAGREE-4 (V03 §3.7.4; "floor
  vaults" gone); V09-XAGREE-3 (V02's 27 bend ids with words and buttons, the retired keys' buttons carried to the
  covering ids); V10-XAGREE-1 – 3 (`avoid` unconditional; V01's pulls `sun` and `nuisance`; the size words on V09 §4.5's
  quantile); the J121 and J122 rulings (§0, §1.3, §2.9 *Locales*, §2.10, §3.17, §3.20, §4.11, §7.3 and §11 of both);
  CANON-C02 – C04. V09-XCONF-1 is applied in V09 but not in the base (MODEL-WL-1).
* **Elegance rulings with their equivalence lists** — E-04, E-07, E-16, E-17, E-24 (the marks; the unmarked rows'
  thinning is V09-DEC-1), E-28, E-32, E-33: every listed behaviour found at its stated home.
* **Wiring gaps** — W-IF-01 – 05, W-PKG-01, W-EDIT-01, W-FLD-11, W-FLD-12, V05-WGAP-1, -2a, -2b, V06-WGAP-1a, -1b,
  V09-WGAP-1, -2, V10-WGAP-1: closed (the encoder cells with their defaults — 24 and 32 sides, 2 000 m² — and their
  provenance).
* **g items** — 111 (V09 §4.21.1, the binding and catalogue rows, T-V9-71; V10 §3.9b's `water` section, the `lake`
  encoder's `spring`, T-V10-45), 112 (`cvdVariant` agreeing with §8.2's `'none'` and `protan`, `deutan`, `tritan`, the
  second cues, one channel per link cue, T-V9-77; the trial in V09 §7.6 with `GmTrialRecord.findings: TrialFinding[]`,
  T-V9-78), 113 (the History chip with the bytes V10's encoder writes, the lost void's line and drawing, T-V9-72; V10's
  `history` section, prompt rule 19, T-V10-46) — present at build depth, bar the catalogue families (V09-CAT-1) and the
  base declaration (MODEL-HH-1).
* **Hand-offs** — every XV-V9 and CVR-V10 row closed at its destination (XV-V9-3 at V04 §1b.1; XV-V9-16 and -25 at
  V05; XV-V9-31 at V11's registry row 87; CVR-V10-6 and -13 at V01; CVR-V10-9 at V03 §4.6 with `deckNoCellar`), bar the
  V10 → V09 items this report raises (V09-CAT-1, V09-EMPTY-1).
* **Owner questions** — V09 Q1–Q3 and V10 Q1–Q5 answered as `docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md` records them;
  V10 §7.3's staged spend inside US$790–1 190 (95 runs ≈ US$29, 285 runs ≈ US$86).
* **Edges** — V09 §3.16 covers all 161 routed edges by its rules (a)–(d), table (e), (f) and the 25 owned combinations
  (g); V10 §3.23 the 65 routed edges and the 8 + 1 combinations; T-V9-74 and -76, T-V10-47, -48 and -49 run them. The
  outcomes were read for sense; one is wrong (V09-MOAT-1).
* **Build plans** — V09 §8.1's sums (19.5–29; the base line 16.75–24.75; staged 2.75–4.25) equal §16 and INDEX; V10 §8's
  sums are right but §16 and INDEX lag them (SCOPE-PLAN-1). Milestones M6-U, M6-sky, M3c, M6c and J122's order agree.
* **Doc checks** — not re-run here; the assemble seat ran them on the live set (exit 0, **provisional**: the reference
  corpus is absent in this checkout).
