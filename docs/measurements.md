# Dokumentace Měření

Tento dokument popisuje metodologii měření výkonu HTTP protokolů v rámci akademického projektu.

## Měřené Metriky

### 1. Time to First Byte (TTFB)
- **Definice**: Čas od odeslání HTTP požadavku do přijetí prvního bytu odpovědi
- **Význam**: Ukazuje latenci sítě a dobu zpracování na serveru
- **Měření**: `navigationEntry.responseStart - navigationEntry.requestStart`

### 2. DOM Content Loaded
- **Definice**: Čas do dokončení parsování HTML a DOMContentLoaded eventu
- **Význam**: Kdy je DOM připraven k manipulaci
- **Měření**: `navigationEntry.domContentLoadedEventEnd - navigationEntry.fetchStart`

### 3. Full Load Time
- **Definice**: Celkový čas do načtení všech assetů a load eventu
- **Význam**: Kompletní čas načtení stránky
- **Měření**: `navigationEntry.loadEventEnd - navigationEntry.fetchStart`

### 4. Resource Count
- **Definice**: Počet načtených HTTP požadavků (CSS, JS, obrázky, atd.)
- **Význam**: Overhead spojený s počtem požadavků

### 5. Total Transfer Size
- **Definice**: Celková velikost přenesených dat v bytech
- **Význam**: Množství dat potřebných k načtení stránky

### 6. Per-Resource Metrics
Pro každý asset měříme:
- **Duration**: Celková doba stahování
- **Size**: Velikost v bytech
- **Protocol**: Použitý HTTP protokol
- **TTFB**: Time to First Byte pro daný asset

## Testovací Scénáře

### Light Test
- **Účel**: Základní baseline měření
- **Obsah**:
  - 5 small images (~10KB)
  - 3 CSS soubory
  - 2 JS soubory
- **Očekávání**: Minimální rozdíly mezi protokoly

### Heavy Test
- **Účel**: Test velkých souborů
- **Obsah**:
  - 20 small images (~10KB)
  - 10 medium images (~100KB)
  - 5 large images (~500KB)
  - 5 CSS souborů
  - 10 JS souborů
- **Očekávání**: HTTP/2 a HTTP/3 by měly být rychlejší díky multiplexingu

### Many Resources Test
- **Účel**: Test multiplexingu s mnoha malými soubory
- **Obsah**:
  - 50 small images (~10KB)
  - 5 CSS souborů
  - 10 JS souborů
- **Očekávání**: HTTP/2 a HTTP/3 výrazně rychlejší než HTTP/1.1

## Metodologie Testování

### Browser Testing
1. Otevřít aplikaci v moderním prohlížeči
2. Vyprázdnit cache (Hard Reload)
3. Navigovat na testovací scénář
4. Počkat na kompletní načtení
5. Zkontrolovat detekovaný protokol
6. Uložit výsledek
7. Opakovat 3-10x pro každý scénář

### Curl Testing
1. Deploy aplikace na Cloudflare Pages
2. Upravit SITE URL v `curl-test.sh`
3. Spustit `./testing/scripts/curl-test.sh`
4. Analyzovat pomocí `node testing/scripts/analyze-results.js`
5. Porovnat průměry, mediány, směrodatné odchylky

## Faktory Ovlivňující Měření

### Síťové Podmínky
- **Latence**: Ovlivňuje TTFB
- **Bandwidth**: Ovlivňuje download time
- **Packet Loss**: Více ovlivňuje TCP (HTTP/1.1, HTTP/2) než UDP (HTTP/3)

### Server-side
- **CDN**: Cloudflare automaticky optimalizuje delivery
- **Compression**: GZIP/Brotli compression
- **Caching**: Browser cache, CDN cache

### Client-side
- **Browser**: Různé implementace HTTP protokolů
- **Hardware**: CPU, RAM
- **Cache**: Warm vs. cold cache

## Očekávané Výsledky

### HTTP/1.1
- **Výhody**: Široká podpora, jednoduchý
- **Nevýhody**:
  - Head-of-line blocking
  - Nutnost více TCP spojení
  - Neefektivní při mnoha assetech

### HTTP/2
- **Výhody**:
  - Multiplexing přes jedno TCP spojení
  - Header compression
  - Request prioritization
- **Nevýhody**:
  - Stále TCP head-of-line blocking na transportní vrstvě

### HTTP/3
- **Výhody**:
  - QUIC protokol eliminuje TCP head-of-line blocking
  - 0-RTT connection resumption
  - Lepší handling packet loss
- **Nevýhody**:
  - Novější, méně široká podpora
  - UDP může být blokováno některými firewally

## Interpretace Výsledků

### Statistická Významnost
- Provést minimum 10 měření pro každý scénář
- Vypočítat průměr, medián, směrodatnou odchylku
- Eliminovat outliers

### Porovnání Protokolů
- Relativní rozdíly (%, kolikrát rychlejší)
- Absolutní rozdíly (ms)
- Konzistence (nižší směrodatná odchylka = stabilnější)

### Grafy a Vizualizace
- Bar charts pro průměrné hodnoty
- Line charts pro časový vývoj
- Tabulky pro detailní statistiky

## Možná Rozšíření

1. **Network Throttling**: Simulace pomalé sítě
2. **Mobile Testing**: Testování na mobilních zařízeních
3. **Geographic Distribution**: Testování z různých lokací
4. **Time of Day**: Vliv denní doby na výkon
5. **Cache Analysis**: Porovnání warm vs. cold cache

## Reference

- [MDN Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance)
- [HTTP/2 Specification](https://http2.github.io/)
- [HTTP/3 Specification](https://quicwg.org/base-drafts/draft-ietf-quic-http.html)
- [Web Vitals](https://web.dev/vitals/)
