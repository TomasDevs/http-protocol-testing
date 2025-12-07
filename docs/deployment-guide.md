# Deployment Guide - Cloudflare Pages

Tento průvodce vás provede deploymentem aplikace na Cloudflare Pages, která automaticky podporuje HTTP/1.1, HTTP/2 a HTTP/3.

## Předpoklady

- GitHub účet
- Cloudflare účet (zdarma)
- Git nainstalovaný na vašem počítači

## Krok 1: Příprava Projektu

### 1.1 Inicializace Git Repozitáře

```bash
# Z hlavního adresáře projektu
git init
git add .
git commit -m "Initial commit: HTTP Protocol Testing App"
```

### 1.2 Vytvoření GitHub Repozitáře

1. Jděte na [GitHub](https://github.com)
2. Klikněte na "New repository"
3. Pojmenujte repozitář (např. `http-protocol-testing`)
4. NEPOUŽÍVEJTE "Initialize with README" (už máme vlastní)
5. Klikněte "Create repository"

### 1.3 Push do GitHub

```bash
# Nahraďte <username> a <repo-name> vašimi hodnotami
git remote add origin https://github.com/<username>/<repo-name>.git
git branch -M main
git push -u origin main
```

## Krok 2: Cloudflare Pages Setup

### 2.1 Přihlášení do Cloudflare

1. Jděte na [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Přihlaste se nebo vytvořte účet (zdarma)

### 2.2 Vytvoření Pages Projektu

1. V levém menu klikněte na **Pages**
2. Klikněte na **Create a project**
3. Klikněte na **Connect to Git**
4. Autorizujte GitHub (pokud ještě není připojen)
5. Vyberte váš repozitář `http-protocol-testing`

### 2.3 Konfigurace Build Settings

**Project name**: `http-protocol-testing` (nebo vlastní název)

**Production branch**: `main`

**Build settings**:
- **Framework preset**: Vite
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `frontend`

**Environment variables**: (žádné nejsou potřeba)

### 2.4 Deploy

1. Klikněte **Save and Deploy**
2. Cloudflare začne buildovat vaši aplikaci
3. Build trvá cca 2-5 minut
4. Po dokončení uvidíte URL: `https://<project-name>.pages.dev`

## Krok 3: Ověření Deployment

### 3.1 Otevřít Aplikaci

Klikněte na deployment URL a zkontrolujte, že aplikace funguje.

### 3.2 Ověření HTTP/3 Podpory

#### Browser DevTools
1. Otevřete DevTools (F12)
2. Záložka Network
3. Načtěte stránku
4. Klikněte na jakýkoliv request
5. V Headers → General → Protocol zkontrolujte hodnotu (h3, h2, http/1.1)

#### Curl
```bash
# HTTP/3
curl -I --http3 https://<your-site>.pages.dev

# HTTP/2
curl -I --http2 https://<your-site>.pages.dev

# HTTP/1.1
curl -I --http1.1 https://<your-site>.pages.dev
```

### 3.3 Aktualizace Curl Test Script

Upravte `testing/scripts/curl-test.sh`:

```bash
# Změňte tuto řádku
SITE="https://<your-site>.pages.dev"
```

## Krok 4: Continuous Deployment

Cloudflare Pages automaticky deployuje každý push do `main` branch:

```bash
# Uděláte změny v kódu
git add .
git commit -m "Update: ..."
git push

# Cloudflare automaticky re-deployuje
```

## Krok 5: Custom Domain (Volitelné)

### 5.1 Přidání Custom Domain

1. V Cloudflare Pages projektu klikněte na **Custom domains**
2. Klikněte **Set up a custom domain**
3. Zadejte vaši doménu (např. `http-test.example.com`)
4. Cloudflare vygeneruje DNS záznamy
5. Přidejte CNAME záznam u vašeho DNS providera
6. Počkejte na propagaci DNS (5-60 minut)

### 5.2 HTTPS a HTTP/3

Cloudflare automaticky poskytuje:
- Free SSL certifikát (Let's Encrypt)
- HTTP/2 support
- HTTP/3 support
- Automatic HTTPS redirect

## Troubleshooting

### Build Selhává

**Chyba**: "Command not found: npm"
- **Řešení**: Ujistěte se, že Root directory je nastaveno na `frontend`

**Chyba**: "Module not found"
- **Řešení**: Zkontrolujte `package.json` a spusťte lokálně `npm install && npm run build`

### Assets se Nenačítají

**Problém**: 404 errors pro obrázky/JS/CSS
- **Řešení**: Zkontrolujte, že assets jsou v `frontend/public/assets/`
- Spusťte `node testing/scripts/generate-assets.js`
- Commitněte a pushněte změny

### HTTP/3 Není Detekováno

**Možné důvody**:
1. Prohlížeč nemá HTTP/3 povoleno
   - Chrome: `chrome://flags/#enable-quic`
   - Firefox: `about:config` → `network.http.http3.enabled`
2. Network blokuje UDP port 443
3. Testing na localhost (HTTP/3 vyžaduje HTTPS)

## Monitorování a Analytics

### Cloudflare Analytics

1. V Pages projektu → **Analytics**
2. Sledujte:
   - Requests per second
   - Bandwidth
   - Cache hit rate
   - Response times

### Web Vitals

Aplikace automaticky měří Web Vitals v browseru. Výsledky jsou uloženy v localStorage.

## Optimalizace

### Cache Control

Cloudflare automaticky cachuje static assets. Můžete upravit pomocí `_headers` file:

```
# frontend/public/_headers
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable
```

### Compression

Cloudflare automaticky komprimuje obsah pomocí Brotli a GZIP.

## Další Kroky

1. **Testování**: Spusťte curl testy z různých lokací
2. **Monitoring**: Sledujte performance v Cloudflare Analytics
3. **Optimalizace**: Analyzujte výsledky a optimalizujte assety
4. **Dokumentace**: Dokumentujte vaše findings pro akademický projekt

## Užitečné Odkazy

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [HTTP/3 Support](https://developers.cloudflare.com/http3/)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html)
- [Custom Domains](https://developers.cloudflare.com/pages/platform/custom-domains/)
