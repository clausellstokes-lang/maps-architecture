# Critique of amendments v, w and x (docs/AMENDMENTS-2026-10-24v.md, -w.md, -x.md) and of the settlement-engine prompts (research/sf/host-prompts-2026-10-24.md) — the experience pass, J397

> Written by the session's Fable review seat critique/experience-vwx under the owner's delegation (J397; 2026-10-24). None of the four files was edited by this seat; nothing is applied.

PROGRESS
- 0 Method and inputs read; the dry run and the lint | done
- 1 Findings EX-01 – EX-19 (majors, minors; no blocker) | done
- 2 Coverage M1–M50 (every ruling → the items that carry it, each read) | done
- 3 The seams between the three files and the prompts (every name used twice) | done
- 4 The prompts against the H rows; the host citations verified at `81f1cd96` | done
- 5 The checks that hold; what file y will need; the verdict | done

## 0 Method and inputs read

Read whole, in order, nothing sampled: `docs/PROGRESS.md` J397 (the owner's words, M1–M50, S1–S15, the seats' id blocks);
the pass's briefs (`00-preamble.md`, A1, A2, B, D, E, F and the manager's `file-y-list.md`); `docs/AMENDMENTS-2026-10-24v.md`
(880 lines; the owner-rule item 1083 and the 36 change items 1084–1119, every current and new text), `-w.md` (1 345 lines;
items 1141–1199), `-x.md` (1 058 lines; items 1201–1240); `research/sf/host-prompts-2026-10-24.md` (1 633 lines; the head,
S1–S15 whole, §16); the research notes' §4 open questions (`research/experience/01`–`05`) and the §1–§3 passages each
item cites where a verdict needed them; `docs/volumes/critique/V15.md` and `seam-world-growth-r0.md` (the form of this
file). Read in the APPLIED copies the dry run wrote (`…/scratchpad/experience-pass/review/out/`; "applied l." below is a
line of that copy): V13 §2.2's `HostRegime`, `AdvanceWindow`, `LensFacts`, `Believed`, `WorldEvent`, `WorldWhere`,
`PolityFacts`, `PolitySeat`, `PolityLink`, `PolityRelation`, `MarchHold`, `SettlementFacts`, `CampaignFacts`,
`FrameCharter`, `RouteGenesis`, `Requirement`, `SettlementPhysical`, `TravelLaw`, `Placement`, `LensPlate`, `Sway`,
`ViewFacts`, `RenderedWorld`; §2.4's `CourtViewpoint` and `CampaignTimeline`; §3.1 (1)'s `WorldRequest`; §3.11.6's port
calls (`canon`, `routeFacts`, `patrolOffer`, `derivedFacts`, `mapFeed`, `reasonOf`, `polity`, `genesis`, `canonized`,
`travelLaw`, `bindSeat`, `requestDossierUpdate`, `dossierUpdated`, `consumed`, `hostOverlay`); §8.5's H12, H22–H25,
H31–H46; §7's T-V13-74–118; V15 §2.2's `Viewpoint`, `Member`, `MemberImagery`, `EmbellishRule`, `GapStyle`,
`AtlasStyleState` and its §7.5 codes; V14 §2.2's `Unit`, `UnitEdge`, `UnitGraph`, `UnitRole`, `UnitWaterClass`; the
base's `HistoryHint`, II.7.6, §7.1's `EditBase.author` and the session `world:place`, T30-5 and T113-8. The host
repository `/home/user/clausellstokes-lang/settlement-engine` was read at `81f1cd96` (HEAD; `git show`, read-only) for
every citation checked in §4.

Executed: (1) the end-to-end dry run `review/dryrun_vwx.py` — the seats' parser (the reviser's lineage) over copies of
V13, V09, the base, V15 and V14, file v applied, then w on v's result, then x; every current text matched exactly once
at its turn and every new text exactly once after; the parser's stray-line check (a new text followed by an unprefixed
line) raised nothing: **v 36 change items (1084–1119), 61 fragments; w 59 (1141–1199), 110 fragments; x 40 (1201–1240),
91 fragments — 135 items, 262 fragments, OK**; the targets before → after: V13 5 851 → 6 322 lines (md5 a382bc11… →
c7636313…), the base 24 512 → 24 515 (c3ce2487… → 68349aaa…), V09 5 183 → 5 246 (39303070… → 23108259…), V15 2 218 →
2 437 (a4bfc7a0… → c87f8da1…), V14 3 208 → 3 253 (a1c6d7c2… → a68ea45f…). (2) The clean-room lint over all 262 new texts
with the preamble's token list: **no hit**; with an extra list of host identifiers this seat knows (`instantWorld`,
`worldPulse`, `simulationRules`, `heraldRouting`, `distancePricedNews`, `composeInstantWorld`, `REALM_SIZES`, `MAP_KINDS`,
`TONES`, `FP_`, `ARCH_`, `Forge`, "Realistic preset", "knowledge desk", "coherence fold", "virtual key", "TIER line",
"causality popup"): four hits, all "the knowledge desk" (EX-16). (3) The seam census of §3 (every record, field, function,
key and word used in two of the four files, compared by exact text in the applied copies). (4) The citation check
`review/cites.py`: 174 host citations of the prompts (every prompt's "READ FIRST" and build lines; at least nine per
prompt) resolved at `81f1cd96` by path and line, each line window searched for the symbol the prompt names; 161 held
by symbol, 13 were read by eye and hold (§4). (5) The research origin of every ruling re-read against the item carrying
it (§5).

Finding ids are `EX-nn`; each names its file(s) and item(s). Severity as the brief's: BLOCKER (a dry-run failure; a
ruling carried nowhere or contrary to J397), MAJOR (a name or shape two files state differently; a new text contradicting
an unamended sentence; a prompt contract that does not match the H row or the §2.2 text; a wrong host path or line; a
clean-room hit), MINOR (a wording, a count, a citation, a silent cost). Quotes are exact.

**Count: 19 findings — 0 blockers, 6 majors (EX-01 – EX-06), 13 minors (EX-07 – EX-19).** By file: v 7 (EX-01, -04, -06,
-07, -08, -16, -17), w 5 (EX-02, -03, -04, -11, -19), x 3 (EX-09, -10, -18), the prompts 8 (EX-01, -02, -03, -05, -12,
-13, -14, -15); five are shared. **Dry run: OK end to end. Coverage: M1–M50 all carried, none contrary. Citations: none
wrong.**

## 1 Findings

### 1.1 Blockers

None. Every current text of v, w and x matches once at its turn and every new text once after (§0); every ruling M1–M50
is carried by an item that says what J397 says (§2).

### 1.2 Majors

**EX-01 — major — v (items 1091, 1094, 1111 T-V13-78, 1115 H43; w item 1142 (a)) and the prompts (S9) — one function, two
shapes. `reasonOf`'s argument and return are stated differently on the two sides of the seam.** v 1091: "`reasonOf(world,
fact | where)` → the map's reason chain for a world word or a world-caused dossier fact … given a world fact's id, a host
key with a field the charter or the settlement map record carries (a terrain word, an access word, a water verdict, a
travel effort, a land-cover share, a hazard reading) or a `WorldWhere`, it returns `whatCaused`'s tree as `MsgRef`s with
the rule rows named, the inputs and the event dates, rendered under V10's visibility rule for the asking audience";
T-V13-78 likewise ("returns `whatCaused`'s tree as `MsgRef`s"). S9's contract: "`reasonOf(world, fact | where)` … →
`{ chain: { week: Week; sentence: string; audience: 'dm'|'public'; reason: Id }[] }` … `fact` is `{ kind:
'charter'|'edit'|'reading'|'route'; ref }` and `where` a world point or a host key", its build step 2 appending "the
returned chain as hops `{ receiptId: 'world:…', headline: the map's sentence AS SENT, … }`". Three disagreements: the
argument (an id, a key-plus-field or a `WorldWhere` against a `{ kind; ref }` with an `edit` and a `route` kind v never
admits); the return (a `MsgRef` tree against a flat rendered chain — the host holds no catalogue and cannot render a
`MsgRef`); the audience (v "the asking audience" with no parameter; S9 a word per hop). The host session would implement
S9's shape and the map would offer v's. *Fix (v; the manager rules the shape, this seat recommends the prompts' flat
chain since the host appends hops and the map must render for it):* item 1091 types the reader — `reasonOf(world,
subject: { kind: 'charter'|'edit'|'reading'|'route'; ref: string /* the member's host key; a consumed edit's id; a host
key and a field (`hostKey:field`); a route's host key */ } | WorldWhere, audience: 'dm'|'public')` → `{ chain: { week:
Week; sentence: string /* `whatCaused`'s tree flattened in walk order, each hop rendered from its `MsgRef` under V10's
visibility for `audience` — a withheld input "something you cannot see" */; audience: 'dm'|'public'; reason: Id }[] }`,
one level into a host event (its receipts named as the host's, not rendered); item 1094's sentence and T-V13-78 say
"returns the chain rendered for the asking audience", H43 (item 1115) and w's §1b.2 row (item 1142 (a)) cite the signature;
S9 then stands as written (its `where` "a host key" dropped: a key is a `subject`).

**EX-02 — major — the prompts (S10; S2 step 3; the table of §0.1) against w (item 1185 H45; items 1145 (c), 1160) — an H
row's clause with no prompt. H45 asks the host for the live treaty terms; no prompt sends them.** w's H45: "and, in the same
window, each pair's live non-aggression and mutual-defence terms with their since-weeks and whether its simulation
enforces them (`PolityRelation.terms`), so the class table reads a sworn peace as neutral and a sworn defence as respect
(V13 §3.9 (8))"; item 1145 (c) types `terms?: { kind: 'nonAggression'|'mutualDefence'|string; since: Week; enforced?:
boolean }[] /* … where sent (H45) */` and item 1160's class table reads them first. The prompts: S10's GOAL is "the polity
window's `claims` rows carry three kinds of dated pairwise standing" and its contract "`PolityFacts.claims` rows as above";
S2 step 3 sends "relations (pairwise relationship-state labels with atWar)"; the table row for S10 serves "H13"; §16.2's S10
line names the claims alone. M13 (w's reading of the terms) therefore has a map side with no host side, and `terms` stays
absent on every window. *Fix (prompts):* S10 gains a step "3. THE TERMS: for each pair holding a live pact of the peacetime
families (GR §4's non-aggression and mutual defence; the pact ledger by symbol — `mutualDefenseFor` has no caller at
`81f1cd96`, the fold's §2.1's "the allies came"), a `PolityRelation.terms[]` row `{ kind: 'nonAggression'|'mutualDefence'
|string; since: Week /* the signing tick */; enforced?: boolean /* false while no engine stage reads the term */ }`; a
lapsed or broken pact leaves the next window", with the test "a signed non-aggression pact ⇒ one `terms` row with `enforced`
false; its lapse ⇒ absent; a pair at war keeps its row and `atWar` true", the data contract quoting item 1145 (c)'s shape and
item 1160's reading ("a pair at war under a non-aggression term is at war"), the table row "H13, H45", §16.1's and §16.2's
S10 lines naming the terms, and the head's "file w is being told the same" naming `PolityRelation.terms`.

**EX-03 — major — w (items 1146 (b), 1168 (b), 1184 (b); T-V13-112) against V13 §2.2 `SettlementFacts` as v leaves it
(applied l. 1089–1090), and the prompts (S12 step 2) — a field read with no field. The preview's effect word, warning and
exposure are "sent by the host" into a record that has no place for them.** Item 1146 (b): "`unknown` where the host sent
none — from `SettlementFacts.phase` and the effect word the host sends with it, never the map's own guess"; item 1184 (b)
(H32): "its settlement's phase sent in `campaignFacts` with the effect word and the warning its law gives, so the conflict
list's preview says what the host will do"; item 1168 (b): "`hostEffect`, the host's effect word shown as sent"; and the
unamended `Conflict.preview.hostEconomyFelt … read from the host's own exposure words when sent (H32)` (applied l. 1095).
`SettlementFacts` carries `phase?: 'draft'|'canonized' /* the host's phase: what an `updateDossier` will do there (H32) */`
and nothing else of the kind: no effect word, no warning, no exposure (the exposure gap is file r's, inherited; the effect
word is this pass's). S12 step 2 sends "`campaignFacts.settlements[].phase` and a `warning` string per phase … plus
`exposure: { economy: boolean; food: boolean }`" — the warning and the exposure under names the port does not have, and no
effect word at all, so the preview cannot read `rederive` "as sent" before the request (`dossierUpdated.hostEffect` arrives
after it). *Fix (w, one fragment on `SettlementFacts` quoted as v leaves it; v's interface, w's ruling):* after
`phase?: 'draft'|'canonized' /* … (H32) */;` add `editLaw?: { effect: 'rederive'|'reroll' /* what an `updateDossier` on this
settlement does under the host's law in force: `rederive` its pinned re-derivation, `reroll` only while an older path of
the host's still re-rolls (J397 (M33); H32) */; warning?: string /* the host's own warning for that path, shown as sent */;
exposure?: { economy: boolean; food: boolean } /* whether its economy or food would feel a world-fact change there (H32) */ }`;
item 1146 (b)'s `hostEffect` comment then reads "from `SettlementFacts.phase` and `.editLaw.effect`" and `hostEconomyFelt`
"from `.editLaw.exposure`"; item 1184 (b) names `editLaw`; T-V13-112's "mock host extended with the effect word" names the
field. *(Prompts):* S12 step 2 sends `editLaw: { effect: 'rederive', warning, exposure }` per settlement in `campaignFacts`
(the warning string as written there) and its REPORT BACK names `SettlementFacts.editLaw`.

**EX-04 — major — w (item 1182 (b) H24; item 1159 (c)) and v (item 1085 `WorldEvent`) against V13 §2.2 `WorldEvent` as
applied (l. 969–974), and the prompts (S15 step 3, its contract) — a field named in an H row and a prompt that no record
declares. `WorldEvent.populationAfter` and the three depopulation kinds exist only in prose.** H24 as w leaves it: "a
depopulation sent as a dated event with the seat's population after it (`kind` `razing`, `plagueDeaths` or `abandonment`,
with `populationAfter`; H34's ask restated, so the cover fold withdraws the fields on the event's week)"; §3.6 (5) (a):
"a seat's use is withdrawn by a dated host event — a razing, a plague's depopulation, an abandonment, sent with the seat's
population after it (H34)"; S15: "`WorldEvent.populationAfter: number` on the three kinds — the cover fold dates its
withdrawn fields from it (M26)". The applied `WorldEvent` has `kind`, `at`, `where`, `pair`, `verdict`, `sourceSeat`,
`deity`, `cause`, `seats`, `lenses`, `radiusM`, `week`, `window`, `audience`, `source`, `factTier`, `causedBy`, `integrity`,
`detail`, `reason` — and no `populationAfter`; `populationAfter` and `plagueDeaths` occur once each in the whole volume (H24).
The cover fold's withdrawal reads a number the port cannot carry. *Fix (v, a fragment (c) on item 1085, or w quoting as v
leaves it):* after `seats?: string[] /* … */;` add `populationAfter?: number /* on a depopulation event — `kind` `razing`,
`plagueDeaths` or `abandonment` by the adapter folder's event table — the seat's population after it (H34; H24): what the
cover fold's withdrawal reads at the event's week (V13 §3.6 (5) (a)); absent on every other kind */;`; §3.6 (5) (a)'s
sentence cites the field; T-V13-108's fixture names it; S15 stands.

**EX-05 — major — the prompts (S4, "THE DATA CONTRACT THE MAP EXPECTS") against V13 §3.1 (1)'s `WorldRequest` (applied
l. 1872–1876), §2.2's `FrameCharter` (l. 881–909) and `SettlementFacts` (l. 1089–1090) — a contract in invented names. The
host session would implement to field names the map does not have.** S4 writes "The request: `{ rung; extent?;
template|scenario; latBox?; regime: HostRegime (S1/S2's); inclusions: Requirement[] }` where a site requirement is
`{ kind: 'site'; rank: 3; target: { tier; hostKey } }`"; V13's request is `WorldRequest { seed; size: WorldSizeRung |
{ widthKm; heightKm }; choices?: OptionChoice[] … requirements?: Requirement[] … regime?: HostRegime }` — `size`, `choices`
(the template, scenario, ruggedness and land share are `set` `OptionChoice`s, as item 1149's `hostKnobs.kinds[].choices`
says) and `requirements`, never `rung`, `extent`, `inclusions`. S4 writes "The answer per site: `FrameCharter` (V13 §2.2):
`terrain: { reliefClass; coast?: { side } ; river?: { inflow }; lake?; biome: { row; climateRow; landUseShare };
latitudeBand; roads: [...]; waterAccess: WaterAccess }`"; `FrameCharter` has no `terrain`, `reliefClass`, `coast`,
`river`, `latitudeBand` or `waterAccess`: it carries `edges[].profileCm`, `waterEdges[]: { side; kind: 'sea'|'lake'; … }`,
`riverCrossings[]: { side; direction: 'in'|'out'; … }`, `outlines.coast`, `roads[]`, `climate.latitudeDeg`, `biome: { row;
climateRow; landUseShare }`, `soil`, `bedrock`, `landforms[]` — the words the host mints are derived from these (item 1167:
"its terrain word by the inverse of DR1's relief-class row over `edges`, `outlines.coast`, `riverCrossings` and `biome`
(H14), its coast flag and side from `waterEdges`, its river and inflow from `riverCrossings`, its climate row from
`biome.climateRow`, its latitude band from `climate.latitudeDeg`, its access word from `roads` and the canon's
`WaterAccess`"), and the water access is `derivedFacts`' `SettlementMapRecord.waterAccess` (l. 3441), not a charter field.
S4's `SettlementFacts` "`{ hostKey; tier; population?; terrain; access; culture?; resources; phase }`" names a `culture`
the record does not have (its `latitudeBand?` is "from `site.culture` (DR29) where the host sends a culture" — the
adapter maps the host's culture; the port field is `latitudeBand`). *Fix (prompts):* S4's contract quotes the three records
by V13's names — the request as `WorldRequest { seed; size; choices; requirements; regime }` with the `hostKnobs` mapping of
item 1152 (b) giving `size` and the `set` choices; the `site` and `relation` rows at the rank w states (EX-19) with
`Requirement.target` as l. 1086 types it (a relation `{ a; b; word; travelDaysMax? }`); the charter's real fields with the
derivation of each word as item 1167 gives it and the access word from `derivedFacts`' `waterAccess`; `SettlementFacts`
without `culture` (the host's culture reaches the port as `latitudeBand` by the adapter's DR29 row) and with `climateRow`
noted as the adapter's (DR42), not the host's. `RouteGenesis` and `plannedSites`' shapes in S4 agree with V13 and stand.

**EX-06 — major — v (item 1113 H22, item 1115 H38, item 1090) against two unamended sentences: §8.5's H12 row (applied
l. 5306) and §3.8 (8) (applied l. 2648) — the genesis network is still laid "over the canon" that the grace rule says does
not yet exist.** H22 as v leaves it: "its genesis network's edges named at creation (H12), laid over the seats as they
stand and re-laid at each drag, their costs entering the canon at the first advance"; §3.11.6 as item 1090 leaves it:
"until that advance every seat drags free and re-lays its roads, nothing is canonized". H12's row, unamended: "genesis at
world birth over the canon with the founding members placed first, sent as one frozen record (even while dark)"; §3.8
(8), unamended: "… the port, derives its genesis network over the canon's products under its own law and sends one
frozen …"; §3.11.6's `genesis(world, RouteGenesis)` "(once, at world birth; V13 §3.8 (8))". On a campaign born on this
world there is no canon at birth, so "over the canon('s products)" and "their costs entering the canon at the first advance"
cannot both be read literally; the prompts (S3 step 2, S4 step 5) already say the latter. *Fix (v for H12 — §8.5 is v's;
§3.8 (8) is a sentence neither brief assigns: w's item 1166 is the nearest owner, else file y):* H12: "genesis at world birth
over the seats as they then stand with the founding members placed first — its edges named at creation, re-laid at each
grace drag, their costs those of the birth canon at the first advance (H22; H38) —, sent as one frozen record (even while
dark)"; §3.8 (8): "derives its genesis network over the seats and the edges the map lays at creation under its own law and
sends one frozen record, whose costs enter the canon at the first advance (the grace rule, V13 §3.11.6)".

### 1.3 Minors

**EX-07 — minor — v (item 1111 T-V13-82) — the reader's argument.** "the action calls `headlineOf` with the event's receipt
ids and nothing else" against item 1091's "`headlineOf(event)`" and S6's "the map's pin action calls it with the event's
`causedBy` receipt ids". *Fix:* "the action calls `headlineOf(event)`, the event carrying its `causedBy` ids and nothing the
map composed".

**EX-08 — minor — v (items 1092 (b), 1093 (b) law (9), 1115 H37, 1111 T-V13-74) — the birth window is two windows.** The
"birth window" is defined as "the lens window the host sends at a campaign's creation" (law (9)) carrying "its polity facts
at their genesis values" (1092 (b), H37); but the sway reads `PolityFacts` through `polity(world, window, facts)`, a recorded
input (applied l. 3523), never through `lensWindow`, and S2 accordingly sends three windows at seq 0 ("one lens window, one
polity window and one (empty) events window"). *Fix (v):* law (9): "the **birth window** is the lens window and the polity
window (an empty events window beside them) the host sends at seq 0, `{ fromWeek: 0; toWeek: 0 }`, at a campaign's
creation"; the `polity` row (l. 3523) gains "at the campaign's creation (seq 0, the birth window's polity half, H37) and per
advance"; H37 "a lens window and a polity window sent at the campaign's creation".

**EX-09 — minor — x (items 1203 (e), 1204 (a), 1214, 1233 RQ-V15-13) — a citation.** "the derived `CourtViewpoint` transient
(V13 §5.9 (2))" — the identifier is declared only in V13 §2.4 (w item 1153 (b)); §5.9 (2) as v leaves it (item 1104 (b))
describes the projection and never names the type. *Fix:* cite "V13 §2.4, §5.9 (2)" in x; or file y adds "(`CourtViewpoint`,
V13 §2.4)" to §5.9 (2)'s sentence.

**EX-10 — minor — x (item 1231 J-V15.46; item 1207's Evidence) — a sentence v made stale.** "the plates start at the first
advance the map observes, V13 §5.8 (8)" — after v item 1101 they "start at the birth window where the host sends one …
else at the first advance the map observes". *Fix:* say so in J-V15.46 ("the plates start at the birth window where the host
sends one, else at the first advance the map observes").

**EX-11 — minor — w (item 1162; or file y) against the prompts (S13) — the raid's three words are not mapped.** V13 §3.9 (11):
"a raid carrying the host's outcome word is a verdict" with "its winner +1 at the victim's facing segments";
`WorldEvent.verdict?: string`. S13 sends `succeeds | repelled | bought_off` and asserts "`bought_off` nobody" and "A
`bought_off` raid moves no band on the map (M15's stand-off rule)" — M15 rules field meetings and sieges, and no map text
names a raid word. *Fix (w 1162, or y):* "(the adapter folder's verdict table: the aggressor for `succeeds`, the victim for
`repelled`, nobody — and no band — for `bought_off`)" and a clause of T-V13-100.

**EX-12 — minor — the prompts (S10 build 1) — a record the host does not keep.** "grievance: for each edge carrying
`sold_settlement_grievance` … dropped when the relationship's grievance record is gone". At `81f1cd96`
`src/domain/worldPulse/sovereigntyTransfer.js:129–137` and `:283–288` say "THE GRIEVANCE IS FUEL, NOT A RECORD. It rides the
sold settlement's own edge … the reasons layer's `grievance` scorer reads resentment directly"; `sold_settlement_grievance`
is a news seed's `kind` (`:309`). The cited lines are right; the mechanism is not. *Fix:* derive the row from the sale's
receipt (the seed's `tick`, `assetId`, `fromId`) and drop it when the edge's resentment falls below the grievance scorer's
floor (`grievanceRead.js:101`), and say so in the step and the test.

**EX-13 — minor — the prompts (S15 build 1, its contract) against V13 §2.2 `WorldRoute.sailing` (applied l. 929–930) and
§3.11.6's `routeFacts` (l. 3432–3434) — the sailing offer's shape (the brief's `routeFacts[].sailing`).** S15: "`sailing: {
vessel: 'sail'|'oared'|'coastal'; month: 1..12; ab: number; ba: number; mean: number }[]`". V13 types the route's record as
`sailing?: { vessel: 'sail'|'oared'|'coastal'; byMonth: { out: number; back: number /* … */; outCourse?; backCourse?;
closed? }[] /* twelve */ }[]` and the `routeFacts` sentence types no sailing offer at all ("the host key, integer land
effort-metres, the water metres by kind, the per-class effort, the crossings and the 52-week seasonal sets"; the offer is
named only in prose — the W-SAIL row and H33). *Fix (file y, the one sentence):* `routeFacts` gains "and, per water edge,
`sailing?: { vessel; byMonth: { out; back; mean }[] }[]` (H33: the directional efforts and their symmetric mean, wind and
current only)"; *(prompts):* S15's row shape follows (`out`/`back`/`mean` per `byMonth` entry), or the manager rules the
flat form and y types that one.

**EX-14 — minor — the prompts (S3's contract) — M5's word is not asked.** "`travelLaw(world, law)` with `basis:
'normalized'|'absolute'` and `calibration { weeks; perCost }`" — w item 1144 adds `calibration.basisWord?` ("the host's own
words for its basis, printed on the world view's route label"), optional and defaulting to the `basis` word, so nothing
breaks; but the label M5 wants ("by the host's law — normalized: relative to this realm's nearest-neighbour hop") prints
only if the host sends it. *Fix:* add `basisWord` to S3's contract and REPORT BACK ("your own words for the basis, printed
on the map's route label, M5").

**EX-15 — minor — the prompts (S1's contract; the head) — an item number.** "`PolityFacts.names?: { root; name }[]` (file
v's name, item 1085; M22)" — the field is item 1086 (1085 is `WorldEvent`). *Fix:* 1086.

**EX-16 — minor — v (items 1115 H41, 1116 J-V13.146, 1117 D-V13.12, 1119) — the clean room, advisory.** "the knowledge
desk's events", "the host's knowledge desk" — the host's own section name for its paper (`heraldRouting.js:74`'s
`knowledge`); the preamble asks surfaces in plain words, and J397 itself uses the phrase, so the manager may waive it.
*Fix if kept strict:* "its knowledge events (a plant, an intercept, a burned agent)".

**EX-17 — minor — v (items 1104 (b), 1111 T-V13-80) — a silent cost.** The court viewpoint is "W8b's rule function run over
that court's believed facts in place of the window's … computed on demand … cached per (plate, court)" — a whole sway
projection per court per plate, with no budget row (v minted no `WORLD-` id; `WORLD-23` is free in w's block). *Fix:* a
`WORLD-23` row in §6 (file y, or w): "a court viewpoint's projection ≤ the sway's own bound for a whole-realm dirty box at
the rung (`WORLD-13`'s cell), cached per (plate, court), evicted with the plate", and T-V13-80 "within `WORLD-23`".

**EX-18 — minor — x (items 1207, 1226 T-V15-29, 1234) — a silent cost.** An as-was copy is "a scratch copy of the member
(V13 §2.5's clone, a new `docId`; held in the local store's draft mirror as V15 §4.9's unsaved form)" per member per
viewpoint — a whole world document, unbudgeted and unmentioned by V15 §4.5's storage note. *Fix:* one sentence in item
1207 or §12 (item 1234): "an as-was copy costs one member's document in the local store, at most one per member per
viewpoint, never carried by the share writer or an export; a continent-rung copy is the member's own size (V15 §4.5)".

**EX-19 — minor — w (item 1156) — a rank unstated.** "the plan's members as `site` rows (each its tier) and the plan's genesis
ties as `relation` rows" names no rank; V13 gives the included settlements' facts rank 1 (applied l. 1089's comment) and the
parent's frames rank 1 (l. 1133), and S4 writes `rank: 3`. *Fix:* item 1156 states the rank (rank 1, the member's tier its
one fact, is this seat's reading — a plan member must land at its tier as a saved town must at its facts) and S4 follows
(EX-05).

## 2 Coverage — every ruling M1–M50, the items that carry it (each read), the verdict

| ruling | carried by | verdict |
|---|---|---|
| M1 birth window and fold | v 1087 (a), 1088, 1092 (b), 1098, 1101, 1102, 1104 (a), 1114, 1115 H37; w 1142 (b), (c), 1159 (a), 1166 | carried as ruled (EX-08 the word) |
| M2 grace rule | v 1084, 1090, 1113, 1115 H38, 1118 | carried (EX-06 two unamended sentences) |
| M3 felt sentences | v 1089 (a), (c), 1097, 1103–1110 felt lines, 1112, 1113 (b), 1114 (c), 1115; w 1157, 1182–1185 | carried: the eight lenses, H22, H23, H24, H31, H32, H36–H46, the include run |
| M4 world-first | w 1149, 1152, 1154 (a), 1155, 1156, 1167, 1172 (e), 1183; V09 1191 (a) | carried (EX-05, EX-19 the prompt side) |
| M5 two clocks | w 1144, 1176 (b) | carried, the label verbatim |
| M6 wordings | v 1108 (a), 1110 (a) | carried verbatim |
| M7 why across the seam | v 1091, 1094, 1115 H43 | carried (EX-01 the shape) |
| M8 party observer | v 1087, 1088, 1089 (b), 1092 (b), 1100, 1103 (d), 1108 (c), 1109 (b), 1114 (b), 1115 H39 | carried as ruled (court → home seat → none) |
| M9 believed sway | v 1087 (a), 1093 (a), 1096, 1104 (b), 1115 H40; w 1153 (b); x 1204, 1212, 1214, 1215, 1224 | carried; V15's `court:<seat>` and the looted map in x |
| M10 default-preset arm | v 1089 (b), (c), 1096, 1100 | carried: 0.5, floor, the legend line verbatim |
| M11 headline join | v 1085, 1091, 1095, 1100, 1115 H41, 1117 | carried (EX-07) |
| M12 the map feed fenced | v 1093 (b) law (10), 1115 H42 | carried verbatim |
| M13 treaty terms | w 1145 (c), 1160, 1176 (c), 1185 | carried (EX-02 no prompt) |
| M14 scorched | w 1143, 1150 (a), 1153 (a), 1163 (b), 1176 (c) | carried |
| M15 relieved / lifted | w 1162 | carried |
| M16 whyCell | w 1165 (b), 1176 (d) | carried, the legend line verbatim |
| M17 net force | w 1145 (b), 1150 (b), 1161, 1185 H46 | carried |
| M18 gate keeper | w 1164, 1176 (b) | carried, "tolls to {seat} until the sway soaks" |
| M19 fought-over wild | w 1145 (d), 1162, 1170, 1176 (d) | carried |
| M20 claims of three kinds | w 1145 (a), 1163 (c), 1176 (c), 1185 H45 | carried |
| M21 two contesteds | w 1163 (a), 1176 (d) | carried |
| M22 named allegiance | v 1086, 1104 (b); w 1165 (a) | carried |
| M23 movers / dated facts | v 1099, 1103 (c), 1107 (b), (c), 1115 H44 | carried |
| M24 the refusal's gate | v 1087 (f), 1107 (b), (c) | carried |
| M25 demand banded by tier | w 1148 (a), 1151 (a), 1159 (b) | carried, the host's tier table as data |
| M26 withdrawn fields | w 1142 (c), 1147 (b), 1148 (c), 1151 (c), 1159 (c), 1176 (a), 1181 | carried; pure over the dated series |
| M27 two seas | v 1099 | carried, the caption verbatim |
| M28 seat glyphs | v 1089, 1108 (b), 1109 (b), 1110 (b) | carried, the label verbatim |
| M29 arrived caption | v 1103 (b); w 1182 (a) | carried |
| M30 realm-scale list | w 1146 (a), 1168 (b), 1172 (b); V09 1192 (b) | carried |
| M31 Random all forms | w 1149, 1152, 1154 (b), 1155 (c); V09 1191 (b) | carried; the visitor's rung unchanged |
| M32 water carry | w 1169, 1171, 1172 (a), (e), 1174 (a), 1188 BCR-V13-54; V09 1192 (b) | carried, three words in V09 |
| M33 the draft re-derives | w 1146 (b), (c), 1168, 1172 (d), 1184; V09 1192 (a) | carried (EX-03 the field) |
| M34 placement card's words | w 1177; V09 1194 | carried verbatim |
| M35 the lake verb | w 1173 (a); V09 1194 | carried |
| M36 two time controls | w 1173 (b), (c), 1175; V09 1193 | carried |
| M37 open rows | w 1141 (d), 1147 (a), 1148 (b), 1151 (b), 1158, 1159 (d), 1172 (c), (e), 1179 (b), 1188 BCR-V13-55 | carried; biome rows through BCR-V13-55 |
| M38 the buried past | w 1167, 1178, 1188 BCR-V13-53; base 1197–1199 | carried (V09's switch is file y's) |
| M39 one history | w 1153 (b), 1174 (b), 1177, 1178; V09 1194 | carried |
| M40 warning folded | w 1141 (c), 1172 (f), 1175, 1180 (a); V09 1193 | carried |
| M41 numbered key | x 1235, 1237, 1238, 1239, 1240 | carried, the boundary note |
| M42 atlas relations | x 1203 (b), 1205, 1208–1210, 1212, 1213, 1217 (b), 1218 (a), 1220 (a), 1226 T-V15-28 | carried; the example authors them |
| M43 cartouches | x 1202 (b), 1206, 1217 (a), 1220 (b), 1223 (a), 1224 | carried |
| M44 the public file | x 1202 (c), 1211, 1217 (c), 1225 (b)–(d), 1227 T-V15-30 | carried, removed not withheld |
| M45 honesty note | x 1207, 1215, 1223 (b), 1225 (a), 1228 T-V15-33 | carried as the manager refined it |
| M46 an old map | x 1207, 1212, 1214, 1226 T-V15-29 | carried (EX-18) |
| M47 the party's reach | x 1216, 1218 (b), 1227 T-V15-31; V14 1236, 1239 | carried |
| M48 the style for every account | x 1224, 1228 T-V15-34, 1233 RQ-V15-12 | carried (V13's gate row and V09 (8) file y's) |
| M49 sacred preset | x head (no change item) | stands as ruled |
| M50 the port law | v 1093 (a); x 1203 (e), 1226 | carried |

No ruling is carried contrary to J397's words; every J row of v, w and x has a T row a tester could run (J-V13.137–153 ↔
T-V13-74–86; J-V13.166–189 ↔ T-V13-96–118 and T-V9-91; J-V15.41–48 ↔ T-V15-27–34; J-V14.57–58 ↔ T-V14-34–35), and every T
row names its fixture.

## 3 The seams — every name used in two of the four files

| name | defined | used | agree? |
|---|---|---|---|
| `PolityFacts.names` | v 1086 | w 1141 (a), 1165 (a); S1 | yes (EX-15 the item number) |
| `LensFacts.partySeat`, `.observer`, `.courts[]` | v 1087 (a) | w 1141 (b); x 1203 (e), 1204, 1214, 1216; S5 | yes |
| `Believed { asOfWeek; confidence 0–3; integrity? }` | v 1087 (g) | w 1141 (b); x 1203 (e); S5 | yes |
| the register words `clean`, `worn`, `planted` | v 1085, 1087 (g) | x 1214, 1224; S5, S6 | yes |
| `CampaignFacts.homeSeat` | v 1088 | S5 | yes |
| `CourtViewpoint` | w 1153 (b) (v 1104 (b) describes it unnamed) | x 1203 (e), 1214, 1233 | yes in substance (EX-09) |
| `hostEffect` `rederive|decreeAtNextAdvance|retcon|reroll|unknown` | w 1146 (b), 1172 (d) | V09 1192 (a); S12 | yes |
| `PolitySeat.military.netForce`, `.basis` | w 1145 (b) | w 1150 (b), 1161, 1185; S8 | yes |
| `PolityFacts.claims[].kind/since/expires/audience` | w 1145 (a) | w 1163 (c), 1185; S10 | yes |
| `PolityRelation.terms[]` | w 1145 (c) | w 1160, 1185; no prompt | **no** (EX-02) |
| `headlineOf(event)` | v 1091 | v 1095, 1115; w 1142 (a); S6 | yes (EX-07 wording) |
| `reasonOf(world, fact \| where)` | v 1091 | v 1094, 1115; w 1142 (a); S9 | **no** (EX-01) |
| `partyNewsDelay` 0.5 / floor | v 1089 | S5 ("your own distance pricing") | yes |
| `MarchHold.segment: Id \| { wild }` | w 1145 (d) | w 1162, 1170, 1176 (d) | yes |
| `swayStatus` 4 scorched | w 1143 | w 1153 (a), 1163 (b), 1176 (c); V15 file y's | yes |
| `TravelLaw.calibration.basisWord` | w 1144 | w 1176 (b); S3 omits | yes (EX-14) |
| `HostRegime.lanes: Record<string, boolean>`, `.born`, `.deitySeated` | V13 as it stands (applied l. 1044–1045) | S1, S2 | yes — the brief's open check |
| `WorldEvent.integrity` | v 1085 | v 1095, 1100; S6 | yes |
| `WorldEvent.populationAfter`; kinds `razing`, `plagueDeaths`, `abandonment` | nowhere in §2.2 | w 1182 (b); S15 | **no** (EX-04) |
| `SettlementFacts` effect word / warning / exposure | nowhere in §2.2 | w 1146 (b), 1168 (b), 1184 (b); S12 | **no** (EX-03) |
| `LensFacts.columns[].cargo`, `.departWeek`, `.arriveWeek` | v 1087 (f); V13 | v 1107 (b); S11 | yes |
| `LensFacts.plague[].arrivedWeek/onsetWeek/clearWeek` | V13 | S11, S12 | yes |
| `patrolOffer` → extent, basis `hostWatch|garrison|debatable`, nearest garrisoned | V13 (applied l. 3435–3438) | S14 | yes |
| `routeFacts[].sailing` | `WorldRoute.sailing` (V13 l. 929); `routeFacts` types none | S15 | **no** (EX-13) |
| `PolitySeat.strengthBand`; `changes[].field` | V13 (l. 1007, 1010) | S8 `force`, S13 `tier`/`strength` | yes |
| `WorldWhere.kind` `settlement`, `road` | V13 (l. 1026) | S13, S14 | yes |
| `WorldRequest` / `FrameCharter` / `SettlementFacts` shapes | V13 | S4 | **no** (EX-05) |
| `WorldRequest.regime` | w 1154 (a) | w 1149, 1183; V09 1191; S4 | yes |
| the `hostKnobs` words (three sizes, eight kinds, the tone) | w 1149, 1152 (b) | S4's adapter rows | yes |
| `Viewpoint.audience` `court:<seat>` | x 1204 | S5, §16.2 | yes |
| the seam words of law (9) | v 1093 (b) | w (fought-over wild, scorched, the carry — file y's, known) | yes |

## 4 The prompts against the H rows; the citations

| prompt | H rows served (the prompt's own) | contract against the H row and §2.2 | citations checked |
|---|---|---|---|
| S1 | H22, H23; M1, M6, M22, M49 | agrees with H36 (v 1115): the regime, `names`, the deity ruled B with A the veto | 22 held (EX-15 an item number) |
| S2 | H23, H13, H9 | agrees with H37 and `LensFacts`/`HostRegime`/`AdvanceWindow`/`PolityFacts` as applied (EX-08 names the three windows the map should name) | 15 held |
| S3 | H22, H12, H15 | agrees with H22/H38 as v leaves them (the re-sent `bindSeat` marked "chosen here"); `CanonRequest`, `canonized`, `travelLaw` as applied (EX-14) | 8 held |
| S4 | H31, H14, H12 | the adapter rows agree with item 1152 (b); the data contract does not (EX-05, EX-19) | 15 held |
| S5 | H23, H17, H13 | agrees with H39/H40 and item 1087 field for field; the quarter banding as v rules it | 12 held |
| S6 | H9, H23, req 20 | agrees with H41 and `WorldEvent` as v leaves it (`integrity` DM-only, `unknown` absent; the knowledge kinds) | 11 held |
| S7 | H16, H4 | agrees with H42 and law (10) | 12 held |
| S8 | H13, H25 | agrees with H46 and `military` as w leaves it | 7 held |
| S9 | H16, H14, H34 | disagrees with item 1091's `reasonOf` (EX-01) | 5 held |
| S10 | H13 | agrees with H45's claims clause; H45's terms clause has no prompt (EX-02); the grievance "record" (EX-12) | 16 held |
| S11 | H17, H23 | agrees with H44 and §5.8 (5) as v leaves it, word for word | 4 held |
| S12 | H32, H24 | agrees with H32/H24 as w leaves them and `dossierUpdated.hostEffect`; the preview's effect word has no field (EX-03) | 16 held |
| S13 | H25; SP-9 | agrees with H25; the raid's three words unmapped on the map (EX-11) | 6 held |
| S14 | H25, H16 | agrees with `patrolOffer` as it stands; the decision boxed | 8 held |
| S15 | H33, H34 | agrees with H33/H34 and `SettlementPhysical`; `sailing[]`'s shape (EX-13); `populationAfter` untyped (EX-04) | 12 held |

**The citations.** 174 of the prompts' host citations resolved at `81f1cd96` (`review/cites.py`): 161 hold by symbol inside
the cited lines; the 13 the script could not match by my symbol were read by eye and hold — `genesisDiplomacy.js:157–174`
(the neighbour entry writing `source: GENESIS_LINK_SOURCE`), `advanceInterval.js:327–340` (the pause/resume cursor the fold
calls parked), `rumorHeraldLink.js:57/:110/:140` (`rumorEventRef`, `heraldLinkForRumor`, `linkRumorsToHerald`),
`CausalityPopup.jsx:1–45` (the four tiers and `PortablePopup`; the "summoned from ANY surface" phrase is the spine's, cited
beside it), `heraldRouting.js:74` (`HERALD_SECTIONS`), `vengeanceLicense.js:24–30` ("A CEILING"), `sovereigntyTransfer.js:133,
:284, :309` (EX-12), `DESIGN_REALM_DIRECTIVES.md:1227` (S) and `:1310–1317` (the sold town's grievance), `recordInvariants.js:377`,
`flows.js:173` (`deriveFlowCandidates`), `demographicsMigration.js:378`, `DESIGN_FP_ARCH_ES.md:63` (§0). **No wrong path, no
wrong line.** The head's "line numbers are dated measurements … navigate by symbol" is the right posture.

## 5 The checks that hold; what file y will need; the verdict

**The checks that hold.** (1) Mechanical: §0's dry run, all 262 fragments. (2) Coverage: §2, M1–M50. (3) Seams: §3, every
name but the five of EX-01 – EX-05 and EX-13. (4) The volumes as they stand: `Placement.hostLocked` and §3.11.6's canon
paragraph agree with H22/H38 (the additive canon's "with no canon adopted the request is refused whole" is the additive
request's own rule and does not contradict T-V13-75); `swayStatus` 4 reaches `WorldFacts.polity.status` (w 1153 (a)) and V13
§3.11.6 (9)'s one enumeration (l. 3587) lists words, not statuses; `Disturbance.kind` and `ResourceRule.kind` have no
second closed enumeration left in V13 or V09 (the six-template list of §3.1 (3) is the only one and w 1155 (a) widens it;
V09 lists no templates); `fallow` survives only as the rotation's share and stage; "drawn by chance" is gone from the
applied V13; the base admits a frame-log `setSurface` from the session `world:place` (l. 11169, 12121); `W_ATLAS_MEMBER_UNOPENABLE`,
`snapEdgeKm`, `tradeKnows`, `travelWeeks`, `city.minTier`, `T30-5`, `B-ATLAS-*`, `UnitGraph.entrances`, `UnitEdge.kind`'s
`vertical` and `secretDoor`, `Unit.hazard`, `Unit.knownTo`, `UnitRole` and `UnitWaterClass` all exist as x reads them; every
V15 record carries `knownTo` as §9.2 reads it (l. 580), so `setAttr` on a viewpoint's `knownTo` is lawful. (5) The prompts:
§4. (6) The clean room: no hit (EX-16 advisory). (7) Substance: each ruling's item answers the question its research note
asked (01 §4 Q1–Q5, Q6, Q7, Q8, Q10, Q12; 02 §4 Q1, Q2, Q4, Q5, Q7, Q8, Q9; 03 §4 Q1–Q5, Q7–Q9, Q11; 04 §4 Q1–Q4, Q6–Q10 and
Q5 recorded as D-V13.16; 05 §4 Q1–Q13) rather than renaming it — the two silent costs are EX-17 and EX-18; no pure function
is made impure (the cover fold's new input is a dated series of integers, the court viewpoint a transient over presentation
inputs, `reasonOf` a reading); the defaults that change (`scenario` by rung, the demand's ceiling, the area fills, the band
warning's place) each say so in a J row.

**What file y will need, beyond the five things the manager already lists** (RQ-V15-12 and RQ-V15-13; law (9)'s three words;
V09 §4.21.3's switch; V15's `swayStatus` sentence; H13 restated): the `WORLD-23` row for the court viewpoint (EX-17) if w
does not add it; `routeFacts`' sailing offer typed (EX-13); §3.8 (8)'s sentence (EX-06) if neither v nor w takes it; the
raid's verdict row (EX-11) if w does not; "(`CourtViewpoint`, V13 §2.4)" in §5.9 (2) (EX-09) if x does not cite §2.4; the
INDEX's H-row count stays H1–H46 (no row minted here).

**Verdict: ready to apply after the listed fixes.** No blocker; the six majors are each one fragment or one prompt step:
EX-01 (v 1091/1094/T-V13-78 typed; S9 then stands), EX-02 (S10's terms step), EX-03 (one `SettlementFacts` fragment in w; S12's
step 2), EX-04 (one `WorldEvent` fragment in v or w), EX-05 (S4's contract rewritten in V13's names), EX-06 (H12's row and
§3.8 (8)'s sentence). After them the apply seat may run v, w and x in order as the dry run did; the prompts need EX-02,
EX-05 and EX-12 before the owner pastes S4, S9, S10 and S12, and the minors at the manager's discretion.
