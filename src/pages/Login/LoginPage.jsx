import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

const API_URL = 'http://152.228.137.245';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errore, setErrore] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrore('');
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/login`, { email, password });
      localStorage.setItem('uipa_token', res.data.token);
      localStorage.setItem('uipa_user', JSON.stringify(res.data.user));
      navigate('/admin');
    } catch (err) {
      setErrore('Email o password errati');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>Area Riservata</h1>
        <p>Accedi al pannello di amministrazione UIPA</p>

        <form onSubmit={handleSubmit}>
          <div className="login-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@uipa.it"
              required
            />
          </div>
          <div className="login-field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {errore && <p className="login-errore">{errore}</p>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Accesso in corso...' : 'Accedi'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;