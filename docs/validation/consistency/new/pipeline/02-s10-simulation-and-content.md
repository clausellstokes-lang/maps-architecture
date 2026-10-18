## §10 Simulation and content layer (FTG parity, with restraint)

*In plain words.* As in FTG, every building has a purpose and people: the town starts from how many people live there and
what such a town needs (our own tables, not FTG's), places those needs onto plots by rules, and derives households and
people on demand. What drawing and editing the map needs is in the base; hourly schedules, a calendar, factions' meetings
and events are an optional module over the same ids, so the one-click map never waits for a simulation.

### 10.1 Scope and depth (judgment J-9; IMPROVEMENTS J-S adopted; the content locality contract)

**Base must-haves:** the sequential roster (S2), the per-plot context vector, the eager allocation (S7b, S10a) and the
per-district placement (S10b), households and people derived lazily from their keys, typed open spaces, rule-placed
landmarks and furniture, a gazetteer via `query`. **Base schema from M1, materialised by the module:** the relation store
(family units, relations, memberships, postings), sub-locations, factions with roles and goals, religions, the government's
offices (§2.7), and the economy and personality schema stubs of D-32 (§10.3). **Optional module `@plat/sim`** (delivered at
M4b, §16; never gating milestone 1, never in the one-click path): professions ↔ workplace matching, occupancy and schedules
as a query, the calendar and clock with external time sync, factions' and religions' meetings, events as templates,
relations by the family-unit model. Schedules and the calendar are not in the base (J-9). Restraint: the map stays a clean
plan; content lives in data, hover, the gazetteer and export; one click never asks a questionnaire.

**The content locality contract (FTG-9; J-P21).** Content is global and relational (a family spans households, an employee
works across the town, a faction has members everywhere), while regeneration is spatial. So: (1) the allocation is
persisted, and a scoped regeneration re-places only its own scope's allocation — global rebalancing of content is a
separate, reported action; (2) once the module has materialised the relation store, a scoped regeneration changes no
relation outside the scope: relations of people whose households were superseded are carried over by the household's
address (§6.3) or dropped and reported; (3) the locality oracle and O2 (c) cover content and relation hashes as well as
geometry. The relation store's schema is in the base; its data is materialised once by the module and then persisted, and
the one-click path never pays for it.

### 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values)

```ts
interface RosterTables { classes: BuildingClassRow[] /* {id, use, perCapita:[lo,hi], perOther?: {class, ratio}, min, max, firstAtPopulation, requires: ('water'|'coast'|'route'|'farmland'|'ore'|'stone'|'timber'|'fish'|'clay')[],
    outside: boolean, liveIn: boolean, cluster?: string, noxious, lifestyleBand, shopProb, priority, footprintM2:[p10,p50,p90], floors:[…], heights, coverageByBand, siteplan, subLocations: SubLocationRow[], openingHours: OpeningRow[], tags} */;
  institutions: InstitutionRow[]; government: GovernmentRow[] /* offices and seat classes per government kind */; religions: ReligionRow[];
  households: HouseholdRow[] /* size distributions by class */; professions: ProfessionRow[]; farm: FarmTable /* §4.9 */; names: NamePack; provenance: Provenance }
```

**The sequential roster (FTG-14; J-P20).** FTG's documented *shape* (`ftg-docs-params.md` §3.3), none of its 209 types, 80
nodes, 299 professions or 323 items. A **virtual population** advances on a fixed grid of Δ = 10 people up to the rung's
maximum. At each grid point the target count of every class is a monotone step function of the virtual population —
`perCapita` or `perOther` ratios converted to per-person ratios, core versus shop pools, lifestyle-banded pools with rare
outliers (weights ours), hard `min` / `max`, **size gates** (`firstAtPopulation`), **resource gates** read from
`SiteResources` (no farmland → no farms, shops instead) — and every class below its target receives its next building, in
class-priority then class-id order. Every draw is keyed by the building's ordinal (`roster/<class>/<ordinal>`: shop or
core, lifestyle outlier), so the n-th chandler is the same chandler at any population. The run records each building's
**appearance population**; the manifest for population P is every (class, ordinal) that appeared at or below P. Hence
manifest(P₂) ⊇ manifest(P₁) whenever P₂ > P₁ (property test on 1 000 seeds, §13.2), an epoch's delta demand is exactly the
suffix, a population fall selects the suffix in reverse order, negative deltas arise only from declared circumstance
events, and §7.8's population control is monotone by construction. **Mode (COV-FTG-B06):** `rosterMode:
'minimiseUnemployment'` (default: at each grid point, when the unemployed share of the virtual population exceeds a table
threshold, the workplace class with the largest weighted job deficit receives one extra building) or `'matchRatios'` (the
configured ratios only, FTG's alternative); both are grid-sequential, so both are prefix-stable.

**Output:** demand per class with area / frontage requirement classes, district affinities, cluster tags, live-in flags,
outside flags and wealth bands; the **character vector** (mercantile / ecclesiastic / military / agrarian / squalid …)
shifts the ratios. **Government (COV-FTG-B13):** the blueprint's `government` circumstance selects a `GovernmentRow` whose
offices force seats — a crown seat a royal castle or palace, a seigneurial lordship a lord's castle or keep, an
ecclesiastical lordship a bishop's palace beside the cathedral, a chartered commune a town hall and guild halls, a merchant
oligarchy a merchants' hall — plus a military share (guard posts per 1 000 inhabitants; barracks at CITY and above near the
castle or the gates); the castle toggle `auto` reads it. **Religion (COV-FTG-B14):** religions come from `ReligionRow`s with
worshipper shares (shifted by the character vector), a practice share and clergy per 1 000; temples per religion are
proportional to its practising worshippers; each religion has a faction (§2.7). S7b then allocates the demand and S10b
places it (§4.5, §4.7); where capacity is short, placement's reconcile and F-SITING's ladder decide, and surplus capacity is
typed as yards, greens or vacant plots (§4.7 S10b); population is honoured within tolerance and reported (O7 a, e).

### 10.3 People, households, relations, sub-locations, schedules

**Households and people.** A person is a pure function `derivePerson(seed, key, tableVersion)` of its key — `(household
address, member ordinal, birth epoch)`; the address is what survives a re-derivation of the household's plot (§6.3), whereas
the household's lineage changes on New random — and of the person tables current when its household was created
(`Household.tableVersion`); it yields name, age, status, role, ancestry, height and appearance. **Pinning is an explicit
edit, never a view (LC-16, FTG-10; J-P22):** opening a person in the gazetteer writes nothing to the document, the hash or
the undo stack; which people a viewer has seen is per-user view state (§2.9). A table edit applies to households created
afterwards; existing people change only through a diffed "re-derive people" action (§7.5 pattern). An epoch ages everyone
by its years through the key's birth epoch; births and deaths are epoch events of the owner-staged evolution engine. When
regeneration supersedes a household, its pinned or edited people are fixed inputs re-homed by rule to the household that
inherits its address (§6.3), or reported as orphans (their edit-lifecycle row is §7.4's). **Storage:** aggregates plus
explicitly pinned people — kilobytes for a 50 000-person metropolis (FTG PERF-1 answered; R14) — until the module
materialises the relation store, after which relations and postings are persisted (≈ 12 bytes per relation in the binary
block; ≈ 1.8 MB raw for 50 000 people at ≈ 3 relations each, reported per 10 k population as the O7 module metric).

**People model (COV-FTG-C01, COV-FTG-C08).** `AncestryRow { id, lifeStages: {name, fromAge}[], maxAge, heightCmBand,
nameGrammar, appearanceTemplates }` and a partnering matrix (pair weights and the child's ancestry rule) are data; the
realism base ships one human ancestry, and further ancestries arrive only through setting packs (§10.4). `Person.status` ∈
worker, unemployed, retired, student, dependent; a dependent has a `carer` whose schedule it follows; when a carer is
removed the household (then the family unit) supplies the next carer by rule and the change is reported — a dangling carer
is a reference-integrity violation (§5.3). **Appearance (COV-FTG-C02):** appearance text comes from the §10.4 engine —
weighted option tables per ancestry, line templates with substitution, conditional lines (by gender, age or a value
predicate), fallback lines and article agreement — our own templates.

**The module (`@plat/sim`).** *Relations (FTG-9, COV-FTG-C04):* the first run materialises the relation store by one global
pass on its own stream (`content/relations`) in person-key order — family units, partnerships, parent / child, siblings,
carer / caree, friends, rivals, business and religious ties, affairs — and persists it with lifecycle and reference
integrity (§10.1's locality contract). *Work (COV-FTG-B11):* professions ↔ workplaces by greedy matching with id
tie-breaks, persisted as `Posting` records; after an edit only the postings of changed workplaces and the unemployed pool
are re-matched, in person-key order; unfilled postings are tracked and reported. *Sub-locations and occupancy (FTG-11):*
`occupancy(dayType, hour)` resolves the whole population in person-key order in two passes — primary behaviours (home,
work, study, care, following carers) from profession templates, then occupancy criteria (leisure, guest workers, temporary
residence) filling `SubLocation` capacities with their relax options — cached per (day type, hour) and invalidated by edits
that touch the people or buildings involved; `whereIs(person, day, hour)` reads the cache; resource *provides / uses* edges
on roster rows are data the schedules may read; its budget is §12.7's. *Calendar:* a configurable calendar (hours / day,
days / week, rest days, weekday names); the time is the view key `time`, set by `view.set { time }` and advanced by the
module's `sim.advance { hours }` over the bridge (§11.3), and occupancy is recomputed for the new hour; neither changes the
model or logs an event. *Factions (COV-FTG-B12):* seats on plots, an influence field over districts (used by the prosperity
drivers and the grammar), named roles with member criteria (predicates over person fields) and counts, goals with methods
and progress, a secret flag; role headcounts are reconciled with the seat building's working capacity (excess roles are
filled by members housed elsewhere; the reconciliation is reported). Government offices and religions are §10.2's.
*Events (COV-FTG-C05):* `EventTemplate { id, preconditions (predicates over relations, factions, buildings), weight,
effects: EditEvent[] }` rank candidate events per building; starting one applies its effects as logged, undoable edit
events. Data dictionaries (ages, genders, ancestries) are append-only and id-referenced, so renaming never re-colours (FTG
DAT-3 avoided). The relation store answers the family-tree query (§11.2).

**Economy, personality and stat-block schema stubs (D-32; COV-FTG-B10, COV-FTG-C03, COV-FTG-C11).** In the base registry
from M1, empty until `@plat/sim` materialises them; every table is our own:

```ts
interface ItemRow { id: string; category: string; unit: string; basePrice: number /* in the setting pack's coin unit */; providedBy?: string[] /* roster class ids */ }
interface ServiceRow { id: string; providedBy: string[]; basePrice: number }
interface Stock { building: Id; item: string; qty: number }
interface PriceTable { multiplier: number; overrides: Record<string, number> }   // global price edits are `editTable` events (§7.6)
interface PersonTraits { traits: string[]; motivation: string; mannerism: string; hobbies: string[]; education: string }   // derived from the person key
interface StatBlockPack { id: string; attributes: string[]; base: Record<string, [number, number]>; professionModifiers: Record<string, Record<string, number>> }   // a named game-system pack, off by default (D-3)
```

### 10.4 Names, descriptions and setting packs

**The naming engine.** An original English-fantasy grammar (D-6) in a Tracery-class engine of our own (rules with
modifiers, feature guards, weighted decks, conditional lines, article agreement) plus syllable and Markov generators over
corpora of our own authoring; folk-contraction as an EVO event (FTG's erosion idea; "≤ 3 syllables" a parameter). Names are
drawn from the naming concerns only (§6.1) and only in §6.3's cases, a successor keeping its predecessor's name and naming
record; names never move geometry, and uniqueness follows §9.6. The same engine writes **descriptions** — a district's
one-line summary of its mix and features, e.g. a waterfront quarter that also holds workshops and a green (COV-FTG-E10),
and each building's description (§2.6) — and people's appearance lines (§10.3); descriptions are regenerated when their
inputs change unless edited.

**Per-culture generators and user lists (COV-FTG-L06).** Every `AncestryRow` and culture row names its own grammar and
corpora, so personal and place names can differ by culture. A user-uploaded list (plain text, one entry per line) becomes a
`user` corpus: a syllable and a Markov model trained from it at load, stored in the document as pack data with author
`user`, selectable wherever a corpus is. Selecting it is an `adjust` of the recipe's pack list that enters it as
`user:<content hash>` with `shipped: false` (§2.9, §7.6), so a town whose history selects it never emits a link (§6.4). The
pack holds the corpus and the keyed row operation that sets the chosen corpus field of the chosen culture or ancestry row
to it in place of the corpus it replaces, so the binding travels in the pack's content and hash; selecting it re-draws
exactly the unedited names drawn from that field, listed for confirmation (§6.3 case (4)), and never the row's other
names, each corpus field being its own naming slice (§7.6). Deselecting it is a second `adjust`; how long its content stays
in the document is §2.9's pack-set rule.

**Setting packs — format and loading hook (DEF-10).**

```ts
interface SettingPack { id: string; version: string; author: string; date: string; licence: string;
  provides: { grammars?: GrammarDef[]; corpora?: { id: string; kind: 'personal'|'place'|'word'; entries: string[] }[]; ancestries?: AncestryRow[];
    religions?: ReligionRow[]; appearance?: TemplateDef[];
    rosterPatch?: { table: RosterTableId /* classes, institutions, government, religions, households, professions, farm (§10.2) */; baseVersion: string; ops: RowOp[] /* §7.1 */ }[];
    tablePatch?: { table: TableId /* the naming, culture and ancestry tables */; baseVersion: string; ops: RowOp[] /* keyed row operations, orphaned exactly as a rosterPatch is */ }[];
    styleHints?: Partial<StyleSheet> } }
```

A pack is data, never code: schema-validated (`zod`), every entry carrying its author and date (the clean-room rule of §17),
loaded as one layer of the override chain between the shipped defaults and the preset (§7.6), and recorded in the recipe,
or in the `adjust` that adds it, by id, version and content hash. The content of every pack of the document's pack set that
is not shipped with the output version is copied into the document's `packs` block and retained there by §2.9's pack-set
rule, so a replay never depends on what is installed; a link is emitted only when every pack of the pack set is shipped
(§6.4). A pack's **roster patch**
and **table patch** (on the naming, culture and ancestry tables) are keyed row operations, never positional patches — the
`RowOp`s of §7.1, each `set` carrying the hash of the base row it was written against (`baseRowHash`) and the table version it targets
(`baseVersion`),
orphaned and reported exactly as a user override is (§7.6; LC-22) — so a newer table version never silently misapplies a
pack, and a pack edits a table by the same row operations as a user. A user corpus pack is `{ corpora: [the uploaded list],
tablePatch: [one set on the chosen culture or ancestry row's corpus field] }`, so the binding the user chose is part of the
pack's content hash. The base ships exactly one pack, our original English-fantasy set; further packs are the owner's
adopted default "setting packs later" (D-6), and adding one is a file, not a code change.
