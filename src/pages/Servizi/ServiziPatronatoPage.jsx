import React from 'react';
import { Link, useParams } from 'react-router-dom';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import patronato from '../../data/patronato';
import './ServiziPatronatoPage.css';

// Vista dettaglio singolo servizio
const DettaglioServizio = ({ categoriaId, servizioId }) => {
  const categoria = patronato.find(c => c.id === categoriaId);
  const servizio = categoria?.servizi.find(s => s.id === servizioId);

  if (!servizio) return null;

  return (
    <PageTemplate titolo={servizio.titolo} sottotitolo={categoria.titolo}>
      <div className="dettaglio__back">
        <Link to={`/servizi/patronato/${categoriaId}`}>← Torna a {categoria.titolo}</Link>
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
        <p>Il patronato UIPA offre assistenza completamente gratuita.</p>
        <Link to="/contatti" className="patronato__btn">Contattaci</Link>
      </div>
    </PageTemplate>
  );
};

// Vista lista servizi di una categoria
const CategoriaServizi = ({ categoriaId }) => {
  const categoria = patronato.find(c => c.id === categoriaId);
  if (!categoria) return null;

  return (
    <PageTemplate titolo={categoria.titolo} sottotitolo="Servizi di Patronato UIPA">
      <div className="dettaglio__back">
        <Link to="/servizi/patronato">← Torna ai Servizi di Patronato</Link>
      </div>
      <p className="categoria__desc">{categoria.desc}</p>
      <div className="categoria__grid">
        {categoria.servizi.map((s) => (
          <Link
            key={s.id}
            to={`/servizi/patronato/${categoriaId}/${s.id}`}
            className="categoria__card"
          >
            <h3>{s.titolo}</h3>
            <p>{s.desc}</p>
            <span className="categoria__leggi">Leggi di piu →</span>
          </Link>
        ))}
      </div>
    </PageTemplate>
  );
};

// Vista principale patronato
const ServiziPatronatoPage = () => {
  const { categoriaId, servizioId } = useParams();

  if (servizioId) return <DettaglioServizio categoriaId={categoriaId} servizioId={servizioId} />;
  if (categoriaId) return <CategoriaServizi categoriaId={categoriaId} />;

  return (
    <PageTemplate titolo="Servizi di Patronato" sottotitolo="Patronato ANMIL – Assistenza gratuita per i cittadini">

      <div className="patronato__intro">
        <div className="patronato__intro-testo">
          <p>
            Il Patronato UIPA offre assistenza gratuita a tutti i cittadini per
            la tutela dei diritti previdenziali, assistenziali e assicurativi.
            I nostri operatori ti seguono in ogni fase della pratica.
          </p>
          <p>
            Il servizio e completamente <strong>gratuito</strong> per il cittadino,
            finanziato dallo Stato attraverso i fondi di patronato.
          </p>
        </div>
        <div className="patronato__intro-box">
          <h3>Servizio gratuito</h3>
          <p>Vieni in sede o contattaci per un appuntamento.</p>
          <Link to="/contatti" className="patronato__btn">Prenota appuntamento</Link>
        </div>
      </div>

      <h2 className="section-title">Aree di intervento</h2>
      <div className="patronato__categorie">
        {patronato.map((cat) => (
          <Link
            key={cat.id}
            to={`/servizi/patronato/${cat.id}`}
            className="patronato__categoria-card"
          >
            <h3>{cat.titolo}</h3>
            <p>{cat.desc}</p>
            <span className="patronato__categoria-num">
              {cat.servizi.length} servizi disponibili
            </span>
          </Link>
        ))}
      </div>

    </PageTemplate>
  );
};

export default ServiziPatronatoPage;