# Rewrite — V06 (evolution): the coherence, cohesion, wiring and elegance pass

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-V06; covered by the whole-design retrovalidation (J84).

**Output:** `docs/validation/coherence/new/volumes/V06-evolution.md` (same title line and section structure, one marker
line; new subsections §2.14, §3.12.1, §3.20, §3.21). Working parts: `docs/validation/coherence/work/rewrite-V06/`.

## Sizes

| measure | before | after | change |
|---|---|---|---|
| words (`wc -w`) | 104 574 | 93 672 | −10 902 (−10.4 %) |
| words (the canon's counter) | 106 357 | ≈ 95 300 (same ratio) | ≈ −10.4 % |
| bytes | 665 661 (650 KB) | 586 557 (573 KB) | −11.9 % |

**Shares of the words removed (≈ 20 400 removed, ≈ 9 500 added):** narration ≈ 12 900 (the 180-line banner, ledger and
reading-record head 2 279; the eleven reconciliation and finalization notes 7 851; §12's round history ≈ 2 000; the
revision narration in §9's rows and the ≈ 800 critique and seam ids in the body ≈ 800); restatement ≈ 5 300 (§10's 28
request blocks 5 588 → a 28-row pointer table ≈ 900; §13's 49 hand-off rows and ledgers 5 139 → the closure table ≈ 900;
the 14 references, the verbatim V05 §6 quotation (V06-RESTATE-1), the pathway, `formerClass`, `why`, `suppress`, device
settings and crypt-lifecycle restatements → pointers ≈ 1 400); duplicated mechanisms ≈ 400 (E-01's profile mechanics
cited at §2.2 rule 5 instead of restated in §2.12; the EpochReport's two `households` blocks made one; the integration
notes folded); verbose prose ≈ 1 800 (§1b's longest wiring rows, §6.2's century derivation, §1.2's "applied by the
coherence pass" asides, §9's row wording).

**Added (new design the pass requires, ≈ 9 500):** g item 111's V06 part ≈ 1 200 (§3.12.1, §3.5.3 (4), the drought row,
the `spring.*` and `drought.*` rows, W82, T-V6-70, J-V6.127–129); g item 113's V06 part ≈ 4 600 (§2.14, §3.20, §6.3's
replay budget, W83–W86, E9, T-V6-72–77, J-V6.130–135, the §3.15 and §4.4 bends, the dossier-trace history row); the edge
catalogue ≈ 3 300 (§3.21: 6 general rules, 37 mechanism rows, 13 combination rows, T-V6-71); closures ≈ 400 (§4.1's undo
after a reload and in a shared document, §4.5's V10 reads, the IN notes' content at their homes).

**Why below the band (25–40 %).** The carried text alone shrank ≈ 19.5 % (104.6k → ≈ 84.2k); the owner's items 111 and
113 and principle (11)'s edge catalogue add ≈ 9.5k of required design. The remaining body is dense normative text —
interfaces, rule tables with values, per-step algorithms with their order, lifecycle rows, test bars and reasoned
decisions — whose every sentence is a rule, a case, a value or a bar (the guard forbids thinning them); its only
restatements left are the wiring table's producer and consumer names (principle (7) requires them) and §0's plain-words
summary (the volume's own, by design). No unit part shrank by more than half.

## Conflicts resolved (9)

| conflict | ruling applied at |
|---|---|
| V06-ICONF-1 | V06 §2.8: the no-stretch `repairWall` with no neglect is a no-op with its line ("this wall is in use"; nothing changes, no event) |
| V06-ICONF-2 | V06 §9 J-V6.92: the water-system record makes the need count as met, raises the aqueduct cap and total by `capPerSizeMember` per SIZE member, binds the terminal, never scales the chance |
| V06-ICONF-3 | V06 §2.3's `stoppedAt?`; V06 §10's BCR-V6-9 → item 343 row names it (cross-part note to determinism) |
| V06-ICONF-4 | V06 §5.1: V09's label "Open a copy from here" |
| V06-XCONF-1 | J-V6.4 marked superseded by g item 113 (E-24); V06 §1.3's bullet replaced; V06 §3.20 written |
| V06-XCONF-2 | DR28 (one row with V08's) and DR29 everywhere; "the coherence pass numbers it" removed |
| V06-AGREE-1 | V06 §3.19.3 (6), §4.2: V09's `info.remove.holds` with its `{kind}` slot; the deck-plot line a V09 variant row |
| CANON-C02 | V06 §4.1: a standalone neighbourhood document has no clock (the ruled behaviour, V09/V10 bend rows, T-V6-23); J-V6.102 |
| CANON-C03 | V06 §11: Q1 answered, J122 |

## Elegance rulings applied

* **E-01 — UNIFY (stretch-state profiles).** V06 §2.12's rows for `Enceinte.condition` and `RetainingWall.state` now cite
  §2.2 rule 5 for the mechanism and keep only what each record owns. Equivalence list, each item at its home:
  - [x] canonical form (first-vertex knot, no knot on a closed chain's start, drop equal knots, all-equal as scalar, `standing` absent) — §2.2 rule 5; V06 §2.12 cites it ("§2.2 rule 5's canonical form"; "absent = `standing`")
  - [x] write (near knot the new state, far knot the old; `splitThrough`; no stretch = whole chain) — §2.2 rule 5; V06 §2.12 ("each writing over its `StretchRef` by §2.2 rule 5")
  - [x] read (`sampleProfile`, cyclic on a closed chain) — §2.2 rule 5
  - [x] regenerate (knot carry by lattice point; re-placement within `retaining.settings.stateSnapCm`; first-vertex knot re-placed) — §2.2 rule 5; V06 §2.12 ("§2.2 rule 5's carry"); the cell's register line at V06 §8 (E2, `bar.T-V6-62`)
  - [x] cut or join (J-K23's rekey pairing) — §2.2 rule 5; V06 §2.12 ("kept through a re-derivation, a cut or a join by §2.2 rule 5")
  - [x] undo (the writing op's undo restores the profile) — §2.2 rule 5; V06 §2.12's undo cells
  - [x] migrate (absent = default; a scalar = constant profile) — §2.2 rule 5
  - [x] RetainingWall keeps: values standing|decayed|ruined, knot role `retaining_state_knot`, writers (BCR-V6-26's member: breach → decayed, dismantle → ruined; `repairRetaining`; V05's landfall; V07's house-platform walls through the pool), restoration over the re-levelled length (V06 §3.19.4 (6)), readers (V06 §3.19.4, V04 footings, the renderer, item 447's export, the clerk) — V06 §2.12's row, §3.19.4, W77
  - [x] Enceinte keeps: values standing|breached|dismantled, knot role `wall_state_knot`, writers (`breach`, `dismantle`, V05's landfall, `repairWall`), its lifecycle rules (abandoned on neglect; decayed while a run is not standing; lifted by the no-stretch `repairWall`, V06 §2.8), §8.2's gap glyph and trace discs, §11.1's per-run LineStrings — V06 §2.12's row, §2.8, §3.7.5, W79, §5.1
* **E-02 — KEEP APART** (the suppression on a delete event and V05's live island record). V06 §2.13 states the nuance
  that separates them (a count-law slot and an archived arena a key on an event cannot hold) and cites the one lift rule
  at §2.8 (item 260); V06 §2.12's suppression row cites it.
* **E-24 — UNIFY (one mark on a superseded or amended decision).** J-V6.4 "**superseded by** g item 113"; J-V6.111
  "**amended by** J-V6.126". Equivalence: [x] no row dropped (J-V6.4 and J-V6.111 kept with their text); [x] the governing
  row keeps the reason (g item 113 at V06 §3.20; J-V6.126's reason). Every other row's revision narration
  ("**revised**", "*Amended (…)*", "as round 3 amends it", "a recorded variation of C6-…") is stated in final form.
* **E-39 — KEEP APART** (closure and decline states). No unification; V06 §3.18.1 reads V04's `lost` value (item 113 (e))
  where a lived void's last open path closes; the way ladder, the stretch condition and the building lifecycle stay as they are.

No other unification was made.

## Id rulings and renumberings

* **ID-DR:** DR-V6.1 → DR28 (one row with V08's DR-V8.6); DR-V8.1 → DR29; the dossier trace names DR30–DR35 for items
  105 (i), 109 (a), (b), (k) and 110 (b); DR36–DR39 cited for the history.
* **ID-BCR:** no bare `BCR-n` of V01 or V04 remains (the one hit, V01's `BCR-6`, now cites file f item 207).
* **ID-WX:** bare other-volume row ids removed (`X17`, `X31`, `X23` …); this volume's `W1`–`W86` stay local; the IN ids
  live only in the Integration notes table and the validation records.
* **G-cite:** every `V6 §`, `V4 §`, `V1-3.7.3`-style pointer normalised to `V06 §`, `V04 §`, `V01 §3.7.3`.
* **Terms:** G-strike ("strike pool"), G-hollow ("hollow way"), G-forkat ("Open a copy from here"), G-standalone
  ("standalone neighbourhood document"), G-dwell (`N_b` for the candidate dwellings), G-newrandom ("New random";
  `rerollLayer` in the one test clause), G-unitinput (the `handover` kept only as V05's `IslandInstitution.handover`),
  G-DR as above, G-lot (no hit remains).
* **New ids** (none collides): W82–W86; T-V6-70–T-V6-77; J-V6.127–J-V6.136; build step E9. No existing id renumbered.

## Wiring gaps closed (6)

* **W-DOS-02** — W27's producer is V08 §3.5's diff row `wealth` (→ `EpochInputs.wealthLevel`, DR6).
* **W-DOS-09** — the replay record: V06 §3.20.6 writes the `HistoryRecord` the clerk reads (DR36–DR39 the base's).
* **W-DOS-10d** — the dossier trace cites DR33, DR34, DR35 (and DR30–DR32) by number.
* **V06-WGAP-1a / 1b** — V06 §4.1 names V09's `bend.*` row and V10's bend row for the line (their rows are V09's and V10's; cross-part notes).
* **V06-WGAP-2** — V06 §13 keeps no open item; X1–X49 are closed at their destinations and this volume's inbound hand-offs in its table.

## g items written at build depth

* **111 — failing springs and oases over epochs:** V06 §3.12.1 (the droughts, the flow, failure and return, what follows,
  the neutral pin), §3.5.3 (4) (the gardens), §2.2 (`spring.*`, `drought.*`), §2.4 (the `drought` hazard row and calamity
  row), §2.12 and §4.2 (lifecycle and hand form), §5 (drawing, template lines, `plat:springFlow`), W82, the trace's drought
  and oasis rows, T-V6-70, E5, J-V6.127–129.
* **113 — the replay engine at generation:** V06 §2.14 (records), §3.20 (plan, first generation, prefix epochs, what a
  replay epoch runs, lazy detail, destruction, abandoned epochs, refounding, burial through V04's `BuriedFormer.lay`,
  symbolic provenance, the budget, the record, the present met, lifecycle, edges), §3.1 (3) and §3.16 (the replay's
  epoch component), §3.15 (scrubbing the past), §4.4 (the bends), §4.5 (the story), §5 (drawing, years, exports), §6.3
  (budget), W83–W86, T-V6-72–77, E9, J-V6.130–135; J-V6.4 and §1.3's bullet retired.

## Hand-offs closed here (19)

V02:X8, V07:FL-3, V08:X3, V08:X11, V08:X21, V08:X24, V09:XV-V9-23, V09:XV-V9-28, V10:CVR-V10-5, V10:CVR-V10-11,
V11:X-V11-11, V11:X-V11-15, V11:X-V11-16, V12:X-V12-4, V12:X-V12-10, V12:X-V12-11, V12:X-V12-15, V12:X-V12-17,
V12:X-V12-19 — each at the home V06 §13's table names; CVR-V10-5 and CVR-V10-11 by the new paragraph of V06 §4.5.

## Edges (principle (11))

The 48 UNDEFINED and 64 UNTESTED edges of V06's mechanisms, the two inventory edges (EI-V06-EDGE-1, -2) and the 42
UNDEFINED combinations routed here are defined, placed on the failure ladder and tested in V06 §3.21 (T-V6-71, T-V6-72)
and V06 §3.20.9 (T-V6-77); the two named combinations ("a settlement that grows over a sealed void", "an epoch undone
after a save") are rows of V06 §3.21.3.

## Open findings routed here (51) — each closed

| finding | closed at |
|---|---|
