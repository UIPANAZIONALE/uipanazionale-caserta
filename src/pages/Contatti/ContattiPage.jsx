import React, { useState } from 'react';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import { API_URL } from '../../config';
import './ContattiPage.css';

const ContattiPage = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
    oggetto: '',
    messaggio: '',
    privacy: false,
  });

  const [inviato, setInviato] = useState(false);
  const [errore, setErrore] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrore('');
    try {
      const res = await fetch(`${API_URL}/api/contatti`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: formData.nome,
          cognome: formData.cognome,
          telefono: formData.telefono,
          email: formData.email,
          oggetto: formData.oggetto,
          messaggio: formData.messaggio,
          privacy_accettata: formData.privacy,
        }),
      });
      if (!res.ok) throw new Error('Errore invio');
      setInviato(true);
    } catch (err) {
      setErrore('Errore durante l\'invio. Riprova o contattaci per telefono.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTemplate titolo="Contatti" sottotitolo="Siamo a tua disposizione" immagine={require('../../assets/hero-contatti.png')}>

      <div className="contatti__grid">
        <div className="contatti__info">
          <h3>UIPA – Sede Nazionale</h3>
          <div className="contatti__info-item">
            <span className="contatti__info-label">Indirizzo</span>
            <span className="contatti__info-value">Via Sicilia – 00187 Roma</span>
          </div>
          <div className="contatti__info-item">
            <span className="contatti__info-label">Telefono</span>
            <span className="contatti__info-value"><a href="tel:0642020719">06 42020719</a></span>
          </div>
          <div className="contatti__info-item">
            <span className="contatti__info-label">Email</span>
            <span className="contatti__info-value"><a href="mailto:info@uipa.it">info@uipa.it</a></span>
          </div>
          <div style={{ marginTop: '30px' }}>
            <h3>UIPA – Sede di Caserta</h3>
            <div className="contatti__info-item">
              <span className="contatti__info-label">Indirizzo</span>
              <span className="contatti__info-value">Via Arena, 37 – 81100 Caserta</span>
            </div>
            <div className="contatti__info-item">
              <span className="contatti__info-label">Telefono</span>
              <span className="contatti__info-value"><a href="tel:0823320088">0823 320088</a></span>
            </div>
            <div className="contatti__info-item">
              <span className="contatti__info-label">Email</span>
              <span className="contatti__info-value"><a href="mailto:info@uipa.it">info@uipa.it</a></span>
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
            ✅ Messaggio inviato! Ti risponderemo al piu presto.
          </div>
        ) : (
          <form className="contatti__form" onSubmit={handleSubmit}>
            <div className="form-row">
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
            </div>
            <div className="form-row">
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
            </div>
            <div className="form-group">
              <label>Oggetto *</label>
              <select name="oggetto" value={formData.oggetto}
                onChange={handleChange} required>
                <option value="">Seleziona un argomento</option>
                <option value="Servizi di Patronato">Servizi di Patronato</option>
                <option value="Servizi CAF">Servizi CAF</option>
                <option value="CAA Agricoltura">CAA Agricoltura</option>
                <option value="Lavoro Domestico">Lavoro Domestico</option>
                <option value="Apri una Sede">Apri una Sede</option>
                <option value="Tesseramento">Tesseramento</option>
                <option value="Altro">Altro</option>
              </select>
            </div>
            <div className="form-group">
              <label>Messaggio *</label>
              <textarea name="messaggio" value={formData.messaggio}
                onChange={handleChange} placeholder="Scrivi qui il tuo messaggio..." required rows={5} />
            </div>
            <label className="form__privacy">
              <input type="checkbox" name="privacy"
                checked={formData.privacy} onChange={handleChange} required />
              Ho letto l'<a href="/privacy" target="_blank">informativa sulla privacy</a> e acconsento al trattamento dei dati personali
            </label>
            {errore && (
              <div style={{ color: '#c00', padding: '10px', background: '#fee', borderRadius: '4px', marginTop: '10px' }}>
                {errore}
              </div>
            )}
            <button type="submit" className="btn btn-verde form__submit"
              style={{ background: '#f0a500', color: '#fff', border: 'none', cursor: 'pointer' }}
              disabled={loading}>
              {loading ? 'Invio in corso...' : 'Invia messaggio'}
            </button>
          </form>
        )}
      </div>

    </PageTemplate>
  );
};

export default ContattiPage;