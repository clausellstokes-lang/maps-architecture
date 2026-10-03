from lib import *
t = extract(2217, 2410)
t = strip_narr_ids(t); t = strip_narr_more(t); t = strip_narr_tail(t); t = norm_items(t); t = norm_d5(t)
t = t.replace("`research/sf/dossier-outputs.md` V07 §3.4, V07 §6", "`research/sf/dossier-outputs.md`, sections 3.4 and 6")
t = t.replace("`research/sf/dossier-outputs.md` V07 §3.4", "`research/sf/dossier-outputs.md`, section 3.4")
R = [
("consults through `LadderRouter` (item 202, the one registration):", "consults through `LadderRouter` (item 202, the one registration):"),
("""thorp (8–60), hamlet (61–400) and village (401–900) and every town from 901 to 1 499 (`research/sf/
mapping.md` T1: 70 of 70 small dossiers and 5 of 38 towns in the surveyed 155)""",
 """thorp (8–60), hamlet (61–400) and village (401–900) and every town from 901 to 1 499 (`research/sf/
mapping.md`'s population survey: 70 of 70 small dossiers and 5 of 38 towns in the surveyed 155)"""),
("`desert` → the arid row, a pond only with\n  `oasis_water`. A bridge-implying record (`Toll bridge`) forces a brook its through road crosses, by V07 §3.1 (1) (item 399\n  at village rungs; `toll_bridge_dry` on a dry `desert` or a fixed isolated access).",
 "`desert` → the arid climate row (V07 §3.1 step 1's `aridWater` shares; the oasis by V07 §3.2 (4a), which\n  `oasis_water` makes exist, DR40). A bridge-implying record (`Toll bridge`) forces a brook its through road crosses, by V08\n  §2.6b (3)'s rule at its village column (V07 §3.1 step 1; E-31; `toll_bridge_dry` where it fails)."),
("council or an elected reeve (chartered commune, T14) →", "council or an elected reeve (chartered commune; V08 §2.6's `government` row set) →"),
("informal clusters appear only under a migration condition (tents at the\n  perimeter, T16),", "informal clusters appear only under a migration condition (tents at the\n  perimeter; V08 §2.6's `conditions` row set),"),
("A custom institution resolves its profile by g's order,", "A custom institution resolves its profile by item 104 (a)'s order (§10.2),"),
("(`compatible`, item 104 (h) (3) as revised by item 107)", "(`compatible`, item 104 (h) (3) with item 107)"),
("(V08 §3.5.1 (d); seam SR6-01)", "(V08 §3.5.1 (d))"),
]
t = apply(t, R, strict=False)
i = t.index('* **DR7 households**'); j = t.index('* **DR9 and DR24 institutions')
seg = t[i:j]
seg = seg.replace('`D = min`', '`N = min`').replace('`D = 4`', '`N = 4`').replace('`D_raw', '`N_raw').replace('`D_raw > max`', '`N_raw > max`')
seg = seg.replace('until `D = max`', 'until `N = max`').replace('until `D = min`', 'until `N = min`').replace('`D_raw < min`', '`N_raw < min`')
seg = seg.replace('`D = D_v + D_o`', '`N = N_v + N_o`')
t = t[:i] + seg + t[j:]
save('12-s3e.md', t)
print('ok', len(t.split()))
