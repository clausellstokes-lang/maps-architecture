# Blocks — lane amendments-c/amend-pipeline-plots (seat B `pipeline-plots`; opus standing in for the Fable seat)

Text before the first "=== " line is ignored by the assembler. Seat B owns §4.7's REPLACE (route §C.2): the block below is
the live §4.7 (document sha256 1c23190f…) with items 42, 43 and 44 applied and the other seats' phrases folded — item 50's
Entrances phrase, item 63's two pointers, item 70's `cluster` row and tents-row note, item 71's two pointers, item 20 (h)'s
wording — plus the step-6 ruling the retrovalidation register (RV-pipeline-gen-7) asked of this editor (J-A67.49). Seat D's
item-63 paragraph and seat T's item-68/70/71/72 paragraphs are their own APPEND TO SECTION blocks on §4.7, applied after
this REPLACE (file name order). Report: docs/validation/amendments-c/amend-pipeline-plots.md.

=== REPLACE ### 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b Placement · S11 Site plans and footprints — the plot model ===
### 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b Placement · S11 Site plans and footprints — the plot model

**S9 Corridors (L2).** `corridorUnion(l1Faces)` (§3.7), the single kerb function, commits exactly the kerbs S8 cut
against — half-corridor strips, junction wedges and **built blocks**. It runs once per district and once for the
hinterland's faces; a wall strip's L2 is its half-corridor strips along the arterials at its gates (and along the
intervallum, where there is one) and one built block, the strip block (§4.8). The main plaza is S3's reservation, typed
as a `square` face; other squares come from S7b claims sized from population (O7); gate plazas and forecourts from S7
(§4.8). Streets exist as geometry from here on; "negative-space streets" is purely a style, and §8's figure-ground
contract fills blocks in a ground tone.

**S10a Block allocation and field pass 2 (eager, town-wide; LC-2, FTG-1).** Each district's `Allocation` (S7b) is
distributed to its blocks in three declared steps, from the district's `alloc.block` stream (keyed from the district's
lineage; §2.5, §6.1), blocks by score then id: (i) the **field-driving classes** — noxious trades, middens, prisons and
institutions below a block — first, by scores that need no prosperity (downstream, downwind, extramural, frontage class,
adjacency); (ii) **field pass 2** adds their kernels to pass 1 (§4.5); (iii) every other class — households by band,
ordinary workplaces, shops — by capacity per band under pass 2, sub-districts receiving contiguous block groups sized to
their clusters (COV-FTG-E02). **The block score is S10b's rule score at block granularity (item 16):** a class's relation
rows and supply edges (§10.2) are evaluated against the block's context — its frontage classes, the distance rasters at
its centroid, the classes already allocated to it and to the other blocks of the town — so a brewery's block scores its distance
to the blocks that hold its maltings and granary and a tannery's block its downstream, downwind and extramural rows before
any plot exists; hard rows filter blocks, soft rows and supply distances weight them. The result is persisted as one
block-level `Allocation` per block. From here on every district's S10, S10b, S11 and S12b, and the hinterland unit's, is a
pure function of these records and its own sub-stream, writing only inside its own faces (§4.1), so the town's content
does not depend on derivation order, viewer order or worker count.

**S10 Plots (L3) — frontage-first with the granularity law (O5 / O18), per block.**
**(0) Shared-edge bands, eager (J-I9).** A block whose `interior` is `wall_strip` (§4.8) gets no plots. Its L3 content is
built **eagerly on the generation worker, after S10a and before the pool's freeze**, in one step that covers the strip
blocks on both sides of each trace at once — the band's cross edges split the trace, which the two sides' districts share,
so no district overlay may write it (§3.3 pool steps 1 and 3; cost §12.4). The batch commits, by `bandUnion` (§3.7), the
enceinte's half-band on each side of the wall edge; the rest of each strip — the inner setback, or the outer setback and
glacis, or the berm up to a moat — as typed unbuildable residue (`setback`, `glacis`; `ditch` in place of `glacis` on the
town side of an `on_enceinte` bailey whose castle template row asks for a dry ditch, §4.8); and each side's parts of every
tower and gatehouse on the trace. The same eager batch lays §4.5's **margin bands** along the settlement perimeter and
along any reservation boundary two districts share. The enceinte's `band` and `glacis` (its `ditch` parts included) and
each tower's and gate's `footprint` are the unions of these parts across the strip blocks (§2.7). S9 has already committed
the strip's corridors and nothing after S10 writes L1 or L2, so no batch ever clears or splits these faces. The step ends
by rebuilding the L3 static partitions it touched, so a pooled plot line finds the band's inner edge through the index
(§3.3 pool step 1). A regeneration re-runs this step one-sided for its own scope (§7.3 item 2). A castle's curtain band is
built the same way inside the bailey's blocks. The hinterland unit's S10 builds §4.9's hinterland recipe — furlongs,
outside lots, driveways, trails, woods and edge orchards — instead of frontage-first plots.

For every other built block: (1) classify each kerb edge as a frontage by way class; (2) read the block's context
(district kind, prosperity value and recorded band, density, growth stage) → the **granularity table** gives target
frontage-width and depth bands, a join maximum and a vacancy-run share, interpolated along the prosperity value and scaled
by the rung's `RungProfile.granularity` (frontage × and depth × on every band; the rich band's join maximum
+ `joinMaxDelta`; §1.1, AM-4) — `GranularityLaw.bands` takes the rung (§14). The band rows are §4.5's band set, whose
default cuts reproduce the references' wealth classes (item 27); every re-derivation other than a rung-3 event of §4.11's
ladder reads the block's **manifested band** — the field band raised to its plots' geometry floor by §4.11's block-level
reading (item 31; J-A31.43) — for every geometry row, and the field band for occupancy, condition and labels; the band row also carries the target share of
interior and hidden plots that S8's deep-interior rule and this stage's cut meet together (§4.6, item 30):

| band (default rows; all calibratable, J-T (§13.7)) | frontage width (m) | depth (m) | join max | vacancy-run share of frontage | reference anchors |
|---|---|---|---|---|---|
| poor / dense | 4–6 (log-normal, CV 0.25) | 12–20 | 1 | 0.03 | NG 95–99 % attached, party walls 39–43 % of perimeter |
| modest | 6–9 | 18–30 | 2 | 0.06 | FTG quad side median 10.3 m, footprint median 103 m² |
| prosperous | 9–14 | 25–40 | 3 | 0.08 | MFCG ≈ 18.6 lots per block |
| rich | 14–25 (joined) | 30–60 | 5 | 0.05 | "fewer, bigger buildings, bigger yards and courts" (owner) |
| institution / assigned | by requirement class | by requirement | whole block above a share threshold | — | FTG landmark-first |

(The block's `interior` — court, back lane, through-alley or rear plots — was chosen by S8, §4.6.) (3) **Claims first:**
institutions and assignments *smaller than a block* `claimSubFace` (which may span several faces, §3.4) the contiguous area
and frontage class their requirement demands — the requirement is the designation template's size budget (S11, item 19) —
before ordinary plots are cut (larger ones are S7b reservations already); claims-first covers every claim that exists at
generation: the roster's institutions and requirement classes, and every assignment or dossier element present in the
recipe when the town is generated (they enter S2's demand, so a brand-new map holds them from the start; §7.7, item 22 (d)).
An assignment or dossier element that arrives after the city is built is placed by S10b's solver and applied by S11's
mutation instead (§7.7). (4) **Per-frontage regions
(GEO-24; J-P13):** the block (minus claims and the S8 interior) is partitioned into one region per frontage run by its
straight skeleton, each region's depth capped by the skeleton height and the band depth — if the skeleton is downgraded
(F-SKELETON), a reflex pre-cut partition (a perpendicular cut from every reflex vertex, built exactly from `sideRuns` and
`splitFace`) is used instead; the validated skeleton arcs enter the arena through `insertChain` (§3.8) — and plots are laid
as strips perpendicular to each region's frontage, widths drawn from the band, depth = min(band depth, region depth); side
lines are bent lot cuts perpendicular to the frontage arriving at the region's rear line (the creator's stated use of the
primitive for buildings, `watabou-extra-a.md` §2.1); strips never leave their region, so reflex corners, notches round
cul-de-sacs and the inside of tight curves cannot produce overlapping or hourglass plots (property test: §13.2).
(5) **Corners and seams:** the corner plot takes the higher-class frontage and the shorter frontage's depth; the wedge left
between two regions becomes a corner plot when it meets the minimum width and angle, else a declared `wedge` class
(bounded < 0.5 %) or residue. (6) The residue is typed: `court` (from the S8 interior), `yard` (assigned to the adjacent
plot when its area < 1.5 × the plot), `green`, `vacant`, `shore` (the shore setback). (7) **Joins and splits, one law:**
strips are cut to the band's lower end, then a merge operator joins k adjacent plots (along a frontage, or back to back
keeping a frontage) up to the band's upper end, keeping `members`; poor bands stay at the lower end; both directions read
the same context vector — one code path (O18 g). **Orderings (item 31):** a join takes vacant or same-owner neighbours
first, then a rear plot into its front plot, then the frontage neighbour with the shorter frontage; a split takes the widest
frontage first, then the deepest yard. A designation's size budget (S11's template) is what a join is asked for — by this
stage at generation, by S10b's solver for a later placement (a JOIN request) and by S11's mutator when a designation
outgrows its plot; a larger class placed by S10b's class mix asks this law for its join (item 71). Across epochs the law runs in its incremental form — a due block re-cut with its neighbours fixed, under
§4.11's ladder, churn cap and geometry floor (item 31) — and a plot vacated by decline merges into a neighbour's garden or
a field by the same operator (`plotToGarden`, `amalgamate`; §4.11, item 8). (8) **Vacancy runs (COV-VG-VN-170):** runs of
frontage totalling the band's vacancy share, each at least one band frontage long, are left unbuilt from the
`plot.vacancy` stream — typed `vacant`, or a `garden` yard joined to the neighbour — so no built block is necessarily fully
ringed. (9) **Alleys:** slivers narrower than the minimum plot width that connect two ways become `alley` L3 faces, not
spines (GEO-25); where the frontage is continuous, §4.6's rule may reserve a covered **passage** under the front plot's
building instead of an open alley (item 30; the passage face is §2.5's).
(10) Every plot gets its `ContextVector`, its `DerivationRecord` and access edges (100 %, O5 a): every plot is built with an
access edge. The frontage-less lots of NG 1.2.2 — about 42 % of its lot leaves, its courts by construction rather than
by error — have no counterpart here outside the deep-interior rule (§4.6), which chooses a deep block's interior — a
court, a back lane, a through-alley or rear plots, and, with item 30's reach, its hidden plots — by band shares (J-P15,
J-A42.41). **Party walls** are shared L3 edges carrying the `party_wall` role in row classes, one edge per wall
(§2.2). **Unbuildable bands:** the shore setback (§4.2 S1 (8)), the wall strips — the band, the inner setback, the outer
setback and glacis (MFP-9; step (0)) — and reservations are never plotted; ribbon plots begin beyond the outer wall strip.
**Exact capacity check (FTG-2):** after the last block of a stage, plots per class × band are compared with the stage
quota; a shortfall goes to S10b's reconcile and the report (F-BUDGET-STAGE).

**S10b Placement (O7; per district; the allocation honoured) — the one placement solver (item 16).** Each block's allocated
classes are placed onto its plots by the **placement solver**, the one solver every path that puts a use on a plot calls:
this stage at generation, the hinterland unit's S10b on its outside plots, every `assign` event (§7.7), a dossier event
and a positive placement (§7.7, items 20 and 22) and the relocation of a use across epochs (§4.11, item 17). Its inputs are
data: the **relation templates** and **supply edges** of the class rows and the neighbourhood kinds (§10.2), the
per-assignment overrides of `PlacementCriteria` (§7.7) and the plot's `ContextVector` (§2.5).
* **Hard rows filter, soft rows score.** A relation row marked `hard` excludes every plot that fails it; the candidates
  that pass are scored `Σ_rows w_r · s_r(plot) + Σ_edges w_e · s_e(plot)`, each soft row's satisfaction `s_r ∈ [0, 1]` read
  from the context vector — a distance row decays by its `falloff` between `withinM` and `beyondM`; a `sameStreet` row is
  1 on the frontage way of the named class's nearest placed member, 0 otherwise; a `clustered` row rises with the number
  of the class's members within its radius; `band` and `exposure` rows compare the plot's band and `Plot.exposure` with the
  row's values (item 30) — and each supply edge's `s_e` decaying from 1 at the plot to 0 at the edge's `maxDistanceM` along
  its **mode** (below). Capacity rows (`plotArea`, `plotShape`, `frontageM`) read the template's size budget (S11): a hard
  capacity row a plot cannot meet is what a JOIN request answers (S10 (7)). Candidates are filled in descending score with
  capacity accounting, ties by plot id; households take residential plots of their band ± drift. The default rows are the
  references' own placement rules — noxious trades downstream and extramural (`upstream` high, outside the enceinte),
  mills and water trades on water, inns and the market hall at tier-1 junctions or gates (the market squares themselves are
  S3's and S7b's, item 24), religious precincts and faction turf as attractors, warehouses at the harbour, frontage class
  and area fit — and the rows the references lack (the supply edges, the upwind and high-ground rows, a trade clustering on
  one street) are soft rows whose weights the table's `placement.extensionWeight` cell scales (the default is 1; the parity
  presets that §13.6's side-by-sides run set it to 0; item 23).
* **Supply distances by mode (item 16 (b)).** `street` distance comes from the class distance rasters (16 m, one linear
  distance transform per class, below) as the land distance × the rung's detour factor (a table cell, default 1.3,
  calibrated at M1 against the way-graph Dijkstra on B-CITY; *pre-decided fallback:* the factor refitted per rung); `river`
  and `sea` distance is ∞ unless plot and provider both lie within the shore setback of one navigable water body (§4.2 S1
  (8)), else the distance along that body's bank chain; `road` distance is the `street` distance to the gate through which
  the provider is reached plus the provider's distance beyond it. A gate provides the `import` resources its bearing's
  trade row lists and the harbour those that arrive by sea, so warehouses and inns fall to the harbour and the gates by the
  same rows. Inside the pooled S10b a provider is **a block whose S10a allocation holds a producing class** (eager and
  town-wide, so the laziness contract of §4.1 holds) or a placed plot of this district; a post-build request measures to
  the placed plots themselves over the L1 way graph (one multi-source Dijkstra per provider class; budget §12.6). A hard
  supply edge with no provider inside `maxDistanceM` fails the plot; S2 has already demanded the producer (§4.2 S2's need
  propagation), so the failure is a siting shortfall, never a missing class.
* **Live-in (MFP-7):** craft and shop rows default to `liveIn`; a live-in household is sited first at its workplace and
  recorded as the building's `dwelling`, so the arterial frontages are shop-houses, not workplace strips, and
  residential-only blocks stay the exception (its block-level acceptance is §13.5's). **Outside classes, and under §4.9's
  `fill` farm mode the farm households,** are placed by the hinterland unit's own S10b (under `perimeter` and `rivers` the
  farm households are town households, placed by their districts' S10b) — the same solver over the outside plots its S10
  built at S12a's sites, whose seeding scores are the outside classes' relation rows (§4.9; FTG-7).
* **Requests after the city is built** — an assignment, a dossier element, a positive placement, a relocation — take the
  **least-disruption order**: vacant plots and vacancy runs first, then under-used plots (a yard part or an outbuilding
  the template can take), then plots whose present use can move within the same district (the displaced use re-placed by
  this solver with one further level of displacement at most — §7.7's `DisruptionBudgetRow.displacementDepth`,
  default 1 — never a cascade), then a JOIN with
  a neighbour by S10 (7)'s orderings. A rejected site (§7.7's rejection record, item 20) is excluded while its rejection
  holds, a locked plot always, and a pinned assignment's plot is fixed (§7.7's precedence). Among the candidates that pass
  the hard rows the order is lexicographic — disruption cost (§7.7's `DisruptionBudgetRow.weights` for the
  request's kind: per displaced use, per join, per subtracted part and per vacated plot), then score descending, then plot id — so the town changes as little as the rules allow. Every displacement, join
  and vacated plot is a lifecycle event of the causing edit (§2.8, §7.4), and the placed plot's buildings then mutate to
  the designation by S11's operator (item 18).
* **Concealed institutions (item 63).** A concealed institution is placed as one item with its front by the concealment
  rule of this section's *Concealed institutions* paragraph (item 63).
* **Reconcile and infeasibility (O18 f).** At generation a bounded **plan–fit–reconcile** loop (≤ 3 rounds) adjusts
  *inside the district's allocation* where a class finds no plot (one more JOIN; a class demoted within its band; surplus
  capacity typed as yards, greens or vacant plots); it never reaches into another district — moving demand between districts
  happens only in S7b's reconcile — and what it cannot place goes to F-SITING's ladder (§5.2), whose rungs this stage
  computes as: the reconcile above; then every **soft** row's weight set to 0 for the item; then the manifest reduced,
  lowest-priority classes first and never a dossier-backed item (item 20) — the report naming, for every unplaced item,
  the hard rows that blocked it and its **closest options** (the plots in order of the number of hard rows they fail,
  then score descending, then plot id — each with the rows it fails; J-A20.42). **A hard row is never relaxed
  silently:** a post-build request that no plot satisfies returns
  the same closest options as an F-EDIT action (§5.2) — choose one, relax a named row for this item, or withdraw — except a
  `dossier` request, which places at its first closest option with the hard rows it fails reported (§7.7's precedence,
  J-A20.71) — so placement never gives up silently (O18 f; FTG V1 "would regularly give up").
* *Mechanism (budget: §12.4):* context-vector distances come from per-feature-class distance rasters (16 m; one linear
  distance transform per class) computed once per model, and the provider rasters of the producing classes from S10a's
  block allocation the same way; S10b is a top-k over candidates pre-filtered by district affinity and requirement class,
  with incremental capacity. Both entry points exist, read from `recipe.entryMode` (§2.9): content-first (default) and
  layout-first (thumbnails, then populate). People are derived lazily from the household's key and pinned only by an
  explicit edit (§10.3).

```ts
interface PlacementItem { cls: string /* roster class id */; band?: string; designation?: Designation /* S11 */; count?: number /* generation: the block's allocation row */;
  id?: Id /* a Use, an assignment member or a dossier element being placed or re-placed */; criteria?: PlacementCriteria /* §7.7's per-assignment overrides of the class's relation rows */;
  pinnedTo?: Id /* a positive placement (§7.7, item 20 (g)) */ }
interface PlacementRequest { kind: 'generation'|'assignment'|'dossier'|'positive'|'relocation'; items: PlacementItem[]; scope: Scope /* the blocks or district the solver may use (§14) */;
  fixed: Id[] /* placed members kept (§7.7) */; exclude: Id[] /* locked entities */; rejected: Id[] /* plots under a live rejection (§7.7) */ }
interface PlacementResult { placed: { item: number; plot: Id; score: number; joined?: Id[]; displaced?: { use: Id; to: Id | null }[] }[];
  unplaced: { item: number; blockedBy: string[] /* relation-row and supply-edge keys */; closest: { plot: Id; fails: string[]; score: number }[] /* the closest options in S10b's order: fewest hard rows failed, then score, then plot id */ }[] }
interface PlacementSolver { place(req: PlacementRequest, ctx: StageContext, k: Kernel): KernelResult<PlacementResult> }   // one implementation, registered by name (§4.12, §14); its draws are the `siting` concern (§6.1)
```

**S11 Site plans and footprints (L4; O17; one batch per block) — the designation template and the designation mutator.** One
rule evaluation per plot, no search: the **designation template** — one per roster class (§10.2's `template` rows; item
19), keyed by band with its continuous columns interpolated along the plot's prosperity value and its discrete columns
switching at the band cut (§4.5) — gives the size budget (plot area, footprint area, floors), the structures (the slot list:
main building, workshop, forge, yard, court, stables, store, journeymen's rooms … by role and count), the arrangement,
coverage, setbacks, separation (party wall / slot / passage), the front-line jitter (an area-scaled recession of the main
slot's front, *Front-line jitter* below; item 43), the frontage treatment of the main slot (none, lean-to stall, stall, shopfront, arcaded front, gate, wall), the
yard partition, the **boundary treatments** and the **specialisation** — the designation's variant in this band, with its
room programme (item 28, §2.6): a farrier or nail-maker in a lean-to forge, a general smithy with a yard, and a master
armourer or cutler with a storefront, a court and journeymen's rooms are three rows of one smith template (our own rows).
Density is a modifier column on coverage and separation. Geometry columns read the plot's manifested band
(§4.11's plot-level read); the specialisation and the programme read the field band, so a poor smith in a once-rich
shell is a poor smith in a big house
(item 31). **Every path that creates or changes a building reads this one table** — this stage at generation, the mutator
below on every designation change, S10b's relocation (§4.11) and every assignment (§7.7), whose drift bounds bound the
mutator's adapt and add steps relative to the template. Two smiths a few streets apart differ by degree along the value,
never by switch; the default rows reproduce the references' banding — FTG's lifestyle-banded building pools and MFCG's
ward-type sizes and spacing (§4.5's band set, item 27) — and the interpolation between rows is our extension. J-A19.41
holds within a class; the class itself is S10b's class-mix draw (item 71). A front's building reads the front's template;
its concealed function adds only concealed rooms, a concealed door and a link down (item 63, *Concealed institutions*,
below). **Materials
are not template columns** — the material rule, texture and colour only, is §2.6's (J-A19.42).
The arrangement rows the template chooses among:

| arrangement | geometry | boundary treatment (default rows) | where |
|---|---|---|---|
| row | one or more footprints end to end along the frontage; **footprint = plot ∩ the frontage band of the row depth** (a boolean intersection, GEO-26; J-P14), the band set back by the plot's front-line jitter `h` (*Front-line jitter* below), so every party wall is the plot side line and, the block being one L4 batch, one shared edge even on bent or curved frontages; stored as one `quad` wing with its four corners recorded (`BaseWing.corners`; stepped quads on a slope, each with its own; J-P31, J-P39) and handed to `outline()` as fixed input (§2.6); depth from the coverage; rear yard | frontage none (the house is the frontage); rear wall (dense) or fence | dense and poor bands, shops, workshops (NG 95–99 % attached; FTG's warehouse rows) |
| set-back compound | hall or house set back behind a forecourt; **2–5 disjoint outbuildings** (stables, workshop, chapel, barn, brewhouse) placed by a small greedy packer on the plot's OBB grid around a court | **enclosure wall** (rich, prosperous; ours — NG 1.2.2 draws no enclosure — an `extension` the parity presets set to the fence, §7.6; J-A44.41) or fence, with a **gate on the access edge** | manors, inns, temples, guildhalls, farmsteads (FTG's farmstead with a driveway) |
| detached | one OBB-aligned footprint at the frontage with side yards and a path to the access edge | frontage fence, railing (rich) or hedge, with a gate; side hedges | prosperous / semi-rural bands, sparingly (R4/R5) |
| hovel | one small footprint on the frontage of a plot that is mostly bare yard | none or a hedge | squalid bands, outskirts |
| tents | 1–3 small round or rectangular footprints (6–15 m², class `tent`, roof `tent`) with a fire-pit pin, dirt surface | none | squalid and shanty districts after the first half of the stages (COV-FTG-E07) — FTG's row, which the parity presets keep; how the default preset shares these districts with the cluster row is item 70's (*Informal clusters*, below) |
| cluster | many small structures — shacks, tents or lean-to shelters by the cluster rows (§10.2) — packed across the plot, not in frontage rows, each with its own door on a footpath web of the plot's yard that reaches one of its access edges; the packing, the fire gap and the households per structure are *Informal clusters* (below; item 70) | none | informal plots of the lowest bands with no standing building, where *Informal clusters* admits them (item 70) |
| institution | the claim's own template (§2.6 footprint templates, the axis-locked composer, the `ring` partition recipe for a cloister) | wall with a gatehouse gap; churchyard wall | claims |
| vacant run | no footprint | wall (dense bands) or fence | vacancy runs (S10 (8)) |

Treatments are stored as §2.5's `PlotBound` records on the plot edges; they are drawn at district LOD as a stroke distinct
from buildings (§8.2's treatment row), **walled or fenced frontage counts toward O17 (d)'s streetwall continuity**, and walls and fences
export to VTT and GeoJSON (VIS-8).

**Front-line jitter — an area-scaled recession (item 43).** Each plot's main slot may stand back from its frontage by a
recession `h`, evaluated once per plot and stored, rounded to the centimetre, as `SitePlan.frontJitterCm` (§2.5):
`h = u · min(√(plot area) / 3, jitter.maxM)`, `u` uniform in [0, 1) — one draw of the plot's `siteplan` stream (§6.1;
no new concern) — and `h` kept only when `h ≥ jitter.minM`, else 0. The law's shape — area-scaled, uniform, floored — is
the emulated default (provenance `ref:MFCG 12710731 front recession (code)`, P9); its construction and its values are
ours. Under the default values below, the area term binds only on plots under ≈ 20 m², so the default recession is
in effect uniform up to the band's maximum. *Construction:* `h` is taken square to the frontage, on the frontage band's normal — a row
footprint is `plot ∩` the frontage band between the offsets `h` and `h +` the row depth, and a detached, hovel or
compound main slot's front stands `h` behind the template's setback — so the front stays parallel to a bent or curved
frontage, every party wall stays the plot side line (J-P14) and the strip in front of the recession is the plot's
`forecourt` yard part (§2.5). Where the plot's depth cannot hold `h` in front of a footprint that meets the class's
floors in width and area (§3.10), `h` falls to the largest value that can, and to 0 when that is below `jitter.minM`.
*Values:* `jitter.maxM` and `jitter.minM` are designation-template columns (§10.2), `jitter.maxM` interpolated along the
prosperity value like coverage — defaults ours (`own`): `jitter.maxM` 0.4 m (poor / dense), 0.7 m (modest), 1.0 m
(prosperous), 1.5 m (rich); `jitter.minM` 0.3 m for all bands — each of these band cells marked
`extension: { over: 'MFCG', mode: 'option' }` over the emulated law, whose values the `MFCG` parity preset reads through
§7.6's per-preset values: `jitter.maxM` 4.8 m and `jitter.minM` 2 m (J-A43.41). The institution, tents and cluster rows
carry `jitter.maxM` 0, unmarked, so no preset changes it and their plots draw no recession (a claim's building, a camp's
tents and a cluster's structures have no street front to recede); any row whose `jitter.maxM` lies below its
`jitter.minM` draws none. *Floor:* a front nearer its frontage than `attractCm` (26 cm, §3.2) would be shared with the
frontage by §3.6's stretch attraction and the recession would collapse to 0, so `jitter.minM` is bounded below by
`attractCm` + 1 cm — the column's declared range (§7.6), against which an `editTable` or `editPreset` setting it lower is
refused, naming the bound (F-EDIT, §5.2) — and the recessions drawn are {0} ∪ [`jitter.minM`, `jitter.maxM`]
(J-A43.42). *Changes:* a kept main slot keeps its stored recession through a designation change; an added
main slot evaluates `h` at the target template's columns with its draw from the mutation's `siteplan.mutate` stream, as
every added part does (the mutator's step 2, below); Regenerate (keep settings) re-evaluates the same draw, so it
reproduces the same fronts. The bars: §13.2 (item 43).

The row arrangement's footprints are made here by the boolean above and passed to `BuildingGenerator.outline()` as fixed
`quad` wings, which it returns with heights and roofs and never re-fits (§2.6); every other arrangement's footprints come
from `outline()` itself — rectangles and L / T compositions as `rect` wings with per-wing ridge axes (VIS-10), footprint
templates and the axis-locked composer for institutions (COV-FTG-F16, COV-MFCG-G05) — each shaped inside its slot's
working hint (`SlotPlan.hint`, §2.5, which S11 never stores). **The first carry (J-P42).** S11 inserts each footprint's
rings through every wing vertex on the wings' union boundary and, when the block's batch has committed, carries every wing
onto the committed face by §2.6's wing-carrying rule — from the ring it inserted to the ring the kernel committed
(attraction may have moved a vertex up to `attractCm`, §3.6), each boundary run re-read from the committed rings, a rect
whose sides now carry other vertices recording its `corners` — so every stored wing's boundary runs are its footprint's
rings vertex for vertex and the union of a building's wings is its footprint face exactly (§2.6's check).
**Scale (COV-FTG-F09):** footprint targets are multiplied by the district's `buildingScale` (0.5–2, continuous; FTG's
"smaller / bigger" as a district edit or an `Adjust` regeneration). **Heights** from the class tables on every wing (floors
× storey height + roof rise by pitch; eave and ridge per wing; tower heights for keeps and church towers), with the
**ground datum** `baseCm` from the terrain by §2.6's `deriveBase` (FTG-13; J-P19) — carried although the top-down view never
shows them.
**Entrances:** the building's entrance set by §2.6's rules — the main entrance on the access edge where §2.6's rule 1
places it (the owner's rule, item 29), side, rear and yard doors and the basement decision as §2.6 states — re-derived
whenever the designation mutates (below); roof kind by class per wing (the style sheet chooses the construction, §8.2);
**materials** from `MaterialRow` (COV-FTG-F20; §2.6); **description, opening
hours and sub-locations** from the class table and the naming engine (COV-FTG-F21, FTG-11); yards partitioned into typed
parts.

**The designation mutator (item 18).** A change of designation — an `assign` or `unassign`, a `setAttr` on a plot's use or
class, a relocated use (§4.11), a dossier re-designation (§7.7) — never replaces the plot's buildings with a fresh roll.
`mutate(plot, to)` derives the new design from the present one by a recorded delta toward the target template, evaluated
at the plot's current prosperity (item 19 (c)):
1. **Match.** The present design's parts — slots by `BuildingSlot.role`, wings, storeys, roofs, entrances, yard parts,
   treatments, and a stored composition's or plan's rings (§2.6) — are matched to the target template's structures by role
   through a **compatibility table** (a house and a hall, a shop's storefront and a house front, a stable and a store, a
   workshop and a forge … our own rows, editable): each part is **kept** (it fits the target's role within the template's
   tolerance on size), **adapted** (kept with an attribute change — a storey added within the floors band, a wing extended
   within the size budget, a frontage treatment or a roof kind changed), **converted** (kept as another role the table
   allows) or **subtracted** (no role in the target and no protection); each required structure without a match is
   **added**.
2. **Order and draws.** Subtract, convert, adapt, then add, so the added parts pack around the kept ones on the plot's OBB
   grid by the compound packer (above) from the plot's `siteplan.mutate` stream (§6.1: a geometry concern keyed by the
   plot's lineage, so the same change from the same state draws the same numbers on every host, and a New random of the
   plot changes nothing past); added parts are minted from the causing event's `seq` and ordinal (§6.3), kept parts keep
   their addresses, subtracted parts become tombstones with the event's `seq` (§2.8). The old house stays recognisable
   inside the new workshop.
3. **Land.** When the target's size budget exceeds the plot, the mutator asks S10b's solver for a JOIN with a neighbour by
   S10 (7)'s orderings, the neighbour's use relocated by the same solver; when no join is allowed — a locked neighbour, a
   hard row — the template's `underSize` column decides: the compact rows, or a refusal reported with the blocking rule.
4. **Protection.** A locked part or path is never subtracted, converted or adapted (fate *kept*, §7.3 item 4); a
   user-edited attribute is kept (implicitly pinned, §7.2); an added part that would overlap a kept part is placed elsewhere
   on the plot or reported; the entrance set and the basement decision are re-derived by §2.6's rules on the result (item
   29), and the elaboration cache of the plan rung is marked stale (item 28).
5. **Record and reversal.** The steps are one `MutationRecord`, persisted in the causing event beside its fates (§7.1, §7.4)
   and cited by the plot's lifecycle event; the event's undo record keeps the former parts. Reversing the change — a
   designation set back, an `unassign`, an `undo` — applies the **inverse** of the recorded steps when the plot's design is
   still the record's result (its leaf digest, §6.2), restoring the earlier design exactly; otherwise a fresh forward
   mutation toward the earlier template runs and is reported as such.
6. **Timing.** A host or user change decides and records the whole mutation at once; across epochs the evolution engine
   spreads the same steps — occupy if compatible, then adapt, then extend, and rebuild only what cannot be adapted — as
   recorded events (§4.11, item 18 (c)). How a recorded step is shown on the ground over the weeks it takes is §4.11's
   Works (item 67), which reads the steps and never re-decides them (J-A67.49).
7. **One path.** Generation is the mutation from the empty design: every structure an add, every draw from the plot's
   `siteplan` stream, so this stage's own batch and a later mutation are one code path (`@plat/plots`, §14); Regenerate
   (keep settings) and New random remain re-derivations (§7.1), and `rebuild` (§4.11) the whole replacement that a ruin or
   a redevelopment calls for (item 31's rung 3), never a designation change.

```ts
type Designation = { cls: BuildingClass; use: string /* the roster class id */; specialisation?: string /* the template's discrete row; absent: by band */; assignment?: Id }
interface MutationStep { op: 'keep'|'adapt'|'convert'|'add'|'subtract'; part: { kind: 'slot'|'wing'|'storey'|'roof'|'entrance'|'yard'|'bound'|'frontage'|'composition'|'plan'; id?: Id; role: string };
  from?: unknown; to?: unknown; rule: SliceRef /* the template or compatibility row read (§2.8) */ }
interface MutationRecord { plot: Id; from: Designation | null /* null: generation, from the empty design */; to: Designation; band: { field: string; manifested: string }; steps: MutationStep[];
  joined?: Id[]; displaced?: { use: Id; to: Id | null }[]; seq: number /* the causing event; 0 for the generation run */ }
interface DesignationMutator { mutate(plot: Id, to: Designation, cause: EditRef | RuleRef | 'generation', ctx: StageContext, k: Kernel): KernelResult<MutationRecord> }
// one implementation, registered by name (§4.12, §14); called by S11, by every assign, setAttr and dossier event (§7.7) and by §4.11's use step
```

**Furniture pins (COV-MFCG-I01, COV-FTG-J02, COV-FTG-J05; `pin.*` streams).** The main plaza always gets one centrepiece —
statue 0.6, fountain 0.3, market cross 0.1 by default weights (MFCG places one in every market square, 60 % statues) —
offset toward the plaza's longest edge for statues and for 30 % of fountains; each gate plaza gets a well, cross or trough
with probability 0.5; every block draws one **weighted decoration row** from a deck and applies it to its unused plots and
vacancy runs (wells, pumps, troughs, large trees); **singletons** — bandstand, statue, monument — are placed once per
district in an unused plot by a deck draw, campfires in squalid districts; **market stalls**, drawn as small tents, line each
market square's edge band and ring its market hall, by rank: the principal one per ≈ 150 m² of square (≤ 40), a
secondary one per ≈ 200 m² (≤ 20); a flanking principal market takes the main plaza's centrepiece rule and a secondary
market a centrepiece with probability 0.5 (our own rows, calibratable). What each band
draws — footprints, yards, treatments, pins, and the plot outline as an optional cadastral layer — is §8.5's.

**Markets and hidden plots in this stage (items 24 and 30; the rules are §4.2 S3 (12)'s, §4.5 S7b (3)'s and §4.6's).**
Every market square — the plaza when it carries the principal rank, a flanking principal market, each secondary claim —
takes the pins above by its rank; the market hall's `nearMarket` row (§10.2) binds it to the principal market by
default. A passage the block's reach names
(§4.6) is cut by S10 (9) as its `passage` face, and S11 gives the front building the wing that spans it; a hidden plot's
main entrance faces its access face — the court or the passage — as §2.6's entrance rules put a set-back building's on
the court that leads from its gate (item 29), so every plan roots at a door that opens onto the way its plot is reached
by.

**Vacant plots under decline (AM-8).** A plot whose last building is cleared or reused merges into a garden, orchard or
field by `plotToGarden`, or into its occupied neighbour by `amalgamate` (§4.11's ladders), through the merge operator of
S10 (7) with the neighbour's band; the band's vacancy-run share of S10 (8) is the design's deliberate vacancy: regrowth
never fills a run below its share, and decline's vacancies are counted apart from it.

**Households per building (item 28 (f); J-A28.46).** S10b places a residential plot's households — per residential slot
(a structure with `houses`, §10.2) of the plot's designation template row at least one household and at most the row's `households.built`, by band ±
drift, a plot's slots filled in its slot list's order, required slots first (the capacity accounting above; the
capacity itself cannot be read there, because the building and its wings do not exist before S11). A residential slot
the demand cannot fill is dropped from the plot's site plan, its ground typed as yard, never below its structure's least `count` where the structure is `required`; a residential plot whose required residential slots the demand cannot all fill is typed vacant by S10b's reconcile (above), its households placed on the next candidate — surplus capacity, never an empty residential
building; a residential slot on a workplace's or an institution's plot that is its main slot (a live-in class's among them) or within a `required` structure's least `count`, and that no household of its band or drift can fill, is neither dropped nor typed vacant — the workplace or institution and its use stand — and S11 builds it as a slot without `houses`, housing none, `Building.dwelling` absent, reported; its `BuildingSlot.unhoused` (§2.5) records that typing, written by every run of this fill and cleared by the designation mutator (above). S11,
which creates each building and its wings, writes each residential building's `Building.households` (a building S11 builds for a slot with `houses`; every other building's list is empty) from its slot's households in address order, clamped into [1, capacity], a locked or pinned household kept before the clamp drops any (§7.2; §2.6's capacity rule) — §2.6's one capacity function, the one item 31's `relet` (§4.11) and F-PLAN's never-omit
rule (§5.2) read, evaluated on the wings it has just made. A household the clamp leaves, or whose slot S11 builds no
residential building for, moves by §10.3's relocation (its address and its people's keys kept): after the district's
last S11 block batch, still inside the district's derivation (a pseudo-district's alike), the overflow households are
re-placed in address order by S10b's solver over the district's residential buildings that house fewer households
than their capacity — the household's band first, then the bands its drift admits; score descending, then building
address — each move reported, and a household no building of the district has room for is an unplaced item of
F-SITING (§5.2), reported with the capacities that refused it — except a household that fills the dossier's population (§7.7 item 2), which is never taken off the manifest: its housing is re-provided inside its district (item 20 (e); J-A20.72) by S10b's `dossier` request in the least-disruption order of a request after the city is built (above: vacant plots and vacancy runs first, then under-used plots, then a plot whose use can move, then a JOIN), its first closest option where no plot passes the hard rows (J-A20.42), and S11's operator builds there a residential slot of that plot's designation template (a structure with `houses`, §10.2) for it, within that building's capacity, in the same derivation or causing event — each such build and displacement reported, a hand edit's among its dry-run fates (§7.3 item 4). So the solver and the plan agree on how many households
a shell holds and no shell houses more than its capacity; the plan rung records the count among its inputs (§4.1). The
overflow pass runs inside every change §2.6's capacity rule lists — S11's operator building or changing a residential
shell (an epoch's new faces, a rung-3 re-cut, a designation mutation, item 18) among them — whenever the result's
capacity falls below its households, each move a lifecycle event of it (§2.8), as `relet` keeps to the capacity
(§4.11).
=== J-ROWS ===
| J-A42.41 | every plot built with an access edge and a deep block's interior chosen by S8's band shares (J-P15), kept over NG 1.2.2, whose frontage-less lot leaves (≈ 42 %) are its courts by construction — re-characterised, not a discard | §4.7 S10 (10), §4.6 |
| J-A43.41 | the front-line jitter as an area-scaled, uniform, floored recession — its form emulated from NG 1.2.2 as well as MFCG 12710731 (P9) — built square to the frontage, with our band values (`jitter.maxM` from 0.4 m, poor, to 1.5 m, rich; `jitter.minM` 0.3 m) as an `option` extension and the `MFCG` preset reading 4.8 m and 2 m | §4.7 S11, §10.2, §7.6 |
| J-A43.42 | `jitter.minM` bounded below by `attractCm` + 1 cm (default 0.3 m; a table or preset edit below the bound refused) over the item's 25 cm, because a front nearer its frontage is shared with it by stretch attraction; with that floor the poor row's cap is 0.4 m over the item's 0.3 m, so the row still recedes | §4.7 S11, §3.6 |
| J-A44.41 | the set-back compound's enclosure wall is ours — provenance `own`, an `extension` the parity presets set to the fence; NG 1.2.2 draws no enclosure (COV-NG-N27's claim corrected) | §4.7 S11, §2.5 |
| J-A67.49 | the designation mutator decides and records a change at once; §4.11's Works (item 67) shows its recorded steps on the ground over the weeks they take and never re-decides them | §4.7 S11, §4.11 |
=== RATIONALE-A ===
| J-A42.41 | Chose to keep every plot built with an access edge (O5 a) and a deep block's interior chosen in S8 by the band row's shares (J-P15) — item 30's reach making the hidden plots deliberately — over the rule NG 1.2.2 follows, where a lot survives only when it fronts the block's rim, passes a shape test and stays clear of the neighbourhood's outline, so that every leaf without a street edge falls to the court, because our frontage-first cut (§4.7 S10 (4)) gives each plot a frontage from the outset, and the owner's hidden-plot and prosperity rules make the interior a choice rather than a remainder. Only the description changes: the design had called about 42 % of NG's lot leaves "silently discarded"; they are its courts, made on purpose, and how often a block has a court there follows from its block and lot sizes — so the interior shares of §4.6, fitted at M-1 to that frequency, are fitted to a consequence of the rule, not to a share it draws (§4.7's S10 step (10), §4.6, F-PLOT of §5.2, §1.3; item 42). |
| J-A43.41 | Chose to take from MFCG 12710731 and from NG 1.2.2 (P9) only the form of the front-line law — per plot `h = u · min(√(plot area) / 3, jitter.maxM)`, `u` uniform, kept when `h ≥ jitter.minM`, else 0 — and to keep our own construction and values, over making MFCG's values the default preset's or copying its construction, for three reasons. Realism: with a 4.8 m cap and a 2 m floor, a plot of 100 m² stands back 2–3.3 m in four draws of ten, and larger plots more often and further — a village look — whereas a medieval street held its building line with small irregularities, the dense poor rows most of all (O17 (d); NG's measured 95–99 % attached); so our caps rise from 0.4 m in the poor and dense row to 1.5 m on rich plots, where bigger houses sit more loosely. Construction: in both references a lot is clipped by the whole block's outline shifted inward toward its centroid, which cuts back the street sides alone and drifts out of line on curved blocks — a doubt its creator voiced — while our offset square to the frontage stays exact on bent and curved frontages and keeps each party wall where the plot's side line runs (J-P14). Emulation-first (item 23, J-A23.71): our caps are an `option` extension over MFCG, and the `MFCG` comparison preset takes 4.8 m and 2 m through §7.6's per-preset values, so side-by-sides reproduce MFCG 12710731's recession law under our construction. At our values the area term only binds below about 20 m² of plot, so the default recession is uniform up to the band's cap in practice; the term is kept so that the MFCG preset scales with plot size as that build does (§4.7 S11, §10.2, §7.6; item 43). |
| J-A43.42 | Chose to bound `jitter.minM` from below by `attractCm` + 1 cm (27 cm) in the column's schema, with 0.3 m as its default, over the item's 25 cm, because §3.6's stretch attraction joins any segment lying within `attractCm` (26 cm) of an existing edge to that edge: a front 25 cm behind its frontage would be merged into the frontage when S11 inserts the footprint, and the recession would vanish; the extra centimetre covers the lattice's snap of a vertex on a slanting frontage (at most 0.71 cm), just as `attractCm` itself sits one centimetre above `minEdge`. The former note in §4.7 tied the collapse to `minEdge` when attraction is the radius that acts, and the item took its 25 cm from that note. An edit that sets the floor lower is refused with the bound named (F-EDIT) rather than clamped, so the person editing the table sees why. With the floor at 0.3 m, the item's lowest cap of 0.3 m would leave the poor and dense row with no recession at all (`u` × 0.3 m never reaches 0.3 m), so that row's cap is 0.4 m: about one plot in four then stands 0.3–0.4 m back, the slight unevenness of a streetwall that still holds its line (O17 (d)), and the item's other caps are kept as written (§4.7 S11, §3.6, §3.2 (2); J-K2; item 43). |
| J-A44.41 | Chose to keep the set-back compound's enclosure wall (the rich and prosperous rows) and its gate on the access edge as a rule of our own — provenance `own`, an `extension` (option) that the parity presets turn into the row's fence through §7.6's per-preset values — over dropping it or keeping it credited to NG 1.2.2, because that build draws no enclosure of any kind (the white shapes the profile had taken for a manor's walls belong to the big house itself: its end pavilions and roof-ridge strips), so the wall was never NG's, while manors, inns and guildhalls of the design's period did stand inside walls (realism, the design tiebreaker) and item 30's `gated` reach opens through such a wall; COV-NG-N27 remains the parity matrix's key, its claim corrected (§4.7 S11, §2.5, II.3, §15.1; item 44). |
| J-A67.49 | Chose to say at the designation mutator's timing step that a host or user change decides and records the whole mutation at once, and that §4.11's Works (item 67) draws the recorded steps on the ground across the weeks they take without deciding them again, over leaving "applies the whole mutation at once" beside item 67's timetable or re-timing the mutation, because the retrovalidation register (RV-pipeline-gen-7) named this sentence as a ruling for this pass, item 67 (a) derives each drawn stage from a record at a week ("never stored per week"), and one decision per event keeps the mutation record, its undo record and step 5's digest-checked inverse exact whichever week is drawn (§4.7 S11, §4.11; items 18 and 67). |
=== END ===
