from lib import *
t = extract(1163, 1278)
t = strip_narr_ids(t); t = strip_narr_more(t); t = strip_narr_tail(t); t = norm_items(t)
R = [
("its own lineage (the base's; a generated one's is its reason key, critique C6-39 (3)), never re-minted by a village stage.",
 "its own lineage (the base's; a generated one's is its reason key, §4.3, item 290), never re-minted by a village stage."),
("removal by V09's delete or critique C6-39's suppression (a reason key in the log, never V07 state)",
 "removal by V09's delete or the raised ways' suppression (a reason key in the log, §4.3, item 290; never V07 state)"),
("| V11's X17 draw at S2, V02's `layTiers` at S11 |", "| V11 §3.24.3's draw at S2, V02's `layTiers` at S11 |"),
("(item 244 as ST-06 amends it)", "(item 244)"),
("  reason?: string /* a generated way's reason key address (critique C6-39), read by the clerk */;", "  reason?: string /* a generated way's reason key address (§4.3, item 290), read by the clerk */;"),
("auto: true when the intent's planned ↔ organic dial ≥ 0.75 */;", "auto: true when the intent's planned ↔ organic dial ≥ `formRules.organicDialFrom` */;"),
("/* denser and crossroaded: δ × 1.5 and the crossroads weight × 2 (V07 §3.1) */;", "/* denser and crossroaded: δ × `formRules.districtDensity` and the crossroads weight × `formRules.crossroadsWeight` (V07 §3.1) */;"),
("""owner; a strip holding is one toft's long strip in a forest-strip village. `BuildingClassRow` gains
`villageForm?: string` (item 430; item 432): it **names a `v.` class** — the village row that plays this class at
village rungs (V07 §3.11's substitution; the compiler refuses any other target, V11 §2.3 as SS-01 fixes it) — absent meaning
the class plays itself.""",
 """owner; a strip holding is one toft's long strip in a forest-strip village. `BuildingClassRow.villageForm` (§10.2, items
430 and 432) names the `v.` class that plays a class at village rungs (V07 §3.11's substitution; the compiler refuses any
other target, V11 §2.3), absent meaning the class plays itself."""),
("and the upgrade report states the one-time shift |", "and the upgrade report states the one-time shift |"),
]
t = apply(t, R, strict=False)
t = norm_d5(t)
rows = """| `water.proximity` (VS1; item 111) | VS1, from S1's water bodies (the oasis's spring among them) and the well-yield raster, with the climate row's pull radius | VS1's heart score, VS2's `p(x)`, VS5's pass 1 | never (recomputed with VS1) | recomputed with VS1; at an epoch from the water the epoch leaves | — (derived) | — |
| `history.former` (item 113; a refounding) | the kernel's declaration layer, from the destroyed settlement's ruined records | VS1, VS3, VS4, VS6, S10b and S11 at the refounding epoch | never (read from the standing ruined records) | re-read at every derivation of the refounding | — (derived) | absent: no refounding |
| a former town's remnants at village rungs (item 113; V07 §3.12a) | the replay's epochs (V06's engine) and the hand-off down | as the standing fabric's rows above; the clerk (the replay record) | the base's records in their decline states, a symbolic peak's facts with provenance `symbolic` | kept as standing fabric | none: the replay's epochs are the creation prefix, never undo targets (§7.4) | base |
"""
k = t.index('| the new request fields (')
t = t[:k] + rows + t[k:]
save('07-s2d.md', t)
print('ok', len(t.split()))
