import React from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../components/PageTemplate/PageTemplate';

const NotFoundPage = () => (
  <PageTemplate titolo="Pagina non trovata">
    <p>La pagina che stai cercando non esiste o e stata spostata.</p>
    <Link to="/"
      style={{
        display: 'inline-block',
        marginTop: '16px',
        background: '#f0a500',
        color: '#fff',
        padding: '10px 24px',
        borderRadius: '3px',
        textDecoration: 'none',
        fontWeight: '700'
      }}>
      Torna alla home
    </Link>
  </PageTemplate>
);

export default NotFoundPage;
