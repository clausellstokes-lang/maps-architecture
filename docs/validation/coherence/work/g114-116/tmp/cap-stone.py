# Item 116's traded-stone reach under item 114's prosperity ceiling (default cells of 116 (a), (e), (f), (g)).
# A plot takes a candidate when its means M reaches (1 - blend) x the candidate's cost (the next place's partial take).
blend = 0.2
premium = 1.5
route = {'sea': 0.15, 'river': 0.45, 'road': 1.5}
refLegM = 30000.0
rubble, ashlar = 3.0, 5.0
refStone, bulkStone = 3.0, 3.0
means = {'squalid': (0.6, 0.9), 'poor': (0.9, 1.3), 'modest': (1.3, 2.3), 'comfortable': (2.3, 3.2), 'prosperous': (3.2, 4.5), 'rich': (4.5, 10.0)}
ranks = ['squalid', 'poor', 'modest', 'comfortable', 'prosperous', 'rich']
rungMeans = {'THORP': 0.5, 'HAMLET': 0.6, 'VILLAGE': 0.75, 'TOWN': 1.0, 'CITY': 1.15, 'METROPOLIS': 1.3}

def traded(base, r, dm):
    d = min(max(dm / refLegM, 0.5), 3.0)
    return premium * (base + refStone * route[r] * bulkStone * d)

def at_of(e):  # 114 (b): default rows {0, modest}, {50, rich}
    return 2 + 3 * min(e, 50) / 50.0

def top_means(e):
    import math
    at = at_of(e)
    c = math.ceil(at - 1e-12) if at > 0 else 0
    c = min(c, 5)
    f = at - c + 1
    lo, hi = means[ranks[c]]
    lo_prev_hi = means[ranks[c - 1]][1] if c > 0 else lo
    upper_116 = lo + f * (hi - lo)
    upper_114 = lo_prev_hi + f * (hi - lo_prev_hi)  # lerp(hi_{c-1}, hi_c, f)
    return ranks[c], f, upper_116, upper_114

print('economy -> (band c, f, top means by 116 [lo_c + f(hi_c-lo_c)], by 114 R*_c upper end lerp(hi_{c-1},hi_c,f))')
for e in [0, 10, 16.67, 20, 25, 33.34, 40, 45, 49, 50, 75, 100]:
    b, f, u6, u4 = top_means(e)
    print(f'  {e:6.2f}: c={b:11s} f={f:.3f}  top116={u6:.3f}  top114={u4:.3f}  equal={abs(u6-u4)<1e-9}')

print('\nlargest distance (km) at which traded rubble reaches the top of a town capped at prosperous (economy <= 33 1/3):')
for rung in ['TOWN', 'CITY', 'METROPOLIS']:
    M = 4.5 * rungMeans[rung]
    reach = M / (1 - blend)
    out = []
    for r in ['sea', 'river', 'road']:
        # solve premium*(rubble + refStone*route*bulk*d) <= reach, d in [0.5, 3]
        dmax = (reach / premium - rubble) / (refStone * route[r] * bulkStone)
        if dmax < 0.5:
            out.append(f'{r}: none (cost at 0.5 x refLeg = {traded(rubble, r, 0.5*refLegM):.2f} > {reach:.2f})')
        else:
            out.append(f'{r}: within {min(dmax,3)*refLegM/1000:.1f} km')
    print(f'  {rung}: top means {M:.3f}, reach {reach:.3f}; ' + '; '.join(out))

print('\neconomy at which river-borne rubble (refLeg, 10.58) first reaches the top of a TOWN:')
import math
need = traded(rubble, 'river', refLegM) * (1 - blend)
f = (need - 4.5) / (10 - 4.5)
at = 4 + f
e = (at - 2) / 3 * 50
print(f'  cost {traded(rubble,"river",refLegM):.3f}; top means needed {need:.3f}; f {f:.3f}; economy {e:.1f}')
