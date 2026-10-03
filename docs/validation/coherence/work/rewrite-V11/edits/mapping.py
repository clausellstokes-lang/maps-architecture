"""Map every V11 inventory id to its place in the new volume (scratch inputs: v11-items.tsv, v11-roles.json)."""
import json, re, os, sys
S = '/tmp/claude-0/-home-user-maps-architecture/ce371545-83c4-5807-9f2a-da73abd8485d/scratchpad/coherence'
NEW = '/home/user/maps-architecture/docs/validation/coherence/new/volumes/V11-content.md'
roles = json.load(open(os.path.join(S, 'v11-roles.json')))
new = open(NEW, encoding='utf-8').read()
heads = set()
for l in new.split('\n'):
    m = re.match(r'^#{2,3} ([0-9]+[a-z]?(?:\.[0-9]+[a-z]?)*)', l)
    if m: heads.add(m.group(1))
    for m in re.finditer(r'\*\*([0-9]+\.[0-9]+(?:\.[0-9]+)*) ', l): heads.add(m.group(1))
INMAP = {'IN-V11-1': 'V11 §3.2.1 step 4 (the ownerRule stamp), §3.24.2 (the calibration minima)',
         'IN-V11-2': 'V11 §3.24.1 (the three bend cells), §3.20.1 (the wingRole words)',
         'IN-V11-6': 'V11 §3.16.1 (arcKind), §3.24.4 (bridgeMid minSpanM)'}
NOTES = [(r'yarn', 'positive form (V11-NARR-10)'), (r'lumber camp', 'duplicate entry removed (V11-ICONF-2)'),
         (r'\b179\b|≈ 180', '181 (V11-ICONF-5)'), (r'row 87|MsgRow', 'row types by locale (V11-XCONF-2)'),
         (r'S8\.seed|EVO_GROWTH', 'readers by StageId (V11-ICONF-1)'), (r'mages_guild', 're-designation in place (V11-ICONF-7)'),
         (r'generic-<f>|for every profile family', 'non-alias families (V11-ICONF-3)'),
         (r'stateSnapCm', 'register by V12 §3.11 (V11-XCONF-1); 100 cm stated (J-V11.104)'),
         (r'retainingReachM|flatDepthM|coverShare', "calibrated by V12 §3.11's terrace line (V11-XCONF-3)"),
         (r'register --check', 'joins CI at M1 (V11-XCONF-4)'), (r'calibrate-later', 'register form (V11-DEFER-2)'),
         (r'scratchpad', 'committed manifest the source (V11-DEFER-3)'), (r'Q-V11-1|slave', 'answered J122 (V11-MISSING-1)'),
         (r'commonness', 'v. rows compiled (V11-MISSING-5)'), (r'decline pool|lottery', 'strike pool (G-strike)'),
         (r'DR-V8\.|DR-SKY|DR-V1\.|DR-V6\.', 'DR26–DR35 (ID-DR)'), (r'BCR-45|raised\.vaultShare|span rule', 'span values stated (J-V11.104)'),
         (r'pinning hash|content hash|H128', 'pinning hash per §7.6 (V12-XCONF-2)'),
         (r'uid:|linkEdits|siting\.declared', 'union key forms (V09-XAGREE-1)'),
         (r'derives .?era|culture and the tier', 'era cites V08 §2.6 (V08-XCONF-9)'),
         (r'230 classes', 'count read from REGISTRY (V11-ICONF-4)'), (r'TableId', 'declared at §7.6 (MC-11)'),
         (r'customs house', 'taxes 1.0 (CF-PIPE-10)'), (r'parchment', 'one status (RIC-01)'),
         (r'clamp\(2|per x a_res', 'ranges and a_res = 0 stated (V11-EDGE-2)'),
         (r'W_STEEP_RAMP|1\.5 x rampMaxGrade', 'outcome beyond 1.5× (V11-EDGE-1)')]
rows = []; mapped = 0; unmapped = 0
for line in open(os.path.join(S, 'v11-items.tsv'), encoding='utf-8'):
    p = line.rstrip('\n').split('\t')
    if len(p) < 4: continue
    iid, kind, sec, stmt = p[0], p[1], p[2], p[3]
    r = roles.get(iid, {}); role = r.get('role', 'home')
    if sec == '9':
        m = re.match(r'(J-V11\.\d+)', stmt); loc = 'V11 §9 ' + (m.group(1) if m else '')
    elif sec == '10':
        m = re.search(r'BCR-V11-\d+', stmt); loc = 'V11 §10 (pointer row ' + (m.group(0) if m else '') + ')'
    elif sec == '10b':
        m = re.search(r'X-V11-\d+', stmt); loc = 'V11 §10b (' + (m.group(0) if m else '') + ', closed)'
    elif sec == 'IN':
        m = re.match(r'(IN-V11-\d+)', stmt); loc = INMAP.get(m.group(1) if m else '', 'its home') + ' (note folded)'
    elif sec == '13':
        loc = 'V11 §13 (empty): F-V11-1 → J-V11.105, F-V11-2 → J-V11.106, F-V11-3 closed at V04 §2.3, V06 §2.2'
    elif sec == '11':
        loc = 'V11 §11 (answered, J122), §3.14'
    elif sec in heads or sec in ('0', '1', '1b', '2', '3', '5', '6', '8', '12'):
        loc = 'V11 §' + sec
    else:
        loc = 'V11 §' + sec + ' (?)'
    if role == 'reference': loc += '; reference, cites ' + (r.get('home_sec') or r.get('home_unit') or '')
    elif role == 'bcr-pointer': loc += '; BCR pointer to ' + (r.get('home_sec') or r.get('home_unit') or '')
    elif role == 'index-row': loc += '; index row'
    elif role == 'handoff': loc += '; hand-off, closed'
    note = ''
    for pat, n in NOTES:
        if re.search(pat, stmt): note = n; break
    if '(?)' in loc: unmapped += 1
    else: mapped += 1
    rows.append((iid, kind, sec, role, loc, note))
out = '| id | kind | old § | role | new location | change |\n|---|---|---|---|---|---|\n' + \
      '\n'.join('| %s | %s | %s | %s | %s | %s |' % r for r in rows) + '\n'
open(os.path.join(S, 'v11-mapping.md'), 'w', encoding='utf-8').write(out)
print('mapped', mapped, 'unmapped', unmapped, [r for r in rows if '(?)' in r[4]][:5])
