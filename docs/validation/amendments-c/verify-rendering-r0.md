# verify-rendering-r0 — lane amendments-c/verify-rendering-r0 (the RENDERING part after assemble-r0)

> PENDING FABLE REVIEW — Opus-produced (amendments-c/verify-rendering-r0).

> PROGRESS (kill-safe ledger; a seat that continues this lane reads it first):
> STEP 0 inputs read (route items, amendment files c/d/e, seat report amend-rendering.md, cross-part notes): done
> STEP 1 §8 read whole: done
> STEP 2 §9 read whole: done
> STEP 3 §11 read whole: done
> STEP 4 §12 read whole: done (receipts: docs/validation/bench/amendc_verify_rendering_r0_{spot,sunbear}.{py,out}; palette receipt re-run byte-identical)
> STEP 5 citing subsections, J rows, rationale entries: done (30 rendering J ids: 1 index row + 1 Part A entry each; 124 J ids cited in the part all defined; resolver 2 broken = the 2 pre-existing external)
> STEP 6 per-item verdicts written: done
> STEP 7 checks (single-source, stale, cross-part, deferral, refs, new-problem) written: done (24 issues, §4)
> STEP 8 doc_checks run, queue row, LANDED: done (doc_checks 8,9,11,12 exit 0; queue row B-amendments-c/verify-rendering-r0 appended once; LANDED line written)

Design under review: docs/ARCHITECTURE.md sha256 7f4c0e253438b41beb19fce30e8ec6addc4cc9f1bd01c7896a5aa2961d715623;
rationale sha256 22f01184eac296c1b4498c4bf59edd17bbb24a849ab9a325055079d4c45fd730 (assemble-r0's installed files).

## Outcome

The five items homed in the rendering part (53, 54, 55, 68, 69) and the nineteen routed to it by reference (58, 63, 64,
65, 67, 70, 72, 20 (h), 73, 74, 75, 77, 81, 82, 85, 86, 87, 88, 101), plus item 59's released timing, are all in §8, §9,
§11 and §12 as mechanisms: 22 PRESENT and 3 PARTIAL (58, 67 and 101 — one gap each, below). No held part is written. The
part's document checks exit 0, and every J id it cites resolves. The palette receipt `amendc_rendering_palette.py`
re-runs byte-identical.

**24 issues: 1 major and 23 minor.** Owners: rendering 20, pipeline 2 (one of them shared with model), model 1, scope 1.

* **The major issue (VRC-01).** §11.2's knowledge rule does not cover item 101's new `why` query. The `preview` call
  also returns unfiltered fates to any role. Either can reveal a clandestine front's concealed purpose to a clerk or a
  viewer, which is against item 63 (c).
* **Minor issues confirmed by executed receipts.**
  * Two lighting census bars in §8.3 can never pass under §8.4's own model: VRC-02 (the spot lit from every side) and
    VRC-03 (the cursor-sun tip and the 2° bearing bar).
  * §8.4 (c)'s normalisation omits the spill term (VRC-04).
* **The other minor issues** are gaps or contradictions the amendments created:
  * the order of the post operations and the light pass (VRC-05);
  * the light map's cache key (VRC-06);
  * the march sampling (VRC-07) and §13.4's full-precision fallback (VRC-08);
  * the precedence between the sun mode and the night preset (VRC-09);
  * the Works ruin sub-stages, which have no rows (VRC-11);
  * the week each export uses (VRC-12);
  * the S12c stage, which has no budget row (VRC-13);
  * the canvas arithmetic for a lit export (VRC-14);
  * "P-id pending" (VRC-15);
  * the region label's priority (VRC-16);
  * history narration (VRC-17);
  * build naming (VRC-18);
  * §11.4's doors (VRC-19);
  * §12.2's router sentence (VRC-20);
  * and four cross-part conflicts: `LightRule` fields, the flicker phase, the summary's "optional shadows" and
    `LightSource.colour` (VRC-21 – VRC-24).

CONFIRMED: every verdict below quotes the live text, and VRC-02, VRC-03 and VRC-04 rest on executed or re-derived
arithmetic. PLAUSIBLE: the required changes that choose a mechanism (VRC-01's `why` rule, VRC-04's spill definition,
VRC-07's single march rule, VRC-09's precedence and VRC-13's numbers). Those choices are the repairers' to confirm.

## 1 Inputs read

* `route.json`: the five home and nineteen referencing items, and every rendering-part entry in them.
* `docs/AMENDMENTS-2026-09-27c.md`: items 53–72 whole, section G's item 20 (h), and all three Fable review sections.
* `docs/AMENDMENTS-2026-09-27d.md`: items 73–88 whole, with the ruling summary and owner rulings Q1–Q6.
* `docs/AMENDMENTS-2026-09-27e.md`: item 101 whole, with (f′) taken over (f).
* The seat's report `amend-rendering.md`.
* Every cross-part note addressed to the rendering part in the other eleven `amend-*.md` reports. These are E2 note 7,
  E1 note 4, K note 5, M note 6, B note 8, D note 5, T note 5, S1 note 3 and S2 note 2.
* `assemble-r0.md`.
* The part itself: §8 (l. 9422–10796), §9 (l. 10797–11178), §11 (l. 11632–12026) and §12 (l. 12027–12582), read whole.
* The subsections the part cites or that cite it:
  * §2.7's `LightSource` and staged records, §2.9's view keys and §2.8's registry rows;
  * §4.7's *Light sources* and `LightRule`, §4.11's `WorksStage` and *Which week is drawn*, and §4.1's stage graph;
  * §7.7 whole (items 1–16 of the dossier contract, and layer 2) and §7.8's light controls;
  * §13.2's T68 group and §13.4's light-pass and palette bars;
  * §0.2's row 68, §1.2 and D-19;
  * II.7.3 and II.7.5, for the shafts and the quarter tree.
* The 30 rendering J rows and their Part A entries.
* The archive, for §11.4 and for `ShadowPass`.
* `research/findings/code-impact.md` §(d), which has P14–P21 and no P22–P24.

## 2 Per-item verdicts (quoted from the live design, sha256 `7f4c0e25…`)

| item | where | verdict | evidence (quoted) |
|---|---|---|---|
| 53 (home) | §8.10 | PRESENT | §8.10: "in the **candidate annulus** [r₀, (1 + a) r₀] on the torus the tile is, a = `poisson.annulus` = 0.1 … P14; item 53; Bridson's textbook [r₀, 2 r₀], a = 1, is the alternative value". The route's PLAUSIBLE restatement is there too: "≈ 175–180 at the shipped annulus below, PLAUSIBLE until `plat/tools/stamptiles/` builds the asset" and "≈ 2.2 ms at 178 points by the same n² law". J-A53.81. |
| 54 (home) | §8.2 symbolisation, `raised.ratio`, `raised(offset, classRatio)`; §8.4 K06 | PRESENT (VRC-10: duplicated in §8.4) | §8.2: "(+0.4 m, −1.0 m) east / north × the class ratio — `raised.ratio`'s first matching row: landmark footprints … 2, the farmstead class and its outbuildings 0.6 … every other building 1 (provenance `ref:MFCG 12710731 raise ratios (code)`, P15; item 54)". §8.3 has the census row "raised under-copy by class". |
| 55 (home) | §9.3; §9.2's memo | PRESENT | §9.3: "the **horizontal spine** — among the tree's leaf-to-leaf paths, the one maximising its length plus its horizontal extent (… ≤ 64 leaves, else not offered), scored in model coordinates with model north up … P16; item 55; J-A55.81". §9.2: "held per knowledge key, `knowledge.admit` version and view rotation". The route's recommendation (model coordinates, with S13b re-ranking on screen) is taken over the item's "view coordinates"; the ruling is recorded in J-A55.81. |
| 68 (home) | §8.4 (a)–(h); §8.1, §8.2, §8.3, §8.5, §8.8, §8.9, §8.10, §9.4, §11.1–§11.3, §12.5, §12.7, §12.8 | PRESENT (defects VRC-02 – VRC-09, VRC-14, VRC-15, VRC-17) | §8.4: "The lighting model (item 68 …). One model, stated here". It has: (a) a surface layer and occluder slabs; (b) the global, placed and derived lights, with shafts and the hand lantern; (c) the brightness sum with falloff f(x) = (max(0, 1 − x⁴))², marched visibility, occlusion and spill; (d) the cursor sun G = V + s·u, H = h₀·D·s; (e) day and night, with no global light underground; (f) the light pass as a post operation, the CPU reference, the GPU pass and the light map; (g) the three-rung ladder; (h) the presets. All the route's referencing rows are present, among them §8.1's `LightTable` and `eaveCm` / `ridgeCm` columns, §8.8's 4.25P + 7 MB, §9.4's "labels, halos and furniture are composed after §8.4's light pass and never lit", §11.1's `KHR_lights_punctual` and dd2vtt "the model's lights", §11.3's light keys, and §12.5's "≤ 8 ms per frame". The held (g) clauses are absent (§5). |
| 69 (home) | §8.2 *Palette targets*, role values, §8.3 census row | PRESENT | §8.2 has the targets table (axis, our measure, band, target, provenance "`corpus`, 'owner-opened corpus palette exception, 2026-09-27 (item 69)'"). It has *Where they bind*, the measurement render ("the golden TOWN and CITY … at 300 dpi on A3 … default view, day, no pointer") and the re-tuned role table ("paper luma 235.3 and warmth 36, the ink's luma 35.8–36.3 and warmth 20"). It records "no role above CIELAB chroma 34 … J-A69.82 re-rules J-R3's 18". The receipt re-runs byte-identical. The Fable note's Rec. 601 reading matches our measure: #F6EDDE gives 238.0. |
| 59 (timing, RELEASED) | §12.7 | PRESENT | "A research-side restatement of the Fantasy Manor model (build 890, version 1.0.0), run as a test instrument, takes roughly 0.08 ms for each building warm and about 0.6 ms with view geometry included … (item 59)". It is labelled as the gate requires and never says "Fantasy Manor costs". |
| 58 (d), (e) | §8.2 layer order; §8.3 | PARTIAL (VRC-18) | (d): "NG's (greens → roads → shadows → buildings → props → large-tree pins under buildings, block trees above them → title; item 58 (d))". The build is not named. (e): "15–20 hatch triangles per wing, counting the two filled tapers laid along the ridge, each 30 to 50 per cent of its length (item 58 (e)); no ridge stroke". (f) is released and belongs to seat D (II.2). |
| 63 | §8.1 item 7, §8.5, §9.2, §11.1, §11.2 | PRESENT (VRC-01 touches its reader rule) | §9.2: "**Concealed parts (item 63; J-A63.81)** … its own `Use` record … with its own `knownTo` (default `secret`) … the marks of its **concealed parts** … no trace of the concealed parts". §8.1 item 7: "carries `concealed` = 1 and the concealed use's `knownTo`". §11.1: "none of a concealed use's concealed parts". §11.2: "A concealed use (item 63) is a place like any other here". |
| 64 | §8.2 `states` (access), §9.2 | PRESENT | §8.2 row "access \| `open` / `locked` / `bricked` … / collapsed … a secret one drawn only for a key that admits it (§9.2)". §9.2: "an `AccessPoint` or `UndergroundLink` whose `knownTo` the key does not admit draws nothing and labels nothing". |
| 65 | §8.4 layers, §8.2 states and programs, §9.1, §9.2, §11.1 | PRESENT | §8.4: "**The underground layer is one layer over several systems (item 65; II.7.6; J-A65.81)** … the cut-away draws the chosen band in full and … the bands directly above and below it as `trace` hairlines". §8.2 has the `ossuary`, `cavern`, `quarry` and `chamber` programs and rows for gallery, chamber and link. §9.1: "named as the underside of that quarter" (it agrees with II.7.5 l. 15583). §11.1 VTT: "the underground one scene per depth band … every system of the layer in it". |
| 67 | §8.1 item 7, §8.2, §8.4, §8.5, §8.6, §11.1, §11.3 | PARTIAL (VRC-11; VRC-12) | §8.1 item 7: "The display list is built at the **drawn week**". §8.2 has rows for staked … refit and plot lines. §8.5: "**Works stages by band (item 67 …)**". §8.4: "a building under Works at its stage heights". §11.3: "**The host's clock (item 67; J-A67.82)**". Missing are rows for `WorksStage` `roofless`, `collapsed` and `overgrown` (the ruin sub-stages, item 67 (f)), and a statement for `before` / `finished` (VRC-11). The formats also disagree on the week (VRC-12). |
| 70 | §8.2, §8.5 (2), §9.1, §9.4, §9.6 | PRESENT | §8.5 (2): "**An informal cluster is the exception (item 70; J-A70.81)** … a dense speckle of small roofs over a ground-toned path web, never an empty block and never a solid mass". §9.1: "one `LabelEntity` of kind `place` targeting its plot". §8.3 has the census row. |
| 72 | §8.2 thematic, §9.1, §9.4, §9.6, §11.1 | PRESENT | §8.2: "**Character themes (item 72; J-A72.81):** rows keyed by a district's `identity`, by the share of a power … of a sector … and by its band range". §9.4: "conditioned on its members' dominant identity (item 72)". §9.6: "**Names from character, places and claims**". §11.1: "each district's character vector, identity, band range and name history (item 72)". |
| 20 (h) | §9.1, §9.2, §11.1, §11.2, §11.4 | PRESENT | §9.2: "**Which facts are the dossier's (item 20 (h); J-A20.82).** … its tier by §2.8's marker — `dossier` …, `declared` … or `map`". §11.1: "every property's tier as `plat:tier`". §11.4: "**Optional only (item 20 (h) (iv); J-A20.79)**". §11.3's one-way rule is unchanged (J-A20.81). |
| 73 | §11.4 | PRESENT | "For a dossier, door (1)'s blueprint and the log's creation prefix, and door (2)'s events and epochs, are produced by `@plat/port` … the host passes the whole dossier and … `HostContext` … and nothing else". Also: "**No door opens the other way (owner, J86 Q2; J-A73.81)**" and "The port's wiring to a live host bridge is staged". VRC-19 is a wording conflict inside it. |
| 74 | §11.4 | PRESENT | "Door (2)'s events carry the element's binding key in `EditBase.dossier.element` (§7.7 item 12; item 74)". |
| 75 | §11.4, §11.3, §11.2 | PRESENT | "the change envelope in `EditBase.dossierChange` (§7.7 item 13; item 75)". §11.3: "`report.changed { entries }` (… a dossier event's entries name the `changeId` and the reason …; item 75)". §11.2 carries the same line. |
| 77 | §11.1 geo anchor | PRESENT | "the port's realm fit sets the anchor's `bearingDeg` … as the key's documented default; no geometry moves for it". This matches §7.7 layer 2's *North first*. |
| 81 | §9.5 Title, §11.4 | PRESENT | §9.5: "A dossier-bound map's word for its size is the dossier's own tier word … (§7.7 item 15; item 81; J-A81.72)". §11.4: "The port refuses a dossier whose population lies below 1 500 with `E_RUNG_UNAVAILABLE`". |
| 82 | §9.1, §9.6 | PRESENT | §9.1: "a quarter the dossier claims carries its claimed name like any assigned name (§7.7 item 16, item 82) — S13a's naming, read here, never a second rule". §9.6: "a protected name, re-matched only past the identity hysteresis". |
| 85 | §11.1 (b), (c); §11.3 (d)–(f) | PRESENT | §11.1: "**Inert exports (item 85 (c); J-A85.81)**" and "**Display names (item 85 (b))**". §11.3: "`re` on every reply", "the message's source window checked", "queued and delivered in order", "**SettlementForge's configuration** is the module in an iframe on its own origin", and Roles "for SettlementForge by the audience table of the port's host glue". |
| 86 | §11.4 | PRESENT | "What a host's data the module never reads is §7.7 item 1's list (item 86), and the port's adapter reports every key it dropped". |
| 87 | §11.4 | PRESENT | "the port's report names the earlier absorbed state the dossier now equals, `state_matches_absorbed` (§7.7 item 5; item 87)". |
| 88 | §8.2 | PRESENT | "**Conditions (item 88; staged):** a `ConditionOverlay` (§2.7) is drawn as a settlement-wide thematic row … schema-complete and empty in the base". |
| 101 | §8.2 `live.ghost`, §9.1, §9.3, §9.4, §9.5, §11.1, §11.2, §12.6 | PARTIAL (VRC-01; VRC-16) | Present: `live.ghost` ("the pending dry run's preview … never a model change; R1, R3, R14"); `RegionGroup` and `region` labels; the leader switch "`labels.leaders: 'always'`"; §9.5's handles, snap, count badge and underlay; §11.1's skeleton row and *Authorship and tiers*; §11.2's `preview`, `why` and the clerk paragraph; §12.6's "**Previews and the authoring toolkit (item 101)**". The gaps: the `why` and `preview` knowledge rule (VRC-01), and the region priority contradicting §9.2's greedy (VRC-16). |

Every rendering J row (J-A53.81 … J-A101.84, 30 rows) has one index row and one Part A entry. J-A68.81 carries the
default-shadow reading to the owner through §0.2's row 68 and the summary (l. 112–116). That is faithful to the owner's
"a daytime view is the default. the global light is the cursor". The item's own reading, the ink default without cast
shadows, is recorded as the vetoable alternative.

## 3 Checks

**SINGLE-SOURCE.** Each item's mechanism is stated at its home, and the other sections of the part point there. For
example:
* §8.2 → §8.4 for the light pass's slot;
* §8.1 item 7 and §8.5 → §9.2 for concealed parts;
* §12.8 → §8.8 for the canvas need.

II.7.3 and II.7.5 point to §8.4 for the shafts and do not restate the intensity law. There is one duplicate:
* §8.4's K06 bullet restates item 54's ratios and provenance, which §8.2's symbolisation row holds (VRC-10). The route's
  referencing text for §8.4 had no numbers.

The census rows' restated bars (palette targets, lighting) are checks and are left alone.

**STALE.** None of the route's old rules survive in the part. The part has:
* no ground-only projection as the lit model (now rung 3's only);
* no "no shadow-resolution setting" (now rung 3's only);
* no "WebGL2 … only a fallback compositor" (restated);
* no dd2vtt lights "from the module only";
* no binary wealth, no lots as buildings, no single market, no map writing the dossier, and no proprietary licence
  default.

Two stale sentences are left: §12.2's "routed or clamped" (VRC-20), and, outside the part, the summary's "the optional
shadows" (VRC-23).

**CROSS-PART.** Every cross-part note addressed to the rendering part is reflected. They are:
* E2 7 — §8.4's ladder and CPU reference are what F-LIGHT, §6.5 (3)/(9) and §7.8 read;
* E1 4 — §11.4 points to §7.7 item 1; §9.5's tier word; §11.1's `bearingDeg`; the tier marker;
* K 5 — §8.10's annulus law; depth bands; per-band exports;
* M 6 — `LightSource`, the view keys, `ConditionOverlay`, the concealed flags, the underlay and `factTier`;
* D 5 — §9.2's concealed rows, §8.4's layer and shafts, §8.2's rows, and 58 (d) and (e);
* T 5 — stage rows, the stage glyph, `heightsAt`, lights unlit before FINISHED, the drawn week and the host's week;
* S1 3 and S2 2 (b) – (f).

S2's 2 (c) asked for "the reader's queries filtered by the caller's knowledge key". That is met for the listed kinds but
not for `why` or `preview` (VRC-01).

Open conflicts with other parts:
* §4.7's `LightRule` has no `sizeCm` or `colour` (VRC-21). The assembler already confirmed it open.
* The flicker phase that §4.7 (4) and §2.7 store contradicts §8.4 (f) and J-A68.61 (VRC-22).
* §13.4's full-precision fallback has no home in §8.4 or §8.8 (VRC-08).
* §2.7's `LightSource.colour` says "which a style's light roles may shift (§8.2)", and §8.2 states no such rule
  (VRC-24).
* §4.1's S12c has no budget row in §12.4 (VRC-13).

The pointers into §7.7 from the part were checked against §7.7's numbering: dossier contract items 1, 5, 6 and 10–16, and
layer 2 for *North first*. All resolve to the stated rule.

**DEFERRAL-WORDING.** §8.4 (h) says "its P-id pending" three times, and J-A68.86 says "to be appended … before a cell
cites them" (VRC-15). P22–P24 are not in `research/findings/code-impact.md` §(d). There is no "TBD", "open" or "later"
used as a deferral. The two uses of "later" in §11.4 state the owner's Q2 ruling (J86), and "PLAUSIBLE until M…" is an
evidence grade with its measuring milestone.

**BROKEN-REFERENCE.**
* `amendments-b/refs.py` over the design finds 141 heading keys, 35 D ids, 701 J ids (upper-case grammar) and 2 broken.
  The 2 are the pre-existing external "`os-geometry.md` §2.1.4" and "RFC 7946 §3.1.6".
* Every J id cited in the part (124 distinct) has an index row.
* §8.4 (c), (d), (f), (g) and (h), §8.5 (2), §4.11's *Which week is drawn* and *Works* step 7 all exist.
* §8.4 (g) names "today's `ShadowPass(layer, sun)`", an interface only the archive declared. It is folded into VRC-17.

**NEW-PROBLEM.** VRC-02 – VRC-07, VRC-09, VRC-11 – VRC-14, VRC-16, VRC-17 and VRC-19 (§4).

## 4 Issues (each with its owning part and the exact required change)

| id | sev. | kind | owner | item | claim | required change |
|---|---|---|---|---|---|---|
| VRC-01 | major | owner-fidelity | rendering | 63 (c), 101 (d) | §11.2's *Knowledge* filters "`query` answers of every kind — `gazetteer`, `people`, `whereIs`, `relations`, `hit`, `inView`" and exempts `fates` and `confirm` only for editing roles. The new `why` query ("the rule, its inputs and the alternatives it weighed, from provenance and §2.8's derivation records") is not in that list and has no rule for a withheld input. A front is placed by its true function's relation rows (§4.7 S10b; item 63 (b)), so its `why` names the concealed purpose through rules, inputs and alternative sites. `preview` returns fates, renames and shape unfiltered, and nothing restricts it to editing roles. The clerk paragraph's "reads and says only what its viewer's key admits" is an assertion with no mechanism. | In §11.2's *Knowledge*, add `why` to the filtered kinds: "a `why` answer is given under the caller's key — a place or purpose the key does not admit is named by address only, with `withheld: true`; a front's `why` is answered from the front's own rows (§4.7 S10b), never from its concealed use's relation rows, inputs or alternative sites; a view-less `why` admits as at the city band". Add: "`preview` is an editing role's call, as `edit` is; a viewer's `preview` is refused with `role`". §9.2's clerk sentence points there. |
| VRC-02 | minor | new-problem | rendering | 68 | §8.3's row "lighting, one spot lit from every side" asks that "the summed visibility-weighted term ≥ 0.95 of the unoccluded sum" at every ground pixel within the lights' radius. Under §8.4 (c)'s own point-light term, a pixel beside the caster is blocked from one or two of the four lights. The worst ratio is 0.60–0.64, so the bar cannot pass. CONFIRMED: `docs/validation/bench/amendc_verify_rendering_r0_spot.out`, three fixtures, 148–300 samples below 0.95 each. | Pass cell: "at every ground pixel within the lights' radius outside the caster the summed visibility-weighted term ≥ 0.5 of the unoccluded sum — every pixel reached by at least two of the four lights (receipt `amendc_verify_rendering_r0_spot.out`: worst 0.60) — so no dark shadow; each light's own term alone shows the caster's shadow away from it". |
| VRC-03 | minor | new-problem | rendering | 68 | §8.3's row "lighting, the cursor sun" has two errors. (i) It puts "every caster's shadow tip at d · h ÷ (H − h) from the sun's ground point", but §8.4 (d) puts the tip d · h ÷ (H − h) *beyond the caster*, which is d · H ÷ (H − h) from G. (ii) Its bar "at `sunHeight` 64 the shadow bearings of any two casters within 2°" contradicts §8.4 (d)'s G = V + 64u: with the pointer near the centre, the bearings spread up to 25.8°. Only 52 of 200 pointer positions meet 2°. CONFIRMED: `amendc_verify_rendering_r0_sunbear.out`. | Pass cell: "every caster's shadow tip at d · h ÷ (H − h) beyond the caster (d · H ÷ (H − h) from the sun's ground point G) within 1 px; at `sunHeight` 1, 4 and 64 the bearing spread of any two casters ≤ 2 · asin(D ÷ \|G − V\|) + 0.1° — the angle the view subtends from G — and falling as `sunHeight` rises". |
| VRC-04 | minor | new-problem | rendering | 68, 69 | §8.4 (c) sets "`E_key` by day … E_g · (a + sin 45°) — so open level ground shows exactly its albedo". But the bracket adds β · Spill, with Spill "the direct sum blurred", which on open level ground equals the direct term. That ground therefore reads (1 + β · sin 45° ÷ (a + sin 45°)) × its albedo: ≈ +5.3 % linear in `ink`, +6.8 % in `lit`, +6.0 % in `hatched`. The stated shadow shares (≈ 0.65 / 0.55) do not follow, and item 69's paper target on the lit default map shifts (≈ 235 → ≈ 240 luma). CONFIRMED: arithmetic on (c)'s terms. | Define the spill as bounce only: "`Spill` = max(0, B(D) − D), D the pixel's direct sum and B its blur over `bounce.radiusM` (three box passes), weighted by `bounce.share`". Uniform open ground then takes no spill, and E_key = E_g · (a + sin 45°) holds exactly. The alternative: keep the spill, set E_key = E_g · (a + (1 + β) · sin 45°), and restate the shares (≈ 0.61 / 0.51), §8.2's *Light by family* and J-A68.81's two-thirds. |
| VRC-05 | minor | new-problem | rendering | 68 | The order of the post operations and the light pass is stated three ways. §8.2 applies them "once per tile after its marks, by Canvas2D in the tile worker" (before the pass). §8.9's GPU "runs §8.4's global-light term … and then the post operations" (after it). The CPU-reference path (§8.8's print, §8.9 (3)) states no order. Under `sepia`, `greyscale` or `tint` the GPU view and the CPU-reference export differ, and coloured lights re-colour a greyscale base. | §8.4 (f) gains: "On rungs 1–2 and in every lit export and still, the post operations run after the light pass — on the GPU for the view, after the CPU reference pass for an export — and the tile worker leaves them off the base". §8.2's *Post operations* points to it, and §8.8's print paragraph lists them after the light pass. |
| VRC-06 | minor | new-problem | rendering | 68 | The light map is keyed (§8.4 (f), §8.8) by "(tile, stop, tile DPR, style version, the revisions of the `light` marks reaching the tile, the drawn week, the drawn hour, the `light` key)". Its visibility marches "the surface of the tile dilated by that radius", whose content also follows the base key's view switches: model-layer toggles (an island's slab), `plotsOnly`, `storey`, `depthBand`, and the knowledge key while concealed marks draw. Toggling one reuses a light map with the old occlusion, because dirty boxes cover model edits only. | §8.4 (f) and §8.8's cache bullet: "a light map is keyed by its tile's surface key — §8.8's base key, over the tiles its lights' radius reaches — plus the revisions of the `light` marks reaching the tile, the drawn week, the drawn hour and the `light` key". |
| VRC-07 | minor | new-problem | rendering | 68 | §8.4 (f) says the light pass is "one function with two implementations", but its march has three sample rules in three places and none in §8.4 (c): GPU "≤ 48 march samples per pixel" (§12.5), CPU reference "≤ 32 samples" (§12.7), and the bake "≤ 24" with "a bake that misses halves its march-sample cap (24 → 12)" (§12.7), a fallback not stated to be global. §13.4's ≤ 2/255 tolerance then compares different samplings, and a per-tier bake fallback would change the CPU reference by device. | §8.4 (c) states the march once — its sample count and step law per source kind (global light, point light, bake), a function of the source and the pixel only — used by the CPU reference and the GPU pass alike. §12.5 and §12.7 cite it. The bake's fallback becomes either a declared view shift applied on every host (§13.3), like the export's half-resolution fallback, or a GPU-view-only change that never alters the CPU reference's bake. |
| VRC-08 | minor | conflict | rendering | 68 | §13.4's fallback — "a tier whose GPU pass misses runs the pass at full float precision with the march step halved …; still missing, that tier draws rung 3" — names a mechanism the home lacks. §8.4 (g) changes rung only on frame time or a lost context. §8.8's surface layer is the byte encoding ("4 B per pixel … the octahedral normal in two bytes, the height … in one byte"), and the full-precision surface is not counted in the 4.25P + 7 MB need. | §8.4 (g) gains: "a tier whose GPU pass misses §13.4's tolerance transfers the surface at full precision (float32 height and octahedral normal) with the march step halved; still missing, rung 3". §8.8 counts that surface (3 MB instead of 1 MB per position at 512², the DPR stepping down, else rung 3), and §13.4's fallback points to §8.4 (g). |
| VRC-09 | minor | conflict | rendering | 68 | The sun's mode is held twice with no precedence: in the sheet's `StyleSheet.light.sun.mode` (`SunSpec.mode`, "the default", §8.4 (d)) and in the per-viewer key `sunMode` (§2.9, default `'cursor'` where a pointer exists). The `FTG` preset needs a fixed or path sun whatever the viewer's key says. §8.2's `night` family is "the `ink` family with the view key `light` at `night` by default (§8.4)", a sheet setting a per-viewer key that §8.4 does not define. | §8.4 (d) states once: "the sheet's `SunSpec.mode` is the family's default and the modes it admits (a parity preset admits only its own); the per-viewer `sunMode` chooses among the admitted modes, defaulting to the sheet's; a `cursor` sun with no pointer draws `fixed`". Either add "a sheet may set the `light` key's default for a viewer who has not set it (`LightingSpec.defaultLight`: `night` in the `night` preset)", or reduce §8.2's `night` row to its `@night` roles. |
| VRC-10 | minor | duplicate | rendering | 54 | §8.4's K06 bullet restates item 54's mechanism and provenance: "house 1, landmark (keep, temple, hall) 2, farm building 0.6 of the sheet's base offset (§8.2's symbolisation row; provenance `ref:MFCG 12710731 raise ratios (code)`, P15; item 54)". §8.2's symbolisation row and `raised.ratio` hold these, and the route's referencing text for §8.4 had no numbers. | §8.4: "swept by an offset read from a class row (§8.2's symbolisation row; item 54) — ON by default in `ink`; not a shadow and not sun-dependent, so …". |
| VRC-11 | minor | partial | rendering | 67 (f) | §4.11's `WorksStage` includes `before`, `finished`, `abandoned`, `roofless`, `collapsed` and `overgrown` (a decay Works' ruin sub-stages). §8.2's `states` table keys a Works target's row by its `worksStage` ("which wins over the ladder state while the Works runs"), but it has rows only for Works `decaying`, the demolition and build stages, charred and refit. For the rest it says "`abandoned`, `decayed`, `ruined`, `cleared` and `reused` are the rows above", which are ladder states, not stages. `roofless`, `collapsed` and `overgrown` resolve no row, so §8.3's "every (kind, stage) resolves one `states` row" fails, and item 67 (f)'s overgrown mound has no drawing. | §8.2's `states` gains a row: "building \| Works `abandoned` / `roofless` / `collapsed` / `overgrown` (a decay Works' ruin sub-stages, item 67 (f); §4.11) \| all \| override: the `abandoned` row / the `decayed` row / replace: the `ruin` program's wall stubs and rubble / replace: `trace('footprint')` over a `green` mound stipple, no mass". Add the sentence: "`before` draws the target's prior state and `finished` its own programs — the stages §8.3's census exempts as undeclined". |
| VRC-12 | minor | conflict | rendering | 67 | §4.11 (9) says "Every drawing, export and reader draws the document's current week … unless the per-viewer view key `week` … names another". §11.1 is not consistent with it. The 3-D row says "a building under a Works at the document's week" and the JSON row "each `Works` with its stage at the document's week", while GeoJSON says "at the export's drawn week" and dd2vtt says "lit at the export's drawn week". CityJSON's `Building` omits stage heights, although §8.4's *Heights* bullet says "the surface layer, the shadows, glTF and CityJSON agree". | §11.1: the 3-D row "a building under a Works at the export's drawn week (§4.11's *Which week is drawn*) extruded at its stage heights"; the JSON row "each `Works` with its stage at the export's drawn week"; the CityJSON row adds "a building under a Works at its stage heights at the export's drawn week (§4.11)". |
| VRC-13 | minor | partial | rendering | 72, 68, 70 | §4.1's stage graph puts "S12c Character (town-wide, on the generation worker after the merge … before S13a)" on the one-click critical path, but §12.4's CITY split, whose premise is "each stage's mechanism is its stage section's (§4); this table holds the work and the time each budget assumes", has no S12c row. Its pooled S10–S11 row states no work for S11's light placement (§4.7 *Light sources*: a bisection-solved spacing per lit way, ≈ 8 000 lights at CITY by §8.1 item 6) or for the cluster packing (§4.7, item 70). The critical path (≈ 255 ms p50) is unchanged. | §12.4 gains a row "S12c character (item 72) \| §4.5 (2) \| per district, significance-weighted sums over its ≈ 5 500 placed plots at CITY, the trade-position and relation terms; draw-free \| ⟨p50⟩ (PLAUSIBLE until M2b)". The pooled row's rates add the light placement and the cluster packing (PLAUSIBLE), and the critical path is re-summed, or stated to be within its rounding with the reason. |
| VRC-14 | minor | new-problem | rendering | 68 | §12.8's *Canvases during a raster export* uses the unlit need, "The view's need is §8.8's (3P + 7 MB …)", and claims "the low-end 1 366 × 768 view (43 + 15 ≤ 72 MB) hold[s] both". With the light pass on (4.25P + 7 MB, §8.8; lit at DPR 1, P = 12, 58 MB) the need is 58 + 15 = 73 MB > 72 MB, so the coarser-stop set must drop. The generic rule covers it, but the worked cases do not say so. | "The view's need is §8.8's (3P + 7 MB, or 4.25P + 7 MB with the light pass on rungs 1–2; …)". The worked list adds: "lit, the low-end 1 366 × 768 view (58 + 15 > 72 MB) drops its coarser-stop set (46 + 15 = 61 MB); the mid tier's lit reference view (DPR 1.5, 109 + 15 = 124 ≤ 128 MB) holds both". |
| VRC-15 | minor | deferral-wording | rendering | 68 (g) | §8.4 (h) cites the FTG, NG 1.2.2 and Fantasy Manor light cells "from its code reading's sections … its P-id pending" (three times), and J-A68.86 says their P-ids are "to be appended … before a cell cites them". `research/findings/code-impact.md` §(d) holds P14–P21 only, and gate (c) cites code-read provenance by P-id only. | The manager appends P22 (the FTG client's light model), P23 (NG 1.2.2's prism shadow and night glow) and P24 (Fantasy Manor build 890's facet shading and swept shadow) to `code-impact.md` §(d), with route §C.3 (3)'s texts. §8.4 (h) then replaces each "from its code reading's sections …, its P-id pending" with "P22", "P23" and "P24", and J-A68.86's clause becomes "their P-ids P22–P24". |
| VRC-16 | minor | new-problem | rendering | 101 (c) T11 | §9.4 says a region label is "a candidate at the city band with the highest priority of §9.2's order … and the city cut's labels inside it are obstacles to it like any placed label". §9.2's greedy has a candidate avoid only "placed higher candidate[s], … obstacle[s] and … fixed pin[s]", so the lower city-cut labels are decided after it and cannot be its obstacles. The same "members … are obstacles to it" pattern is pre-existing in rung (5) (J-R27) and should be checked with it. | §9.4: "…with the highest priority of §9.2's order, so the city cut's labels inside it, decided after it, avoid it like any lower candidate (taking their next alternate or rung) — a region that cannot fit its floor …". The alternative is to give regions a priority below the quarter and district labels, so that those are placed first and become its obstacles. |
| VRC-17 | minor | new-problem | rendering | 68 | The amendments added history narration, which the consistency canon keeps in the rationale file: §8.4 (g) "rung 3 — the **vector pass**, today's `ShadowPass(layer, sun)`" (an interface only the archive declared), §8.4 (f) "into the tile's one bitmap as before", §8.5 "as the `ink` look has always drawn it", and §8.9 "stays the **pre-decided fallback compositor** it was". | Present tense and the live names: "rung 3 — the **vector pass**: the projected-shadow pass (§8.2's `shadowPass` program, `drop` or `prism` by `vector.projected`, `vector.penumbraPx`)"; "into the tile's one bitmap (J-R21)"; "with the raised under-copy (K06)"; "the WebGL2 compositor is the **pre-decided fallback compositor**: measured at M2b …". |
| VRC-18 | minor | partial | rendering | 58 (d) | Gate (b): the pass made §8.2's layer-order note a code-read statement — "NG's (greens → roads → shadows → buildings → props → large-tree pins under buildings, block trees above them → title; item 58 (d))" — without the build. | "NG 1.2.2's (…)". |
| VRC-19 | minor | conflict | rendering | 73 | §11.4 says that for a dossier "the host passes the whole dossier and … the optional fields of `HostContext` … and nothing else", and the port produces doors (1) and (2). The next clause says "SettlementForge uses doors (1)–(3) through the port", but door (3) is tables, presets and styles as `editTable`, `editPreset` and `setStyle` events, which the port does not produce. | "SettlementForge's map comes through doors (1) and (2), which the port produces; doors (3) and (4) stay open to it as to any host — logged table, preset and style events, and a registered provider". |
| VRC-20 | minor | stale | rendering | 81 | §12.2: "Requests outside the ladder are routed or clamped by §1.1's `LadderRouter`". A dossier below 1 500 is now refused by the port (`E_RUNG_UNAVAILABLE`; §7.7 item 15), and the clamp serves only blueprint requests without a dossier. | "Requests outside the ladder are routed or clamped by §1.1's `LadderRouter`, and a dossier below the floor is refused by the port (§7.7 item 15)". |
| VRC-21 | minor | conflict | pipeline | 68 | §2.7's `LightSource.sizeCm` is "written at placement from its kind's light-table row (§4.7)", and its `colour` is "its row's". §8.1's `LightTable` reads `sizeCm` for the penumbra. §4.7's `LightRule` has neither field. This is assemble-r0 §9 finding 2 and seat R's note 4, still open. | §4.7's `LightRule` gains `sizeCm: Cm /* the flame's or orb's own radius: §8.4's penumbra — torch 5, lantern 8, lamp post 10, brazier 25, magical orb 30 (own) */` and `colour: string /* sRGB: fire warm, magic cool (own rows) */`. |
| VRC-22 | minor | conflict | pipeline | 68 | §4.7 (4) says "two things only are drawn — a door lantern's side of its door and a flicker phase — both on the concern `pin.light`", and §2.7 stores `LightSource.flicker.phase` "drawn on pin.light at placement". J-A68.61 (§6.1) and §8.4 (f) make flicker "never a stream, a pure function of its render key and the view's time", and §8.1's `LightTable` has no phase column. The stored phase is read by no one and contradicts the ruling. | §4.7 (4): "one thing only is drawn — a door lantern's side of its door — on `pin.light`; a fire light flickers by §8.4 (f)'s function of its render key". §2.7 (model) replaces `flicker?: { phase … }` with `flicker: boolean`, and J-A68.21's "an optional flicker phase" becomes "a flicker flag". |
| VRC-23 | minor | stale | scope | 68 | The one-page summary (l. 46) says every building's heights feed "the optional shadows and the 3-D export". Cast shadows are on by default in every shipped family (J-A68.81; §1.2 l. 355; §8.4). | "so the shadows and the 3-D export read real heights". |
| VRC-24 | minor | conflict | model | 68 | §2.7's `LightSource.colour` comment says "fire warm, magic cool — its row's, which a style's light roles may shift (§8.2)". §8.2's `light` and `lights` roles are only the vector rung's glyph and glow tones, and no rule lets a style change the light pass's source colour (§8.4 (c): "`c` gives each source's colour"). | §2.7: "… its row's; the vector rung's glyph and glow take §8.2's `light` and `lights` roles" (the light pass uses the record's colour). Alternatively, §8.2 states that rule. |

## 5 Held parts (gate (a)) — none written in the part

* **Item 68 (g), "MFCG draws no cast shadows"** (an absence inferred from the full read of MFCG 12710731): absent. §8.4
  (h) states the `MFCG` preset's behaviour as ours — "the raised under-copy only (K06, above), no cast shadow, no night
  view and no light — our preset's behaviour, with no claim about the reference's (J-A68.86)". §8.2's
  "The `MFCG` preset draws no cast shadow and no light" is the preset, not the reference.
* **Item 68 (g), not in the item — VG 1.6.9's cast-shadow and night-light layers:** nothing written. The part names
  VG 1.6.9 only in §8.10's sampler provenance (P14).
* **Item 68 (g) — Dwellings' shading and ambient-occlusion gradients:** nothing written. Room lights stay J-A28.32's.
* Released and applied: item 59's timing (§12.7, labelled). Item 58 (f) is II.2's (seat D). Item 49's rejected deletion
  and item 37's release are not in this part.

## 6 Document checks and receipts

* `python3 docs/validation/bench/doc_checks.py --sections "8,9,11,12"` (allow file `docs/validation/doc-checks-allow.tsv`),
  on the live design `7f4c0e25…`, corpus 9 626 JSON files / 916 623 C3 3-grams / 478 C4 lists: **exit 0**. The counts
  were C1 5 / 0, C2 0 / 0, C3 154 / 0, C4 1 / 0, S1 0 / 0 and S2 0 / 0 (hits / unreviewed). No allow row was added,
  because this lane edits no design text.
* `docs/validation/amendments-b/refs.py docs/ARCHITECTURE.md` finds 2 broken references, the same pre-existing
  externals.
* `docs/validation/bench/amendc_rendering_palette.py` was re-run, and its output is byte-identical to the stored `.out`.
* New receipts, our own code and stdlib only:
  * `docs/validation/bench/amendc_verify_rendering_r0_spot.{py,out}` (VRC-02);
  * `docs/validation/bench/amendc_verify_rendering_r0_sunbear.{py,out}` (VRC-03).

## 7 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed, or quoted from the live text):
* every PRESENT or PARTIAL verdict, by quotation;
* every quoted conflict: VRC-01, VRC-05, VRC-06, VRC-08 – VRC-12, VRC-15 – VRC-24;
* the arithmetic of VRC-02 and VRC-03, by executed receipt;
* the arithmetic of VRC-04 and VRC-14, by recomputation from the text's own terms;
* the J-row and Part A counts, the resolver, the doc checks and the palette re-run.

**PLAUSIBLE** (for the repairers to confirm):
* the mechanisms the required changes choose: VRC-01's `why` rule, VRC-04's bounce-only spill, VRC-07's single march
  rule, VRC-08's 3 MB surface, VRC-09's precedence and VRC-13's rows;
* the severity reading of VRC-01 as major, taken because item 63 (c) names the clerk and the design has no filter for
  its oracle.
