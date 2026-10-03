#!/usr/bin/env python3
"""apply.py — rebuild new/ from orig/ and apply every patches/*.patch in name order.

Patch format (no escaping needed):
    @@ FILE <name.md>          selects the working file for the hunks after it
    <<<<                       opens a hunk: the OLD text follows (exact, may span lines)
    ====                       separates OLD from NEW
    >>>>                       closes the hunk
    #  ...                     a comment line outside a hunk (ignored)
OLD must occur exactly once in the current text of the file (after earlier hunks); otherwise the run stops and reports.
An empty OLD with '@@ APPEND' semantics is not supported: use an anchor.
usage: python3 apply.py [--check]   (--check: report only, write nothing)
"""
import glob, os, sys, json

W = os.path.dirname(os.path.abspath(__file__))


def parse(path):
    hunks, cur_file, state, old, new = [], None, None, [], []
    for n, line in enumerate(open(path, encoding='utf-8').read().split('\n'), 1):
        if state is None:
            if line.startswith('@@ FILE '):
                cur_file = line[8:].strip()
            elif line == '<<<<':
                if cur_file is None:
                    raise SystemExit(f'{path}:{n}: hunk before @@ FILE')
                state, old, new, start = 'old', [], [], n
            elif line.strip() == '' or line.startswith('#'):
                pass
            else:
                raise SystemExit(f'{path}:{n}: stray line outside a hunk: {line[:80]!r}')
        elif state == 'old':
            if line == '====':
                state = 'new'
            else:
                old.append(line)
        elif state == 'new':
            if line == '>>>>':
                hunks.append((cur_file, '\n'.join(old), '\n'.join(new), f'{os.path.basename(path)}:{start}'))
                state = None
            else:
                new.append(line)
    if state is not None:
        raise SystemExit(f'{path}: unclosed hunk')
    return hunks


def main():
    check = '--check' in sys.argv
    texts = {os.path.basename(p): open(p, encoding='utf-8').read() for p in glob.glob(f'{W}/orig/*.md')}
    log, bad = [], 0
    for pf in sorted(glob.glob(f'{W}/patches/*.patch')):
        for f, old, new, where in parse(pf):
            if f not in texts:
                print(f'NOFILE {where} {f}'); bad += 1; continue
            c = texts[f].count(old)
            if c != 1 or old == '':
                print(f'MISS {where} {f} count={c}: {old[:120]!r}'); bad += 1; continue
            texts[f] = texts[f].replace(old, new, 1)
            log.append({'where': where, 'file': f, 'old_w': len(old.split()), 'new_w': len(new.split())})
    if bad:
        print(f'{bad} hunk(s) failed'); sys.exit(1)
    if not check:
        os.makedirs(f'{W}/new', exist_ok=True)
        for f, t in texts.items():
            open(f'{W}/new/{f}', 'w', encoding='utf-8').write(t)
        json.dump(log, open(f'{W}/apply-log.json', 'w'), indent=0)
    ow = sum(len(open(p, encoding='utf-8').read().split()) for p in glob.glob(f'{W}/orig/*.md'))
    nw = sum(len(t.split()) for t in texts.values())
    print(f'hunks applied: {len(log)}; words {ow} -> {nw} ({(nw-ow)/ow*100:+.1f} %)')


if __name__ == '__main__':
    main()
