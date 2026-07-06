import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminPage.css';


import { API_URL } from '../../config';
const EditorTesto = ({ value, onChange }) => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value || '';
    }
  }, []);

  const eseguiComando = (cmd, val = null) => {
    document.execCommand(cmd, false, val);
    ref.current.focus();
  };

  return (
    <div className="editor-testo">
      <div className="editor-toolbar">
        <button type="button" onClick={() => eseguiComando('bold')}><b>B</b></button>
        <button type="button" onClick={() => eseguiComando('italic')}><i>I</i></button>
        <button type="button" onClick={() => eseguiComando('underline')}><u>U</u></button>
        <button type="button" onClick={() => eseguiComando('formatBlock', 'h2')}>H2</button>
        <button type="button" onClick={() => eseguiComando('formatBlock', 'h3')}>H3</button>
        <button type="button" onClick={() => eseguiComando('formatBlock', 'p')}>P</button>
        <button type="button" onClick={() => eseguiComando('insertUnorderedList')}>• Lista</button>
        <button type="button" onClick={() => eseguiComando('insertOrderedList')}>1. Lista</button>
        <button type="button" onClick={() => eseguiComando('justifyLeft')}>⬅</button>
        <button type="button" onClick={() => eseguiComando('justifyCenter')}>⬛</button>
        <button type="button" onClick={() => eseguiComando('justifyRight')}>➡</button>
        <button type="button" onClick={() => eseguiComando('removeFormat')}>✕ Clear</button>
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        className="editor-area"
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
      />
    </div>
  );
};

const FormNews = ({ editData, onSave, onCancel, token }) => {
  const [formData, setFormData] = useState({
    titolo: '',
    categoria: '',
    estratto: '',
    slug: '',
  });
  const [sezioni, setSezioni] = useState([{ titolo: '', testo: '', immagine: null, immaginePreview: null, immaginePos: 'sopra' }]);
  const [immagineFile, setImmagineFile] = useState(null);
  const [immaginePreview, setImmaginePreview] = useState(null);

  useEffect(() => {
    if (editData) {
      setFormData({
        titolo: editData.titolo || '',
        categoria: editData.categoria || '',
        estratto: editData.estratto || '',
        slug: editData.slug || '',
      });
      const contenuto = editData.contenuto || [{ titolo: '', testo: '', immaginePos: 'sopra' }];
      setSezioni(contenuto.map(s => ({ 
  ...s, 
  immagine: null, 
  immaginePreview: s.immagine ? `${API_URL}${s.immagine}` : null,
  immaginePos: s.immaginePos || 'sopra' 
})));
      if (editData.immagine) setImmaginePreview(`${API_URL}${editData.immagine}`);
    }
  }, [editData]);

  const handleChange = (e) => {
    const val = e.target.value;
    setFormData(prev => ({
      ...prev,
      [e.target.name]: val,
      ...(e.target.name === 'titolo' && !editData ? {
        slug: val.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').slice(0, 60)
      } : {})
    }));
  };

  const handleImmagine = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImmagineFile(file);
      setImmaginePreview(URL.createObjectURL(file));
    }
  };

  const aggiungiSezione = () => setSezioni([...sezioni, { titolo: '', testo: '', immagine: null, immaginePreview: null, immaginePos: 'sopra' }]);
  const rimuoviSezione = (idx) => setSezioni(sezioni.filter((_, i) => i !== idx));

  const updateSezione = (idx, field, val) => {
    const nuove = [...sezioni];
    nuove[idx][field] = val;
    setSezioni(nuove);
  };

  const handleSezioneImmagine = (idx, file) => {
    if (!file) return;
    const nuove = [...sezioni];
    nuove[idx].immagine = file;
    nuove[idx].immaginePreview = URL.createObjectURL(file);
    setSezioni(nuove);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('titolo', formData.titolo);
    data.append('categoria', formData.categoria);
    data.append('estratto', formData.estratto);
    data.append('slug', formData.slug);
   data.append('contenuto', JSON.stringify(sezioni.map(s => ({
  titolo: s.titolo,
  testo: s.testo,
  immaginePos: s.immaginePos,
  immagine: s.immagine ? null : (s.immaginePreview && !s.immaginePreview.startsWith('blob:') ? s.immaginePreview.replace(API_URL, '') : null),
}))));
    if (immagineFile) data.append('immagine', immagineFile);
    sezioni.forEach((s, idx) => {
  if (s.immagine) data.append(`immagine_sezione_${idx}`, s.immagine);
});
    try {
      if (editData) {
        await axios.put(`${API_URL}/api/news/${editData.id}`, data, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await axios.post(`${API_URL}/api/news`, data, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
        });
      }
      onSave();
    } catch (err) {
      alert('Errore nel salvataggio');
      console.error(err);
    }
  };

  return (
    <div className="editor-layout">
      <form className="editor-form" onSubmit={handleSubmit}>
        <h3>{editData ? 'Modifica News' : 'Nuova News'}</h3>
        <div className="editor-field">
          <label>Titolo *</label>
          <input name="titolo" value={formData.titolo} onChange={handleChange} required />
        </div>
        <div className="editor-row">
          <div className="editor-field">
            <label>Categoria *</label>
            <select name="categoria" value={formData.categoria} onChange={handleChange} required>
              <option value="">Seleziona</option>
              <option>Fisco</option>
              <option>Lavoro</option>
              <option>Pensioni</option>
              <option>Famiglia</option>
              <option>Normativa</option>
              <option>Agricoltura</option>
              <option>Immobili e Terreni</option>
              <option>Disabilita</option>
            </select>
          </div>
          <div className="editor-field">
            <label>Slug (URL)</label>
            <input name="slug" value={formData.slug} onChange={handleChange} required />
          </div>
        </div>
        <div className="editor-field">
          <label>Estratto *</label>
          <textarea name="estratto" value={formData.estratto} onChange={handleChange} rows={2} required />
        </div>
        <div className="editor-field">
          <label>Immagine principale</label>
          <input type="file" accept="image/*" onChange={handleImmagine} />
          {immaginePreview && (
            <img src={immaginePreview} alt="preview" className="editor-img-preview" />
          )}
        </div>
        <div className="editor-sezioni">
          <div className="editor-sezioni-header">
            <label>Sezioni contenuto</label>
            <button type="button" onClick={aggiungiSezione} className="editor-btn-add">+ Aggiungi sezione</button>
          </div>
          {sezioni.map((s, idx) => (
            <div key={idx} className="editor-sezione">
              <div className="editor-sezione-header">
                <span>Sezione {idx + 1}</span>
                {sezioni.length > 1 && (
                  <button type="button" onClick={() => rimuoviSezione(idx)} className="editor-btn-remove">x</button>
                )}
              </div>
              <input
                placeholder="Titolo sezione (opzionale)"
                value={s.titolo}
                onChange={(e) => updateSezione(idx, 'titolo', e.target.value)}
              />
<EditorTesto
  value={s.testo}
  onChange={(val) => updateSezione(idx, 'testo', val)}
/>
              <div className="editor-sezione-img">
                <label>Immagine sezione (opzionale)</label>
                <input type="file" accept="image/*" onChange={(e) => handleSezioneImmagine(idx, e.target.files[0])} />
                {s.immaginePreview && (
                  <img src={s.immaginePreview} alt="preview" className="editor-img-preview" />
                )}
                {s.immaginePreview && (
                  <div className="editor-pos-selector">
                    <label>Posizione immagine:</label>
                    <select value={s.immaginePos || 'sopra'} onChange={(e) => updateSezione(idx, 'immaginePos', e.target.value)}>
                      <option value="sopra">Sopra il testo</option>
                      <option value="sotto">Sotto il testo</option>
                      <option value="sinistra">A sinistra del testo</option>
                      <option value="destra">A destra del testo</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="editor-actions">
          <button type="submit" className="editor-btn-save">
            {editData ? 'Salva modifiche' : 'Pubblica news'}
          </button>
          <button type="button" onClick={onCancel} className="editor-btn-cancel">Annulla</button>
        </div>
      </form>

      <div className="editor-preview">
        <div className="editor-preview-label">Anteprima articolo</div>
        <div className="editor-preview-content">
          {immaginePreview && (
            <img src={immaginePreview} alt="preview" className="preview-immagine" />
          )}
          {formData.categoria && <span className="preview-cat">{formData.categoria}</span>}
          <h2 className="preview-titolo">{formData.titolo || "Titolo dell'articolo"}</h2>
          {formData.estratto && <p className="preview-estratto">{formData.estratto}</p>}
          <div className="preview-contenuto">
            {sezioni.map((s, idx) => (
              <div key={idx} className="preview-sezione">
                {s.titolo && <h3>{s.titolo}</h3>}
                {s.immaginePreview && s.immaginePos === 'sopra' && (
                  <img src={s.immaginePreview} alt="" className="preview-sezione-img" />
                )}
                {s.immaginePreview && (s.immaginePos === 'sinistra' || s.immaginePos === 'destra') ? (
                  <div className={`preview-sezione-float preview-sezione-float--${s.immaginePos}`}>
                    <img src={s.immaginePreview} alt="" className="preview-sezione-img-float" />
                    {s.testo && <p>{s.testo}</p>}
                  </div>
                ) : (
                  s.testo && <p>{s.testo}</p>
                )}
                {s.immaginePreview && s.immaginePos === 'sotto' && (
                  <img src={s.immaginePreview} alt="" className="preview-sezione-img" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminPage = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  const token = localStorage.getItem('uipa_token');
  const user = JSON.parse(localStorage.getItem('uipa_user') || '{}');

  useEffect(() => {
    if (!token) { navigate('/login'); return; }
    caricaNews();
  }, []);

  const caricaNews = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/news`);
      setNews(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('uipa_token');
    localStorage.removeItem('uipa_user');
    navigate('/login');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Eliminare questa news?')) return;
    try {
      await axios.delete(`${API_URL}/api/news/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      caricaNews();
    } catch (err) {
      alert('Errore eliminazione');
    }
  };

  const handleSave = () => {
    setShowForm(false);
    setEditData(null);
    caricaNews();
  };

  if (loading) return <div className="admin-loading">Caricamento...</div>;

  if (showForm) {
    return (
      <div className="admin-page">
        <header className="admin-header">
          <div className="admin-header__inner">
            <h1>Pannello Admin UIPA</h1>
            <div className="admin-header__user">
              <span>{user.email}</span>
              <button onClick={handleLogout} className="admin-logout">Esci</button>
            </div>
          </div>
        </header>
        <div className="admin-content">
          <FormNews
            editData={editData}
            onSave={handleSave}
            onCancel={() => { setShowForm(false); setEditData(null); }}
            token={token}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div className="admin-header__inner">
          <h1>Pannello Admin UIPA</h1>
          <div className="admin-header__user">
            <span>{user.email}</span>
            <button onClick={handleLogout} className="admin-logout">Esci</button>
          </div>
        </div>
      </header>
      <div className="admin-content">
        <div className="admin-toolbar">
          <h2>Gestione News ({news.length})</h2>
          <button onClick={() => { setEditData(null); setShowForm(true); }} className="admin-btn-new">
            + Nuova News
          </button>
        </div>
        <div className="admin-news-list">
          {news.map((n) => (
            <div key={n.id} className="admin-news-item">
              {n.immagine && (
                <img src={`${API_URL}${n.immagine}`} alt={n.titolo} className="admin-news-img" />
              )}
              <div className="admin-news-info">
                <span className="admin-news-cat">{n.categoria}</span>
                <h4>{n.titolo}</h4>
                <p>{n.estratto}</p>
              </div>
              <div className="admin-news-actions">
                <button onClick={() => { setEditData(n); setShowForm(true); }} className="admin-btn-edit">Modifica</button>
                <button onClick={() => handleDelete(n.id)} className="admin-btn-delete">Elimina</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;