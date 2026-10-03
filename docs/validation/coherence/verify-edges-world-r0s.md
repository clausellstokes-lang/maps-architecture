# Verify — edges and combinations of the physical world (coherence/verify-edges-world-r0)

PROGRESS
- P1 catalogue entries extracted (822 open edges, 222 owned UNDEFINED combinations, the named combinations in scope): done
- P2 member edge sections read and checked (base §3.11, §4.13, §5.1–§5.2, §8.11, §9.7, §11.6, §2.7 *At the frame*; V01 §3.18, V02 §3.18 and §7.8, V03 §3.13, V04 §3.13, V05 §3.23, V07 §3.17): done
- P3 extremes and combinations walked for catalogue gaps: done
- P4 issues, results JSON, LANDED: done

## Scope and method

Members: model, kernel, pipeline, rendering, V01, V02, V03, V04, V05, V07, read in the text assembled by coherence/assemble-r0
(2026-10-03 02:13). Inputs: `edges.md` and `edges.json` (the canon's catalogue, built on the pre-rewrite text), `canon.md`,
§5's ladders and every mechanism the entries name, read as whole subsections. Each catalogued entry was located in its
unit's new edge section (the rewrite added one per unit) and checked for a defined outcome, a rung on §5's ladder (never a
whole-map retry) and a test that resolves; every test id the six volume edge sections cite was resolved by script (all 223
resolve). Then the members' mechanisms were walked at the extremes the brief names — all water, all cliff, no water, an
island town, the steepest ground, the smallest thorp, the METROPOLIS cap — and where ground, walls and their barrier
closure, harbours and decks, raised ways, retaining walls, buildings and plans, the underground and ruins, and the sky
islands meet. The reference corpus is absent in this checkout, so no corpus-dependent claim was re-measured.

## The catalogue after the rewrite — verdicts by member

| member | catalogued open edges | where they are now defined | verdict |
|---|---|---|---|
| model | 4 (+3 combinations) | §2.4 *Missing and contradictory data*; §2.5 `ContextVector.arena` `'sky'` (EI-MC-05); §2.6 capacity max(1, …) (EI-MC-09); §2.7 *At the frame* (C-raised-, C-retaining-, C-deckplot-frame; T110-1, T110-2, T110-5 carry the frame clauses) | closed; the frame's growth case is open (EW-01) |
| kernel | 38 (EI-KERNEL-EDGESOBSERVED-001 – 008 among them) | §3.11's class table (a case of §13.1's constructive set per row); `buffer`'s miter and flat ends §3.7; §3.8's sub-5° corner taken by the reader's downgrade without running; `hexLattice`'s assertion §3.4; `kerb(F) = F`; `transientArena` without a seed `E_DEGENERATE` (`seed`); `tileRings` and `sampleProfile` empty; frame growth "where neither grows, nothing runs" (§3.2 (9)); a hole touching the ring a downgrade | closed |
| pipeline | 73 (+39 combinations; EI-EDGE-PIPE-01 – 08) | §4.13's EP-01 – EP-19 and its combination matrix (every owned combination is a cell), run by B-EDGE (§13.2); EDGE-PIPE-01 – 08 fixed at II.7.3, II.7.6, II.6, II.2 (J-A64.45, J-A12.48, J-A15.43, J-A58.44; T66's route-refusal clause) | closed; five gaps found by the walk (EW-02 – EW-06, EW-09, EW-10) |
| rendering | 48 (+38 combinations; EI-REDGE-01 – 04) | T-ER-01 – T-ER-21 (§8.11, §9.7, §11.6); light, labels and exports × every physical feature in T-ER-10 – T-ER-12; the island row's "no separate raise" (§8.2) | closed |
| V01 | 232 (+15 combinations) | V01 §3.18 (a) – (f); T-V1-55 – T-V1-58 | closed |
| V02 | 68 (+28 combinations) | V02 §3.18 (a) – (f); T-V2-54 (a) – (j), T-V2-55 (a) – (j) | closed |
| V03 | 55 (+6 combinations; EI-V03-EDGE-1) | V03 §3.13 (a) – (f); T-V3-36, T-V3-37 | closed |
| V04 | 114 (+62 combinations; EI-V04-EDGE-1, -2) | V04 §3.13 (a) – (f); T-V4-78 (a) – (i) with (e1) – (e11) and (f1) – (f9); the shallow-element rule (V04 §3.5) for every water face | closed |
| V05 | 108 (+31 combinations; EI-V05-EDGE-1 – 4) | V05 §3.23 (a) – (g); T-V5-31, T-V5-33, T-V5-34; the frame's clip at V05 §3.19 (3) | closed |
| V07 | 82 | V07 §3.17's table; T-V7-62 – T-V7-65 | closed; one gap found by the walk (EW-04) |

**The named combinations in scope.** A raised way under an island's shade — V05 §3.23 (f) and T-V5-31 (a), (b), (g):
defined. A raised way over a harbour mouth — §4.3 *Where it may not go* and §4.13's harbour row (the basin and its mouth
excluded, a stroke bent to its last ground vertex; B-EDGE): defined. A deck plot on a bridge over a moat — §4.7 *Deck
plots* (no moat deck at a gate offers one; a draw bridge, a ford or a deck without `deckCm` none) and §4.13's water row:
defined, narrowed as the canon allowed. A retaining wall on a cliff edge — §4.7 *Levelling* (*No wall on a hard line*:
none along a `cliff` bank or a `cliff` or `sheer` closure arc) and §4.13: defined. A catacomb growing into a sewer — V04
§3.13 (f) (an overlap link of `LinkRule.kinds`; T-V4-78 (f7)): defined. A settlement growing over a sealed void and an
epoch undone after a save — V04 §3.13 (f) with T-V4-49, T-V4-53, T-V4-72 (g), T-V4-77: defined at V04's side.

**The DEFINED combinations of the catalogue.** Many rows rest on a scan quote that states no outcome (C-wall-landfall and
C-raised-landfall quote a revision ledger, C-harbour-sewer the S0 blueprint). A spot check found each outcome at its home
in the current text — V05 §3.16 (4)'s table by covered kind (walls, gates, bridges, decks, raised spans and piers, retaining
walls, deck plots, another island's landing), V04 §3.5's shallow-element rule for every water face (river, coast, harbour),
V02 §3.16 and V03 §3.7.2 (0) for deck buildings, T-ER-10 – T-ER-12 — so none is raised here; the scan evidence is not
proof, and the gaps below were found by walking the mechanisms, not the catalogue.

## Issues (10)

| id | sev | kind | owner | edge or combination |
|---|---|---|---|---|
| EW-01 | blocker | EDGE-UNDEFINED | model | a frame growth beside an aqueduct laid to the old outer ring, or a declared chain the old ring clipped |
| EW-02 | major | CATALOGUE-GAP | pipeline | a dossier population the settlement's land and shells cannot house |
| EW-03 | major | CATALOGUE-GAP | pipeline | a walled stage whose whole boundary closes by barriers |
| EW-04 | major | CATALOGUE-GAP | V07 | a village palisade whose every arc closes |
| EW-05 | major | CATALOGUE-GAP | pipeline | a city moat with no water within reach, or along a falling trace |
| EW-06 | major | CATALOGUE-GAP | pipeline | a harbour with no harbour candidate, or on a site with no coast |
| EW-07 | major | EDGE-UNDEFINED | model | a raised way over water wider than any span its supports allow |
| EW-08 | major | EDGE-UNDEFINED | model | the support step places piers on squares, reservations, wall strips and an oasis's grove |
| EW-09 | major | EDGE-UNDEFINED | pipeline | a raised way meeting a standing city wall (generation, edit, epoch) |
| EW-10 | minor | EDGE-UNTESTED | pipeline | §4.13's deck-plot rungs omit THORP and HAMLET |

### EW-01 — blocker — EDGE-UNDEFINED — model

**Claim.** §2.7 *At the frame* (ARCHITECTURE.md l.2375–2381) lays an aqueduct whose source lies beyond the frame "up to the
arena's outer ring, its deck ending there without a ramp — the source recorded as a bearing", bends a declared course
drawn beyond the frame to the ring, and ends a retaining wall's chain on the ring; it re-offers deck slots at a frame
growth but says nothing of these chains. §3.2 (9) (l.3228–3231) grows each raised part "by (a) and (b) on its own key" and
keeps "a vertex of an old chain that keeps a row", so the deck's end vertex stays where the old ring was; §4.11
(l.7747–7748) continues only "every through-road from its old end to the new margin". After an upward rung crossing grows
the frame, the aqueduct ends in mid-air inside the map — no ramp, no source, no supply — and a drawn retaining wall stops
where the old map edge was, with no rule, rung or report: a silent wrong result. T110-2 tests the part's growth, not the
deck's continuation.

**Required change.** §2.7 *At the frame* gains the growth case and §4.11's frame-growth sentence cites it beside S4's
through-road continuation: at a frame growth every raised way whose deck ends on the old outer ring is continued in the
growth's batches by its own course solver along its recorded source bearing — to its source when the grown frame holds
it (the aqueduct gaining its intake; the terminal's supply re-read), else to the new outer ring, again without a ramp —
and every declared chain the old ring clipped (a declared raised course, a drawn retaining wall) re-applies its held
stroke against the new ring (its bend re-recorded, item 101 R2); each continuation is a listed fate of the epoch and is
restored by its undo. T110-2 gains the clause "after a frame growth 0 raised decks end off a ground vertex, the outer
ring or their source", T110-1 the drawn wall's, and §4.13's raised-way × frame cell names the growth case.

### EW-02 — major — CATALOGUE-GAP — pipeline

**Claim.** A household that fills a dossier's population is "never taken off the manifest": §4.7 *Households per building*
(l.6670–6681) re-provides it by S10b's `dossier` request on "its first closest option" where S11 "builds there a
residential slot … within that building's capacity"; §4.5 S7b (5) (c) (l.5786–5790) says "never a shortfall, so the
population stays whole"; §7.7 item 5 (l.10984–10985) fills "standing shells first by `relet` … before any new plot". None
states the outcome where no plot of the settlement can take another residential slot inside its site plan's coverage and
no shell has room — an all-water or small island-town site under a large dossier population (§4.2 S3 (6)'s level set
holding all the land there is), a `drawWater` or terrain edit flooding built land (F-REDERIVE's demolitions), or a dossier
event adding households to a full map without an epoch. The text then contradicts itself (housed whole, yet within a
capacity that cannot hold them); T19-4's dossier clause tests only shells with spare template rows.

**Required change.** §4.7 *Households per building* states the last rungs for such a household, which F-SITING's row, §5.3's
population invariant and §7.7 item 5 cite: (1) the re-provision extends to every unbuilt face of the frame — the
hinterland's and the pseudo-districts' land — as an informal cluster by §4.7's *Informal clusters* rules, reported; (2)
where the frame holds no unbuilt land, the household is kept on the manifest as `unhoused` (its people kept, no building),
counted in the generation report and named in the disruption report as the contradiction between the dossier's
population and the map's land — never dropped and never a bug abort. T19-4 gains the fixtures: a dossier population at
the METROPOLIS cap on a small island-town site, a flooding `drawWater` over a dossier district, and a dossier event that
adds households to a full map.

### EW-03 — major — CATALOGUE-GAP — pipeline

**Claim.** §4.4 S5a's barrier closure (l.5246–5263) walls "only the approachable arcs", and §2.7's `Enceinte.trace`
(l.2098) is "the open stretches that wall the approachable arcs". Where every arc of a walled stage's boundary closes —
a mesa or a cliff-ringed spur, an island town whose stage-1 boundary is its whole shore under an `open` waterfront (§4.2
S3 (13)'s *Island towns*), a boundary inside a river loop with no neck — the stage has no stretch, and nothing states the
outcome: whether an `Enceinte` with an empty `trace` is committed (a stored `ChainRef` that resolves empty fails §3.10's
stored-references row, §3.11), where S3 (4)'s `N₁` gates stand when every route crosses the boundary on a barrier arc (a
landing, a ramp up the scarp), and what the report says. F-WALL's ladder (§5.2) and T106-1 – T106-5 have no such case;
S3 (4)'s `N = 0` rule covers only a requested zero.

**Required change.** S5a states the case and §2.7 the record: when the classification leaves no approachable arc, no wall
chain is laid and the stage is enclosed by its barriers — the `Enceinte` committed with `closure: 'barrier'`, `arcs`
covering its whole boundary and no trace (`trace` optional in §2.7, absent exactly then), its gates only where a route
crosses an approachable point (none here), the stage reported as the sealed circuit of S3 (4) with the reason "closed by
its barriers" in `requestedVsBuilt`; F-WALL's detection and §5.3's walled-stage rows read the absent trace; T106 gains a
cliff-ringed mesa and a walled island town under an `open` waterfront: 0 wall edges, `closure: 'barrier'`, the report line.

### EW-04 — major — CATALOGUE-GAP — V07

**Claim.** VS3's barrier closure (V07 §3.4 step 5, l.1420–1446) closes every water arc, sheer cliff and gorge and walls
the rest; a village whose every arc closes — `water: island` with a palisade resolved, a village inside a river loop's
whole bend, one ringed by scarps — has no walled stretch, and neither VS3 nor V07 §3.17's VS3 row (l.2889: "no palisade
resolved → the stage emits none; fewer than 3 kept points → F-V-PAL") states the outcome: an `Enceinte` with no stretch
committed in VS4's batch (step 7), or none; its gates; the report.

**Required change.** V07 §3.4 step 5 (d) and §3.17's VS3 row state it by the base's rule for EW-03: no stretch → the
palisade's `Enceinte` committed with `closure: 'barrier'` and no trace (or the base's ruled form), no gate, the report
line "closed by its barriers"; T-V7-6 gains an island village with a palisade drawn and a river-loop village whose loop
holds the whole perimeter.

### EW-05 — major — CATALOGUE-GAP — pipeline

**Claim.** A castle moat is carved "when water is within reach" (§4.2 S3 (10), l.4973; §4.8, l.6993), but the **city moat**
is carved "when the blueprint's `moat` is `inner` or `all` — a channel of the era row's width along the (9) trace"
(l.4984–4986), and S5a's outer moats likewise (§4.4), with no water condition. On a site with no water within reach (a dry
hilltop, an arid site without an oasis) or along a trace whose ground falls across the relief (a hillside or mountainous
town), the text lays a wet `WaterBody` of kind `moat` with no source and no level (`WaterBody` carries none; S1's raster is
not adjusted) — an undefined outcome against the realism tiebreaker, with no rung and no test (§13.2's moat fixtures all
have water in reach).

**Required change.** S3 (10) and S5a's outer moats state: a city moat is wet only along the trace stretches within the
castle moat's reach of a water source (river, lake, coast, spring) whose ground stays within a table fall
(`moat.maxFallCm`, V11's era row) of that source's level; every other stretch takes the dry ditch (the `ditch` residue of
§4.7 S10 (0), as on an `on_enceinte` bailey's town side), reported in `requestedVsBuilt` (a requested wet moat delivered
dry); the moat `WaterBody` names its source; `moat: 'auto'`'s feature-table row reads the same reach. §4.13 gains the EP
row and B-EDGE the fixtures: a hilltop town, an arid site with no oasis, a hillside trace.

### EW-06 — major — CATALOGUE-GAP — pipeline

**Claim.** §4.2 S1 (6) (l.4719) makes harbour candidates "coast faces with depth ≥ threshold" and S3 (2) (l.4877–4878) lays
the basin "at the chosen harbour candidate". Where a harbour is requested — the `harbour` toggle, P(harbour | coast) drawn,
or a dossier's `port` access (V08 l.737–739: "a harbour basin and 1–2 gates", on `plains`, `hills`, `mountain` or `forest`
terrain with no coast forced; DR1's check "a port one a harbour basin", l.11076) — and no coast face reaches the depth
threshold (a shallow or marsh coast, an all-cliff coast) or the site has no coast at all, no candidate exists, and the
basin, the harbour route (S3 (11)), the harbour gate (S3 (7)), the market's harbour candidate (S3 (12)), §4.3's trade flow
and S10b's port classes have no defined outcome.

**Required change.** S1 (6) and S3 (2) state the ladder: the best-scoring coast face below the threshold (a shallow
harbour, reported `harbour_shallow`); with no coast, quays and docks on the largest navigable river or lake (the `river`
access's form); else no basin — the harbour omitted (tier 6) in `requestedVsBuilt`, and every reader of the harbour
(S3 (7), (11), (12), §4.3's `TradeFlow`, S10b's `requires: 'coast'` classes) taking its no-harbour path. V08's DR1 mapping
cites the ladder for `port` on inland terrain; §4.13 gains the EP row and B-EDGE the fixtures (a marsh coast, a cliff
coast, an inland `port` dossier).

### EW-07 — major — EDGE-UNDEFINED — model

**Claim.** §2.7's support step (3) (l.2302–2305) slides a pier station off a way corridor or a water face only while "both
neighbouring spans stay ≤ `slideMaxFactor` × the band's upper bound, else it is omitted and the merged span is `open`" —
with no bound on the merged span. §4.3 (l.5175–5176) and §4.13 (l.8226) let a raised way span a river "between supports on
the two banks within `viaduct.maxSpanM`", but that cell (V11 l.3828, 600 m; V06 l.2527) is the viaduct reading's whole
chord across a ravine, not a clear span between two supports. A raised way over water or a corridor wider than its
material can span (a 150 m river under a masonry aqueduct) is laid as one open span of that length, silently, with no
rung and no test.

**Required change.** The support step states the bound and its outcome: a merged span longer than `slideMaxFactor` × the
material band's upper bound (or a named cell `raisedWays.structure.maxClearSpanM` per material, V11 row 80) is infeasible
— a generated course is not raised across that reach (the solver prices it as such and keeps the ground route;
`raised_too_wide`, reported as `raised_too_tall` is) and a declared course's dry run bends it as for `maxPierM` (item 101
R2); §4.3 and §4.13 cite this bound in place of `viaduct.maxSpanM` for a bank-to-bank span; T110-2 gains the clause (0
merged spans above the bound) and B-EDGE the river fixture.

### EW-08 — major — EDGE-UNDEFINED — model

**Claim.** §4.3 *Where it may not go* (l.5175) says a raised way "stands no support on a square, a reservation or an
oasis's water", and §4.13 adds "no support in a wall strip" (l.8228), "no support on it" for a square or reservation
(l.8230) and "no support in its water or on its grove" (l.8233). The support step — the one mechanism every raised way
runs (§2.7 (3), l.2302–2305) — slides a station only off "a part-0 way's corridor or a water face". Nothing moves a
station off a plaza, a market or precinct reservation, a castle bailey, a wall strip or an oasis's grove, so a pier
stands there by the step while §4.3 and §4.13 say none does: the edge's outcome is contradictory at its home.

**Required change.** §2.7's support step (3) names every exclusion as its obstacle set — a part-0 way's corridor, a water
face, a square or other reservation, a wall strip and an oasis's grove — with the same slide-else-omit rule; §4.3 and
§4.13 cite the step instead of restating; T110-2 asserts 0 piers on each.

### EW-09 — major — EDGE-UNDEFINED — pipeline

**Claim.** One physical meeting, a raised way crossing a standing city wall, has three outcomes and no record. Generation:
§4.3 (l.5174–5175) "crosses a moat or a city wall only as the aqueduct's wall arch or on a gate's line" and §4.13 (l.8228)
"crosses only on a gate's line" — undefined what "on a gate's line" lays, the deck's clearance over the curtain and
gatehouse, or the S7 furniture (§4.8 builds none for either). Edit: §7.1 (l.9532–9534) brings a course "down to a ground
vertex before it" through "the gate its ground way makes there", an aqueduct through "an arch in the curtain". Epoch: V06
§3.7.6 (5) (l.1474–1477) and V06 §3.19 (l.2574–2575) add "a raised gate at deck level — a gate whose tower carries the
deck". V01 §3.17.3 (6) (l.2339–2341) reads raised gates as wall openings. §2.7's `Gate.kind` has no raised gate and no
record holds a wall opening (an aqueduct's arch).

**Required change.** §4.3 states one rule, §4.8 its S7 furniture and §2.7 its records: at generation and in an edit a
viaduct or an elevated road meeting a standing curtain descends before it to a ground vertex and passes the gate its ground
way makes (the edit's rule; "on a gate's line" replaced by it), and an aqueduct crosses by an arch in the curtain; a new
trace meeting a standing raised way (V06's case) takes V06's raised gate at deck level; §2.7 gains `Gate.kind 'raised'`
(its junction on the raised part) and a wall-opening record on the wall chain for the aqueduct's arch, S7 building both
and §11.1 exporting them; T110-2 and B-EDGE's wall × raised-way cell assert each case.

### EW-10 — minor — EDGE-UNTESTED — pipeline

**Claim.** §4.13 (l.8221) says "a deck plot at VILLAGE and above (V07's village rows at village rungs)", and B-EDGE runs each
cell "at every rung the row names". V07 §3.10a (3) draws a pier head from 200 people (`PLaw (200, 0) → (700, 0.3)`: a HAMLET
above 200 people) and §3.10a (2) lets an author-widened deck carry a plot at every village rung, so the combination
suite's deck-plot cells skip THORP and HAMLET decks that exist (V07's own T-V7-49 and T-V7-62 test them in its suite).

**Required change.** §4.13 restates the rung: "a deck plot wherever a built deck offers one — at TOWN and above by the
`deck` row, at village rungs by V07 §3.10a (a pier head from 200 people; an author-widened deck at any rung)", and B-EDGE's
deck-plot cells run at THORP and HAMLET on an authored deck.

## Observed outside this lane's kinds (for the unit verifiers)

* §2.7 *At the frame* ends "Tests: item 110 (f)'s bars in §13.2 carry the frame clause for each (cross-part note)." (l.2381):
  the parenthesis is narration (principle (5)); the bars do carry the clauses (T110-1, T110-2, T110-5).
* V11's moat row (V11 content l.4176: "a fixed decked bridge by its row") does not repeat §4.7's exclusion of a moat deck at
  a gate; every generated moat deck stands at a gate (§4.2 S3 (10), §4.4 S5a), so only an epoch's or an edit's moat
  crossing away from a gate offers deck plots — consistent, but the agreement checker may want V11 to cite §4.7.
