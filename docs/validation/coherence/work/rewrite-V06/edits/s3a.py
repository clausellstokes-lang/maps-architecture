from lib import *
t = extract(971, 1226)
R = [
# §3.1
("own rung row at the edge of its range inside the band; ST-01, J-V6.97), the household ledger empty.",
 "own rung row at the edge of its range inside the band; J-V6.97), the household ledger empty."),
("whatever the epoch's product — a scoped participant gates itself, §2.1's `EpochParticipant.run`; TW-08) in",
 "whatever the epoch's product — a scoped participant gates itself, V06 §2.1's `EpochParticipant.run`) in"),
("of this one event (§3.3), each through the same operator", "of this one event (§3.3's batches), each through the same operator"),
("never re-founded: its key is suppressed in every generator (V06 §3.19.3; ST-15). The filter runs before the draw, so a protected entity",
 "never re-founded: its key is suppressed in every generator (V06 §3.19.3). The filter runs before the draw, so a protected entity"),
("nothing else — no view key, no wall clock, no host call; so a replay reproduces every epoch (§6.2 *Histories, not states*).",
 "nothing else — no view key, no wall clock, no host call; so a replay reproduces every epoch (§6.2 *Histories, not states*).\n\n**Replay epochs.** A coarse epoch of the history replay at generation (item 113) is an epoch of this runner, its inputs\nbuilt from the replay plan instead of the port or a trajectory; V06 §3.20.4 lists the few things that differ."),
# §3.2 table
("| 2 | `hazards` | — (rung 3's destructive trigger) | the calamity table's hazard events (F5 targets struck in place), timeline events and spontaneous hazards: `burn`, `inundate`, `topple`; `raiseGrade` after a great fire or flood; households into the ledger | V06 §3.11 |",
 "| 2 | `hazards` | — (rung 3's destructive trigger) | the calamity table's hazard events (F5 targets struck in place), timeline and replay events and spontaneous hazards (none in a replay epoch): `burn`, `inundate`, `topple`; a replay's destruction (V06 §3.20.5); `raiseGrade` after a great fire or flood; households into the ledger | V06 §3.11, §3.20 |"),
("(V01 §3.7.3; an edited `surface` kept; V06 §3.4 (9); SCC-95) (base; V01) | V06 §3.4 + base + V01 |",
 "(V01 §3.7.3; an edited `surface` kept; V06 §3.4 (9)); the water pull and the water term weighted by each spring's `flow` (§4.4, §4.5) | V06 §3.4 + base + V01 |"),
("(V07 §3.12; each gating itself by its scope, the table below; TW-08) | V05 + V07 |", "(V07 §3.12; each gating itself by its scope, the table below) | V05 + V07 |"),
("| 8 | `decline` | (c), second half | the strike lottery over building,", "| 8 | `decline` | (c), second half | the strike pool over building,"),
("| 10 | `terrainWater` | — | the base's trigger rows on V06's candidates | V06 §3.12 |",
 "| 10 | `terrainWater` | — | the base's trigger rows on V06's candidates; the spring row (a failing or recovering spring, its gardens and grove) | V06 §3.12 |"),
("| 12 | `dossier` | (e) | the dossier events carried by the epoch (base) — each `assign` the step places — a record it adds, a member a count step adds, or the greater a REPLACEMENT re-key places new (V08 §3.5.1 (c)'s second and third cases, (d); V07 §3.12 item 4; SR5-02) — offered first, at an epoch whose product declares one, to the product's `records` placement (V06 §2.1's `ProductDeclEpoch.records`; V07's `village.records` at a village rung, V07 §3.12), which places it or declines it to the base's placement (§7.7's *One path* sentence; TV-02) — a re-key whose greater keeps the lesser's thing (V08's first case) is a `rebind`, never offered to the placement and never placed (V06 §3.9.11's in-place `convert`; seam TX-06) — keyed by the adding event's `seq` (TW-01), and each record the step removes handed, after the base's removal (§7.7 item 2's `closeUse`), to that placement's `remove` (TW-02) — then V06's readings of them: the ladder steps (V06 §3.9.11), `activeChains` re-bound (V06 §3.9.10 (5)), a walls record's circuit trigger (V06 §3.7.6 (4)), a see's crypt (V06 §3.18.3 (1)) | base + V6 |",
 "| 12 | `dossier` | (e) | the dossier events carried by the epoch (base), each `assign` the step places offered first to the epoch product's `records` placement as §4.11 (e) states (V06 §2.1's `ProductDeclEpoch.records`; V07's `village.records` at a village rung, V07 §3.12) — a re-key whose greater keeps the lesser's thing (V08 §3.5.1 (c)'s first case) being a `rebind`, never offered and never placed (V06 §3.9.11's in-place `convert`) — keyed by the adding event's `seq`, each removed record handed after the base's removal to that placement's `remove`; then V06's readings of them: the ladder steps (V06 §3.9.11), `activeChains` re-bound (V06 §3.9.10 (5)), a walls record's circuit trigger (V06 §3.7.6 (4)), a see's crypt (V06 §3.18.3 (1)); in a replay epoch, the replay's class requests (V06 §3.20.3) | base + V06 |"),
# participants
("""| `afterField` | 0 | `sky.islands` | `@plat/sky` | V05's `IslandEpochStep` (V05 §3.15), whose conversions are **every island event an epoch can run**, at every rung where an island stands (TOWN's carried or declared islands included): a **raise** (`raiseIsland`, V05 §3.15 (5): S7b's delta fill for the sky, SKY's island steps on the new arena and its districts laid by volume 1's unit run inside the epoch's commit, V01 §3.10.3 (6) (a)); a **resize** (`resizeIsland`), growing or shrinking — a floating island toward its target (V05 §3.15 (2)), a waning one toward half its area at every epoch of its dwell (V05 §3.15 (3), (6)) — with V05 §4.2's whole resize in its own batch: the rim's L1 pieces re-laid (the strip, each landing yard re-claimed at its re-seated top and served), each foot re-landed as a move re-lands it (a foot that leaves its landing plot closes that plot's `sky_landing` use and opens one on the plot under the new foot), the institution claim kept or re-searched (its district re-derived), a shrink's half-lost plots cleared and the rest re-cut, a growth's receiving districts re-derived by their scoped re-derivation (§12.6; V01 §3.10.3 (6) (c)), and volume 1's `plantRimWalk`; a **wane**, a **settle** and a **refloat** (`waneIsland`, `settleIsland`, `refloatIsland`, V05 §3.15 (2)–(4)), and the institution's re-reasoning (a `relocate` or a `relet`, V05 §3.15 (1b)); and a **fall** (`fallIsland`, V05 §3.15 (4), §3.16) with its landfall — each priced per event in V06 §6.2 at V05 §6's row for it (SLR3-11, TU-06 (a); TV-01, SLR4-09) |""",
 """| `afterField` | 0 | `sky.islands` | `@plat/sky` | V05's `IslandEpochStep` (V05 §3.15): **every island event an epoch can run**, at every rung where an island stands (TOWN's carried or declared islands included) — a raise (`raiseIsland`, V05 §3.15 (5), its districts laid by V01's unit run inside the epoch's commit, V01 §3.10.3 (6) (a)); a resize (`resizeIsland`, V05 §3.15 (2), (3), (6), V05 §4.2's whole resize in its own batch, the receiving districts re-derived by their scoped re-derivation, V01 §3.10.3 (6) (c)); a wane, a settle and a refloat (V05 §3.15 (2)–(4)); the institution's re-reasoning (V05 §3.15 (1b)); a fall with its landfall (`fallIsland`, V05 §3.15 (4), §3.16) — each priced per event in V06 §6.2 at V05 §6's row for it |"""),
("| `afterField` | 20 | `village.density` | `@plat/village` (scope: a document holding a superseded `VillagePlan`, under any product; ST-28) |",
 "| `afterField` | 20 | `village.density` | `@plat/village` (scope: a document holding a superseded `VillagePlan`, under any product) |"),
("V04 §3.10's one order (TR-18): **first, the foundations over the epoch's scope** — V04's `Foundations.apply(doc, scope, cause)` (V06 §3.18.1 (6); ST-20); **then `ArchVaults.reconcile(doc, scope.raised, epoch)`** — the reconcile (below);",
 "V04 §3.10's one order: **first, the foundations over the epoch's scope** — V04's `Foundations.apply(doc, scope, cause)` (V06 §3.18.1 (6)); **then `ArchVaults.reconcile(doc, scope.raised, epoch)`** — the reconcile (below);"),
("at the wall crossings of the ways in `scope.levelled` (critique-V4 C4-110-7);", "at the wall crossings of the ways in `scope.levelled`;"),
("**At a village rung, V04's maintenance mode** (V04 §3.1; ST-18):", "**At a village rung, V04's maintenance mode** (V04 §3.1):"),
("to ask for it; ST-18) |", "to ask for it) |"),
("(V06 §3.18.1 (4); ST-19) |", "(V06 §3.18.1 (4)) |"),
("(`scope.recut`) (V01 §3.3.6 (1)–(2), §3.5.11; ST-54); and the districts", "(`scope.recut`) (V01 §3.3.6 (1)–(2), §3.5.11); and the districts"),
("the strip's plots and households are V06 §3.19 (7)'s clearing (ST-53), logged in the epoch's diff |", "the strip's plots and households are V06 §3.19 (7)'s clearing, logged in the epoch's diff |"),
("| V05's clearance rule after growth (BCR-V5-28; critique-V5 C5-47 (3)): over every live island,", "| V05's clearance rule after growth (V05 §3.15 (7); V05's request, carried by this table): over every live island,"),
("(V07 §3.12 *Pins over epochs*; TV-03) |", "(V07 §3.12 *Pins over epochs*) |"),
("""**The arch-vault reconcile** (`ArchVaults.reconcile`, V04 §3.5.4 (d); in `under.extend` after the foundations and before the sewer's extension so its new chambers are in `scope.elements`
for `under.access` at order 20 in the same epoch, item 109 (3b)). For every raised way in `scope.raised`, in address
order, V04's arch-vault source (critique-V4 C4-110-1) is brought to the way's present state: a chamber is laid for each
standing span whose use is `vault` and which has none (a new part, a repaired span), a chamber under a span whose
`state` is `ruined` or `cleared` is collapsed (V04's `collapse`), and every chamber of a removed way is deleted with its
links and accesses (C4-110-3). The breach, dismantle and removal ops already collapse or delete their chambers in their own
batch (item 291), and the hand operator lays a new part's chambers in its commit, so the reconcile finds nothing to do on
those paths — it is the one epoch-side guarantee that no chamber stands under a fallen span and every `vault` span has
its chamber, whatever op changed the way.""",
 """**The arch-vault reconcile** (`ArchVaults.reconcile`, V04 §3.5.4 (d), which states what it lays, collapses and deletes)
runs in `under.extend` after the foundations and before the sewer's extension, so its new chambers are in `scope.elements`
for `under.access` at order 20 in the same epoch (item 109 (3b)), over the raised ways in `scope.raised` in address order.
The breach, dismantle and removal ops collapse or delete their chambers in their own batch (item 291) and the hand operator
lays a new part's chambers in its commit, so on those paths the reconcile finds nothing to do: it is the one epoch-side
guarantee that no chamber stands under a fallen span and every `vault` span has its chamber, whatever op changed the way."""),
("with the `ProductEpochContext` the grow path fills (V06 §2.1; V07 items 202, 317; seam TX-02) — so the adapters",
 "with the `ProductEpochContext` the grow path fills (V06 §2.1; items 202, 317) — so the adapters"),
("V04's maintenance mode — it silts and caves in by `under.fade`, never extends (ST-18). The first epoch",
 "V04's maintenance mode — it silts and caves in by `under.fade`, never extends. The first epoch"),
# §3.3
("""S2), epoch `i` (1 … n) sits at `W_i = W0 + min(i × cadenceWeeks, spanYears × 52)` (integer weeks; `spanYears × 52` rounded
half-up to a whole week), with `f_i = (W_i − W0) ÷ (W_n − W0)` and:""",
 """S2), epoch `i` (1 … n) sits at `W_i = W0 + min(i × cadenceWeeks, spanYears × 52)` (integer weeks; `spanYears × 52` rounded
half-up to a whole week), with `f_i = (W_i − W0) ÷ (W_n − W0)` and:
* **degenerate requests** (each a bend named in one line, item 101 R2; never a refusal): a span shorter than half a week
  takes one week (`W_n = W0 + 1`, so `f_i` is defined); a cadence below one week, or not a whole number, takes
  `max(1, ⌈cadenceWeeks⌉)` weeks; a `points` list is sorted by week, a repeated week keeps the last given point, and a
  point at or before `W0` only fixes the value held before the first later point; a `rate` with `perYear ≤ −1` empties the
  town at the first epoch (population 0 before the clamp below); a negative `target` or point population reads as 0. A
  non-finite number never reaches the engine: the tool API's request schema rejects it (§11.2), as it rejects any
  malformed request;"""),
("""The town that results is a history, not the one-click town at that size (J-V6.4); both are offered.""",
 """The town that results is a history, not the one-click town at that size; both are offered, and a town with a known or
declared history is generated as that history instead (V06 §3.20)."""),
# §3.4
("""Walls,
   towers, the castle, islands, raised ways and retaining walls are the base's casters (item 102's list, extended by the
   coherence pass for item 110), not repeated here.""",
 """Walls,
   towers, the castle, islands, raised ways and retaining walls are the base's casters (item 102's list with item 110's
   raised ways and retaining walls), not repeated here."""),
("— the unlevelled\n   heights (critique-V5 C5-54 (1)); levelled platforms", "— the unlevelled\n   heights; levelled platforms"),
("""`c` the sampler's cap (8; item 296 (i), V05
   §3.19 (1)) read from the sampler, never a row of this volume — **one reach law** for every caster, the same as V05's
   island strips (C5-31; ST-46: no absolute distance cap, so a 90 m spire at the lowest sample reaches 720 m on both sides). The bit is written to the mask (V06 §2.6).""",
 """`c` the sampler's cap (item 296 (i), V05
   §3.19 (1)) read from the sampler — **one reach law** for every caster, the same as V05's island strips, with no
   absolute distance cap. The bit is written to the mask (V06 §2.6)."""),
("— a rising or a falling building changes\n   `heightsAt` between two weeks with no event (C6-12).", "— a rising or a falling building changes\n   `heightsAt` between two weeks with no event."),
("and\n   the lag survives a save and a load (C5-01).", "and\n   the lag survives a save and a load."),
("and is OR-ed into V05's `shadeSky` receivers (C5-32), so a manor", "and is OR-ed into V05's `shadeSky` receivers, so a manor"),
("(V05 §2.1's optional `shadeBasis`, J-V5.72; TR-16).", "(V05 §2.1's optional `shadeBasis`, J-V5.72)."),
("9. **Way surfaces** (V01 §3.7.3's epoch clause; V11 row 90's `S6` reader; SCC-95; J-V6.121).", "9. **Way surfaces** (V01 §3.7.3's epoch clause; V11 row 90's `S6` reader; J-V6.121)."),
]
t = apply(t, R)
t = t.replace('(V06 §2.1; TW-08, J-V6.124)', '(V06 §2.1; J-V6.124)')
t = strip_narr_ids(t)
save('06-s3a.md', t)
print(words(t))
