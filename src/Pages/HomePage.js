import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

function HomePage() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-split">
        <div className="hero-left">
          <h1>AI-powered medical record analysis for physicians</h1>
          <p className="tagline">
            Mediscan AI delivers accurate medical record summaries and chronologies in minutes, not days,
            powered by cutting-edge AI built for physicians and attorneys. Let Mediscan AI do the review with you.
          </p>
          <div className="hero-actions">
            <Link to="/book-demo" className="secondary">BOOK A DEMO</Link>
            <Link to="/signup" className="primary">START YOUR 15-DAY FREE TRIAL</Link>
          </div>
        </div>

        <div className="hero-right">
          <img
            src="/dashboard-preview.png"
            alt="Mediscan AI dashboard preview"
            className="hero-preview"
          />
        </div>
      </section>

      {/* Message Block */}
      <div className="ai-message-plain">
        <h2>We're not replacing your work as a medical legal expert</h2>
        <p>
          We're empowering you to interface with patient medical record histories faster with a first-of-its kind collaborative AI.
        </p>
      </div>

      {/* Form Section */}
      <section className="homepage-form-colored">
        <h2>Are you ready to unleash the power of AI on your medical records?</h2>
        <p>Start your free trial or book a quick demo — it takes under 20 minutes to get up to speed.</p>

        <div className="form-box-colored">
          <form className="homepage-form">
            <label>
              Full Name
              <input type="text" required />
            </label>
            <label>
              Email Address
              <input type="email" required />
            </label>
            <label>
              Phone
              <input type="tel" />
            </label>
            <label>
              Anything else we should know?
              <textarea rows="4" />
            </label>

            <div className="captcha-note">
              <input type="checkbox" required />
              <span>I’m not a robot</span>
            </div>

            <p className="consent-note">
              *By clicking submit below, you consent to allow MediScan AI to process the personal information submitted above to provide you the content requested.
            </p>

            <button type="submit" className="primary">Submit</button>
          </form>
        </div>

        <div className="security-highlights">
  <div className="security-item">
    <img src="/icons/hipaa-shield.png" alt="HIPAA compliant" />
    <h3>HIPAA compliant</h3>
    <p>We ensure strict adherence to HIPAA regulations to protect your medical records.</p>
  </div>
  <div className="security-item">
    <img src="/icons/encrypted-lock.png" alt="Encrypted data" />
    <h3>Encrypted data</h3>
    <p>MediScan AI encrypts all data both in transit and at rest, providing robust protection for your sensitive information.</p>
  </div>
  <div className="security-item">
    <img src="/icons/certified-check.png" alt="Certified vendors" />
    <h3>Certified vendors</h3>
    <p>Our vendors meet the highest standards, including HIPAA compliance and certifications like SOC 2 Type 2 and ISO/IEC 27001:2022.</p>
  </div>
  <div className="security-item">
  <img src="/icons/human-support.png" alt="Real human support" />
  <h3>Real human support</h3>
  <p>Our team is here to help you with any issues. Get support from real humans, not bots.</p>
</div>

</div>

      </section>
      <footer className="footer">
  <div className="footer-content">
    <div className="footer-logo">
      
      <span>MediScan AI</span>
    </div>
    <ul className="footer-links">
      <li><Link to="/how-it-works">How it works</Link></li>
      <li><Link to="/pricing">Pricing</Link></li>
      <li><Link to="/support">Support</Link></li>
      <li><Link to="/guides">User Guides</Link></li>
      <li><Link to="/faq">FAQ</Link></li>
      <li><Link to="/contact">Contact</Link></li>
      <li><Link to="/privacy">Privacy</Link></li>
      <li><Link to="/acceptable-use">Acceptable Use</Link></li>
      <li><Link to="/data-security">Data Security</Link></li>
      <li><Link to="/terms">Terms</Link></li>
      <li><Link to="/signin">Sign in</Link></li>
    </ul>
    <p className="footer-copy">Copyright © 2015. All rights reserved.</p>
  </div>
</footer>

    </div>
  );
}

export default HomePage;
