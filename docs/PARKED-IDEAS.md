# Parked ideas — after the coherence pass

Kept here so they are not lost. **None of these is an owner rule or part of the design yet.** The coherence pass runs to
its bar without them (each new feature adds a round of findings; the owner's feature freeze, J141). After the pass closes, the owner picks which to
take up; a picked idea is filed as an owner item in the usual way and routed like items 111–126.

Recorded 2026-10-01 at the owner's "yes" to keeping a parked list.

## A. Reaching medieval simulationists and worldbuilders outside tabletop play

Source: the owner's question (2026-10-01): "how well does this, paired with the dossier, appeal to pure medieval
simulationist or worldbuilders, outside of TTRPG". The assessment was that the engine already fits these audiences. The
gap is packaging, plus a few small features.

1. **A historical preset.** One click turns off magic, sky islands and other fantasy layers, and locks architecture to a
   real era and region (the culture and era rows already exist).
2. **Neutral wording.** A non-campaign vocabulary mode: "settlement" and "history", not "campaign", plot hooks, player
   views or NPC secrets. The core (economy, demographics, institutions, history, conditions) is already general.
3. **Time-series exports.** "The town in 1150, 1250 and 1350" as a matched print or image series, built on item 113's
   history replay and the epochs. For authors and history enthusiasts.
4. **Data exports.** Institutions, people, households, buildings and districts as CSV or JSON, for wikis, spreadsheets
   and note tools such as Obsidian or World Anvil.
5. **Realism sourcing and a tuning guide.** Sources or reasoning for the realism tables (for example 45 m² a head,
   wall-decay rates, grandeur ceilings, building styles by era), and a short guide to tuning them in the tables editor.
   These audiences will scrutinise the numbers.
6. **Import from a world map.** Seed a town's site (terrain, river, coast, neighbours, climate) from a world or continent
   map, for worldbuilders who start at continent scale. This has to respect item 125: the dossier stays the only
   SettlementForge input, so a world-map import is a separate, standalone option.
7. **Positioning for game developers.** Present the deterministic seeds, the embedding API and the 3D and tabletop
   exports as a procedural town source for games.

## B. Making the design buildable

Source: the owner's questions (2026-10-01) "if we perfect the architecture… am I wrong" and "are the instructions clear
enough for a builder?" The assessment was that the design is clear on content but not packaged for builders.

1. **A contracts package.** Generate every declared type and interface into code. The compiler then catches duplicate
   or missing declarations mechanically, the same class of finding the pass keeps raising by hand.
2. **Task packets per milestone.** Roughly 20–40 pages each, holding exactly the cited text a piece of work needs,
   inlined: inputs and outputs, edge rules, the tests to pass and what is out of scope.
3. **Test skeletons.** Write the named tests (T-…) and their pass marks as code before the features.
4. **A one-page glossary and a builder's reading guide.**
5. **A rule for build agents.** Where the text conflicts or is unclear, stop and file it; never guess.
6. **A trial packet.** Generate M0's geometry-kernel packet and have a fresh agent build from it alone. Where it stalls
   or guesses shows where the instructions need work.
7. **The thin slice first.** One town generated, drawn, saved and reloaded identically, before the wider build. The
   look is checked against it at set points.

## C. Deferred to a later milestone by the owner (J142, 2026-10-02)

* **Raised ways changing over time.** Disuse and lapse, the strike, salvage, fallen spans, toppled piers, landfall damage to
  a raised way, and its repair (V06 §3.19.2; V05 §3.16 (4)'s raised row; the span and support `state` writers; the collapsed
  arch vault). Until it is taken up, a raised way stands as created until the user or a regeneration removes it.
* **Hand edits that bring a wall into a standing raised way** (a stretch drawn, moved or re-anchored into its footprint, a gate
  placed or slid under a deck, a wall along beneath an aqueduct, a raised way re-shaped or re-spaced onto a wall). They are refused
  for now with the nearest lawful alternative; bending them is the later milestone's.

## Not parked (already scheduled)

* **The final SettlementForge check** (item 125 (d); owner: "read it from local"). It runs after the pass's verdict, on
  the owner's computer, against the local SettlementForge checkout. It is the program's last step.
