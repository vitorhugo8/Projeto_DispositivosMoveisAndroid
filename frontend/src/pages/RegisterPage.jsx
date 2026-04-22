import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("SUBMIT DISPARADO"); // 👈

  const result = await register(name, email, password);

  console.log(result);
};

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
      <form onSubmit={handleSubmit} className="card">
        <h2>Criar conta</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <input
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
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

        <button type="submit" className="primary">
          Cadastrar
        </button>

        <p>
          Já tem conta? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}