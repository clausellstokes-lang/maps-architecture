#!/usr/bin/env python3
"""Emit a HARDENING ROUND spec (workflows/34's session-fix shape) for one item from the hardening inventory (J237 (2); J355).

usage: hardening_spec.py --item M0-a-10 --round S2 --from 2 [--inventory plat/docs/build/checks/hardening-inventory.md]
                         [--specs <specs.json> ...] [--extra "<text appended to the session note>"]
Every FIX-NOW row of the inventory whose owner is the item becomes one failing line (the row's id, source note and fix
shape; the source note's text quoted as the evidence); §3's queue rows for the item are named in the session note. With
--specs the round is appended to each specs file (refusing a duplicate id+round); without, the JSON is printed.
"""
import argparse, json, re, sys

R = '/home/user/maps-architecture'
ROW = re.compile(r'^- (M0-[a-z]-\d\d[ab]?|M0-spec):(\d+) (\S+(?: \([^|]*\))?) \| FIX-NOW \| ([^|]+) \| (.*?) \| (.*)$')


def note_text(file, line_no):
    try:
        lines = open(f'{R}/plat/docs/build/checks/{file}-notes.md', encoding='utf-8').read().splitlines()
        t = lines[line_no - 1].strip()
    except (OSError, IndexError):
        return ''
    t = re.sub(r'\s+', ' ', t)
    return t[:520] + ('…' if len(t) > 520 else '')


def section3(inv, item):
    m = re.search(r'^\d+\. \*\*' + re.escape(item) + r'\*\*(.*?)(?=^\d+\. \*\*|\Z)', inv, re.M | re.S)
    if not m:
        return '', ''
    body = m.group(1)
    q = re.search(r'queue: (.*?)(?:\. census: (.*?))?\.?\s*$', body.strip().splitlines()[-1])
    return (q.group(1).strip() if q else ''), ((q.group(2) or '').strip() if q else '')


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--item', required=True)
    ap.add_argument('--round', required=True, help='S<n>')
    ap.add_argument('--from', dest='from_', type=int, required=True)
    ap.add_argument('--inventory', default='plat/docs/build/checks/hardening-inventory.md')
    ap.add_argument('--specs', nargs='*', default=[])
    ap.add_argument('--extra', default='')
    ap.add_argument('--line', action='append', default=[], help='an extra failing line "line || evidence || required_change" (the census classes, the rulings), placed BEFORE the inventory rows')
    a = ap.parse_args()
    inv = open(f'{R}/{a.inventory}', encoding='utf-8').read()
    rows = []
    for l in inv.splitlines():
        m = ROW.match(l)
        if m and m.group(4).strip() == a.item:
            rows.append(m.groups())
    if not rows and not a.line:
        sys.exit(f'no FIX-NOW rows owned by {a.item}')
    lines = []
    for extra in a.line:
        parts = [x.strip() for x in extra.split('||')]
        assert len(parts) == 3, f'--line needs three || parts: {extra[:80]}'
        lines.append({'line': parts[0], 'evidence': parts[1], 'required_change': parts[2]})
    for file, n, rid, owner, shape, ev in rows:
        n = int(n)
        src = f'plat/docs/build/checks/{file}-notes.md:{n}'
        quoted = note_text(file, n)
        lines.append({
            'line': f'{rid} ({src}): {shape.strip()}',
            'evidence': f'the source note {rid} ({src}): «{quoted}» — read it whole; the inventory\'s evidence: {ev.strip()}',
            'required_change': 'as the fix shape says, inside the item\'s owns; a PIN — a test red without the fix, in the round\'s mutant table — unless the row is comment-only or a choices row (then the text itself); the outcome (fixed / pinned / reported for a ruling) in the notes section with its evidence',
        })
    queue, census = section3(inv, a.item)
    ids = ', '.join(f'{r[0]}:{r[1]} {r[2]}' for r in rows) + (f" — and, FIRST, the {len(a.line)} line(s) the session adds for the refusal census's classes and the design rulings (plat/docs/build/checks/refusal-census.md; rulings-hardening-1.md; N-61)" if a.line else '')
    session = (
        f"This round was opened by the SESSION as {a.item}'s HARDENING ROUND (J237 (2): the M0 hardening phase's fix rounds, batched per owning "
        f"item; the owner 2026-10-07: 'make sure you do the hardening phase for m0 before m1'), on the FIX-NOW rows the hardening inventory "
        f"(plat/docs/build/checks/hardening-inventory.md, lane session/hardening-inventory-1, landed J355) assigns to this item: {ids}. Each "
        f"'failing line' below is one inventory row — its id names the SOURCE NOTE (the checks/M0-*-notes.md file and line) you MUST read whole "
        f"before fixing; the inventory's fix shape is the session's reading of that note, binding unless the note or the code shows it wrong — "
        f"then say so in your notes and do what the note's finding needs."
        + (f" The queue rows this round also takes (docs/M0-FIX-QUEUE.md): {queue}." if queue and queue != '—' else '')
        + (f" Census: {census}." if census and census != '—' else '')
        + " THE RULES OF A HARDENING ROUND: (1) inside the item's owns and nowhere else — a row that needs another item's file is REPORTED, not "
        "built; (2) every row gets a PIN (a test that is red without the fix; your mutant table shows each pin killing its mutant) unless the "
        "row is comment-only or asks for a choices row — then the text is the deliverable; (3) BEHAVIOUR: a hardening fix may move output where "
        "a defect is fixed — a DECLARED shift, stated in your choices row with the before and after (digests and goldens re-recorded in the same "
        "round, named), never silent; where a row offers alternatives, take the one the design's text supports and say which; a change of an "
        "operation's or stage's CONTRACT (its design-level behaviour, a record or file format, an exported API) is NOT yours — report it as a "
        "note for the session's ruling and leave the row at REPORTED; (4) J264 / N-58: the refusal census of the item's registered families "
        "before and after the round, never rising (a row whose fix makes a lawful input succeed lowers it and says so); (5) API frozen (J263 "
        "Q1): no export of a folder index or the barrel added, removed or renamed unless a row explicitly asks for one — then the index change "
        "is the row's and stated; message texts pinned verbatim where a row changes one (J263 Q6); (6) the gates, NEAR and RELATED@1000 as the "
        "brief above says, at W=1; (7) the item's notes file gains a section 'Hardening round " + a.round + "' with the row-by-row outcome (fixed "
        "/ pinned / reported, each with its evidence and mutant), and the round's choices row names every row it closes. The CLOSING CHECKER "
        "confirms every row's outcome with its own evidence (re-reading the source note and the inventory row), re-kills every pin's mutant, "
        "re-measures the refusal census, and judges new findings by the blocker rule only; a row left REPORTED with a stated contract reason "
        "is not a failing line."
        + (f" {a.extra}" if a.extra else '')
    )
    spec = {'id': a.item, 'from': a.from_, 'round': a.round, 'session': session, 'lines': lines}
    if not a.specs:
        print(json.dumps(spec, ensure_ascii=False, indent=1))
        return
    for p in a.specs:
        s = json.load(open(p, encoding='utf-8'))
        if any(r.get('id') == a.item and r.get('round') == a.round for r in s['rounds']):
            sys.exit(f'{p}: {a.item} {a.round} already present')
        s['rounds'].append(spec)
        json.dump(s, open(p, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
        open(p, 'a', encoding='utf-8').write('\n')
        print(f'{p}: appended {a.item} {a.round} ({len(lines)} lines; queue: {queue or "—"})')


if __name__ == '__main__':
    main()
