#!/usr/bin/env python3
"""repair-V11-r2 generator: count-asserted substitutions over the live V11 subsections -> REPLACE blocks.

usage: python3 gen.py LIVE_V11 OUT_BLOCKS [LOG_JSON]
Each edit names a section heading (exact live line), an old string, its new string and the exact number of times the old
string occurs in that section before the edit. A mismatch aborts. A section's REPLACE body is its live text with its
edits applied in order; the first line may be retitled by an edit on the heading line itself. Every untouched line is
verbatim. Blocks are emitted in document order.
"""
import json, re, sys, importlib.util, os

HERE = os.path.dirname(os.path.abspath(__file__))
FENCE = re.compile(r'^\s*(```|~~~)')
HEAD = re.compile(r'^(#{1,6})\s+\S')


def headings(lines):
    out, fence = [], None
    for i, l in enumerate(lines):
        m = FENCE.match(l)
        if m:
            if fence is None:
                fence = m.group(1)
            elif m.group(1) == fence:
                fence = None
            continue
        if fence is None and HEAD.match(l):
            out.append((i, len(l) - len(l.lstrip('#')), l))
    return out


def load_edits():
    edits = []
    for name in ('edits_a', 'edits_b', 'edits_c', 'edits_d'):
        p = os.path.join(HERE, name + '.py')
        spec = importlib.util.spec_from_file_location(name, p)
        mod = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(mod)
        edits.extend(mod.EDITS)
    return edits


def main():
    live, out = sys.argv[1], sys.argv[2]
    logp = sys.argv[3] if len(sys.argv) > 3 else None
    text = open(live, encoding='utf-8').read()
    lines = text.split('\n')
    heads = headings(lines)
    sections = {}
    for k, (i, lvl, l) in enumerate(heads):
        end = next((h[0] for h in heads[k + 1:] if h[1] <= lvl), len(lines))
        if l in sections:
            raise SystemExit('ambiguous heading: ' + l)
        sections[l] = (i, end)
    edits = load_edits()
    bodies, log = {}, []
    for (head, old, new, n, ids) in edits:
        if head not in sections:
            raise SystemExit('no such heading: ' + head)
        if head not in bodies:
            i, end = sections[head]
            body = lines[i:end]
            while body and not body[-1].strip():
                body.pop()
            bodies[head] = '\n'.join(body)
        cur = bodies[head]
        c = cur.count(old)
        if c != n:
            raise SystemExit('COUNT MISMATCH in %r: expected %d, found %d for:\n%s' % (head, n, c, old[:300]))
        bodies[head] = cur.replace(old, new)
        log.append({'section': head, 'count': n, 'ids': ids, 'old': old[:120], 'new_len': len(new)})
    order = sorted(bodies, key=lambda h: sections[h][0])
    blocks = []
    for h in order:
        blocks.append('=== REPLACE %s ===\n%s\n=== END ===\n' % (h, bodies[h]))
    open(out, 'w', encoding='utf-8').write('\n'.join(blocks))
    if logp:
        json.dump({'edits': len(log), 'sections': len(order), 'log': log}, open(logp, 'w'), indent=1, ensure_ascii=False)
    print('edits', len(log), 'sections', len(order))


if __name__ == '__main__':
    main()
