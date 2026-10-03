# Verify — design volumes V01 (neighbourhoods) and V02 (buildings) after the coherence rewrite (coherence/verify-vol-V01-V02-r0)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/verify-vol-V01-V02-r0; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V01-V02-r0`; cloud continuation, started 2026-10-03 02:39, resumed 04:43 from the
disk state; scratch `scratchpad/coherence/vv12/`)
- P1 inputs gathered (canon units V01, V02; edges; cross-part notes to V01/V02 in every rewrite report): done
- P2 mechanical checks (ids, references, terms, deferral, narration, mapping coverage, token coverage): done
- P3 V01 archive-versus-new review (every changed or removed segment, 466 review units): done
- P4 V02 archive-versus-new review (504 review units; the 142 prose-only ones screened for technical residue): done
- P5 canon routes (conflicts, elegance, f items, g items, wiring, hand-offs, agreement, edges, cohesion): done
- P6 issue list, results JSON, LANDED: done

## 1. Outcome

**32 issues: 2 blockers, 17 majors, 13 minors.** By owner: V01 12 (7 majors, 5 minors), V02 12 (1 blocker, 8 majors,
3 minors), pipeline 2 (1 blocker, 1 major), model 2 (1 major, 1 minor), determinism 1, V05 1, V10 1, V11 1 (minors).
Thirteen of the 32 were first raised by the agreement lanes — eleven kept under their VAP-, AT- and AF- ids so the
adjudicator can merge them, and VV12-07 (= AF-14) and VV12-09 (= AF-04), found here independently; each was re-checked
against the live text and is still open.

Both volumes keep their content well. Every one of the 1 191 inventory ids is mapped in the rewrite reports' tables and
every mapped target section exists; the body alignment (archive units against the new text, then every unit below 0.9 or
with a lost number read by hand) found the values, cases, fallbacks and bars at their new homes (V02 §3.10.9's constants
table, V02 §5.3's style cells, V01 §3.14's column table, the base sections the f items wrote). Neither volume shrank by
half (V01 −18.5 %, V02 −18.5 % by `wc -w`; both below the 25–40 % band, each report naming the irreducible content and
the added principle-(11) design), so no half-size nuance audit was triggered; the decision rows were checked for kept
reasons (every J-V1 and J-V2 row against its archive row).

The defects are of five kinds:

* **Two records declared nowhere** — `NeighbourhoodRequest` / `NeighbourhoodResult` (V01 §2.4 and base II.1 each say the
  other declares them; blocker) and `OutlineTemplateId` (V01 uses it, the base names its rows in prose only).
* **File g item 114 (filed 2026-10-03 02:35 UTC, after both rewrites)** withdraws the held deletion of item 260 that V01
  and V02 still state (V01 §0, §3.17.5, T-V1-52; V02 §3.16 (7), §3.17 (b)).
* **One value disagreeing with the base**: V02's `massing` concern "attempt cap 3" against §6.1's cap 2 (cap = the highest
  attempt index, J-DET-55); and one behaviour changed without a ruling (V02's `valleyReach` for a shed roof).
* **One reason lost** in V02's §9: the superseded rows J-V2.73 and J-V2.76 were cut to their marks, and J-V2.79 does not
  carry their specific reasons (the sealed stack as the early stepped royal tombs) — E-24's equivalence list.
* **Edges and small agreement gaps**: V01 §3.18 has no row for §3.5.7, §3.5.9 and §3.7.4 (λ_b on a band with no plot land
  is undefined); stale item numbers; restatements of base rows; a retired bend id left in V10.

## 2. Inputs

`docs/volumes/V01-neighbourhoods.md`, `docs/volumes/V02-buildings.md` (live, 2026-10-03 01:53); the archives
`docs/archive/volumes-pre-coherence-2026-09-28/V01-neighbourhoods.md`, `…/V02-buildings.md`; `inventory-vol-V01-V02.json`;
`canon.json` / `canon.md` (units V01, V02; conflicts, wiring, elegance, ID rulings, glossary); `agreement.json` (the 29
hand-offs routed here); `edges.json` (V01: 133 undefined, 99 untested edges, 15 combinations; V02: 47, 21, 28);
`rewrite-V01.md`, `rewrite-V02.md` (mapping tables, cross-part notes); every other rewrite report's cross-part notes
addressed to V01 or V02 (V03, V10, V12, determinism, kernel, model, pipeline, rendering, scope); the landed base
`docs/ARCHITECTURE.md` (02:09); `docs/AMENDMENTS-2026-09-28f.md`, `-28g.md` (items 102–114); the agreement lanes'
reports (verify-agree-proof, -time, -fabric) for their V01/V02 rows. `doc_checks.py` was not run (its reference corpus is
absent in this checkout; a result would be provisional only).

## 3. Findings

### Blockers

**VV12-01 · BLOCKER · LOST · owner pipeline.** `NeighbourhoodRequest` and `NeighbourhoodResult` are declared nowhere.
V01 §2.4 (l. 516) says they "are II.1's (item 539)"; base II.1 (l. 18002) says they, "with DistrictContext and
TypedBoundary, are V01 §2.4's"; V05 §2.3 (l. 385) cites "the `NeighbourhoodRequest` of V01 §2.4". The archive's
declarations (V01 §2.4, the interface file f item 539 puts in II.1 in place of the base's old one, PIPELINE-0642/0643)
are gone: the request's `district`, `key`, `layer`, `boundary`, `seam?`, `context?`, `laid {blocks, plots, alleys}`,
`strategy?`, `params?`, `closeup?`, `outlineTemplate?`, `lod: 'neighbourhood'` and the result's `mode`, `blocks`, `ways`,
`plots`, `buildings`, `greens`, `pins`, `hoodPins`, `places`, `labels`, `seams`, `report`, `districts`. The base comment
also misattributes `TypedBoundary`, which §2.5 declares (l. 1082).
*Required change.* II.1 declares, beside `NeighbourhoodStrategy`, `interface NeighbourhoodRequest { district: Id; key:
PlatKey; layer: 'ground'|'sky'|'underground'; boundary: TypedBoundary; seam?: SeamContract; context?: DistrictContext;
laid: { blocks: Id[]; plots: Id[]; alleys: Id[] }; strategy?: FabricStrategyId; params?: Record<string, number>; closeup?:
CloseupParams; outlineTemplate?: OutlineTemplateId; lod: 'neighbourhood' }` and `interface NeighbourhoodResult { mode:
'refine'|'replace'|'unit'; blocks: Block[]; ways: Way[]; plots: Plot[]; buildings: Building[]; greens: Greenery[]; pins:
Pin[]; hoodPins: HoodPin[]; places: HoodPlace[]; labels: LabelEntity[]; seams: SeamReport; report: StageReport;
districts: Id[] }` with the archive's field comments (V01 §2.4 of the archive); the comment after it reads "`DistrictContext`
is V01 §2.3's, `TypedBoundary` §2.5's"; V01 §2.4 keeps its pointer.

**VV12-02 · BLOCKER · NUANCE-LOST · owner V02.** E-24 cut J-V2.73 and J-V2.76 to "Superseded by J-V2.79.", but J-V2.79
does not keep their reasons, against E-24's equivalence list ("the governing row keeps the reason"): J-V2.76's "a sealed
stack (the early stepped royal tombs) is a lawful building whose unreached tiers V03 flags" — the historical ground of the
sealed form — now appears nowhere in V02; J-V2.73's "the nesting and the stair chain read only the wings with `on`, so
ground wings break neither" survives only as V02 §4.6's mechanism ("ST6's nesting is unchanged"), not as the decision's
reason.
*Required change.* J-V2.79's reason reads "…because item 101 R2 lets a tool refuse only what item 20 forbids and what a lock
protects; ground wings beside a stack break neither the nesting nor the stair chain, which read only the wings with `on`;
and a sealed stack — the early stepped royal tombs — is a lawful building whose unreached tiers V03 flags."

### Majors

**VV12-03 · MAJOR · CONFLICT (owner rule, g item 114) · owner V01.** Item 114 (c) withdraws item 260's held deletion
("deleting one is for now"; it lapses at the next change that re-reads the kind — an epoch, a New random over a place it
crossed, a Re-derive of the stage that builds it) and gives the off switch the "never" job. V01 still states the
withdrawn rule: §0 l. 76 "remove one the generator raised (it stays removed)"; §3.17.5 (1) "a removal of a generated part
is a suppression, item 260, that holds through regeneration" and (2) "the suppression's one reader … a Re-derive from S4
or S6 lays no raised part where one holds"; §1b l. 179 ("supports, spans and suppression"); §4's tool row l. 2590 ("a
removal's suppression, item 260"); T-V1-52 "the viaduct stays absent after Regenerate (keep), after New random on each
crossed district and after a Re-derive from S6".
*Required change.* §0: "(removed for now — the town may build one again when it changes; Advanced › Built by the town
turns raised ways off, item 114)". §3.17.5 (1): "a removal of a generated part is item 114 (c)'s delete for now: it holds
through a plain Regenerate, a reload and crash recovery and lapses at the next epoch, New random over a district it
crossed or Re-derive from S4 or S6; the kind's switch (item 114 (a)–(b)) is what keeps the generator from building one";
(2): "The generator reads the kind's switch; this volume reads only the committed way set." §1b and §4's rows cite item
114 in place of "suppression, item 260". T-V1-52: "the viaduct stays absent after a plain Regenerate and a reload; after
New random on a crossed district, a Re-derive from S6 or one epoch the generator may lay one again, and the deleted one
counts against no cap; with raised ways switched off none is laid (item 114 (e))".

**VV12-04 · MAJOR · CONFLICT (owner rule, g item 114) · owner V02.** V02 §3.16 (7) (l. 2301): "a deck plot the user removes
holds through regeneration and every epoch by item 260's suppression rule (keyed by its host and slot ordinal)"; §3.17 (b)
(l. 2326): "a removal holding through regeneration (item 110 (b); item 260)". Item 114 lists "building plots on bridges
and decks" and the raised ways among its switch kinds and withdraws item 260's hold.
*Required change.* §3.16 (7): "a deck plot the user deletes is removed for now (item 114 (c)): it holds through a plain
Regenerate and a reload and lapses at the next epoch or re-derivation of S10; the switch 'building plots on bridges and
decks' (item 114 (a)) keeps the base from offering any." §3.17 (b): "a removal lasting until the next change that re-reads
raised ways (item 114 (c)); the kind's switch stops them (item 114 (a))".

**VV12-05 · MAJOR · CONFLICT · owner V02.** The `massing` concern's attempt cap disagrees with its home. Base §6.1 defines
the cap as "the HIGHEST attempt index its ladder may reach: attempts run 0 … cap" (l. 8616) and lists `massing` with cap
**2** (l. 8718; J-DET-55, three attempts); V02 states "attempt cap 3" (§3.12, l. 1900), "attempts 0, 1 and 2 … (the
concern's cap 3)" (§3.5 M14, l. 1184) and "attempt `a` = 0, 1, 2 (the `massing` concern's cap 3)" (§3.15.1, l. 2056). Read
with §6.1's definition, "cap 3" means four attempts.
*Required change.* V02 l. 1184, 1900 and 2056 read "cap 2 (attempts 0–2; §6.1)"; nothing else changes (three attempts).

**VV12-06 · MAJOR · EDGE-UNDEFINED · owner V01.** V01 §3.18's per-mechanism table has no row for §3.5.7 (courts greened),
§3.5.9 (land in the programme) or §3.7.4 (the district's naming features), although the rewrite report says it holds "a
row per mechanism". The one undefined outcome among them: §3.5.9's `λ_b = sq_b + gr_b + yd_b`, with `sq_b` "the band's
sub-block share of `squares.quota` over its plot land per 1 000 inhabitants", divides by a band's plot land, so a band
with no households (a rich band in a poor town) has no defined `λ_b`, and S7b (1)'s subtraction for it has no defined value.
*Required change.* §3.5.9 adds "a band with no plot land has `λ_b` 0"; §3.18 gains rows "courts greened (V01 §3.5.7): no
court residue; a residue a wall crosses | nothing greened; one draw for every level piece | T-V1-11 (c)", "land in the
programme (V01 §3.5.9): a band with no plot land; a quota with no sub-block remainder | `λ_b` 0; `sq_b` 0 | T-V1-12" and
"naming features (V01 §3.7.4): a district with no feature | the rows' unguarded weights | T-V1-24"; T-V1-12's stress
fixture adds a town with an empty band.

**VV12-07 · MAJOR · CONFLICT · owner V01** (also AF-14). V01 §1b's wiring row (l. 260) names outline rows that exist
nowhere: "`star`, `ring_star`, `spindle_street`, `plaza_rect`, `plaza_star` outline rows (V01 §3.10.2)"; §3.10.1–§3.10.2,
§3.14 (l. 2094) and base §4.2 S1 (2) (l. 4640) use `star`, `star_round`, `street_strip`, `plaza_frame`. (The archive
carried the same slip, l. 425.)
*Required change.* The row reads "`star`, `star_round`, `street_strip`, `plaza_frame` outline rows (V01 §3.10.2;
`OutlineTemplateId`, §4.2 S1 (2))".

**VV12-08 · MAJOR · LOST (type declaration) · owner pipeline.** `OutlineTemplateId` is declared nowhere. The archive V01
§2.1 declared `type OutlineTemplateId = 'star'|'star_round'|'street_strip'|'plaza_frame'|'disc'|'d_shape'|'lozenge'|
'crescent'|'spindle'`; the new V01 §2.1 (l. 326) says it "is §4.2 S1 (2)'s row key", and uses it in `FabricParams.outline`,
`HoodKindRow.outline` and `HoodRecipe.outline` (l. 352, 394, 551), but base §4.2 S1 (2) names the rows only in prose and
spells one "D-shape" where V01's key is `d_shape` (V01 §3.10.1 l. 1744).
*Required change.* §4.2 S1 (2) declares the type with the nine keys as above at its outline-template sentence and writes
the prose list with the keys (`d_shape`); V01 §2.1 keeps its pointer.

**VV12-09 · MAJOR · CONFLICT · owner model** (= AF-04; V01's N2). `FabricStrategyId` is declared twice — model §2.5
(l. 1079, a string of V01's `hood.templates` row keys) and pipeline §4.12 (l. 8168, `'bent-cut' | string` with V07's
`'village-ways'`) — with different contents; V01 §2.1 cites §2.5.
*Required change.* As AF-04: model §2.5's declaration names every registered fabric id (`'bent-cut'`, V01's
`hood.templates` row keys at stage 2, V07's `'village-ways'`), `District.fabric`'s comment follows, pipeline §4.12 deletes
its line and cites §2.5; V01 §2.1 reads "(a registered fabric id; its stage-2 values are the `hood.templates` row keys)".

**VAP-18 · MAJOR · DISAGREE · owner V01** (verify-agree-proof; confirmed). V01 §8.1 (l. 3075) starts M5 "after M4 and
M4b"; J122's order, §16 and INDEX §3 start it after M4.
*Required change.* V01 §8.1's first sentence reads "Stage 2 is **M5** (§16): after M4, one of the four streams …".

**AT-17 · MAJOR · DISAGREE · owner V01** (verify-agree-time; confirmed). V01 §2.7's `Way.surface` row (l. 575) gives
`create` "S10a's end (V01 §3.7.3)" only; V01 §3.7.3 and V06 §3.4 (9) have the epoch's `field` phase write it, and V06 the
landfall clearance's `setAttr` pair.
*Required change.* As AT-17: `create` reads "S10a's end (V01 §3.7.3); at an epoch the `field` phase's re-lay (a `setAttr`
of the `epoch` event, cause `rule:field`; V06 §3.4 (9)) and the landfall clearance's `setAttr` pair (cause
`rule:landfall`; V06 §3.5.2)"; `undo` reads "the writing event's undo record (an epoch's for the engine's writes)".

**AT-18 · MAJOR · DUPLICATE-HOME · owner V01** (verify-agree-time; confirmed). V01 §3.5.11 (l. 1309) restates the
`hood.fabric` participant's scope with a different block set than its home V01 §3.3.6 (1)–(4).
*Required change.* §3.5.11 reads "S9b's epoch half is the `hood.fabric` participant's (V01 §3.3.6 (1)–(4)): its rule on
the blocks of `EpochScope.recut`; every other block keeps its content, and a standing square, green or manor block is a
survivor".

**AF-07 · MAJOR · DISAGREE · owner V01** (verify-agree-fabric; confirmed). V01 §3.17.6 (1) (l. 2391–2392) gives moat
bridges deck plots and owners; §4.7 S10 *Deck plots* offers none on a gate's moat deck (J-A110.41), the only moat deck the
base lays.
*Required change.* As AF-07: "A moat bridge carries no deck plot (§4.7 S10 *Deck plots*: none on a gate's moat deck, the
only moat deck the base lays; nor on a `ford`, a `draw` bridge or one without a `deckCm`)."

**VAP-09 · MAJOR · HANDOFF-OPEN · owner V02** (verify-agree-proof; confirmed). §13.2's takeover table gives V02 T110-4,
T110-5 and T110-7; no V02 test names them.
*Required change.* T-V2-44's title adds "(T110-4 on the composer's output)", T-V2-47 "(T110-5's deck-building clauses)",
T-V2-50 "(T110-7's volume-2 pin)".

**VAP-16 · MAJOR · DISAGREE · owner V02** (verify-agree-proof; confirmed). T-V2-52 runs from M2b by items 226 and 522 and
§13.2's pointer; V02 §8.3 places it only in the row "M6, across M6a–M6c".
*Required change.* V02 §8 states that T-V2-52 runs from M2b with item 226's raise, its re-basing clauses from M3a-V2 and
its crypt-only sub-fixture from M6-U's crypt derivation; the M6 row keeps T-V2-53.

**AT-19 · MAJOR · DISAGREE · owner V02** (verify-agree-time; confirmed). V02 §3.14.1 (a) (l. 1955) has "the previous
epoch's buildings" enter the daylight raster; V06 §3.4 (1), the mask's home, rasterises the buildings standing when the
field phase runs, after that epoch's hazards.
*Required change.* As AT-19: "at an epoch the buildings standing when its field phase runs — after that epoch's hazards,
before anything it places — enter V06's building shade mask through them (V06 §3.4)".

**AF-08 · MAJOR · DISAGREE · owner V02** (verify-agree-fabric; confirmed). V02 §3.18's row "a bridge (over a river or a
moat) carrying buildings" (l. 2438) and §3.16 (1)'s exclusions omit the base's "no deck plot on a gate's moat deck".
*Required change.* As AF-08: the row reads "a river bridge carrying buildings …; a `ford`, a `draw` bridge, an unset
`deckCm` or a gate's moat deck offers none (§4.7 S10 *Deck plots*)"; §3.16 (1) adds "or a gate's moat deck (§4.7 S10;
J-A110.41)"; T-V2-47's ford clause adds "nor a gate's moat deck".

**AF-20 · MAJOR · DUPLICATE-HOME · owner V02** (verify-agree-fabric; confirmed). V02 §3.14.5 (c) (l. 2004) "V02 owns the
wet-ground lift and the half raise" and (d) restates the crypt ladder that file f item 238 and model §2.6 *Basements*
(l. 1809) hold.
*Required change.* As AF-20: (c) "V02 supplies the seed wings (`cryptSeedWings(b)`) and the constants `crypt.clearCm`,
`crypt.freeboardCm` (V02 §3.10.9); the crypt ladder, the wet-ground lift and the half raise are §2.6 *Basements*' (item
238)"; (d) cites §2.6 and keeps only the solid-platform clauses.

**AF-24 · MAJOR · DISAGREE · owner V02** (verify-agree-fabric; confirmed). V02 §1b (l. 208), J-V2.98 (l. 3622) and §12
call `levelledGroundCm` "V05's" and `stepProfile` "V01's"; both are the base's (§4.7 S10, item 309; §2.7, item 245).
*Required change.* They read "§4.7 S10's `levelledGroundCm` (item 309)" and "§2.7's `stepProfile` (item 245)"; J-V2.98's
reasons stay.

### Minors

**VV12-10 · MINOR · CHANGED · owner V02.** E-27 unified the valley reach in form only (equivalence list: the integer
form's byte-identity, the float form's view-only status), but V02 §3.7 (l. 1211–1220) also changed the integer form's
value for a `shed` Y: the archive's bays used `⌊(X.ridgeCm − Y.eaveCm) × Y.halfSpanCm ÷ Y.riseCm⌋` for every Y, the new
`'int'` mode reads a shed's full run ("the two expressions disagreed there; T-V2-54"). The change resolves a real
disagreement with the float form, but no decision row records it and no T-V2-54 clause (a)–(j) asserts the shed case.
*Required change.* A J-V2 row: "Chose `Y.runCm` = the whole span for a `shed` Y in both modes over the bays' former half
span, because the shed's single plane rises across its whole span and the roofscape already read it so"; T-V2-13 adds
"on a wing whose ridge meets a `shed` roof, `valleyReach`'s two modes agree to within the integer floor".

**VV12-11 · MINOR · CONFLICT · owner determinism.** Base §5.2's † rows for V01 restate V01 §3.13 incompletely and in other
words: F-UNIT† (l. 8390) "its area below four blocks' worth" where V01 §3.13 has "below `4 × eLo²` (not one block's
worth)"; F-UNIT† omits the island outline face below one district's size, the `auto`-outline rung and the island
no-district rung; F-TEMPLATE† (l. 8388) omits "no void junction (V01 §3.4.5 (c))".
*Required change.* The F-TEMPLATE†, F-DISPATCH† and F-UNIT† rows' detection and ladder cells read "V01 §3.13's" (the
bracket already names it), or state V01 §3.13's lists in full, with `4 × eLo²` for F-UNIT's area.

**VV12-12 · MINOR · EDGE-UNDEFINED · owner V01** (kernel cross-part note 34, not closed). V01 §3.4.4's precinct ring
(l. 1034) offsets a reservation's outline outward with "the kernel's `insetRing` with a negative inset"; §3.7 *Insets*
returns `E_NON_CONVEX` for a non-convex face and has the caller unite the face with a `buffer` of its ring for an outward
offset. A non-convex reservation (an L-shaped precinct) has no stated path in V01.
*Required change.* §3.4.4 reads "offset outward by `dBar + w_tpl / 2` (§3.7 *Insets*: `insetRing` with a negative inset on a
convex outline; a non-convex outline united with a `buffer` of its ring)"; the §3.18 row for §3.4.3–§3.4.6 names the
non-convex reservation with that outcome and T-V1-56.

**VV12-13 · MINOR · RESTATEMENT · owner V01.** Facts whose canon home is a base section are restated: V01 §3.15's *Kind*
and *Resolution* bullets restate §7.6's `NG` rule (l. 10694–10699, item 584; canon V01-0359); V01 §3.5.7 restates §4.9's
court-greening row's formula "× (0.5 + greenery), × 1.5 for `leafy`" (l. 7190; V01-0267), keeping rightly only the band
values it authors; V01 §5.2.3 (l. 2946) restates §9.4's "≥ 90 % of named streets labelled" (O13 b).
*Required change.* §3.15's two bullets cite §7.6 (item 584) and keep only what stands on `hood.constants`; §3.5.7 keeps the
band probabilities and the terraced-garden rule and cites §4.9's row for the factors; §5.2.3 cites §9.3–§9.4 without the
value.

**VV12-14 · MINOR · RESTATEMENT · owner V02.** T-V2-31's table (l. 3217–3227) restates §13.5's Fantasy Manor rows
(l. 16434–16438, file f item 522) — the measured counts and bars, identical; the scope rewrite's note asks T-V2-31 to cite
them. V02 §6's intro (l. 2930) restates §2.6's assumed core mix (55 / 25 / 18 / 2 %).
*Required change.* T-V2-31 reads "the bars of §13.5's Fantasy Manor rows (item 522), on the free-frame harness under `FM`"
and keeps only the FM calibration sentence, SP-V2-4's extent and the J-V2.44 note; §6 cites §2.6's cost note without the
shares.

**VV12-15 · MINOR · BROKEN-REFERENCE · owner V01.** V01 §3.14's row for `terrace.maxLevels` / `terrace.profileNoticeCm`
(l. 2130) has "used in V01 §3.4.3 (per flank); §3.9, §3.11 (7)": bare §3.9 and §3.11 resolve to the base's kernel
sections.
*Required change.* The cell reads "V01 §3.4.3 (per flank); V01 §3.9, V01 §3.11 (7)".

**VV12-16 · MINOR · DEFERRAL-WORDING · owner V01.** V01 §3.17.8 (l. 2431–2432) keeps "a model `Pin` of kind fountain (or the
base's basin kind, when it adds one)" — a conditional on a future base change; V01-DEFER-2 asked the terminal stated as
decided, and `Pin.kind` has no basin.
*Required change.* Delete "(or the base's basin kind, when it adds one)".

**VV12-17 · MINOR · BROKEN-REFERENCE · owner V02.** V02 §1b (l. 220) and §3.10.9's constants row (l. 1802) cite
"V02 §3.16 (2)" for the deck stand-ins; they are in §3.16 (3) (*The budget and the storeys*, "The stand-ins (X-V11-7)");
item (2) is *The row*.
*Required change.* Both read "V02 §3.16 (3)".

**VV12-18 · MINOR · BROKEN-REFERENCE · owner V11.** V11's hand-off row X-V11-7 (l. 4679) cites "V02 §3.16 (2)" for the deck
fallback constants (VV12-17).
*Required change.* It reads "V02 §3.16 (3)".

**VV12-19 · MINOR · BROKEN-REFERENCE · owner V05.** V05 §2.3 (l. 385) builds "the `NeighbourhoodRequest` of V01 §2.4"; V01
§2.4 declares nothing (VV12-01).
*Required change.* With VV12-01 applied, it reads "the `NeighbourhoodRequest` of II.1 (item 539)".

**VV12-20 · MINOR · WIRING · owner V10.** V10 §3.16's button text (l. 2174) gives "Stairs along the front" for
`bend.stack.internalSolid`, a key V09-XAGREE-3 retired (V02 emits none; the rewrite-V02 note maps it to `bend.tiers.none` /
`bend.tiers.axial`); V09 §4.9 holds no such row.
*Required change.* The example reads "… and "Stairs along the front" for `bend.tiers.axial`".

**VV12-21 · MINOR · NARRATION · owner model.** Base §2.5 carries critique ids in V01-subject fields: `District.fabric`
"… at stage 2 (V1C-39)" (l. 1073) and `Block.overrides` "(…; V1C-20)" (l. 1120); principle (5) keeps such ids in the
validation records (V01 itself has none left).
*Required change.* Delete "(V1C-39)" and "; V1C-20".

**AF-32 · MINOR · DISAGREE · owner V01** (verify-agree-fabric; confirmed). V01's integration notes (l. 3424) place
`BlockKind` at "V01 §2.1"; §2.5 declares it.
*Required change.* "(the block-content type `BlockKind`, §2.5; …)".

## 4. Checks with no finding

* **Inventory coverage.** 1 191 ids (V01 650, V02 541) each in its rewrite's mapping table; every mapped `V01 §` / `V02 §`
  target is a heading of the live text.
* **Body loss.** V01 466 and V02 504 review units read (archive sentence or row against its best new match and neighbours,
  every lost number traced): the moved values are at V01 §3.14 and V02 §3.10.9 / §5.3 (e.g. `dormerEaveTol` ± 10 %,
  `endMarginM` 1.2 m, `vaultClampCm` 30 cm, `riserMaxCm` 20 cm, `sizeBandLo/Hi` 0.7 / 1.45, `claimLo/Hi` 0.35 / 0.6,
  `fmHueW` 0.15, `fmHatchPx` 0.9 px, `ridgeWeight` ½, `hipWeight` ⅓), the base-homed facts at their f-item homes
  (`DriftBounds` §2.6 with its M3a admission list; `Wing.base`, `ComposedTower.base`, the wing-key rule §2.6; the wing anchor
  0.5 m §6.3; `LatticeSpec` 25 / 26 cm §2.2). V01's and V02's decision rows keep their reasons except VV12-02 (J-V1.36,
  J-V1.41, J-V1.72, J-V1.85 checked: their cut parts are at J-V1.77, J-V1.98, V11 and II.1).
* **Terms.** No retired synonym of the glossary in either volume (G-lot, G-refview, G-firstmap, G-cite, G-stairway,
  G-standalone, G-unitinput, G-DR, G-geojson and the rest); "stepped street on a slope" (V01 l. 1126) quotes II.2.
* **Ids.** T-V1-1 – T-V1-58 and T-V2-1 – T-V2-55 each defined once (V02's second occurrences are §3.10.10's registration
  rows), every cited test and decision id defined, J-V2.58 noted unused in V02 §12; ID-BCR (BCR-V1-n, no bare BCR-n left in
  the set), ID-WX (no bare foreign W/X row), ID-DR (DR26, DR30, DR32) applied.
* **References.** Every `Vnn §x` resolves; the bare-§ misses are line-wrapped `V01`/`V02`/`V03` prefixes except VV12-15.
* **Conflict rulings.** MC-01 (`BuildingInput.plot`), MC-11 (V01 cites §2.5's `TypedBoundary` and `FabricStrategyId`, V02
  §2.6's `DriftBounds`), V01-ICONF-1 – -5, V02-ICONF-1 – -4 (R5's last rung a bend; one effort statement), V01-XCONF-1,
  -2 (the VTT rule at §11.1, 150 cm), V02-XCONF-1 (item 244's clearance rule in both volumes), V09-XAGREE-3 (V02 §1b's bend
  ids, each produced in §4.2, §4.3 or §4.6 and each with a V09 §4.9 row), V10-XAGREE-2 (`sun`, `nuisance`), CANON-C03
  (§11 answered, J121/J122), CANON-C04 (S23R6-07 at V01 §0, SLR6-04) applied.
* **Elegance.** E-24 marks in both §9s (see VV12-02), E-27 one `valleyReach` (see VV12-10), E-29 cited by V01's entrance
  reserve.
* **Wiring.** W-DOS-10a (DR30, DR32), W-DOS-10b (V02 §1b's DR column), W-IF-03 (V01 §4.5's three providers), W-IF-06
  (`terrace.wallBandCm`'s real consumer; V03's walk-out its own band), W-HOOK-02 (`BuildingGenerator.compose` V02's),
  W-TEST-01 (V01 §3.13's "tested by" column), V01-WGAP-1 (the skeleton row's `terrace`), V02-WGAP-1 (V02 §5.3's style
  cells) closed.
* **Hand-offs routed here (29).** V02 X14, X24, X31; V06 X11, X16, X28, X40, X45; CVR-V10-6, -13; X-V11-8, -15, -16;
  X-V12-16, -17 at V01; V06 X3, X24; V08 X6; XV-V9-6, -8; CVR-V10-8; X-V11-5, -7, -9; X-V12-2, -11, -12, -15, -18 at V02 —
  each at the place the rewrite names (V06's order 40 is V06's registry fact).
* **Cross-part notes to V01/V02** (V03 5, 9; V10; V12 7; determinism; kernel 34 → VV12-12; model; pipeline; rendering;
  scope → VV12-14): the rest are met (T-V1-4 (e) a `NoOpPin`; V01 §4.5's `RetainingWall` provider; §7.4's stage-2 and
  stage-3 rows cite V01 §4.4 and V02 §4.4; the §5.2 rows exist; V02 names its style cells at §5.3).
* **Owner questions.** Q-V1-1 (yes, J122) and Q-V2-1 (not now, J122 following J121) answered and read in the bodies.
* **Cohesion.** V01's M5 at 27.25–36.25 pw and V02's 22.5–32.5 pw (M6 18.25–27.5 + 2.25 spikes = §16's 20.5–29.75; M3a-V2
  2–2.75) agree with §16 and INDEX §1/§3; INDEX §3's M6 row (after M5, beside M6-U) agrees with V02 §8.1; V01's start is
  VAP-18. One marker line each; no ledger or round record in either volume.
* **Edges.** Every mechanism section of the edges catalogue for V02, and every V01 one except VV12-06's, has a §3.18 row
  with outcome, rung and test; the 15 V01 and 28 V02 owned combinations each have a row; T-V1-55 – T-V1-58 and
  T-V2-54 – T-V2-55 carry them.
* **Files f and g.** No f item and no g part is routed to V01 or V02 as applier; the f items they cite are the base's
  landed texts. Item 114 (after the canon) is VV12-03 / VV12-04.
* **Shrink.** V01 91 139 → 74 383 words, V02 101 328 → 82 551 (`wc -w`), each −18.5 %; below the band with the
  irreducible content named in the rewrite reports (not a defect); under half, so no half-size audit.
