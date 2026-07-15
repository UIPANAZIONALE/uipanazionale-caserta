import React, { useState } from 'react';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import { API_URL } from '../../config';
import './TesseramentoPage.css';

const TesseramentoPage = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    telefono: '',
    email: '',
    citta: '',
    categoria: '',
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
      const res = await fetch(`${API_URL}/api/tesseramenti`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: formData.nome,
          cognome: formData.cognome,
          telefono: formData.telefono,
          email: formData.email,
          citta: formData.citta,
          categoria: formData.categoria,
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
    <PageTemplate
      titolo="Tesseramento"
      sottotitolo="Diventa socio UIPA"
      immagine={require('../../assets/hero-tesseramento.png')}
    >
      <div className="tesseramento__layout">

        {/* INFO */}
        <div className="tesseramento__info">
          <h3>Perche tesserarti?</h3>
          <ul className="tesseramento__vantaggi">
            <li>✅ Accesso a tutti i servizi di Patronato</li>
            <li>✅ Assistenza fiscale CAF gratuita</li>
            <li>✅ Consulenza sindacale dedicata</li>
            <li>✅ Supporto pratiche agricole CAA</li>
            <li>✅ Convenzioni esclusive per i soci</li>
            <li>✅ Newsletter con aggiornamenti normativi</li>
          </ul>

          <div className="tesseramento__contatto">
            <h4>Preferisci parlare con noi?</h4>
            <a href="tel:0823320088" className="tesseramento__tel">📞 0823 320088</a>
            <a  href="mailto:uipanazionale@gmail.com">uipanazionale@gmail.com</a>
          </div>
        </div>

        {/* FORM */}
        <div className="tesseramento__form-container">
          <h3>Compila il modulo</h3>

          {inviato ? (
            <div className="tesseramento__successo">
              ✅ Richiesta inviata con successo! Ti contatteremo al piu presto per completare la procedura di tesseramento.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="tesseramento__form">
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
                  <label>Telefono *</label>
                  <input type="tel" name="telefono" value={formData.telefono}
                    onChange={handleChange} placeholder="333 1234567" required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Citta *</label>
                  <input type="text" name="citta" value={formData.citta}
                    onChange={handleChange} placeholder="Caserta" required />
                </div>
                <div className="form-group">
                  <label>Categoria *</label>
                  <select name="categoria" value={formData.categoria}
                    onChange={handleChange} required>
                    <option value="">Seleziona categoria</option>
                    <option value="Lavoratore dipendente">Lavoratore dipendente</option>
                    <option value="Lavoratore autonomo">Lavoratore autonomo</option>
                    <option value="Pensionato">Pensionato</option>
                    <option value="Agricoltore">Agricoltore</option>
                    <option value="Imprenditore agricolo">Imprenditore agricolo</option>
                    <option value="Disoccupato">Disoccupato</option>
                    <option value="Altro">Altro</option>
                  </select>
                </div>
              </div>

              <label className="form__privacy">
                <input type="checkbox" name="privacy"
                  checked={formData.privacy} onChange={handleChange} required />
                Ho letto l'<a href="/privacy" target="_blank">informativa sulla privacy</a> e acconsento al trattamento dei dati personali
              </label>

              {errore && (
                <div className="tesseramento__errore">{errore}</div>
              )}

              <button type="submit" className="tesseramento__submit" disabled={loading}>
                {loading ? 'Invio in corso...' : 'Invia richiesta di tesseramento'}
              </button>
            </form>
          )}
        </div>

      </div>
    </PageTemplate>
  );
};

export default TesseramentoPage;