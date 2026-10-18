# MurmurHash3 x86_128 (Appleby, public domain), written from the published algorithm; H32 = h1 of the digest, seed 0.
import sys
M=0xFFFFFFFF
def rotl(x,r): return ((x<<r)|(x>>(32-r)))&M
def fmix(h):
    h^=h>>16; h=(h*0x85ebca6b)&M; h^=h>>13; h=(h*0xc2b2ae35)&M; h^=h>>16; return h
def mm3_x86_128(data,seed=0):
    n=len(data); nb=n//16
    h1=h2=h3=h4=seed
    c1,c2,c3,c4=0x239b961b,0xab0e9789,0x38b34ae5,0xa1e38b93
    for i in range(nb):
        k1,k2,k3,k4=[int.from_bytes(data[i*16+4*j:i*16+4*j+4],'little') for j in range(4)]
        k1=(k1*c1)&M; k1=rotl(k1,15); k1=(k1*c2)&M; h1^=k1
        h1=rotl(h1,19); h1=(h1+h2)&M; h1=(h1*5+0x561ccd1b)&M
        k2=(k2*c2)&M; k2=rotl(k2,16); k2=(k2*c3)&M; h2^=k2
        h2=rotl(h2,17); h2=(h2+h3)&M; h2=(h2*5+0x0bcaa747)&M
        k3=(k3*c3)&M; k3=rotl(k3,17); k3=(k3*c4)&M; h3^=k3
        h3=rotl(h3,15); h3=(h3+h4)&M; h3=(h3*5+0x96cd1c35)&M
        k4=(k4*c4)&M; k4=rotl(k4,18); k4=(k4*c1)&M; h4^=k4
        h4=rotl(h4,13); h4=(h4+h1)&M; h4=(h4*5+0x32ac3b17)&M
    tail=data[nb*16:]; t=len(tail)
    k1=k2=k3=k4=0
    if t>=13:
        for j in range(t-1,11,-1): k4^=tail[j]<<(8*(j-12))
        k4=(k4*c4)&M; k4=rotl(k4,18); k4=(k4*c1)&M; h4^=k4
    if t>=9:
        for j in range(min(t,12)-1,7,-1): k3^=tail[j]<<(8*(j-8))
        k3=(k3*c3)&M; k3=rotl(k3,17); k3=(k3*c4)&M; h3^=k3
    if t>=5:
        for j in range(min(t,8)-1,3,-1): k2^=tail[j]<<(8*(j-4))
        k2=(k2*c2)&M; k2=rotl(k2,16); k2=(k2*c3)&M; h2^=k2
    if t>=1:
        for j in range(min(t,4)-1,-1,-1): k1^=tail[j]<<(8*j)
        k1=(k1*c1)&M; k1=rotl(k1,15); k1=(k1*c2)&M; h1^=k1
    h1^=n; h2^=n; h3^=n; h4^=n
    h1=(h1+h2+h3+h4)&M; h2=(h2+h1)&M; h3=(h3+h1)&M; h4=(h4+h1)&M
    h1=fmix(h1); h2=fmix(h2); h3=fmix(h3); h4=fmix(h4)
    h1=(h1+h2+h3+h4)&M; h2=(h2+h1)&M; h3=(h3+h1)&M; h4=(h4+h1)&M
    return h1,h2,h3,h4
def H32(s): return mm3_x86_128(s.encode('utf-8'))[0]
def verification():
    # SMHasher: hash keys {0}, {0,1}, ... {0..254} with seed 256-i, concat digests, hash that with seed 0, take first 4 bytes LE
    buf=b''
    for i in range(256):
        key=bytes(range(i))
        h=mm3_x86_128(key,256-i)
        buf+=b''.join(x.to_bytes(4,'little') for x in h)
    h=mm3_x86_128(buf,0)
    return h[0]
if __name__=='__main__':
    print('verification', hex(verification()))
    for s in sys.argv[1:]:
        v=H32(s); print(s, v, 'PM', 1+(v%2147483646))
