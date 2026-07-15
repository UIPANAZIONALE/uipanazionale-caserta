import React from 'react';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import './ConvenzioniPage.css';

const convenzioni = [
  {
    categoria: 'Pensionati',
    desc: 'La UIPA Nazionale ha sottoscritto la convenzione con l\'INPS Nazionale per la riscossione dei contributi sindacali sulle prestazioni pensionistiche ai sensi della Legge 11 agosto 1972, n. 485 e successive modifiche ed integrazioni.',
    legge: 'L. 11 agosto 1972, n. 485',
  },
  {
    categoria: 'Prestazioni Temporanee',
    desc: 'La UIPA Nazionale fornisce assistenza sindacale a tutte le categorie di lavoratori dipendenti. Ha sottoscritto con l\'INPS Nazionale la convenzione per la riscossione dei contributi associativi sulle prestazioni temporanee.',
    legge: 'Art. 18, L. 23 luglio 1991, n. 223',
  },
  {
    categoria: 'Lavoratori Agricoli',
    desc: 'La UIPA Nazionale ha sottoscritto la convenzione con l\'INPS Nazionale per la riscossione dei contributi associativi sulle prestazioni di disoccupazione agricola.',
    legge: 'Art. 2, L. 27 dicembre 1973, n. 852',
  },
  {
    categoria: 'Coltivatori Diretti e Imprenditori Agricoli Professionali',
    desc: 'La UIPA Nazionale ha sottoscritto con l\'INPS Nazionale la convenzione per la riscossione dei contributi associativi dei coltivatori diretti e degli imprenditori agricoli professionali.',
    legge: 'Art. 11, L. 12 marzo 1968, n. 334',
  },
  {
    categoria: 'Artigiani e Commercianti',
    desc: 'La UIPA ha sottoscritto con l\'INPS Nazionale la convenzione per la riscossione dei contributi associativi e per l\'assistenza contrattuale degli artigiani e dei commercianti.',
    legge: 'L. 4 giugno 1973, n. 311',
  },
];

const ConvenzioniPage = () => (
  <PageTemplate titolo="Convenzioni" sottotitolo="Convenzioni INPS attive con UIPA Nazionale"
  immagine={require('../../assets/hero-convenzioni.png')}>

    {/* Intro */}
    <div className="convenzioni__intro">
      <div className="convenzioni__intro-testo">
        <p>
          Sono attive le convenzioni tra l'INPS e l'Unione Italiana Professionalita
          in Agricoltura (UIPA) per la riscossione dei contributi nelle seguenti categorie.
        </p>
        <p>
          Per informazioni contatta la sede di Caserta o visita il sito INPS.
        </p>
        <a
          href="https://www.inps.it"
          target="_blank"
          rel="noopener noreferrer"
          className="convenzioni__inps-link"
        >
          Vai al sito INPS
        </a>
      </div>
      <div className="convenzioni__intro-cta">
        <h3>Non sei ancora socio?</h3>
        <p>Iscriviti a UIPA e accedi subito a tutti i vantaggi delle convenzioni.</p>
        <a href="/tesseramento" className="convenzioni__btn">
          Tesserati ora
        </a>
      </div>
    </div>

    {/* Convenzioni */}
    <div className="convenzioni__lista">
      {convenzioni.map((c, idx) => (
        <div key={idx} className="convenzioni__card">
          <div className="convenzioni__card-header">
            <span className="convenzioni__numero">{String(idx + 1).padStart(2, '0')}</span>
            <h3>{c.categoria}</h3>
          </div>
          <div className="convenzioni__card-body">
            <p>{c.desc}</p>
            <span className="convenzioni__legge">{c.legge}</span>
          </div>
        </div>
      ))}
    </div>

    {/* Banner contatti */}
    <div className="convenzioni__banner">
      <div className="convenzioni__banner-testo">
        <h3>Hai bisogno di assistenza?</h3>
        <p>
          Contatta la sede di Roma per informazioni sulle convenzioni attive
          e su come accedere ai servizi.
        </p>
      </div>
      <div className="convenzioni__banner-contacts">
        <a href="tel:0823320088">Tel: 0823 320088</a>
        <a  href="mailto:uipanazionale@gmail.com">uipanazionale@gmail.com</a>
      </div>
    </div>

  </PageTemplate>
);

export default ConvenzioniPage;
