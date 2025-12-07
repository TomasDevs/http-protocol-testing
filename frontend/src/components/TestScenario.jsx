import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import PerformanceMonitor from './PerformanceMonitor';

const scenarioConfigs = {
  light: { images: { small: 5 }, styles: 3, scripts: 2 },
  heavy: { images: { small: 20, medium: 10, large: 5 }, styles: 5, scripts: 10 },
  many: { images: { small: 50 }, styles: 5, scripts: 10 }
};

function TestScenario({ scenarioType }) {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [loadedAssets, setLoadedAssets] = useState([]);
  const { t } = useLanguage();
  const config = scenarioConfigs[scenarioType] || scenarioConfigs.light;

  useEffect(() => {
    const assets = [];
    if (config.images.small) {
      for (let i = 1; i <= config.images.small; i++) {
        assets.push({ type: 'image', src: `/assets/images/small/image-${i}.svg`, size: 'small' });
      }
    }
    if (config.images.medium) {
      for (let i = 1; i <= config.images.medium; i++) {
        assets.push({ type: 'image', src: `/assets/images/medium/image-${i}.svg`, size: 'medium' });
      }
    }
    if (config.images.large) {
      for (let i = 1; i <= config.images.large; i++) {
        assets.push({ type: 'image', src: `/assets/images/large/image-${i}.svg`, size: 'large' });
      }
    }
    for (let i = 1; i <= config.scripts; i++) {
      const script = document.createElement('script');
      script.src = `/assets/scripts/dummy-${i}.js`;
      script.async = true;
      document.body.appendChild(script);
    }
    for (let i = 1; i <= config.styles; i++) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `/assets/styles/style-${i}.css`;
      document.head.appendChild(link);
    }
    setLoadedAssets(assets);
    setAssetsLoaded(true);
  }, [scenarioType]);

  const getTestTitle = () => {
    if (scenarioType === 'light') return t('lightTest');
    if (scenarioType === 'heavy') return t('heavyTest');
    if (scenarioType === 'many') return t('manyTest');
    return 'Test';
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-neutral-200 pb-6 gap-4">
          <div>
            <Link to="/" className="font-mono text-sm text-black hover:underline mb-4 inline-block cursor-pointer">
              ← {t('backToHome')}
            </Link>
            <h1 className="text-xl sm:text-2xl font-mono font-bold text-black mb-2">{getTestTitle()}</h1>
          </div>
          <LanguageSwitcher />
        </div>
        <div className="mb-6 sm:mb-8"><PerformanceMonitor scenarioType={scenarioType} /></div>
        <div className="border border-neutral-300 p-3 sm:p-4 mb-6 sm:mb-8 bg-neutral-50">
          <h2 className="text-xs sm:text-sm font-mono font-bold text-black mb-3 uppercase tracking-wide">{t('testConfiguration')}</h2>
          <div className="grid grid-cols-3 gap-2 sm:gap-4 font-mono text-xs sm:text-sm">
            <div><div className="text-neutral-500 text-xs mb-1">{t('images')}</div><div className="font-bold">{(config.images.small || 0) + (config.images.medium || 0) + (config.images.large || 0)}</div></div>
            <div><div className="text-neutral-500 text-xs mb-1">{t('cssFiles')}</div><div className="font-bold">{config.styles}</div></div>
            <div><div className="text-neutral-500 text-xs mb-1">{t('jsFiles')}</div><div className="font-bold">{config.scripts}</div></div>
          </div>
        </div>
        {assetsLoaded && loadedAssets.length > 0 && (
          <div className="border border-neutral-300 p-3 sm:p-4">
            <h2 className="text-xs sm:text-sm font-mono font-bold text-black mb-3 uppercase tracking-wide">{t('loadedImages')} ({loadedAssets.length})</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">{loadedAssets.map((asset, idx) => (<img key={idx} src={asset.src} alt={`Asset ${idx + 1}`} className="w-full h-12 sm:h-16 object-cover border border-neutral-300" loading="eager" />))}</div>
          </div>
        )}

        <footer className="border-t border-neutral-200 pt-6 mt-12 text-xs font-mono text-neutral-500 space-y-1">
          <p>{t('footer')}</p>
          <p>
            {t('createdBy')}{' '}
            <a href="https://tomasdevs.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-black hover:underline font-bold">
              Tomáš Štveráček
            </a>
            {' · '}
            <a href="https://github.com/tomasdevs" target="_blank" rel="noopener noreferrer" className="text-black hover:underline">
              GitHub
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default TestScenario;
