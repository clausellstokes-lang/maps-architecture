from lib import *
t = extract(1934, 2137)
R = [
("**3.10.1 Creation** (item 266 states this in the base's *The epoch-spread mutation*).", "**3.10.1 Creation** (§4.11 *The epoch-spread mutation*, item 266)."),
("(V11's cathedral and great-temple rows; `crypt: 'always'`, J-VI.17 H34) the crypt is laid at the occupy step",
 "(V11's cathedral and great-temple rows, the `crypt: 'always'` column; J-VI.17) the crypt is laid at the occupy step"),
("or a stone bridgehead, still stops the fire (C6-48).", "or a stone bridgehead, still stops the fire."),
("building's is its deck's surface (V02 §3.16 (5)) and a terrace building's its platform (C6-48); the raw ground cell under",
 "building's is its deck's surface (V02 §3.16 (5)) and a terrace building's its platform; the raw ground cell under"),
("never break this way. **Underground** (ST-45): every gallery", "never break this way. **Underground**: every gallery"),
("**3.11.6 Raising the ground after a great fire or flood** (II.7.6's `raiseGrade`, \"applied by an epoch\"; C6-18).",
 "**3.11.6 Raising the ground after a great fire or flood** (II.7.6's `raiseGrade`, \"applied by an epoch\")."),
("### 3.12 Terrain and water over epochs (item 25)", "### 3.12 Terrain and water over epochs (items 25, 111 (b))"),
("(its bridges stand over still water until the lottery's `deck` candidate clears them", "(its bridges stand over still water until the strike pool's `deck` candidate clears them"),
("(a raised way's deck, supports and spans), retaining walls and decks** (C6-44; J-V6.90):", "(a raised way's deck, supports and spans), retaining walls and decks** (J-V6.90):"),
("   **A chained Works that has not started when a later change reaches its target is removed** (C6-36):", "   **A chained Works that has not started when a later change reaches its target is removed**:"),
]
t = apply(t, R)
SPRING = """
**3.12.1 Failing springs and oases (item 111 (b)).** A spring is a `WaterBody` carrying `spring` (§2.3); its `flow`, a share
of its full flow in (0, 1], weights its water pull on the growth field (§4.2 S3 (6), §4.4) and the prosperity field's water
term (§4.5). The `terrainWater` phase's **spring row** visits every spring of the ground arena in address order (a sky
island's water is V05's: item 111 does not apply there), after the base's trigger rows:
1. **The inputs over the span** (`y` = the epoch's years). `d` = the drought years of the span — the years `(prevWeek,
   week]` covered by a `ConditionOverlay` of archetype `drought` (the dossier's, DR21), by an `EpochInputs.events` entry
   of kind `drought` (V06 §2.4's row: a timeline or `advance` event) from its week for `params.years` (default 1), or by a
   replay epoch's `condition` effect of archetype `drought` (V06 §3.20.3), their union clipped to the span. `H_s` = the households whose dwelling lies within the
   climate row's pull radius of the spring point (the radius S3 (6)'s `q(x)` falls to 0 at); the over-draw `o = max(0,
   H_s ÷ (spring.fullHouseholds × flow) − 1)`.
2. **The new flow** (through `dmath`, no draw): `f₁ = flow × (1 − spring.droughtLoss)^d`; then, over the `y − d` other
   years, `f₂ = f₁ × (1 − spring.overdrawLoss × min(1, o))^(y − d)` while `o > 0`, else `f₂ = min(1, f₁ +
   spring.recoverPerYear × (y − d))`; the result floored at `spring.floorFlow` (0.05: a seep, never 0, §2.3's open
   interval). **The dossier governs its own oasis** (DR40; item 20): while the dossier lists the `oasis_water` deposit as
   available the flow never falls below `spring.failFlow` (the map never makes the dossier's oasis fail); a deposit turned
   `depleted` or `removed` sets the flow to `spring.floorFlow` at the dossier event's week; one available again restores
   it to `spring.failFlow` at once, recovering by the rule above. A `flow` a hand `setAttr` set (T2 `ground`'s spring form,
   §7.1) is a declaration and is held (§7.2): the row never overwrites it, and a locked or pinned spring is skipped.
3. **The write.** The row writes `setAttr(spring.flow)` (author `engine`, cause `rule:spring`, a `detail.why` row of family
   `water` naming the drought years and the over-draw) only when the new value differs from the stored one by more than
   `dial.hysteresis` (0.05, §4.11) or crosses `spring.failFlow` or `spring.regrowFlow`, so a steady spring writes nothing.
   The growth phase of the same epoch reads the new flow in the travel-cost field's pull (step 14); the prosperity field
   reads it at the next epoch's field phase — the one-epoch lag every driver has (V06 §3.4 (7)). Falling below
   `spring.failFlow` is chronicled `springFailed`, rising back to `spring.regrowFlow` `springRecovered`.
4. **Gardens and grove.** While a spring is below `spring.failFlow`, of the `n` irrigated garden faces it feeds (`LandUse`
   kind `garden`, `fedBy` the spring; §2.7) the `⌈flow × n⌉` nearest the water stay irrigated; each other face withers
   after its `spring.witherAfterYears`, drawn once on `stream(EVO_TERRAIN, landUse)` keyed with the epoch the spring fell
   below `failFlow` — a `retypeLand` to `commons`, `fedBy` cleared — and the grove's `Greenery` rows fed by it beyond the
   same share, farthest from the shore first, are tombstoned after their own drawn span (cause `rule:spring`). A spring back
   at `spring.regrowFlow` re-takes its ground as the hinterland does (V06 §3.5.3 (2)): its `commons` faces within the
   climate row's channel reach back to irrigated `garden` (`retypeLand`, `fedBy` set), nearest the water first, up to
   `⌈flow × n₀⌉` (`n₀` the faces it fed at its height, read from their lifecycle), and S12b's grove row re-plants the shore
   band (§4.9). Each step is charged to the hinterland pseudo-district's `fabric` cap.
5. **The quarters around.** No term of the engine's own: the spring's lower `flow` lowers `q(x)` in the prosperity field's
   water term and the growth pull, so its quarters lose band through the field's hysteresis and the wealth ladder (V06
   §3.8.4), carry a higher exposure by the base's low-prosperity driver (V06 §3.5.1), and new growth goes elsewhere — the
   owner's "the quarters around it may decline", by the same lag as item 102's shade (V06 §3.4 (7)). A use whose `hard`
   supply edge reads water finds a spring below `spring.failFlow` no provider and strains (V06 §3.9.2).
6. **Drying.** A spring that has stood at `spring.floorFlow` for its `spring.dryAfterYears` (drawn once on
   `stream(EVO_TERRAIN, water)` keyed with the epoch it reached the floor) dries: its pond shrinks by the `siltReach` op at
   the row's share each epoch and, below 0.1 ha, its water face is removed and the hollow typed `commons` (an oasis has no
   marsh to leave), the `spring` going with its body; chronicled `springDried`. The engine never re-makes a dried oasis: a
   dossier's `oasis_water` available again makes one by DR40 at that epoch's `dossier` step, and a user adds one with T2
   `ground` (§7.1).
The report counts `springs.weakened`, `.failed`, `.recovered`, `.dried`, `.gardensWithered` and `.groveWithered`. With no
spring in the document (the oasis chance, the water pull and the climate cell neutral, item 111 (d)) the row has no
candidate and an epoch is byte-identical to one without it (T-V6-71's no-op clause).
"""
anchor = "  reported. The dig is `carve` (§4.11).\n"
assert t.count(anchor) == 1, t.count(anchor)
t = t.replace(anchor, anchor + SPRING)
t = strip_narr_ids(t)
save('10-s3e.md', t)
print(words(t))
