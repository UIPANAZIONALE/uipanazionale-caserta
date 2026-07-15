import React, { useState } from 'react';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import './CcnlPage.css';

const contratti = [
  {
    id: 1,
    titolo: 'CCNL Colf e Badanti',
    descrizione: 'Contratto Collettivo Nazionale di Lavoro per i lavoratori domestici — colf, badanti e babysitter. Disciplina i rapporti di lavoro domestico in Italia.',
    aggiornamento: 'Luglio 2021',
    categorie: ['Colf', 'Badanti', 'Babysitter', 'Lavoro domestico'],
    file: require('../../assets/19471-colf-e-badanti.pdf'),
    nome: '19471-colf-e-badanti.pdf',
  },
  {
    id: 2,
    titolo: 'CCNL Contratto Rinnovato',
    descrizione: 'Versione aggiornata del Contratto Collettivo Nazionale di Lavoro con le ultime modifiche e integrazioni apportate dalle parti sociali.',
    aggiornamento: 'Luglio 2021',
    categorie: ['Aggiornamento', 'Rinnovo contrattuale'],
    file: require('../../assets/19470-contratto-rinnovato.pdf'),
    nome: '19470-contratto-rinnovato.pdf',
  },
];

const CcnlPage = () => {
  const [aperto, setAperto] = useState(null);

  return (
    <PageTemplate titolo="CCNL" sottotitolo="Contratti Collettivi Nazionali di Lavoro" immagine={require('../../assets/hero-ccnl.png')}>

      {/* INTRO */}
      <div className="ccnl__intro">
        <div className="ccnl__intro-testo">
          <p>
            UIPA si occupa della contrattazione collettiva per i lavoratori autonomi
            del settore agricolo e agroalimentare. Di seguito trovi i contratti
            collettivi nazionali di lavoro disponibili per il download.
          </p>
          <p>
            Per informazioni o chiarimenti sui contratti contatta la sede di Caserta.
          </p>
        </div>
        <div className="ccnl__intro-box">
          <h3>Hai bisogno di assistenza?</h3>
          <p>I nostri esperti sono a disposizione per spiegarti i contenuti dei contratti.</p>
          <a href="/contatti" className="ccnl__btn">Contattaci</a>
        </div>
      </div>

      {/* CONTRATTI */}
      <h2 className="section-title">Contratti disponibili</h2>
      <div className="ccnl__lista">
        {contratti.map((c) => (
          <div key={c.id} className="ccnl__card">

            <div className="ccnl__card-top">
              <div className="ccnl__card-info">
                <span className="ccnl__badge">CCNL</span>
                <h3>{c.titolo}</h3>
                <p>{c.descrizione}</p>
                <div className="ccnl__categorie">
                  {c.categorie.map((cat, idx) => (
                    <span key={idx} className="ccnl__tag">{cat}</span>
                  ))}
                </div>
              </div>
              <div className="ccnl__card-azioni">
                <p className="ccnl__aggiornamento">
                  Aggiornato: <strong>{c.aggiornamento}</strong>
                </p>
                <a
                  href={c.file}
                  download={c.nome}
                  className="ccnl__download"
                >
                  Scarica PDF
                </a>
                <button
                  className="ccnl__preview-btn"
                  onClick={() => setAperto(aperto === c.id ? null : c.id)}
                >
                  {aperto === c.id ? 'Chiudi anteprima' : 'Visualizza'}
                </button>
              </div>
            </div>

            {aperto === c.id && (
              <div className="ccnl__preview">
                <iframe
                  src={c.file}
                  title={c.titolo}
                  width="100%"
                  height="600px"
                  style={{ border: 0 }}
                />
              </div>
            )}

          </div>
        ))}
      </div>

      {/* BANNER */}
      <div className="ccnl__banner">
        <div>
          <h3>Non trovi il contratto che cerchi?</h3>
          <p>Contatta la sede di Roma per ricevere assistenza sulla contrattazione collettiva.</p>
        </div>
        <div className="ccnl__banner-contacts">
          <a href="tel:0823320088">Tel: 0823 320088</a>
          <a href="mailto:info@uipa.it">info@uipa.it</a>
        </div>
      </div>

    </PageTemplate>
  );
};

export default CcnlPage;