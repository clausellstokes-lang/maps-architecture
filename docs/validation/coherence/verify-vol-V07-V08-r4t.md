# Verify round 4 — volumes V07 and V08 — lane coherence/verify-vol-V07-V08-r4t

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/verify-vol-V07-V08-r4t; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V07-V08-r4t`, 2026-10-01)
- P0 brief read whole; inputs located (r3t findings, adjudication-r4 Part H · V07 / V08 and R4-04, -05, -07, -08, -15, -16, repair-r4-V07 / -V08 headers, assemble-r4); live V07 a55c4d08… and V08 4675c05e… equal to assemble-r4's after-hashes; pre-round-4 texts from git 6c640e5^ equal to its before-hashes: done
- P1 the six round-3 findings re-checked in the live text, with their second ends: pending
- P2 the round-4 blocks (V07 4, V08 17) read whole by word diff, subsection by subsection: pending
- P3 ids, references, terms, deferral and narration, sizes, doc_checks: pending
- P4 report, result file, LANDED: pending

## Inputs and method

* Live units: `docs/volumes/V07-village.md` sha256 `a55c4d08…` (605 033 bytes, 4 068 lines) and
  `docs/volumes/V08-settlementforge.md` `4675c05e…` (572 529 bytes, 3 698 lines), equal to assemble-r4's after-hashes; the base
  `5f34ccbe…`. The pre-round-4 texts are git `6c640e5^` (V07 `285e2f6f…`, V08 `bf9fa7be…`, equal to assemble-r4's before-hashes).
* Round-4 blocks in scope: V07 4 REPLACE (## 1b, §4.5, §5.6, ## 7; 7 changed hunks), V08 17 REPLACE (## 1b, §2.2, §2.4, §2.7, §3.5,
  §3.6, §3.9, §3.15 – §3.17, §4.6, §5.4, ## 6, §7.1, §8.2, ## 9, ## 12; 59 changed hunks). Each hunk was read by word diff and
  then in its whole live subsection, with the base and volume texts it cites.
* Binding: adjudication-r4 (R4-01; R4-04, -05, -07, -08, -15, -16; Part H · V07, · V08, · scope), with adjudication-r2 / -r3
  where not superseded by name.

## P1 — the round-3 findings, re-checked in the live text

| id | grade (r4) | disposition (Part H) | verdict | where |
|---|---|---|---|---|
| VV78-r3-01 | major | FIX per R4-15 (d) | FIXED | V08 §2.4 `select`'s refused branch (`'E_UNKNOWN_SHAPE' \| 'E_LINE_UNSUPPORTED'`) and *Selection*; §3.5 steps 1 and 3; B3's detection, B5's cause; T-V8-14's B3 and B5 forcings; J-V8.9, J-V8.134; base §14 port item 2 agrees |
| VV78-r3-02 | major | FIX per R4-15 (b) | FIXED | V08 §2.4's `population` row; §3.5 step 3; §3.17's digest, village and one-input rows; §3.16 (9) (b); J-V8.134; T-V8-49 (f) at a creation and an absorb; base §1.1, §14 port items 3–4 agree |
| VV78-r3-03 | minor | FIX | FIXED | V08 §3.16 (10) names T126-2's and T126-3's clauses |
| VV78-r3-04 | minor | FIX | FIXED | V08 §2.2 `MapSession.setLayer` (event shape equal to base §7.1's `setLayer`), `setView`'s comment, §3.16 (4) and (6) (g), T-V8-61 (b) |
| VV78-r3-05 | minor | FIX per R4-15 | FIXED | base §14: `PortNote.kind` `line_differs`, `field_fallback`'s comment, `DossierDigest.settlement.key` and `seed` comments, port item 2's ONE-WAY SEED, `E_OTHER_SETTLEMENT` (type comment and port item 4); §7.7 item 12's key row (VDC3-03) and item 10's absorb clause agree with V08 §3.5 |
| VV78-r3-06 | minor | FIX | FIXED | V07 §5.6 (2)'s `approachByGate` row, in one pass with VPC-R3-04's `beyondWalls` and `approachRoads` rows and `gatesAndKeep`'s camp land, all agreeing with base §10.2 (d) |

The other round-4 issues V07 and V08 own were also checked in the live text: VAH-r3-09 (with VV910-r3-05), VPC-R3-04 (with
VAL-R3-10), the END of VAT-r3-02 (V07 §4.5, W74, T-V7-69 (e); its far ends at base §11.2's `why` member and *Knowledge*, V10
§2.13's `WhyProvider.explain` opts and V09 §2.7's `WhyCardModel` are written); VAH-r3-04 (with VAT3-r3-05), VAH-r3-05 (every
added DR feed checked against base §7.7's DR input cells — DR1, DR2, DR5, DR6, DR7, DR10, DR17, DR24, DR27, DR32, DR36, DR37 —
all agree), VAH-r3-10, VCS-r3-03, VEL3-r3-02 (V08 §3.5's absorb rule; base §7.7 item 10 agrees), VV56-r2-04 (V08 ## 6's catch-up
batch, T-V8-63, J-V8.137; V06 §6.8 (1), (3), (6) and T-V6-24 read the batch's `b` and `a`), VV1112-r3-03 (with VAH-r3-11), and
V08's four END lines (VAT3-r3-02, VAT3-r3-01, VRC3T-07, VAH-r3-06): all FIXED, with the new problems below.

**Seen and not raised again:** §4.11 *The clock* (4)'s "with the absorb's week itself before the last epoch's" against V08 §3.6
(3), §3.17 and T-V8-49 (g)'s "`W₁` not after `W₀`" — verify-pipeline-r4t's VPC-R4-02 (major, pipeline), whose required change
matches V08's text; nothing further at V08.

## P2 — the round-4 blocks, read whole: new problems

* **VV78-r4-01 (major, CONFLICT; V07).** R4-04 (b) makes every reader of a disaster look's damage, tone, lines and rows read
  one predicate — the look **stands over** a building of its units until V06 §3.22 (3)'s `crisisLookYields` turns true on
  it (base §10.2 (f), l. 15712–15716); §8.2 (l. 13125) keeps a unit's `ruinTone` "while the look stands over any of its
  buildings", and V09's why card on a building shows `info.crisis.ruinedFor` only where `LooksAnswer.crises[].over` is true
  (§11.2, l. 16325). V07 §4.5's crisis line (rewritten this round, l. 3125–3129) gives the row "for a `VillageEnd` a
  disaster look ruins … while a crisis look stands at the viewer's key", read from `opts.view`'s `crises`, `week` and
  `looks` — the look's weeks, with no hand-over. At a village rung whose rebuild starts inside the condition's weeks (V07
  §5.6 (4): "A disaster's ruined look yields building by building to its rebuild's Works"), an end whose every building has
  begun its rebuild draws no ruined tone and no building row, yet its own why card says "For now: Ruined quarters, the
  mill-end fire, weeks 30–34". Two outcomes for one case (R4-04's class, graded major there); R4-04's sweep did not list V07
  §4.5, §5.6 (6) or T-V7-69 (e), whose bar (e) passes the stale row.
* **VV78-r4-02 (minor, TERM; V07).** R4-04 (a) and (b)'s phrases are not used at three other V07 sites, each a restatement
  narrower in form (V07 §5.6 (3) defines the units, and V06 §3.22 (3) and §8.2 are cited, so nothing built changes): §5.6
  (3)'s **The look** — "a building whose rebuild Works has begun draws its Works instead (V06 §3.22 (3)'s
  `crisisLookYields`)" — names only a rebuild and omits the predicate's "other than a `decay` Works", "unless finished before
  the overlay's `sinceWeek`" and "a preview never hands over", and gives the units' tone without "while the look stands
  over any of its buildings"; §5.6 (5) "the ruined ends' tone" and §3.17's hand-off row "the village's ends after a hand-off
  down" say "ends" alone at the village rungs, where an end-less thorp's units are its toft groups.
* **VV78-r4-03 (major, NEW-PROBLEM; V08).** V08 §3.5's new absorb rule (l. 1674–1683) holds the carried fact for "a field
  that takes its field-table fallback (V08 §2.4) — its path absent, or its value of no form its row reads". The field table
  routes record sub-fields through the same fallback cells: the `institutions[]` row's "a record's own absent field takes its
  row's `else` (V08 §2.6)" (its paths list `status`, `inactive`, `worldPulseFate`, `remnantReason`, `impairments[]`), and the
  `activeConditions[]` row's "a missing `label` no name, a missing `duration` no `untilWeek`, a missing `sourceEventType` the
  `archetype` row". The rule does not say whether it reaches inside a record. Read literally, an institution whose record
  drops a current-only stamp (SettlementForge's entity stamps — `worldPulseFate`, `remnantReason`, the `…ByEventId` stamps —
  are "per entity, current only", research/sf/dossier-generation.md l. 864) keeps its carried `fate` and `inactive`. With
  the diff's "fates first" (§3.5's institution row; §7.7 item 14), a record SettlementForge reopens (F6: "status back to
  `active`", research/sf/mapping.md l. 628) then stays closed on the map. Its cleared impairments and a condition's dropped
  `duration` likewise stay as carried. Read as top-level only, the record's `else` is compared as before round 4 and the
  institution reopens. Two builders build different absorbs on the reopen path. R4-15 (a)'s reason ("on a map made without
  a dossier nothing moves the population, the name, the tier or the institutions") concerns the dossier's own fields, not
  a readable record's optional parts.
* **VV78-r4-04 (major, EDGE-UNDEFINED; V08).** Round 4 made a late arrival a defined case for a calamity only (V08 §3.6 (3),
  R4-08; T-V8-49 (g)). Its F5 targets' dossier events "ride that epoch with it", with no week stated (the calamity's own
  entry sits at `W₀` + 1). Every other newly carried element change dated at or before `W₀`, absorbed with `W₁` after `W₀`,
  has no stated week. §3.6 (6) folds element events "at their week, between the epochs of (3)", but such a week lies before
  the last epoch, already in the log. §7.7 item 6 has it mutate "the map the last epoch left", and §4.11 *The clock* (1)
  derives the document's current week from "the last folded event that carries one". So an absorb whose last event is such
  a change (its present week coming from an already-carried tick) moves the drawn week back before the last epoch: the
  season and every Works stage begun since then are drawn as of an earlier week. The degenerate row (`W₁` not after `W₀`)
  applies such changes finished; the `W₁` after `W₀` case has no outcome and no test (principle (11)).
* **VV78-r4-05 (minor, NEW-PROBLEM; V08).** V08 ## 6's catch-up batch row (l. 3196) has three imprecisions in its new text.
  (a) The batch is "the dossier events one epoch's span holds — dated in (the previous epoch's week, its week]", but an
  event dated at the epoch's own week rides that epoch's `EpochInputs.dossier` (§3.6 (6); §7.7 item 6), so it is never a
  standalone event of the pass. (b) "plus per event ≤ 3 ms and ≤ 3.5 ms" leaves the rung of each implicit; V06 §6.8 (1)
  states it (3 ms at TOWN and CITY, 3.5 ms at METROPOLIS). (c) "one of T-V6-24's fixtures doing so fails the release" can be
  read to take in T-V6-24's fourth catch-up fixture (100 years carrying 5 000 at the METROPOLIS cap), which is built to pass
  the budget and whose bar is the one-epoch fold reported F-BUDGET-TIME. V06 §6.8 (6) says "one of T-V6-24's three catch-up
  fixtures". Each is cited to the text that settles it, so a careful builder builds the same.
* **VV78-r4-06 (minor, WIRING; V08).** The new `MapSession.setLayer` (V08 §2.2), like `MapSession.setView` beside it, has no
  row in V08 ## 1b, which lists "every piece this volume adds" (its other `MapSession` calls are W12, W18, W19, W76). Both
  ends exist in the text (the host page; §7.1's `setLayer`, §2.9's `week` and selection), so this is a list omission.
* **VV78-r4-07 (minor, CONFLICT; V08).** R4-15 (a)'s absorb case was swept into W98, §3.16 (9) (b) and §3.17's village and
  one-input rows, but two restatements of the `name` fallback still give the creation value alone: §5.5 (l. 3162–3164) "an
  empty dossier name takes the generator's own (§10.4; V08 §2.4's fallback, noted `field_fallback`), so a title always has
  one" and §3.17's labels row (l. 2696) "an empty dossier name takes the generator's own (§10.4), noted `field_fallback`".
  The `name` row and §3.5 keep the carried name at an absorb. Since the title reads the document's name, nothing built
  changes.
* **VV78-r4-08 (minor, CONFLICT; V08).** VV1112-r3-03's fixture sentence (V08 §7.1, l. 3222–3224) stands the three crises'
  shared week "on `city-1` and on `metropolis-3`". V12 §3.15.12's T122-6 (l. 2715–2718) and X-V12-5 (l. 3414) measure that
  week "at CITY and at the METROPOLIS cap". `metropolis-3` is a frozen METROPOLIS fixture of 45 824 people
  (research/sf/PLAN.md l. 406), not the 120 000 cap. Elsewhere V08 separates the two: its force fixtures are "each at TOWN,
  CITY and the METROPOLIS cap", and §3.17 tests "the cap's 120 000". So the share under `densityCap` is measured at the cap
  on no fixture.

Checked and sound (no finding): the B3 / B5 split everywhere it is stated (V08 §2.4, §3.5, §3.9, §3.16 (9) (b), §3.17,
J-V8.9, J-V8.134; base §14 items 2 and 5, `HostContext.line`); the cap's refusal at creation and absorb (V08 and base §1.1,
§14 items 3–4, §7.7); the `population` fallback cases; the key and seed fallbacks (§14 types, port item 2, §7.7 item 12);
`setLayer`'s event shape (§7.1 l. 10309); `ExportOpts.displayNames` and `.knowledge` (§11.2 l. 16205–16207); the
view-bound `why` at its three far ends; V07 §5.6 (2)'s camp places against §10.2 (d); every added DR feed; the present at
creation at W64, the present-week row, §3.15 (2) and §3.16 (4) (the one remaining "creation week", §3.6 (3)'s `W₀`
default, is the `generate` event's week, as R4-07 intends); V06 §3.20.2's event at the present; V08 §3.16 (7) (b) and §3.17's
crisis row in R4-04's phrases; the `late` variant's catalogue pattern (`line_defaulted.stamp`, `history_gap.age`); V06 §6.8's
`b` and `a` equal to V08 ## 6's costs and 6 310 ms; T-V8-63 and J-V8.137 unique in the set, wired at W89, SF7 and ## 12.

## P3 — ids, references, terms, deferral, narration, sizes, clean-room checks

* **References** (assemble-r4's `refs.py` over the live set): 55 885 references, 0 BROKEN, 0 FIX; V07 3 503 resolved + 20
  external, 0 ambiguous; V08 2 792 resolved + 12 external, 0 ambiguous; 3 467 ids defined.
* **Ids:** 2 760 table-defined ids across the base and the volumes (T-V…, J-V…, T-ER, J-A, EP, R12), none duplicated; V07
  T-V7-1 – 69 and J-V7.1 – 146, V08 T-V8-1 – 63 and J-V8.1 – 137 (T-V8-63 and J-V8.137 new, used only in V08); W1 – W100 and
  B1 – B21 unchanged.
* **Terms:** no retired term of the canon's glossary (patterns of `glossary.retired`) in the round's added text (202 added
  runs); Part I of adjudication-r4 retires no term.
* **Deferral and narration:** none in the added text (no TBD, "open", "later", "for now" as a choice; no review id `R4-nn`,
  `R3-nn` or verifier id; V07's "For now: Ruined quarters …" is the catalogue's own sentence).
* **Sizes** (whitespace-split words): V07 99 932 → 100 120 (+0.2 %; archive 104 422, −4.1 % overall); V08 88 612 → 90 869
  (+2.5 %; archive 84 356, +7.7 % overall). A repair round adds findings at build depth. Neither unit has shrunk by more than
  half against its archive, so the nuance audit of the guard is not triggered.
* **doc_checks.py** (`--heads docs/ARCHITECTURE.md`) — WARNING: reference corpus INCOMPLETE (captures, research/patreon,
  research/devlogs, research/ftg-docs, research/external missing): NOT authoritative, provisional. V07: C1 0, C2 0, C3 365 /
  319 unreviewed, C4 1 / 0, S1 0, S2 406 / 0 (before the round: the same, S2 404 / 0). V08: C1 0, C2 0, C3 183 / 155, C4 2 /
  0, S1 0, S2 283 / 2 (equal to repair-r4-V08's target). No new unreviewed hit.
