# repair-r1-rendering — lane coherence/repair-rendering-r1 (unit rendering: base §8, §9, §11, §12)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-rendering-r1; covered by the whole-design retrovalidation (J84).

Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): the text before the first "=== " line
is ignored by the applier. 20 REPLACE blocks — §8.1–§8.5, §8.7–§8.11, §9.1, §9.2, §9.5, §9.7, §11.1–§11.4, §11.6, and §12
whole (its intro changed); no RULING REQUEST. Base: docs/ARCHITECTURE.md sha256 484af066… (assemble-r0). Every change is
an exact OLD → NEW substitution (docs/validation/coherence/work/repair-rendering-r1/patches/*.patch, each OLD occurring
once, applied by its apply.py to the live subsections in orig/; gen_blocks.py writes this file from new/); every
untouched line is verbatim. Receipts: docs/validation/bench/coh_repair_rendering_r1_palette.{py,out} and
coh_repair_rendering_r1_looks.{py,out} (0 failures).

PROGRESS: P0 resume (CONTINUE rule, cut at 01:21) done · P1 inputs read done · P2 the 33 issues as patches 010–245 done ·
P3 the verbose-prose pass 901–909 done · P4 checks done (below) · P5 result and LANDED.

## 1. Every issue, where it is fixed

* VAL-18 — §9.1: `QuarterNode` built by S6, a sky island's root node by S13a over its districts after its unit run (V05
  §3.14), named by S13a; *What the tree holds* adds the island root (`cityCut` true). Model §2.5's comment: hand-off.
* VAL-19 — §8.2's chamber row: `archVault` the vault hatch (floor at grade, a daylight door), `market` the undercity's plaza.
* VAT-03 — §11.2: the five reader members carry V10 §2.13's fields; `ReaderAnswers`, `Bearing8` and the fourteen answer
  types declared after the union as V10 §2.13 gives them (diffed identical but two back-pointing comments), `QueryResult`
  of each kind that type; the "exactly as V10 §2.13 gives them" comment dropped (file f item 468 as written).
* VAT-06 — §11.2: `ApplyResult`'s conflict member `outcome: MsgRef` (the row of §7.1's outcome table, rendered per
  caller); `PreviewResult.outcome?`; `ConflictAction.msg` words its own button (V09 §2.9); §11.3's `doc.rejected`
  conflicts `{ outcome, actions }`. §5.2's F-EDIT cell, V09 §3.3 and V10 §2.9: hand-offs.
* VK0-01 — §12.4's merge row: the ≈ 200 000 records S10–S12b create at CITY, merged in O(overlay size) (§3.3 pool step 4).
* VK0-03, VRC0S-21 — §11.1's GeoJSON "(an antenna: §3.6 rule 3)"; T-ER-19 "§11.1; an antenna: §3.6 rule 3".
* VRC0S-01 (g item 114) — §8.2: `wall.worn` and the six patch looks (roles, values, matrix rows), the run state rows
  (`worn` notched, district band and finer; `patched` its look's strip and pattern; `breached` a break with the rubble
  spill; `dismantled` the dashed trace and trace discs), `StateRow.legend`, the cue row, the patch patterns, the greyscale
  bar (renders compared on luma against `cvdContrastMin`; least 11.1), short runs; §8.3's states row and wall census row;
  T-ER-22; §9.5's legend; §11.1's GeoJSON, `.dd2vtt`, Foundry, glTF and CityJSON by run; T-ER-19.
* VRC0S-02 (g item 116) — §8.8's per-map zoom-out limit; §8.7 and §11.1's VTT scope within `bounds`; §9.5's framing and
  *Fit the town*; §12.5 (fewer stops, never more); T-ER-08 restated.
* VRC0S-03 (g item 117) — §8.2's season rows (year position, climate columns, the looks table, autumn's crown colours,
  thinning, leaf cover, creepers, ice by water kind with leads, boats hauled up, snow by climate, checks, off form);
  §8.1 item 8 and the render tags; §8.4's sun through the year and `E_key`; §8.10's leaf colours and boats; slots 8b and
  13b; §8.3's census row; T-ER-23; §11.1; §12.5's re-skin budget; R12-30.
* VRC0S-04 (g item 118) — §8.2's decoration rows (V11's table by tier and band, the place table, keyed placement, the
  procession route, glyphs, motifs, cues, never over a label or a gate's passage, the `live.festival` base layer drawn
  lazily per visible tile and keyed in the tile key); slot 19b; §9.5's legend line; §8.3's census row; T-ER-24; §11.1;
  §12.5; R12-30.
* VRC0S-05 (g item 119) — §12's intro; §12.1's *Targets and the comfort level* (targets; ten seconds of total time per
  one-time wait, failing past it; slower only for a measured gain — V11's `perf.qualitySpend`; the progress rule citing
  §11.2's `Progress`; interaction budgets unchanged; the low tier per device; D-18's misses as target misses); §12.3 and
  §12.5 re-read; §12.7's PNG and lit-export budgets at the comfort level; §12.9; §12.10's intro, the column "declared in
  D-18", R12-18's and R12-19's last rungs, R12-31–R12-34. **Held (VV56-07):** whether the comfort level applies per
  visible epoch or to the whole run of an advance or the history replay is not decided: §12 reads those waits "as V06
  §6 states them".
* VRC0S-06 — §11.3: `export.request { …, bundle?: true }`, the bundle the one exception to `E_HOST_FORMAT`.
* VRC0S-07 — §8.2: the simulation stated; `cvdContrastMin`, a V11 `palette` cell, ΔE2000 10, calibratable at M3b; T112-1
  and J-V12.91 read it.
* VRC0S-08 — §12.4's S11 row "≤ 3 µs per plot median (the kernel's M0 bar, §3.7)"; §12.7's hook cites the row.
* VRC0S-09 — §8.4's toggle rule with its rung split, the island view toggle and the two model settings.
* VRC0S-11 — §8.8's tile key: `cvdVariant`, `showUnexcavated` (and the year position, `weather`, the fixed sun's seasonal
  altitude, the festival display); §8.9's export request the same.
* VRC0S-13 — §11.2: `plan`/`planReport` filtered by V03 §5.4's merge at the building band; the `history` kinds band-less.
* VRC0S-14 — §11.3: `party.render`'s viewer answered `doc.rejected { reason: 'role' }`.
* VRC0S-15 — §11.1 and §12.2 point to §3.2 (1); §12.2 keeps "12.4 km square (19.8 km with the margins)".
* VRC0S-16 — the 19 record ids and KERNEL-C05 dropped; §8.5 "so no per-band detail budget exists"; §12.10 retitled.
* VRC0S-17 — §8.8 "B-ZOOM's range, ≈ 1:45 000 → 1:500". §13.2's B-ZOOM line: hand-off.
* VRC0S-18 — §8.2's oasis sentence as §2.3/§2.7 record it.
* VRC0S-20 — §12.2: the village rungs' budgets are V07 §6's (file f item 495).
* VRC0S-22 — R12-23 cites V03 §2.4's `moduleCm`.
* VRC0S-24 — §8.2's `unexcavated` gate (`lost` for every admitting key); §11.1 scoped, `excavation: 'lost'`.
* VRC0S-25 — T-ER-09 at every rung; T-ER-14's spines lifecycle and its B-EDIT fixture.
* VRC0S-26 — the verbose-prose pass (§4).
* VRC0S-27 — §8.2's harbour-mouth chain row by the era row; §8.3's catalogue.
* VRC0S-28 — §8.2's `wall.curtain` by each run's `stretchClass` thickness (§2.7, §4.8); §8.3's census.
* VRC0S-29 — §11.2's `PreviewResult.empty?: MsgRef`.
* VV910-01 — §9.5's count badge steps the declaration's size (file f item 348).
* VV910-05 — §11.2's `type Progress`, `onProgress` on `open`, `regenerate`, `adjust`, `export`; `advance` takes
  `Progress`; the crossing table; §12.1 cites it.

## 2. Judgment calls (vetoable)

1. Item 114's greyscale bar read as V12's "renders" compared pixel by pixel (mean grey ΔE2000 over the pixels either
   draws): a key-tone ladder cannot fit five luma levels between `lit`'s wall (L* 52) and ground (L* 76). Worn = the wall
   toward `ink` with notches; patches lighter than the wall where the ground leaves room, capped at 11 grey-ΔE from it;
   rubble and trace in `ink`. Least 11.1 at every width 2–12 px.
2. patch.* / wall ≥ 8 (not 10): the narrower strip and the pattern separate them too (`lit` 8.5–9.3).
3. Meadow and grass looks are lerps of the face's own fill (`green` or `field`); `meadow.winter` toward `verge`.
4. Boats — a render-only `line` instance class (§8.10): items 117 (e) and 118 (d) presuppose boats the base never drew.
5. Ice kinds from §2.3's `WaterBody.kind` (a river slow by its mean fall < 0.5 m per km); leads ≥ 2 m per km, mill
   reaches, 12 m discs at springs and outfalls; harbour edge 20 m, sea shore 30 m (our own cells).
6. The sun through the year: δ(w) = 23.44° × sin(2π (w − 6) ÷ 52) on the fixed sun; the cursor sun's h₀ by the tangent
   ratio; the path sun's day from the March equinox at week 6, + 182 days below the equator; `E_key` at the drawn
   altitude, so the palette targets hold every week; the off form keeps the sheet's sun.
7. Festivals on the map: the place table, the procession route along `through` and `primary` ways (address-order ties),
   a `base` live layer, a 3 m placement grid ranked by `RH32`.
8. The decoration rows are V11 §3.25.7's, read, not restated (principle (1)), though VRC0S-04 listed them.
9. Item 119 and exports: the comfort level binds every format the dialog offers up to A2 at 300 dpi, lit included —
   §12.7's PNG 20 s and lit 30 s become 10 s; R12-19's and R12-18's changes kept, their last rung (a D-18 veto
   re-declaration) replaced by capping the dialog's print sizes at that rung; the expected outcomes stated.
10. One `season` column (two 16-bit fields): §8.1 item 6's attributes ≈ 2.6 MB, the list still ≈ 10 MB; R12-26 follows.
11. The zoom-out limit: the bounds' longer side within the viewport's short side; k_fit at most 34.

## 3. Hand-offs (other units' text; cited here, never written — ROUND-1 NOTES (3))

* determinism — §5.2's F-EDIT action cell: "the outcome's key and the actions that table gives the cause, each a
  `MsgRef`" (VAT-06).
* model — §2.5's quarters comment follows §9.1 (VAL-18); §2.9's `yearWeek`, follow flag, festival display and
  `cvdVariant`, §2.7's `conditionMaterial` and `conditionEpoch`, as this text uses them.
* scope — §13.2's B-ZOOM line "≈ 1:45 000 → 1:500" (VRC0S-17); T-ER-22–T-ER-24 registered in §13.2; D-18 under item
  119 (VCS-06); judgment-index rows for §2's calls.
* V09 §3.3 step 6 and V10 §2.9 cite `ApplyResult.outcome` (VAT-06); V10 §2.13 cites §11.2's declarations (VAT-03); V05
  draws its islands' seasons and pennants; V06 §6 reads the comfort level for advance and replay (held).
* Assembler — append the `# ALLOW` rows below to docs/validation/doc-checks-allow.tsv (tab-separated after "# ALLOW\t").

## 4. Words by source (principle (9))

70 005 → 80 190 (+14.5 %). Added +10 636: item 114 +1 711 (with items 117's and 118's role rows), item 116 and the tile
key +501, item 117 +2 625, item 118 +1 651, item 119 +1 212, the API (VAT-03 — file f item 468's declarations —, VAT-06,
VRC0S-29, VV910-05, VRC0S-13) +2 262, the other fixes +674. Removed 451: restatement 201 (§8.4's pyramid recap, §12.5's
ring-block costs, §11.2's band-less list and its closing sentence, §8.10's stamp-tile cost, §8.3's receipt recap),
duplicated mechanism 74 (the light-map key, stated in §8.4 (f) and §8.8, now at §8.8 with the nuance kept), narration
38 (record ids; item 69's release date and progress id), verbose prose 138. Guard: prosecheck.py — every number, code
span, reference, id, item, milestone, volume reference, rung and quoted word of a file survives the pass but 16 reasoned
removals (prose-allow.tsv); dropped normative words listed and reviewed (8 hunks). What holds the rest: the pass read
every subsection whole; ≈ 70 verbose patterns remain in 80 000 words after the earlier rounds, the rest being rules,
values, bars, fallbacks and receipts; the growth is the owner's rules 114–119 at build depth and file f item 468.

## 5. Checks

apply-blocks.py on a copy: 20 found, 20 applied, 0 skipped, audit not-OK 0; headings 153 → 153 (§12.10 retitled);
fences balanced; the text before §8, §10 and §13 onward byte-identical. doc_checks.py on the copy — the reference corpus
is incomplete here (captures and four research folders absent), so the result is NOT authoritative and provisional:
C1 5/0, C2 1/0, C3 1 637 / 25 new unreviewed, C4 6/0, S1 0, S2 146 / 1 new unreviewed; with the 26 rows below, exit 0.
171 volume references resolve; both receipts 0 failures.

# ALLOW	C3	where it has none and	a generic word run of our own design text in §8.1 (coherence/repair-rendering-r1: g items 114, 116–119 and the round-1 fixes), no corpus content; reviewed
# ALLOW	C3	so a change of the	a generic word run of our own design text in §8.1 (coherence/repair-rendering-r1: g items 114, 116–119 and the round-1 fixes), no corpus content; reviewed
# ALLOW	C3	is on the map the wall runs	a generic word run of our own design text in §8.2 (coherence/repair-rendering-r1: g items 114, 116–119 and the round-1 fixes), no corpus content; reviewed
# ALLOW	C3	3 4 2 5 m	a generic word run of our own design text in §8.2 (coherence/repair-rendering-r1: g items 114, 116–119 and the round-1 fixes), no corpus content; reviewed
# ALLOW	C3	rows are the view key	a generic word run of our own design text in §8.2 (coherence/repair-rendering-r1: g items 114, 116–119 and the round-1 fixes), no corpus content; reviewed
# ALLOW	C3	a change of the map the	a generic word run of our own design text in §8.2 (coherence/repair-rendering-r1: g items 114, 116–119 and the round-1 fixes), no corpus content; reviewed
# ALLOW	C3	it from the display list	a generic word run of our own design text in §8.2 (coherence/repair-rendering-r1: g items 114, 116–119 and the round-1 fixes), no corpus content; reviewed
# ALLOW	C3	the look of the row	a generic word run of our own design text in §8.2 (coherence/repair-rendering-r1: g items 114, 116–119 and the round-1 fixes), no corpus content; reviewed
# ALLOW	C3	px along the field s	a generic word run of our own design text in §8.2 (coherence/repair-rendering-r1: g items 114, 116–119 and the round-1 fixes), no corpus content; reviewed
# ALLOW	C3	takes its own colour the	a generic word run of our own design text in §8.2 (coherence/repair-rendering-r1: g items 114, 116–119 and the round-1 fixes), no corpus content; reviewed
# ALLOW	C3	a change of the map	a generic word run of our own design text in §8.2 (coherence/repair-rendering-r1: g items 114, 116–119 and the round-1 fixes), no corpus content; reviewed
# ALLOW	C3	byte identical to the map	a generic word run of our own design text in §8.2 (coherence/repair-rendering-r1: g items 114, 116–119 and the round-1 fixes), no corpus content; reviewed
# ALLOW	C3	stands on the map as	a generic word run of our own design text in §8.2 (coherence/repair-rendering-r1: g items 114, 116–119 and the round-1 fixes), no corpus content; reviewed
# ALLOW	C3	channel is drawn from the water body	a generic word run of our own design text in §8.2 (coherence/repair-rendering-r1: g items 114, 116–119 and the round-1 fixes), no corpus content; reviewed
# ALLOW	C3	png export of the same	a generic word run of our own design text in §8.3 (coherence/repair-rendering-r1: g items 114, 116–119 and the round-1 fixes), no corpus content; reviewed
# ALLOW	C3	run on the water s	a generic word run of our own design text in §8.10 (coherence/repair-rendering-r1: g items 114, 116–119 and the round-1 fixes), no corpus content; reviewed
# ALLOW	C3	run at the next step	a generic word run of our own design text in §9.5 (coherence/repair-rendering-r1: g items 114, 116–119 and the round-1 fixes), no corpus content; reviewed
# ALLOW	C3	s and the view s	a generic word run of our own design text in §8.9, §9.5 (coherence/repair-rendering-r1: g items 114, 116–119 and the round-1 fixes), no corpus content; reviewed
# ALLOW	C3	8 9 the export s	a generic word run of our own design text in §11.1 (coherence/repair-rendering-r1: g items 114, 116–119 and the round-1 fixes), no corpus content; reviewed
# ALLOW	C3	2 3 2 1 a	a generic word run of our own design text in §11.1 (coherence/repair-rendering-r1: g items 114, 116–119 and the round-1 fixes), no corpus content; reviewed
# ALLOW	C3	cut to the map s	a generic word run of our own design text in §11.1 (coherence/repair-rendering-r1: g items 114, 116–119 and the round-1 fixes), no corpus content; reviewed
# ALLOW	C3	a patch is a wall and	a generic word run of our own design text in §11.1 (coherence/repair-rendering-r1: g items 114, 116–119 and the round-1 fixes), no corpus content; reviewed
# ALLOW	C3	s and the oracle s	a generic word run of our own design text in §11.2 (coherence/repair-rendering-r1: g items 114, 116–119 and the round-1 fixes), no corpus content; reviewed
# ALLOW	C3	only for the visible tiles	a generic word run of our own design text in §12.5 (coherence/repair-rendering-r1: g items 114, 116–119 and the round-1 fixes), no corpus content; reviewed
# ALLOW	C3	re derived from it a	a generic word run of our own design text in §12.10 (coherence/repair-rendering-r1: g items 114, 116–119 and the round-1 fixes), no corpus content; reviewed
# ALLOW	S2	§2.12	a volume pointer (V10 §2.12, the clerk tool vocabulary), not a base heading; written in §8.2, §8.3, §8.8, §11.2, §12.6, §12.10 by coherence/repair-rendering-r1
