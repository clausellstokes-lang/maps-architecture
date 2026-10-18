# Ruling — Dwellings (build 17195045): every challenged cell, the aggregates, and what carries into docs/CONFIDENCE.md

Lane `confidence/dwellings-rule`, judge seat (Fable 5.1), 2026-09-26. Reference: watabou's Dwellings (House Plan
Generator), itch build 17195045 (`Dwellings.js` 1 368 261 B, Last-Modified 2026-06-24). Inputs, every line read:
`docs/CONFIDENCE.md` (801 lines — the scale, §0.3 rulings R-A … R-H, §1–§8 and how each reference's section is laid
out), `docs/confidence/dwellings.md` (320 lines, 39 rows), `docs/confidence/dwellings-challenge-over.md` (151 lines,
34 cells on 22 rows down plus the A4 finding handed to the judge), `docs/confidence/dwellings-challenge-under.md`
(136 lines, 21 cells on 14 rows up), `research/findings/_critic-dwellings.md` (310 lines, 17 binding rulings, 25
re-derivations, 62 quotation checks). Outputs: this file (every challenged cell), `docs/CONFIDENCE.md` (title, §0,
§1 row, pointers, and the appended §9), `docs/PROGRESS.md` J46.

STATUS: COMPLETE (2026-09-26). Every confidence number below is a judgment (**PLAUSIBLE**); every fact a ruling rests
on is **CONFIRMED** only where a lane executed it on disk and this seat re-executed or re-read it (§0.2).

**Headline.** Functional **0.80** (0.75–0.84), visual **0.82** (0.77–0.86), algorithm identity **0.58** (0.50–0.64),
seed-exact **0.02** (0.01–0.03) with the RNG stream alone **0.70** (stream-only, clock-free histories), effort
**≈ 23** expert person-weeks (19–29) for Dwellings-alone parity. Against the assessor's 0.82 / 0.83 / 0.56 / 0.01 /
20: functional down for the over-lens's sample and evidence-reading corrections and the cross-stage discount, algorithm
identity up because four "muscles" the assessment called unrecoverable were measured from the exports and the RNG
stream is now CONFIRMED, effort up under R-E. Of 45 challenged cells: 29 accepted as a lens moved them (17 in the
over-lens's direction, 12 in the under-lens's), 8 ruled partial, 8 stand.

## §0 Reading record and checks executed in this seat

### §0.1 Read in full

| file | lines | role |
|---|---|---|
| `docs/CONFIDENCE.md` | 801 | the scale, R-A … R-H, the layout of §1–§8 and of each reference's §3.x / §4.x |
| `docs/confidence/dwellings.md` | 320 | assessment, 39 rows (§0–§5) |
| `docs/confidence/dwellings-challenge-over.md` | 151 | over lens: 34 cells on 22 rows down, aggregates, effort; §3.1 A4 handed up |
| `docs/confidence/dwellings-challenge-under.md` | 136 | under lens: 21 cells on 14 rows up, aggregates; §3 new measured facts |
| `research/findings/_critic-dwellings.md` | 310 | the critic's rulings B1–B17 and re-derivations R1–R25 (both lenses and the assessor cite them) |
| `docs/PROGRESS.md` judgment table (header, J40–J45) | — | for the J46 row |

Read on disk as data (not sampled): every `.out.txt` in `captures/dwellings/_challenge-over/` (8 files) and
`captures/dwellings/_challenge-under/` (7 files), `captures/dwellings/_synthesis/programme-vs-rooms.out.txt`,
`captures/dwellings/_critic/permalink-decode.out.txt` and `.entrances.txt`, `profiler/analyze.mjs` l. 120–135, the
twelve `captures/dwellings/2026-09-26T23-1{1,2,3}-*/coverage/gen-0.calls.json` (by script, `RoofStack` rows only) and
the twelve `captures/dwellings/exports-2026-09-26/s2*.json` (by script, `floors[].level` only).

Not done: no capture recorded, no export triggered, no bundle opened (`Dwellings.js` untouched by every Dwellings
seat), no SVG / PNG / screenshot viewed, no raw `post.md` re-read (the critic's 62 quotation checks — 61 SUPPORTED, 1
WORDING — stand), nothing outside `/Users/cstokes/Desktop/Maps` consulted.

### §0.2 Checks executed (CONFIRMED)

Where the two lenses pulled one cell in opposite directions I went to the cited evidence rather than splitting the
difference (the §0.2 method of `docs/CONFIDENCE.md`):

1. **The orbit hits, by independent modular exponentiation** (a one-line Python check written in this seat, not the
   lanes' scripts; M = 2³¹ − 1, a = 48 271): 12345 · a³⁷⁹ mod M = 1 189 382 180; 1 189 382 180 · a¹⁴⁸² = 1 291 276 000
   and · a¹⁴⁸³ = 470 941 825 (the successor when the second house is loaded directly); 12345 · a⁸⁰ = 1 817 660 423
   (with a URL plan); 12345 · a⁴⁸⁵ = 403 462 773 (after a Ctrl+Enter); 550 578 192 · a¹²³¹ = 190 180 111 (direct
   load) and · a¹²³² = 1 839 030 803 (by Enter). Every recorded successor the two lenses cite reproduces, including
   the one-draw load / Enter offset.
2. **Ten lens scripts re-executed from the project root** and diffed against the saved outputs:
   `exports_setback.py`, `exports_c2.py`, `exports_probe.py`, `exports_probe2.py`, `seed_clock.py`,
   `seed_offorbit.py` (under lens) and `stair-shafts.py`, `distinct-footprints.py` (over lens) are **byte-identical**;
   `final-rooms.py` and `lehmer-orbit.py` are identical in every computed line (the saved files carry 15 and 5 trailing
   lines — a walker-vs-JSON sanity block and the modular-exponentiation lines — appended after the scripts' own
   output; their numbers are the ones checked in #1 and #6). Re-run outputs in the scratchpad `rerun/` folder.
3. **`profiler/analyze.mjs` l. 130** reads `.sort((a, b) => b.total - a.total)`: the call trees the assessment and the
   critic read print siblings by inclusive time, not by execution order (the over lens's A2 argument).
4. **The `RoofStack` identity, re-counted independently** on the twelve export-tied `coverage/gen-0.calls.json`:
   `com.watabou.dwellings.view._RoofStack.Layer.new` = `Layer.display` = the storeys above ground of the same
   twelve houses read from their own exports' `floors[].level` — 2, 3, 1, 2, 1, 3, 1, 2, 3, 6, 3, 2 — in 12/12;
   `RoofStack.new` = `RoofStack.update` = 1 in 12/12.
5. **The stale receipt.** `captures/dwellings/_critic/permalink-decode.out.txt` l. 76, 123, 128, 133 hold the decoder's
   first-run verdicts ("edge outside the plan" for `5B6B` and `2120`, "COUNTER-clockwise" for `1110` and `1202`);
   `permalink-decode.entrances.txt` holds the corrected run (six clockwise boundary edges with the filled cell on
   the right, two interior edges), which is what critic R2 and the assessment describe. The over lens's §3.2 e is
   right; the encoding stands; the assessment should cite the `.entrances.txt`.
6. **Read on disk:** `seed_dlog.out.txt` (61 transitions, 56 on the 48 271 orbit at k < 10⁵, one more at k = 154 620,
   four flagged); `seed_clock.out.txt` (contingency: no clock reseed recorded → on the orbit 18, reseed recorded →
   off 4, mixed 0); `final-rooms.out.txt` (created vs surviving pieces per family; surviving `Door` objects vs
   rooms − storeys 32 equal / 36 fewer / 24 more over 92 walked houses; walker = JSON on 12/12); the C1, B3, B6, C4,
   C3, C6 blocks of `exports_probe.out.txt` and the null models of `exports_probe2.out.txt`;
   `programme-vs-rooms.out.txt` (157 items vs 133 rooms; 7/12 houses short; 5/12 short upstairs);
   `stair-shafts.out.txt` (the two stacked shafts with a basement at (4, 3) on levels −1 / 0 / 1 and (4, 0) on
   −1 / 0 / 1 / 2, each holding the basement → ground flight).

## §1 Rulings on every challenged cell

Format as in `docs/CONFIDENCE.md` §3: `assessor` = the assessment's cell; `over →` / `under →` = what each lens moved
it to ("held" = that lens tried and could not refute it; "—" = not touched); **ruling** = accept / partial / stands
with the value carried into §3 and the reason. R-A … R-H apply. Cells no lens touched keep the assessor's value.

Assessment F 0.82 / V 0.83 / A 0.56 / S 0.01 / 20 pw; over lens 0.77 / 0.81 / 0.53 / 0.01 / 26 pw; under lens
0.84 / 0.83 / 0.60 / 0.02 / held.

| cell | assessor | over → | under → | ruling | reason |
|---|---|---|---|---|---|
| A1 F (parameter surface) | 0.95 | 0.90 | held | **accept 0.90** | "every control was pressed" is contradicted by the profile's own not-exercised list (Rooms › Gothic / Tavern, Walls beyond keys 6–0, the Style dialog's Misc. tab, the exports) and by the critic's (Roofs › Simple / Hidden, Shade / Fade / Shrink); three of seven grid states drawn, the Numbers label mode never; `Tags.random`'s weights unmeasured |
| A2 A (pipeline order) | 0.80 | 0.75 | held | **accept 0.75** | §0.2 #3: the analyzer sorts siblings by inclusive time, so "the exact stage order" is evidenced only where nesting (`Room.fill` ⊂ `assignRooms`), the identical candidate streams (shape first) or the Shift+Enter / Ctrl+Enter re-entry points give it; where `Namer.get`, `Dimensions.random`, `assignDoors` and `spawnWindows` fall relative to `Room.fill` is not evidenced. F 0.90 stands (once-per-house counts; no whole-house retry in 96 houses) |
| A3 A (encodings) | 0.90 | held | 0.95 | **accept 0.95** | bitmask, edge code, grid convention (0 violations in 482 checks) and JSON shape are measured exactly; the residual is the trapdoor's JSON form (≈ 1 house in 90); the FTG A3 standard (0.95); §0.2 #5 confirms the encoding stands on the corrected receipt |
| A4 A (determinism, seeding, PRNG, Enter chain) | 0.35 | ≈ 0.55 (§3.1, executed, handed to the judge) | 0.75 | **partial 0.70** (0.60–0.75) | the assessment's own named experiment, executed by both lenses and re-checked here (§0.2 #1): the engine is the Lehmer 48 271 stream modulo 2³¹ − 1 and the next seed is the raw state after k draws (56 of 61 console and probe transitions at k < 10⁵, 60 of 65 with the seed-probe sessions; 0 of 39 for 16 807 and 69 621); the load-vs-Enter offset is exactly one draw; key histories are draw counts (+1 987 for view keys, +4 837 for `e r e`, +106 for a Ctrl+Enter); the misses are explained by the recorded `HouseType.assignSet → Random.reset → new Date()` stacks (off the orbit 4/4 when recorded, on 18/18 when not; Fisher p ≈ 1.4 × 10⁻⁴). Below MFCG's and NG's 0.85 because no ancestor or helper-layer fingerprint pins `Random.float`'s mapping or the identities of the four reset points, the clock-reseed mechanism and the mid-generation reset (k below the `Random.float` count in 2 of 3 coverage generations) are readings of stacks and counts (PLAUSIBLE), and the row's "Enter chain" item is now known to be clock-dependent in ≈ 1 generation in 5; above the over lens's 0.55 because its three unexplained pairs are the under lens's clock reseeds |
| A4 S | 0.02 | ≈ 0.6 stream-only | 0.75 stream-only | **0.70, stream-only, annotated** (0.60–0.75) | R-B's one exception now applies to Dwellings as it does to MFCG A2 (0.85) and NG A2 (0.80): the recurrence and the successor rule are CONFIRMED by three seats, so a clean-room team reproduces the successor sequence of any clock-free history; below NG because ≈ 1 generation in 5 (4 of 22 Date-recorded transitions) reseeds its successor from the clock, which the reference itself cannot reproduce. No other S cell moves: the draw sites stay inlined (view keys advance the stream by 1 987 draws with 0 recorded `Random.float` calls) |
| B1 F (ground-plan drafting) | 0.85 | 0.80 | held | **accept 0.80** | "the shape statistics of 104 houses" counts the 12 exports twice, and the 92 walked houses stand on 29 distinct ground footprints (8 small / 13 medium / 8 large; five medium footprints counted 13 times each — §0.2 #2); the sampler's rectangle count and side laws are unobserved and the acceptance test is one seed's story (critic thin spot 8) |
| B3 F (upper-storey setback) | 0.80 | held | 0.90 | **partial 0.85** (0.80–0.90) | the assessment's own diff test, executed on the exports (§0.2 #2): 17/17 upper storeys are unions of whole rooms of the storey below, and the 13 that shrink drop **exactly one whole room** in one piece (Kitchen ×2, Hall ×2, Studio ×2, Bathroom ×2, Room ×2, Living room, Bedroom, Laboratory); repeated one-room drops generate the measured 0.72–0.73 mean ratios and the seven-storey house's 82 → 58 → 39 → 36 → 33 %. Not 0.90: which room is dropped and when none is (4/17) place the visible setback, and the sample is 13 setbacks in 12 houses (the 318 walked views were not re-measured) |
| B3 A | 0.35 | held | 0.60 | **partial 0.55** (0.50–0.60) | the construction "the storey below minus one whole room" is SHOWN and refutes both alternatives the assessment posed (drop a rectangle of the union; trim a reflex corner); but the "separated by a single boundary-to-boundary wall" clause is near-automatic for an edge room, the selection rule is open, and the creator states only "more likely to be smaller" — weaker than NG B3's stated-and-forward-tested construction (0.60) |
| B6 F (entrance choice) | 0.80 | 0.75 | 0.85 | **accept (under) 0.85** (0.78–0.88) | the over lens's premise ("the side was never tabulated") fell when the under lens tabulated it on the exports (§0.2 #2): the exit sits on a side with the most exterior edges in 11/12 houses, on a long side of the bounding box in 9 of 10 non-square footprints (5.7 expected for a uniformly random exterior edge), on the single longest run in 7/12, never on a one-edge run; n = 12 — the 92 walked ground floors remain the fuller test. A held at 0.40: the measured preference contradicts the posts lane's reading of the 1.3.0 rule (§4 h), so the stated rule does not pin the build's |
| C1 F (recursive notch partition) | 0.75 | 0.70 | held | **stands 0.75** (0.70–0.80) | the over lens is right that the row's targets ("a room ≈ 5 cells, corridors a third of rooms but a seventh of area") average sixteen tag families whose shape statistics differ on the same five seeds (rooms without a 2 × 2 block 17–73 %, rectangles 49–73 % — §0.2 #2), so parity must be calibrated per partition mode; but only four tags change the cutter (`organic`, `mechanical`, `hallways`, `square`) — the default cutter stands behind ≈ 50 distinct walked houses plus seven exports, not "about ten" — and the merge point belongs to C2. Carried as an annotation, not a move |
| C1 A | 0.40 | 0.35 | 0.45 | **accept (under) 0.45** (0.35–0.50) | the assessment pre-committed "up to ≈ 0.50 if a notch-cut model fitted the storey polygons"; the fit run on the 38 exported storeys (§0.2 #2) passes for the **bent-bisection class** — 30/33 multi-room storeys decompose by recursive boundary-to-boundary cuts with ≤ 1 bend against 42.5 % of 1 320 random growths of the same cells and room counts (straight-only 10/33 vs 13.6 %) — and fails for the strict notch rule (20/33), so half the pre-committed raise; the JSON growth-order warning loses force (no fixed-order flood fill reproduces the cell lists, best 91/133). Not 0.50: the default cutter is the former `spacious` mode, described by its effect only, and the observed rooms are post-merge (over lens) |
| C2 F (corridor merge, nooks, passages) | 0.70 | 0.65 | 0.75 | **stands 0.70** (0.65–0.75) | they cancel on checked facts: the merge is larger than the row states — with `hallways` 39 of 87 created pieces vanish before the drawing while surviving rooms go 44 → 48, and survivors without a 2 × 2 block go 39 → 73 % (over; §0.2 #2) — which makes the texture target harder; and its two stated post-conditions hold as invariants on the exports — every one-cell room has exactly one door (15/15: 4 bathrooms, 9 shafts, 2 passages), no two circulation rooms share a wall (0 pairs among 16) (under; §0.2 #2) — which makes the target testable; the entanglement with C1 / C3 that set 0.70 is unchanged |
| C2 A | 0.40 | 0.30 | 0.50 | **stands 0.40** (0.30–0.50) | the over lens removes one "Known" item — the paired `hallways` figures the row cites (rooms +6/+13/+1/+12/+4) are `Room.new`, created pieces, not rooms joined by openings (§4 a) — and shows the merge is a principal shaping stage with an unknown predicate; the under lens adds two measured post-conditions that any union-of-adjacent-corridor-pieces merge satisfies; net zero on a routine known by name, purpose, scale and post-conditions but not by rule |
| C3 F (room connection and doors) | 0.80 | 0.75 | 0.85 | **stands 0.80** (0.75–0.85) | the under lens pins two output laws (§0.2 #2): a door on a shared wall run of ≥ 3 edges sits at an end of the run (17/17; P ≈ 6 × 10⁻⁴ under a uniform position) and the storey's door tree is a maximum-shared-wall spanning tree in 27/33 (22.5 expected; P ≈ 0.018) — real gains for statistical parity; the over lens is right that loops are a stated feature ("added specifically … loops for example", 2026-04-10; "quite rarely" with a permalink) absent from twelve houses of which 13 of 38 storeys cannot hold one, so 0/12 bounds the per-house rate only below ≈ 0.25 — a feature the tree model omits; they cancel |
| C3 A | 0.45 | 0.35 | 0.55 | **partial 0.50** (0.40–0.55) | the two laws are identity knowledge (the price's sign — longer shared walls cheaper — and the position rule); but the tree preference is modest evidence (27 against 22.5 expected, 14 storeys admitting one tree only), the surviving `Door` objects equal rooms − storeys in only 32 of 92 walked houses (36 fewer, 24 more — §0.2 #6), so "a priced spanning connection" describes the output and not a closed object model (R16 is wider than twelve houses), and the loop rule and the `NULL` shaft rule stay open |
| C4 F (stairs between storeys) | 0.85 | held | 0.90 | **accept 0.90** | the placement law is measured on all 38 exported stair ends (§0.2 #2): every stair cell on the storey's outer wall (base rate of cells with an exterior side 74 %), 30/38 in an outer-corner cell (base rate 28 %), the landing side against a wall 38/38 (exterior 35), the entry side open into the stair's room or its shaft 38/38 — a per-pair search over outer-corner cells with an open entry side reproduces where stairs land, not only that they exist |
| C4 A | 0.55 | held | 0.65 | **accept 0.65** (0.60–0.70) | the same law is the operational form of the creator's "accessible and don't obstruct movement across a floor" (1.1.0); the tie-break among corners, U vs L and the pair order stay open — the NG B5 standard (mechanism measured, decisions open); the over lens's attack on "call order" is answered by the Shift+Enter / Ctrl+Enter dependency, not by the trees |
| C5 F (spiral stair and stairwell) | 0.80 | 0.75 | held | **stands 0.80** (0.75–0.82) | the over lens's finding is real and carried (§4 c): both exported stairwell stacks in houses with a basement run through the basement, each with the basement → ground flight inside the shaft (§0.2 #6), so the 1.4.0 "except the basement" is not this build's rule — but that simplifies the device rather than obscuring it; the roll rate 9/21 (0.22–0.66) was already the row's must-invent |
| C5 A | 0.50 | 0.45 | held | **accept 0.45** | the row's "Known: both devices' rules" credited a stated rule the build contradicts; how the shafts arise (a cell reserved in every storey's partition, or carved out behind a `NULL` edge) is unobserved and the tagged family was never exported |
| C6 F (windows) | 0.85 | 0.80 | 0.90 | **accept (under) 0.90** | the assessment's named regression, executed (§0.2 #2): bedrooms carry 3.00 ± 0.78 windows whatever their 4–12 exterior edges (r = 0.37) and bathrooms 1.42 ± 0.49 (r = 0.44) — fixed counts; Hall (r = 0.95), Stairhall (0.91), Kitchen (0.74), generic Room (0.70) and Living room (0.67) scale with exterior edges — five ratio roles against the registry's `winRatio` × 5; Attic / Chapel / Laboratory / Trophy room fully glazed, Storage / Armoury / Secret passage none; the over lens's "147 unexplained gaps" are per-room caps, not a spacing rule (219 of 358 consecutive exterior-edge pairs on one run are both glazed) |
| C6 A | 0.55 | 0.50 | 0.65 | **accept (under) 0.65** (0.55–0.70) | the stated 1.1.0 model is now measured role by role and the fixed / ratio split matches the registry's counts — a fingerprint; open: the identities and values of the other four `winFixed` types and the lower-floor reduction for tall houses (1.3.1); the over lens's thin-n point holds for 10 of 21 roles but not for the roles that carry the model (bedroom 13, bathroom 12, Room 20, Living room 12) |
| D3 F (role assignment) | 0.75 | 0.70 | 0.80 | **accept (under) 0.80** (0.72–0.85) | the synthesis lane's comparison, read on disk (§0.2 #6): 157 programme items against 133 rooms, 7/12 houses with fewer rooms than items and 5/12 with fewer upper rooms than the bedrooms demanded, so the bathroom 8/12 and bedroom 7/12 rates follow from room supply plus the storey rules that a priority-ordered greedy assignment with validators reproduces; only gallery (0/12, listed 12/12), study (0) and attic (1/9) still need the unknown score; the over lens's n = 12 point was already the assessment's n |
| D3 A | 0.45 | 0.40 | held | **stands 0.45** (0.40–0.50) | the over lens's items were already priced ("multiple attempts" inside `types2rooms` / `validate` [INFERRED]; the score a name); its one new fact — the list-1 specials are re-drawn on every assignment run (chapel → workshop, laboratory → workshop, lookout on one house across a load, two Shift+Enter and two Ctrl+Enter, `probe-keys.log` #1–#5) — is a stage-boundary correction (D2 and D3 are one stage, §4 b), not an identity loss |
| D5 F / A (Gothic / Tavern room sets) | 0.60 / 0.40 | 0.55 / 0.30 | held | **accept both** | R-D: nobody generated a Gothic or Tavern house in this build; `LoadedHouseType.new` × 2 and `rooms.Loadable` (never run in a generation) are names; the JSON5 format is unread by ruling; the images are a 1.3.7 export and Tiny Pubs' tavern names |
| D6 F (labels, renaming, numbering) | 0.90 | 0.85 | held | **accept 0.85** | the Numbers mode was never drawn in this build (its traversal order is read from one 2023 image) and click-to-rename was never exercised by a probe |
| D7 F (Taverns, separate generator) | 0.60 | 0.50 | held | **accept 0.50** | no capture, export or profile of Taverns exists in the corpus; "statistically similar structure" cannot exceed a coin flip on five images (outside the effort total, inside the unweighted means) |
| E1 F (plan renderer) | 0.90 | 0.85 | held | **accept 0.85** | the row's option surface includes seven grid modes (three states drawn; Planks and Tiles are pattern names — R-D), the Numbers label mode (never drawn) and door modes Simple / Open (one screenshot) |
| E1 V | 0.90 | held | 0.95 | **accept 0.95** | the SVG is the draw record and the assessment's own words are "known to the hundredth of a cell … must invent nothing beyond our own style"; the value this file gives exhaustively measured surfaces (NG E2 V, D2 V) |
| E1 A | 0.80 | held | 0.85 | **accept 0.85** | layer order identical on 38/38 storeys and in every capture, joins / caps split exactly by layer in twelve renders, piece-per-edge walls, measured glyph constructions; the label anchor and one always-empty group are the residual — the MFCG / NG E2 A standard (0.85) |
| E2 F / V (colour schemes and wall styles) | 0.90 / 0.85 | 0.85 / 0.80 | held | **accept both** | schemes 2–5 are one screenshot each, wall styles 7–0 are piece counts whose paint logs are on disk and unread, "Modern" is never described, the Misc. tab was never exercised — every measured render is the default scheme with Simple walls (the VG R6 / R8 standard) |
| E3 A (room lights) | 0.75 | 0.65 | held | **partial 0.70** (0.65–0.75) | the skeleton-summit placement rests on the routine chain (`getSkele → getSummit → snap`, one `Math.random` per lit room) — a strong name chain, not a geometric test, although the SVGs hold both the light centres and the room outlines; the creator says "the centre of its most spacious part", never skeleton; under R-C the reference's own part (radius / intensity law — "overcomplicated calculations" —, `onTheWall`, the statue / altar override, the jitter's size) is open |
| E5 A (abstract furniture) | 0.40 | 0.30 | held | **partial 0.35** (0.30–0.40) | `Clutter.spawn → group → push / getForce` is [NAMED-ONLY] (critic R14; R-D) and the per-type table unknown; but the stated tendencies (wall-hugging, per-room density / size / wall affinity, the no-blocking fix) and the measured densities and shapes are more than a bare name |
| E6 F (roofs) | 0.85 | 0.80 | held | **stands 0.85** (0.80–0.88) | Simple / Hidden and the three effects were never toggled, but Simple ("roofs as outlines", the pre-1.4.1 look in the images) and Hidden are described, Shade and Fade are the measured default (four orientation shades; the 10 % veils), and only Shrink is a name (R-D, annotated); `spawnChimneys = 1` is a call count, not a chimney count (§4 i) |
| E6 A | 0.75 | 0.70 | 0.80 | **stands 0.75** (0.70–0.80) | the under lens's identity (`_RoofStack.Layer.new` = `display` = storeys above ground, 12/12 — re-counted here, §0.2 #4) ties roof layers to storeys, not the face construction; the over lens is right that faces = Σ outline corners (92/92 with the spiral cone) is a necessary condition any one-face-per-edge hip construction meets — a medial-axis roof gives the same count — and that the creator names no skeleton for Dwellings (the linked implementation is MFCG's); `geom.Skeleton.new` exceeds the light calls by 1–5 per house, not by the storey count, so no roof–skeleton call identity exists. The author's own straight-skeleton implementation and habit keep it at 0.75, between MFCG C2 (0.70, stated by the creator) and FTG D3 (0.80, named by the creator) |
| E7 F / V / A (elevation) | 0.65 / 0.70 / 0.40 | 0.55 / 0.65 / 0.30 | held | **partial F 0.60** (0.55–0.65); **accept V 0.65**; **accept A 0.30** | a second generator (Tiny Pubs' facade grammar) known from parameter-class names drawn every generation (`Dimensions`, `WindowData`, `DoorData`, `DormerData`, `ChimneyData`, `FachwerkData`, `GableWindow`, `HipRoofData`, `LampData`, `SignData`, `SpireData`), one screenshot and ≈ 13 creator images; the E view was never draw-recorded, side / rear / fortified / dark never observed; F keeps 0.60 because the feature list and the four-side / fortified / dark controls are stated and the class names enumerate the parts |
| F2 A (restrictive rerolls) | 0.75 | held | 0.80 | **accept 0.80** | the row's one residual ("how the PRNG is advanced for a re-roll is A4's unknown") is measured: a re-roll stays on the loaded house's stream (Ctrl+Enter first → the next Enter seed at k = 485 against 379 without it, §0.2 #1), each re-roll runs `Random.reset` twice (`_probes/keys/K/steps/002–006`, under lens), and a Shift+Enter can meet the clock reseed (its successor off the orbit after an `assignSet` Date stack) |
| F3 F (renaming and view toggles) | 0.95 | 0.90 | held | **accept 0.90** | click-to-rename, Shift+click a room's light and Ctrl+click highlight were never exercised by a probe |
| G1 A (JSON export) | 0.90 | held | 0.95 | **accept 0.95** | the writer's output is the evidence — byte-stable, characterised to pretty-printing, file naming, whole-house-always and menu-only access; the trapdoor's form is the residual (A3's) |
| G2 F (SVG / PNG / Advanced export) | 0.90 | 0.85 | held | **accept 0.85** | only the Advanced dialog's defaults were exported (twelve table 2 × N files at 100 dots, all layers); per-floor SVG, PNG, row / column layouts, floor ranges, layer subsets and the elevation export were never triggered — by the owner's export rule, a fact about the evidence, not a flaw in it |
| G3 F / A (hand-off contract) | 0.80 / 0.70 | 0.70 / 0.55 | held | **accept both** | the receiver half is B5's row (0.90 / 0.85); the distinct half — what a sender puts in the URL — has zero observations (critic §6 gap 1: no lane opened a building from NG, MFCG, VG, UP or Tiny Pubs), the creator calls the senders unfinished ("fine-tune this functionality later", 1.3.4; the entrance hand-off "isn't currently working", 1.3.8), and the only rasterisation sentence is about Procgen Mansion; the one-click measurement that closes it needs no export |

### §1.1 Aggregates and effort (ruled)

| dimension | assessor | over → | under → | ruling | reason |
|---|---|---|---|---|---|
| **overall F** | 0.82 (0.77–0.86) | 0.77 (0.72–0.82) | 0.84 (0.79–0.88) | **0.80 (0.75–0.84)** | unweighted mean of the ruled cells 0.83 (from 0.84: A1, B1, D5, D6, E1, E2, E7, F3, G2 −0.05; D7, G3 −0.10; B3, B6, C4, C6, D3 +0.05), heavy rows (B1, C1, C2, C3, C4, D3, E1) 0.80 unchanged (B1 and E1 −0.05, C4 and D3 +0.05); at the assessor's implied heavy-row weight (w ≈ 5, `aggregates.py`) 0.82; −0.02 for the cross-stage interactions the creator's own record documents (the spiral shaft and the entrance overlapping, fixed 1.3.3; furniture blocking doorways and stairs, 1.3.6 → 1.3.7; stair tags forcing an extra storey; the clock reseed) — the discount the VG and FTG rulings carried |
| **overall V** | 0.83 (0.78–0.87) | 0.81 (0.76–0.85) | 0.83 | **0.82 (0.77–0.86)** | unweighted 0.83 (E1 +0.05, E2 and E7 −0.05); the over lens's structural point stands — every measured render is one configuration of the style surface (Natural scheme, Simple walls, Dots grid, Hidden doors, Names labels, Detailed roofs with all three effects on) and the other four schemes, four wall styles, six grid modes, two door modes, Numbers labels, two roof modes and the elevation are one screenshot, a piece count or nothing — priced at −0.01, as the NG ruling priced its unrendered modes |
| **overall A** | 0.56 (0.48–0.62) | 0.53 (0.46–0.59) | 0.60 (0.53–0.66) | **0.58 (0.50–0.64)** | unweighted 0.63 (from 0.62), heavy rows 0.54 (from 0.51: C1, C3, E1 +0.05, C4 +0.10); at w ≈ 5–8, 0.58–0.59. The highest A of the five references, for a checkable reason: the best structural evidence (a complete call census, the generator's own exports, the orbit test) and four output laws measured from the exports — the one-room setback, the outer-corner stair cell, the door position with the long-wall tree preference, the per-role fixed / ratio window demand; the muscles (the cut rule, the merge predicate, the door price, the validators' score, the packer) stay theirs |
| **overall S** | 0.01 (0.00–0.03) | 0.01 (0.00–0.03) | 0.02 (0.01–0.03) | **0.02 (0.01–0.03)** | the stream is pinned (A4 stream-only 0.70), as for MFCG and NG whose overall S the earlier rulings kept at 0.02 with the same annotation; every downstream draw order is not (467–2 632 inlined `Random.float` per house), and ≈ 1 generation in 5 reseeds its successor from the clock |
| **effort** (Dwellings-alone parity) | ≈ 20 pw (16–26) | ≈ 26 (22–32) | held (≈ 19–20) | **≈ 23 pw (19–29)** | R-E: +1.0 on C1 (the cut rule fitted per partition mode and the merge interplay, against the creator's record — an idea in 2021, a first implementation "too slow and too unstable", tweaks in 2023, a rectangle-only mode added and removed, `spacious` made the default in 1.4.0 — the over lens's +1.5 less the decomposability result, which fixes the class); +0.4 C2 (the merge removes up to 45 % of created pieces); +0.2 C3 and +0.3 D3 (the object model does not close; the objective is smaller than feared once room supply explains most failures); +0.4 E5 (the packer); +1.0 E7 (a second generator known from names and images; the over lens's +1.5 less what the assessor's range top already carried); +0.5 for a per-mode parity harness on the walked set (the lenses' export scripts are its first half); −0.5 for the four measured laws that remove design search from B3, C3, C4 and C6 (under lens). Row sum 20.0 + 3.3 ≈ 23 |

## §2 Aggregates and effort — how the numbers were formed, and what they are not

Under R-H the aggregate is not the plain mean of the 39 rows: the rows that produce most of what a viewer sees and
most of the output statistics — the ground shape (B1), the partition (C1), the corridors (C2), the doors (C3), the
stairs (C4), the role assignment (D3) and the plan renderer (E1) — carry the weight. The over lens's `aggregates.py`
found that a single weight w ≈ 5 on those seven rows reproduces the assessor's own 0.82 / 0.56 from the assessor's own
cells; the same weight is used here (F 0.82 before the interaction discount; A 0.58–0.59). The unweighted means are
given beside every figure so the weight can be seen: F 0.83, V 0.83, A 0.63, S 0.014 over the 22 generative rows.

They are probabilities of *parity with Dwellings as recorded*, not of product quality. Several rows score parity with
a weakness the owner's rulings say the base must exceed — partition-then-label that cannot guarantee a room (D3),
stairs placed per pair after the partition (C4), no holes or round rooms (B5), no unit (H1), no ids or version in the
export (G1), re-rolls the permalink cannot reproduce (F2), a successor seed that depends on the clock in one
generation of five (A4), unseeded lights (E3), chimneys unrelated to hearths (E6). Those rows do not raise the
floor-plan rung's difficulty; they lower it, because the base is not bound to reproduce them. The rung itself (item 28)
is the reverse of the reference — a known footprint, storeys, entrance side, class, function and prosperity band, and
a partition fitted to a programme — so the rows that carry over are B5 / G3 (the hand-off), C4 / C5 (the stair
devices), C6 (window demand), D1 (the room record), E1 / E3 / E4 (the plan look), G1 (the export schema), and the
bars of B3, B4, C2 (containment, no windows below ground, no parallel corridors, one door for a one-cell room).

## §3 Capability table after rulings (values are the ruled cells; unlisted cells are the assessor's; S per R-B)

| id | capability | F | V | A | S |
|---|---|---|---|---|---|
| A1 | Parameter surface: 16 tags, floors, URL keys, dialogs, menus, shortcuts, styles | 0.90 | 0.85 | 0.80 | — |
| A2 | Pipeline order, once-per-house stages, failure policy (no global retry) | 0.90 | — | 0.75 | 0.02 |
| A3 | Data model and encodings: unit cell grid, plan bitmask, entrance code, JSON schema | 0.95 | — | 0.95 | — (det. given model) |
| A4 | Determinism, seeding, PRNG (Lehmer 48 271, CONFIRMED), Enter chain | 0.85 | — | 0.70 | 0.70 (stream only; clock-free histories) |
| A5 | Client architecture: registry at start-up, per-generation model, per-layer canvases, data files | 0.85 | — | 0.75 | — |
| B1 | Ground-plan drafting (rectangle unions with rejection, size bands, `square`) | 0.80 | 0.85 | 0.50 | 0.02 |
| B2 | Storey count (`randNFloors`, `low` / `tall`, `floors=`, size → height) | 0.85 | — | 0.45 | 0.02 |
| B3 | Upper-storey setback (the storey below minus one whole room; `slab`) | 0.85 | 0.85 | 0.55 | 0.01 |
| B4 | Basement (probability ≈ 0.78, 9–20-cell target, placement, throw-away plan) | 0.80 | 0.85 | 0.40 | 0.01 |
| B5 | Footprint hand-off in (plan / w / h / entrance / floors; connected-part rule; holes; 11 × 11 cap) | 0.90 | — | 0.85 | — |
| B6 | Entrance choice (one per house; on a long side; exit room) | 0.85 | 0.85 | 0.40 | 0.02 |
| C1 | Recursive partition (bent bisection measured; `organic` / `mechanical`; the cut rule open) | 0.75 | 0.80 | 0.45 | 0.01 |
| C2 | Corridor merge, nooks and passages (`mergeCorridors`; `hallways`; one-cell rooms) | 0.70 | 0.80 | 0.40 | 0.01 |
| C3 | Room connection and doors (spanning trees; doors at run ends; three door kinds; rare loops) | 0.80 | 0.85 | 0.50 | 0.01 |
| C4 | Stairs between storeys (one per pair; same cell; outer-corner cell; U / L; trapdoor) | 0.90 | 0.90 | 0.65 | 0.01 |
| C5 | Spiral stair and stairwell (`findSpiral`, `rollSpiral`, `rollStairwell`; the stack runs through the basement) | 0.80 | 0.85 | 0.45 | 0.01 |
| C6 | Windows (per-role fixed / ratio demand capped by exterior edges; 0.32 module; `blank` / `transparent`) | 0.90 | 0.90 | 0.65 | 0.02 |
| D1 | Room-type registry and record (28 types; validators; fixed doors / windows) | 0.85 | — | 0.65 | — |
| D2 | Programme construction (the two printed lists; specials re-drawn per assignment run) | 0.90 | — | 0.80 | 0.02 |
| D3 | Role assignment (`assignSet` × 2 → `types2rooms` → `validate`; supply-limited; generic leftovers) | 0.80 | — | 0.45 | 0.01 |
| D4 | House naming (Tracery grammar) | 0.90 | 0.85 | 0.85 | 0.02 |
| D5 | Alternative room sets (Gothic / Tavern JSON5 programmes, `LoadedHouseType`) | 0.55 | 0.70 | 0.30 | — |
| D6 | Labels, renaming, numbering | 0.85 | 0.85 | 0.65 | — |
| D7 | Typed buildings — Taverns' programme-first method (separate generator) | 0.50 | 0.70 | 0.30 | 0.00 |
| E1 | Plan renderer: layer stack, cell-unit widths, walls, glyphs, grid / door / label modes | 0.85 | 0.95 | 0.85 | — (det. given model) |
| E2 | Colour schemes and wall styles | 0.85 | 0.80 | 0.70 | — |
| E3 | Room lights (skeleton-summit chain, wall lights, per-room toggles) | 0.85 | 0.85 | 0.70 | 0.00 (unseeded in the reference) |
| E4 | Vector ambient occlusion | 0.85 | 0.85 | 0.70 | — |
| E5 | Abstract furniture and props (`Clutter` packing named only) | 0.75 | 0.80 | 0.35 | 0.01 |
| E6 | Roofs (one layer per storey; one hip face per outline edge; shades, tiles, chimneys, spiral cone) | 0.85 | 0.85 | 0.75 | 0.02 |
| E7 | Elevation (Tiny Pubs facade sections; four sides; fortified; fading; dark) | 0.60 | 0.65 | 0.30 | 0.01 |
| F1 | Blueprint editor | 0.90 | 0.85 | 0.80 | — |
| F2 | Restrictive rerolls (Shift+Enter, Ctrl+Enter, elevation R; on the loaded stream) | 0.90 | — | 0.80 | 0.02 |
| F3 | Renaming and view toggles | 0.90 | 0.90 | 0.80 | — |
| G1 | JSON export | 0.95 | — | 0.95 | — (det. given model) |
| G2 | SVG / PNG / Advanced export | 0.85 | 0.90 | 0.80 | — |
| G3 | The settlement → building hand-off contract (receiver exact; senders unmeasured) | 0.70 | — | 0.55 | — |
| H1 | Scale envelope | 0.90 | — | 0.70 | — |
| H2 | Performance envelope | 0.90 | — | 0.60 | — |

## §4 Factual corrections carried from the lenses (for `docs/confidence/dwellings.md`'s owner and the findings; not confidence changes beyond §1)

a. **`hallways` (assessment §1.1 "Also carried", C2 evidence; critic D11).** The paired "rooms +6/+13/+1/+12/+4" are
   `Room.new` — pieces the cutter created — not surviving rooms; the surviving rooms change +1/+3/+1/0/−1 (44 → 48
   across the five seeds) while created pieces go 51 → 87. `hallways` adds cuts whose pieces are mostly merged away;
   its effect is on the survivors' shape (rooms without a 2 × 2 block 39 → 73 % of rooms, 14 → 54 % of area). The
   profile's `getNotch ≈ divideArea − rooms` identity is right because it uses created pieces. `organic` /
   `mechanical`'s "room counts barely change" survives on surviving rooms (rectangles 66 → 49 % and → 73 %).
b. **The name and the specials (D2, D4; the "call order" of A2, B6, C4).** The analyzer prints siblings by inclusive
   time (§0.2 #3), so "`Namer.get` runs last, so the name cannot drive the specials" is not evidence; the conclusion
   is nevertheless right on better data — one house's list-1 special is chapel on load, workshop / laboratory after
   two Shift+Enter and workshop / lookout after two Ctrl+Enter with `Namer.get` not re-run (`probe-keys.log` #1–#5),
   and the twelve exported names carry no occupation. The 1.0.1 coupling ("an Armoury only in a knight's … house") is
   a stale statement; D4's title should drop it; the specials are drawn per assignment run (D2 and D3 are one stage).
c. **The stairwell and the basement (C5).** The 1.4.0 "connecting all floors (except the basement)" is contradicted
   by both exported stairwell stacks in houses with a basement (rows 4 and 11: shafts through B / GF / 1F and
   B / GF / 1F / 2F with the B → GF flight inside). The spiral's basement exception (10/10, critic R7) stands.
d. **Sample accounting beyond critic B14.** The 92 walked houses stand on 29 distinct ground footprints (five medium
   footprints × 13 tag families); "104 houses" double-counts the twelve exports; the medium shape statistics average
   sixteen tag families whose narrow-room share ranges 17–73 % on the same five seeds — only `organic`, `mechanical`,
   `hallways` and `square` change the cutter, so the default cutter's sample is ≈ 50 distinct houses plus seven exports.
e. **A stale receipt (A3, F1).** `captures/dwellings/_critic/permalink-decode.out.txt` holds the decoder's first-run
   entrance verdicts, four of eight wrong by an off-by-one in its right-hand cell (§0.2 #5); the decoder was fixed and
   re-run into `permalink-decode.entrances.txt`, which matches critic R2. Cite the `.entrances.txt`; mark the `.out.txt`.
f. **The `Door`-object model (C3).** Surviving `Door` objects (`Door.new − Room.unlink`) equal rooms − storeys in 32
   of 92 walked houses, fall short in 36, exceed in 24; neither "tree" nor "loop" can be read from counts for the 80
   houses without an export (critic R16 is wider than twelve houses).
g. **`new Date()` is in the successor path (A4; critic D16 / B12).** An `assignSet → Random.reset → new Date()` call in
   a generation makes the next Enter seed clock-dependent (off the orbit 4/4 when recorded, on 18/18 when not); "Enter
   is a deterministic function of the loaded state and the key history" holds for histories without that call (the
   critic's three-browser test, R5, was of one such history). The house itself is unaffected (n = 1, PLAUSIBLE).
h. **The 1.3.0 entrance rule (B6; posts §2(f)).** The posts lane's reading ("a narrower, taller front") is
   contradicted by the build: the exit is on a long side of the bounding box in 9 of 10 non-square footprints and on
   the side with the most exterior edges in 11/12.
i. **Chimneys (E6; assessment §1.2 and the E6 evidence line).** `House.spawnChimneys = 1` is a call count; the creator
   says "one or more chimneys"; the chimney count per house is unmeasured.
j. **The setback (B3).** The assessment's "which cells are dropped — a per-rectangle drop? a reflex-corner trim?" is
   answered: whole rooms, one per shrinking storey (13/13), of ordinary kinds; the selection rule remains open.
k. **`Random.reset` (A4, F2).** Each Shift+Enter / Ctrl+Enter runs `Random.reset` twice and stays on the loaded
   house's stream; the successor seed is drawn after a mid-generation reset to the house's own stream (k below the
   `Random.float` count in 2 of 3 coverage generations) — which stage performs it is not attributable from counts.

## §5 CONFIRMED vs PLAUSIBLE

* **CONFIRMED** (executed or read on disk in this seat): §0.2 #1 (seven modular exponentiations, my own), #2 (ten
  scripts re-run; eight byte-identical, two identical in every computed line), #3 (`analyze.mjs` l. 130), #4 (the
  `RoofStack` counts against the exports' own storey levels, 12/12), #5 (the stale and the corrected receipt), #6
  (every count quoted from the lens outputs, re-read at the cited place); every figure in §1 attributed to a lens's
  executed measurement is CONFIRMED by its author and, where listed in §0.2, re-executed here.
* **PLAUSIBLE** (judgment): every confidence number, range, effort figure and "partial" weighting in §1; the reading
  that the vanished `hallways` pieces are removed by `mergeCorridors` (the counts show they vanish between creation
  and the drawing; which routine removes them is a name); the clock-reseed mechanism (the stacks name the caller and
  the frame, not the argument of `reset`); the mid-generation-reset reading; the null models' fairness (an irregular
  grower as the C1 control; a uniformly random spanning tree as the C3 null); every generalisation from the twelve
  exports' 13 setbacks, 38 stair ends, 95 doors, 375 windows and 133 rooms to the build.
* **Not done:** no new capture, no export, no bundle, no image; the findings files were not re-read beyond what the
  assessment, the two lenses and the critic cite from them.
