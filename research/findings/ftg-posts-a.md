# FTG Patreon posts — OLDEST third (slice `ftg-posts-a`)

Source: `/Users/cstokes/Desktop/Maps/research/patreon/ftg/<post_id>/post.md` + `images/NN.*`.
Ten posts, 2022-04-16 → 2023-12-03. Every `post.md` read in full including comment threads;
every listed image opened (animated GIF/MP4 assets were frame-sampled with ffmpeg into contact
sheets and full-resolution stills; large PNGs were cropped/upscaled to inspect geometry).

Evidence tags used throughout: **[STATED]** creator explicitly describes the method ·
**[SHOWN]** visible in an image/recording but not explained · **[INFERRED]** my reconstruction,
reasoning given · **[NAMED-ONLY]** feature announced, no method given.

> **Scope warning for the re-implementer.** This third of the FTG corpus contains almost no
> explicit *geometry*. Thomas writes about the settlement-content pipeline (what buildings and
> people exist, how districts are grouped, how schedules run) far more than about how polygons
> are made. The single named algorithm in the whole slice is the **left-hand-rule maze
> traversal** used by the map-editor fill tool (post 65223067). No post in this slice names
> Voronoi, Delaunay, straight skeleton, polygon offsetting, Poisson-disc, A*, L-systems, noise,
> Chaikin or marching squares, and **no post in this slice mentions Three.js, WebGL, canvas or
> any renderer technology at all**. The road/lot/plot geometry therefore has to be reconstructed
> from images (§3, §4) and from the *vocabulary* the settings UI exposes (§2.12–2.16), which is
> unusually revealing because the UI is a direct window onto internal data structures.

---

## 1. Chronological table

| # | Date | Post id | Title | What changed (relative to the previous iteration) |
|---|------|---------|-------|---------------------------------------------------|
| 1 | 2022-04-16 | 65223067 | Development Update - Layout edit | Road persistence refactored from `(startCoord, endCoord)` to `(startIntersectionId, endIntersectionId)` with a separate intersection table. Enables connectivity queries, road-editing snapping (to intersections and to first crossing), and a planned **fill tool** (raycast + left-hand-rule traversal). Requires destroying all existing towns. Pre-release; login flow and free/premium tiers being designed. |
| 2 | 2022-05-17 | 66499838 | Out of beta! | Full release. Settlements now persistent. Email/username/password login. Road-editing snapping shipped. Two tiers: free (10 settlements) / premium (unlimited). Old settlements wiped; migrated roads warned as edit-hostile. Next: field/mine placement controls, better building placement. |
| 3 | 2022-12-13 | 75844005 | Development Update - December 2022 | Six months of accumulated work listed: custom races/religions, **full map editing**, government generation controls, folders, account-less temporary settlements, public share links, **building render overhaul "to give them more depth"**, **trees**, **farmland and forests overhaul**, move/swap buildings, re-roll building, **manually drawn initial rivers/oceans**, **branching rivers**. Deep-dive on the water drawing tool. Lakes, branching rivers and islands now also possible in *generated* water. ~50 patrons, ~7k users. |
| 4 | 2023-03-04 | 79527117 | Development Update - March 2023 | Religion re-modelled from a flat god list to *religions each owning gods* (to make religious rivalry meaningful). New card/folder create-settlement form + landing form; form settings saved to cookies. Many new relationship types (business/competitive/religious/romantic rivals, crushes, separated partners, affairs). **Factions** (goals, methods, buildings, meetings, member/leader selection; 7 templates). **Events** generated per building from relations + factions; "Start event" mutates person positions and relations. |
| 5 | 2023-04-13 | 81472775 | Development Update - April 2023 | **FoundryVTT integration** (premium beta; full building/person/event/time access, player sync, party-location marker). **GeoJSON export**. **SVG export overhaul**. Better fill controls. CTRL-hover delete for buildings + trees. More shop names. Announces the coming District Overhaul. Discord + subreddit created. |
| 6 | 2023-06-17 | 84680671 | Development Update - June 2023 | **District Overhaul.** New district grouping + placement algorithm (overall districts + sub-districts); better district names with erosion over time; visually distinct districts (tents for squalid, density for poor, decoration for wealthy); district settings exposed in the create form; district info + demographics UI; custom building colours + more roof materials; **better utilisation of empty space**; **multiple walls placed at configurable build-progress percentages**; **re-roll districts**; dark mode. |
| 7 | 2023-07-29 | 86856028 | Development Update - July 2023 | Custom name lists (premium upload of first-name/surname .txt). Per-race **appearance templates** (line templates with `$optionN` / `$height` / `$aOrAn` substitution over per-race weighted tables, with conditional line display). More/custom **genders** with pronouns, name type, height config and an N×N **gender-relations weight matrix**. Race form refreshed. |
| 8 | 2023-08-31 | 88558259 | Development Update - August 2023 | Accessibility pass (aria-labels, landmarks, semantic HTML) + a new **building list/search view** so buildings/people are reachable without the map. Settlement list now shows *classification* instead of a stale population (two separate data stores; avoided a dual write). Note search. **Bulk person edit**. Confirm-cancel on layout edit. States the next goal: **larger settlements**, blocked by *generation speed* and *generated settlement size*. |
| 9 | 2023-10-22 | 91451446 | Development Update - October 2023 | **Building-selection algorithm replaced**: the old *resource-demand* model retired in favour of a **building-group dependency graph** (`1 per N people` / `1 per N of group X`, with within-group proportions and shop alternatives). ~40 new buildings added; previously-unplaceable buildings now place; generation ~8% faster. New person type **retired**. Age curve tweaked (more children). Fixed bugs around **islands in rivers**. |
| 10 | 2023-12-03 | 93999105 | Development Update - December 2023 | **Schedule system rewrite**: every person type (except "delegating") can have a schedule; per-day-group schedules; new **building matchers** (incl. exact building, "fetch demanded resources") and **sub-location matchers** incl. **sub-location tags**. Entertainment artisans now perform in taverns via the `Performance` tag. Schedules lazy-loaded by job instead of copied per person: settlement file ~5% smaller, generation ~5% faster, simulation ~20% faster. Fixed buildings being emptier than they should be (e.g. taverns in the evening). |

---

## 2. Techniques

### 2.1 Road persistence: intersection-indexed graph — post 65223067 **[STATED]**

**Problem.** Roads were stored only as a start coordinate and an end coordinate. You cannot ask
"are these two roads connected?" because floating-point coordinates that *should* be identical
are not (he says so explicitly: "I can't easily do that with the previous coordinate data due to
fun floating point number rounding errors"). Without connectivity you cannot walk the network,
which blocks the fill tool and makes editing unsafe.

**Algorithm / data structure.**
- An **intersection** = `{ id, coordinate }`.
- A **road** = `{ startIntersectionId, endIntersectionId }` (+ class; see §2.2).
- Two roads are connected **iff** they share an intersection id — an O(1) integer comparison, no
  epsilon geometry.
- This makes the road network an explicit **planar graph with an edge list and a node table**,
  which is what the traversal in §2.3 requires.

**Migration / failure handling.** Deliberately shipped *before* full release precisely so that all
existing towns could be deleted rather than migrated: "migrating the old roads to the new format
would be a difficult, time consuming process". Post 66499838 confirms the wipe, and that
hand-migrated settlements have roads that "may cause you issues if you try and edit it".

**Unknown.** Whether the *generator* also produces the graph in this form (near-certain — the
fill tool works on generated roads too, per the 75844005 comment thread, albeit buggily), whether
intersection ids are stable across regeneration, and whether roads are single segments or
polylines. Image evidence (§3.2) shows roads drawn as **multi-vertex polylines with mitred
corners**, so either a road carries interior vertices between its two intersections, or every
bend is itself an intersection of degree 2. The generated network in post 65223067's video shows
long smooth curved roads crossing farmland with many bends and few junctions, which favours
**interior vertices on a single road record**. [INFERRED]

### 2.2 Road classes — posts 65223067 (edit toolbar), 84680671 (map) **[SHOWN]**

The layout-edit toolbar (65223067 images 02/03/05) offers exactly: **Small Road**, **Large Road**,
**Building**, **Demolish** — plus **Cancel Edit** / **Save Layout**. Later posts add wall and fill
tools (75844005 comments mention a *wall tool* that also places "stone fences", and a separate
*road-erasing* tool). So the road hierarchy in this era is at minimum **two widths**, with walls
as a third linear feature that shares the road-editing machinery (evidenced by the bug where
stone fences "are part of the wall tool but can only be erased by the road-erasing tool" —
i.e. **walls and fences are stored as roads/edges in the same graph**, a strong structural hint).
[INFERRED from the bug report]

### 2.3 Fill tool: raycast seed + left-hand-rule face traversal — post 65223067 **[STATED]**

**Problem.** The user wants to repaint the *background* of a map area (the ground under roads and
buildings — white town tile, farmland tile; explicitly **not** water). Point-by-point polygon
drawing is available but "that's a lot of clicks" when the target is simply the area bounded by
roads.

**Algorithm (his words, expanded).**
1. The click must be converted into a polygon. **Find one road bounding the clicked area** — "in
   practice, finding the first road can be done by using **raycasting**" (cast a ray from the
   click point and take the first road it hits).
2. From that road, **walk the graph always taking the leftmost path at each junction** — "a
   classic maze trick". Because the graph is planar and the rule is consistent, the walk returns
   to its start.
3. **The list of junction coordinates passed through is the fill polygon.** Done.
4. Choosing the leftmost successor is done "given a previous point, a current point, and a list
   of next point options, using a bit of maths" — i.e. sort candidate edges by signed angle
   relative to the incoming direction and take the extreme one. [INFERRED — he does not give the
   formula, but this is the only thing "a bit of maths" can mean here.]

This is the standard **planar-graph face extraction / next-edge-clockwise-around-vertex**
algorithm; his framing as a maze wall-follower is the same operation stated informally.

**Why §2.1 was a prerequisite:** step 2 needs "a list of next point options" at a junction, which
requires knowing which roads share an endpoint — the exact query the intersection-id refactor
enables.

**Known failure modes.**
- *Reported by user Sazra, 2023-02-20 (75844005 comments):* "the fill tool for backgrounds is a bit…
  finicky. If I try to fill a field surrounded by streets… it sometimes works and sometimes just
  fills half of the town. **Seems to have problems with generated streets but works for
  self-drawn streets**." Thomas: "Thanks - I'll take a look into these."
  → **Diagnosis [INFERRED]:** if the face is not actually closed (a dangling road end, a
  T-junction where a road passes *through* rather than terminating, or two roads crossing without
  a shared intersection), the left-hand walk escapes the intended cell and traces the **outer
  boundary of a much larger region** — literally "half of the town". Generated streets are more
  prone to this than hand-drawn ones because hand-drawn ones go through the snapping in §2.4,
  whereas the generator may emit crossings without inserting intersections.
- *Same thread:* "Sometimes big filled areas can't be easily erased because they only get a
  single pixel that can be selected for the erase tool." → the fill result is stored as a
  **background polygon object** whose hit-target is not its area. [INFERRED]
- Post 81472775 lists "**Better fill controls**" as a shipped April-2023 fix.

**Unknown.** Whether the resulting polygon is stored as a point list (his words imply yes: "we
need to convert the fill area into a list of points") or as a reference to the bounding cycle of
road ids — the former means the fill is **frozen** and desyncs if a road later moves.

### 2.4 Road-edit snapping: intersection snap + first-crossing split — post 65223067 **[STATED]**

**Problem.** Under the intersection-id model the user must never create (a) a road whose endpoint
is *near* an existing junction but not *at* it, or (b) a road that overlaps another road without
creating an intersection. "If they did, when we use the fill we'd get some weird results when we
try to follow the left hand path."

**Algorithm.**
- **Snap to existing intersections** while dragging ("It would be a terrible experience if you had
  to click on the exact coordinate of an existing intersection").
- **Snap the new road to the first crossing** it makes with an existing road, i.e. truncate the
  drag at the first intersection point and materialise a new intersection there (which implies
  **splitting the crossed road into two roads** at that point).
- **[SHOWN]** in 65223067 images 02/03/05: a new road drawn out into farmland is committed as a
  ribbon; the in-progress stroke renders in a red/brown highlight, committed roads render in the
  final cream-with-casing style; drawn roads immediately form new closed cells with existing ones.

**Known failure mode (75844005 comments, 2023-02-19).** Sazra reports walls failing to save when
many are placed at once and suspects "drawing walls over roads". Thomas confirms the root bug:
> "There is a known issue where if you **draw a road/wall over a road it breaks** - it's supposed
> to snap so it **splits the existing road in two**, so for now just make sure everything is
> snapping when you intersect things. I'm looking into fixing the root cause."

That reply is the clearest statement of the intended invariant: **any crossing must be
materialised as an intersection that splits both edges.** A re-implementer should treat this as a
hard invariant enforced at write time, not a UI nicety.

### 2.5 Two-phase pipeline: *generate settlement* then *generate map* — post 91451446 **[STATED]**

> "The algorithm Fantasy Town Generator uses to create the settlement maps can be split into two
> main steps: **1. Generating the settlement**: this creates the buildings and people that will
> fill the settlement… **2. Generating the map**: this takes the list of buildings from the
> previous step, and generates a map that gives all of those buildings a location."

This is the single most important architectural fact in the slice, and it is the **opposite** of
watabou's generators: **FTG decides the contents first and lays out second.** The map is a
placement problem over a pre-computed multiset of buildings, each already carrying its type,
lifestyle, occupants and employees.

Corollaries confirmed elsewhere:
- Districts are formed by **grouping the pre-existing building list**, then claiming map area
  (§2.7).
- "the **factions are generated before buildings are placed**, so getting things to make sense on
  the map would need some thought" — Thomas, 84680671 comments, 2023-07-23. So the content phase
  itself is ordered: people/factions → buildings → districts → map.
- Because contents are fixed before geometry, the layout stage must **guarantee it can place every
  building**, which is why "wasted space" and "adjacent lot" logic (§2.7) exist at all.

### 2.6 Building selection — OLD: resource-demand model — post 91451446 **[STATED, with worked numbers]**

**Problem.** Pick *which* buildings and *how many*, such that (a) ratios are plausible (more
tailors than booksellers) and (b) buildings that depend on each other co-occur (no leather
workers without tanners or leather shops).

**Algorithm.**
- Each **resident creates demands**.
- Each **placed building satisfies** some demand and **creates** new demands.
- Loop: **pick the building that satisfies the currently biggest demand**; repeat until the
  settlement reaches the desired population.
- **Shops**: each demand carried an *import amount*; once imports crossed a threshold, a shop for
  that demand was placed. The threshold was **a single hard-coded value shared by all demands**.

**His worked example (verbatim parameters).** Target ratio farms:weavers:tailors = 4:2:1.
- each person → 1 demand for clothing
- each tailor → satisfies 100 clothing, creates 200 fabric
- each weaver → satisfies 100 fabric, creates 100 cotton
- each farm → satisfies 50 cotton
⇒ "1 tailor, 3 weavers, and 6 farms per 100 people."
(Note: the stated intent was 4:2:1 and the config yields 6:3:1 — a live demonstration of his
complaint #1, that the config is not reason-about-able.)

**Why it was abandoned (his four reasons).**
1. Impossible to reason about: the tailor config tells you nothing about how many tailors result.
2. Demand priority is fragile: "some buildings may never get placed as not enough demand was
   created - or not in the expected ratio".
3. Every building needs a demand to satisfy — adding an obscure building (cabinet maker) forces
   awkward decisions about inventing or sharing demands and gives no control over within-category
   ratios.
4. The single global shop threshold meant "some demands would have different ratios of shops, and
   **not all shops were actually created**".
5. Bookkeeping cost: "a reasonable amount of effort to keep track of the current demands, and
   which is the biggest" (a priority-queue over a mutable demand map). Retiring it made generation
   **~8% faster**.

### 2.7 Building selection — NEW: building groups + dependency graph — post 91451446 **[STATED]** + **[SHOWN]** (images 01/04, 02/05, 03/06)

**Data model.**
- Buildings belong to a **group** (e.g. `Tavern`, `Weaved textiles provider`, `Yarn provider`).
- Each group defines **when one of its buildings should be placed**, as either
  - a **population threshold** (`1 farm per 25 people`), or
  - **relative to other groups** (`1 weaver per 2 farms`, `1 tailor per 2 weavers`).
- Each group defines the **proportion of buildings placed within that group**.
- Each group defines **shop alternatives** that can be placed instead of / alongside core buildings.

**Exact UI fields (91451446 image 04, group "Weaved textiles provider", tab "Dependency graph"):**
- *Building options*: `Edit core buildings`, `Edit shops`
- *Dependency configuration*: `Dependency type` = **"Per other buildings"** (the other value being
  per-population), `One per number of other buildings` = **1**, `Other buildings` = **[Yarn
  provider]** (a chip list — a group can depend on several groups)
- *Other configuration*: `Use custom shop percentage` (bool), `Custom shop percentage` = 0.00,
  `Ignore rules for first building` (bool), `First building population threshold` = 0

The last two are the escape hatch that fixes old-failure-#2: a group can be guaranteed **one**
instance once the settlement passes a population threshold, regardless of its ratio rule.

**Lifestyle-conditioned option rows (image 02/05, group "Tavern core buildings").** Rows are
`(set of lifestyles) → (ordered list of candidate buildings)`:

| Lifestyles | Candidate buildings |
|---|---|
| Squalid, Poor | Quiet bar, Raucous dive, Brothel, Secret society, Gambling den |
| Modest, Comfortable | Quiet bar, Raucous dive, Secret society, Gambling den, Casino, Brothel |
| Wealthy, Aristocratic | Upper class tavern, Secret society, Casino, Brothel, Members only club |

**Within-row proportions (image 03/06, "Core buildings (row 2)")** — these are raw weights, not
percentages: `Quiet bar 8.00`, `Raucous dive 5.00`, `Secret society 0.50`, `Gambling den 1.00`,
`Casino 1.00`, `Brothel 1.00`.

**The six-level lifestyle ladder is therefore: Squalid · Poor · Modest · Comfortable · Wealthy ·
Aristocratic** — it appears again in the district config (§2.9) and in the create-form "Average
Lifestyle" dropdown (79527117 image 13, value "Comfortable"). This is a first-class axis of the
whole system.

**Results claimed.** ~40 new buildings became configurable; previously mis-configured buildings
started placing; overall generation ~8% faster.

**Unknown.** The evaluation order (is it a topological sort over group dependencies, or an
iterate-until-stable loop?), what happens on a dependency cycle, and how the population target is
reconciled with the ratio rules when they disagree. `Dependency type` likely has ≥2 enum values
("Per population", "Per other buildings"); only one was screenshotted.

### 2.8 District formation — OLD algorithm — post 84680671 **[STATED]**

Quoted in full because it is the only description of the layout loop in this slice:

> "In my previous algorithm, buildings were grouped together into potential districts based on the
> lifestyle of the building (e.g. lower / upper class). **At this point, the road network is
> generated.** Next, a district would **claim a lot** and then place as many buildings as it can
> inside the lot. If it had remaining buildings, it would try **claim an adjacent lot**, and if
> there were no adjacent lots, **a new district of that type would be started somewhere else**.
> This would repeat for all districts until all buildings were placed."

Extracted ordering (**this is the layout pipeline**):
1. Buildings (already generated, §2.5) are **grouped into candidate districts by lifestyle**.
2. **The road network is generated** — and therefore the **lots** (the faces of the road graph,
   §2.3) exist as a by-product. Note the network is generated *after* district grouping but
   *before* placement, so district sizes cannot influence road topology in this version.
3. Each district **claims a lot** and fills it with as many of its buildings as fit.
4. Overflow → **claim an adjacent lot** (lot adjacency = sharing a road edge).
5. No adjacent lot available → **start a new disconnected district of the same type elsewhere**.
6. Repeat until every building has a location.

**Stated downsides (its failure modes).**
- "The buildings in the district would be **basically random**."
- "The district wouldn't have an **identity beyond the lifestyle**."
- "If a district only had a single building left to place, and it chose a large lot, **a lot of
  space would be wasted**." → **[SHOWN]** exactly this in image 01: a huge empty beige lot with a
  handful of buildings clinging to its edges.

**Unknown (critical).** *How the road network itself is generated* — never described anywhere in
this slice. Nor how a lot is chosen to be claimed (nearest to centre? largest? random?), nor how
buildings are arranged inside a lot. §3 reconstructs the last of these from images.

### 2.9 District formation — NEW: overall districts + sub-districts — post 84680671 **[STATED]**

**Problem.** The three downsides above, plus wanting districts to have a describable identity.

**Model.**
- **Overall district** — the thing rendered and labelled on the map. Keyed on **lifestyle** or a
  **major industry**.
- **Sub-district** — a finer economic identity, e.g. "a type of industry, like clothing /
  metalwork". An overall district owns **multiple** sub-districts.
- Every building has a **preferred sub-district**.

**Algorithm.** "the gist is basically the same - buildings group together (**now based on lifestyle
and the building's preferred sub-district**), and then a parent district tries to **place its
sub-districts in order**." Plus one key addition:
- **Empty-space backfill:** "before, when there was empty space, it would just be left empty. Now,
  I use the district information (sub-district + lifestyle) to **randomly pick buildings to fill
  in the space**." → the content phase's output is a *minimum*, not a maximum; layout can invent
  extra buildings (and therefore extra people — confirmed by the re-roll feature creating "new
  people", §2.11, and by 88558259's complaint that populations now drift from the stored value).

**Stated effect.** "districts with buildings that are **much better grouped** on the map,
replicating **industry clumping together as it's more economical**", and a district identity that
can be summarised for the UI.

**[SHOWN] Before/after (images 01 vs 02).** Same lot, same road frame, same pink outlier building.
Before: perimeter sparsely lined, vast empty interior. After: a **continuous ring of buildings
around the whole lot perimeter**, each with its long axis roughly perpendicular to the street,
adjacent buildings abutting, leaving a small irregular interior courtyard. This is the visual
signature of **street-frontage (burgage-plot) packing**, see §3.3.

**[SHOWN] District info UI (images 07, 08).** "Hamower — Overall, is a **wealthy lifestyle
district**. The district was first named **Hamlet Tower**, but over time people have started
calling it Hamower. **Made up of smaller areas:** Leather industry · Residential." Demographics
tab → Buildings table: `upper class home 33 (78.57%)`, `blacksmith 2 (4.76%)`, then `weaver`,
`carder`, `rugmaker`, `foundry`, `spinner`, `distillery`, `raucous dive` at 1 each (2.38%) —
**42 buildings in the district**, and a second tab for **Residents** demographics. Useful real
numbers: a wealthy residential district is ~79% housing and has a long tail of single instances.

### 2.10 District naming + name erosion — post 84680671 **[STATED]**

- Name **parts** are drawn from the sub-district vocabulary (wider pool than before).
- **Landmark detection** improved, so names can reference "physical parts of the district" —
  a wall, a tower, a gate, a dock, a market.
- **Erosion over time:** "a district originally called '**Hamlet Tower**' (a residential area next
  to a wall with a tower), could become '**Hamower**'" — a contraction/elision rule applied to the
  original compound to produce a shorthand, with the original preserved for the description text.

**[SHOWN] corroboration (image 13, a two-walled city).** District labels: MARKGATE, PELTOWER,
BULPOL, ESTPASS, WALLAZAAR, STRETO(N), LOWBURH, FLEASTEAD, DUN NEST, WALCRIBS, BULGROCER,
ESTFORGE, PALISWAY, ROADWALL, WALLARLOR, SOUTATE, PARYKE, CLOTH GATE, HAMOWER, FELLWALL. Readable
as eroded compounds: *South Gate→SOUTATE*, *East Pass→ESTPASS*, *East Forge→ESTFORGE*,
*Wall Bazaar→WALLAZAAR*, *Low Burh→LOWBURH*, *Flea Stead→FLEASTEAD* (and FLEASTEAD is indeed the
tent/squalid district). Landmark words in evidence: **gate, tower, wall, pass, market, cloth,
road, park, docks**. Note some names stay uneroded (CLOTH GATE, DUN NEST) → erosion is
probabilistic. [INFERRED]

### 2.11 Re-roll district — post 84680671 **[STATED]** + **[SHOWN]** (images 11/12, 23)

**Mechanism.** "Using the new sub-districts, and a **similar algorithm to the one implemented to
fill empty space**, you can now re-roll large areas of the map. This will **delete any existing
buildings + decoration**, and create an entirely **new district filled with buildings + new
people**." Access: create a new district and enable the re-roll toggle.

**Exact settings (image 23, "New District → Re-roll"):** `Re-roll district` (bool) ·
`Overall lifestyle` = Modest · `Generation type` = **"Residential, with basic shops"** ·
`Use default (lifestyle based) decoration` (bool) · `Buildings not on lot edge enabled` (bool) ·
`Dense buildings` (bool) · `Building modifier` = None · `Building material` = Default.

**[SHOWN] before/after (11 → 12).** Before: a lot with a perimeter of buildings and a large
tree-planted courtyard. After: **the entire lot polygon is tiled with small quadrilateral plots**,
each carrying a red-tiled building, arranged in **rows/bands** — the lot is first split into
strips, then each strip into cells. This is the visible effect of `Dense buildings` +
`Buildings not on lot edge enabled`. The parcel cells are quadrilaterals with non-parallel sides
that follow the lot's own shape, consistent with recursive splitting of the lot polygon rather
than a rectangular grid clipped to it. [INFERRED — see §3.3]

**Downstream consequence he had to fix (88558259):** re-rolling makes it "very easy to make a
settlement much larger", which broke the settlement-list population display, because the list and
the settlement live in two different data stores. He refused to dual-write and changed the UI to
show a derived **classification** instead.

### 2.12 Decoration system: lot / lot-edge / plot / background — post 84680671 **[SHOWN]** (images 18, 19) + **[STATED]** for the defaults

The district config UI exposes the renderer's entire decoration vocabulary. This is the best
single piece of evidence in the slice for the **spatial hierarchy**:

> **district → lot → plot → building**, with decoration hooks at each level.

**Overall-district settings (image 18, for lifestyle "Comfortable"):**
| Field | Value shown | Reading |
|---|---|---|
| `Can merge when` | Always | districts may merge (into adjacent claimed area) under a condition |
| `Buildings not on lot edge enabled` | ☐ | **default: buildings only on the lot edge (street frontage)** |
| `Dense decoration` / `Sparse decoration` | (two editable profiles) | **two decoration profiles per district** |
| `Can be placed during dense phase when` | Always | **placement runs in at least two phases: a dense phase and (implicitly) a sparse phase** |
| `Dense building modifier` / `Sparse building modifier` | None | per-phase building shape/type modifier |
| `Dense building material` / `Sparse building material` | Default | per-phase roof/wall material |

**Decoration profile contents (image 19, "Sparse decoration"):**
- **Building background textures** *(the ground under/around a building's plot)*: `Grass`,
  `Lawn` ✔, `Dirt`, `Road`
- **Lot decoration** *(fills a whole lot)*: `Park` ✔, `Park with fountain`, `Plaza`,
  `Plaza with fountain`, `Plaza with well`, `Dirt`
- **Lot edge decoration**: `Trees`
- **Plot decoration** *(a weighted list; `Distribution` slider = 1.00 on the shown option)*:
  `Trees`, `Grass`, `Garden fences`, `Well`, `Fountain`, `Bandstand`, `Statue`, `Monument`,
  `Campfire` — with `+ Add option`, so a district can carry several weighted plot-decoration
  options.

**Stated lifestyle defaults.** "By default, I've made **squalid districts render like tents**,
**poor districts to be super dense**, and **wealthy districts to have more trees and other
decorations**." Also "I've added a lot more decoration options in addition to trees - fountains /
wells / fires / etc. I've also added **more roof materials - like red tile / blue tile**.
Districts can now be individually configured to place different decorations down, and have
specific materials." Plus "**Custom building colours**".

**This explains the map's colour logic [INFERRED, strongly supported by image 13]:** the beige vs
green appearance of an area is *not* a district fill colour — it is the **sum of each plot's
background texture**. Inside the walls, plots use `Dirt`/`Road` → the core reads continuous beige;
outside the walls, plots use `Grass`/`Lawn` → the suburbs read green with brown buildings floating
on them. Nothing needs to paint a "district polygon" at all.

### 2.13 Squalid districts as tents — post 84680671 **[STATED]** + **[SHOWN]** (image 03, and FLEASTEAD in image 13)

**[SHOWN] rendering:** each tent is a small **square footprint, arbitrarily rotated**, shaded as a
**four-facet pyramid** (four triangles meeting at the centre), in **saturated random colours**
(red, green, blue, orange, tan, lavender, olive). Tents sit on a bare **dirt/tan** background with
**no lot-edge alignment** — they are scattered in loose rows with irregular spacing and no shared
orientation, unlike every other district type. Sizes are near-uniform and much smaller than
ordinary buildings.

[INFERRED] Implementation is almost certainly: same plot-subdivision machinery, but with
`Building material = tent`, a square footprint of fixed small size, free rotation, and the
lot-edge constraint relaxed. The distinctive pyramid shading is a purely presentational variant
of the roof shader (§3.4).

### 2.14 Walls placed at build-progress checkpoints — post 84680671 **[SHOWN]** (image 22) + **[STATED]** ("Multiple walls")

This is the highest-value inference target in the slice.

**[SHOWN] UI (Military section):**
- `Amount of full-time military` = **"Normal, based on size"**
- `Full-time military percentage` = **0.67**
- `Walled` ✔
- `When to place walls` → a table titled **"Estimate percentage of buildings within wall"** with two
  rows, values **20.00** and **60.00**, each deletable, plus **`+ Add wall`**.

**[INFERRED] Reading — and it is close to forced by the wording.** Layout proceeds incrementally
(§2.8: districts claim lots one after another until all buildings are placed). A wall entry says:
*when the fraction of the settlement's buildings that have been placed reaches P, build a wall
around the currently built-up extent.* Multiple entries ⇒ **concentric historic wall rings**, the
inner wall enclosing the oldest ~20% of the town, the outer enclosing ~60%, and the remaining ~40%
of buildings sprawling outside as suburbs. "Estimate" is doing honest work: the wall is placed
against the *predicted* final building count, so the realised percentage inside will differ.

**[SHOWN] corroboration (image 13).** Exactly two wall rings around a city whose inner ring
encloses the densest, most-built core and whose outer ring leaves roughly a third of the built
area outside it — and the *outside-the-wall* area is visibly lower-density, greener, and strung
along roads. The two rings are **not** concentric offsets of one another; each has its own
irregular, nearly-convex shape following the built extent it enclosed at its moment of placement.

**[SHOWN] wall geometry.** A closed polyline of ~14–20 vertices, drawn as a thick (~8–10 px at the
zoom of image 13) near-black stroke with **round towers (filled dark circles, ~2× the wall
thickness) at vertices** — not at every vertex, but at most direction changes. The polygon is
nearly convex with long straight runs and shallow turns; it does **not** follow the ragged lot
boundary. A convex-hull-then-simplify / hull-with-slack over the built-up plot centroids is the
obvious reconstruction. [INFERRED]

**[SHOWN] wall vs roads.** The wall is drawn **over** the road network and, in several places,
runs *along* a road alignment. No explicit gate glyph is rendered at this zoom; roads appear to
cross the wall line. But district names include **MARKGATE, CLOTH GATE, SOUTATE (South Gate),
ESTPASS** — so gates exist as named landmarks feeding §2.10 even if they have no distinct symbol
in this era. [INFERRED]

**Known failure mode (75844005 comments):** "If you edit the map and try to place **too much walls
at once it will not save changes**" — related to the road/wall-crossing bug of §2.4.

### 2.15 Water: manual river/ocean drawing, bridges, branching — post 75844005 **[STATED]** + **[SHOWN]** (images 01–04)

**Semantic distinction (stated, and it is a generator constraint not a cosmetic one):**
> "**Rivers** are bodies of water that **can be crossed with a bridge**, while **oceans cannot be
> crossed**."

**Flow.** Create-settlement → Landscape tab → `Water configuration`: **Generated** ↔ **Manually
drawn**. Under *Generated*: `Coastal` (bool), `Rivers` (bool), `River configuration` = `Random`
(dropdown, other values unseen). Under *Manually drawn*: **`Required distance between bridges` =
100** (slider + numeric), a live readout "**Current draw state: 0 rivers, 0 oceans**", and a
`Draw` button.

**[SHOWN] the drawing canvas (image 03, "Draw Initial State").** Flat taupe background; **two
vertical black lines marking the left/right bounds of the generation area**; a **red dot marking
the settlement centre**; tools **`Draw river` · `Draw ocean` · `Demolish`**; `Cancel` / `Save`.
Water is drawn freehand as a **variable-width stroked polyline** (round joins/caps), blue-grey;
an ocean/lake is a closed blob. The drawing shows a river forking, a second branch rejoining, and
an enclosed lake — i.e. the tool permits the very topologies he then lists.

**Capability claims.** "more complicated water layouts are now possible, like **lakes, branching
rivers, and islands** - some of these are also now **generated** when the generate river / oceans
options are selected!"

**[SHOWN] the generated result (image 04).** A town straddling a river with a lake at its south
edge, developed on **both banks**, with the road network crossing at several points. Bridges read
as the road ribbon continuing across the blue band, with a small grey quay/landing polygon at the
main crossing.

**Failure mode fixed later.** 91451446: "I also fixed some bugs around **islands in rivers** during
generation." → islands (land fully enclosed by river) were a real generator hazard, presumably
because the settlement-area/bridge logic assumed a river separates exactly two sides.

**Unknowns.** How generated rivers are produced (no method given anywhere in this slice); how the
"required distance between bridges" constraint is enforced (greedy placement along the river with
a minimum spacing is the obvious reading); whether the drawn stroke is rasterised to a mask or
kept as a polygon; what the units of `100` are.

### 2.16 The settlement-parameter surface — posts 75844005, 79527117, 84680671 **[SHOWN]**

Worth recording verbatim because it enumerates what the generator actually takes as input.

**Old tab layout (75844005 image 01):** General · Races · Government · Layout · Landscape ·
Religion · Military · Advanced.

**New card layout (79527117 image 14)** — with his own one-line summaries, which name the knobs:
| Card | Subtitle |
|---|---|
| General | Name, size, lifestyle |
| People | Races, education, stats |
| Government | Pick types, titles, leader names |
| Factions | Guilds, mercenaries |
| **Layout** | **Dense buildings, trees** |
| **Landscape** | **Farms, forests, raw resources** |
| **Water** | **Rivers, oceans** |
| Religion | Religions, gods |
| **Military** | **Guards, walls** |
| Advanced | Supply and demand, building config |

("Advanced → *Supply and demand*" is the old §2.6 demand model; 91451446 replaces this card with a
simpler **Buildings** section whose tabs are *Overall settings · Individual buildings · Dependency
graph*.)

**Landing form (79527117 image 13):** `Name` (blank ⇒ random) · `Size` = **"Town (~4000 people)"** ·
`Average Lifestyle` = Comfortable · `Coastal` ☐ · `Rivers` ☐ · `Forests` ☐ · `Walled` ☐.
So **size is chosen as a named class with an approximate population**, not a raw number.
Settlement classes seen elsewhere: **City**, **Small city** (88558259 image 02), **Town**.

**Available Raw Resources (75844005 images 01/02)** — a 14-item checklist laid out in visually
grouped columns: `Flax, Grain, Cotton, Hops, Grape, Sheep, Cattle, Pigs, Bees` / `Logs, Gems, Ore,
Stone, Fish`. Defaults ticked in the screenshot: **Grain, Sheep, Cattle, Pigs**. These feed the
building dependency graph (a `Yarn provider` needs wool/flax/cotton) and, presumably, which
farm/field types appear in the landscape.

**Military (84680671 image 22):** `Amount of full-time military` (enum incl. "Normal, based on
size"), `Full-time military percentage` 0.67, `Walled`, `When to place walls` (§2.14).

### 2.17 Settlement simulation: schedules, sub-locations, and their rewrite — post 93999105 **[STATED]** + **[SHOWN]** (images 01–05)

**Old model.** Only *working* people had schedules; a schedule governed only where/how they work;
each person's schedule was **materialised and persisted onto the person** at generation time;
schedules only applied on working days. Problems: massive duplication in the settlement file, and
non-working people/days had no behaviour — which made some buildings "more empty than they should
have been (e.g. taverns in the evening should be busy)".

**New model.**
- **Every person type except "delegating" can have a schedule** (so there is a person type that
  *delegates* its schedule to another — presumably children/dependants following a parent).
  [INFERRED on the meaning of "delegating".]
- **A schedule is defined per day-group.** [SHOWN image 01/06] tabs `Days: [1,2]` and
  `Days: [3,4,5,6,7]`, each with a "Relevant days" row of seven checkboxes `1/7 … 7/7`. So the
  week is 7 days (a user asked for a 6-day week; Thomas: "I do plan on allowing different numbers
  of hours in day / days in week at some point" — 79527117 comments).
- **A schedule entry** = `Time Range` (start hour – end hour, hour granularity) + `Status`
  (`Sleeping`, `Working`, …) + `Primary behaviour criteria` + a **Primary Behaviour** and a
  **Default Behaviour** (fallback).
- **A behaviour** = `Action` (free text shown in the UI, e.g. *practicing medicine*, *waiting*,
  *fetching resources*, *hauling goods*) + `Building matcher` + `Sub-location matcher`
  (+ the matcher's argument).
- **Criteria seen:** `Primary location has other occupants`, `Fifty percent chance`.
- **Building matchers seen:** `Place of work`, **`Fetch demanded resources`** (a *runtime* supply
  link: go to whichever building supplies what my workplace currently demands), and a new
  **exact building matcher** (pick a specific building).
- **Sub-location matchers seen:** `Exact sub-location` (e.g. *Medical room 1*, *Stock room*),
  **`Random with tag`** (e.g. tag = *Pickup goods*).

**Worked examples from the images.**
- *Doctor-ish, days 3–7:* `0:00–7:00 Sleeping`; `9:00–17:00 Working`, criteria *Primary location
  has other occupants* → primary `practicing medicine @ Place of work / Exact sub-location =
  Medical room 1`; default `waiting`.
- *Labourer:* `9:00–17:00 Working`, criteria *Fifty percent chance* → primary `fetching resources
  @ Fetch demanded resources / Random with tag = Pickup goods`; default `hauling goods @ Place of
  work / Exact sub-location = Stock room`.

**Sub-location model [SHOWN image 02/07]** — a building is subdivided into named sub-locations,
each with **capacities by purpose** and **tags**:
- Fields: `Name` (= "Service door"), `Leisure people limit` 0, `Temporary residential limit` 0,
  `Guest worker limit` **5**, `Studying people limit` 0, `Relaxing options (comma separated)`,
  `Residents can relax here` ☐.
- Tags: `Room`, `Table`, `Sell goods`, **`Pickup goods` ✔**, **`Deliver goods` ✔**, `Performance`,
  `Bath`, `Custom 1…5`.
- **[SHOWN corroboration]** the Lusty Heifer tavern (81472775 image 02) lists its sub-locations as
  **Bar · Office · Service door · Kitchen · Table 1 · Table 2**, with named people assigned to
  each, and "24 people currently here". A bakery (88558259 image 09) separates **Workers**
  (Baker ×2, Labourer) from **Residents**.
- The `Performance` tag is what lets "entertainment artisans … perform in taverns, making use of
  the performance tag on the tavern **stage** sub locations" — image 04 shows a `Stage`
  sub-location occupied by "Dromwin Flickerbadge — Singer", and image 05 the person card
  "72 year old male gnome singer. **Currently performing at** 📍 The Lewd Maiden".

**Storage change and measured wins.** Schedules are now **lazy-loaded from the person's job**
rather than copied per person: settlement file **~5% smaller**, generation **~5% faster**,
simulation **~20% faster**.

### 2.18 People model: relations, factions, events — post 79527117 **[STATED]**

**Motivation (design-first, worth quoting).** "One thing that I sometimes struggle with as a DM is
making downtime interesting for my players… wouldn't it be nice if town gen could give me some
interesting events for a given building - that make sense in the context of the building and the
wider town? So, that's what I set out to do, and **all the other features came about to support
that**." The religion overhaul, the new relations and factions are all *downstream of the event
generator*, not independent features.

**Chain of reasoning he gives:**
1. Interesting events need interesting **rivalries**: business, competitive, romantic, ideological.
2. Ideological ⇒ **religious** rivalry ⇒ but religion was a flat list of gods, so "one person
   worships the Norse god Odin, and another … Thor" would read as a rivalry when it should not.
3. ⇒ **Religions each own a list of gods**; rivalry is computed between *religions*, not gods.

**Religion data model [SHOWN images 11, 12].** Religions with a `Distribution` weight
(Fantasy (Good) 80, Fantasy (Neutral) 40, Fantasy (Evil) 20, Celtic 0, Greek 0, Egyptian 0,
Norse 0) and, per religion, `Religion label`, `Formatted name` (e.g. "the Norse gods") and a god
table of `Name · Alignment (9-way D&D alignment) · Proportion (weight)`. Worshippers are assigned
by the religion distribution, then a god within it by proportion. A separate `Worshippers` tab
holds the per-population split.

**Relationship types added:** business rivals, competitive rivals, religious rivals, romantic
rivals, crushes, separated partners, affairs (on top of pre-existing family/employment relations).

**Factions [STATED + SHOWN images 15, 16].** Generated **before buildings are placed**. Per
faction: `Faction name`, `Name generator`, `Simple description`, `Description`, `Operates
secretly` (bool), **`Goals`** (multi-select: Gather wealth, Distribute wealth, Create a monopoly,
Establish new government, Start a war, End a war, Keep a secret, Reveal a secret, Serve a powerful
patron, Prevent a prophecy, Fulfil a prophecy, Obtain arcane power, Gain knowledge, maintain the
current status quo), **`Goal completion methods`** (Steal, Murder people, Kill monsters, Hurt
people, Sabotage, Extort people, Trade items, Fight in fair combat, Craft items, Use democracy),
**`Faction buildings`** (chips, e.g. "Thieves guild hangout"), plus — per the prose — whether the
faction **has regular meetings** (fed into the simulation) and **how members and leaders are
selected**. Templates: *Community council · Thieves guild · Crime gang · Assassins · Adventurers
guild · Mercenary company · Merchants guild · Custom faction*. Factions can also be created/edited
after generation.

**Events [STATED + SHOWN images 08, 09, 10].** A building has an **Event** button
(toolbar: Favourite · Shop · Edit · Re-roll · **Event** · New Person). It produces **10 ranked
candidate events** (the pager reads "4 / 10", "6 / 10", "7 / 10"), each a one-or-two-sentence
scenario plus the participant cards (name, job, and an icon showing where they currently are).
Examples verbatim:
- "Sarnax and Derild, **members of Guard of the Hell**, break in to try and steal valuable items"
  (faction-driven)
- "Abbith, **a competitive rival of** Colverslyne, claims that Colverslyne's work is his own"
  (relation-driven)
- "Gossparl confronts Colverslyne, saying that he knows she is having an affair with Zoändrik.
  Gossparl eventually forgives Colverslyne, and Colverslyne ends it with Zoändrik."
**`Start event`** "will trigger the event - **moving people around the settlement as needed**. It
will also trigger any necessary **updates to the people involved**" (e.g. rewriting the
Gossparl/Colverslyne/Zoändrik relations). So events are **executable state transitions**, not
flavour text.

**Provenance note (79527117 comments).** "Yeah ChatGPT is a super interesting tool - **I used it to
come up with a lot of the events I programmed**." The event *templates* are LLM-authored, but the
selection and execution are hard-coded.

### 2.19 Person description: appearance templates — post 86856028 **[STATED]** + **[SHOWN]** (images 03–06)

**Problem.** "no more will everyone be described the same as humans" — a single hard-coded
description format for all races.

**Algorithm (his words).** "you create **random tables** for different attributes for a race, e.g.
build, skin tone, or hair length - and then create a **template** that references those tables. To
create the appearance description for a person, I take the template, **substitute the attribute
values** for the person, and then display it."

**[SHOWN] the template form (image 06, "Human Template"), line by line:**
```
Has $option1, $option2, $option3 hair,
$option4,
and $option5 eyes.
$option6.
Has $option7 $option8 skin.
Stands $height tall and has $aOrAn $option9 build.
```
Each line has an **eye toggle** (conditional display) and a delete; there is `+ Add line`. Below,
each `$optionN` has a `Label` (e.g. "Hair length") and a weighted `Value / Proportion` table:
`bald 50.00 · cropped 50.00 · short 50.00 · medium-length 50.00 · long 25.00 · very long 25.00`.
Built-ins: **`$height`** (rendered "Stands 159cm (5′ 3″) tall") and **`$aOrAn`** (article
agreement). Conditions: "options to **display lines based on gender, age, and the values
themselves**" — e.g. suppress the beard line for a clean-shaven or non-bearded race.

**Outputs [SHOWN images 03–05]:**
- tiefling: "Has a bald head, with short straight horns, and light gray eyes. / Is clean shaven. /
  Has a long thick tail. / Has fair, crimson skin. / Stands 159cm (5′ 3″) tall and has a skinny build."
- dragonborn: "Has a smooth head, and pink eyes. / Has rugged, rusty scales. / Stands 185cm (6′ 1″)
  tall and has a muscular build."
- human: "Has short, straight, dark blonde hair, and amber eyes. / Has a long, braided beard. /
  Has pale beige skin. / Stands 183cm (6′ 0″) tall and has a stocky build."

**Known failure mode (86856028 comments, with the creator's fix).** User Lucy Jones pasted a
half-elf whose description degenerated: *"Has medium-length, thinning, emerald green hair, and
short, slightly pointed ears eyes. / **Has Is clean shaven.** / gray."* — i.e. an option slot was
filled with a *sentence* rather than a fragment and a line's fixed text collided with the
substituted value. Thomas: "Ha, whoops… I've pushed a fix for them now - **unfortunately half
elves will only be fixed for new settlements**." → descriptions are **baked into the persisted
settlement**, not regenerated on read. That is a durable architectural fact.

Also flagged in the same report: pronoun agreement bugs ("He is somewhat reserved, and don't
attention to **themselves**"). Thomas says he updated "all of the personality descriptions and
random event descriptions to respect people's pronouns" in the same release.

### 2.20 Genders, names and the attraction matrix — post 86856028 **[SHOWN]** (images 02, 07, 08, 01/09)

- **Genders** are data, not an enum: default four with weights `male 47.00 · female 47.00 ·
  non-binary 5.00 · agender 1.00`, `+ Add gender`.
- **Per gender**: `Gender name`, `Subject pronoun`, `Object pronoun`, `Possessive adjective`,
  `Name type` (e.g. Feminine), `Height config` (e.g. Female).
- **Gender relations matrix** — a full N×N weight table driving pairing:

  |        | male | female | non-binary | agender |
  |--------|------|--------|-----------|---------|
  | male   | 4    | 92     | 3         | 1       |
  | female | 92   | 4      | 3         | 1       |
  | non-binary | 3 | 3     | 3         | 1       |
  | agender| 1    | 1      | 1         | 1       |

  (Symmetric, and the numbers are relative weights per 100.)
- **Name generators** available per race: `Generic, Rough, Draconic, Fair, Homely, Infernal, Tough,
  Tough / Homely Mix, Old English, Old French, Old German, Old Russian`, plus premium **custom
  name lists** uploaded as plain text: a first-names file is parsed with gender tags
  ("Found 155 names. **F: 2, M: 2, N: 151**") and a surnames file ("Found 5 surnames").
- Race form also has tabs **Races · Genders · Education · Stats**.

### 2.21 Person types and the population model — posts 91451446, 79527117 **[STATED]**

- Person types in evidence: **working**, **unemployed**, **retired** (new in 91451446),
  **delegating** (93999105, the one type that cannot have a schedule), plus role labels such as
  *Stay at home parent* (79527117 image 10).
- "Before, people worked up to their max age. Now, **elderly people will be retired**. They behave
  similarly to the existing unemployed person type, however **they won't try to be employed when
  buildings / districts are re-rolled**."
- "I also tweaked the **age generation settings** - there are now **more children** than there were
  before (which was very very few)."
- **Employment is a post-hoc matching pass:** "If you re-roll a building as a workplace, **any
  unemployed people in the settlement will be employed there**" (79527117 comments).
- **Families own buildings:** "most buildings will have families generated in them, and so the
  people will have the same last names" (79527117 comments, responding to a surname-collision bug
  report). Residential buildings generate one or more *families*, not independent individuals.
- Stats are D&D-style: STR/DEX/CON/INT/WIS/CHA with modifiers (81472775 image 02).
- Relationship storage is the biggest component of the settlement file: "each relationship is a row
  in a table"; planned fix is to store only **parent/child** and derive the rest (91451446).

### 2.22 Export / integration — posts 81472775, 75844005 **[NAMED-ONLY]** / **[SHOWN]**

- **GeoJSON export** — named, no schema given. [NAMED-ONLY] Notable that the map is expressible as
  GeoJSON at all: it implies the whole map is **vector features with properties**, not a raster.
  (A patron independently calls it "The **GIS** component of this", 84680671 comments.)
- **SVG export overhaul** — named, no detail. [NAMED-ONLY]
- **FoundryVTT module** (`thomasjallerton/towngenerator-foundrymodule`, folder name must be
  `fantasy-town-generator-import`; needs the Foundry origin URL, e.g. `http://localhost:30000`,
  entered **into FTG**, i.e. FTG serves the data and Foundry embeds it — CORS-gated). "more than
  just showing a static image - it grants basically **full access to a settlement, including the
  buildings and people, as well as access to the event and time controls**", player-visible with
  configurable permissions, keeps the settlement **in sync between players**, and lets the GM
  **mark the players' location** on the map. [STATED]
- **Public access link** with configurable access level (75844005 list; 88558259 comments).
- **No API**; planned instead: "an option to **upload a JSON** or something to the create
  settlement form that details the buildings / people you want, and then it'll just create the
  settlement from that" (75844005 comments, 2023-02-12). A patron explicitly contrasts this with
  watabou's URL-parameter + seed approach. **FTG has no seed-and-URL reproducibility model** —
  settlements are server-side persistent objects, not deterministic functions of a seed. This is
  the deepest architectural divergence from MFCG/VG in the whole slice.
- **Form settings** saved to **cookies/localStorage**, not the cloud; premium cloud storage exists
  only for **races and religions**, because "Some of those things I don't want to commit making
  backwards compatible" (79527117 comments, 2025-04-15).

### 2.23 Performance and scale — posts 88558259, 91451446, 93999105 **[STATED]**

The explicit blockers on larger settlements, in his own words: "There are two main things
preventing that from being enabled today - **the speed of generation, and the size of the
generated settlements**. I have some ideas on how to potentially tackle these."
Measured deltas he reports:
| Change | Effect |
|---|---|
| Replace demand model with group dependency graph (91451446) | generation **~8% faster** |
| Lazy-load schedules by job instead of per-person copies (93999105) | file **~5% smaller**, generation **~5% faster**, **simulation ~20% faster** |
| Planned: store only parent/child relations and derive the rest (91451446) | file size (unmeasured) |
| Considered: "enable larger maps where **not all the people are actually generated**" — via ruins (91451446 comments) | population LOD |

That last one is worth flagging to a re-implementer: he was already contemplating **not
instantiating every person** for large settlements, using ruins/uninhabited buildings as the
cover story.

---

## 3. Visual and style conventions observed in the images

Two distinct eras appear in this slice.

### 3.1 Era 1 — pre-overhaul (April 2022, post 65223067)
- **Town background:** flat **white**. **Farmland:** very pale green with fine, near-vertical
  hatch lines. **Roads:** cream/ivory ribbons with a thin grey-tan casing line on each side,
  constant width per class, mitred corners. **Buildings:** flat mid-brown/ochre, **no shading, no
  shadow**, irregular orthogonal footprints (rectangles, L, T, U). **Blocks:** white polygons
  outlined thinly. **District labels:** small-caps serif.
- Hatch **orientation varies per field polygon** (one field runs ~80°, the adjacent one ~45°),
  so hatch angle is a per-polygon property, likely derived from the polygon's principal axis or
  randomised per field. [INFERRED]

### 3.2 Era 2 — post-overhaul (Dec 2022 → Dec 2023; posts 75844005, 84680671, 88558259)
Palette (approximate, sampled by eye from images 75844005/04 and 84680671/13):
| Element | Colour | Notes |
|---|---|---|
| Urban ground (dirt/road texture) | light warm grey-beige `≈#DCD6CA` | the "core reads beige" effect of §2.12 |
| Suburban ground (grass/lawn texture) | pale desaturated green `≈#C6D1A8` | plots outside the wall |
| Building roof, default | dark desaturated brown `≈#5F4038` | |
| Building roof, alt materials | brick red / pink `≈#C4707A`, slate grey `≈#8A8A8A`, and (tents) saturated red/green/blue/orange/tan/lavender/olive | "red tile / blue tile" + custom colours |
| Road fill | cream `≈#E3DED0` | |
| Road casing | fine **dotted/dashed** dark line at low zoom; solid thin grey at high zoom | |
| Water | mid slate blue `≈#6E8EB6` | flat fill, slightly wobbly banks |
| Wall | near-black `≈#2C2C2C` | ~8–10 px, round towers at vertices |
| Farmland | multiple flat tints — several greens, sandy yellow (cereal), taupe-brown (ploughed) | each with fine hatch |
| Trees | mid green `≈#7E9B5C` canopy | |

Conventions:
- **Lighting is fixed, top-left.** Every building casts a **soft grey drop shadow down-and-right**
  (offset ≈ ¼ of the building's footprint, blurred). Shadows fall onto the lot ground, onto plazas
  and onto neighbouring buildings, which is what sells the "more depth" of the render overhaul.
- **Roofs are shaded as pitched volumes.** A roof polygon is split by a **ridge line** into two (or
  for square/tent footprints, four) facets with different brightness — lighter on the up-light
  side, darker on the other. Ridge lines are visible as thin darker seams. Squalid tents use the
  **four-facet pyramid** variant (§2.13).
- **Lot and plot boundaries are drawn as fine dotted/dashed dark lines** — visible everywhere in
  84680671 image 13 at native resolution. The town's ragged outer edge is literally the **union of
  lot polygons**: a distinctive sawtooth/star-shaped silhouette, *not* a smoothed hull.
- **Trees** are cloud/blob canopies with a stippled dark outline, a lighter green highlight patch
  and their own small drop shadow. They appear (a) scattered in plazas/parks with jittered spacing,
  (b) in a regular line along **lot edges** (the `Lot edge decoration = Trees` option), and (c) at
  intervals **on farmland field boundaries** (hedgerow trees).
- **Plazas/parks** are large light-beige polygons whose outline is the ragged negative space left
  by surrounding plots — they are not drawn as rectangles.
- **Wells** render as a small grey disc with a darker ring; **fountains** as a small grey diamond;
  both sit on a lighter paved patch.
- **Farmland fields** are convex-ish quadrilaterals with mostly straight edges meeting at shallow
  angles, consistent with recursive straight-cut subdivision of a larger parcel. Each gets a flat
  base tint plus a per-field hatch direction. Boundaries render as a thin double line (hedge/fence).
- **Isolated farmsteads** are 1–3 small brown buildings inside a small fenced yard rectangle set in
  a field, usually adjacent to a road.
- **District labels**: white/ivory serif **small caps**, letter-spaced, with a heavy black outline
  and a soft drop shadow; placed at the district centroid; font size does not vary much with
  district size. In the Foundry screenshot the same labels sit above a coloured building-type
  overlay.
- **Building-type overlay mode** (81472775 images 01/02) recolours every building by function, with
  a legend: Government, Artisan, Cultural, Educational, Farm, Residence, Tavern, Inn, Shop,
  Service, Religious, Warehouse, Law enforcement, Industrial, Market, Faction — 16 categories.
- **Editor chrome** (65223067): in-progress strokes render in a red/maroon highlight; the fill
  preview flashes the candidate face in **saturated green** before committing.
- **Density gradient is the dominant read of a large map** (84680671 image 13): inside inner wall,
  blocks are ≥80% roof with slivers of courtyard; between walls, ~50% with green gardens; outside,
  ribbon development along roads on green ground. This gradient is an emergent consequence of
  §2.12 (`Dense`/`Sparse` phases and per-phase background textures), not a painted overlay.
- **UI style** (consistent throughout): cream `#F5F0E1` background, navy small-caps serif headings,
  crimson `#B3282D` accents/controls, thin crimson-outlined inputs, sliders with a numeric echo box.

### 3.3 Reconstructed lot→plot→building geometry **[INFERRED from images 84680671/01,02,11,12,24,26 and 75844005/04]**
1. The road graph's faces are **lots** (§2.3 gives the extraction method — the fill tool and the
   layout engine must use the same face walk).
2. A lot is subdivided into **plots**. Two regimes are visible:
   - *lot-edge regime* (default; `Buildings not on lot edge enabled = false`): plots are attached to
     the lot's **perimeter edges**, one row deep, each roughly a quadrilateral with one side on the
     street; the residual interior stays as courtyard/garden/plaza. Building long axes run
     **perpendicular to the street**, neighbours abut — burgage strips.
   - *dense regime* (`Dense buildings`, `Buildings not on lot edge enabled = true`; image 12): the
     **entire** lot polygon is partitioned into small quadrilaterals arranged in bands, and every
     cell gets a building. The cells are not axis-aligned and their sides follow the lot's own
     edges, which is the signature of recursive splitting of the polygon (split along the longest
     axis, then split each strip) rather than a clipped grid.
3. Each plot carries a **background texture** (grass/lawn/dirt/road), the **building**, and
   optional **plot decoration** (§2.12).
4. Buildings themselves are **irregular orthogonal polygons** — rectangles plus L/T/U shapes formed
   by adding or subtracting rectangular lobes; edges are axis-aligned *in the plot's local frame*,
   which is why a whole lot's buildings share one rotation.

None of this is stated by Thomas anywhere in the slice; it is reconstruction from pixels, and
should be treated as a hypothesis to test against the recorded live behaviour, not as fact.

---

## 4. Creator's stated design philosophy and constraints

1. **Content first, geometry second** (§2.5). The map serves the simulation, not the reverse.
   Everything else follows from this inversion.
2. **Tools for DMs at the table, not pictures.** The founding motivation for the entire
   events/factions/relations arc is downtime prep: "sometimes they arrive somewhere I didn't
   expect them to, and I have to try and find something interesting for them to interact with."
   A patron's summary, which Thomas did not dispute: "It takes care of the details so I can focus
   on the broader strokes. I can trust that there will be a **consistent answer** for me when the
   players do things like ask which of two NPC's is taller… my players can still get a real
   feeling of '**If I see it, I can go there**'." (79527117 comments.)
3. **Maintainability beats cleverness.** The single biggest algorithmic change in the slice
   (§2.6→§2.7) was made for *config legibility*, not output quality: "In summary, it was a pain to
   maintain." He explicitly values being able to *reason about* a rule ("1 farm per 25 people")
   over the expressive power of the demand web.
4. **Everything is data the user can edit.** Races, religions, gods, genders, pronouns, appearance
   templates, factions, goals, building groups, proportions, district decoration, wall schedule,
   schedules and sub-location tags are all exposed in the create form. The generator is a
   *configurable* system whose defaults happen to be good, and the config UI is therefore a faithful
   mirror of the internal model.
5. **Persistence is sacred after release.** Pre-release he happily wiped every settlement to avoid
   a migration (65223067/66499838); after release, "any settlements created from now on will NOT be
   deleted". This forces awkward choices later: fixes apply "only for new settlements" (§2.19); the
   settlement-list population is left stale rather than dual-writing two stores (88558259); form
   settings stay in cookies because he does not "want to commit making backwards compatible".
6. **Simulation fidelity is the quality bar.** Bugs he treats as important are *behavioural*
   ("taverns in the evening should be busy", "buildings were more empty than they should have
   been"), not visual.
7. **Iterative, month-sized increments, publicly narrated.** Monthly devlogs, each with a
   this-is-what-was-wrong / this-is-the-new-model structure. He reports the *old* algorithm and why
   it failed before describing the replacement — unusually useful for reverse engineering.
8. **Scale is the standing constraint** (§2.23): generation speed, settlement file size, and
   client render capability. "make sure that **most devices can render settlements that large**"
   (91451446) is the only renderer-adjacent statement in the slice.
9. **Free/premium split kept narrow**: "All currently free features will remain free"; premium =
   unlimited settlements, custom name lists, cloud races/religions, FoundryVTT.

---

## 5. Useful facts from the comment threads

| Date | Post | Fact | Why it matters |
|---|---|---|---|
| 2023-02-19 | 75844005 | Thomas: "if you draw a **road/wall over a road it breaks** - it's supposed to snap so it **splits the existing road in two**" | States the crossing→split invariant, and that it was not reliably enforced (§2.4) |
| 2023-02-20 | 75844005 | Sazra: fill tool "sometimes just fills half of the town… problems with **generated** streets but works for **self-drawn** streets" | The face-walk escapes on non-planar generated topology (§2.3) |
| 2023-02-20 | 75844005 | Sazra: "**Stone fences are part of the wall tool** but can only be erased by the **road**-erasing tool" | Walls/fences and roads share one linear-feature store |
| 2023-02-20 | 75844005 | Sazra: big filled areas "only get a single pixel that can be selected for the erase tool" | Background fills are objects with a degenerate hit target |
| 2023-02-11/12 | 75844005 | No API planned; instead a future "**upload a JSON**… that details the buildings / people you want". Patron contrasts watabou's `?size=&seed=&…` URL scheme | FTG has **no seed-reproducibility model**; settlements are stored objects |
| 2023-03-04 | 79527117 | "I used **ChatGPT** to come up with a lot of the events I programmed" | Event templates are LLM-authored content, hand-coded execution |
| 2023-03-04 | 79527117 | Re-roll a building as residential ⇒ creates family/families; as a workplace ⇒ "**any unemployed people in the settlement will be employed there**" | Employment is a global matching pass, re-run on edit |
| 2023-03-10 | 79527117 | Surname collisions in re-rolled buildings are *expected*: "most buildings will have **families** generated in them" | Residences are family units |
| 2023-04-09 | 79527117 | Schedule week is hard-coded to 7 days; "I do plan on allowing different numbers of **hours in day / days in week**" | Time model constants |
| 2023-04-13 | 81472775 | ChatGPT NPC-dialogue integration: "I need to investigate how best to integrate with it / how much it'll cost" | Not implemented in this era |
| 2023-07-23 | 84680671 | "**the factions are generated before buildings are placed**, so getting things to make sense on the map would need some thought" (re: faction turf districts) | Pins the content-phase ordering (§2.5) |
| 2023-07-24 | 81472775 | Foundry module folder must be renamed `fantasy-town-generator-import` | Integration detail |
| 2023-08-06 | 81472775 | The **Foundry origin URL** (e.g. `http://localhost:30000`) is entered *into FTG*, not vice versa | FTG is the data server; CORS-gated embedding |
| 2023-07-29 | 86856028 | Half-elf description bug; fix applies "**only for new settlements**" | Descriptions are baked into the persisted settlement |
| 2023-07-29 | 86856028 | Patron: "loving the new **roof patterns**" | Confirms roof-material variety landed and reads as a visible feature |
| 2023-09-25 | 88558259 | Public access links with configurable access already exist | Sharing model |
| 2023-10-22 | 91451446 | Ruins request; Thomas: "I'm considering options to **enable larger maps where not all the people are actually generated**, so ruins could be part of that work" | Population LOD was on the table |
| 2023-10-23 | 91451446 | "I want to add a **climate setting** at some point which will modify the other textures, and add a **sandy background texture**" | Background textures are a swappable themed set (§2.12) |
| 2026-08-03 | 65223067 | Ageing the whole population is still not possible; "it would be cool to have an option for **year increases in the time simulation**" | The time model advances hours/days, not years |

---

## 6. Open questions a re-implementer must decide (nothing in this slice answers them)

**Geometry — the big void.**
1. **How is the road network generated?** Never described. Post 84680671 only says "At this point,
   the road network is generated." No growth model, no seed roads, no snapping rules, no hierarchy
   rules, no curvature model. Images show long smooth curving rural roads and an irregular,
   predominantly radial-plus-ring urban network with 3- and 4-way junctions and very few dead ends.
2. **How are lots chosen and ordered for claiming?** (nearest-to-centre? largest-first? random with
   bias?) And what exactly is "adjacent" — sharing a road edge, or sharing an intersection?
3. **How is a lot subdivided into plots?** §3.3 offers a hypothesis (perimeter strip vs recursive
   band split); no statement exists.
4. **How are building footprints synthesised?** Sizes clearly vary by building type and lifestyle
   (upper-class homes are large; tents tiny), and L/T/U shapes appear — but the generator is
   unspecified.
5. **What does "Can merge when" mean for districts,** and what is the full enum beyond "Always"?
6. **What are the "dense phase" and "sparse phase"**, in what order do they run, and what is the
   full enum of "Can be placed during dense phase when"?
7. **What is a "building modifier"** (separate from material)? Shape? Size? Storeys?
8. **Wall geometry.** Convex hull, alpha shape, or offset of the built extent? How much slack? How
   are tower positions chosen? Are gates real objects (they appear in district names) with road
   snapping, and what happens to roads crossing a wall placed later?
9. **Farmland generation.** Field subdivision method, how crop/fallow types are assigned, how
   hatch angle is chosen, how field extent relates to population and to the raw-resource
   checklist, and where hedgerow trees are placed.
10. **Forests.** "Farmland and forests overhaul" is listed (75844005) and a `Forests` checkbox
    exists, but no forest appears in any image in this slice and no method is given.
11. **Generated water.** Everything about the *Generated* branch — river paths, coastlines,
    branching, lake formation, island handling — is unstated; only the *manually drawn* branch is
    documented. Bridge placement under the "required distance between bridges = 100" constraint is
    also unspecified.
12. **Coordinate system and units.** `bridge distance = 100` in what? Person heights are real
    (cm/ft-in), so there is presumably a real-world metre scale — never stated.

**Content pipeline.**
13. **Evaluation order of the dependency graph** — topological sort, fixed-point iteration, or
    greedy placement loop? Cycle handling? How the population target and the ratio rules are
    reconciled when they conflict.
14. **Full enum of `Dependency type`** (only "Per other buildings" screenshotted).
15. **How districts are seeded on the map** — which lot does the first district of a given type
    claim, and how are districts distributed so that (say) industry ends up near water?
16. **How the empty-space backfill chooses** what to add, and whether backfilled buildings get real
    people (the population-drift complaints in 88558259 suggest yes).
17. **The name-erosion rule.** "Hamlet Tower → Hamower" is one example; the actual elision
    algorithm and its probability are unknown.
18. **Landmark detection** — what counts as a landmark, and how the district's spatial relation to
    it is computed.

**Runtime / rendering.**
19. **Renderer technology is completely absent from this slice.** No mention of Three.js, canvas,
    SVG rendering, WebGL, tiling or LOD. The only hint is "make sure that most devices can render
    settlements that large" (91451446) and the fact that SVG and GeoJSON *export* exist.
20. **Where the map is computed.** Generation is clearly server-side (settlements are stored
    server objects, the Foundry module pulls live data), but the split between server-generated
    geometry and client-side rendering/editing is never stated.
21. **Determinism.** Is generation seeded at all? No seed appears anywhere in the UI or the URLs
    in this slice, and the patron comparison with watabou implies not.
22. **Simulation tick semantics.** "Next Hour" / "Time Skip" and a `19:00 3/7` clock exist; how
    people are routed between sub-locations (pathfinding? teleport?), whether travel takes time,
    and what `Set Location` does to a person's schedule, are all unstated.
23. **Events**: how the 10 candidates are selected and ranked from the relation/faction graph, and
    exactly what state "Start event" mutates beyond person positions and the named relations.

---

## 7. Source index for this slice

| Post id | Path | Images opened |
|---|---|---|
| 65223067 | `research/patreon/ftg/65223067/post.md` | 01.gif, 02.gif, 03.jpg (**MP4**, 1534×1194, 35.4 s, 1061 frames — sampled + final frame), 04.gif, 05.gif, 06.gif (= 02.gif) |
| 66499838 | `…/66499838/post.md` | none in post |
| 75844005 | `…/75844005/post.md` | 01–04 (all **PNG** despite `.jpg` extension) + 3 upscaled crops of 04 |
| 79527117 | `…/79527117/post.md` | 07–10; 11–16 (hi-res of 01–06); 17–20 = dups of 07–10 |
| 81472775 | `…/81472775/post.md` | 01, 02 |
| 84680671 | `…/84680671/post.md` | 01–04, 07, 08, 11, 12, 13 (2650×2650 + 5 native-res crops), 18/19 (hi-res of 05/06), 22/23 (hi-res of 09/10), 24, 26; 14–17, 20, 21, 25, 27, 28 are duplicates |
| 86856028 | `…/86856028/post.md` | 01–09; 10–16 duplicates |
| 88558259 | `…/88558259/post.md` | 01–05, 09, 10; 06–08 duplicates |
| 91451446 | `…/91451446/post.md` | 01–04; 05, 06 duplicates |
| 93999105 | `…/93999105/post.md` | 01–06; 07–10 duplicates |

Duplicate detection: 64×64 RGB perceptual hash per image; aspect-ratio match used to pair
low-res/hi-res variants of the same screenshot. Animated assets were decoded with `ffmpeg` into
3×3 contact sheets plus full-resolution stills (working files in the session scratchpad).
No captured JavaScript bundle was opened at any point.

## Critic-2 addendum (FTG seat, 2026-09-25)

Rulings from `research/findings/_critic-ftg.md` (§1 F15, F18, F19, F23, F24; §2).

1. **§2.14 wall inference is superseded for the current build.** The 2023 "Estimate percentage of buildings within
   wall" rows (20 / 60) are the ancestors of the 2025+ per-stage `proportionOfBuildings` + `placeWallAfter` (the captured
   CITY: stage 1 = 20 % of buildings, walled; stage 2 = 50 %, unwalled; suburb = remainder). The wall does **not** follow
   a convex hull: `wallPlacement` is `Around all lots` / `Around stage lots` (`ftg-docs-params.md` §1.3), and in the
   captured payload all 17 wall towers are vertices of the waterfront district's ring, median spacing 39 m, forming an
   open chain from the river bank to the coast (`ftg-payload-visual.md` addendum). Keep §2.14 as the 2023 reading only.
2. **§2.15 / §6.12 units and default:** "Required distance between bridges" is in metres (`createSettlement__water.md`
   L209 "(in meters)"); the default is now 40 (capture and manual-draw default), down from the 100 shown in December
   2022. Coordinates: the wire format is integer centimetres, zig-zag `sint32`, centred on (0,0), ±2500 m for a CITY;
   GeoJSON export is in metres (`useSettlements__export.md` L24). Person heights in cm and map metres share one scale.
3. **§2.17 "delegating"** — the inference is confirmed and narrowed: "Delegating people are used to model people who
   cannot be independent (like babies). They need a caregiver to follow at every hour" (`editSettlement__people.md`
   L111–113). A fifth type, **Studying**, exists by 2026 (`ftg-posts-c.md` §2.22).
4. **§2.16 raw resources:** the 2022 checklist's *Gems* is not in the 2026 `requiresRawResources` vocabulary (13 values);
   in `presets.json` GEMS is a produced resource (jeweler / jewellery shop provide it, artificer uses it) gated through
   ORE and mines — a reorganisation, not a contradiction.
5. **§6 open questions answered elsewhere in the corpus** (`ftg-docs-params.md` unless noted): 1 road network →
   priority-queue proposal growth with legality checks, staged, branch types, pruning/trimming between stages (§2.2–2.4;
   `ftg-posts-b.md` §T-20/T-21); 2 lot claiming → V2 replaced it: large district lots are created first and typed from
   the remaining building pool (§2.5); 3–4 lot → plots → buildings → recursive random perpendicular cuts, centroid rule
   (2025), shrink-then-split (2026) (`ftg-posts-c.md` §2.1–2.2), modes Dense / Gaps / Individually placed (§2.6);
   5 "Can merge when" → the 2023 enum is gone; districts below `minDistrictArea` merge into a neighbour (§1.3);
   6 dense/sparse phases → ordered `stages[]` each with its own `buildingPlacement`, then the suburb stage (§1.1–1.4);
   7 building modifier → None / Small tents / Smaller (½) / Bigger (2×) (§2.6); 8 walls → item 1 above; 9 farmland →
   four layouts (§4.6), outside lots split to a count (§2.8), hedgerow trees "between fields" (§1.5); 10 forests →
   decoration areas filled at render, `forestTreesMultiplier` (§4.7; `ftg-posts-c.md` §2.5); 11 generated water →
   two-arm coast with overall/detail shape, river branches with the island rule, bridges only over rivers (§4.2–4.4);
   12 units → item 2; 13–14 dependency graph → virtual-population loop, `oneBuildingForNumberOfPeople` /
   `perOtherBuildingConfig`, `alwaysPlaceWorkplace` (§3.3); 17 name erosion → syllable-budgeted name parts
   (`ftg-posts-c.md` §2.17) and the payload's long/short name pairs (Rustic Village → Ticwick); 19 renderer → Three.js
   (`ftg-payload-visual.md` §1); 20 where computed → server-side, ≈ 300 s for a CITY; 21 determinism → `seed: null` in the
   only captured request, forests and decoration areas filled at render time; 22 tick semantics → hour quantum,
   schedule evaluated per (day, hour) (`ftg-posts-b.md` §T-08, §T-31). Still open: 15 (district seeding on the map
   beyond "what the lot is next to"), 16 (backfill selection), 18 (landmark detection for names), 23 (event ranking).
