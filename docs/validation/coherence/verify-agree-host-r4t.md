# Agreement check, round 4 — the dossier and the host (determinism, V08, V09, V10, V11) after assemble-r4

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-agree-host-r4t; covered by the whole-design retrovalidation (J84).

> **PROGRESS** — [x] resume check (no output, no LANDED line: fresh start) · [x] brief read whole · [x] inputs (round-3 report and result, adjudication-r4 R4-01–R4-16 and Part H with its END lines, assemble-r4 hashes = live, the round-4 work file rows of the merged-into ids, the eighteen repair-r4 HAND-OFFS, the twelve landed r4t peers' results) · [x] round-3 findings re-checked on live, END lines' second ends included · [x] round-4 text of the five members read at every cross-member statement · [x] DR rows against V08's field table, by script, both ways · [x] hand-offs checked at their destinations · [x] new issues written · [x] result saved · [x] LANDED

## Scope and method

Members: determinism (base §5–§7), V08, V09, V10 and V11. The live text is assemble-r4's output, checked by sha256:
base `5f34cceb…`, V08 `4675c05e…`, V09 `b49c6014…`, V10 `3fd16e69…`, V11 `47b14d9f…`. The pre-round text is git
`96bdae26` (base `593c657d…`, the text the repairs were written against).

1. **Round-3 findings.** VAH-r3-01 to VAH-r3-11 were re-checked at every site their required change names, against
   adjudication-r4's Part H disposition and the ruling it cites (R4-04, R4-07, R4-14), the merged ones against their
   merge targets' texts (VV910-r3-02 as R4-04 (c) amends it, VAF-R3T-02, VV1112-r3-03), and at each END line's second end
   (V08 l. 2717 and V10 l. 1020 for VAH-r3-06, §11.2's `districts` comment, §11.2's `looks` member and `over` for
   VAH-r3-02, §6.3 for VAH-r3-03, V08 §3.15 (2) and T-V8-51 for VAH-r3-04).
2. **Round-4 text.** Pre → live word diffs of each member, every hunk: determinism §5–§7 (17 hunks), V08 (59), V09
   (33), V10 (36) and V11 (24), with the whole subsections where a hunk meets another member: V08 §2.2 (`MapSession`),
   §2.4 (*Selection*, the field table and its lead), §3.5 steps 1–4 and the diff's absorb rule, §3.6 (3), §3.15, §3.16 (4),
   (7), §3.17's rows, ## 6's catch-up batch, §7.1's fixtures, T-V8-14, T-V8-49, T-V8-51, T-V8-59, T-V8-61, T-V8-63; V09
   §1b's crisis and damage rows, §2.7, §2.12, rows 21, 87–93, §4.2, §4.9's new rows, §4.20.2 (4), §4.21.8 – §4.21.14,
   §5.8, T-V9-52, T-V9-83 – T-V9-87; V10 §1.2, §1b.1, §2.12 – §2.13, §3.5, §3.9, §3.9a, §3.9b (5), (7), (8), rows 14, 26,
   34, C10, T-V10-49, T-V10-51 – T-V10-52; V11 §1b, §2.8 (`ClimateSettings`), §3.25.9, §3.25.11, §3.26, T-V11-45,
   T-V11-48; §6.1 *The weather stream*, §6.3 *Plan damage*, §6.5 (9), §7.1's outcome and table-edit rows, §7.7 items 10,
   12 and 15, DR44. The base parts outside the members were read where a member's statement meets them: §2.7
   `HistoryHint`, §2.9's view state, §4.11 *The clock* (1) and (4), §10.2 *Crisis looks* (b)–(f), §11.2's `looks`, `why`
   and *At a drawn week*, §11.3's host commands, §11.4, §13.2's T76-1, T122-2, T122-6, T125-1 – T125-3, §14's port types
   and port items 2 and 4.
3. **Seams checked:** the adapter selection and refusals (V08 §2.4, §3.5, B3, B5, B7; §14; §11.4; §1.1; §7.7 item 15);
   the fallbacks at an absorb (V08 §2.4, §3.5; §7.7 item 10; §14's `field_fallback`; T-V8-61); the settlement key (V08's
   `id` row; §7.7 item 12; §14); the present at creation and the hint (§2.7, §4.11 (1), V08 W64, the present-week row,
   §3.15 (2), §3.16 (4), T-V8-51); a calamity carried late (§4.11 (4), V08 §3.6 (3), §3.17, §4.6's `late` variant, T76-1);
   the catch-up batch (V08 ## 6, V06 §6.8, §12.10's R12-31); the crisis looks' units, the hand-over and the per-building
   `over` (§10.2 (d), (f), §11.2, V08 §3.16 (7), V09 §4.21.12 – §4.21.13, V10 §3.9a, §3.9b (8), V11 §3.25.9, V03's
   `PlanDamage`); the view-bound why (§11.2, V10 §2.13, §3.5, §3.9, V09 §2.7); the working layer (§2.9, §8.4, V09 §4.2,
   V10 row 26, V08 §2.2); Find at a drawn week (§11.2, §8.2, V09 §4.21.10, V10 §3.9b (7)); the weather timeline (§6.1,
   V09 §4.21.14, V11 §3.25.11); the damage comparison and the restoring re-cut's entry week (§6.3, §2.6 step 7, V03 §5.6
   (2), V06 §3.23 (3), V09 §4.21.13, V10 §3.9a); each DR row's inputs against V08's field table, both ways, by script.
4. **Peers.** Findings already raised by landed round-4 peers are not repeated; I concur with them (list below). No
   design file was touched. doc_checks was not run (an agreement seat); assemble-r4's provisional checks stand, the
   reference corpus being incomplete in this checkout.

**Severity** follows J141 and R4-01 (R3-03's classes): two members stating two outcomes for one case is major; a
citation, a stale gloss, a restatement narrower in form that nothing built reads, or a list entry is minor.

## Result

**4 issues**: 0 blockers, 0 majors, 4 minors.
* By owner: scope 2, V09 1, V10 1.
* By kind: DISAGREE 4.

All eleven round-3 findings are closed: VAH-r3-01, -03, -04, -05, -07, -08, -09 and -10 are fixed at their owners as
ruled, VAH-r3-02 by VV910-r3-02 under R4-04 (c), VAH-r3-06 by VAF-R3T-02 with its V08, V10 and §11.2 ends, and VAH-r3-11
by VV1112-r3-03. Every END line those dispositions name is written. The four new minors are restatements this round's
rulings left behind at a second member: V09's damage gloss misses R4-03's entry week (one fix with VDC4-01 at §6.3),
V10's Find read keeps R3-24's superseded "only the entities that frame holds" (R4-12), and §14 restates R4-15's port
rules in a looser form — the refusal split of (d) and, for `field_fallback`, an "empty" that V08 §3.5 defines without
the empty list. No new major: the two-outcome seams this round opened in my scope are already raised by landed peers
(VPC-R4-02's absorb at the last epoch's own week, VDC3-03's minted key at §14, VV78-r4-01/-03/-04, VV910-r4-01 – -03,
VV1112-r4-01).

## Round-3 findings re-checked

| id | owner | verdict | where (live) |
|---|---|---|---|
| VAH-r3-01 | V10 | FIXED | l. 202 "(V09 §4.21.12: `info.crisis.*`, each look worded by its `crisis.looks` row's `label`, V11 §3.25.9)"; T-V10-29 (l. 3119) "every `info.damage.*` and `info.crisis.*` key"; CVR-V10-22 (l. 3471) as required. No `crisis.look.` left in any file of the set |
| VAH-r3-02 | V09 | CLOSED (MERGED into VV910-r3-02, fixed per R4-04 (c)) | §4.21.13 (3) (l. 3700–3709) reads V03's `planDamage` (`PlanDamage.look` set), its after-hand-over case written; §4.21.12 (4) (l. 3624–3633) and §5.8 (l. 3992) give `info.crisis.ruinedFor` to "a building a disaster look stands over", read by §11.2's `looks` asked with the building (`over`); §1b (l. 377–378), §2.12 (l. 1006–1010), row 92 (l. 1612), T-V9-86 (l. 4409). End: §11.2's `looks` member `building?` and `LooksAnswer.crises[].over` (base l. 16280, 16325). The preview and famine residues are VV910-r4-01 and -03 (peer) |
| VAH-r3-03 | V09 | FIXED (R4-14) | §4.21.13 (1) l. 3680–3682, VAH-r3-03's text; §6.3's end (base l. 9970–9973, VDC3-02) written. Its R4-03 sibling is VAH-r4-01 below |
| VAH-r3-04 | V08 | FIXED (R4-07 (d)) | W64 (l. 291), the present-week row (l. 675), §3.16 (4) (l. 2445) read "the present at creation (§4.11 *The clock* (1))"; R4-07's V08 ends: §3.15 (2) (l. 2343) "up to and including the present at creation", T-V8-51 (l. 3281) the calamity at the latest tick. Base §2.7 `HistoryHint` and §2.9's `history` agree |
| VAH-r3-05 | V08 | FIXED | `economicState.prosperity` + DR27 (l. 650), `activeChains[]` + DR10, DR27 (l. 655), `institutions[]` + DR27 (l. 649), `customContentProvenance` + DR24 (l. 673). The script, re-run both ways, finds no further omission (its remaining hits are word matches: `walls`, `history`, `custom`, the forces rows) and confirms every DR the repair's sweep added (DR1, DR2, DR5, DR6, DR7, DR10, DR17, DR32, DR36, DR37) reads the field it is filed under |
| VAH-r3-06 | V11 | CLOSED (MERGED into VAF-R3T-02, fixed per R4-04 (a)) | V11 l. 4543 and l. 4813 name V07 §5.6 (3)'s units with the gloss. Ends: V08 §3.17's row (l. 2717), V10 §2.13 (l. 1020), §11.2's `districts` comment (base l. 16324). No "V07's ends" left in a member |
| VAH-r3-07 | determinism | FIXED | DR44 (base l. 12086) "a key form listing the overlay's address admits it whatever its tier (J-V8.128)"; its totality now names the crisis events (VDC3-04) |
| VAH-r3-08 | V10 | FIXED | T-V10-52 (l. 3142) lists "the siege, the refugee wave, the plague and the fire's linked `reconstruction` condition (its disaster look)" |
| VAH-r3-09 | V07 | FIXED | V07 l. 3127 "For now: Ruined quarters, the mill-end fire, weeks 30–34" |
| VAH-r3-10 | V08 | FIXED | §2.7's Find-chip row (l. 1320) "saved with the other view keys (`Document.view`) and in view pins …" |
| VAH-r3-11 | V08 | CLOSED (MERGED into VV1112-r3-03, fixed) | §7.1's fixtures sentence (l. 3221–3224) stands the siege, quarantine and refugee wave at once past `densityCap`. Its METROPOLIS-cap residue is VV1112-r4-01 = VV78-r4-08 (peers) |

## Issues

### VAH-r4-01 — minor · DISAGREE · owner V09

**Claim.** R4-03 makes an element a restoring event's re-cut mints enter the damage at the week that restoration ends:
"an element is compared with the level only from its entry week" (V03 §5.6 (2) (a), END written), "never drawn
damaged by that restoration nor repaired" (§2.6 step 7, base l. 2099–2101; V06 §3.23 (3)). V10, a reader of the same
lines, took both: §3.9a l. 1829 "shown damaged, from its entry week into the plan (V03 §5.6 (2); V06 §3.23 (3))" and
l. 1856 "or that a restoring re-cut minted, never among them". V09 took neither (no "entry week", "re-cut" or "minted"
in its damage text):
* §4.21.13 (1) (l. 3678–3680): "an element shows damaged while the building's decay level is above 0 and at least its
  threshold t";
* §4.21.13 (2) (l. 3698–3699): "an element the plan gained after its damage left is drawn as built (V06 §3.23 (3)'s
  per-element peak)";
* row 92 (l. 1612), the restored case: "an element the plan gained after its damage left drawn as built".

For a `reoccupy` whose re-cut is made while its `repair` Works runs, V09's gloss draws the minted partitions, doors and
furniture damaged (the level still reaches their t) where V03, V06, §2.6 and V10 draw them as built. V09's lines are
V03's damage layer (§1b l. 378; §2.12 l. 1010), so nothing built changes; only V09's gloss is narrower. It is VDC4-01's
omission (peer, §6.3) at V09, and one fix with it.

**Required change.** V09 §4.21.13 (1), after "at least its threshold t": ", compared from its entry week into the plan
(V03 §5.6 (2) (a)–(b); for an element a restoring event's re-cut mints, the week that restoration ends, V06 §3.23 (3))".
§4.21.13 (2): "an element the plan gained after its damage left is drawn as built" → "an element the plan gained after
its damage left, or that a restoring event's re-cut minted, is drawn as built — never damaged by that restoration nor
repaired". Row 92's restored outcome: "an element the plan gained after its damage left drawn as built" → "an element
the plan gained after its damage left, or a restoring re-cut minted, drawn as built".

### VAH-r4-02 — minor · DISAGREE · owner V10

**Claim.** R4-12 amends R3-24's "restricted to the entities that frame holds": at a drawn week whose frame is not the
head, a chip's matches are §11.2's listing at that week — the frame's own, "a building matched by its use at that week,
never its head use, and an entity or use the frame holds matched though the head has since closed, moved or demolished
it" (§11.2 *At a drawn week*, base l. 16455; §8.2 l. 13150–13154). V09 §4.21.10 (8) took the END line ("§11.2's listing
at that week (the frame's matches, by the uses it holds open then): a building matches by its use at that week, never
its head use"). V10 was bound by no R4-12 text and kept the superseded form, which it cites the panel for:
* §3.9b (7) (l. 2002–2004): "at a drawn week whose frame is not the head (V06 §3.15.2) each chip counts, lists and gaps
  only the entities that frame holds — a chip with none there counting 0 for that week, the chips themselves unchanged
  — as the panel does (V09 §4.21.10 (8))";
* T-V10-51 (l. 3141): "they equal the panel's over that frame's entities".

"Only the entities that frame holds" restricts the head's matches; a use closed since that week, or a building whose use
changed, is then unmatched, where §11.2, §8.2 and V09 match it. The read passes the week to §11.2's gazetteer and reports
its answer, so nothing built changes; the gloss and the bar's wording are R3-24's.

**Required change.** V10 §3.9b (7): "so at a drawn week whose frame is not the head (V06 §3.15.2) each chip counts, lists
and gaps only the entities that frame holds — a chip with none there counting 0 for that week" → "so at a drawn week
whose frame is not the head (V06 §3.15.2) each chip's count, matches and gaps are §11.2's listing at that week (*At a
drawn week*: the frame's matches, a building matched by its use at that week, never its head use) — a chip with none
there counting 0 for that week", the rest as it stands. T-V10-51: "they equal the panel's over that frame's entities" →
"they equal the panel's — §11.2's listing at that week, a building whose use changed since matched by its use then".

### VAH-r4-03 — minor · DISAGREE · owner scope

**Claim.** R4-15 (d) splits the port's two shape refusals by the required keys: a dossier lacking a `requiredKeys` key of
every registered adapter is `E_UNKNOWN_SHAPE` (B3); one holding every required key of a line that no registered adapter
accepts is `E_LINE_UNSUPPORTED` (B5). V08 §2.4 *Selection* (l. 696–698), §3.5 steps 1 and 3 (l. 1601, 1605), B3 and B5
(l. 2044, 2046) and T-V8-14 state it. §14's port item 2 (base l. 19705–19706), which says `select` is V08 §2.4's, still
reads: "A shape no adapter recognises is refused `E_UNKNOWN_SHAPE` (a hand-made teaching file among them), a line no
adapter serves `E_LINE_UNSUPPORTED`." `recognise` is the adapter's shape test (V08 l. 579–582: the required keys, the
readable stamps and the institution record shape), so "a shape no adapter recognises" reads as every dossier no adapter
accepts. A dossier holding every required key whose readable `schemaVersion` no adapter serves, or whose institution
records no adapter's `recognise` accepts, is `E_LINE_UNSUPPORTED` by V08 and `E_UNKNOWN_SHAPE` by §14's words. `select`'s
home is V08 §2.4, which a builder of the port follows, so nothing built changes.

**Required change.** §14 port item 2, l. 19705–19706: "A shape no adapter recognises is refused `E_UNKNOWN_SHAPE` (a
hand-made teaching file among them), a line no adapter serves `E_LINE_UNSUPPORTED`." → "`select` refuses a dossier that
lacks a required key of every registered adapter — no dossier of any registered line, a hand-made teaching file among
them — `E_UNKNOWN_SHAPE`, and one that holds every required key of a line but no registered adapter accepts
`E_LINE_UNSUPPORTED` (V08 §2.4)."

### VAH-r4-04 — minor · DISAGREE · owner scope

**Claim.** §14's `PortNote` kind `field_fallback` (base l. 19606) reads "a field the port reads that the dossier lacks,
leaves empty or gives unreadable, its fallback taken — at an absorb the carried fact standing (V08 §2.4, V08 §3.5)". V08
§3.5's absorb rule (l. 1674–1683), which R4-15 (a) made the home, defines the case: "its path absent, or its value of no
form its row reads: an empty string, a `null` (save where its row reads `null` as a value), a wrong type …" and then
"An empty list is a value — the dossier lists none — and is compared as read"; the field table's lead (l. 626–627), its
one-input edge row (l. 2686) and T-V8-61 (a) ("one whose `activeConditions` is `[]` and `stressors` `null` retires every
carried condition and stressor overlay") say the same. Read by §14's words, `activeConditions: []` at an absorb — the
ordinary dossier after its last crisis ends — "leaves empty" a read field, takes its fallback and keeps every carried
condition standing, where V08 retires them. The note's emission and the diff are V08 §3.5's, which §14 cites, so nothing
built changes; the comment's "empty" is wider than the home's.

**Required change.** §14 l. 19606, the `field_fallback` comment: "a field the port reads that the dossier lacks, leaves
empty or gives unreadable, its fallback taken — at an absorb the carried fact standing (V08 §2.4, V08 §3.5)" → "a field
the port reads that the dossier lacks, leaves empty or gives unreadable (V08 §3.5: its path absent or its value of no
form its row reads; an empty list is a value, compared as read), its fallback taken — at an absorb the carried fact
standing (V08 §2.4, V08 §3.5)".

## END lines and hand-offs checked at their destinations

* **END lines of my round-3 ids:** all written — V08 l. 2717 and V10 l. 1020 (VAH-r3-06); §11.2's `building?` and
  `over` (VV910-r3-02, carrying VAH-r3-02); §6.3 (VDC3-02 with VAH-r3-03); V08 §3.15 (2) and T-V8-51 (R4-07 with
  VAH-r3-04).
* **Other END lines landing in the members:** §7.7 item 10's absorb clause (VEL3-r3-02); §7.1's `bend.raised.underSpan`
  row (VEW-r3-01); §7.4's lock column (VM-R3T-06); V08 §3.6 (3) and its §3.17 row (VAT3-r3-01, R4-08); V08 §2.2's
  `export.request` comment (VRC3T-07); V09 §4.21.14 (4) and row 93 (VDC3-01), §4.21.10 (7), (8), (10) (R4-12), §2.7
  (R4-05), §4.9's three bend rows (R4-09), §4.21.11 (2) (R4-10); V10 §2.13's `explain` opts, §3.9 and the `why` tool
  (R4-05), l. 1020 and l. 1856 (R4-04, R4-03); V11 §3.24.2's `clearWidthM` and `squareDeg` (R4-09) — each written as
  given. Their open residues are peers' (below).
* **V08 → V06** (§6.8 (1)'s estimate reads the batch): closed — V06 §6.8 (1) (l. 3967–3972) reads `b` and `a` at V08's
  values (150 / 500 ms per epoch, 3 / 3.5 ms per event). **V08 → pipeline** (§4.11 (4)'s "before" → "not after"):
  open, VPC-R4-02 (peer). **V08 → determinism** (§7.7 item 10): agrees, citing V08 §3.5. **V08 → rendering** (§11.3 may
  cite `MapSession.setLayer`): no defect (§11.3 states the command; V08 names its call).
* **V09 → rendering** (`live.crises`' marks by look for **Show**): open, VV910-r4-02 (peer). **V09 → determinism**
  (§7.1's bend rows, §6.1's press rule, the table-edit row): the homes V09 cites exist; VDC4-03, -04, -06, -07 (peers)
  hold their edges. **V09 → V01** (`gapUnits` with the week): closed; `findAreas` without it is VV12-r4-01 (peer).
  **V09 → scope** (T-V9-52 cites T110-2): closed.
* **V10 → rendering** (a second reader of `building?` and `over`): no defect (§11.2's comment names V10's look read).
  **V10 → V07** (`opts.view`): closed at V07 §4.5 and W74; its hand-over residue is VV78-r4-01 (peer). **V10 → V03**,
  **→ V09**: closed.
* **V11 → V12** (`item107.spread` beside `item105.web`): open, VV1112-r4-02 (peer). **V11 → base** (texts landing in
  the same assemble): closed — §4.3, §2.7's support step (6), §4.8's lead and §10.2 (d) carry them.
* **Determinism's hand-offs** (§8.4 (i)'s fades; V09's button while a spell waits; no `open` span for a hand way): open,
  VDC4-02, VDC4-07, VDC4-03 (peers).
* **V06 → V09 / V10** (`walls.raisedCrossings`): no defect — neither member enumerates the walls section's fields.

## Agreeing across the members

* **The adapter, the refusals and the cap.** V08 §2.4, §3.5 and B3/B5/B7, §1.1, §7.7 item 15, §11.4 and §14's
  `HostContext.line` and `PortResult` comments agree: a missing required key `E_UNKNOWN_SHAPE`, an unserved line
  `E_LINE_UNSUPPORTED`, a readable population above the 120 000 cap `E_RUNG_UNAVAILABLE` at creation and every absorb, a
  negative, fractional or non-numeric one the fallback. §14's general sentence is VAH-r4-03.
* **Fallbacks at an absorb.** §7.7 item 10, V08 W98, the field table's `name`, `tier`, `population` and `institutions[]`
  cells, §3.5's rule, §3.17's rows, T-V8-61 (a) and §14's `field_fallback` read one rule: the carried fact stands. The
  empty list is VAH-r4-04.
* **The present at creation and a late calamity.** §2.7 `HistoryHint`, §2.9's `history`, §4.11 *The clock* (1), V08's
  three present-week sites, §3.15 (2) and T-V8-51 agree on the inclusive bound. §4.11 (4), V08 §3.6 (3), §3.17, §4.6's
  `late` variant and T76-1 agree on a calamity carried at or before `W₀` riding the absorb's first epoch at `W₀` + 1;
  the absorb at `W₀` itself is VPC-R4-02.
* **The crisis looks.** DR44 (its source word, its census totality with the crisis events, its tier), §10.2 (d) and (f),
  V08 §3.16 (7), V11 §3.25.9 (the `event` rows and *Totality*), V09 §4.21.12 and V10 §3.9b (8) agree on the units' one
  phrase (R4-04 (a)), the stands-over predicate (R4-04 (b)) read through §11.2's `over` by V09's card and V10's look read
  and through V03's `PlanDamage.look` by V09's plan panel, and on R4-11's knowledge (T-V9-85, T-V10-52, T-V8-59).
* **The view-bound why.** §11.2's `why` member, V10 §2.13 (`WhyProvider.explain`'s `view`), §3.5's `why` tool, §3.9's
  query and row 14, and V09 §2.7's `WhyCardModel` agree: a view's look rows read that view, none without one.
* **The weather timeline.** §6.1, V09 §4.21.14 (4), row 93, T-V9-87 and V11 §3.25.11's `hours` (whole hours, both ends,
  wrapping midnight) agree on the live rate, the press while a spell is in force and the replay's inputs.
* **The catch-up batch.** V08 ## 6, §3.6 (3), (6), §3.17, T-V8-63 and V06 §6.8 (1), (6) agree on one batch per epoch and
  its costs.

## Concurred, not re-raised (landed round-4 peers' ids)

* **VPC-R4-02** (pipeline): §4.11 *The clock* (4) folds an epoch at `W₀` for a late calamity where V08 folds none.
* **VDC3-03** (scope): §14's `E_OTHER_SETTLEMENT` against a key minted at creation.
* **VDC4-01** (determinism): §6.3 omits the restoring re-cut's entry week; VAH-r4-01 is its V09 end.
* **VDC4-02, VDC4-07** (rendering, V09): the fade of every weather kind; the button while a pressed spell waits.
* **VDC4-03, VDC4-04, VDC4-06** (determinism, V09): the hand way with no `open` span; a delete of a held stretch; V09's
  `bend.wall.aqueductArch`.
* **VRC4T-07, VRC4T-08** (determinism, V08): "the layers shown" at §7.7 and V08 l. 489, 2450, 2521.
* **VRC4T-09** (pipeline): "districts" left at §10.2 (d) and `lookLevel`'s comment.
* **VV12-r4-01** (V09): `findAreas(key)` without the drawn week.
* **VV56-r4-01** (V09): the catch-up's over-budget trigger in §4.21.9 (1).
* **VV78-r4-01 – -08** (V07, V08): V07's crisis line without the hand-over; the absorb rule inside records; a late
  element change's week; ## 6's imprecisions; W101 for `setView` and `setLayer`; the `name` restatements; the cap
  fixture.
* **VV910-r4-01 – -04** (V09, rendering, V10): `ruinedFor`'s forms; `live.crises` marks by look; the famine field's
  producer; a look read naming no building.
* **VV1112-r4-01, -02, -03** (V08, V12, V11): the cap fixture; `item107.spread`; J-V11.113.

## Coverage

All five members and their ten pairs were covered. Every round-3 finding was re-checked at its owner and at each END
line's second end. Every round-4 hunk of the five members was read as a word diff, and the subsections where a hunk meets
another member were read whole, against the rulings R4-02 – R4-16 that touch them and the base parts they cite. §7.7's
DR rows were compared with V08's field table by script in both directions. Every hand-off the eighteen repair-r4 files
address to or from a member was checked at its destination. Units outside the members appear only where a member's
statement meets them (V03, V06, V07, V12, and the base's model, pipeline, rendering and scope parts above).
