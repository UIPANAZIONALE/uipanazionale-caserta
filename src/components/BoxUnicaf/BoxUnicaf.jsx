import React, { useState, useEffect } from 'react';
import './BoxUnicaf.css';

const serviziUnicaf = ['ISEE Online', 'Modello 730', 'Patronato INPS', 'Successioni', 'CAF Online'];

const BoxUnicaf = ({ layout = 'sidebar' }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % serviziUnicaf.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

return (
  <div className={`box-unicaf box-unicaf--${layout}`}>
    {layout === 'banner-home' ? (
      <div className="box-unicaf__inner">
        <div className="box-unicaf__banner-testo">
          <span className="box-unicaf__badge">✦ CAF Autorizzato MEF</span>
          <h3 className="box-unicaf__banner-titolo">Pratiche fiscali online, senza code</h3>
          <p className="box-unicaf__banner-desc">
            ISEE, 730, Patronato, Successioni — tutto online in 24 ore. Oltre 10.000 pratiche gestite.
          </p>
        </div>
        <div className="box-unicaf__banner-centro">
          <div className="box-unicaf__servizio">
            <span key={current} className="box-unicaf__testo">✦ {serviziUnicaf[current]}</span>
          </div>
        </div>
        <div className="box-unicaf__banner-destra">
          <a href="https://unicafsrl.it" target="_blank" rel="noopener noreferrer" className="box-unicaf__btn">
            Scopri UNICAF →
          </a>
          <span className="box-unicaf__convenzione">servizio in convenzione</span>
        </div>
      </div>
    ) : (
      <div className="box-unicaf__inner">
        <h4 className="box-unicaf__titolo">UNICAF</h4>
        <p className="box-unicaf__sub">Assistenza fiscale 100% online</p>
        <div className="box-unicaf__servizio">
          <span key={current} className="box-unicaf__testo">✦ {serviziUnicaf[current]}</span>
        </div>
        <a href="https://unicafsrl.it" target="_blank" rel="noopener noreferrer" className="box-unicaf__btn">
          Scopri →
        </a>
        <span className="box-unicaf__convenzione">servizio in convenzione</span>
      </div>
    )}
  </div>
);
};

export default BoxUnicaf;