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

### Deployment (Cloudflare Pages)

1. Push to GitHub
2. Connect Cloudflare Pages to your repository
3. Build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `frontend`

Cloudflare Pages automatically supports HTTP/3.

### Testing

1. Open the application in your browser
2. Select a test scenario (Baseline / Large Files / Multiplexing)
3. Check the detected HTTP protocol
4. Review measured metrics
5. Save results for comparison
6. View aggregated results on the Results page

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
- Tři testovací scénáře: Základní (malé assety), Velké soubory (těžké assety), Multiplexing (mnoho malých assetů)
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

### Deployment (Cloudflare Pages)

1. Push do GitHub
2. Připojení Cloudflare Pages k repozitáři
3. Nastavení buildu:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `frontend`

Cloudflare Pages automaticky podporuje HTTP/3.

### Testování

1. Otevřete aplikaci v prohlížeči
2. Vyberte testovací scénář (Základní / Velké soubory / Multiplexing)
3. Zkontrolujte detekovaný HTTP protokol
4. Prohlédněte si naměřené metriky
5. Uložte výsledky pro porovnání
6. Zobrazit agregované výsledky na stránce Výsledky

### Licence

MIT License

### Autor

Vytvořil [Tomáš Štveráček](https://tomasdevs.netlify.app/) | [GitHub](https://github.com/tomasdevs)
