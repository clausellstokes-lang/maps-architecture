from lib import *
t = extract(3082, 3223)
t = strip_narr_ids(t); t = strip_narr_more(t); t = strip_narr_tail(t); t = norm_items(t); t = norm_d5(t)
t = t.replace('first paint', 'first map')
R = [
("the tick side toward the low end (critique-V1 I110-2);", "the tick side toward the low end;"),
("""item 110's `retaining_wall`, `way.stair`, `way.ramp`, `raised.deck`, `raised.support`, `raised.ruin` and
`aqueduct.channel` (or the base's names once the coherence pass fixes them), and the pin symbols `stocks` and `maypole`""",
 """and the pin symbols `stocks` and `maypole`"""),
("""* **Item 110's structures** (J-V7.93; geometry only, our cells).""",
 """* **Item 110's structures** (J-V7.93; geometry only, our cells). They draw by the base's programs `retaining`, `raisedWay`,
  `way.stair` (its stair and ramp intervals) and `ruin` (§8.2), in this family's forms below; they add no role."""),
("removed, `docs/improvements/vg.md` V07 §4 (2)).", "removed, `docs/improvements/vg.md`, section 4 (2))."),
("the registry's completeness test covers it.", "the registry's completeness test covers it. An oasis, its spring, grove and gardens export by the base's mapping\n(§11.1; item 111), and a fact the effective peak sized carries its `symbolic` provenance into every export (§2.8; item 113)."),
]
t = apply(t, R, strict=False)
t = t.replace("`wall` layer's \"show circuit\" option (V09's) traces them", "`wall` layer's \"show circuit\" option (`LayerSpec.showCircuit`, §8.4, item 413; V09's control) traces them")
t = t.replace('## 6 Performance budgets', '').rstrip() + '\n'
save('17-s5.md', t)
print('ok', len(t.split()))
