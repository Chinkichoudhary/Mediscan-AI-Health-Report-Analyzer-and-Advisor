import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

function ForgotPasswordPage() {
  return (
    <div className="signin-hero">
      <div className="signin-box">
        <h1>Reset your password</h1>

        <form className="signin-form">
          <label>
            Email
            <input type="email" placeholder="Enter your email" required />
          </label>

          <button type="submit" className="primary">Send reset password instructions</button>
        </form>

        <p className="signin-note">
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
