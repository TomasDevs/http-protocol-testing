import { useLanguage } from '../i18n/LanguageContext';

function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-neutral-100 border border-neutral-300">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 text-sm font-mono transition-colors cursor-pointer ${
          language === 'en'
            ? 'bg-black text-white'
            : 'bg-transparent text-neutral-600 hover:text-black'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('cz')}
        className={`px-3 py-1 text-sm font-mono transition-colors cursor-pointer ${
          language === 'cz'
            ? 'bg-black text-white'
            : 'bg-transparent text-neutral-600 hover:text-black'
        }`}
      >
        CZ
      </button>
    </div>
  );
}

export default LanguageSwitcher;
