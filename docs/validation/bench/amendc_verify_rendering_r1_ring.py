# PENDING FABLE REVIEW — receipt of amendments-c/verify-rendering-r1 (opus stand-in verifier).
# amendc_verify_rendering_r1_ring.py -- our own code, stdlib only (verify-rendering-r1, VRC1-01).
# Question: under §8.4 (c)'s march law as repaired in round 1 -- the global light's march length T is
# "the ground distance at which the ray passes the highest surface of the pixel's tile and its one-tile
# ring ..., capped at that ring's far edge" -- does a shadow longer than one tile side end on a tile-grid
# line instead of at its similar-triangles tip?
# Model: 1-D ground profile along the sun's azimuth (flat ground, height 0) with one prism caster.
# Tiles are world-aligned squares of side S (§8.8: 512 device px x m_k / d). At the 1:500 stop, one CSS
# px = 0.2646 mm x 500 = 0.1323 m, so S = 512 / 2 x 0.1323 = 33.9 m at tile DPR 2 and 67.7 m at DPR 1.
# The sun at altitude alt shines toward -x (a shadow falls on the -x side of the caster).
# Visibility (§8.4 (c)): V = clamp(min_k (z_ray(t_k) - h(x + t_k)) / (t_k * sigma), 0, 1),
# t_k = T * ((k + 1/2) / N)^2, N = 32, z_ray(t) = t * tan(alt), sigma = tan(0.27 deg) (the sun's disc).
import math

def tile(x, S):
    return math.floor(x / S)

def height(x, xc, w, h):
    return h if xc <= x < xc + w else 0.0

def march_T(x, S, xc, w, h, alt, ring=True):
    ta = math.tan(math.radians(alt))
    if ring:
        t0 = tile(x, S)
        lo, hi = (t0 - 1) * S, (t0 + 2) * S          # the pixel's tile and its one-tile ring
        hmax = h if (xc < hi and xc + w > lo) else 0.0
        far = hi - x                                  # the ring's far edge toward the sun (+x)
    else:
        hmax, far = h, float('inf')
    T = hmax / ta                                     # where the ray passes the highest surface
    T = min(T, far, 8 * hmax)                         # capped at the ring's far edge and at 8 x height
    return T

def vis(x, S, xc, w, h, alt, ring=True, N=32):
    ta = math.tan(math.radians(alt)); sigma = math.tan(math.radians(0.27))
    T = march_T(x, S, xc, w, h, alt, ring)
    if T <= 0:
        return 1.0
    v = float('inf')
    for k in range(N):
        t = T * ((k + 0.5) / N) ** 2
        v = min(v, (t * ta - height(x + t, xc, w, h)) / (t * sigma))
    return max(0.0, min(1.0, v))

def run(S, xc, w, h, alt, label):
    L = h / math.tan(math.radians(alt))
    print(f"== {label}: tile side S = {S:.1f} m, caster x in [{xc}, {xc + w}) m, height {h} m, sun altitude {alt} deg; "
          f"similar-triangles shadow from x = {xc - L:.1f} to {xc} m (length {L:.1f} m)")
    step = 0.1
    xs = [round(xc - L - 5 + i * step, 3) for i in range(int((L + 5) / step))]
    prev = None; runs = []
    for x in xs:
        vr = vis(x, S, xc, w, h, alt, True); vf = vis(x, S, xc, w, h, alt, False)
        state = (vr < 0.5, vf < 0.5)
        if state != prev:
            runs.append((x, state)); prev = state
    for x, (r, f) in runs:
        print(f"   from x = {x:7.1f} m: ring-capped law {'SHADOW' if r else 'lit   '} | uncapped law {'SHADOW' if f else 'lit   '}"
              f" | pixel tile {tile(x, S)}")
    # the lit/shadow edge of the ring-capped law and whether it sits on a tile line
    edge = None
    for x in xs:
        if vis(x, S, xc, w, h, alt, True) < 0.5:
            edge = x; break
    tl = [k * S for k in range(-5, 10)]
    near = min(tl, key=lambda t: abs(t - edge)) if edge is not None else None
    print(f"   ring-capped shadow starts at x = {edge} m; nearest tile line {near:.1f} m; "
          f"uncapped shadow starts at x = {next(x for x in xs if vis(x, S, xc, w, h, alt, False) < 0.5)} m")

# the 1:500 stop at tile DPR 2 (S = 33.9 m): a 45 m church tower under the default fixed sun (45 deg)
run(33.9, 70.0, 6.0, 45.0, 45.0, "1:500, DPR 2, fixed sun 45 deg, 45 m tower")
# the same stop at tile DPR 1 (S = 67.7 m): the 30 m tower of §8.3's rows under a low path sun (15 deg)
run(67.7, 140.0, 6.0, 30.0, 15.0, "1:500, DPR 1, path sun 15 deg, 30 m tower")
# a caster whose shadow fits inside one tile side: no cut
run(33.9, 70.0, 6.0, 20.0, 45.0, "1:500, DPR 2, fixed sun 45 deg, 20 m house (control)")

# (2) Sampling: inside the ring, a long march (a low path sun) spaces its far samples by 2 * sqrt(T * t) / N;
# a caster narrower than that spacing is hit at some pixels and missed at others, so its shadow is striped.
def bands(S, xc, w, h, alt, label):
    L = h / math.tan(math.radians(alt))
    xs = [round(xc - L + 0.05 + i * 0.1, 3) for i in range(int(L / 0.1) - 1)]
    lit = [x for x in xs if vis(x, S, xc, w, h, alt, True) >= 0.5]
    runs = 0; prev = None
    for x in xs:
        s = vis(x, S, xc, w, h, alt, True) < 0.5
        if s != prev:
            runs += 1; prev = s
    T = h / math.tan(math.radians(alt))
    print(f"== {label}: {len(lit)} of {len(xs)} samples (0.1 m) inside the similar-triangles shadow read lit under the "
          f"ring-capped law; {runs} alternating runs; far-sample spacing at t = {0.8 * T:.0f} m: {2 * math.sqrt(T * 0.8 * T) / 32:.1f} m "
          f"against the caster's {w} m")
bands(67.7, 100.0, 6.0, 30.0, 15.0, "(2a) 1:500, DPR 1, path sun 15 deg, 30 m x 6 m tower inside the ring")
bands(67.7, 100.0, 12.0, 30.0, 15.0, "(2b) the same with a 12 m-wide caster (control)")
bands(67.7, 100.0, 6.0, 30.0, 45.0, "(2c) the 6 m tower under the default fixed sun, 45 deg (control)")
