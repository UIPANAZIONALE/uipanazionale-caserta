import React from 'react';
import './PageTemplate.css';

const PageTemplate = ({ titolo, sottotitolo, children }) => {
  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1 className="page-header__titolo">{titolo}</h1>
          {sottotitolo && (
            <p className="page-header__sottotitolo">{sottotitolo}</p>
          )}
        </div>
      </div>
      <section className="page-content">
        <div className="container">
          {children}
        </div>
      </section>
    </div>
  );
};

export default PageTemplate;
