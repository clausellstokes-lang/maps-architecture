#!/usr/bin/env python3
"""volrec.py (coherence/assemble-r7w, P3b, new) — each volume output (apply.py's, scratch out/) compared with what its
repair seat's header records for its dry run: sha256 where recorded, else bytes, lines, the live lines its diff touches,
and words (whitespace and wc). Writes volrec.json beside it. Never writes a live file."""
import difflib, hashlib, json, os, subprocess
ROOT = '/home/user/maps-architecture'
W = os.path.join(ROOT, 'docs/validation/coherence/work/assemble-r7w')
SCR = '/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/asm7w'
def changed(a, b):
    s = set(); ins = []
    for tag, i1, i2, j1, j2 in difflib.SequenceMatcher(None, a, b, autojunk=False).get_opcodes():
        if tag in ('replace', 'delete'): s.update(range(i1 + 1, i2 + 1))
        elif tag == 'insert': ins.append(i1)
    return sorted(s), ins
rec = {
 'V01-neighbourhoods': dict(text="529 041 → 529 232 bytes, 3 759 → 3 762 lines; the diff touches exactly live lines 2473–2474, 2905, "
                                 "2976–2977, 3024 and one row inserted after 3029", bytes=529232, lines=3762,
                            touched={2473, 2474, 2905, 2976, 2977, 3024}, inserts_at_or_after=3029),
 'V04-underground': dict(text="3 644 → 3 644 lines, 535 894 → 536 408 bytes; the diff touches exactly l. 3164 and l. 3181",
                         bytes=536408, lines=3644, touched={3164, 3181}),
 'V06-evolution': dict(text="sha256 abce709f7c49a3a0d29edfd48aaada44dbf7a40bdd43298cd9bd3c86a0264455, 710 863 bytes, 4 676 lines",
                       sha256='abce709f7c49a3a0d29edfd48aaada44dbf7a40bdd43298cd9bd3c86a0264455', bytes=710863, lines=4676),
 'V07-village': dict(text="621 938 → 622 153 bytes, 4 125 → 4 125 lines; the diff touches exactly live lines 2770 and 3710",
                     bytes=622153, lines=4125, touched={2770, 3710}),
 'V09-application': dict(text="4 found, 4 applied, 0 skipped, audit OK; headings 110 → 110; fences balanced; title block unchanged; "
                              "§4.9 13,149 → 13,199; §4.20.2 1,329 → 1,339; §5.5 306 → 306; §7.1 11,584 → 11,607 (its volume figure '126,174 to "
                              "126,256 words (wc)' is not the volume's wc, which is 128,609 → 128,692; its per-section sum, +83, is)",
                         sections={'### 4.9 ': (13149, 13199), '#### 4.20.2 ': (1329, 1339), '### 5.5 ': (306, 306), '### 7.1 ': (11584, 11607)}),
 'V10-clerk': dict(text="1 found, 1 applied, 0 skipped, audit OK; headings 86 → 86; fences balanced (24 → 24); title block unchanged; "
                        "3,580 → 3,580 lines; the only changed line l. 3156", lines=3580, touched={3156}),
}
out = {}
for key, r in rec.items():
    f = f'docs/volumes/{key}.md'
    a = open(f'{SCR}/before/{f}', encoding='utf-8').read(); b = open(f'{SCR}/out/{f}', encoding='utf-8').read()
    bb = open(f'{SCR}/out/{f}', 'rb').read()
    al, bl = a.split('\n'), b.split('\n')
    ch, ins = changed(al, bl)
    wc = lambda p: int(subprocess.check_output(['wc', '-w', p], text=True).split()[0])
    got = dict(bytes=len(bb), lines=b.count('\n'), sha256=hashlib.sha256(bb).hexdigest(), touched=ch, inserts_after=ins,
               words=[len(a.split()), len(b.split())], wc_words=[wc(f'{SCR}/before/{f}'), wc(f'{SCR}/out/{f}')])
    ok = True
    if 'sha256' in r: ok &= got['sha256'] == r['sha256']
    if 'bytes' in r: ok &= got['bytes'] == r['bytes']
    if 'lines' in r: ok &= got['lines'] == r['lines']
    if 'touched' in r: ok &= set(ch) == r['touched']
    if 'inserts_at_or_after' in r: ok &= len(ins) == 1 and ins[0] >= r['inserts_at_or_after']
    if 'wc_words' in r: ok &= tuple(got['wc_words']) == r['wc_words']
    if 'sections' in r:
        import re
        def secw(L, name):
            hs = [(i, len(m.group(1)), l) for i, l in enumerate(L) for m in [re.match(r'^(#{1,6})\s', l)] if m]
            k = [j for j, (i, lv, l) in enumerate(hs) if l.startswith(name)][0]; s0, lv = hs[k][0], hs[k][1]
            e = next((i for i, l2, _ in hs[k + 1:] if l2 <= lv), len(L)); return len(' '.join(L[s0:e]).split())
        got['sections'] = {n: (secw(al, n), secw(bl, n)) for n in r['sections']}
        ok &= got['sections'] == r['sections']
    out[key] = dict(recorded=r['text'], got=got, equals_recorded=bool(ok))
    print(f"{key:<20} bytes {got['bytes']} lines {got['lines']} sha {got['sha256'][:16]} touched {ch} ins {ins} words {got['words']} wc {got['wc_words']} -> equals_recorded {ok}")
json.dump(out, open(f'{W}/volrec.json', 'w'), indent=1)
