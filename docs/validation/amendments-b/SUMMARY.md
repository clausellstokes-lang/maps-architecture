# Your rules 8–31 in the design — the closing summary

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat amendments-b/closing; queued in docs/FABLE-REVIEW-QUEUE.md.

*For the owner, 2026-09-27. The design is `docs/ARCHITECTURE.md`; the reasons behind each choice are in
`docs/ARCHITECTURE-RATIONALE.md`. The technical record of this closing step is `closing-report.md` in this folder.*

## Where things stand

All twenty-four of the rules you gave after the design was first queued (items 8 to 31 of
`docs/AMENDMENTS-2026-09-25b.md`, and the interior rule you added this morning as 28 (f)) are now in the design. Each one
is written as working parts rather than as a promise: the data each thing records, the step that produces it, what
happens when it fails, and the test that proves it.

The work went through a first assembly and three repair rounds. Each time the checkers found fewer problems: 230, then
85, then 71, then 53, then 45. The final checker's 53 problems are all fixed; I re-checked every one against the document itself.
The last check found 45 smaller problems, which come down to 31 once duplicates are merged. They are listed with their
exact wording for a hand fix, which is the next step. Two of them, which together close one gap, matter more than the
rest (see "What remains"). None of them needs a decision from you.

## Your rules, one by one

**8. Decline and regrowth.** You said: "it's this combination of growth, regression and growth where appropriate."
Buildings can now pass through decline: occupied, vacant, roofless, ruin, cleared to a footprint, then reused as a
garden, orchard or field, or rebuilt on the old foundations. Town walls fall back to a shorter inner ring, and the old
wall line stays visible. Where decline strikes first is weighted by exposure (marginal, damp, undefended ground) with
chance playing a part. Cleared stone feeds nearby building, and regrowth refills the old plots before building past the
old edge. The design carries all of this now as hooks. The engine that runs it over time comes later, as your roadmap
orders. Your war example is kept out, as you asked.

**9. Size follows population.** You said: "the actual size of the town, even within each tier is determined by
population." The design already worked this way: every size is computed from the population you ask for, and a tier is
only a population band. This pass confirmed it and changed nothing.

**10. Islands follow prosperity.** You said: "the size of an island correspond to prosperity both of the neighborhood and
the overall city." An island's area is its maximum scaled by both the prosperity of the quarter it carries and the
prosperity of the whole city, and there is no island at all where the city cannot support one. The program also
proposed a response to decline: an island shrinks, sinks, settles or falls, and can later rise again. That proposal is
adopted, and you can veto it.

**11. The underground fades.** You said: "some tunnels simply cave in or become decommissioned rather than
intentionally taken down." A tunnel goes from in use to silted, to caved in, to collapsed or sealed. The simulation never
demolishes a tunnel, and a cave-in can close just one stretch of it. You can still delete a tunnel by hand if you
choose.

**12. Underground neighbourhoods.** You said: "each plot can only occupy an adjacent space next to a sewer line (there
are no sewer alleys for example) and the buildings are also adjacent flush against the external wall of the sewer." Your
three rules are checked on every map: each underground plot fronts exactly one tunnel wide enough to walk, there are no
underground alleys, and every building sits flush against the tunnel wall. The surface limits what lies below: no rooms
under rivers, walls or the castle keep. People get down by stairs and shafts, and the order of building is city, then
sewer network, then underground plots. This whole layer is staged for later, with its hooks in place now.

**13. Islands only in cities and metropolises.** You said: "floating islands be limited only to cities and
metropolises." The tier is checked when the map is made and again at every evolution step. A city that shrinks to a
town loses its islands through the decline stages, never all at once.

**14. Sewers by tier.** You said: "Sewers can exist in towns though more rare and then becomes a necessity for cities and
Metropolis." In a town a sewer appears only by chance, a chance that rises with population and prosperity but never
reaches certainty. Cities and metropolises always have one, and villages never do. The sewer switch only shows or hides
the network. It never creates or removes one.

**15. Not every city has islands.** You said: "not all cities or Metropolis have floating islands." A city or metropolis
may have none, one, two or three islands, drawn from the seed and weighted by prosperity. The view switch never creates
an island. A separate model setting keeps the realistic default free of islands, so there are two switches here, one
for the model and one for the view.

**16. Rules for assignments.** You said: "make sure that there are rules or templates of rules in place for their
respective spatial relations with other buildings, supply chains, etc." One placement solver decides where things go.
Hard rules must hold and soft rules add to a score. Supply links count their distance by road, river or sea. The solver
joins plots when a use needs more land, moves a displaced use at most once, and when nothing fits it says so and offers
the closest options. Every rule table can be edited.

**17. Uses move as the town changes.** You said: "a shop may close down here but reopen over there organically." A shop,
workshop or inn is kept separate from its building. Each evolution step re-scores them, with some inertia, so small
changes don't move them, and a building keeps traces of its former uses. Pinned assignments stay where they are. One
ruling: a business the dossier specifies may move but never simply closes, because your rule 20 gives the dossier the
last word.

**18. Buildings mutate to a new designation.** You said: "it is a mutation of its previous design to the newest design,
with additions and subtractions." When a plot's use changes, its buildings are rebuilt from the old design by a recorded
set of additions and removals, drawn from the plot's own seed, so the old house is still recognisable inside the new
workshop. Changing the use back restores the earlier design, and locked parts are never removed.

**19. Every designation scales with prosperity; materials are only texture.** You said: "They should scale
appropriately in size and structure … this goes for all of the buildings across prosperity bands," and "different
materials for construction is only represented by a change in texture or color. It has nothing to do with the shape."
Every building type has a template by prosperity band, blended smoothly along the prosperity map, so two smiths a few
streets apart differ by degree rather than by a switch. Materials follow FTG's default model and never change a
building's shape.

**20. The dossier is the authority.** You said: "The smithy can only truly be deleted if it is removed via instructions
from the dossier/SettlementForge," and of a rejected site, "it is not permanent." The map never writes to the dossier,
and everything the dossier specifies exists on every map. Deleting a dossier element on the map records a rejection of
that site, and the element is rebuilt elsewhere. The rejection lapses when the settlement grows or declines, or when a
dossier change touches that area. Only a dossier instruction truly removes something. You can also ask for "a specific
place to be something," and the solver honours that where the rules allow. During evolution, a business the dossier
specifies is moved before any step could close it or leave it without a building. Two gaps remain, both in the hand-fix
list: a dossier household in a district with no room left, and undo reaching a dossier change.

**21. Licence.** You said: "then lets stay private for now." The private licence stands and the GPL-3 intent is recorded
as withdrawn. No GPL wording entered the design. The clean-room rule stays absolute: the reference generators are
sources of ideas only.

**22. Dossier changes mutate the map.** You said: "The seed must respect that as well, and in some ways respect the
previous layout prior to the addition or subtraction." A dossier change finds the least disruptive site: empty plots
first, then plots whose use can move, and joining plots only when needed. It stays within a disruption budget and
reports what moved. The map depends on the seed and the ordered history of changes, so the same history always gives
the same map. A brand-new map from an existing dossier has every element from the start.

**23. MFCG and FTG first.** You said: "I still want it to be based in our base of MFCG and FTG emulation first." Every
rule's default copies what MFCG or FTG does. Our additions are marked as additions in editable tables, and the MFCG and
FTG presets switch every one of them off.

**24. Several markets.** You confirmed the main market need not be central. Its site is scored by where trade meets: a
meeting of main roads, a bridgehead, the harbour or a gate. The plaza wins inland and the harbour in a port. Secondary
markets are small and never touch another market.

**25. Terrain and water change slowly.** Reclaiming marsh or foreshore, digging canals, silting and a river shifting its
course are the slowest kinds of change in the evolution hooks. You can also make each of them by hand today.

**26. The countryside in FTG's order.** The farms and fields are decided together with the town and drawn after it,
using FTG's farm layouts by size and landscape. Keeping a reserve of farmland clear of suburbs is available but off by
default.

**27. Prosperity matches the references' wealth models.** The six prosperity bands reproduce FTG's lifestyle shares,
from squalid to aristocratic, and MFCG's mix of rich and poor wards. FTG's shanty-town rule applies only after the first
half of the town is built.

**28. Floor plans by click, saved until something changes.** You said: "a coherent floor plan of the building also
taking and tailoring to the building type and function," and "once generated it is saved … until something changes in
them from the simulator which lets the user know to click and see changes at their own pace." Buildings gain a fourth
level of detail, the floor plan. It works from the building's function first: its rooms come from its type, its use and
who lives there. The stair is placed first, and the plan always fits the outside of the building exactly. Re-rolling
the plan keeps the outside, and re-rolling the room names keeps the walls. A plan, once made, is kept. When the
simulation changes something that matters to it, the plan is marked with a change sign until you click, and then it is
updated as a change to the old plan rather than a fresh roll. The plan rung itself is built after the Fantasy-Manor
buildings, as you ordered. Its hooks are in place now.

**28 (f). The interior has no floor.** You said: "more prosperity means a larger home for a smaller family with
potential for staff rooms which are dwarfed compared to the owners … same building geometry but not the interior." One
table sets six steps from rich to destitute:
* the whole house for one family, with small staff rooms kept apart;
* a family dwelling;
* a lodging house with a shared kitchen;
* tenement flats of a bedroom and a small cooking place;
* single rooms off a corridor.

Every household gets its own door off a corridor or stair hall. As the occupants change, the inside is re-cut within
the unchanged building. The stair, the outer walls, the doors and the chimneys stay put. A mansion district that grows
poor keeps its big houses and fills them with families.

**29. Entrances and basements.** You said: "there should always be a street facing entrance … back entrances in the case
of a larger court or yard is recommended. and selective but appropriate basements." Every building has exactly one main
door facing its street. A side or back door appears only where an alley or lane gives access, and only up to a cap. A
yard door is the default when the yard is large enough. Basements depend on:
* the building type;
* the ground: none below the water table or in flood ground, a half-cellar on low ground, and a cellar that opens out
  at the lower side on a slope (a "walk-out");
* prosperity and the building's size.

The hand-fix list closes two small gaps in how a walk-out basement's outside door works.

**30. Hidden plots and clandestine places.** You said: "these are generally only accessible via alleys … plots with
buildings or institutions that only those that grew up there or knew about it have access to or the knowledge of." The
share of hidden plots is set by band:
* high in the poorest, densest quarters;
* low in the middle bands;
* back again at the top as private courts behind gates;
* higher in cities than in towns, and none in villages or in the MFCG and FTG presets.

Covered passages run under buildings and can be sealed and later reopened. What is known is kept separate from what is
built: a secret place is always on the map, but its name and purpose are shown only to a viewer who holds that
knowledge. The hand-fix list sets how high a passage's ceiling is, which the design used but never fixed.

**31. Neighbourhoods grow poor or rich slowly; the buildings outlive their occupants.** You said: "it is hard to imagine
that it would be torn down into a slum if it was filled with mansions," and "their floor is bounded to middle class … it
would cycle in appropriate circumstances between rich and middle." A change of wealth works as a slow ladder:
* first, who lives there and how they use the building;
* then, the yards and back courts;
* only on vacancy, ruin, a destructive event or redevelopment, the plots and buildings themselves.

No occupied building is torn down by a change of wealth. Poor neighbourhoods grow rich faster than rich ones fall. Stock
built at or above the middle band never looks poorer than middle-class, so it cycles between rich and middle as you
described.

## Choices made where your rules met earlier decisions

Each is recorded as "chose this over that because …" and you can veto any of them. The references in brackets point to
the rationale file.
* **The rooms-and-families sentence** in 28 (f), "the more rooms for more occupying famiiles the richer a building
  gets", is read as the building's capacity. A house built richer has more rooms to let, while the number of households
  actually living there follows the occupants (J-A28.23).
* **The city view shows building footprints by default**, not bare plots, to keep MFCG's look at city zoom. The loading
  saving you wanted comes from the floor plans and detailed buildings being made only on click. A plots-only view
  remains an option (J33, J-A28.42).
* **Click or automatic is each viewer's own setting.** Clicking is the default, as you chose (J-A28.41).
* **A dossier business moves but never simply closes.** Rule 17's "may close" gives way to rule 20 for dossier content
  (J-A20.75, J-A20.43).
* **A dossier household is never dropped.** If its district's buildings are full, housing is built for it within the
  district (the closing ruling on J-A28.46, in the hand-fix list).
* **Hidden plots scale with town size.** The share rises from town to city to metropolis and with density, as your
  "city and metropolis bands higher than town" asks (J-A30.41).
* **Islands have two switches.** The view switch you described, plus a separate model setting that keeps the realistic
  default free of islands (J-A15.41).
* **Cellars and sewers.** A cellar never joins a sewer as a room. A stair from a cellar down to a tunnel is recorded as
  an access point (J-A12.42).
* **War stays out of the rules.** The ladder's third rung is triggered by vacancy, ruin, "a destructive circumstance
  event" or redevelopment (J-A31.47).
* **You may still delete a tunnel by hand**, even though the simulation never does (J-A11.41).
* **The licence stays private**, and the earlier permission to adapt one reference's code is withdrawn (J-A21.01).

## Sizes, before this pass and now

| | before (26 September) | now |
|---|---|---|
| the design document | 9 667 lines, 1.12 MB, 140 sections | 13 028 lines, 1.62 MB, 145 sections |
| the rationale file | 1 857 lines, 0.28 MB | 2 051 lines, 0.45 MB |
| recorded choices ("chose X over Y because Z") | 276 | 470 (194 of them from this pass) |
| estimated build effort | about 153–204 expert person-weeks | about 166–220 (the staged engines are not priced, by your roadmap) |

Four assembly rounds applied 329 edits (131, 94, 58 and 46) by script, with none skipped. Every version before each
round is kept in `docs/archive/`.

## What remains, and why

Thirty-one repairs are listed with their exact wording in `closing-report.md` §2. Each repair round fixed what it was
given, but its new wording opened a few smaller edges. The count keeps falling, so the remaining work is a short,
precise hand fix rather than another full round. Under your rule to fix every finding now, nothing is deferred.

The two that matter close one gap together:
* **A family the dossier names must never vanish.** If a district's buildings were too small for all the households the
  dossier puts there, the text would have let the extra ones drop off the map. The fix builds housing for them inside the
  same district, in the least disruptive place: an empty plot first, then a yard, then a plot whose use can move, and
  last a joined plot. That is what your rule 20 (e) asks: "housing for its population is re-provided elsewhere." One
  repair states this where the housing is built, the other where the map reports what it could not place.

The other 29 are small. One is worth knowing: undo on the map could have reversed a change the dossier made, and the
fix forbids that, because only an instruction from the dossier may remove or change dossier content. The rest cover:
* a family whose place was locked by hand, which must not be moved;
* a walk-out basement's outside door;
* the ceiling height of a passage under a building;
* a round tower's room, which must stay round;
* which tests prove each of these;
* a few pointers between sections and a few recorded reasons.

## What comes next

1. **The hand fix** applies the 31 repairs exactly as listed. One check of the sections they touch and the document's
   own checks follow.
2. **The definition file.** `docs/DEFINITION.md` gains the floor-plan rung, as rule 28 (d) asked "after this pass lands",
   with the sentence the program drafted for rule 28 (f): where the poor live, the same shells with a different
   interior.
3. **Fable's review.** Everything in this pass was done by stand-in seats while Fable was unavailable. Each piece is
   queued in `docs/FABLE-REVIEW-QUEUE.md` for Fable's review when it returns.
4. **Item 32**, recording that the current generators' code was read for understanding and never copied, belongs to
   the next pass, as your note on it directs.

## Hand-fix (2026-09-27)

The thirty-one repairs listed under "What remains" are now in the design, and this pass is closed. Nothing from it is
left open, under your rule that every finding is fixed now.

**How it was done.** The thirty-one were applied exactly as written, by a script that found each old sentence once and
replaced it once, with a copy of the file kept from before. Then the parts they touched were checked again, three times
over. After the first application the checkers found 26 small edges; after those were repaired, 13 more; after those,
14 more. Each set was fixed the same way, and the last set was applied and checked by Fable itself, the design's judge,
now that it is back. The design file is now 13 026 lines; every version from before each step is kept in `docs/archive/`,
and the record of each step is under `docs/validation/amendments-b/handfix/`.

**The two fixes that mattered.** A family the dossier names is never taken off the map. If a district's buildings cannot
hold everyone the dossier puts there, housing is built for them inside that same district, in the least disruptive place:
an empty plot first, then an under-used one, then a plot whose use can move, and last by joining two plots. The map
reports each such build, and a test now proves it on a sample town whose poor district is too small for its people. That
is your rule 20 made concrete: what the dossier specifies exists on every map, and housing for its population is
re-provided.

**The rest** were the kind of thing a careful proofreader finds once the big pieces are in place:

* undo now puts moved families back for every kind of edit that moves them, not only some, and one test checks it;
* a family whose place you locked by hand is never moved;
* the height of a passage under a building is defined and tested, and nothing is drawn over a passage whose building has
  been cleared away;
* a round tower's spiral stair and its round room pass the geometry checks together, a stair turret included, and the
  test fixtures include one;
* a workshop built where no family lives in it is recorded as such, so later steps read it right;
* the tests, the cross-references and the recorded reasons that go with each of these.

A few choices were made along the way where two wordings met, each written down as "chose this over that because …" so
you can veto it. None of them needs a decision from you now.

**What comes next** is the list under "What comes next" above, less its first step, which this closes: Fable's review of
the work done by the stand-in seats (queued), then your rules 32–72, then the definition file's floor-plan rung.


## Fable review (2026-09-27) — A-amendments-b/closing (the summary's claims)

Reviewer: Fable (claude-fable-5-1), lane fable-review/main/integration. The summary's claims are true against the design
as it stands, with two notes for the owner:

1. **Rule 14, the sewer switch.** The summary says the switch "only shows or hides the network. It never creates or
   removes one." That is exact for cities and metropolises, which always have a network. In a **town**, where a sewer is a
   matter of chance, the same *Sewers* control has a second meaning: `auto` (the chance decides), `on` (force a network)
   or `off` (none) — so a town's user can make or unmake the network by hand, as everything is editable (design II.7.1,
   choice J-A14.42). Villages never have one.
2. **Rule 20, a dossier household in a full district.** The hand fix houses such a household inside its district, and
   the design's placement rule always finds a place when the map is first made. One case was unstated: a district in
   which a user has **locked every plot** after the map exists, since a lock outranks the dossier's claim to a site and
   the rule never builds on a locked plot. Fable's ruling (J-Fintegration-1, a block for the next assembly): a hand edit
   that causes it is refused with the locks named (unlock, choose another site or keep the lock); a dossier change that
   causes it is refused back to SettlementForge the same way, which unlocks first; and a step of the town's own history
   houses the household in the nearest district instead. In every case the household stays on the map and no lock is
   overridden.

The "six steps" of rule 28 (f) are six band rows in the design (rich, prosperous, comfortable, modest, poor, squalid); the
summary's five bullets merge the first two, whose unit form is the same whole house.
