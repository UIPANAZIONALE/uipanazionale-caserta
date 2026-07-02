# UIPA Caserta — Sito Web

Sito ufficiale UIPA sede di Caserta: sito vetrina multi-pagina con **CMS di news
dinamico** (backend REST esterno) e **pannello di amministrazione** protetto da login.

## Stack

- **Frontend**: React 19 (Create React App / `react-scripts` 5) — porta 3000
- **Routing**: React Router DOM v7
- **HTTP**: `axios` (admin/login) + `fetch` nativo (news pubbliche)
- **Stili**: CSS per componente (nessuna libreria UI esterna)
- **Backend**: REST API esterna su VPS — `http://152.228.137.245` (repo separato)
- **Auth**: JWT in `localStorage` + header `Authorization: Bearer`
- **Editor news**: rich text custom (`contentEditable` + `document.execCommand`)

## Design

- **Font**: Open Sans via Google Fonts
- **Palette brand**: `#2e6b35` (verde primario) · `#1e4a23` (verde scuro/hover)
- **UI**: CSS custom con variabili globali in `src/App.css`

## Prerequisiti

- Node.js 16+ (consigliato 18/20)
- npm 8+
- Git

## Setup rapido

```bash
# 1. Clona il repository
git clone https://github.com/UIPANAZIONALE/uipanazionale-caserta.git
cd uipanazionale-caserta

# 2. Installa le dipendenze
npm install

# 3. Avvia in sviluppo
npm start
```

Il sito sarà disponibile su **http://localhost:3000**.

> ⚠️ Il comando è **`npm start`**, non `npm run dev` (il progetto è Create React App).
> Se la porta 3000 è occupata: `PORT=3001 npm start` → http://localhost:3001

## Backend / API

Il frontend consuma un backend REST **esterno** (non incluso in questo repo),
attualmente all'URL **`http://152.228.137.245`**:

| Metodo   | Endpoint          | Auth   | Descrizione                    |
| -------- | ----------------- | ------ | ------------------------------ |
| `POST`   | `/api/login`      | No     | Login → `{ token, user }`      |
| `GET`    | `/api/news`       | No     | Elenco articoli                |
| `GET`    | `/api/news/:slug` | No     | Dettaglio articolo             |
| `POST`   | `/api/news`       | Bearer | Crea news (multipart + immagini) |
| `PUT`    | `/api/news/:id`   | Bearer | Modifica news                  |
| `DELETE` | `/api/news/:id`   | Bearer | Elimina news                   |

> ℹ️ L'URL dell'API è oggi **hardcoded** nei sorgenti (costante `API_URL` in
> `HomePage`, `NewsPage`, `NewsDettaglioPage`, `LoginPage`, `AdminPage`).
> È previsto di centralizzarlo e spostarlo in una variabile d'ambiente
> (`REACT_APP_API_URL`). Al momento **non** sono usate variabili `.env`.

## Script disponibili

```bash
npm start          # Avvia il server di sviluppo (hot reload)
npm run build      # Build produzione (cartella /build)
npm test           # Avvia i test (Testing Library / Jest)
npm run eject      # Eject CRA (irreversibile, da evitare)
```

## Struttura del progetto

```
uipanazionale-caserta/
├── public/                 ← index.html, favicon, manifest, robots
└── src/
    ├── assets/             ← loghi, immagini hero per pagina, PDF
    ├── components/
    │   ├── TopBar/         ← barra superiore (Gestionale, Login, Webmail, Facebook)
    │   ├── Navbar/         ← navigazione sticky con dropdown + hamburger
    │   ├── Footer/         ← footer
    │   └── PageTemplate/   ← header + container per pagine interne
    ├── data/               ← dati statici: caf.js, patronato.js (news.js = legacy)
    └── pages/
        ├── Home/           ← homepage (hero + servizi + ultime news da API)
        ├── ChiSiamo/       ← chi siamo, presidente, giunta esecutiva
        ├── Servizi/        ← servizi, patronato, CAF
        ├── Convenzioni, ApriUnaSede, Ccnl, Tesseramento, Sedi
        ├── Contatti/       ← form contatti (mock) + dove siamo
        ├── News/           ← elenco + dettaglio news (dinamiche da API)
        ├── Login/          ← login area amministrativa
        ├── Admin/          ← pannello CMS: CRUD news, editor, upload immagini
        └── NotFound/       ← pagina 404
```

## Funzionalità principali

- **Sito vetrina** completo (chi siamo, servizi, convenzioni, sedi, contatti…)
- **News dinamiche**: elenco con ricerca e filtri per categoria, pagina di dettaglio
  con sezioni (testo HTML + immagini posizionabili) e articoli correlati
- **Pannello Admin**: login, creazione/modifica/eliminazione news, editor di testo
  ricco, upload immagine principale e immagini per sezione con posizionamento
  (sopra/sotto/sinistra/destra) e anteprima live

## Stato attuale / da fare

- ⚠️ **Form contatti**: attualmente **mock** — mostra la conferma ma non invia dati al backend
- ⚠️ **reCAPTCHA**: non presente
- ⚠️ **GDPR**: mancano pagina Privacy Policy, Cookie Policy e banner cookie
- 🔧 **API**: URL hardcoded in HTTP → da centralizzare in `.env` e migrare a HTTPS
- 🔧 **Sicurezza**: JWT in `localStorage`; valutare sanificazione HTML news (DOMPurify)

Dettagli completi nell'analisi tecnica: vedi **`Architettetura.md`**.

## Sito di riferimento

https://www.uipa.it/

## Repository

https://github.com/UIPANAZIONALE/uipanazionale-caserta — branch principale: `main`
</content>
