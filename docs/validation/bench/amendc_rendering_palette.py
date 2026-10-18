# amendments-c/amend-rendering (2026-09-28, opus stand-in, pending Fable review). Our own code; stdlib only.
# Item 69 (owner rule): re-tune the shipped families' role values onto the owner-opened corpus palette TARGETS
# (numbers from docs/AMENDMENTS-2026-09-27c.md item 69 (a) only): paper luma 226-244 (target 235), paper warmth R-B pinned 36;
# darkest ink luma <= 45 with warmth about 20; plate chroma 18-70 (median 43; ink aims at 20-30).
# (1) paper and ink moved to the targets at each family's own hue; (2) every other role's CIELAB chroma scaled by one factor k
# (L* and hue kept), k the least giving a modelled plate chroma >= the family's aim floor (ink 20; lit and hatched: the nearest
# to 43 the matrix and the sRGB gamut allow); (3) every contrast-matrix pair of ARCHITECTURE §8.2 re-checked, the bounded L*
# repair run where one fails; (4) the random-style draw and repair simulation re-run with the new ink chroma window.
import math, random, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from fixall_rendering_r2_colour import srgb2lab, lab2srgb_hex, de2000, chroma

def rgb(h): h = h.lstrip('#'); return [int(h[i:i+2], 16) for i in (0, 2, 4)]
def luma(h): r, g, b = rgb(h); return 0.299*r + 0.587*g + 0.114*b
def warm(h): r, g, b = rgb(h); return r - b
def hue(h): L, a, b = srgb2lab(h); return math.atan2(b, a)
def lch2hex(L, C, hh): return lab2srgb_hex((L, C*math.cos(hh), C*math.sin(hh)))

def solve(h0, luma_t, warm_t):
    """the (L*, C*) at the role's own hue whose sRGB value has luma nearest luma_t and warmth nearest warm_t"""
    hh = hue(h0); best = None
    for Li in range(0, 1001):
        L = Li / 10
        for Ci in range(0, 401):
            C = Ci / 10
            x = lch2hex(L, C, hh)
            e = abs(luma(x) - luma_t) + abs(warm(x) - warm_t)
            if best is None or e < best[0] - 1e-9: best = (e, x)
        if best and best[0] < 0.3: pass
    return best[1]

shipped = {
 'ink':    dict(paper='#F6EDDE',road='#F6EDDE',ground='#DED0BB',court='#ECE0C6',building='#A49689',ink='#292522',wall='#292522',water='#AABBC5',green='#BCC8AB',garden='#C7CCAF',tree='#7E907A',field='#ECDFBF',verge='#D9DCC5'),
 'lit':    dict(paper='#DED6CC',road='#D8D0C8',ground='#CBB9A2',court='#D1C5B2',building='#AD8A72',ink='#34281E',wall='#857A6E',water='#6D9CB9',green='#9AB37F',garden='#8EA96D',tree='#5B7A4F',field='#D8BE89',verge='#ADBB95'),
 'hatched':dict(paper='#D4CABF',road='#B6A99B',ground='#D4CABF',court='#B7B898',building='#9D7D68',ink='#2A231D',wall='#685C51',water='#98AFBB',green='#B0B48C',garden='#A8AF83',tree='#798C67',field='#E5D6B5',verge='#BBBEA1'),
}
matrix = [('road','ground',6,5),('ground','building',12,12),('road','building',15,15),('garden','building',10,0),('green','building',10,0),
          ('tree','water',10,0),('green','road',8,0),('tree','green',8,0),('water','road',8,0),('water','ground',8,0),('wall','water',20,0),
          ('field','road',4,0),('field','ground',4,0),('court','road',4,0),('court','ground',3,0),('ink','road',40,50),('ink','ground',40,50),('ink','paper',40,50),
          ('ink','building',30,40),('ink','tree',25,30)]
# the plate model (PLAUSIBLE): city-band pixel shares of a plate-framed measurement render (the settlement and its margin)
SHARE = {'ink':    dict(paper=0.18, road=0.12, ground=0.18, building=0.22, ink=0.03, water=0.05, field=0.14, green=0.03, garden=0.01, tree=0.03, verge=0.01),
         'lit':    dict(paper=0.18, road=0.12, ground=0.18, building=0.22, ink=0.03, water=0.05, field=0.14, green=0.03, garden=0.01, tree=0.03, verge=0.01),
         'hatched':dict(paper=0.18, road=0.12, ground=0.18, building=0.22, ink=0.03, water=0.05, field=0.14, green=0.03, garden=0.01, tree=0.03, verge=0.01)}
def plate_chroma(p, f): return sum(s * chroma(srgb2lab(p[r])) for r, s in SHARE[f].items())
def darkest_ink(p): return luma(p['ink']), warm(p['ink'])

def check(p):
    lab = {k: srgb2lab(v) for k, v in p.items()}; out = []
    for a, b, de, dl in matrix:
        d = de2000(lab[a], lab[b]); l = abs(lab[a][0] - lab[b][0]); out.append((a, b, d, l, de, dl, d >= de and l >= dl))
    return out
def first_failing(p):
    for a, b, d, l, de, dl, ok in check(p):
        if not ok: return (a, b)
    return None
def repair(p, fixed, max_steps=100):
    """ARCHITECTURE §8.2's bounded repair on L* only (the new warmths survive): the first failing pair in row order, its lighter
    role's L* +1 (to 97), else its darker role's L* -1 (to 3); roles in `fixed` (paper, ink) never move — the other role does"""
    lab = {k: list(srgb2lab(v)) for k, v in p.items()}
    for st in range(max_steps + 1):
        h = {k: lab2srgb_hex(v) for k, v in lab.items()}
        fp = first_failing(h)
        if fp is None: return h, st
        if st == max_steps: return None, st
        a, b = fp
        lighter, darker = (a, b) if lab[a][0] >= lab[b][0] else (b, a)
        if lighter not in fixed and lab[lighter][0] <= 97: lab[lighter][0] += 1
        elif darker not in fixed and lab[darker][0] >= 3: lab[darker][0] -= 1
        else: return None, st
        for t, s in (('road', 'paper'), ('wall', 'ink'), ('ground', 'paper')):
            if p[t] == p[s] and t not in fixed: lab[t] = list(lab[s])
    return None, max_steps

def scale(p, k, keep):
    q = {}
    for r, v in p.items():
        if r in keep: q[r] = v; continue
        L, a, b = srgb2lab(v); q[r] = lab2srgb_hex((L, a*k, b*k))
    return q

AIM = {'ink': (20.0, 30.0), 'lit': (43.0, 43.0), 'hatched': (43.0, 43.0)}
CMAX_ROLE = 60.0   # lit and hatched: no role above C* 60 (restraint) and no role clipped by the sRGB gamut
def clipped(q, p):
    for r in q:
        L, a, b = srgb2lab(p[r]); k = KK[0]
        want = (L, a*k, b*k) if r not in KEEP[0] else srgb2lab(p[r])
        if de2000(want, srgb2lab(q[r])) > 1.0: return True
    return False
KK = [1.0]; KEEP = [set()]
new = {}
PAPER = None
for f, p0 in shipped.items():
    p = dict(p0)
    p['paper'] = PAPER if f != 'ink' else solve(p0['paper'], 235.0, 36.0)
    p['ink'] = solve(p0['ink'], 36.0, 20.0)
    if p0['road'] == p0['paper']: p['road'] = p['paper']
    if p0['wall'] == p0['ink']: p['wall'] = p['ink']
    if p0['ground'] == p0['paper']: p['ground'] = p['paper']
    keep = {'paper', 'ink'} | ({'road'} if p0['road'] == p0['paper'] else set()) | ({'wall'} if p0['wall'] == p0['ink'] else set()) | ({'ground'} if p0['ground'] == p0['paper'] else set())
    lo, hi = AIM[f]; chosen = None; trail = []
    for ki in range(100, 401):
        k = ki / 100
        q = scale(p, k, keep)
        for t, s in (('road', 'paper'), ('wall', 'ink'), ('ground', 'paper')):
            if p0[t] == p0[s]: q[t] = q[s]
        KK[0] = k; KEEP[0] = keep
        if f != 'ink' and (clipped(q, p) or max(chroma(srgb2lab(v)) for v in q.values()) > CMAX_ROLE):
            trail.append((k, 'clip or cap')); break
        r, st = repair(q, {'paper', 'ink'})
        if r is None: trail.append((k, 'repair failed')); continue
        pc = plate_chroma(r, f)
        trail.append((k, round(pc, 2), st))
        if f == 'ink':
            if pc >= lo: chosen = (k, r, pc, st); break
        else:
            if chosen is None or abs(pc - lo) < abs(chosen[2] - lo): chosen = (k, r, pc, st)
            if pc >= lo: break
    k, r, pc, st = chosen
    new[f] = r
    if f == 'ink': PAPER = r['paper']
    print(f'== {f}: chroma scale k = {k:.2f}, repair steps {st}; modelled plate chroma {pc:.1f} (shipped {plate_chroma(p0, f):.1f})')
    for role in p0:
        L, a, b = srgb2lab(r[role])
        print(f'   {role:8s} {p0[role]} -> {r[role]}   luma {luma(r[role]):6.1f}  warmth {warm(r[role]):4d}  L* {L:5.1f}  C* {chroma((L,a,b)):5.1f}')
    print(f'   paper luma {luma(r["paper"]):.1f} (band 226-244, target 235), warmth {warm(r["paper"])} (pinned 36); ink luma {luma(r["ink"]):.1f} (<= 45), warmth {warm(r["ink"])} (about 20)')
    print(f'   max role chroma {max(chroma(srgb2lab(v)) for v in r.values()):.1f} (the family cap)')
    ok = True
    for a_, b_, d, l, de, dl, good in check(r):
        ok &= good; print(f'   {a_:8s}/{b_:8s} dE={d:5.1f} (>={de}) dL={l:5.1f} (>={dl}) {"OK" if good else "FAIL"}')
    print('   all matrix pairs pass:', ok)
    lab = {x: srgb2lab(v) for x, v in r.items()}
    for x in ['paper','road','ground','court','garden','green','tree','field','verge','water','building']:
        d = de2000(lab['ink'], lab[x]); l = abs(lab['ink'][0] - lab[x][0]); halo = x if (d >= 40 and l >= 50) else 'ground'
        print(f'    halo under {x:8s}: {halo}')
    print('   k trail:', trail[:6], '...', trail[-3:])

# (4) the random-style draw with ink's new chroma window [0, cap]
def draw(rng, base, cmax, win=12):
    p = {}
    for k, v in base.items():
        L, A, B = srgb2lab(v)
        L2 = min(98, max(2, L + rng.uniform(-win, win))); c = rng.uniform(0, cmax); h = rng.uniform(0, 2*math.pi)
        p[k] = lab2srgb_hex((L2, c*math.cos(h), c*math.sin(h)))
    if base['road'] == base['paper']: p['road'] = p['paper']
    return p
def repair_free(p, max_steps=100):
    lab = {k: list(srgb2lab(v)) for k, v in p.items()}; tied = p['road'] == p['paper']
    for st in range(max_steps + 1):
        h = {k: lab2srgb_hex(v) for k, v in lab.items()}
        fp = first_failing(h)
        if fp is None: return True, st
        if st == max_steps: return False, st
        a, b = fp; lighter, darker = (a, b) if lab[a][0] >= lab[b][0] else (b, a)
        if lab[lighter][0] <= 97: mv, dv = lighter, 1
        elif lab[darker][0] >= 3: mv, dv = darker, -1
        else: return False, st
        lab[mv][0] += dv
        if tied and mv in ('road', 'paper'): lab['paper' if mv == 'road' else 'road'][0] = lab[mv][0]
    return False, max_steps
N = 2000
for f in ['ink', 'lit', 'hatched']:
    cmax = math.ceil(max(chroma(srgb2lab(v)) for v in new[f].values())) if f == 'ink' else 30
    if f != 'ink': cmax = max(30, math.ceil(max(chroma(srgb2lab(v)) for v in new[f].values())))
    rng = random.Random(20260928); raw = first = within3 = fb = 0; steps = []
    for i in range(N):
        okk = False
        for att in range(3):
            p = draw(rng, new[f], cmax)
            if att == 0 and first_failing(p) is None: raw += 1
            good, st = repair_free(p)
            if good:
                okk = True; steps.append(st)
                if att == 0: first += 1
                break
        within3 += okk; fb += (not okk)
    steps.sort()
    print(f'== random-style repair, {f}: {N} draws (L* +-12, chroma window [0, {cmax}]): as drawn {raw/N:.3f}; first repair {first/N:.3f}; within 3 attempts {within3/N:.3f}; fallback {fb/N:.3f}; steps median {steps[len(steps)//2]}, p95 {steps[int(len(steps)*0.95)]}')

# (5) lit's roof rows by band (J-A19.81): each shipped row moved by lit's own chroma scale at its L* and hue, then every
# contrast-matrix pair of the `building` role re-checked with the row in the building's place (ground, road, garden, green, ink)
ROOF = {'rich': '#AE8364', 'prosperous': '#AE866B', 'comfortable': '#AD8A72', 'modest': '#AB8C78', 'poor': '#A88F7E', 'squalid': '#A59184'}
k_lit = None
for line in open(__file__).read().split('\n'): pass
lab_b = srgb2lab(shipped['lit']['building']); lab_n = srgb2lab(new['lit']['building'])
k_lit = chroma(lab_n) / chroma(lab_b)
print(f'== lit roof rows by band, chroma scale {k_lit:.3f} (the building role\'s own)')
for band, v in ROOF.items():
    L, a, b = srgb2lab(v); nv = lab2srgb_hex((L, a*k_lit, b*k_lit))
    if band == 'comfortable': nv = new['lit']['building']
    q = dict(new['lit']); q['building'] = nv
    fails = [(x[0], x[1]) for x in check(q) if 'building' in (x[0], x[1]) and not x[-1]]
    print(f'   {band:11s} {v} -> {nv}  C* {chroma(srgb2lab(nv)):5.1f}  building pairs: {"all pass" if not fails else fails}')
