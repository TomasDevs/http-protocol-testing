import { useState, useEffect } from 'react';
import { detectProtocol } from '../utils/metrics';
import { useLanguage } from '../i18n/LanguageContext';

function ProtocolDetector() {
  const [protocol, setProtocol] = useState('unknown');
  const { t } = useLanguage();

  useEffect(() => {
    const detected = detectProtocol();
    setProtocol(detected);
  }, []);

  const getProtocolLabel = (p) => {
    if (p === 'HTTP/3') return t('http3');
    if (p === 'HTTP/2') return t('http2');
    if (p === 'HTTP/1.1') return t('http1');
    return t('unknown').toUpperCase();
  };

  return (
    <div className="border border-neutral-900 bg-black text-white px-4 py-2 font-mono text-sm inline-block">
      <span className="text-neutral-400">{t('protocol')}:</span> <span className="font-bold">{getProtocolLabel(protocol)}</span>
    </div>
  );
}

export default ProtocolDetector;
