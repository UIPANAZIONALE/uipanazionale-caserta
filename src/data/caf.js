const caf = {
  desc: 'La UIPA offre assistenza fiscale e previdenziale per aiutare cittadini, lavoratori e pensionati a gestire pratiche come dichiarazioni dei redditi, calcolo dell\'ISEE, IMU e altri adempimenti. Con un team di esperti, la UIPA garantisce supporto professionale per semplificare le procedure e assicurare il rispetto delle scadenze fiscali.',
  servizi: [
    {
      id: 'spid',
      titolo: 'SPID',
      desc: 'Assistenza per il rilascio e la gestione dell\'identita digitale SPID.',
      sezioni: [
        { titolo: 'Che cos\'e lo SPID', testo: 'Lo SPID (Sistema Pubblico di Identita Digitale) e il sistema di accesso ai servizi online della Pubblica Amministrazione e dei privati aderenti. Con un\'unica identita digitale puoi accedere a tutti i servizi online di INPS, Agenzia delle Entrate, Fascicolo Sanitario e molti altri.' },
        { titolo: 'Come ottenerlo', testo: 'Il CAF UIPA assiste il cittadino nella procedura di rilascio dello SPID, dal riconoscimento dell\'identita alla scelta del gestore, fino all\'attivazione delle credenziali.' },
      ],
    },
    {
      id: 'modello-730',
      titolo: 'Modello 730',
      desc: 'Dichiarazione dei redditi per lavoratori dipendenti e pensionati.',
      sezioni: [
        { titolo: 'Che cos\'e il Modello 730', testo: 'Il Modello 730 e la dichiarazione dei redditi riservata ai lavoratori dipendenti e pensionati. Permette di dichiarare i redditi percepiti nell\'anno precedente e di beneficiare di detrazioni e deduzioni fiscali.' },
        { titolo: 'Documenti necessari', testo: 'Per compilare il 730 servono: documento d\'identita, codice fiscale, CU (Certificazione Unica) del datore di lavoro o dell\'INPS, spese sanitarie, interessi sul mutuo, spese per istruzione, ristrutturazioni e altri oneri detraibili.' },
        { titolo: 'Scadenza', testo: 'Il Modello 730 va presentato entro il 30 settembre dell\'anno successivo a quello di imposta. Il CAF UIPA gestisce tutta la procedura di compilazione e invio telematico.' },
      ],
    },
    {
      id: 'modello-redditi-pf',
      titolo: 'Modello Redditi Persone Fisiche',
      desc: 'Dichiarazione dei redditi per lavoratori autonomi, liberi professionisti e altri soggetti.',
      sezioni: [
        { titolo: 'Che cos\'e', testo: 'Il Modello Redditi Persone Fisiche (ex Unico) e la dichiarazione dei redditi per chi non puo presentare il 730: lavoratori autonomi, liberi professionisti, titolari di partita IVA, soggetti con redditi di capitale o redditi esteri.' },
        { titolo: 'Scadenza', testo: 'Il Modello Redditi va presentato entro il 30 novembre dell\'anno successivo a quello di imposta. Il CAF UIPA assiste nella compilazione e nell\'invio telematico.' },
      ],
    },
    {
      id: 'isee',
      titolo: 'ISEE',
      desc: 'Calcolo dell\'Indicatore della Situazione Economica Equivalente per accedere a prestazioni sociali agevolate.',
      sezioni: [
        { titolo: 'Che cos\'e l\'ISEE', testo: 'L\'ISEE e lo strumento che misura la condizione economica del nucleo familiare. E necessario per accedere a numerose prestazioni sociali agevolate: assegno unico, bonus asilo nido, agevolazioni universitarie, tariffe ridotte per servizi pubblici.' },
        { titolo: 'Documenti necessari', testo: 'Per calcolare l\'ISEE servono: documento d\'identita e codice fiscale di tutti i componenti del nucleo, dati reddituali (dichiarazione dei redditi o CU), dati patrimoniali (conti correnti, depositi, immobili), eventuali spese per figli disabili.' },
        { titolo: 'Scadenza', testo: 'La DSU (Dichiarazione Sostitutiva Unica) per il calcolo ISEE ha validita annuale e si rinnova ogni anno. Il CAF UIPA compila e invia la DSU gratuitamente.' },
      ],
    },
    {
      id: 'imu',
      titolo: 'IMU – Imposta Municipale Propria',
      desc: 'Assistenza per il calcolo e il pagamento dell\'IMU sugli immobili.',
      sezioni: [
        { titolo: 'Che cos\'e l\'IMU', testo: 'L\'IMU e l\'imposta che si paga sugli immobili diversi dall\'abitazione principale. Si paga in due rate: acconto entro il 16 giugno e saldo entro il 16 dicembre. L\'aliquota varia in base al Comune e alla tipologia di immobile.' },
        { titolo: 'Come funziona', testo: 'Il CAF UIPA assiste nel calcolo dell\'IMU, nella compilazione del modello F24 per il pagamento e nella dichiarazione IMU quando necessaria (in caso di variazioni del patrimonio immobiliare).' },
      ],
    },
    {
      id: 'pratiche-successione',
      titolo: 'Pratiche di successione',
      desc: 'Assistenza per la dichiarazione di successione e il trasferimento dei beni ereditari.',
      sezioni: [
        { titolo: 'Che cos\'e', testo: 'La dichiarazione di successione e il documento che gli eredi devono presentare all\'Agenzia delle Entrate entro 12 mesi dalla data del decesso. E necessaria per il trasferimento degli immobili e per la liquidazione dell\'imposta di successione.' },
        { titolo: 'Documenti necessari', testo: 'Per la dichiarazione di successione servono: certificato di morte, atti di nascita e documenti di identita degli eredi, visure catastali degli immobili, estratti conto bancari, eventuali testamenti.' },
      ],
    },
    {
      id: 'servizi-catastali',
      titolo: 'Servizi Catastali',
      desc: 'Assistenza per visure, planimetrie e pratiche catastali.',
      sezioni: [
        { titolo: 'Che cos\'e', testo: 'Il CAF UIPA offre assistenza per tutte le pratiche catastali: visure catastali (per verificare i dati di un immobile), planimetrie catastali, volture catastali (per aggiornare l\'intestazione di un immobile dopo una compravendita o successione).' },
      ],
    },
    {
      id: 'contenzioso-fiscale',
      titolo: 'Contenzioso fiscale',
      desc: 'Assistenza nel contenzioso fiscale con l\'Agenzia delle Entrate.',
      sezioni: [
        { titolo: 'Che cos\'e', testo: 'Il CAF UIPA assiste il cittadino in caso di avvisi di accertamento, cartelle esattoriali, avvisi bonari e altri atti dell\'Agenzia delle Entrate o dell\'Agenzia delle Entrate Riscossione. Offre supporto per la presentazione di istanze di autotutela, ricorsi e accordi in mediazione.' },
      ],
    },
    {
      id: 'modelli-red-acc',
      titolo: 'Modelli RED e ACC.AS/PS',
      desc: 'Compilazione dei modelli RED e ACC.AS/PS per prestazioni collegate al reddito.',
      sezioni: [
        { titolo: 'Modello RED', testo: 'Il Modello RED e la dichiarazione che i pensionati devono inviare all\'INPS per comunicare i redditi non risultanti dalle dichiarazioni fiscali. E necessario per il calcolo delle prestazioni collegate al reddito (pensioni di reversibilita, assegno sociale, integrazioni al minimo).' },
        { titolo: 'Modello ACC.AS/PS', testo: 'Il Modello ACC.AS/PS serve per dichiarare i redditi ai fini del calcolo dell\'assegno sociale e delle pensioni al minimo. Il CAF UIPA assiste nella compilazione e nell\'invio telematico entro le scadenze previste.' },
      ],
    },
    {
      id: 'credito-imposta',
      titolo: 'Credito d\'imposta beni strumentali',
      desc: 'Assistenza per il credito d\'imposta sugli investimenti in beni strumentali.',
      sezioni: [
        { titolo: 'Che cos\'e', testo: 'Il credito d\'imposta per investimenti in beni strumentali e un\'agevolazione fiscale per le imprese che acquistano macchinari, attrezzature e beni immateriali legati alla trasformazione tecnologica (Industria 4.0). Il CAF UIPA assiste nella corretta applicazione e compensazione del credito.' },
      ],
    },
    {
      id: 'bonus-200',
      titolo: 'Bonus 200 euro D.L. aiuti',
      desc: 'Assistenza per la richiesta del bonus una tantum di 200 euro.',
      sezioni: [
        { titolo: 'Che cos\'e', testo: 'Il bonus 200 euro e stato introdotto dal Decreto Aiuti come misura una tantum di sostegno economico per lavoratori dipendenti, pensionati, autonomi e disoccupati con redditi bassi, per fronteggiare il caro vita. Il CAF UIPA assiste nella verifica dei requisiti e nella presentazione della domanda.' },
      ],
    },
    {
      id: 'adi-caf',
      titolo: 'Assegno di Inclusione (ADI)',
      desc: 'Assistenza per la richiesta dell\'Assegno di Inclusione.',
      sezioni: [
        { titolo: 'Che cos\'e', testo: 'L\'Assegno di Inclusione e la misura di sostegno economico introdotta nel 2024 per nuclei familiari in difficolta con componenti fragili (minori, disabili, over 60). Il CAF UIPA assiste nella verifica dei requisiti, nel calcolo dell\'ISEE e nella presentazione della domanda.' },
      ],
    },
  ],
};

export default caf;