#!/usr/bin/env python3
"""gen_blocks.py — write docs/validation/coherence/repair-r5-rendering.md from new/ (after apply.py).

Block protocol (docs/validation/amendments-b/apply-blocks.py): a REPLACE body runs from its heading line to the next
heading of the same or higher level. A top-level section whose intro (X.0) changed is replaced whole ("## §X …", its
subsections in order); otherwise each changed subsection ("### X.y …") is replaced alone. The preamble before the first
"=== " line is ignored by the applier and carries the title, the stand-in notice and the lane's notes.
usage: python3 gen_blocks.py PREAMBLE.md OUT.md
"""
import json, os, sys

W = os.path.dirname(os.path.abspath(__file__))
man = json.load(open(f'{W}/manifest.json'))
order = [m['file'] for m in man]
heading = {m['file']: m['heading'] for m in man}


def text(d, f):
    return open(f'{W}/{d}/{f}', encoding='utf-8').read()


def main():
    pre, out = sys.argv[1], sys.argv[2]
    blocks, summary = [], []
    sections = {}
    for f in order:
        sections.setdefault(f.split('.')[0], []).append(f)
    for sec, files in sections.items():
        intro = f'{sec}.0.md'
        changed = [f for f in files if text('orig', f) != text('new', f)]
        if not changed:
            continue
        if intro in changed:
            body = '\n'.join(text('new', f).rstrip('\n') + '\n' for f in files)
            assert body.split('\n', 1)[0] == heading[intro]
            blocks.append(f'=== REPLACE {heading[intro]} ===\n{body.rstrip()}\n=== END ===\n')
            summary.append(f'§{sec} whole ({len(files)} parts, {len(changed)} changed)')
        else:
            for f in changed:
                body = text('new', f)
                assert body.split('\n', 1)[0] == heading[f], f
                blocks.append(f'=== REPLACE {heading[f]} ===\n{body.rstrip()}\n=== END ===\n')
                summary.append(f'§{f[:-3]}')
    extra = ''
    for name in ('extra-blocks.md', 'ruling-requests.md'):
        rr = f'{W}/{name}'
        if os.path.exists(rr):
            extra += '\n' + open(rr, encoding='utf-8').read().rstrip() + '\n'
    with open(out, 'w', encoding='utf-8') as fo:
        fo.write(open(pre, encoding='utf-8').read().rstrip() + '\n\n')
        fo.write('\n'.join(blocks))
        if extra:
            fo.write(extra)
    print(f'{len(blocks)} REPLACE blocks: ' + ', '.join(summary))


if __name__ == '__main__':
    main()
