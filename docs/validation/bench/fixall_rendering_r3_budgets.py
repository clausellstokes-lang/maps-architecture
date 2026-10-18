# fixall/draft-rendering-r3 (2026-09-25, opus stand-in, pending Fable review). Our own arithmetic; stdlib only.
# NR-1: where O3 (d)'s model-time bars hold under §12.3's p95 laws, and the max clause (1.25 x the law);
# NR-2: the plain-words first-map figures; NR-5: the transient export list per rung.
PPB = 3.4                                                         # persons per building, §12.2 (PLAUSIBLE)
pool = {'TOWN': (20, 60), 'CITY': (40, 50), 'METROPOLIS': (100, 52)}         # §12.3 p95 pool laws: ms + us x B
single = {'TOWN': (20, 71), 'CITY': (40, 69), 'METROPOLIS': (100, 67)}        # §12.3 single-worker p95 laws
bar = {'TOWN': 100, 'CITY': 300, 'METROPOLIS': 1000}              # IMPROVEMENTS O3 (d): p50 / p95 / max per size class
bandB = {'TOWN': (440, 2940), 'CITY': (2940, 8820), 'METROPOLIS': (8820, 35000)}   # §12.5's band ends in buildings
targetB = {'TOWN': (1200, 1500), 'CITY': (4500, 6000), 'METROPOLIS': (12000, 15000)}  # §12.2 buildings at the target
MAXF = 1.25                                                       # the max clause: every generation <= 1.25 x its law
law = lambda ab, B: ab[0] + ab[1] * B / 1000.0
knee = lambda ab, t: (t - ab[0]) / (ab[1] / 1000.0)
print("NR-1  O3 (d) model-time bars against the p95 laws of §12.3")
for r in pool:
    a = pool[r]; s = single[r]; lo, hi = bandB[r]; tl, th = targetB[r]
    kp = knee(a, bar[r]); km = knee(a, bar[r] / MAXF); ks = knee(s, bar[r]); ksm = knee(s, bar[r] / MAXF)
    print(f" {r}: bar {bar[r]} ms; law p95 = {a[0]} ms + {a[1]} us x B")
    print(f"   band bottom B={lo}: p95 {law(a, lo):.0f} ms, max bound {MAXF*law(a, lo):.0f} ms")
    print(f"   default request B={tl}-{th}: p95 {law(a, tl):.0f}-{law(a, th):.0f} ms, max bound {MAXF*law(a, tl):.0f}-{MAXF*law(a, th):.0f} ms")
    print(f"   band top B={hi}: p95 {law(a, hi):.0f} ms, max bound {MAXF*law(a, hi):.0f} ms")
    print(f"   p95 bar holds up to B = {kp:.0f} (~{kp*PPB:.0f} people); max bar holds up to B = {km:.0f} (~{km*PPB:.0f} people)")
    print(f"   single-worker: p95 bar up to B = {ks:.0f} (~{ks*PPB:.0f} people), max bar up to B = {ksm:.0f} (~{ksm*PPB:.0f} people); band top p95 {law(s, hi):.0f} ms")
    print(f"   per-building p95 that would hold the bar at the band top: {(bar[r]-a[0])/hi*1000:.1f} us (the law has {a[1]} us)")
print()
print("NR-2  first map T(B) = model law + F(B) (20 ms + 10 us x B), §12.5")
first = {'TOWN': (40, 70), 'CITY': (60, 60), 'METROPOLIS': (120, 62)}
for r in first:
    a = first[r]; lo, hi = bandB[r]
    print(f" {r}: band top B={hi} -> {law(a, hi):.0f} ms; 0.25 s up to B = {knee(a, 250):.0f} (~{knee(a, 250)*PPB:.0f} people); 0.5 s up to B = {knee(a, 500):.0f} (~{knee(a, 500)*PPB:.0f} people); 1 s up to B = {knee(a, 1000):.0f} (~{knee(a, 1000)*PPB:.0f} people)")
print(f" CITY at 20 000 people (B={20000/PPB:.0f}): {law(first['CITY'], 20000/PPB):.0f} ms; at 30 000 people (B={30000/PPB:.0f}): {law(first['CITY'], 30000/PPB):.0f} ms")
print()
print("NR-5  transient export list, city band: §8.1 item 6 gives ~10 MB for ~60 000 marks at CITY (5 200 buildings)")
per_mark = 10e6 / 60000; per_bld = 10e6 / 5200
print(f"   {per_mark:.0f} B per mark; {per_bld:.0f} B per building")
for r, B in [('TOWN target', 1333), ('CITY target', 5200), ('CITY band top', 8820), ('METROPOLIS target', 13460), ('METROPOLIS cap', 35000)]:
    print(f"   {r} B={B}: list ~{per_bld*B/1e6:.1f} MB; S14 build at ~4 us per building ~{4*B/1000:.0f} ms")
