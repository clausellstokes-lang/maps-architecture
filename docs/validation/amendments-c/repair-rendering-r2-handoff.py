# PENDING FABLE REVIEW — hand-off script of amendments-c/repair-rendering-r2 (opus stand-in). Stdlib only.
# The assembler hand-off of repair-rendering-r2, steps 2-5 of its report (one-string substitutions, each asserted to match
# exactly once). Run AFTER every repair-r2 block file is applied and AFTER the restated rows J-A68.83, J-A68.85 and
# J-A68.89 are swapped into the older rows' places (step 1). usage: python3 repair-rendering-r2-handoff.py DOC RATIONALE
import sys
doc, rat = sys.argv[1], sys.argv[2]
def once(path, old, new, where=None):
    t = open(path, encoding='utf-8').read()
    assert t.count(old) == 1, (path, t.count(old), old[:90])
    assert t.count(new) == 0 or new in old, (path, 'new already present', new[:90])
    open(path, 'w', encoding='utf-8').write(t.replace(old, new)); print('ok', path.split('/')[-1], old[:60])
# (2) J-A20.82 index row and Part A (V-MC1-09 = VD1-11 = VRC1-10)
once(doc, "every answer and every export mark each fact's tier by §2.8's marker (`dossier`, `declared`, `map`)",
          "every answer and every export mark each fact's tier by §2.8's `factTier` (`dossier`, `declared`, `map`)")
once(rat, "each fact's tier by §2.8's marker — `dossier`, `declared` or `map` —",
          "each fact's tier by §2.8's `factTier` — `dossier`, `declared` or `map` —")
# (3) J-A68.86 Part A (VRC1-16)
once(rat, "the FTG, NG and Fantasy Manor cells carry their builds and their readings' sections, their P-ids P22–P24, and no constant",
          "the FTG, NG and Fantasy Manor cells carry their builds and their P-ids P22–P24 (the readings' sections are `research/findings/code-impact.md` §(d)'s), and no constant")
# (4) II.7.3's shaft sentence (VRC1-03's pipeline note; pipeline owns II.7.3 — applied after pipeline's REPLACE of it)
once(doc, "every access that breaks the surface — is a light shaft for §8.4's lighting:",
          "every access that breaks the surface — is a light shaft for §8.4's lighting, a secret one lit only for a key under\nwhich it draws (§8.1 item 7):")
# (5) §13.4's light-pass fallback (scope's section; its "march" is now §8.4 (c)'s traversal)
once(doc, "  — the march unchanged — and is re-measured;", "  — the traversal unchanged — and is re-measured;")
