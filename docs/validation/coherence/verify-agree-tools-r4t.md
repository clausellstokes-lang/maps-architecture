# Agreement check, round 4 — the tools (determinism, rendering, V09, V10) after assemble-r4

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-agree-tools-r4t; covered by the whole-design retrovalidation (J84).

> **PROGRESS** — [x] brief read whole · [x] resume check (fresh: no output, no LANDED line) · [x] round-3 findings re-checked against the live text (6 of 6), with every END line's second end · [x] repair-r4-touched tool subsections re-read whole · [x] round-4 hand-offs at their destination · [x] issues written · [x] result saved · [x] LANDED

Live text read: base `5f34cceb…`, V09 `b49c6014…`, V10 `3fd16e69…`, V05 `ef99abd9…`, V04 `6aebc1e1…`, V07 `a55c4d08…`, V08 `4675c05e…`, V03 `9af5ffd5…`. Each was confirmed by sha256 at the start and equals assemble-r4's "after" column. The pre-round text is git `96bdae2`. Line numbers below are the live files'.

## Scope and method

**Members.** determinism (§5–§7), rendering (§8, §9, §11, §12), V09 and V10.

**Subjects.** Edit events, dry runs, undo, the embedding API, the editor screens, the clerk's calls and its why-answers. This round the repairs that reach them are:
- R4-02: the view draws its working layer; Find's **Go there** writes nothing.
- R4-05: the view-bound `why`.
- R4-04 (c): `looks` asked with a building, and `over`.
- R4-12: Find at a drawn week reads the frame's listing.
- R4-10: Auto's and a device-pixel-ratio change's timing.
- R4-09: §7.1's three new bend rows (`bend.wall.held`, `bend.wall.raisedCrossing`, `bend.raised.underSpan`) and V09's rows and flow for them.
- R4-03: a restoring re-cut's new elements.
- VRC2T-12 / VRC3T-05 – -07: `ExportOpts` against V09 §5.10, and the out-of-range rule.
- VV1112-r3-04 / -05: `refuse.table.required`.
- VDC3-01: the shower press.
- VAT-r3-03 – -06.

**What was read whole.**
- Base: §2.9's *View state* and `week`; §6.1 *The weather stream*; §6.3 *Plan damage*; §7.1's outcome table (the new bend rows, `refuse.table.required`, the catch-all) and *The returned kinds*; §7.4's raised-way lock row and `setLayer` row; §7.7 item 1; §8.2's *Crisis looks* (the look table, *Placement*, *The layer*) and *Find* (ghost pins, Show gaps' outline); §8.4's *Toggles are visibility* and the cursor sun's floor; §8.8's Auto loop, device-pixel-ratio sentence and weather layer; §9.2's candidate set; §9.5's furniture list, *Find* and *Annotation layer*; §11.1 *Layers* and *Knowledge*; §11.2 whole (the `Query` union with `looks` and `why`, `ExportOpts` and its out-of-range rule, `LooksAnswer`, *Knowledge*, *Find's match listing*, *At a drawn week*, the call table); §11.3's host commands and `export.request`; §11.6's T-ER-19 and T-ER-21; §12.5's Auto sentence.
- V09: §1b's rows 304 and 310–315, and 377–378; §2.7; §2.12's rows 974 and 1002–1013; §3.10; §3.16 rows 21 and 87–94; §4.2; §4.3's T3 and T4 rows; §4.9's new rows (2006, 2092–2094); §4.19; §4.20.2 (4); §4.21.10 – §4.21.14 whole; §5.8; §5.10; the export rows of §5's entity table (4125–4140); the bars T-V9-22, T-V9-52, T-V9-80 and T-V9-83 – T-V9-87.
- V10: §1.2's touched rows; §1b.1's `WhyAnswer` and `LookAnswer` rows; §2.3's `ClerkSession.view`; §2.6's `useTool` and `export` actions; §2.12's `read_map look`; §2.13's `WhyProvider`, `WhySectionProvider`, `LookAnswer` and `FindAnswer`; §3.5's read and `why` paragraph; §3.9's query paragraph; §3.9a's `plan` table and damage part; §3.9b (7) and (8); §3.17's projection rows; §3.23 rows 14, 26 and 32–35 and C10; §4.6; T-V10-29, T-V10-49, T-V10-51 – T-V10-53; §8's C4 row; CVR-V10-22.
- Ends beyond the members:
  - V05 §5.6 (2)–(5), its Find edge row and its bar (c);
  - V04 §4.1's working-layer sentence and §5.1;
  - V07 W74 and §4.5's village `WhyProvider`;
  - V03 §4.6's section providers and §5.6 (2) (a)–(d);
  - V06's `crisisLookYields`.
- The round's inputs: adjudication-r4 (R4-01 – R4-05, R4-09 – R4-12, R4-14; Part H for determinism, rendering, V04, V05, V07, V09 and V10 with their END lines); assemble-r4 (sections 1, 8); the HAND-OFFS of repair-r4-determinism, -rendering, -V09 and -V10; the round-4 peers' results landed when this seat wrote (verify-determinism, -kernel, -model, -pipeline, -rendering, -scope, -vol-V01-V02 … -vol-V11-V12, -agree-fabric, -agree-layers, -agree-time).

**Diffs.** `git diff 96bdae2` of the base (130 hunks; 61 in §5–§12), V09 (33), V10 (36), V05 (22), V04 (29), V07 (7) and V08 (59). Each hunk was mapped to its live subsection, and every touched subsection in the tool area was read whole.

**Scripted checks.**
- Review ids in V09's design text: 0. The hits left are in §9's and §10's records (J-, BCR-, XV- rows).
- Residues of the superseded layer path: "visibility on", "a hidden sky layer visible", "turns its visibility on" and "layer choices" — 0 in the set. "layer … view state" — 0.
- Every `query({ kind: 'why' })` in V09 and V10 against §11.2's `why` member: all pass the view (V09 §2.7; V10 §3.5, §3.9).
- Every `WhySectionProvider` against the view's week: the `plan` section's damage rows read the drawn week, and nothing passes it a view (VAT-r4-01).
- Every V09 §5.10 option against `ExportOpts`: one option has no member (VAT-r4-02).

**Not run:** `doc_checks.py` (this brief does not ask for it).

## Outcome

**Not clean: 4 issues — 0 blockers, 2 major, 2 minor.**
- By owner: rendering 2, V10 1, V09 1.
- By kind: MATRIX-GAP 1, DISAGREE 3.

**Round 3.** All six round-3 findings are FIXED at their homes as ruled. VAT-r3-01 (merged into VAL-R3-01) and VAT-r3-05 are fixed per R4-02. VAT-r3-02 is fixed per R4-05. VAT-r3-03, -04 and -06 are fixed as written. Every END line of R4-02 and R4-05 is written at its second end: rendering §8.4, §9.2 and §11.2; model §2.9; V04 §5.1; V05 §5.6 (3); V09; V10; V07. No round-3 id persists.

**New this round (4).**
- **The `plan` section's drawn week has no input** (VAT-r4-01, major). V03 §5.6 (2) (d), V09 and V10 read the why card's `plan` damage rows at the view's drawn week. But `WhySectionProvider.rows(model, id, key)` takes no view. R4-05's view-bound `why` reaches only the kind's `WhyProvider`. So at a scrubbed week the card's `Inside` section has no defined week, and the plan panel beside it reads the scrubbed one.
- **Pins in a picture** (VAT-r4-02, major). V09 §5.10 offers "pins and public notes on · off", off by default, and V09 says pins are "never in pictures unless … on". `ExportOpts` has no such member. Its `furniture` defaults to true and is "§9.5's furniture", which lists the annotation layer. V09's ruler writes an annotation as a view pin. So a default picture of a map with pins draws them by one unit and leaves them out by the other.
- **Two minors.**
  - V10 §3.9b (7), row 32 and T-V10-51 still restate Find at a drawn week in R3-24's superseded form, "only the entities that frame holds" (VAT-r4-03).
  - V09 §4.21.13 (2) and row 92 omit R4-03's case — a restoring re-cut's new elements — which V03, the model and V10 now state (VAT-r4-04).

## Round-3 findings — verdicts

| id | owner | verdict | where (live) |
|---|---|---|---|
| VAT-r3-01 | V09 | FIXED per R4-02 (MERGED into VAL-R3-01; R4-02 supersedes the reporter's `info.layer.hidden` / **Show it** form) | §4.2 (l. 1652–1656): the switch draws the working layer whatever its `LayerSpec.visible`, as a view key per viewer that writes nothing. Row 21 (l. 1526). §4.21.10 (8) (l. 3528–3535): "view keys only, a hidden layer drawn as the working layer (§8.4), no event sent". T-V9-83 (g): "0 events logged, its `LayerSpec.visible` unchanged". Its ends are written: base §8.4 (l. 13580–13585), §9.2 (l. 14798), §11.2 `ExportOpts.layers` (l. 16215–16216), model §2.9 (l. 3394–3396), V04 §5.1 (l. 2694; also §4.1 l. 2537 and §5.1 (2) l. 2732), V05 §5.6 (3) (l. 2321–2323; also its edge row l. 1795 and bar (c) l. 2803). §9.5's Find ("Go there sets the working layer and band — view changes") and item 120 (a) now hold. |
| VAT-r3-02 | rendering | FIXED per R4-05 | §11.2's `why` member gains `view?: ViewHandle` with R4-05's comment (l. 16287–16290). *Knowledge* adds "a `why` with a `view` admits its view-bound rows as `looks` does" (l. 16443–16444). The ends are written: V10 §2.13's `WhyProvider.explain` opts gain `view?` (l. 985–988); §3.9's query paragraph (l. 1642–1644); §3.5's `why` passes `ClerkSession.view` (l. 1457–1459); row 14 covers a session with no view. V09 §2.7 (l. 620–622). V07 §4.5 (l. 3096–3097, 3121–3129) and W74 (l. 282). The section providers' side of the same subject is VAT-r4-01. |
| VAT-r3-03 | V09 | FIXED | §2.12's crisis-card row (l. 1007) re-reads on each change of `week` or `crises`, each `doc.changed` (a split or merge, a Works that hands a building over) and each `onEffectiveKey`. The damage-lines row (l. 1010) re-reads the plan panel's look lines with it. T-V9-85 adds the preview, switch and district-split clauses. This is the superset of §8.2 *The layer*'s re-run triggers (l. 13134–13142). |
| VAT-r3-04 | rendering | FIXED | T-ER-21 (l. 16793) reads: "the week view state that travels, the selection a command (the frame selects and reports `entity.selected`; never a stored key), the layers a logged `setLayer`". Its inputs read "a layer's visibility". |
| VAT-r3-05 | V10 | FIXED per R4-02 | §3.23 row 26 (l. 2700): "layer visibility (`LayerSpec.visible`, the document's style state, written by a logged `setLayer`, §8.4) never filters a read". |
| VAT-r3-06 | V09 | FIXED | The four canon ids are gone from design text (§2.6, §4.9's `info.remove.holds`, §4.21.2 (2), §5.4). Only the records keep theirs (J-V9.136, BCR-V9-3, BCR-V9-31, XV-V9-5, XV-V9-33). |

## Repair-touched subsections in scope — what was re-checked

**§7.1 (determinism).** The three new bend rows (l. 10591–10593) and V09 §4.9's `bend.wall.held`, `bend.wall.raisedCrossing` and `bend.raised.underSpan` (l. 2092–2094) agree word for word on the inputs and outcomes. Each V09 row ends with `button.showWhy` and cites its §7.1 row. V09 §4.20.2 (4)'s *Later work across a standing raised way* and T-V9-52's three cases state the same outcomes. V10 §3.5 step 3 maps any `bend.*` row with its buttons, so the clerk needs no row of its own. `refuse.table.required` reads the same five cases in §7.1 (l. 10586), V09 §4.9 (l. 2006) and V11 §4.1 / EI-V11-EDGE-3. Peers have the aqueduct-arch key's double naming (VDC4-06), the rows with no open span (VDC4-03) and the held stretch (VDC4-04).

**§6.1 / §6.3 (determinism).**
- The press rule in §6.1 (l. 9559–9564), V09 §4.21.14 (4), row 93 and T-V9-87 agree. The fades for snow, leaves and shimmer are VDC4-02 (peer), and the enabled button during the wait is VDC4-07 (peer).
- §6.3 *Plan damage* (l. 9969–9975) states R4-14's roofless case, as V09 §4.21.13 (1) and V10 §3.9a do. Its missing entry-week case is VDC4-01 / VAF-R4T-03 (peers). V09's own restatement of R4-03 is VAT-r4-04.

**§8.2, §8.4, §8.8, §9.2 (rendering).**
- R4-02's text is in §8.4. The sweep's "drawn — visible, or … the view's working layer" reaches §8.4's depth band, cursor sun, lights and casters, §8.8's tile key and weather, and §9.1 / §9.2's candidates.
- §8.2's ghost pins and Show gaps' outline name "the layer shown (the view's working layer)", as V09 §4.21.10 (8) does.
- §8.2 *The layer* re-runs at a Works' start week on a struck building. V09 §2.12 is its superset.
- Peers have §8.8's device-pixel-ratio rate limit (VRC4T-01) and the marks' missing look key for V09's **Show** (VV910-r4-02).

**§11.2, §11.3, §11.6 (rendering).**
- `looks` gains `building?` and `LooksAnswer.crises[].over` (l. 16280, 16325). V09 §4.21.12 (4) asks with the building, and V10 §2.12 / §2.13 / §3.5 / §3.9b (8) / row 34 / C10 project and read `over` with the same predicate (R4-04 (b)).
- *At a drawn week* (l. 16455–16464) is R4-12's listing, and names V10's `read_map find` among its readers. V10's prose is VAT-r4-03.
- `ExportOpts` gains `raised`, `retaining`, `links`, `wings`, `terrain`, `lights`, `trees` for the 3-D formats and `vtt.scene`'s `raisedWay`. Each matches a V09 §5.10 option, save the Picture tab's pins (VAT-r4-02).
- The out-of-range rule's `E_EXPORT_OPTION` has no V09 row and needs none, because the dialog never sends such a value. V10's `export` action opens the dialog and passes no options.
- `export.request { fmt, opts?, bundle? }` (§11.3) and §11.1 *Knowledge* agree. V08's bridge form is the host lane's.
- T-ER-19's out-of-range clause and T-ER-21 agree with §11.2 and §11.3.

**V09.**
- §2.7 passes the card's view.
- §2.12's rows are as above.
- §4.2 and row 21 are R4-02's.
- §4.21.10 (7), (8) and (10) are R4-12's and R4-02's, with V04's and V05's ends.
- §4.21.11 (2) is R4-10's phrase. T-V9-84 and row 89 agree.
- §4.21.12 (4) reads `looks` with the building. (5)'s Show is VV910-r4-02 (peer), and the `ruinedFor` forms are VV910-r4-01 (peer).
- §4.21.13 (1) has the roofless case and `storeyGone`; (2) is VAT-r4-04; (3) reads `PlanDamage.look`.
- §5.8 matches the card fields of §2.7.
- §4.21.9 (1)'s catch-up wording is VV56-r4-01 (peer).

**V10.**
- §2.13's `view?` opts, `LookAnswer.crises.looks[].over` and the festivals' standalone gap.
- §3.5's look read with `building` and the `why` tool's view.
- §3.9's query.
- §3.9a's entry week (R4-03), the take-over and "a restoring re-cut minted".
- §3.9b (8)'s read and *A house under a disaster look*.
- §3.17's projection row.
- §3.23 rows 14, 26 and 34, and C10.
- T-V10-49, -52 and -53.
- §3.9b (7) is VAT-r4-03, and row 34's non-building `building` is VV910-r4-04 (peer).

## Hand-offs of this round, at their destination

| from → to | hand-off | at destination |
|---|---|---|
| rendering (R4-02, END) → V09, V05, V04, model | the working layer drawn whatever its visibility; Go there writes nothing | closed (above) |
| rendering (R4-05, END) → V10, V09, V07 | the view-bound `why` | closed for the kinds' providers. Not extended to the section providers: VAT-r4-01 |
| rendering (VV910-r3-02 END, R4-04 (c)) → V09, V10 | `looks` with `building`, `over` | closed (V09 §4.21.12 (4); V10 §2.12, §2.13, §3.5, §3.9b (8), row 34, C10) |
| V09 (VAT-r3-02 END) → V09 §2.7 | `WhyCardModel` passes the view | closed |
| determinism (VEW-r3-01 END, R4-09) → §7.1 → V09 §4.9 | `bend.raised.underSpan` with its V09 row | closed (l. 10593; V09 l. 2094) |
| determinism (VDC3-01) → V09 §4.21.14 (4), row 93 | the press while a spell is in force | closed; its silent no-op is VDC4-07 (peer) |
| adjudicator (R4-10 sweep) → V09 §4.21.11 (2) | the settle phrase | closed (l. 3579–3581) |
| adjudicator (R4-12 sweep) → V09 §4.21.10 (8) | the frame's listing | closed. V10's own restatement, which R4-12 left as "already passing the week": VAT-r4-03 |
| repair-r4-V09 HAND-OFF → rendering | `live.crises`' marks read for Show's frame | open as VV910-r4-02 (peer) |
| repair-r4-V10 HAND-OFF → V07 | `opts.view` for V07 §4.5's rows | closed (V07 l. 3096–3097, W74). The end's hand-over is VV78-r4-01 (peer) |
| repair-r4-determinism HAND-OFFS → rendering §8.4 (i), V09 §4.21.14, pipeline §4.3 | the fades, the waiting button, no open span | open as VDC4-02, VDC4-07, VDC4-03 (peers) |
| R4-03 (sweep) → V09 | a restoring re-cut's minted elements | not named by R4-03's sweep. V09 §4.21.13 (2) and row 92 keep the narrower form: VAT-r4-04 |

## Issues

### VAT-r4-01 — major · MATRIX-GAP · owner rendering

**Claim.** The why card's `plan` section reads its damage at the view's drawn week, but no interface carries that week to the provider that writes the rows. Missed subject: the view-bound `why` for section providers.

Three units read the rows at the drawn week:
- V03 §5.6 (2) (d) (l. 2718–2721): `own` is for "the `plan` section's rows (V03 §4.6) … The week is the drawn week of the view or the export (§2.9's `week`; a scrubbed frame's, V06 §3.15.2), so scrubbing history shows one plan aging".
- V09 §2.12's damage-lines row (l. 1010) derives the lines "at V06's `decayLevel` for the drawn week" for "the plan panel; the why card's `plan` section". V09 §4.21.13 (1) gives the head line "the whole years of its decay run at the drawn week".
- V10 §3.9a's `info.damage.head.<state>` row (l. 1838) gives "the whole years of its decay run at the drawn week".

No producer exists:
- Those rows come from V03 §4.6's `plan` `WhySectionProvider` (l. 2377–2387: "read from `PlanDamage` at the own level"). `planDamage(doc, b, plan, view: ViewState, opts)` needs a view.
- V10 §2.13 types the section provider as `rows(model: ModelView, id: Id, key: Knowledge)` (l. 990), with no view and no week.
- R4-05 gave the view only to the kind's `WhyProvider.explain` (`opts.view`). §11.2's `why` comment (l. 16288–16290) and V10 §3.9's query (l. 1642–1645, "then appends the rows of every registered `WhySectionProvider`") pass nothing to the sections.

So the input that V03, V09 and V10 name has no producer (principle (7)). At a scrubbed week — a normal timeline path (V06 §3.15.2; T-V9-83 (e) scrubs) — the plan panel shows the scrubbed week's damage. One builder of the provider then reads the document's current week, and another cannot build the call at all. The card's `Inside` section and the clerk's damage answer differ from the panel beside them. No bar covers it: T-V9-86 and T-V10-53 run at the head only.

**Required change.** One fix at the view-bound `why`'s home, with three END lines.
- **§11.2's `why` member** (l. 16288–16290). After "… a provider that states no view's look ignores it" add: "; a section provider whose rows are read at the drawn week — V03 §4.6's `plan` damage rows (V03 §5.6 (2) (d)) — reads that view's `week`, and with no view the document's current week (§2.9's `week` default)".
- **END at V10 §2.13** (l. 989–990). `rows(model: ModelView, id: Id, key: Knowledge): WhySection['rows']` → `rows(model: ModelView, id: Id, key: Knowledge, opts: { view?: WhyProvider's opts.view /* the same view the kind's provider is passed (§11.2's view-bound why); a section whose rows read the drawn week — V03 §4.6's plan damage rows — reads view.week, else the document's current week */ }): WhySection['rows']`.
- **END at V10 §3.9's query** (l. 1644). "then appends the rows of every registered `WhySectionProvider` whose `appliesTo` holds" adds "— each passed the same `opts.view` —".
- **END at V10 §3.23 row 14.** Its no-view outcome adds "the `plan` section's damage rows at the document's current week".
- **END at V03 §4.6's `plan` damage rows** (l. 2377–2378). "read from `PlanDamage` at the own level (V03 §5.6 (2) (d))" adds "at the why's view's drawn week (`opts.view.week`, V10 §2.13; §11.2's view-bound `why`), else the document's current week".
- **END at V09.** T-V9-86 adds: "at a scrubbed week (V06 §3.15.2) the why card's `plan` section shows that week's own-level lines and head years, as the plan panel does".

### VAT-r4-02 — major · DISAGREE · owner rendering

**Claim.** A picture export draws a map's pins by default in one unit and never by default in the other.

V09's side:
- V09 §5.10's Picture tab (l. 4037) offers "pins and public notes on · off (off by default)".
- V09's entity table (l. 4137) says pins are "never in pictures unless "Show pins" is on in the Picture tab".

The base's side:
- §11.2's `ExportOpts` claims to declare "every option an export reads … written by V09 §5.10's dialog" (l. 16197–16198), but has no member for that option.
- `ExportOpts.furniture` is "the picture's furniture (§9.5): default true" (l. 16219).
- §9.5's furniture list includes the **Annotation layer** ("numbered markers and a separate legend sheet", l. 15067). The measure tool's result "can be saved as an annotation" (§9.5), and V09 §4.19 writes that annotation as a view pin ("**Save as annotation** writes a view pin labelled with the measure").

So an exporter built from §11.2 draws the annotation layer — the view pins — in every default picture. V09 offers the opposite default, and the switch V09 shows has no member to carry it. This is two units with two outcomes for one case (a picture of a map that holds pins), the class R3-03 grades major. The member is also missing, which is VRC2T-12's class.

**Required change.**
- **§11.2's `ExportOpts`**, after `furniture?`, adds `pins?: boolean;   // a picture (PNG, SVG, print): §9.5's annotation layer — the view pins and public notes (§2.9; V09 §4.19), drawn as the view draws them — over the map with the furniture; default false (V09 §5.10's "pins and public notes": never in a picture unless asked)`.
- `furniture?`'s comment reads "the picture's furniture (§9.5), the annotation layer excepted (`pins`): default true".
- **§9.5's** *Annotation layer* bullet adds "(the view pins, §2.9; V09 §4.19 — in a picture only with `ExportOpts.pins`, §11.2)".
- **END at V09.**
  - l. 4137's "never in pictures unless "Show pins" is on in the Picture tab" → "never in pictures unless the Picture tab's **pins and public notes** is on (§11.2's `ExportOpts.pins`)".
  - §5.10's Picture options cell, "pins and public notes on · off (off by default)", adds "(`ExportOpts.pins`)".
- T-ER-19 adds "a picture of a map holding view pins with `pins` absent and true: no annotation drawn, then every pin drawn".

### VAT-r4-03 — minor · DISAGREE · owner V10

**Claim.** V10 restates Find at a drawn week in the form R4-12 superseded. R4-12 amended R3-24's "restricted to the entities that frame holds" to §11.2's frame listing (l. 16455–16464): "a building matches by its use at that week, never its head use, and an entity or use the frame holds matches though the head has since closed, moved or demolished it". V09 §4.21.10 (8) now reads so. V10 keeps the old wording at three sites:
- §3.9b (7) (l. 2002–2005): "each chip counts, lists and gaps only the entities that frame holds";
- §3.23 row 32: "each chip counted, listed and gapped over that frame's entities alone";
- T-V10-51: "they equal the panel's over that frame's entities".

R4-12 left V10 unchanged as "already passing the week": `read_map find` reads §11.2's gazetteer with `week`, so nothing built changes. The prose is the narrower restatement.

**Required change.**
- **§3.9b (7).** "each chip counts, lists and gaps only the entities that frame holds — a chip with none there counting 0 for that week" → "each chip counts, lists and gaps §11.2's listing at that week — the frame's matches, by the uses it holds open then, so a building matches by its use at that week, never its head use — a chip with none there counting 0 for that week".
- **Row 32.** The outcome "each chip counted, listed and gapped over that frame's entities alone" → "each chip counted, listed and gapped by §11.2's listing at that week (the frame's matches, a building by its use then)". Its edge "(a scrub to before a matched building was built)" adds "or before a matched building's use changed".
- **T-V10-51.** "they equal the panel's over that frame's entities" → "they equal the panel's — §11.2's listing at that week, a building matched by its use then".

### VAT-r4-04 — minor · DISAGREE · owner V09

**Claim.** V09 §4.21.13 (2) (l. 3697–3699) gives the restored case as "an element the plan gained after its damage left is drawn as built (V06 §3.23 (3)'s per-element peak)". Row 92 (l. 1612) has "a restored building, re-cut or extended after its repair" with the same outcome.

R4-03 adds a second case: an element that a restoring event's re-cut mints, drawn as built while that restoration runs, and never patched. It is written at:
- V03 §5.6 (2) (l. 2702–2706: "or minted by a restoring re-cut, is drawn as built — never damaged by that restoration nor repaired");
- model §2.6 step 7;
- V10 §3.9a (l. 1855–1856: "or that a restoring re-cut minted, never among them").

R4-03's sweep did not name V09, so V09's twin of V10's sentence keeps the narrower form. V09 draws through V03's `planDamage`, so nothing built changes.

**Required change.**
- **§4.21.13 (2).** "and an element the plan gained after its damage left is drawn as built (V06 §3.23 (3)'s per-element peak)" → "and an element the plan gained after its damage left, or that a restoring event's re-cut minted, is drawn as built — never damaged by that restoration nor patched (V03 §5.6 (2); V06 §3.23 (3))".
- **Row 92.** The edge "a restored building, re-cut or extended after its repair" adds "or re-cut by its restoring event while its `repair` Works runs". Its outcome "an element the plan gained after its damage left drawn as built (V06 §3.23 (3))" → "an element the plan gained after its damage left, or a restoring re-cut minted, drawn as built (V06 §3.23 (3))".

## Confirmed here, already raised by a landed round-4 peer (not raised again)

| defect seen in this lane | raised as | by |
|---|---|---|
| §2.9 types `workingLayer` as "an underground depth band" against V09 §2.4's `WorkingLayer` and canon V09-XCONF-1 | VAL-R4-01 | verify-agree-layers-r4t |
| §7.7 item 1 and V08 still say "the layers shown" for the host's command | VRC4T-07; VRC4T-08 | verify-rendering-r4t |
| §8.8's device-pixel-ratio change without R4-10's 10 s limit | VRC4T-01 | verify-rendering-r4t |
| the out-of-range `squareM` tie and non-finite members; `supplyLink` absent from §11.1's GeoJSON row | VRC4T-03; VRC4T-02 | verify-rendering-r4t |
| §11.2's drawn-week listing read "from the generation worker's Find index" | VRC4T-04 | verify-rendering-r4t |
| `live.crises`' marks carry no look for V09's **Show** | VV910-r4-02 | verify-vol-V09-V10-r4t |
| `info.crisis.ruinedFor` has one form for a preview, an open or an unnamed look | VV910-r4-01 | verify-vol-V09-V10-r4t |
| a town field's "bare" has no reader input | VV910-r4-03 | verify-vol-V09-V10-r4t |
| `read_map look` with a non-building `building` | VV910-r4-04 | verify-vol-V09-V10-r4t |
| V09 §4.21.9 (1)'s catch-up wording | VV56-r4-01 | verify-vol-V05-V06-r4t |
| the pressed spell's fade for snow, leaves and shimmer; the button enabled while a press waits | VDC4-02; VDC4-07 | verify-determinism-r4t |
| `bend.wall.aqueductArch` against `bend.wall.raisedCrossing` for one crossing; no open span; the held stretch's writers | VDC4-06; VDC4-03; VDC4-04 | verify-determinism-r4t |
| §6.3 *Plan damage* and §8.6 / V02 lack the entry week | VDC4-01; VAF-R4T-03 | verify-determinism-r4t; verify-agree-fabric-r4t |
| V07's end crisis line without the hand-over; V07 §5.5's Find at a drawn week | VV78-r4-01; VAF-R4T-02 | verify-vol-V07-V08-r4t; verify-agree-fabric-r4t |

## Checked and agreeing

- **The working layer (R4-02).** One rule appears in §8.4, §2.9, §9.2, §11.2's `ExportOpts.layers`, V09 §4.2, §2.12, §1b, row 21, row 88, §4.21.10 (8) and T-V9-83 (g), V04 §4.1 and §5.1, and V05 §5.6 (3), its edge row and its bar: a view key per viewer that writes nothing, and a viewer switches as an owner does. V10's `useTool` acts "on that mode's working layer (V09 §4.2)". §9.5's Find and owner item 120 (a) hold.
- **The view-bound `why` for the kinds' providers (R4-05).** §11.2, *Knowledge*, V10 §2.13, §3.5, §3.9 and row 14, V09 §2.7, and V07 §4.5 / W74 agree. The village rows read `opts.view`, and a building's crisis row stays V09's, from `looks` with the building.
- **`looks` with a building.** §11.2's `over` predicate is the one V09 §4.21.12 (4), §4.21.13 (3), V10 §3.9a, §3.9b (8), row 34 and C10 read. A preview never hands over.
- **The re-read triggers.** V09 §2.12's crisis-card, `crises` and damage-lines rows re-read at least whenever §8.2's `live.crises` re-runs.
- **The bends.** §7.1's three new rows, V09 §4.9's rows and §4.20.2 (4), T-V9-52 and V10's generic mapping agree. `refuse.table.required` agrees in §7.1, V09 and V11.
- **The host's commands.** §11.3, T-ER-21 and V09 row 94 agree: the week by `view.set`, the selection a command, a layer's visibility a logged `setLayer`. Per-viewer keys (`workingLayer`, `find`, `crises`) never cross.
- **The resolution timing (R4-10).** V09 §4.21.11 (2), row 89, T-V9-84 and §12.5 carry the settle phrase.
- **`ExportOpts`.** It matches V09 §5.10, save the pins (VAT-r4-02).
- **Item 126 (a2).** No phone clause in the four members.
