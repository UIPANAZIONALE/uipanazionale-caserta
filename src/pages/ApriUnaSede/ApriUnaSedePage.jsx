import React, { useState } from 'react';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import './ApriUnaSedePage.css';

const tipiSede = [
  {
    id: 'caf',
    titolo: 'CAF / Patronato',
    desc: 'Attiva uno sportello CAF e Patronato ANMIL nel tuo territorio.',
  },
  {
    id: 'sindacale',
    titolo: 'Sede Sindacale',
    desc: 'Apri una sede sindacale UIPA e tutela i lavoratori della tua zona.',
  },
  {
    id: 'caa',
    titolo: 'Sede CAA',
    desc: 'Diventa Centro di Assistenza Agricola per i lavoratori del settore.',
  },
];

const vantaggi = [
  { numero: '30+', label: 'Anni di esperienza' },
  { numero: '100+', label: 'Sedi in Italia' },
  { numero: '50.000+', label: 'Lavoratori tutelati' },
  { numero: '7', label: 'Servizi disponibili' },
];

const ApriUnaSedePage = () => {
  const [sedeSelezionata, setSedeSelezionata] = useState('');
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefono: '',
    citta: '',
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
    console.log('Form inviato:', { tipoSede: sedeSelezionata, ...formData });
    setInviato(true);
  };

  return (
    <PageTemplate titolo="Apri una Sede" sottotitolo="Entra a far parte della rete UIPA">

      {/* SCEGLI TIPO SEDE */}
      <div className="aprisede__scegli">
        <h2 className="section-title">Cosa vuoi aprire?</h2>
        <div className="aprisede__tipi">
          {tipiSede.map((tipo) => (
            <div
              key={tipo.id}
              className={`aprisede__tipo ${sedeSelezionata === tipo.id ? 'aprisede__tipo--attivo' : ''}`}
              onClick={() => setSedeSelezionata(tipo.id)}
            >
              <h3>{tipo.titolo}</h3>
              <p>{tipo.desc}</p>
              <span className="aprisede__tipo-cta">
                {sedeSelezionata === tipo.id ? 'Selezionato' : 'Seleziona'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* VANTAGGI */}
      <div className="aprisede__vantaggi">
        <h2 className="section-title">Perche scegliere UIPA</h2>
        <div className="aprisede__numeri">
          {vantaggi.map((v, idx) => (
            <div key={idx} className="aprisede__numero">
              <span className="aprisede__numero-valore">{v.numero}</span>
              <span className="aprisede__numero-label">{v.label}</span>
            </div>
          ))}
        </div>
        <div className="aprisede__benefici">
          <div className="aprisede__beneficio">
            <h4>Supporto continuo</h4>
            <p>Formazione, aggiornamenti normativi e supporto operativo costante dalla sede nazionale.</p>
          </div>
          <div className="aprisede__beneficio">
            <h4>Rete nazionale</h4>
            <p>Accedi a una rete consolidata di oltre 100 sedi e migliaia di professionisti in tutta Italia.</p>
          </div>
          <div className="aprisede__beneficio">
            <h4>Software gestionale</h4>
            <p>Accesso al gestionale UIPA per la gestione delle pratiche e dei clienti.</p>
          </div>
          <div className="aprisede__beneficio">
            <h4>Brand riconosciuto</h4>
            <p>Opera sotto un marchio consolidato con oltre 30 anni di storia nel settore.</p>
          </div>
        </div>
      </div>

      {/* FORM */}
      <div className="aprisede__form-section">
        <h2 className="section-title">Richiedi informazioni</h2>
        <p style={{ color: '#666', marginBottom: '24px' }}>
          Compila il modulo e ti contatteremo entro 48 ore per fornirti tutte le informazioni.
        </p>

        {inviato ? (
          <div className="aprisede__successo">
            Richiesta inviata! Ti contatteremo entro 48 ore.
          </div>
        ) : (
          <form className="aprisede__form" onSubmit={handleSubmit}>

            <div className="aprisede__form-grid">
              <div className="form-group">
                <label>Tipo di sede *</label>
                <select
                  value={sedeSelezionata}
                  onChange={(e) => setSedeSelezionata(e.target.value)}
                  required
                >
                  <option value="">Seleziona tipo sede</option>
                  {tipiSede.map((t) => (
                    <option key={t.id} value={t.id}>{t.titolo}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Nome e Cognome *</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Mario Rossi"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="mario@email.it"
                  required
                />
              </div>

              <div className="form-group">
                <label>Telefono *</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="333 1234567"
                  required
                />
              </div>

              <div className="form-group">
                <label>Citta *</label>
                <input
                  type="text"
                  name="citta"
                  value={formData.citta}
                  onChange={handleChange}
                  placeholder="Es. Caserta"
                  required
                />
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '8px' }}>
              <label>Messaggio</label>
              <textarea
                name="messaggio"
                value={formData.messaggio}
                onChange={handleChange}
                placeholder="Descrivi brevemente la tua situazione e le tue aspettative..."
                rows={4}
              />
            </div>

            <label className="form__privacy">
              <input
                type="checkbox"
                name="privacy"
                checked={formData.privacy}
                onChange={handleChange}
                required
              />
              Ho letto l'informativa sulla privacy e acconsento al trattamento dei dati personali
            </label>

            <button type="submit" className="aprisede__submit">
              Invia richiesta
            </button>

          </form>
        )}
      </div>

    </PageTemplate>
  );
};

export default ApriUnaSedePage;
