# edits_e — §14 (VAL-R1-01, VM-R0S-17, VV12-r1-09, R2-40 (2), item 120's live layers, V08's PortNote hand-off),
# the Staged section (item 125) and Appendix A (VCS-r1-01) (scope r2)
B = '/home/user/maps-architecture/docs/ARCHITECTURE.md'
S14 = '## §14 Package and module layout, key interfaces, dependency rules, extension points'
STG = "# Staged by the owner's roadmap (this document defers nothing)"
APA = '# Appendix A — reading record, and CONFIRMED versus PLAUSIBLE'


def register(E):
    a = lambda old, new, tag, n=1: E.add(B, S14, old, new, n, tag)
    # VV12-r1-09 + V01 r2's item-122 services (V01 §8.3): @plat/hood's services
    a("the DistrictContext and DistrictSignature builders, the\n"
      "               services catchmentOf / districtsAbove / fabricSignature, the WhyProviders and the hood.fabric epoch participant\n"
      "               [built at M5; the interfaces live in @plat/layout and @plat/model]",
      "the DistrictContext and DistrictSignature builders, the\n"
      "               services catchmentOf / districtsAbove / fabricSignature / skyDistrictCount / findAreas / gapUnits /\n"
      "               disasterSource with disasterDistricts / campLand and the writer plantRimWalk (V01 §3.16, V01 §5.4), the\n"
      "               WhyProviders and the hood.fabric epoch participant [built at M5 — where `campLand`, which item 122's camp\n"
      "               placement reads, lands first at M3b, it creates the package with that one service (V01 §8.1); the interfaces\n"
      "               live in @plat/layout and @plat/model]", 'VV12-r1-09 / V01 §8.3')
    # VAL-R1-01: the underground stages in V04 §3.1's order
    a("/* II.7.4–II.7.6: registered after the network stage by declared I/O — the systems, II.7.3's sewer-front neighbourhoods, the access pass, the undercity, then the connection stage —",
      "/* II.7.4–II.7.6: registered after the network stage by declared I/O in V04 §3.1's order — the systems, the access pass (U-ACCESS), II.7.3's sewer-front neighbourhoods (U-FRONT), the undercity, then the connection stage —",
      'VAL-R1-01')
    # VM-R0S-17: FabricStrategyId is §2.5's
    a("FabricStrategyId is a row key of hood.templates (V01 §2.1)",
      "FabricStrategyId is §2.5's: the id of a registered fabric — `bent-cut`, a hood.templates row (V01 §2.2) or V07's `village-ways`",
      'VM-R0S-17')
    # R2-40 (2), V08 r2: the realm block retires with HostContext.realm
    a("`MapHost`, `MapSession`, `MapStore`, `MapRecord`, `hashDossier`,\n               `realmBlockFrom`, the status texts;",
      "`MapHost`, `MapSession`, `MapStore`, `MapRecord`, `hashDossier`,\n               the status texts;", 'R2-40 (2) realmBlockFrom')
    a("|'duplicate_key'|'state_matches_absorbed'|'realm_block_used'\n",
      "|'duplicate_key'|'state_matches_absorbed'\n", 'R2-40 (2) realm_block_used')
    a("|'frozen_fact_changed'|'history_gap';\n",
      "|'frozen_fact_changed'|'history_gap'|'field_fallback' /* item 125 (b): a field the port reads that the dossier lacks or leaves empty, its fallback taken (V08 §2.4) */;\n",
      'V08 hand-off field_fallback (item 125)')
    a("interface HostContext {   // every field optional: used when present, never required (item 20 (h) (iv))\n"
      "  week?: number /* the campaign's elapsed weeks at delivery: §4.11's last dating rung */; realm?: RealmBlock;\n"
      "  audience?: { role: 'owner'|'editor'|'viewer'; knowledge?: 'public'|'local'|'secret' } /* set by the host glue's audience table, below */;\n"
      "  displayNames?: Record<string /* binding key */, string> /* applied inside ONE export request, never stored (item 85) */;\n"
      "  line?: string /* the SettlementForge line the host runs: picks the adapter, or E_LINE_UNSUPPORTED */;\n"
      "  customLibrary?: CustomLibraryEntry[] /* the author's library definition fields when SettlementForge supplies them (V08 §2.8; item 20 (h) (iv)) */ }\n"
      "interface RealmBlock {   // optional realm data (item 77), computed by the host glue (the host client's realmBlockFrom, V08 §3.11) from the campaign's placements, realm scale,\n"
      "                         // latitude scale and frozen spatial digest; it carries only bearings, distances, cell words and a latitude (§7.7 item 1)\n"
      "  partners?: { key: string /* the partner's binding key */; bearingCdeg: Cdeg; distanceM?: M; weight?: number }[];\n"
      "  cell?: { terrain?: string; river?: boolean; coast?: { sideCdeg: Cdeg }; latDeg?: number /* degrees north */ };\n"
      "  gates?: { toward: string /* a partner's key */; bearingCdeg: Cdeg }[] }\n",
      "interface HostContext {   // every field optional (item 20 (h) (iv)) and none a data input — the dossier is the port's only one (item 125 (a)); none changes a document a dossier makes (T125-2)\n"
      "  audience?: { role: 'owner'|'editor'|'viewer'; knowledge?: 'public'|'local'|'secret' } /* the role and knowledge key the host sets per viewer by the host glue's audience table, below — view state that travels (§11.3; J-A30.82) */;\n"
      "  displayNames?: Record<string /* binding key */, string> /* applied inside ONE export request, never stored (item 85) */;\n"
      "  line?: string /* the SettlementForge line the host runs: picks the adapter (V08 §2.4); absent, the dossier's own version stamps pick it; a line no adapter supports, or one the stamps contradict: E_LINE_UNSUPPORTED */ }\n",
      'R2-40 (2) HostContext; RealmBlock retired')
    a("dates each by §4.11's rungs (`HostContext.week` the last; an undated change applies finished, noted\n   `unreceipted_change`),",
      "dates each by §4.11 *The clock* (2)'s rungs (a tick on the change's receipt, then its outcome id's week suffix; an\n"
      "   undated change applies finished, noted `unreceipted_change`),", 'R2-40 (1) item 4')
    a("5. **`HostContext`** is optional in every field (item 20 (h) (iv)): `week` the last dating rung; `realm` the realm\n"
      "   block, whose true bearings turn the map's north first and move gates only for the residual (§7.7 layer 2; noted\n"
      "   `realm_block_used`); `audience` set by the table below; `displayNames` — dossier key → text — applied inside ONE\n"
      "   export request and never stored, the document keeping the dossier's names (item 85 (b); J-A85.02); `line` choosing\n"
      "   the adapter; `customLibrary` the author's library definition fields (V08 §2.8).",
      "5. **`HostContext`** is optional in every field (item 20 (h) (iv)) and carries no data input: the dossier is the port's\n"
      "   only one (item 125 (a); J139), and none of the three fields changes a document a dossier makes (T125-2). `audience`\n"
      "   is the role and knowledge key the host sets per viewer by the table below — view state that travels (§11.3;\n"
      "   J-A30.82); `displayNames` — dossier key → text — are applied inside ONE export request and never stored, the document\n"
      "   keeping the dossier's names (item 85 (b); J-A85.02); `line` picks the adapter (V08 §2.4) — with no host context the\n"
      "   dossier's own version stamps pick it, and a `line` no adapter supports, or one the stamps contradict, refuses with\n"
      "   `E_LINE_UNSUPPORTED`. The week, the realm and a custom library are never host inputs: the week is the dossier's\n"
      "   latest stamped tick (§4.11 *The clock* (1)), a realm fact the generator's default or the user's setting (§7.7's DR1,\n"
      "   DR3, DR19, DR29), and a custom definition reaches the map only from the dossier's own `customContentRoster` and\n"
      "   `customContentProvenance` entries (§7.7 item 1; V08 §2.8).", 'R2-40 (2) item 5')
    # item 120 (i): live.coverage replaced by V09's live.find; item 122's live.crises
    a("providers (`live.shade`, and `live.links`, `live.coverage` and `live.voids`, the last two reading volume 1's\n"
      "`catchmentOf` and `districtsAbove`), `live.history` volume 6's at M6-E",
      "providers (`live.shade`, `live.links` and `live.voids`, the last reading volume 1's `districtsAbove`, and the base\n"
      "layers `live.festival` and `live.crises`, the latter reading volume 1's `campLand` and `disasterDistricts`), volume 9's\n"
      "`live.find` at M5 — Find's marks and Show gaps, the Coverage view's one successor, reading §11.2's match listing and\n"
      "volume 1's `findAreas`, `gapUnits` and `catchmentOf` (item 120 (i)) —, `live.history` volume 6's at M6-E",
      'item 120 (i) / R2-37 live layers')

    # ---- the Staged section: the realm block retired (item 125) ----
    E.add(B, STG, "Built with the connection: the wiring to a live host bridge; the realm block's supply (item 77); the audience",
          "Built with the connection: the wiring to a live host bridge; the audience", 1, 'R2-40 (2) Staged')

    # ---- Appendix A: VCS-r1-01 (subset lists brought to item 126, R2-07) ----
    E.add(B, APA, "The SettlementForge facts of items 73–88, 102–113, 117 and 118 (the calendar and `traditions`) are CONFIRMED",
          "The SettlementForge facts of items 73–88, 102–113, 117, 118 and 122 (the calendar, `traditions`, the stressors and\nconditions) are CONFIRMED", 1, 'VCS-r1-01 App. A (1)')
    E.add(B, APA, "The owner rules (items 1–31, 63–72, 20 (h), 101–111, 113–119) and the program rule",
          "The owner rules (items 1–31, 63–72, 20 (h), 101–111, 113–126) and the program rule", 1, 'VCS-r1-01 App. A (2)')
