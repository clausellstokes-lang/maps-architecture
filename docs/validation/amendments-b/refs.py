# Reference resolver for amendments b (lane amendments-b/assemble-r0, 2026-09-27): a copy of
# docs/validation/consistency/assemble-r0-refs.py with ONE change, the J-id grammar widened by one character so the
# BLOCK PROTOCOL's dotted ids (J-A<item>.<n>) resolve — defined by '\|\s*(J-[A-Z0-9.-]+?)\s*\|', cited by
# '(J-(?:[A-Z]+-?)?\d+(?:\.\d+)?)(?!\d)(?!\.\d)' (the widening every amendments-b seat flagged; its look-ahead is
# "no digit and no '.digit'" rather than the seats' "(?![\d.])", which would silently skip every id that ends a sentence,
# e.g. "J-DET-12."). Everything else is the original, line for line. usage: python3 refs.py <document> <out.json>
# Reference resolver for the assembled document: § refs (with continuation lists), D-n, J-ids, II.n / III.n.
import re, sys, json
path = sys.argv[1]
doc = open(path, encoding='utf-8').read(); lines = doc.split('\n')
heads = set(); dids = set(); jids = set()
fence = False
for l in lines:
    if l.lstrip().startswith('```'): fence = not fence; continue
    if fence: continue
    m = re.match(r'#+\s+(?:§)?((?:\d+|[IVX]+)(?:\.\d+)*)\b', l)
    if m: heads.add(m.group(1))
    m = re.match(r'#+\s+PART\s+([IVX]+)\b', l)
    if m: heads.add(m.group(1))
    for m in re.finditer(r'^\*\*(D-\d+)\b', l): dids.add(m.group(1))
    m = re.match(r'\|\s*(J-[A-Z0-9.-]+?)\s*\|', l)
    if m: jids.add(m.group(1))
EXT = re.compile(r'(\.md|\.json|\.tsv|\.js|\.py|CONFIDENCE|IMPROVEMENTS|critic|proposal|finding|README|AMENDMENTS|OWNER-INSTRUCTIONS|VALIDATION|RATIONALE|rationale|Part [A-F]|capture|ftg-|mfcg-|docs/|research/|NG |VG |canon|inventory)', re.I)
out = []
SEC = re.compile(r'§\s?((?:\d+|[IVX]+)(?:\.\d+)*)')
for i, l in enumerate(lines):
    for m in SEC.finditer(l):
        n = m.group(1).rstrip('.')
        pre = l[max(0, m.start() - 70):m.start()]
        kind = 'sec'
        if n not in heads: out.append(dict(line=i + 1, kind=kind, ref='§' + n, ext=bool(EXT.search(pre)), ctx=l[max(0, m.start() - 70):m.end() + 30]))
        # continuation: "§3.2, 3.4 and 3.6" / "§3.2–3.4"
        pos = m.end()
        while True:
            c = re.compile(r'(?:\s*(?:,|–|/|and|or|to)\s*)(\d+\.\d+(?:\.\d+)*)(?![\d.]*\d)').match(l, pos)
            if not c or '§' in l[pos:c.start(1)]: break
            n2 = c.group(1)
            if n2 not in heads: out.append(dict(line=i + 1, kind='sec-cont', ref=n2, ext=bool(EXT.search(pre)), ctx=l[max(0, m.start() - 40):c.end() + 30]))
            pos = c.end()
    for m in re.finditer(r'(?<![A-Za-z0-9_\-])(D-\d+)(?![\d])', l):
        if m.group(1) not in dids: out.append(dict(line=i + 1, kind='D', ref=m.group(1), ext=False, ctx=l[max(0, m.start() - 60):m.end() + 30]))
    for m in re.finditer(r'(?<![A-Za-z0-9_\-])(J-(?:[A-Z]+-?)?\d+(?:\.\d+)?)(?!\d)(?!\.\d)', l):
        if m.group(1) not in jids: out.append(dict(line=i + 1, kind='J', ref=m.group(1), ext=False, ctx=l[max(0, m.start() - 60):m.end() + 30]))
    for m in re.finditer(r'(?<![A-Za-z0-9_§.])(I{2,3}\.\d+)(?![\d])', l):
        if m.group(1) not in heads: out.append(dict(line=i + 1, kind='II', ref=m.group(1), ext=False, ctx=l[max(0, m.start() - 60):m.end() + 30]))
json.dump(dict(heads=sorted(heads), dids=len(dids), jids=len(jids), broken=out), open(sys.argv[2], 'w'), ensure_ascii=False, indent=0)
from collections import Counter
print('headings', len(heads), 'D ids', len(dids), 'J ids', len(jids), 'broken', len(out))
print(Counter((o['kind'], o['ext']) for o in out))
for o in out: print(f"{o['line']:>5} {o['kind']:<8} {'EXT' if o['ext'] else 'int'} {o['ref']:<10} | {o['ctx']}")
