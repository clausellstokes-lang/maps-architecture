# Agreement check, round 5 — time and change (determinism, V06, V01, V02, V03, V04, V05, V07) after assemble-r5

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-agree-time-r5t; covered by the whole-design retrovalidation (J84).

> **PROGRESS** — [x] brief read whole · [x] resume check (fresh start) · [x] live files = assemble-r5's "after" sha256 · [x] round-4 finding VAT4-r4-01 re-checked against the live text, with its END lines · [x] round-5 blocks in scope re-read (diff 3310b538 → live) · [x] repair seats' HAND-OFFS for the members checked at their destinations · [x] peers' round-5 results read (17 seats, 63 issues) · [x] issues written · [x] result saved · [x] LANDED

## Scope and method

**Members:** determinism (base §5–§7), V06, V01, V02, V03, V04, V05 and V07. The base's §2.7, §3.2 (9), §4.11 and §13.2
are read where they carry a time-and-change subject the members share; V08 is read for the ends it carries. Every live
file equals assemble-r5's sha256 "after" column: base `2d84eac2…`, V01 `4585e1a5…`, V02 `fb46c676…`, V03 `3fe82c82…`,
V04 `b79fd290…`, V05 `171db651…`, V06 `6fb1f641…`, V07 `7747179d…`, V08 `8b5b5243…`. The commits after it touch only
logs and reports.

**Round-4 finding.** My one round-4 finding, VAT4-r4-01, is read against adjudication-r5's Part H ("FIX per R5-03";
VPC-R4-02 MERGED into it) and R5-03's text, with each END line's second end: §7.7 and §7.1 (determinism), V08 §3.6 (3),
(4), (6), §2.6, §3.17, §4.6 and T-V8-49 (g), and T76-1 (scope).

**Round-5 blocks.** I took the line diff of every member against the pre-round commit `3310b538`:
- base: 85 hunks;
- V01 6, V02 5, V03 6, V04 13, V05 5, V06 23, V07 28;
- read for the ends they carry: V08 29.

Every hunk on time and change was read with the whole subsection it lands in and its counterpart text in the other units:
- **the late change and the held calamity (R5-03):** §4.11 *The clock* (4); `EpochInputs`; §7.1's `dossierFacts`; §7.4's
  dossier row; §7.7's `DossierBinding.lateCalamities` and item 6; V08 §3.6 (1)–(6), §2.6's row, §3.17's row, §4.6's `late`
  variant, T-V8-49 (g); T76-1; V06 §3.3.1, §3.11.1–§3.11.2, §3.21's hazard rows, T-V6-27; V01 §3.16 (2);
- **walls and raised ways over epochs (R5-02):**
  - base: §2.7's support step (3), (6), (7), the `supports` comment and `RaisedFoot`; §3.2 (9); §4.11's carve, `wallToWay`
    and frame batches; §7.1's three bend rows; §7.3's S7 row; §7.4's raised-way row; T110-2, the item-114 group;
  - V06: W64, W68, `EpochScope.raised`, §2.10, §3.6 (4), §3.7.1, §3.7.2, §3.7.4 (4), §3.7.6 (5), §3.7.7, §3.19's lead and
    (5), §3.19.2, T-V6-11, T-V6-47, T-V6-65, T-V6-73, H-AQUA, §7's rows, J-V6.91;
  - other members: V04 §1b, §2.6, §3.5.0 *At an epoch*, §3.5.4 (d), (f), §3.10, §4.3, §6, T-V4-63, T-V4-65; V05 §3.16;
    V07 §3.5a, §3.12, §3.17's rows, T-V7-48;
- **the restoring re-cut's entry week (R5-04):** §6.3 *Plan damage*, §2.6 step 7; V02 §3.18, §5.7 (2), §7.8, T-V2-59;
  V03 §5.6, T-V3-39; V04 UE33; V06 §3.23 (3);
- **Find at a drawn week and its schedules (R5-05):** T-V1-59, T-V1-60, T-V3-39, T-V4-81, T-V5-36, T-V7-68, V07 §5.5;
  V06 §8's E-rows;
- **the village's crisis count and hand-over (R5-06):** V07 §4.5, §5.6 (1)–(7), §3.17's crisis rows, T-V7-69;
- **the frame growth after a change of frame law (VKr4-01):** §3.2 (9) (c), `Frame.marginShare`; V07 §3.2 (1), §3.12 (5).

**Hand-offs.** The HAND-OFFS of repair-r5-V01 … -V08, -determinism, -pipeline, -model, -kernel and -scope were read, and
each time-and-change end checked at its destination:
- **landed as cited:** scope's (T76-1 cites §4.11 (4) and §7.7's `lateCalamities`; T110-2 cites (6) (a)–(d) and (7));
  V06's (its citations of (3), (6) (d), (1) and (7) resolve); V07's (1) and (3) (the live base now carries R5-02's (6),
  and P1 names V07's trackers) and (2) (§12.5's ≈ 100 ms); V08's third (§7.7's comment agrees with V08 §3.6 (4));
- **open, now peer findings:** V02's (V03 §3.13's level-1 row: VAF-R5T-04); V04's (the arch vault's door under a later
  wall: VAL-R5-02); V06's first (V12's pin row: VAP-r5-03); pipeline's second (S5b's spawned radial on its own viaduct:
  VEW-r5-01); V08's first (the frozen manifest: VAP-r5-05).

**Peers.** The seventeen round-5 verifiers who landed before this seat (verify-vol-V03-V04-r5t landing while I worked)
raised 63 issues, and I read every one. Where one covers a defect in this lane I list it under *Confirmed peer findings*
and do not raise it again.

## Outcome

**2 issues: 0 blocker, 2 major, 0 minor.** Owners: V06 (with a V08 end) and model (with V06 and scope ends).

**Round-4 finding.** VAT4-r4-01 is **FIXED** per R5-03, at every site the ruling names, END lines included (table below).

**New this round:**
- **VAT5-r5-01 (major):** R5-03 applies a held late calamity's F5 targets at the absorb that holds it — ruined, finished —
  and lets the calamity strike at a later absorb's first epoch. V06 §3.11's "struck in place" mechanism assumes the
  reverse order (the hazard first, F5 then idempotent) and reads the F5 records from the strike epoch's own dossier
  events, which a held calamity's epoch does not carry. As written, the fire ignites at the already-ruined target and its
  `burn` takes that building from `ruined` back to `decayed` under a CHARRED Works; another builder skips ruined targets.
- **VAT5-r5-02 (major):** §2.7's support step (7), new this round, re-lays a frame growth's extension from the old deck's
  last interior station with fresh spans. The old end span's `state` and `held` `use` are lost, and the extension of a
  fallen or lapsed deck stands whole. V06 §3.19.2 raises a fallen span only by a repair whose reason is live (a declared
  way by hand only), and `spans[].held` is "an input override every regeneration keeps".

**What agrees** after round 5:
- the cadence for an absorb whose week passes `W₀`;
- the late non-calamity change at `W₀` + 1 or `W₀`, never before `W₀`;
- the held list's record, event field, fold and lifecycle (base §7, V08);
- the late calamity's fixture in T76-1 and T-V8-49 (g);
- the catch-up's coarse epoch, which carries a held or late calamity at its first week;
- the walls-over-epochs texts in V06, V04, V05 and V07 (save the peers' open cases);
- `EpochScope.raised` and its readers;
- the patch order by week;
- the restoring re-cut's entry week (save the peers' restatements);
- the drawn-week schedules at V06's E6;
- the frame growth that keeps the arena.

## Round-4 finding — verdict

| id | owner | ruling (adjudication-r5 Part H) | verdict | where (live) |
|---|---|---|---|---|
| VAT4-r4-01 | pipeline | FIX per R5-03 (closes VPC-R4-02) | **FIXED** | §4.11 *The clock* (4) l. 8475-8487 — R5-03's text verbatim (the late change never before `W₀`; the late calamity on the absorb's first epoch at `W₀` + 1 where `W₁` is after `W₀`, else its F5 targets applied at `W₀` and the calamity held in `DossierBinding.lateCalamities` until a later absorb's first epoch; the population move at the next absorb past `W₀`); §7.7 l. 11825 (`lateCalamities: string[]`, "[] in an older document"); §7.1 l. 10357 (`dossierFacts.lateCalamities`); §7.4 l. 11228 (rebuilt by the fold, no undo); §7.7 item 6 l. 12017-12018; V08 §3.6 (3) l. 1868-1875, 1890-1895, (4) l. 1903-1908, (6) l. 1944-1947; §2.6 l. 1292; W20 l. 248; §3.17 l. 2698 (the degenerate row split as R5-03 words it, VV78-r4-04's `W₁`-after-`W₀` row added); §4.6 l. 2957; T-V8-49 (g) l. 3311; T76-1 l. 18235-18244 (scope's END, "a second absorb in the last epoch's own week … its deaths in that epoch's burial need"; "the document's current week never before it") |

`W₀` + 1 is the first week of the held calamity's epoch only while no other epoch has folded since. Every site that states
the week reads "that epoch's first week" for the held case and "`W₀` + 1" only where `W₁` is after `W₀`. So the base,
V08, T76-1 and T-V8-49 (g) agree.

## Issues

### VAT5-r5-01 — MAJOR EDGE-UNDEFINED (owner: V06; END under V08)

**Where.**
- §4.11 *The clock* (4) l. 8480-8484 (R5-03);
- V08 §3.6 (3) l. 1870-1875, 1889-1897; T-V8-49 (g) l. 3311;
- V06 §3.11.1 l. 2080-2090, §3.11.2 (1) and (3) l. 2099-2122, §2.8's `burn` l. 720, §3.21's hazards row l. 3293,
  T-V6-27 l. 4150;
- F5 l. 12205 and §4.11 l. 8588 ("present as its ruin — its use closed, its building `ruined`").

**What the set says.**
- **The base and V08 (R5-03).** Where the absorb's week is not after `W₀`, "the calamity's F5 targets' dossier events apply
  now at `W₀` as element events, finished (no Works), and the calamity is held … until the first epoch a later absorb
  folds, which it rides at that epoch's first week. Either way … its hazard strikes and its deaths reach the burial need."
- **V08 §3.6 (3).** The held calamity's F5 events ride the epoch's `EpochInputs.dossier` "where `W₁` is after `W₀`" only.
  So the held calamity's epoch carries no F5 record of it.
- **V06 §3.11.1.** "A calamity's targets are struck in place: the hazards phase reads the epoch's dossier events for the F5
  records tied to the calamity, and exempts those targets' uses from relocation — they close as ruined where they stand
  …, and the `dossier` phase's F5 then finds a building already struck, which is idempotent." That is written for one
  order: the strike first, F5 after it, both in one epoch.

**Why it matters.**
- **The held case runs the other order.** F5 has already made each target `ruined`, with its use closed and no Works, at
  the absorb that held it. Weeks or months later the hazard strikes in an epoch whose dossier events hold no F5 record of
  it. Nothing says what the strike does to targets already ruined.
- **As written, the fire undoes the ruin.**
  - The calamity's place is its targets' centroid (V06 §3.11.1).
  - A fire ignites at "the building there, else the nearest within 30 m" (§3.11.2 (1)). That is a target already
    `ruined`, and spread counts any "unburnt, unprotected neighbour", so ruined targets catch too.
  - `burn` sets "existence → 'decayed' with Works kind 'decay', stage CHARRED" (§2.8). So a dossier ruin goes back to
    `decayed`, and a new decay run starts at the later epoch. That breaks §2.6 step 7's rule that a level never falls while
    the building stays abandoned, decayed or ruined.
- **Another builder skips ruined buildings.** Ignition then moves to the nearest live building, the targets are never
  charred, and the struck set and the `maxBuildings` count differ.
- **The grade.** Two builders, two behaviours, on the path R5-03 itself defines (a calamity recorded in the week of the
  last sync). No bar runs it: T-V8-49 (g) and T76-1 assert only "the calamity's strike at its first epoch's first week",
  and T-V6-27 runs only on-time calamities.

**Required change.**
- **V06 §3.11.1.** After "…which is idempotent." add:

  > A calamity held late (`DossierBinding.lateCalamities`; §4.11 *The clock* (4)) rides a later epoch whose dossier events
  > hold no F5 record of it, its targets applied at the absorb that held it, ruined and finished (V08 §3.6 (3)): the
  > hazards phase reads its targets from its `CalamityRef.targets`, places it at their centroid as any calamity, and
  > strikes them by no op — each target building keeps `ruined` (its use already closed, never relocated, never taken
  > back to `decayed`, no Works) while counting as struck: a fire's ignition is the target nearest the place and its
  > spread starts from every target as a burning building, each counted toward `maxBuildings`; a flood's or a quake's
  > struck set and count include them likewise; every other building is struck by the hazard's own rule, and its
  > `deaths` reach that epoch's burial need (V06 §3.18.2).

- **V06 §3.21's hazards row** (l. 3293) adds the input "a held late calamity whose targets are already ruined" with the
  outcome "its targets kept `ruined`, struck by no op, the hazard spreading from them (V06 §3.11.1)".
- **T-V6-27** adds: "and a calamity held late by a second absorb in the last epoch's own week (V08 T-V8-49 (g)'s case): at
  the later absorb's first epoch its targets stay `ruined` with no op on them, its fire spreads from them to their live
  neighbours, and its deaths are in that epoch's burial need".
- **END under V08.**
  - §3.6 (3)'s "so V06's hazard phase strikes them in place" adds "(a held one's targets, applied at the absorb that held
    it, struck by no op, V06 §3.11.1)".
  - T-V8-49 (g)'s "the calamity's strike at its first epoch's first week" adds ", its targets kept `ruined`".
- **If the adjudicator rules the other order instead** (a held calamity's F5 events held with it, to ride its epoch's
  `EpochInputs.dossier` at that epoch's first week), §4.11 *The clock* (4), V08 §3.6 (3), §3.17's row and T-V8-49 (g)
  change in its place. In that case the dossier's ruined records stand unmet on the map until that epoch, and §5.3's
  coherence row must name the held case as an exception.

### VAT5-r5-02 — MAJOR DISAGREE (owner: model; ENDs under V06 and scope)

**Where.**
- §2.7's support step (7) l. 2623-2628 (new this round, R5-02 (7));
- `RaisedWayRecord.spans[].held` and `.state` l. 2293-2294, `supports[].state` l. 2292;
- `RaisedFoot`'s comment l. 2312-2318; §3.2 (9); §4.11's frame batches l. 8521-8523;
- V06 §3.19's lead l. 2742-2745, §3.19.2 (1) l. 2898-2900 and (5) l. 2941;
- T110-2's frame-growth clause l. 18467-18469.

**What the set says.**
- **(7).** It "keeps every station of the old deck — its key, position and support `ring` — and every span between two of
  them as it stands (`use`, `reason`, `state`, `held`)". It then runs "(1)–(5) and the span rule … on the extension
  alone, from the old deck's last interior station (with none, from its other foot) to the deck's new end on the new
  ring".
- **So the old end span is laid again.** That is the span from the last interior station to the ring-end foot, or a
  one-span deck's only span. It and every span beyond it come out of the span rule with no `state`, which means standing.
  The old end span's `state` and its `held` `use` are not carried over.
- **The station's `state` is not on the kept list either.** The list names a station's key, position and ring, but not its
  support's `state` (`ruined` or `cleared`).

**Why it matters.**
- **V06 raises a fallen span only by a repair.** V06 §3.19.2 (5) repairs a generated way only "whose reason is live again",
  by `repairRaised`. A declared way "breaks only by a hazard or the landfall, and the user repairs it by hand"
  (§3.19.2 (1), item 101 R13).
- **The frame growth bypasses that.** An aqueduct sourced beyond the frame (the common case for a ring-end foot) may have
  its end span ruined by its lapse, a topple or a landfall before an epoch's rung crossing grows the frame. The growth then
  stands that arch again and lays a standing extension on a lapsed deck, with no repair, no reason and no event naming it.
- **A user's hold is lost.** A user's `setAttr` on that span's `use` is `held` — "an input override every regeneration
  keeps (§7.2)". The extension drops it, re-ruling the span by the span rule.
- **Two builders, two behaviours.** One follows (7) literally (standing, the hold lost). One carries the end span's
  condition onto the extension. Where the station's `state` is concerned, one keeps it and one resets it.
- **The grade.** No bar runs a frame growth over a fallen or held end span. T110-2's frame-growth clause and T-V4-65 run a
  standing aqueduct.
- **A related peer finding.** VV34-r5-02 (V04, minor) notes that the old end span is laid again, and asks only for the
  vault wording in T-V4-63. The two can be fixed together.

**Required change.**
- **§2.7's support step (7).**
  - "keeps every station of the old deck — its key, position and support `ring` —" → "keeps every station of the old deck
    — its key, position, support `ring` and `state` —".
  - After "…its stations' keys minted after the largest the way has held ((5))" add:

    > ; the deck's condition at the old ring carries over: each span the extension lays takes the old end span's `state`
    > (a `ruined` or `cleared` end span leaving each new span `ruined` or `cleared`, so only a repair raises it — V06
    > §3.19.2 (5)'s for a generated way, a hand Repair for a declared one, V06 §3.19.2 (1)) and, where that span's `use`
    > was `held`, the same `use` held (an input override the extension keeps as a regeneration does, §7.2), its new
    > supports standing (supports outlast spans, V06 §3.19.2 (3)); with no interior station, the one old span is that end
    > span

- **The comments.** `RaisedFoot`'s comment "(the old deck's stations kept, the support step's (7))" and §4.11's "the old
  deck's stations kept (§2.7's support step (7))" each read "the old deck's stations kept and its end span's condition
  carried (§2.7's support step (7))".
- **END under V06.** §3.19's lead "a frame growth's extension of its deck (§3.2 (9), the old deck's stations kept, §2.7's
  support step (7))" → "a frame growth's extension of its deck (§3.2 (9), the old deck's stations kept and its end span's
  condition carried, §2.7's support step (7))".
- **END under scope.** T110-2's frame-growth clause, after "every station of the old deck at its key, position and ring
  after the growth (§2.7's support step (7))", adds "and, on the same aqueduct with its end span on the old ring `ruined`
  by its lapse and, on a second run, with that span's `use` held by a user's `setAttr`, every span the extension lays
  `ruined` and, on the second run, carrying the held `use` — no fallen arch standing again and no hold lost".

## Confirmed peer findings (not raised again; confirmed in the live text)

* **The held late calamity (R5-03):**
  - VV78-r5-01 (pipeline) — a detached what-if copy keeps `lateCalamities`, with no epoch that ever carries or clears it;
  - VAF-R5T-01 (V01) — V01's "carried with no event (dated at or before the last absorbed week)" gloss at four sites;
  - VV78-r5-02 (V08) — the `late` variant's "shows it as already finished" said of a late calamity;
  - VV78-r5-04 (V08) — the batch rows omit the late calamity's F5 events riding the epoch;
  - VV78-r5-05 (V08) — §3.17's year-end target restated narrower than §3.6 (3).
* **Walls and raised ways over epochs (R5-02):**
  - VEW-r5-02 = VV56-r5-02 (model) — a later wall run when a support, span or `vault` it was built against goes;
  - VEW-r5-03 (model) — a raised way created across a breached or dismantled run;
  - VM-R5T-02 (model) — a crossing station after its stretch is taken whole;
  - VEW-r5-04 (model) — the crossing station at a regeneration;
  - VDC5-04 (V06) — V06 §3.7.2 (1)'s gate opening on a raised gate;
  - VPC-R5-02 = VV56-r5-01 (pipeline) — `wallToWay`'s road against the kept tower and the supports a later wall took in;
  - VEW-r5-05 (pipeline) — a raised gate whose deck is gone;
  - VAL-R5-01 / VAL-R5-03 (model, V07) — the carried-down crossing station on the palisade;
  - VAL-R5-02 (model) — the arch vault's door under a later wall (V04's open hand-off);
  - VV34-r5-02 (V04) — T-V4-63's frame-growth vaults (see VAT5-r5-02);
  - VV56-r5-04 (V06) — T-V6-11's and T-V6-73's topple clauses scheduled at E3, before E5 builds `topple`;
  - VAP-r5-03 (V12) — the `item110.*` pin row's H-AQUA suite.
* **The restoring re-cut's entry week (R5-04):**
  - VAL-R5-04 (V04);
  - VV34-r5-03 (V04);
  - VAF-R5T-04 (V03);
  - VAF-R5T-05 and VV34-r5-04 (V03);
  - VRC5T-03 (scope);
  - VV12-r5-02 (V02) — the reoccupied house's minted rooms need V06's E2.
* **Find at a drawn week (R5-05):** VAP-r5-01 and VRC4T-04 (scope) — R12-35 and T120-6 lack the drawn-week timing.
* **The village's crisis readers (R5-06):** VV910-r5-03 (V07); VAP-r5-04 (V07).

## Checked and agreeing

* **The late change (R5-03).** No late change ever folds before `W₀` at any of these sites:
  - §4.11 *The clock* (4) l. 8475-8487;
  - V08 §3.6 (6) l. 1944-1947 and §3.17 l. 2698;
  - §7.7 item 6 l. 12017-12018;
  - T76-1 and T-V8-49 (g).

  So the current week of (1) (l. 8453) never falls back.
* **The held calamity's record.** It is consistent across the base and V08:
  - §7.7's field, `[]` in an older document;
  - §7.1's event field, the whole list after the absorb;
  - V08 §3.6 (4)'s list arithmetic: the binding's list, less what the first folded epoch carries, plus what this absorb
    holds;
  - V08 §2.6's lifecycle row and §7.4's dossier row (rebuilt by the fold, no undo target).
* **What a held calamity cannot lose or lack.**
  - Its carried fact cannot vanish, since a calamity leaving the capped list is never undone (V08 §3.5's table, J-V8.54).
  - Only the port folds a bound map's epochs, since `advance` is refused (V06 §3.3.1, J-V6.2). So "the first epoch a later
    absorb folds" is well defined on the map itself (the detached copy is VV78-r5-01).
* **A coarsened catch-up.** It carries a held calamity on its first coarse epoch at that epoch's first week (§4.11 (4);
  V06 §3.3.1, §6.8 (6); J-V6.136). Its numbers are unchanged from round 4: `b` 150 / 500 ms, `a` 3 / 3.5 ms, one epoch
  ≈ 5.8 s ≤ 6 310 ms.
* **Walls over epochs (R5-02's V06, V04, V05 and V07 ends).**
  - V06: §3.6 (4), §3.7.1, §3.7.4 (4), §3.7.6 (5)'s bullets, §3.19's lead and (5), W64, W68, `EpochScope.raised`, §2.10,
    T-V6-11, T-V6-47, T-V6-73, §7's rows and J-V6.91 read R5-02's rule;
  - V04: §1b, §2.6, §3.5.0, §3.10, §4.3, §6, T-V4-63 and T-V4-65 drop the "trace's crossing station" trigger and keep the
    one trigger;
  - V05: §3.16's landfall over a crossing station stands;
  - V07: §3.5a (3)–(4), §3.17 and T-V7-48 read the palisade as a wall laid after.

  The open cases are the peers' (above).
* **The held stretch over epochs.** §2.7 (3) and V06 §3.7.2 (2), §3.7.7 (2) and §3.7.6 (5) agree:
  - the held stretch is filtered before the draw while its deck stands;
  - it is taken from the first epoch after its release;
  - the fortification loop keeps the record after `wallToWay` and `absorbWall` while such a stretch stands;
  - §4.11's `wallToWay` and §7.1's `bend.wall.held` leave it as a free-standing tower or arch.
* **The frame growth that keeps the arena.** §3.2 (9) (c) (VKr4-01, amended) agrees with V07 §3.2 (1) and §3.12 (5) (the
  territory frame grows at an epoch and never shrinks). It also agrees with `Frame.marginShare`'s new comment.
* **The patch order.** It still runs by `EpochRecord.inputs.week` in V06 §3.7.7 (3), T-V6-73 and T114-4.
* **The decay level and the restoring re-cut.** §6.3 *Plan damage* (R5-04) agrees with §2.6 step 7, V02 §5.7 (2) and
  §3.18, V03 §5.6 (2), V06 §3.23 (3) and T-V2-59 (c). The restatements still to conform are the peers'.
* **The drawn-week schedules.** T-V1-60, T-V3-39 (and V03's P4 cell), T-V4-81 (j), T-V5-36 (f), (i) and P3, and T-V7-68 each
  land their drawn-week or `advance` clause at the later of their own milestone and V06's E6. V06 §8 puts the history
  frames and `advance` on T1 at E6, and its provenance at E5.
* **The village's crisis hand-over.** V07 §5.6 (3) and (4) read V06 §3.22 (3)'s `crisisLookYields` with a preview never
  handing over, and V07 §3.17's hand-off row reads the rung in force. This agrees with §10.2 (f) and V01 §3.16 (5).
* **Owner items.**
  - Item 126 (a2): no phone, narrow-class or bottom-sheet clause in determinism (§5–§7) or V01–V07's round-5 hunks.
  - Item 125: the dossier is the only data input — the held list is the dossier's own events folded, and no host clock is
    read (R5-03's check).
  - g items 114–119 and their canon routings: unchanged by this round's time hunks.

## Not run

`docs/validation/bench/doc_checks.py` was not run. This seat writes no design text, and the reference corpus is incomplete
in this checkout, so any clean-room result here would be provisional.
