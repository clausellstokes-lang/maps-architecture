# Agreement check, round 1 — time and change (determinism, V06, V01, V02, V03, V04, V05, V07) after assemble-r1

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-agree-time-r1t; covered by the whole-design retrovalidation (J84).

> **PROGRESS** — [x] brief read whole · [x] resume check (fresh start) · [x] round-0 findings re-checked against the live text (20) · [x] peer-confirmed time items re-read · [x] repair-touched time subsections re-read (diff 3f0e02b → live) · [x] owner items 120–125 parts checked (F-MISSING) · [x] issues written · [x] result saved · [x] LANDED

## Scope and method

**Members:** determinism (§5–§7), V06, V01, V02, V03, V04, V05 and V07, read in the live files after assemble-r1. The live
design files have not changed since the assemble-r1 commit `d45ad03`; the commits after it touch only file g, the canon
and the logs. §4.11, the contract's base side, was re-read wherever pipeline's repair touched it.

**Re-checks.** I re-checked each of my 20 round-0 findings against the current text. assemble-r1 replaced V02, V04, V05,
V06 and V07 whole. I applied each unit's repair to the time-and-change subjects, so I took the line and word diffs of every
member against the pre-round text (`3f0e02b`) and read every hunk that touches the subject: epochs, growth, decline, decay,
least-disruption mutation, lifecycle rows, hand-offs, the replay and item 119's timing. For each hunk I read the whole
subsection it lands in, and the counterpart text in the other members. That covers V06 (every hunk, item 119's §6.8 and the
take-over table included), V07, V04, V05, and V01–V03's time and Find hunks. In the base I read §4.11's runner and
`EpochInputs`, §5.3's wall-crossing row, §6.1's epoch component and history replay, §6.5's epoch-keys fixture, §7.1's T3
rows, §7.2's new dossier-over-lock rule, §7.4's `epoch` row and *Replay semantics*, and §7.7's DR41 and lapse texts.

**Owner items.** I checked items 120–125 against the canon's dated rulings for every unit in my scope that the rulings name:
- item 120: V01, V03, V04, V05, V07;
- item 122: determinism, V06, V01, V02, V03, V07;
- item 123: determinism, V06, V02, V03, V04;
- item 124: determinism;
- item 125: determinism.

None of my units is named for item 121 or for item 122 (h)–(i).

**Peers.** The round-1 verifiers that landed before this seat had already raised several of the defects found here. Those
are listed under *Confirmed peer findings* and are not re-raised. The F-MISSING ids are re-raised as the brief requires;
peers use the same ids, so the adjudicator merges them.

## Outcome

**20 issues: 2 blocker, 18 major.**
- **Owners:** determinism 5, V06 4, V04 3, V02 2, V03 2, V07 2, V01 1, V05 1.
- **By kind:** 7 DISAGREE (two round-0 findings that persist in part, and five new ones) and 13 F-MISSING (items 122–125).

**Round-0 findings.** Of the 20, 18 are fixed. Two are partly fixed and stay open:
- **VAT0-01:** V06 now draws again for each added wing, but V04 §3.5.7 (d), the dig rule's home, still ends "a building
  never draws twice for one kind". It is re-raised to V04.
- **VAT0-07:** §4.11 cites §6.1's replay component, but no text says how a live epoch after a replay prefix is numbered, or
  what number a replay epoch records. It is re-raised to determinism.

**New defects.** Two come from this round's repairs:
- **VAT1-03 (blocker) and VAT1-04:** §7.4 now makes every port epoch no undo target. V06 (§4.1, T-V6-27, the T20
  take-over rows) and V07 still restate the older rule, under which only an epoch that carried a dossier event is no undo
  target.
- **VAT1-05:** item 114's oldest-patch-first recovery orders by epoch number. Across a replay prefix that order is wrong
  (it follows from VAT0-07).

Two more are disagreements in item 120's new Show-gaps text:
- **VAT1-01:** V05 §5.6 (4) disagrees with V01 §5.4 (3) on a sky island's `households` unit.
- **VAT1-02:** V04 §5.1 (4) disagrees with V01 §5.4 (3) on the units Below, leaving out the underground pseudo-district.

**What agrees.** The evolution contract still agrees in substance after the repairs. The phase order and the participants
(now with V07's three in V06 §6.2's budget table) match. So do the ledger's two routes for a lost void, the replay's
keying citation, the product registration (`ProductDecl extends ProductDeclEpoch`, V07's values stated once), the street
retirement through the strike pool, item 114's patch rows and `conditionEpoch` writers (V05's landfall included), item
115's ceiling over epochs (V02 = V06 = V07), and item 119's single "Total" reading in V01–V05 and V07, all of which cite
V06 §6.8.

## Round-0 findings — verdicts

| id | owner (r0) | verdict | where (live) |
|---|---|---|---|
| VAT0-01 | V06 | **PARTLY FIXED — re-raised to V04** (V06 side done; V04 §3.5.7 (d) l.1856-1857 still "never draws twice for one kind") | V06 §3.18.1 (2a) l.2461-2467, T-V6-34, bar.T-V6-34; V04 §3.5.7 (d) |
| VAT0-02 | V04 | FIXED | V04 §3.5.7 (g) (5) l.1900-1906, V04 §3.10 l.2278-2281, V04 §13's V06 row, T-V4-76 (a), J-V4.128 |
| VAT0-03 | V01 | FIXED | V01 §3.3.6 l.867-869, V01 §3.12 l.2077 |
| VAT0-04 | V06 | FIXED | V06 §3.18.2 (3a) l.2592-2593 |
| VAT0-05 | V06 | FIXED | V06 §2.1 l.400-402 cites §4.11; the phase rule in V06 §3.1 (4) l.947 |
| VAT0-06 | pipeline | FIXED | §4.11 runner paragraph l.8019-8022 |
| VAT0-07 | pipeline | **PARTLY FIXED — re-raised to determinism** (§4.11 (2) l.8053-8057 fixed; §6.1's live-epoch numbering after a replay prefix and a replay epoch's recorded number still unstated) | §4.11 (2); §6.1 l.9047-9050 |
| VAT0-08 | V07 | FIXED | V07 §3.12 l.2493-2494, T-V7-30, J-V7.98 |
| VAT0-09 | V06 | FIXED | V06 §3.18.1 (4) l.2520-2537, W73, `EpochReport.households.undergroundVacated` l.735 |
| VAT0-10 | V06 | FIXED | V06 §3.8.2 tier (2) l.1636-1638, §3.13 (1) l.2208-2210 |
| VAT0-11 | V01 | FIXED | J-V1.36 l.3421 |
| VAT0-12 | V07 | FIXED | V07 §3.12 *Which path runs* l.2287-2289 |
| VAT0-13 | V06 | FIXED | no `engine` author left in any member |
| VAT0-14 | V07 | FIXED | V07 §2.6 l.996, §3.12 *Pins over epochs* l.2479 |
| VAT0-15 | determinism | FIXED | §7.4's `epoch` row l.10769 (create: the replay runner; undo: replay epochs; regenerate: Re-derive from S1 or `generate`) |
| VAT0-16 | V06 | FIXED | §2.7's `DisplaceCause` with `destruction` l.2299; V06 §2.1 cites it l.401-402 |
| VAT0-17 | V06 | FIXED | V06 §3.19 l.2772, l.2796 cite V01 §3.14's `raised.stripMarginM` |
| VAT0-18 | V07 | FIXED | V07 §2.1 l.364 `ProductDecl extends ProductDeclEpoch`; V07 §3.12 *The village's registration* l.2273-2285 |
| VAT0-19 | V04 | FIXED | V04 §3.5.5 (b) (1) l.1740-1745 |
| VAT0-20 | V06 | FIXED | V06 §3.20.5 (4) l.3144-3148 |

## Owner items 120–125 in this lane's units

| item | unit | verdict |
|---|---|---|
| 120 | V01 | present: V01 §5.4 (a)–(k) — areas, Show gaps' units, over time and epochs (4), exports and cost; T-V1-59; J-V1.102 |
| 120 | V03 | present: V03 §5.5, its over-time clause (3), T-V3's Find clauses |
| 120 | V04 | present: V04 §5.1 *Find on Below*, UE32, T-V4-81, V04 §6's Find row — its Show-gaps units disagree with V01 (**VAT1-02**) |
| 120 | V05 | present: V05 §5.6 (1)–(6), V05 §6's Find row — its island units disagree with V01 (**VAT1-01**) |
| 120 | V07 | present: V07 §5.5 (1)–(5), T-V7-68, J-V7.145; the hand-off up and down (4) agree with V07 §3.12 and l.634, l.981 |
| 122 | determinism, V06, V01, V02, V03, V07 | absent in each (no "item 122", crisis look or stressor text): **G122-determinism, G122-V06, G122-V01, G122-V02, G122-V03, G122-V07** |
| 123 | determinism, V06, V02, V03, V04 | absent in each: **G123-determinism, G123-V06, G123-V02, G123-V03, G123-V04** |
| 124 | determinism | absent (§6.1 has no weather stream): **G124-determinism** |
| 125 | determinism | absent (DR1, DR3, DR19, DR29 still read the realm block; DR42 `HostContext.week`): **G125-determinism** |

## Issues

### VAT0-01 — BLOCKER DISAGREE (owner: V04)

* **Claim.** Partly fixed. V06 now keys the dig draw as V04 does and draws again for each wing V02's mutator adds over a void. This is V06 §3.18.1 (2a), l.2461-2467: 'A building draws once per void kind, plus once for each wing V02's mutator adds over a void (a `MutationPlan` step or a rung-3 op, in `scope.basementGrown`)'. T-V6-34 and bar.T-V6-34 read 'one draw per (lineage, void kind, added-wing key)'. V04 §3.5.7 (d), the rule's home, still ends: 'and a building never draws twice for one kind' (l.1855-1857). That clause was there in round 0 too. So the home now contradicts its own key clause ('its key carrying the wing key of a wing V02's mutator adds', l.1846) and V06. A build that follows V04's last clause makes no second draw for an added wing and fails T-V6-34.
* **Required change.** In V04 §3.5.7 (d) replace 'and a building never draws twice for one kind.' with 'and a building draws once per void kind, plus once for each wing V02's mutator adds over a void (a `MutationPlan` step or a rung-3 op), its key carrying that wing's key, never twice for one key (V06 §3.18.1 (2a); T-V6-34).' Keep the rest of (d), with 'Item 109 (d)'s "chance raised over a ruin" is this row.' after it.

### VAT0-07 — MAJOR DISAGREE (owner: determinism)

* **Claim.** Partly fixed. §4.11 *History-first generation* (2) now cites §6.1's replay component (l.8055-8057), and §6.1 widens it to `0x8000_0000 + r` with 'live epochs run 1 … 2³¹ − 1' (l.9047-9050). The clause my round-0 change asked for is still absent: no text says which epoch number a live epoch takes on a document whose log opens with a replay prefix. §6.5's *epoch keys* fixture (l.9746) folds live epochs 0x7FFF to 0x8001 on such a document, which implies they count from 1. Nor does any text say what epoch number a replay epoch records wherever the model records one: §6.3's creation epoch in the lineage key ('the epoch as creation epoch', V06 §3.16), `LifecycleEvent.epoch`, `Lifecycle.since.epoch`, `EpochRecord`, V06 §2.11's `HistoryIndex` and §2.7's `conditionEpoch` ('with the replay the replay's own epochs', l.2423). If replay epochs record r and live epochs count from 1, replay epoch r and live epoch r mint the same lineage keys in the same units and share index entries. If they record `0x8000_0000 + r`, every order by epoch number puts the replay's decades after the live epochs (VAT1-05).
* **Required change.** In §6.1, under the epoch component, add: 'On a document generated from its history the live epochs are numbered 1, 2, … after the creation prefix, independent of its length R (a Re-derive that replays a corrected history keeps every live epoch's keys). A replay epoch r records `0x8000_0000 + r` as its epoch number wherever the model records one: §6.3's creation epoch in the lineage key, `LifecycleEvent.epoch` and `Lifecycle.since.epoch` (§2.8), `EpochRecord.epoch`, §2.7's `conditionEpoch` and V06 §2.11's index. A rule that orders by epoch compares the epochs' weeks (`EpochRecord.week`), never their numbers, so every replay epoch precedes every live epoch.' Add the matching clause to §6.5's *epoch keys* fixture: no lineage key minted by a replay epoch equals one minted by a live epoch.

### VAT1-01 — MAJOR DISAGREE (owner: V05)

* **Claim.** Find's Show gaps on a sky island reads a households-counted class differently in V05 and in V01, its home. V05 §5.6 (4) (l.2317-2321, added this round): 'for a class with a coverage row the island's units are V05 §3.5 (3)'s — its districts for a row counted by district or neighbourhood, the whole island for one counted by walking radius or by households'. V05 §3.5 (3) does not say that. It gives a households-counted row '⌈its carried households ÷ N⌉ units' and makes only the walking-radius row one unit for the island. V01 §5.4 (3), the home of `gapUnits` ('never a second definition'), and V01 §3.16 make 'the island … one `walk` unit'. A `households` row reads per plot over the island's plots there. For the same chip on an island, V05 outlines the whole island or nothing, while V01 outlines the unserved plots of each district.
* **Required change.** In V05 §5.6 (4) replace 'for a class with a coverage row the island's units are V05 §3.5 (3)'s — its districts for a row counted by district or neighbourhood, the whole island for one counted by walking radius or by households —' with 'its units are V01 §5.4 (3)'s `gapUnits` over the island's arena, restating none: its districts for a row counted by district or neighbourhood; the whole island as one unit for a row counted by walking radius (V01 §3.16; the route to the ground passes every walking radius, V05 §3.5 (3)); and V01's per-plot `households` reading over the island's plots for a row counted by households —'. Keep the rest of the sentence ('each unit with no member … "none here"'). Make T-V5's Find clause and V05 §3.21's Find row read the same.

### VAT1-02 — MAJOR DISAGREE (owner: V04)

* **Claim.** Find's Show gaps Below names different units in V04 and in V01, its home, and V04 disagrees with its own coverage rule. V04 §5.1 *Find on Below* (4) (l.2692-2696, added this round): 'Show gaps' units Below are the undercity districts, each outlined dashed "none here" in the band holding its core'. V01 §5.4 (1) and (3) list as Below's `district` units 'each undercity neighbourhood and the underground pseudo-district' (V04 §3.6a (5)), and the per-plot `walk` and `households` units read `underDistance` there. V04 §3.6a (5) itself makes 'each undercity neighbourhood and the underground pseudo-district (the sewer-front neighbourhoods and F6's void dwellings) … a catchment of its own'. So under V04 a sewer-front neighbourhood or a void-dwelling cluster without the chip's class is never outlined, and a walk-counted class Below is read by district.
* **Required change.** In V04 §5.1 *Find on Below* (4) replace 'Show gaps' units Below are the undercity districts, each outlined dashed "none here" in the band holding its core.' with 'Show gaps' units Below are V01 §5.4 (3)'s `gapUnits` on the underground parts, restating none. Each undercity neighbourhood and the underground pseudo-district is a `district` unit (V04 §3.6a (5)), and the per-plot units read `underDistance`. Each gap is outlined dashed "none here" in every band holding its plots, an undercity neighbourhood's in the band holding its core.' Make UE32 and T-V4-81 name the pseudo-district's gap.

### VAT1-03 — BLOCKER DISAGREE (owner: V06)

* **Claim.** This round's §7.4 change makes every port epoch no undo target. V06 still states the older, narrower rule. §7.4 *Replay semantics* (l.10718-10724; VEL0-05): 'Every event of the port's reserved session `host:port` — dossier events, `dossierFacts`, `dossierRecord` and the port's epochs alike, whether or not a port epoch carried a dossier change in `EpochInputs.dossier` — is likewise no `undo`, `redo` or `revert` target'. §7.7 item 3 follows: 'an undo of a lapsing epoch outside the port's session `host:port` restores the hold'. V06 says otherwise in three places. §4.1 (l.3302): 'An epoch that carried a dossier event is never an undo target (§7.4)'. T-V6-27 (l.3866), on H-DOSSIER where every epoch is a port epoch: 'an undo of a lapsing epoch that carried no dossier event restores the hold'. The take-over rows T20-2 and T20-6 (l.3819-3820) say the same. A correct build refuses that undo (F-EDIT), so it fails T-V6-27. A build that follows V06 lets a user undo the host's clock.
* **Required change.** V06 §4.1: replace 'An epoch that carried a dossier event is never an undo target (§7.4)' with 'No event of the port's session `host:port` — a port epoch, with or without a dossier change, a dossier event — is an undo, redo or revert target (§7.4 *Replay semantics*)'. T-V6-27: replace 'and an undo of a lapsing epoch that carried no dossier event restores the hold (T20-2's epoch clause); an `undo` naming an epoch that carried a dossier event returns F-EDIT and changes nothing (T20-6's epoch clause)' with 'and an undo of a lapsing epoch outside the port's session `host:port` (an advance on a what-if copy of the fixture) restores the hold (T20-2's epoch clause); an `undo` naming a port epoch, with or without a dossier change, returns F-EDIT and changes nothing (T20-6's epoch clause)'. Make the take-over rows T20-2 and T20-6 (V06 §7) read the same.

### VAT1-04 — MAJOR DISAGREE (owner: V07)

* **Claim.** V07 restates §7.4's undo-target rule in its narrower form, which this round's §7.4 change superseded (see VAT1-03). V07 §3.12 (l.2336-2337): 'undone by the epoch's undo record where the epoch is an undo target, a record's never (an epoch that carries a dossier event is no undo target, §7.4; the host restores, item 87)'. V07 *Pins over epochs* (l.2480-2481): 'undone by its undo record where the epoch is an undo target (an epoch that carries a dossier event is none, §7.4)'. Both imply that a port epoch carrying no dossier change is an undo target at a village rung. §7.4 now makes every event of session `host:port` no undo target.
* **Required change.** At V07 l.2336-2337 replace '(an epoch that carries a dossier event is no undo target, §7.4; the host restores, item 87)' with '(no event of the port's session `host:port` — a port epoch with or without a dossier change, a dossier event — is an undo target, §7.4 *Replay semantics*; the host restores, item 87)'. At l.2480-2481 replace '(an epoch that carries a dossier event is none, §7.4)' with '(a port epoch never is, §7.4 *Replay semantics*)'.

### VAT1-05 — MAJOR DISAGREE (owner: V06)

* **Claim.** Item 114's recovery order breaks across a history replay. V06 §3.7.7 (3) (l.1599) rebuilds patched runs 'oldest patch first (by the run's last-change epoch, ties in chain order)'. §2.7 (l.2420-2433) has every writer set `conditionEpoch` to 'the epoch in force at its event', 'with the replay the replay's own epochs', and the replay runs item 114's transitions (V06 §3.20.3). §6.1 numbers live epochs 1 … 2³¹ − 1 apart from the replay's range (VAT0-07). After a history-first generation, a run patched in a replay epoch decades ago therefore sorts after a run patched in live epoch 2 if it records `0x8000_0000 + r`, or ties with live epoch r if it records r. Either way the rebuild is not oldest first, and the result is silently wrong.
* **Required change.** In V06 §3.7.7 (3) replace '(by the run's last-change epoch, ties in chain order)' with '(by the week of the run's last-change epoch — `EpochRecord.week` of its `conditionEpoch`, generation's epoch 0 first, a replay epoch's week before every live epoch's, §6.1 — ties in chain order)'. Add to T-V6-73 a history-first fixture: runs patched in replay epochs and in live epochs, recovery rebuilding the replay-era patches first. Add the combination row 'item 114's recovery × the history replay' to V06 §3.21 (b).

### G122-determinism — MAJOR F-MISSING (owner: determinism)

* **Claim.** g item 122 (crisis looks; J135) routes to determinism §7.7: 'the derivation row: every stressor type and condition archetype → its look kind or "no look"; knowledge admission of a condition' (canon.md, dated ruling 'File g items 121, 122 and 123 routed'). §5–§7 hold no item-122 text: no row maps a stressor or archetype to a look, and §7.7's derivation table ends at DR43. No round-1 repair carried item 122.
* **Required change.** Add to §7.7's derivation table the item-122 row, numbered after DR43 by ID-DR. Name: 'crisis looks (a look only, never in the model or its hash)'. Inputs: the `ConditionOverlay`s standing in the view's week (§2.7: archetype, severity, `sinceWeek`, `untilWeek`), the stressors and `activeConditions` through V08's closed mapping, a calamity's `targets`, the view's year position (DR42), the tier, and the dossier's force and group headcounts where given (item 122 (h)). Rule: every SettlementForge stressor type and condition archetype has exactly one row in §10.2's crisis look table, a look kind or 'no look' (the regional_* pressures 'no look'). A look is drawn only while the view's week lies in [`sinceWeek`, `untilWeek`), scaled by severity and tier. A condition the viewer's key withholds is never drawn, listed or hinted at (§11.2's admission). What the crisis leaves reaches the model only through the epoch path (DR28's calamity in `EpochInputs.events`; the population target). Chance: view-only draws keyed by the seed, the condition's id and the place (§8.10's render keys), never a model stream. Bar: §13.2's item-122 bars (the same hash with crises on and off and in every week).

### G122-V06 — MAJOR F-MISSING (owner: V06)

* **Claim.** g item 122 routes to V06 'the hand-over (aftermath through the epoch path; the camp at the growth frontier; reconstruction as Works)' (item 122 (a); canon's dated ruling for items 121–123). V06 carries none of it: no text names item 122, a crisis look, a camp at the growth frontier, or a look handing over to the next epoch. `ConditionOverlay` is read only for the Works share (V06 §3.13 (6)).
* **Required change.** Write V06's item-122 part at build depth as new design. (1) **The aftermath**: what a crisis leaves reaches the map only through the next epoch — the calamity as an `EpochInputs.events` entry (DR28) run by the hazards phase (V06 §3.11) at its `targets`; deaths and exodus through the population target; newcomers who stay through growth (V06 §3.6). A look never writes an op. (2) **The camp at the growth frontier**: a pure, draw-free query, `frontierFor(doc, households)`: where V06 §3.6's growth would seat that many households next, by the same rules over committed state. It is read by §10.2's refugee-camp placement, so newcomers who stay become the next epoch's suburb where the camp stood. Fallback with no frontier: the approach road by a gate (item 122 (b)). (3) **Reconstruction as Works**: the `reconstruction` archetype's `ConditionOverlay` read by the works phase (V06 §3.13 (6)); a disaster's ruined look ends in the week its rebuild's Works begins, so no week draws both. (4) **Edges and lifecycle rows** (V06 §2.12, V06 §3.21): a look standing when its aftermath epoch folds; a condition with no calamity (a look, no aftermath); the aftermath epoch undone while the look stands; a replay epoch (no look; past calamities reach it as events); a port epoch carrying the calamity. (5) A T-V6 test: the hash identical with crises on and off; the frontier query equal to where the next epoch's growth seats those households on a fixture.

### G122-V01 — MAJOR F-MISSING (owner: V01)

* **Claim.** g item 122 routes to V01 'neighbourhoods as disaster targets; the outskirts' common land' (canon's dated ruling for items 121–123; item 122 (b)'s disaster pattern and its immigration camp 'on common or fallow land along the main approach road by a gate'). V01 has no item-122 text.
* **Required change.** Write V01's item-122 part at build depth. (1) **Disaster targets**: a draw-free service over committed state, `crisisUnits(doc, pattern)`, giving the neighbourhoods and districts a disaster look may ruin and their block adjacency: fire spreading through contiguous blocks downwind, flood taking the low ground by the water (the terrain raster), earthquake scattering. The calamity's `targets` win where the dossier names the place hit, and the share follows severity (item 122 (b)). (2) **The outskirts' common land**: the commons and fallow faces at a district's outer edge along the main approach roads, read by §10.2's camp placement, never on water, a gate's passage or a keep-out. (3) Edges: a standalone neighbourhood document; no common land (the approach road's verge); a target the key withholds. (4) A T-V1 test: the units equal the rule's on fixtures and the hash is unchanged.

### G122-V02 — MAJOR F-MISSING (owner: V02)

* **Claim.** g item 122 routes to V02 'the ruined look of a disaster's buildings' (canon's dated ruling for items 121–123; item 122 (b)'s 'whole neighbourhoods in a temporary ruined state'). V02 has no item-122 text.
* **Required change.** Write V02's item-122 part at build depth. While a disaster look stands, the building band draws its buildings in a temporary ruined look over the same massing: roof holes, burnt shells, fallen walls. It never changes `MassingRef`, `Composition`, the model or its hash, and is keyed by the condition's id and the building's lineage. Read it as item 123's exterior damage (G123-V02) at a look-only decay level set by the disaster's severity, so the exterior and V03's plan agree. Edges: a building the look and a real decay both reach (the higher of the two levels drawn); a standing Works; a deck building. A T-V2 test: the hash is identical with the look on and off, and the look ends in its condition's last week.

### G122-V03 — MAJOR F-MISSING (owner: V03)

* **Claim.** g item 122 routes to V03 'item 123's damage as a look in a disaster's buildings' (canon's dated ruling for items 121–123; item 122 (d): 'Interiors in a disaster's ruined neighbourhood show item 123's damage as a look while it lasts'). V03 has no item-122 text.
* **Required change.** Write V03's item-122 part at build depth. While a disaster look stands, a building's plan draws item 123's damage layer (G123-V03) at a look-only decay level set by the disaster's severity. Its rooms, walls, openings and ids are unchanged, nothing is stored, and the look ends with the condition. A real decay after the aftermath epoch is the building's own level (V06). Edges: a plan not yet derived (derived on view as today); a building in the look that is also decayed (the higher level); exports drawing the look, battle maps in the image only. A T-V3 test: plan ids identical with the look on and off, and the same hash.

### G122-V07 — MAJOR F-MISSING (owner: V07)

* **Claim.** g item 122 routes to V07 'the village and smaller rungs' (canon's dated ruling for items 121–123). V07 has no item-122 text: no crisis look at THORP, HAMLET or VILLAGE and no placement on the village's ground.
* **Required change.** Write V07's item-122 part at build depth. The closed table at the village rungs, scaled by tier ('a hamlet gets a war band's camp'). Placement on the village's commons, greens and approach tracks. Engines facing the palisade's weakest stretch (item 114's condition). Famine's bare furlongs overriding item 117's crop stage on the great fields. The township view's clusters. The aftermath through the village epoch (V07 §3.12). A crisis look over a hand-off band. Edges and a T-V7 test (the hash identical with crises on and off; each look only in its condition's weeks).

### G123-determinism — MAJOR F-MISSING (owner: determinism)

* **Claim.** g item 123 (a ruined building's plans damaged, never redrawn; J136) routes to determinism '§6.3 (one keyed threshold per plan element by lineage and element id; no new ids; monotone in the decay level)' (canon's dated ruling for items 121–123). §6.1 and §6.3 hold no such threshold or concern.
* **Required change.** Add to §6.3, with its row in §6.1's concern registry: each plan element (a wall run, floor area, door, window, stair, roof bay over a room, furniture piece) draws one uniform keyed by (the building's lineage, the element's id) on one fixed, non-rerollable concern, the same at every derivation and epoch. It mints no id and moves no element. The damage shown at decay level L is exactly the elements whose threshold is at most L, so a higher level's damage contains a lower's on every element and restoration removes it in reverse. Underground plan elements (cellars, crypts) draw on the same key (V04). Bar: §13.2's item-123 bars (ids identical between the intact and the damaged plan; the same element breaks at the same level per seed).

### G123-V06 — MAJOR F-MISSING (owner: V06)

* **Claim.** g item 123 routes to V06 'the decay level over time per lineage (existence state, years since abandoned) and restoration' (canon's dated ruling for items 121–123; item 123 (b)). V06 has no decay level. The record that dates a building's abandonment is `Lifecycle.since`, which keeps only the last existence change (§2.8, l.2622). The `decay` Works already carries a dated progress for each step (§4.11 *Works* (4)–(5)), but nothing derives item 123's level from it.
* **Required change.** Write V06's item-123 part at build depth. (1) **The decay level** (0–1) of a building lineage at a week is derived, never stored. It is read from the existing `decay` Works and existence (§4.11 *Works* (4)–(5): `abandoned` and its Works' progress toward `decayed`, then `decayed`, then `ruined`; the dwell bands × 0.6 for timber and thatch being item 123 (b)'s material rate), so the plan's damage and the building's drawn decay stage are one reading. It is monotone while the building stays abandoned, decayed or ruined, and is read at any frame's week (V06 §3.15) and at each replay epoch. (2) **Restoration**: `reoccupy` and a `repair` Works run the stages backwards, so the level falls and the damage leaves in reverse threshold order, a repaired element drawn in patch material (item 114). (3) **Edges** (V06 §3.21): a building generated as a ruin with no Works (its level from its state and V11's default age); a fire's CHARRED state; a successor lineage on a trace (a new plan, level 0); an epoch undone; the replay's first-met ruins (the plan as built, then its damage, item 123 (a)). (4) A T-V6 test: the level is monotone over H-100's decline and falls in reverse on repair.

### G123-V02 — MAJOR F-MISSING (owner: V02)

* **Claim.** g item 123 routes to V02 'the exterior agreeing with the plan's damage' (canon's dated ruling for items 121–123; item 123 (d)). V02 has no item-123 text.
* **Required change.** Write V02's item-123 part at build depth. The building band draws the same damage from the same thresholds (§6.3) at the same decay level (V06): a roof bay over a room past its threshold is a hole in the roof seen from above; a broken outer wall run is a gap in the footprint's outline. `MassingRef`, `Composition` and the footprint are unchanged. Edges: a solid monument (no roof bays); a building with no stored plan (the thresholds keyed by element id all the same); a deck building. A T-V2 test: the exterior's holes and gaps equal the plan's damaged roof bays and outer runs at every level.

### G123-V03 — MAJOR F-MISSING (owner: V03)

* **Claim.** g item 123 routes to V03 'the damage layer, its drawing at every state (abandoned, decayed, ruined, restored with patches), the plan's exports, the panel lines' (canon's dated ruling for items 121–123). V03 still draws a `decayed` or `ruined` plan uniformly (V03 §5.1), with no floors, no partial damage and no progression, and has no item-123 text.
* **Required change.** Write V03's item-123 part at build depth. The damage layer over the same plan, every room, wall, opening and id unchanged. Its drawing by state: `abandoned` — dust, debris, broken furniture, doors off their hinges; `decayed` — rotten floor patches and holes, partitions down, roof holes, rooms marked unsafe; `ruined` — outer walls broken, upper storeys mostly floorless, rubble heaps, the ground floor the only walkable storey. Restored elements are drawn in patch material. Battle-map exports follow the damage: a fallen wall run leaves line of sight, a doorless opening is a gap, rubble and holes are drawn in the image, never as walls. Add the panel lines. Replace V03 §5.1's uniform drawing. The no-op pin: a building never decayed is byte-identical. Edges and a T-V3 test (ids identical; damage monotone in the level; restoring reverses it).

### G123-V04 — MAJOR F-MISSING (owner: V04)

* **Claim.** g item 123 routes to V04 'cellars, crypts and underground buildings by their own thresholds' (canon's dated ruling for items 121–123; item 123 (c): 'cellars and crypts intact or partly collapsed by their own thresholds (a ruined church keeps its crypt)'). V04 has no item-123 text.
* **Required change.** Write V04's item-123 part at build depth. Each underground plan element (a cellar's, a crypt's, an F4, F6 or C4 building's walls, floors and openings) draws its own threshold by §6.3's key (the building's lineage, the element's id). It reads the decay level of its building above, or its own for an underground building, so a ruined church keeps its crypt or loses part of it by those thresholds. Make it agree with V04's own closure states: a collapsed access head is V03 §5.3's trace, and a `lost` cluster stays lost. Edges and a T-V4 test (monotone; ids unchanged; the hash unchanged).

### G124-determinism — MAJOR F-MISSING (owner: determinism)

* **Claim.** g item 124 (intermittent light weather by season and region; J137) routes to determinism '§6.1 (the view-only, session-seeded weather stream, replayable from seed and clock, never touching the model's streams)' (canon's dated ruling 'File g item 124 routed'). §6.1 has no weather stream.
* **Required change.** Add to §6.1 the view-only weather stream. It is keyed under `STAGE_VIEW` on its own concern from the document's seed, the session and the view clock (the week and the spell schedule), and is replayable from seed and clock. It is never mixed into a model stream, a digest or a tile key. Spells follow V11's climate weather columns by week band (no snow where winter does not freeze; rain rare in arid country). 'Start a shower now' is a view action. Register its row and the bar that the model hash is identical with effects on and off (§13.2's item-124 bars).

### G125-determinism — MAJOR F-MISSING (owner: determinism)

* **Claim.** g item 125 (the dossier the only data input; J139) routes to determinism '§7.7 (DR1, DR3, DR19, DR29 and DR42 re-sourced to the dossier or the generator's fallback)' (canon's last dated ruling). The rows still read host inputs: DR1 the realm cell's terrain, river and coast (l.11584); DR3 the realm partners (l.11586); DR19 the realm cell's resources (l.11602); DR29 the realm block's `cell.latDeg` (l.11612); DR42 `HostContext.week` (l.11625).
* **Required change.** Re-source the five rows per item 125 (a)–(b). DR1, DR3, DR19 and DR29 drop the realm block: each reads the dossier's field where the dossier carries it, else the generator's default or the user's setting, the fallback reported. DR42's week becomes the dossier's latest stamped tick, else the user's season control (standalone midsummer). Restate §7.7 item 1's realm-block and `HostContext` inputs as view commands (item 125 (c)), and make item 10's input order 'the dossier's, then the blueprint's own'.

## Confirmed peer findings (not re-raised; confirmed in the live text)

* **VPC-R1-20** (verify-pipeline-r1t; owner V06): `EpochInputs.wealthLevel` and `.advance` are declared both in §4.11
  (l.8003-8005, added by pipeline's VPC-22 (b)) and in V06 §2.3 (l.597-600), and `.replay` both in §4.11 and in V06 §2.14
  (l.911-913). The members agree, so it is a duplicate home only. Pipeline's hand-off asked V06 to cite §4.11; V06's repair
  did not.
* **VCS-08, VCS-18** (verify-scope-r1t, partly fixed; owner scope): §16's M6-E row (l.18744) still carries 29.5–41.75 pw
  against V06 §8's 29.75–42.25 pw (item 119's E6 and E9 work). VV78-12 covers V07's 30.25–42.5 pw against §16's
  29.75–41.75.
* **J-A113.61** (verify-determinism-r1t; owner scope): the judgment index row (l.21356) and its Part A entry (rationale
  l.805) still say `0x8000 + r`, "the u16 range's upper half", against §6.1's `0x8000_0000 + r`. V06 §3.16 cites the row
  without its value, so V06 is unaffected.
* **§6.1's `raised.reason` row** (verify-determinism-r1t; VM-R1T-11): it cites "`RaisedReasonKey` (V06 §2.13)" although
  the type is declared at §2.7 (l.2228) since this round.
* **§13.2's T20-2 and T20-6** (verify-determinism-r1t): the base bars still use the narrower undo rule. VAT1-03 and VAT1-04
  are the volume restatements of the same rule.
* **G-item duplicates:** G122-V06, G123-V06 (verify-vol-V05-V06-r1t); G122-V01, G122-V02, G123-V02 (verify-vol-V01-V02-r1t);
  G122-V03, G123-V03, G123-V04 (verify-vol-V03-V04-r1t); G122-V07 (verify-vol-V07-V08-r1t); G122-, G123-, G124- and
  G125-determinism (verify-determinism-r1t). This seat confirms each part absent and raises it under the same id.
* **Round 0's confirmed peer findings** are re-read and, in the live text, fixed:
  * VPC-22: `EvolveOp` is in `ConversionOp`, and `EpochInputs` has its three members.
  * VPC-32 / VM-R0S-15: `DeclineOp` has `retireWay | effaceWay | reopenWay` (l.8341).
  * VM-R0S-03, VDC0-04, VDC0-07: §2.7 has five condition states, a material and an epoch; §7.1's T3 row and DR41 are
    in place.
  * VM-R0S-11: `HistoryHint.peak` (l.2382).
  * VM-R0S-09: `Household.transit` (l.2297).
  * VV56-09: V06 §3.16 cites §6.1.
  * VV56-18: V05's landfall writes `conditionEpoch` and keeps `conditionMaterial`, and its undo restores both.

## Checked and agreeing

* **The runner and the order.**
  * §4.11's strategy sentence now matches V06 §3.1 (2) and §3.2 step for step (VAT0-06).
  * V06 §3.2's participant table and V06 §6.2's budget rows agree with V07 §6 (`village.plan` 0, `village.density` 6 ms,
    `village.pins` ≤ 2 ms inside the village epoch, which is ≤ 60 ms below TOWN's row).
  * They agree with V05 §6 (`IslandEpochStep` ≤ 2 ms + strips ≤ 4 / 6 ms per island; `sky.clearance` ≤ 1 ms) and V04 §6
    (fade 3·8·20, extend 6·17·43, access 5·15·40, undercity 1·4·8).
  * V07 now states its participants' orders by citing V06 §3.2 alone.
* **The product registration.**
  * V07 §2.1's `ProductDecl extends ProductDeclEpoch` (V06 §2.1's home).
  * The village's four values stated once in V07 §3.12.
  * `village.density` scoped "under any product" in both units.
* **Households at an epoch.**
  * A lost void's two routes: the `decline` step through the ledger, an `afterGrowth` loss inside the participant. They
    are the same in V04 §3.5.7 (g) (5), V04 §3.10, V04 §13, T-V4-76 (a)/(g), J-V4.128 and V06 §3.18.1 (4), W73 and the
    report comment.
  * §7.2's new dossier-over-lock rule (a protected dwelling's last household leaving by a `relet` down, never `vacate`d)
    reads V06 §3.5.1 (4) as V06 states it, `uses.heldByProtection` included (V06 l.747, l.1221).
* **The dig.** V07 §3.16 (i) and its combination row now cite V04 §3.5.7 (d) instead of restating it. V06 §3.18.1 (2a)
  agrees with V04's key, except V04's last clause (VAT0-01).
* **Catacombs and the underground.**
  * V04's new UC20 (a catacomb growing into a sewer: the growth never bent, the meeting opened by the overlap test in the
    growth's commit) agrees with V06 §3.18.1 (2b) ("`CatacombGrowth.grow` already run[s] for [its] own new … galleries").
  * The primary's tie by rank agrees in V04 §3.5.1 (5) and V06 §3.18.2 (3a).
  * The factored burial age agrees in V04 §3.5.5 (b) (1) and V06 §3.20.5 (4).
* **Walls over time (item 114).**
  * `walls.patchMaterials`' rows by kind agree in V11 §3.25.3, V06 §3.7.7 (3), V07 §3.4 (8), J-V7.135 and T-V7-62.
  * `repairWall`'s outcomes agree in §2.7 and V06 §2.8.
  * `conditionEpoch` is written by every writer as "the epoch in force at its event" (§2.7; V05 §3.16 (4); V06 §2.8).
  * The open point is the order across a replay prefix (VAT1-05).
* **Grandeur across a rung change (item 115).** V02's new *Over epochs* (V02 §3.2 (2), l.807-810) agrees with V06 §3.8.5 (1)–(2)
  and V07 §3.8: a crossing reshapes no standing building; new and rebuilt designs read the rung in force; the hand-off down
  keeps grander buildings.
* **Item 119 over time.**
  * V06 §6.8's one estimate for `advance` and the replay in total.
  * V01, V02, V03, V04 §6, V05 §6 and V07 §6 each time their epoch work "as V06's part of item 119 times it", with no
    second reading.
  * `epoch.costMs`, `advance.budgetMs` and `replay.budgetMs` appear in V06 alone. No member keeps the old `replay.epochCostMs`
    or the old budgets.
  * V06's village row reads TOWN's cost row, which bounds V07 §6's ≤ 60 ms epoch.
* **Item 120 over time.** V01 §5.4 (4), V03 §5.5 (3), V05 §5.6 (5) and V07 §5.5 (4) each re-evaluate the chips at every
  commit, regenerate, undo and epoch, and each keeps a chip whose target an epoch or a hand-off removed at count 0, dark.
  V07's hand-off down revives an end at its address, as V07 §3.12, l.634 and l.981 state.
* **The replay.**
  * §7.4's `epoch` row, *Replay semantics* and the creation-prefix paragraph (l.10705-10718) agree with V06 §3.20.3,
    §3.20.7 and §2.12's replay row.
  * §2.7's `HistoryRecord` agrees with V06 §3.20.6's writes.
  * `HistoryHint.peak` agrees with §4.11 (1) and V06 W83.
* **Hand-offs of this round to this lane's units.**
  * Closed at their destinations: V06's to V04 (VAT0-02's split, VAT0-19's wording); to V07 (VAT0-14); to pipeline
    (VAT0-07's §4.11 sentence); and determinism's to V06 (§3.5.1 (4) read as the dossier precedence asks).
  * Open, raised by peers: pipeline's to V06 (cite §4.11's `EpochInputs`, VPC-R1-20); V06's to scope (§16's M6-E price,
    VCS-08 / VCS-18); V06's to determinism (`raised.reason`'s citation).

## Not run

`docs/validation/bench/doc_checks.py` was not run. This seat writes no design text. The reference corpus is in any case
incomplete in this checkout (captures, research/patreon, research/devlogs, research/ftg-docs, research/external), so any
clean-room result here would be provisional.
