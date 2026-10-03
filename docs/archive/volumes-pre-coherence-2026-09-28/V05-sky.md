# Design volume 5 — Floating islands: the sky layer

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/V5-sky; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — revised by opus standing in for the Fable seat volumes/revise-V5 (against docs/volumes/critique/V05.md, 46 findings); covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — revised a second time by opus standing in for the Fable seat volumes/revise-V5 (against the item-110 addendum of docs/volumes/critique/V05.md §9, findings C5-47 to C5-58); covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V05-r1; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V05-r2; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V05-r3; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V05-r4; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V05-r5; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V05-r6; covered by the whole-design retrovalidation (J84).

PROGRESS (lane volumes/V5-sky; one line per section: planned | done)
- 0 In plain words: done
- 1 Scope, base hooks consumed, out of scope: done
- 1b Wiring table: done
- 2 Data model: done
- 3 Generation: done
- 4 Editing: done
- 5 Rendering, labels, exports: done
- 6 Performance budgets: done
- 7 Tests and acceptance bars: done
- 8 Build plan: done
- 9 Decisions: done
- 10 Base change requests: done
- 11 Owner questions: done
- 12 CONFIRMED versus PLAUSIBLE: done
- 13 Fix list: done (filled by the revision)
- G Fold-in of the 2026-09-28 bundle (items 102 and 103 of docs/AMENDMENTS-2026-09-28g.md, J98 re-checked) and the
  reconciliation with the landed V01 §3.10.3: §0 done | §1/1b done | §2 done | §3.1, 3.5, 3.9, 3.11, 3.12, 3.15,
  3.17, 3.19, 3.20 done | §4 done | §5 done | §6 done | §7 done | §8 done | §9 done | §10 done (BCR-V5-15, -16) |
  §12 done
- H Fold-in of item 104 (h) (custom chains across the island), V08's `magical_node` supply input, the DR-SKY rename
  (DR26 is also proposed by V01, V06 and V08) and the strip's mask on V06's sampler layout (18:00 run): §0 done |
  §1/1b done | §2 done | §3.3, 3.5, 3.15, 3.19, 3.20 done | §4 done | §5 done | §7 done | §8 done |
  §9 done | §10 done (BCR-V5-17; BCR-V5-11, -12, -14 updated; headings written in full) | §12 done | pointer pass
  done (own sections written `V5 §n`, V5 §1's convention)
- R Revision against docs/volumes/critique/V05.md (lane volumes/revise-V5; 2 blockers, 20 majors, 24 minors, the ~20:59
  correction of C5-02 under the owner's J111 "cathedral also gets crypts but cemetaries get catacombs"; file g items
  105–109 folded where they reach islands): §0 done | §1/1b done | §2 done | §3 done (new §3.21) | §4 done |
  §5 done | §6 done | §7 done | §8 done | §9 done | §10 done (BCR-V5-18 to -26; -1, -6, -8, -10, -11, -13 to -16 revised) | §11 done (unchanged:
  no new owner decision) |
  §12 done | §13 done | disposition table in the critique done
- R2 Second revision against the critique's item-110 addendum (§9, C5-47 to C5-58: 8 majors, 4 minors; item 110 of
  docs/AMENDMENTS-2026-09-28g.md as revised ~23:40, "they go in"): §0 done | §1/1b done | §2 done | §3 done
  (new §3.22) | §4 done | §5 done | §6 done | §7 done | §8 done | §9 done | §10 done | §12 done |
  §13 done | disposition table in the critique done
- RC1 Reconciliation round 1 (lane volumes/reconcile-V05-r1, 2026-09-29; against critique/seam-layers-r0.md SL-01, SL-02,
  SL-26, SL-27, SL-33, SL-35 and critique/seam-time-r0.md ST-04, ST-12, ST-14, ST-48, ST-49): RC1.1 stage order and
  data keys (SL-01: §1b, §3.1, BCR-V5-3, BCR-V5-6) done | RC1.2 strip readers and first read (SL-02: §1b, §2.3a,
  §2.6, §3.1, §3.19 (6), T-V5-21 (h), BCR-V5-15) done | RC1.3 optional shade basis (ST-49: §2.1, §2.3a, §2.6,
  §3.15, §3.19, §4.2, T-V5-21 (h), BCR-V5-21) done | RC1.4 removal holds against the count (ST-04: §0, §2.1, §2.6,
  §3.2 (6), §3.15 (5), §4.2, §4.5, T-V5-29, J-V5.62, BCR-V5-10) done | RC1.5 the landfall's walls, decks and
  aqueduct (ST-12, ST-14, ST-48: §3.16, §5.1, §5.5, §4.5, T-V5-14, J-V5.64) done | RC1.6 minors (SL-26 BCR-V5-30's
  reader; SL-27 `sky.plotShare`; SL-33 GeoJSON; SL-35 "seven") done | RC1.7 decisions J-V5.70–72, bar T-V5-32,
  §8, §12, §13 hand-offs, the dated note done
- RC2 Reconciliation round 2 (lane volumes/reconcile-V05-r2, 2026-09-29; against critique/seam-layers-r1.md SLR1-02, -08,
  -11, -23, -24 and critique/seam-time-r1.md TR-04, TR-22): RC2.1 the `ruin.node` line (SLR1-02: §1b, §3.3, §4.5,
  T-V5-25) done | RC2.2 the rim walk's trees (SLR1-08: §3.12) done | RC2.3 one plot share (SLR1-11: §2.3, §3.5 (2)–(3),
  §3.12 item 7, BCR-V5-5, BCR-V5-16, J-V5.45) done | RC2.4 ids and writers (SLR1-23: §1.3, §3.5, §13 item 3; SLR1-24:
  §2.6) done | RC2.5 the landfall's `formerClass` (TR-04: §1b, §2.6, §3.16 (4), (8), §4.2, T-V5-14, J-V5.73) done |
  RC2.6 the fold's rung (TR-22: §3.15, J-V5.74) done | RC2.7 §12, §13 items 21–22, the dated note done
- RC3 Reconciliation round 3 (lane volumes/reconcile-V05-r3, 2026-09-29; against critique/seam-layers-r2.md SLR2-02, -03,
  -07, -11, -12 and critique/seam-time-r2.md TT-03, TT-09): RC3.1 the sky pseudo-district's supply point (SLR2-03)
  done | RC3.2 the unit runner's runs (SLR2-02) done | RC3.3 shadeSky's volume-1 readers (SLR2-07) done |
  RC3.4 bend lines in bars and rows (SLR2-11) done | RC3.5 levelledGroundCm readers (SLR2-12) done | RC3.6
  Decoration members typed (TT-03) done | RC3.7 the landfall's condition profile (TT-09) done | RC3.8 §12, §13 items 23–25,
  the dated note done
- RC4 Reconciliation round 4 (lane volumes/reconcile-V05-r4, 2026-09-29; against critique/seam-layers-r3.md SLR3-02, -03,
  -09, -10 and critique/seam-time-r3.md TU-03, TU-08): RC4.1 the rim's L1 pieces follow a resize and a rim reshape
  (SLR3-02: §1b, §2.6, §4.2, §4.3, §6, T-V5-14) done | RC4.2 the own relief class stored (SLR3-03: §1b, §2.1, §2.6, §3.8 (3), §3.22 (4), T-V5-31 (e), BCR-V5-1) done | RC4.3 the unit run's after-generation words
  (SLR3-09: §1b, §2.6, §3.20 (9) (e), §4.2) done | RC4.4 the crossing sites cited (SLR3-10: §1b, §2.3, §3.8 (4), §3.12, §3.22 (6)) done | RC4.5 towers follow their runs (TU-03: §1b, §2.6, §3.16 (4)–(5), §5.1, T-V5-14, J-V5.11, J-V5.79) done |
  RC4.6 §12, §13 items 21–25 landed (TU-08), §13 items 26–28, the dated note done
- RC3b Reconciliation round 3's continuation (lane volumes/reconcile-V05-r3, second brief, 2026-09-29; against
  critique/seam-content-calibration-r2.md SCC-R2C-15; round 3's seven issues are history, verified in the live text):
  RC3b.1 the register at §8's exits (P1, P2) done | RC3b.2 no own register line: the ⟨P0⟩ cells set before P1
  lands, the default line for every column (§8, §2.4, §1b) done | RC3b.3 J-V5.80, §12, §13 item 29, the dated note done
- RC5 Reconciliation round 5 (lane volumes/reconcile-V05-r5, 2026-09-29; against critique/seam-layers-r4.md SLR4-03,
  SLR4-04, critique/seam-time-r4.md TV-04, TV-06 and critique/seam-content-calibration-r4.md SCC-94, all minor): RC5.1
  the rim walk and the claim's district in volume 1's words (SLR4-03: §1b, §2.6, §3.12, §4.2, §6, T-V5-14, J-V5.77)
  done | RC5.2 the island bridge as a `levelledGroundCm` reader (SLR4-04: BCR-V5-30, §1b) done | RC5.3 every gate kind
  in the landfall (TV-04: §1b, §2.6, §3.9 (3), §3.16 (2), (4)–(5), §5.1, T-V5-14, J-V5.11, J-V5.79; V6 §3.7.5 and
  J-V6.110 as a counterpart edit) done | RC5.4 landed halves (TV-06: §12, §13 items 25, 27; SCC-94: §8, §12, §13 item
  29) done | RC5.5 §12's round-5 paragraph, §13 items 30–32, the dated note done
- RC6 Reconciliation round 6 (lane volumes/reconcile-V05-r6, 2026-09-29; against critique/seam-layers-r5.md SLR5-06
  (minor) and critique/seam-time-r5.md TW-04 (major), TW-09 (minor)): RC6.1 the resize row prices the yards' tops and
  the re-cut plots (TW-04: §6, J-V5.81; V6 §6.2, J-V6.118, BCR-V6-22, X46 as a counterpart edit) done | RC6.2 the
  sky key's raster in §1b (SLR5-06 (c)) done | RC6.3 the inward reshape's claim exception (SLR5-06 (d): §4.2) done |
  RC6.4 landed halves (SLR5-06 (a)–(b), TW-09: §12, §13 items 30–31) done | RC6.5 §12's round-6 paragraph, §13
  items 33–34, the dated note done

## 0 In plain words

Some cities have land floating in the sky above them. This volume says exactly when, how big, what is on it, where it
hangs, how people get up to it, what it looks like from above, and what happens to it when the city grows poor.

**When there are islands.** Only cities and metropolises can have them, and only when the owner's fantasy setting for
islands is switched on (it is off by default, so the realistic map never has one). Even then it is a roll of the dice
weighted by wealth: a poor city gets none, a middling one sometimes one, a rich one may get none, one, two or three.
Magic is the resource that holds an island up and it has to be paid for all the time, so the richer the city, the more
likely an island, the higher it floats and the bigger it may be; and the richer the people living on it, the bigger it
may be too.

**What is on an island.** Either a very rich neighbourhood (one to three neighbourhoods, taken from the richest people of
the city, so the city's population stays the same — they have simply moved up), or one unique institution: a palace
looking down over the land, a cathedral, or a prison that keeps its prisoners far from everyone. The island is laid out
like any other part of the city — streets, plots, houses, gardens — by the same machinery that draws a neighbourhood
close-up, but with no road leading in or out. A large rich island is usually two or three neighbourhoods, a small one a
single neighbourhood. Its wealth is not flat: the richest take the high ground and the rim that looks out over the city,
and the island's less wealthy households live on the lower, inner ground. When the cathedral or the palace moves up, the
site the town kept for it beside the main square is not left empty: the town's largest church takes the old cathedral
close, and the old palace site becomes the town hall or the palace gardens. The island cathedral's burial crypt is cut
into the island's own rock beneath it — still the largest crypt in the town — and the island never has catacombs: those
lie only under the cemeteries on the ground.

**What it looks like.** Each island has its own shape (round, D-shaped, a lozenge, a crescent or a long spindle), a rocky
rim, its own gentle hills that echo the country below, and often a small magically conjured river that flows the same way
as the river on the ground and spills off the edge as a waterfall that turns to mist. It floats over water, fields or the
outskirts — over the city's heart only if someone asks for it there — high enough that nothing on the ground touches its
rocky underside. From above you see the island drawn over the city with the ground showing faintly through it (you can
switch it to solid, or to a "lifted" view that shows the rock hanging beneath it), and its shadow falls on the ground and
moves with the sun under your mouse pointer. At night the rim glows with small magical lights and a soft glow shines down
from beneath it onto the ground.

**How people get up.** By hoists — winch houses on the rim lowering cages on ropes to a landing yard below, the way some
real clifftop monasteries were reached — or, over water, by an inclined rope line to a tower on the shore. Where the
world has magic, a floating stair of stepping stones or a bridge of light may join them. Every island has at least one
way up, and every landing on the ground is a small yard on a street.

**The shade it throws on the ground.** An island blocks the sun. For a typical day the generator works out how long
each patch of ground lies in an island's shade — the same way it works out the shade of hills and walls — using the
island's real bulk: its thick rocky rim and the root tapering beneath it. Ground that spends much of the day in that
shade tends to be a little poorer, so cheaper lodgings and workshops gather in the island's "under-hang", while the rich
keep to the sunny side. It is a gentle tendency, never a rule: the shade alone never moves a patch of ground by more than
one step of wealth. If an island is moved, raised or lowered, the ground beneath catches up over time — at the next
period of the city's history — rather than being rebuilt the moment you drag it. A shade map shows where each island's
shade falls across the day, and the clerk can answer "why is this quarter poor?" with "it lies in the shade of the
Palace island for half the day". The map remembers where each island stood when the ground last took its shade, so saving
and reopening a map never changes the picture; and if you do not want to wait for the town's next period, one button
("Update shade now") brings the ground under the old and new shade up to date at once.

**Who trades with whom.** Shops and workshops on an island follow the same siting rules as those on the ground, but a
trip to the ground means a ride down a hoist: so an island's baker sits near the hoist that leads down towards the mill,
and a smith on the ground who serves the island stands near its landing yard. Each of an island's neighbourhoods counts
as a district when the rules ask for "an apothecary in every district", so a three-neighbourhood island gets its own
apothecaries as the ground does. Smelly and dirty trades — tanners, dyers, lime burners — never go up, and neither do the
heavy works (mills, smelters, breweries) or the warehouses, which belong by the gates and quays; but a trade that has a
works and a shop, like a butcher with a slaughterhouse and a stall, may keep its works on the ground and open its shop on
the island. A supply chain — the town's own or one an author invented — keeps its working steps together on the ground,
while the island may hold the shop that sells its last product or the people who buy it, the goods riding the hoist
between them; the ground end of that trade gathers near the hoist's landing yard.

**Walls.** An island needs no wall: its cliffs are its wall. If you draw a wall on an island anyway, only the tops of its
hoists are walled, each with a gate, and the clerk explains that "the drop is the wall" everywhere else.

**Viaducts, raised roads, aqueducts and terraces.** Cities may build viaducts, raised roads and aqueducts; they pass
beneath an island and never reach one, the island floats clear of them, and one you remove stays removed. The hoists'
landing yards keep clear of the arches, a rope line passes well above any deck it crosses, and a road you draw toward an
island's edge is turned into the offer of a hoist instead: "A road cannot reach a floating island; a hoist, rope line,
stair or bridge of light can." An island on steep ground may be terraced, with its own retaining walls, but never along
its edge: the rim walk stays level, and a terrace wall you draw there is moved just inside it. When an island falls,
the arches, piers and terrace
walls beneath it break with everything else it lands on, and the shops standing on a covered bridge fall with the bridge.

**Where magic wells up.** If the settlement's own record says it sits on a magical node, the town pays less to keep
islands aloft, so an island is a little more likely, a little bigger and a little higher there.

**When the city declines.** If the city gets poorer, its islands shrink a little and sink lower. If the magic can no
longer be paid for at all, the people leave, the island sinks to its lowest height and stands empty; if nothing changes
for years, it finally comes down, leaving a field of fallen rock on the ground that people quarry for building stone —
the walls, towers, bridges and streets it lands on are broken or buried too, until the town clears them. If wealth
returns in time, an abandoned island is raised again before any new one appears. If the town's own record removes the
cathedral or the palace an island carries, the island finds a new purpose at the town's next period — another institution
of the same kind, or a rich neighbourhood — or, failing both, slowly sinks.

**Editing.** Everything can be changed: switch islands on or off, choose how many, draw an island where you want it,
drag it elsewhere, raise or lower it, make it bigger or smaller, reshape its rim, add or move a hoist or a stair, rename
it, paint its wealth, density or greenery with the same brushes as the ground, edit anything on it like any other
neighbourhood, or bring it down by hand. Every change can be undone, and changing an island never disturbs the city below
except the landing yards of its hoists. An island or a hoist you remove stays removed: the city never raises it again by
itself — the clerk says "removed by you" — unless you undo the removal, or draw an island yourself when every other place
is taken. Asking for more islands opens new places only, never the one you emptied. If you switch islands on and none
appears, the map says why in plain words — the
city is not rich enough to keep one aloft — and offers the two remedies: raise its wealth, or draw one yourself.

## 1 Scope, the base hooks consumed, and what is out of scope

**Pointers.** `V5 §n` names a section of this volume; a bare `§n` (like `II.n`, `D-n` and the `J-…` rows) names the
base, `docs/ARCHITECTURE.md`; another volume's section is written `V0n §n` (`V01 §3.10.3`, `V06 §2.1`, `V08 §2.6`), and a
list or range that follows a volume prefix stays in that volume (`V06 §2.1, §3.2` is two sections of volume 6;
`V5 §3.2–§3.7` six of this one). The PROGRESS ledger at the top names this file's own sections. The new base texts in
V5 §10's requests write this volume as `V05 §n`, the form the base will carry. **Two kinds of tier** (J-V5.66): this
volume's **underside tiers** are the rock beneath an island (underside tier 0 the rim slab, underside tiers 1 … n the
root, V5 §3.9 (2)); item 110 (c)'s **massing tiers** are a stepped building's stacked wings (V02 §3.15). Wherever both
could be meant, the text says which; a bare "tier" in V5 §3.9 (2) and V5 §3.19 (2)–(5) is an underside tier.
**Raised-way piers** are item 110 (b)'s supports on ground part 0; a bare "pier" is a harbour pier (§4.8), as in
volume 4's usage.

### 1.1 What this volume builds (to build depth)

1. **Existence and count** — the rung gate, the model setting, the dossier's coherence gate, the three ordered slots
   (V5 §3.2).
2. **The supply law made measurable** — the town supply and the carried supply on absolute field values, answering the
   retrovalidation's RV-pc-3 (the town supply's unreachable top and its knife-edge gate) (V5 §3.3).
3. **Purpose** — a prosperity island or an institution island, per slot, by rule or by assignment, with the institution
   rows (palace, cathedral, prison) (V5 §3.4).
4. **The sky allocation** — S7b (5)'s fill, the island's district count and the population kept whole (V5 §3.5).
5. **Shape** — the outline from §4.2 S1 (2)'s routine in the island's own local frame (V5 §3.6).
6. **Placement** — where each island floats over the ground plan, by one scored draw with a failure ladder (V5 §3.7).
7. **The island arena** — its frame, its L0 (the void, the land, the rim, water), its terrain echoing the ground, its
   conjured river and waterfall (V5 §3.8).
8. **Altitude and the underside** — the rocky root beneath, its profile and thickness, the clearance over the ground (V5 §3.9; the owner's J98).
9. **Access** — hoists, rope lines, floating stairs and bridges of light, with a landing yard at each end (V5 §3.10).
10. **The island's field — a gradient carrying each band on its share of the land — and the hand-over** to volume 1's unit
    run, which lays the island's districts, with the island's district size, kinds and fabric priors (V5 §3.11, V5 §3.12).
11. **Lights, names, the post steps** (V5 §3.13, V5 §3.14).
12. **Over time** — the island laws an epoch applies, the households they move through volume 6's typed channels, an
    island whose institution the dossier removes, the fall and its landfall over every covered kind (V5 §3.15, V5 §3.16).
13. **Failure ladders and determinism** (V5 §3.17, V5 §3.18); **editing, rendering, labels, exports, budgets, tests, build
    plan** (V5 §4–§8).
14. **The island's shade strip** (the owner's item 102 on the island's side, with J98's underside) — the model-side
    shade each island casts across a representative day, which field pass 2 folds into the prosperity field's daylight
    term; the sky receivers' shade; its lag behind edits; the altitude fixed at SKY so the strip can be read before the
    plots are cut (V5 §3.9, V5 §3.19).
15. **The siting rulebook across the island** (the owner's item 103 where it reaches islands) — the route distance
    through the accesses that the one placement solver reads between arenas, the island's districts as coverage units, the trades
    an island never carries, the siting facts of the landing classes, and a custom institution (the owner's item 104)
    taken as an island institution by its scene archetype (V5 §2.4, V5 §3.4, V5 §3.5, V5 §3.11, V5 §3.20).
16. **Custom supply chains across the island** (the owner's item 104 (h) where it reaches islands) — which nodes of an
    active custom chain may go up, how its links cross by the route, its order and shape across two arenas, its trade
    endpoints and services (V5 §3.5 (3), V5 §3.20 (9)).
17. **The magical node** — the dossier's `magical_node` deposit as a term of the town supply (V5 §3.3), the consumer
    volume 8's deposits row names (V08 §2.6).
18. **The model sun's sample set** where item 102's application leaves it open — nine suns at the equinox and one sample
    point per field cell by default, on the layout volume 6's building shade mask shares (V5 §3.19 (1), BCR-V5-15).
19. **The shade basis** — the persisted copy of the island as the field last read it, so the owner's lag (item 102 (e))
    survives a save, a load and a replay (V5 §2.1, V5 §3.19).
20. **The ground reservation's hand-over and the island cathedral's crypt** — who takes the precinct or palace site an
    institution island leaves on the ground, and the owner's revised item 109 (k) on an island: the cathedral's crypt,
    always the settlement's largest, is a vault in the island's rim slab, and island churchyards are never catacomb
    sources (J111; V5 §3.5, V5 §3.10 (5)).
21. **The rim as a barrier** (the owner's item 106 where it reaches islands) — the rim a sheer barrier that closes any wall
    circuit, an author's island wall walling only the landing tops (V5 §3.21).
22. **The supply web, spread and pull, and ladders across the island** (the owner's items 105, 107 and 108 where they
    reach islands) — nearest-provider binding by the route, both ends pulled at the access, split works and shops across
    the arenas, the order and relaxation per arena, comfort distances on the route, coverage per island district, the
    trades never carried as a table row, and ladder records on an island (V5 §3.4, V5 §3.5, V5 §3.20 (10)–(12)).
23. **Item 110 on, under and against the island** (the owner's "they go in", ~23:30, and the ~23:40 revision that makes
    generated raised ways the default at CITY and METROPOLIS) — raised parts, retaining walls, stepped massing and levelled
    platforms as casters under an island, at SKY, at SKY-F and after every epoch's growth; the accesses as overhead
    obstacles to a raised deck and the landing feet kept off decks and raised-way piers; a raised stroke to a rim bent
    into an access (J-VI.4 (d)); the island's own retaining walls; what the raised-way generator reads of the sky; the
    landfall over raised parts, retaining walls and deck plots; the strip's receiver heights under levelling; and a
    removed island or access that stays removed (V5 §3.22, with V5 §3.2 (6), §3.9, §3.10, §3.15 (5), (7), §3.16, §4.2).

### 1.2 The base hooks this volume consumes (cited, never restated)

| base section | what it gives this volume | how this volume uses it |
|---|---|---|
| II.6 (the island rule (1)–(8), `IslandRule`, `SkyStrategy`) | the model setting and view toggle, the rung gate, the count slots, the two supplies, size and altitude, epochs, editability | built to depth; the supply rows re-keyed on absolute values (BCR-V5-4) |
| II.1 rule (5), `NeighbourhoodRequest` with `layer: 'sky'` | the sky call: no portals, no roads in or out | this volume produces the call's inputs (`SkyHandover`, V5 §2.3); volume 1's unit run lays the districts |
| §1.1 `RungProfile.layers.islands` | `none` at TOWN and the village rungs, `possible` at CITY and METROPOLIS | the gate of V5 §3.2 |
| §2.1, §2.2 (`PlatKey`, rule 1, rule 2, rule 5, rule 7) | one arena per sky island; arenas share no topology; no record stores a vertex position; the role registry | the island arena's levels, the `rim` and `sky_access` roles, local coordinates with a world anchor (BCR-V5-1, BCR-V5-2) |
| §2.3 `Terrain` | a sky island's own terrain, key, datum, frame and `hydro` grid | the terrain echo (V5 §3.8) |
| §2.5 `Allocation`, `ContextVector`, `Reservation`, `FieldBands` | the eager content records; `ContextVector.arena` | the sky allocation, the landing rows, `arena: 'sky'`, the `landing` reservation (BCR-V5-6) |
| §2.7 `SkyIsland`, `Decoration`, `LightSource` | the island's record, the ruin face, the light record | the record revised (BCR-V5-1); the landfall decoration (BCR-V5-9) |
| §2.8, §2.9 | identity, lifecycle, the registry, the document | the registry rows, `Document.nextSkyPart` (BCR-V5-2) |
| §3.4, §3.7 | kernel ops, buffers on the arrangement | the rim's resize by buffer (V5 §3.15) |
| §4.1 | the stage graph, laziness, units | `SKY` registers after S7b (its hooks included), writing its own ground data keys `reservations.landing` and `allocations.landing` (BCR-V5-3); the unit run is volume 1's (V5 §3.1) |
| §4.2 S0, S1 (2)–(5) | the `magic` circumstance, the closed-outline routine, outline templates, rivers by descent, crossing sites | outline, terrain, the conjured river, the island's decks |
| §4.5 (the field, the band set, S7b (5)) | the prosperity field, the cuts, the sky pseudo-districts | S_town, S_carried, the fill (V5 §3.3, V5 §3.5; BCR-V5-5) |
| §4.7 (S10b, S11, *Light sources*) | the one solver, the designation templates, the light table | the landing plots; the sky light rows (BCR-V5-8) |
| §4.9 (*One more member of the family*) | the band-row family | its island sentence restated for value-keyed rows (BCR-V5-4) |
| §4.11 (the island kinds, `ConversionOp`, the per-year rule, *Dossier content across epochs*, the salvage ledger) | the island decline kinds and their home | the island laws at depth; resize by buffer; the landfall as a conversion of covered faces (BCR-V5-7) |
| §5.1–§5.3 | tiers, ladders, invariants | the F-SKY rows and the sky invariants (BCR-V5-11) |
| §6.1, §6.3 | `island.place`, keys, the anchor table | every draw on existing concerns; the access anchor (V5 §3.18) |
| §7.1–§7.4, §7.6, §7.8 | events, the twelve tools, locality, lifecycle, tables, controls | V5 §4 (BCR-V5-10) |
| §7.7 (derivation table, coherence, `magic` from `site.magic`) | the dossier contract | derivation row DR-SKY (BCR-V5-12) |
| §8.1, §8.2 `states`, §8.4 (`LayerSpec`, the slab list, the light pass), §8.8 | marks, state rows, occlusion, shadows | the island's marks, the sky surface layer, the underside's slab tiers (BCR-V5-13) |
| §9.1, §9.2 | label entities, the candidate set | the island's labels and the occlusion rule (BCR-V5-13) |
| §11.1 | per-layer exports; the VTT sky scene per island | V5 §5.5 (BCR-V5-13) |
| §12 | budgets | V5 §6 |
| §13.2 T10-1, T13-1, T15-1, §13.4's island-shadow golden | the base's island bars | kept; T15-1's fixture reworded (BCR-V5-14); T-V5-* added |
| §14 `StrategyRegistry.sky`, §16 | the registry and the build order | `@plat/sky` and milestone M6-sky (BCR-V5-14) |
| volume 1 (V01) §2.4 (`NeighbourhoodRequest`, `DistrictContext`), §3.10.3 (a sky island's districts) | the unit runner, its district partition by the bent cut and its count, its S7b split | SKY calls it once per island with a `sky` request; the unit runner reads the island through `skyHandover` (V5 §2.3, V5 §3.12) |
| item 102 (a)–(g) of `docs/AMENDMENTS-2026-09-28g.md` (applied to §4.5, §4.7 S10b, §7.6, §8.4 and §13 by the coherence pass) | the daylight term `−w_sun · shade(x)` of the prosperity field, the model's fixed sun samples, its order (terrain and walls in pass 1, islands in pass 2), the sunlit-side preference, the weight as a table value, the shade map view, the bars | the islands' share of the term — each island's shade strip (V5 §3.19) — and the sky receivers' shade (V5 §3.11); the supply law reads the island-free value (BCR-V5-15) |
| item 103 (a)–(f) of the same file (applied to §10.2, §4.7 S10b, §7.6 and §13.2) | siting profiles, relation families, signature pairs, coverage rows, the siting statistics suite, the clerk's "why is this here" | the route distance between arenas, the island's districts as coverage units, the trades an island never carries, the landing classes' siting facts (V5 §3.5, V5 §3.20; BCR-V5-16) |
| item 104 (a) of the same file (custom institutions' profile resolution; applied to §7.7 and §10.2) | a custom institution's resolved siting profile, its scene archetype and landmark level, keyed by `localUid` | the `archetypes` column of the island institution rows (V5 §2.4, V5 §3.4) |
| item 104 (b), (h) of the same file (active custom chains as supply edges; the chain placed as one connected thing) | a chain's nodes in flow order (resource, processors, final seller, consumers), its link strengths, its cluster-or-stretch shape, its trade endpoints | what the sky fill carries of a chain and how its links cross (V5 §3.5 (3), V5 §3.20 (9); BCR-V5-16) |
| volume 6 (V06) §2.1 `EpochParticipant`, §3.2's step table, §3.4 (4) and (8) | the epoch's step `afterField`; the sampler's layout (sample points × sun positions per 32 m cell) shared by the building shade mask | `IslandEpochStep` registered as the participant `sky.islands` (V5 §3.15); the strip's mask on the same layout (V5 §2.3a) |
| volume 8 (V08) §2.6's deposits row (`magical_node` → "II.6's supply term") and its latitude row (V08 §3.5, its `cultures` rows in §2.6) | the dossier's `site.deposits` and the site latitude the model's sun reads | the node term of `h_town` (V5 §3.3); the samples' latitude (V5 §3.19 (1), BCR-V5-15) |
| §4.7 S10b (*Supply distances by mode*) | `street` distance from the class distance rasters × the detour factor; `road` distance through a gate | the route distance through an access mirrors `road`, the landing standing for the gate (V5 §3.20) |
| §4.2 S3 (2) and S3 (8) (the temple or cathedral precinct; the castle siting a palace reads) | the ground reservations made before the streets | not made for an institution the creation prefix sends up; otherwise handed over (V5 §3.5; BCR-V5-19) |
| §4.6 (S8 infill: a reservation inside a face is a hole) | the infill's cuts | a ground landing's attach as a destination the infill must reach (V5 §3.10 (4); BCR-V5-20) |
| §2.9 *What the snapshot holds* (the fields recomputed on load from their drivers) | the load path | `SkyIsland.shadeBasis` the one sky input the recomputation reads (V5 §2.1; BCR-V5-21) |
| §8.2 (*Slot resolution*, *Roles*, *Layer order*, the `states` rows) | the sheets' loader and the island state rows | every sky semantic slotted and resolved, the `sky.ground` role, the `fallen` row (V5 §5.1; BCR-V5-18) |
| §8.4 (c) (the global light's window R) | the ray window from the list's `surfaceTopCm` | the window without slabs, each slab tested over its own reach (V5 §5.3 (2); BCR-V5-22) |
| items 105, 107 of `docs/AMENDMENTS-2026-09-28g.md` (the supply web; spread and pull) | links to the nearest provider pulling both ends, orientation, several outputs, the order and one bounded relaxation, the district supply term, split sites, `activeChains[]`; balance profiles, `comfortM`, same-kind spacing, quarters never assigned | applied across arenas (V5 §3.5 (3), V5 §3.20 (10)–(12)) |
| item 106 of the same file (walls that use natural barriers) | the `barrier` closure, defensibility classes, the graded stretch profile, the wall tool's snapping, the clerk's unwalled side | the rim a `sheer` barrier; an island wall walling only the landing tops (V5 §3.21) |
| item 108 of the same file (institution ladders) | COUNT, QUARTER, GUILD, SIZE and REPLACEMENT steps; members scaled by population; no double counting | what an island institution may be and how carried members keep their records (V5 §3.4, V5 §3.5) |
| item 109 (f) and (k) of the same file (the magical node at a ruin's heart; catacombs only under cemeteries, crypts in churches, as revised ~20:05, J111) | the node's position; the catacomb candidates and count; the cathedral's crypt always the largest | the node term stays positionless (V5 §3.3); island churchyards never candidates, island churches counted once, the island cathedral's crypt a rim-slab vault (V5 §3.5, V5 §3.10 (5)) |
| volume 6 (V06) §2.1 `EpochOps`, §3.8.1 (the displaced pool) | the epoch's typed channels for households | households the island step releases or takes (V5 §3.15; BCR-V5-23, listed for volume 6) |
| volume 9 (V09) §2.7, §5.4, §6.4 (the shade raster, the Shade view, its sampler) | the thematic view | reads the held strips, never samples islands on demand (V5 §5.1) |
| volume 10 (V10) §2.13 (`WhyProvider`, `FieldDrivers`) | the clerk's explainers | the sky's `WhyProvider` and the daylight term's per-island attribution (V5 §4.5) |
| volume 11 (V11) §3.5's `cathedral`, `palace`, `mage_tower`, `mages_guild` rows, §3.9's district kinds | the classes an island row takes and its district kinds | the institution rows' tags, the `sky-*` district kinds (V5 §2.4) |
| item 110 (a)–(d) of `docs/AMENDMENTS-2026-09-28g.md` (as revised ~23:40; applied to §2.7, §3.4, §4.3, §4.6, §4.7 S10–S11, §5.3, §7.1 and §8 by the coherence pass) | `RetainingWall` records and levelling; raised parts in ground parts ≥ 1 with raised-way piers on part 0, generated at CITY and METROPOLIS by reason, removable; stepped massing; deck plots on bridge, pier, mole and quay decks | casters under an island, admissible ground for the accesses, the island's own retaining walls, the landfall's covered set, the generator's reads of the sky (V5 §3.22; BCR-V5-27, BCR-V5-29, BCR-V5-30) |
| volume 2 (V02) §3.15.2 (the stack's heights envelope, `BaseWing.on`, `deckLevel`), §2.6 `DeckContext` and X20 | a stepped building's top and each massing tier's eave; the deck plots' host | the caster ceiling and clearance (V5 §3.9 (3)–(5)); the surface top per point; the landfall's deck plots |
| volume 6 (V06) §3.2 (the step `afterGrowth` and its participant table), §2.1 `EpochScope` | the epoch's step after growth; the elements an epoch built | `sky.clearance` at `afterGrowth`, order 50 (V5 §3.15 (7); BCR-V5-28) |
| volume 1's BCR-39 (critique/V01.md V1C-69, alias I110R-1) | the recommended slot of item 110 (b)'s generation: viaducts inside S4, elevated roads and aqueducts at S6's end, before S7b (1) | the raised parts exist when SKY runs, so the caster ceiling and the admissible ground read them (V5 §3.22 (1)) |

### 1.3 Out of scope, and whose it is

* **Laying the island's districts, blocks, plots and buildings** — volume 1's unit run (V01 §3.10). This volume hands it
  the arena, the land face, the rim strip, the claims, the landings, the district count and seeds, the allocation and the
  field values (V5 §2.3), and reads back what it made.
* **Scheduling epochs** — volume 6 (evolution). This volume states the island laws an epoch applies (`IslandEpochStep`,
  V5 §3.15) and the conversions they emit; the engine decides when an epoch runs.
* **Screens, panels and gestures** — volume 9; this volume fixes the tools' parameters and the events they emit (V5 §4).
* **The clerk's prompts** — volume 10; this volume fixes what the clerk reads and proposes about islands (V5 §4.5).
* **Word lists and grammar rows** for island names — volume 11; this volume fixes the naming features they read (V5 §3.14).
* **Calibration runs** — volume 12; every calibrate-later constant here names its default, its measurement and its
  fallback.
* **The underground** — volume 4. The owner ruled that islands have no relation to it; nothing here reads or writes an
  underground part. Two consequences of the owner's revised item 109 (k) (J111) are this volume's to state: a churchyard
  on a sky plot (the base gives every church and temple plot one, §4.9's churchyard row) is a surface burial ground only,
  never a catacomb candidate and never ranked as the largest cemetery, while each church on an island still counts once
  toward the catacomb count (V04 §3.5.1 (3); `CatacombRule.count`'s `churchesPer`, V4 §2.3); and an island cathedral's crypt — always the settlement's largest —
  is a vault cut into the island's rim slab, part of its building, never an `UndergroundSystem` part or an item 109 (j)
  (3b) link (V5 §3.5, V5 §3.10 (5); J-V5.43). The landfall's quarried rubble sources no underground quarry (V5 §3.16).
* **The daylight term itself** — its weight `w_sun`, the model's sun samples, the terrain and wall shade of pass 1, the
  sunlit-side preference of S10b and the §13 bars are the base's by item 102 (applied by the coherence pass); this volume
  gives the islands' share and the one thing item 102 leaves unstated for it (BCR-V5-15). **Drift over epochs** of shade
  and siting is volume 6's (item 102 (e)); this volume states only when an island's strip is re-read (V5 §3.19 (5)). **The
  shade map view and the siting explanations on screen** are volume 9's; **the clerk's prompts** volume 10's; **every
  class's siting profile, supply edges, coverage rows and signature pairs** volume 11's (item 103's content) — this
  volume states the facts its landing classes and its carried trades must satisfy (V5 §3.20). **Custom chains** — their
  discovery, activation and arrival through the dossier are volume 8's, a chain's street-scale closeness and any quarter
  it is named past item 72's threshold volume 1's (item 107 (e) revising item 104 (h) (3)), the chain placement rules and
  rows volume 11's (item 104 (h)); this volume states only what the island changes about a chain (V5 §3.20 (9)). **The
  `magical_node` deposit's position** — at a ruin's centre where a ruin exists (item 109 (f)), else S12a's decoration site
  — is volume 8's and volume 4's; this volume reads only the deposit's state (V5 §3.3). **The crypt's room plan, stairs and
  furnishing** are volume 3's and its basement form volume 2's; this volume fixes only where an island cathedral's crypt
  may lie (V5 §3.10 (5)). **Item 110's own work** — generating, drawing and decaying raised ways, retaining walls, stepped
  massing and deck plots — is the base's (the coherence pass's application of file g), volume 2's (massing and deck
  buildings), volume 1's (terraced wards and the island's levelling in its unit run), volume 4's (the vaults under raised
  ways, whose state follows their span's) and volume 6's (all of it over epochs); this volume states only what an island
  changes about them and what they change about an island (V5 §3.22).

## 1b Wiring table — every new piece, what feeds it and what it feeds

| piece (home) | fed by (producer) | feeds (consumer) | base hook it plugs into |
|---|---|---|---|
| gate result `skyGate` (V5 §3.2) | `recipe.layers.islands`, `RungProfile.layers.islands`, DR-SKY's dossier `site.magic` row | S7b (5)'s slot draw; §7.8's control state; the report | II.6 (1)–(2), §7.7 |
| slot draw (V5 §3.2) | `island.place` stream, `IslandRule.chance`, `h_town(S_town)`, forced slots from assignments and declarations, `recipe.params['islands.count']` | reason draw (V5 §3.4), allocation fill (V5 §3.5) | II.6 (4), §4.5 S7b (5) |
| `S_town` (V5 §3.3) | field pass 1 (S6) over built district cells; at an epoch the re-evaluated field | `h_town`, count, area, altitude; `SkyIsland.supply.town`; `IslandEpochStep` | §4.5 fields, II.6 (3) |
| the node term of `h_town` (V5 §3.3) | the dossier digest's `site.deposits` (a `magical_node` in state `available`, or `discovered` from the epoch after), mapped by V08 §2.6's deposits row; `IslandRule.node.bonus`; for the clerk's `why` alone, the generation report's `ruin.node` line (V04 §3.5.0a (9), written by volume 4's tail at T6), which names the ruin a node stands at | `h_town` (count, area, altitude); the clerk's `why`; the CSV statistics | II.6 (3) (BCR-V5-17); the digest's `site.deposits` (read, not re-derived) |
| `S_carried` (V5 §3.3) | the fill's households' bands and the town's `FieldBands.cuts`; an institution row's `requirementBand` | `h_carried`, area; `SkyIsland.supply.carried`; the island field (V5 §3.11) | §4.5 bands, II.6 (3) |
| `IslandRule` value rows `townSupply`, `carriedSupply` (V5 §2.4) | defaults here; `editTable`; the P0 calibration (V5 §8) | `h_town`, `h_carried` | II.6's `IslandRule` (BCR-V5-4) |
| the calibration register entries of `islands.json`'s calibratable columns and of `lights.json`'s new `radiusMarginM` (V5 §8's *The register at the exits*; SCC-R2C-15) | the seats landing P1 and P2, each in its landing change, with `plat calibrate register --defaults` (V12 §3.11's default line; this volume writes no line of its own, J-V5.80) | `plat calibrate register --check` (T-V12-20) at P1's and P2's exits; V12's milestone-exit rule and register report (V12 §3.11, §5.2); the corpus stage, which closes the island columns `fixed` with "no admissible frame" | §13.7, §13.9 (V12 §3.11) |
| `IslandInstitution` rows (V5 §2.4) | defaults here; `editTable`; the roster's demand (S2), `Government.kind`, DR9 / DR24 dossier institutions, a custom institution's resolved scene archetype (item 104 (a)) | reason draw (V5 §3.4); the institution claim (V5 §3.8); `SkyHandover.context` | II.6's `institutions` column |
| sky `Allocation` (V5 §3.5) | S7b (5) under the supply law | the unit run's S10a / S10b; the ground's S7b (1) (the remainder) | §2.5 `Allocation`, §4.5 S7b (5) |
| `SkyIsland` record (V5 §2.1) | `SkyStrategy` (V5 §3.6–§3.10), `raiseIsland`, edits (V5 §4) | S14 marks, the slab list, labels, exports, `IslandEpochStep`, the clerk's reader | §2.7 (BCR-V5-1) |
| `Document.nextSkyPart` (V5 §2.1) | every island creation | `PlatKey.part`, the `sky<n>/` prefix | §2.9 (BCR-V5-2) |
| island arena L0 — void face, land face, `rim` chain, water faces (V5 §3.8) | `SKY` L0 batch | the unit run (its land face), the rim draw, exports, the rim resize | §2.2 rule 1 (BCR-V5-2) |
| island `Terrain` with the echo (V5 §3.8) | S1's machinery on the island key, the ground's relief class and river | `ContextVector.slope/terrainClass/upstream` on the island, the surface layer, glTF, the conjured river | §2.3, §4.2 S1 |
| `terrainEcho.reliefClass` (V5 §2.1, §3.8 (3)) | SKY's draw on `island.place` (index `relief`) for an `own` relief; re-drawn by New random on the island | volume 1's `terraceState` on the island's districts (V01 V1-3.17.7 (2)), which the unit run's levelling reads (V5 §3.22 (4)); T-V5-31 (e) (seam SLR3-03) | §2.7 (BCR-V5-1) |
| conjured river `WaterBody` with `fall` (V5 §3.8) | S1's rivers by descent on the island key | the island's decks (S1 (5)) — volume 1's crossing-site spans (V01 V1-3.10.3 (4); seam SLR3-10) — the waterfall mark, the dist-to-water term, exports | §2.3 `WaterBody` (BCR-V5-9) |
| rim strip (V5 §3.10 (5); lifecycle V5 §2.6) | `SKY`'s island L1 batch; re-laid inside the new rim, with the landing yards and the institution claim, by a resize and a rim reshape (V5 §4.2; seam SLR3-02) and by New random on the island (SKY's island steps re-run) | the unit run (never cut, never plotted), the rim walk — volume 1's `plantRimWalk`, called by the unit run and by a resize and a rim reshape (V01 V1-3.10.3 step 4; seam SLR4-03), the rim lights, SKY-F's checks | §2.5 `Block.interior` `rim_strip` (BCR-V5-6) |
| `landing` reservations (V5 §3.10) | `SKY` L1 batch — on each island, re-claimed at its re-seated top by a resize or a rim reshape (V5 §4.2; seam SLR3-02); on the ground the landing yards under SKY's own data key `reservations.landing` (V5 §3.1; BCR-V5-3) | the unit run's fabric (each reached like a gate), S10b (the top landing plot), `SkyAccess.top`; on the ground S8 (a hole, its attach a destination, BCR-V5-20), S10a with its hook S9b (V01 §3.1's read-set) and S12a, each declaring `reservations.landing` | §2.5 `Reservation` (BCR-V5-6), §4.1's declared I/O (BCR-V5-3) |
| `SkyAccess` record (V5 §2.2) | `SKY` access step, `placeSkyAccess`, the island's move | S14 marks, lights, exports, the ground landing row, the reader | §2.7 (BCR-V5-1), §6.3 anchor table |
| ground landing allocation row `{ cls: 'sky_landing', at, access }` (V5 §3.10) | `SKY` access step, under SKY's own data key `allocations.landing` (V5 §3.1; BCR-V5-3) — never a rewrite of a row S7b wrote | S10a, which reads it with S7b's `allocations` and takes its staff households from the host district's `modest` demand (BCR-V5-6); S10b / the hinterland unit's S12a (a plot on a way or a trail), S11 (the landing house), the field pass 2 landing kernel | §2.5 `Allocation` rows (BCR-V5-6), §4.1's declared I/O (BCR-V5-3), §4.5 pass 2 (BCR-V5-5) |
| `sky_landing` / `sky_landing_top` class rows (V5 §2.4) | defaults here (facts), rows by volume 11 | S10b, S11, the reader, exports | §10.2 class table |
| `SkyIsland.field` and the island's prosperity gradient (V5 §3.11) | `SKY` from the carried bands' plot-land shares, `IslandRule.field.rank`, the island's terrain and rim, the town's `FieldBands` cuts, density and greenery; `setAttr(field.*)` and island brush strokes | `ContextVector` on the sky arena through `SkyHandover.field`; the island plots' bands (S10a's band capacity on the island); the clerk | §2.5 `ContextVector` (BCR-V5-6) |
| `SkyHandover` (V5 §2.3; a derived view, never stored) | `skyHandover(doc, island)` of `@plat/sky`, from the committed island record, arena, claims and allocation | volume 1's unit runner (V01 §3.10.3), called with SKY's `sky` request at generation, and after generation by `raiseIsland` and New random on an island (V01 V1-3.10.3 (6); seam SLR3-09) | II.1 (5), V01 §2.4, §3.10.3 |
| `groundRefCm` and the altitude, fixed at SKY (V5 §3.9) | the ground terrain under the projected solid; S5's walls, towers, gates and castle; the tower rows of the classes allocated to the districts beneath; `casterAllowanceM` | `elevationCm`, the island's terrain datum, the shade strip, the slab list, SKY-F's clearance check | §2.7 (BCR-V5-1) |
| `IslandShadeStrip` (V5 §2.3a, V5 §3.19) | `islandShadeStrip(island, samples)` over the caster's `shadeBasis` (its smooth underside tiers), the unlevelled ground terrain and the model's sun samples (item 102 (a)); onto the ground computed once per shade evaluation at its first read — volume 1's S9b at S10a's `afterDrivers` hook where it is registered, else field pass 2 — and held for pass 2's fold; each epoch's S6 re-evaluation; none cast or received by an island without a basis | the prosperity field's daylight term (OR-ed into its per-sample mask); volume 1's S9b manor sun factor, its close-up hood pins' shade gate and `DistrictContext.shade.islandShare` (V01 §3.5.5, §3.8.2, §2.3); the clerk's `why`, the shade map view (volume 9), the GeoJSON and CSV exports, T-V5-19 – T-V5-21 | §4.5 *Fields* (BCR-V5-15) |
| `SkyIsland.shadeBasis` (V5 §2.1; optional) | every shade evaluation (SKY's last step; S10a's start, before step (i) and every hook, at a re-derivation starting after SKY and at or before S10a; each epoch's S6; Update shade now for its island), from the island as it stands; absent on an island raised or declared since the last evaluation | `islandShadeStrip` (onto the ground and onto islands), on generation, load, replay and every field recomputation — an island without one casts and receives none; the strip's `basis`; §7.5's schema chain for a document older than the basis | §2.7 (BCR-V5-1), §2.9 (BCR-V5-21), §7.5 |
| the strip's `basis` hash (V5 §2.3a) | the hash of `shadeBasis` | the shade view's pending outline (against the live island's hash) and the clerk's "the ground will catch up" (V5 §4.2, V5 §4.5) | §6.2's hash |
| the sky receivers' shade `shadeSky` (V5 §3.11) | a higher island's underside tiers under the same samples, on the island's 32 m lattice | the sky arena's context vector (`prosperity`); volume 1's sky-arena readers — S7c's `shade` term (through `DistrictContext.shade.meanShare`), S9b's manor sun factor, the close-up hood pins' shade gate and `DistrictContext.shade.islandShare` (V01 V1-2.3, V1-3.5.5, V1-3.8.2; J-V1.87; seam SLR2-07) | §2.5 `ContextVector` (BCR-V5-6) |
| route distance `skyRoute` (V5 §3.20) | the island's and the ground's class distance rasters, each admitted access's run, `routing.transferM`, the island's land centroid | S10b's relation rows and supply edges across arenas on the island and on the ground; the island context's `dist.market`, `dist.plaza`, `dist.gate` (V5 §3.11); coverage's walking radius; the clerk | §4.7 S10b (BCR-V5-16) |
| the island's coverage units (V5 §3.5 (3)) | item 103 (f)'s coverage rows; the island's district count `k` from `districtHa`; the carried households | the sky allocation's carried workplaces; S7b (1)'s coverage step, which reads the island's units as served | §4.5 S7b (1), (5) (BCR-V5-16) |
| `IslandRule.carry` (V5 §2.4) | defaults here; `editTable`; item 107 (a)'s balance profiles, item 103 (a)'s EMITS and NEEDS columns, item 105 (h)'s `split` rows, the active chains (item 104 (b), `activeChains[]`) | the sky fill: what never goes up, what goes up by share, what may split across arenas (V5 §3.5 (3)) | §4.5 S7b (5) |
| `IslandInstitution.handover` (V5 §2.4) | defaults here; `editTable` | S10b's placement into an S3 reservation an institution island leaves (V5 §3.5); the report; the clerk | §4.2 S3 (2), (8) (BCR-V5-19) |
| the island cathedral's crypt site (V5 §3.10 (5)) | the claim's site search with the crypt-floor test (`IslandRule.cryptFloorM`); the cathedral's crypt column (volume 11) | the building's basement crypt (volumes 2 and 3); the reader; the `fate` list when the half-sunk form is used | §2.6 basements (volume 3's BCR) |
| `IslandRule.districtHa`, `fabricPrior`, the `sky-*` district kinds (V5 §2.4) | defaults here; `editTable` | volume 1's unit runner through `SkyHandover.context` (the island's district count, its kinds, the fabric prior at S7c) | §10.2 district kinds (BCR-V5-6) |
| cross-arena links, splits and orders (V5 §3.20 (10)–(12)) | item 105's web and item 107's balance rows; `skyRoute`; the accesses; the dossier's `activeChains[]` (volume 8); for S7b (1)'s term, each island's land centroid's world point from S7b (5)'s placement (V5 §3.20 (12) (b); seam SLR2-03) | S10b's binding, two-way pull, relaxation and split placement on both arenas; S7b (1)'s supply term; the clerk; T-V5-22 (h)–(k) | §4.7 S10a–S10b, §4.5 S7b (1) (BCR-V5-16) |
| the rim as a barrier (V5 §3.21) | the island's `rim` chain; volume 11's `sheer` defensibility row; an author's T3 wall on the island's key | the barrier-closure enceinte on the island; the clerk's unwalled side; T-V5-27 | §2.7 `Enceinte.closure` (item 106 (a), applied by the coherence pass) |
| the access admissibility transform (V5 §3.7 (2)) | the 64 m class raster; the admitted access rows' runs | S7b (5)'s candidate filter | §4.5 S7b (5) |
| the ground landing destination (V5 §3.10 (4)) | SKY's ground L1 batch where no spine lies within reach | S8's first cut in the face (BCR-V5-20); SKY-F's check | §4.6 |
| `EpochOps.demandTaken`; the displaced pool's cause `island` (V5 §3.15) | `IslandEpochStep` (refloats, raises, releases, falls) | volume 6's `siting` step (V06 §3.8.1) | V06 §2.1 (BCR-V5-23) |
| the sky semantics' slots and the `sky.ground` role (V5 §5.1) | this volume's per-family facts; volume 11's palette rows (row 52) | §8.2's loader and every shipped sheet | §8.2 (BCR-V5-18) |
| the sky's `WhyProvider`; the daylight term's per-island attribution (V5 §4.5) | `@plat/sky` | volume 10's `why` on islands, accesses, landfalls and shaded ground | V10 §2.13 |
| custom chains across the island (V5 §3.20 (9)) | the dossier's active reviewed chains (V08's arrival, item 104 (b)) and `activeChains[]` (item 105 (i)); the nodes' resolved profiles (item 104 (a)); `skyRoute` | S10b's supply edges between a chain's island and ground nodes; the chain's shape reading (stretched through the landing, close at street scale on the ground; any quarter name past item 72's threshold is volume 1's, on the ground); the clerk's `why`; the CSV row; T-V5-24 | §4.7 S10b, item 104 (h) (BCR-V5-16) |
| the landing classes' siting facts (V5 §2.4) | this volume; their rows volume 11's | S10b's neighbours on both arenas (their EMITS read), the clerk | §10.2's profile columns (item 103 (a)) |
| sky light rows `rim`, `keel`, `skyAccess` (V5 §3.13) | the light table; `h_carried` | `LightSource` records, §8.4's light pass, night exports | §4.7 *Light sources* (BCR-V5-8) |
| island name and `QuarterNode` root (V5 §3.14) | S13a's naming with the island's features | `LabelEntity` (quarter), the gazetteer, exports | §9.1, §10.4 |
| `UndersideProfile` (V5 §2.1, V5 §3.9) | SKY from the rule's `underside` row and `island.place`; `setAttr(underside.*)` | `undersideTiers` (the slab list, the offset view's silhouette, glTF's underside), the model's smooth tiers (the shade strip, V5 §3.19), the altitude floor | §2.7 (BCR-V5-1) |
| the underside's slab tiers and the sky surface layer (V5 §5.3) | S14 from the island record and `undersideTiers` | §8.4's traversal and light pass | §8.4 (a), §8.8 (BCR-V5-13) |
| `IslandEpochStep` (V5 §3.15) | the epoch's field, rung and demand; the dossier's institution records; registered as volume 6's `EpochParticipant` `sky.islands` at the step `afterField` (V06 §2.1, §3.2) | `ConversionOp` island kinds; `EpochOps.demandTaken`; the displaced pool (cause `island`), which the epoch's `siting` step houses | §4.11 (BCR-V5-7), V06 (BCR-V5-23) |
| landfall (`fallen_island` decoration with its typed `members` (`DecorationMember`, BCR-V5-9; seam TT-03), `quarry` land use carrying `source`, the covered walls with their towers and gates — `breached` over each covered length, extended over each covered tower's and gate's footprint chord (a `Gate` of any kind), in the enceinte's `condition` (file f item 575; seams TT-09, TU-03, TV-04) — bridges, reservations and ways — each covered way dropped to `track` with its former class written to `Way.formerClass` unless it already carries one (BCR-V6-5) — the covered raised spans and raised-way piers, retaining walls stepped to `decayed`, deck plots tombstoned with their decks, ledger credit) (V5 §3.16) | `fallIsland` | §8.2's `fallen` row (BCR-V5-18) and each covered kind's own state rows, labels, the salvage ledger, the regrowth lottery's salvage weight; volume 6's landfall clearance (V6 §3.5.2), which restores each covered way's class from its `formerClass` and removes each member from `members` in the batch of the op that ends its cover; volume 6's repair of a breached ring in use (V6 §3.7.5), which reads the `condition` runs; volume 4's access closures (V4 §3.10), which read the members; the epoch's raised-way pass (an aqueduct's lost supply, V06); never the underground's quarry rules | §2.7 `Decoration`, `LandUse` (BCR-V5-26), `MaterialLedger`; §4.11 salvage (BCR-V5-7, BCR-V5-9) |
| raised parts, retaining walls, massing tiers and levelled platforms as casters under an island (V5 §3.9 (3)–(5), §3.22 (1)) | item 110 (b)'s raised-way generator (at S4 and S6's end in the recommended slot) and T4 `road` with `raised` or the aqueduct class; item 110 (a)'s levelling (S10, S11) and T3 `retaining`, T2 terraces; volume 2's stack envelope (V02 §3.15.2); volume 11's raised-way height rows | the caster ceiling at SKY (`groundRefCm`), SKY-F's clearance check, the epoch's clearance re-check (V5 §3.15 (7)), a ground edit's re-read beneath an island (V5 §4.3) | §4.7 S10–S11, §8.4's casters (item 110 (a)–(c), applied by the coherence pass) |
| `sky.clearance` epoch participant and the op `reclearIsland` (V5 §3.15 (7)) | every caster the epoch committed under an island (V06's `EpochScope.built`, `.raised`, `.levelled`) | the island's `groundRefCm`, `altitudeCm` and, where the floor fails, `elevationCm`; the fate list; never `shadeBasis` | V06 §3.2's `afterGrowth` participant table (BCR-V5-28); §4.11's `ConversionOp` (BCR-V5-7) |
| `skyAccessObstacles(doc)` (V5 §2.3b) | the committed `SkyAccess` records, their islands' anchors and rim bases, `IslandRule.accessSiting.lineClearM` | two callers: item 110 (b)'s raised-way route solver for every raised part laid after SKY (an epoch's raised-way pass, a generation stage after SKY if the integrator places one there) and T4 `road`'s `raised` dry run | item 110 (b)'s course solver (BCR-V5-29) |
| the accesses' admissible ground without decks and raised-way piers (V5 §3.7 (2), §3.10 (3)–(4)) | the committed raised parts' pier footprints and deck plans dilated by `accessSiting.deckGapM`; item 110 (d)'s deck faces | S7b (5)'s reachability transform, SKY's feet and landing yards, the rope-line clearance, F-SKY-ACCESS | §4.5 S7b (5), V5 §3.10 |
| island `RetainingWall`s (V5 §3.22 (4)) | volume 1's unit run levelling island ground at S10 and S11 by item 110 (a)'s thresholds; T3 `retaining` and a T2 terrace stroke with the island's `key` | the island's marks (drawn in its frame, displaced with it), the surface top and the crypt re-test at SKY-F, the `sky` export collection, the fall's tombstones | §2.7 `RetainingWall` (BCR-V5-27) |
| the generator's reads of the sky (V5 §3.22 (5)) | this volume's rule | item 110 (b)'s elevated-road and aqueduct sources: ground-arena endpoints bound to reservations, ground hydrology, the water need by arena | the raised-way generation text of the coherence pass (BCR-V5-29) |
| the strip's receiver heights — the unlevelled ground raster (V5 §2.3a, §3.19 (3)) | S1's `Terrain` raster with the T2 terrain strokes; item 110 (a)'s levelling kept as platform datums (BCR-V5-30) | every strip onto the ground, its `basis`, the load path | §2.3 `Terrain`, §4.7 S10–S11 (BCR-V5-30) |
| `levelledGroundCm(doc, key, p)` — the levelled-ground reader (BCR-V5-30; seam SL-26) | item 110 (a)'s platform datums from S10 and S11's levelling (the ground's, and the island unit run's on a sky key); else the arena's unlevelled raster — S1's with the T2 terrain strokes on the ground; on a sky key, the island's terrain that SKY writes (V5 §3.8) with the T2 strokes, its fallback from M5 with volume 1's W8 (file f item 309; seam SLR5-06 (c)) | volume 2's `deriveBase`, the ways' stair-or-ramp crossing rule, volume 1's `stepProfile`, volume 1's island bridge build after S8 (`deckCm` from the two bank elevations on the island's key, where nothing is levelled yet; V01 V1-3.10.3 (4); V01's BCR-45, file f item 580; seam SLR4-04), volume 4's wall-face knots, arch-vault floors, foundation obstacles and BCR-45 span rule, its buried floor under a raised grade (V04 §3.5.5) and its village working's depth test (V04 §3.5.7 (a); seam SLR2-12); this volume's surface top, crypt re-test and clearance check (V5 §3.9 (4)–(5), §3.10 (5)); never a field reader | §4.7 S10–S11 (BCR-V5-30) |
| removed slots and removed access ordinals (`convert removeIsland`; `SkyIsland.removed`, `.removedAccesses`) (V5 §3.2 (6), §3.10 (1), §4.2) | T9's delete on a generated island or access (volume 9's delete row), the clerk | S7b (5)'s slot chain at every re-derivation, V5 §3.15 (5) at every epoch, V5 §3.10's access siting, the clerk's "removed by you", volume 9's `info.remove.holds` through `removedSlots(doc)` | §4.11 `ConversionOp` (BCR-V5-7), §7.4 (BCR-V5-25) |
| DR-SKY (V5 §4.4) | the dossier's population, `wealth.label`, `site.magic`, `site.deposits`, institutions (custom ones by their resolved archetype; ladder records by their step type; district-defining records), government, `activeChains[]` | the gate, S_town through DR6, the node term, the institution rows, the fill's held shares, the chain rule | §7.7 derivation table (BCR-V5-12) |
| events `placeSkyAccess`, `quarter` with `sky`, `key` on point-form events (`drawWall` among them), `setField` brushes on an island, `convert removeIsland` and `reclearIsland`, T4's bend at a rim (J-VI.4 (d); V5 §4.2) | the tools T2, T3, T4, T5, T8, T9; the epoch participant `sky.clearance` | the fold; §7.4's lifecycle rows (BCR-V5-25) | §7.1 (BCR-V5-10) |
| F-SKY rows and sky invariants (V5 §3.17) | every `SKY` step | §5.4's report; the dry run | §5.2, §5.3 (BCR-V5-11) |
| budgets (V5 §6) | M6-sky's measurements | §12's rows | §12.4, §12.6 (BCR-V5-14) |

## 2 Data model

### 2.1 The island record, revised (applied by BCR-V5-1 and BCR-V5-2)

```ts
// @plat/model — replaces §2.7's SkyIsland; every length integer cm, every value on the field's [0, 1] scale
interface SkyIsland {
  id: Id                          /* 'sky<part>/island:<token>' (§6.3) */;
  slot: 1 | 2 | 3                 /* the count law's ordered slot it fills (V5 §3.2); a fallen island frees it; a removed one holds it closed until `removed.releasedBy` is set (V5 §3.2 (6)) */;
  key: PlatKey                    /* { layer: 'sky', part }: part taken from Document.nextSkyPart at creation, never reused */;
  anchor: PointCm                 /* world position of the arena's local origin: an island-arena point p stands over the ground at anchor + p */;
  rim: ChainRef                   /* ('rim', island id): the closed structural L0 chain bounding its land (V5 §3.8) */;
  land: FaceRef                   /* its L0 land face(s) inside the rim */;
  areaHa: number                  /* the target area the rim is sized to — the supply law's A or an edited value; the land face's area within ± 1 % of it (V5 §3.6, V5 §3.15) */;
  altitudeCm: Cm                  /* the island's surface datum above groundRefCm — the law's altitude floored by the rim, the root and the clearance (V5 §3.9), or an edited value */;
  groundRefCm: Cm                 /* above the ground datum: the greatest, under the projected solid, of the ground's terrain height plus the caster ceiling there — fixed at SKY, before the plots are cut, so field pass 2 can read the island's shade (V5 §3.9 (3)); raised only by SKY-F's clearance check, the epoch's clearance re-check (`reclearIsland`, V5 §3.15 (7)) or a ground edit beneath (V5 §3.9 (5), V5 §4.3) — the casters it reads include item 110's raised parts, retaining walls, massing tiers and levelled platforms (V5 §3.22 (1)) */;
  // elevationCm is derived at read: groundRefCm + altitudeCm — the surface datum of the island's own terrain and the `z` base of every sky mark (§8.1, §8.4)
  underside: UndersideProfile     /* the rock beneath: its thickness and profile, which shape its shadow (V5 §3.9; owner, J98) */;
  terrain?: Terrain               /* §2.3: its own, key = this island's; datumCm = the ground datum + elevationCm, kept in step (V5 §3.8) */;
  terrainEcho?: { river?: Id /* the ground river it echoes */; relief: 'echo'|'own'|'none';
    reliefClass?: 'plain'|'rolling'|'hilly'|'mountainous' /* S0's relief classes (§4.2 S0): the class SKY drew for an `own` relief (V5 §3.8 (3)); absent for `echo` and `none`; read by volume 1's `terraceState` (V01 V1-3.17.7 (2)) and V5 §3.22 (4) (seam SLR3-03) */ };
  river?: Id                      /* its conjured WaterBody on its own arena (V5 §3.8) */;
  districts: Id[]; allocation: Id /* its S7b (5) sky Allocation */;
  reason: 'prosperity'|'institution'; institution?: Id /* the Institution it carries */;
  placement: { over: 'water'|'fields'|'outskirts'|'core'; byAssignment: boolean };
  occlusion?: 'opaque'|'ghost'|'offset'   /* a per-island override of the sky LayerSpec's (§8.4); absent: the layer's */;
  supply: { town: number; carried: number } /* S_town and S_carried at the last evaluation (V5 §3.3) */;
  field: { prosperity: number /* the island gradient's mean (V5 §3.11); a setAttr makes it a declared target the gradient is shifted to */; density: number; greenery: number };
  shadeBasis?: ShadeBasis         /* persisted: the island as the field's shade last read it (V5 §3.19; item 102 (e)); written only by a shade evaluation, never by an island edit; ABSENT on an island raised or declared since the last evaluation (an epoch's `raiseIsland` after S6, a T5 declaration or a hand `convert raiseIsland` between evaluations), which casts no strip and receives none until the next evaluation writes it (the owner's lag, unchanged; J-V5.72) */;
  accesses: Id[] /* its SkyAccess records, in ordinal order */;
  name?: NameRef;
  state: 'floating'|'waning'|'settled'|'fallen'|'removed' /* 'removed': an author removed it (`convert removeIsland`, V5 §4.2): nothing drawn, its arena archived */; stateSince: { epoch: number; week: number }; dwellUntilWeek?: number /* waning and settled only: the week its dwell ends (V5 §3.15) */;
  removed?: { seq: number /* the removeIsland event */; generated: boolean /* its lifecycle cause was a rule (a slot draw, an epoch's raise), not a declaration */; releasedBy?: number /* the seq of the T5 `sky` declaration that re-filled its slot when no slot was free — the user's re-add serving that key (file f item 260); never an `adjust('islands.count')`; absent: the slot held closed (V5 §3.2 (6)) */ };
  removedAccesses: number[]        /* the ordinals of generated accesses an author deleted, held absent at every re-siting (V5 §3.10 (1)); [] by default */;
  landfall?: Id                   /* fallen only: the ground Decoration its fall laid (V5 §3.16) */;
  declared?: { outline?: true; position?: true; altitude?: true; area?: true; field?: true } /* the paths a declaring event holds (V5 §4.2; §7.2's declared-means-held) */;
  lifecycle: Lifecycle }
```

```ts
interface UndersideProfile {      // the island's rocky root (owner, 2026-09-28: "cast an appropriate shadow related to their size, shape and the angle of the global light"; J98)
  kind: 'cone'|'bowl'|'root'|'flat' /* the radius ratio ρ(z) at depth fraction z ∈ [0, 1] below the rim's base: cone 1 − z; bowl √(1 − z²); root (1 − z)², a stalactite; flat: no root, the rim slab only */;
  rimThicknessCm: Cm             /* the cliff face at the rim: the rim's base lies this far below elevationCm */;
  depthCm: Cm                    /* the root's depth below the rim's base, to its apex; 0 for flat (no draw) */;
  apexOffset: VecCm              /* local: where the apex hangs relative to the land face's centroid — a lopsided root; (0, 0) for flat (no draw) */;
  tiers: number                  /* the root's slab tiers below tier 0 (the rim slab) that the shadow and the offset view read (V5 §3.9); 0 for flat: tier 0 alone */;
  roughness: number              /* 0–1: the displacement share of each tier's ring (V5 §3.9) */;
  source: 'rule'|'edit' }         /* 'edit' once a setAttr set any field: then held by resizes, which scale depthCm only by the area's square-root ratio */

interface ShadeBasis {           // the one sky input a field recomputation reads (C5-01; BCR-V5-21) — a copy, never a vertex (§2.2 rule 5's precedent: Works.before)
  epoch: number; by: 'generation'|'rederive'|'epoch' /* the evaluation that wrote it */;
  anchor: PointCm; elevationCm: Cm; groundRefCm: Cm;
  surfaceTopCm: Cm               /* underside tier 0's top as that evaluation read it (V5 §3.9 (4)): the terrain's surface at generation and at a re-derivation, the full surface top at an epoch */;
  underside: UndersideProfile    /* a copy */;
  rim: PointCm[]                 /* the rim chain's lattice points in the island's local frame, in chain order from its lowest-(y, x) vertex, ≤ `shade.basisVertexCap` (256): a longer chain is reduced by the kernel's simplification at a 1 m tolerance (§3.4), which moves no strip bit at the 32 m cell (T-V5-20) */ }
```

**Local coordinates, one world anchor.** An island's arena is laid in its own local frame centred on (0, 0) (V5 §3.8), and
the island stands over the ground plan by one integer translation, `anchor`. A move is one attribute (V5 §4.2); nothing on
the island is re-snapped, re-keyed or re-derived by it. Every reader that meets the ground converts by that translation
alone — S14 (marks and label candidates, V5 §5.1), the slab list (V5 §5.3), exports (V5 §5.5), placement and the landing points
(V5 §3.7, V5 §3.10) — and every logged position on the island is local (V5 §4.2), so a later move never invalidates it. No
rotation: an integer translation keeps every lattice point a lattice point (§3.2 (7)), and a turned island is a reshaped
one (a `warp` on its key, V5 §4.2).

**`removedSlots(doc)`** (`@plat/sky`, draw-free) — `{ island: Id; slot: 1|2|3; name?: NameRef; seq: number; accesses:
number[] }[]`: every island record in state `removed` whose slot is still held, and every island's `removedAccesses`, in
slot order; read by volume 9's `info.remove.holds` card and history row and by the clerk (V5 §4.5). Derived, never
stored.

**`Document.nextSkyPart: number`** — the part the next island takes (1 at creation), never decreasing, like
`nextUndergroundPart`; an event that creates an island records the part in the island's address, so a replay reads it
there. The slot (1–3) is the count law's; the part is identity. A fallen island's part stays spent.

### 2.2 The access record (new; registry row by BCR-V5-1)

```ts
interface SkyAccess {
  id: Id                          /* 'sky<part>/skyaccess:<token>' — keyed in its island's arena, where its top vertex lies */;
  island: Id; kind: 'hoist'|'ropeway'|'stair'|'lightBridge';
  top: VertexRef                  /* ('sky_access', access id): its vertex on the island's rim chain (a vertex role, BCR-V5-2) */;
  topLanding: Id                  /* the island-side landing Reservation, kind 'landing' (V5 §3.10) */;
  ground: { at: PointCm /* world: the foot, a point attribute (§2.2 rule 5) carried with its host under a warp (§7.4) */; plot?: Id /* the ground landing plot, once placed */ };
  role: 'main'|'service'|'guarded';
  state: 'open'|'closed'          /* stored: a hand closure only; the readings `unserved` (island waning past half its dwell, or settled) and `ruined` (island fallen) are derived, never stored */;
  knownTo: 'public'|'local'|'secret'; rule: string /* the SkyAccessRow it took */; lifecycle: Lifecycle }
```

**No access is a way** (J-V5.61). A `SkyAccess` is never a way, an arena edge between arenas or a portal, and it carries
no deck plots (item 110 (d)'s plots stand on way decks); a raised way never reaches an island (V5 §3.22 (3)). Its foot
stands on ground part-0 land only — never on a deck face, a raised-way pier or under a raised deck (V5 §3.10 (4); J-V5.60).

Derived at read, never stored: the run (`hoist` and `stair`: the vertical drop from the rim base to the foot's ground;
`ropeway` and `lightBridge`: the 3-D length from the top to the foot), the slope, and the foot's ground height. A row's
`maxRunM` limits the **horizontal** distance from the top's world point to the foot, for both slanted kinds (V5 §2.4). A
`stair`'s path is a helix of radius `access.stair.radiusM` (6 m) about the vertical through its foot, from the foot's
ground to the rim base, rising `access.stair.stepM` (0.5 m) per step with a landing every `access.stair.landingM` (20 m)
of rise, its last turn ending at the top; the marks and the glTF steps are laid along it (V5 §5.1, V5 §5.5). The ground
landing of a `secret` access carries the access's `knownTo`: its `sky_landing` use is fronted by item 63's `front` mode (a
warehouse or a stable, the `sky_landing` row's front column) and withheld from every key that does not admit it (§9.2's
filter), as the access itself is.

### 2.3 The hand-over to the unit run (a derived view; never persisted)

```ts
// @plat/sky exports skyHandover(doc, island): SkyHandover — draw-free, assembled from committed state; its one caller is
// volume 1's unit runner (V01 §3.10.3) when the NeighbourhoodRequest it serves has layer 'sky'
interface SkyHandover {
  island: Id; key: PlatKey; land: FaceRef /* L0 */; rimStrip: FaceRef /* L1, never cut, never plotted */;
  claims: Id[]                    /* the institution's Reservation (an institution island) and every landing Reservation — holes the fabric cuts around */;
  landings: { reservation: Id; attach: VertexRef /* ('attach', reservation, 0): the vertex a way must end at */; access: Id; role: SkyAccess['role'] }[];
  river?: Id                      /* its decks are S1 (5)'s sites on the island (V5 §3.8), qualified and spanned by volume 1's unit run (V01 V1-3.10.3 (4)) */;
  allocation: Id                  /* the S7b (5) sky Allocation the unit runner splits over its districts (V01 §3.10.3 (4)) */;
  field: { raster: { cellCm: number /* 3 200 */; origin: PointCm /* local */; w: number; h: number; values: Float32Array /* the island's prosperity before the brush strokes, V5 §3.11 */ };
    mean: number; density: number; greenery: number } /* what the unit runner's field step reads — never recomputed from h(S_carried) */;
  context: { reason: SkyIsland['reason']; institutionKind?: string;
    districtKind: string /* 'sky-island' on a prosperity island's faces; the institution row's `districtKind` on the claim's face (V5 §2.4) */;
    districtHa: number /* IslandRule.districtHa: the land per island district the runner's k reads (V5 §3.12) */;
    fabricHint: FabricStrategyId /* a PRIOR for S7c on every island district: the hinted template's weight × fabricPrior, never a forced strategy */;
    fabricPrior: number /* IslandRule.fabricPrior (3) */ } }
```

SKY builds, per island, the `NeighbourhoodRequest` of V01 §2.4 — `district` the island's sky pseudo-district, `key` its
arena, `layer: 'sky'`, `boundary` the land face's runs (every rim run a hard `sky` seam, no portal), `laid` empty (so
the mode is `unit`), `strategy` absent (S7c picks it per island district, reading `fabricHint` as a prior) — and calls
`NeighbourhoodStrategy.generate`; the unit runner reads `skyHandover(doc, island)` for everything the request does not
carry. Nothing of the view is stored: it is re-assembled
from the committed record, arena and allocation whenever the unit runner runs (generation, `raiseIsland`, New random on
the island; V01 V1-3.10.3 (6); seam SLR2-02). **The partition is volume 1's:** the island's district count and its cut are V01 §3.10.3
(2)'s — this volume neither counts districts nor seeds them (J-V5.28) — with the island's own district size: k is
volume 1's `skyDistrictCount(plotLandM2, districtHa)` (V01 V1-3.16), called with `context.districtHa` in place of the
town's mean district area; its share is volume 1's `hood.constants.sky.plotShare` (V01 V1-3.14), never a copy here
(J-V5.45; V5 §3.12's reconciliation item 7; seams SL-27, SLR1-11).

### 2.3a The shade strip (derived with the prosperity field; item 102)

```ts
// @plat/sky exports islandShadeStrip(doc, island, samples, onto): IslandShadeStrip — pure and draw-free (V5 §3.19)
interface IslandShadeStrip {
  island: Id                      /* the caster */;
  onto: 'ground' | Id             /* the receiver: the ground's field raster, or a lower island's local 32 m lattice (V5 §3.11) */;
  basis: Hash64                   /* §6.2's hash of the caster's `shadeBasis` (and, onto an island, the receiver's), the sampler's digest and the receiver terrain's version under the window — the hash of the UNLEVELLED heights there (V5 §3.19 (3); item 110 (a)'s levelling is read as platform datums, never as receiver heights, J-V5.65) — the strip reads nothing of the live island */;
  evaluated: { epoch: number; by: 'generation'|'rederive'|'epoch' };
  window: { i0: number; j0: number; w: number; h: number } /* in the receiver's 32 m cells: the field raster's (§4.5) or the island lattice's */;
  bits: number                    /* per cell: the sampler's sample points × its sun positions — 1 × 9 by default (BCR-V5-15) */;
  mask: Uint8Array                /* w × h cells, row-major, ⌈bits ÷ 8⌉ bytes each; bit (point · suns + sun) set where the ray from that sample point toward that sun meets this island's solid — the layout volume 6's building shade mask uses (V06 §2.6) */;
  cells: number                   /* cells with any bit set */ }
```

**Where it lives.** The strips of every live island onto the ground are held with the prosperity field's rasters
(§4.5), beside the daylight term's per-sample mask they are OR-ed into (BCR-V5-15), and hashed exactly as those rasters
are (§6.2) — no digest rule of their own; the strips onto an island are held with that island's field values (V5 §3.11).
Nothing reads a strip's bits except the field's composition, the sky receivers' context values, volume 1's S9b manor sun
factor, its close-up hood pins' shade gate and `DistrictContext.shade.islandShare` (V01 §3.5.5, §3.8.2, §2.3) — on an
island, the same readers through `shadeSky`, with S7c's `shade` term through `DistrictContext.shade.meanShare` (V01
V1-2.3; J-V1.87; seam SLR2-07) — all reading the strips held for the evaluation, computed once at their first read (V5 §3.19 (6)) — the clerk's reader and
the shade map view; nothing edits one (J-V5.30). An island without a `shadeBasis` (V5 §2.1) casts no strip and receives
none. **A strip is a pure function of its caster's `shadeBasis`, the receiver
(the ground's committed terrain as the field reads it — S1's raster with the T2 terrain strokes, unlevelled, BCR-V5-30 —
or the receiving island's `shadeBasis` and terrain) and the sampler** — never of the live
island — so the load path, a replay and every field recomputation rebuild the same bits (§2.9, BCR-V5-21); only the
shade view's pending outline and the clerk's "has the ground caught up" read the live island (V5 §3.19 (8)). The strips
are computed at every shade evaluation whatever `w_sun` is (0 included): the fold multiplies them by the weight, and the
shade view reads the held strips (V5 §5.1).

### 2.3b The access obstacles (an export for item 110's raised ways; C5-48)

```ts
// @plat/sky exports skyAccessObstacles(doc): SkyAccessObstacle[] — pure and draw-free, from the committed accesses; world cm above the ground datum
type SkyAccessObstacle =
  | { kind: 'column'; access: Id; at: PointCm /* the foot (a hoist's: its landing yard's centre) */; radiusCm: Cm /* a hoist: the yard's half-diagonal; a stair: access.stair.radiusM + 1 m */;
      floorCm: Cm /* the foot's ground */; topCm: Cm /* the rim base, elevationCm − rimThicknessCm */ }
  | { kind: 'segment'; access: Id; a: Point3Cm /* the top's world point at the rim base */; b: Point3Cm /* the foot at its ground height */;
      clearCm: Cm /* IslandRule.accessSiting.lineClearM (8 m) */ };
```

One entry per open or `unserved` access of every island that is not fallen or removed: a `hoist` or `stair` a column (its
cage or its helix rises through open air), a `ropeway` or `lightBridge` a segment. Its two callers (V5 §3.22 (3); BCR-V5-29)
are item 110 (b)'s raised-way course solver, for every raised part laid after SKY, and T4 `road`'s `raised` dry run: a
deck, its parapet and its raised-way piers stay outside every column, and a deck crossing under a segment keeps `clearCm`
below it. The list is rebuilt from committed state on every call (≤ 9 entries per document); nothing stores it.

### 2.4 The rule tables (data, editable by `editTable`, §7.6; every cell `{value, unit, provenance, calibratable}`)

`IslandRule` is revised (BCR-V5-4) — one row per rung that admits islands, in `@plat/tables` (`islands.json`):

```ts
interface IslandRule {
  rung: 'CITY'|'METROPOLIS';
  chance: [number, number, number]                    /* II.6 (4): 0.6, 0.5, 0.35 */;
  townSupply: { v: number; h: number }[]               /* S_town → h_town, piecewise linear on the absolute value (V5 §3.3) */;
  carriedSupply: { v: number; h: number }[]            /* S_carried → h_carried, likewise */;
  areaHaMax: number; minAreaHa: number; altitudeM: [number, number] /* E_min, E_max */; clearanceM: number;
  casterAllowanceM: number                             /* the caster ceiling where no taller caster is known at SKY (V5 §3.9 (3)) */;
  surfaceTopPercentile: number                         /* the island's surface top: this percentile, over the land face, of its terrain plus eaves (V5 §3.9 (4)) */;
  shade: { ringMaskM: number; stepM: number; basisVertexCap: number } /* the strip's tier-ring masks, its ray step, the basis rim's vertex cap (V5 §3.19, V5 §2.1) */;
  routing: { transferM: number }                       /* the route distance's allowance per access ridden (V5 §3.20) */;
  underside: { kinds: { kind: UndersideProfile['kind']; weight: number }[]; rimThicknessM: number; depthPerRadius: number; maxDepthM: number; apexOffsetShare: number; tiers: number; roughness: number };
  placement: { prefs: { over: 'water'|'fields'|'outskirts'|'core'; weight: number }[]; gapM: number; frameInsetM: number; nearM: number; latticeM: number; topK: number };
  outline: { templates: { template: 'disc'|'d_shape'|'lozenge'|'crescent'|'spindle'; weight: number }[]; detail: string /* a detail row of §4.2 S1 (2) */ };
  frameMarginM: number                                 /* the island arena's frame margin beyond its grown outline (V5 §3.8 (1)) */;
  terrain: 'none'|'echo'|'own'; echo: { amplitudeShare: number; domeM: number; domePerRadius: number; tiltPerMille: number };
  river: { chance: number; minAreaHa: number; flowShare: number; widthM: [number, number]; widthMinorShare: number; springPondChance: number;
    sourceShare: number /* the source's place on the long axis, from its upstream end */; pondShare: number /* the spring pond's area ÷ A */ };
  institutions: IslandInstitution[]; access: SkyAccessRow[];
  accessCount: { perHa: number; max: number }          /* a prosperity island's accesses: min(max, 1 + ⌊areaHa ÷ perHa⌋) (V5 §3.10 (1)) */;
  accessSiting: { footGapM: number; turnStepCdeg: number; turnMaxCdeg: number; deckGapM: number; lineClearM: number } /* feet apart; F-SKY-ACCESS's direction steps; a foot's and a yard's gap to a raised deck's plan; a slanted access's clearance over a raised deck or raised-way pier (V5 §3.10 (4), V5 §3.17, V5 §3.22 (3)) */;
  stair: { radiusM: number; stepM: number; landingM: number } /* the floating stair's helix (V5 §2.2) */;
  landing: { yardWidthM: number; yardDepthM: number; rimStripM: number; wayReachM: number };
  fill: { batchShare: number; householdCapDistricts: number; coverageOvershoot: number } /* V5 §3.5 (2)–(3) */;
  institutionFit: { fitFactor: number; areaCapShare: number; prisonMarginM: number; siteLatticeM: number } /* V5 §3.4 (2), V5 §3.5, V5 §3.10 (5) */;
  cryptFloorM: number                                  /* an island crypt's floor above the rim slab's base (V5 §3.10 (5)) */;
  districtHa: number                                   /* the land per island district volume 1's count reads (V5 §3.12) */;
  fabricPrior: number; fabricRingHa: number            /* S7c's prior on the hinted template; a prosperity island's hint is `ring` from this area, else `bent-cut` (V5 §3.12) */;
  field: { epsilonShare: number; epsilonWavelengthM: number; greeneryBonus: number; rank: { elevation: number; view: number }; bandInset: number } /* V5 §3.11 */;
  carry: CarryRule                                     /* what the sky fill never carries, carries by share, or may split across arenas (V5 §3.5 (3)) */;
  node: { bonus: number }                              /* the magical node's term added to h_town (V5 §3.3) */;
  hysteresis: number; dwellYears: { waning: [number, number]; settled: [number, number] }; growthPerYear: number; altitudeRateMPerYear: number;
  redrawPerYear: number                                /* II.6 (4): 0.1 */;
  landfall: { coverShare: number; stoneM3PerM2: number }; landingKernel: { weight: number; radiusM: number };
  naming: { lowBelowM: number; highFromM: number }     /* the altitude classes S13a reads (V5 §3.14) */;
  export: { gltfRingPoints: number; mistM: number }    /* V5 §5.5 */ }
interface CarryRule {                                  // item 23: a default, never a law — every list is editable
  never: { balance: string[] /* item 107 (a)'s balance profiles */; emitsTopStep: ('smell'|'smoke'|'waterPollution')[] /* item 103 (a)'s EMITS at the profile scale's top step */;
    chainRoles: ('resource'|'processing')[] /* of an active chain — custom (item 104 (b)) or the dossier's activeChains[] (item 105 (i)) — the island's own institution excepted */;
    hardNeeds: string[] /* a hard NEEDS row naming one of these features */ };
  share: { balance: string[]; splitShop: boolean /* the shop part of an item 105 (h) split class may go up by share, its works staying on the ground */ } }
interface IslandInstitution {
  kind: string /* palace, cathedral, prison … data */; tags: string[] /* the roster class tags it takes, in preference order */; requirementBand: string; areaHa: number;
  staffHouseholds: number; weight: number; requires: { government?: string[]; magic?: ('low'|'high')[] /* the `magic` circumstance the row needs */ };
  districtKind: string /* a `sky-*` district kind (V5 §2.4) */; fabricHint: FabricStrategyId /* S7c's prior (V5 §3.12) */;
  archetypes?: { id: string /* a SettlementForge scene archetype, item 104 (a) (2) */; landmarkOnly: boolean }[] /* a custom institution whose resolved profile carries one counts as an instance of this row (V5 §3.4) */;
  handover: { tags: string[] /* who takes an S3 reservation this row's instance leaves on the ground: the first tag the roster demands on the ground, its largest instance */; else: 'park'|'none' } /* V5 §3.5 */;
  accesses: ('main'|'service'|'guarded')[]; near?: 'plaza'|'precinct'|'richest'; far?: 'plaza'; nearM: number; overWeights?: Partial<Record<'water'|'fields'|'outskirts'|'core', number>> }
interface SkyAccessRow { kind: SkyAccess['kind']; magic: ('none'|'low'|'high')[]; weight: number; maxAltitudeM?: number; maxRunM?: number /* the horizontal top-to-foot distance (V5 §2.2) */; needsLandBelow: boolean; extension: true }
```

**Default rows** — our own values (provenance `own`, `extension`: no reference has islands, II.6 (8)), each calibratable;
the three marked ⟨P0⟩ are set by M6-sky's P0 run before the table lands, with the measurement and fallback of V5 §3.3
and V5 §3.9 (5), and their provenance notes name that run. Every calibratable cell, those three included, takes its
calibration register entry from V12 §3.11's default line, written by the seat landing P1 (V5 §8's *The register at the
exits*; J-V5.80):

| row | CITY | METROPOLIS | note |
|---|---|---|---|
| `townSupply` ⟨P0⟩ | (0.45, 0) (0.58, 0.5) (0.70, 1) | same | absolute field values |
| `carriedSupply` ⟨P0⟩ | (0.55, 0) (0.85, 1) | same | a rich-band household in a modest town reads ≈ 0.75 (V5 §3.3) |
| `areaHaMax` / `minAreaHa` | 10 / 1.5 | 20 / 1.5 | one ground district at CITY is ≈ 12–16 ha of built land |
| `altitudeM` / `clearanceM` | [60, 160] / 25 | [80, 220] / 25 | a tall spire is ≈ 100–150 m: an island floats "overlooking the land" |
| `underside` | kinds cone 0.30, bowl 0.25, root 0.40, flat 0.05; rim 10 m; depth 0.45 × the equivalent radius, ≤ 110 m; apex offset ≤ 0.25 × radius; 6 tiers; roughness 0.15 | same | J98 (V5 §3.9) |
| `placement.prefs` | water 1.0, fields 0.8, outskirts 0.6, core 0 | same | II.6's default placement |
| `placement` | gap 80 m, frame inset 50 m, near 600 m, lattice 40 m, top 5 | same | |
| `outline.templates` | disc 0.25, d_shape 0.15, lozenge 0.20, crescent 0.10, spindle 0.30; detail `rough` | same | §4.2 S1 (2)'s rows |
| `terrain` / `echo` | `echo`; amplitude 0.25 of the ground's relief class, dome 6 m + 0.02 × radius, tilt 8 ‰ | same | |
| `river` | chance 0.75, ≥ 3 ha, flow share 0.02, width [3 m, 0.08 × the minor axis], spring pond 0.5 | same | |
| `landing` | yard 12 × 14 m, rim strip 6 m, way reach 60 m | same | |
| `field` | ε share 0.05, greenery bonus + 0.10 | same | |
| dynamics | hysteresis 0.05, dwell waning [5, 15] y, settled [10, 40] y, growth 0.05 of area per year, altitude 4 m per year, redraw 0.1 per year | same | per year, §4.11 (5) |
| `landfall` | cover share 0.5, stone 3 m³ per m² | same | |
| `landingKernel` | weight 0.05, radius 150 m | same | field pass 2 (V5 §3.10) |
| `surfaceTopPercentile` | 95 | same | a lone tall eave does not set the rim slab's top (V5 §3.9 (4)) |
| `frameMarginM` | 40 m | same | the arena's context margin beyond the grown outline (V5 §3.8 (1)) |
| `river` (the new cells) | source at 0.15 of the long axis from its upstream end; spring pond 0.015 of `A` | same | V5 §3.8 (4) |
| `accessCount` / `accessSiting` | one access per 5 ha, at most 3 / feet ≥ 30 m apart, turns of 30° up to ± 90° | same | V5 §3.10, V5 §3.17 |
| `accessSiting` (item 110's cells) | deck gap 4 m; line clearance 8 m | same | a yard's carts and a hoist's swinging cage keep 4 m from an arch's deck; a rope line's sag and swing keep 8 m over a deck and its parapet (V5 §3.22 (3); own, calibratable) |
| `stair` | helix radius 6 m, 0.5 m per step, a landing every 20 m of rise | same | a stepped stone stair round a column of air (V5 §2.2) |
| `fill` | batch 1 % of the band's demand (≥ 1 household), cap 3 × `H_d`, coverage overshoot 1.05 | same | V5 §3.5 (2)–(3) |
| `institutionFit` | fit 1.3 × the row's area, island cap 2.5 × the row's area, prison yard margin 20 m, claim site lattice 10 m | same | V5 §3.4 (2), V5 §3.5, V5 §3.10 (5) |
| `cryptFloorM` | 1 m | same | at least a metre of rock under a crypt's floor (V5 §3.10 (5)) |
| `districtHa` | 3.5 ha | 4.5 ha | about one Neighbourhood patch of land per island district; a full island is two or three districts (V5 §3.12; J-V5.45) |
| `fabricPrior` / `fabricRingHa` | 3 / 6 ha | same | V5 §3.12 |
| `field` (the new cells) | ε wavelength 120 m; rank 0.6 × elevation + 0.4 × view; band inset 0.1 of each band's width | same | V5 §3.11 (J-V5.18) |
| `carry` | never: balance `heavy-processor`, `wholesale-storage`; smell, smoke and water pollution at the top step; chain `resource` and `processing` nodes; hard needs `running_water`, `river_bank`, `harbour`, `gate`, `quay` · by share: balance `everyday`, `specialist`; split shops on | same | items 103 (a), 105 (h), 107 (a) (V5 §3.5 (3)) |
| `shade.basisVertexCap` | 256 vertices | same | V5 §2.1 |
| `naming` | low below 90 m, high from 150 m | same | V5 §3.14 |
| `export` | glTF rings 64 points; mist quad 30 m | same | V5 §5.5 |
| `casterAllowanceM` ⟨P0⟩ | 30 m | 40 m | a five-storey house with its roof ≈ 22 m, a tall tree's crown ≤ 30 m; the measurement and fallback are V5 §3.9 (5)'s |
| `shade` | ring masks 4 m, ray step 8 m | same | a quarter of the field cell's half-width (V5 §3.19) |
| `routing` | transfer 100 m | same | the wait and the loading at a landing, in metres of walking (V5 §3.20) |
| `node` | bonus 0.25 | same | a quarter of the supply's range: a middling town on a node supplies like a rich one without it (V5 §3.3) |

| institution row | tags | band | area | staff households | weight | requires | district kind / fabric hint | accesses | placement | custom archetypes (item 104) | hand-over of an S3 reservation |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `palace` | `palace` | `rich` | 3.0 ha | 40 | 0.35 | government `crown` or `seigneurial` | `sky-palace` / `street` (an axial avenue from the landing to the forecourt) | main, service | near the plaza, 1 000 m | `martial-keep`, landmark only | `town_hall`, `guildhall`; else `park` (the palace gardens) |
| `cathedral` | `cathedral`, `great_temple` | `prosperous` | 1.5 ha | 20 | 0.25 | — | `sky-temple` / `landmark` | main, service | near the precinct where one is reserved, else the plaza, 800 m | `sacred-sanctuary`, landmark only | `church`, `temple`, `chapel`; else `park` |
| `prison` | `prison` | `prosperous` | 1.2 ha | 15 | 0.20 | — | `sky-prison` / `square` | guarded | far from the plaza (≥ 1 000 m); water 1.5 | — | none (sited by S10b; no S3 reservation) |
| `tower` | `mage_tower` (its lowest-ordinal instance), `mages_guild` | `prosperous` | 0.6 ha | 4 | 0.20 | `magic` low or high | `sky-tower` / `square` | main | far from the plaza (≥ 600 m); fields 1.2 | `exotic-tower`, any level | none (sited by S10b) |

The `tower` row is the owner's "unique institution" read for an arcane tower "on its own ground, apart" (item 104 (a)
(2)'s wording for that archetype): it takes a catalogue instance of `mage_tower` (the lowest roster ordinal that is not
a member of a collective record, item 108) or the town's `mages_guild`, or a custom kind of that archetype, and only
where the world has magic (J-V5.31). The cathedral row's second tag is the great temple of a town whose religion row
names one (volume 11's `great_temple`, "as cathedral"), so a non-default religion's seat can float as the cathedral does
(J-V5.58).
A prison's band is its paymaster's: the town's rulers keep it aloft, so it reads `prosperous`, not its inmates' band. A
hand-over tag is taken by the **largest** instance of that class the roster demands on the ground — the greatest planned
plot area at its band (§4.2 S2), ties by roster ordinal — so the cathedral's close passes to the town's greatest parish
church, which becomes the mother church in the old close (V5 §3.5; J-V5.43).

| access row | magic | weight | limits | land below |
|---|---|---|---|---|
| `hoist` | none, low, high | 1.0 | altitude ≤ 400 m | yes |
| `ropeway` | none, low, high | 0.8 | horizontal run ≤ 350 m | no (chosen where the ground below the rim is water) |
| `stair` | low, high | 0.3 at `low`, 0.4 at `high` | altitude ≤ 120 m | yes |
| `lightBridge` | high | 0.5 | horizontal run ≤ 600 m | no |

**The landing classes** (facts this volume fixes; their full class rows are volume 11's, §10.2's schema): `sky_landing` on
the ground — a yard plot of 150–400 m² fronting a way (or reached by a trail), one building by kind: a two-storey hoist
house under a gantry (6 × 8 m), a rope-line tower (6 × 6 m, 18 m), a stair's foot arch, a light bridge's plinth; staffed
by two `modest` households, allocated to its host district or the hinterland (V5 §3.10). `sky_landing_top` on the island —
the landing yard's plot on the rim with its winch house and crane arm (8 × 10 m), rope-line tower, stair terrace or
bridge pylon; no households of its own. **District kinds:** `sky-island` for a prosperity island's districts;
`sky-palace`, `sky-temple`, `sky-prison` and `sky-tower` from the institution rows on the claim's face (data rows of
§10.2's district-kind table, BCR-V5-6; keyed apart from the ground's `temple` and every other ground kind, so the table
has one row per key). Volume 1's unit runner types the island's faces with these kinds (V5 §3.12, reconciliation item 5);
each row carries the affinities of its ground counterpart for S7b's split and S7c (`sky-island` those of the town's
richest ground kind), rows volume 11's.

**The landing classes' siting facts** (item 103 (a)'s profile columns; the rows volume 11 writes must carry them):
`sky_landing` — sited by its access, never by a pull (its allocation row is positioned, V5 §3.10 (4)), so its NEEDS row is
satisfied by construction (a way frontage or a trail); EMITS heavy traffic at the middle of the profile scale and noise at
its lowest non-zero step (the winch, the carts at the yard), so the classes SENSITIVE-TO those keep a little away; CLIENTELE
town-wide (the island's own traffic passes it); SUPPLY: none of its own — it is the island's gate for the route distance
(V5 §3.20); ALIGNMENT: neutral, except a `guarded` landing, which takes its prison's law-and-enforcement alignment, so crime
keeps its distance from a prison's hoist; COVERAGE: none. `sky_landing_top` — the same facts on the island arena.

### 2.5 Identity

| kind | lineage unit and creation index | address | anchor (§6.3) |
|---|---|---|---|
| `SkyIsland` | the town; its slot at generation; at an epoch the town, the slot and the epoch component (J-A8.61); a declared island its declaring event's `seq` | `sky<part>/island:…` | its slot (base) |
| its `Terrain`, its river, its arena's L0 and L1 pieces | the island's `SKY` run, by §6.3's canonical order | `sky<part>/…` | the base rows of their kinds |
| `SkyAccess` | the island; its ordinal in siting order (V5 §3.10); a hand-placed one its event's `seq` | `sky<part>/skyaccess:…` | (its island's address, its role, its ordinal); same island |
| landing `Reservation` (island side) | the island; the access's ordinal | `sky<part>/reservation:…` | its access's address |
| ground landing plot | an ordinary ground plot (its block); its use `sky_landing` names the access | ground | the plot's base anchor |
| landfall `Decoration` | the fallen island (its address) | ground | its island's address |

The unit run's districts, blocks, plots and buildings on the island are ordinary entities of the island's arena under
§6.3's rules, their lineage continuing the island's (volume 1).

### 2.6 The lifecycle of every state field this volume adds or gives a producer

| field | create | read | persist | regenerate | undo | migrate |
|---|---|---|---|---|---|---|
| `slot` | S7b (5)'s slot draw; a declaration takes the lowest free slot, or the lowest held slot when none is free (V5 §3.2 (6)) | the epoch redraw, `raiseIsland`, the anchor match | model digest | kept by succession (slot anchor); a slot a `removed` record holds is never drawn or filled at any re-derivation or epoch (V5 §3.2 (6)) | restored from the undo record | — (new) |
| `key` / `nextSkyPart` | island creation takes `nextSkyPart` and bumps it | every island reader | model digest; the counter in the document | a successor keeps its predecessor's key (§6.3) | the counter never decreases (spent) | older documents: `nextSkyPart` = 1 + the highest sky part present, 1 if none |
| `anchor` | placement (V5 §3.7) or a declaration | S14, slabs, exports, landings, the reader | model digest | kept by a scoped regeneration; recomputed only by Re-derive from S7b | inverse `setAttr` | a record with the base's world `outline` gets as anchor the outline's area centroid rounded to the lattice, and its polygon less the anchor as the rim (below), so the local frame centres on the island |
| `rim`, `land` | `SKY` L0 batch | the unit run, the draw, resize | geometry (the arena) | re-derived by New random on the island; kept by regenerate-keep | the batch's undo record | the base's `outline: Polygon` becomes the rim chain by one `insertChain` in a fresh arena |
| `areaHa` | the supply law or an edit | resize, the fill, the reader | model digest | the law re-evaluates only at an epoch | inverse | — |
| `altitudeCm`, `groundRefCm` | V5 §3.9 at SKY (the caster ceiling, item 110's raised parts included), before field pass 2; SKY-F's clearance check; the epoch's clearance re-check (`reclearIsland`, V5 §3.15 (7)); `setAttr`; a move; V5 §4.3's ground edits (a raised way, retaining wall or building added beneath included) | `elevationCm`, slabs, marks, access runs | model digest | kept; a raise of `groundRefCm` (SKY-F, a ground edit beneath) keeps `elevationCm` and sets `altitudeCm` = `elevationCm` − the new `groundRefCm`, raising `elevationCm` only where V5 §3.9 (4)'s floor then fails (a listed fate); New random re-checks the floor after re-drawing the underside (V5 §3.9 (5), V5 §4.2) | inverse | base `elevationCm` → `altitudeCm` = `elevationCm` − `groundRefCm` recomputed |
| `underside` | `SKY` (V5 §3.9) from the rule row and `island.place` | the slab tiers, the offset view, glTF, the clearance | model digest | re-scaled by a resize; re-drawn by New random unless `source: 'edit'` | inverse | a base record without it gets the rule's default profile, drawn on its slot's key; a `flat` profile carries `depthCm` 0 and `tiers` 0 |
| `terrain`, `river` | `SKY` (V5 §3.8) | the unit run's context vector, exports | model digest (the terrain raster in the arena's chunk) | New random on the island re-derives; T2 edits on the island key | inverse | — |
| `terrainEcho` (`river`, `relief`, `reliefClass`) | `SKY` (V5 §3.8 (3)–(4)): the ground river echoed, the mode by the rule row, and for an `own` relief the class drawn on `island.place` (index `relief`) | the island's terrain (V5 §3.8 (3)); volume 1's `terraceState` on the island's districts (V01 V1-3.17.7 (2)) and so the unit run's levelling (V5 §3.22 (4)); the unit run's context vector; exports | model digest | re-drawn by New random on the island with the terrain; kept by every other edit (a T2 stroke changes heights, never the class) | inverse | an `own` island without `reliefClass` re-draws the class on its `island.place` key (index `relief`) at load, written and reported (seam SLR3-03) |
| `districts` | SKY-F, from the unit run's `NeighbourhoodResult.districts` (V01 V1-2.4) | reader, labels, epochs | model digest | rewritten by SKY-F after every unit run — generation, a raise, New random, a Re-derive (V01 V1-3.10.3 (6); seam SLR3-09); otherwise succession | inverse | — |
| `reason`, `institution` | S7b (5) (V5 §3.4) or an assignment | the fill, the hand-over, labels | model digest | Re-derive from S7b | inverse | — |
| `placement` | V5 §3.7 | the reader, the report | model digest | kept by scoped regeneration | inverse | — |
| `occlusion` | absent; `setAttr` | S14, §8.4 | model digest | kept | inverse | — |
| `supply` | every evaluation (V5 §3.3) | the report, epochs, the reader | model digest | recomputed at S7b and each epoch only | restored | — |
| `field` (the mean, density, greenery) and the island's gradient (V5 §3.11) | `SKY`: the gradient from the carried bands' shares, its mean written; `setAttr(field.prosperity)` a declared target mean (`declared.field`); island brush strokes (`setField` with `key`, V5 §4.2) | the context vector on the island (through `SkyHandover.field`), S10a's band capacity on the island, the clerk | model digest (the three values); the gradient raster is never stored — rebuilt on load from the island's terrain, rim, allocation, the cuts and the stroke list, as §2.9 rebuilds the ground's fields | recomputed at an epoch (V5 §3.15) and by a re-derivation from S7b; a declared target and the strokes are held | inverse | older records: the mean is their uniform value, no strokes |
| `shadeBasis` (V5 §2.1; optional) | every shade evaluation — SKY's last step at generation and at any re-derivation that runs SKY; S10a's start, before step (i) and every hook, at a re-derivation starting after SKY and at or before S10a; each epoch's S6 for every island not fallen; Update shade now for its island — from the island as it then stands; absent on an island that an epoch's `raiseIsland` (after S6), a T5 declaration or a hand `convert raiseIsland` created since the last evaluation, until the next | every strip (onto the ground and onto islands) on generation, load, replay and every field recomputation — an island without one casts and receives none; the strip's `basis`; the clerk | model digest (≤ 2.5 KB per island; nothing when absent) | rewritten only at those evaluations; kept by every island edit, every scoped regeneration of an island and SKY-F (the owner's lag, item 102 (e); J-V5.27) | restored by the undo record of the event whose evaluation rewrote it (absent again where that event wrote the first) | a document whose `schemaVersion` predates the island-basis step of §7.5's schema chain: that step computes, once, the basis of every island not fallen or removed from the island as stored (the old behaviour, which read the live island); at or after that version an absent basis is never computed at load — it is an island raised or declared since the last evaluation (seam ST-49; J-V5.72) |
| `accesses` | V5 §3.10 or `placeSkyAccess` | marks, lights, exports | model digest | kept by New random (tops re-seated, V5 §4.3) | inverse | — |
| `name` | S13a | labels, gazetteer | model digest with its naming record | §6.3's naming cases | inverse | — |
| `state`, `stateSince`, `dwellUntilWeek`, `landfall` | `IslandEpochStep` or a hand `convert` (`removeIsland` among them, V5 §4.2) | epochs, §8.2's rows, the reader | model digest | never by a re-derivation | the conversion's undo record | — |
| `declared` | a declaring event | every re-derivation (held) | model digest | held | inverse | — |
| `removed` (`seq`, `generated`, `releasedBy`) (V5 §3.2 (6), §4.2) | `convert removeIsland` (T9's delete on an island, the clerk); `releasedBy` by a later T5 `sky` declaration that re-fills the slot when no slot is free — never by an `adjust('islands.count')`, whose integer counts held slots as filled and opens only free slots, never a held one (J-VI.14; file f item 260) | S7b (5)'s slot chain at every re-derivation, V5 §3.15 (5) at every epoch, the report, the clerk's "removed by you", `removedSlots(doc)` for volume 9 | model digest | held: never drawn, filled or re-opened by a re-derivation or an epoch (J-V5.62) | the `removeIsland` conversion's undo restores the island whole (its arena from the archive, its households, its accesses and landing uses); undoing the releasing event clears `releasedBy` | absent in an older document: no removal (a base document had no removal that held) |
| `removedAccesses` (V5 §3.10 (1), §4.2) | the fold of a `delete` whose target is a generated `SkyAccess`: its ordinal appended | V5 §3.10's siting at every re-derivation that re-sites accesses (Re-derive from S7b or SKY); the `main` succession; the clerk | model digest | held: the ordinal is skipped and counted, the lowest surviving generated ordinal taking `main` | the delete's undo removes the ordinal and restores the access | absent: `[]` |
| island `RetainingWall`s (V5 §3.22 (4)) | volume 1's unit run on the island (item 110 (a)'s levelling at S10, S11); T3 `retaining` and T2 terrace strokes with the island's `key` | the island's marks and labels, the surface top, SKY-F's crypt re-test, exports, the fall | geometry (the island's arena) | generated ones re-derive with the island's terrain and plots (item 110 (a)'s rule); drawn ones held | the batch's or the event's undo record | none before item 110 |
| `SkyAccess.*` | V5 §3.10 or `placeSkyAccess` | marks, exports, landings | model digest | tops re-seated on a re-derived rim (V5 §4.3), and on a resized or reshaped one with their feet re-landed as a move re-lands them (V5 §4.2; seam SLR3-02) | inverse | — |
| allocation row `at`, `access` | V5 §3.10 | S10b, the hinterland unit | model digest (the allocation) | recomputed with the access | inverse | — |
| the rim strip (its `setback` line and `rim_strip` face) and the island's claims — each landing `Reservation` (`kind 'landing'`) and the institution claim (V5 §3.10 (5); seam SLR3-02) | `SKY`'s island L1 batch | the unit run through `SkyHandover.rimStrip`, `.claims` and `.landings` (the outline less the strip, the claims as holes; V01 V1-3.10.3 (2)); S10b (the top landing plot, the institution); the rim walk by volume 1's `plantRimWalk` (V01 V1-3.10.3 step 4; seam SLR4-03); the rim lights (V5 §3.13); SKY-F's checks (V5 §3.12) | geometry (the island's arena); the reservations in the model digest | re-laid by one island L1 batch at a resize and a rim reshape — the strip `rimStripM` inside the new rim, each yard re-claimed at its re-seated top, the institution claim kept or re-searched inside its district (V5 §4.2) — and with SKY's island steps at New random on the island and at a Re-derive from SKY or earlier; a yard claimed by `placeSkyAccess` and released by an access's delete | the undo record of the event (or the batch) that re-laid them restores the strip line, the yards and the claim as they stood | — (new; a migrated base island's fresh arena, the `rim`, `land` row's, is laid by the same batch) |
| `Decoration.name`, `.source` | `fallIsland` | labels, the reader | model digest | never | inverse | — |
| `Decoration.members` (`DecorationMember[]`, BCR-V5-9; seam TT-03) | `fallIsland` (V5 §3.16 (5)): the covered plots, land uses, reservations, ways and retaining walls by `Id`; the covered raised spans and raised-way piers by their raised way and item 244's support keys | §8.2's `fallen` row (BCR-V5-18: its rubble over each member's face or band — a span's deck band in plan, a support's `ring`), volume 6's landfall candidate (V6 §3.5.2), volume 4's access closures (V4 §3.10), the clerk (V5 §4.5), the per-landfall CSV (V5 §5.5) | model digest (model data) | never by a re-derivation of its own; shrunk only by volume 6's member-leaving `setAttr` of `members` (V6 §3.5.2; J-V6.108) in the batch of whichever op ends a member's cover — a landfall strike, `repairRetaining`, the quarry face's `retypeLand`, `repairRaised`, `dismantle`, or any op that tombstones a member (a raised member whose key its live raised way no longer holds among them); the decoration is tombstoned in the batch that removes the last | the `fallIsland` undo removes the decoration with its list; the writing event's undo restores the prior list | an older list of `Id`s reads as it stands (every `Id` is a member form); absent = none |
| `Way.formerClass` — volume 6's field (V6 §2.8; BCR-V6-5), this volume one of its writers (seam TR-04) | `fallIsland` (V5 §3.16 (4)): a covered way's class before it drops to `track`, written only where the way carries no `formerClass` (a downgraded lane keeps its own) | volume 6's landfall clearance (V6 §3.5.2), which restores the class from it and clears it; `upgradeWay` and regrowth tier (5′) as V06 reads it; the GeoJSON `plat:formerClass` (V06) | model data (V06 §2.12's row) | written again when the `fallIsland` event replays; never by a re-derivation of its own | the `fallIsland` undo restores the prior value (absent where the fall wrote the first) | a landfall recorded before this rule has none: V6 §3.5.2 keeps `track` and reports `landfallClassUnknown` |
| `Enceinte.condition` — file f item 575's step profile, this volume one of its writers (seam TT-09) | `fallIsland` (V5 §3.16 (4)): `breached` over each covered wall stretch's covered length, extended over each covered tower's and gate's footprint chord (a `Gate` of any kind; seams TU-03, TV-04), a `wall_state_knot` at each end; a run already `dismantled` kept (the ladder only steps down) | §8.2's `decayed` row (the gap glyph over each `breached` run), the record's `lifecycle` (`decayed` while any run is not `standing`), §11.1's wall LineStrings split per run, volume 6's repair (V6 §3.7.5: `repairWall` back to `standing`), the clerk's "the walls breached" (V5 §4.5) | model digest, as item 245's profile | written again when the `fallIsland` event replays; carried through a re-derivation, cut or join as item 575 states; never written by a re-derivation of its own | the `fallIsland` undo restores the prior profile and `lifecycle` (absent again where the fall wrote the first) | as item 575 states: absent = `standing` throughout |
| `ContextVector.arena 'sky'` | the unit run's context read | every arena-keyed row | derivation record | recomputed | — | — |
| `IslandShadeStrip` onto the ground (V5 §2.3a) | at S10a — at generation and in every re-derivation from S10a or an earlier stage — once per shade evaluation, at its first read (volume 1's S9b at the `afterDrivers` hook where registered, else field pass 2), held for pass 2's fold; and each epoch's S6 re-evaluation (V5 §3.19), whatever `w_sun` is; none from an island without a `shadeBasis` | the field's daylight composition; volume 1's S9b sun factor, hood pins' shade gate and `DistrictContext.shade.islandShare` (the same held strips); the clerk's reader, the shade map view (volume 9's accessor reads the held strips), exports | held with the field's rasters, rebuilt on load and replay from `shadeBasis` and the committed ground terrain's unlevelled heights (BCR-V5-30) — never from the live island; never in the log | recomputed only at those moments; kept by every island edit and every scoped regeneration (the owner's lag, item 102 (e); J-V5.27) | restored with the field's former state from the undo record of the event that recomputed it | a document whose tables predate item 102 reads `w_sun` = 0 (item 102 (g)'s no-op pin), so the strips it computes change no value |
| `IslandShadeStrip` onto an island; the sky receivers' `shadeSky` (V5 §3.11) | SKY's last step, after every island's own steps; a re-derivation starting after SKY at S10a's start, after the bases; each epoch (V5 §3.15) — from the caster's and the receiver's `shadeBasis` (none where either is absent); at an epoch OR-ed with volume 6's building mask on the island's lattice (V5 §3.19 (7)) | that island's context vector; volume 1's sky-arena readers — S7c's `shade` term (through `DistrictContext.shade.meanShare`), S9b's manor sun factor, the close-up hood pins' shade gate and `DistrictContext.shade.islandShare` (V01 V1-2.3, V1-3.5.5, V1-3.8.2; J-V1.87; seam SLR2-07) | derived: rebuilt on load with that island's field from the two `shadeBasis` values | with the strips onto the ground | as above | — |
| `IslandInstitution.archetypes`, `.tags`, `.handover`, the `tower` row, `IslandRule.casterAllowanceM`, `.shade`, `.routing`, `.node`, `.carry`, `.districtHa`, `.fabricPrior`, `.fabricRingHa`, `.cryptFloorM`, `.frameMarginM`, `.field`'s new cells and the constants of C5-33 (`surfaceTopPercentile`, `river.sourceShare`, `.pondShare`, `accessCount`, `accessSiting` (with item 110's `deckGapM` and `lineClearM`), `stair`, `fill`, `institutionFit`, `naming`, `export`) | the table defaults (V5 §2.4) | V5 §3.3–§3.21 where each is cited | the table (§7.6) | an `editTable` re-derives from the first reader stage (§7.6's rule; S7b for `node`, `carry`, `fill`, `institutionFit`, `districtHa`; SKY for the arena, access, crypt and shade cells; S7c for `fabricPrior`; S13a for `naming`; none for `export`) | `editTable`'s inverse | a table version without them reads the defaults |
| `Reservation.owner` and `.handedFrom` of an S3 reservation an institution island leaves (V5 §3.5; BCR-V5-19) | S7b (5), when the slot's institution holds the reservation: the owner becomes the hand-over instance, or `commons` with the kind re-typed `park` | S10b (the hand-over instance's placement into it), S12b (a park), the reader, the clerk | model digest | re-made by a re-derivation from S7b; kept by every island edit | the event's undo record | absent `handedFrom`: no hand-over |
| the island cathedral's crypt site (V5 §3.10 (5)) | SKY's claim site search (the crypt-floor test) | the cathedral's basement crypt (volumes 2 and 3's `Basement` record, which persists it); the fate list | not stored by this volume: the building's basement record holds the crypt | re-tested with every re-claim (a resize, a rim reshape, New random, a move leaves it standing) | with the claim | — |
| `EpochOps.demandTaken`; the displaced pool entries with cause `island` (V5 §3.15; BCR-V5-23) | `IslandEpochStep` | volume 6's `siting` step, the same epoch | inside the epoch event only; their effects persist as the events the step and `siting` commit | recomputed by a replay of the epoch | the epoch event's undo | — |
| the node term (derived, never stored: `h_town`'s addend) | S7b (5) and each epoch's evaluation, from the digest's `site.deposits` | `h_town` | recorded in `SkyIsland.supply.town`'s evaluation report only | re-read at every evaluation; a deposit change reaches it at the next epoch | — (derived) | — |
| `IslandShadeStrip.bits` and the mask layout | with the strip | the field's composition, the clerk, the view | with the strip | a sampler digest that differs from the strip's basis recomputes it whole (as V06 §3.4 (5) does for its mask) | with the strip | — (re-derived on load, never migrated) |

## 3 Generation

### 3.1 Where the sky runs in the stage graph

| step | when (§4.1's graph) | worker | writes |
|---|---|---|---|
| **S7b (5)** — gate, slots, reasons, fills, outline and placement per slot (V5 §3.2–§3.7) | inside S7b, before S7b (6) and (1) | generation, eager, town-wide | the sky `Allocation`s; data only (no batch) |
| **SKY** — `SkyStrategy.place` (the registration II.6 names), per island in slot order: the arena (V5 §3.8), the underside, the ground reference and the altitude (V5 §3.9 (1)–(4)), the access tops and feet, the island's claims, the ground landing claims (V5 §3.10), the field (V5 §3.11); then, once every island has its solid, its **shade evaluation**: every island's `shadeBasis` written, then the strips onto the islands and the sky receivers' shade (V5 §3.11, V5 §3.19) | after S7b (its S7c hook included, V01 §3.1) and before S12a, S8 and S10a; S7c reads none of SKY's outputs — a landing claim is a hole S8 cuts around (V01 §3.4.1). SKY's ground writes take their own data keys, `reservations.landing` (the ground landing yards) and `allocations.landing` (the `sky_landing` rows for the host districts and the hinterland), which S8, S10a (with its hook S9b) and S12a declare and no earlier stage or hook does (below; BCR-V5-3, BCR-V5-6) | generation, eager | on each island's arena: one L0 batch, then one L1 batch; on the ground arena: one L1 batch of landing claims (`claimSubFace`, as S7b (3)'s claims) |
| **S10a — the strips onto the ground, and field pass 2** (the base's, item 102 (c)) — the islands' strips onto the ground (V5 §3.19), from each island's `shadeBasis`, computed once per shade evaluation at their first read — volume 1's S9b at the `afterDrivers` hook between step (i) and pass 2 where it is registered, else field pass 2 — held, and OR-ed by pass 2 into the daylight term's per-sample mask | S10a, after SKY and before the pool | generation, eager, town-wide | the strips, held with the field's rasters (V5 §2.3a); at a re-derivation starting after SKY and at or before S10a, first — at S10a's start, before step (i) and every hook — the `shadeBasis` of every live island, then the strips onto islands |
| **the unit run** (volume 1, V01 §3.10), one per island | after the ground's S10 (0) (V01 §3.10.3); concurrent with the pool, on its own overlay, merged in lineage order like the hinterland unit (§4.1) | generation | only its island's arena |
| **SKY-F** — the post step: the clearance check (V5 §3.9 (5)), the landing check and repair (V5 §3.12), the sky lights (V5 §3.13) | after the pool's merge, before S12c and S13a | generation, eager | island records; `LightSource` records; at most one L1 repair batch per island |
| S13a, S14 | as the base | — | the island's names and labels (V5 §3.14); its marks (V5 §5) |

**Declared I/O** (seam SL-01; J-V5.70). SKY's `StageDecl` (§4.12) reads S7b's outputs — which, with §4.12's hooks united
into their host's declared inputs and outputs (V01 §3.1, its BCR-26), include S7c's — and writes on the ground only two
data keys of its own: `reservations.landing`, the ground landing yards (their L1 claims are those reservations'
geometry, as S7b (3)'s claims are its reservations'), and `allocations.landing`, the positioned
`sky_landing` rows (V5 §3.10 (4)); on each island it writes that island's arena, records and field. No stage or hook
before SKY declares either landing key: volume 1's S7c reads `reservations` as S3's and S7b (3)'s keys only (V01 §3.1's
hook table). S8 (its holes and destinations), S10a with its hook S9b, and S12a (the hinterland's landings) declare both
beside `reservations` and `allocations`, so §4.1's sort by declared I/O puts SKY after S7b, S7c included, and before
S8, S10a and S12a, with no cycle (T-V5-32). SKY rewrites no row S7b wrote: a landing's two staff households belong to
the landing row, and S10a takes them from the host district's `modest` residential demand when it reads the two keys
together (BCR-V5-6).

The ground's L1 writers become S3, S4, S5, S6, S7, S7b, **SKY** and S8, in that order (BCR-V5-3). Nothing of the sky runs
on the one-click path: `recipe.layers.islands` is off by default (D-3), and with it off S7b (5) makes no allocation and
SKY registers but does nothing — the ground model is byte-identical to the realism golden (T13-1).

**Item 110's raised ways in the order** (C5-47, C5-52; J-V5.63). This volume relies on the slot volume 1's BCR-39
recommends and BCR-V5-29 (a) repeats: every raised part the generator raises is committed before S7b (1) — a viaduct inside
S4's route solve, an elevated road or an aqueduct at S6's end — so it exists when S7b (5) places the islands and when SKY
fixes the ground reference, and it never reads an island (the generated raised-way set is the same with islands on or off,
T-V5-30). Whatever stage the integrator finally picks, the design holds: a raised part that exists when SKY runs is read by
SKY (V5 §3.7 (2), §3.9 (3), §3.10); one committed after SKY is read by SKY-F's clearance check (V5 §3.9 (5)), by the
epoch's clearance re-check (V5 §3.15 (7)) or by the adding edit's dry run (V5 §4.3), and its course keeps clear of the
accesses through `skyAccessObstacles` (V5 §2.3b).

### 3.2 Existence and count

1. **The gate.** Islands exist only if all hold: `recipe.layers.islands = 'on'`; the rung's `RungProfile.layers.islands
   = 'possible'` (CITY, METROPOLIS); the recipe is not a parity preset's (`MFCG` and `FTG` hold `off`: no reference has
   islands, item 23); and, for a dossier-bound document, the circumstance `magic` that DR-SKY derives from the dossier's
   `site.magic` is not `none` (V5 §4.4). A failed gate makes no allocation and reports `islands: off`, `gated: rung` or
   `gated: dossier magic`.
2. **The town supply** `S_town` and `h_town` (V5 §3.3).
3. **Forced slots.** Every declared island of the creation prefix (T5 `quarter` with `sky`, V5 §4.2) and every assignment
   whose criteria carry `sky: true` (V5 §4.2) forces the lowest free slot open, in log order. A fourth is bent at its
   dry run to join the nearest open island as a district on it ("At most three islands float here; this quarter joins
   {island}"; J-VI.4 (a), item 101 R2).
4. **The count.** `recipe.params['islands.count']` — `auto` (default), or 0–3, the `adjust` of V5 §4.2. At an integer `n`,
   exactly `n` slots are open (the forced ones counted first, a slot held by a removal counted as one of them, (6); `n`
   below the forced count is raised to it at its dry run, a bend, J-VI.4 (a)), with
   no draw. At `auto`, each slot k above the forced ones, in order, opens with probability `chance[k] · h_town` and only
   if slot k − 1 is open: one uniform on `island.place` keyed by the town's lineage with creation index `slot:k` (V5 §3.18).
5. The report lists the count, the forced slots and each slot's outcome (V5 §3.4–§3.7), a held slot's outcome being
   `removed by you` (6). With the setting on, the gate
   passed and no island present, the report carries one plain sentence for the author and the clerk — "Islands are on,
   but the city is not prosperous enough to keep one aloft" when `h_town` is 0 or every slot closed `no supply`, "… none
   rose this time" when the slot draws came up empty — and names both remedies: raise the town's wealth (T1 `intend`), or
   place an island by hand (T5 with `sky`, held against its supply, J-V5.10).
6. **Removed slots** (the owner's "a user can decide to add or remove" and item 110 (b)'s "a removal is an edit that
   holds through regeneration", applied to islands; C5-51; J-V5.62). A slot held by an island record in state `removed`
   whose `removed.releasedBy` is absent (`convert removeIsland`, V5 §4.2 — a generated or a declared island alike) is
   **closed with the outcome `removed by you`**: no draw on its `slot:k` or `reason:k` index, no fill, no outline, no
   placement, no SKY run. It **counts as open and filled** — for the slot chain of (4), so a higher slot draws on its own
   creation index exactly as it did before the removal, and toward an integer `islands.count`, so the removal is never
   replaced by an island in another slot (the owner removed that island, not the town's quota of islands). Nothing
   else re-opens it: only (i) the removal's undo, and (ii) a T5 `sky` declaration when no slot is free — the user's re-add
   serving that key (J-VI.14; file f item 260): the lowest held slot then counts as free for it, and the declaring event
   sets `removed.releasedBy`. **A count never releases a hold** (seam ST-04): an integer `islands.count` counts every held
   slot as filled and opens only free slots, never a held one — a cap increase opens only new keys (file f item 260) —
   and `auto` never draws a held slot; an adjust whose integer exceeds the slots it can open lists the fate "slot k is held by
   your removal of <name>; undo the removal or draw an island to use it", and opens what it can. The removed island's households were relocated by its removal (V5 §4.2), so S7b (1) allocates them to
   the ground at every re-derivation and the population stays whole (T-V5-29).

### 3.3 The two supplies, on absolute values (answering RV-pc-3)

The base read the town supply against the town's own cuts (`thresholdCut`); since §4.5's cuts are per-town quantiles, a
mean over the town compared with its own quantile measures the distribution's shape, not the town's wealth, and a mean
never reaches the field's top (`docs/retrovalidation/pipeline-content.md` RV-pc-3). Both supplies are therefore read on
the field's **absolute** value, which the dials, `wealthLevel`'s character offset (§7.7 layer 1) and the epochs' drivers
move (J-V5.3):

* **`S_town`** — the mean prosperity value `P` over the settlement's built land: the cells of §4.5's 32 m field raster
  whose centres lie in a district face (the hinterland, underground, undercity and sky pseudo-districts excluded), less
  the cells in water and in reservations of kind `park`, `harbour_basin`, `moat` or `canal`; at S7b the value after field
  pass 1, at an epoch the value after that epoch's re-evaluation (§4.11).
* **`S_carried`** — the mean, over the households an island carries, of their band's value `v(b)`: the midpoint of the
  band's two cuts on the absolute value (`FieldBands.cuts`), the lowest band's lower cut 0 and the top band's upper cut 1.
  An institution island's `S_carried` is `v(requirementBand)` of its row.
* `h_town(S_town)` and `h_carried(S_carried)` interpolate the rule's `townSupply` and `carriedSupply` rows linearly along
  the value, 0 below the first row and 1 above the last. The **supported area** is `A = areaHaMax · h_carried ·
  h_town` and the **law's altitude** `E = E_min + (E_max − E_min) · h_town` (II.6 (5), unchanged in form).
* **The magical node** (J-V5.41; BCR-V5-17). Where the dossier digest's `site.deposits` carries a `magical_node` in state
  `available` — or `discovered`, from the epoch after the one that discovered it — `h_town` is `min(1, the interpolated
  value + node.bonus)`: magic that wells up on the site costs the town less to keep aloft. It is one addend however many
  such deposits the dossier lists; `depleted` and `removed` add nothing. It acts only where the interpolated value is
  above 0 — a town too poor to supply magic at all is not lifted by a node (the owner's "if there is no prosperity, there
  is no floating islands") — and reaches every reader of `h_town` (the slots, `A`, `E`, the epochs). A map without a
  dossier has no deposits and no node term; the report and the clerk's `why` name the deposit when it acts. **Where the
  node stands is not this volume's:** item 109 (f) puts a dossier's `magical_node` at the heart of an underground ruin
  where one exists — its position volume 4's and volume 8's, the ruin's centre, else S12a's decoration site — and the term
  stays positionless: it reads the deposit's state alone, never the underground arena (item 2). The clerk's `why` names
  "the node beneath the old ruins" from the generation report's `ruin.node` line (V04 §3.5.0a (9): the deposit, the ruin
  system and the ruin's `NameRef`, so a renamed ruin reads its new name), never by reading the ruin; with no such line
  for the deposit it names the deposit alone (seam SLR1-02).

**Calibration ⟨P0⟩ (the confirming measurement, V5 §8).** On 200 CITY and 100 METROPOLIS seeds at their targets, at
`wealthLevel` ∈ {0, 0.25, 0.5, 0.75, 1} with the setting on, record `S_town`'s median `m_w` per level; set `townSupply`
to (m_0.25, 0) (m_0.5, 0.5) (m_1, 1). Bars: the median `h_town` at `wealthLevel` 0 ≤ 0.05, at 0.5 within [0.35, 0.65], at
1 ≥ 0.9, all on standalone intents, so with no node term. **Pre-decided fallback:** if `m_1 − m_0` < 0.10 (the field does not tell a rich town from a poor one), `S_town`
becomes `0.5 · (the field mean) + 0.5 · w`, `w` the intent's `wealthLevel` (with a dossier its derived value, DR6), the
rows are re-fitted by the same rule, and the change is recorded as a declared shift. `carriedSupply` is checked at the
same run: `h_carried(v(rich))` ≥ 0.7 and `h_carried(v(modest))` = 0 at `wealthLevel` 0.5 on ≥ 90 % of seeds; else its
rows are moved so that the midpoint of `v(modest)` and `v(comfortable)` maps to 0 and `v(rich)` to 1, re-measured once.

### 3.4 Purpose — a prosperity island or an institution island

For each open slot, in slot order:

1. **A forced slot** takes its declaration's kind (an institution kind makes it an institution island; any other kind a
   prosperity island) or its assignment's institution.
2. **Otherwise the candidates are:** `prosperity`, weight 1.0, where the roster's households of the bands with
   `h_carried(v(b)) > 0` not yet carried by an earlier slot give at least `minAreaHa` of plot land; and each
   `IslandInstitution` row, at its `weight`, where the roster demands at least one eligible instance of a class carrying
   one of its `tags` (the first tag in the row's order that has one, its lowest roster ordinal)
   — or the dossier carries a custom institution whose resolved profile's scene archetype is one of the row's `archetypes`
   (a `landmarkOnly` entry admitting only `landmarkLevel: landmark`; item 104 (a) (2)), the lowest `localUid` first —
   that no earlier slot carries and that no creation-prefix `placeAt` holds on the ground, its `requires.government`
   (when present) holds for the town's `Government.kind`, its `requires.magic` (when present) admits the recipe's `magic`
   circumstance, and `areaHaMax · h_carried(v(requirementBand)) · h_town` ≥
   `institutionFit.fitFactor` (1.3) × the row's `areaHa`. **An eligible instance is one building or one compound** (item
   108 (a)): a singular record, or a record whose ladder step is SIZE, or a roster instance bound to neither — never a
   COUNT, GUILD or QUARTER record, nor a member `#k` of one (a collective's members stand where their record's spread puts
   them). A dossier institution counts as a roster instance (DR9, DR24): the island moves where it
   stands, never whether it exists (§7.7). The archetype is read at this draw only: a later revision of a custom kind
   re-resolves its profile and keeps it on its island unless a hard row of the new profile fails there, when item 104 (e)'s
   least disruption re-sites it on the ground; the island keeps its reason and its claim, the vacated building steps down
   the base's building ladder as any vacated building does, and the regrowth-first order re-occupies it with the next
   instance of one of the row's tags or its archetype before any ground site (§4.11; V5 §3.15 (4)'s rule for vacant
   stock).
3. **The draw:** one weighted choice on `island.place` (town lineage, index `reason:k`). With no candidate the slot
   closes, reported `no supply` or `nothing to carry`.

### 3.5 The sky allocation (S7b (5) at depth)

**A prosperity slot.**
1. The eligible bands are those with `h_carried(v(b)) > 0`, richest first.
2. Households are taken from the roster's residential demand of the richest eligible band, in batches of
   `fill.batchShare` (1 %) of that band's demand (at least one household), each batch split over the classes by the
   band's class mix at its centre (item 71; largest remainder); after each batch `S_carried` and `A` are recomputed.
   **Held shares are never taken:** the households a dossier district-defining record's raised share holds on its ground
   district (item 72) — a QUARTER record of item 108 (a) among them, a noble or luxury quarter above all — are subtracted
   from the band's demand before the fill, so the island never drains a quarter the dossier names. The fill stops at the
   first of: the carried plot land — Σ over the carried rows of `plotArea(c, b)` × count, S2's plot areas at the band
   centres — reaching `plotShare · A`, `plotShare` volume 1's `hood.constants.sky.plotShare` (V01 V1-3.14; its default
   the base's dense-core share, §4.2 S2), the one share the island's district count divides by, so an edit of it moves
   the fill and the count together (J-V5.45; seam SLR1-11); the carried households reaching
   `fill.householdCapDistricts` (3) × `H_d`, `H_d` the town's households ÷ its district count after S6; or the band's
   demand exhausted, when the next band is taken only if the batch would leave the carried plot land within the
   recomputed `plotShare · A`. `A` falls as poorer households join, so the fill converges (II.6 (5)).
3. **What goes up with them — the carried workplaces, read through `IslandRule.carry`** (J-V5.32, J-V5.39, J-V5.51). For
   each workplace or institution class demanded at the carried bands, the carried households' share of their band's
   households × its count, by largest remainder, except:
   (a) **never carried** — the `IslandInstitution` tags (their own slots); the town-unique classes (§10.2's `unique`
   column: the principal market, the castle, the government's seat); every class whose balance profile (item 107 (a)) is
   in `carry.never.balance` — the heavy processors (mill, tannery, smelter, brewery, dyer) and wholesale and storage,
   which belong by the gates and quays; every class whose siting profile (item 103 (a)) emits one of
   `carry.never.emitsTopStep` at the profile scale's top step, since nothing on an island can lie downwind or downstream
   of its homes; every class with a hard NEEDS row naming a `carry.never.hardNeeds` feature (running water, a river bank,
   the harbour, a gate, a quay) — the conjured river and the spring pond satisfy no NEEDS row (V5 §3.20 (1)); and every
   resource or processing node of an active chain — a custom chain (item 104 (b)) or one of the dossier's
   `activeChains[]` with its processors resolved by kind family (item 105 (i); V08) — the island institution of V5 §3.4
   excepted. Their demand stays on the ground, where the chain keeps its working steps together (V5 §3.20 (9)).
   (b) **carried by share** — every class (a) does not exclude: the everyday services and the town-wide specialists of
   `carry.share.balance` above all, a chain's final seller and its consumers among them.
   (c) **split across the arenas** — a class whose row declares `split` (item 105 (h)) and whose works (a) excludes (a
   butcher's slaughterhouse emits at the top step; a brewer's brewhouse is a heavy processor): with
   `carry.share.splitShop` on, its **shop** may go up by the share while its **works** stays on the ground — one item on
   two plots on two arenas, the shop's building carrying a `Use` whose `branchOf` names the works' use (item 105 (h);
   J-V5.51). Item 105 (h)'s split threshold is read with the route distance (V5 §3.20 (1)) between the island's demand and
   the works' ground site; below it the class stays whole on the ground. Every split is reported; off in the parity
   presets, as the islands are.
   (d) **collective members** (item 108 (b), (c)) — a member `#k` of a COUNT, GUILD or QUARTER record carried by the share
   keeps its record and its key; the record's range check (T73-4) counts its members on both arenas together; a lesser a
   greater subsumes is carried as that greater's member, never as an addition.
   **Coverage** (item 103 (f); J-V5.37). For a class with a coverage row, the island counts as **k units** for a row
   counted by district or neighbourhood — k its district count, volume 1's `skyDistrictCount(plotLandM2, districtHa)`
   (V01 V1-3.16; V5 §2.3, §3.12), computed here from the allocation's plot land by the same call the unit runner makes
   — **one unit** for a row counted by walking radius (the route to the
   ground passes every walking radius, V5 §3.20 (3)), and **⌈its carried households ÷ N⌉ units** for a row counted by N
   households. The proportional share above stands, and the island's units then join S7b (1)'s coverage step as
   candidate units beside the ground's districts (BCR-V5-16), which may add an instance of the class to this allocation
   from the demand it distributes — never remove one — unless the add would carry the plot land past
   `fill.coverageOvershoot` (1.05) × `plotShare · A`, when that unit is skipped for that class (reported). Inside the island,
   the unit run's S10b spreads a coverage class over its districts and spaces its members by item 107 (d)'s same-kind
   row, as on the ground (V5 §3.20 (12)).
4. If `A` < `minAreaHa`, the slot closes (reported) and its rows return to the demand.
5. The island's district count and its partition are volume 1's (V01 §3.10.3 (2), read with `districtHa`): this volume
   counts none (J-V5.28).
6. One `Allocation` (level `district`, target the island's sky pseudo-district) holds the rows; `S_carried` and `A` are
   written to the slot's record-to-be.

**An institution slot.** Its row's instance (V5 §3.4 (2)) with `claim` set once SKY makes the claim (V5 §3.10), plus
`staffHouseholds` households of the requirement band; `A` = min(the law's `A`, `institutionFit.areaCapShare` (2.5) × the
row's `areaHa`) — a compact island, its surround the unit run's gardens, close or yard; its claim's face is typed by the
row's `districtKind` (V01 §3.10.3 (2), V5 §3.12). Then, in order:
1. **A greater goes up alone** (item 108 (c); J-V5.57). A greater that subsumes lessers — a cathedral over the parish
   church, the resident priest and the wayside shrine — takes only its own building up. Its lessers stay separate
   buildings, members of its collective each keeping its `#k`: on the ground by their own rules, and on an island only by
   a prosperity slot's share; each counts once, never as an addition.
2. **The ground reservation's hand-over** (J-V5.46; BCR-V5-19). Where the instance holds an S3 reservation — the temple
   or cathedral precinct (§4.2 S3 (2)), or the reservation a palace takes by the castle's siting rules (volume 11's
   `palace` row) — the reservation stays exactly as it is (no L1 change) and passes to the row's `handover`: the first of
   its `tags` the roster demands on the ground, its largest instance (V5 §2.4), which S10b places into it as its claim
   (the reservation's `owner` becomes that instance and its `handedFrom` the institution that went up); a reservation
   sized for the greater keeps its size, the surplus becoming the incoming instance's churchyard, close or garden by its
   template's yard rows (§4.9). With no such tag demanded, `else`: `park` — the reservation re-typed `park`, owner
   `commons`, laid out by S12b as the old palace gardens or the old close's green — or `none`. An institution the
   creation prefix sends up (a T5 `sky` declaration of its kind, a T6 `criteria.sky` assignment) leaves nothing to hand
   over: S3 never reserves it (BCR-V5-19). After generation — a T6 assignment or an epoch's `raiseIsland` taking a ground
   institution up — its vacated building steps down the base's ladder as any vacated building does, and the
   regrowth-first order re-occupies it with the row's hand-over classes first. The report and the clerk name the
   hand-over ("the old cathedral close — now the mother church").
3. **Burial and the crypt** (item 109 (k) (2)–(3) as revised ~20:05, J111; item 2; J-V5.43). The churchyard part the base
   gives every church and temple plot (§4.9's churchyard row) — the island cathedral's, and any church's a prosperity
   island carries — is a surface burial ground only: it is left out of item 109 (k) (3)'s catacomb candidates and out of
   its "largest cemetery" ranking (volume 4's candidate list skips every sky-arena face). Each church on an island still
   counts once toward the catacomb count (V04 §3.5.1 (3); `CatacombRule.count`'s `churchesPer`, V4 §2.3), since the dossier's church records and the roster set
   that count wherever the churches stand. The island cathedral's crypt — always the settlement's largest (volume 11's
   crypt column, `always`) — is a vault cut into the island's rim slab under the cathedral (V5 §3.10 (5)): part of its
   building, never an `UndergroundSystem` part or an item 109 (j) (3b) link, and no catacomb grows beneath it. The ground
   church that takes the old close keeps its own crypt by the crypted-class rows and is never ranked above the cathedral's.

**The rest.** S7b (1) allocates the remainder to the ground's districts, so the population stays whole (II.6).

### 3.6 Shape (S7b (5), per open slot, in the island's local frame)

1. **Template.** A declaration's points form gives it (a lasso is the outline itself, one point a disc of area `A`, two
   to four corners the routine fitted to their hull); otherwise one weighted draw of `outline.templates` on
   `island.place` (the island's lineage, index `template`).
2. **Bearing.** The long axis takes the ground's principal river's bearing (its course from inlet to outfall) where the
   site has a river; otherwise a uniform bearing on `island.place` (index `bearing`).
3. **The routine.** §4.2 S1 (2)'s closed-outline routine on the template's base curve, with the rule's detail row and a
   uniform envelope (no town side), from `island.place` (index `outline`); the base curve's scale is set by one secant
   step so that the displaced outline's area is `A` within 1 %. F-OUTLINE's ladder applies (§5.2).
4. The outline's centroid is the local origin, and the arena's frame is sized from the outline now drawn (V5 §3.8 (1)).

### 3.7 Placement — where the island floats (S7b (5), per open slot, in slot order)

1. **The class raster.** A 64 m raster over the ground frame classes each cell: `water` (its centre in an L0 water face);
   `core` (in a district of growth stage 1); `outskirts` (in any other district); `fields` (land outside the settlement
   perimeter). It is built once per S7b from the ground plan that exists then (L0, L1, the districts, the perimeter).
2. **Candidates.** The centroids of a `latticeM` lattice over the frame whose translated outline lies inside the frame
   inset by `frameInsetM`, does not meet any placed island's projected outline dilated by `gapM`, and **can be reached**
   (J-V5.54): at least one of its rim's cells on the class raster lies on admissible ground (for a hoist or a stair) or
   within the horizontal run of an admitted slanted access row (`ropeway`, and `lightBridge` where the `magic`
   circumstance admits it) of admissible ground. Admissible ground is the raster's land cells outside water, reservations
   and wall strips, and outside every committed raised part's raised-way pier footprints, its deck's plan dilated by
   `accessSiting.deckGapM` (4 m) and every deck face of item 110 (d) (a mole, a pier, a quay platform or a bridge deck
   that carries plots) — V5 §3.10 (3)'s admissible faces at the raster's cell (a cell is admissible when its centre is);
   the test reads one chamfer distance transform to it (integer, 3–4 weights on the 64 m cells), built once with the
   class raster (J-V5.60).
3. **The score** of a candidate, over the outline's cells on the class raster: (a) the mean class weight — the rule's
   `prefs`, with an institution row's `overWeights` over them, and with `core` at 1.0 when the island is placed by
   assignment or declaration — × 1.0; (b) proximity, − 0.5 × min(1, d ÷ `nearM`), `d` the distance from the outline to
   the settlement perimeter (0 over the town); (c) purpose, 0.5 × one term: a palace or cathedral 1 − min(1, d ÷ the
   row's `nearM`) to the plaza, or for a cathedral to the precinct where S3 reserved one (it is then the hand-over
   church's close, V5 §3.5); a prison min(1, d ÷ the row's `nearM`) from the plaza; a prosperity island
   1 − min(1, d ÷ `nearM`) to the district of highest prosperity mean (ties by district address).
4. **The draw.** The `topK` best (ties by lattice y, then x), then one draw weighted by score − min score + 0.01 on
   `island.place` (index `place`). The chosen centroid is `anchor`; `placement.over` is the class of largest share under
   the outline (ties in the order water, fields, outskirts, core); `byAssignment` is set for a forced slot.
5. **F-SKY-PLACE** (V5 §3.17) when no candidate passes.

### 3.8 The island arena: frame, land, rim, terrain, the conjured river (SKY)

1. **Frame.** Computed after the outline (V5 §3.6 (3)): a square centred on the local origin of side 2 × `r_max` ×
   √1.5 + 2 × `frameMarginM` (40 m), rounded up to 10 m, `r_max` the outline's greatest distance from its centroid — so the
   outline grown to 1.5 × its area by the buffer resize (V5 §4.2) stays inside whatever its template and aspect, a
   spindle as surely as a disc; a declared or edited area past that grows the frame by §3.2 (9)'s single-level batches.
   (The earlier disc-sized side, 2.6 × the radius of a disc of 1.5 × `areaHaMax`, was too small for an elongated outline:
   568 m against a 618–874 m CITY spindle, `scratchpad/volumes/critique-v5/receipts.out`.)
2. **L0 batch.** The arena's outer ring (the `margin` role on the island's `Terrain`), then the rim — the outline as one
   closed chain carrying the structural `rim` role on the island (BCR-V5-2) — making two faces: the **void**, L0 kind
   `sky`, between the ring and the rim; and the **land**, owner the island. Every later batch on this arena lies inside
   the land face.
3. **Terrain.** The island's own `Terrain` (§2.3): the ground's terrain cell; a `hydro` grid at half the ground's hydro
   cell (12.5 m at CITY, 16 m at METROPOLIS: an island's catchments are small); `geology: 'ordinary'`. Heights: a dome
   `(domeM + domePerRadius · R) · (1 − (r ÷ R)²)`, clamped at 0 (`R` the equivalent radius √(A ÷ π), `r` the distance
   from the centroid); plus, for `echo`, §4.2 S1 (1)'s fBm at the ground's relief class with its amplitude × 
   `amplitudeShare`, for `own` the same at a class drawn by S0's relief weights on `island.place` (index `relief`), which SKY
   writes to `terrainEcho.reliefClass` (seam SLR3-03), for `none` nothing; the noise on `terrain.noise` keyed by the island's `Terrain`. Where a conjured river is drawn, the
   surface tilts by `tiltPerMille` along its bearing, downhill toward its fall. Void cells hold 0 and are masked. The
   terrain's `datumCm` is the ground's datum plus the island's `elevationCm`, rewritten whenever that changes (V5 §3.9).
4. **The conjured river** (the owner's "magically conjured river"). Where the ground has a river, `A` ≥ `river.minAreaHa`
   and a draw on `island.place` (index `river`) is below `river.chance`: the source is the point on the long axis at
   `river.sourceShare` (0.15) of its length from its upstream end (upstream: against the ground river's flow); the course is traced and carved
   by §4.2 S1 (3)'s rivers by descent on the island's `hydro` grid until it meets the rim; its width is `w0 · (flowShare ·
   acc)^0.4` — the ground's width law, `acc` the ground river's accumulation at its reach nearest the island's anchor —
   clamped to [`widthM[0]`, `widthMinorShare` × the outline's minor axis]. Its water face enters L0 with `shore` edges,
   bank kinds by §4.2 S1 (7)'s table; where it meets the rim the short stretch between its two banks carries both `rim`
   and `shore`, and the `WaterBody` carries `fall: true` (BCR-V5-9) — its outfall is the waterfall. Its crossing sites
   are §4.2 S1 (5)'s, on the island, built by volume 1's unit run (V01 V1-3.10.3 (4); seam SLR3-10); a bridge there may carry deck plots by item 110 (d)'s base mechanism like any
   bridge, and they fall with the island (V5 §3.22 (6)). No raised part stands on an island (V5 §3.22 (3)). With no
   ground river, a **spring pond** (`pond`, `river.pondShare` (0.015) × `A`, at
   the terrain's highest basin, ties by lattice y then x) by a draw below `springPondChance`. `terrainEcho` records the
   ground river, the relief mode and, for `own`, the drawn class.
5. **F-SKY-TERRAIN** (V5 §3.17) when the descent stalls.

### 3.9 The underside, the ground reference and the altitude (the owner's J98)

1. **The underside profile** (SKY): `kind` drawn by the rule's weights on `island.place` (index `underside.kind`);
   `rimThicknessCm` the rule's; for every kind but `flat`, `depthCm = min(maxDepthM, depthPerRadius · R) · (0.8 + 0.4 ·
   u)`, `u` a uniform on `island.place` (index `underside.depth`), `apexOffset` a uniform point in the disc of radius
   `apexOffsetShare · R` (index `underside.apex`), pulled toward the centroid until the apex lies over the land face, and
   `tiers` the rule's; for `flat`, `depthCm` 0, `apexOffset` (0, 0) and `tiers` 0 with no draw on `underside.depth` or
   `underside.apex` (so a flat island's altitude floor counts no root); `roughness` the rule's; `source: 'rule'`.
2. **The underside tiers** — a pure function `undersideTiers(island)` (`@plat/sky`), view data computed by S14, never stored: for
   tier i = 1 … n (`n = tiers`; none for `flat`) at depth fraction `z_i = i ÷ n`, the ring is the rim eroded by `R · (1 −
   ρ(z_i))` — the kernel's buffer on a transient arena (§3.4, §3.7), integer — translated by `apexOffset · z_i` and each
   vertex moved radially by `roughness · R ÷ n` × a `dmath` noise keyed by the island's render key and the tier; tier i
   spans from `elevation − rim − depth · z_(i−1)` down to `elevation − rim − depth · z_i` (`rim` the rim thickness).
   Underside tier 0 is the rim slab: the rim itself, from the island's **surface top** (below) down to `elevation − rim`. A tier
   whose ring falls below 1 % of the land's area ends the stack; the last tier then runs to the apex. So the solid is a
   stack of nested prisms whose silhouette follows the profile: a `root` hangs a narrow stalactite, a `bowl` a rounded
   belly, a `cone` a straight taper, a `flat` a thin slab.
3. **The ground reference** (SKY, before any plot is cut): `groundRefCm` = the greatest, over the ground's 32 m field
   cells (§4.5) whose centres lie under the island's projected land face or any projected underside-tier ring, of the terrain
   height at the cell centre plus the cell's **caster ceiling** — the greatest of `casterAllowanceM`; the top of every
   caster already placed whose footprint meets the cell (a wall's band, a tower, a gate of any kind, the castle, a bridge or pier
   deck — S5's and S7's, §8.4's casters — and **every raised part of item 110 (b) committed before SKY, whatever stage
   committed it: its deck top with its parapet, or an aqueduct's channel wall, over the deck's plan, and its raised-way
   piers**, with any retaining wall (item 110 (a)) and levelled platform committed before SKY at its high-side top);
   and the `towerCm` of the heights row of every class with a tower (a church, a
   keep; §4.7 S11) allocated to the district holding the cell (the hinterland's allocation outside the districts) — above the
   ground datum. It reads only what exists at SKY,
   so the altitude is final before S10a reads the island's shade — volume 1's S9b or field pass 2, whichever reads the
   strips first (V5 §3.19 (6)) (J-V5.29).
4. **The altitude** `altitudeCm = max(E, rim + depth + clearanceM)` — the law's altitude, raised where a deep root needs it
   so the apex clears the tallest thing beneath by `clearanceM` (J-V5.6) — or the edited value, which the same floor
   bounds (F-EDIT below it). `elevationCm` is `groundRefCm + altitudeCm`. The island's **surface top** — the
   `surfaceTopPercentile` (95th) percentile over the land face of its height at each point: the levelled ground there,
   `levelledGroundCm` on the island's key (BCR-V5-30: the platform datum where item 110 (a) levelled the plot or block,
   else the terrain), plus the eave of the building standing there —
   for a stepped building the eave of the **highest massing tier over that point** (its wing's `baseCm + eaveCm`, V02
   §3.15.2), so a stepped temple has one eave per massing tier, not one eave — is computed with
   the underside tiers (underside tier 0's top). The model's strip (V5 §3.19) reads underside tier 0's top from the terrain alone at generation and from
   the full surface top at an epoch, since item 102 (b) lets buildings cast the daylight term only across epochs.
5. **The clearance check** (SKY-F, after the pool's merge and the unit runs): where a caster placed after SKY under the
   projected solid — a building's ridge or tower (a stepped building's top from volume 2's stack envelope, V02 §3.15.2),
   a tree's crown, a raised part committed after SKY (its deck top with its parapet or channel wall, its raised-way piers),
   a retaining wall's high-side top, or the levelled ground itself where S10 or S11's levelling raises a platform under the
   solid by fill (`levelledGroundCm` above the raster, BCR-V5-30) — stands above `groundRefCm`,
   `groundRefCm` is raised to its top **keeping `elevationCm`** — `altitudeCm` becomes `elevationCm` − the new
   `groundRefCm` — and only where (4)'s floor then fails is `elevationCm` raised to meet it (a listed fate), so an island
   whose clearance already holds does not climb; SKY-F never writes `shadeBasis`, so the island's strip in the field keeps
   its pass-2 basis until the next epoch or a re-derivation, across saves and loads alike, reported `shade basis behind:
   clearance` (F-SKY-CLEAR, V5 §3.17). **Measurement (P0):** over
   1 000 islands at CITY and METROPOLIS, the share raised here ≤ 1 %. **Pre-decided fallback:** `casterAllowanceM`
   becomes the measured 99.9th percentile of the caster tops found under islands, rounded up to 5 m, and is re-measured
   once. **With item 110** (C5-47): the measurement runs with item 110's terrace, raised-way and deck-plot rows on (their
   defaults), at CITY and METROPOLIS, and the fallback reads the same caster set; the clearance also holds after every
   epoch (V5 §3.15 (7)).

### 3.10 Access — the tops, the feet, the landing claims (SKY)

1. **How many.** A prosperity island: `min(accessCount.max, 1 + ⌊areaHa ÷ accessCount.perHa⌋)` (3; 5 ha), the first
   `main` and the rest `service`; an institution island: its row's `accesses`. **A removed ordinal holds** (C5-51;
   J-V5.62): at every re-siting (a Re-derive from S7b or SKY) the ordinals in `SkyIsland.removedAccesses` are skipped —
   no top, no foot, no claims — and counted toward the number, so no replacement is sited; the lowest surviving
   generated ordinal takes `main` (an institution row's `guarded` role kept by its own ordinal), the rest `service`.
2. **Directions.** `d_1` is the bearing from the island's world centroid to the nearest ground district's centroid; `d_k
   = d_1 + (k − 1) · 360° ÷ n`. Each top is the point where the ray from the centroid at `d_k` last leaves the land face.
3. **The kind at each top**, among the access rows admitted by the recipe's `magic` circumstance (a `guarded` access is a
   `hoist` only): `hoist` or `stair` where the top's world point lies on ground land in an admissible face — a district's
   L1 face that is no reservation, claim or wall strip, or a hinterland L1 face, less every raised-way pier footprint,
   every raised deck's plan dilated by `accessSiting.deckGapM` and every item 110 (d) deck face (V5 §3.7 (2); J-V5.60) —
   and the altitude is within the row's
   limit; `ropeway` or `lightBridge` where an admissible land point lies within the row's horizontal run of the top (the
   point nearest the town's main plaza for a rope line; the highest ground for a light bridge; ties by lattice y, then x).
   One weighted draw among the admitted kinds on `island.place` (index `access:k`). **A slanted access over a raised
   part** (C5-48): a `ropeway` or `lightBridge` whose straight segment from its top to its foot passes over a raised
   part's deck or a raised-way pier keeps `accessSiting.lineClearM` (8 m) above its top (the deck with its parapet or
   channel wall, the pier's head) along the whole crossing; failing that, the candidate foot is refused and F-SKY-ACCESS
   takes its next direction step.
4. **The foot.** A `hoist` or `stair` foot is the top's world point; a `ropeway` or `lightBridge` foot the chosen land
   point. Feet keep `accessSiting.footGapM` (30 m) apart: a later foot inside the gap of an earlier one moves to the
   nearest admissible point outside it (ties by lattice y, then x). A foot and its landing yard stand on part-0 land
   only: never on a deck face, a raised-way pier or inside a raised deck's plan dilated by `deckGapM` — a yard that would
   meet one is slid along the spine to the nearest position clear of it, else the foot moves as a gap violation does.
   **"The nearest way"** here and in V5 §3.12 is a **walkable part-0 way** (C5-48 (4)): a raised part's deck counts only
   at the ground vertex of its ramp or stair foot, an aqueduct never (it carries water, not traffic). **In a district**,
   the foot is moved along the
   perpendicular to the nearest L1 way spine within `wayReachM` — or for a vertical access the landing yard is stretched
   from the foot to that spine — and SKY's ground L1 batch claims the landing yard (`claimSubFace`, `yardWidthM ×
   yardDepthM`, touching the spine) as a ground `Reservation` of kind `landing` (data key `reservations.landing`, V5 §3.1)
   with its attach vertex on the spine. **Where
   no spine lies within `wayReachM`** (at SKY only S3–S7's arterials, boundary ways and gate plazas exist), the yard is
   claimed at the foot itself, its attach vertex on the yard's side facing the nearest way, and the attach is registered
   as a **destination** S8 must reach (BCR-V5-20): S8's first cut in that face runs from the attach to the nearest way by
   §4.6's lane rule, as a gate's attach is reached, and SKY-F checks that a way meets it (V5 §3.12). Either way SKY
   writes, under its data key `allocations.landing` (V5 §3.1), the positioned row `{ cls: 'sky_landing', band: 'modest',
   count: 1, claim, at: foot, access }` for that district — a row of its own beside the district's `Allocation`, never a
   rewrite of a row S7b wrote; its two staff households are the row's, and S10a takes them from the district's own
   `modest` residential demand when it reads `allocations` and `allocations.landing` together (BCR-V5-6). **In the
   hinterland**, the landing is an outside site: the same row under `allocations.landing` for the hinterland's
   `Allocation`, sited by S12a at the foot and given its trail to the nearest way
   by the hinterland unit, as a decoration's trail is (§4.9). A `secret` access's ground landing is fronted (V5 §2.2).
5. **The top.** One `splitThrough` at L0 on the rim places the access's `('sky_access', id)` vertex, pinned; SKY's
   island L1 batch then lays the **rim strip** — a closed L1 line `rimStripM` inside the rim carrying the `setback` role on
   the island, its strip face typed as a block interior `rim_strip` (BCR-V5-6) — and claims each top's **landing yard**
   (`yardWidthM × yardDepthM`, from the rim inward across the strip) as an island `Reservation` of kind `landing` with its
   attach vertex on the yard's inner side, and, for an institution island, the **institution claim**: one `claimSubFace`
   of the row's `areaHa` (§4.5 S7b (3)'s compact claim shape) on the land face less the rim strip and the landing yards,
   searched over the sites of a 10 m lattice (the claim's centre; `institutionFit.siteLatticeM`, own) whose claim fits
   there, by a named score: a **palace** the greatest mean terrain height under the claim among the sites on the half of
   the land facing `d_1` (the site's projection on `d_1` from the centroid ≥ 0; the whole land if none fits there); a
   **cathedral** and a **tower** the least distance from the site to the land face's centroid; a **prison** the least
   distance to the centroid among the sites whose claim dilated by `institutionFit.prisonMarginM` (20 m) still fits. Ties
   break by lattice y, then x (J-V5.12's rule for every search here).
   **The crypt test** (item 109 (k) (2) as revised, J111; J-V5.43). The crypt lies **under the building's lowest massing
   tier, inside underside tier 0 (the rim slab)** (J-V5.66): a stepped cathedral or great temple of volume 2's `stepped`
   rows keeps its crypt beneath massing tier 0. For an instance whose class carries a crypt `always`
   (volume 11's crypt column: the cathedral and the great temple), a site passes only if, at every point of the claim, the
   island's terrain height less the full basement depth (220 cm, volume 2's basement form) lies at least `cryptFloorM`
   (1 m) above the rim slab's base, `elevationCm − rimThicknessCm` — so the crypt, the settlement's largest, is a vault cut
   into underside tier 0, the rim slab, which exists for every underside kind, `flat` included. With the default rim of 10 m this
   holds wherever the terrain lies above −6.8 m, so it excludes only an `own` relief's deep basin. If no site passes, the
   best site by score is taken and the crypt takes the half-sunk form (volume 2's basement ladder, full → half → raised),
   listed as a fate ("the rock is too thin for a full crypt here") and reported by F-SKY-CRYPT (V5 §3.17). The crypt is
   part of the cathedral's building — its basement record, whose rooms volume 3 plans — never an `UndergroundSystem`
   part, never an item 109 (j) (3b) link and never a catacomb source (V5 §3.5; item 2). Every later re-claim (a resize, a
   rim reshape, New random, a terrain edit on the island) re-runs the test, a change of form listed as a fate. **After
   levelling** (C5-50 (4)): the claim is searched at SKY on the terrain; SKY-F re-runs the test on the cathedral's plot at
   its levelled platform datum (`levelledGroundCm`, BCR-V5-30) where the unit run's S10 or S11 levelled it (item 110 (a)), since a platform cut into a
   slope lowers the floor — a form change listed as a fate, F-SKY-CRYPT's ladder as before.
6. **The ground's field** gains, at field pass 2 (S10a), a positive kernel at each ground landing (`landingKernel`, weight
   0.05 within 150 m; BCR-V5-5): the land by a landing trades with the island above.
7. **F-SKY-ACCESS** (V5 §3.17) where a top has no admitted kind.

### 3.11 The island's field and its context vector

**An institution island** is uniform: its prosperity is `v(requirementBand)` of its row (one building and its staff).
**A prosperity island** carries a **gradient** that gives each carried band a share of the island's land equal to its
share of the carried plot land, the richest on the best ground (J-V5.18; the owner's "prosperity is a gradient and a
band"). On the island's 32 m lattice (the cells whose centres lie in the land face less the rim strip), SKY computes

`P_I(x) = smooth(Q(r(x)) + ε(x)) − w_sun · shadeSky(x) + brush(x)`, clamped once to [0, 1] and banded by the town's
`FieldBands` cuts (the island belongs to the town's band set):

1. **The site rank** `r(x)` ∈ [0, 1]. Each cell's elevation rank `e` (the percentile of its terrain height among the
   cells) and view rank `v` (the percentile of `view(x) = (1 − d_rim(x) ÷ R) · (1 + cos(θ(x) − θ_town)) ÷ 2`, `d_rim` the
   distance to the rim, `R` the equivalent radius, `θ(x)` the bearing from the land centroid to the cell and `θ_town` the
   bearing from the land centroid's world point to the town's main plaza) are combined as `field.rank.elevation · e +
   field.rank.view · v` (0.6, 0.4) and re-ranked to `r`, ties by lattice y, then x: the high ground and the rim that
   looks over the city rank first. On a `none` terrain every `e` ties and the view decides.
2. **`Q`** maps rank to value by the carried bands' shares. With the carried bands `b_1` (richest) … `b_m` and their shares
   `s_j` of the carried plot land (Σ `plotArea(c, b_j)` × count over each band's rows, V5 §3.5 (2)), the ranks from
   `1 − Σ_{i ≤ j} s_i` to `1 − Σ_{i < j} s_i` map linearly onto band `b_j`'s inner range `[lo_j + ι, hi_j − ι]`, `lo_j` and
   `hi_j` its two cuts on the absolute value (the lowest band's lower cut 0, the top band's upper cut 1) and `ι` =
   `field.bandInset` (0.1) × `(hi_j − lo_j)`, so ε and the smoothing move a cell within its band far more often than
   across a cut.
3. **ε** — the base's low-frequency fBm (§4.5) on `field.chance` keyed by the island, wavelength
   `field.epsilonWavelengthM` (120 m), share `epsilonShare` (0.05); **smooth** — the ground field's Gaussian of one block
   width (§4.5's O(N) three-box blur) over the lattice.
4. **`shadeSky`(x)** — the share of the nine model sun samples in which a higher island's solid blocks the sun at x (the
   OR, sample by sample, of the strips onto this island, V5 §3.19), and, after an epoch, the island's own buildings (volume
   6's building shade mask run on the island's lattice, V5 §3.19 (7)); the island's gentle relief casts nothing on itself
   (J-V5.33).
5. **`brush`(x)** — the island's prosperity brush strokes (`setField` with `key`, V5 §4.2) as §7.2's stroke overrides; a
   declared target mean (`setAttr(field.prosperity)`, `declared.field`) adds one uniform shift so the lattice mean of
   `smooth(Q + ε)` equals it.

With ε, the shade and the brush at 0, each carried band holds exactly its carried share of the lattice cells (within the
smoothing's boundary cells), so §4.7 S10a's band capacity on the island houses every carried band on its own ground and
its band-range step re-homes none of them (T-V5-9). `SkyIsland.field` records `prosperity` = the lattice mean of
`P_I` (for the reader and the report), `density` = the mean of the ground's density field over the cells whose
prosperity band is one of the carried bands, and `greenery` = the same mean of the greenery field plus `greeneryBonus`;
`SkyHandover.field` carries the raster before the brush (the unit run applies the strokes as the ground's field step
does). The raster is never stored: it is rebuilt on load from the island's terrain, rim and allocation, the cuts and the
stroke list, as §2.9 rebuilds the ground's fields.

**The context vector** on the sky arena (BCR-V5-6) reads: `prosperity` = `P_I` at x (bilinear on the lattice); `density`
and `greenery` as `field` gives them; `dist.centre` to the land's centroid; `dist.plaza` and `dist.market` to the
institution claim on an institution island, else the route distance (V5 §3.20) to the ground's plaza and to its nearest
market; `dist.gate` to the nearest landing attach (a landing is the island's gate); `dist.wall` to an author's island wall
(V5 §3.21), else none; `dist.water` to the conjured river or pond; `dist.shore` to the rim; `slope`, `aspect`, `upstream`
and `terrainClass` from the island's terrain (`high`, but `damp` within 10 m of island water); `upwind` from the ground's
wind; `growthStage` 1; `arena: 'sky'`. Volume 1's field step on the island (V01 §3.10.3 (3)) reads these values through
`skyHandover` — they replace a character offset from `h(S_carried)`, since a supply fraction is not a prosperity value
(V5 §3.12).

### 3.12 The hand-over to the unit run, and what it must honour

SKY builds each island's `sky` request (V5 §2.3) and calls the unit runner; the runner reads `skyHandover(doc, island)` —
the claims, the landings, the river, the allocation, the field and the context. **The fabric hint is a prior, never a
strategy** (J-V5.48): on every island district, S7c's template draw multiplies the weight of the hinted template by
`fabricPrior` (3) and chooses as it does anywhere; the hint is a prosperity island's `ring` from `fabricRingHa` (6 ha)
and `bent-cut` below it, and an institution island's row's (`street` for a palace — an axial avenue from the main landing
to the forecourt; `landmark` for a cathedral; `square` for a prison or a tower), always a valid `FabricStrategyId` (V01
§2.1). The unit run (volume 1) must:
write only the island's arena; never cut or plot the rim strip, which it plants as a rim walk once, after its
districts' S12b, by volume 1's island-level `plantRimWalk` (V01 V1-3.10.3 step 4, seam SLR4-03; one `esplanade`
`Greenery` on the strip's face, no way laid on it, and a `street_trees` `Greenery` along the rim strip's inner setback
line, its `along` naming the strip with no way (V01 V1-3.10.3 (4), BCR-10 (c)), spaced by the greenery table's
street-tree row, §4.9; J-V5.26); reach every landing attach with a way (the island's gates); cut the institution claim as a hole and place
its institution there by S10b; use the river's crossing sites as volume 1 qualifies and builds them (V01 V1-3.10.3 (4): a site whose two deck ends
lie on the unit's outline face — both banks border the island's built land — gets its span and a street over it; one
whose far bank no street reaches stays a `site`, reported in `requestedVsBuilt`, and one that does not qualify stays a
`site`, unlaid; seam SLR3-10); split the allocation over its districts (V01 §3.10.3 (4));
read the island's field from the hand-over; measure every pull to a class on another arena by the route distance (V5
§3.20); level island ground by item 110 (a)'s thresholds as the ground's S10 and S11 do, laying each retaining wall it
raises on the island's arena and never on the rim strip or along the rim (V5 §3.22 (4)); leave `SeamReport.portalsTotal`
0; and return its district ids, which SKY-F writes to `SkyIsland.districts`.
**SKY-F checks** that every landing yard holds a `sky_landing_top` plot, that a way meets every island attach, and that a
walkable part-0 way meets every ground landing attach after S8 (the destinations of V5 §3.10 (4)); that no island
`RetainingWall` stands on the rim strip or along the rim (V5 §3.22 (4)); and it re-runs the crypt test at the levelled
datum (V5 §3.10 (5)); a missing island way is repaired by
one island L1 batch laying the shortest lane from the attach to the fabric (S8's lane width), a missing ground way by one
ground L1 batch in the landing's district doing the same (the district's own lane rule), and an unreachable landing is
reported by F-SKY-ACCESS's last rung.

**Reconciliation with the landed volume 1** (V01 §3.10.3, read on 2026-09-28). Volume 1 owns the partition, its count,
its cut and the typing machinery (J-V1.17), and this volume dropped its own district count and seeds for them
(J-V5.28). Seven of the unit run's inputs are this volume's and govern where the two volumes' words differ; each names
the V01 line it replaces, and all seven are listed for volume 1's revision (V5 §13); none needs a base change:
1. **The call.** V01 §3.10.3's inputs ("the `SkyIsland` placed by `SkyStrategy` — its outline on its arena, arena key,
   altitude and terrain row") become the `sky` request of V5 §2.3 and `skyHandover(doc, island)`, one call per island
   made by SKY — the handover's one caller is the unit runner.
2. **Terrain.** Step 1 ("S1 on the island's arena (the echo terrain by volume 5's rule, or flat)") becomes: no S1 — SKY
   has committed the island's L0, terrain and river (V5 §3.8); the runner lays no second terrain.
3. **Field.** Step 3 ("`characterOffset` from the island's supply `h(S_carried)` (II.6 (3)) and `ε`") becomes: the field
   step reads `SkyHandover.field`, V5 §3.11's gradient, and applies the island's brush strokes.
4. **Claims, landings and the rim strip.** The unit's outline is the land face less the rim strip, the landing yards and
   the institution claim, all committed before the runner starts; each landing's attach is a gate-ranked destination a
   way must reach; the rim strip replaces step 4's "S10 (0) (the margin band along the `sky` seams)".
5. **District kinds.** Step 2's typing ("`prosperity` — the kind of the town's richest district for the largest face,
   then by the allocation's affinity …; `institution` — the institution's kind (`temple`, `castle` …)") becomes
   `context.districtKind`: `sky-island` on every face of a prosperity island; on an institution island the row's
   `sky-*` kind on the face that receives the claim and `sky-island` on any other (V5 §2.4).
6. **The fabric prior.** S7c on each island district reads `fabricHint` × `fabricPrior` as above; the request carries no
   strategy.
7. **The district count.** Step 2's count is volume 1's `skyDistrictCount(plotLandM2, districtHa)` (V01 V1-3.16), its
   share `hood.constants.sky.plotShare` (V01 V1-3.14), read with `context.districtHa` in place of the town's mean
   district area (J-V5.45), so a full CITY island is two or three districts and a full METROPOLIS island three.

### 3.13 Lights (SKY-F; the sky rows of §4.7's light table, BCR-V5-8)

| host | what | defaults (own, `extension`) |
|---|---|---|
| `rim` | magical orbs along the rim strip's outer edge | every 40 m, 2.5 m high, 60 cd × `h_carried`, radius 18 m, orb 30 cm, cool, steady |
| `keel` | one downward magical source at the root's apex (a `flat` island's: the rim slab's base under the land centroid): the glow beneath the island | 4 000 cd × `h_carried`, radius the apex's clearance + the row's `radiusMarginM` (30 m), size 3 m, cool, steady |
| `skyAccess` | a lantern at each top | 25 cd, 3 m, radius 12 m, fire, flicker |

The island's ordinary fabric — its ways, doors, squares — takes the ground rows (arena `ground`) as any district does;
each ground landing's lantern is its `sky_landing` class's `door` row. The `magic` circumstance gates no sky row: the
island is the magic that holds it up (J-V5.9). A waning island's magical lights scale with its `h_carried` at each epoch;
a settled island's are 0.

### 3.14 Names

S13a draws each island's name on its `naming` stream (§6.3's cases), reading the features: the reason and the
institution's kind; the echoed river's name; the name of the ground district nearest below (ties by district address);
the altitude class (low below `naming.lowBelowM`, 90 m; high from `naming.highFromM`, 150 m); the town's culture row
(§10.4). The grammar rows are volume 11's (the slice
`naming.island`). Each island is the root of its own `QuarterNode` (members its districts, `cityCut` true), named with
the island's name, so its `quarter` label draws at the city band; an institution's own name is its `landmark` label; a
landfall's `place` label takes the grammar's fallen form of the island's name (V5 §3.16).

### 3.15 Over time — the island laws an epoch applies (`IslandEpochStep`, BCR-V5-7)

`IslandEpochStep.apply(doc, epoch) → ConversionOp[]` (`@plat/sky`) is called by the evolution engine (volume 6) at each
epoch after S6's re-evaluation of the field and before S7b's delta allocation, so the households it releases or takes
enter that allocation. `@plat/sky` registers it in §4.12's `StrategyRegistry` as volume 6's `EpochParticipant` with id
`sky.islands`, step `afterField`, order 0, stage `SKY` (the stage id V5 §3.1 registers; V06 §2.1, §3.2 row 5): its `run(ctx)` calls `apply(ctx.doc, ctx.epoch)` with
`years` = `ctx.years` and `rung` = `ctx.rung` (step 1), draws on `island.place` as below (never on `ctx.stream`, so a history with or without the engine's
other participants draws the same island values), and returns the conversions as `EpochOps.ops` in island slot order.
`@plat/sky` registers a second participant, **`sky.clearance`**, at step `afterGrowth`, order 50 — after volume 6's
`hood.fabric` (order 40), so every raised part, retaining wall, building and massing tier the epoch committed is read —
stage `SKY`, which runs step 7 below (BCR-V5-28, listed for volume 6).
**Households move through volume 6's typed channels** (BCR-V5-23, listed for volume 6): every household the step
releases — a wane's leavers, a settle's remainder, a fall's covered homes when the fall happens in an epoch — enters
volume 6's displaced pool with cause `island` (V06 §3.8.1: placed first at the `siting` step, V06 §3.2 row 13, their
addresses kept, each placement a `relocate`); every household a refloat or a raise takes up from the epoch's delta demand
is reserved by a new `EpochOps` row, `demandTaken: { band: string; count: number }[]`, which `siting` subtracts from the
delta demand before it houses the rest; existing households relocated up are `relocate` ops in `EpochOps.ops`. So ground
plus sky households equal the epoch's target after `siting` (T-V5-21 (g)). `years` is the epoch's span (§4.11 (5)); every
rate below is per year, applied over it. For each island that is not fallen:

1. **Evaluate.** The rung row of the epoch's rung — the fold's (`ctx.rung`, V6 §3.1 (3); §4.11 *The rung at an epoch*
   as file f item 322 amends it), which inside the hand-off band is the previous product's own rung, not the target's
   (seam TR-22): `none` makes the target
   area 0. Otherwise `S_town` from the re-evaluated field's island-free value (item 102 (c): the supply law never reads
   the islands' own shade; BCR-V5-15), the node term from the deposits as they stand at the epoch (V5 §3.3),
   `S_carried` from the island's households' bands under the new
   cuts (an institution island's requirement band), and the targets `A_t` and `E_t` by V5 §3.3. `supply` is rewritten.
   1b. **The institution has left** (J-V5.53; item 20 (h): a dossier removal is truth). If the island's reason is
   `institution` and its institution is gone — removed by a dossier event at an absorb (the institution leaves at once:
   its building vacated, its uses closed, §7.7), its custom kind deactivated (item 104 (e)), or closed with no successor
   for a whole epoch — the island re-reasons now, in order: (i) the next eligible instance of one of the row's `tags` or
   its archetype (V5 §3.4 (2)) relocates up into the vacant claim (a `relocate`; its ground site handed over by V5 §3.5's
   rule); else (ii) the island becomes a prosperity island where `h_carried(v(rich))` > 0 and the rich band's demand
   admits it — the claim's building re-let as a mansion (a `relet` to the `rich` band's residential class), rich households
   taken up by the delta (`demandTaken`) and by relocation within the churn cap as a refloat takes them, the claim's face
   keeping its `sky-*` kind until a re-derivation re-types it `sky-island`; else (iii) `A_t` = 0 and the island wanes by
   step 2. `reason` and `institution` are rewritten by the conversion; the report and the clerk name the cause.
2. **Floating.** If `A_t = 0`: `waneIsland` (floating → waning), `dwellUntilWeek` = the week + a draw in
   `dwellYears.waning` × 52 on `island.place` (the island's lineage and the epoch component, index `dwell`). Otherwise, if
   |`A_t` − `areaHa`| > `hysteresis` × `areaHa`: `resizeIsland` toward `A_t` by at most `growthPerYear · areaHa · years`
   either way (magic accretes and erodes slowly), and its altitude toward `E_t` by at most `altitudeRateMPerYear · years`
   metres, never below V5 §3.9's floor.
3. **Waning.** Each epoch the altitude falls linearly from its value at the wane's start to V5 §3.9's floor (with `E_min`)
   by the dwell's end, and the area toward half its value at the start, both by `resizeIsland`; the households leave in
   reverse ordinal order (the suffix, as §4.11's step (c) empties buildings), ⌈H · years ÷ dwell⌉ each epoch, each a
   `relet` down or a `vacate` on the island and the household entering the displaced pool with cause `island`, where the
   regrowth-first siting houses it on the ground; the island's vacant buildings then step down the base's building
   ladder. If `A_t > 0` again: `refloatIsland` (waning → floating), the dwell cleared. When the dwell ends:
   `settleIsland` — the altitude at the floor, every remaining household into the displaced pool, the magical lights at 0,
   `dwellUntilWeek` = the week + a draw in `dwellYears.settled`.
4. **Settled.** If `A_t > 0` (and the rung admits islands): `refloatIsland` (settled → floating) — regrowth-first: its
   vacant stock is reoccupied before any ground plot, by the rich bands' delta demand first (reserved by `demandTaken`)
   and then by relocating existing rich households up, within the epoch's churn cap (§4.11) — its altitude climbing at the
   rate. When the dwell
   ends: `fallIsland` (V5 §3.16).
5. **Empty slots.** A slot holding a live, unfallen island is never redrawn — while it is supplied it stays. An empty
   slot re-opens with probability `(1 − (1 − redrawPerYear)^years) · chance[k] · h_town` (II.6 (4), J-A67.40), drawn on
   `island.place` with the epoch component, only if every lower slot is filled. **A slot a `removed` record holds is not
   empty** (V5 §3.2 (6); C5-51): it is never re-opened by an epoch, at any epoch, draws nothing and counts as filled for
   the slots above it; only the removal's undo or a T5 `sky` declaration re-filling it when no slot is free releases it —
   no count, at an epoch or by an adjust, re-opens it (V5 §3.2 (6); seam ST-04). A slot that opens refloats a settled
   island first (regrowth-first; the settled island with the highest `h_carried` for its households, ties by slot, then
   address) and otherwise `raiseIsland`: S7b's delta fill for the sky (V5 §3.5, taking the rich bands' delta demand first,
   reserved by `demandTaken`, and then relocating existing rich households up within the churn cap), then V5 §3.6–§3.14 on
   the new island, its districts laid by the unit run at the epoch; it has no `shadeBasis` until the next epoch's S6
   (below; V5 §2.1).
6. **A rung crossing downward** makes every island's target 0: they wane, settle and fall over their dwells, never in one
   epoch (T8-6).
7. **Clearance after growth** (`sky.clearance`, at `afterGrowth`, order 50; C5-47; J-V5.68). After the epoch's growth,
   every live island (not fallen, not removed) is re-checked by SKY-F's clearance rule (V5 §3.9 (5)) against the casters
   the epoch committed under its projected solid: the raised parts of volume 6's raised-way pass and of a new stage's S4
   (their deck tops with parapet or channel wall, their raised-way piers), the retaining walls' high-side tops and the
   levelled platforms, and the buildings — a stepped one at its stack envelope's top, and a building whose Works starts
   later in the epoch's weeks at its planned finished height, since it is committed now (V06 §3.2 step 18). It reads
   volume 6's `EpochScope.built`, `.raised` and `.levelled` where the scope carries them, else every caster under the
   solid. Where one stands above `groundRefCm`, the participant returns one op `{ op: 'reclearIsland'; island;
   groundRefCm; altitudeCm; elevationRaisedCm }` (V5 §4.2) that raises `groundRefCm` to it **keeping `elevationCm`** and,
   only where V5 §3.9 (4)'s floor then fails, raises `elevationCm` to the floor (`elevationRaisedCm` > 0, a listed fate:
   "raised clear of the aqueduct" naming the caster). It **never writes `shadeBasis`**: the island's strip keeps the basis
   the epoch's S6 wrote at its start, and the next epoch reads the island as it then stands (item 102 (e)'s lag, J-V5.27).
   A locked island, or a lock on its `altitudeCm` path, holds its `elevationCm`: `groundRefCm` and `altitudeCm` are still
   rewritten, and where the floor then fails the island stays where it hangs, the conflict listed (`clearance held by your
   lock`) and the island exempt from the clearance invariant as a held island is from the supply invariant (BCR-V5-11).
   The step draws nothing, so the same history clears the same islands (T-V5-31 (b)).

A locked island, or a locked `state`, `areaHa` or `altitudeCm` path, is held by these steps (§7.2) — the report lists it
as `held against its supply` when its supply is 0 (J-V5.10).

**The shade over time** (item 102 (e)). Each epoch's S6 re-evaluation first writes every live island's `shadeBasis` from
the island as it stands when the epoch begins — before this step changes it — and then re-reads every strip (V5 §3.19)
from those bases, so a resize, a sinking, a raise, a fall or an author's edit since the last evaluation moves the field
one epoch later, and the uses beneath follow by the engine's normal lag (volume 6 schedules the drift; §4.11's ladder
moves the survivors). The basis is persisted, so a save and a load between two epochs change nothing (C5-01; T-V5-21
(h)). A fallen island casts nothing from the epoch after its fall; a settled island casts from its floor altitude, so its
strip draws in toward its footprint. An island that step 5 raises (`raiseIsland`, after this epoch's S6) has no
`shadeBasis` until the next epoch's S6 writes one: it casts and receives no strip meanwhile, and a save and a load in
between compute none for it (V5 §2.1, §2.6; seam ST-49; J-V5.72); volume 6's building mask on its lattice likewise
starts at the next field phase (V5 §13).

### 3.16 The fall and the landfall (`fallIsland`)

One `convert` event, as a declared sequence of batches (§4.11), whatever its author (the engine or a hand):

1. **Footprint.** The island's projected land face in world coordinates (`anchor` + the local ring).
2. **Covered set** (J-V5.11). Every ground entity of which at least `landfall.coverShare` of its face or band lies inside
   the footprint: every L3 plot and every hinterland `LandUse` face; every reservation (plaza, market, precinct, park,
   castle bailey); every way (its corridor band); every wall stretch (its band) and gate (a `Gate` of any kind, by its footprint; seam TV-04); every tower; every bridge
   or pier deck; and, with item 110 (C5-53; J-V5.64), every raised part's span (its deck band's plan projection, in a
   ground part ≥ 1) and raised-way pier (its footprint), every `RetainingWall` stretch (its band), generated or drawn,
   and every deck plot (its face on a bridge, pier, mole or quay deck) — less every locked or pinned entity and the plots
   that hold one (kept content, as §3.3's fixed obstacles; the ruin laps around them).
3. **Relocation first.** Every use in a covered building or reservation is relocated by §4.11's rule for a step that
   empties a building (a dossier-backed use by the solver's `dossier` request; *Dossier content across epochs*), every
   household by §4.7's overflow pass inside the event — in an epoch, into volume 6's displaced pool with cause `island`
   (V5 §3.15) — the households of the deck plots that (4) brings down included, before their deck falls.
4. **The ground.** Every covered building is demolished (cause `convert:fallIsland`); every covered plot's use becomes
   vacant with the `ruin` treatment (a deck plot's excepted: it falls with its deck, below); every covered reservation is
   left vacant under the rubble with the same treatment;
   every covered `LandUse` takes kind `quarry` with owner `commons` and `source` the landfall decoration (BCR-V5-26) — the
   fallen rock is quarried as a surface rubble working, which sources no underground quarry system, no mine–cavern
   breach and no dig-down draw (item 2; volume 4's quarry rules read only a `quarry` without a `source`, V5 §13). Every
   covered wall stretch and gate steps down §4.11's wall decline ladder to `breached` over its covered length: the
   landfall writes `breached` over that length into the enceinte's `condition` (file f item 575: knots at the covered
   length's ends; a run already `dismantled` kept, the ladder only stepping down; the record's `lifecycle` `decayed` while
   any run is not `standing`), repaired by volume 6 (V6 §3.7.5) — a state, no edge removed (seam TT-09). The `breached` length on a stretch is
   its covered length extended to take in the chord along the trace of every covered tower's and gate's footprint (a
   `Gate` of any kind — `main`, `postern`, `water`, `gatehouse` or `castle`, §2.7; seam TV-04), so every covered tower's
   vertex and every covered gate's junction lies inside a `breached` run, and a tower or gate covered while its stretch
   is not has `breached` written over its footprint's chord alone: a `Tower` or a `Gate` carries no state of its own,
   draws by its run's `condition` (file f item 575) and stands again with it (V6 §3.7.5) (seams TU-03, TV-04; J-V5.79);
   a bridge, pier, mole or
   quay-platform deck that is
   covered becomes `ruined` (the deck falls; under a bridge the river stays one L0 face and the way's crossing is closed);
   every covered way takes surface `rubble` and its routing class drops to `track`, the class it had written to
   `Way.formerClass` (BCR-V6-5) in the `fallIsland` batch — a way that already carries a `formerClass` (a lane volume 6
   downgraded) keeps it, so the clearance gives back the class the way had before its decline — until the first epoch
   whose clearance (§4.11's salvage demand; volume 6's landfall candidate, seam ST-13) reaches it and restores the class
   from it (V6 §3.5.2, which clears it), or a hand `setAttr` of `class` does (which clears it too, V6 §2.8) (seam
   TR-04; J-V5.73). **Item 110's parts** (C5-53): every covered raised span and raised-way pier
   becomes `ruined`, and a span whose pier is ruined becomes `ruined` with it (arches fall with their piers, whatever
   their own cover); a raised way with a ruined span has its crossing closed — it has no junctions with the ways beneath,
   so the ways' `track` fallback does not apply to it, and the ways beneath it are touched only where the footprint
   covers them; an aqueduct ruined this way loses its terminal's supply, listed as a fate ("the fountain in <square>
   runs dry") and read by volume 6's raised-way pass at its first `raisedWays` step after the fall — the same epoch for
   an epoch's fall (V06 §3.19.2 (4)), the next epoch for a hand `convert` (seam ST-48); the vaults beneath a span
   follow its state by volume 4's rule (this volume writes nothing underground, item 2). Every covered retaining wall,
   generated or drawn, steps to `decayed` over its covered length — item 245's state, the `breach` op's result (file f
   item 245; V06 §3.19.4 (3)); a state, no edge removed — keyed by the wall's lineage address, so a later re-derivation of
   a generated wall keeps it `decayed` until an epoch's restoration re-derives it (V06 §3.19.4 (6), seam ST-10; a drawn
   wall is restored by hand), never "re-derived intact under the rubble" (seam ST-12). Every deck plot on a covered
   bridge, pier, mole or quay deck falls with its deck by item 110 (d)'s least disruption — its households relocated
   first ((3)), its building demolished (cause `convert:fallIsland`) and the plot **tombstoned with the deck**, as
   volume 6 does for a struck deck (V06 §3.19.5 (3)); a repaired deck re-offers its faces and the buildings raised on
   them are new lineages (V06 §3.19.5 (1), (4); V02 §3.16 (7)) — never a vacant plot left on a ruined deck (seam
   ST-14). Each change is a listed fate. No edge of the ground's streets and plots is added or removed — the tombstoned
   deck plots' lines excepted, which go with them — so the plan survives under the rubble, ready for regrowth.
5. **The landfall record.** One ground `Decoration` of kind `fallen_island` whose `members` (`DecorationMember[]`,
   BCR-V5-9; seam TT-03; J-V5.76) are the covered plots, land uses, reservations, ways and retaining walls, each by its
   `Id`, and the covered raised spans and raised-way piers, each by its raised way and item 244's support keys (`{ raised,
   span: [a, b] }`, `{ raised, support }`) — never a deck plot, which is tombstoned with its deck and listed as a fate —
   `source` the island's address and `name` the grammar's fallen form of its name (BCR-V5-9). Each member leaves the list
   in the batch of the op that ends its cover (volume 6's member-leaving `setAttr`, V6 §3.5.2; J-V6.108; V5 §2.6's
   `members` row). §8.2's `fallen` row draws its rubble over the members' faces and bands — a raised member's the span's
   deck band in plan or the support's `ring` (BCR-V5-18); the walls with their
   towers and gates by their runs' `condition` (item 575), the bridges, raised parts and retaining walls by their
   own state rows (seam TU-03). Parts of the footprint over water leave
   nothing on the ground and are reported ("sank in <water body>").
6. **The salvage ledger** is credited with `stone` = the covered land area × `stoneM3PerM2` m³, `from` the island (§2.7's
   `MaterialLedger`), so later building within the haul radius draws on it and §4.11's salvage demand weighs clearance
   near it.
7. **The sky.** Every entity of the island's arena — its own retaining walls and its bridges' deck plots included — and
   its accesses become tombstones (cause `convert:fallIsland`); each
   ground landing's use closes (`closeUse`), the landing house left vacant to step down the ladder; the island record
   stays live at its address with `state: 'fallen'` and `landfall` set, its slot freed.
8. **Undo** restores all of it from the event's undo record (§7.4's convert row) — each covered way's `class`, surface
   and prior `formerClass` among it (absent again where the fall wrote the first; seam TR-04), and each covered
   enceinte's `condition` profile and `lifecycle` as they stood before the fall (absent again where the fall wrote the
   first; seam TT-09).

### 3.17 Failure ladders (the F-SKY rows of §5.2, BCR-V5-11) — never a whole-map retry

| class | where | detection | ladder (in order) | test |
|---|---|---|---|---|
| F-SKY-FILL | S7b (5) | the fill cannot reach `minAreaHa`; an institution's row does not fit | take the next eligible band → try the next reason candidate (V5 §3.4) → close the slot, rows returned to the demand, reported | T-V5-4 |
| F-OUTLINE (base) | S7b (5) | the island's outline is not simple | §5.2's rungs | §13.2's outline property test |
| F-SKY-PLACE | S7b (5) | no candidate passes V5 §3.7 (2) (inside the frame, clear of the other islands, reachable) | halve `gapM` → admit `core` at weight 0.3 → shrink `A` by 20 % and redraw the outline, at most twice → close the slot, rows returned, reported (the reachability test is never relaxed: an island placed by rule always has an admissible access site) | T-V5-5 |
| F-SKY-TERRAIN | SKY | the river's descent stalls or cannot reach the rim | double the tilt → carve a straight bed along the axis to the rim → no river, reported | T-V5-7 |
| F-SKY-ACCESS | SKY, SKY-F | no admitted kind at a top; no land foot (a foot or yard meeting a deck face, a raised-way pier or a raised deck's plan within `deckGapM` counts as none); a slanted access under `lineClearM` over a raised deck or raised-way pier; a landing attach unreached by a walkable part-0 way (on the island, or on the ground after S8) | the next direction step of `accessSiting.turnStepCdeg` (30°) either way, up to ± `turnMaxCdeg` (90°) → the other kinds of the row set → a foot at the nearest admissible land point within twice the row's run → the attach repair lane on its arena (V5 §3.12) → the access dropped, reported (an island keeps at least one where any rung passes; one with none is reported `unreachable` — never an island placed by rule, V5 §3.7 (2)) | T-V5-8 |
| F-SKY-UNIT | the unit run | households the unit run cannot house | volume 1's F-UNIT ladder first; the rest re-placed on the ground by §4.7's overflow pass as a relocation, reported | T-V5-9 |
| F-SKY-CLEAR | SKY-F; each epoch's `sky.clearance` (V5 §3.15 (7)); a ground edit beneath (V5 §4.3) | a caster placed after SKY (a ridge, a tower, a crown; a raised part's deck, parapet, channel wall or raised-way pier; a retaining wall's high-side top; a levelled platform; a stepped building's highest massing tier) stands above `groundRefCm` under the solid | raise `groundRefCm` to it keeping `elevationCm`, and raise `elevationCm` only where V5 §3.9 (4)'s floor then fails (a listed fate); `shadeBasis` untouched, so the strip keeps its pass-2 basis to the next evaluation, across saves and loads, reported `shade basis behind: clearance` → at P0, V5 §3.9 (5)'s allowance fallback | T-V5-10, T-V5-21 (h) |
| F-SKY-CRYPT | SKY (the institution claim), every re-claim, SKY-F's re-test at the levelled datum | no claim site of an `always`-crypt instance passes the crypt test (V5 §3.10 (5)) | the best site by score with the half-sunk crypt (volume 2's basement ladder: full → half → raised), a listed fate → never a missing crypt | T-V5-26 |
| F-SKY-SHADE | field pass 2, an epoch, SKY's last step | a strip's window passes the receiver raster's frame and margin; a sample's shadow is capped (V5 §3.19 (2)) | clip the window to the raster (beyond it there is no field to shade), reported as the clipped share → nothing further: a strip never fails and never stalls the field | T-V5-19 |
| F-SKY-LANDFALL | `fallIsland` | covered content is locked or pinned; a covered use has no alternative site | kept as content the ruin laps around; the use stays in its building, which then stands in the rubble, reported | T-V5-14 |
| F-SKY-HANDOVER | S7b (5) | an institution going up holds an S3 reservation and no hand-over tag is demanded on the ground | the row's `else` (`park`, re-typed with owner `commons`) → never an ownerless reservation | T-V5-4 |

### 3.18 Determinism — every draw on an existing concern (no new concern; J-V5.12)

| concern | key | creation index | what it draws |
|---|---|---|---|
| `island.place` | the town's lineage | `slot:k`, `reason:k` | the slot openings; the reason |
| `island.place` | the island's lineage (with the epoch component at an epoch) | `template`, `bearing`, `outline`, `place`, `relief`, `river`, `underside.kind`, `underside.depth`, `underside.apex`, `access:k`, `dwell` | the shape, its bearing, its displacement, the placement draw, the own relief class, the river draw, the underside, the access kinds, the dwell spans |
| `terrain.noise` | the island's `Terrain` | per §6.1 | its fBm |
| `water.river` | the island's `Terrain` | per §6.1 | the river's meander knots |
| `field.chance` | the island | per §6.1 | its ε |
| `naming` | the island; the landfall decoration | per §6.3 | names |

**A removed slot draws nothing** (V5 §3.2 (6)): its `slot:k` and `reason:k` indices are skipped, and every other slot's
creation indices are unchanged, so removing an island never moves another island's draws. `sky.clearance`,
`skyAccessObstacles` and the removed-ordinal skip at re-siting draw nothing either.
The strips (V5 §3.19) and the route distance (V5 §3.20) draw nothing: they are pure functions of committed state (the
strips of the persisted `shadeBasis`, never the live island), the model sun samples and `dmath` (§6.5), the strips
reading the tiers without their roughness. The island's prosperity gradient (V5 §3.11) draws only its ε on `field.chance`.
**Every choice by score or order breaks its ties the same way** (J-V5.12): among islands by slot, then address; among
sites and lattice cells by lattice y, then x; among districts by address. The tiers' roughness uses `dmath` noise keyed by the island's render key — view data outside every digest (§6.2) and
the same on every engine (§6.5). The part number is minted once and recorded in the address (V5 §2.1); `raiseIsland` keys
the island by the town's lineage, the slot and the epoch (J-A8.61), so the same history raises the same island. §6.1's
distinctness test already runs a sky-island fixture; §13.3's goldens gain the two sky fixtures of T-V5-15.

### 3.19 The island's shade strip (the owner's item 102 on the island's side; J98's underside)

`islandShadeStrip(doc, island, samples, onto) → IslandShadeStrip` (`@plat/sky`, V5 §2.3a) — a pure function, no draw:

1. **The samples.** The base sampler of item 102 (a): its sun positions — `{ azimuthCdeg, altitudeCdeg }`, nine by
   default, at the site latitude on the equinox — and its sample points per 32 m field cell, one (the cell's centre) by
   default; the set and the layout are stated in BCR-V5-15 where item 102's application leaves them open, and the strip
   reads whatever the sampler holds. Each sun gives the horizontal unit vector ŝ toward the sun in the model frame (x
   east, y north) and the shadow reach `c = min(cot altitude, 8)`, §8.4's cap of a shadow at eight times its caster's
   height near sunrise and sunset — the sampler's rule for **every** model-side source, pass 1's terrain and walls and
   volume 6's building mask as much as the strips, so the one OR-ed mask follows one reach law (BCR-V5-15 (i); J-V5.44).
   Below, "sample `s`" is one sun and "the cell's point" one of the sampler's points; with
   the defaults each cell has one point and nine bits (J-V5.42). Wherever a reader counts "the samples a cell is blocked
   for" (the clerk, the shade map's three areas, the CSV, T-V5-19), it takes the mean over the cell's points of the suns
   blocked at each — with one point, the count itself.
2. **The solid — from the caster's `shadeBasis`, never the live island** (J-V5.47). The tiers without roughness —
   `undersideTiers(basis, { rough: false })`, the view's own function (V5 §3.9 (2)) evaluated on the basis's rim polygon,
   underside, anchor and elevation with the roughness term at 0, so the model never reads view data (J-V5.30); an island
   without a basis (V5 §2.1) has no solid here and casts nothing: tier 0 the
   rim from the basis's `surfaceTopCm` (V5 §3.9 (4)'s last sentence: the terrain's surface at generation and at a
   re-derivation, the full surface top at an epoch) down to `elevation − rim`, tiers 1 … n down to the apex (none for
   `flat`). Each tier's ring is rasterised once into a bit mask of
   `shade.ringMaskM` (4 m) cells in the island's local frame (scanline fill; a cell is in when its centre is), with the
   tier's span [`b_i`, `t_i`] in centimetres above the ground datum.
3. **The receivers.** Onto the ground: the field raster's 32 m cells (§4.5), each at each of the sampler's points `x`
   in it (by default its centre) and the ground terrain's height `g(x)` there (bilinear on the committed terrain raster
   **as the field reads it — S1's heights with the T2 terrain strokes, unlevelled**; item 110 (a)'s levelling of plots and
   blocks is a platform datum, never a receiver height, so a strip computed at S10a, before S10 and S11 level anything,
   equals the one a load rebuilds after them; BCR-V5-30; C5-54; J-V5.65). Onto an island: the receiving island's 32 m lattice
   over its land face at the receiver's own `shadeBasis` (its anchor and elevation), each at the island's terrain height
   there plus that datum — a receiver without a basis receives no strip; only an island whose apex lies above the
   receiver's surface top casts onto it — an island never shades upward.
4. **The test.** Point `x` is blocked at sample `s` when the ray from (`x`, `g`) toward the sun meets a tier. For each tier
   with `t_i` > `g` (one wholly below the receiver blocks nothing), in order from tier 0 down: the ray's horizontal track
   across the tier's span runs from `x + (max(b_i, g) − g) · c · ŝ` to `x + (t_i − g) · c · ŝ`; it is walked in steps
   of at most `shade.stepM` (8 m), both ends included, each point moved into the island's frame (less `anchor`) and
   looked up in the tier's mask; the first hit sets bit (point · suns + `s`) and ends that point's test for that sample.
   All arithmetic is integer centimetres and `dmath` (§6.5), in a fixed order: samples 0 → 8, cells row-major, points
   in the sampler's order, tiers 0 → n.
5. **The window.** Only cells that can be blocked are tested, sample by sample. The corridor is the solid's bounding box
   (the union of its tier rings) swept away from the sun by `ŝ · c` × [`b_n` − `g_max`, `t_0` − `g_min`] (`g_min`, `g_max` the terrain's extremes
   over the frame — a safe bound), in receiver cells, clipped to the receiver raster (F-SKY-SHADE). **Each corridor cell
   is first pre-tested in O(1) at its own height** `g(x)`: its ray's track across the solid's full span, from `x + (b_n −
   g) · c · ŝ` to `x + (t_0 − g) · c · ŝ`, must meet the solid's bounding box, else the cell is skipped without a tier
   walk — so in mountainous relief the low cells far from the island cost one segment–box test each, and no blockable
   cell is missed (the pre-test is exact for the box, which contains every tier; J-V5.59). The strip's stored `window` is the
   bounding box of the cells that passed the pre-test, over the nine samples.
6. **When — the shade evaluations.** Each evaluation first writes the `shadeBasis` of every live island from the island
   as it then stands and then computes every strip from the bases: SKY's last step at generation and at any
   re-derivation that runs SKY (the bases and the strips onto the islands; the strips onto the ground follow at S10a from
   the same bases); **S10a's start** at a re-derivation starting after SKY and at or before S10a — before step (i) and
   every hook, the bases of every live island, then the strips onto the islands (never by pass 2, so no hook of S10a
   reads a strip built from the old bases; seam SL-02); each epoch's S6 re-evaluation, for every island not fallen, from
   the island as it stands when the epoch begins (V5 §3.15). **The strips onto the ground are computed once per shade
   evaluation, at their first read** — volume 1's S9b at S10a's `afterDrivers` hook, between step (i) and field pass 2,
   where it is registered (its manor sun factor, V01 §3.5.5), else field pass 2 — by the one pure call, and **held** for
   pass 2's fold and every later reader of the same evaluation (the close-up hood pins' shade gate and
   `DistrictContext.shade.islandShare`, V01 §3.8.2, §2.3): S9b's strips and pass 2's are the same held strips, bit for bit
   (T-V5-21 (h); J-V5.71). An island without a `shadeBasis` — raised or declared since the last evaluation (V5 §2.1) —
   casts and receives no strip until the next evaluation writes one (J-V5.72). The strips are computed whatever `w_sun` is (0 included) — the
   fold multiplies by the weight — so the shade view always reads held strips (V5 §5.1). Never by an edit, a scoped
   regeneration of an island or SKY-F: an island edit leaves every basis and every strip where they were until one of
   these moments (J-V5.27), and on load or replay the strips are rebuilt from the persisted bases (BCR-V5-21). **A ground
   terrain edit** (T2 on the ground key, a terrain conversion of §4.11) moves the receiver, not the caster: over its
   effective scope it re-reads every strip's bits there from the unchanged bases, with the field it recomputes, so the
   session's strips always equal a load's rebuild (T-V5-21 (h)); item 110 (a)'s levelling moves no receiver at all.
7. **The fold into the field.** For each ground cell, each bit of the daylight term's mask — pass 1's terrain and wall
   shade (item 102 (b), (c)) and, after an epoch, volume 6's building shade mask on the same layout (V06 §3.4 (6)) — is
   OR-ed with the same bit of every strip covering the cell, so a point shaded by a hill, a house and an island at the
   same sample counts once (J-V5.38); the term's shade share is the mask's popcount ÷ `bits` (BCR-V5-15). The
   **island-free value** — the same composition with the strips left out — is what the supply law reads at an epoch
   (V5 §3.15 (1)); at generation S7b (5) reads pass 1, which has no island bits by construction (item 102 (c)). **On an
   island** the same fold makes `shadeSky`: the strips onto it OR-ed, sample by sample, with — after an epoch — volume 6's
   building shade mask run on the island's 32 m lattice, the island's own buildings casting onto its cells by the same
   law and cap (item 102 (b); listed for volume 6, V5 §13; J-V5.33 as narrowed).
8. **The basis.** Each strip records the §6.2 hash of the bases it read (V5 §2.3a). The shade map view (volume 9) and the
   clerk compare the caster's with the hash of the same fields read from the live island: equal — the field shows the
   island where it hangs; different — the field still reads it where it hung at the last evaluation, the view draws the
   current strip as pending (V5 §5.1; this is the one reader of the live island's shade) and the clerk answers "The
   ground beneath will catch up the next time the town changes over time", offering **Update shade now** (V5 §4.2) for an
   immediate change (V5 §4.5).
9. **What it amounts to** (the owner's "not a hard and fast rule"). The strip only sets bits; the weight is item 102's
   `w_sun`. At latitude 50° and the equinox the nine samples stand at 6.4°, 18.7°, 29.5°, 37.2° and 40° (computed from
   the solar geometry): the five midday ones reach 1.2 to 1.8 times a caster's height, the mid-morning and mid-afternoon
   ones about 3 times, the first and last are capped at 8 times. So an island whose underside hangs 100–160 m above its
   ground blocks the cells just north of its footprint for about three to five of the nine samples and sweeps far to the
   west and east for one sample each at the day's ends: its under-hang is a crescent north of it (south of it in the
   southern hemisphere), lowered by a third to a half of item 102's all-day amount. A `root` underside lengthens the crescent under the low samples
   and a `flat` one shortens it — the owner's J98 carried into the model as it is into the picture (V5 §5.3). This paragraph
   is a derivation from the defaults, PLAUSIBLE until T-V5-19 measures it.

### 3.20 The siting rulebook on and across the island (the owner's items 103 and 104 where they reach islands)

The one placement solver (§4.7 S10b) places everything on an island, in the unit run, with the rulebook of item 103 as
every other district reads it; this volume adds only what the rulebook cannot know — that the island is reached by a
ride, and what an island never carries.

1. **The route distance** `skyRoute(doc, from, to) → { lengthCm: Cm; access: Id }` (`@plat/sky`; implementer for S10b's
   reader, BCR-V5-16; J-V5.36). From a point `p` on island I to a class `c` on the ground: the least, over I's admitted
   accesses `a`, of `d_I(p, attach_a) + transferM + run_a + d_G(foot_a, c)` — `d_I(p, attach_a)` the island leg, the
   straight distance × the rung's detour factor (§4.7's `street` law for a point-to-point leg); `transferM` the route's
   allowance for the wait and the loading (`routing.transferM`, 100 m); `run_a` the access's run (V5 §2.2); and `d_G(foot_a,
   c)` the base's mode distance from the foot to the class (§4.7 S10b's *Supply distances by mode*): the `street`
   distance (the ground's class distance raster for `c` read at the foot, × the detour factor) where the foot and the
   class stand on the same side of the town wall, else the `road` distance through the gate by which the class is reached
   — a foot outside the walls reaches a class inside them only through a gate. A class on the island itself is read on the
   island's own class distance rasters, which the unit run's S10b builds as the base's does. `access` is the access of the
   least sum (ties by access ordinal), which the clerk names (8). From a ground point
   `q` to a class on an island: the same sum taken the other way; inside the pooled S10b — before the island's own
   placement exists — the island's class stands at the island's land centroid (`d_I(attach_a, centroid)`), so the ground
   pool reads only what exists before it (§4.1's laziness contract); after generation (post-build requests, epochs) the
   island's placed plots are used. Between two islands: through the ground, both legs and two transfers. A `river` or
   `sea` supply edge never crosses arenas (its distance is ∞): the island's conjured river and spring pond carry no trade
   and **satisfy no NEEDS row** — a class needing running water, a river bank or a harbour finds none on an island
   (J-V5.23: they are magic's own; V5 §3.5 (3) (a)).
2. **Admitted accesses.** An access in state `open` (its `unserved` reading included); never a `closed` or `ruined` one.
   A `secret` access admits only the pulls of classes whose clientele is clandestine (item 103 (a)); a `guarded` access
   only its institution's own supply edges and the law-and-enforcement classes' rows.
3. **Which families read it.** The route distance serves SUPPLY (the supply edges under the `street` and `road` modes),
   CLIENTELE (the island's `dist.market`, `dist.plaza` and `dist.gate`, V5 §3.11), COMPETITION and COVERAGE (the distance
   between members; a walking radius — the route to the ground passes every walking radius, which is why a walking-radius
   row counts the island as one unit, V5 §3.5 (3)), ALIGNMENT (law against crime, sacred against profane, elite against common: people
   walk and ride) and every signature pair of item 103 (b) whose two ends stand on different arenas. The nuisance
   families (EMITS against SENSITIVE-TO; upwind and downwind) read the straight distance in three dimensions — the
   horizontal distance and the elevation between the two points — since smoke and smell rise and noise carries through
   the air; upstream and downstream never cross arenas.
4. **What an island never carries.** The rows of `IslandRule.carry.never` (V5 §3.5 (3) (a)): the heavy processors and
   wholesale and storage, the top-step emitters, the classes whose hard needs an island cannot meet, and an active chain's
   working nodes; their demand stays on the ground. What may split is (11)'s.
5. **The landings.** `sky_landing` and `sky_landing_top` are placed by their accesses (V5 §3.10), never by a pull; their
   siting facts (V5 §2.4) act on their neighbours through the families, so noise-sensitive homes keep a little away from a
   hoist house and the classes that serve the island gather near its landing yard by the route distance.
6. **Custom institutions** (item 104). A custom kind on an island reads its resolved profile as any class does; the
   island institution rows take it by its scene archetype (V5 §3.4). Nothing custom can stall the sky: an unplaceable
   preference is reported with the closest options, as item 104 (d) requires.
7. **The island's own placement is not the solver's** (J-V5.34). V5 §3.7's score places the island as one body over the
   ground plan at S7b (5), before any plot exists, so it reads no family; its purpose terms (a palace near the plaza, a
   prison or an arcane tower far from it) are the island-scale reading of those institutions' profiles, and volume 11
   writes their values with the profile as their provenance.
8. **"Why is this here"** (item 103 (e); the clerk, V5 §4.5): a use on an island names the rows that pulled it, and a pull
   that crossed arenas names the landing it went through and the route length ("near the mill below, by the east hoist,
   340 m by route").
9. **Supply chains across the island** (the owner's item 104 (h); J-V5.39). An ACTIVE custom chain (item 104 (b): every
   node present in the dossier) — and, for a dossier-backed town, each of the dossier's `activeChains[]`, its processors
   resolved by kind family (item 105 (i); volume 8) — is placed as one connected thing by the base's chain rules; the
   island changes five things and nothing else.
   (a) **What goes up.** The sky fill never carries a chain's RESOURCE node — a resource sits at its terrain feature on
   the ground (item 104 (h) (1)); the island's conjured river and spring pond are magic's own, carry no trade (1) and
   are never a chain's feature — nor its PROCESSING nodes, first or later, whose demand stays on the ground with the
   chain's working steps (V5 §3.5 (3)). Its FINAL SELLER and its CONSUMERS (the institutions and households that require
   its output) follow V5 §3.5 (3)'s proportional share like any class. The one exception is the island's own institution
   (V5 §3.4): a custom kind carried as a `tower`, `palace` or `cathedral` that is also a chain node, at any step, stays on
   its island and keeps every link by the route.
   (b) **The links cross by the route.** Every link between a node on an island and a node on the ground is a supply
   edge of mode `street` measured by `skyRoute` (1) — so the chain's last ground node leans toward the landing foot
   whose route to the island's node is shortest, and the island's node toward that landing's top. Item 104 (h) (2)'s
   natures act on the route as on a street: a perishable link's short reach holds its ground end close to the landing;
   a bulky link's water and main-road preferences never cross arenas (a `river` or `sea` leg is ∞ there, (1)), which is
   one more reason (a) keeps bulk on the ground; a valuable link's security pull counts a `guarded` landing as a secure
   site and an `open` public one as none.
   (c) **Order.** Placement runs upstream first (item 104 (h) (4)). At generation the island's unit run reads a ground
   supplier as the pooled S10b reads any provider — the block whose S10a allocation holds it, eager and town-wide
   (§4.7 S10b's *Supply distances by mode*) — and the ground pool reads an island node at the island's land centroid
   (1); a post-build request and an epoch read the placed plots on both arenas. The flow order is measured along the
   route: a chain's final seller on an island stands at a smaller route distance to its market than the chain's
   resource does, in at least the share the base's ground-only bar declares for the same chain (T-V5-24).
   (d) **Shape** (item 104 (h) (3) as revised by item 107 (e)). A chain whose in-town nodes lie on two arenas sits close
   at street scale on the ground, where its steps are compatible, and STRETCHES through its landing, the landing one step
   on its road; it is never read as close across the arenas. It is named a quarter only past item 72's quarter-identity
   threshold, or by the dossier or the author — and then on the ground (volume 1's reading), since (a) leaves an island at
   most the sellers and the consumers; no quarter is ever assigned to it by rule.
   (e) **Endpoints, services, change, declarations.** An import or export endpoint's store stands at the ground's gate or
   quay facing the partner (item 104 (h) (6)), never at a landing — an island has no outside partner of its own. A
   custom service `providedBy` an island institution sits inside it on the island (item 104 (h) (5)). A chain that
   deactivates leaves its island nodes where they stand, their pulls removed; one that activates places its new nodes
   against the standing ones, upstream first, an island node by the solver's positive placement on the island's arena
   (§7.7's `placeAt`) — never a unit run (V01 V1-3.10.3 (6); seam SLR3-09), never by moving, resizing or re-deriving an island (item 104 (h) (7)). An
   author's map-side declaration of a custom kind onto an island (item 104 (a) (1)) is T6's `assign` with `criteria.sky`
   (V5 §4.2), keyed by the kind's `localUid`, and is held as every declaration is — it may place a processing node up,
   the author's word outranking (a), with the fate "this chain now crosses the hoist" listed at its dry run.
10. **The supply web across the arenas** (the owner's item 105 (a)–(e); J-V5.50). Every link binds, pulls and explains
   across an access exactly as on the ground, with the route as its distance and the access as the place where its end
   is felt:
   (a) **Binding.** Each consumer member binds to its NEAREST provider member of the good by the edge's mode (item 105 (a),
   item 107 (c)), measured by `skyRoute` when the two stand on different arenas — the same metric the pull reads — ties by
   provider address.
   (b) **Both ends pulled, at the access.** An island consumer counts toward its ground provider's weighted centre (item
   105 (b)) at the **foot** of the access its route used, weighted as its link; a ground consumer bound to an island
   provider counts at that access's **top** (its island attach) — never at a world position beneath the island, where no
   goods go. So a ground baker serving the island leans toward the main hoist's landing yard, and an island shop serving
   the ground leans toward its landing's top.
   (c) **Orientation, several outputs, hubs** (item 105 (b)–(e)). A class's orientation (source, market or balanced;
   volume 11's goods table) and its per-good pulls act across the arenas through the same substitution; a balanced class's
   "junction where its input and output routes meet" may be a landing — its foot on the ground, its top on the island —
   scored, never forced.
   (d) **Status.** A link of one of the dossier's `activeChains[]` that is `impaired` or `vulnerable` weakens by item 105
   (i)'s status table on the route as on a street (9).
11. **Split works and shops across the arenas** (item 105 (h); J-V5.51). A split class carried by V5 §3.5 (3) (c) is one
   item on two plots on two arenas: its works on the ground by its nuisance and input rows, its shop on the island by its
   output and clientele rows, the shop's `Use.branchOf` naming the works' use; the route between them is its own link
   (their distance for every row that reads it). Every lifecycle path covers both, as item 105 (h) requires: creation by
   S10b as one item (the pooled S10b places the works, the island's unit run the shop, reading the works at its S10a block
   by (12) (a)); a state, closure or removal of the institution reaches both; a relocation moves each by its own rows; a
   fall or a delete of the island relocates the shop (the works stays); undo restores both; the author or the clerk may
   merge them back onto one plot by a map-side declaration (on the ground; up only by an author's held T6 declaration,
   with the fate listed); migration: an absent `branchOf` is no split. Every split across the arenas is reported.
12. **Order, the district term and spread, per arena** (items 105 (f), (g) and 107; J-V5.52).
   (a) **Order and relaxation.** At generation each arena runs item 105 (f)'s order — anchors, field-driving classes,
   source-oriented classes by depth, balanced, market-oriented — and its one bounded relaxation on its own: the pooled S10b
   on the ground, the unit run's S10b on each island. Each reads **only the other arena's proxies** — the ground reads an
   island's classes at its land centroid ((1)), the island reads a ground provider at the block its S10a allocation holds
   ((9) (c)) — never the other's placed plots, so neither order waits on the other and both relaxations are byte-stable
   whatever the worker's interleaving (T-V5-22 (j)). After generation (post-build requests, epochs), both read the placed
   plots on both arenas, the relaxation of one arena holding the other's placements fixed.
   (b) **The district term** (item 105 (g); seam SLR2-03; J-V5.75). S7b (1)'s supply term reads a sky pseudo-district as
   one consumer location at its island's **land centroid's world point** (`anchor` + the outline's centroid, fixed by S7b
   (5)'s placement, V5 §3.7) — the proxy the ground pool reads for an island's classes ((1)) — since the landing feet are
   sited only at SKY, after S7b (V5 §3.1). Its carried classes' links are scored there against the providers already
   allocated, by the centroid distance volume 1's χ̃ reads at S7c (V01 V1-3.2 (5)) — no route, since no access exists yet
   — so the ground districts beneath and beside the island gain a little supplier affinity, at the term's low weight,
   never past J-A72.46's dispersal.
   (c) **Near enough** (item 107 (b)). A cross-arena link's satisfaction plateaus on the route length: full within the
   good's `comfortM` of the summed legs (`transferM` counted inside), decaying to 0 at `maxDistanceM`.
   (d) **Spread** (item 107 (a), (d), (f)). Coverage counts an island's districts as districts (V5 §3.5 (3); J-V5.37), and
   a spreading class's same-kind spacing (its soft `far` row to its own class inside a district) applies inside each
   island district as inside a ground district; an everyday service's link to its supplier across the arenas keeps its
   generous `comfortM`, so an island apothecary is never pulled down to the herbalist below.
   (e) **Quarters never assigned** (item 107 (e)). No island district is made a quarter by rule. A dossier QUARTER record
   (item 108 (a)) or district-defining record (item 72) binds to ground districts when records bind, before any island
   district exists; the author may bind one to an island district by T5 with `sky` and the record's kind (V5 §4.2), held
   with its fate.

### 3.21 The rim as a barrier (the owner's item 106 where it reaches islands; J-V5.49)

An island is barrier all round: its rim is a sheer drop, and its only approaches are its landing yards.
1. **The rim is a barrier edge.** For item 106 (a)'s closure and every "enclosed" or "sealed" test, the island's `rim`
   chain is a natural barrier of defensibility class `sheer` — closure only, no wall (a row volume 11 adds to item 106's
   defensibility table: barrier kind `cliff`, class `sheer`, wall `none`). The clerk's `closure` answer names it as
   barrier `cliff` (volume 10's `WhyAnswer.closure`).
2. **Generation never walls an island.** No stage lays an enceinte on a sky arena; the island's defence is its rim and
   its landings. A prison island's is its rim plus its `guarded` landing, the one approachable arc, whose `guarded` role
   already admits only its institution's and the law-and-enforcement classes' rows (V5 §3.20 (2)).
3. **An author's wall on an island** (T3 `wall` in one of its **enclosure** kinds with the `key` parameter naming the
   island; `drawWall` with `key`, V5 §4.2) is an `Enceinte` of closure `barrier` on the island's arena — T3's `retaining`
   kind and a T2 terrace stroke's edge are never enclosures and lay an island `RetainingWall` instead (V5 §3.22 (4);
   C5-50): its approachable arcs are the landing yards'
   frontages — each landing yard is closed across its inner side by one stretch on the rim strip's `setback` line, both
   ends anchored on the rim (a tower at each anchor, item 106 (a)'s anchor rule) and a gate at the yard's attach — and
   every other arc of the rim is closed by the barrier, with zero wall edges. The tool snaps the stroke's ends to the rim
   and shows the rim arcs as part of the circuit (item 106 (g)); a stroke drawn along the rim away from a landing is
   bent at its dry run to the rim arcs' landing stretches only, with the line "the drop is the wall here" (J-VI.4), and a stroke that crosses the island's interior is an
   inner wall laid as drawn (a castle's or a close's, §4.8's furniture). The stretch profile (item 106 (c)) grades each
   stretch: the full curtain across a landing yard, the strongest towers where it meets the rim. Adding or removing an
   access re-evaluates the circuit by item 22's least disruption: a new landing gets its stretch and gate, a removed one's
   stretch is removed (listed fates).
4. **The clerk** explains an unwalled rim: "the drop is the wall here" (V5 §4.5).
5. **The no-op pin.** With item 106's `barrier` closure and the stretch profile off, an author's island wall is the base's
   ring along the rim strip's line, byte-identical to the base (T-V5-27).

### 3.22 Item 110 on, under and against the island (the owner's "they go in"; C5-47 to C5-55)

The base carries item 110 (a)–(d) through the coherence pass's application of file g; volume 1 carries terraced wards and
the unit run's levelling, volume 2 stepped massing and deck buildings, volume 4 the vaults under raised ways, and volume 6
all of it over epochs. The island meets item 110 in the places below; each rule here is this volume's, everything else
of item 110 is theirs, and none of it changes a ground value while the island setting is off.

1. **Casters under an island** (C5-47). Everything item 110 raises above the ground is a caster to the island's
   clearance: a raised part's deck top with its parapet, or an aqueduct's channel wall, over the deck's plan, and its
   raised-way piers (item 110 (b)); a retaining wall's high-side top and a levelled platform's datum where fill raises
   it (item 110 (a)); a stepped building's highest massing tier, read from volume 2's stack envelope (item 110 (c); V02
   §3.15.2, its X20). They are read at SKY for what exists then (V5 §3.9 (3); with the recommended slot, every
   generated raised part), at SKY-F for what the pool and the unit runs placed (V5 §3.9 (5)), after every epoch's growth
   (`sky.clearance`, V5 §3.15 (7)), and by any edit that adds one beneath (V5 §4.3). Their heights are volume 11's
   raised-way, terrace and massing-tier rows; the caster allowance's P0 measurement runs with them on (V5 §3.9 (5)).
2. **The island yields, never the city** (J-V5.68). No raised part, retaining wall or building is moved, lowered or
   refused because an island floats above it: the island's `groundRefCm` rises to clear it and its elevation follows
   only where the floor needs it. The raised-way generator treats an island's projected footprint as open air; only the
   accesses constrain its courses ((3)). A caster removed beneath an island re-reads `groundRefCm` and never lowers the
   island (V5 §4.3).
3. **The accesses and the decks** (C5-48, C5-49; J-V5.60, J-V5.61).
   (a) **Feet on part-0 land only.** Admissible ground for a foot, a landing yard and S7b (5)'s reachability transform
   excludes every raised-way pier footprint, every raised deck's plan dilated by `accessSiting.deckGapM` (4 m) and every
   deck face of item 110 (d) (V5 §3.7 (2), §3.10 (3)–(4)); "the nearest way" is a walkable part-0 way.
   (b) **Rope lines clear the decks.** A `ropeway` or `lightBridge` keeps `accessSiting.lineClearM` (8 m) over every
   raised deck and raised-way pier its segment crosses, at SKY and after (V5 §3.10 (3)).
   (c) **The accesses as overhead obstacles.** For every raised part laid after SKY, `skyAccessObstacles(doc)` (V5 §2.3b)
   is read by its two callers (BCR-V5-29 (e)): item 110 (b)'s course solver — at an epoch's raised-way pass (V06), at a
   new stage's S4 in an epoch, or at a generation stage after SKY if the integrator places one there — which keeps the
   deck, its parapet and its raised-way piers out of every column dilated by `deckGapM` and under every segment by its
   `clearCm`, re-routing by its own ladder and otherwise not building the part (reported "would cut <island>'s hoist");
   and T4 `road`'s `raised` dry run (and the aqueduct class), which re-routes or, failing that, ends the course at its last
   ground vertex before the column with the line "this would cut <island>'s hoist; it ends here" (J-VI.4 (f)). An access placed or moved later (`placeSkyAccess`, a move, `setAttr(ground.at)`) meets the
   standing raised parts by (a) and (b) at its own dry run.
   (d) **No raised way reaches an island.** A raised part's two ends are ramps or stairs joined to ground vertices (item
   110 (b)); a T4 `raised` or aqueduct stroke that ends on an island's rim makes no way and is bent into a sky access
   (V5 §4.2; J-VI.4 (d)), so the base's "sky: no portals, no roads in or out" (II.1) stands. **No raised part stands on an island**:
   item 110 (b)'s decks live in ground parts ≥ 1, and the sky layer has one part per island (V5 §2.1); a T4 `raised` or
   aqueduct stroke on an island's key is bent (J-VI.4 (e): `raised` dropped, the aqueduct made a fountain pin; the line reads "An island carries no raised way; its bridges cross its river on their
   own decks"; "An island's water is its own"). **No access is a way**: sky access is `SkyAccess` only (V5 §2.2); none is
   a way or a portal, and none carries deck plots.
4. **The island's own retaining walls** (C5-50; BCR-V5-27; J-V5.69). Volume 1's unit run levels island ground by item 110 (a)'s
   thresholds (`terrace.slopeMin`, `terrace.stepMinCm`, volume 11's rows, read unchanged), which on the island's gentle
   dome and quarter-amplitude echo (V5 §3.8 (3)) bite mainly on an `own` relief of a steep class; a terraced edge is laid
   only where the island's relief class — `terrainEcho.reliefClass` for `own`, `plain` for `echo` and `none` (V01
   V1-3.17.7 (2); seam SLR3-03) — asks for terraces. Each retaining wall it raises — and each one an author
   draws with T3's `retaining` kind or as a T2 terrace stroke's edge with the island's `key` — is a `RetainingWall` on
   the island's arena (BCR-V5-27: "a chain on the arena whose terrain it levels"). **Never on the rim strip or along the
   rim:** the levelling stops at the rim strip's `setback` line, and a retaining stroke that meets the rim strip or runs
   along the rim is moved inward past the rim walk at its dry run with "The rim walk stays level; the wall stands inside
   it" (J-VI.4 (g)) (the rim strip is never
   cut, V5 §3.12). It is never an enclosure, never snapped to the rim and never a member of a barrier circuit (V5 §3.21
   (3)). It draws in the island's frame and is displaced with it under `offset` (§8.4), its shadow on its low side as
   item 110 (a) draws it; it tombstones with the island at a fall (V5 §3.16 (7)) and exports in the island's `sky`
   collection (V5 §5.5). The surface top and SKY-F's crypt re-test read the levelled heights through `levelledGroundCm`
   (BCR-V5-30; V5 §3.9 (4), §3.10 (5)). A
   way that crosses it becomes a stair or a ramp by item 110 (a)'s way-class rule, on the island as on the ground.
5. **What the raised-way generator reads of the sky** (C5-52; J-V5.63; BCR-V5-29 (b)–(d)).
   (a) **Endpoints bind to reservations.** An elevated road's endpoints are the reservations — the citadel's site, a
   great temple's or cathedral's precinct — never the institutions in them. S7b (5)'s hand-over keeps the reservation
   (V5 §3.5), so a road raised to a precinct whose cathedral later rose to an island stands, and its reason reads through
   the hand-over ("links the citadel and the old cathedral close, whose cathedral rose to <island>"). S7b (5)'s
   eligibility is unchanged: a road holds no institution on the ground.
   (b) **Ground arena only.** At an epoch and in every post-build request, the generator reads ground-arena entities only
   (`PlatKey.layer` `'ground'`, any part) — for its endpoints (two high wards, terraces, the citadel, a great temple) and
   for its evidence (dossier landmarks on high ground) — never a sky ward, an island institution or an island landmark.
   The test is by arena, never by a list of `sky-*` kinds.
   (c) **The water need by arena.** At generation the aqueduct's need reads the S2 population whole, since S7b (5) has not
   run — a small, deterministic overestimate (a full island carries at most 3 × `H_d` households). At an epoch it reads
   the ground households only: an island's households are never in a ground water need, its water being its own — its
   conjured river or spring pond (V5 §3.8) and any well the unit run sinks on the island's own arena, which reads nothing
   of the ground — and no aqueduct serves an island.
   (d) **Ground hydrology only.** The aqueduct's source search reads S1's springs and rivers on the ground terrain; an
   island's conjured river, spring pond and waterfall are never "a higher spring or upstream river" (a pond 60–220 m up
   is exactly what a naive search would find), and no aqueduct terminal, basin, cistern or fountain stands on an island.
6. **Stepped massing and deck plots on the island** (C5-55). An island institution may take volume 2's stepped rows (a
   stepped temple, a terraced palace, a tiered tower) through its composition and class rows, as on the ground; the
   surface top reads each point's highest massing tier (V5 §3.9 (4)), and a cathedral's crypt lies under its lowest
   massing tier, inside underside tier 0 (V5 §3.10 (5)). The island's bridges over its conjured river (built by
   volume 1's unit run, V01 V1-3.10.3 (4); seam SLR3-10) may carry deck plots by item 110 (d)'s base mechanism, and they fall with the island (V5 §3.16 (7)).
7. **Removals.** A removed generated raised way, retaining wall or deck plot beneath an island holds through
   regeneration and epochs by the base's and volume 6's rule (critique-V6 C6-38); this volume adds only the island's own
   removals — an island or an access that stays removed (V5 §3.2 (6), §3.10 (1), §4.2; C5-51).
8. **The landfall** covers raised spans, raised-way piers, retaining walls and deck plots (V5 §3.16 (2)–(5); C5-53).
9. **The no-op pin and the declared shift** (C5-56; J-V5.67). With item 110's terrace, raised-way and deck-plot rows off,
   every island value — its altitude, ground reference, accesses, strips and landfall — is byte-identical to this volume
   without item 110. With them on at their defaults (the owner's ~23:40 default at CITY and METROPOLIS), both sky goldens
   of T-V5-15 change once, a declared shift naming both fixtures: raised ways and retaining walls beneath and on the
   islands, and `groundRefCm` and the altitudes where a raised part stands under a solid.

## 4 Editing

### 4.1 The declarations — item 101's twelve tools, no thirteenth

Every island edit is an existing tool with at most one new parameter (§7.1's elegance rule):

| tool | on the sky | the events it emits |
|---|---|---|
| T1 `intend` | the islands setting (off / on) and the count (`auto`, 0–3) | `adjust('layers.islands')`, `adjust('islands.count')` — both Re-derive from S7b with their fate report (§7.8) |
| T2 `ground` | an island's terrain, water and rim, with the new `key` parameter naming the island; a terrace stroke on the island, whose edge lays an island `RetainingWall` (V5 §3.22 (4)) | `setField(terrain)`, `drawWater`, `moveCourseKnot` on its river, `warp` on its key (`fromLevel 0` moves the rim); item 110 (a)'s terrace form with `key` |
| T3 `wall` | a wall on an island, with the `key` parameter: in an enclosure kind a barrier-closure enceinte walling only the landing yards (V5 §3.21); in the `retaining` kind an island `RetainingWall`, moved inward past the rim walk when drawn on or along the rim (a bend, J-VI.4 (g); V5 §3.22 (4)) | `drawWall` with `key` (its kind item 110 (a)'s) |
| T4 `road` | a stroke from a ground point to an island's rim; with `raised`, bent into an access; with the aqueduct class, ended at its last ground vertex outside the footprint; on an island's key, `raised` dropped and the aqueduct class made a fountain pin (bends, J-VI.4 (d)–(e); V5 §4.2, §3.22 (3)) | `placeSkyAccess` (the kind from the stroke's class, or chosen by the dry run by V5 §3.10's rules); a bend emits the bent declaration |
| T5 `quarter` | a floating quarter: the new `sky` parameter | `quarter` with `sky` — a sugar event expanding to `convert raiseIsland` (declared), an `assign` of the kind to its district and `setAttr(name)` |
| T6 `place` | an institution onto an island | `assign` with `criteria.sky` (and optionally the island) |
| T8 `fill` | the prosperity, density and greenery brushes on an island, with the `key` parameter | `setField` with `key` — stroke overrides on the island's lattice (§7.2) |
| T9 `shape` | the island's altitude, area, position, occlusion, underside and field (a target mean); an access's kind, role, state, knowledge and foot; the rim's handles | `setAttr`; `moveVertex` on rim vertices |
| T10 `hold` | the island or its paths; New random on the island; **Update shade now** | `lock`, `pin`, `revert`, `regenerate` with the island's scope; `regenerate` with the scope `shade` and the island |
| T11 `name` | the island's name and label | `setAttr(name)`, `moveLabel`, `hideLabel` |
| T12 `dress` | the sky layer's visibility and occlusion | `setLayer('sky', …)` |
| history | the island conversions by hand; an island's delete (volume 9's delete row, the clerk) | `convert` (`resizeIsland`, `waneIsland`, `settleIsland`, `fallIsland`, `refloatIsland`, `raiseIsland`, `removeIsland`); `reclearIsland` is the epoch's own and has no tool |

Every declared thing is held (§7.2's declared means held): a declared island's outline and position, a declared
altitude or area, a placed access.

**No tool for the shade or the route.** The strips, the sky receivers' shade and the route distance are derived and carry
no edit kind. Item 102's `w_sun` and this volume's `shade`, `routing` and `casterAllowanceM` cells are table values
(`editTable`, §7.6, re-deriving from their first reader stage — SKY for `casterAllowanceM`, S10a for `shade`, S10b for
`routing`); T8 `fill`'s prosperity brush (`setField`) overrides the field beneath an island as it does anywhere (item
102 (f)); and **Update shade now** (below) brings the ground under one island's old and new strips up to date at once.

### 4.2 The new and extended events and their semantics (BCR-V5-10)

```ts
| { t: 'placeSkyAccess'; island: Id; top: PointCm /* local; snapped to the rim at the dry run */; foot: PointCm /* world */; kind?: SkyAccess['kind']; role?: SkyAccess['role'] }
// `quarter` gains   sky?: { altitudeCm?: Cm; institution?: string /* an IslandInstitution kind */ }   — its points are world points: the island's projected outline or seed
// the point-form events gain   key?: PlatKey   (default the ground): drawWay, drawWater, drawGreen, drawBoundary, drawFootprint, drawWall, placeLight, setField (terrain, prosperity, density, greenery)
//   — their points are in that arena's frame; the tool converts a world point by the island's anchor at the dry run, so a later move never invalidates the event
// `regenerate` gains the scope   { kind: 'shade'; island: Id }   — Update shade now (below)
// ConversionOp's island kinds (§4.11) become:
| { op: 'resizeIsland'; island: Id; areaHa: number; altitudeCm: Cm }
| { op: 'waneIsland' | 'settleIsland' | 'fallIsland' | 'refloatIsland'; island: Id }
| { op: 'raiseIsland'; allocation?: Id; declared?: { ring: PolygonCm /* local */; anchor: PointCm; kind: string; altitudeCm?: Cm } }
| { op: 'removeIsland'; island: Id }   // an author's removal: the record kept at its address in state 'removed', holding its slot (V5 §3.2 (6))
| { op: 'reclearIsland'; island: Id; groundRefCm: Cm; altitudeCm: Cm; elevationRaisedCm: Cm }   // the epoch's clearance re-check (V5 §3.15 (7)); returned by `sky.clearance` only
```

* **Pointing at an island.** Every sky hit test and every tool point on the sky layer converts the pointer's world point to
  the island's frame by the anchor — and, under `offset` occlusion, first un-displaces it (the world point less the
  island's `elevation × offsetPerMetre` offset vector, §8.4) — so a click on a lifted island's drawn house selects that
  house and a stroke drawn over the lifted island lands where it is drawn (listed for volume 9's hit testing, V5 §13).
* **Moving an island** (`setAttr(anchor)`, T9's drag). The arena is untouched. The dry run re-reads `groundRefCm` and the
  altitude floor at the new position, re-checks V5 §3.7's gap and frame, and re-lands every access: a vertical access's foot
  follows its top's new world point; a slanted one keeps its foot while it stays within the row's run, else is re-sited
  by V5 §3.10 (4). A foot that leaves its landing plot closes that plot's `sky_landing` use (item 17's `closeUse`, the house
  left vacant) and opens one on the plot under the new foot by a positive placement (§7.7's `placeAt`, the designation
  mutator on that plot). The fates list both plots. `placement.byAssignment` becomes true.
* **Resizing** (`setAttr(areaHa)` or `resizeIsland`). The rim is eroded or dilated by the kernel's buffer (§3.7) on the
  island's arena to the new area within 1 % (bisection on the distance, ≤ 12 steps), keeping its shape — never re-drawn
  from the stream (J-V5.7); a growth past 1.5 × `areaHaMax` first grows the frame (V5 §3.8 (1)). The tiers re-scale
  (`depthCm` by the square-root ratio of the areas).
  **The rim's L1 pieces follow the rim in the same commit** (seam SLR3-02; J-V5.77). One island L1 batch re-lays the rim
  strip `rimStripM` inside the new rim and re-claims each landing yard at its top, the top re-seated where its direction
  ray `d_k` now leaves the land face (V5 §3.10 (2), (5)) and its foot re-landed as a move re-lands it (above). Each
  re-claimed yard is served in the same commit: its `sky_landing_top` plot re-cut on the new yard (the old one
  tombstoned) and its use opened there by a positive placement (§7.7's `placeAt`), the plots the yard covers re-derived
  by §7.3's local operator on the island's arena, and SKY-F's checks and repairs (V5 §3.12) run on the island, so a way
  meets every attach. The institution claim is kept where it still fits the land face less the re-laid strip and yards; else it is re-searched
  by V5 §3.10 (5)'s score and crypt re-test over the sites inside the district that holds it — so every district keeps
  its kind (V5 §3.12 item 5) — and that district is re-derived by its scoped re-derivation from S8 with the new claim a
  hole and the old claim's land its own (V01 V1-3.10.3 (6) (c)'s claim re-search, which releases the institution from
  V1-3.9's fixed inputs; seam SLR4-03), whose S10b places the institution on the new claim (V5 §3.12): its use relocated
  there (a dossier-backed one by the solver's `dossier` request, V5 §4.4), its old building demolished, a listed fate.
  That district is re-derived whether or not it receives a band face, and once where it does. **A resize never leaves the claim without a site:** the area is floored at the
  least area (the same bisection) at which some site in that district still fits; a hand request below the floor is
  bent to it with the line "<island> keeps room for its <institution>; shrunk to <area> ha" (J-VI.4), and an epoch's
  `resizeIsland` (V5 §3.15 (2)–(3)) stops at it, listed in the epoch's report.
  **Shrinking:** every plot that loses at least half its face to the eroded rim, the re-laid strip or a re-claimed yard
  is cleared (its households relocated on the island first, then to the ground), the rest re-cut with their neighbours
  fixed (§4.7 S10 (7)); every way that crosses the re-laid strip line is cut back to it (the strip is never cut, V5
  §3.12); no district is re-derived but the claim's where the claim is re-searched (above); and the rim walk is re-laid
  on the re-laid strip by volume 1's `plantRimWalk` (V01 V1-3.10.3 step 4) in the same commit (seam SLR4-03).
  **Growing:** the land between the old and the new strip lines — with whatever an old yard held that its re-claim does
  not, less the re-claimed yards — is cut into faces by extending, in the same L1 batch, each district boundary way that
  meets the old strip line across the band to the new one along the band's normal there (the same class); each face
  joins the district of its nearest rim stretch (ties by district address), and every district that receives a face is
  re-derived by its own scoped re-derivation from S8 (V01 V1-3.10.3 (6) (c); seams SLR2-02, SLR3-02) — never a unit
  run, which would re-cut every district, and never a change of the island's district count; volume 1's `plantRimWalk`
  then re-plants the rim walk whole, once for the resize (V01 V1-3.10.3 step 4; seam SLR4-03), since the walk is one
  island-level pair that no district's re-derivation writes.
* **Altitude** (`setAttr(altitudeCm)`): the record alone; a value below V5 §3.9's floor is bent to the floor, the line naming it (J-VI.4).
* **Underside and occlusion** (`setAttr(underside.*)`, `setAttr(occlusion)`): the record alone (`underside.source`
  becomes `edit`); an underside change that would break the floor raises the altitude, listed as a fate.
* **Field** (`setAttr(field.prosperity)` — a declared target mean, `declared.field`: the gradient shifted uniformly to
  meet it, V5 §3.11 (5); `setAttr(field.density)`, `setAttr(field.greenery)`; and the island brushes, `setField` with
  `key` and a prosperity, density or greenery stroke, as §7.2's stroke overrides on the island's lattice over the
  gradient): the island's plots whose value crosses a cut past τ re-derive (§7.2's rule for a field brush), on the island
  only.
* **Reshaping the rim** (`moveVertex` on a rim vertex, `warp` on the island's key with `fromLevel 0`): §7.3's local
  operator on the island's arena moves the rim, and the rim's L1 pieces follow it as a resize's do (above; seam
  SLR3-02; J-V5.77) — the strip re-laid inside the new rim, each landing yard on a moved stretch re-claimed at its top (a
  pinned `sky_access` vertex never moves), the institution claim kept or re-searched inside its district; a reshape
  that would leave the claim no site there is bent back along each moved vertex's drag to the furthest position that
  keeps one (bisection, ≤ 12 steps; J-VI.4), with the line "<island> keeps room for its <institution>; the rim stops
  here". Each stretch that moved outward is a growing resize's band — its faces, cut at the extended district boundary
  ways, joining the district of their nearest rim stretch (ties by district address), every district that receives a
  face re-derived by its own scoped re-derivation from S8 — and each that moved inward a shrinking resize's, which gives
  no face and re-derives no district (the claim's aside, re-derived where its claim is re-searched, above; V01
  V1-3.10.3 (6) (c); seams SLR2-02, SLR3-02, SLR5-06 (d)); volume 1's `plantRimWalk` then
  re-plants the rim walk whole, once for the reshape (V01 V1-3.10.3 step 4; seam SLR4-03); `areaHa` is rewritten to the
  new land area.
* **New random on the island** (`regenerate` with the island's scope, `newRandom`): the outline's displacement, the
  terrain (with an `own` relief's class, V5 §2.1), the underside (unless edited) and the river re-derived under the next
  reroll, SKY's island steps re-run (the rim strip, the landing yards and the institution claim re-laid, V5 §3.10 (5)),
  the island's districts re-laid by volume 1's unit run (V01 V1-3.10.3 (6) (a)–(b); each district's template kept where
  its lineage is, V1-3.3.4), then SKY-F (V5 §3.12), which rewrites `SkyIsland.districts` (seam SLR3-09); the anchor, the
  area, the altitude, the allocation and every access's foot kept; each vertical access's top re-seated at the new rim's
  point nearest above its foot, and where the new rim no longer overhangs it the access becomes a `ropeway` from the rim
  point nearest the foot. The altitude floor (V5 §3.9 (4)) is re-checked after the underside is re-drawn: a deeper root
  that breaks it raises `elevationCm` to the floor (a listed fate), as an underside edit does. The ground is
  byte-identical (the seam exception is empty); `shadeBasis` is untouched (the shade follows at the next evaluation).
* **Declaring an island** (T5 with `sky`). At its dry run: the gate (V5 §3.2 (1)) and `h_town > 0` must hold — a declaration
  where the town cannot supply magic is allowed only with the fate `held against its supply` confirmed (J-V5.10); the
  points form gives the projected outline (a lasso), a disc of the kind's area at one point, or the routine fitted to two
  to four corners; the slot is the lowest free (the lowest held slot when none is free, released by this event, V5 §3.2
  (6)); the fill is V5 §3.5's, taken by **relocating** the richest households from
  the ground (never re-deriving it) — each household moved up is a relocation, its ground building left vacant — all
  listed as fates; V5 §3.8–§3.14 then run on the new island, which has no `shadeBasis` until the next shade evaluation
  (V5 §2.1): it casts and receives no strip meanwhile, and Update shade now on it writes one at once. In the creation prefix the declaration is read ahead by S7b (5)
  as a forced slot (V5 §3.2 (3)), so no relocation is needed.
* **Placing an institution on an island** (T6: `assign` with `criteria.sky`): the solver places it on the island named,
  else on the island whose reason is `institution` and whose row matches, else the dry run offers T5's declaration. A
  custom kind is named by its `localUid` (item 104 (a) (1): the map-side declaration, stored in the map document, never
  in the dossier); where it is a resource or processing node of an active chain, the dry run lists the fate "this chain
  now crosses the hoist" and the route lengths of its links before and after (V5 §3.20 (9) (e)).
* **Accesses.** `placeSkyAccess`'s dry run checks the kind against the `magic` circumstance and the row's limits (a
  kind that does not fit is bent to the nearest admitted kind in V5 §3.10's order, the line naming the kinds that fit;
  J-VI.4 (b)), inserts the top vertex on the rim, claims the island's landing yard (the plots it
  covers re-derived by §7.3's local operator on the island's arena, V01 V1-3.10.3 (6) (c); seam SLR3-09) and opens the ground landing by a positive placement on the plot
  under the foot. `delete` of an access reverses all three; deleting an island's last access is bent into a move
  to the next admissible site ("An island keeps one way up; moved to {site}"; J-VI.4 (c)), with "Place a different
  access" as the alternative. **A deleted generated access stays deleted** (C5-51): the delete's fold appends its ordinal
  to `SkyIsland.removedAccesses`, which every later re-siting skips and counts (V5 §3.10 (1)); where it was the `main`
  access, the lowest surviving generated ordinal takes `main` in the same event (a listed fate), so an island always has
  a main access while it has any; the delete's undo removes the ordinal. A placed access's delete leaves no ordinal (it
  was declared, and nothing re-sites it). The foot of a placed or moved access meets the standing raised parts by V5
  §3.22 (3) (a)–(b) at its dry run, a foot they block moving to the nearest admissible foot, the line naming the deck or raised-way pier in
  the way (J-VI.4 (b)). **`setAttr(kind)`** on an access re-runs the same check at its dry run — the `magic`
  circumstance, the row's altitude and horizontal-run limits, a `guarded` access a `hoist` only — and a kind that does not fit is bent to the nearest admitted kind, the line naming the
  kinds that fit (J-VI.4 (b)); an admitted change re-seats nothing but the landing buildings (the top's and the foot's use rows take the
  new kind's building). **`setAttr(ground.at)`** re-lands the access as a move does: the old landing plot's `sky_landing`
  use closed, a new one opened by a positive placement on the plot under the new foot, both plots listed as fates, the
  horizontal run re-checked. An island wall's circuit follows every access change (V5 §3.21 (3)).
* **The shade beneath follows** (item 102 (e); J-V5.27). Every event that changes what an island's strip would read — a
  move, an altitude, a resize, a rim reshape, an underside, New random on the island, a declaration, a delete, a
  `convert` — leaves `shadeBasis`, the ground's field and every strip where they were: its dry run lists the fate "The
  ground beneath will catch up the next time the town changes over time. Update it now?", and the shade map view draws
  the new strip as pending (V5 §5.1). A Re-derive from S10a or an earlier stage recomputes the bases and the strips with
  everything else.
* **Update shade now** (`regenerate` with the scope `{ kind: 'shade', island }`; T10, and the fate's own button). One
  shade evaluation for that island alone: its `shadeBasis` is written from the island as it stands, its strips onto the
  ground and onto the islands beneath it are recomputed — and, where it had no basis (V5 §2.1), the strips onto it from
  the islands above it — and the ground's field is recomputed over the union of the old
  and new strip windows — the cells of the other islands' strips re-read from their unchanged bases — with the blocks there
  whose value crosses a cut past τ re-derived by §7.2's rule, their fates listed. It is the one event besides the
  evaluations of V5 §3.19 (6) that writes a basis, and only its island's. The prosperity brush stays for hand changes.
* **Deleting an island** (volume 9's delete row on an island, the clerk; C5-51; J-V5.62). The dry run turns the delete
  into **`convert removeIsland`**: the island is removed without a landfall — its households relocated to the ground by
  §4.7's overflow pass (in an epoch's history, as any hand conversion, inside the event), its landing uses closed, its
  arena archived as `fallIsland` archives it, a split shop's use relocated to the ground (V5 §3.20 (11)) — and its record
  stays live at its address in state `removed`, `removed` written (`seq`, `generated` from its lifecycle cause) and its
  `slot` held closed (V5 §3.2 (6)). It draws, labels and exports nothing but its `.plat` record (V5 §5.1, §5.5). Where the
  ground cannot house its households, the dry run offers instead `adjust('islands.count')`, a Re-derive from S7b. The
  fate list says, in volume 9's shared words, "The town won't raise this island again; undo brings it back" (V5 §13).
  `convert fallIsland` is the ruinous alternative. A removed island is undone only by the removal's undo; a T5 `sky`
  declaration re-fills its slot with a new island only when no slot is free (V5 §3.2 (6)), never resurrecting it, and
  no `adjust('islands.count')` re-opens it. A floating, waning or
  settled island may be removed; a `fallen` one may not — its slot is already free and its landfall is ground content,
  which the ground's own edits clear.
* **Bringing an island down** (`convert fallIsland`, the history tool; the clerk's "bring it down"). The dry run lists
  V5 §3.16's fates, one per covered entity; a covered way's reads "rubble; a track until the town clears it (was
  <class>)", `<class>` the class the fall writes to `Way.formerClass`, or the one the way already holds there (V5 §3.16
  (4); BCR-V6-5). The event's undo restores each way's class, surface and prior `formerClass` (V5 §3.16 (8); seam TR-04).
* **A raised or aqueduct stroke to an island** (C5-49; J-V5.61). A T4 stroke that ends on an island's rim with `raised`
  or the aqueduct class never makes a way (II.1: no roads in or out). Its dry run answers with a bend (J-VI.4 (d); item 101 R2 refuses only a dossier fact or a lock) — "A road cannot reach a floating island; a hoist, rope line, stair or bridge of light can." —
  and makes, in the stroke's place, `placeSkyAccess` with the stroke's ends as top and foot and the kind V5 §3.10's rules admit there: a
  `ropeway` for a slanted stroke, a `hoist` where the foot lies under the rim, a `lightBridge` where `magic` admits it.
  An aqueduct stroke ending on a rim ends at its last ground vertex outside the island's footprint ("An island's water
  is its own; the aqueduct ends here"; J-VI.4 (d)). A `raised` or
  aqueduct stroke wholly on an island's key is bent — `raised` dropped, the way drawn on the island's ground; the
  aqueduct made a fountain pin at its end (J-VI.4 (e)) — with the line ("An island carries no raised way; its bridges cross its river on
  their own decks"; for the aqueduct, "An island's water is its own"). A `raised` stroke on the ground whose course would
  cut an access's column or pass within `lineClearM` under its rope line is re-routed by the dry run through
  `skyAccessObstacles`, or, where no re-route exists, ended at its last ground vertex before the column ("this would cut <island>'s hoist; it
  ends here"; J-VI.4 (f); V5 §3.22 (3)).
* **A retaining wall or terrace on an island** (C5-50): V5 §3.22 (4) — laid on the island's arena; on or along the rim
  moved inward past the rim walk ("The rim walk stays level; the wall stands inside it"; J-VI.4 (g)).
* **A wall on an island** (T3 with `key`): V5 §3.21 (3).

### 4.3 Locality and undo

| edit | effective scope | outside it, byte-identical |
|---|---|---|
| altitude, occlusion, underside, field and the island brushes, name, terrain and water on the island, a wall on the island, New random on the island | the island's arena and record | the ground and every other island (seam exception empty) |
| a resize, a rim reshape (seam SLR3-02) | the island's arena and record, plus the ground landing plots its re-landed feet name (their designations only) and the ground buildings that take the households a shrink relocates | everything else; every other island |
| an access placed, moved or deleted; an island moved; an island deleted | the island's arena and record, plus the ground landing plots its fates name (their designations only) | everything else |
| an island declared after generation | the new island's arena, plus the ground buildings its relocations vacate and the landing plots | everything else |
| a ground edit whose effective scope meets an island's projected footprint — a raised way, a retaining wall or a building added, raised or removed beneath it included (its dry run reading `skyAccessObstacles`, V5 §3.22 (3)) | the ground edit's own scope, plus that island's `groundRefCm` and, where V5 §3.9's floor requires it, its `altitudeCm` (a listed fate); a removal beneath never lowers the island — its `elevationCm` kept, `altitudeCm` re-read | the island's arena |
| `fallIsland` | V5 §3.16's covered set (raised spans and raised-way piers, retaining walls and deck plots included) and the island's arena | everything else |
| `removeIsland` | the island's arena and record, plus the ground buildings that take its households and its landing plots (their designations only) | everything else; the other islands' slots and draws |
| `reclearIsland` (an epoch's) | the island's record (`groundRefCm`, `altitudeCm`, `elevationCm` where raised) | everything else, the island's arena and `shadeBasis` included |
| Update shade now | the island's `shadeBasis`; the ground's field over the union of the island's old and new strip windows and the blocks there that cross a cut past τ; the strips onto the islands beneath it and, where it had no basis, the strips onto it | everything else, every other island's basis included |

No island edit writes the ground's field or any `shadeBasis`: the strips keep their basis (V5 §3.19 (6)), so every row
above holds for the field's rasters as for the ground's geometry, before and after a save and a load (BCR-V5-21); Update
shade now is not an island edit but a scoped shade evaluation. Every event undoes by its inverse through §7.4's fold; the
lifecycle rows of the new kinds join §7.4's table (BCR-V5-25): `convert removeIsland` — created by T9's delete on an
island or the clerk, read by the island record's state and every re-derivation's S7b (5) and epoch (the hold), persisted
in the log, honoured at regeneration as a hold (the slot never drawn or filled while the record stays `removed` and
unreleased), undone by restoring the island from the undo record (its arena from the archive, households, accesses and
landing uses), migrated by address mapping; `reclearIsland` — created by the epoch's `sky.clearance`, read by the
island's altitude readers, persisted inside the epoch event, replayed with the epoch, undone with it; `placeSkyAccess` — created by the event, read by the
access's marks, lights, exports and landings, persisted in the log, kept by regeneration with its top re-seated, undone
by removing its top, its claims and its landing designation, migrated by address mapping; `regenerate` with the scope
`shade` — created by T10 or the fate's button, persisted in the log, replayed as the same scoped evaluation, undone by
restoring the former basis, strips and field cells from its undo record, migrated as any `regenerate`.
`Document.nextSkyPart` never decreases, so an undone island's part stays spent.

### 4.4 The dossier — derivation row DR-SKY and coherence (BCR-V5-12)

| row | subject | dossier inputs | rule | chance | totality bar |
|---|---|---|---|---|---|
| DR-SKY | floating islands: the gate, count, reason, size, altitude and access kinds; what the sky fill carries of a chain; the shares it may not take | the population (the rung, DR23); `wealth.label` (DR6: the field, so `S_town`); the households' bands (DR7: `S_carried`); the institutions (DR9, DR24: a palace, cathedral, great temple, prison or mage's instance; a custom institution by its resolved scene archetype and `landmarkLevel`, item 104 (a)); the institution ladder records by their step type (item 108 (a): only a singular or SIZE record may go up; COUNT, GUILD and QUARTER members counted across both arenas); the district-defining records (item 72: their raised shares never taken by the fill); `government` (DR11: a palace's eligibility); `site.magic` (the `magic` circumstance: the gate and the access kinds); `site.deposits` (a `magical_node`: the node term of `h_town`, V5 §3.3); the active reviewed custom chains (item 104 (b)) and `activeChains[]` (item 105 (i)): the nodes the fill keeps on the ground, V5 §3.5 (3), and the links' status | V5 §3.2–§3.10, V5 §3.15 (1b), V5 §3.20 (9)–(12) | `island.place` | every bound CITY or METROPOLIS map with the setting on has its gate resolved, its node term traced to a deposit or to none, each island's reason traced to a DR7 or DR9 fact, and no ladder pair counted twice across the arenas |

**The row's number.** DR-SKY is this volume's name for the row; the integrator gives it the next free number when the
volumes' base change requests are applied (file f), since volumes 1, 6 and 8 each propose a row numbered DR26 as well
(J-V5.40). The setting itself is the map's declared choice, never a dossier path. **Coherence:** where the dossier's `site.magic`
resolves to `none`, turning the setting on is refused (F-EDIT `dossier-owned`: "the dossier's world has no magic"), and a
dossier change to `none` at an absorb makes every island's target 0 at the next epoch — they wane, never vanish (item 22).
A dossier institution on an island stays a dossier fact: a fall, a delete or a resize that removes its building first
relocates it (§4.11's *Dossier content across epochs*). **The reverse** — the dossier removes the institution an island
carries (a palace, a cathedral, a custom tower) — removes the institution at once (the dossier is truth, item 20 (h):
its building vacated, its uses closed), leaves the island standing, and re-reasons the island at the next epoch by V5
§3.15 (1b): the next instance of its row's tags or archetype, else a prosperity island, else a wane (J-V5.53). Until an
epoch runs (a document without history), the absorb's report lists the island as "awaiting a new purpose", and the clerk
offers T6 (another institution onto it) or T5's kind change as ghosts. A
`magical_node` deposit that turns `depleted` or `removed` at an
absorb drops the node term at the next epoch's evaluation — the islands' supply falls by the law and they wane, never
vanish; one that turns `discovered` adds it at the next epoch (V5 §3.3).

### 4.5 The clerk's view

**Registration.** `@plat/sky` registers one `WhyProvider` (V10 §2.13) with `kinds` `SkyIsland`, `SkyAccess` and the
`fallen_island` decoration, answering from the committed model and the report, filtered by the caller's key. The
prosperity field's `drivers()` (V10's `FieldDrivers`) gives the daylight term one entry as the base defines it and, beside
it, one attribution per island whose strip covers the point: `{ driver: 'daylight', delta, sources: { caster: Id | 'terrain' | 'walls' | 'buildings'; samples: number }[] }`,
each source's `samples` the sample bits it blocks at the point and the entry's `delta` the ORed total × `w_sun` ÷ `bits`
(a sample blocked by a hill and an island is listed under both and counted once, J-V5.38) — the `sources` list is this
volume's addition to volume 10's `FieldDrivers.terms` (V5 §13). Pulls across arenas reach `PlacementSolver.explain`
(volume 10's `Explanation.terms`) with the access `skyRoute` returned, so every cross-arena term names its landing.

The reader (§11.2's `query`) lists each island in the gazetteer with its name, reason, state, area, altitude, supply and
accesses; `why` on an island answers with its gate, its slot's draw against `chance · h_town`, its reason's candidates
and weights (a custom institution's matched archetype named), its fill's bands and their shares of its land, its stop
cause, the trades it left on the ground by `carry` (each with its reason: heavy works, noxious, a need an island cannot
meet, a chain's working step) and the split shops it carried, the coverage instances it took per island district, the S3
reservation it handed over and to whom ("the old cathedral close — now the mother church"), its cathedral's crypt ("cut
into the island's rock; the largest crypt in the town"; half-sunk where the rock is too thin), its placement's class
shares, its reachability and score, its underside's kind,
and its strip — how many hectares of ground it shades for at least one, three and five of the nine samples, and whether
the field still reads it where it hung (the basis, V5 §3.19 (8)) — filtered by the caller's key (a `secret` service hoist
to a prison is withheld). `why` on a ground plot or quarter under an island names each island whose strip covers it and
for how many samples, the term's share of the plot's value, and whether the ground has caught up; `why` on a use on an
island, or on a ground use pulled by one, names the rows and the links that pulled it — the good, the bound provider or
consumers, the orientation (item 105 (j)) — and the landing each cross-arena pull or link went through with its route
length (V5 §3.20 (8), (10)); on a split shop it names its works below and the route between them (V5 §3.20 (11)); on a
node of a chain that crosses an island, it names the chain, the node's step in its flow, the landing its link crosses and
why its working steps stayed on the ground (V5 §3.20 (9)); on an island's rim with no wall, "the drop is the wall here"
(V5 §3.21); on a landfall, the island that fell, when, and what it broke (the walls breached, the ways buried, the arches
and raised-way piers ruined, the terrace walls broken, the shops that fell with their bridge, the fountain an aqueduct
no longer feeds) with the clearance still owed; on a removed island or access, "removed by you" with the event, and what
alone would re-open its slot (undo, or a new island drawn when no other slot is free — never a new island count); on an island the clearance raised,
"raised clear of the aqueduct" (or of the viaduct, the terrace wall, the stepped temple) naming the caster and the epoch;
on a road that could not reach an island, the bend and the access it made; on a bent terrace stroke, "The rim
walk stays level; the wall stands inside it"; on the town supply, it names the `magical_node` deposit when the node term acts — "the node beneath
the old ruins" when the report's `ruin.node` line names the deposit (V04 §3.5.0a (9); V5 §3.3). A clerk's proposals are these events as ghosts:
"a floating palace over the river" is T5 with `sky` and the palace kind; "raise it higher" T9's `setAttr(altitudeCm)`;
"let the ground catch up" Update shade now; "bring it down" `convert fallIsland` with V5 §3.16's fates. It never writes a
dossier fact and meets DR-SKY's refusal as any author does.

## 5 Rendering, labels, exports

### 5.1 Marks (S14; every sky coordinate is `anchor` + the local one)

| semantic | kind | what | bands |
|---|---|---|---|
| `sky.island.land` | `area` | the land face, in the style's `sky.ground` role (one step lighter than the ground's block tone in `ink`; the patch tone of `hatched`) | all |
| the island's fabric | as any district's | ways, blocks, plots, buildings, greens, water — `layer: 'sky'`, `z` above the ground | as the ground's |
| `sky.island.rim` | `outline` | the rim chain with the `cliff` bank program's outward ticks | all |
| `sky.island.shadow` | `shadow` | rung 3: the projected tier stack (V5 §5.3); `hatched`: the patch's drop shadow, as the Neighbourhood look draws its lone patch (`research/findings/vg-ng-devlogs.md` §B3.5; `research/findings/watabou-extra-a.md` §3) | all |
| `sky.island.underside` | `area` | `offset` occlusion only: the tier stack's silhouette swept along the offset vector — the rock hanging beneath the lifted island | all |
| `sky.island.tether` | `outline` | `offset` only: the true ground footprint dashed, and a hairline from the lifted centroid to the true one | district and finer |
| `sky.fall`, `sky.mist` | `glyph`, `area` | the waterfall's lip on the rim; a soft mist disc on the ground below it | district and finer |
| `sky.island.shadeStrip` | `outline` | the shade map view only (volume 9's thematic view of item 102 (f)), **outlines only — the veil of shade shares is volume 9's alone**: each island's held strip onto the ground at its basis as one solid ink line around the cells it blocks for at least three of the nine samples, traced by marching squares over the mask at the field cell, labelled with the island's name along it | city and district |
| `sky.island.shadePending` | `outline` | the shade map view only, while the caster's `shadeBasis` differs from its live island (V5 §3.19 (8)): the strip the island would cast now, its three-sample area as a dashed ink line — so a dashed line always means "where the shade will move" | city and district |
| `sky.access.<kind>` | `glyph` + `ribbon` | hoist: a glyph at the top and at the foot, joined only in `offset`; stair: the same glyphs, and in `offset` the helix of V5 §2.2 as a stepped spiral line; rope line: a hairline from the top's world point to the foot; bridge of light: a glowing ribbon with `light` marks along it at night | district and finer (the foot glyph at the city band) |

States (§8.2's `states`, BCR-V5-13, BCR-V5-18): the base's island rows stand, with the `fallen` row drawing its rubble over
the faces and bands of the `fallen_island` decoration's members (V5 §3.16) instead of the retired ruin face; a settled
island's buildings draw their own existence rows; an access reads `closed` (a bar glyph), `unserved` (alpha 0.5) and is
not drawn once `ruined`; the landfall's breached walls with their towers and gates (by their runs' `condition`, file f item 575;
seams TU-03, TV-04), ruined bridges and rubble ways draw by their own state rows (§8.2), as do its ruined raised spans and raised-way piers and its decayed retaining walls (item 110's state
rows, the base's); the deck plots tombstoned with their ruined decks draw nothing. A `removed` island draws nothing,
labels nothing and has no shadow (BCR-V5-18).
The island's own retaining walls (V5 §3.22 (4)) draw by the base's retaining-wall semantic in the island's frame, on the
sky layer's list, displaced with the island under `offset`, their low-side shadow cast by the light pass on the island's
sky surface layer.

**Slots and sheets** (BCR-V5-18). The sky layer composes its own list with §8.2's layer order; every shipped sheet (`ink`,
`lit`, `hatched`, `night` and the parity presets, which carry the rows though their recipes hold islands off) resolves
every sky semantic, so the loader never refuses one:

| semantic | layer-order slot (§8.2) | per-family facts (the values are volume 11's palette rows, row 52) |
|---|---|---|
| `sky.island.land` | 3 `ground.block` | role `sky.ground`: in `ink` one step lighter than `ground`; in `hatched` the patch tone; in `lit` and `night` the `ground` albedo lit by the light pass |
| `sky.island.underside` | 2, with the water (under the land, so the lifted land covers its top) | role `sky.ground` darkened one step, `ink` outline; `offset` only |
| `sky.island.rim` | 8 shore marks | the `cliff` bank program's ticks in `ink` |
| `sky.island.shadow` | 10 projected shadows | role `shadow` (rung 3); `hatched` the patch's drop shadow |
| `sky.island.tether` | 17 boundary treatments | `ink` hairline, dashed; `offset` only |
| `sky.fall`, `sky.access.*` | 19 towers and gate blocks | glyphs in `ink`; a bridge of light's ribbon in role `light` |
| `sky.mist` | 8 shore marks (after water) | role `water` lightened, alpha 0.5 |
| `sky.island.shadeStrip`, `sky.island.shadePending` | 25 live layers | `ink` lines, solid and dashed, label in role `label` |

The style role **`sky.ground`** joins §8.2's *Roles* (the land of a sky island: never `ground` itself, so an island reads
against the ground beneath it in every family). The island's own fabric resolves by the ground's semantics.

### 5.2 Occlusion

`ghost` by default (§8.4), `opaque` and `offset` as the sky `LayerSpec` sets them or an island's own `occlusion`
overrides. In `offset` the island's marks, labels and shadow-free silhouette draw displaced by `elevation ×
offsetPerMetre`, while its cast shadow stays where the sun truly puts it; the sky base is **lit at the island's true
position** and drawn displaced (V5 §5.3 (2)), and every pointer and tool point on it is un-displaced before the anchor
conversion (V5 §4.2).

### 5.3 Light and shadow — the underside's shadow (the owner's J98; BCR-V5-13)

1. **The slab list** holds, per island and **under every occlusion mode** — `opaque` as well as `ghost` and `offset`
   (BCR-V5-13 (a); an island is never written into the ground's surface layer as a column, whose shadow would start at
   the footprint's edge and lose the gap and the profile) — underside tier 0 and underside tiers 1 … n of V5 §3.9 (2), each its world ring,
   its top and its underside, so the island's shadow is the shadow of its whole rock: a `root` casts a long tapering tail under a low
   sun, a `flat` only its rim; the ground right beneath is shaded from above yet lit from the side through the gap under
   the root; and the penumbra widens with the distance from the underside, so a higher island's shadow is softer (§8.4
   (c)'s law, unchanged).
2. **The sky surface layer.** Where an island's drawn land face touches a tile, the tile worker rasters that tile's sky
   marks into a second base and a second surface layer (the island's terrain at its datum, its roofs, towers and crowns),
   each with its max-height pyramid. The light pass lights the sky base over the sky surface layer — its rays reading the
   ground's pyramids, the other islands' slabs and its own island's surface — and the ground base over the ground surface
   layer with the whole slab list; then composes: `opaque`, the lit sky over its coverage; `ghost`, the lit sky × (1 −
   `ghostAlpha`) over the lit ground × `ghostAlpha`; `offset`, the lit ground everywhere and the lit sky over its
   displaced coverage. The CPU reference and the GPU pass run the same law. A tile no island's land touches takes no
   second base, but it is **re-lit where an island's shadow falls on it** — the shadow reaches up to 8 × the island's
   height from its footprint. **The global light's window** (§8.4 (c)) reads the surface layers' own top, without the
   slabs, and each slab whose shadow sweep crosses the ray's plan is tested exactly over its own reach, (slab top − z) ÷ (m
   − σ_s) (BCR-V5-22; J-V5.56), so an island lengthens no ground ray's window; a tile culls the slabs whose sweep's
   bounding box misses it. The traversal's value is unchanged, since the slabs were already tested exactly.
3. **Rung 3** (the vector pass): the island's shadow is the union over its underside tiers of each tier projected in the **`prism`
   form** — its ring swept along the sun vector from its underside's offset `b · c` to its top's `t · c`, then unioned —
   whatever `vector.projected` says for other casters, since an island is a floating solid (J-V5.55); the rim slab sweeps
   from its base to the surface top. So a `root`'s thin lower tiers join into one tapering tail instead of a row of
   beads. Only when §8.4's rung-3 budget fallback fires is the `drop` form used, and then the tiers are subdivided so that
   no tier's sweep `(t − b) · c` exceeds its ring's inradius, which keeps successive drops overlapping.
4. **The cursor sun under an island.** The cursor sun stands at `H = h₀ · D · s` (§8.4 (d)); at close zooms that can fall
   below an island's top. **Whenever the sky layer is visible and the document holds an island that is not fallen**, `H`
   is `max(h₀ · D · s, 1.5 × the list's surfaceTopCm above the view's ground)` — whatever is in view — so no sun ever
   stands below a floating island and panning never changes `H`: it moves with the zoom alone, as it already does
   (J-V5.14); the path and fixed suns are unchanged.
5. **The picture and the model agree.** The light pass's shadow (from the rough tiers, at any sun) and the model's strip
   (from the smooth tiers, at the sampler's fixed suns, V5 §3.19) read one solid: under the path sun set to the equinox at
   a sample's hour, the style's `sun.latitudeDeg` set to the site latitude, the rung-3 shadow of the smooth tiers on flat ground covers exactly the cells the strip marks for that
   sample, within one field cell at the boundary (T-V5-20) — so the shade map and the drawn shadow never disagree about
   where an island's shade falls.

### 5.4 Labels

The island's `quarter` label draws at the city band along its long axis (§9.3's area rule on its land face), its
districts' labels from the district band, an institution's `landmark` label, a landfall's `place` label; accesses carry
no label, and neither does a strip (the shade map view's legend names the islands). Candidates of sky entities are held in the island's local frame and translated by S14 (BCR-V5-13). §9.2's
candidate set: sky rows only while the sky layer is visible; under `opaque`, a ground row whose anchor lies inside a
visible island's drawn land face is no candidate; under `ghost` both are candidates, the sky rows at 1.5 × their
priority; under `offset`, sky candidates at their displaced positions at the stop.

### 5.5 Exports (§11.1's rows extended, BCR-V5-13)

| format | the sky |
|---|---|
| `.plat`, JSON schema | island records with local geometry and `anchor` (a `removed` record with its `removed` field and no arena geometry, the arena in the archive); `SkyAccess` records; `removedAccesses`; every field's tier |
| compact twin | world coordinates (anchor added), `layer` and `elevationCm` per sky entity |
| GeoJSON | FeatureCollection `sky`: one feature per island — its projected land face, with address, name, reason, state, `areaHa`, `altitudeM`, `elevationM`, supply, `placement.over`, the underside's kind and depth — then its entities in world coordinates with `elevationM`, its accesses as LineStrings (top → foot) with kind, role and run, and its strip as three MultiPolygon features (`kind: 'shadeStrip'`, `samplesAtLeast` 1, 3 or 5 of 9, `basisCurrent`); the island's own retaining walls as file f item 447's `retaining` LineStrings, in world coordinates, plus `elevationM` (V5 §3.22 (4); seam SL-33); a removed island is not exported; a landfall in the `ground` collection |
| SVG | `<g id="layer.sky">`, one `<g id="sky<part>">` per island; the shadow group; the underside and tether in `offset` exports; in an export of the shade map view, `<g id="sky<part>.shade">` with the strip's solid outline and any dashed pending outline (volume 9's veil in its own group) |
| PNG / tiles | the sky layer's own transparent PNG (§11.1's per-layer PNGs); lit by V5 §5.3 at the export's sun |
| VTT | one scene per island in its local frame, its elevation recorded; the rim a wall that blocks movement and not sight; each landing yard a note linked to its ground landing's note in the ground scene |
| glTF | per island a node at (`anchor`, `elevation`): its terrain draped over the land face, the rim wall down by the rim thickness, the underside lofted between the underside tier rings (each resampled to `export.gltfRingPoints` (64) points by arc length from its point nearest the island's bearing; a `flat` island's rim slab closed by its base), its retaining walls as walls on its terrain, its buildings and trees, the river sloped, the fall as a mist quad `export.mistM` (30 m) tall; hoist ropes and rope lines as thin cylinders, a stair's steps as boxes laid along its helix (V5 §2.2) with a slab at each landing, a light bridge as a translucent ribbon; `extras` with address, reason and state |
| CityJSON | the island as PLAT's extension object `+FloatingIsland` (its top TIN and its underside solid, attributes as GeoJSON's), its buildings as `Building`s based at its elevation, accesses as `+SkyAccess` lines — PLAT's extension schema gains both types |
| CSV / statistics | island count, areas, altitudes, carried households by band with each band's share of the island's land, supplies, states, district counts; per island its strip's area blocked for at least one, three and five samples, the mean prosperity inside its three-sample area and in the same district's cells outside it (item 102 (g)'s quantity), whether its basis is current, the trades left on the ground by `carry` with their reasons, the split shops carried, the coverage instances taken per island district, the S3 reservation handed over and its taker, the crypt's form, the count of cross-arena pulls and links by landing; the node term when it acts; per active chain (custom or `activeChains[]`) that crosses an island, its island nodes, the landing its links cross and their route lengths; per landfall, the covered walls, towers, bridges, reservations and ways, and the covered raised spans, raised-way piers and retaining walls with their new states, and the deck plots tombstoned with their decks; per island and epoch, each clearance raise (`reclearIsland`) with the caster that caused it; the removed islands and access ordinals |
| skeleton file | declared islands (T5 with `sky`) and placed accesses (T4) as declarations |

Knowledge: a `secret` access is withheld from every key that does not admit it (§9.2's filter, §11.1's *Knowledge*). The
strip is thematic: the PNG and tile layers, VTT, glTF and CityJSON carry the island's physical shadow through the light
pass and its solid, never the strip (J-V5.35).

## 6 Performance budgets

All PLAUSIBLE until M6-sky measures them (V5 §8), on §12.1's reference machine; the sky is off on the one-click path, so
§12.3–§12.5's laws are unchanged there.

| work | CITY, three islands | METROPOLIS, three islands | basis |
|---|---|---|---|
| S7b (5): `S_town`, slots, reasons, fills | ≤ 3 ms | ≤ 5 ms | one mean over ≈ 24 000 / 62 000 field cells; ≤ 100 fill batches per slot |
| S7b (5): outlines and placement | ≤ 8 ms | ≤ 20 ms | the 64 m class raster once (≈ 6 000 / 15 600 cells); ≈ 15 600 / 40 000 candidates × ≤ 30 / 60 outline cells |
| S7b (5): the reachability transform (V5 §3.7 (2)) | ≤ 0.5 ms | ≤ 1 ms | one two-pass chamfer transform over the class raster, the raised parts' raised-way piers, dilated deck plans and deck faces rasterised into it once (≤ 40 raised parts at METROPOLIS); one read per rim cell of a candidate |
| SKY, per island | ≤ 7 ms | ≤ 10 ms | one L0 and one L1 batch; terrain ≈ 4 000–16 000 cells and `hydro` ≈ 1 700–6 500 on a 520–1 010 m frame (a disc to a grown spindle, V5 §3.8 (1)); the river; the claim search (≤ 2 000 sites at 10 m, each an O(1) fit and the crypt test); the ground landing claims |
| SKY: the island's gradient field (V5 §3.11) | ≤ 0.5 ms | ≤ 1 ms | ≤ 200 / 400 lattice cells: two ranks, one sort, the band map, ε and the three-box blur |
| the unit run, per island (volume 1's rate) | ≈ 8–12 ms, on the generation worker concurrent with the pool | ≈ 12–18 ms | ≤ 3 districts' worth, ≈ 2–5 % of the town's plots |
| SKY: the ground reference and the altitude, per island | ≤ 1 ms | ≤ 1 ms | ≤ 300 / 800 field cells under the projected solid, each a terrain read and a ceiling from the placed casters and the allocated tower rows |
| field pass 2: the strips onto the ground, per island (and per epoch) | ≤ 4 ms | ≤ 6 ms | ≈ 4 600 cell-sample tier walks at METROPOLIS's largest island (the low samples' long sweeps dominate), each ≤ 7 tiers × ≤ 20 steps of O(1) mask reads, most ending at the first hit, after the corridor's O(1) pre-test per cell (V5 §3.19 (5)); ring masks ≤ 60 000 / 160 000 bits, built once from `shadeBasis`; measured on the flat B-CITY fixtures and on a mountainous METROPOLIS fixture (relief class `mountainous`, island over a valley) |
| SKY's last step: strips onto islands and `shadeSky` | ≤ 1 ms | ≤ 1 ms | ≤ 500 lattice cells per receiving island, only under a higher island |
| the route distance (V5 §3.20) | ≤ + 5 % of the unit run's S10b and of the pooled S10b of the districts holding a landing | same | ≤ 3 accesses × 3 raster reads per pull that crosses arenas |
| SKY-F | ≤ 3 ms | ≤ 4 ms | the clearance check over the projected faces; ≤ 60 lights per island |
| **the model's critical path** | **+ ≤ 55 ms p50, ≤ 68 ms p95** | **+ ≤ 84 ms p50, ≤ 104 ms p95** | the unit runs hidden by the pool while the generation worker's concurrent work (hinterland unit + islands) stays below the pooled time; the ground's work falls by the carried share |
| S14, per island | ≤ 4 ms, ≤ 5 000 marks | ≤ 6 ms | the district rate on its fabric plus rim, shadow, access and slab records (≤ 7 slabs, ≤ 256 vertices each) |
| rendering, a tile an island covers | ≤ + 30 % of that tile's raster and light-pass time | same | the second base and surface layer (V5 §5.3) |
| rendering, the light pass on tiles no island's land covers | ≤ + 5 % against the same map without islands | ≤ + 5 % with three islands | the window without slabs and the per-tile slab cull (BCR-V5-22); measured at P3; **fallback:** cull the slabs per tile by the exact union of their shadow sweeps (not the bounding box), re-measured |
| `setAttr` altitude, occlusion, underside, name | ≤ 5 ms | ≤ 5 ms | the record, a marks delta and a slab delta |
| a move | ≤ 65 ms | ≤ 70 ms | 5 ms plus two post-build placements (§12.6's 30 ms each) |
| a resize, a rim reshape | ≤ 5 ms + §12.6's scoped regeneration of each receiving district and of the district whose institution claim is re-searched where it receives no face (at most k ≤ 3 in all; V01 V1-6's sky row) + §12.6's scoped-regeneration law once over the plots the event re-cuts outside those districts (each re-claimed yard's covered plots by §7.3's local operator; a shrink's or an inward stretch's cleared and re-cut plots, §4.7 S10 (7); J-V5.81) + §12.6's 30 ms per re-claimed landing yard's top placement (`placeAt`, one per access, ≤ `accessCount.max`; a reshape's on the moved stretch's yards only) + §12.6's 30 ms per re-landed foot's placement | same | the buffer bisection (≤ 12 steps), one island L1 batch re-laying the strip and yards, the claim re-search (≤ 2 000 sites at 10 m, SKY's rate) only where the claim no longer fits (seam SLR3-02); the re-cut plots' one scope — a yard's 12 × 14 m (V5 §2.4's `landing` row) touches ≤ 3 plots, a shrink's the plots its eroded band and re-laid strip line cross (V01 V1-6's sky row leaves them to this row); each re-claimed yard's `sky_landing_top` use opened at its re-seated top by a positive placement (§7.7's `placeAt`; V5 §4.2; seam TW-04); volume 1's `plantRimWalk` once (two `Greenery` records; seam SLR4-03) |
| New random on an island | ≤ 40 ms | ≤ 55 ms | SKY plus its unit run |
| `placeSkyAccess`, an access `delete` | ≤ 35 ms | ≤ 40 ms | an island L1 batch, a local re-derive and one placement |
| declaring an island after generation | ≤ 120 ms | ≤ 160 ms | the fill with its relocations, SKY, the unit run |
| `fallIsland` | ≤ 80 ms | ≤ 110 ms | relocations, demolitions, the archive |
| `IslandEpochStep`, per island | ≤ 2 ms plus its conversions at the rows above | same | the epoch's strips are the field pass 2 row |
| `sky.clearance`, per island and epoch (V5 §3.15 (7)) | ≤ 1 ms | ≤ 1 ms | the epoch scope's elements under the projected solid (≤ 300 / 800 field cells), each a footprint test and a top read; no geometry written |
| `skyAccessObstacles` and its callers' tests | ≤ 0.05 ms per call | same | ≤ 9 entries; the raised-way solver tests each candidate span against them in O(entries), inside its own budget (the base's) |
| the shade map view's pending strip after an island edit | ≤ the field pass 2 row, computed only while that view is shown | same | never on the edit's own path |
| Update shade now | ≤ the field pass 2 row for one island + the field's recomputation over the two windows (≤ 2 ms) + §12.6's rate for the blocks it re-derives | same | a scoped evaluation, never a whole pass |
| memory | ≤ 5.2 MB for three islands (the strips ≤ 30 KB each, `shadeBasis` ≤ 2.5 KB each) | ≤ 9.3 MB (≤ 60 KB each; bases ≤ 2.5 KB each) | an island's arena ≈ 0.5 MB per district's worth; its rasters ≤ 0.1 MB; the sky surface layers only on covered tile positions, inside §8.8's canvas budget B |
| document | ≤ §2.9's 320 B per island building, plus ≤ 2 KB per island record and ≤ 2.5 KB for its `shadeBasis` (the rim copy ≤ 256 vertices × 8 B, the rest ≤ 0.5 KB) | same | |

The strip rows assume the default sampler (one point per cell); at four points per cell (BCR-V5-15 (ii)'s fallback) they
scale by four — ≤ 16 ms at CITY and ≤ 24 ms at METROPOLIS per island — and the memory row's strips by two and a half (two
bytes per cell become five). The chain rule of V5 §3.20 (9) and the node term add no measurable work: the one
is a filter on the sky fill and the route reads already costed, the other one addend per evaluation.
**Pre-decided fallbacks:** the strip row missed → `shade.stepM` 8 → 16 m and `shade.ringMaskM` 4 → 8 m, re-measured
(T-V5-20's one-cell agreement re-checked), then the samples' reach cap for the strips 8 → 4, recorded as a declared shift
of the term; the model rows missed at M6-sky → the placement lattice coarsens 40 → 80 m and the island units
join the pool as units (pool size ≥ 1), re-measured; the rendering row missed → the sky surface layer at half resolution
(rung 2's method), then rung 3 for the sky base only, reported in the view telemetry; any other row missed is re-declared
at its measured value for the owner's veto (D-18).

## 7 Tests and acceptance bars

§13's families; each bar's class — **C** conformance, **P** parity, **O** outcome — in brackets.

* **T-V5-1 — the gate** [C]. TOWN and every village rung never carry a sky allocation; a CITY with the setting off
  carries none and its ground digest equals the realism golden (T13-1); the `MFCG` and `FTG` presets carry none; a
  dossier-bound CITY whose `site.magic` resolves `none` refuses the setting (F-EDIT `dossier-owned`).
* **T-V5-2 — the count** [C]. 500 CITY seeds at the target at `wealthLevel` 0.5 and 1: every count 0–3 within ± 3 s.e. of
  the slot law at each seed's own `h_town`; slots never skip; `islands.count` 0–3 give exactly that many open slots on
  200 seeds each (their supply permitting, each empty slot reported).
* **T-V5-3 — the supply** [C, O]. V5 §3.3's calibration bars at P0; `A` monotone non-decreasing in `h_town` and `h_carried`
  over the rows (T10-1); `S_carried` equals the mean of the carried households' band values to 10⁻⁹.
* **T-V5-4 — the fill** [C]. On 500 CITY seeds with islands: ground plus sky households equal the roster's total exactly;
  carried households by band never include a band poorer than a band left uncarried; the stop cause is one of V5 §3.5's
  three; the fill converges within 100 batches; a slot below `minAreaHa` closes and its rows return; an institution slot
  carries exactly one instance of one of its tags and its staff, never a COUNT, GUILD or QUARTER record or member; no S3
  reservation is left without an owner by an institution slot (100 %: the hand-over instance or `park`, F-SKY-HANDOVER
  counted); no household a dossier district-defining record's raised share holds is carried (100 %).
* **T-V5-5 — placement** [C, O]. 1 000 islands on B-CITY: no island without an assignment or declaration has more than
  10 % of its outline cells over `core`; 0 islands within `gapM` of another; 100 % inside the frame inset; ≥ 80 % of
  prisons ≥ 1 000 m from the plaza and ≥ 80 % of palaces within 1 000 m of it; every F-SKY-PLACE rung counted in the
  report; 100 % of islands placed by rule have a rim cell on admissible ground or within an admitted slanted row's run of
  it, including on the lake, estuary and sea fixtures.
* **T-V5-6 — outline and arena** [C]. 10 000 sky outlines per template: simple (§13.2's outline property), area within
  1 % of `A`; each arena's rim is one closed chain carrying `rim`; exactly one void and one land face at L0 before water;
  every SKY commit record writes only its island's key and the ground's landing claims; for every template at every
  aspect its row admits, 100 % of outlines grown by the buffer resize to 1.5 × `areaHaMax` lie inside their frame.
* **T-V5-7 — terrain and the conjured river** [C]. On 500 islands with a river: its mean bearing within ± 15° of the ground
  river's; 0 non-monotonic beds; every river ends at the rim with `fall`; its width inside its clamp; F-SKY-TERRAIN's rungs
  counted.
* **T-V5-8 — access** [C]. Every island placed by rule has ≥ 1 access (0 % `unreachable`); a declared island has ≥ 1 or
  is reported `unreachable`; every hoist and stair foot lies on land in an admissible face; every ground landing plot
  fronts a way or has its trail; rope lines ≤ 350 m and bridges of light ≤ 600 m of horizontal run; every stair's helix
  ends at its top with a landing every 20 m of rise; no stair or bridge of light where `magic` is `none`; `guarded` only
  on a prison; after SKY-F every island landing attach is met by an island way, and 100 % of ground landing attaches are
  met by a walkable part-0 way after S8 (the destinations of V5 §3.10 (4)); the ground landing of a `secret` access is
  fronted and withheld from every key that does not admit it (100 %). **With item 110** (C5-48, C5-49; on 500 CITY and
  METROPOLIS seeds with islands and item 110's rows on, and on hand-built fixtures): 0 raised decks or raised-way piers
  inside any access column or any landing yard dilated by `deckGapM` (100 %, whether the raised part came before SKY or
  after it — an epoch's raised-way pass, a T4 stroke); every rope line and bridge of light ≥ `lineClearM` over every
  raised deck and raised-way pier it crosses; 0 feet and 0 landing yards on a deck face; 0 landing attaches met only by a
  raised deck or an aqueduct; a T4 `raised` stroke ending on a rim leaves 0 ways on the sky arena and places 1 access of
  an admitted kind (the bend, J-VI.4 (d)), an aqueduct stroke to a rim and a `raised` or aqueduct stroke on an island's
  key are bent (J-VI.4 (d)–(f)), each with its line, and a `raised` stroke across an access's column is re-routed or,
  where `skyAccessObstacles` offers no re-route, ends at the last ground vertex before it with "this would cut
  <island>'s hoist; it ends here" (J-VI.4 (f); seam SLR2-11).
* **T-V5-9 — the unit run's contract** [C]. The rim strip is never cut or plotted; `SeamReport.portalsTotal` = 0; the
  island's district count equals V01 §3.10.3 (2)'s count for its allocation read with `districtHa`; an island with
  `h_carried` = `h_town` = 1 has 3 districts at METROPOLIS and at least 2 at CITY on ≥ 90 % of seeds; every island
  district's kind is a `sky-*` kind of V5 §2.4 and every fabric hint a valid `FabricStrategyId`; on 500 seeds, 0 households
  re-homed from an island by S10a's band-range step, and each carried band's share of the island's plot land within ± 5 %
  of its carried share; its housed households equal its allocation's, or F-SKY-UNIT's overflow is reported; the runner
  lays no second terrain on the island and its field step reads the hand-over's values (V5 §3.12's reconciliation).
* **T-V5-10 — underside and altitude** [C, O]. The apex clears the tallest caster beneath by ≥ `clearanceM` on 100 % of
  islands after SKY-F; the altitude fixed at SKY stands (no F-SKY-CLEAR raise) on ≥ 99 % of 1 000 islands at CITY and
  METROPOLIS (V5 §3.9 (5)'s measurement), measured with item 110's terrace, raised-way and deck-plot rows on at their
  defaults (C5-47), and the 100 % clause holds after every epoch of a century run (`sky.clearance`, V5 §3.15 (7)); each
  underside tier's ring lies inside the one above it translated by the apex step, with decreasing area; each
  profile's measured radius ratio (the tier rings' equivalent radii ÷ R) within 0.05 of ρ(z_i) at every tier.
* **T-V5-11 — lights and names** [C]. Rim orbs at 40 m ± 1 m; the keel light's intensity 4 000 × `h_carried`; a settled
  island's magical lights 0; every island named; its `quarter` label drawn at the city band at the reference view on
  100 % of visible islands.
* **T-V5-12 — labels and occlusion** [C]. Under `opaque`, 0 ground labels drawn inside a visible island's land face; under
  `ghost`, a sky label wins a collision against a ground label of equal priority; under `offset`, sky labels drawn at
  their displaced positions; with the sky layer hidden, 0 sky labels and no model digest changed (T15-1); every shipped
  sheet loads at every band with every sky semantic resolved (BCR-V5-18), and the `fallen` row draws over the landfall's
  members.
* **T-V5-13 — the underside's shadow under the fixed, path and cursor suns** (the owner's J98) [C, O]. A hand-built
  island (8 ha, `root` profile, 100 m altitude) above the golden TOWN, `ghost` occlusion (and (a)–(c) again under
  `opaque`), the view at the 1:500 stop, CPU reference and GPU pass: (a) under the fixed sun set to 15°, 30° and 60° and
  the path sun at three hours, the shadow's boundary on open ground within max(1 px, §8.4 (c)'s floor-cell diagonal) of
  the analytic union of the tiers' projections; (b) the shadow's area strictly increasing as the sun lowers; (c) the same
  island with a `flat` profile: at 15° the `root`'s shadow reaches past the `flat`'s by `depth · cot 15°` within 1 px
  toward the sun (toward the footprint); (d) the cursor sun at nine pointer positions at the 1:500 and 1:2 000 stops: the
  shadow falls away from the pointer, `H` ≥ 1.5 × the list's top, the GPU within §13.4's tolerance, and at a fixed zoom
  panning the island into and out of view changes `H` by 0; (e) at 15° a ground point under the island's centroid but
  outside the root's projection is lit (V > 0); (f) the penumbra's width at 200 m altitude exceeds that at 100 m; (g) the
  `flat` island with a 30 m rim against a 10 m rim: at 15° its shadow reaches 20 m · cot 15° farther toward the sun
  within 1 px (the owner's "thickness"); (h) at 15° the `root`'s rung-3 shadow is one connected region (the prism form);
  §13.4's base island-shadow golden stands.
* **T-V5-14 — over time** [C]. T8-6 stands (a CITY dropping below 10 000 loses its islands through waning, settled and
  fallen over their dwells); on the hook fixture a settled island refloats before any island is raised; a resize keeps
  every plot address away from the rim (100 %); after a growing and a shrinking resize and a rim reshape on the hook
  fixture's institution island, the rim strip lies `rimStripM` inside the new rim everywhere and every landing yard meets
  its top on it (100 %), the rim walk stands on the re-laid strip — one `esplanade` and one `street_trees` `Greenery` on
  the re-laid strip after each (seam SLR4-03) — 0 ways cross the strip, a growing resize re-derives exactly the districts
  that receive band faces and the district whose institution claim is re-searched, a shrink and a reshape's inward
  stretch no district but that claim's district where the claim is re-searched (every other island district
  byte-identical, the district count unchanged), after a re-search
  the institution stands on its new claim in one building with the old one demolished, and a shrink requested below the
  institution floor is bent to it with the claim keeping a site in its own district (seams SLR3-02, SLR4-03; J-V5.77); a
  landfall adds and removes no ground edge, demolishes exactly the covered
  set's buildings, keeps every locked entity, credits the ledger with the covered area × 3 m³, relocates every dossier
  use before its building goes; on a fixture whose footprint covers a wall stretch, a `main` gate, a tower, a bridge deck,
  a market reservation and a way: the stretch `breached` over its covered length in the enceinte's `condition` (a knot
  at each end of the covered length, item 575; a run already `dismantled` kept) and, the ring in use, back to `standing`
  at the next `fortification` phase (V6 §3.7.5; T-V6-11; seam TT-09), the tower and the `main` gate inside the `breached` run — drawn by their run and standing
  again with it, no state written to any `Tower` or `Gate` (seams TU-03, TV-04) — the bridge `ruined`, the
  reservation vacant under the rubble, the way `rubble` and routed as `track` with its class before the fall in
  `Way.formerClass` — a covered lane volume 6 had downgraded keeping its earlier `formerClass`, 0 covered ways without
  one — until an epoch's clearance restores that class and clears it (V6 §3.5.2; T-V6-66 on the same fixture), the
  fall's undo restoring each way's class and prior `formerClass` (seam TR-04), the landfall's
  quarry carrying its `source` and read by no underground quarry rule, a locked wall kept — each listed as a fate; a
  dossier absorb removing an island's palace leaves the island at once without it, and at the next epoch the island takes
  the next palace instance where one exists, else becomes a prosperity island where the rich band admits it, else wanes
  (the three cases on fixtures); each conversion's undo restores the model byte for byte. **With item 110** (C5-53): the
  landfall fixture also covers an aqueduct span, a viaduct's raised-way pier and the span it carries (itself less than
  half covered), a generated retaining wall and a bridge carrying deck plots — the covered span, the pier and the span on
  it `ruined`, the viaduct's crossing closed and the ways beneath it touched only where covered, the aqueduct's terminal
  listed as run dry and its lost supply read at that epoch's `raisedWays` step when the fall is an epoch's (the next
  epoch's for a hand `convert`), the retaining wall `decayed` over its covered length and still `decayed` after a
  re-derivation until an epoch's restoration re-derives it (V06 §3.19.4 (6)), the deck plots' households relocated before
  their buildings are demolished and the plots tombstoned with the deck — 0 vacant plots left on a ruined deck, and a
  later repair of the deck re-offering its faces to new lineages — the covered spans, piers and walls in the decoration's
  `members` — each span as `{ raised, span: [a, b] }` and each pier as `{ raised, support }` on item 244's keys, the
  same members after a re-derivation of the viaduct, each leaving in the batch of the op that ends its cover (V6 §3.5.2;
  seam TT-03) — (the deck plots listed as fates, never members), all of it in V5 §5.5's per-landfall CSV, and 0 edges of the
  ground's streets and plots added or removed beyond the tombstoned deck plots' lines.
* **T-V5-15 — goldens and determinism** [C]. Two sky fixtures join §13.3's goldens — a CITY with a prosperity island and
  a conjured river; a METROPOLIS with a palace island and a prison island — identical on the five engines; every stream
  key distinct (§6.1's sky fixture); an island raised after a fall takes a new part; a document with an island declared,
  moved, resized, given an access and brought down replays to the session's digest. **Item 110's pin and shift**
  (C5-56; J-V5.67): with item 110's terrace, raised-way and deck-plot rows off, both sky goldens are byte-identical to
  their pre-item-110 digests (the no-op pin); switching the rows on at their defaults changes both once, recorded as one
  declared shift naming the two fixtures (raised ways and retaining walls beneath and on the islands; `groundRefCm` and the
  altitudes where a raised part stands under a solid); the METROPOLIS fixture pins one raised way under an island
  (T-V5-31 (a)).
* **T-V5-16 — editing** [C, O]. Every event of V5 §4.2 undoes exactly; §7.3's oracle checks byte for byte outside V5 §4.3's
  scopes on B-EDIT sequences with island edits (10³ in the PR tier, 10⁴ nightly); a move keeps every address on the
  island; New random on an island keeps the ground's digest; a declaration where `h_town` = 0 carries the `held against
  its supply` fate; a fourth island is bent to join the nearest island (J-VI.4 (a); seam SLR2-11); the dossier-magic refusal holds.
* **T-V5-17 — exports** [C]. GeoJSON sky coordinates equal `anchor` + local exactly and validate; each island's VTT scene
  imports with no manual steps; the glTF island mesh is a closed manifold and validates; CityJSON with PLAT's extension
  validates.
* **T-V5-18 — budgets** [C]. V5 §6's rows on B-CITY and B-CITY-lite METROPOLIS seeds with three islands, or their fallbacks
  applied and reported; the one-click path unchanged (§12.5).

* **T-V5-19 — the shade strip moves the field, gently** (item 102 (g)'s island clause) [C, O]. A uniform district —
  level ground, one district kind, no driver varying across it — with a hand-built island (8 ha, `root`, underside 100 m
  above its ground) over its southern edge, latitude 50°, `w_sun` at its default: (a) the mean pass-2 prosperity over
  the cells the strip blocks for at least three samples is lower than over the district's unblocked cells by the
  expected difference — `w_sun` × the mean shade share of those cells, passed through the field's smoothing computed on
  the same fixture, never assumed — within ± 10 % of it; (b) no plot's band differs by more than one from the same
  fixture with the strip left out; (c) with `w_sun` = 0 the field and the town are byte-identical to the run without
  the island term, and with no island every strip is empty and the field byte-identical to the base's pass 2 (no-op
  pins); (d) the strip identical on the five engines; (e) an island at the frame's edge reports F-SKY-SHADE's clipped
  share; (f) V5 §6's strip row.
* **T-V5-20 — the model and the picture agree; the underside shapes the strip** (J98) [C]. For each sample, the CPU
  reference's rung-3 shadow of the smooth tiers under the path sun set to the equinox at that sample's hour, on flat
  ground, covers exactly the cells the strip marks for that sample except cells its boundary crosses; a `root` island's
  strip at sample 0 reaches past a `flat` island's of the same outline by its depth × `c` within one cell along +ŝ
  (toward the footprint); a 30 m rim against a 10 m rim lengthens the `flat` island's strip at sample 0 by 20 m × `c`
  within one cell along +ŝ; the basis rim's simplification (≤ 256 vertices) moves no strip bit on the fixtures.
* **T-V5-21 — order, lag and the supply** [C]. (a) `S_town` at S7b and at an epoch equal to 10⁻⁹ between `w_sun` at its
  default and 0 when only the islands' strips differ (item 102 (c)); (b) after a move, an altitude, a resize and New
  random on an island, the ground's field rasters, every plot's derivation record and the shade view's veil
  byte-identical to before — only the pending outline moves — the strip's basis stale and the fate listed; at the next
  epoch (or after Update shade now, over its two windows only) the strip recomputed from the island's new state and the
  field moved; (c) the epoch after a fall carries no bits from that island; (d) a document with an island moved and an
  epoch run replays to the session's field byte for byte; (e) a lower island under a higher one reads `shadeSky` > 0 on
  its cells in the higher one's strip and 0 elsewhere; (f) on a fixture where a house (volume 6's building shade mask,
  after one epoch) and the island shade the same sample point at the same sun, the OR counts it once, at the default
  sampler and at four points per cell alike, and the strip's `bits` equals the mask's; (g) the participant `sky.islands`
  runs once per epoch at `afterField`, after S6's re-evaluation, and a history run with the engine's other participants
  switched off draws the same island values (V5 §3.15); ground plus sky households equal the epoch's target after
  `siting` (100 %), the released households placed first from the displaced pool with cause `island` and the taken ones
  subtracted by `demandTaken`; (h) **the lag survives a save**: move an island, save, reload, then re-derive a block with a
  prosperity brush — the field raster and every derivation record equal those of the same session without the save,
  byte for byte; the same after an F-SKY-CLEAR raise and after a `w_sun` = 0 table (the strips still computed and held);
  and the same on a **terraced fixture** (C5-54): an island over a ward that S10 and S11 level with retaining walls — the
  strips computed at S10a equal those a load rebuilds after the levelling, bit for bit — and after a T2 terrain stroke
  under a strip (the bits re-read over its scope from the unchanged basis equal a load's rebuild); **a raised island**
  (seam ST-49): an island raised at an epoch (after S6) and one declared by T5 between epochs, each saved and reloaded
  before the next evaluation — the load writes no basis, neither casts nor receives a strip, and the field raster and
  every derivation record equal those of the same session without the save, byte for byte; after the next epoch's S6
  (or Update shade now on it) each casts; a document whose `schemaVersion` predates the basis step loads with the basis
  of every unfallen island computed once, and never again; **one strip per evaluation** (seam SL-02): with volume 1's
  S9b registered, the strips S9b's manor sun factor reads and those field pass 2 folds are the same held strips, bit for
  bit, at generation and at a re-derivation from S10a (whose bases are written at S10a's start, before step (i)).
* **T-V5-22 — siting across the island** (item 103) [C, O]. On 300 CITY seeds with islands, in the siting statistics
  suite (item 103 (e)): (a) no class `IslandRule.carry.never` excludes is carried by any island (100 %) — a top-step
  emitter, a heavy processor, a wholesale or storage class, a class with a hard need for running water, a river bank,
  the harbour, a gate or a quay, an active chain's working node — and no NEEDS row is satisfied by island water; (b) a
  class with a district coverage row serves the island's districts at or above the ground's served share of districts,
  its island members spaced by its same-kind row, and with the coverage weight 0 the run is byte-identical to one without
  coverage (no-op pin); (c) island classes with a ground supply edge stand at a mean route distance to their providers below that under
  random placement on the island; (d) the ground's suppliers of island classes stand nearer the landing feet than under
  random placement; (e) a `secret` access carries no pull of a class whose clientele is not clandestine (100 %); (f) the
  crime-aligned classes stand farther from a prison's guarded hoist foot than their baseline; (g) on hand-built fixtures
  every route distance equals the sum of its legs to the centimetre (a foot outside the walls reaching an inner class
  through its gate), `skyRoute` names the access of the least sum, and a `river` or `sea` edge across arenas is ∞;
  mirroring item 105 (k) across the arenas: (h) a multi-output producer with island consumers sits nearer its dominant
  output's landing foot than its random baseline, and island consumers of a shared ground provider bind to it by the
  route; (i) split pairs across the arenas appear for split classes past the threshold, are reported, and never appear
  in the parity presets; (j) the per-arena relaxation settles within its cap, the second pass moving fewer members than
  the first, byte-stable across runs and worker interleavings; (k) with the web's weights, `comfortM` and the spacing at
  0, the result is byte-identical to the run without items 105 and 107 (no-op pin).
* **T-V5-23 — custom institutions on islands** (item 104) [C]. A dossier custom institution of archetype `exotic-tower`
  is a `tower` candidate where the world has magic and not where `magic` is `none`; a `martial-keep` is a palace
  candidate at `landmarkLevel: landmark` and not at `standard`; a revision that changes its archetype keeps it on its
  island unless a hard row of its new profile fails there, and then re-sites it on the ground by least disruption, the
  claim standing vacant until a later epoch re-occupies it with the next instance first; zero placement failures.
* **T-V5-24 — custom chains across the island** (item 104 (h)) [C, O]. On 200 CITY seeds with islands and a fixture set of
  active custom chains — a perishable food chain, a luxury chain whose consumers are rich households, and a chain one of
  whose processors is a custom `exotic-tower` carried as the island's `tower` — in the siting statistics suite: (a) no
  chain's resource or processing node is carried by an island except the island institution, and no chain resource is
  sited on an island's conjured water (100 %); (b) the ground end of every cross-arena link stands nearer to the landing
  foot of its shortest route than under random placement of that node; (c) the flow order by route distance holds in at
  least the share the base's ground-only bar declares for the same chains; (d) a chain with nodes on two arenas is never
  reported as close at street scale across the arenas, and a quarter name, when one arises past item 72's threshold,
  lies on the ground; the same bars hold for a dossier's `activeChains[]` fixture; (e) an import or export store
  of a chain with an island node stands at a ground gate or quay (100 %); (f) a chain toggled off and on returns its
  island nodes to their sites where nothing else changed; (g) a T6 declaration of a processing node onto an island is
  held and lists the "crosses the hoist" fate; zero placement failures.
* **T-V5-25 — the magical node** [C]. On 300 CITY seeds each of a dossier fixture without deposits and the same dossier
  with a `magical_node` `available`: `h_town` rises by exactly `node.bonus` (clamped at 1) wherever the interpolated value
  is above 0 and not at all where it is 0; the count, `A` and `E` move monotonically with it (T10-1's monotonicity); two
  nodes add one bonus; `discovered` adds nothing at generation and the bonus at the next epoch; `depleted` and `removed`
  add nothing, and a node removed at an absorb leaves every island floating until the next epoch's evaluation, when the
  law may start its wane (never a vanishing); a standalone map's `h_town` equals the dossier-free fixture's; with a ruin
  fixture holding the node, the term is unchanged and no island rule reads the underground arena; and on that fixture,
  whose `magical_node` stands at the ruin's centre, the `why` on the town supply names that ruin from the report's
  `ruin.node` line (V04 §3.5.0a (9)) — its new name after a rename of the ruin — while on the fixture with no ruin it
  names the deposit and no ruin (seam SLR1-02).
* **T-V5-26 — the island cathedral's crypt; no catacomb in the sky** (item 109 (k) as revised, J111) [C]. On 200 CITY and
  METROPOLIS seeds with a cathedral island: the cathedral carries the settlement's largest crypt, inside the island's rim
  slab — its floor ≥ `cryptFloorM` above the slab's base at every point of the claim — or, where no site passes, the
  half-sunk form with its fate (100 %); on a `flat` island likewise; 0 underground parts, links or catacomb sources on
  any island (100 %); every catacomb lies under a ground cemetery or a quarry ossuary; no island churchyard is a
  candidate or ranked as the largest cemetery; island churches are counted once in the catacomb count; the S3 precinct
  passes to the largest ground church (or `park`), whose crypt is never ranked above the cathedral's.
* **T-V5-27 — the rim as a barrier** (item 106) [C]. Generation lays 0 enceintes on any sky arena; a wall drawn on an
  island with two landings gives exactly two walled stretches, each across its landing yard with a gate at its attach and
  a tower at each rim anchor, and 0 wall edges elsewhere on the rim; the enclosure test reads the island as sealed; a
  stroke along the rim away from a landing is bent to the landing stretches with "the drop is the wall here" (J-VI.4;
  seam SLR2-11); adding a third access adds a
  third stretch; with item 106's `barrier` closure and profile off, byte-identical to the base (no-op pin). **With item
  110** (C5-50): 0 island `RetainingWall`s classed as an `Enceinte` or a member of a barrier circuit; a T3 `retaining`
  stroke or T2 terrace stroke on an island lays a `RetainingWall` on the island's arena, drawn in its frame and displaced
  with it under `offset`, tombstoned at a fall and exported in `sky`; a retaining stroke on the rim strip or along the rim
  is bent inward past the rim walk with "The rim walk stays level; the wall stands inside it" (J-VI.4 (g)); the unit run's levelling lays 0 retaining walls on the
  rim strip; with item 110's terrace rows off, the island is byte-identical (no-op pin).
* **T-V5-28 — ladders across the arenas** (item 108) [C]. On the surveyed dossiers with islands: no ladder pair is
  counted twice across the arenas; every COUNT, GUILD and QUARTER record's members, counted on both arenas, lie inside
  its range; a cathedral island's subsumed parish churches, resident priest and wayside shrine each count once as its
  members, on the ground or carried, never as additions; an island institution is a singular or SIZE record (100 %).
* **T-V5-29 — a removal holds** (C5-51; J-V5.62) [C]. On 200 CITY and METROPOLIS seeds with at least two islands:
  remove a generated island and a generated access on another island, then run a Regenerate, a Re-derive from S7b, a
  scoped re-roll of the other island, a save and reload, and a century of epochs at `auto`: both stay removed (100 %) —
  the removed slot never drawn, filled or re-opened, its outcome `removed by you` in the report; the higher slots'
  islands identical to a run where the removed island was never there but its slot counted filled; the deleted
  ordinal never re-sited and the island keeping a `main` access (the lowest surviving generated ordinal); 0 households
  allocated to a removed slot and ground plus sky households equal to the roster's total at every step; with
  `islands.count` pinned at 2 and one of the two removed, 1 island after every re-derivation; an `adjust('islands.count')`
  to 3 after the removal releases nothing (seam ST-04) — the held slot stays `removed by you`, only the free slots
  open, and with every slot held the adjust opens none and lists its fate — a T5 declaration takes a held slot only when
  no slot is free, and the removal's undo restores the island byte for byte.
* **T-V5-30 — what the raised-way generator reads of the sky** (C5-52; J-V5.63) [C]. At generation, with the
  recommended slot (V5 §3.1), the generated raised-way set is byte-identical with the islands setting on and off (it is
  decided before S7b (5)); on 500 CITY and METROPOLIS seeds with islands and on the epoch fixtures of volume 6's raised-way
  pass: 0 raised ways with a sky endpoint, sky evidence or a sky water source (100 %); an elevated road bound to a precinct
  whose cathedral an institution slot took up still stands, its reason naming the hand-over; the aqueduct's need at an
  epoch counts 0 island households; 0 aqueduct terminals, basins, cisterns or fountains on an island.
* **T-V5-31 — item 110 under and on the island** (C5-47, C5-55) [C, O]. (a) The METROPOLIS sky golden pins one raised
  way under an island: the caster ceiling at SKY reads its deck top with its parapet and its raised-way piers, and the
  apex clears it by ≥ `clearanceM`. (b) On the epoch fixture where volume 6's raised-way pass builds an aqueduct under a
  floating island and a new stage raises a stepped temple beneath another: after the epoch, `sky.clearance` has raised
  each island's `groundRefCm` to the caster (its `elevationCm` kept unless the floor failed, a listed fate "raised clear
  of the aqueduct"), `shadeBasis` untouched, and a replay of the epoch gives the same values. (c) A stepped island temple
  (volume 2's `stepped-temple` row): the surface top reads the highest massing tier at each point, and the crypt lies
  under massing tier 0 inside underside tier 0 with its floor ≥ `cryptFloorM` above the slab's base, re-tested at the
  levelled datum. (d) A raised way removed beneath an island leaves its `elevationCm` unchanged. (e) An `own` island's
  `terrainEcho.reliefClass` is the class its `island.place` draw (index `relief`) gives, 100 % over 500 seeds; New random
  re-draws it with the terrain; an `own` record loaded without it gets the same class, written and reported; an `echo` or
  `none` island carries none; and volume 1's `terraceState` on the island's districts reads that class, `plain` for
  `echo` and `none` (T-V1-21; seam SLR3-03).
* **T-V5-32 — the stage order and SKY's data keys** (seam SL-01; J-V5.70) [C]. With `@plat/hood` and `@plat/sky` both
  registered, the `StageDecl`s sort at load with no cycle, SKY after S7b (its S7c hook included) and before S8, S10a
  and S12a; S7c's declared read-set holds neither `reservations.landing` nor `allocations.landing` (volume 1's read-set
  test, T-V1-35, holding S7c to it); S7b (1)'s supply term reads each sky pseudo-district at its island's `anchor` + the
  outline's centroid (100 %; seam SLR2-03); on 500 CITY seeds with islands SKY's ground commit records write no data key but
  those two, and after S10a every host district's `modest` residential households plus its landing rows' staff equal
  the `modest` households S7b allocated it (100 %); with the islands setting off neither key carries a row and the ground digest equals the realism
  golden (T13-1).

**Parity.** No reference has islands (II.6 (8)), so no parity number binds them. The nearest look is Neighbourhood's
lone patch — its own ground tone and a drop shadow marking its extent on an empty field (`research/findings/vg-ng-devlogs.md`
§B3.5) — so at M6-sky five island close-ups in `hatched` are shown beside five Neighbourhood patches under §13.6's
protocol as a descriptive pair set, rated for "reads as a floating patch": information for the owner, never a gate.

## 8 Build plan

**Milestone M6-sky** — after M5 (it needs volume 1's unit run) and on M4's hooks (S7b (5), the island conversion kinds);
the owner's order puts the layers after the city is mastered (V5 §11 asks where among them).

| phase | content | exit (executed) | pw |
|---|---|---|---|
| P0 — spikes | the supply calibration run (V5 §3.3); placement over 1 000 islands with the reachability filter; the hand-over to volume 1's unit runner on a hand-built arena (with `districtHa` and the gradient: the band shares and the re-homed count); the caster allowance measurement (V5 §3.9 (5)) with item 110's rows on; the strip against the rung-3 shadow on one fixture; the save-and-reload of a lagging strip | the ⟨P0⟩ rows set or the fallbacks applied; T-V5-5's rates; the runner's contract passes T-V5-9 on the fixture; T-V5-10's ≥ 99 % clause; T-V5-20 on the fixture; T-V5-21 (h) on the fixture | 1.5–2 |
| P1 — the model | the records and BCR-V5-1 to BCR-V5-6, BCR-V5-19, BCR-V5-21, BCR-V5-24, BCR-V5-26; `nextSkyPart`; `shadeBasis` and its load path; S7b (5)'s gate, slots, reasons (the archetype match and the ladder filter included), fills with `carry`, the held shares and the node term, the hand-over of S3 reservations, outline, reachability and placement; the arena with its outline-sized frame, the terrain echo, the river; the underside, the ground reference and the altitude at SKY (item 110's raised parts, retaining walls and levelled platforms among the casters, V5 §3.22 (1)); the claim search with the crypt test; the gradient field; the strips from the bases on the unlevelled receivers (BCR-V5-30), their fold into field pass 2 and the island-free value (BCR-V5-15); the sky receivers; F-SKY-FILL, -PLACE, -TERRAIN, -SHADE, -CRYPT, -HANDOVER; SKY's own ground data keys (BCR-V5-3, BCR-V5-6), the strips held from their first read and the bases at S10a's start (BCR-V5-15), the optional basis and its schema-chain step (BCR-V5-21) | T-V5-1 to T-V5-7, T-V5-10, T-V5-19, T-V5-21 (a), (e), (f), (h), T-V5-25, T-V5-26, T-V5-32; `plat calibrate register --check` green over the cells it lands (`islands.json` whole, registry row 56, BCR-V5-4) — their entries from V12 §3.11's default line (`plat calibrate register --defaults`) unless this volume's own line in V2 §3.10.10's form names the column (none does: *The register at the exits* below) | 3.75–4.75 |
| P2 — access, hand-over and siting | access tops, feet and landing claims (ground and hinterland) with the S8 destinations (BCR-V5-20), the rim strip and its trees, the island's context vector, the `sky` request and `skyHandover` with `districtHa`, the kinds and the fabric prior, SKY-F with the clearance check and both repairs, the sky lights, names; the route distance in both S10b runs and the island's coverage units (BCR-V5-16); the supply web, splits, per-arena order and relaxation, the district term, `comfortM` and spacing across the arenas (V5 §3.20 (10)–(12)); chains across the island, custom and `activeChains[]` (V5 §3.20 (9)); the rim as a barrier (V5 §3.21); item 110 against the accesses — admissible ground without decks and raised-way piers, `lineClearM`, `skyAccessObstacles` for the raised-way solver and T4, the island's retaining walls in the unit run's contract, the generator's reads of the sky (V5 §3.22 (3)–(5); BCR-V5-27, BCR-V5-29) | T-V5-8, T-V5-9, T-V5-11, T-V5-22, T-V5-23, T-V5-24, T-V5-27, T-V5-28, T-V5-30 (with T-V5-8's and T-V5-27's item-110 clauses); `plat calibrate register --check` green over the cells it lands (the sky rows of `lights.json`, registry row 51, with the `keel` row's new `radiusMarginM` cell, BCR-V5-8) — their entries from V12 §3.11's default line (`plat calibrate register --defaults`) unless this volume's own line in V2 §3.10.10's form names the column (none does) | 4–5.25 |
| P3 — the picture | the marks with their slots and sheet rows (BCR-V5-18), the three occlusion modes with the underside and tether, the sky surface layer in the tile worker and the light pass (CPU reference and GPU) with the window without slabs (BCR-V5-22), rung 3's prism tiers, the cursor sun's floor, labels; the strip's outlines in volume 9's shade map view | T-V5-12, T-V5-13, T-V5-20 | 3–4.25 |
| P4 — editing | V5 §4.2's events and parameters (the island brushes, the access `setAttr` semantics, the pointer mapping in `offset`, an island wall), dry runs with the shade fate, Update shade now, locality, undo, DR-SKY and its coherence with the dossier-removal path, the clerk's `WhyProvider` with the strip, route, link and siting answers; `convert removeIsland` and the removed ordinals with their holds, T4's bend at a rim and the retaining bend at the rim (J-VI.4 (d), (g)) | T-V5-16, T-V5-29 | 2.25–3 |
| P5 — exports | GeoJSON (the strip features included), SVG, PNG, VTT, glTF, CityJSON's extension types, the statistics rows | T-V5-17 | 1–1.5 |
| P6 — time | `IslandEpochStep` with the household channels (BCR-V5-23) and the re-reasoning of an island whose institution left, the bases and strips re-read at each epoch and the lag, the landfall over every covered kind (item 110's raised spans, raised-way piers, retaining walls and deck plots included), the participant `sky.clearance` with `reclearIsland` (BCR-V5-28) and the ledger by hand and on the M4 grow path; the engine-driven schedule joins volume 6's milestone | T-V5-14, T-V5-15, T-V5-18, T-V5-21 (b)–(d), (g), T-V5-31 | 1.75–2.5 |
| **total** | | | **17.25–23.25** |

**Dependencies:** P0 needs M4's hooks and the unit runner's first cut from volume 1 (M5); P1 needs item 102's daylight
term with its per-sample mask and model samples (the coherence pass's application, BCR-V5-15) and item 103's profile
columns for the noxious exclusion (with a fixture profile set until volume 11's rows land); P1 → P2 → P3; P2's route
distance needs BCR-V5-16 and its archetype match item 104's profile resolution (fixtures until then); P2's chain rules
need item 104 (b)'s active chains through the port (volume 8) and volume 1's working-quarter reading (fixture chains and a
stub reading until then); P1's node term needs volume 8's deposits row (a fixture digest until then); P6's registration
needs volume 6's `EpochParticipant` (a direct call from the M4 grow path until then); P6's household channels need volume 6's `demandTaken` row and the displaced pool's cause `island` (BCR-V5-23; §4.7's overflow pass inside the conversion until then); P1's crypt test needs volume 2's basement ladder and volume 11's crypt column (the full form and a fixture column until then); P2's web, splits and spread need the coherence pass's application of items 105 and 107 and volume 11's goods, balance and `split` rows (fixture rows until then), and the rim barrier item 106's `barrier` closure and volume 11's `sheer` row; item 110's parts need the coherence pass's application of item 110 (raised parts in ground parts ≥ 1 with raised-way piers, `RetainingWall`, levelling kept as platform datums, deck plots; BCR-V5-27, BCR-V5-29, BCR-V5-30), volume 2's stack envelope (V02 §3.15.2) and volume 11's raised-way height and terrace rows (fixture rows until then), and P6's `sky.clearance` needs volume 6's `afterGrowth` participant table and `EpochScope` (BCR-V5-28; a direct call after the M4 grow path's growth until then); P4 and P5 after P2; P6 after P4. **Risks, in order:** the two-surface light pass's frame cost (P3; fallback: half resolution, then rung 3 for
the sky base); the field's power to tell rich towns from poor (P0; fallback: the `wealthLevel` blend); the unit-run
contract across volumes (P0; its requirements tested as a contract, V5 §3.12's seven reconciliations carried to volume 1's
revision); the strip's cost at METROPOLIS under the low samples (P1; fallback: V5 §6's coarser step and mask, then the
reach cap); the route distance's share of the pooled S10b (P2; fallback: island classes stand at the land centroid for
every ground-side read, post-build included); placement on awkward sites (P0; F-SKY-PLACE's ladder); watertight lofting
of rough tiers in glTF (P5; fallback: roughness 0 in the mesh only); the gradient's band shares under the smoothing (P0;
fallback: `field.bandInset` 0.1 → 0.2, then the smoothing's width halved on the island, re-measured); the light pass on
uncovered tiles (P3; fallback: the exact per-tile slab cull, V5 §6); item 110's arches and decks under islands against
`casterAllowanceM` (P0; fallback: V5 §3.9 (5)'s measured 99.9th percentile with item 110's rows on). **In §16:** a row M6-sky after M5 at 17.25–23.25 pw,
outside the base total, priced as a staged subject (BCR-V5-14).

**The register at the exits** (reconciliation round 3's continuation, SCC-R2C-15; X-V12-16; J-V5.80). Every phase that
lands a registry table, or a calibratable column or cell of one, exits with `plat calibrate register --check` (T-V12-20)
green over the cells it lands. Two phases do: P1 lands `islands.json` whole (registry row 56; BCR-V5-4 — V5 §2.4's
default rows, `accessSiting.deckGapM` and `lineClearM` among them, although their readers are built at P2 and P6), and
P2 lands the sky rows of `lights.json` (row 51; V5 §3.13) with the `keel` row's new `radiusMarginM` cell (BCR-V5-8). The
landing seat writes the entries in the same change with `plat calibrate register --defaults` — V12 §3.11's default line,
`corpus` at M-CAL — for every calibratable column of those cells that has no entry yet; a light-table column the base
landed already holds one and takes none, since the command never touches an existing entry. This volume writes no register
line of its own. The three ⟨P0⟩ cells (`townSupply`, `carriedSupply`, `casterAllowanceM`) are set by P0's spikes, which
run on a spike branch with a draft `islands.json`, land no cell, and apply their fallbacks (V5 §3.3, V5 §3.9 (5)) before
P1 lands the table. So each lands as an `own` value whose provenance note names the run that set it ("set by M6-sky's
P0 run, V5 §3.3", or "…, V5 §3.9 (5)" for the caster allowance; never a `fixed:` note), and T-V5-3 and T-V5-10 then
hold it as ordinary bars at the phase exits, where a failure fails the exit. No frame holds an island, so the corpus stage
closes each default-line column of `islands.json` `fixed` with "no admissible frame" (V12 §3.11). Where M6-sky lands
after M-CAL's `ReconciliationRecord` is committed (J-V12.21 lets the staged layers join by later runs of the same
process), its default-line entries fall due at `M-CAL/sky` (V12 §3.11's *The due's corpus run*; J-V12.75; §13 item 29,
met; seam SCC-94). P3's sheet rows are slots and
semantics, whose values are volume 11's palette rows (BCR-V5-18); P0, P4, P5 and P6 land no calibratable cell, since their
constants are P1's rows.

## 9 Decisions (each vetoable)

| id | decision |
|---|---|
| J-V5.1 | Chose to lay each island in its own local frame and stand it over the ground by one integer translation (`anchor`), over laying it in world coordinates, because a move then changes one attribute instead of warping every vertex, keeps every logged position on the island valid, and keeps every lattice point a lattice point; no rotation, since a turned island would leave the lattice (a turn is a reshape). |
| J-V5.2 | Chose sky part numbers from a never-reused document counter (`nextSkyPart`), the count-law slot a separate field, over the base's "sky parts 1–3", because an island raised after a fall would otherwise reuse a part whose addresses stand as tombstones, against §6.3's never-reused rule. |
| J-V5.3 | Chose to read both supplies on the field's absolute value with value-keyed rows, over the base's town cut, because the cuts are per-town quantiles: a town mean against its own quantile measures the distribution's shape, never the town's wealth, and a mean never reaches the field's top (RV-pc-3); the rows are calibrated at P0 with a pre-decided fallback. |
| J-V5.4 | Chose to give each slot its purpose by one weighted draw among a prosperity island and the eligible institution rows, the institution taken from the roster's own demand, over adding an institution the roster did not ask for, because the roster decides demand (§4.2 S2) and the population stays whole. |
| J-V5.5 | Chose to settle each island's outline and placement inside S7b (5), before S7b (1) allocates the ground, over placing islands after S7b, because a slot that cannot be placed must return its households before the ground's allocation, never through a second S7b run. |
| J-V5.6 | Chose to floor the altitude at the rim, the root and a 25 m clearance over the tallest thing beneath, over clamping the root's depth, because the owner asked for the rock beneath to shape the shadow (J98): a deep root lifts its island rather than being cut short. |
| J-V5.7 | Chose to resize an island by eroding or dilating its rim with the kernel's buffer, over re-drawing the outline from its stream (the base's comment), because a re-draw moves every rim point and re-cuts plots all round, while a buffer changes only a band at the rim and keeps the shape. |
| J-V5.8 | Chose hoists — a winch house and a cage on ropes, as clifftop monasteries were reached — as the default access, rope lines over water, and floating stairs and bridges of light only where the world has magic, over bridges of light everywhere, because the realism tiebreaker tempers the fantasy: the island is the one magic the setting asks for. |
| J-V5.9 | Chose to leave the island's magical lights ungated by the `magic` circumstance, over hiding them when it is `none`, because the island exists by its own setting and its magic is what holds it up; the circumstance still gates the stairs, the bridges of light and the ground's magical lights. |
| J-V5.10 | Chose to make generation and epochs obey the supply law strictly while letting an author's declaration or lock hold an island against it, with the fate `held against its supply` listed, and to keep the rung gate absolute, over refusing such a declaration or letting the rung be overridden, because everything is editable yet the base already disables the setting below CITY. |
| J-V5.11 | Chose to make the landfall a conversion of everything it covers — buildings demolished, plots and reservations left vacant under rubble, fields quarried as a surface working (its `source` the landfall, never an underground quarry), walls breached with their towers and gates, bridges ruined, ways buried and routed as tracks until an epoch clears them, the stone credited to the salvage ledger — with no edge added or removed, over cutting a new ruin face, leaving no mark, or covering plots and fields only, because it stays local, undoes exactly, keeps the old plan for regrowth, ties the fall into the ledger's salvage demand, and leaves no intact wall or open street standing in a field of fallen rock (revised with C5-21, C5-25). |
| J-V5.12 | Chose to draw everything on existing concerns (`island.place`, `terrain.noise`, `water.river`, `field.chance`, `naming`) with named creation indices, over a new concern, because §6.1's registry already reserves `island.place` for the islands and no draw here reads another concern's order. |
| J-V5.13 | Chose to redraw only empty slots at an epoch, a supplied island staying, over the base's reading that a slot may close and send its island down the decline ladder, because an island falls for want of magic, never by chance while it is paid for. |
| J-V5.14 | Chose to floor the cursor sun's height at 1.5 × the display list's top whenever the sky layer is visible and the document holds an island that is not fallen, over letting the sun stand below an island at close zooms or flooring it only while an island is in view, because a sun below a floating island casts its shadow upward and reads as an error, and a floor that switched on as an island panned into view would jolt every shadow on screen mid-pan (revised with C5-09). |
| J-V5.15 | Chose an underside of nested prism tiers following a profile function (cone, bowl, root, flat), over the base's one slab and over a full mesh in the light pass, because the tiers give the rock's silhouette to the existing slab traversal at a few records per island. |
| J-V5.16 | Chose a second base and surface layer only on tiles an island covers, lit separately and composed by the occlusion mode, over lighting the ghosted ground as the island's surface, because the ground seen through a ghosted island must take its own light and the island's shadow. |
| J-V5.17 | Chose to claim the ground landing yards at SKY, before S8, touching a way spine, over placing landings after the plots are cut, because the yard then fronts a way by construction and no plot is re-cut. |
| J-V5.18 | Chose a rank gradient on a prosperity island — each carried band given its carried share of the island's land, mapped onto its own band's inner range, the richest on the high ground and the rim that looks over the city (0.6 elevation, 0.4 view) — with a small noise term, the shade and the brush on top, over one uniform value or a driver raster, because a uniform value houses only one band and S10a would re-home the rest to the ground (the owner's "prosperity is a gradient and a band"), while an island has no market, wall, tannery or low damp ground to drive a raster; an institution island stays uniform (revised with C5-04). |
| J-V5.19 | Chose to refuse the setting where a bound dossier's `site.magic` is `none`, and to keep the setting and the circumstance independent without a dossier, because a floating island would contradict a dossier's magic-less world (item 20 (h)'s coherence) while a standalone map's two toggles are the author's. |
| J-V5.20 | Chose to re-land an island's accesses after a move by closing and opening the landing designation on two ground plots each, over re-deriving the ground under the old and new feet, because a move then touches no ground geometry. |
| J-V5.21 | Chose `delete` of an island to relocate its households to the ground without a ruin, the ruinous path being `fallIsland`, over one behaviour for both, because an author removing an island and a history bringing one down are different acts. |
| J-V5.22 | Chose to release a waning island's households in reverse ordinal order into each epoch's ground demand, over moving them all at the wane, because §4.11 empties a declining town by its suffix with a lag, and a wane is a decline. |
| J-V5.23 | Chose the conjured river's width by the ground's width law on a conjured share of the ground river's flow, over a fixed width, because the owner asked for a river that echoes the ground's, and the law keeps the echo proportional. |
| J-V5.24 | Chose the prison row's requirement band to be its paymaster's (`prosperous`), over its inmates', because the owner names a prison island as possible and the town's rulers keep it aloft. |
| J-V5.25 | Chose to hold the islands setting off under the `MFCG` and `FTG` presets, because no reference has islands and the parity presets switch every extension off (item 23). |
| J-V5.26 | Chose an unbuilt rim strip of 6 m inside the rim, planted as a rim walk with a row of trees, over plots to the edge — the Neighbourhood look, whose blocks are clipped by the patch's ragged edge (`research/findings/vg-ng-devlogs.md` §B2) — because no house stands on a cliff edge (the realism tiebreaker), the strip keeps the rim legible at every band, and the trees on the rim keep the floating patch's look `docs/IMPROVEMENTS.md` S1 asks for (revised with C5-39). |
| J-V5.27 | Chose to let an island edit leave the ground's field and its strips at their basis until the next epoch or a Re-derive from S10a — the fate listed, Update shade now offered for an immediate scoped change, the basis persisted so the lag survives a save (J-V5.47) — over re-evaluating the field at every island edit and re-deriving the blocks past τ as the terrain brush does, because the owner asked that shade move the town over time by the normal lag (item 102 (e)), and a drag of an island would otherwise re-cut plots under two strips far from the island for one gesture. |
| J-V5.28 | Chose to take volume 1's partition and district count for an island's districts and drop this volume's own count and seeds, over keeping both, because the landed V01 §3.10.3 lays them by the bent cut (J-V1.17) and two counts for one island would be two sources of one fact; the seven places where this volume's inputs govern are listed for volume 1's revision (V5 §3.12). |
| J-V5.29 | Chose to fix the ground reference and the altitude at SKY from the casters already placed, the tower rows of the allocated classes and a caster allowance, over reading the built casters at SKY-F, because field pass 2 must read the island's shade before any plot is cut and the altitude must not move after that read; the rare taller caster raises it at SKY-F with the strip's basis kept, a share measured at P0 with a pre-decided fallback. |
| J-V5.30 | Chose the model's strip as a derived record over the tiers without roughness, carrying no edit kind, over the view's rough tiers or an editable strip, because the roughness is view data keyed by the render key (§6.2), which the model must never read, and a strip is a consequence of its island — edited through the island, item 102's weight and the brush; at the field's 32 m cell the roughness is below one cell. |
| J-V5.31 | Chose a fourth island institution row, the arcane `tower`, admitted only where the world has magic and taking a custom kind of the `exotic-tower` archetype, and the archetype column on the palace and cathedral rows, over leaving custom institutions off the islands, because item 104 asks that custom content land sensibly with no hand-written rules and a tower "on its own ground, apart" is the owner's unique institution in its plainest fantasy form; it arises only when the roster or the dossier demands one. |
| J-V5.32 | Chose to leave on the ground, by the editable table `IslandRule.carry`, every trade whose profile emits smell, smoke or water pollution at the top step, the heavy processors and wholesale and storage of item 107 (a), every class with a hard need for running water, a river bank, the harbour, a gate or a quay, and an active chain's working nodes, over excluding the top-step emitters only, because an island has no downwind, downstream or extramural ground, no quay or gate, and no water that satisfies a need (its conjured river is magic's own), and the owner's rule that the tannery goes "down river" and away from homes cannot be met there (revised with C5-16). |
| J-V5.33 | Chose to let an island's own terrain cast nothing on its own context, over running the terrain shade on the island's terrain, because that relief is a gentle dome at a quarter of the ground's amplitude (V5 §3.8) whose self-shade stays below a field cell; a higher island's shade on it is real and kept, and at an epoch its own buildings cast on it through volume 6's mask on its lattice, as item 102 (b) asks of every building (narrowed with C5-32). |
| J-V5.34 | Chose to keep the island's own placement score (V5 §3.7) apart from item 103's relation families, over scoring the island's position with them, because the island is placed as one body at S7b (5) before any plot exists, while the families score plots against placed neighbours; its purpose rows are the island-scale reading of the institutions' profiles, aligned by volume 11. |
| J-V5.35 | Chose to export the strip as a thematic layer only — GeoJSON features, the shade map view's SVG, the statistics — over carrying it in the lit raster, VTT, glTF and CityJSON, because those formats already carry the island's physical shadow and solid, and a model day's shade share is a statistic, not a picture. |
| J-V5.36 | Chose to measure every pull that crosses arenas by the route through the island's admitted accesses — the island's street leg, a 100 m transfer, the ride and the ground's street leg, as §4.7's `road` mode runs through a gate — and every nuisance by the straight distance in three dimensions, over one straight distance for all, because goods and people ride the hoist while smoke, smell and noise travel through the air. |
| J-V5.37 | Chose to count an island as k units for coverage rows counted by district or neighbourhood (k its district count by `districtHa`), one unit for walking-radius rows and ⌈H ÷ N⌉ for household rows, over one unit for every row, because the island's districts are real districts and the owner's example is "one apothecary per district", while the ride to the ground passes every walking radius (revised with C5-15). |
| J-V5.38 | Chose to OR the islands' shade into the daylight term sample by sample, over adding their shares to pass 1's, because a cell in a hill's shade and an island's at the same hour is in shade once — an added share would count it twice and could pass the term's all-day bound. |
| J-V5.39 | Chose to keep an active custom chain's resource and processing nodes on the ground — only its final seller and its consumers going up by the carried share, the island's own institution keeping its links by the route, an author's declaration outranking the rule with a listed fate — over carrying chain nodes by the proportional share alone, because the owner asked that a chain be placed as one connected thing: splitting its working steps across a hoist breaks it at its most visible point, and an island offers no terrain feature, extramural edge or water leg for a chain's upstream steps. |
| J-V5.40 | Chose to name the new derivation row DR-SKY and leave its number to the integrator, over taking DR26, because volumes 1, 6 and 8 each propose a DR26 in parallel; one number for four rows would make the derivation table's references ambiguous. |
| J-V5.41 | Chose to read the dossier's `magical_node` deposit as a flat, positionless addend to `h_town`, acting only where the town already supplies some magic, over a placement pull toward the node or a multiplier, because the node's position — at a ruin's centre where a ruin exists (item 109 (f)), else S12a's decoration site — is volume 4's and volume 8's and is fixed after S7b (5) places the islands, reading it would tie the islands to the underground (item 2), a multiplier would vanish exactly where a node matters most (a middling town), and the owner's "no prosperity, no islands" forbids a node lifting a town that supplies nothing (revised with C5-23). |
| J-V5.42 | Chose to state the model sampler's default (nine suns at the midpoints of nine equal slices of the equinox day at the site latitude; one point per field cell) with volume 6's per-cell layout of points × suns, over leaving it to the coherence pass alone, because the strip and volume 6's building mask must OR bit for bit and neither can be built on an unstated layout; where item 102's application states either, its values govern and both volumes read them unchanged. |
| J-V5.43 | Chose a vault in the island's own rock — the rim slab, underside tier 0, present under every underside kind — for an island cathedral's crypt, the settlement's largest, over a ground crypt or no crypt, because only that keeps both the owner's crypt rule (item 109 (k) (2) as revised, J111: "cathedral also gets crypts but cemetaries get catacombs") and item 2's "no relation with the sewer system or underground"; island churchyards are surface burial grounds only, never catacomb candidates, while island churches still count toward the catacomb count. |
| J-V5.44 | Chose to state the reach cap of 8 × the caster's height as the model sampler's rule for every source — terrain, walls, islands and volume 6's building mask — over leaving each source its own reach, because the sources are OR-ed into one mask, which must follow one reach law (§8.4's cap; C5-31). |
| J-V5.45 | Chose an island district size of its own, `districtHa` (3.5 ha at CITY, 4.5 at METROPOLIS), over the town's mean district area, because with the town's mean a full CITY island is always one district and three never occur at METROPOLIS, so the owner's "a collection of neighbourhoods" could not happen; the values are about one Neighbourhood patch, calibratable. The count's plot share is volume 1's `hood.constants.sky.plotShare`, cited and never copied, and the count itself is volume 1's `skyDistrictCount(plotLandM2, districtHa)` (V01 V1-3.16), called and never restated; the fill's stop and the coverage overshoot read the same cell (`plotShare · A`, V5 §3.5 (2)–(3)), so an edit of it moves both volumes' counts, the fill and the overshoot together (seams SL-27, SLR1-11). |
| J-V5.46 | Chose to hand an S3 reservation an institution island leaves to the row's hand-over classes — the cathedral's close to the town's largest parish church (or temple), the palace's site to the town hall or a guild hall, else a park — and to skip the reservation where the creation prefix already sends the institution up, over leaving it empty or re-planning S3, because a reserved site with no owner is a hole no stage fills, the old close as the mother church's and the old palace as the town hall are the historical pattern, and the castle holds its own S3 reservation (so handing the palace's to the castle row would reserve twice). |
| J-V5.47 | Chose to persist, per island, the `shadeBasis` its strips were last computed from — written only by a shade evaluation — over recomputing the strips on load from the live island or storing the strips' bits, because the owner's lag (item 102 (e)) must survive a save and a replay (the base recomputes the fields on load, §2.9), and a basis of ≤ 2.5 KB rebuilds the strips exactly where the bits would cost up to 60 KB. |
| J-V5.48 | Chose island district kinds keyed `sky-island`, `sky-palace`, `sky-temple`, `sky-prison` and `sky-tower`, owned by this volume and adopted by volume 1, and a fabric hint that is a prior (× 3 on the hinted template at S7c) and never a forced strategy, over reusing the ground's kinds or forcing the template, because `temple` is already a ground kind (one table, one row per key), and the owner's islands should vary as neighbourhoods do while leaning toward the fitting form. |
| J-V5.49 | Chose to read the rim as a `sheer` natural barrier (closure, no wall), never to wall an island by generation, and to make an author's island wall a barrier-closure enceinte walling only the landing yards with a gate at each attach, over walling the rim or refusing island walls, because item 106 asks walls to use natural barriers and an island is barrier all round, approachable only at its landings. |
| J-V5.50 | Chose to bind consumers to providers across the arenas by the route and to count a cross-arena consumer at the access's foot (or top) for its provider's two-way pull, over binding by the straight distance or counting it at its world position, because goods ride the hoist and arrive at the landing, never at the fields beneath the island. |
| J-V5.51 | Chose to let a split class's shop go up by the carried share while its works stays on the ground, joined by `branchOf` and the route, over keeping the whole class on the ground, because item 105 (h)'s split exists exactly so a noxious works and its retail can stand apart, and a rich island's butcher's stall or taphouse is historically faithful. |
| J-V5.52 | Chose to run item 105 (f)'s order and relaxation on each arena on its own at generation, each reading only the other's proxies (the island's land centroid; the ground's S10a block), over one joint order across the arenas, because the island's unit run and the pooled S10b run concurrently and a joint order would make placements depend on the worker's interleaving. |
| J-V5.53 | Chose to re-reason an island whose institution the dossier removes — the next instance of its row, else a prosperity island, else a wane — at the next epoch, the institution itself leaving at once, over deleting the island or leaving a vacant claim, because the dossier is truth (item 20 (h)) while the island is the map's and changes only by its own law. |
| J-V5.54 | Chose to admit an island site only where its rim meets or lies within an admitted slanted access's run of admissible ground, over placing freely and reporting an unreachable island, because an island over open water beyond a rope line's run has no access at all, which no rung repairs. |
| J-V5.55 | Chose to project every island tier in the `prism` form at rung 3, over the `drop` form, because a drop offsets a tier by one height only and a root's thin tiers then draw as disjoint beads; `drop` stays only for the rung-3 budget fallback, with tiers subdivided so drops overlap. |
| J-V5.56 | Chose to take the global light's window from the surface layers' own top and to test each slab over its own reach, over one window from a top that counts the island's slab, because an island 150–250 m up would otherwise lengthen every ground ray's window five- to eightfold on every tile, for the same result. |
| J-V5.57 | Chose to let an island institution be only one building or compound — a singular record or a SIZE step — and to send a subsuming greater up alone, its lessers staying separate members, over admitting any record, because a COUNT, GUILD or QUARTER record is many buildings (item 108) and one island cannot carry all of them, while a member taken alone would count twice. |
| J-V5.58 | Chose to give the cathedral row a second tag, the great temple of a non-default religion, over the cathedral alone, because item 23 forbids hard-coded universals and volume 11 already treats the great temple "as cathedral". |
| J-V5.59 | Chose an exact O(1) pre-test per corridor cell (its own ray's track against the solid's bounding box) for the strip's window in rough relief, over the critique's two-pass extremes, because extremes taken over a smaller window can miss a low cell far from the island that the ray still reaches, while the pre-test is exact and as cheap. |
| J-V5.60 | Chose to stand every access foot and landing yard on part-0 land only — clear of raised-way piers, of raised decks' plans dilated by `accessSiting.deckGapM` (4 m) and of item 110 (d)'s deck faces, "the nearest way" a walkable part-0 way — and to make the accesses overhead obstacles (`skyAccessObstacles`) that every raised course laid after SKY keeps clear of, over letting a deck span a landing yard or a rope line, because a hoist's cage and a rope line need open air while item 110 (b) lets a deck span anything, and a yard on a mid-span deck or beside an aqueduct is reachable by nobody (C5-48). |
| J-V5.61 | Chose that no raised way reaches an island and no raised part stands on one — a T4 `raised` or aqueduct stroke ending on a rim **bent** (J-VI.4 (d), superseding "refused with the offer of a `SkyAccess`"), one on an island's key bent (J-VI.4 (e)) — and that no `SkyAccess` is a way or carries deck plots, over admitting a raised way into the sky or a second sky part per island, because the base's sky has "no portals, no roads in or out" (II.1), sky access is `SkyAccess` only, and item 110 (b)'s decks live in ground parts (C5-49; the row the 23:14 note asked for). |
| J-V5.62 | Chose to keep a removed island as a live record in state `removed` (`convert removeIsland`) that holds its slot closed and counts as filled — for the slot chain and toward an integer `islands.count` — at every re-derivation and every epoch, released only by the removal's undo or a T5 declaration when no slot is free — the user's re-add serving that key — and never by a count, since an integer `islands.count` counts held slots as filled and a cap increase opens only new keys (J-VI.14; file f item 260; the reconciliation's seam ST-04 deleted the first text's release by an integer adjust, which contradicted that rule); and to hold a deleted generated access's ordinal likewise, the lowest surviving generated ordinal taking `main`; over re-drawing the slot, matching tombstones or reading the log ahead, because the owner's removal "holds through regeneration" (item 110 (b); owner ~23:40), volume 6 holds removed generated content across epochs (critique-V6 C6-38), the base's collision rule re-mints over a tombstone, and a live record read at every derivation is the base's own pattern (a fallen island's record, a rejection record) — the owner removed that island, not the town's quota of islands (C5-51). |
| J-V5.63 | Chose that item 110 (b)'s generator reads the sky only as follows — an elevated road's endpoints bound to reservations, never institutions (so a road to a precinct whose cathedral rose stands, its reason reading through the hand-over); ground-arena entities only, by `PlatKey.layer`, at epochs and in post-build requests; the aqueduct's need from the whole S2 population at generation and the ground households at an epoch; ground hydrology only for its source, no aqueduct part on an island — and recommended committing every generated raised part before S7b (1), over letting the generator read islands, because at generation the sky fill runs after the generator, a list of `sky-*` kinds would drift from the arena test, and an island's spring pond 60–220 m up is exactly what a naive search for a higher spring would find (C5-52). |
| J-V5.64 | Chose that a landfall ruins the raised spans and raised-way piers it covers (a span falling with its pier, the crossing closed, an aqueduct's terminal running dry as a fate), steps the retaining walls it covers to `decayed` (item 245's state; seam ST-12) — generated and drawn alike, keyed by lineage so a re-derivation keeps them decayed until an epoch's restoration re-derives them (V06 §3.19.4 (6)) — and brings down the deck plots on a covered deck after relocating their households, their buildings demolished and the plots tombstoned with the deck as volume 6 tombstones a struck deck's, a repaired deck re-offering its faces (V06 §3.19.5 (3)–(4); seam ST-14), over the 23:14 note's re-deriving generated retaining walls "under the rubble" or leaving raised parts untouched, because re-derivation would stand an intact wall in a field of fallen rock, and the landfall's own rule is that states change and each change is a listed fate (C5-53). |
| J-V5.65 | Chose the strip's receiver heights to be the unlevelled ground raster the field reads (S1 with the T2 terrain strokes), item 110 (a)'s levelling kept as platform datums (BCR-V5-30), the basis's receiver version the hash of those heights, and a ground terrain edit re-reading strip bits over its scope from the unchanged bases, over the critique's `ShadeBasis.terrainVersion`, because a load cannot rebuild from a superseded terrain version while the unlevelled raster is what the field and volume 6's shade mask already read (critique-V6 C6-51 (2)), and a terrain edit moves the receiver, not the caster whose lag item 102 (e) asks for (C5-54). |
| J-V5.66 | Chose to write "underside tiers" for the rock beneath an island and "massing tiers" for item 110 (c)'s stacked wings wherever both could be meant, the crypt lying "under the building's lowest massing tier, inside underside tier 0 (the rim slab)" and the surface top reading each point's highest massing tier, over one bare "tier", because a stepped temple on an island puts both in one sentence and volume 2's X20 note was ambiguous (C5-55). |
| J-V5.67 | Chose to record item 110's arrival as one declared shift of both sky goldens with a no-op pin (item 110's rows off: byte-identical), the METROPOLIS golden pinning a raised way under an island, over re-recording the goldens silently, because the owner's ~23:40 default at CITY and METROPOLIS legitimately changes both, and a shift that rides silently hides every later regression behind it (C5-56). |
| J-V5.68 | Chose to re-check every island's clearance after each epoch's growth, as a second participant `sky.clearance` at `afterGrowth` order 50 returning `reclearIsland` — raising `groundRefCm` and keeping `elevationCm` unless the floor fails, never writing `shadeBasis` — and to let the island yield to the city (no raised part, wall or building is moved or refused for an island), over checking at `afterField`, constraining the raised-way solver by islands, or re-evaluating the strip at the raise, because an epoch's raised parts, new stage and close-ups exist only after growth, a city builds its aqueduct where the water is, and item 102 (e)'s lag keeps the strip's basis to the next evaluation (C5-47). |
| J-V5.69 | Chose to lay an island's retaining walls — the unit run's levelling and an author's T3 `retaining` or T2 terrace stroke — as `RetainingWall` records on the island's own arena, never an enclosure, never on the rim strip or along the rim (a stroke there bent inward past the rim walk with "The rim walk stays level; the wall stands inside it", J-VI.4 (g); seam SLR2-11), over reading T3 on an island as an enceinte or keeping retaining walls on the ground layer only, because item 110 (a) says a retaining wall "is not an `Enceinte`" and holds the terrain it levels, which on an island is the island's, while the rim strip is never cut (C5-50). |
| J-V5.70 | Chose to give SKY's ground writes data keys of their own, `reservations.landing` and `allocations.landing`, declared by S8, S10a (with its hook S9b) and S12a and by no earlier stage or hook, and to let S10a take a landing's two staff households from its host district's `modest` demand, over SKY writing `reservations` and `allocations` as S3 and S7b do or SKY running before S7c, because with §4.12's hooks united into S7b's declared I/O (volume 1's BCR-26) a SKY that writes S7b's keys after S7b closes a cycle in §4.1's sort, while a SKY before S7c would split S7b; own keys order SKY after S7b and before its readers with no cycle, and SKY then rewrites no row S7b wrote (seam SL-01). |
| J-V5.71 | Chose to compute the strips onto the ground once per shade evaluation, at their first read — volume 1's S9b at S10a's `afterDrivers` hook where it is registered, else field pass 2 — and hold them for every later reader, and at a re-derivation starting after SKY to write the islands' bases at S10a's start, before step (i) and every hook, over computing bases and strips at field pass 2 alone, because S9b's manor sun factor, the hood pins' shade gate and `DistrictContext.shade.islandShare` read the strips before pass 2, and a re-derivation from S10a would otherwise let the manor pick read strips from the old bases while the field folds the new (seam SL-02). |
| J-V5.72 | Chose an optional `shadeBasis` — absent on an island raised at an epoch after S6 or declared between evaluations, which casts and receives no strip until the next evaluation — and a load that computes bases only through §7.5's schema chain for a document older than the basis step, never from an absent basis, over writing a basis at the raise or computing an absent one at load, because a basis written at the raise would move the field before the owner's lag lets it (item 102 (e)), and a basis invented at load gives a strip the session never had, breaking T-V5-21 (h) (seam ST-49). |
| J-V5.73 | Chose to write a covered way's class to volume 6's `Way.formerClass` in the `fallIsland` batch, keeping a `formerClass` the way already carries, over a landfall field of this volume's own or no record, because volume 6's landfall clearance restores the class from `formerClass` alone (V6 §3.5.2) — without the write every covered primary would stay a track for ever — and a lane volume 6 had downgraded should get back the class it had before its decline, not the lowered one (seam TR-04). |
| J-V5.74 | Chose to read an epoch's island laws at the fold's rung (`ctx.rung`, V6 §3.1 (3)) over the rung at the epoch's population target, because inside the hand-off band the two differ and file f item 322 makes the fold's the epoch's rung for every reader, so the islands' gate agrees with the product and rung the rest of the epoch runs with (seam TR-22). |
| J-V5.75 | Chose to read a sky pseudo-district in S7b (1)'s district supply term at its island's land centroid's world point (`anchor` + the outline's centroid, fixed by S7b (5)'s placement) over its main landing's foot, because the feet are sited only at SKY, after S7b, while volume 1's χ̃ reads the term at S7c by centroid distance; the centroid is the proxy the ground pool already reads for an island's classes (V5 §3.20 (1)), so both volumes read one point that exists when the term runs (seam SLR2-03). |
| J-V5.76 | Chose to type a landfall's `members` as `DecorationMember` — an `Id` for a plot, land use, reservation, way or retaining wall, and `{ raised, span: [a, b] }` or `{ raised, support }` on item 244's support keys for a raised part — over storing volume 6's `SpanRef` or keeping raised parts out of the list, because a span and a pier have no `Id` of their own and a `SpanRef` is batch-local and never stored, while the support keys are minted once and never reused (volume 4's BCR-45), so volume 6 can remove each raised member in the batch of the op that ends its cover (seam TT-03). |
| J-V5.77 | Chose to make a resize and a rim reshape re-lay the rim strip, re-claim the landing yards at their re-seated tops and keep or re-search the institution claim inside the district that holds it, in the same commit — a growing band cut at the extended district boundary ways and re-derived by each receiving district, the rim walk re-planted whole after every rim change by volume 1's island-level `plantRimWalk` (V01 V1-3.10.3 step 4; seams SLR4-01, SLR4-03), and a re-searched claim's district re-derived by volume 1's claim re-search, which releases the institution from V1-3.9's fixed inputs for the event (V01 V1-3.10.3 (6) (c); seams SLR4-02, SLR4-03) — and to floor a resize's area (or bend a reshape back) where no site in that district would fit, over leaving the strip and the claims where SKY laid them, re-running the unit run, re-searching the claim anywhere on the island, or releasing the institution to the ground, because a strip left behind either widens into dead land (growing) or is cut by the rim (shrinking), a re-search confined to the claim's district keeps every district's kind (V5 §3.12 item 5) and volume 1's rule that only a unit run re-partitions an island (J-V1.90), and a floor keeps an institution island's reason without a second re-reasoning path beside V5 §3.15 (1b) (V01 V1-3.10.3 step 4, (6) (c); seams SLR3-02, SLR4-03). |
| J-V5.78 | Chose to store an `own` island's drawn relief class on `terrainEcho.reliefClass`, written by SKY at the draw, over re-drawing it wherever it is read, because volume 1's terrace rule reads it after SKY and a second draw on one stream index would be a second writer of one value; `echo` and `none` carry none and read as `plain` (V01 V1-3.17.7 (2), J-V1.94; seam SLR3-03). |
| J-V5.79 | Chose to let a covered tower and gate (a `Gate` of any kind — `main`, `postern`, `water`, `gatehouse` or `castle`; seam TV-04) follow its run's `condition` — the `breached` length extended over its footprint's chord along the trace, or that chord alone where its stretch is not covered — over giving `Tower` a `ruined` state, because the base's `Tower` and `Gate` carry no state or lifecycle, file f item 575 draws a tower by its run, and volume 6's repair of a ring in use then stands tower, gate and wall together with nothing further to restore (seams TU-03, TV-04; volume 6's TU-01). |
| J-V5.80 | *Reconciliation round 3's continuation (SCC-R2C-15).* Chose to write **no register line of this volume's own**. Every calibratable column P1 and P2 land takes V12 §3.11's default line through `plat calibrate register --defaults` in the landing change, and P1's and P2's exits carry the register check (V5 §8's *The register at the exits*). The rejected alternative was a line of `measure` entries due at M6-sky for the three ⟨P0⟩ cells (`townSupply`, `carriedSupply`, `casterAllowanceM`), with T-V5-3 and T-V5-10 registered as V12 `BenchBarDef`s. The choice holds for three reasons. First, P0's spikes set those cells and apply their fallbacks before P1 lands the table, so no measurement of a landed cell is left to register; T-V5-3 and T-V5-10 then hold the cells as ordinary bars, and a failure fails the phase exit. Second, a whole-bar verdict would open a supply or caster fallback on a clause about another quantity (T-V5-10's ring nesting, T-V5-3's monotonicity). Third, no corpus frame holds an island, so the default line's corpus pass closes the island columns `fixed` with "no admissible frame", which is the honest status of a fantasy table. The ⟨P0⟩ cells' provenance notes name the run that set them, and `carriedSupply` now carries its ⟨P0⟩ mark, since V5 §3.3 sets it at the same run. |
| J-V5.81 | *Reconciliation round 6 (TW-04).* Chose to price a resize and a rim reshape at every piece of work V5 §4.2 commits — each re-claimed yard's top at §12.6's post-build placement rate (one `placeAt` per access, ≤ `accessCount.max`; a reshape's on the moved stretch's yards only) and, beyond the seam's required text, one scope at §12.6's scoped-regeneration law over the plots the event re-cuts outside the re-derived districts (each re-claimed yard's covered plots by §7.3's local operator; a shrink's or an inward stretch's cleared and re-cut plots, §4.7 S10 (7)) — over keeping those inside the row's fixed ≤ 5 ms or batching the tops into the island L1 batch, because the base prices a `placeAt` and a local operator at those rates (§12.6), V01 V1-6's sky row leaves the shrink's plot clearing and re-cut and T-V1-21 the yard's local operator to this row, and volume 6 sums its century from this row by citation; so V6 §6.2's worst case adds ≈ 97 ms a growing resize at CITY (3 tops, ≤ 9 re-cut plots' buildings) and its D-18 rule re-declares CITY ≤ 115 s and METROPOLIS ≤ 215 s (TOWN ≤ 25 s kept) for the owner's veto (seam TW-04; V6 X46; J-V6.118). |

## 10 Base change requests

Each names the base section's exact heading, quotes the current text once, and gives the new text or the mechanism to
add. This volume is written as if each were applied.

**BCR-V5-1 — the island record and the access record.** Heading: `### 2.7 Walls, gates, towers, castle, bridges;
greenery, land use, decorations, pins; labels; content entities; the staged layers' records`. Current: "interface
SkyIsland { id: Id; outline: Polygon; elevationCm: Cm; terrain?: Terrain; terrainEcho?: { river?: Id /* the ground river
it echoes */; relief?: 'echo'|'own' }; key: PlatKey /* its own arena, part 1–3 (§2.2) */; districts: Id[]; reason:
'prosperity'|'institution'; institution?: Id; placement: { over: 'water'|'fields'|'outskirts'|'core'; byAssignment:
boolean }; occlusion: 'opaque'|'ghost'|'offset'; supply: … ; areaHa: number …; state: … }". New: `SkyIsland`,
`UndersideProfile` and `ShadeBasis` as V05 §2.1 declares them (`outline` becomes `rim: ChainRef` and `land: FaceRef`,
since §2.2 rule 5 lets no record store a vertex position; `elevationCm` becomes the reading `groundRefCm + altitudeCm`;
`shadeBasis` added — a persisted copy of the island as the field's shade last read it, written only by a shade
evaluation, in the model digest; `lifecycle` added; the state `removed` with the fields `removed` and `removedAccesses`,
V05 §3.2 (6) and §3.10 (1); `terrainEcho.relief` gains `'none'` and `terrainEcho` the optional `reliefClass`, the relief
class SKY drew for an `own` relief, which volume 1's terrace rule reads, V05 §3.8 (3), V01 V1-3.17.7 (2), seam SLR3-03),
and `SkyAccess` as V05 §2.2 declares it, with the comment "the rules are V05's". In `### 2.8 Identity, lifecycle,
provenance, the entity registry`, in the registry additions of 2026-09-27 and 2026-09-28, add: "`SkyAccess` (§2.7;
lineage unit its island, anchor its island's address, role and ordinal; `placeSkyAccess`, `setAttr`, `delete`, `lock`),
and on `SkyIsland` the fields of V05 §2.1 with their edit kinds (V05 §4.2) and migration hook (V05 §2.6)".

**BCR-V5-2 — the sky arena's key, levels and roles; the part counter.** Heading: `### 2.2 The plat — one arena per
layer, five refinement levels as views, roles instead of stored indices`. Current (the `PlatKey` comment): "sky parts 1–3
= one arena per sky island (§4.2, II.1)". New: "sky parts ≥ 1 = one arena per sky island, each allocated once from
`Document.nextSkyPart` at the island's creation and never reused (the island's count-law slot is `SkyIsland.slot`)". In
rule 1, after the paragraph **The underground layer's further parts**, add: "**The sky layer's levels (V05).** A sky
island's part takes the same five views in its own local frame: **L0** the arena's outer ring (`margin` on its
`Terrain`), the **rim** — one closed structural chain carrying the `rim` role on the island — the **void** face (L0 kind
`sky`) between them and the **land** face inside the rim, and its water faces; **L1** its ways, district boundaries, the
rim strip's `setback` line and its landing and institution claims; **L2–L4** as the ground's." In rule 7 add the edge
role `rim` (structural) and the vertex role `sky_access`. Heading `### 6.3 Identity: address ids, lineage keys, carry-over
(and the scope of stability, stated)`, current "the island's slot on the sky layer" → new "the island's part on the sky
layer". Heading `### 2.9 The document and serialisation`, `interface Document`: after `nextUndergroundPart` add
"`nextSkyPart: number; // V05: the part the next sky island takes (1 at creation); never decreases, as nextSeq — a fallen
or undone island's number stays spent; the island's address records it`".

**BCR-V5-3 — the sky stage in the stage graph.** Heading: `### 4.1 Stage graph, evaluation model, laziness contract,
transactions, the worker`. Current: "L1 by S3 — the map border first — S4, S5, S6, S7, S7b and S8, in that order, and by
no generation stage after S9 (J-P46)". New: "L1 by S3 — the map border first — S4, S5, S6, S7, S7b, SKY (the ground
landing claims, V05 §3.10) and S8, in that order, and by no generation stage after S9 (J-P46)". Add to the transactions
table the row "| SKY, per island (V05) | on the island's key: L0 — outer ring, rim, the land and void faces, then its
water and each access's rim vertex; L1 — the rim strip line, the landing and institution claims · on the ground: L1 —
the landing claims (`claimSubFace`) |", and to the units paragraph: "Each sky island's unit run (volume 1) runs as a unit
of the hinterland unit's kind on the generation worker, on its own arena (V05 §3.1)". **Mechanism to add** (seam
SL-01), in **Registration and order**: "SKY's `StageDecl` (V05 §3.1) declares as inputs S7b's outputs (with its hooks',
§4.12) and as ground outputs two data keys of its own, `reservations.landing` (the ground `landing` reservations) and
`allocations.landing` (the positioned `sky_landing` rows) — never `reservations` or `allocations` — so no stage or hook
that runs before it (S7b's `afterGreedy` hooks among them) reads what it writes; S8, S10a with its `afterDrivers` hooks,
and S12a declare `reservations.landing` and `allocations.landing` beside `reservations` and `allocations`, and the sort
puts SKY after S7b and before S8, S10a and S12a. With the islands setting off, SKY registers and writes nothing under
either key."

**BCR-V5-4 — the island rule's supplies, rows and strategy.** Heading: `## II.6 The staged layers — floating islands and
sewers: the hooks the base carries now`. Current (rule 3): "`S_town`, the area-weighted mean of the prosperity value over
the settlement's built land … rising to 1 at the rich band's top". New: rule (3) states the two supplies on the field's
absolute value, `townSupply` and `carriedSupply` as value-keyed rows, `S_carried` by the band values, with the pointer
"their definition and calibration are V05 §3.3"; rules (4)–(7) gain pointers to V05 §3.2, §3.4–§3.7, §3.15 and §4.2;
rule (6)'s "one whose `h(S_town)` or `h(S_carried)` falls to 0 wanes, settles and falls" stands, with "a slot holding a
supplied island is never redrawn (V05 §3.15)". In `interface IslandRule`, current "thresholdCut: 'prosperous'|'rich' /*
τ = the lower cut the town's FieldBands give this band */; supply: { band: string; h: number }[] …; areaHaMax: number;
elevationCmBand: [Cm, Cm]; placement: ('water'|'fields'|'outskirts')[]; terrain: 'none'|'echo'|'own';" → new: V05 §2.4's
`IslandRule` whole, with `CarryRule`, `IslandInstitution` and `SkyAccessRow`. `SkyStrategy.place` returns `KernelResult<{ islands:
SkyIsland[]; handovers: SkyHandover[]; groundClaims: Id[] }>` (V05 §2.3). Heading `### 4.9 S12a Hinterland siting and
the hinterland unit · S12b Greenery — the rule tables (O14 / O19)`, current "an island's supported area and altitude
interpolate along the prosperity value between band rows exactly as coverage, granularity and greenery do" → new "an
island's supported area and altitude interpolate along the prosperity value between rows as coverage, granularity and
greenery do — its rows keyed by absolute values rather than bands, since a town-wide supply must compare towns, which
the per-town cuts cannot (V05 §3.3)".

**BCR-V5-5 — S7b (5) and the landing kernel.** Heading: `### 4.5 S6 Districts, quarters and fields · S7b Allocation and
district claims`. Current (S7b (5)): "filled from the richest band down under II.6's supply law: the allocation's plot
land is the supported area `A(S_carried, S_town)` × the dense core's plot share (0.62, §4.2 S2), recomputed as
households are added, until it is used or three districts' worth of households are allocated; a slot whose supported
area is 0 gets no allocation." New: "× the dense core's plot share (0.62, §4.2 S2)" becomes "× `plotShare`, volume 1's
`hood.constants.sky.plotShare` (V01 V1-3.14; its default the base's dense-core share, §4.2 S2), the one share the
island's district count divides by (V01 V1-3.16's `skyDistrictCount`)" (seam SLR1-11); and append "— the gate, the forced slots, the reasons, the fill with its carried
workplaces, the district count, the outline and the placement of each slot by V05 §3.2–§3.7, a slot that cannot be
placed returning its rows before (1)." In **Fields**, pass 2's kernels, current "adding the kernels around the noxious
trades, prisons, middens and institutions the block allocation placed" → new "adding the kernels around the noxious
trades, prisons, middens and institutions the block allocation placed, and the positive landing kernel at each ground
sky landing (V05 §3.10)".

**BCR-V5-6 — the plot model's sky fields.** Heading: `### 2.5 Districts, quarters, blocks, plots — the PLOT MODEL,
reservations, allocations and the context vector`. Current: "arena: 'ground'|'underground' /* item 12: …". New: "arena:
'ground'|'underground'|'sky' /* … 'sky' on an island's arena, its values read as V05 §3.11 states */". In `Allocation`'s
rows, current "areaM2?: number /* area-sized rows: edge orchards, sky capacity */ }[];" → new "areaM2?: number /*
area-sized rows: edge orchards, sky capacity */; at?: PointCm /* a positioned row: a sky landing's foot (V05 §3.10) */;
access?: Id /* its SkyAccess */ }[];" — the positioned `sky_landing` rows are SKY's writes under their own data key
`allocations.landing` (§4.1, BCR-V5-3), never a rewrite of a row S7b wrote, and S10a, which reads `allocations` and
`allocations.landing` together, takes each landing row's staff households (its class's) from the host district's `modest`
residential rows (V05 §3.10 (4)). In `Reservation.kind` add `'landing'` (a sky landing's yard, V05 §3.10; on the
ground, SKY's writes under the data key `reservations.landing`, BCR-V5-3); in
`Block.interior` add `'rim_strip'` (a sky island's unbuilt rim walk, V05 §3.10). In `### 10.2 Roster (data-driven,
replaceable; sequential and prefix-stable; our values)`, the district-kind rows gain `sky-island`, `sky-palace`, `sky-temple`, `sky-prison` and `sky-tower` (V05 §2.4:
keyed apart from every ground kind) and the class table gains `sky_landing` and `sky_landing_top` with the facts of V05
§2.4, `sky_landing` with a `front` column for a secret access's landing (their rows volume 11's).

**BCR-V5-7 — the island laws over time and the landfall.** Heading: `### 4.11 Incremental mode, transformations and
conversions (the evolution hook; one path built in the base)`. Current: "`fallIsland` archives its arena and lays a
`ruin` decoration face (§2.7) over its projected outline on the ground through the carve path's clear-region protocol
above, every entity under it demolished with that cause". New: "`fallIsland` archives its arena and converts the ground
it lands on — covered buildings demolished, covered plots left vacant under a `fallen_island` decoration, covered fields
quarried, the stone credited to the salvage ledger, no edge added or removed (V05 §3.16)"; and after "regrowth re-floats
a settled island before it raises a new one (J-A10.42)" add "— the laws in full, called once per epoch as
`IslandEpochStep`, are V05 §3.15". In `type DeclineOp`, current "| { op: 'resizeIsland'; island: Id; areaHa: number;
elevationCm: Cm } // … the outline re-drawn by §4.2's routine from the island's own stream …" → new V05 §4.2's island
members (`resizeIsland` with `altitudeCm`, its rim eroded or dilated by the kernel's buffer; `waneIsland` added;
`raiseIsland` with its `declared` form; `removeIsland` — an author's removal keeping the record in state `removed`,
holding its slot, V05 §3.2 (6) — and `reclearIsland` — the epoch's clearance re-check, V05 §3.15 (7) — added).

**BCR-V5-8 — the sky light rows.** Heading: `### 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b Placement ·
S11 Site plans and footprints — the plot model`, *Light sources*. Current (`LightRule.host`): "host:
'gate'|'bridge'|…|'accessPoint'". New: add `'rim'|'keel'|'skyAccess'`, and on `LightRule` the optional cell
`radiusMarginM` (the `keel` row's radius beyond the apex's clearance, V05 §3.13). Current (3): "The sky rows light an
island by its supply (II.6)". New: "The sky rows — the rim's orbs, the keel's downward glow and the access lanterns, V05
§3.13 — light an island by its carried supply and are gated by no `magic` value; the ground rows light the island's
ordinary fabric as any district's."

**BCR-V5-9 — the landfall decoration and the waterfall.** Heading: `### 2.7 Walls, gates, towers, castle, bridges;
greenery, land use, decorations, pins; labels; content entities; the staged layers' records` (as BCR-V5-1). Current: "interface
Decoration { id: Id; kind: string /* pond, copse, stone circle, ruin, wayside shrine, boundary stone, gallows hill, …
data-defined */; face?: FaceRef;". New: add `fallen_island` to the kind comment and the fields "`members?:
DecorationMember[] /* what a fallen island covers, drawn with the ruin program (V05 §3.16 (5)) */; source?: Id /* the
fallen island */; name?: NameRef`", with the type "`type DecorationMember = Id /* a plot, land use, reservation, way or
retaining wall */ | { raised: Id; span: [number, number] /* the span between two support keys, item 244's a and b */ } |
{ raised: Id; support: number /* item 244's support key */ }`" (seam TT-03; J-V5.76). A raised member's keys are
item 244's support keys, minted once along the deck and never reused (volume 4's BCR-45), so a member names the same
pier or span for its raised way's whole lineage — never volume 6's batch-local `SpanRef`, which no record stores; its
geometry is resolved at read through the raised way's record: a span's deck band in plan, a support's `ring`. Heading `### 2.3 Terrain and water`, `WaterBody`: current "flowFrom?: Id; flowTo?: Id;" →
new "flowFrom?: Id; flowTo?: Id; fall?: true /* a sky island's conjured river whose outfall is the rim: a waterfall
(V05 §3.8) */;".

**BCR-V5-10 — the edit events and targets.** Heading: `### 7.1 Edits are ordered events on addresses; the named actions;
the edit targets; dry-run validation`. Add the event `placeSkyAccess`, `quarter`'s `sky` parameter and the `key`
parameter of the point-form events as V05 §4.2 declares them. Current (the edit-target table's row): "| sky islands
(II.6; staged, editable in the base) | `setAttr` (area, altitude, state), `lock`, `convert` (resizeIsland, settleIsland,
fallIsland, refloatIsland, raiseIsland); `recipe.layers.islands` is an `adjust` that re-derives from S7b (§7.8) |". New:
"| sky islands and their accesses (V05) | `quarter` with `sky`, `setAttr` (`anchor`, `altitudeCm`, `areaHa`, `occlusion`,
`underside.*`, `field.*` — `field.prosperity` a declared target mean —, name), `setField` with `key` (terrain and the
prosperity, density and greenery brushes), `drawWall` with `key`, `moveVertex` and `warp` on the island's key,
`regenerate` (the island's scope; the scope `shade` — Update shade now), `lock`, `delete` (folded as `convert
removeIsland`, the record kept in state `removed` holding its slot, V05 §4.2), `convert` (`resizeIsland`,
`waneIsland`, `settleIsland`, `fallIsland`, `refloatIsland`, `raiseIsland`, `removeIsland`); accesses: `placeSkyAccess`, `setAttr`
(kind — re-checked against `magic` and the row's limits —, role, `state`, `knownTo`, `ground.at` — re-landed as a move),
`delete` (a generated access's ordinal held in `removedAccesses`, V05 §3.10 (1)); derived, no edit kind: `groundRefCm`, `elevationCm`, `shadeBasis`, `supply`, `state`'s dates, `slot`,
`landfall`, `removed`, `removedAccesses`; `recipe.layers.islands` and `islands.count` are `adjust`s that re-derive from S7b (§7.8), an
integer `islands.count` counting the slots removed islands hold as filled and opening only free slots — a count
never releases a hold (V05 §3.2 (6); file f item 260) |". In the toolkit's
table, T2, T3, T4, T5, T6, T8, T9 and T10 gain the sky parameters of V05 §4.1, and T4's dry run gains the rule of V05
§4.2: a `raised` or aqueduct stroke ending on a sky island's rim makes no way and is bent into
`placeSkyAccess` with the stroke's ends as top and foot, and one on an island's key is bent as J-VI.4 (e) states (item
101 R2: a bend, never a refusal, where no dossier fact or lock is contradicted). Heading `### 7.8
Controls: monotone, continuous, documented; the control-surface budget (O16 f, R15)`, *Layer controls*: after "(off /
on; consuming stage S7b; locality *re-derive from S7b*; discrete)" add "and, beside it, `islands.count` (`auto`, 0–3; the
same stage, locality and continuity)".

**BCR-V5-11 — the sky's failure rows and invariants.** Heading: `### 5.2 Failure classes: detection, ladder, test`: add
the rows F-SKY-FILL, F-SKY-PLACE, F-SKY-TERRAIN, F-SKY-ACCESS, F-SKY-UNIT, F-SKY-CLEAR, F-SKY-CRYPT, F-SKY-SHADE,
F-SKY-LANDFALL and F-SKY-HANDOVER of V05 §3.17. Heading `### 5.3
The invariant suite, by scope (SCL-1)`, current "every island in state `floating` has a supported area > 0;" → new "every
island in state `floating` has a supported area > 0 unless held by a lock or declaration (V05 §3.15); every island's
apex clears the tallest caster beneath by `clearanceM`; its land area within 1 % of `areaHa`; no plot on its rim strip;
every live, unsettled island has an access or its report names it `unreachable`; no two islands within `gapM` (V05
§3.7–§3.10); a slot held by a `removed` island carries no island (V05 §3.2 (6)); no raised deck or raised-way pier inside
an access's column or landing yard, and no access foot on a deck face (V05 §3.22 (3)); no island `RetainingWall` on a rim
strip (V05 §3.22 (4)); no raised part with an endpoint, a deck or a source on a sky arena (V05 §3.22 (3), (5));".

**BCR-V5-12 — the dossier's islands row.** Heading: `### 7.7 Intent, character, constraints, assignments, the forms
catalogue (O10; the ASSIGN hook)`, the derivation table. After "| DR25 |" add V05 §4.4's row DR-SKY under the next free number (J-V5.40), and to the coherence
rows the refusal of the islands setting where the dossier's `site.magic` resolves `none` (V05 §4.4).

**BCR-V5-13 — light, shadow, labels and exports.** Heading: `### 8.4 Layers, shadows, heights`. Current ((a)): "a sky
island under `ghost` or `offset` occlusion". New: "a sky island, under every occlusion mode, as its underside's tiers
(V05 §3.9), each a slab" — so an `opaque` island is never written into the ground's surface layer as a column, whose
shadow would lose the gap and the profile; and at the end of (f) add "A tile an island's drawn land face touches carries
a second base and surface layer for the sky, lit by the same law at the island's true position and composed by the
occlusion mode; a tile no island's land touches is re-lit where an island's shadow falls (V05 §5.3 (2))". Current
((d)): "the sun stands at G = V + s · u, height H = h₀ · D · s (h₀ = `sun.heightRatio`)". New: "…, height H = max(h₀ ·
D · s, 1.5 × the list's `surfaceTopCm` above the view's ground whenever the sky layer is visible and the document holds
an island that is not fallen, whatever is in view) (V05 §5.3 (4))". Current (*Shadow casters*): "sky layers (the island
outline projected by `elevationCm`)". New: "sky layers (each island's underside tiers projected from their undersides,
at rung 3 in the `prism` form whatever `vector.projected` says, V05 §5.3 (3))". Heading `### 8.2 Style sheets as data:
roles, contrast, symbolisation, paint programs, layer order, presets (G-R2)`, the `states` table: add the access rows of
V05 §5.1 (the island rows and the rest of §8.2's sky entries are BCR-V5-18's).
Heading `### 9.1 What is model and what is view`: current "spines: Polyline[] /* area and path labels, world cm, in
order of preference */" → new "… world cm — a sky entity's in its island's local frame, translated by S14 (V05 §5.4) —
…". Heading `### 9.2 Placement (S13b): font metrics, zoom stops, the global greedy evaluated locally`, after "a hidden
underground or sky layer's district, tunnel and cell labels are not candidates" add "; and a visible sky layer's
occlusion rule of V05 §5.4". Heading `### 11.1 Formats`: the GeoJSON, SVG, VTT, glTF and CityJSON rows gain V05 §5.5's
sky content, and PLAT's CityJSON Extension gains `+FloatingIsland` and `+SkyAccess`.

**BCR-V5-14 — budgets, tests, packages, the build plan, streams and anchors.** Heading `### 12.4 CITY per-stage split
(SCL-3)`: add the row "| the sky (owner-staged; V05) | V05 §3 | not on the one-click path; with three islands V05 §6's
rows | (staged) |". Heading `### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT`, T15-1:
current "on 1 000 seeds of a hook fixture whose town supply gives h(S_town) = 1 every count 0–3 is observed" → new "on 1
000 seeds of a hook fixture whose built land lies wholly in the rich band every count 0–3 is observed; the sky's own
bars are V05 §7's T-V5-1 – T-V5-32". Heading `## §14 Package and module layout, key interfaces, dependency rules,
extension points`: add "`@plat/sky` — the sky layer (owner-staged; V05): S7b (5)'s gate, slots, fills, outline and
placement, the hand-over of S3 reservations, `SkyStrategy`, the access siting, the claim search with the crypt test, the island's gradient field, `undersideTiers`, `skyHandover`, `islandShadeStrip` with the shade basis, `skyRoute`, the rim's barrier circuit,
`IslandEpochStep`, the landfall; registered into `StrategyRegistry.sky`, with `IslandEpochStep` also registered as volume
6's epoch participant `sky.islands`; `islandShadeStrip` called at S10a once per shade evaluation by the strips' first
reader (an `S10a.afterDrivers` hook, volume 1's S9b, else field pass 2) and at each epoch's re-evaluation, `skyRoute`
by S10b's distance reads between arenas; depends on `@plat/layout`, `@plat/site`, `@plat/content` and `@plat/kernel`". Heading `## §16
Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2`: add after
M5 the row "| **M6-sky — the sky layer (owner-staged; V05 §8)** | V05 §8's phases P0–P6 | V05 §8's exits | 17.25–23.25 pw,
outside the base total as a staged subject |". Heading `### 6.1 RNG and stream design`: current "`island.place` draws
the island count — three ordered slots (II.6) — and the sky allocations' supported-area fills and outlines (§4.5 S7b
(5), II.6);" → new "`island.place` draws the island count, each slot's reason, and per island its template, bearing,
outline, placement, own relief, river, underside, access kinds and dwell spans, by the creation indices of V05 §3.18;".
Heading `### 6.3 Identity: address ids, lineage keys, carry-over (and the scope of stability, stated)`, the anchor table: add "| sky access (V05) | (its island's address, its role, its ordinal) | the same
island | `SkyAccess.kind` |". In `# Staged by the owner's roadmap (this document defers nothing)`, the underground-and-
islands row gains "the sky layer's build depth: V05".

**BCR-V5-15 — the islands in the daylight term, and the model sampler (item 102; applied beside the coherence pass's
application of g item 102, cited, never restated).** Heading: `### 4.5 S6 Districts, quarters and fields · S7b
Allocation and district claims`, **Fields**. Current: "**pass 2** at S10a (§4.7), adding the kernels around the noxious
trades, prisons, middens and institutions the block allocation placed. S10 onward reads pass 2." New (with BCR-V5-5's
landing kernel): "**pass 2** at S10a (§4.7), adding the kernels around the noxious trades, prisons, middens and
institutions the block allocation placed and the positive landing kernel at each ground sky landing (V05 §3.10), and
OR-ing into the daylight term's mask the shade strip of every live sky island (V05 §3.19) — so an island's shade enters
pass 2 only, one pass, never iterated (item 102 (c)). S10 onward reads pass 2. The **island-free value**, the same
composition without the strips, is composed at an epoch's evaluation for the island supply law alone and never stored
(V05 §3.15 (1)); at S7b the supply law reads pass 1, which holds no island bits." **Mechanism to add**, in the daylight
term's paragraph that item 102's application writes in **Fields** — where that paragraph already states a sun set or a
point layout, its values govern and only the layout rule (iii) is added: "**The model sampler.** (i) Sun positions:
`sunPath` of §8.4 at the site latitude the model holds (a dossier's by volume 8's latitude row, V08 §3.5; else the
intent's; default 50°) — never the style's `sun.latitudeDeg`, which is view data — on the equinox, at the nine hours
whose hour angles are −80°, −60°, −40°, −20°, 0°, 20°, 40°, 60° and 80° (the midpoints of nine equal slices of the day),
each quantised to 1 cdeg; the shadow reach capped at 8 × height as §8.4 caps it — for every model-side source alike:
pass 1's terrain and walls, the islands' strips and the buildings at an epoch (V05 §3.19 (1); J-V5.44). (ii) Sample points: one per 32 m field
cell, its centre — the table cell `daylight.pointsPerCell` (1; or 4, the quarter-cells' centres, the pre-decided
fallback if item 102 (g)'s island bar fails at one point, recorded as a declared shift). (iii) The layout: per cell one
bit per (point, sun), point-major and sun-minor, the shade share the popcount ÷ (points × suns); every model-side shade
source — pass 1's terrain and walls, the islands' strips (V05 §3.19), the buildings at an epoch (V06 §3.4) — writes bits
on this layout and they are OR-ed, so a point shaded by two casters at one sun counts once. (iv) The sampler's digest
(§6.2's hash of the positions, the points and the layout) is recorded by every stored or derived mask that reads it; a
mask whose digest differs is recomputed whole. (v) The islands' strips are computed at every shade evaluation whatever
the daylight weight is (0 included), from each island's persisted `shadeBasis` (V05 §3.19 (6)) — once per evaluation, at
their first read (an `S10a.afterDrivers` hook's, volume 1's S9b, where one reads them, else pass 2's), and held for pass
2's fold and every later reader; at a re-derivation starting after the sky's SKY step and at or before S10a the
islands' bases are written at S10a's start, before step (i) and every hook; an island without a basis (raised or declared
since the last evaluation) casts and receives none; a reader of the daylight
share at weight 0 — the shade map view — reads them as held and never samples an island on demand." Heading `### 8.4 Layers, shadows, heights`, *Sun (K05)*. Current: "in
`path` mode from `sunPath(latitudeDeg, dayOfYear, hour)` (solar declination and hour angle with `dmath`), driven by the
view-state time (§11.3; the simulation module's clock when it runs), the hemisphere following the latitude's sign." New:
the same, then "The same `sunPath` is the model's daylight sampler (§4.5 *Fields*, item 102 (a)), evaluated at the site
latitude on the model's fixed hours and never at the view's time, latitude or sun mode, so no view setting moves a
model value." Heading `### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT`: item 102
(g)'s island clause is V05's T-V5-19, with T-V5-20 and T-V5-21 beside it.

**BCR-V5-16 — siting across arenas and custom chains on islands (items 103 and 104; applied beside the coherence pass's
application of g items 103 and 104).** Heading: `### 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b
Placement · S11 Site plans and footprints — the plot model`, *Supply distances by mode (item 16 (b))*. Current: "`road`
distance is the `street` distance to the gate through which the provider is reached plus the provider's distance beyond
it." New: the same, then "**Between arenas** — a plot on a sky island and a provider or relation target on the ground,
or the reverse, or two islands — every mode's distance is the **route** through the island's admitted accesses (V05
§3.20 (1)–(2)): the `street` leg on each arena, a transfer allowance per ride and the ride's run, as `road` runs through
a gate; a `river` or `sea` leg never crosses arenas (∞). Every relation row and supply edge whose two ends lie on
different arenas reads the route, except the nuisance rows (emits against sensitive-to, upwind and downwind), which
read the straight distance in three dimensions; upstream and downstream never cross arenas. Inside the pooled S10b a
class on an island stands at its island's land centroid for the ground's reads; a chain — custom or the dossier's
`activeChains[]` — with nodes on an island and on the ground is measured by the route and reads as stretched through its
landing, close at street scale only on the ground (V05 §3.20 (9)). **The supply web across the arenas** (items 105 and
107, beside the coherence pass's application): a consumer binds to its nearest provider by the route when the two stand
on different arenas; a cross-arena consumer counts toward its provider's two-way pull at the foot of the access its route
used (a ground consumer of an island provider at that access's top); a split class's shop may stand on an island while
its works stays on the ground, one item joined by `branchOf`; at generation each arena's order and relaxation read only
the other arena's proxies (the island's land centroid; the ground provider's S10a block); `comfortM`'s plateau reads the
route length; same-kind spacing applies inside island districts (V05 §3.20 (10)–(12)). In **S7b (1)**'s supply term, a
sky pseudo-district is one consumer location at its island's land centroid's world point (`anchor` + the outline's
centroid, fixed by S7b (5)'s placement) — the proxy the ground pool reads for an island's classes (V05 §3.20 (1)) — since
the landing feet are sited only at SKY, after S7b; the term's centroid distance (volume 1's χ̃, V01 V1-3.2 (5)) reads that
point."
Heading `### 4.5 S6 Districts, quarters and fields · S7b Allocation and district claims`, S7b (5), after the sentence
BCR-V5-5 appends, add: "The carried workplaces follow `IslandRule.carry` (V05 §3.5 (3)): never a heavy processor or a
wholesale and storage class (item 107 (a)), a class whose siting profile emits smell, smoke or water pollution at the
profile's top step, a class with a hard need for running water, a river bank, the harbour, a gate or a quay, nor a
resource or processing node of an active chain (custom or `activeChains[]`) other than the island's own institution; a
split class's shop may go up while its works stays (item 105 (h)); households a dossier district-defining record's raised
share holds are never taken. Where item 103 (f)'s coverage step spreads a class's members over catchment units, an
island counts as its k districts (volume 1's `skyDistrictCount` with `districtHa`, V05 §3.12) for a row counted by district or neighbourhood, as one unit
for a walking-radius row and as ⌈its carried households ÷ N⌉ units for a household row, read beside the ground's
districts, and an add that would carry the island's plot land past `fill.coverageOvershoot` × `plotShare` · `A`
(`plotShare` volume 1's `hood.constants.sky.plotShare`, V01 V1-3.14; its default the base's dense-core share, §4.2 S2)
skips that unit
(V05 §3.5 (3)). An institution slot whose instance holds an S3 reservation hands it over (V05 §3.5; BCR-V5-19)."
Heading `### 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our
values)`: the siting-profile columns item 103 (a)'s application adds carry, on `sky_landing` and `sky_landing_top`, the
facts of V05 §2.4 (the rows volume 11's); `sky_landing` is a positioned class, placed by its access and never by a
pull. Heading `### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT`: the siting
statistics suite of item 103 (e) runs V05's T-V5-22 on its island seeds, and item 104 (g)'s and (h) (8)'s bars run
T-V5-23 and T-V5-24 there.

**BCR-V5-17 — the magical node in the town supply.** Heading: `## II.6 The staged layers — floating islands and sewers:
the hooks the base carries now`, the island rule (3). Current: "and none is carried where `h(S_carried) = 0`." New: the
same, then "A dossier whose `site.deposits` lists a `magical_node` in state `available` (or `discovered`, from the
next epoch) raises `h(S_town)` by the rule's `node.bonus` (0.25, clamped to 1) wherever it is above 0 — never from 0,
so the owner's rule stands (V05 §3.3; the deposit mapped by volume 8's deposits row, V08 §2.6)." In `interface
IslandRule`, the field `node: { bonus: number }` (V05 §2.4, carried by BCR-V5-4's whole-interface replacement).

**BCR-V5-18 — the sky's marks in the style sheets (C5-20).** Heading: `### 8.2 Style sheets as data: roles, contrast,
symbolisation, paint programs, layer order, presets (G-R2)`. (1) *Roles* — current "`plank`, `grid`, `snow`, `lights`."
New: "`plank`, `grid`, `snow`, `lights`, `sky.ground` (the land of a sky island, V05 §5.1: never `ground` itself, so an
island reads against the ground beneath it)." (2) *Slot resolution* — after "Shipped sheets: `{ slot: 5, semantic:
'way.*', passes: [1] }`" add the sky's entries, in every shipped sheet (`ink`, `lit`, `hatched`, `night` and the parity
presets): `sky.island.land` slot 3; `sky.island.underside` slot 2; `sky.island.rim` and `sky.mist` slot 8;
`sky.island.shadow` slot 10; `sky.island.tether` slot 17; `sky.fall` and `sky.access.*` slot 19;
`sky.island.shadeStrip` and `sky.island.shadePending` slot 25; each with the per-family facts of V05 §5.1's slot table,
the values in volume 11's palette rows. (3) The `states` table — current "| island | `fallen` | the ground layer (the ruin
face) | replace: the `ruin` program's rubble stipple over the ruin face |". New: "| island | `fallen` | the ground layer
(the `fallen_island` decoration's members, V05 §3.16) | replace: the `ruin` program's rubble stipple over the members'
faces and bands |", and add the row "| island | `removed` | the sky layer | replace: nothing drawn, no label, no shadow
(V05 §4.2) |". The CI test that loads every shipped sheet at every band (§8.3) covers the sky semantics.

**BCR-V5-19 — reservations an institution island leaves (C5-02).** Heading: `### 4.2 S0 Blueprint · S1 Site · S2
Programme · S3 Siting, reservations, the stage-1 boundary and its trace`, S3 (2). Current: "The **temple or cathedral
precinct** adjacent to the main plaza by score, sized from its institution row". New: the same, then "— not reserved
where the creation prefix sends its institution to a sky island (a T5 `sky` declaration of its kind or a T6
`criteria.sky` assignment, V05 §3.5); likewise the reservation a palace takes by the castle's siting rules (S3 (8)). A
reservation whose institution a later S7b (5) slot takes up is handed over by V05 §3.5 (the row's hand-over class, else a
park), never left without an owner". Heading `### 2.5 Districts, quarters, blocks, plots — the PLOT MODEL, reservations,
allocations and the context vector`, `Reservation`: current "owner?: Id /* castle, institution, commons */;". New:
"owner?: Id /* castle, institution, commons */; handedFrom?: Id /* V05 §3.5: the institution whose reservation this was
before it went up to a sky island; the owner is then its hand-over instance, or commons for a park */;".

**BCR-V5-20 — a ground landing's attach as an infill destination (C5-07).** Heading: `### 4.6 S8 Infill — the measured
bent cut as a kernel transaction, per district, with the deep-interior rule`. Current: "(a reservation inside a face is a
hole)". New: "(a reservation inside a face is a hole; a `landing` reservation's attach vertex that no way meets when S8
starts — a sky landing claimed at its foot, V05 §3.10 (4) — is a destination the district's infill must reach: S8's
first cut in that face runs from the attach to the nearest way by the lane rule, as a gate's attach is reached, before
the face's own recursion)".

**BCR-V5-21 — the island's shade basis on load (C5-01).** Heading: `### 2.9 The document and serialisation`, *What the
snapshot holds*. Current: "an editable document recomputes them from their drivers and the stroke list on load (§4.5,
§7.2)". New: the same, then "— the one sky input that recomputation reads is each island's persisted `SkyIsland.shadeBasis`
(V05 §2.1), from which the islands' shade strips are rebuilt, never the island as it now stands, so the shade's lag
behind an island edit (item 102 (e)) survives a save, a load and a replay; an island without a basis — raised or declared
since the last shade evaluation — casts and receives none, and the load never computes a basis from its absence". Heading
`### 7.5 Migration and upgrade (G-P9)`, item 1. Current: "a sequence of pure, versioned transforms over the document
format, forward only". New: the same, then "— among them the sky's island-basis step (V05 §2.6): a document whose
`schemaVersion` predates it gets, once, the `shadeBasis` of every island not fallen or removed, computed from the island
as stored" (seam ST-49).

**BCR-V5-22 — the global light's window without the slabs (C5-08).** Heading: `### 8.4 Layers, shadows, heights`, (c).
Current: "R = (Z − z) ÷ (m − σ_s), Z − z being the display list's `surfaceTopCm` (§8.1) less the pixel's elevation".
New: "R = (Z − z) ÷ (m − σ_s), Z − z being the display list's `surfaceLayerTopCm` (§8.1) less the pixel's elevation;
each slab of the slab list whose shadow sweep — its outline swept away from the sun from (underside − z) ÷ m to (top − z) ÷
(m − σ_s) — crosses the ray's plan is tested exactly over that reach, whatever R is, and a tile culls the slabs whose
sweep's bounding box misses it (V05 §5.3 (2))". Heading `### 8.1 The display list (renderer-independent, columnar,
incremental)`, `DisplayList`: current "surfaceTopCm: Cm /* the greatest elevation above the document's datum". New: add
beside it "surfaceLayerTopCm: Cm /* the same over the surface layers and pyramids only, without the slab list — §8.4 (c)'s
Z (V05 §5.3 (2)); `surfaceTopCm`, which counts the slabs, stays the cursor sun's floor */".

**BCR-V5-23 — the island step's households in volume 6's epoch (C5-19; a cross-volume request, listed for volume 6's
revision).** Volume 6 §2.1, `interface EpochOps`: current "ops: (ConversionOp | EditEvent)[] … waited: Id[] … report:
Partial<EpochReport>". New: add "demandTaken?: { band: string; count: number }[] /* households a participant takes up
from the epoch's delta demand (a refloated or raised sky island, V05 §3.15); the `siting` step subtracts them before it
houses the delta demand */". Volume 6 §3.8.1: current "Households a hazard, a contraction's strip or a Works displaced
this epoch". New: "Households a hazard, a contraction's strip, a Works or the island step (cause `island`: a wane, a
settle, a fall, V05 §3.15) displaced this epoch". No base section changes: the channel is volume 6's.

**BCR-V5-24 — the void face at L0 (C5-44).** Heading: `### 2.2 The plat — one arena per layer, five refinement levels
as views, roles instead of stored indices`, rule 1. Current: "**L0** faces: land components, sea, lakes, river reaches,
islets, ponds, moats — land and water only." New: the same, then "On a sky island's arena the face between its outer
ring and its rim is the **void** (L0 kind `sky`, V05 §3.8): no land, no water, never cut or plotted — the one L0 face
that is neither."

**BCR-V5-25 — the lifecycle rows of the sky's events (C5-44).** Heading: `### 7.4 Lifecycle of every edit kind (create ·
read · persist · regenerate · undo · migrate) — G-P8`, the table whose header is "| kind | create | read | persist |
regenerate (how the engine honours it) | undo | migrate between output versions |". Add two rows. The row
"placeSkyAccess (V05)": create — T4's stroke, or `placeSkyAccess` by API; read — `SkyAccess` and its landings; persist —
the log; regenerate — kept by regeneration, its top re-seated on a re-derived rim (V05 §4.3); undo — removing its top, its
claims and its landing designation; migrate — address mapping. The row "regenerate with the scope `shade` (V05)": create
— T10 or a shade fate's button; read — the island's `shadeBasis`, its strips and the field cells of its two windows;
persist — the log; regenerate — replayed as the same scoped shade evaluation; undo — restoring the former basis, strips
and field cells; migrate — as any `regenerate`. And two more (C5-51, C5-47): the row "convert removeIsland (V05)":
create — T9's delete on an island, or the clerk; read — the island record's state `removed` and `removed`, every
re-derivation's S7b (5) and every epoch; persist — the log; regenerate — honoured as a hold: the slot is never drawn,
filled or re-opened while the record stays `removed` and unreleased (V05 §3.2 (6)); undo — the island restored from the
undo record (its arena from the archive, its households, accesses and landing uses); migrate — address mapping. The row
"reclearIsland (V05)": create — the epoch participant `sky.clearance` only; read — the island's altitude readers;
persist — inside the epoch event; regenerate — replayed with its epoch; undo — with the epoch; migrate — as the epoch.

**BCR-V5-26 — the landfall's quarried land (C5-25).** Heading: `### 2.7 Walls, gates, towers, castle, bridges; greenery,
land use, decorations, pins; labels; content entities; the staged layers' records`, `interface LandUse`: current
"reclaimed?: { from: 'marsh'|'foreshore'; epoch: number }". New: the same, then "; source?: Id /* a `fallen_island`
decoration whose rubble this `quarry` works (V05 §3.16): a surface rubble working that sources no underground quarry
system, no mine–cavern breach and no dig-down draw (II.7.6) */".

**BCR-V5-27 — a retaining wall on a sky island's arena (C5-50; applied once the coherence pass has applied item 110).**
Heading: `### 2.7 Walls, gates, towers, castle, bridges; greenery, land use, decorations, pins; labels; content
entities; the staged layers' records`, the `RetainingWall` record item 110 (a) adds. Current (file g, item 110 (a), the
text the application carries): "a chain on the ground layer holding level ground on its high side". New: "a chain on the
arena whose terrain it levels — the ground's, or a sky island's (V05 §3.22 (4)) — holding level ground on its high side";
and in the record's lifecycle add "on a sky island: generated by the island's unit run, drawn by T3 `retaining` or a T2
terrace stroke with the island's `key`, never on the rim strip, tombstoned with the island at a fall (V05 §3.16 (7))".

**BCR-V5-28 — the clearance after growth in volume 6's epoch (C5-47; a cross-volume request, listed for volume 6's
revision, beside BCR-V5-23).** Volume 6 §3.2, the participant table: add the row
"| `afterGrowth` | 50 | `sky.clearance` | `@plat/sky` | V05's clearance re-check after growth (V05 §3.15 (7)) |"; step 15's text "participants, in order:
`under.extend`, `under.access`, `under.undercity`, `hood.fabric`" → "…, `hood.fabric`, `sky.clearance`". The participant
reads `EpochScope.built` and, where volume 6 adds them (critique-V6 C6-45 (1)), `.raised` and `.levelled`, and returns
`reclearIsland` ops in `EpochOps.ops`. No base section changes: the table is volume 6's.

**BCR-V5-29 — item 110's raised ways and the sky (C5-48, C5-49, C5-52; applied once the coherence pass has applied item
110).** Heading: `### 4.3 S4 Backbone — arterials routed between named destinations, built as one graph`, in the
raised-way text the application writes there for item 110 (b) (and wherever it places the elevated road and the
aqueduct). Current (file g, item 110 (b)): "at CITY and METROPOLIS the generator raises a way where there is a reason,
each a soft rule with a table chance and a count cap per rung". Mechanism to add: "(a) **The slot.** Every generated
raised part is committed before S7b (1): a viaduct inside S4's route solve, an elevated road and an aqueduct at S6's end
(volume 1's BCR-39), so S7b's capacity and the sky layer (V05 §3.1) read it and it reads no island. (b) **Endpoints bind
to reservations.** An elevated road's endpoints are reservations (the citadel's site, a great temple's or cathedral's
precinct), never the institutions in them; a reservation an institution island hands over (V05 §3.5) keeps the road, its
reason reading through the hand-over. (c) **Ground arena only.** At an epoch and in every post-build request the
generator's endpoints and evidence are ground-arena entities (`PlatKey.layer` `'ground'`, any part), never a sky ward,
institution or landmark. (d) **Water.** The aqueduct's need reads the S2 population whole at generation and the ground
households at an epoch; its sources are the ground's springs and rivers only, and no aqueduct part stands on a sky arena.
(e) **The accesses.** The course solver, for every raised part laid after the sky layer's SKY step — an epoch's, a T4
stroke's, or a generation stage's after SKY — reads `skyAccessObstacles` (V05 §2.3b): the deck, its parapet and its
raised-way piers stay outside every column dilated by `accessSiting.deckGapM` and below every segment by its clearance,
else the course re-routes by the solver's ladder or is not built, reported. (f) **No way into the sky.** A raised part's
two ends are ground vertices; a T4 `raised` stroke ending on a sky island's rim is bent into
`placeSkyAccess` and an aqueduct stroke there ends at its last ground vertex (V05 §4.2; J-VI.4 (d)), and none lies on a sky arena."

**BCR-V5-30 — levelling as datums, the field's receivers unlevelled (C5-54; applied once the coherence pass has applied
item 110).** Heading: `### 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b Placement · S11 Site plans and
footprints — the plot model`, in the levelling text item 110 (a)'s application writes for S10 and S11. Current (file g,
item 110 (a)): "the generator raises one where a block, a plot or a ward is levelled on ground steeper than
`terrace.slopeMin` and the step exceeds `terrace.stepMinCm` (S10 and S11's levelling". Mechanism to add: "A levelled
block, plot or ward is a **platform datum** and **never a write to the `Terrain` raster**. Levelled heights have one
reader function, `levelledGroundCm(doc, key: PlatKey, p: PointCm): Cm` (pure, draw-free): the datum of the levelled
plot, block or ward holding `p` on the arena `key` — the ground's, or a sky island's (V05 §3.22 (4)) — else the
unlevelled raster there (bilinear). Its readers: the buildings' datum step (volume 2's `deriveBase`); the ways'
stair-or-ramp crossing rule; the retaining walls' derived step profile (volume 1's `stepProfile`, its BCR-43); volume
1's island bridge build after S8, `deckCm` from the two bank elevations on the island's key, where nothing is levelled
yet (V01 V1-3.10.3 (4); V01's BCR-45, file f item 580; seam SLR4-04); volume 4's wall-face knots (N6–N7), arch-vault floors and foundation obstacles (V04 §3.2, §3.5.0, §3.5.4), the span rule of
volume 4's BCR-45, volume 4's buried floor under a raised grade (V04 §3.5.5) and its village working's depth test (V04
§3.5.7 (a)); and the sky's surface top, crypt re-test and clearance check (V05 §3.9 (4)–(5), §3.10 (5)). Every
**field** reader of the raster (the prosperity field and its daylight term, the islands' strips, V05 §3.19 (3), volume
6's building shade mask) keeps the unlevelled heights, S1's raster with the T2 terrain strokes, before and after S10 and
S11 alike (seam SL-26). Should the application need levelled heights in the raster, it keeps the unlevelled heights
readable as the raster the field reads, and every field reader reads that one."

## 11 Owner questions

1. **Product order among the layers: the sky before or after the underground?** Both are toggles the owner placed after
   the city is mastered; neither needs the other. **Recommendation:** the underground first (volume 4) — sewers are part
   of every realistic city and the realism tiebreaker ranks them ahead of a fantasy toggle that is off by default — then
   M6-sky; its cheap P0 spike can run beside M5 so the island's hand-over to the neighbourhood unit run is settled while
   volume 1 is built. If the owner wants islands first, M6-sky can follow M5 directly with no rework.

## 12 CONFIRMED versus PLAUSIBLE

**CONFIRMED (read on 2026-09-28):** every base citation — II.6's island rule and hooks, II.1 rule (5), §1.1's
`RungProfile.layers`, §2.1–§2.3, §2.5, §2.7's `SkyIsland`, `Decoration` and `LightSource`, §2.8, §2.9, §4.1, §4.2 S0 and
S1 (2)–(5), §4.5's fields (its two passes), bands and S7b (5), §4.7's S10b solver with its supply distances by mode and
its light rules, §4.9's family sentence, §4.11's island kinds and landfall text, §5.2, §5.3, §6.1, §6.3, §7.1's events,
tools and targets, §7.7's derivation table (DR1–DR25) and the dossier digest's `site.deposits`, §7.8, §8.1, §8.4 (the
`SunSpec` with `latitudeDeg` and `sunPath`), §9.1, §9.2, §11.1, §12.4, §13.2's island tests, §14, §16, D-3 and the
staged table — read in `docs/ARCHITECTURE.md` as it stands after the amendments c–e pass and the hand-fix (lane log:
`amendments-c/closing LANDED`, `handfix-c/apply LANDED`); items 2, 10, 13 and 15 read in `docs/AMENDMENTS-2026-09-25.md`
and `-25b`; the owner's words in `docs/DEFINITION.md` and `docs/OWNER-INSTRUCTIONS-2026-09-25.md`, its entries of
2026-09-28 (J98 to J104) included; items 102, 103 (a)–(f) and 104 (a)–(h) read whole in `docs/AMENDMENTS-2026-09-28g.md`,
and found not yet applied to the base (no daylight term in `docs/ARCHITECTURE.md` at 18:00), so BCR-V5-15 to BCR-V5-17
are written against the pre-application text and cite g; the retrovalidation's two findings on islands (RV-pc-1: no
generation path for the sky run, answered by volume 1's unit run and this volume's hand-over; RV-pc-3: the town
supply's unreachable top and knife-edge gate, answered by V5 §3.3) read in `docs/retrovalidation/pipeline-content.md` and
found unapplied in the design; the sibling volumes this one wires to read at their landed or current text — V01
§2.4 and §3.10.3 (the unit runner and the island's partition), V06 §2.1, §2.6, §3.2 and §3.4 (the participant, its step
and the building mask's layout), V08 §2.6 (the deposits row mapping `magical_node` to this supply) and §3.5 (the site
latitude); the collision on DR26 (proposed by V01, V06 and V08 as well as this volume's first text) found by grep; the
Neighbourhood lone patch's look read in `research/findings/vg-ng-devlogs.md` §B3.5 and
`research/findings/watabou-extra-a.md`. **Executed:** the nine model suns at latitude 50° on the equinox, hour angles −80°
to +80° by 20° — altitudes 6.41°, 18.75°, 29.5°, 37.16° and 40.0°, azimuths 97.7° to 262.3°, reaches 8 (capped), 2.95,
1.77, 1.32 and 1.19 — computed from the standard solar formulas (the numbers of V5 §3.19 (9)); every one of V5 §10's 30
quoted headings found verbatim in the base, and all 29 quoted current texts found in it after whitespace
normalisation (a script over V5 §10 and the base, both run at 18:05 and again at 18:13 after the pointer pass). No reference code, class name, word list or table
was read for or copied into this volume.

**PLAUSIBLE until executed:** every mechanism, default row and number this volume adds — the supply rows and the node
bonus, the fill with its noxious and chain-node exclusions, the placement score and its weights, the outline and
underside rows, the terrain echo and the river's share, the access rows and limits, the landing geometry, the light
rows, the dwell spans and rates, the landfall's cover share and stone yield, the strip's cost and its gentle effect
(V5 §3.19 (9) is a derivation from the defaults), the sampler's one point per cell being fine enough for item 102 (g)'s
island bar, the route's transfer allowance, the chain rule's measured effects, the budgets and the estimates — until
M6-sky's P0 spikes and the phase exits measure them (V5 §8), with the pre-decided fallbacks of V5 §3.3, V5 §3.9 (5), V5 §3.17 and V5 §6.
The sibling volumes this one wires to (V01, V06, V08) and the content volume (V11) that writes the siting rows were being
written in parallel; the contracts between them are stated here as tests (T-V5-9, T-V5-21 (f)–(g), T-V5-24, T-V5-25),
and the integrator reconciles the volumes' words for the same call — in particular the DR-SKY number (J-V5.40) and, if
item 102's application states a sampler, its values over V5 §3.19 (1)'s defaults (J-V5.42).

**The revision (lane volumes/revise-V5, 2026-09-28, against `docs/volumes/critique/V05.md`).** CONFIRMED by reading: the
base texts the new requests quote — §2.9 *What the snapshot holds* (the fields recomputed on load), §8.4 (a) and (c) (the
slab restriction; the window R from `surfaceTopCm`), §8.1's `surfaceTopCm` counting island slabs, §8.2's *Roles*,
*Layer order* (slots 1–25), *Slot resolution* (the refusal rule) and the island `fallen` row, §4.2 S3 (2) (the temple or
cathedral precinct), §2.5's `Reservation` (`owner`), §4.6 (a reservation a hole), §2.2 rule 1 ("land and water only"),
§2.7's `LandUse` and `Greenery.along`, §4.5's ε and smoothing, §4.9's churchyard row, §7.4's table header; file g items
105–108 and 109 (f), (k) as revised ~20:05 (J111), read whole; volume 1 §2.1's `FabricStrategyId` list and §3.10.3 (the
seven lines the reconciliation replaces), volume 6 §2.1's `EpochOps` and §3.8.1's displaced pool, volume 9 §2.7, §5.4
and §6.4 (the veil and the on-demand sampler), volume 10 §2.13 (`WhyProvider`, `WhyAnswer.closure`, `FieldDrivers`),
volume 11's `cathedral`, `great_temple`, `church`, `palace`, `town_hall`, `mage_tower`, `mages_guild` and district-kind
rows, and the sibling critiques' expectations of this revision (critique/V03.md's rim-slab vault as the island form of
the crypt ladder; critique/V11.md's `sky-*` keys and its V11C-32). The critique's executed receipts (the frame against a
spindle, k for a full island, the root's tier widths) are its own (`scratchpad/volumes/critique-v5/receipts.out`); the
geometry that a flat island's `depthCm` 0 floors no root and that the crypt test passes for terrain above −6.8 m with a
10 m rim is arithmetic from the defaults. **PLAUSIBLE until measured:** the gradient's band shares within ± 5 % under the
smoothing (P0, with its fallback in V5 §8), `districtHa`'s district counts (T-V5-9's ≥ 90 %), the reachability filter
leaving F-SKY-PLACE's rates intact, the light pass's + 5 % on uncovered tiles (P3), the strip corridor's pre-test cost on
mountainous relief, and every new default (`districtHa` 3.5 / 4.5 ha, `fabricPrior` 3, `frameMarginM` 40 m, the stair's
helix, `cryptFloorM` 1 m, the rank weights 0.6 / 0.4, the band inset 0.1, ε's 120 m wavelength) — each `own` and
calibratable, each with its bar in V5 §7.

**The second revision (lane volumes/revise-V5, 2026-09-29, against the item-110 addendum, `docs/volumes/critique/V05.md`
§9, C5-47 to C5-58).** CONFIRMED by reading: item 110 (a)–(f) in `docs/AMENDMENTS-2026-09-28g.md` (md5 7b3ab8ad…), as
revised ~23:40; the base (md5 01fea21f…) holds no raised-way, retaining-wall or aqueduct text (grep: 0 hits), so
BCR-V5-27, BCR-V5-29 and BCR-V5-30 are written against file g's words, to apply once the coherence pass has applied item
110; II.1's "sky: no portals, no roads in or out"; §7.4's replay semantics (an ordered fold, the creation prefix the one
read-ahead) and its `delete` and `convert` rows, and §7.1's `{ t: 'delete'; id }` with no detail, which is why an
island's removal is a conversion that keeps a live record (J-V5.62) rather than a log read-ahead; volume 2 §2.6
(`BaseWing.on`, `MassingRef.stack`, `DeckContext`, "a raised way's deck carries no plot", J-V2.71) and §3.15.2 (the stack
envelope that "volume 5's clearance" reads, X20); volume 6 §3.2's step table (`afterGrowth` at step 15, its participants
to order 40, `works` at step 18); the sibling critiques that name this volume's item-110 parts — critique-V6 C6-37 (the
epoch's raised-way pass reading ground-arena entities only and binding reservations), C6-38 (removals suppress their
reason), C6-45 (3) (`sky.clearance` at `afterGrowth` order 50) and C6-51 (2) (the unlevelled receiver); critique-V1
V1C-69 (BCR-39's slot before S7b (1)); critique-V9's `bend.raised.island` and `info.remove.holds`; critique-V4's
"raised-way piers" usage. **PLAUSIBLE until measured:** whether item 110's arches and decks sit near or above
`casterAllowanceM` (volume 11's raised-way height rows are not yet written; V5 §3.9 (5)'s P0 run with item 110 on
decides it, with its fallback); `deckGapM` 4 m and `lineClearM` 8 m (own); the cost of `sky.clearance` (≤ 1 ms per
island); how often the unit run's levelling bites on an island's gentle relief; and that no generation stage after SKY
raises a way (true under the recommended slot; the obstacle export covers any other).

**Reconciliation round 1 (lane volumes/reconcile-V05-r1, 2026-09-29, against the seam checks
`docs/volumes/critique/seam-layers-r0.md` and `docs/volumes/critique/seam-time-r0.md`).** CONFIRMED by reading: volume
1's §3.1 pipeline and hook table (S7c at `S7b.afterGreedy` reading `reservations (S3)`; S9b at `S10a.afterDrivers`
reading the landings and the islands' strips), its §2.3 `DistrictContext.shade.islandShare`, its §3.5.5 manor sun
factor (the strips evaluated once at S9b's first read, J-V1.58) and its §3.14 row homing `sky.plotShare`; the base's
§4.1 *Registration and order* (a cycle is a registration error at load), §4.12's `StageDecl { inputs; outputs }` and
§7.5's schema chain (the quoted text found once; base md5 01fea21f, unchanged); file f items 213, 245
(`RetainingWall.state` `'decayed'|'ruined'`), 260 (a cap increase opens only new keys), 282, 309 and 447 (the
`retaining` LineString's properties); volume 6 §3.19.2, §3.19.4 (1)–(5) and §3.19.5 (1)–(4) (a struck deck's plots
tombstoned, a repaired deck's faces re-offered); volume 2 §3.16 (7); volume 4's BCR-45 as the span rule's home and its
§3.2, §3.5.0 and §3.5.4 as the levelled-ground readers. **PLAUSIBLE until the sibling lanes land:** that volume 6's
reconciliation adds §3.19.4 (6)'s restoration (seam ST-10), §3.5.2's landfall candidate (seam ST-13) and §3.4 (8)
(b)'s no-mask clause for a raised island (seam ST-49), which this volume now cites; and that volume 1's keeps S7c's
read-set to S3's and S7b (3)'s reservations (V5 §13 items 18–19). **Reconciliation round 2** (2026-09-29):
CONFIRMED by reading — volume 4's report line `ruin.node: { deposit; ruin; name }` written at T6 (V04 §3.5.0a (9),
T-V4-74 (d)); volume 1's rim walk along the strip's inner setback line with no way (V1-3.10.3 (4), BCR-10 (c)), its
`NeighbourhoodResult.districts` (V1-2.4) and its §3.14 row homing `sky.plotShare`; volume 4's `CatacombRule.count` with
`churchesPer` (V4 §2.3) and its count rule (V4 §3.5.1 (3)); volume 6's `Way.formerClass` naming this volume's landfall
as a writer (V6 §2.8), its landfall clearance restoring from it (V6 §3.5.2, T-V6-66) and `EpochContext.rung` from the
fold (V6 §2.1, §3.1 (3)). **CONFIRMED since** (read by reconciliation round 4): volume 1's `skyDistrictCount(plotLandM2,
districtHa)` in V1-3.16, called by V1-3.10.3 (2) (seam SLR1-12; V5 §13 item 21), and volume 6's lifecycle row for
`formerClass` naming the landfall (V6 §2.12's row and W11; seam TR-19; V5 §13 item 22). **Reconciliation round 3**
(2026-09-29): CONFIRMED by reading — volume 1's χ̃ (V1-3.2 (5)) reading S7b (1)'s district supply term by centroid
distance at S7c, and this volume's §3.1 running S7b (5)'s placement before S7b (1) and SKY after S7b, so the island's
land centroid exists when the term runs and no landing foot does; volume 1's J-V1.87 with its sky-arena shade readers
(V1-2.3, V1-3.5.5, V1-3.8.2); volume 4's two further `levelledGroundCm` readers (V4 §3.5.5's buried floor, V4 §3.5.7
(a)'s village working); J-VI.4 (a), (d)–(g)'s bend lines (`_integrate.md`); file f item 575's `Enceinte.condition`
profile naming this volume's landfall as a writer, item 244's `supports`/`spans` keys and volume 4's BCR-45 ("minted
once in order along the deck, never reused"); volume 6's §3.5.2 member-leaving `setAttr` (J-V6.108) and `SpanRef` "never
stored in a record" (V6 §2.13). **CONFIRMED since** (read by reconciliation round 4 in the landed files; seam TU-08): volume 1's
V1-3.10.3 (6) *After generation* and V1-3.2 (5)'s parenthesis (reconcile-V01-r3, landed 06:08; V5 §13 item 23); volume
6's three member forms in §3.5.2 and W76 and its repair of a breached ring in use in §3.7.5 (reconcile-V06-r3, landed
06:17; V5 §13 item 24); file f item 252's *Needed by* V04, V05, V06 (reconcile-BASE-F-r3, landed 06:08; item 25's first
half). Item 25's second half, item 309's reader list, was seam TU-07 (c), file f's (§13 item 25); it is CONFIRMED by
reconciliation round 5 (below; seam TV-06).
**Reconciliation round 4** (2026-09-29): CONFIRMED by reading — volume 1's V1-3.10.3 (4) crossing-site rule (a site
qualifies when both deck ends lie on the unit's outline face; an unreached far bank leaves a `site`, reported; J-V1.91),
its (6) (a)–(c) (no scoped mode; the faces at a moved rim re-derived by each receiving district's scoped re-derivation
after this volume re-lays the strip; J-V1.90; its "each receiving district" wording landed with reconcile-V01-r4 at
07:14, seam SLR3-04), V1-3.17.7 (2)'s relief-class read (J-V1.94; "its drawn class" now naming
`terrainEcho.reliefClass`, this lane's counterpart edit) and the base's S0 relief classes
(plain, rolling, hilly, mountainous; §4.2 S0, S1 (1)); file f item 575 drawing a tower by its run; volume 6's
ring-in-use repair (V6 §3.7.5). PLAUSIBLE: the resize floor and the reshape's bend-back (J-V5.77), this volume's own new
mechanism, untested until M6-sky's P6 (T-V5-14). Volume 6's towers and gates following their runs in its repair,
absorption and drawing (seam TU-01; §13 item 27), which this paragraph held PLAUSIBLE, is CONFIRMED by reconciliation
round 5 (below; seam TV-06).
**Reconciliation round 3's continuation** (2026-09-29; SCC-R2C-15): CONFIRMED by reading — V12 §3.11's default line (its
id, owner rule, `corpus` at M-CAL, its fallback, and `--defaults` writing only columns with no entry), the provisional-
number lint and *Milestone exits* (every volume's landing exits green), X-V12-16's clause, J-V12.21 (the staged layers
join M-CAL's process by later runs), V11 §3.1's rows 51 and 56 (`lights.json`; `islands.json`, "written (V05)"),
BCR-V5-4 (the table whole at P1) and BCR-V5-8 (`radiusMarginM`). Round 3's seven issues were re-read in the live text
and stand as that round's note records. Volume 12's dating of a staged layer's default entries when the layer lands
after M-CAL's record, which this paragraph held open, is CONFIRMED by reconciliation round 5 (below; §13 item 29; seam
SCC-94).
**Reconciliation round 5** (2026-09-29): CONFIRMED by reading the landed files — volume 6's towers and gates following
their runs' `condition` in its repair, absorption and drawing, with no Works on a wall, tower or gate (V6 §2.8's
`repairWall`, §3.7.2 (3), §3.7.5, §5.1, J-V6.112, J-V6.114; X41: "this volume's side is landed"; reconcile-V06-r4,
landed 07:31; seam TU-01), which V5 §3.16 (4) relies on (§13 item 27; seam TV-06); file f item 309's reader list with
volume 4's buried floor under a raised grade and its village working's depth test, the working read from the later of
M6-U and the village product (reconcile-BASE-F-r4, landed 07:19; seams SLR3-12, TU-07 (c); §13 item 25's second half;
seam TV-06); V12 §3.11's *The due's corpus run*, which dates a column whose first compiled cell lands after M-CAL's
`ReconciliationRecord` to its layer's later run, `M-CAL/sky` for M6-sky and this volume's phases (J-V12.75; X-V12-17:
"V5 §13 item 29 is met"; reconcile-V12-r4, landed 11:59), which P1's and P2's exits rely on (§13 item 29; seam
SCC-94); the base's `Gate` — `kind` one of `main`, `postern`, `water`, `gatehouse` and `castle`, every gate with a
`footprint` and no state (§2.7; base md5 01fea21f, unchanged) — which V5 §3.16 (2), (4)–(5) now cover whole (seam
TV-04); volume 1's island bridge build after S8 reading `levelledGroundCm` on the island's key for `deckCm` (V1-3.10.3
(4); its BCR-45, file f item 580), now in BCR-V5-30's reader list (seam SLR4-04). CONFIRMED since round 6, landed
with `reconcile-V01-r5` (12:40): V1-3.10.3 step 4's island-level `plantRimWalk` with its callers (the unit run once
after its districts' S12b; a resize and a rim reshape once, after this volume's island L1 batch and the district
re-derivations) and (6) (c)'s claim re-search, *A re-searched institution claim*, which releases the island
institution's use and building from V1-3.9's fixed inputs for the event (seams SLR4-01, SLR4-02), read there, in
V1-3.9, V1-6 and T-V1-21 (V01 md5 15a69be1 as landed; seams SLR5-06 (a), TW-09) — which V5 §4.2, §1b, §2.6, §3.12,
§6, T-V5-14 and J-V5.77 cite (§13 item 30; seam SLR4-03).
**Reconciliation round 6** (2026-09-29): CONFIRMED by reading the landed files — file f item 309's reader clause for
volume 1's island bridge build in BCR-V5-30's words, its label split (the sky key's raster fallback STAGED at M5 with
item 580, built by volume 1's W8; the sky datums at M6-sky) and item 580's note (reconcile-BASE-F-r5, landed 12:39;
file f md5 e4c1756e; §13 item 31; seams SLR5-06 (b)–(c), TW-09); volume 1's V1-3.10.3 step 1, where no S1 runs on a
sky key, so §1b's `levelledGroundCm` fallback on a sky key is the island's terrain SKY writes (V5 §3.8; seam SLR5-06
(c)); the base's §12.6 rates the resize row now applies — a post-build placement (`placeAt`) ≤ 30 ms of model work at
CITY, as the move row already reads it, and the scoped-regeneration law for a local operator (§7.3) — to each
re-claimed yard's top and to the plots re-cut outside the re-derived districts (base md5 01fea21f; seam TW-04;
J-V5.81); volume 1's V1-6 sky row and T-V1-21, which leave a shrink's plot clearing and re-cut and the local operator
over a re-claimed yard's plots to this volume (V5 §6); volume 6's century re-summed from the amended row (V6 §6.2,
J-V6.118, BCR-V6-22, X46; §13 item 33); volume 1's SLR5-03 sentences, the counterpart of V5 §4.2's inward-reshape
exception (reconcile-V01-r6, landed 13:53; V01 md5 85b488b3; §13 item 34). PLAUSIBLE: the amended row's figures, like every §6 row, until M6-sky's
T-V5-18 times them — the yard's ≤ 3 plots and a shrink's scope are this volume's own bounds — and V6 §6.2's re-declared
century bounds (CITY ≤ 115 s, METROPOLIS ≤ 215 s, TOWN ≤ 25 s kept) under D-18 until V06's E0 measures them.

## 13 Fix list

Everything the critique asked of this volume is in it (the disposition tables are in `docs/volumes/critique/V05.md` §8 and §10).
What remains is deliberately left to others or to measurement, per the owner's "if we need to fix anything [we] just do
it down the line" — each with its reason, so none is re-found as a bug:

1. **The ⟨P0⟩ calibrations and the PLAUSIBLE defaults** (V5 §3.3's supply rows, V5 §3.9 (5)'s caster allowance, the
   gradient's shares, `districtHa`, the reachability filter's effect, the strip and light-pass budgets) — set by M6-sky's
   P0 and phase exits with the pre-decided fallbacks of V5 §3.3, §3.9 (5), §6 and §8; no run can happen before the base
   and volume 1's unit runner exist.
2. **Volume 1's revision** adopts the seven reconciliation items of V5 §3.12 (the call through `skyHandover`, no S1, the
   gradient field, the claims and the rim strip, the `sky-*` kinds, the fabric prior, `districtHa`) — V01's text is its
   lane's to change (critique V1C-31 carries the same demand).
3. **Volume 4's revision** skips every sky-arena face in item 109 (k) (3)'s catacomb candidates and "largest cemetery"
   ranking, counts island churches once in the catacomb count (V04 §3.5.1 (3); `CatacombRule.count`'s `churchesPer`, V4 §2.3), and reads a `quarry` land use with a `source`
   (a landfall) as no quarry source, breach or dig-down draw (V5 §3.5, V5 §3.16; BCR-V5-26) — V04's rules are its lane's.
4. **Volume 6's revision** adds `EpochOps.demandTaken` and the displaced pool's cause `island` (BCR-V5-23), runs its
   building shade mask on each island's lattice at an epoch (V5 §3.19 (7)), and states the 8 × reach cap for its mask
   (J-V5.44) — the engine's interfaces are its lane's.
5. **Volume 9's revision** draws the shade view's island strips as outlines only (solid at the basis, dashed pending),
   reads the held strips at every weight and drops "islands" from its sampler's invalidation list (V5 §5.1, V5 §3.19 (6)),
   and un-displaces sky hits and tool points under `offset` (V5 §4.2) — the screens are its lane's.
6. **Volume 10's revision** adds the `sources` list to its daylight `FieldDrivers` entry (V5 §4.5) — its type is its
   lane's.
7. **Volume 11's revision** writes the rows this volume fixes as facts: the `sky-*` district kinds, the `sheer` barrier
   row (V5 §3.21), the landing classes with the `front` column, the `carry` defaults' class memberships (the balance
   profiles, `split` rows), the palette rows of V5 §5.1's slot table, the crypt column's island form (the rim-slab
   vault), and the `palace` and `cathedral` rows' note that on an institution island V05's siting applies (critique
   V11C-32).
8. **Volumes 2 and 3's revisions** carry the island form of the crypt: the full basement form cut into the rim slab and
   its half-sunk fallback (V5 §3.10 (5)); critique/V03.md already expects it.
9. **The integrator** numbers DR-SKY (J-V5.40) and applies BCR-V5-1 to BCR-V5-26 with the coherence pass's application
   of file g.

**Item 110's cross-lane halves** (the second revision, C5-57 (3)). Each is another lane's text to change; this volume is
written as if each were done:

10. **Volume 6's revision** (its second round, in flight) registers `sky.clearance` at `afterGrowth`, order 50, and adds
    `reclearIsland` to the ops a participant may return (BCR-V5-28); gives the participant `EpochScope.raised` and
    `.levelled` (critique-V6 C6-45 (1)); has its raised-way pass read ground-arena entities only, bind elevated roads to
    reservations and read the ground households' water need (V5 §3.22 (5); critique-V6 C6-37 (3)); has its course
    solver read `skyAccessObstacles` (V5 §2.3b); and reads the raised parts a landfall ruined in the same epoch (critique-V6
    C6-45 (5)). The island's removed slots across epochs are this volume's own step 5 (V5 §3.15 (5)), not volume 6's.
11. **Volume 9's revision** turns its delete row on a sky island into `convert removeIsland` and shows `info.remove.holds`
    for islands and sky accesses from `removedSlots(doc)` (V5 §2.1); gives T4's dry run the bend at a rim
    (J-VI.4 (d); `bend.raised.island`, "A road cannot reach a floating island; a hoist, rope line, stair or bridge of
    light can") and the aqueduct's "An island's water is its own"; bends T3 `retaining` and T2 terrace strokes on or
    along the rim inward past the rim walk with "The rim walk stays level; the wall stands inside it" (J-VI.4 (g); seam
    SLR2-11); and hit-tests an island's retaining walls under `offset` by V5
    §4.2's un-displacement.
12. **Volume 10's revision** adds the `why` lines "removed by you" (with what alone re-opens the slot), "raised clear of
    the aqueduct" (naming the caster and the epoch), the rim-walk bend and the road-to-an-island bend, in the clerk's `bend` category (J-VI.4 (d), (g); V5 §4.5).
13. **Volume 11's revision** writes the raised-way height rows the caster ceiling reads (deck heights, parapets, channel
    walls, arch and raised-way pier heights) and reads its terrace rows unchanged on an island; `accessSiting.deckGapM`
    and `lineClearM` are this volume's `IslandRule` cells (V5 §2.4), listed by volume 12's register, never rows of
    volume 11's own.
14. **Volume 1's revision** has the island's unit run level by item 110 (a)'s thresholds, laying its retaining walls on
    the island's arena and never on the rim strip or along the rim (V5 §3.12, §3.22 (4)); its BCR-39 slot is the one V5
    §3.1 relies on.
15. **Volume 2's revision** rewords its X20 note to "the rim-slab crypt vault under the building's lowest massing tier,
    inside underside tier 0 (the rim slab)" (C5-55; J-V5.66).
16. **Volume 4's revision** lets the vaults beneath a span a landfall ruins follow its state by its own rule (critique-V4
    C4-110-2); this volume writes nothing underground (item 2).
17. **The integrator** applies BCR-V5-27 to BCR-V5-30 with the coherence pass's application of item 110 (BCR-V5-29 (a)'s
    slot is volume 1's BCR-39), and runs doc_checks C1 on this volume after the fold (C5-58: no reference map or
    reference city is named here; item 110 and J114 are cited by number only).

**Reconciliation round 1's cross-lane halves** (2026-09-29; each another lane's text to change, this volume written as
if each were done; none of the eleven seam issues assigned to this volume is left here — all were fixed, the dated note
at the end):

18. **Volume 1's reconciliation** keeps S7c's declared read-set to `reservations` as S3's and S7b (3)'s keys (seam
    SL-01's one V01 clause), names `reservations.landing` and `allocations.landing` in S9b's read-set where it reads
    "landings", and has S9b and the hood pins read the strips held for the evaluation (V5 §3.19 (6); seam SL-02).
19. **Volume 6's reconciliation** adds §3.19.4 (6)'s restoration of a `decayed` retaining-wall stretch (seam ST-10) and
    §3.5.2's landfall candidate (seam ST-13), both cited by V5 §3.16 (4); and to §3.4 (8) (b) the clause "an island
    raised this epoch has no mask until the next field phase (absent = zero building shade)" (seam ST-49).
20. **The integrator** carries the landing data keys through file f items 282 and 213 (BCR-V5-3, BCR-V5-6), the
    `levelledGroundCm` reader through item 309 (BCR-V5-30), the optional basis with its schema-chain step through the
    item that applies BCR-V5-21, and item 260's lift rule for islands and accesses as V5 §3.2 (6) now states it (the
    removal's undo or the user's re-add; seam ST-05 is file f's own).

**Reconciliation round 2's cross-lane halves** (2026-09-29; each another lane's text, this volume written as if each
were done; none of the seven seam issues assigned to this volume is left here — all were fixed, the dated note at the end):

21. **Volume 1's reconciliation** adds the pure service `skyDistrictCount(plotLandM2, districtHa)` to V1-3.16 and writes
    V1-3.10.3 (2)'s count with `sky.plotShare` in place of the literal (seam SLR1-12); this volume's §2.3, §3.5 (3),
    §3.12 item 7 and BCR-V5-16 call it. **Landed** (read in V1-3.16 and V1-3.10.3 (2) by reconcile-V05-r4).
22. **Volume 6's reconciliation** adds this volume's `fallIsland` to `Way.formerClass`'s lifecycle row as a writer and
    the landfall clearance as a reader (seam TR-19); this volume's side is V5 §2.6's `formerClass` row and V5 §3.16 (4).
    **Landed** (V6 §2.12's `formerClass` row and W11 name `fallIsland`; read by reconcile-V05-r4).

**Reconciliation round 3's cross-lane halves** (2026-09-29; each another lane's text, this volume written as if each
were done; none of the seven seam issues assigned to this volume is left here — all were fixed, the dated note at the end):

23. **Volume 1's reconciliation** adds V1-3.10.3 (6) *After generation* — the unit run's callers after generation
    (`raiseIsland`, New random on the island), its carry-over, and faces a growing resize adds or a rim reshape moves
    joining the district of the nearest rim stretch and re-derived by that district's scoped re-derivation from S8 (seam
    SLR2-01) — which V5 §2.3 and §4.2 cite; and V1-3.2 (5) adds "(a sky pseudo-district at its island's land centroid,
    V05 §3.20 (12) (b))" (seam SLR2-03's V01 wording). **Landed** with reconcile-V01-r3 (06:08; read in V1-3.10.3 (6)
    and V1-3.2 (5) by reconcile-V05-r4; seam TU-08).
24. **Volume 6's reconciliation** names the three `DecorationMember` forms in §3.5.2 and W76 (seam TT-03's companion)
    and adds to §3.7.5 the repair of a ring in use with a `breached` run (seam TT-05), which V5 §3.16 (4) cites for the
    landfall's breach. **Landed** with reconcile-V06-r3 (06:17; read in V6 §3.5.2, W76 and §3.7.5 by reconcile-V05-r4;
    seam TU-08).
25. **The integrator** reads file f item 252 (BCR-V5-9) as *Needed by* V04, V05 and V06 (seam TT-10 (b)) — **landed**
    with reconcile-BASE-F-r3 (06:08; item 252 reads "*Needed by:* V04, V05, V06"; seam TU-08); item 309's reader list
    follows BCR-V5-30's as it now stands (seam SLR2-12) — **landed** with reconcile-BASE-F-r4 (07:19; item 309 carries
    volume 4's buried floor under a raised grade and its village working's depth test, the working from the later of
    M6-U and the village product; seams SLR3-12, TU-07 (c)); read by reconcile-V05-r5 (seam TV-06). Its round-5 reader,
    volume 1's island bridge build, is §13 item 31.

**Reconciliation round 4's cross-lane halves** (2026-09-29; each another lane's text, this volume written as if each
were done; none of the six seam issues assigned to this volume is left here — all were fixed, the dated note at the end):

26. **Volume 1's reconciliation** reads V1-3.10.3 (6) (c), V1-6's sky row and T-V1-21 as "each receiving district"
    (seam SLR3-04, volume 1's own; its round-4 note quotes the new wording), which V5 §4.2's *Resizing* and *Reshaping
    the rim* now state; and V1-3.17.7 (2)'s "its drawn class" reads "its drawn class (`terrainEcho.reliefClass`, V05
    §2.1)" (seam SLR3-03's volume-1 sentence, which volume 1's round-4 lane left to this lane as a counterpart edit
    after its landing). **Both landed:** the "each receiving district" wording with reconcile-V01-r4 (07:14), and the
    relief-class sentence applied by this lane after it (V01 md5 f7bee6b0 → 332c35e6, one exact-match replacement,
    logged in `docs/lane-events.log`).
27. **Volume 6's reconciliation** makes towers and gates follow their runs' `condition` in its repair, absorption and
    drawing, with no Works on a wall, tower or gate (seam TU-01), the companion of V5 §3.16 (4)'s tower rule (TU-03;
    J-V5.79). **Landed** with reconcile-V06-r4 (07:31; V6 §2.8's `repairWall`, §3.7.2 (3), §3.7.5, §5.1, J-V6.112,
    J-V6.114 and X41, "this volume's side is landed"); read by reconcile-V05-r5 (seam TV-06).
28. **Volumes 9 and 10** carry the resize floor's and the reshape's bend lines — "<island> keeps room for its
    <institution>; shrunk to <area> ha" and "<island> keeps room for its <institution>; the rim stops here" (V5 §4.2;
    J-V5.77) — in the dry run and in the clerk's `bend` category, as items 11–12 carry the others.

**Reconciliation round 3's continuation cross-lane half** (2026-09-29; another lane's text, this volume written as if
it were done; SCC-R2C-15, the one issue of this brief, was fixed — the dated note at the end):

29. **Volume 12's reconciliation** sets the default line's `due` for a column that first lands after M-CAL's first run —
    a staged layer's, such as this volume's P1 and P2 cells where M6-sky lands after M-CAL's first run — to the
    later corpus run that takes the layers (J-V12.21), never M-CAL itself. Otherwise the landing exit fails on an entry
    already past due (V12 §3.11's *Milestone exits*). Its next round also reads X-V12-16's volume-5 clause as written (V5
    §8's P1 and P2 exits; SCC-R2C-15). **Met** with reconcile-V12-r4 (11:59): V12 §3.11's *The due's corpus run* dates a
    column whose first compiled cell lands after M-CAL's `ReconciliationRecord` to its layer's later run, `M-CAL/sky` for
    M6-sky and this volume's phases P0 – P6 (J-V12.75; X-V12-17: "V5 §13 item 29 is met"), and X-V12-16 is met naming
    V5 §8's *The register at the exits* (J-V5.80); read by reconcile-V05-r5 (seam SCC-94).

**Reconciliation round 5's cross-lane halves** (2026-09-29; each another lane's text, this volume written as if each
were done; none of the five seam issues assigned to this volume is left here — all were fixed, the dated note at the end):

30. **Volume 1's reconciliation** (seams SLR4-01 and SLR4-02, volume 1's own) writes V1-3.10.3 step 4's island-level
    `plantRimWalk(doc, island)` — called once by the unit run after its districts' S12b, and once in the commit of every
    event that re-lays the strip (V5 §4.2's resize and rim reshape) after this volume's island L1 batch and any district
    re-derivation, never by a district's scoped re-derivation — and V1-3.10.3 (6) (c)'s shrink and inward-reshape
    paragraph, *A re-searched institution claim* (the claim's district re-derived from S8 with the island institution's
    use and building released from V1-3.9's fixed inputs for the event, once where it also receives faces), the re-claimed
    yards and the order in the one commit, with V1-6's sky row and T-V1-21 counting the claim's district. V5 §4.2, §1b,
    §2.6, §3.12, §6, T-V5-14 and J-V5.77 cite them (seam SLR4-03). Written in volume 1's live text by reconcile-V01-r5,
    which told this lane it applies them itself (`docs/lane-events.log`, 12:28), so no counterpart edit was made here.
    **Landed** with `reconcile-V01-r5` (12:40): V1-3.10.3 step 4 and (6) (c), read with V1-3.9, V1-6's sky row and
    T-V1-21 (V01 md5 15a69be1; seams SLR5-06 (b), TW-09).
31. **Landed** with `reconcile-BASE-F-r5` (12:39): item 309's reader clause in BCR-V5-30's words, its label split (the
    M5 raster fallback with item 580, the M6-sky datums), and item 580's note (file f md5 e4c1756e; seams SLR5-06 (b),
    TW-09). The integrator's half was volume 1's island bridge build added to file f item 309's readers (seam SLR4-10
    (a)), as BCR-V5-30's reader list and §1b's `levelledGroundCm` row name it (seam SLR4-04).
32. **Volume 6** reads "towers and gates standing again with the run" in V6 §3.7.5's in-use paragraph (seam TV-04's V06
    word). **Landed:** applied by this lane as a logged counterpart edit with no V06 lane open, together with the same
    words in J-V6.110's parenthesis (V06 md5 ba61b240 → a164fbc4; `docs/lane-events.log`, 12:33); reconcile-V06-r5
    started on that state at 12:33, and both words were read again in its live text before this lane landed.

**Reconciliation round 6's cross-lane halves** (2026-09-29; each another lane's text, this volume written as if each
were done; none of the three seam issues assigned to this volume is left here — all were fixed, the dated note at the
end):

33. **Volume 6** re-sums its century from V5 §6's amended resize row (seam TW-04's V06 companion): V6 §6.2's
    participants row and century paragraph quote the row, re-derive a growing resize (≈ 228 / 255 ms at CITY /
    METROPOLIS) and a shrink (≈ 209 / 227 ms), and re-declare the bounds by its D-18 rule — CITY ≤ 115 s,
    METROPOLIS ≤ 215 s, TOWN ≤ 25 s kept — for the owner's veto; J-V6.118, BCR-V6-22's parenthesis and X46 (met)
    follow, V6 §6.3 citing the bound by name. The seam's arithmetic gave METROPOLIS ≤ 210 s; this volume's row also
    prices the plots re-cut outside the re-derived districts (J-V5.81), which V01 V1-6's sky row leaves to it, so
    the METROPOLIS sum is ≈ 211.3 s. **Landed:** applied by this lane as a logged counterpart edit with no V06 lane
    open (`docs/lane-events.log`, 2026-09-29, 13:48; V06 md5 9b7cd451 → 560a8699 after volume 7's round-6 rows, which it left
    untouched; the backup `scratchpad/volumes/rcV5r6/V06-pre-r6b.md`).
34. **Volume 1** writes SLR5-03, the counterpart of SLR5-06 (d): V1-3.10.3 (6) (c)'s shrink and inward-stretch
    sentence and V1-6's sky row except the district whose claim is re-searched. Volume 1's own lane
    (reconcile-V01-r6) edited only its own sentence (seam-layers-r5's advice). **Landed** with `reconcile-V01-r6`
    (13:53): (6) (c) reads "… gives no face and re-derives no district but the claim's, where volume 5 re-searches the
    claim", a reshape re-derives "the claim's district where the claim is re-searched", and V1-6's sky row reads "a
    shrinking resize none but the district whose claim is re-searched, where one is" (V01 md5 85b488b3).



## Integration notes (volumes/_integrate, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/_integrate; covered by the whole-design retrovalidation (J84).

The integration lane (`docs/volumes/_integrate.md`) decided the following for this volume. Each note supersedes any
sentence of this volume that reads otherwise; sentences edited in place are listed. Decisions are vetoable (J-VI.n).

* **IN-V05-1 (J-VI.4; item 101 R2).** Every refusal of this volume except the dossier-owned one (J-V5.19: a bound dossier
  whose `site.magic` resolves `none`) is a **bend**: V5 §3.1 (3)–(4), §3.22 (3) (d), §4.1's table rows T3 and T4, §4.2's
  accesses, raised and aqueduct strokes and rim walls, J-V5.61 and BCR-V5-10 and BCR-V5-29 (f) were edited in place to
  J-VI.4 (a)–(g)'s bends. The tests that name these cases (T-V5-21 (h), T-V5-27, the P4 exit, §7's rim-wall and fourth-
  island clauses) read "bent, with its line" where they read "refused"; the message keys are volume 9's `bend.*` rows.
  §13's items 11–12 (volume 9's and volume 10's refusal rows) are superseded by the same decision.
* **IN-V05-2 (J-VI.14).** An island's removed slot and a deleted generated access's ordinal (`removedSlots`,
  `removedAccesses`) are this volume's form of the one suppression mechanism the base carries for generated content
  (BCR-V6-24 widened by file f to islands and accesses).
* **IN-V05-3 (J-VI.13).** DR-SKY is numbered **DR27** by the coherence pass (file f).
* **IN-V05-4 (J-VI.3).** The island rim's barrier kind `sheer` is one of the six closure-arc kinds every volume uses.
* **IN-V05-5 (J-VI.17).** §13's cross-lane items are dispositioned in `_integrate.md` §2.3: item 10 (volume 6's
  `sky.clearance`, `reclearIsland`, `skyAccessObstacles`) is written into volume 6 (IN-V06-3); item 13's register listing
  of `deckGapM` and `lineClearM` into volume 12 (IN-V12-1); item 15 into volume 2 (IN-V02-1); item 16 into volume 4
  (IN-V04-5).

## Reconciliation round 1 (volumes/reconcile-V05-r1, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V05-r1; covered by the whole-design retrovalidation (J84).

Against the seam checks `docs/volumes/critique/seam-layers-r0.md` (SL-01, SL-02, SL-26, SL-27, SL-33, SL-35) and
`docs/volumes/critique/seam-time-r0.md` (ST-04, ST-12, ST-14, ST-48, ST-49): eleven issues — one blocker, four majors,
six minors — all eleven FIXED, none INVALID, none left on the Fix list (§13's new items 18–20 are the other lanes' halves).
Each change supersedes the sentence it replaced; where an Integration note above reads otherwise, this note governs.

| issue | severity | what changed | where |
|---|---|---|---|
| SL-01 | blocker | SKY runs after S7b with its S7c hook and before S12a, S8 and S10a; the "topological sort puts it before S7c" sentence is gone. SKY's ground writes take their own data keys, `reservations.landing` and `allocations.landing`, which no earlier stage or hook declares; S8, S10a with S9b, and S12a declare them. SKY rewrites no row S7b wrote, and S10a takes a landing's staff households from the host district's `modest` demand. | §1b (landing rows), §3.1 (the SKY row, *Declared I/O*), §3.10 (4), BCR-V5-3, BCR-V5-6, J-V5.70, T-V5-32, §8 P1 |
| SL-02 | major | The strips onto the ground are computed once per shade evaluation, at their first read (volume 1's S9b at the `afterDrivers` hook where it is registered, else field pass 2), and held. At a re-derivation starting after SKY and at or before S10a, the islands' bases are written at S10a's start, before step (i) and every hook. The reader list gains V01's S9b sun factor, its hood pins' shade gate and `DistrictContext.shade.islandShare`. | §1b, §2.3a, §2.6, §3.1 (the S10a row), §3.19 (6), T-V5-21 (h), BCR-V5-15 (v), J-V5.71 |
| SL-26 | minor | BCR-V5-30 names the reader `levelledGroundCm(doc, key, p)` (the levelled datum, else the raw raster) and lists its readers: volume 2's datum step, the crossing rule, V01's `stepProfile`, V04's knots, arch floors and foundations, V04's BCR-45 span rule, and this volume's surface top, crypt re-test and clearance. The field readers keep the unlevelled raster. | BCR-V5-30, §1b (new row), §3.9 (4)–(5), §3.10 (5), §3.22 (4) |
| SL-27 | minor | The island district count cites volume 1's `hood.constants.sky.plotShare` in place of the literal 0.62. The fill's `0.62 · A` stays, because it is the base's dense-core share (§4.2 S2). | §2.3, §3.5 (3), §3.12 item 7, J-V5.45 |
| SL-33 | minor | The GeoJSON export writes island retaining walls as file f item 447's `retaining` LineStrings, plus `elevationM`. | §5.5 |
| SL-35 | minor | "three reconciliations" now reads "seven". | J-V5.28, §8 risks |
| ST-04 | major | Release (iii) is deleted: an `adjust('islands.count')` no longer releases a held slot. An integer count treats held slots as filled and opens only free slots, never a held one. A hold is lifted only by the removal's undo, or by a T5 declaration that re-fills the slot when no slot is free. | §0, §2.1 (`removed.releasedBy`), §2.6 (`slot`, `removed`), §3.2 (6), §3.15 (5), §4.2, §4.5, T-V5-29, J-V5.62, BCR-V5-10 |
| ST-12 | minor | A covered retaining wall now steps to `decayed` (item 245's state), not `breached`. It stays `decayed` until an epoch's restoration re-derives it (V06 §3.19.4 (6)). | §3.16 (4), §5.1, §4.5, T-V5-14, J-V5.64 |
| ST-14 | major | A deck plot on a covered deck falls with the deck: its building is demolished and the plot is tombstoned with the deck, as V06 §3.19.5 (3) does. A repaired deck re-offers its faces. Deck plots are no longer decoration members, and every covered deck kind is `ruined`. | §1b, §3.16 (4)–(5), §5.1, §5.5, T-V5-14, J-V5.64 |
| ST-48 | minor | An aqueduct's lost supply is read at the first `raisedWays` step after the fall: the same epoch for an epoch's fall, the next epoch for a hand `convert`. | §3.16 (4), T-V5-14 |
| ST-49 | major | `shadeBasis` is optional. An island raised at an epoch after S6, or declared between evaluations, casts and receives no strip until the next evaluation. The load computes bases only through §7.5's schema-chain step for older documents, never because a basis is missing. T-V5-21 (h) adds raise, save and load cases. | §1b, §2.1, §2.3a, §2.6, §3.15, §3.19 (2)–(3), (6), §4.2, §4.3, T-V5-21 (h), BCR-V5-21, J-V5.72; the V06 §3.4 (8) (b) clause is §13 item 19 |

Receipts: every edit was applied by exact-match replacement, and each old text matched exactly once
(`scratchpad/volumes/rcV5/p/*.txt`, `rep.py`). The pre-reconciliation copy is `scratchpad/volumes/rcV5/V05-pre-reconcile.md`.


## Reconciliation round 2 (volumes/reconcile-V05-r2, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V05-r2; covered by the whole-design retrovalidation (J84).

Against the seam checks `docs/volumes/critique/seam-layers-r1.md` (SLR1-02, SLR1-08, SLR1-11, SLR1-23, SLR1-24) and
`docs/volumes/critique/seam-time-r1.md` (TR-04, TR-22): seven issues — two majors, five minors — all seven FIXED, none
INVALID, none left on the Fix list (§13's new items 21–22 are the other lanes' halves). Each change supersedes the sentence
it replaced; where round 1's note reads otherwise (its SL-27 row keeps the fill's `0.62 · A`), this note governs.

| issue | severity | what changed | where |
|---|---|---|---|
| SLR1-02 | major | The clerk's "the node beneath the old ruins" reads the generation report's `ruin.node` line (V04 §3.5.0a (9): the deposit, the ruin system, the ruin's `NameRef`), never a "report entry" no volume wrote and never the ruin itself. With no line for the deposit, the why names the deposit alone. The node-term wiring row lists the line as a producer. T-V5-25 adds the named-ruin, renamed-ruin and no-ruin cases. | §1b (node-term row), §3.3, §4.5, T-V5-25 |
| SLR1-08 | minor | The rim walk is one `esplanade` on the strip's face, with no way laid on it, and a `street_trees` row along the strip's inner setback line whose `along` names the strip with no way (V01 V1-3.10.3 (4), BCR-10 (c)). No record holds a "rim walk's path". | §3.12 |
| SLR1-11 | minor | The fill's stop and the coverage overshoot read `plotShare · A`, with `plotShare` volume 1's `hood.constants.sky.plotShare` (default: the base's dense-core share). This is the cell the district count divides by, so one edit moves the count, the fill and the overshoot together. The count is volume 1's `skyDistrictCount(plotLandM2, districtHa)`, called and not restated. | §2.3, §3.5 (2)–(3), §3.12 item 7, BCR-V5-5 (its New text), BCR-V5-16 (two clauses), J-V5.45 |
| SLR1-23 | minor | The catacomb count is cited as V04 §3.5.1 (3) with `CatacombRule.count`'s `churchesPer` (V4 §2.3). The invented id `catacomb.churchesPer` is gone. | §1.3, §3.5 (burial), §13 item 3 |
| SLR1-24 | minor | `SkyIsland.districts` is created by SKY-F from the unit run's `NeighbourhoodResult.districts` (V01 V1-2.4). | §2.6 |
| TR-04 | major | The landfall writes each covered way's class to `Way.formerClass` (BCR-V6-5) in the `fallIsland` batch before dropping the way to `track`. A way that already carries a `formerClass` keeps it. Volume 6's landfall clearance restores the class from it, and a hand `setAttr` also restores it; both clear the field. The undo restores the class, the surface and the prior `formerClass`. A lifecycle row for this volume's write is added. The dry run's fate shows "(was <class>)". | §1b (landfall row), §2.6 (new `formerClass` row), §3.16 (4), (8), §4.2 (new *Bringing an island down*), T-V5-14, J-V5.73 |
| TR-22 | minor | An epoch's island laws read the rung row of the fold's rung (`ctx.rung`, V6 §3.1 (3); file f item 322), not the rung at the population target. The participant passes `rung` = `ctx.rung` to `apply`. | §3.15 (the participant, step 1), J-V5.74 |

Receipts: every edit was applied by exact-match replacement, and each old text matched exactly once
(`scratchpad/volumes/rcV5r2/rep1.py` to `rep4.py`). The pre-reconciliation copy is `scratchpad/volumes/rcV5r2/V05-pre-r2.md`.


## Reconciliation round 3 (volumes/reconcile-V05-r3, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V05-r3; covered by the whole-design retrovalidation (J84).

Against the seam checks `docs/volumes/critique/seam-layers-r2.md` (SLR2-02, SLR2-03, SLR2-07, SLR2-11, SLR2-12) and
`docs/volumes/critique/seam-time-r2.md` (TT-03, TT-09): seven issues — two majors, five minors — all seven FIXED, none
INVALID, none left on the Fix list (§13's new items 23–25 are the other lanes' halves). Each change supersedes the sentence
it replaced; where an earlier note reads otherwise, this note governs.

| issue | severity | what changed | where |
|---|---|---|---|
| SLR2-03 | major | S7b (1)'s district supply term reads a sky pseudo-district at its island's land centroid's world point (`anchor` + the outline's centroid, fixed by S7b (5)'s placement), the proxy the ground pool already reads — never at the main landing's foot, which SKY sites only after S7b. Volume 1's χ̃ reads the same point by centroid distance. "The ground district by the main hoist" now reads "the ground districts beneath and beside the island". A bar and a decision are added. | §3.20 (12) (b), BCR-V5-16 (its S7b (1) sentence), §1b (cross-arena row), T-V5-32, J-V5.75; V1-3.2 (5)'s parenthesis is §13 item 23 |
| TT-03 | major | BCR-V5-9 types `members?: DecorationMember[]`: an `Id` for a plot, land use, reservation, way or retaining wall; `{ raised, span: [a, b] }` or `{ raised, support }` on item 244's support keys (minted once, never reused, volume 4's BCR-45) for a raised part — never a stored `SpanRef`. A raised member's geometry is resolved at read. A new §2.6 row gives the field's lifecycle: created by `fallIsland`, shrunk by volume 6's member-leaving `setAttr` in the batch of the op that ends a member's cover, read by §8.2's `fallen` row, volume 6's landfall candidate, volume 4's closures, the clerk and the CSV, and undone by the writing event. §3.16 (5) cites the type. | BCR-V5-9, §2.6 (new `members` row), §3.16 (5), §1b (landfall row), T-V5-14, J-V5.76; volume 6's naming of the forms is §13 item 24, file f item 252's *Needed by* item 25 |
| SLR2-02 | minor | The unit runner's runs are "generation, `raiseIsland`, New random on the island" (V01 V1-3.10.3 (6)). A growing resize's new faces and a rim reshape's moved faces join the district of the nearest rim stretch and are re-derived by that district's scoped re-derivation from S8 (V01 V1-3.10.3 (6) (c)), never by a unit run. | §2.3, §4.2 (*Resizing*, *Reshaping the rim*) |
| SLR2-07 | minor | `shadeSky`'s readers now include volume 1's sky-arena readers: S7c's `shade` term through `DistrictContext.shade.meanShare`, S9b's manor sun factor, the hood pins' shade gate and `DistrictContext.shade.islandShare` (J-V1.87). | §1b (`shadeSky` row), §2.6 (the strip-onto-an-island row), §2.3a |
| SLR2-11 | minor | Stale refusal words replaced with J-VI.4's bends. A rim retaining or terrace stroke is "bent inward past the rim walk with 'The rim walk stays level; the wall stands inside it' (J-VI.4 (g))". A rim wall stroke is "bent to the landing stretches with 'the drop is the wall here'". The raised and aqueduct strokes are bent by J-VI.4 (d)–(f), each with its line, and a fourth island joins the nearest (J-VI.4 (a)). The same words are applied in §0, §1.1 item 23, §1b's events row, §8's P4 row and §13 item 12. | T-V5-8, T-V5-16, T-V5-27, J-V5.69, §13 items 11–12, §0, §1.1, §1b, §8 |
| SLR2-12 | minor | `levelledGroundCm`'s readers add volume 4's buried floor under a raised grade (V04 §3.5.5) and its village working's depth test (V04 §3.5.7 (a)). | BCR-V5-30, §1b (`levelledGroundCm` row) |
| TT-09 | minor | The landfall writes `breached` over each covered length into the enceinte's `condition` (file f item 575: knots at the covered length's ends; a `dismantled` run is kept). Volume 6 repairs it (V6 §3.7.5). A new §2.6 row gives the profile's lifecycle for this writer, and §3.16 (8)'s undo restores the profile and `lifecycle`. | §3.16 (4), (8), §2.6 (new `Enceinte.condition` row), §1b (landfall row), T-V5-14; volume 6's ring-in-use repair (TT-05) is §13 item 24 |

Receipts: every edit was applied by exact-match replacement, and each old text matched exactly once
(`scratchpad/volumes/rcV5r3/rep1.py` to `rep3.py`). The pre-reconciliation copy is `scratchpad/volumes/rcV5r3/V05-pre-r3.md`.

## Reconciliation round 4 (volumes/reconcile-V05-r4, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V05-r4; covered by the whole-design retrovalidation (J84).

Against the seam checks `docs/volumes/critique/seam-layers-r3.md` (SLR3-02, SLR3-03, SLR3-09, SLR3-10) and
`docs/volumes/critique/seam-time-r3.md` (TU-03, TU-08): six issues — three majors, three minors — all six FIXED, none
INVALID, none left on the Fix list (§13's new items 26–28 are the other lanes' halves). Each change supersedes the sentence
it replaced; where an earlier note reads otherwise, this note governs.

| issue | severity | what changed | where |
|---|---|---|---|
| SLR3-02 | major | A resize and a rim reshape now carry the rim's L1 pieces with the rim in the same commit: one island L1 batch re-lays the rim strip inside the new rim and re-claims each landing yard at its re-seated top (its foot re-landed as a move re-lands it). The institution claim is kept where it still fits; else it is re-searched inside the district that holds it, which is re-derived from S8. A resize never leaves the claim without a site: its area is floored, and a reshape is bent back. Growing: the band between the old and new strip lines is cut at the extended district boundary ways, and each face joins its nearest rim stretch's district (ties by district address). Every receiving district is re-derived by its own scoped re-derivation from S8, which re-plants its stretch of the rim walk. Shrinking: ways are cut back to the new strip line, and volume 1's rule re-lays the rim walk. A §2.6 row (the strip and the island's claims) replaces the landing-reservation row. The locality table gives a resize and a reshape their own row, since the ground landing plots and relocations are touched. §6 prices the new work, T-V5-14 gains the bar, and J-V5.77 records the choice. | §1b (rim-strip and landing rows), §2.6 (new strip-and-claims row; `SkyAccess.*` row), §4.2 (*Resizing*, *Reshaping the rim*), §4.3, §6, T-V5-14, J-V5.77 |
| SLR3-03 | major | `terrainEcho.reliefClass?` (S0's four classes) holds the class SKY draws for an `own` relief. §3.8 (3) writes it. A new §2.6 row gives its lifecycle: re-drawn by New random, re-drawn on its `island.place` key at load when absent. V5 §3.22 (4) reads it as volume 1 does (`plain` for `echo` and `none`). BCR-V5-1 carries the field, a §1b row wires it, T-V5-31 (e) tests it, and J-V5.78 records the choice. Volume 1's sentence (V1-3.17.7 (2)) was applied by this lane as a counterpart edit after volume 1's round-4 lane landed (§13 item 26). | §2.1, §3.8 (3), §2.6 (split `terrainEcho` row), §3.22 (4), BCR-V5-1, §1b, T-V5-31 (e), J-V5.78 |
| TU-03 | major | A covered tower or gatehouse writes no state. The `breached` length is extended over its footprint's chord, or that chord alone where its stretch is uncovered. It draws by its run's `condition` (file f item 575) and stands again with it (V6 §3.7.5). "Ruined towers" is gone from (4), (5), §5.1's states, T-V5-14 and J-V5.11. | §3.16 (4)–(5), §5.1, T-V5-14, J-V5.11, §1b (landfall row), §2.6 (`Enceinte.condition` row), J-V5.79; volume 6's TU-01 is §13 item 27 |
| SLR3-09 | minor | "The unit run's local operator/placement" now reads §7.3's local operator and the solver's positive placement (§7.7's `placeAt`), never a unit run. New random names SKY's island steps, volume 1's unit run (templates kept by lineage) and SKY-F; the old "the fabric re-derived" is gone. The `districts` row is rewritten by SKY-F after every unit run. The `SkyHandover` row names the after-generation callers. | §4.2 (*Accesses*, *New random*), §3.20 (9) (e), §2.6 (`districts`), §1b (`SkyHandover`) |
| SLR3-10 | minor | §3.12's contract now reads "use the river's crossing sites as volume 1 qualifies and builds them". It quotes V1-3.10.3 (4)'s rule: an unreached far bank stays a `site`, reported, and a non-qualifying site stays a `site`, unlaid. That is volume 1's actual wording; the seam's "reported" for both was narrowed to it. §3.8 (4), §3.22 (6), §2.3's `river` comment and §1b's conjured-river row cite it. | §3.12, §3.8 (4), §3.22 (6), §2.3, §1b |
| TU-08 | minor | §13 items 23, 24 and 25's first half are marked landed with their lanes, and items 21–22 as well (same class, verified by reading). §12's round-2 and round-3 PLAUSIBLE clauses move to CONFIRMED. Item 25's second half points at TU-07 (c). §12 gains a round-4 paragraph. | §12, §13 items 21–25 |

Receipts: every edit was applied by exact-match replacement, and each old text matched exactly once
(`scratchpad/volumes/rcV5r4/rep0.py` to `rep6.py`). The pre-reconciliation copy is `scratchpad/volumes/rcV5r4/V05-pre-r4.md`.

## Reconciliation round 3 — continuation (volumes/reconcile-V05-r3, second brief, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V05-r3; covered by the whole-design retrovalidation (J84).

This lane key was issued again with a wider brief. Round 3's seven issues (SLR2-02, SLR2-03, SLR2-07, SLR2-11, SLR2-12,
TT-03, TT-09) are history. Each was verified in the live text, with its new wording present and its stale wording
absent, and nothing was redone. The new issue is `docs/volumes/critique/seam-content-calibration-r2.md` SCC-R2C-15
(minor). It is FIXED; none is INVALID and none is left on the Fix list. §13's new item 29 is volume 12's half. This note
governs where an earlier sentence reads otherwise.

| issue | severity | what changed | where |
|---|---|---|---|
| SCC-R2C-15 | minor | P1's and P2's exits now read "`plat calibrate register --check` green over the cells it lands — their entries from V12 §3.11's default line (`plat calibrate register --defaults`) unless this volume's own line in V2 §3.10.10's form names the column". P1 lands `islands.json` whole (row 56, BCR-V5-4; `accessSiting.deckGapM` and `lineClearM` among its cells), and P2 lands the sky rows of `lights.json` with `radiusMarginM` (row 51, BCR-V5-8). A new §8 paragraph, *The register at the exits*, states the rule for every phase and names the two phases that land cells. It records that this volume writes no line of its own (J-V5.80). The three ⟨P0⟩ cells are set by P0's spikes on a draft table before P1 lands it, and their provenance notes name the run. T-V5-3 and T-V5-10 hold them as ordinary bars. The corpus stage closes the island columns `fixed` with "no admissible frame". If M6-sky lands after M-CAL, its default entries fall due at the layers' later corpus run (J-V12.21; §13 item 29). §2.4's intro cites the register, and `carriedSupply` gains its missing ⟨P0⟩ mark (V5 §3.3 sets it at the same run, so the "three marked" now holds). A §1b row wires the entries. | §8 (P1 and P2 exit cells; *The register at the exits*), §2.4, §1b, J-V5.80, §12, §13 item 29 |

Receipts: every edit was applied by exact-match replacement, and each old text matched exactly once
(`scratchpad/volumes/rcV5r3b/rep.py` over `p0.json` to `p2.json`). The pre-continuation copy is
`scratchpad/volumes/rcV5r3b/V05-pre-r3b.md`.

## Reconciliation round 5 (volumes/reconcile-V05-r5, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V05-r5; covered by the whole-design retrovalidation (J84).

Against the seam checks `docs/volumes/critique/seam-layers-r4.md` (SLR4-03, SLR4-04), `docs/volumes/critique/seam-time-r4.md`
(TV-04, TV-06) and `docs/volumes/critique/seam-content-calibration-r4.md` (SCC-94): five issues, all minor, all five
FIXED, none INVALID, none left on the Fix list (§13's new items 30–32 are the other lanes' halves, item 32 already
landed). Each change supersedes the sentence it replaced; where an earlier note reads otherwise (round 4's TU-03 row says
"tower or gatehouse"), this note governs.

| issue | severity | what changed | where |
|---|---|---|---|
| SLR4-03 | minor | The rim walk is volume 1's one island-level pair, re-planted whole by `plantRimWalk` (V01 V1-3.10.3 step 4) once after every rim change — growing, shrinking or reshaping — never "its stretch" by a district. The claim's district is re-derived by volume 1's claim re-search, which releases the institution from V1-3.9's fixed inputs. That district is re-derived whether or not it receives a band face, and once where it does. A shrink and a reshape's inward stretch re-derive no other district. T-V5-14 counts the claim's district, holds one `esplanade` and one `street_trees` `Greenery` on the re-laid strip after each rim change, and checks the institution on its new claim in one building. §6 prices the claim's district inside k ≤ 3 and `plantRimWalk` once. §3.12's contract and §2.6's strip row name `plantRimWalk`, and J-V5.77 cites both mechanisms. Volume 1's sentences are its own lane's (reconcile-V01-r5 is live and applies them itself, as it logged at 12:28), so no counterpart edit was made. | §4.2 (*Resizing*: the claim, *Shrinking*, *Growing*; *Reshaping the rim*), §1b (rim-strip row), §2.6 (strip-and-claims row), §3.12, §6 (resize row), T-V5-14, J-V5.77; §13 item 30 |
| SLR4-04 | minor | BCR-V5-30's readers and §1b's `levelledGroundCm` row add volume 1's island bridge build after S8: `deckCm` from the two bank elevations on the island's key, where nothing is levelled yet (V01 V1-3.10.3 (4); V01's BCR-45, file f item 580). The text writes "V01's BCR-45" where the seam wrote "its BCR-45", because volume 4 also has a BCR-45 in the same list. | BCR-V5-30, §1b; file f item 309's half is SLR4-10 (a), §13 item 31 |
| TV-04 | minor | The landfall covers a `Gate` of any kind (`main`, `postern`, `water`, `gatehouse`, `castle`; base §2.7): the covered set, the decline ladder, the `breached` chord over each covered tower's and gate's footprint, the drawing by the run's `condition`, and "no state" for `Tower` and `Gate` alike. The five places the seam names were changed, plus §3.16 (2)'s covered set (so a covered main gate is in the set that (4) breaches), §5.1's states, J-V5.11, the two caster lists (§1b's `groundRefCm` row, §3.9 (3)) and T-V5-14's fixture, which now covers a `main` gate. V6 §3.7.5's in-use paragraph was changed as a logged counterpart edit, with the same words in J-V6.110 (no V06 lane open). | §1b (landfall and `groundRefCm` rows), §2.6 (`Enceinte.condition` row), §3.9 (3), §3.16 (2), (4), (5), §5.1, T-V5-14, J-V5.11, J-V5.79; V6 §3.7.5, J-V6.110; §13 item 32 |
| TV-06 | minor | §13 item 27 is marked landed with reconcile-V06-r4 (07:31; V6 §2.8, §3.7.2 (3), §3.7.5, §5.1, J-V6.112, J-V6.114, X41). Item 25's second half is marked landed with reconcile-BASE-F-r4 (07:19; item 309's volume-4 readers). §12's round-4 PLAUSIBLE clause and round 3's "is seam TU-07 (c)" pointer now point at round 5's CONFIRMED paragraph, which cites the V06 anchors and item 309's text. | §12 (rounds 3 and 4, new round-5 paragraph), §13 items 25, 27 |
| SCC-94 | minor | §13 item 29 is marked met with reconcile-V12-r4 (11:59), citing V12 §3.11's *The due's corpus run*, J-V12.75, X-V12-17 and X-V12-16. §8's register paragraph reads "its default-line entries fall due at `M-CAL/sky` (V12 §3.11's *The due's corpus run*; J-V12.75)", dated from M-CAL's `ReconciliationRecord`, as V12 dates it. §12's "Open" sentence moves to round 5's CONFIRMED paragraph. The short command `plat calibrate register --defaults` in §8 is kept, because the `--milestone` flag's citation is volume 12's to settle (SCC-93, V12's own). | §8 (*The register at the exits*), §12 (round 3's continuation, new round-5 paragraph), §13 item 29 |

Receipts: every edit was applied by exact-match replacement, and each old text matched exactly once
(`scratchpad/volumes/rcV5r5/rep1.py`, `rep2.py`, `rep4.py`; the V06 counterpart edit `rep3_v06.py`, which also asserted
V06's landed md5 and the new text's absence). The pre-reconciliation copies are `scratchpad/volumes/rcV5r5/V05-pre-r5.md`
and `scratchpad/volumes/rcV5r5/V06-pre.md`.

## Reconciliation round 6 (volumes/reconcile-V05-r6, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V05-r6; covered by the whole-design retrovalidation (J84).

Against the seam checks `docs/volumes/critique/seam-layers-r5.md` (SLR5-06) and `docs/volumes/critique/seam-time-r5.md`
(TW-04, TW-09): three issues, one major and two minor, all three FIXED, none INVALID, none left on the Fix list (§13's new
items 33–34 are the other lanes' halves, both landed: item 33 by this lane as a counterpart edit, item 34 by
reconcile-V01-r6). Each change supersedes the
sentence it replaced; where an earlier note reads otherwise (round 5's SLR4-03 row prices the resize without the yards'
tops), this note governs.

| issue | severity | what changed | where |
|---|---|---|---|
| TW-04 | major | V5 §6's "a resize, a rim reshape" row prices §12.6's 30 ms per re-claimed landing yard's top placement (`placeAt`, one per access, ≤ `accessCount.max`; a reshape's on the moved stretch's yards only), in the seam's words, and its basis cell names the tops' placements. Beyond the seam's text, the row also prices one scope at §12.6's scoped-regeneration law over the plots the event re-cuts outside the re-derived districts: each re-claimed yard's covered plots (§7.3's local operator) and a shrink's or an inward stretch's cleared and re-cut plots. V01 V1-6's sky row leaves these to this row, and no row priced them (J-V5.81). V06's companion was applied as a logged counterpart edit with no V06 lane open: V6 §6.2's participants row and century paragraph quote the amended row and re-derive a growing resize at ≈ 228 / 255 ms (CITY / METROPOLIS) and a shrink at ≈ 209 / 227 ms. The worst case is ≈ 68.4 / 76.5 s and TOWN's ≈ 9.6 s, giving sums of ≈ 24.8 / 112.7 / 211.3 s (TOWN / CITY / METROPOLIS). V06's D-18 rule then re-declares CITY ≤ 115 s and METROPOLIS ≤ 215 s (the seam's arithmetic, without the re-cut plots, gave 210 s), and TOWN's ≤ 25 s is kept. J-V6.118, BCR-V6-22's parenthesis, the round-5 fix-list sentence's bounds and X46 (marked met) follow. V6 §6.3 cites the bound by name and needed no edit. | §6 (resize row), J-V5.81; V6 §6.2, J-V6.118, BCR-V6-22, X46, V6 §13's round-5 sentence; §12, §13 item 33 |
| SLR5-06 | minor | (a) §12's round-5 PLAUSIBLE clause now reads CONFIRMED, landed with `reconcile-V01-r5` (12:40): V1-3.10.3 step 4's `plantRimWalk` and (6) (c)'s claim re-search, read there, in V1-3.9, V1-6 and T-V1-21. (b) §13 item 30 reads **Landed** with `reconcile-V01-r5` (12:40). Item 31 reads **Landed** with `reconcile-BASE-F-r5` (12:39): item 309's reader clause in BCR-V5-30's words, its label split and item 580's note. (c) §1b's `levelledGroundCm` producer cell reads "else the arena's unlevelled raster — S1's with the T2 terrain strokes on the ground; on a sky key, the island's terrain that SKY writes (V5 §3.8) with the T2 strokes, its fallback from M5 with volume 1's W8 (file f item 309)". (d) §4.2 *Reshaping the rim*'s inward stretch "gives no face and re-derives no district (the claim's aside, re-derived where its claim is re-searched, above …)", matching *Shrinking*. Volume 1's counterpart (SLR5-03) was its own lane's and landed with reconcile-V01-r6 at 13:53 (§13 item 34). | §12 (round 5, new round-6 paragraph), §13 items 30, 31, 34, §1b (`levelledGroundCm` row), §4.2 |
| TW-09 | minor | The same landed halves as SLR5-06 (a)–(b): §13 items 30 and 31 are marked landed with those lanes, and §12's clause moves to CONFIRMED, citing V1-3.10.3 step 4, (6) (c) and item 309's text. | §12, §13 items 30–31 |

Receipts: every edit was applied by exact-match replacement, each old text matching exactly once, after asserting the
file's md5 at this lane's start (`scratchpad/volumes/rcV5r6/rep_v05.py`; the V06 counterpart `rep_v06.py`, which also
asserted V06's md5 and the new text's absence). The pre-reconciliation copies are `scratchpad/volumes/rcV5r6/V05-pre-r6.md`
and `scratchpad/volumes/rcV5r6/V06-pre-r6b.md` (V06 as volume 7's round-6 lane left it, md5 9b7cd451).
