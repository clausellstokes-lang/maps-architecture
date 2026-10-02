# Render a lens-split probe pass (J145): three parallel probe seats from the round's probe brief.
# Usage: python3 mkprobe.py R PASS-LETTER   (e.g. 7 c)  -> coherence_probe-r7c-{locks,gen,time}.prompt.txt
import sys
R, L = sys.argv[1], sys.argv[2]
D = '/home/user/maps-architecture/workflows/lane-prompts/coherence-cloud'
base = open(f'{D}/coherence_probe-r{R}.prompt.txt').read()
LENSES = {
 'locks': ('LOCKS AND HAND EDITS', 'LCK', """J144's lock sentence with its guardrails G1–G3; the bent-group sentence; the hand rows (W2, W13, a re-shape C13, the hand paths of W1); column C8 in every row; §7.1's lock and bend rows; §7.2's drawn constraints; §7.4's lock column; V09's tools, bend lines and panels; V10's tools and reads; undo. One hand gesture must give one outcome, the same by canvas and clerk, and a held building stays held."""),
 'gen': ('GENERATION AND REGENERATION', 'GEN', """The pipeline's meetings in the order it runs: S3's gate routes, priced decks, weld vertices and stage-1 trace; S4's viaducts; S5a's trace and pull; S5b's spawned primaries; S6's elevated roads and aqueducts; S7's strips, towers and gates; S10's band. A regeneration under held raised ways (§7.2), with its re-solved routes. The fixed-place sentence (water gates, anchors, welds). Gate counts (`N_k`), §5.3's checks, §5.2's ladders (F-WALL, F-ROUTE) and §5.4's warnings must agree with the tables."""),
 'time': ('EPOCHS, DECAY, THE VILLAGE, READERS AND TESTS', 'TIM', """W1 at an epoch and the rows W4–W12 over every raised-way state (C3–C6, C10–C12): V06 §3.7 and §3.19, V05's landfall, V04's arch vaults over time (§3.5.4, §3.10, UC18, the reconcile's triggers), V07's palisade and hand-off down; the report fields (`EpochReport.walls`, `.raised`, `reshaped`). Every reader of a meeting's result (casters, heightfield, exports, V01, V09, V10, V11, V12). Every cell's named test: does it hold its case on a fixture that holds it, at a milestone where its provider exists?"""),
}
for key, (name, code, body) in LENSES.items():
    pre = (f"PASS {L.upper()} — LENS-SPLIT PROBE (J145). This probe pass runs as three parallel seats, each one lens; you are the "
           f"{name} lens. Seat key coherence/probe-r{R}{L}-{key}; write docs/validation/coherence/probe-r{R}{L}-{key}.md and "
           f"docs/validation/coherence/results/coherence_probe-r{R}{L}-{key}.json (key \"coherence/probe-r{R}{L}-{key}\"); ids "
           f"PRB{R}{L.upper()}-{code}-nn. Read Part P of adjudication-r{R}.md and every earlier probe file of this round first; attack "
           f"the AMENDED text above all and do not re-raise a finding Part P closed unless its closure fails. Stay inside your lens "
           f"(two other seats cover the rest); within it, be exhaustive.\nYOUR LENS: {body}\n\n")
    out = pre + base.replace(f'probe-r{R}.md', f'probe-r{R}{L}-{key}.md').replace(f'coherence_probe-r{R}.json', f'coherence_probe-r{R}{L}-{key}.json').replace(f'coherence/probe-r{R}', f'coherence/probe-r{R}{L}-{key}')
    open(f'{D}/coherence_probe-r{R}{L}-{key}.prompt.txt', 'w').write(out)
    print(key, len(out))
