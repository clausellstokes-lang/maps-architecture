# _critic-dwellings — Fable critic seat over the three Dwellings findings files

Seat run 2026-09-26 (Claude Fable 5.1, lane `dwellings/_critic`) over `dwellings-posts.md` (906 lines),
`profile-dwellings.md` (464) and `dwellings-exports.md` (711), in the role and format of `_critic-ftg.md`, whose
rulings on method apply (RESOLVED / RECONCILED / OPEN for contradictions; SUPPORTED / WORDING / UNSUPPORTED for
quote checks; CONFIRMED / CORRECTED / REJECTED for re-derivations). Clean-room: no captured JavaScript bundle was
opened; call counts were read from the profiler's `calls.json` files (class attribution by `analyze.mjs`), timings
from the analyzer's `report.json` call trees, geometry from the vertex records, the exports' JSON and screenshots.
Nothing outside `/Users/cstokes/Desktop/Maps` was consulted. Re-derivation scripts and their outputs (stdlib Node
and Python only, written by this seat, not the readers' scripts): `captures/dwellings/_critic/`. The readers' files
were not edited and nothing was appended to them. No new capture was recorded and no export was triggered.

STATUS: COMPLETE (2026-09-26) — §0–§6 written; scripts and outputs saved under `captures/dwellings/_critic/`.

**Headline ruling (what changes for a designer of our floor-plan rung, item 28).** The three lanes agree on the
data almost everywhere — the exports' JSON and the profile lane's vertex records describe the same twelve houses cell
for cell (38/38 storeys, §3 R4) — but five readings must be replaced. (1) **Dwellings' roof is a straight skeleton of
each storey's whole outline**, one hip-roof face per outline corner (82/92 walked houses exact, the other ten are
+1 for a spiral-stair cone), not "hipped roofs over each block" as `profile-dwellings.md` §4.12 and
`dwellings-exports.md` §2.8 inferred; `dwellings-posts.md` §2(j)'s reading is upheld. (2) **"Role assignment is the
expensive stage" counts furnishing**: `Room.fill` (furniture and lights) is nested inside `HouseType.assignRooms`
in 38/38 profiled generations; for small houses it is about two thirds of that time, for large houses about a
seventh — the validation proper is `assignSet`. (3) **`Door.getPrice = 2 × Door.new` is false** (ratio 3.0–7.1 in
96/96 houses) and the exported doors are not simply the surviving `Door` objects (equal in 8/12 houses). (4) **The
tree property is a property of the twelve exported houses, not a law**: the creator states that loops occur "quite
rarely" and gives a permalink; no lane opened it. (5) Three creator statements do not describe this build:
`square` requests a rectangle (4/5 not square); basements are a size target of 9–20 cells (small houses' basements
equal the ground floor, 6/6), and the basement probability is ≈ 0.78 whatever the storey count (the "50 % for a
single-storey house" of 2024 is not reproduced, 11/14); and "bathrooms often get attached to bedrooms" (1.3.0) is
not observed (0/12 bathrooms share even a wall with a bedroom). The stairwell path is taken without the tag in
about half of the multi-storey draws, not in "three houses". Everything else a designer would copy from the three
files survives re-derivation (§3).

## 0. What this seat did and did not do (read this first)

* **Read cover to cover, every line:** the three findings files (2 081 lines); `captures/dwellings/README.md`,
  `captures/dwellings/exports-2026-09-26/README.md`, `run-captures.sh`, `profiler/README.md`; `_critic-ftg.md` (the
  format); `docs/CONFIDENCE.md` §0 (the rulings that apply); `manor.md` §2.9–2.10, §3.2, §4.3 (the lineage the
  posts lane extends); `docs/PROGRESS.md` J34–J35 (the owner's approval of the exports).
* **Raw sources read in full, every line (64 files):** all 15 Dwellings devlog `post.md` files, `_page.md` and
  `_comments.md` (83 posts); the 3 Taverns devlogs, page and comments; the 19 Patreon posts of `watabou-manor`
  the readers list (2 locked); the 17 `watabou-extra`, 3 `watabou-city` and 3 `watabou-village` posts the posts
  lane cites (including `141198168`, which it left unread). A grep of every `post.md` on disk (43 files mention
  Dwellings, "House Plan", "floor plan" or "Open in PM") and a title/tag search of the 212-post index
  `watabou-all-posts.json` found no Dwellings post the posts lane missed (§1).
* **Captures and probes processed in full by script, none sampled:** all 96 coverage houses (29 captures ×
  `gen-N.calls.json`) with their storey lists from the 24 draw passes; the 12 export-tied draw passes' vertex
  records; the 49 profiled generations of the five profile captures (their `report.json` call trees); all 318
  storey views of the 92 walked houses (`_probes/floors/steps/*.paths.json`); the 12 JSON exports; all 28 lines of
  `export-log.jsonl`, `determinism.json`, `probe-urlkey.jsonl`; all 17 probe logs (`probe-*.log`, `resolve-build.log`,
  `keys/K-summary.txt`), the `steps.jsonl` summaries of the seed, urltags and doors probes; `_measure/identities.txt`,
  `floors-stats.txt`, `draw-scaling.txt`, `cost-summary.tsv`, `houses.tsv`; `logs/index.tsv`, `logs/timeline.log`;
  `_probes/dwlib.mjs`, `probe-seed.mjs`, `probe-doors.mjs` (to learn what the log fields mean).
* **Read by eye:** `2026-09-26T23-11-32/report.md` in full; the call trees of `23-36-48` (cold large) and
  `23-37-10` (Enter) by grep with indentation. **Images opened (9):** `_comments-images/06.png` (the 2023 tags
  dialog), `watabou-manor/112799146/images/03.png` (blueprint and entrance), `145140009/images/02.jpg` (roofs),
  `_probes/tags-dialog.png`, `blueprint/steps/015-bp-X.png`, `plan/steps/026-url-L-4x2-editor.png`,
  `plan3/steps/009-B_yw1-1110-editor.png`, `floors/steps/139-s260926505-medium_square-GF.png`,
  `exports-2026-09-26/ui/door-modes-hidden-simple-open.png`.
* **Not done:** the 12 SVG exports and 12 export PNGs were not parsed or viewed (their structure claims stand on the
  exports lane's own JSON ↔ SVG cross-checks, which are consistent with my JSON re-derivation); the 245 capture
  screenshots and 447 probe screenshots were not viewed except the two above; the readers' scripts
  (`_measure/*.mjs`, `stats.py`) were not read — every number below was re-derived with my own code; the
  `record.log`/`analyze.log` pairs and the session consoles were not read; the elevation and the Gothic/Tavern room
  sets were not measured (no lane did); no building was opened from a settlement generator (no lane did).
* **Method:** every cross-file hook was written down while reading, then tested against the raw file or by script;
  quotations were checked by grep at the cited source (§3, Q-rows).

## 1. Coverage table — every source on disk against who read it and how deeply

"full" = the whole file read; "grep" = only quoted lines located; "script" = every record processed by a program, none
sampled; "—" = not read by that lane. The posts lane read no capture or probe; the profile lane read no Patreon post
directly (it cites them through `manor.md`); the exports lane read the sources it needed for its own claims.

| source (count) | posts lane | profile lane | exports lane | this seat | unread or thin |
|---|---|---|---|---|---|
| Dwellings devlogs `563591`, `565440`, `567246`, `567327`, `581099`, `666129`, `674004`, `798071`, `805488`, `810018`, `871855`, `880631`, `1106706`, `1113590`, `1134478` (15 `post.md`) | full, all 15 | `567246` only | `798071`, `871855`, `1113590`, `567246` | full, all 15 | none; 14 are teaser stubs whose text is the Patreon post's first lines — their comment threads are the substance |
| `devlogs/dwellings/_page.md`, `_comments.md` (83 posts) | full; §4.2 counts every post | `_page.md` (build URL) | "relevant threads" | full | none |
| Dwellings images: 14 devlog + 5 page + 6 comment (25) | all 25 viewed | — | — | `_comments-images/06` | 24 stand on the posts lane's word |
| Taverns devlogs `1521851`, `1538100`, `1643499`, `_page.md`, `_comments.md` (13 posts), 5 images | full, images viewed | — | — | full text; no image | images on the posts lane's word |
| Patreon `watabou-manor`: `63952852`†, `86436420`, `86635425`, `86852618`, `88328982`, `96522502`, `97493516`, `111909860`, `112799146`, `113347826`, `118772106`, `120395768`, `121415691`, `143036785`, `143565705`, `145140009`, `158074424`, `158953060`†, `159559624` (19; † locked, no body) | full; comment counts checked against `comments.json` | via `manor.md` | `143565705`, `111909860` full; `120395768`, `143036785`, `159559624`, `96522502`, `97493516`, `86635425`, `88328982`, `121415691` grep | full, all 19 | the two locked posts have only blurred previews (no lane can do better) |
| Patreon images of those 19 posts (61) | all viewed | — | 0 | `112799146/03`, `145140009/02` | 59 on the posts lane's word |
| Patreon `watabou-extra`: `28088976`, `49191011`, `58808794`, `59864807`, `60165082`, `64375271`, `86093774`, `106975409`, `109092851`, `115606722`, `141879891`, `144816210`, `145997186`, `94469350`, `103335095`, `124128668` (16; images 71) | full, images viewed | — | — | full, all 16 + `141198168` (17) | `141198168` (UP new buildings, 2025-10) not read by the posts lane: it does not mention Dwellings, but it records that "twisted bisection" was tried and dropped for UP's new buildings — a sibling-method fact, minor |
| Patreon `watabou-city` `61026228`, `100431269`, `102377277`; `watabou-village` `104796798`, `116745476`, `117634240` (6; images 28) | full, images viewed | — | — | full, all 6 | none |
| Patreon posts on disk mentioning Dwellings/floor plans but outside the readers' lists: `watabou-manor/28327848`, `32477317`, `65675282`, `66544756` (+ village copy), `ftg/164816716` | via `manor.md` (PM posts) | — | — | grep | all are Procgen Mansion or FTG posts already covered by `manor.md` / the FTG files — nothing Dwellings-specific missed |
| Not on disk: Patreon `94721098` (Tiny Pubs 1.0.1, index only); tweet `1494337095313223682`; Dark Clues body | noted | — | — | index checked | unreadable by any lane |
| `captures/dwellings/2026-09-26T22-56-56` (first look: Enter mode, 4 generations, profile @100 µs + coverage + draw) | — | script + `report.md` (151 KB) | — | script (4 coverage houses, `Random.reset` counts) | its draw pass generated other houses than its coverage pass (Enter mode) — no storey list for those 4 |
| export-tied captures `23-11-03`, `23-11-14`, `23-11-23`, `23-11-32`, `23-11-42`, `23-11-58`, `23-12-08`, `23-12-18`, `23-12-29`, `23-12-38`, `23-12-47`, `23-13-01` (12; coverage + draw + vertices) | — | script (all) | `meta.json` of each | script (12 coverage, 12 draw texts, 12 vertex records; `23-11-32/report.md` in full) | none |
| tag-family captures `23-38-44` square, `23-39-37` low, `23-40-27` tall, `23-41-27` slab, `23-42-38` organic, `23-44-05` hallways, `23-45-44` spiral, `23-46-55` basement, `23-48-04` blank, `23-49-13` transparent, `23-50-03` generic, `23-50-54` small, `23-51-41` medium, `23-52-27` large, `23-53-14` mechanical, `23-54-02` stairwell (16 × 5 houses) | — | script (all 80) | — | script (80 coverage houses + 80 draw texts) | their 16 `report.md` (≈ 85 KB each) were read by no one by eye; the analyzer wrote them and the scripts consumed the underlying files — acceptable |
| profile captures `23-36-09` small, `23-36-25` medium, `23-36-48` large (reload, 3 gens each), `23-37-10` (cold + 8 Enter), `23-54-54` (cold + 30 Enter; gens 20–30 empty) | — | script (`analyze.mjs --top 4000 --tree-min 0.1`, `cost.mjs`) + call trees read | — | script over the 49 `report.json` trees; `23-36-48` and `23-37-10` trees by grep | the `.cpuprofile` files themselves were parsed by no seat except through the analyzer (both seats) |
| probes `resolve-build`, `seed` (+`nomarker`), `ui`, `tags`, `params`, `urltags`, `blueprint`, `plan`, `plan2`, `plan3`, `plan4` (previous profile seat) | — | logs "read in full" by the continuation seat | `seed`, `seed-nomarker`, `resolve-build`, `dwlib`, `dw-methods` | all logs full; `seed`/`urltags` `steps.jsonl` by script; 4 editor/dialog screenshots | the 447 step screenshots were viewed by nobody except a handful (profile 3, exports 16, this seat 5) |
| probes `keys` (K 63 steps, E1–E3, T), `keys2`, `floors` (92 houses, 318 storey views), `doors` (35 houses + 15 loads), `stuck` | — | own; scripts over all | — | logs full; floors: all 318 views by script; doors: `steps.jsonl` grep (trapdoor case) | `doors/A` step records were not re-processed by this seat (the log carries the counts) |
| `_measure/` scripts (7) and outputs (12) | — | own | — | outputs `identities.txt`, `floors-stats.txt`, `draw-scaling.txt`, `cost-summary.tsv`, `houses.tsv` read; scripts not read; `cost.tsv`, `classes-all.tsv`, `houses.json`, `floors.json`, `cost-first.tsv` not read | replaced by this seat's own re-derivations |
| `exports-2026-09-26/`: 12 JSON, 12 SVG, 12 PNG, `export-log.jsonl` (28), `determinism.json`, `probe-urlkey.jsonl`, `seeds.json`, `stats.py`, `stats.json`, `ui/` (5), `session/`, `session-ui/` | — | README cited | own (all) | 12 JSON by script; logs full; `seeds.json`; 1 UI image | SVG and PNG not re-checked by this seat; `stats.py` not read |
| `logs/`: `index.tsv`, `timeline.log`, 34 × `record.log` + `analyze.log`, 4 `reanalyze-*`, `run-*.sh/.out` | — | own | — | `index.tsv`, `timeline.log`, `run-captures.sh` | the per-run logs were read only by the lane that wrote them |
| READMEs (`captures/dwellings/README.md`, exports README, `profiler/README.md`) | — | own | own | full | none |

**Coverage verdict.** Every Dwellings source on disk was read in full by at least one reader lane and by this seat.
The thin layers are the images (posts lane only; 24 devlog, 59 manor and 99 sibling-post images stand on one reader's
descriptions — three of which I re-viewed and found accurate), the capture and probe screenshots (measured by script,
looked at by almost nobody), and the SVG exports (one lane). No source was unread.

## 2. Contradictions between the lanes and inside each

| # | subject | A says | B says | verdict and evidence |
|---|---|---|---|---|
| D1 | **which connected part of a two-part plan is built** | creator 1.3.3 [STATED] "Dwellings will only process the largest of them"; `manor.md` §2.10, `dwellings-posts.md` §2(a) repeat it | `profile-dwellings.md` §2.3 correction: the part holding the last filled cell in row-major order, 14 loads | **RESOLVED for B** (the creator's sentence describes 1.3.3, not build 17195045). Re-read from `probe-keys.log` lines T: `B` w5 {0,1}+{3} → 1 cell, `71` w5 {0,1,2}+{4} → 1 cell, `9` w4 {0}+{3} → 1 cell, `F01` w4h3 {0–3}+{8} → 1 cell (the *smaller* part, 8 discriminating loads), `D1` → 3 cells, `B3` and `DC` → the 2×2; the rule "part whose first cell comes last" is refuted by `B3` (§3 R3). |
| D2 | **loops** | creator 2025-12-18 [STATED] "The generator does that, but quite rarely" + permalink `?seed=1341473638&tags=large,slab`; `dwellings-posts.md` §2(c), §2(n) (test case proposed) | `dwellings-exports.md` headline 5, §1.6, §3.7: "Every storey and every house is a tree [CONFIRMED] … no loops"; `profile-dwellings.md` headline 6: "the house is a tree rooted at the street" | **RECONCILED, OPEN in general.** The exports' fact is CONFIRMED for its 12 houses (my recount: E = V − 1 on 38/38 storeys, 12/12 house trees, §3 R13) but it is a sample of twelve against a creator's statement with a concrete example. Nobody opened the permalink (posts §6.1 #4). Ruling B4: trees are the norm; loops exist; our rung must not assume a tree. The next measurement (§6). |
| D3 | **roof model** | `dwellings-posts.md` §2(j) [INFERRED]: straight skeleton of each storey outline, levels painted bottom-up; "vs manor.md §2.10(6) hip roofs per block: refines it" | `profile-dwellings.md` §4.12 [INFERRED] "hipped roofs over each block's outline"; `dwellings-exports.md` §2.8 "Hipped roofs over each rectangular block" | **RESOLVED for A.** Roof faces on the R view = Σ over above-ground storeys of the outline's corner count in 82/92 walked houses; the 10 mismatches are exactly +1 and all are spiral-stair houses (the cone). A per-block roof would give 4 faces per block (e.g. 12 for 260926104's 3-block, 10-corner ground floor, which shows 10). Executed: `_critic/floors-geometry.mjs` (§3 R12). |
| D4 | **what the expensive stage is** | `profile-dwellings.md` headline 8, §4.7, §5.1: "Role assignment, not geometry, is the expensive part — median 0.9/2.3/6.0 ms of a 1.9/4.1/8.0 ms house"; `Room.fill` listed as a separate row (0.6/0.9/0.8) | the analyzer's call trees: `Room.fill` (furniture, `Clutter.*`, lights) is a child of `HouseType.assignRooms` | **CORRECTED (internal).** Nested in 38/38 profiled generations (`_critic/cost-nesting.mjs`). Enter medians: `House.assignRooms` 0.9/2.3/6.0 of which `Room.fill` 0.6/0.9/0.8 and `assignSet` 0.1/1.9/4.7; per-generation share of `Room.fill` in `assignRooms`: small 24–82 % (median 67 %), medium 6–65 %, large 7–80 % (median 15 %). The §5.1 rows double count; the validation proper is `assignSet`, dominant only for large houses. Ruling B2. |
| D5 | **door pricing identity** | `profile-dwellings.md` §4.5, `_measure/identities.txt`: "`Door.getPrice` = 2 × `Door.new` (96/96) — every candidate door is priced twice" | recount: `getPrice`/`Door.new` = 3.0–7.1, never 2 (0/96) | **REJECTED.** `_critic/calls-identities.mjs`. The identities file's own line is garbled ("… (Door.getPrice/Door.new)"), which suggests a copy error rather than a measurement. `Door.new = Room.link` (96/96) stands. |
| D6 | **the `square` tag** | `dwellings-posts.md` §2(a), §2(l) [INFERRED] "very probably a square ground plan" | build text (`probe-tags.log`) "Rectangular ground plan."; `profile-dwellings.md` §4.2 "a single rectangle" | **RESOLVED for B.** `Polyomino.create` = 0 in 5/5; ground floors 7×3, 4×6, 4×6, 4×5, 4×4 — rectangles, only 1/5 square (§3 R11). |
| D7 | **basement size** | creator 1.1.0 [STATED] "almost always smaller than the shape of the ground floor"; `dwellings-posts.md` §2(b) "lies inside the ground-floor footprint in all five basement images" | `profile-dwellings.md` §4.3/§7: small houses B/GF = 1.00 (6/6), "[INFERRED] a cap of roughly 15 cells"; exports: small basements 13/13, 15/15, 11/11; a 19-cell basement under a 19-cell ground floor (row 6) | **RECONCILED by size, the cap CORRECTED.** Basement cells in the walked set: small 11–15 (mean 12.8), medium 9–20 (14.6), large 11–17 (14.3) — a size target of roughly 9–20 cells (mean ≈ 14) that equals the ground floor whenever the ground floor is that small; 17–20-cell basements refute a 15-cell cap. Ruling B6. |
| D8 | **basement probability** | creator 2024-09-27 [STATED] "for a single-storey building the probability is 50%"; 1.1.0 "more likely to happen with high ones"; `dwellings-posts.md` §2(b) repeats | measured: 11/14 independent single-storey draws and 18/23 multi-storey draws have a basement (`_critic/stairwell-basement.mjs`) | **RESOLVED against the 2024 statement for this build (PLAUSIBLE: n = 14, one-sided p ≈ 0.03 under 0.5).** The rate is ≈ 0.78 and not visibly storey-dependent. The profile lane's 67/75/89 % per size band counts duplicate houses (D22) and should not be quoted as probabilities. |
| D9 | **bathrooms attached to bedrooms** | creator 1.3.0 [STATED] "Bathrooms often get attached to bedrooms now"; `dwellings-posts.md` §2(e) "the only adjacency preference stated"; `profile-dwellings.md` headline 7 "one adjacency hint" (via posts) | the 12 exported houses: 0 of 12 bathrooms share a door with a bedroom, 0 of 12 share even a wall (`_critic/exports-graph.py`) | **RESOLVED against the statement for this build (12 houses, 12 bathrooms, 13 bedrooms).** Bedrooms are never on the ground floor (13/13) while 4 bathrooms are; the two roles sit at the same depth (median 6) but not next to each other. Ruling B7. |
| D10 | **stairwell without the tag** | `profile-dwellings.md` §4.6: "`getStairCells` = 0 in 4/5 `medium,stairwell` houses and in the three untagged houses that rolled it" | recount: `Specs.rollStairwell` ran in 30 of the 42 multi-storey non-spiral houses (5 tagged, 25 untagged); `getStairCells` = 0 in 27 of those 30 (4/5 tagged, 23/25 untagged); by independent seed/tag draws 9 of 21 untagged multi-storey draws took the stairwell path and 7 ended stacked | **CORRECTED.** The stairwell is a coin the generator tosses itself for roughly half of multi-storey houses; the tag forces it. The exports lane saw the result without naming it ("rows 4 and 11 stack their shafts at one cell anyway"; row 12 too): 260926104, 260926111 and 260926112 are exactly the untagged rolled houses of the export-tied set. Ruling B8. |
| D11 | **effect of `hallways`** | `dwellings-exports.md` §3.6: "does not show as a larger corridor share … with n = 2 the effect is not established" | `profile-dwellings.md` §4.4: rooms 14/21/10/28/14 against 8/8/9/16/10 on the same five seeds, doors unchanged | **RECONCILED — B's paired measurement wins; A's metric was wrong for the question.** `hallways` adds unnamed passages and nooks joined by openings, which the exports' "named `Corridor` share" does not count. Recount of the pairs (`calls-identities.out.txt`): rooms +6/+13/+1/+12/+4, `Door.new` +1/+3/−1/0/−3. |
| D12 | **why the canvas lighting varies between loads** | `dwellings-exports.md` §5.4 PLAUSIBLE "timing or unseeded randomness in the view, not the model" | `profile-dwellings.md` §1 correction: `Math.random` is called only by `Light.getSkele`; every painted layer identical in 15 loads; screenshots differ | **RESOLVED for B.** The recorded stacks (`_probes/floors/steps/steps.jsonl`, `doors/A/steps/steps.jsonl` `rstacks`) show every in-generation `Math.random` under `getSkele ← inTheCentre ← defaultLight` (plus one `getLocalStorage` call at start-up); the model, JSON and SVG are byte-stable (§3 R4, R6). |
| D13 | **what a settlement generator can pass** | `dwellings-posts.md` headline 2, §2(a): "Storeys and function are never passed [INFERRED]"; "the only documented URL fields are `seed` and `tags`" | `profile-dwellings.md` §2.1: URL keys `seed`, `tags`, `floors`, `plan`, `w`, `h`, `entrance`, rewritten after every generation | **CORRECTED in part.** `floors` is a live URL key, so storeys *can* be passed; whether MFCG/VG/NG/UP send it is unmeasured by every lane (§6 G1). The posts lane's [INFERRED] "a grid-cell list next to seed and tags" is confirmed in kind (a hex bitmask, §3 R1). |
| D14 | **`organic` / `mechanical`** | `dwellings-posts.md` §2(c)/§2(l) [INFERRED]: organic = bent cuts, mechanical = straight cuts | build text: mechanical "Inner walls bisect the outer shape", organic "Inner walls follow the outer shape"; `profile-dwellings.md` §4.4 same reading | **RECONCILED — the build's own one-line descriptions are the authority** (ruling B11); the posts lane's version is a paraphrase of the same idea, not a contradiction. Measured effect (R9): partition counts change, room counts barely, the ground shape never. |
| D15 | **`Drafter.fromCode`** | `profile-dwellings.md` §4.1: `pickShape` uses "the URL plan via `Drafter.fromCode`, else `Drafter.getShape` → `getPolyomino`" | `fromCode` = 1 in 96/96 houses, with or without a URL plan | **CORRECTED.** The random shape also passes through `fromCode` — [INFERRED] the drafted polyomino is encoded as a plan code and decoded by the same path a URL plan takes, which is why a URL plan and a drawn plan behave identically downstream (size tags ignored, §2.1). |
| D16 | **`new Date()` per generation** | `profile-dwellings.md` §1: "Exactly one `new Date()` per generation … on Enter from `HouseType.assignSet`" | its own `probe-seed.log` session B: `newDate=0` on both Enter steps (A: 1 and 1) | **CORRECTED to "0–1"** — harmless, since the Enter chain is deterministic regardless (R5). |
| D17 | **"must-haves"** | `profile-dwellings.md` headline 7: "must-haves `living room, bathroom, bedroom` + one special … rule-exact in 92/92" | `dwellings-exports.md` §3.12: bathroom realised in 8/12, bedroom in 7/12, the special in 9/12 | **WORDING.** Both are right about the data (the list rule holds 96/96 in my recount, R8); "must-have" describes the list's priority, not a guarantee — the creator's own words ("it often fails"). Ruling B15. |
| D18 | **clean-room and colour values** | `dwellings-posts.md` §5: hex values "deliberately not reproduced here (clean-room)" | `profile-dwellings.md` §2.4 prints the nine default hex colours; `dwellings-exports.md` describes colours | **Policy ruling B13:** measured values are evidence and may be recorded; reuse in the product is what the rule forbids. The posts lane's abstention was unnecessary but harmless. |
| D19 | **`Math.random` calls per generation** | `profile-dwellings.md` §1: "0–20 times per generation" | the draw records: 25 (`23-11-32`), 27, 38 (`doors` probe) | **CORRECTED** to 0–38 observed (one per lit room through `getSkele`). |
| D20 | **size bands** | `dwellings-exports.md` §3.1: 11–15 / 19–24 / 29–33 cells | `profile-dwellings.md` §7: 11–16 / 16–24 / 27–33 | **Consistent** (subset of the same draws); the profile's 16 is one small house and one medium house at the shared boundary — a designer should not treat 16 as either. |
| D21 | **dates of the itch stubs** | `dwellings-posts.md` §1: stub dates are scrape artefacts; Taverns `1643499` "≈ 2026-08-28" [INFERRED] | the stub says "29 May 2026" and its comment is dated 2026-08-29 | **Consistent** — the lane's reasoning is right (the 1.1.0 stub says "28 August 2026" for a 2026-05-29 release, proving the stub dates meaningless); keep "between 2026-08-28 and 08-29". |
| D22 | **the "75 medium houses" of `profile-dwellings.md` §7** | presented as 75 houses | `blank`, `transparent` and `generic` reproduce the untagged `medium` partition of the same seed exactly (rooms, `divideArea`, doors identical, R9), `slab` too for the three seeds without upper floors | **CORRECTED (internal):** at least 18 of the 75 are geometric duplicates; the medium room statistics are weighted toward five seeds. They still agree with the exports' independent twelve (R10), so the numbers survive, the n does not. Ruling B14. |

**Not contradictions, kept as ladders:** tags 12 (2023, `_comments-images/06`: `1/2/3 floors`, `basement`, `blank`, `large`, `medium`, `slab`, `small`, `spiral`, `square`, `transparent`) → 16 (build: `1–3 floors` and `regular`/`spacious` gone; `low`, `tall`, `organic`, `mechanical`, `hallways`, `stairwell`, `generic` added; verified on both images); floors `1–3` → `low`/`tall`/`floors=1–8` (URL accepts 12); labels outside → inside; spiral-only stairs → regular + spiral + trapdoor + stairwell; furniture none → statues → abstract; roofs as outlines → tiled skeleton roofs.

## 3. Spot re-derivations from the raw captures and posts

All executed by this seat; scripts and outputs in `captures/dwellings/_critic/` (`permalink-decode.mjs`,
`floors-geometry.mjs`, `exports-graph.py`, `calls-identities.mjs`, `cost-nesting.mjs`, `crosscheck-json-paths.mjs`,
`stairwell-basement.mjs`, each with a `.out.txt`).

| # | claim (file §) | what I executed | result | verdict |
|---|---|---|---|---|
| R1 | **plan permalink encoding** — hex bitmask, row-major, four cells per digit, LSB first (`profile` §2.3) | decoded `000000E10F0060070830C1000000000` (w = h = 11) → 19 cells rows 2–7 cols 3–7 in the stated two-block shape; `000000000008F0C70E30F1000000000` → a 5 × 4 rectangle rows 4–7 cols 3–7; `F1` w4h2 → the 4-cell bar plus one cell below-left; compared with `blueprint/steps/015-bp-X.png` and `plan/steps/026-url-L-4x2-editor.png` by eye (node columns 3–8 / rows 4–8; the L) | all three match the screenshots and the reader's descriptions | **CONFIRMED** |
| R2 | **entrance code** — `y₁x₁y₂x₂` in base-12 digits, the boundary edge taken clockwise with the interior on the right (`profile` §2.3) | eight codes decoded with an independent right-hand rule: `6878`, `5B6B`, `6A69`, `5868`, `6353`, `2120` → boundary edges with the filled cell on the right; `1110`, `1202` (and `1011` by hand) → interior edges | matches the reader's examples; the interior codes are the ones the build ignored (`probe-plan3.log`; `009-B_yw1-1110-editor.png` shows no arrow, `026` with no code shows the house's own entrance as an arrow) | **CONFIRMED** (with the note that the editor displays the current entrance when no code is given) |
| R3 | **connected part = the one holding the last filled cell** (`profile` §2.3 correction) | re-read `probe-keys.log` T lines (7 plans × `medium`/`small`, GF areas 1.34/3.34/4.34) against the decoded cell sets | 7/7 fit; 4 plans refute "largest", 1 refutes "part whose first cell comes last" | **CONFIRMED** (D1) |
| R4 | **determinism of the model** — same seed + tags ⇒ same house (`profile` §1); JSON/SVG byte-identical (`exports` §5.3) | `probe-seed.log`: `?seed=12345&tags=medium` in two fresh browsers and a reload → png `1a036faa19`, draw `135f3b60c7`, paths `fc54d6620d` identical; `determinism.json`: row 1 JSON `6ad51008…` twice, SVG `c37b0ac3…` twice, row 2 `959ca6c4…`/`5f376b39…` twice; **cross-lane:** room cell sets of all 38 storeys of the 12 export-tied houses from the walker's vertex records equal the JSON rooms after translation, and the 12 GF sets from the capture draw passes (a third browser session) equal the JSON too (`crosscheck-json-paths.mjs`, 38/38 and 12/12) | three independent sessions, one geometry | **CONFIRMED** — the strongest single check in this review |
| R5 | **Enter chain deterministic per load and key history** (`profile` §3.4) | `probe-keys.log` E1–E3: three fresh browsers, one with a 7 s wait → `1189382180 large,mechanical` then `1291276000 small,organic`, identical draw hashes for Enter, Shift+Enter, Ctrl+Enter; `probe-keys2.log`: nine histories give nine different successors; `probe-params.log` #5: the dialog's Generate after the same load → the same `1189382180` | reproduces | **CONFIRMED** |
| R6 | **only the light gradients vary between loads** (`profile` §1 correction, §4.11) | `probe-doors.log` B: `seed=260926102&tags=small,tall` three loads → pngs `d25d089d`, `26a0797e`, `a66cd5ea`, layers `same=19`, `CHANGED=[]`; `seed=12345&tags=medium` png identical thrice; `rstacks` in `floors/steps/steps.jsonl` and `doors/A/steps/steps.jsonl`: every in-generation `Math.random` under `getSkele ← inTheCentre ← defaultLight` | reproduces; caller identified from V8 stacks, not from the bundle | **CONFIRMED** |
| R7 | **call-count identities** (`profile` §3.3, §4.3, §4.5–4.7, `identities.txt`) | over 96 coverage houses with storeys from the draw texts: `Plan.new = House.build = mergeCorridors = connectRooms = wallDoors` 96/96; `Plan.new = storeys incl. basement + 1 when a basement exists` 92/92 (the no-extra alternative fails 64/92); `sortRooms = storeys` 92/92; `Staircase.new = 2 × connectFloors` 96/96; no spiral ⇒ `connectFloors = storeys − 1` 82/82; spiral ⇒ `findSpiral = storeys above ground` and `connectFloors = [basement]` 10/10; `rollSpiral ran ⇔ findSpiral > 0` 96/96; `Room.new = addRoom = PropSet.new` 96/96; `Door.new = Room.link` 96/96; `assignSet = 2`, `spawnChimneys = 1`, `House.new = Specs.process = Namer.get = HouseType.assignRooms = 1` 96/96; `Polyomino.create` ≥ 1 without a plan and 0 with `square` 96/96; `Random.reset` 4 on a load and 3 on Enter 96/96 | all reproduce except `Door.getPrice = 2 × Door.new` (0/96, ratios 3.0–7.1); new: `Drafter.fromCode = 1` in 96/96 | **CONFIRMED** (13 identities), **REJECTED** (1), one addition (D15) |
| R8 | **the two printed programmes** (`profile` §4.7) | list 1 = `living room, bathroom, bedroom` + one special (none with `generic`): 96/96; list 2 = `kitchen, storage, hall, gallery` + 0–2 specials + one `bedroom` per upper storey + `bathroom`, `attic` iff ≥ 1 upper storey + `cellar` iff basement: 92/92 | reproduces, including `floors=8` → 7 bedrooms and `floors=12` → 11 (`probe-urltags.log`) | **CONFIRMED** |
| R9 | **tag effects, paired by seed** (`profile` §4.1–4.8) | seeds 260926501–505 × 14 families: `Polyomino.create/rect` identical across all 13 non-`square` families of a seed (11/50, 3/13, 5/23, 2/9, 4/19) and 0/0 with `square`; `blank`, `transparent`, `generic` leave storeys, rooms, `divideArea`, `Door.new` identical and change only windows (`blank` 17/20/16/14/19 → 9/5/8/3/7; `transparent` → 17/23/18/19/21); `slab` identical except upper-storey partitions (503: 28→21, 504: 101→78); `hallways` rooms 8/8/9/16/10 → 14/21/10/28/14; `tall` → 4 storeys above ground 5/5 with a spiral in 3/5; `spiral` → `findSpiral` = storeys 5/5 and one storey added where the house had one; `basement` → B in 5/5; `stairwell` → `getStairCells` = 0 in 4/5 and a storey added for 501 | every figure the reader quotes reproduces | **CONFIRMED** |
| R10 | **geometry statistics** (`profile` §7) | 92 houses, 318 storey views from the vertex records: GF cells 11–16 (13.38) / 16–24 (21.76) / 27–33 (30.89); rooms per GF 2.25 / 4.52 / 6.00; room area mean 6.11 / 4.85 / 5.09, median 6/5/5; rectangular 0.51 / 0.64 / 0.66; no-2×2 rooms 0.14 / 0.34 / 0.32 of rooms, 0.03 / 0.13 / 0.17 of area; upper/GF 0.57 / 0.73 / 0.72; B/GF 1.00 / 0.68 / 0.46; basements in 0.75 / 0.67 / 0.89; windows per exterior cell edge 0.59 / 0.68 / 0.67, module 0.32; small Floor-colour fills GF = 1 in 92/92, B = 0 in 64/64, upper 1 in 84 and 2 in 2 | identical to the reader's table to two decimals (my corner counts differ only in definition) | **CONFIRMED** — the 2 two-fill views identified (R17) |
| R11 | **`square` means a rectangle** (build text; `posts` §2(l) inferred "square") | ground floors of the five `medium,square` houses: 21 cells 7×3, 24 cells 4×6, 24 cells 4×6, 20 cells 4×5, 16 cells 4×4 | rectangles 5/5, square 1/5 | **CORRECTED** (posts) / **CONFIRMED** (profile) |
| R12 | **roof = straight skeleton of the whole storey outline** (`posts` §2(j)) vs **per block** (`profile` §4.12, `exports` §2.8) | R view of every walked house: fills in the four roof shades counted against Σ (outline corners) over the above-ground storeys | equal in 82/92; the other 10 are +1 (the spiral cone) and are exactly the spiral houses; e.g. 260926104: 10-corner, 3-block GF → 10 faces (per block: 12) | **CONFIRMED** for posts; profile/exports **CORRECTED** (D3) |
| R13 | **the JSON room graph** (`exports` §1, §3) | standard-library re-implementation: grid convention 0 violations (transposed reading 342 = 264 + 68 + 10, the reader's exact figures); rooms partition each storey, all 4-connected; 95 doors = 52 `REGULAR` / 34 absent / 9 `NULL`; 375 windows all exterior, 0 in basements; 12 exits on GF exterior edges (Hall 6, Living room 4, Kitchen 1, Room 1); 19/19 stair pairs at one cell, 15 U / 4 L; 2 spiral houses, 7 spiral links; E = V − 1 and connected on 38/38 storeys; 12/12 houses one tree with exit, stairs and spiral; doors per room 0:5, 1:82, 2:35, 3:7, 4:3, 5:1 (62 % one door); 81 rectangles; 17 unnamed rooms; bedrooms on levels 1, 2, 4, 5 only (13/13 upstairs); kitchens and halls on level 0 (6/6 each); role area medians bathroom 2, storage 3, corridor 4, kitchen 4.5, bedroom 6, living room 7.5, cellar 8.5 | every figure reproduces; new: 0/12 bathrooms share a door or a wall with a bedroom (D9); the leaves share (38 %) was not re-derived | **CONFIRMED** |
| R14 | **stage attribution** (`profile` §3.1) | the analyzer's trees of `23-36-48` gen-0 and `23-37-10` gen-1: `Main.new → House.reset → House.new → {Specs.process; House.build → Plan.new → divideArea (recursive) → connectRooms; House.assignRooms → HouseType.assignRooms → {assignSet, Room.fill → <Type>.fill → Clutter.new/fill → spawn → group → push/getForce}; Dimensions.random; Namer.get; Blueprint.updateURL}`; Enter: `handleKeyEvent → PlanScene.reset → DwellingScene.reset → Blueprint.random / House.reset` | the order and nesting the reader draws are right except that `Room.fill` hangs under `HouseType.assignRooms` (D4); a `Clutter.getForce` step (force-based packing, [NAMED-ONLY]) is visible in the furniture path | **CONFIRMED with one correction** |
| R15 | **cost medians** (`profile` §5.1) | 38 valid generations (11 empty ones of `23-54-54` excluded as the reader did): Enter small/medium/large `House.new` 1.9/4.1/8.0, `House.assignRooms` 0.9/2.3/6.0, `House.build` 0.3/1.0/0.8, `divideArea` ≤ 0.5, key handler 3.4/6.5/11.1, `__onLimeRender` 4.9/7.2/6.9, busy 93.5/96/88.5 ms; reload 3.6/7.9/18.3 (the reader: 5.3 median over all six); cold large 32.0 | numbers reproduce; interpretation corrected (`assignSet` 0.1/1.9/4.7, `Room.fill` nested 0.6/0.9/0.8) | **CONFIRMED / CORRECTED** (D4) |
| R16 | **Door objects vs exported doors** (`profile` §4.5 [INFERRED] "cost-driven connection … `Room.unlink` removes 0–15 links") | `Door.new − Room.unlink` against the JSON door count of the same house: equal in 8/12 (101, 102, 103, 105, 106, 107, 109, 112); 111: equals `REGULAR` + absent (16) with 4 `NULL` on top; 104: 8 vs 10; 108: 4 vs 5; 110: 13 vs 17; exported doors = rooms − storeys in 12/12 | the Door-object model is not the exported edge set; some openings (the `NULL` stair-shaft sides, some type-less openings) are not `Door` objects | **OPEN** (new; the reader's inference stays PLAUSIBLE) |
| R17 | **the trapdoor** (`profile` §4.6: seen once in 96 houses; §4.5 "84 views one small fill, 2 views two") | the two two-fill views are `142-s260926505-1F` and `143-s260926505-2F` of the one walked house with the console trapdoor line (1 line in the walker's session console): each has the 0.34-cell entrance underlay plus a 0.09-cell four-vertex Floor-colour square — the trapdoor glyph, drawn on both storeys it joins (1F–2F); `doors/A` step 180 (`260926504 large,hallways`, trapdoor line) shows the same glyph counted as a "threshold" on the basement (B thresholds 1, stair fills 0) | identified; the entrance heuristic (small Floor-colour fill) cannot tell a trapdoor from a threshold, so "exactly one entrance" rests on 92 houses with one trapdoor between upper storeys | **CONFIRMED and sharpened** |
| R18 | **the 2023 tags dialog** (`posts` §2(l), §2(g)) | `_comments-images/06.png` viewed: 12 tags (`1/2/3 floors`, `basement`, `blank`, `large`, `medium`, `slab`, `small`, `spiral`, `square`, `transparent`), no `regular`, `organic`, `mechanical`; toast "As many windows as possible." | the posts lane's count and its inferences `transparent`/`blank`/`slab` are confirmed by the build's own descriptions (`probe-tags.log`) | **CONFIRMED** |
| R19 | **the entrance sits on the longest straight wall in `112799146/03`** (`posts` §2(f) evidence check) | image viewed: the blueprint's bottom row is 5 cells, its height 6 with notched sides; the plan's entrance is on that bottom run | the reader's reading is accurate (the stated "avoid the longest wall" rule is at least not a ban) | **CONFIRMED** |
| R20 | **complaint counts** (`posts` §4.2) | `_comments.md` header: 83 posts = 40 openers + 43 replies, 31 by the creator (⇒ 52 user posts); re-counted "no editing" (bklick, Asgarus, trekadam30, oxzidized, matthewfenn, Felnors, Draco18s ×2 = 8 posts, 7 users) and "missing bedrooms or bathrooms" (sitebender, Jellyfish, Gilbals = 3) | reproduce | **CONFIRMED** (2 of 17 rows) |
| R21 | **build identity** (`profile` §1) | `resolve-build.log` and `23-11-32/coverage/network/index.jsonl`: `Dwellings.js` 1 368 261 bytes (340 814 encoded), `index.html` 2 162, Last-Modified Wed 24 Jun 2026; fonts Share Tech 22 304 / 21 344 | reproduces | **CONFIRMED** |
| R22 | **basement size rule** (`profile` §4.3 "[INFERRED] a cap of roughly 15 cells") | basement cells from the walker: small 11–15, medium 9–20 (mean 14.6), large 11–17 (14.3) | a target, not a cap (D7) | **CORRECTED** |
| R23 | **stairwell frequency** (`profile` §4.6 "three untagged houses") | `rollStairwell` and `getStairCells` over the 42 multi-storey non-spiral houses | 25 untagged houses rolled it, 23 stacked; 9/21 independent draws (D10) | **CORRECTED** |
| R24 | **basement probability** (creator 50 % single-storey; `posts` §2(b)) | 14 independent single-storey draws: 11 with a basement; 23 multi-storey: 18 | ≈ 0.78, not storey-dependent (D8) | **CORRECTED** (PLAUSIBLE at this n) |
| R25 | **the URL surface** (`profile` §2.1) | `probe-urltags.log`: `floors=0` dropped, `floors=12` honoured, unknown tags echoed and inert (`foo`, `spacious`, `huge`, `tiny` draw hash = empty tags), pairs resolved to their first member by draw hash (`small,large` = `small`, `low,tall` = `low`, `organic,mechanical` = `mechanical`, `blank,transparent` = `blank`, `spiral,stairwell` = `spiral`); `probe-urlkey.jsonl`: `export=json` ignored and dropped | reproduces | **CONFIRMED** |

**Quotation checks (posts lane).** 62 [STATED] sentences located by grep at their cited file and line (`49191011` L17 "recursive
bisection with a bend"; `86093774` L21/L23; `86436420` L25/L28; `86635425` L30/L32; `86852618` L21/L29/L35; `88328982` L31/L41/L68;
`96522502` L41/L42/L50/L61/L98; `97493516` L27; `111909860` L23; `112799146` L23/L36; `113347826` L18; `118772106` L27;
`120395768` L33/L35; `143036785` L35/L43; `143565705` L29/L38; `145140009` L25; `158074424` L17/L21/L95; `159559624` L17/L21/L58;
`_comments.md` L11/L23/L50/L73/L79/L81/L101/L127/L133/L144/L145/L173/L177; taverns `_comments.md` L15/L42; devlog `567246` L52;
`116745476` L39; `117634240` L21; `141879891` L31; `102377277` L74; `60165082` L37; `145997186` body): **61 SUPPORTED, 0
UNSUPPORTED, 1 WORDING** — the "reroll individual floors … not to difficult" reply (2026-09-16) lives in devlog `567246`'s
own thread, not in `_comments.md`; the lane's citation "(itch 2026-09-16)" is correct but a reader would look in the wrong file.

## 4. Thin spots — claims resting on one seed, one image or a name

1. **Sample sizes behind every "always/never".** The exports' twelve houses (3 small, 5 medium, 4 large); the walked
   set's 8 small and 9 large; the medium set's 75 of which ≥ 18 are duplicates (D22) and 60 come from five seeds. The
   role facts of `dwellings-exports.md` §3.4 (kitchens and halls always on the ground floor, attics only on top,
   bedrooms never on the ground floor) are consistent with the validator names the profile lane saw
   (`aboveGround`, `underground`, `topFloor`) but rest on 6, 1 and 13 rooms.
2. **`hallways`, `organic`, `mechanical`:** the exports' n = 2/3 per tag says nothing (D11); the profile's paired
   five seeds are the evidence and they are five.
3. **The trapdoor:** one walked house and one doors-probe house; its JSON representation is unknown (no exported
   house has one) and the entrance heuristic counts it as a threshold (R17).
4. **`getStairCells` semantics:** the reader's "0 ⇔ stacked" fits 27/30 rolled houses, but 4 single-storey houses
   (one storey plus a basement) also show 0 with no roll at all, and 3 rolled houses show 2; the count is a
   fingerprint, not a rule.
5. **The basement probability** (R24) is 11/14 — enough to doubt "50 %", not enough to state a value beyond
   "about three quarters".
6. **`new Date()`** (D16): one session says 1 per Enter, the other 0.
7. **The posts lane's measurements from single images:** the entrance-wall reading (one image, confirmed by me),
   wall thicknesses (one image), the stair-cell alignment (three images, now superseded by 19/19 JSON pairs), the
   implied cell size (users' guesses plus glyph proportions); its §4.3 failure modes are single user screenshots.
8. **`profile-dwellings.md` §4.2's rejection-loop story** ("seed 501 accepted the 11th candidate as small and as
   medium, the 9th as large") is one seed; the acceptance test itself is unobserved. Its §2.2 conflict order is one
   seed with five pairs.
9. **Cold-load timings** are n = 1–2 per size; the reload set n = 3 per size; all on one M1 with another lane's
   browser active for part of the window (`timeline.log`).
10. **The Door-object model** (R16) is inferred from counts that do not close.
11. **Unexecuted probes the posts lane asked for** (§6.1): #2 and #12 (what MFCG, VG, NG, UP and Tiny Pubs send on
    "Open in Dwellings" / W) and #4 (the creator's loop permalink) were done by no lane — the two facts that matter
    most for item 28's hand-off and for the tree ruling (§6).
12. **The SVG structure** (`exports` §2) was re-derived by one lane and only cross-checked here through the JSON.
13. **The elevation, the Gothic and Tavern room sets, the `Walls` styles beyond keys 6–0, `Roofs > Simple/Hidden`,
    Shade/Fade/Shrink:** measured by nobody beyond one house's draw record; the posts lane's §2(i)–(j) descriptions
    of them stand on images.
14. **`profile-dwellings.md` §3.3's "never executed" inventory** (export classes, elevation scenes, `PoissonDisk`,
    `Stopwatch`) is a name list from the analyzer's class table; correct as a list of names, uninformative about
    behaviour.
15. **Complaint counts** (`posts` §4.2): one reader's classification of 83 posts; two rows re-counted here.

## 5. Binding rulings (supersede the readers; later seats cite these)

* **B1 — Roofs.** Dwellings draws, for every above-ground storey, the straight skeleton of that storey's *whole*
  outline (one hip face per outline edge; the spiral shaft adds a cone) and paints storeys bottom-up with lower
  levels faded. Supersedes `profile-dwellings.md` §4.12 and `dwellings-exports.md` §2.8 ("per block"); upholds
  `dwellings-posts.md` §2(j); the creator's straight-skeleton implementation (`102377277`) is the plausible source.
  Grade: [SHOWN] (R12).
* **B2 — Cost model.** `House.assignRooms` includes furnishing. Stage costs to carry: validation (`assignSet` ×2)
  median 0.1 / 1.9 / 4.7 ms; furnishing and lights (`Room.fill`) 0.6 / 0.9 / 0.8 ms; partition and doors
  (`House.build`) 0.3 / 1.0 / 0.8 ms; whole model 1.9 / 4.1 / 8.0 ms (small / medium / large, Enter). "Role
  assignment is the expensive part" holds only for large houses; for small houses furnishing is. Supersedes
  `profile-dwellings.md` headline 8 and the stage table's reading of §5.1.
* **B3 — Doors.** Strike "`Door.getPrice = 2 × Door.new`". Keep `Door.new = Room.link` and `Room.unlink` 0–15 as
  counts; the exported door set equals rooms − storeys per house (a spanning tree) and is not the surviving `Door`
  objects (R16). The connection algorithm remains [INFERRED] "a priced spanning connection of the rooms".
* **B4 — Topology.** In the twelve exported houses every storey's door graph and every house graph is a tree
  (CONFIRMED). The creator states loops occur rarely and gives one permalink [STATED]. Cite: "trees in 12/12; loops
  rare and unverified". Our rung may not assume a tree and should decide loops explicitly (item 28's acceptance
  tests, `posts` headline 6).
* **B5 — `square`.** The tag requests a single rectangle (`Polyomino.create` = 0), squareness is incidental (1/5).
* **B6 — Basements.** The basement is a target of roughly 9–20 cells (mean ≈ 14) placed inside the ground floor; it
  equals the ground floor when the ground floor is that small (small houses 6/6, the three exported ones among them). The probability of a basement is
  ≈ 0.78 in this build regardless of storey count (n = 37 independent draws); the creator's 2023 "more likely with
  high ones" and 2024 "50 % for single-storey" are version statements, not rules of this build. `basement` forces
  one; no tag prevents one.
* **B7 — Bathroom–bedroom attachment.** Not present in this build's output (0/12 bathrooms share a door or wall with
  a bedroom). The 1.3.0 sentence is not a rule to carry; the room-type record's "adjacency hint" field (`posts`
  headline 5, `profile` headline 7) should be dropped from the starter schema unless re-observed.
* **B8 — Stairwell.** Stacked stairs are drawn by the generator itself for about half of multi-storey houses
  (9/21 independent untagged draws rolled the stairwell, 7 ended stacked); the tag forces it (4/5). Row-major
  evidence: the untagged export houses 260926104, 260926111, 260926112 are rolled stairwells. Supersedes
  `profile-dwellings.md` §4.6's "three untagged houses".
* **B9 — Connected part.** A multi-part plan builds the part containing the last filled cell in row-major order
  (profile's correction upheld; the creator's "largest" describes 1.3.3). Integrators must pass one connected
  footprint; holes are filled.
* **B10 — URL surface.** `seed`, `tags`, `floors` (1–8 in the dialog, ≤ 12 accepted), `plan` + `w` + `h` (≤ 11 × 11,
  hex bitmask R1), `entrance` (R2); rewritten after every generation; re-rolls (Shift+Enter, Ctrl+Enter) are not
  recorded. Storeys *can* be passed; what the settlement generators pass is unmeasured (G1).
* **B11 — Tag semantics.** The build's one-line descriptions (`probe-tags.log`) are the authority: small / medium /
  large ground floor; `square` rectangular plan; `low` / `tall` floors; `slab` all floors the same shape;
  `mechanical` inner walls bisect the outer shape / `organic` follow it; `hallways` more corridors and nooks;
  `spiral` spiral staircase; `stairwell` all staircases one above the other; `basement`; `blank` / `transparent` as
  few / as many windows as possible; `generic` no special rooms. The posts lane's inferences for `transparent`,
  `blank`, `slab` are upheld, `square` corrected (B5), `organic`/`mechanical` replaced by the build's wording.
  Conflicting pairs resolve to the first of size → height → partition → windows → stairs.
* **B12 — Determinism.** The model is deterministic per permalink across browser sessions (three independent
  sessions agree on every room cell of 38 storeys, R4); the JSON and SVG writers are byte-stable; only the light
  gradients carry an unseeded jitter (`Light.getSkele`). Enter is a deterministic function of the loaded state and
  the key history; the next seed depends on that history (R5). A settlement generator must store the full
  parameter set and treat Shift+Enter / Ctrl+Enter houses as unreproducible.
* **B13 — Clean-room.** Measured palette values and layer parameters are evidence and may be recorded in findings;
  reuse in the product is what is forbidden. The posts lane's withholding of hex values was unnecessary.
* **B14 — Sample accounting.** `profile-dwellings.md` §7's "75 medium houses" are ≤ 57 distinct geometries (the
  `blank`, `transparent`, `generic` families and `slab` without upper floors duplicate the untagged `medium` houses
  of their seeds); its per-band basement shares are not probabilities (B6 gives the estimate).
* **B15 — Programme wording.** The first printed list (`living room, bathroom, bedroom, <special>`) is a priority
  order the assignment "tries harder" on, not a guarantee: bathroom realised in 8/12, bedroom in 7/12, the special
  in 9/12 exported houses; small single-storey houses often have neither bathroom nor kitchen. Cite this in place
  of "must-haves".
* **B16 — Trapdoor.** A ~0.3 × 0.3-cell Floor-colour square drawn on both storeys it joins, produced when no cell is
  free for a staircase; seen between upper storeys (1F–2F) and between basement and ground floor; frequency ≈ 1 in
  90 houses; its JSON form is unknown (R17).
* **B17 — Everything else in the three files that a designer would copy** — the pipeline order and its once-per-house
  stages (R7, R14), the programme rule (R8), the paired tag effects (R9), the geometry statistics (R10), the JSON
  schema and its graph facts (R13), the permalink encodings (R1–R2), the shortcuts' re-roll contract (`profile`
  §3.4, upheld by `probe-keys.log` #2–#6: footprint and entrance identical under Shift+Enter, walls and stairs
  identical under Ctrl+Enter) — is CONFIRMED and may be cited from the readers with this file's corrections.

## 6. Remaining gaps and the single next measurement

1. **What "Open in Dwellings" actually sends** (posts §6.1 #2, #12; D13). No lane opened a building from MFCG, VG,
   NG, UP or Tiny Pubs. The receiving format is now fully decoded (`plan`/`w`/`h`/`entrance`/`floors`), so one
   click per generator and a read of the resulting URL would give item 28 its real precedent: whether the source
   passes only the rasterised footprint, whether it passes `floors` or `entrance`, and how a rotated or non-orthogonal
   polygon is rasterised. This needs no export and no approval.
2. **Loops** (D2, B4): the creator's permalink `?seed=1341473638&tags=large,slab` exported as JSON (owner approval,
   as for the twelve) would show a storey with E ≥ V if the build still reproduces the 2025-12 house — and test seed
   stability across versions at the same time. A coverage capture alone cannot decide it (R16: `Door` counts do not
   equal exported doors).
3. **The partition's cut rule, the validators' scoring, the Door-object model, the stairwell roll's semantics, the
   basement's cell choice, the upper-storey setback rule** — unchanged from `profile-dwellings.md` §8; the vertex
   records of 318 storeys are on disk for anyone fitting a notch-cut model.
4. **The elevation's link to the plan, the Gothic/Tavern JSON5 programmes, the roof options (Simple/Hidden,
   Shade/Fade/Shrink) and the size of the light jitter** — unmeasured.
5. **The trapdoor in JSON**, and whether an exported house can carry a `NULL` edge that is not a stair shaft.

**Single most valuable next measurement:** open one building each from Neighbourhood, MFCG and Village Generator
(and press W in Tiny Pubs) and record the Dwellings URL they produce, then decode it with
`captures/dwellings/_critic/permalink-decode.mjs` and compare the bitmask with the source polygon. It closes the one
gap that item 28 is defined by — the hand-off contract — with no export and one session. The loop permalink export
(gap 2) is the second measurement and needs the owner's yes.

**CONFIRMED versus PLAUSIBLE.** CONFIRMED (executed or read on disk by this seat): every count, hash, identity,
statistic and quotation in §1–§3, the nesting of `Room.fill`, the roof-face equality, the JSON graph facts, the
cross-lane 38/38 identity, the tag descriptions and the decodings. PLAUSIBLE (reasoning only): the basement
probability's true value (B6, n = 37), the stairwell roll's meaning (B8), the `fromCode` explanation (D15), the
Door-object reading (R16), the `Clutter.getForce` packing reading (R14), and every [INFERRED] mechanism the readers
proposed that this seat only re-counted rather than re-derived.
