# HTTP Protocol Performance Testing

**Language / Jazyk:** [English](#en) | [Čeština](#cz)

---

<a id="en"></a>
## English

Web application for measuring and comparing HTTP/1.1, HTTP/2, and HTTP/3 performance under real-world conditions.

### Features

- Automatic HTTP protocol detection (HTTP/1.1, HTTP/2, HTTP/3)
- Performance metrics: TTFB, DOM Load Time, Full Load Time, Resource Count, Total Size
- Three test scenarios: Baseline (small assets), Large Files (heavy assets), Multiplexing (many small assets)
- Results visualization with charts
- Data export (JSON, CSV)
- Bilingual interface (EN/CZ)

### Tech Stack

- **Frontend**: Vite + React 19
- **Styling**: Tailwind CSS v4
- **Charts**: Chart.js + react-chartjs-2
- **Routing**: React Router
- **Deployment**: Cloudflare Pages (HTTP/1.1, HTTP/2, HTTP/3 support)

### Project Structure

```
http-protocol-testing/
├── frontend/                    # React application
│   ├── public/
│   │   └── assets/              # Generated test assets
│   │       ├── images/          # Small, medium, large images
│   │       ├── scripts/         # JavaScript files
│   │       └── styles/          # CSS files
│   └── src/
│       ├── components/          # React components
│       ├── pages/               # Pages
│       ├── i18n/                # Internationalization
│       └── utils/               # Utilities
└── testing/                     # Test scripts
    └── scripts/
        ├── generate-assets.js   # Asset generation
        ├── curl-test.sh         # Curl testing
        └── analyze-results.js   # Results analysis
```

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

Application will be available at `http://localhost:5173`

### Build for Production

```bash
cd frontend
npm run build
```

Build output: `frontend/dist`

### Deployment (Cloudflare Workers)

**Live Demo**: [https://http-protocol-testing.tomas-stveracek.workers.dev/](https://http-protocol-testing.tomas-stveracek.workers.dev/)

1. Push to GitHub
2. Connect Cloudflare Workers & Pages to your repository
3. Build settings:
   - **Build command**: `cd frontend && npm install && npm run build`
   - **Deploy command**: `cd frontend && npx wrangler deploy`
   - **Root directory**: `/`

Cloudflare Workers automatically supports HTTP/2 and HTTP/3.

### Testing Protocol Versions

**Recommended Testing Strategy:**

1. **HTTP/3 (Cloudflare - Default)**
   - Visit: https://http-protocol-testing.tomas-stveracek.workers.dev/
   - Chrome with QUIC enabled (default)
   - Most modern, fastest protocol

2. **HTTP/2 (Cloudflare - Fallback)**
   - Visit same URL
   - Disable QUIC in Chrome: `chrome://flags` → search "QUIC" → Disable
   - Restart Chrome
   - Clear browser cache for accurate results

3. **HTTP/1.1 (Localhost - Development Only)**
   - Run: `npm run dev` → `http://localhost:5173`
   - ⚠️ **Note**: Results are NOT comparable to production (no network latency)
   - Use only for feature testing, not performance comparison

### Using the Application

1. Select a test scenario (Light / Heavy / Many resources)
2. Check the detected HTTP protocol in the black badge
3. Review measured metrics (TTFB, DOM Load, Full Load)
4. Click "Save Result" to store for comparison
5. Visit Results page to view charts and statistics

### License

MIT License

### Author

Created by [Tomáš Štveráček](https://tomasdevs.netlify.app/) | [GitHub](https://github.com/tomasdevs)

---

<a id="cz"></a>
## Čeština

Webová aplikace pro měření a porovnání výkonu HTTP/1.1, HTTP/2 a HTTP/3 v reálných podmínkách.

### Funkce

- Automatická detekce HTTP protokolu (HTTP/1.1, HTTP/2, HTTP/3)
- Metriky výkonu: TTFB, DOM Load Time, Full Load Time, počet zdrojů, celková velikost
- Tři testovací scénáře: Základní (malé assety), Velké soubory (velké assety), Multiplexing (mnoho malých assetů)
- Vizualizace výsledků pomocí grafů
- Export dat (JSON, CSV)
- Dvojjazyčné rozhraní (EN/CZ)

### Technologie

- **Frontend**: Vite + React 19
- **Styling**: Tailwind CSS v4
- **Grafy**: Chart.js + react-chartjs-2
- **Routing**: React Router
- **Deployment**: Cloudflare Pages (podpora HTTP/1.1, HTTP/2, HTTP/3)

### Struktura Projektu

```
http-protocol-testing/
├── frontend/                    # React aplikace
│   ├── public/
│   │   └── assets/              # Generované testovací assety
│   │       ├── images/          # Malé, střední, velké obrázky
│   │       ├── scripts/         # JavaScript soubory
│   │       └── styles/          # CSS soubory
│   └── src/
│       ├── components/          # React komponenty
│       ├── pages/               # Stránky
│       ├── i18n/                # Internacionalizace
│       └── utils/               # Utility funkce
└── testing/                     # Testovací skripty
    └── scripts/
        ├── generate-assets.js   # Generování assetů
        ├── curl-test.sh         # Curl testování
        └── analyze-results.js   # Analýza výsledků
```

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

Aplikace bude dostupná na `http://localhost:5173`

### Build pro Produkci

```bash
cd frontend
npm run build
```

Výstup buildu: `frontend/dist`

### Deployment (Cloudflare Workers)

**Live Demo**: [https://http-protocol-testing.tomas-stveracek.workers.dev/](https://http-protocol-testing.tomas-stveracek.workers.dev/)

1. Push do GitHub
2. Připojení Cloudflare Workers & Pages k repozitáři
3. Nastavení buildu:
   - **Build command**: `cd frontend && npm install && npm run build`
   - **Deploy command**: `cd frontend && npx wrangler deploy`
   - **Root directory**: `/`

Cloudflare Workers automaticky podporuje HTTP/2 a HTTP/3.

### Testování Verzí Protokolu

**Doporučená Testovací Strategie:**

1. **HTTP/3 (Cloudflare - Výchozí)**
   - Navštivte: https://http-protocol-testing.tomas-stveracek.workers.dev/
   - Chrome s povoleným QUIC (výchozí)
   - Nejmodernější, nejrychlejší protokol

2. **HTTP/2 (Cloudflare - Fallback)**
   - Navštivte stejnou URL
   - Vypněte QUIC v Chrome: `chrome://flags` → hledejte "QUIC" → Zakázat
   - Restartujte Chrome
   - Vymažte cache prohlížeče pro přesné výsledky

3. **HTTP/1.1 (Localhost - Pouze Pro Vývoj)**
   - Spusťte: `npm run dev` → `http://localhost:5173`
   - ⚠️ **Upozornění**: Výsledky NEJSOU srovnatelné s produkcí (žádná síťová latence)
   - Používejte pouze pro testování funkcí, ne pro porovnání výkonu

### Použití Aplikace

1. Vyberte testovací scénář (Lehký / Těžký / Mnoho zdrojů)
2. Zkontrolujte detekovaný HTTP protokol v černém poli
3. Prohlédněte si naměřené metriky (TTFB, DOM Load, Full Load)
4. Klikněte na "Uložit výsledek" pro uložení k porovnání
5. Navštivte stránku Výsledky pro zobrazení grafů a statistik

### Licence

MIT License

### Autor

Vytvořil [Tomáš Štveráček](https://tomasdevs.netlify.app/) | [GitHub](https://github.com/tomasdevs)
