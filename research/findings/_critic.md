# _critic — completeness critique of the 21 findings files

Critic pass run 2026-09-21 over `research/findings/*.md` (the 19 files named in the task **plus two that were
not named but exist**: `watabou-extra-a.md`, `watabou-extra-b.md`, produced by workflow 02 for the
`watabou-extra` worklist). No captured JavaScript bundle was opened; recorded behaviour was read from
`*.calls.json`, `*.cpuprofile` sample/timestamp arrays, `console.jsonl`, `meta.json`, screenshots, and
`research/ftg-capture/create-request.json`.

## 0. What this critic did and did not do (read this first)

* **Coverage (task step 1): done mechanically and exhaustively.** Every one of the 226 worklist entries, every
  `research/ftg-docs/*.md` page, every capture directory, the 2017 Haxe sources, `research/ftg-capture/*` and
  the Foundry module were grepped for across all findings files.
* **Reading the findings files (task step 2): NOT done cover-to-cover.** The 21 files total **1.63 MB /
  20 645 lines ≈ 750 k tokens** (measured: `profile-mfcg.md` alone is 39 k tokens for 84 KB), which is beyond what
  one context can hold alongside the source checks. What was actually read: the full section skeleton of all 21
  files; **every** `[NAMED-ONLY]` line (97 tag occurrences) with context; the "open questions" sections of the
  MFCG post files and `ftg-docs-params.md`; `profile-mfcg.md` lines 1–466 in full; and ≈ 30 sections read in
  full where two or more files overlap on one subject (warp tools, lot subdivision, twisted bisection, population
  model, skeleton labels, PoissonPattern, NG street identities, VG stage order / roads / fields / water bands /
  tree placement / village square, FTG units, FTG road queue, FTG pipeline order, FTG decorations, MFCG layer
  order and palette). Contradictions outside those overlaps may exist and are **not** excluded by this pass.
* **Spot-checks (task step 2): 24 `[STATED]` claims checked against the cited source — 24 supported** (§4).
* **Gaps closed in this task (task step 3): five critic addenda appended** (§5), two of them built on new
  measurements from recordings no reader had used.

## 1. Coverage

### 1.1 Headline

| source set | count | uncited anywhere | note |
|---|---|---|---|
| `watabou-city` Patreon posts | 30 | **0** | |
| `watabou-village` Patreon posts | 28 | **0** | 37407181 and 121415691 are joint posts listed in both sets; both readers covered them |
| `ftg` Patreon posts | 30 | **0** | |
| MFCG itch devlogs | 47 entries = 46 directories | **0** | `67134-060-custom-colors-scale-bar-elevation` appears twice in the worklist (second copy has a trailing `.`); one directory on disk |
| Neighbourhood itch devlogs | 6 | **0** | |
| Village Generator itch devlogs | 21 | **0** | |
| `watabou-extra` Patreon posts | 65 | **0** | covered by `watabou-extra-a.md` (33) and `watabou-extra-b.md` (32); all 21 ids in `research/patreon/linked-missing.json` were subsequently scraped and are inside this set |
| `research/ftg-docs/*.md` | 36 | 0 by the reader's own log | `ftg-docs-params.md` appendix records all 36 pages read; only 8 are cited by filename in running text, the rest by content. **Images deliberately skipped and logged there:** 9 post-process filter samples on `useSettlements/map`, 15 Foundry/Roll20 install screenshots, 4 day-night/season near-duplicates |
| 2017 Haxe sources (`reference/TownGeneratorOS/**/*.hx`) | 59 | **0** | 50 cited by filename; the other 9 (`DisplayObjectExtender, PixelCache, StringUtils, ObjectPool, Stopwatch, BitmapUtils, MovieClip, NinePatch, Atlas`) are covered by class name in `os-geometry.md` §3.9–3.10 (engine plumbing, no generation content) |
| `reference/towngenerator-foundrymodule` | 1 repo | 0 | `ftg-payload-visual.md` §7 |
| `research/ftg-capture/*` | 5 files | 0 | |
| capture directories | 10 | **1 uncited + 1 under-used → closed** | see §1.2 |
| harness logs `captures/{record-all,record-extra,ftg-session,ftg-session2}.log` | 4 | 4 | run logs, not sources; `record-extra.log` is what revealed §1.2 |

Thinly cited sources (1–2 hits) were each opened and are legitimately thin: 28565641 (0.7.1, one feature,
1 KB), 46041997 (patron-only, body not archived), devlog 1206 ("The First Post", 0.9 KB), and eight
`watabou-extra` posts about unrelated toys (tank doodles, Full Moon Coffee, Teen Island Simulator, The Haunting
of…, Dark Clues, Lighthouses, Tiny Pubs, Roguewood). 27776897 has 14 images but they are the same 7 figures at two
resolutions; `mfcg-posts-a.md` §T1 treats the post at length.

### 1.2 The one real coverage hole: two Neighbourhood recordings no reader used

| capture | tags / seeds | cited by (before this pass) |
|---|---|---|
| `captures/neighbourhood/2026-09-21T05-04-54` | random tags, 3 passes × 4 gens | `profile-neighbourhood.md`, `visual-spec.md` |
| `captures/neighbourhood/2026-09-21T05-38-59` | `large,square,leafy`, seeds 5151/5152 | `visual-spec.md` only (draw record) |
| `captures/neighbourhood/2026-09-21T05-40-05` | `small,street`, seeds 6161/6162 | **nobody** |

`profile-neighbourhood.md` was written from the first capture alone, whose coverage pass happened to roll the
`area` template four times at size `medium`. Consequently it marked the `square`/`street` template bodies,
`Namer.square/street`, `Settings.resolve`, `GraphUtils.longStroke/attackDecay0`, `BuildingView.drawCone`,
`PolyUtils.rand/randInner` as never-executed `[NAMED-ONLY]`, and declared four call-count identities "exactly
verified" that are in fact template-specific. **Closed** — see the addendum summarised in §5.1. (The two extra
Village captures, `05-37-29` and `05-38-17`, *were* used by `profile-village.md`.)

### 1.3 Full per-source citation table

Hit counts are occurrences of the numeric id in each findings file (counted after the critic addenda were
appended, which added a handful of cross-citations; every source had ≥ 1 citation before them).

**watabou-city** (30 sources)

| source | local images | cited in (hits) |
|---|---|---|
| `27564017` | 2 | mfcg-posts-a (6) |
| `27776897` | 14 | mfcg-posts-a (2) |
| `28565641` | 2 | mfcg-posts-a (1) |
| `29538966` | 9 | mfcg-posts-a (15) |
| `29813424` | 4 | mfcg-posts-a (5) |
| `30234656` | 2 | mfcg-posts-a (4) |
| `32000161` | 2 | mfcg-posts-a (3) |
| `37407181` | 7 | mfcg-posts-a (24), vg-posts-a (14) |
| `38048182` | 3 | mfcg-posts-a (20) |
| `39697187` | 4 | mfcg-posts-a (11) |
| `40345972` | 9 | mfcg-posts-a (35), mfcg-devlogs-b (1), profile-mfcg (1) |
| `41711473` | 4 | mfcg-posts-a (22), mfcg-devlogs-b (2) |
| `46041997` | 1 | mfcg-posts-a (2) |
| `46685301` | 4 | mfcg-posts-a (24), mfcg-devlogs-b (1) |
| `47063541` | 2 | mfcg-posts-a (28), profile-mfcg (1) |
| `48290708` | 2 | mfcg-posts-b (5) |
| `50057173` | 2 | mfcg-posts-b (5) |
| `54745111` | 8 | mfcg-posts-b (7) |
| `61026228` | 5 | mfcg-posts-b (33), profile-mfcg (3), mfcg-devlogs-b (1) |
| `62336213` | 6 | mfcg-posts-b (14) |
| `79147510` | 3 | mfcg-posts-b (16), mfcg-devlogs-b (1) |
| `87882877` | 4 | mfcg-posts-b (17) |
| `98918904` | 2 | mfcg-posts-b (7) |
| `100431269` | 6 | mfcg-posts-b (15) |
| `101942512` | 6 | mfcg-posts-b (15), mfcg-devlogs-b (1) |
| `102377277` | 7 | mfcg-posts-b (17), mfcg-devlogs-b (2) |
| `109852547` | 5 | mfcg-posts-b (14) |
| `114184619` | 4 | mfcg-posts-b (11), mfcg-devlogs-b (1) |
| `114858238` | 14 | mfcg-posts-b (17), mfcg-devlogs-b (1) |
| `121415691` | 6 | vg-posts-b (13), mfcg-posts-b (12), mfcg-devlogs-b (1), vg-ng-devlogs (1) |

**watabou-village** (28 sources)

| source | local images | cited in (hits) |
|---|---|---|
| `35854256` | 4 | vg-posts-a (24), profile-village (1) |
| `36199609` | 5 | vg-posts-a (18), vg-ng-devlogs (1) |
| `37407181` | 7 | mfcg-posts-a (24), vg-posts-a (14) |
| `38498864` | 8 | vg-posts-a (32) |
| `42144467` | 6 | vg-posts-a (14) |
| `42521165` | 12 | vg-posts-a (17) |
| `44111493` | 4 | vg-posts-a (15) |
| `50688261` | 9 | vg-posts-a (29), vg-ng-devlogs (1) |
| `56941736` | 4 | vg-posts-a (9) |
| `57968729` | 5 | vg-posts-a (26), vg-ng-devlogs (1) |
| `66544756` | 4 | vg-posts-a (11), vg-ng-devlogs (1) |
| `71653886` | 8 | vg-posts-a (30), vg-ng-devlogs (1) |
| `80494491` | 4 | vg-posts-a (24), vg-ng-devlogs (1), vg-posts-b (1) |
| `84106820` | 4 | vg-posts-a (22), vg-ng-devlogs (1), vg-posts-b (1) |
| `88749133` | 6 | vg-posts-b (31), profile-village (1), vg-ng-devlogs (1) |
| `89314043` | 4 | vg-posts-b (22), profile-village (1), vg-ng-devlogs (1) |
| `90033685` | 4 | vg-posts-b (12), vg-ng-devlogs (1) |
| `91692684` | 7 | vg-posts-b (35), vg-ng-devlogs (1) |
| `94118928` | 2 | vg-posts-b (7) |
| `104226049` | 4 | vg-posts-b (34), profile-village (1), vg-ng-devlogs (1) |
| `104796798` | 2 | vg-posts-b (19), vg-ng-devlogs (1) |
| `105215836` | 5 | vg-posts-b (30), vg-ng-devlogs (1) |
| `110526365` | 4 | vg-posts-b (19), vg-ng-devlogs (1) |
| `116745476` | 4 | vg-posts-b (25), vg-ng-devlogs (1) |
| `117634240` | 4 | vg-posts-b (23), vg-ng-devlogs (1) |
| `121415691` | 6 | vg-posts-b (13), mfcg-posts-b (12), mfcg-devlogs-b (1), vg-ng-devlogs (1) |
| `169047704` | 4 | vg-posts-b (23), vg-ng-devlogs (1) |
| `169696051` | 4 | vg-posts-b (25), vg-ng-devlogs (1) |

**ftg** (30 sources)

| source | local images | cited in (hits) |
|---|---|---|
| `65223067` | 6 | ftg-posts-a (15) |
| `66499838` | 0 | ftg-posts-a (5) |
| `75844005` | 4 | ftg-posts-a (24) |
| `79527117` | 20 | ftg-posts-a (20) |
| `81472775` | 2 | ftg-posts-a (11) |
| `84680671` | 28 | ftg-posts-a (22) |
| `86856028` | 16 | ftg-posts-a (8) |
| `88558259` | 10 | ftg-posts-a (13) |
| `91451446` | 6 | ftg-posts-a (20) |
| `93999105` | 10 | ftg-posts-a (7) |
| `95869798` | 6 | ftg-posts-b (8) |
| `99652534` | 4 | ftg-posts-b (7) |
| `101576411` | 16 | ftg-posts-b (6) |
| `103668405` | 14 | ftg-posts-b (10) |
| `106664214` | 17 | ftg-posts-b (20) |
| `112861635` | 10 | ftg-posts-b (13) |
| `120828892` | 11 | ftg-posts-b (19) |
| `123982784` | 0 | ftg-posts-b (6) |
| `127128581` | 7 | ftg-posts-b (11) |
| `130937474` | 14 | ftg-posts-b (6) |
| `133016301` | 10 | ftg-posts-c (9) |
| `137812814` | 26 | ftg-posts-c (11) |
| `144226579` | 16 | ftg-posts-c (25) |
| `147332188` | 40 | ftg-posts-c (12) |
| `149103655` | 10 | ftg-posts-c (16) |
| `151265004` | 8 | ftg-posts-c (16) |
| `153121107` | 12 | ftg-posts-c (17) |
| `157283634` | 0 | ftg-posts-c (22) |
| `159738553` | 22 | ftg-posts-c (8) |
| `164816716` | 10 | ftg-posts-c (12), profile-mfcg (1), profile-neighbourhood (1) |

**devlog-medieval-fantasy-city-generator** (46 sources)

| source | local images | cited in (hits) |
|---|---|---|
| `1206-the-first-post` | 0 | mfcg-devlogs-a (2) |
| `1367-tiny-fixes-and-preview-of-hatching` | 0 | mfcg-devlogs-a (7), profile-village (6), os-wards-render (1), visual-spec (1) |
| `1579-some-answers-and-comments` | 0 | mfcg-devlogs-a (12) |
| `2062-022-temples-wards-overview` | 0 | mfcg-devlogs-a (5) |
| `3091-030-wall-less-layouts-city-outskirts-smooth-roads` | 0 | mfcg-devlogs-a (15), profile-village (1) |
| `4923-040-coastal-cities` | 0 | mfcg-devlogs-a (6) |
| `6271-041-options` | 0 | mfcg-devlogs-a (3) |
| `6592-source-code` | 0 | mfcg-devlogs-a (4) |
| `7063-042-shanty-towns-and-more-options` | 0 | mfcg-devlogs-a (7) |
| `8154-043-export` | 4 | mfcg-devlogs-a (23) |
| `9958-some-progress-on-3d-view` | 8 | mfcg-devlogs-a (21) |
| `11802-050-rivers-and-basic-house-shapes` | 3 | mfcg-devlogs-a (37), profile-village (1) |
| `15006-toy-town` | 1 | mfcg-devlogs-a (5) |
| `19034-051-and-merry-christmas-` | 1 | mfcg-devlogs-a (14) |
| `22717-future-plans-for-mfcg` | 1 | mfcg-devlogs-a (19) |
| `22794-052-warp-tool` | 1 | mfcg-devlogs-a (11) |
| `31287-experimenting` | 2 | mfcg-devlogs-a (10) |
| `34104-053-neighbourhoods-alleys-and-buildings` | 2 | mfcg-devlogs-a (29) |
| `46967-054-integration-with-azgarrs-fantasy-map-generator` | 2 | mfcg-devlogs-a (23) |
| `59798-055-farm-fields-rotation-tool-and-city-names` | 1 | mfcg-devlogs-a (32), os-wards-render (1) |
| `67134-060-custom-colors-scale-bar-elevation` | 1 | mfcg-devlogs-a (29), mfcg-posts-a (2) |
| `67134-060-custom-colors-scale-bar-elevation.` | 1 | mfcg-devlogs-a (29), mfcg-posts-a (2) |
| `85275-070-districts` | 2 | mfcg-devlogs-a (22), mfcg-posts-a (1) |
| `91172-071-editable-district-names` | 1 | mfcg-devlogs-b (23) |
| `101529-072-lots-of-mostly-small-mostly-visual-changes` | 2 | mfcg-devlogs-b (28) |
| `112574-073-bug-fixes-geojson-export` | 1 | mfcg-devlogs-b (9) |
| `123268-city-viewer-aka-toy-town-2` | 3 | mfcg-devlogs-b (16) |
| `124980-city-viewer-101-gable-roofs-and-obj-export` | 1 | mfcg-devlogs-b (6) |
| `153064-076-landmarks` | 1 | mfcg-devlogs-b (17) |
| `179534-080-new-buildings-improved-ui` | 1 | mfcg-devlogs-b (9) |
| `219273-081-major-ui-changes` | 1 | mfcg-devlogs-b (14) |
| `228034-082-basic-integration-with-armoria` | 1 | mfcg-devlogs-b (11) |
| `242933-083-assorted-improvements` | 1 | mfcg-devlogs-b (14) |
| `334289-090-new-alleys-and-buildings` | 1 | mfcg-devlogs-b (12) |
| `345262-091-trees-and-other-visual-changes` | 1 | mfcg-devlogs-b (9), profile-mfcg (1) |
| `494237-092-assorted-new-features-and-improvements` | 1 | mfcg-devlogs-b (14) |
| `494692-keyboard-shortcuts-and-mouse-actions` | 0 | mfcg-devlogs-b (12) |
| `576591-0100-alpha` | 1 | mfcg-devlogs-b (10) |
| `685971-0101` | 1 | mfcg-devlogs-b (8) |
| `698858-0102-alleys-view` | 1 | mfcg-devlogs-b (7) |
| `711706-0110-roof-details-and-district-view` | 1 | mfcg-devlogs-b (13) |
| `715292-0111-improved-map-labels` | 1 | mfcg-devlogs-b (17) |
| `780847-0112-small-improvements-and-bug-fixes` | 1 | mfcg-devlogs-b (19) |
| `817711-0114-forests` | 1 | mfcg-devlogs-b (19), profile-mfcg (1) |
| `823841-experiments` | 1 | mfcg-devlogs-b (11) |
| `880636-three-generators-have-been-updated` | 1 | mfcg-devlogs-b (11) |

**devlog-neighbourhood** (6 sources)

| source | local images | cited in (hits) |
|---|---|---|
| `315495-neighbourhood-generator` | 1 | vg-ng-devlogs (9) |
| `317489-101-a-bunch-of-qol-features` | 1 | vg-ng-devlogs (5) |
| `362757-110-templates-large-buildings-and-other-features` | 1 | vg-ng-devlogs (10) |
| `419786-120-new-template-integration-with-mansions-lots-of-vi` | 1 | vg-ng-devlogs (12) |
| `419965-keyboard-shortcuts` | 0 | vg-ng-devlogs (5) |
| `687554-121` | 1 | vg-ng-devlogs (9) |

**devlog-village-generator** (21 sources)

| source | local images | cited in (hits) |
|---|---|---|
| `248943-125-fields` | 1 | vg-ng-devlogs (10) |
| `308559-127-improved-fields-and-roads` | 1 | vg-ng-devlogs (8) |
| `382428-128-integration-with-procgen-mansion` | 1 | vg-ng-devlogs (8) |
| `425635-130-new-trees-and-buildings` | 1 | vg-ng-devlogs (5) |
| `426543-keyboard-shortcuts` | 0 | vg-ng-devlogs (12) |
| `507254-140-village-square-and-orchards` | 1 | vg-ng-devlogs (17) |
| `541652-150-non-square-maps-and-isolated-villages` | 1 | vg-ng-devlogs (9) |
| `584696-151-ponds-and-improved-farm-fields` | 1 | vg-ng-devlogs (11) |
| `589997-152-improved-rivers-and-bridges` | 1 | vg-ng-devlogs (16) |
| `613514-plans` | 1 | vg-ng-devlogs (18) |
| `626406-153-new-water-features-and-other-additions` | 1 | vg-ng-devlogs (12) |
| `635140-collection-of-styles` | 12 | vg-ng-devlogs (11) |
| `731413-154-spotlight-and-improved-roads` | 1 | vg-ng-devlogs (11) |
| `736720-160-palisades` | 1 | vg-ng-devlogs (17) |
| `740285-161-palisades-in-json-and-small-visual-improvements` | 1 | vg-ng-devlogs (8) |
| `785801-162-shading` | 1 | vg-ng-devlogs (7) |
| `840277-164-crossroads-and-numbered-houses` | 1 | vg-ng-devlogs (19) |
| `848499-165-small-improvements` | 1 | vg-ng-devlogs (5) |
| `880634-three-generators-have-been-updated` | 1 | vg-ng-devlogs (8) |
| `1657874-167-improved-trees` | 1 | vg-ng-devlogs (10) |
| `1667364-168-improved-contours-and-other-visual-changes` | 1 | vg-ng-devlogs (11) |

**watabou-extra** (65 sources)

| source | local images | cited in (hits) |
|---|---|---|
| `28088976` | 8 | watabou-extra-a (8) |
| `28827167` | 5 | watabou-extra-a (1) |
| `29161908` | 3 | watabou-extra-a (3) |
| `30565716` | 2 | watabou-extra-a (5) |
| `31488942` | 2 | watabou-extra-a (3) |
| `31716880` | 14 | watabou-extra-a (7) |
| `32650629` | 12 | watabou-extra-a (7) |
| `33794567` | 2 | watabou-extra-a (4) |
| `34061942` | 6 | watabou-extra-a (5) |
| `34822131` | 5 | watabou-extra-a (6) |
| `36885895` | 4 | watabou-extra-a (1) |
| `37063263` | 2 | watabou-extra-a (3) |
| `39279370` | 5 | watabou-extra-a (1) |
| `40742440` | 7 | watabou-extra-a (3) |
| `41103311` | 18 | watabou-extra-a (8) |
| `43602231` | 6 | watabou-extra-a (13) |
| `44405211` | 4 | watabou-extra-a (7) |
| `45360377` | 6 | watabou-extra-a (8) |
| `49191011` | 11 | watabou-extra-a (6), mfcg-posts-b (2), profile-neighbourhood (2), watabou-extra-b (2), profile-mfcg (1), vg-ng-devlogs (1) |
| `52012066` | 5 | watabou-extra-a (8) |
| `53106327` | 16 | watabou-extra-a (12) |
| `53482923` | 14 | watabou-extra-a (4) |
| `53649165` | 4 | watabou-extra-a (4) |
| `55050649` | 7 | watabou-extra-a (13) |
| `55959636` | 2 | watabou-extra-a (8) |
| `57890525` | 3 | watabou-extra-a (1) |
| `58808794` | 4 | watabou-extra-a (12), vg-ng-devlogs (1) |
| `59046807` | 4 | watabou-extra-a (11), vg-ng-devlogs (1) |
| `59864807` | 4 | watabou-extra-a (5) |
| `60165082` | 6 | watabou-extra-a (11) |
| `63952852` | 2 | watabou-extra-a (1) |
| `64375271` | 4 | watabou-extra-a (14), vg-ng-devlogs (1) |
| `64845431` | 5 | watabou-extra-a (8) |
| `68936414` | 10 | watabou-extra-b (13) |
| `70917627` | 8 | watabou-extra-b (12), vg-ng-devlogs (1) |
| `73450463` | 0 | watabou-extra-b (6) |
| `76106823` | 3 | watabou-extra-b (1) |
| `77490818` | 6 | watabou-extra-b (8) |
| `78826680` | 4 | watabou-extra-b (4) |
| `86093774` | 6 | watabou-extra-b (5) |
| `91285519` | 1 | watabou-extra-b (2) |
| `93887809` | 2 | watabou-extra-b (5) |
| `94469350` | 2 | watabou-extra-b (1) |
| `95796287` | 0 | watabou-extra-b (3) |
| `96122791` | 0 | watabou-extra-b (3) |
| `99067664` | 4 | watabou-extra-b (5), vg-ng-devlogs (2) |
| `101173551` | 8 | watabou-extra-b (17), mfcg-devlogs-b (4), mfcg-posts-b (2), watabou-extra-a (1) |
| `103335095` | 4 | watabou-extra-b (3) |
| `106975409` | 2 | watabou-extra-b (6) |
| `109092851` | 4 | watabou-extra-b (12) |
| `115426745` | 3 | watabou-extra-b (2) |
| `115606722` | 2 | watabou-extra-b (3) |
| `124128668` | 4 | watabou-extra-b (4) |
| `136013772` | 8 | watabou-extra-b (10) |
| `137631332` | 4 | watabou-extra-b (3) |
| `138099329` | 6 | watabou-extra-b (5) |
| `139540343` | 4 | watabou-extra-b (7) |
| `141198168` | 4 | watabou-extra-b (8) |
| `141879891` | 4 | watabou-extra-b (9) |
| `144816210` | 2 | watabou-extra-b (3) |
| `145997186` | 4 | watabou-extra-b (8) |
| `149496680` | 6 | watabou-extra-b (9), vg-posts-b (1) |
| `154598538` | 2 | watabou-extra-b (1) |
| `164387414` | 1 | watabou-extra-b (2) |
| `165462094` | 2 | watabou-extra-b (3) |
## 2. Contradictions between findings files

Verdict key: **RESOLVED** = one side is refuted by evidence available in the corpus (stated which);
**RECONCILED** = both are right about different versions/aspects; **OPEN** = cannot be settled from the corpus.

| # | subject | file A says | file B says | verdict |
|---|---|---|---|---|
| C1 | MFCG persons per building | `mfcg-devlogs-b.md` §2.19: **6.29**, "exactly recoverable", agreement to 4 s.f. "rules out any nonlinearity" (2 samples) | `mfcg-posts-a.md` §T20: **≈ 6** from 3 samples incl. 856 → ~5200 and 3423 → ~21000 | **RESOLVED against 6.29.** 856 × 6.29 = 5384 → "~5400" ≠ "~5200". With 2-s.f. display rounding the four distinct readings intersect at a constant in **[6.12, 6.13)**. Addendum written in `mfcg-devlogs-b.md`. |
| C2 | what `PoissonPattern` is | `profile-neighbourhood.md` §3.8: "a warped **80 × 80 lattice** … *not* textbook Bridson" (from 6400 ≈ 80²) | `profile-mfcg.md` §6.1 and `profile-village.md` §4.6: **k = 50 candidates per step**, all evaluated, domain-warped Poisson-disc | **RESOLVED against the lattice.** NG's own counts give warp ÷ step = 50.000 in all 4 base runs and all 3 new ones (6400 = 128 × 50); MFCG 11 500/230 and VG 12 500/250 etc. are the same ratio and are not squares. Addendum CA-4. |
| C3 | is `PoissonPattern` built once up-front? | `profile-mfcg.md` §6.1: static initialiser, before `Main.new`, reusable constant | `profile-neighbourhood.md` §3.8: "exactly once per generation" | **RECONCILED + refined.** MFCG: static init. NG: **lazy** — in seed 6162 (`small,street`, no greens) every `PoissonPattern.*` count is 0. Addendum CA-4. |
| C4 | Warp tool semantics | `mfcg-devlogs-b.md` §2.16 `[INFERRED]`: Rotate = swirl about brush; Equalize = redistribute spacing; Bloat = radial push from brush centre | `mfcg-posts-a.md` §T4 `[STATED]` (40345972): Rotate = whole map about its centre; Equalize = "single cell more regular … equalizing its angles"; Bloat = "make … cells larger" | **RESOLVED for the stated definitions.** Also 7 tools (2020, no Pinch) vs 8 tools (devlog 494692) is **RECONCILED** by date: Pinch added in 0.9.2 (79147510). Addendum in `mfcg-devlogs-b.md`. |
| C5 | what `Castle.equalize` does | `profile-mfcg.md` §4.4b `[INFERRED]`: equalises **edge lengths** (Laplacian relaxation) | creator, 40345972: Equalize equalises a cell's **angles** | **RESOLVED for angles** at the operation level (same named operation). Addendum in `profile-mfcg.md`. |
| C6 | NG street/block identities | `profile-neighbourhood.md` §3.2: four identities "hold in every run", "arithmetic, not inference" | new measurements, `square` and `street` templates | **RESOLVED — template-specific.** `Block = Street + 1` fails for `square` (Block = Street); `extend = 2·S` fails for `square` (2·S − 2); general forms are `partition = Normal + bisectArea` and `detectStraight = makeCut − (Street − k)`, k = 0/1/3 for area/street/square. Addendum CA-2. |
| C7 | VG stage order | `profile-village.md` §4.0: list puts `createWater` before `createElevation`, forest + fields before `placeBuildings`; closing note says elevation "is finalised late" (inferred from call-tree listing order) | `vg-posts-a.md` §3.1 `[STATED]` (35854256): "First, a height map is created … Then … trackers"; `vg-posts-b.md` §2.22: roads prefer isohypses | **RESOLVED by measurement.** CPU-profile sample timestamps in all four profiles: `createElevation` (incl. `digRiver`) → `createWater` → `createDensity` → `roll{ buildNetwork → placeBuildings → spawnFields → rollForest → rollName }`. Addendum in `profile-village.md`. |
| C8 | VG: is relief built from the water mask? | `vg-posts-b.md` §2.4 `[INFERRED]`: "build the water mask first", then height from distance-to-water | measured order: `digRiver → dist2poly` runs **inside `createElevation`, before** the `createWater → river → setLevel → createDeflection` stage | **PARTLY RESOLVED.** Relief is carved to the river (creator: "relief follows rivers", 89314043) but the expensive water-body geometry comes *after* relief. How the river course/polygon exists before `createWater` is **OPEN** (too cheap to be sampled). |
| C9 | VG field layout | `vg-posts-b.md` §2.11 `[INFERRED]`: annular **sector** around the village, then subdivided | `profile-village.md` §4.7 `[SHOWN]`: `Farmland.getVoronoi → intersect (PolyBool) → cut → Bisector` (OBB), `semiSmooth/getArc` | **RESOLVED for the recorded construction**; the "sectors centred on the village" look (creator's words, 88749133) is what Voronoi cells of seeds ringed round the heart produce. |
| C10 | VG roads vs slope | `vg-posts-b.md` §2.22 `[INFERRED]`: least-cost **A\*/Dijkstra** over the height field | `profile-village.md` §2, §4.4: no graph-search class ever executes; roads are `Tracker.advance` loops | **RESOLVED against path search.** Slope preference must sit in tracker steering (`Tracker.flexibility` + gradient sampler). |
| C11 | "VG uses no Voronoi / OBB bisection" | `vg-posts-a.md` §3.1: "no Voronoi, no straight skeleton, no OBB bisection is mentioned anywhere **in this slice**" | `profile-village.md` §4.6–4.7: `VoronoiPattern`, `Delaunator`, `DCEL` (forest), `Farmland.getVoronoi`, `Bisector` + `PolyBounds.obb` (fields) | **RECONCILED** — A is a statement about what the posts mention, B about what runs. A synthesiser must not carry A forward as a fact about VG. Streets and houses are still tracker-based; Voronoi/OBB are confined to forest patches and fields. |
| C12 | FTG pipeline order | `ftg-payload-visual.md` §6 `[INFERRED]`: landscape first incl. **forests**, buildings packed, *then* function assignment (step 10) and **populate last** (step 13). `ftg-posts-c.md` §5: **layout stage first, water second**, people at step 8 | `ftg-docs-params.md` §0.2 and `ftg-posts-a.md` §2.5 `[STATED]` (docs `createSettlement__algorithm.md`, post 91451446): **phase 1 = buildings + people decided before any geometry; phase 2 = map: water first → staged road network & districts → suburb → outer settlement (farms/forests/features)** | **RESOLVED for the documented order** (verified in the doc: "First, we generate any initial bodies of water"; "Outer settlement … We then place each of the landscape features"). Both inferred pipelines have people too late; `ftg-posts-c` has water too late; `ftg-payload-visual` has forests too early. |
| C13 | MFCG bisector cut rule | `profile-mfcg.md` §4.9 / `profile-neighbourhood.md` §3.2 `[INFERRED]`: cut ⟂ OBB long axis, `detectStraight` snaps to a frontage | `watabou-extra-a.md` §2.1 `[STATED]` (49191011): cut starts and ends **at right angles to the polygon's edges, with a bend in the middle**; FTG's author gives the same 3-step construction (164816716) | **OPEN but narrowed.** The stated construction is primary; the recorded `makeCut = PointExtender.project` 1 : 1 is its perpendicular-foot step. OBB most plausibly picks where/which axis and feeds `isSmallEnough`. Addenda in both profile files give a discriminating test. |
| C14 | meaning of `#a59f93` in MFCG | `visual-spec.md` §1.2: "field furrows (the only extra map ink)" | `profile-mfcg.md` §10: `colorGreen`; `fill #a59f93` count == `PatchView.drawGreen` count exactly | **RECONCILED** — `colorGreen` is used both as the park fill and as the furrow stroke. |
| C15 | `Canal.deltaRiver` | `profile-mfcg.md` §4.6: "delta-river variant", channel "fans out" | `watabou-extra-b.md` row 165462094: in Aug 2026 a patron is still asking for a river-delta city option | **RECONCILED / caution.** `deltaRiver` = "river that ends in the sea, with a widened mouth (`drawMouth`)", not a multi-channel delta. Do not design a braided delta on the strength of the symbol name. |

Evolution over time that is **not** a contradiction and should be kept as a version ladder by the synthesiser:
labels (2019 OBB + double bisection + circular arc, `mfcg-posts-a` §T1 → 2024 straight-skeleton ridge,
`mfcg-posts-b` §2.11 / `mfcg-devlogs-b` §2.5); palette slots (4 SVG colours → 7 → 8 named slots → 13-key JSON in the
live build); lots (2017 longest-edge bisection → 0.8.0 opt-in Voronoi → 0.9.0 twisted bisection → 0.11.1 only
twisted); FTG roads (V1 orthogonal proposal queue from a 4-way crossroad → V2 staged, large lots handed to
districts).

## 3. `[NAMED-ONLY]` / low-confidence items that a different available source resolves

| where flagged | item | resolving source(s) |
|---|---|---|
| `mfcg-posts-b.md` §2.3 UNKNOWN, open-q 2; `mfcg-devlogs-b.md` tail ("single highest-value unread source") | the twisted-bisection construction | `watabou-extra-a.md` §2.1 (post 49191011, the method post itself), `watabou-extra-b.md` §T1 (holes), `profile-neighbourhood.md` §3.2 + addendum CA-2/CA-5 (exact call arithmetic), `ftg-posts-c.md` §2.1–2.2 (independent 3-step statement of the same bend + the shrink-then-split fix for its cross-lot artefact) |
| `mfcg-devlogs-b.md` §2.5 (sentence truncated by paywall) | skeleton-ridge labels | `mfcg-posts-b.md` §2.11 (full quote, 102377277), `watabou-extra-b.md` §T3/T6 (own O(n²) skeleton; hole-blindness), `profile-mfcg.md` §6.2–6.3 (call chain incl. Visvalingam simplify + cubic smoothing) |
| `watabou-extra-b.md` §T6 (`[INFERRED]` that curved labels are skeleton-driven) | same | confirmed `[STATED]` by 102377277 via `mfcg-posts-b.md` §2.11 |
| `mfcg-posts-a.md` §T2 (district partition method) and open-q 5 | how districts are formed | `profile-mfcg.md` §4.7: `DistrictBuilder.fromPatch/fromVertex` seeds + `Grower.grow` with `validatePatch`/`validateEdge`, `DocksGrower`, `ParkGrower`, `check4holes` |
| `mfcg-posts-a.md` open-q 4, `mfcg-posts-b.md` open-q 1, `mfcg-devlogs-b.md` §2.1 "Still UNKNOWN" (seed distribution) | patch seeding / mesh | `os-model.md` §3.1–3.3 (spiral `a = sa + √i·5`, `r = 10 + i(2+u)`, 3 relax passes on central cells) + `profile-mfcg.md` §4.1 (**8·size + 4** points, Delaunator, DCEL, short-edge collapse) |
| `mfcg-posts-a.md` open-q 6 (old bisection details) | 2017 rule | `os-wards-render.md` §4 / `os-model.md` §8.3 (exact code: longest edge, ratio spread `0.8·gridChaos`, angle `π/6·gridChaos`, leaf `minSq·2^(4·sizeChaos·(u−0.5))`) |
| `mfcg-posts-a.md` open-q 9 (gate selection) | gates | `os-model.md` §5.3 |
| `mfcg-posts-a.md` open-q 10, `mfcg-posts-b.md` open-q 13 (shoreline noise) | coast | `profile-mfcg.md` §4.1: 6-octave Perlin sampled once per cell, only when `coast=1`; §2.1 `sea` = direction in π-radians |
| `mfcg-posts-a.md` open-q 17, `mfcg-posts-b.md` §2.23 (`[NAMED-ONLY]` naming) | name generation | `profile-mfcg.md` §9: Tracery `grammar.json` verbatim + 4 Markov corpora, feature-conditioned guards |
| `mfcg-posts-b.md` open-q 18 (`sea`, `gates`, `urban_castle`) | URL semantics | `profile-mfcg.md` §2, §2.1 |
| `mfcg-posts-b.md` open-q 6 (outskirts falloff) | density thinning | `os-wards-render.md` §3.4 (`filterOutskirts` per-vertex density) + `profile-mfcg.md` §4.9 (`WardGroup.interpolate` + barycentric over an ear-clipped ward) |
| `mfcg-posts-b.md` open-q 7 (smoothing method) | which smoother | `profile-mfcg.md` §6.3: `Chaikin.render`, `RoadsView.cutCorner/smoothRoad`, `PolyUtils.smooth/visvalingam`, `Cubic` |
| `mfcg-posts-b.md` open-q 12 (farm tessellation) | farms | `profile-mfcg.md` §4.9: `Farm.splitField` recursion, `Cutter.grid`, `round`, `getHousing`, `PolyCreate.stripe` furrows |
| `mfcg-posts-a.md` §T9 (curved streets, method `[NAMED-ONLY]`) | curvilinear streets | `watabou-extra-a.md` §2.3 |
| `mfcg-posts-a.md` §T6 (outskirts = "Village-Generator algorithm") | the VG placement | `vg-posts-a.md` §3.6, `profile-village.md` §4.8 (`placeBuildings/buildAlong/addBuilding/validateBuilding`) |
| `mfcg-devlogs-a.md` §2.8 roadmap (castle placement) | castle inside/outside wall | `profile-mfcg.md` §2: `urban_castle` flag, 4/4 images |
| `mfcg-devlogs-a.md` §2.18 roadmap (liquify/bloat/pucker) | warp tools | shipped: `mfcg-posts-a.md` §T4, `mfcg-devlogs-b.md` §2.16 + addendum |
| `profile-mfcg.md` §6.1 (PoissonPattern consumer unknown) | consumer | `profile-village.md` §4.6, `profile-neighbourhood.md` §3.8 — trees |
| `profile-mfcg.md` §4.4b (`Bloating…`, `equalize`) | semantics | 40345972 via `mfcg-posts-a.md` §T4 |
| `profile-neighbourhood.md` §1 never-executed list | template bodies, cone roofs, long strokes, URL-tag path | the two unused NG captures — addendum CA-1 |
| `vg-ng-devlogs.md` §A2.3 orchards, §A2.4 fields, §A2.5 roads, numbered houses (all `[NAMED-ONLY]` — devlogs are changelogs) | methods | `vg-posts-a.md` §3.10–3.11 (fields: five stated rules; orchards), `vg-posts-b.md` §2.19–2.23 (road tags, merging, driveways, isohypses, density rewrite), §2.34 (numbering); `profile-village.md` §4.4–4.7 |
| `vg-ng-devlogs.md` §B2.3 templates, §B2.4 large buildings/pins | NG templates | `watabou-extra-a.md` §2.5–2.6, `watabou-extra-b.md` §T2 (ring), `profile-neighbourhood.md` + addendum CA-2 |
| `vg-posts-a.md` §3.22 (names/population `[NAMED-ONLY]`) | VG naming | `profile-village.md` §4.11 (`VillageGrammar`, Tracery, Markov, `Legend`) |
| `vg-posts-a.md` §3.1 "single biggest open question" (which way the field pushes roads) | contour-following | `vg-posts-b.md` §2.22 `[STATED]` isohypse preference (1.5.4) + "Normally they 'resist' the relief" (71653886); mechanism per C10 |
| `vg-posts-a.md` open-q 10 / `vg-posts-b.md` §2.15 (tree candidate generator) | sampler | `profile-village.md` §4.6: `Forest.new → VoronoiPattern.poisson → PoissonPattern` (k = 50, warped) → Voronoi → DCEL flood-fill patches |
| `ftg-payload-visual.md` §3.5 (three 14-instance decoration kinds) | which decorations | `create-request.json` `plotDecorationOptions` + `ftg-docs-params.md` §4.10 → WELL / BANDSTAND / STATUE — addendum |
| `ftg-posts-a.md` §2.22 (GeoJSON / SVG export `[NAMED-ONLY]`) | export schema/units | `ftg-docs-params.md` §0.1 (`useSettlements__export.md`: GeoJSON in metres), `ftg-payload-visual.md` §3 (wire model) |
| `ftg-docs-params.md` open-q 2–3 (lot split / plot generation geometry) | building split | `ftg-posts-c.md` §2.1–2.2 (the July 2025 algorithm and the July 2026 shrink-then-split rewrite, both stated step by step) |
| `ftg-docs-params.md` open-q 10 (castle moat/cliff null in JSON) | castle | `ftg-posts-c.md` §2.3 |

## 4. Spot-checks of `[STATED]` claims against the cited source

Method: open the cited `post.md` / doc / `.hx` and search for the quoted words. 24 checked, **24 SUPPORTED**, 0
unsupported, 1 wording nit.

| # | findings file § | claim | source opened | verdict |
|---|---|---|---|---|
| 1 | `vg-posts-a` §3.1 | height map → gradient vector field → "trackers" → density map; same principle as Procgen Tarot and Winter Trees | `watabou-village/35854256/post.md` | SUPPORTED (all five phrases present) |
| 2 | `vg-posts-a` §3.12 | square = high-density spot → circle "distorts it a little" → centrepiece unless over water; "Roughly half"; `no square` tag | `watabou-village/80494491/post.md` | SUPPORTED |
| 3 | `vg-posts-a` §3.1 | `organic` tag; normally roads "resist" the relief | `watabou-village/71653886/post.md` | SUPPORTED |
| 4 | `mfcg-posts-a` §T4 | seven warp tools and their definitions; map/compass rotation decoupled | `watabou-city/40345972/post.md` L56–64 | SUPPORTED (and no "Pinch" in this post, as the file implies) |
| 5 | `mfcg-posts-a` §T20 | size "in 'wards'"; "minimum size is 5 and the maximum is 200" | `watabou-city/47063541/post.md` (+comments) | SUPPORTED |
| 6 | `mfcg-posts-a` §T5 | 0.8.0 Voronoi lots; "crashes the generator occasionally"; "disabled by default"; "triangle looking quadrangles" | `watabou-city/41711473/post.md` | SUPPORTED |
| 7 | `mfcg-posts-b` §2.3–2.4 | "twisted bisection"; Offset "shifts the front side of every lot"; display mode "auto-switches" | `watabou-city/61026228/post.md` | SUPPORTED |
| 8 | `mfcg-posts-b` §2.3 | "collapsed or intersecting edges"; idea "simple enough" | `watabou-city/87882877/post.md` | SUPPORTED |
| 9 | `mfcg-devlogs-b` §2.16 | eight tools incl. `P` Pinch | devlog `494692…/post.md` L41–48 | SUPPORTED; Pinch = "opposite to … Bloat" confirmed in `watabou-city/79147510` (0.9.2) |
| 10 | `mfcg-devlogs-b` §2.5 | skeleton-label sentence is truncated in the devlog | devlog `715292` vs Patreon 102377277 quote in `mfcg-posts-b` §2.11 | SUPPORTED (truncation is real; full text exists elsewhere) |
| 11 | `mfcg-devlogs-a` §2.4 | "find the largest rectangle which fits inside the polygon … cut it into smaller blocks and throw away some of them" | devlog `11802…/post.md` | SUPPORTED |
| 12 | `mfcg-devlogs-a` §2.4 | castles "strictly rectangular"; temples forced rectangular "half the time" | devlog `8154-043-export/post.md` | SUPPORTED |
| 13 | `vg-posts-b` §2.15 | trees grown "away from houses and busy roads"; "'domain warping' to the fractal noise"; `grove` reverses | `watabou-village/88749133/post.md` | SUPPORTED |
| 14 | `ftg-posts-a` §2.3 | fill tool: raycast to find a road, "classic maze trick", leftmost path, "a bit of maths" | `ftg/65223067/post.md` L26–28 | SUPPORTED |
| 15 | `ftg-posts-b` §T-20/T-21 | segments "propose new ones from their end"; queue; "vaguely circular"; "much larger lots"; "about 3 different algorithms"; "sharp points" | `ftg/112861635/post.md` | SUPPORTED — wording nit: the post says "4 way crossroad", the file renders it "4-way crossroad" inside quotation marks |
| 16 | `ftg-posts-c` §2.2 | old 3-step bend algorithm; new "initial split by shrinking the lot … blocking edges" | `ftg/164816716/post.md` | SUPPORTED |
| 17 | `ftg-docs-params` §2.2–2.4 | "proposed roads … in the queue waiting to be processed"; "lowest priority"; "unconnected normal roads are pruned"; "stay a fixed distance away" | `ftg-docs/createSettlement__settlement_layout.md` | SUPPORTED |
| 18 | `ftg-docs-params` §2.1 | one road at a time, snaps to an intersection, lot detection, "split in two" | `ftg-docs/createSettlement__algorithm.md` L89–93 | SUPPORTED |
| 19 | `watabou-extra-a` §2.7 | Dyson hatching: "three short strokes", Poisson-disc, diameter = distance to "closest one", clusters "like squares", angle method "doesn't produce much difference" | `watabou-extra/31716880/post.md` | SUPPORTED |
| 20 | `watabou-extra-b` §T3 | own skeleton algorithm; "dehydrate"; O(n²); "glitches in special cases" | `watabou-extra/101173551/post.md` L25 | SUPPORTED |
| 21 | `os-model` §3.1 | `nPatches * 8` points, `a = sa + √i·5`, `r = 10 + i(2+u)`, 3 relax passes on `points[0..2]` + `points[nPatches]` | `building/Model.hx:99–112` | SUPPORTED |
| 22 | `os-model` §5 / `profile-mfcg` §4.4b | `compactness < 0.75` → `"Bad citadel shape!"` | `building/Model.hx:165–166` | SUPPORTED |
| 23 | `os-model` §5.2 / `profile-mfcg` §4.4 | `smoothFactor = min(1, 40 / patches.length)` | `building/CurtainWall.hx:32` | SUPPORTED |
| 24 | `os-wards-render` §3.1 | `MAIN_STREET 2.0`, `REGULAR_STREET 1.0`, `ALLEY 0.6`, inset by half | `wards/Ward.hx:18–20, 43, 52` | SUPPORTED |

Recorded-behaviour spot-checks (not creator text): `profile-neighbourhood` §3.2/§3.8 counts re-derived from
`coverage/gen-{0,1}.calls.json` — reproduce exactly; `profile-village` §4.6 ratio 50.00 — reproduces; its §4.0
ordering does **not** reproduce (C7).

## 5. Critic addenda written in this pass

1. **`profile-neighbourhood.md` → "Critic addendum"** (CA-1…CA-5): the two unused NG recordings
   (`large,square,leafy` and `small,street`): table of 14 previously never-executed routines that ran; the four
   identities generalised per template; description of the two new screenshots and measured size-tag scaling;
   `PoissonPattern` correction (k = 50, lazy init); `detectStraight`/`makeCut` re-read against the creator's bent-cut
   description with a discriminating test.
2. **`profile-village.md` → "Critic addendum"**: true stage chronology recovered from `.cpuprofile` sample
   timestamps (elevation first; `digRiver` inside it; buildings before fields before forest; `buildNetwork` is
   inside `Region.roll`); cross-file notes on fields (C9) and roads (C10).
3. **`ftg-payload-visual.md` → "Critic addendum"**: decoration sub-fields 11.2/11.4/11.5 identified as
   WELL / BANDSTAND / STATUE from the request's equal-weight `plotDecorationOptions`, with the six-singleton ↔
   six-field-number argument and a test.
4. **`mfcg-devlogs-b.md` → "Critic addendum"**: population constant corrected (C1); stated Warp-tool definitions
   (C4) and their link to the citadel repair traces; skeleton-label unknowns closed by cross-reference.
5. **`profile-mfcg.md` → "Critic addendum"**: PoissonPattern consumer; `equalize`/`bloat` semantics; bisector
   reading vs the stated bent-cut; **recording coverage gap** (default style only); size semantics.

## 6. Remaining gaps (cannot be closed from the corpus as it stands)

1. **MFCG recordings exercised default style only.** Never run: Hip/Gable skeleton roofs per building, trees,
   forests, alleys layer, district view, non-default tint methods, `gates ≠ −1`. One more capture with
   `Roofs: Hip`, trees and forests on closes the largest `[NAMED-ONLY]` cluster left for MFCG.
2. **NG `ring` template never recorded** (`Namer.ring`, ring-hood body) and `Settings.getInfo`; a `tags=ring`
   capture closes it. `watabou-extra-b.md` §T2 has only the stated rule.
3. **VG river course before `createWater`** (C8): what produces the polyline/polygon that `digRiver → dist2poly`
   measures against. A capture with `--cpu-sampling-interval` lowered, or a coverage pass on a `river` seed read
   for `River.*`/`Water.*` call order, would settle it.
4. **Twisted-bisection parameters** remain unknown after all sources: bend position, endpoint-edge choice, stop
   predicate, street-width law, reject filter for "weird" lots (C13 narrows the construction, not the constants).
5. **External sources referenced by posts but not in the corpus** (listed in `mfcg-devlogs-a.md` §6 tail):
   watabou's Reddit outline of the generator (`r/proceduralgeneration/668sqb/…/dggkhnr`) and four other Reddit
   threads (castle placement, wall removal, triangular-building fix, gate wards), itch post 422446 ("Continuous"
   option), three `r/FantasyCities` write-ups (farm fields, rotation, names), 13 Twitter/X videos, and the three
   4-colour palette SVGs on `fantasycities.watabou.ru`. Two FTG/Patreon bodies are truncated at source
   (`ftg/99652534` mid-narrative; `watabou-city/46041997` patron-only).
6. **MFCG 0.11.3** is absent from both the Patreon and itch sets (0.11.2 → 0.11.4).
7. **FTG**: exact road-legality thresholds, district-type scoring, wall tracing for `AROUND_ALL_LOTS`, determinism
   of render-time fills (`seed: null` in the only captured request), the meaning of wire field 20, and the
   per-field assignment among 11.2/11.4/11.5 (set identified, order inferred).
8. **FTG docs images deliberately unread** (logged by the reader): 9 post-process filter samples, 15 install
   screenshots, 4 near-duplicate weather/season stills — none bears on geometry; the post-process set matters
   only if the FTG *render* effects are to be matched (`ftg-posts-c.md` §2.4 covers them from the posts).
9. **This critic did not read all 21 findings files cover to cover** (§0). Sections outside the overlaps listed
   there have not been cross-checked for contradictions; a second critic seat restricted to the FTG trio
   (`ftg-posts-a/b/c`) and to `os-model` ↔ `os-wards-render` constant tables would be the best use of more budget.
