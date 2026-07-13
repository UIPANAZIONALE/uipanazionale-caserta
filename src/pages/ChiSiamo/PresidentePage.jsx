import React from 'react';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import './PresidentePage.css';

const PresidentePage = () => (
  <PageTemplate titolo="Il Presidente" sottotitolo="Chi guida UIPA Nazionale"
  immagine={require('../../assets/heropresidente.png')}
  
  >

    <div className="presidente__layout">

      {/* Testo */}
      <div className="presidente__testo">
        <h2 className="presidente__nome">Massimo Russo</h2>
        <div className="presidente__info">
          <p>Presidente UIPA Nazionale dal 2014</p>
          <p>Nato a Caserta il 5 novembre 1968 dove vive, sposato con tre figli</p>
          <p>Laureato in Scienze della Politica</p>
          <p>Consulente del Lavoro</p>
        </div>

        <p className="presidente__bio">
          Impegnato sin da giovane, ha rappresentato in diverse occasioni organizzazioni
          del Lavoro, dell'Agricoltura e della Formazione.
        </p>

        <div className="presidente__sezione">
          <h3>Ha presieduto</h3>
          <ul>
            <li>Presidente Regionale della COPAGRI CAMPANIA, nonche membro della Direzione Nazionale COPAGRI</li>
            <li>Presidente Nazionale UNTIA (Unione Nazionale Tutele in agricoltura)</li>
            <li>Presidente/Amministratore Unico C.d.A. del CAF AIC srl</li>
            <li>Amministratore Unico C.A.A. UIPA Srl</li>
            <li>Componente del C.d.A. COPGRIFORM</li>
            <li>Amministratore Pubblico per anni impegnato in Politica, Consigliere Comunale, Assessore/Provinciale della Citta di Caserta</li>
          </ul>
        </div>

        <div className="presidente__missione">
          <h3>La missione</h3>
          <p>
            La crescita di UIPA, attraverso la rappresentanza delle Professionalita
            in Agricoltura, delle Micro-imprese, dei lavoratori del comparto e in
            generale i diritti delle Professioni.
          </p>
        </div>
      </div>

    {/* Foto */}
<div className="presidente__foto-col">
  <div className="presidente__foto-box">
    <img 
      src={require('../../assets/massimorusso.jpg')} 
      alt="Massimo Russo - Presidente UIPA"
      className="presidente__foto"
    />
    <div className="presidente__card">
      <h4>Massimo Russo</h4>
      <p>Presidente UIPA Nazionale</p>
      <p>In carica dal 2014</p>
    </div>
  </div>
</div>

    </div>

  </PageTemplate>
);

export default PresidentePage;