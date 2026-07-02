import React, { useState } from 'react';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import './ContattiPage.css';

const ContattiPage = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefono: '',
    oggetto: '',
    messaggio: '',
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
    console.log('Form inviato:', formData);
    setInviato(true);
  };

  return (
    <PageTemplate titolo="Contatti" sottotitolo="Siamo a tua disposizione" immagine={require('../../assets/hero-contatti.png')}>

      {/* INFO + MAPPA */}
      <div className="contatti__grid">

        <div className="contatti__info">
          <h3>UIPA – Sede Nazionale</h3>
          <div className="contatti__info-item">
            <span className="contatti__info-label">Indirizzo</span>
            <span className="contatti__info-value">Via Sicilia – 00187 Roma</span>
          </div>
          <div className="contatti__info-item">
            <span className="contatti__info-label">Telefono</span>
            <span className="contatti__info-value">
              <a href="tel:0642020719">06 42020719</a>
            </span>
          </div>
          <div className="contatti__info-item">
            <span className="contatti__info-label">Email</span>
            <span className="contatti__info-value">
              <a href="mailto:info@uipa.it">info@uipa.it</a>
            </span>
          </div>

          <div style={{ marginTop: '30px' }}>
            <h3>UIPA – Sede di Caserta</h3>
            <div className="contatti__info-item">
              <span className="contatti__info-label">Indirizzo</span>
              <span className="contatti__info-value">Via Arena, 37 – 81100 Caserta</span>
            </div>
            <div className="contatti__info-item">
              <span className="contatti__info-label">Telefono</span>
              <span className="contatti__info-value">
                <a href="tel:0823320088">0823 320088</a>
              </span>
            </div>
            <div className="contatti__info-item">
              <span className="contatti__info-label">Email</span>
              <span className="contatti__info-value">
                <a href="mailto:info@uipa.it">info@uipa.it</a>
              </span>
            </div>
          </div>
        </div>

        <div className="contatti__mappa">
          <iframe
            title="Mappa UIPA Caserta"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.1252325714077!2d14.34569479785833!3d41.06625514138477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133a545af49fc2e3%3A0xcf1d5f59a0e222f8!2sVia%20Maggiore%20Salvatore%20Arena%2C%2037%2C%2081100%20Caserta%20CE!5e0!3m2!1sit!2sit!4v1623747893818!5m2!1sit!2sit"
            width="100%"
            height="400"
            style={{ border: 0, display: 'block' }}
            allowFullScreen=""
            loading="lazy"
          />
        </div>

      </div>

      {/* FORM */}
      <div style={{ marginTop: '50px' }}>
        <h2 className="section-title">Contattaci per ulteriori informazioni</h2>

        {inviato ? (
          <div style={{
            marginTop: '30px',
            padding: '20px 24px',
            background: '#fef5e0',
            border: '1px solid #f0a500',
            borderRadius: '4px',
            color: '#c07800',
            fontWeight: '600'
          }}>
            Messaggio inviato! Ti risponderemo al piu presto.
          </div>
        ) : (
          <form className="contatti__form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nome e Cognome *</label>
              <input type="text" name="nome" value={formData.nome}
                onChange={handleChange} placeholder="Mario Rossi" required />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input type="email" name="email" value={formData.email}
                onChange={handleChange} placeholder="mario@email.it" required />
            </div>
            <div className="form-group">
              <label>Telefono</label>
              <input type="tel" name="telefono" value={formData.telefono}
                onChange={handleChange} placeholder="333 1234567" />
            </div>
            <div className="form-group">
              <label>Oggetto *</label>
              <select name="oggetto" value={formData.oggetto}
                onChange={handleChange} required>
                <option value="">Seleziona un argomento</option>
                <option value="patronato">Servizi di Patronato</option>
                <option value="caf">Servizi CAF</option>
                <option value="caa">CAA Agricoltura</option>
                <option value="lavoro">Lavoro Domestico</option>
                <option value="sede">Apri una Sede</option>
                <option value="altro">Altro</option>
              </select>
            </div>
            <div className="form-group">
              <label>Messaggio *</label>
              <textarea name="messaggio" value={formData.messaggio}
                onChange={handleChange} placeholder="Scrivi qui il tuo messaggio..." required />
            </div>
            <label className="form__privacy">
              <input type="checkbox" name="privacy"
                checked={formData.privacy} onChange={handleChange} required />
              Ho letto l'informativa sulla privacy e acconsento al trattamento dei dati personali
            </label>
            <button type="submit" className="btn btn-verde form__submit"
              style={{ background: '#f0a500', color: '#fff', border: 'none', cursor: 'pointer' }}>
              Invia messaggio
            </button>
          </form>
        )}
      </div>

    </PageTemplate>
  );
};

export default ContattiPage;
