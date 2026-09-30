# fixall/draft-rendering-r2 helper for fixall_rendering_r2_palette.py: sRGB <-> CIELAB (D65) and CIEDE2000; our own code, stdlib only
import math
def _lin(c): return c/12.92 if c <= 0.04045 else ((c+0.055)/1.055)**2.4
def _gam(c): return 12.92*c if c <= 0.0031308 else 1.055*c**(1/2.4)-0.055
Xn, Yn, Zn = 0.95047, 1.0, 1.08883
def srgb2lab(h):
    h = h.lstrip('#'); r, g, b = [_lin(int(h[i:i+2], 16)/255) for i in (0, 2, 4)]
    X = 0.4124564*r+0.3575761*g+0.1804375*b; Y = 0.2126729*r+0.7151522*g+0.0721750*b; Z = 0.0193339*r+0.1191920*g+0.9503041*b
    f = lambda t: t**(1/3) if t > 216/24389 else (24389/27*t+16)/116
    fx, fy, fz = f(X/Xn), f(Y/Yn), f(Z/Zn)
    return (116*fy-16, 500*(fx-fy), 200*(fy-fz))
def lab2srgb_hex(lab):
    L, A, B = lab
    fy = (L+16)/116; fx = fy + A/500; fz = fy - B/200
    finv = lambda t: t**3 if t**3 > 216/24389 else (116*t-16)/(24389/27)
    X, Y, Z = finv(fx)*Xn, finv(fy)*Yn, finv(fz)*Zn
    r = 3.2404542*X-1.5371385*Y-0.4985314*Z; g = -0.9692660*X+1.8760108*Y+0.0415560*Z; b = 0.0556434*X-0.2040259*Y+1.0572252*Z
    cl = lambda c: max(0, min(255, round(_gam(max(0.0, min(1.0, c)))*255)))
    return '#%02X%02X%02X' % (cl(r), cl(g), cl(b))
def chroma(lab): return math.hypot(lab[1], lab[2])
def de2000(l1, l2):
    L1, a1, b1 = l1; L2, a2, b2 = l2
    C1 = math.hypot(a1, b1); C2 = math.hypot(a2, b2); Cb = (C1+C2)/2
    G = 0.5*(1-math.sqrt(Cb**7/(Cb**7+25**7)))
    a1p = (1+G)*a1; a2p = (1+G)*a2
    C1p = math.hypot(a1p, b1); C2p = math.hypot(a2p, b2)
    h1p = math.degrees(math.atan2(b1, a1p)) % 360; h2p = math.degrees(math.atan2(b2, a2p)) % 360
    dLp = L2-L1; dCp = C2p-C1p
    if C1p*C2p == 0: dhp = 0
    else:
        dhp = h2p-h1p
        if dhp > 180: dhp -= 360
        elif dhp < -180: dhp += 360
    dHp = 2*math.sqrt(C1p*C2p)*math.sin(math.radians(dhp/2))
    Lbp = (L1+L2)/2; Cbp = (C1p+C2p)/2
    if C1p*C2p == 0: hbp = h1p+h2p
    else:
        if abs(h1p-h2p) <= 180: hbp = (h1p+h2p)/2
        elif h1p+h2p < 360: hbp = (h1p+h2p+360)/2
        else: hbp = (h1p+h2p-360)/2
    T = 1-0.17*math.cos(math.radians(hbp-30))+0.24*math.cos(math.radians(2*hbp))+0.32*math.cos(math.radians(3*hbp+6))-0.20*math.cos(math.radians(4*hbp-63))
    dth = 30*math.exp(-((hbp-275)/25)**2)
    Rc = 2*math.sqrt(Cbp**7/(Cbp**7+25**7))
    Sl = 1+0.015*(Lbp-50)**2/math.sqrt(20+(Lbp-50)**2); Sc = 1+0.045*Cbp; Sh = 1+0.015*Cbp*T
    Rt = -math.sin(math.radians(2*dth))*Rc
    return math.sqrt((dLp/Sl)**2+(dCp/Sc)**2+(dHp/Sh)**2+Rt*(dCp/Sc)*(dHp/Sh))
