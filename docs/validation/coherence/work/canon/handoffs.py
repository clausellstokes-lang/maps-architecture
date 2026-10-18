"""coherence/canon step 6: every cross-volume hand-off row in the volumes (their Fix lists, cross-volume requests and
dependency lists), with its destination and its stated status. Output work/canon/handoffs.json."""
import re, json, glob, collections
VOLS = sorted(glob.glob('docs/volumes/V*.md'))
ROW = re.compile(r"^\s*(?:[-*]\s+|\|\s*)?\**\s*(XV-V9-\d+|CVR-V10-\d+|X-V1[12]-\d+|X\d{1,2}|IN-V\d\d-\d+|FL-\d+|\(\d{1,2}\))\b")
DEST = re.compile(r"\b(V\d\d|V\d(?!\d)|volume \d{1,2}|base|file f|BASE-F|integrator|coherence pass)\b")
CLOSED = re.compile(r"\*\*(?:Met|Landed|CLOSED|Closed|met|landed|closed|answered|Answered)\*\*|\bMet in\b|\blanded\b|\banswered\b|\bclosed\b|\bnothing open\b|\bno edit needed\b|\bapplied\b", re.I)
OPEN = re.compile(r"\bOPEN\b|\bopen\b(?! (?:ground|space|span|field|land|country|water|arcade|link|`?open`?))|\bpending\b|\buntil (?:that|the|its) \w+ lands\b|\bnot yet\b|\bstill\b", re.I)
out = []
for f in VOLS:
    v = f.split('/')[-1][:3]
    lines = open(f, encoding='utf-8').read().split('\n')
    sec = None
    for n, l in enumerate(lines, start=1):
        h = re.match(r'^(#{2,4})\s+(.*)', l)
        if h:
            sec = h.group(2)[:60]
            continue
        if not sec:
            continue
        in_scope = re.match(r'^(1 |1b|10|13|11)', sec) or 'Fix list' in sec or 'cross-volume' in sec.lower() or 'hand' in sec.lower() or 'Integration notes' in sec
        if not in_scope:
            continue
        m = ROW.match(l)
        if not m:
            continue
        rid = m.group(1)
        if rid.startswith('(') and not (v in ('V01', 'V07') and (sec.startswith('10') or sec.startswith('1 ') or 'notes' in sec.lower())):
            continue
        text = l.strip()
        # continuation lines
        k = n
        while k < len(lines) and lines[k].strip() and not ROW.match(lines[k]) and not lines[k].startswith('#') and len(text) < 1500:
            text += ' ' + lines[k].strip()
            k += 1
        dests = sorted(set(d if d.startswith('V') and len(d) == 3 else ('V0' + d[1] if re.match(r'^V\d$', d) else d) for d in DEST.findall(text[:260])) - {v})
        status = 'closed-stated' if CLOSED.search(text[:600]) and not OPEN.search(text[:600]) else ('open-stated' if OPEN.search(text[:600]) else 'unstated')
        out.append({'volume': v, 'id': rid, 'section': sec, 'line': n, 'dest': dests, 'status': status, 'text': text[:700]})
json.dump(out, open('docs/validation/coherence/work/canon/handoffs.json', 'w'), ensure_ascii=False, indent=0)
c = collections.Counter((h['volume'], h['status']) for h in out)
print(len(out), 'hand-off rows')
for v in sorted(set(h['volume'] for h in out)):
    print(v, {s: c[(v, s)] for s in ('open-stated', 'unstated', 'closed-stated') if c[(v, s)]})
