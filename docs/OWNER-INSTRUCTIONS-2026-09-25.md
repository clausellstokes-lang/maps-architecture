# Owner instructions, consolidated (2026-09-25) — read this if you have no chat context

Everything the owner said today, in their words where short, so a fresh session or account can continue without the
conversation. Dated entries; the judgment table in docs/PROGRESS.md records how each was applied. The owner has
deferred ALL judgment ("i defer and leave all judgement to you and proactively give you any permission you may desire";
"I know nothing about coding") and asks for explanations in layman's terms.

## Staffing and operations
- "fable as manager, judgement, architect, and validator. Opus as verifier, recon, implementer, and surveyor as managed
  by fable."
- "have only up to four lanes running at a time to maintain load demand." "keep four concurrent lanes running where
  things can run are available. make a program that checks for this every 30 minutes." → tools/lanes.py + a 30-minute
  session cron (re-create the cron in a new session).
- "I am likely to run out of fable soon. So prepare for that so no progress is lost." → RESUME RULE in every workflow;
  model fallback via args {fableModel: 'opus'}; this file; docs/HANDOFF.md recovery procedure.

## Product scope and order
- "first try to produce an improved version of the generator for MFCG/FTG using the best of both and your own
  improvements for our general town/city generator. Village will be its own thing for the moment." Then "the town/city
  composed of individual neighborhoods".
- Ultimately a settlement map layer module for SettlementForge, but: "independently develop these procedural generators
  first according to the best of the competition. Only after we master this will we try to apply inputs from
  settlementforge itself." After village and town/city are built: "reconcile them with the historical data (what you
  have built is always the BASE), found in /Users/cstokes/Desktop/settlement-engine/map-corpus". Then SettlementForge
  inputs.
- Design tiebreaker: "if you have to make a decision between MFCG and FTG on which direction to take for coding, lean
  into the corpus with constraint and precision."
- Size ladders: "the village generator is going to scale from a Thorpe to a hamlet to a village. The town/city generator
  is going to scale from a town to a city to a Metropolis."

## The plot model (base)
- MFCG/FTG shapes are PLOTS, not buildings: "refine that as we think of them as plots for which the fantasy manor
  generator … would respect the boundaries of and attempt to generate a building fitting in with that plot, not
  necessarily filling it out all the way, … end to end against the street front for row houses or row business
  … where appropriate. … plots of land that have buildings in them and a yard. Sometimes several disjointed or
  disconnected buildings all still belonging to the same business or institution."
- Plot granularity: "Depending on wealth or if we assign an institution or building, … join plots together (at the
  neighborhood level) and then increase the scale of the size of the buildings within the plots so a very prosperous
  neighborhood would have fewer buildings but bigger buildings bigger yards bigger courts … A very poor neighborhood
  would have more plots each … smaller yards if a yard at all. This also creates alleys in between the roads!"
- Greenery: "add trees and green here and there too and parks and … artificial landscapes where appropriate to
  prosperity."
- Prosperity: "prosperity is a gradient and a band rather than binary and how that manifest is dynamic but in some ways,
  also predictable."

## Buildings (stage 3, after neighbourhoods)
- "the individual buildings within the neighborhood … constructed in the same way as https://watabou.itch.io/fantasy-manor"
- "I don't want it all just to be full manor, I want diversity from a giant manor to a small hovel … Or at least rules
  associated with that determination."
- "add an element of height. we won't be able to see it from my view, so it is effectively imaginary. However,
  eventually, I want to add shadows and they would use that height number."

## Layers (toggles, after the city is mastered)
- Sewers: "a sewer system that runs under the city and generally follows an appropriate system of rules consistent
  with medieval times appropriate for the above ground, urban planning … could mean … exactly follows the roads. Or they
  don't or some other system applies. … a toggle option … derived after a generator has built the city."
- Floating islands: "1 to 3 floating land masses in the sky as a collection of neighborhoods or one neighborhood … a
  toggle". "no relation with the sewer system or underground … can have somewhat independent but related to the ground
  kind of terrain … a magically conjured river … it is for a very prosperous neighborhood or set of neighborhoods or it
  has a unique function of housing a unique institution … a palace overlooking the land to a cathedral or even a
  prison."

## Assignments and evolution (later phases)
- Assignments (SettlementForge phase): "buildings to have specific names, functions, or general shapes that could
  drift within bounds … assign a single building, a whole neighborhood as one individual assignment even with
  diversified assigned single buildings in it, or assigning several different dispersed buildings across various
  neighborhoods in the city."
- Evolution (much later): "a program for them to evolve or grow depending on circumstances … a wall might move over
  decades being deconstructed into a road as they build a newer outer ring or curtain." "it must be coherent and also
  come from the same seed that evolves." Clarified: "The seed does not reproduce the same history that is to be
  determined by the inputs. But a seed is supposed to be a seed … It's not new rerolls its modifications and variations
  to the original seed."

## Editability
- "make sure that everything is editable… this will be important if for anything else we need to change something in
  the system … or if a user wants to change something to fit their preference."

## Adopted defaults (owner deferred; judgment J10–J16)
Default ink look (MFCG family), FTG-like textured second, house style later · 12th–15th-century Western Europe as the
centre of gravity · realism in the base, fantasy as toggles · browser-first embeddable library, permissive-licence
dependencies · "mastered" = the owner's eye on side-by-sides at town/city/metropolis plus parity numbers · original
English-fantasy naming · weighting realism, editability, plot texture > speed, export > novelty.

## Decline and population (evening)
- "I also want you to consider what regression would look like … what if something happens that forces it to shrink
  organically … over the next 50 years the actual town itself has somewhat shrunk organically; what used to be old houses
  has been repurposed for building material … I doubt that they may touch the wall immediately from its original outer
  ring to a shorter new ring and there are the occasional old decrepit buildings or ruins from before the shrink … it's
  this combination of growth, regression and growth where appropriate." (The war example itself is hypothetical and not to
  be written into the design.)
- "the actual size of the town, even within each tier is determined by population."
- "I would prefer if there is no defer and everything is fixed as soon as possible."
- "Floating islands are also a product of prosperity. If there is no prosperity, there is no floating islands. Because we
  consider magic to be a resource that needs to constantly be supplied so the size of an island correspond to prosperity
  both of the neighborhood and the overall city respectively."
- "Sewer systems and the underground like the walls fade slowly, rather some tunnels simply cave in or become
  decommissioned rather than intentionally taken down by populations."
- "Some sewer systems will have underground neighborhoods, or buildings I would say. How this would work is that each plot
  can only occupy an adjacent space next to a sewer line (there are no sewer alleys for example) and the buildings are
  also adjacent flush against the external wall of the sewer. Rule should be given that governed how they are generated."
- "floating islands be limited only to cities and metropolises."
- "Sewers can exist in towns though more rare and then becomes a necessity for cities and Metropolis."
- "not all cities or Metropolis have floating islands."
- "when it comes to neighborhood assignments and building assignments, this is after you already built the city, make sure
  that there are rules or templates of rules in place for their respective spatial relations with other buildings, supply
  chains, etc."
- "assignments can change as cities grow and decline — a shop may close down here but reopen over there organically, and
  according to distribution."
- "if a new plot is assigned, then the buildings can be regenerated appropriately to match the actual designation of the
  building."
- "it is a mutation of its previous design to the newest design, with additions and subtractions."
- "a town has multiple blacksmiths dispersed across different bands of prosperity. They should scale appropriate in size
  and structure … this goes for all of the buildings across prosperity bands."

## Data flow and licence (evening)
- "the map does not edit the dossier … This module only takes input from settlementforge and returns back the map. So if a
  player, for example, delete one smithy from the map, not the dossier, then the map generator needs to still respect [it]
  and build the Smithy somewhere else and all of the other elements in the coherent way still based off of that same seed.
  The Smithy can only truly be deleted if it is removed via instructions from the Dossier/settlementforge."
- "I intend to make this module, and this module not the rest of the project from settlementforge, GPL three license."
- On rejected sites: "it is not permanent because if a settlement grows or declines that might be appropriate to put
  something there. But the immediate effect should be that that place is not there … Maybe you want a specific place to be
  something."
- "we start off with the seed and then the player decides to add an institution or building there to the Dossier. The seed
  must respect that as well, and in some ways, respect the previous layout prior to the addition or subtraction."
- "different materials for construction is only represented by a change in texture or color. It has nothing to do with the
  shape."
- "the central market does not actually have to be central to the city."

## Data flow, refined (2026-09-27 evening, on the Fable account)
- On the dossier survey's finding that SettlementForge's dossier keys institutions and powers by name and carries no
  households, classes, locations or settlement-level trade direction: "whatever the dossier doesn't provide, the rest of the map code must compensate. it is one directional. only the dossier is the source of immutable truth while the rest can be constructed at whim. better if the rest of the map code coherently derives things from the dossier and in accordance with our rules."
  → recorded as item 20 (h) in docs/AMENDMENTS-2026-09-27c.md §G (applied by pass c; routed as item 20) and as J77 in
  docs/PROGRESS.md: two tiers of fact (dossier facts immutable on the map; everything else the map's own construction),
  derive before invent, coherence bars, the map never asks the dossier to change.

## Floating islands' shadows (2026-09-28 evening)
- "Oh for the sky, do you have it that if they are floating islands, they cast in appropriate shadow related to their size
  shape and the angle of the global right [light] onto the ground?" — the base already casts an island's shadow from an
  occluder slab by the global light's angle, its outline and its altitude, softer the higher it floats (§8.4, II.6); what
  it lacks is the island's own THICKNESS and UNDERSIDE PROFILE (the rocky root beneath a floating island), which the shadow's
  shape depends on, and tests under the cursor and path suns. Recorded as J98: the sky volume (docs/volumes/V05-sky.md)
  designs the underside profile and its shadow at build depth, and raises the SkyIsland fields as a base change request.
- "And for added flavor. I would imagine that there is another axis of relationship between poor and rich areas, depending
  on if they are covered by the shadow more during the day. Not a hard and fast rule. But I'm sure more prosperous people
  would love more sun." — OWNER RULE item 102 in docs/AMENDMENTS-2026-09-28g.md (J99): daylight share as a soft driver of the
  prosperity field (terrain, walls, towers and floating islands casting; ordinary buildings only across epochs), the rich
  preferring the sunlit side; the sky volume V05 and the evolution volume V06 carry their parts.
- "You need to create a comprehensive set of rules of spatial relations between many buildings and institutions that will go
  into the generator. … a thieve's guild does not want to be close to the garrison generally. The bakery might want to be
  closer to a mill possibly. Supply chains institution want to be closer to each other … the tannery needs to be away from
  residential areas and down river if there is a river. Shops want to be on streets that feed into the market(s) and … close
  to places that produce their supply. And then we fill in everything in between. This is again, not necessarily a hard rule
  … but a correlating general rule." — OWNER RULE item 103 in docs/AMENDMENTS-2026-09-28g.md (J100): siting profiles per class
  and relation families (nuisance, needs, clientele, supply, alignment, competition), a sparse table of signature pairs, all
  soft and weighted; the full rulebook for every SettlementForge institution kind is written in the content volume V11.
- "Regarding competition, don't forget our distribution … maybe there needs to be one apothecary per district simply because it
  makes sense and it is marketable. Again, just to be included into the potential weighted pools." — item 103 (f) (J101): a
  COVERAGE row per class (catchment unit and soft target) as a weighted pull toward unserved districts; the dossier's counts
  stay the truth, coverage decides where its members go.
- "Regarding the rules for special placement, create a generic set of ones for custom content creations institution supply
  chains. Read that code to get a grasp on how it should be structured." — OWNER RULE item 104 in docs/AMENDMENTS-2026-09-28g.md
  (J103): custom institutions resolve a siting profile from, strongest first, the author's map-side declaration, the scene
  archetype, the category, the tags, the optional definition fields, keywords, a fallback; active reviewed custom supply chains
  become supply pulls, resources sited by kind, imports and exports at the gates or quays facing their partners; never fails.
- "And you can use the historical checks now if you want." — partition exception for partitioned/corpus-preview/history.md as
  evidence for rules (partitioned/README.md; J103); possibility, not prevalence.

- "Regarding custom content, I meant custom content creations in spatial relations with each other regarding supply chain and
  their place within the settlement. After you figure out bundle it out together within the current work." — item 104 (h) in
  docs/AMENDMENTS-2026-09-28g.md (J104): an active custom supply chain is placed as ONE connected thing — its resource at its
  terrain feature, processors stepping inward along the flow, the final seller at the market side, its consumers pulling its
  last node; link strength by volume and by the good's nature (perishable short, bulky by water and main road, valuable toward
  security); a compatible chain clusters into a nameable working quarter, an incompatible one stretches along its road;
  cross-links to catalogue institutions; services inside their providers; subsuming institutions as one larger compound;
  imports and exports through stores at the gate or quay facing the partner; chains that deactivate keep their sites and lose
  their pulls. Bundled into the running volumes pass (V11 writes the rows, V08 the host inputs, V01 the working quarters,
  V09 and V10 the explanations and edits).
- (2026-09-28 ~18:05, received for discussion; NOT yet filed — the program proposed a bundle and awaits the owner's word)
  "What about when an institution has two or more outputs going to two or more different institutions in two or more different
  supply chains? What about if it's one output going into two more different supply chains? Do we congregate supply chains into
  specific neighborhoods or keep it loose or make it a soft rule altogether? If there is an institution that receives one or more
  inputs in produces two or more outputs, how do we specially position both it's institutions upstream, and downstream in
  relation to each other." / "Also regarding walls! … they need to both respect and integrate into natural barriers … the wall
  cuts at the coast and then treats the water, access or mountains or cliffs or ridges as an extension of their defense." /
  "Last thing, we have to talk about distribution in competition of institutions while also talking about this supply chain …
  we also want to avoid them all congregating together … like multiple apothecaries being in several districts. To generally get
  a wider coverage where appropriate." / "some institutions with settlement Forge is simply the upstream advanced tier
  (combination of multiple of) lower tier institutions and should be treated as such. Like multiple blacksmith (5-10) for
  example, is for our purposes one institution, but that also means that we should treat the map as having 5 to 10 individual
  blacksmith buildings that scale according to population size." — assessment given in chat; proposals: a two-way supply web,
  street-scale (not quarter) chain closeness per J-A72.46, cliff/marsh closure and graded walls, spread-versus-pull balance with
  a near-enough radius, and reading SettlementForge's institution ladders (UPGRADE_CHAINS, SUBSUMPTION_RULES) typed by step.
- "Integrate these into the current work" (2026-09-28 ~18:20) — the four messages above are FILED as OWNER RULES 105 (the
  supply web), 106 (walls using natural barriers), 107 (spread and pull in balance; 104 (h) (3) revised) and 108 (SettlementForge
  institution ladders) in docs/AMENDMENTS-2026-09-28g.md (J105–J108) and bundled into the running volumes pass.
- (2026-09-28 ~19:15–19:30) "caverns are more likely to form if they are in a mountainous region or if they have mines as a
  resource. Something similar that I would like to have as well in the underground is ruins. Like underground ruins. And that's
  into the resource related to ancient civilization or magical whatever. Ruins act very similar similarly to caverns, but they
  are much more structured and should have something along the lines of the remain outline of past civilization with relevant
  connection points to anything else underground where appropriate in our current roles" / "Also place for undercities or
  underground dwellings" / "the thing about caverns and ruins is that they can be in any tier. And they may or may not have an
  access point to them. It just simply means that they were. Unexcavated, but have a chance to be excavated for whatever reason
  of building sits directly on top of it and now they built an access to there or maybe there's just a public opening into these
  places" / "So a village or a Hamlet could be sitting on top of a ruins or caverns. But as they grow, there's much more likely
  the chance that they get access to them and once access established is when dwellings can be established" — OWNER RULE item
  109 with part (j) in docs/AMENDMENTS-2026-09-28g.md (J109), bundled into the running volumes pass.
- (2026-09-28 ~19:40; FILED ~19:55 as item 109 (k) with the program's refinements on "Integrate all of your refinements as well") "I would say that
  catacombs needs at least the level of a town and it can only be under the largest church or cathedral or under a cemetery only
  one per settlement until they get to city of Metropolis wish there may be two or more depending on the number of churches,
  but the largest one is the cathedral. And catacombs do grow and never shrink. They do some moderately." / "What are your
  thoughts of this?"
- (2026-09-28 ~19:50–19:55) "Geico can reach stagnation which means that they just can't expand further for whatever reason and
  people just switch out the corpses inside you know these things happen. But it can't shrink." / "Geico I meant catacombs" /
  "Access can also be granted in case if overlapping undergrounds. Let's say that, a city has yet to overlap with a hidden
  underground ruins chamber. It grows to the point where its sewer system overlaps with it and crosses through it. Now it has
  access to it." / "What are your thoughts of this?" / "I meant on all the recent rule I just added" / "Integrate all of your
  refinements as well" — item 109 (j) (3b) overlap access, (k) catacombs with stagnation, and the program's refinements (outside-
  the-walls cemetery catacombs, quarry ossuaries, crypts, church-count rows, the never-shrink ratchet, the age gate, ruins distinct
  from the town above, deep voids kept sealed) in docs/AMENDMENTS-2026-09-28g.md (J110), bundled into the running volumes pass.
- (2026-09-28 ~20:05) "do you agree?" / "switch it then, cathedral also gets crypts but cemetaries get catacombs" — item 109 (k) (2)
  revised (J111): catacombs only under cemeteries or a big city's quarry ossuary; churches, the cathedral always, get crypts.
- (2026-09-28 ~23:00) "in the eventual coherence pass, also integrate elegance into it as well where appropriate but not lowering
  nuance" — workflows/18-coherence.js principle (9), canon rulings with equivalence lists, NUANCE-LOST as a blocker (J112).
- (2026-09-28 ~23:10) "make sure the coherence pass covers: Agreement between volumes" — workflows/18-coherence.js principle (10),
  the canon's agreement matrix and six agreement checkers in every sweep (J113).
- (2026-09-28 ~23:15–23:30) "And with our tools to be built could it emulate this" (the Port Nyanzaru map, study-only) / "they go in"
  — OWNER RULE item 110 in docs/AMENDMENTS-2026-09-28g.md (J115): retaining walls, raised ways, stepped massing, buildings on moles,
  jetties and bridge decks, and a second known-city fixture from an original skeleton.
- (2026-09-28 ~23:40) "i think raised ways for cities is fair for the genertor to generate adn then a user can decide to add or
  remove" — item 110 (b) revised: generated at CITY and METROPOLIS for a reason (valley, high-ward link, water need), editable (J116).
- (2026-09-28 ~23:55 – 2026-09-29 ~00:00) "So what about the edges for each of the full architecture?" / "add it" — an edge-case
  sweep across the whole architecture in workflows/18-coherence.js: principle (11), the edge catalogue, two combination checkers (J117).
- (2026-09-29 ~00:10) "by the way, i'll approve of 5-8 seats for the 17 volumes work" — the volumes run raised to 6 lanes, the
  machine's per-workflow ceiling (J118); the four-lane rule otherwise unchanged.
- (2026-09-29 ~02:25) "Morlanes for the coherence pass. And the appropriate shrink go for the coherence pass which I intended to be
  part of the elegance piece I mentioned" — 18 at 6 lanes; principle (9)'s shrink goal of about a third fewer words, only from
  restatement, narration, duplicated mechanisms and verbose prose, never content (J119).
- (2026-09-29 ~03:05) "Those gaps work. Please integrate them in. But I will mention that some desert areas to have access to a lake
  or river or coast. Just making sure that oasis are an option." — OWNER RULE item 111 (oasis as an option beside desert rivers,
  lakes and coasts; water shaping the town), applied by the coherence pass to base and volumes (J120).
- (2026-09-29 ~07:50) "Most of these suspicions has already decided because this is all going to be integrated into settlement
  Forge." — hosting, accounts, plans, backups, naming, licence, languages, AI key and assistant questions follow SettlementForge's
  existing product decisions (J121).
- (2026-09-29 ~08:00) "With the exceptional fable, I leave all decisions to you." — every open owner question decided by the program
  in docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md (J122), vetoable; the Fable review stays the owner's.
- (2026-09-29 ~10:10) "Can you make sure to regularly save progress so in case another interruption happens, we can assure smooth
  resume?" — timed snapshots (tools/snapshot.sh, every half hour), a RESUME HERE guide atop docs/HANDOFF.md, the lane-check prompt
  saved to a file, and save-often / saved-result rules in the coherence pass.
- (2026-09-29 ~10:20) "So are the findings being resolved? Can you make sure that you just get them down to zero findings at the end
  of this for each volume and the base" — the coherence pass's exit bar is now zero open findings of any severity, per unit (J123).
- (2026-09-29 ~14:05–14:10) Histories at generation (grown-then-regressed places carry their past; underground ruins after
  substantial years from the former geometry), sewers reopened on re-expansion, overlap access lost when its link closes until
  refound, and settlements destroyed outright and rebuilt on top — OWNER RULE item 113 in docs/AMENDMENTS-2026-09-28g.md (J124).
- (2026-09-29 ~14:20) "P can simply be used symbolically for a difference in tier" — item 113 (f) revised: a symbolic peak (the
  higher tier at a representative size) where evidence shows a higher former tier but no peak was recorded (J125).
- (2026-09-29 ~14:22) "Or effectively" — item 113 (f)'s tier difference is the EFFECTIVE peak for everything the replay builds (J125).
