import React from 'react';
import './TopBar.css';

const TopBar = () => (
  <div className="topbar">
    <div className="container topbar__inner">
      <div className="topbar__links">
        <a href="http://gestionale.uipa.it" target="_blank" rel="noopener noreferrer">
          GESTIONALE
        </a>
        <a href="/login" title="Area Riservata">
          🔒 AREA RISERVATA
        </a>
        <a href="https://webmail.aruba.it/" target="_blank" rel="noopener noreferrer">
          WEB MAIL
        </a>
      </div>
    </div>
  </div>
);

export default TopBar;