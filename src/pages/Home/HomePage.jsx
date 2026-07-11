import React,{ useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../config';
import './HomePage.css';



const servizi = [
  { titolo: 'Servizi di Patronato', desc: 'Gestione pratiche previdenziali e infortuni sul lavoro.', link: '/servizi/patronato' },
  { titolo: 'Intermediazione Lavoro', desc: 'Supporto per la ricerca e gestione del lavoro.', url: 'https://www.uidd.it/uidd/intermediazione-al-lavoro/' },
  { titolo: 'Associazione CeART', desc: 'Promozione sociale e gestione del 5 per mille.', url: 'https://www.associazioneceart.it/' },
  { titolo: 'Servizi CAF', desc: '730, ISEE, detrazioni e dichiarazioni fiscali.', link: '/servizi/caf' },
  { titolo: 'Formazione Professionale', desc: 'Orientamento al lavoro e formazione continua.', url: 'https://www.usacademy.it/' },
  { titolo: 'Lavoro Domestico', desc: 'Assistenza per colf, badanti e babysitter.', url: 'https://www.uidd.it/uidd/lavoro-domestico/' },
  { titolo: 'CAA Agricoltura', desc: 'Pratiche PAC, UMA, PSR e agricoltura in genere.', url: 'https://www.caauipa.it/' },
  { titolo: 'Consulenza e Lavoro', desc: 'Supporto legale e consulenza sindacale.', link: '/servizi' },
];


const HomePage = () => {
  const [news, setNews] = useState([])
  const [bandi, setBandi] = useState([]);
  const [tutorial, setTutorial] = useState([]);
  const [eventi, setEventi] = useState([]);
  const [turismo, setTurismo] = useState([]);
  const [leggi, setLeggi] = useState([]);
  const [ambiente, setAmbiente] = useState([]);
  
useEffect(() => {
  fetch(`${API_URL}/api/news`)
    .then(res => res.json())
    .then(data => {
      const categorieSpeciali = ['Bandi', 'I Nostri Tutorial', 'Eventi', 'Turismo', 'Leggi e Regolamenti', 'Ambiente'];
      setNews(data.filter(n => !categorieSpeciali.includes(n.categoria)).slice(0, 3));
      setBandi(data.filter(n => n.categoria === 'Bandi').slice(0, 1));
      setTutorial(data.filter(n => n.categoria === 'I Nostri Tutorial').slice(0, 1));
      setEventi(data.filter(n => n.categoria === 'Eventi').slice(0, 1));
      setTurismo(data.filter(n => n.categoria === 'Turismo').slice(0, 1));
      setLeggi(data.filter(n => n.categoria === 'Leggi e Regolamenti').slice(0, 1));
      setAmbiente(data.filter(n => n.categoria === 'Ambiente').slice(0, 1));
    })
    .catch(err => console.error(err));
}, []);
  return (
    <div>

    {/* HERO */}
<section className="hero">
  <video
    className="hero__video"
    autoPlay
    muted
    loop
    playsInline
  >
    <source src={require('../../assets/heroagri.mp4')} type="video/mp4" />
  </video> 
  <div className="hero__overlay">
    <div className="hero__content container">
      <h1 className="hero__title">
        Unione Italiana Professionalita in Agricoltura
      </h1>
      <p className="hero__sub">
        Tutela i diritti e gli interessi dei lavoratori autonomi<br />
        nel settore agricolo e agroalimentare
      </p>
      <div className="hero__cta">
        <Link to="/chi-siamo" className="btn btn-verde">Chi siamo</Link>
        <Link to="/contatti" className="btn btn-outline">Contattaci</Link>
      </div>
      <div className="hero__stats">
        <div className="hero__stat">
          <span className="hero__stat-num">40+</span>
          <span className="hero__stat-label">Sedi in Italia</span>
        </div>
        <div className="hero__stat">
          <span className="hero__stat-num">30+</span>
          <span className="hero__stat-label">Anni di esperienza</span>
        </div>
        <div className="hero__stat">
          <span className="hero__stat-num">7</span>
          <span className="hero__stat-label">Servizi disponibili</span>
        </div>
        <div className="hero__stat">
          <span className="hero__stat-num">100%</span>
          <span className="hero__stat-label">A sostegno delle imprese</span>
        </div>
      </div>
    </div>
  </div>
</section>
{/* BANNER UNICAF */}
<section className="banner-unicaf">
  <div className="container banner-unicaf__inner">
    <div className="banner-unicaf__testo">
      <span className="banner-unicaf__tag">I nostri servizi online</span>
      <h2>Pratiche fiscali semplici, risultati migliori</h2>
      <p>
        ISEE, 730, Patronato, Successioni e molto altro. Operatori qualificati
        ti assistono a distanza — carichi i documenti, noi ci occupiamo del resto.
      </p>
      <div className="banner-unicaf__features">
        <span>✓ Nessun appuntamento in ufficio</span>
        <span>✓ Risposta entro 24 ore</span>
        <span>✓ CAF autorizzato dal MEF</span>
      </div>
      <a href="https://unicafsrl.it" target="_blank" rel="noopener noreferrer" className="banner-unicaf__btn">
        Scopri i servizi →
      </a>
    </div>
    <div className="banner-unicaf__numeri">
      <div className="banner-unicaf__numero">
        <span className="banner-unicaf__num">10.000+</span>
        <span className="banner-unicaf__label">Pratiche gestite</span>
      </div>
      <div className="banner-unicaf__numero">
        <span className="banner-unicaf__num">62</span>
        <span className="banner-unicaf__label">Servizi disponibili</span>
      </div>
      <div className="banner-unicaf__numero">
        <span className="banner-unicaf__num">24h</span>
        <span className="banner-unicaf__label">Tempo di risposta</span>
      </div>
      <div className="banner-unicaf__numero">
        <span className="banner-unicaf__num">100%</span>
        <span className="banner-unicaf__label">Online, da casa</span>
      </div>
    </div>
  </div>
</section>

      {/* SERVIZI */}
      <section className="servizi-section">
        <div className="container">
          <h2 className="section-title">Servizi</h2>
          <div className="servizi-grid">
            {servizi.map((s, idx) => {
              if (s.url) {
                return (
                  <a
                    key={idx}
                    href={s.url}
                    className="servizio-card"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h3 className="servizio-card__title">{s.titolo}</h3>
                    <p className="servizio-card__desc">{s.desc}</p>
                  </a>
                );
              }
              return (
                <Link key={idx} to={s.link} className="servizio-card">
                  <span className="servizio-card__icon">{s.icon}</span>
                  <h3 className="servizio-card__title">{s.titolo}</h3>
                  <p className="servizio-card__desc">{s.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

     {/* NEWS */}
<section className="news-section">
  <div className="container">
    <div className="news-header">
      <h2 className="section-title">Ultime notizie</h2>
      <Link to="/news" className="news-vedi-tutte">Vedi tutte →</Link>
    </div>
    <div className="news-grid-home">
      {news.slice(0, 3).map((n) => (
       <Link to={`/news/${n.slug}`} key={n.id} className="news-card">
  {n.immagine && (
    <div className="news-card__img">
    <img src={`${API_URL}${n.immagine}`} alt={n.titolo} />
    </div>
  )}
  <div className="news-card__cat">{n.categoria}</div>
  <h3 className="news-card__titolo">{n.titolo}</h3>
  <p className="news-card__estratto">{n.estratto}</p>
  <span className="news-card__data">
  {new Date(n.data).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
</span>
</Link>
      ))}
    </div>
  </div>
</section>

<section className="categorie-section">
  <div className="container">
    <div className="categorie-grid">

      <div className="categoria-col">
        <h3 className="categoria-col__titolo">EVENTI TERRITORIO</h3>
        {eventi[0] ? (
          <div className="categoria-card">
            {eventi[0].immagine && (
              <img src={`${API_URL}${eventi[0].immagine}`} alt={eventi[0].titolo} className="categoria-card__img" />
            )}
            <h4 className="categoria-card__titolo">{eventi[0].titolo}</h4>
            <div className="categoria-card__meta">
              <span>{new Date(eventi[0].data).toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
        ) : (
          <div className="categoria-card categoria-card--vuota">
            <p>Nessun evento disponibile</p>
          </div>
        )}
        <Link to="/news?categoria=Eventi" className="categoria-card__link">VAI ALLA SEZIONE →</Link>
      </div>

      <div className="categoria-col">
        <h3 className="categoria-col__titolo">BANDI</h3>
        {bandi[0] ? (
          <div className="categoria-card">
            {bandi[0].immagine && (
              <img src={`${API_URL}${bandi[0].immagine}`} alt={bandi[0].titolo} className="categoria-card__img" />
            )}
            <h4 className="categoria-card__titolo">{bandi[0].titolo}</h4>
            <div className="categoria-card__meta">
              <span>{new Date(bandi[0].data).toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
        ) : (
          <div className="categoria-card categoria-card--vuota">
            <p>Nessun bando disponibile</p>
          </div>
        )}
        <Link to="/news?categoria=Bandi" className="categoria-card__link">VAI ALLA SEZIONE →</Link>
      </div>

      <div className="categoria-col">
        <h3 className="categoria-col__titolo">I NOSTRI TUTORIAL</h3>
        {tutorial[0] ? (
          <div className="categoria-card">
            {tutorial[0].immagine && (
              <img src={`${API_URL}${tutorial[0].immagine}`} alt={tutorial[0].titolo} className="categoria-card__img" />
            )}
            <h4 className="categoria-card__titolo">{tutorial[0].titolo}</h4>
            <div className="categoria-card__meta">
              <span>{new Date(tutorial[0].data).toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
        ) : (
          <div className="categoria-card categoria-card--vuota">
            <p>Nessun tutorial disponibile</p>
          </div>
        )}
        <Link to="/news?categoria=I Nostri Tutorial" className="categoria-card__link">VAI ALLA SEZIONE →</Link>
      </div>
      <div className="categoria-col">
  <h3 className="categoria-col__titolo">TURISMO</h3>
  {turismo[0] ? (
    <div className="categoria-card">
      {turismo[0].immagine && (
        <img src={`${API_URL}${turismo[0].immagine}`} alt={turismo[0].titolo} className="categoria-card__img" />
      )}
      <h4 className="categoria-card__titolo">{turismo[0].titolo}</h4>
      <div className="categoria-card__meta">
        <span>{new Date(turismo[0].data).toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
      </div>
    </div>
  ) : (
    <div className="categoria-card categoria-card--vuota">
      <p>Nessun articolo disponibile</p>
    </div>
  )}
  <Link to="/news?categoria=Turismo" className="categoria-card__link">VAI ALLA SEZIONE →</Link>
</div>

<div className="categoria-col">
  <h3 className="categoria-col__titolo">LEGGI E REGOLAMENTI</h3>
  {leggi[0] ? (
    <div className="categoria-card">
      {leggi[0].immagine && (
        <img src={`${API_URL}${leggi[0].immagine}`} alt={leggi[0].titolo} className="categoria-card__img" />
      )}
      <h4 className="categoria-card__titolo">{leggi[0].titolo}</h4>
      <div className="categoria-card__meta">
        <span>{new Date(leggi[0].data).toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
      </div>
    </div>
  ) : (
    <div className="categoria-card categoria-card--vuota">
      <p>Nessun articolo disponibile</p>
    </div>
  )}
  <Link to="/news?categoria=Leggi e Regolamenti" className="categoria-card__link">VAI ALLA SEZIONE →</Link>
</div>

<div className="categoria-col">
  <h3 className="categoria-col__titolo">AMBIENTE</h3>
  {ambiente[0] ? (
    <div className="categoria-card">
      {ambiente[0].immagine && (
        <img src={`${API_URL}${ambiente[0].immagine}`} alt={ambiente[0].titolo} className="categoria-card__img" />
      )}
      <h4 className="categoria-card__titolo">{ambiente[0].titolo}</h4>
      <div className="categoria-card__meta">
        <span>{new Date(ambiente[0].data).toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
      </div>
    </div>
  ) : (
    <div className="categoria-card categoria-card--vuota">
      <p>Nessun articolo disponibile</p>
    </div>
  )}
  <Link to="/news?categoria=Ambiente" className="categoria-card__link">VAI ALLA SEZIONE →</Link>
</div>

    </div>
  </div>
</section>
      {/* COLLABORA CON NOI */}
      <section className="collabora-section">
        <div className="container">
          <h2 className="section-title">Collabora con noi</h2>
          <div className="collabora-grid">
            <div className="collabora-card">
              <h3>Attiva il tuo CAF/Patronato</h3>
              <Link to="/apri-una-sede" className="btn btn-verde" style={{ background: '#f0a500', color: '#fff' }}>
                Vai alla sezione
              </Link>
            </div>
            <div className="collabora-card">
              <h3>Apri una sede sindacale UIPA</h3>
              <Link to="/apri-una-sede" className="btn btn-verde" style={{ background: '#f0a500', color: '#fff' }}>
                Vai alla sezione
              </Link>
            </div>
            <div className="collabora-card">
              <h3>Attiva una sede CAA UIPA</h3>
              <Link to="/apri-una-sede" className="btn btn-verde" style={{ background: '#f0a500', color: '#fff' }}>
                Vai alla sezione
              </Link>
            </div>
          </div>
        </div>
      </section>

     {/* PARTNERS */}
<section className="partners-section">
  <div className="container">
    <h2 className="section-title">I nostri Partners</h2>
    <div className="partners-grid">
      <a href="https://www.politicheagricole.it" target="_blank" rel="noopener noreferrer" className="partner-item">
        <img src={require('../../assets/MASAF.png')} alt="MASAF" />
      </a>
      <a href="https://www.agea.gov.it" target="_blank" rel="noopener noreferrer" className="partner-item">
        <img src={require('../../assets/agea.png')} alt="AGEA" />
      </a>
      <a href="https://www.lavoro.gov.it" target="_blank" rel="noopener noreferrer" className="partner-item">
        <img src={require('../../assets/minlavoro.png')} alt="Ministero del Lavoro" />
      </a>
      <a href="https://www.inps.it" target="_blank" rel="noopener noreferrer" className="partner-item">
        <img src={require('../../assets/inps.png')} alt="INPS" />
      </a>
      <a href="https://www.inail.it" target="_blank" rel="noopener noreferrer" className="partner-item">
        <img src={require('../../assets/inail.png')} alt="INAIL" />
      </a>
      <a href="https://www.agenziaentrate.gov.it" target="_blank" rel="noopener noreferrer" className="partner-item">
        <img src={require('../../assets/agenziaentrate.jpg')} alt="Agenzia delle Entrate" />
      </a>
    </div>
  </div>
</section>

    </div>
  );
};

export default HomePage;
