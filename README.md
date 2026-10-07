# nishan-site

Hand-built static site. No Webflow, no Framer, no framework, no build step.
Plain HTML + CSS + JS, deployable anywhere that serves files.

```
nishan-site/
├── public/                  ← this folder IS the website (what gets served)
│   ├── index.html           page markup + <head> (SEO, social cards, icons)
│   ├── 404.html             custom not-found page
│   ├── assets/
│   │   ├── css/main.css     all styles
│   │   ├── js/main.js       seam drag, polaroids, flip cards, stamps, stickers
│   │   └── img/             7 photos as .webp + og.jpg (link preview image)
│   ├── favicon.svg, apple-touch-icon.png, site.webmanifest
│   ├── robots.txt, sitemap.xml
│   └── _headers             security + cache headers (Cloudflare / Netlify)
├── wrangler.jsonc           Cloudflare config
├── netlify.toml             Netlify config
├── vercel.json              Vercel config
├── deploy/
│   ├── nginx.conf           own-server config
│   └── deploy-vps.sh        rsync deploy to own server
└── set-domain.sh            one-time domain find/replace
```

Page weight went from one 692 KB file (photos base64-embedded) to ~48 KB of
code with ~370 KB of WebP photos that cache for a year.

---

## 0. Set your domain (once)

Every `YOURDOMAIN` placeholder (canonical URL, social cards, sitemap, nginx)
gets replaced with:

```bash
./set-domain.sh nishanagarwal.com
```

## 1. Preview locally

```bash
cd public
python3 -m http.server 8000      # open http://localhost:8000
```

Edit `index.html`, `assets/css/main.css`, `assets/js/main.js`, refresh. That's the whole dev loop.

## 2. Put it on GitHub

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/<you>/nishan-site.git
git push -u origin main
```

From here on: **edit → `git push` → site updates in ~30s.**

---

## 3. Host it — pick ONE route

### Route A · Cloudflare (recommended)

Free, unlimited bandwidth, edge servers in Mumbai/Delhi/Chennai and globally,
free SSL, and the domain registrar sells at cost.

1. Sign up at dash.cloudflare.com
2. **Workers & Pages → Create → Import a repository** → pick `nishan-site`
3. It reads `wrangler.jsonc`. Build command: *empty*. Deploy.
4. You get `nishan-site.<account>.workers.dev` live immediately.

(Cloudflare Pages also still works: Create → Pages → connect repo,
framework preset **None**, build command empty, output directory `public`.)

CLI alternative, no GitHub:

```bash
npm i -g wrangler
wrangler login
wrangler deploy
```

### Route B · Netlify / Vercel

- **Netlify:** Add new site → Import from Git → it reads `netlify.toml`. Or just drag the `public/` folder onto app.netlify.com/drop.
- **Vercel:** New Project → import repo → it reads `vercel.json` (output `public`, framework "Other").

### Route C · Your own server (full control)

For when you want the whole stack in your hands. ~₹400–500/month.

1. **Server:** DigitalOcean / Hetzner / AWS Lightsail, Ubuntu 24.04, smallest plan, Mumbai or Bangalore region.
2. **Point domain:** A record `@` → server IP, A record `www` → server IP.
3. **On the server:**
   ```bash
   sudo apt update && sudo apt install -y nginx certbot python3-certbot-nginx
   sudo adduser deploy && sudo mkdir -p /var/www/YOURDOMAIN && sudo chown deploy /var/www/YOURDOMAIN
   sudo ufw allow OpenSSH && sudo ufw allow 'Nginx Full' && sudo ufw enable
   ```
4. **SSL first** (certbot needs plain HTTP once):
   ```bash
   sudo certbot certonly --nginx -d YOURDOMAIN -d www.YOURDOMAIN
   ```
5. **Site config:** copy `deploy/nginx.conf` to `/etc/nginx/sites-available/YOURDOMAIN`, then
   ```bash
   sudo ln -s /etc/nginx/sites-available/YOURDOMAIN /etc/nginx/sites-enabled/
   sudo rm /etc/nginx/sites-enabled/default
   sudo nginx -t && sudo systemctl reload nginx
   ```
6. **Deploy from your laptop:** set `SERVER` in `deploy/deploy-vps.sh` (add your SSH key to the `deploy` user first), then `./deploy/deploy-vps.sh`.

Cert renewal is automatic (`systemctl status certbot.timer` to confirm).

---

## 4. Custom domain (Routes A/B)

**Buying new:** Cloudflare Registrar (at cost, ~$10/yr for .com) means DNS + hosting in one place.

**Already own one** (GoDaddy / Namecheap / Hostinger):
- *Easiest on Cloudflare:* add the domain to Cloudflare, then at your registrar replace the nameservers with the two Cloudflare gives you. Wait (minutes to a few hours).
- Then in your Worker/Pages project → **Settings → Domains & Routes → Add custom domain** → `YOURDOMAIN` and `www.YOURDOMAIN`.
- Netlify / Vercel: add the domain in project settings and follow the DNS records they show (usually an A record + a CNAME for www).

Pick one canonical version (no-www recommended) and redirect the other to it.
SSL is issued automatically on all three hosts.

---

## 5. After launch checklist

- [ ] Open the site on phone + desktop, test seam drag, polaroids, card flips, stamps, sticker drag, copy-email button
- [ ] Google Search Console → add property → submit `https://YOURDOMAIN/sitemap.xml`
- [ ] Paste the URL into LinkedIn Post Inspector / opengraph.xyz to check the link preview card
- [ ] Lighthouse (Chrome DevTools) for performance/SEO scores
- [ ] Visit `/anything-random` and confirm the 404 page shows

## Optional upgrades

- **Analytics, no cookie banner:** Cloudflare Web Analytics (free). Add its script tag before `</body>` and add `https://static.cloudflareinsights.com` to `script-src` and `https://cloudflareinsights.com` to `connect-src` in `_headers` (the CSP will block it otherwise).
- **Self-host fonts** (faster, no Google request): download Archivo, Gloock, Gochi Hand, Yellowtail as woff2 into `public/assets/fonts/`, add `@font-face` rules to the top of `main.css`, remove the Google Fonts `<link>` tags, and change CSP `font-src` to `'self'`.
- **More pages later:** add `public/work.html`, link it as `/work` (clean URLs are on for all hosts), add it to `sitemap.xml`.

## Security headers note

`_headers` / `vercel.json` / `nginx.conf` ship a strict Content-Security-Policy.
If you add any third-party script, embed, or font host and it silently fails,
the CSP is why: add that domain to the matching directive.
# nishan-site
# nishan-site
