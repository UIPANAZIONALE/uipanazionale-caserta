import React from 'react';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import './PrivacyPolicyPage.css';

const PrivacyPolicyPage = () => {
  return (
    <PageTemplate titolo="Privacy Policy" sottotitolo="Informativa sul trattamento dei dati personali — art. 13 GDPR 2016/679">
      <div className="privacy__layout">

        {/* INDICE */}
        <aside className="privacy__indice">
          <h4>Indice</h4>
          <ul>
            <li><a href="#titolare">1. Titolare del trattamento</a></li>
            <li><a href="#dati">2. Dati raccolti</a></li>
            <li><a href="#finalita">3. Finalita del trattamento</a></li>
            <li><a href="#base">4. Base giuridica</a></li>
            <li><a href="#conservazione">5. Conservazione</a></li>
            <li><a href="#diritti">6. Diritti dell'interessato</a></li>
            <li><a href="#cookie">7. Cookie</a></li>
            <li><a href="#terze-parti">8. Terze parti</a></li>
            <li><a href="#contatti">9. Contatti</a></li>
          </ul>
        </aside>

        {/* CONTENUTO */}
        <div className="privacy__contenuto">

          <div className="privacy__aggiornamento">
            <span>Ultimo aggiornamento: Luglio 2026</span>
          </div>

          <div className="privacy__intro">
            <p>
              La presente informativa descrive le modalita di trattamento dei dati personali degli utenti 
              che consultano il sito web <strong>www.uipanazionale.it</strong> e utilizzano i servizi offerti da 
              UIPA – Unione Italiana Professionalita in Agricoltura, in conformita al 
              Regolamento UE 2016/679 (GDPR) e al D.Lgs. 196/2003 come modificato dal D.Lgs. 101/2018.
            </p>
          </div>

          <section id="titolare" className="privacy__sezione">
            <h2>1. Titolare del trattamento</h2>
            <div className="privacy__box">
              <p><strong>UIPA – Unione Italiana Professionalita in Agricoltura</strong></p>
              <p>Sede legale: Via Sicilia – 00187 Roma</p>
              <p>Sede operativa: Via Arena 37, 81100 Caserta</p>
              <p>Email:  <a href="mailto:uipanazionale@gmail.com">uipanazionale@gmail.com</a></p>
              <p>Telefono: <a href="tel:0823320088">0823 320088</a></p>
            </div>
          </section>

          <section id="dati" className="privacy__sezione">
            <h2>2. Dati raccolti</h2>
            <p>Il sito raccoglie le seguenti categorie di dati personali:</p>
            <ul className="privacy__lista">
              <li><strong>Dati di navigazione</strong> — indirizzo IP, tipo di browser, pagine visitate, orari di accesso</li>
              <li><strong>Dati forniti volontariamente</strong> tramite il form di contatto: nome, cognome, email, telefono, oggetto e messaggio</li>
              <li><strong>Dati di tesseramento</strong>: nome, cognome, email, telefono, citta e categoria professionale</li>
            </ul>
          </section>

          <section id="finalita" className="privacy__sezione">
            <h2>3. Finalita del trattamento</h2>
            <div className="privacy__table">
              <div className="privacy__table-row privacy__table-header">
                <div>Finalita</div>
                <div>Base giuridica</div>
              </div>
              <div className="privacy__table-row">
                <div>Rispondere alle richieste di contatto</div>
                <div>Consenso (art. 6 lett. a GDPR)</div>
              </div>
              <div className="privacy__table-row">
                <div>Gestione domande di tesseramento</div>
                <div>Esecuzione contratto (art. 6 lett. b GDPR)</div>
              </div>
              <div className="privacy__table-row">
                <div>Sicurezza del sito e prevenzione frodi</div>
                <div>Legittimo interesse (art. 6 lett. f GDPR)</div>
              </div>
              <div className="privacy__table-row">
                <div>Adempimento obblighi di legge</div>
                <div>Obbligo legale (art. 6 lett. c GDPR)</div>
              </div>
            </div>
          </section>

          <section id="base" className="privacy__sezione">
            <h2>4. Base giuridica</h2>
            <p>
              Il trattamento dei dati e basato sul consenso dell'interessato ai sensi dell'art. 6, par. 1, lett. a del GDPR, 
              sull'esecuzione di un contratto ai sensi dell'art. 6, par. 1, lett. b, e sul legittimo interesse 
              del titolare ai sensi dell'art. 6, par. 1, lett. f del GDPR.
            </p>
          </section>

          <section id="conservazione" className="privacy__sezione">
            <h2>5. Conservazione dei dati</h2>
            <p>I dati personali sono conservati per i seguenti periodi:</p>
            <ul className="privacy__lista">
              <li><strong>Dati di contatto</strong>: 24 mesi dalla ricezione della richiesta</li>
              <li><strong>Dati di tesseramento</strong>: per tutta la durata del rapporto associativo e per 5 anni successivi</li>
              <li><strong>Dati di navigazione</strong>: 30 giorni</li>
            </ul>
          </section>

          <section id="diritti" className="privacy__sezione">
            <h2>6. Diritti dell'interessato</h2>
            <p>Ai sensi degli artt. 15-22 del GDPR, l'interessato ha il diritto di:</p>
            <div className="privacy__diritti-grid">
              <div className="privacy__diritto">
                <span className="privacy__diritto-icon">📋</span>
                <strong>Accesso</strong>
                <p>Ottenere conferma del trattamento e copia dei dati</p>
              </div>
              <div className="privacy__diritto">
                <span className="privacy__diritto-icon">✏️</span>
                <strong>Rettifica</strong>
                <p>Correggere dati inesatti o incompleti</p>
              </div>
              <div className="privacy__diritto">
                <span className="privacy__diritto-icon">🗑️</span>
                <strong>Cancellazione</strong>
                <p>Ottenere la cancellazione dei dati</p>
              </div>
              <div className="privacy__diritto">
                <span className="privacy__diritto-icon">⏸️</span>
                <strong>Limitazione</strong>
                <p>Limitare il trattamento dei dati</p>
              </div>
              <div className="privacy__diritto">
                <span className="privacy__diritto-icon">📦</span>
                <strong>Portabilita</strong>
                <p>Ricevere i dati in formato strutturato</p>
              </div>
              <div className="privacy__diritto">
                <span className="privacy__diritto-icon">🚫</span>
                <strong>Opposizione</strong>
                <p>Opporsi al trattamento dei dati</p>
              </div>
            </div>
            <p style={{ marginTop: '16px' }}>
              Per esercitare questi diritti, contattare:  <a href="mailto:uipanazionale@gmail.com">uipanazionale@gmail.com</a>. 
              E possibile inoltre proporre reclamo al Garante per la Protezione dei Dati Personali 
              (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">www.garanteprivacy.it</a>).
            </p>
          </section>

          <section id="cookie" className="privacy__sezione">
            <h2>7. Cookie</h2>
            <p>
              Il sito utilizza esclusivamente <strong>cookie tecnici</strong> necessari al funzionamento del sito. 
              Non vengono utilizzati cookie di profilazione o di marketing. 
              Per maggiori informazioni consulta la nostra <a href="/cookie-policy">Cookie Policy</a>.
            </p>
          </section>

          <section id="terze-parti" className="privacy__sezione">
            <h2>8. Terze parti</h2>
            <p>Il sito potrebbe utilizzare servizi di terze parti:</p>
            <ul className="privacy__lista">
              <li><strong>Google Maps</strong> — per la visualizzazione della mappa (Privacy Policy: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a>)</li>
              <li><strong>Google Fonts</strong> — per i caratteri tipografici</li>
            </ul>
          </section>

          <section id="contatti" className="privacy__sezione">
            <h2>9. Contatti</h2>
            <div className="privacy__box">
              <p>Per qualsiasi informazione sul trattamento dei dati personali:</p>
              <p>Email:  <a href="mailto:uipanazionale@gmail.com">uipanazionale@gmail.com</a></p>
              <p>Telefono: <a href="tel:0823320088">0823 320088</a></p>
              <p>Indirizzo: Via Arena 37, 81100 Caserta</p>
            </div>
          </section>

        </div>
      </div>
    </PageTemplate>
  );
};

export default PrivacyPolicyPage;