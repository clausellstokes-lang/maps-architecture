# Agreement check, round 5 — the dossier and the host (determinism, V08, V09, V10, V11) after assemble-r5

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-agree-host-r5t; covered by the whole-design retrovalidation (J84).

> **PROGRESS** — [x] resume check (no output, no LANDED line: fresh start) · [x] brief read whole · [x] inputs (round-4 report and result, adjudication-r5 R5-01–R5-10 and Part H with its END lines, assemble-r5 hashes = live, the round-5 work rows of the merged-into ids, the repair-r5 HAND-OFFS, the seven landed r5t peers' results) · [x] round-4 findings re-checked on live, END lines' second ends included · [x] round-5 text of the five members read at every cross-member statement · [x] hand-offs checked at their destinations · [x] new issues written · [x] result saved · [x] LANDED

## Scope and method

Members: determinism (base §5–§7), V08, V09, V10 and V11. The live text is assemble-r5's output, checked by sha256:
base `2d84eac2…`, V08 `8b5b5243…`, V09 `7c91d3bf…`, V10 `847b3189…`, V11 `b1445a5f…` (V02 `fb46c676…`, V03 `3fe82c82…`,
V06 `6fb1f641…` where a member's statement meets them). The pre-round text is git `3310b53` (base `5f34cceb…`, the text
the repairs were written against).

1. **Round-4 findings.** VAH-r4-01 to VAH-r4-04 were re-checked at every site their required change names, against
   Part H's disposition and the ruling it cites (R5-04 amended with VAT-r4-04's row-92 edge; R5-05 for VAH-r4-02, merged
   into VAT-r4-03; R5-07 (d) for VAH-r4-03 and -04), and at each second end: §6.3 (VDC4-01), §8.6's lead (VAF-R4T-03),
   T-ER-28 and V02 §5.7 (2) for R5-04; §11.2 *At a drawn week*'s reader list, V10 §3.23 row 32 and T-V10-51's timing cell
   for R5-05.
2. **Round-5 text.** Pre → live word diffs of each member, every hunk: the base (85 hunks; the determinism hunks of §5.3,
   §5.4, §6.3, §6.5, §7.1, §7.3, §7.4 and §7.7 read whole, the rest where a member meets them), V08 (29), V09 (35), V10
   (19) and V11 (8). Read whole where a hunk meets another member: §4.11 *The clock* (4); §7.1's `dossierFacts`, its
   raised-way and catch-all outcome rows and its required-row refusal; §7.4's `dossierFacts` and raised-way rows; §7.7's
   `DossierBinding`, item 6 and item 10; §2.9's `workingLayer`; §8.2 *The layer* and §8.4 (i)'s fades; §11.2's `looks`
   and `why` members, `LooksAnswer` and *At a drawn week*; §11.3's view state; §13.2's T76-1 and T125-1; §14's port types
   and port items 2–5; V08 §2.3, §2.4's table lead, §2.7's lifecycle table, §3.5's diff, §3.6 (2)–(7), §3.16 (8), §3.17's
   rows, §4.6's `unreceipted_change` and `field_fallback` rows, §5.5, ## 6's catch-up row, §7.1's fixtures, W20, W101,
   T-V8-49, T-V8-61, T-V8-63, J-V8.54, J-V8.55; V09 §1b's Find and crisis rows, §2.12's working-layer and crisis rows,
   rows 21, 90, 92, 93, §4.2, §4.9's `bend.*`, `info.crisis.*` and `settings.weather.*` rows, §4.20.2 (4), §4.21.9 (1),
   §4.21.10, §4.21.12, §4.21.13, §4.21.14, §5.8, §5.10, §5.15, T-V9-52, T-V9-80, T-V9-83, T-V9-85 – T-V9-87; V10 §1b.1,
   §2.12, §2.13 (`WhyView`, `WhyProvider`, `WhySectionProvider`, `LookAnswer`, `FindAnswer`), §3.5, §3.9, §3.9a, §3.9b
   (7)–(8), rule 21, §3.23 rows 14, 32, 34 and C10, T-V10-50 – T-V10-52, C4's row; V11 row 80, §3.24.2, §3.25.11's weather
   rows, EI-V11-EDGE-3, J-V11.113.
3. **Seams checked:** the late dossier change and the held calamity (§4.11 (4), §7.1, §7.4, §7.7, V08 §2.3, §2.7, §3.6
   (3), (4), (6), §3.17, §4.6, W20, T76-1, T-V8-49 (g)); the absorb fallback (§7.7 item 10, §14's `field_fallback`, V08
   §2.4, §3.5, §3.16 (8) (c), §3.17, T-V8-61 (a)); the cadence's carried population (V08 §3.6 (3), §3.17, T-V8-61 (a));
   `select`'s two refusals and the minted key (§14, §7.7 item 12, V08 §2.4); the host's view commands (§11.3, §7.7, V08
   §2.2, W101, §3.16 (4), (6) (g)); the plan's damage comparison (§6.3, §8.6, V09 §4.21.13, row 92, V10 §3.9a); Find at
   a drawn week (§11.2, V09 §1b, §4.21.10, V10 §3.9b (7), row 32, T-V10-51); the crisis lines' forms, the famine `field`,
   the marks' look (§8.2, §11.2, V09 §4.21.12, §5.8, V10 §2.13, §3.9a, §3.9b (8), row 34, T-V10-52); the view-bound why
   with the section providers' view (§11.2, V10 §2.13, §3.9, row 14, V03 §4.6, V09 §5.8, T-V9-86); the working layer
   (§2.9, V09 §2.4, §4.2, §2.12, row 21, V10's `useTool`); the raised-way bend rows (§7.1, V09 §4.9, §4.20.2 (4), T-V9-52,
   V11 §3.24.2); the required table rows (§7.1, V11 §4.1, EI-V11-EDGE-3, J-V11.113, V09's `refuse.table.required`); the
   catch-up batch (V08 ## 6, §3.6, T-V8-63, V09 §4.21.9 (1), V06's T-V6-24); the weather press and fades (§6.1, §8.4
   (i), V09 §4.21.14, row 93, T-V9-87, V11 §3.25.11 — every `lengthS` lower end and the four climate overrides at least
   twice their kind's fade, by script). §7.7's DR rows and V08's field table carry no round-5 hunk (V08 §2.4's only hunk is
   its lead), so round 4's both-way script result stands.
4. **Peers.** Findings already raised by the seven landed round-5 peers are not repeated; I concur with them (list below).
   No design file was touched. doc_checks was not run (an agreement seat); assemble-r5's provisional checks stand, the
   reference corpus being incomplete in this checkout.

**Severity** follows J141 and R5-01: two members stating two outcomes for one case is major; a restatement that cites its
home and differs from it in form, a stale gloss, or a message key's wording, where a builder follows the home and nothing
built differs, is minor — the grade VAH-r4-04 kept for the same class at §14.

## Result

**3 issues**: 0 blockers, 0 majors, 3 minors.
* By owner: determinism 1, scope 1, V10 1.
* By kind: DISAGREE 2, HANDOFF-OPEN 1.

All four round-4 findings are closed: VAH-r4-01 is fixed at V09 as R5-04 amends it (VAT-r4-04's row-92 edge with it),
with its second ends at §6.3, §8.6, T-ER-28 and V02 §5.7 (2); VAH-r4-02 by VAT-r4-03 at its three V10 sites under R5-05,
§11.2's reader list naming every reader; VAH-r4-03 and VAH-r4-04 at §14 as written. Every END line landing in the five
members is written. The three new minors are this round's residues: R5-07 (a) — a field is a row's own path, a record's
sub-field read by its row and compared — reached V08 but not the base's two restatements of the absorb fallback (§7.7
item 10, §14's `field_fallback`), and V09's hand-off asking V10 to word a look over a building in the why card's
`ruinedFor` form is not closed at V10. No new major in my seams beyond those landed peers hold.

## Round-4 findings re-checked

| id | owner | verdict | where (live) |
|---|---|---|---|
| VAH-r4-01 | V09 | FIXED (R5-04, amended) | §4.21.13 (1) (l. 3702–3703) "compared from its entry week into the plan (V03 §5.6 (2) (a)–(b); for an element a restoring event's re-cut mints, the week that restoration ends, V06 §3.23 (3))"; (2) (l. 3721–3723) "or that a restoring event's re-cut minted, is drawn as built — never damaged by that restoration nor repaired"; row 92 (l. 1612) both the outcome and VAT-r4-04's edge "or re-cut by its restoring event while its `repair` Works runs". Second ends: §6.3 (base l. 10006–10008), §8.6's lead (l. 14117–14119), T-ER-28 (l. 14756, both texts), V02 §5.7 (2) (l. 3059, 3063) |
| VAH-r4-02 | V10 | CLOSED (MERGED into VAT-r4-03, fixed per R5-05) | §3.9b (7) (l. 2004–2007) "§11.2's listing at that week (*At a drawn week*: the frame's matches, by the uses it holds open then, so a building matches by its use at that week, never its head use)"; row 32 (l. 2709) the outcome and the use-changed edge; T-V10-51 (l. 3144) "— §11.2's listing at that week, a building matched by its use then, never its head use —" and VAP-r4-09's timing cell; `FindAnswer.count` (l. 1036). End: §11.2 *At a drawn week*'s reader list (base l. 16521–16522) |
| VAH-r4-03 | scope | FIXED (R5-07 (d)) | §14 port item 2 (base l. 19797–19799), the required text verbatim; V08 §2.4 *Selection*, B3, B5 and T-V8-14 agree |
| VAH-r4-04 | scope | FIXED (R5-07 (d)) | §14's `field_fallback` comment (base l. 19698) "(V08 §3.5: its path absent or its value of no form its row reads; an empty list is a value, compared as read)". Its R5-07 (a) residue is VAH-r5-02 |

## Issues

### VAH-r5-01 — minor · DISAGREE · owner determinism

**Claim.** R5-07 (a) amends R4-15 (a)'s reach: "a field is a row's own path — a top-level key or a whole list"; inside a
record the digest reads, "an absent or unreadable sub-field takes its row's reading … at an absorb as at a creation and is
compared as read, so a record follows what the dossier now says of it". V08 wrote it at §3.5's diff (l. 1681–1688), §2.4's
lead (l. 628), §3.17's two rows (l. 2632, 2710) and T-V8-61 (a) ("one whose condition drops `duration` clears its
`untilWeek`"; an institution returning `active` reopens). §7.7 item 10, the derivation table's index (base l. 12068),
still restates R4-15 (a) unqualified: "at an absorb a field that takes its fallback changes nothing, the carried fact
standing (V08 §3.5)". V08 itself notes a sub-field's fallback as one: §3.16 (8) (c) (l. 2611–2612) "a headcount of 0 or
less, or one that is no finite number, reads as none given, noted `field_fallback` with the field named". Read by §7.7's
words, an absorb whose force headcount turns unreadable keeps the carried size; by V08 §3.5 it reads as none given and the
look takes its next count. R5-07's sweep named V08's sites only. §7.7 cites V08 §3.5, which a port builder follows, so
nothing built changes; the index is wider than its home.

**Required change.** §7.7 item 10 (base l. 12068): "— at an absorb a field that takes its fallback changes nothing, the
carried fact standing (V08 §3.5);" → "— at an absorb a field that takes its fallback — a row's own path, a top-level key
or a whole list — changes nothing, the carried fact standing, while a record's absent or unreadable sub-field is read by
its row and compared, so the record follows what the dossier now says of it (V08 §3.5);".

### VAH-r5-02 — minor · DISAGREE · owner scope

**Claim.** The same R5-07 (a) residue at §14. `PortNote`'s `field_fallback` comment (base l. 19698) reads "a field the
port reads that the dossier lacks, leaves empty or gives unreadable (V08 §3.5: its path absent or its value of no form its
row reads; an empty list is a value, compared as read), its fallback taken — at an absorb the carried fact standing (V08
§2.4, V08 §3.5)". The note is also written for a record's sub-field (V08 §3.16 (8) (c): a force's headcount, "noted
`field_fallback` with the field named"), and at an absorb V08 §3.5 reads such a sub-field by its row and compares it
(R5-07 (a)), so the comment's "at an absorb the carried fact standing" states the opposite outcome for that note. The
note's emission and the diff are V08's, which §14 cites, so nothing built changes (VAH-r4-04's grade for the same
comment).

**Required change.** §14 l. 19698, the `field_fallback` comment: "its fallback taken — at an absorb the carried fact
standing (V08 §2.4, V08 §3.5)" → "its fallback taken — at an absorb, for a row's own path (a top-level key or a whole
list), the carried fact standing, and for a record's absent or unreadable sub-field its row's reading, compared (V08 §2.4,
V08 §3.5)".

### VAH-r5-03 — minor · HANDOFF-OPEN · owner V10

**Claim.** R5-08 (a) gave every crisis line form a key, and V09 §4.21.12 (4) words a look on the why card of a building it
stands over by `info.crisis.ruinedFor` "in the form the line takes: `ruinedForOpen`, `ruinedForUnnamed`,
`ruinedForUnnamedOpen`, or under a preview `ruinedForPreview`" (V09 §5.8 l. 4019–4020; T-V9-85 "For now: Ruined quarters —
a preview"; T-V9-86), then "Volume 10's explanation renders the same keys (one key, one sentence, J-V9.79)" (l. 3656).
repair-r5-V09's HAND-OFFS ask V10 for it: "V10's explanation of a building under a previewed `disaster` renders
`info.crisis.ruinedForPreview`". repair-r5-V10 lists no hand-off, and V10 names no `ruinedFor` key anywhere: §3.9a's
disaster bullet (l. 1868–1869) has the clerk tell the look over a building "from the look read asked with that building …
as the look it is", and §3.9b (8) (l. 2033–2035) words each look by its line (`info.crisis.line`, `.lineOpen`,
`.lineUnnamed`, `.lineUnnamedOpen`, `.preview`) — "the words the legend and the why card say (one key, one sentence,
J-V9.79)". For a building the look stands over, the why card says "For now: Ruined quarters, the mill-end fire, weeks
30–34" and the clerk "Ruined quarters: the mill-end fire, weeks 30–34": two keys for one case where both units claim one.
T-V9-86's V10 clause accepts any `info.crisis.*` key, so nothing tested changes; it is the clerk's wording.

**Required change.** V10 §3.9a's *A disaster's look* bullet: "which the clerk tells from the look read asked with that
building (its `over`, V10 §3.9b (8)) as the look it is" → "which the clerk tells from the look read asked with that building
(its `over`, V10 §3.9b (8)) as the look it is, in the why card's words: V09's `info.crisis.ruinedFor` in the form matching
the look's `says` (`line` → `ruinedFor`, `lineOpen` → `ruinedForOpen`, `lineUnnamed` → `ruinedForUnnamed`,
`lineUnnamedOpen` → `ruinedForUnnamedOpen`, `preview` → `ruinedForPreview`; V09 §4.21.12 (4)), its slots the look's".
§3.9b (8) *Explained.*: "the words the legend and the why card say" → "the words the legend and the crisis card say, and
for a building a look stands over the why card's `ruinedFor` form (V10 §3.9a)". T-V10-52's building clause: "tells the
look and the house's own damage rows apart" → "tells the look, worded `info.crisis.ruinedFor`, and the house's own damage
rows apart, and under a `disaster` preview a house of its units names it by `info.crisis.ruinedForPreview`".

## END lines and hand-offs checked at their destinations

* **END lines of my round-4 ids:** all written — §6.3 (VDC4-01), §8.6's lead (VAF-R4T-03), T-ER-28 and V02 §5.7 (2)
  (R5-04's ends) for VAH-r4-01; §11.2 *At a drawn week* (R5-05's rendering END) for VAH-r4-02 via VAT-r4-03.
* **Other END lines landing in the members:** determinism — §7.1's `bend.wall.raisedCrossing`, `bend.wall.held`,
  `bend.raised.underSpan` rows (D1), the catch-all (VDC4-06's end), §7.3's S7 row (D2), §7.4's raised-way row (D3), §5.3's
  gate row (D4), §7.7's `lateCalamities`, §7.1's `dossierFacts`, §7.4's `dossierFacts` row (R5-03); V08 — R5-03's §3.6 (3),
  (4), §3.17, §2.7 row and T-V8-49 (g), VAP-r4-05's fixture sentence; V09 — R5-02's §4.9 rows, `bend.raised.around`,
  §4.20.2 (4), T-V9-52, VAT-r4-02's l. 4164 and §5.10, VRC4T-02's §5.15 row, VAT-r4-01's T-V9-86 clause; V10 — VAT-r4-01's
  `rows` opts, §3.9's "each passed the same `opts.view`", row 14; VV910-r4-01's `says` list and row 34's edge; V11 —
  §3.24.2's two readers (R5-02). Each written as given; their open residues are peers' (below).
* **V09 → determinism** (name the key a stopped carve channel takes): closed at determinism — §7.1 gives it
  `bend.raised.around` (l. 10632). Its V09 end (the line words a way only) is open: VDC5-05 (peer). **Determinism → V09 /
  scope** (no bar runs a hand carve across a raised way): open, VDC5-02 (peer). **Determinism → V09** (§6.1's further
  press with V09's disabled button): agrees — no press is made while a pressed spell waits, and §6.1 states the engine's
  outcome were one made.
* **V09 → V10** (`ruinedForPreview` for a building under a previewed disaster): open, VAH-r5-03. **V09 → V10** (`says`
  lists the forms): closed (V10 l. 1015, l. 2033–2035). **V09 → V08 / V12** (T-V9-85's famine at severity 0.5): open,
  VAP-r5-02 (peer). **V09 → rendering** (`field?`, `ExportOpts.pins`, the drawn-week budget, the marks' look, the reader
  list): closed at §11.2, §8.2 and §12.5.
* **V08 → scope** (the new item-122 fixtures in §13.2's frozen manifest): the registration seam is VAP-r5-05 (peer).
  **V08 → V12** (`town-1` for X-V12-5): V12's own (agree-proof's lane). **V08 → determinism** (the held list): agrees —
  V08 §3.6 (4)'s list and §7.7's comment "set by folding each dossierFacts event's list, as quarantined is".
* **V12 → V11** (the two calibration routes): closed — V11 l. 3963 and l. 5148–5149 as V12 asked. **V11, V10:** no
  hand-off out. **Model → V09** (§2.9's `workingLayer` the home V09 cites): agrees (base l. 3405–3407 names V09 §2.4's
  `WorkingLayer` and §4.2's switch).

## Agreeing across the members

* **The late change and the held calamity.** §4.11 *The clock* (4), §7.7's `DossierBinding.lateCalamities` and item 6,
  §7.1's `dossierFacts`, §7.4's row, T76-1, and V08 §2.3, §2.7's row, §3.6 (3), (4), (6), §3.17's row, W20, J-V8.55 and
  T-V8-49 (g) read one rule: a late change never folds before `W₀`; a late calamity rides the first epoch its absorb folds
  at `W₀` + 1 where `W₁` is after `W₀`, else is held, its targets applied now at `W₀`, until the first epoch a later absorb
  folds; the list written whole by each `dossierFacts`, `[]` in an older document, no undo. Its fork, note and year-end
  residues are VV78-r5-01, -02 and -05 (peers). J-V8.54 reads a calamity leaving SettlementForge's capped list as no change,
  so a held key keeps its carried fact.
* **The port's refusals and the minted key.** §14's `E_OTHER_SETTLEMENT` comment and item 4, §7.7 item 12's key row and
  V08 §2.4's `id` row agree; §14 item 2 and V08 §2.4, B3, B5 split `select`'s refusals by the required keys.
* **The host's view commands.** §11.3, §7.7 (T125-2's commands), V08 §2.2's `setView` / `setLayer`, W101, §3.16 (4) and
  (6) (g): a week and a selection by `view.set`, a layer's visibility by a logged `setLayer` through `doc.apply`.
* **The plan's damage.** §6.3's one comparison, §8.6, T-ER-28, V02 §5.7 (2), V03 §5.6 (2), V06 §3.23 (3), V09
  §4.21.13 (1)–(2) with row 92, and V10 §3.9a read the entry week and the restoring re-cut's as written.
* **Find at a drawn week.** §11.2's one reader list and its frame listing, V09 §1b, §4.21.10 (iii), (7), (8), (14) and
  §6.4's ≈ 100 ms re-evaluation, V10 §3.9b (7), row 32, `FindAnswer.count` and T-V10-51 agree.
* **The crisis looks' readers.** §11.2's `looks` (`building?`, `field?`, `over`), §8.2's per-mark look, V09 §4.21.12
  (4), (5), (7), §5.8, rows 90 and 92, V10 §2.13's `says` and `over`, rule 21, row 34 and T-V10-50 (33), T-V10-52 agree
  on the line forms, the famine field and a building that names none; the why card's `ruinedFor` form at V10 is
  VAH-r5-03.
* **The view-bound why.** §11.2's `why` member, V10's `WhyView` with `WhyProvider.explain` and `WhySectionProvider.rows`
  (one declaration, V10 §2.13), §3.9's query, row 14, V03 §4.6's plan rows and V09 §5.8 with T-V9-86: a section whose
  rows read the drawn week reads the why's view week, else the document's current week.
* **The working layer.** §2.9, V09 §2.4's type, §4.2's reset to Ground, §2.12's row, row 21 and T-V9-80 (21), V10's
  `useTool` (view keys only).
* **The protected table rows.** §7.1's `refuse.table.required` row, V11 §4.1, EI-V11-EDGE-3 and J-V11.113 name the same
  five: `defaultRow`, an `allowFallback` target, a totality rule's only cover, a named row (`settings`, `structure`,
  `festival.staging`'s `fallback`), the last row of a table not `mayEmpty`.
* **The catch-up batch.** V08 ## 6's per-event costs by rung and its three fixtures plus the over-budget one, §3.6 (3),
  (6), T-V8-63, V09 §4.21.9 (1) and V06's T-V6-24 agree.
* **The weather timeline.** §6.1's press, §8.4 (i)'s fades (5 s and 60 s), V09 §4.21.14 (1), (4), row 93 and T-V9-87's
  `settings.weather.coming`, and V11 §3.25.11's lengths (every lower end, and the four climate overrides, at least twice
  the fade).
* **Shared subjects outside the canon's matrix** (built before items 120–126), judged here: `DossierBinding.lateCalamities`
  (determinism–V08), `LooksAnswer.over` with `field` (rendering–V09–V10), `WhyView` (rendering–V10–V03), `WorkingLayer`
  (model–V09–V10), the protected rows (determinism–V11–V09), the weather fades (rendering–V11): each agrees; the crisis
  line forms (V09–V10) carry VAH-r5-03.

## Concurred, not re-raised (landed round-5 peers' ids)

* **VDC5-05** (V09): `bend.raised.around`'s line words a way only, where §7.1 gives the key to a stopped carve channel.
* **VDC5-02** (scope): no bar runs a hand carve across a standing raised way.
* **VDC5-01, VDC5-03, VDC5-04** (determinism, V06): the carve against §4.3's way rule; §5.3's gate count; V06's
  `gateToJunction` on a raised gate.
* **VV78-r5-01** (pipeline): a held late calamity in a detached what-if copy.
* **VV78-r5-02** (V08): the `late` note's words for a late calamity.
* **VV78-r5-03 – -05** (V08): `town-1`'s reopened institution; the batch's epoch-week events; §3.17's year-end target.
* **VAP-r5-02** (V08): T-V9-85's famine severity in V08 §7.1. **VAP-r5-05** (scope): derived fixtures in §13.2's manifest.
* **VRC5T-02, VRC5T-05** (rendering): the marks' `entity` column; a `looks` query whose `building` or `field` names
  neither.
* **VAL-R5-04** (V04), **VM-R5T-01 – -03**, **VRC5T-01**, **VAL-R5-01 – -03** (model, pipeline, V07): the raised way ×
  wall residues outside this lane's seams.

## Coverage

All five members and their ten pairs were covered. Every round-4 finding was re-checked at its owner and at each second
end its disposition names. Every round-5 hunk of the five members was read as a word diff, and the subsections where a
hunk meets another member were read whole, against R5-02 – R5-10 where they touch them and the base parts they cite. The
weather lengths were compared with §8.4 (i)'s fades by script. Every hand-off the eighteen repair-r5 files address to or
from a member was checked at its destination. Units outside the members appear only where a member's statement meets
them (V02, V03, V06, V12, and the base's model, pipeline, rendering and scope parts above).
