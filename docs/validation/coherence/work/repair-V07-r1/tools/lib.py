import sys

class Doc:
    def __init__(self, text):
        self.t = text
        self.log = []

    def sub(self, old, new, n=1, tag=''):
        c = self.t.count(old)
        if c != n:
            raise SystemExit(f'COUNT {tag}: expected {n}, found {c}: {old[:120]!r}')
        self.t = self.t.replace(old, new)
        self.log.append((tag, n))

    def sub_after(self, anchor, old, new, tag=''):
        """Replace the first `old` after the unique `anchor`."""
        if self.t.count(anchor) != 1:
            raise SystemExit(f'ANCHOR {tag}: found {self.t.count(anchor)}: {anchor[:120]!r}')
        a = self.t.index(anchor)
        i = self.t.index(old, a)
        self.t = self.t[:i] + new + self.t[i + len(old):]
        self.log.append((tag, 1))

def _between(self, start, end, new, tag=''):
    """Replace the span from the unique `start` through the first `end` after it (both inclusive) by `new`."""
    if self.t.count(start) != 1:
        raise SystemExit(f'START {tag}: found {self.t.count(start)}: {start[:120]!r}')
    a = self.t.index(start)
    b = self.t.index(end, a) + len(end)
    old = self.t[a:b]
    self.t = self.t[:a] + new + self.t[b:]
    self.log.append((tag, 1))
    return old
Doc.between = _between
