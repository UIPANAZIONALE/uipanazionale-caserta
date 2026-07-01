import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminPage.css';

const API_URL = 'http://152.228.137.245';

const AdminPage = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    titolo: '',
    categoria: '',
    estratto: '',
    slug: '',
    sezioneTitolo: '',
    sezioneTesto: '',
  });
  const [immagineFile, setImmagineFile] = useState(null);

  const token = localStorage.getItem('uipa_token');
  const user = JSON.parse(localStorage.getItem('uipa_user') || '{}');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('titolo', formData.titolo);
    data.append('categoria', formData.categoria);
    data.append('estratto', formData.estratto);
    data.append('slug', formData.slug);
    data.append('contenuto', JSON.stringify([
      { titolo: formData.sezioneTitolo, testo: formData.sezioneTesto }
    ]));
    if (immagineFile) data.append('immagine', immagineFile);

    try {
      if (editId) {
        await axios.put(`${API_URL}/api/news/${editId}`, data, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await axios.post(`${API_URL}/api/news`, data, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
        });
      }
      resetForm();
      caricaNews();
    } catch (err) {
      alert('Errore nel salvataggio della news');
      console.error(err);
    }
  };

  const handleEdit = (n) => {
    setEditId(n.id);
    setFormData({
      titolo: n.titolo,
      categoria: n.categoria,
      estratto: n.estratto,
      slug: n.slug,
      sezioneTitolo: n.contenuto?.[0]?.titolo || '',
      sezioneTesto: n.contenuto?.[0]?.testo || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Sei sicuro di voler eliminare questa news?')) return;
    try {
      await axios.delete(`${API_URL}/api/news/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      caricaNews();
    } catch (err) {
      alert('Errore nell\'eliminazione');
    }
  };

  const resetForm = () => {
    setFormData({ titolo: '', categoria: '', estratto: '', slug: '', sezioneTitolo: '', sezioneTesto: '' });
    setImmagineFile(null);
    setEditId(null);
    setShowForm(false);
  };

  if (loading) return <div className="admin-loading">Caricamento...</div>;

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
          <button onClick={() => setShowForm(!showForm)} className="admin-btn-new">
            {showForm ? 'Chiudi' : '+ Nuova News'}
          </button>
        </div>

        {showForm && (
          <form className="admin-form" onSubmit={handleSubmit}>
            <h3>{editId ? 'Modifica News' : 'Nuova News'}</h3>

            <div className="admin-form-grid">
              <div className="admin-form-group">
                <label>Titolo *</label>
                <input type="text" name="titolo" value={formData.titolo} onChange={handleChange} required />
              </div>
              <div className="admin-form-group">
                <label>Categoria *</label>
                <input type="text" name="categoria" value={formData.categoria} onChange={handleChange} required />
              </div>
              <div className="admin-form-group">
                <label>Slug (url) *</label>
                <input type="text" name="slug" value={formData.slug} onChange={handleChange} required placeholder="es. titolo-della-news" />
              </div>
              <div className="admin-form-group">
                <label>Immagine</label>
                <input type="file" accept="image/*" onChange={(e) => setImmagineFile(e.target.files[0])} />
              </div>
            </div>

            <div className="admin-form-group">
              <label>Estratto *</label>
              <textarea name="estratto" value={formData.estratto} onChange={handleChange} rows={2} required />
            </div>

            <div className="admin-form-group">
              <label>Titolo sezione contenuto</label>
              <input type="text" name="sezioneTitolo" value={formData.sezioneTitolo} onChange={handleChange} />
            </div>

            <div className="admin-form-group">
              <label>Testo sezione contenuto</label>
              <textarea name="sezioneTesto" value={formData.sezioneTesto} onChange={handleChange} rows={4} />
            </div>

            <div className="admin-form-actions">
              <button type="submit" className="admin-btn-save">
                {editId ? 'Salva modifiche' : 'Pubblica news'}
              </button>
              <button type="button" onClick={resetForm} className="admin-btn-cancel">Annulla</button>
            </div>
          </form>
        )}

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
                <button onClick={() => handleEdit(n)} className="admin-btn-edit">Modifica</button>
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