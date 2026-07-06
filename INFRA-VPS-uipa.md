# UIPA — Infrastruttura VPS (OVH) e Deploy del Backend

> Il pezzo mancante nella documentazione: descrive **dove e come gira il backend** e la **rotta per andare in produzione in sicurezza**.
> `README.md` e `Architettetura.md` documentano il frontend e il *contratto* API; questo file documenta il **server**.
>
> Ultimo aggiornamento: 3 luglio 2026 — aggiornato dopo la messa in produzione HTTPS (Fasi 0–7 completate).
> **Non è consulenza legale/di sicurezza formale.** Trattandosi di dati di categoria particolare (sindacato, art. 9 GDPR), le scelte vanno validate con un consulente.

---

## 1. Il server

| Voce | Valore |
| --- | --- |
| Provider | OVHcloud (azienda francese, UE) |
| Modello | VPS-1 2027 |
| Hostname | `vps-43a425e3.vps.ovh.net` |
| IPv4 | `152.228.137.245` |
| IPv6 | `2001:41d0:42b:db8::1` |
| Region / Localizzazione | os-sbg6 — **Strasburgo (SBG), Francia** |
| Risorse | 2 vCore · 4 GB RAM · 40 GB storage |
| OS | Ubuntu 22.04.5 LTS |
| Node / npm | Node v20.20.2 · npm 10.8.2 |
| Dominio API | **`api.uipanazionale.it`** → A record su `152.228.137.245` |
| Accesso | SSH `ubuntu@152.228.137.245` — **solo a chiave** ✅ (password disabilitata, fail2ban attivo). Chiavi autorizzate: `uipa-admin-froy`, `uipa-admin-fabian` |

> Nota GDPR: la region **Strasburgo/UE** va annotata nel registro dei trattamenti come luogo di archiviazione dei dati (login area admin, eventuali dati personali nelle news).

---

## 2. Cosa gira sulla VPS (stato reale — aggiornato 3 lug 2026)

| Componente | Dettaglio |
| --- | --- |
| **Backend** | App **Express** in `/var/www/uipa-backend/index.js` (express, cors, bcryptjs, jsonwebtoken, pg, multer, **dotenv**) |
| **Process manager** | **PM2** come utente `ubuntu` (app `uipa-backend`) — l'app riparte ai crash |
| **Porta app** | ✅ Node in ascolto su **`127.0.0.1:5000`** (non più esposto pubblicamente) |
| **Reverse proxy** | ✅ **Nginx** 1.18 su `:80`/`:443` → `proxy_pass http://127.0.0.1:5000` |
| **Server block Nginx** | `/etc/nginx/sites-available/uipa-api` (symlink in `sites-enabled/`); `client_max_body_size 20M` per gli upload |
| **HTTPS / dominio** | ✅ `https://api.uipanazionale.it` — cert Let's Encrypt (scad. 2026-10-01), redirect 80→443, rinnovo automatico (`certbot.timer`) |
| **Segreti** | ✅ In `/var/www/uipa-backend/.env` (permessi `600`, owner `ubuntu`) — password DB e `JWT_SECRET` **ruotati**; nessun segreto hardcoded nel codice |
| **Database** | **PostgreSQL** locale — db `uipa_db`, user `uipa_user`, porta 5432 **solo su localhost** ✅ (non esposto) |
| **Upload** | File serviti da `/uploads` (multer, `diskStorage`) — ⚠️ ancora senza validazione tipo/dimensione |
| **CORS** | ✅ Ristretto a `https://www.uipanazionale.it`, `https://uipanazionale.it`, `http://localhost:3000` |
| **Firewall (ufw)** | Attivo. Aperte: **22, 80, 443** ✅ (la 5000 residua è stata chiusa) |
| **Riavvio** | ⚠️ *System restart required* in sospeso (aggiornamento kernel) — Fase 10 |

> ⚠️ Ignorare `~/index.js` e `~/index.js.save` nella home di `ubuntu` e `index.js.save`/`index.js.bak_*` in `/var/www/uipa-backend/`: sono residui/backup, **non** sono l'app in esecuzione. L'app vera è in `/var/www/uipa-backend/index.js`.
>
> Backup creati durante la migrazione: `~/backup_uipa_db_*.sql` (dump DB) e `/var/www/uipa-backend/index.js.bak_*`.

---

## 3. Criticità di sicurezza (stato aggiornato)

| # | Problema | Stato | Note |
| - | --- | --- | --- |
| 1 | **Segreti hardcoded** (password DB + JWT secret in `index.js`) | ✅ **RISOLTO** | Ruotati e spostati in `.env`. I vecchi valori sono bruciati/inutili |
| 2 | **JWT secret debole** | ✅ **RISOLTO** | Nuovo `openssl rand -hex 32` in `.env` |
| 3 | **Nessun HTTPS** (mixed content) | ✅ **RISOLTO** | Nginx + certbot; `https://api.uipanazionale.it` |
| 4 | **App esposta sulla 80** | ✅ **RISOLTO** | Node su `127.0.0.1:5000` dietro Nginx |
| 5 | **ufw 5000 aperta** | ✅ **RISOLTO** | `ufw delete allow 5000`; restano 22/80/443 |
| 6 | **CORS aperto** | ✅ **RISOLTO** | Ristretto ai domini frontend + localhost |
| 7 | **Upload multer senza validazione** | ⬜ TODO | Aggiungere `fileFilter` + limiti dimensione |
| 8 | **HTML news non sanificato** (`dangerouslySetInnerHTML`) | ⬜ TODO | Integrare DOMPurify lato frontend |
| 9 | **SSH con password** | ✅ **RISOLTO** | Solo a chiave (`PasswordAuthentication no` via drop-in `00-uipa-hardening.conf`) + `fail2ban` attivo |
| 10 | **Password admin di default** (`admin@uipa.it` / `AdminUipa2026!`, in chiaro in `crea-admin.js`) | ⬜ TODO | Cambiare la password dell'utente admin |
| 11 | **`ubuntu` con sudo NOPASSWD** (`/etc/sudoers.d/90-cloud-init-users`, default cloud OVH) | ⬜ Opzionale | Accettabile con SSH solo-chiave; per irrigidire: imposta una password a `ubuntu` e richiedi password al sudo |

---

## 4. Rotta per andare in produzione — stato

> Obiettivo raggiunto per il core: da `http://152.228.137.245` (app sulla 80, segreti in chiaro) a **`https://api.uipanazionale.it`** dietro Nginx, con segreti in `.env`.

1. ✅ **Ruota i segreti** in `.env` (dotenv); password Postgres + `JWT_SECRET` nuovi; nessun segreto nel codice.
2. ✅ **Node su porta interna** `127.0.0.1:5000`.
3. ✅ **Nginx** reverse proxy 80/443 → `127.0.0.1:5000`.
4. ✅ **DNS**: `api.uipanazionale.it` → `152.228.137.245`.
5. ✅ **SSL con certbot** (Let's Encrypt), redirect 80→443, rinnovo automatico.
6. ✅ **Chiusa la 5000** in ufw (restano 22, 80, 443).
7. ✅ **CORS ristretto** ai domini frontend (+ `localhost:3000` per sviluppo).
8. ✅ **Frontend**: URL API centralizzato in `src/config.js` + `REACT_APP_API_URL` → `https://api.uipanazionale.it` (`.env.production`).
9. ✅ **Hardening SSH**: solo a chiave (`PasswordAuthentication no`) + `fail2ban` attivo.
10. ✅ **Riavvio controllato** eseguito: kernel aggiornato, PM2 risolleva l'app al boot, HTTPS verificato post-reboot.
11. ⬜ **Backup**: automatizzare il dump di Postgres su location separata (Object Storage OVH / altra region) e **testare il ripristino**.

Secondari (non bloccanti): validazione upload multer (#7), DOMPurify (#8), cambio password admin (#10).

---

## 5. Comandi operativi utili

```bash
# Stato dell'app sotto PM2 (utente ubuntu)
pm2 list
pm2 logs uipa-backend            # log in tempo reale
pm2 restart uipa-backend         # riavvio dopo modifiche (rilegge .env)

# Cosa è in ascolto e su quali porte
sudo ss -tlnp                    # atteso: nginx :80/:443, node 127.0.0.1:5000, postgres 127.0.0.1:5432

# Firewall
sudo ufw status verbose          # atteso: solo 22, 80, 443

# Nginx
sudo nginx -t && sudo systemctl reload nginx
# server block: /etc/nginx/sites-available/uipa-api

# HTTPS / certificati
sudo certbot certificates
sudo certbot renew --dry-run

# PostgreSQL
sudo -u postgres psql
pg_dump -U uipa_user -h localhost uipa_db > backup_$(date +%F).sql

# Segreti (NON stamparne mai i valori nella doc)
sudo cat /var/www/uipa-backend/.env   # DB_*, JWT_SECRET, PORT=5000
```

---

## 6. Come si incastra col frontend

```
[ Browser ] ──HTTPS──> [ Frontend React (build statica) — www.uipanazionale.it ]
                                   │  axios / fetch
                                   ▼
                    https://api.uipanazionale.it
                                   │
                        [ Nginx :443 ] ──> [ Node Express :5000 (127.0.0.1) ]
                                                        │
                                                 [ PostgreSQL :5432 ]  + /uploads
                          tutto sulla VPS OVH — Strasburgo (UE)
```

✅ **Stato attuale = obiettivo**: il frontend chiama `https://api.uipanazionale.it` dietro Nginx, con Node interno e segreti in `.env`. Il mixed content è risolto.

---

## 7. TODO infrastruttura (checklist go-live)

- [x] Ruotare password DB e JWT secret → `.env`
- [x] Node su `127.0.0.1:5000`
- [x] Nginx reverse proxy
- [x] Dominio `api.uipanazionale.it` → DNS
- [x] HTTPS con certbot
- [x] Chiudere porta 5000 su ufw
- [x] CORS ristretto ai domini frontend
- [x] `REACT_APP_API_URL` nel frontend → HTTPS
- [x] SSH a chiave + `fail2ban` (password disabilitata)
- [x] Riavvio kernel controllato (PM2 risolleva l'app al boot)
- [ ] Validazione upload multer
- [ ] DOMPurify sull'HTML news
- [ ] Cambiare la password admin di default
- [ ] (Opzionale) Richiedere password al sudo di `ubuntu` (oggi NOPASSWD da cloud-init)
- [ ] Backup automatico DB + test ripristino
</content>
