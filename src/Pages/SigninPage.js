import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

function SigninPage() {
  return (
    <div className="signin-hero">
      <div className="signin-box">
        <h1>Login to MediScan AI</h1>

        <form className="signin-form">
          <label>
            Email
            <input type="email" placeholder="Enter your email" required />
          </label>

          <label>
            Password
            <input type="password" placeholder="Enter your password" required />
          </label>

          <div className="signin-links">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button type="submit" className="primary">Login</button>
        </form>

        <p className="signin-note">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default SigninPage;
