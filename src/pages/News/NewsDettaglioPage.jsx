import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import news from '../../data/news';
import './NewsDettaglioPage.css';

const NewsDettaglioPage = () => {
  const { slug } = useParams();
  const articolo = news.find(n => n.slug === slug);

  if (!articolo) {
    return (
      <PageTemplate titolo="Articolo non trovato">
        <p>L'articolo che cerchi non esiste o e stato rimosso.</p>
        <Link to="/news" className="news-det__back-btn">← Torna alle news</Link>
      </PageTemplate>
    );
  }

  // Articoli correlati (stessa categoria, escluso quello attuale)
  const correlati = news
    .filter(n => n.categoria === articolo.categoria && n.id !== articolo.id)
    .slice(0, 3);

  return (
    <PageTemplate titolo={articolo.titolo} sottotitolo={articolo.categoria}>

      {/* BACK + META */}
      <div className="news-det__meta">
        <Link to="/news" className="news-det__back">← Tutte le news</Link>
        <div className="news-det__info">
          <span className="news-det__cat">{articolo.categoria}</span>
          <span className="news-det__data">{articolo.data}</span>
        </div>
      </div>

      {/* ESTRATTO */}
      <p className="news-det__estratto">{articolo.estratto}</p>

      {/* CONTENUTO */}
      <div className="news-det__contenuto">
        {articolo.contenuto.map((sezione, idx) => (
          <div key={idx} className="news-det__sezione">
            <h2>{sezione.titolo}</h2>
            <p>{sezione.testo}</p>
          </div>
        ))}
      </div>

      {/* CTA CONTATTI */}
      <div className="news-det__cta">
        <h3>Hai bisogno di assistenza?</h3>
        <p>I nostri esperti sono a disposizione per aiutarti su questo argomento.</p>
        <Link to="/contatti" className="news-det__btn">Contattaci</Link>
      </div>

      {/* ARTICOLI CORRELATI */}
      {correlati.length > 0 && (
        <div className="news-det__correlati">
          <h2 className="section-title">Articoli correlati</h2>
          <div className="news-det__correlati-grid">
            {correlati.map((n) => (
              <Link key={n.id} to={`/news/${n.slug}`} className="news-det__correlato-card">
                <span className="news-det__correlato-cat">{n.categoria}</span>
                <h3>{n.titolo}</h3>
                <span className="news-det__correlato-data">{n.data}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

    </PageTemplate>
  );
};

export default NewsDettaglioPage;