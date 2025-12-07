export const translations = {
  en: {
    // Navigation & General
    home: 'Home',
    results: 'Results',
    language: 'Language',

    // Home Page
    title: 'HTTP Protocol Performance Testing',
    subtitle: 'Measure and compare HTTP/1.1, HTTP/2, and HTTP/3 performance. Test on Cloudflare (HTTP/2 & HTTP/3) or localhost (HTTP/1.1).',
    howToSwitch: 'How to switch protocols',

    // Protocol Info
    protocols: 'Protocols',
    protocolHeader: 'Protocol',
    featuresHeader: 'Features',
    http1: 'HTTP/1.1',
    http2: 'HTTP/2',
    http3: 'HTTP/3',

    // HTTP/1.1 Features
    http1_feature1: 'Sequential requests',
    http1_feature2: 'Head-of-line blocking',
    http1_feature3: 'Multiple TCP connections',
    http1_feature4: 'Plain text headers',

    // HTTP/2 Features
    http2_feature1: 'Multiplexing over single TCP',
    http2_feature2: 'Header compression (HPACK)',
    http2_feature3: 'Server Push',
    http2_feature4: 'Binary protocol',

    // HTTP/3 Features
    http3_feature1: 'QUIC protocol (UDP)',
    http3_feature2: '0-RTT connection resumption',
    http3_feature3: 'Better loss recovery',
    http3_feature4: 'Built-in encryption',

    // Test Scenarios
    testScenarios: 'Test Scenarios',
    lightTest: 'Baseline Test',
    lightTestDesc: 'Minimal resource loading - 5 images, 3 CSS, 2 JS',
    heavyTest: 'Large Files Test',
    heavyTestDesc: 'Large resource loading - 35 images (mixed sizes), 5 CSS, 10 JS',
    manyTest: 'Multiplexing Test',
    manyTestDesc: 'Many small resources - 50 images, 5 CSS, 10 JS',

    // Protocol Switching
    protocolSwitching: 'How to Switch HTTP Protocols',
    defaultVersion: 'Default',
    fallbackVersion: 'Fallback',
    localhostOnly: 'Localhost Only',
    http3Instructions: 'This application runs on Cloudflare Workers with HTTP/3 enabled by default. Just visit the site normally in Chrome.',
    http2Step1: 'Chrome: chrome://flags → search "QUIC" → Disabled | Firefox: about:config → network.http.http3.enable → false',
    http2Step2: 'Restart browser',
    http2Step3: 'Refresh this page (F5)',
    http1Instructions: 'Run: npm run dev → http://localhost:5174',
    http1Warning: 'Localhost results are NOT comparable to production (no network latency)',
    warning: 'Warning',

    // Instructions
    howToTest: 'How to Test',
    instruction1: 'Select a test scenario above',
    instruction2: 'Page will load and automatically measure performance',
    instruction3: 'Check the detected HTTP protocol',
    instruction4: 'Review measured metrics (TTFB, DOM Load, Full Load)',
    instruction5: 'Save result using "Save Result" button',
    instruction6: 'Repeat test several times for accurate results',
    instruction7: 'Test from different devices and networks if possible',
    instruction8: 'View aggregated results in Results section',

    viewResults: 'View Results',

    // Footer
    footer: 'Academic Project - HTTP Protocol Performance Testing',
    createdBy: 'Created by',

    // Performance Monitor
    collectingMetrics: 'Collecting metrics...',
    failedToCollect: 'Failed to collect metrics',
    timeToFirstByte: 'Time to First Byte',
    ttfb: 'TTFB',
    domContentLoaded: 'DOM Content Loaded',
    domLoadTime: 'DOM Load Time',
    fullPageLoad: 'Full Page Load',
    totalLoadTime: 'Total Load Time',
    resourcesLoaded: 'Resources Loaded',
    totalResources: 'Total Resources',
    totalDataTransfer: 'Total Data Transfer',
    transferredSize: 'Transferred Size',
    protocolVersion: 'Protocol Version',
    httpProtocol: 'HTTP Protocol',
    saveResult: 'Save Result',
    saved: 'Saved!',
    resourceDetails: 'Resource Details',
    items: 'items',
    type: 'Type',
    name: 'Name',
    duration: 'Duration',
    size: 'Size',
    protocol: 'Protocol',
    timeMs: 'Time (ms)',

    // Protocol Detector
    protocolDescHttp1: 'Traditional protocol with sequential requests. Slower for multiple resources.',
    protocolDescHttp2: 'Modern protocol with multiplexing and header compression over TCP.',
    protocolDescHttp3: 'Latest protocol using QUIC over UDP. Fastest with multiplexing and 0-RTT.',
    protocolDescUnknown: 'Protocol could not be detected.',
    localhostWarning: 'Localhost Warning',
    localhostWarningText: 'Results are not comparable to production (no network latency). Use only for feature testing.',

    // Test Scenario
    testConfiguration: 'Test Configuration',
    images: 'Images',
    small: 'small',
    medium: 'medium',
    large: 'large',
    cssFiles: 'CSS Files',
    jsFiles: 'JS Files',
    loadedImages: 'Loaded Images',

    // Results Page
    backToHome: 'Back to Home',
    testResults: 'Test Results',
    totalResults: 'Total Results',
    noResults: 'No results yet!',
    noResultsDesc: 'Run some tests to see results here.',
    goToTests: 'Go to tests',
    scenario: 'Scenario',
    allScenarios: 'All Scenarios',
    allProtocols: 'All Protocols',
    exportJSON: 'Export JSON',
    exportCSV: 'Export CSV',
    clearAll: 'Clear All',
    clearConfirm: 'Are you sure you want to clear all results?',
    barChart: 'Bar Chart',
    timeSeries: 'Time Series',
    avgPerformanceByProtocol: 'Average Performance Metrics by Protocol',
    fullLoadTimeOverTests: 'Full Load Time Over Tests',
    statisticalSummary: 'Statistical Summary',
    tests: 'Tests',
    avgTTFB: 'Avg TTFB',
    avgDOMLoad: 'Avg DOM Load',
    avgFullLoad: 'Avg Full Load',
    detailedResults: 'Detailed Results',
    timestamp: 'Timestamp',
    resources: 'Resources',
    unknown: 'Unknown',

    // 404 Page
    pageNotFound: 'Page Not Found',
    pageNotFoundDesc: 'The page you are looking for does not exist or has been moved.',

    // Table Headers
    domLoad: 'DOM Load',
    fullLoad: 'Full Load',
  },

  cz: {
    // Navigation & General
    home: 'Domů',
    results: 'Výsledky',
    language: 'Jazyk',

    // Home Page
    title: 'Testování Výkonu HTTP Protokolů',
    subtitle: 'Měření a porovnání výkonu HTTP/1.1, HTTP/2 a HTTP/3. Testujte na Cloudflare (HTTP/2 & HTTP/3) nebo na localhostu (HTTP/1.1).',
    howToSwitch: 'Jak přepínat protokoly',

    // Protocol Info
    protocols: 'Protokoly',
    protocolHeader: 'Protokol',
    featuresHeader: 'Vlastnosti',
    http1: 'HTTP/1.1',
    http2: 'HTTP/2',
    http3: 'HTTP/3',

    // HTTP/1.1 Features
    http1_feature1: 'Sekvenční požadavky',
    http1_feature2: 'Blokování ve frontě',
    http1_feature3: 'Více TCP spojení',
    http1_feature4: 'Textové hlavičky',

    // HTTP/2 Features
    http2_feature1: 'Multiplexing přes jedno TCP',
    http2_feature2: 'Komprese hlaviček (HPACK)',
    http2_feature3: 'Server push',
    http2_feature4: 'Binární protokol',

    // HTTP/3 Features
    http3_feature1: 'QUIC protokol (UDP)',
    http3_feature2: '0-RTT obnovení spojení',
    http3_feature3: 'Lepší zotavení ze ztrát',
    http3_feature4: 'Vestavěné šifrování',

    // Test Scenarios
    testScenarios: 'Testovací Scénáře',
    lightTest: 'Základní test',
    lightTestDesc: 'Minimální načítání zdrojů - 5 obrázků, 3 CSS, 2 JS',
    heavyTest: 'Test velkých souborů',
    heavyTestDesc: 'Načítání velkých zdrojů - 35 obrázků (mix velikostí), 5 CSS, 10 JS',
    manyTest: 'Test multiplexingu',
    manyTestDesc: 'Mnoho malých zdrojů - 50 obrázků, 5 CSS, 10 JS',

    // Protocol Switching
    protocolSwitching: 'Jak Přepínat HTTP Protokoly',
    defaultVersion: 'Výchozí',
    fallbackVersion: 'Záložní',
    localhostOnly: 'Pouze Localhost',
    http3Instructions: 'Tato aplikace běží na Cloudflare Workers s HTTP/3 jako výchozí. Stačí navštívit web normálně v Chrome.',
    http2Step1: 'Chrome: chrome://flags → hledat "QUIC" → Disabled | Firefox: about:config → network.http.http3.enable → false',
    http2Step2: 'Restartovat prohlížeč',
    http2Step3: 'Obnovit stránku (F5)',
    http1Instructions: 'Spusťte: npm run dev → http://localhost:5174',
    http1Warning: 'Výsledky z localhostu NEJSOU srovnatelné s produkcí (žádná síťová latence)',
    warning: 'Varování',

    // Instructions
    howToTest: 'Jak testovat',
    instruction1: 'Vyberte testovací scénář výše',
    instruction2: 'Stránka se načte a automaticky změří výkon',
    instruction3: 'Zkontrolujte detekovaný HTTP protokol',
    instruction4: 'Prohlédněte si naměřené metriky (TTFB, DOM Load, Full Load)',
    instruction5: 'Uložte výsledek pomocí tlačítka "Uložit výsledek"',
    instruction6: 'Opakujte test několikrát pro přesnější výsledky',
    instruction7: 'Pokud možno testujte z různých zařízení a sítí',
    instruction8: 'Prohlédněte si agregované výsledky v sekci Výsledky',

    viewResults: 'Zobrazit výsledky',

    // Footer
    footer: 'Akademický projekt - Testování výkonu HTTP protokolů',
    createdBy: 'Vytvořil',

    // Performance Monitor
    collectingMetrics: 'Sbírám metriky...',
    failedToCollect: 'Nepodařilo se sesbírat metriky',
    timeToFirstByte: 'Čas do Prvního Bytu',
    ttfb: 'TTFB',
    domContentLoaded: 'Načtení DOM',
    domLoadTime: 'Čas načtení DOM',
    fullPageLoad: 'Úplné Načtení Stránky',
    totalLoadTime: 'Celkový čas načtení',
    resourcesLoaded: 'Načtené Zdroje',
    totalResources: 'Celkem zdrojů',
    totalDataTransfer: 'Celkový Přenos Dat',
    transferredSize: 'Přenesená velikost',
    protocolVersion: 'Verze Protokolu',
    httpProtocol: 'HTTP Protokol',
    saveResult: 'Uložit výsledek',
    saved: 'Uloženo!',
    resourceDetails: 'Detaily zdrojů',
    items: 'položek',
    type: 'Typ',
    name: 'Název',
    duration: 'Trvání',
    size: 'Velikost',
    protocol: 'Protokol',
    timeMs: 'Čas (ms)',

    // Protocol Detector
    protocolDescHttp1: 'Tradiční protokol se sekvenčními požadavky. Pomalejší pro více zdrojů.',
    protocolDescHttp2: 'Moderní protokol s multiplexingem a kompresí hlaviček přes TCP.',
    protocolDescHttp3: 'Nejnovější protokol používající QUIC přes UDP. Nejrychlejší s multiplexingem a 0-RTT.',
    protocolDescUnknown: 'Protokol nelze detekovat.',
    localhostWarning: 'Varování Localhost',
    localhostWarningText: 'Výsledky nejsou srovnatelné s produkcí (žádná síťová latence). Používejte pouze pro testování funkcí.',

    // Test Scenario
    testConfiguration: 'Konfigurace testu',
    images: 'Obrázky',
    small: 'malých',
    medium: 'středních',
    large: 'velkých',
    cssFiles: 'CSS soubory',
    jsFiles: 'JS soubory',
    loadedImages: 'Načtené obrázky',

    // Results Page
    backToHome: 'Zpět domů',
    testResults: 'Výsledky Testů',
    totalResults: 'Celkem Výsledků',
    noResults: 'Zatím žádné výsledky!',
    noResultsDesc: 'Spusťte nějaké testy, abyste viděli výsledky.',
    goToTests: 'Přejít na testy',
    scenario: 'Scénář',
    allScenarios: 'Všechny scénáře',
    allProtocols: 'Všechny protokoly',
    exportJSON: 'Exportovat JSON',
    exportCSV: 'Exportovat CSV',
    clearAll: 'Vymazat vše',
    clearConfirm: 'Opravdu chcete Vymazat všechny výsledky?',
    barChart: 'Sloupcový graf',
    timeSeries: 'Časová řada',
    avgPerformanceByProtocol: 'Průměrné metriky výkonu dle protokolu',
    fullLoadTimeOverTests: 'Celkový čas načtení v Testech',
    statisticalSummary: 'Statistický souhrn',
    tests: 'Testy',
    avgTTFB: 'Průměr TTFB',
    avgDOMLoad: 'Průměr DOM Load',
    avgFullLoad: 'Průměr Full Load',
    detailedResults: 'Detailní výsledky',
    timestamp: 'Datum a čas',
    resources: 'Zdroje',
    unknown: 'Neznámý',

    // 404 Page
    pageNotFound: 'Stránka nenalezena',
    pageNotFoundDesc: 'Stránka, kterou hledáte, neexistuje nebo byla přesunuta.',

    // Table Headers
    domLoad: 'Načtení DOM',
    fullLoad: 'Celkové načtení',
  }
};
