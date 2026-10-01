# VV78-16: prefix every bare § continuation of a volume list in V07 with its volume (S7's form); the two base
# references the issue names were reworded in subs_b, so every remaining ambiguous or FIX continuation is a volume's.
import json, os, subprocess, tempfile
HERE = os.path.dirname(os.path.abspath(__file__))
SCR = os.path.join(HERE, '..')
def scan(text):
    tmp = os.path.join(SCR, 'V07.scan.md'); open(tmp, 'w', encoding='utf-8').write(text)
    out = os.path.join(SCR, 'refs-scan.json')
    env = dict(os.environ, V07FILE=tmp, ONLYV07='1')
    subprocess.run(['python3', os.path.join(HERE, 'refs7.py'), out], env=env, check=True, capture_output=True)
    return json.load(open(out))
def apply(d):
    r = scan(d.t)
    todo = []
    for x in r['refs']:
        if x['unit'] != 'V07' or x['kind'] != 'bare': continue
        if x['cls'] == 'ambiguous': unit = x['head'].split(':')[1]
        elif x['cls'] == 'FIX': unit = x['fix_unit']
        else: continue
        todo.append((x['orig'], unit, x['line'], x['ref'], x['ctx']))
    t = d.t
    log = []
    for o, unit, line, ref, ctx in sorted(todo, reverse=True):
        assert t[o] == '§', (o, t[o:o+10], ctx)
        t = t[:o] + unit + ' ' + t[o:]
        log.append((line, unit, ref, ctx.replace('\n', ' ')))
    d.t = t
    d.log.append(('VV78-16 prefixes', len(todo)))
    with open(os.path.join(SCR, 'prefix-log.tsv'), 'w', encoding='utf-8') as f:
        for line, unit, ref, ctx in sorted(log):
            f.write(f'{line}\t{unit}\t{ref}\t{ctx}\n')
    print('prefixed', len(todo))

# keep the stage diagram's column alignment after a prefix (V07 §3.0's fenced diagram)
def _fix_diagram(d):
    old = "S2   Programme at village rungs (V07 §3.2 (3), V07 §3.8)                        [base stage; village rows]"
    new = "S2   Programme at village rungs (V07 §3.2 (3), V07 §3.8)                    [base stage; village rows]"
    assert d.t.count(old) == 1, 'diagram line'
    d.t = d.t.replace(old, new)
_apply0 = apply
def apply(d):
    _apply0(d)
    _fix_diagram(d)
