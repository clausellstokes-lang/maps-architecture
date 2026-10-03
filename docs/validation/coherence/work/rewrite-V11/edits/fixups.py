"""Exact post-assembly fixes (retired terms, narration left in reused text); each must match its count."""
FIX = [
    ("`terrainType: mountain` → mountainous (DR1)", "`site.terrain` `mountain` → mountainous (DR1)", 1),
    ("as file g quotes them", "as item 108 quotes them", 1),
    ("struck by the decline pool at", "struck by the strike pool at", 2),
    ("over one hand-over at M4", "over one transfer at M4", 1),
    ("corpus entry the seam named", "corpus entry proposed", 1),
    ("(`raised.span`, the seam's alternative)", "(`raised.span`)", 1),
    ("no `fallbackClass` |", "its custom kinds read by item 104 (a)'s resolution |", 1),
    ("the lane that writes a row runs the compiler before it lands", "the seat that writes a row runs the compiler before its change lands", 1),
    ("in every lane that", "in every change that", 1),
    ("so every lane's no-op pin", "so every volume's no-op pin", 1),
    (" (a lane-events note of 07:20 handed this to V07's round-4 lane)", "", 1),
    ("V07's lane carries the V07 half (§8's preset paragraph)", "V07 §3.15 (3) states the V07 half", 1),
    ("as V12 §3.11's g lines do", "as V12 §3.11's owner-item lines do", 1),
    ("because g's \"stands in", "because item 109 (k)'s \"stands in", 1),
    ("every non-g table", "every other table", 1),
    ("(44 authored at first, plus `food-works`,", "(44 authored, plus `food-works`,", 1),
    ("T-V11-32 (g) holds it.", "T-V11-32 (h) holds it.", 1),
    ("V10 §2.10, §11.4 door 3)", "V10 §2.10; the base's §11.4 door 3)", 1),
    ("as declared rows do under §3.24.0 |", "as declared rows do under V11 §3.24.0 |", 1),
    ("cites the cell (§2.8c, §3.24.2, §3.24.7 (4))", "cites the cell (V11 §2.8c, §3.24.2, §3.24.7 (4))", 1),
    ("`building` block and §3.24.3's rows.", "`building` block and V11 §3.24.3's rows.", 1),
]
def apply(text):
    errs = []
    for old, new, c in FIX:
        n = text.count(old)
        if n != c:
            errs.append('FIX COUNT %d != %d: %s' % (n, c, old[:100])); continue
        text = text.replace(old, new)
    return text, errs
