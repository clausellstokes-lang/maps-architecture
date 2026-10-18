#!/usr/bin/env python3
"""Schema-less Protocol Buffers inspector (like `protoc --decode_raw`, plus a structural summary).

  python3 tools/pb_raw.py <file.bin> [--out summary.md] [--json tree.json] [--depth 7]

For every field PATH (e.g. 3.2.1) it reports: occurrences, wire type, how the payload was interpreted
(message / string / packed float32 / packed float64 / packed varint / bytes) and sample values. Field NAMES are
not recoverable from the wire format; paths are field numbers.
"""
import json, struct, sys, collections


def varint(b, i):
    r = s = 0
    while True:
        c = b[i]; i += 1
        r |= (c & 0x7F) << s
        if not c & 0x80:
            return r, i
        s += 7
        if s > 70:
            raise ValueError("varint too long")


def parse(b):
    i, out = 0, []
    while i < len(b):
        key, i = varint(b, i)
        fn, wt = key >> 3, key & 7
        if fn == 0 or fn > 536870911:
            raise ValueError("bad field number")
        if wt == 0:
            v, i = varint(b, i)
        elif wt == 1:
            v = b[i:i + 8]; i += 8
            if len(v) < 8: raise ValueError("short fixed64")
        elif wt == 2:
            n, i = varint(b, i)
            v = b[i:i + n]; i += n
            if len(v) < n: raise ValueError("short bytes")
        elif wt == 5:
            v = b[i:i + 4]; i += 4
            if len(v) < 4: raise ValueError("short fixed32")
        else:
            raise ValueError(f"unsupported wire type {wt}")
        out.append((fn, wt, v))
    return out


def printable(b):
    try:
        s = b.decode("utf-8")
    except UnicodeDecodeError:
        return None
    return s if s and all(c.isprintable() or c in "\n\t" for c in s) else None


def sane_floats(vals):
    ok = [v for v in vals if v == v and (v == 0 or 1e-6 < abs(v) < 1e9)]
    return len(ok) >= 0.95 * len(vals)


def classify(v):
    """length-delimited payload → (kind, value)"""
    if len(v) == 0:
        return "empty", None
    s = printable(v)
    try:
        sub = parse(v)
        nums = [f for f, _, _ in sub]
        if sub and max(nums) < 2000 and not (s and len(s) > 3 and s.replace(" ", "").isalnum()):
            return "message", sub
    except Exception:
        pass
    if s is not None:
        return "string", s
    if len(v) % 4 == 0:
        f = struct.unpack(f"<{len(v)//4}f", v)
        if sane_floats(f):
            return "packed_f32", f
    if len(v) % 8 == 0:
        d = struct.unpack(f"<{len(v)//8}d", v)
        if sane_floats(d):
            return "packed_f64", d
    try:
        i, vs = 0, []
        while i < len(v):
            x, i = varint(v, i); vs.append(x)
        return "packed_varint", vs
    except Exception:
        return "bytes", v


class Stat:
    def __init__(self):
        self.n = 0; self.kinds = collections.Counter(); self.samples = []; self.lens = []; self.min = None; self.max = None

    def add(self, kind, val):
        self.n += 1; self.kinds[kind] += 1
        if kind in ("varint", "f32", "f64"):
            self.min = val if self.min is None else min(self.min, val); self.max = val if self.max is None else max(self.max, val)
        if kind.startswith("packed"):
            self.lens.append(len(val))
            if val:
                lo, hi = min(val), max(val)
                self.min = lo if self.min is None else min(self.min, lo); self.max = hi if self.max is None else max(self.max, hi)
        if len(self.samples) < 6 and kind != "message":
            sv = val
            if isinstance(val, (tuple, list)): sv = [round(x, 3) if isinstance(x, float) else x for x in val[:8]]
            if isinstance(val, bytes): sv = val[:16].hex()
            if isinstance(val, float): sv = round(val, 4)
            if isinstance(val, str): sv = val[:70]
            if sv not in self.samples: self.samples.append(sv)


def reinterpret(v, kind):
    """force a payload into the majority kind of its field path (packed varints often parse as tiny messages)"""
    try:
        if kind == "packed_varint":
            i, vs = 0, []
            while i < len(v):
                x, i = varint(v, i); vs.append(x)
            return vs
        if kind == "packed_f32" and len(v) % 4 == 0: return struct.unpack(f"<{len(v)//4}f", v)
        if kind == "packed_f64" and len(v) % 8 == 0: return struct.unpack(f"<{len(v)//8}d", v)
        if kind == "string": return v.decode("utf-8", "replace")
    except Exception:
        pass
    return None


def walk(fields, path, stats, depth, maxdepth):
    """`fields` = every occurrence of every field of ALL messages at this path, so kinds are decided by majority."""
    by_fn = collections.defaultdict(list)
    for fn, wt, v in fields:
        by_fn[fn].append((wt, v))
    for fn, occ in by_fn.items():
        p = f"{path}.{fn}" if path else str(fn)
        st = stats.setdefault(p, Stat())
        ld = [(wt, v) for wt, v in occ if wt == 2]
        for wt, v in occ:
            if wt == 0: st.add("varint", v)
            elif wt == 5: st.add("f32", struct.unpack("<f", v)[0])
            elif wt == 1: st.add("f64", struct.unpack("<d", v)[0])
        if not ld:
            continue
        cls = [classify(v) for _, v in ld]
        votes = collections.Counter(k for k, _ in cls if k != "empty")
        major = votes.most_common(1)[0][0] if votes else "empty"
        sub_all = []
        for (k, val), (_, v) in zip(cls, ld):
            if k == "empty": st.add("empty", None); continue
            if k != major:
                forced = reinterpret(v, major) if major != "message" else None
                if forced is not None: k, val = major, forced
            st.add(k, val)
            if k == "message": sub_all.extend(val)
        if sub_all and depth < maxdepth:
            walk(sub_all, p, stats, depth + 1, maxdepth)


def main():
    a = sys.argv[1:]
    f = a[0]; out = a[a.index("--out") + 1] if "--out" in a else None
    maxdepth = int(a[a.index("--depth") + 1]) if "--depth" in a else 7
    b = open(f, "rb").read()
    stats = {}
    walk(parse(b), "", stats, 0, maxdepth)
    lines = [f"# Raw protobuf structure of {f}", "", f"{len(b):,} bytes · {len(stats)} distinct field paths (field numbers; names are not on the wire)", "",
             "| path | count | kind(s) | min..max | packed len (min/med/max) | samples |", "|---|---|---|---|---|---|"]

    def key(p): return [int(x) for x in p.split(".")]
    for p in sorted(stats, key=key):
        s = stats[p]
        kinds = ", ".join(f"{k}×{n}" for k, n in s.kinds.most_common())
        rng = "" if s.min is None else f"{round(s.min, 3)}..{round(s.max, 3)}"
        pl = ""
        if s.lens:
            L = sorted(s.lens); pl = f"{L[0]}/{L[len(L)//2]}/{L[-1]}"
        lines.append(f"| {'&nbsp;&nbsp;' * p.count('.')}{p} | {s.n} | {kinds} | {rng} | {pl} | {json.dumps(s.samples, ensure_ascii=False)[:230]} |")
    txt = "\n".join(lines)
    if out:
        open(out, "w").write(txt); print(f"{len(stats)} paths → {out}")
    else:
        print(txt)


if __name__ == "__main__":
    main()
