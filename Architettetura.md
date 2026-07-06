# UIPA Caserta — Documentazione dell'Architettura

Documentazione tecnica del sito **UIPA Caserta**: sito vetrina multi-pagina con
un **CMS di news dinamico** alimentato da un backend REST esterno e un **pannello
di amministrazione** protetto da login.

Frontend realizzato in **React 19** (Create React App) con **React Router DOM v7**.

> Ultimo aggiornamento: 2 luglio 2026 — documento riallineato al codice reale.

---

## Indice

1. [Panoramica e Stack Tecnologico](#1-panoramica-e-stack-tecnologico)
2. [Architettura di Sistema](#2-architettura-di-sistema)
3. [Struttura del Progetto](#3-struttura-del-progetto)
4. [Routing](#4-routing)
5. [Componenti](#5-componenti)
6. [Pagine](#6-pagine)
7. [Backend API e modello dati News](#7-backend-api-e-modello-dati-news)
8. [Pannello Admin e Autenticazione](#8-pannello-admin-e-autenticazione)
9. [Dati statici](#9-dati-statici)
10. [Stili CSS](#10-stili-css)
11. [Sicurezza e stato GDPR](#11-sicurezza-e-stato-gdpr)
12. [Stato attuale, criticità e TODO](#12-stato-attuale-criticità-e-todo)
13. [Sviluppo locale, build e deploy](#13-sviluppo-locale-build-e-deploy)
14. [Flusso di lavoro Git](#14-flusso-di-lavoro-git)
15. [Riepilogo per lo sviluppatore](#15-riepilogo-per-lo-sviluppatore)

---

## 1. Panoramica e Stack Tecnologico

### Cos'è UIPA Caserta

Sito web istituzionale della sede provinciale di Caserta di UIPA
(Unione Italiana Professionalità in Agricoltura). Il sito offre:

- **Presentazione istituzionale**: chi siamo, presidente, giunta esecutiva
- **Catalogo servizi**: patronato, CAF, CAA, lavoro domestico, formazione, convenzioni
- **News dinamiche**: sezione notizie gestita da un CMS con backend (elenco, filtri, dettaglio)
- **Pannello Admin**: creazione/modifica/eliminazione news con editor di testo ed upload immagini
- **Sezioni informative**: apri una sede, CCNL, tesseramento, sedi, contatti

### Stack

| Componente     | Tecnologia                                              |
| -------------- | ------------------------------------------------------- |
| Framework      | React 19.2 (Create React App / `react-scripts` 5.0.1)   |
| Routing        | React Router DOM v7                                      |
| HTTP client    | `axios` 1.7.9 (admin/login) + `fetch` nativo (news pubbliche) |
| Stili          | CSS per componente (nessuna libreria UI: no Bootstrap/MUI) |
| Font           | Open Sans (via Google Fonts)                            |
| Backend        | REST API esterna su VPS — `https://api.uipanazionale.it` (HTTPS dietro Nginx, repo separato) |
| Autenticazione | JWT in `localStorage` + header `Authorization: Bearer`  |
| Editor news    | Rich text custom (`contentEditable` + `document.execCommand`) |
| Test           | Testing Library + Jest (via CRA)                        |
| Deploy         | Da definire                                             |

> ⚠️ **Attenzione**: alcune scelte descritte nella vecchia documentazione
> (reCAPTCHA v3, cookie httpOnly, `PrivateRoute`, video hero MP4) **non sono
> presenti nel codice attuale**. Vedi §12 per lo stato reale.

### Porte (sviluppo locale)

| Servizio  | Porta | URL                     | Note                                    |
| --------- | ----- | ----------------------- | --------------------------------------- |
| App React | 3000  | http://localhost:3000   | Default CRA                             |
| App React | 3001  | http://localhost:3001   | Fallback se la 3000 è occupata (`PORT=3001 npm start`) |

Comando di avvio: **`npm start`** (il progetto è Create React App: **non** esiste `npm run dev`).

---

## 2. Architettura di Sistema

### Schema ad alto livello

```
        Internet
           |
           v
   +----------------+
   |    Browser     |
   | Visitatore /   |
   |   Operatore    |
   +-------+--------+
           |
           v
+------------------------------------------------+
|         React SPA (CRA, porta 3000)            |
|                                                |
|  +----------+   +--------------------------+   |
|  | Navbar   |   |   React Router v7        |   |
|  | (sticky) |   |   (vedi §4 route)        |   |
|  +----------+   +--------------------------+   |
|  +--------------------------------------------+|
|  | Footer (sempre presente)                   ||
|  +--------------------------------------------+|
+----------------------+-------------------------+
                       |
        axios / fetch  |  (HTTPS, JSON + multipart)
                       v
+------------------------------------------------+
|      Backend REST API (VPS esterno)            |
|      https://api.uipanazionale.it (Nginx)      |
|                                                |
|   POST   /api/login          → { token, user } |
|   GET    /api/news           → elenco articoli |
|   GET    /api/news/:slug     → dettaglio        |
|   POST   /api/news           → crea   (auth)    |
|   PUT    /api/news/:id       → modifica (auth)  |
|   DELETE /api/news/:id       → elimina (auth)   |
|   /uploads/... (immagini caricate)             |
+------------------------------------------------+
```

> Il backend **non fa parte di questo repository**: è un servizio separato
> ospitato sul VPS `152.228.137.245` e servito su `https://api.uipanazionale.it`
> (Nginx + Let's Encrypt). L'URL è centralizzato in [src/config.js](src/config.js)
> via `REACT_APP_API_URL` (vedi §7). Dettagli infrastruttura: `INFRA-VPS-uipa.md`.

### Flusso: visitatore legge una news

```
1. Visitatore  → apre /news
2. NewsPage    → fetch GET https://api.uipanazionale.it/api/news
3. Backend     → risponde con l'elenco JSON degli articoli
4. NewsPage    → filtra per categoria/ricerca lato client e mostra le card
5. Visitatore  → clicca una card → /news/:slug
6. NewsDettaglioPage → fetch GET /api/news/:slug + /api/news (per i correlati)
7. Render      → titolo, immagine, sezioni (testo HTML + immagini posizionate)
```

### Flusso: operatore pubblica una news

```
1. Operatore → /login → inserisce email + password
2. LoginPage → axios POST /api/login → riceve { token, user }
3. Frontend  → salva token e user in localStorage (uipa_token / uipa_user)
4. Redirect  → /admin
5. AdminPage → controlla il token in localStorage (altrimenti redirect /login)
6. FormNews  → compila titolo, categoria, slug, estratto, immagine e sezioni
7. Frontend  → axios POST /api/news (multipart/form-data) con header Bearer
8. Backend   → salva su DB, immagini in /uploads, risponde
9. AdminPage → ricarica l'elenco news
```

---

## 3. Struttura del Progetto

```
uipanazionale-caserta/
│
├── public/
│   ├── index.html
│   ├── favicon.ico, logo192.png, logo512.png
│   ├── manifest.json
│   └── robots.txt
│
├── src/
│   ├── assets/                    ← immagini hero per pagina, loghi partner, PDF, logo.png, hero.mp4
│   │
│   ├── components/                ← componenti riutilizzabili
│   │   ├── TopBar/                ← TopBar.jsx + .css
│   │   ├── Navbar/                ← Navbar.jsx + .css  (menu sticky con dropdown)
│   │   ├── Footer/                ← Footer.jsx + .css
│   │   └── PageTemplate/          ← PageTemplate.jsx + .css  (header + container per pagine interne)
│   │
│   ├── data/                      ← dati statici (JS)
│   │   ├── caf.js                 ← servizi CAF (usato da ServiziCafPage)
│   │   ├── patronato.js           ← servizi patronato (usato da ServiziPatronatoPage)
│   │   └── news.js                ← ⚠️ dati news statici LEGACY, non più importati (news arrivano dall'API)
│   │
│   ├── pages/
│   │   ├── Home/                  ← HomePage (hero + servizi + ultime 3 news da API + partner)
│   │   ├── ChiSiamo/              ← ChiSiamoPage, PresidentePage, GiuntaEsecutivaPage
│   │   ├── Servizi/               ← ServiziPage, ServiziPatronatoPage, ServiziCafPage
│   │   ├── Convenzioni/           ← ConvenzioniPage
│   │   ├── ApriUnaSede/           ← ApriUnaSedePage
│   │   ├── Ccnl/                  ← CcnlPage
│   │   ├── Tesseramento/          ← TesseramentoPage
│   │   ├── Sedi/                  ← SediPage
│   │   ├── Contatti/              ← ContattiPage (form mock) + DoveSiamo/DoveSiamoPage
│   │   ├── DoveSiamo/             ← DoveSiamoPage
│   │   ├── News/                  ← NewsPage (elenco+filtri), NewsDettaglioPage (dettaglio+sidebar)
│   │   ├── Login/                 ← LoginPage
│   │   ├── Admin/                 ← AdminPage (CMS: editor, upload, CRUD news)
│   │   └── NotFound/              ← NotFoundPage (404)
│   │
│   ├── App.js                     ← routing principale
│   ├── App.css                    ← variabili CSS globali + classi condivise
│   ├── index.js                   ← entry point React (StrictMode)
│   └── index.css                  ← reset/base
│
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── Architettetura.md              ← questo file (nota: filename con refuso "Architettetura")
```

> ℹ️ Non esistono file `.env` / `.env.example` nel repository: il frontend
> **non usa variabili d'ambiente** (`REACT_APP_*`). L'URL dell'API è scritto
> direttamente nei sorgenti.

---

## 4. Routing

Definito in `src/App.js` con React Router v7 (`<Routes>` / `<Route>`).
`Navbar` e `Footer` sono renderizzati fuori da `<Routes>`, quindi presenti su ogni pagina.

| Route                                             | Componente               | Tipo         | Note                                      |
| ------------------------------------------------- | ------------------------ | ------------ | ----------------------------------------- |
| `/`                                               | `HomePage`               | Pubblica     | Hero, servizi, ultime 3 news da API       |
| `/chi-siamo`                                      | `ChiSiamoPage`           | Pubblica     |                                           |
| `/chi-siamo/presidente`                           | `PresidentePage`         | Pubblica     |                                           |
| `/chi-siamo/giunta-esecutiva`                     | `GiuntaEsecutivaPage`    | Pubblica     |                                           |
| `/chi-siamo/direzione-nazionale`                  | `ComingSoon`             | Pubblica     | Placeholder "in costruzione"              |
| `/servizi`                                        | `ServiziPage`            | Pubblica     | Mix link interni/esterni                  |
| `/servizi/patronato`                              | `ServiziPatronatoPage`   | Pubblica     | Dati da `data/patronato.js`               |
| `/servizi/patronato/:categoriaId`                 | `ServiziPatronatoPage`   | Pubblica     | Parametro categoria                       |
| `/servizi/patronato/:categoriaId/:servizioId`     | `ServiziPatronatoPage`   | Pubblica     | Parametro servizio                        |
| `/servizi/caf`                                    | `ServiziCafPage`         | Pubblica     | Dati da `data/caf.js`                      |
| `/servizi/caf/:servizioId`                        | `ServiziCafPage`         | Pubblica     | Parametro servizio                        |
| `/convenzioni`                                    | `ConvenzioniPage`        | Pubblica     |                                           |
| `/apri-una-sede`                                  | `ApriUnaSedePage`        | Pubblica     |                                           |
| `/ccnl`                                           | `CcnlPage`               | Pubblica     |                                           |
| `/tesseramento`                                   | `TesseramentoPage`       | Pubblica     |                                           |
| `/sedi`                                           | `SediPage`               | Pubblica     |                                           |
| `/contatti`                                       | `ContattiPage`           | Pubblica     | Form **mock** (non invia al backend)      |
| `/contatti/dove-siamo`                            | `DoveSiamoPage`          | Pubblica     |                                           |
| `/news`                                           | `NewsPage`               | Pubblica     | Elenco + filtri categoria + ricerca (API) |
| `/news/:slug`                                     | `NewsDettaglioPage`      | Pubblica     | Dettaglio + correlati + sidebar (API)     |
| `/login`                                          | `LoginPage`              | Pubblica     | Login area amministrativa                 |
| `/admin`                                          | `AdminPage`              | 🔒 Protetta  | Redirect a `/login` se manca il token     |
| `*`                                               | `NotFoundPage`           | —            | 404                                       |

> ⚠️ **Non esiste** un componente `PrivateRoute` né una route `/area-riservata`
> o `/privacy`. La protezione di `/admin` è un semplice controllo `useEffect`
> dentro `AdminPage` che reindirizza a `/login` se `localStorage.uipa_token`
> è assente.

### Link esterni (nuova scheda)

Gestiti da siti esterni, aperti con `target="_blank" rel="noopener noreferrer"`:

| Voce                       | URL                                                 |
| -------------------------- | --------------------------------------------------- |
| Intermediazione del lavoro | https://www.uidd.it/uidd/intermediazione-al-lavoro/ |
| Associazione CeART         | https://www.associazioneceart.it/                   |
| Formazione professionale   | https://www.usacademy.it/                           |
| Lavoro domestico           | https://www.uidd.it/uidd/lavoro-domestico/          |
| CAA                        | https://www.caauipa.it/                             |
| Gestionale                 | http://gestionale.uipa.it                           |
| Web Mail                   | https://webmail.aruba.it/                           |
| Facebook                   | https://www.facebook.com/uipaitalia/                |

---

## 5. Componenti

### TopBar (`components/TopBar/`)
Barra superiore con link utility (Gestionale, Area Riservata/Login, Web Mail, Facebook).

### Navbar (`components/Navbar/`)
Menu di navigazione **sticky** con:
- Logo UIPA cliccabile → home
- Voci con **dropdown** al hover (Chi siamo, Servizi, Contatti)
- Voci figlie che possono essere link interni (`path`) o esterni (`url`)
- **Hamburger menu** su mobile (`menuOpen` in stato)
- Voce attiva evidenziata con `NavLink` + classe `active`
- Link utility in coda: Gestionale, 🔒 (Login), Web Mail

La struttura del menu è definita nell'array `menuItems` in `Navbar.jsx`.

### Footer (`components/Footer/`)
Footer informativo a più colonne (descrizione, menu, servizi, contatti + Facebook).

### PageTemplate (`components/PageTemplate/`)
Wrapper condiviso dalle pagine interne. Props: `titolo`, `sottotitolo`, `immagine`, `children`.
Renderizza un header con overlay (immagine di sfondo opzionale) + un `container` per il contenuto.
Usato da NewsPage, NewsDettaglioPage e altre pagine interne.

---

## 6. Pagine

### HomePage (`pages/Home/`)
- **Hero**: overlay con titolo istituzionale, sottotitolo, 2 CTA (Chi siamo / Contattaci) e statistiche (40+ sedi, 30+ anni, 7 servizi)
- **Servizi**: griglia di 8 card (array `servizi`, mix link interni/esterni)
- **Ultime news**: `fetch` delle news dall'API, mostra le **prime 3**
- **Partner**: loghi istituzionali (MASAF, AGEA, Min. Lavoro, INPS, INAIL, Agenzia Entrate)

### NewsPage (`pages/News/NewsPage.jsx`)
- Carica l'elenco news con `fetch(GET /api/news)`
- **Ricerca** testuale (titolo/estratto) + **filtri per categoria** (client-side)
- Card con immagine, categoria, titolo, estratto, data (formattata `it-IT`)
- Banner "Seguici su Facebook"

### NewsDettaglioPage (`pages/News/NewsDettaglioPage.jsx`)
- Carica l'articolo con `fetch(GET /api/news/:slug)` + tutte le news per i **correlati** (stessa categoria)
- Render dell'immagine principale, estratto e **sezioni** dinamiche
- Ogni sezione: titolo opzionale, testo **HTML** (`dangerouslySetInnerHTML`), immagine con **posizione** (`sopra`/`sotto`/`sinistra`/`destra`)
- **Sidebar**: link ai servizi (UNICAF, CAA, Patronato, US Academy), articoli correlati, box contatti/telefono

### ContattiPage (`pages/Contatti/`)
- Info sede nazionale (Roma) e sede Caserta + email `mailto:info@uipa.it`
- Form con campi (nome, email, ecc.) → **`handleSubmit` fa solo `setInviato(true)`**
- ⚠️ **Il form NON invia dati al backend** (nessun `fetch`/`axios`): è un mock che mostra un messaggio di conferma

### Servizi
- **ServiziPage**: griglia servizi (interni + link esterni)
- **ServiziPatronatoPage**: renderizza i servizi da `data/patronato.js`, con routing per categoria/servizio
- **ServiziCafPage**: renderizza i servizi da `data/caf.js`, con routing per servizio

### Altre pagine
ChiSiamoPage, PresidentePage, GiuntaEsecutivaPage, ConvenzioniPage, ApriUnaSedePage,
CcnlPage, TesseramentoPage, SediPage, DoveSiamoPage, NotFoundPage — pagine statiche di contenuto.

---

## 7. Backend API e modello dati News

> Backend **esterno**, non incluso in questo repo. URL base:
> `https://api.uipanazionale.it` (HTTPS, dietro Nginx). Nel frontend è centralizzato
> in [src/config.js](src/config.js) e importato da `HomePage`, `NewsPage`,
> `NewsDettaglioPage`, `LoginPage`, `AdminPage` (via `REACT_APP_API_URL`).

### Endpoint

| Metodo   | Endpoint            | Auth   | Body                    | Risposta            |
| -------- | ------------------- | ------ | ----------------------- | ------------------- |
| `POST`   | `/api/login`        | No     | `{ email, password }`   | `{ token, user }`   |
| `GET`    | `/api/news`         | No     | —                       | `News[]`            |
| `GET`    | `/api/news/:slug`   | No     | —                       | `News`              |
| `POST`   | `/api/news`         | Bearer | `multipart/form-data`   | news creata         |
| `PUT`    | `/api/news/:id`     | Bearer | `multipart/form-data`   | news aggiornata     |
| `DELETE` | `/api/news/:id`     | Bearer | —                       | esito eliminazione  |

Le immagini caricate sono servite dal backend come percorsi relativi
(es. `/uploads/...`) e nel frontend vengono mostrate concatenando `${API_URL}${immagine}`.

### Modello dati News (come usato dal frontend)

```jsonc
{
  "id": 12,
  "titolo": "Titolo articolo",
  "slug": "titolo-articolo",          // usato nell'URL /news/:slug
  "categoria": "Fisco",               // vedi elenco categorie sotto
  "estratto": "Breve riassunto...",
  "immagine": "/uploads/img.jpg",     // percorso relativo al backend (opzionale)
  "data": "2026-06-30T10:00:00Z",     // formattata con toLocaleDateString('it-IT')
  "contenuto": [                       // array di SEZIONI
    {
      "titolo": "Titolo sezione",     // opzionale
      "testo": "<p>HTML dal rich text editor</p>",
      "immagine": "/uploads/sez.jpg", // opzionale
      "immaginePos": "sopra"          // "sopra" | "sotto" | "sinistra" | "destra"
    }
  ]
}
```

**Categorie previste**: Fisco, Lavoro, Pensioni, Famiglia, Normativa, Agricoltura,
Immobili e Terreni, Disabilita.

### Invio dal form Admin (multipart)

Il `FormNews` costruisce un `FormData` con:
- campi testo: `titolo`, `categoria`, `estratto`, `slug`
- `contenuto`: JSON string dell'array sezioni (senza i file immagine)
- `immagine`: file immagine principale (se presente)
- `immagine_sezione_{idx}`: file immagine per la sezione all'indice `idx`

---

## 8. Pannello Admin e Autenticazione

### Login (`pages/Login/LoginPage.jsx`)
1. Form email + password
2. `axios POST /api/login`
3. Salva in **`localStorage`**: `uipa_token` (JWT) e `uipa_user` (JSON utente)
4. Redirect a `/admin`

### AdminPage (`pages/Admin/AdminPage.jsx`)
- All'avvio (`useEffect`) verifica `localStorage.uipa_token`; se assente → `/login`
- Header con email utente e pulsante **Esci** (rimuove token/user da localStorage)
- **Elenco news** con immagine, categoria, titolo, estratto e azioni Modifica/Elimina
- **FormNews** (creazione/modifica):
  - campi titolo/categoria/slug (slug autogenerato dal titolo in creazione)/estratto
  - upload immagine principale con preview
  - **sezioni** dinamiche (aggiungi/rimuovi), ognuna con titolo, editor testo, immagine e posizione
  - **anteprima live** dell'articolo accanto al form
- Le richieste protette inviano l'header `Authorization: Bearer ${token}`

### EditorTesto (rich text)
Editor custom dentro `AdminPage.jsx`: un `div contentEditable` con toolbar che usa
`document.execCommand` (bold, italic, underline, H2/H3/P, liste, allineamenti, clear).
Produce **HTML** salvato nel campo `testo` della sezione e reso lato pubblico con
`dangerouslySetInnerHTML`.

> Nota: `document.execCommand` è deprecato ma tuttora funzionante in tutti i browser;
> è una scelta pragmatica che evita dipendenze esterne.

### Modello di autenticazione — importante

- Il token JWT è in **`localStorage`**, quindi **accessibile da JavaScript**
  (a differenza di un cookie httpOnly). È esposto in caso di XSS.
- La protezione della route admin è **solo lato client** (redirect): la vera
  sicurezza è garantita dal backend, che deve validare il Bearer token su ogni
  endpoint protetto.

---

## 9. Dati statici

Cartella `src/data/` (moduli JS esportati di default):

| File           | Contenuto                              | Usato da                    |
| -------------- | -------------------------------------- | --------------------------- |
| `caf.js`       | Descrizione + elenco servizi CAF       | `ServiziCafPage`            |
| `patronato.js` | Elenco servizi di patronato            | `ServiziPatronatoPage`      |
| `news.js`      | Vecchi articoli statici (**legacy**)   | ⚠️ **non importato** — le news arrivano dall'API |

`data/news.js` è residuo di quando le news erano statiche: può essere rimosso o
tenuto come riferimento, ma non è collegato a nessuna pagina.

---

## 10. Stili CSS

### Variabili globali (`App.css`)

```css
:root {
  --verde: #2e6b35;        /* colore primario */
  --verde-scuro: #1e4a23;  /* hover e header */
  --verde-chiaro: #4a9c54; /* accenti */
  --bianco: #ffffff;
  --grigio: #f4f4f4;
  --grigio-medio: #e0e0e0;
  --testo: #333333;
  --testo-chiaro: #666666;
  --font: "Open Sans", Arial, sans-serif;
}
```

### Regola fondamentale
Ogni componente/pagina ha il proprio file CSS dedicato, importato nel rispettivo
`.jsx`. Gli stili globali/condivisi (variabili, `.container`, `.section`, `.btn`)
stanno in `App.css`; il reset di base in `index.css`.

### Responsive
Layout desktop-first con media query nei singoli CSS; sotto ~900px la Navbar passa
all'hamburger menu e le griglie si riducono a 1–2 colonne.

---

## 11. Sicurezza e stato GDPR

### Autenticazione
- JWT in `localStorage` + header Bearer (vedi §8). **Non** usa cookie httpOnly.
- Protezione route admin solo lato client → il backend **deve** validare il token.

### XSS
- Il contenuto delle sezioni news è HTML reso con `dangerouslySetInnerHTML`
  (necessario per il rich text editor). Il rischio è mitigato dal fatto che il
  contenuto proviene solo da utenti autenticati dell'area admin, **ma** andrebbe
  comunque sanificato (es. DOMPurify) prima del render per difesa in profondità.
- Per il resto React sanifica automaticamente il JSX.

### Link esterni
Tutti i link esterni usano `target="_blank" rel="noopener noreferrer"`.

### Trasporto
- ✅ L'API è servita in **HTTPS** (`https://api.uipanazionale.it`) dietro Nginx, con
  certificato Let's Encrypt e redirect HTTP→HTTPS. Credenziali e token viaggiano cifrati.

### Stato GDPR

| Elemento                                    | Stato            |
| ------------------------------------------- | ---------------- |
| Pagina Privacy Policy (`/privacy`)          | ❌ Assente       |
| Cookie Policy                               | ❌ Assente       |
| Banner consenso cookie                      | ❌ Assente       |
| Consenso privacy nel form contatti          | ⚠️ Da verificare (form comunque non invia dati) |
| Indicazione titolare del trattamento        | ❌ Da inserire   |

> ⚠️ Senza Privacy/Cookie Policy e banner il sito non è pienamente conforme al
> GDPR (Reg. UE 2016/679).

---

## 12. Stato attuale, criticità e TODO

### ✅ Implementato e funzionante
- Navigazione completa (Navbar/Footer/PageTemplate) e tutte le pagine di contenuto
- **CMS News dinamico**: elenco con filtri e ricerca, dettaglio con sezioni e correlati
- **Pannello Admin** con login, CRUD news, rich text editor, upload immagini, sezioni con posizionamento immagine e anteprima live
- Integrazione con il backend REST per news e autenticazione

### ✅ Risolto (migrazione backend, lug 2026)
- **URL API** centralizzato in [src/config.js](src/config.js) + `REACT_APP_API_URL` (`.env.production`)
- **HTTPS** attivo (`https://api.uipanazionale.it`, Nginx + Let's Encrypt) → **mixed content risolto**
- **Segreti** (password DB, JWT) ruotati e spostati in `.env` sul server; **CORS ristretto** ai domini frontend
- Vedi `INFRA-VPS-uipa.md` per i dettagli

### ⚠️ Criticità / debito tecnico
| Tema | Dettaglio | Azione consigliata |
| ---- | --------- | ------------------ |
| JWT in localStorage | Esposto a XSS | Valutare cookie httpOnly o almeno sanificare l'HTML delle news |
| Form contatti mock | `handleSubmit` non invia nulla | Collegare a un endpoint backend (o servizio email) |
| `dangerouslySetInnerHTML` | HTML non sanificato | Integrare DOMPurify |
| Upload multer | Nessuna validazione tipo/dimensione (lato backend) | Aggiungere `fileFilter` + limiti |
| Password admin default | `AdminUipa2026!` di seed | Cambiare la password admin |
| `data/news.js` legacy | Non più usato | Rimuovere o archiviare |
| GDPR | Privacy/cookie mancanti | Aggiungere pagina privacy + banner cookie |
| Editor deprecato | `document.execCommand` | Ok per ora; valutare libreria (es. Tiptap) in futuro |

### 🔜 Da sviluppare
- Pagina/i istituzionali placeholder (es. `direzione-nazionale`)
- Invio reale del form contatti
- Conformità GDPR

---

## 13. Sviluppo locale, build e deploy

### Prerequisiti
- Node.js 16+ (consigliato 18/20), npm 8+, Git

### Avvio
```bash
npm install        # installa le dipendenze
npm start          # avvia il dev server su http://localhost:3000
# se la porta 3000 è occupata:
#   PORT=3001 npm start   → http://localhost:3001
```

> **Non** esiste `npm run dev`: il progetto è Create React App, il comando è `npm start`.

### Script disponibili (`package.json`)
| Script          | Descrizione                          |
| --------------- | ------------------------------------ |
| `npm start`     | Dev server con hot reload            |
| `npm run build` | Build di produzione in `/build`      |
| `npm test`      | Test con Testing Library/Jest        |
| `npm run eject` | Eject CRA (irreversibile, da evitare)|

> Nota: **non** esiste uno script `lint` dedicato; l'ESLint di CRA gira comunque
> durante `start`/`build`.

### Build produzione
```bash
npm run build      # genera /build con file statici ottimizzati
```
Il frontend è un sito **statico**: può essere servito da qualsiasi host/CDN
(Netlify, Vercel, VPS, Nginx). Ricordarsi il fallback SPA (tutte le route → `index.html`).
Prima del deploy in produzione: centralizzare l'URL API e passare a HTTPS.

---

## 14. Flusso di lavoro Git

- **Repository**: https://github.com/UIPANAZIONALE/uipanazionale-caserta
- **Branch principale**: `main`

### Convenzioni commit
| Prefisso | Uso                        |
| -------- | -------------------------- |
| `feat:`  | nuova funzionalità         |
| `fix:`   | correzione bug             |
| `style:` | modifiche CSS/stile        |
| `chore:` | config, dipendenze         |
| `docs:`  | documentazione             |

### Aggiungere una nuova pagina
1. Crea `src/pages/NomePagina/NomePaginaPage.jsx` (+ `.css`)
2. Importala in `App.js` e aggiungi la `<Route>`
3. Aggiungi il link nella `Navbar` se serve
4. Commit: `feat: add NomePagina page`

---

## 15. Riepilogo per lo sviluppatore

| Cerco...                       | Guardo...                                        |
| ------------------------------ | ------------------------------------------------ |
| Tutte le route                 | `src/App.js`                                      |
| Struttura menu e link          | `src/components/Navbar/Navbar.jsx`                |
| Variabili colori/CSS globali   | `src/App.css`                                     |
| URL del backend (API)          | costante `API_URL` in Admin/Login/News + HomePage |
| Endpoint e modello News        | §7 di questo documento                            |
| Login / gestione token         | `src/pages/Login/LoginPage.jsx`                   |
| CMS / editor / upload news     | `src/pages/Admin/AdminPage.jsx`                   |
| Rendering news pubbliche       | `src/pages/News/`                                 |
| Servizi CAF / Patronato (dati) | `src/data/caf.js`, `src/data/patronato.js`        |
| Wrapper pagine interne         | `src/components/PageTemplate/PageTemplate.jsx`    |
</content>
</invoke>
