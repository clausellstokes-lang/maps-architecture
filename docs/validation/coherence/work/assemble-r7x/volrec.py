#!/usr/bin/env python3
"""volrec.py (coherence/assemble-r7x, P3b, new) — each volume output (apply.py's, scratch out/) compared with what its
repair seat's header records for its dry run: sha256 where recorded, else bytes, lines, the live lines its diff touches,
and words (whitespace and wc). Writes volrec.json beside it. Never writes a live file."""
import difflib, hashlib, json, os, subprocess
ROOT = '/home/user/maps-architecture'
W = os.path.join(ROOT, 'docs/validation/coherence/work/assemble-r7x')
SCR = '/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/asm7x'
def changed(a, b):
    s = set(); ins = []
    for tag, i1, i2, j1, j2 in difflib.SequenceMatcher(None, a, b, autojunk=False).get_opcodes():
        if tag in ('replace', 'delete'): s.update(range(i1 + 1, i2 + 1))
        elif tag == 'insert': ins.append(i1)
    return sorted(s), ins
rec = {
 'V04-underground': dict(text="1 block found, 1 applied, 0 skipped, audit not-OK 0; headings 59 → 59; fences balanced (12 → 12); title block "
                              "unchanged; rationale byte-identical; 3 644 → 3 644 lines, 536 408 → 536 518 bytes; the diff touches exactly l. 3164",
                         bytes=536518, lines=3644, touched={3164}),
 'V06-evolution': dict(text="After the blocks: sha256 58f0fb64092942c2a93f9881486ea67e9640d6e4fab76b101b5ca9ef8872baeb, 710 168 bytes, 4 666 lines; "
                            "4 applied, audit not OK 0, headings 65 → 65, fences balanced (28 → 28)",
                       sha256='58f0fb64092942c2a93f9881486ea67e9640d6e4fab76b101b5ca9ef8872baeb', bytes=710168, lines=4666),
 'V07-village': dict(text="2 blocks found, 2 applied, 0 skipped; audit not-OK 0; headings 58 → 58; fences balanced (18 → 18); 622 153 → 622 038 "
                          "bytes, 4 125 → 4 124 lines; the diff touches exactly live lines 1615–1618, 1621–1622 (re-wrapped as 1615–1617, "
                          "1620–1621) and 3710",
                     bytes=622038, lines=4124, touched={1615, 1616, 1617, 1618, 1621, 1622, 3710}),
 'V09-application': dict(text="4 found, 4 applied, 0 skipped, audit OK (not OK 0); headings 110 → 110; fences balanced (24 → 24); title block "
                              "unchanged; lines 5,045 → 5,045; §2.7 1,606 → 1,611; §4.9 13,199 → 13,268; §4.20.2 1,339 → 1,340; §7.1 11,607 → "
                              "11,622 (its volume figure '126,256 to 126,345 words (wc)', +89, is another count than the volume's wc)",
                         lines=5045, sections={'### 2.7 ': (1606, 1611), '### 4.9 ': (13199, 13268), '#### 4.20.2 ': (1339, 1340),
                                               '### 7.1 ': (11607, 11622)}),
 'V11-content': dict(text="2 found, 2 applied, 0 skipped, audit not-OK 0; headings 58 → 58, fences balanced (22 → 22), title block unchanged; "
                          "5,470 → 5,470 lines; 681,412 → 681,994 bytes, output sha256 da9be47c3f14fd2f8cb3146549cea1c6a45c4d7a1a6099ba5508dbda3d79d080; "
                          "the only changed lines are l. 208 and l. 1006",
                     sha256='da9be47c3f14fd2f8cb3146549cea1c6a45c4d7a1a6099ba5508dbda3d79d080', bytes=681994, lines=5470, touched={208, 1006}),
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
