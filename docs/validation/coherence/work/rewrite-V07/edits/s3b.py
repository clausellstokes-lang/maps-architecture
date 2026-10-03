from lib import *
t = extract(1512, 1806)
t = strip_narr_ids(t); t = strip_narr_more(t); t = strip_narr_tail(t); t = norm_items(t)
R = [
# §3.3: bandWeight read (WGAP-2), the water pull p(x) and the climate cell (item 111)
("w(x) = waterTerm · max(0, 1 − d_water(x) ÷ waterReachM)                      // drawn to the water's edge\ns(x) = sunTerm · (D(x) − D̄)                                                   // item 102, the village reading: the settlement prefers the sunny ground",
 "w(x) = waterTerm · max(0, 1 − d_water(x) ÷ waterReachM)                      // drawn to the water's edge\np(x) = w_water · prox(x)                                                      // item 111 (b): the water pull, the climate row's weight (V07 §3.2 (4a))\ns(x) = sunTerm · c_sun · (D(x) − D̄)                                           // item 102, the village reading: the settlement prefers the sunny ground; c_sun the climate row's sunlight cell (item 111 (c))"),
("density(x) = smoothstep(clamp(δ · (q + r + w + s + g + f + n − 1), 0, 1)); 0 in water",
 "density(x) = smoothstep(clamp(δ · (bandWeight · q + r + w + p + s + g + f + n − 1), 0, 1)); 0 in water"),
("Under the `VG` preset `w`, `s`, `g`, `f` and `n` are 0,", "Under the `VG` preset `w`, `p`, `s`, `g`, `f` and `n` are 0,"),
("With `q = 1` the heart reaches", "With `q = 1` (`bandWeight` 1) the heart reaches"),
# §3.4: the pull and section cells (WGAP-1)
("each vertex is pulled up to 10 m toward the highest ground\n   in its normal band,", "each vertex is pulled up to `palisade.pullM` (10 m) toward the highest ground\n   in its normal band,"),
("""   kind's section: `palisade` (timber stakes, 300 cm, 40 cm thick), `earthwork` (a bank 4 m wide and 180 cm high with its
   ditch 3 m wide outside), `inner` (a small stone circuit, 500 cm, 120 cm thick, `material: 'stone'` — the one masonry
   enceinte of a village, J-V7.15).""",
 """   kind's section (`palisade.heightCm`, `palisade.section`; V07 §2.2): `palisade` (timber stakes, 300 cm, 40 cm thick),
   `earthwork` (a bank 4 m wide and 180 cm high with its ditch 3 m wide outside), `inner` (a small stone circuit, 500 cm,
   120 cm thick, `material: 'stone'` — the one masonry enceinte of a village, J-V7.15)."""),
# §3.5: the track's least limit cell (WGAP-1 wiring of trailMinShare)
("`track` stops when its length passes its limit `branchSpacingM ÷ max(F4, 0.05)` (never below `branchSpacingM`, heavy\n   tailed),",
 "`track` stops when its length passes its limit `branchSpacingM ÷ max(F4, 0.05)` (never below `network.trailMinShare ·\n   branchSpacingM`, heavy tailed),"),
("**The rung gate on the router** (item 110 (b) as revised ~23:40: generated raised ways", "**The rung gate on the router** (item 110 (b): generated raised ways"),
# §3.5a
("### 3.5a A raised way on a village map (item 110 (b) as revised ~23:40; J-V7.83)", "### 3.5a A raised way on a village map (item 110 (b); J-V7.83)"),
("so `D_v` stays exact.", "so `N_v` stays exact."),
("""**(7) The spans.** V04's arch-vault source is registered at every village rung (V07 §3.16 (1); critique C4-110-3: "Arch
vaults follow their raised way at every rung"); V04's span rule decides whether each span is open or vaulted, with one
condition asked of V04 (V07 §1, dependency (5)): a span over a hinterland face — field, meadow, common, pasture or wood —
stays open at every rung, as arches across open country were never vaulted. Inside the perimeter the strip holds no
plot, so a vault there is `storage` by V04's chamber row and holds an institution only by declaration. The street-vault
and bridge-vault sources keep their TOWN gate. This replaces the 23:23 note's "no vault stage … the spans stay open".""",
 """**(7) The spans.** V04's arch-vault source is registered at every village rung (V07 §3.16 (1); V04 §3.5.4); §2.7's span
rule (item 244) decides whether each span is open or vaulted, and a span whose under-deck strip lies wholly on hinterland
faces — field, meadow, common, pasture, wood — is `open` with reason `country` at every rung, as arches across open
country were never vaulted (J-C4). Inside the perimeter the strip holds no plot, so a vault there is `storage` by V04's
chamber row and holds an institution only by declaration. The street-vault and bridge-vault sources keep their TOWN gate."""),
("(a basin by\ndefault; critique V1C-85's reading); a cistern terminal comes only by declaration (V04's terminal cistern, critique\nC4-110-6).",
 "(a basin by\ndefault; V01 §3.17.8); a cistern terminal comes only by declaration (V04's terminal cistern, V04 §3.5.4)."),
("`crossing` reads part-0 bridges and fords only (as\ncritique-V1 I110R-4 reads bridgeheads).", "`crossing` reads part-0 bridges and fords only (as\nV01 §3.5.3 reads bridgeheads)."),
("""* **Removal** is V09's delete of a declared way (the declaration's inverse) or, for a carried generated way, critique
  C6-39's suppression (its reason key in the log),""",
 """* **Removal** is V09's delete of a declared way (the declaration's inverse) or, for a carried generated way, the raised
  ways' suppression (its reason key in the log; §4.3, item 290),"""),
("under it go in the same commit (critique C4-110-3).", "under it go in the same commit (V04 §3.5.4)."),
]
t = apply(t, R, strict=False)
t = t.replace('`D_v`', '`N_v`')
t = norm_d5(t)
save('09-s3b.md', t)
print('ok', len(t.split()))
