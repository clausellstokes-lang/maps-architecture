# Verify — consistency pass, round 2: the RENDERING part (§8, §9, §11, §12) after repair round 2

> Fable-reviewed 2026-09-26: CORRECTED — docs/validation/consistency/validate.md

Lane `consistency/verify-rendering-r2`, 2026-09-26. Status: COMPLETE. Re-verifies `## §8 Rendering and the style system`
(l. 5457–6350), `## §9 Labels and map furniture` (l. 6351–6617), `## §11 Export and interop` (l. 6790–7048) and
`## §12 Performance budgets` (l. 7049–7519) of `docs/ARCHITECTURE.md` (sha256 `d9d509fa…7a5d`, the assemble-r2 output)
against the archive (`docs/archive/ARCHITECTURE-pre-consistency-2026-09-26.md`), `inventory-rendering.json` (599 items
+ 8 conflict records), `canon.json`, the mapping table of `rewrite-rendering.md`, the six `repair-r2-*.md` files,
`assemble-r2.md`, `docs/validation/fix-all/still-open-r5.json` (NR5-1 … NR5-3) and my round-1 report
`verify-rendering-r1.md` (cited as **r1**). Line numbers are the current document's unless marked "archive" or "r1".

**Method.** The three document states were rebuilt in this lane's scratch directory — `assemble-r0.py`, then
`assemble-r1.py`, then `assemble-r2.py` — giving sha256 `ee314f23…afed175`, `ddd48f07…ebb1` (assemble-r2's "before")
and `d9d509fa…7a5d`, the last `cmp`-identical to the landed file. The r1 → r2 diff (15 unified hunks — assemble-r2's
16, which counts §12.7's two nearby changes apart — 64 lines out, 62 in) was read in full, and a word-level diff
(34 token edits) confirms that no re-wrap hides an edit. Each of the four rendering blocks equals its current subsection
byte for byte. **Re-checked** (148 ids): every id homed in §8.10, §12.6, §12.7 or §12.8 (the subsections the rendering
repair replaced); every id whose pointer target, canon home or other-part restatement lies in a subsection another
repair replaced (§0.2, §1.2, §2.6, §3.3, §4.2, §4.4, §4.8, §5.1, §5.2, §7.3, §13.2); every id pointing into this part's
replaced subsections; every id tied to an r1 issue or an open item. **Carried** (451 ids): home and targets outside
every replaced subsection, so r1's verdict stands (r1 §9); the 57 rationale and history ids among them were checked
through F.5's identity with r1's copy and the unchanged judgment index. Scratch work: `scratchpad/vr2/` of this session.

## 1. Outcome

The rendering part is sound after repair round 2, apart from one detail lost at its edge and one wording slip.
**All six round-1 issues about this part are fixed:** VR-R1-1, VR-R1-2, VR-R1-3 (a) and (b) and VR-R1-6 by the
rendering repair, VR-R1-4 by the pipeline repair (P1-1) and VR-R1-5 by the scope repair (V-SCOPE-R1-02). The part's
diff is exactly the five substitutions the rendering lane claims (21 lines out, 19 in, −208 bytes). **NR5-1, NR5-2 and
NR5-3 stay FIXED**, and the 16 canon conflicts touching the part stay resolved as ruled. All 599 ids and the 8 conflict
records are accounted for (§9): 598 ids are OK (18 of them carry a FIXED note), 1 carries a new issue (RENDERING-286,
VR-R2-1), and the 8 conflict records are OK.

**Three new issues, all minor (0 blocker, 0 major): 1 owned by rendering, 2 by determinism.**

* **VR-R2-1** (lost; determinism) — how the stamp-tile library's constant key is derived, "§6.1's four-lane finaliser
  over the words" (archive §8.10), is now stated nowhere. VR-R1-3 (a)'s fix removed it from §8.10 as a duplicate of
  §6.1's registry entry, but that entry never gained it: the rendering rewrite had kept it in §8.10 "because the home
  lacks" it, and round 1 added only `STAGE_VIEW` and the zero components to §6.1. My r1 required change caused this; I
  did not check every word of the restatement against the home.
* **VR-R2-2** (new-problem; rendering) = `verify-model-r2.md` V-MODEL-R2-01, found independently — §12.6's replay
  sentence lost its verb: "…through the session's code path, the view stages once at the end (§7.3 item 2) — …". The
  meaning survives only through the pointer.
* **VR-R2-3** (broken-reference; determinism) = `verify-determinism-r2.md` VDR2-1, confirmed here but not found
  independently — since VR-R1-4's fix, F-CONTOUR's bracket "[§4.2 S1]" no longer names the section that computes its
  second rung (the clip, now stated only at §8.2).

No review marker, deferral wording, round narration or fix-round tag is in the part. Every `§` reference resolves (the
part's only unresolved pointer is RFC 7946 §3.1.6, an external standard). The four sections pass `doc_checks.py` with 0
unreviewed hits. The part is 198 822 bytes, 81.1 % of the archived §8 + §9 + §11 + §12 (r1: 81.2 %).

**CONFIRMED vs PLAUSIBLE.** CONFIRMED by execution: the three rebuilt states (sha256, `cmp`), the line and word diffs,
block-for-block identity, the resolver, `doc_checks`, the J-id, marker, tag and deferral scans, the F.5 comparison, the
numbers-beside-pointers scan, and each issue's quoted evidence (grep and reading). PLAUSIBLE (one reading, no second
reader): that the 11 hunks outside the part change nothing this part points to beyond §6's list.

## 2. Issues (each with its owning part)

| id | sev | kind | owner | claim (evidence) | required change |
|---|---|---|---|---|---|
| VR-R2-1 | minor | lost | determinism | **The stamp-tile key's derivation is stated nowhere.** The archive's §8.10 gave the library's random source as `rng.stream` "with a **constant entity key** — §6.1's four-lane finaliser over the words (a fixed stamp-tile domain constant, the decoration class's registry index, the reference spacing 400 cm, and the creation index …)" (archive l. 7744–7746; RENDERING-286). The rewrite kept "(§6.1's four-lane finaliser over its words; …)" in §8.10 "because the home lacks" it, and told §6.1 it "may add 'four-lane finaliser; reroll, attempt, epoch and salt 0'" (`rewrite-rendering.md` *Homes chosen* 7 and the notes to other parts). Round 1 gave §6.1 only "`STAGE_VIEW` and reroll, attempt, epoch and salt 0" (VDC-11 (a)). Round 2, on VR-R1-3 (a), reduced §8.10 to "under the `render.stampTiles` key and components of §6.1's registry entry (J-R42)" (l. 6260–6262). §6.1's entry says only "keyed by a constant entity key over (stamp-tile domain, decoration class index, the reference spacing 400 cm, creation index — …)" (l. 4176–4181). §6.1 defines an entity key only as "the mix of the seed key, its lineage hash (§6.3) and its arena key" (l. 4119), and names the four 32-bit-lane finalisers only for the seed key (l. 4117–4118). So the function that turns the four words into the key is no longer given, while the shipped tiles' hashes depend on it. Neither J-R42's index row nor its Part A row states it. `verify-determinism-r2.md` marks DETERMINISM-161 FIXED without this word. | §6.1's `render.stampTiles` entry (R5, R13: the home carries the detail): "keyed by a constant entity key — the four 32-bit-lane finalisers (as for the seed key) over the words (stamp-tile domain, decoration class index, the reference spacing 400 cm, creation index — 0–3 for the class's four tiles, 4 for their shared border band) —, with `STAGE_VIEW` and …" (the archive's "§6.1's four-lane finaliser over the words", restored at the home). §8.10 keeps its pointer and changes nothing. |
| VR-R2-2 | minor | new-problem | rendering | **A clause without a verb** (= `verify-model-r2.md` V-MODEL-R2-01; found independently, one fix). §12.6 *Replay and load verification* (l. 7329–7331): "A replay (§7.3 item 2's replay mode) folds the log on the model through the session's code path, the view stages once at the end (§7.3 item 2) — S13a's scoped delta at each event that re-derives names costs ≤ 3 ms per such event." r1's text had "…, and S14 and S13b run once at the end", and VR-R1-3 (b)'s required change kept "run". The repair's vetoable call (2) put "the view stages" (§7.3 item 2's own term, l. 4869–4870) in place of "S14 and S13b", which is right, but dropped the verb, so "stages" reads as a verb. Nothing is lost and no value changes. | §12.6: "… folds the log on the model through the session's code path, and the view stages run once at the end (§7.3 item 2) — S13a's scoped delta …". Nothing else changes. |
| VR-R2-3 | minor | broken-reference | determinism | **F-CONTOUR's bracket stops one hop short** (= `verify-determinism-r2.md` VDR2-1; confirmed here, not found independently; one fix). §5.2 says "a row marked † names in brackets the section that states how its rungs are computed" (l. 3999–4000). F-CONTOUR† reads "[§4.2 S1]" (l. 4009), and its ladder is "the coast construction of §4.2 S1 → clip every contour to the land faces in vector space before emission". Since VR-R1-4's fix, §4.2 S1 (2) states the coast construction but, for the clip, points on: "their extraction and clip to the land faces are §8.2's relief tier (F-CONTOUR, §5.2)" (l. 2677–2678). The clip is computed only at §8.2 (l. 5719–5722, RENDERING-084's home), which points back to F-CONTOUR. Nothing is lost. | VDR2-1's change: §5.2 F-CONTOUR "F-CONTOUR† a contour crosses a shore [§4.2 S1, §8.2]"; nothing else in the row changes. |

## 3. The issues round 2 claimed, and every round-1 issue about this part

The rendering repair's landing note claims "fixes VR-R1-1, VR-R1-2, VR-R1-3 (a)+(b), VR-R1-6". The pipeline repair
claims P1-1 = VR-R1-4 and the scope repair V-SCOPE-R1-02 = VR-R1-5. All six are fixed.

| issue (r1) | owner | fixed by | verdict | where the fix stands (evidence) |
|---|---|---|---|---|
| VR-R1-1 (`lit` export test at M1) | rendering | repair-r2-rendering | **FIXED** | §12.7 *Export beside the view* (l. 7410–7414): "B-CITY's browser run at M1 adds, in §12.1's timing phase, a scripted pan and zoom during an A2 300-dpi export of a CITY, and from M2b, where `lit` ships, a `lit` export of a CITY while a `path` sun advances one step per frame — pass: …; for the `lit` export, the export made with the sun stopped at the request's time". This is r1's required wording. `lit` ships at M2b (§16's M2b row, l. 8645: "`lit` on Canvas2D at all four bands"; §12.7 l. 7374–7375). The optional §16 M2b pointer was not added (§8, O1). |
| VR-R1-2 (a measurement §8.4 does not define) | rendering | repair-r2-rendering | **FIXED** | §12.8 *Canvases during a raster export* (l. 7481–7482): "bounded by §8.8's ≤ 5 MB crown-and-atlas scratch, which holds one set with the atlases (a set is §12.7's 160 sprites)". The PLAUSIBLE-until-measured claim is gone, and nothing was added to §8.4 (r1's primary option). §12.7 states the 160 sprites (l. 7373; 20 crowns per class × 8 classes, l. 7370–7372), and §8.8 the ≤ 5 MB (l. 6074). The sums, re-derived in r1, are unchanged. |
| VR-R1-3 (a) (§8.10 restating §6.1's key) | rendering | repair-r2-rendering | **FIXED** (new side effect → VR-R2-1) | §8.10 (l. 6260–6262): "Its random source is `rng.stream` (§6.1, §14) under the `render.stampTiles` key and components of §6.1's registry entry (J-R42)". The construction's own "The band (creation index 4)" and "Each tile (creation index 0–3)" stay (l. 6267–6268). §6.1 (l. 4176–4181) states the components and zeros once. The "four-lane finaliser", which §6.1 lacks, went with the restatement → VR-R2-1. |
| VR-R1-3 (b) (§12.6 restating §7.3 item 2's list) | rendering | repair-r2-rendering | **FIXED** (wording → VR-R2-2) | §12.6 (l. 7329–7331): "A replay (§7.3 item 2's replay mode) … the view stages once at the end (§7.3 item 2) — … ≤ 3 ms per such event". The replay list and "S14 and S13b run once at the end" are stated once, at §7.3 item 2 (l. 4866–4870). "the undo of an upgrade after a" occurs once in the document. The per-event ≤ 3 ms and the law V are kept. The missing verb → VR-R2-2. |
| VR-R1-4 (contour clip twice) | pipeline | repair-r2-pipeline (P1-1) | **FIXED** (ripple → VR-R2-3) | §4.2 S1 (2) (l. 2677–2678): "contour lines are not model geometry: their extraction and clip to the land faces are §8.2's relief tier (F-CONTOUR, §5.2), so a contour never crosses the shore, …"; the coast construction is kept (l. 2675–2677). §8.2's relief tier (l. 5719–5722) is the one statement of the extraction and the clip. §12.4's S1 row, "no contours here (extracted per render tile, §8.2)" (l. 7218), agrees. |
| VR-R1-5 (two pointers name §12.2 for §1.1's facts) | scope | repair-r2-scope (V-SCOPE-R1-02) | **FIXED** | §1.2 (l. 196): "(124–145 ms across the target's building range, §1.1; §12.1)" — the figure is §12.5's TOWN row (l. 7270) at §1.1's 1 200–1 500 buildings, the form r1 required. §0.2 row 4 (l. 107): "§12.2 (matched reference sizes and the band ends in buildings)" — §12.2 keeps the MFCG columns (l. 7105–7110) and defines a band's ends "at 3.4 persons per building (in buildings: §12.5's table)" (l. 7112–7114). |
| VR-R1-6 (§12.7 credits §3.7 with ≤ 3 µs) | rendering | repair-r2-rendering | **FIXED** | §12.7 *Stage-3 hook* (l. 7418–7419): "(≤ 3 µs per plot median, §12.4's S11 row; the kernel's M0 bar, §3.7)". §12.4's row (l. 7229) states "S11 ≤ 5 µs median per plot — its geometry share ≤ 3 µs (the kernel's M0 bar, §3.7)", and §3.7 M0 (ii) measures "S11's geometry share against its §12.4 row" (l. 2328). The same pattern in §2.6 (V-MODEL-R1-02) is fixed too: "(≤ 25 µs, §12.4's S11 row; PLAUSIBLE)" (l. 963). |

The rendering lane's vetoable calls all hold. Dropping the measurement claim (VR-R1-2) was r1's primary option. Naming
"the view stages" (VR-R1-3 (b)) reduces the duplicate further; only the verb is missing (VR-R2-2). Keeping the audit
ids is the document-wide convention, still for the validator or Fable (§8).

## 4. Open items routed to this part (NR5-1, NR5-2, NR5-3)

| item | verdict | evidence |
|---|---|---|
| NR5-1 | **FIXED** | Unchanged by round 2 except its §12.7 run, which now schedules the `lit` export from M2b (VR-R1-1). `TileRasterOpts.lightStep` beside `sun?` (l. 6162). "The queue passes the view's drawn light step for `under`, `over` and `base` …; an export's jobs get its request's sheet, switches, shadow sun and light step" (l. 6174–6175). The request row (l. 6148). Class 4 bakes an uncached crown set (l. 6197). §8.4 passes the drawn step "as `TileRasterOpts.lightStep` (§8.9)" (l. 5943–5945). §11.1 (l. 6847–6849). §8.8 (l. 6074–6075), §8.10 (l. 6323–6326) and §12.8 (l. 7471, 7479–7482) count or hold the set. The run's pass criterion is intact (l. 7412–7414). |
| NR5-2 | **FIXED** | Unchanged: `interface LabelRows { labels: LabelTable; strings: StringTable; geom: GeomTable }` (l. 6436), taken by `begin` and `place` (l. 6439–6440); §8.1 (l. 5472) and §14 (l. 8231, 8276, 8320–8321) agree. |
| NR5-3 | **FIXED** | Unchanged: "6–9 % smaller than None's on the relief and textured looks (J-R53)" (l. 7409). Round 2 changed other §12.7 bullets only. |

## 5. Conflicts touching the part (canon), re-checked where round 2 touched their places

* **RENDERING-C01 / C02 / C03** — as NR5-2, NR5-1, NR5-3 (§4). C02's r1 note "see VR-R1-1" is now closed.
* **RENDERING-C08** — §12.6 was replaced, but its warp bullet is unchanged: "≥ 30 fps for a brush radius ≤ 150 m at
  the district band (§8.8)" (l. 7350). §8.8's "frame rate: §12.6" is unchanged.
* **RENDERING-C06, CANON-C06** — §5.2 was replaced for the F-SKELETON row only. F-LABEL still points to §9.4, and GAP-2
  stays the owner's / Fable's.
* **CANON-C05** — §12.4's header, "Each stage's mechanism is its stage section's (§4)", is unchanged. Round 2's §4.2,
  §4.4 and §4.8 hunks change no mechanism a row points to: S1 (1) and (3), S2–S3, S5 and S7 are unchanged, and S1 (2)'s
  clip left §4.2, as the S1 row already says.
* **RENDERING-C04, C05, C07, CANON-C01, C03, C04, SCOPE-C01, SCOPE-C10, KERNEL-C13** — carried. Their places (§12.1,
  §8.8, §9.1, §9.2, §9.5, §12.2, §12.5, §8.2, §8.3, §1.1, §3.2, §11.2, §3.7, §12.9, §13.5, §16, §3.1) were not
  replaced; §12.5's "above the request cap of §12.2" still lands on the cap row (l. 7110).

## 6. What round 2 changed, in this part and in the text it points to (receipts)

**Reproduction.** `scratchpad/vr2/r0.md`, `r1.md`, `r2.md` (sha256 in `shas.txt`); `r1-r2.diff`; `blockcmp.out` (the
four blocks IDENTICAL to l. 6227–6350, 7316–7358, 7359–7425 and 7426–7498). This part went from 1 893 to 1 891 lines
and from 199 030 to 198 822 bytes by this lane's count (r1's count of the same r1 text was 199 033): §8 −129 and §12 −79,
with §9 and §11 unchanged, as assemble-r2 reports.

**The part's hunks — one per claimed fix, nothing else.**

| hunk (new lines) | place | change | fixes |
|---|---|---|---|
| 6260–6262 | §8.10 *One construction everywhere* | "under the `render.stampTiles` concern's constant entity key (§6.1's four-lane finaliser over its words; creation index 0–3 for the four tiles, 4 for the band), with reroll, attempt, epoch and salt 0 (J-R42)" → "under the `render.stampTiles` key and components of §6.1's registry entry (J-R42)" | VR-R1-3 (a) (→ VR-R2-1) |
| 7329–7331 | §12.6 *Replay and load verification* | the replay list → "(§7.3 item 2's replay mode)"; "(§7.3)" and "…, and S14 and S13b run once at the end" → "the view stages once at the end (§7.3 item 2)" | VR-R1-3 (b) (→ VR-R2-2) |
| 7410–7414 | §12.7 *Export beside the view* | "and from M2b, where `lit` ships," inserted | VR-R1-1 |
| 7418–7422 | §12.7 *Stage-3 hook* | "§3.7" → "§12.4's S11 row; the kernel's M0 bar, §3.7"; the rest re-wrapped | VR-R1-6 |
| 7481–7487 | §12.8 *Canvases during a raster export* | "(the per-set figure — 160 sprites, §12.7 — is PLAUSIBLE until M2b's moving-sun runs measure it, §8.4)" → "(a set is §12.7's 160 sprites)"; the rest re-wrapped | VR-R1-2 |

Every number of the old lines survives in the new or at the pointed-to home: 0–3 and 4 at §6.1 and in §8.10's
construction; 160 at §12.7; ≤ 3 ms, 3 µs and M1 unchanged. The only word lost is "four-lane finaliser" (VR-R2-1). The
part's headings, numbered items and anchors are unchanged, as are the J-ids cited (61) and the D-ids.

**The other parts' hunks, read for their effect on this part** (all 11 read):

| place (repair) | change | effect on this part |
|---|---|---|
| §0.2 row 4 (scope) | §12.2 pointer now "(matched reference sizes and the band ends in buildings)" | VR-R1-5 fixed; §12.2 states both (l. 7105–7114) |
| §1.2 (scope) | "124–145 ms across the target's building range, §1.1; §12.1"; paragraph re-wrapped | VR-R1-5 fixed; "≈ 0.33–0.42 s and ≈ 0.86–1.05 s … §12.5's laws" and "(§8.5)", "(§9.4, §17.2)" unchanged = §12.5 l. 7270–7272 |
| §2.6 rule 4 (model) | "(≤ 25 µs, §12.4's S11 row; PLAUSIBLE)" | lands on §12.4's "compound ≤ 40 µs (25 + 15)" (l. 7229; §8, O2); "≈ 0.4 ms … ≈ 3.6 ms … inside §12.6's warp Apply budget" and "M3a's measurement … and its pre-decided fallback are §12.6's" unchanged (l. 963–967 → §12.6 l. 7350–7356) |
| §3.3 (kernel) | " (K4)" dropped | none: pool step 1, step 5, the merge and "No `SharedArrayBuffer`" unchanged |
| §4.2 S1 (2) (pipeline) | the clip becomes a pointer to §8.2's relief tier | VR-R1-4 fixed; §8.2 l. 5722's "the coast construction is §4.2 S1 (2)" still lands (l. 2675–2677); F-CONTOUR's bracket → VR-R2-3 |
| §4.4 S5d (pipeline) | test → "§13.2's B-CITY `wealthLevel` sweep" | none (§12.4's S5 row cites §4.4's mechanism, unchanged) |
| §4.8 (pipeline) | "§5.2" dropped from the castle acceptance | none (§8.2's glacis and bailey pointer, §12.4's S7 row) |
| §5.1 tier 4 (determinism) | "skeleton → sampled medial axis (spine readers) / plain roof (roofs)" | agrees with §9.3's "the medial axis of boundary samples" (l. 6504–6505) and §8.6's "the plain roof (no ridge or hip lines) is the downgrade (§3.8)" (l. 6022) |
| §5.2 F-SKELETON (determinism) | where "S1, S11, S13a"; each reader's typed downgrade, "label spines (§9.3)" among the `spine` readers; the `regions` reader → F-PLOT | lands on §9.3 (l. 6499–6505); the roofs' plain roof = §8.3's census row (l. 5884) and §8.6 (l. 6022); S13a's ≈ 60 skeleton spines (§12.4, l. 7232) consistent |
| §7.3 item 7 (ii) (determinism) | "each face and wing ring" | none (this part cites §7.3's locality closure and items 2, 3 and 4) |
| §13.2 B-EDIT (scope) | the load-verification case: "on an edited CITY document", the forced mismatch, "the mismatch withdraws the keep" | none: §12.6's law and §11.3's bridged verification cite §2.9 step 3 and §6.2 (iii) (unchanged; §6.2 (iii) l. 4314–4315 states the withdrawal); §13.2's "re-run cost against §12.6" unchanged |

**Pointers into replaced text, re-read.** 51 `§` references in this part point into another part's replaced subsection:
§2.6 ×17, §7.3 ×9, §3.3 ×9, §13.2 ×8, §4.2 ×4, §4.8 ×2, §5.2 ×1 and §4.4 ×1 (`ptrs-into-oth.txt`). Each was read at
its target, and none cites a changed line except §8.2's "(F-CONTOUR, §5.2; the coast construction is §4.2 S1 (2))",
which still lands. The changed lines hold 18 pointers into this part: 9 in the other parts' hunks (§0.2 → §12.2;
§1.2 → §12.1, §12.5, §8.5 and §9.4; §2.6 → §12.4's S11 row; §4.2 → §8.2's relief tier; §5.2 → §9.3; §13.2 → §12.6)
and 9 in the part's own (§12.7 → §12.5, §8.9 ×3, §11.1, §12.4 ×2 and §8.6; §12.8 → §12.7's 160 sprites). Each lands
on a statement of what it cites (above, and §3).

## 7. Mechanical checks (executed)

* **References.** `assemble-r0-refs.py` on the current document: 134 headings, 35 D-ids, 276 J-index rows and 2
  unresolved pointers, both external (l. 2036, `os-geometry.md` §2.1.4; l. 6826, RFC 7946 §3.1.6, in this part, as in
  r0 and r1).
* **Document checks.** `python3 docs/validation/bench/doc_checks.py --sections "8,9,11,12"` with the allow file: C1 5,
  C2 0, C3 73, C4 1, S1 0 and S2 0 hits, **0 unreviewed**, exit 0. The counts are the same as r1's.
* **J- and D-ids.** 61 distinct J-ids in the part (56 J-R plus J-DET-42, J-I2, J-I9, J-P28 and J-S19), each with an
  index row and a Part A row. D-7, D-8, D-18 and D-31 resolve. F.5 of `docs/ARCHITECTURE-RATIONALE.md` is identical to
  r1's copy (28 282 bytes; the file was last written at 16:23, before r1's check). Round 2 touched no index row.
* **Markers, deferral, narration, tags.** 0 "PENDING FABLE REVIEW" lines in the part; the document keeps its one
  banner (l. 3). Deferral words: "later" ×4, "pending" ×5 and "undecided" ×1, all technical and on the same lines as
  in r1 (r1's "pending ×6" was a miscount: the same scan of the r1 document gives 5). 0 TBD, TODO, deferred, open
  question, future or not yet. Round narration: 0. Fix-round tags: 0; "VS27" (l. 5840) is the archive's short form of
  the coverage id COV-NG-VS27.
* **One statement each.** The replay list: ×1 (§7.3 item 2, l. 4866). "reroll, attempt, epoch and salt 0": ×1 (§6.1,
  l. 4179). "160 sprites": stated at §12.7 (l. 7373), pointed to from §12.8. "`lit` ships" at M2b: §12.7 ×2, both =
  §16's M2b row.
* **Numbers beside pointers** (`numptr.txt`, `numptr-rest.txt`). The scan checks every parenthetical in the part that
  holds a number with a unit and a `§` pointer, and tests whether the number occurs in the target section. It finds 3
  hits, all the part's own or derived figures that r1 already counted (§11.1's ≈ 15.7 km, §12.1's ≈ 40 ms beside §8.8,
  §12.5's ≈ 4 µs).
  The stage-3 hook's hit is gone (VR-R1-6). Pointers from the rest of the document into the part give 2 hits: §1.2's
  124–145 ms, the archive's form, which cites §12.1 for the reference machine (the figure is §12.5's), and §2.6's
  ≤ 25 µs, printed in §12.4's row as "(25 + 15)" (§8, O2).
* **Size.** The part is 198 822 bytes, 81.1 % of the archived 245 128, against the pass's 55–65 % target (r1: 81.2 %).

## 8. Observations (not raised)

* **O1 — §16's M2b exit does not list the `lit` export beside a moving sun.** §12.7 is the test's home and names M2b.
  M2b's exit lists "the light passes and the crown bake of a `path` sun in `lit` … (§8.4, §12.7)" but not this run.
  R10 has §16 point to criteria homes, and the two do not disagree. r1 offered the pointer as optional, and scope and
  assemble-r2 (§6) declined it. It stays optional.
* **O2 — §12.4's S11 row gives S11's compound geometry share only as the first term of "compound ≤ 40 µs (25 + 15)"**
  (l. 7229), by parallel with "its geometry share ≤ 3 µs … plus rule evaluation ≤ 2 µs". §2.6's new pointer (≤ 25 µs)
  lands there, and the kernel verifier accepts it (KERNEL-318/319). Writing "(25 geometry + 15 rules)" would put the
  words on the page. The value agrees, so this is optional.
* **O3 — §4.2 S1 (2) keeps "so a contour never crosses the shore, cliffs and sub-cell spits included (steep-coast and
  cliff fixtures in the golden suite)"** (l. 2678–2679). This is the property and a test pointer, and it agrees with
  §8.2's "so no contour crosses a shore" and F-CONTOUR's "steep-coast, cliff and spit fixtures". It is the pipeline's
  text (`verify-pipeline-r2.md` records it as kept).
* **O4 — how VR-R2-1 happened.** VR-R1-3 (a)'s required change treated the whole §8.10 keep as a duplicate. It checked
  the words round 1 had added to §6.1, but not the one word the rewrite's note listed that §6.1 never received. Any
  future "drop the restatement" change should first diff the restatement word by word against its home (R13).
* **Carried from r1 (unchanged by round 2):**
  * S10 (0)'s ≈ 5.3 ms against its 5 ms p50, and the ≈ 2.3 ms stated at both §3.3 and §12.4.
  * An uncached export crown set is held from the export's start.
  * The audit-id (tag-style) convention awaits the validator's or Fable's ruling.
  * Derived numbers sit beside pointers.
  * §7.4's rebases restate §2.9 step 4.
  * GAP-2; the `title` entity's missing `LabelTable` row; §8.2's and §8.10's glosses; §15.2's O12 row.

## 9. Checked list — every inventory id

Columns: the r1 verdict (r1 §9) and the r2 scope. The scopes are:
* **text changed** — the id's text lies on a line round 2 changed; re-read against the archive and r1. **(wrap
  only)** means the same words with a new line break.
* **home §x replaced** — its text lies in §8.10, §12.6, §12.7 or §12.8 on unchanged lines; the diff proves it
  byte-identical to r1, where it was read.
* **J-pointer in §x (replaced)** — a rationale pointer inside a replaced subsection; the pointer is present.
* **target §x replaced** — a pointer target, canon home or other-part restatement lies in a subsection another repair
  replaced (or, marked "(this part)", in one of the four above); re-read at the target.
* **re-checked (…)** — tied to an r1 issue fixed elsewhere.
* **J-row / F.5** and **F.5 (history)** — rationale and history ids; F.5 is identical and the index is unchanged.
* **carried** — r1's verdict stands.

Then the r2 verdict and a note. Line numbers are the current document's.

| id | kind | r1 verdict | r2 scope | r2 verdict | note |
|---|---|---|---|---|---|
| RENDERING-001 | summary | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-002 | interface | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-003 | type | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-004 | type | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-005 | interface | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-006 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-007 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-008 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-009 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-010 | interface | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-011 | interface | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-012 | interface | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-013 | interface | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-014 | interface | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-015 | interface | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-016 | interface | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-017 | interface | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-018 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-019 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-020 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-021 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-022 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-023 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-024 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-025 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-026 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-027 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-028 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-029 | mechanism | OK | target §7.3 replaced | OK | §7.3's only r2 change is item 7 (ii)'s "and wing ring" — the statement this id cites or restates is unchanged |
| RENDERING-030 | rule | OK | target §7.3 replaced | OK | §7.3's only r2 change is item 7 (ii)'s "and wing ring" — the statement this id cites or restates is unchanged |
| RENDERING-031 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-032 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-033 | defined-term | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-034 | defined-term | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-035 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-036 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-037 | budget | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-038 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-039 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-040 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-041 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-042 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-043 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-044 | interface | OK | target §2.6 replaced | OK | §2.6's only r2 change is rule 4's cost pointer (≤ 25 µs → §12.4's S11 row) — the statement this id cites or restates is unchanged |
| RENDERING-045 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-046 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-047 | interface | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-048 | interface | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-049 | defined-term | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-050 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-051 | acceptance-bar | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-052 | test | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-053 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-054 | evidence | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-055 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-056 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-057 | algorithm-step | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-058 | history | OK | F.5 (history) | OK | verbatim in F.5, identical to r1's copy (the rationale file unchanged since 16:23; r2 touched no index row) |
| RENDERING-059 | evidence | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-060 | acceptance-bar | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-061 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-062 | number | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-063 | evidence | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-064 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-065 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-066 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-067 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-068 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-069 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-070 | evidence | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-071 | number | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-072 | number | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-073 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-074 | rule | OK | target §4.8 replaced | OK | §4.8's only r2 change is the castle acceptance's dropped "§5.2" — the statement this id cites or restates is unchanged |
| RENDERING-075 | defined-term | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-076 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-077 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-078 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-079 | rule | OK | target §2.6 replaced | OK | §2.6's only r2 change is rule 4's cost pointer (≤ 25 µs → §12.4's S11 row) — the statement this id cites or restates is unchanged |
| RENDERING-080 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-081 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-082 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-083 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-084 | rule | OK — VR-R0-7 FIXED; see VR-R1-4 | re-checked (VR-R1-4) | OK — VR-R1-4 FIXED | §4.2 S1 (2) l. 2677–2678 now "their extraction and clip to the land faces are §8.2's relief tier (F-CONTOUR, §5.2)", keeping the coast construction; §8.2 l. 5719–5722 is the one statement of the clip; F-CONTOUR l. 4009 and §5.3 l. 4063 unchanged |
| RENDERING-085 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-086 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-087 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-088 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-089 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-090 | interface | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-091 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-092 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-093 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-094 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-095 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-096 | number | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-097 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-098 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-099 | test | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-100 | algorithm-step | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-101 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-102 | test | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-103 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-104 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-105 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-106 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-107 | acceptance-bar | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-108 | number | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-109 | number | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-110 | number | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-111 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-112 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-113 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-114 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-115 | rule | OK | target §8.10 replaced (this part) | OK | the pointed-to statement in §8.10 unchanged apart from the r2 substitutions, which it does not cite |
| RENDERING-116 | budget | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-117 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-118 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-119 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-120 | test | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-121 | rule | OK | target §8.10 replaced (this part) | OK | the pointed-to statement in §8.10 unchanged apart from the r2 substitutions, which it does not cite |
| RENDERING-122 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-123 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-124 | defined-term | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-125 | test | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-126 | test | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-127 | test | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-128 | test | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-129 | test | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-130 | test | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-131 | test | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-132 | test | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-133 | test | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-134 | test | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-135 | test | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-136 | test | OK | target §13.2 replaced | OK | §13.2's only r2 change is B-EDIT's load-verification case — the statement this id cites or restates is unchanged |
| RENDERING-137 | test | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-138 | test | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-139 | test | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-140 | test | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-141 | test | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-142 | test | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-143 | test | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-144 | test | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-145 | test | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-146 | test | OK | target §13.2 replaced | OK | §13.2's only r2 change is B-EDIT's load-verification case — the statement this id cites or restates is unchanged |
| RENDERING-147 | test | OK — VR-R0-12 FIXED | carried | OK — VR-R0-12 FIXED | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-148 | test | OK | target §5.2 replaced | OK | §5.2's new F-SKELETON row keeps "roofs: a plain roof — footprint drawn without ridge or hip lines, roof kind `plain`" (l. 4018), the census row's downgrade (l. 5884) |
| RENDERING-149 | test | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-150 | test | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-151 | test | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-152 | test | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-153 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-154 | interface | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-155 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-156 | rule | OK | target §4.2 replaced | OK | §4.2 S1 (2)'s floating-island outline sentences (l. 2679–2683) unchanged; §8.4 l. 5904 still lands |
| RENDERING-157 | defined-term | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-158 | defined-term | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-159 | rule | OK | target §2.6 replaced | OK | §2.6's only r2 change is rule 4's cost pointer (≤ 25 µs → §12.4's S11 row) — the statement this id cites or restates is unchanged |
| RENDERING-160 | rule | OK | target §2.6 replaced | OK | §2.6's only r2 change is rule 4's cost pointer (≤ 25 µs → §12.4's S11 row) — the statement this id cites or restates is unchanged |
| RENDERING-161 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-162 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-163 | interface | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-164 | number | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-165 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-166 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-167 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-168 | budget | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-169 | acceptance-bar | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-170 | budget | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-171 | acceptance-bar | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-172 | mechanism | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-173 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-174 | defined-term | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-175 | acceptance-bar | OK | target §12.7 replaced (this part) | OK | the crown-library bullet of §12.7 (l. 7370–7376: ≤ 20 ms per (style, light step), measured with M2b's moving-sun runs) unchanged |
| RENDERING-176 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-177 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-178 | rule | OK | target §2.6 replaced | OK | §2.6's only r2 change is rule 4's cost pointer (≤ 25 µs → §12.4's S11 row) — the statement this id cites or restates is unchanged |
| RENDERING-179 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-180 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-181 | defined-term | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-182 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-183 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-184 | algorithm-step | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-185 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-186 | acceptance-bar | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-187 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-188 | acceptance-bar | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-189 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-190 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-191 | acceptance-bar | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-192 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-193 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-194 | rule | OK | target §1.2 replaced | OK | §1.2's "The first paint is the finished picture (§8.5)" (l. 197–198) unchanged (re-wrapped) |
| RENDERING-195 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-196 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-197 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-198 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-199 | rule | OK | target §2.6 replaced | OK | §2.6's only r2 change is rule 4's cost pointer (≤ 25 µs → §12.4's S11 row) — the statement this id cites or restates is unchanged |
| RENDERING-200 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-201 | rule | OK | target §2.6 replaced | OK | §2.6's only r2 change is rule 4's cost pointer (≤ 25 µs → §12.4's S11 row) — the statement this id cites or restates is unchanged |
| RENDERING-202 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-203 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-204 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-205 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-206 | acceptance-bar | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-207 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-208 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-209 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-210 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-211 | test | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-212 | mechanism | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-213 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-214 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-215 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-216 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-217 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-218 | budget | OK | target §12.8 replaced (this part) | OK | §12.8's canvases paragraph still counts an export-held set "with the canvases" (l. 7471, 7479–7482); only its parenthetical changed (VR-R1-2) |
| RENDERING-219 | budget | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-220 | budget | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-221 | evidence | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-222 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-223 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-224 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-225 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-226 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-227 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-228 | mechanism | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-229 | budget | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-230 | rule | OK | target §12.6 replaced (this part) | OK | the pointed-to statement in §12.6 unchanged apart from the r2 substitutions, which it does not cite |
| RENDERING-231 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-232 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-233 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-234 | acceptance-bar | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-235 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-236 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-237 | acceptance-bar | OK | target §12.7 replaced (this part) | OK | the pointed-to statement in §12.7 unchanged apart from the r2 substitutions, which it does not cite |
| RENDERING-238 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-239 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-240 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-241 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-242 | interface | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-243 | interface | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-244 | interface | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-245 | interface | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-246 | interface | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-247 | interface | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-248 | budget | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-249 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-250 | type | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-251 | interface | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-252 | interface | OK — VR-R0-1 FIXED | carried | OK — VR-R0-1 FIXED | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-253 | algorithm-step | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-254 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-255 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-256 | number | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-257 | mechanism | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-258 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-259 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-260 | budget | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-261 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-262 | mechanism | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-263 | budget | OK | target §12.7 replaced (this part) | OK | the pointed-to statement in §12.7 unchanged apart from the r2 substitutions, which it does not cite |
| RENDERING-264 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-265 | budget | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-266 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-267 | acceptance-bar | OK | target §12.7 replaced (this part) | OK | §8.9 l. 6224 "exports beside the view are §12.7's run" still lands (l. 7410–7414; the `lit` part now from M2b, VR-R1-1) |
| RENDERING-268 | acceptance-bar | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-269 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-270 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-271 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-272 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-273 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-274 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-275 | interface | OK | home §8.10 replaced | OK | §8.10's only r2 change is the stamp-tile random-source sentence (l. 6260–6262); this text unchanged (diff) |
| RENDERING-276 | rule | OK — VR-R0-11 FIXED | home §8.10 replaced | OK — VR-R0-11 FIXED | §8.10's only r2 change is the stamp-tile random-source sentence (l. 6260–6262); this text unchanged (diff) |
| RENDERING-277 | rule | OK | home §8.10 replaced | OK | §8.10's only r2 change is the stamp-tile random-source sentence (l. 6260–6262); this text unchanged (diff) |
| RENDERING-278 | number | OK | home §8.10 replaced | OK | §8.10's only r2 change is the stamp-tile random-source sentence (l. 6260–6262); this text unchanged (diff) |
| RENDERING-279 | defined-term | OK | home §8.10 replaced | OK | §8.10's only r2 change is the stamp-tile random-source sentence (l. 6260–6262); this text unchanged (diff) |
| RENDERING-280 | rule | OK | home §8.10 replaced | OK | §8.10's only r2 change is the stamp-tile random-source sentence (l. 6260–6262); this text unchanged (diff) |
| RENDERING-281 | invariant | OK | home §8.10 replaced | OK | §8.10's only r2 change is the stamp-tile random-source sentence (l. 6260–6262); this text unchanged (diff) |
| RENDERING-282 | evidence | OK | home §8.10 replaced | OK | §8.10's only r2 change is the stamp-tile random-source sentence (l. 6260–6262); this text unchanged (diff) |
| RENDERING-283 | rule | OK | home §8.10 replaced | OK | §8.10's only r2 change is the stamp-tile random-source sentence (l. 6260–6262); this text unchanged (diff) |
| RENDERING-284 | rule | OK | home §8.10 replaced | OK | §8.10's only r2 change is the stamp-tile random-source sentence (l. 6260–6262); this text unchanged (diff) |
| RENDERING-285 | rule | OK | home §8.10 replaced | OK | §8.10's only r2 change is the stamp-tile random-source sentence (l. 6260–6262); this text unchanged (diff) |
| RENDERING-286 | rule | VR-R1-3 | text changed | VR-R2-1 (VR-R1-3 (a) FIXED) | l. 6260–6262: "under the `render.stampTiles` key and components of §6.1's registry entry (J-R42)"; §6.1 l. 4176–4181 states the components (constant entity key over domain, class index, 400 cm, creation index 0–3 / 4; `STAGE_VIEW`; reroll, attempt, epoch, salt 0); the construction's own "creation index 4" / "0–3" kept (l. 6267–6268); the archive's "§6.1's four-lane finaliser over the words" (archive l. 7744) is now stated nowhere → VR-R2-1 |
| RENDERING-287 | algorithm-step | OK | text changed (wrap only) | OK | l. 6262–6263: "**Sampling:** Bridson with k = 50 candidates, all evaluated. Every accepted point …" — same words, new line break |
| RENDERING-288 | algorithm-step | OK | home §8.10 replaced | OK | §8.10's only r2 change is the stamp-tile random-source sentence (l. 6260–6262); this text unchanged (diff) |
| RENDERING-289 | algorithm-step | OK | home §8.10 replaced | OK | §8.10's only r2 change is the stamp-tile random-source sentence (l. 6260–6262); this text unchanged (diff) |
| RENDERING-290 | rule | OK | home §8.10 replaced | OK | §8.10's only r2 change is the stamp-tile random-source sentence (l. 6260–6262); this text unchanged (diff) |
| RENDERING-291 | number | OK | home §8.10 replaced | OK | §8.10's only r2 change is the stamp-tile random-source sentence (l. 6260–6262); this text unchanged (diff) |
| RENDERING-292 | decision | OK | J-pointer in §8.10 (replaced) | OK | pointer present, text unchanged (diff); J-row and F.5 unchanged |
| RENDERING-293 | decision | OK | J-pointer in §8.10 (replaced) | OK | pointer present, text unchanged (diff); J-row and F.5 unchanged |
| RENDERING-294 | interface | OK | home §8.10 replaced | OK | §8.10's only r2 change is the stamp-tile random-source sentence (l. 6260–6262); this text unchanged (diff) |
| RENDERING-295 | rule | OK | home §8.10 replaced | OK | §8.10's only r2 change is the stamp-tile random-source sentence (l. 6260–6262); this text unchanged (diff) |
| RENDERING-296 | acceptance-bar | OK | home §8.10 replaced | OK | §8.10's only r2 change is the stamp-tile random-source sentence (l. 6260–6262); this text unchanged (diff) |
| RENDERING-297 | rule | OK | home §8.10 replaced | OK | §8.10's only r2 change is the stamp-tile random-source sentence (l. 6260–6262); this text unchanged (diff) |
| RENDERING-298 | history | OK | F.5 (history) | OK | verbatim in F.5, identical to r1's copy (the rationale file unchanged since 16:23; r2 touched no index row) |
| RENDERING-299 | decision | OK | J-pointer in §8.10 (replaced) | OK | pointer present, text unchanged (diff); J-row and F.5 unchanged |
| RENDERING-300 | algorithm-step | OK | home §8.10 replaced | OK | §8.10's only r2 change is the stamp-tile random-source sentence (l. 6260–6262); this text unchanged (diff) |
| RENDERING-301 | algorithm-step | OK | home §8.10 replaced | OK | §8.10's only r2 change is the stamp-tile random-source sentence (l. 6260–6262); this text unchanged (diff) |
| RENDERING-302 | invariant | OK | home §8.10 replaced | OK | §8.10's only r2 change is the stamp-tile random-source sentence (l. 6260–6262); this text unchanged (diff) |
| RENDERING-303 | defined-term | OK | home §8.10 replaced | OK | §8.10's only r2 change is the stamp-tile random-source sentence (l. 6260–6262); this text unchanged (diff) |
| RENDERING-304 | rule | OK | home §8.10 replaced | OK | §8.10's only r2 change is the stamp-tile random-source sentence (l. 6260–6262); this text unchanged (diff) |
| RENDERING-305 | decision | OK | J-pointer in §8.10 (replaced) | OK | pointer present, text unchanged (diff); J-row and F.5 unchanged |
| RENDERING-306 | algorithm-step | OK | home §8.10 replaced | OK | §8.10's only r2 change is the stamp-tile random-source sentence (l. 6260–6262); this text unchanged (diff) |
| RENDERING-307 | algorithm-step | OK | home §8.10 replaced | OK | §8.10's only r2 change is the stamp-tile random-source sentence (l. 6260–6262); this text unchanged (diff) |
| RENDERING-308 | rule | OK | home §8.10 replaced | OK | §8.10's only r2 change is the stamp-tile random-source sentence (l. 6260–6262); this text unchanged (diff) |
| RENDERING-309 | rule | OK | home §8.10 replaced | OK | §8.10's only r2 change is the stamp-tile random-source sentence (l. 6260–6262); this text unchanged (diff) |
| RENDERING-310 | rule | OK | home §8.10 replaced | OK | §8.10's only r2 change is the stamp-tile random-source sentence (l. 6260–6262); this text unchanged (diff) |
| RENDERING-311 | rule | OK | home §8.10 replaced | OK | §8.10's only r2 change is the stamp-tile random-source sentence (l. 6260–6262); this text unchanged (diff) |
| RENDERING-312 | interface | OK | home §8.10 replaced | OK | §8.10's only r2 change is the stamp-tile random-source sentence (l. 6260–6262); this text unchanged (diff) |
| RENDERING-313 | rule | OK | home §8.10 replaced | OK | §8.10's only r2 change is the stamp-tile random-source sentence (l. 6260–6262); this text unchanged (diff) |
| RENDERING-314 | rule | OK | home §8.10 replaced | OK | §8.10's only r2 change is the stamp-tile random-source sentence (l. 6260–6262); this text unchanged (diff) |
| RENDERING-315 | rule | OK | home §8.10 replaced | OK | §8.10's only r2 change is the stamp-tile random-source sentence (l. 6260–6262); this text unchanged (diff) |
| RENDERING-316 | decision | OK | J-pointer in §8.10 (replaced) | OK | pointer present, text unchanged (diff); J-row and F.5 unchanged |
| RENDERING-317 | rule | OK | home §8.10 replaced | OK | §8.10's only r2 change is the stamp-tile random-source sentence (l. 6260–6262); this text unchanged (diff) |
| RENDERING-318 | budget | OK | home §12.7 replaced | OK | §12.7's r2 changes are Export beside the view and the Stage-3 hook's pointer; this text unchanged (diff) |
| RENDERING-319 | decision | OK | J-pointer in §8.10 (replaced) | OK | pointer present, text unchanged (diff); J-row and F.5 unchanged |
| RENDERING-320 | decision | OK | J-pointer in §8.10 (replaced) | OK | pointer present, text unchanged (diff); J-row and F.5 unchanged |
| RENDERING-321 | decision | OK | J-pointer in §8.10 (replaced) | OK | pointer present, text unchanged (diff); J-row and F.5 unchanged |
| RENDERING-322 | decision | OK | J-pointer in §8.10 (replaced) | OK | pointer present, text unchanged (diff); J-row and F.5 unchanged |
| RENDERING-323 | decision | OK | J-pointer in §8.10 (replaced) | OK | pointer present, text unchanged (diff); J-row and F.5 unchanged |
| RENDERING-324 | summary | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-325 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-326 | interface | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-327 | interface | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-328 | interface | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-329 | interface | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-330 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-331 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-332 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-333 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-334 | test | OK | target §13.2 replaced | OK | §13.2's only r2 change is B-EDIT's load-verification case — the statement this id cites or restates is unchanged |
| RENDERING-335 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-336 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-337 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-338 | test | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-339 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-340 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-341 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-342 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-343 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-344 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-345 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-346 | interface | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-347 | interface | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-348 | algorithm-step | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-349 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-350 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-351 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-352 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-353 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-354 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-355 | test | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-356 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-357 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-358 | budget | OK | home §12.7 replaced | OK | §12.7's r2 changes are Export beside the view and the Stage-3 hook's pointer; this text unchanged (diff) |
| RENDERING-359 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-360 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-361 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-362 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-363 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-364 | algorithm-step | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-365 | acceptance-bar | OK — VR-R0-13 FIXED | carried | OK — VR-R0-13 FIXED | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-366 | rule | OK | target §5.2 replaced | OK | §5.2's F-SKELETON row now names "label spines (§9.3)" among the `spine` readers with "a sampled medial axis" (l. 4018) = §9.3's "the medial axis of boundary samples" (l. 6504–6505); §5.1 tier 4 "sampled medial axis (spine readers)" (l. 3988) |
| RENDERING-367 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-368 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-369 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-370 | acceptance-bar | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-371 | algorithm-step | OK | target §5.2 replaced | OK | §5.2's F-LABEL row unchanged (points to §9.4) |
| RENDERING-372 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-373 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-374 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-375 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-376 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-377 | evidence | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-378 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-379 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-380 | acceptance-bar | OK | target §5.2 replaced | OK | §5.2's F-LABEL test cell unchanged |
| RENDERING-381 | acceptance-bar | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-382 | history | OK | F.5 (history) | OK | verbatim in F.5, identical to r1's copy (the rationale file unchanged since 16:23; r2 touched no index row) |
| RENDERING-383 | acceptance-bar | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-384 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-385 | algorithm-step | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-386 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-387 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-388 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-389 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-390 | interface | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-391 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-392 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-393 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-394 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-395 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-396 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-397 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-398 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-399 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-400 | test | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-401 | summary | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-402 | rule | OK | target §13.2 replaced | OK | §13.2's only r2 change is B-EDIT's load-verification case — the statement this id cites or restates is unchanged |
| RENDERING-403 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-404 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-405 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-406 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-407 | test | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-408 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-409 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-410 | budget | OK | home §12.7 replaced | OK | §12.7's r2 changes are Export beside the view and the Stage-3 hook's pointer; this text unchanged (diff) |
| RENDERING-411 | test | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-412 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-413 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-414 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-415 | rule | OK | target §2.6 replaced | OK | §2.6's only r2 change is rule 4's cost pointer (≤ 25 µs → §12.4's S11 row) — the statement this id cites or restates is unchanged |
| RENDERING-416 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-417 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-418 | test | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-419 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-420 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-421 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-422 | algorithm-step | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-423 | number | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-424 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-425 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-426 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-427 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-428 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-429 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-430 | mechanism | OK | target §12.7 replaced (this part) | OK | the pointed-to statement in §12.7 unchanged apart from the r2 substitutions, which it does not cite |
| RENDERING-431 | budget | OK | target §12.7, §12.8 replaced (this part) | OK | the pointed-to statement in §12.7, §12.8 unchanged apart from the r2 substitutions, which it does not cite |
| RENDERING-432 | mechanism | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-433 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-434 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-435 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-436 | interface | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-437 | evidence | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-438 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-439 | acceptance-bar | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-440 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-441 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-442 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-443 | interface | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-444 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-445 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-446 | type | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-447 | interface | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-448 | type | OK | target §7.3 replaced | OK | §7.3's only r2 change is item 7 (ii)'s "and wing ring" — the statement this id cites or restates is unchanged |
| RENDERING-449 | type | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-450 | type | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-451 | interface | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-452 | rule | OK | target §7.3 replaced | OK | §7.3's only r2 change is item 7 (ii)'s "and wing ring" — the statement this id cites or restates is unchanged |
| RENDERING-453 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-454 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-455 | budget | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-456 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-457 | rule | OK | target §3.3 replaced | OK | §3.3's only r2 change is the dropped "(K4)" in the batch-faces bullet — the statement this id cites or restates is unchanged |
| RENDERING-458 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-459 | interface | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-460 | interface | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-461 | defined-term | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-462 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-463 | rule | OK | target §7.3 replaced | OK | §7.3's only r2 change is item 7 (ii)'s "and wing ring" — the statement this id cites or restates is unchanged |
| RENDERING-464 | test | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-465 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-466 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-467 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-468 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-469 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-470 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-471 | rule | OK — VR-R0-6 FIXED | carried | OK — VR-R0-6 FIXED | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-472 | rule | OK — VR-R0-5 FIXED | carried | OK — VR-R0-5 FIXED | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-473 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-474 | rule | OK | target §5.2 replaced | OK | §5.2's F-EDIT row unchanged |
| RENDERING-475 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-476 | decision | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-477 | interface | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-478 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-479 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-480 | summary | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-481 | defined-term | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-482 | evidence | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-483 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-484 | defined-term | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-485 | defined-term | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-486 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-487 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-488 | rule | OK | target §13.2 replaced | OK | §13.2's only r2 change is B-EDIT's load-verification case — the statement this id cites or restates is unchanged |
| RENDERING-489 | budget | OK | target §13.2 replaced | OK | §13.2's only r2 change is B-EDIT's load-verification case — the statement this id cites or restates is unchanged |
| RENDERING-490 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-491 | rule | OK | target §12.7, §12.8 replaced (this part) | OK | §12.1's rule "Each budget of §12.3–§12.8 names the milestone that confirms it" (l. 7094–7095) holds: §12.7's `lit` run names M2b |
| RENDERING-492 | rule | OK | target §5.1, §5.2 replaced | OK | §5.1 changed only tier 4 and §5.2 only F-SKELETON; F-BUDGET-TIME (reporting only) unchanged |
| RENDERING-493 | number | OK — VR-R0-8 FIXED; see VR-R1-5 | re-checked (VR-R1-5) | OK — VR-R1-5 FIXED | §0.2 row 4 (l. 107) now "§12.2 (matched reference sizes and the band ends in buildings)" and §1.2 (l. 196) "(124–145 ms across the target's building range, §1.1; §12.1)"; §12.2 (l. 7102–7116) still states the MFCG columns, the cap row and the band-end definition |
| RENDERING-494 | number | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-495 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-496 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-497 | evidence | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-498 | history | OK | F.5 (history) | OK | verbatim in F.5, identical to r1's copy (the rationale file unchanged since 16:23; r2 touched no index row) |
| RENDERING-499 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-500 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-501 | budget | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-502 | budget | OK | target §13.2 replaced | OK | §13.2's only r2 change is B-EDIT's load-verification case — the statement this id cites or restates is unchanged |
| RENDERING-503 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-504 | budget | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-505 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-506 | decision | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-507 | acceptance-bar | OK | target §13.2 replaced | OK | §13.2's only r2 change is B-EDIT's load-verification case — the statement this id cites or restates is unchanged |
| RENDERING-508 | acceptance-bar | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-509 | test | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-510 | rule | OK | target §3.3 replaced | OK | §3.3's only r2 change is the dropped "(K4)" in the batch-faces bullet — the statement this id cites or restates is unchanged |
| RENDERING-511 | evidence | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-512 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-513 | test | OK | target §13.2 replaced | OK | §13.2's only r2 change is B-EDIT's load-verification case — the statement this id cites or restates is unchanged |
| RENDERING-514 | acceptance-bar | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-515 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-516 | budget | OK | target §4.2 replaced | OK | the S1 row's "no contours here (extracted per render tile, §8.2)" (l. 7218) agrees with §4.2 S1 (2)'s new pointer to §8.2's relief tier (l. 2677–2678) |
| RENDERING-517 | budget | OK | target §4.2 replaced | OK | §4.2's only r2 change is S1 (2)'s contour clip, now a pointer to §8.2 — the statement this id cites or restates is unchanged |
| RENDERING-518 | budget | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-519 | budget | OK | target §3.3, §4.4 replaced | OK | §3.3's only r2 change is the dropped "(K4)" in the batch-faces bullet; §4.4's only r2 change is S5d's test, now a pointer to §13.2 — the statement this id cites or restates is unchanged |
| RENDERING-520 | budget | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-521 | budget | OK — VR-R0-3 FIXED | carried | OK — VR-R0-3 FIXED | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-522 | budget | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-523 | budget | OK — VR-R0-2 FIXED | target §3.3 replaced | OK — VR-R0-2 FIXED | §3.3's only r2 change is the dropped "(K4)" in the batch-faces bullet — the statement this id cites or restates is unchanged |
| RENDERING-524 | budget | OK — VR-R0-3 FIXED | carried | OK — VR-R0-3 FIXED | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-525 | budget | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-526 | budget | OK | target §3.3 replaced | OK | §3.3's only r2 change is the dropped "(K4)" in the batch-faces bullet — the statement this id cites or restates is unchanged |
| RENDERING-527 | budget | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-528 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-529 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-530 | history | OK | F.5 (history) | OK | verbatim in F.5, identical to r1's copy (the rationale file unchanged since 16:23; r2 touched no index row) |
| RENDERING-531 | budget | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-532 | history | OK | F.5 (history) | OK | verbatim in F.5, identical to r1's copy (the rationale file unchanged since 16:23; r2 touched no index row) |
| RENDERING-533 | acceptance-bar | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-534 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-535 | budget | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-536 | budget | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-537 | rule | OK — see VR-R1-5 | re-checked (VR-R1-5) | OK — VR-R1-5 FIXED | §12.2 l. 7112–7114: the default request and "a band's bottom and top are its population ends at 3.4 persons per building (in buildings: §12.5's table)"; §1.2's 124–145 ms = §12.5's TOWN row (l. 7270) at §1.1's 1 200–1 500 buildings |
| RENDERING-538 | decision | OK | target §1.2 replaced | OK | §1.2 l. 196–198: "≈ 0.33–0.42 s and ≈ 0.86–1.05 s … §12.5's laws" unchanged = §12.5's CITY 330–420 ms and METROPOLIS 864–1 050 ms (l. 7271–7272) |
| RENDERING-539 | acceptance-bar | OK | target §13.2 replaced | OK | §13.2's only r2 change is B-EDIT's load-verification case — the statement this id cites or restates is unchanged |
| RENDERING-540 | acceptance-bar | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-541 | budget | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-542 | budget | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-543 | acceptance-bar | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-544 | budget | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-545 | budget | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-546 | budget | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-547 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-548 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-549 | budget | OK | home §12.6 replaced | OK | §12.6's only r2 change is the replay sentence (l. 7329–7331); this text unchanged (diff); §7.3's only r2 change is item 7 (ii)'s "and wing ring" — the fact it cites unchanged |
| RENDERING-550 | budget | OK | home §12.6 replaced | OK | §12.6's only r2 change is the replay sentence (l. 7329–7331); this text unchanged (diff) |
| RENDERING-551 | budget | OK | home §12.6 replaced | OK | §12.6's only r2 change is the replay sentence (l. 7329–7331); this text unchanged (diff); §13.2's only r2 change is B-EDIT's load-verification case — the fact it cites unchanged |
| RENDERING-552 | acceptance-bar | OK | home §12.6 replaced | OK | §12.6's only r2 change is the replay sentence (l. 7329–7331); this text unchanged (diff); §13.2's only r2 change is B-EDIT's load-verification case — the fact it cites unchanged |
| RENDERING-553 | rule | VR-R1-3 | text changed | OK — VR-R1-3 (b) FIXED; see VR-R2-2 | l. 7329–7331: "A replay (§7.3 item 2's replay mode) folds the log … the view stages once at the end (§7.3 item 2) — … ≤ 3 ms per such event"; §7.3 item 2 (l. 4866–4870) lists the four replay kinds and "Only the view stages wait: S14 and S13b run once at the end" = archive l. 9027–9030; the clause lacks its verb → VR-R2-2 |
| RENDERING-554 | budget | OK | text changed (wrap only) | OK | l. 7331: the lead-in "Its cost is therefore a sum over the log, not a constant:" re-wrapped; the law V = M(B) + Σ c(e) + S14(B) + 5 ms and its terms (l. 7333–7337) unchanged |
| RENDERING-555 | budget | OK | home §12.6 replaced | OK | §12.6's only r2 change is the replay sentence (l. 7329–7331); this text unchanged (diff) |
| RENDERING-556 | history | OK | F.5 (history) | OK | verbatim in F.5, identical to r1's copy (the rationale file unchanged since 16:23; r2 touched no index row) |
| RENDERING-557 | rule | OK | home §12.6 replaced | OK | §12.6's only r2 change is the replay sentence (l. 7329–7331); this text unchanged (diff) |
| RENDERING-558 | acceptance-bar | OK | home §12.6 replaced | OK | §12.6's only r2 change is the replay sentence (l. 7329–7331); this text unchanged (diff) |
| RENDERING-559 | decision | OK | J-pointer in §12.6 (replaced) | OK | pointer present, text unchanged (diff); J-row and F.5 unchanged |
| RENDERING-560 | budget | OK | target §2.6 replaced | OK | §2.6 rule 4 (l. 963–966) still states ≈ 0.4 ms per pass and ≈ 3.6 ms "inside §12.6's warp Apply budget, which counts it"; its compound bound now points to §12.4's S11 row "(25 + 15)" (l. 7229) |
| RENDERING-561 | acceptance-bar | OK | target §2.6 replaced | OK | §2.6 rule 4 (l. 966–967): "M3a's measurement on that brush and its pre-decided fallback are §12.6's" — unchanged; §12.6 l. 7353–7356 states them |
| RENDERING-562 | rule | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-563 | budget | OK | home §12.7 replaced | OK | §12.7's r2 changes are Export beside the view and the Stage-3 hook's pointer; this text unchanged (diff) |
| RENDERING-564 | budget | OK | home §12.7 replaced | OK | §12.7's r2 changes are Export beside the view and the Stage-3 hook's pointer; this text unchanged (diff) |
| RENDERING-565 | budget | OK | home §12.7 replaced | OK | §12.7's r2 changes are Export beside the view and the Stage-3 hook's pointer; this text unchanged (diff) |
| RENDERING-566 | budget | OK | home §12.7 replaced | OK | §12.7's r2 changes are Export beside the view and the Stage-3 hook's pointer; this text unchanged (diff) |
| RENDERING-567 | acceptance-bar | OK | home §12.7 replaced | OK | §12.7's r2 changes are Export beside the view and the Stage-3 hook's pointer; this text unchanged (diff) |
| RENDERING-568 | budget | OK | home §12.7 replaced | OK | §12.7's r2 changes are Export beside the view and the Stage-3 hook's pointer; this text unchanged (diff) |
| RENDERING-569 | budget | OK | home §12.7 replaced | OK | §12.7's r2 changes are Export beside the view and the Stage-3 hook's pointer; this text unchanged (diff) |
| RENDERING-570 | evidence | OK | home §12.7 replaced | OK | §12.7's r2 changes are Export beside the view and the Stage-3 hook's pointer; this text unchanged (diff) |
| RENDERING-571 | rule | OK | home §12.7 replaced | OK | §12.7's r2 changes are Export beside the view and the Stage-3 hook's pointer; this text unchanged (diff) |
| RENDERING-572 | acceptance-bar | OK | home §12.7 replaced | OK | §12.7's r2 changes are Export beside the view and the Stage-3 hook's pointer; this text unchanged (diff) |
| RENDERING-573 | acceptance-bar | OK | home §12.7 replaced | OK | §12.7's r2 changes are Export beside the view and the Stage-3 hook's pointer; this text unchanged (diff) |
| RENDERING-574 | decision | OK | home §12.7 replaced | OK | §12.7's r2 changes are Export beside the view and the Stage-3 hook's pointer; this text unchanged (diff) |
| RENDERING-575 | acceptance-bar | VR-R1-1 | text changed | OK — VR-R1-1 FIXED | l. 7410–7414: "… and from M2b, where `lit` ships, a `lit` export of a CITY while a `path` sun advances one step per frame"; `lit` ships at M2b (§16's M2b row l. 8645; §12.7 l. 7374–7375); the M1 pan-and-zoom part unchanged; NR5-1's pass criterion intact |
| RENDERING-576 | acceptance-bar | OK | home §12.7 replaced | OK | §12.7's r2 changes are Export beside the view and the Stage-3 hook's pointer; this text unchanged (diff) |
| RENDERING-577 | budget | VR-R1-6 | text changed | OK — VR-R1-6 FIXED | l. 7418–7419: "(≤ 3 µs per plot median, §12.4's S11 row; the kernel's M0 bar, §3.7)"; §12.4 l. 7229 "S11 ≤ 5 µs median per plot — its geometry share ≤ 3 µs (the kernel's M0 bar, §3.7)"; §3.7 M0 (ii) measures "S11's geometry share against its §12.4 row" (l. 2328); the rest of the bullet only re-wrapped |
| RENDERING-578 | budget | OK | home §12.7 replaced | OK | §12.7's r2 changes are Export beside the view and the Stage-3 hook's pointer; this text unchanged (diff); §13.2's only r2 change is B-EDIT's load-verification case — the fact it cites unchanged |
| RENDERING-579 | rule | OK | home §12.8 replaced | OK | §12.8's only r2 change is the crown-set parenthetical (l. 7481–7482); this text unchanged (diff) |
| RENDERING-580 | budget | OK | home §12.8 replaced | OK | §12.8's only r2 change is the crown-set parenthetical (l. 7481–7482); this text unchanged (diff) |
| RENDERING-581 | rule | OK | home §12.8 replaced | OK | §12.8's only r2 change is the crown-set parenthetical (l. 7481–7482); this text unchanged (diff) |
| RENDERING-582 | budget | OK | home §12.8 replaced | OK | §12.8's only r2 change is the crown-set parenthetical (l. 7481–7482); this text unchanged (diff); §3.3's only r2 change is the dropped "(K4)" in the batch-faces bullet — the fact it cites unchanged |
| RENDERING-583 | history | OK | F.5 (history) | OK | verbatim in F.5, identical to r1's copy (the rationale file unchanged since 16:23; r2 touched no index row) |
| RENDERING-584 | budget | OK | home §12.8 replaced | OK | §12.8's only r2 change is the crown-set parenthetical (l. 7481–7482); this text unchanged (diff) |
| RENDERING-585 | rule | OK | home §12.8 replaced | OK | §12.8's only r2 change is the crown-set parenthetical (l. 7481–7482); this text unchanged (diff) |
| RENDERING-586 | acceptance-bar | OK — VR-R0-4 FIXED | home §12.8 replaced | OK — VR-R0-4 FIXED | §12.8's only r2 change is the crown-set parenthetical (l. 7481–7482); this text unchanged (diff) |
| RENDERING-587 | budget | OK | home §12.8 replaced | OK | §12.8's only r2 change is the crown-set parenthetical (l. 7481–7482); this text unchanged (diff) |
| RENDERING-588 | budget | OK | home §12.8 replaced | OK | §12.8's only r2 change is the crown-set parenthetical (l. 7481–7482); this text unchanged (diff) |
| RENDERING-589 | rule | OK | home §12.8 replaced | OK | §12.8's only r2 change is the crown-set parenthetical (l. 7481–7482); this text unchanged (diff) |
| RENDERING-590 | budget | OK — VR-R0-9 FIXED | home §12.8 replaced | OK — VR-R0-9 FIXED | §12.8's only r2 change is the crown-set parenthetical (l. 7481–7482); this text unchanged (diff) |
| RENDERING-591 | acceptance-bar | OK | home §12.8 replaced | OK | §12.8's only r2 change is the crown-set parenthetical (l. 7481–7482); this text unchanged (diff) |
| RENDERING-592 | budget | OK | target §12.8 replaced (this part) | OK | §8.8 l. 6071–6075 (≤ 5 MB crown-and-atlas scratch; "a set a running export holds counts with that export's canvases, §12.8") unchanged; §12.8 points to it |
| RENDERING-593 | rule | OK — VR-R0-9 FIXED; see VR-R1-2 | text changed | OK — VR-R1-2 FIXED | l. 7481–7482: "(a set is §12.7's 160 sprites)" — the undefined measurement claim gone, nothing added to §8.4; §12.7 l. 7373 "≈ 3–10 ms for 160 sprites" (20 crowns × 8 classes, l. 7370–7372); the sums (re-derived in r1) unchanged |
| RENDERING-594 | acceptance-bar | OK | home §12.8 replaced | OK | §12.8's only r2 change is the crown-set parenthetical (l. 7481–7482); this text unchanged (diff); §3.3's only r2 change is the dropped "(K4)" in the batch-faces bullet; §13.2's only r2 change is B-EDIT's load-verification case — the fact it cites unchanged |
| RENDERING-595 | acceptance-bar | OK | home §12.8 replaced | OK | §12.8's only r2 change is the crown-set parenthetical (l. 7481–7482); this text unchanged (diff) |
| RENDERING-596 | evidence | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-597 | evidence | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-598 | decision | OK | carried | OK | home and targets outside every r2-replaced subsection; r1 verdict stands (r1 §9) |
| RENDERING-599 | decision | OK | J-row / F.5 | OK | J-row unchanged (r2 touched no index row); F.5 identical to r1's copy |
| RENDERING-C01 | conflict | OK | carried (NR5-2) | OK | NR5-2 still FIXED (§4): `LabelRows` l. 6436, `begin`/`place` l. 6439–6440, §8.1 l. 5472, §14 l. 8231, 8276, 8320–8321 |
| RENDERING-C02 | conflict | OK — see VR-R1-1 | re-checked (NR5-1) | OK | NR5-1 still FIXED (§4); its §12.7 run now schedules the `lit` export from M2b (VR-R1-1 FIXED) |
| RENDERING-C03 | conflict | OK | carried (NR5-3) | OK | NR5-3 still FIXED: "6–9 % smaller than None's" (l. 7409); §12.7's PNG bullets untouched by r2 |
| RENDERING-C04 | conflict | OK | carried | OK | §12.1 and §8.8 not replaced |
| RENDERING-C05 | conflict | OK | carried | OK | §9.1, §9.2, §9.5 not replaced |
| RENDERING-C06 | conflict | OK | target §5.2 replaced | OK | §5.2 changed only F-SKELETON; F-LABEL still points to §9.4; GAP-2 still the owner's / Fable's |
| RENDERING-C07 | conflict | OK | carried | OK | §12.5 and §12.2 not replaced |
| RENDERING-C08 | conflict | OK | home §12.6 replaced | OK | the warp bullet "≥ 30 fps for a brush radius ≤ 150 m at the district band (§8.8)" (l. 7350) unchanged; §8.8 "frame rate: §12.6" unchanged |
