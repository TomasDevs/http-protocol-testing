# Project Summary

**Language / Jazyk:** [English](#en) | [Čeština](#cz)

---

<a id="en"></a>
## English

### Overview

Complete HTTP protocol performance testing application for comparing HTTP/1.1, HTTP/2, and HTTP/3 in real-world conditions.

### Key Components

**Frontend (React + Vite + Tailwind CSS v4):**
- Protocol detection and performance monitoring
- Three test scenarios with different asset loads
- Results visualization with charts
- Data export (JSON, CSV)
- Bilingual interface (EN/CZ)

**Testing Scripts:**
- Automated asset generation (~5.5MB test data)
- Curl testing scripts for all protocols
- Results analysis with statistics

### Measured Metrics

**Frontend (Performance API):**
- TTFB (Time to First Byte)
- DOM Load Time
- Full Load Time
- Resource Count
- Total Transfer Size
- HTTP Protocol Detection

**Curl Tests:**
- Connection time
- Transfer time
- Download size
- Protocol version

### Expected Results

**Baseline Test:**
- Minimal differences between protocols

**Large Files Test:**
- HTTP/2 faster than HTTP/1.1 (1.5-2x)
- HTTP/3 slightly faster than HTTP/2

**Multiplexing Test:**
- HTTP/2 significantly faster than HTTP/1.1 (2-3x)
- HTTP/3 fastest overall

### Deployment

**Live Demo**: https://http-protocol-testing.tomas-stveracek.workers.dev/

Recommended: Cloudflare Workers (automatic HTTP/2 & HTTP/3 support)

Build settings:
- Build command: `cd frontend && npm install && npm run build`
- Deploy command: `cd frontend && npx wrangler deploy`
- Root directory: `/`

### Protocol Comparison

**HTTP/1.1:**
- Widely supported, simple text protocol
- Head-of-line blocking, multiple TCP connections

**HTTP/2:**
- Multiplexing over single TCP connection
- Binary protocol, header compression (HPACK)
- Request prioritization

**HTTP/3:**
- QUIC protocol (UDP instead of TCP)
- 0-RTT connection resumption
- Better loss recovery, built-in encryption

---

<a id="cz"></a>
## Čeština

### Přehled

Kompletní aplikace pro testování výkonu HTTP protokolů pro porovnání HTTP/1.1, HTTP/2 a HTTP/3 v reálných podmínkách.

### Klíčové Komponenty

**Frontend (React + Vite + Tailwind CSS v4):**
- Detekce protokolu a monitoring výkonu
- Tři testovací scénáře s různým zatížením
- Vizualizace výsledků pomocí grafů
- Export dat (JSON, CSV)
- Dvojjazyčné rozhraní (EN/CZ)

**Testovací Skripty:**
- Automatické generování assetů (~5.5MB testovacích dat)
- Curl testovací skripty pro Všechny protokoly
- Analýza výsledků se statistikami

### Měřené Metriky

**Frontend (Performance API):**
- TTFB (Time to First Byte)
- DOM Load Time
- Full Load Time
- Počet zdrojů
- Celková velikost přenesených dat
- Detekce HTTP protokolu

**Curl Testy:**
- Čas spojení
- Čas přenosu
- Velikost stažení
- Verze protokolu

### Očekávané Výsledky

**Základní test:**
- Minimální rozdíly mezi protokoly

**Test velkých souborů:**
- HTTP/2 rychlejší než HTTP/1.1 (1.5-2x)
- HTTP/3 mírně rychlejší než HTTP/2

**Test multiplexingu:**
- HTTP/2 výrazně rychlejší než HTTP/1.1 (2-3x)
- HTTP/3 celkově nejrychlejší

### Deployment

**Live Demo**: https://http-protocol-testing.tomas-stveracek.workers.dev/

Doporučeno: Cloudflare Workers (automatická podpora HTTP/2 & HTTP/3)

Nastavení buildu:
- Build command: `cd frontend && npm install && npm run build`
- Deploy command: `cd frontend && npx wrangler deploy`
- Root directory: `/`

### Porovnání Protokolů

**HTTP/1.1:**
- Široká podpora, jednoduchý textový protokol
- Head-of-line blocking, multiple TCP connections

**HTTP/2:**
- Multiplexing přes jedno TCP spojení
- Binary protokol, komprese headerů (HPACK)
- Prioritizace requestů

**HTTP/3:**
- QUIC protokol (UDP místo TCP)
- 0-RTT connection resumption
- Lepší zotavení ze ztrát, built-in šifrování
