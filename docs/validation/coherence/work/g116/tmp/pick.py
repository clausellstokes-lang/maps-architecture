# Worked-table check for item 116's revised cost model (additive carriage per load, R14),
# means bands, the pick with blend, and the mix draw. Uniform value within each band (approximation).
import itertools
BANDS=[('squalid',0.6,0.9),('poor',0.9,1.3),('modest',1.3,2.3),('comfortable',2.3,3.2),('prosperous',3.2,4.5),('rich',4.5,10.0)]
RATE={'sea':0.15,'river':0.45,'road':1.5}
BULK={'stone':3,'fired_clay':3,'timber':3,'slate':3,'thatch':2,'lead':2,'earth':0}
REF={'stone':3.0,'fired_clay':3.5,'timber':2.0,'slate':4.0,'thatch':1.0,'lead':8.0}
MASS={'ashlar':'m','rubble':'m','dry_stone':'m','brick':'m','timber_frame':'t','log':'t','boards':'t','wattle_daub':'t','cob':'e','adobe':'e'}
BASE={'ashlar':5.0,'rubble':3.0,'dry_stone':1.3,'brick':3.5,'timber_frame':2.0,'log':1.8,'boards':1.5,'wattle_daub':1.2,'cob':1.0,'adobe':1.0}
FAM={'ashlar':['stone'],'rubble':['stone'],'dry_stone':['stone'],'brick':['fired_clay'],'timber_frame':['timber'],'log':['timber'],'boards':['timber'],'wattle_daub':['timber','earth'],'cob':['earth'],'adobe':['earth']}
NATONLY={'dry_stone','log','wattle_daub','cob','adobe'}
def carriage(f,rate,dkm): return 0 if f=='earth' else REF[f]*RATE[rate]*BULK[f]*dkm/30.0
def cost_native(m,site):
    c=BASE[m]*site.get('F',{}).get(m,1.0)
    if m=='dry_stone': c*= (1.0 if site['stony'] else 1.5); return c  # fieldstone: no carriage
    if m in('cob','adobe') and site['stony']: c*=1.5
    for f in FAM[m]: c+=carriage(f,'road',site['dkm'].get(f,0))
    return c
def cost_traded(m,route,distfac):
    f=FAM[m][0]; return 1.5*(BASE[m]+REF[f]*RATE[route]*BULK[f]*distfac)
def candidates(site,admit):
    out={}
    for m in admit:
        if m=='cob' and 'timber' in site['native']: continue   # R5: cob not admitted where timber is native
        if m=='log' and not site.get('coniferous'): continue
        if m=='adobe' and not site.get('arid'): continue
        if m=='cob' and site.get('arid'): continue
        fams=FAM[m]
        if all(f in site['native'] or f=='earth' for f in fams): out[m]=cost_native(m,site)
        elif m not in NATONLY and all(f in site['traded'] for f in fams if f!='earth'):
            f=fams[0]; out[m]=cost_traded(m,site['traded'][f],1.0)
    return out
def places(c):
    items=sorted(c.items(),key=lambda x:x[1]); pl=[]
    for m,v in items:
        if pl and v<=1.05*pl[-1][0][1]: pl[-1].append((m,v))
        else: pl.append([(m,v)])
    return pl
def pick_share(c,M,blend=0.2,mix=0.5):
    pl=places(c); costs=[p[0][1] for p in pl]
    aff=max([i for i,x in enumerate(costs) if x<=M],default=0)
    nxt=aff+1 if aff+1<len(pl) else None
    if nxt is None: return {pl[aff][0][0]:1.0},0.0
    cn=costs[nxt]; t=min(1,max(0,(M-cn*(1-blend))/(cn*blend)))
    res={}; res[pl[aff][0][0]]=1-t; res[pl[nxt][0][0]]=res.get(pl[nxt][0][0],0)+t
    return res, mix*4*t*(1-t)
def band_shares(site,admit,rung=1.0,N=400):
    c=candidates(site,admit); out=[]
    for name,lo,hi in BANDS:
        acc={}; mixed=0
        for i in range(N):
            M=(lo+(hi-lo)*(i+0.5)/N)*rung
            r,mx=pick_share(c,M)
            for k,v in r.items(): acc[k]=acc.get(k,0)+v/N
            mixed+=mx/N
        out.append((name,{k:round(100*v) for k,v in acc.items() if v>0.005},round(100*mixed)))
    return c,out
HOUSE=['ashlar','rubble','dry_stone','brick','timber_frame','log','wattle_daub','cob','adobe']
cases={
 'both native, good ground, 1 km':dict(native={'stone','timber','earth'},traded={},dkm={'stone':1,'timber':1},stony=False),
 'woods native, no quarry, river partner stone':dict(native={'timber','earth'},traded={'stone':'river'},dkm={'timber':1},stony=False),
 'woods native, no quarry, sea partner stone':dict(native={'timber','earth'},traded={'stone':'sea'},dkm={'timber':1},stony=False),
 'woods native, no quarry, road partner stone':dict(native={'timber','earth'},traded={'stone':'road'},dkm={'timber':1},stony=False),
 'woods native, no partner':dict(native={'timber','earth'},traded={},dkm={'timber':1},stony=False),
 'stone native, timber by sea, good ground':dict(native={'stone','earth'},traded={'timber':'sea'},dkm={'stone':1},stony=False),
 'stone native, stony ground, no timber':dict(native={'stone','earth'},traded={},dkm={'stone':1},stony=True),
 'earth only':dict(native={'earth'},traded={},dkm={},stony=False),
}
for k,s in cases.items():
    c,out=band_shares(s,HOUSE)
    print('==',k); print('   costs',{m:round(v,2) for m,v in sorted(c.items(),key=lambda x:x[1])})
    for b in out: print('  ',b)
# works means
for rung,rm in (('TOWN',1.0),('CITY',1.15),('METROPOLIS',1.3)):
    for kind,wf in (('walls',0.8),('gate',1.2),('bridge',0.8),('castle',1.5)):
        W=10*rm*wf
        for route in ('river','sea','road'):
            cn=cost_traded('rubble',route,1.0); t=min(1,max(0,(W-0.8*cn)/(0.2*cn)))
            print(rung,kind,route,'W=%.2f rubble=%.2f P(stone)=%.2f'%(W,cn,t if W<cn else 1.0))
