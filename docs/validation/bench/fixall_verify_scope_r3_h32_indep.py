# fixall_verify_scope_r3_h32_indep.py — independent MurmurHash3 x86_32 / x86_128 written by the verifier from the published algorithm (lane fixall/verify-scope-r3, 2026-09-25; stdlib only)
# PENDING FABLE REVIEW — Opus-produced (fixall/verify-scope-r3), not yet checked by a Fable seat; queued in docs/FABLE-REVIEW-QUEUE.md.
# independent MurmurHash3 x86_128 / x86_32 (public-domain algorithm), written by the verifier from the published description
M=0xffffffff
def rotl(x,r): return ((x<<r)|(x>>(32-r)))&M
def fmix(h):
    h^=h>>16; h=(h*0x85ebca6b)&M; h^=h>>13; h=(h*0xc2b2ae35)&M; h^=h>>16; return h
def x86_32(data,seed):
    h=seed; c1=0xcc9e2d51; c2=0x1b873593; n=len(data)//4
    for i in range(n):
        k=int.from_bytes(data[4*i:4*i+4],'little')
        k=(k*c1)&M; k=rotl(k,15); k=(k*c2)&M
        h^=k; h=rotl(h,13); h=(h*5+0xe6546b64)&M
    t=data[4*n:]; k=0
    for j in range(len(t)-1,-1,-1): k=(k<<8)|t[j]
    if t:
        k=(k*c1)&M; k=rotl(k,15); k=(k*c2)&M; h^=k
    h^=len(data); return fmix(h)
def x86_128(data,seed):
    h1=h2=h3=h4=seed
    c1,c2,c3,c4=0x239b961b,0xab0e9789,0x38b34ae5,0xa1e38b93
    n=len(data)//16
    for i in range(n):
        b=data[16*i:16*i+16]
        k1,k2,k3,k4=[int.from_bytes(b[4*j:4*j+4],'little') for j in range(4)]
        k1=(k1*c1)&M;k1=rotl(k1,15);k1=(k1*c2)&M;h1^=k1
        h1=rotl(h1,19);h1=(h1+h2)&M;h1=(h1*5+0x561ccd1b)&M
        k2=(k2*c2)&M;k2=rotl(k2,16);k2=(k2*c3)&M;h2^=k2
        h2=rotl(h2,17);h2=(h2+h3)&M;h2=(h2*5+0x0bcaa747)&M
        k3=(k3*c3)&M;k3=rotl(k3,17);k3=(k3*c4)&M;h3^=k3
        h3=rotl(h3,15);h3=(h3+h4)&M;h3=(h3*5+0x96cd1c35)&M
        k4=(k4*c4)&M;k4=rotl(k4,18);k4=(k4*c1)&M;h4^=k4
        h4=rotl(h4,13);h4=(h4+h1)&M;h4=(h4*5+0x32ac3b17)&M
    t=data[16*n:]; L=len(t)
    k1=k2=k3=k4=0
    def w(off,cnt):
        v=0
        for j in range(cnt-1,-1,-1): v=(v<<8)|t[off+j]
        return v
    if L>12: k4=w(12,L-12); k4=(k4*c4)&M;k4=rotl(k4,18);k4=(k4*c1)&M;h4^=k4
    if L>8: k3=w(8,min(4,L-8)); k3=(k3*c3)&M;k3=rotl(k3,17);k3=(k3*c4)&M;h3^=k3
    if L>4: k2=w(4,min(4,L-4)); k2=(k2*c2)&M;k2=rotl(k2,16);k2=(k2*c3)&M;h2^=k2
    if L>0: k1=w(0,min(4,L)); k1=(k1*c1)&M;k1=rotl(k1,15);k1=(k1*c2)&M;h1^=k1
    ln=len(data)
    h1^=ln;h2^=ln;h3^=ln;h4^=ln
    h1=(h1+h2+h3+h4)&M; h2=(h2+h1)&M; h3=(h3+h1)&M; h4=(h4+h1)&M
    h1=fmix(h1);h2=fmix(h2);h3=fmix(h3);h4=fmix(h4)
    h1=(h1+h2+h3+h4)&M; h2=(h2+h1)&M; h3=(h3+h1)&M; h4=(h4+h1)&M
    return (h1,h2,h3,h4)
def verif(fn,outbytes):
    key=bytearray(); hashes=bytearray()
    for i in range(256):
        r=fn(bytes(key),256-i)
        if isinstance(r,tuple): hashes+=b''.join(x.to_bytes(4,'little') for x in r)
        else: hashes+=r.to_bytes(4,'little')
        key.append(i)
    f=fn(bytes(hashes),0)
    first=f[0] if isinstance(f,tuple) else f
    return first
print('verif x86_32  = 0x%08X (published 0xB0F57EE3)'%verif(x86_32,4))
print('verif x86_128 = 0x%08X (published 0xB3ECE62A)'%verif(x86_128,16))
H32=lambda s: x86_128(s.encode('utf-8'),0)[0]
for s in ['d5/M1/TOWN/none/0','d5/M1/TOWN/coast+river/4']:
    print(s,H32(s))
s='d5-mfcg/M1/TOWN/none/0'; print(s,H32(s),'->',1+(H32(s)%2147483646))
