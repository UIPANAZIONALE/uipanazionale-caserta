# UIPA Caserta — Documentazione Completa dell'Architettura

Questo documento descrive in modo esaustivo ogni componente del sito UIPA Caserta:
un sito vetrina multi-pagina con area riservata, form contatti e gestione news,
realizzato in React 18 con React Router DOM v6.

---

## Indice

1. [Panoramica e Stack Tecnologico](#1-panoramica-e-stack-tecnologico)
2. [Architettura di Sistema](#2-architettura-di-sistema)
3. [Struttura del Progetto](#3-struttura-del-progetto)
4. [Routing](#4-routing)
5. [Componenti](#5-componenti)
6. [Pagine](#6-pagine)
7. [Stili CSS](#7-stili-css)
8. [Sicurezza](#8-sicurezza)
9. [GDPR e Privacy](#9-gdpr-e-privacy)
10. [Flusso di lavoro Git](#10-flusso-di-lavoro-git)
11. [Deploy e Infrastruttura](#11-deploy-e-infrastruttura)

---

## 1. Panoramica e Stack Tecnologico

### Cos'è UIPA Caserta

Sito web istituzionale per la sede provinciale di Caserta di UIPA
(Unione Italiana Professionalità in Agricoltura). Il sito offre:

- **Presentazione istituzionale**: chi siamo, organi sociali, missione
- **Catalogo servizi**: patronato, CAF, CAA, lavoro domestico, formazione
- **News e notiziario**: articoli aggiornati su temi fiscali, agricoli e sindacali
- **Form contatti**: con validazione, reCAPTCHA e mappa Google Maps
- **Area riservata**: accesso protetto per operatori e amministratori
- **Sezione collabora**: per chi vuole aprire una sede UIPA

### Stack

| Componente     | Tecnologia                                |
| -------------- | ----------------------------------------- |
| Framework      | React 18 (Create React App)               |
| Routing        | React Router DOM v6                       |
| Stili          | CSS per componente (no Bootstrap, no MUI) |
| Font           | Open Sans via Google Fonts                |
| Autenticazione | JWT + httpOnly cookie                     |
| Anti-spam      | Google reCAPTCHA v3                       |
| Mappa          | Google Maps Embed API                     |
| Video Hero     | MP4 loop (Pexels, royalty-free)           |
| Deploy         | Da definire (Netlify / Vercel / VPS)      |

### Porte (sviluppo locale)

| Servizio  | Porta | URL                   |
| --------- | ----- | --------------------- |
| App React | 3000  | http://localhost:3000 |

---

## 2. Architettura di Sistema

### Schema ad alto livello

```
        Internet
           |
           v
   +---------------+
   | Browser       |
   | (Visitatore)  |
   +-------+-------+
           |
           v
+-------------------------------------------+
|           React SPA (porta 3000)           |
|                                            |
|  +------------+  +----------+  +--------+ |
|  | TopBar     |  | Navbar   |  | Footer | |
|  | (sempre)   |  | (sticky) |  |(sempre)| |
|  +------------+  +----------+  +--------+ |
|                                            |
|  +----------------------------------------+
|  |              React Router v6            |
|  |                                         |
|  |  /              → HomePage              |
|  |  /chi-siamo     → ChiSiamoPage          |
|  |  /servizi       → ServiziPage           |
|  |  /contatti      → ContattiPage          |
|  |  /login         → LoginPage             |
|  |  /area-riservata→ AreaRiservataPage 🔒  |
|  |  *              → NotFoundPage          |
|  +----------------------------------------+
|                      |
|                       v
|  +----------------------------------------+
|  |          API Backend (esterno)          |
|  |  - POST /api/contatti (form email)      |
|  |  - POST /api/login (JWT auth)           |
|  |  - GET  /api/news (articoli)            |
|  +----------------------------------------+
+-------------------------------------------+
```

### Flusso di una richiesta tipica

**Esempio: visitatore invia il form contatti**

```
1. Visitatore → compila form su /contatti
2. Frontend   → valida campi (email, campi obbligatori, trim)
3. Frontend   → verifica reCAPTCHA v3 (invisibile)
4. Frontend   → POST /api/contatti con dati + token reCAPTCHA
5. Backend    → verifica token reCAPTCHA con Google
6. Backend    → rate limiting (max 5 richieste/minuto per IP)
7. Backend    → ri-valida tutti i campi lato server
8. Backend    → invia email a info@uipa.it
9. Backend    → risponde con { success: true }
10. Frontend  → mostra messaggio di conferma
```

**Esempio: operatore accede all'area riservata**

```
1. Operatore → inserisce email + password su /login
2. Frontend  → POST /api/login con credenziali
3. Backend   → verifica credenziali (bcrypt)
4. Backend   → genera JWT e lo imposta come httpOnly cookie
5. Frontend  → redirect a /area-riservata
6. PrivateRoute → controlla presenza cookie JWT
7. Frontend  → mostra contenuto protetto
```

---

## 3. Struttura del Progetto

```
uipa-caserta/
│
├── public/
│   └── index.html                  ← HTML base (non modificare)
│
├── src/
│   │
│   ├── assets/                     ← file statici
│   │   ├── logo.png                ← logo UIPA ufficiale
│   │   └── hero.mp4                ← video hero (campi agricoli, loop)
│   │
│   ├── components/                 ← componenti riutilizzabili
│   │   ├── TopBar/
│   │   │   ├── TopBar.jsx          ← barra verde scura superiore
│   │   │   └── TopBar.css
│   │   ├── Navbar/
│   │   │   ├── Navbar.jsx          ← menu sticky con dropdown
│   │   │   └── Navbar.css
│   │   └── Footer/
│   │       ├── Footer.jsx          ← footer 4 colonne
│   │       └── Footer.css
│   │
│   ├── pages/                      ← una cartella per ogni pagina
│   │   ├── Home/
│   │   │   ├── HomePage.jsx        ← hero video + servizi + news + partners
│   │   │   └── HomePage.css
│   │   ├── ChiSiamo/
│   │   │   ├── ChiSiamoPage.jsx    ← presentazione + organi sociali
│   │   │   └── ChiSiamoPage.css
│   │   ├── Servizi/
│   │   │   ├── ServiziPage.jsx     ← griglia 8 servizi (interni + esterni)
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
│   │   │   ├── ContattiPage.jsx    ← form contatti + mappa Google
│   │   │   └── ContattiPage.css
│   │   ├── DoveSiamo/
│   │   │   └── DoveSiamoPage.jsx
│   │   ├── Login/
│   │   │   ├── LoginPage.jsx       ← form login area riservata
│   │   │   └── LoginPage.css
│   │   ├── AreaRiservata/
│   │   │   ├── AreaRiservataPage.jsx  ← 🔒 protetta da PrivateRoute
│   │   │   └── AreaRiservataPage.css
│   │   └── NotFound/
│   │       └── NotFoundPage.jsx    ← pagina 404
│   │
│   ├── App.js                      ← routing principale
│   ├── App.css                     ← variabili CSS globali
│   └── index.js                    ← entry point React
│
├── .env.local                      ← variabili d'ambiente (NON su GitHub)
├── .env.example                    ← template variabili (committare questo)
├── .gitignore
├── package.json
├── README.md
└── ARCHITECTURE.md                 ← questo file
```

---

## 4. Routing

### Come funziona React Router v6

React Router intercetta i cambi di URL **senza ricaricare la pagina** (SPA).
Quando l'utente clicca un link → l'URL cambia → React mostra il componente corrispondente.

### Tutte le route

| Route                            | Componente               | Tipo        | Note                      |
| -------------------------------- | ------------------------ | ----------- | ------------------------- |
| `/`                              | `HomePage`               | Pubblica    | Video hero, servizi, news |
| `/chi-siamo`                     | `ChiSiamoPage`           | Pubblica    |                           |
| `/chi-siamo/presidente`          | `PresidentePage`         | Pubblica    |                           |
| `/chi-siamo/giunta-esecutiva`    | `GiuntaEsecutivaPage`    | Pubblica    |                           |
| `/chi-siamo/direzione-nazionale` | `DirezioneNazionalePage` | Pubblica    |                           |
| `/servizi`                       | `ServiziPage`            | Pubblica    | Mix link interni/esterni  |
| `/servizi/patronato`             | `ServiziPatronatoPage`   | Pubblica    |                           |
| `/servizi/caf`                   | `ServiziCafPage`         | Pubblica    |                           |
| `/convenzioni`                   | `ConvenzioniPage`        | Pubblica    |                           |
| `/apri-una-sede`                 | `ApriUnaSedePage`        | Pubblica    |                           |
| `/ccnl`                          | `CcnlPage`               | Pubblica    |                           |
| `/tesseramento`                  | `TesseramentoPage`       | Pubblica    |                           |
| `/sedi`                          | `SediPage`               | Pubblica    |                           |
| `/contatti`                      | `ContattiPage`           | Pubblica    | Form + mappa              |
| `/contatti/dove-siamo`           | `DoveSiamoPage`          | Pubblica    |                           |
| `/login`                         | `LoginPage`              | Pubblica    |                           |
| `/area-riservata`                | `AreaRiservataPage`      | 🔒 Protetta | PrivateRoute              |
| `/privacy`                       | `PrivacyPage`            | Pubblica    | GDPR obbligatorio         |
| `*`                              | `NotFoundPage`           | —           | 404                       |

### PrivateRoute

```jsx
const PrivateRoute = ({ children }) => {
  const isAuthenticated = /* controlla JWT cookie */;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Utilizzo in App.js
<Route path="/area-riservata" element={
  <PrivateRoute>
    <AreaRiservataPage />
  </PrivateRoute>
} />
```

### Link esterni (si aprono in nuova scheda)

I seguenti servizi sono gestiti da siti esterni — non sono pagine React:

| Voce menu                  | URL esterno                                         |
| -------------------------- | --------------------------------------------------- |
| Intermediazione del lavoro | https://www.uidd.it/uidd/intermediazione-al-lavoro/ |
| Associazione CèART         | https://www.associazioneceart.it/                   |
| Formazione professionale   | https://www.usacademy.it/                           |
| Lavoro domestico           | https://www.uidd.it/uidd/lavoro-domestico/          |
| CAA                        | https://www.caauipa.it/                             |
| Gestionale                 | http://gestionale.uipa.it                           |
| Web Mail                   | https://webmail.aruba.it/                           |

> Tutti i link esterni usano `target="_blank" rel="noopener noreferrer"`

---

## 5. Componenti

### TopBar

Barra verde scura sempre visibile in cima alla pagina.

| Elemento       | Destinazione                         | Tipo         |
| -------------- | ------------------------------------ | ------------ |
| GESTIONALE     | http://gestionale.uipa.it            | Link esterno |
| AREA RISERVATA | /login                               | Link interno |
| WEB MAIL       | https://webmail.aruba.it/            | Link esterno |
| Facebook       | https://www.facebook.com/uipaitalia/ | Link esterno |

### Navbar

Menu di navigazione sticky (rimane in cima durante lo scroll).

- Logo UIPA cliccabile → torna alla home
- Menu orizzontale con dropdown al hover
- Hamburger menu su mobile (< 900px)
- Voce attiva evidenziata con `className="active"`

### Footer

Footer a 4 colonne:

1. Descrizione UIPA
2. Menu principale
3. Lista servizi
4. Contatti sede di Caserta + Facebook

---

## 6. Pagine

### HomePage

La pagina principale è composta da queste sezioni in ordine:

| Sezione           | Descrizione                                                           |
| ----------------- | --------------------------------------------------------------------- |
| Hero              | Video MP4 in loop (campi agricoli) con overlay verde + titolo + 2 CTA |
| Servizi           | Griglia 4 colonne con 8 card servizi (link interni ed esterni)        |
| News              | Ultime notizie dal blog con titolo e data                             |
| Rete sociale      | Link ai partner (UIDD, ecc.)                                          |
| Collabora con noi | 3 CTA: CAF/Patronato, Sede sindacale, Sede CAA                        |
| Partners          | Loghi: MASAF, AGEA, Min. Lavoro, INPS, INAIL, Agenzia Entrate         |

### ContattiPage

- Informazioni sede nazionale (Roma) e sede Caserta
- Mappa Google Maps embed (Via Arena 37, Caserta)
- Form contatti con campi: nome, email, telefono, oggetto (select), messaggio
- Checkbox consenso privacy (obbligatorio)
- Messaggio di conferma dopo invio

### LoginPage (da sviluppare)

- Form email + password
- Validazione frontend
- POST al backend → JWT in httpOnly cookie
- Redirect a `/area-riservata` dopo login

---

## 7. Stili CSS

### Variabili globali (App.css)

```css
:root {
  --verde: #2e6b35; /* colore primario */
  --verde-scuro: #1e4a23; /* hover e header */
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

Ogni componente ha il suo file CSS dedicato importato nel `.jsx`.
Non scrivere stili di un componente nel CSS di un altro.

### Breakpoint responsive

| Breakpoint | Comportamento                     |
| ---------- | --------------------------------- |
| < 600px    | Griglia 1 colonna, testo ridotto  |
| < 900px    | Griglia 2 colonne, hamburger menu |
| > 900px    | Layout desktop completo           |

---

## 8. Sicurezza

### Autenticazione (Area Riservata)

1. Utente inserisce email + password su `/login`
2. Frontend → `POST /api/login` con credenziali
3. Backend → verifica con **bcrypt**
4. Backend → genera **JWT** e lo imposta come **httpOnly cookie**
5. Frontend → PrivateRoute controlla il cookie ad ogni navigazione

> Il token JWT in httpOnly cookie non è accessibile da JavaScript
> → protetto da attacchi XSS

### Form Contatti (anti-spam)

| Misura               | Descrizione                                               |
| -------------------- | --------------------------------------------------------- |
| Validazione frontend | Campi obbligatori, formato email, trim spazi              |
| reCAPTCHA v3         | Verifica invisibile che l'utente non sia un bot           |
| Validazione backend  | Il server ri-valida tutto (mai fidarsi solo del frontend) |
| Rate limiting        | Max 5 richieste per IP al minuto                          |

### XSS (Cross-Site Scripting)

React sanitizza automaticamente il JSX. Regola da seguire:

```jsx
// ❌ MAI — esegue HTML non sicuro
<div dangerouslySetInnerHTML={{ __html: contenuto }} />

// ✅ SEMPRE — React lo sanitizza
<div>{contenuto}</div>
```

### Link esterni

```jsx
// Tutti i link esterni devono avere rel="noopener noreferrer"
<a href="https://..." target="_blank" rel="noopener noreferrer">
```

### Variabili d'ambiente

```bash
# .env.local — NON committare su GitHub (già in .gitignore)
REACT_APP_API_URL=https://api.uipa.it
REACT_APP_RECAPTCHA_KEY=xxxxxxxxxxxxxx
```

### Audit dipendenze

```bash
npm audit          # mostra vulnerabilità
npm audit fix      # risolve quelle safe automaticamente
```

---

## 9. GDPR e Privacy

Il form contatti raccoglie dati personali (nome, email, telefono).
Per essere conformi al **GDPR (Reg. UE 679/2016)** e alla normativa italiana:

| Elemento                                    | Stato            |
| ------------------------------------------- | ---------------- |
| Checkbox consenso nel form                  | ✅ Implementato  |
| Pagina `/privacy` con Privacy Policy        | ⬜ Da sviluppare |
| Cookie Policy                               | ⬜ Da sviluppare |
| Banner consenso cookie al primo accesso     | ⬜ Da sviluppare |
| Indicazione titolare del trattamento (UIPA) | ⬜ Da inserire   |

> ⚠️ Senza Privacy Policy e banner cookie il sito non è conforme alla legge.
> Il Garante Privacy può comminare sanzioni fino al 4% del fatturato annuo.

---

## 10. Flusso di lavoro Git

### Struttura branch

```
main          ← versione stabile (non si tocca direttamente)
  └── develop ← sviluppo attivo
        ├── feature/navbar
        ├── feature/homepage
        ├── feature/contatti
        └── feature/login
```

### Messaggi di commit

| Prefisso | Quando usarlo              |
| -------- | -------------------------- |
| `feat:`  | nuova funzionalità         |
| `fix:`   | risolvo un bug             |
| `style:` | modifiche CSS              |
| `chore:` | configurazione, dipendenze |
| `docs:`  | documentazione             |

**Esempi:**

```
feat: add Navbar with dropdown
fix: mobile menu not closing on link click
style: update hero section overlay opacity
docs: update architecture documentation
```

### Come aggiungere una nuova pagina

1. Crea cartella `src/pages/NomePagina/`
2. Crea `NomePaginaPage.jsx` e `NomePaginaPage.css`
3. Importa la pagina in `App.js`
4. Aggiungi la `<Route>` in `App.js`
5. Aggiungi il link nella `Navbar` se necessario
6. Commit: `feat: add NomePagina page`

---

## 11. Deploy e Infrastruttura

### Schema infrastruttura (da definire)

```
        Internet
           |
           v
   +---------------+
   | DNS           |
   | uipa.it       |
   +-------+-------+
           |
           v
   +---------------+
   | Hosting       |     Opzioni: Netlify / Vercel / VPS
   | HTTPS         |     Certificato SSL automatico
   +-------+-------+
           |
           v
   +---------------+
   | React Build   |     npm run build → cartella /build
   | (statico)     |     File statici serviti dal CDN
   +---------------+
```

### Build produzione

```bash
npm run build
```

Genera la cartella `/build` con i file ottimizzati pronti per il deploy.

### Opzioni di deploy

| Piattaforma | Pro                                          | Contro                          |
| ----------- | -------------------------------------------- | ------------------------------- |
| **Netlify** | Gratuito, deploy automatico da GitHub, HTTPS | Limitazioni su backend          |
| **Vercel**  | Gratuito, velocissimo, HTTPS                 | Limitazioni su backend          |
| **VPS**     | Controllo totale, backend incluso            | Richiede configurazione manuale |

### Checklist pre-produzione

- [ ] `npm run build` senza errori
- [ ] `npm audit` — nessuna vulnerabilità critica
- [ ] Variabili d'ambiente produzione configurate
- [ ] HTTPS attivo
- [ ] Privacy Policy e banner cookie implementati
- [ ] Form contatti testato con email reale
- [ ] reCAPTCHA configurato con dominio produzione
- [ ] Test su mobile (Chrome DevTools)
- [ ] Test su Safari (iOS)

### Riepilogo per lo sviluppatore

**Dove cercare le cose**

| Cerco...                  | Guardo...                             |
| ------------------------- | ------------------------------------- |
| Struttura menu e link     | `src/components/Navbar/Navbar.jsx`    |
| Variabili colori CSS      | `src/App.css`                         |
| Tutte le route            | `src/App.js`                          |
| Contenuto homepage        | `src/pages/Home/HomePage.jsx`         |
| Form contatti             | `src/pages/Contatti/ContattiPage.jsx` |
| Componente riutilizzabile | `src/components/`                     |
| Pagina specifica          | `src/pages/NomePagina/`               |
| Variabili d'ambiente      | `.env.example`                        |
