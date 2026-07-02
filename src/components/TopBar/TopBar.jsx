import React from 'react';
import './TopBar.css';

const TopBar = () => {
  return (
    <div className="topbar">
      <div className="container topbar__inner">

        <div className="topbar__links">
          <a href="http://gestionale.uipa.it" target="_blank" rel="noopener noreferrer">
            GESTIONALE
          </a>
          <a href="/login">
            AREA RISERVATA
          </a>
          <a href="https://webmail.aruba.it/" target="_blank" rel="noopener noreferrer">
            WEB MAIL
          </a>
        </div>

        <div className="topbar__social">
          <a href="https://www.facebook.com/uipaitalia/" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
        </div>

      </div>
    </div>
  );
};

export default TopBar;
