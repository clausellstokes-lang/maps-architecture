# PENDING FABLE REVIEW — receipt of amendments-c/repair-rendering-r1 (opus stand-in). Our own code, stdlib only.
# Checks the three lighting bars and the spill law the repair writes into §8.3 and §8.4 (c):
#  (A) VRC-02 "one spot lit from every side": ratio of the visibility-weighted sum to the unoccluded sum, and the
#      least number of the four lights that reach any ground pixel outside the caster (point flames, hard visibility).
#  (B) VRC-03 "the cursor sun": the shadow tip's distance, and the bearing spread of the casters against the angle the
#      view subtends from the sun's ground point G = V + s*u, at s = 1, 4, 64; never rising as s rises.
#  (C) VRC-04 the bounce-only spill Spill = max(0, B(D) - D): open level ground reads exactly its albedo; a shadow's
#      share a / (a + sin 45 deg) before the spill's lift; the lift beside a lit edge.
import math

print('(A) one spot lit from every side')
def f(x): return max(0.0, 1 - x**4)**2
def term(px, py, L):
    lx, ly, lz, I, r = L
    dx, dy = lx - px, ly - py
    d3 = math.sqrt(dx*dx + dy*dy + lz*lz)
    return I * (lz / d3) / (d3*d3) * f(d3 / r)
def blocked(px, py, L, half, hc):
    lx, ly, lz, I, r = L
    n = 2000
    for i in range(1, n):
        t = i / n
        x = px + (lx - px) * t; y = py + (ly - py) * t; z = lz * t
        if abs(x) <= half and abs(y) <= half and z <= hc: return True
    return False
for (half, hc, D, lz, r) in [(2.0, 6.0, 5.0, 2.5, 10.0), (2.0, 4.0, 6.0, 2.5, 10.0), (3.0, 8.0, 8.0, 3.5, 12.0)]:
    lights = [(0, D, lz, 1.0, r), (0, -D, lz, 1.0, r), (D, 0, lz, 1.0, r), (-D, 0, lz, 1.0, r)]
    worst = 1.0; wpt = None; minreach = 4; n = 0; below = 0
    x = -r
    while x <= r:
        y = -r
        while y <= r:
            if not (abs(x) <= half and abs(y) <= half) and math.hypot(x, y) <= r:
                terms = [term(x, y, L) for L in lights]
                tot = sum(terms)
                if tot > 0:
                    vis = [not blocked(x, y, L, half, hc) for L in lights]
                    reach = sum(1 for k in range(4) if vis[k] and terms[k] > 0)
                    ratio = sum(terms[k] for k in range(4) if vis[k]) / tot
                    n += 1; minreach = min(minreach, reach)
                    if ratio < 0.5: below += 1
                    if ratio < worst: worst, wpt = ratio, (x, y)
            y += 0.25
        x += 0.25
    print(f'  caster {2*half:.0f} x {2*half:.0f} m, {hc:.0f} m high; lights {D:.0f} m out, {lz} m high, radius {r:.0f} m: '
          f'worst ratio {worst:.3f} at {wpt}; samples below 0.5: {below}/{n}; least lights reaching a pixel: {minreach} '
          f'(so "at least two lights" is not the reason; the unblocked lights carry >= 0.5)')

print('(B) the cursor sun')
d, h, H = 300.0, 10.0, 60.0
print(f'  tip: d={d:.0f} h={h:.0f} H={H:.0f}: beyond the caster d*h/(H-h) = {d*h/(H-h):.1f}; from G d*H/(H-h) = {d*H/(H-h):.1f}; '
      f'similar triangles from G: {d + d*h/(H-h):.1f}')
W, Hh = 1440.0, 900.0
Dv = math.hypot(W/2, Hh/2)
casters = [(x, y) for x in (-W/2, -W/4, 0, W/4, W/2) for y in (-Hh/2, 0, Hh/2)]
def spread(gx, gy):
    b = [math.atan2(py - gy, px - gx) for (px, py) in casters if (px, py) != (gx, gy)]
    m = 0.0
    for a in b:
        for c in b:
            m = max(m, abs((a - c + math.pi) % (2*math.pi) - math.pi))
    return math.degrees(m)
fails = 0; rises = 0; tot = 0; margin = 1e9
for i in range(20):
    for j in range(10):
        cx = -W/2 + (i + 0.5) * W / 20; cy = -Hh/2 + (j + 0.5) * Hh / 10
        prev = None
        for s in (1, 4, 64):
            gx, gy = s * cx, s * cy
            dist = math.hypot(gx, gy)
            bound = 180.0 if dist <= Dv else math.degrees(2 * math.asin(Dv / dist))
            sp = spread(gx, gy); tot += 1
            if sp > bound + 0.1: fails += 1
            margin = min(margin, bound + 0.1 - sp)
            if prev is not None and dist > Dv and sp > prev + 1e-9: rises += 1   # radial (G inside the view's disc): void
            prev = sp if dist > Dv else None
print(f'  200 pointer positions x sunHeight 1, 4, 64: spread above 2*asin(D/|G-V|) + 0.1 deg: {fails}/{tot}; '
      f'least margin {margin:.3f} deg; spread rising with sunHeight once |G-V| > D: {rises}')

print('(C) the bounce-only spill')
sin45 = math.sin(math.radians(45))
for fam, a in (('ink', 1.3), ('lit', 0.85), ('hatched', 1.05)):
    print(f'  {fam}: open level ground reads {(a + sin45) / (a + sin45):.4f} x albedo (the old spill read '
          f'{(a + sin45 + 0.15 * sin45) / (a + sin45):.4f}); a shadow keeps a/(a+sin45) = {a / (a + sin45):.3f} before the lift')
# 1-D: a shadow strip of width w on open ground; three box passes of radius R over D; spill = max(0, B(D) - D)
def box(v, rad, step):
    k = int(round(rad / step)); out = []
    for i in range(len(v)):
        lo, hi = max(0, i - k), min(len(v), i + k + 1)
        out.append(sum(v[lo:hi]) / (hi - lo))
    return out
step, R, beta, a = 0.25, 4.0, 0.15, 1.3
for w in (3.0, 20.0):
    xs = [i * step for i in range(int(80 / step))]
    Dd = [0.0 if 30 <= x < 30 + w else sin45 for x in xs]
    B = box(box(box(Dd, R, step), R, step), R, step)
    L = [(a + Dd[i] + beta * max(0.0, B[i] - Dd[i])) / (a + sin45) for i in range(len(xs))]
    lit_max = max(L[i] for i in range(len(xs)) if Dd[i] > 0)
    lit_min = min(L[i] for i in range(len(xs)) if Dd[i] > 0)
    centre = L[int((30 + w / 2) / step)]
    print(f'  ink, a {w:.0f} m shadow strip: lit ground {lit_min:.4f}-{lit_max:.4f} x albedo; shadow centre {centre:.3f} '
          f'(unlifted {a / (a + sin45):.3f})')
