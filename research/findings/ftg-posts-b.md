# FTG (Fantasy Town Generator, Thomas Allerton) — Patreon dev posts, MIDDLE third

Slice: `ftg-posts-b` = `research/worklists.json → ftg[10:20]`
Source root: `/Users/cstokes/Desktop/Maps/research/patreon/ftg/<post_id>/`

## 0. Scope, method, and evidence hygiene

Ten posts, 2024-01-04 → 2025-06-07. All ten `post.md` bodies were read in full, including the
full comment threads (the `post.md` comment list is *more* complete than `comments.json`, which
omits creator replies — `comments.json` contains only top-level patron comments, no
`[CREATOR]` responses. **Use `post.md` as the authority for comments.**)

One body is truncated at source: `99652534/post.md` ends mid-narrative at "Vite worked much
better". I recovered the raw body from `99652534/post.json → data.attributes.content_json_string`
and it ends at exactly the same sentence, so the truncation is in Patreon's stored content, not
in the scrape.

**Images.** All 99 image files across the nine posts that have images were opened with the Read
tool (`123982784` has none). Patreon stores each inline image twice — an 820-px-wide inline copy
and a full-resolution copy appended after it. I verified the pairing with a 16×16 average hash
(Hamming distance 0–2 for every pair) and read the high-resolution member of each pair at full
detail, plus every low-resolution twin. Pairings, for re-checking:

| post | inline → hi-res pairs | extra/unpaired |
|---|---|---|
| 95869798 | 01↔04, 02↔06, 03↔05 | — |
| 99652534 | 01↔03, 02↔04 | — |
| 101576411 | 01↔09, 02↔10, 03↔11, 04↔12, 05↔13, 06↔14, 07↔15, 08↔16 | — |
| 103668405 | 01↔12, 02↔11, 05↔10, 06↔09, 07↔08, 03.gif↔13.gif, 04.gif↔14.gif | — |
| 106664214 | 01↔10, 02↔11, 03↔12, 04↔13, 05↔14, 06↔15, 07↔16, 08↔17 | **09** (unreferenced by any `![IMAGE #n]` marker — a 3-D street-level shot of a market/pavilion; see T-14) |
| 112861635 | 01↔06, 02↔07, 03↔08, 04↔09, 05↔10 | — |
| 120828892 | 01↔06, 02↔07(=08), 03↔09, 04↔10, 05↔12 | 07 and 08 are byte-identical duplicates; there is no `11.png` |
| 127128581 | 01↔04, 02↔06, 03↔07 | **05** (near-identical to 06 but *without* the Journal button — the "before" state) |
| 130937474 | 01↔08, 02↔14, 03↔09, 04↔10, 05↔11, 06↔12, 07↔13 | — |

The two GIFs were decoded with PIL and six frames each were sampled and read
(`03.gif`/`13.gif` = 105 frames, river tool; `04.gif`/`14.gif` = 80 frames, custom building shapes).

Evidence tags used throughout: **[STATED]** creator explicitly describes the method;
**[SHOWN]** visible in an image/recording but not explained; **[INFERRED]** my reconstruction,
with reasoning given; **[NAMED-ONLY]** feature announced, no method.

**Out-of-slice pointer, not read by me:** the January 2025 post explicitly delegates the new
algorithm's description to `https://docs.fantasytowngenerator.com/createSettlement/algorithm`,
which is mirrored locally at `/Users/cstokes/Desktop/Maps/research/ftg-docs/createSettlement__algorithm.md`
(plus `createSettlement__settlement_layout.md`, `createSettlement__districts.md`,
`createSettlement__dependency_graph.md`, `createSettlement__water.md`). That file belongs to the
docs slice; several of my open questions are probably answered there and should be reconciled.

---

## 1. Chronological table

| # | Date | Post id | Title | What changed relative to the previous iteration |
|---|---|---|---|---|
| 1 | 2024-01-04 | 95869798 | Development Update – January 2024 | Family-tree view added. **Relation storage renormalised** from pairwise person↔person edges to *family units* — relation share of settlement file dropped ~30% → ~10%. Explicitly framed as groundwork for larger settlements. Infra: object-store versioning was never expiring old versions; fixing that cut storage cost 60%. |
| 2 | 2024-03-03 | 99652534 | Development Update – March 2024 | **Max settlement size 10 000 → 50 000 people** (premium; 25 000 free), all fully populated. Size selector gains a **Custom** mode with a population-target slider. Discovers the deployed site is much slower than local dev — cause traced to browser build targets. **Build system migrated create-react-app → Vite** (Next.js rejected because it pushes SSR and FTG deploys as static files, no server). Names three known weaknesses of the look: uninteresting road junctions, no landmarks, roads surrounding the whole settlement. |
| 3 | 2024-04-02 | 101576411 | Development Update – April 2024 | Post-generation editing of **races / religions / genders** (add + edit, never delete — entities are referenced by people and buildings). **Constrained person re-roll** with per-field locks. **Schedule auto-fill from a known profession.** Favourite-building layer fix, manual zoom buttons, more personality fields in export, settlement-name update fix. |
| 4 | 2024-05-05 | 103668405 | Development Update – May 2024 | Layout-editor overhaul: snapping fixed (was camera-angle dependent) + snapping-strength control; **road/line intersections now rendered** (disc at the junction); tree brush; **river path tool** (draw path → width + smoothness sliders); building colour + roof-shape brush (hip/gable); background textures with custom solid colours + an edit-texture tool; **hand-drawn custom building shapes**; **roofs re-implemented on the straight-skeleton algorithm** (hip natively, gable via post-processing), in flattened and full-3-D variants with a device-power-based default; **full 3-D map view + first-person street view** added as an unstable toy. |
| 5 | 2024-06-22 | 106664214 | Development Update – June 2024 | **Height maps** (Perlin/simplex) introduced as a *separate raster*, not by promoting 2-D points to 3-D; potentially lazily derived from a seed. 3-D terrain rendering via `PlaneGeometry` tessellation; background-texture polygons re-triangulated to a regular lattice; **z-fighting/clipping solved by polygon boolean subtraction (`js-angusj-clipper`)** rather than by tessellation tuning. **Map scale bug found via a new ruler**: x/y was not 1:1 with metres (only z was), buildings were ~3× too large. Fixing scale broke generation reliability → decision to rewrite road/district/building placement. **V1 generation algorithm documented in full, with its failure mode**, and **V2 sketched**. |
| 6 | 2024-09-27 | 112861635 | Development Update – September 2024 | Status post on the rewrite. **V1 road algorithm documented**: segment agents propose successors (straight ahead + left/right at right angles) into a queue, two phases (dense core, then outer buildings) — hence every town is a 4-way crossroad blooming into a circle. **Road generation V2**: same core idea but tuned to create *much larger lots* that are then handed to districts. New knobs: configurable initial junction (3/4/5-way), multiple generation phases each with {ends-in-a-wall, wiggliness, branching strategy, building-placement mode}. Open worklist: district/building placement, landmarks, suburb roads, district re-roll, less empty space, testing, performance. |
| 7 | 2025-01-29 | 120828892 | Development Update – January 2025 | **The overhaul ships.** ~800 files / 70 000 lines. New pipeline: large district lots first → landmarks placed → lot subdivided → remaining buildings. **Suburb road generation + building placement** (buildings without roads around them; changes how hamlets/villages generate). New **"gaps"** placement mode (dense but non-touching; now the default outside the centre). District overhaul (districts control their own decoration/layout; better building distribution). Ruler. Road customisation in the create form (bendiness, segment length). **Arced district text rendering.** User guide at docs.fantasytowngenerator.com. Misc: new wall types with stone as the new default, map-scale bug fix, **generation ~10 % faster**, two oceans forming an island no longer breaks, internal debug tool, more web workers in the building render step, **scalable wall towers**, **walls now split across rivers**, new buildings. |
| 8 | 2025-03-09 | 123982784 | Development Update – March 2025 | Deliberate small-feature phase. **Initial road type option** exposed in the create form (4-way crossroad, single through road, …). Ringed-city preset. Improved pins (scale text/pin; public users can create/edit public pins; real-time sync into Foundry). Bulk people edits (job title, place of work, schedule, relocation). **Custom calendar** (hours per day, days per week, configurable rest days, per-jump day-type override). Duplicate custom races. Context-aware doc links. Fixes: rare generated-river issue; **road settings now respected in inner district lots**; **zero-length roads no longer created**; people with no religion in Foundry. |
| 9 | 2025-04-24 | 127128581 | Development Update – April 2025 | **Roll20 integration** as a browser extension (iframe + chat-message sync) because the Roll20 mod API forbids iframes and outbound web requests and needs a Pro subscription. Foundry module: journal links (incl. Monk's Enhanced Journal) and Simple Calendar time sync (hourly). iframe embedding un-gated for free users. Download/import saved create-settlement settings as a file. Creator states the **generation-order invariant**: details/people/buildings are generated *before* the layout and "I don't see this ever changing". |
| 10 | 2025-06-07 | 130937474 | Development Update – June 2025 | **Coastline decoration**: beaches (sand and pebble), cliffs, rocks, with exposed controls over ocean shape and detail; works on hand-drawn coastlines too. **Harbours** (the most-requested feature), generated as part of **waterfront districts**, with options for harbour shape, harbour-wall shape + material, pier shape + material. River shape options. Render performance for larger settlements improved. Castles deferred again. |

---

## 2. Techniques

### T-01. Family-unit relation model (replaces pairwise relations)
**Post:** 95869798 (2024-01-04).
**Problem it solves:** pairwise relation storage scaled quadratically in family size and dominated
the settlement file; it blocked larger settlements.
**Algorithm [STATED]:**
- Old model: store *every* one-to-one relation. A family of 4 (2 parents, 2 children) stored **6**
  edges: parent-partner, sibling, and 4 parent→child. "This scales poorly as more children are
  added."
- New model: store a **family-unit object** holding `{parents[], children[]}` plus a pointer from
  each person to their family unit. One object replaces the 6 edges.
- Derived relations are *not persisted*: "if two people have the same parents then I can derive the
  sibling relationship, there's no need to persist it."
**Measured effect [STATED]:** relations fell from ~30 % of settlement size to ~10 %.
**Re-implementer's note [INFERRED]:** a person needs at least two family-unit pointers — the unit
they are a child of, and the unit(s) they are a parent in — otherwise you cannot distinguish the
two roles. The post says "pointers from those people to the family unit" without disambiguating.
**Unknown:** how remarriage / multiple partners / step-siblings are modelled (multiple units per
person? a unit with >2 parents?); whether non-family relations (friends, rivals, employer) still use
pairwise edges.

### T-02. Family-tree layout and node rendering
**Post:** 95869798, images 01/04, 02/06, 03/05.
**Problem:** display kinship without an unreadable spaghetti of crossing edges.
**[SHOWN] from the images:** a layered generational tree — one row per generation, orthogonal
elbow connectors, partners placed adjacent and joined by a horizontal link, with a vertical drop
to a horizontal "bus" bar from which children hang. Node = a card with the person's name and a
type icon in the top-right; further badges appear for favourited / has-notes (the same badge
vocabulary as the person summary cards). Two buttons at the bottom of a node: right = close the
tree and open that person in the right pane; left = **re-root the tree on that person**.
**[STATED] failure-mode handling:** "not all relations are expanded fully (as otherwise the tree
would become too complicated, with crossing lines)"; an icon in the node's top-right marks a node
that was **not fully expanded**. Re-rooting is the escape hatch for exploring the elided part.
**[STATED] scope rule:** only people *in the settlement* are added to family trees. Deep trees need
a long-lived race — the illustrated examples used a race with **max age 1000**; with default
settings most trees are one or two generations or absent entirely (image 03/05).
**Unknown:** the actual layout algorithm (Reingold–Tilford / Sugiyama / ad-hoc) and the expansion
budget (depth limit? edge-crossing count? node count?).

### T-03. Scaling to 50 000 inhabitants
**Post:** 99652534 (2024-03-03), images 01/03 (a full 5000 × 5000 metropolis render), 02/04.
**[STATED] parameters:** max 50 000 people, "5× more than previously" (⇒ the prior cap was 10 000);
premium-only above 25 000; all sizes **fully populated** (every inhabitant is an individual record —
no statistical fill for large settlements). Size selector gains **Custom** + a "Custom population
target" slider with a numeric box (screenshot shows 18000) — **[SHOWN]** in `99652534/images/04.png`.
**[STATED] enabling work:** generation *and* storage optimisation, continuing from work first
mentioned in the August 2023 post; T-01 is called out as "a good step towards larger settlement
sizes".
**[SHOWN] what 50 000 looks like under the old algorithm** (crop of `03.png`): a near-uniform
mesh of small blocks across the whole footprint — no lot-size hierarchy, no landmark scale.
This *is* the visual evidence for the complaint the creator later makes ("districts had very
uniform size lots across the entirety of the settlement").
**[STATED] weaknesses he names at this point:** road junctions are uninteresting; there are no
landmarks; the settlement is completely surrounded by roads because buildings are never placed on
the outer edge.

### T-04. Client architecture and the "slow in production" bug
**Post:** 99652534.
**[STATED]:** the site is deployed as **static files, no server** — this is why Next.js was rejected
("it really pushes server side rendering… that's not how I deploy the website"; using it without
SSR "added a lot of noise… having to annotate everything with `use client`"). Migrated
create-react-app → **Vite**.
**[STATED] failure mode:** the deployed build was "much slower than the version I run on my
computer for local development… I eventually discovered it was due to some of the browsers I was
targeting" — i.e. the browserslist/transpilation target was forcing down-levelled output. This had
always been true and was only exposed by the 50 000-person workload.
**Caveat:** the post's body is truncated at source immediately after "Vite worked much better", so
no further build detail exists in this slice.
**Re-implementer's note:** "FTG generates server-side" (project brief) is only partly true for this
era — the *map render* and much of the interaction are client-side, and performance is bounded by
the browser's JS build target. Treat the split as: generation server-side, render/edit client-side,
settlement state persisted as a versioned object in a storage bucket (T-05).

### T-05. Persistence model and infrastructure
**Posts:** 95869798, 106664214 (comments).
**[STATED]:** each settlement is a **file in an object-storage bucket** with **versioning enabled**
("if something breaks / you accidentally delete a settlement, you have a week to contact me and I
can revert"). The lifecycle rule to expire old versions after a week was never actually applied —
versions accumulated forever; fixing it cut storage costs 60 %. In the June 2024 comments Thomas
says "I store backups of settlements so I'll make a copy from that" when a user deletes a person by
accident — the version history is used as an operational undo.
**Size is a first-class concern:** the fractions quoted in T-01 ("relations took up around 30 % of
the settlement size") show the creator budgets the serialized settlement by component.
**Unknown:** serialization format (JSON? compressed?), whether the height map is stored or
regenerated from seed (see T-15), and whether versioning is S3-style or a bespoke scheme.

### T-06. Append-only settlement entity dictionaries (races, religions, genders)
**Post:** 101576411, images 01/09, 02/10.
**Problem:** let users add or correct races/religions/genders *after* generation without breaking
references.
**[STATED] rule:** "Because of the way people are generated and persisted, you can't **remove** any
religions, races, or genders, as people or buildings may still be linked to those entities." Adding
and editing are allowed; deleting is not. The UI shows the constraint inline: "Religions cannot be
deleted (as people may still be linked to them)" **[SHOWN]**.
**[STATED] propagation:** once added/edited, the entity is *immediately* available in every other
edit form for the settlement and to the **re-roll** paths (district / building / person re-roll).
**Re-implementer's takeaway [INFERRED]:** these dictionaries are referenced by id from person and
building records, and the design deliberately avoids a referential-integrity sweep by forbidding
deletion — a cheap, robust choice for a document-per-settlement store.
**[SHOWN] settings surface:** "Settlement specific settings" reached from the cog beside the
settlement name; tabs `Name | Races | Genders | Religions | Public Access`. The same forms are
reused from the create-settlement flow.

### T-07. Constrained person re-roll (field locking)
**Post:** 101576411, images 03/11, 04/12, 05/13, 06/14.
**Problem:** "one of the most requested features" — regenerate a person while keeping what you
already decided.
**[STATED] algorithm:** a re-roll settings modal lets you **lock in** parts of the person (the
example locks race = human, gender = male, age band = adult); pressing randomise re-rolls the
**general, appearance, personality and stats** field groups subject to those locks. A dice button
repeats the last re-roll with the same settings; a cog re-opens the settings modal.
**[STATED] deliberate exclusion:** "the relations and simulation detail fields will **not** be
re-rolled, as I feel like you'll want to tailor those to your specific needs (and those are much
more difficult to randomise)." This is a real design constraint: relations and schedules are
*graph* state tied to other entities, so re-randomising them is not a local operation.
**[SHOWN] person schema** (from the edit-person form): field groups **General** (first/last name,
gender, race, age, religion), **Appearance**, **Personality**, **Stats**, **Relations**,
**Simulation details**.

### T-08. Schedule model and profession-derived schedules
**Post:** 101576411, images 07/15 (a full custom schedule), 08/16 (the job editor).
**Problem:** the December 2023 schedule system is expressive but unusable at the table —
"creating a schedule like this, on the fly, during a game session, is infeasible".
**[SHOWN] schedule data model** (read directly off image 07/15):
- A schedule is a list of **day-sets**. Each entry has a `Days:` label (the screenshot shows
  `Days: 1,2,3,4,5` for the week and `Days: 6,7` for the weekend) and a **Relevant days** checkbox
  row `1/7 … 7/7`.
- Within a day-set, a list of **time-range entries**: `Time Range` with hour-granularity start/end
  over 0:00–24:00, and a `Status` (e.g. *Sleeping*, *Working*).
- Each entry carries a **Primary behaviour criteria** (example seen: "Primary location has other
  occupants"), a **Primary Behaviour**, and a **Default Behaviour**. A behaviour is
  `{Action (free text, e.g. "practicing medicine"), Building matcher (e.g. "Place of work"),
  Sub-location matcher (e.g. "Exact sub-location"), Exact sub-location (e.g. "Waiting room")}`.
  So behaviour resolution is: *predicate → primary behaviour, else default behaviour*, and a
  behaviour resolves to a (building, sub-location) pair plus a display verb.
- **Simulation details** on the person: `Type of person` (e.g. "Working Person"),
  `Place of residence` (building link), sleeping **sub-location** (e.g. "Flat 4 master bedroom"),
  `Job title`, `Place of work` (building link), `Job schedule` (a named preset, or *Custom
  schedule*).
**[STATED] the new feature:** an option in the edit-job form that **generates the schedule from a
preconfigured job**. The job list is a closed, alphabetised vocabulary with apprentice variants —
visible in image 08/16: *Cobbler, Cobbler apprentice, Cooper, Cooper apprentice, Count, Countess,
Cultist, Dealer, Democratic representative, Distiller, Distiller apprentice, Doctor, Dyer, Dyer
apprentice* — i.e. professions are data with an attached default schedule template.
**Corroboration of the live sim [SHOWN], post 127128581:** the Roll20 screenshot shows a building
dialog with sub-locations *Bar, Office, Service door, Kitchen, Stage, Table 1…Table 6*, each listing
the people currently in it with their job titles (Bartender, Chamber maid, Tavern owner, Cook), a
clock reading "9:00 Monday", `Next Hour` / `Time Skip` controls, and a status line "Closed". The
Foundry dialog (images 05/06) reads "The Servant's Rogue - (17:00 Monday) / Tavern where a secret
society gathers / Open (11:00 - 1:00) / 32 people currently here."
**Conclusion [INFERRED]:** the simulation is a *deterministic query*, not a stepped agent sim — at
any (day, hour) each person's location is computed by evaluating their schedule; "people currently
here" is an index over that evaluation. This is why time can be skipped arbitrarily and why hourly
Simple-Calendar sync (T-31) is cheap.
**Unknown:** how sub-locations are allocated (capacity? per-table assignment? random within a
matcher?), and how the building's opening hours relate to the occupants' schedules.

### T-09. Road/line intersection rendering ("better line intersections")
**Post:** 103668405, images 01/12 (before) and 02/11 (after).
**Problem:** where two road polygons met, the stroke decorations did not join — a visible notch.
**[STATED] method:** "I now render a **circle at the intersection** (with some logic based on the
roads at the intersection to choose the right size + colour), along with the edges. This applies to
most lines being drawn (like the active building line)."
**[SHOWN] what the road stroke actually is** (high-res crops): a road is drawn as a stack —
a light body fill (≈ `#cfc8bd`), a thin darker casing/edge on both sides, and a distinct
mid-grey **centre stripe**. In the *before* image the centre stripes of the two arms stop short and
leave a wedge-shaped notch at the bend; in the *after* image a disc, radius matched to the wider
arm and coloured to match the stripe, caps the joint and the corner reads as a smooth fillet.
**Re-implementer's note [INFERRED]:** this is the standard "round join by explicit cap" trick used
when each road segment is an independently triangulated quad rather than a stroked polyline —
you cannot rely on a line-join style, so you draw a disc of radius = half the widest incident
road's width, in the same z-order as the stripe, at the junction node. "Some logic based on the
roads at the intersection" implies per-road-class width/colour, so the disc must take the max
(or the dominant class) of the incident roads.

### T-10. Snapping in the layout editor
**Post:** 103668405. **[STATED]:** the old implementation made snapping "depend on the camera angle
rather than what was around the mouse cursor", producing inconsistent behaviour; it now works on
the neighbourhood of the cursor. A **snapping-strength control** was added to every tool that
snaps. **[SHOWN]** in the custom-building GIF: a slider labelled *Snapping distance* with the value
**11**, sitting beside a *Material* dropdown (value *Wood*).
**[INFERRED]:** "snapping distance 11" is in world units, and the fix is: gather candidate
snap targets within radius *d* of the cursor **in world space** (previously the radius was being
applied in screen space, so a rotated/zoomed camera changed which targets were eligible).

### T-11. River drawing tool (path → ribbon)
**Post:** 103668405, GIF `03.gif`/`13.gif` (105 frames, six sampled).
**[STATED]:** "This control lets you draw just the general path of the river, and then use sliders
to choose **how wide** and **how smooth** the river should be."
**[SHOWN] from the frames:** the tool lives in the *Draw Initial State* view of the create form and
in the layout editor's water tab. Tool palette: **Draw river shape** (free polygon),
**Draw river path** (polyline), **Draw ocean shape** (polygon), **Demolish**. Parameters for the
path tool: **River width = 125** and **Smoothness = 3**, both sliders. Mid-drawing the path is a
sharp-cornered polyline; on commit it becomes a smooth, constant-width blue ribbon.
Constraint displayed in the UI: **"You cannot draw water bodies that intersect with the red
circle"** — a red circle marks the protected settlement core.
**[INFERRED] algorithm:** centreline polyline → smooth (Chaikin corner-cutting or a
Catmull-Rom/spline resample; *Smoothness = 3* reads as an **iteration count**, which points at
Chaikin/subdivision rather than a continuous tension parameter) → offset by `width/2` on both
sides (polygon offsetting, the same Clipper machinery later used in T-17) → close the ends → fill.
**Failure modes handled:** the red-circle exclusion prevents a river being drawn through the
settlement origin; March 2025 fixes "a rare issue with generated rivers"; January 2025 fixes "if two
oceans are drawn to form an island in the initial settings, this no longer breaks" (i.e. land
becoming a bounded component broke a downstream assumption); June 2025 adds "shape options" to
rivers.
**Unknown:** the units of width 125, whether width can vary along the path, and how river/ocean
polygons are booleaned together.

### T-12. Brush tools and hand-drawn geometry
**Post:** 103668405. All **[STATED]** but with no algorithm given (**[NAMED-ONLY]** at the method
level):
- **Tree brush** — places multiple trees at once in a radius around the cursor (decoration tab).
- **Building colour & roof-shape brush** — paints colour and roof shape onto buildings; roof shape
  is a two-valued enum, **hip** or **gable**.
- **Background texture brush** — background textures support custom solid colours, plus a tool to
  edit an existing texture region.
- **Draw custom building shapes** — free-hand polygon for a building footprint
  (GIF `04.gif`/`14.gif` shows a concave, C-shaped footprint being drawn vertex by vertex and then
  committed).
**[SHOWN] layout-editor structure** (from the GIF): tool *categories* along the bottom —
**Roads, Buildings, Walls, Backgrounds, Decoration, Water**; tools for the Buildings category along
the top — **Place single, Draw, Paint, Fill dense, Move, Swap, Demolish**; plus *Cancel Edit* and
*Save Layout*. "Fill dense" is the manual counterpart of the generator's dense placement mode.
**Unknown:** the tree brush's distribution (Poisson-disc? jittered grid? rejection sampling?) —
nothing is said, and the rendered forests (T-27) look like a *density field*, not discrete sprites.

### T-13. Straight-skeleton roofs
**Post:** 103668405, images 05/10 (old) and 06/09 (new).
**Problem:** "the existing way of rendering roofs just overlays a **rectangular roof texture** over
the building, so for complex building shapes, the roof texture doesn't follow the flow of
buildings." Custom footprints (T-12) made this unacceptable.
**[STATED] method:** "I've created a new method of rendering the roofs based on the **straight
skeleton algorithm**. This can be used to create a **hip roof** for complex building shapes, and a
**gable roof with some extra postprocessing**."
**[SHOWN]:** image 05/10 is an L-shaped footprint with a flat brown fill, a dark outline and a soft
drop shadow — the roof reads as a sticker. Image 06/09 is the same L with a proper ridge network:
faces meeting along the skeleton's ridge and hip lines, each face given a slightly different brown
so the facet structure reads. The last frame of `14.gif` shows the same treatment on the concave
C-shaped custom footprint.
**[STATED] variants and cost:** two versions — a **flattened** one (2-D map, the default on more
powerful devices) and a **full 3-D** one that gives roofs depth. "This is more computationally
expensive to render — the building has more faces which need to be rendered." The **old
rectangular-texture renderer is retained and is the default for less powerful devices**; the choice
is exposed under render options (cog by the settlement name).
**Re-implementer's notes [INFERRED]:**
- Hip roof = the straight skeleton directly: offset every edge inward at a constant rate, the
  skeleton's arcs are the hips and ridges, and each roof face is the region swept by one footprint
  edge, lifted by `slope × distance-from-edge`.
- "Gable with some extra post-processing" = take the hip solution and, for the skeleton arcs that
  terminate at a reflex-free convex corner, *extend the ridge to the footprint edge and replace the
  two triangular hip faces with a vertical gable end*. That is the standard conversion and matches
  the two-value hip/gable enum in the brush tool.
- The shading is per-face (flat), keyed to face orientation, not a raster lightmap — the flattened
  2-D map keeps the facet colours, which is why FTG's 2-D buildings read as roofs rather than blobs.
**Unknown:** degeneracy handling (collinear edges, near-parallel walls, very thin footprints) —
straight-skeleton implementations are notoriously fragile there and nothing is said about it.

### T-14. Full 3-D view and street view
**Post:** 103668405, image 07/08; corroborated by 106664214 images 01/10, 02/11, 07/16, **09**.
**[STATED]:** "While playing around with the 3-D building roofs, I thought it would be cool to build
a full 3-D map view. Turns out, that wasn't that hard" — it is a render-settings option marked
**unstable**, explicitly not the intended interaction model and not to be fleshed out. A
**Street view** mode walks/flies the town in first person.
**[SHOWN]:** extruded prisms with the T-13 roof on top; walls render as a tall dark band with
rectangular towers (`106664214/16`); roads as raised light ribbons; rivers with sloped banks; trees
as low-poly canopies on trunks; district labels drawn *on the ground* along an arc; a sky gradient.
The unreferenced image `106664214/09.png` is a street-level shot showing a large grey hipped
pavilion (market hall) surrounded by small **coloured conical tents** — this is the 3-D form of the
multi-coloured squares that appear on 2-D maps, confirming they are **market stalls**.
**[INFERRED]:** the renderer is Three.js (the code snippet `new PlaneGeometry(...)` in T-16 is the
Three.js API), and 2-D and 3-D share one scene graph — the "flattened" roof mode is the same
geometry with height collapsed, which is why the 2-D map inherits the facet shading.

### T-15. Height maps
**Post:** 106664214.
**Problem:** add elevation to settlements (driven by the 3-D view and "all the people asking for
mountain maps").
**[STATED] generation:** "One of the most common ways to generate a height map is to use **perlin or
simplex noise**" — he does not say which he used, only that this is the approach.
**[STATED] storage decision, with the reasoning verbatim:** two options were considered —
(a) promote all existing 2-D points in the file to 3-D, or (b) keep a **separate height map at a
specified resolution**. He chose (b), because (a) "doesn't work well for the way things are
currently stored… a road segment is only two points, so I would record the height at each end, but
I wouldn't record the height in the middle of the road without additional processing."
**[STATED] a second benefit:** "there is potential for it to be **lazy loaded from a seed**, so I
don't actually need to store it for every settlement, and just create on the fly."
**Parameters named:** `heightMapWidth` (the raster resolution), `mapWidth` (world extent).
**[STATED] known gaps at the time of writing:** height does not yet respect water bodies
("currently rivers/oceans will just render below everything"), and only "rolling countryside" is
supported, not larger mountains.
**Status [STATED, 120828892]:** height integration was **shelved** during the generation overhaul.
"Figuring out how to display it in the 3-D mode is easy enough, but I'm not entirely sure how to
display it on the **2-D map**. Also, fitting it in to the road network algorithm will be
…interesting… to say the least." As of June 2025 mountains are still on the to-do list
(127128581 comments).
**Open failure mode [STATED]:** the first attempt had buildings floating above the terrain
(image 01/10) — "the math working out where the buildings fell on the map was wrong (if I remember
correctly, I might have had a `+y` instead of a `-y` somewhere)." A sign convention between the
map's 2-D coordinate frame and the height-map raster's row index.
**[SHOWN, June 2025, 130937474 images 10–13]:** the 2-D harbour renders show the brown ground broken
into large angular facets of slightly varying brown. That is consistent with a triangulated terrain
being flat-shaded and showing through on the 2-D map — but it post-dates the "I don't know how to
show height in 2-D" statement, so treat it as **[INFERRED, low confidence]**; it may equally be a
decorative vector noise texture on the district ground.

### T-16. Terrain tessellation, and re-triangulating background textures
**Post:** 106664214, images 03/12, 04/13, 05/14.
**Problem:** a mesh only has height where it has vertices. Displacing existing geometry by a height
map only works if that geometry is finely and *regularly* subdivided.
**[STATED]:** the initial background was a single plane "tessellated to triangles with widths and
heights matching the resolution of the height map" — one line of code:
```
new PlaneGeometry(mapWidth, mapWidth, heightMapWidth, heightMapWidth)
```
**[SHOWN] image 03/12:** the resulting wireframe — a uniform square lattice with every cell split by
a diagonal running the same way (the canonical `PlaneGeometry` triangulation).
**[STATED] the problem with real background textures:** "By default, they are triangulated into not
very even shapes… If we just update the existing triangle points to use the height from the height
map, **the middle of these textures don't get any height information**. We need to break the shapes
up into more regular triangles, **ideally lining up with each other to reduce clipping**."
**[SHOWN] image 04/13:** the default triangulation of a texture polygon — long thin slivers
radiating across the polygon, exactly what an ear-clipping triangulator (earcut) produces.
**[SHOWN] image 05/14:** after re-triangulation — a dense, near-regular lattice inside each polygon,
grid-aligned in the interior with fans only at the boundary, and neighbouring polygons' lattices
registered to the same grid.
**[INFERRED] the method:** constrained triangulation of each polygon against a **global lattice
whose spacing equals the height-map cell size**, with the polygon boundary as the constraint — i.e.
overlay the polygon with the height-map grid, keep the grid vertices inside it, and triangulate
boundary cells. Aligning every polygon to the *same* global lattice is what makes adjacent
polygons' vertices coincide, which is the stated goal.
**Quantitative note:** for `heightMapWidth = N`, the terrain plane alone is `2N²` triangles; every
background texture polygon adds its own lattice on top. This is why T-17 matters for performance as
well as correctness.

### T-17. Eliminating overdraw/z-fighting by polygon boolean subtraction
**Post:** 106664214, image 06/15 (the artefact), 07/16 (the result). Library link in `Links`:
`https://www.npmjs.com/package/js-angusj-clipper`.
**Problem:** the settlement map **layers** background textures (grass under a wheat field under a
path, etc.). Once all layers are displaced by the same height map and finely tessellated, coplanar
surfaces fight, and the lower layer pokes through the upper one.
**[SHOWN] image 06/15:** a yellow wheat field with green blobs of the underlying grass bleeding
through it in irregular islands — classic z-fighting between two displaced coplanar meshes.
**[STATED] what did *not* work:** "I tried messing around with the tessellation a lot to solve this,
but I couldn't find a good way to solve it with the existing parameters, that wouldn't sacrifice too
much."
**[STATED] the fix:** "I then discovered a way to essentially do **polygon math — specifically
subtraction** (thanks **clipper**!). This library lets me take one polygon (e.g. one in the
background), and **subtract another from it** (e.g. one on top) to create a new set of polygons.
This means I can **avoid clipping entirely as I can ensure nothing will render on top of each
other**. This also **improves performance**, as we don't have to render the extra triangles behind
the top textures."
**Re-implementer's recipe [INFERRED]:** process background layers top-down; maintain a running
"already covered" region; for each lower polygon compute `polygon − covered` (Clipper `ctDifference`,
even-odd or non-zero fill), re-triangulate the resulting (possibly multi-part, possibly holed)
polygons on the lattice from T-16, then union it into `covered`. The output is a **planar partition**:
every point of the ground is covered by exactly one triangle.
**[STATED] residual failure mode, accepted:** "Some clipping still occurs on roads, but it's
minimal so I plan to leave that as is." (Roads are presumably not part of the subtraction pass.)
**Library note:** `js-angusj-clipper` is the WASM/asm.js port of Angus Johnson's Clipper — it
provides both boolean ops and **polygon offsetting**, which is almost certainly the same machinery
behind the river ribbon (T-11), walls, harbour quays and the "gaps" placement mode (T-24).

### T-18. Map scale correction (the 3× bug) and the ruler
**Post:** 106664214; the ruler ships in 120828892.
**[STATED] discovery:** in street view "all the buildings felt very long to walk beside, especially
compared to their height. I thought I had used a **1:1 scale between meters and internal units**,
so to investigate I added a **ruler** feature… Turns out, I was **not** using a 1:1 scale in the x/y
axis, just the z axis (so the heights were correct, and the street-view eye height was correct, just
not the lengths of buildings). The real scale basically created buildings **3× bigger** than they
should have been."
**[STATED] remediation and its consequence — the pivotal event in this slice:** he re-researched
real-world building sizes, updated the generation parameters, and planned to migrate existing
settlements to the corrected scale. "Unfortunately, the **reliability of the generation algorithm
seemed to fall by quite a lot** once this was done. On investigation, it turns out that with the new
parameters (which made most buildings smaller, but **some larger ones remained the same size**), the
algorithm was struggling to place the larger buildings into the now smaller lots, and so would
**regularly give up**."
So: shrinking the typical building shrank the derived lot size, while temples/mansions kept their
absolute size — the ratio `large-building area : typical-lot area` blew up, and the placement search
started failing. This is the direct cause of the V2 rewrite.
**[STATED] fix follow-through:** "Fix bug with map scale" appears in the January 2025 release notes.
**[SHOWN] scale bars:** `20m` in the layout editor at close zoom; `250m` in the Roll20 view.
**Re-implementer's lesson:** keep a single explicit metres-per-unit constant, and make the
*ratio* of landmark footprint to district lot size an invariant you test, not an emergent value.

### T-19. Generation algorithm V1 — the pre-overhaul pipeline (documented, then discarded)
**Post:** 106664214 (**[STATED]** verbatim list), with the road half elaborated in 112861635.
```
1. Create the people and determine the buildings we want to place
2. Split the buildings we have into different districts based on the parameters
3. Start placing roads — estimate how much area we need for all the buildings,
   create roads until we have lots with that area
4. Place districts one by one; each claims a lot and then grows into adjacent ones
   if possible, placing buildings as it goes
5. Repeat 3 & 4 until all districts are placed
```
**Key invariant [STATED, and reaffirmed 2025-05-13]:** people and buildings are decided **first**;
the layout is generated to fit them. Thomas, replying to a request to generate three layouts before
the population: *"The current algorithm generates the details before the layout (so that we know
what buildings need to be placed and then generate an appropriate layout), and I don't see this ever
changing."* Area budgeting is therefore top-down: total building area → required lot area → how much
road network to grow.
**Failure mode [STATED]:** "Step 4 is the one causing the reliability issue — a district keeps
claiming a lot, but it doesn't have room for the current large building (e.g. a temple); if the
district doesn't find a lot after a certain number of attempts, **the algorithm gives up**." So the
recovery strategy was bounded retry, then abort the whole generation.
**Second failure mode [STATED]:** districts that claim a lot and then cannot grow into any adjacent
lot end up too small, so there is **merge logic** that fuses undersized districts — "this means that
some districts may have **completely unrelated buildings** in them. Part of this also happens as the
district groups are created **before** the roads are placed, so some might have very few buildings."
**[SHOWN] image 08/17** is the debug visualisation of exactly this: the settlement coloured by
district in saturated hues, with one district sprawling over the whole north-west, a lone
single-lot district at the south, and a **disconnected** island district at the south-east.
**Third failure mode [STATED, 112861635]:** "The lots created are usually quite small, so if I have
a larger building to place (like temples, mansions), it can be difficult to find a spot to place
them, **which slows down the overall algorithm**" — i.e. the retry loop is also the performance
problem, and "the two phases have the same road-network characteristics, so they end up looking
similar (other than how the buildings are placed)."

### T-20. Road growth V1 — proposal-queue segment agents
**Post:** 112861635 (**[STATED]**), illustrated by image 01/06.
**Algorithm as stated:** "as road segments are placed, they **propose new ones from their end** —
this is usually just *'continue straight ahead'* and *'branch left and right at right angles'*.
The algorithm has a **queue** of proposed roads, places them one by one (following some **validity
checks**) and then adds the new proposed roads to the queue."
**Two phases [STATED]:** "The first phase generates the **dense inner settlement**, and the second
generates the **outer buildings**."
**Emergent signature [STATED]:** "most of the settlements in FTG look similar… They always originate
from a **4-way crossroad**, which then blooms outward in a **vaguely circular shape**. There are
outliers (especially when there are external factors, like coasts / rivers), but generally this is
what most settlements look like."
**Recognition [INFERRED]:** this is the Parish–Müller *CityEngine* L-system road template — a global
goal function proposing successors and a local-constraints stage accepting/adjusting/rejecting them,
processed from a priority queue. FTG's version is the simplified orthogonal case (straight + two
right-angle branches).
**Unknown:** the contents of the "validity checks" (minimum spacing to existing roads? snap-to-node
radius? maximum angle deviation? lot-area tests?), the queue's priority order (FIFO vs
distance/priority), and the termination condition for phase 1 (the area budget from T-19 step 3).

### T-21. Road growth V2 — large lots, configurable phases
**Post:** 112861635 (**[STATED]** + **[SHOWN]** images 02/07, 03/08, 04/09, 05/10).
**Design intent [STATED]:** "at its core similar to the previous algorithm, but ends up creating
**much larger lots**. These larger lots are then given to the **districts**, which can then add
their own personality to the lot, and **split it up into the desired size**. The new road network
algorithm is also a lot more customisable."
**Named features [STATED]:**
- Configurable **initial road layout** — 3/4/5-way crossroad (later extended: "single through road"
  and others, 123982784; a **ringed-city preset** is added in the same post).
- **Multiple phases of generation**, each configurable with:
  - whether the phase should **end in a wall**
  - **how wiggly** the roads should be
  - the **branching strategy** of the roads
  - **how buildings should be placed**
- **[STATED]** in the September comments, replying to a request for a town with no central
  crossroads (a valley town with only through roads): "That is also a feature that I'm working on in
  this update, I just didn't highlight it."
**[STATED] known defect at that point:** "I'd like to reduce the number of **sharp points** in some
cases" (acute-angled slivers where roads meet at a shallow angle).
**[SHOWN] the four WIP screenshots demonstrate four distinct morphologies from one algorithm**,
which is the point of the phase parameters:
- `02/07` — irregular organic core, a detached satellite hamlet, big empty lots;
- `03/08` — a strict orthogonal **grid** with four diagonal arterials and ribbon development
  stretching along them to the map corners;
- `04/09` — a **radial-concentric** town: two or three ring roads with radial spokes and three
  suburb arms;
- `05/10` — a sprawling wall-less organic town with winding roads and a detached hamlet.
The overall town outline is no longer circular; it is clearly **anisotropic along the main roads**.
**Remaining worklist at that date [STATED]:** better district & building placement "that feels more
real", more landmark placements, suburb road generation, district re-rolling updated for the new
algorithm, **less empty space**, testing, performance optimisation.
**Process note [STATED]:** "I've come up with about **3 different algorithms** before settling on
what I have now — there was no obvious best way of doing things — each of these needed to be coded,
debugged, and tweaked before deciding that they weren't suitable."

### T-22. Generation algorithm V2 — the shipped pipeline
**Posts:** 106664214 (the plan), 120828892 (the shipped version).
**[STATED] plan, June 2024:**
```
1. Create the people and determine the buildings we want to place
2. Categorize buildings into different pools for easy access
3. Place main roads until a large lot is created
4. Pick a district type based on the remaining buildings
5. Give the large lot to that district; it splits it up based on its parameters and
   takes buildings from the pool to fill the area. Logic can be added here to handle
   'landmark' / large buildings — placing them FIRST (which should be easy as it's a
   large lot), and then generating roads AROUND them
6. Repeat 4 & 5 until all the buildings are placed
```
**[STATED] shipped summary, January 2025:** "The **old** algorithm created small lots first, placed
buildings, and then **merged** lots together to create the districts. The **new** algorithm creates
**large district lots**, places **landmark buildings**, then **divides** the large lot into smaller
ones, and places the remaining buildings for the district."
**Why it fixes T-18/T-19 [STATED]:** larger lots make it easier to place large buildings, and they
let "districts place roads according to their preferences in these lots" — road structure becomes a
*district* property, so an old quarter of winding lanes and a new quarter on a grid can coexist.
"This currently isn't done for many districts, but it's something I'd like to expand."
**Inversion of control, the key architectural change [INFERRED]:** in V1, roads were global and
districts were a post-hoc grouping of lots (hence merge logic and mixed-purpose districts). In V2
the **district is the unit of subdivision**: the global road pass only produces coarse cells,
and each district owns the interior subdivision, the landmark placement, the local road style and
the building-placement mode. That also removes the "districts created before roads" ordering bug
named in T-19.
**[STATED] landmark-first rule:** landmarks are placed while the lot is still large (so placement
always succeeds), then roads are generated *around* them. This is the direct antidote to the
"can't fit the temple, give up" failure.
**[STATED] district variety benefit:** "there are now many more ways to place **markets** than there
were before."
**[STATED] cost and outcome:** ~**800 files**, **70 000 lines**; generation is **~10 % faster**;
"almost all aspects of the map generation were updated, and needed to be properly tested."
**[SHOWN] evidence of the large-lot stage:** `112861635/07` (WIP) shows big pale lot polygons with
buildings only ringing their edges and landmark glyphs (stars, a cruciform, a plinth) already placed
inside the core before subdivision.

### T-23. Suburb generation (buildings without surrounding roads)
**Post:** 120828892 (**[STATED]**), 106664214 (the motivation), heavily **[SHOWN]** in images
02/07 and 01/06.
**Problem [STATED, June 2024]:** "currently, buildings are placed **at the border of a lot,
surrounded by roads**. I'd like to support things like **cul-de-sacs**, and other road networks that
**don't require a fully connected graph**." And from March 2024: "placing buildings on the outer edge
(so roads don't surround the settlement)."
**[STATED, January 2025]:** "Suburb road generation & building placement — this allows buildings to
be placed **without roads around them**. Notably, this **changes how hamlets & villages are
generated**." Effect: "The suburbs add a nice organic feel, and the settlements also now tend to
**grow along the main roads**, giving them much more interesting shapes than the vaguely circular
ones that were created before."
**[SHOWN] the actual geometry** (crop of `120828892/07` around Piklane): a suburb is a **ribbon** —
a single road spur with one row of buildings on each side, each building's long axis roughly
perpendicular to the road, sitting on a pale-green (grass) strip that is the lot; buildings do not
touch each other and the ribbon terminates bluntly (a dead end, no returning road). Ribbons radiate
from the core like fingers, and in the larger cities (`09`, `12`) they fray the town outline into a
starfish. Where a ribbon meets the core the ground colour switches from green to beige/brown.
**Re-implementer's note [INFERRED]:** implementing this needs the lot to stop being "a face of the
road planar graph". A suburb lot is a **buffer around a road centreline** (offset polygon), split
into slots along the road, one building per slot, set back from the road by a margin — which is
exactly what Clipper's offsetting gives you and why the dead-end ribbons don't need a closed face.

### T-24. Building-placement modes, including "gaps"
**Post:** 120828892 (**[STATED]**), plus the editor's manual equivalents from 103668405.
**[STATED]:** a new placement option **"gaps"** — "Like the **dense** building option, but
**shrinks the area** so buildings aren't touching. This is now the **default for areas outside of
the settlement center**."
**Modes identifiable across the slice:** *dense* (buildings share walls, terraced), *gaps* (dense
layout with a shrink so they don't touch), *suburb/ribbon* (T-23), and whatever the layout editor
calls **Fill dense** / **Place single** / **Draw**.
**[INFERRED] "shrinks the area":** the same subdivision runs, then each building's footprint is
**inset** (negative polygon offset) by a small delta before it is rendered, producing a uniform gap
without changing the subdivision — a one-line change with Clipper's offsetter, which is why it could
be introduced as a variant of dense rather than as a new algorithm.
**[SHOWN] the visual difference is decisive:** the dense core reads as continuous terraces around
beige courtyards; the gaps zone reads as individual houses with slivers of ground between them;
the suburb ribbons read as detached houses on green.

### T-25. Districts as a first-class generator object
**Posts:** 106664214, 112861635, 120828892, plus 123982784.
**[STATED] responsibilities after the overhaul:** districts "have more control on how to **decorate /
layout** buildings"; "the **distribution of buildings** in districts is now better"; districts can
"place roads according to their preferences"; district **type is chosen based on the remaining
buildings** in the pool (V2 step 4); landmark/large buildings are placed by the district first.
**[STATED] district types mentioned anywhere in the slice:** market (with "many more ways to place
markets"), **castle** ("improved castle districts — fill them with more things"; still incomplete in
June 2025), **park** ("improved park districts, paths and other small features"), **waterfront**
(harbours are "created as part of waterfront districts"), **university** ("better university
districts", deferred June 2025), plus the June 2024 wish for "special landmark districts, e.g. a
cathedral / monastery / castle district, which could place **groups of buildings to create a larger
complex**".
**[STATED] create-form exposure** (image `127128581/07`): a **Districts** section described as
"Decorations, growth, and placement".
**[STATED] March 2025 fix:** "**Respect road settings in inner district lots**" — the road
parameters chosen in the create form were not reaching the district-internal subdivision.
**[SHOWN] debug view:** `106664214/08` renders each district as a translucent saturated colour over
the map — this is the internal debug tool later mentioned as "I built an internal debug tool for
myself".
**[STATED] export gap:** districts are **not** in the GeoJSON export (user report 2025-01-12;
Thomas: "I've added districts in the export to the to-do list!").

### T-26. Walls
**Posts:** 120828892 (**[STATED]** release notes), 112861635 (walls as a phase parameter),
**[SHOWN]** `120828892/09` and its crop.
**[STATED]:** new wall types with **stone as the new default** (previously something else — most
likely wood/palisade); **scalable wall towers**; **walls now split across rivers**; a wall is a
*phase terminator* in the road generator ("if they should end in a wall"); planned alternatives
include **moats** and **bypasses**.
**[SHOWN] rendering:** a constant-width grey-blue band with a darker outer stroke and a soft inner
shadow, tracing a **convex-ish polygon of ~8 smoothed vertices** with rounded corners; a small
darker rectangle straddles the wall at one vertex (a tower/gatehouse); a **ring road runs
immediately inside the wall** and buildings back onto it; roads pass through at gates. Crucially,
in `09` the wall encloses only the **inner old town**, with the rest of the city grown outside it —
the wall is a historical boundary, not the settlement boundary. Inside the wall, building roofs are
**pale stone-cream** rather than brown, i.e. building material/colour varies by district status.
**[SHOWN] 3-D form** (`106664214/16`): a tall near-black band with regularly spaced rectangular
towers.
**Unknown:** how the wall polyline is derived (convex hull of the phase's lots? offset of the
district boundary? a smoothed alpha-shape?), how tower spacing is chosen ("scalable" suggests tower
size scales with wall thickness or settlement size), and the river-split rule (does the wall stop at
the bank, or is there a water gate?).

### T-27. Farmland, forests and countryside
**Sources:** all map images; nothing is stated about the method — **[SHOWN]/[INFERRED]** only.
**[SHOWN] farmland:** the countryside is a complete **polygonal partition** — no gaps — of
quadrilateral-ish fields at varied orientations, in four recurring fills: mid-green (pasture),
pale-yellow (cereal), olive-green with fine stripes (row crop), and grey-brown (ploughed/fallow).
Each field carries **fine parallel hatching aligned to the field's own long axis** (crop rows), a
thin darker boundary line, and small **tree glyphs sitting on the boundary lines** (hedgerow trees)
rather than scattered in the interior. Field sizes grow with distance from the settlement in the
large maps. Lanes (thin pale lines) run between blocks of fields.
**[INFERRED] plausible construction:** recursive OBB/longest-edge bisection of the annulus between
the settlement boundary and the map edge, or a relaxed Voronoi partition, with per-cell crop type
and per-cell row direction. Both are consistent with the quadrilateral cells and the per-cell
hatch angle; nothing in the slice distinguishes them.
**[SHOWN] forest:** a mid-green base polygon with subtle mottling, overlaid by a *dense field* of
small dark-olive "scribble" glyphs (clustered arcs and circles, semi-transparent, varying size),
denser in the interior and thinning at the edge — it reads as a **hand-drawn woodland texture /
density field**, not as placed sprites. The forest boundary is irregular and does not follow the
field partition.
**[STATED] create-form exposure** (image `127128581/07`): a **Landscape** section —
"Farms, forests, raw resources". Raw resources implies fields/woods are also economic inputs.
**[STATED] wishlist, January 2025:** "Improved forests, adding **trails** etc."; "Option to
**re-roll farmland** from the layout editor."

### T-28. Coastline decoration (beaches, cliffs, rocks)
**Post:** 130937474, images 01/08 (long beach), 02/14 (rocky), 03/09 (cliffs).
**Problem [STATED]:** "while trying to implement harbours, I realised that the existing coastlines
don't look that great. Buildings and farmland always ended up **too close to the ocean edge**, and
the ocean edge was always **pretty smooth with no interesting details**."
**[STATED] features added:** **beaches (sand and pebble)**, **cliffs**, **rocks**, "with a whole
bunch of extra controls around the **ocean shape** and **details** exposed"; the decoration also
works on **manually drawn coastlines**.
**[SHOWN] how each renders:**
- *Long beach* (`08`): a khaki/sand band of near-uniform width, finely hatched along its length,
  lying between the flat blue ocean and the land; the coastline itself is almost a straight line.
- *Rocky coastline* (`14`): the shoreline is heavily **crenulated** with many small lobes and
  inlets; a dense band of small dark blue-grey rock glyphs hugs the waterline; short sand patches
  appear in the bays; one pale-grey patch reads as a **pebble** beach.
- *Cliffs* (`09`): a continuous band of jagged grey-blue rock glyphs along the waterline with **no**
  sand; land meets water abruptly.
**[INFERRED] the pipeline:** (1) generate/accept the ocean polygon; (2) perturb its boundary to a
chosen roughness (the "ocean shape" controls — a noise or midpoint-displacement pass produces the
lobed outline in `14` versus the smooth one in `08`); (3) classify boundary runs into
beach/cliff/rock; (4) for a beach, **offset the boundary inland** by the beach width and fill the
resulting strip with the sand/pebble texture; for cliffs/rocks, scatter rock glyphs along the
boundary polyline. Step (4)'s inland offset is also what pushes buildings and farmland back from the
water, fixing the stated "too close to the ocean edge" problem — the decoration band is presumably
subtracted from the buildable area.
**Regression note [STATED in comments]:** the new coastline/harbour generation applies to **new
settlements only**; "they need to be manually added to existing settlements."

### T-29. Harbours
**Post:** 130937474, images 04/10, 05/11, 06/12, 07/13.
**[STATED]:** "For a while now, this has been the **most requested feature**… These are created as
part of **waterfront districts**, and have a bunch of different options available for the **shape**,
**harbour wall shape and material**, and **pier shape and material**."
**[SHOWN] the four examples are genuinely different configurations:**
- `04/10` — an enclosed basin: a broad pale stone **quay** wrapping the water in a chamfered polygon,
  **four wooden plank piers** projecting from the western quay, and a detached offshore
  **breakwater/mole** rendered as a narrow pale spine covered in rock glyphs.
- `05/11` — an angular basin with **six diagonal wooden piers** in a fan, a rounded-corner quay with
  an inner darker lip, and triangular pocket basins at each end.
- `06/12` — a small harbour whose quay outline is **sawtooth/zig-zag**, with two **T-shaped stone
  jetties** and a curving **rock breakwater** sweeping out from the headland.
- `07/13` — an open waterfront: one long straight quay with five **"ladder"/fishbone piers** (a spine
  with three or four cross-members) projecting into open water; no enclosing basin.
**Pier glyph vocabulary [SHOWN]:** plain plank (a single rectangle), T-head, and ladder/fishbone;
materials read as brown (wood) or pale grey (stone). Every pier has a drop shadow onto the water.
**Unknown:** how the harbour footprint is fitted to the coastline (a straight run long enough? an
existing bay?), how the basin is excavated from the land/ocean polygons (a Clipper boolean is the
obvious mechanism), pier count/spacing rules, and whether ships are ever placed.
**Context [STATED]:** "as usual, this ended up being a whole bunch more work than I was expecting,
and I only ended up implementing harbours" — castles slipped again.

### T-30. Map labels and the arc renderer
**Post:** 120828892 ("**Arced district text rendering**", **[STATED]**, no method);
**[SHOWN]** in `06`, `07` and their crops.
**[SHOWN]:** the settlement name and each district name are set in a **Trajan-like serif small-caps**
face, **cream/off-white fill with a heavy black outline plus a soft drop shadow**, and each label is
**bent along a shallow arc** whose tangent follows the district's principal axis — labels can run at
any angle including near-vertical (`TRADARD`) and upside-down-ish. The settlement name is the
largest; district names scale down with district importance/size; minor named places
(`WIND HOMESTEAD`) are much smaller. Building labels also appear at high zoom in tiny caps.
**[INFERRED]:** the arc is a circle fitted to the district polygon's long axis (or a quadratic
through the polygon's medial line), with per-glyph rotation along it; the size is a function of the
label's fitted arc length versus the district's extent. Standard text-on-path, but note the
**halo-outline-plus-shadow** is what makes it legible over both the brown core and the green fringe.

### T-31. Simulation clock, calendar, and external time sync
**Posts:** 123982784 (**[STATED]**), 127128581 (**[STATED]**), 101576411 (schedule model, T-08).
**[STATED] custom calendar** (a new **Calendar** section in the create form): custom **hours in a
day**, custom **days in a week**, configurable **rest days**, and an **override of the type of day
when jumping time** ("e.g. if you want a midweek day to be day of rest temporarily (e.g. a
holiday)"). Schedules therefore key off *day type*, not a fixed 7-day week.
**[STATED] Simple Calendar integration:** "the time and date in the FTG settlement will change with
the simple calendar time. This includes manual updates as well as the realtime progression feature
(**only updating every hour**)." The hour is the simulation's quantum.
**[SHOWN] clock UI:** "9:00 Monday" with **Next Hour** and **Time Skip**; building dialogs are
time-stamped ("The Servant's Rogue - (17:00 Monday)") and carry opening hours and a live occupancy
count.
**[STATED] bulk edits (March 2025):** bulk-update job title, place of work and schedule, and bulk
**move people to a new location** — the sim state is editable in bulk, which matters for a
50 000-person settlement.

### T-32. Embedding architecture (Foundry VTT, Roll20) and its constraints
**Posts:** 127128581, 120828892 comments, 123982784.
**[STATED] mechanism:** both integrations **iframe a live FTG instance**. The Foundry module is a
proper module; **Roll20 is a browser extension** (Chrome + Firefox) because "the Roll20 **mod API
doesn't allow iframes** to be added to the page, or for **web requests** (e.g. to the FTG server) to
be made. Additionally, Roll20 mods require you to have the **pro** subscription tier." The extension
must be installed by **all players** and "can respond to the **chat** to sync operations between
players" — i.e. Roll20's chat channel is used as the message bus. Code:
`github.com/thomasjallerton/towngenerator-roll20-extension`,
`github.com/thomasjallerton/towngenerator-foundrymodule`.
**[STATED] limitations, in the creator's own words:** the Roll20 version "just renders a normal
instance of FTG, without support for more advanced features like pop-out dialogs and automatic
syncing". On tokens: "Realistically, I don't want to rewrite the rendering for FoundryVTT, and it
would **double all future front-end work**… I currently can't think of an easy way (other than
rendering a **static image** as the background) that would let you put tokens on top of the FTG map
and have them move together — but that gives up some of the interactivity." Offered alternatives:
player-placed **pins**, the **ruler**, **journal links**, building highlight ("mark as the current
location" → blue outline for all players), and possible **event triggers on building click**.
**[STATED] access model:** iframing was premium-gated via a "FoundryVTT origins" setting; from April
2025 free users can enable iframing per settlement, plus a premium **default public access level**.
Public users can create/edit **public pins**, synced live into Foundry without a refresh.

### T-33. Export and data formats
**Sources:** comments and passing mentions across the slice — all **[STATED]** but thin.
- **CSV** export of people ("you could export the people as a CSV, and then search in that for each
  race" — 95869798).
- **GeoJSON** download, used by a worldbuilder; **districts are missing from it** (112861635
  comments).
- **PNG** export of the map, used as a Foundry/Roll20 background (120828892 comments).
- **JSON** building export exists, but: "the building **JSON export format is quite different to the
  building edit request format**, and I don't really want to maintain that as an API as uploading
  that many buildings, determining what's different, and validating it will be tricky" — so there is
  **no round-trip import** (120828892 comments, 2025-03-06). He is more interested in a **bulk edit
  buildings** function instead.
- **Create-settlement settings** can be downloaded to a file and re-imported (127128581); previously
  they lived only in `localStorage`, which users were losing. **[SHOWN]** "Manage settings" dialog
  with a named preset ("World"), export/import/delete and "Upload from file".
- **Export of personality fields** was extended in April 2024 ("more personality fields in export").
- The population **search is capped at 50 results** (95869798 comments).

### T-34. Performance work
**[STATED] across the slice:**
- Build-target-driven slowness in production, fixed by the Vite migration (T-04).
- Relation storage 30 % → 10 % of file size (T-01), a precondition for 50 000-person settlements.
- Placement retries were a *performance* problem as well as a reliability one (T-19).
- January 2025: **generation ~10 % faster**; "use more **web workers** for the building render step
  for hopefully faster loading".
- Straight-skeleton roofs are "more computationally expensive to render — the building has more
  faces"; the **old renderer is kept as the default on less powerful devices** and the mode is
  user-selectable (T-13).
- Clipper subtraction improves performance by removing hidden triangles (T-17).
- June 2025: "Improved render performance of larger settlements."
**[INFERRED] the recurring shape:** every quality jump (roofs, terrain, 50 k population) is paid for
in render cost, and each time the answer is a *tiered default* plus an explicit setting, not a
single compromise.

### T-35. Internal tooling
**[STATED, 120828892]:** "I built an internal **debug tool** for myself" — the district-colour
overlay (`106664214/08`) and the wireframe/triangulation views (`106664214/03,04,05`) are almost
certainly its output. **[STATED, 120828892]:** the **ruler** shipped to users as a map tool after
being built to diagnose the scale bug (T-18). A worthwhile pattern: the measurement instrument that
found the bug became a product feature.

---

## 3. Visual and style conventions observed in the images

**Map palette** (sampled from the high-resolution renders; hex values are approximate):
| Element | Colour / treatment |
|---|---|
| Dense core ground | mid-brown `≈#7a5a45`, subtle mottled noise, large soft facets |
| Suburb / outer lot ground | pale sage-green `≈#c3cfae` |
| Courtyard / plaza / lot interior | warm pale grey-beige `≈#cec7b8` |
| Building roof, common | dark warm brown `≈#5b4032`, thin darker outline, two-tone facet shading, soft drop shadow down-right |
| Building roof, stone/status | pale cream `≈#d5cfc2` (walled old town, large civic buildings) |
| Landmark buildings | flat slate grey `≈#8b9099`, distinctive silhouettes: **6- and 8-pointed stars**, **cruciform (church/cathedral)**, thick arrows, plinth rectangles |
| Roads | body `≈#cfc8bd` with a thin darker casing and a mid-grey centre stripe; 2–3 widths for hierarchy; junction discs (T-09) |
| River | steel blue `≈#7796b4`, flat, constant width, gentle meanders, road-coloured bridges |
| Ocean | muted slate blue `≈#6f86a8`, flat, no waves or gradient |
| Beach | khaki `≈#c8b57e` with fine along-shore hatching |
| Cliffs / rocks | clustered dark blue-grey glyph band along the waterline |
| Quay / harbour wall | pale stone `≈#cfc7b6`, crisp edge, drop shadow onto the water |
| Piers | brown (wood) or pale grey (stone); plain, T-head or ladder/fishbone glyphs |
| Pasture / crop fields | mid-green, pale-yellow, striped olive, grey-brown; fine per-field hatching along the field's own axis |
| Parks | light green polygon inside the core, with tree glyphs and sometimes internal paths |
| Forest | mid-green base plus a dense field of small dark-olive scribble glyphs, thinning at the edge |
| Trees (settled areas) | small green rosettes — 3–5 overlapping lobes, darker outline, lighter centre |
| Market stalls | small **saturated** squares (red, blue, purple, green, yellow, orange, pink) packed in rows on a tan plaza — the only saturated colour on the map |
| Wells / fountains | tiny blue dots; small grey radial-spoke discs |
| Wall | constant-width grey-blue band, dark outer stroke, rounded corners, occasional darker tower rectangle |

**Line weights and structure.** Everything is flat vector fill plus a hairline outline; there is no
cross-hatching, stippling or pen texture anywhere — the "hand-drawn" feel comes entirely from the
tree/rock **glyphs** and the field hatching. Shadows are uniform soft offsets in a single direction
(down-right), applied to buildings, landmarks, walls and piers, and they are what give the 2-D map
its slight relief. The 2-D map is effectively the 3-D scene flattened, so roof facets survive as
two-tone roof halves.

**Blocks.** The signature texture is: a block ringed by contiguous small brown buildings with a pale
courtyard in the middle. Old-algorithm maps make almost every block that shape at almost the same
size; post-overhaul maps show a strong size hierarchy — large civic lots, medium blocks, ribbon
suburbs.

**Labels.** Settlement and district names in cream small-caps serif with a heavy black outline plus a
shadow, **bent along an arc**, sized by importance. No legend, no north arrow on the 2-D map;
a **scale bar** sits bottom-right ("20m" zoomed in, "250m" zoomed out), plus zoom `+`/`−` and a
reset/compass button. Layer controls are two dropdowns top-right — **Satellite** and **Districts** —
alongside a **Search buildings** box. A selected building is highlighted in **red**; a
Foundry-highlighted building gets a **blue** outline.

**Application chrome** (distinct from the map style): parchment/cream background `≈#f7f4e8`, deep
navy serif small-caps headings, **crimson** accents for inputs, active tabs and primary buttons,
icon-first toolbars, and a dice glyph for re-roll. The family-tree view uses the same cream
background with navy node borders and red-outlined circular buttons.

---

## 4. The creator's stated design philosophy and constraints

1. **Population first, map second — permanently.** "The current algorithm generates the details
   before the layout (so that we know what buildings need to be placed and then generate an
   appropriate layout), and **I don't see this ever changing**" (2025-05-13). The map is a *fitting
   problem* for a known building manifest, not a landscape that is then populated. Everything else
   follows from this: area budgeting, the large-building placement crisis, district type chosen from
   the remaining building pool.
2. **Reliability over cleverness.** The whole 2024-06 → 2025-01 rewrite exists because the generator
   "would regularly give up". The V2 order (landmark first, while the lot is still big) is chosen
   specifically to make the hard placement trivially satisfiable.
3. **Static deployment, no server for the site.** Next.js was rejected on exactly this ground.
4. **Data model conservatism.** Entities are append-only (races/religions/genders cannot be deleted);
   no JSON round-trip import ("I don't really want to maintain that as an API"); relations
   normalised rather than denormalised.
5. **Tiered rendering rather than one compromise.** Old roof renderer kept as the default for weak
   devices; flattened vs full-3-D roofs; the 3-D map shipped explicitly "marked as unstable… as a
   fun toy" and deliberately not to be developed further.
6. **Don't double the front-end.** The refusal to re-implement rendering inside Foundry is stated as
   a hard constraint on all future work.
7. **Small-batch cadence after a big change.** After the 800-file overhaul: "I want to take a break
   from major changes for a bit, and tackle some of the smaller feature requests that have
   accumulated." He repeatedly under-estimates "small" work (harbours ate a whole month; castles
   slipped three times).
8. **No dates.** "I can't provide any estimate for when this will be done, it'll be ready when it's
   ready."
9. **Realism as a tuning target.** The map-scale episode: real-world building dimensions were
   researched and the generation parameters rewritten to match metres 1:1.
10. **Honest about trial and error.** Three road algorithms were coded, debugged and discarded
    before the fourth was kept; "there was no obvious best way of doing things."

---

## 5. Useful facts from the comment threads

- **2024-01-07/08 (95869798):** gender weighting **cannot** be set per race ("that's currently not
  possible, but it's a good idea"). Full population lists are obtained by **CSV export**; the
  in-app population search "is capped out to **50 people**".
- **2024-05/2025-02 (103668405):** the three most-repeated map requests in this slice are
  **hills/mountains/elevation**, **cliffs**, and **rock decorations**; one user asks to "lay down
  some initial walls and district boundaries before having the generator fill in the rest" — i.e.
  authored constraints as generator input, which FTG does not support.
- **2024-06-22 (106664214):** "**ruin**" as a building type was requested earlier and is still on the
  to-do list.
- **2024-07-16 (106664214):** a reproducible bug — entering a custom personality returned
  `HTTP request failed: SyntaxError: Unexpected token 'N', "Non consec"... is not valid JSON`, i.e.
  a **server error page beginning "Non consec…"** (almost certainly "Non consecutive …") being
  returned where JSON was expected. Confirms a validating server API behind person edits, and that
  errors are surfaced raw. Also confirms settlements are addressed by UUID:
  `fantasytowngenerator.com/user/settlements/<uuid>`.
- **2024-11-03 (112861635):** a town with **no central crossroads** (two roads meeting at a square, a
  valley town with only through roads) was already implemented in the upcoming update but not
  highlighted — it shipped as the "initial road type" option in March 2025.
- **2024-11-29 / 2025-06-10:** **road names** requested twice; on the to-do list both times, still
  not implemented by June 2025.
- **2025-01-12 (112861635):** **GeoJSON export omits districts**; added to the to-do list.
- **2025-02-02/03 (120828892):** the long token thread. FTG cannot host VTT tokens without rewriting
  the renderer; the pragmatic workflow users adopt is *generate in FTG → export PNG → tweak
  resolution so tokens fit the paths → add Monk's trigger tiles*. Thomas offers pins, the ruler,
  journal links, building highlight and possible click-triggers instead. One user's comparison is
  worth recording: FTG is "almost… a fully featured back end… I'd almost compare it to Dwarf
  Fortress", against which "Wonderdraft and Inkarnate would be alternatives that took 8× effort and
  gave you 20 % of the function."
- **2025-03-06 (120828892):** bulk building operations are the real need behind the JSON round-trip
  request ("I made a metropolis and there are more tanners than I would want"); Thomas prefers a
  **bulk edit buildings** feature, and points at building/district **re-roll** as today's answer.
  District re-roll is rejected by the user because it destroys hand-authored content — a real
  tension between regeneration and manual edits.
- **2025-05-13 (127128581):** request to generate **three candidate layouts before** populating;
  refused on the architectural ground in §4.1, with re-roll offered as the workaround.
- **2025-05-31 (127128581):** users accidentally generate settlements; the escape is the **home
  button above the settlement name**, which returns to the create form with settings intact.
- **2025-06-07/08 (130937474):** new generation features apply **only to new settlements** — "they
  need to be manually added to existing settlements". Coast side is controlled by **drawing the
  water** where you want it. **Custom building types** (from scratch, with an associated job that
  populates) requested and not available.
- **2025-01-14 (112861635):** a request for visible moving people on the map — not implemented; the
  simulation is queried, not animated (T-08).

---

## 6. Open questions a re-implementer would have to decide

1. **The V2 subdivision itself.** "Districts divide the large lot into smaller ones" — by what?
   OBB recursive bisection, straight-skeleton-based lot splitting, road-driven subdivision, or
   something else? The post defers to the user guide (`createSettlement__algorithm.md`, out of this
   slice). This is the single biggest gap.
2. **Road validity checks in the proposal queue** (T-20/T-21): minimum segment length, snap radius
   to existing nodes, minimum angle between incident roads, lot-area acceptance test, and the queue
   ordering. Nothing is stated. The zero-length-road bug (March 2025) and the "sharp points"
   complaint (September 2024) are both symptoms of this layer.
3. **"Wiggliness" and "branching strategy" parameterisation** — is wiggle a per-segment heading
   perturbation, a mid-segment displacement, or a post-hoc spline? What discrete branching
   strategies exist?
4. **Phase termination and the area budget.** V1 grew roads "until we have lots with that area";
   V2 grows "main roads until a large lot is created". What is *large*, and how is the global target
   area derived from the building manifest (a packing factor? a per-district density)?
5. **District type selection** from "the remaining buildings" — greedy best-fit? weighted random over
   eligible types? How are required district types (exactly one castle, one market) guaranteed?
6. **Landmark/large-building catalogue**: what counts as a landmark, what footprints they have
   (the grey star and cruciform silhouettes are clearly templated), and how "groups of buildings
   forming a complex" would be specified.
7. **Suburb ribbon rules**: spur length distribution, spacing between spurs, building spacing and
   setback along the spur, and when a spur terminates.
8. **The "gaps" inset value**, and whether it is absolute or a fraction of the building's size.
9. **Wall derivation**: what polyline the wall follows, tower spacing/scaling, gate placement, and
   the river-split rule.
10. **Farmland partition algorithm** — genuinely unstated; and how field crop type and row direction
    are assigned. Same for forest density fields and tree/hedgerow placement.
11. **Harbour fitting**: how a waterfront district chooses its stretch of coast, how the basin is cut,
    pier count/length/spacing, and how the breakwater path is generated.
12. **Height map specifics**: noise type (Perlin vs simplex — he names both and commits to neither),
    octaves/lacunarity/amplitude, `heightMapWidth` value, whether it is stored or seed-derived in the
    shipped product, and how water bodies were eventually reconciled with it (the stated gap was
    never reported as closed in this slice).
13. **Straight-skeleton robustness**: degeneracy handling, and the exact gable post-process.
14. **Whether the faceted shading visible on 2-D ground in June 2025 is terrain hillshading** or a
    decorative texture (T-15).
15. **Family-tree layout algorithm** and its expansion budget (T-02).
16. **Sub-location assignment** in the simulation: capacity, matcher semantics, and how "32 people
    currently here" is computed and indexed at 50 000-person scale (T-08).
17. **Serialization format** of a settlement file, and how the ~10 %/~30 % component fractions were
    measured (T-01/T-05).
18. **Which browsers/build targets** caused the production slowdown, and what the actual cost was
    (the post is truncated before the answer — T-04).

## Critic-2 addendum (FTG seat, 2026-09-25)

Rulings from `research/findings/_critic-ftg.md` (§1 F16, F19–F21, F26; §2).

1. **T-14 / §3 "market stalls … the only saturated colour on the map" — reconciled, not the whole story.** The
   coloured conical tents in `106664214/09.png` (opened by this seat: a grey hipped pavilion with small red/blue/green
   pyramids beside it) are market stalls, as read. But the guide states a second source of saturated squares:
   "Shanty town districts create dense areas of tents, with dirt backgrounds, dirt roads, and fire pits"
   (`createSettlement__districts.md` L116), `tentPlacement: INDIVIDUALLY_PLACED`, replacing lower-class residential
   districts only when the average lifestyle is squalid or poor and only after the first half of the settlement
   (`ftg-posts-a.md` §2.13 saw them in 2023). A designer needs both glyph sources; "only saturated colour" is true of
   this slice's images because none contains a shanty town.
2. **T-10 snapping distance "11 world units":** no source states the unit (the guide names the control but gives no
   unit; `ftg-docs-params.md` §4.5's "metres" is an inference). **T-11 river width 125:** metres — "Controls the width of
   the river (in meters)" (`createSettlement__water.md` L205).
3. **T-04 "static files, no server":** correct for the front-end; generation is a server call that took ≈ 300 s for a
   CITY with the client idle (`ftg-payload-visual.md` §1), and the settlement is a server-side protobuf
   (`ftg-posts-c.md` §2.21) — the split in T-04's own note is the right one.
4. **T-33 GeoJSON without districts** is still the case in the 2026-09 guide (`useSettlements__export.md` L23:
   "backgrounds, edges, buildings, and their outlines").
5. **T-31 custom calendar** supersedes `ftg-posts-a.md` §2.17's hard-coded 7-day week (version ladder, not a
   contradiction); the captured request is 24 h × 7 days, rest days [6,7] (payload field 22.5 decodes to the same).
6. **§6 open questions the guide answers** (`ftg-docs-params.md`): 2 road validity → "roads aren't too close together /
   roads don't end in bodies of water", snap to intersection (`createSettlement__algorithm.md` L89–92; thresholds
   still unstated); 3 wiggliness = `maxMainRoadAngle`/`maxNormalRoadAngle` (a hard 15° per-vertex cap, CONFIRMED on the
   payload), branching strategy = `branchType` `Continue` / `Curve around origin`; 4 phase termination = per-stage
   `proportionOfBuildings` (0.2 / 0.5 / suburb remainder) with `minDistrictArea` as a merge floor; 5 district type =
   "based on criteria like the remaining unplaced buildings, and what the lot is next to", pools via `poolTags`;
   7 suburb rules = offshoot section length 1–2 segments, branch probabilities 0.75, `spokePriorityChange` 1 with the
   stated priority-queue formula, perimeter spokes; 10 farmland = main roads extended to the border, outside lots split
   to a count, similar features clustered; 11 harbour = a template shape "carved out of a waterfront district area",
   piers are wire edge type 12 (12 × 75.6 m in Galeiaward); 12 height maps = still shelved (2026 comments: "Mountains
   aren't properly supported yet"); 13 roofs = computed at render, "not stored in the server"; 16 sub-locations = per
   sub-location limits (leisure, temporary residential, guest worker, studying); 17 serialisation = protobuf with
   zig-zag `sint32` positions centred on (0,0). Still open: 1 (the exact split geometry — see `ftg-posts-c.md`
   §2.1–2.2 for the two rewrites), 6, 8, 9, 14, 15, 18.
7. **T-18 corollary now measurable:** in the September 2026 payload ordinary buildings are ≈ 10 × 10 m (median footprint
   103 m²), i.e. the post-fix "real world" sizes; `ftg-payload-visual.md`'s 20 × 20 m figure was a decoding error.
