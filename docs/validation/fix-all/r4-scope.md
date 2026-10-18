# Fix-all round 4 — SCOPE area (§1, §13, §14, §15, §16, §17, Delegated decisions, Judgment calls, Staged section, one-page summary): the nine items still open after round 3
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat fixall/draft-scope-r4 (2026-09-25); queued in docs/FABLE-REVIEW-QUEUE.md.

Lane `fixall/draft-scope-r4` · 2026-09-26 · seat: fix architect, SCOPE area, round 4 (Fable role; opus stand-in).
Status: COMPLETE (2026-09-26).

## 0. How to read this file (plain words)

This file fixes the last nine small problems the round-3 checkers found in the parts of the design that say what is
built, in what order, how it is tested and how it stays legally clean. **All nine are fixed; none is declared wrong,
none is postponed.** In plain words:

* **Editing interface (VD3-7).** The function that "keeps the saved town" can now say *at which point in the edit
  history* the saved town sits, as the load procedure needs.
* **Summary wording (NP3-9, VS3-2).** The one-page summary no longer says shadows and 3-D "can be added later" — both
  are built — and its speed promise now gives both numbers: the size up to which a *typical* run meets the targets
  (about 4 500 / 17 700 / 59 000 people) and the smaller size up to which *every single run* does (about 3 400 /
  13 600 / 46 000). The same correction is made in the size table's notes and the parity checklist.
* **Who runs the copy checks (VS2-8).** The script that stops copied reference material from entering the design must
  be run by *every* seat that edits the design — including the owner-amendment pass that runs next — and this file
  gives the exact sentence to add to that pass's instructions.
* **Memory measured at the right milestone (VS3-1).** The memory test "while a saved town with 300 edits re-checks
  itself" moves from the first milestone to the second, which is the one that builds editing and saving; the first
  milestone keeps its memory test of freshly generated towns. The same logic moves a naming test to the milestone that
  builds the tables editor and setting packs, and gives the size test of an edited, re-based saved town the milestone
  that builds editing (it had none).
* **Named sources (VS3-3).** The list of published algorithms now names every method the text uses — the seven the
  checker found and seven more a scripted scan of the text found.
* **The copy check looks in the right place (VS3-4, and one more found here).** The check now also reads the raw
  capture files (FTG's content database and 2 000 other recordings). Testing it showed that comparing word sequences
  cannot catch a list pasted in a different order — 0 of 429 alphabetised five-name lists were caught — so a second,
  order-free check was added: it catches all 429 and flags only 8 existing lines, each reviewed here. The same hole
  existed in the product's own later scanner, which now gets the same order-free check.
* **A number that did not reproduce (VS3-5).** "27 runs" becomes the reproducible "47 runs (45 distinct)", with the
  exact text it was measured on saved beside the script.
* **The owner's side-by-side panels (VS3-6).** Against FTG (which cannot be seeded) each captured FTG town is used once,
  paired with a PLAT town seeded from the capture's name, and the pass mark is two of three per size. Against
  Neighbourhood at stage 2 there are now fixed seeds for all four of its templates and a written rule for choosing the
  PLAT district of matching size.

The four other areas asked this area for changes (kernel r4 X-S1–X-S3, determinism r4 SR4-1–SR4-5, rendering r4
S1–S15, pipeline r4 X-S1–X-S5). Those that touch the sections replaced here are folded into the blocks below, with
two corrections of timing recorded as a judgment call (J-S37); the rest are applied by the integrator as written. Everything a later reader needs
to check is in §5: what was executed (CONFIRMED) and what is reasoning (PLAUSIBLE).

## 1. Disposition table

| item | sev | disposition | sections changed (blocks in §2) | the mechanism, in one line |
|---|---|---|---|---|
| VD3-7 | minor | **FIX** | §14 (`EditEngine.rebase`); J-S38 | `rebase(doc, reason, at?: number /* default: the log head */)`; `at` may name the head or the decoded snapshot's `model.seq` (h₀), the two states the engine holds materialised, and any other position is refused with `E_REBASE_AT` — so §2.9 step 4's keep-the-saved-town rebase at h₀ behind the head is expressible (determinism SR4-3 is the same change) |
| NP3-9 | minor | **FIX** | one-page summary | "…even though the map is drawn from above, so the optional shadow pass and the 3-D export read real heights." |
| VS2-8 | minor | **FIX** | §17.1 (2); J-S32; `docs/validation/bench/doc_checks.py` header; the shared prompt of `workflows/04-amendments.js`, `05-fable-review.js` and `06-fix-all.js` (applied, §3.5) | the rule binds every seat that writes this document — a fix-all integration seat, an amendment pass's apply and repair lanes, any finishing or repair seat — before its change lands, with the command line stated in (2); one line added to each workflow's shared prompt names the check for every lane that writes the document and has it record the counts in its output file |
| VS3-1 | minor | **FIX** | §16 (M1, M2a, M2b exits); J-I14 (merged with determinism's round-4 amendment); J-S37; rendering requests R-1, R-2 (§12.8, §12.1) | the memory measurement under load verification of the reference 300-edit CITY document — with a district regeneration and a Re-derive from S3 applied during it (VD3-5) — is an M2a exit criterion at pool sizes 0 and 3; M1's exit keeps memory on generated towns at TOWN and CITY; M2b's adds METROPOLIS |
| VS3-2 | minor | **FIX** | one-page summary; §1.1 *Budgets inside a rung*; §15.1 FTG H2; rendering request R-3 (§12 plain words, §12.9) | both knees stated: p95 up to ≈ 4 500 / 17 700 / 58 800 people, every single run (the 1.25 × max clause) up to ≈ 3 400 / 13 600 / 45 800; above them p95 ≈ 0.2 / 0.48 / 1.9 s and the slowest allowed run a quarter more (246 ms / 601 ms / 2.4 s) |
| VS3-3 | minor | **FIX** | §17.1 (8) | the seven sources VS3-3 names, each with its section, plus seven more a scripted scan of 119 method names found (`fixall_scope_r4_methods.out`): ridged multifractal noise and domain warping (§3.1), power diagrams with area targets (§4.9), Kahn's topological sort (§4.1, §4.12), SHA-256 (§17.1 (5)), Shannon entropy (§13.5, §13.7), the Jaccard index (§6.3, §7.5), the Hausdorff distance (§3.7, §13.2, II.5) |
| VS3-4 | minor | **FIX** | §17.1 (2) (ii), (iii), new (vi) and *Calibration*; `doc_checks.py` (C2, C3, new C4); `docs/validation/doc-checks-allow.tsv` (a pre-reviewed round-4 block); J-S35 | (ii) reads `captures/**/*.json`; (iii) adds the string keys and values of every JSON file under `research/` and `captures/` in document order, numeric tokens dropped; (vi) C4 finds a copied list in any order — ≥ 5 members of one recorded list on one line; executed: 429 / 429 pasted FTG lists caught, 8 existing lines flagged and reviewed, 0 unreviewed hits added to the current text |
| S4-1 (found here) | minor | **FIX** | §17.1 (5); J-S36 | M-1's hashed deny-list had the same hole (token digests skip dictionary words; 3-gram digests need the order): it now also holds, per reference list, the set of its members' salted digests, and the scanner flags a line or table column holding ≥ 5 members of one set, reviewed by an allow entry with a reason |
| VS3-5 | minor | **FIX** | §17.1 (2) *Calibration*; J-S32 | "47 runs of five or more tokens (45 distinct; §13 24, §14 4, §15 11, §16 6, §17 2)" on the pre-round-3 §13–§17, now committed as `docs/validation/bench/fixall_scope_r4_calib_pre_r3_s13_s17.txt`; receipts: the verifier's part C and `fixall_scope_r4_cleanroom.out` part A (which also shows no threshold 1–7 gives 27) |
| S4-2 (found here) | minor | **FIX** | §16 M2a exit; determinism request DR-3 (§2.9 size budget) | the same class as VS3-1: §2.9's rebased-document size test (VD2-9) is worded "at M1" and listed at no milestone, though no edit or rebase exists before M2a; it becomes an M2a exit criterion (a CITY document rebased by keeping the saved town, after 20 edits, ≤ 1.25 × the unrebased one, or §2.9's block-group fallback) |
| VS3-6 | minor | **FIX** | §13.6 (2), (3), (6), (9) (`D5Pair`, `D5Record`); §16 M-1 and M5; J-S33, J-S34 | FTG: one pair per FTG capture at the matched size, each used once in capture order, PLAT at FTG's population and the capture's water setting with seed `H32("d5-ftg/⟨milestone⟩/⟨rung⟩/⟨capture id⟩")`, M-1 taking each size's captures at the water options nearest `none` (one) and `coast+river` (two), the first capture's pair showing the extramural suburb, two thirds counted per rung (2 of 3); NG at M5: five seeds per template for all four templates (`area`, `street`, `square`, `ring`), `H32("d5-ng/M5/⟨template⟩/⟨i⟩")` reduced into NG's MINSTD range, PLAT's side the district opened with the same template whose building count is within ± 20 % of the NG hood's, found by a committed search over `H32("d5/M5/⟨template⟩/⟨i⟩/⟨k⟩")` METROPOLIS seeds |

**Tally:** 11 items — the nine assigned, S4-1 found while fixing VS3-4 and S4-2 found while fixing VS3-1 — **11 FIX**, 0
INVALID, 0 STAGED-BY-OWNER.

**Requests from other areas folded into this file's blocks** (the integrator marks them applied through these blocks and
does not apply them again): kernel r4 **X-S1** (§13.1) and **X-S3** (§13.2); determinism r4 **SR4-1** (§13.2), **SR4-2**
(§16 — with two timing corrections, J-S37: the memory measurement under load verification at M2a, not M1, per VS3-1;
the naming-input re-draws at M3a, not M2a, because their triggers — table edits, setting packs, upgrades — arrive at
M3a), **SR4-3** (§14, identical to VD3-7) and **SR4-5** (the one-page summary). Rendering r4 **S1–S3, S15** (§14), **S4, S5** (§13.2), **S10** (§15.1) and **S11** (§16), and pipeline r4
**X-S1** (§13.1, §13.2, §16 M3a), **X-S2** (§13.2, §16 M1), **X-S3** (§13.1, §13.2) and **X-S5** (§14), which landed
while this lane worked, are folded too, each verbatim. **Applied by the integrator as written, not folded:** kernel r4
**X-S2**, determinism r4 **SR4-4**, rendering r4 **S14** and pipeline r4 **X-S4** (judgment-call rows) — except J-I14,
which both determinism's SR4-4 and this area's VS3-1 amend and which §2 gives merged — and rendering r4 **S6–S9, S12,
S13** (§13.3, §13.4, §13.7, §13.8, D-18, D-11: sections this lane does not replace).

## 2. Replacement blocks

Each block is the complete new text of its subsection, built from the round-3 integrated text (md5
`a8c2de844218f98444f1479ffb2b292a`) by scripted, count-checked replacements, so every sentence not named in §1 is
byte-identical to the current text. All blocks were applied together to a copy of the document and checked (§5):
`doc_checks.py` exits 0 over the changed sections, 0 broken table rows in the whole document, every `§` pointer resolves.
The blocks of §13.1, §13.2, §14, §15.1 and §16 also carry the folded requests listed under §1's table, each marked
with its source ("kernel round 4 X-S1", "rendering round 4 S4", "pipeline round 4 X-S3" …) where the text names one.

=== REPLACE The whole design in one page (plain words) ===
## The whole design in one page (plain words)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r4); earlier revision fixall/integrate-r3, fixall/integrate-r2, fixall/draft-scope-r1

We are building one program that draws believable medieval towns and cities at three sizes — town, city, metropolis,
with the size inside each set by the requested population — the way watabou's Medieval Fantasy City Generator (MFCG) and
Thomas Allerton's Fantasy Town Generator (FTG) do, taking the best idea from each at every step and adding our own
measured improvements. Later the same program will open any district as a detailed neighbourhood (stage 2), and later
still each building will be composed of wings and roofs the way Fantasy Manor builds a manor (stage 3). A separate
village generator (thorp → hamlet → village) comes afterwards; this design carries the hooks it needs and does not pay
for it.

How it works, in order. First the ground: a real heightfield in metres with water that flows downhill, so rivers always
reach the sea and coasts never contradict the contours (neither reference has this; MFCG restarts a whole city when its
river fails). Second the demand: from the requested population we compute, from our own tables, how many houses,
workshops, inns, churches and so on the town needs and how much land that takes — before any street is drawn (FTG's
idea). Third the big decisions: the market square, the castle and the large precincts are reserved; the main roads to
the gates are worked out first, the first wall follows the town's edge measured along them, and each gate stands where
its road crosses that edge; moats and canals are dug with a bridge at every gate and crossing, and a walled port's harbour road leaves through a
gate like every other road; and each later ring of
wall is traced before the streets it encloses are grown, so nothing later has to cut through them (MFCG builds its wall
first for the same reason). A strip along every wall is kept free of houses and lanes by construction. Fourth the streets: main roads are routed between real
destinations (gates, the market, bridges, the harbour) over the terrain; inside the walls the lanes are cut by the "bent
cut" that gives watabou's maps their charm — one bend, arriving square to the far side — measured from Neighbourhood's
recordings, while outside the walls side streets grow along the main roads the way FTG's do. Fifth the districts: groups
of blocks named for their market, gate, harbour or castle, shaped by a prosperity field that rises near the centre, the
market and high dry ground and falls near tanneries, walls and damp low ground. Sixth the plots: every block is divided
from its street frontage into parcels whose width and depth follow prosperity — rich quarters join plots into fewer,
larger ones with courts; poor quarters split them and get narrow alleys. Seventh the buildings: each plot gets a site
plan — a row house with party walls, a manor set back behind a yard with outbuildings, a detached house, a hovel — and
every building carries its floors and roof heights even though the map is drawn from above, so the optional shadow pass and
the 3-D export read real heights. Then towers, the castle, bridges, the harbour, fields and woods sized to the population, greenery placed by
rules that read prosperity, and finally names and curved labels that never cover a gate or a keep.

Everything is drawn from one "display list", so the same town renders as a clean ink map (the default, in MFCG's
family), as a textured lit map like FTG's, or as a hatched close-up like Neighbourhood's — all on one drawing path — and
exports to SVG, PNG, GeoJSON, virtual-tabletop scenes and 3-D; the first picture shown is always the finished city map,
never a rough preview — under a second for every town and city and for a metropolis of up to about 48 000 people, and
up to about 2.3 seconds for the very largest (120 000 people), a trade stated openly for the owner's veto. Building the
town itself meets the improvement plan's speed bars for a typical run in towns up to about 4 500 people, cities up to
about 17 700 and metropolises up to about 59 000, and for every single run up to about 3 400, 13 600 and 46 000; larger
ones take up to about 0.2, 0.5 and 1.9 seconds in a typical run and up to a quarter longer in the slowest, declared the
same way. At city
zoom neighbouring districts are labelled together as named quarters, as many as MFCG labels. Everything is editable: every element and every rule
table can be changed, edits are saved as a list of events on permanent addresses, they survive regeneration and version
upgrades, and the generator repairs around them locally instead of re-rolling the world: moving a river or digging a
canal first lays the main roads across their new bridges and cuts the lesser streets back from the new bank, then puts
the water in, and changes nothing outside the few blocks it names beforehand; a bridge or street that an edit rebuilds
keeps its name, while choosing your own list of names or editing a naming rule renames exactly the names that list or
rule made, after you confirm them; a saved town can be edited as soon as it opens — once it has checked, in a fraction
of a second, that its saved copy matches its own fingerprint — while a full re-check from its recipe runs in the
background; and undo
works the same when several people share one town and after the file is closed and reopened. The same seed always gives the
same town on every machine. Adding a new kind of decoration or name, re-rolling one block or growing the town never
reshuffles what already exists; a change to how an early step works changes the towns built on it, and every release
declares such a change, stage by stage, instead of letting it slip through; edited towns keep their edits through their
permanent addresses. There is no whole-map retry: every step that can fail has a short, bounded fallback ladder, and the
report says for every requested feature whether it was delivered in full, simplified or left out.

How we know it works. The riskiest part — whether grown streets and bent-cut lanes fit together within the speed budget
— is measured first, in a spike, and again on real terrain and water at the first milestone. Every acceptance number
says whether it only checks that a rule was followed, compares us with a measured MFCG or FTG number, or shows that the
town is better; the owner's side-by-side judgement follows a written, blind protocol at matched sizes, and every
threshold has a number today; a milestone the owner has not yet rated keeps building but is marked provisional and never
claims "at parity" or "mastered" until the owner rates or accepts it. The first product milestone is a viewable town for the owner's eye; editing comes
directly after it, because the owner ranks editability first. The programmers work from this document and a cleaned
digest of the research — never from the references' code, word lists or palettes — and every library is permissively
licensed, so the owner keeps every licensing choice.

What comes later, by the owner's own roadmap, with its hooks built now: neighbourhood close-ups, manor-style buildings,
the village product, sewers and floating islands, the town's evolution over decades, calibration against historical
maps, and SettlementForge inputs. Nothing else is postponed.

=== REPLACE §1.1 What is built, in what order; the two size ladders ===
### 1.1 What is built, in what order; the two size ladders

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r4); earlier revision fixall/integrate-r3, fixall/draft-scope-r3

| stage | what | depth in this document |
|---|---|---|
| **STAGE 1 — the BASE** (built first) | one general town/city generator on the ladder **TOWN → CITY → METROPOLIS**, fusing MFCG-class and FTG-class generation plus O1–O19: the plot model, plot granularity, prosperity field, greenery, heights, editability, permanent addresses, layers, drainage, every owner hook, and the optional content module `@plat/sim` (its own milestone, M4b) | build-ready: §2–§14, §16 |
| **STAGE 2** (designed here, built after the base) | the same town composed of NG-class neighbourhood close-ups with consistent seams, shared seeds and one style system | interface depth: PART II; what the base must already carry is a base requirement (§2.5, §4.12) |
| **STAGE 3** (staged by the owner, after stage 2) | manor-style building compositions per plot, from a giant manor to a hovel by data rules | hooks concrete: §2.6 (`outline` / `compose` split, cost contract, intake measurement), §8.6 |
| **VILLAGE** (a separate product, staged by the owner; THORP → HAMLET → VILLAGE) | not designed; its hooks are concrete and nothing in the base precludes it | PART III, §15.1 VILLAGE-LATER rows |
| **staged by the owner, hooks concrete** | sewers and floating islands (II.6; §2.1 layers, §2.3 drainage); the evolution engine beyond the one built growth path (§4.11); calibration against the historical corpus (§13.9); SettlementForge inputs (§11.4's host-input contract) | the named sections |

**The two ladders (owner rule 4).** The town/city generator scales **TOWN → CITY → METROPOLIS**; the village product scales
**THORP → HAMLET → VILLAGE** (PART III). The ladders meet without a gap or an overlap: the village ceiling and the base
floor are both **1 500 inhabitants** (D-33). **Size within a rung follows population** (owner, 2026-09-25): the request's
population chooses the rung whose band contains it — bands include their lower bound and exclude their upper one, so
TOWN is [1 500, 10 000), CITY [10 000, 30 000) and METROPOLIS [30 000, 120 000] — and every quantity below it — roster,
stage budgets, district count, frame, plots — is computed from that population, never from the rung's target. All three
rungs generate from M1 — a rung is a `ladder.json` row on the one pipeline, not a separate build — so M1's goldens,
B-CITY runs, determinism tests and diagnostic side-by-side include METROPOLIS; M2b measures and tunes it (§16; VS2-2).

**The rung profile.** Everything the owner's rule says is "defined per rung" lives in one versioned data table,
`ladder.json` in `@plat/tables`, one `RungProfile` row per rung, calibratable like every table (§7.6) and refined by the
corpus phase (§13.9):

```ts
interface RungProfile {
  rung: 'TOWN'|'CITY'|'METROPOLIS';
  populationBand: [number, number]; populationTarget: number;           // the band chooses the rung; the target is the default request
  frameAreaKm2AtTarget: number; aspect: [number, number] /* 0.5–2; square by default */;   // side scales with √(population ÷ target) (§3.2, §12.2)
  stageRows: StageRowRef;                                               // stage count, regimes and walled shares (§4.2 S2)
  budgets: BudgetRef;                                                   // model, first-map and memory budgets (§12.3, §12.5, §12.8)
  granularity: { frontageScale: number; depthScale: number; joinMaxDelta: Record<ProsperityBand, number> };   // scales the §4.7 rows
  greenery: { parkPer1000Scale: number; edgeGreenProb: number; privateGreenShift: number /* points */ };       // scales the §4.9 rows
  districtCountLaw: LawRef; gateLaw: LawRef;                            // §4.5, §4.8
  matched: { mfcgSize: number; ftgSize?: 'BIG_TOWN'|'BIG_CITY'|'METROPOLIS' };   // the side-by-side references (§13.6)
}
```

| rung | population band (default target) | buildings at the target | frame at the target (+ 30 % margin per side) | stage rows | model p95 at the target (§12.3's law inside the band; O3 (d) read over the band) | granularity (frontage × / depth × / rich join max +) | greenery (parks per 1 000 × / edge green or orchard probability / private green shift) | matched references |
|---|---|---|---|---|---|---|---|---|
| TOWN | 1 500–10 000 (5 000) | 1 200–1 500 | 4 km² (2.0 km square) | 2 stages; walled core 0.90 of buildings, ribbon 0.10 | ≈ 100 ms (92–110 ms) | 1.10 / 1.10 / 0 | 0.8 / 1.0 / +5 points | MFCG size 40; FTG BIG_TOWN (≈ 5 600) |
| CITY | 10 000–30 000 (20 000) | 4 500–6 000 | 25 km² (5.0 km square) | 3 stages; 0.55 / 0.33 walled, ribbon 0.12 | ≈ 300 ms (265–340 ms) | 1.00 / 1.00 / 0 | 1.0 / 0.6 / 0 | MFCG size 80; FTG BIG_CITY (24 500) |
| METROPOLIS | 30 000–120 000 (50 000) | 12 000–15 000 | 64 km² (8.0 km square) | 4 stages; 0.30 / 0.30 / 0.28 walled, ribbon 0.12 | ≈ 800 ms (724–880 ms) | 0.90 / 0.95 / +1 | 1.2 / 0.4 / −3 points | MFCG size 130; FTG METROPOLIS per D-31 |

**Budgets inside a rung (VS2-3, NR-1, VS3-2).** Because size follows population, a rung's budgets are §12's laws of its
building count B, never one number per rung; the table's model column is the law at the target's building range. Model
p95: TOWN ≤ 20 ms + 60 µs × B, CITY ≤ 40 ms + 50 µs × B, METROPOLIS ≤ 100 ms + 52 µs × B, and no single generation
above 1.25 × its own law (§12.3). O3 (d)'s bars — 100 ms, 300 ms, 1 s — therefore hold for p95 up to ≈ 1 333 / 5 200 /
17 300 buildings (≈ 4 500 / 17 700 / 58 800 people) and, for the max (every single run), up to ≈ 1 000 / 4 000 /
13 460 buildings (≈ 3 400 / 13 600 / 45 800 people); above them they are missed: p95 ≈ 196 ms and ≈ 481 ms at the TOWN
and CITY band tops and ≈ 1.92 s at the METROPOLIS cap, the slowest allowed run 1.25 × that (≈ 246 ms, ≈ 601 ms,
≈ 2.4 s). The first map follows §12.5's laws: under 1 s for every TOWN and CITY
and for METROPOLIS up to ≈ 14 200 buildings (≈ 48 000 people), ≈ 2.3 s at the 120 000 cap. Both misses are declared
for the owner's veto (§12.3, §12.5, D-18).

The stage rows are §4.2 S2's (MFCG's measured 0.87–0.92 of buildings inside the outermost wall); the budgets are §12's;
the matched references are §13.6's. *Chose* modest per-rung modifiers — wider and deeper plots and more private green in
a town, narrower frontages, larger joined rich plots and more public parks in a metropolis — *over* identical rows at
every rung *because* the owner asked for granularity and greenery to be defined per rung, and land pressure in the core
rises with town size (the historical pattern the corpus phase will calibrate); the values are PLAUSIBLE defaults with
provenance "architecture 2026-09-25". **Confirmation (M2b, B-CITY):** the modest band's median frontage orders TOWN >
CITY > METROPOLIS and park area per 1 000 inhabitants orders TOWN < CITY < METROPOLIS. **Pre-decided fallback:** if an
ordering fails, that modifier's distance from 1 is doubled once and re-measured; if it still fails, the modifier is set
to neutral (1.0 / 0) and the ordering is reported as not produced.

**Requests at the ends of the ladder.** A request below 1 500 inhabitants is routed by `LadderRouter.route(population) →
{ product: 'base' | 'village', rung }` to the village product (PART III); while no village product is registered the
base builds a 1 500-person TOWN and `requestedVsBuilt` reports the clamp. A request above 120 000 is clamped to 120 000
and reported. A request that names both a rung and a population outside that rung's band is an F-EDIT conflict whose dry
run offers the rung the population belongs to.

=== REPLACE §13.1 Kernel property tests (fast-check; B-FUZZ) and the ladder coverage test ===
### 13.1 Kernel property tests (fast-check; B-FUZZ) and the ladder coverage test

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r4); earlier revision fixall/integrate-r3, fixall/draft-scope-r3

Every kernel primitive is fuzzed with two input families, held to one bar — **0 crashes, 0 hangs (hard timeout), 0
invalid outputs** — at the sizes of §13.8's tiers.

1. **Random inputs** (`fast-check`): concave, holed, thin, near-collinear, snapped, duplicated-vertex, ≥ 300-vertex and
   zero-area polygons and chains.
2. **Constructive degeneracies (GEO-12).** Random sampling almost never lands on an exact degeneracy — a line across a
   2²⁴ frame holds at most 2²⁴ of its 2⁴⁸ lattice points, so a random third point is collinear with probability
   ≤ 2⁻²⁴ — so every degenerate class is built on purpose from random parameters:
   * lattice points exactly on a segment, placed by gcd stepping (`p₀ + k · d / gcd(dx, dy)`);
   * collinear triples and collinear overlapping edges (shared runs from 1 cm to the whole edge, same and opposite
     direction);
   * cuts through a vertex and cuts grazing a reflex vertex (through it, and offset by 0 and ± 1 lattice unit);
   * antennae (chains dangling into a face) and chains touching a boundary at one point;
   * coincident typed chains — a wall on a bank, a quay on a shore, a street on a district boundary, a track on a field
     boundary;
   * rectangles, squares and regular n-gons (n = 3 … 12) rotated by random angles and snapped to the lattice;
   * holes touching the outer ring at a vertex and along an edge, and holes touching each other;
   * simultaneous skeleton events (regular polygons, equal-sided rectangles, symmetric notches);
   * values exactly on quantisation boundaries (half-centimetre ties before snapping; ± (2²³ − 1)) and values `snap`
     must refuse (± 2²³, NaN, ± ∞);
   * the attraction, move and kept-content cases (GEO-3, GEO-5, GEO-35, VK-1–VK-18): a vertex at (20, 20) against the
     edge (0, 0)–(1 000, 0) (it moves onto (0, 0); no sub-`minEdge` edge); a chain crossing an edge next to a vertex
     standing 25.0–25.7 cm from it; a stretch whose join point lies within `attractCm` of an edge endpoint; a `warp`
     with `fromLevel = 1` over a street ending on a shore (the junction slides along the shore and the step commits); a
     `pinch` that would shorten an edge below `minEdge` and a step that would put two vertices on one lattice point (both
     halve); a 20 × 10 m rectangle with a 3 × 2 m notch on a long side (skeleton path; no roof line outside); star rings
     of radius 2²³ − 2 (`area2` exact); an L1 lane into a face holding kept L3 content of an earlier stage (`E_KEPT`); a canal across a CITY district
     that cuts a lane whose remainder is pruned and re-routes a `primary` — every face outside its footprint (§4.11: the
     channel buffer ∪ every L1 cell its way rule touches) byte-identical except the seam exception at its boundary, and
     its L0 channel attracting onto exactly its prepared vertices (each promoted, no other finer vertex promoted, each deck
     carrying `deck` beside `way` in the form §2.2 rule 7 defines — the kept way's own L1 edge, no L0 edge across the
     channel, J-I12); a course-knot move and a river move across a street
     grid, with the same footprint and contact assertions (§7.3 (b)); a canal crossing a walled CITY's wall between two
     towers — no `E_KEPT` and no `E_LEVEL`, every face outside §4.11's footprint (the cells its buffer meets and its way
     rule touches, the old run's strip-line stretches and the new strips' ground included) byte-identical less the seam
     exception, every way the new strips meet cut at their boundary, the water gate's `Gate.banks` on its two `gate_end`
     vertices (NP3-2, pipeline round 4 X-S1); a carve chain that touches a finer edge away from
     its prepared vertices (`E_LEVEL` inside the clear region, `E_KEPT` outside; §3.3 clear regions); a lane removed from a spine it ended on (the spine's chain restored exactly, its own
     shape vertices untouched; the `split` flag, §2.2 rule 3); II.1 (3)'s neighbour
     step beside finished plots — a plot-line end within `attractCm` of the foot (promoted; every plot ring unchanged), one
     farther (a kerb split; each ring equal to its prior ring with the vertex removed), and the street removed again (the
     kerb restored exactly), by an undo and by a reroll — at a promoted plot-line end and at a promoted footprint corner, the kerb's L2 route and digest, the block's and the plot's rings and the wing rings
     equal to those before the step (II.1 (3); NP3-5, pipeline round 4 X-S3); an S8
     T-junction on a spine with a width profile (every sampled half-width unchanged); a pool overlay writing outside its
     district (`E_SCOPE`); a logged `moveVertex` replayed after an upgrade that puts an unrelated vertex 20 cm from its
     position (bound to the signature-matching vertex or orphaned, never to the unrelated one); a slot freed and reused
     inside a stage (the query returns the new item); a pooled district beside the settlement perimeter commits plot
     lines that end on the backland part's inner edge with 0 unresolved crossings at pool sizes 0 and 3, and every
     freeze finds every dynamic grid and tombstone set empty after its rebuild (§3.3 pool step 1); an L3 query in a block before and after S11
     derives L4 there — two plots sharing their lowest-leftmost vertex with an L4 vertex on their shared edge — returns
     its results in the same order (`fixall_kernel_r3_checks.out` C); a `warp` over a spine carrying a same-level
     T-junction, then its lane removed (the junction stays as a shape vertex of the warped spine), and a `warp` that
     re-seats a Steiner vertex, then `clearFiner` (the vertex dissolves and the coarser edge is restored exactly); a warp
     moving a kerb beside a vertex 25.3 cm from it — the kerb (0, 0)–(1 000, 9) past (517, 30) — commits, its re-seated
     vertex placed by the placement rule (`fixall_kernel_r3_checks.out` A); a `warp` over a locked plot and over a pinned
     building (every corner held; a neighbour's footprint corner on the locked plot's line slides) and a `warp` with
     `fromLevel = 1` over finished fabric (0 `E_KEPT`); a way split between two width knots (every sampled half-width
     within 10⁻⁹ cm of its value before the split), then re-joined (the original profile bit for bit); the frozen copy
     sent to a pool worker holds typed arrays only — no `Map` or `Set` reachable from the message; and (kernel round 4,
     X-S1) a canal across an open enceinte's glacis line and a river moved through a walled town — every indexed role
     unique per ordinal (§3.10), the water gate's `Gate.banks` resolving to its two `gate_end` vertices, and no `anchor`
     contact name left after the edit; II.1 (3)'s neighbour step at a plot-line end, then the street removed by a
     reroll, not an undo — the kerb's L2 route, index and digest equal to those before the step; a river moved away from
     a quay-lined and a walled bank — the quay and wall edges back at L1, the L0 view land and water only, and a deck
     left over land at L1 until F-REDERIVE; a warp that re-seats two Steiner vertices whose projections lie within
     `minEdge` + 1 cm of each other gives identical output after a slot renumbering (the two placement orders differ in
     6.8 % of such pairs, `fixall_kernel_r4_checks.out` B); a stretch of a way removed between two junctions and a
     stretch of a ring removed between two anchors — the rest of each chain unchanged and every remaining profile sample
     within 10⁻⁹ cm of its value before (`fixall_kernel_r4_checks.out` C) — and a removal that leaves a way in two parts
     without a `rekey`, refused by role consistency; a promotion that leaves another finer vertex 1.2 cm from its new
     route edge commits with no `E_INVARIANT`, and every index query whose box meets that vertex returns it.

**Properties** (checked after every operation): output simple; nesting by index (every face inside its parent); no
edge shorter than `minEdge` from any writer, after every insertion and every warp step, and clearance ≥ `minEdge`; Euler characteristic after every insertion;
`remove(insert(x)) ≡ id` on the topology; **`splitFace` children tile the parent exactly at the child level (integer
`area2` equality)**; `mergeFaces ∘ splitFace` restores the ring and the id; `corridorUnion` faces disjoint and covering;
`offset(−d) ∘ offset(+d)` ⊆ original and `insetFace` empties monotonically; **every straight-skeleton output passes the
§3.8 validator — a connected graph inside the face whose number of independent cycles equals the number of holes — or is
a reported downgrade**; OBB contains the hull and collinear input returns `E_DEGENERATE`; LIR inside the face; snap
rounding idempotent and terminating within its bound; the `orient2d` sign equal to a BigInt reference on adversarial
triples; Poisson minimum distance ≥ r; differential agreement with the CI oracles (Clipper2-WASM in Node,
`polygon-clipping`) on booleans and buffers, split by attraction (§3.7): unattracted cases with equal face counts and
symmetric difference ≤ perimeter × 1 cm, attracted cases valid and within perimeter × √2 · `attractCm`, ≥ 10⁵ unattracted
cases per operation; roles preserved on coincident chains (a sliver between a spine and a
shore keeps both); a declared batch's result identical under any permutation of its ops, and a callback-form stage's identical across two
runs, a slot renumbering and pool sizes 0–3 (§3.3); `clearFiner` after a refinement restores
the coarser level exactly; mandatory chains never rejected for precision; 0 stale references after every batch; after every removal each edge's level is the lowest among its rows and no
vertex is coarser than every edge and role at it (§3.10's level-consistency row); save →
load → save byte-identical (§3.9); a 3 000 m relief fixture stores without a clamp and D8 is defined on 100 % of the hydrology grid's land
cells over frame and margin (§2.3); every routine returns a typed result on the pathological corpus.

**Ladder coverage (G-R9):** every rung of every ladder in §5.2 is reachable by a fixture, and each downgrade (medial
axis, the plain-roof downgrade, straight cut, substitution) is exercised; no roof line lies outside its footprint; a
skeleton failure is never a crash and never a visual surprise.

=== REPLACE §13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT ===
### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r4); earlier revision fixall/integrate-r3, fixall/draft-scope-r3

* **Invariants.** The §5.3 suite runs by scope — batch-local invariants per batch, stage-end invariants per stage,
  save / load invariants per document, CI-only invariants in the harness — on B-CITY (1 000 seeds × the 4
  `WaterSetting`s of §13.3 × 3 rungs in the nightly tier; 50 seeds per rung in the PR tier, §13.8; all three rungs from
  M1, because METROPOLIS generates from M1, §16). Each invariant has an id, a severity, a count in
  the report and a CI threshold: hard = 0 per 1 000 cities; soft within its band. The **digest-maintenance oracle**
  checks on every B-CITY-lite city that the Merkle digest maintained batch by batch equals a full recompute (§6.2).
* **The statistics record, split (SCL-21).** The **core record** is O(n) and is emitted by every generation within
  4 ms at CITY (§12.4): counts per entity kind and class; areas per class and band; fixed-bin histograms per district and
  band of plot area, frontage, depth, footprint area and storeys; way length per class; the junction-degree histogram;
  turning per 100 m on ways resampled at 10 m; the walled share and built extent; ladder uses per cause and rung; every
  requested feature's delivery tier (§5.1 principle 7); stage timings. The **bench metrics** — detour index over sampled
  destination pairs, Moran's I, KS distances, junction-to-junction runs, orientation coherence and wall alignment,
  figure-ground metrics on renders (§8.5), tree nearest-neighbour and pair-correlation statistics computed from §8.10's
  stamped scatter — run through `stats(doc, { level: 'bench' })` on demand or in the bench, never on the one-click path.
* **Cost-model tests (SCL-19; NF-S10).** Each stage is timed on **nine sizes — three per rung: the band's bottom, its
  target and its top** — 1 500, 5 000 and 9 900 (TOWN); 10 000, 20 000 and 29 900 (CITY); 30 000, 50 000 and 120 000
  (METROPOLIS) inhabitants, five seeds each (nightly; the METROPOLIS sizes are reported from M1 and gate from M2b, which
  measures and tunes METROPOLIS, §16; VS2-2).
  Its log-log slope of time against its declared work measure (the `Stage`'s work-limit laws, §5.1 (5), §14) must
  not exceed **1.15** for a stage declared linear and **1.25** for one declared n log n; §12.3's per-rung cost laws are
  fitted on the same runs. **Work limits follow population:** each run reports, per stage, the F-WORK hit rate (work
  cuts per 1 000 batches), and CI fails when the rate at the top of a band exceeds the rate at its bottom by more than
  1 per 1 000 — §5.1 (5)'s pre-decided coefficient fallback then applies and the sweep re-runs. **Per-edit cost against
  model size:** a fixed scope — one plot edit, one block reroll, one district regeneration — costs the same at TOWN, CITY
  and METROPOLIS within ± 20 % (§12.6), and so does per-edit validation (§5.3); both are measured TOWN → CITY from M2a
  and TOWN → METROPOLIS from M2b (§16). **Index work** is fitted against commits × level size (§3.3). A **memory test** per
  rung uses §12.8's definition — on generated towns from M1 (TOWN, CITY) and M2b (METROPOLIS), and from M2a on the
  reference 300-edit CITY document while it is load-verified with a district regeneration and a Re-derive from S3
  applied during it, at pool sizes 0 and 3 (§12.8, §16; VS3-1, VD3-5); a **document-size test** per rung holds ≤ 320 B per building at CITY (§2.9); the
  simulation module's occupancy (one hour for 50 000 people ≤ 50 ms in the worker, §10.3, §12.7) has its own cost-model
  test in the module's milestone (M4b). **First map by size (N-2):** B-CITY's browser runs time the first map at the
  same three sizes per rung — TOWN 1 500 / 5 000 / 9 900, CITY 10 000 / 20 000 / 29 900, METROPOLIS 30 000 / 50 000 /
  120 000 people — and fit §12.5's first-map laws (M1 for TOWN and CITY, M2b for METROPOLIS; nightly thereafter).
  The same runs pan and zoom during an A2 300-dpi export of a CITY: every settle within §12.5's bound, the export
  completed and byte-identical to the idle-view export and to one during which an edit is made (§8.9, §12.7; NR3-6).
  **The model max clause (NR-1, NR3-4):** every nightly B-CITY generation's model time ÷ its rung's law at its own
  building count is recorded as a screen; a generation above 1.25 is re-timed three times in §12.1's timing phase and
  fails the clause only when the median of its three ratios exceeds 1.25 (the 20 highest when more than 20 are flagged;
  §12.3), gating TOWN and CITY from M1 and METROPOLIS from M2b. Every gating timing — the sweeps, the first-map runs,
  §12.3's pool comparison and these re-timings — is taken in §12.1's timing phase and normalised by its calibration
  score (rendering round 4 S4).
* **Stage contract tests.** The same inputs and stream give the same digest on Node x86 / arm64, Chromium, Firefox and
  WebKit, with workers on and off and pool sizes 0–3 (G-P10); §6.5's determinism tests run beside them (time dilation
  × 10 and × 0.1, the derived-complete digest over three district orders — S12b and the hinterland unit included, replay = session, truncation identity, the
  host-provider double run, links and documents without their packs or host). S8's working block equals S9's committed
  block (Hausdorff 0; §3.7). The per-stop placement digests of §13.3 are the contract test of S13b; the stamp-tile
  asset's tiles hash to their stored values in the generation worker and the tile worker, and `plat/tools/stamptiles/`
  rebuilds the asset byte-identical on the five engines (§8.3; NR-6, NR3-7); a tile rastered whole and in 1-ms slices is
  pixel-identical (§8.3; NR3-2; rendering round 4 S5). **View-data contracts:** every shipped style sheet loads at every band through §8.2's slot resolution
  with 0 unresolved and 0 ambiguous (semantic, pass) pairs (NR-3); entities with equal lineage in two seeds' towns get
  different render keys (§8.3; VD2-6), on two B-CITY-lite seeds per rung.
* **Stage property tests.** 10 000 coast / island / fjord / sky outlines per intent → 0 self-intersections and 0
  untyped loops; 0 overlapping or self-intersecting plots on concave, notched and curved blocks before any fallback;
  attached and party-wall shares on curved-street blocks inside the dense band; roster `manifest(P₂) ⊇ manifest(P₁)`
  for P₂ > P₁ on 1 000 seeds; the stage-3 contract (the union of composed wings equals the outline, §2.6); the `ringed`
  fixture (≥ 3 closed rings, radius CV ≤ 10 %); a B-CITY sweep over `wealthLevel` ∈ {0, 0.5, 1} (population ± 5 %,
  walled share in band); the derived-complete digest identical across district orders; opening a person leaves the
  digest, the log and the undo stack unchanged; **0 `E_KEPT` on the one-click path** over B-CITY (a stage whose domain
  overlaps an earlier stage's kept content is a pipeline bug; VK-1); every gate and weld vertex on its trace, and stage
  1's trace within 40 m of its boundary except along an `on_enceinte` castle's shared stretch (NF-P1, R3-P1); 0 lanes
  crossing a wall strip and 0 L3 band faces split or cleared (NF-P5); 0 S7b claims meeting a wall strip (VP2-3); the
  seam exception on New random of 20 districts per B-CITY-lite city (NF-P6); the union rule (composed wings = outline)
  on curved-street row fixtures with `quad` wings, including rear lines oblique to the frontage — bent party-wall
  chains, `corners` recorded, the ridge at the arc-length midpoints (NF-P2, VP2-5); decks on 100 % of way–water
  crossings, moats and canals included (NF-P4); harbour fixtures with a two-arm mole and a detached breakwater
  pass the crossing invariant as harbour works, and a `quay` way drawn across a river without a deck fails it (§5.3;
  VD2-2); the walled coastal harbour fixtures of §4.2 S3 (11) — the harbour
  outside the stage-1 region, with and without `moat: 'inner'`, and sealed with `N = 0` — each with the harbour served,
  0 non-gate ways reaching the trace, every way–moat crossing on a deck, roads leaving = N, plus the harbour gate at
  `N = 0` (VP2-2), and the harbour route at most 1.5 × the plaza ↔ harbour least-cost lattice path with the wall
  ignored, one main gate on the harbour side (§4.2 S3 (4); NP3-7); a river town whose growth leaves crossing sites
  unused — 0 site furniture and 0 site marks in the display list, every built bridge's span the way's own L1 edge; an
  epoch whose growth builds a site; a drawn bridge 15 m from a site builds that site and one 30 m from every site adds a
  deck by one L0 shore-split batch; §5.3's crossing invariant holding throughout (§4.2 S1 (5); NP3-4); a canal across
  the settlement perimeter — 0 district faces outside the perimeter, the land on both banks the hinterland's (NP3-3;
  pipeline round 4 X-S1, X-S2); `castle: 'on_enceinte'` with water in reach, with and without a city moat — 0 trace–water crossings
  off a river's water gate, the outer-arc channel beside the shared stretch, the town side dry-ditched or plain by its
  row (VP2-10); every seam edge typed, a way-less shared reservation boundary typed `reserve` (II.5; VK2-10).
* **B-EDIT and the locality oracle.** §7.3 item 7 (i)–(iii) and (v), and (iv)'s byte identity of Regenerate (keep
  settings), run **once per sequence** — at its end and at one seeded random position — never per edit (SCL-18).
  Fixtures: the re-parenting set (`drawBoundary`, district merge and split, `outskirtToDistrict`, regenerate around a
  lock, the id-recycling case); terrain-brush sequences in both water modes, and course-knot, drawn-water and
  drawn-bridge sequences with §7.3 (7)(v)'s assertions (0 decks over land, 0 off-deck crossings, 0 wings off §2.6's
  datum rule, 0 footprints in water); table weight edits and row insertions; drawn features mixed with later attribute
  edits; epochs and rebases; an epoch after 20 edits and a Re-derive from S10 after 20 edits, each run at pool sizes 0 and 3
  with identical digests, every freeze finding every dynamic grid and tombstone set empty after its rebuild (§3.3 pool
  step 1; VK3-5, kernel round 4 X-S3); undo and redo from several sessions, with the truncation-identity property (§7.4,
  §6.5 (9)); New random on minimal scopes (§5.1 (6)); the naming-collision replay fixture (§7.3 (7)(i)); the B-EDIT-lite
  identity fixtures (≥ 99.9 % of addresses kept under 1 cm perturbation, §6.3); Regenerate (keep settings) of a
  perimeter district, a walled district and the hinterland, byte-identical, and the margin-band sharing check after
  `outskirtToDistrict`, `drawBoundary` and a merge (§7.3 (7)(vi)); a river move across a street grid that commits with
  decks and cuts and keeps every face outside its footprint — its clear region, §4.11 — byte-identical, and a
  course-knot move replayed after an upgrade that changed the knot count (§7.3 (7)(v)); a pond drawn inside a block and
  a river bank widened into its riverside blocks, each committing with no `E_LEVEL` and every face outside the footprint
  byte-identical, and a river moved across a wall between two towers and across the settlement perimeter (§7.3 (7)(v);
  VK3-1, determinism round 4 SR4-1); a warp over a square keeping
  its fountain, over a yard keeping a user-moved tree, and one halved by a pinned pin (§7.4); §2.6's test — a warp and
  a `moveVertex` over a built block with an L house, an overlapping T, a curved row of quads and a holed footprint:
  every wing union equal to its footprint face (integer equality), every roof line inside its footprint, de-rectangled
  rects turned quads, undo byte-identical (NP3-1, pipeline round 4 X-S3); the truncation-identity
  property with a redo followed by a user-created entity (§7.4); undo after a reload of an unshared document undoing
  the pre-reload event (§7.4, sessions); an edit within 100 ms of the state becoming editable with a forced
  mismatch under both choices, the open-to-editable time against T(B), and a snapshot with one moved footprint and an
  unchanged `model.digest` — its chunk hash rewritten, and not — reported as a corrupt cache and loaded by replay, never
  verified (§2.9 steps 3–4; VD3-1); the naming-input fixtures of §6.3 — a selected user corpus and an edited naming row
  rename exactly the unedited names citing the changed slices, in a fresh and in a rebased document (VD3-2); a canal
  carved across a wall and a river move whose bank cuts a glacis line, each committing with 0 NF-P5 violations, and a
  lane drawn across a wall strip refused (§5.3; VD3-6); and **the thirteen MFCG asks of §7.4 as
  scripted scenarios (IMP-16)**, each reporting its locality share (entities outside the effective scope
  byte-identical), its invariant results and its re-run cost against §12.6.
* **The faithfulness campaign (O9 c; §7.3 item 7 (iv); IMP-7, VS2-9).** New random is judged by a campaign, not per
  sequence. Each nightly run draws **n = 800 regenerated scopes** from its B-EDIT New-random events — 400 block scopes
  and 400 district scopes, by a seeded draw; a night whose B-EDIT run holds fewer than 400 New-random events of a kind
  adds New random on seeded scopes of that kind in its B-CITY-lite towns until it has 400 — and for each generates
  **K = 50 from-scratch references** of the same scope: the same upstream state and context, rerolls 32 768 + i for
  i = 0 … 49, a range no user reroll reaches, so no reference can coincide with the tested regeneration. For each of the
  four statistics (median plot area, median frontage width, density, attached share) the rank r of the regenerated value
  among the K references counts the references below it plus a uniform draw from 0 … t over the t references equal to
  it (the draw comes from the campaign's own stream), so r is exactly uniform on 0 … K for a perfect regenerator,
  whatever K and however discrete the statistic. The ranks are binned into 10 bins of ⌊r · 10 / (K + 1)⌋ with expected
  counts proportional to the number of rank values each bin holds; a χ² test per statistic gives four p-values, and the
  campaign **fails when Holm's procedure rejects at family-wise 0.01** (the smallest p-value below 0.0025). Cost
  ≈ 40 800 scope generations (800 × 51), ≈ 12.5 CPU-min at §12.6's block and district costs (20 400 × ≈ 6.6 ms +
  20 400 × ≤ 30 ms), inside the nightly tier's budget (§13.8).
  **Why 800 scopes (VS2-9).** A scope's four statistics move together — a denser block has smaller plots, narrower
  frontages and more attached houses — and correlated statistics add less evidence than independent ones: with them
  correlated at ρ = 0.8, a campaign of 400 scopes catches a +0.25 standard-deviation bias in only 92.2 % of nights and a
  regenerator 0.8 × too snug in 95.2 % (922 / 1 000 and 952 / 1 000; the round-2 verifier's independent re-implementation
  gave 92.0 % and 95.0 %), so with the re-run rule below a real fault would be declared on its first night only
  0.85–0.91 of the time. **Executed** at n = 800 (`docs/validation/bench/fixall_scope_r3_o9c_n800.py` → `.out`, own
  code, stdlib; each generation's four statistics share a scope component at ρ = 0, 0.8 and 1): a perfect regenerator
  fails 1.0 % of campaigns on continuous statistics (31 / 3 000 at ρ = 0.8, 15 / 1 500 at ρ = 0) and 1.4 % (14 / 1 000) on
  heavily tied, scope-varying discrete statistics; a +0.25 sd bias and a 0.8 × too-snug regenerator are caught in
  2 000 / 2 000 campaigns each at ρ = 0 and at ρ = 0.8 (95 % lower bound 99.8 %), a 0.6 × too-snug and a 1.5 × too-loose
  one in 500 / 500, and — at the degenerate ρ = 1, where the four statistics move as one — the bias in 99.3 % and the
  snugness in 99.7 %. Without the randomised tie-break a perfect regenerator fails every campaign on a tied statistic
  (`fixall_verify_scope_o9c_rank.out`). A failing statistic's histogram names the fault: a hump is too snug, a U too
  loose, a slope a bias. **A failed campaign is re-run once with the next campaign seed**: a perfect regenerator fails
  two in a row with probability ≈ 1–2 × 10⁻⁴, and a fault of the sizes above is declared on the night it first runs with
  probability ≥ 0.996 at ρ ≤ 0.8 (≥ 0.985 at ρ = 1). A second failure is a regeneration defect — entered in
  `known-defects.json`, and M3a does not exit until it is fixed (§16), because no threshold can be relaxed without
  passing a wrong regenerator.
* **Control sweeps.** §7.8's statistical monotonicity and continuity: 21 steps × 50 seeds at TOWN and CITY (nightly);
  METROPOLIS in the milestone tier. The population control's sweep also reports the F-WORK hit rate per stage, which
  must stay flat across each band as above.
* **Option-interaction matrix.** Every pair of toggles rendered and diffed; no option silently disables another (O12 c).
* **Documentation coverage (COV-FTG-A25).** 100 % of controls and entity kinds have a guide anchor (§14 `@plat/docs`);
  every in-app help link resolves (CI link check); the release notes list every open entry of `known-defects.json`.

=== REPLACE §13.6 The owner's side-by-side protocol (D-5) ===
### 13.6 The owner's side-by-side protocol (D-5)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r4); earlier revision fixall/integrate-r3, fixall/draft-scope-r3

"Mastered" means the owner's eye on side-by-sides against MFCG and FTG at town, city and metropolis, plus the measured
parity numbers (D-5). This protocol makes the eye a recorded, repeatable judgement that cannot be steered by choosing
flattering seeds, and it never lets a milestone claim the eye's verdict without the eye.

1. **When.** At M1 (diagnostic: the base is not yet complete, so the result is recorded and does not gate; the panel
   covers all three rungs, because METROPOLIS generates from M1, §16), at M2b (gates
   "the base at parity"), at M4 (gates "mastered") and at M5 against NG (gates stage 2, and replaces S2's blind preference
   test with n ≥ 20 raters, which the program has no pool for; IMP-11).
2. **Seeds fixed before rendering.** Every pair's seeds come from a formula and are committed before any render; no
   seed is replaced after it is rendered, and every list is reproducible from its formula. **`H32(s)`** is defined
   exactly (VS2-6): the first 32-bit output word (h1) of MurmurHash3's x86 128-bit variant — the published public-domain
   algorithm §6.2's H128 already implements — run over the UTF-8 bytes of `s` with seed 0. Its implementation passes the
   algorithm's published verification value (SMHasher's procedure gives 0xB3ECE62A). The result is a u32, so it is a
   `Seed` (§2.9), written in records as its decimal string. The product CLI (`plat d5 seeds ⟨milestone⟩`) writes the
   milestone's pair list — one `D5Pair` per pair, (9) — to `plat/goldens/d5/⟨milestone⟩/seeds.json`, committed before
   any render. ⟨milestone⟩ is the id its `MilestoneRecord` carries (`M1`, `M2b`, `M4`, `M5`), ⟨rung⟩ the `Rung`
   (`TOWN`, `CITY`, `METROPOLIS`), ⟨water⟩ the `WaterSetting` (§13.3), ⟨i⟩ and ⟨k⟩ decimal integers.
   * **Against MFCG** (M1, M2b, M4). Five pairs per rung and per water setting (`none`; `coast+river`), ten per rung.
     PLAT's seed is `H32("d5/⟨milestone⟩/⟨rung⟩/⟨water⟩/⟨i⟩")`, i = 0 … 4; the text fixes two check vectors:
     `H32("d5/M1/TOWN/none/0")` = 1221236157 and `H32("d5/M1/TOWN/coast+river/4")` = 3998735106
     (`docs/validation/bench/fixall_scope_r3_h32.out`). MFCG's seed comes from the same formula with the prefix
     `d5-mfcg/`, reduced as 1 + (H32 mod 2 147 483 646) into 1 … 2³¹ − 2, the state range of MFCG's Park–Miller stream
     (`research/findings/profile-mfcg.md`), by the research-side panel script, which applies exactly this formula
     (check vector: `d5-mfcg/M1/TOWN/none/0` → 1965791931); MFCG draws `none` with its plain options and `coast+river`
     with its river and coast on.
   * **Against FTG** (M1, M2b, M4; TOWN and CITY, METROPOLIS per D-31; VS3-6). FTG cannot be seeded — its server draws
     its own seed — so a milestone has **one pair per FTG capture** at the rung's matched size (BIG_TOWN for TOWN,
     BIG_CITY for CITY), each capture used once, in capture order: three pairs per rung. M-1 takes each size's three
     captures with FTG's water options nearest to `none` (one capture) and to `coast+river` (two), and records each
     capture's id — its folder name under `captures/ftg/` — and its `WaterSetting` in the capture README (§16). The
     pair's PLAT side is generated at FTG's population and the capture's `WaterSetting` with seed
     `H32("d5-ftg/⟨milestone⟩/⟨rung⟩/⟨capture id⟩")`, so every milestone pairs the same captures with PLAT seeds of its
     own. The capture list is committed with the seeds, before any PLAT render.
   * **Against NG** (M5; VS3-6). NG can be seeded — its MINSTD stream (`docs/CONFIDENCE.md` NG A2) — so the panel has
     five pairs per NG template, for all four templates PLAT registers as fabrics — `area`, `street`, `square` and
     `ring` (II.2) — twenty pairs. NG's seed is `H32("d5-ng/M5/⟨template⟩/⟨i⟩")`, i = 0 … 4, reduced as
     1 + (H32 mod 2 147 483 646) into MINSTD's state range 1 … 2³¹ − 2 (check vectors: `d5-ng/M5/area/0` → 1819777585,
     `d5-ng/M5/ring/4` → 951122398; `docs/validation/bench/fixall_scope_r4_h32.out`), generated at NG's `medium` size —
     the size of NG's vertex captures and of §13.5's NG baselines — by the research-side panel script, which also counts
     each hood's buildings; the counts reach the product as numbers only, in `plat/goldens/d5/M5/ng-counts.json`,
     committed like `baselines.json` (§17.1 (4)). PLAT's side of pair (template, i) is one district of a PLAT town,
     opened with the same template at neighbourhood LOD (`setAttr(district.fabric, template)`, II.4), found by a
     committed search: town k (k = 0, 1, …, 31) is generated with seed `H32("d5/M5/⟨template⟩/⟨i⟩/⟨k⟩")` (check vector:
     `H32("d5/M5/area/0/0")` = 3881605733), water `none` and population ⌊min(50 000 × 1.25^⌊k / 4⌋, 120 000)⌋ — four towns
     at each METROPOLIS size from the target up (50 000, 62 500, 78 125, 97 656) and the rest at the cap, because a
     district's mean building count grows with the town's size under §4.5's count law; in each town the district whose city-LOD building count is nearest the NG hood's (ties to the smaller
     address id) is opened with the template, and the first whose opened building count lies within ± 20 % of the NG
     hood's is the pair's. k, the district's address and both counts are committed with the seeds. *Measurement (M5):*
     the search's k and each pair's count ratio are reported with the panel. **Pre-decided fallback:** a pair with no
     district within ± 20 % after k = 31 takes, of the 32 opened districts, the one nearest in count, and is marked
     `sizeMismatch` in the record; the ratio is printed on the sealed key and reported beside the verdict, and the pair
     is rated like any other.
3. **Matched pairs.** Each MFCG and FTG pair shows PLAT and one reference at the same rung, the same ground scale
   (metres per pixel) and the same frame. Against MFCG, PLAT's population is set so that its building count matches
   MFCG's at the matched size (sizes 40 / 80 / 130; §12.2's rate); against FTG, PLAT is generated at FTG's population
   (BIG_TOWN ≈ 5 600, BIG_CITY 24 500; METROPOLIS per D-31) and the capture's water setting, (2). Against NG, each side
   fills the same frame with its hood or district: NG's view rescales its hood to the frame (`docs/CONFIDENCE.md` NG C8),
   so the two sides' size is matched by the building count of (2), not by metres per pixel. PLAT draws `ink` against
   MFCG's default style, `lit` against FTG's default from M2b (`ink` at M1) and `hatched` against NG's (M5). Against
   FTG, the pair of each rung's first capture shows the extramural suburb at FTG's overview framing, both sides framed
   alike (VIS-3); the other two pairs use the matched frame.
4. **Blind order.** Generator-identifying furniture is removed from both sides (titles, legends, compasses, interface
   chrome) and the blind pairs are rendered without labels; labels are judged in a separate, non-blind pass. Left or right
   is a seeded coin per pair and the pair order is shuffled; the key is sealed — only its hash is committed — and opened
   after the answers.
5. **The rubric** — three questions per pair, each answered *left*, *right* or *same*, with an optional one-line note:
   (1) *Legibility:* which lets you read the town — its streets, walls and quarters — more easily at this size?
   (2) *Realism:* which looks more like a real medieval town? (3) *Charm:* which would you rather use for a game or a
   story?
6. **Pass rule.** For each reference and each question, PLAT is judged better or the same on at least two thirds
   (⌈2n / 3⌉ of n) of that reference's pairs, counted per group — against MFCG over the milestone's MFCG pairs (20 of
   30 when all three rungs are rated), against FTG per rung (2 of 3 per rung and question; VS3-6), against NG over its
   twenty pairs (14 of 20) — and in no rung (MFCG) or template (NG) is PLAT judged worse on every pair of that rung or
   template. A gating milestone whose rated run fails a question does not exit until a re-run passes or the owner
   accepts the failure in the record; the failing question and the owner's notes enter `known-defects.json`.
7. **The rater, and one rule for an unrated panel (NF-S2).** The owner is the declared rater; no seat rates on the
   owner's behalf. If the owner has not rated within seven days of the panel being ready, the build continues on the
   milestone's measured numbers and the milestone's D-5 status is recorded **provisional — not rated** in its `D5Record`
   and its `MilestoneRecord` (§13.3). A provisional status never claims what the panel gates: M2b's "the base at parity",
   M4's "mastered" and M5's stage-2 gate are claimed only by a rated pass or by an owner acceptance recorded in the
   `D5Record`. The same panel — the same seeds, re-rendered under the current output version — is offered again at every
   later milestone and, after M5, with every release, until it is rated; a later rated pass turns the status into
   *passed* with its date, and a later rated failure follows (6). The release notes state every provisional status
   (§14 `@plat/docs`). §16 states the same rule at each gating exit.
8. **The threshold panel and the `house` pick.** At the same sitting the owner sees the strips of §13.7 (renders of one
   seed at a threshold's number and one step either side) and picks one or answers *same*; the pick becomes the threshold
   with provenance "owner-eye ⟨milestone⟩". From M4 on, the sitting also shows the three candidate `house` sheets drafted
   at M3b (D-1) on the milestone's seeds. **Pre-decided outcome if no `house` pick is recorded by M4's exit:** candidate 1
   — the first sheet in the M3b draft order — ships as `house`, selectable and never the default; `ink` stays the
   default; the pick is offered again at every later sitting, and a later pick replaces `house`'s sheet as a
   style-version change (pixels only; no model digest moves).
9. **Record and clean room (NF-S1).** The panel is assembled research-side (`research/d5/`) from PNG exports that the
   product's CLI writes and from the reference images in `captures/`; the product repository never reads the captures
   (§17). The machine-readable record lives in the product, committed by the seat that ran the sitting, like
   `baselines.json` (§17.1 (4)) — numbers, hashes and answers only, no reference image or reference data:

   ```ts
   type D5Status = 'diagnostic' /* M1 */ | 'passed' | 'failed' | 'accepted' /* a failure or an unrated panel accepted by the owner in writing */ | 'provisional-not-rated';
   type D5Pair =                           // one per pair, in seeds.json and the record, in the order (2) lists them (VS3-6)
     | { reference: 'MFCG'; rung: Rung; water: Extract<WaterSetting, 'none'|'coast+river'>; i: number; platSeed: string; refSeed: string /* 1 … 2³¹ − 2 */ }
     | { reference: 'FTG'; rung: Extract<Rung, 'TOWN'|'CITY'>; capture: string /* its folder name under captures/ftg/ */; water: WaterSetting; platSeed: string; suburbFrame: boolean /* the rung's first capture, (3) */ }
     | { reference: 'NG'; template: 'area'|'street'|'square'|'ring'; i: number; refSeed: string /* 1 … 2³¹ − 2 */; k: number /* the town of (2)'s search */;
         platSeed: string; population: number; district: string /* address id */; buildings: { ref: number; plat: number }; sizeMismatch: boolean };
   interface D5Record {                    // plat/goldens/d5/<milestone>/record.json
     milestone: string; status: D5Status; date: string; offeredAgainAt: string[] /* later milestones and releases */;
     pairs: D5Pair[] /* every seed a Seed as its decimal string */;
     platImages: Hash128[] /* PNG hashes of PLAT's side, in pair order */; key: { commitment: Hash128; revealed?: string };
     answers: { pair: number /* index into pairs */; question: 'legibility'|'realism'|'charm'; answer: 'left'|'right'|'same'; note?: string }[];
     verdicts: { reference: 'MFCG'|'FTG'|'NG'; question: 'legibility'|'realism'|'charm'; group: 'all' | Rung /* FTG: per rung, (6) */;
       betterOrSame: number; pairs: number; needed: number /* ⌈2n / 3⌉ */; worseOnEveryPairInARungOrTemplate: boolean; pass: boolean }[];
     thresholdPicks: { letter: string; picked: number | 'same' }[]; houseSheet?: string; acceptance?: { by: 'owner'; text: string; date: string } }
   ```

   The research-side `docs/validation/d5/⟨milestone⟩.md` — the human-readable record with the reference images' hashes —
   is generated from this file (§13.3); no CI job reads it.

=== REPLACE §14 Package and module layout, key interfaces, dependency rules, extension points ===
## §14 Package and module layout, key interfaces, dependency rules, extension points

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r4); earlier revision fixall/integrate-r3, fixall/draft-scope-r3

*In plain words.* The code is split into small packages with one-way dependencies: the geometry kernel knows nothing
about towns; the town model knows nothing about drawing; the drawing code knows nothing about how the town was made;
the app sits on top of a headless library. New looks, new layout templates, new export formats, new building
generators and new rule tables plug into named registries without touching the pipeline. All of it lives in one
repository, `plat/`, that never reads the research material (§17).

```
@plat/kernel   lattice, predicates, one arena per layer with the five levels as views (§2.2), role and owner tables, resolution of stored
               references, batched transactions, kernel invariants, arrangement booleans / buffers / bands (§3.7), the straight skeleton and
               its validator (§3.8), obb / hull / lir, delaunay (delaunator), poisson (the stamped ranked tiles' construction from a constant stream key, run at build time by `plat/tools/stamptiles/` and in a worker only as the fallback rebuild, §8.10), curves, index (flatbush / rbush /
               grid), noise, dmath (our fdlibm 5.3 port), rng (xoshiro + 128-bit keys; `rng.stream`, the one structured stream mixer of
               §6.1), concern registry
@plat/model    schema (zod), addresses and lineage (§6.3), layers, entity registry (CI path-coverage test), lifecycle, provenance, document,
               serialisation (.plat, CBOR twin), migrations, the Merkle model digest, the core statistics record, the control registry; the
               label records `LabelEntity` and `QuarterNode` (§9.1) and the shared view vocabulary `LodBand`, `Role`, `ZoomStop`
@plat/tables   rule tables, presets, style sheets, rung profiles (`ladder.json`, §1.1), the work-limit coefficients (`workLimits.json`,
               §5.1 (5)), setting packs (§10.4) and the default keymap as versioned JSON with provenance; loaders; the override layer
@plat/site     S1 terrain, hydrology, coast / lake / island outline routine, rivers by descent, islands, bank classes, water faces
@plat/content  S2 sequential roster, demand, government and religion rows, S7b / S10a allocation, S10b placement, households and people
               derivation, the relation-store schema, the economy and personality schema stubs (D-32), naming engine + grammar
@plat/layout   S3 siting, reservations and gate sites, S4 backbone, S5 growth and regimes, S6 grower / typing / fields / the quarter merge tree, S7
               fortification and water furniture, S7b claims, S8 infill (BentCutFabric), S9 corridors, S12a hinterland siting, the hinterland
               unit, S12b greenery; the StrategyRegistry and the ordering of registered StageDecls
@plat/plots    S10 granularity law, per-frontage regions, joins / splits / alleys, boundary treatments; S11 site plans, packer, heights,
               footprint templates; the BuildingGenerator interface (`outline` / `compose`) + OutlineBuildingGenerator; assignment +
               placement solver
@plat/hood     stage 2: RingFabric / SquareFabric / StreetFabric, the neighbourhood LOD workflow   [built after the base; the interface lives in @plat/layout]
@plat/labels   S13a names (every node of the quarter tree), candidates and spines; S13b view placement over the parameters the renderer
               passes in (`ObstacleSource`, `RoleIndex`, below) — it never imports render; the font-metrics reader; collision; furniture
               incl. the ruler and the emblem generator
@plat/render   S14 columnar display-list builder, paint programs, style sheets, LOD, the tile pyramid and the tile worker (which runs S13b
               by calling `@plat/labels`), backends (Canvas2D, SVG, print tiles; the WebGL2 tile compositor as a fallback), shadow pass,
               decoration stamps over the bundled stamp-tile asset (§8.10), live layers, the tile worker's queue of resumable raster jobs (§8.9)
@plat/edit     edit events, dry-run validation, undo and redo records, scoped regeneration, rebase, the dependency audit, event
               migrations, warp kernels
@plat/export   geojson, svg, png / tiles (streaming), vtt (Foundry-class scene JSON, dd2vtt), gltf / obj, cityjson, csv, permalinks
@plat/sim      optional, M4b: the relation store materialised, postings, occupancy and schedules, calendar, factions, events, economy,
               personality and the stat-block pack (D-32) — over @plat/content ids
@plat/api      the handle-based facade (§11.2), the generation worker host, the derivation pool, the host bridge (§11.3) and DocResolver
               (§11.5), the headless CLI
@plat/app      the reference UI (below)
@plat/docs     the user guide: generated reference pages from the control, entity and table registries plus written pages;
               `known-defects.json`; release notes generated from `plat/goldens/shifts/` and the milestone records (§13.3), the D-5
               statuses (§13.6) and the known defects
@plat/testkit  B-FUZZ generators (random and constructive), invariant runners, cost-model tests, the bench statistics and the `parity` CLI
               (reads `baselines/baselines.json` only), golden tooling with shift, cascade and milestone records and placement digests over
               `plat/goldens/` (§13.3) and the one `WaterSetting` type every record uses, the O9 (c) faithfulness campaign (§13.2), the boolean
               and buffer oracles (Clipper2-WASM in Node, polygon-clipping), the clean-room scanner (§17), the D-5 seed list by `H32` and
               the export command (`plat d5 seeds`, PNGs for §13.6)
```

**Stage registrations whose declared I/O the round-2, round-3 and round-4 pipeline changed** (§4.1–§4.12 hold the definitions): S3 declares as
outputs the gate routes, the travel-cost field `T`, the stage-1 trace and gates, the carved water with its decks and the
decoration ponds, the map border (L1, §4.1), the harbour route (solved after its L0 batch), the forced harbour pick
(§4.2 S3 (4)) and the harbour gate of §4.2 S3 (7) where one is placed — a sealed town's, or the detour guard's; S1
declares the arena's outer ring (L0, §4.1) and every crossing site as a `Bridge` in state `site`, which S4 and S5 build
(§2.7, §4.2 S1 (5)); S6 the settlement perimeter and the `Seam` records (II.1), whose `SeamEdge.type` includes `reserve`
with its `reservation` id; S7b passes `claimSubFace` a face list (`within: FaceRef | FaceId[]`, §3.4); the castle
template row carries `townSide: 'dry_ditch' | 'none'` (§4.8); S12a no geometry (sites only); the hinterland unit
registers as a unit of S10 / S10b / S11 / S12b over the hinterland's blocks (§4.9); `SkyStrategy.place` takes S7b's sky
allocations (II.6); `BuildingInput.fixedWings`, `BaseWing.kind`, `BaseWing.corners` and `carryWings` are §2.6's, `SlotPlan` §2.5's;
`SettingPack.rosterPatch` is §10.4's.

**Dependency rules (enforced by lint):** `kernel ← model ← tables ← {site, content} ← layout ← plots ← labels ← render
← edit ← export ← api ← app`; **labels ← render** (N-22): the tile worker in `render` runs S13b from `labels`, and the
drawn symbol extents and the display-list index that S13b reads reach it only as the parameters `ObstacleSource` and
`RoleIndex` — interfaces `labels` declares and `render` implements — so `labels` never imports `render`, and the types
both use (`LodBand`, `Role`, `ZoomStop`, `LabelEntity`) come from `model`; `docs` reads the registries of `model` and `tables` only; `hood` depends on `layout` /
`plots` only through their interfaces; `sim` depends on `content` and `model` only; `render` never imports `layout`;
nothing depends on `app`; no package imports a backend it does not need; every adopted runtime library is imported in
exactly one adapter file of the one package that uses it; model packages obey §6.5's allowlist lint, which also scans
the vendored dependency sources; **so do `@plat/labels` and the renderer code that feeds S13b (VS2-4)** — every
implementation of `ObstacleSource` and `RoleIndex`, the functions they call, and the S14 builder code that writes the
display-list columns they read (`bbox`, the geometry ranges and `GeomTable`, `layer`, `z`, the symbol extents from the
style sheet's sizes). CI finds that code as the import closure of those implementations and of the column writers, from
the TypeScript program, so a module that joins it is linted without being listed; the rest of `@plat/render` stays
outside the lint (§6.5 (3), §13.3). No import, fixture or script path may resolve outside `plat/` (§17).

```ts
// @plat/layout — stages and strategies (StageDecl, NetworkStrategy and EnceinteStrategy are §4.12's)
interface Stage<I, O> extends StageDecl {
  version: string; lineageUnit: EntityKind /* whose lineage keys its draws, §6.3 */;
  workLimits: WorkLimits /* laws over the batch scope's population-derived counts, §5.1 (5); coefficients in workLimits.json */; budgetMs: Record<Rung, number> /* reporting only */;
  txForm: 'declared'|'callback' /* §3.3: declared op sets in canonical order, or callback sequences in issue order */;
  inputsOf(model: Model, scope: Scope): I; run(input: I, ctx: StageContext): KernelResult<O> }
type ConcernId = number & { readonly __brand: 'ConcernId' };   // u16 from the concern registry (§6.1), generated as typed constants — never a string
interface StreamOpts { reroll: number /* the derivation unit's reroll (§6.1) */; attempt: number /* ladder retry, ≤ the concern's registered cap: 3 for geometric ladders, 8 for naming (§6.1, §9.6) */;
  epoch: number; salt: number /* the concern's current salt from the recipe and the log's rerollLayer events; 0 for geometry concerns */ }
interface StageContext { doc: Document; plats: Record<string /* PlatKey */, Plat>;
  stream(concern: ConcernId, entity: Handle /* its entity key is cached in the arena beside its lineage hash (§6.1); TOWN_ROOT for town-level draws */, opts: StreamOpts): Stream;
  streamOpts(concern: ConcernId, entity: Handle, attempt?: number): StreamOpts /* the defaults: reroll from the entity's derivation unit, epoch from this context, salt from the document */;
  tables: TableView; rung: RungProfile /* §1.1 */; report: ReportSink; scope?: Scope; epoch: number }
// TOWN_ROOT: the handle of the town itself as a derivation unit; its entity key is the seed key mixed with the fixed town lineage (ground arena, no parent,
// creation epoch 0, index 0), so town-level draws — S0's features, terrain noise, the compass and emblem furniture (§9.5) — depend on the recipe alone, never on docId (NF-D12)
type Scope = { kind: 'all' } | { kind: 'entities'; ids: Id[] } | { kind: 'region'; ring: Polygon; key: PlatKey; level: Level } | { kind: 'epoch'; epoch: number };   // no raw face ids at the API
interface StrategyRegistry { terrain: Map<string, TerrainStrategy>; coast: Map<string, CoastStrategy>; river: Map<string, RiverStrategy>; manifest: Map<string, ManifestStrategy>;
  network: Map<string, NetworkStrategy>; enceinte: Map<string, EnceinteStrategy>; fabric: Map<string, FabricStrategy>; plots: Map<string, PlotStrategy>;
  sitePlan: Map<string, SitePlanStrategy>; building: Map<string, BuildingGenerator>; evolution: Map<string, EvolutionStrategy>; sky: Map<string, SkyStrategy>; sewer: Map<string, SewerStrategy> }
interface FabricStrategy  { partition(district: District, seam: SeamContract, ctx: DistrictContext, sc: StageContext, k: Kernel): KernelResult<{ blocks: Block[]; ways: Way[] }> }
interface PlotStrategy    { subdivide(block: Block, ctx: BlockContext, claims: Claim[], sc: StageContext, k: Kernel): KernelResult<{ plots: Plot[]; alleys: Way[]; residue: Residue[] }> }
interface SitePlanStrategy{ plan(plot: Plot, ctx: ContextVector, tables: TableView, rng: Stream, k: Kernel): KernelResult<SitePlan> }
interface GranularityLaw  { bands(ctx: ContextVector, rung: RungProfile): { frontageM: [number, number]; depthM: [number, number]; areaM2: [number, number]; joinMax: number; vacancyRunShare: number } }   // the deep-interior choice is S8's (§4.6)
// @plat/kernel — the façade the stages see, and the one stream mixer every reader uses
interface Kernel { plat(key: PlatKey): Plat; view(key: PlatKey, level: Level): LevelView; resolve(ref: GeomRef, key: PlatKey): Resolved; geom: GeomOps; index: SpatialIndex;
  tx<T>(tx: KernelTx, fn?: (overlay: Overlay) => KernelResult<T>): KernelResult<T>   // exactly one form: tx.ops (declared) or fn (callback), §3.3
}   // KernelTx (§3.3) carries `stage` and `rederivesFrom`; the services resolveVertexAt, signature and sampleProfile are §3.4's
interface Rng { stream(entityKey: Hash128, stage: number /* u16 stage id; STAGE_VIEW = 0xffff for paint programs and furniture */, concern: ConcernId, opts: StreamOpts): Stream }
// StageContext.stream is rng.stream with the calling stage's id and the entity's cached key; paint programs and furniture call rng.stream with STAGE_VIEW.
// No string reaches the mixer; the textual form of a key (§6.1) is rendered for reports only, and a lint rejects a stream call whose concern is not a ConcernId.
// @plat/content — a host's own roster or people; registered only after §11.4's double-run check, its outputs recorded in the document
interface ContentProvider { id: string; version: string; roster(pop: number, character: CharacterVector, tables: TableView, rng: Stream): Roster;
  site(roster: Roster, plots: Plot[], ctx: SitingContext, rng: Stream): SitingResult; people(household: Id, rng: Stream): Person[] }
// @plat/plots — the stage-3 hook: BuildingGenerator { outline(…); compose(…, lod) } is §2.6's
// @plat/labels — S13b's inputs from the renderer, declared here and implemented by @plat/render (labels never imports render)
interface ObstacleSource { protectedExtents(stop: ZoomStop, box: Box): { box: Box; entity: Handle; kind: 'gate'|'castle'|'plaza'|'bridge'|'wall' }[] /* drawn symbol extents at the stop, §9.2 */;
  coverage(stop: ZoomStop, box: Box): { labels: number; protected: number; buildings: number; ways: number; water: number } /* mark cover, for furniture placement, §9.5 */ }
interface RoleIndex { roleAt(p: Point, band: LodBand): Role /* the area mark under a point: halos, §9.4 */; snap(p: Point, radiusPx: number, stop: ZoomStop): Point | null /* the measure tool, §9.5 */ }
// both are implemented by @plat/render over a display list: in the tile worker for S13b, furniture placement and the ruler (the main thread reaches coverage and snap
// through §8.9's queries), in the generation worker over an SVG export's transient list, and in the tile worker over a raster export's (§11.1); every implementation is under §6.5's allowlist lint (VS2-4)
interface LabelPlacer { place(stop: ZoomStop, labels: LabelEntity[], obstacles: ObstacleSource, roles: RoleIndex, fonts: FontMetrics, memo: PlacementMemo): PlacementSet /* §9.2; view data */ }
// @plat/model — LabelEntity, QuarterNode: §9.1 (model records written by S13a); LodBand, Role, ZoomStop: the shared view vocabulary (§8.1, §8.2, §8.8)
// @plat/render — DisplayList, MarkTable, DisplayDelta, DisplayListBuilder: §8.1; StyleSheet, Symbolisation, OrderSlot, LiveLayerProvider: §8.2; LayerSpec: §8.4;
//                backends and threads: §8.9
type TileAddress = { stop: number; i: number; j: number; dpr: number };
interface TileRasterOpts { layers: Layer[]; tileLayer: 'base'|'under'|'shadow'|'over'; shadows: 'off'|'drop'|'prism' /* §8.2's StyleSheet.shadows.projected */; sun?: { azimuthCdeg: number; altitudeCdeg: number }; tier: 'low'|'mid'|'high'; dpr: number }
interface TileBackend   { begin(tile: TileAddress, list: DisplayList, style: StyleSheet, opts: TileRasterOpts): RasterJob }   // fixes the tile's draw sequence; draws nothing (§8.9)
interface RasterJob     { step(deadlineMs: number): boolean /* runs on from where it stopped; returns after the first draw call that ends deadlineMs or more after the call began; true when complete */; finish(): ImageBitmap; cancel(): void; readonly spentMs: number }   // resumable, so the tile worker serves queries and view work between steps (§8.9; NR3-2)
interface VectorBackend { write(list: DisplayList, style: StyleSheet, opts: { layers: Layer[]; band: LodBand; frame: Box }): string }
// @plat/edit
interface EditEngine { apply(doc: Document, e: EditEvent): ApplyResult /* Ok | Conflict(actions) | Confirm(token, fates) — an event carrying fates commits only when a fresh dry run computes the same fates (§11.2) */;
  undo(doc: Document, session: string, of?: number): ApplyResult /* appends an undo event for the session, §7.4; `of` only for the owner role */;
  redo(doc: Document, session: string): ApplyResult /* appends a redo event */;
  replay(base: Base, log: EditEvent[], opts?: { toSeq?: number; mode: 'interactive'|'replay' }): Model; migrate(doc: Document, to: string): { doc: Document; diff: Diff }; rebase(doc: Document, reason: RebaseReason, at?: number /* default: the log head; h₀ — the decoded snapshot's
    model.seq — when the saved town is kept after edits made during load verification (§2.9 step 4, §7.1): the only two states the engine holds
    materialised, so any other value is rejected with E_REBASE_AT and nothing is rebased (VD3-7) */): Document }
// @plat/api — PlatApi and DocHandle: §11.2; BridgeTransport and BridgeMessage: §11.3; DocResolver: §11.5
// @plat/export
interface Exporter<Opts> { id: string; write(doc: Document, list: DisplayList | null, opts: Opts): Promise<Uint8Array | string> }
  /* runs in the generation worker (§11.1): list = the transient export list for SVG and for raster formats (a raster format transfers it to the tile worker with its
     raster-export request, §8.9, §11.1); null for model formats (GeoJSON, glTF / OBJ, CityJSON, CSV, the document forms) */
// @plat/testkit — Baseline, ParityReport: §13.5; ShiftRecord, CascadeRecord, MilestoneRecord, WaterSetting: §13.3; D5Record, D5Pair, H32: §13.6; CorpusAdapter, CalibrationRun: §13.9
```

**`@plat/app`, the reference UI.** One click; the basic panel (≤ 12 controls, §7.8) and the advanced panel; the report
panel; the editing tools (draw, move, warp, brushes, the four actions, lock, assign); the tables editor and the style
dialog; the ruler (§9.5); the gazetteer and the "features in view" list; context help; the family-tree view (module).

* **Input scheme (COV-MFCG-L08)** — MFCG's idiom kept and stated, held in `keymap.json` (data, editable, versioned like
  every table). Pointer: *click* selects and opens the context panel; *double-click* zooms to the entity's band (a
  district fills the view — MFCG's district view); *shift+click* is New random on the entity's scope, keeping its kind
  (MFCG's ward reroll); *ctrl / cmd+click* resets the entity to generated (one logged event that applies the inverses of
  the entity's own edits); *alt+click* toggles its lock; right-click or long-press opens the context actions (§7.4);
  dragging a selected vertex is `moveVertex`; wheel or pinch zooms; dragging empty map pans. Keys while the map has focus:
  **A** alleys at the city band, **B** buildings shown / hidden, **D** grid, **N** hairline mode, **L** labels, **T**
  trees, **M** ruler, **W** warp tool (then **1–8** choose the kernel), **G** gazetteer, **F** features in view, **R** New
  random on the selection, **Esc** cancel, **ctrl / cmd+Z** undo, **ctrl / cmd+shift+Z** redo, **+ / −** zoom, **0** fit,
  **?** the keymap overlay. Bindings are active only while the map region has focus; an embedding host can switch global
  bindings off; every bound action is also on a menu or a button.
* **Accessibility (COV-FTG-A24)** — the app's chrome (panels, dialogs, menus, toolbars, the report, the gazetteer, the
  tables editor) meets WCAG 2.2 level AA. Landmarks: header (title and seed), navigation (panels), main (the map region,
  `role="application"` with an accessible name and a live description of the view — rung, band, the district under the
  pointer or the focused entity), complementary (report, gazetteer). Every control's accessible name and description come
  from the control registry (its label and documentation anchor); every icon button has a text label. Every action is
  reachable by keyboard in a focus order that follows the layout, with visible focus and no keyboard trap; the map region
  takes arrow-key panning and **+ / −** zoom. **The non-visual route to the map** is the gazetteer (list and search over
  districts, quarters, streets, buildings, institutions and pinned people through `query`) and the "features in view" list
  (the entities whose marks are visible, grouped by kind, ordered by distance from the view centre, each announcing its
  name, kind and district); selecting in either list selects on the map and the reverse. UI text contrast ≥ 4.5 : 1 and
  UI components ≥ 3 : 1 (the map follows §8.2's contrast matrix); the reduced-motion preference turns off animated zoom;
  the UI scales 100–200 % without loss. Tests: §13.4.
* **Context help and the guide (COV-FTG-A25)** — every control and panel carries a help link to its anchor in
  `@plat/docs` (§7.8's documentation anchor), opened in a side panel. The guide's reference pages are generated from the
  control registry (label, range, unit, output metric, consuming stage, locality class), the entity registry and the table
  schemas (columns, units, provenance); written pages cover getting started, each panel, each edit action, each export and
  the tables editor. Release notes are generated per release from the shift records (§13.3) and `known-defects.json`
  (id, symptom, affected rungs and presets, workaround, since, fixed-in). Tests: §13.2.
* **Family-tree view (COV-FTG-C11; module tier, M4b)** — reads `query(h, { kind: 'relations', person, up: n, down: m })`
  over the relation store (§10.3): generations in rows by birth epoch, partners side by side and children below;
  branches beyond two generations elided into a count that expands on click; re-root on any person; opening a person
  never pins it (§10.3); keyboard-operable as a tree grid.

**Extension points:** every `Map` in `StrategyRegistry` (stage 2 registers the three template fabrics; a village product
registers a tracker `NetworkStrategy`, a palisade `EnceinteStrategy`, a density `StageDecl` and a "houses along ways"
`FabricStrategy`; the owner-staged layers register `SkyStrategy` and `SewerStrategy`; the evolution engine an
`EvolutionStrategy`); `BuildingGenerator` (stage 3); `StageDecl` registration by declared inputs and outputs; the
`PaintProgram`, `StyleSheet` and `LiveLayerProvider` registries; `Exporter`s; rule tables, presets, rung profiles,
setting packs and keymaps (data); `EditEvent` kinds with migrations; `LayerSpec`s; `ContentProvider` (host rosters, after
the double-run check); `BridgeTransport` and `DocResolver`; the `PlacementSolver`; `CorpusAdapter` (§13.9).

=== REPLACE §15.1 Parity matrix — every capability row of `docs/confidence/*.md` (rows per `judge-parity.md` §2), plus the audit rows the matrix lacked ===
### 15.1 Parity matrix — every capability row of `docs/confidence/*.md` (rows per `judge-parity.md` §2), plus the audit rows the matrix lacked

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r4); earlier revision fixall/integrate-r3, fixall/draft-scope-r3

Tags: **BASE** (delivered by stage 1), **STAGE-2** (delivered by the neighbourhood stage through an interface the base
carries), **VILLAGE-LATER** (the separate product staged by the owner; checked as not precluded, hooks in PART III),
**module** (the optional `@plat/sim`, milestone M4b), **hook**. "Beyond" marks rows where the base deliberately exceeds
the reference's recorded weakness. Rows whose id starts `a:` were added by the fix-all pass from the coverage audits'
rows (COV-FTG-OBS1): the matrix is now no coarser than the findings.

**MFCG (40 rows) — all BASE**

| id | capability | where | tag |
|---|---|---|---|
| A1 | parameter surface / blueprint / URL | §4.2 S0, §6.4 permalinks, §7.7 intent (MFCG's flags kept as intent toggles and the features strip, §7.8) | BASE |
| A2 | RNG stream, seed chain, save/restore | §6.1 keyed sub-streams (beyond: no global stream) | BASE |
| A3 | pipeline structure and failure policy | §4.1, §5 (beyond: no whole-city restart; every requested feature counted by delivery tier) | BASE |
| B1 | patch mesh (spiral seeds → Delaunator → Voronoi/DCEL) | replaced by the plat and backbone faces (§2.2, §4.3); Delaunator kept for site sampling; the "denser, regular centre" look carried by the stage regimes | BASE |
| B2 | junction optimisation | §3.6 attraction + §4.3 junction merge (8 m), Y → T | BASE |
| B3 | coast / water field / `sea` | §4.2 S1 closed-outline coast at the request's bearing | BASE |
| B4 | `buildDomains` (land components) | §4.2 S1 flood fill of L0 | BASE |
| B5 | curtain wall, gates, towers, watergate | §4.2 S3 gate sites; §4.4 trace before the stage's growth; §4.8 gates at arterials with exact N by the measured gate law, water gates, towers by rule | BASE |
| B6 | citadel / castle (repair loop, placement, keep) | §4.2 S3 castle reservation by score with the inside / on-enceinte / outside option; §4.8 keep by `lir`, bailey, and the 0.75 compactness gate kept as a shape check, repaired in place first in MFCG's order (angle equalisation, then bloat within the area band), then re-sited, then a keep without a bailey — never a restart (F-CASTLE) | BASE |
| B7 | streets and roads (`Topology`, `aStar`, `tidyUpRoads`) | §4.3 routed arterials, destinations = gates / market / bridges / harbour | BASE |
| B8 | rivers / canals (regular, delta, bridges, mouth) | §4.2 S1 rivers by descent, distributaries (a delta), estuary as a width rule, islands; §4.8 bridges, canals as an intent flag | BASE |
| B9 | districts (seeded region growing, types, holes) | §4.5 grower over coarse faces, `check4holes`, feature-named kinds, quarters | BASE |
| B10 | ward → blocks (alleys by twisted bisection) | §4.6 bent-cut infill of each district polygon: the intramural secondary network and its lanes as spines | BASE |
| B11 | block → lots (twisted bisection, OBB, `indentFronts`) | §4.7 S10 per-frontage plots + front jitter (construction replaced by ruling O5; statistics matched, §13.5) | BASE |
| B12 | outskirts density falloff | §4.4 ribbon regime with the distance-to-gate kernel; §4.5 density field | BASE |
| B13 | shanty town / ribbon sprawl | §4.5 squalid type after the first half of the stages, outside the enceinte, with MFCG's trigger set; §4.4 ribbon regime; the suburb regime on the shanty toggle | BASE |
| B14 | plaza, temple, churches, gate plazas | §4.2 S3 plaza reservation sized per rung; §4.7 S9 `square` faces; §4.8 gate plazas and church forecourts (G-R1); institutions via claims | BASE |
| B15 | landmark / solid buildings, keep plan | §4.7 S11 institution site plans; §2.6 landmark footprint templates and OutlineBuildingGenerator; `lir` keep; solid-ink landmarks in `ink` | BASE (+ stage-3 hook) |
| B16 | greens / parks | §4.9 greenery rule table | BASE |
| B17 | farms and fields | §4.9 hinterland presets incl. the furrow style | BASE |
| B18 | harbour, docks, piers | §4.8 water furniture (basin, moles, quays, piers at 12–20 m) | BASE |
| B19 | trees and forests | §4.9 forests as faces; §8.10 stamped ranked tiles (Poisson k = 50, built when the product is built and shipped; scaled per entity by its spacing) | BASE |
| B20 | elevation field (`Apply elevation`) | §4.2 S1 real heightfield feeding S4 / S5 costs (beyond) | BASE |
| C1 | display modes (Lots / Complex / Block / Hidden) | §8.5 LOD bands + the plot model: the Lots look = footprint masses over the `ground` role at the city band; Hidden = a layer toggle; cadastral layer optional (beyond: no global switch) | BASE |
| C2 | roofs Plain / Hip / Gable, Raised, Solids | §3.8 straight skeleton with the plain-roof downgrade; §8.2 `roof` program; §2.6 roof spec + heights; Raised = `ink`'s offset under-copy, on by default (the projected shadow off, §8.4) | BASE |
| C3 | lot post-processing (`Offset`) | §4.7 S11 front-line jitter parameter | BASE |
| D1 | naming (Tracery + Markov, feature-conditioned) | §10.4 own engine and grammar | BASE |
| D2 | district labels (curved / straight / legend / hidden) | §9 hole-aware spines, quarter labels at city zoom, OBB-arc / straight / legend fallbacks (beyond: protected features) | BASE |
| D3 | map furniture (title, legend, scale bar, grid, compass, emblem, pins) | §9.5 (emblem slot with import and a minimal own generator; compass reroll) | BASE |
| E1 | colour system (schemes, roles, tints, weathering) | §8.2 roles, the contrast matrix, per-entity tints, thematic overrides | BASE |
| E2 | stroke discipline, layer order, caching | §8.2–§8.3 (casing idiom, round joins, order parity, world-aligned tiles) | BASE |
| E3 | alleys layer | §4.6 lanes / alleys are ways; §8.5 access-critical lanes drawn at the city band, the rest by LOD | BASE |
| E4 | district view, framing, no-zoom, thin lines | §8.8 continuous zoom on 2^¼ stops + the district band (beyond "no zoom"); framing §9.5; hairline mode (key **N**) | BASE |
| F1 | warp tools (8) | §3.4 `warp` + §7.1 `warp` event with dry-run and whole-step validation | BASE |
| F2 | rerolls, renames, landmarks | §7.1 the named actions, `setAttr`, `assign` (beyond: persisted, undoable) | BASE |
| F3 | UI / hotkeys / size bands | `@plat/app` input scheme in `keymap.json` (click edits, shift+click New random, ctrl / cmd+click reset, single-key toggles, §14); the measure tool (§9.5); the size ladder as data (§1.1) | BASE |
| G1 | export PNG / SVG / JSON | §11 (beyond: round-trip import, layered SVG) | BASE |
| G2 | integrations (FMG, Armoria, PS, Procgen Mansion) | §11 API, host bridge and static exports serve any host; the emblem is our own generator (§9.5); no third-party service is called (standalone) | BASE (hook) |
| H1 | population and scale model | §10.2 population as input; §2.1 metres (beyond the multiplier) | BASE |
| H2 | performance envelope | §12 (matched sizes 40 / 80 / 130; §12.9's declared trade) | BASE |

**FTG (46 rows + 9 audit rows) — BASE unless noted**

| id | capability | where | tag |
|---|---|---|---|
| A1 | parameter surface, presets, save/load | §4.2 S0, §7.6 presets as data, §2.9 document | BASE |
| A2 | two-phase pipeline, staging, failure policy | §4.1 (programme before layout, two-way), §5 | BASE |
| A3 | coordinate system, units, wire format | §2.1 integer cm centred; §2.9 binary blocks / CBOR twin | BASE |
| A4 | determinism, seeding, regeneration of old settlements | §6, §6.4 retention, §7.5 migrate (beyond: FTG has none) | BASE |
| A5 | server/client split, persistence, lazy person generation | §11.2 handle API and workers; §2.9 document; §10.3 lazy people | BASE |
| a:A24 | app accessibility; list and search views reaching buildings and people without the map | §14 `@plat/app` accessibility contract, the gazetteer and "features in view" lists; §13.4 tests | BASE |
| a:A25 | user guide, context-aware documentation links, release notes naming defects | §14 `@plat/docs` and context help; §7.8 anchors; §13.2 coverage and link checks | BASE |
| B1 | size ladder, population and area budget | §1.1 ladder and rung profiles; §4.2 S2 stage quotas; §12.2 | BASE |
| B2 | dependency-graph building selection | §10.2 sequential roster (own tables) | BASE |
| B3 | residents, job postings, backfill, matching | §10.3 households (base); postings and re-matching in the module | BASE + module |
| B4 | people model | §10.3 derived people with ancestry rows (own tables) | BASE + module (data depth) |
| B5 | government, religion, factions, military | §2.7 Faction / Institution entities with seats; §10.2 government and religion rows (base); meetings, roles and goals in the module | BASE + module |
| B6 | relations, friend groups, rivalries, events | the relation store — schema in the base (§10.1), materialised by `@plat/sim` | module |
| a:B10 | economy: resource chains, items and services with prices, stock per building, global price edits | D-32: `@plat/sim` over the base schema stub (§10.3); roster rows' provides / uses edges (§10.2) | module |
| a:C03 | personality, education gated by class, stat block with profession modifiers | D-32: `@plat/sim`, derived from the person key; the stat block a named game-system pack, off by default | module |
| a:C11 | family-tree view (layered generations, elided expansion, re-root) | §14 `@plat/app` family-tree view over the relation store | module |
| C1 | coast generation, islands, ponds | §4.2 S1 closed-outline routine, bank classes (also sky islands) | BASE |
| C2 | rivers, branches, bridges, classification, direction | §4.2 S1 hydrology, tributaries, distributaries, river islands, crossing sites; §4.8 bridges | BASE |
| C3 | manually drawn water | §7.1 `drawWater` | BASE |
| C4 | road-graph substrate (PSLG, incremental faces, edge types) | §2.2 the plat (beyond: attraction policy, levels as views of one arena, role sets on edges) | BASE |
| C5 | road growth (proposal queue, cap, lengths, stages, initial roads) | §4.4 S5 outside the walls (mean-reverting curvature walk, destination-biased, explicit legality; per-preset growth rules for `american` / `ringed`); travel-cost stage boundaries with the anisotropy row (FTG's spoke priority) | BASE |
| C6 | district lots: creation, merge floor, type selection, order | §4.5 grower and typing, merge floor; S7b allocation | BASE |
| C7 | district internal pipeline (landmarks → divide → plots → buildings), placement modes, modifiers | §4.7 claims first → S8 → S10 → S11; Dense / Gaps / Individually placed ≈ row / detached / compound; the tents arrangement row (§4.7 S11) and the building-scale multiplier (§2.5) | BASE |
| C8 | lot → plot subdivision geometry | §4.7 S10 per-frontage regions (replaces recursive random cuts by ruling O5) | BASE |
| C9 | building footprints, landmark templates, entrances | §4.7 S11; entrance rule kept; non-rectangular landmark footprint templates in the base (§2.6) | BASE |
| C10 | suburb stage | §4.4 suburb regime (offshoots, cul-de-sacs, small lots from the outset, density Bernoulli) by preset or the shanty toggle | BASE |
| C11 | walls and towers | §4.8 | BASE |
| C12 | castle district | §4.2 S3 castle reservation + §4.8 | BASE |
| C13 | harbours and waterfront districts | §4.8 water furniture; §4.5 docks | BASE |
| C14 | outer settlement: farmland, farmsteads, outside buildings | §4.9 S12a count-driven outside land, farmsteads, outside buildings on their resources (§10.2 `outside` rows) | BASE |
| C15 | forests, tree areas, trees, hedgerows | §4.9; §8.2 hedgerow instances in `lit` | BASE |
| a:I11 | tree species | §2.7 `Greenery.species` from the climate table; §4.9 inner and outer shares for woods | BASE |
| C16 | landscape decorations, reserve, climate presets | ponds carved at S3 (§4.2 S3 (10)); the rest of the decoration table (copses, stone circles, ruins with trails, counts by rung and biome, keep-clear radii) is S12a's sites, built by the hinterland unit (§4.9); `reserve` land use; climate as a circumstance + style preset | BASE (should-have) |
| a:I05 | feathered field edges | §8.2 `feather` program (vector bands), on in `lit` | BASE |
| C17 | perimeter expand + round; decoration system | §4.5 S6's settlement perimeter, offset and rounded; §4.7 furniture pins (per-block weighted rows, per-district singletons) and plot boundary treatments (§2.5) | BASE |
| a:J05 | market stalls | §4.7 furniture pins: stalls on the square's edge band and round the market hall | BASE |
| C18 | district and building naming, erosion | §10.4 (contraction as an EVO event) | BASE |
| D1 | renderer architecture | §8.1 columnar display list + tile backends (batched; picking through hit-test slices) | BASE |
| D2 | palette and feature treatment | §8.2 `lit` preset on Canvas2D with our procedural texture set | BASE |
| D3 | roofs (straight skeleton) | §3.8, §8.2 (roofs cached per entity revision, not per render) | BASE |
| D4 | water rendering and coast decoration | §8.2 bands, depth ramp, foam, bank classes | BASE |
| D5 | day/night, weather, seasons, window lights | §8.4 sun vector + shadow hook; `night` preset with the `lights` role; lights from the module | BASE (hook) + module |
| D6 | post-process effects | §8.2 post operations per tile (greyscale, sepia, tint, vignette, pixelate, dot screen, scanline, crosshatch noise) | BASE (should-have) |
| D7 | labels, scale bar, grid, units, legend, thematic layers | §9; thematic layers = style overrides keyed by attributes (§8.2) | BASE |
| a:L08 | ruler (distance measuring) | §9.5 measure tool (distance and area, metres and feet, snapping) | BASE |
| D8 | 3-D view, street view, height maps | §11 glTF and CityJSON exports; heights in the model; no 3-D default view (R13 restraint) | BASE (export) |
| E1 | layout editor | §7.1 draw / move / warp events with split-on-cross and dry-run validation | BASE |
| E2 | regenerate area, bulk edit, constrained re-roll | §7.1 the named actions with scope; `setAttr` batches; faithful regeneration (beyond: undoable) | BASE |
| E3 | entity editing, dictionaries, pins, notes, layers | §7.1 `setAttr`, data dictionaries by id (§10.3), annotation layer (§9.5), view notes (§11.3), `LayerSpec` | BASE |
| F1 | schedules, behaviours, sub-locations | §10.3 module; sub-locations with capacities (§2.6) | module |
| F2 | clock, calendar, external time sync | §10.3 module; the time view state and the module's command over the bridge (§11.3) | module |
| G1 | export | §11 (beyond: districts in GeoJSON; per-layer VTT; CityJSON) | BASE |
| G2 | integrations (Foundry, Roll20, public links) | §11 VTT exports (Foundry-class, dd2vtt) + the host bridge over any transport; no hosted service — the host is the store (§11.5) | BASE |
| H1 | data scale | §12.8 memory; lazy people | BASE |
| H2 | performance envelope | §12 (beyond: client-side, no server round trip; the first map under 1 s for every TOWN and CITY and for METROPOLIS up to ≈ 14 200 buildings (≈ 48 000 people), ≈ 2.3 s at the 120 000 cap; model p95 within O3 (d)'s bars up to ≈ 4 500 / 17 700 / 58 800 people and the max up to ≈ 3 400 / 13 600 / 45 800; both misses above declared for the owner's veto — D-18, §12.3, §12.5; VS2-3, VS3-2) | BASE |

**NG (31 rows) — STAGE-2 unless the base already delivers it**

| id | capability | where | tag |
|---|---|---|---|
| A1 | tags, `Settings`, URL state | PART II request (fabric id, params, character); §6.4 permalinks | STAGE-2 (request shape in BASE) |
| A2 | RNG engine, one stream, successor seed | §6.1 per-district sub-seed (beyond) | BASE |
| A3 | pipeline structure and failure policy | §4.1, §5 (NG's local retries are the F-CUT ladder) | BASE |
| B1 | hood outline (`createShape`) | the district's typed boundary (II.1); standalone and sky outlines from §4.2 S1 (2)'s closed-outline routine with an outline template — disc, D-shape, lozenge, crescent, spindle (II.1 rule (5)) | STAGE-2 |
| B2 | templates area / street / square | `FabricStrategy` registrations selected per district (II.2) | STAGE-2 |
| B3 | street network by bent recursive bisection | §4.6 (the base's infill primitive; NG signature as regression) | BASE |
| B4 | hole-aware bisection of annuli (`BisectorEx`) | §4.6 slit routing — the primitive `RingFabric` needs | BASE (primitive), STAGE-2 (ring) |
| B5 | street finishing: extend, fillet, width, corridor | §4.6; §4.7 S9 corridors | BASE |
| B6 | block content dispatch (Normal / Manor / Empty / Green) | §4.6 the deep-interior choice by band shares; §4.7 S10 residue typing; §4.9 greens; the weighted, area- and spacing-conditioned choice as a stage-2 table (II.3) | BASE + STAGE-2 |
| B7 | square-template plaza | `SquareFabric`; §4.7 `square` faces | STAGE-2 |
| B8 | ring-template seed geometry | `RingFabric` (II.2): concentric ring roads at a radius law are the only seed geometry — no template radials; each annulus is cut outside-in by the hole-aware bent cut, whose first cut is a slit and whose later cuts are the radial streets, staggered band to band | STAGE-2 |
| C1 | lots, setback, validation (perimeter filter) | §4.7 S10 (construction, 0 discards) | BASE |
| C2 | buildings, wings, compound plans, roof kinds, landmarks | §2.6 wings in the base + stage-3 hook; roof kinds in the base | BASE (+ stage 3) |
| C3 | manor compounds (walls, hall, grove) | §4.7 S11 set-back compound site plan with boundary treatments + §4.9 grove rule | BASE |
| C4 | greens, groves, shared Poisson field | §4.9 greenery rules; §8.10 stamped tiles | BASE |
| C5 | trees (crown construction, colour, shading, depth sort) | §8.2 lobed crowns, depth sort in `hatched`; §8.10 crown library | BASE symbol, STAGE-2 tier |
| C6 | pins: wells, fountains, large trees | §2.7 `Pin` kinds; §4.7 furniture pins in yards and squares; close-up density by the stage-2 table (II.3) | BASE (pins), STAGE-2 (close-up density) |
| C7 | uneven streetwall | §4.7 S11 front-line jitter | BASE |
| C8 | size tags, scale, character knobs | §2.5 character vector; metric scale (beyond) | BASE |
| D1 | naming | §10.4 | BASE |
| D2 | title layout (corner choice) | §9.5 emptiest-corner rule | BASE |
| E1 | palette / style schema, presets, multi-colour | §8.2 (`hatched` / `graphic` presets; multi-colour roles) | BASE |
| E2 | canvas, layer order, stroke discipline, depth-sorted trees | §8.2–§8.3 | BASE |
| E3 | roads rendering (Plain + five modes) | §8.2 programs (paved stripe, cobbles, tiles, outlined, dashed) in `hatched` | STAGE-2 tier |
| E4 | roof rendering: fake gables, colour law, hatching | §8.2 `roof` + `hatch(taper)`; §8.6 | STAGE-2 tier (programs in BASE) |
| E5 | shadows (prism quads, tree shadows) | §8.4 shadow pass from stored heights | BASE hook, STAGE-2 tier |
| E6 | unrecorded style features (night lights, presets) | §8.2 presets as data | STAGE-2 tier |
| F1 | toggles, hotkeys, presets, tags dialog, rotation, renaming | `@plat/app` (keymap, §14); rotation = view (§7.1); `setAttr` rename persists | BASE (app) |
| G1 | export PNG / SVG / JSON, permalinks | §11 | BASE |
| G2 | integrations (Procgen Mansion hand-off) | the stage-3 `BuildingGenerator` takes the plot and entrance directly (beyond the rasterised hand-off) | hook |
| H1 | performance envelope | §12 (open a district ≤ NG's 10–96 ms; per-district regeneration ≤ 30 ms) | STAGE-2 |

**VG (44 rows) — VILLAGE-LATER: not-precluded checks, hooks in PART III**

| rows | capability group | not precluded because |
|---|---|---|
| G1, G20 | tags, descriptive tags | the intent layer and presets are data (§7.7); tags derivable from the statistics record |
| G2 | seed / RNG / retry | §6 streams; §5 no seed swap |
| G3–G5 | river course before terrain, height field, water extraction | S1 shares level-set water and a carved field; VG's course-first, terrain-independent spline is a `RiverStrategy` the village registers, which S1's carve step serves (PART III) |
| G6, G7 | density map, heart | the density field is the same field type (§4.5); a village registers a density `StageDecl` ahead of its network (§4.12) and seeds one heart (§4.2 S3) |
| G8, G9 | tracker roads, bridges | a village registers a tracker-steered `NetworkStrategy` that receives the traced enceintes (§4.12); bridges §4.8 |
| G10, G11 | square + centrepieces, wharf / piers | `square` faces + pins; `quay` / `pier` ways |
| G12–G16 | buildings + population, fields, orchards, forest, palisade | detached / farmstead site plans (§4.7); hinterland presets and orchards (§4.9); forests; the palisade built before the roads by the village's `EnceinteStrategy` (PART III) |
| G17–G19 | naming, legend / POIs, population class | §10.4, §9.5 annotation layer, §10.2; the ladder's village rows (PART III) |
| R1–R17 | rendering (palette, layers, relief, hillshade, spotlight, water bands, roads, buildings, trees, shadows, fields, outlining, palisade, lights, nameplate, grid, numbering) | style sheets + programs (§8.2: bands, contour and hachure marks, outline mix, vignette, `lights`); the relief tier (hillshade, contours, hachures) is an optional base program, off by default; VG's grass-tuft and spotlight looks stay with the village product |
| E1–E6, D1 | export, JSON, permalinks, editing, integrations, performance, scale | §11, §7, §12, §2.1 (metres everywhere; VG's 0.7 m / unit ambiguity removed) |

All 44 rows are not precluded; the base pays for none of them beyond what it needs itself (the relief tier is a base
should-have in its own right, O12 extras). Caution recorded from the parity judge: the five-level plat is the least
village-shaped model — a village with houses along ways leaves L2 / L3 nearly empty — admissible, since a village is one
district and nothing assumes walls or a market (PART III).

=== REPLACE §16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2 ===
## §16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r4); earlier revision fixall/integrate-r3, fixall/draft-scope-r3

*In plain words.* Before building anything we measure what we still need from the recordings and take a few small new
ones (FTG towns at two sizes, MFCG towns at five seeds per size), then build the riskiest pieces first as short spikes
with pass/fail numbers: the geometry kernel, the bent cut, the fused street layout with its speed gate, and the
determinism machinery. The first real milestone (M1) is a town the owner can look at next to MFCG and FTG. Because the
owner ranks editability first, editing comes next (M2a), before the second look and the rest of parity (M2b). Then full
editing and the API (M3a), the exports and the should-have extras (M3b), hardening (M4), the simulation module (M4b) and
stage 2 (M5). Effort is stated honestly as a range with its basis: about 150–200 expert person-weeks. The subjects the
owner's roadmap puts later are listed at the end with their hooks; nothing else is out of scope.

Person-weeks are expert estimates (PLAUSIBLE) for two implementers plus a verifier seat — about 75–100 calendar weeks
at that staffing; staffing per the owner (architecture and rulings on Fable seats; build, verify and measure on Opus
seats). Every milestone ends on executed evidence, never on intention, and every exit writes its `MilestoneRecord`
with the milestone's declared shifts and fails on an undeclared one (§13.3). **One rule for the owner's panel at every
gating exit (NF-S2):** M2b ("the base at parity"), M4 ("mastered") and M5 (the stage-2 gate) claim their D-5 verdict only
by a rated pass of §13.6's protocol or by the owner's acceptance recorded in the `D5Record`; if the owner has not rated
within seven days, the build continues on the measured numbers, the milestone's D-5 status is *provisional — not
rated*, the claim is not made, and the panel is offered again at every later milestone and, after M5, with every release
until it is rated (§13.6 (7)).

| milestone | content | exit criteria (executed, not asserted) | est. |
|---|---|---|---|
| **M-1 — calibration and the clean-room inputs** | `docs/CONFIDENCE.md` §6 **#5** FTG face recovery (block sizes inside rings, dividing-road position vs OBB, plot depth and frontage, FTG's plot share of land) and **#10** NG adjacent-footprint pairing; **#2** the NG size sweep; the NG baselines of `docs/IMPROVEMENTS.md` §7.2 (detour index, 4-way share, cycles per km², plot minimum-width distribution, streetwall gap per 100 m); NG's hollow-block frequency and MFCG's inner-lot removal (IMP-8); **the MFCG sweep at five seeds per matched size** (40 / 80 / 130, plain options, plus a river-and-coast variant) with lot-orientation coherence, wall alignment, walled and ribbon shares, district areas, gates, towers, castle and plaza, and — every ⟨M-1⟩ number of §13.5 (NF-S5) — streetwall continuity on dense frontages, lots per block, T / Y share, intramural dead ends, blocks per ha, inner-lot removal and street-edge recoverability on its plain renders (the metric of §8.5, implemented research-side and cross-checked against the product's implementation on M1's golden renders within 0.01) (MFP-2, MFP-6, MFP-8); **FTG captures at BIG_TOWN and BIG_CITY**, three of each — one with FTG's water options nearest to `none` and two nearest to `coast+river`, each capture's id (its folder name) and `WaterSetting` recorded in its README for §13.6 (2)'s pairs (VS3-6) — over six days on the free daily allowance, decoded with the existing tools (FTG-16); outline anisotropy and turning per 100 m after 10 m resampling on every FTG payload (FTG-5, FTG-15, NF-S3); NG block counts per template at `medium` from the vertex captures; the variety dispersions of MFCG and FTG (IMP-12); **`baselines.json`** generated research-side with `referenceBuild` on every row and committed into `plat/`; **the sanitised implementer digest**, written by one seat and checked by another; the hashed content deny-list; `CLEAN-ROOM.md`'s seat ledger (IMP-1) | every §13.5 baseline row present with its provenance — or, for an ⟨M-1⟩ number M-1 could not measure, the row made descriptive and entered in `known-defects.json` by §13.5's ⟨M-1⟩ rule — and every band computed by the band rule; a `docs/calibration/` record per experiment; FTG's six captures decoded; the digest checker's report shows 0 code excerpts, 0 reference word lists, palettes or tables and 0 deny-list hits | 2–3 pw |
| **M0 — kernel, bent cut, fusion, determinism and site spikes** (risk retirement) | (a) `@plat/kernel`: lattice, predicates, one arena per layer with the levels as views, role and owner tables and reference resolution, attraction and contact semantics, batched transactions with stage-end index partitions, booleans / buffers / bands on the arrangement with the CI oracles, OBB / LIR, snap rounding, the straight skeleton with its validator and exact OBB roofs; (b) the **bent-cut transaction** with the hole slit, calibrated on NG's vertex captures; (c) the **fused-layout spike**: S4 routing + S5 growth + S8 infill on a flat synthetic site at CITY face counts; (d) the **determinism spike**: structured stream keys, lineage-hash minting, the Merkle digest, `dmath`, the time-dilation shim, the allowlist lint with its vendored scan; (e) the **site-and-fields spike**: S1 + S4 + S6 with §12.4's mechanisms; (f) the CI tiers timed on the runner (§13.8) | (a) B-FUZZ 0 crashes / hangs / invalid outputs on 10⁶ random inputs per primitive and on the whole constructive set (§13.1); insert + snap + attract + re-walk ≤ 8 µs per proposal, or §3.7's miss rule applied before M1 (the accelerator, or a declared budget amendment); S11's geometry share ≤ 3 µs per plot median; §3.7's bars (i)–(ii) and §3.8's bar, with their pre-decided fallbacks applied before M1 if a bar fails; op-permutation determinism for declared batches and issue-order determinism for callback-form stages (§3.3); (b) start position σ within ± 0.02 of 0.066 (plain faces) and 0.098 (ring faces), corner within 0.10 of mid-course on ≥ 80 %, arrival ≥ 85° on ≥ 95 %, block-area and cut-length KS by the band rule — on curved, round-joined, triangular, C-shaped and holed faces; (c) **the fusion gate**: S4 + S5 + S8 ≤ 100 ms at CITY, block-area and junction-degree distributions inside the NG bands on the same district shapes and the MFCG street-signature rows of §13.5, no turn cliff, 0 whole-map restarts on 1 000 seeds — if it fails, §4.4's fallback applies before M1; (d) digests identical on Node x86 / arm64, Chromium, Firefox and WebKit, workers on and off, 100 seeds; every stream key distinct; ≤ 0.1 µs per structured key; digest maintenance ≤ 5 % of stage time and a full recompute ≤ 150 ms at CITY; (e) S1 + S4 + S6 ≤ 50 ms at CITY, or §12.4's coarsening fallback applied and re-measured; (f) each CI tier inside its budget, or §13.8's fallback applied | 9–12 pw |
| **M1 — a viewable MFCG/FTG-class town** (the first product milestone) | S0–S11 with row / detached / hovel site plans and heights (compounds in M2b), at all three rungs — METROPOLIS is a `ladder.json` row on the one pipeline, so the goldens, B-CITY, the determinism tests and the diagnostic panel include it from M1, and M2b measures and tunes it (VS2-2); S3 reservations and gate sites; S5 with each trace before its stage's growth; S7 walls / gates / towers / castle; the eager allocation; S13a names with the quarter merge tree (quarter labels at the city band, district names at the district band); the `ink` preset at the city and district bands on the Canvas2D tile pyramid (its close-up and building bands at M2b); SVG / PNG export; permalinks marked *preview* (§13.3); the report panel with delivery tiers; the B-CITY harness in the PR and nightly tiers; **the output-version stamp, the shift, cascade and milestone records in `plat/goldens/`, and the stage-isolated golden tooling with the per-stop placement digests (LC-19, NF-S1, N-24; §13.3)**; `SeamContract` on every district; the derivation pool; the milestone-1 gate list of `docs/IMPROVEMENTS.md` §5.1 (O2, O6, O3, O11 schema + PNG / SVG, O1, O4, O5, O18 with a flat field, O17 basic, O8 basic, O12 ink, O16-core). **Named work items (IMP-2):** the M1 content, authored fresh — roster rows for the M1 classes, households, the naming grammar and word lists, the era table, the `ink` palette (≈ 3–4 pw of the estimate); the app shell — one click, basic panel, report, gazetteer and "features in view", the keymap, the accessibility contract, context-help skeleton (≈ 2–3 pw) | the **D-5 protocol's first run** (diagnostic, §13.6) with its threshold panel; on B-CITY-lite (200 seeds × 4 water settings): 0 tier-6 omissions of requested features and degraded ≤ 5 %, plots with access 100 %, population ± 5 %; **the fusion gate re-run on B-CITY-lite's river, coast and relief configurations with the reordered stages (IMP-13)** — pre-decided fallbacks: on time, §4.4's class-boundary move (growth stops at district-scale secondaries everywhere; lanes infill-only), then the CITY model budget re-declared at the measured p95 as a D-18 amendment for the owner's veto; on statistics, the infill band table gains a slope class (face mean slope < 5 %, 5–15 %, > 15 %) calibrated on NG's faces, and the gate re-runs; model within §12.3 at TOWN and CITY with the pool measurement (the pool primary at each size where §12.3's rule keeps it — its p95 within the pooled law + 10 % at the band's bottom, target and top, below a single worker's on the same generations, digests identical for pool sizes 0–3 on 200 seeds — with that rule's pre-decided outcomes); the label-composition measurement (§8.9); the figure-ground metrics against MFCG's M-1 recoverability, contrast matrix, `ink` symbolisation census, label floors and counts and hairline fidelity (§8.3, §8.5, §9.4); B-ZOOM's role continuity across `ink`'s city → district switch; placement digests identical on Node x86 and in the nightly five-engine run; the walled share and extramural ribbon share in MFCG's band (§13.5); the between-seed dispersion against MFCG's and FTG's (IMP-12); the B-EDIT-lite identity fixtures (≥ 99.9 %); the document-size test (≤ 320 B per building at CITY); the control-continuity sweep; the parity report by the band rule; every district carries a complete `SeamContract`; the scripted tasks of §13.4 that M1 supports, keyboard-only included; the first-map, settle and re-raster runs at TOWN and CITY band bottom / default / top (§12.5); the model max clause at TOWN and CITY, judged on confirmed outliers (§12.3); the furniture and snap query round trip (§8.9); the sliced-raster census rows (§8.3); the pan-and-zoom run during an A2 export (§8.9, §12.7); the stamp-tile asset load (§8.10, §12.7); the pin-pass B-ZOOM fixture (§9.2); the harbour pick's measurement on B-CITY walled coastal seeds — p99 of harbour route ÷ the least-cost path with the wall ignored ≤ 1.5, and if it fails the detour guard becomes the default (§4.2 S3 (4), (7)); the SVG export's transient-list peak (§12.8); memory within §12.8's lines at TOWN and CITY on generated towns at pool sizes 0 and 3 (the load-verification case is M2a's; VS3-1); the font-feature test (§9.2); the SVG and PNG export budgets (§12.7) | 33–43 pw |
| **M2a — the editing core** (D-7: before the second preset) | the document and log with the one replay fold; locks and pins; scoped faithful regeneration; the named actions (Regenerate keep settings, Adjust with the fate report, New random, Same kind new seed); undo / redo as logged events with per-session stacks, the independence check and unshared truncation (§7.4); per-document sessions (§7.4); the load's recomputation of the decoded state's own digest before its first edit, then edits applied at once during load verification with both mismatch choices (§2.9 steps 3–4); replay with S13a per event (§7.3); dry-run validation with conflicts returned as actions; `setAttr`, `delete`, `merge`, `split`, `join`; the app's selection, context panel, lock and the keymap's pointer idioms; B-EDIT at 10³ (PR) and 10⁴ (nightly) with the oracle once per sequence | O9 (a), (b), (d); the oracle's (i)–(iii) green on 10⁴ sequences; a CITY district undo ≤ 30 ms; per-edit validation and fixed-scope edit cost flat within ± 20 % from TOWN to CITY (METROPOLIS joins at M2b, which measures it; NF-S6); "recover from a mistaken regenerate" in one undo; the verification reference mix within §12.6's V + 10 %; open-to-editable within T(B) at TOWN and CITY, and the corrupt-cache fixture — a snapshot with one moved footprint and an unchanged `model.digest` reported and loaded by replay, never verified (§2.9 step 3; VD3-1); on the reference 300-edit CITY document, an edit made 100 ms after the state becomes editable applies within its §12.6 cost + 10 ms with pool size ≥ 1 (§2.9 step 3); memory at CITY while that document is load-verified, with a district regeneration and a Re-derive from S3 applied during it, within §12.8's line at pool sizes 0 and 3 — or §12.8's fallbacks applied (§12.8; VS3-1, VD3-5); the rebased-document size test — a CITY document rebased by keeping the saved town, after 20 edits, ≤ 1.25 × the unrebased document, or §2.9's block-group fallback applied (§2.9 size budget; VD2-9, S4-2) | 9–12 pw |
| **M2b — the base at parity** | the prosperity field with drivers and the brush; the full granularity law with the rung modifiers (§1.1) — joins, splits, alleys, back lanes, the deep-interior shares; S10b placement from the roster; compound site plans with the packer; roofs; S12 hinterland presets, greenery rules, outskirts and the suburb regime; harbour, bridges, canals; O13-core street names; O14-core; the bench statistics; **`lit` on Canvas2D at all four bands** with our procedural texture set (≈ 1 pw); **`ink`'s neighbourhood close-up and building band** with the roofs — ridge hairlines by the roof construction, tapered ticks, prism shadows when shadows are on, cobbles as ink stipple, pins as ink symbols, every named way labelled; wings as ink outlines (§8.2; N-23); the relief tier; METROPOLIS measured and tuned, with the single-thread METROPOLIS measurement (§4.1), the compositor measurement (§8.9) and the projected-shadow budget measurement (§8.4). **Named work item:** the rest of the base content — the remaining roster classes, institutions, government and religion rows, the greenery and hinterland tables, the `lit` palette (≈ 4–6 pw) | every must-have letter run on B-CITY (1 000 seeds) against its §13.5 or §13.7 band — no letter without a number; every §13.7 threshold due at M2b confirmed or its fallback applied, O19 (g) city-zoom greenery for `ink` and `lit` among them; per-edit validation and fixed-scope edit cost flat within ± 20 % from TOWN to METROPOLIS (NF-S6); B-ZOOM role continuity across every band switch of `ink` and `lit` (N-23); O17 / O18 / O19 runs; roster placed 100 %; site plans ≤ 5 µs per plot median; 300 dpi export; ≥ 60 fps at 40 k buildings; METROPOLIS first-map runs at 30 000 / 50 000 / 120 000 people (§12.5); the pool rule, the model max clause and the export-time peak at METROPOLIS (§12.3, §12.8); the query round trip at METROPOLIS (§8.9); open-to-editable within T(B) and memory within §12.8's line at METROPOLIS (§2.9 step 3, §12.8); the moving-sun step budget (§8.4); the METROPOLIS SVG budget (§12.7); the rung-profile orderings of §1.1; **the D-5 protocol passes** against MFCG (`ink`) and FTG (`lit`) at TOWN and CITY (METROPOLIS per D-31), or the owner's acceptance is recorded — unrated: M2b's status is *provisional — not rated* and "the base at parity" is not claimed (the rule above) | 33–42 pw |
| **M3a — full editing, migration and the API** | warp kernels with whole-step validation; drawn constraints and the "rebuild around my drawings" rebase; assignments and the placement solver; rule-table overrides, the preference layer and the tables editor; migration and upgrade as undoable events with their diff; rebase; **retention of output versions N−1 and N−2** (§6.4); the dependency audit with the locality oracle at full scale; B-EDIT 10⁵ in the milestone tier; the handle-based embedding API (§11.2); the host bridge and `DocResolver` (§11.3, §11.5); S1's water and terrain operators with re-sited crossings and exact re-basing (§7.3), the water operator in §4.11's order with course-knot edits (§7.3 (b)); point-anchored records under a warp (§7.4); the carve edit with §4.11's way rule and the kernel's clear regions (§3.3); the `packs` block and the link refusal rules (§2.9, §6.4); the naming-input re-draws on table, pack and upgrade edits (§6.3 case (4)); GeoJSON; the app's drawing, warp, brush, assignment and tables-editor tools | O9 (c) faithfulness — Regenerate (keep settings) byte-identical, and §13.2's rank campaign for New random passing in the nightly tier (a failed campaign is re-run once with the next seed; a second failure is a regeneration defect, fixed before exit; IMP-7) — (e) and (f), the thirteen MFCG asks as scripted scenarios; §7.3 (7)(v)'s coarse-edit assertions on B-EDIT's terrain and water sequences; the clear-region fixtures of §3.3 (a canal across a CITY district, a canal across a walled CITY's wall between two towers, an outer moat at S5a, a course-knot move and a river move across a street grid: every face outside the edit's footprint (§4.11) byte-identical except the seam exception at its boundary, attraction onto exactly the prepared vertices and no other contact), or §3.3's pre-decided fallback applied before exit; B-EDIT 0 planarity violations and 0 lost faces over 10⁵ sequences; O2 (c)'s carry-over rates, or §13.7's fallback; goldens replay under N−1 and N−2, each retained version ≤ 150 KB gzipped; the bridge convergence test (a host and three headless clients, 1 000 interleaved random events — undo and redo from every client and one owner undo through a chain among them, and one forced load mismatch settled by an owner's keep of the saved town while two editors edit on the replayed town — one digest, 0 lost accepted events; §11.3, §2.9 step 4); the naming-input fixtures — a selected user corpus and an edited naming row rename exactly the unedited names citing the changed slices, listed for confirmation, in a fresh and in a rebased document (§6.3 case (4), §13.2); a link to a town with a non-shipped pack or host content is refused and its `.plat` file replays without them; GeoJSON loads in QGIS with districts | 15–19 pw |
| **M3b — exports, forms and the should-have tiers** | VTT (Foundry-class scene JSON and dd2vtt, one scene per layer); glTF / OBJ; CityJSON; the CBOR twin with its decoder; S0–S4 proxy thumbnails; O10 intent expansion and the forms catalogue with its classifier; O13 full (path labels, addresses, the annotation layer and legend sheet); O14 full (rings, presets, wildness, feasibility); O16 full (drafts, discoverable export, the responsive editor); O12 extras (the low tier); the `@plat/docs` guide and generated release notes; three candidate `house` style sheets (D-1); the ink-family variants `parchment`, `bw-print` and `night` at all four bands (the `night` sheet's occupancy-driven window lights arrive with the module at M4b); random styles with the bounded repair (§8.2) | VTT import with no manual steps; every format validator green; scripted intent tasks 10 / 10; the forms classifier ≥ 90 %; six thumbnails < 1 s at TOWN; every scripted task of §13.4; monotonicity sweeps green at every rung; documentation coverage 100 %; B-ZOOM role continuity across every band switch of the ink-family variants; the random-style shipped-palette fallback ≤ 2 % of 10 000 draws per family (§8.2); the anchored CityJSON file validated with PLAT's extension, or the sidecar fallback taken and reported (§11.1) | 16–21 pw |
| **M4 — hardening and the incremental path** | the performance tiers and the low-end tier measured on the named device (§12.1); the table-provenance audit; **the one incremental path: add a growth stage to an existing town** (surviving entities byte-identical, new entities on epoch components, wall → ring road as `retypeEdges`); output version 1 fixed, ending the *preview* label; release notes naming known defects; **the D-5 protocol's "mastered" run**, with the owner's pick among the three `house` sheets (no pick by the exit: candidate 1 ships as `house`, `ink` stays the default and the pick is offered again, §13.6 (8)) | nightly cross-platform goldens green for two weeks; the epoch test (0 re-rolled survivors); a document with interleaved edits and two epochs replays to the session digest; the conversion test; the 20-epoch heap and document budgets; METROPOLIS first map within §12.5's law at 30 000, 50 000 and 120 000 people (under 1 s up to ≈ 14 200 buildings); "mastered" claimed only when the D-5 protocol passes, rated, at all three rungs (METROPOLIS per D-31) or the owner's acceptance is recorded — unrated: M4 closes with "mastered" *provisional — not rated* and the panel offered again at M4b, M5 and every release (the rule above); every table value replaceable with provenance | 11–16 pw |
| **M4b — the content module `@plat/sim`** (after the relation store's schema, which is in the base from M1) | the relation store materialised (family units, relations, memberships); postings and re-matching; occupancy and schedules as a query; the calendar; factions with roles, goals and reconciliation; religions' meetings; events as templates; the economy and personality content of D-32 with its authored tables; the family-tree view | O7's module letters (every person a work or role 100 %; the same person on every view; `whereIs` deterministic; stored bytes per 10 k population reported); one hour for 50 000 people ≤ 50 ms; a scoped regeneration changes 0 relations outside its scope; the family-tree view keyboard-operable and pins nothing | 8–14 pw |
| **M5 — stage 2: neighbourhood composition** | `@plat/hood`: `RingFabric`, `SquareFabric`, `StreetFabric`; the block-content dispatch table and pins; the `hatched` family at all four bands — city (masses in the lit roof tone, ground = paper, the street stripe, wood fills), district (two-tone roofs by `fakeGablePerWing`), neighbourhood (the render tier: tapered hatch, prism shadows, cobbles, chimneys, wells, lobed depth-sorted trees, hood title) and building (per-wing hatching) (§8.2; N-23); the close-up workflow on any district and on an arbitrary boundary (sky context); the "same kind, new seed" per-district workflow with locks | every district of every B-CITY city opens as an NG-class close-up; portals connected 100 %; shared-edge geometry byte-equal across adjacent neighbourhoods (Hausdorff 0); per-district regeneration ≤ 30 ms and open ≤ NG's 10–96 ms at comparable counts; footprint hash identical to city LOD; every stage-2 letter of §15.2 (S1–S6) run against its number, S4 (d)'s §13.7 band confirmed or its fallback applied; B-ZOOM role continuity across every band switch of `hatched`; the stage-2 gate claimed only when **the D-5 protocol against NG** (S2's preference test with the owner as rater; twenty pairs over the four templates, §13.6 (2)) passes, rated, or the owner's acceptance is recorded — unrated: M5 closes *provisional — not rated* and the panel is offered with every release until it is rated (the rule above) | 14–18 pw |

**Effort, with its basis (IMP-2; D-20).** Re-derived line by line (PLAUSIBLE; each line a range with its basis):

| line | pw | basis |
|---|---|---|
| parity floors after sharing: (MFCG 46 + FTG map subset 52) × 0.65–0.75 | 64–74 | `docs/CONFIDENCE.md` §1; sharing the kernel, the display list and the document removes 25–35 % of the two floors, not 50 % |
| O1 terrain and hydrology beyond the references' water | 4–6 | priority-flood, D8, rivers by descent, coast–terrain coupling, islands, distributaries, bank classes |
| O9 document and edit system (events with inverses and undo records, dry run, locks, scoped regeneration, the named actions, rebase, migration with diff, retention, the locality oracle, B-EDIT) | 9–13 | neither reference has it |
| O12 renderer beyond the floors (columnar display list, paint programs, tile pyramid and tile worker, label composition, SVG, print bands, `lit` on Canvas2D, the relief tier) | 4–6 | one drawing path; no second backend |
| O11 exports and interop beyond PNG / SVG / GeoJSON (VTT × 2 per layer, glTF / OBJ, CityJSON, CBOR, CSV, the handle API, the host bridge and resolver) | 5–7 | §11 |
| O17 + O18 + O19 (plot model, site plans, packer, heights; the field and the granularity law; greenery rules) | 7–11 | new in both references |
| O10 (intent expansion over ≈ 200 parameters, the forms catalogue, assignments, the placement solver) | 4–6 | forms tuned by eye and the D-5 panel |
| should-have "full" tiers (O13, O14, O16, O12 extras) | 4–6 | §15.2 should rows |
| original content under the clean room (≈ 60–100 roster classes, institutions, households, government and religion rows, naming grammar and corpora, era tables, presets, the symbol set, the procedural textures) | 8–12 | ≈ 40–50 % of CONFIDENCE's 25 pw FTG content line (§3.4's re-pricing), plus presets and symbols |
| `@plat/sim` (relations, postings, schedules, calendar, factions, events, economy and personality) | 8–14 | inside FTG's 125 − 52 = 73 pw non-map scope; the relation schema already in the base |
| the reference app's UI (panels, drawing and snapping tools, four field brushes, the tables editor, the style dialog, the advanced panel over ≈ 200 documented parameters, accessibility, context help, keymap) | 7–10 | no reference line covers it |
| the verification rig (five benches in three CI tiers, stage-isolated goldens with shift and cascade records, the five-engine nightly run, visual regression, the option matrix, control and cost-model sweeps, `baselines.json`, the clean-room scanner, the D-5 tooling) | 7–10 | §13 |
| mechanisms the fix-all pass added that the lines above do not price (booleans and bands on the arrangement, the derivation pool and its merge, the eager allocation and reservations, per-frontage regions and wings, the label placement engine) | 5–7 | the kernel, pipeline and rendering drafts of 2026-09-25 |
| **base subtotal (M-1 – M4b)** | **136–182** | |
| stage 2 (M5) | 14–18 | as before |
| **total** | **150–200** | equal to the milestone sum above |

The round-2 additions — `ink`'s close-up and building band (M2b), `hatched`'s city and district bands (M5), the
ink-family variants (M3b), the records in `plat/goldens/` and the placement digests (M1), the faithfulness campaign
(M3a) — are style sheets over existing paint programs and test tooling already priced in the O12 renderer, the
verification rig and the stage-2 lines, so the ranges stand (PLAUSIBLE). Round 3's additions — METROPOLIS in M1's test
inputs (a `ladder.json` row on the one pipeline), the doubled faithfulness campaign (≈ 6 more CPU-minutes a night), the
determinism lint over S13b's renderer inputs and the scripted document checks of §17.1 (2) — change no line of the
table either (PLAUSIBLE); nor do round 4's — the D-5 panel's FTG and NG pairing rules (§13.6), the list check of §17.1 (2)
and (5), and the load-verification memory test at M2a instead of M1 (PLAUSIBLE).

*Chose* to state the larger, honest total *over* keeping 100–130 by cutting scope *because* the owner asked that nothing
be deferred and that everything be fixed as soon as possible, and the earlier figure left out the content, the app and
the rig that the base contains. The cuts that would shrink it are recorded for the owner's veto, not applied: the
module M4b (8–14 pw); VTT, glTF / OBJ, CityJSON and the CBOR twin (≈ 3–5 pw); all but three forms (≈ 2–3 pw); the
should-have "full" tiers (4–6 pw) — together a base of ≈ 119–154 pw and a total of ≈ 133–172 pw.

The riskiest items, in order: the fusion timing and statistics on real terrain (M0 c, M1); the bent-cut engine on
concave and holed faces (M0 b); the kernel's own booleans and bands (M0 a, with Clipper2-WASM as the pre-decided single
engine, §3.7); the straight skeleton's robustness (M0 a); the content authoring cost (M1, M2b, M4b — CONFIDENCE §3.4's
re-pricing is the warning); the thin CITY budget headroom (§12); the D-5 protocol's dependence on the owner's time
(§13.6's rater rule answers it: an unrated panel never stops the build and never lets a gate be claimed).

**Staged by the owner (hooks concrete; documented, not bugs to re-find):** stage-3 building compositions (§2.6's
`outline` / `compose` split, cost contract and intake measurement); the village product THORP → HAMLET → VILLAGE (PART
III); sewers and floating islands (II.6); the evolution engine beyond the one built growth path (§4.11); calibration
against the historical corpus (§13.9); SettlementForge inputs (§11.4's host-input contract). Nothing else is out of
scope: CityJSON is built (§11.1), the host-input contract is decided (§11.4), sharing needs no hosted service (§11.5),
setting packs have their format (§10.4), there is no WASM kernel (§3.7), and the relief tier is a base program (§8.2).


=== REPLACE §17.1 The clean-room chain (IMP-1; D-29) ===
### 17.1 The clean-room chain (IMP-1; D-29)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-scope-r4); earlier revision fixall/integrate-r3, fixall/draft-scope-r3

1. **Who reads what.** *Research seats* (readers, measurers, the digest writer) may read the findings, `captures/`,
   `research/` and — under the standing ruling — `reference/`. *Implementer seats* (anyone writing code, tables, style
   sheets, content, assets or tests in `plat/`) read only `docs/ARCHITECTURE.md`, the implementer digest in
   `plat/docs/digest/`, the `plat/` repository, published algorithm papers and the public documentation of adopted
   libraries; they never open `research/`, `captures/`, `reference/`, the findings, the critics, `docs/confidence/`,
   `docs/improvements/`, `docs/CONFIDENCE.md`, `docs/IMPROVEMENTS.md` or the red-team files. The citations in this
   document are for traceability; an implementer follows them only into the digest. No code from TownGeneratorOS
   (GPL-3), the FTG Foundry module or any captured bundle is read for implementation, ported or paraphrased.
2. **The implementer digest.** A digest seat writes `plat/docs/digest/` from the research: behaviours, measured numbers
   (each with its `baselines.json` id or finding reference) and the creators' stated ideas — no code excerpts, no
   reference word lists, grammars, palettes, tables or identifiers. A separate checker seat, which reads only the digest,
   runs the content scan below on it and files a report with it; every change to the digest repeats the check. This
   document is held to the same rule (FTG-22). The hashed scan of (5) needs the deny-list that M-1 builds, so until then
   **every seat that writes this document — a fix-all integration seat, an amendment pass's apply and repair lanes, any
   finishing or repair seat — runs, before its change lands,** the scripted document checks of
   `docs/validation/bench/doc_checks.py` (VS2-8, VS2-1), from the project root:
   `python3 docs/validation/bench/doc_checks.py --sections "⟨every section heading key the change touched⟩"` — the
   content checks (iii) and (vi) over the sections the change touched, the others over the whole document:
   (i) *identifiers* — a whole-word, case-sensitive search for the backticked identifiers of
   `research/findings/ftg-payload-visual.md` §7.2 and the one further time-setting message name the round-2 scan
   added — 36 names, which the script reads from the finding or holds research-side, so none is copied into this
   document;
   (ii) *colours* — every six-digit colour value of the document (`#rrggbb` or `0xrrggbb`) looked up, case-insensitive
   and hex-delimited, in `research/` (its text files, JSON included), `captures/**/README*.md`, `captures/**/*.json`
   (VS3-4), `docs/confidence/`, `docs/improvements/`, `docs/CONFIDENCE.md` and `docs/IMPROVEMENTS.md`;
   (iii) *token 3-grams* — the lower-cased word tokens of the changed sections against every 3-gram of
   `research/findings/*.md` and (VS3-4) of the string keys and values of every JSON file under `research/` and
   `captures/` — FTG's content database and every capture body included — taken in document order with purely numeric
   tokens dropped; a hit is a run of three or more consecutive shared 3-grams (five or more tokens in a row that also
   stand together in a finding or a capture) — the size at which a copied list, table row, grammar line or palette
   shows, while a single shared 3-gram ("per 100 m") is ordinary phrasing;
   (iv) *tables* — outside fenced code every line that starts with `|` ends with `|`, and no other line sits between two
   table lines (VS2-1: a table row split over several lines renders as broken rows);
   (v) *pointers* — every `§n` and `§n.m` pointer resolves to a heading of this document;
   (vi) *lists, in any order* (VS3-4) — a 3-gram needs the list's order, so a list pasted alphabetised shares none with
   its source: every JSON file under `research/` and `captures/` except the profiler's recordings (call censuses,
   coverage, idle, trace, draw and path records, run reports, metadata, session and index files — code identifiers and
   events, which (i) and (iii) cover) is read for its lists — a dict's keys, an array of strings, one field's string
   values across three or more records — and a hit is a line of the changed sections holding five or more distinct
   whole words of four or more letters that are members of one such list, reported as those words, sorted.
   Each hit is corrected before the change lands or reviewed: a reviewed hit is entered in
   `docs/validation/doc-checks-allow.tsv` with its check, its exact text and a written reason (a capture-citation file
   name, a measured number, a creator's sentence under 15 words quoted for traceability, ordinary phrasing, generic
   vocabulary in our own selection and order, a pointer into another document). The script exits non-zero while any hit
   is unreviewed, the change does not land until it exits zero, and the seat records its counts in its output file (a
   fix-all pass in its integration log, an amendment pass in `docs/validation/amendments-applied.md` and
   `amendments-repair.md`). From M-1 the hashed scan of (5) — whose list sets do (vi)'s work on salted digests — also runs
   over this document and replaces (i)–(iii) and (vi); (iv) and (v) stay. *Calibration (executed).* On §13–§17 as they
   stood after round 2 (lines 6657–7826 of the pre-round-3 text, md5 `ca2e2066…`, committed as
   `docs/validation/bench/fixall_scope_r4_calib_pre_r3_s13_s17.txt`), 1 196 of 26 236 token 3-grams are shared with the
   findings and they form **47 runs of five or more tokens (45 distinct; §13 24, §14 4, §15 11, §16 6, §17 2)** —
   measured numbers, ordinary phrases and one quoted creator sentence — a hand review of minutes; no run threshold from
   1 to 7 gives the 27 an earlier draft stated (VS3-5; `docs/validation/bench/fixall_verify_scope_r3_cleanroom_checks.out`
   part C, `fixall_scope_r4_cleanroom.out` part A). On the round-3 text the same rule gives 53 runs over §13–§17. (ii)
   finds none of the document's 36 colour values in its sources, the capture JSON included; (iv) found exactly the one
   broken row VS2-1 names. The round-4 extension, run over the whole round-3 text (2 052 JSON files, ≈ 30–45 s): the JSON
   corpus adds 50 distinct run texts to (iii) — ordinary phrasing the creators' posts and comments also hold, six of them
   lengthened forms of runs reviewed before — and (vi) flags 8 lines of generic vocabulary; each was reviewed into the
   allow file's round-4 block, so the extension adds no unreviewed hit to unchanged text. Of 429 lists in FTG's content
   database written as one line of five or ten names, (vi) catches all 429 in either order, while (iii) catches none of
   the alphabetised five-name lines and 210 of those in the database's order (`fixall_scope_r4_cleanroom.out` parts B–D).
   *Chose* scripted proxies with a reviewed allow file *over* a hand-run grep *because* round 2's hand-run proxy checked
   identifiers only and so passed any pasted palette or table while the rule read as satisfied (VS2-8); *chose* to bind
   every seat that writes this document *over* the integration seat alone *because* an amendment pass's lanes write it
   directly (VS2-8; J-S32); *chose* the list check (vi) beside the extended 3-gram check *because* a reordered list
   shares no 3-gram with its source (J-S35).
3. **The repository boundary.** The product is its own repository, `plat/`, at the root of this folder, outside
   `research/`, `captures/` and `reference/`. A PR-tier CI rule fails any import specifier, fixture path, script path or
   build input that resolves outside `plat/` (symbolic links resolved). The product's CI never reads the research trees.
4. **Reference numbers only through `baselines.json`.** Research-side scripts (`research/baselines/`) measure the
   captures and write numbers with provenance (§13.5's `Baseline` rows); the file is committed into
   `plat/packages/testkit/baselines/`, and the parity CLI reads only it. The D-5 panel is assembled research-side from
   the product's PNG exports and the capture images (§13.6).
5. **The content scan.** Research-side, `research/baselines/make_denylist.py` builds the deny-list from the creative
   data the findings and captures record — the references' naming-grammar rule names and terminal words, Markov and
   corpus sample words, palette colour values, FTG's building-type, profession, item and service identifiers and names,
   FTG's Foundry-module message and field names (FTG-22), and texture and image file hashes. The list holds only salted
   SHA-256 digests: of single normalised tokens (lower-cased, diacritics stripped) that are not in the spell-check word list §9.6 already needs,
   of token 3-grams in list order (so a copied table is caught even when every word in it is ordinary), of exact six-digit
   colour values, of file bytes, and — for every list the findings and captures record (a dict's keys, an array of
   strings, one field's values across records) — the set of salted digests of its members' words of four or more
   letters (S4-1), so a list copied in another order is still found. `@plat/testkit`'s clean-room scanner digests the
   same way every token of `@plat/tables`, assets, source string literals and comments and the digest, in the PR tier,
   and flags as a list hit any line, or any column of a table, that holds five or more distinct words of one list's
   set; a hit fails the build unless an allow entry with a written reason is reviewed and added — an authored roster
   that shares ordinary building or trade names with a reference list is such an entry, and the review decides whether
   the selection was copied. At every milestone the checker seat also runs a
   research-side palette audit: a shipped palette with three or more colours within ΔE2000 2 of one reference palette
   fails and is redesigned. Every file in `plat/assets` names the script that generated it or its third-party licence
   (fonts); a file with neither fails the build.
6. **Honest provenance.** Every table cell's provenance names where its number came from: `own`, `ref:⟨reference⟩
   ⟨behaviour⟩` (a measured or stated behaviour of a reference, admissible as a calibration anchor — for example the
   castle's 0.75 compactness gate (MFCG), 40 m bridge spacing and 39 m tower spacing (FTG), NG's lane-width law, Poisson
   k = 50), `owner`, `owner-eye ⟨milestone⟩`, `architecture ⟨date⟩`, `corpus` or `host`. A number that describes a
   behaviour is a fact; a list, grammar, palette or table is creative content and is never reused.
7. **The record.** `plat/docs/CLEAN-ROOM.md` holds the rule, the seat ledger (which seat read which research file, from
   the lane logs), the digest checker's reports and the deny-list's generation record (date, sources, counts — never the
   tokens).
8. **Sources of algorithms.** Published: Shewchuk predicates; snap rounding (Hobby; Guibas–Marimont; Hershberger);
   arrangement booleans by winding number; Bridson Poisson-disc; Felkel–Obdržálek and Aichholzer straight skeletons;
   Chaikin; Visvalingam–Whyatt; Parish–Müller growth; Lloyd relaxation; marching squares; priority-flood;
   Garbrecht–Martz flat resolution; fBm, with ridged multifractal noise and domain warping (Musgrave, in Ebert et al.,
   *Texturing and Modeling*, 3rd ed. 2003; §3.1). With the round-2 and round-3 text (NR-10): the xoshiro128\*\* generator
   (Blackman–Vigna, public domain; §6.1) with Irwin–Hall sums for its normal draws; MurmurHash3's x86 128-bit hash and
   its 32-bit finaliser (Appleby, public domain; H128 in §6.2, `RH32` in §8.1, `H32` in §13.6), checked against the
   SMHasher verification values; Krüger's transverse Mercator series in Karney's formulation, to fourth order in the
   third flattening (Krüger 1912; Karney 2011; §11.1); the van der Corput radical inverse and Morton (Z-order) bit
   interleaving for §8.10's progressive grid ranks; Ulichney's void-and-cluster ranking (1993; §8.10); the monotone-chain
   hull (Andrew) and rotating calipers (Toussaint) for the OBB (§3.1); centripetal Catmull–Rom splines and pinned-vertex
   Laplacian smoothing (§3.1, §4.2, §9.3); Dijkstra's and A\* shortest paths (§3.1, §4.2, §4.3); Brandes' betweenness
   (§4.3); Kruskal's spanning tree (§9.3); Lambert shading (§8.2's hillshade); CIELAB and the CIEDE2000 colour
   difference (Sharma–Wu–Dalal; §8.2). With the round-4 text (VS3-3): D8 steepest-descent flow directions and flow
   accumulation (O'Callaghan and Mark 1984; §2.3, §4.2 S1); the exact Euclidean distance transform in linear time
   (Felzenszwalb and Huttenlocher 2012; §4.5, §12.4); the three-pass box-filter approximation of a Gaussian (Wells
   1986; §4.5, §12.4); the Merkle hash tree (Merkle 1987; §6.2, D-28); context-free grammar expansion in the style of
   Tracery (Compton, Kybartas and Mateas 2015) and character n-gram Markov chains (Shannon 1948) for §10.4's naming
   engine — ideas only, with our own grammar and corpora; power diagrams (Aurenhammer 1987) with area targets
   (Aurenhammer, Hoffmann and Aronov 1998) for the hinterland lots of §4.9; Kahn's topological sort (1962) with the stage
   id as tie-break for the stage order (§4.1, §4.12); SHA-256 (FIPS 180-4) for (5)'s salted digests. For the tests:
   Pearson's χ² test with Holm's step-down procedure (§13.2), Spearman's rank correlation, Moran's I,
   Kolmogorov–Smirnov distances and SSIM (Wang et al.; §13.4, §13.5); the pair-correlation function of a point pattern
   (Stoyan and Stoyan 1994; §4.9, §13.2, §13.5); Shannon's entropy (1948) for the heading and use-mix entropies (§13.5,
   §13.7); the Jaccard index (intersection over union; §6.3, §7.5); and the Hausdorff distance (§3.7, §13.2, II.5). The
   round-4 list was checked against the text by a scripted scan of 119 method names
   (`docs/validation/bench/fixall_scope_r4_methods.out`). An implementer reads each in its published form; the seat ledger of (7)
   records which. The creators' *stated* ideas: twisted bisection, the casing idiom, skeleton labels, the proposal queue,
   dependency ratios, lazy people, integer centimetres — with constants calibrated on our own measurements.
9. **Protocol names (FTG-22).** The host bridge's vocabulary is our own (§11.3): the concurrency token is `logHead`
   (§2.9), carried as `baseLogHead` and `currentLogHead`; time is the view key `time`, set by `view.set`, and the
   simulation module advances it with its own command `sim.advance { hours }` (§10.3, §11.3). Schema-level ideas — an
   event / command split, an optimistic-concurrency token — are admissible as ideas; the FTG module's message, command and
   field names are not reused, are in the deny-list, and occur nowhere in this document (check (i) of (2)).

=== REPLACE Judgment calls ("chose X over Y because Z"; each vetoable) — the preamble paragraph only (set the section banner to name fixall/draft-scope-r4 with the round-4 integration seat) ===
J-1 – J-18 are the synthesis seat's (seven amended by the fix-all pass). The rows added on 2026-09-25 keep their
area prefixes — J-K (kernel), J-DET (determinism), J-P (pipeline), J-R (rendering), J-S (scope) — because the blocks
that made them cite them by those ids; the full reasoning of each sits in the section it names. The J-I rows are the
integration seat's: each settles a disagreement between two area drafts (the record is
`docs/validation/fix-all/r1-integration-log.md` §3). Round 2 of the fix-all pass added J-K9 – J-K21, J-DET-16 – J-DET-28, J-P26 – J-P33,
J-R19 – J-R37 and J-S20 – J-S27, and restated J-K2, J-K5, J-K6, J-K8, J-R7, J-R9, J-R17, J-I2, J-I5, J-P3 and J-S4; its
integration seat added J-I9 – J-I11 and amended J-K14 (the record is `docs/validation/fix-all/r2-integration-log.md`
§4, its conflict table). Round 3 added J-K22 – J-K27, J-DET-29 – J-DET-39, J-P34 – J-P40, J-R38 – J-R43 and J-S28 – J-S32, and restated
J-K6, J-K14, J-K17, J-K18, J-DET-14, J-DET-23, J-R19 and J-S4; its integration seat added J-I12 – J-I14 and amended J-K24,
J-I10 and J-I11 (the record is `docs/validation/fix-all/r3-integration-log.md` §4, its conflict table). Round 4 added J-K28 – J-K33, J-DET-40 – J-DET-43, J-P41 – J-P46, J-R44 – J-R49 and J-S33 – J-S38, and
restated J-K11, J-K16, J-K25, J-K26, J-DET-23, J-DET-35, J-DET-37 – J-DET-39, J-P34, J-P35, J-R17, J-R38, J-R40, J-R42
and J-S32; J-10, J-P10, J-R18, J-I11, J-I13 and J-I14 were amended (the record is
`docs/validation/fix-all/r4-integration-log.md`).

=== REPLACE Judgment calls — row J-S32 ===
| J-S32 | Chose scripted document checks before M-1 — identifiers, colour values, token 3-gram runs of five or more tokens against the findings and the captures' JSON, copied lists in any order, table rows and pointers, in `docs/validation/bench/doc_checks.py`, with a reviewed allow file and a non-zero exit, run by every seat that writes this document (a fix-all integration seat, an amendment pass's apply and repair lanes, any finishing or repair seat) before its change lands — over round 2's hand-run identifier grep and over binding the fix-all integration seat alone, because that grep passed any pasted palette, table or grammar and missed a broken table row, and an amendment pass's lanes write this document directly; the 3-gram runs flag a copied list at a size a reviewer clears in minutes (47 runs, 45 distinct, over §13–§17 as they stood after round 2 — executed, `fixall_verify_scope_r3_cleanroom_checks.out` part C and `fixall_scope_r4_cleanroom.out` part A, on the committed slice `fixall_scope_r4_calib_pre_r3_s13_s17.txt`) (§17.1 (2); VS2-8, VS2-1, VS3-4, VS3-5). |

=== INSERT AFTER Judgment calls — row J-S32 (new rows J-S33 – J-S38) ===
| J-S33 | Chose one FTG pair per FTG capture at the rung's matched size — each capture used once, in capture order, its PLAT side generated at FTG's population and the capture's water setting with a seed hashed from the capture id — and the two-thirds rule counted per rung (2 of 3), over pairing PLAT's ten seeds per rung with three captures, because FTG cannot be seeded and M-1's free allowance gives three captures per size: reusing a capture would count one FTG town several times, and a pairing rule left unstated would let the pairs be chosen after rendering (§13.6 (2), (3), (6); VS3-6). |
| J-S34 | Chose, for M5's panel against NG, five seeded pairs for each of NG's four templates — `area`, `street`, `square` and `ring` — with NG's seed from `H32` reduced into its MINSTD range at NG's `medium` size, and PLAT's side a district opened with the same template whose building count is within ± 20 % of the NG hood's, found by a committed search over 32 PLAT towns from the METROPOLIS target to the cap, with a `sizeMismatch` fallback, over the three templates without `ring`, over matching ground scale and over a PLAT district at one fixed size, because PLAT registers all four templates as fabrics (II.2), NG's view rescales its hood to the frame so only the building count can match the two sides, and NG's size tags give building counts in steps (≈ 71–96, 736–779, ring ≈ 1.6–2.1 × those) that a district of one town size may not reach (§13.6 (2), (3); VS3-6). |
| J-S35 | Chose to add a list check — a line holding five or more members of one list recorded in the captures' JSON, in any order — beside the JSON extension of the 3-gram check, over the 3-gram extension alone, because a 3-gram needs the list's order: on 429 lists of FTG's content database the 3-gram checks catch none of the alphabetised five-name lines (210 of those in the database's order), the list check all 429, at a cost of 8 lines to review over the whole current document once the profiler's recordings — code identifiers and events, which raised 77 such lines — are left to the identifier and 3-gram checks (§17.1 (2) (vi); VS3-4; `fixall_scope_r4_cleanroom.out` parts B–C). |
| J-S36 | Chose to carry the same list check into M-1's hashed deny-list — per reference list, the set of salted digests of its members' words, and a hit when one line or one table column of the product holds five or more of one set, cleared only by a reviewed allow entry — over leaving the scanner with token and ordered 3-gram digests, because an alphabetised copy of a list of ordinary words, such as a building-type or profession list, passes both: its words are in the spell-check list and its order is not the reference's (§17.1 (5); S4-1, found while fixing VS3-4). |
| J-S37 | Chose to measure memory under load verification, and the edit made while it runs, at M2a, to test the naming-input re-draws at M3a, and to give §2.9's rebased-document size test the milestone M2a, over the M1 and M2a timings the requests and §2.9 named, because a milestone can measure only what it or an earlier one builds — the document, the log and load verification arrive at M2a; table edits, setting packs and upgrades, the only inputs a naming re-draw follows, at M3a — while M1 keeps its memory and size tests of generated towns (§16; VS3-1, VD3-5, VD3-2, S4-2). |
| J-S38 | Chose an optional `at` on `EditEngine.rebase` — the log head by default, `h₀` when the saved town is kept after edits made during load verification, anything else rejected — over a second method for keeping the saved town, because the `rebase` event already carries `at` (§7.1), one entry point keeps §7.4's single rebase row and its undo, and the head's state and the decoded snapshot are the only states the engine holds materialised (§14; VD3-7). |

=== REPLACE Judgment calls — row J-I14 (merged: determinism r4 SR4-4's amended row plus this area's VS3-1 timing) ===
| J-I14 | Chose to count a load verification's replay model in the place of the pool's frozen arena copies — no copy is frozen while verification runs, because every edit made meanwhile runs its per-district stages in the generation worker by the pool-size-0 path (J-DET-43) — and to include the reference CITY document's load verification, with a district regeneration and a Re-derive from S3 made during it, in M2a's memory measurement (the milestone that builds the document, the log and load verification; §16) under §12.8's existing fallbacks, over moving the replay to the generation worker when memory is short, because the replay needs its own model wherever it runs, so moving it saves no memory (§2.9 step 3, §12.8; round-3 C-3, round-4 VD3-5, VS3-1). |


## 3. Cross-area requests (changes in sections other areas own; the integrator applies them)

Every quoted "before" text was found exactly once by script — in the round-3 text (md5 `a8c2de84…`), or, where a
sibling round-4 block replaces the passage, in that block (R-1: rendering r4's §12.8; DR-2 and DR-3: determinism r4's §2.9).

### 3.1 To the rendering area (§12)

| # | section | request | item |
|---|---|---|---|
| R-1 | §12.8 as rendering r4's block states it (the paragraph on the tile worker and frozen copies, and *Measurement and fallback*) | (a) Replace "and M1's memory measurement below includes the load verification of the reference 300-edit CITY document with a district regeneration and a Re-derive from S3 made during it;" with "and M2a's memory measurement below — the milestone that builds the document, the log and load verification (§16) — includes the load verification of the reference 300-edit CITY document with a district regeneration and a Re-derive from S3 made during it;", and "the lines are kept and stay PLAUSIBLE until M1 measures them" with "the lines are kept and stay PLAUSIBLE until M1 (generated towns at TOWN and CITY), M2a (that load-verification case at CITY) and M2b (METROPOLIS) measure them". (b) Replace "Measured per rung in B-CITY's browser runs at M1 (TOWN, CITY) and M2b (METROPOLIS)." with "Measured per rung in B-CITY's browser runs at M1 (TOWN, CITY) and M2b (METROPOLIS), and at M2a on the reference 300-edit CITY document under load verification (§16)." and "if CITY exceeds its line at M1" with "if CITY exceeds its line at M1 or M2a". (Rendering r4 folded determinism's RR4-4 verbatim, M1 included; this request moves that one milestone, J-S37. Against the round-3 text, whose sentence ends at "300-edit CITY document;", the same M1 → M2a change applies.) | VS3-1 |
| R-2 | §12.1, *Confirming milestones* | "memory M1 and M2b, §12.8" → "memory M1 and M2b, and the load-verification case at M2a, §12.8". | VS3-1 |
| R-3 | §12 *In plain words*; §12.9 *Declared trade* | (a) Replace "are met up to about 4 500, 17 700 and 59 000 people, and the largest towns, cities and metropolises take up to about 0.2, 0.5 and 1.9 seconds;" with "are met for a typical run up to about 4 500, 17 700 and 59 000 people and for every single run up to about 3 400, 13 600 and 46 000, and the largest towns, cities and metropolises take up to about 0.2, 0.5 and 1.9 seconds in a typical run;". (b) Replace "The model alone meets O3 (d)'s bars at p95 up to ≈ 4 500, 17 700 and 58 800 people and is slower above them" with "The model alone meets O3 (d)'s bars at p95 up to ≈ 4 500, 17 700 and 58 800 people and for the max up to ≈ 3 400, 13 600 and 45 800, and is slower above them". | VS3-2 |

### 3.2 To the determinism area (§2.9)

| # | section | request | item |
|---|---|---|---|
| DR-1 | the determinism r4 draft's VD3-5 wording, RR4-4 and SR4-2 | They put the memory measurement with edits made during load verification at M1; M1 has no editing, log or load verification (§16). This file places it at M2a (§16 M2a exit, J-I14 merged, J-S37); the integrator applies M2a wherever those requests say M1. The determinism draft's own §2.9 step 3 block already times its bars at M2a and needs no change. | VS3-1 |
| DR-2 | §2.9 step 4 (in the determinism r4 block) | After "a `rebase` event with `at = h₀` (reason `keptSnapshot`) is appended at the head" add "(`EditEngine.rebase(doc, 'keptSnapshot', h₀)`, §14)", so the interface VD3-7 fixed is named where it is used. | VD3-7 |
| DR-3 | §2.9 *Size budget*, its *Measurement* (in the determinism r4 block) | "a document-size test per rung in B-CITY-lite at M1, and one on a rebased CITY document after 20 edits (≤ 1.25 × the unrebased document)" → "a document-size test per rung in B-CITY-lite at M1, and at M2a one on a CITY document rebased by keeping the saved town, after 20 edits (≤ 1.25 × the unrebased document; §16)". | S4-2 |

### 3.3 To the pipeline and kernel areas

None. VS3-6 uses II.2's four registered templates and II.4's `setAttr(district.fabric, template)` as they stand; the
folded kernel requests change only this area's §13.1 and §13.2.

### 3.4 For the integrator (not an area)

1. **Scripted document checks.** Run `python3 docs/validation/bench/doc_checks.py --sections "<every section heading key
   round 4 changed>"` on the integrated text. This lane applied all of its blocks to a copy of the round-3 text and ran
   the updated script over its ten changed sections, folded requests included: C1 5, C2 0, C3 85, C4 3, S1 0, S2 2 —
   **0 unreviewed, exit 0**; its whole-document table check finds 0 broken rows. The allow file's round-4 block holds 57
   rows for the hits the VS3-4 extension raises anywhere in the round-3 text and 13 for this lane's own sections. The script now reads the capture
   JSON (≈ 30–45 s per run).
2. **Banners.** The nine whole-subsection blocks carry theirs; set the *Judgment calls* section banner to name
   `fixall/draft-scope-r4` with the round-4 integration seat.
3. **Folded requests — do not apply again:** kernel r4 X-S1 (§13.1), X-S3 (§13.2); determinism r4 SR4-1 (§13.2), SR4-2
   (§16, with the J-S37 corrections), SR4-3 (§14, identical to VD3-7), SR4-5 (the one-page summary); rendering r4 S1,
   S2, S3, S15 (§14), S4, S5 (§13.2), S10 (§15.1), S11 (§16); pipeline r4 X-S1, X-S2, X-S3 (§13.1, §13.2, §16), X-S5
   (§14). **Apply as written:** kernel r4 X-S2, determinism r4 SR4-4, rendering r4 S14 and pipeline r4 X-S4 (their
   judgment-call rows), except J-I14, which is this file's merged row; rendering r4 S6–S9, S12 and S13 (sections this
   lane does not replace). The preamble's Round 4 sentence (§2) already names every area's round-4 rows as their drafts
   list them; add the integration seat's own. J-K28, J-K33, J-DET-40, J-DET-43, J-P41, J-P46, J-R44 and J-R49, which
   the preamble and J-I14 cite, are defined by those row requests — apply them in the same pass (checked: every other
   id this file cites is defined).
4. **Order.** Apply DR-2 and DR-3 after the determinism r4 §2.9 block; R-1 after determinism's RR4-4.

### 3.5 For the program — applied by this lane (VS2-8's second half)

VS2-8's required change also asks the program to name the check in the prompts of the lanes that write the document.
The item's owner is this area and an unapplied prompt change is exactly VS2-8's failure scenario, so this lane made it
(vetoable; removing the one inserted line restores each file): the same line was appended to the shared `GROUND`
prompt of `workflows/04-amendments.js` (read by `amendments/apply` and `amendments/repair`), `workflows/05-fable-review.js`
(its architecture reviewer and finishing seat edit the document) and `workflows/06-fix-all.js` (read by
`fixall/integrate-r<n>`); the line binds only lanes that write the document. `node --check` passes on all three files
before and after (a planted syntax error fails it); no other byte changed. The line:

> DOCUMENT CHECKS (docs/ARCHITECTURE.md §17.1 (2), binding until M-1; VS2-8): every lane that writes docs/ARCHITECTURE.md
> runs, before its change lands, from ${ROOT}: python3 docs/validation/bench/doc_checks.py --sections "<every section
> heading key the lane changed, comma-separated>" — then corrects each hit or adds a reviewed row (check, exact hit text,
> written reason) to docs/validation/doc-checks-allow.tsv, re-runs until it exits 0, and records the counts (C1–C4, S1,
> S2: hits and unreviewed) in its output file.

(In the files it is one line; `${ROOT}` is the workflow's own interpolation.)

## 4. Judgment calls for the architecture's table

The full rows are in §2 (row blocks); in short:

| id | call |
|---|---|
| J-S32 (restated) | scripted pre-M-1 checks run by every seat that writes the document, with the JSON corpus and the list check; the calibration restated as 47 runs (45 distinct) with a committed receipt (VS2-8, VS3-4, VS3-5) |
| J-S33 | one FTG pair per capture, each once, PLAT seeded from the capture id, 2 of 3 per rung (VS3-6) |
| J-S34 | NG at M5: five seeded pairs for each of four templates, PLAT's district matched ± 20 % by a committed 32-town search with a `sizeMismatch` fallback (VS3-6) |
| J-S35 | the list check (vi) beside the 3-gram extension, profiler recordings excluded (VS3-4) |
| J-S36 | list sets in M-1's hashed deny-list (S4-1) |
| J-S37 | load-verification memory at M2a, naming-input re-draws at M3a, rebased-document size at M2a — over the requested M1 / M2a (VS3-1, VD3-5, VD3-2, S4-2) |
| J-S38 | an optional `at` on `EditEngine.rebase`, head or h₀ only (VD3-7) |
| J-I14 (merged) | determinism r4's amended row with M2a instead of M1 (VS3-1, VD3-5) |

## 5. Deferral scan, CONFIRMED versus PLAUSIBLE, and what a Fable reviewer should re-check first

**Deferral scan.** Every block was scanned for TBD, TBA, "to be decided / determined", later, defer, postpone, future,
"not yet", "at M0", placeholder, pending, eventually, "when needed", "if needed", revisit and "left for": every hit is
unchanged round-3 text of an owner-staged subject, a milestone-bound rule ("offered again at every later milestone"), a
banner, or ordinary sequence ("later attribute edits"); no new sentence of this round defers anything. Each new bar
names its milestone and pre-decided fallback: the NG pairing search (M5; `sizeMismatch`), the load-verification memory
case (M2a; §12.8's fallbacks), the rebased-document size (M2a; §2.9's block-group fallback). No item is
STAGED-BY-OWNER; VS3-6's NG panel is stage 2's gate, whose protocol is fixed now in full.

**CONFIRMED (executed in this lane):**
* The updated `docs/validation/bench/doc_checks.py` over the whole round-3 text: C1 5, C2 0, C3 557, C4 8, S1 0, S2 2,
  ≈ 42 s; after the 57 pre-reviewed rows its unreviewed set is a strict subset of the round-3 script's (102 against
  105 — the three dropped are lengthened forms now reviewed), so the extension adds no unreviewed hit to unchanged text.
* All blocks applied to a copy of the round-3 text, folded requests included: the checks over the ten changed sections
  exit 0 after 13 reviewed rows; 0 table rows whose cell count differs from their header anywhere in the document; every cited J- and D-id
  defined except the eight that the other areas' judgment-row requests add; every block present verbatim in this file.
* `docs/validation/bench/fixall_scope_r4_cleanroom.py` → `.out`: part A reproduces 26 236 / 1 196 / **47 runs (45
  distinct), §13 24, §14 4, §15 11, §16 6, §17 2** on the committed slice, runs by threshold 1–7 = 933 / 196 / 47 / 13 /
  5 / 1 / 1 (no 27), and 53 (51 distinct) on today's §13–§17; part B 2 052 JSON files, 50 new C3 run texts, 8 C4 lines;
  part C the paste test over 429 lists of `presets.json` (C4 429 / 429 in every configuration; C3 0 / 429 alphabetised
  five-name, 210 / 429 in database order); part D 0 of 36 colours in the capture JSON. Earlier probes (scratchpad) gave
  77 C4 lines with the profiler recordings included — the measurement behind their exclusion.
* `docs/validation/bench/fixall_scope_r4_h32.py` → `.out`: SMHasher's 0xB3ECE62A reproduced through the committed H32;
  the NG and PLAT check vectors of §13.6 (2).
* Arithmetic: max knees 1.25 × (20 + 0.060 B) ≤ 100 → B ≤ 1 000; 1.25 × (40 + 0.050 B) ≤ 300 → 4 000;
  1.25 × (100 + 0.052 B) ≤ 1 000 → 13 461; × 3.4 = 3 400 / 13 600 / 45 770 people; max at the band tops 245.5 ms,
  601 ms, 2 400 ms.
* VS3-3's scan: `docs/validation/bench/fixall_scope_r4_methods.py` → `.out` counts 119 published-method names in the
  document; each name with hits was read in context, and the seven additions are the methods used and unlisted (the
  rest are adopted libraries' own algorithms, file formats, rejected alternatives or ordinary words).
* The three workflow files: `node --check` passes before and after; the diff is the one inserted line each.

**PLAUSIBLE (reasoning, not executed — no engine exists):** that the NG search finds a district within ± 20 % for most
pairs (district sizes were estimated from §4.5's count law; the `ring` hoods, ≈ 1 200–1 600 buildings, are the likely
`sizeMismatch` cases, and the fallback reports them); that C4's threshold keeps later review small (8 lines on today's
text); that FTG's water options let M-1 take exact `none` and `coast+river` captures (the findings record a coast type
and a river switch; FTG's live form was not reopened); the list-set review burden on the product's own roster tables
at M-1.

**Reading record.** Read in full: `r3-verify-scope.md`; the scope sections of `docs/ARCHITECTURE.md` (the title and
summary, §0, §1, §13–§17, the delegated decisions, the judgment calls, the staged list, Appendix A); §12 and §12.1–§12.3,
§12.8, §12.9; `doc_checks.py`, the allow file and the round-3 verifier's receipts; `r4-determinism.md` §1, §3, §4 and
its §2.9 step 3; `r4-kernel.md` Parts 1 and 3; `workflows/04-amendments.js` and the GROUND and integrate prompts of
`06-fix-all.js`; `ARCHITECTURE-VALIDATION.md` §0.M and the §R3 rows of this area. Read where a cross-reference led: §2.9
steps 3–4 and its size budget, §7.1's `rebase` event, §4.5's district count law, II.1, II.2, II.4, II.5. The rest of
PART I (§2–§11 bodies, ≈ 7 000 lines) was not read line by line — as the round-3 verifier did, this area's items did
not depend on it; its own areas' seats cover it. No `r3-validate.md` exists. Nothing outside the project; no reference
content copied (every script prints counts; the paste test writes reference names only to a scratch file outside the
project and never into the design).

**What a Fable reviewer should re-check first.**
1. The list check and the list sets (J-S35, J-S36) and this lane's review of the one real overlap they surfaced: §2.7's
   `Pin` kinds share five generic nouns with a seven-item FTG list of square furniture — reviewed as parity feature
   kinds in our own sixteen-kind list, the closest clean-room call of this round.
2. J-S34's NG pairing — four templates (the verifier named three), a METROPOLIS-size search from the target to the cap,
   ± 20 % with a `sizeMismatch` fallback.
3. That an area lane edited three program workflow files to complete VS2-8 (§3.5), rather than leaving the prompt text
   as a request.
