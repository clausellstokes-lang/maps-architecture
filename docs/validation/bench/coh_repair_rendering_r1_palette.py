#!/usr/bin/env python3
"""coh_repair_rendering_r1_palette.py — coherence repair round 1 (rendering): the new roles of g items 114, 117 and 118.

Computes, for the three shipped families (ink, lit, hatched), the values of the roles §8.2 adds — `ice`, the eight leaf
colours `leaf.<colour>`, the six patch looks `patch.<material>` and the festival roles `festival.a`–`festival.d`,
`festival.sacred` — and checks every contrast-matrix pair §8.2 states for them, and, for the record, each new
categorical set under simulated protanopia, deuteranopia and tritanopia against `cvdContrastMin` (the wall states'
greyscale bar is coh_repair_rendering_r1_looks.py's) (Machado, Oliveira and Fernandes 2009, severity 1.0, applied in linear
sRGB). Our own code from the published definitions (CIELAB D65, CIEDE2000 per Sharma, Wu and Dalal 2005). stdlib only.
usage: python3 coh_repair_rendering_r1_palette.py > coh_repair_rendering_r1_palette.out
"""
import math

# ---------- colour science ----------
def hex2rgb(h):
    h = h.lstrip('#'); return tuple(int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))
def rgb2hex(c):
    return '#' + ''.join('%02X' % max(0, min(255, round(v * 255))) for v in c)
def lin(v): return v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4
def gam(v): return 12.92 * v if v <= 0.0031308 else 1.055 * v ** (1 / 2.4) - 0.055
M = ((0.4124564, 0.3575761, 0.1804375), (0.2126729, 0.7151522, 0.0721750), (0.0193339, 0.1191920, 0.9503041))
MI = ((3.2404542, -1.5371385, -0.4985314), (-0.9692660, 1.8760108, 0.0415560), (0.0556434, -0.2040259, 1.0572252))
WN = (0.95047, 1.0, 1.08883)
def f(t): return t ** (1 / 3) if t > 216 / 24389 else (24389 / 27 * t + 16) / 116
def fi(t): return t ** 3 if t ** 3 > 216 / 24389 else (116 * t - 16) / (24389 / 27)
def rgb2lab(c):
    l = [lin(v) for v in c]
    xyz = [sum(M[i][j] * l[j] for j in range(3)) for i in range(3)]
    fx, fy, fz = (f(xyz[i] / WN[i]) for i in range(3))
    return (116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz))
def lab2rgb(L, a, b):
    fy = (L + 16) / 116; fx = fy + a / 500; fz = fy - b / 200
    xyz = (fi(fx) * WN[0], fi(fy) * WN[1], fi(fz) * WN[2])
    l = [sum(MI[i][j] * xyz[j] for j in range(3)) for i in range(3)]
    return tuple(gam(max(0.0, min(1.0, v))) for v in l), all(-1e-4 <= v <= 1 + 1e-4 for v in l)
def lch(L, C, hdeg): return (L, C * math.cos(math.radians(hdeg)), C * math.sin(math.radians(hdeg)))
def chroma(lab): return math.hypot(lab[1], lab[2])
def de2000(l1, l2):
    L1, a1, b1 = l1; L2, a2, b2 = l2
    C1 = math.hypot(a1, b1); C2 = math.hypot(a2, b2); Cb = (C1 + C2) / 2
    G = 0.5 * (1 - math.sqrt(Cb ** 7 / (Cb ** 7 + 25 ** 7)))
    a1p, a2p = (1 + G) * a1, (1 + G) * a2
    C1p, C2p = math.hypot(a1p, b1), math.hypot(a2p, b2)
    h1p = math.degrees(math.atan2(b1, a1p)) % 360; h2p = math.degrees(math.atan2(b2, a2p)) % 360
    dLp = L2 - L1; dCp = C2p - C1p
    if C1p * C2p == 0: dhp = 0
    else:
        dhp = h2p - h1p
        if dhp > 180: dhp -= 360
        elif dhp < -180: dhp += 360
    dHp = 2 * math.sqrt(C1p * C2p) * math.sin(math.radians(dhp / 2))
    Lbp = (L1 + L2) / 2; Cbp = (C1p + C2p) / 2
    if C1p * C2p == 0: hbp = h1p + h2p
    elif abs(h1p - h2p) <= 180: hbp = (h1p + h2p) / 2
    elif h1p + h2p < 360: hbp = (h1p + h2p + 360) / 2
    else: hbp = (h1p + h2p - 360) / 2
    T = (1 - 0.17 * math.cos(math.radians(hbp - 30)) + 0.24 * math.cos(math.radians(2 * hbp))
         + 0.32 * math.cos(math.radians(3 * hbp + 6)) - 0.20 * math.cos(math.radians(4 * hbp - 63)))
    dth = 30 * math.exp(-((hbp - 275) / 25) ** 2)
    Rc = 2 * math.sqrt(Cbp ** 7 / (Cbp ** 7 + 25 ** 7))
    SL = 1 + 0.015 * (Lbp - 50) ** 2 / math.sqrt(20 + (Lbp - 50) ** 2); SC = 1 + 0.045 * Cbp; SH = 1 + 0.015 * Cbp * T
    RT = -math.sin(math.radians(2 * dth)) * Rc
    return math.sqrt((dLp / SL) ** 2 + (dCp / SC) ** 2 + (dHp / SH) ** 2 + RT * (dCp / SC) * (dHp / SH))
def lerp(c1, c2, t): return tuple(c1[i] + (c2[i] - c1[i]) * t for i in range(3))
def lerp_lin(h1, h2, t):   # role lerps are taken in linear light, as the derived @night values are
    a, b = hex2rgb(h1), hex2rgb(h2)
    return rgb2hex(tuple(gam(lin(a[i]) + (lin(b[i]) - lin(a[i])) * t) for i in range(3)))
def L(h): return rgb2lab(hex2rgb(h))[0]
def grey(h):   # the swatch reduced to its CIE L* grey
    return (L(h), 0.0, 0.0)
MOF = {  # Machado, Oliveira, Fernandes (2009), severity 1.0, linear RGB
    'protan': ((0.152286, 1.052583, -0.204868), (0.114503, 0.786281, 0.099216), (-0.003882, -0.048116, 1.051998)),
    'deutan': ((0.367322, 0.860646, -0.227968), (0.280085, 0.672501, 0.047413), (-0.011820, 0.042940, 0.968881)),
    'tritan': ((1.255528, -0.076749, -0.178779), (-0.078411, 0.930809, 0.147602), (0.004733, 0.691367, 0.303900)),
}
def sim(h, kind):
    l = [lin(v) for v in hex2rgb(h)]
    m = MOF[kind]
    o = [max(0.0, min(1.0, sum(m[i][j] * l[j] for j in range(3)))) for i in range(3)]
    return rgb2lab(tuple(gam(v) for v in o))

# ---------- the shipped values the new roles sit beside (§8.2's role table) ----------
FAM = {
    'ink': dict(paper='#F7EAD3', road='#F7EAD3', ground='#E8CFA6', building='#AE947B', ink='#2D2219', wall='#2D2219',
                water='#9ABDD1', green='#B4CC94', garden='#C4CF96', tree='#70946A', field='#F5DEA0', snow='#FFFFFF',
                plank='#B39B78', tree_autumn='#9A8A5E', cap=34),
    'lit': dict(paper='#F7EAD3', road='#DDCFC1', ground='#D4B78F', building='#BD855B', ink='#2C2218', wall='#8B7964',
                water='#2DA0D3', green='#8AB85D', garden='#7BAF43', tree='#447F33', field='#E3BC5D', snow='#FFFFFF',
                plank='#9A7650', tree_autumn='#B8782F', cap=60),
    'hatched': dict(paper='#F7EAD3', road='#C4A683', ground='#F7EAD3', building='#B9723D', ink='#2C2218', wall='#74593D',
                    water='#71B4D3', green='#A9B951', garden='#9DB541', tree='#5E9434', field='#F3D580', snow='#FFFFFF',
                    plank='#A07A4C', tree_autumn='#B0843C', cap=60),
}
# wall-material roles (§8.2's table): ink derives them; lit and hatched state them
WALLMAT = {
    'ink': dict(dry_stone='#2D2219', earth_bank=lerp_lin('#E8CFA6', '#2D2219', 0.30), timber_crib='#B39B78'),
    'lit': dict(dry_stone='#8E8574', earth_bank='#9C8460', timber_crib='#8A6A45'),
    'hatched': dict(dry_stone='#7E6A50', earth_bank='#8C7450', timber_crib='#7A5A38'),
}

# ---------- the chosen values (our own; calibratable rows) ----------
ICE = {'ink': '#DCE6EA', 'lit': '#C9E1EC', 'hatched': '#D3E5EC'}
# leaf colours: CIELCh hue per colour name, our own; L* per family; chroma min(nominal, the family cap)
LEAF_H = dict(gold=88, amber=72, orange=58, scarlet=36, crimson=22, russet=48, bronze=66, brown=60)
LEAF_C = dict(gold=62, amber=60, orange=62, scarlet=58, crimson=50, russet=42, bronze=36, brown=26)
LEAF_L = dict(gold=72, amber=64, orange=58, scarlet=48, crimson=45, russet=48, bronze=54, brown=46)
LEAF_DL = {'ink': 8, 'lit': 0, 'hatched': 4}   # ink's lighter, restrained figures
FEST_H = {'festival.a': 28, 'festival.b': 85, 'festival.c': 255, 'festival.d': 160, 'festival.sacred': 300}
FEST_C = {'festival.a': 55, 'festival.b': 60, 'festival.c': 45, 'festival.d': 40, 'festival.sacred': 35}
FEST_L = {'festival.a': 45, 'festival.b': 58, 'festival.c': 45, 'festival.d': 50, 'festival.sacred': 40}
PATCH_BASE = {   # the patch looks' tones before the lightness rule: (role, lerp toward, share)
    'patch.timber': ('plank', None, 0), 'patch.wattle': ('plank', 'ground', 0.25), 'patch.earth': ('earth_bank', None, 0),
    'patch.drystone': ('dry_stone', None, 0), 'patch.stakes': ('plank', 'ink', 0.15), 'patch.brush': ('tree', 'ground', 0.5),
}

out = []
def p(*a): out.append(' '.join(str(x) for x in a))
fails = 0
def check(fam, a, b, ha, hb, de_min, dl_min=None):
    global fails
    la, lb = rgb2lab(hex2rgb(ha)), rgb2lab(hex2rgb(hb))
    de = de2000(la, lb); dl = abs(la[0] - lb[0])
    ok = de >= de_min and (dl_min is None or dl >= dl_min)
    if not ok: fails += 1
    p(f'  {fam:8s} {a:16s}/ {b:16s} dE2000 {de:5.1f} (>= {de_min})' + (f'  dL* {dl:5.1f} (>= {dl_min})' if dl_min else '') + ('' if ok else '   FAIL'))

values = {}
for fam, R in FAM.items():
    v = {}
    v['ice'] = ICE[fam]
    for name in LEAF_H:
        Lv = LEAF_L[name] + LEAF_DL[fam]; Cv = min(LEAF_C[name], R['cap'] - 1)
        rgb, ok = lab2rgb(*lch(Lv, Cv, LEAF_H[name]))
        while not ok and Cv > 5:   # pull chroma until the colour is inside sRGB
            Cv -= 1; rgb, ok = lab2rgb(*lch(Lv, Cv, LEAF_H[name]))
        v['leaf.' + name] = rgb2hex(rgb)
    for name in FEST_H:
        Cv = min(FEST_C[name], R['cap'] - 1); Lv = FEST_L[name]
        rgb, ok = lab2rgb(*lch(Lv, Cv, FEST_H[name]))
        while not ok and Cv > 5:
            Cv -= 1; rgb, ok = lab2rgb(*lch(Lv, Cv, FEST_H[name]))
        v[name] = rgb2hex(rgb)
    # patch looks: the material's base tone, lifted toward paper (linear light, steps of 0.05) until L* >= wall L* + 15,
    # then capped where its grey CIEDE2000 against `ground` would fall under 11 (the cap coh_repair_rendering_r1_looks.py's
    # state renders need), hue and chroma kept
    gL = L(R['ground']); wallL = L(R['wall'])
    cap = max(Lc for Lc in range(0, 101) if de2000((Lc, 0, 0), (gL, 0, 0)) >= 11 and Lc < gL)
    for name, (role, toward, share) in PATCH_BASE.items():
        base = WALLMAT[fam].get(role) or R[role]
        if toward: base = lerp_lin(base, R[toward], share)
        tt = 0.0; b0 = base
        while L(base) < wallL + 15 and tt < 1:
            tt = round(tt + 0.05, 2); base = lerp_lin(b0, R['paper'], tt)
        if L(base) > cap:
            la = rgb2lab(hex2rgb(base)); Cc = chroma(la); hh = math.atan2(la[2], la[1])
            while True:
                rgb, ok = lab2rgb(cap, Cc * math.cos(hh), Cc * math.sin(hh))
                if ok or Cc < 0.5: break
                Cc -= 0.5
            base = rgb2hex(rgb)
        v[name] = base
    values[fam] = v

p('# new role values (sRGB), per family; the patch looks lifted to L* >= wall + 15, then capped against ground (coh_repair_rendering_r1_looks.py)')
for fam, v in values.items():
    p(f'[{fam}]')
    for k, h in v.items():
        if k.endswith('#lift'): continue
        lab = rgb2lab(hex2rgb(h))
        extra = ''
        p(f'  {k:16s} {h}  L* {lab[0]:5.1f}  C* {chroma(lab):5.1f}{extra}')

p('\n# contrast-matrix pairs §8.2 adds (every shipped family)')
for fam, R in FAM.items():
    v = values[fam]
    check(fam, 'ice', 'water', v['ice'], R['water'], 10, 8)
    check(fam, 'ice', 'road', v['ice'], R['road'], 6)
    check(fam, 'ice', 'ground', v['ice'], R['ground'], 6)
    for name in LEAF_H:
        check(fam, 'leaf.' + name, 'water', v['leaf.' + name], R['water'], 10)
        check(fam, 'ink', 'leaf.' + name, R['ink'], v['leaf.' + name], 25, 30)
    for name in PATCH_BASE:
        check(fam, name, 'wall', v[name], R['wall'], 8)
        check(fam, name, 'ground', v[name], R['ground'], 10)
    for name in FEST_H:
        check(fam, name, 'road', v[name], R['road'], 15)
        check(fam, name, 'ground', v[name], R['ground'], 15)

p('\n# the leaf colours keep the family chroma cap (ink: < 34; lit, hatched: < 60)')
for fam, R in FAM.items():
    mx = max(chroma(rgb2lab(hex2rgb(values[fam]['leaf.' + n]))) for n in LEAF_H)
    ok = mx < R['cap']
    if not ok: fails += 1
    p(f'  {fam:8s} max leaf C* {mx:5.1f}' + ('' if ok else '  FAIL'))

CVD_MIN = 10
p(f'\n# information (no bar): the leaf and festival colours under simulated deficiency. Neither set encodes a category a legend')
p('#   distinguishes — a leaf colour is a look, a decoration is told by its glyph (item 118 (f)) — so T112-1 does not read them;')
p(f'#   the least pair is listed against cvdContrastMin = {CVD_MIN} for the record')
for fam in FAM:
    v = values[fam]
    for setname, keys in (('leaf', ['leaf.' + n for n in LEAF_H]), ('festival', list(FEST_H))):
        for kind in MOF:
            worst = min(((de2000(sim(v[a], kind), sim(v[b], kind)), a, b) for i, a in enumerate(keys) for b in keys[i + 1:]))
            p(f'  {fam:8s} {setname:8s} {kind}: least pair dE2000 {worst[0]:5.1f} ({worst[1]} / {worst[2]})'
              + ('' if worst[0] >= CVD_MIN else '  (below; no legend pair)'))

p('\n# item 114 (e): the wall states\' greyscale bar is checked on renders by coh_repair_rendering_r1_looks.py (A)')
p(f'\nfailures: {fails}')
print('\n'.join(out))
