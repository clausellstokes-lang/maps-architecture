# Verify — coherence pass, round 0: RENDERING (§8 rendering, §9 labels, §11 export and interop, §12 performance)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-rendering-r0s; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-rendering-r0s`, 2026-09-30, cloud checkout)
- P0 resume check (no LANDED line, no report): fresh start — done
- P1 inputs read (brief whole; assemble-r0.md; rewrite-rendering.md; inventory-rendering.json; canon.md's rendering unit, glossary, conflicts, file f and g routing, elegance E-01/E-16–E-19, the dated rulings for g 114–119) — done
- P2 inventory sweep (every one of the 704 ids: LOST / CHANGED) — done
- P3 f items (70 BCR texts from the archived volumes' §10) and g items 102, 109–119 routed to rendering (F-MISSING) — done
- P4 canon rulings routed to rendering (REFERENCE, TERM, conflicts, E-16–E-19 equivalence lists, RWG, REDGE, narration) — done
- P5 wiring, edges (edges.json: 37 UNDEFINED, 11 UNTESTED, 38 combinations), references (base and volume sub-items), ids, deferral wording — done
- P6 cross-part notes addressed to rendering in the seventeen other rewrite reports — done
- P7 this report, the result file, LANDED — done

Status: COMPLETE. 29 issues: 1 blocker, 11 major, 17 minor (rendering 25, model 2, pipeline 1, V11 1). Scratch: `scratchpad/coherence/vr/` (diff map, hunk dump, BCR
extract, edge extract, notes).

## Outcome

The live §8, §9, §11 and §12 are the rewrite's four section files plus the assembler's two mechanical corrections (a
`V02 §5.6` prefix in §8.6 and the escaped pipes of §11.1's 3-D row); nothing else touched them. Against the archive the
four sections changed on 462 of 2 947 archived lines, in 223 hunks, and grew from 59 158 to 70 004 words (+18 %). Every
hunk was read old against new; every inventory id was checked (591 of 704 sit on unchanged lines, verbatim; the 113 on
changed lines were read in their hunks). The rewrite applied its routed f items faithfully (every BCR text of items
405–424, 447–478, 480, 481, 572, 583 and the touching items 202, 223, 232, 245, 278, 296, 365, 372, 391, 482, 518, 575
was compared with the new text: applied, with three partial clauses below), its four elegance rulings with their
equivalence lists (E-16, E-17, E-18 row by row, E-19), its seven conflict rulings, nine wiring closures, four edge
rulings, the six glossary replacements and the ten narration cuts, and it defined every catalogued rendering edge and all
38 owned combinations (T-ER-01–21) except four class slots.

What is **not** in place: **the rendering parts of the owner's rules 114, 116, 117, 118 and 119** — routed by the canon's
dated rulings of 2026-09-30, after this part was rewritten — are wholly absent (no base text mentions any of items
114–119), while V07, V08, V09, V11 and V12 already cite "§8.2's season rows", "§8.2's decoration rows", "§8.8's per-map
limit", "§12.5's re-skin budget" and §12.10's slower-than-target rows. One restatement cut blurs a rung distinction
(the sewer control at TOWN) — a blocker by the brief's rule. The export bundle's one exception to `E_HOST_FORMAT` that
V08 places at §11.3 is missing there; T112-1's threshold cell and S11's 3-µs geometry share are each pointed at from both
ends with no value at either; `cvdVariant` is read by §8.2 and §13 but declared neither in §2.9 nor in §8.8's tile key;
file f item 479 was applied by no unit.

## 1. Method and coverage

* **Diff.** `difflib` line opcodes per section (archive L9515–11046 / 11047–11434 / 11889–12323 / 12324–12915 against
  live L11351–13066 / 13067–13477 / 14068–14651 / 14652–15240): 223 hunks (198 replace, 24 insert, 1 delete); each dumped
  with a word-level diff and read whole (`hunks.txt`).
* **Inventory.** Each id's `where` lines mapped onto the diff: 591 ids wholly on unchanged lines (their text is the
  archive's, verbatim, at the same subsection); 113 on changed lines, each read in its hunk. The 9 REFERENCE ids and the
  17 restatements were followed to their homes and the home's text read.
* **f items.** The 70 BCR texts named by the routed f items were extracted from the archived volumes' §10
  (`bcr.md`) and compared clause by clause with the live text.
* **g items.** Items 102, 109–113 by the canon's file-g routing; items 114–119 by the four dated rulings at canon.md's
  end, read with the owner's full texts (docs/AMENDMENTS-2026-09-28g.md items 114–119).
* **Canon.** The rendering unit's block (REFERENCE, terms, conflicts, f and g lists, RWG, elegance, 76 open findings),
  the retired-synonym table (every retired form grepped over the four sections), E-01 and E-16–E-19 with their
  equivalence lists, the owner-question table (J121, J122, J-C1, J-C2).
* **Edges.** edges.json's rendering entries: 134 class slots (86 DEFINED, 37 UNDEFINED, 11 UNTESTED), the four EI-REDGE
  entries, 102 combinations (64 DEFINED, 38 UNDEFINED); each non-DEFINED one matched to a T-ER row.
* **References.** Every `Vnn §x (n)` and every base `§x.y (n)` / `item n` / `rule n` in the four sections resolved to a
  heading and, where a sub-item is named, to that sub-item (64 volume and 40 base sub-item references, all resolve);
  the assembler's broken and ambiguous lists hold nothing in these sections; T-ER-01–21 defined once in the set.
* **Cross-part notes.** Every note naming rendering, §8, §9, §11 or §12 in rewrite-{model, kernel, pipeline,
  determinism, scope} and rewrite-V01–V12, checked at its target.

## 2. Inventory sweep (704 ids)

| result | ids | notes |
|---|---:|---|
| verbatim at the same subsection | 591 | unchanged lines |
| changed lines, fact kept (reworded, cited or extended by a ruling or f item) | 105 | read in their hunks |
| removed by ruling | 3 | RENDERING-0046/-0047 (`graphic`, RWG-05), -0048 (`budgets`/`DetailBudget`, RWG-04) — the rulings' reasons hold (no reader) |
| defect | 5 | RENDERING-0235 (VRC0S-09), -0510 (VRC0S-15), -0520 (VRC0S-08), -0304 and -0631 (§8.8's pyramid range, VRC0S-17) |

The REFERENCE and restatement cuts were followed to their homes: §17.2/D-1 (the face), §2.6 (heights), §2.8
(`factTier`), §7.7 items 12–13, 15, 16 and §1.1 (binding, refusals, protection), §6.1/§6.2 (stream key 0.1 µs; digest
5 % / 5 ms / 150 ms), §10.4 and §6.3 (names), §2.9 (view keys; the elaboration cache), §4.5 (`min(N_q, L)`), §4.11
(the drawn week), §4.1 (the trigger policy) each state the fact. Three do not: II.7.1's rung split (VRC0S-09), §3.2 (9)
for the cap frame (VRC0S-15) and §3.7 for the S11 geometry share (VRC0S-08). RENDERING-0491 (bridged load
verification, §11.3) is bridge-specific and not a restatement of §2.9's steps; it stays.

## 3. File f and file g

**f items applied (checked against their BCR texts):** 405 (V01 BCR-14 a–c), 406 (BCR-V2-15 with S23-03), 407 (V04
BCR-40, names disambiguated `ruinMasonry` / `unexcavated`), 408, 409, 410, 411, 412, 413 (J-VI.19), 414, 415, 416, 417,
418, 419, 420 (its §2.9 key is model's and present), 421, 422, 423, 424, 447 (J-VI.18; BCR-V12-15/-17, BCR-V9-31), 448
(V01-XCONF-2), 449, 450, 451, 452 (V04-ICONF-3), 453, 454, 455, 456, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467,
468, 469, 470, 471, 473, 474, 475, 476, 477, 478, 480, 481, 572, 583; touching parts 202, 223 (R12-22), 232, 245/575
(E-01's Enceinte and RetainingWall rows), 278, 296, 365, 372, 391 (DR29), 482, 518, BCR-V6-26's state rows.
**Partial:** 457 (VRC0S-13), 472 (VRC0S-14), 495's §12 clause (VRC0S-20). **Not applied by any unit:** 479
(VRC0S-12; its home is §4.11, pipeline's).

**File g.** 102 (§8.4's model-sampler sentence, `live.shade`, R12-29) PRESENT; 109 (`ruinMasonry`, `unexcavated`)
PRESENT; 110 (programs, slots 9b/12/13/14, casters and slabs, symbolisation, census, exports) PRESENT; 111 (oasis
drawing, labels, exports) PRESENT with an agreement defect (VRC0S-18); 112 (second cues, `CvdVariant`, variants, legend
cues) PRESENT with two wiring defects (VRC0S-07, VRC0S-10/-11); 113 not routed to rendering (V04's lost look meets the
base's program definition, VRC0S-24). **114, 116, 117, 118, 119: F-MISSING** (VRC0S-01 – VRC0S-05).

## 4. Canon rulings

* **Conflicts:** RIC-01 (parchment: one status, J-C2's chroma) · RIC-02 (light by family) · RIC-03 (≈ 1.0 m at 100 m;
  recomputed: T(2v+1)/255² at v = 201.6 is 0.995 m) · RIC-04 (one list of document formats, the skeleton in it) ·
  RIC-05 (the size-rung sentence) · RXC-01 (`ObstacleSource` kind `room`, §14 carries it) · RXC-02 (§5.2 cites §8.4
  (g)'s and §8.8's triggers) · SCOPE-C06 (J-C1, J-C2) · V01-XCONF-2 · V04-ICONF-3 · V08-XCONF-5 (§11.4's bundle; its
  §11.3 half missing, VRC0S-06) — all applied.
* **Elegance.** E-16: `wash`, `edgeFade`, `glow`; ✓ program per mark vs post operation per tile base; ✓ painterly
  vignette the program; ✓ `light`/`glow` uses apart; no residual form in the set. E-17: ✓ each reader's band (view's,
  export's, city band when band-less); ✓ `viewAs`/`admitAs` lower the key; V08, V09, V10 cite the function (V11's
  registry row does not, VRC0S-23). E-18: 29 rows; every moved bar, milestone and fallback value compared with the
  removed clause (R12-1 ← §12.3's measurement; R12-3 ← the max clause; R12-5 ← the raster coarsening 32 → 48, 25 → 32,
  32 → 40, 16 → 20 m; R12-6 ← the first-map runs 1 500/5 000/9 900, 10 000/20 000/29 900, 30 000/50 000/120 000 and the
  DPR step 2 → 1.5, P 35 → 24; R12-7 – R12-9, R12-13 – R12-15, R12-17 – R12-21, R12-23, R12-25 – R12-28 likewise) —
  all kept; ✓ D-18's veto declarations in the veto column; ✓ per-rung laws untouched. R12-11, R12-12 and R12-24 gained
  R12-10's rule where none was stated (a defined edge, recorded by the editor). E-19: ✓ one home each (the light host's
  §8.1 item 7 keeps "placed, derived or a shaft", concealed parts and J-A63.82; the fixed sun's 31 500 / 4 500 cdeg in
  `SunSpec`; never-lit overlays in §8.2's layer order; the canvas formulae in §8.8; the 24-B index, sizes and transient
  list in §8.1 item 6; the frozen copies in §12.4's merge row); ✓ `time`'s `sim.advance` and the host's `week` kept.
  E-01 (model's home): §8.2's `decayed` row and §11.1's per-run LineStrings carry its Enceinte items.
* **Wiring:** RWG-01 (`pinDirCdeg`, `pinLines`, 94 B) · RWG-02 (role values; the `@night` derivation; matrix rows —
  recomputation not repeated) · RWG-03 (m_k, `ZoomStop`, entry stops 0/16/20/24: 1:2 828, 1:1 414, 1:707 recomputed ✓;
  its stop 0 against B-ZOOM's range, VRC0S-17) · RWG-04/-05 (declarations; removals) · RWG-06 (*Layers*) · RWG-07
  (§10.3 and §14 carry `live.people`) · RWG-08 (the render-tag table; `seamClose`) · RWG-09 (gate and pier widths) — closed.
* **Terms:** every retired form of the glossary table grepped over the four sections: 0 residuals (the remaining
  `lights` are the VTT format's field, `retainingWall` CityJSON's function value, "projected-shadow pixels" an
  adjective). **Narration:** NARRATION-001–010 removed; new narration introduced (VRC0S-16).
* **REDGE:** EI-REDGE-01 (largest component, one label), -02 (region `public`; landmark/place/address/tunnel/system
  sources), -03 (annotation first; wood after water; system = place; tunnel = way), -04 ((1 − `ghostAlpha`) × factor,
  consistent with `LayerSpec.ghostAlpha` and V05 §5.3) — defined and tested (T-ER-17, T-ER-18, the states census).

## 5. Edges

T-ER-01 – T-ER-21 define and test: §8.1 cap (01), render-time degenerates (02, with §5.1's general rule for the rest),
casters and slabs (03), the light's lifecycle (04), city-band closing (05), stage 3 at every rung (06), empty exports
(07), the pyramid at every rung (08 — to be restated for item 116), instances (09), light × 21 features (10), labels ×
9 features (11), exports × 8 features (12), label entities (13), spines (14), quarters and furniture at every rung (15),
names (16), regions (17), the kinds' admission and order (18), every format at every rung (19), the API's caps (20), host
inputs (21). All 38 owned combinations are named in T-ER-10/11/12. Not named by any row: §8.10 at every rung and §9.3
at every rung and through its lifecycle (VRC0S-25).

## 6. Cross-part notes addressed to rendering

| from | note | status |
|---|---|---|
| determinism | §8.4 (g)/§8.8 own F-LIGHT's triggers, §9.4 F-LABEL's; §8.10 the keying §6.1 cites; §11.2's empty-edit preview `ok` with nothing changed; §11.1's skeleton carries `proposedBy` | closed, but §7.1's promised reason has no carrier in `PreviewResult` (VRC0S-29) |
| kernel 25, 27 | §8.1 (5) roof cache key; §12.4's S10 (0) and merge rows, §12.8 | closed |
| kernel 26 | §11.1's antenna pointer "(an antenna: §3.6 rule 3)" | **open** (VRC0S-21) |
| model | §8.2 draws the oasis channels from `fedBy`, the grove, the gardens, `stretchClass` runs, the harbour-mouth chain by era; walkCm's readers; closure LineStrings; §12.6 per-pass totals | closure LineStrings and §12.6 closed; the rest **open** (VRC0S-18, -19, -27, -28) |
| pipeline | §8.2/§8.4: shade map view, oasis, ruin style, stairs and ramps; `sunPath` as the model sampler | closed (the oasis sentence: VRC0S-18) |
| scope | §8.2 names T112-1's threshold cell; §9.2 `ObstacleSource` kind `room`; §8.3 structural faces; §12 → V07 §6 for village rungs; first paint → first map | threshold **open** (VRC0S-07); V07 §6 pointer **open** (VRC0S-20); rest closed |
| V01 | §11.1 holds the one VTT rule at `vtt.retainingMinCm` | closed |
| V03 | R12-23's "(50 → 100 cm)" restates V03 §2.4's `moduleCm` | **open** (VRC0S-22) |
| V06 | item 114's §8.2 rows and legend; §11.1 condition and material per run | **open** (VRC0S-01) |
| V09 5, 8 | item 119's progress rule names the generation worker's stage messages; item 114's `legend.wall.<state>`; season and decoration rows within §12.5 | **open** (VRC0S-01, -03, -04, -05) |
| V12 4 | §12.10's slower-than-target and interaction rows | **open** (VRC0S-05) |

## 7. Issues

Severity by the brief: NUANCE-LOST is a blocker; an undefined or untested edge a major; the others by their effect
(a whole owner rule's part absent, a unit-to-unit contradiction on a behaviour, or a bar with no value: major; a
pointer, wording or single-clause defect: minor).

**VRC0S-01 (major; F-MISSING; rendering) — g item 114's rendering part is absent.** §8.2's only wall state row is
`decayed` (a gap glyph over each `breached` run, a `dismantled` run's towers as trace discs, L11923); there is no `worn`
or `patched` row, no rubble at a breach, no legend entry, no greyscale distinction; §11.1's wall runs carry `condition`
but no `material`, and no battle-map rule treats a patch as a wall and a breach as an opening. V06 (its note), V09
(`legend.wall.<state>`, J-V9.134) and V12 (J-V12.91's greyscale bar against §8.2's threshold) read these rows.
*Required:* §8.2's `states` table gains, per run of `Enceinte.condition` (§2.7): `breached` — a clear break in the wall
line with a rubble spill, every band; `patched` — the run in its patch material's own line style and colour (thinner,
lighter, irregular; timber, wattle, earth bank and dry-stone infill reading apart from the robust wall; the material a
V11 `walls.patchMaterials` row), every band; `worn` — weathering and broken crenellations, district band and finer;
`dismantled` as now; each with a legend entry and a second cue (pattern or line style, never colour alone) that stays
distinguishable in greyscale at those bands (item 112's check); §8.3's states census row names the two new states;
§11.1: GeoJSON wall runs carry `condition` and `material`, the `.dd2vtt` and Foundry scenes write a `patched` run as a
wall (`line_of_sight`) and a `breached` run as an opening, glTF/CityJSON per run; §8.11/§11.6 gain the edges (a run
shorter than one glyph; every rung; save, undo, migrate of a run's material).

**VRC0S-02 (major; F-MISSING; rendering) — g item 116's rendering part is absent.** §8.8's pyramid runs its 35 stops at
every rung (L12626), T-ER-08 says "every rung draws every stop" (L13061), §9.5's framing and §12.5 carry no limit; V07
(§5.2's township view = the limit's view less its margin), V09 (the view controls stop at §8.8's limit), V11 and V12
cite "§8.8's per-map limit". *Required:* §8.8 states the per-map zoom-out limit — the stop at which the whole `bounds`
fits the viewport's short side, plus one stop of margin (a table cell) — beyond which the view never settles and no tile
is drawn, the zoom-in end unchanged, the limit moving with `bounds` when an epoch or a hand edit grows them; exports
frame within the whole bounds at most (§8.7, §11.1); §9.5's framing opens within it; §12.5 "fewer stops, never more";
T-ER-08 restated: every rung draws every stop from its limit inward, no stop beyond it reachable, the first view
unchanged.

**VRC0S-03 (major; F-MISSING; rendering) — g item 117's rendering part is absent.** §8.2 holds only the four named
season override rows (autumn tint and winter bare crowns by `leafType`; `snow` weather) and `tree@autumn` (L11822);
nothing draws the year position, ice, the growing year, autumn's covers or the week's sun; §11 names no season; §12.5
has no re-skin budget. V07, V08, V09, V11 (rows 98–101: "§8.2's season, cover, `ice` and `snow` rows") and V12 cite
them. *Required:* §8.2's season rows read the view's week (§2.9's year position) and the climate row's season columns
(§10.2; V11's tables): fields, gardens, orchards, meadows, commons, hedges, vines and deciduous trees through the year
by their kind's bands of weeks (sown and blossom, full, ripening gold, stubble and stooks, ploughed and fallow), gardens
and greens by climate; the `ice` role with crack lines and snow dust, still water freezing before flowing water, open
leads at fast current, weirs, mill races, springs and outfalls, the sea only in a severe climate along sheltered
shores, boats drawn hauled up while their water is frozen; item 117 (f2)'s autumn — a keyed per-tree crown colour from
a species palette (some still green early), fallen-leaf cover on ground, streets, greens, lawns, roofs and still water
near trees deepening through the leaf-fall weeks, red creepers, rust bracken, gold stubble, crowns thinning late —
palettes and densities as V11 rows; `snow` weather on by default in the snow weeks of cold and severe climates, off in
arid ones; the view sun's default height by week (§8.4), never item 102's model sampler; each season's look passing the
contrast and colour-deficiency checks; §11: picture exports draw and name the season, battle-map exports record it (ice
walkable in a severe winter, water otherwise); §12.5: the re-skin budget for a season switch over cached tiles; edges.

**VRC0S-04 (major; F-MISSING; rendering) — g item 118's rendering part is absent.** No festival or decoration row
exists in §8–§12; V07, V08, V09, V11 (rows 102–105: "drawn by §8.2's decoration rows") and V12 cite them. *Required:*
§8.2's decoration rows by tier and band — THORP a garland or bonfire at the heart; HAMLET maypole or bonfire, door
garlands; VILLAGE maypole, bunting on the church lane, stalls and tables on the green; TOWN bunting across streets,
banners on gates and hall, market stalls, lantern strings; CITY and METROPOLIS the procession route with banners,
pennants on towers and walls, pavilions and stages, lanterns along main ways, decorated boats; sky islands' pennants
(V05) — at the city band as colour along the route and pennants, the district band adding bunting, stalls and
pavilions, the neighbourhood band lanterns, tables and garlands; placed by keyed draws of the seed, the festival id and
the place (byte-stable per seed), motifs from the culture, the deity and the season (V11 tables), never over a label's
keep-out or a gate's passage, each with its second cue; the festival display joins the tile key; §11: picture exports
draw and name the festival, battle-map exports draw decorations in the image only (never walls or obstacles); §12.5:
drawn lazily per visible tile; edges (no traditions and no preview byte-identical to the base).

**VRC0S-05 (major; F-MISSING; rendering) — g item 119's rendering part is absent, and §12 contradicts it.** §12 has no
comfort level, no measured-gain rule and no progress rule; §12's opening paragraph ("Both misses are stated for the
owner to veto", L14659), §12.3's and §12.5's "Declared for the owner's veto" (L14765, L14886) and §12.10's veto column
still treat D-18's misses as veto questions, which item 119 (a) ends. V09 (its note 5) and V12 (§3.15.9, §6, T-V12-50: the rows of steps slower than
their target with their gain, and the interaction rows) read §12.10. *Required:* §12 states §12.3's and §12.5's laws
(and every volume's) as the TARGETS — as fast as possible; the COMFORT LEVEL of ten seconds of total time from the click
to the complete result for every one-time wait (generate, regenerate, open from SettlementForge, a dossier change,
advance time and the history replay, an export, a migration) on the reference hardware (§12.1) at every size to the
metropolis cap, past which a wait fails; a step slower than its target only for a recorded measured gain inside the
comfort level; the progress rule (past about one second the stage by name — the generation worker's stage-start
messages through `onProgress`, which V09 §4.21.9 reads — and the map filling in, never an empty screen; the first
picture still complete); interaction budgets unchanged (pan, zoom, drag, preview, hover, inspect, undo, the season and
festival switches); the low tier declared per device; D-18's two misses re-declared as target misses inside the comfort
level; §12.10 gains the comfort-level row per one-time wait, the slower-than-target register (step, cost, gain) and the
interaction rows, and its veto column is re-read (a target miss inside the comfort level is no veto question).

**VRC0S-06 (major; CONFLICT; rendering) — §11.3 makes `E_HOST_FORMAT` absolute; V08 §5.4 (2) places the export
bundle's exception in §11.3's vocabulary.** §11.3 answers a host's `export.request` for any format but `png`, `svg`,
`print` with `export.refused { error: 'E_HOST_FORMAT' }`, "which never applies to `doc.snapshot`" (L14499–14500), and
its `export.request { fmt, opts, displayNames?, knowledge? }` has no `bundle` field; V08 §5.4 (2) sends the bundle as
`export.request { fmt: 'dd2vtt' | 'foundry', …, bundle: true }`, "the one exception to `E_HOST_FORMAT` (§11.3's port
vocabulary)", and V08 §2.2 says who may send what is §11.3's. A builder following the base refuses the J122 bundle.
*Required:* §11.3's `export.request` gains `bundle?: true`, and the refusal sentence reads "… with `export.refused {
error: 'E_HOST_FORMAT' }` (V08 §5.4), save a `bundle: true` request for `dd2vtt` or `foundry` (the export bundle from
M-SF, §11.4; V08 §5.4 (2)), rendered under the calling key's §11.1 rules and answered `export.ready { bytes }`; `bundle`
with any other format, or those formats without it, is refused; neither rule applies to `doc.snapshot`."

**VRC0S-07 (major; WIRING; rendering) — T112-1's deficiency-contrast threshold has no value and no named cell.** §13.2's
T112-1 reads "§8.2's deficiency-contrast threshold (a table value)"; V11's registry row 52 places it "among [§8.2's]
cells" and V12 registers it; §8.2 says only "against its table threshold" (L11906). The owner's bar cannot run.
*Required:* §8.2 names the cell (e.g. the palette row's `cvdContrastMin`, ΔE2000 between the simulated swatches of every
legend pair) with its default value (our own; calibratable at M3b) and states that T112-1 and J-V12.91's greyscale bar
read it.

**VRC0S-08 (major; LOST; rendering) — the S11 geometry-share bar (≤ 3 µs per plot median) is pointed at from both ends
and stated at neither.** The archive's §12.4 S11 row and §12.7 stage-3 hook stated "≤ 3 µs per plot (the kernel's M0
bar, §3.7)"; the rewrite (RESTATEMENTS-009) cut both to "within the kernel's M0 bar (§3.7)" (L14827, L15063), while
§3.7 measures "S11's geometry share against its §12.4 row" and states no value. The number survives only in §16's M0
exit and J-K20's index row. *Required:* §12.4's S11 row restores "its geometry share ≤ 3 µs per plot median (the kernel's
M0 bar, §3.7)" — the home §3.7 names — and §12.7's hook cites "§12.4's S11 row".

**VRC0S-09 (blocker; NUANCE-LOST; rendering) — §8.4's toggle rule lost its rung split.** The archive read "The sewer
control at CITY and METROPOLIS and the island view toggle set `LayerSpec.visible` … a toggle never creates what the
settlement lacks"; the restatement cut reads "the sewer control and the island toggle set `LayerSpec.visible`, so
hiding a layer changes no digest" (L12181) — false at TOWN, where II.7.1 makes the *Sewers* control a model setting
(re-derive from S7b), and "the island toggle" no longer tells the view toggle from `recipe.layers.islands`, the model
setting. *Required:* "the sewer control at CITY and METROPOLIS and the island view toggle set `LayerSpec.visible`, so
hiding a layer changes no digest and a toggle never creates what the settlement lacks (at TOWN the *Sewers* control is
a model setting, II.7.1; whether islands exist is the model setting `recipe.layers.islands`, II.6)".

**VRC0S-10 (major; WIRING; model) — the view key `cvdVariant` is read but never declared.** §8.2 selects the checked
variant "by the per-viewer view key `cvdVariant` (`'none'` default)" and joins it to the tile key; §13.2's T112-1 and
V09 (§4.21.2, T-V9-72) read and write it; §2.9's view section, the view keys' home, has no such key (rendering's
cross-part note asked for it), so it has no persistence, no bridge rule (§11.3 carries "every view key of §2.9") and no
type (`CvdVariant` excludes `'none'`). *Required:* §2.9's view section declares `cvdVariant: 'none' | CvdVariant` (per
viewer; default `'none'`; outside the model hash; V09's machine default `AppPrefs.cvdDefault` where a document holds
none).

**VRC0S-11 (minor; WIRING; rendering) — §8.8's tile key omits two pixel-changing view keys.** §8.2 says `cvdVariant`
"joins the tile key (§8.8)", and `showUnexcavated` draws voids for a key that admits them; §8.8's canonical tile-key
list (L12691–12697) names neither, so a cached tile would survive a variant or `showUnexcavated` switch. *Required:*
the tile key's view-state switches gain `cvdVariant` (while the sheet has a colour-coded row in view) and
`showUnexcavated` (the underground layer, a `secret` key).

**VRC0S-12 (major; F-MISSING; pipeline) — file f item 479 is applied by no unit.** BCR-V6-23 rewrites §4.11's epoch
order (c): "which dwellings empty is decided by the evolution engine's departure matching (V06 §3.5.1 …), and the
decline lottery strikes fabric only". The canon listed it under rendering, whose rewrite handed it to pipeline (its
home is §4.11); §4.11 still reads "the decline lottery … draws per building, deciding whose households leave first"
(L7434), which V06 §3.5.1 contradicts, and "decline lottery" is G-strike's retired form. *Required:* §4.11 order (c)
reads "which dwellings empty is decided by the evolution engine's departure matching (V06 §3.5.1: the roster's suffix
matched to exposure-weighted dwellings by band), and the strike pool (V06 §3.5.2) strikes fabric only, by its exposure
(item 28 (f) with item 8; J-A28.45)".

**VRC0S-13 (minor; F-MISSING; rendering) — file f item 457's knowledge clause, and the band of three reader kinds.**
BCR-V3-5 makes `plan` and `planReport` "knowledge-filtered by V03 §5.4's merge (§9.2)"; the live member (L14332) drops
it, and §11.2's *Knowledge* paragraph names `plan`, `planReport` and the `history` kinds neither view-bound nor
band-less, so their admission band is undefined (a concealed room is admitted only at the building band). *Required:*
the members' comment ends "knowledge-filtered by V03 §5.4's merge under §9.2's admission function at the building band";
the band-less list adds the `history` kinds (as at the city band).

**VRC0S-14 (minor; F-MISSING; rendering) — file f item 472: `party.render`'s viewer refusal.** BCR-V8-1: "`party.render {
party, since? }` (owner or editor only, a viewer's answered `doc.rejected { reason: 'role' }` …)"; the live text keeps
"owner or editor only" but not the viewer's answer (L14493), and V08 §2.2 cites §11.3 for who may send each message.
*Required:* "(owner or editor only, a viewer's answered `doc.rejected { reason: 'role' }`; not an export: …)".

**VRC0S-15 (minor; BROKEN-REFERENCE; rendering) — the cap frame's pointers.** §12.2 now reads "the cap's frame and its
headroom are §3.2 (9)'s" (L14719) and §11.1's GeoJSON extent "(≈ 15.7 km from the centre at aspect 2, §3.2 (9))"
(L14153); §3.2 (9) states neither (it cites §12.2 for the cap — a loop); §3.2 (1) holds the aspect-2 frame (17.53 × 8.76
km), |x| ≤ 1 402 000 cm and the 6× headroom, and the square cap frame "12.4 km (19.8 km with the margins)" is now stated
only as §12.2's table's 12.4 × 12.4 km. *Required:* both pointers read "§3.2 (1)"; §12.2's bullet keeps "12.4 km square
(19.8 km with the margins)" beside its table row, so the loop closes at §12.2 for the cap and §3.2 (1) for the range.

**VRC0S-16 (minor; NEW-PROBLEM (narration); rendering) — validation-record ids and change history in the design text.**
The rewrite wrote 19 canon ruling ids into §8–§12 — RIC-01, RIC-02, RIC-04, RIC-05, RXC-01, E-16 (3), E-17, E-18 (2),
E-19, EI-REDGE-01, EI-REDGE-02, V01-XCONF-2 (2), V04-ICONF-3, V08-XCONF-5 — and §8.5's "(the style sheet's former
`budgets` field, which nothing read, is withdrawn)" (L12479); principle (5) keeps such narration in the validation
records. *Required:* drop the ids (the rules stay; decision ids J-…, D-… and item numbers stay), and §8.5's clause reads
"so no per-band detail budget exists".

**VRC0S-17 (minor; CONFLICT; rendering) — the pyramid's widest stop against B-ZOOM's range.** §8.8: stops "cover B-ZOOM's
1:50 000 → 1:500 in 27 stops", then m_k = 0.132 29 m × 2^((26 − k) ÷ 4) puts stop 0 at ≈ 1:45 255 (L12626–12630), so
B-ZOOM's 1:50 000 end is never drawn. *Required:* "cover B-ZOOM's range, ≈ 1:45 000 → 1:500, in 27 stops" (and §13.2's
B-ZOOM line the same bound, scope's), or m_0 anchored at 1:50 000 with the entry stops and the building-band stops
re-derived.

**VRC0S-18 (minor; CONFLICT; rendering) — §8.2's oasis sentence disagrees with §2.3/§2.7's records.** §8.2: "its grove is
a `Greenery` wood … its irrigated gardens are `garden` and `field` land-use faces with their channels as `water`
hairlines" (L11883); §2.3 and §2.7: the grove is `Greenery` of kind `grove`, the gardens `LandUse` of kind `garden`
(there is no `LandUse` kind `field`), each naming its water body in `fedBy`, "the short channels from the water to each
garden are drawn from those links (§8.2), never stored". *Required:* "its grove is the `Greenery` of kind `grove`, drawn
by the `instances` program with the climate row's species; its gardens are `LandUse` faces of kind `garden`; a `water`
hairline channel is drawn from the water body to each garden its `fedBy` names, derived at render, never stored".

**VRC0S-19 (minor; WIRING; model) — `Enceinte.walkCm`'s declared readers do not read it.** §2.7's comment: "read by
§11.1's VTT and glTF wall tops and §8.3's close-up wall symbol" (L2107); only §11.1's glTF row reads it (the rewrite
closed W-FLD-05 with the glTF reader alone). *Required:* the comment reads "read by §11.1's glTF wall top".

**VRC0S-20 (minor; F-MISSING; rendering) — file f item 495's §12 clause.** BCR-V7-23 ends "the base's §12 budgets point
to V07 §6 for the village rungs"; §12 has no such pointer (scope's note repeats it). *Required:* §12's head (or §12.2)
states "the village rungs' budgets (THORP, HAMLET, VILLAGE) are V07 §6's; the laws here are the base rungs'".

**VRC0S-21 (minor; BROKEN-REFERENCE; rendering) — the antenna rule's two sections point at each other.** Kernel's note 26:
§11.1 is the home of "emitted without antennae" and its pointer should read "(an antenna: §3.6 rule 3)"; §11.1 reads
"(§3.6 (6))" (L14084) and T-ER-19 "§3.6 (6)", while §3.6 rule 6 reads "A face's exported area boundary omits its antennae
(§11.1)". *Required:* §11.1 and T-ER-19 read "(an antenna: §3.6 rule 3)".

**VRC0S-22 (minor; NEW-PROBLEM (restatement); rendering) — R12-23 restates V03's cell.** R12-23's fallback "the class's
wing-local module row doubles (50 → 100 cm)" (L15229) restates V03 §2.4's `moduleCm` (V03's note). *Required:* "the
class's wing-local module doubles (V03 §2.4's `moduleCm`)".

**VRC0S-23 (minor; CONFLICT; V11) — the admission table's readers.** V11's registry row 55 (`knowledge.admit`, "the
knowledge admission table", §9.2) lists S13b as its only reader; E-17's one admission function at §9.2 reads it for
S13b, the thematic rows, the concealed marks and lights, the legend, `live.voids`, the reader (hover and every `query`
kind) and every export. *Required:* row 55's readers read "§9.2's admission function: S13b, the thematic rows, concealed
marks and lights, the legend, `live.voids`, the reader and every export (§9.2)".

**VRC0S-24 (minor; CONFLICT; rendering) — the `unexcavated` program's gate against V04's lost look.** §8.2 defines the
program as "drawn only for a `secret` key while the view key `showUnexcavated` is on" (L11776); V04 §5.2 (g item 113
(e)) draws a `lost` cluster by the same program "for every key that admits its elements, whatever `showUnexcavated`".
*Required:* §8.2: "… drawn for an `unexcavated` cluster only for a `secret` key while `showUnexcavated` is on, and for a
`lost` cluster for every key that admits its elements (V04 §5.2; g item 113 (e))", and §11.1's unexcavated clause
scoped to `unexcavated` elements (a `lost` element exported with `excavation: 'lost'` as V04 states).

**VRC0S-25 (major; EDGE-UNTESTED; rendering) — three catalogue slots have no T-ER row.** edges.json routes
M-rendering-10914-E6 (§8.10 at every rung), M-rendering-11262-E6 and -E8 (§9.3's spines at every rung, and through
save, load, undo, redo, regenerate and migrate) as UNDEFINED; T-ER-09 names no rung, T-ER-14 no rung and no lifecycle.
*Required:* T-ER-09's test runs its fixtures at every rung THORP → cap (a village rung's hinterland and orchards
included); T-ER-14 adds the outcome "spines are S13a model data — persisted, rebuilt by scope, undone with their event"
and a B-EDIT fixture (save, load, undo, redo, a scoped regeneration, a migration) with its spine digests stable, run at
every rung.

**VRC0S-26 (minor; ELEGANCE; rendering) — the shrink goal's verbose-prose source was not applied.** The part grew by 18 %
(59 158 → 70 004 words; the band 35 495–44 368), and the rewrite report states that "a deep verbose-prose pass …
was not made in this lane — its potential is estimated at 10–15 % of the original". Principle (9) names verbose prose
as one of the four sources. *Required:* the verbose-prose pass over the unchanged 591 inventory ids' text, under the
guard (no case, value, bar or fallback thinned), its words by source reported.

**VRC0S-27 (minor; WIRING; rendering) — `Gate.mouth`'s harbour chain has no drawing.** §2.7's `mouth` comment says the
chain is "drawn raised or lowered by the era row (§8.2)" (L2120) and V11's `EraRow.harbourChain: 'raised'|'lowered'` is
"how the harbour-mouth chain is drawn"; §8.2 has no row reading it (an orphan field, owner item 106 (e)). *Required:*
§8.2's symbolisation gains the harbour-mouth chain: a `water` gate with `mouth` draws its chain between the two towers —
`raised` a solid chain line across the entrance in `wall` at the gate's stroke, `lowered` a dashed line under the water's
casing — read from the era row, at the district band and finer (the towers at every band).

**VRC0S-28 (minor; WIRING; rendering) — `stretchClass`'s graded runs are not drawn.** g item 106 (c) grades the wall's
thickness, height and walk by run (`stretchClass`: `full` · `parapet`, V11's `walls.barriers` row); §8.2's
`wall.curtain` draws "k = 3 on the band thickness" (L11712) from the enceinte's one value, so a parapet run draws as a full
curtain (model's note: "§8.2 draws … `stretchClass` runs"). *Required:* `wall.curtain`'s width reads each run's
`stretchClass` row thickness (`sampleProfile` by arc length), the census row checking a parapet run's width.

**VRC0S-29 (minor; F-MISSING; rendering) — the empty dry run's reason has no carrier.** §7.1: an empty edit's "dry run
reports it empty with the reason (V09 §4.9)"; determinism's note asks §11.2 to report it as `ok` with nothing changed;
`PreviewResult`'s `ok` branch has no field for "empty" or its reason (L14307–14320), so the reason §7.1 promises cannot
reach a client. *Required:* `PreviewResult`'s `ok | conflict` branch gains `empty?: MsgRef /* §7.1's empty edit: the
reason (V09 §4.9's `edge.*` rows); nothing else set */`.

## 8. CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed):** the live sections equal the rewrite's files plus two assembler corrections (diff); the 223
hunks and the 591 / 113 split of the inventory ids (script over `where` lines); every hunk read; the 70 BCR texts
extracted and compared; the absence of any base mention of items 114–119 (grep 0); the retired-synonym grep (0
residuals); the reference resolution of 64 volume and 40 base sub-item references (script); RIC-03's 0.995 m and the
entry stops' scales (arithmetic); the `E_HOST_FORMAT` text at L14499–14500 and V08 §5.4 (2)'s exception; `cvdVariant`'s
absence from §2.9 (grep); §4.11's L7434 unchanged; the 3-µs bar's two pointers and its survival only in §16 and J-K20.
**PLAUSIBLE (reading):** that the 105 reworded ids keep their meaning (each read once, no second reader); the severity
calls; that VRC0S-25's three slots are real gaps rather than covered by T-ER-06's band sweep; the exact drawing proposed
in VRC0S-27 and the cell name in VRC0S-07 (the required change fixes the gap; the values are the editor's).
