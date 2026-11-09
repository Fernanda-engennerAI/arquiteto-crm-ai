import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { getSession, isAuthConfigured, login, logout } from './auth.js';
import './styles.css';

function AuthGate() {
  const [authenticated, setAuthenticated] = useState(Boolean(getSession()?.access_token));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      await login(email, password);
      setAuthenticated(true);
      setPassword('');
    } catch (err) {
      setError(err.message || 'Falha ao autenticar.');
    } finally {
      setBusy(false);
    }
  }

  if (authenticated) return (
    <>
      <App />
      <button
        aria-label="Sair do assistente"
        onClick={() => { logout(); setAuthenticated(false); }}
        style={{ position: 'fixed', bottom: 12, right: 12, zIndex: 1000, border: '1px solid #527386', background: '#12212c', color: '#e5f1f8', borderRadius: 8, padding: '7px 12px', cursor: 'pointer' }}
      >Sair</button>
    </>
  );

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 20, background: '#0b1218', color: '#e8f0f6', fontFamily: 'Arial, sans-serif' }}>
      <form onSubmit={submit} style={{ width: '100%', maxWidth: 400, background: '#14232d', padding: 30, border: '1px solid #304756', borderRadius: 15, display: 'grid', gap: 15 }}>
        <h1 style={{ fontSize: 24, margin: 0 }}>Arquiteto CRM AI</h1>
        <p style={{ margin: 0, color: '#afc1cc' }}>Entre com sua conta autorizada para usar o assistente.</p>
        {!isAuthConfigured() && <p role="alert" style={{ color: '#ffbf82' }}>Autenticacao nao configurada na Vercel.</p>}
        <label style={{ display: 'grid', gap: 5 }}>E-mail
          <input type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: 11, borderRadius: 6, border: '1px solid #567080', color: '#fff', background: '#0b1820' }}/>
        </label>
        <label style={{ display: 'grid', gap: 5 }}>Senha
          <input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: 11, borderRadius: 6, border: '1px solid #567080', color: '#fff', background: '#0b1820' }}/>
        </label>
        {error && <p role="alert" style={{ color: '#ffbb9c', margin: 0 }}>{error}</p>}
        <button type="submit" disabled={busy || !isAuthConfigured()} style={{ padding: 12, background: '#3489a4', color: '#fff', border: 0, borderRadius: 8, cursor: 'pointer', fontWeight: 'bold' }}>{busy ? 'Entrando...' : 'Entrar'}</button>
      </form>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthGate />
  </React.StrictMode>
);
