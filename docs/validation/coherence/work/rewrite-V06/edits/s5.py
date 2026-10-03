from lib import *
t = extract(3062, 3288)
# §6.2's century paragraph is rewritten whole (V06-RESTATE-1): cite V05 §6's rows by name with their bounds
a = t.index("**The sky's island events, re-derived from V05 §6's rows**")
b = t.index("**6.3 Replay and load.**")
CENTURY = """**The sky's island events** (J-V6.118), from V05 §6's rows by name with their bounds (the CITY / METROPOLIS columns; a TOWN
reads CITY's, its islands no larger): "a resize, a rim reshape" — its fixed ≤ 5 ms plus §12.6's scoped law per district
it re-derives (≤ 3 in all, V01 §6's sky row) and once over the plots it re-cuts outside them, plus §12.6's 30 ms per
re-claimed landing yard's top and per re-landed foot; "`fallIsland`" ≤ 80 / 110 ms; a raise bounded by "declaring an island
after generation" ≤ 120 / 160 ms. With an island's buildings ≤ 5 % of the town's at the default request (≤ 300 / 750
buildings at CITY / METROPOLIS, §12.5's table) and ≤ 3 accesses an island (`accessCount.max`), a growing resize costs
≈ 5 + 36 + 7 + 90 + 90 ≈ 228 ms at CITY and ≈ 5 + 63 + 7 + 90 + 90 ≈ 255 ms at METROPOLIS (three districts re-derived,
≤ 9 yard buildings re-cut, three tops placed and three feet re-landed), a shrink ≈ 209 ms and ≈ 227 ms (the claim's district
and the rim ring). **One re-landing per foot per resize is the worst case:** a rim moves at most `0.025 · years · r` a
year (V05's dynamics row; ≈ 4.5 m at CITY's `areaHaMax`, ≈ 6.3 m at METROPOLIS's), a ground plot may be 3 m wide (§15.2's
O5 (b)), and a target that moves back and forth carries a foot across the same plot line at every resize; **a fall does
not raise it**, since a fall ends a settled dwell of at least 10 years without a resize (V05 §3.15 (3)–(4)) and a fall
with a raise costs less than the ten resizes the dwell forgoes. So, at worst: **CITY** 3 × 100 × 228 ms ≈ 68.4 s;
**METROPOLIS** 3 × 100 × 255 ms ≈ 76.5 s; **TOWN**, whose rung row admits no island (V05 §3.15 (1)), each of ≤ 3 carried
or declared islands waning once over ≤ 15 epochs, settling and falling: 3 × (15 × 209 + 80) ms ≈ 9.6 s. A history whose
islands resize one epoch in five or fewer (V05's hysteresis against a 1 %-a-year target) spends about a fifth of these.
**The growth stages** at §12.6's law (§6.1): ≤ one stage an epoch at ≤ 6 ms each plus 60 µs × the buildings the century
adds (≈ 2 500 / 10 000 / 25 000) ≈ 0.75 / 1.2 / 2.1 s.
**The sum:** TOWN 100 × (103 + 34) ms + 0.7 s + 9.6 s + 0.75 s ≈ 24.8 s; CITY 100 × (343 + 75) ms + 1.3 s + 68.4 s + 1.2 s
≈ 112.7 s; METROPOLIS 100 × (1 150 + 151) ms + 2.6 s + 76.5 s + 2.1 s ≈ 211.3 s. **The bounds are the sums rounded up to
the next 5 s — TOWN ≤ 25 s, CITY ≤ 115 s, METROPOLIS ≤ 215 s — for the owner's veto (D-18; J-V6.118)**; a measured sum
above its bound re-declares the bound at the measured sum for the owner's veto (D-18). The century runs as a background job
with progress, never blocking the picture or an edit on another document; the map redraws each epoch's `DisplayDelta` as
it folds (the user watches the town grow). `advance.maxEpochs` (200) bounds one request's epochs; a longer span bends its
cadence (V06 §3.3.2).

"""
t = t[:a] + CENTURY + t[b:]
R = [
# §5.1
("their towers with them, and a `dismantled` run's towers draw as trace discs (item 575; TU-01); the cleared record draws no label |",
 "their towers with them, and a `dismantled` run's towers draw as trace discs (item 575); the cleared record draws no label |"),
("| §8.2 (base, as the coherence pass writes item 106) |", "| §8.2 (item 106) |"),
("| §8.2's state rows for raised parts (the coherence pass writes item 110 (b)'s drawing; item 291 names the states) |", "| §8.2's state rows for raised parts (item 110 (b)'s drawing; item 291 names the states) |"),
("read from its host's existence (ST-56); its buildings as ruins", "read from its host's existence; its buildings as ruins"),
("| a struck deck and its ruins |", "| a struck deck and its ruins |"),
("| a raised way neglected, run dry,", """| a failing spring; withered gardens and grove; a dried oasis (V06 §3.12.1) | the pond by the water rows at its present outline (a drying pond's shrinking face); a withered garden by the `commons` land-use row, its channel no longer drawn (the channels are drawn from `fedBy`, §8.2); fewer grove rows; a dried oasis as its `commons` hollow | §8.2's water, land-use and greenery rows (item 111) |
| the replayed past (item 113) | no state of its own: the replay's results are ordinary states — ruins, walls beyond the houses, hollow ways, a buried former settlement in the underground view (II.7.6; V04's view) — and the timeline bar's past range (below) | §8.2 (base); V04 |
| a raised way neglected, run dry,"""),
("""past) — **and every disabled tool offers the way forward: "Change from here: make a copy at year N"** (a `forkAt` at the
seq of the frame on screen, V06 §4.4; item 101 R2). On a rebased document the range before the rebase point is greyed with
its banner (V06 §3.15.5).""",
 """past) — **and every disabled tool offers the way forward: V09's "Open a copy from here"** (a `forkAt` at the seq of the
frame on screen, V06 §4.4; item 101 R2; J-VI.12). On a rebased document the range before the rebase point is greyed with
its banner (V06 §3.15.5); on a document generated from its history the replayed past before the creation week is a
read-only range of its own tint, labelled with the replay record's peak ("a city of twelve thousand", or "a city, its size
not recorded" for a symbolic peak), whose frames scrub and compare but offer no fork (V06 §3.20.6)."""),
# §5.2
("""* **Years.** A week shows as a year and season of the calendar row (§4.11 *The clock* (3)): standalone "Year N,
  spring" counted from the creation week (year 1); dossier-bound, the host's calendar year when `HostContext` gives one,
  else the same form. The year numbering is display only.""",
 """* **Years.** A week shows as a year and season of the calendar row (§4.11 *The clock* (3)): standalone "Year N,
  spring" counted from the creation week (year 1); dossier-bound, the host's calendar year when `HostContext` gives one,
  else the same form; a week of the replayed past (before the creation week) as "N years ago", counted back from the
  creation week. The year numbering is display only."""),
("the aqueduct runs dry.\"; \"{year}: terrace walls slump in {district}.\"; \"{year}: the houses on {subject} are swept away.\"; \"{year}: the rubble of\n  {subject} is cleared from {district}.\";",
 "the aqueduct runs dry.\"; \"{year}: terrace walls slump in {district}.\"; \"{year}: the houses on {subject} are swept away.\"; \"{year}: the rubble of\n  {subject} is cleared from {district}.\"; \"{year}: the spring of {subject} is failing.\"; \"{year}: the oasis of {subject} has run\n  dry.\"; \"{year}: {cause} destroys the town.\"; \"{year}: a new settlement rises on the ruins.\"; \"{year}: the ruins of the old\n  town lie buried under {district}.\";"),
# §5.3
("existence, `decayed` · `ruined`, absent when standing; ST-56); and on a raised way", "existence, `decayed` · `ruined`, absent when standing); and on a raised way"),
("rows as `plat:why`, the property a use's why rows take (ST-32; no second `reason` meaning).", "rows as `plat:why`, the property a use's why rows take (no second `reason` meaning); on an oasis water body `plat:springFlow`; on the document's\n  collection the replay record as `plat:history` (its peak with its `symbolic` flag, its coarse epochs' count and span, its\n  refoundings; item 113)."),
("* **CSV** (§11.1): `chronicle.csv` — week, year, season, kind, district, subjects, count, text, cause (kept across a\n  rebase);",
 "* **CSV** (§11.1): `chronicle.csv` — week, year, season, kind, district, subjects, count, text, cause (kept across a\n  rebase; the replay epochs' lines included, their year in the past form of V06 §5.2);"),
("history\" (on a lone neighbourhood document the block is bent to none with its line, V06 §4.1; ST-41).", "history\" (on a standalone neighbourhood document the block is bent to none with its line, V06 §4.1)."),
# §6
("| fortification (incl. barrier closure, water access, waterfront), terrain and water | 3 | 10 | 25 | a pathway's stretches; candidates; a trace (when one fires) at §4.4 S5a's own budget, excluded |",
 "| fortification (incl. barrier closure, water access, waterfront), terrain and water (the spring row included) | 3 | 10 | 25 | a pathway's stretches; candidates; the spring row's few springs and their faces (< 1 ms); a trace (when one fires) at §4.4 S5a's own budget, excluded |"),
("+ 1 / + 3 / + 8) | 6 | 18 | 48 | the exposure field once; the lottery;", "+ 1 / + 3 / + 8) | 6 | 18 | 48 | the exposure field once; the strike pool;"),
("TOWN's carried or declared islands included — each island event of V06 §3.2's `sky.islands` row at V05 §6's row for it: a **raise** at `raiseIsland`'s parts (the rows \"S7b (5): `S_town`, slots, reasons, fills\", \"S7b (5): outlines and placement\", \"S7b (5): the reachability transform\", \"SKY, per island\", \"SKY: the island's gradient field\", \"SKY: the ground reference and the altitude, per island\" and \"SKY-F\", with V01 §6's sky row's unit run), bounded by the row \"declaring an island after generation\", which adds the fill's relocations; a **`resizeIsland` — growing or shrinking, a wane's included** — at the row \"a resize, a rim reshape\": its fixed part, §12.6's scoped law per receiving district and for the district whose claim is re-searched (V01 §6's sky row) and once over the plots re-cut outside them, and §12.6's post-build placement per re-claimed yard's top and per foot re-landed onto another plot (each ≤ `accessCount.max` per island); a **fall** at the row \"`fallIsland`\"; a **wane**, a **settle** and a **refloat** inside the row \"`IslandEpochStep`, per island\", their households placed by the `siting` step (V06 §6.1); summed into the century below, which quotes the rows' figures once; SLR3-11, TU-06 (a); TV-01, SLR4-09; TW-04) |",
 "TOWN's carried or declared islands included — each island event of V06 §3.2's `sky.islands` row at V05 §6's row for it: a raise bounded by \"declaring an island after generation\" (its parts' rows and V01 §6's sky row's unit run inside it); a resize, growing or shrinking, a wane's included, at \"a resize, a rim reshape\"; a fall at \"`fallIsland`\"; a wane, a settle and a refloat inside \"`IslandEpochStep`, per island\", their households placed by `siting` (V06 §6.1); summed into the century below) |"),
("the arch-vault reconcile over `scope.raised` ≤ 3 ms p95 (critique-V4 C4-110-11), the invert drops)", "the arch-vault reconcile over `scope.raised` ≤ 3 ms p95, the invert drops)"),
("| ≤ 1 ms per island (critique-V5 C5-47 (5)) |", "| ≤ 1 ms per island (V05 §6) |"),
("verifies within §6.2's CITY century bound after load (its island events included; TV-01), off the path", "verifies within §6.2's CITY century bound after load (its island events included), off the path"),
("cell, read from the sampler's layout (ST-47) — by default one point and nine suns, 9 bits a cell (V05 §3.19 (1),\nJ-V5.42): ≈ 11 KB at CITY (≈ 10 000 cells), ≈ 45 KB at METROPOLIS (≈ 40 000 cells), each island arena ≤ 5 KB; if item\n102's application raises the sampler to four points a cell, the bound is 36 bits a cell — ≈ 45 KB, ≈ 180 KB and ≤ 20 KB.",
 "cell, read from the sampler's layout (§4.5) — by default one point and nine suns, 9 bits a cell (V05 §3.19 (1),\nJ-V5.42): ≈ 11 KB at CITY (≈ 10 000 cells), ≈ 45 KB at METROPOLIS (≈ 40 000 cells), each island arena ≤ 5 KB; under the\nsampler's pre-decided fallback of four points a cell (`daylight.pointsPerCell` 4) it is 36 bits a cell — ≈ 45 KB, ≈ 180 KB\nand ≤ 20 KB."),
("**6.6 Exports.** A frame's PNG export at the PNG export's own budget (§12.7) plus the frame's build (6.4); the APNG ≤ that\n× its frame count, streamed.",
 """**6.6 Exports.** A frame's PNG export at the PNG export's own budget (§12.7) plus the frame's build (6.4); the APNG ≤ that
× its frame count, streamed.

**6.7 The history replay at generation** (item 113; V06 §3.20). Not the one-click path: a document generated from its
history shows its **start state** — S0–S13a at the start population — by §12.5's first-map law for the start rung, then
redraws each coarse epoch's `DisplayDelta` as it folds (the user watches it age), with progress, and is ready for editing at
the replay's end. A coarse epoch costs one epoch of §6.1 and §6.2 at its rung — `≤ 137 / 418 / 1 301 ms` at TOWN / CITY /
METROPOLIS, its decade changing the probabilities and caps, not the passes — plus at most one growth stage at §12.6's
law, less the lazy detail of V06 §3.20.4 (no history-store images or keyframes, the `'last'` participants once). With `R ≤
replay.maxEpochs` (60), the **replay's budget** is ≤ 10 s from a TOWN start, ≤ 30 s from a CITY start and ≤ 90 s from a
METROPOLIS start (p95, reference hardware; PLAUSIBLE until E0 times it on the history fixtures, V06 §8), the start
generation and the first map excluded. *Pre-decided fallback* (a miss): the epoch length doubles (`epochYears` × 2, the
count halved, every event still mapped to its coarser epoch) until the bound holds — a declared shift in the past's grain
for the owner's veto (D-18), never an event dropped and never a whole-replay retry."""),
]
t = apply(t, R)
t = strip_critique(t)
t = strip_narr_ids(t)
save('15-s5-6.md', t)
print(words(t))
