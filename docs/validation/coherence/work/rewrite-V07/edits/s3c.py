from lib import *
t = extract(1807, 2034)
t = strip_narr_ids(t); t = strip_narr_more(t); t = strip_narr_tail(t); t = norm_items(t)
R = [
("— a well,\n   a large tree, a pond (a small decoration pond inside the green, the village pond), a cross, or nothing.",
 "— a well,\n   a large tree, a pond (a small uncarved decoration pond inside the green, V07 §2.4 — not the village pond VS1 carves),\n   a cross, or nothing."),
("""**The moated manor.** When the manor row's moated-site draw (0.25 with water within 150 m, on `siteplan` keyed by the
plot) succeeds, S11 lays two yard parts: a `platform` holding the hall and its chamber block, and a `moat` ring 5–8 m wide
around it,""",
 """**The moated manor.** When the manor row's moated-site draw (`rules.manor.moatChance` with water within `moatWaterM`, on
`siteplan` keyed by the plot) succeeds, S11 lays two yard parts: a `platform` holding the hall and its chamber block, and a
`moat` ring `moatWidthM` wide around it,"""),
("published as levelled ground through the base's S10/S11 levelling output (critique\n   C4-110-7's reading),",
 "published as levelled ground through the base's S10/S11 levelling output (§4.7),"),
("after that it is kept and decays by stretch, so a deserted hillside village keeps its scarps.",
 "after that it is kept and decays by stretch (the stretch-state profile, §2.2 rule 5; V06 §3.19.4), so a deserted hillside\n   village keeps its scarps."),
]
t = apply(t, R, strict=False)
t = t.replace("and item 102's daylight\n   term — terrain and the palisade casting, one pass, never iterated.",
  "and item 102's daylight\n   term × the climate row's sunlight cell — terrain and the palisade casting, one pass, never iterated — with §4.5's water\n   term `w_waterP × prox(x)` (item 111; V07 §3.2 (4a)).")
t = t.replace('`D_v`', '`N_v`')
t = norm_d5(t)
save('10-s3c.md', t)
print('ok', len(t.split()))
