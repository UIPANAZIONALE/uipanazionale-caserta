import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';


import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './pages/Home/HomePage';
import ChiSiamoPage from './pages/ChiSiamo/ChiSiamoPage';
import ServiziPage from './pages/Servizi/ServiziPage';
import ContattiPage from './pages/Contatti/ContattiPage';
import ConvenzioniPage from './pages/Convenzioni/ConvenzioniPage';
import ApriUnaSedePage from './pages/ApriUnaSede/ApriUnaSedePage';
import CcnlPage from './pages/Ccnl/CcnlPage';
import TesseramentoPage from './pages/Tesseramento/TesseramentoPage';
import SediPage from './pages/Sedi/SediPage';
import DoveSiamoPage from './pages/DoveSiamo/DoveSiamoPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import PresidentePage from './pages/ChiSiamo/PresidentePage';
import GiuntaEsecutivaPage from './pages/ChiSiamo/GiuntaEsecutivaPage';
import ServiziPatronatoPage from './pages/Servizi/ServiziPatronatoPage';
import ServiziCafPage from './pages/Servizi/ServiziCafPage';
import NewsPage from './pages/News/NewsPage';
import NewsDettaglioPage from './pages/News/NewsDettaglioPage';

const ComingSoon = ({ titolo }) => (
  <div style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto' }}>
    <h1 style={{ color: '#2e6b35', marginBottom: '16px' }}>{titolo}</h1>
    <p style={{ color: '#666' }}>Pagina in costruzione.</p>
  </div>
);

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chi-siamo" element={<ChiSiamoPage />} />
        <Route path="/chi-siamo/presidente" element={<PresidentePage />} />
        <Route path="/chi-siamo/giunta-esecutiva" element={<GiuntaEsecutivaPage />} />
        <Route path="/chi-siamo/direzione-nazionale" element={<ComingSoon titolo="La Direzione Nazionale" />} />
        <Route path="/servizi" element={<ServiziPage />} />
        <Route path="/servizi/patronato" element={<ServiziPatronatoPage />} />
        <Route path="/servizi/patronato/:categoriaId" element={<ServiziPatronatoPage />} />
<Route path="/servizi/patronato/:categoriaId/:servizioId" element={<ServiziPatronatoPage />} />
        <Route path="/servizi/caf" element={<ServiziCafPage />} />
<Route path="/servizi/caf/:servizioId" element={<ServiziCafPage />} />
        <Route path="/convenzioni" element={<ConvenzioniPage />} />
        <Route path="/apri-una-sede" element={<ApriUnaSedePage />} />
        <Route path="/ccnl" element={<CcnlPage />} />
        <Route path="/tesseramento" element={<TesseramentoPage />} />
        <Route path="/sedi" element={<SediPage />} />
        <Route path="/contatti" element={<ContattiPage />} />
        <Route path="/contatti/dove-siamo" element={<DoveSiamoPage />} />
        <Route path="/login" element={<ComingSoon titolo="Area Riservata" />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:slug" element={<NewsDettaglioPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;