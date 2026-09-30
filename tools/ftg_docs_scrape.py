#!/usr/bin/env python3
"""Archive the public Fantasy Town Generator user guide (docs.fantasytowngenerator.com) as text + images.
Output: research/ftg-docs/<path>.md, research/ftg-docs/images/*, research/ftg-docs/index.json"""
import json, os, re, sys, time, html, hashlib, urllib.request, urllib.parse
from collections import deque

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(BASE, "research", "ftg-docs")
HOST = "docs.fantasytowngenerator.com"
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"


def get(url, binary=False):
    for i in range(3):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=60) as r:
                b = r.read()
            time.sleep(0.3)
            return b if binary else b.decode("utf-8", "replace")
        except Exception as e:  # noqa
            err = e
            time.sleep(1 + 2 * i)
    print(f"  !! {url}: {err}", file=sys.stderr)
    return None


def to_text(h, images, base):
    h = re.sub(r"<(script|style|nav|footer|header|aside)[^>]*>.*?</\1>", "", h, flags=re.S)

    def img(m):
        src = re.search(r'src="([^"]+)"', m.group(0))
        alt = re.search(r'alt="([^"]*)"', m.group(0))
        if src and not src.group(1).startswith("data:"):
            images.append(urllib.parse.urljoin(base, html.unescape(src.group(1))))
            return f"\n![IMAGE #{len(images)} {alt.group(1) if alt else ''}]\n"
        return ""
    h = re.sub(r"<img[^>]*>", img, h)
    h = re.sub(r"<h(\d)[^>]*>", lambda m: "\n" + "#" * int(m.group(1)) + " ", h)
    h = re.sub(r"<li[^>]*>", "\n- ", h)
    h = re.sub(r"<t[dh][^>]*>", " | ", h)
    h = re.sub(r"</(p|div|h\d|ul|ol|blockquote|tr|table|section)>|<br\s*/?>", "\n", h)
    h = re.sub(r"<[^>]+>", "", h)
    return re.sub(r"\n\s*\n\s*\n+", "\n\n", html.unescape(h)).strip()


def main():
    os.makedirs(os.path.join(OUT, "images"), exist_ok=True)
    seen, q, rows = set(), deque([f"https://{HOST}/"]), []
    sm = get(f"https://{HOST}/sitemap.xml")
    if sm:
        for u in re.findall(r"<loc>([^<]+)</loc>", sm):
            q.append(u.strip())
    while q:
        url = q.popleft().split("#")[0]
        p = urllib.parse.urlparse(url)
        key = p.path.rstrip("/") or "/"
        if p.netloc != HOST or key in seen or re.search(r"\.(png|jpe?g|gif|svg|webp|css|js|ico|xml|json|pdf|zip)$", p.path, re.I):
            continue
        seen.add(key)
        page = get(url)
        if not page:
            continue
        for href in re.findall(r'href="([^"#]+)', page):
            q.append(urllib.parse.urljoin(url, html.unescape(href)))
        main_html = re.search(r"<(main|article)[^>]*>(.*)</\1>", page, re.S)
        images = []
        text = to_text(main_html.group(2) if main_html else page, images, url)
        title = re.search(r"<title>(.*?)</title>", page, re.S)
        saved = []
        for u in images:
            ext = os.path.splitext(urllib.parse.urlparse(u).path)[1].lower()
            if ext not in (".png", ".jpg", ".jpeg", ".gif", ".webp"):
                continue
            fn = hashlib.sha1(u.encode()).hexdigest()[:10] + ext
            fp = os.path.join(OUT, "images", fn)
            if not os.path.exists(fp):
                b = get(u, binary=True)
                if b:
                    open(fp, "wb").write(b)
            if os.path.exists(fp):
                saved.append(f"images/{fn}")
        name = (key.strip("/").replace("/", "__") or "index") + ".md"
        body = [f"# {html.unescape(title.group(1)).strip() if title else key}", "", f"- url: {url}", "", text, "", "## Images (local files, in order of appearance)", ""] + [f"- {s}" for s in saved]
        open(os.path.join(OUT, name), "w").write("\n".join(body))
        rows.append({"url": url, "file": name, "chars": len(text), "images": len(saved)})
        print(f"  {len(text):6d} chars {len(saved):2d} img  {key}", flush=True)
    json.dump(rows, open(os.path.join(OUT, "index.json"), "w"), indent=1)
    print(f"{len(rows)} pages")


if __name__ == "__main__":
    main()
