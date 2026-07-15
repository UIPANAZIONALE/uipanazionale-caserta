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
      <div className="box-unicaf__inner">
        <h4 className="box-unicaf__titolo">UNICAF</h4>
        <p className="box-unicaf__sub">Assistenza fiscale 100% online</p>
        <div className="box-unicaf__servizio">
          <span key={current} className="box-unicaf__testo">
            ✦ {serviziUnicaf[current]}
          </span>
        </div>
        <a
          href="https://unicafsrl.it"
          target="_blank"
          rel="noopener noreferrer"
          className="box-unicaf__btn"
        >
          Scopri →
        </a>
        <span className="box-unicaf__convenzione">servizio in convenzione</span>
      </div>
    </div>
  );
};

export default BoxUnicaf;