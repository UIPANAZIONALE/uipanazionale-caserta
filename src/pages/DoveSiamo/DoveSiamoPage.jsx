import React from 'react';
import PageTemplate from '../../components/PageTemplate/PageTemplate';

const DoveSiamoPage = () => (
  <PageTemplate titolo="Dove siamo" sottotitolo="Come raggiungerci"
   immagine={require('../../assets/herodovesiamo.png')}>

    <p><strong>Via Sicilia – 00187 Roma</strong></p>
    <p style={{ marginBottom: '20px' }}>
      Tel: <a href="tel:0642020719">06 42020719</a>
    </p>

    <iframe
      title="Dove siamo"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d371.15787914679925!2d12.490738421549306!3d41.908703950644075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f61073dcd4a9b%3A0x9d97087a3187476!2sVia%20Sicilia%2C%2050%2C%2000187%20Roma%20RM!5e0!3m2!1sit!2sit!4v1783954524095!5m2!1sit!2sit"
      height="420"
      style={{ border: 0, borderRadius: '4px' }}
      allowFullScreen=""
      loading="lazy"
    />

  </PageTemplate>
);

export default DoveSiamoPage;