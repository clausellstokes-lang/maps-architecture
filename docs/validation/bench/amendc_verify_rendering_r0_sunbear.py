# §8.3's census row "lighting, the cursor sun": "at sunHeight 64 the shadow bearings of any two casters within 2°".
# §8.4 (d): G = V + s*u (u = C - V, C the pointer's ground point), H = h0*D*s. A caster's shadow points from G through
# the caster (away from G). Casters taken at the view's four corners and centre-edge points (a golden TOWN fills the
# view); pointer positions on a 20 x 10 grid over a 1440 x 900 view (200 positions).
import math
W, Hh = 1440.0, 900.0
D = math.hypot(W/2, Hh/2)
casters = [(x, y) for x in (-W/2, 0, W/2) for y in (-Hh/2, 0, Hh/2)]
s = 64
ok = 0; worst = 0; spreads = []
for i in range(20):
    for j in range(10):
        cx = -W/2 + (i + 0.5) * W / 20; cy = -Hh/2 + (j + 0.5) * Hh / 10
        gx, gy = s * cx, s * cy
        bearings = []
        for (px, py) in casters:
            dx, dy = px - gx, py - gy
            if abs(dx) < 1e-9 and abs(dy) < 1e-9: continue
            bearings.append(math.atan2(dy, dx))
        # max pairwise angular difference
        m = 0
        for a in bearings:
            for b in bearings:
                d = abs((a - b + math.pi) % (2*math.pi) - math.pi)
                m = max(m, d)
        spreads.append(math.degrees(m))
        if math.degrees(m) <= 2.0: ok += 1
spreads.sort()
print(f"positions meeting <= 2 deg: {ok}/200; spread min {spreads[0]:.2f} deg, median {spreads[100]:.2f} deg, max {spreads[-1]:.2f} deg")
# the tip-distance statement: tip beyond the caster at d*h/(H-h) (§8.4 (d)); the census row says 'from the sun's ground point'
d, h, Hs = 300.0, 10.0, 60.0
print(f"example d={d}, h={h}, H={Hs}: tip beyond caster {d*h/(Hs-h):.1f}; tip from G {d + d*h/(Hs-h):.1f} (= d*H/(H-h) = {d*Hs/(Hs-h):.1f})")
