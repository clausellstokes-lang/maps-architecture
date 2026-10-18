# fixall/draft-rendering-r2 (2026-09-25, opus stand-in, pending Fable review). Our own arithmetic; stdlib only.
# N-2: first-map laws per rung; N-5: tile counts; N-9: canvas budgets; N-16: verification bound.
import math
PPB = 3.4                       # persons per building, §12.2 (PLAUSIBLE)
model = {'TOWN': (20, 60), 'CITY': (40, 50), 'METROPOLIS': (100, 52)}     # §12.3 p95 pool laws: ms + us x B
single = {'TOWN': (20, 71.3), 'CITY': (40, 69.2), 'METROPOLIS': (100, 66.9)}  # fitted through §12.3's single-worker p95 at the law's target B
band = {'TOWN': (1500, 5000, 9999), 'CITY': (10000, 20000, 29999), 'METROPOLIS': (30000, 50000, 120000)}
target_B = {'TOWN': (1200, 1500), 'CITY': (4500, 6000), 'METROPOLIS': (12000, 15000)}   # §12.2 "buildings at the target"
bar = {'TOWN': 150, 'CITY': 400, 'METROPOLIS': 1000}
F0, F1 = 20, 10                 # first city-band frame: 20 ms + 10 us x B (reference viewport, P <= 35)
# the single-worker per-building slopes: through §12.3's single-worker p95 (115 / 400 / 1000 ms) at the B where the pool law gives 100 / 300 / 800 ms
for r, (a, b) in model.items():
    tgt = {'TOWN': 100, 'CITY': 300, 'METROPOLIS': 800}[r]
    Bt = (tgt - a) / (b / 1000)
    ss = {'TOWN': 115, 'CITY': 400, 'METROPOLIS': 1000}[r]
    print(f"{r}: pool-law target B = {Bt:.0f} ({Bt*PPB:.0f} people at {PPB}); single-worker slope through {ss} ms = {(ss - a)/Bt*1000:.1f} us")
print()
for r in model:
    a, b = model[r]; T0, T1 = a + F0, b + F1
    sa, sb = single[r]; S0, S1 = sa + F0, sb + F1
    lo, df, hi = band[r]
    Bs = [p / PPB for p in (lo, df, hi)]
    knee_bar = (bar[r] - T0) / (T1 / 1000)
    knee_1s = (1000 - T0) / (T1 / 1000)
    print(f"{r}: first map T(B) = {T0} ms + {T1} us x B ; single-worker {S0} ms + {S1:.0f} us x B")
    for name, p, B in zip(('bottom', 'default', 'top'), (lo, df, hi), Bs):
        print(f"   {name:7s} {p:>7d} people ~ {B:>6.0f} buildings: model {a + b*B/1000:6.0f} ms, first frame {F0 + F1*B/1000:5.0f} ms, first map {T0 + T1*B/1000:6.0f} ms (single {S0 + S1*B/1000:6.0f} ms)")
    tl, th = target_B[r]
    print(f"   at the target's building range {tl}-{th}: {T0 + T1*tl/1000:.0f}-{T0 + T1*th/1000:.0f} ms (single {S0 + S1*tl/1000:.0f}-{S0 + S1*th/1000:.0f} ms)")
    print(f"   rung bar {bar[r]} ms holds up to B = {knee_bar:.0f} ({knee_bar*PPB:.0f} people); one second up to B = {knee_1s:.0f} ({knee_1s*PPB:.0f} people)")
    if r == 'METROPOLIS':
        print(f"   at the 35 000-building cap: {T0 + T1*35:.0f} ms; single-worker one-second knee B = {(1000-S0)/(S1/1000):.0f} ({(1000-S0)/(S1/1000)*PPB:.0f} people)")
print()
# first-frame composition at the reference viewport (N-5)
def P(w, h, dpr, tile=512):
    return (math.ceil(w*dpr/tile) + 1) * (math.ceil(h*dpr/tile) + 1)
for (w, h, d) in [(1440, 900, 2), (1440, 900, 1.5), (1366, 768, 1), (1920, 1080, 1), (2560, 1440, 1.5), (2560, 1440, 1), (1920, 1080, 2)]:
    p = P(w, h, d)
    print(f"viewport {w}x{h} CSS px at DPR {d}: worst-case tile positions P = {p}; canvas need 3P + 7 = {3*p + 7} MB; path-mode split 4.25P + 7 = {4.25*p + 7:.0f} MB")
p = P(1440, 900, 2)
fixed = p * (0.25 + 0.10 + 0.10) + 2 + 1      # base raster fixed, label compose, commit per position; S13b 2 ms; glyph copies ~1 ms
print(f"first-frame fixed term at P = {p}: {fixed:.1f} ms (0.25 raster + 0.10 compose + 0.10 commit per position, + 2 ms S13b + 1 ms glyphs)")
print("first-frame per-building term: S14 4 us + delivery 1 us + city-band raster 5 us = 10 us")
for r, B in [('TOWN', 1470), ('CITY', 5200), ('METROPOLIS', 13460)]:
    print(f"   {r} B={B}: F = {fixed + 10*B/1000:.0f} ms (law {F0 + F1*B/1000:.0f} ms)")
print()
# settle at the city band and district band (N-5)
for r, B in [('CITY', 5200), ('METROPOLIS', 13460)]:
    s_city = p*0.45 + 5*B/1000
    print(f"settle {r} whole-town view at the city band: {s_city:.0f} ms; district-band view of 3 000 buildings: {p*0.45 + 12*3000/1000:.0f} ms")
print()
# N-16: verification of a CITY document with 300 edits (reference mix); per-event cost = model scope cost
# + succession matching (<= 2 us per re-derived entity, §6.3) + S13a's scoped delta (<= 3 ms for an event that re-derives names)
M = 300; S14 = 20; root = 5
ents_block, ents_district = 200, 1500      # re-derived entities (buildings, plots, yard parts, households) per scope, PLAUSIBLE
mix = [('light: attribute, label, lock, pin, style, table row without re-derivation', 200, 0.5),
       ('plot-scale: build, drawFootprint, split, join, fill on one plot (<= 5 ms model + 3 ms S13a)', 80, 5 + 3),
       ('block regeneration, <= 60 buildings (3 + 0.06 x 60 + matching + 3 S13a)', 15, 3 + 0.06*60 + 0.002*ents_block + 3),
       ('district regeneration, <= 450 buildings (3 + 0.06 x 450 + matching + 3 S13a)', 5, 3 + 0.06*450 + 0.002*ents_district + 3)]
tot = M + S14 + root
for name, n, c in mix:
    print(f"  {n:3d} x {c:5.1f} ms  {name}"); tot += n*c
print(f"verification (reference mix, CITY): {M} (replay from the recipe, p95) + sum + {S14} (one S14) + {root} (root) = {tot:.0f} ms")
dist = 3 + 0.06*450 + 0.002*ents_district + 3
print(f"worst case 300 district regenerations: {M + S14 + root + 300*dist:.0f} ms")
