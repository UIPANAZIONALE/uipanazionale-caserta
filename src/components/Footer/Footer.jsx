import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer__grid">

        <div>
          <h4 className="footer__title">UIPA</h4>
          <p className="footer__desc">
            UIPA - Unione Italiana Professionalita in Agricoltura - e una
            organizzazione professionale che tutela i diritti e gli interessi
            di tutti i lavoratori autonomi operanti nel settore agricolo e
            agroalimentare.
          </p>
        </div>

        <div>
          <h4 className="footer__title">Menu</h4>
          <ul className="footer__list">
            <li><Link to="/chi-siamo">Chi siamo</Link></li>
            <li><Link to="/servizi">Servizi</Link></li>
            <li><Link to="/convenzioni">Convenzioni</Link></li>
            <li><Link to="/apri-una-sede">Apri una sede</Link></li>
            <li><Link to="/ccnl">CCNL</Link></li>
            <li><Link to="/tesseramento">Tesseramento</Link></li>
            <li><Link to="/sedi">Sedi</Link></li>
            <li><Link to="/contatti">Contatti</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer__title">Servizi</h4>
          <ul className="footer__list">
            <li><Link to="/servizi/patronato">Patronato</Link></li>
            <li><Link to="/servizi/caf">CAF</Link></li>
            <li>
              <a href="https://www.caauipa.it/" target="_blank" rel="noopener noreferrer">
                CAA
              </a>
            </li>
            <li>
              <a href="https://www.uidd.it/uidd/lavoro-domestico/" target="_blank" rel="noopener noreferrer">
                Lavoro Domestico
              </a>
            </li>
            <li>
              <a href="https://www.usacademy.it/" target="_blank" rel="noopener noreferrer">
                Formazione
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="footer__title">Contatti</h4>
          <address className="footer__address">
            <p>Tel: <a href="tel:0642020719">06 42020719</a></p>
            <p>Email: <a href="mailto:info@uipa.it">info@uipa.it</a></p>
            <p>
              <a href="https://www.facebook.com/uipaitalia/" target="_blank" rel="noopener noreferrer">
                Facebook UIPA
              </a>
            </p>
          </address>
        </div>

      </div>

      <div className="footer__bottom">
        <div className="container">
          <p>
            Tel: 06 42020719 - Email: <a href="mailto:info@uipa.it">info@uipa.it</a>
            &nbsp;|&nbsp;
            copyright {new Date().getFullYear()} UIPA.it - Tutti i diritti riservati
          </p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
