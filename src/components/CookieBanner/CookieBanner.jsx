import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CookieBanner.css';

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('uipa_cookie_consent');
    if (!consent) setVisible(true);
  }, []);

  const accettaTutti = () => {
    localStorage.setItem('uipa_cookie_consent', 'all');
    setVisible(false);
  };

  const soloNecessari = () => {
    localStorage.setItem('uipa_cookie_consent', 'necessary');
    setVisible(false);
  };

  const rifiuta = () => {
    localStorage.setItem('uipa_cookie_consent', 'rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-banner__inner">
        <div className="cookie-banner__testo">
          <h4> Utilizziamo i cookie</h4>
          <p>
            Questo sito utilizza cookie tecnici necessari al funzionamento e, con il tuo consenso, 
            cookie analitici per migliorare l'esperienza. 
            Consulta la nostra <Link to="/cookie-policy">Cookie Policy</Link> e la <Link to="/privacy">Privacy Policy</Link>.
          </p>
        </div>
        <div className="cookie-banner__azioni">
          <button onClick={rifiuta} className="cookie-banner__btn cookie-banner__btn--rifiuta">
            Rifiuta
          </button>
          <button onClick={soloNecessari} className="cookie-banner__btn cookie-banner__btn--necessari">
            Solo necessari
          </button>
          <button onClick={accettaTutti} className="cookie-banner__btn cookie-banner__btn--accetta">
            Accetta tutti
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;