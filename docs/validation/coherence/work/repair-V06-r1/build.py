#!/usr/bin/env python3
"""repair-V06-r1 builder: count-asserted substitutions on the live V06, written to rV06/V06-new.md.
Each edit is (tag, old, new, count). Run: python3 build.py"""
import os, sys, importlib.util, hashlib
HERE = os.path.dirname(os.path.abspath(__file__))
SRC = '/home/user/maps-architecture/docs/volumes/V06-evolution.md'
OUT = os.path.join(HERE, 'V06-new.md')

def load(name):
    spec = importlib.util.spec_from_file_location(name, os.path.join(HERE, name + '.py'))
    m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m); return m.EDITS

def main():
    text = open(SRC, encoding='utf-8').read()
    src_sha = hashlib.sha256(text.encode()).hexdigest()
    parts = [p for p in ['edits_a', 'edits_b', 'edits_c', 'edits_d', 'edits_e', 'edits_f'] if os.path.exists(os.path.join(HERE, p + '.py'))]
    bad = 0; n = 0; tags = {}
    for p in parts:
        for e in load(p):
            tag, old, new = e[0], e[1], e[2]
            cnt = e[3] if len(e) > 3 else 1
            if isinstance(old, tuple) and old[0] == 'BETWEEN':
                a, b = old[1], old[2]
                if text.count(a) != 1 or text.count(b) != 1 or text.index(a) > text.index(b):
                    print(f'FAIL {p} {tag}: BETWEEN anchors {text.count(a)}/{text.count(b)}'); bad += 1; continue
                i, j = text.index(a), text.index(b)
                text = text[:i] + new + text[j:]; n += 1; tags[tag] = tags.get(tag, 0) + 1
                continue
            have = text.count(old)
            if have != cnt:
                print(f'FAIL {p} {tag}: expected {cnt}, found {have}: {old[:90]!r}'); bad += 1; continue
            text = text.replace(old, new); n += 1
            tags[tag] = tags.get(tag, 0) + 1
    open(OUT, 'w', encoding='utf-8').write(text)
    print(f'source sha256 {src_sha[:16]}; applied {n} edits, {bad} failed; out {OUT}')
    for t in sorted(tags): print(f'  {t}: {tags[t]}')
    sys.exit(1 if bad else 0)

if __name__ == '__main__':
    main()
