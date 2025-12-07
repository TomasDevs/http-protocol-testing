import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import ResultsChart from '../components/ResultsChart';
import { getResults, clearResults, exportToJSON, exportToCSV, downloadFile, getResultsByProtocol, getResultsByScenario } from '../utils/storage';
import { formatBytes, formatTime } from '../utils/metrics';

function Results() {
  const [results, setResults] = useState([]);
  const [scenarioFilter, setScenarioFilter] = useState('all');
  const [protocolFilter, setProtocolFilter] = useState('all');
  const { t } = useLanguage();

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = () => {
    const data = getResults();
    setResults(data);
  };

  const handleClear = () => {
    if (confirm(t('clearConfirm'))) {
      clearResults();
      setResults([]);
    }
  };

  const handleExportJSON = () => {
    const json = exportToJSON();
    downloadFile(json, 'http-test-results.json', 'application/json');
  };

  const handleExportCSV = () => {
    const csv = exportToCSV();
    downloadFile(csv, 'http-test-results.csv', 'text/csv');
  };

  const filteredResults = results.filter(result => {
    const scenarioMatch = scenarioFilter === 'all' || result.scenarioType === scenarioFilter;
    const protocolMatch = protocolFilter === 'all' || result.protocol === protocolFilter;
    return scenarioMatch && protocolMatch;
  });

  const byProtocol = getResultsByProtocol();
  const byScenario = getResultsByScenario();
  const scenarios = ['all', ...Object.keys(byScenario)];
  const protocols = ['all', ...Object.keys(byProtocol)];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-8 border-b border-neutral-200 pb-6 gap-4">
          <div>
            <Link to="/" className="font-mono text-sm text-black hover:underline mb-4 inline-block cursor-pointer">
              ← {t('backToHome')}
            </Link>
            <h1 className="text-xl sm:text-2xl font-mono font-bold text-black mb-2">{t('testResults')}</h1>
            <p className="text-sm font-mono text-neutral-600">{t('totalResults')}: {results.length}</p>
          </div>
          <LanguageSwitcher />
        </div>

        {results.length === 0 ? (
          <div className="border-2 border-neutral-300 p-8 bg-neutral-50">
            <p className="font-mono font-bold mb-2">{t('noResults')}</p>
            <p className="font-mono text-sm text-neutral-600 mb-4">{t('noResultsDesc')}</p>
            <Link to="/" className="font-mono text-sm text-black hover:underline cursor-pointer">
              {t('goToTests')} →
            </Link>
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            <div className="border border-neutral-300 p-4 sm:p-6 bg-neutral-50">
              <div className="flex flex-col lg:flex-row flex-wrap gap-4 items-start lg:items-end justify-between">
                <div className="flex gap-4 flex-wrap">
                  <div>
                    <label className="block text-xs font-mono font-bold mb-2 uppercase">{t('scenario')}</label>
                    <select value={scenarioFilter} onChange={(e) => setScenarioFilter(e.target.value)} className="border-2 border-black px-3 py-2 font-mono text-sm bg-white cursor-pointer">
                      {scenarios.map(scenario => (
                        <option key={scenario} value={scenario}>
                          {scenario === 'all' ? t('allScenarios') :
                           scenario === 'light' ? t('lightTest') :
                           scenario === 'heavy' ? t('heavyTest') :
                           scenario === 'many' ? t('manyTest') : scenario}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold mb-2 uppercase">{t('protocol')}</label>
                    <select value={protocolFilter} onChange={(e) => setProtocolFilter(e.target.value)} className="border-2 border-black px-3 py-2 font-mono text-sm bg-white cursor-pointer">
                      {protocols.map(protocol => (
                        <option key={protocol} value={protocol}>{protocol === 'all' ? t('allProtocols') : protocol}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 w-full lg:w-auto">
                  <button onClick={handleExportJSON} className="bg-black text-white px-3 sm:px-4 py-2 font-mono text-xs uppercase hover:bg-neutral-800 border-2 border-black cursor-pointer">{t('exportJSON')}</button>
                  <button onClick={handleExportCSV} className="bg-black text-white px-3 sm:px-4 py-2 font-mono text-xs uppercase hover:bg-neutral-800 border-2 border-black cursor-pointer">{t('exportCSV')}</button>
                  <button onClick={handleClear} className="bg-white text-black px-3 sm:px-4 py-2 font-mono text-xs uppercase hover:bg-black hover:text-white border-2 border-black cursor-pointer">{t('clearAll')}</button>
                </div>
              </div>
            </div>

            <ResultsChart data={filteredResults} scenarioFilter={scenarioFilter} />

            <div className="border border-neutral-300">
              <div className="p-4 border-b border-neutral-300 bg-neutral-50">
                <h2 className="font-mono font-bold text-sm uppercase">{t('detailedResults')}</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full font-mono text-xs">
                  <thead>
                    <tr className="border-b border-neutral-300 bg-neutral-50">
                      <th className="px-4 py-3 text-left uppercase">{t('timestamp')}</th>
                      <th className="px-4 py-3 text-left uppercase">{t('scenario')}</th>
                      <th className="px-4 py-3 text-left uppercase">{t('protocol')}</th>
                      <th className="px-4 py-3 text-left uppercase">{t('ttfb')}</th>
                      <th className="px-4 py-3 text-left uppercase">{t('domLoad')}</th>
                      <th className="px-4 py-3 text-left uppercase">{t('fullLoad')}</th>
                      <th className="px-4 py-3 text-left uppercase">{t('resources')}</th>
                      <th className="px-4 py-3 text-left uppercase">{t('size')}</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {filteredResults.map((result, index) => (
                      <tr key={result.id || index} className="border-b border-neutral-200 hover:bg-neutral-50">
                        <td className="px-4 py-3 text-neutral-600 whitespace-nowrap">{new Date(result.timestamp).toLocaleString()}</td>
                        <td className="px-4 py-3 font-bold">
                          {result.scenarioType === 'light' ? t('lightTest') :
                           result.scenarioType === 'heavy' ? t('heavyTest') :
                           result.scenarioType === 'many' ? t('manyTest') : result.scenarioType}
                        </td>
                        <td className="px-4 py-3 font-bold">{result.protocol}</td>
                        <td className="px-4 py-3">{formatTime(result.ttfb)}</td>
                        <td className="px-4 py-3">{formatTime(result.domLoad)}</td>
                        <td className="px-4 py-3">{formatTime(result.fullLoad)}</td>
                        <td className="px-4 py-3">{result.resourceCount}</td>
                        <td className="px-4 py-3">{formatBytes(result.totalSize)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
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

export default Results;
