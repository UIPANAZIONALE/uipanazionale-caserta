import React, { useState } from 'react';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import './SediPage.css';

const sedi = [
  { nome: 'UIPA AVEZZANO', indirizzo: 'Via Innocenzio Serafini, 12', cap: '67051', citta: 'Avezzano', provincia: 'AQ', regione: 'Abruzzo' },
  { nome: 'UIPA POTENZA', indirizzo: 'Via Dottor Anzilotta, 18', cap: '85038', citta: 'Senise', provincia: 'PZ', regione: 'Basilicata' },
  { nome: 'UIPA CASSANO ALLO IONIO', indirizzo: 'Via Zara, 16', cap: '87011', citta: 'Cassano allo Ionio', provincia: 'CS', regione: 'Calabria' },
  { nome: 'UIPA SCHIAVONEA', indirizzo: 'Via Provinciale', cap: '87064', citta: 'Schiavonea', provincia: 'CS', regione: 'Calabria' },
  { nome: 'UIPA LAMEZIA TERME', indirizzo: 'Via dei Mille, 23', cap: '88046', citta: 'Lamezia Terme', provincia: 'CZ', regione: 'Calabria' },
  { nome: 'UIPA AREA GRECANICA', indirizzo: 'Via XXIV Maggio, 143', cap: '89034', citta: 'Bovalino', provincia: 'RC', regione: 'Calabria' },
  { nome: 'UIPA REGGIO CALABRIA', indirizzo: 'Via De Salvo, 8', cap: '89015', citta: 'Palmi', provincia: 'RC', regione: 'Calabria' },
  { nome: 'UIPA REGGIO', indirizzo: 'Via San Pietro, 32', cap: '89135', citta: 'Reggio Calabria', provincia: 'RC', regione: 'Calabria' },
  { nome: 'UIPA VIBO VALENTIA', indirizzo: 'Via Corrado Alvaro, 15', cap: '89900', citta: 'Vibo Valentia', provincia: 'VV', regione: 'Calabria' },
  { nome: 'UIPA BENEVENTO', indirizzo: 'Piazza San Barbato, 4', cap: '82037', citta: 'Castelvenere', provincia: 'BN', regione: 'Campania' },
  { nome: 'UIPA AVELLINO', indirizzo: 'Via Frate Agostino da Casoria', cap: '81023', citta: 'Lauro', provincia: 'AV', regione: 'Campania' },
  { nome: 'UIPA CASERTA', indirizzo: 'Via Arena, 37', cap: '81100', citta: 'Caserta', provincia: 'CE', regione: 'Campania', principale: true },
  { nome: 'UIPA NAPOLI', indirizzo: 'Via Cavallotti, 1', cap: '80038', citta: 'Pomigliano', provincia: 'NA', regione: 'Campania' },
  { nome: 'UIPA BRUSCIANO', indirizzo: 'Viale Europa, 6', cap: '80031', citta: 'Brusciano', provincia: 'NA', regione: 'Campania' },
  { nome: 'UIPA SALERNO', indirizzo: 'Via Galloppo, 48', cap: '84128', citta: 'Salerno', provincia: 'SA', regione: 'Campania' },
  { nome: 'UIPA UDINE', indirizzo: 'Via Zorutti, 10', cap: '33043', citta: 'Cividale del Friuli', provincia: 'UD', regione: 'Friuli Venezia Giulia' },
  { nome: 'UIPA CASSINO', indirizzo: 'Via del Foro, 19', cap: '03043', citta: 'Cassino', provincia: 'FR', regione: 'Lazio' },
  { nome: 'UIPA ROMA', indirizzo: 'Via Licia, 14 int. 13', cap: '00183', citta: 'Roma', provincia: 'RM', regione: 'Lazio' },
  { nome: 'UIPA BATTISTINI', indirizzo: 'Via Mattia Battistini, 30', cap: '00167', citta: 'Roma', provincia: 'RM', regione: 'Lazio' },
  { nome: 'UIPA CASALOTTI', indirizzo: 'Via Borgo Ticino, 47', cap: '00166', citta: 'Roma', provincia: 'RM', regione: 'Lazio' },
  { nome: 'UIPA COLONNA', indirizzo: 'Via Frascati, 14', cap: '00030', citta: 'Colonna', provincia: 'RM', regione: 'Lazio' },
  { nome: 'UIPA CASTELLI', indirizzo: 'Via Giulio Giordani, 16', cap: '00030', citta: 'San Cesareo', provincia: 'RM', regione: 'Lazio' },
  { nome: 'UIPA LA SPEZIA', indirizzo: 'Via Crispi, 33 Scala D 2° piano', cap: '19124', citta: 'La Spezia', provincia: 'SP', regione: 'Liguria' },
  { nome: 'UIPA LARINO', indirizzo: 'Via Morrone, 66', cap: '86035', citta: 'Larino', provincia: 'CB', regione: 'Molise' },
  { nome: 'UIPA ISERNIA', indirizzo: 'Viale dei Pentri, 15', cap: '86170', citta: 'Isernia', provincia: 'IS', regione: 'Molise' },
  { nome: 'UIPA ALESSANDRIA', indirizzo: 'Via Tigliano, 14', cap: '15060', citta: 'Capriata d\'Orba', provincia: 'AL', regione: 'Piemonte' },
  { nome: 'UIPA TORINO', indirizzo: 'C.so Siracusa, 131/b', cap: '10137', citta: 'Torino', provincia: 'TO', regione: 'Piemonte' },
  { nome: 'UIPA BARI', indirizzo: 'Via Matarrese, 36', cap: '70124', citta: 'Bari', provincia: 'BA', regione: 'Puglia' },
  { nome: 'UIPA TORITTO', indirizzo: 'Via Ottorino Respighi, 2', cap: '70020', citta: 'Toritto', provincia: 'BA', regione: 'Puglia' },
  { nome: 'UIPA BAT', indirizzo: 'Via G. Tarantino, 13', cap: '76012', citta: 'Canosa di Puglia', provincia: 'BAT', regione: 'Puglia' },
  { nome: 'UIPA COPERTINO', indirizzo: 'Via Cosimo Mariano, 182', cap: '73043', citta: 'Copertino', provincia: 'LE', regione: 'Puglia' },
  { nome: 'UIPA FOGGIA', indirizzo: 'Via Piave, 93', cap: '71121', citta: 'Foggia', provincia: 'FG', regione: 'Puglia' },
  { nome: 'UIPA LECCE', indirizzo: 'Viale XXIV Maggio, 101', cap: '73044', citta: 'Galatone', provincia: 'LE', regione: 'Puglia' },
  { nome: 'UIPA OLIENA', indirizzo: 'Via Vittorio Emanuele, 14', cap: '08025', citta: 'Oliena', provincia: 'NU', regione: 'Sardegna' },
  { nome: 'UIPA CALTANISSETTA', indirizzo: 'Via Verga, 8', cap: '93018', citta: 'Santa Caterina Villarmosa', provincia: 'CL', regione: 'Sicilia' },
  { nome: 'UIPA CATANIA', indirizzo: 'Via Milo, 19', cap: '95125', citta: 'Catania', provincia: 'CT', regione: 'Sicilia' },
  { nome: 'UIPA ENNA', indirizzo: 'Piazza Giuseppe Garibaldi, 6-7', cap: '94100', citta: 'Enna', provincia: 'EN', regione: 'Sicilia' },
  { nome: 'UIPA LICODIA EUBEA', indirizzo: 'Corso Umberto I, 270', cap: '95040', citta: 'Licodia Eubea', provincia: 'CT', regione: 'Sicilia' },
  { nome: 'UIPA VITTORIA', indirizzo: 'Via Pietro Gentile, 43', cap: '97019', citta: 'Vittoria', provincia: 'RG', regione: 'Sicilia' },
  { nome: 'UIPA RAGUSA', indirizzo: 'Via Corso Italia, 192', cap: '97100', citta: 'Ragusa', provincia: 'RG', regione: 'Sicilia' },
  { nome: 'UIPA SIENA', indirizzo: 'Viale Cavour, 156/166', cap: '53100', citta: 'Siena', provincia: 'SI', regione: 'Toscana' },
];

const regioni = ['Tutte', ...new Set(sedi.map(s => s.regione))];

const SediPage = () => {
  const [regioneAttiva, setRegioneAttiva] = useState('Tutte');
  const [ricerca, setRicerca] = useState('');

  const sediFiltrate = sedi.filter(s => {
    const matchRegione = regioneAttiva === 'Tutte' || s.regione === regioneAttiva;
    const matchRicerca = s.nome.toLowerCase().includes(ricerca.toLowerCase()) ||
      s.citta.toLowerCase().includes(ricerca.toLowerCase()) ||
      s.provincia.toLowerCase().includes(ricerca.toLowerCase());
    return matchRegione && matchRicerca;
  });

  return (
    <PageTemplate titolo="Sedi" sottotitolo="Trova la sede UIPA piu vicina a te">

      {/* STATS */}
      <div className="sedi__stats">
        <div className="sedi__stat">
          <span className="sedi__stat-num">{sedi.length}</span>
          <span className="sedi__stat-label">Sedi in Italia</span>
        </div>
        <div className="sedi__stat">
          <span className="sedi__stat-num">{regioni.length - 1}</span>
          <span className="sedi__stat-label">Regioni coperte</span>
        </div>
        <div className="sedi__stat">
          <span className="sedi__stat-num">30+</span>
          <span className="sedi__stat-label">Anni di attivita</span>
        </div>
      </div>

      {/* RICERCA */}
      <div className="sedi__ricerca">
        <input
          type="text"
          placeholder="Cerca per citta, provincia o nome sede..."
          value={ricerca}
          onChange={(e) => setRicerca(e.target.value)}
          className="sedi__input"
        />
      </div>

      {/* FILTRI REGIONE */}
      <div className="sedi__filtri">
        {regioni.map((r) => (
          <button
            key={r}
            className={`sedi__filtro ${regioneAttiva === r ? 'sedi__filtro--attivo' : ''}`}
            onClick={() => setRegioneAttiva(r)}
          >
            {r}
          </button>
        ))}
      </div>

      {/* RISULTATI */}
      <p className="sedi__risultati">
        {sediFiltrate.length} {sediFiltrate.length === 1 ? 'sede trovata' : 'sedi trovate'}
      </p>

      {/* GRIGLIA SEDI */}
      <div className="sedi__grid">
        {sediFiltrate.map((s, idx) => (
          <div key={idx} className={`sedi__card ${s.principale ? 'sedi__card--principale' : ''}`}>
            {s.principale && <span className="sedi__badge">Sede provinciale</span>}
            <h3>{s.nome}</h3>
            <p>{s.indirizzo}</p>
            <p>{s.cap} {s.citta} ({s.provincia})</p>
            <span className="sedi__regione">{s.regione}</span>
          </div>
        ))}
      </div>

    </PageTemplate>
  );
};

export default SediPage;