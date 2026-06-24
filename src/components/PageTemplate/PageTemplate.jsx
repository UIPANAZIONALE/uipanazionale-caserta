import React from 'react';
import './PageTemplate.css';

const PageTemplate = ({ titolo, sottotitolo, immagine, children }) => {
  return (
    <div className="page">
      <div
        className="page__header"
        style={immagine ? {
          backgroundImage: `url(${immagine})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        } : {}}
      >
        <div className="page__header-overlay">
          <div className="container">
            <h1 className="page__title">{titolo}</h1>
            {sottotitolo && <p className="page__subtitle">{sottotitolo}</p>}
          </div>
        </div>
      </div>

      <div className="page__body section">
        <div className="container">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageTemplate;