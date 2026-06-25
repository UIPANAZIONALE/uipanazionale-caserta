import React from 'react';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import './GiuntaEsecutivaPage.css';

const membri = [
  { nome: 'Massimo Russo', ruolo: 'Presidente' },
  { nome: 'Raffaele Petrilli', ruolo: 'Vice Presidente' },
  { nome: 'Antonella Natale', ruolo: 'Responsabile Organizzazione' },
];

const GiuntaEsecutivaPage = () => (
  <PageTemplate titolo="Giunta Esecutiva" sottotitolo="Gli organi di governo di UIPA Nazionale"
    immagine={require('../../assets/herogiunta.png')}>

    <div className="giunta__intro">
      <p>
        La Giunta Esecutiva e l'organo collegiale che guida e coordina le attivita
        di UIPA Nazionale, garantendo il perseguimento degli obiettivi statutari
        e la tutela degli interessi degli iscritti.
      </p>
    </div>

    <h2 className="section-title">Composizione</h2>
    <div className="giunta__grid">
      {membri.map((m, idx) => (
        <div key={idx} className="giunta__card">
          <div className="giunta__avatar">
            {m.nome.split(' ').map(n => n[0]).join('')}
          </div>
          <h3>{m.nome}</h3>
          <p>{m.ruolo}</p>
        </div>
      ))}
    </div>

  </PageTemplate>
);

export default GiuntaEsecutivaPage;