from lib import *
t = extract(723, 832)
t = strip_narr_ids(t); t = strip_narr_more(t); t = strip_narr_tail(t)
t = re.sub(r'\(VG, D5\.\d+\)', '(VG)', t)
t = re.sub(r'D5\.\d+', 'D5', t)
R = [
("""law (V07 §2.2). A cell may instead hold a **reference** to another table's cell, `{ ref: { table: TableId; row: string;
cell: string } }`, resolved when the tables load (a dangling or unit-mismatched reference fails the table compile, T-V7-44)
and read as that cell's current value at every anchor; `editTable` on the village cell replaces the reference by a value,
and its inverse restores the reference (J-V7.96). A value another volume owns is held so, never copied. Provenance is `own` (calibrate-later, the default stated) unless marked `VG` (ref:VG 1.6.9, trace key D5.n of
the table at the end of this section).""",
"""law (V07 §2.2). A cell may instead hold a **reference cell** (§7.6: its compile check, its reading at every anchor and
`editTable`'s inverse are §7.6's; J-V7.96, E-30): a value another volume owns is held so, never copied. Provenance is
`own` (calibrate-later, the default stated) unless marked `VG` (ref:VG 1.6.9, trace key D5; V07's head)."""),
("    sun: number; wind: number; fertile: number; fertileM: M; frame: number; frameM: M; prominence: number; prominenceM: M; random: number };  // V07 §3.2 (4)",
 "    sun: number; wind: number; fertile: number; fertileM: M; frame: number; frameM: M; prominence: number; prominenceM: M; random: number;\n    pull: number /* × the climate row's w_water × the proximity to reliable water (item 111 (b)) */ };  // V07 §3.2 (4), (4a)"),
("    dispersedBranch: number; dispersedTrackLimit: number; isolatedWeight: number; dispersedDialMax: number };   // V07 §3.1, V07 §3.5",
 "    dispersedBranch: number; dispersedTrackLimit: number; isolatedWeight: number; dispersedDialMax: number;\n    organicDialFrom: number; districtDensity: number };                                               // V07 §3.1, V07 §3.5"),
("  handoff: { band: number };                                                                           // V07 §2.1, V07 §3.12",
 "  handoff: { band: number };                                                                           // V07 §2.1, V07 §3.12\n  perimeter: { closeM: M };                                                                            // V07 §3.7 step 1\n  aridWater: { flowing: number; still: number; coast: number } /* multipliers on V07 §2.2's water shares on an arid climate row */;   // V07 §3.1 step 1 (item 111 (a))"),
("| `heart` | lattice 20 m over the frame's middle half (0.5); slope ≤ 0.1 (hard; F-V-HEART relaxes to 0.2); +0.6 within 150 m of a crossing site; +0.5 within 300 m of fresh water; `sun` +0.3 × (`D` − `D̄`); `wind` −0.3 × exposure; +0.2 × fertile share within 500 m; −0.5 within 300 m of the frame; `prominence` +0.2 × the relative height within 300 m; random share 0.15 |",
 "| `heart` | lattice 20 m over the frame's middle half (0.5); slope ≤ 0.1 (hard; F-V-HEART relaxes to 0.2); +0.6 within 150 m of a crossing site; +0.5 within 300 m of fresh water; `sun` +0.3 × (`D` − `D̄`); `wind` −0.3 × exposure; +0.2 × fertile share within 500 m; −0.5 within 300 m of the frame; `prominence` +0.2 × the relative height within 300 m; random share 0.15; `pull` 1 (the water pull's weight is the climate row's `w_water`; 0 under `VG`) |"),
("| `formRules` | street side spacing × 3, back lane 0.5; nucleated crossroads 0.6, branch × 0.7 within 0.6 · `R_s`, crossroads weight × 2; row straightness 5, back lanes 0.8, jitter 0.05; dispersed branch × 1.5, track limit × 2, isolated weight × 2, dial above 1.4 → weight 0 |",
 "| `formRules` | street side spacing × 3, back lane 0.5; nucleated crossroads 0.6, branch × 0.7 within 0.6 · `R_s`, crossroads weight × 2; row straightness 5, back lanes 0.8, jitter 0.05; dispersed branch × 1.5, track limit × 2, isolated weight × 2, dial above 1.4 → weight 0; `organic` from the planned ↔ organic dial 0.75; a `district` request × 1.5 on the density dial |"),
("| `handoff` | band 0.05 |", "| `handoff` | band 0.05 |\n| `perimeter` | the morphological close 20 m |\n| `aridWater` | on an arid climate row: flowing types (brook, stream, river, confluence, estuary) × 0.4, still (pond) × 0.3, coast and island × 1 (own, calibratable; 1 on every other row, and 1 under `VG`) |"),
]
t = apply(t, R)
# the reference trace paragraph: row D5 alone (FL-1; V07-0120 -> §17.1)
i = t.index('**The reference trace**')
t = t[:i] + ("**The reference trace** (§17.1 (6), item 62). Every `VG`-marked constant carries row D5 of `research/findings/code-impact.md`\n"
 "§(d) as its trace key (P17 for the field sectors), the behaviour named in its provenance form; the constants are restated\n"
 "in metres in our words, never copied as a table. The behaviours so traced: the character draws (V07 §3.2 (5)); the terrain\n"
 "primitive by water type and the meander spline (V07 §3.2 (2)); the density band and closed formula (V07 §3.3); the\n"
 "palisade lattice, hull and resample (V07 §3.4); the tracker steering, its step, look-ahead, weights, pulls, push, branch\n"
 "odds and pruning (V07 §3.5); the square sized in house widths, its rim, round odds, spiral and tower (V07 §3.6); the\n"
 "frontage start, the house rectangle and household draw, the density-accepted frontage and the rim multiplier (V07 §3.8,\n"
 "V07 §3.15); the wharf and piers (VS4 step 5); the field area per house, the one-house and orchard rules and the forest\n"
 "fill (V07 §3.9, V07 §3.15); the approach farmstead and the trail repair (V07 §3.9 (5)); the spotlight and the water look\n"
 "(V07 §5.1); the retry behaviour (V07 §3.13, not emulated); the road and water shares and the palisade chances (V07 §2.2).\n")
save('05-s2b.md', t)
print('ok', len(t.split()))
