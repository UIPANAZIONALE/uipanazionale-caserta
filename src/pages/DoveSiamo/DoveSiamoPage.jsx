import React from 'react';
import PageTemplate from '../../components/PageTemplate/PageTemplate';

const DoveSiamoPage = () => (
  <PageTemplate titolo="Dove siamo" sottotitolo="Come raggiungerci"
   immagine={require('../../assets/herodovesiamo.png')}>

    <p><strong>Via Arena, 37 – 81100 Caserta</strong></p>
    <p style={{ marginBottom: '20px' }}>
      Tel: <a href="tel:0823320088">0823 320088</a>
    </p>

    <iframe
      title="Dove siamo"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.1252325714077!2d14.34569479785833!3d41.06625514138477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133a545af49fc2e3%3A0xcf1d5f59a0e222f8!2sVia%20Maggiore%20Salvatore%20Arena%2C%2037%2C%2081100%20Caserta%20CE!5e0!3m2!1sit!2sit!4v1623747893818!5m2!1sit!2sit"
      width="100%"
      height="420"
      style={{ border: 0, borderRadius: '4px' }}
      allowFullScreen=""
      loading="lazy"
    />

  </PageTemplate>
);

export default DoveSiamoPage;
