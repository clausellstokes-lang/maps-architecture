# Amendments c + d + e (bundled pass) — seat B `pipeline-plots` (items 42, 43, 44; the §4.7 REPLACE owner)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat amendments-c/amend-pipeline-plots; queued in docs/FABLE-REVIEW-QUEUE.md.

> PROGRESS (kill-safe ledger; one line per item)
> ITEM 42: planned §4.7 S10 (10) in the §4.7 REPLACE + J-ROWS + RATIONALE-A | done §4.7 REPLACE block, J-ROWS, RATIONALE-A
> ITEM 43: planned §4.7 S11 (template column + *Front-line jitter* paragraph) in the §4.7 REPLACE + J-ROWS + RATIONALE-A | done §4.7 REPLACE block (refined on resume: zero rows carry `jitter.maxM` 0 only; the floor's refusal stated), J-ROWS, RATIONALE-A (J-A43.42 gains the poor row's 0.4 m cap)
> ITEM 44: planned §4.7 S11 arrangement table (set-back compound row) in the §4.7 REPLACE + J-ROWS + RATIONALE-A | done §4.7 REPLACE block, J-ROWS, RATIONALE-A
> FOLDED (route §C.2): 50 Entrances phrase; 63 two pointers; 70 `cluster` row + tents-row note; 71 two pointers; 20 (h) wording; RV-7's step-6 ruling (J-A67.49) | done §4.7 REPLACE block, J-ROWS, RATIONALE-A
> BUNDLE (d, e; route §C.9): nothing homed or folded for B (§C.9.1: B's key and items unchanged; §C.9.3: item 80's §4.7 line is T's APPEND) | done — checked
> REPORT: per-item sections, rulings, not-applicable, cross-part notes, verification | done

## Outcome

Items 42, 43 and 44 are designed into §4.7 in one REPLACE block (`docs/validation/amendments-c/blocks-pipeline-plots.md`),
with five judgment rows (J-A42.41, J-A43.41, J-A43.42, J-A44.41, J-A67.49) and their Part A entries. As §4.7's REPLACE
owner (route §C.2) the same block folds every phrase other seats routed to §4.7: item 50's Entrances phrase, item 63's two
pointers, item 70's `cluster` row and tents-row note, item 71's two pointers, item 20 (h)'s wording, and the step-6 timing
ruling the retrovalidation register (RV-pipeline-gen-7) asked of this editor against item 67. The bundle (files d and e)
homes nothing in §4.7 and routes no phrase to B (route §C.9.1, §C.9.3): B's key and item list are unchanged, so this seat
resumed its landed block by the CONTINUE rule and finished it. All three home items are CONFIRMED under the evidence gate
(Fable's evidence-gate checkpoint: "33–48 … CONFIRMED"); no part of them is HOLD — PLAUSIBLE. Block written against the live
design sha256 `1c23190f…` (§4.7 = l. 4363–4693; the subsection grows from 332 to 369 lines to the next heading).

## Per item

### Item 42 — NG 1.2.2's "42 % discard" is its courts (KEEP OURS; characterisation corrected)

* **Landed:** §4.7 S10 (10). Referencing places belong to other seats: §4.6's deep-interior note (seat A), §5.2 F-PLOT's
  test cell (seat E2), §1.3 (seat S1), §15.1 NG C1 (seat S2) — cross-part notes below.
* **Mechanism, in plain words:** nothing in our construction changes. Every plot is still cut facing a street or lane, so
  every plot has a way in; the middle of a deep block is still chosen on purpose by S8 (a court, a back lane, an alley
  through, or rear plots, and — with item 30 — hidden plots). What changes is what we say about NG: its "discarded" lots
  were never failures — NG 1.2.2 builds a lot only where it has a street edge, and the leftovers become the block's court.
  So the 42 % is NG's court share, an output of its block and lot sizes, and our interior shares are calibrated against
  that output.
* **Ruling:** J-A42.41 — KEEP OURS (access by construction, O5 a; the interior by S8's band shares, J-P15), recorded because
  the item meets J-P15 and J-A30.41. The design text names the build (NG 1.2.2).

### Item 43 — front-line jitter: an area-scaled, floored recession (CALIBRATE the law's shape; KEEP OURS construction and values)

* **Landed:** §4.7 S11 — the template's column list (the reference identifier removed, route §C.5), the row arrangement's
  geometry cell, and one new paragraph **"Front-line jitter — an area-scaled recession (item 43)"** after the treatments
  paragraph, which states the mechanism once.
* **Mechanism, in plain words:** each plot's house may stand a little back from the street. How far is decided once per
  plot by a dice roll scaled by the plot's size and capped by a per-band maximum; if the result is tiny it is set to zero,
  so the house sits on the line. The recession is measured square to the street, so it follows bent and curved streets
  exactly and neighbours still share their side wall. Our default caps are small (0.4 m in poor dense rows rising to 1.5 m
  on rich plots) because medieval streets kept their line; the MFCG comparison preset uses MFCG 12710731's much larger
  4.8 m cap and 2 m floor so side-by-sides still match MFCG. Institutions, tents and informal clusters never recede. The
  stored value is the plot's existing `SitePlan.frontJitterCm`; the draw uses the plot's existing `siteplan` stream (no new
  stream); a designation change keeps the front of a kept house; a table edit that would put the floor inside the kernel's
  attraction radius is refused with the reason.
* **Data:** `SitePlan.frontJitterCm` (§2.5, existing, cm) holds the drawn `h`; the template columns `jitter.maxM` and
  `jitter.minM` (m) replace §10.2's single `frontJitterCm` column (seat D's REPLACE — note below).
* **Failure handling:** a plot too shallow for `h` plus a footprint meeting the class floors takes the largest `h` that
  fits, 0 below the floor — deterministic, not a failure; an `editTable` / `editPreset` below the floor's bound is F-EDIT.
* **Rulings:** J-A43.41 — the law's shape emulated (`ref:MFCG 12710731 front recession (code)`, P9 — P9's row names MFCG
  12710731 and NG 1.2.2), our construction, our band values as an `option` extension over MFCG, the `MFCG` preset reading
  4.8 m / 2 m through §7.6's per-preset values (item 37's rule, seat E2). J-A43.42 — **two deviations from the item's
  literal text, recorded:** (1) `jitter.minM` defaults to 0.3 m and is bounded below by `attractCm` + 1 cm (27 cm), not the
  item's 25 cm, because §3.6 step 3's stretch attraction (radius `attractCm` = 26 cm, §3.2 (2)) would share a front line
  25 cm behind the frontage with the frontage and the recession would collapse to 0 — the design's old note named
  `minEdge` (25 cm) where attraction is the operative radius, and the route's "the 25 cm floor stands" (§B item 43) repeats
  that slip; (2) the poor / dense row's cap is 0.4 m, not the item's lowest 0.3 m, because a 0.3 m cap under a 0.3 m floor
  gives no recession at all (`u` × 0.3 m < 0.3 m); the item's other caps (0.7 / 1.0 / 1.5 m) stand.

### Item 44 — the compound enclosure is ours; NG 1.2.2 draws none (KEEP OURS; provenance `own`, extension)

* **Landed:** §4.7 S11's arrangement table, set-back compound row: "**enclosure wall** (rich, prosperous; ours — NG 1.2.2
  draws no enclosure — an `extension` the parity presets set to the fence, §7.6; J-A44.41) or fence, with a **gate on the
  access edge**". Referencing places: §2.5 PlotBound (seat M), II.3 (seat D), §15.1 NG C3 (seat S2), §7.6's preset value
  and `extension.over` (seat E2, J-A44.71 in the route) — notes below.
* **Mechanism, in plain words:** rich and prosperous compounds (manors, inns, guildhalls) keep their wall and gate —
  realism; they were enclosed. The wall is now labelled as our own addition, not NG's (NG draws no walls at all), and like
  every one of our additions it is switched off in the comparison presets, where the compound gets the plain fence.
* **Ruling:** J-A44.41. The route's gap (the item's "NG preset" does not exist; only `MFCG` and `FTG` presets) is answered
  by writing "the parity presets" and leaving `extension.over` to seat E2's §7.6 ruling (the route recommends `'both'`);
  no new preset is created.

## Phrases folded for other seats (route §C.2; §4.7 is one subsection)

| item | seat | where in §4.7 | text as folded |
|---|---|---|---|
| 50 | T (reference) / M (home) | S11 **Entrances** | "the main entrance on the access edge where §2.6's rule 1 places it (the owner's rule, item 29)" — "3 ± 1 m (FTG's measured rule, §13.5)" dropped here, so the offset (if M keeps it as `own`) lives only in §2.6 |
| 63 | D | S10b, a bullet after "Requests after the city is built" | "**Concealed institutions (item 63).** A concealed institution is placed as one item with its front by the concealment rule of this section's *Concealed institutions* paragraph (item 63)." (the route's "at the end of this section" named by title, because T's APPENDs follow D's) |
| 63 | D | S11 designation-template paragraph | "A front's building reads the front's template; its concealed function adds only concealed rooms, a concealed door and a link down (item 63, *Concealed institutions*, below)." |
| 70 | T | arrangement table | tents row "where" + "— FTG's row, which the parity presets keep; how the default preset shares these districts with the cluster row is item 70's (*Informal clusters*, below)" (FTG's trigger and staging only, never "outside the enceinte" — Fable A-M2 note 1); a new `cluster` row |
| 71 | T | S10 (7); S11 template paragraph | "a larger class placed by S10b's class mix asks this law for its join (item 71)"; "J-A19.41 holds within a class; the class itself is S10b's class-mix draw (item 71)." |
| 20 (h) | E1 (home) | households-per-building paragraph | "except a household that fills the dossier's population (§7.7 item 2)" for "a household of a dossier's roster (the dossier's population, §7.7 item 2)"; the protection stays |
| 67 (RV-7) | T (home §4.11) | S11 mutator step 6 | "A host or user change decides and records the whole mutation at once; … How a recorded step is shown on the ground over the weeks it takes is §4.11's Works (item 67), which reads the steps and never re-decides them (J-A67.49)." |

## Judged already satisfied or not applicable to this part

* Item 34 — no block-band column in §4.7 (seat A states the band in §4.6 step 1; route §C.2).
* Item 49 — the granularity table's "FTG quad side median 10.3 m, footprint median 103 m²" anchor stays: it rests on
  building outlines, which FTG sends, not on its lawn-patch "lots" (the retrovalidation register concurs). No other §4.7
  cell cites FTG lots. Item 49's deletion in §1.4 is REJECTED by Fable's evidence gate — S1's, not B's.
* Items 68, 72 and the bundle's item 80 — their §4.7 text is seat T's APPEND (exception 3, extended by §C.9.3); no pointer
  is routed to B, none added. Items 64, 65, 66 — nothing routed into §4.7.
* **Items 73–88 (file d)** — none homed or referenced in §4.7 (route §C.9.1). Item 87's §7.7 sentence relies on S10b's
  least-disruption order taking vacant plots first — B's block keeps that order verbatim. Item 76's clock (weeks) matches
  step 6's "over the weeks it takes". Item 81's refusal of a sub-floor dossier and item 20 (h)'s tier marker do not touch
  §4.7.
* **Item 101 (file e)** — nothing routed to §4.7 (its pipeline references are T's §4.1 and §4.3). Its `place` points form
  ("a place by one point, S11's site plan") is served as it stands by S10b's positive placement (`PlacementItem.pinnedTo`,
  §7.7 item 20 (g)) and S11's site plan; its `shape` tool (split, join, corners, storeys, the door) re-derives inside one
  plot through S10 (7)'s join law, §7.1's plot edits and the designation mutator — no new §4.7 mechanism is needed.
* Identifiers (gate (c)): §4.7's one listed identifier (`Offset`, route §C.5) is removed by item 43's text.

## Held parts

None. Items 42, 43 and 44 carry no HOLD — PLAUSIBLE part; the bundle holds nothing in 73–88 or 101 (route §C.9.4).

## CROSS-PART NOTES (the other editors run in parallel; the verifiers check both sides)

1. **Seat A (`pipeline-bentcut`, §4.6) — item 42.** In the deep-interior paragraph, after "calibrated at M-1 on NG's
   hollow-block frequency in the vertex captures" add "(an output of NG 1.2.2's no-frontage rule on its block and lot
   sizes)". (Route §C.2's item-63 clause for §4.6 is A's too.)
2. **Seat D (`pipeline-staged-clandestine-underground`).** (a) **§10.2 `DesignationTemplateRow`** — replace
   `frontJitterCm: number` with `jitter: { maxM: number; minM: number } /* m — item 43: the front-line recession's cap and
   floor (§4.7 S11); maxM interpolated along the value; minM's declared range ≥ attractCm + 1 cm; defaults maxM 0.4 / 0.7 /
   1.0 / 1.5 m by band and minM 0.3 m, each an option extension over MFCG (the MFCG preset 4.8 m and 2 m); maxM 0 in the
   institution, tents and cluster rows, unmarked */`; the compound rows' `bounds` cell `'wall'` (prosperous, rich) is an
   `extension` (option) that the parity presets set to `'fence'` (item 44). (b) **II.3** — "so the close-up draws NG's
   walled compound from model data (COV-NG-N27)" → "so the close-up draws a compound's enclosure from model data (ours;
   NG 1.2.2's manors stand unenclosed)". (c) Your item-63 APPEND on §4.7: keep the paragraph's title opening with
   "Concealed institutions" — B's two pointers cite it as *Concealed institutions*.
3. **Seat T (`pipeline-transitions-informal-character-dossier-calibration-light-authoring`).** (a) Your §4.7 APPEND: keep
   item 70's paragraph title opening with "Informal clusters" and item 71's with "Class mix inside a band" — B's `cluster`
   row, tents note and pointers cite *Informal clusters*; B's `cluster` row says "packed across the plot, not in frontage
   rows, each with its own door on a footpath web of the plot's yard that reaches one of its access edges" and "where
   *Informal clusters* admits them" — check it against your (b)/(d). (b) B's tents row reads "FTG's row, which the parity
   presets keep"; the default preset's sharing is yours. (c) B set `jitter.maxM` 0 in the tents and cluster rows (no
   recession). (d) **J-A67.49 is used by B** (step 6's timing ruling) — number your item-67 rows so as not to collide
   (for example J-A67.41–J-A67.48, then J-A67.50 on); your §4.11 Works paragraph should say that a Works reads the
   mutation's recorded steps (item 18's `MutationRecord`) and never re-decides them, and §4.11's own "applies the whole
   mutation at once" sentence is yours to rule the same way (RV-pipeline-gen-7). (e) Item 80's line (S10b's `dossier`
   request ranks the element's former building first) is yours by §C.9.3; cite S10b's bullet by its name, *Requests after
   the city is built*, whose order B keeps unchanged.
4. **Seat M (`model`).** (a) **§2.5 PlotBound** — "(VIS-8; NG's walled manor compound, COV-NG-N27; FTG's fences,
   COV-FTG-F23)" → "(VIS-8; our compound enclosure — NG 1.2.2 draws none, COV-NG-N27; FTG's fences, COV-FTG-F23)".
   (b) `SitePlan.frontJitterCm: Cm` gains its comment: "the drawn front-line recession `h` (§4.7 S11, item 43): 0 or in
   [`jitter.minM`, `jitter.maxM`]". (c) Item 50: B's Entrances line defers the offset wholly to §2.6's rule 1 — whatever
   you rule on the 3 ± 1 m, §4.7 needs no change.
5. **Seat E2 (`determinism-determinism-underground-authoring-…`; §5.2, §6.1, §7.1, §7.6).** (a) **§5.2 F-PLOT** test cell:
   "NG baseline: 42 % of lot leaves discarded" → "NG 1.2.2 baseline: ≈ 42 % of lot leaves frontage-less (its courts)".
   (b) **§7.6 per-preset values** (item 37's rule, route J-A37.71): the `MFCG` preset carries `jitter.maxM` 4.8 m and
   `jitter.minM` 2 m (item 43), and both parity presets the compound rows' `bounds` = `'fence'` (item 44; route J-A44.71 —
   `extension.over` is yours, the route recommends `'both'`). The `FTG` preset's jitter values are yours: no FTG
   front-recession fact is read (P9 names MFCG 12710731 and NG 1.2.2 only); B recommends the emulated law's MFCG values
   under both presets unless your per-preset rule gives FTG its own. (c) §7.6's table list may name "the designation
   templates' jitter columns (`jitter.minM`'s declared range ≥ `attractCm` + 1 cm; an edit below it refused, §4.7 S11)" —
   a pointer; the refusal is stated once, in §4.7. (d) §6.1 — no new concern (`u` on `siteplan`; an added main slot on
   `siteplan.mutate`). (e) Optional, recommended: §7.1's plots row gains `setAttr` on a plot's front recession
   (`frontJitterCm`: 0 or at least the bound; re-fits S11's footprint with the neighbours fixed; refused as F-EDIT below the
   bound or where the footprint would break its class floors) — today a front moves only by `moveFootprint` or by a table
   edit and a re-derivation.
6. **Seat S1 (`scope-provenance-bentcut-calibration`).** (a) **§1.3** — "42 % silently discarded lot leaves" → "a court
   left wherever lots have no frontage (42 % of lot leaves, by construction rather than by error)", naming NG 1.2.2 (in the
   same sentence as item 39's corrected wording). (b) **§13.2 bars** (§4.7's "The bars: §13.2 (item 43)" points here):
   T43-1 every plot's `frontJitterCm` is 0 or in [`jitter.minM`, min(√(plot area)/3, `jitter.maxM`)] at its interpolated
   columns, and over the plots whose depth does not bind, the share of receded main slots per band row lies within ± 0.05
   of the law's expectation (the mean over those plots of max(0, 1 − `jitter.minM` ÷ cap), cap = min(√(plot area)/3,
   `jitter.maxM`)); T43-2 on bent and curved frontages every row footprint's front chain lies at `h` from its frontage
   along the normal (within the 0.71 cm hot pixel) and every party wall is its plot side line; T43-3 no recession lies in
   (0, `attractCm` + 1 cm), and an `editTable` or `editPreset` setting `jitter.minM` below that bound is refused naming it
   (F-EDIT); T43-4 under the `MFCG` preset the recessions follow 4.8 m / 2 m, and the institution, tents and cluster rows
   draw none under every preset; T43-5 a designation mutation that keeps the main slot keeps its `frontJitterCm`, and
   Regenerate (keep settings) reproduces every front; T44-1 under the default preset every prosperous or rich set-back
   compound carries a `wall` PlotBound with a gate on each access edge, and under the parity presets none carries a wall.
   Item 42 needs no new bar (O5 a's T30-1 and F-PLOT's cell stand). (c) §16: no price change — the law is one draw and one
   offset inside S11's existing site-plan batch.
7. **Seat S2 (`scope-render-labels-…-authoring`), §15.1.** MFCG C3 "lot post-processing (`Offset`) | §4.7 S11 front-line
   jitter parameter" → "lot post-processing (the front recession, P9) | §4.7 S11 front-line jitter — the area-scaled
   recession (item 43)"; MFCG B11 "`indentFronts`" → "front recession" (route §C.5); NG C1 "(construction, 0 discards)" →
   "(construction: every plot with an access edge; NG 1.2.2's frontage-less leaves are its courts, item 42)"; NG C3
   "manor compounds (walls, hall, grove) | §4.7 S11 set-back compound site plan with boundary treatments" → add "(the
   enclosure is ours; NG 1.2.2 has none)" after "boundary treatments"; NG C7 "uneven streetwall | §4.7 S11 front-line
   jitter" stays true.
8. **Seats K, R, E1:** nothing. The compound wall is still a `PlotBound` treatment drawn by §8.2's treatment row; the
   recession needs no kernel operation beyond the frontage-band boolean S11 already uses (§3.7); E1's §7.7 is untouched by
   B (item 20 (h)'s wording in §4.7 is folded above).

## Verification (executed, 2026-09-28)

* **Block file:** three blocks (REPLACE, J-ROWS, RATIONALE-A), the file ending on `=== END ===`; the REPLACE heading
  occurs exactly once in the live design (sha256 `1c23190f…`, 13 026 lines, re-hashed at resume — unchanged since the
  route's reading).
* **Diff of the replaced subsection against the live §4.7:** only the intended changes — S10 (7)'s item-71 clause, S10 (10)
  (item 42), S10b's item-63 bullet, S11's column list (item 43, `Offset` gone), S11's item-71 and item-63 sentences, the
  row and compound cells (items 43, 44), the tents note and `cluster` row (item 70), the *Front-line jitter* paragraph
  (item 43), the Entrances phrase (item 50), step 6 (J-A67.49) and the households wording (20 (h)); every other line
  byte-identical.
* **Double-REPLACE guard:** `grep '^=== ' blocks-*.md` — no other block file REPLACEs §4.7 (A's §4.6 REPLACE is the only
  pipeline REPLACE nearby). Ids: no J-A42, J-A43, J-A44 or J-A67 id exists in the design, the rationale or another block
  file.
* **Gate (c):** the block's tokens intersected with every backticked token of the code readings, `_critic-code.md` and
  `code-impact.md`: 88 common words, none absent from the live design (no new reference identifier). P9 exists in
  `code-impact.md` §(d) ("area-scaled uniform front recession with a floor | MFCG 12710731; NG 1.2.2").
* **Document checks (§17.1 (2)) on copies** (`scratchpad/b47/simulate.py` applies this file to copies of the design and the
  rationale; never the live files): design `--sections "4.7,Judgment calls"` — untouched C1 5/0, C2 0, C3 91/0, C4 1/0,
  S1 0, S2 0, exit 0; with this file C1 5/0, C2 0, C3 90/0, C4 1/0, S1 0, S2 0, **exit 0**. Rationale `--sections "Part A"`
  — one new C3 run ("up to 1 5 m", J-A43.42) was reworded; after it the hit set equals the untouched copy's exactly (Part A
  carries pre-existing unreviewed hits, exit 1 on both copies — none is this seat's). The combined copy (all seats) is the
  assembler's run.
* **CONFIRMED vs PLAUSIBLE:** CONFIRMED — the diff, the guard, the id search, the identifier intersection and the check
  counts above (executed); the attraction arithmetic (§3.6 step 3 at 26 cm), the area-term threshold (9 × `jitter.maxM`²
  ≈ 20 m² at 1.5 m) and the MFCG example (40 % of 100 m² plots at 2–3.3 m) by computation. PLAUSIBLE — that the parity
  preset's per-preset values (item 37's rule) will carry the jitter pair exactly as noted (seat E2's text).
