import React from 'react';
import '../style.css';

function MediscanDashboardPage() {
  return (
    <div className="dashboard-page">
      <header className="navbar-full">
        <div className="navbar-left">
          <img src="/mediscan-logo.png" alt="Mediscan logo" className="navbar-logo" />
          <span className="navbar-brand">Mediscan AI</span>
        </div>
        <nav className="navbar-right">
          <a href="/">Home</a>
          <a href="/analyze">Analyze</a>
          <a href="/how-it-works">How it works</a>
          <a href="/login" className="navbar-login">Login / Sign Up</a>
        </nav>
      </header>

      <section className="hero-section">
        <h1>AI-powered medical record analysis for physicians</h1>
        <p>
          Mediscan AI delivers accurate medical record summaries and chronologies in minutes, not days,
          powered by cutting-edge AI built for physicians and attorneys. Let Mediscan AI do the review with you.
        </p>
        <div className="hero-buttons">
          <button className="secondary">BOOK A DEMO</button>
          <button className="primary">START YOUR 15-DAY FREE TRIAL</button>
        </div>
      </section>

      <section className="dashboard-wrapper">
        <div className="dashboard-left">
          <h3>Cases</h3>
          <p>MediChat: Ask the medical record any question!</p>
          <input type="text" placeholder="Type questions for the medical record here..." />
          <div className="team-options">
            <p>Teams</p>
            <p>Team settings</p>
            <p>Switch teams</p>
            <p>Log out</p>
          </div>
        </div>

        <div className="dashboard-center">
          <h3>Privacy Tracking Preview</h3>
          <div className="record-preview">Medical Record Page 1/15</div>
        </div>

        <div className="dashboard-right">
          <h3>Filters</h3>
          <p>Click to choose filters</p>
          <h4>Medical Record Summary</h4>
          <table>
            <thead>
              <tr><th>Date</th><th>Encounter</th><th>Chief Complaint</th></tr>
            </thead>
            <tbody>
              <tr><td>2025-11-01</td><td>Chest Procedure</td><td>Shortness of breath</td></tr>
              <tr><td>2025-11-10</td><td>Follow-up</td><td>Fatigue</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default MediscanDashboardPage;
