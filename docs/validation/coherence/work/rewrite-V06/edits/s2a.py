from lib import *
t = extract(517, 760)
R = [
# EvolutionStrategy is the base's (§4.11): cite, never restate
("interface EvolutionStrategy { id: string; phases: EpochPhase[] /* one per step it implements, in EpochStep order; a step with no phase runs nothing (V06 §3.1) */ }   // item 317 (replaces plan())\n",
 "// EvolutionStrategy { id; phases: EpochPhase[] } is §4.11's (item 317): one phase per step it implements, in EpochStep order; a step with no phase runs nothing (V06 §3.1)\n"),
("run(ctx: ProductEpochContext /* a product's phase: the grow path's context before M6-E, V06's EpochContext after (which extends it), reading the extension only where present; the engine's own phases run only on V06's runner and read the whole EpochContext (seam TX-02) */): KernelResult<EpochOps> }",
 "run(ctx: ProductEpochContext /* a product's phase: the grow path's context before M6-E, V06's EpochContext after (which extends it), reading the extension only where present; the engine's own phases run only on V06's runner and read the whole EpochContext */): KernelResult<EpochOps> }"),
("stage: StageId /* the stage its volume names (V06 §3.16): SKY, S9b, U-FADE, VS1, VS2, VS8 — its draws' stream-key stage and its reads' tag (SCC-R2C-11; VS8 for village.pins, TV-03) */;",
 "stage: StageId /* the stage its volume names (V06 §3.16): SKY, S9b, U-FADE, VS1, VS2, VS8 (VS8 for village.pins) — its draws' stream-key stage and its reads' tag */;\n  replay?: 'every'|'last' /* item 113: under the history replay at generation, 'every' (absent) runs it at every coarse epoch; 'last' runs it once, at the last coarse epoch, over the replay's accumulated scope (V06 §3.20.4) */;"),
("run(ctx: ProductEpochContext /* as EpochPhase.run's (seam TX-02) */): KernelResult<EpochOps>", "run(ctx: ProductEpochContext /* as EpochPhase.run's */): KernelResult<EpochOps>"),
("(V06 §3.2's table states each scope; TW-08) */ }", "(V06 §3.2's table states each scope) */ }"),
("// item 317 (absorbing V07's items 202, 317): a product's epoch overrides, on §1.1's ProductDecl (V07 §2.1 declares the product)",
 "// item 317 (with V07's request absorbed; item 202 lands the members on M4's grow path): a product's epoch overrides, on §1.1's ProductDecl (V07 §2.1 declares the product)"),
("demandTaken?: { band: string; count: number }[] /* households a participant takes up from the epoch's delta demand (V05 §3.15's refloat or raise; BCR-V5-23): `siting` subtracts them */ }",
 "demandTaken?: { band: string; count: number }[] /* households a participant takes up from the epoch's delta demand (V05 §3.15's refloat or raise; V05's request, carried here): `siting` subtracts them */ }"),
("// added to §2.7's Household (item 335): epoch-local, never in a snapshot", "// on §2.7's Household (item 335): epoch-local, never in a snapshot"),
# §2.2
("| row | default | what it governs (V6 section) |", "| row | default | what it governs (V06 section) |"),
("`EvolutionTable` (`tables/evolution.json` in `@plat/tables`; one versioned table with provenance per cell, §7.6; every",
 "`EvolutionTable` (`tables/evolution.json` in `@plat/tables`, V11 §3.1's registry row 60; one versioned table with provenance per cell, §7.6; every"),
("| `walls.fateWeights` | `road` 0.7 · `absorb` 0.3 | a superseded ring's end, drawn once (§3.7.2; the owner's \"deconstructed into a road\" the heavier) |",
 "| `walls.fateWeights` | `road` 0.7 · `absorb` 0.3 | a superseded ring's end, drawn once (§3.7.2; the owner's \"deconstructed into a road\" the heavier) |"),
("| `shade.rasterM` · `shade.ruinShare` | 4 · 0.5 | the caster raster's cell; a ruin's caster height as a share of its eave (§3.4). The reach is not a row of this volume: the one reach law is the sampler's — a caster of height `h` shades at most `min(cot β, c)` × `h` away at sun elevation `β`, `c` the sampler's cap (8; item 296 (i), V05 §3.19 (1)) — for the buildings as for V05's island strips (ST-46) |",
 "| `shade.rasterM` · `shade.ruinShare` | 4 · 0.5 | the caster raster's cell; a ruin's caster height as a share of its eave (§3.4). The reach is the sampler's one law (item 296 (i); V05 §3.19 (1)), never a row here |"),
("| `decline.turnoverVacancy` | poorest band 0.05 · every other band 0.01 · 0 in the parity presets | the share of each band's dwellings regrowth tier (1) leaves vacant, so a steady town keeps some abandoned stock (§3.8.2; C6-34) |",
 "| `decline.turnoverVacancy` | poorest band 0.05 · every other band 0.01 · 0 in the parity presets | the share of each band's dwellings regrowth tier (1) leaves vacant, so a steady town keeps some abandoned stock (§3.8.2) |"),
("| `uses.splitHysteresis` | 0.10 | a split pair merges back only when its split index falls below its class's compiled `profile.split.threshold` (V11 §2.3; V11 §3.7.4's `siting.web.splitThreshold` is only the default a class without its own takes, V11 §3.5.2; SCC-69) minus this (§3.9.10 (3); SCC-23) |",
 "| `uses.splitHysteresis` | 0.10 | a split pair merges back only when its split index falls below its class's compiled `profile.split.threshold` (V11 §2.3; V11 §3.7.4's `siting.web.splitThreshold` the default for a class without its own, V11 §3.5.2) minus this (§3.9.10 (3)) |"),
("| `calamities` | V06 §2.4's calamity rows | the dossier's calamities as hazard events (§3.11.1; DR28) |",
 """| `calamities` | V06 §2.4's calamity rows | the dossier's calamities as hazard events (§3.11.1; DR28) |
| `spring.droughtLoss` · `spring.overdrawLoss` · `spring.recoverPerYear` | 0.08 · 0.10 · 0.05 | a spring's `flow` lost per drought year, lost per year per unit of over-draw, regained per year when neither acts (§3.12.1; item 111 (b)) |
| `spring.fullHouseholds` | 400 | the households a spring at full flow supplies inside its pull radius; more draw than `flow` × this is over-draw (§3.12.1) |
| `spring.failFlow` · `spring.regrowFlow` | 0.25 · 0.5 | below the first a spring has failed (its gardens and grove wither, its quarters may decline); at or above the second they grow back (§3.12.1) |
| `spring.witherAfterYears` · `spring.dryAfterYears` | [3, 8] · [20, 50] | drawn once per garden face or grove row when its spring falls below `failFlow`; drawn once per spring at flow 0: the pond dries to a hollow (§3.12.1) |
| `replay.maxEpochs` | 60 | the most coarse epochs one history replay at generation runs; above it the epoch length bends (§3.20.2) |"""),
("**Not calibratable** (SCC-57; J-V6.111). Eleven columns and one row set carry `calibratable: false` in their `ColumnSpec` (V11 §2.1), so V12",
 "**Not calibratable** (J-V6.111). Twelve columns and one row set carry `calibratable: false` in their `ColumnSpec` (V11 §2.1), so V12"),
("`advance.maxEpochs`, `history.checkpointStride`, `uses.openCandidates`, `uses.moveWhyRows` and the `chronicle.*` shares",
 "`advance.maxEpochs`, `replay.maxEpochs`, `history.checkpointStride`, `uses.openCandidates`, `uses.moveWhyRows` and the `chronicle.*` shares"),
("""Four knobs this volume reads are **not** rows of this table: `retaining.holdM`, `retaining.neglectAfterYears`,
`retaining.stretchM` and `aqueduct.disuseAfterYears` are volume 11's cells, stated once in its structures block
(V11 §3.18; X-V11-11; their values V11's, SCC-69), and V06 §3.19.2 and §3.19.4 read them there (SCC-14: one knob, one table, V12's lint T-V12-20).""",
 """`retaining.holdM`, `retaining.neglectAfterYears`, `retaining.stretchM` and `aqueduct.disuseAfterYears` are V11 §3.18's
cells, read there by V06 §3.19.2 and §3.19.4; so are the item-113 cells and event-to-epoch rows the replay reads
(V06 §3.20) and the item-111 climate rows (water-pull weights, the oasis rows)."""),
("""The history store's memory (256 MB desktop, 96 MB on the low-end tier) and the frames kept in memory (8) are **per-device
settings** of the app (volume 9's settings panel, device storage), outside the recipe, the log and every digest: they
change what is cached, never what is drawn (C6-28).""",
 """The history store's memory and the frames kept in memory are per-device app settings (V09 §9's *History* settings),
outside the recipe, the log and every digest: they change what is cached, never what is drawn."""),
# §2.3
("""// provenance on each appended epoch (item 343): EpochInputs.advance = { group: string; index: number; of: number /* the planned count */;
//   stoppedAt?: number /* on the group's last epoch only, when Stop ended it early: the count actually folded */; trajectory?: Trajectory /* index 0 only */ }""",
 """// on §4.11's EpochInputs (item 343; this is the fields' one statement): wealthLevel?: number /* 0–1: the epoch's town wealth level — the dossier's word by DR6, or the trajectory's (V06 §3.3) */;
//   advance?: { group: string; index: number; of: number /* the planned count */; stoppedAt?: number /* on the group's last epoch only, when Stop ended it early: the count actually folded */; trajectory?: Trajectory /* index 0 only */ } /* provenance on each epoch an `advance` appends */"""),
("on an existing document it bends (J-VI.4; ST-35) to \"Start a new town small\"", "on an existing document it bends (J-VI.4) to \"Start a new town small\""),
("`advance` accept `trajectory.slice`'s threat (0–1) and era row (C6-29).", "`advance` accept `trajectory.slice`'s threat (0–1) and era row."),
("""`advance` is refused on a dossier-bound document: the host's clock owns its time (§4.11 *The clock*; J-V6.2). The
refusal offers its alternative: "Make a what-if copy and advance it" (`forkAt` at the head, detached, V06 §4.4).""",
 """`advance` is refused on a dossier-bound document — the dossier-clock case of item 101 R2's refusals: the host's clock owns
its time (§4.11 *The clock*; J-V6.2). The refusal offers its alternative: "Make a what-if copy and advance it" (`forkAt` at
the head, detached, V06 §4.4). On a standalone neighbourhood document it bends (V06 §4.1)."""),
# §2.4
("**The calamity table** (`tables/evolution.json#calamities`; DR28, item 388; this volume owns it — the port only carries",
 "**The calamity table** (`tables/evolution.json#calamities`; DR28, item 388; this volume owns it — the port only carries"),
("interface CalamityRef { id: string /* the dossier's calamity id */; name: string; type?: string; severity: 'minor'|'moderate'|'major'|'catastrophic';\n  targets: Id[] /* the institutions it marked ruined (§7.7 F5), as their bound uses' ids */;\n  deaths: number /* the calamity's deaths (V08 §2.6a (4), §3.6; 0 when the dossier gives none): added to the cemeteries' burials of the epoch at its week (V06 §3.18.2 (3); ST-31) */ }\n",
 "// CalamityRef (the entry's `calamity`) is §4.11's (item 573): its `deaths` add to the cemeteries' burials of the epoch at its week (V06 §3.18.2 (3))\n"),
]
t = apply(t, R)
t = strip_narr_ids(t)
# own-section pointers inside §2.2's table rows: bare '(§3.' means this volume's (the column header says so) -> 'V06 §3.'
lines = t.split('\n'); out = []
for L in lines:
    if L.startswith('| `') and '(V06 section)' not in L:
        L = re.sub(r'\(§(3\.\d+)', r'(V06 §\1', L)
        L = re.sub(r'; §(3\.\d+)', r'; V06 §\1', L)
    out.append(L)
t = '\n'.join(out)
save('04-s2a.md', t)
print(words(t))
