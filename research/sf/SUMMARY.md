# The SettlementForge dossier and our map — what we found and what we will do (plain language, for the owner)

Written 2026-09-27 evening by the architect seat after the six read-only surveys of SettlementForge. Nothing in
SettlementForge was changed, installed, built or run in place; every dossier we studied was generated into a scratch
folder from a read-only copy of your newest product line (`fp/integration-2026-09-23`, commit `5d699cc68` of 24
September). The technical plan is `research/sf/PLAN.md`; the sixteen candidate changes to the design are
`docs/AMENDMENTS-2026-09-27d.md` (numbered 73 to 88, not yet applied). Your rule of this evening — the dossier is the
only immutable truth on the map, everything it does not say the map derives coherently by our rules, the flow is one-way,
and we never ask SettlementForge to change — governs every line below.

## 1. How the dossier works (what SettlementForge actually produces)

- **A settlement is one file.** When you generate a settlement, SettlementForge runs 22 fixed steps from a seed and writes
  one document with 41 sections: the name, tier and population; a list of institutions; the economy in words and
  percentages; the powers and their standings; a handful of named notable people with their relationships; the site
  (terrain, trade access, nearby resources); the culture; the history; any crises; and a generation log that takes up a
  quarter of the file. The same seed with the same settings gives exactly the same file, byte for byte — but only within
  one product line: your older deployed line and your newer line give DIFFERENT settlements from the same seed.
- **Institutions are kinds with counts, not buildings.** A record such as "Taverns (5-20)" or "Parish churches (10-30)"
  stands for five to twenty taverns; "Housing (180-1000 structures)" is the whole housing stock in one line. Some records
  are whole districts by name ("Warehouse district", "Brothel (red light district)"). Nothing has a position, a size or an
  address. Institutions have no identity number: their NAME is their key (your own code says so), and about one record in
  eight has no catalogue key at all.
- **There is no map in it.** No coordinates of anything, no streets, no wall line, no gate positions, no plots, no
  households, no social classes. The only place-like list is a set of up to eight quarter NAMES with a fixed phrase each
  ("Downstream/downwind", "Defensible high ground"), written once at generation by a word test over the institution names
  and never updated afterwards — a "Market Quarter" appears in every town and in no city, because the test misses the way
  cities' markets are named. The one compass word in the whole file is "Eastern district (traditional)", stamped on every
  Religious Quarter of every culture.
- **People are notables, not a population.** Two to twenty-two named characters, tied to institutions and powers by name.
  The population is one number.
- **Powers are names with a standing.** Two to ten power factions per settlement, each with a share-like power number and
  a category (economy, military, noble, religious, government, criminal, magic). Which institutions a power controls is
  not written at birth; the simulator writes a list later, which comes and goes week by week.
- **Trade is words.** Lists of export and import goods with no partner and no direction; partner-level trade appears only
  when a settlement was generated with a neighbour. The direction trade comes from exists nowhere in SettlementForge — its
  realm map records where a placed settlement sits, and from two placements a direction could be computed, but no such
  field exists today. (Your realm fusion feeds geography — terrain, rivers, coast, a placed position — not burgs'
  population, culture or state.)
- **The clock ticks in weeks.** In a campaign, one tick is one week; a "month" is four weekly ticks, a season thirteen, a
  year fifty-two. Only canon settlements inside a campaign tick; a draft or a standalone settlement has no clock.
- **Changes arrive as a whole new file.** SettlementForge sends no list of changes and no version counter. After an
  advance of any number of weeks, the map would receive the new dossier and must work out what changed. Some changes leave
  receipts (a founding week, a closure fate word such as "bankrupt" or "hollowed out", a decree's week); some leave none.
  A removed or ruined institution is never deleted from the list — it stays, marked.
- **Sizes and tiers do not line up with ours.** SettlementForge calls 901 people a town; our town/city generator starts
  at 1 500 (below that is the village product, which comes later). Of 155 dossiers we generated, 75 are below our floor —
  every thorp, hamlet and village and five small towns.

## 2. What our map will receive from it

Everything above becomes input, in three groups:

- **Facts the map must honour exactly (dossier facts):** the population; every institution record — placed on the map
  as an assignment, a counted group for a "(5-20)" record, a whole neighbourhood for a district-scale record; each
  institution's state (open, impaired, closed, ruined) and its concealment (clandestine, underground); the site words
  (coastal, riverside, hills; road, river, port, crossroads, isolated); whether it has walls; the wealth label; the
  government and the powers with their standings; the economy's income shares; the quarter names; the named notables;
  the crises; the week of each change.
- **Hints the map may use softly:** the quarter location phrases, the landmark strings, the culture's built-form prose,
  the trade goods' likely modes (road, river, sea).
- **Things the map derives entirely by our rules, because the dossier holds none:** every position and street, the wall
  line and gates, plots and buildings, the households and classes that make up the population, the prosperity field, the
  direction trade comes from, which power sits where, every name the dossier does not give.

Nothing is asked of SettlementForge. Where a fact would help if SettlementForge ever had it (the campaign's week, a
partner's direction from the realm map, an explicit instance count), the map declares an OPTIONAL slot it uses when
present and otherwise derives.

## 3. What fits already

Most of it. The design already has: assignments backed by the dossier that no map edit can delete; one placement solver
with spatial and supply-chain rules; the least-disruption mutation of an existing map when the dossier changes; the
"positive placement" and "rejection" edits; a one-way host door that accepts dossier changes as ordered events; stable
addresses on every record; a knowledge system for hidden and secret places; the households-and-people derivation from a
population; the prosperity field with drivers; a district character vector (your item 72) waiting for its political,
trade and economic inputs. Of 71 factual claims the mapping made, the adversarial checker confirmed 53 and corrected 18;
none was rejected. The corrections change details of the port's tables, not the shape of the design.

## 4. What we must add now, and what waits

**Now — small pieces, so that connecting SettlementForge later is a registration, not a rewrite** (about one and a half
to two person-weeks at the first viewable town, four and a half to six in all, spread over the build; the build order
does not change — calibration, spikes and the viewable town come first exactly as planned):

1. **One doorway.** A single, typed "port" through which every dossier fact enters. SettlementForge's own field names are
   read in one folder inside it and translated into a neutral form of our own; nothing else in the module ever learns a
   SettlementForge name. A new SettlementForge version is a new folder, not a rewrite.
2. **A name-to-address book.** Because SettlementForge keys things by name, the map keeps a binding table: each dossier
   record's key (its catalogue key, its custom id, or its name, plus a number for each member of a "(5-20)" group) against
   our own stable record address. When SettlementForge renames something with a receipt we re-bind; when it renames with
   no receipt we treat it as a removal plus an addition and say so.
3. **Typed homes for your item 72.** The blueprint already names "economy" and "trade" as circumstances without saying
   what they hold. We type them: economy as sector shares (from the income percentages), trade as a partner list with a
   direction and weight, and add powers as standings. The dials, the character vector and the trade-flow term read these.
4. **The clock.** Our week is SettlementForge's week, no conversion. Individual changes land at their week; an "epoch"
   (our growth-and-decline step) runs once a year or sooner when the population has moved more than five percent. One fix
   the checker found: without a threshold, every map rejection you made would lapse every year from a drift of a few
   people; now it lapses only when the settlement has really grown or declined (the same five percent).
5. **Real dossiers as test fixtures.** Twelve frozen dossiers (nine at our sizes, three that must be refused as
   village-sized), plus before-and-after pairs (seven DM events; one week, one season, one year of simulation; a
   "dramatic" year with ruins), labelled with branch, commit, seed and settings. From the first viewable town, the tests
   generate a real SettlementForge town and check: every record placed, the population within five percent, counts inside
   their ranges, walls exactly where the dossier has walls, every quarter name on one district, the town's average wealth
   within one band of the label, and the same file giving the same town on every machine.
6. **Housekeeping rules.** Our seed is derived one-way from SettlementForge's secret seed (so no map file can leak it);
   exported pictures are inert (no scripts, everything escaped); the port never reads SettlementForge's own map layers or
   its derived readings — what we build stays the base.

**Later — with the editing build (M3a):** the second half of the port, which takes a NEW dossier, works out what changed
against the facts the map already carries, dates each change from the receipts, and turns it into our events and epochs;
the state "listed but ruined"; named quarters and landmarks as naming claims; the bridge details.

**Later still — the SettlementForge stage of your roadmap, unchanged:** wiring the port to the live product; the optional
realm block with true directions; the village product's own path; a few records declared now but filled then (a
condition between epochs, a deposit with a state, a pre-creation history hint, relations between powers, a dossier-named
person on the map).

## 5. Decisions you need to make (each with our recommendation)

1. **Which SettlementForge version the port binds to first.** We studied your newest product line
   (`fp/integration-2026-09-23`); the deployed line and the checkout on disk produce different settlements from the same
   seed. Recommendation: name the line that will ship; a later line costs a folder, not a rewrite.
2. **May SettlementForge's simulator read our map's geometry?** (Its stripped map used to place fires and sieges by
   district.) Options: never; a summary built from the seed and dossier history only, so no player's map edit can steer
   a fire; or a summary including edits. Recommendation: the middle option if you want it at all, otherwise never — it
   is a new capability across the one-way boundary, so it is yours to open.
3. **A dossier smaller than 1 500 people before the village product exists.** Recommendation: the port refuses it and
   names the village product; drawing a 1 500-person town would contradict the dossier's own population.
4. **A settlement that dies and is resettled on the same spot.** Recommendation: one map — ruin stages, then regrowth on
   the old plan — rather than a new map.
5. **"Eastern district (traditional)" on every Religious Quarter.** A placeholder or a rule? Recommendation: placeholder
   (a weak eastward preference, dropped on your word).
6. **SettlementForge's news may name districts of its own layout that our map does not have.** Recommendation: accept
   the mismatch; making our districts follow its classes would make its map program the base.

Two things that looked like decisions are not: the seam sits at the dossier (your rule already says so), and a
SettlementForge undo needs no special mechanism — it arrives as an ordinary change, and because the solver refills vacated
plots first and prefers a building's former use, the map returns to its earlier state wherever nothing else changed.

## 6. What we did not do

No reconciliation of the two designs; no reading of SettlementForge's own town-map programs, sandboxes or map design
documents (the standing rule: what we build stays the base until reconciliation); no write of any kind inside
SettlementForge (checked after every run); no change to the build order. The six surveys this rests on are still marked
for Fable review in the queue; this plan adopted their facts with the checker's corrections and ruled on their proposals.

## 7. Your edit-build experiment (the Baldur's Gate map)

Already answered earlier this evening as J78 (`docs/experiments/known-city-authoring.md`: build it as the editing build's
acceptance test from an ORIGINAL skeleton with the map's structure and our own names; no picture-to-map converter; plots
on a bridge deck stay staged) and as item 101, the authoring toolkit (twelve tools, one vocabulary for a person, an AI
clerk and a skeleton file). This plan adds nothing to it and changes nothing in it. Where it touches the dossier: a
skeleton and a dossier share the same starting position in the map's history — the dossier's records are immutable facts,
a skeleton's drawn walls and roads are declarations that rank below them, so a known city's skeleton can say WHERE the
dossier's institutions land and never add or remove one.
