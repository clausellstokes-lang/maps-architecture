#!/usr/bin/env python3
"""reviewids.py (coherence/assemble-r7w, P7; assemble-r7v's, the round-7w narration forms (adjudication-r7w, r7w, VF7v-…, R7-01) added; brief ROUND-7 NOTES (9) (c) and (e)) — the census of review-process ids cited in the
design text of the live base and volumes (and INDEX), outside the decision and request records. Read-only; edits nothing
(the verifiers raise any site; adjudication-r3's R3-02: "Design text names the design home of a rule, never a
review-process id ... Decision records (J-…, J-V…, BCR-…), request and hand-off rows (X-…, CVR-…, a volume's §10 and §13
records) keep theirs as records").
Review ids: the adjudication rulings `R<n>-nn` and every issue, conflict or inventory id the coherence pass's own records
define as a heading, a first table cell or a bold list label (docs/validation/coherence/verify-*.md, adjudication-r*.md,
inventory-*.md, probe-r*.md, canon.md, agreement.md, edges.md, wiring.md: VKr2-01, VAL-R2-04, VM-R2T-03, V12-XCONF-2, DXC-05 …), less any
token the live design itself defines (a first table cell, a bold label or a heading id in the base or a volume) and the
design id families (T-, J-, D-, X-, CVR-, BCR-, E-, DR … — single-letter prefixes), so a design id never counts. A site is EXCLUDED as a record when it stands (base) in "# Delegated
decisions" or "# Judgment calls", or (volumes) in "## 9 Decisions", "## 10 Base change requests", "## 13 Fix list" or
"## Integration notes", or on a table row or list item whose first cell or label is a J-, BCR-, X- or CVR- id. Usage: reviewids.py [TREE [TAG]]. Writes
reviewids-TAG.json and reviewids-TAG.tsv beside it."""
import glob, json, os, re
from collections import Counter
ROOT = '/home/user/maps-architecture'; os.chdir(ROOT)
W = 'docs/validation/coherence/work/assemble-r7w'
ID_RX = re.compile(r'(?<![\w\-./§])([A-Z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)*-\d+[a-z]?)(?![\w\-])')
RULING = re.compile(r'^R[1-9]-\d{2}$')
DEF_RX = re.compile(r'^(?:#{2,4} |\|\s*(?:\*\*)?|[*-] \*\*)([A-Z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)*-\d+[a-z]?)\b')
recs = sorted(glob.glob('docs/validation/coherence/verify-*.md') + glob.glob('docs/validation/coherence/adjudication-r*.md') +
              glob.glob('docs/validation/coherence/famverify-*.md') +   # assemble-r7w: round 7's family checks define the VF7-… ids
              glob.glob('docs/validation/coherence/inventory-*.md') + glob.glob('docs/validation/coherence/probe-r*.md') +
              [f'docs/validation/coherence/{x}.md' for x in ('canon', 'agreement', 'edges', 'wiring')])
review = Counter()
for p in recs:
    for l in open(p, encoding='utf-8').read().split('\n'):
        m = DEF_RX.match(l)
        if m: review[m.group(1)] += 1
        for m in ID_RX.finditer(l):
            if RULING.match(m.group(1)): review[m.group(1)] += 1
# a token the design itself defines (a first table cell, a bold label or a heading id in the live base or volumes) or of a
# design id family is never a review id
DESIGN_PREFIX = re.compile(r'^(?:T|J|D|X|CVR|BCR|E|EI|F|DR|S|W|M|L|U|P|O|C|H|B|G|K|A|I|N|Q|Z)-|^T\d|^EI-')
design_defs = set()
for p in ['docs/ARCHITECTURE.md'] + sorted(glob.glob('docs/volumes/*.md')):
    for l in open(p, encoding='utf-8').read().split('\n'):
        m = DEF_RX.match(l)
        if m: design_defs.add(m.group(1))
# design names the label rule above cannot see: V12 §3.9.1's named panel group "**The M4-110 group**" (J-V12.45), whose
# name is the `group` value 'M4-110' of V12 §2's panel records
DESIGN_NAMES = {'M4-110'}
review = Counter({k: v for k, v in review.items() if k not in design_defs and k not in DESIGN_NAMES and not DESIGN_PREFIX.match(k)})
import sys
SRC = sys.argv[1] if len(sys.argv) > 1 else ROOT   # a tree holding docs/ARCHITECTURE.md and docs/volumes/ (default: the live files)
TAG = sys.argv[2] if len(sys.argv) > 2 else 'final'
# design ids the regex can also catch (none expected): drop any token defined as a design id in the set
units = [('base', 'docs/ARCHITECTURE.md')] + [(os.path.basename(f)[:3], f) for f in sorted(glob.glob('docs/volumes/V*.md'))] + [('INDEX', 'docs/volumes/INDEX.md')]
REC_BASE = ('# Delegated decisions', '# Judgment calls')
REC_VOL = ('## 9 Decisions', '## 10 Base change requests', '## 13 Fix list', '## Integration notes')
ROWREC = re.compile(r'^\s*(?:\|\s*|[*-]\s+(?:\*\*)?)(?:J-|BCR-|X-|CVR-)')
FENCE = re.compile(r'^\s*(```|~~~)')
sites, inrec = [], []
for u, p in units:
    L = open(os.path.join(SRC, p), encoding='utf-8').read().split('\n')
    top, fence = '', None
    for i, l in enumerate(L):
        mf = FENCE.match(l)
        if mf:
            fence = mf.group(1) if fence is None else (None if mf.group(1) == fence else fence)
        if fence is None and (l.startswith('# ') or (u != 'base' and l.startswith('## '))):
            top = l
        for m in ID_RX.finditer(l):
            t = m.group(1)
            if t not in review: continue
            rec = (u == 'base' and top.startswith(REC_BASE)) or (u != 'base' and top.startswith(REC_VOL)) or bool(ROWREC.match(l))
            ent = dict(unit=u, line=i + 1, id=t, section=top[:70], context=l[max(0, m.start() - 70):m.end() + 50].strip())
            (inrec if rec else sites).append(ent)
# ROUND-7 NOTES (9) (e): the probe ids (`PRB7…`, `PRB7B-…` to `PRB7H-…`, e.g. PRB7-13, PRB7B-11, PRB7C-LCK-06) and the
# adjudication's markers ("(amended, PRB7…)", "(J146, PRB7…)", and "(J147)", "(J148)", "(J149)" used as change markers) are
# review records, never design text — every occurrence in the base, the volumes and INDEX counted, records and design text
# alike; and the END-line ids of adjudication-r7's Part H (E-M1, E-P9, E-D7, E-S0, E-R2, E-V6-20 …), which the design-id
# family rule above would pass over, counted the same way. Owner decision ids cited as a rule's source ("the owner's rule,
# J148") are allowed (ROUND-7 NOTES (9) (e)); every J144–J151 mention is listed with its form for the verifiers.
PRB = re.compile(r'\bPRB\d+[A-Z]?(?:-[A-Z]+)?-\d+|\bPRB\d+[A-Z]?\b'); AMD = re.compile(r'\(amended,[^)]*\)')
JMARK = re.compile(r'\((J1[45]\d)(?:,\s*[^)]*)?\)'); JANY = re.compile(r'\bJ1(?:4[4-9]|5[01])\b')
ENDID = re.compile(r'(?<![\w-])E-(?:M|P|D|S|R|V\d+)-?\d+(?![\w-])')
PASS = re.compile(r'\bpass [1-8]\b|\bround [1-9][vw]?\b|\bPart [HLP]\b|adjudication-r\d+[vw]?|\br7[vw]\b|\bfix pass\b|\bfamverify|\bEND-L\d|\bVF7[vw]?-[A-Z]+-\d+|\bVPC-r\d-\d+|\bR7-01\b')
# assemble-r7v: Part H · <unit>'s line ids of adjudication-r7v (V1-1, V4-1 … V12-2); assemble-r7w: those of adjudication-r7w
# (V1-1, V1-2, V4-1, V6-1 … V6-8, V7-1 … V7-3, V9-1 … V9-4, V10-1), counted beside the END-L and E-M ids
HLINE = re.compile(r'(?<![\w\-./§])V\d{1,2}-\d{1,2}(?![\w\-.])')
prb, marks, jcites, endids, passes, hlines = [], [], [], [], [], []
for u, p in units:
    L = open(os.path.join(SRC, p), encoding='utf-8').read().split('\n')
    for i, l in enumerate(L):
        ctx = lambda m: l[max(0, m.start() - 70):m.end() + 50].strip()
        for m in PRB.finditer(l):
            prb.append(dict(unit=u, line=i + 1, id=m.group(0), amended_marker=bool(AMD.search(l)), context=ctx(m)))
        for m in AMD.finditer(l):
            marks.append(dict(unit=u, line=i + 1, kind='(amended, …)', text=m.group(0), context=ctx(m)))
        for m in JMARK.finditer(l):
            bare = m.group(0) == f'({m.group(1)})'
            marks.append(dict(unit=u, line=i + 1, kind='bare (Jn)' if bare else '(Jn, …)', text=m.group(0), context=ctx(m)))
        for m in JANY.finditer(l):
            jcites.append(dict(unit=u, line=i + 1, id=m.group(0), context=ctx(m)))
        for m in ENDID.finditer(l):
            endids.append(dict(unit=u, line=i + 1, id=m.group(0), context=ctx(m)))
        for m in PASS.finditer(l):
            passes.append(dict(unit=u, line=i + 1, text=m.group(0), context=ctx(m)))
        for m in HLINE.finditer(l):
            hlines.append(dict(unit=u, line=i + 1, text=m.group(0), context=ctx(m)))
out = dict(review_id_tokens_known=len(review), prb_sites=len(prb), prb=prb, markers=marks, j144_151_mentions=jcites, end_ids=endids, pass_round_part=passes, part_h_line_ids=hlines, design_text_sites=len(sites), design_text_by_unit=dict(Counter(s['unit'] for s in sites)),
           in_records=len(inrec), in_records_by_unit=dict(Counter(s['unit'] for s in inrec)), sites=sites, record_sites=inrec)
json.dump(out, open(f'{W}/reviewids-{TAG}.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
rows = ['class\tunit\tline\tid\tsection\tcontext'] + [
    '\t'.join([c, s['unit'], str(s['line']), s['id'], s['section'], s['context'].replace('\t', ' ')]) for c, lst in (('design', sites), ('record', inrec)) for s in lst]
open(f'{W}/reviewids-{TAG}.tsv', 'w', encoding='utf-8').write('\n'.join(rows) + '\n')
print('known review-id tokens', len(review), '(PRB tokens among them:', sum(1 for k in review if k.startswith('PRB')), ')')
print('PRB ids in the set:', len(prb)); [print('  ', x) for x in prb]
print('markers ((amended, …), (Jn, …), bare (Jn)) in the set:', len(marks), dict(Counter(x['kind'] for x in marks))); [print('  ', x['unit'], x['line'], x['text'], '|', x['context'][:160]) for x in marks]
print('END-line ids in the set:', len(endids)); [print('  ', x['unit'], x['line'], x['id'], '|', x['context'][:140]) for x in endids]
print('J144-J151 mentions:', len(jcites), dict(Counter(x['unit'] for x in jcites)))
print("'pass n' / 'round n' / 'Part H|L|P' mentions:", len(passes)); [print('  ', x['unit'], x['line'], x['text'], '|', x['context'][:140]) for x in passes]
print("Part H line ids (Vn-m) in the set:", len(hlines)); [print('  ', x['unit'], x['line'], x['text'], '|', x['context'][:140]) for x in hlines]
print('design-text sites', len(sites), out['design_text_by_unit'])
print('in records (kept as records)', len(inrec), out['in_records_by_unit'])
for s in sites: print('  ', s['unit'], s['line'], s['id'], '|', s['section'][:40], '|', s['context'][:150])
