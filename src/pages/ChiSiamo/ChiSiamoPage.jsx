import React from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import './ChiSiamoPage.css';

const ChiSiamoPage = () => {
  return (
    <PageTemplate
      titolo="Chi siamo"
      sottotitolo="Unione Italiana Professionalita in Agricoltura"
    >

      <div className="chisiamo__intro">

        <div className="chisiamo__testo">
          <p>
            UIPA - Unione Italiana Professionalita in Agricoltura - e una organizzazione
            professionale che tutela i diritti e gli interessi di tutti i lavoratori autonomi
            operanti, a qualsiasi livello, nel settore agricolo, agroalimentare, sia in forma
            singola che associata.
          </p>
          <p>
            L'organizzazione opera su tutto il territorio nazionale attraverso una rete di sedi
            provinciali e regionali, offrendo servizi di patronato, assistenza fiscale, consulenza
            sindacale e molto altro.
          </p>
          <p>
            UIPA e affiliata alla CIU - Confederazione Italiana di Unioni delle professioni
            intellettuali - ed e membro attivo della rete sociale che comprende UIDD, SEAL,
            CeART e ANMIL.
          </p>
        </div>

        <div className="chisiamo__box">
          <h3>Organi sociali</h3>
          <ul>
            <li><Link to="/chi-siamo/presidente">Il Presidente</Link></li>
            <li><Link to="/chi-siamo/giunta-esecutiva">La Giunta Esecutiva</Link></li>
            <li><Link to="/chi-siamo/direzione-nazionale">La Direzione Nazionale</Link></li>
          </ul>
        </div>

      </div>

      <div className="chisiamo__valori">
        <h2 className="section-title">I nostri valori</h2>
        <div className="chisiamo__valori-grid">
          <div className="valore-card">
            <h3>Tutela</h3>
            <p>Difendiamo i diritti di ogni lavoratore autonomo nel settore agricolo.</p>
          </div>
          <div className="valore-card">
            <h3>Professionalita</h3>
            <p>Offriamo servizi di alta qualita attraverso personale qualificato.</p>
          </div>
          <div className="valore-card">
            <h3>Territorio</h3>
            <p>Siamo presenti capillarmente in tutta Italia con sedi provinciali.</p>
          </div>
        </div>
      </div>

    </PageTemplate>
  );
};

export default ChiSiamoPage;
