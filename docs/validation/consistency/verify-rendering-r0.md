# Verify — consistency pass, round 0: the RENDERING part (§8, §9, §11, §12)

> Fable-reviewed 2026-09-26: CORRECTED — docs/validation/consistency/validate.md

Lane `consistency/verify-rendering-r0`, 2026-09-26. Status: COMPLETE. Verifies `## §8 Rendering and the style system`
(l. 5446–6338), `## §9 Labels and map furniture` (l. 6339–6605), `## §11 Export and interop` (l. 6778–7035) and
`## §12 Performance budgets` (l. 7036–7497) of the assembled `docs/ARCHITECTURE.md` against the archive
(`docs/archive/ARCHITECTURE-pre-consistency-2026-09-26.md` §8 l. 6774–7886, §9 l. 7887–8202, §11 l. 8397–8703, §12
l. 8704–9251, all read side by side with the new text), `inventory-rendering.json` (599 items + 8 conflict records, none
sampled), `canon.json` (Part RENDERING, the 13 conflicts routed here, the 3 routed open items, the 65 other-part
restatements of rendering homes, the 17 rendering-home detail gaps, the 4 canon notes on rendering homes), the whole
mapping table of `rewrite-rendering.md` (599 rows), `docs/validation/fix-all/still-open-r5.json` (NR5-1 … NR5-3) and the
cross-part notes of the other five rewrite reports. Line numbers are the new document's unless marked "archive".
Scratch work (a worksheet joining inventory, canon and mapping per id; the clause-coverage runs): the session scratchpad.

## 1. Outcome

The rendering part is sound. All 599 inventory ids and the 8 inventory conflict records are accounted for: 585 ids are
OK at their mapped place, 4 more are OK with a pointer to an issue about a detail beside them or another part's
restatement of them, and 10 carry an issue verdict (each is still stated at its home; the issues concern a detail it
lacks). The three open items **NR5-1, NR5-2 and NR5-3 are FIXED** (NR5-3's percentages re-derived from
the committed receipt). All 13 canon conflicts routed to the part are resolved as the canon rules; GAP-2 stays with the
owner / Fable, as the canon rules. No per-section review marker, deferral wording or round narration remains in the part,
and the four assembled sections are byte-identical to the rewrite's section files (one trailing blank line apart). Every
§-reference resolves, and every J-id cited has its index row and its verbatim passage in
`docs/ARCHITECTURE-RATIONALE.md` F.5.

All 13 issues are **minor**; none blocks. Owners: rendering 10, scope 2, pipeline 1.

* **Five losses**, each a fact now stated nowhere that the rendering home should carry: the `VectorBackend` interface
  (§14 points to §8.9, which never declared it — VR-R0-1); §12.4's S10 (0) split ≈ 3 ms + ≈ 2.3 ms (VR-R0-2); S9's
  one-district ≤ 3 ms M0 bar (VR-R0-3); the digest-tree memory breakdown (VR-R0-4); "logged with `author: 'host'`"
  (VR-R0-5). Four of them are also raised by sibling verifiers (P0-4, VK-R0-2, VDC-3, VDC-4) — one fix each.
* **Five unreflected notes or canon routings** in rendering's own text: §11.3's bridge policy lacks two clauses its home
  should carry (VR-R0-6); §8.2 does not state the contour clip that §4.2 now points to it for (VR-R0-7); §12.2 still
  restates §1.1's rung table (VR-R0-8); the NR5-1 crown set is counted but never sized, so §12.8's "112 + 15 ≤ 128 MB …
  hold both" is unproven (VR-R0-9, new); the part keeps 11 fix-round `NF-` finding tags the other parts dropped
  (VR-R0-10).
* **Three in other parts**, touching rendering's facts: §4.9 says avenues and hedgerows are a jittered grid where §8.10
  (home) lays them on a line (VR-R0-11 = verify-pipeline P0-1); §13.2 restates §8.3's seam census row (VR-R0-12); §9.3's
  archived "next candidate" became §13.7's "next ladder rung" without a recorded resolution (VR-R0-13).

**CONFIRMED vs PLAUSIBLE.** Presence and absence of every cited fact were checked by grep and by reading old and new text
side by side (CONFIRMED); NR5-3's percentages were re-derived from `fixall_rendering_r5_png.out` (CONFIRMED). That no
other meaning shifted in the compressed prose is PLAUSIBLE: one full side-by-side reading plus two clause-coverage runs
(old → new, new → archive), no second reader. VR-R0-9 is PLAUSIBLE (the set's size is unmeasured).

## 2. Issues (each with its owning part)

| id | sev | kind | owner | claim (evidence) | required change |
|---|---|---|---|---|---|
| VR-R0-1 | minor | lost | rendering | `VectorBackend` is stated nowhere. The archive declared it only in §14 (archive l. 10133: `interface VectorBackend { write(list: DisplayList, style: StyleSheet, opts: { layers: Layer[]; band: LodBand; frame: Box }): string }`). The canon grouped it into SCOPE-384 → RENDERING-252 (§8.9); scope replaced §14's block by the pointer "backends, threads, TileAddress, TileRasterOpts, TileBackend, RasterJob, VectorBackend: §8.9" (l. 8293); §8.9 declares the other four but not `VectorBackend` (grep: the pointer is its only occurrence). The interface is lost and the pointer is broken. | Declare it once in §8.9's backend code block beside `TileBackend` (the SVG writer of §11.1), with the archived signature. Alternatively scope restores it in §14 and drops it from the pointer list — one place only. |
| VR-R0-2 | minor | lost | rendering | The S10 (0) split "≈ 3 ms at CITY with the margin bands, plus ≈ 2.3 ms to rebuild the L3 static partitions it touched" (PIPELINE-256, archive l. 4440, its only statement) is gone. §4.7 S10 (0) now says "cost §12.4" (l. 3406); §12.4's row (l. 7212) gives only the 5 ms total; §3.3 pool step 1 gives the ≈ 2.3 ms and says it is "carried in §12.4's S10 (0) row" (l. 1810–1812), which it is not. The ≈ 3 ms band figure is stated nowhere. Pipeline note R-1 asked for it (canon detail gap on RENDERING-523). Same as verify-pipeline P0-4. | §12.4's S10 (0) row, work column: "≈ 3 ms bands + ≈ 2.3 ms L3 partition rebuild (§3.3 pool step 1)". |
| VR-R0-3 | minor | lost | rendering | S9's M0 bar "one district ≤ 3 ms on reference hardware" (KERNEL-318; archive l. 3128, §3.7 only) is stated nowhere. The canon mapped KERNEL-318 to RENDERING-524 (detail gap "3 ms"); the kernel rewrite removed it from §3.7 and its note 7 asked §12.4's S9 row to carry it; the S9 row (l. 7209) holds only the CITY 25 ms, while §3.7 still says M0 measures S9 "per district" against §12.4. Same as verify-kernel VK-R0-2 (owner kernel there). | §12.4's S9 row, work column: "one district ≤ 3 ms (the kernel's M0 bar, §3.7)" — or VK-R0-2's restoration in §3.7; one place only. |
| VR-R0-4 | minor | lost | rendering | The digest-tree memory breakdown "≈ 30 000 entity leaves, ≈ 15 000 face-ring hashes and their interior nodes at 16 B each" (DETERMINISM-190; archive §6.2 l. 5417) is stated nowhere: §6.2 now says only that the memory is counted in §12.8's entity-store line (l. 4266), and §12.8 (l. 7431) gives "≈ 1 MB" and "≈ 0.25 MB" without it. Determinism note 6 asked §12.8 to take it (canon detail gap on RENDERING-586). Same as verify-determinism VDC-3. | §12.8, after "the model tree ≈ 1 MB": "(≈ 30 000 entity leaves, ≈ 15 000 face-ring hashes and their interior nodes at 16 B each)". |
| VR-R0-5 | minor | lost | rendering | "Bridge commands from a host map one-to-one onto these events and are logged with `author: 'host'`" (archive §7.1 l. 6005–6006, its only statement; the canon folded DETERMINISM-378 into RENDERING-472) is gone: §7.1 points to §11.3, whose Logging bullet (l. 7007–7011) says events are logged one to one but never names the author, and `EditBase.author` still offers `'host'` (l. 4618) with no rule for when. Same as verify-determinism VDC-4. | §11.3 Logging: "… logged one to one, a host's own commands with `author: 'host'` (§7.1's `EditBase`)". |
| VR-R0-6 | minor | conflict | rendering | Model note 13 (and the canon detail gap "3 MB" on RENDERING-471, whose home is §11.3) asked §11.3 to state the bridged-load policy in full: every other client "records its root at h₀ and keeps the ≤ 3 MB `doc.load` bytes". §11.3 (l. 6999–7006) says only that it "keeps the `doc.load` bytes until the mismatch is settled"; both clauses live only in §2.9 step 4 (l. 1449–1452), which still states the whole policy (verify-model V-MODEL-07). Nothing is lost, but the policy is stated twice and the home is the thinner copy. | §11.3 Bridged load verification: "… reports the mismatch, records its root at `h₀` and keeps the `doc.load` bytes (≤ 3 MB at CITY) until the mismatch is settled"; §2.9 step 4 then points to §11.3 for the policy and keeps the install mechanics (V-MODEL-07). |
| VR-R0-7 | minor | conflict | rendering | Pipeline note R-4: the canon homes the contour clip (PIPELINE-066) at §8.2's relief tier (RENDERING-084), and §4.2 S1 (2) now says contours are "clipped to the land faces in vector space before emission (§8.2)" (l. 2677–2678). §8.2's relief tier (l. 5708–5711) says only that they are extracted per tile by marching squares and resampled — it never states the clip. The fact survives in §4.2 S1 (2) and §5.2 F-CONTOUR; the pointer claims a statement the target lacks. | §8.2 relief tier: "… then resampled evenly along each level line, and clipped to the land faces in vector space before emission, so no contour crosses a shore (F-CONTOUR, §5.2)". §4.2 S1 (2) may then keep only the coast construction (pipeline's choice). |
| VR-R0-8 | minor | conflict | rendering | §12.2's ladder table (l. 7089–7094) restates §1.1's rung table (l. 169–173) column for column — population band and target, buildings at the target, frame area and side — with identical values. The canon's note on RENDERING-493 routes "the rung bands, targets, building ranges and frames by reference to §1.1 and §3.2 (9) … §12.2 keeps the measured MFCG counts and times at the matched sizes"; the rewrite applied CANON-C03 to the header but not this routing. The two copies agree today. | §12.2: replace the band, target, buildings-at-target and frame columns by a pointer to §1.1's rung table (frames: §3.2 (9)); keep the matched MFCG size, its buildings / walled ha and timings, and the cap row (≤ 35 000 buildings, ≤ 153.6 km²), which §1.1 does not state. |
| VR-R0-9 | minor | new-problem | rendering | NR5-1's fix makes a raster export in `lit` with a `path` sun hold its crown set and counts the set "with the export's canvases" (l. 6062–6063, 6313, 7453–7454, 7461), but gives it no size, and §12.8's sums are unchanged: "the reference view on the mid tier (112 + 15 ≤ 128 MB) … hold both" (l. 7462) leaves 1 MB, so any held set above 1 MB contradicts it and should trigger the coarser-stop drop. The rewrite recorded the size as unquantified (its *Homes chosen* item 3). PLAUSIBLE: a crown library of 160 sprites is likely above 1 MB, but no figure exists. | State the held set's bound (one crown-library set: at most §8.8's ≤ 5 MB crown-and-atlas scratch, or a PLAUSIBLE per-set figure measured at M2b) and redo §12.8's *Canvases during a raster export* with it, including what the mid tier does when 112 + 15 + the set passes 128 MB; or state that a held set equal to the view's drawn step is that same set, so only a newer view step adds one. |
| VR-R0-10 | minor | conflict | rendering | Tag style (scope note 1, determinism note 10). §8–§12 keep 11 fix-round finding tags — NF-D10 ×2, NF-D11, NF-D12 ×2, NF-D14 ×2, NF-S6, NF-S7, NF-S11, NF-P1 — which are fix-all verify findings (e.g. NF-D10 = "render hashes keyed by a session-local handle"); determinism, pipeline and scope removed theirs as history, and the rendering rewrite's own decision 6 drops fix-round tags but listed `NF-` as an audit tag. The part also keeps ≈ 145 audit tags (VIS-, GEO-, SCL-, MFP-, LC-, COV-FTG-, DEF-, N-, MN-, FTG-, IMP-), which determinism and scope dropped and kernel, model and pipeline kept. | Drop the 11 `NF-` tags (NF-P1 names no invariant another section cites, unlike NF-P5 / NF-P6). Keep or drop the audit tags by the one document-wide convention the validator or Fable picks (as for VK-R0-8). |
| VR-R0-11 | minor | conflict | pipeline | §4.9's "trees at render" row (PIPELINE-317, l. 3686) says green entities are instanced by §8.10's stamp "or a jittered grid (orchards 6–8 m, avenues and hedgerows 8–12 m)". §8.10, the home of the layouts (RENDERING-276, -306, -307; §8.3's census row, RENDERING-143), lays orchards on a jittered grid and avenues, street trees and hedgerows on a jittered **line** (l. 6222–6226, 6295–6297). Predates the pass; the canon missed it; the rendering rewrite's note to pipeline was not applied. Same as verify-pipeline P0-1. | §4.9's row: "by §8.10's layouts (stamp; grid for orchards; line for avenues and hedgerows) and spacings" — a pointer, no restated layout. |
| VR-R0-12 | minor | conflict | scope | §13.2's contract-test bullet (l. 7657–7659) restates §8.3's stamp-tile seam census row (l. 5871): "0 point pairs closer than r₀ across cells in all 256 2 × 2 arrangements of each class's four tiles, for every band's rank subset". The canon split one fact into two homes (RENDERING-147, SCOPE-181); scope note 10 left the choice to the validator. By R9's census exception §8.3 is the home. Values agree today. | §13.2: "the shipped stamp tiles pass §8.3's seam check (§8.10)", with no restated counts. |
| VR-R0-13 | minor | changed | scope | The spine-curvature fallback changed meaning without a recorded resolution. The archive's §9.3 said a spine "still over the limit after its smoothing step doubles takes the next candidate" (archive l. 8070–8071); the archive's §13.7 said it "takes §9.4's next ladder rung" (archive l. 9933). The canon folded RENDERING-365 into SCOPE-326 without listing a conflict, and §9.3 now defers to §13.7 (l. 6492), so the rule became "next ladder rung" — which skips the remaining spines of §9.2's alternate order (spines in order, then the ladder). | Record the resolution. If "next candidate" was the intent, §13.7's O13 (a) fallback reads "takes its next alternate (§9.2: the next spine, then §9.4's ladder)"; otherwise record that the home's "next ladder rung" wins. |

## 3. Open items routed to this part (NR5-1, NR5-2, NR5-3)

| item | verdict | evidence |
|---|---|---|
| NR5-1 | **FIXED** | `TileRasterOpts` has `lightStep?: { azimuthCdeg; altitudeCdeg }` "read by faceLight, the two-tone roof, hillshade and the crowns" beside `sun?`, "read only by the projected-shadow pass" (l. 6148–6151); "the queue passes the view's drawn light step for `under`, `over` and `base` and the shadow sun wherever projected shadows are drawn" (l. 6161–6162); §8.4 passes the drawn light step "as `TileRasterOpts.lightStep` (§8.9)" (l. 5931–5932). The raster-export request row carries the sheet (id@version, or the viewer's `stylePreset` sheet with the document's rows), §8.8's view-state switches, the shadow sun and the light step, kept until the export completes and used for every export tile (l. 6136); §11.1 says the same and that the export shows "the model, its look and its view state as they stood when it was requested" (l. 6834–6842). Class 4 bakes the request's crown set when not cached and holds it (l. 6184); §8.8 (l. 6063), §8.10 (l. 6313) and §12.8 (l. 7453–7454, 7461) count or hold it. §12.7's export-beside-the-view run adds the `lit` `path`-sun export, byte-identical to the export with the sun stopped (l. 7394–7398). §14 points to §8.9 (l. 8293). The set's size is not given — see VR-R0-9. |
| NR5-2 | **FIXED** | §9.2 declares `interface LabelRows { labels: LabelTable; strings: StringTable; geom: GeomTable }` in `@plat/model` beside `LodBand`, `Role`, `ZoomStop`; `begin` and `place` take `labels: LabelRows`; the tile worker's list and each export's transient list implement it; `LabelEntity` stays the model record S13a writes and S14 reads (l. 6421–6429). §8.1's first comment places the three tables with `LabelRows` in `@plat/model` (l. 5461–5462); §14's package line, dependency paragraph and interface pointers agree (l. 8201, 8246, 8290–8291). `@plat/labels` still imports nothing of `@plat/render`. The package move of the three table types is the rewrite's vetoable home choice (its *Homes chosen* 1), recorded below for Fable. |
| NR5-3 | **FIXED** | §12.7: "the per-row rule gives the smallest file wherever rows carry gradients or texture — 6–9 % smaller than None's on the relief and textured looks (J-R53)" (l. 7392–7393). Re-derived from `docs/validation/bench/fixall_rendering_r5_png.out` (CONFIRMED): relief 12.2 against 13.4 MiB = 8.96 % smaller, textured 43.4 against 46.3 MiB = 6.26 %; the same receipt gives the kept figures "None … 4 % smaller to 10 % larger" (flat 5.1 vs 5.3, relief 13.4 vs 12.2, textured 46.3 vs 43.4 MiB) and "Sub … 7–30 % larger" (6.7–29.5 %). J-R53's index and Part A rows quote no percentage, and "7–10 %" appears nowhere in the document or the rationale file (grep). |

## 4. Conflicts touching the part (canon)

Every conflict the canon routes to the part is resolved as ruled; each was checked in the new text:

* **RENDERING-C01 / C02 / C03** — as NR5-2, NR5-1, NR5-3 above.
* **RENDERING-C04** — §12.1 states "a Canvas2D raster of 32 fixed tiles (≈ 40 ms; the part that also picks the hardware
  tier at app start, §8.8)" (l. 7061–7063); §8.8 says "the Canvas2D part of `bench/calibrate` (§12.1)" (l. 6073).
* **RENDERING-C05** — §9.1: the `title` entity carries the title's text and is placed by §9.5's furniture rule
  (slot 24), not by S13b (l. 6372–6373); §9.2's order has no "title >" (l. 6412–6413); §9.5's title names its text
  source (l. 6565–6566).
* **RENDERING-C06** — §9.2 orders by the numeric `LabelEntity.priority`, "by default quarter / district > water >
  landmark > gate > way > address" (l. 6412–6413). GAP-2 (no default rank for `wood` and `annotation`) is unchanged, as
  the canon rules; it is listed in §7 for the owner / Fable.
* **RENDERING-C07** — §12.5: "O12 (b)'s stress view of 40 000 buildings and 200 000 trees (above the request cap of §12.2,
  so a bench fixture, not a generated request)" (l. 7278–7279).
* **RENDERING-C08** — §12.6 states "≥ 30 fps for a brush radius ≤ 150 m at the district band (§8.8)" (l. 7334); §8.8
  keeps the mechanism and says "frame rate: §12.6" (l. 6089).
* **CANON-C01** — §8.2 `symbol(glyph)` and §8.3's catalogue say "a point symbol for every `Pin.kind` of §2.7"
  (l. 5704, 5839–5840); §2.7's `Pin.kind` has 16 kinds and no `tent` (l. 1100).
* **CANON-C03** — §12.2's frame column reads "a rectangle of the blueprint's aspect, §3.2 (9); the square at the default
  aspect 1" (l. 7089).
* **CANON-C05** — §12.4's header drops "(§4 follows it)" and its column points to the stage sections (l. 7197–7199); the
  pointed-to mechanisms were checked present in §4 (fBm grid and refinement l. 2654–2660, the hydrology flood, the
  hexagonal lattice with adjacency by construction l. 2951–2953, splat and three-box blur, distance rasters and top-k,
  the 2 m margin band, open-field strips as render-time segmentation) and §3.3 (copies, slot remap).
* **CANON-C06** — §9.4's acceptance keeps "≥ 99 %" and drops the 5 % inference (l. 6540–6541); §5.2 F-LABEL points to
  §9.4 (l. 4019).
* **SCOPE-C01** — §12.9 states the matched-count ratios 1.8× / 2.3× / 5.1× (l. 7479–7480); §12's intro paraphrases with a
  pointer (l. 7045–7047); §13.5's row points to §12.9 (l. 7949); D-18 and §1.1 point.

Other conflicts touching the part, also checked: **CANON-C04** (§11.2's `E_ENGINE_UNAVAILABLE` "not a kernel result,
§3.1", l. 6952–6953); **KERNEL-C13** (§12.4's S4 row keeps no Delaunay claim; §4.3 states the lattice without
triangulation); **SCOPE-C10** (CityJSON is built, §11.1 l. 6859).

## 5. Cross-part notes addressed to rendering

| from | note | verdict |
|---|---|---|
| kernel 7 | §12.4's S9 row should carry "one district ≤ 3 ms"; S11's geometry share and S8's ≈ 12 µs per cut are there; §12.6's 5 ms plot edit covers the ≈ 0.5 ms index rebuild | S11 (≤ 3 µs median, 25 µs compound share) and S8 (≈ 12 µs per cut) present (l. 7208, 7213); the 5 ms plot edit present (l. 7305). The S9 bar is not → **VR-R0-3**. |
| model 13 | §11.3 states the bridge policy (owner-only keep; others take the replayed town, report, record the root at h₀, keep the ≤ 3 MB bytes) and points to §2.9 step 4 for the install mechanics; `logHead` is §11.3's alone | `logHead` defined only in §11.3 (l. 6966; §2.9 l. 1515 and §11.2's `ApplyResult` point there). Policy partly reflected → **VR-R0-6**. |
| model 14 | the stage-3 hook budgets only in §12.7; the warp Apply measurement at M3a and the wing-check fallback only in §12.6 | reflected (l. 7402–7406; l. 7334–7340). |
| model 18 | cite §2 anchors as they now read | reflected: every §2 anchor the part cites resolves (§2.2 rule 5, §2.6 rule 4, §2.9 steps 2–4, §2.7, §2.8). |
| pipeline R-1 | §12.4: drop "§4 follows it"; keep S10 (0)'s ≈ 3 ms + ≈ 2.3 ms split | the header is fixed; the split is not → **VR-R0-2**. |
| pipeline R-2 | §12.3: keep "the pool's p95 within the pooled law + 10 %" and "the golden suite runs pool sizes 0–3" | reflected: the sweep rule "p95 of T_i ÷ L(B_i) ≤ 1.10" and "(a) it passes the sweep rule … against the pooled law" (l. 7159, 7167); "the golden run generates 200 seeds at pool sizes 0–3" (l. 7166). |
| pipeline R-3 | move II.4's stage-2 tier details (road programs, hood title, instanced hatching, ≈ 25 ops per wing) into §8.2 / §8.6; II.4 a bare pointer | **judged not needed, not raised.** II.4 states those additions once (l. 9009–9012) and points to §8.2 / §8.6 for the rest; §8.2 / §8.6 restate none of them; the ≈ 25 ops ceiling is also §12.5's budget (l. 7297–7298), the budget home; §15.1's E3 row points to "the road programs II.4 adds" (l. 8505), which a move would break (scope note 6). The facts are single-sourced as they stand. |
| pipeline R-4 | §8.2 relief tier: contours clipped to land faces in vector space before emission | not reflected → **VR-R0-7**. |
| pipeline R-5 | §8.5: keep greenery restraint at city zoom (area fill → crowns → lobed trees; avenues not drawn at the city band) | reflected: the city band draws wood fills, the district band crowns (l. 5941–5944), `hatched`'s close-up lobed crowns (l. 5809), and line greenery is not drawn at the city band (l. 5983–5984); §4.9 points to §8.5 (l. 3707–3708). |
| pipeline R-6 | §12.5: keep "no preview", < 1 s to ≈ 14 200 buildings, ≈ 2.3 s at the cap, the single-worker knee ≈ 11 400; one unit for the cap | reflected (l. 7258–7267): "no preview", the knee, "≈ 2.3 s at the 35 000-building cap (120 000 people)" — both units in one sentence. |
| pipeline R-7 | §8.2's boundary-treatment row is the stroke rule §4.7 S11 points to | reflected (symbolisation row, l. 5680). |
| determinism 5 | §11.1 states the picture-export rotation rule; §7.1's Rotate row points to §11.1 | reflected (l. 6803–6804; §7.1 l. 4711 "exports apply the rotation as §11.1 states"). |
| determinism 6 | §12.8 takes the digest-tree breakdown (≈ 30 000 leaves, ≈ 15 000 hashes, 16 B each) | not reflected → **VR-R0-4**. |
| determinism 10 / scope 1 | one tag style document-wide | not reflected for the `NF-` finding tags and the audit tags → **VR-R0-10**. |
| scope 5 | §8.4 keeps the fixed sun value D-19 points to | reflected: azimuth 315°, altitude 45° (l. 5909). |
| scope 6 | §12.3 / §12.5 / §12.9 keep the figures the summary, §1.1, §15.2, §16 and D-18 point to | reflected: ≈ 4 500 / 17 700 / 58 800 and ≈ 3 400 / 13 600 / 45 800 people (l. 7140–7142), ≈ 14 200 buildings ≈ 48 000 people and ≈ 2.3 s at the cap (l. 7258–7261), 1.8× / 2.3× / 5.1× (l. 7479–7480); the summary uses the same figures (l. 53–56). |
| scope 10 | §8.3's seam census row restates §13.2's seam check: reduce §8.3 to a pointer or accept the census exception (R9) | **accept R9's census exception**: §8.3's heading names the census, so §8.3 is the home; the remaining duplicate is §13.2's → **VR-R0-12** (owner scope). |

The rendering rewrite's own outgoing notes were checked where the part depends on them: scope §14 (a)–(c) applied, but
`VectorBackend` was swept into the pointer → **VR-R0-1**; J-R55 and J-R56 have index rows and Part A rows; §13.2 carries
the `.plat` round trip (l. 7649–7650); kernel §3.7 / §3.1 point to §11.2 / §8.10 / §12.7; determinism §7.1's rotation
points to §11.1 and §5.2 F-LABEL to §9.4, while the three optional "may add" unions were not taken (verify-determinism
VDC-11, owner determinism); model §2.1 / §2.7 / §2.9 point as asked; pipeline §4.9's layout note was not applied →
**VR-R0-11**; II.4 and §4.1 point as asked.

## 6. Mechanical checks (executed)

* **Assembled text.** `diff` of l. 5446–6338, 6339–6605, 6778–7035 and 7036–7497 against
  `new/rendering/01`–`04`: identical apart from one trailing blank line each.
* **Mapping completeness.** A script joined the 599 inventory items with `canon.json`'s `by_inventory_id` and the
  mapping table: 599 of 599 mapped, 0 extra; the 8 conflict records are covered by §4. Canon actions: 500 state (home),
  29 restatements referenced to another part's home, 1 section restatement, 1 moved out (RENDERING-402 → §13.2), 1 moved
  in (DETERMINISM-357 → §11.1), 60 rationale (58 existing J rows, 2 new: J-R55, J-R56), 8 history.
* **Rationale and history.** All 60 rationale ids and 8 history ids appear in `rewrite-rendering-rationale.md` and in
  `docs/ARCHITECTURE-RATIONALE.md` F.5; F.5's 331 body lines are verbatim archive lines except the 48 added `text`
  fence openers. All 60 "(J-Rn)" pointers are in the part; two sit elsewhere than the mapping table says — J-R27 at §9.4
  rung (5) (l. 6515), J-R18 at §12.3 (l. 7182) — which their index rows name (§9.2, §9.4; §12.3, §12.9).
* **J- and D-ids.** 60 distinct J-ids cited, each with a main-document index row and a rationale-file entry; D-7, D-8,
  D-18 and D-31 exist.
* **References.** 105 distinct §-reference forms; every base resolves to a heading (RFC 7946 §3.1.6 is external).
  Anchored forms were read at their targets: §2.2 rule 5, §2.6 rule 4, §2.9 steps 2–4, §3.2 (1) and (9), §3.3 steps 1
  and 5 (the kernel's "pool step" 1 and 5; the same wording as the archive), §3.6 (6), §6.2 (iii), §6.5 (2) and (3),
  §7.3 items 2 and 4, §8.1 items 3, 5 and 6, §17.1 (3) and (5) — each states what the part cites it for. The part's
  pointers to other homes were read at their targets (§2.7 `Pin`, §2.9 view section and pack cap, §4.1, §4.3, §4.5,
  §6.1 `style.random` and `render.stampTiles`, §6.3's naming cases and carrying rule, §6.4 permalinks, §7.1 `instance`
  event, §7.3 item 2, §7.4 carried pins, §10.3, §13.2, §13.5, §13.7, II.6, *Staged*).
* **Markers, deferral, narration.** 0 "PENDING FABLE REVIEW" lines in the part (the document has the one banner, l. 3).
  Deferral grep (TBD, later, open, deferred, future, pending, not yet, undecided): 11 hits, all ordinary technical words
  ("no later casing", "pending tiles", "later pin", "undecided candidate"). Round narration: 0. Fix-round tags: 0 of NR-,
  VD-, VK-, VS-, VP-, NP-; 11 `NF-` (VR-R0-10).
* **Numbers.** Every digit group of every home item's statement and values was searched in the part: 5 statement-level
  misses, all expected — bracket formatting ("[0, 18]", "[−180, 180)", "(0, 0)"); the plain-words intro's "59 000", now
  the canonical 58 800, and its dropped paraphrase "up to about 25 000 people" (a summary may paraphrase; §12.5 holds the
  laws); §12.9's "0.48 s", gone with the restated miss figures (§12.3 keeps 481 ms).
* **Clause coverage both ways.** Content-word coverage of every archived clause of §8, §9, §11, §12 against the new
  document: 193 clauses below 0.97 were read — fix-round tags, rationale passages now in F.5, history, and rewordings.
  Of every new clause against the archive: 32 below 0.97 — the NR5 additions (`LabelRows`, `lightStep`), pointer phrasing
  and rewordings; no unsanctioned new fact.
* **Other-part restatements of rendering homes.** All 65 were compared with their rendering home: 58 are pointers or
  agree; the others are VR-R0-2 (PIPELINE-256), VR-R0-3 (KERNEL-318), VR-R0-4 (DETERMINISM-190), VR-R0-5
  (DETERMINISM-378), VR-R0-6 (MODEL-407), VR-R0-7 (PIPELINE-066) and VR-R0-1 (SCOPE-384's `VectorBackend`).
* **Receipt.** NR5-3's figures re-derived from `fixall_rendering_r5_png.out` (lines 6–8, 20–22, 34–36).

## 7. Observations (not raised)

* **GAP-2 (owner / Fable).** No default rank exists for `wood` and `annotation` labels in §9.2's order; the pass may not
  add one (canon GAP-2). RULING-1 (the owner's GPL-3 intent) is scope's.
* **NR5-2's package move** (rewrite *Homes chosen* 1): `LabelTable`, `StringTable` and `GeomTable` moved from
  `@plat/render` to `@plat/model` so `LabelRows` can name them. Consistent across §8.1, §9.2 and §14; the alternative (a
  structural `LabelRows` repeating the columns) is recorded for Fable.
* **NR5-1's request bound** (rewrite *Homes chosen* 2): the raster-export request stays "≤ 4 KB plus the list" while it
  names the sheet and, for a viewer preset, "the document's rows". This holds if the rows travel by reference to the
  sheet the tile worker already holds; PLAUSIBLE, for Fable.
* **The title entity.** §8.1 gives a `LabelTable` row to each `LabelEntity` "drawn at the band"; the `title` entity is
  furniture (§9.1, §9.5), so it has no row and S13b never sees it. This is implied, not stated; a one-clause "S14 emits no
  text mark for kind `title`" would make it explicit.
* **Memory test pool sizes.** The archived §13.2 ran the memory test "at pool sizes 0 and 3" (SCOPE-169; a canon detail
  gap on RENDERING-594). §12.8 does not say it, but §16's M1 and M2a exits do (l. 8613–8614), so nothing is lost.
* **Glosses beside pointers.** §8.2 "Faces follow §17.2: the default label face is IM FELL Great Primer" and §8.10
  "§4.9: 300–500 cm for woods, 400–600 cm for gardens" restate their homes' values beside the pointer (canon notes on
  RENDERING-111 and -277). Values agree; left as convenience glosses.
* **§15.2's O12 row** repeats §12.5's interaction figures (≥ 60 / ≥ 30 fps, ≤ 80 draw calls, ≤ 4 uploads); they are the
  O12 (b) requirement mapped to §12.5 and agree. For the scope verifier (R10).
* **Size.** The part is at 80.7 % of its size against the pass's 55–65 % target (the rewrite gives the reason: 500 of
  599 items are home statements).

## 8. Checked list — every inventory id

Verdicts: **OK** — the same meaning was found at the mapped place (for a reference, the pointer is present and the target
states the fact; for rationale and history, the passage is verbatim in `docs/ARCHITECTURE-RATIONALE.md` F.5 and the
"(J-Rn)" pointer is present). **OK — see VR-R0-n**: the item holds; an issue concerns a detail beside it or another part's
restatement of it. **VR-R0-n**: the item is affected by that issue. Line numbers are the new document's.

| id | kind | canon action | where now (mapping) | verdict | note |
|---|---|---|---|---|---|
| RENDERING-001 | summary | state | §8 intro (plain words, canonical figures) | OK | §8 intro l. 5448–5456 |
| RENDERING-002 | interface | state | §8.1 (code comment; package rule §14) | OK | §8.1 comment l. 5461–5462 (NR5-2 extends it) |
| RENDERING-003 | type | state | §8.1 | OK |  |
| RENDERING-004 | type | state | §8.1 | OK |  |
| RENDERING-005 | interface | state | §8.1 | OK | 54 B fixed columns re-summed |
| RENDERING-006 | rule | state | §8.1 | OK |  |
| RENDERING-007 | rule | state | §8.1 | OK |  |
| RENDERING-008 | rule | state | §8.1 item 3 and MarkTable.group comment | OK |  |
| RENDERING-009 | rule | state | §8.1 | OK |  |
| RENDERING-010 | interface | state | §8.1 | OK |  |
| RENDERING-011 | interface | state | §8.1 | OK |  |
| RENDERING-012 | interface | state | §8.1 | OK |  |
| RENDERING-013 | interface | state | §8.1 | OK | l. 5485–5492; ≤ 96 B per row |
| RENDERING-014 | interface | state | §8.1 | OK |  |
| RENDERING-015 | interface | state | §8.1 | OK |  |
| RENDERING-016 | interface | state | §8.1 | OK |  |
| RENDERING-017 | interface | state | §8.1 | OK |  |
| RENDERING-018 | rule | state | §8.1 | OK | item 1 |
| RENDERING-019 | rule | state | §8.1 | OK |  |
| RENDERING-020 | rule | state | §8.1 | OK |  |
| RENDERING-021 | rule | state | §8.1 | OK | ± 30°, 300 m |
| RENDERING-022 | rule | state | §8.1 | OK | item 2; KERNEL-039's scale ÷ 4 m is §8.10's s = spacing ÷ 400 cm |
| RENDERING-023 | rule | state | §8.1 | OK |  |
| RENDERING-024 | rule | state | §8.1 | OK |  |
| RENDERING-025 | rule | state | §8.1 | OK | slot resolution's refusal rule stated once in §8.2 (l. 5787–5793) |
| RENDERING-026 | rule | state | §8.1 | OK |  |
| RENDERING-027 | rule | state | §8.1 | OK |  |
| RENDERING-028 | rule | state | §8.1 item 3 (shipped entries stated once in §8.2 slot resolution) | OK | shipped entries stated once in §8.2 slot resolution (l. 5793–5795) |
| RENDERING-029 | mechanism | state | §8.1 | OK | item 4 |
| RENDERING-030 | rule | reference | referenced to §7.3 (DETERMINISM-407) | OK | §7.3 item 2 (l. 4860–4864) states the replay order |
| RENDERING-031 | rule | state | §8.1 | OK | NF-D10 tag (VR-R0-10) |
| RENDERING-032 | rule | state | §8.1 | OK |  |
| RENDERING-033 | defined-term | reference | referenced to §6.1 (DETERMINISM-599) | OK | §6.1 decoration bullet states words 0 and 1; §8.1 item 5 keeps the use |
| RENDERING-034 | defined-term | state | §8.1 | OK |  |
| RENDERING-035 | rule | state | §8.1 | OK |  |
| RENDERING-036 | rule | section restatement | section restatement → one-line pointer in §8.1 item 5 to §6.3 | OK | one-line pointer; §6.3 states re-mint / fresh lineage (l. 4341–4354) |
| RENDERING-037 | budget | state | §8.1 item 6 | OK | item 6: ≈ 60 000 marks, ≈ 10 MB |
| RENDERING-038 | rule | state | §8.1 item 6 | OK | 24 B per mark, ≈ 1.4 MB |
| RENDERING-039 | rule | state | §8.1 item 6 (detail §11.1) | OK |  |
| RENDERING-040 | decision | rationale | J-R1 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R1)" left at §8.1 | OK | J-R1 pointer present; passage in F.5 |
| RENDERING-041 | decision | rationale | J-R2 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R2)" left at §8.1 | OK | J-R2 pointer present; passage in F.5 |
| RENDERING-042 | decision | rationale | J-R19 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R19)" left at §8.1 | OK | J-R19 pointer present; passage in F.5 |
| RENDERING-043 | decision | rationale | J-R20 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R20)" left at §8.1 | OK | J-R20 pointer present; passage in F.5 |
| RENDERING-044 | interface | state | §8.2 | OK |  |
| RENDERING-045 | rule | state | §8.2 | OK |  |
| RENDERING-046 | rule | state | §8.2 (StyleSheet comment) and §8.9 | OK |  |
| RENDERING-047 | interface | state | §8.2 | OK |  |
| RENDERING-048 | interface | state | §8.2 | OK |  |
| RENDERING-049 | defined-term | state | §8.2 | OK |  |
| RENDERING-050 | rule | state | §8.2 | OK |  |
| RENDERING-051 | acceptance-bar | state | §8.2 | OK | matrix unchanged |
| RENDERING-052 | test | state | §8.2 | OK |  |
| RENDERING-053 | rule | state | §8.2 | OK |  |
| RENDERING-054 | evidence | state | §8.2 | OK |  |
| RENDERING-055 | rule | state | §8.2 | OK | ± 12; [0, 18] / [0, 30] |
| RENDERING-056 | rule | reference | referenced to §6.1 (DETERMINISM-160) | OK | §6.1 registry: style.random creation index = setStyle seq, attempt 0–2 |
| RENDERING-057 | algorithm-step | state | §8.2 | OK | ≤ 300 steps (J-R30) |
| RENDERING-058 | history | history | dropped — history (verbatim in rewrite-rendering-rationale.md; validation record keeps it) | OK | dropped; verbatim in F.5 |
| RENDERING-059 | evidence | state | §8.2 | OK | receipt kept |
| RENDERING-060 | acceptance-bar | state | §8.2 | OK | M3b; ± 8 fallback |
| RENDERING-061 | decision | rationale | J-R30 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R30)" left at §8.2 | OK | J-R30 pointer present; passage in F.5 |
| RENDERING-062 | number | state | §8.2 | OK | role table unchanged |
| RENDERING-063 | evidence | state | §8.2 role values (evidence; "retuned by round 2" narration dropped) | OK | "retuned by round 2" dropped |
| RENDERING-064 | rule | state | §8.2 | OK |  |
| RENDERING-065 | decision | rationale | J-R3 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R3)" left at §8.2 | OK | J-R3 pointer present; passage in F.5 |
| RENDERING-066 | decision | rationale | J-R29 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R29)" left at §8.2 | OK | J-R29 pointer present; passage in F.5 |
| RENDERING-067 | decision | rationale | J-R28 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R28)" left at §8.2 | OK | J-R28 pointer present; passage in F.5 |
| RENDERING-068 | rule | state | §8.2 | OK |  |
| RENDERING-069 | rule | state | §8.2 | OK |  |
| RENDERING-070 | evidence | state | §8.2 | OK |  |
| RENDERING-071 | number | state | §8.2 | OK | symbolisation rows unchanged |
| RENDERING-072 | number | state | §8.2 | OK | unchanged |
| RENDERING-073 | rule | state | §8.2 | OK |  |
| RENDERING-074 | rule | state | §8.2 | OK | VP2-10 tag dropped |
| RENDERING-075 | defined-term | state | §8.2 | OK |  |
| RENDERING-076 | rule | state | §8.2 | OK |  |
| RENDERING-077 | rule | state | §8.2 | OK |  |
| RENDERING-078 | rule | state | §8.2 | OK |  |
| RENDERING-079 | rule | state | §8.2 | OK |  |
| RENDERING-080 | rule | state | §8.2 | OK |  |
| RENDERING-081 | rule | reference | referenced to §2.7 (MODEL-293) | OK | CANON-C01: "every Pin.kind of §2.7"; §2.7 l. 1100 |
| RENDERING-082 | rule | state | §8.2 | OK |  |
| RENDERING-083 | rule | state | §8.2 | OK |  |
| RENDERING-084 | rule | state | §8.2 | VR-R0-7 | relief tier present; the contour clip its home should carry is absent |
| RENDERING-085 | rule | state | §8.2 | OK | multi-colour pick |
| RENDERING-086 | rule | state | §8.2 | OK | 137.5°, 30°, 0.3 |
| RENDERING-087 | rule | state | §8.2 | OK | 0.04 / 0.06 / 0.08 |
| RENDERING-088 | rule | state | §8.2 | OK |  |
| RENDERING-089 | rule | state | §8.2 post operations ("replaces the WebGL2 post hooks" narration dropped) | OK | "replaces WebGL2 hooks" dropped |
| RENDERING-090 | interface | state | §8.2 | OK |  |
| RENDERING-091 | rule | state | §8.2 | OK |  |
| RENDERING-092 | rule | state | §8.2 | OK |  |
| RENDERING-093 | rule | state | §8.2 | OK |  |
| RENDERING-094 | rule | state | §8.2 | OK |  |
| RENDERING-095 | rule | state | §8.2 layer order (lead paragraph) | OK |  |
| RENDERING-096 | number | state | §8.2 layer-order table (RENDERING-C05) | OK | table unchanged; slot 24 title (C05) |
| RENDERING-097 | rule | state | §8.2 | OK |  |
| RENDERING-098 | rule | state | §8.2 (after the table; RENDERING-C05) | OK | l. 5783–5785 |
| RENDERING-099 | test | state | §8.2 (census pointer) / §8.3 draw-order row | OK |  |
| RENDERING-100 | algorithm-step | state | §8.2 | OK | l. 5787–5793 |
| RENDERING-101 | rule | state | §8.2 slot resolution | OK | l. 5793–5795 |
| RENDERING-102 | test | state | §8.2 slot resolution / §8.3 slot-resolution row | OK |  |
| RENDERING-103 | rule | state | §8.2 | OK |  |
| RENDERING-104 | decision | rationale | J-R39 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R39)" left at §8.2 | OK | J-R39 pointer present; passage in F.5 |
| RENDERING-105 | decision | rationale | J-R39 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R39)" left at §8.2 | OK | J-R39 pointer present; passage in F.5 |
| RENDERING-106 | rule | state | §8.2 presets | OK | hysteresis in §8.5 |
| RENDERING-107 | acceptance-bar | state | §8.2 presets (role continuity) | OK | ΔE2000 < 2; M2b / M3b / M5 |
| RENDERING-108 | number | state | §8.2 | OK | preset table unchanged |
| RENDERING-109 | number | state | §8.2 | OK |  |
| RENDERING-110 | number | state | §8.2 | OK | hatched row; II.4 holds the stage-2 additions (R-3 judged) |
| RENDERING-111 | rule | state | §8.2 (faces; ruling §17.2) | OK | "Faces follow §17.2"; face path by §9.2 (l. 6391–6399) |
| RENDERING-112 | rule | state | §8.2 | OK |  |
| RENDERING-113 | rule | state | §8.2 lit paragraph (definition of the light step: §8.4) | OK | 15° / 5° stated in §8.4 (l. 5913–5914) |
| RENDERING-114 | rule | state | §8.2 | OK |  |
| RENDERING-115 | rule | state | §8.2 lit paragraph / §8.10 crown library | OK | §8.10 l. 6311–6312 (once with fixed sun, per light step with path sun) |
| RENDERING-116 | budget | state | §8.2 lit paragraph | OK | ≈ 1.3 ms per 512² tile |
| RENDERING-117 | rule | state | §8.2 | OK |  |
| RENDERING-118 | rule | state | §8.2 | OK | NF-S11 tag (VR-R0-10) |
| RENDERING-119 | decision | rationale | J-R4 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R4)" left at §8.2 | OK | J-R4 pointer present; passage in F.5 |
| RENDERING-120 | test | state | §8.2 | OK |  |
| RENDERING-121 | rule | state | §8.3 catalogue (pin list → §2.7 Pin.kind, CANON-C01; crown count → §8.10) | OK | pins → §2.7; 20 crowns per class per style in §8.10 (l. 6308) |
| RENDERING-122 | rule | state | §8.3 | OK |  |
| RENDERING-123 | rule | state | §8.3 | OK |  |
| RENDERING-124 | defined-term | state | §8.3 | OK |  |
| RENDERING-125 | test | state | §8.3 | OK |  |
| RENDERING-126 | test | state | §8.3 | OK |  |
| RENDERING-127 | test | state | §8.3 | OK |  |
| RENDERING-128 | test | state | §8.3 | OK |  |
| RENDERING-129 | test | state | §8.3 | OK |  |
| RENDERING-130 | test | state | §8.3 | OK |  |
| RENDERING-131 | test | state | §8.3 | OK |  |
| RENDERING-132 | test | state | §8.3 | OK | SCOPE-244's ≥ 95 % is §8.5's metric (l. 5981) |
| RENDERING-133 | test | state | §8.3 | OK |  |
| RENDERING-134 | test | state | §8.3 | OK |  |
| RENDERING-135 | test | state | §8.3 | OK |  |
| RENDERING-136 | test | state | §8.3 | OK |  |
| RENDERING-137 | test | state | §8.3 | OK |  |
| RENDERING-138 | test | state | §8.3 census row (floor values stated in §8.2) | OK | label floor → §8.2 matrix |
| RENDERING-139 | test | state | §8.3 | OK |  |
| RENDERING-140 | test | state | §8.3 | OK |  |
| RENDERING-141 | test | state | §8.3 | OK |  |
| RENDERING-142 | test | state | §8.3 census row (bar stated in §8.2 presets) | OK | bar → §8.2 presets |
| RENDERING-143 | test | state | §8.3 | OK |  |
| RENDERING-144 | test | state | §8.3 | OK | NF-D10 tag (VR-R0-10) |
| RENDERING-145 | test | state | §8.3 | OK |  |
| RENDERING-146 | test | state | §8.3 census row | OK | 1-ms slices = the sliced-raster row's step(1) |
| RENDERING-147 | test | state | §8.3 census row | OK — see VR-R0-12 | census row l. 5871; §13.2 restates it |
| RENDERING-148 | test | state | §8.3 | OK |  |
| RENDERING-149 | test | state | §8.3 | OK |  |
| RENDERING-150 | test | state | §8.3 | OK |  |
| RENDERING-151 | test | state | §8.3 | OK |  |
| RENDERING-152 | test | state | §8.3 | OK |  |
| RENDERING-153 | rule | state | §8.4 | OK |  |
| RENDERING-154 | interface | state | §8.4 (LayerSpec; "gains" narration dropped) | OK | "gains" dropped; tethered |
| RENDERING-155 | rule | state | §8.4 | OK |  |
| RENDERING-156 | rule | reference | referenced to II.6 (PIPELINE-441) | OK | II.6 l. 9076 states the default placement |
| RENDERING-157 | defined-term | state | §8.4 | OK |  |
| RENDERING-158 | defined-term | state | §8.4 | OK |  |
| RENDERING-159 | rule | state | §8.4 | OK |  |
| RENDERING-160 | rule | state | §8.4 | OK |  |
| RENDERING-161 | rule | state | §8.4 | OK |  |
| RENDERING-162 | rule | state | §8.4 | OK |  |
| RENDERING-163 | interface | state | §8.4 | OK |  |
| RENDERING-164 | number | state | §8.4 | OK |  |
| RENDERING-165 | rule | state | §8.4 | OK |  |
| RENDERING-166 | rule | state | §8.4 | OK | 1°; 15° / 5° |
| RENDERING-167 | rule | state | §8.4 | OK |  |
| RENDERING-168 | budget | state | §8.4 budget | OK |  |
| RENDERING-169 | acceptance-bar | state | §8.4 | OK |  |
| RENDERING-170 | budget | state | §8.4 budget (moving sun) | OK |  |
| RENDERING-171 | acceptance-bar | state | §8.4 | OK |  |
| RENDERING-172 | mechanism | state | §8.4 light steps | OK | settle bound → §12.5 (≤ 150 / ≤ 250 ms, l. 7281–7282) |
| RENDERING-173 | rule | state | §8.4 light steps | OK |  |
| RENDERING-174 | defined-term | state | §8.4 light steps (NR5-1: passed as TileRasterOpts.lightStep) | OK | NR5-1: passed as TileRasterOpts.lightStep |
| RENDERING-175 | acceptance-bar | state | §8.4 light steps (crown-bake bar → §12.7) | OK | crown bake → §12.7 (≤ 20 ms, l. 7355) |
| RENDERING-176 | decision | rationale | J-R54 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R54)" left at §8.4 | OK | J-R54 pointer present; passage in F.5 |
| RENDERING-177 | decision | rationale | J-R54 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R54)" left at §8.4 | OK | J-R54 pointer present; passage in F.5 |
| RENDERING-178 | rule | reference | referenced to §2.6 (MODEL-269) | OK | pointer to §2.6 |
| RENDERING-179 | rule | state | §8.5 | OK |  |
| RENDERING-180 | rule | state | §8.5 | OK |  |
| RENDERING-181 | defined-term | state | §8.5 | OK |  |
| RENDERING-182 | rule | state | §8.5 | OK |  |
| RENDERING-183 | rule | state | §8.5 | OK |  |
| RENDERING-184 | algorithm-step | state | §8.5 | OK |  |
| RENDERING-185 | rule | state | §8.5 | OK |  |
| RENDERING-186 | acceptance-bar | state | §8.5 metrics (sentence untangled; values unchanged) | OK | values unchanged, sentence untangled |
| RENDERING-187 | rule | reference | §8.5 metrics (road/ground rule) + referenced to §13.5 for the cover report (SCOPE-267) | OK | §13.5 l. 7933 keeps MFCG 0.60–0.64 |
| RENDERING-188 | acceptance-bar | state | §8.5 | OK |  |
| RENDERING-189 | decision | rationale | J-R5 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R5)" left at §8.5 | OK | J-R5 pointer present; passage in F.5 |
| RENDERING-190 | rule | state | §8.5 | OK |  |
| RENDERING-191 | acceptance-bar | state | §8.5 | OK | ≥ 95 % |
| RENDERING-192 | rule | state | §8.5 | OK |  |
| RENDERING-193 | decision | rationale | J-R6 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R6)" left at §8.5 | OK | J-R6 pointer present; passage in F.5 |
| RENDERING-194 | rule | state | §8.5 | OK |  |
| RENDERING-195 | rule | reference | §8.5 first paint (preview-style clause kept; proxies → §7.8, DETERMINISM-585) | OK | preview-style clause kept (rewrite Homes chosen 7) |
| RENDERING-196 | decision | rationale | J-R7 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R7)" left at §8.5 | OK | J-R7 pointer present; passage in F.5 |
| RENDERING-197 | rule | state | §8.6 | OK |  |
| RENDERING-198 | rule | state | §8.6 | OK |  |
| RENDERING-199 | rule | state | §8.6 | OK |  |
| RENDERING-200 | rule | state | §8.6 (one clause) / §8.9 threads (3) | OK | §8.9 threads (3): "no model and no terrain" |
| RENDERING-201 | rule | state | §8.6 | OK |  |
| RENDERING-202 | rule | state | §8.6 (cache key: §8.1 item 5) | OK |  |
| RENDERING-203 | rule | state | §11.1 SVG row ("city band by default"); §8.7 points | OK | §11.1 SVG row: "the city band by default" |
| RENDERING-204 | rule | state | §8.7 | OK |  |
| RENDERING-205 | rule | state | §11.1 VTT row (model widths) and .dd2vtt scope (grid default, 0 px per cell); §8.7 points | OK | §11.1 VTT row + .dd2vtt scope (5 ft = 1.5 m at 100 px; 0 px per cell) |
| RENDERING-206 | acceptance-bar | state | §9.5 scale bar; §8.7 points | OK | §9.5 scale bar (l. 6547–6548) |
| RENDERING-207 | rule | state | §8.8 pyramid | OK |  |
| RENDERING-208 | rule | state | §8.8 | OK |  |
| RENDERING-209 | rule | state | §8.8 | OK |  |
| RENDERING-210 | rule | state | §8.8 | OK |  |
| RENDERING-211 | test | state | §8.8 content (tests are §8.3 rows 132, 141) | OK |  |
| RENDERING-212 | mechanism | state | §8.8 composition (re-compose cost stated once in §12.5 F(B)) | OK | re-compose cost in §12.5's F(B) (≈ 0.1 ms + ≈ 1 µs per glyph) |
| RENDERING-213 | rule | state | §8.8 | OK |  |
| RENDERING-214 | decision | rationale | J-R21 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R21)" left at §8.8 | OK | J-R21 pointer present; passage in F.5 |
| RENDERING-215 | rule | state | §8.8 cache and invalidation (RENDERING-C02) | OK | NR5-1-consistent tile key |
| RENDERING-216 | rule | state | §8.8 | OK |  |
| RENDERING-217 | rule | state | §8.8 | OK |  |
| RENDERING-218 | budget | state | §8.8 canvas budget (NR5-1: an export-held crown set counts in §12.8) | OK | NR5-1 held set noted (size: VR-R0-9) |
| RENDERING-219 | budget | state | §8.8 | OK |  |
| RENDERING-220 | budget | state | §8.8 | OK |  |
| RENDERING-221 | evidence | state | §8.8 | OK | P = 35; 112 / 156; 43 / 67 MB |
| RENDERING-222 | rule | state | §8.8 | OK |  |
| RENDERING-223 | rule | state | §8.8 canvas budget (tile count → §12.1, RENDERING-C04) | OK | C04: "(§12.1)"; §12.1 states 32 tiles ≈ 40 ms |
| RENDERING-224 | decision | rationale | J-R22 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R22)" left at §8.8 | OK | J-R22 pointer present; passage in F.5 |
| RENDERING-225 | rule | state | §8.8 | OK |  |
| RENDERING-226 | rule | state | §8.8 | OK |  |
| RENDERING-227 | decision | rationale | J-R8 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R8)" left at §8.8 | OK | ± 9 % kept in §8.8 pyramid |
| RENDERING-228 | mechanism | state | §8.8 | OK |  |
| RENDERING-229 | budget | state | §8.8 | OK |  |
| RENDERING-230 | rule | state | §8.8 warp preview (budget → §12.6, RENDERING-C08) | OK | C08: frame rate → §12.6 |
| RENDERING-231 | rule | state | §8.9 | OK |  |
| RENDERING-232 | rule | state | §8.9 first bullet (one clause → §11.1) | OK |  |
| RENDERING-233 | rule | state | §8.9 | OK |  |
| RENDERING-234 | acceptance-bar | state | §8.9 | OK |  |
| RENDERING-235 | rule | state | §8.9 | OK |  |
| RENDERING-236 | decision | rationale | J-R9 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R9)" left at §8.9 | OK | J-R9 pointer present; passage in F.5 |
| RENDERING-237 | acceptance-bar | state | §8.9 text (measurement, fallback); budget number → §12.7 | OK | budget → §12.7 (≤ 3 ms at ≤ 150 runs) |
| RENDERING-238 | rule | state | §8.9 threads (1) (export detail → §11.1) | OK | export detail → §8.1 item 6 / §11.1 |
| RENDERING-239 | rule | state | §8.9 threads (2) (pool size → §4.1) | OK |  |
| RENDERING-240 | rule | state | §8.9 threads (3) | OK |  |
| RENDERING-241 | rule | state | §8.9 | OK |  |
| RENDERING-242 | interface | state | §8.9 | OK |  |
| RENDERING-243 | interface | state | §8.9 | OK |  |
| RENDERING-244 | interface | state | §8.9 | OK |  |
| RENDERING-245 | interface | state | §8.9 | OK |  |
| RENDERING-246 | interface | state | §8.9 what-crosses row (NR5-1) | OK | NR5-1 request row (l. 6136) |
| RENDERING-247 | interface | state | §8.9 | OK |  |
| RENDERING-248 | budget | state | §8.9 | OK |  |
| RENDERING-249 | rule | state | §8.9 | OK |  |
| RENDERING-250 | type | state | §8.9 | OK |  |
| RENDERING-251 | interface | state | §8.9 TileRasterOpts (NR5-1) | OK | NR5-1: lightStep (l. 6148–6151) |
| RENDERING-252 | interface | state | §8.9 | OK — see VR-R0-1 | TileBackend, RasterJob in §8.9; VectorBackend (SCOPE-384) declared nowhere |
| RENDERING-253 | algorithm-step | state | §8.9 | OK | ≤ 80 Path2D → §12.5 (l. 7290) |
| RENDERING-254 | rule | state | §8.9 | OK |  |
| RENDERING-255 | rule | state | §8.9 | OK |  |
| RENDERING-256 | number | state | §8.9 | OK |  |
| RENDERING-257 | mechanism | state | §8.9 queue (NR5-1: class-4 crown bake) | OK | NR5-1 class-4 crown bake (l. 6184) |
| RENDERING-258 | rule | state | §8.9 | OK |  |
| RENDERING-259 | rule | state | §8.9 | OK |  |
| RENDERING-260 | budget | state | §8.9 queue (settle bounds → §12.5) | OK | settle figures → §12.5 (≈ 42 / 83 ms; 150 / 250 ms) |
| RENDERING-261 | rule | state | §8.9 | OK |  |
| RENDERING-262 | mechanism | state | §8.9 "stepped like a raster" (unit definition → §9.2) | OK | unit definition in §9.2 (l. 6438–6447) |
| RENDERING-263 | budget | state | §8.9 (print placement budget → §12.7) | OK | print placement → §12.7 (≤ 20 ms / 20 000) |
| RENDERING-264 | rule | state | §8.9 | OK |  |
| RENDERING-265 | budget | state | §8.9 | OK |  |
| RENDERING-266 | rule | state | §8.9 | OK |  |
| RENDERING-267 | acceptance-bar | state | §8.9 queries measurement; the export-beside-the-view run → §12.7 (RENDERING-575) | OK | export run → §12.7 (l. 7394–7398) |
| RENDERING-268 | acceptance-bar | state | §8.9 | OK |  |
| RENDERING-269 | decision | rationale | J-R40 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R40)" left at §8.9 | OK | J-R40 pointer present; passage in F.5 |
| RENDERING-270 | decision | rationale | J-R40 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R40)" left at §8.9 | OK | J-R40 pointer present; passage in F.5 |
| RENDERING-271 | decision | rationale | J-R46 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R46)" left at §8.9 | OK | J-R46 pointer present; passage in F.5 |
| RENDERING-272 | decision | rationale | J-R51 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R51)" left at §8.9 | OK | J-R51 pointer present; passage in F.5 |
| RENDERING-273 | decision | rationale | J-R10 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R10)" left at §8.9 | OK | J-R10 pointer present; passage in F.5 |
| RENDERING-274 | decision | rationale | J-R23 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R23)" left at §8.9 | OK | J-R23 pointer present; passage in F.5 |
| RENDERING-275 | interface | state | §8.10 | OK |  |
| RENDERING-276 | rule | state | §8.10 | OK — see VR-R0-11 | §8.10 l. 6221–6228; §4.9 row disagrees (grid vs line) |
| RENDERING-277 | rule | state | §8.10 (canon home; §4.9 also gives the ranges in m) | OK | §4.9 gloss in cm; values agree with §4.9 |
| RENDERING-278 | number | state | §8.10 | OK |  |
| RENDERING-279 | defined-term | state | §8.10 | OK |  |
| RENDERING-280 | rule | state | §8.10 | OK |  |
| RENDERING-281 | invariant | state | §8.10 | OK |  |
| RENDERING-282 | evidence | state | §8.10 tiles (evidence) | OK |  |
| RENDERING-283 | rule | state | §8.10 | OK |  |
| RENDERING-284 | rule | state | §8.10 | OK | KERNEL-038's 4 m = r₀ = 400 cm |
| RENDERING-285 | rule | state | §8.10 | OK |  |
| RENDERING-286 | rule | reference | referenced to §6.1 (DETERMINISM-161); key words and zero components kept in §8.10 | OK | §6.1 registry holds the key words (l. 4176–4180); zeros and finaliser kept in §8.10 |
| RENDERING-287 | algorithm-step | state | §8.10 | OK |  |
| RENDERING-288 | algorithm-step | state | §8.10 | OK |  |
| RENDERING-289 | algorithm-step | state | §8.10 | OK |  |
| RENDERING-290 | rule | state | §8.10 | OK |  |
| RENDERING-291 | number | state | §8.10 | OK |  |
| RENDERING-292 | decision | rationale | J-R50 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R50)" left at §8.10 | OK | J-R50 pointer present; passage in F.5 |
| RENDERING-293 | decision | rationale | J-R50 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R50)" left at §8.10 | OK | J-R50 pointer present; passage in F.5 |
| RENDERING-294 | interface | state | §8.10 | OK |  |
| RENDERING-295 | rule | state | §8.10 | OK |  |
| RENDERING-296 | acceptance-bar | state | §8.10 | OK |  |
| RENDERING-297 | rule | reference | §8.10 asset (view-shift record → §13.3, SCOPE-236) | OK | §13.3 records the view shift and the style bump |
| RENDERING-298 | history | history | dropped — history (verbatim in rewrite-rendering-rationale.md; validation record keeps it) | OK | dropped; verbatim in F.5 |
| RENDERING-299 | decision | rationale | J-R42 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R42)" left at §8.10 | OK | J-R42 pointer present; passage in F.5 |
| RENDERING-300 | algorithm-step | state | §8.10 | OK |  |
| RENDERING-301 | algorithm-step | state | §8.10 | OK |  |
| RENDERING-302 | invariant | state | §8.10 | OK |  |
| RENDERING-303 | defined-term | state | §8.10 | OK |  |
| RENDERING-304 | rule | state | §8.10 | OK |  |
| RENDERING-305 | decision | rationale | J-R52 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R52)" left at §8.10 | OK | J-R52 pointer present; passage in F.5 |
| RENDERING-306 | algorithm-step | state | §8.10 | OK |  |
| RENDERING-307 | algorithm-step | state | §8.10 | OK |  |
| RENDERING-308 | rule | state | §8.10 | OK |  |
| RENDERING-309 | rule | state | §8.10 | OK |  |
| RENDERING-310 | rule | state | §8.10 | OK |  |
| RENDERING-311 | rule | state | §8.10 per-instance look (NR5-1: export-held set) | OK | NR5-1: export-held set (l. 6313) |
| RENDERING-312 | interface | reference | referenced to §7.1 (DETERMINISM-321); op semantics kept in §8.10 edits | OK | §7.1 declares the instance event (l. 4646) |
| RENDERING-313 | rule | state | §8.10 | OK | NF-D11 tag (VR-R0-10) |
| RENDERING-314 | rule | state | §8.10 | OK |  |
| RENDERING-315 | rule | state | §8.10 | OK |  |
| RENDERING-316 | decision | rationale | J-R24 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R24)" left at §8.10 | OK | J-R24 pointer present; passage in F.5 |
| RENDERING-317 | rule | state | §8.10 | OK |  |
| RENDERING-318 | budget | state | §12.7 trees (budgets stated once); §8.10 points | OK | budgets stated once in §12.7 (l. 7348–7357) |
| RENDERING-319 | decision | rationale | J-R11 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R11)" left at §8.10 | OK | J-R11 pointer present; passage in F.5 |
| RENDERING-320 | decision | rationale | J-R25 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R25)" left at §8.10 | OK | J-R25 pointer present; passage in F.5 |
| RENDERING-321 | decision | rationale (new) | J-R55 (new row) — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R55)" left at §8.10 | OK | J-R55 pointer present; passage in F.5 |
| RENDERING-322 | decision | rationale | J-R48 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R48)" left at §8.10 | OK | J-R48 pointer present; passage in F.5 |
| RENDERING-323 | decision | rationale | J-R50 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R50)" left at §8.10 | OK | J-R50 pointer present; passage in F.5 |
| RENDERING-324 | summary | state | §9 intro | OK |  |
| RENDERING-325 | rule | state | §9.1 | OK |  |
| RENDERING-326 | interface | state | §9.1 (RENDERING-C05: title sentence) | OK | C05 title sentence (l. 6372–6373) |
| RENDERING-327 | interface | state | §9.1 | OK |  |
| RENDERING-328 | interface | state | §9.1 | OK |  |
| RENDERING-329 | interface | state | §9.1 | OK |  |
| RENDERING-330 | rule | state | §9.1 | OK |  |
| RENDERING-331 | rule | state | §9.1 view bullet → §9.2 pin pass | OK | pin-pass rule in §9.2 |
| RENDERING-332 | rule | reference | referenced to §7.4 (DETERMINISM-514) | OK | §7.4 carries pinned labels (mean-value, re-seat, orphan) |
| RENDERING-333 | rule | state | §9.1 | OK |  |
| RENDERING-334 | test | reference | referenced to §13.3 (SCOPE-240) | OK | §13.3 golden run |
| RENDERING-335 | rule | reference | referenced to §7.1 (DETERMINISM-328) | OK | §7.1 events |
| RENDERING-336 | decision | rationale | J-R12 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R12)" left at §9.1 | OK | J-R12 pointer present; passage in F.5 |
| RENDERING-337 | rule | state | §9.2 metrics (face named in §8.2 / §17.2) | OK |  |
| RENDERING-338 | test | state | §9.2 | OK |  |
| RENDERING-339 | rule | state | §9.2 font features (+ J-R37 index) | OK |  |
| RENDERING-340 | rule | state | §9.2 | OK |  |
| RENDERING-341 | rule | state | §9.2 | OK |  |
| RENDERING-342 | rule | state | §9.2 | OK |  |
| RENDERING-343 | rule | state | §9.2 candidate set (quarter-candidate rule stated once in §9.4 rung (5)) | OK | quarter-candidate rule stated once in §9.4 rung (5) |
| RENDERING-344 | rule | state | §9.2 greedy (RENDERING-C05, -C06) | OK | C05 / C06 applied (l. 6412–6413) |
| RENDERING-345 | rule | state | §9.2 | OK |  |
| RENDERING-346 | interface | state | §9.2 LabelRows / LabelPlacer (NR5-2) | OK | NR5-2: LabelRows (l. 6421–6429) |
| RENDERING-347 | interface | state | §9.2 | OK |  |
| RENDERING-348 | algorithm-step | state | §9.2 resumable placement | OK | l. 6438–6443 |
| RENDERING-349 | rule | state | §9.2 resumable placement | OK |  |
| RENDERING-350 | rule | state | §9.2 resumable placement | OK | l. 6447–6451 |
| RENDERING-351 | rule | state | §9.2 | OK |  |
| RENDERING-352 | rule | state | §9.2 | OK |  |
| RENDERING-353 | rule | state | §9.2 | OK |  |
| RENDERING-354 | rule | state | §9.2 | OK |  |
| RENDERING-355 | test | state | §9.2 | OK |  |
| RENDERING-356 | rule | state | §9.2 | OK |  |
| RENDERING-357 | rule | state | §9.2 | OK |  |
| RENDERING-358 | budget | state | §12.7 labels (budget stated once); §9.2 points | OK | budget → §12.7 (≤ 2 ms / 2 000; ≈ 1 µs) |
| RENDERING-359 | decision | rationale | J-R26 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R26)" left at §9.2 | OK | J-R26 pointer present; passage in F.5 |
| RENDERING-360 | decision | rationale | J-R45 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R45)" left at §9.2 | OK | J-R45 pointer present; passage in F.5 |
| RENDERING-361 | decision | rationale | J-R45 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R45)" left at §9.2 | OK | J-R45 pointer present; passage in F.5 |
| RENDERING-362 | decision | rationale | J-R27 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R27)" left at §9.2 | OK | pointer sits at §9.4 rung (5), l. 6515 |
| RENDERING-363 | decision | rationale | J-R51 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R51)" left at §9.2 | OK | J-R51 pointer present; passage in F.5 |
| RENDERING-364 | algorithm-step | state | §9.3 | OK |  |
| RENDERING-365 | acceptance-bar | reference | referenced to §13.7 (SCOPE-326) | VR-R0-13 | pointer to §13.7 present; fallback meaning changed |
| RENDERING-366 | rule | state | §9.3 | OK |  |
| RENDERING-367 | rule | state | §9.3 | OK |  |
| RENDERING-368 | rule | state | §9.3 | OK |  |
| RENDERING-369 | rule | state | §9.3 | OK |  |
| RENDERING-370 | acceptance-bar | state | §9.4 | OK |  |
| RENDERING-371 | algorithm-step | state | §9.4 | OK |  |
| RENDERING-372 | rule | state | §9.4 rung (5) | OK |  |
| RENDERING-373 | rule | reference | referenced to §4.5 (PIPELINE-199) | OK | §4.5 states the merge rule (1 000 / 10 000 ha) |
| RENDERING-374 | rule | state | §9.4 | OK |  |
| RENDERING-375 | rule | state | §9.4 quarters | OK |  |
| RENDERING-376 | rule | state | §9.4 halo (floor values in §8.2) | OK | floor → §8.2 row |
| RENDERING-377 | evidence | state | §9.4 | OK |  |
| RENDERING-378 | rule | state | §9.4 | OK |  |
| RENDERING-379 | decision | rationale | J-R28 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R28)" left at §9.4 | OK | J-R28 pointer present; passage in F.5 |
| RENDERING-380 | acceptance-bar | state | §9.4 acceptance (CANON-C06 clause removed) | OK | C06: 5 % inference dropped |
| RENDERING-381 | acceptance-bar | state | §9.4 | OK |  |
| RENDERING-382 | history | history | dropped — history (verbatim in rewrite-rendering-rationale.md; validation record keeps it) | OK | dropped; verbatim in F.5 |
| RENDERING-383 | acceptance-bar | state | §9.5 scale bar (merged with RENDERING-206) | OK | 100 m bar, 0.5 % (merged with 206) |
| RENDERING-384 | rule | state | §9.5 | OK | NF-D12 tag (VR-R0-10) |
| RENDERING-385 | algorithm-step | state | §9.5 | OK |  |
| RENDERING-386 | rule | state | §9.5 | OK |  |
| RENDERING-387 | rule | state | §9.5 | OK |  |
| RENDERING-388 | rule | state | §9.5 title (RENDERING-C05) | OK | title text source named (C05) |
| RENDERING-389 | rule | state | §9.5 | OK |  |
| RENDERING-390 | interface | state | §9.5 | OK |  |
| RENDERING-391 | rule | state | §9.5 | OK | NF-D12 tag (VR-R0-10) |
| RENDERING-392 | decision | rationale | J-R13 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R13)" left at §9.5 | OK | J-R13 pointer present; passage in F.5 |
| RENDERING-393 | rule | state | §9.5 | OK |  |
| RENDERING-394 | rule | state | §9.5 | OK |  |
| RENDERING-395 | rule | state | §9.5 | OK |  |
| RENDERING-396 | rule | reference | referenced to §6.3 (DETERMINISM-224) | OK | §6.3 four draw cases (l. 4364–4379) |
| RENDERING-397 | rule | state | §9.6 | OK |  |
| RENDERING-398 | rule | reference | referenced to §6.3 (DETERMINISM-232) | OK | §6.3 carrying rule and non-inputs (l. 4384–4397) |
| RENDERING-399 | rule | state | §9.6 | OK |  |
| RENDERING-400 | test | state | §9.6 | OK |  |
| RENDERING-401 | summary | state | §11 intro | OK |  |
| RENDERING-402 | rule | moved out | referenced to §13.2 (MODEL-430, moved out) | OK | §13.2 l. 7649–7650 |
| RENDERING-403 | rule | state | §11.1 | OK |  |
| RENDERING-404 | rule | state | §11.1 | OK |  |
| RENDERING-405 | rule | state | §11.1 GeoJSON row | OK |  |
| RENDERING-406 | rule | state | §11.1 GeoJSON row | OK |  |
| RENDERING-407 | test | state | §11.1 GeoJSON row | OK |  |
| RENDERING-408 | rule | state | §11.1 SVG row | OK |  |
| RENDERING-409 | rule | state | §11.1 SVG row | OK |  |
| RENDERING-410 | budget | state | §12.7 SVG (budgets stated once); §11.1 points | OK | budgets stated once in §12.7 (l. 7361–7366) |
| RENDERING-411 | test | state | §11.1 SVG row (notes) | OK |  |
| RENDERING-412 | rule | state | §11.1 | OK |  |
| RENDERING-413 | rule | state | §11.1 | OK |  |
| RENDERING-414 | rule | state | §11.1 | OK |  |
| RENDERING-415 | rule | state | §11.1 | OK |  |
| RENDERING-416 | rule | state | §11.1 | OK |  |
| RENDERING-417 | rule | state | §11.1 | OK |  |
| RENDERING-418 | test | state | §11.1 | OK |  |
| RENDERING-419 | rule | state | §11.1 | OK |  |
| RENDERING-420 | rule | reference | referenced to §6.4 (DETERMINISM-269) | OK | §6.4 format and refusal rule (l. 4485–4513) |
| RENDERING-421 | rule | state | §11.1 | OK |  |
| RENDERING-422 | algorithm-step | state | §11.1 | OK |  |
| RENDERING-423 | number | state | §11.1 | OK |  |
| RENDERING-424 | rule | state | §11.1 | OK |  |
| RENDERING-425 | rule | state | §11.1 | OK |  |
| RENDERING-426 | decision | rationale | J-R31 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R31)" left at §11.1 | OK | J-R31 pointer present; passage in F.5 |
| RENDERING-427 | rule | state | §11.1 SVG row (text option merged in) | OK | merged into the SVG row |
| RENDERING-428 | decision | rationale | J-R32 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R32)" left at §11.1 | OK | J-R32 pointer present; passage in F.5 |
| RENDERING-429 | rule | state | §11.1 | OK |  |
| RENDERING-430 | mechanism | state | §11.1 where exports run (≈ 21 / ≈ 54 ms → §12.7) | OK | ≈ 21 / ≈ 54 ms in §12.7 |
| RENDERING-431 | budget | state | §11.1 (→ §12.7 time, §12.8 peak) | OK | ≤ 2 s → §12.7; ≈ 1.9 KB → §12.8 |
| RENDERING-432 | mechanism | state | §11.1 where exports run (NR5-1) | OK | NR5-1 look and view state (l. 6832–6839) |
| RENDERING-433 | rule | state | §11.1 where exports run (NR5-1: look and view state too) | OK | NR5-1 extended (l. 6840–6842) |
| RENDERING-434 | decision | rationale | J-R41 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R41)" left at §11.1 | OK | J-R41 pointer present; passage in F.5 |
| RENDERING-435 | decision | rationale | J-R47 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R47)" left at §11.1 | OK | J-R47 pointer present; passage in F.5 |
| RENDERING-436 | interface | state | §11.1 | OK | ranges in bracket notation |
| RENDERING-437 | evidence | state | §11.1 | OK |  |
| RENDERING-438 | rule | state | §11.1 | OK |  |
| RENDERING-439 | acceptance-bar | state | §11.1 | OK |  |
| RENDERING-440 | decision | rationale | J-R43 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R43)" left at §11.1 | OK | J-R43 pointer present; passage in F.5 |
| RENDERING-441 | rule | state | §11.1 | OK |  |
| RENDERING-442 | rule | state | §11.1 .dd2vtt profile | OK | 5 ft = 1.5 m at 100 px; 0 px per cell |
| RENDERING-443 | interface | state | §11.1 .dd2vtt profile | OK |  |
| RENDERING-444 | rule | state | §11.1 .dd2vtt profile | OK |  |
| RENDERING-445 | decision | rationale | J-R14 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R14)" left at §11.1 | OK | J-R14 pointer present; passage in F.5 |
| RENDERING-446 | type | state | §11.2 | OK |  |
| RENDERING-447 | interface | state | §11.2 | OK | NF-D14 tag (VR-R0-10) |
| RENDERING-448 | type | state | §11.2 ApplyResult (logHead → §11.3) | OK | logHead → §11.3 |
| RENDERING-449 | type | state | §11.2 | OK |  |
| RENDERING-450 | type | state | §11.2 | OK |  |
| RENDERING-451 | interface | state | §11.2 | OK |  |
| RENDERING-452 | rule | reference | §11.2 confirming fates (API part); semantics referenced to §7.3 item 4 (DETERMINISM-455) | OK | NF-D14 tag (VR-R0-10); §7.3 item 4 semantics |
| RENDERING-453 | rule | state | §11.2 | OK |  |
| RENDERING-454 | decision | rationale | J-R33 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R33)" left at §11.2 | OK | J-R33 pointer present; passage in F.5 |
| RENDERING-455 | budget | state | §11.2 | OK |  |
| RENDERING-456 | rule | state | §11.2 | OK |  |
| RENDERING-457 | rule | state | §11.2 | OK |  |
| RENDERING-458 | rule | state | §11.2 engine (CANON-C04) | OK | CANON-C04 ("not a kernel result, §3.1") |
| RENDERING-459 | interface | state | §11.3 | OK |  |
| RENDERING-460 | interface | state | §11.3 | OK |  |
| RENDERING-461 | defined-term | state | §11.3 logHead (canonical home) | OK | canonical home of logHead |
| RENDERING-462 | rule | state | §11.3 | OK |  |
| RENDERING-463 | rule | state | §11.3 | OK |  |
| RENDERING-464 | test | state | §11.3 | OK |  |
| RENDERING-465 | rule | state | §11.3 version handshake | OK |  |
| RENDERING-466 | rule | reference | referenced to §2.9 view state (MODEL-428); §11.3 keeps the bridge messages | OK | §2.9 view section lists the keys (l. 1516–1519) |
| RENDERING-467 | rule | reference | referenced to §10.3 (PIPELINE-387); one clause kept in §11.3 | OK | §10.3 (l. 6707–6709): "neither changes the model or logs an event" |
| RENDERING-468 | rule | state | §11.3 | OK |  |
| RENDERING-469 | decision | rationale | J-R34 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R34)" left at §11.3 | OK | J-R34 pointer present; passage in F.5 |
| RENDERING-470 | rule | state | §11.3 | OK |  |
| RENDERING-471 | rule | state | §11.3 roles — bridged load verification | VR-R0-6 | policy present; lacks "records its root at h₀" and "≤ 3 MB" |
| RENDERING-472 | rule | state | §11.3 | VR-R0-5 | Logging bullet present; "author: 'host'" (DETERMINISM-378) lost |
| RENDERING-473 | rule | state | §11.4 | OK |  |
| RENDERING-474 | rule | reference | referenced to §2.9 pack-set cap (MODEL-379) | OK | §2.9 pack cap (l. 1330–1336) |
| RENDERING-475 | rule | reference | referenced to Staged by the owner's roadmap (SCOPE-552) | OK | *Staged* holds the SettlementForge inputs |
| RENDERING-476 | decision | state | §11.5 | OK |  |
| RENDERING-477 | interface | state | §11.5 | OK |  |
| RENDERING-478 | decision | rationale | J-R15 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R15)" left at §11.5 | OK | J-R15 pointer present; passage in F.5 |
| RENDERING-479 | decision | rationale | J-R16 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R16)" left at §11.5 | OK | J-R16 pointer present; passage in F.5 |
| RENDERING-480 | summary | state | §12 intro (canonical figures: 58 800 not 59 000) | OK | canonical figures (58 800) |
| RENDERING-481 | defined-term | state | §12.1 | OK |  |
| RENDERING-482 | evidence | state | §12.1 | OK |  |
| RENDERING-483 | rule | state | §12.1 | OK |  |
| RENDERING-484 | defined-term | state | §12.1 | OK |  |
| RENDERING-485 | defined-term | state | §12.1 calibration (32 tiles, ≈ 40 ms; RENDERING-C04) | OK | C04: 32 tiles, ≈ 40 ms |
| RENDERING-486 | rule | state | §12.1 | OK |  |
| RENDERING-487 | rule | state | §12.1 | OK |  |
| RENDERING-488 | rule | state | §12.1 | OK |  |
| RENDERING-489 | budget | state | §12.1 | OK | ± 15 % in the "where measured" bullet |
| RENDERING-490 | decision | rationale | J-R49 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R49)" left at §12.1 | OK | J-R49 pointer present; passage in F.5 |
| RENDERING-491 | rule | state | §12.1 (rule kept; each of §12.3, §12.5, §12.7, §12.8 states its own milestones) | OK | rule kept; each of §12.3, §12.5, §12.7, §12.8 names its milestones |
| RENDERING-492 | rule | state | §12.1 | OK |  |
| RENDERING-493 | number | state | §12.2 table (CANON-C03 header) | VR-R0-8 | table present, C03 header applied; restates §1.1's columns |
| RENDERING-494 | number | state | §12.2 | OK |  |
| RENDERING-495 | rule | state | §12.2 | OK |  |
| RENDERING-496 | rule | reference | referenced to §1.1 (SCOPE-076) | OK | §1.1 LadderRouter paragraph (l. 187–190) |
| RENDERING-497 | evidence | state | §12.2 | OK |  |
| RENDERING-498 | history | history | dropped — history (verbatim in rewrite-rendering-rationale.md; validation record keeps it) | OK | dropped; verbatim in F.5 |
| RENDERING-499 | rule | reference | referenced to §4.1 (PIPELINE-044); configuration sentence kept in §12.3 | OK | §4.1 states the pooled stages' order and inputs; §6.3 the merge order |
| RENDERING-500 | rule | state | §12.3 | OK | pool sizes 0–3 in the golden run (l. 7166) |
| RENDERING-501 | budget | state | §12.3 | OK |  |
| RENDERING-502 | budget | state | §12.3 | OK | 1.25 × max clause (l. 7134–7135) |
| RENDERING-503 | rule | state | §12.3 | OK |  |
| RENDERING-504 | budget | state | §12.3 | OK |  |
| RENDERING-505 | rule | state | §12.2 (default request defined once) + §12.3 values | OK | default request defined once in §12.2; band ends in §12.5 |
| RENDERING-506 | decision | state | §12.3 declared ("as D-18 did before" dropped) | OK | "as D-18 did before" dropped |
| RENDERING-507 | acceptance-bar | state | §12.3 | OK |  |
| RENDERING-508 | acceptance-bar | state | §12.3 | OK |  |
| RENDERING-509 | test | state | §12.3 | OK | "+ 10 %" = sweep rule ≤ 1.10 |
| RENDERING-510 | rule | state | §12.3 | OK |  |
| RENDERING-511 | evidence | state | §12.3 | OK |  |
| RENDERING-512 | decision | rationale | J-R44 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R44)" left at §12.3 | OK | J-R44 pointer present; passage in F.5 |
| RENDERING-513 | test | state | §12.3 | OK |  |
| RENDERING-514 | acceptance-bar | state | §12.3 | OK |  |
| RENDERING-515 | decision | rationale (new) | J-R56 (new row) — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R56)" left at §12.3 | OK | J-R56 pointer present; passage in F.5 |
| RENDERING-516 | budget | state | §12.4 S1 row (mechanism → §4.2, CANON-C05) | OK | mechanism → §4.2 S1 (C05); work and rates kept |
| RENDERING-517 | budget | state | §12.4 S2/S3 row ("moved from S4/S5" dropped) | OK | "moved from S4/S5" dropped; NF-P1 tag (VR-R0-10) |
| RENDERING-518 | budget | state | §12.4 S4 row (mechanism → §4.3) | OK | mechanism → §4.3 (C05) |
| RENDERING-519 | budget | state | §12.4 S5 row | OK | KERNEL-322's 12 µs is the S8 row's |
| RENDERING-520 | budget | state | §12.4 S6 row (mechanism → §4.5, CANON-C05) | OK | mechanism → §4.5 (C05) |
| RENDERING-521 | budget | state | §12.4 S7, S8, S9 rows | OK — see VR-R0-3 | S7, S8 (≈ 12 µs per cut), S9 (25 ms) rows |
| RENDERING-522 | budget | state | §12.4 S7b/S10a and S12a rows | OK | mechanism → §4.5, §4.7, §4.9 |
| RENDERING-523 | budget | state | §12.4 S10 (0) row | VR-R0-2 | S10 (0) row keeps 5 ms and the mechanism; the ≈ 3 + ≈ 2.3 ms split is gone |
| RENDERING-524 | budget | state | §12.4 pooled row (CANON-C05) | VR-R0-3 | row present (S11 ≤ 3 µs share, 25 µs compound); KERNEL-318's one-district S9 bar lost |
| RENDERING-525 | budget | state | §12.4 hinterland row (CANON-C05) | OK | open-field strips → §4.9 |
| RENDERING-526 | budget | state | §12.4 merge row | OK | mechanism → §4.1, §3.3 |
| RENDERING-527 | budget | state | §12.4 S13a, statistics, digest, critical path, S14 rows | OK |  |
| RENDERING-528 | rule | state | §12.4 stated assumptions | OK |  |
| RENDERING-529 | rule | state | §12.4 stated assumptions | OK |  |
| RENDERING-530 | history | history | dropped — history (verbatim in rewrite-rendering-rationale.md; validation record keeps it) | OK | dropped; verbatim in F.5 |
| RENDERING-531 | budget | state | §12.4 stated assumptions (single-worker, METROPOLIS, TOWN) | OK |  |
| RENDERING-532 | history | history | dropped — history (verbatim in rewrite-rendering-rationale.md; validation record keeps it) | OK | one-line PLAUSIBLE status kept |
| RENDERING-533 | acceptance-bar | state | §12.4 M0 spike | OK |  |
| RENDERING-534 | rule | state | §12.5 | OK |  |
| RENDERING-535 | budget | state | §12.5 | OK |  |
| RENDERING-536 | budget | state | §12.5 | OK |  |
| RENDERING-537 | rule | state | §12.2 (default request defined once); §12.5 points | OK | defined once in §12.2 (l. 7096–7098) |
| RENDERING-538 | decision | state | §12.5 declared miss | OK | R-6 figures present, both units of the cap |
| RENDERING-539 | acceptance-bar | state | §12.5 | OK |  |
| RENDERING-540 | acceptance-bar | state | §12.5 | OK |  |
| RENDERING-541 | budget | state | §12.5 interaction (RENDERING-C07: stress fixture above the cap) | OK | C07 applied |
| RENDERING-542 | budget | state | §12.5 | OK |  |
| RENDERING-543 | acceptance-bar | state | §12.5 | OK |  |
| RENDERING-544 | budget | state | §12.5 | OK |  |
| RENDERING-545 | budget | state | §12.5 | OK |  |
| RENDERING-546 | budget | state | §12.5 | OK |  |
| RENDERING-547 | rule | state | §12.5 (end of draw calls / uploads paragraph) | OK |  |
| RENDERING-548 | decision | rationale | J-R35 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R35)" left at §12.5 | OK | J-R35 pointer present; passage in F.5 |
| RENDERING-549 | budget | state | §12.6 (re-raster rate → §12.5) | OK |  |
| RENDERING-550 | budget | state | §12.6 | OK |  |
| RENDERING-551 | budget | state | §12.6 | OK |  |
| RENDERING-552 | acceptance-bar | state | §12.6 | OK | NF-S6 tag (VR-R0-10) |
| RENDERING-553 | rule | state | §12.6 replay (order → §7.3) | OK | order referenced to §7.3 |
| RENDERING-554 | budget | state | §12.6 | OK |  |
| RENDERING-555 | budget | state | §12.6 | OK |  |
| RENDERING-556 | history | history | dropped — history (verbatim in rewrite-rendering-rationale.md; validation record keeps it) | OK | dropped; verbatim in F.5 |
| RENDERING-557 | rule | reference | referenced to §2.9 step 3 (MODEL-392); measured recomputation kept as evidence in §12.6 | OK | §2.9 step 3 states the procedure; 35–38 ms kept as evidence |
| RENDERING-558 | acceptance-bar | state | §12.6 | OK |  |
| RENDERING-559 | decision | rationale | J-R36 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R36)" left at §12.6 | OK | J-R36 pointer present; passage in F.5 |
| RENDERING-560 | budget | state | §12.6 warp preview (RENDERING-C08: "at the district band") | OK | C08: "at the district band" |
| RENDERING-561 | acceptance-bar | state | §12.6 | OK |  |
| RENDERING-562 | rule | reference | referenced to §7.8 (DETERMINISM-586) | OK | §7.8 |
| RENDERING-563 | budget | state | §12.7 | OK |  |
| RENDERING-564 | budget | state | §12.7 | OK |  |
| RENDERING-565 | budget | state | §12.7 | OK |  |
| RENDERING-566 | budget | state | §12.7 | OK | "class-3" dropped (NR5-1 adds class-4 bakes) |
| RENDERING-567 | acceptance-bar | state | §12.7 | OK |  |
| RENDERING-568 | budget | state | §12.7 SVG (merged with RENDERING-410) | OK | merged with 410 |
| RENDERING-569 | budget | state | §12.7 | OK |  |
| RENDERING-570 | evidence | state | §12.7 | OK |  |
| RENDERING-571 | rule | state | §12.7 PNG bullet (last sentence) | OK |  |
| RENDERING-572 | acceptance-bar | state | §12.7 | OK |  |
| RENDERING-573 | acceptance-bar | state | §12.7 | OK |  |
| RENDERING-574 | decision | state | §12.7 (NR5-3: 6–9 %); "because" clauses → J-R53 | OK | NR5-3: "6–9 % smaller" |
| RENDERING-575 | acceptance-bar | state | §12.7 export beside the view (NR5-1) | OK | NR5-1 lit path-sun run added |
| RENDERING-576 | acceptance-bar | state | §12.7 | OK |  |
| RENDERING-577 | budget | state | §12.7 | OK |  |
| RENDERING-578 | budget | state | §12.7 | OK |  |
| RENDERING-579 | rule | state | §12.8 | OK |  |
| RENDERING-580 | budget | state | §12.8 model working set (canvas → §8.8) | OK | canvas → §8.8 |
| RENDERING-581 | rule | state | §12.8 thread holdings (roles → §8.9, sizes §8.1 item 6) | OK | roles → §8.9, sizes → §8.1 item 6 |
| RENDERING-582 | budget | state | §12.8 | OK |  |
| RENDERING-583 | history | history | dropped — history (verbatim in rewrite-rendering-rationale.md; validation record keeps it) | OK | dropped; verbatim in F.5 |
| RENDERING-584 | budget | state | §12.8 | OK |  |
| RENDERING-585 | rule | reference | referenced to §4.1 (PIPELINE-047); memory consequence kept in §12.8 | OK | §4.1 l. 2627–2629 |
| RENDERING-586 | acceptance-bar | state | §12.8 M2a measurement | VR-R0-4 | M2a paragraph present; DETERMINISM-190's breakdown lost |
| RENDERING-587 | budget | state | §12.8 CITY line | OK |  |
| RENDERING-588 | budget | state | §12.8 export-time peak | OK |  |
| RENDERING-589 | rule | state | §12.8 export-time peak | OK |  |
| RENDERING-590 | budget | state | §12.8 export-time peak (NR5-1: held crown set) | VR-R0-9 | band + tile canvases present; held crown set unsized |
| RENDERING-591 | acceptance-bar | state | §12.8 export-time peak | OK |  |
| RENDERING-592 | budget | state | §8.8 canvas budget (stated once); §12.8 points | OK | stated once in §8.8; §12.8 points |
| RENDERING-593 | rule | state | §12.8 canvases during a raster export (NR5-1) | VR-R0-9 | sums unchanged although a held crown set is added |
| RENDERING-594 | acceptance-bar | state | §12.8 measurement and fallback | OK | pool sizes 0 and 3 in §16 M1 / M2a exits |
| RENDERING-595 | acceptance-bar | state | §12.8 measurement and fallback | OK |  |
| RENDERING-596 | evidence | state | §12.9 | OK | SCOPE-C01 canonical ratios |
| RENDERING-597 | evidence | state | §12.9 | OK | NF-S7 tag (VR-R0-10) |
| RENDERING-598 | decision | state | §12.9 declared trade (miss figures → §12.3, §12.5) + J-R17 index | OK | miss figures → §12.3, §12.5 |
| RENDERING-599 | decision | rationale | J-R18 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R18)" left at §12.9 | OK | J-R18 pointer sits at §12.3 (l. 7182); passage in F.5 |
| RENDERING-C01 | conflict | conflict | — | OK | NR5-2; FIXED (§3) |
| RENDERING-C02 | conflict | conflict | — | OK | NR5-1; FIXED (§3) |
| RENDERING-C03 | conflict | conflict | — | OK | NR5-3; FIXED (§3) |
| RENDERING-C04 | conflict | conflict | — | OK | resolved as ruled (§4) |
| RENDERING-C05 | conflict | conflict | — | OK | resolved as ruled (§4) |
| RENDERING-C06 | conflict | conflict | — | OK | resolved as ruled; GAP-2 to the owner / Fable (§4, §7) |
| RENDERING-C07 | conflict | conflict | — | OK | resolved as ruled (§4) |
| RENDERING-C08 | conflict | conflict | — | OK | resolved as ruled (§4) |
