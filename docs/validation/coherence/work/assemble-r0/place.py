# Lane coherence/assemble-r0, steps (1)-(2): place the coherence pass's new texts. Mechanical; no hand edits.
# (1) docs/ARCHITECTURE.md: the archived document's top-level (# / ##) headings outside code fences, in order; each matched
#     by exactly one file under docs/validation/coherence/new/base/*/ whose first line is byte-identical; files joined by
#     one blank line. Any unmatched heading, unmatched file or file holding a second top-level heading: STOP, nothing written.
# (2) docs/volumes/V*.md: each replaced by the file of the same name under new/volumes/ (a volume with no new file: STOP).
#     docs/volumes/INDEX.md: §3, §4, §6, §7 replaced by new/index/03, 04, 06, 07 (each starts with its heading line exactly)
#     and the intro's "(file g, items 102–110)" reads "items 102–113" (scope report, cross-part notes, *INDEX.md*).
# Run with --dry to check only. Writes work/assemble-r0/place.json (placement and sizes).
import glob, json, os, re, sys
ROOT = '/home/user/maps-architecture'
os.chdir(ROOT)
DRY = '--dry' in sys.argv
ARCH = 'docs/archive/ARCHITECTURE-pre-coherence-2026-09-28.md'
VARCH = 'docs/archive/volumes-pre-coherence-2026-09-28'
NEW = 'docs/validation/coherence/new'
WORK = 'docs/validation/coherence/work/assemble-r0'
rd = lambda p: open(p, encoding='utf-8').read()
words = lambda t: len(t.split())

def top_heads(text, levels=(1, 2)):
    fence = False; out = []
    for i, l in enumerate(text.split('\n')):
        if l.lstrip().startswith('```'): fence = not fence; continue
        if fence: continue
        m = re.match(r'(#{1,6}) ', l)
        if m and len(m.group(1)) in levels: out.append((i, l))
    return out

def fences(text): return sum(1 for l in text.split('\n') if l.lstrip().startswith('```'))

problems = []
# ---------------- (1) the base
old = rd(ARCH)
old_lines = old.split('\n')
heads = top_heads(old)
files = sorted(glob.glob(f'{NEW}/base/*/*.md'))
first = {}
for f in files:
    t = rd(f)
    first.setdefault(t.split('\n', 1)[0], []).append(f)
    th = top_heads(t)
    if not th or th[0][0] != 0: problems.append(f'file {f}: first line is not a top-level heading')
    if len(th) > 1: problems.append(f'file {f} holds more than one top-level heading: {[h for _, h in th[1:4]]}')
    if fences(t) % 2: problems.append(f'file {f}: odd number of code-fence lines ({fences(t)})')
order = []
for n, (ln, h) in enumerate(heads):
    fs = first.get(h, [])
    if len(fs) != 1: problems.append(f'archived heading l. {ln + 1} {h[:90]!r} matched by {len(fs)} files: {fs}')
    else:
        end = heads[n + 1][0] if n + 1 < len(heads) else len(old_lines)
        order.append(dict(line=ln + 1, heading=h, file=fs[0], old_text='\n'.join(old_lines[ln:end])))
used = {o['file'] for o in order}
for f in files:
    if f not in used: problems.append(f'file {f} has no archived heading: {rd(f).split(chr(10), 1)[0][:90]!r}')

# ---------------- (2) the volumes
# Post-placement mechanical corrections of a volume's new text (exactly one match each; recorded in the report):
#   V06: a stray closing fence after §2.12's lifecycle table (no opener; the archived V06 has none there) flips every
#        later fence, so §2.13 onward would render as code and lose its headings; removing the one line restores the
#        archive's balance (26 fence lines).
VOL_POST = {
    'V06-evolution.md': [('| — |\n```\n\n### 2.13 Item 110\'s epoch records', '| — |\n\n### 2.13 Item 110\'s epoch records')],
}
vol_live = sorted(glob.glob('docs/volumes/V*.md'))
vol_new = sorted(glob.glob(f'{NEW}/volumes/V*.md'))
vols = []
post_log = []
for v in vol_live:
    nv = f'{NEW}/volumes/{os.path.basename(v)}'
    if not os.path.exists(nv): problems.append(f'volume {v} has no new file {nv}')
    else:
        tn = rd(nv)
        for a_, b_ in VOL_POST.get(os.path.basename(v), []):
            c = tn.count(a_)
            if c != 1: problems.append(f'post edit on {nv} matched {c} times: {a_[:60]!r}')
            else: tn = tn.replace(a_, b_); post_log.append(dict(file=nv, old=a_, new=b_))
        if fences(tn) % 2: problems.append(f'file {nv}: odd number of code-fence lines ({fences(tn)})')
        vols.append(dict(live=v, new=nv, archived=f'{VARCH}/{os.path.basename(v)}', text=tn))
for nv in vol_new:
    if not os.path.exists(f'docs/volumes/{os.path.basename(nv)}'): problems.append(f'new volume file {nv} has no live volume')

# ---------------- (2b) INDEX.md's four sections
IDX = 'docs/volumes/INDEX.md'
idx_old = rd(f'{VARCH}/INDEX.md')
il = idx_old.split('\n')
ih = top_heads(idx_old, levels=(2,))
idx_parts = sorted(glob.glob(f'{NEW}/index/*.md'))
repl = {}
for p in idx_parts:
    h = rd(p).split('\n', 1)[0]
    hits = [k for k, (ln, hh) in enumerate(ih) if hh == h]
    if len(hits) != 1: problems.append(f'INDEX part {p}: heading {h!r} matched {len(hits)} INDEX headings')
    else: repl[hits[0]] = p
INTRO_A, INTRO_B = '(file g, items 102–110)', '(file g, items 102–113)'
if idx_old.count(INTRO_A) != 1: problems.append(f'INDEX intro edit matched {idx_old.count(INTRO_A)} times')

if problems:
    print('STOP — placement problems:'); [print(' ', p) for p in problems]; sys.exit(2)

# ---------------- build
doc = '\n\n'.join(rd(o['file']).rstrip('\n') for o in order) + '\n'
chunks = []
cut = [ln for ln, _ in ih]
chunks.append('\n'.join(il[:cut[0]]))
idx_place = []
for k, (ln, h) in enumerate(ih):
    end = cut[k + 1] if k + 1 < len(cut) else len(il)
    oldsec = '\n'.join(il[ln:end])
    if k in repl:
        newsec = rd(repl[k]).rstrip('\n') + '\n'
        chunks.append(newsec)
        idx_place.append(dict(heading=h, file=repl[k], old_bytes=len(oldsec.encode()), new_bytes=len(newsec.encode()),
                              old_words=words(oldsec), new_words=words(newsec)))
    else:
        chunks.append(oldsec)
        idx_place.append(dict(heading=h, file=None, old_bytes=len(oldsec.encode()), new_bytes=len(oldsec.encode()),
                              old_words=words(oldsec), new_words=words(oldsec)))
idx_new = '\n'.join(chunks)
idx_new = idx_new.replace(INTRO_A, INTRO_B)
if not idx_new.endswith('\n'): idx_new += '\n'
if len(top_heads(idx_new, (2,))) != len(ih): print('STOP — INDEX heading count changed'); sys.exit(2)

# ---------------- sizes
rec = dict(base=[], volumes=[], index=idx_place)
for o in order:
    nt = rd(o['file'])
    rec['base'].append(dict(line=o['line'], heading=o['heading'], file=o['file'],
                            old_bytes=len(o['old_text'].encode()), new_bytes=len(nt.rstrip('\n').encode()),
                            old_words=words(o['old_text']), new_words=words(nt)))
rec['base_total'] = dict(old_bytes=len(old.encode()), new_bytes=len(doc.encode()), old_words=words(old), new_words=words(doc),
                         old_lines=old.count('\n'), new_lines=doc.count('\n'), fence_lines=fences(doc))
for v in vols:
    ot, nt = rd(v['archived']), v.pop('text')
    v['text_out'] = nt
    v.update(old_bytes=len(ot.encode()), new_bytes=len(nt.encode()), old_words=words(ot), new_words=words(nt),
             old_lines=ot.count('\n'), new_lines=nt.count('\n'), old_first=ot.split('\n', 1)[0][:120], new_first=nt.split('\n', 1)[0][:120])
    rec['volumes'].append(v)
rec['index_total'] = dict(old_bytes=len(idx_old.encode()), new_bytes=len(idx_new.encode()), old_words=words(idx_old), new_words=words(idx_new))
rec['volume_post_edits'] = post_log
json.dump({k: ([{kk: vv for kk, vv in x.items() if kk != 'text_out'} for x in v] if k == 'volumes' else v) for k, v in rec.items()},
          open(f'{WORK}/place.json', 'w'), ensure_ascii=False, indent=1)
for b in rec['base']: print(f"{b['line']:>6}  {os.path.relpath(b['file'], NEW):<58} {b['old_bytes']:>8} -> {b['new_bytes']:>8}  {b['heading'][:50]}")
bt = rec['base_total']
print(f"base: placed {len(order)} of {len(heads)} headings from {len(files)} files; {bt['old_bytes']} -> {bt['new_bytes']} bytes; "
      f"{bt['old_words']} -> {bt['new_words']} words; fences {bt['fence_lines']}")
for v in vols: print(f"volume {os.path.basename(v['live']):<26} {v['old_bytes']:>8} -> {v['new_bytes']:>8} bytes  {v['old_words']:>7} -> {v['new_words']:>7} words")
for p in idx_place: print(f"INDEX {p['heading'][:60]:<62} {'<- ' + os.path.basename(p['file']) if p['file'] else '(kept)'}  {p['old_bytes']} -> {p['new_bytes']}")
if DRY: print('DRY RUN — nothing written'); sys.exit(0)
open('docs/ARCHITECTURE.md', 'w', encoding='utf-8').write(doc)
for v in vols: open(v['live'], 'w', encoding='utf-8').write(v['text_out'])
open(IDX, 'w', encoding='utf-8').write(idx_new)
print('written: docs/ARCHITECTURE.md, 12 volumes, docs/volumes/INDEX.md')
