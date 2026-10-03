# edits_d — layout only: every prose line edits_a – edits_c made longer than 127 characters is split at a space outside an
# inline code span and outside emphasis, so the touched paragraphs keep the volume's line width. No word changes.
import os, importlib.util
HERE = os.path.dirname(os.path.abspath(__file__))
WIDTH, LIMIT = 124, 127


def _load(name):
    spec = importlib.util.spec_from_file_location(name, os.path.join(HERE, name + '.py'))
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    return m.EDITS


def _text_after_c():
    t = open(os.path.join(HERE, 'V07.orig.md'), encoding='utf-8').read()
    for mod in ('edits_a', 'edits_b', 'edits_c'):
        for _ids, old, new, count in _load(mod):
            assert t.count(old) == count
            t = t.replace(old, new)
    return t


def _safe_breaks(line):
    """Indices of spaces outside `code` and *emphasis* spans."""
    out, code, emph, i = [], False, False, 0
    start = 2 if line.startswith('* ') else 0          # a list bullet is no emphasis
    for i in range(start, len(line)):
        ch = line[i]
        if ch == '`':
            code = not code
        elif ch == '*' and not code:
            if line[i - 1:i] == '*' or line[i + 1:i + 2] == '*':
                if line[i + 1:i + 2] == '*':             # '**' toggles once, at its first star
                    emph = not emph
            else:
                emph = not emph
        elif ch == ' ' and not code and not emph:
            out.append(i)
    return out


def _split(line):
    indent = '  ' if line.startswith(('* ', '  ')) else ''
    parts, rest = [], line
    while len(rest) > LIMIT:
        cands = [i for i in _safe_breaks(rest) if i <= WIDTH and i > len(indent) + 20]
        if not cands:
            break
        k = cands[-1]
        parts.append(rest[:k])
        rest = indent + rest[k + 1:]
    parts.append(rest)
    return '\n'.join(parts)


def _edits():
    orig = set(open(os.path.join(HERE, 'V07.orig.md'), encoding='utf-8').read().split('\n'))
    text = _text_after_c()
    out, fence = [], False
    for l in text.split('\n'):
        if l.strip().startswith('```'):
            fence = not fence
            continue
        if fence or l.startswith('|') or l in orig or len(l) <= LIMIT:
            continue
        new = _split(l)
        if new != l and text.count(l + '\n') == 1:
            out.append(('layout', l + '\n', new + '\n', 1))
    return out


EDITS = _edits()
