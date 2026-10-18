#!/usr/bin/env python3
"""Archive watabou's itch.io devlogs (the long-form write-ups the Patreon posts link to).

Sources: (a) every itch.io devlog link found in research/patreon/**/post.md, (b) the full devlog index
of each generator page. Output: research/devlogs/<game>/<id>-<slug>/{post.md, images/*}, index.json

  python3 tools/devlog_scrape.py                 # every game in GAMES, devlogs only (the original behaviour)
  python3 tools/devlog_scrape.py fantasy-manor   # only the named games (and only Patreon links to them), plus the
                                                 # game page -> _page.md + _page-images/ and the comments page -> _comments.md
<game> is the itch slug unless OUTDIR maps it (fantasy-manor -> research/devlogs/manor/). index.json is merged by url.
"""
import json, os, re, sys, time, html, glob, urllib.request, urllib.parse

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(BASE, "research", "devlogs")
UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) "
      "Chrome/126.0.0.0 Safari/537.36")
GAMES = ["medieval-fantasy-city-generator", "village-generator", "neighbourhood", "fantasy-manor"]
OUTDIR = {"fantasy-manor": "manor"}  # itch slug -> research/devlogs/<dir> where the two differ


def get(url, binary=False):
    for i in range(3):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=60) as r:
                b = r.read()
            time.sleep(0.5)
            return b if binary else b.decode("utf-8", "replace")
        except Exception as e:  # noqa
            err = e
            time.sleep(2 + 2 * i)
    print(f"  !! {url}: {err}", file=sys.stderr)
    return None


def to_text(h, images):
    h = re.sub(r"<(script|style)[^>]*>.*?</\1>", "", h, flags=re.S)

    def img(m):
        src = re.search(r'src="([^"]+)"', m.group(0))
        if src:
            images.append(html.unescape(src.group(1)))
            return f"\n![IMAGE #{len(images)}]\n"
        return ""
    h = re.sub(r"<img[^>]*>", img, h)
    h = re.sub(r'<a[^>]+href="([^"]+)"[^>]*>(.*?)</a>', lambda m: f"[{re.sub('<[^>]+>', '', m.group(2))}]({html.unescape(m.group(1))})", h, flags=re.S)
    h = re.sub(r"<h(\d)[^>]*>", lambda m: "\n" + "#" * int(m.group(1)) + " ", h)
    h = re.sub(r"<li[^>]*>", "\n- ", h)
    h = re.sub(r"<(pre|code)[^>]*>", "`", h)
    h = re.sub(r"</(pre|code)>", "`", h)
    h = re.sub(r"</(p|div|h\d|ul|ol|blockquote|tr)>|<br\s*/?>", "\n", h)
    h = re.sub(r"<[^>]+>", "", h)
    return re.sub(r"\n{3,}", "\n\n", html.unescape(h)).strip()


def save_images(urls, d, sub="images"):
    """Download urls to <d>/<sub>/NN.ext (cached); return the local paths relative to d."""
    saved = []
    for i, u in enumerate(urls, 1):
        if u.startswith("//"):
            u = "https:" + u
        ext = os.path.splitext(urllib.parse.urlparse(u).path)[1].lower()
        ext = ext if ext in (".png", ".jpg", ".jpeg", ".gif", ".webp") else ".png"
        fp = os.path.join(d, sub, f"{i:02d}{ext}")
        if not os.path.exists(fp):
            b = get(u, binary=True)
            if b:
                os.makedirs(os.path.dirname(fp), exist_ok=True)
                open(fp, "wb").write(b)
        if os.path.exists(fp):
            saved.append(os.path.relpath(fp, d))
    return saved


def parse_comments(page, images=None):
    """itch.io community posts (devlog page or game comments page), in page order, with reply depth.

    Depth = number of enclosing `community_post_replies` containers. Handles the current markup
    (`<div dir="auto" class="post_body ...">`, which the pre-2026-09-25 regex no longer matched)."""
    start = page.find('<div id="post-')
    if start < 0:
        return []
    stack, marks = [], []
    for t in re.finditer(r"<div\b([^>]*)>|</div>", page[start:]):
        if t.group(1) is None:
            if stack:
                stack.pop()
            continue
        cls = re.search(r'class="([^"]*)"', t.group(1))
        cls = cls.group(1).split() if cls else []
        stack.append("community_post_replies" in cls)
        if "community_post" in cls:
            marks.append((start + t.start(), sum(stack[:-1]), cls))
    posts = []
    for n, (pos, depth, cls) in enumerate(marks):
        seg = page[pos:marks[n + 1][0] if n + 1 < len(marks) else pos + 30000]
        pid = re.search(r'id="post-(\d+)"', seg)
        who = re.search(r'class="post_author"[^>]*>\s*<a[^>]*href="([^"]*)"[^>]*>(.*?)</a>', seg, re.S)
        date = re.search(r'<span[^>]*title="([^"]+)"[^>]*class="post_date"|<span[^>]*class="post_date"[^>]*title="([^"]+)"', seg)
        body = re.search(r'class="post_body[^"]*"[^>]*>(.*?)</div>\s*(?:<div class="post_footer|</div>)', seg, re.S)
        up, down = re.search(r'class="upvotes">\(\+(\d+)\)', seg), re.search(r'class="downvotes">\(-(\d+)\)', seg)
        text = to_text(body.group(1), images if images is not None else []) if body else ""
        posts.append({"id": pid.group(1) if pid else None, "depth": depth,
                      "author": to_text(who.group(2), []) if who else "(unknown)",
                      "creator": bool(who and who.group(1).rstrip("/").endswith("/watabou")),
                      "date": (date.group(1) or date.group(2)) if date else "?",
                      "votes": (f" (+{up.group(1)})" if up else "") + (f" (-{down.group(1)})" if down else ""),
                      "deleted": "is_deleted" in cls, "text": text or ("(deleted post)" if "is_deleted" in cls else "")})
    return posts


def render_comments(posts):
    lines = []
    for p in posts:
        pad = "    " * p["depth"]
        who = p["author"] + (" [CREATOR]" if p["creator"] else "") + p["votes"]
        lines.append(pad + f"- ({p['date'][:10]}) {who}: " + p["text"].replace("\n", "\n" + pad + "  "))
    return lines


def archive(url):
    m = re.match(r"https://watabou\.itch\.io/([^/]+)/devlog/(\d+)/([^/?#]+)", url)
    if not m:
        return None
    game, did, slug = m.groups()
    d = os.path.join(OUT, OUTDIR.get(game, game), f"{did}-{slug}")
    if os.path.exists(os.path.join(d, "post.md")):
        return {"url": url, "dir": d, "cached": True}
    page = get(url)
    if not page:
        return None
    os.makedirs(os.path.join(d, "images"), exist_ok=True)
    title = re.search(r"<h1[^>]*>(.*?)</h1>", page, re.S)
    h1 = page.find("<h1")
    date = re.search(r'<abbr[^>]*title="([^"]+)"', page[h1 if h1 > 0 else 0:])
    body = re.search(r'<section[^>]*class="[^"]*post_body[^"]*"[^>]*>(.*?)</section>', page, re.S)
    images = []
    text = to_text(body.group(1) if body else "", images)
    comments = render_comments(parse_comments(page))
    saved = save_images(images, d)
    md = [f"# {to_text(title.group(1), []) if title else slug}", "", f"- url: {url}", f"- game: {game}",
          f"- date: {date.group(1) if date else '?'}", "", "## Body", "", text or "(no body parsed)", "",
          "## Images (local files)", ""] + [f"- {s}" for s in saved] + ["", "## Comments", ""] + (comments or ["(none parsed)"])
    open(os.path.join(d, "post.md"), "w").write("\n".join(md))
    return {"url": url, "dir": d, "title": md[0][2:], "date": date.group(1) if date else None,
            "body_chars": len(text), "images": len(saved), "comments": len(comments)}


def archive_page(game, devlog_note):
    """The generator's own itch page (description, info table, screenshots, embed) -> _page.md + _page-images/,
    and its comments page (all pages) -> _comments.md + _comments-images/."""
    d = os.path.join(OUT, OUTDIR.get(game, game))
    url = f"https://watabou.itch.io/{game}"
    page = get(url)
    if not page:
        return None
    os.makedirs(d, exist_ok=True)
    stamp = time.strftime("%Y-%m-%d %H:%M UTC", time.gmtime())
    title = re.search(r'<h1[^>]*class="game_title"[^>]*>(.*?)</h1>', page, re.S)
    title = to_text(title.group(1), []) if title else game
    meta = re.search(r'<meta content="([^"]*)" name="description"', page)
    embed = re.search(r'data-width="(\d+)"[^>]*data-height="(\d+)"|data-height="(\d+)"[^>]*data-width="(\d+)"', page)
    frame = re.search(r'<iframe[^>]*src="(https://html[^"]+)"', page)
    desc = re.search(r'<div class="formatted_description user_formatted">(.*?)</div>\s*<div class="more_information_toggle', page, re.S)
    info = re.search(r'class="game_info_panel_widget[^"]*"><table>(.*?)</table>', page, re.S)
    images = []
    dtext = to_text(desc.group(1), images) if desc else "(description not found)"
    rows = [(to_text(k, []), re.sub(r"\s+", " ", to_text(v, []))) for k, v in re.findall(r"<tr><td>(.*?)</td><td>(.*?)</td></tr>", info.group(1) if info else "", re.S)]
    shots = [html.unescape(u) for u in re.findall(r'<a[^>]*data-image_lightbox[^>]*href="([^"]+)"', page)]
    cover = re.search(r'<meta content="([^"]+)" property="og:image"', page)
    first_shot = len(images) + 1
    images += shots + ([html.unescape(cover.group(1))] if cover else [])
    saved = save_images(images, d, "_page-images")
    size = f" ({embed.group(1) or embed.group(4)}x{embed.group(2) or embed.group(3)})" if embed else ""
    md = [f"# {title} — itch.io page", "", f"- url: {url}", f"- fetched: {stamp}",
          f"- meta description: {html.unescape(meta.group(1)) if meta else '?'}",
          f"- HTML5 build (iframe src): {frame.group(1) if frame else '?'}{size}",
          f"- devlog: {devlog_note}", "- comments: see _comments.md", "",
          "## Description (creator's text)", "", dtext, "", "## More information (itch info panel)", ""] + \
         [f"- {k}: {v}" for k, v in rows] + ["", "## Images (local files)", "",
          f"Order: description images first, then screenshots (#{first_shot}..{first_shot + len(shots) - 1}), then the cover (og:image) last.", ""] + \
         [f"- {s}  <- {images[i]}" for i, s in enumerate(saved)]
    open(os.path.join(d, "_page.md"), "w").write("\n".join(md) + "\n")

    posts, cimages, curl, seen = [], [], f"{url}/comments", set()
    while curl and curl not in seen:  # follows itch pagination if the page has any (rel="next" / next_page link)
        seen.add(curl)
        cp = get(curl)
        if not cp:
            break
        posts += parse_comments(cp, cimages)
        nxt = re.search(r'<a[^>]*(?:rel="next"|class="[^"]*next_page[^"]*")[^>]*href="([^"]+)"|<a[^>]*href="([^"]+)"[^>]*(?:rel="next"|class="[^"]*next_page)', cp)
        curl = html.unescape(nxt.group(1) or nxt.group(2)) if nxt else None
        if curl and curl.startswith("/"):
            curl = "https://watabou.itch.io" + curl
    csaved = save_images(cimages, d, "_comments-images")
    top = sum(1 for p in posts if p["depth"] == 0)
    md = [f"# {title} — itch.io comments", "", f"- url: {url}/comments", f"- fetched: {stamp}",
          f"- pages fetched: {len(seen)}", f"- posts: {len(posts)} (top-level {top}, replies {len(posts) - top}, "
          f"by the creator {sum(p['creator'] for p in posts)}, deleted {sum(p['deleted'] for p in posts)})", "",
          "## Comments (page order: newest thread first; replies indented under their parent; [CREATOR] = watabou)", ""] + \
         (render_comments(posts) or ["(none parsed)"]) + ["", "## Images in comments (local files)", ""] + \
         ([f"- {s}  <- {cimages[i]}" for i, s in enumerate(csaved)] or ["(none)"])
    open(os.path.join(d, "_comments.md"), "w").write("\n".join(md) + "\n")
    return {"game": game, "dir": d, "page_images": len(saved), "comments": len(posts), "creator_comments": sum(p["creator"] for p in posts)}


def main():
    only = [a for a in sys.argv[1:] if not a.startswith("-")]
    games = only or GAMES
    pat = re.compile(r"https://watabou\.itch\.io/(%s)/devlog/" % "|".join(map(re.escape, games)))
    urls = set()
    for f in glob.glob(os.path.join(BASE, "research", "patreon", "*", "*", "post.md")):
        for u in re.findall(r"https://watabou\.itch\.io/[^/\s)]+/devlog/\d+/[^\s)?#]+", open(f).read()):
            if not only or pat.match(u):
                urls.add(u)
    print(f"{len(urls)} devlog links found in Patreon posts", flush=True)
    notes = {}
    for g in games:
        idx = get(f"https://watabou.itch.io/{g}/devlog")
        found = set(re.findall(rf'https://watabou\.itch\.io/{g}/devlog/\d+/[^"\s?#]+', idx or ""))
        notes[g] = (f"{len(found)} posts on https://watabou.itch.io/{g}/devlog" if idx is not None else
                    f"none — https://watabou.itch.io/{g}/devlog could not be fetched (an HTTP 404 means the page has no devlog)")
        print(f"{g}: {len(found)} devlogs on index page", flush=True)
        urls |= found
    rows = []
    for u in sorted(urls):
        r = archive(u)
        if r:
            rows.append(r)
            print(f"  {r.get('date')} body={r.get('body_chars')} img={r.get('images')} :: {r.get('title') or u}", flush=True)
    for g in only:
        r = archive_page(g, notes[g])
        print(f"  page {g}: {r}", flush=True)
    os.makedirs(OUT, exist_ok=True)
    fp = os.path.join(OUT, "index.json")
    by_url = {r["url"]: r for r in (json.load(open(fp)) if os.path.exists(fp) else [])}
    for r in rows:  # merge: a cached re-run keeps the richer row already on file
        if not (r.get("cached") and r["url"] in by_url):
            by_url[r["url"]] = r
    json.dump(list(by_url.values()), open(fp, "w"), indent=1)


if __name__ == "__main__":
    main()
