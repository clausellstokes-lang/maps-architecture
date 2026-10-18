# usage: python3 fixall_scope_r3_h32.py   (lane fixall/draft-scope-r3, 2026-09-25; stdlib only; own code)
# PENDING FABLE REVIEW — written by opus standing in for the Fable seat fixall/draft-scope-r3 (2026-09-25); queued in docs/FABLE-REVIEW-QUEUE.md.
# H32 of ARCHITECTURE §13.6 (2): H32(s) = the first 32-bit output word (h1) of MurmurHash3_x86_128 over the UTF-8 bytes
# of s with seed 0. MurmurHash3 is a published public-domain algorithm (Austin Appleby, SMHasher); this is our own port,
# checked against SMHasher's verification procedure (hash keys {}, {0}, {0,1}, … of lengths 0…255 with seed 256 − len,
# hash the concatenated outputs with seed 0, read the first four bytes little-endian). Prints the check vectors quoted
# in §13.6 (2).
M = 0xffffffff
rotl = lambda x, r: ((x << r) | (x >> (32 - r))) & M
def fmix32(h):
    h ^= h >> 16; h = (h * 0x85ebca6b) & M; h ^= h >> 13; h = (h * 0xc2b2ae35) & M; h ^= h >> 16; return h
def mmh3_x86_32(data, seed=0):
    c1, c2 = 0xcc9e2d51, 0x1b873593; h = seed & M; n = len(data); nb = n // 4
    for i in range(nb):
        k = int.from_bytes(data[4 * i:4 * i + 4], 'little')
        k = (k * c1) & M; k = rotl(k, 15); k = (k * c2) & M
        h ^= k; h = rotl(h, 13); h = (h * 5 + 0xe6546b64) & M
    t = data[4 * nb:]; k = 0
    if len(t) >= 3: k ^= t[2] << 16
    if len(t) >= 2: k ^= t[1] << 8
    if len(t) >= 1:
        k ^= t[0]; k = (k * c1) & M; k = rotl(k, 15); k = (k * c2) & M; h ^= k
    h ^= n; return fmix32(h)
def mmh3_x86_128(data, seed=0):
    c1, c2, c3, c4 = 0x239b961b, 0xab0e9789, 0x38b34ae5, 0xa1e38b93
    h1 = h2 = h3 = h4 = seed & M; n = len(data); nb = n // 16
    for i in range(nb):
        b = data[16 * i:16 * i + 16]
        k1, k2, k3, k4 = (int.from_bytes(b[j:j + 4], 'little') for j in (0, 4, 8, 12))
        k1 = (k1 * c1) & M; k1 = rotl(k1, 15); k1 = (k1 * c2) & M; h1 ^= k1
        h1 = rotl(h1, 19); h1 = (h1 + h2) & M; h1 = (h1 * 5 + 0x561ccd1b) & M
        k2 = (k2 * c2) & M; k2 = rotl(k2, 16); k2 = (k2 * c3) & M; h2 ^= k2
        h2 = rotl(h2, 17); h2 = (h2 + h3) & M; h2 = (h2 * 5 + 0x0bcaa747) & M
        k3 = (k3 * c3) & M; k3 = rotl(k3, 17); k3 = (k3 * c4) & M; h3 ^= k3
        h3 = rotl(h3, 15); h3 = (h3 + h4) & M; h3 = (h3 * 5 + 0x96cd1c35) & M
        k4 = (k4 * c4) & M; k4 = rotl(k4, 18); k4 = (k4 * c1) & M; h4 ^= k4
        h4 = rotl(h4, 13); h4 = (h4 + h1) & M; h4 = (h4 * 5 + 0x32ac3b17) & M
    t = data[16 * nb:]; L = len(t); k1 = k2 = k3 = k4 = 0
    for j in range(min(L, 16) - 1, 11, -1): k4 ^= t[j] << (8 * (j - 12))
    if L > 12: k4 = (k4 * c4) & M; k4 = rotl(k4, 18); k4 = (k4 * c1) & M; h4 ^= k4
    for j in range(min(L, 12) - 1, 7, -1): k3 ^= t[j] << (8 * (j - 8))
    if L > 8: k3 = (k3 * c3) & M; k3 = rotl(k3, 17); k3 = (k3 * c4) & M; h3 ^= k3
    for j in range(min(L, 8) - 1, 3, -1): k2 ^= t[j] << (8 * (j - 4))
    if L > 4: k2 = (k2 * c2) & M; k2 = rotl(k2, 16); k2 = (k2 * c3) & M; h2 ^= k2
    for j in range(min(L, 4) - 1, -1, -1): k1 ^= t[j] << (8 * j)
    if L > 0: k1 = (k1 * c1) & M; k1 = rotl(k1, 15); k1 = (k1 * c2) & M; h1 ^= k1
    h1 ^= n; h2 ^= n; h3 ^= n; h4 ^= n
    h1 = (h1 + h2 + h3 + h4) & M; h2 = (h2 + h1) & M; h3 = (h3 + h1) & M; h4 = (h4 + h1) & M
    h1, h2, h3, h4 = fmix32(h1), fmix32(h2), fmix32(h3), fmix32(h4)
    h1 = (h1 + h2 + h3 + h4) & M; h2 = (h2 + h1) & M; h3 = (h3 + h1) & M; h4 = (h4 + h1) & M
    return h1, h2, h3, h4
def verification(fn, nbytes):
    key = bytes(range(256)); out = b''
    for i in range(256):
        r = fn(key[:i], 256 - i)
        out += b''.join(x.to_bytes(4, 'little') for x in (r if isinstance(r, tuple) else (r,)))
    f = fn(out, 0); f = f if isinstance(f, tuple) else (f,)
    return f[0]
H32 = lambda s: mmh3_x86_128(s.encode('utf-8'), 0)[0]
if __name__ == '__main__':
    print(f"SMHasher verification MurmurHash3_x86_32  = 0x{verification(mmh3_x86_32, 4):08X} (published 0xB0F57EE3)")
    print(f"SMHasher verification MurmurHash3_x86_128 = 0x{verification(mmh3_x86_128, 16):08X} (published 0xB3ECE62A)")
    for s in ["", "d5/M1/TOWN/none/0", "d5/M1/TOWN/coast+river/4", "d5/M2b/METROPOLIS/none/2", "d5-mfcg/M1/TOWN/none/0"]:
        h = H32(s)
        print(f"H32({s!r}) = {h} (0x{h:08X})" + (f"; MFCG seed 1 + (H32 mod 2147483646) = {1 + h % 2147483646}" if s.startswith('d5-mfcg') else ''))
