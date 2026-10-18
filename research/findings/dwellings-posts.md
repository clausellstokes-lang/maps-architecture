# dwellings-posts — watabou's Dwellings (House Plan Generator) from its own posts: full sources review

> PENDING FABLE REVIEW — Opus-produced (lane `dwellings/posts`, sources reader); a Fable critic and a confidence assessment follow.

Lane `dwellings/posts`, 2026-09-26. Purpose: design input for our floor-plan rung (docs/AMENDMENTS-2026-09-25b.md item 28).
STATUS: COMPLETE (2026-09-26): all sections written; sources re-listed at the end (no new devlog directories).

Evidence tags: **[STATED]** the creator's own words · **[SHOWN]** visible in a named image, not explained · **[INFERRED]** my reconstruction, reasoning given · **[NAMED-ONLY]** announced, method unknown. User statements are marked "[STATED by user]"; "[unknown]" marks a fact no source gives.
Abbreviations: **DW** Dwellings (released as **HPG**, House Plan Generator) · **DC** Dark Clues · **PM** Procgen Mansion · **FM** Fantasy Manor · **MFCG** Medieval Fantasy City Generator · **VG** Village Generator · **NG** Neighbourhood Generator · **UP** Urban Places · **TV** Taverns. Post ids are Patreon post ids (`research/patreon/<collection>/<id>/`); devlog ids are itch devlog ids (`research/devlogs/<game>/<id>-*/`).
Extends research/findings/manor.md §2.9, §2.10, §4.3, §9 (read first); contradictions with it are flagged "vs manor.md".

## 0. Headline findings
Ten findings that matter most for a floor-plan generator that starts from a **known footprint, known storeys and a known building function** (item 28).

1. **DW's author says his own order of steps is the ceiling.** DW works plan first, labels last:
   - footprint → floor outlines → a separate recursive-bisection partition of each floor → stairs for each pair of adjacent floors → a list of needed room types, drawn from the house name and floor count → several attempts at assigning types, the best kept → doors, windows, furniture, lights.
   - On specific rooms: "the method I use is not suitable for this" (2025-09-30) [STATED].
   - On typed buildings he built a separate generator because DW "is not good at ... layouts with specific topology" (2026-05-12) [STATED].
   - Item 28's function-first inversion therefore has the creator's own experience behind it (§2(c), §2(e), §3).
2. **The settlement → building hand-off carries a footprint and nothing else that works.** DW accepts a ground plan "as a parameter" through its permalink, and NG, MFCG, VG, UP and Tiny Pubs open buildings in it [STATED].
   - The only documented URL fields are `seed` and `tags` (`https://watabou.github.io/dwellings/?seed=1341473638&tags=large,slab`); how the plan and entrance are encoded is undocumented [STATED].
   - The marked-entrance hand-off of 1.3.8 "isn't currently working" [STATED].
   - Storeys and function are never passed [INFERRED].
   - Our contract (outline, storeys, entrance side, function) must be designed; DW supplies the idea, not the format (§2(a), §6.1).
3. **DW's footprint is a single hole-free group of grid cells, with walls along cell edges.** One blueprint cell is one plan cell; only the largest connected part is kept and holes are ignored [STATED + SHOWN].
   - Courtyards were attempted twice and postponed; round plans are unsupported, "The lack of support for circular plans IS a problem" [STATED].
   - Our wing rings, courtyards and round towers are beyond DW's footprint model, so our rung needs holes and round rooms from the start (§2(a)).
4. **Stairs between floors are DW's admitted weak point, and its fixes show the right order.** Each pair of adjacent floors is joined on its own by a one-cell stair that sits in the same cell on both floors [STATED + SHOWN, measured in three exports].
   - Stairs can land on opposite sides of the house [STATED].
   - The connection occasionally fails, and that was left unrepaired [STATED].
   - The two robust devices are the external spiral shaft and the `stairwell` stack of 1.4.0; Taverns also pins its staircase and trapdoor first. All three fix the stair position before or outside the partition [STATED].
   - Rule for us: place the stair core first, then partition each floor around it (§2(d)) [INFERRED].
5. **A DW room type is a record with rules, which gives our room-programme column a starter schema.** It carries [STATED]:
   - a name and an average size — ordinal only, bathroom smallest, ballroom largest;
   - how regular the shape should be;
   - window demand (none, some or as many as possible), capped by the room's outer walls;
   - door demand: a real door or an open doorway, and bedrooms at most one door;
   - floor rules: kitchen on the ground floor, no bedroom in the basement, most types not underground;
   - primary or secondary priority;
   - one adjacency hint: bathrooms attached to bedrooms;
   - props.

   Special types appear only when the house name calls for them, and the list is "always reasonable": as many bedrooms as floors (§2(e)).
6. **Realism is traded for play by design, and the complaints are the price.** The creator calls DW "not CAD", maps of "house-like dungeons"; loops are added on purpose and mazy corridors are defended [STATED].
   - In the 83-post itch thread, users report [STATED by users]:
     - illogical layouts: 4 posts;
     - redundant corridors: 3 posts;
     - rooms reachable only through other rooms: 3 posts;
     - missing bedrooms or bathrooms: 3 posts;
     - no editing: 8 posts.
   - Under our realism tiebreaker these become acceptance tests DW lacks: every programme room present, no pass-through bedrooms or bathrooms, no parallel corridors, every floor reachable by the main stair (§4.2) [INFERRED].
7. **The restrictive rerolls are the precedent for separate random streams per stage.** Enter re-rolls everything; Shift+Enter re-rolls the inner walls and keeps the ground plan and floor count; Ctrl+Enter re-rolls the labels and keeps "all the geometry"; per-floor reroll is judged "not too difficult" [STATED].
   - This matches item 28's per-stage streams.
   - DW leaves open whether a label reroll redoes the windows, doors and furniture that depend on room type. Our rung must define it (§2(m)).
8. **Taverns shows the typed-building method: a fixed programme, fixed anchors, generate-and-test** [STATED].
   - Programme: a common room and kitchen; guest rooms served by a corridor; a loose cellar.
   - Anchors: one staircase; a trapdoor from kitchen to cellar; the fireplace repeated above the kitchen when a guest room sits there; the cellar door opposite the entrance.
   - Test: the whole tavern is re-rolled when guest rooms are too few.
   - Concrete furniture becomes possible because the function is fixed. The cost is no size options (§3).
9. **The plan renderer is vector-only and layered, and its readability devices are documented** (§2(i), §2(j), §5):
   - ambient occlusion as gradient shapes that stay valid in SVG, broken at doorways;
   - a light per room at the centre of its most spacious part;
   - labels inside rooms, scaled, rotated or abbreviated to fit;
   - abstract furniture with per-room density, size and wall affinity, which must never block doors or stairs;
   - stair arrows pointing up;
   - hip roofs over every exposed storey outline, consistent with a straight skeleton, with lower levels faded and chimneys unrelated to the rooms below;
   - plan and elevation sharing entrance and window positions but not sizes.
10. **DW has no scale, so our rung must choose one.** The creator says there is "no explicit scale" and room sizes are only ranked [STATED]. Users place the cell between 5 and 10 ft [STATED by users].
    - DW's one-cell stairs and one-cell bathrooms imply a cell of about 1.5–2.5 m; Taverns' furniture implies about 1.6–1.8 m; UP and MFCG are metric [INFERRED + STATED].
    - Our footprint arrives in metres, so the cell size — and every room size derived from it — is the owner's call (manor.md §9.6) (§2(o)).

## 1. Chronology
Dates are Patreon publication dates. The itch devlog stubs carry scrape-time dates ("05 December 2025 16:04 UTC" on 14 of them, "14 November 2025" on `1134478`), which are listing artefacts, not publication dates; their comment threads carry real dates. "P" = Patreon post, "itch" = itch devlog. Each itch devlog of DW except `567246` is a teaser that links to the Patreon post of the same row; `118772106` (1.3.5) has no itch devlog.

| date | ids | version | title | what changed relative to the previous release |
|---|---|---|---|---|
| 2021-03-25 | P `49191011` | (idea) | Recursive bisection with a twist | The method is born from the floor-plan problem: "how it would be possible to cut an irregularly shaped floor plan into reasonable rooms" → "recursive bisection with a bend", first tried on neighbourhood maps [STATED]. |
| 2021-11-17 | P `58808794` | NG 1.0 | Neighbourhood Generator | Bent cuts re-implemented "from scratch"; also used "for cutting blocks into buildings"; "very weird" pieces "need to be filtered out" [STATED]. |
| 2021-12-13 | P `59864807` | Castle in The Mist | PROCJAM 2021 | Sibling grammar: polygon → cut into blocks → inner blocks discarded to make a courtyard → rectangular blocks become halls, the rest towers/curtain [STATED]. |
| 2022-01-11 | P `61026228` | MFCG 0.9.0 | new alleys and buildings | "Twisted" bisection for alleys and lots; "Filter lots"; permalinks reworked [STATED]. |
| 2022-02-17 | tweet `1494337095313223682` (not on disk; date decoded from the id) | — | — | Method judged "not good enough to bother with mansion" (reported in `86093774`) [STATED]. |
| 2022-03-18 | P `63952852` | Dark Clues | (locked) | The game that used the method; body and 3 comments locked; two blurred previews show a rotated orthogonal house partitioned into rooms on a cell grid [SHOWN, blurred]. |
| 2022-03-28 | P `64375271` | NG 1.1.0 | — | "The Mansion will get the option of new floor plans" (links Dark Clues); never delivered for PM [STATED]. |
| 2023-07-14 | P `86093774` | WIP | Floor plans | Bisection and door placement tweaked; corridors merged "to avoid spawning unnecessary doorways"; a rectangular-rooms-only test; "small ones look much better" [STATED]. |
| 2023-07-21 | P `86436420`, itch `563591` | HPG 1.0 | House Plan Generator (itch slug `house`) | First release: 1–3 floors; external spiral stair in a shaft; each floor partitioned into rooms, halls, corridors; typed rooms with requirements; external labels with arrows; visual options; house title in the browser console [STATED]. |
| 2023-07-25 | P `86635425`, itch `565440` | 1.0.1 | — | Floor indicator; context menu; persistent settings; touch; per-floor SVG export; name shown (Space); **special rooms only if the house name requires them**; "Corridors" type removed, rare "Secret passages" added; Ctrl+Enter re-assigns room types; upper floors occasionally smaller; Blueprint colours, Sci-fi walls [STATED]. |
| 2023-07-29 | P `86852618`, itch `567327` | 1.1.0 | regular staircases and basements | Regular stairs replace spiral ones (spiral kept for high buildings); basements; windows and doors by room type; label placement improved [STATED]. |
| ≤2023-08-21 | itch `567246` | — | Keyboard shortcuts | The only full-text devlog: the complete shortcut list. It already lists features up to 1.3.8 (Shift marks the entrance), so it was edited after posting [INFERRED from its first comment date]. |
| 2023-08-28 | P `88328982`, itch `581099` | 1.2.0 | tags and improved visuals | Renamed **Dwellings** (slug `dwellings`); **tags**; extended Style dialog, two-colour walls, Natural preset; **vector inner shading (AO)**; PNG export; stair arrows point upstairs; props system (statues) [STATED]. |
| 2023-08-31 | itch comment image `_comments-images/06` | 1.2.x | Tags dialog | The 12 tags of the time, and "Shift+click a tag to learn its effect" [SHOWN]. |
| 2024-01-15 | P `96522502`, itch `666129` | 1.3.0 | elevation and improved rooms | Front elevation built from Tiny Pubs sections; labels inside rooms; **multi-attempt assignment, best kept; primary/secondary room types**; one-cell rooms merged into corridors; generic "room"/"corridor"; renaming; numbers; attic, altar, curtain; bathrooms attached to bedrooms; `organic`/`mechanical`; smaller ground plans; **larger plans → taller**; upper floors more likely smaller; more windows; **entrance avoids the longest wall** [STATED]. |
| 2024-01-30 | P `97493516`, itch `674004` | 1.3.1 | small improvements and experiments | Elevation export; generate from the elevation view; side and rear elevations; `3 floors` → 3 or more; fewer windows on lower floors; "fortified" elevation option; new house-name set [STATED]. |
| 2024-09-12 | P `111909860`, itch `798071` | 1.3.2 | permalinks and multi-floor export | **Permalinks; a ground plan accepted as a parameter**; NG "Open in Dwellings"; Advanced (multi-floor) export with layout and cell size; `1/2/3 floors` → `low`/`tall` + "Number of floors"; fachwerk from Tiny Pubs [STATED]. |
| 2024-09-26 | P `112799146`, itch `805488` | 1.3.3 | blueprint editor | **Blueprint editor** (draw, R random shape, X random rectangle); only the largest connected shape, holes ignored; trapdoor when no room for stairs; spiral-stair/entrance overlap fixed [STATED]. |
| 2024-10-04 | P `113347826`, itch `810018` | 1.3.4 | part of Procgen Arcana | DW replaces PM in the Arcana; MFCG and VG "open in Dwellings"; minor elevation fixes; holes postponed again [STATED]. |
| 2024-11-26, 2024-12-10 | P `116745476`, `117634240` | VG 1.6.4–1.6.5 | — | Double-click a VG building to open it in DW; VG "towers" become real buildings that open in DW [STATED]. |
| 2024-12-27 | P `118772106` | 1.3.5 | visual and UI improvements | Toolbar; **room lights**; AO redrawn; Natural becomes default; Wooden style; Log-house walls [STATED]. |
| 2025-01-20 | P `120395768`, itch `871855` | 1.3.6 | advanced export again and abstract furniture | Export bug fixed; floor ranges; per-layer export; X opens Export; **abstract furniture** [STATED]. |
| 2025-02-03 | P `121415691`, itch `880631` | (1.3.7) | Three generators have been updated | Furniture blocks doors less; hatched walls; **Rooms > Gothic room set** [STATED]; the version number is not given, 1.3.7 by elimination between 1.3.6 and 1.3.8 [INFERRED]. |
| 2025-10-23 | P `141879891` | UP 1.2.0 | — | Urban Places houses open in DW (not on mobile) [STATED]. |
| 2025-11-07 | P `143036785`, itch `1106706` | 1.3.8 | improved lighting and marked entrances | AO and lights reworked, per-room light toggle; **marked entrance in the blueprint, saved in permalinks**; `spacious` tag [STATED]. |
| 2025-11-14 | P `143565705`, itch `1113590` | 1.4.0 | JSON export and improved stairs | **JSON export**; **`stairwell` tag**; `spacious` becomes default and is removed; `regular` removed; `hallways` added; corridor lights off; Ctrl+click highlight [STATED]. |
| 2025-12-01 | P `144816210` | — | Hair | Fantasy Manor remake abandoned; its progress moved into DW roofs, previewed in a tweet of 2025-11-25 (date decoded from the id) [STATED]. |
| 2025-12-05 | P `145140009`, itch `1134478` | 1.4.1 | roofs | Roofs Simple/Detailed/Hidden; Shade/Fade/Shrink; R roof view; roof colour; chimneys [STATED]. |
| 2025-12-18 | itch reply | 1.4.x | — | Only permalink shown in full: `https://watabou.github.io/dwellings/?seed=1341473638&tags=large,slab` [STATED]. |
| before 2026-05-12 | mentioned in P `158074424` | Tiny Pubs update | — | Tiny Pubs: press W to see the pub's layout in DW; the result uses tavern room names [STATED + SHOWN `158074424/03`]. |
| 2026-05-12 | P `158074424`, itch taverns `1521851` | Taverns 1.0 | Taverns | Separate generator, "a different generation method", fixed programme, no size options [STATED]. |
| 2026-05-22 | P `158953060` | — | Taverns and quips | Locked: no body, 0 of 2 comments; one blurred preview [SHOWN, blurred]. |
| 2026-05-29 | P `159559624`, itch taverns `1538100` | Taverns 1.1.0 | improved generation and export | Cellar door; fireplace; reroll the whole tavern when guest rooms are too few; whole-tavern export [STATED]. |
| ≈2026-08-28 | itch taverns `1643499` | Taverns 1.1.1 | — | Tiny Pubs W now opens Taverns; SVG export; grid toggle [STATED]; date from the itch page's "Updated 29 days ago" at the 2026-09-26 fetch [INFERRED]. |
| 2026-06 to 2026-09 | itch replies | 1.4.x | — | Possible DW/Taverns merge; "Dwellings can't even import its own jsons" (06-11); stair tags add a floor, a no-basement tag planned (06-30); per-floor reroll "not to difficult" (09-16) [STATED]. |

No DW version after 1.4.1 is announced anywhere in these sources.

## 2. The generation method
### 2(a) Ground plan, blueprint editor, permalink hand-off
**Three ways a ground plan enters DW.**

1. **Random (default).** The plan is an axis-aligned orthogonal shape on a square grid, never rotated, in every DW image [SHOWN]. The shapes are unions of two to four rectangles with one-cell notches, giving L, T, cross and stepped forms (`86093774/06`, `86436420/03`, `112799146/03`) [SHOWN]. There are two random modes, "random shape" and "random rectangle", exposed as R and X in the blueprint editor (`112799146`) [STATED]. How the random shape is built (rectangle union or cell growth) is not stated [unknown]. Size comes from the `small`/`medium`/`large` tags (1.2.0 dialog, `_comments-images/06`) [SHOWN]; "Overall, ground plans were made a little smaller" in 1.3.0 (`96522502`) [STATED]. `square` very probably requests a square plan, because the creator offers `3 floors` + `small` + `square` (+ optional `blank`) as a way to get a tower (Patreon reply, 2023-12-13) [INFERRED].
2. **Blueprint editor (1.3.3, `112799146`).** Opened with B or "Blueprint" in the context menu; the user paints cells on a grid of "+" vertex marks (`112799146/03`: painted cells hatched, the union outlined) [SHOWN]. Backspace clears, R gives a random shape, X a random rectangle, Enter submits, B or Esc discards; all are also in the context menu [STATED]. Validity: "Dwellings can only turn connected shapes without holes in them into floor plans. For example, if you draw two unconnected shapes, Dwellings will only process the largest of them. And if you draw a shape with a hole, the hole will be ignored" [STATED]. One painted cell becomes one plan cell (in `112799146/03` a 3×2-cell block of the drawing is a 3×2-cell block of the plan; that plan style also draws a faint half-cell grid) [SHOWN, measured]. Since 1.3.8, holding Shift "display[s] special buttons along the border of the drawn shape"; pressing one marks the entrance and pressing it again clears it, and with no mark "the entrance location will be chosen randomly (as before)" (`143036785`) [STATED]. Unlike PM, towers cannot be marked ("doesn't make sense here") [STATED]. Announced but never reported done: marking the spiral-staircase position; editing each floor's shape including the basement; a tool to "draw" rooms, "for example ... a long winding corridor across an entire floor ... and the generator would spawn regular rooms around" (`112799146`) [NAMED-ONLY]. The creator also uses the editor as a workaround twice: floors with no stairs are made as separate one-storey buildings "with the same ground plan using the Blueprint editor" (itch 2025-06-05), and houses larger than `large` are drawn by hand (itch 2024-09-27) [STATED].
3. **Passed in by a settlement generator.** "It took some extra effort to 'teach' Dwellings to accept a ground plan as a parameter for integration with other generators. As a test, I linked Neighbourhood Generator with Dwellings, so if you click a building on a map there, you'll see 'Open in Dwellings' in the context menu instead of 'Open in PM'" (1.3.2, `111909860`) [STATED]. MFCG and VG followed in 1.3.4 ("I'll need to fine-tune this functionality later to take advantage of all the options the new generator supports", `113347826`) [STATED]. VG 1.6.4 opens a building on double-click, gates included, towers not (`116745476`), and VG 1.6.5 makes towers real buildings that also open (`117634240`) [STATED]. Urban Places 1.2.0 has the same action, not on mobile (`141879891`) [STATED]. Tiny Pubs gained a W key that shows "the layout of the currently displayed pub" in DW (`158074424`) [STATED], and the result carries tavern room names such as Dormitory and Common room (`158074424/03`) [SHOWN]; the creator says those Tiny-Pubs-driven layouts have street-front "shapes more or less as you described" (Patreon reply on `159559624`, 2026-05-30) [STATED]. What Tiny Pubs passes (façade width, sections, room set) is not stated [unknown].

**The entrance hand-off is unfinished.** The marked entrance "is saved in permalinks and correctly restored from them. Actually, that was the main purpose of this feature - to allow MFCG, VG and Urban Places to specify where the house entrance should be when their 'Open in Dwellings' action is activated. This isn't currently working, as it requires appropriate changes to each of these generators" (1.3.8, 2025-11-07) [STATED]. No later source reports those changes. "In the future I may want to allow requesting more than one entrance" [NAMED-ONLY].

**The permalink / URL format: everything the sources document.**

| element | what is documented | grade |
|---|---|---|
| non-itch base URL | `https://watabou.github.io/dwellings/` (from the one full permalink); the Arcana card page is `https://watabou.github.io/dwelling.html` (`113347826` link); the itch build runs in `https://html-classic.itch.zone/html/17195045/bin/index.html` (`_page.md`) | STATED |
| `seed` | integer; example `1341473638` | STATED (itch reply 2025-12-18) |
| `tags` | comma-separated tag names; example `large,slab` | STATED (same) |
| full example | `https://watabou.github.io/dwellings/?seed=1341473638&tags=large,slab`, given as an example of a plan with a loop | STATED |
| how a user gets it | "they work the same here as in my other generators" (`111909860`); the convention: a "Permalink…" context-menu item that shows the current link or accepts a pasted one and regenerates (UP 1.2.1, `145997186`), and on the non-itch copy "simply copying a link in the browser's address bar" (PS 1.3.0, `60165082`); DW's menu has "Permalink..." (`_page-images/02`, `118772106/02`) | STATED + SHOWN |
| ground plan | accepted "as a parameter" (1.3.2); parameter name and encoding **not documented** | STATED existence, format unknown |
| marked entrance | "saved in permalinks" (1.3.8); encoding **not documented** | STATED existence, format unknown |
| floors, style, room set, roofs mode, room renames | **not documented** as permalink content; "the only thing you can edit is the names of the rooms" (1.4.0) | unknown |

For comparison only, sibling generators use plain query strings: a user posted an MFCG permalink `?size=46&seed=5484757540042&name=Ringpaw&population=28444&greens=0&farms=1&citadel=1&urban_castle=0&plaza=1&temple=0&walls=1&shantytown=1&coast=1&river=1&gates=-1&sea=0.09` (`61026228`, 2022-01-14) [STATED by user]; in MFCG "No manual changes made to a map are encoded into its URL (apart from the city name)" (`102377277`, 2024-04-23) [STATED]; VG saves numbered buildings in permalinks from 1.6.5 [STATED]. A DW plan parameter in the same style (a grid-cell list next to `seed` and `tags`) is the likely form [INFERRED from the shared convention; unverified].

**What a settlement generator passes, as documented: a ground plan, and in principle an entrance.** No source says storeys, function, size class, orientation or neighbours are passed. DW then decides floors, basement, house name and programme by its own rules (§2(b), §2(e)) [INFERRED from the 1.3.4 "fine-tune ... later" remark and from DW's own floor and name rules]. How a non-orthogonal or rotated MFCG/NG/VG/UP polygon becomes DW grid cells is not described for DW [unknown]; for PM the creator said it "approximates irregular polygons with squares, but overall shapes remain recognizable" (manor.md §3.2, `70917627`) [STATED for PM]. UP's newer houses are "almost rectangles" (`141879891`) and VG houses are rectangles (manor.md §3.2), so most hand-offs start from near-rectangles [STATED + SHOWN].

**Plan limits.** No holes: courtyards were the reason for the blueprint editor (1.3.2), "a more complicated matter than I expected" (1.3.3), "*even more* complicated" and postponed (1.3.4), and are never reported done [STATED]. No round plans: "apart from the ability to build round floor plans" (Patreon reply 2023-12-13) and "The lack of support for circular plans IS a problem" (itch 2026-04-10) [STATED]. The only curved element is the external spiral-stair shaft (§2(d)) [SHOWN]. The sibling Castle in The Mist does make courtyards, by discarding the inner blocks of a cut polygon (`59864807`) [STATED]; DW never adopted that route.

vs manor.md: §2.10(1) and §3.2 already record the plan hand-off via permalink and the unfinished entrance hand-off; nothing here contradicts them. New here: the documented URL surface is only `seed` + `tags`; the plan and entrance encodings are undocumented; Tiny Pubs, UP and VG double-click are further entry points.

### 2(b) Floors, basements, size → height
**Number of floors.**
- 1.0: "Each house has from one to three floors" (`86436420`) [STATED].
- 1.2.0: tags `1 floor`, `2 floors`, `3 floors` (`_comments-images/06`) [SHOWN].
- 1.3.1: "The '3 floors' tag now makes the generator to produce buildings with 3 or more floors ... high floors often end up being too small, so this feature is quite glitchy" (`97493516`) [STATED].
- 1.3.2: the three floor tags are removed and replaced by `low` and `tall`, or a "Number of floors" drop-down (`111909860`) [STATED].
- 1.4.0 speaks of stairs being "even worse when there are not three floors, but eight" (`143565705`) [STATED]. Whether 8 is reachable is not stated. Six levels are shown (B + GF + four upper floors, `111909860/03`; floor selector "B GF 1F 2F 3F 4F", `118772106/02`) [SHOWN].
- Stair tags add a floor: "if you select one of the 'stairs tags' (spiral, stairwell), an extra floor is spawned, because that staircase needs to lead somewhere" (itch 2026-06-30) [STATED].

**Size → height.** "Houses with larger ground plans tend to be higher now" (1.3.0) [STATED]. The mapping is not given [unknown]. Tall buildings also get "fewer windows on lower floors ... to make high buildings look more like castles, less like skyscrapers" (1.3.1) [STATED].

**Upper-floor outlines.**
- 1.0.1: "Occasionally, higher floors are made smaller than the ground floor to make houses a bit less slab-like. I'm not sure I like how it turned out though" [STATED].
- 1.3.0: "Floors above the ground floor are now more likely to be smaller than floors below. This means fewer 'slab-like' buildings" [STATED].
- In every multi-floor image each upper outline lies inside the floor below. The uncovered part of the lower floor is drawn on the upper plan as a roof outline with short hip strokes at its free corners (before 1.4.1), later as a tiled roof. The ground floor's entrance steps are also redrawn as context (`86635425/02`, `86852618/02`, `96522502/03`, `111909860/03`, `120395768/02`, `121415691/04`, `145140009/02`) [SHOWN].
- Which part of a floor is removed is not stated [unknown]. From the images, removals are whole wing-ends or rectangles of the union, not arbitrary cells [SHOWN, visual reading].
- The `slab` tag very probably requests identical floors, the creator's own word for the unshrunk case [INFERRED].

**Basements** (1.1.0, `86852618` unless marked).
- "Some buildings come with basements now and it's more likely to happen with high ones" [STATED]. For a single-storey house "the probability is 50%", and "there is currently no way to request a building strictly without a basement" (itch 2024-09-27) [STATED]; "I'll probably add a special tag in the future to prevent the basement from spawning" (itch 2026-06-30) [NAMED-ONLY]. The `basement` tag requests one (tags dialog; "e.g. *small*, *basement*", `88328982`) [STATED name; semantics INFERRED].
- Shape: "almost always smaller than the shape of the ground floor, because it seems more interesting to me this way, but I suspect this might not be right from the architectural point of view" [STATED]. It lies inside the ground-floor footprint in all five basement images [SHOWN].
- Access: "always connected with the ground floor by a regular staircase, even if upper floors are connected by a spiral staircase" [STATED]. It is excluded from the 1.4.0 stairwell stack [STATED].
- Contents: "Just like normal floors, basements are partitioned into rooms. Most room types cannot be placed underground, so usually you find just a cellar and a storage there and occasionally a laboratory" [STATED]. The gothic set puts an "Anatomical theatre" there (`121415691/04`) [SHOWN].
- "In theory, it is possible to generate multiple underground levels, but it would be difficult to fill them with content" [STATED]; not offered.
- Drawing: basements have no windows and a band of earth hatching outside their walls [SHOWN].

**Other levels.** An "attic" room type exists from 1.3.0 [STATED]; in `111909860/03` the top floor holds only an Attic (a 1×5-cell strip) and the spiral stair [SHOWN]. Floors are labelled B, GF, 1F, 2F… (British numbering) [SHOWN]. "Terraces, balconies ... slightly different shapes for different floors" were planned in 1.0; only the last was delivered (as shrinking) [STATED + NAMED-ONLY].

For a known-storeys input, DW offers no precedent: storeys are always its own draw (tags or drop-down), never received from a settlement generator (§2(a)) [INFERRED].

### 2(c) Partition into rooms, halls and corridors
**Lineage: the method was conceived for exactly this job.** "When I was thinking how it would be possible to cut an irregularly shaped floor plan into reasonable rooms, I came up with an idea of 'recursive bisection with a bend'" (`49191011`, 2021-03-25) [STATED]. The definition, in the creator's words (the only description of the cut in the corpus) [STATED]:
- "We cut a given polygon into two parts. And then we cut each half in two again and again until a certain condition is met, e.g. until our pieces are small enough."
- "We can choose where and at what angle we make cuts ... but the cuts themselves are usually straight."
- "For 'bisection with a bend' we add a turn to a cut somewhere in the middle to start and end at the right angle to the edges of the polygon."
- It is "just an idea, not an algorithm", implementable "in different ways for different results".
- In `49191011/02` every cut meets the boundary at right angles, has at most one bend, and ends in a T-junction; most pieces are four-sided and some are long thin strips [SHOWN].

The lineage runs NG (bent cuts also cut blocks into buildings; "occasionally they spawn very weird ones which need to be filtered out", `58808794`) → PM (rejected: "not good enough to bother with mansion") → Dark Clues ("performed well, producing a reasonably maze-y mix of rooms and corridors") → the 2023 WIP → HPG/DW (`86093774`, `120395768`: "Dark Clues ... from which Dwellings has grown out") [STATED].

**What the 2023 rework changed** (`86093774`): "A number of tweaks were made to the way how the original shape is bisected and how the doors are placed. ... the most noticeable change is that the corridors are now get merged together where it's possible to avoid spawning unnecessary doorways" [STATED]. The test image partitions "a pretty large and very chaotic shape ... while only strictly rectangular rooms are allowed" (`86093774/05`: every room a rectangle, many branching one-cell-wide corridors, dead ends) [STATED + SHOWN]. So a rectangle-only switch existed from the start, later exposed as the `regular` tag and removed in 1.4.0 [STATED + INFERRED link]. "While the method is capable of generating fairly large layouts, small ones look much better" [STATED].

**What a floor becomes.** "Each floor is partitioned into rooms, halls, corridors" (1.0) [STATED]. Facts from the images [SHOWN]:
- Rooms are unions of grid cells.
- Walls lie on cell edges; the creator calls them "'thin' walls" when contrasting DW with his dungeons (itch 2025-01-24) [STATED].
- L-shaped rooms are common.
- One-cell-wide strips serve as corridors, galleries, secret passages and attics.
- Each floor has its own partition inside the same outline (for example `86436420/03`: ground floor Living room, Storage, Bathroom, Hall, Kitchen; first floor Observatory, Corridor, Library, Bathroom).

Refinements over time [STATED]:
- 1.0.1: the "Corridors" room type is "removed as useless"; rarer "Secret passages" appear instead.
- 1.3.0: "Most one-cell rooms get merged with neighbouring corridors. The rest of them get only one door (where possible). This means fewer weird gateway-like rooms." Unassigned spaces become generic "room" or "corridor". Tags `organic` and `mechanical` "affect the way a floor gets partitioned".
- 1.3.8: `spacious` "reduce[s] the number of narrow places - hallways, nooks, tiny rooms ... rooms tend to have simpler shapes and are more regularly aligned with each other".
- 1.4.0: `spacious` becomes the default and is removed; `regular` ("for requesting strictly rectangular rooms") is removed; `hallways` is added "if you need a house with a lot of corridors".

**The creator's stated design stance on circulation** [STATED]:
- Corridors and galleries "make floor plans a little mazy, which seems appropriate to me here. What I *don't* like is when two corridors run side by side - that's silly" (Patreon reply 2024-01-17).
- "I don't think there are *too* many corridors" (itch 2025-04-01).
- "They are not houses, but house-themed dungeons" (1.3.8), the first time the creator frames DW this way.
- Loops: "The generator does that, but quite rarely ... That's not how rooms are usually connected in real buildings", with a tag for more connected plans promised (itch 2025-12-18) [NAMED-ONLY for the tag].
- Four months later: "Some features unconventional for regular houses are added specifically to make these plans suitable for in-game exploration, loops for example. So too many non-rectangular rooms are not a problem imo" (itch 2026-04-10).

These fit together: loops are deliberate but rare [INFERRED].

**Doors.**
- The WIP retuned door placement and merged corridors to cut doorways (above) [STATED].
- Bedrooms "can't have more than one door" (1.0) [STATED].
- From 1.1.0 "some rooms (e.g. bathrooms and libraries) request actual doors and the rest will have empty doorways", with "secret doors, locked doors, walled doors" and "more sophisticated logic for their placement" left for the future [STATED; the future types NAMED-ONLY].
- One-cell rooms get one door where possible (1.3.0) [STATED].
- A "curtain" prop hangs over doors leading to secret passages (1.3.0) [STATED].
- Glyphs are a plain gap, a leaf rectangle across the gap, or a quarter-circle swing arc. The "Doors >" submenu and the D key ("toggle doors mode") switch the display; their modes are not listed [SHOWN + STATED key].
- The creator refuses wall or door editing because it is "conceptually messy. For example, if you remove a wall between two rooms, will they become one new room? This would affect labels, props (furniture), rooms connectivity" (itch 2025-01-21) [STATED].
- Every floor shown is connected. But connectivity says nothing about privacy or sense: users show a room reachable only through its two neighbours (`_comments-images/04`), a stairhall that serves only the basement yet takes the largest room (`_comments-images/02`), and upper floors reachable only through a secret passage (`_comments-images/03`) [SHOWN].

**Reconstruction for a re-implementer [INFERRED — reasoning given].**
1. **Cuts.** They follow grid lines, because every wall in every DW image lies on a cell edge. A "bend" on a grid is a one-step jog, which produces the many L-shaped rooms. The rectangle-only switch simply forbids the jog.
2. **Corridors** are the floor-plan analogue of NG's streets. The creator says the partition "resembles a pattern of streets". He speaks of corridors being "merged together", which presupposes that several corridor strips exist before merging. And 1-cell strips lying along earlier cuts are what the images show. So some cuts leave a one-cell strip that becomes corridor; adjacent strips are then merged into one network, which removes doorways between them. The "two corridors side by side" the creator dislikes is the failure of that merge.
3. **Tags.** `organic` probably favours bent cuts and `mechanical` straight ones, from the names and from the bend being the source of irregular rooms. Neither is described.
4. **Doors** probably come from a spanning structure over the room-adjacency graph with corridors as hubs, plus an occasional extra door. The images show exactly one door per room in most cases, rare loops, and pass-through rooms wherever a corridor did not reach.
5. **Size targets.** The stopping rule "small enough" is the only stated termination. Per-type average sizes enter only at assignment time (§2(e)), because the partition runs before any room is typed.

**What is missing for our function-first rung.** No step of this partition knows the programme; the creator says so (§2(e)). Castle in The Mist shows the sibling alternative of typing blocks by shape after cutting (rectangular blocks become halls). Neither sibling fits the partition to a required list of rooms.

### 2(d) Vertical links
**Five devices, in order of appearance.**

| device | since | rule as stated | as shown | grade |
|---|---|---|---|---|
| external spiral stair in a shaft | 1.0 | "If there is more than one floor, they are connected by an external staircase in a shaft. Such staircases look more interesting than regular ones AND they are easier to place" (`86436420`); kept in 1.1.0 "from time to time in high buildings"; requested by the `spiral` tag (a "stairs tag", itch 2026-06-30) | a round shaft about two cells across with a thick wall, radial treads round a central newel and a slit window, centred on a **convex corner vertex** of the plan so most of it lies outside the footprint, at the same place on every floor it serves; curved arrows outside the shaft (`86436420/03`, `88328982/05`, `96522502/03`, `111909860/03`, `_page-images/01, 05`); on the elevation it becomes a round tower with a conical roof and a weather vane (`96522502/03`, `111909860/04`) | STATED + SHOWN |
| regular stair inside the plan | 1.1.0 | "Their position and orientation is chosen in such a way that they are accessible and they don't obstruct movement across a floor ... A single staircase takes a whole cell of a floor, potentially breaking its topology. And it's not a teleporter, so both floors it is connecting need to be considered. Occasionally the generator fails to connect two floors. The easiest solution in such cases would be to scratch the whole building and create a new one, but for now I chose to ignore it to see how often this happens" (`86852618`) | one cell each: straight flight, quarter-turn with a landing, half-turn (U), or winder with fan treads; landings are omitted with Castle or Sci-fi walls (1.2.0); the arrow starts at a dot and "always point[s] upstairs" (1.2.0) | STATED + SHOWN |
| basement stair | 1.1.0 | "Basements are always connected with the ground floor by a regular staircase, even if upper floors are connected by a spiral staircase" | a separate cell from the upward stair on the ground floor | STATED + SHOWN |
| trapdoor | 1.3.3 | "When there is no space to spawn a regular staircase, a trapdoor is placed instead (looks like a crossed square)" (`112799146`) | not seen in a DW image; Taverns uses the same crossed square between kitchen and cellar | STATED (DW), SHOWN (Taverns) |
| stairwell | 1.4.0 | "Each pair of adjacent floors is connected independently and it's really hard to do this differently. As a result, the stairs connecting the ground and the 1st floors may be on the opposite side of the house from the stairs connecting the 1st and the 2nd. ... Using a new tag 'stairwell' it is now possible to request a stairwell which functions similarly to the 'external' spiral stairs: the stairs inside it, connecting all floors (except the basement), are placed one above the other. It also was harder to implement than it probably sounds, but it works. Almost without glitches..." (`143565705`) | `143565705/02`: one stair cell at the same grid position on GF, 1F and 2F, plus a separate basement stair elsewhere on GF | STATED + SHOWN |

**The per-pair rule, measured in three exports [SHOWN, measured].** In every multi-floor export the stair joining floors *k* and *k+1* occupies the same grid cell on both floors, and no other floor:
- `120395768/02`: the B–GF winder and the Kitchen winder share a cell; the GF Living-room winder and a 1F winder share a cell; the 1F Stairhall winder and a 2F winder share a cell.
- `121415691/04`: the same pattern — B Cellar = GF "SH" (stairhall), GF straight flight = 1F straight flight, 1F Lounge = 2F Conservatory.
- `111909860/03`: the B and GF winders share a cell.

Middle floors therefore carry two stair cells unless the stack is aligned by chance or by `stairwell`. A stacked cell shows arrows both ways.

**Where stairs sit.** Stairs sit inside ordinary rooms (Living room, Kitchen, Lounge, Conservatory) or in rooms labelled "Stairhall" (`118772106/02`, `120395768/02`, the users' `_comments-images/02, 04`) [SHOWN]. "Stairhall" is therefore a room type [INFERRED from its use as a label]. Users show the failure modes the creator names [SHOWN]:
- a stairhall occupying "the largest room in the house" for a basement stair;
- upper floors reachable only through a secret passage (`_comments-images/03`);
- a useless corridor that would work "if the stairs to the upper floor connected to it directly" (itch 2026-04-07).

**Interactions and loose ends.**
- The 1.3.3 fix of "the spiral staircase and the entrance overlapping" shows that shaft and entrance are placed independently and can collide [STATED + INFERRED].
- The stair tags force an extra floor (itch 2026-06-30) [STATED].
- A request for no stairs (magic elevators) got "Why would you need a house with unconnected floors?" and the blueprint workaround (itch 2025-06-05) [STATED].
- Marking the spiral position in the blueprint was announced in 1.3.3 and never reported [NAMED-ONLY].
- How often the floor connection fails, and whether 1.4.0 retries, is not stated [unknown].

**Lesson for a re-implementer [INFERRED].** DW treats stairs as a late patch on independently partitioned floors, and every stated stair problem follows from that order. Its two robust devices, the external shaft and the stairwell, both fix a vertical core before or outside the floor partitions. Taverns does the same: a fixed staircase position and a trapdoor under the kitchen (§3). For item 28's "stairs stacked across storeys", the vertical core (a tower, a stair hall or a stair cell) should be placed first as a constraint shared by all floors, and each floor partitioned around it.

### 2(e) Room roles
**The method in the creator's words.** "This generator works like this: first it creates floor plans made of rooms. Then it builds a list of room types this house needs: kitchen, bedrooms, armoury etc. It's always a reasonable list (e.g. there are as many bedrooms as there are floors). Then the generator tries to assign the room types from that list to the rooms of the house and here it often fails, because each room type has its requirements (e.g. a bedroom can't be placed in the basement)" (itch 2023-10-02) [STATED]. Restated in 2025: "To generate a house I first create a floor plan (or plans if it's a multi-storey buildings), a set of rooms of varying sizes. Then I try to assign them 'roles' - bathroom, kitchen etc. As a result, it may happen so that there is no suitable room to become a bathroom for example. There is a core set of 'roles', which my algorithm kind of tries harder to assign" (itch 2025-09-30) [STATED].

**The needs list.**
- Bedrooms: "trying to place as many bedrooms as there are floors. I don't think you need more than that" (itch 2023-09-01) [STATED].
- Special rooms (1.0.1): "Special rooms are only spawned if the house name requires them. For example, the 'Armoury' can only be spawned in a knight's or adventurer's house" [STATED]. This grew from 1.0, where the title (e.g. "Lonely Knight's Residence") was only printed to the browser console and "should have an armoury" [STATED].
- The name is drawn first and drives the programme [INFERRED from "only spawned if the house name requires them"].
- Name sets changed in 1.3.1: out went "Grumpy Witch's House" and "Mansion of a Paranoid Priest", in came "less silly" ones such as "Haunted Manor" and "Cottage on the Hill" [STATED]. "Desert Residence" is shown (`_page-images/03`) [SHOWN].
- A user who edited the page's script reports a naming file called `grammar.json` (itch 2023-10-04) [STATED by user, unverified; not opened here].

**Assignment.**
- 1.3.0: "The generator performs multiple attempts to assign room types and the best attempt gets accepted. ... The room types are separated into primary (more important) ones and secondary ones. As a result, houses with a library, but without a living room or a bedroom ... are produced more rarely" (`96522502`) [STATED]. The number of attempts and the score are not stated [unknown].
- "If a room is not assigned a specific room type, it is assigned one of the generic types - 'room' or 'corridor'" (1.3.0) [STATED], so a finished house can lack a type from its list.
- Ctrl+Enter re-runs assignment on the same geometry (1.0.1 onwards) [STATED]; the creator's advice when bedrooms are missing is to press it (itch 2023-09-01) [STATED].

**A room type is a record, not a name** (itch 2024-04-30): "each room type is not just a name, but also its average size, how regularly shaped it should be, how many windows it requires etc..." [STATED]. The attributes stated anywhere:

| attribute | statement | source |
|---|---|---|
| average size | ordinal, not metric: "the goal wasn't to make the bathroom 10 times smaller than the bedroom ... but just to make the bathroom the smallest room and the ballroom the largest" | itch 2025-09-22 [STATED] |
| shape regularity | "how regularly shaped it should be" | itch 2024-04-30 [STATED] |
| windows | "some room types can request a specific number of windows ... greenhouses and lookouts will receive as many windows as possible, bedrooms will have some and storages won't have any" | 1.1.0 [STATED] |
| doors | bedrooms at most one door (1.0); "some rooms (e.g. bathrooms and libraries) request actual doors and the rest will have empty doorways" (1.1.0) | [STATED] |
| floor restriction | kitchens "always situated on the ground floor" (1.0); bedrooms not in the basement (2023-10-02); "Most room types cannot be placed underground" (1.1.0) | [STATED] |
| priority | primary vs secondary (1.3.0); "core set of 'roles'" tried harder (2025) | [STATED] |
| adjacency | "Bathrooms often get attached to bedrooms now" (1.3.0) — the only adjacency preference stated | [STATED] |
| props | statues in galleries, studios, trophy rooms (1.2.0); altar in chapels (1.3.0); per-room furniture parameters (1.3.6) | [STATED] |
| name condition | special types require the house name | 1.0.1 [STATED] |

**Room-type inventory** (every name found in these sources; the stated rules are in the attribute table above).
- Named in text [STATED]: kitchen, bathroom, bedroom, living room, library, armoury, greenhouse, lookout, storage, cellar, laboratory, gallery, studio, trophy room, chapel, attic, secret passage, corridor, room, ballroom.
- Planned but not shown: cloakroom, aviary, harem, crypt, torture chamber [NAMED-ONLY].
- On plans only [SHOWN]: Hall, Observatory, Study, Parlour, Workshop, Stairhall (abbreviated "SH"), Hall of Armour, Grand Foyer, Laundry. "BTH" is used for one-cell bathrooms.
- Named by a user: Lounge, alongside armoury, gallery, kitchen and two bathrooms (itch 2023-10-02).
- Gothic set (1.3.7, "Rooms > Gothic", "experimental ... far from perfect"; 1.3.6 promised "*ballroom*, *crypt* and *torture chamber*") [STATED]. Shown in `121415691/04`: Anatomical theatre (in the basement), Menagerie, Theater, Ritual room, Conservatory, Music room, Pantry, Lounge, Library, Kitchen, Storage, Cellar, Hall, Bedroom [SHOWN].
- Tavern names from the Tiny Pubs hand-off: Dormitory, Common room (`158074424/03`) [SHOWN].

**Where it fails, as users report** [STATED by users]:
- "A 3 floor house without a bedroom?" (2023-08-08).
- A two-storey "Noble's House" with two bathrooms and no bedroom, and a large three-storey slab with one bedroom (2023-10-02).
- "4 houses in a row with nary a toilet in sight" (2025-09-29).

The creator's diagnosis is the plan-first order itself: "the method I use is not suitable for this"; a tag per room type "doesn't sound like an elegant solution"; "you can take any other room and rename it" (itch 2025-09-30) [STATED]. Typed buildings were blocked for the same reason: "I don't know how to do it gracefully, without hardcoding those building types" (1.3.0). His later fix was a separate generator (§3) [STATED].

**Labels.**
- To 1.2: external, handwritten, with curved arrows. 1.1.0 kept them off the plan and reduced crossings [STATED + SHOWN].
- From 1.3.0: inside the rooms, which "fill empty space inside" [STATED]. They are scaled to the room, rotated 90° in tall narrow rooms, and abbreviated when small ("BTH", "SH") [SHOWN].
- Rooms can be renamed by clicking the label, the only edit ("the only thing you can edit is the names of the rooms", 1.4.0) [STATED].
- Labels can be replaced by numbers (Layers > Labels > Numbers, "This may become useful later") [STATED]. In `_page-images/01`, room 1 is the entrance room and the numbers climb through adjacent rooms, which looks like a traversal from the entrance [SHOWN; ordering rule INFERRED].

**Lesson for a function-first rung [INFERRED].** DW's type record (size rank, regularity, window and door demand, floor restriction, priority, adjacency hint) is a usable starting schema for the room-programme column of item 28. What DW lacks is the inversion: sizing and placing the programme before or during partition.

### 2(f) Entrance
**One entrance per house** in every image, drawn as external steps (three to six treads) outside a gap in the outer wall, with an arrow outside pointing in from 1.2.0 on [SHOWN]. The ground-floor steps are redrawn as an outline on the upper floors (`111909860/03`, `120395768/02`) [SHOWN].
- The entrance usually opens into a room labelled Hall or Grand Foyer. It can also open into a Kitchen (`96522502/04`) or a Living room (`120395768/02`), so it is not reserved for circulation space [SHOWN].
- A marked entrance may sit inside a one-cell notch between two wings (`143036785/04`) [SHOWN].

**Rules over time.**
- 1.0–1.2: the rule is not stated [unknown].
- 1.3.0: "Entrance location is chosen differently now to avoid the longest wall of a building." It is listed under changes made "to produce houses with better looking (more interesting) elevations" [STATED]. The front elevation is drawn from the entrance side (1.3.0: "the entrance on an elevation is always where it should be according to the floor plan"). So the rule gives a narrower, taller, Tiny-Pubs-like front [INFERRED].
- **Evidence check:** in `112799146/03` (1.3.3) the entrance sits on the plan's single longest straight wall, the unbroken bottom run of about 5.7 cells [SHOWN, measured]. That side is still shorter than the plan's height (about 6.7 cells), so the image fits "wall" meaning the longest façade side rather than the longest straight segment. Or the rule is a preference, not a ban [INFERRED; the stated rule is ambiguous].
- 1.3.3: "it is not possible to specify where the entrance to a building should be - this feature will be added" [STATED]. The same release fixed the spiral stair overlapping the entrance [STATED].
- 1.3.8: entrance marked in the blueprint with Shift, saved in permalinks, meant for MFCG/VG/UP, not yet wired on their side (§2(a)) [STATED].

**Back doors and extra entrances were never delivered.**
- "Back doors might be great" → "Yeah, back doors are on my list" (itch 2023-09-01) [STATED].
- "Additional external doors" → "Agree" (itch 2025-09-22) [STATED].
- "More than one entrance" is a "may want" (1.3.8) [NAMED-ONLY].
- No rule is stated for which room receives the entrance [unknown].

**Taverns contrast:**
- Taverns 1.0 promised a "Back door (in the kitchen) and separate entrance to the basement from the outside" (`158074424`).
- 1.1.0 shipped the cellar door, "usually located on the opposite side of the building from the entrance to the tavern itself" (`159559624`) [STATED].
- It is drawn as a pair of bulkhead leaves outside the wall (`159559624/02`, `1643499/01`) [SHOWN].

### 2(g) Windows
**Rules over time.**
- **1.0:** geometry only. 1.1.0 says of the previous version that "room geometry was taken into account when windows were spawned, but not its type" [STATED].
- **1.1.0:** type demand with a cap. "Some room types can request a specific number of windows (although of course a room can't have more windows than its amount of outer walls). For example, greenhouses and lookouts will receive as many windows as possible, bedrooms will have some and storages won't have any windows" [STATED].
  - In the images a window never exceeds one per cell edge of exterior wall, which suggests "outer walls" are counted in cell edges [SHOWN; unit INFERRED].
  - Interior rooms, such as the one-cell "BTH" in `112799146/03`, have none [SHOWN].
- **1.2.0 tags.** `transparent` and `blank` are in the tag list. The creator's own screenshot shows the description toast "As many windows as possible." after a Shift+click (`_comments-images/06`) [SHOWN]. The tag it belongs to is not visible; `transparent` is the name that fits. `blank`, in the architectural sense of a windowless "blank wall", would then be its opposite; the creator offers it as an optional ingredient of a tower [INFERRED on both].
- **1.3.0:** "It turned out that buildings got too few windows before. It's fixed now" [STATED].
- **1.3.1:** "fewer windows on lower floors, mainly to make high buildings look more like castles, less like skyscrapers. It's almost unnoticeable in normal 2-3-storey high houses" [STATED].
- **Light and shade:** AO shadows were made "thinner around windows" in 1.3.5. In 1.3.8, "AO was lighter around windows. It's not anymore" [STATED].

**Basements** have no windows in any image [SHOWN]; whether this is a rule or a consequence of "storage/cellar" types is not stated [unknown].

**Plan–elevation agreement:** "If there is a window on a plan, there will be a window in the appropriate place on the elevation view, but their sizes will not coincide. ... This is not something I'm planning to fix" (1.3.0) [STATED]. The "fortified" elevation option makes windows "narrower and overall smaller" without changing the plan (1.3.1) [STATED].

**Glyph by style** [SHOWN]:
- a white slot across the wall (grey/plain);
- three thin parallel lines (the 2023 WIP);
- a darker or lighter block set inside the wall thickness (Natural, Wooden);
- in Taverns, a double-line slot.

Windows are typically one per cell along an exterior run, and are absent at corners [SHOWN].

### 2(h) Furniture
**History** [STATED unless marked]:

| when | what | source |
|---|---|---|
| 2023-07 WIP | abstract wall-hugging outlines already sit in the WIP plans (`86093774/04`) | [SHOWN] |
| 1.0 (2023-07-21) | "I tried that but I couldn't make tiny rectangles and circles look good. So I'll try again." | `86436420` |
| 1.1.0 | "I didn't have time to implement *props* (furniture, statues etc.)" | `86852618` |
| 1.2.0 | a "props system" places "objects inside a house"; "it's hard to make placed objects look good, especially since I want to use the same 'sprites' for both schematic and pictorial plans. So for now statues are the only type of objects" — statues go in Galleries, Studios and Trophy rooms | `88328982` |
| 1.3.0 | labels inside rooms "fill empty space inside. As a result, I don't need to implement furniture"; new props: an altar in chapels, a curtain over doors to secret passages | `96522502` |
| 2025-01-30 | the star is a "'statue', one of three special symbols (the other two are 'altar' and 'tapestry'). I'll probably remove all of them in the next update in favour 'abstract furniture'" | itch reply |
| 1.3.6 | **abstract furniture** (below) | `120395768` |
| 1.3.7 | "objects are much less likely to block doorways and stairs" | `121415691` |
| 1.3.8 | statues and altars still exist ("Unless there is a statue or altar. In this case the light is placed right on them") — the announced removal did not happen, at least not fully | `143036785` |

**Abstract furniture, as specified (1.3.6)** [STATED]:
- **Why:** "When the generator was first created, I planned to fill the rooms with images of real furniture depending on the purpose of each room - tables, armchairs, chests etc. Later I realised that this way it would be to difficult to expand the list of available rooms, let alone allow adding custom ones. Unfortunately, no amount of light sources, shadows, annotations could make empty rooms look not empty. So now I decided to try again here the trick with abstract furniture from my 'Dark Clues' game."
- **Shapes and placement:** "Abstract furniture is made of random shapes, rectangles and circles. Usually, Individual pieces are aligned to the walls and pushed against them, but sometimes they are placed in the centre of a room and rotated for more organic or chaotic look."
- **Per-room variation:** "Each room uses slightly different parameters for spawning furniture (density, size, tendency to be pressed against a wall) to make it less uniform."
- **Known issues:** "Individual pieces often look bad"; "Sometimes objects block doorways and stairs"; "Abstract furniture clashes with 'special objects' - statues, altars and tapestries."

**The creator's view on specific furniture** (itch 2025-09-22) [STATED]. He chose "abstract shapes instead for two reasons: first, creating a meaningful layout of specific furniture items is a non-trivial task by itself, I can't just scatter beds and chairs randomly. Second, I want to keep the generator somewhat 'setting-agnostic' and there is no such thing as a setting-agnostic table :)". A user asked for top-down furniture libraries "selected for genre/room type" (same thread) [STATED by user].

**As shown** [SHOWN] (`120395768/02`, `143036785/03`, `143565705/02`, `_page-images/01`, `_comments-images/05`):
- **Pieces:** pale rectangles, often with an inset rectangle; stepped compound rectangles; small circles; mostly against walls; the occasional rotated piece mid-room.
- **Type cues exist despite the abstraction:** barrel-like circles in cellars (`120395768/02`); clusters of overlapping circles as plants in the Conservatory and Greenhouse (`121415691/04`, `143565705/02`); a statue as a star in a circle; an altar; a curtain as a wavy line along a wall.
- P toggles props (shortcut list) [STATED].

**Contrast with Taverns** [SHOWN `158074424/04`, `159559624/02`, `1643499/01`, taverns `_page-images/01`]. Taverns, with its fixed programme, draws concrete furniture:
- beds with a pillow line;
- tables with two to four round chairs;
- barrels and crates;
- columns on cell vertices in the cellar;
- a hearth glyph set into the wall;
- a counter;
- a closet chair.

Concrete furniture becomes tractable once the room's function is fixed in advance — which is the creator's first reason stated in reverse [INFERRED]. For item 28 ("furniture as abstract shapes by room role"), DW's per-room parameters (density, size, wall affinity) plus a few type-cued glyphs are the documented baseline. A no-blocking rule for doorways and stair cells is required from day one; DW added it late [INFERRED].

### 2(i) Lighting, ambient occlusion, elevation
**Vector ambient occlusion ("inner shading", 1.2.0).**
- What it is: "an AO-like effect, a dark inner glow inside rooms."
- Why vector: "Normally, I would implement it using some kind of bitmap filter ... but I wanted it to be exportable as SVG and this means that the effect needs to be vector in nature (SVG filters scary me). In the end, the inner shading was implemented as a set of shapes filled with semi-transparent gradients and it works surprisingly well" (`88328982`) [STATED].
- Controls: opacity in the Style dialog; off via Layers > AO or O [STATED].
- Changes: 1.3.5 drew AO "differently now and the shadows are made thinner around windows" [STATED]. 1.3.8 made AO "'softer', darker close to the walls, but thinning quicker further away from them", no longer lighter at windows, and "not applied around doorways" [STATED].
- The shape set is most plausibly one gradient strip per wall segment with its gradient running inward, interrupted at doorways [INFERRED from the SVG constraint and the doorway/window exceptions].

**Room lights (1.3.5; reworked 1.3.8).**
- 1.3.5: "light sources are now spawned in every room/corridor. Their size, position and individual intensity are not random, but are the result of overcomplicated calculations that I'll probably need to adjust. Like the ambient occlusion, light sources are there not for realism, but to make room shapes more readable." Overall strength is in the Style dialog (zero for the Plain and Black&white styles); L toggles [STATED].
- 1.3.8: "Room lights used to be placed at the walls. Now each of them is placed in the centre of the room or in the centre of its most spacious part. ...Unless there is a statue or altar. In this case the light is placed right on them." Gradients smoother; "switched on and off for each room individually by shift+clicking it" [STATED].
- 1.4.0: "lights in the corridors are off by default"; "Ctrl+click a room to 'highlight' it - all the lights on the floor except the one in this room will be turned off" [STATED].
- Drawn as warm radial pools (`118772106/02`, `143036785/03`, `143565705/02`) [SHOWN].
- "Most spacious part" suggests the centre of the largest inscribed square or circle of the room [INFERRED].

**Elevation (1.3.0 → 1.4.1).**
- 1.3.0 purpose: "to allow a building to be viewed as a single physical object rather than a somewhat disconnected set of floor plans"; front only at first [STATED].
- Construction: "each elevation is a stack of building sections drawn as those pub facades. Sections further away are drawn slightly faded to create a sort of 'distance fog' - this effect can be disabled" [STATED]. The code base is Tiny Pubs ("based on the code of Tiny Pubs", itch 2024-01-03) [STATED].
- Plan agreement: "the entrance on an elevation is always where it should be according to the floor plan, but the stairs leading to it may look different. If there is a window on a plan, there will be a window in the appropriate place on the elevation view, but their sizes will not coincide. And so on. This is not something I'm planning to fix" [STATED].
- 1.3.1: PNG/SVG export; generate new houses from this view; side and rear elevations with ←/→ ("some elements are not drawn consistently, most notably dormers and chimneys"); "fortified" adds crenellations and narrows windows [STATED].
- 1.3.2: elevations use the plan style's colours; the fachwerk option comes over from Tiny Pubs ("still not varied enough") [STATED].
- 1.3.3: Colorized → Dark; "Towers now look a little nicer"; presets 1–5 [STATED]. 1.3.4: minor improvements [STATED].
- 1.4.1: the roof colour is shared with the elevation unless Dark [STATED].
- Keys in this view: ←/→ rotate; E/Esc back to plans; B blueprint; R reroll style; F fading; D dark mode (`567246`) [STATED]. A selector "L F R B" picks the side (`_page-images/04`) [SHOWN].
- As shown (`96522502/03`, `97493516/02`, `111909860/04`, `112799146/04`, `_page-images/03, 04`) [SHOWN]:
  - a row of sections of different heights and widths, with hipped roofs hatched in horizontal dashes and set-back sections fainter; whether each section is one plan block is not stated [unknown];
  - the spiral shaft as a round tower with a conical or spired roof and a weather vane;
  - dormers on large roofs; chimneys;
  - a planked or arched door with lantern(s) above steps set into a coursed-stone plinth;
  - windows in rows per storey (cross-mullioned or arched);
  - dash-dot floor-level lines across façades;
  - grass tufts on a dash-dot ground line;
  - a house-name pill under the drawing.
- The elevation shows hipped roofs and gabled dormers even before plan roofs existed. So the elevation's roof form came from Tiny Pubs, not from the plan's roof model [SHOWN + INFERRED].

For item 28 the useful rule is DW's positional contract: entrance and window positions shared between plan and elevation, sizes free [STATED]. Our exterior rung would supply roofs and dormers and the plan would inherit them, the reverse of DW, where the elevation inherits from the plan [INFERRED].

### 2(j) Roofs
**Before 1.4.1: roofs as context only.** From 1.0.1 each upper floor shows the uncovered parts of the floor below. A user noticed: "I like that the upper floors show the outline of the lower floors" (Patreon comment on `86635425`) [STATED by user]. They are drawn as thin outlines with short diagonal hip strokes at the free corners (`96522502/03`, `111909860/03`, `120395768/02`, `121415691/04`) [SHOWN]. So a hip-roof reading of lower storeys existed well before 1.4.1 [SHOWN].

**Origin of 1.4.1.** The PROCJAM 2025 remake of Fantasy Manor was abandoned as "a boring idea": "I transferred the progress I made to Dwellings, so in the next update there will be nicer looking roofs" (`144816210`) [STATED].

**1.4.1 as stated** (`145140009`) [STATED]:
- Modes: "3 modes in the *Roofs* submenu: *Simple*, *Detailed* and *Hidden*. *Detailed* roofs are selected by default." "Choose *Simple* roofs to focus on the interior of the house. *Hidden* roofs are there for completeness."
- Effects: "When detailed roofs are selected, you can also enable/disable 3 additional effects: *Shade*, *Fade* and *Shrink*, all enabled by default. All three ... are designed to make detailed roofs look more three-dimensional. The fading option can also be applied to simple roofs."
- Whole-building view: "you see the roof of the whole building by clicking the button *R* of the floor selector."
- Colour: set in the Style dialog and shared with the elevation unless Dark is on.
- Chimneys: "One or more chimneys are spawned on the roof. Their position is not affected by the rooms below them."
- Not done: "In the future, it would be interesting to implement gable roofs and other roof materials in addition to tiles (e.g. thatched roofs or turf roofs)" [NAMED-ONLY].

**1.4.1 as shown** (`145140009/02`: an upper floor, left; the whole-building roof, right) [SHOWN]:
- **Geometry.** Every roof is a hip roof; there are no gables. Hips run at 45° from every convex corner, valleys from every reflex corner, and ridges along the long axes.
  - Where a narrow wing meets a wider block, its ridge ends at the point where the two valleys from the junction's reflex corners meet.
  - Ridges jog where the outline steps.
  - These are the lines a straight-skeleton hip roof of the whole storey outline produces. Separate per-rectangle roofs would leave a hip end drawn at each junction [INFERRED from the drawn geometry].
  - The creator had a straight-skeleton implementation by April 2024: MFCG 0.11.1 curved labels are "based on the idea of straight skeleton", linking a post on it (`102377277`) [STATED].
- **Levels.** A lower level's roof is drawn paler (Fade) under the higher ones. One faded lower roof has its ridge running on under the higher block, so each level appears to be roofed over its full outline and painted bottom-up, higher levels over lower [INFERRED from that ridge].
  - vs manor.md §2.10(6), "hip roofs per block": this refines it to "per storey outline, levels painted bottom-up", not per rectangle.
- **Facets.** Each facet takes a tone by orientation (the Shade effect, read from the name and the tone differences) [SHOWN tones; mapping INFERRED].
  - Tiles are dashed lines running down the slope, perpendicular to each facet's eave, so the dash direction turns with the facet.
  - Hips and ridges are drawn as thick bead lines of rounded ridge tiles, ending in round knobs at eave corners.
- **Other roof elements.**
  - The external stair shaft gets a conical roof of radial dashes in three concentric bands with a centre point, drawn over the main roof.
  - Two chimneys are square light boxes with a dark flue, one on a faded lower roof and one on the main roof.
  - Roof edges coincide with the outer wall faces; no overhang is visible.
  - The entrance steps and their arrow stay visible beside the roof.
- **On the plan.** On the upper-floor plan the lower parts appear as tiled roofs beside the walls, one of them carrying a chimney.
- **Shrink.** Its effect is not identifiable in the image [unknown].

For item 28 this is the one documented model of "roof from plan": hip everything, per storey, chimneys independent of rooms. Item 28 asks for the opposite coherence: chimneys over hearths, dormers over upper rooms, a tower as a round room. DW gives no precedent for either [INFERRED].

### 2(k) Exports
| format | since | what is stated | source |
|---|---|---|---|
| SVG, one floor | 1.0.1 | "Individual floors can be exported as SVG"; 1.2.0: "Bounds for plans exported as SVG are calculated more correctly"; AO kept vector so it survives SVG | `86635425`, `88328982` [STATED] |
| PNG | 1.2.0 | "PNG export is added" | `88328982` [STATED] |
| elevation PNG/SVG | 1.3.1 | "Elevations can be exported as PNG or SVG images now" | `97493516` [STATED] |
| Advanced (multi-floor) | 1.3.2 | the menu item "Advanced..." under "Export as"; arrange floors "as a row of 3 plans, a column of 3 plans or a 2x2 table"; set "the cell size, which can be useful with VTT" | `111909860` [STATED] |
| Advanced, revised | 1.3.6 | a bug that dropped the walls of all floors but the last is fixed ("I only received one report ... very few people use the feature"); a range of floors; "export only some layers" (list collapsed by default); X opens the Export dialog | `120395768`, itch 2025-01-12/18 [STATED] |
| JSON | 1.4.0 | new item "as JSON" in the Export submenu (below) | `143565705` [STATED] |

**JSON export: everything the sources say.** No field, key, unit or example file is given anywhere in these sources.
- Before release: "with multiple floors and 'thin' walls it's much less obvious how to export these plans (that is compared to dungeons)" (itch 2025-01-24) [STATED].
- Before release: "the upcoming JSON export will provide enough data to easily reconstruct the graph of each floor (and the entire house)", answering a request for "a graph-style representation ... rooms are nodes with attributes, edges exist where rooms connect" (itch 2025-11-12) [STATED].
- Release: "this is exactly **exporting** a house, **not saving** it, because you can't load it back. In this case, loading wouldn't be hard to implement, but I don't think it's necessary, as currently the only thing you can edit is the names of the rooms. You only need the feature if you want to import these json files in your own tools ... I think the structure of the files is fairly self-explanatory, but feel free to ask me any questions" (`143565705`) [STATED].
- Testing: "I only had time for a basic testing utility, but maybe I'll make a 3D viewer (or something) later" [STATED]; 1.3.8 had announced a "very simple 3D viewer of all these rooms, doors and stairs" to test JSON [NAMED-ONLY].
- After release: "There is no import feature ... Implementing the import wouldn't be difficult, but I don't think it's really necessary, as the generator doesn't allow much editing" (itch 2025-12-07); "right now Dwellings can't even import its own jsons let alone files from other generators" (Taverns itch, 2026-06-11) [STATED].
- The creator's own list of what the JSON must carry is rooms, doors and stairs (the 1.3.8 viewer plan) plus enough to rebuild per-floor and whole-house graphs [STATED]; walls, windows, room types, furniture, lights, roofs and the grid unit are not mentioned [unknown].
- The house graph across floors needs the stairs to name the two rooms they join [INFERRED].

**What was declined or deferred** [STATED]:
- Universal VTT: "Maybe, but definitely not in the next update" (2023-08-23).
- VTT in general: "None of my generators support any VTT export because VTT is another thing I personally don't use. But yes, that's on my list" (2025-09-22).
- roll20: use "Align to Grid" or Advanced export with "Dots per cell" equal to roll20's cell size (2024-10-07).
- PDF of all floors: "on my list (but probably not exactly like this)" (2024-07-09).
- Dungeon Alchemist: "I can't find any info about what it can import" (2024-09-26).
- AI-authored JSON import: "why do you even need this generator?" (2026-04-21).

**Taverns exports** for contrast (`_page.md`, `159559624`, `1643499`) [STATED]:
- X: current floor as PNG; Shift+X: whole tavern as PNG.
- V: current floor as SVG; Shift+V: whole tavern as SVG.
- Single floors are exported "with a fixed resolution of 300 pixels per square".

### 2(l) Tags
Tags are chosen in the Tags dialog from the context menu (1.2.0). The dialog footnote reads "* Shift+click a tag to learn its effect.", and the dialog has "Generate" and "Random" buttons; chosen tags sit in a well above the pool (`_comments-images/06`, 2023-08-31) [SHOWN]. Tags travel in the permalink as `tags=a,b` [STATED]. The context menus in `118772106/02` (1.3.5) and `_page-images/02` list "Parameters..." and no "Tags" item; it probably opens the tags together with the "Number of floors" drop-down [SHOWN menu; content INFERRED].

| tag | lifetime | meaning and parameters it changes | grade |
|---|---|---|---|
| `small`, `medium`, `large` | 1.2.0 → | size of the ground plan; there is no `huge`: "My algorithm tends to produce very unrealistic plans for buildings larger than 'large', and I wouldn't like to expose it" (itch 2024-09-27) | STATED names + refusal; the size numbers are unknown |
| `1 floor`, `2 floors`, `3 floors` | 1.2.0 → removed 1.3.2 | number of floors; from 1.3.1 `3 floors` means "3 or more floors" | STATED |
| `low`, `tall` | 1.3.2 → | replace the floor tags ("Alternatively, you can use the new 'Number of floors' drop-down") | STATED; the floor ranges are unknown |
| `basement` | 1.2.0 → | requests a basement | name STATED ("e.g. small, basement"); semantics INFERRED |
| `slab` | 1.2.0 → | very probably equal floors (no upper-floor shrinking), from the creator's use of "slab-like" for unshrunk houses | name SHOWN; INFERRED |
| `square` | 1.2.0 → | very probably a square ground plan; offered for towers with `3 floors` + `small` | name SHOWN; INFERRED |
| `blank` | 1.2.0 → | optional for towers; most plausibly few or no windows ("blank wall"), the opposite of `transparent` | name SHOWN; INFERRED |
| `transparent` | 1.2.0 → | most plausibly "As many windows as possible." (the toast in the creator's screenshot) | toast SHOWN; the tag it belongs to INFERRED |
| `spiral` | 1.2.0 → | requests the external spiral staircase; a "stairs tag" that adds a floor so the stair "can lead somewhere" | STATED (itch 2026-06-30) |
| `organic`, `mechanical` | 1.3.0 → | "affect the way a floor gets partitioned"; probably bent versus straight cuts | STATED effect; direction INFERRED |
| `regular` | ? → removed 1.4.0 | "for requesting strictly rectangular rooms"; not in the 2023-08-31 dialog, so added between 1.2.x and 1.4.0 without an announcement | STATED; introduction date unknown |
| `spacious` | 1.3.8 → removed 1.4.0 (became default) | fewer "hallways, nooks, tiny rooms"; "simpler shapes ... more regularly aligned" | STATED |
| `hallways` | 1.4.0 → | "a house with a lot of corridors" (the pre-1.4.0 default made explicit) | STATED |
| `stairwell` | 1.4.0 → | stacks the stairs of all above-ground floors one above the other; a "stairs tag" that adds a floor | STATED |

**Announced, never reported done** [NAMED-ONLY]:
- a tag to prevent corridors "from spawning entirely" (itch 2025-04-01), which the creator may have considered covered by `spacious`;
- a tag to request "more connected plans" with loops (itch 2025-12-18);
- a tag to prevent basements (itch 2026-06-30);
- a "normality" slider (itch 2026-04-10).

Tags a user asked for and did not get [STATED by user]: apartments (2026-04-12); `huge` (2024-09-27; declined); `tiny`/`huge` added by a user editing the script, which "hangs" (2023-10-04).

**What tags cannot express** [STATED]: specific rooms ("creating a tag or a checkbox for each room type doesn't sound like an elegant solution", 2025-09-30) and building type (1.3.0; §3). The Gothic room set is a context-menu option ("Rooms > Gothic"), not a tag (`121415691`).

### 2(m) Keyboard shortcuts and restrictive rerolls
**The complete list as published** (itch devlog `567246`, the only full-text DW devlog, edited up to at least 1.3.8) [STATED]:

| view | key | action |
|---|---|---|
| plan | Enter | generate a new house |
| plan | Shift+Enter | reroll floors |
| plan | Ctrl+Enter | reroll rooms |
| plan | ↑ ↓ (or ← →) | switch floors |
| plan | Space | display house name |
| plan | E / B / T / S | elevation / blueprint editor / Tags dialog / Style dialog |
| plan | G, Shift+G, Ctrl+G | grid mode, grid visibility, grid size |
| plan | D | doors mode |
| plan | L, A, P, R, O | lights, stair arrows, props, room labels, AO |
| plan | 1–5 | colour scheme |
| plan | 6, 7, 8, 9, 0 | walls style |
| elevation | ← → | rotate elevation |
| elevation | E or Esc / B | back to floor plans / blueprint editor |
| elevation | R / F / D | reroll style / fading / dark mode |
| blueprint | Enter / B or Esc / Backspace | submit / discard / clear |
| blueprint | R / X | random shape / random rectangle |
| blueprint | Shift (hold) | mark the entrance location |

**Not in the list but stated elsewhere** [STATED]:
- X opens the Export dialog (1.3.6);
- Shift+click a room toggles its light (1.3.8);
- Ctrl+click a room highlights it by turning the floor's other lights off (1.4.0);
- clicking a label renames the room (1.3.0);
- the floor selector's R button shows the whole roof (1.4.1);
- touch: tap generates, touch-and-hold opens the menu (1.0.1).

The creator: the shortcuts "don't cover the full functionality of the generator anyway" (itch 2026-05-05) [STATED]. Menu-only options include Rooms > Gothic, Roofs submenu, Layers > Labels > Numbers, Export as, Advanced..., Permalink..., Fullscreen, Procgen Arcana (`_page-images/02`, `118772106/02`, `121415691`, `145140009`) [SHOWN + STATED]. Five colour schemes and five wall styles are bound to keys. The named styles are Plain, Natural, Blueprint, Wooden (replacing Antique), Black and white and Dark; the named walls are Castle, Sci-fi and Log house. Which key maps to which is not stated [STATED names; mapping unknown].

**Restrictive rerolls: what each re-rolls and what it keeps.**

| action | re-rolls | keeps | source and grade |
|---|---|---|---|
| Enter | everything: plan, floors, partition, stairs, name, roles, furniture, lights | settings (persistent since 1.0.1); whether chosen tags persist is not stated | `567246`, `86635425` [STATED] |
| Shift+Enter ("reroll floors") | "the inner walls" | "the ground plan, number of floors etc." | itch 2026-04-07 [STATED] |
| Ctrl+Enter ("reroll rooms") | "the room labels, so it can turn a Hall into a Kitchen" | "all the geometry" | itch 2026-04-07; 1.0.1 "force the generator to reassign room types" [STATED] |
| elevation R | the elevation style | the building | `567246` [STATED] |
| per-floor reroll | — (not available) | — | "the ability to reroll individual floors could be useful and not to difficult to implement" (itch 2026-09-16) [NAMED-ONLY] |

**Open edges of the stated contracts** [INFERRED unless marked]:
- **Shift+Enter** says "inner walls". So each floor's outline and the basement outline are probably kept and only partitions are redrawn, but "etc." leaves this unstated. Stairs sit inside the partitions and so are presumably re-placed.
- **Ctrl+Enter** keeps "all the geometry", but three things depend on room type: windows (1.1.0), actual doors versus doorways (1.1.0), and furniture parameters (1.3.6). The sources do not say whether Ctrl+Enter re-runs window and door placement, keeps them, or re-draws furniture [unknown].
- **The house name** drives special rooms (1.0.1), and it is not stated whether Ctrl+Enter keeps it [unknown].
- **Permalinks after a reroll:** whether a partial reroll can be re-created from the URL is not stated (§2(n)) [unknown].

For item 28, the stated pair — walls re-rolled without touching the outline, labels re-rolled without touching walls — matches the amendment's "re-rolling the plan never changes the exterior; re-rolling the room roles never moves a wall" [STATED match].

### 2(n) Determinism and seeds
- **There is a seed.** DW has permalinks from 1.3.2 ("they work the same here as in my other generators", `111909860`) [STATED]. The one full example carries `seed=1341473638` and `tags=large,slab` (itch 2025-12-18) [STATED]. PM had them from 2.1.2 (manor.md §6) [STATED].
- **What reproduces a house:** seed + tags, plus the passed or drawn ground plan and the marked entrance [STATED]. Settings are "made persistent" in the browser (1.0.1) [STATED], so style, grid, layers and the room set may or may not be in the URL [unknown].
- **Room renames** are "the only thing you can edit" (1.4.0). Whether they persist in permalinks is not stated [unknown]. In MFCG "No manual changes made to a map are encoded into its URL (apart from the city name)" (`102377277`) [STATED for MFCG].
- **Stability across versions is never promised.** One MFCG user reports that a re-pasted permalink "subtly changed the city geometry" (`102377277`, 2024-04-20) [STATED by user, MFCG]. No DW statement either way [unknown].
- **The DW example permalink is a test case.** It dates from 1.4.x and is given as a plan that contains a loop. If the capture lane opens it on today's build, a loop present means the build reproduces the creator's house; a loop absent means it does not [INFERRED].
- **Rerolls imply separate random streams.** Shift+Enter keeps the plan and redraws walls; Ctrl+Enter keeps geometry and redraws labels. So partition and assignment draw from their own streams, or from sub-seeds of the house seed [INFERRED]. Whether those sub-seeds reach the URL is unstated [unknown].
- **Assignment and furniture are stochastic.** Assignment runs "multiple attempts" (1.3.0) and furniture uses "random shapes" (1.3.6), both inside the same seeded run [STATED + INFERRED].

### 2(o) Scale
- **The creator states none.** "Each house's area is not large, but there is no explicit scale, so it's pretty subjective" (1.0) [STATED].
  - "To be honest, I don't know what scale this is, since I don't use these maps as battle maps (I don't use battle maps at all). It's difficult to keep proportions right on a fixed grid, so the goal wasn't to make the bathroom 10 times smaller than the bedroom and the bedroom 10 times smaller than the ballroom, but just to make the bathroom the smallest room and the ballroom the largest" (itch 2025-09-22) [STATED].
  - For PM, "Dimensions are a mess in all my generators" (manor.md §2.9) [STATED].
- **Users bracket it.** On a 5-ft grid "some of the rooms come across a bit small", while on a 10-ft grid "corridors and rooms that should be small (I'm looking at you bathrooms), would be rather large" (itch 2025-09-21) [STATED by user]. Another user could not fit plans to roll20's grid (itch 2024-10-05) [STATED by user].
- **The grid can be restyled and resized.** G, Shift+G and Ctrl+G switch grid mode, visibility and size [STATED]. One style draws a faint half-cell grid (`112799146/03`) [SHOWN].
- **The only numeric scale is pixels.** Advanced export sets the cell size in pixels, or "Dots per cell", for VTTs [STATED]. Taverns fixes single-floor export at "300 pixels per square" [STATED].
- **What the glyphs imply** [INFERRED, from measured proportions]:
  - In DW a whole stair — straight flight, quarter-turn or winder — fits one cell (1.1.0: "A single staircase takes a whole cell").
  - Bathrooms are often one cell, and corridors one cell wide.
  - A one-cell stair argues for a large cell; one-cell bathrooms and corridors argue for a small one. The implied cell is between about 1.5 and 2.5 m, consistent with the users' "between 5 ft and 10 ft".
  - In Taverns (`1521851/01`) a bed measures about 0.55 × 1.15 cells and a stair spans two or more cells, which implies a cell of about 1.6–1.8 m (a 5-ft battle-map square). The two generators do not share an implied scale.
- **Sibling contrast.** Urban Places is metric: its grid defaults to "~25 meters", is "specified in meters", and a scale bar sits in the title block (`141879891`, `145997186`) [STATED]. MFCG maps carry metric scale bars (`61026228/03`, `102377277/03`) [SHOWN]. PM's cell was about 3 m (manor.md §2.9) [STATED]. So when a metric settlement footprint is handed to DW, it is re-read on a unitless grid [INFERRED].

### 2(p) Performance
- **No timing is stated for DW anywhere in these sources** [unknown]. The capture lane must measure generation time.
- **What is stated about cost, retries and failure** [STATED]:
  - The first bent-cut implementation for neighbourhoods was "too slow and too unstable" (`58808794`, 2021).
  - Stairs: "Occasionally the generator fails to connect two floors. The easiest solution in such cases would be to scratch the whole building and create a new one, but for now I chose to ignore it" (1.1.0). So in 1.1.0 there is no whole-house retry on a stair failure.
  - Room assignment makes "multiple attempts" and keeps the best (1.3.0), a bounded loop of unstated size.
  - The stairwell "was harder to implement than it probably sounds, but it works. Almost without glitches" (1.4.0).
  - Taverns does retry the whole building: "If there are not enough guest rooms, the entire tavern gets rerolled" (1.1.0).
- **Size limits are about quality, not speed.** `huge` is refused because the plans are "very unrealistic", not because they are slow (itch 2024-09-27) [STATED]. A user's script edit adding `tiny`/`huge` "hangs" (itch 2023-10-04) [STATED by user; a modified build, so no evidence about the real one].
- **The itch page** lists "Average session: A few seconds" [STATED] — a store category, not a timing.

## 3. Taverns
**How the creator's position moved** [STATED]:

| date | statement | source |
|---|---|---|
| 2023-07-18 | "inns are cool, but these plans seem a little too chaotic or just too small to be inns" | Patreon reply, `86093774` |
| 2023-09-01 | "Inns are relatively easy. Temples are harder because usually they are expected to be symmetrical in plan and the current algorithm is not suitable for that" | itch |
| 2024-01-15 | "I can easily make changes that would allow generating taverns, temples, wizard towers etc. Unfortunately, for now I don't know how to do it gracefully, without hardcoding those building types" | `96522502` |
| 2024-12-27 | next step: an "alternative thematic room set ... not a 'dwelling', but a 'tavern' or a 'guard tower'" | `118772106` |
| 2025-06-25 | DW "could be used to create taverns, you just need to name rooms manually. In the future there will be an explicit option to generate taverns (and some other building types e.g. shops, watchtowers, etc.)" | itch |
| 2026-04-14 | "Inns/taverns are definitely on my list, but right now the generic algorithm I use is probably not good enough to deal with requirements this specific" | itch |
| 2026-05-12 | "Dwellings is not good at creating tavern/inn layouts or more broadly at creating layouts with specific topology. So I decided to try a different generation method in a separate generator" | `158074424` |
| 2026-06-11 | "There is a chance I'll merge these two generators because currently their functionality overlaps too much" | Taverns itch |

**The route in.** Tiny Pubs gained "integration with Dwellings. Now you can press W in Tiny Pubs to see the layout of the currently displayed pub. The integration itself works fine, but ..." (`158074424`) [STATED]. Its output labels a Dormitory and a Common room; a U-turn stair stands in the common room and a winder in a nook by the kitchen (`158074424/03`) [SHOWN]. The creator later says these DW taverns "have shapes more or less as you described", meaning street-fronted (Patreon reply on `159559624`, 2026-05-30) [STATED].

**The Taverns programme (fixed)** (`158074424`) [STATED]:
- **Ground floor (taverna):** "divided into a large common room with several tables and a kitchen. A staircase leads to the 1st floor and a trapdoor connects the kitchen to the basement."
- **First floor (inn):** "guest rooms connected to the staircase by a corridor. Each guest room is filled with beds and some abstract 'furniture'. There are also secondary rooms and closets."
- **Basement:** "an unstructured set of rooms and less isolated spaces."
- **No options:** "There is no way to request a larger or smaller tavern, more floors or no basement. I intend to keep it this way, at least for now. ... this generator is mostly just a test for the new algorithm."

**1.1.0 rules** (`159559624`) [STATED]:
- Cellar door: "usually located on the opposite side of the building from the entrance to the tavern itself."
- Basement: "layout has been made more interesting and the 'props' (barrels, columns, boxes) placement has been improved"; the texture outside it now differs from his other generators.
- Fireplace: "The generator prefers to place it in the kitchen, but if that's too small, it can be spawned in the common room. The fireplace is duplicated on the first floor if there is a guest room there."
- Acceptance test: "If there are not enough guest rooms, the entire tavern gets rerolled (no more inn floors with a corridor leading to nowhere)."
- Export: whole tavern (Shift+X); single floors at 300 px per square.

**1.1.1** (`1643499`): Tiny Pubs' W now opens Taverns; V/Shift+V give SVG; G toggles the grid [STATED].

**Controls** (itch page): Enter or a click generates; ↑↓ or a click on the floor label change floor; S shadows; P props; G grid; B black-and-white; C random colours; Shift+C reset colours; X/Shift+X PNG; V/Shift+V SVG [STATED].

**Promised, not delivered** (`158074424`, `159559624`) [NAMED-ONLY]:
- a fireplace (delivered in 1.1.0);
- a pantry attached to the kitchen;
- a bar counter;
- a back door in the kitchen;
- secret spaces on the first floor and secret rooms or a tunnel in the basement;
- an "Optional second floor with the proprietor's quarter";
- "a proper UI".

**What is shown** (`158074424/04`, `159559624/02`, `1521851/01`, `1538100/01`, `1643499/01`, taverns `_page-images/01`) [SHOWN]:
- **Layout.** Floors are stacked vertically (1F, GF, B), each with its own outline. The common room is a large notched shape with round or square tables ringed by two to four round chairs, some rotated. The kitchen sits in a corner with barrels, a counter, a hearth set into the wall and a trapdoor. A single stair (straight flight, or a winder in a 1×2-cell nook) stands at the same cells on GF and 1F. On 1F a one-cell corridor spine serves five or six guest rooms with beds; a curtain (wavy line) and a closet with a chair also appear. The first-floor hearth sits above the kitchen hearth. The basement is a pillared hall (column dots on cell vertices) with side rooms, barrels and crates, the trapdoor under the kitchen's, and in 1.1.0 external cellar steps opposite the main entrance. Main-entrance steps are on the street side.
- **Style.** Thick flat walls with a soft inner drop shadow; windows as double-line slots; small light rectangles as doors; a dashed one-cell grid; labels 1F/GF/B in an old-style serif. The look is closer to One Page Dungeon than to DW.

**Reconstruction of "a different generation method" [INFERRED — the method itself is never described].** The stated features fit a topology-first, programme-first generator:
1. A fixed room programme per floor: common room + kitchen; corridor + guest rooms + closets; loose cellar spaces.
2. Fixed vertical anchors placed first: the one staircase GF→1F, the trapdoor kitchen→basement, the fireplace stacked above the kitchen when a guest room lies above it.
3. Geometry fitted to that programme.
4. Generate-and-test with a hard count criterion (enough guest rooms, else reroll everything).

It is the inverse of DW's partition-then-label, and it matches item 28's "FUNCTION FIRST" interpretation. Its costs, as stated, are no size options, a fixed programme and "mostly just a test". The creator "rather thought about these taverns as village (or roadside) ones", and a street-front inn with a rear yard is "digging a little too deep" (Patreon reply, 2026-05-30) [STATED].

vs manor.md: §2.10 closing paragraph and §4.2 already quote the Taverns admission and the no-size rule; nothing contradicts them. New here: the timeline of the creator's view, the 1.1.0 rules (cellar door opposite, fireplace stacking, reroll-if-short), the Tiny Pubs → DW → Taverns route, and the scale difference (§2(o)).

## 4. Limits, failure modes and user complaints
### 4.1 Creator-admitted limits [STATED]

| limit | words | date, source |
|---|---|---|
| size | "while the method is capable of generating fairly large layouts, small ones look much better"; beyond `large`: "very unrealistic plans ... I wouldn't like to expose it" | 2023-07-14 `86093774`; itch 2024-09-27 |
| realism | "I'm not making an app for planning real houses, it's not CAD. This generator is designed to create maps of 'house-like dungeons'"; layouts make "a 'limited amount of sense'"; "Access to the living room only through the kitchen is a problem, but not a huge one"; wishes for "a slider for setting the desired level of 'normality'" | itch 2026-04-10 |
| guaranteed rooms | "the method I use is not suitable for this" | itch 2025-09-30 |
| typed buildings | temples need symmetry (2023-09-01); no graceful way "without hardcoding" (2024-01-15); "not good enough to deal with requirements this specific" (2026-04-14); "not good at ... layouts with specific topology" (2026-05-12) | itch; `96522502`; `158074424` |
| stairs | "a mind bending task ... Occasionally the generator fails to connect two floors" (1.1.0); per-pair independence, stairs on opposite sides, "even worse when there are not three floors, but eight" (1.4.0) | `86852618`, `143565705` |
| tall houses | "high floors often end up being too small, so this feature is quite glitchy" | `97493516` |
| basements | smaller "might not be right from the architectural point of view"; multiple levels "difficult to fill with content" | `86852618` |
| holes and courtyards | "the hole will be ignored"; "more complicated" then "*even more* complicated", postponed | `112799146`, `113347826` |
| round plans | "The lack of support for circular plans IS a problem" | itch 2026-04-10 |
| elevation fidelity | plan and elevation sizes "will not coincide ... not something I'm planning to fix"; side and rear views inconsistent for "dormers and chimneys" | `96522502`, `97493516` |
| furniture | "Individual pieces often look bad"; "block doorways and stairs"; clash with special objects | `120395768` |
| roofs | chimneys not related to rooms; only hip roofs; gables and other materials future | `145140009` |
| hand-off | entrance hand-off "isn't currently working" | `143036785` |
| JSON | "can't even import its own jsons" | Taverns itch 2026-06-11 |

### 4.2 Recurring complaints and requests, counted

Scope: the 83-post itch thread (`_comments.md`, fetched 2026-09-26): 52 user posts (the 40 thread openers and 12 user replies) and 31 creator replies. The brief's "66 comments" predates this refresh; the counts below are over all 83 posts. One post can fall under several rows. "Elsewhere" counts DW devlog threads and Patreon comments on DW posts.

| complaint or request | itch posts (users) | examples, dates | elsewhere | creator's answer |
|---|---|---|---|---|
| layouts illogical, "doesn't make any sense" | 4 (3) | Draco18s 2026-04-05, -07; matthewfenn 2025-09-21 ("illogical room layouts - particularly in larger structures"); Jellyfish 2023-10-03 ("wiggly hallway rooms") | — | not CAD, "house-like dungeons"; "Some weirdness and 'maziness' in the game doesn't hurt (much)" (2025-09-22) |
| too many or redundant corridors | 3 (3) | Rhafaew 2025-03-31; matthewfenn 2025-09-21; Draco18s 2026-04-07 ("useless corridor") | 1 (Patreon `96522502`, "a *lot* of 'corridor' and 'gallery'") | "I don't think there are *too* many corridors, but I'll probably add a tag" (2025-04-01) → `spacious` (1.3.8), default in 1.4.0; dislikes "two corridors run[ning] side by side" (2024-01-17) |
| rooms reachable only through other rooms / no privacy | 3 (3) | Rhafaew ("you have to go through more than one"); matthewfenn ("bedrooms that lead to other bedrooms"); Draco18s (a room "only accessible via its two neighbors"; upper floors only via a secret passage) | — | "Access to the living room only through the kitchen is a problem, but not a huge one" (2026-04-10) |
| missing bedrooms or bathrooms | 3 (3) | sitebender 2023-08-08; Jellyfish 2023-10-02; Gilbals 2025-09-29 | — | bedrooms = floors, press Ctrl+Enter (2023-09-01); the method cannot guarantee; rename a room (2025-09-30) |
| control over the programme (room counts, rooms per floor, bedrooms) | 3 (3) | tmexx 2023-08-28; Ronanry 2024-04-25; Gilbals 2025-09-29 | — | "don't know how to do it 'gracefully'" (2024-04-30); tags per type inelegant (2025-09-30) |
| no editing (walls, doors, windows, labels, per floor, re-import to modify) | 8 (7) | bklick 2023-10-29; Asgarus 2024-09-13; trekadam30 2025-01-20; oxzidized 2025-01-22; matthewfenn 2025-09-21; Felnors 2025-12-02; Draco18s 2026-04-05, -07 | 1 (devlog `567246`, GoatedwiththeGoat 2026-09-15) | renaming added (1.3.0); walls "conceptually messy" (2025-01-21); "Personally, I'm not interested in editing" (2026-04-10); "not among my priorities", per-floor reroll possible (2026-09-16) |
| scale or grid fit | 1 (1) | matthewfenn (5 ft vs 10 ft) | 1 (devlog `567246`, roll20 fit, 2024-10-05) | "I don't know what scale this is"; ordinal sizes (2025-09-22); use Advanced export "Dots per cell" (2024-10-07) |
| entrances, back doors, door placement | 4 (4) | tmexx 2023-08-28 (street side, back doors); Asgarus 2024-09-13; Rhafaew 2025-03-31; matthewfenn 2025-09-21 | 1 (Patreon `86436420`, a rectangular house "to match your town maps") | marked entrance (1.3.8); back doors "on my list" (2023-09-01), "Agree" (2025-09-22); none delivered |
| typed buildings (taverns, inns, apartments, temples, churches, office) | 4 (4) | tmexx; Ross Burton 2024-09-27 (office via `huge`); LazurianKnight67 2025-06-19; Gilbals 2026-04-12 | 5 (Patreon: two on `86635425`, inn on `86093774`, tower on `88328982`; devlog `567327` user building taverns with it) | see §3: rename rooms (2025) → Taverns (2026) |
| floors or basement not controllable | 2 (2) | Ross Burton 2024-09-27; Spiderheart 2026-06-29 | — | 50% basement for one storey; stair tags add a floor; no-basement tag "in the future" |
| size (`huge`, `tiny`) | 3 (2) | Ross Burton ×2; Jellyfish 2023-10-04 | — | refused (unrealistic); use the blueprint editor |
| JSON / graph / import | 4 (4) | Sinay51 2025-01-24; Hod Publishing 2025-08-03; Cozy TV 2025-11-09; Felnors 2025-12-02 | 1 (Patreon `143565705`) | JSON in 1.4.0; no import |
| other export (SVG trouble, PDF, VTT, multi-floor bug) | 6 (6) | Urpwnd 2023-08-22; StanislawMalecki 2024-07-06; sqripsiz 2025-01-12; AdventurerMMORPG 2025-08-12; matthewfenn; El Perro Bobby 2026-02-15 | 2 (Patreon `111909860`, `120395768`) | bug fixed 1.3.6; VTT/PDF "on my list" |
| more loops and interweaving | 1 (1) | Eduardo Reyes 2025-12-11 | — | "does that, but quite rarely"; a tag promised |
| round plans or towers | 0 | — | 1 (Patreon `88328982`) | "apart from the ability to build round floor plans" |
| UI, help, bugs | 3 (3) | a.human 2023-08-31; Demid Tishin 2024-11-12; halr9000 2026-05-03 | — | help key "excessive" |
| roofs, elevation, style, furniture, legend | 5 (5) | tmexx (roofs); AdventureBear 2024-01-02 (elevation); bubonicfred 2023-12-12 (style); matthewfenn (furniture); Gog 2025-01-29 (star symbol) | — | elevation 1.3.0, roofs 1.4.1, abstract furniture 1.3.6 |
| a no-stairs option (floors joined by "magic elevators") | 2 (1) | eva 2025-05-29, 2025-06-07 | — | "Why would you need a house with unconnected floors?"; make each floor as a one-storey blueprint (2025-06-05) |
| praise, thanks, questions only | 14 | — | — | — |

**Declined outright** [STATED]:
- `huge`;
- editing beyond renaming ("If the output of my generator requires too much manual editing, I'd rather not publish it", 2026-04-10);
- guaranteed rooms by tag;
- a no-stairs mode;
- a shortcuts key;
- JSON authoring through AI;
- open-sourcing (Patreon comments on `158074424`, 2026-05-22 and 2026-06-11; he objects to people who will "feed the code to Claude or whatever");
- reselling the generators themselves (output is free to use, "but not the generators themselves", Taverns itch 2026-06-12).

The last two bear directly on this program's clean-room rule [INFERRED].

### 4.3 Failure modes visible in images [SHOWN]

- **Stairs on different sides** between floor pairs, with middle floors carrying two stair cells (`120395768/02`, `121415691/04`; §2(d)).
- **Stairs that do their job badly:** a stairhall taking the largest room to reach the basement (`_comments-images/02`); upper floors reached only through a secret passage (`_comments-images/03`).
- **Pass-through and odd rooms:** a room entered only through its two neighbours; a corridor running beside a stair strip, the "side by side" case the creator dislikes (`_comments-images/02, 04`).
- **Odd programmes:** two bathrooms on one ground floor (`86436420/04`); the entrance opening straight into a kitchen (`96522502/04`); a lone Attic that is a 1×5-cell strip (`111909860/03`).
- **Labels on odd shapes:** one-cell-wide "Gallery"/"Corridor"/"Secret passage" strips labelled as rooms (`96522502/04`, `111909860/03`, `_comments-images/05`).
- **Missing context:** no basement shape extends beyond the ground floor, and no plan has a courtyard or a curve apart from the stair shaft (all images).

## 5. Visual and style conventions
Descriptions only; no asset, font file or colour table is copied. Hex values are printed in one UI screenshot (`_page-images/02`) but are deliberately not reproduced here (clean-room).

**Style system** [STATED + SHOWN].
- **Presets.** Plain was the default until 1.3.5. Natural was added in 1.2.0 and is the default from 1.3.5 ("less versatile than Plain but ... more attractive"). The rest: Blueprint (1.0.1), Antique (replaced in 1.3.5 by Wooden), Black and white (hatched walls on; room lights at zero). Dark is an elevation option (1.3.3).
- **Wall styles.** Castle (1.0: "make a house look more like a castle"), Sci-fi (1.0.1) and Log house (1.3.5). No image identifiable as Sci-fi was found.
- **Keys.** 1–5 choose a colour scheme and 6–0 a wall style.
- **The Style dialog** (`_page-images/02`). Colour slots are Ink, Paper, Floor, Walls, Props, Windows, Stairs and Labels, each with a hex field and swatch. There are tabs Colors / Misc. and buttons Preset ▼, Load, Apply, Save.
- **Other stated settings:** AO opacity, light strength, wall hatching (Misc > Hatching, 1.3.7) and roof colour (1.4.1). The Plain preset shown is near-monochrome: blue-black ink and walls, off-white paper, white floor, windows and stairs, pale-grey props, mid grey-blue labels.

**Colour moods seen** [SHOWN]:
- grey or plain: charcoal walls on white (`86436420/03`, `112799146/03`);
- Blueprint: pale lavender lines and walls on royal blue, mid-blue floor (`86635425/02`);
- Natural: light-grey stone walls with a thin dark outline, taupe or plank floors, warm light (`88328982/03`, `111909860/03`, `120395768/02`);
- parchment or castle: black walls on tan paper (`86436420/05`, `88328982/05`, `96522502/04`);
- Wooden with Log house: honey planks, brown log walls (`118772106/02`, `_page-images/01`);
- a dark slate scheme: slate background, black walls, pinkish floor (`143036785/03`);
- gothic export: maroon ink on cream with scribble-hatched walls (`121415691/04`).

**Walls** [SHOWN].
- Thickness, measured in `112799146/03` where a cell is about 130 px: outer walls about 0.35 cell, inner walls about 0.13 cell. Thinner in the grey style of `86436420/03`.
- Small square posts at grid vertices along every wall, which read as jambs on either side of a doorway.
- Protruding square corner blocks (quoins) at corners in the castle-like, Natural and grey-thick styles.
- Log-house walls have crossed log ends at corners and junctions.
- Two-colour walls (fill plus outline) date from 1.2.0 ("took a lot time") [STATED].
- Basements get an outer band of short diagonal hatch strokes as earth.

**Floors** [SHOWN]:
- a plain fill, or planks whose direction changes per room;
- tiles on a half-cell grid (Natural);
- a dashed one-cell grid overlay, or a faint half-cell grid.
The floor colour can equal the paper colour (itch reply 2023-12-12) [STATED].

**Openings** [SHOWN; details in §2(c), §2(f), §2(g)].
- Doors: a gap between posts, a leaf rectangle across the gap, or a quarter-circle swing arc with a leaf line.
- Windows: a pale slot or block inside the wall thickness, or three thin lines, about one per cell of exterior wall.
- Entrance: three to six external treads plus an arrow outside pointing in.

**Stairs** [SHOWN].
- Regular stairs fill one cell: parallel tread lines; quarter-turn with a lighter landing square; half-turn; winder with fan treads.
- An arrow starts from a dot and points upstairs [STATED convention].
- The spiral shaft is a thick ring about two cells across, with radial treads round a small newel square, a slit window, and a curved arrow outside.
- Castle and Sci-fi walls drop the landings [STATED].
- The trapdoor is a crossed square [STATED].

**Furniture and props** [SHOWN]:
- pale rectangles with an inset rectangle; stepped compound rectangles; circles;
- plant clusters of overlapping circles;
- a statue as a star in a circle;
- a curtain as a wavy line along a wall.
Furniture uses the Props colour slot.

**Light and shade** [SHOWN].
- AO: a dark gradient band inside every wall run, breaking at doorways (1.3.8).
- Room lights: warm radial pools centred in rooms.
- Both are vector gradients, so they survive SVG [STATED].
- DW plans have no drop shadow; Taverns walls have a soft inner drop shadow.

**Roofs** [SHOWN; §2(j)]:
- Before 1.4.1: lower-level roofs as thin outlines with hip strokes.
- 1.4.1: dashed tile lines running down each slope; bead-line hips and ridges with round knobs at the eaves; facet tones by orientation; lower levels faded; square chimneys; a radial-tiled cone on the stair shaft; blue-grey by default in the release image.

**Labels and type** [SHOWN].
- 1.0–1.2: handwritten script outside the plan with curved leader arrows.
- From 1.3.0: inside rooms, sized to the room, rotated 90° in tall rooms, abbreviated in small ones ("BTH", "SH").
- Faces by style: a condensed humanist sans in pale cream (Natural); an engraved-looking serif in grey-blue (Plain); an old-style serif (gothic export); handwriting in maroon (1.2 era).
- Exports show large pale floor codes ("GF", "1F").
- UI: a condensed sans floor selector ("B GF 1F …", current floor boxed) at bottom right; a toolbar "= P E" at top left; a dark rounded name pill under the elevation.

**Elevation linework** [SHOWN]:
- Tiny Pubs style: dark outlines over flat fills; roofs hatched with short horizontal dashes; gridded windows; planked or arched doors with lanterns; a coursed-stone plinth band.
- Details: weather vanes; fachwerk bracing as an option; faded far sections; dash-dot floor lines and ground line; grass tufts.

**Taverns look** [SHOWN] (for contrast):
- flat thick dark walls with an inner drop shadow on a parchment ground;
- a dashed grid; double-line window slots; small light door rectangles;
- earth outside the cellar as hatching (1.0) or stipple (1.1.0);
- floor labels in an old-style serif.
It is a One-Page-Dungeon family look, not DW's.

## 6. Not knowable from these sources
### 6.1 For the capture lane (observable in the running build without reading code)

| # | question | why it matters to item 28 | how to observe |
|---|---|---|---|
| 1 | The exact permalink format: parameter names for the ground plan and the marked entrance, and their encoding; whether floors, style, room set, roofs mode and renamed rooms appear | the city → building click will mirror a hand-off; only `seed` and `tags` are documented | "Permalink…" after (a) a random house, (b) a blueprint drawing, (c) a marked entrance, (d) a rename, (e) Rooms > Gothic, (f) Number of floors; diff the URLs |
| 2 | What MFCG, VG, NG and UP actually send on "Open in Dwellings": plan only, or also size, floors, entrance; and how non-orthogonal or rotated polygons become cells | the contract DW receives; how a metric polygon is rasterised | open the same building from each settlement generator; read the resulting URL and plan |
| 3 | The JSON schema: every key, the room graph, how doors, stairs and floors are linked, units | item 28 exports "the room graph ... our own schema"; a reference for coverage | Export > as JSON on a 2–3-floor house with a basement and a spiral stair; record keys (field names are facts, not code) |
| 4 | Whether the 2025-12-18 permalink still reproduces a loop | permalink stability across versions (§2(n)) | open `https://watabou.github.io/dwellings/?seed=1341473638&tags=large,slab` |
| 5 | What Shift+Enter and Ctrl+Enter change: outlines of upper floors, basement, stairs, windows, doors, furniture, name | the restrictive-reroll contract (§2(m)) | three screenshots per action over five seeds; diff |
| 6 | Tag effects in numbers: plan area per size tag, floors per `low`/`tall`, basement rate for multi-storey houses, meaning of `slab`, `square`, `blank`, `transparent` (Shift+click toasts) | calibrating a class table | Shift+click each tag; 40 generations per tag with floor counts and areas |
| 7 | Stair statistics: failure rate of floor connection, frequency of the spiral shaft, trapdoor rate, `stairwell` stacking rate | vertical-core design | 100 generations of 3+ floors; count unconnected pairs |
| 8 | Entrance side versus plan dimensions (the "longest wall" rule) | entrance rule | 40 generations; record entrance edge, wall length, façade side |
| 9 | Room-type frequencies and co-occurrences per house name; share of generic "room"/"corridor" | the programme table | 100 generations with labels; read the house name (Space) |
| 10 | Generation time per house, by size and floors | the §12 budget row for "one plan per click" | a performance profile of Enter |
| 11 | Roof construction: straight skeleton of each storey outline or per rectangle; what Shrink does | the §2(j) inference | toggle Shade/Fade/Shrink on a stepped plan; compare |
| 12 | The Tiny Pubs → DW and Tiny Pubs → Taverns hand-offs: what is passed | typed-building precedent | press W in Tiny Pubs; read the URL |

### 6.2 Not recoverable from any source (the critic should not expect them)

- **The partition algorithm's actual rules**: cut choice (position, orientation, bend placement), stopping size, how `organic` and `mechanical` differ, the corridor-strip mechanism, the merge rules, door choice. Only the 2021 idea and the 2023 "tweaks" are described (§2(c)).
- **The room-type table**: sizes, regularity values, window and door demands per type, primary/secondary membership, the core set; the attempt count and scoring; the house-name grammar and the name → special-room mapping.
- **Upper-floor shrinking**: the rule for which part is removed; the size → height function; basement probability beyond the one-storey 50%.
- **Placement formulas**: windows, lights ("overcomplicated calculations"), furniture parameters.
- **Taverns' "different generation method"**: described only by its programme and outputs (§3).
- **Dark Clues**: the post (`63952852`) is locked, and its two previews are blurred.
- **"Taverns and quips"**: `158953060` is locked.
- **The tweet** giving the 2022 verdict on PM (`1494337095313223682`) is not on disk.
- **Versions after 1.4.1**: none announced; whether the build has changed since 2025-12 is unknown. DW's itch page gives no version number.

### 6.3 Scrape artefacts to be aware of

- The itch devlog stubs carry wrong dates (§1).
- `_page.md` was refreshed on 2026-09-26 and now lists one page image, while five remain on disk from the 2026-09-25 scrape; all five were viewed.
- `_comments.md` grew from the 66 posts named in the brief to 83; the counts in §4.2 use 83.

## 7. Sources read and images viewed
**Read in full (text): 63 distinct post, devlog and page files.** Paths are relative to `research/`.

- **Dwellings on itch (17):** `devlogs/dwellings/` — the 15 devlog `post.md` files (563591, 565440, 567246, 567327, 581099, 666129, 674004, 798071, 805488, 810018, 871855, 880631, 1106706, 1113590, 1134478), `_page.md`, and `_comments.md` (83 posts: 52 by users, 31 by the creator). Each devlog's own comment thread is inside its `post.md`.
- **Taverns on itch (5):** `devlogs/taverns/` — `1521851-release`, `1538100-110`, `1643499-111` (`post.md` each), `_page.md`, `_comments.md` (13 posts).
- **Patreon, the brief's list (19):** `patreon/watabou-manor/<id>/post.md` for 63952852, 86436420, 86635425, 86852618, 88328982, 96522502, 97493516, 111909860, 112799146, 113347826, 118772106, 120395768, 121415691, 143036785, 143565705, 145140009, 158074424, 159559624, 158953060.
  - For each, the archived comment count in `post.md` was checked against the unique comment ids in `comments.json`; all 19 match.
  - 63952852 and 158953060 are locked: no body, and 0 of 3 and 0 of 2 comments archived.
- **Patreon, grep hits (16 distinct):** `grep` of `watabou-extra` and `watabou-city` for "Dwellings", "House Plan", "floor plan" and "permalink" found 17 files. `watabou-city/121415691` is the same post as the manor copy (bodies diffed identical). The 16 distinct posts:
  - extra: 28088976, 49191011, 58808794, 59864807, 60165082, 64375271, 86093774, 106975409, 109092851, 115606722, 141879891, 144816210, 145997186;
  - city: 61026228, 100431269, 102377277.
- **Beyond the brief (6), found by the same grep over `watabou-village` and a title/tag search of `patreon/watabou-all-posts.json`:**
  - `watabou-village/104796798`, `116745476`, `117634240` — the VG → DW hand-off posts;
  - `watabou-extra/94469350` and `103335095` — Tiny Pubs, the elevation lineage;
  - `watabou-extra/124128668` — March 2025.
- **Copies verified identical and not recounted:**
  - `watabou-manor/86093774` and `watabou-manor/144816210` (post bodies and all images);
  - `watabou-extra/63952852` (body and both images);
  - `watabou-city/121415691` and `watabou-village/121415691` (bodies and all six images).
- **Context, not counted:** `findings/manor.md` §0, §2.8–§2.10, §3–§9 (read first, as briefed); `devlogs/scrape-taverns-dwellings.log`; and, at the project root, `docs/AMENDMENTS-2026-09-25b.md` item 28.
- **Not read:**
  - `watabou-extra/141198168` ("WIP: new buildings in Urban Places") — no grep hit;
  - captured JavaScript bundles — forbidden, never opened;
  - the MFCG "straight skeleton" post `101173551` — only its link in `102377277` is cited;
  - the external links in the posts (books, Introversion's blog, tweets).

**Images viewed (Read tool): 190 source image files, plus 12 enlarged crops of five of them made for measurement** (crops in the session scratchpad, not in the project).

| directory | files | viewed | note |
|---|---|---|---|
| `devlogs/dwellings/*/images/` | 14 | 14 | same pictures as the Patreon originals (re-encodes) |
| `devlogs/dwellings/_page-images/` | 5 | 5 | 02–05 are from the 2026-09-25 scrape |
| `devlogs/dwellings/_comments-images/` | 6 | 6 | 01–05 by users, 06 by the creator |
| `devlogs/taverns/*` (3 devlogs, page, comments) | 5 | 5 | |
| `patreon/watabou-manor/` (the 19 listed posts) | 61 | 61 | 63952852 and 158953060 are blurred paywall previews |
| `patreon/watabou-extra/` (13 grep-hit posts) | 61 | 61 | includes off-topic images (Perilous Shores, Sails, Hair, cave banner) |
| `patreon/watabou-city/` (3 grep-hit posts) | 18 | 18 | |
| `patreon/watabou-city/121415691/`, `patreon/watabou-village/121415691/` | 12 | 0 re-opened | md5-identical to the manor copies, which were viewed |
| `patreon/watabou-village/` (3 extra posts) | 10 | 10 | |
| `patreon/watabou-extra/` (3 extra posts) | 10 | 10 | |
| **total source images opened** | | **190** | + 12 crops; 22 byte-identical copies not re-opened: the 12 above, 2 in `watabou-extra/63952852`, 6 in `watabou-manor/86093774` and 2 in `watabou-manor/144816210` (their `watabou-extra` copies were viewed) |

**CONFIRMED versus PLAUSIBLE.**
- **CONFIRMED (read on disk):** every quotation, date, version and count in this file, and every [SHOWN] description. Each [SHOWN] item was viewed in the named image. The measured items were read from pixel coordinates: the stair-cell alignments (§2(d); enlarged crops for `111909860/03`, full images for the others), the wall and cell proportions (§5), the entrance-wall lengths (§2(f), on a crop) and the Taverns bed proportions (§2(o)).
- **PLAUSIBLE (reasoning only, never executed):** every line tagged [INFERRED], chiefly:
  - the reconstruction of the partition and door method (§2(c));
  - the meanings of `slab`, `square`, `blank`, `transparent`, `organic`, `mechanical`;
  - the straight-skeleton reading of the roofs (§2(j));
  - the implied cell sizes (§2(o));
  - the reading of the Taverns method (§3);
  - the permalink plan-encoding style (§2(a)).
- Nothing here was checked against the running build; that is the capture lane's job (§6.1).
