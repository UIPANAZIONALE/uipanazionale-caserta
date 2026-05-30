import React, { useState } from 'react';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import './TesseramentoPage.css';

const vantaggi = [
  {
    titolo: 'Vita sociale',
    desc: 'Partecipa alla vita sociale dell\'organizzazione secondo le norme previste dallo Statuto.',
  },
  {
    titolo: 'Tariffario agevolato',
    desc: 'Usufruisci di un tariffario dei servizi agevolato, sia per i cittadini che per le imprese.',
  },
  {
    titolo: 'Servizi e convenzioni',
    desc: 'Accedi a tutti i servizi e alle convenzioni nazionali della UIPA su tutto il territorio.',
  },
  {
    titolo: 'Made in Italy',
    desc: 'Contribuisci a sostenere il made in Italy agroalimentare nel mondo.',
  },
];

const TesseramentoPage = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
    citta: '',
    categoria: '',
    privacy: false,
  });
  const [inviato, setInviato] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Richiesta tesseramento:', formData);
    setInviato(true);
  };

  return (
    <PageTemplate titolo="Tesseramento" sottotitolo="Campagna Tesseramento 2025">

      {/* SLOGAN */}
      <div className="tessera__slogan">
        <h2>L'unione fa la forza!</h2>
        <p>
          Piu numerosa sara la base associativa, piu forza avranno i soci,
          i cittadini, le imprese.
        </p>
      </div>

      {/* INTRO + VANTAGGI */}
      <div className="tessera__intro">
        <div className="tessera__intro-testo">
          <p className="tessera__sottotitolo">
            Con l'iscrizione a UIPA si diventa soci della nostra Organizzazione.
          </p>
          <h2 className="section-title">Con la possibilita di</h2>
          <div className="tessera__vantaggi">
            {vantaggi.map((v, idx) => (
              <div key={idx} className="tessera__vantaggio">
                <span className="tessera__vantaggio-num">{String(idx + 1).padStart(2, '0')}</span>
                <div>
                  <h4>{v.titolo}</h4>
                  <p>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Banner campagna */}
        <div className="tessera__campagna">
          <div className="tessera__campagna-inner">
            <img
              src={require('../../assets/logo.png')}
              alt="UIPA"
              style={{ height: '60px', marginBottom: '20px' }}
            />
            <h2>Insieme per una agricoltura che cresce</h2>
            <p>La nostra missione, il tuo futuro.</p>
            <span className="tessera__campagna-tag">Campagna tesseramento 2025</span>
            <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.8)', marginTop: '16px' }}>
              Contattaci per maggiori informazioni o visita il nostro sito
              per trovare la sede piu vicina.
            </p>
          </div>
        </div>
      </div>

      {/* COME DIVENTARE SOCIO */}
      <div className="tessera__come">
        <h2 className="section-title">Come diventare socio</h2>
        <div className="tessera__steps">
          <div className="tessera__step">
            <span className="tessera__step-num">1</span>
            <h4>Compila il modulo</h4>
            <p>Inserisci i tuoi dati nel form qui sotto o invia una email a info@uipa.it</p>
          </div>
          <div className="tessera__step-arrow">→</div>
          <div className="tessera__step">
            <span className="tessera__step-num">2</span>
            <h4>Vieni contattato</h4>
            <p>Un nostro operatore ti contatterà entro 48 ore per completare la procedura</p>
          </div>
          <div className="tessera__step-arrow">→</div>
          <div className="tessera__step">
            <span className="tessera__step-num">3</span>
            <h4>Ricevi la tessera</h4>
            <p>Accedi a tutti i servizi e vantaggi riservati ai soci UIPA</p>
          </div>
        </div>
      </div>

      {/* FORM */}
      <div className="tessera__form-section">
        <h2 className="section-title">Richiedi la tessera</h2>
        <p style={{ color: '#666', marginBottom: '24px' }}>
          Compila il modulo oppure invia una email a{' '}
          <a href="mailto:info@uipa.it" style={{ color: '#f0a500', fontWeight: '700' }}>
            info@uipa.it
          </a>
        </p>

        {inviato ? (
          <div className="tessera__successo">
            Richiesta inviata! Ti contatteremo entro 48 ore.
          </div>
        ) : (
          <form className="tessera__form" onSubmit={handleSubmit}>
            <div className="tessera__form-grid">
              <div className="form-group">
                <label>Nome *</label>
                <input type="text" name="nome" value={formData.nome}
                  onChange={handleChange} placeholder="Mario" required />
              </div>
              <div className="form-group">
                <label>Cognome *</label>
                <input type="text" name="cognome" value={formData.cognome}
                  onChange={handleChange} placeholder="Rossi" required />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input type="email" name="email" value={formData.email}
                  onChange={handleChange} placeholder="mario@email.it" required />
              </div>
              <div className="form-group">
                <label>Telefono *</label>
                <input type="tel" name="telefono" value={formData.telefono}
                  onChange={handleChange} placeholder="333 1234567" required />
              </div>
              <div className="form-group">
                <label>Citta *</label>
                <input type="text" name="citta" value={formData.citta}
                  onChange={handleChange} placeholder="Es. Caserta" required />
              </div>
              <div className="form-group">
                <label>Categoria *</label>
                <select name="categoria" value={formData.categoria}
                  onChange={handleChange} required>
                  <option value="">Seleziona categoria</option>
                  <option value="lavoratore">Lavoratore dipendente</option>
                  <option value="autonomo">Lavoratore autonomo</option>
                  <option value="agricoltore">Agricoltore</option>
                  <option value="pensionato">Pensionato</option>
                  <option value="impresa">Impresa</option>
                </select>
              </div>
            </div>

            <label className="form__privacy">
              <input type="checkbox" name="privacy"
                checked={formData.privacy} onChange={handleChange} required />
              Ho letto l'informativa sulla privacy e acconsento al trattamento dei dati personali
            </label>

            <button type="submit" className="tessera__submit">
              Richiedi tessera
            </button>
          </form>
        )}
      </div>

    </PageTemplate>
  );
};

export default TesseramentoPage;