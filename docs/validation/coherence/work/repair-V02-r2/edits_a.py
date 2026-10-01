# edits_a — the round-2 issues other than the owner items (coherence/repair-V02-r2).
# Each edit: (tag, old, new, count). `old` must occur exactly `count` times in the text as it stands.
# Tags name the issue ids each edit closes.

def build(text):
    E = []

    # VAF-R0S-03 = VM-R1T-05 (adjudication-r2 R2-13): V02 §2.2 cites §2.6's DormerRow, DormerKind and PorchKind.
    E.append(('VAF-R0S-03/VM-R1T-05 §2.2 lead',
        "`Wing.base`, `Wing.dormerRows`, `ComposedTower.base`, `Porch.kind`, `Composition.row` and `.grammar` are declared at §2.6\n"
        "(items 218–220): a composed wing and a composed tower take their ring, heights, roof and spans from the base wing they\n"
        "name — the composition never re-shapes the massing (J-V2.2, J-V2.6). This volume declares the rest:",
        "`Wing.base`, `Wing.dormerRows`, `ComposedTower.base`, `Porch.kind`, `Composition.row` and `.grammar` are declared at §2.6\n"
        "(items 218–220), and `DormerRow`, `DormerKind` and `PorchKind` are §2.6's: a composed wing and a composed tower take\n"
        "their ring, heights, roof and spans from the base wing they name — the composition never re-shapes the massing\n"
        "(J-V2.2, J-V2.6). This volume declares the rest:", 1))
    s = text.index("```ts\ninterface DormerRow {\n")
    e = text.index("interface CompositionStage3Fields {\n", s)
    old = text[s:e]
    assert old.count('\n') == 12, old.count('\n')   # the fence line, DormerRow's 8 lines, DormerKind's 3 lines
    E.append(('VAF-R0S-03/VM-R1T-05 §2.2 code', old, "```ts\n", 1))

    # VAF-R0S-03 = VM-R1T-05: V02 §2.6 cites §2.7's TierLay and LaidWing.
    s = text.index("interface LaidWing { ring: PointCm[]; kind: 'rect' | 'polygon';")
    e = text.index("interface TierFailure {", s)
    old = text[s:e]
    assert old.count('\n') == 2 and old.startswith('interface LaidWing') and '\ninterface TierLay {' in old
    E.append(('VAF-R0S-03/VM-R1T-05 §2.6 code', old, "// `TierLay` and `LaidWing` are §2.7's (V02 §3.15.1 lays them)\n", 1))

    # VAF-R1T-01 (blocker; R2-16): §4.5's one discrete-cell rule, at V02 §3.10.1, §2.3 (l.453) and §3.2 step 3 (l.815).
    E.append(('VAF-R1T-01 §3.10.1',
        "rich** — the same anchors as the templates whose budgets it must meet; `squalid` reads the poor row and `comfortable`\n"
        "the cell-wise interpolation of modest and prosperous at its band centre (V11 §3.6.1's derivation, one band-anchoring\n"
        "rule for every template-like table). Continuous cells interpolate along the value; a discrete cell takes the richer\n"
        "anchor's value from the band's upper half (J-A19.43's switch at the cut). A class the class mix never places at a band\n"
        "still has its row",
        "rich** — the same anchors as the templates whose budgets it must meet; `squalid` reads the poor row and `comfortable`\n"
        "the modest row for its discrete cells and the cell-wise interpolation of modest and prosperous at its band centre for its\n"
        "continuous cells (§4.5's band-set paragraph and its discrete-cell rule — one band-anchoring rule for every template-like\n"
        "table). Continuous cells interpolate along the value. A class the class mix never places at a band still has its row", 1))
    E.append(('VAF-R1T-01 §2.3 CompositionRow comment',
        "continuous cells interpolate along the prosperity value between band centres (§4.5), discrete cells switch at the cut (item 19)\n",
        "continuous cells interpolate along the prosperity value between band centres (§4.5), discrete cells read §4.5's discrete-cell rule (item 19)\n", 1))
    E.append(('VAF-R1T-01 §3.2 step 3',
        "   (§4.5's interpolation), discrete cells switch at the cut (item 19; J-A19.43). The district's band range (item 72,\n",
        "   (§4.5's interpolation), discrete cells read §4.5's discrete-cell rule (item 19). The district's band range (item 72,\n", 1))

    # VAH-r1-13 (R2-10): WhyAnswer is §11.2's.
    E.append(('VAH-r1-13 §4.5',
        "filling V10's `WhyAnswer` with no new field:",
        "filling §11.2's `WhyAnswer` with no new field:", 1))

    # VV12-r1-05 (the issue's second option, Part H): the export estimate cites §6.2's median and p99.
    E.append(('VV12-r1-05 §6.4',
        "The estimate per building: ≈ 35 µs for the roofscape's facets (V02 §6.2's mean); ≈ 55 µs (glTF, OBJ) to ≈ 90 µs\n",
        "The estimate per building: ≈ 35 µs for the roofscape's facets (V02 §6.2's ≤ 25 µs median with its ≤ 150 µs p99\n"
        "tail); ≈ 55 µs (glTF, OBJ) to ≈ 90 µs\n", 1))
    return E
