# verify-rendering-r3 — lane amendments-c/verify-rendering-r3 (the RENDERING part after repair round 3)

> PENDING FABLE REVIEW — Opus-produced (amendments-c/verify-rendering-r3).

> PROGRESS (kill-safe ledger; a seat that continues this lane reads it first):
> STEP 0 inputs read (verify-rendering-r2, validate.md §5, repair-rendering-r3 report and blocks, assemble-r3, the four sibling r3 repair reports for cross-part notes): done
> STEP 1 repaired subsections read whole (§8.1, §8.3, §8.4, §8.8, §8.9, §11.1, §11.3, §12.5, §12.7, §12.8) + word diff vs the pre-r3 archive (§9 unchanged): done (scratch vr3c/wd8.txt, wd11.txt, wd12.txt; 255 added runs)
> STEP 2 r2 issues re-checked (VRC2-01..07): done — all 7 FIXED
> STEP 3 per-item verdicts: done (68 PRESENT with new defects VRC3-01, -02, -04; 101 PRESENT; the rest carried)
> STEP 4 checks and new issues: done (5 minor: rendering 4, scope 1)
> STEP 5 doc_checks, refs, J ids, receipts: done (doc_checks 8,9,11,12 exit 0; refs 2 external; 137 J ids resolve; repair receipt re-run byte-identical; new receipt amendc_verify_rendering_r3_exportscale)
> STEP 6 queue row + LANDED: done

Design under review: `docs/ARCHITECTURE.md` sha256 `70ddb6e302ea06c1…`, rationale `e138da2377d31b9f…` (assemble-r3's installed
files, unchanged at the end of this lane). Scratch: scratchpad `c0d81c15…/scratchpad/vr3c/`. This lane edits no design file.

## Outcome

**Repair round 3 fixed all seven issues routed to the rendering part (VRC2-01 – VRC2-07), both majors included.** The
ring blocks bound the shadow window's holdings by the logarithm of its reach and by B, the 16-bit full-precision path
makes §13.4's parity reachable, and the five minors are fixed as required (VRC2-02's source band by the city band rather
than by band requests, a vetoable choice recorded as J-A68.93). Every routed item is PRESENT and no held part is written.
The document checks exit 0 at r2's counts, the resolver finds only the two pre-existing externals, all 137 J ids the part
cites resolve (index 735 = Part A 735), and the repair's receipt re-runs byte-identical.

**Five issues are new, all minor: four owned by rendering, one by scope.**
* **VRC3-01:** the ring blocks read the city band while the first ring and the visible tiles read the view's band, yet
  §8.4 (c) claims a cell's value never depends on where it is held; at the building band (composed wings and towers,
  §8.6) and for close-up casters the two bands disagree, so a far shadow changes when a pan moves its caster between
  ring 1 and ring 2. J-A68.93 itself claims only a bound.
* **VRC3-02:** the window's Z counts only surface and pyramid writers, and a `ghost` or `offset` sky island is a slab, not
  one; an island floating above the town's highest roof therefore casts no direct shadow, and no slab record is held
  or transferred beyond the visible tiles (older than round 3, not raised in r2).
* **VRC3-03:** §8.8's print paragraph restates §11.1's lit-export transient list in looser words.
* **VRC3-04:** the lit export tile's window, "≤ 30 MB whatever R", holds at the tested 1:500 / 300 dpi but passes 30 MB
  (and the 16-MB block cache) at finer export scales §8.7 allows (receipt).
* **VRC3-05 (scope):** no §16 exit names §8.3's new hand-lantern row (the rendering seat's cross-part note).

**CONFIRMED vs PLAUSIBLE.** Every FIXED verdict, the text contradictions of VRC3-01 – VRC3-03 and VRC3-05, and VRC3-04's
figures (executed receipt) are CONFIRMED; VRC3-01's magnitude and its close-up half, and the mechanisms the required
changes choose, are PLAUSIBLE.

## 1 Inputs read

* This lane's r2 report (`verify-rendering-r2.md`), `validate.md` §5 (rendering rows VRC2-01 – VRC2-07; no other row
  names the part), `repair-rendering-r3-report.md` and its 12 blocks, `assemble-r3.md` (26 REPLACE; the part's 10), and
  the determinism, model, pipeline and scope r3 reports — none addresses a note to rendering; determinism's VD2-03 pointer
  rewrite in §11.1 ("§7.7 layer 2") is present and concurred.
* The part from the live design, the changed subsections whole: §8.1 (l. 9531–9669), §8.3 (l. 10116–10196), §8.4
  (l. 10198–10483), §8.8 and §8.9 (l. 10640–10920), §11.1's transient-list paragraph and rows (l. 11906–12006), §11.3's
  vocabulary (l. 12205–12216), §12.5 (l. 12546–12629), §12.7 (l. 12694–12801), §12.8 (l. 12803–12902); §9 is
  byte-identical to the pre-r3 archive.
* The subsections these rely on: §2.6's `Building.heights` (l. 1136), `Composition`, `Wing`, `ComposedTower`
  (l. 1152–1158); §2.7's `SkyIsland` (l. 1835); §8.5's bands (l. 10487–10499); §8.6 (l. 10595–10631); §8.7 (l. 10632–10638);
  II.4 (l. 15363–15396); II.6's island light (l. 15447–15451); §16's M2b, M3b and M4 exits (l. 14900, 14902, 14903); the
  index rows and Part A entries J-A68.85, J-A68.89, J-A68.90, J-A68.92, J-A68.93, J-A68.94 and J-A101.86.
* A word diff of §8, §9, §11 and §12 against `docs/archive/ARCHITECTURE-pre-amendments-c-repair-r3-2026-09-28.md`
  (255 added runs), so every changed sentence was read in place.

## 2 The round-2 issues, re-checked on the live text

| r2 id | verdict | evidence (quoted from the live design) |
|---|---|---|
| VRC2-01 (major) | FIXED (VRC3-01, VRC3-04 new) | §8.8: "The **first ring** (2(a + b) + 4 positions) is held per position from level 0 … Every farther position is held by a **ring block** (J-A68.90) … held from level max(m + 2, ⌊log₂(4(r − 1))⌋) … at most 326 first-ring positions and blocks together at the reference view, and 437 at any view up to tile DPR 3 … the blocks together ≤ B"; Q "= P ÷ 12 + (2(a + b) + 4) ÷ 3 + B … 3.75 MB at tile DPR 1, 4.25 at 1.5, 4.75 at 2 and 5.5 at 3"; print "≤ 30 MB whatever R … block cache"; §12.7 "per **ring block** ≈ 1 µs per city-band mark … ≈ 39 / 85 / 181 / 433 ms"; §12.5 cites them, PLAUSIBLE until M2b, "**Pre-decided fallback:** … adds the blocks after the settle"; §8.3's mountainous row; J-A68.90 and J-A68.89 restated. Counts, B and the worked cases recomputed from the receipt (326, 437; 3.60 / 4.09 / 4.58 / 5.46 MB; 172.75 / 123.25 / 68.75 / 104.75 MB) — all match. The receipt's partition is a partition (qualification is monotone in the order) and its level never undercuts the floor (a ring-r position's nearest visible pixel lies ≥ (r − 1) tile sides away). |
| VRC2-02 | FIXED (VRC3-01 new) | (a) §8.8: the first ring's heights "from the marks of the view's band, requested for its districts like a visible tile's (§8.9)"; blocks from "the **city band's** marks, which the tile worker holds for the whole document"; §8.9's band-request row "and, after the visible tiles', the first-ring positions round them". (b) "a **ring block** by (stop, its order, its indices, tile DPR, its level) … a held block serving any view whose floor at its nearest position is at or above its level"; `TileRasterOpts.block?: { order; level }`; 0 hits of the old ring sense of `fromLevel`. |
| VRC2-03 (major) | FIXED | §8.4 (g): "its pyramids, its first ring's heights and its ring blocks in 16 bits: whole centimetres above each one's datum, rounded up, 2 B per cell, the step widening to ⌈range ÷ 65 535⌉ cm only where one's range passes 655.35 m"; §8.8 "Q_f = 2Q"; worked "163 + 28.5 = 191.5 MB" and "85 + 21.5 = 106.5 MB" (recomputed: both fit); §12.8 and J-A68.85 follow. |
| VRC2-04 | FIXED | §8.4 (c): "its shadow lengthened by at most that cell's diagonal — √2 × its side (≤ t ÷ 90)"; §8.3's lower-roof, cursor-sun, long-shadow rows "the diagonal of §8.4 (c)'s floor cell"; narrow-casters "within one floor cell's diagonal per side"; J-A68.90 "√2⁄128 (≈ 1⁄90)". |
| VRC2-05 | FIXED | §8.1 `surfaceTopCm`: "S14 derives it on the city band's list … and every other list — a finer band's, an export's transient one — carries that value, never one of its own"; item 6 "the city band's `surfaceTopCm` … never one taken from the transient list whose extent it sets"; §11.1 "That R takes Z from the city band's `surfaceTopCm` the generation worker keeps". |
| VRC2-06 | FIXED | §8.4 (f): "the CPU reference evaluates the lantern only at a pointer point a test supplies, by (c)'s law and traversal"; §8.3's hand-lantern row (nine pointer points, 0 lit pixels beyond 6 m, none in any export); J-A68.92 restated. Milestone: VRC3-05. |
| VRC2-07 | FIXED | §11.3: "`preview { events, view?: boolean }` … `true` draws the ghost as `live.ghost` in this client's own view (§8.2), which stands for §11.2's `ViewHandle` since a bridged host holds none, and `false` or absent computes the dry run alone"; `preview.result` "when `view` is `true`"; J-A101.86 restated. |

The repair's one departure from the proposed text (ring blocks instead of j₀ = 16 plus a whole-frame far field) is
accepted: its receipt (4) shows the far field at 28 MB over the cap's frame at the 1:500 stop, and the blocks meet
VRC2-01's aim (count and memory bounded whatever R) with the same law.

## 3 Per-item verdicts (items this round touched are re-checked; the rest carry r2's, `verify-rendering-r2.md` §3)

| item | r2 | r3 | evidence / what remains |
|---|---|---|---|
| 53, 54, 55, 69 (home) | PRESENT | PRESENT (carried) | §8.10, §8.2, §9.2–§9.3 untouched by the round; §8.4 K06 and §8.3's under-copy and palette rows unchanged. |
| 68 (home) | PRESENT, with VRC2-01 – 06 | PRESENT, with VRC3-01, VRC3-02, VRC3-04 | The window, first ring, ring blocks, 16-bit fallback, floor diagonal, export Z and lantern reference are mechanisms with fields (`surfaceTopCm`, `TileRasterOpts.block`), keys, budgets (Q, Q_f, §12.5, §12.7, §12.8), bars (§8.3's mountainous and hand-lantern rows) and judgments (J-A68.85, .89, .90, .92, .93, .94). |
| 101 | PRESENT, with VRC2-07 | PRESENT | `view?: boolean` typed and scoped to the bridged client's own view. |
| 58 (d), (e); 59 (timing, released); 63; 64; 65; 67; 70; 72; 20 (h); 73–75; 77; 81; 82; 85–88 | PRESENT | PRESENT (carried) | Untouched, or touched only by the round-3 edits above (63/64's host rule, §8.1 item 7, unchanged); item 59's labelled timing in §12.7 unchanged. |

**J rows.** The five restated ids sit at their older rows' places once each (index l. 17149, 17153, 17236, 17239, 17241;
Part A l. 685, 689, 772, 775, 777) and the two new ones once each (J-A68.93 l. 17244 / 780; J-A68.94 l. 17245 / 781); each
Part A entry states the choice, the alternatives and the reason.

## 4 Checks

**SINGLE-SOURCE.** The partition, levels, keys and memory of the ring blocks are §8.8's; §8.4 (c) points to them, §8.9's
tables, §12.5, §12.7 and §12.8 cite them. Q and Q_f are §8.8's, cited by §12.8. The block costs are §12.7's, cited by
§12.5. The lit export's transient list is §11.1's — **except VRC3-03**, a looser restatement in §8.8's print paragraph.

**STALE.** None of the route's old rules is back (lots as buildings, binary wealth, fixed size, one market, the map
editing the dossier, a proprietary default, unchanging terrain). No trace of round 2's rings remains: 0 hits of
"rings' heights", "ringPyramid", "≈ 21 MB" or the ring sense of `fromLevel` in the design; "≤ 3 MB … whatever the
window" and "≈ 21 MB" survive only as history in J-A68.89 and J-A68.90's Part A. J-A68.83's row ("to at most 1⁄128 of its
distance beyond") describes the cell's size, which stays true.

**CROSS-PART.** No sibling r3 report addresses rendering. §13.4's "takes §8.4 (g)'s full-precision surface — the
traversal unchanged" stays true. The rendering seat's note to scope (§16's M2b and M3b cells) could not reach scope, which
landed first; it is carried as VRC3-05. §2.6's `Building.heights` ("the building's max over its wings") and §8.6's
per-wing drawing at the building band bear on VRC3-01; II.6's island shadow bears on VRC3-02.

**DEFERRAL-WORDING.** None added: 0 of the 255 added runs holds "TBD", "TODO", "later", "open", "for now", "defer" or
"eventually".

**BROKEN-REFERENCE.** None: the resolver reports 141 headings, 35 D ids, 732 J ids and 2 broken (the pre-existing
externals `os-geometry.md` §2.1.4 and RFC 7946 §3.1.6); the 137 J ids the part cites all have index rows; the receipt
paths resolve.

**NEW-PROBLEM.** VRC3-01, VRC3-04 (from round 3's mechanisms) and VRC3-02 (from round 2's window, found now).

## 5 Issues (each with its owning part and the exact required change)

| id | sev. | kind | owner | item | claim | required change |
|---|---|---|---|---|---|---|
| VRC3-01 | minor | new-problem | rendering | 68 | **Blocks and first ring read different bands, so a far shadow depends on where its cells are held.** §8.4 (c) (l. 10331–10335): "R, the floor and the resolved cells depend on the source, the pixel and the surface only — never … on where a cell is held (a visible tile's pyramid, a first-ring position's or a ring block, §8.8), since … every level is a greatest height by one rule"; J-A68.90's Part A: "where a cell is held never changes which cell the law reads or its value". But §8.8 builds blocks from "the **city band's** marks" and the first ring and visible tiles from the view's band, and claims only "no cell of a block lies below what the view's band writes there"; J-A68.93's Part A says the city band's casters "bound every finer band's". The two bands differ: (i) the city band's footprint carries "the building's `Heights`, its max over its wings" (§8.1 item 2; §2.6 l. 1136), while the building band draws each composed wing and tower at its own `Heights` (§8.6; §2.6's `Wing`, `ComposedTower`), so over a 10 m hall with a 30 m tower wing a block holds 30 m across the whole footprint and a first-ring pyramid holds it over the tower alone — under a 15° sun the far shadow is the footprint's width (≈ 112 m long) in ring 2 and the tower's width once a pan brings the building into ring 1; (ii) nothing bounds a composition's heights by `Building.heights`, and close-up content (II.4) reaches only the neighbourhood band, so a caster finer bands draw can be absent from, or taller than, the city band — its far shadow cut and `surfaceTopCm` (hence R) too low (PLAUSIBLE). §8.3's mountainous row checks blocks only against "the district band's marks", and the repair's receipt (1) uses one scene for every holder, so neither detects it. | **One caster set for every holder's levels ≥ 1.** (1) §8.1 item 2: replace "each building's footprint mark carries the building's `Heights`, its max over its wings (§2.6), so the ring blocks (§8.8) and `surfaceTopCm` read the whole document's casters from the one list the tile worker always holds, and a finer band adds no caster above them" with "each base wing has a caster mark in the city band carrying its own `Heights`, drawn by no program there (as a tree line's crowns), and when a composition's wings and towers or a close-up's casters reach a finer band, S14 adds their caster marks to the city band in the same `DisplayDelta`, a composed building's replacing its base wings'; so the city band carries every caster any band draws at the heights that band draws, and the ring blocks (§8.8) and `surfaceTopCm` read them from the one list the tile worker always holds". (2) §8.8's pyramid sentence: "levels 1–9 per cell the greatest height of the city band's caster marks (§8.1 item 2) whose outlines … meet the cell … never below the level-0 heights it covers", so a visible tile's, a first-ring position's and a block's cell at one level take one value; replace "so no cell of a block lies below what the view's band writes there" with "so a block's cell equals the same cell of any pyramid". (3) §8.3's mountainous row gains a composed building (a 10 m hall with a 30 m tower wing) two rings outside the view at the building band and a close-up caster at the neighbourhood band: "their shadows in the view identical before and after a pan brings them into ring 1"; its "at or above … the district band's marks" becomes "equal to every band's". (4) J-A68.93's row and Part A restated ("bound" → "equal", the per-wing and derived casters named). *Alternative:* keep the city band as it is, restate §8.4 (c)'s claim as a bound (a far building shades as its tallest part beyond the first ring) with the pan shift recorded as a judgment — but (ii) still needs the derived casters added to the city band. |
| VRC3-02 | minor | partial | rendering | 68 | **Slabs are outside the window.** Z is `surfaceTopCm`, "the greatest elevation … that a caster of the city band's list writes into the surface layer or a pyramid" (§8.1 l. 9579), and R = (Z − z) ÷ (m − σ) ends the ray (§8.4 (c)). A sky island under `ghost` (the `sky` default) or `offset` occlusion is an **occluder slab**, not a surface writer (§8.4 (a)), and its underside floats above the town (`SkyIsland.elevationCm`, §2.7). A ground ray reaches the island's underside only at t = (underside − z) ÷ m > R whenever the underside is above the town's highest surface, so the island casts no direct shadow anywhere — against II.6 ("its shadow falls from its underside onto whatever lies below") and J-A68.83. Separately, the slab list is only "a per-tile record" (§8.4 (a)): §8.8 holds no slab for first-ring positions or blocks, §8.9's tile worker → main row transfers none, and the canvas budget counts none, though (c) tests "the slab list's records within R". Present since round 2's window (r2's `surfaceTopCm` counted the surface only); not raised in verify-rendering-r2. | (1) §8.1's `surfaceTopCm` comment: "…writes into the surface layer, a pyramid or the slab list (a slab's top: an island's, a span mark's, a deck's; §8.4 (a))…". (2) §8.8, after the pyramid bullet's first-ring and block sentences: "The **slab list** is one per document — every slab caster of the city band (§8.4 (a)), each its outline, top and underside — held whole by the tile worker, transferred to the main thread with the first surface layer and again with any delta that changes a slab, and read by the traversal wherever the ray runs within R"; §8.9's tile worker → main row gains "the slab list (its records)"; §8.8's Q gains its size (≈ bytes per record × records, stated at CITY). (3) §8.3 gains a row: "island shadow (item 68; §8.4 (a), (c); II.6): a hand-built island record 100 m above a golden TOWN whose highest roof is ≈ 40 m, `ghost` occlusion, the fixed sun, the view at the 1:500 stop with the island inside it and again two rings outside it, CPU reference and GPU pass \| ink, lit \| the shadow's near edge at the similar-triangles distance past the outline within max(1 px, the diagonal of §8.4 (c)'s floor cell there), equal in both placements, the GPU within §13.4's tolerance". |
| VRC3-03 | minor | duplicate | rendering | 68 | §8.8's print paragraph (l. 10780–10783) restates §11.1's lit-export transient list (l. 11998–12004): "its transient list carries the marks its first rings and light maps read and the city band's casters its blocks read, over the frame dilated by its window R, whose Z is the city band's `surfaceTopCm` the generation worker keeps, never the list's own (§11.1, §8.1 item 6)". Read literally it dilates the view band's marks by R, whereas §11.1 dilates them by one export tile side and the largest light radius and only the city band's casters by R. | §8.8's print paragraph: replace that clause with "its transient list carries what its first rings, light maps and blocks read beyond the frame, the window's Z the city band's `surfaceTopCm` the generation worker keeps (§11.1; §8.1 item 6)". |
| VRC3-04 | minor | partial | rendering | 68 | **The export window's "≤ 30 MB whatever R" holds only at the tested scales.** §8.8's print paragraph bounds one export tile's window at "≤ 30 MB whatever R (one export tile's blocks ≤ 13.1 MB at the 1:500 scale over the frame at the population cap …)", with a block cache that "keeps every block … while they fit in 16 MB (the tile in progress's held …)"; §12.8 repeats "≤ 30 MB whatever the window's reach". §8.7 renders PNG and print "at any DPI" at the export's own scale, and a finer export tile holds more block orders: by the repair receipt's own functions (`docs/validation/bench/amendc_verify_rendering_r3_exportscale.out`), over the cap's frame one export tile's blocks are 14.65 MB at 600 dpi and 1:500, **16.96 MB at 300 dpi and 1:100 (window 30.96 MB)** and **18.52 MB at 600 dpi and 1:100 (32.52 MB)**; over CITY 16.21 MB at 600 dpi and 1:100. The tile in progress's blocks then exceed the 16-MB cache meant to hold them, and the window its bound. The growth is logarithmic, ≈ 1.6–1.7 MB per halving of the export tile's world side. | §8.8's print paragraph: replace "≤ 30 MB whatever R (one export tile's blocks ≤ 13.1 MB at the 1:500 scale over the frame at the population cap, …)" with "≤ 14 MB plus its blocks whatever R — the blocks ≤ 13.1 MB at the 1:500 scale and 300 dpi over the frame at the population cap, and ≤ 1.7 MB more per halving of the export tile's world side (18.52 MB at 1:100 and 600 dpi, `amendc_verify_rendering_r3_exportscale.out`)", and the cache "while they fit in max(16 MB, the tile in progress's blocks)"; §12.8's "≤ 30 MB whatever the window's reach" becomes "§8.8's bound (≤ 30 MB at 1:500 and 300 dpi, ≤ 33 MB at 1:100 and 600 dpi)"; J-A68.90's row and Part A likewise. *Alternative:* the export dialog refuses a lit export whose tile side is below the 1:500 / 300 dpi side (21.67 m), naming the finest scale that fits — recorded as a judgment. |
| VRC3-05 | minor | missing | scope | 68 | **No milestone runs §8.3's hand-lantern row.** R10 (canon): §16 "points to the criteria's homes". M2b's exit names item 68's "day model, the GPU pass within §13.4's tolerance", which covers §8.3's mountainous row; M3b's names item 68's "night bars … and its exports' lights"; M4's names "the hook fixtures of items 64, 65, 66 … and 67". The hand lantern is underground, so neither the day model nor the night bars cover it, and §12.5 times the lantern "(M2b, in B-CITY's browser runs) … underground with the hand lantern on" while J-A68.92 holds it "PLAUSIBLE until M2b". The rendering seat's cross-part note (repair-rendering-r3 report) reached scope after scope's r3 landing. | §16's M2b exit: "… 68 (the day model, the GPU pass within §13.4's tolerance of the CPU reference, §8.3's mountainous and hand-lantern rows) …" — the lantern at M2b, where §12.5 times it, on the hand-built underground fixture of §8.3's access-point row; or, if scope places the lantern with the underground hooks, M4's "the hook fixtures of items 64, 65, 66 …" gains "§8.3's hand-lantern row" and §12.5's lantern measurement and J-A68.92's "until M2b" move with it. No price changes (the repair report). |

## 6 Held parts (gate (a)) — none written in the part

A scan of the 255 added runs and a grep of §8, §9, §11 and §12 find none of the held parts: item 52's "visibly differ",
item 35's "160 of 162", item 60's "16 cells", item 68 (g)'s "MFCG draws no cast shadows" (the `MFCG` preset appears only
as our preset's behaviour, J-A68.86), item 68's support (VG 1.6.9 and Dwellings only in §8.10's sampler provenance),
and item 50's MFCG clause (not in the part). Held for Fable's retrovalidation, per assemble-r3 §8: items 52, 35
(support), 60 (support), 68 (g), 68 (support), 50 (MFCG clause). The released parts stand as applied: item 59's timing
in §12.7, labelled; item 58 (f) in II.2; item 37 not in the part; item 49's deletion rejected (the 49 % figure at F4).

**Gate (b).** The round added no "the reference does X" sentence ("the reference" in the added text is our CPU
reference). **Gate (c).** No reference identifier entered the design or the rationale.

## 7 Document checks and receipts

* `python3 docs/validation/bench/doc_checks.py --sections "8,9,11,12"` (allow file `docs/validation/doc-checks-allow.tsv`)
  on the live design **exited 0** (corpus 9 626 JSON files, 916 788 3-grams, 478 C4 lists; stderr only the pre-existing
  unreadable-JSON warnings), at r2's counts; no allow row was added and no design text edited:

  | C1 | C2 | C3 | C4 | S1 | S2 |
  |---|---|---|---|---|---|
  | 5 / 0 | 0 / 0 | 155 / 0 | 1 / 0 | 0 / 0 | 0 / 0 |

  The ten unreviewed C3/C4 hits assemble-r3 §9 (1) found in the rationale's J-A68.85, .90, .92, .93 and J-A101.86 lie
  outside §17.1 (2)'s gate (the design only); they are left as information, not raised.
* `docs/validation/amendments-b/refs.py docs/ARCHITECTURE.md <scratch>/refs.json`: 141 headings, 35 D ids, 732 J ids,
  **2 broken** (the pre-existing externals). J scan: 137 cited in the part, all in the index; index 735 = Part A 735, no
  duplicate.
* **Re-run.** `amendc_repair_rendering_r3_blocks.py` re-runs **byte-identical** to its stored `.out` (sha256 `56e9e47c…`,
  9.5 s).
* **New receipt** (our code, stdlib only; it imports the repair receipt's functions unchanged):
  `docs/validation/bench/amendc_verify_rendering_r3_exportscale.{py,out}` (sha256 `f35ac0b9…` / `5d0f7aec…`), backing
  VRC3-04.
* **Recomputed from the text:** the first ring's 2(a + b) + 4; a block's ≤ 128² cells (1⁄48 MB with its levels); Q and
  Q_f for the six worked cases; §12.8's export-time canvases (187.75, 138.25 → 114.25, 83.75 → 71.75 MB); the export
  window's 3.33 + 10.67 + blocks.

## 8 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (quoted from the live text, executed, or recomputed from the text's terms): the seven FIXED verdicts and
the item verdicts; VRC3-01's contradiction between §8.4 (c) / J-A68.90's equality and §8.8 / J-A68.93's bound, and the
per-wing versus max-over-wings difference from §2.6 and §8.6; VRC3-02's exclusion of slabs from Z and the absence of any
slab holding or transfer beyond the visible tiles; VRC3-03's duplicate; VRC3-04's figures (executed receipt); VRC3-05's
absence from every §16 exit; the doc checks, the resolver, the J scan and the receipt re-run.

**PLAUSIBLE** (for the repairers and Fable): VRC3-01's magnitude (hand-computed) and its close-up half (whether a
close-up adds casters absent from the city band); the mechanisms the required changes choose; and, carried from the
repair's own list, every time figure of the blocks and the lit settle until M2b.
