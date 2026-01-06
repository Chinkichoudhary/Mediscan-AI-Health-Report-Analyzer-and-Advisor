import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
    agreement: false,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (res.ok) {
        setMessage('Account created successfully! You can now sign in.');
      } else {
        const err = await res.json();
        setMessage(err.detail || 'Failed to create account');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setMessage('Error connecting to server');
    }
  };

  return (
    <div className="signin-hero">
      <div className="signin-box">
        <h1>MediScan AI</h1>
        <p>Get started with a free account</p>

        <form className="signup-form" onSubmit={handleSubmit}>
          <label>
            First Name
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Last Name
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Re-enter Password
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </label>

          <label className="consent-note">
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              required
            />
            I agree to MediScan AI's <Link to="/terms">Terms of Service</Link>
          </label>

          <label className="consent-note">
            <input
              type="checkbox"
              name="agreement"
              checked={formData.agreement}
              onChange={handleChange}
              required
            />
            I agree to MediScan AI's <Link to="/acceptable-use">Business Associate Agreement</Link>
          </label>

          <button type="submit" className="primary">Get Started</button>
        </form>

        {message && <p className="signin-note">{message}</p>}

        <p className="signin-note">
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
