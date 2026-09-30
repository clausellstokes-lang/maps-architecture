import sys; sys.path.insert(0,'scripts')
from ed import Ed
e=Ed('parts/03-s2-1-5.md')
e.R("""### 2.3 The binding in practice — additions to `DossierBinding`, the carried facts and their hash

`DossierBinding`, `CarriedFacts` and the key law are §7.7 item 12's. This volume adds three fields and fixes the carried
shape and the history's retention (item 390):

```ts
// additions to §7.7's DossierBinding
  adapter: { line: string; version: string };   // the adapter whose digest wrote `carried` — read by V08 §3.8's remap and line steps and by select (V08 §2.4)
  quarantined: { key: string; reason: string; since: number /* the seq of the dossierFacts event that first carried it */ }[];   // V08 §3.9; rebuilt by folding dossierFacts events (V08 §3.6 (4))
  notes: PortNote[];   // the STANDING notes (V08 §4.6's class column) the last port run wrote — how the map reads the current dossier — in identity order;
                       // rebuilt by folding dossierFacts' notes and notesCleared (V08 §3.6 (4)); read by the report panel's dossier section and the next absorb
// the carried value per element kind: exactly the digest subset the diff compares (V08 §3.5), canonical field order
type CarriedFact =
  | { k: 'settlement'; name: string; tierWord: string; population: number }""",
"""### 2.3 The binding in practice — the carried facts and their hash

`DossierBinding` (with its `adapter`, `quarantined`, `notes` and `absorbed` fields; item 390), `CarriedFacts` and the key
law are §7.7 item 12's. Their readers here: `adapter` — V08 §3.8's remap and line steps and `select` (V08 §2.4);
`quarantined` — the diff's skip list (V08 §3.5, §3.9), rebuilt by folding the ledger events (V08 §3.6 (4)); `notes` —
the standing notes (V08 §4.6's class column) the last port run wrote, in identity order, rebuilt by the same fold and
read by the report panel's dossier section and the next absorb. This volume owns the carried shape and the history's
retention:

```ts
// the carried value per element kind: exactly the digest subset the diff compares (V08 §3.5), canonical field order
type CarriedFact =
  | { k: 'settlement'; name: string; tierWord: string; population: number; wealth: string /* wealth.label, the prosperity word (W-DOS-02) */ }
  | { k: 'site'; terrain: string; access: string; threat: string; magic: string; culture: string; isolation: string[] /* the digest's site words: creation's inputs, compared for the frozen-fact report only (V08 §3.5) */ }
  | { k: 'history'; digest: Hash128 /* H128 over the canonical CBOR of the digest's history block (V08 §2.6c) — creation's input, compared for the frozen-fact report only */ }""")
e.R("""  | { k: 'notable'; name: string; role: string; category: string; power?: string; institution?: string; importance?: string; status?: string; replaced?: string }""",
"""  | { k: 'notable'; name: string; role: string; category: string; power?: string; institution?: string; importance?: string /* read by the host projection's people order (V08 §5.4 (3)) */; status?: string; replaced?: string }""")
e.R("""own — `trade`, `port-values`, `deity`, `evidence` — and:""","""own — `trade`, `port-values`, `deity`, `evidence`, `site`, `history` — and:""")
e.save()
