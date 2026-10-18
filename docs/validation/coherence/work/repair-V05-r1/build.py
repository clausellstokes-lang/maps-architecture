#!/usr/bin/env python3
"""repair-V05-r1 builder: (1) the S7 prefixes of VV56-14 (the 64 list continuations the scan finds after a volume prefix,
asserted equal to the issue's list, each given its volume's prefix), then (2) count-asserted substitutions (edits_*.py,
each (tag, old, new[, count])) on the result. Source: docs/volumes/V05-sky.md as assemble-r0 left it. Output: V05-new.md."""
import os, re, sys, hashlib, importlib.util
HERE = os.path.dirname(os.path.abspath(__file__))
SRC = '/home/user/maps-architecture/docs/volumes/V05-sky.md'   # as assemble-r0 left it (take it from git history once replaced)
SRC_SHA = '1326b372a0f6783705b3705c60108902a1e14e9dda190b6bf550d3dad203394f'
OUT = os.path.join(HERE, 'V05-new.md')

EXPECTED = """124 V05 §3.4|128 V05 §3.7|136 V05 §3.11|142 V05 §8|147 V05 §3.5|154 V05 §3.11|162 V05 §3.2|162 V05 §3.7|174 V05 §3.5|
180 V05 §2.5|182 V05 §5.3|184 V05 §8|186 V01 §3.1|186 V01 §3.2|188 V04 §3.10|189 V06 §2.8|189 V06 §3.2|189 V06 §3.4|190 V08 §3.5|
191 V09 §4.9|191 V09 §5.4|191 V09 §6.4|193 V11 §3.5|193 V11 §3.9|194 V12 §3.11|228 V05 §3.11|235 V05 §2.2|256 V05 §3.11|
271 V06 §3.2|276 V05 §3.10|279 V05 §3.10|439 V01 §2.3|464 V05 §4.2|480 V05 §2.1|495 V05 §3.5|495 V05 §3.10|525 V05 §3.9|
546 V05 §4.2|550 V05 §3.5|550 V05 §3.10|675 V05 §3.7|715 V05 §3.7|964 V05 §3.10|1187 V05 §4.2|1204 V06 §3.2|1445 V01 §2.3|
1468 V05 §4.5|1651 V05 §3.10|1682 V05 §3.10|1709 V05 §3.10|1709 V05 §4.2|1720 V05 §5|2004 V05 §3.10|2546 V05 §3.11|
2612 V05 §3.9|2775 V05 §3.9|2775 V05 §6|2779 V04 §3.10|2779 V06 §3.2|2779 V06 §3.4|2780 V06 §6.2|2780 V09 §5.4|
2788 V05 §3.10|2788 V05 §4.2"""

SEC = r'§\d+(?:\.\d+)*[a-z]?'
PAREN = r'(?:\s*\((?:[^()]|\([^()]*\))*\)(?:–\((?:[^()]|\([^()]*\))*\))?)*'
SEP = r'(?:,\s+and\s+|,\s+or\s+|,\s+|\s+and\s+|\s+or\s+|–)'

def prefixes(t):
    head = re.compile(r'\bV(\d\d) (' + SEC + ')' + PAREN)
    cont = re.compile(SEP + '(' + SEC + ')' + PAREN)
    found = {}
    for m in head.finditer(t):
        pos = m.end()
        while True:
            c = cont.match(t, pos)
            if not c: break
            found[c.start(1)] = (t.count('\n', 0, c.start(1)) + 1, 'V' + m.group(1), c.group(1))
            pos = c.end()
    return found

def load(name):
    spec = importlib.util.spec_from_file_location(name, os.path.join(HERE, name + '.py'))
    m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m); return m.EDITS

def main():
    text = open(SRC, encoding='utf-8').read()
    src_sha = hashlib.sha256(text.encode()).hexdigest()
    if src_sha != SRC_SHA: print('SOURCE CHANGED: not the assemble-r0 V05; take it from git history'); sys.exit(2)
    found = prefixes(text)
    got = sorted(f'{l} {v} {s}' for (l, v, s) in found.values())
    exp = sorted(x.strip() for x in EXPECTED.replace('\n', '').split('|'))
    if got != exp:
        print('PREFIX SET MISMATCH'); print(sorted(set(got) - set(exp))); print(sorted(set(exp) - set(got))); sys.exit(1)
    for pos in sorted(found, reverse=True):
        text = text[:pos] + found[pos][1] + ' ' + text[pos:]
    bad = 0; n = 0; tags = {}
    for p in ['edits_a', 'edits_b', 'edits_c', 'edits_d', 'edits_e']:
        if not os.path.exists(os.path.join(HERE, p + '.py')): continue
        for e in load(p):
            tag, old, new = e[0], e[1], e[2]
            cnt = e[3] if len(e) > 3 else 1
            have = text.count(old)
            if have != cnt:
                print(f'FAIL {p} {tag}: expected {cnt}, found {have}: {old[:100]!r}'); bad += 1; continue
            text = text.replace(old, new); n += 1
            tags[tag] = tags.get(tag, 0) + 1
    open(OUT, 'w', encoding='utf-8').write(text)
    print(f'source sha256 {src_sha[:16]}; prefixes {len(found)}; applied {n} edits, {bad} failed; out sha256 {hashlib.sha256(text.encode()).hexdigest()[:16]}')
    for t in sorted(tags): print(f'  {t}: {tags[t]}')
    sys.exit(1 if bad else 0)

if __name__ == '__main__':
    main()
