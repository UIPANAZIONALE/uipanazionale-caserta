import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import caf from '../../data/caf';
import './ServiziCafPage.css';
import BoxUnicaf from '../../components/BoxUnicaf/BoxUnicaf';

// Vista dettaglio singolo servizio CAF
const DettaglioServizioCaf = ({ servizioId }) => {
  const servizio = caf.servizi.find(s => s.id === servizioId);
  if (!servizio) return null;

  return (
    <PageTemplate titolo={servizio.titolo} sottotitolo="Servizi CAF UIPA"
    >
      <div className="dettaglio__back">
        <Link to="/servizi/caf">← Torna ai Servizi CAF</Link>
      </div>
      <div className="dettaglio__contenuto">
        {servizio.sezioni.map((sezione, idx) => (
          <div key={idx} className="dettaglio__sezione">
            <h3>{sezione.titolo}</h3>
            <p>{sezione.testo}</p>
          </div>
        ))}
      </div>
      <div className="dettaglio__cta">
        <h3>Hai bisogno di assistenza per questa pratica?</h3>
        <p>Il CAF UIPA offre assistenza professionale per tutti i servizi fiscali.</p>
        <Link to="/contatti" className="caf__btn">Contattaci</Link>
      </div>
    </PageTemplate>
  );
};

// Vista principale CAF
const ServiziCafPage = () => {
  const { servizioId } = useParams();
  const [ricerca, setRicerca] = useState('');

  if (servizioId) return <DettaglioServizioCaf servizioId={servizioId} />;

  const serviziFiltrati = caf.servizi.filter(s =>
    s.titolo.toLowerCase().includes(ricerca.toLowerCase()) ||
    s.desc.toLowerCase().includes(ricerca.toLowerCase())
  );

  return (
    <PageTemplate titolo="Servizi CAF" sottotitolo="Centro di Assistenza Fiscale UIPA"
    immagine={require('../../assets/heropatronato.png')}>

      {/* INTRO */}
      <div className="caf__intro">
        <div className="caf__intro-testo">
          <p>{caf.desc}</p>
        </div>
        <div className="caf__intro-box">
          <h3>Assistenza professionale</h3>
          <p>I nostri esperti fiscali sono a disposizione per guidarti in ogni pratica.</p>
          <Link to="/contatti" className="caf__btn">Prenota appuntamento</Link>
        </div>
      </div>

      {/* RICERCA */}
      <div className="caf__ricerca">
        <input
          type="text"
          placeholder="Cerca un servizio..."
          value={ricerca}
          onChange={(e) => setRicerca(e.target.value)}
          className="caf__input"
        />
      </div>

      {/* GRIGLIA SERVIZI */}
      <h2 className="section-title">I nostri servizi fiscali</h2>
      <div className="caf__grid">
        {serviziFiltrati.map((s) => (
          <Link
            key={s.id}
            to={`/servizi/caf/${s.id}`}
            className="caf__card"
          >
            <h3>{s.titolo}</h3>
            <p>{s.desc}</p>
            <span className="caf__leggi">Leggi di piu →</span>
          </Link>
        ))}
      </div>

      {/* BANNER */}
      <div className="caf__banner">
        <div>
          <h3>Non trovi il servizio che cerchi?</h3>
          <p>Contattaci per ricevere assistenza su qualsiasi pratica fiscale o previdenziale.</p>
        </div>
        <div className="caf__banner-contacts">
          <a href="tel:0823320088">Tel: 0823 320088</a>
          <a href="mailto:info@uipa.it">info@uipa.it</a>
        </div>
      </div>
      <BoxUnicaf layout="banner" />
    </PageTemplate>
  );
};

export default ServiziCafPage;