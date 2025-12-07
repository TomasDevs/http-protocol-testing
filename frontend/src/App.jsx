import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';
import Home from './pages/Home';
import TestLight from './pages/TestLight';
import TestHeavy from './pages/TestHeavy';
import TestMany from './pages/TestMany';
import Results from './pages/Results';
import NotFound from './pages/NotFound';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test/light" element={<TestLight />} />
          <Route path="/test/heavy" element={<TestHeavy />} />
          <Route path="/test/many" element={<TestMany />} />
          <Route path="/results" element={<Results />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
