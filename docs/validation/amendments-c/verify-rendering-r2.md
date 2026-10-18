# verify-rendering-r2 — lane amendments-c/verify-rendering-r2 (the RENDERING part after repair round 2)

> PENDING FABLE REVIEW — Opus-produced (amendments-c/verify-rendering-r2).

> PROGRESS (kill-safe ledger; a seat that continues this lane reads it first):
> STEP 0 inputs read (verify-rendering-r1, repair-rendering-r2 report and blocks, assemble-r2, cross-part notes of the six r2 repair reports, sibling r2 verifiers): done
> STEP 1 repaired subsections read whole (§8.1–§8.4, §8.8, §8.9, §9.2, §11.1–§11.4, §12.2, §12.5, §12.7, §12.8) + word diff vs pre-r2 archive: done (scratch vr2c/wd89.txt, wd1112.txt)
> STEP 2 r1 issues re-checked (VRC1-01..18, V-MC1-09 = VD1-11, VS1-03): done — all 21 ids FIXED
> STEP 3 per-item verdicts: done (all PRESENT; 68 with new defects)
> STEP 4 checks and new issues: done (7 issues: 2 major, 5 minor; all rendering)
> STEP 5 doc_checks, refs, receipts: done (doc_checks 8,9,11,12 exit 0; refs 2 external; repair receipt re-run identical; new receipts amendc_verify_rendering_r2_diag and _rings)
> STEP 6 queue row + LANDED: done

Design under review: docs/ARCHITECTURE.md sha256 3daa0b0731b8c76fce91f4c92c044c724a37b3c177bcd4e9bdb4308349b4a09c;
rationale sha256 bfa20419ca4dd6e5d407c78688802e10fe1b4a0639a3b06bf38f91c80501b98a (assemble-r2's installed files).
Scratch: scratchpad c0d81c15…/scratchpad/vr2c/.

## Outcome

Repair round 2 fixed all 21 issue ids routed to the rendering part. These are verify-rendering-r1's VRC1-01 to VRC1-18
(VRC1-07 was scope's) and the sibling rows V-MC1-09 = VD1-11 (the same issue as VRC1-10) and VS1-03 (= VRC1-09). Each
was checked against the live text. Every routed item is PRESENT and no held part is written. The document checks exit 0
with r1's counts. All 135 J ids the part cites resolve, and the resolver finds only the two pre-existing external
references. The repair's traversal receipt re-runs byte-identical.

**7 issues are new: 2 major and 5 minor, all owned by rendering.** All of them sit in the machinery that round 2 built
for item 68's shadow window.

* **VRC2-01 (major): the rings do not scale with relief.** The global light's rings of tile positions grow with R²,
  and R = (Z − z) ÷ (m − σ) counts terrain, which §4.2 S1 says can be "a 3 000 m relief". At the 1:500 stop under a 15°
  path sun:
  * 300 m of relief gives 5 440 ring positions per view and 11 448 per export tile;
  * 1 000 m gives 53 788 per view.

  Every one of these positions is a raster job and a transfer that no budget counts. The claims "≤ 3 MB whatever the
  window" and "≈ 21 MB whatever R" fail on steep sites under a low sun (5.4 MB and 48 MB).
* **VRC2-03 (major): the parity fallback cannot converge.** Under §8.4 (g)'s full-precision fallback, the pyramids and
  the first ring's heights stay one byte. Far casters and casters just outside the view are therefore resolved from
  heights rounded up by as much as one step (≈ 0.67 m at 45 m), while the CPU reference reads float32. A 45 m tower's
  shadow tip then differs by about 10 px, and §13.4's parity bar (≤ 2 levels at the 99.9th percentile per tile) cannot
  hold. As written, every tier would end on rung 3.

The minor issues are:
* VRC2-02: the ring positions' source band and cache key;
* VRC2-04: under a diagonal sun the floor lengthens a shadow by up to √2 × its cell, against "at most that side";
* VRC2-05: the Z that sets a lit export's transient-list dilation is taken from the list it dilates;
* VRC2-06: the hand lantern has no CPU reference and no bar;
* VRC2-07: the bridge message `preview { events, view? }` leaves `view` untyped.

**Evidence grades.**
* **CONFIRMED:** every FIXED verdict and every quote from the live text. VRC2-04 rests on an executed receipt
  (`amendc_verify_rendering_r2_diag.out`). VRC2-01's counts and memory rest on another executed receipt
  (`amendc_verify_rendering_r2_rings.out`), recomputed from the text's own terms. VRC2-03's height step and tip offset
  are recomputed from §8.8's byte scale.
* **PLAUSIBLE:**
  * that VRC2-03's offset fails §13.4 on the golden views (≈ 900 px of a tile against a 262-px budget);
  * the time cost of VRC2-01's ring counts;
  * the mechanisms that the required changes choose.

## 1 Inputs read

* **This lane's earlier report**, `verify-rendering-r1.md`: its 18 issues, the item verdicts and the check sections.
* **The repair round.** `repair-rendering-r2-report.md` and its block file `repair-r2-rendering.md` (17 blocks); the
  receipt `docs/validation/bench/amendc_repair_rendering_r2_traversal.{py,out}`.
* **The assembly.** `assemble-r2.md`: 47 changed headings and five hand-offs. Hand-offs 2–4 touch this part's J rows and
  II.7.3.
* **Cross-part notes addressed to rendering** in the six r2 repair reports. There are none that require a change here:
  * model r2 names item 59's timing as "seat R's" and leaves it unchanged;
  * pipeline r2's VPR1-11 row points at §8.4's derived window lights, which §8.4 (b) holds;
  * scope r2's combined-run note ("C3 171/4 in rendering r2's in-progress index rows") is resolved in the installed text,
    where doc_checks exits 0.
* **The sibling r2 verifiers**, which landed during this lane: model V-MC2-01/02, determinism VD2-01..05, pipeline, kernel
  and scope VS2-01..05.
  * No sibling raises an issue owned by rendering. They confirm V-MC1-09 = VD1-11 = VRC1-10 and VS1-03 as FIXED.
  * Determinism's VD2-03 hand-off rewrites one pointer in this part: §11.1 l. 11910, "(§7.7 item 2)" → "(§7.7 layer 2)".
    This is concurred: the realm partners' bearings are layer 2's.
* **The part, from the live design, read whole:** §8.1 (l. 9528–9660), §8.2's changed rows and paragraphs
  (l. 9690–9700, 9922–9929, 9961–10007), §8.3 (l. 10107–10185), §8.4 (l. 10187–10458), §8.8 and §8.9
  (l. 10615–10864), §11.1–§11.4 (l. 11850–12258), §12.2 (l. 12320–12344), §12.5 (l. 12483–12559), §12.7
  (l. 12624–12723) and §12.8 (l. 12725–12820). §9.2's changed sentence was also read (l. 11134–11137).
* **The subsections these cite or that cite them:**
  * §2.7's `Works` (l. 1854);
  * §4.2 S1 (1)'s relief (l. 3884–3889);
  * §4.11's `WorksRow` (l. 6731);
  * §6.5 (8) (l. 7722–7727);
  * §13.4's light-pass bar (l. 13713–13721);
  * §14's `ContentProvider` (l. 14283);
  * II.7.3, II.7.5 and II.7.6's shaft sentences (l. 15707, 15940, 16061);
  * the index rows and Part A entries of J-A68.83, J-A68.85, J-A68.89, J-A68.90, J-A63.82, J-A68.91, J-A68.92, J-A85.83,
    J-A101.86, J-A67.83, J-A68.86 and J-A20.82.
* **A word-level diff** of §8–§9 and §11–§12 against `docs/archive/ARCHITECTURE-pre-amendments-c-repair-r2-2026-09-28.md`
  (scratch `vr2c/wd89.txt`, `wd1112.txt`; 288 added runs), so every changed sentence was read in place.

## 2 The round-1 issues, re-checked on the live text (sha256 `3daa0b07…`)

| r1 id | owner | verdict | evidence (quoted from the live design) |
|---|---|---|---|
| VRC1-01 (major) | rendering | FIXED (VRC2-01, VRC2-02, VRC2-04 new) | §8.4 (c): "The ray runs to the **window** R … R = (Z − z) ÷ (m − σ_s), Z − z being the display list's `surfaceTopCm` (§8.1) less the pixel's elevation … The window is a world distance, so a shadow crosses every tile line at its similar-triangles length and never depends on the tile grid"; §8.8 "the **rings** of tile positions round them that the global light's window reaches"; §8.3's new row "long shadows across tile lines … identical at all four offsets"; receipt (1) re-run identical. |
| VRC1-02 | rendering | FIXED (VRC2-04 new) | §8.4 (c): "**The traversal** … read through the **max-height pyramid** … a cell whose bound cannot lower the minimum found so far is skipped whole … every caster the ray crosses is met, however narrow"; §8.3's "narrow casters" row; receipt (2): 1 run for 2, 6 and 12 m towers. |
| VRC1-03 (major) | rendering | FIXED | §8.1 item 7: "**A light draws only where its host draws** … a `light` mark carries its host mark's `concealed` and `knownTo` columns … taken by the light pass, the light-map bake, the vector rung's `glow` and every export's lights (§11.1) where their host draws"; §8.4 (b) points to it; §8.8's tile key and light-map key add "a mark drawn only for a key that admits it or a light whose host is either"; §11.1's GeoJSON, glTF, `.dd2vtt` and per-storey rows and *Knowledge* filter them; §8.3's "concealed parts at night and underground" row; II.7.3 (hand-off 4, l. 15707) "a secret one lit only for a key under which it draws (§8.1 item 7)". |
| VRC1-04 | rendering | FIXED | §8.4 (f): "a **cell operation** (`pixelate`, `dotScreen`) takes its cells on each tile's own grid from the tile's corner … every pixel weighted by 1 − its unlit coverage … puts that average into the cell's uncovered share alone (J-A68.91)"; §8.2 points to it. |
| VRC1-05 | rendering | FIXED | §11.1 SVG: "the colour-matrix post operations (§8.2) as one filter on a wrapper group `<g id="lit">` that holds every base layer group, `layer.shadow`, the glow sprites and `layer.light`, under the label groups"; §8.2 "one colour-matrix filter over its lit base — the wrapper group of §11.1's SVG row". |
| VRC1-06 | rendering | FIXED | §8.3 rows "which sun draws", "the sheet's default light", "post operations after the light" and "light-map keys" (l. 10173–10176). |
| VRC1-07 | scope | FIXED | T30-5: "a viewer's `preview` of any event returns `status: 'refused'`, `reason: 'role'`, with no fates, renames, counts or shape … an `editor`'s `preview` of the same event returns its dry run". |
| VRC1-08 | rendering | FIXED | §11.2: `type PreviewResult = \| { status: 'refused'; reason: 'role' } … \| { status: 'ok'\|'conflict'; actions?: …; fates: …; renames: …; counts: …; shape?: …; bent?: … }`. |
| VRC1-09 = VS1-03 | rendering | FIXED | §12.2: "a dossier outside the ladder — below 1 500 people, or above the 120 000 cap — is refused by the port instead (§7.7 item 15; §1.1; item 81; J-A81.01)"; §11.4: "and one above the 120 000 cap the same way, naming the cap (§1.1; J-A81.01)". |
| VRC1-10 = V-MC1-09 = VD1-11 | rendering | FIXED | 0 hits of "§2.8's marker" in the design and the rationale; §9.2 (l. 11134), §11.1 (JSON row, skeleton row, *Authorship and tiers*), §11.2 *Tiers* read "by §2.8's `factTier`"; the skeleton row "every event whose entities §2.8's `factTier` reads `declared`"; J-A20.82's row and Part A by hand-off 2. |
| VRC1-11 | rendering | FIXED | §11.2 `registerProvider(p: { id; version; moduleUrl }): Promise<{ status: 'ok' } \| { status: 'refused'; reason: 'nondeterministic'\|'origin' }>` with its call-table row; §11.3 "never code, so no message registers a content provider"; §11.4 door (4) "registered by `registerProvider` (§11.2) — the embedding page's own call or a script's"; consistent with §6.5 (8) and §14. The repair's deviation (no bridge message, by item 21 (d)) is accepted. |
| VRC1-12 | rendering | FIXED (VRC2-05 new) | §8.8 print: "each export tile over its own **window** … ≈ 21 MB … never a whole band's surface"; §12.8 "one export tile's window … released per tile"; §11.1 "A lit export's transient list covers its frame dilated by §8.4 (c)'s largest window and the largest light radius". |
| VRC1-13 | rendering | FIXED | §12.7: "a bake that misses resolves §8.4 (c)'s point-light traversal one pyramid level coarser" — no sample count restated. |
| VRC1-14 | rendering | FIXED | §8.2 row: "(a decay Works' ruin stages, item 67 (f); §4.11's *Works* (4))". |
| VRC1-15 | rendering | FIXED | §8.1 attrs `worksKind` and item 7 "its `worksKind` column from the running Works' kind"; §8.2 `StateRow.worksKind`, the `repair` row and "the one exception to one row per (kind, state)"; §8.3 Works census "a `repair` begun on a `collapsed` building among them". |
| VRC1-16 | rendering | FIXED | Rationale J-A68.86: "their builds and their P-ids P22–P24 (the readings' sections are `research/findings/code-impact.md` §(d)'s)" (hand-off 3). |
| VRC1-17 | rendering | FIXED (VRC2-06 new) | §8.4 (f): "Per frame the global light's term — and, underground with `handLantern` on, the hand lantern's, a point light by (c)'s law and traversal over the pixels within its radius (J-A68.92) — is evaluated on the GPU … an export or still, which has no pointer, draws no lantern"; §8.8, §8.9 and §12.5 (≤ 0.5 ms) follow. |
| VRC1-18 | rendering | FIXED (VRC2-07 new) | §11.3: host → PLAT "`preview { events, view? }` (item 101 (b): a clerk's proposal; J-A101.86)", PLAT → host "`preview.result { result }`", `re` on `preview.result`; §11.2 "a bridged host's clerk asks for it by §11.3's `preview` message". |

The repair's three evidence-based corrections of r1's proposed texts are accepted:
* **VRC1-01.** A world-distance window with pyramid-only rings replaces full-resolution rings, whose ≈ 96 MB is correctly
  derived.
* **VRC1-02.** A pyramid traversal replaces the interval samples. The receipt's (3) +82 px flare of the interval variant
  re-runs identically.
* **VRC1-11.** No bridge message is added, by item 21 (d).

## 3 Per-item verdicts (items this round touched are re-checked; the rest carry r1's verdict, `verify-rendering-r1.md` §3)

| item | where | r1 | r2 | evidence / what remains |
|---|---|---|---|---|
| 53 (home) | §8.10 | PRESENT | PRESENT (carried) | §8.10 not touched by the round. |
| 54 (home) | §8.2 symbolisation row; §8.4 K06 | PRESENT | PRESENT (carried) | K06 unchanged: "swept by an offset read from a class row (§8.2's symbolisation row; item 54)". |
| 55 (home) | §9.3; §9.2's memo | PRESENT | PRESENT (carried) | §9.3 unchanged; §9.2 changed only by the `factTier` wording. |
| 68 (home) | §8.4 (a)–(h) with §8.1, §8.2, §8.3, §8.8, §8.9, §11.1, §12.5, §12.7, §12.8 | PRESENT, with VRC1-01 – 06, 12, 13, 16, 17 | PRESENT, with VRC2-01 – VRC2-06 | The r1 defects are fixed (§2). The window, the traversal, the host rule for lights, the cell operations, the lantern and the export window are mechanisms with their fields (`DisplayList.surfaceTopCm`, `StateRow.worksKind`, `TileRasterOpts.fromLevel`), bars (§8.3's eight new rows) and budgets (§8.8's Q, §12.5, §12.8). The new defects are in the rings' scaling (VRC2-01, VRC2-02), in the full-precision fallback (VRC2-03), in the floor's bound (VRC2-04), in the export's Z (VRC2-05) and in the lantern's reference (VRC2-06). |
| 69 (home) | §8.2 palette targets | PRESENT | PRESENT (carried) | §8.2's palette rows unchanged by the round (word diff); r1's palette receipt re-run stands. |
| 59 (timing, released) | §12.7 | PRESENT | PRESENT (carried) | "A research-side restatement of the Fantasy Manor model (build 890, version 1.0.0), run as a test instrument …" unchanged, labelled. |
| 58 (d), (e) | §8.2, §8.3 | PRESENT | PRESENT (carried) | Unchanged. |
| 63 | §8.1 item 7, §8.5, §9.2, §11.1, §11.2 | PRESENT, with VRC1-03 | PRESENT | The lights of concealed parts now follow their hosts (§8.1 item 7; §11.1 *Knowledge* "nor the lights, glows and shafts those hosts carry"). |
| 64 | §8.2 `access` row, §9.2, §8.1 item 7 | PRESENT, with VRC1-03 | PRESENT | A secret access's shaft and lamp draw only for a key that admits it (§8.1 item 7; II.7.3 l. 15707). |
| 65 | §8.4 layers, §8.2, §9.1, §11.1 | PRESENT | PRESENT (carried) | Unchanged. |
| 67 | §8.1 item 7, §8.2, §8.3, §8.4, §8.5, §11.1, §11.3 | PRESENT, with VRC1-14, VRC1-15 | PRESENT | The repair overlay (`worksKind`) and its census bar. |
| 70, 72 | §8.2, §8.5 (2), §9.1, §9.4, §9.6, §11.1 | PRESENT | PRESENT (carried) | Unchanged. |
| 20 (h) | §9.1, §9.2, §11.1, §11.2, §11.4 | PRESENT, with VRC1-10 | PRESENT | Every tier statement reads `factTier`. |
| 73, 74, 75, 86, 87 | §11.4, §11.3, §11.2 | PRESENT, with VRC1-11 | PRESENT | Door (4) is `registerProvider`; SettlementForge uses doors (1)–(3). |
| 77, 82, 85, 88 | §11.1, §9.1, §9.6, §11.1 – §11.3, §8.2 | PRESENT | PRESENT | 85: J-A85.83 names the bridge rule; the rest carried. |
| 81 | §9.5, §11.4, §12.2 | PRESENT, with VRC1-09 | PRESENT | Both refusals (floor and cap) at §11.4 and §12.2. |
| 101 | §8.2 `live.ghost`, §9.1, §9.3–§9.5, §11.1, §11.2, §11.3, §12.6 | PRESENT, with VRC1-07, VRC1-08 | PRESENT, with VRC2-07 | `PreviewResult` a union; bridge `preview` / `preview.result`; T30-5 tests the refusal. |

**J rows.** The round's seven new ids — J-A68.90, J-A63.82, J-A68.91, J-A68.92, J-A85.83, J-A101.86 and J-A67.83 — each
have one index row (l. 17148–17154) and one Part A entry (rationale l. 772–778). The three restated ids (J-A68.83,
J-A68.85, J-A68.89) sit at their older rows' places, once each. Each Part A entry states the choice, the alternatives and
the reason. The entries were read whole.

## 4 Checks

**SINGLE-SOURCE.** Each repaired mechanism has one home, and the other places point to it:
* the window, the traversal and the floor: §8.4 (c);
* the pyramids, the rings and Q: §8.8, with §8.9's tables, §12.5 and §12.8 citing them;
* the host rule for lights: §8.1 item 7. §8.4 (b)'s one sentence, §11.1's rows and II.7.3 cite it;
* the cell operations: §8.4 (f), with §8.2 pointing to it;
* `registerProvider`: §11.2, cited by §11.3 and §11.4.

The pre-decided bake fallback is named in §12.7 ("one pyramid level coarser") and in §8.4 (c) ("one level more … once
§12.7's pre-decided bake fallback is taken"). r1 judged this pairing acceptable when it held the sample counts (VRC1-13's
required change kept both), so it is not raised again. **No duplicate.**

**STALE.** None of the route's old rules is back: no lots as buildings, no binary wealth, no single market, no map writing
the dossier, no proprietary default. There are 0 hits of "march" outside marching squares, 0 of "one-tile ring", 0 of
"N = 32 / N = 24", 0 of "43 MB" and 0 of "§2.8's marker" in the design. The rationale's J-A68.90 names the one-tile ring
only as the rejected alternative.

**CROSS-PART.** The round's hand-offs landed as the assembler reports:
* hand-off 2: J-A20.82's row and entry read `factTier`;
* hand-off 3: J-A68.86's clause names P22–P24;
* hand-off 4: II.7.3's shaft sentence;
* hand-off 5: §13.4's "the traversal unchanged".

§6.5 (8)'s double-run check agrees with `registerProvider`'s refusals, which determinism's r2 verifier also confirms.
T30-5 tests the preview refusal, as VRC1-07 required. No cross-part note addressed to rendering is left unreflected.
Determinism's VD2-03 hand-off touches §11.1 l. 11910 only as a scripted pointer fix, and this report concurs with it.

**DEFERRAL-WORDING.** None was added. Of the 288 added runs, none contains "TBD", "TODO", "later", "open" or "for now".
§11.4's "later" is the owner's Q2 ruling, carried from the earlier rounds.

**BROKEN-REFERENCE.**
* The resolver reports 141 headings, 35 D ids, 730 J ids and 2 broken references. The 2 are the pre-existing externals:
  `os-geometry.md` §2.1.4 and RFC 7946 §3.1.6.
* The part cites 135 J ids, all among the 733 index rows.
* Receipt paths resolve (`amendc_repair_rendering_r2_traversal.{py,out}`).

**NEW-PROBLEM.** VRC2-01 – VRC2-07 (§5). All are introduced by the round's mechanisms. One part of VRC2-02, the ring
positions' source band, extends a gap the r1 one-tile ring already had, and it grows with the round's many rings.

## 5 Issues (each with its owning part and the exact required change)

| id | sev. | kind | owner | item | claim | required change |
|---|---|---|---|---|---|---|
| VRC2-01 | major | new-problem | rendering | 68 | **The ring set is unbounded and scales with relief.** §8.8 holds and rasters one pyramid per tile position out to the global light's window R, "every further ring together ≤ 3 MB whatever the window", and a lit export computes each export tile over "the pyramids of the positions within the global light's window R round it … ≈ 21 MB whatever R". R = (Z − z) ÷ (m − σ) (§8.4 (c)), with Z − z the document's highest surface above the pixel, **terrain included**: terrain `field` marks write the surface (§8.4 (a)) and the pyramid (§8.8), and §4.2 S1 (1) says "a 3 000 m relief is ordinary". Recomputed from the text's own terms (`docs/validation/bench/amendc_verify_rendering_r2_rings.out`) at the 1:500 stop and DPR 2, for the reference view and 300-dpi export tiles: <br>• 300 m of relief under a 15° path sun: R 1.14 km, k 34 rings, **5 440 ring positions** per view and **11 448 per export tile**; <br>• 1 000 m: k 113, 53 788 positions per view, 124 608 per export tile; <br>• 3 000 m under a sun ≤ 7.1°: 5.44 MB of further rings (> 3) and a 48.3 MB export window (> 21). <br>Each position is a raster job ("the ring positions' pyramids, nearest ring first", §8.9), a transfer (§8.9's table) and, for an export, a recomputation per export tile. No budget counts them. §12.5 asserts "§12.7's bake and the rings inside it" of the settle bound, and §12.7 costs only the visible tiles. The default cursor sun at `sunHeight` 1 stays bounded, since R ≤ \|P − G\| ≤ 2D (≤ 7 rings at the reference view). The fixed and path suns — the only suns of exports, stills, the `FTG` preset and path mode — are not bounded. | (1) **Bound the per-position rings.** In §8.8 and §8.4 (c), hold ring positions individually only out to a fixed ring j₀ (for example j₀ = 16, where the floor reaches level 6). Beyond it, the traversal reads a **far-field max pyramid**: per block of tile positions at the floor's level, the greatest height the display list's marks and field rasters write there. It is built once per (stop, DPR) by the tile worker, keyed by the list's version, and shared by the view and by every export tile. Its memory and build time are stated for each rung's frame at the finest stop, so that the ring count and the export's recomputation no longer grow with R. Alternatively, cap R at a stated number of tile sides, and record what the cap loses as a judgment. <br>(2) **Restate §8.8's "≤ 3 MB whatever the window" and §8.8 / §12.8's "≈ 21 MB whatever R"** as bounds with their ranges, the far-field pyramid added to Q and to the export window. Recompute the worked cases. <br>(3) **Budget the rings.** §12.7's lighting bullet gains terms for a first-ring position's heights raster, a further ring's pyramid, and the far-field build. §12.5's settle claim cites them (PLAUSIBLE until M2b, measured in the settle runs, with a pre-decided fallback). <br>(4) **Add a bar.** §8.3 or §13.2 gains a `mountainous` fixture: a 15° path sun at the 1:500 stop; the lit settle within §12.5's bound; an A2 lit export within §12.7's; shadows equal to the CPU reference's within §13.4's tolerance. <br>(5) Update J-A68.90's index row and Part A ("≤ 3 MB … whatever the window", "≈ 21 MB whatever its reach") and J-A68.89's Q. |
| VRC2-02 | minor | partial | rendering | 68 | **The ring positions' lifecycle is incomplete.** (a) **Source band.** A ring position's pyramid is "rastered … from the marks alone" (§8.8). At the district and finer bands, the tile worker holds a district's band marks only after a band request, and §8.9's band-request row asks only for "the districts … that tiles entering the view need". A ring position in an unrequested district is therefore rastered from the city band's masses (§8.5), or from nothing. Its shadows then change when a pan brings the district in, and they differ from a lit export, whose transient list covers the dilated frame at the export's band (§11.1). (b) **Cache key.** A ring pyramid is "keyed as [its] tile's base", with no `fromLevel` (§8.9's `TileRasterOpts`). A pyramid cached from level 3 for ring 3 is then found for the same position when a pan makes it ring 1, where level 0 is needed. | §8.9's band-request row: "…that tiles entering the view — and the ring positions round them that the global light's window reaches (§8.8), after the visible tiles' — need and the tile worker lacks". §8.8: "a ring position's pyramid is rastered from the marks of the view's band, requested for its districts like a visible tile's (§8.9), its shadows completing when the band answer arrives; it is keyed as its tile's base plus its `fromLevel`, a held pyramid serving any ring at or beyond the one it was built for". |
| VRC2-03 | major | new-problem | rendering | 68 | **The full-precision fallback cannot reach §13.4's parity.** §8.4 (g): a tier whose GPU pass misses §13.4's tolerance "transfers its surface layers at full precision … the pyramids and the rings' heights stay one byte, rounded up — the traversal unchanged, since the reference resolves the same cells". But the CPU reference computes "its pyramids in float32 … never from the byte encoding" (§8.8). The traversal resolves every cell beyond half a tile side at a pyramid level ≥ 1, and every caster in the first ring from that ring's one-byte level 0. There the GPU reads h_max rounded up by up to one step of §8.8's square-root scale — ≈ 0.67 m at 45 m and ≈ 1.2 m at 100 m (§8.8's own figure). The V = 0.5 point therefore lies up to step × cot(altitude) further out than the reference's. At the 1:500 stop and DPR 2, a 45 m tower's tip under the fixed sun is resolved at level 2 and lands ≈ 0.67 m ≈ 10 px further; under a 15° sun the offset is ≈ 38 px. The first-ring casters shift every shadow entering the view's edge tiles. §13.4's bar is ≤ 2 levels per channel at the 99.9th percentile of each lit tile, which is ≈ 262 pixels of a 512² tile. One such tip (≈ 90 px wide × 10 px) already exceeds it, so on the golden views the fallback's "still missing, that tier draws rung 3" follows. As written, rungs 1–2 are unreachable, against J-A68.81's lit default. The offset is CONFIRMED by recomputation; the bar failure is PLAUSIBLE. | §8.4 (g): "at full precision the pyramids and the ring positions' heights are carried in 16 bits — centimetres above the tile's datum, rounded up, 2 B per cell — so the reference and the GPU resolve the same cells to within 1 cm". §8.8: full-precision Q_f = P ÷ 6 + 2(2(a + b) + 4) ÷ 3 + 6 MB (the rings' part as bounded by VRC2-01). Recompute the worked cases: the high tier at DPR 1.5 needs 163 + 26 = 189 ≤ 192 MB, and the mid tier at DPR 1 needs 85 + 20 = 105 ≤ 128 MB (recomputed from §8.8's terms). §12.8 and J-A68.85 / J-A68.89 follow. Alternatively, keep one byte and narrow §13.4's bar to the pixels whose casters resolve at level 0 of a visible tile, recorded as a judgment. |
| VRC2-04 | minor | new-problem | rendering | 68 | **The floor's bound ignores the cell's diagonal.** §8.4 (c) says a far caster is resolved "to a **floor cell** of side at most t ÷ 128, its shadow lengthened by at most that side", and "the floor adding at most its cell". §8.3's three shadow-tip rows bound the tip "within max(1 px, §8.4 (c)'s floor cell there)", and the narrow-casters row bounds the width "within one floor cell per side". A ray crossing a square cell diagonally runs up to √2 × its side inside it. So when the caster holds only the cell's far corner, the resolved bound (taken at the ray's entry t_a) moves the shadow's start by up to that chord. The repair's receipt tested only an axis-aligned sun (azimuth 0), while the default fixed sun stands at 315°, a diagonal. CONFIRMED by `docs/validation/bench/amendc_verify_rendering_r2_diag.out`, which runs the repair's own law on every corner offset inside the cell along the caster's centre lines: <br>• a 45 m tower under a 45° diagonal sun: 4.24 px against a 4-px cell (1.06 ×); <br>• the same tower under a 15° diagonal sun: 21.21 px against a 16-px cell (1.33 ×); <br>• the axis-aligned control: 3.00 px and 15.00 px (0.75 × and 0.94 ×); <br>• never shortened. <br>§8.3's long-shadow row, whose fixture takes "the fixed sun", can therefore fail on a correct build. | §8.4 (c): "…its shadow lengthened by at most the cell's diagonal, √2 × its side (≤ t ÷ 90), and never shortened"; "(receipt (1) …, the floor adding at most its cell's diagonal; `amendc_verify_rendering_r2_diag.out`)". §8.3's cursor-sun, lower-roof and long-shadow rows: "within max(1 px, the diagonal of §8.4 (c)'s floor cell there)"; the narrow-casters row: "within one floor cell's diagonal per side". J-A68.90's Part A: "at most √2⁄128 (≈ 1⁄90) of its distance longer". Alternatively, lower the floor by half a level (ℓ(t) = max(0, ⌊log₂(4√2 · t ÷ S)⌋)) and keep the texts. |
| VRC2-05 | minor | new-problem | rendering | 68 | **A lit export's Z comes from the list it dilates.** §11.1: "A lit export's transient list covers its frame dilated by §8.4 (c)'s largest window and the largest light radius". §8.8's print paragraph says the same. §8.4 (c) takes Z from "the display list's `surfaceTopCm`", and §8.1 defines that value over "a mark or field raster of the list". An export's transient list is built by the generation worker, which keeps only the 24-B index (§8.1 item 6), for the export's frame. The window that sets the list's extent would then come from the list it extends. A caster taller than everything inside the frame — a keep, or a hill beyond the edge — is outside the list, and it never shades the frame. The export then differs from the view, whose list covers the whole town at the city band. | §8.1 or §11.1: "the generation worker keeps the `surfaceTopCm` S14 last wrote for each band beside its 24-B index, and an export's window takes Z from it — the document's highest surface at the export's band — never from the transient list whose extent that window sets"; §8.8's print paragraph points to it. |
| VRC2-06 | minor | partial | rendering | 68 | **The hand lantern has no reference and no bar.** J-A68.92 makes the lantern a GPU-only per-frame term: "an export or still, which has no pointer, draws no lantern" (§8.4 (f)). J-A68.82 makes the CPU reference the definition of the lit picture, and §13.4 holds the GPU pass to it on stills at nine injected pointer positions, but only for the cursor sun. Nothing computes the lantern in the reference, and no row of §8.3, §13.2 or §13.4 tests it. Its correctness (the (c) law, its 6 m radius and cutoff, its traversal) and its absence from exports are asserted, not proved. | §8.4 (f): "the CPU reference evaluates the lantern at a given pointer point, as it evaluates the cursor sun for §13.4's stills (tests only; an export or still without a pointer draws none)". §8.3 gains a row: "hand lantern (item 68; §8.4 (b), (f)): the underground layer of a golden CITY at a depth band holding a sewer front, `handLantern` on at nine pointer points, CPU reference and GPU pass \| ink, lit \| the GPU within §13.4's tolerance of the reference; 0 lit pixels beyond 6 m of the pointer's floor point from the lantern's term; no lantern term in any export". |
| VRC2-07 | minor | partial | rendering | 101 (b) | **The bridge `preview` message leaves `view` untyped.** §11.3's host → PLAT message is `preview { events, view? }`, and `preview.result` draws the ghost "in the client's view when `view` is set". §11.2's call types it as `opts?: { view?: ViewHandle }`, but a bridged host holds no `ViewHandle`, because the module's view lives in its own iframe. The field's type, and which view it names, are unstated. | §11.3: "`preview { events, view?: boolean }` — `true` draws the ghost as `live.ghost` in this client's own view (§8.2), `false` or absent computes the dry run alone"; J-A101.86's row and Part A likewise. |

## 6 Held parts (gate (a)) — none written in the part

A grep over §8, §9, §11 and §12 of the live design finds none of the held parts:
* **Item 68 (g).** "MFCG draws no cast shadows" is absent. "The `MFCG` preset draws no cast shadow" appears only as our
  preset's behaviour (§8.2 l. 10082; §8.4 (h); J-A68.86).
* **Item 68 (support).** VG 1.6.9 and Dwellings appear only in §8.10's sampler provenance, P14.
* **Items 52, 35 and 60.** Item 52's "visibly differ", item 35's "160 of 162" and item 60's "16-cell" support are absent.

The released parts stand as earlier rounds applied them:
* item 59's timing is in §12.7, labelled;
* item 58 (f) belongs to II.2;
* item 49's rejected deletion and item 37's release are not in this part.

**Gate (b), build naming.** Round 2 added no "the reference does X" sentence. The only reference name in the added text is
our `FTG` preset (§8.3's which-sun row).

**Gate (c), no reference identifier.** None entered the design or the rationale.

## 7 Document checks and receipts

* `python3 docs/validation/bench/doc_checks.py --sections "8,9,11,12"` (allow file
  `docs/validation/doc-checks-allow.tsv`) ran on the live design `3daa0b07…` and **exited 0**. The corpus was 9 626 JSON
  files, 916 788 C3 3-grams and 478 C4 lists. Its stderr holds the pre-existing unreadable-JSON warnings only. The counts
  equal r1's. This lane edits no design text and added no allow row.

  | C1 | C2 | C3 | C4 | S1 | S2 |
  |---|---|---|---|---|---|
  | 5 / 0 | 0 / 0 | 155 / 0 | 1 / 0 | 0 / 0 | 0 / 0 |

* `docs/validation/amendments-b/refs.py docs/ARCHITECTURE.md <scratch>/refs.json` reports 141 headings, 35 D ids,
  730 J ids and **2 broken**, both the pre-existing externals. It was run with the output in scratch; no design file was
  passed as the output.
* **Re-run.** `amendc_repair_rendering_r2_traversal.py` re-runs **byte-identical** to its stored `.out` (sha256
  `d7084a96…`).
* **New receipts** (our own code, stdlib only):
  * `docs/validation/bench/amendc_verify_rendering_r2_diag.{py,out}` (sha256 `a0bb6787…` / `00bf144a…`). It is the
    repair's law, copied, under a diagonal sun with the caster's corner at every texel offset in the floor cell. It
    backs VRC2-04 and runs in ≈ 25 s.
  * `docs/validation/bench/amendc_verify_rendering_r2_rings.{py,out}` (sha256 `63df4e6d…` / `2e319adb…`). It computes
    ring counts, positions and memory against relief (30 m – 3 000 m) and the fixed, 15° and ≤ 7.1° suns, from §8.8's
    terms, for the view and for 300-dpi export tiles. It backs VRC2-01.
* **Recomputed from the text:**
  * §8.8's Q worked cases (171 / 122 / 68 / 104 / 176 / 95 MB) match receipt (5);
  * §12.8's export-time canvases (186 ≤ 192; 137 > 128 → 113; 83 > 72 → 71) are right;
  * the one-byte step at 45 m is 0.67 m (VRC2-03);
  * the 16-bit Q_f worked cases are 189 and 105 MB.

## 8 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (quoted from the live text, executed, or recomputed from the text's own terms):
* all 21 FIXED verdicts and every item verdict;
* VRC2-04's lengthening (executed receipt);
* VRC2-01's ring counts and memory (executed receipt from the text's terms and §4.2 S1's relief);
* VRC2-03's one-byte offset (≈ 0.67 m ≈ 10 px);
* the gaps quoted in VRC2-02, VRC2-05, VRC2-06 and VRC2-07;
* the doc checks, the resolver, the J-id scan and the receipt re-run.

**PLAUSIBLE** (the repairers' to confirm):
* VRC2-03's consequence: that the golden views fail §13.4 on the full-precision path;
* VRC2-01's time cost of thousands of ring rasters;
* the mechanisms the required changes choose:
  * VRC2-01's far-field pyramid and j₀;
  * VRC2-03's 16-bit pyramids and Q_f;
  * VRC2-02's band requests and `fromLevel` key;
  * VRC2-05's kept `surfaceTopCm`;
  * VRC2-06's reference lantern;
  * VRC2-07's `view?: boolean`.
* the severity of VRC2-01 and VRC2-03 as major. VRC2-01 breaks every lit export and every fixed- or path-sun view on a
  hilly site. VRC2-03 makes rungs 1–2 unreachable by the design's own fallback chain.
