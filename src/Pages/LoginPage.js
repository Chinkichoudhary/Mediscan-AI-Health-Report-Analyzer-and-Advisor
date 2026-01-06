import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate success; plug in real auth later
    navigate('/analyze');
  };

  return (
    <div className="panel">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="form">
        <label className="grow">
          <span>Email</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label className="grow">
          <span>Password</span>
          <input type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} required />
        </label>
        <button type="submit" className="primary">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
