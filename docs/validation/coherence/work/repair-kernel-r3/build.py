#!/usr/bin/env python3
"""repair-kernel-r3 builder: live §3.1 and §3.2 + count-asserted substitutions -> REPLACE block bodies; the restated
J-A81.31 index row and Part A entry -> J-ROWS and RATIONALE-A rows.

Each substitution must match exactly once in its subsection (or row); every other line stays verbatim.
Writes blocks.txt (the block section of the repair file), old-sections/ and new-sections/ (for diffing), sizes.txt.
"""
import os, re, hashlib

ROOT = '/home/user/maps-architecture'
DOC = os.path.join(ROOT, 'docs/ARCHITECTURE.md')
RAT = os.path.join(ROOT, 'docs/ARCHITECTURE-RATIONALE.md')
HERE = os.path.dirname(os.path.abspath(__file__))
FENCE = re.compile(r'^\s*(```|~~~)')
HEAD = re.compile(r'^(#{1,6})\s+\S')

text = open(DOC, encoding='utf-8').read()
assert hashlib.sha256(text.encode()).hexdigest().startswith('4ed292e94f2442e5'), 'base changed under us'
rtext = open(RAT, encoding='utf-8').read()
assert hashlib.sha256(rtext.encode()).hexdigest().startswith('dd2bfafa96aba31b'), 'rationale changed under us'
lines = text.split('\n')
rlines = rtext.split('\n')


def headings(ls):
    out, fence = [], None
    for i, l in enumerate(ls):
        m = FENCE.match(l)
        if m:
            if fence is None: fence = m.group(1)
            elif m.group(1) == fence: fence = None
            continue
        if fence is None and HEAD.match(l):
            out.append((i, len(l) - len(l.lstrip('#')), l))
    return out


HEADS = headings(lines)


def section(head_line):
    ks = [k for k, (_, _, l) in enumerate(HEADS) if l == head_line]
    assert len(ks) == 1, (head_line, ks)
    k = ks[0]; i, lvl, _ = HEADS[k]
    j = len(lines)
    for i2, l2, _ in HEADS[k + 1:]:
        if l2 <= lvl: j = i2; break
    body = lines[i:j]
    while body and body[-1].strip() == '': body.pop()
    return '\n'.join(body)


def sub(s, old, new, tag):
    n = s.count(old)
    assert n == 1, f'{tag}: expected 1 match, found {n}'
    return s.replace(old, new)


def row(ls, a_pred, b_pred, rid):
    a = next(i for i, l in enumerate(ls) if a_pred(l))
    b = next(i for i in range(a + 1, len(ls)) if b_pred(ls[i]))
    rows = [ls[i] for i in range(a, b) if re.match(r'^\|\s*' + re.escape(rid) + r'\s*\|', ls[i])]
    assert len(rows) == 1, (rid, len(rows))
    return rows[0]


H31 = '### 3.1 Build-versus-adopt, per primitive'
H32 = '### 3.2 Numeric policy'

EDITS = {
  H31: [
    ('VKr2-03: E_NO_PATH names every reader of the code (F-ROUTE; F-VOID; F-EDIT; V04 L5 next rung)',
     "  | 'E_NO_PATH'            // with the closest reached point [F-ROUTE]\n",
     "  | 'E_NO_PATH'            // with the closest reached point [F-ROUTE; F-VOID — an undercity lifeline's dug connector at "
     "generation, II.7.5, II.7.6; in an edit the dry run's refusal, F-EDIT — II.7.6 step 3; a subterranean dossier "
     "institution's connector at generation, the next rung of V04 §3.7 L5]\n"),
  ],
  H32: [
    ('VKr2-01 (R3-25 (b)): (b) names the part-0 split and Plat.frame is taken as its last batch commits',
     "   * (b) *The margin (L0).* One L0 batch inserts the new outer ring as the `margin` chain, then S1's water faces in the\n"
     "     band between old and new ring (§4.11), then strips the old ring's `margin` rows by `removeEdges` on two\n"
     "     `StretchRef`s that together cover it (§3.4). A stretch left with no row is deleted, joining the faces either side —\n"
     "     land with land, water with water, each cleared L1 face beside it with the ring's; a stretch that keeps a row keeps\n"
     "     its edge, re-levelled by §2.2 rule 3 (a), as where S1 lays a shore along it. `Plat.frame` takes the new frame as\n"
     "     this batch commits.\n",
     "   * (b) *The margin (L0).* One L0 batch — on part 0 two, where a raised way's foot lies at a deck end on the old ring\n"
     "     (below) — inserts the new outer ring as the `margin` chain, then S1's water faces in the band between old and new\n"
     "     ring (§4.11), then strips the old ring's `margin` rows by `removeEdges` on two `StretchRef`s that together cover it\n"
     "     (§3.4). A stretch left with no row is deleted, joining the faces either side — land with land, water with water,\n"
     "     each cleared L1 face beside it with the ring's; a stretch that keeps a row keeps its edge, re-levelled by §2.2\n"
     "     rule 3 (a), as where S1 lays a shore along it. `Plat.frame` takes the new frame as its last batch commits.\n"),
    ('VKr2-01 (R3-25 (b)): a raised way\'s ground foot on the old ring moved between part 0\'s two L0 batches',
     "   A vertex of an old chain that keeps a row or another edge stays — a through-road's end on the old ring is an antenna\n"
     "   end until §4.11 continues its way — and every other dissolves or stays by §2.2 rule 3. Every other part whose outer\n"
     "   ring is the frame with its margin (§2.2 rule 1: each underground part — the sewer's, II.7.2, and each further part's\n",
     "   A vertex of an old chain that keeps a row or another edge stays — a through-road's end on the old ring is an antenna\n"
     "   end until §4.11 continues its way — and every other dissolves or stays by §2.2 rule 3. A raised way's ground foot at\n"
     "   a deck end on the old ring (§2.7 `RaisedFoot`) — a `raised_foot` vertex whose every edge the strip would delete,\n"
     "   leaving its row and no edge — is never left so. Where part 0's old ring holds one, batch (b)'s insertion (the new\n"
     "   ring with S1's water) and its strip are two L0 batches, and between them one batch at the foot rows' level (one per\n"
     "   level, coarsest first, should they differ) moves each such foot, in the callback form's issue order (§3.3) — the\n"
     "   feet by way id, then foot index, each foot's strip before its add: its row is stripped by `removeEdges` on its\n"
     "   `VertexRef`, the vertex dissolving into the old ring, or left a plain vertex of it for the strip, by §2.2 rule 3;\n"
     "   then the row is added by `splitThrough` on the new ring at that ring's point nearest it (ties by lattice position,\n"
     "   y then x). The deck end on the raised part's own old ring stays an antenna end of its spine, as a through-road's\n"
     "   end does. The raised way's re-derivation then extends the deck to the new ring and re-places both ends of that foot\n"
     "   (§2.7 `RaisedFoot`, as §4.11 continues a through-road), so both ends resolve at every stage end (§3.10's\n"
     "   stored-references row). Every other part whose outer\n"
     "   ring is the frame with its margin (§2.2 rule 1: each underground part — the sewer's, II.7.2, and each further part's\n"),
    ('VKr2-01: the undo record restores what the growth\'s batches removed, however many there are',
     "undo record restores the old frame and what the three batches removed.",
     "undo record restores the old frame and what its batches removed."),
  ],
}

# J-A81.31 restated (kernel's own decision, home §3.2): its record states the final mechanism (canon: a decision row
# states its final choice). Swapped into place by swap_restated.py (NOTE FOR ASSEMBLE).
JIDX_OLD = row(lines, lambda l: l.startswith('# Judgment calls'), lambda l: l.startswith('# '), 'J-A81.31')
JIDX_NEW = sub(JIDX_OLD,
               "by three single-level batches sharing one clear region | §3.2 |",
               "by three single-level batches sharing one clear region — part 0's L0 batch split in two where a raised way's "
               "foot on the old ring moves between them to the new ring | §3.2 |", 'J-A81.31 index')
PA_OLD = row(rlines, lambda l: l.startswith('## Part A'), lambda l: l.startswith('## Part B'), 'J-A81.31')
PA_NEW = sub(PA_OLD,
             "then strips the old ring's `margin` rows, and an L1 batch",
             "then strips the old ring's `margin` rows (on part 0, where a raised way's foot lies at a deck end on the old "
             "ring, two L0 batches, the insertion and the strip, with a batch at the foot row's level between them moving "
             "that foot onto the new ring), and an L1 batch", 'J-A81.31 Part A (1)')
PA_NEW = sub(PA_NEW,
             " Chose to extend each raster on its own grid,",
             " Chose to move such a foot between the margin's insertion and its strip over keeping it on the old ring until "
             "the raised way's re-derivation re-places it, because the strip would leave its vertex with its row and no "
             "edge — a vertex the arena's record does not define (`out` names one outgoing half-edge, §2.2) and that every "
             "walk, index and §3.10 row would have to admit for one passing case; the move strips the row, the vertex "
             "dissolving into the old ring, and splits it onto the new ring's nearest point, so both ends of the foot "
             "resolve at every stage end. Chose to extend each raster on its own grid,", 'J-A81.31 Part A (2)')
PA_NEW = sub(PA_NEW, "VKC-02, VPR0-07, VD0-27;", "VKC-02, VPR0-07, VD0-27, VKr2-01;", 'J-A81.31 Part A (3)')

os.makedirs(os.path.join(HERE, 'new-sections'), exist_ok=True)
os.makedirs(os.path.join(HERE, 'old-sections'), exist_ok=True)
blocks, nsub, sizes = [], 0, []
for h, tag in ((H31, '3.1'), (H32, '3.2')):
    old = section(h); new = old
    for t, a, b in EDITS[h]:
        new = sub(new, a, b, t); nsub += 1
    assert new != old
    open(os.path.join(HERE, 'old-sections', tag + '.md'), 'w', encoding='utf-8').write(old + '\n')
    open(os.path.join(HERE, 'new-sections', tag + '.md'), 'w', encoding='utf-8').write(new + '\n')
    blocks.append(f'=== REPLACE {h} ===\n{new}\n=== END ===\n')
    sizes.append(f'§{tag}: {len(old.split())} -> {len(new.split())} words ({len(new.split()) - len(old.split()):+d})')
blocks.append(f'=== J-ROWS ===\n{JIDX_NEW}\n=== END ===\n')
blocks.append(f'=== RATIONALE-A ===\n{PA_NEW}\n=== END ===\n')
nsub += 4
sizes.append(f'J-A81.31 index row: {len(JIDX_OLD.split())} -> {len(JIDX_NEW.split())} words '
             f'({len(JIDX_NEW.split()) - len(JIDX_OLD.split()):+d})')
sizes.append(f'J-A81.31 Part A: {len(PA_OLD.split())} -> {len(PA_NEW.split())} words '
             f'({len(PA_NEW.split()) - len(PA_OLD.split()):+d})')
open(os.path.join(HERE, 'blocks.txt'), 'w', encoding='utf-8').write('\n'.join(blocks))
open(os.path.join(HERE, 'sizes.txt'), 'w', encoding='utf-8').write('\n'.join(sizes) + '\n')
print('substitutions applied:', nsub)
print('\n'.join(sizes))
