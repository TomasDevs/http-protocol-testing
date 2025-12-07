import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';

function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start mb-8 sm:mb-12 border-b border-neutral-200 pb-6 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-mono font-bold text-black mb-2">
              {t('title')}
            </h1>
            <p className="text-sm text-neutral-600 max-w-2xl font-mono">
              {t('subtitle')} <a href="#protocol-switching" className="text-black hover:underline font-bold">→ {t('howToSwitch')}</a>
            </p>
          </div>
          <LanguageSwitcher />
        </div>

        {/* Protocol Table */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-base sm:text-lg font-mono font-bold text-black mb-4 uppercase tracking-wide">
            {t('protocols')}
          </h2>
          <div className="border border-neutral-300 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-300 bg-neutral-50">
                  <th className="text-left p-2 sm:p-3 text-xs font-mono font-bold uppercase whitespace-nowrap">{t('protocolHeader')}</th>
                  <th className="text-left p-2 sm:p-3 text-xs font-mono font-bold uppercase">{t('featuresHeader')}</th>
                </tr>
              </thead>
              <tbody className="font-mono text-xs sm:text-sm">
                <tr className="border-b border-neutral-200">
                  <td className="p-2 sm:p-3 font-bold whitespace-nowrap">{t('http1')}</td>
                  <td className="p-2 sm:p-3 text-neutral-700">· {t('http1_feature1')} · {t('http1_feature2')} · {t('http1_feature3')} · {t('http1_feature4')}</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="p-2 sm:p-3 font-bold whitespace-nowrap">{t('http2')}</td>
                  <td className="p-2 sm:p-3 text-neutral-700">· {t('http2_feature1')} · {t('http2_feature2')} · {t('http2_feature3')} · {t('http2_feature4')}</td>
                </tr>
                <tr>
                  <td className="p-2 sm:p-3 font-bold whitespace-nowrap">{t('http3')}</td>
                  <td className="p-2 sm:p-3 text-neutral-700">· {t('http3_feature1')} · {t('http3_feature2')} · {t('http3_feature3')} · {t('http3_feature4')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Test Scenarios */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-base sm:text-lg font-mono font-bold text-black mb-4 uppercase tracking-wide">
            {t('testScenarios')}
          </h2>
          <div className="space-y-0 border-2 border-black">
            <Link to="/test/light" className="block p-4 sm:p-6 border-b-2 border-black hover:bg-black hover:text-white transition-colors group">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-mono font-bold text-base sm:text-lg mb-2">{t('lightTest')}</h3>
                  <p className="font-mono text-xs sm:text-sm opacity-70">{t('lightTestDesc')}</p>
                </div>
                <span className="font-mono text-xl sm:text-2xl">→</span>
              </div>
            </Link>
            <Link to="/test/heavy" className="block p-4 sm:p-6 border-b-2 border-black hover:bg-black hover:text-white transition-colors group">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-mono font-bold text-base sm:text-lg mb-2">{t('heavyTest')}</h3>
                  <p className="font-mono text-xs sm:text-sm opacity-70">{t('heavyTestDesc')}</p>
                </div>
                <span className="font-mono text-xl sm:text-2xl">→</span>
              </div>
            </Link>
            <Link to="/test/many" className="block p-4 sm:p-6 hover:bg-black hover:text-white transition-colors group">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-mono font-bold text-base sm:text-lg mb-2">{t('manyTest')}</h3>
                  <p className="font-mono text-xs sm:text-sm opacity-70">{t('manyTestDesc')}</p>
                </div>
                <span className="font-mono text-xl sm:text-2xl">→</span>
              </div>
            </Link>
          </div>
        </section>

        {/* Protocol Switching Instructions */}
        <section id="protocol-switching" className="mb-8 sm:mb-12">
          <h2 className="text-base sm:text-lg font-mono font-bold text-black mb-4 uppercase tracking-wide">{t('protocolSwitching')}</h2>
          <div className="border-2 border-black bg-white">
            <div className="p-4 sm:p-5 border-b-2 border-black bg-neutral-50">
              <h3 className="font-mono font-bold text-sm mb-2">HTTP/3 - {t('defaultVersion')}</h3>
              <p className="font-mono text-xs text-neutral-700">{t('http3Instructions')}</p>
            </div>
            <div className="p-4 sm:p-5 border-b-2 border-black">
              <h3 className="font-mono font-bold text-sm mb-2">HTTP/2 - {t('fallbackVersion')}</h3>
              <ol className="font-mono text-xs text-neutral-700 space-y-1">
                <li>1. {t('http2Step1')}</li>
                <li>2. {t('http2Step2')}</li>
                <li>3. {t('http2Step3')}</li>
              </ol>
            </div>
            <div className="p-4 sm:p-5">
              <h3 className="font-mono font-bold text-sm mb-2">HTTP/1.1 - {t('localhostOnly')}</h3>
              <p className="font-mono text-xs text-neutral-700 mb-2">{t('http1Instructions')}</p>
              <div className="bg-yellow-50 border border-yellow-600 px-3 py-2 mt-2">
                <span className="font-mono text-xs font-bold text-yellow-800">⚠️ {t('warning')}:</span>
                <span className="font-mono text-xs text-yellow-700 ml-1">{t('http1Warning')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Instructions */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-base sm:text-lg font-mono font-bold text-black mb-4 uppercase tracking-wide">{t('howToTest')}</h2>
          <ol className="space-y-2 font-mono text-xs sm:text-sm text-neutral-700 border border-neutral-300 p-3 sm:p-4 bg-neutral-50">
            <li>1. {t('instruction1')}</li>
            <li>2. {t('instruction2')}</li>
            <li>3. {t('instruction3')}</li>
            <li>4. {t('instruction4')}</li>
            <li>5. {t('instruction5')}</li>
            <li>6. {t('instruction6')}</li>
            <li>7. {t('instruction7')}</li>
            <li>8. {t('instruction8')}</li>
          </ol>
        </section>

        <div className="mb-8 sm:mb-12">
          <Link to="/results" className="inline-block bg-black text-white px-4 sm:px-6 py-2 sm:py-3 font-mono text-xs sm:text-sm uppercase tracking-wide hover:bg-neutral-800 transition-colors border border-black">
            {t('viewResults')} →
          </Link>
        </div>

        <footer className="border-t border-neutral-200 pt-6 text-xs font-mono text-neutral-500 space-y-1">
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

export default Home;
