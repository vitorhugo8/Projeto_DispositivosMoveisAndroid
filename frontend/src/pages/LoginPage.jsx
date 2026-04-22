import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(''); 

    const result = await login(email, password);

    if (result.success) {
      navigate('/dashboard'); 
    } else {
      setError(result.error); 
    }
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#111'
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#1e1e1e',
          padding: '30px',
          borderRadius: '10px',
          width: '300px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          color: '#fff'
        }}
      >
        <h2 style={{ textAlign: 'center' }}>Login</h2>
        {error && (
          <p style={{ color: 'red', textAlign: 'center' }}>
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          style={{
            background: '#f97316',
            color: '#fff',
            padding: '10px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Entrar
        </button>

        <p style={{ textAlign: 'center' }}>
          Não tem conta? <Link to="/register">Cadastre-se</Link>
        </p>
      </form>
    </div>
  );
}