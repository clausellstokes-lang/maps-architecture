# Numeric check of §8.3's census bar "one spot lit from every side": summed visibility-weighted term >= 0.95 of the
# unoccluded sum at every ground pixel within the lights' radius outside the caster. Uses §8.4 (c)'s own point-light term:
# E = I * max(0, n.l) / d^2 * f(d/r), f(x) = (max(0, 1 - x^4))^2, level ground n = (0,0,1); hard visibility (a point
# flame, sigma -> 0) and, as a softer case, a flame radius of 5 cm.
import math
def f(x): return max(0.0, 1 - x**4)**2
def term(px, py, L):
    lx, ly, lz, I, r = L
    dx, dy = lx - px, ly - py
    d3 = math.sqrt(dx*dx + dy*dy + lz*lz)
    nl = lz / d3
    return I * nl / (d3*d3) * f(d3 / r)
def blocked(px, py, L, half, hc):
    # ray from ground point (px,py,0) to light (lx,ly,lz); caster = axis box |x|,|y| <= half, 0..hc
    lx, ly, lz, I, r = L
    n = 2000
    for i in range(1, n):
        t = i / n
        x = px + (lx - px) * t; y = py + (ly - py) * t; z = lz * t
        if abs(x) <= half and abs(y) <= half and z <= hc: return True
    return False
for (half, hc, D, lz, r) in [(2.0, 6.0, 5.0, 2.5, 10.0), (2.0, 4.0, 6.0, 2.5, 10.0), (3.0, 8.0, 8.0, 3.5, 12.0)]:
    lights = [(0, D, lz, 1.0, r), (0, -D, lz, 1.0, r), (D, 0, lz, 1.0, r), (-D, 0, lz, 1.0, r)]
    worst = 1.0; wpt = None; n_below = 0; n_tot = 0
    step = 0.25
    x = -r
    while x <= r:
        y = -r
        while y <= r:
            if not (abs(x) <= half and abs(y) <= half) and math.hypot(x, y) <= r:
                tot = sum(term(x, y, L) for L in lights)
                if tot > 0:
                    vis = sum(term(x, y, L) for L in lights if not blocked(x, y, L, half, hc))
                    ratio = vis / tot; n_tot += 1
                    if ratio < 0.95: n_below += 1
                    if ratio < worst: worst, wpt = ratio, (x, y)
            y += step
        x += step
    print(f"caster {2*half}x{2*half} m, h {hc} m; lights at {D} m, {lz} m high, radius {r} m: worst ratio {worst:.3f} at {wpt}; {n_below}/{n_tot} samples below 0.95")
