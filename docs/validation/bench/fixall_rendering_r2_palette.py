# fixall/draft-rendering-r2 (2026-09-25, opus stand-in, pending Fable review). Our own code; stdlib only.
# (1) retunes ink `field` to chroma <= 18, sets ink `wall` = ink, darkens lit / hatched ink for the label pairs;
# (2) re-runs every contrast-matrix pair (old and new rows) on the three shipped families;
# (3) checks the N-3 halo rule: text vs the local role when it passes the label floor, else the family fallback;
# (4) simulates the bounded random-style repair of N-26 on seeded random palettes.
import math, random
from fixall_rendering_r2_colour import srgb2lab, lab2srgb_hex, de2000, chroma

fam = {
 'ink':    dict(paper='#F6EDDE',road='#F6EDDE',ground='#DED0BB',court='#ECE0C6',building='#A49689',ink='#292522',wall='#34302B',water='#AABBC5',green='#BCC8AB',garden='#C7CCAF',tree='#7E907A',field='#ECDFBD',verge='#D9DCC5'),
 'lit':    dict(paper='#DED6CC',road='#D8D0C8',ground='#CBB9A2',court='#D1C5B2',building='#AD8A72',ink='#46392F',wall='#857A6E',water='#6D9CB9',green='#9AB37F',garden='#8EA96D',tree='#5B7A4F',field='#D8BE89',verge='#ADBB95'),
 'hatched':dict(paper='#D4CABF',road='#B6A99B',ground='#D4CABF',court='#B7B898',building='#9D7D68',ink='#322B25',wall='#685C51',water='#98AFBB',green='#B0B48C',garden='#A8AF83',tree='#798C67',field='#E5D6B5',verge='#BBBEA1'),
}
# matrix rows: (a, b, dE floor, dL floor, band where both are drawn)
matrix = [('road','ground',6,5),('ground','building',12,12),('road','building',15,15),('garden','building',10,0),('green','building',10,0),
          ('tree','water',10,0),('green','road',8,0),('tree','green',8,0),('water','road',8,0),('water','ground',8,0),('wall','water',20,0),
          ('field','road',4,0),('field','ground',4,0),('court','road',4,0),('court','ground',3,0),('ink','road',40,50),('ink','ground',40,50),('ink','paper',40,50)]   # row order = ARCHITECTURE §8.2's table
new_rows = [('ink','building',30,40),('ink','tree',25,30)]
LABEL = (40, 50)   # the label-ink floor (text against its halo)
FALLBACK = {'ink':'ground','lit':'ground','hatched':'ground'}   # one fallback halo role: ground (guaranteed by the ink/ground row)
HALO_ROLES = ['paper','road','ground','court','garden','green','tree','field','verge','water','building']

def check(p, rows):
    lab = {k: srgb2lab(v) for k, v in p.items()}
    out = []
    for a, b, de, dl in rows:
        d = de2000(lab[a], lab[b]); l = abs(lab[a][0]-lab[b][0])
        out.append((a, b, d, l, de, dl, d >= de and l >= dl))
    return out

def darken_to(hexc, other, dl_target, lab_other=None):
    L, A, B = srgb2lab(hexc); Lo = srgb2lab(other)[0]
    while abs(Lo - L) < dl_target and L > 1:
        L -= 0.25
    return lab2srgb_hex((L, A, B))

def reduce_chroma(hexc, cmax):
    L, A, B = srgb2lab(hexc); c = math.hypot(A, B)
    s = 1.0
    while True:
        h = lab2srgb_hex((L, A*s, B*s))
        if chroma(srgb2lab(h)) <= cmax: return h
        s -= 0.005

new = {k: dict(v) for k, v in fam.items()}
new['ink']['field'] = reduce_chroma(fam['ink']['field'], 17.8)
new['ink']['wall'] = new['ink']['ink']
# lit: darken ink until ink/building dL >= 40.5 and ink/tree dL >= 30.5 (the stricter wins)
li = darken_to(fam['lit']['ink'], fam['lit']['building'], 40.5)
li2 = darken_to(li, fam['lit']['tree'], 30.5)
new['lit']['ink'] = li2
hi = darken_to(fam['hatched']['ink'], fam['hatched']['building'], 40.5)
hi2 = darken_to(hi, fam['hatched']['tree'], 30.5)
new['hatched']['ink'] = hi2

for f in ['ink','lit','hatched']:
    p = new[f]; lab = {k: srgb2lab(v) for k, v in p.items()}
    print('==', f, 'changed:', {k: (fam[f][k], p[k]) for k in p if p[k] != fam[f][k]})
    allok = True
    for a, b, d, l, de, dl, ok in check(p, matrix + new_rows):
        allok &= ok
        print(f"  {a:8s}/{b:8s} dE={d:5.1f} (>={de}) dL={l:5.1f} (>={dl}) {'OK' if ok else 'FAIL'}")
    print('  all matrix pairs pass:', allok)
    ch = {k: chroma(v) for k, v in lab.items()}
    print('  max chroma:', max(ch.items(), key=lambda x: x[1]))
    # city-band tones (court drawn as ground, road = paper in ink)
    tones = sorted(set(p[r] for r in ['paper','road','ground','building','ink','wall','water','green','tree','field']))
    print('  distinct city-band tones (court as ground):', len(tones))
    print('  halo rule (label floor dE>=40, dL>=50): local role if it passes, else', FALLBACK[f])
    for r in HALO_ROLES:
        d = de2000(lab['ink'], lab[r]); l = abs(lab['ink'][0]-lab[r][0])
        passes = d >= LABEL[0] and l >= LABEL[1]
        halo = r if passes else FALLBACK[f]
        dh = de2000(lab['ink'], lab[halo]); lh = abs(lab['ink'][0]-lab[halo][0])
        print(f"   under {r:8s}: local dE={d:5.1f} dL={l:5.1f} -> halo {halo:7s} text/halo dE={dh:5.1f} dL={lh:5.1f} {'OK' if dh>=LABEL[0] and lh>=LABEL[1] else 'FAIL'}")

# (4) bounded repair simulation (N-26): the draw and the repair exactly as ARCHITECTURE §8.2 specifies them
ROWS = matrix + new_rows
def first_failing(lab):
    for a, b, de, dl in ROWS:
        d = de2000(lab[a], lab[b]); l = abs(lab[a][0]-lab[b][0])
        if not (d >= de and l >= dl): return (a, b)
    return None
def repair(p, max_steps=100):
    """first failing pair in row order; raise its lighter role's L* by 1 (to 97), else lower its darker role's L* by 1 (to 3);
    re-check; stop when all pass or after max_steps; a pass must survive conversion to sRGB (gamut clipping)."""
    lab = {k: list(srgb2lab(v)) for k, v in p.items()}
    tied = p['road'] == p['paper']
    for st in range(max_steps + 1):
        fp = first_failing(lab)
        if fp is None:
            h = {k: lab2srgb_hex(v) for k, v in lab.items()}
            return first_failing({k: srgb2lab(v) for k, v in h.items()}) is None, st
        if st == max_steps: return False, st
        a, b = fp
        lighter, darker = (a, b) if lab[a][0] >= lab[b][0] else (b, a)
        if lab[lighter][0] <= 97: mv, dv = lighter, 1
        elif lab[darker][0] >= 3: mv, dv = darker, -1
        else: return False, st
        lab[mv][0] += dv
        if tied and mv in ('road', 'paper'):
            lab['paper' if mv == 'road' else 'road'][0] = lab[mv][0]
    return False, max_steps
def draw(rng, base, win=12):
    """each role's L* within +-win of the shipped value, chroma in [0, 18] (ink family) or [0, 30], any hue; road = paper where tied"""
    cmax = 18 if base is new['ink'] else 30
    p = {}
    for k, v in base.items():
        L, A, B = srgb2lab(v)
        L2 = min(98, max(2, L + rng.uniform(-win, win))); c = rng.uniform(0, cmax); h = rng.uniform(0, 2*math.pi)
        p[k] = lab2srgb_hex((L2, c*math.cos(h), c*math.sin(h)))
    if base['road'] == base['paper']: p['road'] = p['paper']
    return p
N = 2000
for f in ['ink', 'lit', 'hatched']:
    rng = random.Random(20260925)
    raw = first = within3 = fb = 0; steps = []
    for i in range(N):
        ok = False
        for att in range(3):
            p = draw(rng, new[f])
            if att == 0 and all(x[-1] for x in check(p, ROWS)): raw += 1
            good, st = repair(p)
            if good:
                ok = True; steps.append(st)
                if att == 0: first += 1
                break
        within3 += ok; fb += (not ok)
    steps.sort()
    print(f"== random-style repair, {f}: {N} draws (L* +-12 of the shipped roles, chroma <= {18 if f == 'ink' else 30}, any hue), rows = matrix + outline rows")
    print(f"   pass as drawn {raw/N:.3f}; pass after the first repair {first/N:.3f}; pass within 3 attempts {within3/N:.3f}; shipped-palette fallback {fb/N:.3f}; repair steps median {steps[len(steps)//2]}, p95 {steps[int(len(steps)*0.95)]}")
