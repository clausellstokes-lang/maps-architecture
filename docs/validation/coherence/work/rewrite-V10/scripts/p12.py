import sys; sys.path.insert(0,'scripts')
from ed import Ed
e=Ed('parts/12-s3-18-22.md')
e.R("""ends in a message and, at worst, a lost draft — never a partial change. Error classes are the SDK's typed ones (the
skill's error-code table).""","""ends in a message and, at worst, a lost draft — never a partial change. Error classes are the SDK's typed ones (its
documented error codes).""")
e.R("""a billing error → `noCredit` ("Your Anthropic account has no credit left");""","""a billing error → `noCredit` ("Your {provider} account has no credit left", V10 §3.16);""")
e.R("""never the map file or an image — to Anthropic (or to the service your host chose) to answer you.""",
"""never the map file or an image — to {provider} (the AI service this program's AI settings name, or the one your host
chose; `{provider}` read from the deployment's AI configuration, J121) to answer you.""")
e.save()
