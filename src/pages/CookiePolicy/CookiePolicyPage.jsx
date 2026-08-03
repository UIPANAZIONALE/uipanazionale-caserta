import React from 'react';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import './CookiePolicyPage.css';

const CookiePolicyPage = () => {
  return (
    <PageTemplate titolo="Cookie Policy" sottotitolo="Informativa sull'uso dei cookie — art. 122 D.Lgs. 196/2003">
      <div className="privacy__layout">

        <aside className="privacy__indice">
          <h4>Indice</h4>
          <ul>
            <li><a href="#cosa">1. Cosa sono i cookie</a></li>
            <li><a href="#tipi">2. Tipi di cookie</a></li>
            <li><a href="#usiamo">3. Cookie che usiamo</a></li>
            <li><a href="#terze-parti">4. Cookie di terze parti</a></li>
            <li><a href="#gestione">5. Gestione cookie</a></li>
            <li><a href="#contatti">6. Contatti</a></li>
          </ul>
        </aside>

        <div className="privacy__contenuto">

          <div className="privacy__aggiornamento">
            <span>Ultimo aggiornamento: Luglio 2026</span>
          </div>

          <div className="privacy__intro">
            <p>
              La presente Cookie Policy descrive come <strong>UIPA – Unione Italiana Professionalita in Agricoltura</strong> 
              utilizza i cookie e tecnologie simili sul sito <strong>www.uipanazionale.it</strong>, 
              in conformita alla normativa vigente (art. 122 D.Lgs. 196/2003 e Provvedimento Garante 8 maggio 2014).
            </p>
          </div>

          <section id="cosa" className="privacy__sezione">
            <h2>1. Cosa sono i cookie</h2>
            <p>
              I cookie sono piccoli file di testo che i siti web visitati inviano al browser dell'utente, 
              dove vengono memorizzati per essere ritrasmessi alla visita successiva. Permettono al sito 
              di ricordare le preferenze dell'utente e di migliorare l'esperienza di navigazione.
            </p>
          </section>

          <section id="tipi" className="privacy__sezione">
            <h2>2. Tipi di cookie</h2>
            <ul className="privacy__lista">
              <li><strong>Cookie tecnici</strong> — necessari per il funzionamento del sito, non richiedono consenso</li>
              <li><strong>Cookie analitici</strong> — raccolgono informazioni aggregate sull'uso del sito</li>
              <li><strong>Cookie di profilazione</strong> — tracciano le abitudini dell'utente per mostrare pubblicita mirata</li>
            </ul>
          </section>
<section id="usiamo" className="privacy__sezione">
  <h2>3. Cookie che usiamo</h2>
  <div className="privacy__table">
    <div className="privacy__table-row privacy__table-header">
      <div>Nome</div>
      <div>Tipo</div>
      <div>Durata</div>
      <div>Scopo</div>
    </div>
    <div className="privacy__table-row">
      <div>uipa_cookie_consent</div>
      <div>Tecnico</div>
      <div>12 mesi</div>
      <div>Salva la scelta sui cookie</div>
    </div>
    <div className="privacy__table-row">
      <div>uipa_token</div>
      <div>Tecnico</div>
      <div>Sessione</div>
      <div>Autenticazione area admin</div>
    </div>
    <div className="privacy__table-row">
      <div>_ga</div>
      <div>Analitico</div>
      <div>2 anni</div>
      <div>Google Analytics - distingue gli utenti</div>
    </div>
    <div className="privacy__table-row">
      <div>_ga_39EM6MQDPR</div>
      <div>Analitico</div>
      <div>2 anni</div>
      <div>Google Analytics - mantiene lo stato della sessione</div>
    </div>
  </div>
  <p style={{ marginTop: '16px', color: '#666', fontSize: '0.88rem' }}>
    ℹ️ I cookie analitici vengono attivati <strong>solo con il consenso</strong> dell'utente.
  </p>
</section>

<section id="terze-parti" className="privacy__sezione">
  <h2>4. Cookie di terze parti</h2>
  <div className="privacy__table">
    <div className="privacy__table-row privacy__table-header">
      <div>Servizio</div>
      <div>Scopo</div>
      <div>Privacy Policy</div>
    </div>
    <div className="privacy__table-row">
      <div>Google Maps</div>
      <div>Visualizzazione mappa</div>
      <div><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Leggi</a></div>
    </div>
    <div className="privacy__table-row">
      <div>Google Fonts</div>
      <div>Caratteri tipografici</div>
      <div><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Leggi</a></div>
    </div>
    <div className="privacy__table-row">
      <div>Google Analytics</div>
      <div>Statistiche visite e comportamento utenti</div>
      <div><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Leggi</a></div>
    </div>
  </div>
</section>

          <section id="gestione" className="privacy__sezione">
            <h2>5. Gestione cookie</h2>
            <p>L'utente puo gestire i cookie tramite le impostazioni del proprio browser:</p>
            <ul className="privacy__lista">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/it/kb/Gestione%20dei%20cookie" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
              <li><a href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
            </ul>
            <p>La disabilitazione dei cookie tecnici potrebbe compromettere il corretto funzionamento del sito.</p>
          </section>

          <section id="contatti" className="privacy__sezione">
            <h2>6. Contatti</h2>
            <div className="privacy__box">
              <p>Per qualsiasi informazione sui cookie:</p>
              <p>Email:  <a href="mailto:uipanazionale@gmail.com">uipanazionale@gmail.com</a></p>
              <p>Telefono: <a href="tel:0823320088">0823 320088</a></p>
            </div>
          </section>

        </div>
      </div>
    </PageTemplate>
  );
};

export default CookiePolicyPage;