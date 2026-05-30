import React from 'react';
import { Link } from 'react-router-dom';
import './ServiziPage.css';

const servizi = [
  {
    titolo: 'Servizi di Patronato',
    desc: 'Gestione completa delle pratiche previdenziali, infortuni sul lavoro e invalidita civile attraverso il Patronato ANMIL.',
    link: '/servizi/patronato',
    esterno: false,
  },
  {
    titolo: 'Intermediazione del Lavoro',
    desc: 'Supporto per la ricerca di lavoro, gestione dei contratti e orientamento professionale.',
    url: 'https://www.uidd.it/uidd/intermediazione-al-lavoro/',
    esterno: true,
  },
  {
    titolo: 'Associazione CeART',
    desc: 'Promozione sociale, gestione del 5 per mille e attivita culturali sul territorio.',
    url: 'https://www.associazioneceart.it/',
    esterno: true,
  },
  {
    titolo: 'Servizi CAF',
    desc: 'Dichiarazioni fiscali 730, calcolo ISEE, detrazioni e tutti i servizi del Centro di Assistenza Fiscale.',
    link: '/servizi/caf',
    esterno: false,
  },
  {
    titolo: 'Formazione Professionale',
    desc: 'Corsi di formazione, aggiornamento professionale e orientamento al lavoro per lavoratori e imprese.',
    url: 'https://www.usacademy.it/',
    esterno: true,
  },
  {
    titolo: 'Lavoro Domestico',
    desc: 'Assistenza completa per assunzione e gestione di colf, badanti e babysitter.',
    url: 'https://www.uidd.it/uidd/lavoro-domestico/',
    esterno: true,
  },
  {
    titolo: 'CAA – Centro Assistenza Agricola',
    desc: 'Pratiche PAC, UMA, PSR e tutta l\'assistenza per il settore agricolo e agroalimentare.',
    url: 'https://www.caauipa.it/',
    esterno: true,
  },
  {
    titolo: 'Servizi di Patronato ANMIL',
    desc: 'Tutela degli infortunati sul lavoro e dei tecnopatici, pensioni e prestazioni INPS e INAIL.',
    link: '/servizi/patronato',
    esterno: false,
  },
];

const ServiziPage = () => {
  return (
    <div>

      {/* HEADER PAGINA */}
      <div style={{ background: 'linear-gradient(90deg, #c07800, #f0a500)', padding: '36px 0' }}>
        <div className="container">
          <h1 style={{ color: '#fff', fontSize: '1.8rem', fontWeight: '800' }}>Servizi</h1>
          <p style={{ color: '#fde8a0', fontSize: '0.95rem', marginTop: '6px' }}>
            Tutti i servizi offerti da UIPA
          </p>
        </div>
      </div>

      {/* GRIGLIA SERVIZI */}
      <section className="servizi-page">
        <div className="container">
          <h2 className="section-title">Cosa offriamo</h2>
          <div className="servizi-page__grid">
            {servizi.map((s, idx) => {
              if (s.esterno) {
                return (
                    <a
                    key={idx}
                    href={s.url}
                    className="servizio-page-card servizio-page-card--esterno"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h3 className="servizio-page-card__title">{s.titolo}</h3>
                    <p className="servizio-page-card__desc">{s.desc}</p>
                    <span className="servizio-page-card__cta">Vai al sito</span>
                  </a>
                );
              }
              return (
                <Link
                  key={idx}
                  to={s.link}
                  className="servizio-page-card"
                >
                  <h3 className="servizio-page-card__title">{s.titolo}</h3>
                  <p className="servizio-page-card__desc">{s.desc}</p>
                  <span className="servizio-page-card__cta">Scopri di piu</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
};

export default ServiziPage;
