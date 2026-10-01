# Verify round 6 — V09 (the application) and V10 (the clerk) — lane coherence/verify-vol-V09-V10-r6t

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/verify-vol-V09-V10-r6t; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V09-V10-r6t`, 2026-10-01)
- P1 brief read whole; r5t result (4 issues), adjudication-r6 (How to read, Summary, TOC, Part A, R6-01, R6-02's decision, owner check, behaviour list, V09/V11 Ends and sweep, R6-03's sweep, R6-04 – R6-11, Part H · V07 – V12, Part P, Part I), repair-r6-V09/V10 headers, assemble-r6 read; live = assemble-r6 after shas (V09 046b6610…, V10 1014b64c…); pre-r6 = b3f83a0: done
- P2 re-check the four round-5 findings at both ends: done (4 closed: 3 FIXED, 1 closed by its merge target)
- P3 read every round-6 replaced unit in V09 (13 blocks, 18 hunks) and V10 (12 blocks, 17 hunks) for new problems; R6-02 family checks (i)–(iii); R6-03 held-clause census: done (5 new)
- P4 mechanical checks (ids, refs, retired terms, deferral, phone, review ids, doc_checks, words, cohesion): done
- P5 report and result: done

## Scope and inputs

* **Live files** (equal to assemble-r6's after-hashes): `docs/volumes/V09-application.md` sha256 `046b6610e47e621d…`,
  `docs/volumes/V10-clerk.md` `1014b64c7dc80fee…`; base `docs/ARCHITECTURE.md` `f39f1c30126976c0…`. Pre-round copies from
  `b3f83a0` (V09 `7c91d3bf…`, V10 `847b3189…`, the round-5 hashes). Design files untouched by this seat.
* **What changed:** V09 13 REPLACE blocks (§2.7, §2.12, §3.16, §4.3, §4.5, §4.9, §4.20.2, §4.20.6, §4.21, §5.7, §5.8,
  §5.15, §7.1), 18 changed hunks; V10 12 blocks (§1.2, §1b.1, §2.12, §2.13, §3.3, §3.5, §3.9a, §3.9b, §3.17, §3.23, §7.1,
  ## 8), 17 hunks. Each hunk was read as a word diff and then in its live subsection, with the base and volume homes it
  cites (§2.7's crossing table W1–W13 and *beneath*, the way-and-channel table rows (a)–(e), §7.1's bent rows and T3 row,
  §8.2's `StyleSheet.groups`, §8.8, §11.2's `looks` and `why` members and `LooksAnswer`, T110-2, V01 §5.1.3, V07 §4.5,
  V08 §7.1, V12 §3.15.12).
* **Binding:** adjudication-r6 (R6-01 – R6-11 with Part P's amendments; Part H · V09: 4 ids, 5 END lines; Part H · V10:
  4 ids, none END; V07's VV910-r5-03), adjudication-r2 – r5 where not superseded.

## P2 — round-5 findings re-checked (both ends)

| id | disposition (adjudication-r6) | verdict | evidence (live) |
|---|---|---|---|
| VV910-r5-01 | FIX (R6-05 (c)) | **FIXED** | V09 §2.7 (l. 622–625): "While its card or panel is open, a view-bound answer is re-asked at each change of that view's §2.9 `week`, `yearWeek`, `festival` or `crises` …", verbatim; §2.12's `WhyCardModel` row (l. 989) "rebuilt at every open, on `doc.changed` naming the subject, at `onEffectiveKey` and at each change of its view's `week`, `yearWeek`, `festival` or `crises` (V09 §2.7)", now agreeing with the damage-lines row (l. 1013); §5.8 (l. 4032) "its view's drawn week, re-read as the week changes (V09 §2.7)"; T-V9-86's last clause. The repair also gave the mechanism a bar on all four keys (T-V9-65's scripted view-bound clause at M3b, where §16 lands items 117, 118 and 122's view keys: J-A117.01, J-A118.01, J-A122.01). The re-ask at a `doc.changed` that does not name the subject is a separate gap: VV910-r6-02 below. |
| VV910-r5-02 | FIX (R6-05 (b)) | **FIXED** | T-V9-85 (l. 4443): "on a test-side copy of the dossier crisis fixture (V08 §7.1) whose fire's linked `reconstruction` condition the dossier names not, given its `untilWeek` and then none, the why line reads `info.crisis.lineUnnamed` and then `info.crisis.lineUnnamedOpen`, and the why card … `info.crisis.ruinedForUnnamed` and then `info.crisis.ruinedForUnnamedOpen`". V08 §7.1 (l. 3246–3250) holds the fire with its linked `reconstruction` condition on each crisis fixture, so the case runs. |
| VV910-r5-03 | FIX (R6-05 (a)) | **FIXED** | V07 §4.5 (l. 3142–3144) "in the form that section chooses — `ruinedForOpen`, `ruinedForUnnamed` or `ruinedForUnnamedOpen` …, `ruinedForPreview` under a preview —"; W74 (l. 282) "in its forms (V09 §4.21.12 (4))"; T-V7-69 (e) (l. 3704) "in the form V09 §4.21.12 (4) chooses (under a preview `ruinedForPreview`)". |
| VV910-r5-04 | MERGED into VAT-r5-01 (R6-06) | **CLOSED** (its target fixed) | VAT-r5-01's seven V10 texts are all present: §2.12's `look` input `building?: Ref; field?: Ref` (l. 954); §2.13's `over` and projection comments (l. 1023–1031); §3.5 (l. 1465); §1.2's §11.2 row (l. 189); §3.9b (8)'s *A field under a famine look* (l. 2067–2071); row 34's field edges and outcomes; T-V10-52's famine clause and T-V10-50 (33)'s `field` forms. Base §11.2's `looks` member carries `field?: Id` (l. 16393) and `LooksAnswer.crises[].over` the naming-none outcome (l. 16440; VRC5T-05). The clerk names the famine on a bare field and none on a sown one, as the card does (R6-06's form, not this issue's narrower one). |

Every END line for V09 in Part H is written: R6-02's (V9-1) – (V9-6) (`bend.wall.held` deleted; `bend.wall.raisedCrossing`,
`.aqueductArch`, `bend.raised.wall` in the ruled words; §4.20.2 (4) as amended by PRB6-08, with "that wall's" for the doc_checks
run; T-V9-52 with VDC5-02's carve clauses and the locked run); (D8)'s `bend.raised.underSpan` source cell, word for word
§7.1's row (l. 10675); VAT-r5-02's notes row (§5.15, l. 4171); VAT-r5-03's T-V9-85 clause and its timing; VAT-r5-04's T12
`dress` row (§4.3, l. 1742). The other seats' V09/V10 fixes are present as their repair files state (VDC5-05 at §4.9's
`bend.raised.around` with its channel form; VRC5T-04 at §4.21.11 (2), T-V9-84 and, by the sweep, row 89; VAH-r5-03 with
VAT-r5-05's (1)–(2) at V10 §3.9a, §3.9b (8), C10 and T-V10-52); their reporters re-check them.

## P3 — the round-6 text read for new problems

**V09.** §2.7's re-ask sentence and `decidedBy` row ("one read `vault`: none under a wall"); §2.12's `WhyCardModel` row;
§3.16 row 44 (the span read `open` under a wall, run by T-V9-80 (44)) and row 89 (8 edges, 8 outcomes, the 10-s clause =
§8.8 l. 14430–14433); §4.3's and §4.5's T12 rows and §5.7's Dress panel (the **Trees** and **Pins** switches → `setStyle` of
`StyleSheet.groups` = base §8.2 l. 12601); §4.9's five bend rows; §4.20.2 (4) and (8); §4.20.6 (2); §4.21.11 (2); §5.8;
§5.15's notes row (= §11.2's `ExportOpts.pins`, l. 16323–16329); T-V9-52, -65, -84, -85, -86. No nuance lost: the removed
words are the crossing station, the held stretch and `bend.wall.held` (gone with R6-02's ruled change) and §4.20.2 (4)'s
restatement of the strips and the support step (now citations of §2.7's tables).

**R6-02 family in V09 (round-6 note (6) (b)).** (i) Each cell V09 reads gives one outcome and names a test that runs it —
hand C1 *over the band* (`bend.wall.aqueductArch`; T-V9-52, T110-2 (1)), hand *down before the wall* (`bend.raised.wall`;
T-V9-52), W2·C2 and W2·C8 (`bend.wall.raisedCrossing`; T-V9-52's drawn and locked wall), W4/W11·C2 (T-V9-52's breach and
delete), W13·C2 (T-V9-52's dropped gate), rows (b) and (e) (T-V9-52; T110-2 (4), (5)) — **except a gate slid by its grip**,
which V09's new gate form puts in W13's outcome while base §7.1 makes the slide a moved trace vertex of row W2 (VV910-r6-01).
(ii) No V09 or V10 site keeps a crossing station, raised gate, wall opening, held stretch, "built against", `bend.wall.held`
or a "(6) (a)/(b)/(d)" pointer (census: 0); §4.20.2 (4) is R6-02's own (V9-5) text, a citation with the outcome names. (iii)
Every citation names an outcome or row that exists (*down before the wall*, *over the band*, *beneath*, row W13, rows (b)
and (e); resolved by hand against l. 2591–2711).

**R6-03.** V09 and V10 carry no `lateCalamities`, late or held calamity clause (census: 0); "the week" in V09 §1b and
§4.21.7 is the Season control's tick (stands).

**V10.** §1.2's §10.2 and §11.2 rows; §1b.1's `LookAnswer` row; §2.12's `look` input; §2.13's `over` and new `ruinedFor`
(producer: the harness from V09's catalogue, §3.5; readers: prompt rule 21, §3.9b (8), §3.17's host projection — wired);
§3.3's rule 21; §3.5's look read (an invalid `building` or `field` not passed, each its own look kind's `over` withheld);
§3.9a's `says` → `ruinedFor` mapping (= V09 §4.21.12 (4)'s "in the form the line takes"); §3.9b (8) *The read.*,
*Explained.*, both bullets; §3.17's row; row 34 (16 edges with their sub-cases → 20 outcomes, aligned one to one); C10;
T-V10-50 (33); T-V10-52; §8's C4 cell (scheduling words only).

New findings (detail under *Issues*):

* **VV910-r6-01 (major, model; ENDs determinism, V09).** A gate slid by its grip into an under-deck strip: V09's
  `bend.wall.raisedCrossing` gate form moves it along the wall (W13's `placeGate` outcome); the base makes the slide a moved
  trace vertex (W2), whose gate moves along its road with the wall bent out to it. No bar runs a slide.
* **VV910-r6-02 (major, V09).** An open why card at THORP, HAMLET and VILLAGE shows V07 §4.5's crisis row from the
  provider's answer, which V09 re-asks only at view changes and a `doc.changed` naming the subject; a Works commit handing
  the end's last building over, or an absorb adding or ending a condition, names neither the end nor the field, so the
  card goes stale, while the town card's own crisis row re-reads at each `doc.changed`.
* **VV910-r6-03 (minor, V01).** V01 §5.1.3 still says "the view bar hides" the `pins` and `trees` groups; V09 puts the
  switches in the Dress panel (T12 `dress`), and no drawing group is a view-bar layer (R6-10).
* **VV910-r6-04 (minor, V10).** T-V10-50 (33)'s new "both" clause needs a disaster look and a famine look standing in one
  week; no fixture it cites names such a week.
* **VV910-r6-05 (minor, V10).** V10 §2.13's look-read header comment still names only the read's `building`.

## P4 — mechanical checks

* **Ids.** T-V9-1 – T-V9-87, J-V9.1 – J-V9.149, BCR-V9-1 – BCR-V9-37, T-V10-1 – T-V10-53, J-V10.1 – J-V10.128,
  BCR-V10-1 – BCR-V10-23, CVR-V10-1 – CVR-V10-22: each defined once in the set, no gap. V09 §3.16's 92 rows (3–94) and V10
  §3.23's 45 rows: no duplicate; round 6 added none.
* **References.** assemble-r6's resolver (`work/assemble-r6/refs.py`) re-run on the live tree: 56 332 resolved, 131
  external, 85 ambiguous-form, **0 broken, 0 to fix**; V09 4 571 resolved (7 ambiguous-form, 3 external), V10 2 703 (5, 2).
  The round-6 pointers checked by hand: V09 §4.20.6 (2), V09 §2.7, V10 §3.9a, V10 §2.13, V10 §3.23 row 34, V07 §4.5,
  V08 §7.1, V01 §5.1.3, §2.7's row W13 and rows (b), (e) — each resolves.
* **Retired terms** (canon glossary, 35 patterns, pre → live): 0 changes in either volume.
* **Deferral wording:** 0 in round-6 text ("For now" is a catalogue string; "the later of" a schedule).
* **Review and ruling ids, PRB6 markers:** none on any added line.
* **Item 126 (a2):** V09's ten "phone" words unchanged (pre 10 = live 10, each stating the rule); V10 none.
* **Cohesion.** V09 §8 unchanged; V10 §8's C4 cell gains only scheduling words (the famine fixture at M-SF, the previewed
  `disaster` at M5), its figures unchanged; INDEX untouched this round; both equal INDEX and §16.
* **doc_checks** (`--doc … --heads docs/ARCHITECTURE.md`; WARNING printed: reference corpus INCOMPLETE — captures,
  research/patreon, research/devlogs, research/ftg-docs, research/external missing — results NOT authoritative,
  PROVISIONAL; exit 1 for the unreviewed C3 runs, as every round): V09 C1 1/0, C2 1/0, C3 296/274, C4 0, S1 0, S2 456/89;
  V10 C1 0, C2 0, C3 165/146, C4 0, S1 0, S2 334/12 — equal to the repair seats' dry runs.
* **Words** (wc): V09 124 150 → 124 773 (+0.5 %), V10 82 568 → 83 281 (+0.9 %), the defect fixes' design text; no unit
  shrank, so no nuance audit for a cut over half applies.

## Issues

| id | sev | kind | owner | claim (short) |
|---|---|---|---|---|
| VV910-r6-01 | major | CONFLICT | model | a gate slid by its grip into an under-deck strip: V09's line moves it along the wall (W13), the base's W2 along its road with the wall bent; no bar runs a slide |
| VV910-r6-02 | major | WIRING | V09 | an open why card at the village rungs keeps V07's crisis row stale across a `doc.changed` not naming its end or field (a Works hand-over, an absorb) |
| VV910-r6-03 | minor | CONFLICT | V01 | V01 §5.1.3: "the view bar hides" the `pins` and `trees` groups; the switches are the Dress panel's |
| VV910-r6-04 | minor | EDGE-UNTESTED | V10 | T-V10-50 (33)'s "both" clause has no fixture week with a disaster look and a famine look standing together |
| VV910-r6-05 | minor | NEW-PROBLEM | V10 | V10 §2.13's look-read header comment names the read's `building` only |

### VV910-r6-01 — major — CONFLICT — owner model (ENDs determinism, V09)

**Claim.** Round 6's V09 §4.9 `bend.wall.raisedCrossing` row (l. 2103) gives the line a gate form "for a gate dropped or
slid inside the under-deck strip (T3's **Gate**, a gate's grip)": "No gate can stand beneath {way}, so it moves {m} m along
{wall}." A gate's grip is `moveVertex` on the gate's crossing vertex (V09 §3.5, l. 1194; base §7.1's T3 row, l. 10733:
"`moveVertex` on an enceinte's trace — a stretch's anchor vertex and a gate's crossing among them"), so a slide is a moved
trace vertex: §2.7's crossing table row W2 ("a hand `drawWall`, a moved trace vertex or a re-anchored stretch", l. 2699),
whose last column gives "a gate it makes for a ground way inside the under-deck strip moved along that way clear of it, the
stretch bent locally through it", and *beneath*'s gate clause puts "a moved trace vertex" in the bent group (the gate moved
along its way, the trace bent through it, l. 2646–2652). Only a `placeGate` (row W13, l. 2710; §7.1's bent row, l. 10674:
"a `placeGate` moved along the trace clear of the under-deck strip") moves along the trace. So for a gate slid into the
strip the base moves it along its road and bends the wall out to meet it, while V09's line says it moves back along the
wall. No bar runs a slide: T-V9-52 drops a gate, T110-2 (4) runs a `placeGate`. Two builders build different geometry for
one hand edit (R6-01: two units, two outcomes for one case, however rare). Item 101 R2's nearest lawful declaration for a
gate slid along a wall is the point on that wall nearest the slide's end, which is W13's outcome.

**Required change.** Model, §2.7's crossing table: row W13's event cell "a hand `placeGate` (§7.1's sugar: a stub crossing
the trace at `at`)" → "a hand `placeGate` (§7.1's sugar: a stub crossing the trace at `at`), or a gate's crossing slid by
`moveVertex` (§7.1's T3 row: a gate's grip)"; its C2 cell "at an `at` inside the under-deck strip, bent along the trace to
the nearest point clear of it, the stub with it; elsewhere *unchanged meeting* · T110-2 (4)" → "at an `at` or a slide's end
inside the under-deck strip, bent along the trace to the nearest point clear of it, the stub or the gate's way with it;
elsewhere *unchanged meeting* · T110-2 (4), T-V9-52"; row W2's event cell "a moved trace vertex" → "a moved trace vertex
(a gate's crossing slid: row W13)". END determinism, §7.1's bent row (l. 10674): "or a `placeGate` inside its under-deck
strip" → "or a `placeGate` or a gate's slide inside its under-deck strip", and "a `placeGate` moved along the trace clear of
the under-deck strip" → "a `placeGate`, or a slid gate with its way following, moved along the trace clear of the
under-deck strip". END V09, T-V9-52: after "with `bend.wall.raisedCrossing`'s gate form," add "and a gate of that wall slid
by its grip into the strip moves back along the trace clear of it, its road following, with the same form,".

### VV910-r6-02 — major — WIRING — owner V09

**Claim.** Round 6 makes an open card re-ask its view-bound answer "at each change of that view's §2.9 `week`, `yearWeek`,
`festival` or `crises` … so V07 §4.5's crisis, season and festival rows … state the view on screen" (V09 §2.7, l. 622–625),
and §2.12's `WhyCardModel` row (l. 989) otherwise rebuilds only "on `doc.changed` naming the subject". At THORP, HAMLET and
VILLAGE the card's crisis row is not its own: "a `VillageField`'s and a `VillageEnd`'s row is the village `WhyProvider`'s
answer row (V07 §4.5), shown once, the card adding none of its own" (V09 §4.21.12 (4), §5.8). V07 §4.5 (l. 3138–3146)
computes that row from `crisisLookYields` on the end's buildings (`villageUnitPlots`) and from the view's `looks` answer.
Both change at a `doc.changed` that names neither the end nor the field: a commit beginning a Works on the end's last
building not yet handed over (it names the building and its Works), an absorb that adds or ends a condition (it names the
overlay), and their undo. So a card left open on an end keeps "For now: Ruined quarters, …" after the look has left every
building, or never shows a famine an absorb brings. At TOWN and above the same card's crisis `facts` row is re-read "at
each `doc.changed`" (§2.12's crisis row, l. 1010, which names the Works hand-over), so one owner rule (item 122 (f): the
card names the crisis) gets two behaviours by rung. A build agent following §2.12 builds the stale card; T-V9-65's
view-bound clause runs view-key changes only.

**Required change.** (1) V09 §2.7: "— a scrub, the Season control, a festival or crisis preview, **Show crises** — as a
cached answer is at `onEffectiveKey`" → "— a scrub, the Season control, a festival or crisis preview, **Show crises** — and
at each `doc.changed` (a commit, an absorb, an undo or redo, a regenerate), at which §11.2's `looks` evaluation it reads is
re-read as the crisis card's is (V09 §2.12), as a cached answer is at `onEffectiveKey`". (2) §2.12's `WhyCardModel` row:
"on `doc.changed` naming the subject" → "on `doc.changed` naming the subject (a view-bound answer on each `doc.changed`,
V09 §2.7)". (3) T-V9-65's view-bound clause: "… and `crises` and draws each change's rows (V09 §2.7)" → "… and `crises`,
and at a `doc.changed` naming another entity whose commit changes the provider's view-bound rows, and draws each change's
rows (V09 §2.7)".

### VV910-r6-03 — minor — CONFLICT — owner V01

**Claim.** V01 §5.1.3's *Group switches* (l. 3037–3039), rewritten this round from layers to groups, still reads "the hood
pins, model pins and access symbols belong to the `pins` group and block trees to the `trees` group, so the view bar hides
them as Neighbourhood's keys do". V09, the interface's home, puts the switches in the Dress panel (T12 `dress`: §4.5's T12
row, l. 1825; §5.7, l. 4003; §4.3's row, l. 1742), base §8.2 (l. 12601) names "T12 `dress`'s switches", and R6-10 rules that
no drawing group is switched by `setLayer`, the view bar's layer control. The builder of the switch follows V09, so nothing
built changes: a restatement differing in form.

**Required change.** V01 §5.1.3: "so the view bar hides them as Neighbourhood's keys do" → "so the Dress panel's **Trees**
and **Pins** switches hide them (V09 §4.5's T12 row), as Neighbourhood's keys do".

### VV910-r6-04 — minor — EDGE-UNTESTED — owner V10

**Claim.** Round 6's T-V10-50 (33) (l. 3165) adds "with both — a building a disaster look stands over and a field a famine
look draws bare — each look's `over` as asked with that one alone", run "on T-V10-52's fixtures". T-V10-52's B-DOSSIER-lite
fixture carries no famine, and V08 §7.1's crisis fixtures (l. 3246–3253; V12 §3.15.12, l. 2694–2699) carry the famine and
the fire "each standing through part of the year", the one week named for standing together being the siege's, the
quarantine's and the refugee wave's. No cited fixture names a week in which a disaster look and a famine look stand at once,
so the clause may run with one of them absent (R5-10, kept by R6-11: a test that names a case runs it on a fixture that holds
it; R6-01 grades the omission minor).

**Required change.** T-V10-50, clause (33): "with both — a building a disaster look stands over and a field a famine look
draws bare —" → "with both — on a test-side copy of V08 §7.1's famine fixture whose fire's linked `reconstruction` condition
stands in the famine's weeks, a building that disaster look stands over and a field the famine look draws bare —".

### VV910-r6-05 — minor — NEW-PROBLEM — owner V10

**Claim.** Round 6 gives the look read a `field` (§2.12, l. 954; §2.13's `over` comment; §3.5; R6-06), but §2.13's code
header for the read (l. 1000–1002) still reads "the festivals and the crisis looks projected from §11.2's `looks` reader
(LooksAnswer) at the session's effective key, with the read's `building` where it names one". The repair's sweep conformed
the `over` and projection comments below it but not this line. Wording only.

**Required change.** V10 §2.13's look-read comment: "with the read's `building` where it names one, its parts read as those
sections state" → "with the read's `building` where it names one and its `field` where it names one, its parts read as those
sections state".

## Result

Saved verbatim to `docs/validation/coherence/results/coherence_verify-vol-V09-V10-r6t.json`: 5 issues — 0 blocker,
2 major, 3 minor; owners model 1, V09 1, V01 1, V10 2. Round 5's four findings all closed (three FIXED, one closed by its
merge target).
