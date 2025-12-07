import { useState, useEffect } from 'react';
import { collectMetrics, formatBytes, formatTime, waitForLoad } from '../utils/metrics';
import { saveResult } from '../utils/storage';
import { useLanguage } from '../i18n/LanguageContext';
import ProtocolDetector from './ProtocolDetector';

function PerformanceMonitor({ scenarioType }) {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    waitForLoad(() => {
      const collected = collectMetrics();
      setMetrics(collected);
      setLoading(false);
    });
  }, []);

  const handleSave = () => {
    if (metrics) {
      try {
        saveResult(metrics, scenarioType);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } catch (error) {
        alert('Failed to save result');
      }
    }
  };

  if (loading) {
    return (
      <div className="border border-neutral-300 p-6 bg-white">
        <div className="flex items-center">
          <div className="w-4 h-4 border-2 border-black border-t-transparent animate-spin mr-3"></div>
          <span className="font-mono text-sm">{t('collectingMetrics')}</span>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="border-2 border-black p-4 bg-white">
        <p className="font-mono text-sm">{t('failedToCollect')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-4">
        <ProtocolDetector />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        <MetricCard title={t('ttfb')} value={formatTime(metrics.ttfb)} />
        <MetricCard title={t('domLoadTime')} value={formatTime(metrics.domLoad)} />
        <MetricCard title={t('totalLoadTime')} value={formatTime(metrics.fullLoad)} />
        <MetricCard title={t('totalResources')} value={metrics.resourceCount} />
        <MetricCard title={t('transferredSize')} value={formatBytes(metrics.totalSize)} />
        <MetricCard title={t('httpProtocol')} value={metrics.protocol.toUpperCase()} />
      </div>

      <div>
        <button
          onClick={handleSave}
          disabled={saved}
          className={`px-4 sm:px-6 py-2 sm:py-3 font-mono text-xs sm:text-sm uppercase tracking-wide border-2 transition-colors cursor-pointer ${
            saved
              ? 'bg-black text-white border-black'
              : 'bg-white text-black border-black hover:bg-black hover:text-white'
          }`}
        >
          {saved ? `✓ ${t('saved')}` : t('saveResult')}
        </button>
      </div>

      <details className="border border-neutral-300 bg-neutral-50">
        <summary className="cursor-pointer font-mono text-xs sm:text-sm p-3 sm:p-4 hover:bg-neutral-100">
          {t('resourceDetails')} ({metrics.resources.length} {t('items')})
        </summary>
        <div className="p-3 sm:p-4 border-t border-neutral-300 bg-white overflow-x-auto">
          <table className="w-full font-mono text-xs">
            <thead>
              <tr className="border-b border-neutral-300">
                <th className="text-left p-2 uppercase">{t('type')}</th>
                <th className="text-left p-2 uppercase">{t('name')}</th>
                <th className="text-left p-2 uppercase">{t('duration')}</th>
                <th className="text-left p-2 uppercase">{t('size')}</th>
                <th className="text-left p-2 uppercase">{t('protocol')}</th>
              </tr>
            </thead>
            <tbody>
              {metrics.resources.map((resource, index) => (
                <tr key={index} className="border-b border-neutral-200 hover:bg-neutral-50">
                  <td className="p-2">{resource.type}</td>
                  <td className="p-2 truncate max-w-xs">{resource.name.split('/').pop()}</td>
                  <td className="p-2">{formatTime(resource.duration)}</td>
                  <td className="p-2">{formatBytes(resource.size)}</td>
                  <td className="p-2">{resource.protocol}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}

function MetricCard({ title, value }) {
  return (
    <div className="border border-neutral-300 p-3 sm:p-4 bg-white">
      <div className="text-xs font-mono text-neutral-500 mb-1 sm:mb-2 uppercase">{title}</div>
      <div className="text-base sm:text-xl font-mono font-bold text-black">{value}</div>
    </div>
  );
}

export default PerformanceMonitor;
