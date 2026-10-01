"""VV12-04 — g item 119's V02 part (J130), and the decision rows J-V2.109 (VV12-08), J-V2.110 (VV12-02), J-V2.111 (VV12-04);
the census."""
import os
S = os.path.dirname(os.path.abspath(__file__))
ORIG = open(os.path.join(S, 'V02.orig.md'), encoding='utf-8').read()

PRE = """**Targets and the comfort level (item 119; §12.1).** The lines of V02 §6.1 – V02 §6.5 are the **targets**, which the build
works to meet and beat. Every one-time wait stage 3 adds to or lengthens completes within the **ten-second comfort level**
of total time, from the click to the complete result on the reference machine, at every rung up to the population cap:
the massing's share of a generate, a regenerate, an open from SettlementForge or a dossier change applied (V02 §6.1's
table: ≈ 72 ms of wall time at the cap); an export under every `compositions` option, its `derive` pass included
(V02 §6.4); an `upgrade` that re-derives S11 for a document from before stage 3, whose massing costs V02 §6.1's rates; and
the load's stage-3 migration rows (V02 §2.5: O(wings) a building, ≈ 1 µs, ≤ 40 ms at the cap). An epoch's stage-3 work (the
mutator's wing step, V02 §6.4, and S11's re-fits) counts inside advance time and the history replay, whose reading of the
comfort level is V06 §6's. A wait past about one second shows progress (§12.1's progress rule: §11.2's `Progress` per stage
or export band, shown by V09 §4.21.9; R12-32). A stage-3 step runs slower than its target only for a recorded measured
gain inside the comfort level — its V11 §3.25.8 `perf.qualitySpend` row (§12.1; R12-33); none is planned, and where no row
stands the fallbacks below are taken. The **interaction budgets keep their values** (item 119 (d); R12-34): a `setMassing`
dry run and commit ≤ 2 ms and a `setComposition` ≤ 1 ms (V02 §6.4), a neighbourhood click's batches streamed centre-out
within ≤ 120 ms of pool time and the `view` tiles' batches of `viewBatchMs` (V02 §6.2). A size the low tier cannot reach
within ten seconds is declared per device (§12.1). T-V2-22 and T-V2-24 hold the comfort level at every rung to the cap.
"""

EXP = """**Exports** — one-time waits (item 119 (a)): glTF, OBJ and CityJSON, written in the generation worker, timed from the click
to the file at every rung; the line is CityJSON's, the slowest format's (glTF and OBJ about a quarter less):

| rung (buildings, §1.1) | `'asDrawn'`: estimate → target | `'derive'`: estimate → target |
|---|---|---|
| TOWN (≈ 1 500) | ≈ 0.2 s → ≤ 0.5 s | ≈ 0.3 s → ≤ 0.6 s |
| CITY (≈ 6 000) | ≈ 0.8 s → ≤ 1.2 s | ≈ 1.1 s → ≤ 1.6 s |
| METROPOLIS (≈ 15 000) | ≈ 1.9 s → ≤ 3 s | ≈ 2.6 s → ≤ 4 s |
| the population cap (≈ 36 000) | ≈ 4.5 s → ≤ 6 s | ≈ 6.3 s → ≤ 8 s |

The estimate per building: ≈ 35 µs for the roofscape's facets (V02 §6.2's mean); ≈ 55 µs (glTF, OBJ) to ≈ 90 µs
(CityJSON) for the wing prisms, roofs and stairs as meshes or surfaces and their encoding (roofs ≈ 8–60 triangles a
building, ≈ 0.4 M triangles at METROPOLIS); `derive` adds `compose()` for each building whose `wings` rung is neither
current nor stored — ≈ 0.1 ms of pool time shared by the three pool workers district by district while the generation
worker writes, ≈ 35 µs of wall time a building — and its dormer and porch meshes, ≈ 15 µs. The village rungs fall below
TOWN's line; a district-band SVG ≤ 1.5 KB per building. Past one second the dialog shows the export's progress band by
band (§11.2's `Progress`; R12-32). **Measured** at M6b at every rung's top and at the population cap (T-V2-24).
**Pre-decided fallbacks, in order:** (a) the roofscape's facets, like `derive`'s compositions, computed on the three pool
workers district by district while the generation worker writes the district before (the same bytes); (b) where the
measurement still cannot hold a format under a `compositions` option within ten seconds at a size, the export dialog
offers it only up to the largest building count the measurement held — above it a `derive` export writes `asDrawn` and a
format that still misses is not offered — naming why in one line (§12.7's print-size rule: a wait past the comfort level
is never offered).
"""

J109 = ("| J-V2.109 | Chose **`valleyReach` to read a `shed` `Y`'s whole run in both modes** (V02 §3.7) over the integer form's "
        "half span for every `Y`, because a single-pitch plane runs from its eave to its high side (`RoofSpec.high`), so the plan "
        "point where `X`'s ridge meets it lies at `(X.ridgeCm − Y.eaveCm) × Y.runCm ÷ Y.riseCm` with the whole span as the run, "
        "and a half-span reach would stop the usable run — the bays, the dormers and the lit windows `facadeBays` feeds — short "
        "of where the drawn valley starts; E-27's two equivalences hold (the integer mode byte-identical on every host, T-V2-13; "
        "the float mode view data), and only a building whose valley ends on a shed reads otherwise (T-V2-54). |")
J110 = ("| J-V2.110 | Chose to apply **item 115's rung ceiling as a cap on a dwelling's resolved row** (V02 §3.2 step 2) — "
        "its families kept to the ceiling row's `dwellingFamilies` and the arrangement's own constructions, its tower, turret "
        "and gate-tower cells zeroed, a grand class's override row skipped, every other cell kept — over capped rows of its own "
        "per rung in `composition.json`, because one filter over the rows already written keeps one source for each fact (V11's "
        "table the limits, `composition.json` the shapes) and leaves every size, roof, dormer, porch and hearth cell free to "
        "carry the wealth item 115 (a) asks small places to show; over mapping a drawn grand family down the reverse lattice "
        "after the draw, because that would pile the grand families' weight onto `T` and `L` instead of keeping the row's own "
        "proportions among the admitted families; and to record the cap's rung in `MassingRef.row` (`~<RUNG>`) over re-reading "
        "the present rung at every re-derivation, because a standing building keeps the ceiling it was built under across a "
        "rung change (item 115 (e); V06 §3.8.5) and the key is already the persisted record of what the chain reached. A row "
        "that limits nothing writes no suffix, so TOWN and above stay byte-identical (item 115 (f)). |")
J111 = ("| J-V2.111 | Chose to **re-budget V02 §6.4's exports to the population cap inside item 119's ten seconds** — "
        "CityJSON `asDrawn` ≤ 3 s at METROPOLIS and ≤ 6 s at the cap, `derive` ≤ 4 s and ≤ 8 s, from the per-building costs of "
        "the roofscape, the meshes and their encoding and the pooled `compose()` — with the pre-decided change that a format "
        "or a `derive` the measurement cannot hold within ten seconds is offered only up to the building count it held, over "
        "keeping METROPOLIS's former lines of 10 s and 12 s, because those lines scaled to the cap's ≈ 36 000 buildings pass "
        "the comfort level, past which a wait fails (item 119 (a)); and over a switch by the clock at run time, because a "
        "budget never changes output at run time (§12.1), so the limit is fixed by the measurement and one document exports "
        "the same way on every machine of the reference tier (the low tier declaring its sizes per device). |")


def add(E):
    # §6 — the targets and the comfort level
    E('VV12-04 §6 preamble',
      "cost note's assumed core mix (row quads, single ranges, tiled multi-wing massings, massings with towers).\n\n### 6.1 The massing",
      "cost note's assumed core mix (row quads, single ranges, tiled multi-wing massings, massings with towers).\n\n" + PRE +
      "\n### 6.1 The massing")
    E('VV12-04 §6.1 (c)',
      "(c) the base's own intake fallback (§2.6): the base\n"
      "outline builder makes the outline and `compose()` works inside it (the composer then adds only dormer rows and the porch),\n"
      "reported as \"stage-3 massing withdrawn at this rung\" for the owner's veto (D-18).",
      "(c) the rest of §2.6's stage-3 intake fallback: the\n"
      "generator's massing step alone (its wings without roofs or rooms), then the base outline builder making the outline with\n"
      "`compose()` working inside it (the composer then adding only dormer rows and the porch), reported as \"stage-3 massing\n"
      "withdrawn at this rung\" (§12.10's R12-22).")
    # §6.4 — the edit lines kept; the exports re-budgeted to the cap
    old_exp_start = ORIG.index("* **Exports at METROPOLIS:**")
    old_exp_end = ORIG.index("\n\n### 6.5 Stacks and deck buildings")
    old_exp = ORIG[old_exp_start:old_exp_end]
    assert old_exp.endswith("reported."), old_exp[-40:]
    E('VV12-04 §6.4 edits', "≤ 1 ms; the mutator's wing step ≤ 150 µs per building plus S11's re-fit — inside §12.6's per-edit laws, which count them.\n",
      "≤ 1 ms; the mutator's wing step ≤ 150 µs per building plus S11's re-fit — inside §12.6's per-edit laws, which count them.\n"
      "  These edit lines are interaction budgets, which item 119 leaves as they are (item 119 (d)).\n\n")
    E('VV12-04 §6.4 exports', old_exp, EXP.rstrip('\n'))
    # T-V2-22, T-V2-24 and T-V2-22's registration
    E('VV12-04 T-V2-22', "roofscape ≤ 25 µs median and ≤ 8 ms per district-band tile) — nightly; milestone at METROPOLIS.",
      "roofscape ≤ 25 µs median and ≤ 8 ms per district-band tile) — nightly; milestone at METROPOLIS. **And every one-time\n"
      "  wait stage 3 adds to or lengthens** — the massing's share of a generate, a regenerate, an open and a dossier change,\n"
      "  an `upgrade`, the load's stage-3 migration rows — **completes within ten seconds from the click at every rung's top and\n"
      "  at the population cap** (V12 §3.15.9's wait timer, T119-2; the stage-3 share reported beside each wait; the cap at the\n"
      "  milestone).")
    E('VV12-04 T-V2-24', "an\n  export with `derive` equals, byte for byte, one made with `asDrawn` after every building was clicked.",
      "an\n  export with `derive` equals, byte for byte, one made with `asDrawn` after every building was clicked (below V02 §6.4's\n"
      "  measured limit); **and at every rung's top and at the population cap each format under each `compositions` option\n"
      "  completes within ten seconds from the click to the file written** (V12 §3.15.9's wait timer, five seeds each; R12-31),\n"
      "  its first progress frame within one second where it runs longer (R12-32), a size above the measured limit taking\n"
      "  V02 §6.4's fallback (b), named.")
    E('VV12-04 T-V2-22 registration',
      "| T-V2-22 | V02 §6.1's four times, then V02 §6.2's four (`ms`) | B-CITY, every rung | `nightly` | the M6b seat (`viewBatchMs`) |",
      "| T-V2-22 | V02 §6.1's four times, then V02 §6.2's four, then each stage-3 one-time wait's p95 from the click (`ms`) | B-CITY, every rung and the population cap | `nightly` | the M6b seat (`viewBatchMs`) |")
    # §0 — speed in plain words
    E('VV12-04 §0 speed',
      "(about 3 % of its time); the roof detail of a neighbourhood arrives within about a tenth of a second of the click.",
      "(about 3 % of its time); the roof detail of a neighbourhood arrives within about a tenth of a second of the click.\n"
      "Every wait you sit through once — a new map, an export with every building's detail, an upgrade — ends within ten\n"
      "seconds at every size up to the largest metropolis (item 119), and dragging, clicking and editing stay as quick as\n"
      "before.")

    # §9 — the three decision rows after J-V2.108
    line108 = next(l for l in ORIG.split('\n') if l.startswith('| J-V2.108 |'))
    E('J rows', line108 + '\n', line108 + '\n' + J109 + '\n' + J110 + '\n' + J111 + '\n')
    # §12's census
    E('census', "decisions J-V2.1 – J-V2.108 (108 rows, J-V2.58, J-V2.73 and J-V2.76 marked); tests T-V2-1 – T-V2-57 (57 bars);",
      "decisions J-V2.1 – J-V2.111 (111 rows, J-V2.58, J-V2.73 and J-V2.76 marked); tests T-V2-1 – T-V2-58 (58 bars);")
