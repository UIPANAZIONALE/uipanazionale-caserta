# UIPA Caserta — Sito Web

Refactoring del sito ufficiale UIPA sede di Caserta.
Sito vetrina multi-pagina con area riservata, form contatti e gestione news.

## Stack

- **Frontend**: React 18 (Create React App) — porta 3000
- **Routing**: React Router DOM v6
- **Stili**: CSS per componente (nessuna libreria UI esterna)
- **Auth**: JWT + httpOnly cookie (area riservata)
- **Form**: validazione frontend + reCAPTCHA v3 (anti-spam)

## Design

- **Font**: Open Sans (400/600/700/800) via Google Fonts
- **Palette brand**: `#2e6b35` (verde primario) · `#1e4a23` (verde scuro/hover)
- **UI**: CSS custom con variabili globali in `App.css`

## Prerequisiti

- Node.js 16+
- npm 8+
- Git

## Setup rapido

```bash
# 1. Clona il repository
git clone https://github.com/UIPANAZIONALE/uipanazionale-caserta.git
cd uipanazionale-caserta

# 2. Checkout branch di sviluppo
git checkout develop

# 3. Installa dipendenze
npm install

# 4. Copia variabili d'ambiente
cp .env.example .env.local

# 5. Avvia in sviluppo
npm start
```

Il sito sarà disponibile su **http://localhost:3000**

## Variabili d'ambiente

Creare `.env.local` partendo da `.env.example`.

| Variabile                 | Descrizione                         | Obbligatoria |
| ------------------------- | ----------------------------------- | :----------: |
| `REACT_APP_API_URL`       | URL del backend API                 |      Sì      |
| `REACT_APP_RECAPTCHA_KEY` | Chiave pubblica Google reCAPTCHA v3 |      Sì      |
| `REACT_APP_MAPS_KEY`      | Chiave Google Maps (mappa contatti) |      No      |

> ⚠️ Non committare mai `.env.local` su GitHub — è già in `.gitignore`

## Endpoint utili (sviluppo)

| Servizio       | URL                                  |
| -------------- | ------------------------------------ |
| Sito pubblico  | http://localhost:3000                |
| Area riservata | http://localhost:3000/area-riservata |
| Login          | http://localhost:3000/login          |
| Contatti       | http://localhost:3000/contatti       |

## Script disponibili

```bash
npm start          # Avvia il server di sviluppo
npm run build      # Build produzione (cartella /build)
npm test           # Avvia i test
npm run lint       # Controlla errori ESLint
npm audit          # Controlla vulnerabilità dipendenze
npm audit fix      # Risolve vulnerabilità automaticamente
```

## Struttura del progetto

```
uipa-caserta/
├── public/
│   └── index.html
└── src/
    ├── assets/              ← loghi, immagini, video hero
    ├── components/
    │   ├── TopBar/          ← barra superiore (Gestionale, Webmail, Facebook)
    │   ├── Navbar/          ← navigazione con dropdown + hamburger mobile
    │   └── Footer/          ← footer 4 colonne
    └── pages/
        ├── Home/            ← homepage con video hero
        ├── ChiSiamo/        ← presentazione + organi sociali
        ├── Servizi/         ← griglia servizi
        ├── Contatti/        ← form contatti + mappa
        ├── Login/           ← area riservata
        └── NotFound/        ← pagina 404
```

## Branch

```
main          ← versione stabile e definitiva (non si tocca direttamente)
  └── develop ← sviluppo attivo
        ├── feature/navbar
        ├── feature/homepage
        └── feature/contatti
```

## GDPR e Privacy

Il sito raccoglie dati personali tramite il form contatti.
Sono obbligatori per legge (GDPR 679/2016):

- Pagina `/privacy` con Privacy Policy
- Cookie Policy
- Banner consenso cookie al primo accesso

## Sito di riferimento

https://www.uipa.it/

## Documentazione tecnica

Vedi `ARCHITECTURE.md` per la documentazione completa dell'architettura.

## Sviluppato da

FabianAndres002 per UIPA Nazionale
