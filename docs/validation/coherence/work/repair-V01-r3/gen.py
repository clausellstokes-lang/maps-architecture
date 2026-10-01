#!/usr/bin/env python3
"""repair-r3-V01 generator (coherence/repair-V01-r3): count-asserted substitutions over the live V01 (V01.orig.md =
assemble-r1's install), producing V01.new.md and diff.txt, then the subsection blocks (blocks.txt) whose application to
V01.orig.md must give V01.new.md byte for byte (checked with the BLOCK PROTOCOL's apply-blocks.py on a copy).
Edits: edits_a (the five routed issues and the five END lines of adjudication-r3's Part H · V01).
Untouched text stays byte-identical."""
import os, re, sys, difflib, hashlib, json
S = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, S)
ROOT = '/home/user/maps-architecture'
LIVE = os.path.join(ROOT, 'docs/volumes/V01-neighbourhoods.md')
orig = open(os.path.join(S, 'V01.orig.md'), encoding='utf-8').read()
assert open(LIVE, encoding='utf-8').read() == orig, "the live V01 is no longer assemble-r2's install"
sha = lambda s: hashlib.sha256(s.encode('utf-8')).hexdigest()

import edits_a
mods = [edits_a]
edits_b = None
text = orig
log = []
for mod in mods:
    for tag, old, new, count in mod.build(text):
        k = text.count(old)
        if k != count:
            sys.exit(f'FAIL {tag}: {k} occurrences, {count} expected: {old[:200]!r}')
        text = text.replace(old, new)
        log.append(tag)
open(os.path.join(S, 'V01.new.md'), 'w', encoding='utf-8').write(text)
d = difflib.unified_diff(orig.split('\n'), text.split('\n'), 'V01.orig.md', 'V01.new.md', lineterm='', n=0)
open(os.path.join(S, 'diff.txt'), 'w', encoding='utf-8').write('\n'.join(d) + '\n')

FENCE = re.compile(r'^\s*(```|~~~)')
HEAD = re.compile(r'^(#{1,6})\s+\S')
def heads(lines):
    out, fence = [], None
    for i, l in enumerate(lines):
        m = FENCE.match(l)
        if m:
            fence = m.group(1) if fence is None else (None if m.group(1) == fence else fence)
            continue
        if fence is None and HEAD.match(l):
            out.append((i, len(l) - len(l.lstrip('#')), l))
    return out
def section(lines, heading):
    H = heads(lines)
    ks = [k for k, h in enumerate(H) if h[2] == heading]
    assert len(ks) == 1, (heading, len(ks))
    i, lvl, _ = H[ks[0]]
    e = next((h[0] for h in H[ks[0] + 1:] if h[1] <= lvl), len(lines))
    body = lines[i:e]
    while body and not body[-1].strip():
        body.pop()
    return body

O, N = orig.split('\n'), text.split('\n')
# Every REPLACE: a subsection whose text changed. Computed: each changed line's innermost heading, then the smallest
# heading level that is a leaf block (a heading with no child heading that also changed is replaced alone).
HO = heads(O)
changed_heads = set()
sm = difflib.SequenceMatcher(a=O, b=N, autojunk=False)
for tag, i1, i2, j1, j2 in sm.get_opcodes():
    if tag == 'equal':
        continue
    for i in range(i1, max(i2, i1 + 1)):
        i = min(i, len(O) - 1)
        own = [h for h in HO if h[0] <= i]
        changed_heads.add(own[-1][2])
# One REPLACE per changed heading (a changed line's innermost heading); a heading with children is replaced only when its
# own head text changed, and then whole (gen stops for a hand decision instead).
final = [('REPLACE', h) for _, _, h in HO if h in changed_heads]
blocks, inv = [], []
for kind, target in final:
    ob = section(O, target)
    nb = section(N, target)
    if ob == nb:
        continue
    # a parent heading's body includes its children: emit the parent only when its text before the first child changed
    i = [x[2] for x in HO].index(target)
    lvl = HO[i][1]
    child = next((h for h in HO[i + 1:] if h[1] > lvl), None)
    nxt = next((h for h in HO[i + 1:] if h[1] <= lvl), None)
    if child and (nxt is None or child[0] < nxt[0]):
        # parent with children: compare only its head text
        ohead = O[HO[i][0]:child[0]]
        nhi = [k for k, l in enumerate(N) if l == target][0]
        nchild = [k for k, l in enumerate(N) if l == child[2]][0]
        nhead = N[nhi:nchild]
        if ohead == nhead:
            continue
        raise SystemExit(f'parent head text changed, handle by hand: {target}')
    blocks += [f'=== {kind} {target} ==='] + nb + ['=== END ===', '']
    inv.append(dict(kind=kind, target=target, lines=len(nb), words=len(' '.join(nb).split())))
if edits_b is not None and hasattr(edits_b, 'APPENDS'):
    for target, body in edits_b.APPENDS:
        blocks += [f'=== APPEND TO SECTION {target} ==='] + body.rstrip('\n').split('\n') + ['=== END ===', '']
        inv.append(dict(kind='APPEND TO SECTION', target=target, lines=body.count('\n'), words=len(body.split())))
open(os.path.join(S, 'blocks.txt'), 'w', encoding='utf-8').write('\n'.join(blocks))
wc = lambda s: len(s.split())
res = dict(edits=len(log), tags=log, blocks=len(inv), inventory=inv, orig_sha=sha(orig), new_sha=sha(text),
           words_before=wc(orig), words_after=wc(text))
json.dump(res, open(os.path.join(S, 'gen-log.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('edits', len(log), 'blocks', len(inv))
for x in inv:
    print('  ', x['kind'], x['target'][:90], x['lines'])
print('orig sha', res['orig_sha'][:16], 'words', res['words_before'])
print('new  sha', res['new_sha'][:16], 'words', res['words_after'], f"({(res['words_after'] - res['words_before']) / res['words_before'] * 100:+.2f} %)")
