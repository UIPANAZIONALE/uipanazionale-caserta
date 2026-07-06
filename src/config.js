// URL base dell'API backend UIPA.
// In produzione viene sovrascritto da REACT_APP_API_URL (vedi .env.production).
// Il fallback punta al backend HTTPS di produzione.
export const API_URL = process.env.REACT_APP_API_URL || 'https://api.uipanazionale.it';
 