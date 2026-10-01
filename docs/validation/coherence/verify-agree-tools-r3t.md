# Agreement check, round 3 — the tools (determinism, rendering, V09, V10) after assemble-r3

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-agree-tools-r3t; covered by the whole-design retrovalidation (J84).

> **PROGRESS** — [x] brief read whole · [x] resume check (fresh: no output, no LANDED line) · [x] round-2 findings re-checked against the live text (6 of 6) with every END line's second end · [x] repair-r3-touched tool subsections re-read whole · [x] hand-offs of this round at their destination · [x] issues written · [x] result saved · [x] LANDED

Live text read: base `593c657d…`, V09 `cfe4df19…`, V10 `382ea60e…`, V08 `bf9fa7be…`, V05 and V04 at assemble-r3's outputs — each confirmed by sha256 at the start, equal to assemble-r3's "after" column. The pre-round text is git `920d280d` (base `4ed292e9…`, V09 `23398a30…`, V10 `6efb987b…`).

## Scope and method

**Members.** determinism (§5–§7), rendering (§8, §9, §11, §12), V09 and V10.

**Subjects.** Edit events, dry runs, undo, the embedding API, the editor screens, the clerk's calls and its why-answers. This round the repairs that reach them are: the clerk's scratch commit (VAT-r2-01), the damage comparison (R3-04), the host's layers shown by `setLayer` (R3-21), the standing looks reaching the main thread through §11.2's new `looks` reader (R3-16), Find at a drawn week through the gazetteer's `week` (R3-24), E-07's `addUndergroundAccess` row with its three keys (VDC2-16 / VDC2-17), and the review ids in V09 (R3-02).

**What was read whole.**
- Base: §11.2 (the facade, `Query` with `looks` and `week`, `GazetteerAnswer`, `LooksAnswer`, *Knowledge*, *Find's match listing* and *At a drawn week*, *Confirming fates*, the call table); §11.3's *View state*, *The host's view commands* and *Roles*; §11.4; §11.6's T-ER-19 – T-ER-21; §7.1's touched rows (`drawWay`'s feet, the raised-way frame rule, E-07's `addUndergroundAccess` row); §7.4's `setLayer` row; §7.7 item 1 and DR44; §8.2's *Crisis looks* (the legend sentence, *The layer*) and *Find*; §8.4's `LayerSpec` and *Toggles are visibility*; §8.6's damaged plan; §9.5's legend and *Find*; II.7's toggle paragraph; §2.9's *View state*.
- V09: §2.10, §2.12's touched rows, §3.8 (3), §3.16 rows 21 and 87–94, §4.2, §4.3's T10 row, §4.9's new rows, §4.17's *A building's own way down*, §4.21.1 – §4.21.14 whole, §5.8, §5.10, the bars T-V9-22 and T-V9-83 – T-V9-87.
- V10: §1.2, §1b's touched rows, §2.3's `Knowledge`, §2.13 whole, §2.14's `LookAnswer` and `FindAnswer` rows, §3.5 whole, §3.9's query paragraph, §3.9a's damage part, §3.9b whole, §3.16's `dossier` row, §3.23 rows 26 and 32–35, §4.2, §4.6, §6.1's touched rows, T-V10-11, T-V10-45, T-V10-51 – T-V10-53, J-V10.125, J-V10.127, CVR-V10-22.
- Beyond the members, the ends this lane's subjects reach: V08's `setView` comment and §3.16 (4), (6) (g); V05 §5.6 (3); V04 §5.1's Find on Below; V07 §4.5's village `WhyProvider` and W74.
- The round's inputs: adjudication-r3 (R3-01 – R3-04, R3-16, R3-21, R3-24; Part H for determinism, rendering, V09 and V10 with their END lines); assemble-r3 (sections 1, 2.1, 8, 9); the four repair-r3 files' HAND-OFFS; the landed round-3 peers' results (verify-determinism, -kernel, -model, -pipeline, -rendering, -scope, -vol-V01-V02 … -vol-V11-V12).

**Diffs.** `git diff 920d280d` of the base (59 hunks in §5–§12), V09 (75) and V10 (43), mapped hunk by hunk to their live subsections; every touched subsection in the tool area was read whole.

**Scripted checks.**
- `R2-nn` / `R3-nn` in design text: base 0, V10 0, V09 0 outside §9's and §10's records.
- Residues of the retired layer path: `view.set` carrying a layer — none in the set; "layer … view state" — one, V10 §3.23 row 26 (VAT-r3-05).
- Every reader of the standing looks against §11.2's `looks` reader: V09 §4.21.8 (1), §4.21.12 (3)–(7), §1b's rows and §2.12's row; V10 §1.2, §1b.1, §2.13, §3.5, §3.9b (5), (8) — all cite it, none reads "the legend's entries".
- Every `query({ kind: 'why' })` call in V09 and V10 against §11.2's `why` member: none passes a view (VAT-r3-02).

**Not run:** `doc_checks.py` (this brief does not ask for it).

## Outcome

**Not clean: 6 issues — 1 blocker, 2 major, 3 minor.**
- By owner: V09 3, rendering 2, V10 1.
- By kind: NEW-PROBLEM 1, MATRIX-GAP 1, DISAGREE 3, NARRATION 1.

**Round 2.** All six round-2 findings are FIXED at their homes as ruled: VAT-r2-01, VAT-r2-02 and VAT-r2-03 per R3-04, VAT-r2-04 per R3-21 (a), VAT-r2-05 per R3-16 (a) and VAT-r2-06 per R3-02. Every END line of VAT-r2-04 and VAT-r2-05 is written at its second end (determinism, V08, V09, V10). No round-2 id persists.

**New this round (6).**
- **R3-21's `setLayer` reaches Find's Go there and a viewer's layer switch** (VAT-r3-01, blocker). V09 §4.2's END text makes the working-layer switch write a logged `setLayer`, and Find's **Go there** sets the working layer and shows a hidden layer. So a Find action now writes the edit log, against owner item 120 (a), §9.5 and V09's own (1). T-V9-83 (g) and (i) cannot both pass, and a viewer's switch needs an edit its role cannot send.
- **A village `WhyProvider` that reads view state has no way to receive it** (VAT-r3-02, major). R3-16 (e) makes V07's provider the one source of the village crisis line, and V07 already reads its season and festival rows "from view state". But §11.2's `why` carries no view, `WhyProvider.explain` takes none, and J-V10.125 says a why section cannot know the view's week.
- **The crisis card and the damage lines re-read on fewer triggers than the one evaluation they read** (VAT-r3-03, major). V09 §2.12 misses the `crises` key and commits, while §8.2's `live.crises` re-runs at both.
- **Three minors.** T-ER-21 calls the host's selection "view state that travels" (VAT-r3-04). V10 §3.23 row 26 still calls layer visibility view state (VAT-r3-05). V09 keeps four canon ids in its design text (VAT-r3-06).

## Round-2 findings — verdicts

| id | owner | verdict | where (live) |
|---|---|---|---|
| VAT-r2-01 | V10 | FIXED (Part H: FIX) | V10 §3.5 step 3 (l. 1455–1468): a filtered resubmission's `confirm` is confirmed on the scratch with that answer's own lists. The item, the model and the card keep the preview's filtered lists. Only a `conflict`, a `confirm` whose projection differs, or a confirmation that does not answer `ok` refuses. Also at T-V10-11's View as clause, J-V10.127, and §6.1's scratch row (+ one preview budget where the commit answers `confirm`). §11.2's `confirm(h, token, fates, renames)` and *Knowledge* ("a `confirm` result … unfiltered") give it its inputs. |
| VAT-r2-02 | V09 | FIXED per R3-04 (closes VAH-r2-04) | V09 §4.21.13 (1) (l. 3649–3651): "by §6.3 *Plan damage*'s comparison — an element shows damaged while the building's decay level is above 0 and at least its threshold t (a level of 0 damages nothing …)". Also §1b's and §2.12's damage rows, row 92 and T-V9-86 |
| VAT-r2-03 | V10 | FIXED per R3-04 (closes VAH-r2-05) | V10 §3.9a (l. 1818–1821): "is above 0 and at least the element's one keyed threshold — §6.3 *Plan damage*'s comparison …, so a level of 0 damages nothing"; §3.23 row 35; T-V10-53 |
| VAT-r2-04 | rendering | FIXED per R3-21 (a); ends written | §11.3 *The host's view commands* (l. 16512–16520): the layers shown are a `setLayer` sent by `doc.apply`, and `LayerSpec` is no view key. T-ER-21's outcome is the adjudicator's text. Determinism END: §7.7 item 1 (l. 11769–11771). V08 END: `setView` (l. 489), §3.16 (4) (l. 2425) and (6) (g) (l. 2496). V09 END: §4.2 (l. 1653) and row 21 (l. 1524). The fix's own new problem is VAT-r3-01. T-ER-21's selection wording is VAT-r3-04. §2.9's "layer choices" is VRC3T-02 (peer). V08's sender is VV78-r3-04 (peer). |
| VAT-r2-05 | rendering | FIXED per R3-16 (a); ends written | §11.2's `{ kind: 'looks'; view }` with `LooksAnswer` (l. 16122, 16154–16164), *Knowledge* (l. 16280–16281) and its call-table row (l. 16391). §8.2's legend sentence is in R3-16 (a)'s words; §9.5 names the reader. V09 END: §4.21.8 (1), §4.21.12 (3)–(7), §1b's rows and §2.12's row. V10 END: §2.13's projections, §3.5's `look` read, §1.2's §11.2 row (the §9.5 clause gone), §3.9b (5) and (8). |
| VAT-r2-06 | V09 | FIXED per R3-02 | No `R2-nn` / `R3-nn` outside §9's and §10's records (assemble-r3 section 8: 59 of V09's 63 removed, the four left in records). The same class's canon ids remain: VAT-r3-06. |

## Repair-touched subsections in scope — what was re-checked

**§7.1 (determinism).** `drawWay`'s `raised` comment now names the feet (`RaisedWayRecord.feet`), and a declared course beyond the frame bends to the outer ring (§2.7 *At the frame*). V09's canvas clamps a gesture past `bounds` before any event (row 67), and V10 clamps an anchor (C4), so neither sends such a course. The bend is the API's, and no tool restates it. E-07's `addUndergroundAccess` row names `bend.under.basement`, `refuse.under.basement` and `refuse.under.route`. V09 §4.9 has the three rows, each with `button.showWhy`, and V09 §4.17's new paragraph states the same outcomes. V10 §3.5 maps the bend as any `bend.*` row and the two refusals to its `rule` category. They agree.

**§7.7 (determinism).** Item 1's host commands follow R3-21. DR44's source word, regional clause and tier are the host lane's. Its admission "as a band-less reader" agrees with §11.2's `looks` admission and with V10 §3.9b (8)'s knowledge paragraph.

**§8.2, §8.6, §9.5 (rendering).** The legend sentence names the `looks` reader. `live.crises` runs over the model the view draws, and its re-run triggers are the reference for VAT-r3-03. §8.6 states the comparison as R3-04 rules. §9.5's Find says Go there is a view change, the reference for VAT-r3-01.

**§11.2 (rendering).** `looks` is in the `Query` union, in *Knowledge* and in the call table. `LooksAnswer` carries what V09's card, why lines, Find list and festival list and V10's projection read. The gazetteer's `week` and *At a drawn week* are read by `live.find`, V09's panel and V10's `read_map find` alike; the listing's semantics at a frame are VRC3T-01 (peer). `ExportOpts` is typed once; its remaining slips are VRC2T-12 / VRC3T-05 – -07 (peer). `edit`'s `onProgress` cites V09 §3.9 (VKr2-08 fixed).

**§11.3, §11.4, §11.6 (rendering).** `depthBand` is among the per-viewer keys that never cross (R3-21 (d)), and the host's commands follow R3-21. §11.4's `line` refusal is the host lane's. T-ER-21 is VAT-r3-04.

**V09.** §4.2 and row 21 (R3-21's END). §4.21.7 (2): a host's `view.set { week }` sets the drawn week, never `yearWeek` or the follow switch (R3-21 (b)). §4.21.8 (1) and §4.21.12 (3)–(8) read the `looks` reader. In (4), `{condition}`'s second read is VV910-r3-07 (peer). In (5), Show by the units' `FindArea` shapes, with Ask the assistant on the `drawer` entry. §4.21.10 (5), (7), (8): the chip glyph by (k − 1) mod 9, the drawn week passed to the gazetteer, and Go there, which is VAT-r3-01. §4.21.13 (1)–(3): the comparison, the `restored` head and the look's lines in the plan panel only. §4.21.14 (4)'s `settings.weather.noneNow`. §3.8 (3)'s `stopAfter` agrees with §11.2. §2.12's rows: VAT-r3-03.

**V10.** §3.5 step 3 (VAT-r2-01). §2.13: `LookAnswer` as projections of `LooksAnswer`; `FindAnswer`'s layers typed by §2.1's `Layer`; the festivals' standalone gap is VV910-r3-03 (peer). §2.3's new `Knowledge` equals §2.9's `knowledge` shape and V09's `ClerkMount.effectiveKey()` type. §3.9a's damage part and its head row (R3-06 / R3-08 (c) END). §3.9b (7)'s drawn week (VV910-r2-09's END). §3.9b (8)'s look read. §3.23 rows 32–35. §6.1's rows. T-V10-11, -51, -52, -53. The `crisis.look.<kind>` residues at §1.2, T-V10-29 and CVR-V10-22 are VV910-r3-04 / VV1112-r3-07 (peers). §3.23 row 26 is VAT-r3-05.

## Hand-offs of this round, at their destination

| from → to | hand-off | at destination |
|---|---|---|
| rendering (VAT-r2-04, END) → determinism §7.7 item 1 | the host's commands: week and selection by `view.set`, layers by a logged `setLayer` | closed (l. 11769–11771) |
| rendering (VAT-r2-04, END) → V08 | `setView`'s comment, §3.16 (4), (6) (g) | closed (l. 489, 2425, 2496). The client's missing `setLayer` sender is VV78-r3-04 (peer). |
| rendering (VAT-r2-04, END) → V09 | §4.2's layer controls by `setLayer`; row 21 | closed as text. Its consequence for Find and a viewer is VAT-r3-01. |
| rendering (VAT-r2-05, END) → V09 | §4.21.8 (1), §4.21.12 (3)–(7), §2.12's crisis-card row read the `looks` reader | closed. The row's triggers are VAT-r3-03. |
| rendering (VAT-r2-05, END) → V10 | §2.13's projections, §3.5's `look` read, §1.2's row | closed |
| V09 (VV910-r2-09, END) → V10 §3.9b (7) | `read_map find` passes the view's drawn week | closed (l. 1987–1990; T-V10-51; row 32) |
| rendering (VRC2T-18, END) → V10 §2.13 | `FindAnswer`'s layer unions cite §2.1's `Layer` | closed (l. 1026, 1030) |
| adjudicator (R3-06, R3-08 (c), END) → V09, V10 | `head.restored`; the run's years at the drawn week | closed (V09 §4.21.13 (1), §4.9; V10 §3.9a's head row) |
| repair-r3-V10 HAND-OFF → rendering | `LooksAnswer.festivals[].name?` absence | open as VV910-r3-03 (peer, V10 end) |
| repair-r3-V09 HAND-OFF → V10 | the `crisis.look.<kind>` residues | open as VV910-r3-04 / VV1112-r3-07 (peers) |
| repair-r3-determinism HAND-OFF → V09 §4.21.14 (4) | the timeline's pure-function inputs | open as VDC3-11 (peer) |
| R3-16 (e) → V07's village `WhyProvider` | the crisis line as the provider's row | written at V07 §4.5, but it has no input path: VAT-r3-02 |

## Issues

### VAT-r3-01 — blocker · NEW-PROBLEM · owner V09

**Claim.** R3-21's END for V09 §4.2 (l. 1652–1653) makes the working-layer switch write the document: "Switching layer also sets the layer's visibility on (§7.8's layer controls: `LayerSpec.visible`, written by `setLayer`, §8.4)". `setLayer` is a logged, undoable style event (§7.4's row). Find's **Go there** works through that same switch:
- V09 §4.21.10 (8) (l. 3514–3516): "Below sets the working layer to Below and `depthBand` …; Sky sets it to Sky, the island menu's `key` to the match's island and a hidden sky layer visible";
- V05 §5.6 (3) (l. 2319): "Go there turns its visibility on, as switching the working layer does";
- T-V9-83 (g): "**Go there** setting the working layer … (a hidden sky layer shown)".

The underground layer is hidden by default at every rung (II.7.1, D-3). So the common case, Go there on a Below match, now appends a `setLayer` to the edit log. This contradicts:
- owner item 120 (a): "Find never changes the model, the document, its hash or the edit log";
- §9.5's *Find*: "It sends no event and changes no model, document, hash or log … **Go there** sets the working layer and band … — view changes";
- V09 §4.21.10 (1): "It sends no event, preview or undo step and never touches … the log";
- V04 §5.1's Go there: "a view key, never an edit".

T-V9-83's (g) and (i) ("the document's hash, every digest and the log are unchanged by Find") cannot both pass. There is a second break. A viewer may never edit (§11.3 *Roles*: "A viewer's client never emits `doc.changed`"; §11.2: `edit` is an editing role's call). So a viewer's working-layer switch, or a viewer's Go there to a hidden layer, needs an event its role cannot send, and the set gives no outcome for it. Before this round V09 called the visibility "view state only", and the two paths did not meet. Grade: an owner rule contradicted where a builder following V09 and V05 would implement it, on a common path. At the least it is MAJOR (a bar that cannot pass).

**Required change.** The layer's visibility stays document style state, written only by a deliberate T12 `dress` toggle (R3-21). Neither Find nor a viewer writes it.
- V09 §4.2: "Switching layer also sets the layer's visibility on (§7.8's layer controls: `LayerSpec.visible`, written by `setLayer`, §8.4) and dims the other layers to 35 % opacity." → "Switching layer dims the other layers to 35 % opacity and writes nothing to the document. A layer whose `LayerSpec.visible` is false (§8.4: document style state, written only by T12 `dress`'s logged `setLayer`) stays hidden, and the switch shows `info.layer.hidden` ("{layer} is hidden on this map."). For a role that may write style (owner, editor; §11.3), it also offers **Show it** — T12 `dress`'s toggle, `setLayer { layer, spec: { visible: true } }`, its own undo step. A viewer gets no **Show it**."
- V09 §4.21.10 (8): "Sky sets it to Sky, the island menu's `key` to the match's island and a hidden sky layer visible (V05 §5.6 (3))" → "Sky sets it to Sky and the island menu's `key` to the match's island — view keys only, never a `setLayer` (item 120 (a)). On a hidden layer the flight lands on its ghost pins with V09 §4.2's `info.layer.hidden` and its **Show it**, which is T12 `dress`'s edit, not Find's."
- V09 §3.16 row 21's outcome "switching the working layer turns its visibility on (by `setLayer`, §8.4)" → "the layer stays hidden, with `info.layer.hidden` and, for an owner or editor, **Show it** (a logged `setLayer`); a viewer's switch writes nothing".
- T-V9-83 (g): "(a hidden sky layer shown)" → "(on a hidden layer `info.layer.hidden`, no event logged)". (i) stands.
- V09 §4.9 adds the row `info.layer.hidden`.
- V05 §5.6 (3) (END): "and Go there turns its visibility on, as switching the working layer does" → "and Go there leaves its visibility as it stands (V09 §4.2: visibility is document style, which only T12 `dress`'s `setLayer` writes), the flight landing on its ghost pins".

### VAT-r3-02 — major · MATRIX-GAP · owner rendering

**Claim.** R3-16 (e) rules that at THORP, HAMLET and VILLAGE `info.crisis.ruinedFor` "is the village `WhyProvider`'s answer row, shown once". V09 §4.21.12 (4) and §5.8 now show it only from that provider ("the card adding none of its own"). V07 §4.5 and W74 say the provider reads "§2.9's `crises` and `week` with DR44 at the viewer's key … never from the model". Its `info.village.season` and `info.village.festival` rows are also "read from view state and the dossier's schedule".

No interface carries a view into a why answer:
- §11.2's `why` member is `{ kind: 'why'; id; path?; mode?; historyPage? }`, with no view;
- V10 §2.13's `WhyProvider.explain(model, id, path, key, { mode, historyPage })` takes none;
- V10 §3.9 calls the provider "over the committed model with the caller's key";
- V09's `WhyCardModel` reads `query({ kind: 'why' })` with no view;
- J-V10.125 says it outright: "a `why` section is model-side and cannot know the view's week".

So the inputs of these three rows have no producer (principle (7)). One builder adds a view parameter. Another, following V10, cannot produce the rows, and the village card shows no crisis line at all — the case R3-16 (e) meant to settle.

**Required change.** One view-bound `why`, at the API's home:
- §11.2's `why` member: `{ kind: 'why'; id: Id; path?: string; mode?: 'asPlaced'|'asNow'; historyPage?: number; view?: ViewHandle /* a view-bound why: a provider whose rows state a view's look — V07 §4.5's crisis, season and festival rows — reads that view's §2.9 week, yearWeek, festival and crises and its looks evaluation (LooksAnswer) at the view's effective key; absent, no such row is given */ }`.
- *Knowledge* adds: "a `why` with a `view` admits its view-bound rows as `looks` does".
- V10 §2.13's `WhyProvider.explain` opts gain `view?: { week: number; yearWeek: number; festival: ViewState['festival']; crises: ViewState['crises']; looks: LooksAnswer }`. V10 §3.9's query paragraph adds "and, for a view-bound why, the view's state and `looks` answer". V10's `why` tool passes `ClerkSession.view` where present (§3.5).
- V09 §2.7's `WhyCardModel` reads `query({ kind: 'why', …, view })` with the card's view.
- V07 §4.5 and W74 cite `opts.view` for the three rows.

### VAT-r3-03 — major · DISAGREE · owner V09

**Claim.** V09's crisis card, why lines, legend entries and Find list read §11.2's `looks` reader. By §11.2 that reader is "the one evaluation `live.crises` draws". §8.2 re-runs that evaluation "when the week crosses a condition's edge …, the crisis display or the key changes, the model the view draws changes (a commit, or the week crossing to another frame)". V09 §2.12's rows re-read it on fewer triggers:
- l. 1005 (card and why lines): "rebuilt at each week change, absorb and `onEffectiveKey`" — no `crises` change, no commit;
- l. 1008 (damage lines, whose plan-panel look lines read the look's `districts` and `lookLevel`): "at each `doc.changed` naming the building, each week change and each `onEffectiveKey`" — no `crises` change.

Two normal paths diverge.
- **Preview a crisis**, or **Show crises** off, changes `crises`. The map draws the new looks while the card, Find's list and the plan panel keep the old ones — though V09 §4.21.12 (2) and (4) promise the preview's line.
- A commit that splits or merges a struck district changes a disaster's units "at that commit" (V01 §3.16). The map draws the new districts while the card's `facts` row and the plan panel's look lines keep the old list until the next week change.

The row defines a stale outcome for each case. One builder follows it, another follows §8.2.

**Required change.**
- V09 §2.12 l. 1005's last-but-two cell: "rebuilt at each week change, absorb and `onEffectiveKey`" → "re-read whenever the evaluation §8.2's `live.crises` runs changes: each change of §2.9's `week` or `crises` (**Show crises**, **Preview a crisis**), each `doc.changed` (a commit, an absorb, an undo or redo, a regenerate — an edit that splits or merges a struck district changes a disaster's units at that commit, V01 §3.16) and each `onEffectiveKey`".
- l. 1008 adds "; for the plan panel's look lines, at each re-read of §11.2's `looks` reader (the row above)".
- T-V9-85 adds: a preview picked and the switch turned off with the card open each update the card and Find's list at once, and a district split on a dossier fixture with a disaster standing updates the card's `facts` row at that commit.

### VAT-r3-04 — minor · DISAGREE · owner rendering

**Claim.** T-ER-21's outcome for the host's commands (l. 16624) reads "the week and the selection view state that travels, the layers a logged `setLayer` — never an input", in the words adjudication-r3's note gives. §11.3, the home, says the opposite of the selection: `view.set { select: ids }` "selects those entities as a user's list pick would … and reports the selection by `entity.selected`; a command, never a stored key". It is no §2.9 view key, so it neither persists nor travels as `view.changed`. The bar's own fixture ("the document replays byte-identically without the host") passes either way. A test writer checking the stated outcome would look for a travelling selection that the bridge never sends.

**Required change.** T-ER-21's outcome: "the week and the selection view state that travels, the layers a logged `setLayer` — never an input" → "the week view state that travels, the selection a command (the frame selects and reports `entity.selected`; never a stored key), the layers a logged `setLayer` — never an input".

### VAT-r3-05 — minor · DISAGREE · owner V10

**Claim.** V10 §3.23 row 26 (l. 2678) gives "a layer off" the outcome "layer visibility is view state and never filters a read, which admits by key". By R3-21 (a), §8.4 and §7.4, layer visibility is `LayerSpec.visible`, the document's style state, written by a logged `setLayer`. V10's own §4.1 T12 encoder writes exactly that event, `setLayer { layer, spec: { visible } }`. The outcome that counts — a hidden layer never filters a read — is the same either way. The classification is the retired one.

**Required change.** V10 §3.23 row 26: "layer visibility is view state and never filters a read, which admits by key" → "layer visibility (`LayerSpec.visible`, the document's style state, written by a logged `setLayer`, §8.4) never filters a read, which admits by key".

### VAT-r3-06 — minor · NARRATION · owner V09

**Claim.** R3-02 (principle (5)) keeps review-process ids out of design text, and VAT-r2-06's fix removed every `R2-nn` from V09. Assemble-r3's census (section 8) leaves four canon conflict and agreement ids in V09's design text for the verifiers:
- l. 598 "(V09-XAGREE-1)";
- l. 2120 "(V06-AGREE-1)";
- l. 3283 "(V09-ICONF-4's rule)";
- l. 3844 "(V09-ICONF-4)".

Each stands beside its design home, which already gives the rule. The base's six sites of the class are VDC3-08 (peer). No rule changes.

**Required change.**
- l. 598: "is V11 §4.2's (V09-XAGREE-1):" → "is V11 §4.2's:".
- l. 2120: "V06 §3.19.3 (6) and V06 §4.2 (V06-AGREE-1)" → "V06 §3.19.3 (6) and V06 §4.2".
- l. 3283: "one channel per cue (V09-ICONF-4's rule); the" → "one channel per cue; the".
- l. 3844: "carries the goods family only (V09-ICONF-4)." → "carries the goods family only."

## Confirmed here, already raised by a landed round-3 peer (not raised again)

| defect seen in this lane | raised as | by |
|---|---|---|
| §2.9's *View state* still lists "layer choices" against R3-21 (a) | VRC3T-02 | verify-rendering-r3t |
| V08's `MapSession` has no call that sends the host's `setLayer` | VV78-r3-04 | verify-vol-V07-V08-r3t |
| §11.2 *At a drawn week*: a match by its use then, and a frame's own uses the head lacks | VRC3T-01 | verify-rendering-r3t |
| V01's `gapUnits` and §5.4 (6) framing take no drawn week | VV12-r3-03 | verify-vol-V01-V02-r3t |
| V10's `LookAnswer.festivals` standalone against DR43's empty list; `name?` absence | VV910-r3-03 | verify-vol-V09-V10-r3t |
| V10 still names the deleted `crisis.look.<kind>` family (§1.2, T-V10-29, CVR-V10-22) | VV910-r3-04; VV1112-r3-07 | verify-vol-V09-V10-r3t; verify-vol-V11-V12-r3t |
| V09 §4.21.12 (4) reads `{condition}` a second time, by the overlay's binding key, beside `LooksAnswer.crises[].name` | VV910-r3-07 | verify-vol-V09-V10-r3t |
| Show frames a look with no camps and no units | VV910-r3-01 | verify-vol-V09-V10-r3t |
| §2.7's support step's two new bends have no E-07 row and no V09 row | VDC3-05; VDC3-06 | verify-determinism-r3t |
| the base's six canon ids in §5–§7 | VDC3-08 | verify-determinism-r3t |
| E-07's table-row delete lacks V11's named row; V09's `refuse.table.required` the same | VV1112-r3-04; VV1112-r3-05 | verify-vol-V11-V12-r3t |
| the idle settle in §12.5, T121-2 and T-V9-84 | VRC2T-08; VRC3T-03; VRC3T-04 | verify-rendering-r3t |
| `ExportOpts` against V09 §5.10, its ranges, `BoxCm`, `export.request`'s duplicated fields | VRC2T-12; VRC3T-05 – VRC3T-07 | verify-rendering-r3t |
| V09 §4.21.14 (4)'s replay inputs; row 93's shimmer hour | VDC3-11; VV910-r3-06 | verify-determinism-r3t; verify-vol-V09-V10-r3t |

## Checked and agreeing

- **The scratch commit.** V10 §3.5 step 3, T-V10-11, J-V10.127 and §6.1's row agree with §11.2's `confirm`, *Confirming fates* and *Knowledge*. V10 §4.2 (1) keeps its unfiltered preview and its projection compare.
- **The damage comparison.** One statement or citation of §6.3 *Plan damage* in §8.6, V09 §4.21.13 (1), its rows and bar, and V10 §3.9a, row 35 and T-V10-53. The withheld-building rule in V09 matches V10's (the room-naming rows and the crypt row leave together).
- **The host's commands.** §11.3, §7.7 item 1, V08 (three sites), V09 §4.21.7 (2) and row 94 give one reading: the week and the selection by `view.set`, the layers by `setLayer`, and the per-viewer keys (`depthBand` among them) never cross.
- **The standing looks.** §11.2's `looks` reader is the one source for the legend (§8.2, §9.5), V09's controls, card, lines, Find list and festival list, and V10's look read. The admission is DR44's at the view's effective key. The disaster districts come from the generation worker, never from V01 on the main thread.
- **Find at a drawn week.** The gazetteer's `week` is passed by `live.find`, V09's panel (with its index's week trigger) and V10's `read_map find` (row 32, T-V10-51, §6.1).
- **E-07's underground rows.** Three keys, three V09 rows, V09 §4.17's flow and V10's categories.
- **The run controls.** `Progress`' seven waits, `signal`, `stopAfter` and `onProgress` ('undo' citing V09 §3.9) agree with V09 §3.8 (3), §4.21.9 and the `progress.*` rows.
- **The clerk slot.** `ClerkMount.effectiveKey()` returns §2.9's `knowledge` shape, which equals V10 §2.3's new `Knowledge`. The crisis card's Ask the assistant uses `send(text, 'drawer')` with no attachment, as V10 §3.1's entries allow.
- **Item 126 (a2).** No phone clause in the four members.
