#!/usr/bin/env python3
"""coh_repair_rendering_r1_looks.py — coherence repair round 1 (rendering): the tones of item 114's wall states and the
looks of item 117's season rows, checked on the three shipped families (ink, lit, hatched).

(A) Item 114 (e) / J-V12.91: every two wall states distinguishable in greyscale — the renders of one test run in the two
    states compared pixel by pixel on CIE L* alone, their mean grey CIEDE2000 at least cvdContrastMin = 10, at every drawn
    width (patch looks among themselves are one state, told apart by their line patterns).
(B) Item 117: the season looks §8.2 defines as linear-light lerps of the family's own roles; every contrast-matrix pair of
    the role each look re-skins is re-checked on the look (field looks: field / road and field / ground >= 4; green-role
    looks: green / road >= 8, green / building >= 10; tree looks: tree / water >= 10, ink / tree >= 25 and dL* >= 30).
Our own code from the published definitions (CIELAB D65, CIEDE2000 per Sharma, Wu and Dalal 2005). stdlib only.
usage: python3 coh_repair_rendering_r1_looks.py > coh_repair_rendering_r1_looks.out
"""
import math, itertools

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
def lerp_lin(h1, h2, t):
    a, b = hex2rgb(h1), hex2rgb(h2)
    return rgb2hex(tuple(gam(lin(a[i]) + (lin(b[i]) - lin(a[i])) * t) for i in range(3)))
def Lstar(h): return rgb2lab(hex2rgb(h))[0]
def grey(h): return (Lstar(h), 0.0, 0.0)
def dgrey(h1, h2): return de2000(grey(h1), grey(h2))
def dlab(h1, h2): return de2000(rgb2lab(hex2rgb(h1)), rgb2lab(hex2rgb(h2)))
def at_L(h, Lt):
    """The colour h moved to lightness Lt, its hue and chroma kept (chroma pulled until inside sRGB)."""
    L, a, b = rgb2lab(hex2rgb(h)); C = math.hypot(a, b); hh = math.atan2(b, a)
    while True:
        rgb, ok = lab2rgb(Lt, C * math.cos(hh), C * math.sin(hh))
        if ok or C < 0.5: return rgb2hex(rgb)
        C -= 0.5
def toward_L(h, target_hex_light, target_hex_dark, Lt):
    """A linear-light lerp of h toward paper (lighter) or ink (darker), at the share (0.01 steps) that lands nearest Lt."""
    to = target_hex_light if Lt > Lstar(h) else target_hex_dark
    best = None
    for k in range(0, 101):
        c = lerp_lin(h, to, k / 100)
        d = abs(Lstar(c) - Lt)
        if best is None or d < best[0]: best = (d, k / 100, c)
    return best[2], best[1], to

FAM = {   # §8.2's shipped role values
    'ink': dict(paper='#F7EAD3', road='#F7EAD3', ground='#E8CFA6', building='#AE947B', ink='#2D2219', wall='#2D2219',
                water='#9ABDD1', green='#B4CC94', garden='#C4CF96', tree='#70946A', field='#F5DEA0', verge='#D7DEB1',
                sand='#EADBB0', plank='#B39B78', snow='#FFFFFF', cap=34),
    'lit': dict(paper='#F7EAD3', road='#DDCFC1', ground='#D4B78F', building='#BD855B', ink='#2C2218', wall='#8B7964',
                water='#2DA0D3', green='#8AB85D', garden='#7BAF43', tree='#447F33', field='#E3BC5D', verge='#A5BF7C',
                sand='#E6CF96', plank='#9A7650', snow='#FFFFFF', cap=60),
    'hatched': dict(paper='#F7EAD3', road='#C4A683', ground='#F7EAD3', building='#B9723D', ink='#2C2218', wall='#74593D',
                    water='#71B4D3', green='#A9B951', garden='#9DB541', tree='#5E9434', field='#F3D580', verge='#B7C278',
                    sand='#EDDCA9', plank='#A07A4C', snow='#FFFFFF', cap=60),
}
WALLMAT = {   # §8.2's wall-material roles (ink derives them)
    'ink': dict(dry_stone='#2D2219', earth_bank=lerp_lin('#E8CFA6', '#2D2219', 0.30), timber_crib='#B39B78'),
    'lit': dict(dry_stone='#8E8574', earth_bank='#9C8460', timber_crib='#8A6A45'),
    'hatched': dict(dry_stone='#7E6A50', earth_bank='#8C7450', timber_crib='#7A5A38'),
}
PATCH_BASE = {   # the patch looks' material hues (as coh_repair_rendering_r1_palette.py): (role, lerp toward, share)
    'patch.timber': ('plank', None, 0), 'patch.wattle': ('plank', 'ground', 0.25), 'patch.earth': ('earth_bank', None, 0),
    'patch.drystone': ('dry_stone', None, 0), 'patch.stakes': ('plank', 'ink', 0.15), 'patch.brush': ('tree', 'ground', 0.5),
}
CVD_MIN = 10
out = []
def p(*a): out.append(' '.join(str(x) for x in a))
fails = 0

# ---------------- (A) the wall states' renders ----------------
# A 64-px test run, drawn width w px (§8.2's symbolisation: minPx 2 … maxPx 12), rendered in each state over `ground` on a
# grid of 64 × 3w px — the w rows of the wall band and w rows of spill on each side — by §8.2's state rows:
#   standing   the band in `wall`
#   worn       the band in `wall.worn` (= `wall` lerped WORN toward `ink`, linear light: weathered, darkened), its outer
#              edge notched (broken crenellations): a notch ceil(w/2) px deep and 1 px long every 3 px
#   patched    the band's middle 0.6 w (≥ 1 px) in the look's role, by its line pattern (below)
#   breached   no band; rubble dots in `ink` over the band and the outer spill rows, 1 px each, covering RUBBLE of them
#              (a keyed draw per pixel)
#   dismantled no band; the trace hairline (1 px, 2 on / 2 off) in `ink` on the trace's line
# and compared pixel by pixel on CIE L* alone: the mean, over the pixels where either render draws a mark, of the grey
# CIEDE2000 between the two renders' pixels
# must reach cvdContrastMin (10) for every pair of different states at every width (J-V12.91; T114g.greyscale).
WORN, RUBBLE = 0.40, 0.40
import random
PATTERN = {   # the look's line pattern on the patched strip of height hp: pixel (x, y) drawn?
    'patch.timber':   lambda x, y, hp: x % 4 != 3,                                  # planks: bars with a 1-px joint every 4 px
    'patch.wattle':   lambda x, y, hp: (x + y) % 4 in (0, 1),                       # woven: a diagonal weave
    'patch.earth':    lambda x, y, hp: y > 0 or x % 2 == 0,                         # a bank: solid, its outer edge dotted
    'patch.drystone': lambda x, y, hp: (x % max(2, hp + 1)) != max(2, hp + 1) - 1,  # beads: stones with a gap between
    'patch.stakes':   lambda x, y, hp: x % 3 == 0,                                  # posts: one in three columns
    'patch.brush':    lambda x, y, hp: (x // 2 + y) % 3 != 0,                       # brush: an irregular broken fill
}
def render(state, w, R, look=None, look_hex=None):
    H = 3 * w; g = Lstar(R['ground'])
    img = [[g] * 64 for _ in range(H)]
    band = range(w, 2 * w)                      # rows w … 2w−1; rows 0 … w−1 the outer spill
    if state == 'standing':
        for y in band:
            for x in range(64): img[y][x] = Lstar(R['wall'])
    elif state == 'worn':
        Lw = Lstar(lerp_lin(R['wall'], R['ink'], WORN)); nd = math.ceil(w / 2)
        for y in band:
            for x in range(64):
                img[y][x] = g if (y - w < nd and x % 3 == 0) else Lw
    elif state == 'patched':
        hp = max(1, round(0.6 * w)); y0 = w + (w - hp) // 2; Lp = Lstar(look_hex)
        for yy in range(hp):
            for x in range(64):
                if PATTERN[look](x, yy, hp): img[y0 + yy][x] = Lp
    elif state == 'breached':
        rnd = random.Random(1144); Li = Lstar(R['ink'])
        for y in list(range(0, w)) + list(band):
            for x in range(64):
                if rnd.random() < RUBBLE: img[y][x] = Li
    elif state == 'dismantled':
        Lt = Lstar(R['ink']); y = w + w // 2
        for x in range(64):
            if x % 4 < 2: img[y][x] = Lt
    return img
DGT = {}
def dgi(a, b):
    k = (round(a, 1), round(b, 1))
    if k not in DGT: DGT[k] = de2000((a, 0, 0), (b, 0, 0))
    return DGT[k]
def meandiff(i1, i2, g):
    """the mean grey CIEDE2000 over the pixels where either render draws a mark (differs from the ground)"""
    n = s = 0
    for r1, r2 in zip(i1, i2):
        for a, b in zip(r1, r2):
            if a == g and b == g: continue
            s += dgi(a, b); n += 1
    return s / n if n else 0.0
PATCH_PREV = {   # the material tones of coh_repair_rendering_r1_palette.out (hue and chroma kept)
    'ink': {'patch.timber': '#B39B78', 'patch.wattle': '#C2AA85', 'patch.earth': '#C7B18E', 'patch.drystone': '#60584D', 'patch.stakes': '#A79070', 'patch.brush': '#B9B58C'},
    'lit': {'patch.timber': '#BCA489', 'patch.wattle': '#BDA385', 'patch.earth': '#B8A589', 'patch.drystone': '#B0A693', 'patch.stakes': '#B7A188', 'patch.brush': '#ACA87C'},
    'hatched': {'patch.timber': '#A6835A', 'patch.wattle': '#BBA080', 'patch.earth': '#9B8668', 'patch.drystone': '#998871', 'patch.stakes': '#A28562', 'patch.brush': '#BFC59E'},
}
def patch_cap(R):
    """the lightest L* a patch look may take: its grey CIEDE2000 against `ground` at least 11 (patched against dismantled)"""
    g = Lstar(R['ground'])
    return max(L for L in range(0, 101) if de2000((L, 0, 0), (g, 0, 0)) >= 11 and L < g)
PATCH_HEX = {fam: {k: (h if Lstar(h) <= patch_cap(FAM[fam]) else at_L(h, patch_cap(FAM[fam]))) for k, h in d.items()} for fam, d in PATCH_PREV.items()}
p('# (A) item 114: the wall states\' renders compared pixel by pixel on luma alone (WORN %.2f, RUBBLE %.2f)' % (WORN, RUBBLE))
for fam, R in FAM.items():
    worst = (99, '')
    for w in (2, 3, 4, 6, 8, 12):
        rs = {s: render(s, w, R) for s in ('standing', 'worn', 'breached', 'dismantled')}
        for lk, hx in PATCH_HEX[fam].items(): rs[lk] = render('patched', w, R, lk, hx)
        for a_, b_ in itertools.combinations(rs, 2):
            if a_.startswith('patch.') and b_.startswith('patch.'): continue
            d = meandiff(rs[a_], rs[b_], Lstar(R['ground']))
            if d < worst[0]: worst = (d, f'{a_} / {b_} at w = {w} px')
            if d < CVD_MIN: fails += 1; p(f'  FAIL {fam} {a_} / {b_} at w = {w} px: {d:.1f}')
    p(f'  {fam:8s} least mean grey dE2000 between two states\' renders: {worst[0]:.1f} ({worst[1]}) (>= {CVD_MIN})')
    p(f'           wall.worn {lerp_lin(R["wall"], R["ink"], WORN)}  L* {Lstar(lerp_lin(R["wall"], R["ink"], WORN)):.1f}; patch L* cap {patch_cap(R)}')
    for k, h in PATCH_HEX[fam].items():
        res = []
        for other, dmin in (('wall', 8), ('ground', 10), ('water', 10)):
            d = dlab(h, R[other]); ok = d >= dmin
            if not ok: fails += 1
            res.append(f'{other} {d:4.1f}' + ('' if ok else ' FAIL'))
        p(f'           {k:16s} {h}  L* {Lstar(h):5.1f}  ' + '; '.join(res))

# ---------------- (B) the season looks ----------------
p('\n# (B) item 117: the season looks (linear-light lerps of the family\'s roles) and the matrix pairs of the role each re-skins')
LOOKS = {   # look: (base role, toward role or None, share) — identity looks have share 0
    'field.sown': ('ground', 'green', 0.30), 'field.green': ('field', 'green', 0.60), 'field.ripe': ('field', None, 0),
    'field.harvest': ('field', None, 0), 'field.stubble': ('field', 'paper', 0.35), 'field.ploughed': ('ground', 'ink', 0.18),
    'meadow.green': ('green', None, 0), 'meadow.high': ('green', 'tree', 0.25), 'meadow.mown': ('green', 'field', 0.40),
    'meadow.winter': ('green', 'ground', 0.55), 'meadow.dry': ('green', 'sand', 0.60),
    'grass.green': ('green', None, 0), 'grass.autumn': ('green', 'field', 0.45),
    'garden.green': ('garden', None, 0), 'garden.bare': ('garden', 'ground', 0.55),
    'wood.floor': ('tree', None, 0),
}
ROLE_OF = {k: v[0] for k, v in LOOKS.items()}
def pairs_for(role):   # §8.2's matrix rows of the re-skinned role: (other role, dE min, dL min)
    return {'field': [('road', 4, None), ('ground', 4, None)], 'ground': [('road', 6, 5), ('building', 12, 12)],
            'green': [('road', 8, None), ('building', 10, None)], 'garden': [('building', 10, None)],
            'tree': [('water', 10, None), ('ink', 25, 30)]}[role]
for fam, R in FAM.items():
    p(f'[{fam}]')
    for look, (role, toward, share) in LOOKS.items():
        h = R[role] if not toward else lerp_lin(R[role], R[toward], share)
        # the matrix rows of the role the look re-skins: a field look stands where `field` stands, a sown or ploughed
        # field too (its base tone is ground's, its matrix rows field's), a meadow and grass look where `green` stands
        rows = pairs_for('field' if look.startswith('field.') else role)
        res = []
        for other, dmin, lmin in rows:
            la, lb = rgb2lab(hex2rgb(h)), rgb2lab(hex2rgb(R[other]))
            d = de2000(la, lb); dl = abs(la[0] - lb[0])
            ok = d >= dmin and (lmin is None or dl >= lmin)
            if not ok: fails += 1
            res.append(f'{other} {d:4.1f}' + ('' if ok else ' FAIL'))
        p(f'  {look:16s} {h}  L* {Lstar(h):5.1f}  ' + '; '.join(res))

p(f'\nfailures: {fails}')
print('\n'.join(out))
