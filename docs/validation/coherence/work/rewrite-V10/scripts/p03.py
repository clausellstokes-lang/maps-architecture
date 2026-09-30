import sys; sys.path.insert(0,'scripts')
from ed import Ed
e=Ed('parts/03-s2-1-9.md')
e.R("""records this volume adds to the base (the reader's answers, the oracle's sections, the placement order index) are
typed in V10 §2.13 and placed by the BCRs.""","""records this volume adds to the base (the reader's answers, the oracle's sections, the placement order index) are
typed in V10 §2.13 and carried by the base through the file f items of V10 §10.""")
e.R("""`@plat/testkit` imports it (the evaluation harness) and, only if spike S1 fails, `@plat/cli` imports it (`plat clerk`,
V10 §3.17). Two entry points:""","""`@plat/testkit` imports it (the evaluation harness) and, only if spike S1 fails, `@plat/cli` imports it (`plat clerk`,
V10 §3.17; §14's dependency rule). Two entry points:""")
e.R("""  chunk that the harness fetches on the first `send` after the clerk is switched on; the provider's SDK
  (`@anthropic-ai/sdk`) is imported in exactly one adapter file of it, `src/backend/anthropic.ts` (§14's one-adapter rule;
  its licence row, item 538).""","""  chunk that the harness fetches on the first `send` after the clerk is switched on; the provider's SDK — the one the
  deployment's AI configuration names (§17.4's row, J121; `@anthropic-ai/sdk` for `AnthropicBackend`) — is imported in
  exactly one adapter file of it, `src/backend/anthropic.ts` (§14's one-adapter rule; its licence row, item 538).""")
e.R("""  backend: 'anthropic'|'host-proxy'|'none';  // 'host-proxy' only while a host's clerk.config supplies a transport""",
    """  backend: 'anthropic'|'host-proxy'|'none';  // 'host-proxy' only while a host's clerk.config supplies a transport; which a deployment enables is its AI configuration's (J121)""")
e.R("""  promptTokens: number;                      // the last request's total prompt tokens (input + cache read + cache write)""",
    """  promptTokens: number;                      // the last request's total prompt tokens (input + cache read + cache write); read before the next request by V10 §3.2's closing rule against cache.segmentTokenLimit ('length')""")
e.R("""      label: string }                                // SR5-02 (a); J-V10.107""","""      label: string }                                // J-V10.107""")
e.R("""// @plat/clerk/core — the harness. V09 §2.10 declares ClerkSlot, ClerkMount (with its host channel) and ClerkHandle — every
// member the drawer and the settings call among them; this volume implements the handle and adds no member (XV-V9-18; J-V10.88).
declare function createClerk(mount: ClerkMount, opts?: { backend?: ClerkBackend /* tests: ReplayBackend */ }): ClerkHandle;
type ClerkHandle = ClerkHandle;             // this volume's name for its implementation; nothing more (J-V10.57 superseded)
```""","""// @plat/clerk/core — the harness. V09 §2.10 declares ClerkSlot, ClerkMount (with its host channel) and ClerkHandle — every
// member the drawer and the settings call among them; this volume implements the handle and adds no member (J-V10.88).
declare function createClerk(mount: ClerkMount, opts?: { backend?: ClerkBackend /* tests: ReplayBackend */ }): ClerkHandle;
```""")
e.R("""`propose`, clerk or none (J-V9.90) — no application-run `propose` reaches `run`, so T-V10-44's dispatch clauses hold unchanged (XV-V9-19 (a)) |""",
    """`propose`, clerk or none (J-V9.90) — no application-run `propose` reaches `run`, so T-V10-44's dispatch clauses hold unchanged |""")
e.R("""**The bridge, through the mount only** (XV-V9-18; J-V10.88).""","""**The bridge, through the mount only** (J-V10.88).""")
e.R("""read as `key: 'secret'` — listed and opened only for a `secret` session, a
version-2 one below `secret` included (J-SS2.5) — and exported as they were written.""","""read as `key: 'secret'` — listed and opened only for a `secret` session, a
version-2 one below `secret` included — and exported as they were written.""")
e.R("""type RefusalCategory = 'dossier'|'lock'|'role'|'knowledge'|'picture'|'scope'|'knownWork'|'model'|'budget'|'offline'|'rule'|'key'|'host';
interface ClerkRefusal { category: RefusalCategory; msg: MsgRef /* an engine refusal (the dossier row's engine cases, lock, rule): the dry run's MsgRef, V09 §4.9's refuse.* row for the code — refuse.roster.dossier for a roster line or place by a locus naming no element (V10 §3.16); role: refuse.viewer; otherwise the clerk.content refusal row's catalogue key with its slots */;""",
    """type RefusalCategory = 'dossier'|'lock'|'role'|'knowledge'|'picture'|'scope'|'knownWork'|'model'|'budget'|'offline'|'rule'|'key'|'host';
interface ClerkRefusal { category: RefusalCategory; msg: MsgRef /* an engine refusal or conflict (the dossier row's engine cases, lock, rule — each a row of §7.1's dry-run outcome table): the dry run's MsgRef, V09 §4.9's refuse.* row for the code — refuse.roster.dossier for a roster line or place by a locus naming no element (V10 §3.16); role: refuse.viewer; otherwise the clerk.content refusal row's catalogue key with its slots */;""")
e.save()
