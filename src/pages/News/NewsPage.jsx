import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import { useLocation } from 'react-router-dom';
import './NewsPage.css';

import { API_URL } from '../../config';

const categorie = ['Tutte', 'Fisco', 'Lavoro', 'Pensioni', 'Famiglia', 'Normativa', 'Agricoltura', 'Immobili e Terreni', 'Disabilita', 'Bandi', 'Turismo', 'Ambiente', 'Leggi e Regolamenti', 'I Nostri Tutorial', 'Eventi'];

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriaAttiva, setCategoriaAttiva] = useState('Tutte');
  const [ricerca, setRicerca] = useState('');
  const location = useLocation();

  useEffect(() => {
    fetch(`${API_URL}/api/news`)
      .then(res => res.json())
      .then(data => {
        setNews(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const newsFiltrate = news.filter(n => {
    const matchCat = categoriaAttiva === 'Tutte' || n.categoria === categoriaAttiva;
    const matchRicerca = n.titolo.toLowerCase().includes(ricerca.toLowerCase()) ||
      n.estratto.toLowerCase().includes(ricerca.toLowerCase());
    return matchCat && matchRicerca;
  });

  const formatData = (dataString) => {
    const d = new Date(dataString);
    return d.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <PageTemplate titolo="News" sottotitolo="Notizie e aggiornamenti da UIPA" immagine={require('../../assets/heronewsall.jpg')} >

      <div className="news-page__ricerca">
        <input
          type="text"
          placeholder="Cerca una notizia..."
          value={ricerca}
          onChange={(e) => setRicerca(e.target.value)}
          className="news-page__input"
        />
      </div>

      <div className="news-page__filtri">
        {categorie.map((cat) => (
          <button
            key={cat}
            className={`news-page__filtro ${categoriaAttiva === cat ? 'news-page__filtro--attivo' : ''}`}
            onClick={() => setCategoriaAttiva(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="news-page__risultati">Caricamento news...</p>
      ) : (
        <>
          <p className="news-page__risultati">
            {newsFiltrate.length} {newsFiltrate.length === 1 ? 'articolo trovato' : 'articoli trovati'}
          </p>

          <div className="news-page__grid">
            {newsFiltrate.map((n) => (
              <Link key={n.id} to={`/news/${n.slug}`} className="news-page__card">
                {n.immagine && (
                  <div className="news-page__card-img">
                    <img src={`${API_URL}${n.immagine}`} alt={n.titolo} />
                  </div>
                )}
                <span className="news-page__cat">{n.categoria}</span>
                <h3 className="news-page__titolo">{n.titolo}</h3>
                <p className="news-page__estratto">{n.estratto}</p>
                <div className="news-page__footer">
                  <span className="news-page__data">{formatData(n.data)}</span>
                  <span className="news-page__leggi">Leggi →</span>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      <div className="news-page__banner">
        <div>
          <h3>Vuoi rimanere aggiornato?</h3>
          <p>Seguici su Facebook per ricevere tutte le ultime notizie da UIPA.</p>
        </div>
        <a
          href="https://www.facebook.com/uipaitalia/"
          target="_blank"
          rel="noopener noreferrer"
          className="news-page__fb"
        >
          Seguici su Facebook
        </a>
      </div>

    </PageTemplate>
  );
};

export default NewsPage;