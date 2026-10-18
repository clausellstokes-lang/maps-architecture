#!/usr/bin/env python3
"""Export a simple Markdown document (headings, paragraphs, bullets, numbered lists, **bold**) to HTML, DOCX (via macOS
textutil) and PDF (dependency-free writer, Helvetica). Usage: python3 tools/md_export.py docs/DEFINITION.md docs/export"""
import html, os, re, subprocess, sys, textwrap
src_path, outdir = sys.argv[1], sys.argv[2]
os.makedirs(outdir, exist_ok=True)
name = os.path.splitext(os.path.basename(src_path))[0]
lines = open(src_path).read().splitlines()
blocks = []  # (kind, text)
para = []
def flush():
    global para
    if para: blocks.append(('p', ' '.join(x.strip() for x in para))); para = []
i = 0
while i < len(lines):
    l = lines[i]
    if l.startswith('# '): flush(); blocks.append(('h1', l[2:])); i += 1; continue
    if l.startswith('## '): flush(); blocks.append(('h2', l[3:])); i += 1; continue
    m = re.match(r'^(- |\d+\. )(.*)', l)
    if m:
        flush(); item = [m.group(2)]; kind = 'li' if m.group(1) == '- ' else 'ol'
        while i + 1 < len(lines) and lines[i + 1].startswith('   ') and not re.match(r'^(- |\d+\. )', lines[i + 1].strip() + ' '):
            i += 1; item.append(lines[i].strip())
        blocks.append((kind, (m.group(1).strip() + ' ' if kind == 'ol' else '') + ' '.join(item))); i += 1; continue
    if not l.strip(): flush(); i += 1; continue
    para.append(l); i += 1
flush()
# HTML
def inline(t): return re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', html.escape(t)).replace('`', '')
out = []; inlist = None
for k, t in blocks:
    if k in ('li', 'ol'):
        tag = 'ul' if k == 'li' else 'ol'
        if inlist != tag:
            if inlist: out.append(f'</{inlist}>')
            out.append(f'<{tag}>'); inlist = tag
        out.append('<li>' + inline(re.sub(r'^\d+\.\s', '', t)) + '</li>'); continue
    if inlist: out.append(f'</{inlist}>'); inlist = None
    out.append({'h1': '<h1>{}</h1>', 'h2': '<h2>{}</h2>', 'p': '<p>{}</p>'}[k].format(inline(t)))
if inlist: out.append(f'</{inlist}>')
doc = ('<!DOCTYPE html><html><head><meta charset="utf-8"><title>' + html.escape(name) + '</title><style>body{font-family:Georgia,serif;'
       'font-size:12pt;line-height:1.45;margin:2.2cm;color:#1a1a1a}h1{font-size:19pt}h2{font-size:14pt;margin-top:1.2em;border-bottom:1px solid #999}'
       'p,li{margin:.4em 0}</style></head><body>' + '\n'.join(out) + '</body></html>')
hp = os.path.join(outdir, name + '.html'); open(hp, 'w').write(doc)
subprocess.run(['textutil', '-convert', 'docx', '-output', os.path.join(outdir, name + '.docx'), hp], check=True)
# PDF
W, H, L, T, B = 595.28, 841.89, 56, 64, 60
def clean(t):
    t = re.sub(r'\*\*(.+?)\*\*', r'\1', t).replace('`', '')
    for a, b in [('—', '-'), ('–', '-'), ('→', '->'), ('≈', '~'), ('·', '-'), ('’', "'"), ('“', '"'), ('”', '"'), ('…', '...'), ('⊕', '+')]: t = t.replace(a, b)
    return t
rows = []
for k, t in blocks:
    t = clean(t)
    if k == 'h1':
        for w in textwrap.wrap(t, 60): rows.append(('F2', 16, w, 0))
        rows.append(('F1', 11, '', 0))
    elif k == 'h2': rows += [('F1', 11, '', 0), ('F2', 13, t, 0), ('F1', 5, '', 0)]
    elif k in ('li', 'ol'):
        ws = textwrap.wrap(t, 86); rows.append(('F1', 11, ('- ' if k == 'li' else '') + ws[0], 12))
        rows += [('F1', 11, w, 22) for w in ws[1:]]
    else:
        rows += [('F1', 11, w, 0) for w in textwrap.wrap(t, 92)]; rows.append(('F1', 11, '', 0))
pages, cur, y = [], [], H - T
for f, sz, t, ind in rows:
    lh = 15.5 if sz == 11 else sz * 1.35
    if y - lh < B: pages.append(cur); cur, y = [], H - T
    cur.append((f, sz, t, ind, y)); y -= lh
pages.append(cur)
esc = lambda t: t.replace('\\', '\\\\').replace('(', '\\(').replace(')', '\\)')
objs = []
def add(o): objs.append(o); return len(objs)
f1 = add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>')
f2 = add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>')
pid_all = add('X'); kids = []
for pg in pages:
    st = '\n'.join(f'BT /{f} {sz} Tf {L+ind} {y:.1f} Td ({esc(t)}) Tj ET' for f, sz, t, ind, y in pg if t).encode('cp1252', 'replace')
    c = add(b'<< /Length ' + str(len(st)).encode() + b' >>\nstream\n' + st + b'\nendstream')
    kids.append(add(f'<< /Type /Page /Parent {pid_all} 0 R /MediaBox [0 0 {W} {H}] /Contents {c} 0 R /Resources << /Font << /F1 {f1} 0 R /F2 {f2} 0 R >> >> >>'))
objs[pid_all - 1] = f"<< /Type /Pages /Kids [{' '.join(f'{k} 0 R' for k in kids)}] /Count {len(kids)} >>"
cat = add(f'<< /Type /Catalog /Pages {pid_all} 0 R >>')
buf = bytearray(b'%PDF-1.4\n'); offs = []
for n, o in enumerate(objs, 1):
    offs.append(len(buf)); buf += f'{n} 0 obj\n'.encode() + (o if isinstance(o, bytes) else o.encode('cp1252', 'replace')) + b'\nendobj\n'
x = len(buf); buf += f'xref\n0 {len(objs)+1}\n0000000000 65535 f \n'.encode() + b''.join(f'{o:010d} 00000 n \n'.encode() for o in offs)
buf += f'trailer\n<< /Size {len(objs)+1} /Root {cat} 0 R >>\nstartxref\n{x}\n%%EOF\n'.encode()
open(os.path.join(outdir, name + '.pdf'), 'wb').write(buf)
print(f'{name}: html, docx, pdf ({len(kids)} pages) → {outdir}')
