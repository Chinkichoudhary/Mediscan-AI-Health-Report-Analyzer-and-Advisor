import React from 'react';
import '../style.css';

function UserGuidesPage() {
  return (
    <div className="guides-page">
      <section className="guides-hero">
        <h1>User Guides</h1>
        <p>Learn how to use MediScan AI step-by-step. These guides will help you get the most out of our platform.</p>
      </section>

      <section className="guide-section">
        <h2>Getting Started</h2>
        <p>Sign up for a free trial, explore your dashboard, and set up your account preferences.</p>
      </section>

      <section className="guide-section">
        <h2>Uploading Medical Reports</h2>
        <p>Drag and drop your PDF, JPG, or PNG files into the upload box. Supported formats include blood tests, ECGs, and radiology scans.</p>
      </section>

      <section className="guide-section">
        <h2>Understanding AI Results</h2>
        <p>Learn how to interpret the AI-generated summaries, flagged values, and health trends. Each report includes visual insights and explanations.</p>
      </section>

      <section className="guide-section">
        <h2>Using the Advisory Engine</h2>
        <p>Get personalized lifestyle tips, alerts, and doctor recommendations based on your report and symptoms.</p>
      </section>

      <section className="guide-section">
        <h2>Troubleshooting</h2>
        <p>If something doesn’t work, check our FAQ or contact support. Common issues include file format errors and login problems.</p>
      </section>
    </div>
  );
}

export default UserGuidesPage;
