import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import './NewsDettaglioPage.css';

import { API_URL } from '../../config';

const NewsDettaglioPage = () => {
  const { slug } = useParams();
  const [articolo, setArticolo] = useState(null);
  const [correlati, setCorrelati] = useState([]);
  const [loading, setLoading] = useState(true);
   const [currentServizio, setCurrentServizio] = useState(0);
const serviziUnicaf = ['ISEE Online', 'Modello 730', 'Patronato INPS', 'Successioni', 'CAF Online'];

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentServizio(prev => (prev + 1) % serviziUnicaf.length);
  }, 2000);
  return () => clearInterval(interval);
}, []);

  useEffect(() => {
    fetch(`${API_URL}/api/news/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error('Non trovato');
        return res.json();
      })
      .then(data => {
        setArticolo(data);
        return fetch(`${API_URL}/api/news`);
      })
      .then(res => res.json())
      .then(tutti => {
        const corr = tutti.filter(n => n.categoria === articolo?.categoria && n.slug !== slug).slice(0, 3);
        setCorrelati(corr);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const formatData = (dataString) => {
    if (!dataString) return '';
    const d = new Date(dataString);
    return d.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  if (loading) return (
    <PageTemplate titolo="Caricamento...">
      <p>Caricamento articolo in corso...</p>
    </PageTemplate>
  );

  if (!articolo) return (
    <PageTemplate titolo="Articolo non trovato">
      <p>L articolo che cerchi non esiste o e stato rimosso.</p>
      <Link to="/news" className="news-det__back-btn">← Torna alle news</Link>
    </PageTemplate>
  );

  return (
    <PageTemplate titolo={articolo.titolo} sottotitolo={articolo.categoria} immagine={require('../../assets/heronewsall.jpg')}>

      <div className="news-det__meta">
        <Link to="/news" className="news-det__back">← Tutte le news</Link>
        <div className="news-det__info">
          <span className="news-det__cat">{articolo.categoria}</span>
          <span className="news-det__data">{formatData(articolo.data)}</span>
        </div>
      </div>

      {/* LAYOUT ARTICOLO + SIDEBAR */}
      <div className="news-det__layout">

        {/* ARTICOLO */}
        <div className="news-det__articolo">
          {articolo.immagine && (
            <img
              src={`${API_URL}${articolo.immagine}`}
              alt={articolo.titolo}
              className="news-det__immagine"
            />
          )}

          <p className="news-det__estratto">{articolo.estratto}</p>

          <div className="news-det__contenuto">
  {Array.isArray(articolo.contenuto) && articolo.contenuto.map((sezione, idx) => (
    <div key={idx} className="news-sezione">
      {sezione.titolo && <h3 className="news-sezione__titolo">{sezione.titolo}</h3>}
      {sezione.immagine && sezione.immaginePos === 'sopra' && (
        <img src={`${API_URL}${sezione.immagine}`} alt="" className="news-sezione__img" />
      )}
      {sezione.immagine && (sezione.immaginePos === 'sinistra' || sezione.immaginePos === 'destra') ? (
        <div className={`news-sezione__float news-sezione__float--${sezione.immaginePos}`}>
          <img src={`${API_URL}${sezione.immagine}`} alt="" className="news-sezione__img-float" />
          {sezione.testo && <div dangerouslySetInnerHTML={{ __html: sezione.testo }} />}
        </div>
      ) : (
        sezione.testo && <div dangerouslySetInnerHTML={{ __html: sezione.testo }} />
      )}
      {sezione.immagine && sezione.immaginePos === 'sotto' && (
        <img src={`${API_URL}${sezione.immagine}`} alt="" className="news-sezione__img" />
      )}
    </div>
  ))}
</div>

          <div className="news-det__cta">
            <h3>Hai bisogno di assistenza?</h3>
            <p>I nostri esperti sono a disposizione per aiutarti su questo argomento.</p>
            <Link to="/contatti" className="news-det__btn">Contattaci</Link>
          </div>
        </div>

        {/* SIDEBAR */}
        <aside className="news-det__sidebar">
          <div className="sidebar__box">
            <h4>I nostri servizi</h4>
            <ul className="sidebar__links">
              <li><a href="https://unicafsrl.it" target="_blank" rel="noopener noreferrer">UNICAF – Pratiche fiscali online</a></li>
              <li><a href="https://www.caauipa.it" target="_blank" rel="noopener noreferrer">CAA UIPA – Pratiche agricole</a></li>
              <li><a href="https://ilpatronato.it/" target="_blank" rel="noopener noreferrer">Patronato INPAS</a></li>
              <li><a href="https://www.usacademy.it" target="_blank" rel="noopener noreferrer">US Academy – Formazione</a></li>
              <li><a href="https://www.uidd.it" target="_blank" rel="noopener noreferrer">UIDD – Intermediazione Lavoro</a></li>
            </ul>
          </div>
          <div className="sidebar__box sidebar__unicaf">
  <h4>UNICAF</h4>
  <p className="sidebar__unicaf-sub">Assistenza fiscale 100% online</p>
  <div className="sidebar__unicaf-servizio">
    <span key={currentServizio} className="sidebar__unicaf-testo">
      ✦ {serviziUnicaf[currentServizio]}
    </span>
  </div>
  <a
    href="https://unicafsrl.it"
    target="_blank"
    rel="noopener noreferrer"
    className="sidebar__unicaf-btn"
  >
    Scopri →
  </a>
  <span className="sidebar__unicaf-convenzione">servizio in convenzione</span>
</div>

          {correlati.length > 0 && (
            <div className="sidebar__box">
              <h4>Articoli correlati</h4>
              <div className="sidebar__correlati">
                {correlati.map((n) => (
                  <Link key={n.id} to={`/news/${n.slug}`} className="sidebar__correlato">
                    <span className="sidebar__correlato-cat">{n.categoria}</span>
                    <p>{n.titolo}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="sidebar__box sidebar__box--cta">
            <h4>Hai bisogno di aiuto?</h4>
            <p>Contatta la sede UIPA di Roma per assistenza gratuita.</p>
            <a href="tel:0823320088" className="sidebar__tel">0823 320088</a>
          </div>
        </aside>

      </div>

    </PageTemplate>
  );
};

export default NewsDettaglioPage;