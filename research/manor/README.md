# Fantasy Manor: source archive (lane `manor-archive`, 2026-09-25)

> PENDING FABLE REVIEW — Opus-produced, not yet checked by a Fable seat; queued in docs/FABLE-REVIEW-QUEUE.md as B16.

This page covers watabou's **Fantasy Manor** (FM, https://watabou.itch.io/fantasy-manor), the reference for stage 3: buildings inside neighbourhoods, from giant manors to small hovels.
It says what is on disk, why each source was selected, and which directories the reader lane (`manor-read`) must cover.
It deliberately does not extract technique. That is the next lane's job.

## What was archived

| Source | On disk | Count |
|---|---|---|
| itch.io game page: description, info panel, HTML5 build URL | `research/devlogs/manor/_page.md`, `_page-images/` | 1 page, 4 images (3 screenshots + cover) |
| itch.io comments page | `research/devlogs/manor/_comments.md` | 29 posts: 19 top-level, 10 replies, **5 by watabou**, 1 deleted. One page, no pagination, no images |
| itch.io devlogs | none | **0.** FM has no devlog. `/fantasy-manor/devlog` and `/devlog.rss` return HTTP 404, the game page has no devlog links, and no archived Patreon post links to one (CONFIRMED 2026-09-25) |
| Patreon posts (campaign 2599946) | `research/patreon/watabou-manor/<id>/` (post.json, comments.json, post.md, images/) | **31 posts** (30 viewable, 1 locked), **131 images**, **106 comments**, about 70k characters of body text |

- **Locked:** `63952852` *Dark Clues* (2022-03-18) is patron-only. The API reports 3 comments, but the comments endpoint returns 403, so none were archived. It is recorded as locked and was not bypassed. Its two images are the public preview the API exposes.
  The campaign's other 9 locked posts were checked by title, tags and teaser (all teasers are empty); none concerns these generators: `164387414` 2026-07-21 ☠️Perilous Shores 2.0.0-preview: JSON import; `158953060` 2026-05-22 Taverns and quips; `96122791` 2024-01-08 Desktop versions - results; `95796287` 2024-01-03 Desktop versions; `91285519` 2023-10-19 Coming soon; `65382973` 2022-04-20 Procgen Arcana - preview; `46041997` 2021-01-10 Desktop versions of MFCG, VG and 1PDG; `38154527` 2020-06-12 🎂Anniversary!; `37538746` 2020-05-26 100+ patrons!.
- **Comment counts:** one post (`28327848`) archived 2 comments where the API count says 1. CONFIRMED: it has 1 top-level comment plus 1 creator reply, and the API counts only the top level.
- **Indexes:** `research/patreon/index.json` gained the group `watabou-manor`, which `tools/progress.py` counts. The four existing groups are byte-identical. `research/devlogs/index.json` is unchanged (73 rows), because FM has no devlog rows.
- **Logs:** `research/patreon/scrape-manor.log`, `research/devlogs-scrape-manor.log`. Selection record: `research/manor/selection.json`. Ids: `research/patreon/watabou-manor-ids.json`.

## What the generator does (creator's description)

The itch page describes FM as a deliberately small generator that "produces top-down images of random fantasy manors" (watabou, itch page).
Its options sit in the context menu.
For a more substantial generator, the page points readers to Procgen Mansion.
It is made with Haxe + OpenFL, and the images are free to use, including commercially.
The page's meta line calls it a generator of a plan of a random fantasy manor.
The release post (`42879157`) contrasts it with Procgen Mansion: both generate buildings, but at very different scope.

**Controls and credits:** the page has no controls or credits section beyond the Haxe + OpenFL credit.
In the comments, a user asks for a controls menu.
The creator's reply names one hotkey: C gives new lighting.

**Build:** `https://html-classic.itch.zone/html/2851818/bin/index.html` (iframe 960×800), for `manor-capture`.

## Version ladder

FM has no devlog, so the ladder is built from dated Patreon titles. FM's own history is short:

- **2020-10-18:** FM released (`42879157`). The first itch comments arrive the same day.
- Between 2020-10-20 and 2024-09-25 the creator answers feature requests in the itch comments (export, shapes, colours). No later FM release post exists on Patreon: the title, tag and body search found none.
- **2025-12-01:** *Hair* (`144816210`). A PROCJAM remake of FM was started and dropped, and the work moved into Dwellings.
- **2025-12-05:** *Dwellings 1.4.1: roofs* (`145140009`), which received that work.
- **Current build:** upload 2851818 has a CDN `Last-Modified` of 2026-06-24. Four other watabou builds carry the same 23–24 June 2026 window: Procgen Mansion (5684984), Dwellings (17195045), and the two builds 11441280 and 12710731 listed in `captures/record-all.log`.
  - CONFIRMED: the other builds share that date window.
  - PLAUSIBLE: the date reflects a bulk re-upload, not an FM change. Nothing announces an FM change.

The full dated ladder of the selected lineage, oldest first:

| date | tier | title | post |
|---|---|---|---|
| 2019-07-12 | B | Procgen Mansion has been updated | `28327848` |
| 2019-12-19 | B | Procgen Mansion update, Boring Quest Generator | `32477317` |
| 2020-02-18 | B | Blueprint editor for Procgen Mansion | `34131516` |
| 2020-03-18 | B | Towers in Procgen Mansion | `35009607` |
| 2020-10-18 | A | Fantasy Manor | `42879157` |
| 2021-02-19 | B | Procgen Mansion 2.1.0: OBJ export and other new features | `47744240` |
| 2021-03-25 | C | Recursive bisection with a twist | `49191011` |
| 2021-08-10 | B2 | WIP and updates | `54745111` |
| 2022-03-18 | C | Dark Clues (locked) | `63952852` |
| 2022-04-27 | B | 🏠Procgen Mansion 2.1.2: permalinks | `65675282` |
| 2022-05-18 | B2 | 🏡Village Generator 1.2.8: integration with Procgen Mansion | `66544756` |
| 2022-08-24 | B2 | 📍Neighbourhood Generator 1.2.0: new template, integration with mansions, lots of visual changes | `70917627` |
| 2023-02-24 | B2 | 🏰Medieval Fantasy City Generator 0.9.2: assorted new features and improvements | `79147510` |
| 2023-07-14 | C | Floor plans | `86093774` |
| 2023-07-21 | C | 🔑House Plan Generator | `86436420` |
| 2023-07-25 | C | 🔑House Plan Generator 1.0.1 | `86635425` |
| 2023-07-29 | C | 🔑House Plan Generator 1.1.0: regular staircases and basements | `86852618` |
| 2023-08-28 | C | 🔑Dwellings 1.2.0: tags and improved visuals | `88328982` |
| 2024-01-15 | C | 🔑Dwellings 1.3.0: elevation and improved rooms | `96522502` |
| 2024-01-30 | C | 🔑Dwellings 1.3.1: small improvements and experiments | `97493516` |
| 2024-09-12 | C | 🔑Dwellings 1.3.2: permalinks and multi-floor export | `111909860` |
| 2024-09-26 | C | 🔑Dwellings 1.3.3: blueprint editor | `112799146` |
| 2024-10-04 | C | 🔑Dwellings generator is now a part of Procgen Arcana | `113347826` |
| 2024-12-27 | C | 🔑Dwellings 1.3.5: visual and UI improvements | `118772106` |
| 2025-01-20 | C | 🔑Dwellings 1.3.6: advanced export again and abstract furniture | `120395768` |
| 2025-02-03 | C | 🏰🏡🔑Three generators have been updated | `121415691` |
| 2025-11-07 | C | 🔑Dwellings 1.3.8: improved lighting and marked entrances | `143036785` |
| 2025-11-14 | C | 🔑Dwellings 1.4.0: JSON export and improved stairs | `143565705` |
| 2025-12-01 | A | Hair | `144816210` |
| 2025-12-05 | A | 🔑Dwellings 1.4.1: roofs | `145140009` |
| 2026-05-12 | C | 🍻Taverns | `158074424` |

## Why each Patreon post was selected

The source was `research/patreon/watabou-all-posts.json` (all 212 posts).
A case-insensitive search for `manor|mansion|estate|floor[ -]?plan|dwelling` ran over title, tags and full body text.
The bodies of the 91 posts not already on disk were fetched to a scratch cache for the search only.
The search found **54 posts** ("estate" matched none).

- **Included: 31.** Every post tagged `fantasy manor`, `procgen mansion` or `dwellings`, plus posts whose title or body is substantively about these generators.
  The one addition that is not a search hit is the locked *Dark Clues* post, included as lineage.
- **Excluded: 24.** Passing or plan-only mentions; reasons are in the second table.

The tiers set reading priority:

- **A:** FM itself.
- **B:** Procgen Mansion. The creator tags FM `procgen mansion`, and the FM page points to it as the more substantial sibling.
- **B2:** integrations in which the settlement generators hand a map building to the building generator. This is the stage-3 hook.
- **C:** the House Plan → Dwellings lineage. The creator states that Dwellings replaced Procgen Mansion as his suite's building generator (`111909860`, `113347826`), and the FM-remake roofs went there.

Posts also archived in another collection are duplicated here so the collection is self-contained; the last column names the other copies.

| tier | date | post | title | img | com | matched by | why included | also in |
|---|---|---|---|---|---|---|---|---|
| A | 2020-10-18 | `42879157` | Fantasy Manor | 4 | 3 | tag fantasy manor | The Fantasy Manor release post: the creator introduces FM and contrasts its scope with Procgen Mansion. | — |
| A | 2025-12-01 | `144816210` | Hair | 2 | 0 | body | Creator describes starting a remake of "my old Fantasy Manor generator" for PROCJAM and moving that work into Dwellings (roofs). | watabou-extra |
| A | 2025-12-05 | `145140009` | 🔑Dwellings 1.4.1: roofs | 2 | 1 | tag dwellings; body | Dwellings 1.4.1 roofs: the announced destination of the FM-remake work (links to the Hair post). | — |
| B | 2019-07-12 | `28327848` | Procgen Mansion has been updated | 6 | 2 | tag procgen mansion | Procgen Mansion update (size option, SVG floor-plan export, visuals). | — |
| B | 2019-12-19 | `32477317` | Procgen Mansion update, Boring Quest Generator | 3 | 3 | title | Procgen Mansion section (floor-plan grid, roof details); untagged, found by title. | — |
| B | 2020-02-18 | `34131516` | Blueprint editor for Procgen Mansion | 4 | 5 | tag procgen mansion | Blueprint editor; states how mansions are built (polyomino-like ground plans). | — |
| B | 2020-03-18 | `35009607` | Towers in Procgen Mansion | 4 | 2 | tag procgen mansion | Towers added to the Procgen Mansion blueprint editor. | — |
| B | 2021-02-19 | `47744240` | Procgen Mansion 2.1.0: OBJ export and other new features | 6 | 7 | tag procgen mansion | Procgen Mansion 2.1.0: OBJ export and other features. | — |
| B | 2022-04-27 | `65675282` | 🏠Procgen Mansion 2.1.2: permalinks | 4 | 1 | tag procgen mansion | Procgen Mansion 2.1.2: permalinks, table-form floor-plan export. | — |
| B2 | 2021-08-10 | `54745111` | WIP and updates | 8 | 0 | tag procgen mansion | WIP and updates: includes a small Procgen Mansion update tied to the settlement generators. | watabou-city |
| B2 | 2022-05-18 | `66544756` | 🏡Village Generator 1.2.8: integration with Procgen Mansion | 4 | 1 | tag procgen mansion; title | Village Generator 1.2.8: open any village building in Procgen Mansion. | watabou-village |
| B2 | 2022-08-24 | `70917627` | 📍Neighbourhood Generator 1.2.0: new template, integration with mansions, lots of visual changes | 8 | 7 | title; body | Neighbourhood 1.2.0: open houses in Procgen Mansion, passing house size AND shape (PM approximates irregular polygons with squares). | watabou-extra |
| B2 | 2023-02-24 | `79147510` | 🏰Medieval Fantasy City Generator 0.9.2: assorted new features and improvements | 3 | 10 | tag procgen mansion | MFCG 0.9.2: open any city building in Procgen Mansion. | watabou-city |
| C | 2021-03-25 | `49191011` | Recursive bisection with a twist | 11 | 5 | body (floor plan) | "Recursive bisection with a twist": cutting an irregular floor plan into rooms. Lineage to the Floor plans post is PLAUSIBLE (dates match its "two and a half years ago"), not linked. | watabou-extra |
| C | 2022-03-18 | `63952852` | Dark Clues **LOCKED** | 2 | 0 | lineage (locked) | Dark Clues: the game Dwellings "has grown out" of (120395768) and where the floor-plan method was first used (86093774). Patron-only — recorded as locked, not bypassed. | watabou-extra |
| C | 2023-07-14 | `86093774` | Floor plans | 6 | 6 | tag dwellings; title | Floor plans (WIP): the floor-plan method once meant to replace Procgen Mansion's. | watabou-extra |
| C | 2023-07-21 | `86436420` | 🔑House Plan Generator | 6 | 7 | tag dwellings | House Plan Generator launch (the generator later renamed Dwellings). | — |
| C | 2023-07-25 | `86635425` | 🔑House Plan Generator 1.0.1 | 2 | 4 | tag dwellings | House Plan Generator 1.0.1. | — |
| C | 2023-07-29 | `86852618` | 🔑House Plan Generator 1.1.0: regular staircases and basements | 2 | 2 | tag dwellings | House Plan Generator 1.1.0: regular staircases and basements. | — |
| C | 2023-08-28 | `88328982` | 🔑Dwellings 1.2.0: tags and improved visuals | 5 | 4 | tag dwellings | Dwellings 1.2.0 (renamed from House Plan Generator): tags, visuals. | — |
| C | 2024-01-15 | `96522502` | 🔑Dwellings 1.3.0: elevation and improved rooms | 4 | 8 | tag dwellings | Dwellings 1.3.0: elevation view, improved rooms. | — |
| C | 2024-01-30 | `97493516` | 🔑Dwellings 1.3.1: small improvements and experiments | 2 | 1 | tag dwellings | Dwellings 1.3.1: elevation generation, fortified option. | — |
| C | 2024-09-12 | `111909860` | 🔑Dwellings 1.3.2: permalinks and multi-floor export | 4 | 4 | tag dwellings | Dwellings 1.3.2: planned to replace Procgen Mansion as the suite's building generator; multi-floor export. | — |
| C | 2024-09-26 | `112799146` | 🔑Dwellings 1.3.3: blueprint editor | 4 | 1 | tag dwellings | Dwellings 1.3.3: blueprint editor similar to Procgen Mansion's. | — |
| C | 2024-10-04 | `113347826` | 🔑Dwellings generator is now a part of Procgen Arcana | 3 | 3 | tag dwellings | Dwellings replaces Procgen Mansion in Procgen Arcana; city/village generators now "open in Dwellings". | — |
| C | 2024-12-27 | `118772106` | 🔑Dwellings 1.3.5: visual and UI improvements | 3 | 2 | tag dwellings | Dwellings 1.3.5: visual and UI improvements. | — |
| C | 2025-01-20 | `120395768` | 🔑Dwellings 1.3.6: advanced export again and abstract furniture | 3 | 2 | tag dwellings | Dwellings 1.3.6: abstract furniture from Dark Clues. | — |
| C | 2025-02-03 | `121415691` | 🏰🏡🔑Three generators have been updated | 6 | 3 | tag dwellings | Three generators updated (has a Dwellings section). | watabou-city, watabou-village |
| C | 2025-11-07 | `143036785` | 🔑Dwellings 1.3.8: improved lighting and marked entrances | 4 | 0 | tag dwellings | Dwellings 1.3.8: lighting; entrances marked where the settlement generator asks ("Open in Dwellings"). | — |
| C | 2025-11-14 | `143565705` | 🔑Dwellings 1.4.0: JSON export and improved stairs | 2 | 2 | tag dwellings | Dwellings 1.4.0: JSON export, improved stairs. | — |
| C | 2026-05-12 | `158074424` | 🍻Taverns | 4 | 10 | tag dwellings | Taverns: Tiny Pubs/Taverns integration with Dwellings. | — |

Excluded keyword hits:

| date | post | title | why excluded |
|---|---|---|---|
| 2019-07-04 | `28088976` | Plans for July | Plans post; its Procgen Mansion paragraph is repeated in 28327848 (included). |
| 2020-02-15 | `34061942` | City Viewer 1.0.1 | Passing comparison ("nothing like procgen mansions"). |
| 2020-03-12 | `34822131` | Book Hunter and plans for the rest of March | Plan line only (future Procgen Mansion improvements). |
| 2020-12-23 | `45360377` | City Viewer 1.1.0: support for trees and islands, improved UI | Passing comparison (trees look like Procgen Mansion's). |
| 2021-02-03 | `47063541` | 🏰Medieval Fantasy City Generator 0.8.1: major UI changes | Plan line only ("next generator to update is Procgen Mansion"). |
| 2021-04-30 | `50688261` | 🏠Village Generator 1.2.5: fields | UI reference only (hidden options button "like in Procgen Mansion"). |
| 2021-10-26 | `57890525` | The Haunting of... | Side-view haunted-house challenge piece; "manor" used in passing. |
| 2022-03-28 | `64375271` | 📍Neighbourhood Generator 1.1.0: templates, large buildings and other features | Plan line only (Procgen Mansion to get new floor plans). |
| 2022-04-07 | `64845431` | 🌆City Viewer 1.2.0: a bunch of new visual features | Passing (view mode similar to Procgen Mansion) plus a plan to open buildings in it, delivered in 66544756 (included). |
| 2022-04-22 | `65463007` | Procgen Arcana | Passing (Procgen Mansion as a candidate for Procgen Arcana). |
| 2022-07-19 | `69286048` | ⛏️Cave Generator | Passing ("like those haunted mansions"). |
| 2023-12-15 | `94721098` | 🍺Tiny Pubs 1.0.1 | Plan line only (elevations for Dwellings). |
| 2024-03-28 | `101173551` | Straight skeletons | Straight-skeleton roofs for MFCG/NG; Procgen Mansion named in one parenthetical (roof approach). Already archived and read in watabou-extra. |
| 2024-05-23 | `104796798` | 🏡Village Generator 1.6.0: palisades | Plan line only (maybe Dwellings next). |
| 2024-06-27 | `106975409` | ⛏️Cave/Glade Generator is now a part of Procgen Arcana | Passing (Procgen Mansion to be replaced by Dwellings, stated fully in 111909860/113347826). |
| 2024-07-30 | `109092851` | ☠️Perilous Shores 1.6.5: fjords and curved labels | Plan line only (back to Dwellings next). |
| 2024-08-27 | `110884091` | ⛏️Cave Generator 2.1.3: new shape options | Plan line only (Dwellings next). |
| 2024-11-08 | `115606722` | More ⛵️Sails | Passing (deck plans suggestion for Dwellings). |
| 2024-11-26 | `116745476` | 🏡Village Generator 1.6.4: crossroads and numbered houses | One-line UI mention (double-click opens a building in Dwellings). Already in watabou-village. |
| 2024-12-10 | `117634240` | 🏡Village Generator 1.6.5: small improvements | One-line UI mention (numbered buildings open in Dwellings). Already in watabou-village. |
| 2025-02-10 | `121925332` | More ⛵️Sails | Passing (a break from Dwellings). |
| 2025-10-23 | `141879891` | ⛲️Urban Places 1.2.0: place names and new buildings | Passing (Urban Places menu lacks "open in Dwellings"). |
| 2026-03-06 | `152377062` | ☠️Perilous Shores 1.8.0: blueprint editor | Perilous Shores land-painting editor, only compared with the Dwellings/Procgen Mansion blueprint editors. |
| 2026-09-09 | `169047704` | 🏡Village Generator 1.6.7: improved trees | Passing (list of Minor Arcana candidates). |

## Reader worklist

`research/worklists.json` now has the key **`manor`**, with 32 directories in the same shape as the other keys:

- `research/devlogs/manor` first: `_page.md`, `_comments.md`, `_page-images/`. There are no devlog subdirectories.
- Then the 31 directories `research/patreon/watabou-manor/<id>`, oldest to newest.

Suggested reading priority is A, then B/B2, then C (tiers above).

```
python3 -c "import json; [print(x) for x in json.load(open('research/worklists.json'))['manor']]"
```

## Deliberately deferred (documented, not a gap to re-find)

- **itch.io pages and devlogs of Procgen Mansion (1 devlog: `374538` *2.1.2: permalinks*) and Dwellings (15 devlogs):** not archived.
  This lane's itch scope was FM, and the Patreon side of both generators is archived above.
  One command archives each generator's page, comments and devlogs into `research/devlogs/<slug>/`: `python3 tools/devlog_scrape.py procgen-mansion dwellings`.
  Worth doing if `manor-read` finds the Patreon lineage thin, because the FM page itself sends readers to Procgen Mansion.
- **Other single-building generators (Tiny Pubs, Taverns, Lighthouses):** not selected because none matched the search, except *Taverns* `158074424`, which is tagged `dwellings`. *Taverns and quips* `158953060` is locked.
  They are candidates if stage 3 wants special-building generators (tavern, lighthouse).
- **On-disk cross-references not duplicated into the worklist:**
  - itch mirrors of included posts: `research/devlogs/village-generator/382428-128-integration-with-procgen-mansion`, `research/devlogs/neighbourhood/419786-120-new-template-integration-with-mansions-lots-of-visual-changes`, and `.../880636-` / `.../880634-three-generators-have-been-updated`.
  - comment-level mentions of Procgen Mansion in `research/devlogs/medieval-fantasy-city-generator/101529-…` (a creator reply on what Procgen Mansion was originally for), `…/123268-city-viewer-aka-toy-town-2` and `research/devlogs/village-generator/613514-plans`.

## Tool changes made by this lane

**`tools/devlog_scrape.py`:**

- Adds the target `fantasy-manor` and the output alias `OUTDIR` (fantasy-manor → `research/devlogs/manor/`).
- Adds a game filter on the CLI.
- Archives the page and comments pages (`_page.md`, `_comments.md`) for games named on the CLI.
- Merges `index.json` by URL.
- Replaces the devlog comment parser. The old regex matches **0 of 11** comments on the current itch markup, because of a new `dir="auto"` attribute (CONFIRMED on MFCG devlog 101529). Any devlog archived after that markup change silently lost its comments. The new parser reproduces all 11 comments archived on 2026-09-21, and adds date, reply depth, votes and a creator flag.
- A run with no arguments behaves as before, plus the new target (404, so 0 devlogs).

**`tools/patreon_scrape.py`:**

- Adds the group kind `ids_file` and the group `watabou-manor`.
- Adds a group filter on the CLI.
- Merges `index.json` instead of rebuilding it. A run with no arguments used to rebuild the index from `GROUPS` only, which would have dropped `watabou-extra` (that group was archived ad hoc and is not in `GROUPS`).

## Fable review (2026-09-27) — B16

**Verdict: CONFIRMED** (`docs/fable-review/main/evidence-captures.md`, row B16). `selection.json` records the 54 hits, 31
included and 24 excluded with the reasons tabled; the locked post was recorded, not bypassed. `tools/devlog_scrape.py` and
`tools/patreon_scrape.py` were read whole: `archive()` returns early when `post.md` exists, `archive_post()` reuses `post.json`
and `comments.json`, and both indexes merge rather than rebuild, so re-runs alter no earlier archive; the five Patreon groups
(`watabou-extra` 65 posts included) are intact. The "0 of 11 comments" regression is accepted on this lane's check (no network
in the review seat). Two movements since landing, neither an error of this page: (1) the group `watabou-manor` holds 33 posts
— the Dwellings lane added `158953060` (Taverns and quips, locked) and `159559624` (Taverns 1.1.0) on 2026-09-26 18:58, with
`research/devlogs/taverns/` (3 devlogs); (2) the "deliberately deferred" Procgen Mansion and Dwellings devlogs were archived
at 06:42 on 2026-09-25 (`research/devlogs/procgen-mansion/` 1 devlog, `research/devlogs/dwellings/` 15 devlogs, read by
`research/findings/manor.md` §0), so `research/devlogs/index.json` now has 92 rows = 73 + 15 + 1 + 3.
