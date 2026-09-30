#!/usr/bin/env python3
# PENDING FABLE REVIEW — hand-off script of amendments-c/repair-determinism-r3 (opus stand-in). Stdlib only.
"""repair-determinism-r3-handoff.py — VD2-03's scripted pointer substitution (validate.md §5.1, VD2-03).

§7.7 numbers its three input layers 1-3 and its dossier contract's items 1-16, so '§7.7 item 2' named both layer 2
(the circumstance slices) and contract item 2 (Existence), and "§7.7 item 1's outcome targets" named layer 1 where every
other '§7.7 item 1' names the contract's One way. This script rewrites the 25 layer-2 pointers to '§7.7 layer 2' and the
one layer-1 pointer to '§7.7 layer 1', each found by a context string (whitespace-tolerant, so a re-wrapped line still
matches) asserted to occur the stated number of times inside its named subsection or judgment-index row; it then asserts
that every '§7.7 item 1' / '§7.7 item 2' left in the document (and in the rationale file, when given) is one of the known
dossier-contract pointers, stopping and naming any other, so no new ambiguous pointer lands with this assembly.

Run it AFTER every repair-r3 block file is applied (apply-blocks.py) and the restated rows are swapped. Never writes in
place.

usage: python3 repair-determinism-r3-handoff.py --doc APPLIED.md --out-doc OUT.md --log LOG.json [--rationale R.md]
"""
import argparse, hashlib, json, os, re, sys

FENCE = re.compile(r'^\s*(```|~~~)')
HEAD = re.compile(r'^(#{1,6})\s+\S')
PTR = re.compile(r'§7\.7(\s+)items?(\s+)([12])(?!\d)')   # '§7.7 item 1', '§7.7 items 1', '§7.7 item 2' (never 10-16)

H = {   # heading prefixes (the number and a space); each must start exactly one heading line of the document
    k: v for k, v in [
        ('2.7', '### 2.7 '), ('2.9', '### 2.9 '), ('4.2', '### 4.2 '), ('4.3', '### 4.3 '), ('4.5', '### 4.5 '),
        ('4.7', '### 4.7 '), ('4.11', '### 4.11 '), ('5.2', '### 5.2 '), ('5.3', '### 5.3 '), ('7.1', '### 7.1 '),
        ('7.2', '### 7.2 '), ('7.4', '### 7.4 '), ('10.2', '### 10.2 '), ('10.3', '### 10.3 '), ('11.1', '### 11.1 '),
        ('11.3', '### 11.3 '), ('11.4', '### 11.4 '), ('13.2', '### 13.2 '), ('14', '## §14 '), ('II.7.5', '### II.7.5 '),
    ]
}

# (what, scope kind, scope key or row id, context, pointers in one context, expected contexts in scope)
# The 25 layer-2 pointers (24 lines of design 3daa0b07…) and the one layer-1 pointer; line numbers are the base's.
SUBS = [
    ('l.1814 PowerLink power key', 'section', '2.7', "a PowerStanding key (§7.7 item 2)", 1, 1),
    ('l.1824 the port\'s category-and-name rows', 'section', '2.7', "(the port's category-and-name rows, §7.7 item 2);", 1, 1),
    ('l.1824 + l.1902 PowerStanding.secret', 'section', '2.7', "`PowerStanding.secret` in the base (§7.7 item 2),", 1, 2),
    ('l.1867 PowerRelation keys', 'section', '2.7', "b: string /* PowerStanding keys (§7.7 item 2)", 1, 1),
    ('l.1901 arcane power under magic', 'section', '2.7', "exists only under the `magic` circumstance (§7.7 item 2; D-3)", 1, 1),
    ('l.4125 the trade slice', 'section', '4.2', "read from the circumstances' trade slice (§7.7 item 2;", 1, 1),
    ('l.4349 CircumstanceSlice.trade', 'section', '4.3', "their bearings and modes and their fill, §7.7 item 2)", 1, 1),
    ('l.4367 standalone trade fill', 'section', '4.3', "the intent's trade setting fill the slice (§7.7 item 2),", 1, 1),
    ('l.4603 PowerStanding.kind', 'section', '4.5', "`PowerStanding.kind` (§10.2; §7.7 item 2)", 1, 1),
    ('l.4750 the circumstance slices', 'section', '4.5', "the inputs are §7.7 item 2's circumstance slices", 1, 1),
    ('l.4824 appliedStanding (dials)', 'section', '4.5', "hysteresis (`PowerStanding.appliedStanding`, §7.7 item 2, and", 1, 1),
    ('l.6360 EpochInputs.circumstances', 'section', '4.11', "circumstances: CircumstanceSlice /* §7.7 item 2 */", 1, 1),
    ('l.6393 the circumstance slices (second pointer)', 'section', '4.11', "the circumstance slices (§7.7 item 2),", 1, 1),
    ('l.6418 appliedStanding (epochs)', 'section', '4.11', "standing (`PowerStanding.appliedStanding`, §7.7 item 2) moves", 1, 1),
    ('l.6938 the trade slice (dossier row)', 'section', '5.3', "trade facts are the trade slice's (§7.7 item 2)", 1, 1),
    ('l.11430 sectors', 'section', '10.2', "the sector set the economy slice is keyed by (§7.7 item 2)", 1, 1),
    ('l.11497 circumstances.economy', 'section', '10.2', "(`circumstances.economy`, §7.7 item 2)", 1, 1),
    ('l.11634 SectorRow', 'section', '10.2', "`CircumstanceSlice.economy` is keyed by (§7.7 item 2)", 1, 1),
    ('l.11768 CircumstanceSlice.powers', 'section', '10.3', "(`CircumstanceSlice.powers`, §7.7 item 2)", 1, 1),
    ('l.11910 the realm bearings (north first)', 'section', '11.1', "bearings (§7.7 item 2) —", 1, 1),
    ('l.14395 power standings', 'section', '14', "power standings (§7.7 item 2).", 1, 1),
    ('l.14407 north first', 'section', '14', "move gates only for the residual (§7.7 item 2;", 1, 1),
    ('l.15870 disorder', 'section', 'II.7.5', "the circumstance slice's scalar in [0, 1] (§7.7 item 2;", 1, 1),
    ('l.16952 J-A79.23 index row', 'row', 'J-A79.23', "`PowerStanding.secret` in the base (§7.7 item 2),", 1, 1),
    ('l.2182 Document.intent (layer 1)', 'section', '2.9', "intent: Intent /* §7.7 item 1's outcome targets */", 1, 1),
]
EXPECT_LAYER = {'2': 25, '1': 1}

# CROSS-PART HARMONISATION (optional, guarded): scope r3's §13.2 lit-street warp fixture quotes an earlier draft of this
# seat's door-light wording ('its fraction along the footprint edge'), which doc_checks' C3 flags as a 3-gram mosaic; the
# landed §7.4 and J-A68.73 say 'its fraction of the footprint ring's edge'. Applied when present exactly once in §13.2,
# skipped (and logged) when absent, stopped when present more than once.
HARMONISE = [
    ("scope §13.2 fixture: the door light's fraction (determinism r3's landed wording)", '13.2',
     re.compile(r'fraction(\s+)along(\s+)the(\s+)footprint(\s+)edge(\s+)it(\s+)stands(\s+)on'),
     "fraction\\1of\\2the\\3footprint ring's\\4edge\\5it\\6stands\\7on"),
]

# The dossier-contract pointers that stay (item 2 = Existence, item 1 = One way): (scope kind, key, context, count)
KEEP_DOC = [
    ('section', '4.5', "so the population stays whole (§7.7 item 2)", 1),
    ('section', '4.7', "a household that fills the dossier's population (§7.7 item 2)", 1),
    ('section', '4.11', "the households that fill its population, §7.7 item 2;", 1),
    ('section', '4.11', "`existence: 'dossier'`, §7.7 item 2)", 1),
    ('section', '4.11', "removes, adds or re-designates one (§7.7 item 2).", 1),
    ('section', '5.2', "the households that fill a dossier's population (§7.7 item 2)", 1),
    ('section', '5.2', "a dossier-backed element (§7.7 item 2's list)", 1),
    ('section', '5.2', "a dossier-backed element (§7.7 item 2), \"vacate first\"", 1),
    ('section', '5.3', "closes, removes or re-designates it (§7.7 item 2)", 1),
    ('section', '7.1', "a dossier-backed element (§7.7 item 2's list)", 1),
    ('section', '7.2', "is refused as F-EDIT (§7.7 item 2's", 1),
    ('section', '7.4', "dossier element only by a dossier event (§7.7 item 2).", 1),
    ('section', '13.2', "each re-provided slot is reported (§7.7 item 2;", 1),
    ('section', '13.2', "(T20-6) by §7.7 item 2,", 1),
    ('section', '2.9', "what an incoming dossier is diffed against (§7.7 item 1)", 1),   # wrapped across two lines
    ('section', '4.11', "with no Works (§7.7 item 1 reads these rungs", 1),
    ('section', '4.11', "a dated dossier change (§7.7 item 1)", 1),
    ('section', '7.4', "(`EditBase.dossier` set, §7.7 item 1)", 1),
    ('section', '11.3', "cadence (§7.7 items 1 and 6;", 1),
    ('section', '11.4', "§7.7 item 1's list (item 86)", 1),
    ('section', '14', "the one campaign fact it may carry (§7.7 item 1)", 1),
    ('section', '14', "dropped by §7.7 item 1's never-read list", 1),
    ('section', '14', "drops every key of §7.7 item 1's never-read list", 1),
    ('section', '14', "the description seed (§7.7 item 1).", 1),
    ('row', 'J-A86.71', "the dossier contract's \"One way\" (§7.7 item 1)", 1),
]
KEEP_RAT = [   # Part A of the rationale file (checked when --rationale is given; nothing there is rewritten)
    ('row', 'J-A20.01', "T20-6 the refusal list of §7.7 item 2", 1),
    ('row', 'J-A72.50', "a dossier's population (§7.7 item 2;", 1),
    ('row', 'J-A86.71', "the dossier contract's \"One way\" (§7.7 item 1)", 1),
]


def sha(s):
    return hashlib.sha256(s.encode('utf-8')).hexdigest()


def flex(ctx):
    """a regex for ctx whose whitespace runs match any whitespace run (a re-wrapped line still matches)"""
    return re.compile(r'\s+'.join(re.escape(p) for p in ctx.split()))


def section_span(text, key):
    prefix = H[key]
    lines = text.split('\n')
    offs, o = [], 0
    for l in lines:
        offs.append(o)
        o += len(l) + 1
    fence, heads = None, []
    for i, l in enumerate(lines):
        m = FENCE.match(l)
        if m:
            fence = m.group(1) if fence is None else (None if m.group(1) == fence else fence)
            continue
        if fence is None and HEAD.match(l):
            heads.append((i, len(l) - len(l.lstrip('#')), l))
    starts = [k for k, h in enumerate(heads) if h[2].startswith(prefix)]
    if len(starts) != 1:
        sys.exit(f'STOP — heading prefix {prefix!r}: {len(starts)} headings (expected exactly one)')
    k = starts[0]
    i, lvl, _ = heads[k]
    j = next((h[0] for h in heads[k + 1:] if h[1] <= lvl), None)
    return offs[i], (offs[j] if j is not None else len(text))


def row_span(text, rid, prefix=False):
    spans = []
    for m in re.finditer(r'(?m)^\|\s*(J-[A-Za-z0-9.\-]+)\s*\|.*$', text):
        if (m.group(1).startswith(rid) if prefix else m.group(1) == rid):
            spans.append((m.start(), m.end()))
    return spans


def spans_of(text, kind, key, prefix=False):
    if kind == 'section':
        return [section_span(text, key)]
    sp = row_span(text, key, prefix)
    if not prefix and len(sp) != 1:
        sys.exit(f'STOP — row {key}: {len(sp)} rows (expected exactly one)')
    return sp


def keep_check(text, keep, label, prefix_rows=False):
    """every pointer left must lie inside one KEEP context found in its scope; each KEEP context found exactly its count"""
    covered, found = [], []
    for kind, key, ctx, cnt in keep:
        rx = flex(ctx)
        hits = [m for s, e in spans_of(text, kind, key, prefix_rows and kind == 'row') for m in rx.finditer(text, s, e)]
        if len(hits) != cnt:
            sys.exit(f'STOP — {label}: kept pointer context {ctx!r} found {len(hits)} times in {key} (expected {cnt})')
        covered += [(m.start(), m.end()) for m in hits]
        found.append(dict(scope=key, context=ctx, count=len(hits), line=text[:hits[0].start()].count('\n') + 1))
    stray = []
    for m in PTR.finditer(text):
        if not any(s <= m.start() and m.end() <= e for s, e in covered):
            ln = text[:m.start()].count('\n') + 1
            ls = text.rfind('\n', 0, m.start()) + 1
            stray.append(f'l. {ln}: …{text[max(ls, m.start() - 90):m.end() + 30]}…')
    if stray:
        sys.exit(f'STOP — {label}: pointers that are neither rewritten nor known contract pointers (classify each as '
                 f'layer or contract item, then extend SUBS or KEEP):\n  ' + '\n  '.join(stray))
    return found


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--doc', required=True)
    ap.add_argument('--out-doc', required=True)
    ap.add_argument('--log', required=True)
    ap.add_argument('--rationale')
    a = ap.parse_args()
    if os.path.abspath(a.out_doc) == os.path.abspath(a.doc):
        sys.exit('STOP — never writes in place')
    text = open(a.doc, encoding='utf-8').read()
    log = dict(input_doc_sha256=sha(text), substitutions=[])
    layer_before = {n: len(re.findall(r'§7\.7\s+layer\s+%s(?!\d)' % n, text)) for n in '12'}

    for what, kind, key, ctx, per, cnt in SUBS:
        rx = flex(ctx)
        (s, e), = spans_of(text, kind, key)
        allhits = list(rx.finditer(text))
        hits = [m for m in allhits if s <= m.start() and m.end() <= e]
        if len(hits) != cnt:
            sys.exit(f'STOP — {what}: context {ctx!r} found {len(hits)} times in {key} (expected {cnt})')
        for m in reversed(hits):
            span = m.group(0)
            new, k = PTR.subn(lambda p: f'§7.7{p.group(1)}layer{p.group(2)}{p.group(3)}', span)
            if k != per:
                sys.exit(f'STOP — {what}: {k} pointers inside the context (expected {per})')
            line = text[:m.start()].count('\n') + 1
            text = text[:m.start()] + new + text[m.end():]
            log['substitutions'].append(dict(item=what, scope=key, line=line, old=span, new=new))
        # a context found outside its scope as well is reported (never rewritten there): it must be a SUBS entry of its own
        outside = len(allhits) - len(hits)
        if outside and not any(c == ctx and k2 != key for _, _, k2, c, _, _ in SUBS):
            sys.exit(f'STOP — {what}: context also found {outside} times outside {key} with no entry of its own')

    log['harmonised'] = []
    for what, key, rx, repl in HARMONISE:
        s, e = section_span(text, key)
        hits = list(rx.finditer(text, s, e))
        if len(hits) > 1:
            sys.exit(f'STOP — {what}: {len(hits)} occurrences in {key}')
        if not hits:
            log['harmonised'].append(dict(item=what, state='absent — skipped'))
            continue
        m = hits[0]
        new = rx.sub(repl, m.group(0))
        log['harmonised'].append(dict(item=what, state='applied', line=text[:m.start()].count('\n') + 1, old=m.group(0), new=new))
        text = text[:m.start()] + new + text[m.end():]
        if rx.search(text):
            sys.exit(f'STOP — {what}: the old wording remains elsewhere in the document')

    layer_after = {n: len(re.findall(r'§7\.7\s+layer\s+%s(?!\d)' % n, text)) for n in '12'}
    for n, want in EXPECT_LAYER.items():
        if layer_after[n] - layer_before[n] != want:
            sys.exit(f'STOP — §7.7 layer {n}: {layer_before[n]} -> {layer_after[n]} (expected +{want})')
    log['layer_counts'] = dict(before=layer_before, after=layer_after)
    log['kept_doc'] = keep_check(text, KEEP_DOC, 'document')
    left = {n: len([m for m in PTR.finditer(text) if m.group(3) == n]) for n in '12'}
    log['contract_pointers_left'] = left
    if a.rationale:
        rat = open(a.rationale, encoding='utf-8').read()
        log['kept_rationale'] = keep_check(rat, KEEP_RAT, 'rationale')
        log['input_rationale_sha256'] = sha(rat)
    log['output_doc_sha256'] = sha(text)
    open(a.out_doc, 'w', encoding='utf-8').write(text)
    json.dump(log, open(a.log, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(f"{len(log['substitutions'])} contexts rewritten; §7.7 layer 2: {layer_before['2']} -> {layer_after['2']}, "
          f"§7.7 layer 1: {layer_before['1']} -> {layer_after['1']}")
    print(f"contract pointers left: item 2 {left['2']}, item 1 (with 'items 1') {left['1']} — every one a known contract pointer")
    if a.rationale:
        print(f"rationale: {len(log['kept_rationale'])} contract pointers, none ambiguous (nothing rewritten)")
    for h in log['harmonised']:
        print(f"harmonisation: {h['item']} — {h['state']}")
    print(f"document sha256 {log['input_doc_sha256'][:16]}… -> {log['output_doc_sha256'][:16]}…")


if __name__ == '__main__':
    main()
