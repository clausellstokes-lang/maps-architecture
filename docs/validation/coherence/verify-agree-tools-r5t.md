# Agreement check, round 5 — the tools (determinism, rendering, V09, V10) after assemble-r5

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-agree-tools-r5t; covered by the whole-design retrovalidation (J84).

> **PROGRESS** — [x] brief read whole · [x] resume check (fresh: no output, no LANDED line) · [x] live sha256 = assemble-r5's "after" column · [x] round-4 findings re-checked against the live text (4 of 4), with every END line's second end · [x] repair-r5-touched tool subsections re-read whole · [x] round-5 hand-offs at their destination · [x] matrix-gap hunt · [x] issues written · [x] result saved (`results/coherence_verify-agree-tools-r5t.json`) · [x] LANDED

Live text read: base `2d84eac2…`, V09 `7c91d3bf…`, V10 `847b3189…`, V03 `3fe82c82…`, V07 `7747179d…`, V01 `4585e1a5…`, V04 `b79fd290…`. Each equals assemble-r5's "after" column, checked by sha256 at the start. The pre-round text is git `3310b538`. Line numbers below are the live files'.

## Scope and method

**Members.** determinism (§5–§7), rendering (§8, §9, §11, §12), V09 and V10.

**Subjects.** Edit events, dry runs, undo, the embedding API, the editor screens, the clerk's calls and its why-answers. The round-5 repairs that reach them:
- R5-02: §7.1's bend rows — `bend.wall.held` with the enceinte delete, `bend.wall.raisedCrossing` rewritten, `bend.raised.underSpan` with the new key `bend.raised.around`, and the catch-all. Also §7.3's S7 row, §7.4's raised-way row, V09 §4.9, §4.20.2 (4) and T-V9-52.
- R5-03: the `dossierFacts` event's `lateCalamities` and `DossierBinding.lateCalamities` (§7.1, §7.4, §7.7).
- R5-04: the restoring re-cut's entry week (§6.3, §8.6, T-ER-28, V09 §4.21.13).
- R5-05: Find at a drawn week — §11.2's reader list, §12.5's re-evaluation budget, R12-35, V09 §4.21.10 and V10 §3.9b (7).
- R5-08: the crisis look's readers — the why-line forms, each `live.crises` mark's look, `looks`' `field`, and the section providers' week.
- R5-09: the working layer's type and its Ground fallback (V09 §4.2, §2.12, row 21).
- Round 5's FIXes in scope:
  - VAT-r4-02: `ExportOpts.pins`;
  - VRC4T-01: the device-pixel-ratio rate limit;
  - VRC4T-02: `ExportOpts.links`;
  - VRC4T-03: NaN refusal and `vtt.squareM` 1.25;
  - VDC4-02: the weather fades;
  - VDC4-07: the waiting press.

**What was read whole.**
- Base: §6.3 *Plan damage*; §7.1's outcome table (the bend rows and the catch-all), the `EditEvent` union's `setLayer`, `setStyle` and `dossierFacts`; §7.3's S7 row; §7.4's raised-way and `dossierFacts` rows; §7.7's `DossierBinding`; §8.2's *Crisis looks* (the look table, *Placement*, *The layer*) and *Find*; §8.4's `LayerSpec` and *Toggles are visibility*; §8.6's lead; §8.8's DPR sentence; §9.5's legend, *Annotation layer*, *Measure tool* and *Find*; §11.1's GeoJSON, 3-D and CityJSON rows; §11.2 whole (`ExportOpts` with the out-of-range rule; the `Query` union with `looks` and `why`; `LooksAnswer`; *At a drawn week*); T-ER-19 and T-ER-25 – T-ER-28; §12.5's Find sentence; R12-35; §2.1's *Layers* wording rule; §2.8's registry (the explainers); §2.9's *View state*; §2.7's support step (6); and §13.2's T110-2 (2)–(6), for the bend rows' bars.
- V09: §1b's rows 301–315 and 372–379; §2.4's `WorkingLayer`; §2.12's rows 974–1007; §3.16 rows 21, 90, 92 and 93; §4.2; §4.5's T12 `dress` row; §4.9's `bend.*` rows (2096–2167); §4.19; §4.20.2 (4); §4.21.9 – §4.21.14 whole; §5.8; §5.10's Picture tab; §5's entity table (4153, 4164); §6.4's Find row; T-V9-52, T-V9-83 and T-V9-85 – T-V9-87.
- V10: §1.2; §1b.1's `WhyAnswer`, `plan` and `WhySectionProvider.rows` rows; §2.12's `read_map` union; §2.13's `WhyView`, `WhyProvider`, `WhySectionProvider` and `LookAnswer`; §3.5's read and `why` paragraph; §3.9's query; §3.9b (7) and (8); §3.23 rows 14 and 32–34 and C10, with every row's T-V10-50 clause number; T-V10-50 – T-V10-52.
- Ends beyond the members:
  - V03 §4.6's section providers;
  - V07 §4.5's view-bound rows and W74;
  - V01 §5.1.3, §5.4's `FindArea`, its toggles table and its T12 `dress` bullet;
  - V04's `pins` toggle sentence and §5.1 *Go there*.
- The round's inputs:
  - adjudication-r5: R5-01 – R5-05, R5-08, R5-09 and R5-02's ends; Part H for determinism, rendering, V03, V09 and V10 with their END lines;
  - assemble-r5 (sections 1, 2, 9);
  - the HAND-OFFS of repair-r5-rendering, -determinism, -V09, -V10 and -V03;
  - the round-5 peers' results landed when this seat wrote: verify-agree-layers, -agree-proof, -determinism, -model, -rendering and -vol-V07-V08.

**Diffs.** `git diff 3310b538` of the base (85 hunks; 26 in §8–§12, 13 in §5–§7), V09 (35), V10 (19) and V03 (6). Each hunk was mapped to its live subsection, and every touched subsection in the tool area was read whole.

**Scripted checks.**
- Review or ruling ids in design text: base 0, V10 0. V09 has 4, all in its records (l. 4914, a J- row).
- Deferral and phone words in the round's added lines: none. Every "later" is a schedule ("the later of M5 and V06's E6") or plain prose ("later work").
- Residues of R4-09's superseded raised-way crossing in the members ("nearest station on the deck", "crossing station taking", "once more on every raised way", "becomes its crossing station", "(6) (b))"): 0.
- `agreement.json`: `setLayer` is listed only for V09 – V10. No pair carries V01's `setLayer` toggles (VAT-r5-04).

**Not run:** `doc_checks.py` (this brief does not ask for it).

## Round-4 findings — verdicts (re-checked against the live text)

| id | owner | verdict | where (live) |
|---|---|---|---|
| VAT-r4-01 | rendering | FIXED per R5-08 (all six ends) | §11.2's `why` member (l. 16346–16350): "a section provider whose rows are read at the drawn week — V03 §4.6's `plan` damage rows (V03 §5.6 (2) (d)) — reads that view's `week`, and with no view the document's current week". V10 §2.13 (l. 985–992): `rows(…, opts: { view?: WhyView … })`, the resolved view type now named once (`WhyView`) and read by `explain` and `rows` alike — the facade resolves §11.2's `ViewHandle` to it (V10 §3.9). V10 §3.9 (l. 1646–1647): "— each passed the same `opts.view` —". V10 §3.23 row 14 (l. 2691): "the `plan` section's damage rows at the document's current week". V03 §4.6 (l. 2378): "at the why's view's drawn week (`opts.view.week`, V10 §2.13; §11.2's view-bound `why`), else the document's current week". V09 T-V9-86 (l. 4437): the scrubbed-week clause, timed at the later of its milestones and V06's E6. |
| VAT-r4-02 | rendering | FIXED (as written; V09's END written) | §11.2 `ExportOpts.pins` (l. 16273–16274) and `furniture`'s comment (l. 16272); §9.5's *Annotation layer* (l. 15118–15119); T-ER-19 (l. 16851): "a picture of a map holding view pins with `pins` absent and with `pins` true … no annotation drawn, then every pin drawn". V09 entity table (l. 4164) and §5.10's Picture cell (l. 4064, "(`ExportOpts.pins`)"). The public notes the member also names have no drawn form: VAT-r5-02 (new). |
| VAT-r4-03 | V10 | FIXED per R5-05 (VAH-r4-02 merged) | §3.9b (7) (l. 2004–2007): "§11.2's listing at that week (*At a drawn week*: the frame's matches, by the uses it holds open then …)". Row 32 (l. 2709): edge adds "or before a matched building's use changed"; outcome "by §11.2's listing at that week (the frame's matches, a building by its use then)". T-V10-51 (l. 3144): "they equal the panel's — §11.2's listing at that week, a building matched by its use then, never its head use". |
| VAT-r4-04 | V09 | FIXED per R5-04 (MERGED into VAH-r4-01) | §4.21.13 (1) (l. 3701–3703) states §6.3's comparison from the entry week, a restoring re-cut's minted element at the week its restoration ends; (2) (l. 3719–3723): "or that a restoring event's re-cut minted, is drawn as built — never damaged by that restoration nor repaired". Row 92 (l. 1612): the edge "or re-cut by its restoring event while its `repair` Works runs", the outcome "or a restoring re-cut minted, drawn as built". Agrees with §6.3 (l. 10007–10011), V03 §5.6 (2), V10 §3.9a. |

## Outcome

**Not clean: 5 issues — 0 blockers, 4 major, 1 minor.**
- By owner: rendering 3, V10 2.
- By kind: MATRIX-GAP 2, DISAGREE 2, HANDOFF-OPEN 1.

**Round 4.** All four round-4 findings are FIXED at their homes as ruled (table above). VAT-r4-01 is fixed per R5-08 at all six ends. VAT-r4-02 is fixed as written, with V09's END. VAT-r4-03 is fixed per R5-05, which also closes VAH-r4-02. VAT-r4-04 is closed with VAH-r4-01 per R5-04. No round-4 id persists.

**New this round (5).** Each comes from a round-5 text or a hand-off the round left open, except VAT-r5-04, a matrix gap this round's sweep found.
- **The clerk cannot tell a famine-bared field** (VAT-r5-01, major). R5-08 (c) gave §11.2's `looks` a `field`, read only by V09's why card. V09 says volume 10 renders the same keys. V10's look read takes a `building` only, so the clerk has no read that says whether a famine bares a field at the town rungs.
- **Public notes in a picture have no drawn form** (VAT-r5-02, major). `ExportOpts.pins` draws "the view pins and public notes … as the view draws them". The view draws public notes only in panels, and §9.5's annotation layer names only the pins. So V09's **pins and public notes** option has no defined drawing for a note.
- **§8.2 restates the crisis Show's framing narrower than its home** (VAT-r5-03, major). §8.2 now says Show and Go to frame "the box" of one look's marks, for every look. V09 §4.21.12 (5), Show's home, frames a `disaster` look by the union of its units' `FindArea` shapes, and frames the town where nothing is drawn. The two differ once a unit has handed over to its rebuild, and no bar runs that case.
- **The drawing groups' switches have no mechanism** (VAT-r5-04, major, matrix gap). V01 hides "the `pins` layer" and "the `trees` layer" with T12's `setLayer`, and §4.9 calls trees "a layer toggle". But `setLayer` takes a model `Layer`, and §2.1 says such groups are never a model layer. No unit defines the switch, and V09's T12 row offers none.
- **V09's hand-off to V10 on the `ruinedFor` forms is open** (VAT-r5-05, minor). V10 names no `info.crisis.ruinedFor` key for a building under a disaster look, its preview form included.

**Left to peers (not raised here).**
- A hand carve across a standing raised way is the peers':
  - §7.1's row tests a channel by §4.3's way rule, against §2.7 (6) (b): VDC5-01;
  - no bar runs it: VDC5-02;
  - V09 has no words for the stopped channel: VDC5-05.
- The crisis marks in the hit stack: VRC5T-02. The undefined `building` or `field` at §11.2: VRC5T-05.
- The famine fixture for T-V9-85: VAP-r5-02. T120-6 and V12's `time.findGlow`: VAP-r5-01 / VRC4T-04.
- §8.8's DPR rate limit against V09 §4.21.11: VRC5T-04. The CityJSON wall reader at §2.7 (6) (d): VRC5T-01.

## Repair-touched subsections in scope — what was re-checked

**§7.1, §7.3, §7.4 (determinism).**
- The bend rows match V09 §4.9 word for word on their causes and outcomes, each V09 row citing its §7.1 row. That covers:
  - `bend.wall.held` with the enceinte delete (l. 10630; V09 l. 2101);
  - `bend.wall.raisedCrossing` (l. 10631; V09 l. 2100);
  - `bend.raised.underSpan` / `bend.raised.around` for a way (l. 10632; V09 l. 2102–2103);
  - the catch-all's aqueduct arch (l. 10633).
- V09 §4.20.2 (4) (l. 3014–3025) and T-V9-52 (l. 4404) carry R5-02's V09 lines verbatim.
- The carve's channel under `bend.raised.around` is the peers' VDC5-01 / -02 / -05.
- §7.3's S7 row and §7.4's raised-way row read "held from its creation".
- V10 maps any `bend.*` row through §3.5 step 3 and states no crossing rule.

**§7.1, §7.4, §7.7 — `dossierFacts`.**
- The event's `lateCalamities` (l. 10357), §7.4's row (l. 11228) and `DossierBinding.lateCalamities` (l. 11825) agree with V08 W20, §2.3 and §3.6 (4), l. 1903–1908.
- V09's history reads the event's `changes`, `absorbed` week and `notes` only (l. 331, 2364), so it needs nothing.

**§6.3, §8.6, T-ER-28 (R5-04).**
- §6.3 (l. 10007–10011) and §8.6's lead (l. 14117–14120) state one comparison from the entry week. They agree with V09 §4.21.13 (1)–(2), V03 §5.6 (2) and V10 §3.9a.
- T-ER-28's input and outcome are R5-04's.
- The "under no disaster look" clause at §8.6 (l. 14157) is the peers' VRC5T-03.

**§8.2 *Crisis looks* (rendering).**
- *The layer*'s mark look (l. 13181–13185) is VV910-r4-02's text as amended. V09 §1b row 377 and §4.21.12 (5) read it.
- Its restatement of Show's framing is VAT-r5-03. Its hit-stack side is VRC5T-02 (peer).
- §8.2 *Find* and §9.5 *Find* read the gazetteer at the drawn week; §12.5's budget sentence is cited, not restated.

**§8.4, §8.8 (rendering).**
- The weather fades (l. 13873–13876) agree with §6.1's press (l. 9590–9596) and V09 §4.21.14 (4).
- The wall run under a span topped at its soffit (l. 13672, 13897) is R5-02's END; its home's wording is VRC5T-01 (peer).

**§9.5, §11.1, §11.2, §11.6 (rendering).**
- `ExportOpts`:
  - `furniture` and `pins` (l. 16272–16274): VAT-r4-02, fixed; the public notes are VAT-r5-02.
  - `links` (l. 16283) agrees with §11.1's GeoJSON `supplyLink` sentence (l. 15984) and V09 §5.15's row (l. 4153).
  - The out-of-range rule's `vtt.squareM` 1.25 and NaN clauses (l. 16298–16305) agree with T-ER-19. V09's dialog offers 1.5 or 1 and never sends either value.
- `looks`' `field` and `over` (l. 16337–16338, 16385): V09 §4.21.12 (4), §5.8 and T-V9-85 read them. V10 does not (VAT-r5-01).
- The `why` member's section-provider week (l. 16346–16350): VAT-r4-01, fixed.
- *At a drawn week*'s reader list and index triggers (l. 16522–16526) agree with V09 §4.21.10 (7), (14) and §6.4, and with V10 §3.9b (7), row 32 and T-V10-51.
- T-ER-19 runs the pins clause (l. 16851).

**§12.5, R12-35.** The drawn-week re-evaluation budget (l. 17176–17179) is restated by V09 §4.21.10 (14) and §6.4 (l. 4308–4310) in the same terms. Its T120-6 and V12 ends are VAP-r5-01 / VRC4T-04 (peers).

**V09.**
- §1b's rows 311, 312, 377 and 378 read the gazetteer at the drawn week and `looks` with the building and the field.
- §2.12's `workingLayer` row (l. 974), §4.2 (l. 1653–1676) and row 21 (l. 1526) state R5-09's Ground fallback. V09 §2.4's `WorkingLayer` (l. 518) and §2.9's model text (l. 3405–3407) agree. V04 §5.1 and V05 §5.6 (3)'s **Go there** write view keys only.
- §4.9's `info.crisis.*` row has the five line forms and the `ruinedFor` forms. V10 §2.13's `says` names the line forms.
- §4.21.9 (1)'s **Go back to here** reads §11.2's `edit` `onProgress` `'undo'` (l. 16219).
- §4.21.13 is VAT-r4-04, fixed. §4.21.14 agrees with §6.1.
- §5.8 states the `plan` section at the card's view's drawn week.
- §5.10's Picture cell and the entity table read `ExportOpts.pins`.

**V10.**
- §2.13 names the resolved view `WhyView` once, read by `explain` and `rows` alike. It carries `week`, `yearWeek`, `festival`, `crises` and `looks`, which is what §11.2's `why` comment says a provider reads. V07 §4.5 reads `opts.view`'s `yearWeek`, `festival`, `crises`, `week` and `looks`, all present.
- §3.5, §3.9 and row 14 pass and default the view as §11.2 states.
- §3.9b (7), row 32 and T-V10-51 read §11.2's listing at the drawn week (VAT-r4-03, fixed).
- §2.13's `says` and row 34 carry `lineUnnamedOpen`.
- Row 34 and T-V10-50 clause (33) define a `building` naming no building. Every §3.23 row's T-V10-50 clause number resolves; row 34 maps to clause (33).

## Hand-offs of this round, at their destination

| from → to | hand-off | at destination |
|---|---|---|
| rendering (VAT-r4-01 ENDs, R5-08 (d)) → V10, V03, V09 | the section providers' drawn week | closed (V10 §2.13, §3.9, row 14; V03 §4.6; T-V9-86) |
| rendering (VAT-r4-02 END) → V09 | `ExportOpts.pins` at l. 4164 and §5.10 | closed |
| rendering (VRC4T-02 END) → V09 | §5.15's `supplyLink` row | closed (l. 4153) |
| rendering (VV12-r4-01 END) ← V09 | §11.2's reader list with `findAreas` and V07 §5.5 | closed (l. 16522–16523) |
| rendering (VV910-r4-03 END) ← V09 | `looks`' `field`, `over` for a famine | closed at §11.2. V10 is not extended: VAT-r5-01 |
| V10 (VV910-r4-01 END) ← V09 | §2.13's `says` forms; row 34's unnamed open condition | closed |
| determinism (R5-02 ENDs) → V09 | §4.9's bend rows, §4.20.2 (4), T-V9-52 | closed. The carve's channel: VDC5-05, VDC5-02 (peers) |
| repair-r5-V09 HAND-OFF → V10 | "V10's explanation of a building under a previewed `disaster` renders `info.crisis.ruinedForPreview`" | open: V10 names no `ruinedFor` key — VAT-r5-05 |
| repair-r5-V09 HAND-OFF → V08 / V12 | T-V9-85's famine at severity 0.5 | open as VAP-r5-02 (peer) |
| repair-r5-rendering HAND-OFFS → scope, V12, model | T120-6's drawn-week clause; `time.findGlow`; (6) (d)'s CityJSON reader | open as VAP-r5-01 / VRC4T-04 and VRC5T-01 (peers) |
| repair-r5-determinism HAND-OFFS → V09, scope | the carve's words and bar | open as VDC5-05 and VDC5-02 (peers) |

## Issues

### VAT-r5-01 — major · MATRIX-GAP · owner V10

**Claim.** The clerk has no read that tells whether a famine bares a field, yet V09 says it renders the card's words for one. This is a missed subject: `looks`' `field`, read by V09 and not by V10.
- R5-08 (c) gave §11.2's `looks` a `field?: Id` (l. 16337–16338). With it, `LooksAnswer.crises[].over` says whether a famine look draws that field bare at the view's week (l. 16385).
- V09 reads it for the why card of a field. §4.21.12 (4) (l. 3652–3656): "the card reads it from the same reader asked with that field (`query({ kind: 'looks', view, field })`), each `famine` entry carrying `over`". The card adds `info.crisis.ruinedFor` as a `facts` row (§5.8; §1b row 377; T-V9-85's clause "the why card of a bare field carries `info.crisis.ruinedFor`").
- V09 then says "Volume 10's explanation renders the same keys (one key, one sentence, J-V9.79)" (l. 3656).

V10's read has no `field`:
- `read_map` `look` takes `building?: Ref` only (§2.12, l. 954).
- §2.13's `over` is "with the read's building" (l. 1023–1025).
- §3.5 passes "the input's `building`" (l. 1458).
- §1.2 restates `looks` as "asked with a building each disaster look's `over`" (l. 189).
- §3.9b (8) tells only "*A house under a disaster look*" (l. 2046).
- Row 34 makes a field passed as `building` answer no `over` (l. 2711).

The clerk cannot reach the answer another way:
- At TOWN to METROPOLIS a field's `why` carries no famine row. V07 §4.5's view-bound `VillageField` row serves the village rungs only.
- The card's `facts` row is the card's own read. It is not in the `WhyAnswer` that **Ask the assistant** sends (V09 §5.8).

So for "why is this field bare?" under a famine, the card names the famine on that field and the clerk cannot tell whether it bares it. That is two units with two outcomes for one case (item 122 (f): "the 'Why?' card and the clerk name the crisis"), and an input the clerk needs has no producer. R5-08's sweep extended V10 for the building and the section week only.

**Required change** (V10).
- **§2.12's `read_map` union.** `| { kind: 'look'; building?: Ref }` → `| { kind: 'look'; building?: Ref; field?: Ref }`. The comment adds "; with `field`, whether each famine look draws that field bare (§11.2's `looks` member's `field`; §10.2 (d)'s `fields`, (f))".
- **§2.13's `LookAnswer.crises.looks[].over` comment** adds: "; with the read's field: `LooksAnswer.crises[].over` — whether this famine look draws that field bare at the drawn week (§10.2 (d)'s `fields`, (f)), evaluated in the generation worker; absent where the read's field names no field (V10 §3.23 row 34)". The trailing projection comment "and, with a building, over" → "and, with a building or a field, over".
- **§3.5** (l. 1458). "asked with the input's `building` where it names a building (one that names none is not passed, and no look carries `over`; V10 §3.23 row 34)" adds: "and with its `field` where it names a field (one that names none is not passed)".
- **§1.2's §11.2 row** (l. 189). "asked with a building each disaster look's `over`" adds "and with a field each famine look's `over`".
- **§3.9b (8)** adds, after *A house under a disaster look*: "*A field under a famine look.* "Why is this field bare?" on a field a famine look draws bare (the look read asked with it answering `over` true; V09 §4.21.12 (4)): the field's own state from its `why`, then the look in the why card's words — `info.crisis.ruinedFor` in V09 §4.21.12 (4)'s form — the bare field leaving with the condition; with `over` false (a field the famine leaves sown), the field's own state alone. At THORP, HAMLET and VILLAGE the village `WhyProvider`'s row (V07 §4.5) tells it, the read adding none."
- **Row 34.**
  - Its edges add "a read asked with a field — one a famine look draws bare, one it leaves sown; a `field` that names no field (a building, a plot or a district, or a field gone since the read that returned it)".
  - Its outcomes add "`over` true on the famine look, the field told as V09's card tells it; `over` false; `over` absent on every look, every other field as without `field`".
- **T-V10-52** adds: "on V08 §7.1's famine fixture (T-V9-85's, a famine at severity 0.5), 'why is this field bare?' on a bare field names the famine in `info.crisis.ruinedFor`'s form, as its why card's `facts` row does, and on a field left sown names none".
- **T-V10-50's clause (33)** adds the `field` forms.

### VAT-r5-02 — major · DISAGREE · owner rendering

**Claim.** A picture with V09's **pins and public notes** on has no defined drawing for a public note.
- `ExportOpts.pins` (l. 16273–16274): "§9.5's annotation layer — the view pins and public notes (§2.9; V09 §4.19), drawn as the view draws them".
- The view draws public notes only in panels:
  - V09's entity table (l. 4164): "pins as markers with their colour; notes in panels".
  - V09 §4.19 (l. 2905): a public note sits on a thing's About tab and in the Notes panel.
- §9.5's *Annotation layer* (l. 15118–15119) names "the view pins" only: "numbered markers and a separate legend sheet".

So the member's own words leave a note's drawing open. One builder draws no note, since the view draws none on the map. Another draws a numbered marker at the noted thing with its text on the legend sheet, §9.5's annotation form. A third draws the text on the map. V09 §5.10 (l. 4064) offers the option by that name. T-ER-19's clause (l. 16851) runs view pins only, so no bar tells them apart.

This is an edge on a normal path (a picture of an annotated map) with no defined outcome, built two ways. The round-5 fix carried my own round-4 wording, "drawn as the view draws them", without saying how a note draws.

**Required change** (rendering, with ENDs at V09).
- **§11.2's `ExportOpts.pins` comment.** "§9.5's annotation layer — the view pins and public notes (§2.9; V09 §4.19), drawn as the view draws them, above the map as the furniture is" → "§9.5's annotation layer — the view pins and the public notes (§2.9; V09 §4.19) — above the map as the furniture is. Each view pin is a numbered marker in its colour at its point. Each public note is a numbered marker at its thing's anchor as §8.2's Find pins place one (a building's footprint pole of inaccessibility, an area's anchor, a point thing's point). The numbers are keyed on §9.5's separate legend sheet to the pin's label and note and to the public note's text. A public note on a thing the export's knowledge withholds is left out (§11.1 *Knowledge*)". The rest stands.
- **§9.5's *Annotation layer*.** "the view pins, §2.9; V09 §4.19 — in a picture only with `ExportOpts.pins`, §11.2" → "the view pins and public notes, §2.9; V09 §4.19 — in a picture only with `ExportOpts.pins`, each a numbered marker keyed on the legend sheet, §11.2".
- **END at V09's entity table** (l. 4164). "notes in panels" adds "; in a picture with the Picture tab's **pins and public notes** on, each public note a numbered marker at its thing, its text on the legend sheet (§11.2's `ExportOpts.pins`; §9.5)".
- **T-ER-19.**
  - The input "a picture of a map holding view pins with `pins` absent and with `pins` true" adds "and holding a public note on a building and one on a building the export's key withholds".
  - The outcome "no annotation drawn, then every pin drawn" adds "and the first note's numbered marker at its building with its text on the legend sheet, the withheld building's note left out".

### VAT-r5-03 — major · DISAGREE · owner rendering

**Claim.** §8.2 restates the crisis **Show**'s framing narrower than its home in V09.

§8.2 *The layer* (l. 13182–13185, written this round from VV910-r4-02 as R5-08 amended it):
- "a preview, drawn alone, carries no condition, so its **Show** frames every crisis mark";
- "V09 §4.21.12 (5)'s **Show** and Find's **Go to** on a look read them so, asking the provider in the generation worker for one look's marks … and framing their box".

That is one rule for every look. V09 §4.21.12 (5) (l. 3663–3670), the home of the card's Show, frames:
- "the box of the marks `live.crises` draws for that look …";
- "or for a `disaster` look the union of its units' `FindArea` shapes (V01 §5.4 (6))";
- "or the town's own frame where nothing is drawn for it".

(7) frames Go to "as the card's **Show** does" (l. 3677–3678). T-V9-85 runs "a previewed `disaster` look's **Show** framing the union of its units' `FindArea` shapes" and "a look with no mark drawn for it framing the town".

The two rules differ in two cases:
- **A standing disaster whose rebuild has begun in some units.** A unit's `ruinTone` stands only "while the look stands over any of its buildings" (§8.2 l. 13164–13165). So the marks' box shrinks as units hand over (V06 §3.22 (3)), while V09 frames every unit of the look (`LooksAnswer.crises[].districts`).
- **A look with nothing drawn.** §8.2 frames an empty box; V09 frames the town.

T-V9-85's disaster clause is a preview, which never hands over, so a Show built from §8.2 passes every bar. That is two units with two outcomes for one case.

**Required change** (rendering, with an END at V09).
- **§8.2 *The layer*.** "— a preview, drawn alone, carries no condition, so its **Show** frames every crisis mark —" → "— a preview, drawn alone, carries no condition, so its marks are every crisis mark drawn —".
- **§8.2 *The layer*, the framing sentence.** "V09 §4.21.12 (5)'s **Show** and Find's **Go to** on a look read them so, asking the provider in the generation worker for one look's marks at its row's `band` over the map's `bounds` and §8.8's ring, whatever the view, and framing their box." → "V09 §4.21.12 (5)'s **Show** and Find's **Go to** on a look read them so, asking the provider in the generation worker for one look's marks at its row's `band` over the map's `bounds` and §8.8's ring, whatever the view, and frame by V09 §4.21.12 (5)'s rule (the box of those marks; a `disaster` look the union of its units' `FindArea` shapes; the town's own frame where nothing is drawn for the look)."
- **END at V09's T-V9-85.** It adds: "on T-V3-40's fixture (T-V9-86's) with the rebuild begun on every building of one of the disaster's units, the standing look's **Show** and Find's **Go to** framing the union of all its units' `FindArea` shapes, that unit's among them".

### VAT-r5-04 — major · MATRIX-GAP · owner rendering

**Claim.** Two units switch "layers" that the event cannot carry and no unit defines. This is a missed subject: `setLayer` and the drawing-group switches, shared by V01, determinism, rendering, V09 and pipeline.

What the callers say:
- V01 §5.1.3 (l. 3039–3041): "**Layer toggles** (T12's `setLayer`; NG F1): the hood pins, model pins and access symbols belong to the `pins` layer and block trees to the `trees` layer, so the view bar hides them".
- V01's T12 `dress` bullet (l. 2776–2777): "its layer toggles (`setLayer`) hide the hood pins with the `pins` layer and the block trees with the `trees` layer".
- V01's toggles table (l. 2626) lists "the `pins` and `trees` layers".
- V04 (l. 2780) has an access head drawn by "the `pins` toggle".
- The base's §4.9 (l. 7946): "trees are a layer toggle".

What the base admits:
- §7.1's event is `{ t: 'setLayer'; layer: Layer; spec: Partial<LayerSpec> }` (l. 10347). `Layer` is `{underground, ground, sky}` (§2.1, l. 548).
- §2.1's wording rule (l. 553–556): "the toggleable drawing groups of §8–§9 (labels, cadastral outlines, trees, annotations, the thematic style overrides) are display-list groups selected by `semantic`, never a fourth model layer".

Nothing defines how such a group is switched:
- `StyleSheet` (§8.2, l. 12544–12566) has no group switch;
- §2.9's view keys have none;
- §8.4's *Toggles are visibility* covers only `LayerSpec.visible`;
- V09's T12 `dress` row (l. 1739) takes V01's `pinGate` and vignette but offers no pins or trees switch;
- `agreement.json` lists `setLayer` only between V09 and V10.

So a builder of V01's toggle must either extend `Layer`, against §2.1 and every per-layer arena, or invent a mechanism: logged style state, or a per-viewer view key. Two builders then differ in whether hiding the trees is undoable, shared and saved. V09's builder offers no control at all. This is an interface with callers and no implementer (principle (7)).

**Required change** (rendering, with ENDs at model, pipeline, V01, V04 and V09). The style form is chosen because V01 lists the switch beside the style's `details` and `shadows`, which are style state.
- **§8.2's `StyleSheet`** adds `groups: { trees: boolean; pins: boolean };   // the drawing groups a T12 `dress` switch hides (§2.1's wording): `trees` every tree instance and block tree (§8.10; V01 §5.1.3's block-tree slot), `pins` every model pin, hood pin and ground-access symbol (V01 §5.1.3's slot 10); default true; set by a logged `setStyle` (§7.4's row: style state, outside the model digest, undone as a style edit); a picture draws what the style draws`.
- **§8.4's *Toggles are visibility*** adds: "; a drawing group (§2.1) is switched by `StyleSheet.groups` (§8.2), a logged `setStyle`, never by `setLayer`".
- **END at model §2.1.** "are display-list groups selected by `semantic`, never a fourth model layer" adds "— trees and pins switched by `StyleSheet.groups` (§8.2)".
- **END at pipeline §4.9** (l. 7946). "trees are a layer toggle" → "trees are a drawing-group switch (`StyleSheet.groups.trees`, §8.2)".
- **END at V01.**
  - §5.1.3: "**Layer toggles** (T12's `setLayer`; NG F1): the hood pins, model pins and access symbols belong to the `pins` layer and block trees to the `trees` layer" → "**Group switches** (T12's `setStyle` of `StyleSheet.groups`, §8.2; NG F1): the hood pins, model pins and access symbols belong to the `pins` group and block trees to the `trees` group"; and "the `pins` toggle" → "the `pins` switch".
  - The T12 bullet: "its layer toggles (`setLayer`) hide the hood pins with the `pins` layer and the block trees with the `trees` layer" → "its group switches (`setStyle` of `StyleSheet.groups`, §8.2) hide the hood pins with `pins` and the block trees with `trees`".
  - The toggles table: "the `pins` and `trees` layers" → "the `pins` and `trees` group switches (`StyleSheet.groups`)".
- **END at V04** (l. 2780). "the `pins` toggle" → "the `pins` switch (`StyleSheet.groups.pins`, §8.2)". J-V4.96 keeps its record wording.
- **END at V09's T12 `dress` row** (l. 1739). "V01 (pinGate, vignette)" adds "; the Dress panel's **Trees** and **Pins** switches (`setStyle` of `StyleSheet.groups`, §8.2)".
- **The bar.** The test that runs V01's toggles-table row runs each switch: hidden, logged as one `setStyle`, undone, and the document's model digest unchanged.

### VAT-r5-05 — minor · HANDOFF-OPEN · owner V10

**Claim.** repair-r5-V09's HAND-OFFS ask V10: "V10's explanation of a building under a previewed `disaster` renders `info.crisis.ruinedForPreview` (V09 §4.21.12 (4); T-V9-86)".

V09 §4.21.12 (4) makes the why card's `facts` row for a building a disaster look stands over `info.crisis.ruinedFor` "in the form the line takes": `ruinedForOpen`, `ruinedForUnnamed`, `ruinedForUnnamedOpen`, or under a preview `ruinedForPreview`. It says volume 10 "renders the same keys".

V10 names no `ruinedFor` key:
- `LookAnswer.looks[].says` carries the legend's line forms only (l. 1015);
- §3.9b (8)'s *A house under a disaster look* (l. 2046–2051) quotes "for now its quarter is drawn burned: the Great Fire, weeks 12–20" with no key;
- C10 says only that the clerk "tells the drawn ruin as the look's".

The hand-off is not closed at its destination. It is minor: the clerk reads the same look, condition and weeks, and only the catalogue key its sentence renders is unnamed.

**Required change** (V10).
- **§3.9b (8)'s *A house under a disaster look*.** "then the look — "for now its quarter is drawn burned: the Great Fire, weeks 12–20" —" → "then the look in the why card's words — `info.crisis.ruinedFor` in V09 §4.21.12 (4)'s form (`ruinedForOpen`, `ruinedForUnnamed`, `ruinedForUnnamedOpen`; under a preview `ruinedForPreview`): "For now: Ruined quarters, the Great Fire, weeks 12–20" —".
- **C10's outcome.** "the clerk tells the drawn ruin as the look's" adds "(`info.crisis.ruinedFor` in its form, V09 §4.21.12 (4))".
- **T-V10-52** adds: "a building of a previewed `disaster`'s units explained with `info.crisis.ruinedForPreview`, as its why card".
