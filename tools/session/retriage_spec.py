#!/usr/bin/env python3
"""Emit a HARDENING ROUND spec (workflows/34's session-fix shape) for one item from a RE-TRIAGE PLAN's rows (J722).

usage: retriage_spec.py --plan docs/validation/hardening-retriage-2026-11-09/plan.json --entry "M0-d-05a + M0-m-01"
                        --item M0-d-05a --round S2 --from 2 [--refs Q93,…] [--drop REF,…] [--extra "<text>"]
                        [--line "line || evidence || required_change" …] [--specs <specs.json> …] [--jrow J722]

tools/session/hardening_spec.py turns the FIRST inventory's FIX-NOW rows into a round; this tool does the same for a
later wave, whose rows are the ones a re-triage plan judged STILL-OPEN after the item's last landed round (the open
queue rows routed to the item and the rows its latest closing check wrote). --entry names the plan's round entry (its
"item" string; a merged entry lists several items); --refs picks the entry's lines for THIS item by their "ref" (all of
them when omitted); --drop leaves lines out (a line the session holds back, e.g. an owner-gated API row). Each plan
line {ref, queue, text, fixShape, pin, evidence} becomes one failing line; a notes-file citation in its evidence
(checks/<item>-notes.md:<n>) is quoted from the tree so the seat reads the source note. --line adds a line of the
session's own (a ruling); --extra is appended to the session note (the rulings that bind the round). With --specs the
round is appended to each specs file (refusing a duplicate id + round); without, the JSON is printed.
"""
import argparse, json, re, sys

R = '/home/user/maps-architecture'

RULES = (
    " THE RULES OF A HARDENING ROUND: (1) inside the item's owns and nowhere else — a row that needs another item's file is REPORTED, not "
    "built; (2) every row gets a PIN (a test that is red without the fix; your mutant table shows each pin killing its mutant) unless the "
    "row is comment-only or asks for a choices row — then the text is the deliverable; (3) BEHAVIOUR: a hardening fix may move output where "
    "a defect is fixed — a DECLARED shift, stated in your choices row with the before and after (digests and goldens re-recorded in the same "
    "round, named), never silent; where a row offers alternatives, take the one the design's text supports and say which; a change of an "
    "operation's or stage's CONTRACT (its design-level behaviour, a record or file format, an exported API) is NOT yours — report it as a "
    "note for the session's ruling and leave the row at REPORTED; (4) J264 / N-58: the refusal census of the item's registered families "
    "before and after the round, never rising (a row whose fix makes a lawful input succeed lowers it and says so); (5) API frozen (J263 "
    "Q1): no export of a folder index or the barrel added, removed or renamed unless a row explicitly asks for one — then the index change "
    "is the row's and stated; message texts pinned verbatim where a row changes one (J263 Q6); (6) the gates, NEAR and RELATED@1000 as the "
    "brief above says, at W=1; (7) the item's notes file gains a section 'Hardening round {round}' with the row-by-row outcome (fixed "
    "/ pinned / reported, each with its evidence and mutant), and the round's choices row names every row it closes. The CLOSING CHECKER "
    "confirms every row's outcome with its own evidence (re-reading the source note or queue row), re-kills every pin's mutant, "
    "re-measures the refusal census, and judges new findings by the blocker rule only; a row left REPORTED with a stated contract reason "
    "is not a failing line."
)


def note_quote(evidence):
    """Quote the first notes-file line an evidence string cites, so the seat sees the source note's own words."""
    m = re.search(r'checks/(M0-[a-z]-\d\d[ab]?)-notes\.md:(\d+)', evidence) or re.search(r'\b([a-z]-\d\d[ab]?) notes:(\d+)', evidence)
    if not m:
        return '', ''
    item = m.group(1) if m.group(1).startswith('M0-') else f'M0-{m.group(1)}'
    n = int(m.group(2))
    path = f'plat/docs/build/checks/{item}-notes.md'
    try:
        t = open(f'{R}/{path}', encoding='utf-8').read().splitlines()[n - 1].strip()
    except (OSError, IndexError):
        return f'{path}:{n}', ''
    t = re.sub(r'\s+', ' ', t)
    return f'{path}:{n}', t[:520] + ('…' if len(t) > 520 else '')


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--plan', required=True)
    ap.add_argument('--entry', required=True, help='the plan round entry\'s "item" string')
    ap.add_argument('--item', required=True)
    ap.add_argument('--round', required=True, help='S<n>')
    ap.add_argument('--from', dest='from_', type=int, required=True)
    ap.add_argument('--refs', default='', help='comma list of line refs for this item (default: every line of the entry)')
    ap.add_argument('--drop', default='', help='comma list of line refs held back')
    ap.add_argument('--line', action='append', default=[], help='a line of the session\'s own: "line || evidence || required_change"')
    ap.add_argument('--extra', default='')
    ap.add_argument('--jrow', default='J722', help='the J-row that ratified the plan\'s rows for this round')
    ap.add_argument('--specs', nargs='*', default=[])
    a = ap.parse_args()
    plan = json.load(open(f'{R}/{a.plan}' if not a.plan.startswith('/') else a.plan, encoding='utf-8'))
    entry = [r for r in plan['rounds'] if r['item'] == a.entry]
    if len(entry) != 1:
        sys.exit(f'{a.entry!r}: {len(entry)} plan entries')
    entry = entry[0]
    refs = [x for x in a.refs.split(',') if x]
    drop = {x for x in a.drop.split(',') if x}
    known = {l['ref'] for l in entry['lines']}
    for x in list(refs) + list(drop):
        if x not in known:
            sys.exit(f'{x!r} is not a ref of {a.entry!r} (refs: {sorted(known)})')
    picked = [l for l in entry['lines'] if (not refs or l['ref'] in refs) and l['ref'] not in drop]
    if not picked and not a.line:
        sys.exit('no lines picked')
    lines = []
    for extra in a.line:
        parts = [x.strip() for x in extra.split('||')]
        assert len(parts) == 3, f'--line needs three || parts: {extra[:80]}'
        lines.append({'line': parts[0], 'evidence': parts[1], 'required_change': parts[2]})
    for l in picked:
        src, quoted = note_quote(l['evidence'])
        q = f" (queue row {l['queue']})" if l.get('queue') else ''
        ev = f"the re-triage's evidence: {l['evidence']}"
        if l.get('queue'):
            ev += f"; docs/M0-FIX-QUEUE.md row {l['queue']} — read it whole (grep '^| {l['queue']} ')"
        if quoted:
            ev += f"; the source note ({src}): «{quoted}» — read it whole"
        shape = l['fixShape'].strip()
        change = ('a pin only — no source change is asked' if shape.lower().startswith('none') else f'the fix: {shape}')
        lines.append({
            'line': f"{l['ref']}{q}: {l['text'].strip()}",
            'evidence': ev,
            'required_change': (f"{change}; the PIN: {l['pin'].strip()} — a test red without the fix (or, for a pin-only row, red under the "
                                "mutant it names), in the round's mutant table; inside the item's owns; the outcome (fixed / pinned / reported for a "
                                "ruling) in the notes section with its evidence"),
        })
    names = ', '.join(l['ref'] for l in picked)
    merged = ' + ' in a.entry
    session = (
        f"This round was opened by the SESSION as {a.item}'s HARDENING ROUND {a.round} (J237 (2): the M0 hardening phase's fix rounds, batched per "
        f"owning item; J238: M0 is the bedrock — the default for an M0 row is FIX with an exact precaution and a pin; J567: the bar is an "
        f"independent closing check's PASS on the evidence), on the rows the SECOND RE-TRIAGE found STILL OPEN after the item's last landed round "
        f"({a.plan} — its entry '{a.entry}', class {entry.get('class')}, judged against the tree and ratified by the session at {a.jrow}): {names}"
        + (f" — and, FIRST, the {len(a.line)} line(s) the session adds" if a.line else '') + ". "
        "Each 'failing line' below is one such row — an open queue row routed to this item (docs/M0-FIX-QUEUE.md) or a row the item's latest "
        "closing check wrote into its notes file; its evidence names the SOURCE you MUST read whole before fixing; the fix shape and the pin "
        "are the re-triage's reading, binding unless the source or the code shows it wrong — then say so in your notes and do what the finding needs."
        + (f" THE PLAN'S ENTRY IS A MERGED ONE ({a.entry}): this spec entry carries {a.item}'s rows only; the other item's rows are its own round's." if merged else '')
        + RULES.replace('{round}', a.round)
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
        print(f'{p}: appended {a.item} {a.round} ({len(lines)} lines: {names})')


if __name__ == '__main__':
    main()
