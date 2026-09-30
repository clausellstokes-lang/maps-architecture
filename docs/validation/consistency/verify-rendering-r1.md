# Verify — consistency pass, round 1: the RENDERING part (§8, §9, §11, §12) after repair round 1

> Fable-reviewed 2026-09-26: CORRECTED — docs/validation/consistency/validate.md

Lane `consistency/verify-rendering-r1`, 2026-09-26. Status: COMPLETE. Re-verifies `## §8 Rendering and the style system`
(l. 5458–6352), `## §9 Labels and map furniture` (l. 6353–6619), `## §11 Export and interop` (l. 6792–7050) and
`## §12 Performance budgets` (l. 7051–7522) of `docs/ARCHITECTURE.md` (sha256 `ddd48f07…`, the assemble-r1 output)
against the archive (`docs/archive/ARCHITECTURE-pre-consistency-2026-09-26.md`), `inventory-rendering.json` (599 items
+ 8 conflict records), `canon.json`, the mapping table of `rewrite-rendering.md`, the six `repair-r1-*.md` files,
`assemble-r1.md`, `docs/validation/fix-all/still-open-r5.json` (NR5-1 … NR5-3) and my round-0 report
`verify-rendering-r0.md` (cited as **r0**). Line numbers are the current document's unless marked "archive".

**Method.** The round-0 document (assemble-r1's "before", sha256 `ee314f23…`) was diffed against the current one: 88
hunks, 258 lines out and 290 in — exactly assemble-r1's count — of which 18 hunks (42 lines out, 55 in) lie in this part.
Every hunk of the whole diff was read for its effect on this part's statements and pointers. **Re-checked** (404 ids):
every id whose home lies in one of the 13 subsections the rendering repair replaced (§8.1, §8.2, §8.3, §8.9, §8.10,
§9.5, §11.2, §11.3, §12.2, §12.4, §12.6, §12.8, §12.9); every id whose reference target, canon home or other-part
restatement lies in a subsection another repair replaced; every rationale and history id (the Judgment-calls block was
replaced); every id tied to an r0 issue or an open item. Ids whose text lies on a changed line were re-read against the
archive; ids in a replaced subsection whose text is on unchanged lines are byte-identical to r0, where they were read.
**Carried** (195 ids): home and targets outside every replaced subsection; r0's verdict stands (r0 §8). Scratch work:
`scratchpad/vr1/` of this session.

## 1. Outcome

The rendering part is sound after repair round 1. **Every round-0 issue about this part is fixed**: the ten
rendering-owned VR-R0-1 … VR-R0-10 (which include the siblings' P0-4, VDC-3, VDC-4 and V-MODEL-07's rendering
companion) and the three routed to other parts (VR-R0-11 by pipeline, VR-R0-12 and VR-R0-13 by scope). The open items
**NR5-1, NR5-2 and NR5-3 stay FIXED**. Every canon conflict routed to the part stays resolved as ruled. All 599 ids and
the 8 conflict records are accounted for (§9): 580 ids are OK; 15 are OK with an r0 issue now fixed on them or a pointer
to a new issue beside them; 4 carry a new issue (VR-R1-1 on RENDERING-575, VR-R1-3 on RENDERING-286 and -553, VR-R1-6 on
RENDERING-577); the 8 conflict records are OK (C02 with a pointer to VR-R1-1).

**Six new issues, all minor (0 blocker, 0 major): 4 owned by rendering, 1 by pipeline, 1 by scope.** None loses a fact
and no value disagrees; each is a pointer, a milestone or a duplicate that the round introduced or exposed.

* **VR-R1-1** — NR5-1's `lit` path-sun export test is scheduled in B-CITY's M1 run, but `lit` and the path sun ship at
  M2b (introduced by the rewrite's NR5-1 fix; r0 missed it).
* **VR-R1-2** — the new VR-R0-9 text calls the crown set's "per-set figure" (160 sprites) PLAUSIBLE until "M2b's
  moving-sun runs measure it, §8.4", but §8.4's moving-sun measurement times the light pass and the bake only.
* **VR-R1-3** — two keeps the rendering rewrite made "because the home lacks them" are now duplicates, since round 1 gave
  the homes the same words: §8.10 restates §6.1's `render.stampTiles` key components, and §12.6 restates §7.3 item 2's
  replay-mode list.
* **VR-R1-4** (pipeline) = `verify-pipeline-r1.md` P1-1 — §4.2 S1 (2) still states the contour clip that §8.2, its
  canonical home, now states.
* **VR-R1-5** (scope) = `verify-scope-r1.md` V-SCOPE-R1-02 — §1.2 and §0.2 row 4 still cite §12.2 for the building range
  and the rung bands, which VR-R0-8's fix moved to §1.1's rung table.
* **VR-R1-6** — §12.7's stage-3 hook credits S11's "≤ 3 µs per plot median" to §3.7, which has stated no µs figure since
  the rewrite moved the bar to §12.4's S11 row (the pattern of `verify-model-r1.md` V-MODEL-R1-02; r0 missed it).

No review marker, deferral wording, round narration or fix-round tag is in the part; every `§` reference resolves (the
part's only unresolved pointer is RFC 7946 §3.1.6, an external standard); the four sections pass `doc_checks.py` with 0
unreviewed hits. The part is 199 033 bytes, 81.2 % of the archived §8 + §9 + §11 + §12 (r0: 80.7 %).

**CONFIRMED vs PLAUSIBLE.** CONFIRMED by execution: the reproduction of both document states (sha256), the whole and
part diffs, the resolver, `doc_checks`, the anchor, J-id and tag scans, and each issue's quoted evidence; VR-R0-9's sums
re-derived by arithmetic from §8.8's formula. PLAUSIBLE (reading only, no second reader): that no other hunk of the
whole diff changes the meaning of a fact this part points to beyond §6's list, and the observation on uncached export
crown sets (§8).

## 2. Issues (each with its owning part)

| id | sev | kind | owner | claim (evidence) | required change |
|---|---|---|---|---|---|
| VR-R1-1 | minor | new-problem | rendering | **NR5-1's test sits at a milestone that cannot run it.** §12.7's *Export beside the view* (l. 7412–7416) says "B-CITY's browser run at M1 adds … a scripted pan and zoom during an A2 300-dpi export of a CITY, and a `lit` export of a CITY while a `path` sun advances one step per frame — pass: … for the `lit` export, the export made with the sun stopped at the request's time". `lit` ships at M2b (§16 M2b l. 8647: "`lit` on Canvas2D at all four bands"; §12.7's own crown-library bullet l. 7376–7377: "M2b's moving-sun runs (§8.4), where `lit` ships"), as do the path sun's measurements (§8.4 l. 5936–5937, 5947). §16's M1 exit lists only "the pan-and-zoom run during an A2 export (§8.9, §12.7)" (l. 8645), and no exit lists the `lit` export. The archive's run (archive l. 9123–9127) had no `lit` part; the rewrite added it for NR5-1 (whose required change names no milestone) inside the M1 sentence. | §12.7: "B-CITY's browser run at M1 adds … a scripted pan and zoom during an A2 300-dpi export of a CITY, and from M2b, where `lit` ships, a `lit` export of a CITY while a `path` sun advances one step per frame — pass: …". Scope may add "the `lit` export beside a moving sun (§12.7)" to §16's M2b exit beside "the light passes and the crown bake" (R10: §16 points to the criterion's home). |
| VR-R1-2 | minor | new-problem | rendering | **A measurement the pointer's target does not define.** The new *Canvases during a raster export* (l. 7481–7484) bounds the extra crown set by "§8.8's ≤ 5 MB crown-and-atlas scratch, which holds one set with the atlases (the per-set figure — 160 sprites, §12.7 — is PLAUSIBLE until M2b's moving-sun runs measure it, §8.4)". §8.4's moving-sun measurement is "every light pass within the settle bound and the crown bake within §12.7's budget" (l. 5947–5948), and §12.7 measures the bake's time (l. 7376–7377): no run measures a set's bytes. And 160 sprites (20 crowns × 8 classes, §12.7) is a count by construction, not an estimate. Nothing depends on it: the ≤ 5 MB bound follows from §8.8's budget, which already holds the drawn step's set with the atlases. | Drop the measurement claim: "… which holds one set with the atlases (a set is §12.7's 160 sprites)". If the set's bytes are to be confirmed, add them to §8.4's M2b moving-sun measurement instead ("… and one crown set's bytes within §8.8's scratch"), so the pointer holds — one place. |
| VR-R1-3 | minor | new-problem | rendering | **Two R13 keeps became duplicates in round 1.** The rendering rewrite kept these "although the canon lists them as restatements, because the home lacks them" (`rewrite-rendering.md` *Homes chosen* 7) and told the homes they "may add" them; round 1 did (VDC-11 (a), (b)). (a) §6.1's `render.stampTiles` entry (the canon home of stream keys, DETERMINISM-161, CANON-C08) now reads "keyed by a constant entity key over (stamp-tile domain, decoration class index, the reference spacing 400 cm, creation index — 0–3 for the class's four tiles, 4 for their shared border band), with `STAGE_VIEW` and reroll, attempt, epoch and salt 0" (l. 4177–4180); §8.10 still states "creation index 0–3 for the four tiles, 4 for the band), with reroll, attempt, epoch and salt 0 (J-R42)" (l. 6262–6264). (b) §7.3 item 2 (DETERMINISM-407's home) now lists "load verification, migration, undo beyond the scoped records, the undo of an upgrade after a reload" and "S14 and S13b run once at the end" (l. 4866–4871); §12.6 restates both (l. 7331–7333). Values agree; `verify-determinism-r1.md` O4 left (a) to this verifier. | (a) §8.10 *One construction everywhere*: "Its random source is `rng.stream` (§6.1, §14) under the `render.stampTiles` key and components of §6.1's registry entry (J-R42)" — no restated creation indices or zeros; the construction's own use of indices 0–3 and 4 stays. (b) §12.6: "A replay (§7.3 item 2's replay mode) folds the log on the model through the session's code path — S13a's scoped delta costs ≤ 3 ms per event that re-derives names, and S14 and S13b run once at the end (§7.3 item 2)" — the restated list dropped. |
| VR-R1-4 | minor | new-problem | pipeline | **The contour clip is stated twice** (= `verify-pipeline-r1.md` P1-1, found independently; one fix). Round 1 made §8.2's relief tier, the canon home (PIPELINE-066 → RENDERING-084), state "clipped to the land faces in vector space before emission, so no contour crosses a shore (F-CONTOUR, §5.2; the coast construction is §4.2 S1 (2))" (l. 5722–5723); §4.2 S1 (2) still says "contour lines are not model geometry: they are extracted per render tile and **clipped to the land faces in vector space before emission** (§8.2), so a contour never crosses the shore" (l. 2677–2679). Values agree. | P1-1's change: §4.2 S1 (2) keeps the coast construction and points for the contours ("their extraction and clip to the land faces are §8.2's relief tier (F-CONTOUR, §5.2)"). |
| VR-R1-5 | minor | broken-reference | scope | **Two pointers still name §12.2 for facts VR-R0-8's fix moved to §1.1** (= `verify-scope-r1.md` V-SCOPE-R1-02 with its O-R1-3 tweak; one fix). §12.2 now gives the rungs' population bands, targets, building ranges and frames by pointer to §1.1's rung table (l. 7104–7105, 7115). §1.2 cites "124–145 ms across §12.2's building range" (l. 196) — the figure is §12.5's TOWN law at §1.1's 1 200–1 500 buildings — and §0.2's row 4 cites "§12.2 (bands and matched reference sizes)" (l. 107). Both still reach the facts through §12.2's pointer, so nothing is lost. | V-SCOPE-R1-02's wording: §1.2 "(124–145 ms across the target's building range, §1.1; §12.1)"; §0.2 row 4 without "bands" for §12.2 ("§12.2 (matched reference sizes …)"). |
| VR-R1-6 | minor | broken-reference | rendering | **A number credited to a section that no longer states it.** §12.7's *Stage-3 hook* (RENDERING-577, l. 7420–7421): "the base outline builder's `outline()` is inside S11's geometry share (≤ 3 µs per plot median, §3.7)". Since the rewrite, §3.7 states no µs figure at all (a scan of l. 2263–2358 finds none, at r0 and now): its M0 (ii) measures "S11's geometry share against its §12.4 row" (l. 2328). The bar's home is §12.4's S11 row, "its geometry share ≤ 3 µs (the kernel's M0 bar, §3.7)" (l. 7231; canon KERNEL-318 → RENDERING-524, R8). The archive's §3.7 stated it (archive l. 3129), so the pointer went stale in the rewrite; round 1's §3.7 block kept S11's bar in §12.4. The value agrees. The same pattern in §2.6 is `verify-model-r1.md` V-MODEL-R1-02 ("≤ 25 µs, §3.7"). | §12.7: "(≤ 3 µs per plot median, §12.4's S11 row; the kernel's M0 bar, §3.7)". |

## 3. The issues repair round 1 claimed, and every round-0 issue about this part

The rendering repair's landing line claims "Fixes VR-R0-1..10 (= P0-4, VDC-3, VDC-4, V-MODEL-07's companion)"; the
other three r0 issues were routed to pipeline and scope. All thirteen are fixed.

| issue (r0) | owner | verdict | where the fix stands (evidence) |
|---|---|---|---|
| VR-R0-1 (`VectorBackend`) | rendering | **FIXED** | §8.9 l. 6172 declares `interface VectorBackend { write(list: DisplayList, style: StyleSheet, opts: { layers: Layer[]; band: LodBand; frame: Box }): string }`, byte-identical to the archive's §14 (archive l. 10133), beside `TileBackend`, commented "the SVG writer (§11.1): runs in the generation worker over the export's transient list" (= §11.1 l. 6836–6845 and §8.9's threads). The block comment reads "the tile and vector backends (§14 points here)" (l. 6159). §14's pointer (l. 8325) resolves; the name occurs twice (declaration, pointer). |
| VR-R0-2 = P0-4 (S10 (0) split) | rendering | **FIXED** | §12.4's S10 (0) row (l. 7230): "≈ 3 ms for the bands on the wall traces and ≈ 6 km of perimeter (the margin bands included) + ≈ 2.3 ms for the L3 partition rebuild of the ≈ 9 000 items it made (§3.3 pool step 1; build rate measured, `fixall_kernel_r3_bench.out` A)", p50 5 ms, = PIPELINE-256 (archive l. 4440). §3.3 pool step 1's "carried in §12.4's S10 (0) row" (l. 1811–1812) is now true; its "every L3 item it made — at CITY ≈ 9 000 vertices, edges and faces" (l. 1808–1809) is the row's "items it made". |
| VR-R0-3 (S9's district bar) | rendering + kernel | **FIXED** | §3.7 M0 (ii) (l. 2326–2328): "S9's corridor bands over the CITY face set against §12.4's S9 row and **one district ≤ 3 ms on reference hardware**"; §12.4's S9 row (l. 7227): "per district: the kernel's M0 bar (§3.7)". Stated once, where its measurement and fallback live (canon R8). The rendering repair revised its block to point after repair-kernel-r1's note (lane-events). |
| VR-R0-4 = VDC-3 (digest-tree breakdown) | rendering | **FIXED** | §12.8 (l. 7449–7451): "(at CITY the model tree ≈ 1 MB — ≈ 30 000 entity leaves, ≈ 15 000 face-ring hashes and their interior nodes at 16 B each — and the records tree ≈ 0.25 MB, §6.2)" = archive l. 5417; one occurrence; §6.2 points to "§12.8's entity-store line" (l. 4268–4269). |
| VR-R0-5 = VDC-4 (`author: 'host'`) | rendering | **FIXED** | §11.3 Logging (l. 7022–7023): "logged one to one — a host's own commands with `author: 'host'` (§7.1's `EditBase`)". The archive's "Bridge commands from a host … are logged with `author: 'host'`" (archive l. 6005–6006) meant the host's own commands, not user edits relayed through it (the bridge's `doc.changed` carries "a local user's proposed events", l. 6977); the new words keep that meaning. `EditBase.author` offers `'host'` (l. 4624); §7.1 points: "A host's bridge commands map onto these events (§11.3)" (l. 4789–4790). One occurrence. |
| VR-R0-6 (bridge policy; V-MODEL-07's companion) | rendering | **FIXED** | §11.3 *Bridged load verification* (l. 7013–7020) carries the whole policy: owner-only keep ("a `rebase` sent like any event; J-DET-42"); the others take the replayed town, report the mismatch, "records its root at `h₀` and keeps the `doc.load` bytes (≤ 3 MB at CITY, §2.9's size budget; counted in §12.8) until the mismatch is settled or its session ends", then install on the owner's `keptSnapshot` rebase ("the install mechanics: §2.9 step 4"). §2.9 step 4 (l. 1448–1450) now says the policy "is §11.3's ('Bridged load verification'); what follows is the install mechanics", and §12.8 points to §11.3 (l. 7451). ≤ 3 MB = §2.9's CITY size budget (l. 1488). J-DET-42 has its index row (l. 9453, naming §11.3) and its Part A row. |
| VR-R0-7 (contour clip at the home) | rendering | **FIXED** (residual → VR-R1-4) | §8.2 relief tier (l. 5720–5724): "… resampled evenly along each level line, and clipped to the land faces in vector space before emission, so no contour crosses a shore (F-CONTOUR, §5.2; the coast construction is §4.2 S1 (2))". Agrees with F-CONTOUR's rung (l. 4010) and §4.2 S1 (2)'s construction. §4.2 S1 (2) still restates the clip → VR-R1-4 (pipeline). |
| VR-R0-8 (§12.2 restating §1.1) | rendering | **FIXED** (side effect → VR-R1-5) | §12.2 (l. 7104–7112): "The rungs' population bands and targets, buildings at the target and frame areas are §1.1's rung table (frames: §3.2 (9)); this table adds the matched MFCG reference at each rung and the cap above METROPOLIS's target." §1.1's rung table (l. 169–173) holds the values the removed columns held (1 500–10 000 (5 000) / 1 200–1 500 / 4 km² (2.0 km); 10 000–30 000 (20 000) / 4 500–6 000 / 25 km² (5.0 km); 30 000–120 000 (50 000) / 12 000–15 000 / 64 km² (8.0 km)) and "+ 30 % margin per side" in its header. The MFCG columns and the cap row ("≤ 35 000 buildings, a frame ≤ 153.6 km² (≤ 12.4 × 12.4 km)") stay. |
| VR-R0-9 (held crown set unsized) | rendering | **FIXED** (one new pointer problem → VR-R1-2) | §12.8 (l. 7479–7490): the export's held set "is the drawn step's set while the view keeps that step and adds nothing; from the first light pass that completes while the export runs (§8.4) it is one more set, bounded by §8.8's ≤ 5 MB crown-and-atlas scratch"; the mid tier's reference view now falls back ("112 + 15 + 5 > 128 MB … 77 + 15 + 5 = 97 MB"). Sums re-derived from §8.8's P = (⌈W·d ÷ 512⌉ + 1) × (⌈H·d ÷ 512⌉ + 1): P = 35 (reference view), P = 20 (1 920 × 1 080 at DPR 1); 112 + 15 = 127 ≤ 128; 43 + 15 + 5 = 63 ≤ 72; 67 + 15 = 82 > 72; 112 + 15 + 5 = 132 > 128; 2P + 7 = 47 and 77; 47 + 15 = 62; 77 + 15 + 5 = 97 ≤ 128. §8.8's "a set a running export holds counts with that export's canvases, §12.8" (l. 6075–6076) and §12.8's export-time peak ("counted with the canvases below", l. 7473) agree. |
| VR-R0-10 (tag style) | rendering | **FIXED** (its rendering part) | The 11 `NF-` finding tags are gone (hunks 60, 62, 63, 66–70, 73, 74, 77); a scan of the part finds no `NF-…` and no fix-round tag (NR-, VD-, VK-, VS-, VP-, NP-, K4-). The audit ids stay, as r0's required change left the one document-wide convention to the validator or Fable (§8). |
| VR-R0-11 = P0-1 (§4.9 layouts) | pipeline | **FIXED** | §4.9's "trees at render" row (l. 3687): "instanced by §8.10's layouts — the ranked tile stamp for areas (…), a jittered grid for orchards (6–8 m), a jittered line for avenues and street trees (at their rows' spacings above) and for hedgerows (8–12 m)" = §8.10 l. 6236–6240. Avenues keep 8–12 m through their row (l. 3677); street trees' 10–14 m is their row's (l. 3678). |
| VR-R0-12 (§13.2 seam census) | scope | **FIXED** | §13.2 (l. 7684–7685): "the shipped stamp tiles pass §8.3's seam check (§8.10)" — no restated counts; §8.3's census row is the one statement. |
| VR-R0-13 (spine fallback) | scope | **FIXED** | §13.7 O13 (a) (l. 8151): "a label still over the limit takes its next alternate (§9.2: its next spine, then §9.4's ladder)" = §9.2's alternate order ("its spines in order, then §9.4's ladder", l. 6428) and the archive §9.3's "next candidate" (archive l. 8070–8071). This reconciles the archive's two disagreeing statements (§13.7's "next ladder rung", archive l. 9933) toward the fuller one. |

## 4. Open items routed to this part (NR5-1, NR5-2, NR5-3)

| item | verdict | evidence |
|---|---|---|
| NR5-1 | **FIXED** (its test's milestone → VR-R1-1) | Unchanged by round 1 where r0 read it: `TileRasterOpts.lightStep` beside `sun?` (l. 6162–6163); "The queue passes the view's drawn light step for `under`, `over` and `base` … an export's jobs get its request's sheet, switches, shadow sun and light step" (l. 6175–6176); the request row carries the sheet, switches, shadow sun and light step (l. 6149); class 4 bakes an uncached crown set and holds it (l. 6198); §8.4 passes the drawn step "as `TileRasterOpts.lightStep` (§8.9)" (l. 5945); §8.8, §8.10 and §12.8 count or hold the set, now sized (VR-R0-9). The §12.7 run exists (l. 7412–7416) but is scheduled at M1 → VR-R1-1. |
| NR5-2 | **FIXED** | Unchanged: `interface LabelRows { labels: LabelTable; strings: StringTable; geom: GeomTable }` (l. 6438), taken by `begin` and `place` (l. 6441–6442); §8.1's first comment (l. 5473) and §14 (l. 8233, 8278, 8322–8323) agree. Round 1's §8.1 hunk touched only item 5's tag. |
| NR5-3 | **FIXED** | Unchanged (§12.7 not replaced): "6–9 % smaller than None's on the relief and textured looks (J-R53)" (l. 7411); r0 re-derived it from `fixall_rendering_r5_png.out`. |

## 5. Conflicts touching the part (canon), re-checked where round 1 touched their places

* **RENDERING-C01 / C02 / C03** — as NR5-2, NR5-1, NR5-3 (§4).
* **RENDERING-C04** — carried: §12.1 and §8.8 were not replaced.
* **RENDERING-C05** — §9.5 was replaced, but only its compass and emblem tags changed; the title rule is unchanged; §9.1
  and §9.2 were not replaced.
* **RENDERING-C06** — carried: §9.2 and §9.4 were not replaced; §5.2's F-LABEL row (replaced block) is unchanged and
  still points to §9.4. GAP-2 stays the owner's / Fable's.
* **RENDERING-C07** — §12.5's "above the request cap of §12.2" (l. 7296) still lands on §12.2's cap row (l. 7112).
* **RENDERING-C08** — §12.6 was replaced for one tag; "≥ 30 fps for a brush radius ≤ 150 m" (l. 7352) and §8.8's
  "frame rate: §12.6" (l. 6102) unchanged.
* **CANON-C01** — §8.2 and §8.3 changed elsewhere only; "a point symbol for every `Pin.kind` of §2.7" unchanged.
* **CANON-C03** — the frame column left §12.2; its resolution lives at the home: §1.1's header "frame at the target
  (area; side at the default aspect 1, §3.2 (9); + 30 % margin per side)" (l. 169) and §3.2 (9) (l. 1638); §12.2 points
  to both.
* **CANON-C04** — §11.2's `E_ENGINE_UNAVAILABLE` "(not a kernel …" (l. 6966) and §3.7's use (l. 2337) unchanged.
* **CANON-C05** — §12.4's header "Each stage's mechanism is its stage section's (§4)" unchanged; round 1's §4.2, §4.5,
  §4.8 and §4.9 hunks change none of the mechanisms the rows point to (§6).
* **CANON-C06, SCOPE-C01, KERNEL-C13, SCOPE-C10** — carried or unchanged (§9.4 and §13.5 not replaced; §12.9 replaced
  for one tag, its ratios 1.8× / 2.3× / 5.1× unchanged; §12.4's S4 row unchanged; §16 still "CityJSON is built (§11.1)").

## 6. What round 1 changed, in this part and in the text it points to (receipts)

**Reproduction.** The round-0 state is `scratchpad/ar1/ARCHITECTURE.pre-assemble-r1.md` (sha256 `ee314f23…afed175`,
assemble-r1's "before"); `docs/ARCHITECTURE.md` has sha256 `ddd48f07…ebb1`, assemble-r1's "after". `diff -u` of the
two: 88 hunks, 258 lines out, 290 in. This part: 1 879 → 1 892 lines, 197 735 → 199 033 bytes (+1 298 = §8 +361,
§9 −17, §11 +198, §12 +756, as assemble-r1 reports).

**The part's 18 hunks — one per claimed fix, nothing else.**

| hunk | lines (new) | place | change | fixes |
|---|---|---|---|---|
| 60 | 5549 | §8.1 item 5 | tag NF-D10 dropped | VR-R0-10 |
| 61 | 5720–5724 | §8.2 relief tier | the contour clip stated | VR-R0-7 |
| 62 | 5838 | §8.2 texture set | tag NF-S11 dropped | VR-R0-10 |
| 63 | 5881 | §8.3 census | tag NF-D10 dropped | VR-R0-10 |
| 64–65 | 6159, 6172 | §8.9 backend block | "the tile and vector backends"; `VectorBackend` | VR-R0-1 |
| 66 | 6329 | §8.10 Edits | tag NF-D11 dropped | VR-R0-10 |
| 67–68 | 6566, 6591 | §9.5 compass, emblem | tags NF-D12 dropped | VR-R0-10 |
| 69–70 | 6908, 6938 | §11.2 `confirm`, Confirming fates | "(NF-D14)" → "(below)"; heading tag dropped | VR-R0-10 |
| 71 | 7013–7027 | §11.3 | Bridged load verification completed; Logging's `author: 'host'` | VR-R0-6, VR-R0-5 |
| 72 | 7102–7116 | §12.2 | rung columns → §1.1's rung table; default-request sentence | VR-R0-8 |
| 73 | 7221, 7227, 7230 | §12.4 | S2/S3 tag; S9 pointer; S10 (0) split | VR-R0-10, VR-R0-3, VR-R0-2 |
| 74 | 7330 | §12.6 | tag NF-S6 dropped | VR-R0-10 |
| 75 | 7446–7453 | §12.8 M2a | digest-tree breakdown; bridged bytes → §11.3 | VR-R0-4, VR-R0-6 |
| 76 | 7479–7490 | §12.8 canvases | the held set sized; sums redone | VR-R0-9 |
| 77 | 7509 | §12.9 FTG | tag NF-S7 dropped | VR-R0-10 |

Every number of the old lines survives in the new (the S10 (0) row gains ≈ 3 ms and ≈ 2.3 ms; §12.8 gains 30 000,
15 000, 16 B, 5 MB, 160 and 97; §12.2's removed numbers are all in §1.1's table). Headings, numbered items and anchors
are unchanged; the J-ids cited in the part go from 60 to 61 (J-DET-42 added in §11.3); the D-ids are unchanged; the only
new `§` target is §5.2 (F-CONTOUR).

**The other parts' hunks, read for their effect on this part** (every hunk was read; those that touch a rendering fact
or a pointer from this part are listed):

| place (block) | change | effect on this part |
|---|---|---|
| §0.2 row 4 (not changed) and §1.2 (not replaced) | — | still cite §12.2 for the bands and the building range → VR-R1-5 |
| §2.9 step 4 (model) | the bridge policy → a pointer to §11.3; install mechanics kept; the bytes "it kept (§11.3)" | VR-R0-6's other half; §11.3's "the install mechanics: §2.9 step 4" and "once the owner has chosen (§2.9 step 4)" (l. 6990) both land (step 4 still states the owner's choice, l. 1436) |
| §3.3 pool step 1 (kernel) | tags; receipt named | "carried in §12.4's S10 (0) row" now true; "No `SharedArrayBuffer`" and the laziness-contract copy §12.8 cites unchanged |
| §3.7 (kernel) | engine id stated; S9's district bar restored | §12.4's S9 pointer lands (VR-R0-3); S11's share still measured "against its §12.4 row" |
| §4.2 S1 (2) (pipeline) | simplicity clamp reads `skeleton(rings, 'spine')` | the coast construction §8.2 cites unchanged; the clip restatement → VR-R1-4 |
| §4.5, §4.8, §4.11 (pipeline) | district faces; moat decks; `ConversionOp` type | no rendering fact or pointer affected |
| §4.9 (pipeline) | trees-at-render row | VR-R0-11 fixed; spacings agree with §8.10 |
| §5.2 (determinism) | six test cells to pointers; F-SITING | the F-CONTOUR and F-LABEL rows §8.2 and §9.4 cite unchanged |
| §5.3, §5.4 (determinism) | cost rule's milestone wording; warning codes | agree with §12.6's TOWN → CITY (M2a), TOWN → METROPOLIS (M2b) |
| §6.1 (determinism) | `render.stampTiles` gains `STAGE_VIEW` and the zero components | agrees with §8.10; duplicate → VR-R1-3 (a) |
| §6.2 (determinism) | "every in-window load"; "checking the saved copy…" | §12.8's digest-tree pointer and §11.3's §6.2 (iii) wait unaffected |
| §6.5 (determinism) | (9) cross-host adds "pool sizes 0–3"; truncation fixture | agrees with §12.3's "200 seeds at pool sizes 0–3" and §9.1's placement digests |
| §7.1, §7.2, §7.4, §7.6, §7.7 (determinism) | drawn bridge; registry test; τ; draw-bridges row; orphan insert; One path | the `instance`, label and `setStyle` events this part cites unchanged; §7.1 points to §11.3 for bridge commands |
| §7.3 (determinism) | item 2's replay list gains the upgrade undo; item 7 (ii) | item 2 (§8.1 item 4's and §12.6's target) and item 4 (§11.2's target) still state what is cited; duplicate → VR-R1-3 (b) |
| §7.8 (determinism) | proxies "in §8.5's distinct preview style" | §8.5 (l. 6002) is the one statement; §12.6's "§7.8's budget" unchanged |
| §13.1, §13.2 (scope) | fixtures; the seam check → pointer | VR-R0-12 fixed; §13.2's cost-model pointers to §12 unchanged (l. 7671–7674); the `.plat` round trip kept (l. 7676) |
| §13.7 (scope) | O13 (a)'s fallback | VR-R0-13 fixed |
| §16 (scope) | M3a carve fixtures; the staged sentence | "the relief tier is a base program (§8.2)" and the M1 / M2a / M2b exits this part cites unchanged; no exit lists the `lit` export (VR-R1-1) |
| Judgment calls (scope) | J-DET-36 and J-S43 rows | every J-R row unchanged |

**Pointers from this part into replaced text, re-read.** 299 `§` references in the part point into a replaced
subsection. Those into other parts were read at their targets (§2.1, §2.2 rule 5, §2.9 steps 2–4 and its size, cap,
format, view and style statements, §3.2 (1) and (9), §3.3 pool steps 1 and 5, §3.4, §3.6 (6), §3.7, §3.8, §3.9,
§4.2 S1 (1)–(2) and S2, §4.5, §4.8, §4.9, §5.2, §6.1, §6.2 and (iii), §6.5 (2) and (3), §7.1, §7.3 items 2 and 4, §7.4,
§7.8, §13.2, §13.7's O13 (a), §16): each still states what the pointer cites it for, except §12.7's "(≤ 3 µs per plot
median, §3.7)" (VR-R1-6). Those into this part's changed text were read too: §11.3 (10 pointers), §12.2 (7: the
default request, 3.4 persons per building, the cap, the matched counts and the band-end definition all still stated
there), §12.4 (4), §12.8 (5).

## 7. Mechanical checks (executed)

* **References.** `assemble-r0-refs.py` on the current document: 134 headings, 35 D-ids, 276 J-index rows, 2 unresolved
  pointers, both external (l. 2036 `os-geometry.md` §2.1.4; l. 6828 RFC 7946 §3.1.6, in this part, as in r0). The
  anchored targets (§2.2 rule 5, §2.9 steps 2–4, §3.2 (1) and (9), §3.3 pool steps 1 and 5, §3.6 (6), §6.2 (iii),
  §6.5 (2) and (3), §7.3 items 2 and 4, §8.1 items 3, 5 and 6) were found at l. 500, 1340, 1360, 1436, 1586, 1638, 1796,
  1868, 2176, 4302, 4538, 4540, 4848, 5014, 5533, 5549, 5562.
* **Document checks.** `python3 docs/validation/bench/doc_checks.py --sections "8,9,11,12"` with the allow file: C1 5,
  C2 0, C3 73, C4 1, S1 0, S2 0 hits, **0 unreviewed**, exit 0.
* **J- and D-ids.** 61 distinct J-ids in the part (56 J-R plus J-DET-42, J-I2, J-I9, J-P28, J-S19), each with an index
  row; every J-R has its Part A row in `docs/ARCHITECTURE-RATIONALE.md`. The rationale file's round-1 edits are the
  J-DET-36 row and the F.2 heading (scope repair; `verify-kernel-r1.md` §7 rebuilt the pre-edit file and diffed it), so
  F.5 — this part's 60 rationale and 8 history passages — is unchanged since r0's verbatim check.
* **Markers, deferral, narration, tags.** 0 "PENDING FABLE REVIEW" lines in the part (the document keeps its one
  banner, l. 3). Deferral words: "later" ×4, "pending" ×6, "undecided" ×1, all technical ("no later casing", "pending
  tiles", "later pin", "undecided candidate"), the same lines as r0; 0 TBD, TODO, deferred, open question, future or
  not yet. Round narration: 0 (the "fixall" hits are receipt file names). Tags: 0 `NF-…`; 0 fix-round ids; `VN-029`,
  `VN-031` and `VN-158` are coverage ids.
* **Single statement of the restored facts.** "interface VectorBackend" ×1; "≈ 30 000 entity leaves" ×1; "one district
  ≤ 3 ms" ×1 (§3.7); "author: 'host'" ×1 (§11.3); "records its root at `h₀`" ×1 (§11.3); the bridge policy's owner-only
  keep ×1 (§11.3).
* **Numbers beside pointers.** A scan of every parenthetical in the part that holds a number with a unit and a `§`
  pointer, checking that the number and unit occur in the pointed-to section: 10 hits, 9 of them the part's own or derived
  figures (§8), 1 stale (VR-R1-6). The same scan over the rest of the document for pointers into §8, §9, §11, §12 finds
  1 hit, §1.2's (VR-R1-5).
* **Size.** The part is 199 033 bytes: 81.2 % of the archived 245 128 (§8 118 170, §9 32 046, §11 36 715, §12 58 197),
  against the pass's 55–65 % target (r0: 80.7 %; 500 of 599 items are home statements).

## 8. Observations (not raised)

* **S10 (0)'s row adds up to ≈ 5.3 ms against its 5 ms p50.** Both figures are the archive's (§4.7's "≈ 3 ms … plus
  ≈ 2.3 ms", §12.4's 5 ms); round 1 put them in one row. They are approximate, the critical path sums to 255 ms with 5,
  and no statement disagrees, so no change is proposed.
* **§12.4's ≈ 2.3 ms is also stated at §3.3 pool step 1** (KERNEL-145's home, with its receipt). The canon homes both —
  the measured rebuild at §3.3 and the S10 (0) split at §12.4 (the R13 detail gap on RENDERING-523) — and the row points
  to §3.3; `verify-kernel-r1.md` §8 leaves the choice to this part. Replacing the figure in the row by "the L3 partition
  rebuild (§3.3 pool step 1)" would make it one place; not raised, because P0-4 and r0's own required change asked for
  the figure in the row.
* **An export whose crown set §8.9's class 4 bakes because it was not cached** (e.g. an API export at a view state no
  view draws) holds one extra set from its start, not from a completed light pass. §12.8's bound (one set ≤ 5 MB) and
  its fallback cover it by the same sums; the text names only the drawn-step case. PLAUSIBLE; for Fable.
* **Audit ids.** The convention VR-R0-10 left to the validator or Fable is still for that ruling. Counts per section:
  §2 72, §3 39, §4 147, §5 2, §6 3, §7 8, §8 68, §9 15, §10 23, §11 27, §12 38, §13 7. Not a rendering item to fix.
* **Other numbers beside a pointer whose target does not print them** (the scan in §7): §11.1's "≈ 15.7 km from the
  centre at aspect 2, §12.2" and §8.9's "≈ 1.2 ms, §12.5" and §12.5's "≈ 4 µs per building, §12.4" are derived from the
  target's figures (§12.2's 17.5 × 8.8 km with margins; §12.5's raster law; §12.4's 20 ms for ≈ 5 200 buildings) and
  are the archive's; §12.8's digest-tree sizes cite §6.2 for the trees while §12.8 is their home. Not raised.
* **§7.4's *Rebases on other clients*** (l. 5118–5124) restates §2.9 step 4's install mechanics; it agrees with §11.3's
  policy. For the determinism and model verifiers.
* **Carried from r0 (unchanged by round 1):** GAP-2 (no default rank for `wood` and `annotation`); NR5-2's package move
  and NR5-1's "≤ 4 KB plus the list" request bound (for Fable); the `title` entity has no `LabelTable` row (implied);
  §8.2's face gloss and §8.10's spacing gloss beside their pointers; §15.2's O12 row repeating §12.5's interaction
  figures (scope's).

## 9. Checked list — every inventory id

Columns: the r0 verdict (`verify-rendering-r0.md` §8); the r1 scope — **text changed** (the id's text lies on a line
round 1 changed; re-read), **home §x replaced** (its text lies in a replaced subsection on unchanged lines; byte-identical
to r0), **target … replaced** (a pointer target, canon home or other-part restatement lies in a replaced subsection;
re-read), **J-pointer / J-row / F.5 (history)** (rationale and history ids), **re-checked (…)** (tied to an issue or an
open item), **carried** (r0's verdict stands); the r1 verdict; a note. Line numbers are the current document's.

| id | kind | r0 verdict | r1 scope | r1 verdict | note |
|---|---|---|---|---|---|
| RENDERING-001 | summary | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-002 | interface | OK | home §8.1 replaced | OK | §8.1's only r1 change is item 5's heading tag; this text unchanged (diff) |
| RENDERING-003 | type | OK | home §8.1 replaced | OK | §8.1's only r1 change is item 5's heading tag; this text unchanged (diff) |
| RENDERING-004 | type | OK | home §8.1 replaced | OK | §8.1's only r1 change is item 5's heading tag; this text unchanged (diff) |
| RENDERING-005 | interface | OK | home §8.1 replaced | OK | §8.1's only r1 change is item 5's heading tag; this text unchanged (diff) |
| RENDERING-006 | rule | OK | home §8.1 replaced | OK | §8.1's only r1 change is item 5's heading tag; this text unchanged (diff) |
| RENDERING-007 | rule | OK | home §8.1 replaced | OK | §8.1's only r1 change is item 5's heading tag; this text unchanged (diff) |
| RENDERING-008 | rule | OK | home §8.1 replaced | OK | §8.1's only r1 change is item 5's heading tag; this text unchanged (diff) |
| RENDERING-009 | rule | OK | home §8.1 replaced | OK | §8.1's only r1 change is item 5's heading tag; this text unchanged (diff) |
| RENDERING-010 | interface | OK | home §8.1 replaced | OK | §8.1's only r1 change is item 5's heading tag; this text unchanged (diff) |
| RENDERING-011 | interface | OK | home §8.1 replaced | OK | §8.1's only r1 change is item 5's heading tag; this text unchanged (diff) |
| RENDERING-012 | interface | OK | home §8.1 replaced | OK | §8.1's only r1 change is item 5's heading tag; this text unchanged (diff) |
| RENDERING-013 | interface | OK | home §8.1 replaced | OK | §8.1's only r1 change is item 5's heading tag; this text unchanged (diff) |
| RENDERING-014 | interface | OK | home §8.1 replaced | OK | §8.1's only r1 change is item 5's heading tag; this text unchanged (diff) |
| RENDERING-015 | interface | OK | home §8.1 replaced | OK | §8.1's only r1 change is item 5's heading tag; this text unchanged (diff) |
| RENDERING-016 | interface | OK | home §8.1 replaced | OK | §8.1's only r1 change is item 5's heading tag; this text unchanged (diff) |
| RENDERING-017 | interface | OK | home §8.1 replaced | OK | §8.1's only r1 change is item 5's heading tag; this text unchanged (diff) |
| RENDERING-018 | rule | OK | home §8.1 replaced | OK | §8.1's only r1 change is item 5's heading tag; this text unchanged (diff) |
| RENDERING-019 | rule | OK | home §8.1 replaced | OK | §8.1's only r1 change is item 5's heading tag; this text unchanged (diff) |
| RENDERING-020 | rule | OK | home §8.1 replaced | OK | §8.1's only r1 change is item 5's heading tag; this text unchanged (diff) |
| RENDERING-021 | rule | OK | home §8.1 replaced | OK | §8.1's only r1 change is item 5's heading tag; this text unchanged (diff) |
| RENDERING-022 | rule | OK | home §8.1 replaced | OK | §8.1's only r1 change is item 5's heading tag; this text unchanged (diff) |
| RENDERING-023 | rule | OK | home §8.1 replaced | OK | §8.1's only r1 change is item 5's heading tag; this text unchanged (diff) |
| RENDERING-024 | rule | OK | home §8.1 replaced | OK | §8.1's only r1 change is item 5's heading tag; this text unchanged (diff) |
| RENDERING-025 | rule | OK | home §8.1 replaced | OK | §8.1's only r1 change is item 5's heading tag; this text unchanged (diff) |
| RENDERING-026 | rule | OK | home §8.1 replaced | OK | §8.1's only r1 change is item 5's heading tag; this text unchanged (diff) |
| RENDERING-027 | rule | OK | home §8.1 replaced | OK | §8.1's only r1 change is item 5's heading tag; this text unchanged (diff) |
| RENDERING-028 | rule | OK | home §8.1 replaced | OK | §8.1's only r1 change is item 5's heading tag; this text unchanged (diff) |
| RENDERING-029 | mechanism | OK | target replaced | OK | §7.3 item 2's display-list sentence unchanged |
| RENDERING-030 | rule | OK | target replaced | OK | §7.3 item 2 (l. 4866–4871): model stages at their log positions; S14 and S13b once at the end |
| RENDERING-031 | rule | OK | text changed | OK | l. 5549: tag NF-D10 dropped (VR-R0-10); keying rule unchanged |
| RENDERING-032 | rule | OK | home §8.1 replaced | OK | §8.1's only r1 change is item 5's heading tag; this text unchanged (diff) |
| RENDERING-033 | defined-term | OK | target replaced | OK | §6.1 decoration bullet (l. 4193) unchanged |
| RENDERING-034 | defined-term | OK | home §8.1 replaced | OK | §8.1's only r1 change is item 5's heading tag; this text unchanged (diff) |
| RENDERING-035 | rule | OK | home §8.1 replaced | OK | §8.1's only r1 change is item 5's heading tag; this text unchanged (diff) |
| RENDERING-036 | rule | OK | home §8.1 replaced | OK | §8.1's only r1 change is item 5's heading tag; this text unchanged (diff) |
| RENDERING-037 | budget | OK | home §8.1 replaced | OK | §8.1's only r1 change is item 5's heading tag; this text unchanged (diff) |
| RENDERING-038 | rule | OK | home §8.1 replaced | OK | §8.1's only r1 change is item 5's heading tag; this text unchanged (diff) |
| RENDERING-039 | rule | OK | home §8.1 replaced | OK | §8.1's only r1 change is item 5's heading tag; this text unchanged (diff) |
| RENDERING-040 | decision | OK | J-pointer in §8.1 (replaced) | OK | pointer present, text unchanged (diff); J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-041 | decision | OK | J-pointer in §8.1 (replaced) | OK | pointer present, text unchanged (diff); J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-042 | decision | OK | J-pointer in §8.1 (replaced) | OK | pointer present, text unchanged (diff); J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-043 | decision | OK | J-pointer in §8.1 (replaced) | OK | pointer present, text unchanged (diff); J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-044 | interface | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-045 | rule | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-046 | rule | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-047 | interface | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-048 | interface | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-049 | defined-term | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-050 | rule | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-051 | acceptance-bar | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-052 | test | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-053 | rule | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-054 | evidence | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-055 | rule | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-056 | rule | OK | target replaced | OK | §6.1 `style.random` entry (l. 4176–4177) unchanged |
| RENDERING-057 | algorithm-step | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-058 | history | OK | F.5 (history) | OK | verbatim in F.5, unchanged since r0 (the rationale file's r1 edits are the J-DET-36 row and the F.2 heading) |
| RENDERING-059 | evidence | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-060 | acceptance-bar | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-061 | decision | OK | J-pointer in §8.2 (replaced) | OK | pointer present, text unchanged (diff); J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-062 | number | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-063 | evidence | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-064 | rule | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-065 | decision | OK | J-pointer in §8.2 (replaced) | OK | pointer present, text unchanged (diff); J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-066 | decision | OK | J-pointer in §8.2 (replaced) | OK | pointer present, text unchanged (diff); J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-067 | decision | OK | J-pointer in §8.2 (replaced) | OK | pointer present, text unchanged (diff); J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-068 | rule | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-069 | rule | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-070 | evidence | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-071 | number | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-072 | number | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-073 | rule | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-074 | rule | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-075 | defined-term | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-076 | rule | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-077 | rule | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-078 | rule | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-079 | rule | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-080 | rule | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-081 | rule | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-082 | rule | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-083 | rule | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-084 | rule | VR-R0-7 | text changed | OK — VR-R0-7 FIXED; see VR-R1-4 | l. 5720–5724 now states the clip "…, so no contour crosses a shore (F-CONTOUR, §5.2; the coast construction is §4.2 S1 (2))"; agrees with F-CONTOUR (l. 4010); §4.2 S1 (2) still restates it (l. 2677–2679) |
| RENDERING-085 | rule | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-086 | rule | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-087 | rule | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-088 | rule | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-089 | rule | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-090 | interface | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-091 | rule | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-092 | rule | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-093 | rule | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-094 | rule | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-095 | rule | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-096 | number | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-097 | rule | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-098 | rule | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-099 | test | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-100 | algorithm-step | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-101 | rule | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-102 | test | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-103 | rule | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-104 | decision | OK | J-pointer in §8.2 (replaced) | OK | pointer present, text unchanged (diff); J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-105 | decision | OK | J-pointer in §8.2 (replaced) | OK | pointer present, text unchanged (diff); J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-106 | rule | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-107 | acceptance-bar | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-108 | number | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-109 | number | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-110 | number | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-111 | rule | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-112 | rule | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-113 | rule | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-114 | rule | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-115 | rule | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-116 | budget | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-117 | rule | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-118 | rule | OK | text changed | OK | l. 5838: tag NF-S11 dropped; tiles, sizes and provenance unchanged |
| RENDERING-119 | decision | OK | J-pointer in §8.2 (replaced) | OK | pointer present, text unchanged (diff); J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-120 | test | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-121 | rule | OK | home §8.3 replaced | OK | §8.3's only r1 change is one census row's tag; this text unchanged (diff) |
| RENDERING-122 | rule | OK | home §8.3 replaced | OK | §8.3's only r1 change is one census row's tag; this text unchanged (diff) |
| RENDERING-123 | rule | OK | home §8.3 replaced | OK | §8.3's only r1 change is one census row's tag; this text unchanged (diff) |
| RENDERING-124 | defined-term | OK | home §8.3 replaced | OK | §8.3's only r1 change is one census row's tag; this text unchanged (diff) |
| RENDERING-125 | test | OK | home §8.3 replaced | OK | §8.3's only r1 change is one census row's tag; this text unchanged (diff) |
| RENDERING-126 | test | OK | home §8.3 replaced | OK | §8.3's only r1 change is one census row's tag; this text unchanged (diff) |
| RENDERING-127 | test | OK | home §8.3 replaced | OK | §8.3's only r1 change is one census row's tag; this text unchanged (diff) |
| RENDERING-128 | test | OK | home §8.3 replaced | OK | §8.3's only r1 change is one census row's tag; this text unchanged (diff) |
| RENDERING-129 | test | OK | home §8.3 replaced | OK | §8.3's only r1 change is one census row's tag; this text unchanged (diff) |
| RENDERING-130 | test | OK | home §8.3 replaced | OK | §8.3's only r1 change is one census row's tag; this text unchanged (diff) |
| RENDERING-131 | test | OK | home §8.3 replaced | OK | §8.3's only r1 change is one census row's tag; this text unchanged (diff) |
| RENDERING-132 | test | OK | home §8.3 replaced | OK | §8.3's only r1 change is one census row's tag; this text unchanged (diff) |
| RENDERING-133 | test | OK | home §8.3 replaced | OK | §8.3's only r1 change is one census row's tag; this text unchanged (diff) |
| RENDERING-134 | test | OK | home §8.3 replaced | OK | §8.3's only r1 change is one census row's tag; this text unchanged (diff) |
| RENDERING-135 | test | OK | home §8.3 replaced | OK | §8.3's only r1 change is one census row's tag; this text unchanged (diff) |
| RENDERING-136 | test | OK | target replaced | OK | §13.2 points to §8.3 (l. 7684–7685) |
| RENDERING-137 | test | OK | home §8.3 replaced | OK | §8.3's only r1 change is one census row's tag; this text unchanged (diff) |
| RENDERING-138 | test | OK | home §8.3 replaced | OK | §8.3's only r1 change is one census row's tag; this text unchanged (diff) |
| RENDERING-139 | test | OK | home §8.3 replaced | OK | §8.3's only r1 change is one census row's tag; this text unchanged (diff) |
| RENDERING-140 | test | OK | home §8.3 replaced | OK | §8.3's only r1 change is one census row's tag; this text unchanged (diff) |
| RENDERING-141 | test | OK | home §8.3 replaced | OK | §8.3's only r1 change is one census row's tag; this text unchanged (diff) |
| RENDERING-142 | test | OK | home §8.3 replaced | OK | §8.3's only r1 change is one census row's tag; this text unchanged (diff) |
| RENDERING-143 | test | OK | home §8.3 replaced | OK | §8.3's only r1 change is one census row's tag; this text unchanged (diff) |
| RENDERING-144 | test | OK | text changed | OK | l. 5881: tag NF-D10 dropped; row unchanged |
| RENDERING-145 | test | OK | home §8.3 replaced | OK | §8.3's only r1 change is one census row's tag; this text unchanged (diff) |
| RENDERING-146 | test | OK | target replaced | OK | §13.2 points to §8.3 (l. 7684–7685) |
| RENDERING-147 | test | OK — see VR-R0-12 | target §13.2 replaced | OK — VR-R0-12 FIXED | §13.2 l. 7684–7685 "the shipped stamp tiles pass §8.3's seam check (§8.10)"; §8.3's census row is the one statement |
| RENDERING-148 | test | OK | home §8.3 replaced | OK | §8.3's only r1 change is one census row's tag; this text unchanged (diff) |
| RENDERING-149 | test | OK | home §8.3 replaced | OK | §8.3's only r1 change is one census row's tag; this text unchanged (diff) |
| RENDERING-150 | test | OK | home §8.3 replaced | OK | §8.3's only r1 change is one census row's tag; this text unchanged (diff) |
| RENDERING-151 | test | OK | home §8.3 replaced | OK | §8.3's only r1 change is one census row's tag; this text unchanged (diff) |
| RENDERING-152 | test | OK | home §8.3 replaced | OK | §8.3's only r1 change is one census row's tag; this text unchanged (diff) |
| RENDERING-153 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-154 | interface | OK | target replaced | OK | §2.1 Layers bullet unchanged (r1: units sentence) |
| RENDERING-155 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-156 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-157 | defined-term | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-158 | defined-term | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-159 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-160 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-161 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-162 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-163 | interface | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-164 | number | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-165 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-166 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-167 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-168 | budget | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-169 | acceptance-bar | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-170 | budget | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-171 | acceptance-bar | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-172 | mechanism | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-173 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-174 | defined-term | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-175 | acceptance-bar | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-176 | decision | OK | J-row / F.5 | OK | pointer present; J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-177 | decision | OK | J-row / F.5 | OK | pointer present; J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-178 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-179 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-180 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-181 | defined-term | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-182 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-183 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-184 | algorithm-step | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-185 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-186 | acceptance-bar | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-187 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-188 | acceptance-bar | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-189 | decision | OK | J-row / F.5 | OK | pointer present; J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-190 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-191 | acceptance-bar | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-192 | rule | OK | target replaced | OK | §4.9's restraint pointer to §8.5 unchanged |
| RENDERING-193 | decision | OK | J-row / F.5 | OK | pointer present; J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-194 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-195 | rule | OK | target replaced | OK | §7.8 now points to "§8.5's distinct preview style" (l. 5446); §8.5 l. 6002 the one statement |
| RENDERING-196 | decision | OK | J-row / F.5 | OK | pointer present; J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-197 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-198 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-199 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-200 | rule | OK | home §8.9 replaced | OK | §8.9's r1 changes are the backend comment and `VectorBackend`; this text unchanged (diff) |
| RENDERING-201 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-202 | rule | OK | home §8.1 replaced | OK | §8.1's only r1 change is item 5's heading tag; this text unchanged (diff) |
| RENDERING-203 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-204 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-205 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-206 | acceptance-bar | OK | home §9.5 replaced | OK | §9.5's r1 changes are the compass and emblem tags; this text unchanged (diff) |
| RENDERING-207 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-208 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-209 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-210 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-211 | test | OK | home §8.3 replaced | OK | §8.3's only r1 change is one census row's tag; this text unchanged (diff) |
| RENDERING-212 | mechanism | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-213 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-214 | decision | OK | J-row / F.5 | OK | pointer present; J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-215 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-216 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-217 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-218 | budget | OK | re-checked (VR-R0-9) | OK | §8.8 not replaced; "a set a running export holds counts with that export's canvases, §12.8" (l. 6075–6076) agrees with §12.8's new counting |
| RENDERING-219 | budget | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-220 | budget | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-221 | evidence | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-222 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-223 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-224 | decision | OK | J-row / F.5 | OK | pointer present; J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-225 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-226 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-227 | decision | OK | J-row / F.5 | OK | pointer present; J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-228 | mechanism | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-229 | budget | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-230 | rule | OK | home §12.6 replaced | OK | §12.6's only r1 change is the scope-invariance tag; this text unchanged (diff) |
| RENDERING-231 | rule | OK | home §8.9 replaced | OK | §8.9's r1 changes are the backend comment and `VectorBackend`; this text unchanged (diff) |
| RENDERING-232 | rule | OK | home §8.9 replaced | OK | §8.9's r1 changes are the backend comment and `VectorBackend`; this text unchanged (diff) |
| RENDERING-233 | rule | OK | home §8.9 replaced | OK | §8.9's r1 changes are the backend comment and `VectorBackend`; this text unchanged (diff) |
| RENDERING-234 | acceptance-bar | OK | home §8.9 replaced | OK | §8.9's r1 changes are the backend comment and `VectorBackend`; this text unchanged (diff) |
| RENDERING-235 | rule | OK | home §8.9 replaced | OK | §8.9's r1 changes are the backend comment and `VectorBackend`; this text unchanged (diff) |
| RENDERING-236 | decision | OK | J-pointer in §8.9 (replaced) | OK | pointer present, text unchanged (diff); J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-237 | acceptance-bar | OK | home §8.9 replaced | OK | §8.9's r1 changes are the backend comment and `VectorBackend`; this text unchanged (diff) |
| RENDERING-238 | rule | OK | home §8.9 replaced | OK | §8.9's r1 changes are the backend comment and `VectorBackend`; this text unchanged (diff) |
| RENDERING-239 | rule | OK | home §8.9 replaced | OK | §8.9's r1 changes are the backend comment and `VectorBackend`; this text unchanged (diff) |
| RENDERING-240 | rule | OK | home §8.9 replaced | OK | §8.9's r1 changes are the backend comment and `VectorBackend`; this text unchanged (diff) |
| RENDERING-241 | rule | OK | home §8.9 replaced | OK | §8.9's r1 changes are the backend comment and `VectorBackend`; this text unchanged (diff) |
| RENDERING-242 | interface | OK | home §8.9 replaced | OK | §8.9's r1 changes are the backend comment and `VectorBackend`; this text unchanged (diff) |
| RENDERING-243 | interface | OK | home §8.9 replaced | OK | §8.9's r1 changes are the backend comment and `VectorBackend`; this text unchanged (diff) |
| RENDERING-244 | interface | OK | home §8.9 replaced | OK | §8.9's r1 changes are the backend comment and `VectorBackend`; this text unchanged (diff) |
| RENDERING-245 | interface | OK | home §8.9 replaced | OK | §8.9's r1 changes are the backend comment and `VectorBackend`; this text unchanged (diff) |
| RENDERING-246 | interface | OK | home §8.9 replaced | OK | §8.9's r1 changes are the backend comment and `VectorBackend`; this text unchanged (diff) |
| RENDERING-247 | interface | OK | home §8.9 replaced | OK | §8.9's r1 changes are the backend comment and `VectorBackend`; this text unchanged (diff) |
| RENDERING-248 | budget | OK | home §8.9 replaced | OK | §8.9's r1 changes are the backend comment and `VectorBackend`; this text unchanged (diff) |
| RENDERING-249 | rule | OK | home §8.9 replaced | OK | §8.9's r1 changes are the backend comment and `VectorBackend`; this text unchanged (diff) |
| RENDERING-250 | type | OK | text changed | OK | l. 6159: comment now "the tile and vector backends (§14 points here)"; TileAddress unchanged |
| RENDERING-251 | interface | OK | home §8.9 replaced | OK | §8.9's r1 changes are the backend comment and `VectorBackend`; this text unchanged (diff) |
| RENDERING-252 | interface | OK — see VR-R0-1 | text changed | OK — VR-R0-1 FIXED | `VectorBackend` declared once (l. 6172), signature = archive l. 10133; comment "the SVG writer (§11.1): runs in the generation worker over the export's transient list" = §11.1 l. 6836–6845; §14 pointer (l. 8325) resolves |
| RENDERING-253 | algorithm-step | OK | home §8.9 replaced | OK | §8.9's r1 changes are the backend comment and `VectorBackend`; this text unchanged (diff) |
| RENDERING-254 | rule | OK | home §8.9 replaced | OK | §8.9's r1 changes are the backend comment and `VectorBackend`; this text unchanged (diff) |
| RENDERING-255 | rule | OK | home §8.9 replaced | OK | §8.9's r1 changes are the backend comment and `VectorBackend`; this text unchanged (diff) |
| RENDERING-256 | number | OK | home §8.9 replaced | OK | §8.9's r1 changes are the backend comment and `VectorBackend`; this text unchanged (diff) |
| RENDERING-257 | mechanism | OK | home §8.9 replaced | OK | §8.9's r1 changes are the backend comment and `VectorBackend`; this text unchanged (diff) |
| RENDERING-258 | rule | OK | home §8.9 replaced | OK | §8.9's r1 changes are the backend comment and `VectorBackend`; this text unchanged (diff) |
| RENDERING-259 | rule | OK | home §8.9 replaced | OK | §8.9's r1 changes are the backend comment and `VectorBackend`; this text unchanged (diff) |
| RENDERING-260 | budget | OK | home §8.9 replaced | OK | §8.9's r1 changes are the backend comment and `VectorBackend`; this text unchanged (diff) |
| RENDERING-261 | rule | OK | home §8.9 replaced | OK | §8.9's r1 changes are the backend comment and `VectorBackend`; this text unchanged (diff) |
| RENDERING-262 | mechanism | OK | home §8.9 replaced | OK | §8.9's r1 changes are the backend comment and `VectorBackend`; this text unchanged (diff) |
| RENDERING-263 | budget | OK | home §8.9 replaced | OK | §8.9's r1 changes are the backend comment and `VectorBackend`; this text unchanged (diff) |
| RENDERING-264 | rule | OK | home §8.9 replaced | OK | §8.9's r1 changes are the backend comment and `VectorBackend`; this text unchanged (diff) |
| RENDERING-265 | budget | OK | home §8.9 replaced | OK | §8.9's r1 changes are the backend comment and `VectorBackend`; this text unchanged (diff) |
| RENDERING-266 | rule | OK | home §8.9 replaced | OK | §8.9's r1 changes are the backend comment and `VectorBackend`; this text unchanged (diff) |
| RENDERING-267 | acceptance-bar | OK | home §8.9 replaced | OK | §8.9's r1 changes are the backend comment and `VectorBackend`; this text unchanged (diff) |
| RENDERING-268 | acceptance-bar | OK | home §8.9 replaced | OK | §8.9's r1 changes are the backend comment and `VectorBackend`; this text unchanged (diff) |
| RENDERING-269 | decision | OK | J-pointer in §8.9 (replaced) | OK | pointer present, text unchanged (diff); J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-270 | decision | OK | J-pointer in §8.9 (replaced) | OK | pointer present, text unchanged (diff); J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-271 | decision | OK | J-pointer in §8.9 (replaced) | OK | pointer present, text unchanged (diff); J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-272 | decision | OK | J-pointer in §8.9 (replaced) | OK | pointer present, text unchanged (diff); J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-273 | decision | OK | J-pointer in §8.9 (replaced) | OK | pointer present, text unchanged (diff); J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-274 | decision | OK | J-pointer in §8.9 (replaced) | OK | pointer present, text unchanged (diff); J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-275 | interface | OK | home §8.10 replaced | OK | §8.10's only r1 change is the Edits bullet's tag; this text unchanged (diff) |
| RENDERING-276 | rule | OK — see VR-R0-11 | target §4.9 replaced | OK — VR-R0-11 FIXED | §4.9 l. 3687 "§8.10's layouts — … a jittered grid for orchards (6–8 m), a jittered line for avenues and street trees (…) and for hedgerows (8–12 m)" = §8.10 l. 6236–6240 |
| RENDERING-277 | rule | OK | target §4.9 replaced | OK | §4.9 row: wood 3–5 m, garden 4–6 m = §8.10's 300–500 / 400–600 cm gloss |
| RENDERING-278 | number | OK | home §8.10 replaced | OK | §8.10's only r1 change is the Edits bullet's tag; this text unchanged (diff) |
| RENDERING-279 | defined-term | OK | home §8.10 replaced | OK | §8.10's only r1 change is the Edits bullet's tag; this text unchanged (diff) |
| RENDERING-280 | rule | OK | home §8.10 replaced | OK | §8.10's only r1 change is the Edits bullet's tag; this text unchanged (diff) |
| RENDERING-281 | invariant | OK | home §8.10 replaced | OK | §8.10's only r1 change is the Edits bullet's tag; this text unchanged (diff) |
| RENDERING-282 | evidence | OK | home §8.10 replaced | OK | §8.10's only r1 change is the Edits bullet's tag; this text unchanged (diff) |
| RENDERING-283 | rule | OK | home §8.10 replaced | OK | §8.10's only r1 change is the Edits bullet's tag; this text unchanged (diff) |
| RENDERING-284 | rule | OK | home §8.10 replaced | OK | §8.10's only r1 change is the Edits bullet's tag; this text unchanged (diff) |
| RENDERING-285 | rule | OK | target replaced | OK | §6.1 points to §8.10 for the library (l. 4194), unchanged |
| RENDERING-286 | rule | OK | target §6.1 replaced | VR-R1-3 | §6.1 l. 4177–4182 now says "with `STAGE_VIEW` and reroll, attempt, epoch and salt 0" (VDC-11 (a)); §8.10 l. 6262–6264 restates it with the creation indices |
| RENDERING-287 | algorithm-step | OK | home §8.10 replaced | OK | §8.10's only r1 change is the Edits bullet's tag; this text unchanged (diff) |
| RENDERING-288 | algorithm-step | OK | home §8.10 replaced | OK | §8.10's only r1 change is the Edits bullet's tag; this text unchanged (diff) |
| RENDERING-289 | algorithm-step | OK | home §8.10 replaced | OK | §8.10's only r1 change is the Edits bullet's tag; this text unchanged (diff) |
| RENDERING-290 | rule | OK | home §8.10 replaced | OK | §8.10's only r1 change is the Edits bullet's tag; this text unchanged (diff) |
| RENDERING-291 | number | OK | home §8.10 replaced | OK | §8.10's only r1 change is the Edits bullet's tag; this text unchanged (diff) |
| RENDERING-292 | decision | OK | J-pointer in §8.10 (replaced) | OK | pointer present, text unchanged (diff); J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-293 | decision | OK | J-pointer in §8.10 (replaced) | OK | pointer present, text unchanged (diff); J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-294 | interface | OK | home §8.10 replaced | OK | §8.10's only r1 change is the Edits bullet's tag; this text unchanged (diff) |
| RENDERING-295 | rule | OK | home §8.10 replaced | OK | §8.10's only r1 change is the Edits bullet's tag; this text unchanged (diff) |
| RENDERING-296 | acceptance-bar | OK | home §8.10 replaced | OK | §8.10's only r1 change is the Edits bullet's tag; this text unchanged (diff) |
| RENDERING-297 | rule | OK | home §8.10 replaced | OK | §8.10's only r1 change is the Edits bullet's tag; this text unchanged (diff) |
| RENDERING-298 | history | OK | F.5 (history) | OK | verbatim in F.5, unchanged since r0 (the rationale file's r1 edits are the J-DET-36 row and the F.2 heading) |
| RENDERING-299 | decision | OK | J-pointer in §8.10 (replaced) | OK | pointer present, text unchanged (diff); J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-300 | algorithm-step | OK | home §8.10 replaced | OK | §8.10's only r1 change is the Edits bullet's tag; this text unchanged (diff) |
| RENDERING-301 | algorithm-step | OK | home §8.10 replaced | OK | §8.10's only r1 change is the Edits bullet's tag; this text unchanged (diff) |
| RENDERING-302 | invariant | OK | home §8.10 replaced | OK | §8.10's only r1 change is the Edits bullet's tag; this text unchanged (diff) |
| RENDERING-303 | defined-term | OK | target replaced | OK | §7.4 world-anchored instances unchanged (r1: draw-bridges row) |
| RENDERING-304 | rule | OK | home §8.10 replaced | OK | §8.10's only r1 change is the Edits bullet's tag; this text unchanged (diff) |
| RENDERING-305 | decision | OK | target replaced | OK | §6.5 (3) unchanged (r1: (9)'s pool sizes and truncation cases); J-row unchanged |
| RENDERING-306 | algorithm-step | OK | home §8.10 replaced | OK | §8.10's only r1 change is the Edits bullet's tag; this text unchanged (diff) |
| RENDERING-307 | algorithm-step | OK | home §8.10 replaced | OK | §8.10's only r1 change is the Edits bullet's tag; this text unchanged (diff) |
| RENDERING-308 | rule | OK | home §8.10 replaced | OK | §8.10's only r1 change is the Edits bullet's tag; this text unchanged (diff) |
| RENDERING-309 | rule | OK | home §8.10 replaced | OK | §8.10's only r1 change is the Edits bullet's tag; this text unchanged (diff) |
| RENDERING-310 | rule | OK | home §8.10 replaced | OK | §8.10's only r1 change is the Edits bullet's tag; this text unchanged (diff) |
| RENDERING-311 | rule | OK | home §8.10 replaced | OK | §8.10's only r1 change is the Edits bullet's tag; this text unchanged (diff) |
| RENDERING-312 | interface | OK | text changed | OK | l. 6329: tag NF-D11 dropped; §7.1's `instance` event unchanged (§7.1's r1 hunks: drawn bridge, registry sentence) |
| RENDERING-313 | rule | OK | text changed | OK | same Edits bullet: tag dropped; resolution rule unchanged |
| RENDERING-314 | rule | OK | home §8.10 replaced | OK | §8.10's only r1 change is the Edits bullet's tag; this text unchanged (diff) |
| RENDERING-315 | rule | OK | home §8.10 replaced | OK | §8.10's only r1 change is the Edits bullet's tag; this text unchanged (diff) |
| RENDERING-316 | decision | OK | J-pointer in §8.10 (replaced) | OK | pointer present, text unchanged (diff); J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-317 | rule | OK | home §8.10 replaced | OK | §8.10's only r1 change is the Edits bullet's tag; this text unchanged (diff) |
| RENDERING-318 | budget | OK | home §8.10 replaced | OK | §8.10's only r1 change is the Edits bullet's tag; this text unchanged (diff) |
| RENDERING-319 | decision | OK | J-pointer in §8.10 (replaced) | OK | pointer present, text unchanged (diff); J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-320 | decision | OK | J-pointer in §8.10 (replaced) | OK | pointer present, text unchanged (diff); J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-321 | decision | OK | J-pointer in §8.10 (replaced) | OK | pointer present, text unchanged (diff); J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-322 | decision | OK | J-pointer in §8.10 (replaced) | OK | pointer present, text unchanged (diff); J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-323 | decision | OK | J-pointer in §8.10 (replaced) | OK | pointer present, text unchanged (diff); J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-324 | summary | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-325 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-326 | interface | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-327 | interface | OK | target replaced | OK | §2.5 quarters comment unchanged (r1: DerivationRecord's τ sentence) |
| RENDERING-328 | interface | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-329 | interface | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-330 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-331 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-332 | rule | OK | target replaced | OK | §7.4 pinned labels unchanged |
| RENDERING-333 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-334 | test | OK | target replaced | OK | §6.5 (9) adds "pool sizes 0–3" to the cross-host bullet; placement-digest bullet unchanged |
| RENDERING-335 | rule | OK | target replaced | OK | §7.1 label events unchanged |
| RENDERING-336 | decision | OK | J-row / F.5 | OK | pointer present; J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-337 | rule | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-338 | test | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-339 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-340 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-341 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-342 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-343 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-344 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-345 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-346 | interface | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-347 | interface | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-348 | algorithm-step | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-349 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-350 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-351 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-352 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-353 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-354 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-355 | test | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-356 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-357 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-358 | budget | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-359 | decision | OK | J-row / F.5 | OK | pointer present; J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-360 | decision | OK | J-row / F.5 | OK | pointer present; J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-361 | decision | OK | J-row / F.5 | OK | pointer present; J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-362 | decision | OK | J-row / F.5 | OK | pointer present; J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-363 | decision | OK | J-row / F.5 | OK | pointer present; J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-364 | algorithm-step | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-365 | acceptance-bar | VR-R0-13 | target §13.7 replaced | OK — VR-R0-13 FIXED | §13.7 O13 (a) l. 8151: "takes its next alternate (§9.2: its next spine, then §9.4's ladder)" = §9.2 l. 6428 and the archive §9.3's "next candidate" (archive l. 8070–8071) |
| RENDERING-366 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-367 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-368 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-369 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-370 | acceptance-bar | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-371 | algorithm-step | OK | target replaced | OK | §5.2 F-LABEL row unchanged (r1: F-NUM, F-OUTLINE, F-BUDGET-STAGE, F-CASTLE, F-SITING, F-SKELETON) |
| RENDERING-372 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-373 | rule | OK | target replaced | OK | §4.5 quarters paragraph unchanged (r1: the district-faces sentence) |
| RENDERING-374 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-375 | rule | OK | target replaced | OK | §2.5 and §4.5 quarter statements unchanged |
| RENDERING-376 | rule | OK | home §8.2 replaced | OK | §8.2's r1 changes are the relief tier's clip and the texture-set tag; this text unchanged (diff) |
| RENDERING-377 | evidence | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-378 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-379 | decision | OK | J-row / F.5 | OK | pointer present; J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-380 | acceptance-bar | OK | target replaced | OK | §5.2 F-LABEL test cell unchanged |
| RENDERING-381 | acceptance-bar | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-382 | history | OK | F.5 (history) | OK | verbatim in F.5, unchanged since r0 (the rationale file's r1 edits are the J-DET-36 row and the F.2 heading) |
| RENDERING-383 | acceptance-bar | OK | home §9.5 replaced | OK | §9.5's r1 changes are the compass and emblem tags; this text unchanged (diff) |
| RENDERING-384 | rule | OK | text changed | OK | l. 6564–6566: tag NF-D12 dropped |
| RENDERING-385 | algorithm-step | OK | text changed | OK | l. 6566: same line, tag only; placement rule unchanged |
| RENDERING-386 | rule | OK | home §9.5 replaced | OK | §9.5's r1 changes are the compass and emblem tags; this text unchanged (diff) |
| RENDERING-387 | rule | OK | home §9.5 replaced | OK | §9.5's r1 changes are the compass and emblem tags; this text unchanged (diff) |
| RENDERING-388 | rule | OK | home §9.5 replaced | OK | §9.5's r1 changes are the compass and emblem tags; this text unchanged (diff) |
| RENDERING-389 | rule | OK | home §9.5 replaced | OK | §9.5's r1 changes are the compass and emblem tags; this text unchanged (diff) |
| RENDERING-390 | interface | OK | home §9.5 replaced | OK | §9.5's r1 changes are the compass and emblem tags; this text unchanged (diff) |
| RENDERING-391 | rule | OK | text changed | OK | l. 6591: tag NF-D12 dropped |
| RENDERING-392 | decision | OK | J-pointer in §9.5 (replaced) | OK | pointer present, text unchanged (diff); J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-393 | rule | OK | home §9.5 replaced | OK | §9.5's r1 changes are the compass and emblem tags; this text unchanged (diff) |
| RENDERING-394 | rule | OK | target replaced | OK | §7.1 Measure row unchanged |
| RENDERING-395 | rule | OK | home §9.5 replaced | OK | §9.5's r1 changes are the compass and emblem tags; this text unchanged (diff) |
| RENDERING-396 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-397 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-398 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-399 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-400 | test | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-401 | summary | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-402 | rule | OK | target replaced | OK | §13.2 document tests keep the round trip (l. 7676) |
| RENDERING-403 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-404 | rule | OK | target replaced | OK | §3.9 (r1: roles row) and §2.9 formats unchanged |
| RENDERING-405 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-406 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-407 | test | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-408 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-409 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-410 | budget | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-411 | test | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-412 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-413 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-414 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-415 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-416 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-417 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-418 | test | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-419 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-420 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-421 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-422 | algorithm-step | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-423 | number | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-424 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-425 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-426 | decision | OK | J-row / F.5 | OK | pointer present; J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-427 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-428 | decision | OK | J-row / F.5 | OK | pointer present; J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-429 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-430 | mechanism | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-431 | budget | OK | home §12.8 replaced | OK | §12.8's r1 changes are the M2a sentence and Canvases during a raster export; this text unchanged (diff) |
| RENDERING-432 | mechanism | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-433 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-434 | decision | OK | J-row / F.5 | OK | pointer present; J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-435 | decision | OK | J-row / F.5 | OK | pointer present; J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-436 | interface | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-437 | evidence | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-438 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-439 | acceptance-bar | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-440 | decision | OK | J-row / F.5 | OK | pointer present; J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-441 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-442 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-443 | interface | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-444 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-445 | decision | OK | J-row / F.5 | OK | pointer present; J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-446 | type | OK | home §11.2 replaced | OK | §11.2's r1 changes are the two confirm tags; this text unchanged (diff) |
| RENDERING-447 | interface | OK | text changed | OK | l. 6908: confirm comment "(NF-D14)" → "(below)", i.e. Confirming fates (l. 6938) |
| RENDERING-448 | type | OK | home §11.2 replaced | OK | §11.2's r1 changes are the two confirm tags; this text unchanged (diff) |
| RENDERING-449 | type | OK | home §11.2 replaced | OK | §11.2's r1 changes are the two confirm tags; this text unchanged (diff) |
| RENDERING-450 | type | OK | home §11.2 replaced | OK | §11.2's r1 changes are the two confirm tags; this text unchanged (diff) |
| RENDERING-451 | interface | OK | home §11.2 replaced | OK | §11.2's r1 changes are the two confirm tags; this text unchanged (diff) |
| RENDERING-452 | rule | OK | text changed | OK | l. 6938: heading tag dropped; §7.3 item 4 unchanged (§7.3's r1 hunks: item 2's list, item 7 (ii)) |
| RENDERING-453 | rule | OK | home §11.2 replaced | OK | §11.2's r1 changes are the two confirm tags; this text unchanged (diff) |
| RENDERING-454 | decision | OK | J-pointer in §11.2 (replaced) | OK | pointer present, text unchanged (diff); J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-455 | budget | OK | home §11.2 replaced | OK | §11.2's r1 changes are the two confirm tags; this text unchanged (diff) |
| RENDERING-456 | rule | OK | home §11.2 replaced | OK | §11.2's r1 changes are the two confirm tags; this text unchanged (diff) |
| RENDERING-457 | rule | OK | target replaced | OK | §3.3 pool step 1 keeps "No `SharedArrayBuffer` is used (§11.2)" (l. 1818–1819) |
| RENDERING-458 | rule | OK | home §11.2 replaced | OK | §11.2's r1 changes are the two confirm tags; this text unchanged (diff) |
| RENDERING-459 | interface | OK | home §11.3 replaced | OK | §11.3's r1 changes are Bridged load verification and Logging; this text unchanged (diff) |
| RENDERING-460 | interface | OK | home §11.3 replaced | OK | §11.3's r1 changes are Bridged load verification and Logging; this text unchanged (diff) |
| RENDERING-461 | defined-term | OK | target replaced | OK | §2.9 still points to §11.3 for logHead |
| RENDERING-462 | rule | OK | home §11.3 replaced | OK | §11.3's r1 changes are Bridged load verification and Logging; this text unchanged (diff) |
| RENDERING-463 | rule | OK | home §11.3 replaced | OK | §11.3's r1 changes are Bridged load verification and Logging; this text unchanged (diff) |
| RENDERING-464 | test | OK | home §11.3 replaced | OK | §11.3's r1 changes are Bridged load verification and Logging; this text unchanged (diff) |
| RENDERING-465 | rule | OK | home §11.3 replaced | OK | §11.3's r1 changes are Bridged load verification and Logging; this text unchanged (diff) |
| RENDERING-466 | rule | OK | target replaced | OK | §2.9 view section unchanged |
| RENDERING-467 | rule | OK | target replaced | OK | §11.3 View state line unchanged |
| RENDERING-468 | rule | OK | home §11.3 replaced | OK | §11.3's r1 changes are Bridged load verification and Logging; this text unchanged (diff) |
| RENDERING-469 | decision | OK | J-pointer in §11.3 (replaced) | OK | pointer present, text unchanged (diff); J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-470 | rule | OK | home §11.3 replaced | OK | §11.3's r1 changes are Bridged load verification and Logging; this text unchanged (diff) |
| RENDERING-471 | rule | VR-R0-6 | text changed | OK — VR-R0-6 FIXED | l. 7013–7020: owner-only keep (J-DET-42); the others take the replayed town, report, record their root at `h₀`, keep the `doc.load` bytes (≤ 3 MB at CITY, §2.9 l. 1488; counted in §12.8) until settled or their session ends; §2.9 step 4 points here (l. 1448–1450) |
| RENDERING-472 | rule | VR-R0-5 | text changed | OK — VR-R0-5 FIXED | l. 7022–7023: "logged one to one — a host's own commands with `author: 'host'` (§7.1's `EditBase`)" = archive l. 6005–6006; `EditBase.author` l. 4624; §7.1 points here (l. 4789–4790); stated once |
| RENDERING-473 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-474 | rule | OK | target replaced | OK | §2.9 pack cap and §5.2 F-EDIT unchanged |
| RENDERING-475 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-476 | decision | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-477 | interface | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-478 | decision | OK | J-row / F.5 | OK | pointer present; J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-479 | decision | OK | J-row / F.5 | OK | pointer present; J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-480 | summary | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-481 | defined-term | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-482 | evidence | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-483 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-484 | defined-term | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-485 | defined-term | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-486 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-487 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-488 | rule | OK | target replaced | OK | §13.2 cost-model paragraph points to §12 (l. 7671–7674) |
| RENDERING-489 | budget | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-490 | decision | OK | J-row / F.5 | OK | pointer present; J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-491 | rule | OK | home §12.8 replaced | OK | §12.8's r1 changes are the M2a sentence and Canvases during a raster export; this text unchanged (diff) |
| RENDERING-492 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-493 | number | VR-R0-8 | text changed | OK — VR-R0-8 FIXED; see VR-R1-5 | l. 7104–7112: bands, targets, buildings and frames by pointer to §1.1's rung table (l. 169–173, same values, "+ 30 % margin per side" in its header) and §3.2 (9); MFCG columns and the cap row (≤ 35 000, ≤ 153.6 km²) kept |
| RENDERING-494 | number | OK | home §12.2 replaced | OK | §12.2's r1 changes are the ladder table and the default-request sentence; this text unchanged (diff) |
| RENDERING-495 | rule | OK | home §12.2 replaced | OK | §12.2's r1 changes are the ladder table and the default-request sentence; this text unchanged (diff) |
| RENDERING-496 | rule | OK | home §12.2 replaced | OK | §12.2's r1 changes are the ladder table and the default-request sentence; this text unchanged (diff) |
| RENDERING-497 | evidence | OK | home §12.2 replaced | OK | §12.2's r1 changes are the ladder table and the default-request sentence; this text unchanged (diff) |
| RENDERING-498 | history | OK | F.5 (history) | OK | verbatim in F.5, unchanged since r0 (the rationale file's r1 edits are the J-DET-36 row and the F.2 heading) |
| RENDERING-499 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-500 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-501 | budget | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-502 | budget | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-503 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-504 | budget | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-505 | rule | OK | re-checked (§12.2) | OK | §12.3 "the default request (§12.2)" (l. 7162) lands on the definition; 92–110 / 265–340 ms = the laws at 1 200–1 500 / 4 500–6 000 buildings |
| RENDERING-506 | decision | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-507 | acceptance-bar | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-508 | acceptance-bar | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-509 | test | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-510 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-511 | evidence | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-512 | decision | OK | J-row / F.5 | OK | pointer present; J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-513 | test | OK | target replaced | OK | §13.2 cost-model paragraph points to §12.3 |
| RENDERING-514 | acceptance-bar | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-515 | decision | OK | J-row / F.5 | OK | pointer present; J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-516 | budget | OK | target replaced | OK | §4.2 S1 (1), (3) unchanged (r1: S1 (2) simplicity clamp) |
| RENDERING-517 | budget | OK | text changed | OK | l. 7221: tag NF-P1 dropped; values unchanged |
| RENDERING-518 | budget | OK | home §12.4 replaced | OK | §12.4's r1 changes are the S2/S3 tag and the S9 and S10 (0) rows; this text unchanged (diff) |
| RENDERING-519 | budget | OK | target replaced | OK | S5 and S8 rows unchanged; §3.7's M0 per-op list unchanged |
| RENDERING-520 | budget | OK | target replaced | OK | §4.5 grower mechanism unchanged apart from the district-faces sentence |
| RENDERING-521 | budget | OK — see VR-R0-3 | text changed | OK — VR-R0-3 FIXED | S9 row l. 7227: "per district: the kernel's M0 bar (§3.7)", 25 ms; §3.7 l. 2326–2328 states "one district ≤ 3 ms on reference hardware" once (canon R8) |
| RENDERING-522 | budget | OK | target replaced | OK | §4.5, §4.7, §4.9 mechanisms unchanged |
| RENDERING-523 | budget | VR-R0-2 | text changed | OK — VR-R0-2 FIXED | S10 (0) row l. 7230: "≈ 3 ms for the bands … (the margin bands included) + ≈ 2.3 ms for the L3 partition rebuild of the ≈ 9 000 items it made (§3.3 pool step 1; …)" = PIPELINE-256 (archive l. 4440); §3.3's "carried in §12.4's S10 (0) row" (l. 1811) now true |
| RENDERING-524 | budget | VR-R0-3 | text changed | OK — VR-R0-3 FIXED | pooled row l. 7231 unchanged (S11 ≤ 5 µs = 3 + 2; ≤ 40 µs = 25 + 15); KERNEL-318's S9 bar at §3.7 l. 2327 |
| RENDERING-525 | budget | OK | target replaced | OK | §4.9 hinterland paragraph unchanged (r1: trees row) |
| RENDERING-526 | budget | OK | target replaced | OK | §3.3 merge unchanged (r1: tags, receipt name) |
| RENDERING-527 | budget | OK | home §12.4 replaced | OK | §12.4's r1 changes are the S2/S3 tag and the S9 and S10 (0) rows; this text unchanged (diff) |
| RENDERING-528 | rule | OK | home §12.4 replaced | OK | §12.4's r1 changes are the S2/S3 tag and the S9 and S10 (0) rows; this text unchanged (diff) |
| RENDERING-529 | rule | OK | home §12.4 replaced | OK | §12.4's r1 changes are the S2/S3 tag and the S9 and S10 (0) rows; this text unchanged (diff) |
| RENDERING-530 | history | OK | F.5 (history) | OK | verbatim in F.5, unchanged since r0 (the rationale file's r1 edits are the J-DET-36 row and the F.2 heading) |
| RENDERING-531 | budget | OK | home §12.4 replaced | OK | §12.4's r1 changes are the S2/S3 tag and the S9 and S10 (0) rows; this text unchanged (diff) |
| RENDERING-532 | history | OK | F.5 (history) | OK | verbatim in F.5, unchanged since r0 (the rationale file's r1 edits are the J-DET-36 row and the F.2 heading) |
| RENDERING-533 | acceptance-bar | OK | home §12.4 replaced | OK | §12.4's r1 changes are the S2/S3 tag and the S9 and S10 (0) rows; this text unchanged (diff) |
| RENDERING-534 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-535 | budget | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-536 | budget | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-537 | rule | OK | text changed | OK — see VR-R1-5 | l. 7114–7116: the default request defined once; its building range is now "§1.1's rung table" |
| RENDERING-538 | decision | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-539 | acceptance-bar | OK | target replaced | OK | §13.2 points to §12.5 |
| RENDERING-540 | acceptance-bar | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-541 | budget | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-542 | budget | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-543 | acceptance-bar | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-544 | budget | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-545 | budget | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-546 | budget | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-547 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-548 | decision | OK | J-row / F.5 | OK | pointer present; J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-549 | budget | OK | home §12.6 replaced | OK | §12.6's only r1 change is the scope-invariance tag; this text unchanged (diff) |
| RENDERING-550 | budget | OK | home §12.6 replaced | OK | §12.6's only r1 change is the scope-invariance tag; this text unchanged (diff) |
| RENDERING-551 | budget | OK | home §12.6 replaced | OK | §12.6's only r1 change is the scope-invariance tag; this text unchanged (diff) |
| RENDERING-552 | acceptance-bar | OK | text changed | OK | l. 7330: tag NF-S6 dropped; §13.2 points here (l. 7671–7672); §5.3's reworded cost rule (l. 4078–4079) agrees |
| RENDERING-553 | rule | OK | target §7.3 replaced | VR-R1-3 | §7.3 item 2 (l. 4866–4871) now lists "the undo of an upgrade after a reload" (VDC-11 (b)); §12.6 l. 7331–7333 restates the list and the view-stage order |
| RENDERING-554 | budget | OK | home §12.6 replaced | OK | §12.6's only r1 change is the scope-invariance tag; this text unchanged (diff) |
| RENDERING-555 | budget | OK | home §12.6 replaced | OK | §12.6's only r1 change is the scope-invariance tag; this text unchanged (diff) |
| RENDERING-556 | history | OK | F.5 (history) | OK | verbatim in F.5, unchanged since r0 (the rationale file's r1 edits are the J-DET-36 row and the F.2 heading) |
| RENDERING-557 | rule | OK | target replaced | OK | §2.9 step 3 unchanged; the 35–38 ms evidence stated once (l. 7347) |
| RENDERING-558 | acceptance-bar | OK | home §12.6 replaced | OK | §12.6's only r1 change is the scope-invariance tag; this text unchanged (diff) |
| RENDERING-559 | decision | OK | J-pointer in §12.6 (replaced) | OK | pointer present, text unchanged (diff); J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-560 | budget | OK | home §12.6 replaced | OK | §12.6's only r1 change is the scope-invariance tag; this text unchanged (diff) |
| RENDERING-561 | acceptance-bar | OK | home §12.6 replaced | OK | §12.6's only r1 change is the scope-invariance tag; this text unchanged (diff) |
| RENDERING-562 | rule | OK | target replaced | OK | §7.8 budget unchanged (1 s TOWN; 300 / 250 / 500 ms) |
| RENDERING-563 | budget | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-564 | budget | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-565 | budget | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-566 | budget | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-567 | acceptance-bar | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-568 | budget | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-569 | budget | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-570 | evidence | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-571 | rule | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-572 | acceptance-bar | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-573 | acceptance-bar | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-574 | decision | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-575 | acceptance-bar | OK | re-checked (NR5-1) | VR-R1-1 | §12.7 l. 7412–7416: the `lit` path-sun export is part of "B-CITY's browser run at M1", but `lit` and the path sun ship at M2b (§16 l. 8647; §12.7 l. 7377) |
| RENDERING-576 | acceptance-bar | OK | carried | OK | home not replaced by r1; r0 verdict stands (its pointers into replaced text re-read, §6) |
| RENDERING-577 | budget | OK | target §3.7 replaced | VR-R1-6 | l. 7420–7421 credit "≤ 3 µs per plot median" to §3.7, which states no µs figure; the bar is §12.4's S11 row (l. 7231) |
| RENDERING-578 | budget | OK | target replaced | OK | §13.2 points to §12.7 |
| RENDERING-579 | rule | OK | home §12.8 replaced | OK | §12.8's r1 changes are the M2a sentence and Canvases during a raster export; this text unchanged (diff) |
| RENDERING-580 | budget | OK | home §12.8 replaced | OK | §12.8's r1 changes are the M2a sentence and Canvases during a raster export; this text unchanged (diff) |
| RENDERING-581 | rule | OK | home §12.8 replaced | OK | §12.8's r1 changes are the M2a sentence and Canvases during a raster export; this text unchanged (diff) |
| RENDERING-582 | budget | OK | home §12.8 replaced | OK | §12.8's r1 changes are the M2a sentence and Canvases during a raster export; this text unchanged (diff) |
| RENDERING-583 | history | OK | F.5 (history) | OK | verbatim in F.5, unchanged since r0 (the rationale file's r1 edits are the J-DET-36 row and the F.2 heading) |
| RENDERING-584 | budget | OK | home §12.8 replaced | OK | §12.8's r1 changes are the M2a sentence and Canvases during a raster export; this text unchanged (diff) |
| RENDERING-585 | rule | OK | target replaced | OK | §12.8 sentence and §4.1 unchanged |
| RENDERING-586 | acceptance-bar | VR-R0-4 | text changed | OK — VR-R0-4 FIXED | l. 7449–7451: "≈ 30 000 entity leaves, ≈ 15 000 face-ring hashes and their interior nodes at 16 B each" = archive l. 5417, stated once; §6.2 points (l. 4268–4269); bridged bytes now "(§11.3)" |
| RENDERING-587 | budget | OK | re-checked (§12.8) | OK | CITY line unchanged (l. 7455–7461) |
| RENDERING-588 | budget | OK | home §12.8 replaced | OK | §12.8's r1 changes are the M2a sentence and Canvases during a raster export; this text unchanged (diff) |
| RENDERING-589 | rule | OK | home §12.8 replaced | OK | §12.8's r1 changes are the M2a sentence and Canvases during a raster export; this text unchanged (diff) |
| RENDERING-590 | budget | VR-R0-9 | re-checked (VR-R0-9) | OK — VR-R0-9 FIXED | export-time peak unchanged: the held set "counted with the canvases below" (l. 7472–7473), sized in the next paragraph |
| RENDERING-591 | acceptance-bar | OK | home §12.8 replaced | OK | §12.8's r1 changes are the M2a sentence and Canvases during a raster export; this text unchanged (diff) |
| RENDERING-592 | budget | OK | re-checked (§12.8) | OK | §8.8's figures; §12.8's gloss (l. 7479–7480) unchanged |
| RENDERING-593 | rule | VR-R0-9 | text changed | OK — VR-R0-9 FIXED; see VR-R1-2 | l. 7479–7490: the held set adds nothing while it is the drawn step's set, then one more set ≤ 5 MB (§8.8); sums re-derived (112 + 15 = 127 ≤ 128; 43 + 15 + 5 = 63 ≤ 72; 67 + 15 = 82 > 72; 112 + 15 + 5 = 132 > 128; 2P + 7 at P = 20 / 35 = 47 / 77; 62 and 97 MB) |
| RENDERING-594 | acceptance-bar | OK | target replaced | OK | §12.8 measurement unchanged; §16 M1 exit keeps "pool sizes 0 and 3" (l. 8645) |
| RENDERING-595 | acceptance-bar | OK | home §12.8 replaced | OK | §12.8's r1 changes are the M2a sentence and Canvases during a raster export; this text unchanged (diff) |
| RENDERING-596 | evidence | OK | home §12.9 replaced | OK | §12.9's only r1 change is the FTG bullet's tag; this text unchanged (diff) |
| RENDERING-597 | evidence | OK | text changed | OK | l. 7509: tag NF-S7 dropped |
| RENDERING-598 | decision | OK | home §12.9 replaced | OK | §12.9's only r1 change is the FTG bullet's tag; this text unchanged (diff) |
| RENDERING-599 | decision | OK | J-pointer in §12.9 (replaced) | OK | pointer present, text unchanged (diff); J-row unchanged (the index block's r1 edits are J-DET-36 and J-S43); F.5 unchanged |
| RENDERING-C01 | conflict | OK | NR5-2 | OK | NR5-2 still FIXED (§4) |
| RENDERING-C02 | conflict | OK | NR5-1 | OK — see VR-R1-1 | NR5-1 still FIXED; its §12.7 test milestone → VR-R1-1 (§4) |
| RENDERING-C03 | conflict | OK | NR5-3 | OK | NR5-3 still FIXED (§4) |
| RENDERING-C04 | conflict | OK | carried | OK | §12.1 and §8.8 not replaced |
| RENDERING-C05 | conflict | OK | home §9.5 replaced | OK | §9.5's title rule unchanged (tags only); §9.1, §9.2 not replaced |
| RENDERING-C06 | conflict | OK | carried | OK | §9.2 not replaced; GAP-2 still the owner's / Fable's |
| RENDERING-C07 | conflict | OK | home §12.2 replaced | OK | §12.5's "above the request cap of §12.2" still lands: the cap row (l. 7112) |
| RENDERING-C08 | conflict | OK | home §12.6 replaced | OK | §12.6's warp preview ≥ 30 fps unchanged; §8.8 "frame rate: §12.6" |
