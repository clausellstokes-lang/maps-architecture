import json, sys, collections
tot=collections.Counter(); stages=0; differ=[]; pairs=[]; works=[]; nwork=collections.Counter()
for path in sys.argv[1:]:
    for line in open(path):
        d=json.loads(line); stages+=1
        for r in d['rows']:
            tot[r['kind']]+=1
            if not r['same']: differ.append((d['tag'], d['stage'], r['i'], r['kind'], r['seq'], r['iso']))
        for p in d['pairs']: pairs.append((d['tag'], d['stage'], p))
        if d['work']: works.append(d['work']['total']); 
print('walled stages k>=2 planned:', stages, 'crossings by kind:', dict(tot), 'total', sum(tot.values()))
print('pairs within 229 cm or sharing an untouched way edge:', len(pairs))
for p in pairs[:30]: print('  ', p)
print('crossings whose per-crossing plan differs from the sequence:', len(differ))
for x in differ[:30]: print('  ', x)
if works: print('plan work: min', min(works), 'max', max(works), 'mean', round(sum(works)/len(works),1), 'n', len(works))
