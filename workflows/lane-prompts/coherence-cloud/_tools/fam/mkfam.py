# Render the six family-focused verify briefs.  Usage: python3 mkfam.py R
import sys, os, datetime
SP = os.path.dirname(os.path.abspath(__file__)); R = sys.argv[1]
PASSES = 'vwxyz'   # round 7's family fix passes: '7v' re-checks famverify-*-r7, '7w' famverify-*-r7v, ...
P = (R[:-1] + ('' if R[-1] == 'v' else PASSES[PASSES.index(R[-1]) - 1])) if R[-1] in PASSES else str(int(R) - 1)
ADJS = [f'adjudication-r{R[:-1]}{c}.md' for c in PASSES[:PASSES.index(R[-1]) + 1]] if R[-1] in PASSES else []
OUT = '/home/user/maps-architecture/workflows/lane-prompts/coherence-cloud'
LENSES = [
 ('table', 'TBL', 'the laws and their examples', """§2.7's support step (6): the LAWS as the design now states them (terms, laws 1–4 with law 1 (1)–(11), the tiers, the check, the corrections and the veto list), then the worked examples — the crossing table, the way-and-channel table and the lock, bent-group and fixed-place sentences — read as a builder would build them.
Check that the laws decide every case on every axis (the examples need not list it):
  - every wall event;
  - every raised-way state;
  - every path: generation, regeneration, epoch and hand;
  - every lock: none, placement or shape, on either side (J144, J147, J150).
Check that each cell gives one outcome — the built form, the records and the op that writes each, gate counts, the bend key and dry-run fate, and undo — and that "as Wn·Cm" references resolve. Check the support step's own rules (1)–(7), the span rule, *over the band*, *down before the wall*, *beneath* and *unchanged meeting* against one another. Check the laws and the examples against item 110 (b), (f), J144 and J147–J149, and that the design text states the laws exactly as adjudication-r7.md's Part L gives them."""),
 ('generation', 'GEN', 'generation and regeneration', """The generation pipeline's meetings of walls and raised ways, in the order it actually runs: S3's gate routes and boundary, S4's routes and viaducts, S5a's trace and pull, S5b's spawned primaries, S6's elevated roads and aqueducts, S7's strips, towers and gates, and S10's band. Then a regeneration under a held raised way (§7.2), and its routes re-solved.
Read §4.1, §4.2 S3, §4.3 (*The slot*, *Where it may not go*, *Lattice and costs*), §4.4 S5a–S5c, §4.6, §4.7 S10, §4.8, §4.13, §5.2's ladders, §5.3's gate and way-and-trace rows, §5.4's warnings, §7.2 and §7.3's operators. Gate counts (`N_k`), §5.3's checks and the warnings must agree with the tables."""),
 ('epochs', 'EPO', 'epochs, decay and the village', """Walls and raised ways over time:
  - V06 §3.7: circuits, contraction, re-anchored stretches, decay, gate opening, `wallToWay`, `absorbWall`, `repairWall`;
  - V06 §3.19: founding, the ledger, decline, lapse, strike, salvage, hazards, repair, suppression, frame growth;
  - V05 §3.16's landfall over walls and raised ways;
  - V04's arch vaults over time: §3.5.4, §3.10, §3.11 UC18, and `ArchVaults.reconcile`'s triggers;
  - V07's village: VS3's palisade, the hand-off down, §3.5a, §3.12, and V07's decay of the palisade.
Every state a part passes through over the epochs must meet every wall event by the tables, and every epoch op's records, reports (`EpochReport`'s `walls` and `raised` sections) and guards must agree with them."""),
 ('hand', 'HND', 'hand edits, locks and the interface', """Every hand edit that brings a wall and a raised way together:
  - T3's walls, gates and grips, `placeGate`, `moveVertex`, re-anchoring and `convert`s;
  - T4's raised roads and aqueducts, re-shape, Arch spacing and Deck height;
  - carves, moved rivers and deletes;
  - their dry runs, bend keys and fates;
  - undo.
Check that J144's lock rule (placement held, shape changed) is applied everywhere and nowhere contradicted: §7.1's lock row and bend rows, §7.2's drawn constraints, §7.4's lock column, V09's tools, T3/T4 rows, §4.9's bend lines and panels (§4.20), and V10's tools and reads (the clerk must say what the canvas does). One hand gesture must give one outcome, the same by canvas and clerk."""),
 ('readers', 'RDR', 'readers, drawing and exports', """Every reader of a meeting's result:
  - §4.5's daylight casters;
  - §8.4's casters and heightfield;
  - §8's drawing of walls under decks and of arches walled up;
  - §11.1's glTF, CityJSON and GeoJSON exports, including a span's `use` and the run's height;
  - §9's map furniture;
  - V01's crossings and under-deck strip (§3.17), and its hook rows;
  - V04's foundations and vault drawing;
  - V09's panels, badges and why lines;
  - V10's read rows;
  - V11's registry readers and settings rows (`stripMarginM`, `clearWidthM`, structure cells);
  - V12's statistics and guards.
Each must read the result the tables give: the same `use`, height, cap, gaps and gates. Each must cite the tables rather than restate them."""),
 ('tests', 'TST', 'tests, fixtures and milestones', """Every test the family's cells and sentences name: T110-2 (all clauses), T114-3, T-V1-51, T-V4-62/-63/-80/-82, T-V5-14, T-V6-11/-47/-61/-64/-73, T-V7-48/-51, T-V9-52, T-V10-41, the §8.11 and §11.6 rows, and any other test a cell names. For each cell, check that the named test runs its case, on a fixture that holds the case (the fixture's own definition, e.g. V06 §7's H-AQUA, §13.2's CITY fixtures). Check that each clause is scheduled at a milestone where its provider exists (§13.8; each volume's milestone cells; INDEX §5 risk 2). Check that each bar passes a correct build and fails a wrong one."""),
]
for lens, code, name, body in LENSES:
    t = open(f'{SP}/template.txt').read()
    t = (t.replace('@@LENS@@', lens).replace('@@LENSCODE@@', code).replace('@@LENSNAME@@', name).replace('@@LENSBODY@@', body)
           .replace('@@R@@', str(R)).replace('@@P@@', str(P)).replace('@@DATE@@', datetime.date.today().isoformat()))
    if R[-1] in PASSES:
        L = R[:-1]; ADJ = ', '.join(ADJS)
        t = (t.replace(f"adjudication-r{R}.md's Part L", f"adjudication-r{L}.md's Part L (the laws; the design states them at §2.7) and the family fix passes' rulings ({ADJ})")
               .replace(f"  1. adjudication-r{R}.md: Part L (the laws, normative)", f"  1. adjudication-r{L}.md: Part L (the laws, normative); then each family fix pass's rulings whole ({ADJ}: the dispositions of the family checks' findings, the builders' choices and the held notes); in adjudication-r{L}.md also")
               .replace(f"restated in adjudication-r{R}.md", f"restated in adjudication-r{L}.md")
               .replace(f"(docs/validation/coherence/adjudication-r{R}.md, with its Part P from the probe passes)", f"(docs/validation/coherence/adjudication-r{L}.md, with its Part L laws and its Part P from the probe passes), then checked it with six family checks after each repair and decided their findings in fix passes ({ADJ}); the last checks were famverify-*-r{P}.md"))
    open(f'{OUT}/coherence_famverify-{lens}-r{R}.prompt.txt', 'w').write(t)
    print(lens, len(t))
