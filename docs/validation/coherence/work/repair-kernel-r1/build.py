#!/usr/bin/env python3
"""repair-kernel-r1 builder: live §3.1–§3.5 + count-asserted substitutions -> REPLACE block bodies.

Each substitution must match exactly once in its subsection; every other line stays verbatim.
Writes blocks.txt (the block section of the repair file) and new-sections/ (for diffing).
"""
import os, re, sys, hashlib

ROOT = '/home/user/maps-architecture'
DOC = os.path.join(ROOT, 'docs/ARCHITECTURE.md')
HERE = os.path.dirname(os.path.abspath(__file__))
FENCE = re.compile(r'^\s*(```|~~~)')
HEAD = re.compile(r'^(#{1,6})\s+\S')

text = open(DOC, encoding='utf-8').read()
assert hashlib.sha256(text.encode()).hexdigest().startswith('484af066f0115b1d'), 'base changed under us'
lines = text.split('\n')

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

import textwrap
BREAK = re.compile(r'^\s*($|[*-] |\d+\. |\||```|#)')
def reflow_tail(s, anchor, width=120):
    """Reflow from the line holding `anchor` to its paragraph's end (blank line, list item, table, fence, heading);
    words and their order unchanged, the anchor line's indentation kept for every line."""
    ls = s.split('\n')
    ks = [k for k, l in enumerate(ls) if anchor in l]
    assert len(ks) == 1, (anchor, ks)
    a = ks[0]; b = a + 1
    while b < len(ls) and not BREAK.match(ls[b]) and (len(ls[b]) - len(ls[b].lstrip(' '))) == (len(ls[a]) - len(ls[a].lstrip(' '))):
        b += 1
    ind = ls[a][:len(ls[a]) - len(ls[a].lstrip(' '))]
    words = ' '.join(l.strip() for l in ls[a:b]).split(' ')
    before = ' '.join(l.strip() for l in ls[a:b])
    out = textwrap.wrap(before, width=width, initial_indent=ind, subsequent_indent=ind,
                        break_long_words=False, break_on_hyphens=False)
    assert ' '.join(o.strip() for o in out) == before
    return '\n'.join(ls[:a] + out + ls[b:])

H31 = '### 3.1 Build-versus-adopt, per primitive'
H32 = '### 3.2 Numeric policy'
H33 = '### 3.3 The transaction protocol — batches, one level each, canonical order, indexes rebuilt at stage end'
H34 = '### 3.4 Kernel operations the pipeline needs (complete list)'
H35 = "### 3.5 Why this kernel closes the creators' failure classes"

EDITS = {
  H31: [
    ('VK0-11',
     "  | 'E_NO_PATH'            // with the closest reached point [F-ROUTE, F-RIVER]",
     "  | 'E_NO_PATH'            // with the closest reached point [F-ROUTE]"),
  ],
  H32: [
    ('VEL0-04 (determinism hand-off): a re-derivation never shrinks the frame below its protected content',
     "   change. The arena's outer ring and the frame rectangle are §2.2 rule 1's `margin` and `border` chains.\n",
     "   change. The arena's outer ring and the frame rectangle are §2.2 rule 1's `margin` and `border` chains. A Re-derive\n"
     "   that recomputes the frame — a rung change or a population `adjust` — reads this law afresh and never shrinks the\n"
     "   frame below its protected content (§7.4's frame row; §7.1's `bend.frame.held`).\n"),
    ('VEL0-04: the growth rule scoped to the epoch it governs (the paragraph is "Frame growth at an epoch")',
     "   **Frame growth at an epoch (item 81 (b); J-A81.31).** A frame only grows, and only where §4.11 grows it at an epoch.\n",
     "   **Frame growth at an epoch (item 81 (b); J-A81.31).** At an epoch a frame only grows, and only where §4.11 grows it.\n"),
    ('VK0-07 (b)',
     "   ring is the frame with its margin (§2.2 rule 1: each underground part — the sewer's, II.7.2, and each further part's\n"
     "   — and each raised part of the ground layer, §3.4) grows by (a) and (b) on its own key, the `margin` rows of its own\n"
     "   record instead of the `Terrain`'s, with no water and no border.",
     "   ring is the frame with its margin (§2.2 rule 1: each underground part — the sewer's, II.7.2, and each further part's\n"
     "   — and each raised part of the ground layer, §2.7 *At the frame*) grows by (a) and (b) on its own key, the `margin`\n"
     "   rows of its own record instead of the `Terrain`'s, with no water and no border."),
  ],
  H33: [
    ('VK0-23',
     "   and step (0)'s parts; our count, PLAUSIBLE until M1), ≈ 2.2–3.3 MB plus ≈ 0.2 MB of home column; at a freeze after\n"
     "   edits ≈ 0.5 MB of home column; three copies measured at ≈ 4.6 ms (`fixall_kernel_r4_bench.out` A). Its size and\n",
     "   and step (0)'s parts; our count, PLAUSIBLE until M1), ≈ 2.2–3.3 MB plus ≈ 0.2 MB of home column, three such copies\n"
     "   measured at ≈ 4.6 ms (`fixall_kernel_r4_bench.out` A); at a freeze after edits ≈ 0.5 MB of home column. Its size and\n"),
  ],
  H34: [
    ('VK0-07 (a), (c)',
     "* *Raised ways* — a viaduct, an elevated road, an aqueduct (item 110 (b); item 244) — each lies on its own part of the\n"
     "  `ground` layer, numbered from 1 (part 0 is the ground), allocated once and never renumbered or reused, as the\n"
     "  underground's and the sky's parts are (§2.2's `PlatKey`). A raised way crosses the part-0 ways beneath it without a\n"
     "  junction; inside its part it is an ordinary way, banded by §3.7's kerb and `corridorUnion`; its piers are footprints\n"
     "  on part 0 (§2.7's `supports`), which part-0 stages read through the services.\n",
     "* *Raised ways* — a viaduct, an elevated road, an aqueduct (item 110 (b); item 244) — each lies on its own part of the\n"
     "  `ground` layer, numbered from 1 (part 0 is the ground) by `Document.nextGroundPart` (§2.9), allocated once and never\n"
     "  renumbered or reused, as the underground's and the sky's parts are (§2.2's `PlatKey`). A raised way crosses the\n"
     "  part-0 ways beneath it without a junction; inside its part it is an ordinary way, banded by §3.7's kerb and\n"
     "  `corridorUnion`; its piers are footprints on part 0 (§2.7's `supports`), which part-0 stages read from the record\n"
     "  through §4.1's `raised` data key.\n"),
    ('VK0-07 seam (the feet record of the model\'s VK0-06 cited where §3.4 places the feet)',
     "`UndergroundLink`, §2.7) — whose two `link_end` vertices lie one in each part it joins, and a raised way's two feet,\n"
     "where its ramps or stairs meet part 0 (item 110 (b)), each a vertex on part 0 and one on the raised part — as an\n"
     "`AccessPoint` names a ground point and a kerb vertex (II.7.4). Each end names its part (`{ part; at }`), so `resolve`\n",
     "`UndergroundLink`, §2.7) — whose two `link_end` vertices lie one in each part it joins, and a raised way's two feet\n"
     "(`RaisedWayRecord.feet`, §2.7), where its ramps or stairs meet part 0 (item 110 (b)), each a `raised_foot` vertex on\n"
     "part 0 and one on the raised part — as an `AccessPoint` names a ground point and a kerb vertex (II.7.4). Each end\n"
     "names its part (`{ part; at }`), so `resolve`\n"),
  ],
  H35: [
    ('VK0-19',
     "| `E_NOT_TWO_CROSSINGS` and `connectHole` (§3.6); the bent cut's bounded, logged ladder (§4.6, §5.2 F-CUT) |",
     "| `E_NOT_TWO_CROSSINGS` and `connectHole` (§3.6); the bent cut's recursion bounded by §4.6 step 1's stop test and by its recursion-depth work limit (§5.1 (5), F-WORK), every rejection logged on its ladder (§4.6, §5.2 F-CUT) |"),
  ],
}

REFLOW = {}   # no reflow: each edit is hand-wrapped on the lines it touches, every other line verbatim

os.makedirs(os.path.join(HERE, 'new-sections'), exist_ok=True)
os.makedirs(os.path.join(HERE, 'old-sections'), exist_ok=True)
blocks, nsub = [], 0
for n, h in enumerate([H31, H32, H33, H34, H35], 1):
    old = section(h); new = old
    for tag, a, b in EDITS[h]:
        new = sub(new, a, b, tag); nsub += 1
    for anchor in REFLOW.get(h, []):
        new = reflow_tail(new, anchor)
    assert new != old
    open(os.path.join(HERE, 'old-sections', f'3.{n}.md'), 'w').write(old + '\n')
    open(os.path.join(HERE, 'new-sections', f'3.{n}.md'), 'w').write(new + '\n')
    blocks.append(f'=== REPLACE {h} ===\n{new}\n=== END ===\n')
open(os.path.join(HERE, 'blocks.txt'), 'w').write('\n'.join(blocks))
print(f'blocks {len(blocks)}, substitutions {nsub}, each applied exactly once')
