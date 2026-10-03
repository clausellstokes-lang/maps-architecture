from lib import *
t = extract(2746, 2943)
t = strip_narr_ids(t); t = strip_narr_more(t); t = strip_narr_tail(t); t = norm_items(t); t = norm_d5(t)
t = t.replace('first paint', 'first map')
R = [
("(§6.1, §6.3; §7.7 item 6,\nJ-A22.76; TW-01, J-V7.129)", "(§6.1, §6.3; §7.7 item 6,\nJ-A22.76; J-V7.129)"),
("the dwellings `D = round(P ÷ that draw)`", "the dwellings `N = round(P ÷ that draw)`"),
("written by V11 §2.2's rule; the same-kind spacing at 0", "written by V11 §2.2's rule; the same-kind spacing at 0"),
("its piers are bare plank piers); the title plate's population rounded to\n10 (V07 §5.3);",
 "its piers are bare plank piers); item 111's terms neutral (`heart.pull` 0 and VS2's `p` 0, `rules.aridWater` 1; VG has no\nclimate row) and item 113's replay off (no `history.former`); the title plate's population rounded to\n10 (V07 §5.3);"),
("**The preset file and its entries** (J-V7.119, J-V7.120).", "**The preset file and its entries** (J-V7.119, J-V7.120)."),
("(2) V11's five entries above, written by V11 §2.2's rule (V11 W68);", "(2) V11's five entries above, written by V11 §2.2's rule;"),
("""**Arch vaults**: V04's arch-vault source (its `vaults` system,
critique C4-110-3) is registered at every village rung for the spans of a raised way standing on the map (V07 §3.5a (7)) —
the only vault source at village rungs; until V04 states the hinterland condition, for the spans inside the perimeter
only (V07 §1, dependency (5)) — and V04's support and footing reach (critique C4-110-5: a void element within reach of a
support or of a retaining wall's footing is created collapsed) applies as V04 states it.""",
 """**Arch vaults**: V04's arch-vault source (its `vaults` system,
V04 §3.5.4) is registered at every village rung for the spans of a raised way standing on the map (V07 §3.5a (7)) — the only
vault source at village rungs; §2.7's span rule leaves every span over hinterland faces open (`country`, J-C4) — and V04's
support and footing reach (V04 §3.5.4: a void element within reach of a support or of a retaining wall's footing is created
collapsed) applies as V04 states it."""),
("(V04's monument rule,\ncritique C4-110-8; V02 §3.15.6; J-V7.94)", "(V04's monument rule,\nV04 §3.5.0a; V02 §3.15.6; J-V7.94)"),
]
t = apply(t, R, strict=False)
save('14-s3g.md', t)
print('ok', len(t.split()))
