#!/usr/bin/env python3
"""prosecheck.py — the guard of the verbose-prose pass (VRC0S-26; principle (9)'s guard).

For every hunk of the patches/9*-prose-*.patch files: every load-bearing token of the OLD text must survive in the NEW
text (as a set): numbers (with their decimal and thin-space groups), `code` spans, §-references, ids (J-…, D-…, T-…,
R12-…, N-…, VIS-…, SCL-…, …), item numbers ('item 67', 'file f item 405', 'g item 112'), milestone names (M0 … M6-sky),
volume references (V01 … V12 §x), rung names and quoted words. A token lost fails the hunk. Normative words (never,
only, every, each, no, not, at most, at least, unless, except, before, after) are counted: a drop is listed as a WARN
for review, never silently. usage: python3 prosecheck.py   (exit 1 on any failure)
"""
import glob, os, re, sys
from collections import Counter

W = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, W)
from apply import parse  # noqa: E402

TOKEN = re.compile(
    r"`[^`\n]+`"                                 # code spans (on one line)
    r"|§\s?\d+(?:\.\d+)*(?:\s\([a-z0-9]+\))?"     # section refs, with a sub-item
    r"|\b(?:file f |g )?item \d+(?: \([a-z0-9]+\))?"   # owner and file items
    r"|\b[A-Z][A-Z0-9]*(?:-[A-Z0-9.]+)+\b"        # ids: J-R7, D-18, T-ER-08, R12-3, VIS-1, J-A68.81 …
    r"|\bM\d[a-z]?(?:-[A-Za-z]+)?\b"               # milestones
    r"|\bV\d\d(?: §\d+(?:\.\d+)*)?"                # volume references
    r"|\b(?:THORP|HAMLET|VILLAGE|TOWN|CITY|METROPOLIS)\b"
    r"|\"[^\"\n]+\""                              # quoted words (on one line)
    r"|\d+(?:[  ]\d{3})*(?:[.,]\d+)?"            # numbers
)
NORM = re.compile(r"\b(never|only|every|each|no|not|at most|at least|unless|except|before|after|exactly|always)\b", re.I)


def tokens(s):
    c = Counter()
    for line in s.split('\n'):
        if line.lstrip().startswith('```'):
            continue
        c.update(m.group(0).replace(' ', ' ') for m in TOKEN.finditer(line))
    return c


def states():
    """(pre, post): every working file after the fix patches only, and after every patch (the prose ones included)."""
    pre = {os.path.basename(p): open(p, encoding='utf-8').read() for p in glob.glob(f'{W}/orig/*.md')}
    post = dict(pre)
    for pf in sorted(glob.glob(f'{W}/patches/*.patch')):
        prose = os.path.basename(pf).startswith('9') and '-prose-' in pf
        for f, old, new, where in parse(pf):
            if not prose:
                pre[f] = pre[f].replace(old, new, 1)
            post[f] = post[f].replace(old, new, 1)
    return pre, post


def main():
    bad = warn = n = 0
    words = Counter()
    for pf in sorted(glob.glob(f'{W}/patches/9*-prose-*.patch')):
        for f, old, new, where in parse(pf):
            n += 1
            to, tn = tokens(old), tokens(new)
            lost = sorted(set(to) - set(tn))
            if lost:
                print(f'note {where} {f}: tokens left to the rest of the file {lost}')
            no, nn = Counter(m.group(1).lower() for m in NORM.finditer(old)), Counter(m.group(1).lower() for m in NORM.finditer(new))
            drop = {k: no[k] - nn[k] for k in no if no[k] > nn[k]}
            if drop:
                warn += 1
                print(f'WARN {where} {f}: normative words fewer {drop}')
            words[os.path.basename(pf)] += len(old.split()) - len(new.split())
    pre, post = states()
    allow = {}
    for line in open(f'{W}/prose-allow.tsv', encoding='utf-8'):
        if line.strip() and not line.startswith('#'):
            fa, tok, why = line.rstrip('\n').split('\t')
            allow.setdefault(fa, set()).add(tok)
    for f in sorted(pre):
        a, b = tokens(pre[f]), tokens(post[f])
        gone = sorted(set(a) - set(b) - allow.get(f, set()))
        if gone:
            bad += 1
            print(f'FAIL {f}: tokens gone from the file {gone}')
        fewer = {k: (a[k], b[k]) for k in a if b[k] < a[k] and k in b}
        if fewer:
            print(f'info {f}: repeated tokens stated fewer times (restatement) {fewer}')
    print(f'{n} prose hunks; {bad} files failing; {warn} hunks with normative-word warnings')
    for k, v in words.items():
        print(f'  {k}: {v} words removed')
    pre_w = sum(len(t.split()) for t in pre.values()); post_w = sum(len(t.split()) for t in post.values())
    print(f'words after the fixes {pre_w}; after the prose pass {post_w} ({(post_w - pre_w) / pre_w * 100:+.1f} %)')
    sys.exit(1 if bad else 0)


if __name__ == '__main__':
    main()
