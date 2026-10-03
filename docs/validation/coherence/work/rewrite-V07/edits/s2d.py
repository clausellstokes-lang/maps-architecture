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
save('07-s2d.md', t)
print('ok', len(t.split()))
