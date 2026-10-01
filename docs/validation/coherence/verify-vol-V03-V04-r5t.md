# Verify round 5 — volumes V03 (Interiors) and V04 (the underground) — lane coherence/verify-vol-V03-V04-r5t

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/verify-vol-V03-V04-r5t; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V03-V04-r5t`, 2026-10-01)
- P0 brief read whole (ROUND-5 NOTES, NEW OWNER RULES, ORCHESTRATION NOTES); round-4 result (1 issue) read; adjudication-r5's header, summary, R5-01, R5-02 (whole, with its Ends and Sweep), R5-04, R5-05, R5-08, R5-10 and Part H (V03, V04, and the END lines of VV34-r4-01) read; round5-work V03.json and V04.json; repair-r5-V03 and -V04 reports; assemble-r5's sections 1–2; live V03 3fe82c82…, V04 b79fd290…, base 2d84eac2… equal assemble-r5's "after": done
- P1 round-4 id VV34-r4-01 re-checked at model, scope and V04: done — FIXED per R5-02 (7), every end written
- P2 round-5 fixes in scope (V03: VAP-r4-02, END of VAT-r4-01, END of R5-05, its R5-05 (c) and R5-08 (a) sweeps; V04: VAL-R4-07, VAP-r4-06, END of R5-02, END of VV34-r4-01, its R5-02 sweep): done — all applied as ruled
- P3 every round-5 block of V03 (5 blocks, 6 hunks) and V04 (10 blocks, 13 hunks) read, each changed passage in its subsection; the base's round-5 text that V03 and V04 cite (§2.7's support step (3), (6), (7) and the span rule; §6.3; §11.2's `why`; II.7.5's label line): done (pre-round text from commit 3310b538, sha256 9af5ffd5… and 6aebc1e1…)
- P4 the other round-5 verifiers' issues on V03 and V04 checked (concurred, not re-raised); references, ids, terms, phone, deferral, review ids; §8 against §16 and INDEX; doc_checks (provisional): done
- P5 issues, result saved, LANDED: done

Scope: V03 (`docs/volumes/V03-interiors.md`, 3 304 lines) and V04 (`docs/volumes/V04-underground.md`, 3 626 lines) after
repair round 5 as assemble-r5 installed them (V03 9af5ffd5… → 3fe82c82…, V04 6aebc1e1… → b79fd290…; live hashes equal
assemble-r5's "after"). Binding: adjudication-r5 (R5-01 – R5-10, Part H) and the earlier adjudication files where not
superseded by name (R4-09 is superseded whole by R5-02). Grades by J141's severity standard.

## 1 Round-4 finding re-checked

| id | owner | verdict | where (live) |
|---|---|---|---|
| VV34-r4-01 (major) | model | **FIXED** per R5-02 (7) (closes VAL-R4-04, merged) | base §2.7's support step (7) (l. 2623–2628): "A frame growth's extension (§3.2 (9)) keeps every station of the old deck — its key, position and support `ring` — and every span between two of them as it stands (`use`, `reason`, `state`, `held`); (1)–(5) and the span rule run on the extension alone, from the old deck's last interior station (with none, from its other foot) … so no pier of the old deck moves and no footing leaves (V04 §3.5.0 *At an epoch*)" — R5-02's text verbatim; support step (6) names "a frame growth's extension of its deck by (7)" among the ops that change a held raised way (l. 2586); `RaisedFoot`'s comment (l. 2317: "(the old deck's stations kept, the support step's (7))"). Ends: scope T110-2 (l. 18467–18469: "every station of the old deck at its key, position and ring after the growth (§2.7's support step (7))"); V04 T-V4-65's at-epoch clause (l. 3148: "and an aqueduct whose deck a frame growth extends over a cavern chamber within reach of its piers: no old pier moved, the collapsed set equal to a regeneration's"). V04 §3.5.0 *At an epoch* (l. 1341–1342) and §3.10 (l. 2284–2286) cite (7). |

## 2 Round-5 fixes in scope and their second ends

**V03** (1 issue, 2 END lines; repair-r5-V03):
* **VAP-r4-02** (FIX per R5-10) — §7's damage fixtures (l. 2853): "…, a rebuild's `repair` Works begun on one building of
  the district inside the condition's weeks (V06 §3.22 (3)'s hand-over) and an `infiltrated` stressor (a `none`-row
  condition, V11's map rows) carried beside it in its weeks, and under a `disaster` preview". The required text but
  "on one of its buildings" → "on one building of the district" (the same meaning; V09 T-V9-86's own words). The fixture
  now holds every part T-V3-40 (b) runs and the part T-V9-86 reads. **Applied.**
* **END of VAT-r4-01** (R5-08 (d)) — §4.6's `plan` damage rows (l. 2378): "… at the own level (V03 §5.6 (2) (d)) at the
  why's view's drawn week (`opts.view.week`, V10 §2.13; §11.2's view-bound `why`), else the document's current week".
  Agrees with V10 §2.13's `WhySectionProvider.rows(…, opts: { view?: WhyView … reads view.week, else the document's
  current week })` and base §11.2's `why` comment (l. 16346–16350). **Applied.**
* **END of R5-05** — T-V3-39's timing cell (l. 2906): "; its scrub across the run at the later of P4 and V06's E6
  (V06 §3.15.2's frames)"; R5-05 (c)'s sweep conformed §8's P4 cell (l. 2943: "T-V3-39 but (e), its scrub across the run
  at the later of P4 and V06's E6;"). **Applied** (see VV34-r5-01 for a pre-existing gap in the same two cells).
* **R5-08 (a)'s sweep** — `info.crisis.ruinedFor` "in its forms (V09 §4.21.12 (4), V09 §4.21.13, V09 §4.9)" in ## 1
  (l. 198), "in the form V09 §4.21.12 (4) chooses, under a preview `ruinedForPreview`" in §4.5 (l. 2322) and T-V3-40 (e).
  V09 §4.21.12 (4) (l. 3634–3644) defines the five forms and V09 §4.21.13 (3) (l. 3724–3734) reads them; every pointer
  resolves. **Applied.**

**V04** (2 issues, 2 END lines; repair-r5-V04):
* **VAL-R4-07** (FIX) — UE33's E7 (l. 2428): "the layer not drawn — hidden and not the view's working layer (§8.4) —
  draws none of the underground view's part". Verbatim. **Applied.** Agrees with V04 §5.1's lead (l. 2692), §5.4
  (l. 2862) and the base's II.7.5 label line conformed this round (l. 21366).
* **VAP-r4-06** (FIX per R5-05) — T-V4-81 (j) (l. 3164): "from the later of U5 and V06's E6, whose history frames
  (V06 §3.15.2) it reads"; §8's U5 tests cell (l. 3200): "T-V4-81 ((j) at the later of U5 and V06's E6)". Verbatim.
  **Applied.**
* **END of R5-02** — every V04 line of R5-02's *Ends*, verbatim: §1b.2's `ArchVaults.reconcile` row (l. 328: "after the
  span rule's eager run, §2.7"; the hand trace and the epoch crossing station dropped); §1b.3's raised-way edit row
  (l. 372: the hand trace and the T3 `wall` tool dropped); §2.6's arch-vault row (l. 867); §3.5.0 *At an epoch*
  (l. 1341–1342: "the frame growth's deck extension among them, its old stations kept (§2.7's support step (7))"; the
  crossing station's former ring dropped, l. 1350); §3.10 (l. 2284–2286); §4.3's row (l. 2577); ## 6 (l. 3007); T-V4-63
  (l. 3146). V04's own sweep conformed §4.3's "(a crossing station's band stretch where the way is created across a
  standing wall, §2.7's support step (3))" — correct: (3) makes that station's support `ring` the band's stretch, so
  `foundationObstacles` (1) reads it. A grep of V04 for "support step", "crossing station", "(6) (a)", "(6) (b)",
  "(iii)", "hand trace", "last support", "re-sit", "palisade", `drawWall`, `W_RAISED_CROSSING`, `bend.raised`,
  `bend.wall` finds no stale reading. **Applied.**
* **END of VV34-r4-01** — T-V4-65 (l. 3148). **Applied** (section 1).

## 3 Round-5 blocks read — new problems

V03's 7 edits and V04's 19 edits were read in their subsections (the blocks replaced ## 1, §4.5, §4.6, ## 7, ## 8 of
V03 and §1b.2, §1b.3, §2.6, §3.5, §3.10, §3.11, §4.3, ## 6, ## 7, ## 8 of V04; every other line is verbatim, the
diffs confirm). The base text they now read was checked at its home: §2.7's support step (3) (the crossing station
only where a raised way is created across a standing wall), (6) (a)–(d) (held from its creation; a later wall runs on
beneath the deck), (7) (the frame growth), the span rule (a span over a wall strip `open` at its one eager run); §6.3
*Plan damage* (R5-04's entry week); §11.2's `why` with `view`.

Found:
* **T-V4-63's frame-growth bar (written this round)** — "the frame growth's case keeping every old station and its
  vaults" keeps more than (7) does: (7) keeps "every span between two of [the old stations]" and re-runs the span from
  the old deck's last interior station to the new end (with no interior station, the whole deck), and V04 §3.10
  (l. 2284–2286) deletes "one whose span is gone". → **VV34-r5-02** (minor).
* **R5-04's one comparison** — T-V4-82 (b) restates it without the entry week, a site VAL-R5-04 (which names V04 §5.6's
  lead and UE33's E1) does not list. → **VV34-r5-03** (minor).
* **R5-04's "under no disaster look"** — T-V3-39 (f) equates the panel's lines and the section's rows and says "none on
  a never-decayed building" on the damage fixtures, which hold the struck district; VRC5T-03's V03 end names (g) only.
  → **VV34-r5-04** (minor).
* **§8's P4 and P5 cells for T-V3-39** (the P4 cell edited this round) — T-V3-39's own timing lands "(e) and (h)'s
  exports from P5", but P4 lists "T-V3-39 but (e)" and P5 "T-V3-39 (e)". Pre-existing in both cells; the round's sweep of
  that cell (R5-01 (2) (c)) left it. → **VV34-r5-01** (minor).

Checked and found sound: T-V3-39's and §8's E6 clause (E6 lands after V06's decay level, so "the later of P4 and E6"
covers the run's frames); V03 §5.5's `findRooms` off R5-05 (a)'s list (it reads the drawn plan; the matches are §11.2's
gazetteer rows, which `live.find` reads at the frame); V04 §3.5.0's "An epoch op removes no obstacle" with (7) (no old
pier leaves); `EpochScope.raised` (V06 l. 465) and V04's three trigger lists agree; R5-03 and R5-07 restate nothing in
V03 or V04 (no late-change or absorb-fallback text there); R5-09's `workingLayer` reading in V04 §5.1 (2) and UE33 E7
agrees.

**Concurred, not re-raised** (other round-5 verifiers, each re-read against the live text and agreed):
* **VAL-R5-02** (model; V04 and V07 ends) — the arch vault's `door` under a wall stretch laid after its raised way: (6)
  (d) ends the run "at its arch vault's two walled-up arch mouths, the chamber kept whole" while V04 §3.5.4 (d) (1)
  (l. 1696–1706) seats the one `door` at the midpoint of an open face and calls a vault with no door "a walled-up arch";
  no reconcile runs for a later wall and T-V4-63 bars "no arch vault changed"; V03 §3.12 (9)'s seated building takes
  its entrance and windows on those grade faces (V04 §3.5.4 (f)). The same outcome is undefined for the T-V4-63 fixture
  itself. V04's repair handed it off (repair-r5-V04 HAND-OFFS). Major; its V04 ends (the door rule, the trigger lists,
  T-V4-63) are in its required change.
* **VEW-r5-02** (model) — what a later run is once a part it was built against goes (V04's arch vault collapsing with its
  span among them, V04 §3.5.4 (d) (2)).
* **VAL-R5-04** (V04) — V04 §5.6's lead and UE33's E1 without the entry week and the look's condition.
* **VRC5T-03** (scope; V03, V04 ends) — T123-7 and its restatements (T-V3-39 (g), V04 l. 2962, UE33's E1) unconditioned on
  the disaster look.
* **VAF-R5T-04** (V03) — V03 §3.13's damage-layer row's level-1 outcome without the entry week (l. 2094).
* **VAF-R5T-05** (V03) — V03 §5.2's "so a building never decayed exports byte-identically" (l. 2488) unconditioned on the
  look.

## 4 Standing checks

* **References.** Every pointer the round added in V03 and V04 resolves (V09 §4.21.12 (4), §4.21.13 (3), §4.9; V10
  §2.13; §11.2; V06 §3.22 (3), §3.15.2, §8's E6; V08 §3.16 (7) (b); §2.7's support step (3), (6) (d), (7); §3.2 (9);
  §8.4; V04 §5.1 (7)); assemble-r5's census: 56 169 references, 0 broken.
* **Ids.** Row ids unique within each volume (V03 213, V04 327: T-, J-, UE, UC, BCR, IN, W); none added or removed this
  round.
* **Terms.** The canon's 35 retired-term patterns over both volumes: no retired term — the hits are the crisis look's
  "hand-over" (`crisisLookYields`, a different concept from G-unitinput's sky unit-run view) and "standalone
  neighbourhood document" matching G-standalone's "lone neighbourhood document" inside "standalone" (false positives,
  as in earlier rounds).
* **Owner rules.** Item 126 (a2): no phone clause in either volume. No deferral wording. Review ids only inside the
  decision and fix-list records (V03 l. 3131, 3282–3293), as assemble-r5's census keeps them.
* **Cohesion.** V03 §8's total 19–26 and V04 §8's 28.5–39.5 unchanged; §16's M6-P and M6-U rows and INDEX unchanged
  this round (INDEX's sha256 equal before and after); §16's one changed cell (M3b's crisis looks, the village units)
  agrees with V03's P4 dependencies and T-V3-40 (b)'s village clause.
* **Words.** V03 77 889 → 77 999 (+110: a fixture's two parts, an END line's week clause, a timing cell's clause, the
  key family's forms); V04 84 394 → 84 327 (−67: R5-02's dropped later-trace clauses). Archive: V03 81 106, V04 82 301.
* **doc_checks** (`docs/validation/bench/doc_checks.py --doc <volume> --heads docs/ARCHITECTURE.md`, pre-round and live):
  WARNING — reference corpus INCOMPLETE (captures, research/patreon, research/devlogs, research/ftg-docs,
  research/external missing): **NOT authoritative, provisional**. V03: C1 0, C2 0, C3 367 hits / 281 unreviewed → 367 /
  281, C4 2 / 0, S1 0, S2 197 → 199 hits, 0 unreviewed. V04: C1 0, C2 0, C3 219 / 195 → 219 / 195, C4 0, S1 0, S2 153 →
  153 hits, 2 → 2 unreviewed (the same §3.24 pointer, moved two lines). 0 new unreviewed hits from round 5.

## 5 Issues

0 blocker, 0 major, 4 minor.

| id | sev | kind | owner | claim | required change |
|---|---|---|---|---|---|
| VV34-r5-01 | minor | COHESION | V03 | T-V3-39's timing cell (l. 2906) lands "(e) and (h)'s exports from P5", and (h) re-reads "drawing and exports" across the lifecycle. §8's P4 tests cell (l. 2943, edited this round) runs "T-V3-39 but (e), its scrub across the run at the later of P4 and V06's E6", so P4's exit includes (h)'s exports before P5's exporters. P5's cell (l. 2944) runs only "T-V3-39 (e)". The milestone cells omit a split the test's own cell names. | §8's P4 tests cell: "T-V3-39 but (e), its scrub across the run at the later of P4 and V06's E6;" → "T-V3-39 but (e) and (h)'s exports, its scrub across the run at the later of P4 and V06's E6;". P5's tests cell: "T-V3-39 (e)" → "T-V3-39 (e) and (h)'s exports". |
| VV34-r5-02 | minor | NEW-PROBLEM | V04 | T-V4-63 (l. 3146, written this round from R5-02's V04 end) ends "the frame growth's case keeping every old station and its vaults". §2.7's support step (7) keeps every old station and "every span between two of them". It runs (1)–(5) and the span rule from the old deck's last interior station to the new end, or with none from the other foot, so the old end span is re-derived. V04 §3.10 (l. 2284–2286) then lays "a new `vault` span's vault" and deletes "one whose span is gone". Where the old end span (or a one-span deck's only span) was `vault`, a correct build removes that vault or re-lays it under a new key, and "its vaults" read as every vault of the old deck fails it. The mechanism is (7)'s and §3.10's, so nothing built changes. | T-V4-63: "the frame growth's case keeping every old station and its vaults" → "the frame growth's case keeping every old station and, with the same id and footprint, the arch vault of every old span between two of them (§2.7's support step (7)), the span from the old deck's last interior station (with none, its one span) re-derived with the extension and its vault laid or deleted by its new span (V04 §3.10)". |
| VV34-r5-03 | minor | DISAGREE | V04 | One fix with VAL-R5-04, at a site it does not list. R5-04's one comparison (§6.3 *Plan damage*, l. 10006–10008) compares an element "only from its entry week into the plan (V03 §5.6 (2) (a)–(b); …)". T-V4-82 (b) (l. 3165) restates it without the entry week: "each element damaged exactly while the level is above 0 and at least its threshold (§6.3 *Plan damage*'s comparison)". R5-01 (2) (c) puts the tests in the sweep. Its fixtures hold no element entering the plan after the level rose, so nothing tested changes. | T-V4-82 (b): "each element damaged exactly while the level is above 0 and at least its threshold (§6.3 *Plan damage*'s comparison)" → "each element damaged exactly while the level is above 0 and at least its threshold, compared from its entry week into the plan (§6.3 *Plan damage*'s one comparison; V03 §5.6 (2) (a)–(b))". |
| VV34-r5-04 | minor | DISAGREE | V03 | One fix with VRC5T-03, at a site it does not list. T-V3-39 runs "on the damage fixtures", which hold the struck district (V03 §7, l. 2848–2853). Under the look a building's panel lists the look's damage at its drawn level under `info.crisis.ruinedFor` (V03 §4.5, l. 2321–2322). The `plan` section's rows read the own level and carry no look (V03 §4.6, l. 2386–2387; T-V3-40 (d)). So T-V3-39 (f) — "the panel's damage lines and the `plan` section's rows read the same `PlanDamage` — one line or row per kind present, none on a never-decayed building" — fails a correct build on a never-decayed house of that district in the condition's weeks. VRC5T-03's V03 end names (g) only. T-V3-40 (e) runs the look's lines, so nothing built changes. | T-V3-39 (f): "(f) the panel's damage lines and the `plan` section's rows read the same `PlanDamage` — one line or row per kind present, none on a never-decayed building —" → "(f) on a building no disaster look stands over (the look's lines are T-V3-40 (e)'s), the panel's damage lines and the `plan` section's rows read the same `PlanDamage` — one line or row per kind present, none on a never-decayed building —". |
