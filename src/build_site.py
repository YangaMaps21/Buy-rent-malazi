"""Rebuild Buy|Rent|Malazi index.html from the original (truncated) upload.
Pipeline: backup -> static logo/mark (apply.py) -> animated logo -> polish (this file)."""
import re, json, hashlib, subprocess, shutil

import os
L = os.path.dirname(os.path.abspath(__file__)) + '/'
os.makedirs(L + '../preview', exist_ok=True)
SRC = L + 'original/index.html'
OUT = L + '../preview/index.html'

shutil.copy(SRC, OUT)
subprocess.run(['python3', L + 'apply.py', OUT, L + 'logo/'], check=True, capture_output=True)
s = open(OUT).read()

# ---------- animated logo ----------
A = json.load(open(L + 'anim.json'))
s, n1 = re.subn(r'<img src="data:image/svg\+xml;base64,[A-Za-z0-9+/=]+" alt="BUY \| RENT \| MALAZI — Tanzania">', lambda m: A['header'], s, count=1)
s, n2 = re.subn(r'<img class="footer-logo" src="data:image/svg\+xml;base64,[A-Za-z0-9+/=]+" alt="Buy Rent Malazi Tanzania">', lambda m: '<div class="footer-logo">' + A['footer'] + '</div>', s, count=1)
assert n1 == 1 and n2 == 1

# ---------- cut the truncated script ----------
s = s[:s.index('<script>')]

# ---------- dedupe images into a registry ----------
IMG = {}
def reg(b64):
    k = 'i' + hashlib.md5(b64.encode()).hexdigest()[:6]
    IMG[k] = b64
    return k
PIX = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
alt_key = {}
def sub_img(m):
    k = reg(m.group(1))
    return f'src="{PIX}" data-img="{k}"'
# remember which key each card id uses
for cid, b in re.findall(r'data-id="(a\d)"[^>]*>\s*<div class="card-photo-wrap"><img class="card-photo" src="data:image/webp;base64,([A-Za-z0-9+/=]+)"', s):
    alt_key[cid] = reg(b)
cta_key = reg(re.search(r'src="data:image/webp;base64,([A-Za-z0-9+/=]+)" alt="Contemporary tropical home"', s).group(1))
hero_key = reg(re.search(r'class="hero-image" src="data:image/webp;base64,([A-Za-z0-9+/=]+)"', s).group(1))
s = re.sub(r'src="data:image/webp;base64,([A-Za-z0-9+/=]+)"', sub_img, s)

photo_of = {'a1': 'pool-villa', 'a2': 'city-living-room', 'a3': 'beachfront-patio', 'a4': 'apartment-building',
            'a5': 'family-house', 'a6': 'garden-home', 'a7': 'bright-bedroom', 'a8': 'courtyard-pool'}
PHOTO = {photo_of[c]: alt_key[c] for c in photo_of}

# ---------- hero slideshow ----------
slides = [(hero_key, 'Modern tropical villa with a swimming pool'),
          (PHOTO['courtyard-pool'], 'Palm-lined courtyard pool'),
          (cta_key, 'Contemporary tropical family home'),
          (PHOTO['beachfront-patio'], 'Beachside patio under a thatched roof')]
slide_html = '<div class="hero-slides">' + ''.join(
    f'<img class="hero-slide{" is-active" if i == 0 else ""}" src="{PIX}" data-img="{k}" alt="{a}"{"" if i == 0 else " aria-hidden=\"true\""}>'
    for i, (k, a) in enumerate(slides)) + '</div>'
s, n = re.subn(r'<img class="hero-image" src="[^"]+" data-img="[^"]+" alt="[^"]*">', slide_html, s, count=1)
assert n == 1
dots = '<div class="hero-dots" role="tablist" aria-label="Featured photos">' + ''.join(
    f'<button type="button" class="hero-dot{" is-active" if i == 0 else ""}" aria-label="Show photo {i+1}" data-slide="{i}"></button>' for i in range(len(slides))) + '</div>'
s = s.replace('<div class="hero-mini"><b>●</b> Dar es Salaam first. Tanzania next.</div></div></section>',
              '<div class="hero-mini"><b>●</b> Dar es Salaam first. Tanzania next.</div></div>' + dots + '</section>', 1)

# hero copy: second phrase onto its own line, inside the faded area
s = s.replace('<p class="hero-copy">Discover beautiful homes to buy, properties to rent, and wonderful places to stay.</p>',
              '<p class="hero-copy">Discover beautiful homes to buy, <br>properties to rent, and wonderful places to stay.</p>', 1)

# ---------- icons ----------
def ico(body, cls='ico'):
    return f'<svg class="{cls}" viewBox="0 0 24 24" aria-hidden="true">{body}</svg>'
I = {
 'bed': ico('<path d="M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7M3 15h18M3 18v2M21 18v2M7 9V6.5A1.5 1.5 0 0 1 8.5 5h7A1.5 1.5 0 0 1 17 6.5V9"/>'),
 'bath': ico('<path d="M4 12h16v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-2ZM6 12V6a2 2 0 0 1 3.6-1.2M7 19l-1 2M17 19l1 2"/>'),
 'area': ico('<path d="M4 4h6M4 4v6M20 20h-6M20 20v-6M4 4l6.5 6.5M20 20l-6.5-6.5"/>'),
 'guests': ico('<circle cx="9" cy="8" r="3"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0M16 5.5a3 3 0 0 1 0 5.6M17.5 14a5 5 0 0 1 3 5"/>'),
 'pin': ico('<path d="M12 21s-6.5-5.4-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.6 12 21 12 21Z"/><circle cx="12" cy="10" r="2.3"/>'),
 'user': ico('<circle cx="12" cy="8" r="3.6"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/>'),
 'search': ico('<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>'),
 'menu': ico('<path d="M4 7h16M4 12h16M4 17h16"/>'),
 'arrow': ico('<path d="M5 12h14M13 6l6 6-6 6"/>', 'ico ico-arrow'),
 'upright': ico('<path d="M7 17 17 7M9 7h8v8"/>'),
 'discover': ico('<path d="M3 11.5 12 4l9 7.5M5.5 9.5V20h13V9.5"/><circle cx="12" cy="14" r="2.6"/><path d="m14 16 2 2"/>', 'ico ico-lg'),
 'chat': ico('<path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12Z"/><path d="M8.5 11h7M8.5 14h4.5"/>', 'ico ico-lg'),
}
s = re.sub(r'<span>▧ (\d+ guests)</span>', lambda m: f'<span>{I["guests"]}{m.group(1)}</span>', s)
s = s.replace('<span>▤ ', '<span>' + I['bed']).replace('<span>♧ ', '<span>' + I['bath']).replace('<span>▧ ', '<span>' + I['area'])
s = s.replace('<span class="pin-icon">⌖</span>', '<span class="pin-icon">' + I['pin'] + '</span>')
s = s.replace('<p>⌖ Dar es Salaam</p>', '<p class="agent-loc">' + I['pin'] + 'Dar es Salaam</p>')
s = s.replace('♙ &nbsp; Sign In', I['user'] + 'Sign In')
s = s.replace('⌕ &nbsp;Search', I['search'] + 'Search')
s = s.replace('aria-expanded="false">☰</button>', 'aria-expanded="false">' + I['menu'] + '</button>')
s = s.replace('<i>↗</i>', '<i>' + I['upright'] + '</i>')
s = s.replace('View details <span>→</span>', 'View details ' + I['arrow'])
s = re.sub(r' &nbsp;→</button>', ' ' + I['arrow'] + '</button>', s)
s = s.replace('List Property for Free &nbsp; →</button>', 'List Property for Free ' + I['arrow'] + '</button>')
s = s.replace('<div class="value-icon">⬡</div>', '<div class="value-icon">' + I['discover'] + '</div>')
s = s.replace('<div class="value-icon">◎</div>', '<div class="value-icon">' + I['chat'] + '</div>')
s = s.replace('saved favourites ♡</span>', 'saved favourites</span>')
s = s.replace('<span id="fav-count">0</span>', '<button type="button" class="fav-link" id="fav-link"><svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.6 5.6 0 0 0-7.9 0L12 5.5l-.9-.9a5.6 5.6 0 0 0-7.9 7.9L12 21l8.8-8.5a5.6 5.6 0 0 0 0-7.9Z"/></svg><span id="fav-count">0</span>')
s = s.replace('saved favourites</span>', 'saved</button></span>')

# popular areas become buttons
s = re.sub(r'<strong>(Masaki|Oyster Bay|Mikocheni)</strong>', r'<button type="button" class="hint-area" data-area="\1">\1</button>', s)

# Malazi explained (people may not know the word)
s = s.replace('<p>Short stays, easy escapes and beautiful places to unwind.</p>',
              '<p><em class="sw">Malazi</em> is Swahili for accommodation: short stays, easy escapes and beautiful places to unwind.</p>', 1)

# fonts (loads where the network allows; falls back cleanly in sandboxed previews)
s = s.replace('<title>', '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400..800&display=swap"><title>', 1)

import sys; sys.path.insert(0, L)
import extra_html
s = extra_html.transform(s, I)
CSS = A['css'] + open(L + 'polish.css').read() + open(L + 'pages.css').read() + open(L + 'live.css').read()
s = s.replace('</style>', CSS + '</style>', 1)

JS = open(L + 'site.js').read() + open(L + 'pages.js').read() + open(L + 'i18n.js').read()
data_js = ('const IMG=' + json.dumps({k: 'data:image/webp;base64,' + v for k, v in IMG.items()}) + ';\n'
           'const PHOTO=' + json.dumps(PHOTO) + ';\n')
all_demo = re.search(r"const allDemo=(\[.*?\]);", open(SRC).read(), re.S).group(1)
ICONS = 'const ICON=' + json.dumps({k: I[k] for k in ('bed', 'bath', 'area', 'guests', 'pin', 'arrow')}) + ';\n'
s += "<script>\n'use strict';\n" + data_js + 'const allDemo=' + all_demo + ';\n' + ICONS + JS + '\n</script>\n</body>\n</html>\n'
open(OUT, 'w').write(s)
print('ok', len(s), 'unique images', len(IMG))

# ================= LIVE BUILD (Vercel + Supabase) =================
import os, base64 as _b64
DIST = L + '../site'
os.makedirs(DIST + '/img', exist_ok=True)
key2name = {v: k for k, v in PHOTO.items()}
urls = {}
for k, b64 in IMG.items():
    name = key2name.get(k, k)
    open(f"{DIST}/img/{name}.webp", 'wb').write(_b64.b64decode(b64))
    urls[k] = f"/img/{name}.webp"
live = s
start = live.index('const IMG='); end = live.index(';\n', start)
live = live[:start] + 'const IMG=' + json.dumps(urls) + live[end:]
live = live.replace('href="#/', 'href="/')
live = live.replace('<title>', '<meta name="robots" content="noindex, nofollow"><title>', 1)
SUPA = {'url': 'https://sjudccfjcvqwehuwxqpe.supabase.co', 'key': 'sb_publishable_rYwkGpvTZGTsNCqFqCzD0w_bY7HN4F7'}
i = live.rindex("<script>\n'use strict';")
live = (live[:i] + '<script>window.BRM_LIVE=' + json.dumps(SUPA) + ';</script>\n<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js"></script>\n' + live[i:])
live = live.replace('</body>', '<script>\n' + open(L + 'live.js').read() + '\n</script>\n</body>', 1)
live = live.replace('One walkthrough video, up to 200 MB.', 'One walkthrough video, up to 50 MB.')
open(DIST + '/index.html', 'w').write(live)
open(DIST + '/robots.txt', 'w').write('User-agent: *\nDisallow: /\n')
open(DIST + '/vercel.json', 'w').write(json.dumps({
  "cleanUrls": True, "trailingSlash": False,
  "rewrites": [{"source": "/(.*)", "destination": "/index.html"}],
  "headers": [{"source": "/(.*)", "headers": [{"key": "X-Robots-Tag", "value": "noindex, nofollow"}, {"key": "X-Content-Type-Options", "value": "nosniff"}, {"key": "Referrer-Policy", "value": "strict-origin-when-cross-origin"}]},
              {"source": "/img/(.*)", "headers": [{"key": "Cache-Control", "value": "public, max-age=31536000, immutable"}]}]
}, indent=2))
print('live build', len(live), 'bytes;', len(urls), 'images')
