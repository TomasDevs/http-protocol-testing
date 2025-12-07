import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';

function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8 text-center">
        <div className="flex justify-end mb-8">
          <LanguageSwitcher />
        </div>

        <div className="border-2 border-black p-6 sm:p-8 md:p-12 bg-white">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-5xl sm:text-6xl font-mono font-bold text-black mb-4">404</h1>
            <div className="h-1 w-16 sm:w-24 bg-black mx-auto mb-4 sm:mb-6"></div>
            <h2 className="text-xl sm:text-2xl font-mono font-bold text-black mb-2 mb-4">{t('pageNotFound')}</h2>
            <p className="font-mono text-xs sm:text-sm text-neutral-600 mb-6 sm:mb-8">
              {t('pageNotFoundDesc')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              to="/"
              className="inline-block bg-black text-white px-4 sm:px-6 py-2 sm:py-3 font-mono text-xs sm:text-sm uppercase tracking-wide hover:bg-neutral-800 transition-colors border-2 border-black cursor-pointer"
            >
              ← {t('backToHome')}
            </Link>
            <Link
              to="/results"
              className="inline-block bg-white text-black px-4 sm:px-6 py-2 sm:py-3 font-mono text-xs sm:text-sm uppercase tracking-wide hover:bg-black hover:text-white transition-colors border-2 border-black cursor-pointer"
            >
              {t('viewResults')} →
            </Link>
          </div>
        </div>

        <footer className="mt-8 sm:mt-12 text-xs font-mono text-neutral-500 space-y-1">
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

export default NotFound;
