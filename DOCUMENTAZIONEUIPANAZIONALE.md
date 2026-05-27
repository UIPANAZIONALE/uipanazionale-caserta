\# UIPA Caserta – Documentazione Tecnica



\---



\## 1. Stack tecnologico



| Tecnologia         | Versione | Scopo                                        |

| ------------------ | -------- | -------------------------------------------- |

| React              | 18       | UI library                                   |

| React Router DOM   | 6        | Routing client-side (navigazione tra pagine) |

| CSS per componente | —        | Stili isolati, nessuna libreria UI esterna   |

| Create React App   | 5        | Toolchain (webpack, babel, dev server)       |



> \*\*Nessuna libreria UI esterna\*\* (no Bootstrap, no MUI). Tutto scritto a mano per imparare e avere controllo totale.



\---



\## 2. Struttura cartelle



```

uipa-caserta/

│

├── public/

│   └── index.html                  ← HTML base, non si tocca quasi mai

│

├── src/

│   ├── assets/                     ← immagini, loghi, icone

│   │   └── logo.png

│   │

│   ├── components/                 ← componenti riutilizzabili in più pagine

│   │   ├── TopBar/

│   │   │   ├── TopBar.jsx

│   │   │   └── TopBar.css

│   │   ├── Navbar/

│   │   │   ├── Navbar.jsx

│   │   │   └── Navbar.css

│   │   └── Footer/

│   │       ├── Footer.jsx

│   │       └── Footer.css

│   │

│   ├── pages/                      ← una cartella per ogni pagina del sito

│   │   ├── Home/

│   │   │   ├── HomePage.jsx

│   │   │   └── HomePage.css

│   │   ├── ChiSiamo/

│   │   │   ├── ChiSiamoPage.jsx

│   │   │   └── ChiSiamoPage.css

│   │   ├── Presidente/

│   │   │   └── PresidentePage.jsx

│   │   ├── GiuntaEsecutiva/

│   │   │   └── GiuntaEsecutivaPage.jsx

│   │   ├── Servizi/

│   │   │   ├── ServiziPage.jsx

│   │   │   └── ServiziPage.css

│   │   ├── ServiziPatronato/

│   │   │   └── ServiziPatronatoPage.jsx

│   │   ├── ServiziCaf/

│   │   │   └── ServiziCafPage.jsx

│   │   ├── Convenzioni/

│   │   │   └── ConvenzioniPage.jsx

│   │   ├── ApriUnaSede/

│   │   │   └── ApriUnaSedePage.jsx

│   │   ├── Ccnl/

│   │   │   └── CcnlPage.jsx

│   │   ├── Tesseramento/

│   │   │   └── TesseramentoPage.jsx

│   │   ├── Sedi/

│   │   │   └── SediPage.jsx

│   │   ├── Contatti/

│   │   │   ├── ContattiPage.jsx

│   │   │   └── ContattiPage.css

│   │   ├── DoveSiamo/

│   │   │   └── DoveSiamoPage.jsx

│   │   ├── Login/

│   │   │   ├── LoginPage.jsx

│   │   │   └── LoginPage.css

│   │   ├── AreaRiservata/

│   │   │   ├── AreaRiservataPage.jsx

│   │   │   └── AreaRiservataPage.css

│   │   └── NotFound/

│   │       └── NotFoundPage.jsx

│   │

│   ├── App.js                      ← definisce tutte le route

│   ├── App.css                     ← variabili CSS globali e reset

│   └── index.js                    ← entry point, monta App nel DOM

│

├── .env                            ← variabili d'ambiente (NON su GitHub)

├── package.json                    ← dipendenze e script npm

└── DOCUMENTAZIONE.md               ← questo file

```



\### Regola fondamentale



\- \*\*`components/`\*\* → elementi che compaiono in \*\*più pagine\*\* (Navbar, Footer, ecc.)

\- \*\*`pages/`\*\* → ogni pagina del sito ha la sua cartella dedicata



\---



\## 3. Mappa del sito reale (da uipa.it)



\### TopBar (sempre visibile in cima)



| Link           | Destinazione                         | Tipo    |

| -------------- | ------------------------------------ | ------- |

| GESTIONALE     | http://gestionale.uipa.it            | Esterno |

| AREA RISERVATA | /login                               | Interno |

| WEB MAIL       | https://webmail.aruba.it/            | Esterno |

| Facebook       | https://www.facebook.com/uipaitalia/ | Esterno |



\### Navbar – Menu principale



| Voce          | Sottovoci                                                  | Tipo link |

| ------------- | ---------------------------------------------------------- | --------- |

| Chi siamo     | Il Presidente, La Giunta Esecutiva, La Direzione Nazionale | Interno   |

| Servizi       | vedi sotto                                                 | Misto     |

| Convenzioni   | —                                                          | Interno   |

| Apri una sede | —                                                          | Interno   |

| CCNL          | —                                                          | Interno   |

| Tesseramento  | —                                                          | Interno   |

| Sedi          | —                                                          | Interno   |

| Contatti      | Dove siamo                                                 | Interno   |



\### Sottomenu Servizi – Attenzione ai link esterni!



| Voce                       | URL                               | Tipo       |

| -------------------------- | --------------------------------- | ---------- |

| Servizi di patronato       | /servizi-di-patronato/            | ✅ Interno |

| Intermediazione del lavoro | https://www.uidd.it/...           | ⛔ Esterno |

| Associazione CèART         | https://www.associazioneceart.it/ | ⛔ Esterno |

| Servizi CAF                | /servizi-caf/                     | ✅ Interno |

| Formazione professionale   | https://www.usacademy.it/         | ⛔ Esterno |

| Lavoro domestico           | https://www.uidd.it/...           | ⛔ Esterno |

| CAA                        | https://www.caauipa.it/           | ⛔ Esterno |



> I link esterni si aprono in \*\*nuova scheda\*\* (`target="\_blank" rel="noreferrer"`).



\### Sezioni della Homepage



| Sezione           | Contenuto                                                                            |

| ----------------- | ------------------------------------------------------------------------------------ |

| Hero / Slider     | Immagine + titolo "Unione Italiana Professionalità in Agricoltura" + CTA "Chi siamo" |

| Servizi           | Card con immagine (es. CAA UIPA) + link "Consulenza \& Lavoro"                        |

| News              | Ultimi articoli dal blog con immagine, titolo, autore, data                          |

| Rete sociale      | Logo/link UIDD                                                                       |

| Notiziario        | Griglia di articoli recenti con immagine, titolo, data                               |

| Collabora con noi | 3 CTA: Attiva CAF/Patronato, Apri sede sindacale, Attiva sede CAA                    |

| Categorie notizie | Eventi territorio, Bandi, Turismo, Tutorial, Leggi e regolamenti, Ambiente           |

| Partners          | Loghi: MASAF, AGEA, Ministero Lavoro, INPS, INAIL, Agenzia Entrate                   |

| Footer            | Menu, articoli recenti, Facebook, contatti                                           |



\---



\## 4. Routing



Il routing è gestito da \*\*React Router DOM v6\*\*.



\### Come funziona



\- L'utente clicca un link → l'URL cambia → React mostra il componente corrispondente

\- \*\*Nessun ricaricamento della pagina\*\* (Single Page Application)



\### Tutte le route del progetto



| Route                         | Componente             | Note                        |

| ----------------------------- | ---------------------- | --------------------------- |

| `/`                           | `HomePage`             |                             |

| `/chi-siamo`                  | `ChiSiamoPage`         |                             |

| `/chi-siamo/presidente`       | `PresidentePage`       |                             |

| `/chi-siamo/giunta-esecutiva` | `GiuntaEsecutivaPage`  |                             |

| `/servizi`                    | `ServiziPage`          |                             |

| `/servizi/patronato`          | `ServiziPatronatoPage` |                             |

| `/servizi/caf`                | `ServiziCafPage`       |                             |

| `/convenzioni`                | `ConvenzioniPage`      |                             |

| `/apri-una-sede`              | `ApriUnaSedePage`      |                             |

| `/ccnl`                       | `CcnlPage`             |                             |

| `/tesseramento`               | `TesseramentoPage`     |                             |

| `/sedi`                       | `SediPage`             |                             |

| `/contatti`                   | `ContattiPage`         |                             |

| `/contatti/dove-siamo`        | `DoveSiamoPage`        |                             |

| `/login`                      | `LoginPage`            | pubblica                    |

| `/area-riservata`             | `AreaRiservataPage`    | 🔒 protetta da PrivateRoute |

| `\*`                           | `NotFoundPage`         | 404                         |



\### Schema in `App.js`



```jsx

<Router>

&#x20; <TopBar />

&#x20; <Navbar />

&#x20; <Routes>

&#x20;   <Route path="/" element={<HomePage />} />

&#x20;   <Route path="/chi-siamo" element={<ChiSiamoPage />} />

&#x20;   <Route path="/chi-siamo/presidente" element={<PresidentePage />} />

&#x20;   <Route path="/servizi" element={<ServiziPage />} />

&#x20;   <Route path="/servizi/patronato" element={<ServiziPatronatoPage />} />

&#x20;   <Route path="/contatti" element={<ContattiPage />} />

&#x20;   <Route path="/login" element={<LoginPage />} />

&#x20;   <Route

&#x20;     path="/area-riservata"

&#x20;     element={

&#x20;       <PrivateRoute>

&#x20;         <AreaRiservataPage />

&#x20;       </PrivateRoute>

&#x20;     }

&#x20;   />

&#x20;   <Route path="\*" element={<NotFoundPage />} />

&#x20; </Routes>

&#x20; <Footer />

</Router>

```



\---



\## 5. Stili CSS



\### Variabili globali (in `App.css`)



```css

:root {

&#x20; --verde: #2e6b35;

&#x20; --verde-scuro: #1e4a23;

&#x20; --verde-chiaro: #4a9c54;

&#x20; --bianco: #ffffff;

&#x20; --grigio: #f4f4f4;

&#x20; --testo: #333333;

&#x20; --font: "Open Sans", Arial, sans-serif;

}

```



\### Regola



Ogni componente ha il \*\*suo file CSS dedicato\*\* importato direttamente nel `.jsx`.

Non si scrivono stili di un componente nel CSS di un altro.



\---



\## 6. Sicurezza



\### 6.1 Autenticazione (Area Riservata)



\*\*Come funziona il login:\*\*



1\. L'utente inserisce email + password nel form `/login`

2\. Il frontend manda `POST` al backend con le credenziali

3\. Il backend risponde con un \*\*JWT (JSON Web Token)\*\*

4\. Il frontend lo salva e lo usa per le richieste successive



\*\*Regole:\*\*



\- Token JWT → salvato in `httpOnly cookie` (non in `localStorage`)

\- Le password → cifrate con \*\*bcrypt\*\* lato backend

\- Route protette → gestite con `PrivateRoute`



```jsx

const PrivateRoute = ({ children }) => {

&#x20; const isAuthenticated = /\* controlla token \*/;

&#x20; return isAuthenticated ? children : <Navigate to="/login" />;

};

```



\### 6.2 Form Contatti (anti-spam)



| Misura               | Descrizione                        |

| -------------------- | ---------------------------------- |

| Validazione frontend | Campi obbligatori, formato email   |

| Validazione backend  | Il server ricontrolla sempre tutto |

| reCAPTCHA v3         | Blocca i bot in modo invisibile    |

| Rate limiting        | Max N richieste per IP al minuto   |



\### 6.3 XSS – Cross-Site Scripting



React ci protegge automaticamente. L'unica regola:



```jsx

// ❌ MAI

<div dangerouslySetInnerHTML={{ \_\_html: contenuto }} />



// ✅ SEMPRE

<div>{contenuto}</div>

```



\### 6.4 Link esterni



Tutti i link che aprono siti esterni devono avere:



```jsx

<a href="https://..." target="\_blank" rel="noopener noreferrer">

```



Il `rel="noopener noreferrer"` impedisce al sito esterno di accedere alla nostra pagina.



\### 6.5 Variabili d'ambiente



```bash

\# .env (NON committare su GitHub - già in .gitignore)

REACT\_APP\_API\_URL=https://api.uipa.it

REACT\_APP\_RECAPTCHA\_KEY=xxxxxxxxxxxxxx

```



\### 6.6 Audit dipendenze



```bash

npm audit          # controlla vulnerabilità

npm audit fix      # risolve automaticamente quelle safe

```



\---



\## 7. Flusso di lavoro Git



```

main          ← versione stabile/finale (non si tocca direttamente)

&#x20; └── develop ← branch di sviluppo principale

&#x20;       ├── feature/navbar

&#x20;       ├── feature/homepage

&#x20;       └── feature/contatti

```



\### Messaggi di commit



| Prefisso | Quando usarlo              |

| -------- | -------------------------- |

| `feat:`  | nuova funzionalità         |

| `fix:`   | risolvo un bug             |

| `style:` | modifiche CSS              |

| `chore:` | configurazione, dipendenze |

| `docs:`  | documentazione             |



\---



\## 8. Ordine di sviluppo



1\. ✅ Setup create-react-app

2\. ✅ Pulizia boilerplate

3\. ✅ Documentazione tecnica

4\. ⬜ Installare React Router DOM

5\. ⬜ Variabili CSS globali in `App.css`

6\. ⬜ Creare struttura cartelle `components/` e `pages/`

7\. ⬜ Componente `TopBar`

8\. ⬜ Componente `Navbar` (con dropdown + link esterni)

9\. ⬜ Componente `Footer`

10\. ⬜ Pagina `HomePage` (hero, servizi, news, notiziario, collabora, partners)

11\. ⬜ Pagina `ChiSiamo` + sottopagine

12\. ⬜ Pagina `Servizi` + sottopagine interne

13\. ⬜ Pagine statiche (Convenzioni, CCNL, Tesseramento, Sedi, Apri una sede)

14\. ⬜ Pagina `Contatti` + `DoveSiamo` (form + mappa)

15\. ⬜ Pagina `Login` + sistema autenticazione JWT

16\. ⬜ `PrivateRoute` + `AreaRiservata`

17\. ⬜ Responsività mobile

18\. ⬜ `npm audit` + revisione sicurezza

19\. ⬜ Deploy su HTTPS



\### 6.7 GDPR e Privacy Policy (obbligatorio per legge in Italia)



Il sito raccoglie dati personali tramite il form contatti (nome, email, telefono).

Per essere in regola con il \*\*Regolamento Europeo GDPR (679/2016)\*\* sono obbligatori:



| Elemento                     | Descrizione                                                 | Stato      |

| ---------------------------- | ----------------------------------------------------------- | ---------- |

| \*\*Pagina Privacy Policy\*\*    | Pagina `/privacy` che spiega come vengono trattati i dati   | ⬜ Da fare |

| \*\*Informativa nel form\*\*     | Checkbox "Ho letto la privacy policy" già presente nel form | ✅ Fatto   |

| \*\*Cookie Policy\*\*            | Documento che elenca tutti i cookie usati dal sito          | ⬜ Da fare |

| \*\*Banner cookie\*\*            | Popup al primo accesso che chiede il consenso ai cookie     | ⬜ Da fare |

| \*\*Titolare del trattamento\*\* | Indicare nome e contatti del responsabile dei dati (UIPA)   | ⬜ Da fare |



> ⚠️ Senza Privacy Policy e banner cookie il sito non è conforme alla legge italiana.

> Il Garante Privacy può comminare sanzioni fino al 4% del fatturato annuo.



\### 6.8 Sanitizzazione input form



Prima di inviare i dati del form al backend, bisogna validare e pulire gli input:



```jsx

// Esempio validazione email

const isValidEmail = (email) => {

&#x20; return /^\[^\\s@]+@\[^\\s@]+\\.\[^\\s@]+$/.test(email);

};



// Esempio rimozione spazi inutili

const sanitize = (value) => value.trim();

```



\*\*Regole:\*\*



\- Tutti i campi testo → `.trim()` per rimuovere spazi

\- Email → validare formato con regex

\- Telefono → accettare solo numeri e simboli validi (+, -, spazi)

\- Nessun campo deve accettare HTML o script → React lo gestisce automaticamente



