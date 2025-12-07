# Quick Start Guide

**Language / Jazyk:** [English](#en) | [Čeština](#cz)

---

<a id="en"></a>
## English

### Installation & Setup

```bash
# 1. Install dependencies
cd frontend
npm install

# 2. Generate test assets
node testing/scripts/generate-assets.js

# 3. Start development server
npm run dev
```

Application: **http://localhost:5173/**

### Available Commands

**Frontend:**
```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
```

**Testing:**
```bash
node testing/scripts/generate-assets.js   # Generate assets
node testing/scripts/analyze-results.js   # Analyze results
./testing/scripts/curl-test.sh            # Run curl tests
```

### Test Scenarios

- **Baseline** (`/test/light`) - 5 small images + 3 CSS + 2 JS
- **Large Files** (`/test/heavy`) - 35 images (various sizes) + 5 CSS + 10 JS
- **Multiplexing** (`/test/many`) - 50 small images + 5 CSS + 10 JS

### Protocol Testing Strategy

**Recommended approach:**

1. **HTTP/3** - Visit production: https://http-protocol-testing.tomas-stveracek.workers.dev/
   - Chrome with QUIC enabled (default)

2. **HTTP/2** - Same URL, disable QUIC:
   - Chrome: `chrome://flags` → search "QUIC" → Disable → Restart

3. **HTTP/1.1** - Run locally: `npm run dev` → http://localhost:5174
   - ⚠️ **Warning**: Not comparable to production (no latency)

**Browsers:**
- Recommended: Chrome or Firefox (latest)
- Best HTTP/3 support: Chrome

---

<a id="cz"></a>
## Čeština

### Instalace a Spuštění

```bash
# 1. Instalace závislostí
cd frontend
npm install

# 2. Vygenerování test assetů
node testing/scripts/generate-assets.js

# 3. Spuštění vývojového serveru
npm run dev
```

Aplikace: **http://localhost:5173/**

### Dostupné Příkazy

**Frontend:**
```bash
npm run dev      # Vývojový server
npm run build    # Production build
npm run preview  # Náhled production buildu
```

**Testování:**
```bash
node testing/scripts/generate-assets.js   # Generování assetů
node testing/scripts/analyze-results.js   # Analýza výsledků
./testing/scripts/curl-test.sh            # Spuštění curl testů
```

### Testovací Scénáře

- **Základní** (`/test/light`) - 5 malých obrázků + 3 CSS + 2 JS
- **Velké soubory** (`/test/heavy`) - 35 obrázků (různé velikosti) + 5 CSS + 10 JS
- **Multiplexing** (`/test/many`) - 50 malých obrázků + 5 CSS + 10 JS

### Strategie Testování Protokolů

**Doporučený přístup:**

1. **HTTP/3** - Navštivte produkci: https://http-protocol-testing.tomas-stveracek.workers.dev/
   - Chrome s povoleným QUIC (výchozí)

2. **HTTP/2** - Stejná URL, vypněte QUIC:
   - Chrome: `chrome://flags` → hledejte "QUIC" → Zakázat → Restartovat

3. **HTTP/1.1** - Spusťte lokálně: `npm run dev` → http://localhost:5174
   - ⚠️ **Varování**: Není srovnatelné s produkcí (žádná latence)

**Prohlížeče:**
- Doporučeno: Chrome nebo Firefox (nejnovější)
- Nejlepší podpora HTTP/3: Chrome
